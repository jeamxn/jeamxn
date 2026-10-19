import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { HOME_STORY } from "@jeamxn/core";
import { chromium, webkit } from "playwright";

const base = (process.env.QA_BASE_URL ?? "http://127.0.0.1:5413").replace(/\/$/, "");
const output = process.env.QA_OUTPUT ?? "test-results/scroll-story";
await mkdir(output, { recursive: true });
const results = [];
const beats = HOME_STORY.flatMap((chapter, chapterIndex) =>
  chapter.sentences.map((sentence, localIndex) => ({
    ...sentence,
    chapter: chapter.id,
    chapterIndex,
    localIndex,
  })),
);
const anchors = HOME_STORY.map(
  (chapter) => beats.findIndex((beat) => beat.chapter === chapter.id) / (beats.length - 1),
);
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
      await page.goto(`${base}/story`, { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForFunction(
        () => document.querySelector(".scroll-story").dataset.enhanced === "true",
      );
      await nextPaint(page);
      const fullscreen = await page.locator(".scroll-story-stage").evaluate((stage) => ({
        width: stage.getBoundingClientRect().width,
        height: stage.getBoundingClientRect().height,
        viewportWidth: innerWidth,
        viewportHeight: innerHeight,
      }));
      assert.ok(
        Math.abs(fullscreen.width - fullscreen.viewportWidth) < 1,
        "story uses the full viewport width",
      );
      assert.ok(
        Math.abs(fullscreen.height - fullscreen.viewportHeight) < 1,
        "story uses the full viewport height",
      );
      assert.equal(await page.locator("h1").count(), 1);
      assert.match(await page.locator("h1").innerText(), /행복한 개발자/);
      // /story ends with its own exit back to the homepage's selected work.
      const exits = await page
        .locator(".story-exit-link")
        .evaluateAll((links) => links.map((link) => link.getAttribute("href")));
      assert.equal(exits.length, 2);
      assert.match(exits[0], /\/#work$/u);
      assert.match(exits[1], /\/work$/u);
      const anchorStates = [];
      for (let index = 0; index < 5; index++) {
        const state = await seek(page, anchors[index]);
        assert.ok(Math.abs(state.progress - anchors[index]) < 0.002, JSON.stringify(state));
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
        anchorStates.push(state);
      }
      for (let index = 1; index < beats.length; index++) {
        await seek(page, index / (beats.length - 1));
        const sentence = page.locator(`[data-story-sentence="${index}"]`);
        assert.equal(
          await sentence.locator(".story-sentence-text").innerText(),
          beats[index].lines?.join("\n") ?? beats[index].text,
        );
        assert.ok((await sentence.evaluate((e) => +getComputedStyle(e).opacity)) > 0.99);
        const sentenceBox = await sentence.boundingBox();
        const controlsBox = await page.locator(".scroll-story-controls").boundingBox();
        assert.ok(
          sentenceBox.x >= 0 &&
            sentenceBox.x + sentenceBox.width <= width + 1 &&
            sentenceBox.y >= 0 &&
            sentenceBox.y + sentenceBox.height <= controlsBox.y + 1,
          `full sentence ${index} clipped after editorial line breaks`,
        );
        assert.equal(
          await page
            .locator('.story-sentence[aria-hidden="false"],.story-sentence:not([aria-hidden])')
            .count(),
          1,
        );
      }
      // A sentence's editorial lines reveal one after another by scroll, not elapsed time.
      const greeting = beats.findIndex((item) => item.id === "hello");
      await seek(page, (greeting - 0.35) / (beats.length - 1));
      const row = page.locator(`[data-story-sentence="${greeting}"] .story-line`);
      assert.equal(await row.count(), 2);
      assert.ok((await row.nth(0).evaluate((node) => +getComputedStyle(node).opacity)) > 0.9);
      assert.equal(await row.nth(1).evaluate((node) => +getComputedStyle(node).opacity), 0);
      const revealBefore = await row.evaluateAll((nodes) =>
        nodes.map((node) => ({
          opacity: getComputedStyle(node).opacity,
          transform: getComputedStyle(node).transform,
        })),
      );
      await page.waitForTimeout(250);
      assert.deepEqual(
        await row.evaluateAll((nodes) =>
          nodes.map((node) => ({
            opacity: getComputedStyle(node).opacity,
            transform: getComputedStyle(node).transform,
          })),
        ),
        revealBefore,
        "line reveal must wait for scroll",
      );
      await seek(page, greeting / (beats.length - 1));
      assert.ok(
        (
          await row.evaluateAll((nodes) => nodes.map((node) => +getComputedStyle(node).opacity))
        ).every((opacity) => opacity > 0.99),
      );
      await seek(page, (greeting - 0.35) / (beats.length - 1));
      assert.deepEqual(
        await row.evaluateAll((nodes) =>
          nodes.map((node) => ({
            opacity: getComputedStyle(node).opacity,
            transform: getComputedStyle(node).transform,
          })),
        ),
        revealBefore,
        "line reveal reverses exactly",
      );
      // The transition must never superimpose two sentences, even within a chapter.
      const firstInternal = beats.findIndex((item) => item.id === "internal-opening");
      for (let step = 0; step <= 20; step++) {
        await seek(page, (firstInternal + step / 20) / (beats.length - 1));
        const visible = await page.locator(".story-sentence").evaluateAll(
          (nodes) =>
            nodes.filter((node) => {
              let alpha = +getComputedStyle(node).opacity;
              const panel = node.closest(".scroll-story-panel");
              alpha *= +getComputedStyle(panel).opacity;
              return alpha > 0.005;
            }).length,
        );
        assert.ok(visible <= 1, `two sentences overlap at transition sample${step}`);
      }
      const reading = firstInternal / (beats.length - 1);
      await seek(page, reading);
      const distance = await page
        .locator(".scroll-story")
        .evaluate(
          (root) =>
            (root.getBoundingClientRect().height -
              root.querySelector(".scroll-story-stage").clientHeight) /
            (Number(getComputedStyle(root).getPropertyValue("--story-beat-count")) - 1),
        );
      assert.ok(distance >= height * 1.1, "at least110vh between text anchors");
      for (const delta of [-0.35, 0, 0.35]) {
        await seek(page, (firstInternal + delta) / (beats.length - 1));
        assert.ok(
          (await page
            .locator(`[data-story-sentence="${firstInternal}"]`)
            .evaluate((node) => +getComputedStyle(node).opacity)) > 0.99,
        );
      }
      for (let index = 0; index <= 24; index++) {
        const state = await seek(page, index / 24);
        assert.ok(
          Math.max(...state.poses.map((pose) => pose.opacity)) >= 0.49,
          `blank frame ${index}/24`,
        );
      }
      await seek(
        page,
        beats.findIndex((beat) => beat.id === "add-school-tools") / (beats.length - 1),
      );
      const toolCoverage = await page.locator("[data-story-tool]").evaluateAll((nodes) => ({
        count: nodes.length,
        min: Math.min(...nodes.map((node) => node.getBoundingClientRect().left)),
        max: Math.max(...nodes.map((node) => node.getBoundingClientRect().right)),
        width: innerWidth,
      }));
      assert.equal(toolCoverage.count, 4);
      assert.ok(
        toolCoverage.max - toolCoverage.min > toolCoverage.width * 0.3,
        "unfolded tools use the whole screen, not one reading column",
      );
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
      await page.waitForFunction(
        () => document.querySelector(".scroll-story").dataset.storySmoothing === "false",
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
      await page.goto(`${base}/story#work`, { waitUntil: "networkidle" });
      assert.ok(
        (await page.locator("#work").boundingBox()).y < height / 2,
        "direct work anchor must remain reachable after enhancement",
      );
      await page.goto(`${base}/story`, { waitUntil: "networkidle" });
      await page.waitForFunction(
        () => document.querySelector(".scroll-story").dataset.enhanced === "true",
      );
      await nextPaint(page);
      await seek(page, 8 / (beats.length - 1));
      await page.getByRole("button", { name: "움직임 없이 보기", exact: true }).click();
      await page.waitForFunction(
        () => document.querySelector(".scroll-story").dataset.enhanced !== "true",
      );
      await page.waitForFunction(
        () => document.activeElement.getAttribute("data-story-sentence") === "8",
      );
      await nextPaint(page);
      assert.equal(
        await page.evaluate(
          () => document.activeElement.getAttribute("data-story-sentence") === "8",
        ),
        true,
        "static switch must preserve the current story for keyboard reading",
      );
      const currentStatic = await page.locator('[data-story-sentence="8"]').boundingBox();
      assert.ok(
        currentStatic.y >= -1 && currentStatic.y < height,
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
        scenes: 5,
        fullscreen: true,
        chapterSpecificModels: true,
        sentenceBeats: beats.length,
        oneSentenceAtATime: true,
        continuousSamples: 25,
        transitionSamplesWithoutTextOverlap: 21,
        fullReadingDwell: true,
        smoothWheelCatchup: true,
        editorialLineBreaks: true,
        sequentialScrollLineReveal: true,
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
      await page.goto(`${base}/story`, { waitUntil: "networkidle" });
      assert.equal(await page.locator(".scroll-story-panel").count(), 5);
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
      results.push({ engine: name, variant, readablePanels: 5, errors });
      await context.close();
    }
  } finally {
    await browser.close();
  }
}
await writeFile(`${output}/results.json`, JSON.stringify({ passed: true, base, results }, null, 2));
console.log(JSON.stringify({ passed: true, base, checks: results.length, results }));
