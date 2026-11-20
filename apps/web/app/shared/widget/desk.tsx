import { useEffect, useRef, useState } from "react";
import type { Demo } from "~/shared/bits/demo";
import { Bit, usePrefersReducedMotion } from "~/shared/widget/bit";
import "~/shared/bits/desk.css";

/** Keeps the listed pieces, in the order asked for. */
export function pick(demos: Demo[], names: string[]) {
  return names.flatMap((name) => demos.filter((demo) => demo.name === name));
}

/**
 * Deals one entry out by a page's place in a list. A step that shares no factor with the
 * list length visits every entry before any repeats, so neighbours never look alike.
 */
export function dealt<T>(list: T[], order: number, start: number) {
  const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
  let step = start;
  while (gcd(step, list.length) !== 1) step += 1;
  return list[(Math.max(0, order) * step) % list.length];
}

/* One dark, screen-like box that a React Bits component lives in. It measures itself
   so a piece can size to the box, and holds self-running pieces when the visitor has
   asked for less motion. */
export function Stage({ demo, height }: { demo: Demo; height: number }) {
  const reduced = usePrefersReducedMotion();
  const [allowed, setAllowed] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const node = box.current;
    if (!node) return undefined;
    const observer = new ResizeObserver(([entry]) => setWidth(Math.round(entry.contentRect.width)));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  const held = reduced && demo.auto && !allowed;
  const fit = demo.fit ?? "center";
  return (
    <div
      ref={box}
      className={`desk-stage desk-stage--${demo.tone ?? "ink"} desk-stage--${fit}`}
      style={{ minHeight: demo.height ?? height }}
    >
      {held ? (
        <div className="desk-held">
          <p>움직임 줄이기가 켜져 있어서 멈춰 뒀어요.</p>
          <button type="button" className="desk-button" onClick={() => setAllowed(true)}>
            이것만 움직이기
          </button>
        </div>
      ) : (
        width > 0 && (
          <Bit
            name={demo.name}
            className={`desk-bit desk-bit--${fit}`}
            fallback={<p className="desk-fallback">이 브라우저에서는 보여 드리지 못했어요.</p>}
            render={(bit) => demo.render(bit, { width })}
          />
        )
      )}
    </div>
  );
}

/** Several pieces side by side. Under each, only what to try with it. */
export function Shelf({
  demos,
  height = 220,
  bare = false,
  className = "",
}: {
  demos: Demo[];
  height?: number;
  /** Purely decorative row: no helper line, hidden from assistive technology. */
  bare?: boolean;
  className?: string;
}) {
  return (
    <div className={`desk-shelf ${className}`.trim()}>
      {demos.map((demo) =>
        bare ? (
          <div
            className={`desk-tile desk-tile--${demo.span ?? 1}`}
            key={demo.name}
            aria-hidden="true"
          >
            <Stage demo={demo} height={height} />
          </div>
        ) : (
          <div className={`desk-tile desk-tile--${demo.span ?? 1}`} key={demo.name}>
            <Stage demo={demo} height={height} />
            {demo.hint && <p className="desk-hint">{demo.hint}</p>}
          </div>
        ),
      )}
    </div>
  );
}

/** One piece, chosen for this page. */
export function One({
  demo,
  height = 360,
  className = "",
}: {
  demo: Demo;
  height?: number;
  className?: string;
}) {
  return (
    <div className={`desk-one ${className}`.trim()}>
      <Stage demo={demo} height={height} />
      {demo.hint && <p className="desk-hint">{demo.hint}</p>}
    </div>
  );
}

/** One stage and a single button that shows the same content another way. */
export function Turner({
  demos,
  height = 480,
  start = 0,
  className = "",
}: {
  demos: Demo[];
  height?: number;
  start?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(start % demos.length);
  const demo = demos[index];
  return (
    <div className={`desk-turner ${className}`.trim()}>
      <Stage key={demo.name} demo={demo} height={height} />
      <div className="desk-turner-bar">
        <p className="desk-hint" aria-live="polite">
          {demo.hint}
        </p>
        <button
          type="button"
          className="desk-turn"
          data-turns={demos.length}
          onClick={() => setIndex((index + 1) % demos.length)}
        >
          다르게 보기
          <span className="desk-turn-count" aria-hidden="true">
            {index + 1} / {demos.length}
          </span>
        </button>
      </div>
    </div>
  );
}
