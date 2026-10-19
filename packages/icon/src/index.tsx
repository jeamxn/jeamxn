import type { SVGProps } from "react";

export type IconName =
  | "arrow-up-right"
  | "arrow-right"
  | "arrow-down"
  | "close"
  | "menu"
  | "chat"
  | "send"
  | "download"
  | "plus";
const paths: Record<IconName, string> = {
  "arrow-up-right": "M5 19 19 5M5 5h14v14",
  "arrow-right": "M4 12h16m-7-7 7 7-7 7",
  "arrow-down": "M12 4v16m-7-7 7 7 7-7",
  close: "m6 6 12 12M6 18 18 6",
  menu: "M4 8h16M4 16h16",
  chat: "M20 11a8 8 0 0 1-8 8H4l1.8-3.6A8 8 0 1 1 20 11Z",
  send: "m4 4 17 8-17 8 3-8-3-8Zm3 8h14",
  download: "M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5",
  plus: "M12 4v16M4 12h16",
};
export function Icon({
  name,
  size = 24,
  ...props
}: SVGProps<SVGSVGElement> & { name: IconName; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d={paths[name]} />
    </svg>
  );
}
