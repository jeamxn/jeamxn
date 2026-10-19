import { type ButtonHTMLAttributes, type ReactNode, useEffect, useRef } from "react";

export function Button({
  className = "",
  variant = "solid",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "solid" | "quiet" }) {
  return <button type="button" className={`button button--${variant} ${className}`} {...props} />;
}

export function Modal({
  open,
  onClose,
  titleId,
  className = "",
  children,
}: {
  open: boolean;
  onClose: () => void;
  titleId: string;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog || !open) return;
    const previousFocus =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const overflow = document.body.style.overflow;
    const padding = document.body.style.paddingRight;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (gap > 0) document.body.style.paddingRight = `${gap}px`;
    dialog.showModal();
    dialog.querySelector<HTMLElement>("[data-modal-focus]")?.focus({ preventScroll: true });
    return () => {
      dialog.close();
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = padding;
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, [open]);
  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      className={`modal ${className}`}
      onKeyDown={(event) => {
        if (event.key !== "Tab") return;
        const elements = [
          ...event.currentTarget.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex="0"]',
          ),
        ].filter((element) => element.getClientRects().length > 0);
        // WebKit can skip links when the system's full keyboard access is off.
        // Own the complete cycle, not only its ends, so focus never leaves the modal.
        event.preventDefault();
        if (elements.length === 0) return;
        const active = document.activeElement;
        const current = active instanceof HTMLElement ? elements.indexOf(active) : -1;
        const next = event.shiftKey
          ? current <= 0
            ? elements.length - 1
            : current - 1
          : (current + 1) % elements.length;
        elements[next]?.focus();
      }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (
          event.clientX < bounds.left ||
          event.clientX > bounds.right ||
          event.clientY < bounds.top ||
          event.clientY > bounds.bottom
        ) {
          closeRef.current();
        }
      }}
      onCancel={(event) => {
        event.preventDefault();
        closeRef.current();
      }}
    >
      {open ? children : null}
    </dialog>
  );
}
