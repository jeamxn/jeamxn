import type { Portfolio } from "@jeamxn/contract";
import { HOME_STORY } from "@jeamxn/core";
import { type MouseEvent, useEffect, useRef, useState } from "react";
import {
  activeBeat,
  activeStory,
  beatScrollTarget,
  STORY_BEAT_TRAVEL_SVH,
  STORY_BEATS,
  sentencePose,
  storyLinePose,
  storyPose,
  storyProgress,
  storyScrollTarget,
} from "~/shared/lib/scroll-story";
import { sitePath } from "~/shared/lib/site-path";
import { Portrait } from "~/shared/widget/portrait";
import { StoryTools } from "./story-tools";
import "./scroll-story.css";

import type { StoryScene } from "./story-three";

const labels = ["최재민", "Dipull", "Internal", "AX", "ara"];

export function ScrollStory({ data }: { data: Portfolio }) {
  const root = useRef<HTMLElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const threeHost = useRef<HTMLDivElement>(null);
  const threeScene = useRef<StoryScene | null>(null);
  const lastProgress = useRef(0);
  const panels = useRef<(HTMLElement | null)[]>([]);
  const sentences = useRef<(HTMLElement | null)[]>([]);
  const media = useRef<(HTMLElement | null)[]>([]);
  const lines = useRef<(HTMLElement | null)[][]>([]);
  const [still, setStill] = useState(false);
  const [capable, setCapable] = useState(false);
  const [ready, setReady] = useState(false);
  const pendingMode = useRef<{ index: number; beat: number; scroll: boolean } | null>(null);
  const [enhanced, setEnhanced] = useState(false);
  const [active, setActive] = useState(0);
  const [beat, setBeat] = useState(0);
  const { profile } = data;

  useEffect(() => {
    const media = window.matchMedia(
      "(prefers-reduced-motion: no-preference) and (min-width: 761px) and (min-height: 620px), (prefers-reduced-motion: no-preference) and (min-width: 350px) and (max-width: 760px) and (min-height: 740px)",
    );
    const sync = () => {
      setCapable(media.matches);
      setEnhanced(!still && media.matches);
      setReady(true);
    };
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, [still]);

  useEffect(() => {
    const pending = pendingMode.current;
    if (pending && pending.scroll === enhanced) {
      pendingMode.current = null;
      const id = window.requestAnimationFrame(() => {
        if (enhanced) {
          const section = root.current;
          const stage = frame.current;
          if (!section || !stage) return;
          const rect = section.getBoundingClientRect();
          window.scrollTo({
            top: beatScrollTarget(
              scrollY + rect.top,
              rect.height,
              stage.clientHeight,
              pending.beat,
            ),
            behavior: "instant",
          });
          section
            .querySelectorAll<HTMLButtonElement>(".scroll-story-chapters button")
            [pending.index]?.focus({ preventScroll: true });
        } else {
          const sentence = sentences.current[pending.beat] ?? panels.current[pending.index];
          sentence?.scrollIntoView({ behavior: "instant", block: "center" });
          sentence?.focus({ preventScroll: true });
        }
      });
      return () => window.cancelAnimationFrame(id);
    }
    // Static HTML cannot know the enhanced runway height. Re-anchor only real
    // deep links after enhancement, without hijacking ordinary scroll restoration.
    if (enhanced && window.location.hash === "#work") {
      const id = window.requestAnimationFrame(() =>
        document.getElementById("work")?.scrollIntoView({ behavior: "instant", block: "start" }),
      );
      return () => window.cancelAnimationFrame(id);
    }
  }, [enhanced]);

  useEffect(() => {
    if (!enhanced || !threeHost.current) return;
    let cancelled = false;
    const host = threeHost.current;
    void import("./story-three")
      .then(({ createStoryScene }) => {
        if (cancelled) return;
        try {
          const scene = createStoryScene(host);
          threeScene.current = scene;
          scene.paint(lastProgress.current, host.clientWidth <= 760);
        } catch {
          host.dataset.threeReady = "false";
        }
      })
      .catch(() => {
        host.dataset.threeReady = "false";
      });
    return () => {
      cancelled = true;
      threeScene.current?.dispose();
      threeScene.current = null;
    };
  }, [enhanced]);

  useEffect(() => {
    if (!enhanced) return;
    const section = root.current;
    const stage = frame.current;
    if (!section || !stage) return;
    let pending = 0;
    let frameHeight = stage.getBoundingClientRect().height;
    let narrow = stage.clientWidth <= 760;
    let previousActive = -1;
    let previousBeat = -1;
    let displayed = lastProgress.current;
    let lastPaint = 0;
    let lastGesture = -Infinity;
    const gesture = () => {
      lastGesture = performance.now();
    };
    const scrollKey = (event: KeyboardEvent) => {
      if (
        ["ArrowDown", "ArrowUp", "PageDown", "PageUp", " "].includes(event.key) &&
        !(event.target instanceof HTMLInputElement) &&
        !(event.target instanceof HTMLTextAreaElement)
      )
        gesture();
    };
    const paint = (timestamp: number) => {
      pending = 0;
      // One geometry read, then writes. No layout reads after updating a pose.
      const rect = section.getBoundingClientRect();
      const target = storyProgress(rect.top, rect.height, frameHeight);
      const delta = lastPaint ? Math.min(50, timestamp - lastPaint) : 16;
      const fromGesture = timestamp - lastGesture < 240;
      const near = Math.abs(target - displayed) * (STORY_BEATS.length - 1) < 0.8;
      const smooth = (fromGesture || section.dataset.storySmoothing === "true") && near;
      displayed = smooth ? displayed + (target - displayed) * (1 - Math.exp(-delta / 90)) : target;
      if (Math.abs(target - displayed) < 0.000005) displayed = target;
      lastPaint = timestamp;
      const progress = displayed;
      const catching = displayed !== target;
      section.dataset.storySmoothing = catching ? "true" : "false";
      section.dataset.storyTarget = String(target);
      if (catching && !document.hidden) pending = window.requestAnimationFrame(paint);
      lastProgress.current = progress;
      threeScene.current?.paint(progress, narrow);
      section.dataset.pinned = rect.bottom >= frameHeight && rect.top <= 1 ? "true" : "false";
      for (const [index, panel] of panels.current.entries()) {
        if (!panel) continue;
        const pose = storyPose(progress, index);
        panel.style.setProperty("--story-opacity", String(pose.opacity));
        panel.style.setProperty("--story-y", `${pose.y}px`);
        panel.style.setProperty("--story-scale", String(pose.scale));
      }
      for (const [index, sentence] of sentences.current.entries()) {
        if (!sentence) continue;
        const pose = sentencePose(progress, index);
        const chapterOpacity = storyPose(progress, STORY_BEATS[index].chapterIndex).opacity;
        sentence.style.setProperty(
          "--sentence-opacity",
          String(chapterOpacity > 0 ? Math.min(1, pose.opacity / chapterOpacity) : 0),
        );
        sentence.style.setProperty("--sentence-y", `${pose.y}px`);
      }
      for (const [index, row] of lines.current.entries()) {
        if (!row) continue;
        for (const [line, node] of row.entries()) {
          if (!node) continue;
          const pose = storyLinePose(progress, index, line, row.length);
          node.style.setProperty("--line-opacity", String(pose.opacity));
          node.style.setProperty("--line-y", `${pose.y}px`);
        }
      }
      for (const [index, figure] of media.current.entries()) {
        if (!figure) continue;
        const pose = sentencePose(progress, index);
        const chapterOpacity = storyPose(progress, STORY_BEATS[index].chapterIndex).opacity;
        figure.style.setProperty(
          "--media-opacity",
          String(chapterOpacity > 0 ? Math.min(1, pose.opacity / chapterOpacity) : 0),
        );
        figure.style.setProperty("--media-y", `${pose.y}px`);
      }
      const nextBeat = activeBeat(progress);
      section.dataset.storyScreen = STORY_BEATS[nextBeat].screen ? "true" : "false";
      section.dataset.storyBeat = String(nextBeat);
      if (nextBeat !== previousBeat) {
        previousBeat = nextBeat;
        setBeat(nextBeat);
      }
      section.style.setProperty("--story-progress", String(progress));
      const next = activeStory(progress);
      if (next !== previousActive) {
        previousActive = next;
        setActive(next);
      }
    };
    const schedule = () => {
      if (!pending) pending = window.requestAnimationFrame(paint);
    };
    const resize = () => {
      frameHeight = stage.getBoundingClientRect().height;
      narrow = stage.clientWidth <= 760;
      schedule();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(stage);
    window.addEventListener("wheel", gesture, { passive: true });
    window.addEventListener("touchmove", gesture, { passive: true });
    window.addEventListener("keydown", scrollKey);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", resize, { passive: true });
    schedule();
    return () => {
      if (pending) window.cancelAnimationFrame(pending);
      observer.disconnect();
      window.removeEventListener("wheel", gesture);
      window.removeEventListener("touchmove", gesture);
      window.removeEventListener("keydown", scrollKey);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", resize);
    };
  }, [enhanced]);

  const jumpTo = (index: number) => {
    if (!enhanced) {
      panels.current[index]?.scrollIntoView({ behavior: "instant", block: "start" });
      return;
    }
    const section = root.current;
    const stage = frame.current;
    if (!section || !stage) return;
    const rect = section.getBoundingClientRect();
    window.scrollTo({
      top: storyScrollTarget(window.scrollY + rect.top, rect.height, stage.clientHeight, index),
      behavior: "instant",
    });
  };
  const skipStory = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
      return;
    const work = document.getElementById("work");
    if (!work) return;
    event.preventDefault();
    window.history.pushState(null, "", "#work");
    work.scrollIntoView({ behavior: "instant", block: "start" });
    work.setAttribute("tabindex", "-1");
    work.focus({ preventScroll: true });
  };
  const toggleReading = () => {
    const nextStill = !still;
    const section = root.current;
    const stage = frame.current;
    const current =
      enhanced && section && stage
        ? activeStory(
            storyProgress(
              section.getBoundingClientRect().top,
              section.getBoundingClientRect().height,
              stage.clientHeight,
            ),
          )
        : active;
    pendingMode.current = {
      index: current,
      beat: enhanced ? activeBeat(lastProgress.current) : beat,
      scroll: !nextStill && capable,
    };
    setStill(nextStill);
  };
  const panelProps = (index: number) => ({
    tabIndex: -1,
    ref: (node: HTMLElement | null) => {
      panels.current[index] = node;
    },
    "aria-hidden": enhanced && active !== index ? true : undefined,
    inert: enhanced && active !== index ? true : undefined,
  });

  return (
    <section
      className="scroll-story"
      data-enhanced={enhanced ? "true" : undefined}
      data-ready={ready ? "true" : undefined}
      data-story-screen={STORY_BEATS[beat].screen ? "true" : "false"}
      style={
        {
          "--story-beat-count": STORY_BEATS.length,
          "--story-beat-travel": `${STORY_BEAT_TRAVEL_SVH}svh`,
        } as import("react").CSSProperties
      }
      ref={root}
      aria-label="최재민이 제품을 만드는 이야기"
    >
      <div className="scroll-story-stage" ref={frame}>
        <div className="scroll-story-panels container">
          {HOME_STORY.map((chapter, index) => (
            <section
              key={chapter.id}
              className={`scroll-story-panel scroll-story-${["person", "school", "company", "ax", "now"][index]}`}
              data-chapter={chapter.id}
              {...panelProps(index)}
            >
              <div className="scroll-story-copy">
                <p className="scroll-story-context" translate="no">
                  {index === 0 ? `제품을 만드는 ${profile.name}이에요.` : chapter.label}
                </p>
                {index !== 0 && <h2 className="sr-only">{chapter.label} 이야기</h2>}
                <div className="story-sentences">
                  {chapter.sentences.map((sentence, localIndex) => {
                    const ordinal = STORY_BEATS.findIndex(
                      (item) => item.chapter === chapter.id && item.localIndex === localIndex,
                    );
                    return (
                      <div
                        key={sentence.id}
                        className={`story-sentence${index === 1 || index === 4 ? " story-sentence--serif" : ""}${sentence.screen ? " story-sentence--screen" : ""}`}
                        data-story-sentence={ordinal}
                        data-story-id={sentence.id}
                        style={
                          { "--beat-order": localIndex * 2 + 1 } as import("react").CSSProperties
                        }
                        tabIndex={-1}
                        ref={(node) => {
                          sentences.current[ordinal] = node;
                        }}
                        aria-hidden={enhanced && beat !== ordinal ? true : undefined}
                        inert={enhanced && beat !== ordinal ? true : undefined}
                      >
                        {sentence.hero ? (
                          <h1 id="hero-title">
                            <span>행복한 개발자</span>
                            <span className="story-type-serif">기술보다 아이디어를</span>
                          </h1>
                        ) : (
                          <p className="story-sentence-text">
                            {(sentence.lines ?? [sentence.text]).map((text, line, list) => (
                              <span
                                key={text}
                                className="story-line"
                                data-story-line={`${ordinal}:${line}`}
                                ref={(node) => {
                                  lines.current[ordinal] ??= [];
                                  lines.current[ordinal][line] = node;
                                }}
                              >
                                {text}
                                {line < list.length - 1 ? "\n" : ""}
                              </span>
                            ))}
                          </p>
                        )}
                        {sentence.note && <p className="story-sentence-note">{sentence.note}</p>}
                        {sentence.link && (
                          <a className="story-detail-link" href={sitePath(sentence.link.href)}>
                            {sentence.link.label}
                            <span aria-hidden="true"> ↗</span>
                          </a>
                        )}
                      </div>
                    );
                  })}
                </div>
                <p className="story-reading-position" aria-hidden="true">
                  {Math.min(
                    chapter.sentences.length,
                    Math.max(
                      1,
                      STORY_BEATS[beat].chapterIndex === index
                        ? STORY_BEATS[beat].localIndex + 1
                        : 1,
                    ),
                  )}{" "}
                  / {chapter.sentences.length}
                </p>
              </div>
              {chapter.sentences.map((sentence, localIndex) => {
                if (!sentence.screen) return null;
                const spec = sentence.screen;
                const screen = data.projects
                  .find((project) => project.slug === spec.project)
                  ?.screens?.find((screen) => screen.id === spec.id);
                if (!screen) return null;
                const ordinal = STORY_BEATS.findIndex(
                  (item) => item.chapter === chapter.id && item.localIndex === localIndex,
                );
                return (
                  <figure
                    key={sentence.id}
                    className={`story-beat-media story-beat-media--${screen.device}`}
                    data-story-media={ordinal}
                    style={{ "--beat-order": localIndex * 2 + 2 } as import("react").CSSProperties}
                    ref={(node) => {
                      media.current[ordinal] = node;
                    }}
                    aria-hidden={enhanced && beat !== ordinal ? true : undefined}
                    inert={enhanced && beat !== ordinal ? true : undefined}
                  >
                    <div className="story-media-frame">
                      <img
                        className="story-media-image"
                        src={sitePath(screen.src)}
                        width={screen.width}
                        height={screen.height}
                        alt={screen.alt}
                        loading="lazy"
                        decoding="async"
                        ref={(image) => {
                          if (image?.complete && image.naturalWidth === 0)
                            image.closest("figure")?.setAttribute("data-image-failed", "true");
                        }}
                        onError={(event) => {
                          event.currentTarget
                            .closest("figure")
                            ?.setAttribute("data-image-failed", "true");
                        }}
                      />
                    </div>
                    <p className="story-media-fallback">
                      {screen.title} 화면을 불러오지 못했어요. 자세한 내용은 작업 이야기에서 읽을 수
                      있어요.
                    </p>
                    <figcaption className="story-media-caption">
                      <span className="story-media-title">{screen.title}</span>
                      {screen.caption}
                    </figcaption>
                  </figure>
                );
              })}
              {index === 0 && (
                <div
                  className="scroll-story-person-media"
                  data-intro-portrait
                  aria-hidden={enhanced && beat !== 0 ? true : undefined}
                >
                  <Portrait src={profile.portrait} className="scroll-story-portrait" priority />
                  <p className="scroll-story-name" translate="no">
                    {profile.nameEn}
                  </p>
                </div>
              )}
            </section>
          ))}
          <div className="story-three-host" ref={threeHost} aria-hidden="true" />
          <StoryTools chapter={active} waf={STORY_BEATS[beat].id.startsWith("waf-")} />
        </div>
        <div className="scroll-story-controls container">
          <nav className="scroll-story-chapters" aria-label="이야기 장면">
            {labels.map((label, index) => (
              <button
                type="button"
                key={label}
                aria-current={enhanced && active === index ? "step" : undefined}
                onClick={() => jumpTo(index)}
              >
                {label}
              </button>
            ))}
          </nav>
          <div className="scroll-story-actions">
            <button
              type="button"
              onClick={toggleReading}
              aria-pressed={still}
              disabled={!ready || !capable}
            >
              {still ? "스크롤로 보기" : "움직임 없이 보기"}
            </button>
            {/* biome-ignore lint/a11y/useValidAnchor: real hash navigation with native no-JS/modified-click fallback */}
            <a href="#work" onClick={skipStory}>
              대표 작업 바로 보기
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
