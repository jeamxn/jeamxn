import type { ProjectScreen } from "@jeamxn/contract";
import { Icon } from "@jeamxn/icon";
import { type KeyboardEvent, useEffect, useId, useRef, useState } from "react";
import { safeScreenSrc } from "~/shared/lib/project-media";

function ScreenImage({ screen, large = false }: { screen: ProjectScreen; large?: boolean }) {
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [attempt, setAttempt] = useState(0);
  const image = useRef<HTMLImageElement>(null);
  const src = safeScreenSrc(screen.src);
  useEffect(() => {
    // Prerendered/cached images can finish before React attaches onLoad.
    if (image.current?.complete) setStatus(image.current.naturalWidth > 0 ? "ready" : "error");
  }, [attempt, src]);
  const failed = !src || status === "error";
  return (
    <div className={`screen-image${large ? " screen-image--large" : ""}`}>
      {!failed && (
        <img
          key={attempt}
          ref={image}
          src={src}
          alt={screen.alt}
          width={screen.width}
          height={screen.height}
          loading="eager"
          decoding="async"
          className={status === "ready" ? "screen-image-ready" : "screen-image-pending"}
          onLoad={() => setStatus("ready")}
          onError={() => setStatus("error")}
        />
      )}
      {status !== "ready" || !src ? (
        <div className="screen-image-status" role="status">
          <p>
            {failed ? `${screen.title} 화면을 불러오지 못했어요.` : `${screen.title} 불러오는 중`}
          </p>
          {failed && src && (
            <button
              type="button"
              className="text-link"
              onClick={() => {
                setStatus("loading");
                setAttempt((value) => value + 1);
              }}
            >
              다시 불러오기
            </button>
          )}
          {failed && <p>다른 화면을 선택하거나 잠시 뒤 다시 불러와 주세요.</p>}
        </div>
      ) : null}
    </div>
  );
}

export function ProductGallery({
  name,
  screens,
  heading = "제품 화면",
  description = "아래에서 화면을 선택하거나 크게 열어 자세히 볼 수 있어요.",
}: {
  name: string;
  screens: ProjectScreen[];
  heading?: string;
  description?: string;
}) {
  const [selected, setSelected] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  const currentFigure = useRef<HTMLElement>(null);
  const id = useId();
  const index = Math.min(selected, Math.max(0, screens.length - 1));
  const screen = screens[index];
  const multiple = screens.length > 1;

  useEffect(() => {
    const element = dialog.current;
    if (!expanded || !element) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    element.showModal();
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [expanded]);

  function revealSelection() {
    if (expanded) return;
    // Thumbnail grids can extend below the selected screenshot. Move the user's
    // newly selected screen back into view rather than updating it offscreen.
    requestAnimationFrame(() => {
      const figure = currentFigure.current;
      if (
        figure &&
        (figure.getBoundingClientRect().top < 100 ||
          figure.getBoundingClientRect().top > window.innerHeight * 0.7)
      ) {
        window.scrollTo({
          top: window.scrollY + figure.getBoundingClientRect().top - 100,
          behavior: "instant",
        });
      }
    });
  }
  function selectScreen(index: number) {
    setSelected(index);
    revealSelection();
  }
  function move(direction: number) {
    setSelected(
      (current) =>
        (Math.min(current, screens.length - 1) + direction + screens.length) % screens.length,
    );
    revealSelection();
  }
  function navigate(event: KeyboardEvent<HTMLDialogElement>) {
    // Keep Tab at the content boundary instead of moving focus to browser chrome.
    if (event.key === "Tab") {
      const buttons =
        event.currentTarget.querySelectorAll<HTMLButtonElement>("button:not(:disabled)");
      const first = buttons[0];
      const last = buttons[buttons.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
      return;
    }
    if (!multiple || event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      move(event.key === "ArrowLeft" ? -1 : 1);
    }
  }
  function controls() {
    return (
      <div className="screen-navigation">
        <button type="button" onClick={() => move(-1)} disabled={!multiple} aria-label="이전 화면">
          <Icon name="arrow-right" size={20} className="screen-previous-icon" />
          <span>이전</span>
        </button>
        <span className="screen-counter" aria-live="polite" aria-atomic="true">
          {index + 1} / {screens.length}
        </span>
        <button type="button" onClick={() => move(1)} disabled={!multiple} aria-label="다음 화면">
          <span>다음</span>
          <Icon name="arrow-right" size={20} />
        </button>
      </div>
    );
  }
  if (!screen) return null;

  return (
    <section className="product-gallery" aria-labelledby={`${id}-heading`}>
      <div className="gallery-intro">
        <h2 id={`${id}-heading`}>{heading}</h2>
        <p>{description}</p>
      </div>
      <figure ref={currentFigure} className="screen-current">
        <ScreenImage key={`${screen.id}-${screen.src}`} screen={screen} />
        <figcaption className="screen-details">
          <div>
            <h3>{screen.title}</h3>
            <p className="screen-description">{screen.description}</p>
            <p className="screen-caption">{screen.caption}</p>
          </div>
          <button
            ref={opener}
            type="button"
            className="screen-expand"
            onClick={() => setExpanded(true)}
            aria-haspopup="dialog"
          >
            화면 크게 보기 <Icon name="arrow-up-right" size={18} />
          </button>
        </figcaption>
      </figure>
      <div className="screen-selection-heading">
        <span>{screens.length}개의 화면</span>
        {controls()}
      </div>
      <ul className="screen-thumbnails" aria-label={`${name} 화면 선택`}>
        {screens.map((item, itemIndex) => (
          <li key={item.id}>
            <button
              type="button"
              className="screen-thumbnail"
              aria-pressed={index === itemIndex}
              aria-label={`${item.title} 화면 선택`}
              onClick={() => selectScreen(itemIndex)}
            >
              <span className="screen-thumbnail-image">
                {safeScreenSrc(item.src) ? (
                  <img
                    src={safeScreenSrc(item.src)}
                    alt=""
                    width={item.width}
                    height={item.height}
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.style.visibility = "hidden";
                    }}
                  />
                ) : null}
              </span>
              <span className="screen-thumbnail-title">{item.title}</span>
              <span className="screen-thumbnail-device">
                {item.device === "mobile" ? "모바일 화면" : "데스크톱 화면"}
              </span>
            </button>
          </li>
        ))}
      </ul>
      <dialog
        ref={dialog}
        className="screen-dialog"
        aria-labelledby={`${id}-dialog-title`}
        aria-describedby={`${id}-dialog-description`}
        onKeyDown={navigate}
        onCancel={() => setExpanded(false)}
        onClose={() => {
          setExpanded(false);
          opener.current?.focus({ preventScroll: true });
        }}
      >
        <header className="screen-dialog-header">
          <div>
            <span>{name}</span>
            <h2 id={`${id}-dialog-title`}>{screen.title}</h2>
          </div>
          <button
            type="button"
            className="icon-button"
            aria-label="큰 화면 닫기"
            onClick={() => setExpanded(false)}
          >
            <Icon name="close" />
          </button>
        </header>
        {expanded && <ScreenImage key={`${screen.id}-${screen.src}-large`} screen={screen} large />}
        <div className="screen-dialog-description" id={`${id}-dialog-description`}>
          <p>{screen.description}</p>
          <p className="screen-caption">{screen.caption}</p>
        </div>
        <footer className="screen-dialog-footer">
          <span className="screen-keyboard-hint">← → 화면 이동 / Esc 닫기</span>
          {controls()}
        </footer>
      </dialog>
    </section>
  );
}
