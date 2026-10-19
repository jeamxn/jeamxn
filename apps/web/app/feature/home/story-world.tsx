/** Each chapter of the story is its own small world: a paper tint, an ink
 * accent and an icon. Scroll blends them by the same chapter weights that
 * crossfade the panels, so colour never jumps between scenes. */
export const STORY_WORLDS = [
  { paper: [238, 240, 247], accent: [53, 84, 209], word: "최재민" },
  { paper: [231, 241, 234], accent: [52, 120, 90], word: "Dipull" },
  { paper: [229, 236, 247], accent: [48, 94, 145], word: "Internal" },
  { paper: [238, 234, 249], accent: [104, 86, 178], word: "AX" },
  { paper: [228, 234, 251], accent: [47, 73, 224], word: "ara" },
] as const;

export function blendWorld(weights: readonly number[]) {
  const total = weights.reduce((sum, value) => sum + value, 0) || 1;
  const mix = (key: "paper" | "accent") =>
    [0, 1, 2]
      .map((channel) =>
        Math.round(
          STORY_WORLDS.reduce(
            (sum, world, index) => sum + world[key][channel] * (weights[index] ?? 0),
            0,
          ) / total,
        ),
      )
      .join(" ");
  return { paper: `rgb(${mix("paper")})`, accent: `rgb(${mix("accent")})` };
}

const paths = [
  // Person: head and shoulders
  <>
    <circle cx="12" cy="8.5" r="3.5" />
    <path d="M5 19.5c1.2-3.6 3.8-5.5 7-5.5s5.8 1.9 7 5.5" />
  </>,
  // School: pitched roof, two floors, door
  <>
    <path d="M3.5 10 12 4.5l8.5 5.5" />
    <path d="M5.5 9v10.5h13V9" />
    <path d="M10 19.5v-4h4v4M8.5 12h1.5M14 12h1.5" />
  </>,
  // Internal: scattered panels joined into one console
  <>
    <rect x="3.5" y="4.5" width="17" height="12" rx="2" />
    <path d="M3.5 8.5h17M9 8.5v8M9 20h6M12 16.5V20" />
  </>,
  // AX: an assistant spark with a reply
  <>
    <path d="M11 3.5c.6 3.4 2.1 4.9 5.5 5.5-3.4.6-4.9 2.1-5.5 5.5-.6-3.4-2.1-4.9-5.5-5.5 3.4-.6 4.9-2.1 5.5-5.5Z" />
    <path d="M17.5 14.5c.3 1.6 1 2.3 2.5 2.5-1.5.3-2.2 1-2.5 2.5-.3-1.5-1-2.2-2.5-2.5 1.5-.2 2.2-.9 2.5-2.5Z" />
  </>,
  // ara: the three parallel waves on its hub
  <>
    <path d="M4 8c2.7-2 5.3-2 8 0s5.3 2 8 0" />
    <path d="M4 12.5c2.7-2 5.3-2 8 0s5.3 2 8 0" />
    <path d="M4 17c2.7-2 5.3-2 8 0s5.3 2 8 0" />
  </>,
];

export function ChapterIcon({ index }: { index: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths[index]}
    </svg>
  );
}
