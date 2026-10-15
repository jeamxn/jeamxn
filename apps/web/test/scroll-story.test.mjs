import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { portfolio } from "@jeamxn/core";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";
import {
  activeStory,
  clampUnit,
  STORY_ANCHORS,
  smoothStep,
  storyPose,
  storyProgress,
  storyScrollTarget,
} from "../app/shared/lib/scroll-story.ts";

test("unit clamp rejects nonfinite input and clamps both ends", () => {
  for (const value of [NaN, Infinity, -Infinity, -5]) assert.equal(clampUnit(value), 0);
  assert.equal(clampUnit(3), 1);
  assert.equal(clampUnit(0.7), 0.7);
});
test("progress starts only when the normal-flow header has left the pin origin", () => {
  assert.equal(storyProgress(108, 3960, 792), 0);
  assert.equal(storyProgress(0, 3960, 792), 0);
});
test("pin travel subtracts the actual frame rather than viewport height", () => {
  assert.equal(storyProgress(-1584, 3960, 792), 0.5);
});
test("release clamps at the exact end of the sticky travel", () => {
  assert.equal(storyProgress(-3168, 3960, 792), 1);
  assert.equal(storyProgress(-9000, 3960, 792), 1);
});
test("zero or negative travel remains safe", () => {
  assert.equal(storyProgress(-100, 100, 100), 0);
  assert.equal(storyProgress(-100, 50, 100), 0);
});
test("four dwell anchors have exactly one full-opacity scene", () => {
  STORY_ANCHORS.forEach((progress, active) => {
    for (let i = 0; i < 4; i++) assert.equal(storyPose(progress, i).opacity, i === active ? 1 : 0);
  });
});
test("every crossfade has complementary opacity without a blank frame", () => {
  for (let step = 0; step <= 1000; step++) {
    const total = [0, 1, 2, 3].reduce((sum, i) => sum + storyPose(step / 1000, i).opacity, 0);
    assert.ok(Math.abs(total - 1) < 0.00001);
  }
});
test("poses are deterministic under arbitrary scroll reversal", () => {
  const forward = [0, 0.17, 0.41, 0.52, 0.73, 1].map((p) => storyPose(p, 1));
  const reverse = [1, 0.73, 0.52, 0.41, 0.17, 0].map((p) => storyPose(p, 1)).reverse();
  assert.deepEqual(forward, reverse);
});
test("pose travel and scale remain restrained and finite", () => {
  for (let step = -10; step <= 110; step++) {
    for (let i = 0; i < 4; i++) {
      const pose = storyPose(step / 100, i);
      assert.ok(Math.abs(pose.y) <= 28);
      assert.ok(pose.scale >= 0.975 && pose.scale <= 1);
      assert.ok(pose.opacity >= 0 && pose.opacity <= 1);
    }
  }
});
test("smoothstep has stable exact endpoints and symmetric interpolation", () => {
  assert.equal(smoothStep(-1), 0);
  assert.equal(smoothStep(2), 1);
  assert.equal(smoothStep(0.5), 0.5);
  assert.ok(Math.abs(smoothStep(0.3) + smoothStep(0.7) - 1) < 0.00001);
});
test("active boundary changes only at midpoint between scene anchors", () => {
  assert.equal(activeStory(1 / 6 - 0.0001), 0);
  assert.equal(activeStory(1 / 6 + 0.0001), 1);
  assert.equal(activeStory(0.5), 2);
  assert.equal(activeStory(1), 3);
});
test("navigation target is the exact inverse of the progress mapping", () => {
  STORY_ANCHORS.forEach((p, i) => {
    const target = storyScrollTarget(108, 3960, 792, i);
    assert.ok(Math.abs(storyProgress(108 - target, 3960, 792) - p) < 0.00001);
  });
  assert.equal(storyScrollTarget(-20, 10, 20, 10), 0);
});

let vite;
let html;
before(async () => {
  vite = await createServer({
    configFile: false,
    resolve: { tsconfigPaths: true },
    server: { middlewareMode: true, hmr: false, ws: false },
    appType: "custom",
  });
  const { ScrollStory } = await vite.ssrLoadModule("/app/feature/home/scroll-story.tsx");
  html = renderToStaticMarkup(createElement(ScrollStory, { data: portfolio }));
});
after(async () => vite?.close());

test("SSR is deterministic and begins with complete normal-flow content", async () => {
  const { ScrollStory } = await vite.ssrLoadModule("/app/feature/home/scroll-story.tsx");
  assert.equal(html, renderToStaticMarkup(createElement(ScrollStory, { data: portfolio })));
  assert.doesNotMatch(html, /data-enhanced=|aria-hidden=|inert=|style=/);
  assert.equal((html.match(/class="scroll-story-panel /g) ?? []).length, 4);
});
test("SSR has one real headline and a fully visible original portrait", () => {
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
  assert.ok(html.includes(portfolio.profile.headline));
  assert.ok(html.includes('src="/images/portrait.webp"'));
  assert.ok(html.includes('width="1800" height="1200"'));
  assert.ok(html.includes('fetchPriority="high"'));
});
test("only actual curated product captures and honest captions are used", () => {
  for (const slug of ["dipull", "ara"]) {
    const project = portfolio.projects.find((p) => p.slug === slug);
    const screen = project.screens.find((s) => s.id === (slug === "dipull" ? "wakeup" : "canvas"));
    assert.ok(html.includes(screen.src));
    assert.ok(html.includes(screen.caption));
    assert.ok(html.includes(screen.alt));
  }
});
test("all curated leads and shared authorship remain available without JavaScript", () => {
  assert.ok(html.includes(portfolio.profile.intro));
  for (const slug of ["dipull", "pfct", "ara"]) {
    assert.ok(html.includes(portfolio.projects.find((p) => p.slug === slug).lead));
  }
  assert.ok(html.includes("박성민과 함께"));
  assert.ok(html.includes("KT SAT"));
});
test("accessible controls stay outside every inactive scene", () => {
  assert.ok(html.includes('href="#work"'));
  assert.ok(html.includes("대표 작업 바로 보기"));
  assert.ok(html.includes("움직임 없이 보기"));
  assert.equal((html.match(/<button/g) ?? []).length, 5);
  const panelsOnly = html.slice(
    html.indexOf('class="scroll-story-panels'),
    html.indexOf('class="scroll-story-controls'),
  );
  assert.doesNotMatch(panelsOnly, /<a\b|<button\b|tabindex="(?:0|[1-9]\d*)"/i);
});
