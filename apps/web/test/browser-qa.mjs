import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { portfolio } from "@jeamxn/core";
import { chromium } from "playwright";

const output = process.env.QA_OUTPUT ?? "/tmp/jeamxn-renewal/web-qa";
const base = (process.env.QA_BASE_URL ?? process.env.QA_BASE ?? "http://localhost:5410").replace(
  /\/$/,
  "",
);
await mkdir(output, { recursive: true });
const basePath = new URL(base).pathname.replace(/\/$/, "");
const sitePath = (route) => `${basePath}${route}`;
const browser = await chromium.launch(
  process.env.QA_BROWSER_PATH
    ? { executablePath: process.env.QA_BROWSER_PATH, headless: true }
    : { headless: true },
);
const results = [];
const faults = [];
const apiRequests = [];
for (const width of [390, 768, 1440]) {
  const page = await browser.newPage({
    viewport: { width, height: 1000 },
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
  });
  page.on("request", (request) => {
    if (/(?:^|\/)api(?:\/|$)/u.test(new URL(request.url()).pathname))
      apiRequests.push(request.url());
  });
  page.on("pageerror", (error) => faults.push({ width, error: error.message }));
  for (const route of [
    "/",
    "/about",
    "/work",
    "/work/ara",
    "/work/dipull",
    "/work/pfct",
    "/work/multinet",
    "/work/ttililing",
    "/work/yun",
    "/activity/kt-sat-ax",
    "/resume",
  ]) {
    const response = await page.goto(`${base}${route}`, { waitUntil: "networkidle" });
    assert.equal(response?.status(), 200, `${route} status`);
    assert.equal(
      await page.locator(".assistant-trigger,.header-ask,.ask-inline,.assistant-modal").count(),
      0,
      "removed answer UI",
    );
    await page.evaluate(() => document.fonts.ready);
    for (const image of await page.locator("main img").all()) {
      await image.scrollIntoViewIfNeeded();
      await image.evaluate((element) => element.decode());
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    const measurements = await page.evaluate(() => ({
      title: document.title,
      heading: document.querySelector("h1")?.textContent,
      viewport: innerWidth,
      pageWidth: document.documentElement.scrollWidth,
      imageFailures: [...document.querySelectorAll("img")]
        .filter((image) => !image.complete || !image.naturalWidth)
        .map((image) => image.src),
      font: getComputedStyle(document.body).fontFamily,
      reducedStory: {
        enhanced: document.querySelector(".scroll-story")?.dataset.enhanced,
        animatedTools: [...document.querySelectorAll(".story-tool")].filter(
          (node) => getComputedStyle(node).animationName !== "none",
        ).length,
      },
      overflowing: [...document.querySelectorAll("main *")]
        .filter((el) => {
          const box = el.getBoundingClientRect();
          return box.width && (box.right > innerWidth + 2 || box.left < -2);
        })
        .map((el) => ({
          tag: el.tagName,
          class: el.className,
          right: el.getBoundingClientRect().right,
        }))
        .slice(0, 10),
    }));
    assert.ok(measurements.heading, `${route} h1 missing`);
    assert.ok(
      measurements.pageWidth <= width + 1,
      `${route} at ${width}: horizontal overflow ${JSON.stringify(measurements)}`,
    );
    assert.deepEqual(measurements.imageFailures, [], `${route} broken images`);
    if (route === "/") {
      assert.notEqual(
        measurements.reducedStory.enhanced,
        "true",
        "reduced motion uses normal-flow story",
      );
      assert.equal(
        measurements.reducedStory.animatedTools,
        0,
        "reduced motion stops decorative movement",
      );
    }
    const source = route.startsWith("/work/")
      ? portfolio.projects.find((item) => `/work/${item.slug}` === route)
      : portfolio.activities.find((item) => `/activity/${item.slug}` === route);
    if (source?.cover && "image" in source) {
      const firstScreen = source.screens?.[0];
      const expected = firstScreen ?? source.cover;
      const image = page.locator(
        firstScreen ? ".screen-current img" : ".work-page > .project-scene img",
      );
      assert.equal(await image.getAttribute("width"), String(expected.width));
      assert.equal(await image.getAttribute("height"), String(expected.height));
      assert.equal(await image.getAttribute("alt"), expected.alt);
      assert.equal(
        await page
          .locator(
            firstScreen
              ? ".screen-current .screen-caption"
              : ".work-page > .project-scene figcaption",
          )
          .textContent(),
        expected.caption,
      );
      if (firstScreen)
        assert.equal(await page.locator(".screen-thumbnail").count(), source.screens.length);
      const geometry = await image.evaluate((element) => {
        const box = element.getBoundingClientRect();
        return {
          displayed: box.width / box.height,
          actual: element.naturalWidth / element.naturalHeight,
        };
      });
      assert.ok(
        Math.abs(geometry.displayed - geometry.actual) < 0.015,
        `${route} cover was stretched or cropped`,
      );
    }
    if (source?.sections?.length) {
      assert.equal(await page.locator(".story-section").count(), source.sections.length);
      assert.equal(await page.locator(".story-section h2").count(), source.sections.length);
      for (const section of source.sections) {
        const block = page.locator(`.story-section[id="${section.id}"]`);
        for (const paragraph of section.paragraphs)
          assert.ok((await block.textContent()).includes(paragraph), `${route} missing prose`);
      }
      assert.equal(await page.locator(".story-body details").count(), 0);
      if (source.sections.length >= 3)
        assert.equal(await page.locator(".story-contents a").count(), source.sections.length);
    }
    if (route === "/") {
      assert.equal(await page.locator(".selected-work > .featured").count(), 4);
      assert.deepEqual(
        await page.locator(".selected-work > .featured .project-name h3").allTextContents(),
        ["ara", "Dipull", "PFCT", "KT SAT"],
      );
      assert.equal(await page.locator(".other-work .rotation-batch .work-row").count(), 3);
      assert.equal(
        Number(await page.locator(".work-rotation").getAttribute("data-record-count")),
        portfolio.projects.filter((project) => !project.featured).length,
      );
      assert.equal(await page.locator(".home-company-stories article").count(), 4);
      assert.ok(await page.locator(`.home-company a[href="${sitePath("/work/pfct")}"]`).count());
      assert.ok((await page.locator(".home-company").textContent()).length > 500);
      assert.ok(await page.locator(`a[href="${sitePath("/activity/kt-sat-ax")}"]`).count());
    }
    if (route === "/resume")
      assert.ok(await page.locator(`a[href="${sitePath("/activity/kt-sat-ax")}"]`).count());
    results.push({ width, route, ...measurements });
    if (
      [
        "/",
        "/about",
        "/work",
        "/work/ara",
        "/work/dipull",
        "/work/pfct",
        "/activity/kt-sat-ax",
        "/resume",
      ].includes(route)
    )
      await page.screenshot({
        path: `${output}/${route.replaceAll("/", "-") || "home"}-${width}.png`,
        fullPage: true,
      });
  }
  await page.goto(base, { waitUntil: "networkidle" });
  if (width === 390) {
    const menu = page.getByRole("button", { name: "메뉴 열기" });
    await menu.click();
    await page.locator(".menu-modal").waitFor({ state: "visible" });
    for (let count = 0; count < 9; count++) {
      await page.keyboard.press("Tab");
      assert.ok(
        await page.evaluate(() => Boolean(document.activeElement?.closest("dialog"))),
        "menu focus escaped",
      );
    }
    await page.screenshot({ path: `${output}/menu-${width}.png` });
    await page.keyboard.press("Escape");
    assert.ok(
      await menu.evaluate((el) => el === document.activeElement),
      "menu focus not restored",
    );
  }
  await page.close();
}
assert.deepEqual(faults, [], "browser runtime faults");
assert.deepEqual(apiRequests, [], "static portfolio does not request APIs");
await browser.close();
await writeFile(
  `${output}/results.json`,
  JSON.stringify({ base, results, faults, apiRequests }, null, 2),
);
console.log(JSON.stringify({ screenshots: output, routes: results.length, faults }, null, 2));
