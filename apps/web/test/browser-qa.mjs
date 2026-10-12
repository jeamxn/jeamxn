import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { portfolio } from "@jeamxn/core";
import { chromium } from "playwright";

const output = process.env.QA_OUTPUT ?? "/tmp/jeamxn-renewal/web-qa";
const base = process.env.QA_BASE ?? "http://localhost:5410";
await mkdir(output, { recursive: true });
const browser = await chromium.launch(
  process.env.QA_BROWSER_PATH
    ? { executablePath: process.env.QA_BROWSER_PATH, headless: true }
    : { channel: "chrome", headless: true },
);
const results = [];
const faults = [];
for (const width of [390, 768, 1440]) {
  const page = await browser.newPage({
    viewport: { width, height: 1000 },
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
  });
  page.on("pageerror", (error) => faults.push({ width, error: error.message }));
  for (const route of [
    "/",
    "/about",
    "/work/ara",
    "/work/dipull",
    "/work/pfct",
    "/work/multinet",
    "/work/ttililing",
    "/work/yun",
    "/activity/kt-sat-ax",
    "/resume",
  ]) {
    await page.goto(`${base}${route}`, { waitUntil: "networkidle" });
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
      heroAnimation: document.querySelector(".hero-name")
        ? getComputedStyle(document.querySelector(".hero-name")).animationName
        : null,
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
    if (route === "/") assert.equal(measurements.heroAnimation, "none");
    const source = route.startsWith("/work/")
      ? portfolio.projects.find((item) => `/work/${item.slug}` === route)
      : portfolio.activities.find((item) => `/activity/${item.slug}` === route);
    if (source?.cover && "image" in source) {
      const image = page.locator(".work-page > .project-scene img");
      assert.equal(await image.getAttribute("width"), String(source.cover.width));
      assert.equal(await image.getAttribute("height"), String(source.cover.height));
      assert.equal(await image.getAttribute("alt"), source.cover.alt);
      assert.equal(
        await page.locator(".work-page > .project-scene figcaption").textContent(),
        source.cover.caption,
      );
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
      assert.equal(await page.locator(".home-company-stories article").count(), 3);
      assert.ok(await page.locator('.home-company a[href="/work/pfct"]').count());
      assert.ok((await page.locator(".home-company").textContent()).length > 500);
      assert.ok(await page.locator('a[href="/activity/kt-sat-ax"]').count());
    }
    if (route === "/resume") assert.ok(await page.locator('a[href="/activity/kt-sat-ax"]').count());
    results.push({ width, route, ...measurements });
    if (
      [
        "/",
        "/about",
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
  await page.route("**/api/assistant/status", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ mode: "local", label: "자주 묻는 질문" }),
    }),
  );
  await page.route("**/api/assistant/chat", async (route) => {
    const body = route.request().postDataJSON();
    assert.ok(body.messages.length <= 10);
    assert.ok(body.messages.reduce((sum, message) => sum + message.content.length, 0) <= 6000);
    await new Promise((resolve) => setTimeout(resolve, 100));
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        answer: "공개 내용에서 안내하는 ara입니다.\n\n가상 데이터로 검증합니다.",
        sources: [{ label: "ara", href: "/work/ara" }],
        mode: "local",
      }),
    });
  });
  const trigger = page.locator(".assistant-trigger");
  await trigger.click();
  const dialog = page.locator(".assistant-modal");
  await dialog.waitFor({ state: "visible" });
  assert.equal(await page.evaluate(() => document.body.style.overflow), "hidden");
  assert.equal(
    await page.evaluate(() => document.activeElement?.getAttribute("aria-label")),
    "대화 닫기",
  );
  for (let count = 0; count < 12; count++) {
    await page.keyboard.press("Tab");
    assert.ok(
      await page.evaluate(() => Boolean(document.activeElement?.closest("dialog"))),
      `focus escaped ${width}`,
    );
  }
  await page.locator(".send-button").click();
  await page.getByText("궁금한 내용을 입력해 주세요.", { exact: true }).first().waitFor();
  await page.getByRole("button", { name: "ara는 어떻게 시작했나요?" }).click();
  await page.locator(".message--assistant").waitFor();
  assert.equal(
    await page.locator(".message--assistant .message-label").innerText(),
    "공개 내용 안내",
  );
  await page.screenshot({ path: `${output}/assistant-${width}.png` });
  await page.keyboard.press("Escape");
  await dialog.waitFor({ state: "hidden" });
  assert.equal(await page.evaluate(() => document.body.style.overflow), "");
  assert.ok(
    await trigger.evaluate((el) => el === document.activeElement),
    "trigger focus not restored",
  );
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
await browser.close();
await writeFile(`${output}/results.json`, JSON.stringify({ results, faults }, null, 2));
console.log(JSON.stringify({ screenshots: output, routes: results.length, faults }, null, 2));
