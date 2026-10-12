import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { portfolio } from "@jeamxn/core";
import { chromium } from "playwright";
import { ROTATION_INTERVAL } from "../app/shared/lib/project-rotation.ts";

const base = process.env.QA_BASE_URL ?? process.env.QA_BASE ?? "http://127.0.0.1:5410";
const output = process.env.QA_OUTPUT ?? "/tmp/jeamxn-home-v5/browser";
await mkdir(output, { recursive: true });
const browser = await chromium.launch({
  headless: true,
  ...(process.env.QA_BROWSER_PATH ? { executablePath: process.env.QA_BROWSER_PATH } : {}),
});
const errors = [];
const results = [];
const expectedRecords = portfolio.projects.filter((project) => !project.featured);
const state = (page) => page.locator(".work-rotation").getAttribute("data-batch");
async function open(width, reducedMotion = "no-preference") {
  const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion });
  page.on("pageerror", (error) => errors.push(error.message));
  // No paid AI or external credentials: only local portfolio data; unopened assistant.
  await page.route("**/api/assistant/chat", (route) => {
    throw new Error(`Unexpected assistant request ${route.request().url()}`);
  });
  await page.goto(base, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  assert.deepEqual(
    await page.locator(".selected-work > .featured .project-name h3").allTextContents(),
    ["ara", "Dipull", "PFCT", "KT SAT"],
  );
  assert.equal(
    await page.locator(".featured--pfct .project-scene, .featured--kt-sat .project-scene").count(),
    0,
  );
  assert.equal(await page.locator(".home-activity").count(), 0);
  assert.equal(await page.locator(".home-company-stories article").count(), 3);
  assert.equal(await page.locator(".home-lecture-stories article").count(), 3);
  assert.equal(Number(await page.locator(".work-rotation").getAttribute("data-record-count")), 83);
  return page;
}
async function startClock(page) {
  await page.clock.install();
  await page.clock.pauseAt(new Date());
  await page.mouse.move(0, 0);
  await page.locator(".work-rotation").scrollIntoViewIfNeeded();
  await page.waitForFunction(
    () => document.querySelector(".work-rotation").dataset.running === "true",
  );
}
try {
  const page = await open(1440);
  await startClock(page);
  assert.equal(await page.locator(".rotation-status").textContent(), "3초마다 자동 전환");
  const progressDuration = await page
    .locator(".rotation-progress span")
    .evaluate((element) => Number.parseFloat(getComputedStyle(element).animationDuration) * 1000);
  assert.equal(progressDuration, ROTATION_INTERVAL);
  await page.clock.runFor(ROTATION_INTERVAL - 100);
  assert.equal(await state(page), "1");
  await page.clock.runFor(100);
  assert.equal(await state(page), "2");
  const animation = await page.locator(".rotation-batch").evaluate((element) => ({
    name: getComputedStyle(element).animationName,
    animations: element.getAnimations().map((item) => ({
      state: item.playState,
      duration: item.effect.getTiming().duration,
      time: item.currentTime,
    })),
    opacity: Number(getComputedStyle(element).opacity),
    transform: getComputedStyle(element).transform,
  }));
  assert.equal(animation.name, "rotation-enter");
  assert.equal(animation.animations[0]?.duration, 400);
  assert.ok(animation.opacity < 1, JSON.stringify(animation));
  assert.notEqual(animation.transform, "none");
  await page.clock.runFor(450);
  await page.mouse.move(400, 600);
  await page.waitForFunction(
    () => document.querySelector(".work-rotation").dataset.running === "false",
  );
  const beforeHover = await state(page);
  await page.clock.runFor(6000);
  assert.equal(await state(page), beforeHover);
  await page.mouse.move(0, 0);
  await page.waitForFunction(
    () => document.querySelector(".work-rotation").dataset.running === "true",
  );
  await page.clock.runFor(ROTATION_INTERVAL - 100);
  assert.equal(await state(page), beforeHover);
  await page.clock.runFor(100);
  assert.equal(await state(page), "3");
  const firstLink = page.locator(".rotation-batch .work-row").first();
  await firstLink.focus();
  const focusedHref = await firstLink.getAttribute("href");
  await page.clock.runFor(6000);
  assert.equal(await state(page), "3");
  assert.equal(await page.evaluate(() => document.activeElement.getAttribute("href")), focusedHref);
  // Arrow controls are native buttons: tab from the first previous control to toggle then next.
  await page.getByRole("button", { name: "이전 작업 묶음", exact: true }).focus();
  await page.keyboard.press("Tab");
  assert.equal(
    await page.evaluate(() => document.activeElement.textContent.trim()),
    "자동 전환 멈춤",
  );
  await page.keyboard.press("Tab");
  assert.equal(
    await page.evaluate(() => document.activeElement.getAttribute("aria-label")),
    "다음 작업 묶음",
  );
  await page.keyboard.press("Enter");
  assert.equal(await state(page), "4");
  await page.evaluate(() => document.activeElement.blur());
  await page.mouse.move(0, 0);
  await page.clock.runFor(6000);
  assert.equal(await state(page), "4");
  assert.equal(await page.locator(".rotation-toggle").textContent(), "자동 전환 시작");
  await page.getByRole("button", { name: "자동 전환 시작", exact: true }).click();
  await page.evaluate(() => document.activeElement.blur());
  await page.mouse.move(0, 0);
  await page.waitForFunction(
    () => document.querySelector(".work-rotation").dataset.running === "true",
  );
  // Document visibility mocked explicitly: exercises production visibilitychange handler.
  await page.evaluate(() => {
    Object.defineProperty(document, "visibilityState", { configurable: true, get: () => "hidden" });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await page.waitForFunction(
    () => document.querySelector(".work-rotation").dataset.running === "false",
  );
  await page.clock.runFor(10000);
  assert.equal(await state(page), "4");
  await page.evaluate(() => {
    Object.defineProperty(document, "visibilityState", {
      configurable: true,
      get: () => "visible",
    });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await page.waitForFunction(
    () => document.querySelector(".work-rotation").dataset.running === "true",
  );
  await page.clock.runFor(ROTATION_INTERVAL - 100);
  assert.equal(await state(page), "4");
  await page.clock.runFor(100);
  assert.equal(await state(page), "5");
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForFunction(
    () => document.querySelector(".work-rotation").dataset.running === "false",
  );
  await page.clock.runFor(10000);
  assert.equal(await state(page), "5");
  results.push({
    width: 1440,
    exactIntervalMs: ROTATION_INTERVAL,
    progressDurationMs: progressDuration,
    animation,
    hoverPause: true,
    focusPause: true,
    keyboard: true,
    manualStickyPause: true,
    visibilityMock: true,
    offscreenPause: true,
  });
  await page.close();

  for (const width of [390, 768, 1440]) {
    const reduced = await open(width, "reduce");
    await reduced.locator(".work-rotation").scrollIntoViewIfNeeded();
    assert.equal(await reduced.locator(".work-rotation").getAttribute("data-running"), "false");
    assert.equal(
      await reduced
        .locator(".rotation-batch")
        .evaluate((element) => getComputedStyle(element).animationName),
      "none",
    );
    assert.equal(await reduced.locator(".rotation-toggle").isDisabled(), true);
    const seen = new Set();
    const heights = [];
    const overflows = [];
    for (let group = 0; group < 28; group++) {
      const rows = reduced.locator(".rotation-batch .work-row");
      const hrefs = await rows.evaluateAll((elements) =>
        elements.map((element) => element.getAttribute("href")),
      );
      for (const href of hrefs) seen.add(href);
      assert.equal(hrefs.length, group < 27 ? 3 : 2);
      const geometry = await reduced.locator(".work-rotation").evaluate((element) => ({
        stageHeight: element.querySelector(".rotation-stage").getBoundingClientRect().height,
        pageWidth: document.documentElement.scrollWidth,
        overflowing: [...element.querySelectorAll(".rotation-batch .work-row")].filter(
          (row) => row.scrollHeight > row.clientHeight + 1 || row.scrollWidth > row.clientWidth + 1,
        ).length,
        controls: [...element.querySelectorAll("button")].map((button) => {
          const box = button.getBoundingClientRect();
          return [box.width, box.height];
        }),
      }));
      heights.push(geometry.stageHeight);
      if (geometry.overflowing) overflows.push(group);
      assert.ok(geometry.pageWidth <= width + 1, JSON.stringify({ width, group, geometry }));
      assert.ok(geometry.controls.every(([w, h]) => w >= 44 && h >= 44));
      await reduced.getByRole("button", { name: "다음 작업 묶음", exact: true }).click();
    }
    assert.deepEqual(seen, new Set(expectedRecords.map((project) => `/work/${project.slug}`)));
    assert.equal(await state(reduced), "1");
    assert.ok(Math.max(...heights) - Math.min(...heights) <= 1, JSON.stringify({ width, heights }));
    assert.deepEqual(overflows, []);
    await reduced.getByRole("button", { name: "이전 작업 묶음", exact: true }).click();
    assert.equal(await state(reduced), "28");
    await reduced.getByRole("button", { name: "다음 작업 묶음", exact: true }).click();
    await reduced
      .locator(".work-rotation")
      .screenshot({ path: `${output}/other-work-${width}.png` });
    await reduced
      .locator(".featured--kt-sat")
      .screenshot({ path: `${output}/kt-sat-${width}.png` });
    await reduced.locator(".featured--pfct").screenshot({ path: `${output}/pfct-${width}.png` });
    const destination = await reduced
      .locator(".rotation-batch .work-row")
      .first()
      .getAttribute("href");
    await reduced.locator(".rotation-batch .work-row").first().click();
    await reduced.waitForURL(`**${destination}`);
    results.push({
      width,
      reducedMotion: true,
      seen: seen.size,
      batches: 28,
      stageHeight: heights[0],
      stableHeight: true,
      noClipping: true,
      nativeLink: destination,
    });
    await reduced.close();
  }
  // One wall-clock run, independent of mocked clock, proves live three-second advancement.
  const live = await open(1440);
  await live.mouse.move(0, 0);
  await live.locator(".work-rotation").scrollIntoViewIfNeeded();
  await live.waitForFunction(
    () => document.querySelector(".work-rotation").dataset.running === "true",
  );
  const started = Date.now();
  await live.waitForTimeout(ROTATION_INTERVAL - 400);
  assert.equal(await state(live), "1");
  await live.waitForFunction(() => document.querySelector(".work-rotation").dataset.batch === "2");
  const elapsed = Date.now() - started;
  assert.ok(
    elapsed >= ROTATION_INTERVAL - 100 && elapsed <= ROTATION_INTERVAL + 1000,
    `wall-clock transition ${elapsed}ms`,
  );
  results.push({ wallClock: true, elapsed });
  await live.close();
  assert.deepEqual(errors, []);
  await writeFile(
    `${output}/results.json`,
    JSON.stringify({ pass: true, results, errors }, null, 2),
  );
  console.log(JSON.stringify({ pass: true, results, errors }));
} finally {
  await browser.close();
}
