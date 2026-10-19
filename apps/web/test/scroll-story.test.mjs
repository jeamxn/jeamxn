import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { portfolio } from "@jeamxn/core";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";
import {
  activeBeat,
  activeStory,
  chapterObjectPose,
  chapterWeight,
  clampUnit,
  modelWeight,
  portraitPose,
  STORY_ANCHORS,
  STORY_BEATS,
  STORY_CHAPTERS,
  STORY_TOOLS,
  sentencePose,
  smoothStep,
  storyLinePose,
  storyPose,
  storyProgress,
  storyScrollTarget,
  storyToolPose,
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
test("five dwell anchors have exactly one full-opacity scene", () => {
  STORY_ANCHORS.forEach((progress, active) => {
    for (let i = 0; i < STORY_CHAPTERS.length; i++)
      assert.equal(storyPose(progress, i).opacity, i === active ? 1 : 0);
  });
});
test("every crossfade has complementary opacity without a blank frame", () => {
  for (let step = 0; step <= 1000; step++) {
    const total = [0, 1, 2, 3, 4].reduce((sum, i) => sum + storyPose(step / 1000, i).opacity, 0);
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
    for (let i = 0; i < STORY_CHAPTERS.length; i++) {
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
  const boundary = STORY_ANCHORS[1] - 0.5 / (STORY_BEATS.length - 1);
  assert.equal(activeStory(boundary - 0.0001), 0);
  assert.equal(activeStory(boundary + 0.0001), 1);
  assert.equal(activeStory(STORY_ANCHORS[2]), 2);
  assert.equal(activeStory(1), 4);
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
  assert.doesNotMatch(html, /data-enhanced=|inert=/);
  assert.equal((html.match(/class="scroll-story-panel /g) ?? []).length, 5);
});
test("SSR has one real headline and a fully visible original portrait", () => {
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
  assert.ok(html.includes("행복한 개발자"));
  assert.ok(html.includes("기술보다 아이디어를"));
  assert.ok(html.includes('src="/images/portrait.webp"'));
  assert.ok(html.includes('width="1800" height="1200"'));
  assert.ok(html.includes('fetchPriority="high"'));
});
test("every factual sentence is complete in static HTML, with personal and PFCT stories separate", () => {
  for (const beat of STORY_BEATS.filter((beat) => !beat.hero))
    for (const line of beat.lines ?? [beat.text]) assert.ok(html.includes(line), beat.id);
  assert.equal((html.match(/data-story-sentence=/g) ?? []).length, STORY_BEATS.length);
  assert.ok(html.includes("Hermes Agent"));
  const ara = STORY_BEATS.filter((beat) => beat.chapter === "ara")
    .map((beat) => beat.text)
    .join(" ");
  assert.doesNotMatch(ara, /Lily|PFCT|사내/);
});
test("accessible controls stay outside every inactive scene", () => {
  assert.ok(html.includes('href="#work"'));
  assert.ok(html.includes("대표 작업 바로 보기"));
  assert.ok(html.includes("움직임 없이 보기"));
  assert.equal((html.match(/<button/g) ?? []).length, 6);
  const panelsOnly = html.slice(
    html.indexOf('class="scroll-story-panels'),
    html.indexOf('class="scroll-story-controls'),
  );
  assert.doesNotMatch(panelsOnly, /<button\b|tabindex="(?:0|[1-9]\d*)"/i);
  assert.equal((panelsOnly.match(/class="story-detail-link"/g) ?? []).length, 5);
});

test("eight continuous tools unfold, connect and collect without a playback clock", () => {
  assert.equal(STORY_TOOLS.length, 8);
  const spread = (progress) => {
    const poses = STORY_TOOLS.map((_, index) => storyToolPose(progress, index));
    return Math.max(...poses.map((p) => p.x)) - Math.min(...poses.map((p) => p.x));
  };
  assert.ok(spread(1 / 3) > spread(0) + 15);
  assert.ok(spread(2 / 3) > spread(1) + 15);
  assert.equal(storyToolPose(0, 0).connection, 0);
  assert.equal(storyToolPose(2 / 3, 0).connection, 1);
  assert.equal(storyToolPose(1, 0).connection, 0);
  for (let index = 0; index < 8; index++) {
    const first = storyToolPose(0.27, index);
    storyToolPose(0.85, index);
    assert.deepEqual(storyToolPose(0.27, index), first);
    for (let step = 0; step <= 300; step++) {
      const pose = storyToolPose(step / 300, index);
      assert.ok(pose.x >= 0 && pose.x <= 100 && pose.y >= 0 && pose.y <= 100);
      assert.ok(pose.scale >= 0.6 && pose.scale <= 1);
    }
  }
});
test("decorative persistent icons do not become misleading buttons or hide the real content", () => {
  assert.equal((html.match(/data-story-tool=/g) ?? []).length, 2);
  assert.ok(html.includes('class="story-constellation" aria-hidden="true"'));
  assert.ok(html.includes('class="story-type-serif"'));
  assert.doesNotMatch(html, /setInterval|autoplay/);
});

test("each chapter anchor contains only that chapter's own object set", () => {
  for (let active = 0; active < STORY_CHAPTERS.length; active++) {
    for (let other = 0; other < STORY_CHAPTERS.length; other++) {
      assert.equal(chapterWeight(STORY_ANCHORS[active], other), active === other ? 1 : 0);
    }
  }
});
test("Internal consoles consolidate and ara's tools gather into the integrated agent", () => {
  for (const narrow of [false, true]) {
    const before = chapterObjectPose(0.875, 4, 1, narrow);
    const after = chapterObjectPose(1, 4, 1, narrow);
    const center = narrow ? 50 : 73;
    assert.ok(Math.abs(after.x - center) <= Math.abs(before.x - center));
    const pose = chapterObjectPose(0.57, 2, 1, narrow);
    chapterObjectPose(0.81, 3, 2, narrow);
    assert.deepEqual(chapterObjectPose(0.57, 2, 1, narrow), pose);
  }
});

test("all sentence anchors have exactly one readable sentence and reversible model reveals", () => {
  assert.equal(STORY_BEATS.length, 42);
  for (let i = 0; i < STORY_BEATS.length; i++) {
    const p = i / (STORY_BEATS.length - 1);
    assert.equal(activeBeat(p), i);
    for (let j = 0; j < STORY_BEATS.length; j++)
      assert.equal(sentencePose(p, j).opacity, i === j ? 1 : 0);
    assert.equal(activeStory(p), STORY_BEATS[i].chapterIndex);
  }
  const anchor = (id) => STORY_BEATS.findIndex((beat) => beat.id === id) / (STORY_BEATS.length - 1);
  assert.equal(modelWeight(anchor("class-service"), 1, "laundry"), 0);
  assert.equal(modelWeight(anchor("add-school-tools"), 1, "laundry"), 1);
  assert.equal(modelWeight(anchor("ara-problem"), 4, "agent"), 0);
  assert.equal(modelWeight(anchor("ara-decision"), 4, "agent"), 1);
  assert.equal(modelWeight(anchor("wakeup-screen"), 1, "campus"), 0);
  const first = sentencePose(0.47, 9);
  sentencePose(0.8, 9);
  assert.deepEqual(sentencePose(0.47, 9), first);
});

test("owner's opening, incident, real viewports and chapter conclusions are retained", () => {
  assert.deepEqual(
    STORY_BEATS.slice(1, 4).map((beat) => beat.text),
    [
      "안녕하세요? 최재민입니다!",
      "저는 서비스로 더 많은 사람들을 행복하게 만들어주고 싶어요.",
      "저의 이야기를 한 번 들어볼래요?",
    ],
  );
  assert.match(STORY_BEATS.find((beat) => beat.id === "intranet-incident").note, /DB 랜섬웨어/u);
  const screens = STORY_BEATS.filter((beat) => beat.screen);
  assert.equal(screens.length, 8);
  for (const beat of screens) {
    const screen = portfolio.projects
      .find((project) => project.slug === beat.screen.project)
      .screens.find((screen) => screen.id === beat.screen.id);
    assert.ok(html.includes(screen.src));
    assert.ok(html.includes(screen.alt));
    assert.ok(html.includes(screen.caption));
  }
  for (const beat of STORY_BEATS.filter((beat) => beat.link)) {
    assert.ok(html.includes(beat.link.label));
    assert.ok(html.includes(`href="${beat.link.href}"`));
  }
});

test("long reading dwell never paints two adjacent sentences at once", () => {
  for (let sample = 0; sample <= 3600; sample++) {
    const p = sample / 3600,
      visible = STORY_BEATS.map((_, i) => sentencePose(p, i)).filter(
        (pose) => pose.opacity > 0.001,
      );
    assert.ok(visible.length <= 1, `overlapping sentences at ${p}`);
  }
  for (let i = 1; i < STORY_BEATS.length - 1; i++) {
    for (const local of [-0.35, -0.2, 0, 0.2, 0.35])
      assert.equal(sentencePose((i + local) / (STORY_BEATS.length - 1), i).opacity, 1);
  }
});

test("editorial lines reveal sequentially by scroll and stay fully readable at anchors", () => {
  const beat = STORY_BEATS.findIndex((item) => item.id === "hello"),
    end = STORY_BEATS.length - 1;
  const p = (beat - 0.35) / end;
  assert.ok(storyLinePose(p, beat, 0, 2).opacity > 0.75);
  assert.equal(storyLinePose(p, beat, 1, 2).opacity, 0);
  for (const count of [1, 2, 3])
    for (let i = 0; i < count; i++) {
      assert.equal(storyLinePose(beat / end, beat, i, count).opacity, 1);
      assert.equal(storyLinePose((beat + 0.35) / end, beat, i, count).opacity, 1);
    }
  const pose = storyLinePose((beat - 0.2) / end, beat, 1, 3);
  storyLinePose(0.9, beat, 1, 3);
  assert.deepEqual(storyLinePose((beat - 0.2) / end, beat, 1, 3), pose);
});

test("AI WAF has an independent main narrative, conclusion link and visible-only model set", () => {
  const waf = STORY_BEATS.filter((beat) => beat.id.startsWith("waf-"));
  assert.equal(waf.length, 6);
  assert.ok(waf.every((beat) => beat.chapter === "ax"));
  assert.equal(waf.at(-1).link.href, "/work/pfct#ai-waf-monitoring");
  for (const beat of waf) {
    assert.ok(html.includes(beat.lines[0]));
    assert.equal(beat.lines.join(" "), beat.text);
  }
  const anchor = STORY_BEATS.indexOf(waf.at(-1)) / (STORY_BEATS.length - 1);
  for (const id of ["waf-radar", "waf-shield", "waf-events"])
    assert.equal(modelWeight(anchor, 3, id), 1);
  for (const id of ["lily", "mcp-server", "meeting", "presentation"])
    assert.equal(modelWeight(anchor, 3, id), 0);
});

test("opening portrait fades with the headline and is gone before the first beat hands over", () => {
  const end = STORY_BEATS.length - 1;
  assert.equal(portraitPose(0).opacity, 1);
  assert.equal(portraitPose(0.5 / end).opacity, 0);
  let previous = 1;
  for (let i = 0; i <= 50; i++) {
    const { opacity } = portraitPose(i / 100 / end);
    assert.ok(opacity <= previous + 1e-9);
    previous = opacity;
  }
});

test("reading dwell keeps answering the scroll with a small drift", () => {
  const end = STORY_BEATS.length - 1;
  const a = sentencePose((5 - 0.2) / end, 5).y,
    b = sentencePose(5 / end, 5).y,
    c = sentencePose((5 + 0.2) / end, 5).y;
  assert.ok(a > b && b > c);
  assert.ok(Math.abs(a - c) <= 8);
});
