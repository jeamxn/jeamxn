import { createContext, type ReactNode, useContext, useRef } from "react";
import type { BitComponent } from "~/shared/lib/bits";
import { bright, cobalt, type Demo, ice, ink, names, paper, portrait, wideShots } from "./demo";

/** True inside a work cover: the pointer effect runs over the cover, with no copy of its own. */
export const BareField = createContext(false);

function Field({
  children,
  copy = "이 안에서 포인터를 움직여 보세요.",
  targets = false,
}: {
  children?: ReactNode;
  copy?: string;
  targets?: boolean;
}) {
  const bare = useContext(BareField);
  if (bare) return <div className="desk-field">{children}</div>;
  return (
    <div className="desk-field">
      <p className="desk-field-copy">{copy}</p>
      {targets && (
        <div className="desk-field-targets">
          {names.map((name) => (
            <button type="button" className="cursor-target desk-field-target" key={name}>
              {name}
            </button>
          ))}
        </div>
      )}
      {children}
    </div>
  );
}

function Target({ Bit }: { Bit: BitComponent }) {
  const box = useRef<HTMLDivElement>(null);
  return (
    <div ref={box} className="desk-field-wrap">
      <Field copy="이름 위에 올리면 과녁이 달라붙어요." targets />
      <Bit
        container={box}
        targetSelector=".cursor-target"
        cursorColor={paper}
        cursorColorOnTarget={ice}
        spinDuration={2}
        hideDefaultCursor={false}
        parallaxOn
      />
    </div>
  );
}

function Cross({ Bit }: { Bit: BitComponent }) {
  const box = useRef<HTMLDivElement>(null);
  return (
    <div ref={box} className="desk-field-wrap">
      <Field copy="조준선이 포인터를 따라와요." targets />
      <Bit
        containerRef={box}
        color={paper}
        targetSelector=".cursor-target"
        targetEffect="lock"
        opacity={0.8}
        smoothing={0.35}
        showCoordinates
      />
    </div>
  );
}

/* The mouse: pointer effects, one at a time. */
export const cursorDemos: Demo[] = [
  {
    name: "SplashCursor",
    label: "물감",
    hint: "움직이면 번지고, 누르면 튀어요.",
    fit: "fill",
    render: (bit) => (
      <Field>
        <bit.default contained colors={[cobalt, ice, paper]} rainbow={false} clickSplash />
      </Field>
    ),
  },
  {
    name: "BlobCursor",
    label: "물방울",
    hint: "크롬 방울이 뒤따라와요.",
    fit: "fill",
    render: (bit) => (
      <Field>
        <bit.default material="chrome" color={cobalt} size={120} />
      </Field>
    ),
  },
  {
    name: "GhostCursor",
    label: "연기",
    hint: "지나간 자리에 연기가 남아요.",
    fit: "fill",
    render: (bit) => (
      <Field>
        <bit.default color={ice} size={80} trailLength={50} bloomStrength={0.6} />
      </Field>
    ),
  },
  {
    name: "GlowCursor",
    label: "빛줄기",
    hint: "빛나는 선이 길을 따라 남아요.",
    fit: "fill",
    render: (bit) => (
      <bit.default color={bright} secondaryColor={paper} intensity={1.3} clickBurst theme="dark">
        <Field />
      </bit.default>
    ),
  },
  {
    name: "SwarmCursor",
    label: "반딧불",
    hint: "점 수백 개가 포인터로 모여요. 누르면 흩어져요.",
    fit: "fill",
    render: (bit) => (
      <bit.default count={700} size={2.6} color={ice} accentColor={paper} clickEffect="burst">
        <Field />
      </bit.default>
    ),
  },
  {
    name: "Ribbons",
    label: "리본",
    hint: "리본 세 가닥이 따라와요.",
    fit: "fill",
    render: (bit) => (
      <Field>
        <bit.default colors={[cobalt, ice, paper]} thickness={26} length={1.3} />
      </Field>
    ),
  },
  {
    name: "PixelTrail",
    label: "픽셀 자국",
    hint: "지나간 칸이 잠깐 켜져요.",
    fit: "fill",
    render: (bit) => (
      <Field>
        <bit.default gridSize={44} trailSize={0.1} maxAge={500} color={bright} />
      </Field>
    ),
  },
  {
    name: "CursorGrid",
    label: "모눈",
    hint: "포인터 주변 칸이 밝아져요.",
    fit: "fill",
    render: (bit) => (
      <bit.default cellSize={52} color={ice} highlight="area" radius={140} clickPulse>
        <Field />
      </bit.default>
    ),
  },
  {
    name: "MetaBalls",
    label: "젤리 공",
    hint: "공들이 포인터에 달라붙어요.",
    fit: "fill",
    render: (bit) => (
      <Field>
        <bit.default color={ice} cursorBallColor={paper} ballCount={14} enableTransparency />
      </Field>
    ),
  },
  {
    name: "ImageTrail",
    label: "화면 자국",
    hint: "움직인 길에 제품 화면이 뿌려져요.",
    fit: "fill",
    render: (bit) => (
      <Field>
        <bit.default
          items={wideShots.map((shot) => shot.src)}
          size={170}
          aspectRatio={1.6}
          radius={10}
          threshold={70}
        />
      </Field>
    ),
  },
  {
    name: "TargetCursor",
    label: "과녁",
    fit: "fill",
    render: (bit) => <Target Bit={bit.default} />,
  },
  {
    name: "Crosshair",
    label: "조준선",
    fit: "fill",
    render: (bit) => <Cross Bit={bit.default} />,
  },
  {
    name: "ClickSpark",
    label: "불꽃",
    hint: "이 사이트 어디를 눌러도 같은 불꽃이 튀어요.",
    fit: "fill",
    render: (bit) => (
      <bit.default sparkColor={ice} sparkCount={10} sparkSize={14} sparkRadius={34} duration={520}>
        <Field copy="아무 데나 눌러 보세요." />
      </bit.default>
    ),
  },
];

const photoAlt = "최재민의 인물 사진";
const cover = { width: "100%", height: "100%", objectFit: "cover" } as const;

/* One photograph, many ways to handle it. */
export const photoDemos: Demo[] = [
  {
    name: "HalftoneReveal",
    label: "망점 인쇄",
    hint: "포인터가 닿은 곳만 원래 사진이 드러나요.",
    fit: "fill",
    render: (bit) => (
      <bit.default
        src={portrait}
        fit="cover"
        mode="mono"
        shape="dot"
        cellSize={6}
        inkColor={ink}
        paperColor={paper}
        revealRadius={150}
      />
    ),
  },
  {
    name: "DitherVeil",
    label: "흑백 점묘",
    hint: "포인터 주변만 색이 돌아와요.",
    fit: "fill",
    render: (bit) => (
      <bit.default
        src={portrait}
        fit="cover"
        pattern="floyd"
        pixelSize={2}
        inkColor={ink}
        paperColor={paper}
        revealRadius={180}
      />
    ),
  },
  {
    name: "RippleDistortion",
    label: "물결",
    hint: "사진 위를 저으면 물결이 일어요.",
    fit: "fill",
    render: (bit) => <bit.default src={portrait} brushSize={140} strength={0.2} rings={4} />,
  },
  {
    name: "GridDistortion",
    label: "늘어나는 격자",
    hint: "잡아끌면 사진이 고무처럼 늘어나요.",
    fit: "fill",
    render: (bit) => (
      <bit.default imageSrc={portrait} grid={15} radius={0.18} strength={0.15} clickRipple />
    ),
  },
  {
    name: "FluidGlass",
    label: "유리 렌즈",
    hint: "렌즈가 포인터를 따라다녀요. 누르면 모양이 바뀌어요.",
    fit: "fill",
    render: (bit) => (
      <bit.default
        text=""
        src={portrait}
        fit="cover"
        shape="lens"
        size={220}
        refraction={1}
        dispersion={0.35}
        interaction="follow"
        morphOnClick
      />
    ),
  },
  {
    name: "PaperCrumple",
    label: "구겨지는 인화지",
    hint: "누르고 있으면 구겨지고, 놓으면 펴져요.",
    render: (bit) => (
      <bit.default
        src={portrait}
        alt={photoAlt}
        width={380}
        height={260}
        sceneHeight={400}
        releaseBehavior="restore"
        paperColor="#f4f0e8"
        draggable
        returnToOrigin
      />
    ),
  },
  {
    name: "DecayCard",
    label: "번지는 카드",
    hint: "포인터를 빨리 움직일수록 사진이 녹아내려요.",
    render: (bit) => (
      <bit.default image={portrait} width={300} height={380} radius={16}>
        <p className="desk-card-name">최재민</p>
      </bit.default>
    ),
  },
  {
    name: "TiltedCard",
    label: "기우는 카드",
    hint: "포인터 쪽으로 기울어요.",
    render: (bit) => (
      <bit.default
        imageSrc={portrait}
        altText={photoAlt}
        captionText="최재민"
        containerHeight="340px"
        containerWidth="340px"
        imageHeight="340px"
        imageWidth="340px"
        rotateAmplitude={12}
        scaleOnHover={1.05}
        glare={0.5}
        showTooltip={false}
      />
    ),
  },
  {
    name: "HoloCard",
    label: "홀로그램 카드",
    hint: "기울이면 무지갯빛이 흘러요.",
    render: (bit) => (
      <bit.default image={portrait} alt={photoAlt} preset="bursts" width={260} radius={18} />
    ),
  },
  {
    name: "ProfileCard",
    label: "명함",
    hint: "연락하기를 누르면 메일 앱이 열려요.",
    render: (bit) => (
      <bit.default
        name="최재민"
        title="제품을 만드는 사람"
        handle="jeamxn"
        status="ara를 만드는 중"
        contactText="연락하기"
        avatarUrl={portrait}
        miniAvatarUrl={portrait}
        theme="dark"
        onContactClick={() => {
          window.location.href = "mailto:me@jeamxn.dev";
        }}
      />
    ),
  },
  {
    name: "ReflectiveCard",
    label: "금속 사원증",
    hint: "카메라는 쓰지 않아요. 금속 면만 기울여 보세요.",
    render: (bit) => (
      // biome-ignore lint/a11y/useValidAriaRole: role is this card's job-title prop, not an ARIA role
      <bit.default
        name="최재민"
        role="제품을 만드는 사람"
        badge="jeamxn*"
        status="재직 중"
        idLabel="메일"
        idValue="me@jeamxn.dev"
        webcam={false}
        theme="dark"
        tint="#ffffff"
        width={300}
        height={420}
      />
    ),
  },
  {
    name: "FlipCard",
    label: "뒤집는 카드",
    hint: "누르거나 옆으로 끌면 뒤집혀요.",
    render: (bit) => (
      <bit.default
        front={<img src={portrait} alt={photoAlt} style={cover} />}
        back={
          <div className="desk-card-back">
            <p className="desk-card-name">최재민</p>
            <p>행복한 개발자, 기술보다 아이디어를.</p>
          </div>
        }
        axis="y"
        flipOnClick
        draggable
        tilt
        glare
        width={300}
        height={380}
        radius={20}
        background="#22262e"
        color={paper}
      />
    ),
  },
  {
    name: "PixelTransition",
    label: "픽셀 전환",
    hint: "포인터를 올리면 픽셀로 덮였다가 이름이 나와요.",
    render: (bit) => (
      <bit.default
        firstContent={<img src={portrait} alt={photoAlt} style={cover} />}
        secondContent={
          <div className="desk-card-back desk-card-back--cobalt">
            <p className="desk-card-name">최재민</p>
            <p>Jeamin Choi</p>
          </div>
        }
        pixelColor={paper}
        gridSize={10}
        animationStepDuration={0.4}
        trigger="hover"
        aspectRatio="120%"
        style={{ width: 300 }}
      />
    ),
  },
  {
    name: "PixelSwap",
    label: "픽셀 바꿔치기",
    hint: "포인터가 지나간 칸부터 ara 화면으로 바뀌어요.",
    render: (bit) => (
      <div className="desk-photo-wide">
        <bit.default
          firstContent={<img src={portrait} alt={photoAlt} style={cover} />}
          secondContent={<img src={wideShots[1].src} alt={wideShots[1].alt} style={cover} />}
          pattern="pointer"
          pixelSize={44}
          trigger="hover"
          style={{ borderRadius: 16 }}
        />
      </div>
    ),
  },
  {
    name: "TearTicket",
    label: "뜯는 입장권",
    hint: "오른쪽 끝을 잡아당겨 뜯어 보세요.",
    render: (bit) => (
      <bit.default
        image={portrait}
        imageAlt={photoAlt}
        stub={
          <div className="desk-ticket-stub">
            <p className="desk-card-name">작업 기록</p>
            <p>입장권 1매</p>
            <span translate="no">jeamxn.dev/work</span>
          </div>
        }
        orientation="horizontal"
        scrim
        width={440}
        height={240}
        stubSize={150}
        background="#22262e"
        color={paper}
      >
        <span className="desk-ticket-title">최재민</span>
      </bit.default>
    ),
  },
  {
    name: "GlareHover",
    label: "스치는 빛",
    hint: "첫 화면의 제품 사진에도 같은 빛이 지나가요.",
    render: (bit) => (
      <bit.default
        width="min(100%, 460px)"
        height="300px"
        borderRadius="18px"
        background="transparent"
        borderColor="transparent"
        glareColor="#ffffff"
        glareOpacity={0.5}
        glareSize={260}
        variant="sheen"
        transitionDuration={900}
      >
        <img src={portrait} alt={photoAlt} style={cover} />
      </bit.default>
    ),
  },
  {
    name: "ScrollExpand",
    label: "스크롤로 펼치기",
    hint: "이 칸 안에서 스크롤하면 사진이 화면을 채워요.",
    fit: "fill",
    render: (bit) => (
      <bit.default
        src={portrait}
        alt={photoAlt}
        title="제품을 만드는 사람"
        scrollHint="스크롤"
        mediaZoom={1.3}
      >
        <p className="desk-expand-copy">
          학교에서 친구들의 불편을 고치던 일이 지금까지 이어졌어요.
        </p>
      </bit.default>
    ),
  },
];
