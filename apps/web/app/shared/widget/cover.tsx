import { type ReactNode, useEffect, useRef, useState } from "react";
import { BareField, cursorDemos } from "~/shared/bits/demos-pointer";
import { backdrops } from "~/shared/lib/backdrops";
import type { BitModule } from "~/shared/lib/bits";
import { Bit, usePrefersReducedMotion } from "~/shared/widget/bit";

const cobalt = "#2459d3";
const bright = "#5b84ea";
const ice = "#8fa6e8";
const paper = "#f7f7f7";
const face = '"Interlude Variable", -apple-system, "Apple SD Gothic Neo", sans-serif';

type Title = {
  name: string;
  /** The component draws on its own canvas and sizes the type itself. */
  fill?: boolean;
  render: (bit: BitModule, text: string, size: number) => ReactNode;
};

/* Every way a cover can set its record's name. Sizes are worked out from the box and
   the length of the name, so a long name gets smaller type instead of spilling out. */
const titles: Title[] = [
  {
    name: "SplitText",
    render: (bit, text) => (
      <bit.default
        text={text}
        tag="p"
        className="cover-title-text"
        effect="rise"
        splitType="chars"
        delay={30}
        duration={0.9}
        hoverEffect="lift"
        rootMargin="0px"
        textAlign="center"
      />
    ),
  },
  {
    name: "DepthText",
    render: (bit, text, size) => (
      <bit.default
        text={text}
        layers={26}
        depth={2}
        faceColor={paper}
        depthColor={cobalt}
        fontSize={`${size}px`}
        fontWeight={800}
        pointerTracking
        autoOrbit
        orbitSpeed={0.3}
      />
    ),
  },
  {
    name: "ParticleText",
    fill: true,
    render: (bit, text, size) => (
      <bit.default
        text={text}
        particleSize={2}
        density={4}
        color={paper}
        highlightColor={bright}
        clickBurst
        fontSize={`${size}px`}
        fontWeight={800}
        fontFamily={face}
      />
    ),
  },
  {
    name: "BlurText",
    render: (bit, text) => (
      <bit.default
        text={text}
        animateBy="letters"
        direction="top"
        delay={60}
        className="cover-title-text"
      />
    ),
  },
  {
    name: "StrokeText",
    render: (bit, text, size) => (
      <bit.default
        text={text}
        strokeColor={paper}
        strokeWidth={1.4}
        drawDuration={1.8}
        fillMode="wipe"
        fontSize={Math.round(size * 0.82)}
        fontWeight={800}
        letterSpacing={-size * 0.02}
        hoverRedraw
      />
    ),
  },
  {
    name: "Shuffle",
    render: (bit, text) => (
      <bit.default
        text={text}
        tag="p"
        className="cover-title-text"
        shuffleDirection="right"
        duration={0.35}
        stagger={0.03}
        triggerOnHover
      />
    ),
  },
  {
    name: "WarpText",
    fill: true,
    render: (bit, text, size) => (
      <bit.default
        text={text}
        lens="bulge"
        ripple
        clickRipple
        fontSize={`${size}px`}
        fontWeight={800}
        style={{ height: "100%" }}
      />
    ),
  },
  {
    name: "DecryptedText",
    render: (bit, text) => (
      <p className="cover-title-text">
        <bit.default
          text={text}
          animateOn="inViewHover"
          sequential
          speed={70}
          characters="abcdefghijklmnopqrstuvwxyz*"
          scrambleColor={ice}
        />
      </p>
    ),
  },
  {
    name: "EchoText",
    render: (bit, text, size) => (
      <bit.default
        text={text}
        echoes={8}
        offset={Math.max(10, size * 0.22)}
        tint={ice}
        trail="pointer"
        clickBurst
        fontSize={`${size}px`}
        fontWeight={800}
      />
    ),
  },
  {
    name: "GradientText",
    render: (bit, text) => (
      <bit.default
        colors={[paper, ice, bright, ice, paper]}
        animationSpeed={8}
        className="cover-title-text"
      >
        {text}
      </bit.default>
    ),
  },
  {
    name: "TechText",
    fill: true,
    render: (bit, text, size) => (
      <bit.default text={text} fontWeight={600} fontSize={size} reveal="letter" clickKick />
    ),
  },
  {
    name: "FoldText",
    render: (bit, text, size) => (
      <bit.default
        text={text}
        foldStyle="paper"
        splitBy="char"
        hinge="top"
        trigger="view"
        hoverRefold
        fontSize={`${size}px`}
        fontWeight={800}
      />
    ),
  },
  {
    name: "ScrambledText",
    render: (bit, text) => (
      <bit.default
        className="cover-title-text"
        radius={90}
        duration={1.2}
        speed={0.5}
        scrambleChars=".:"
      >
        {text}
      </bit.default>
    ),
  },
  {
    name: "ASCIIText",
    fill: true,
    render: (bit, text) => (
      <bit.default text={text} asciiFontSize={7} colors={[cobalt, ice, paper]} textScale={1} />
    ),
  },
  {
    name: "ShinyText",
    render: (bit, text) => (
      <bit.default
        text={text}
        color="#aab1c0"
        shineColor="#ffffff"
        speed={2.4}
        className="cover-title-text"
      />
    ),
  },
  {
    name: "FuzzyText",
    render: (bit, text, size) => (
      <bit.default
        fontSize={`${size}px`}
        fontWeight={800}
        fontFamily={face}
        color={paper}
        baseIntensity={0.12}
        hoverIntensity={0.45}
      >
        {text}
      </bit.default>
    ),
  },
  {
    name: "GlitchText",
    render: (bit, text) => (
      <bit.default
        mode="slices"
        trigger="always"
        intensity={0.3}
        fontWeight={800}
        shadowColors={[cobalt, ice]}
        className="cover-title-text"
      >
        {text}
      </bit.default>
    ),
  },
  {
    name: "TextType",
    render: (bit, text) => (
      <bit.default
        text={[text]}
        typingSpeed={90}
        pauseDuration={2600}
        deletingSpeed={40}
        cursorStyle="bar"
        showCursor
        className="cover-title-text"
      />
    ),
  },
  {
    name: "ElasticMesh",
    fill: true,
    render: (bit, text) => (
      <bit.default
        text={text}
        fontFamily={face}
        fontWeight={800}
        material="balloon"
        color={cobalt}
        theme="dark"
      />
    ),
  },
  {
    name: "TrueFocus",
    render: (bit, text) => (
      <div className="cover-title-text">
        <bit.default
          sentence={text}
          borderColor={bright}
          blurAmount={4}
          animationDuration={0.5}
          pauseBetweenAnimations={1.2}
        />
      </div>
    ),
  },
];

/* A step that shares no factor with the list length visits every entry before repeating. */
function dealt<T>(list: T[], order: number, start: number) {
  const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
  let step = start;
  while (gcd(step, list.length) !== 1) step += 1;
  return list[(Math.max(0, order) * step) % list.length];
}

/* Hangul is about twice as wide as Latin at the same size. */
const measure = (text: string) =>
  [...text].reduce((sum, char) => sum + (/[\u3131-\uD79D]/u.test(char) ? 1.75 : 1), 0);

/**
 * The cover for a record without a product screen: one React Bits background and the
 * record's name set in one of the text animations, both dealt out by the record's place
 * in the list. Decorative: the page heading right above it carries the same name.
 */
export function Cover({ title, order }: { title: string; order: number }) {
  const reduced = usePrefersReducedMotion();
  const box = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const node = box.current;
    if (!node) return undefined;
    const observer = new ResizeObserver(([entry]) =>
      setSize({
        width: Math.round(entry.contentRect.width),
        height: Math.round(entry.contentRect.height),
      }),
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  const [fine, setFine] = useState(false);
  useEffect(() => setFine(window.matchMedia("(pointer: fine)").matches), []);
  const backdrop = dealt(backdrops, order, 11);
  // Every other record also gets a pointer effect that lives inside its cover.
  const pointer = order % 2 === 0 && fine && !reduced ? dealt(cursorDemos, order / 2, 5) : null;
  const type = dealt(titles, order, 7);
  const fontSize = Math.round(
    Math.max(
      26,
      Math.min((size.width * 1.28) / measure(title), size.width * 0.14, size.height * 0.4),
    ),
  );
  return (
    <div className={pointer ? "cover cover--pointer" : "cover"} ref={box} aria-hidden="true">
      {!reduced && size.width > 0 && (
        <Bit
          name={backdrop.name}
          className="cover-layer"
          render={(bit) => <bit.default {...backdrop.props} />}
        />
      )}
      <div className="cover-scrim" />
      {pointer && size.width > 0 && (
        <BareField.Provider value={true}>
          <Bit
            name={pointer.name}
            className="cover-layer"
            render={(bit) => pointer.render(bit, { width: size.width })}
          />
        </BareField.Provider>
      )}
      {size.width > 0 && (
        <Bit
          name={type.name}
          className={`cover-title ${type.fill ? "cover-title--fill" : ""}`.trim()}
          style={{ fontSize }}
          placeholder={<p className="cover-title-text">{title}</p>}
          fallback={<p className="cover-title-text">{title}</p>}
          render={(bit) => type.render(bit, title, fontSize)}
        />
      )}
    </div>
  );
}
