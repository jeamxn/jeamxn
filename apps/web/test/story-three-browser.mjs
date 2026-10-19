import assert from "node:assert/strict";
import { mkdirSync, writeFileSync } from "node:fs";
import { HOME_STORY } from "@jeamxn/core";
import { chromium, webkit } from "playwright";

const base = (process.env.QA_BASE_URL ?? "http://127.0.0.1:5412").replace(/\/$/, ""),
  out = process.env.QA_OUTPUT ?? "test-results/story-three";
mkdirSync(out, { recursive: true });
const results = [];
for (const engine of ["chromium", "webkit"]) {
  const b = await { chromium, webkit }[engine].launch({ headless: true });
  for (const width of [390, 1440]) {
    const p = await b.newPage({
      viewport: { width, height: width === 390 ? 844 : 1000 },
      reducedMotion: "no-preference",
    });
    const errors = [];
    p.on("pageerror", (e) => errors.push(e.message));
    await p.goto(`${base}/story`, { waitUntil: "networkidle" });
    await p.evaluate(() => document.fonts.ready);
    const supported = await p.evaluate(() => {
      const c = document.createElement("canvas");
      return !!c.getContext("webgl2");
    });
    const host = p.locator(".story-three-host");
    if (!supported) {
      console.log("NO_WEBGL", engine, width);
      assert.equal(
        await p
          .locator(".story-tool svg")
          .first()
          .evaluate((e) => getComputedStyle(e).visibility),
        "visible",
      );
      results.push({ engine, width, fallback: true });
      await p.close();
      continue;
    }
    await p.waitForFunction(
      () => document.querySelector(".story-three-host")?.dataset.threeReady === "true",
    );
    const seek = async (q) => {
      await p.evaluate((value) => {
        const e = document.querySelector(".scroll-story"),
          s = e.querySelector(".scroll-story-stage"),
          r = e.getBoundingClientRect();
        scrollTo({
          top: scrollY + r.top + (r.height - s.clientHeight) * value,
          behavior: "instant",
        });
      }, q);
      await p.evaluate(
        () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))),
      );
      return await host.evaluate((e) => ({
        ...e.dataset,
        canvasWidth: e.firstChild.width,
        canvasHeight: e.firstChild.height,
        box: { width: e.getBoundingClientRect().width, height: e.getBoundingClientRect().height },
      }));
    };
    const expected = [
      ["intro", ["idea", "document"]],
      ["dipull", ["campus", "music", "laundry", "calendar"]],
      ["internal", ["admin-left", "admin-center", "admin-right", "shield", "key", "dpd"]],
      ["ax", ["lily", "mcp-server", "tool-plug", "meeting", "presentation"]],
      ["ara", ["agent", "document", "calendar", "tool-plug", "canvas"]],
    ];
    const states = [];
    for (let index = 0; index < expected.length; index++) {
      const q =
          (HOME_STORY.slice(0, index + 1).reduce(
            (sum, chapter) => sum + chapter.sentences.length,
            0,
          ) -
            1) /
          (HOME_STORY.reduce((sum, chapter) => sum + chapter.sentences.length, 0) - 1),
        [chapter, ids] = expected[index];
      const state = await seek(q);
      states.push({ q, ...state });
      assert.equal(state.threeReady, "true");
      assert.equal(state.threeChapter, chapter);
      assert.deepEqual(
        JSON.parse(state.threeVisibleIds),
        ids.map((id) => `${chapter}:${id}`),
        "only the chapter's own objects are visible",
      );
      assert.ok(+state.threeDrawCalls > 0);
      assert.ok(+state.threeTriangles > 100);
      await p.screenshot({ path: `${out}/${engine}-${width}-${chapter}.png` });
    }
    assert.equal(
      new Set(states.map((state) => state.threeVisibleIds)).size,
      5,
      "not one unchanged model set moving between all scenes",
    );
    const poses = states.map((state) => JSON.parse(state.threePose));
    assert.notDeepEqual(poses[2], poses[4]);
    // Same live model at nearby positions, not a comparison of different sets.
    const at = (id) =>
      HOME_STORY.flatMap((chapter) => chapter.sentences).findIndex((beat) => beat.id === id) /
      (HOME_STORY.reduce((n, c) => n + c.sentences.length, 0) - 1);
    const nearbyA = JSON.parse((await seek(at("class-service"))).threePose).find(
      (item) => item.chapter === "dipull" && item.name === "campus",
    );
    const nearbyB = JSON.parse(
      (
        await seek(
          at("class-service") + 0.25 / (HOME_STORY.reduce((n, c) => n + c.sentences.length, 0) - 1),
        )
      ).threePose,
    ).find((item) => item.chapter === "dipull" && item.name === "campus");
    assert.ok(nearbyA.visible && nearbyB.visible);
    assert.notDeepEqual(nearbyA.rotation, nearbyB.rotation);
    assert.notEqual(nearbyA.position[2], nearbyB.position[2]);
    const early = await seek(at("class-service")),
      later = await seek(at("add-school-tools"));
    assert.deepEqual(JSON.parse(early.threeVisibleIds), ["dipull:campus"]);
    assert.ok(JSON.parse(later.threeVisibleIds).includes("dipull:laundry"));
    const media = await seek(at("wakeup-screen"));
    assert.deepEqual(
      JSON.parse(media.threeVisibleIds),
      [],
      "3D does not cover the product viewport",
    );
    const waf = await seek(at("waf-ending"));
    assert.deepEqual(
      JSON.parse(waf.threeVisibleIds),
      ["ax:waf-radar", "ax:waf-shield", "ax:waf-events"],
      "WAF uses its own real3D set, not Lily objects",
    );
    const radar = JSON.parse(waf.threePose).find((item) => item.name === "waf-radar");
    assert.ok(radar.visible && radar.scale > 1);
    await p.screenshot({ path: `${out}/${engine}-${width}-waf.png` });
    const costs = [];
    for (let step = 0; step <= 38; step++) {
      costs.push(+(await seek(step / 38)).threeDrawCalls);
    }
    assert.ok(Math.max(...costs) < 180, "bounded calls while sentence/chapter sets crossfade");
    const first = await seek(0.4);
    await seek(0.8);
    const reverse = await seek(0.4);
    assert.equal(reverse.threePose, first.threePose, "3D pose reverses exactly");
    await p.waitForFunction(
      () => document.querySelector(".story-three-host").dataset.threeMotion === "running",
    );
    const beforeMotion = await host.evaluate((e) => ({ ...e.dataset }));
    const heldBeat = await p.locator(".scroll-story").getAttribute("data-story-beat");
    const heldY = await p.evaluate(() => scrollY);
    await p.waitForTimeout(650);
    const afterMotion = await host.evaluate((e) => ({ ...e.dataset }));
    assert.ok(
      +afterMotion.threeFrames > +beforeMotion.threeFrames,
      "decorative motion renders while reading",
    );
    assert.ok(
      +afterMotion.threeFrames - +beforeMotion.threeFrames <= 45,
      "motion stays at60fps or lower",
    );
    assert.equal(
      afterMotion.threePose,
      beforeMotion.threePose,
      "the scroll-derived base remains exact",
    );
    assert.notEqual(
      afterMotion.threeAnimatedPose,
      beforeMotion.threeAnimatedPose,
      "actual 3D gently moves",
    );
    assert.equal(
      await p.locator(".scroll-story").getAttribute("data-story-beat"),
      heldBeat,
      "no automatic text advance",
    );
    assert.equal(await p.evaluate(() => scrollY), heldY);
    const animated = JSON.parse(afterMotion.threeAnimatedPose),
      basePose = JSON.parse(afterMotion.threePose);
    for (let i = 0; i < animated.length; i++) {
      assert.ok(Math.abs(animated[i].position[1] - basePose[i].position[1]) <= 0.121);
      assert.ok(Math.abs(animated[i].rotation[1] - basePose[i].rotation[1]) <= 0.091);
    }
    await seek(at("wakeup-screen"));
    await p.waitForFunction(
      () => document.querySelector(".story-three-host").dataset.threeMotion === "paused",
    );
    let frozen = +(await host.getAttribute("data-three-frames"));
    await p.waitForTimeout(200);
    assert.equal(
      +(await host.getAttribute("data-three-frames")),
      frozen,
      "no background drawing behind product pictures",
    );
    await seek(at("internal-ending"));
    await p.waitForFunction(
      () => document.querySelector(".story-three-host").dataset.threeMotion === "running",
    );
    // Exercise visibility handler without claiming an OS/browser-tab automation test.
    await p.evaluate(() => {
      Object.defineProperty(document, "hidden", { configurable: true, value: true });
      document.dispatchEvent(new Event("visibilitychange"));
    });
    await p.waitForFunction(
      () => document.querySelector(".story-three-host").dataset.threeMotion === "paused",
    );
    frozen = +(await host.getAttribute("data-three-frames"));
    await p.waitForTimeout(200);
    assert.equal(+(await host.getAttribute("data-three-frames")), frozen);
    await p.evaluate(() => {
      delete document.hidden;
      document.dispatchEvent(new Event("visibilitychange"));
    });
    await p.waitForFunction(
      () => document.querySelector(".story-three-host").dataset.threeMotion === "running",
    );
    await p.locator('.scroll-story-actions a[href="#work"]').click();
    await p.waitForFunction(
      () => document.querySelector(".story-three-host").dataset.threeMotion === "paused",
    );
    await p.waitForTimeout(100);
    frozen = +(await host.getAttribute("data-three-frames"));
    await p.waitForTimeout(200);
    assert.equal(
      +(await host.getAttribute("data-three-frames")),
      frozen,
      "offscreen drawing stops",
    );
    await seek(at("internal-ending"));
    await p.waitForFunction(
      () => document.querySelector(".story-three-host").dataset.threeMotion === "running",
    );
    await p.emulateMedia({ reducedMotion: "reduce" });
    await p.waitForFunction(() => !document.querySelector(".story-three-canvas"));
    await p.evaluate(() => history.replaceState(null, "", location.pathname));
    await p.emulateMedia({ reducedMotion: "no-preference" });
    await p.waitForFunction(
      () => document.querySelector(".scroll-story").dataset.enhanced === "true",
    );
    await seek(at("internal-ending"));
    await p.waitForFunction(
      () => document.querySelector(".story-three-host")?.dataset.threeReady === "true",
    );
    await p.getByRole("button", { name: "움직임 없이 보기", exact: true }).click();
    await p.waitForFunction(() => !document.querySelector(".story-three-canvas"));
    assert.deepEqual(errors, []);
    results.push({
      engine,
      width,
      webgl: true,
      rendered: true,
      chapters: 5,
      models: 25,
      wafOwnModels: true,
      distinctModelSets: true,
      chapterReveal: true,
      rotation: true,
      zMotion: true,
      deterministicReverse: true,
      readingMotion: true,
      textStaysStill: true,
      motionPausedOnImagesHiddenOffscreenReduced: true,
      dispose: true,
      maxDrawCalls: Math.max(...costs),
      sameModelRotationAndDepth: true,
      sentenceLinkedAppearance: true,
      triangles: states.at(-1).threeTriangles,
    });
    await p.close();
  }
  await b.close();
}
writeFileSync(`${out}/report.json`, JSON.stringify({ base, results }, null, 2));
console.log(JSON.stringify({ passed: true, base, results }));
