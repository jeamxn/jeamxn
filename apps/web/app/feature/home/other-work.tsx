import type { Project } from "@jeamxn/contract";
import { Icon } from "@jeamxn/icon";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router";
import {
  nextBatch,
  otherProjects,
  projectBatches,
  ROTATION_INTERVAL,
} from "~/shared/lib/project-rotation";

export function OtherWork({ projects }: { projects: Project[] }) {
  const records = useMemo(() => otherProjects(projects), [projects]);
  const batches = useMemo(() => projectBatches(records), [records]);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(true);
  const [visible, setVisible] = useState(true);
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [manualAnnouncement, setManualAnnouncement] = useState("");
  const section = useRef<HTMLElement>(null);
  const measureRow = useRef<HTMLDivElement>(null);
  const batch = batches[index] ?? [];
  const running =
    !paused && !reduced && visible && inView && !hovered && !focused && batches.length > 1;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => {
      setReduced(media.matches);
      if (media.matches) setPaused(true);
    };
    const updateVisibility = () => setVisible(document.visibilityState === "visible");
    updateMotion();
    updateVisibility();
    media.addEventListener("change", updateMotion);
    document.addEventListener("visibilitychange", updateVisibility);
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.15,
    });
    if (section.current) observer.observe(section.current);
    return () => {
      media.removeEventListener("change", updateMotion);
      document.removeEventListener("visibilitychange", updateVisibility);
      observer.disconnect();
    };
  }, []);

  // One inert measuring row reserves the tallest record, not 83 hidden links.
  useEffect(() => {
    const root = section.current;
    const row = measureRow.current;
    if (!root || !row || !records.length) return;
    let lastWidth = -1;
    const measure = () => {
      const width = root.getBoundingClientRect().width;
      if (width === lastWidth) return;
      lastWidth = width;
      let height = 0;
      for (const record of records) {
        const name = row.querySelector(".work-row-name");
        const summary = row.querySelector(".work-row-summary");
        const period = row.querySelector(".work-row-period");
        if (name) name.textContent = record.name;
        if (summary) summary.textContent = record.summary;
        if (period) period.textContent = record.period;
        height = Math.max(height, row.getBoundingClientRect().height);
      }
      root.style.setProperty("--rotation-row-height", `${Math.ceil(height)}px`);
    };
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    measure();
    void document.fonts.ready.then(() => {
      if (!root.isConnected) return;
      lastWidth = -1;
      measure();
    });
    return () => observer.disconnect();
  }, [records]);

  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(
      () => setIndex((current) => nextBatch(current, 1, batches.length)),
      ROTATION_INTERVAL,
    );
    return () => window.clearTimeout(timer);
  }, [running, index, batches.length]);

  const move = (direction: number) => {
    const destination = nextBatch(index, direction, batches.length);
    setPaused(true);
    setIndex(destination);
    setManualAnnouncement(`${destination + 1} / ${batches.length} 묶음`);
  };
  const status = paused || reduced ? "일시정지" : running ? "5초마다 자동 전환" : "읽는 동안 멈춤";

  return (
    <section
      className="other-work work-rotation"
      aria-labelledby="other-work-title"
      ref={section}
      data-running={running}
      data-batch={index + 1}
      data-record-count={records.length}
      onPointerEnter={(event) => {
        if (event.pointerType !== "touch") setHovered(true);
      }}
      onPointerLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
    >
      <div className="rotation-heading">
        <h3 id="other-work-title">그리고 이런 것들을 만들었습니다.</h3>
        <p>{records.length}개의 작업 기록 / 세 개씩 살펴보기</p>
      </div>
      <div className="rotation-controls">
        <span className="rotation-count" aria-live="off">
          {index + 1} / {batches.length} 묶음
        </span>
        <span className="rotation-status">{status}</span>
        <div className="rotation-buttons">
          <button
            type="button"
            aria-label="이전 작업 묶음"
            onClick={() => move(-1)}
            disabled={batches.length < 2}
          >
            <Icon name="arrow-right" size={20} className="rotation-previous" />
          </button>
          <button
            type="button"
            className="rotation-toggle"
            onClick={() => setPaused((value) => !value)}
            disabled={reduced || batches.length < 2}
          >
            {paused || reduced ? "자동 전환 시작" : "자동 전환 멈춤"}
          </button>
          <button
            type="button"
            aria-label="다음 작업 묶음"
            onClick={() => move(1)}
            disabled={batches.length < 2}
          >
            <Icon name="arrow-right" size={20} />
          </button>
        </div>
      </div>
      <div className="rotation-progress" aria-hidden="true">
        <span key={`${index}-${running}`} className={running ? "is-running" : ""} />
      </div>
      <div className="rotation-stage" aria-live="off">
        <div className="rotation-batch" key={index}>
          {batch.map((project) => (
            <Link to={`/work/${project.slug}`} className="work-row" key={project.slug}>
              <span className="work-row-name" translate="no">
                {project.name}
              </span>
              <span className="work-row-summary">{project.summary}</span>
              <span className="work-row-period">{project.period}</span>
              <Icon name="arrow-up-right" size={23} />
            </Link>
          ))}
        </div>
        <div className="work-row rotation-measure" ref={measureRow} aria-hidden="true" inert>
          <span className="work-row-name" />
          <span className="work-row-summary" />
          <span className="work-row-period" />
          <Icon name="arrow-up-right" size={23} />
        </div>
      </div>
      <span className="sr-only" aria-live="polite">
        {manualAnnouncement}
      </span>
      <Link className="text-link home-archive-link" to="/work">
        작은 실험까지, 모든 작업 기록 보기 <Icon name="arrow-right" size={20} />
      </Link>
    </section>
  );
}
