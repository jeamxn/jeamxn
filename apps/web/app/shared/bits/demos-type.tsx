import { useRef } from "react";
import type { BitComponent } from "~/shared/lib/bits";
import { bright, cobalt, type Demo, fontFamily, ice, lines, names, paper, wideShots } from "./demo";

function Proximity({ Bit }: { Bit: BitComponent }) {
  const box = useRef<HTMLDivElement>(null);
  return (
    <div ref={box} className="desk-type-line desk-type-line--proximity">
      <Bit
        label={lines[3]}
        containerRef={box}
        fromFontVariationSettings="'wght' 320, 'wdth' 90"
        toFontVariationSettings="'wght' 880, 'wdth' 118"
        radius={140}
        falloff="gaussian"
        style={{ fontFamily: "inherit" }}
      />
    </div>
  );
}

/* The type case: every text animation, set in sentences and names from this site. */
export const typeDemos: Demo[] = [
  {
    name: "TextPressure",
    label: "눌리는 글자",
    hint: "포인터 가까운 글자가 굵고 넓어져요.",
    fit: "fill",
    height: 250,
    span: 3,
    render: (bit) => (
      <bit.default
        text="jeamxn"
        fontFamily="Interlude Variable"
        fontUrl=""
        italic={false}
        fit={0.74}
        textColor={paper}
        minFontSize={32}
      />
    ),
  },
  {
    name: "VariableProximity",
    label: "가까우면 굵게",
    hint: "문장 위로 포인터를 지나가 보세요.",
    span: 2,
    render: (bit) => <Proximity Bit={bit.default} />,
  },
  {
    name: "TrueFocus",
    label: "초점",
    hint: "단어 하나씩 초점이 맞아요.",
    auto: true,
    render: (bit) => (
      <div className="desk-type-line">
        <bit.default
          sentence="기획 개발 검증"
          borderColor={bright}
          blurAmount={4}
          animationDuration={0.5}
          pauseBetweenAnimations={1}
        />
      </div>
    ),
  },
  {
    name: "ASCIIText",
    label: "문자로 그린 글자",
    hint: "포인터를 움직이면 기울고, 누르면 물결이 퍼져요.",
    fit: "fill",
    height: 300,
    span: 2,
    auto: true,
    render: (bit) => (
      <bit.default text="ara" asciiFontSize={8} colors={[cobalt, ice, paper]} textScale={1} />
    ),
  },
  {
    name: "SplitFlapText",
    label: "공항 안내판",
    hint: "프로젝트 이름이 차례로 넘어가요.",
    auto: true,
    render: (bit) => (
      <bit.default
        words={["ARA", "DIPULL", "PFCT", "KT SAT"]}
        tileColor="#22262e"
        textColor={paper}
        fontSize={34}
        gap={4}
        padTo={6}
        align="center"
        loop
      />
    ),
  },
  {
    name: "BlurText",
    label: "흐렸다 또렷하게",
    hint: "화면에 들어올 때 단어가 하나씩 맺혀요.",
    span: 2,
    render: (bit) => (
      <bit.default
        text={lines[0]}
        animateBy="words"
        direction="top"
        delay={120}
        className="desk-type-line"
      />
    ),
  },
  {
    name: "RotatingText",
    label: "돌아가는 낱말",
    auto: true,
    render: (bit) => (
      <div className="desk-type-line desk-type-row">
        <span>요즘은</span>
        <bit.default
          texts={names}
          effect="slide"
          direction="up"
          highlight
          highlightColor={cobalt}
          staggerFrom="last"
          staggerDuration={0.025}
          rotationInterval={2000}
        />
      </div>
    ),
  },
  {
    name: "SplitText",
    label: "글자마다 올라오기",
    hint: "글자 위에 포인터를 올리면 살짝 들려요.",
    span: 2,
    render: (bit) => (
      <bit.default
        text={lines[2]}
        tag="p"
        className="desk-type-line"
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
    name: "Shuffle",
    label: "섞였다 맞춰지기",
    hint: "포인터를 올리면 다시 섞여요.",
    render: (bit) => (
      <bit.default
        text="KT SAT"
        tag="p"
        className="desk-type-big"
        shuffleDirection="right"
        duration={0.35}
        stagger={0.03}
        triggerOnHover
      />
    ),
  },
  {
    name: "DecryptedText",
    label: "암호 풀기",
    hint: "포인터를 올리면 다시 풀려요.",
    render: (bit) => (
      <div className="desk-type-line">
        <bit.default
          text="기술보다 아이디어를"
          animateOn="inViewHover"
          sequential
          speed={60}
          scrambleColor={ice}
          characters="가나다라마바사아자차카타파하*"
        />
      </div>
    ),
  },
  {
    name: "ScrambledText",
    label: "흩어지는 문장",
    hint: "포인터가 지나간 자리만 흐트러져요.",
    span: 2,
    render: (bit) => (
      <bit.default
        className="desk-type-line"
        radius={90}
        duration={1.2}
        speed={0.5}
        scrambleChars=".:"
      >
        {lines[1]}
      </bit.default>
    ),
  },
  {
    name: "GlitchText",
    label: "깨지는 글자",
    auto: true,
    render: (bit) => (
      <bit.default
        mode="slices"
        trigger="always"
        intensity={0.45}
        fontWeight={800}
        shadowColors={[cobalt, ice]}
        className="desk-type-big"
      >
        PFCT
      </bit.default>
    ),
  },
  {
    name: "FuzzyText",
    label: "지직거리는 글자",
    hint: "포인터를 올리면 더 흔들려요. 없는 주소에서도 볼 수 있어요.",
    auto: true,
    render: (bit) => (
      <bit.default
        fontSize="88px"
        fontWeight={800}
        fontFamily="Interlude Variable"
        color={paper}
        baseIntensity={0.16}
        hoverIntensity={0.5}
      >
        404
      </bit.default>
    ),
  },
  {
    name: "GradientText",
    label: "흐르는 색",
    auto: true,
    render: (bit) => (
      <bit.default
        colors={[cobalt, ice, paper, ice, cobalt]}
        animationSpeed={8}
        className="desk-type-big desk-type-big--ko"
      >
        행복한 개발자
      </bit.default>
    ),
  },
  {
    name: "ShinyText",
    label: "빛이 지나가는 글자",
    auto: true,
    span: 2,
    render: (bit) => (
      <bit.default
        text={lines[3]}
        color="#8b8f99"
        shineColor="#ffffff"
        speed={2.4}
        className="desk-type-line"
      />
    ),
  },
  {
    name: "CountUp",
    label: "세어 올리기",
    hint: "포인터를 올리면 처음부터 다시 세요.",
    render: (bit) => (
      <div className="desk-count-stack">
        <bit.default
          to={86}
          from={0}
          duration={1.6}
          mode="roll"
          replayOnHover
          className="desk-type-big"
        />
        <span className="desk-count-note">건의 작업 기록</span>
      </div>
    ),
  },
  {
    name: "TextType",
    label: "타자기",
    auto: true,
    span: 2,
    render: (bit) => (
      <bit.default
        text={lines}
        typingSpeed={70}
        pauseDuration={1400}
        deletingSpeed={36}
        cursorStyle="bar"
        showCursor
        className="desk-type-line"
      />
    ),
  },
  {
    name: "DepthText",
    label: "두께가 있는 글자",
    hint: "포인터를 따라 기울어요.",
    height: 240,
    render: (bit) => (
      <bit.default
        text="Dipull"
        layers={30}
        depth={2.2}
        faceColor={paper}
        depthColor={cobalt}
        fontSize="clamp(3rem, 9vw, 5.5rem)"
        fontWeight={800}
        pointerTracking
        autoOrbit
        orbitSpeed={0.3}
      />
    ),
  },
  {
    name: "EchoText",
    label: "잔상",
    hint: "포인터를 움직이면 잔상이 따라와요.",
    height: 240,
    span: 2,
    render: (bit) => (
      <bit.default
        text="MultiNet"
        echoes={10}
        offset={30}
        tint={ice}
        trail="pointer"
        clickBurst
        fontSize="clamp(2.6rem, 8vw, 5.5rem)"
        fontWeight={800}
      />
    ),
  },
  {
    name: "StrokeText",
    label: "선으로 그리기",
    hint: "포인터를 올리면 다시 그려요.",
    span: 2,
    render: (bit) => (
      <bit.default
        text="Dipull"
        strokeColor={ice}
        strokeWidth={1.4}
        drawDuration={1.6}
        fillMode="wipe"
        fontSize={104}
        fontWeight={800}
        letterSpacing={-3}
        hoverRedraw
      />
    ),
  },
  {
    name: "FoldText",
    label: "접히는 글자",
    hint: "포인터 근처 글자가 다시 접혀요.",
    span: 2,
    render: (bit) => (
      <bit.default
        text="Jeamin Choi"
        foldStyle="paper"
        splitBy="char"
        hinge="top"
        trigger="view"
        hoverRefold
        fontSize="clamp(2.4rem, 7vw, 4.6rem)"
        fontWeight={800}
      />
    ),
  },
  {
    name: "TextCursor",
    label: "글자 발자국",
    hint: "포인터가 지나간 길에 글자가 찍혀요.",
    fit: "fill",
    height: 240,
    render: (bit) => (
      <div className="desk-field">
        <p className="desk-field-copy">여기를 지나가 보세요.</p>
        <bit.default text="*" fontSize={30} spacing={70} maxPoints={9} popIn />
      </div>
    ),
  },
  {
    name: "CircularText",
    label: "도는 글자",
    hint: "잡고 돌려 보세요.",
    auto: true,
    height: 240,
    render: (bit) => (
      <bit.default
        text="JEAMXN*MAKES*PRODUCTS*"
        onHover="speedUp"
        spinDuration={20}
        size={180}
        fontSize={20}
        color={paper}
        draggable
      />
    ),
  },
  {
    name: "CurvedLoop",
    label: "휘어 흐르는 띠",
    hint: "끌면 방향이 바뀌어요.",
    height: 200,
    span: 3,
    auto: true,
    render: (bit) => (
      <div className="desk-curved">
        <bit.default
          marqueeText="ara * Dipull * PFCT * KT SAT * "
          speed={1.6}
          curveAmount={220}
          fontSize={76}
          fontWeight={700}
          color={paper}
          interactive
        />
      </div>
    ),
  },
  {
    name: "TextLoop",
    label: "물결 리본",
    fit: "fill",
    height: 220,
    span: 3,
    auto: true,
    render: (bit) => (
      <bit.default
        text="ara * Dipull * PFCT"
        shape="wave"
        speed={70}
        separator="*"
        curviness={70}
        fontSize={40}
        fontWeight={800}
        uppercase
        ribbon
        ribbonColor={cobalt}
        ribbonWidth={76}
        pauseOnHover
      />
    ),
  },
  {
    name: "ScrollVelocity",
    label: "스크롤 속도 띠",
    hint: "빨리 스크롤할수록 빨리 흘러요. 첫 화면에도 있어요.",
    fit: "fill",
    height: 200,
    span: 3,
    auto: true,
    render: (bit) => (
      <bit.default
        texts={["ara * Dipull * ", "PFCT * KT SAT * "]}
        velocity={50}
        numCopies={6}
        className="desk-velocity"
      />
    ),
  },
  {
    name: "ScrollFloat",
    label: "스크롤에 떠오르기",
    hint: "이 칸이 화면을 지나는 동안 글자가 떠올라요.",
    span: 2,
    render: (bit) => (
      <bit.default
        animationDuration={1}
        ease="back.inOut(2)"
        scrollStart="center bottom+=40%"
        scrollEnd="bottom bottom-=30%"
        stagger={0.03}
        containerClassName="desk-scroll-float"
        textClassName="desk-scroll-float-text"
      >
        필요한 것을 배우고, 좋아하는 걸 만들어요.
      </bit.default>
    ),
  },
  {
    name: "ScrollReveal",
    label: "스크롤에 또렷해지기",
    hint: "첫 화면 마지막 문장에 쓴 효과예요.",
    span: 2,
    render: (bit) => (
      <bit.default
        baseOpacity={0.12}
        baseRotation={0}
        blurStrength={5}
        containerClassName="desk-scroll-reveal"
        textClassName="desk-scroll-reveal-text"
        rotationEnd="center center"
        wordAnimationEnd="center center"
      >
        {lines[0]}
      </bit.default>
    ),
  },
  {
    name: "MaskedHeading",
    label: "화면이 비치는 글자",
    hint: "글자 안에 ara 화면이 들어 있어요.",
    height: 260,
    span: 2,
    render: (bit) => (
      <bit.default
        text="ara"
        tag="p"
        mediaType="image"
        src={wideShots[1].src}
        fillScale={1.3}
        parallax={30}
        reveal="scale"
        trigger="view"
        spotlight
        outline
        outlineColor="#3a4258"
        weight={900}
      />
    ),
  },
  {
    name: "ParticleText",
    label: "모래 글자",
    hint: "포인터로 밀고, 눌러서 흩뜨려 보세요.",
    fit: "fill",
    height: 280,
    span: 3,
    render: (bit) => (
      <bit.default
        text="jeamxn"
        particleSize={2}
        density={4}
        color={paper}
        highlightColor={bright}
        clickBurst
        fontSize="clamp(3rem, 12vw, 8rem)"
        fontWeight={800}
        fontFamily={fontFamily}
      />
    ),
  },
  {
    name: "TechText",
    label: "도면 글자",
    hint: "포인터가 닿은 글자가 채워져요.",
    fit: "fill",
    height: 300,
    span: 3,
    render: (bit) => (
      <bit.default text="Dipull" fontWeight={600} fontSize={130} reveal="letter" clickKick />
    ),
  },
  {
    name: "WarpText",
    label: "일렁이는 글자",
    hint: "포인터 주변이 렌즈처럼 휘어요.",
    fit: "fill",
    height: 280,
    span: 3,
    auto: true,
    render: (bit) => (
      <bit.default
        text="jeamxn"
        lens="bulge"
        ripple
        clickRipple
        fontSize="clamp(3rem, 10vw, 8rem)"
        fontWeight={800}
        style={{ height: "280px" }}
      />
    ),
  },
  {
    name: "FallingText",
    label: "무너지는 문장",
    hint: "포인터를 올리면 단어가 쏟아져요. 잡아서 던질 수도 있어요.",
    fit: "fill",
    height: 320,
    span: 3,
    render: (bit) => (
      <bit.default
        text="어떤 문장은 오래 남아요. 이 문장은 건드리면 무너져요."
        highlightWords={["건드리면", "무너져요."]}
        trigger="hover"
        fontSize="1.6rem"
        gravity={1}
        restoreDelay={2}
      />
    ),
  },
];
