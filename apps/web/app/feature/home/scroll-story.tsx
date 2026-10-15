import type { Portfolio, ProjectScreen } from "@jeamxn/contract";
import { type MouseEvent, useEffect, useRef, useState } from "react";
import {
  activeStory,
  storyPose,
  storyProgress,
  storyScrollTarget,
} from "~/shared/lib/scroll-story";
import { Portrait } from "~/shared/widget/portrait";
import "./scroll-story.css";

const labels = ["최재민", "학교에서", "동료들과", "지금은"];

function Screen({ screen, className = "" }: { screen: ProjectScreen; className?: string }) {
  return (
    <figure className={`scroll-story-screen ${className}`}>
      <img
        src={screen.src}
        alt={screen.alt}
        width={screen.width}
        height={screen.height}
        loading="lazy"
        decoding="async"
      />
      <figcaption>{screen.caption}</figcaption>
    </figure>
  );
}

export function ScrollStory({ data }: { data: Portfolio }) {
  const root = useRef<HTMLElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const panels = useRef<(HTMLElement | null)[]>([]);
  const [still, setStill] = useState(false);
  const [capable, setCapable] = useState(false);
  const [ready, setReady] = useState(false);
  const pendingMode = useRef<{ index: number; scroll: boolean } | null>(null);
  const [enhanced, setEnhanced] = useState(false);
  const [active, setActive] = useState(0);
  const { profile } = data;
  const dipull = data.projects.find((project) => project.slug === "dipull");
  const ara = data.projects.find((project) => project.slug === "ara");
  const pfct = data.projects.find((project) => project.slug === "pfct");
  const lecture = data.activities.find((activity) => activity.slug === "kt-sat-ax");
  const phone = dipull?.screens?.find((screen) => screen.id === "wakeup");
  const workspace = ara?.screens?.find((screen) => screen.id === "canvas");

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
            top: storyScrollTarget(
              scrollY + rect.top,
              rect.height,
              stage.clientHeight,
              pending.index,
            ),
            behavior: "instant",
          });
          section
            .querySelectorAll<HTMLButtonElement>(".scroll-story-chapters button")
            [pending.index]?.focus({ preventScroll: true });
        } else {
          const panel = panels.current[pending.index];
          panel?.scrollIntoView({ behavior: "instant", block: "start" });
          panel?.focus({ preventScroll: true });
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
    if (!enhanced) return;
    const section = root.current;
    const stage = frame.current;
    if (!section || !stage) return;
    let pending = 0;
    let frameHeight = stage.getBoundingClientRect().height;
    let previousActive = -1;
    const paint = () => {
      pending = 0;
      // One geometry read, then writes. No layout reads after updating a pose.
      const rect = section.getBoundingClientRect();
      const progress = storyProgress(rect.top, rect.height, frameHeight);
      for (const [index, panel] of panels.current.entries()) {
        if (!panel) continue;
        const pose = storyPose(progress, index);
        panel.style.setProperty("--story-opacity", String(pose.opacity));
        panel.style.setProperty("--story-y", `${pose.y}px`);
        panel.style.setProperty("--story-scale", String(pose.scale));
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
      schedule();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(stage);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", resize, { passive: true });
    schedule();
    return () => {
      if (pending) window.cancelAnimationFrame(pending);
      observer.disconnect();
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
    pendingMode.current = { index: active, scroll: !nextStill && capable };
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
      ref={root}
      aria-label="최재민이 제품을 만드는 이야기"
    >
      <div className="scroll-story-stage" ref={frame}>
        <div className="scroll-story-panels container">
          <section className="scroll-story-panel scroll-story-person" {...panelProps(0)}>
            <div className="scroll-story-copy">
              <p className="scroll-story-greeting">제품을 만드는 {profile.name}입니다.</p>
              <h1 id="hero-title">{profile.headline}</h1>
              <p className="scroll-story-lead">{profile.intro}</p>
            </div>
            <div className="scroll-story-person-media">
              <Portrait src={profile.portrait} className="scroll-story-portrait" priority />
              <p className="scroll-story-name" translate="no">
                {profile.nameEn}
              </p>
            </div>
          </section>
          <section className="scroll-story-panel scroll-story-school" {...panelProps(1)}>
            <div className="scroll-story-copy">
              <p className="scroll-story-context" translate="no">
                Dipull
              </p>
              <h2>
                처음엔,
                <br />
                제가 쓰려고 만들었습니다.
              </h2>
              <p className="scroll-story-lead">{dipull?.lead ?? dipull?.summary}</p>
              <p className="scroll-story-detail">{dipull?.role}</p>
            </div>
            {phone && <Screen screen={phone} className="scroll-story-phone" />}
          </section>
          <section className="scroll-story-panel scroll-story-company" {...panelProps(2)}>
            <div className="scroll-story-copy">
              <p className="scroll-story-context" translate="no">
                PFCT
              </p>
              <h2>
                함께 쓰는 사람들의
                <br />
                일이 편해지도록.
              </h2>
              <p className="scroll-story-lead">{pfct?.lead ?? pfct?.summary}</p>
            </div>
            <div className="scroll-story-company-work">
              <p className="scroll-story-wordmark" translate="no">
                PFCT
              </p>
              <ul>
                <li>
                  통합 어드민 <span>스택 / 초기 코드 / 개발 워크플로</span>
                </li>
                <li>
                  DPD 대시보드 <span>채권 현황 / 필터 / 일괄 담당자 변경</span>
                </li>
                <li>
                  Lily <span>회의 / 실시간 문서 협업 / 업무 도구</span>
                </li>
              </ul>
              {lecture && (
                <div className="scroll-story-lecture">
                  <p translate="no">KT SAT</p>
                  <p>{lecture.title}</p>
                  <p>AI를 판단의 재료와 실제 업무 도구로 활용하는 방법을 설명했습니다.</p>
                </div>
              )}
            </div>
          </section>
          <section className="scroll-story-panel scroll-story-now" {...panelProps(3)}>
            <div className="scroll-story-copy">
              <p className="scroll-story-context" translate="no">
                ara
              </p>
              <h2>
                지금은,
                <br />
                함께 만드는 작업공간으로.
              </h2>
              <p className="scroll-story-lead">{ara?.lead ?? ara?.summary}</p>
              <p className="scroll-story-detail">
                박성민과 함께 아이디어를 내고, 구현하고, 테스트합니다.
              </p>
            </div>
            {workspace && <Screen screen={workspace} className="scroll-story-workspace" />}
          </section>
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
