import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";
import { portfolio } from "../packages/core/dist/index.js";

const base = process.env.QA_BASE_URL ?? "http://127.0.0.1:5410";
const output = path.resolve(process.env.QA_OUTPUT ?? "test-results/browser");
await fs.mkdir(output, { recursive: true });
const options = { headless: true };
if (process.env.QA_BROWSER_PATH) options.executablePath = process.env.QA_BROWSER_PATH;
const browser = await chromium.launch(options);
const report = [];
try {
  for (const width of (process.env.QA_WIDTHS ?? "390,768,1440").split(",").map(Number)) {
    const context = await browser.newContext({
      viewport: { width, height: 900 },
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    for (const route of [
      "/",
      "/about",
      "/work",
      ...portfolio.projects.map((project) => `/work/${project.slug}`),
      "/resume",
      ...portfolio.activities
        .filter((activity) => activity.slug)
        .map((activity) => `/activity/${activity.slug}`),
    ]) {
      const response = await page.goto(base + route, { waitUntil: "networkidle" });
      assert.equal(response?.status(), 200, `${route} status`);
      await page.locator("main").waitFor();
      await page.evaluate(() => document.fonts.ready);
      for (const image of await page.locator("img").all()) {
        if (await image.isVisible()) {
          await image.scrollIntoViewIfNeeded();
          await image.evaluate((element) =>
            element.complete && element.naturalWidth > 0
              ? Promise.resolve()
              : new Promise((resolve, reject) => {
                  element.addEventListener("load", resolve, { once: true });
                  element.addEventListener("error", () => reject(new Error("Image failed")), {
                    once: true,
                  });
                }),
          );
        }
      }
      await page.evaluate(() => window.scrollTo(0, 0));
      assert.equal(await page.locator("h1").count(), 1, `${route} must have one h1`);
      const metrics = await page.evaluate(() => ({
        width: innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
        images: [...document.images]
          .filter((e) => e.offsetParent !== null)
          .map((e) => ({
            src: e.getAttribute("src"),
            loaded: e.complete && e.naturalWidth > 0,
            alt: e.hasAttribute("alt"),
            dimensions: e.hasAttribute("width") && e.hasAttribute("height"),
          })),
        iconButtons: [...document.querySelectorAll("button")].filter(
          (e) => e.offsetParent !== null && !e.innerText.trim() && !e.getAttribute("aria-label"),
        ).length,
        mainText: document.querySelector("main")?.textContent?.length ?? 0,
      }));
      assert.ok(
        metrics.scrollWidth <= width + 1,
        `${route} horizontal overflow ${metrics.scrollWidth}/${width}`,
      );
      assert.equal(metrics.iconButtons, 0, `${route} unnamed icon button`);
      assert.ok(metrics.mainText > 120, `${route} empty content`);
      for (const image of metrics.images) {
        assert.equal(image.loaded, true, `${route} image not loaded ${image.src}`);
        assert.equal(image.alt, true, `${route} image no alt`);
        assert.equal(image.dimensions, true, `${route} image no dimensions`);
      }
      assert.deepEqual(errors, [], `${route} browser errors`);
      const name = route === "/" ? "home" : route.slice(1).replaceAll("/", "-");
      if (
        [
          "/",
          "/about",
          "/work",
          "/work/ara",
          "/work/dipull",
          "/work/pfct",
          "/resume",
          "/activity/kt-sat-ax",
        ].includes(route)
      )
        await page.screenshot({ path: path.join(output, `${name}-${width}.png`), fullPage: true });
      report.push({ route, width, ...metrics, pageErrors: errors.length });
    }
    await context.close();
  }
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  await page.goto(base, { waitUntil: "networkidle" });
  const open = page.getByRole("button", { name: /질문|대화|궁금/ }).first();
  assert.ok(await open.count(), "assistant entry present");
  await open.click();
  const dialog = page.getByRole("dialog").last();
  await dialog.waitFor({ state: "visible" });
  const input = dialog.getByRole("textbox").first();
  await input.fill("ara purpose 아이디어는 무엇인가요?");
  await dialog.getByRole("button", { name: "질문 보내기" }).click();
  await dialog.locator(".message--assistant").last().waitFor({ state: "visible", timeout: 10000 });
  const text = await dialog.innerText();
  assert.ok(text.includes("purpose"), "assistant renders question/answer");
  assert.ok(
    text.includes("성민") || text.includes("공개 내용"),
    "assistant completes an explicit answer",
  );
  await page.keyboard.press("Escape");
  await dialog.waitFor({ state: "hidden" });
  const pdf = await context.request.get(`${base}/api/resume.pdf`);
  assert.equal(pdf.status(), 200);
  const bytes = await pdf.body();
  assert.equal(bytes.subarray(0, 4).toString(), "%PDF");
  await fs.writeFile(path.join(output, "resume.pdf"), bytes);
  report.push({ assistantDialog: true, pdfBytes: bytes.length });
  await context.close();
  await fs.writeFile(path.join(output, "report.json"), JSON.stringify(report, null, 2));
  console.log(
    JSON.stringify(
      {
        passed: true,
        routeChecks: report.filter((item) => item.route).length,
        output,
        pdfBytes: bytes.length,
      },
      null,
      2,
    ),
  );
} finally {
  await browser.close();
}
