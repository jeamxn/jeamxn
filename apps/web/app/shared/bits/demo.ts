import type { ReactNode } from "react";
import type { BitModule } from "~/shared/lib/bits";
import { sitePath } from "~/shared/lib/site-path";

export type Demo = {
  /** React Bits component name; also the file under shared/reactbits. */
  name: string;
  /** What it is, in plain words. */
  label: string;
  /** What to try. */
  hint?: string;
  render: (bit: BitModule, stage: { width: number }) => ReactNode;
  /** fill: the component owns the whole stage. center: it sits in the middle. */
  fit?: "fill" | "center";
  height?: number;
  tone?: "ink" | "paper";
  /** Grid columns to take when the section shows every demo at once. */
  span?: 1 | 2 | 3;
  /** Runs on its own; held until asked when the visitor prefers reduced motion. */
  auto?: boolean;
};

export const ink = "#161616";
export const night = "#1b2a55";
export const cobalt = "#2459d3";
export const bright = "#5b84ea";
export const ice = "#8fa6e8";
export const sky = "#c9d6f7";
export const paper = "#f7f7f7";
export const fontFamily = '"Interlude Variable", -apple-system, "Apple SD Gothic Neo", sans-serif';

export const portrait = sitePath("/images/portrait-small.webp");
export const mark = sitePath("/images/mark/mark.svg");
export const markWhite = sitePath("/images/mark/mark-white.svg");

const shot = (file: string, title: string, product: string, tall = false) => ({
  src: sitePath(`/images/${file}.webp`),
  title,
  product,
  alt: `가상 데이터로 실행한 ${product}의 ${title} 화면`,
  width: tall ? 390 : 1440,
  height: tall ? 844 : 900,
});

/** Product screens already published on the work pages (synthetic data). */
export const wideShots = [
  shot("ara-preview", "대화와 문서함", "ara"),
  shot("ara-editor", "캔버스 편집", "ara"),
  shot("ara-page", "문서 편집", "ara"),
  shot("ara-documents", "문서함", "ara"),
  shot("ara-canvas-timeline", "타임라인과 키프레임", "ara"),
  shot("ara-canvas-properties", "요소 속성", "ara"),
  shot("dipull-preview", "세탁 신청 현황", "Dipull"),
  shot("dipull-stay-seats", "잔류 좌석 선택", "Dipull"),
];
export const tallShots = [
  shot("dipull-home", "홈", "Dipull", true),
  shot("dipull-reservation", "세탁기와 시간 선택", "Dipull", true),
  shot("dipull-dryer", "건조기 신청", "Dipull", true),
  shot("dipull-wakeup", "기상송 목록", "Dipull", true),
  shot("dipull-wakeup-search", "기상송 검색", "Dipull", true),
  shot("dipull-stay", "잔류 신청", "Dipull", true),
];
export const shots = [...wideShots, ...tallShots];

export const names = ["ara", "Dipull", "PFCT", "KT SAT"];
export const lines = [
  "제가 만든 도구를 직접 쓰면서 다시 고쳐요.",
  "친구와 동료에게 필요한 걸 만들어요.",
  "필요한 것을 배우고, 좋아하는 걸 만들어요.",
  "함께 만들고 싶은 제품이 있나요?",
];
