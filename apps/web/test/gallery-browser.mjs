import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const base = (process.env.QA_BASE_URL ?? "http://127.0.0.1:5410").replace(/\/$/, "");
const output = path.resolve(process.env.QA_OUTPUT ?? "test-results/gallery");
await fs.mkdir(output, { recursive: true });
const browser = await chromium.launch({
  headless: true,
  ...(process.env.QA_BROWSER_PATH ? { executablePath: process.env.QA_BROWSER_PATH } : {}),
});
const report = [];
async function imageMetrics(image) {
  await image.waitFor({ state: "visible" });
  await image.evaluate((element) =>
    element.complete && element.naturalWidth > 0
      ? Promise.resolve()
      : new Promise((resolve, reject) => {
          element.addEventListener("load", resolve, { once: true });
          element.addEventListener("error", reject, { once: true });
        }),
  );
  const metrics = await image.evaluate((element) => {
    const rect = element.getBoundingClientRect();
    return {
      width: rect.width,
      height: rect.height,
      naturalWidth: element.naturalWidth,
      naturalHeight: element.naturalHeight,
      x: rect.x,
      y: rect.y,
      right: rect.right,
      bottom: rect.bottom,
      fit: getComputedStyle(element).objectFit,
      src: element.getAttribute("src"),
    };
  });
  assert.equal(metrics.fit, "contain");
  assert.ok(
    Math.abs(metrics.width / metrics.height - metrics.naturalWidth / metrics.naturalHeight) < 0.015,
    `image is stretched ${JSON.stringify(metrics)}`,
  );
  return metrics;
}
try {
  for (const width of [390, 768, 1440]) {
    const context = await browser.newContext({
      viewport: { width, height: 900 },
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    for (const slug of ["ara", "dipull"]) {
      await page.goto(`${base}/work/${slug}`, { waitUntil: "networkidle" });
      const gallery = page.locator(".product-gallery");
      const buttons = gallery.locator(".screen-thumbnail");
      const count = await buttons.count();
      assert.ok(count >= 1);
      assert.equal(
        await page.locator(".work-page > .project-scene").count(),
        0,
        "gallery replaces the detail cover",
      );
      const sources = [];
      for (let index = 0; index < count; index++) {
        const button = buttons.nth(index);
        await button.click();
        assert.equal(await button.getAttribute("aria-pressed"), "true");
        assert.equal(await gallery.locator('.screen-thumbnail[aria-pressed="true"]').count(), 1);
        const thumbnail = button.locator("img");
        await imageMetrics(thumbnail);
        const fitsThumbnail = await thumbnail.evaluate((element) => {
          const image = element.getBoundingClientRect();
          const holder = element.parentElement.getBoundingClientRect();
          return (
            image.x >= holder.x - 1 &&
            image.right <= holder.right + 1 &&
            image.y >= holder.y - 1 &&
            image.bottom <= holder.bottom + 1
          );
        });
        assert.equal(fitsThumbnail, true, "thumbnail image fits its holder without covering title");
        const title = await button.locator(".screen-thumbnail-title").innerText();
        assert.equal(await gallery.locator(".screen-details h3").innerText(), title);
        const metrics = await imageMetrics(gallery.locator(".screen-current img"));
        assert.ok(metrics.width <= width && metrics.x >= -1 && metrics.right <= width + 1);
        assert.ok(metrics.y >= 80 && metrics.y < 900, "newly selected screenshot is in view");
        const expand = gallery.getByRole("button", { name: "화면 크게 보기" });
        await expand.click();
        const itemDialog = page.locator(".screen-dialog[open]");
        const expandedMetrics = await imageMetrics(itemDialog.locator("img"));
        const itemBounds = await itemDialog.boundingBox();
        assert.equal(expandedMetrics.src, metrics.src);
        assert.ok(
          expandedMetrics.x >= itemBounds.x - 1 &&
            expandedMetrics.right <= itemBounds.x + itemBounds.width + 1,
        );
        assert.ok(
          expandedMetrics.y >= itemBounds.y - 1 &&
            expandedMetrics.bottom <= itemBounds.y + itemBounds.height + 1,
        );
        await page.keyboard.press("Escape");
        await itemDialog.waitFor({ state: "hidden" });
        sources.push({ ...metrics, expanded: expandedMetrics });
      }
      if (count > 1)
        await gallery.getByRole("button", { name: "다음 화면", exact: true }).first().click();
      if (count > 1)
        assert.equal(
          await buttons.first().getAttribute("aria-pressed"),
          "true",
          "next wraps last→first",
        );
      const opener = gallery.getByRole("button", { name: "화면 크게 보기" });
      await opener.click();
      const dialog = page.locator(".screen-dialog[open]");
      await dialog.waitFor();
      const first = await imageMetrics(dialog.locator("img"));
      const bounds = await dialog.boundingBox();
      assert.ok(bounds.x >= 0 && bounds.x + bounds.width <= width + 1);
      assert.ok(
        first.x >= bounds.x &&
          first.right <= bounds.x + bounds.width + 1 &&
          first.y >= bounds.y &&
          first.bottom <= bounds.y + bounds.height + 1,
        "expanded image fits viewport dialog",
      );
      assert.equal(await page.evaluate(() => document.body.style.overflow), "hidden");
      const close = dialog.getByRole("button", { name: "큰 화면 닫기" });
      await close.focus();
      await page.keyboard.press("Shift+Tab");
      assert.equal(
        await dialog.evaluate((element) => element.contains(document.activeElement)),
        true,
        "Shift+Tab stays inside modal",
      );
      if (count > 1)
        assert.equal(
          await dialog
            .getByRole("button", { name: "다음 화면", exact: true })
            .evaluate((element) => document.activeElement === element),
          true,
        );
      await page.keyboard.press("Tab");
      assert.equal(
        await close.evaluate((element) => document.activeElement === element),
        true,
        "native modal traps tab",
      );
      if (count > 1) {
        await page.keyboard.press("ArrowLeft");
        assert.match(
          await dialog.locator(".screen-counter").innerText(),
          new RegExp(`^${count} / ${count}$`),
        );
        await page.keyboard.press("ArrowRight");
        assert.equal(await dialog.locator(".screen-counter").innerText(), `1 / ${count}`);
        await dialog.getByRole("button", { name: "다음 화면", exact: true }).click();
        assert.equal(await dialog.locator(".screen-counter").innerText(), `2 / ${count}`);
        await imageMetrics(dialog.locator("img"));
      }
      await page.screenshot({ path: path.join(output, `${slug}-dialog-${width}.png`) });
      await page.keyboard.press("Escape");
      await page.locator(".screen-dialog").waitFor({ state: "hidden" });
      assert.equal(
        await opener.evaluate((element) => document.activeElement === element),
        true,
        "Escape returns opener focus",
      );
      assert.equal(await page.evaluate(() => document.body.style.overflow), "");
      assert.ok(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
        "no body overflow",
      );
      await gallery.scrollIntoViewIfNeeded();
      await page.screenshot({ path: path.join(output, `${slug}-gallery-${width}.png`) });
      const destination = await page.locator(".next-work").getAttribute("href");
      const nextTitle = await page.locator(".next-work strong").innerText();
      await page.locator(".next-work").click();
      await page.waitForURL(
        (url) =>
          url.pathname.replace(/\/$/, "") ===
          new URL(destination, base).pathname.replace(/\/$/, ""),
      );
      await page.getByRole("heading", { level: 1, name: nextTitle, exact: true }).waitFor();
      assert.equal(
        await page.locator('.screen-thumbnail[aria-pressed="true"]').count(),
        slug === "ara" ? 1 : 0,
        "route transition removes or resets gallery state",
      );
      if (slug === "ara")
        assert.equal(
          await page
            .locator('.screen-thumbnail[aria-pressed="true"]')
            .first()
            .evaluate((element) => element === document.querySelector(".screen-thumbnail")),
          true,
        );
      report.push({ slug, width, count, sources, dialogBounds: bounds, pageErrors: errors.length });
    }
    assert.deepEqual(errors, []);
    await context.close();
  }
  // A failed network asset should never leave a broken current screenshot.
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.route("**/images/dipull*", (route) => route.abort());
  await page.goto(`${base}/work/dipull`, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "다시 불러오기", exact: true }).waitFor();
  assert.equal(await page.locator(".screen-current img").count(), 0);
  assert.match(await page.locator(".screen-current").innerText(), /다른 화면을 선택/);
  await context.close();
  await fs.writeFile(path.join(output, "report.json"), JSON.stringify(report, null, 2));
  console.log(JSON.stringify({ passed: true, checks: report.length, output }, null, 2));
} finally {
  await browser.close();
}
