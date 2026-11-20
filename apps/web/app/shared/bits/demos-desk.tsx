import {
  Book02Icon,
  ChartHistogramIcon,
  CloudIcon,
  FavouriteIcon,
  Folder01Icon,
  Note01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useEffect, useRef, useState } from "react";
import type { BitComponent } from "~/shared/lib/bits";
import { sitePath } from "~/shared/lib/site-path";
import { IdLanyard } from "~/shared/widget/id-lanyard";
import {
  bright,
  cobalt,
  type Demo,
  fontFamily,
  ice,
  ink,
  mark,
  paper,
  sky,
  wideShots,
} from "./demo";

const chip = "#27272a";

/* Steps through a list on a timer so a status component shows its whole life. */
function useCycle<T>(values: T[], seconds: number[]): T {
  const [index, setIndex] = useState(0);
  const wait = seconds[index % seconds.length];
  useEffect(() => {
    const timer = window.setTimeout(() => setIndex((n) => (n + 1) % values.length), wait * 1000);
    return () => window.clearTimeout(timer);
  }, [values.length, wait]);
  return values[index];
}

function Thought({ Bit }: { Bit: BitComponent }) {
  const working = useCycle([true, false], [5, 3]);
  return (
    <Bit
      working={working}
      steps={["질문을 읽는 중", "문서함을 찾는 중", "답을 쓰는 중"]}
      label="생각하는 중"
      doneLabel="생각한 시간"
      glyph="sparkle"
      fontSize={16}
      collapsible
      showTimer
    />
  );
}

function Calls({ Bit }: { Bit: BitComponent }) {
  const status = useCycle(["idle", "running", "done"], [1, 2.6, 2.4]);
  const [failed, setFailed] = useState(true);
  useEffect(() => {
    if (failed) return undefined;
    const timer = window.setTimeout(() => setFailed(true), 4000);
    return () => window.clearTimeout(timer);
  }, [failed]);
  return (
    <div className="desk-part-stack desk-part-stack--start">
      <Bit
        icon="search"
        name="문서 검색"
        argument="발표 자료"
        status={status}
        expectedMs={2500}
        surfaceColor={chip}
        doneColor={bright}
        showTimer
      />
      <Bit
        icon="edit"
        name="캔버스 고치기"
        argument="3쪽 제목"
        status={failed ? "error" : "running"}
        expectedMs={4000}
        surfaceColor={chip}
        onRetry={() => setFailed(false)}
      />
    </div>
  );
}

function Marks({ Bit }: { Bit: BitComponent }) {
  const step = useCycle([0, 1, 2, 3], [1.6, 1.6, 1.6, 2.4]);
  const tasks = ["회의 전사하기", "요약 쓰기", "할 일 뽑기"];
  return (
    <div className="desk-part-stack desk-part-stack--start">
      {tasks.map((task, index) => (
        <Bit
          key={task}
          status={index < step ? "done" : index === step ? "running" : "pending"}
          label={task}
          color={paper}
          doneColor={bright}
          size={20}
          fontSize={15}
          strike
        />
      ))}
    </div>
  );
}

function Loader({ Bit }: { Bit: BitComponent }) {
  const status = useCycle(["working", "done"], [5, 2.5]);
  return (
    <Bit
      status={status}
      label="만드는 중"
      doneLabel="다 만들었어요"
      errorLabel="만들지 못했어요"
      pattern="orbit"
      grid={3}
      shape="round"
      color={paper}
      doneColor={bright}
      cellSize={7}
      fontSize={15}
      showTimer
    />
  );
}

function Prompt({ Bit, width }: { Bit: BitComponent; width: number }) {
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState("");
  const timer = useRef(0);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  return (
    <div className="desk-part-stack">
      <p className="desk-part-note" aria-live="polite">
        {busy
          ? `"${sent}"에 답하는 척하는 중이에요.`
          : "여기에는 AI가 연결돼 있지 않아요. 모양과 움직임만 보여 드려요."}
      </p>
      <Bit
        placeholder="무엇이든 적어 보세요"
        sources={[{ key: "docs", name: "문서함", description: "내 문서에서 찾기" }]}
        commands={[{ key: "summary", name: "/요약", description: "지금까지의 대화를 줄여요" }]}
        models={[
          { key: "fast", name: "빠른 모델", tag: "가볍게" },
          { key: "deep", name: "깊은 모델", tag: "꼼꼼하게" },
        ]}
        efforts={["낮게", "보통", "높게"]}
        busy={busy}
        onSend={(text: string) => {
          setSent(text);
          setBusy(true);
          timer.current = window.setTimeout(() => setBusy(false), 2600);
        }}
        onStop={() => {
          window.clearTimeout(timer.current);
          setBusy(false);
        }}
        background={chip}
        color={paper}
        menuBackground="#323236"
        sparkColor={ice}
        width={Math.min(420, width - 32)}
      />
    </div>
  );
}

function Refine({ Bit }: { Bit: BitComponent }) {
  const status = useCycle(["queued", "generating", "refining", "complete"], [1.2, 2.2, 2.2, 3.4]);
  return (
    <Bit
      status={status}
      aspectRatio="16 / 10"
      width={300}
      radius={14}
      background={chip}
      color={paper}
      sweep
      showStatus
      labels={{
        queued: "기다리는 중",
        generating: "만드는 중",
        refining: "다듬는 중",
        complete: "다 됐어요",
        error: "실패했어요",
      }}
    >
      <img src={wideShots[2].src} alt={wideShots[2].alt} />
    </Bit>
  );
}

/* A taste of ara: the small status pieces an agent workspace is made of.
   Nothing here talks to a model; every state is a timer. */
export const agentDemos: Demo[] = [
  {
    name: "PromptBar",
    label: "입력창",
    hint: "글을 쓰고 보내면 단추가 멈춤 단추로 바뀌어요.",
    span: 2,
    height: 300,
    render: (bit, stage) => <Prompt Bit={bit.default} width={stage.width} />,
  },
  {
    name: "ThoughtLine",
    label: "생각 중 표시",
    hint: "끝나면 걸린 시간으로 접혀요.",
    auto: true,
    render: (bit) => <Thought Bit={bit.default} />,
  },
  {
    name: "CallChip",
    label: "도구 호출 칩",
    hint: "실패한 칩은 눌러서 다시 시도해요.",
    auto: true,
    render: (bit) => <Calls Bit={bit.default} />,
  },
  {
    name: "StatusMark",
    label: "할 일 상태",
    hint: "끝난 일에는 줄이 그어져요.",
    auto: true,
    render: (bit) => <Marks Bit={bit.default} />,
  },
  {
    name: "LatticeLoader",
    label: "격자 로더",
    auto: true,
    render: (bit) => <Loader Bit={bit.default} />,
  },
  {
    name: "VoicePill",
    label: "음성 단추",
    hint: "누르고 있으면 파형이 나와요. 마이크는 쓰지 않아요.",
    render: (bit) => (
      <bit.default
        accentColor={paper}
        iconColor="#a1a1aa"
        background={chip}
        size={30}
        showTime
        waveform
        slideToCancel
        reactive="simulated"
        ariaLabel="음성 입력 흉내"
      />
    ),
  },
  {
    name: "RefineFrame",
    label: "결과물 액자",
    hint: "흐리다가 점점 또렷해져요.",
    auto: true,
    height: 300,
    render: (bit) => <Refine Bit={bit.default} />,
  },
  {
    name: "AnimatedList",
    label: "문서 목록",
    hint: "방향키로도 고를 수 있어요.",
    height: 340,
    span: 2,
    render: (bit, stage) => (
      <bit.default
        items={[
          { title: "발표 자료", description: "캔버스 12쪽", meta: "2분 전" },
          { title: "회의록", description: "문서 3쪽", meta: "18분 전" },
          { title: "제품 소개 영상", description: "타임라인 40초", meta: "1시간 전" },
          { title: "가격 메모", description: "문서 1쪽", meta: "3시간 전" },
          { title: "사용자 인터뷰", description: "문서 6쪽", meta: "어제" },
        ]}
        animation="pop"
        theme="dark"
        accentColor={cobalt}
        width={Math.min(380, stage.width - 32)}
        maxHeight={280}
      />
    ),
  },
];

function Laser({ Bit }: { Bit: BitComponent }) {
  const surface = useRef<HTMLDivElement>(null);
  return (
    <div className="desk-laser">
      <Bit
        surfaceRef={surface}
        beamPosition={0.62}
        color={bright}
        intensity={1.8}
        revealImage={wideShots[1].src}
        revealRadius={200}
        revealOpacity={0.6}
        theme="dark"
      />
      <div ref={surface} className="desk-laser-card">
        <p className="desk-card-name">ara</p>
        <p>빛이 카드 위로 쏟아져요.</p>
      </div>
    </div>
  );
}

const icon = (glyph: typeof Folder01Icon) => <HugeiconsIcon icon={glyph} />;
const stack = [
  "Next.js",
  "TypeScript",
  "React",
  "React Router",
  "Bun",
  "Elysia",
  "NestJS",
  "MongoDB",
];

/* Stickers and marks: the jeamxn asterisk in metal, glass, rubber and light. */
export const logoDemos: Demo[] = [
  {
    name: "Lanyard",
    label: "사원증",
    hint: "잡고 끌거나 던져 보세요. 뒤집으면 뒷면도 있어요.",
    fit: "fill",
    height: 520,
    span: 2,
    tone: "paper",
    render: () => <IdLanyard name="최재민" nameEn="Jeamin Choi" className="id-lanyard--fill" />,
  },
  {
    name: "MetallicPaint",
    label: "흐르는 금속",
    hint: "별표가 수은처럼 흘러요.",
    fit: "fill",
    height: 360,
    auto: true,
    render: (bit) => <bit.default imageSrc={mark} color={sky} speed={0.3} mouseTilt={0.4} />,
  },
  {
    name: "ElectricLogo",
    label: "전기가 흐르는 마크",
    hint: "포인터를 가져가면 불꽃이 튀어요.",
    fit: "fill",
    height: 360,
    auto: true,
    render: (bit) => (
      <bit.default src={mark} color={sky} glowColor={cobalt} scale={0.62} strands={4} interactive />
    ),
  },
  {
    name: "ElasticMesh",
    label: "말랑한 풍선 글자",
    hint: "잡아당기면 늘어나고, 놓으면 출렁여요.",
    fit: "fill",
    height: 360,
    span: 2,
    render: (bit) => (
      <bit.default
        text="ara"
        fontFamily={fontFamily}
        fontWeight={800}
        material="balloon"
        color={cobalt}
        inflate={1}
        stiffness={0.5}
        wobble={0.6}
        theme="dark"
      />
    ),
  },
  {
    name: "StickerPeel",
    label: "떼어지는 스티커",
    hint: "모서리를 들추거나 통째로 끌어 옮겨 보세요.",
    fit: "fill",
    height: 360,
    render: (bit) => (
      <bit.default
        imageSrc={sitePath("/images/mark/sticker.svg")}
        width={170}
        finish="gloss"
        peelBackHoverPct={25}
        peelBackActivePct={40}
        rotate={-8}
      />
    ),
  },
  {
    name: "ShapeBlur",
    label: "초점 렌즈",
    hint: "포인터 주변만 또렷해져요.",
    fit: "fill",
    height: 360,
    render: (bit) => (
      <bit.default
        src={mark}
        size={0.62}
        fill
        color={paper}
        blur={16}
        lensSize={0.3}
        chroma={0.3}
        idle
      />
    ),
  },
  {
    name: "GlassSurface",
    label: "유리 단추",
    hint: "뒤에 있는 글자가 유리 너머로 굴절돼요.",
    fit: "fill",
    height: 360,
    render: (bit) => (
      <div className="desk-glass">
        <p aria-hidden="true">jeamxn* jeamxn* jeamxn* jeamxn* jeamxn* jeamxn*</p>
        <bit.default
          width={260}
          height={76}
          borderRadius={38}
          displace={0.5}
          backgroundOpacity={0.1}
        >
          <span className="desk-glass-label">유리 단추</span>
        </bit.default>
      </div>
    ),
  },
  {
    name: "GlassIcons",
    label: "유리 아이콘",
    hint: "올리면 판이 기울고 이름이 나와요.",
    fit: "fill",
    height: 400,
    span: 2,
    render: (bit, stage) => (
      <bit.default
        items={[
          { icon: icon(Folder01Icon), color: "blue", label: "문서함" },
          { icon: icon(Note01Icon), color: "indigo", label: "메모" },
          { icon: icon(Book02Icon), color: "purple", label: "이력" },
          { icon: icon(ChartHistogramIcon), color: "blue", label: "기록" },
          { icon: icon(CloudIcon), color: "indigo", label: "배포" },
          { icon: icon(FavouriteIcon), color: "purple", label: "취향" },
        ]}
        size={stage.width < 480 ? 62 : 78}
        gap={stage.width < 480 ? 36 : 56}
        columns={3}
        labels="hover"
        theme="dark"
      />
    ),
  },
  {
    name: "CrystalizedBall",
    label: "수정 구슬",
    hint: "가까이 가면 안쪽 무늬가 반응해요.",
    fit: "fill",
    height: 360,
    auto: true,
    render: (bit) => <bit.default preset="frost" size={0.7} interactive hoverStrength={0.7} />,
  },
  {
    name: "Cubes",
    label: "기우는 정육면체",
    hint: "포인터를 따라 기울고, 누르면 물결이 퍼져요.",
    fit: "fill",
    height: 360,
    render: (bit) => (
      <div className="desk-cubes">
        <div>
          <bit.default
            gridSize={8}
            faceColor={ink}
            edgeColor={ice}
            rippleColor={cobalt}
            maxAngle={45}
            radius={3}
            rippleOnClick
          />
        </div>
      </div>
    ),
  },
  {
    name: "ModelViewer",
    label: "입체 별표",
    hint: "끌어서 돌려 보세요.",
    fit: "fill",
    height: 360,
    auto: true,
    render: (bit) => (
      <bit.default
        url={sitePath("/images/mark/mark.obj")}
        width="100%"
        height={360}
        environment="none"
        autoRotate
        autoRotateSpeed={0.6}
        shadow={false}
        zoom={false}
      />
    ),
  },
  {
    name: "Strands",
    label: "소리 가닥",
    hint: "누르면 가닥이 한 번 튕겨요.",
    fit: "fill",
    height: 360,
    auto: true,
    render: (bit) => <bit.default colors={[cobalt, ice, paper]} interactive clickPulse />,
  },
  {
    name: "LaserFlow",
    label: "레이저",
    hint: "포인터를 가져가면 안개 속에 ara 화면이 비쳐요.",
    fit: "fill",
    height: 420,
    span: 3,
    auto: true,
    render: (bit) => <Laser Bit={bit.default} />,
  },
  {
    name: "LogoLoop",
    label: "기술 띠",
    hint: "작업 기록에 자주 나온 기술이에요. 이력 페이지에도 흐르고 있어요.",
    fit: "fill",
    height: 200,
    span: 3,
    auto: true,
    render: (bit) => (
      <div className="desk-logo-loop">
        <bit.default
          logos={stack.map((name) => ({
            node: <span className="desk-logo-word">{name}</span>,
            title: name,
          }))}
          speed={70}
          direction="left"
          logoHeight={34}
          gap={56}
          hoverSpeed={0}
          fadeOut
          fadeOutColor={ink}
          ariaLabel="자주 쓴 기술"
        />
      </div>
    ),
  },
];
