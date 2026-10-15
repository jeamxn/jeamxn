/** Direct document-scroll mapping. No clocks, velocity or accumulated state. */
export const STORY_ANCHORS = [0, 1 / 3, 2 / 3, 1] as const;

export function clampUnit(value: number): number {
  return Number.isFinite(value) ? Math.min(1, Math.max(0, value)) : 0;
}

export function storyProgress(top: number, height: number, frameHeight: number): number {
  const travel = height - frameHeight;
  return travel > 0 ? clampUnit(-top / travel) : 0;
}

export function smoothStep(value: number): number {
  const t = clampUnit(value);
  return t * t * (3 - 2 * t);
}

export function storyPose(progress: number, index: number) {
  const position = clampUnit(progress) * 3;
  const distance = position - index;
  // Dwell near each anchor; interpolate only the middle 60% of the interval.
  const opacity = 1 - smoothStep((Math.abs(distance) - 0.2) / 0.6);
  return {
    opacity,
    y: Math.max(-1, Math.min(1, -distance)) * 28,
    scale: 1 - Math.min(1, Math.abs(distance)) * 0.025,
  };
}

export function activeStory(progress: number): number {
  return Math.min(3, Math.max(0, Math.round(clampUnit(progress) * 3)));
}

export function storyScrollTarget(
  documentTop: number,
  height: number,
  frameHeight: number,
  index: number,
): number {
  const anchor = STORY_ANCHORS[Math.min(3, Math.max(0, Math.round(index)))] ?? 0;
  return Math.max(0, documentTop + Math.max(0, height - frameHeight) * anchor);
}
