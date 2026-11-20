import {
  Component,
  type CSSProperties,
  type ReactNode,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { type BitModule, loadBit } from "~/shared/lib/bits";

class Boundary extends Component<
  { children: ReactNode; fallback: ReactNode; onFail: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onFail();
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

const reducedQuery = "(prefers-reduced-motion: reduce)";
function subscribeReduced(notify: () => void) {
  const media = window.matchMedia(reducedQuery);
  media.addEventListener("change", notify);
  return () => media.removeEventListener("change", notify);
}
/** False while prerendering and on the first client render, then the visitor's setting. */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia(reducedQuery).matches,
    () => false,
  );
}

type BitState = "idle" | "loading" | "ready" | "failed";

/**
 * Mounts one vendored component only while its box is near the viewport and takes it
 * down again when it leaves, so a long page never holds more than a few canvases
 * (browsers cap live WebGL contexts). Nothing renders on the server: the prerendered
 * HTML carries the surrounding copy and this box stays empty until hydration.
 */
export function Bit({
  name,
  render,
  className,
  style,
  fallback = null,
  placeholder = null,
  eager = false,
  keep = false,
  margin = "160px",
  decorative = false,
}: {
  name: string;
  render: (bit: BitModule) => ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Shown when the component cannot run in this browser (for example no WebGL). */
  fallback?: ReactNode;
  /** Shown until the component has loaded: prerendered HTML, no JavaScript, slow networks. */
  placeholder?: ReactNode;
  /** Mount as soon as the page hydrates instead of waiting for the viewport. */
  eager?: boolean;
  /** Stay mounted after leaving the viewport (cheap DOM-only components). */
  keep?: boolean;
  margin?: string;
  decorative?: boolean;
}) {
  const box = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const [bit, setBit] = useState<BitModule | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (eager) {
      setNear(true);
      return undefined;
    }
    const node = box.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setNear(true);
        else if (!keep) setNear(false);
      },
      { rootMargin: margin },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [eager, keep, margin]);

  useEffect(() => {
    if (!near) return undefined;
    let alive = true;
    setFailed(false);
    loadBit(name).then(
      (module) => alive && setBit(() => module),
      () => alive && setFailed(true),
    );
    return () => {
      alive = false;
    };
  }, [near, name]);

  const state: BitState = failed ? "failed" : !near ? "idle" : bit ? "ready" : "loading";
  return (
    <div
      ref={box}
      className={className ? `bit ${className}` : "bit"}
      style={style}
      data-bit={name}
      data-bit-state={state}
      aria-hidden={decorative || undefined}
    >
      {failed ? (
        fallback
      ) : near && bit ? (
        <Boundary key={name} fallback={fallback} onFail={() => setFailed(true)}>
          {render(bit)}
        </Boundary>
      ) : (
        placeholder
      )}
    </div>
  );
}
