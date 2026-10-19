import { HOME_STORY } from "@jeamxn/core";

/** One scroll-native, reversible timeline: chapter navigation and sentence
 * reading use the same beats; there is no autoplay or wheel interception. */
export const STORY_CHAPTERS = HOME_STORY.map((chapter) => chapter.id);
export type StoryChapterId = (typeof HOME_STORY)[number]["id"];
export const STORY_BEATS = HOME_STORY.flatMap((chapter, chapterIndex) =>
  chapter.sentences.map((sentence, localIndex) => ({
    chapter: chapter.id,
    chapterIndex,
    localIndex,
    ...sentence,
    models: [...sentence.models] as string[],
  })),
);
export const STORY_ANCHORS = STORY_CHAPTERS.map(
  (id) => STORY_BEATS.findIndex((beat) => beat.chapter === id) / (STORY_BEATS.length - 1),
);

export function clampUnit(value: number): number {
  return Number.isFinite(value) ? Math.min(1, Math.max(0, value)) : 0;
}
export function smoothStep(value: number): number {
  const t = clampUnit(value);
  return t * t * (3 - 2 * t);
}
export function storyProgress(top: number, height: number, frameHeight: number): number {
  const travel = height - frameHeight;
  return travel > 0 ? clampUnit(-top / travel) : 0;
}
export function activeBeat(progress: number): number {
  return Math.round(clampUnit(progress) * (STORY_BEATS.length - 1));
}
/**80% of each115svh reading interval is completely still. Text fades out
 * before the next beat fades in; adjacent sentences never share the canvas. */
export const STORY_BEAT_TRAVEL_SVH = 115;
export function sentencePose(progress: number, index: number) {
  const distance = clampUnit(progress) * (STORY_BEATS.length - 1) - index;
  const current = activeBeat(progress) === index;
  return {
    opacity: current ? 1 - smoothStep((Math.abs(distance) - 0.4) / 0.1) : 0,
    y: Math.sign(-distance) * smoothStep((Math.abs(distance) - 0.4) / 0.1) * 12,
  };
}
/** Editorial lines reveal on scroll, never on a timer. Every line is fully
 * present before the beat's anchor, leaving a generous complete-reading dwell. */
export function storyLinePose(progress: number, beat: number, line: number, count: number) {
  const distance = clampUnit(progress) * (STORY_BEATS.length - 1) - beat;
  const step = count > 1 ? 0.22 / (count - 1) : 0;
  const opacity = smoothStep((distance + 0.47 - line * step) / 0.12);
  return { opacity, y: (1 - opacity) * 14 };
}
/** Artwork stays continuous while one sentence leaves and the next arrives. */
export function storyBlendWeight(progress: number, index: number): number {
  const distance = clampUnit(progress) * (STORY_BEATS.length - 1) - index;
  return 1 - smoothStep((Math.abs(distance) - 0.2) / 0.6);
}
export function chapterWeight(progress: number, index: number): number {
  return clampUnit(
    STORY_BEATS.reduce(
      (sum, beat, i) => sum + (beat.chapterIndex === index ? storyBlendWeight(progress, i) : 0),
      0,
    ),
  );
}
export function storyPose(progress: number, index: number) {
  const position = clampUnit(progress) * (STORY_BEATS.length - 1);
  const first = STORY_BEATS.findIndex((beat) => beat.chapterIndex === index),
    last = STORY_BEATS.reduce((last, beat, i) => (beat.chapterIndex === index ? i : last), 0);
  const distance = position < first ? position - first : position > last ? position - last : 0;
  return {
    opacity: chapterWeight(progress, index),
    y: Math.max(-1, Math.min(1, -distance)) * 28,
    scale: 1 - Math.min(1, Math.abs(distance)) * 0.025,
  };
}
export function activeStory(progress: number): number {
  return STORY_BEATS[activeBeat(progress)].chapterIndex;
}
export function storyScrollTarget(
  documentTop: number,
  height: number,
  frameHeight: number,
  index: number,
): number {
  const anchor =
    STORY_ANCHORS[Math.min(STORY_CHAPTERS.length - 1, Math.max(0, Math.round(index)))] ?? 0;
  return Math.max(0, documentTop + Math.max(0, height - frameHeight) * anchor);
}
export function beatScrollTarget(
  documentTop: number,
  height: number,
  frameHeight: number,
  index: number,
): number {
  return Math.max(
    0,
    documentTop + Math.max(0, height - frameHeight) * clampUnit(index / (STORY_BEATS.length - 1)),
  );
}
export function chapterLocalProgress(progress: number, chapter: number): number {
  const first = STORY_BEATS.findIndex((beat) => beat.chapterIndex === chapter),
    last = STORY_BEATS.reduce((last, beat, i) => (beat.chapterIndex === chapter ? i : last), 0);
  return last > first
    ? clampUnit((clampUnit(progress) * (STORY_BEATS.length - 1) - first) / (last - first))
    : 0;
}
export function modelWeight(progress: number, chapter: number, id: string): number {
  return STORY_BEATS.reduce(
    (sum, beat, index) =>
      sum +
      (beat.chapterIndex === chapter && !beat.screen && beat.models.includes(id)
        ? storyBlendWeight(progress, index)
        : 0),
    0,
  );
}

export const STORY_TOOLS = [
  "music",
  "laundry",
  "calendar",
  "document",
  "chart",
  "data",
  "chat",
  "idea",
] as const;
export type StoryTool = (typeof STORY_TOOLS)[number];
// Coordinates use one persistent square canvas. The objects do not unmount
// between scenes: a folded stack opens into school tools, connects into work,
// then gathers as a single workspace. Every pose is reversible and clock-free.
const TOOL_LAYOUTS = [
  [
    [62, 72, -22],
    [72, 75, -12],
    [82, 72, 2],
    [91, 77, 14],
    [64, 88, -12],
    [74, 91, -3],
    [83, 88, 9],
    [92, 90, 18],
  ],
  [
    [6, 18, -12],
    [93, 22, 12],
    [7, 78, -8],
    [93, 78, 8],
    [25, 91, -7],
    [48, 91, 6],
    [72, 91, 11],
    [73, 10, -4],
  ],
  [
    [6, 15, 0],
    [6, 84, 0],
    [35, 10, 0],
    [35, 89, 0],
    [67, 10, 0],
    [67, 89, 0],
    [94, 18, 0],
    [94, 81, 0],
  ],
  [
    [60, 77, -5],
    [70, 79, -2],
    [80, 77, 2],
    [90, 79, 5],
    [62, 91, -4],
    [72, 93, -1],
    [82, 91, 2],
    [92, 93, 5],
  ],
] as const;
const TOOL_LAYOUTS_NARROW = [
  [
    [21, 77, -18],
    [39, 79, -10],
    [58, 77, 1],
    [77, 79, 12],
    [24, 90, -10],
    [42, 93, -2],
    [61, 90, 7],
    [80, 93, 15],
  ],
  [
    [11, 49, -10],
    [88, 49, 10],
    [10, 67, -5],
    [90, 69, 5],
    [14, 86, -5],
    [46, 90, 4],
    [85, 88, 8],
    [72, 48, -3],
  ],
  [
    [10, 49, 0],
    [10, 86, 0],
    [35, 47, 0],
    [35, 90, 0],
    [66, 47, 0],
    [66, 90, 0],
    [90, 49, 0],
    [90, 86, 0],
  ],
  [
    [21, 78, -5],
    [39, 79, -2],
    [58, 78, 2],
    [77, 79, 5],
    [24, 90, -4],
    [42, 93, -1],
    [61, 90, 2],
    [80, 93, 5],
  ],
] as const;

export function storyToolPose(progress: number, index: number, narrow = false) {
  const position = clampUnit(progress) * 3;
  const start = Math.min(2, Math.floor(position));
  const end = start + 1;
  const local = position - start;
  const step = smoothStep((local - 0.14 - (index % 4) * 0.025) / 0.64);
  const layouts = narrow ? TOOL_LAYOUTS_NARROW : TOOL_LAYOUTS;
  const a = layouts[start]?.[index] ?? layouts[0][0];
  const b = layouts[end]?.[index] ?? a;
  const mix = (left: number, right: number) => left + (right - left) * step;
  const spread = Math.sin(Math.PI * clampUnit(position / 3));
  return {
    x: mix(a[0], b[0]) + Math.sin(step * Math.PI) * (index % 2 === 0 ? -2 : 2),
    y: mix(a[1], b[1]) + Math.sin(step * Math.PI) * (index < 4 ? -3 : 3),
    rotation: mix(a[2], b[2]),
    scale: mix(start === 0 ? 0.73 : 1, end === 3 ? 0.7 : 1) * (1 - Math.sin(step * Math.PI) * 0.12),
    opacity: index < 3 && position > 0.6 && position < 1.45 ? 1 : 0.85,
    connection: smoothStep((position - 1.15) / 0.65) * (1 - smoothStep((position - 2.15) / 0.6)),
    spread,
  };
}

export function chapterObjectPose(
  progress: number,
  chapter: number,
  index: number,
  narrow: boolean,
  modelId?: string,
) {
  const local = chapterLocalProgress(progress, chapter);
  const phase = smoothStep((local - 0.12 - index * 0.035) / 0.56);
  const layouts = narrow
    ? [
        [
          [82, 81],
          [17, 77],
        ],
        [
          [50, 70],
          [15, 56],
          [86, 74],
          [19, 89],
        ],
        [
          [17, 59],
          [50, 70],
          [85, 59],
          [74, 87],
          [20, 86],
          [85, 83],
        ],
        [
          [50, 70],
          [17, 55],
          [86, 66],
          [18, 87],
          [83, 89],
        ],
        [
          [50, 71],
          [13, 54],
          [87, 55],
          [15, 88],
          [86, 88],
        ],
      ]
    : [
        [
          [90, 78],
          [57, 85],
        ],
        [
          [73, 52],
          [57, 20],
          [93, 65],
          [55, 83],
        ],
        [
          [57, 25],
          [74, 48],
          [93, 25],
          [78, 80],
          [52, 77],
          [93, 80],
        ],
        [
          [72, 49],
          [56, 20],
          [94, 48],
          [54, 80],
          [91, 81],
        ],
        [
          [73, 50],
          [53, 20],
          [94, 22],
          [53, 83],
          [94, 82],
        ],
      ];
  const layout = layouts[chapter] ?? layouts[0];
  const wafPoint = modelId?.startsWith("waf-")
    ? (narrow
        ? {
            "waf-radar": [50, 70],
            "waf-shield": [17, 57],
            "waf-events": [86, 83],
          }
        : { "waf-radar": [73, 49], "waf-shield": [55, 23], "waf-events": [93, 79] })[
        modelId as "waf-radar" | "waf-shield" | "waf-events"
      ]
    : undefined;
  const point = wafPoint ?? layout[index] ?? layout[0];
  let x = point[0],
    y = point[1];
  if (chapter === 2 && index < 3) {
    // Fragmented consoles move into one protected workspace, not a random orbit.
    x += ((narrow ? 50 : 74) - x) * phase * 0.32;
    y += ((narrow ? 70 : 48) - y) * phase * 0.24;
  }
  if (chapter === 4 && index > 0) {
    // The integrated agent gathers its tools around one persistent center.
    x += ((narrow ? 50 : 73) - x) * phase * 0.32;
    y += ((narrow ? 71 : 50) - y) * phase * 0.25;
  }
  const weight = modelId
    ? modelWeight(progress, chapter, modelId)
    : chapterWeight(progress, chapter);
  const reveal = 1;
  const main = modelId === "waf-radar" || index === (chapter === 2 ? 1 : 0);
  return {
    x,
    y,
    z: Math.sin(local * Math.PI + index * 0.6) * 0.55,
    scale: (main ? (narrow ? 1.25 : 1.65) : narrow ? 0.57 : 0.82) * weight * reveal,
    rx: -0.16 + Math.sin(local * Math.PI + index * 0.3) * 0.12,
    ry: -0.32 + (local - 0.5) * (index % 2 ? -0.95 : 1.1),
    rz: (index % 2 ? -1 : 1) * 0.1 * Math.cos(local * Math.PI),
    visible: weight * reveal > 0.002,
    connection: chapter >= 2 ? phase * weight : 0,
  };
}
