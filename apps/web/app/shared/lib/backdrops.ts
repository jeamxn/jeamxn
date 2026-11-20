/* Every React Bits background, tuned to the site's ink, cobalt and paper so a work
   cover and the playground draw from one list. Props left out keep upstream defaults. */
const ink = "#161616";
const night = "#1b2a55";
const cobalt = "#2459d3";
const bright = "#5b84ea";
const ice = "#8fa6e8";
const sky = "#c9d6f7";
const paper = "#f7f7f7";

export type Backdrop = {
  name: string;
  props: Record<string, unknown>;
  /** Too busy, too bright or too heavy to sit behind a page as a quiet cover. */
  playOnly?: boolean;
};

export const backdrops: Backdrop[] = [
  { name: "AcidSquares", props: { color: ink, accentColor: cobalt, secondaryColor: ice } },
  { name: "AeroShards", props: { shardColor: ice, accentColor: cobalt }, playOnly: true },
  { name: "Antigravity", props: { colors: [cobalt, ice, paper] } },
  { name: "Aurora", props: { colorStops: [cobalt, ice, cobalt] } },
  { name: "Balatro", props: { color1: cobalt, color2: ice, color3: ink } },
  { name: "Ballpit", props: { colors: [paper, cobalt, ice], count: 120 }, playOnly: true },
  { name: "Beams", props: { color: ice } },
  { name: "CRTWarp", props: { color: bright, backgroundColor: ink }, playOnly: true },
  { name: "ColorBends", props: { colors: [cobalt, ice, paper] } },
  { name: "DarkVeil", props: { color: cobalt } },
  { name: "Dither", props: { waveColor: ice, backgroundColor: ink } },
  { name: "DotField", props: { gradientFrom: cobalt, gradientTo: ice } },
  { name: "DotGrid", props: { baseColor: "#2c3140", activeColor: ice } },
  { name: "EvilEye", props: { eyeColor: cobalt, backgroundColor: ink }, playOnly: true },
  { name: "FaultyTerminal", props: { tint: ice } },
  { name: "Ferrofluid", props: { colors: [ice, cobalt, paper] } },
  { name: "FloatingLines", props: { linesGradient: [cobalt, paper] } },
  { name: "FluxLines", props: { colors: [ice, cobalt, paper] } },
  { name: "Galaxy", props: {} },
  { name: "GhostFibers", props: { glowColor: cobalt } },
  { name: "GradientASCII", props: { colors: [cobalt, paper, ice, sky] } },
  { name: "GradientBlinds", props: { gradientColors: [ice, cobalt] } },
  { name: "GradientWaves", props: { horizonColor: cobalt, waveColor: ice, crestColor: paper } },
  { name: "Grainient", props: { colors: [ink, night, cobalt, ice, paper] } },
  { name: "GridScan", props: { linesColor: "#3a4258", scanColor: ice } },
  { name: "HoloMosaic", props: { color: ink, metalColor: sky }, playOnly: true },
  {
    name: "Hyperspeed",
    props: {
      tailColors: [cobalt, night, ice],
      headColors: [paper, ice, "#3a4258"],
      poleColors: [ice],
    },
  },
  { name: "Iridescence", props: { color: ice }, playOnly: true },
  { name: "LetterGlitch", props: { glitchColors: [paper, cobalt, ice] } },
  { name: "LightPillar", props: { topColor: cobalt, bottomColor: ice } },
  { name: "LightRays", props: { raysColor: sky } },
  { name: "LightTunnel", props: { cableColor: ice, pulseColor: paper } },
  { name: "Lightfall", props: { colors: [paper, ice], backgroundColor: night } },
  { name: "Lightning", props: { color: bright } },
  { name: "LineWaves", props: { color1: ice, color2: cobalt, color3: paper } },
  { name: "LiquidChrome", props: { color: ice } },
  { name: "LiquidEther", props: { colors: [cobalt, ice, paper] } },
  { name: "MagicRings", props: { color: cobalt, colorTwo: ice } },
  { name: "MagnetLines", props: { lineColor: ice } },
  { name: "MicroSlats", props: { color: cobalt, glintColor: paper, backgroundColor: ink } },
  { name: "MoltenMetal", props: { colors: [cobalt, ice], coreColor: paper } },
  { name: "Orb", props: { colors: [cobalt, ice, night] } },
  { name: "Particles", props: { particleColors: [paper, ice] } },
  { name: "PatternWaves", props: { color: ice, backgroundColor: ink } },
  { name: "PixelBlast", props: { color: ice } },
  { name: "PixelSnow", props: { color: paper } },
  { name: "Plasma", props: { color: ice } },
  { name: "PlasmaWave", props: { colors: [cobalt, ice] } },
  { name: "Prism", props: {}, playOnly: true },
  { name: "PrismaticBurst", props: { colors: [cobalt, bright, ice] } },
  { name: "Radar", props: { color: ice, backgroundColor: ink } },
  { name: "RippleGrid", props: { color: ice } },
  { name: "Scanner", props: { color1: cobalt, color2: ice, color3: paper } },
  { name: "ShapeGrid", props: { lineColor: "#2c3140", hoverColor: ice, hoverFillColor: cobalt } },
  {
    name: "ShapeWaves",
    props: { text: "*", color: "#6f7890", hoverColor: paper, backgroundColor: ink },
    playOnly: true,
  },
  { name: "SideRays", props: { rayColor1: ice, rayColor2: cobalt } },
  { name: "Silk", props: { color: cobalt, sheenColor: paper } },
  { name: "SlicedWaves", props: { color1: paper, color2: ice, color3: cobalt } },
  { name: "SoftAurora", props: { color1: paper, color2: cobalt, colorSpeed: 0 } },
  { name: "Threads", props: { color: ice } },
  { name: "Topography", props: { color: bright } },
  { name: "Waves", props: { lineColor: ice, backgroundColor: "transparent" } },
  { name: "WebThreads", props: { colors: [cobalt, ice], coreColor: paper } },
];

const covers = backdrops.filter((backdrop) => !backdrop.playOnly);

/**
 * The cover for a work record. With its place in the list, covers are dealt out in turn
 * so every background gets used before one repeats; without it, a hash of the slug picks.
 */
export function coverFor(slug: string, order = -1): Backdrop {
  if (order >= 0) return covers[(order * 7) % covers.length];
  let hash = 2166136261;
  for (const character of slug) {
    hash ^= character.codePointAt(0) ?? 0;
    hash = Math.imul(hash, 16777619);
  }
  return covers[(hash >>> 0) % covers.length];
}
