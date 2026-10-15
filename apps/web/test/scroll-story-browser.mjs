import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { chromium, webkit } from "playwright";

const base = process.env.QA_BASE_URL ?? "http://127.0.0.1:5413";
const output = process.env.QA_OUTPUT ?? "test-results/scroll-story";
await mkdir(output, { recursive: true });
const results = [];
const browserNames = (process.env.QA_ENGINES ?? "chromium,webkit").split(",");
const nextPaint = (page) =>
  page.evaluate(
    () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))),
  );
async function snapshot(page) {
  return page.evaluate(() => {
    const section = document.querySelector(".scroll-story");
    const stage = section.querySelector(".scroll-story-stage");
    const controls = section.querySelector(".scroll-story-controls").getBoundingClientRect();
    return {
      enhanced: section.dataset.enhanced === "true",
      progress: Number.parseFloat(section.style.getPropertyValue("--story-progress")) || 0,
      top: stage.getBoundingClientRect().top,
      y: scrollY,
      width: document.documentElement.scrollWidth,
      active: [...section.querySelectorAll(".scroll-story-chapters button")].findIndex(
        (button) => button.getAttribute("aria-current") === "step",
      ),
      poses: [...section.querySelectorAll(".scroll-story-panel")].map((panel) => {
        const style = getComputedStyle(panel);
        return {
          opacity: Number(style.opacity),
          transform: style.transform,
          inert: panel.inert,
          hidden: panel.getAttribute("aria-hidden"),
          overflow: [...panel.querySelectorAll("h1,h2,p,figure")]
            .filter((element) => {
              const r = element.getBoundingClientRect();
              return (
                r.width &&
                (r.left < -1 ||
                  r.right > innerWidth + 1 ||
                  r.top < stage.getBoundingClientRect().top - 1 ||
                  r.bottom > controls.top + 1)
              );
            })
            .map((element) => element.className || element.tagName),
        };
      }),
    };
  });
}
async function seek(page, progress) {
  await page.evaluate((value) => {
    const section = document.querySelector(".scroll-story");
    const stage = section.querySelector(".scroll-story-stage");
    const rect = section.getBoundingClientRect();
    window.scrollTo({
      top: scrollY + rect.top + (rect.height - stage.clientHeight) * value,
      behavior: "instant",
    });
  }, progress);
  await nextPaint(page);
  return snapshot(page);
}
for (const name of browserNames) {
  const browser = await { chromium, webkit }[name].launch({ headless: true });
  try {
    const sizes =
      name === "chromium"
        ? [
            [390, 844],
            [768, 1024],
            [1440, 1000],
          ]
        : [
            [390, 844],
            [1440, 1000],
          ];
    for (const [width, height] of sizes) {
      const context = await browser.newContext({
        viewport: { width, height },
        reducedMotion: "no-preference",
        hasTouch: width < 500,
      });
      const page = await context.newPage();
      const errors = [];
      page.on("pageerror", (error) => errors.push(error.message));
      await page.goto(base, { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForFunction(
        () => document.querySelector(".scroll-story").dataset.enhanced === "true",
      );
      assert.equal(await page.locator("h1").count(), 1);
      assert.match(await page.locator("h1").innerText(), /만드는 즐거움을/);
      assert.deepEqual(
        await page.locator(".selected-work > .featured .project-name h3").allTextContents(),
        ["ara", "Dipull", "PFCT", "KT SAT"],
      );
      const anchors = [];
      for (let index = 0; index < 4; index++) {
        const state = await seek(page, index / 3);
        assert.ok(Math.abs(state.progress - index / 3) < 0.002, JSON.stringify(state));
        assert.equal(state.active, index);
        assert.ok(state.poses[index].opacity > 0.99);
        assert.deepEqual(
          state.poses[index].overflow,
          [],
          `${name}/${width}/scene${index} clipped text`,
        );
        assert.equal(state.poses.filter((pose) => !pose.inert).length, 1);
        assert.ok(Math.abs(state.top) <= 1);
        assert.ok(state.width <= width + 1);
        await page.screenshot({ path: `${output}/${name}-${width}-scene${index}.png` });
        anchors.push(state);
      }
      for (let index = 0; index <= 24; index++) {
        const state = await seek(page, index / 24);
        assert.ok(
          Math.max(...state.poses.map((pose) => pose.opacity)) >= 0.49,
          `blank frame ${index}/24`,
        );
      }
      const beforeReverse = await seek(page, 0.4);
      await seek(page, 0.8);
      const afterReverse = await seek(page, 0.4);
      assert.deepEqual(afterReverse.poses, beforeReverse.poses, "reverse position drift");
      await page.mouse.move(width / 2, height / 2);
      await page.mouse.wheel(0, 240);
      await page.waitForFunction(
        (previous) =>
          Number.parseFloat(
            document.querySelector(".scroll-story").style.getPropertyValue("--story-progress"),
          ) > previous,
        beforeReverse.progress,
      );
      const forward = await snapshot(page);
      await page.mouse.wheel(0, -180);
      await page.waitForFunction(
        (previous) =>
          Number.parseFloat(
            document.querySelector(".scroll-story").style.getPropertyValue("--story-progress"),
          ) < previous,
        forward.progress,
      );
      const reversed = await snapshot(page);
      await page.waitForTimeout(200);
      const stopped = await snapshot(page);
      assert.equal(
        stopped.progress,
        reversed.progress,
        "story must not autoplay while scroll stops",
      );
      const controls = await page
        .locator(".scroll-story-controls button,.scroll-story-controls a")
        .evaluateAll((elements) =>
          elements.map((element) => ({
            h: element.getBoundingClientRect().height,
            name: element.textContent.trim(),
          })),
        );
      assert.ok(
        controls.every((control) => control.h >= 44),
        JSON.stringify(controls),
      );
      await page.locator(".scroll-story-chapters button").nth(1).focus();
      await page.keyboard.press("Enter");
      await nextPaint(page);
      assert.equal((await snapshot(page)).active, 1);
      await page.locator('.scroll-story-actions a[href="#work"]').click();
      await page.waitForFunction(
        () => document.querySelector("#work").getBoundingClientRect().top < innerHeight / 2,
      );
      assert.ok(
        (await page.locator(".scroll-story-stage").boundingBox()).y < 0,
        "skip must release sticky intro",
      );
      await page.goto(`${base}/#work`, { waitUntil: "networkidle" });
      assert.ok(
        (await page.locator("#work").boundingBox()).y < height / 2,
        "direct work anchor must remain reachable after enhancement",
      );
      await page.goto(base, { waitUntil: "networkidle" });
      await page.waitForFunction(
        () => document.querySelector(".scroll-story").dataset.enhanced === "true",
      );
      await seek(page, 2 / 3);
      await page.getByRole("button", { name: "움직임 없이 보기", exact: true }).click();
      await page.waitForFunction(
        () => document.querySelector(".scroll-story").dataset.enhanced !== "true",
      );
      await nextPaint(page);
      assert.equal(
        await page.evaluate(() =>
          document.activeElement.classList.contains("scroll-story-company"),
        ),
        true,
        "static switch must preserve the current story for keyboard reading",
      );
      const currentStatic = await page.locator(".scroll-story-company").boundingBox();
      assert.ok(
        currentStatic.y >= -1 && currentStatic.y < height / 2,
        "static switch lost the current scene",
      );
      const staticPanels = await page.locator(".scroll-story-panel").evaluateAll((panels) =>
        panels.map((panel) => ({
          position: getComputedStyle(panel).position,
          opacity: getComputedStyle(panel).opacity,
          inert: panel.inert,
        })),
      );
      assert.ok(
        staticPanels.every(
          (panel) => panel.position !== "absolute" && panel.opacity === "1" && !panel.inert,
        ),
      );
      assert.deepEqual(errors, [], `${name}/${width} runtime errors`);
      results.push({
        engine: name,
        width,
        height,
        scenes: 4,
        continuousSamples: 25,
        reversible: true,
        actualWheel: true,
        staticToggle: true,
        keyboard: true,
        directAnchor: true,
        errors,
      });
      await context.close();
    }
    for (const variant of ["reduced", "short", "narrow", "no-js"]) {
      const context = await browser.newContext({
        viewport:
          variant === "short"
            ? { width: 844, height: 390 }
            : variant === "narrow"
              ? { width: 320, height: 740 }
              : { width: 390, height: 844 },
        reducedMotion: variant === "reduced" ? "reduce" : "no-preference",
        javaScriptEnabled: variant !== "no-js",
      });
      const page = await context.newPage();
      const errors = [];
      page.on("pageerror", (error) => errors.push(error.message));
      await page.goto(base, { waitUntil: "networkidle" });
      assert.equal(await page.locator(".scroll-story-panel").count(), 4);
      const layout = await page.locator(".scroll-story-panel").evaluateAll((panels) =>
        panels.map((panel) => ({
          position: getComputedStyle(panel).position,
          opacity: getComputedStyle(panel).opacity,
          height: panel.getBoundingClientRect().height,
        })),
      );
      assert.ok(
        layout.every(
          (panel) => panel.position !== "absolute" && panel.opacity === "1" && panel.height > 100,
        ),
        JSON.stringify(layout),
      );
      assert.ok(await page.locator('a[href="#work"]').count());
      assert.deepEqual(errors, []);
      results.push({ engine: name, variant, readablePanels: 4, errors });
      await context.close();
    }
  } finally {
    await browser.close();
  }
}
await writeFile(`${output}/results.json`, JSON.stringify({ passed: true, base, results }, null, 2));
console.log(JSON.stringify({ passed: true, base, checks: results.length, results }));
