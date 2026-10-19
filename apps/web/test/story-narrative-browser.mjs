import assert from "node:assert/strict";
import { mkdirSync, writeFileSync } from "node:fs";
import { HOME_STORY } from "@jeamxn/core";
import { chromium, webkit } from "playwright";

const base = (process.env.QA_BASE_URL ?? "http://127.0.0.1:5412").replace(/\/$/, "");
const basePath = new URL(base).pathname.replace(/\/$/, "");
const sitePath = (route) => `${basePath}${route}`;
const out = process.env.QA_OUTPUT ?? "test-results/story-narrative";
mkdirSync(out, { recursive: true });
const beats = HOME_STORY.flatMap((chapter) =>
  chapter.sentences.map((sentence) => ({ ...sentence, chapter: chapter.id })),
);
const screens = beats.filter((beat) => beat.screen),
  links = beats.filter((beat) => beat.link),
  results = [];
const settle = (page) =>
  page.evaluate(
    () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))),
  );
async function seek(page, id) {
  const i = beats.findIndex((beat) => beat.id === id);
  assert.ok(i >= 0);
  await page.evaluate(
    (q) => {
      const root = document.querySelector(".scroll-story"),
        stage = root.querySelector(".scroll-story-stage"),
        box = root.getBoundingClientRect();
      scrollTo({
        top: scrollY + box.top + (box.height - stage.clientHeight) * q,
        behavior: "instant",
      });
    },
    i / (beats.length - 1),
  );
  await settle(page);
  return i;
}
async function open(page) {
  await page.goto(base, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForFunction(
    () => document.querySelector(".scroll-story")?.dataset.ready === "true",
  );
  await settle(page);
}
for (const engine of ["chromium", "webkit"]) {
  const browser = await { chromium, webkit }[engine].launch();
  for (const width of [390, 768, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: width === 390 ? 844 : 1000 } }),
      errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await open(page);
    assert.equal(await page.locator("[data-story-sentence]").count(), beats.length);
    for (const id of ["hello", "wish", "invitation", "intranet-incident"]) {
      await seek(page, id);
      const node = page.locator(`[data-story-id="${id}"]`);
      const text = await node.innerText();
      if (id === "intranet-incident") assert.match(text, /DB 랜섬웨어/u);
      else
        assert.equal(
          text,
          beats.find((beat) => beat.id === id).lines?.join("\n") ??
            beats.find((beat) => beat.id === id).text,
        );
    }
    for (const beat of screens) {
      const i = await seek(page, beat.id),
        figure = page.locator(`[data-story-media="${i}"]`),
        sentence = page.locator(`[data-story-sentence="${i}"]`);
      await figure.locator("img").evaluate(async (image) => {
        if (!image.complete)
          await new Promise((resolve) => {
            image.onload = resolve;
            image.onerror = resolve;
          });
        await image.decode().catch(() => {});
      });
      const geometry = await figure.evaluate((node) => {
        const box = node.getBoundingClientRect(),
          image = node.querySelector("img"),
          ib = image.getBoundingClientRect(),
          caption = node.querySelector("figcaption").getBoundingClientRect();
        return {
          natural: [image.naturalWidth, image.naturalHeight],
          image: ib.toJSON(),
          figure: box.toJSON(),
          caption: caption.toJSON(),
          opacity: +getComputedStyle(node).opacity,
          fit: getComputedStyle(image).objectFit,
          view: [innerWidth, innerHeight],
          captionText: node.querySelector("figcaption").textContent,
        };
      });
      assert.ok(geometry.natural[0] > 0);
      assert.ok(geometry.opacity > 0.99);
      assert.equal(geometry.fit, "contain");
      assert.ok(
        Math.abs(
          geometry.image.width / geometry.image.height - geometry.natural[0] / geometry.natural[1],
        ) < 0.01,
        JSON.stringify({ beat: beat.id, geometry }),
      );
      assert.ok(
        geometry.image.left >= 0 &&
          geometry.image.right <= width + 1 &&
          geometry.image.top >= 0 &&
          geometry.caption.bottom < geometry.view[1] - 44,
        JSON.stringify({ beat: beat.id, geometry }),
      );
      assert.match(geometry.captionText, /가상 데이터/u);
      assert.match(geometry.captionText, /실제 사용자 기록이나 운영 현황은 아니에요/u);
      const sb = await sentence.boundingBox();
      if (width < 761)
        assert.ok(
          sb.y + sb.height < geometry.image.top + 1,
          JSON.stringify({ beat: beat.id, sentence: sb, geometry }),
        );
      else assert.ok(sb.x + sb.width <= geometry.image.left + 1);
      assert.equal(await page.locator(".story-beat-media:not([aria-hidden])").count(), 1);
      await page.screenshot({ path: `${out}/${engine}-${width}-${beat.id}.png` });
    }
    // Every hidden conclusion is inert; only the visible conclusion can enter Tab order.
    for (const beat of links) {
      await seek(page, beat.id);
      const cta = page.getByRole("link", { name: beat.link.label, exact: false });
      assert.equal(
        await page
          .locator(".story-detail-link:not([inert])")
          .evaluateAll((nodes) => nodes.filter((node) => !node.closest("[inert]")).length),
        1,
      );
      const r = await cta.boundingBox();
      assert.ok(r.height >= 44 && r.x >= 0 && r.x + r.width <= width + 1);
      const hit = await cta.evaluate((node) => {
        const r = node.getBoundingClientRect();
        return node.contains(document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2));
      });
      assert.ok(hit, beat.id);
      await cta.click();
      const expected = new URL(sitePath(beat.link.href), base);
      await page.waitForURL(
        (url) =>
          url.pathname.replace(/\/$/, "") === expected.pathname.replace(/\/$/, "") &&
          url.hash === expected.hash,
      );
      await page.waitForLoadState("networkidle");
      assert.ok(await page.locator("h1").count());
      await open(page);
    }
    // Static mode interleaves each viewport with the sentence that explains it.
    const example = screens[0],
      ordinal = await seek(page, example.id);
    await page.getByRole("button", { name: "움직임 없이 보기", exact: true }).click();
    await page.waitForFunction(
      () => document.querySelector(".scroll-story").dataset.enhanced !== "true",
    );
    await settle(page);
    assert.equal(
      await page.evaluate(() => document.activeElement.getAttribute("data-story-sentence")),
      String(ordinal),
    );
    const textBox = await page.locator(`[data-story-sentence="${ordinal}"]`).boundingBox(),
      picBox = await page.locator(`[data-story-media="${ordinal}"]`).boundingBox();
    assert.ok(textBox.y + textBox.height <= picBox.y + 1, "static picture follows its explanation");
    assert.deepEqual(errors, []);
    results.push({
      engine,
      width,
      beats: beats.length,
      screens: screens.length,
      realClicks: links.length,
      truthfulCaptions: true,
      nativeRatios: true,
      noTextOverlap: true,
      staticOrder: true,
    });
    await page.close();
  }
  // Broken media is honest text, not a silent empty rectangle.
  const failed = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await failed.route("**/images/dipull-*", (route) => route.abort());
  await open(failed);
  const i = await seek(failed, "wakeup-screen");
  await failed.waitForFunction(
    (i) => document.querySelector(`[data-story-media="${i}"]`)?.dataset.imageFailed === "true",
    i,
  );
  assert.ok(await failed.locator(`[data-story-media="${i}"] .story-media-fallback`).isVisible());
  await failed.close();
  await browser.close();
}
writeFileSync(`${out}/report.json`, JSON.stringify({ passed: true, base, results }, null, 2));
console.log(JSON.stringify({ passed: true, base, results }));
