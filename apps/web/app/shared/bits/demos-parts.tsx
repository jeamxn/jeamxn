import { type ReactNode, useRef, useState } from "react";
import type { BitComponent } from "~/shared/lib/bits";
import { sitePath } from "~/shared/lib/site-path";
import { bright, cobalt, type Demo, ice, lines, paper, portrait } from "./demo";

const chip = "#27272a";

function Glyph({ children }: { children: string }) {
  return (
    <span className="desk-glyph" aria-hidden="true">
      {children}
    </span>
  );
}

function Switch({ Bit }: { Bit: BitComponent }) {
  const [on, setOn] = useState(true);
  return (
    <div className="desk-part-stack">
      <Bit
        checked={on}
        onChange={setOn}
        label="기상송 알림"
        trackColor={chip}
        trackOnColor={paper}
      />
      <p className="desk-part-note" aria-live="polite">
        {on ? "아침에 알려 드릴게요." : "알림을 껐어요."}
      </p>
    </div>
  );
}

function Gauge({ Bit }: { Bit: BitComponent }) {
  const [level, setLevel] = useState(60);
  return (
    <Bit
      value={level}
      onChange={setLevel}
      interactive
      showValue
      liquidColor={ice}
      glassColor={chip}
      width={84}
      height={170}
      unit="%"
      ariaLabel="세제 남은 양"
    />
  );
}

function Code({ Bit }: { Bit: BitComponent }) {
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");
  return (
    <div className="desk-part-stack">
      <Bit
        length={4}
        status={status}
        onChange={() => setStatus("idle")}
        onComplete={(code: string) => setStatus(code === "2459" ? "success" : "error")}
        slotSize={44}
        gap={8}
      />
      <p className="desk-part-note" aria-live="polite">
        {status === "success"
          ? "맞았어요. 이 사이트의 파란색 번호예요."
          : status === "error"
            ? "아니에요. 힌트는 2459예요."
            : "숫자 네 자리를 넣어 보세요."}
      </p>
    </div>
  );
}

function Toast({ Bit }: { Bit: BitComponent }) {
  const [toasts, setToasts] = useState<number[]>([1]);
  return (
    <div className="desk-part-stack">
      <button
        type="button"
        className="desk-button"
        onClick={() => setToasts((list) => [...list.slice(-1), Date.now()])}
      >
        알림 띄우기
      </button>
      <div className="desk-toasts">
        {toasts.map((id) => (
          <Bit
            key={id}
            inline
            title="세탁이 끝났어요"
            description="3층 2번 세탁기"
            actionLabel="확인"
            onAction={() => setToasts((list) => list.filter((item) => item !== id))}
            onClose={() => setToasts((list) => list.filter((item) => item !== id))}
            background={chip}
            color={paper}
            fuseColor={bright}
            width={300}
            duration={5000}
            pauseOnHover
          />
        ))}
      </div>
    </div>
  );
}

const papers = [
  { id: 1, name: "회의록 초안", size: "2쪽" },
  { id: 2, name: "안 쓰는 시안", size: "5쪽" },
  { id: 3, name: "지난 분기 메모", size: "1쪽" },
];
function Shred({ Bit }: { Bit: BitComponent }) {
  const [files, setFiles] = useState(papers);
  return (
    <div className="desk-part-stack">
      <Bit
        items={files}
        renderItem={(file: (typeof papers)[number]) => (
          <div className="desk-shred-row">
            <span>{file.name}</span>
            <span>{file.size}</span>
          </div>
        )}
        onShred={(file: (typeof papers)[number]) =>
          setFiles((list) => list.filter((item) => item.id !== file.id))
        }
        onReorder={setFiles}
        width={300}
        height={380}
      />
      {files.length === 0 && (
        <button type="button" className="desk-button" onClick={() => setFiles(papers)}>
          종이 다시 채우기
        </button>
      )}
    </div>
  );
}

function Count({ Bit }: { Bit: BitComponent }) {
  const [value, setValue] = useState(86);
  return (
    <div className="desk-part-stack">
      <Bit value={value} fontSize={72} fontWeight={600} textColor={paper} />
      <div className="desk-part-row">
        <button type="button" className="desk-button" onClick={() => setValue((v) => v - 7)}>
          7 빼기
        </button>
        <button type="button" className="desk-button" onClick={() => setValue((v) => v + 13)}>
          13 더하기
        </button>
      </div>
    </div>
  );
}

function Replay({ children }: { children: ReactNode }) {
  const [turn, setTurn] = useState(0);
  return (
    <div className="desk-part-stack">
      <div key={turn} className="desk-replay">
        {children}
      </div>
      <button type="button" className="desk-button" onClick={() => setTurn((n) => n + 1)}>
        다시 보기
      </button>
    </div>
  );
}

function BlurEdge({ Bit }: { Bit: BitComponent }) {
  const box = useRef<HTMLDivElement>(null);
  return (
    <div className="desk-blur">
      {/* biome-ignore lint/a11y/noNoninteractiveTabindex: a scrollable region must be reachable by keyboard */}
      <div ref={box} className="desk-blur-scroll" tabIndex={0}>
        {[...lines, ...lines, ...lines].map((line, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: a fixed, repeated list of sentences
          <p key={index}>{line}</p>
        ))}
      </div>
      <Bit position="bottom" height="5rem" strength={2} layers={8} exponential />
    </div>
  );
}

const note = (name: string, line: string) => (
  <div className="desk-card-copy">
    <p className="desk-card-name" translate="no">
      {name}
    </p>
    <p>{line}</p>
  </div>
);
const go = (path: string) => window.location.assign(sitePath(path));

/* The parts drawer: small controls, each doing one thing well. */
export const partDemos: Demo[] = [
  {
    name: "SquishSwitch",
    label: "말랑한 스위치",
    hint: "눌러서 켜고 꺼요.",
    render: (bit) => <Switch Bit={bit.default} />,
  },
  {
    name: "JellyRadio",
    label: "젤리 선택지",
    hint: "고르면 옆 칸이 밀려요.",
    span: 2,
    render: (bit) => (
      <bit.default
        items={["끔", "약하게", "보통", "세게"]}
        defaultValue="보통"
        chipColor={chip}
        activeColor={paper}
        textColor={paper}
        activeTextColor="#18181b"
        ariaLabel="탈수 세기"
      />
    ),
  },
  {
    name: "RubberSegment",
    label: "고무줄 탭",
    hint: "끌면 손잡이가 늘어나요.",
    span: 2,
    render: (bit) => (
      <bit.default
        items={["하루", "한 주", "한 달", "한 해"]}
        defaultValue="한 주"
        trackColor={chip}
        thumbColor="#fafafa"
        textColor="#fafafa"
        activeTextColor="#18181b"
        equalSlots
        draggable
        ariaLabel="기간"
      />
    ),
  },
  {
    name: "GlideSelect",
    label: "미끄러지는 선택 상자",
    hint: "고르면 그 기록으로 가요.",
    height: 300,
    render: (bit) => (
      <bit.default
        options={[
          { value: "ara", label: "ara", tag: "2026" },
          { value: "dipull", label: "Dipull", tag: "2022" },
          { value: "pfct", label: "PFCT", tag: "2024" },
          { value: "multinet", label: "MultiNet", tag: "2025" },
        ]}
        placeholder="기록 고르기"
        onChange={(value: string) => go(`/work/${value}`)}
        ariaLabel="프로젝트 고르기"
        showTags
        placement="bottom"
      />
    ),
  },
  {
    name: "SpringCheck",
    label: "튀는 체크",
    hint: "체크하면 글자에 줄이 그어져요.",
    render: (bit) => (
      <bit.default
        label="세탁 예약하기"
        color="#ffffff"
        fillColor="#ffffff"
        checkColor="#0b0b0f"
        fontSize={17}
      />
    ),
  },
  {
    name: "HoldButton",
    label: "꾹 누르는 단추",
    hint: "2초 동안 누르고 있어야 해요.",
    render: (bit) => (
      <bit.default
        doneLabel="지웠어요"
        backgroundColor={chip}
        fillColor={cobalt}
        textColor={paper}
        fillTextColor="#ffffff"
        holdTime={2000}
        wave
        glow
      >
        꾹 눌러 지우기
      </bit.default>
    ),
  },
  {
    name: "FuseButton",
    label: "되돌릴 수 있는 단추",
    hint: "누른 뒤 4초 안에는 되돌릴 수 있어요.",
    render: (bit) => (
      <bit.default
        label="보관하기"
        doneLabel="보관했어요"
        undoLabel="되돌리기"
        color={paper}
        background={chip}
        fuseColor={bright}
        undoWindow={4000}
        pauseOnHover
      />
    ),
  },
  {
    name: "SlideCommit",
    label: "밀어서 확정",
    hint: "손잡이를 끝까지 밀어요.",
    render: (bit) => (
      <bit.default
        label="밀어서 예약하기"
        doneLabel="예약했어요"
        errorLabel="예약하지 못했어요"
        onConfirm={() => new Promise((resolve) => setTimeout(resolve, 900))}
        trackColor="#262626"
        handleColor={paper}
        successColor={cobalt}
        width={260}
      />
    ),
  },
  {
    name: "SlingButton",
    label: "새총 단추",
    hint: "뒤로 당겼다 놓으면 날아가요.",
    height: 260,
    render: (bit) => (
      <bit.default padColor={paper} iconColor="#18181b" accentColor={paper} wellColor={chip} />
    ),
  },
  {
    name: "FlyingButton",
    label: "날아오르는 단추",
    hint: "올려 두면 떠올라요.",
    fit: "fill",
    height: 320,
    render: (bit) => (
      <bit.default
        theme="dark"
        size="medium"
        altitude={120}
        hoverTime={2.4}
        trigger="hover"
        thrustColor={ice}
      >
        이륙
      </bit.default>
    ),
  },
  {
    name: "BellToggle",
    label: "울리는 종",
    hint: "켜면 종이 흔들려요.",
    render: (bit) => (
      <bit.default
        offLabel="알림 받기"
        onLabel="알려 드릴게요"
        color={paper}
        background={chip}
        onColor="#18181b"
        onBackground={paper}
        count={3}
        badge
        badgeColor={cobalt}
        waves
      />
    ),
  },
  {
    name: "PulseHeart",
    label: "뛰는 하트",
    hint: "누르면 숫자가 굴러 올라가요.",
    render: (bit) => (
      <bit.default count={86} showCount likedColor={bright} pillColor="#232326" textColor={paper} />
    ),
  },
  {
    name: "PeekRating",
    label: "별점",
    hint: "별 위에 올리면 말풍선이 떠요.",
    render: (bit) => (
      <bit.default
        defaultValue={4}
        count={5}
        shape="star"
        labels={["별로예요", "그럭저럭", "괜찮아요", "좋아요", "최고예요"]}
        activeColor="#f5b400"
        showTip
        allowClear
      />
    ),
  },
  {
    name: "CometDial",
    label: "혜성 다이얼",
    hint: "돌리거나 튕겨 보세요.",
    height: 300,
    render: (bit) => (
      <bit.default
        defaultValue={62}
        unit="%"
        label="볼륨"
        accent={paper}
        ink="#fdfdfd"
        size={220}
      />
    ),
  },
  {
    name: "WakeSlider",
    label: "물결 슬라이더",
    hint: "끌면 막대가 물결쳐요.",
    render: (bit) => (
      <div style={{ width: "min(100%, 280px)" }}>
        <bit.default defaultValue={50} bars={28} fillColor={paper} trackColor={chip} showValue />
      </div>
    ),
  },
  {
    name: "ElasticSlider",
    label: "늘어나는 슬라이더",
    hint: "끝을 넘겨 당기면 늘어났다 돌아와요.",
    render: (bit) => (
      <bit.default defaultValue={50} leftIcon={<Glyph>-</Glyph>} rightIcon={<Glyph>+</Glyph>} />
    ),
  },
  {
    name: "ScrubField",
    label: "문질러 바꾸는 숫자",
    hint: "숫자 위에서 옆으로 끌어요.",
    render: (bit) => (
      <bit.default
        label="모서리"
        suffix="px"
        defaultValue={20}
        min={0}
        max={100}
        showDelta
        showFill
        accent={paper}
        chipColor={chip}
      />
    ),
  },
  {
    name: "SloshGauge",
    label: "찰랑이는 눈금",
    hint: "끌어서 채우면 물이 출렁여요.",
    height: 260,
    render: (bit) => <Gauge Bit={bit.default} />,
  },
  {
    name: "CodeSlots",
    label: "인증 번호 칸",
    hint: "틀리면 흔들려요.",
    span: 2,
    render: (bit) => <Code Bit={bit.default} />,
  },
  {
    name: "Counter",
    label: "구르는 숫자",
    hint: "단추를 누르면 자리마다 굴러요.",
    render: (bit) => <Count Bit={bit.default} />,
  },
  {
    name: "CurvedInput",
    label: "휘어진 입력창",
    hint: "보내기를 눌러도 아무 데도 보내지 않아요.",
    span: 2,
    render: (bit, stage) => (
      <bit.default
        placeholder="me@jeamxn.dev"
        buttonText="보내기"
        ariaLabel="메일 주소"
        theme="dark"
        buttonColor={cobalt}
        buttonTextColor="#ffffff"
        bend={24}
        height={60}
        width={Math.min(420, stage.width - 40)}
      />
    ),
  },
  {
    name: "SwipeRow",
    label: "밀어서 지우는 줄",
    hint: "왼쪽으로 밀면 단추가 나와요.",
    span: 2,
    render: (bit) => (
      <div style={{ width: "min(100%, 340px)" }}>
        <bit.default
          actions={[
            { id: "delete", label: "지우기", icon: <Glyph>x</Glyph> },
            { id: "archive", label: "보관", icon: <Glyph>v</Glyph>, dismiss: true },
          ]}
          actionColor="#e5484d"
          drawerColor="#3f3f46"
          rowColor={chip}
          textColor={paper}
          height={60}
          fullSwipe
        >
          <span>디자인 검토 메모</span>
        </bit.default>
      </div>
    ),
  },
  {
    name: "SwipeToast",
    label: "밀어서 닫는 알림",
    hint: "옆으로 밀면 사라져요.",
    span: 2,
    height: 260,
    render: (bit) => <Toast Bit={bit.default} />,
  },
  {
    name: "WarmTooltip",
    label: "이어지는 말풍선",
    hint: "하나를 본 뒤 옆으로 옮기면 바로 따라와요.",
    render: (bit) => {
      const Group = bit.WarmTooltipGroup;
      return (
        <Group delay={300} warmWindow={400}>
          <div className="desk-part-row">
            {[
              ["굵게", "B"],
              ["기울임", "I"],
              ["링크", "K"],
            ].map(([name, key]) => (
              <bit.default key={key} content={name} shortcut={`⌘${key}`} side="top">
                <button type="button" className="desk-tool" aria-label={name}>
                  {key}
                </button>
              </bit.default>
            ))}
          </div>
        </Group>
      );
    },
  },
  {
    name: "FolderFloat",
    label: "쪽지 폴더",
    hint: "올려 두면 쪽지가 떠올라요.",
    height: 340,
    span: 2,
    render: (bit) => (
      <bit.default
        items={["글자가 조금 작아요", "간격을 좁혀요", "표지가 좋아요", "파란색은 그대로"]}
        label="디자인 의견"
        sublabel="쪽지 4장"
        trigger="hover"
        physics
        itemColor={paper}
        itemTextColor="#18181b"
        labelColor={paper}
      />
    ),
  },
  {
    name: "BranchedMenu",
    label: "가지 메뉴",
    hint: "가지 끝을 누르면 그 기록으로 가요.",
    height: 320,
    render: (bit) => (
      <bit.default
        items={[
          {
            label: "함께 만든 것",
            children: [
              { value: "ara", label: "ara" },
              { value: "ttililing", label: "띠리링" },
            ],
          },
          {
            label: "학교에서 만든 것",
            children: [
              { value: "dipull", label: "Dipull" },
              { value: "dimigogo", label: "디미고고" },
            ],
          },
        ]}
        defaultOpen={[0]}
        onSelect={(value: string) => go(`/work/${value}`)}
        color={paper}
        accentColor={paper}
        lineColor="#3f3f46"
        width={230}
      />
    ),
  },
  {
    name: "DodgeField",
    label: "도망가는 단추",
    hint: "잡으려고 하면 피해요. 몇 번 하면 봐줘요.",
    fit: "fill",
    height: 260,
    span: 2,
    render: (bit) => (
      <bit.default
        inkColor={paper}
        contrastColor="#18181b"
        fieldHeight={240}
        patience={4}
        taunts={["여기예요", "아깝네요", "조금만 더", "거의 다 왔어요"]}
        notice="알겠어요, 눌러도 돼요"
      />
    ),
  },
  {
    name: "Shredder",
    label: "문서 파쇄기",
    hint: "종이를 끌어다 위쪽 틈에 넣어요.",
    height: 460,
    span: 2,
    render: (bit) => <Shred Bit={bit.default} />,
  },
  {
    name: "Stepper",
    label: "단계 안내",
    hint: "다음을 눌러 끝까지 가 보세요.",
    height: 360,
    span: 2,
    render: (bit) => {
      const Step = bit.Step;
      return (
        <bit.default
          initialStep={1}
          backButtonText="이전"
          nextButtonText="다음"
          completeButtonText="마치기"
          completedContent={<p className="desk-step-copy">예약을 마쳤어요.</p>}
          theme="dark"
          accentColor={cobalt}
        >
          <Step title="기기">
            <p className="desk-step-copy">세탁기를 골라요.</p>
          </Step>
          <Step title="시간">
            <p className="desk-step-copy">비어 있는 시간을 골라요.</p>
          </Step>
          <Step title="확인">
            <p className="desk-step-copy">고른 내용을 확인해요.</p>
          </Step>
        </bit.default>
      );
    },
  },
  {
    name: "SpecularButton",
    label: "빛나는 테두리 단추",
    render: (bit) => (
      <bit.default
        size="lg"
        radius={18}
        followMouse
        proximity={220}
        onClick={() => window.location.assign("mailto:me@jeamxn.dev")}
      >
        메일 보내기
      </bit.default>
    ),
  },
  {
    name: "StarBorder",
    label: "별이 도는 테두리",
    auto: true,
    render: (bit) => (
      <bit.default
        onClick={() => go("/work")}
        color={ice}
        trailColor={paper}
        duration={4}
        hover="lap"
        clickPulse
        theme="dark"
      >
        작업 기록 보기
      </bit.default>
    ),
  },
  {
    name: "Magnet",
    label: "자석",
    hint: "가까이 가면 끌려와요. 이 사이트의 둥근 화살표에도 붙어 있어요.",
    render: (bit) => (
      <bit.default padding={70} magnetStrength={3} maxOffset={18}>
        <button type="button" className="desk-button desk-button--solid">
          끌려오는 단추
        </button>
      </bit.default>
    ),
  },
  {
    name: "ElectricBorder",
    label: "전기 테두리",
    auto: true,
    height: 280,
    render: (bit) => (
      <bit.default color={ice} speed={1} chaos={0.5} thickness={1.5} borderRadius={20}>
        <div className="desk-card desk-card--bare">
          {note("ara", "AI와 함께 문서와 발표 자료를 만드는 작업공간이에요.")}
        </div>
      </bit.default>
    ),
  },
  {
    name: "BorderGlow",
    label: "가장자리 빛",
    hint: "가장자리에 가까이 가면 빛나요.",
    height: 280,
    render: (bit) => (
      <bit.default
        backgroundColor="#1d2027"
        borderRadius={20}
        glowRadius={40}
        colors={[cobalt, ice, paper]}
      >
        <div className="desk-card desk-card--bare">
          {note("Dipull", "기상송 신청과 세탁 예약을 한곳에서 해요.")}
        </div>
      </bit.default>
    ),
  },
  {
    name: "SpotlightCard",
    label: "손전등 카드",
    hint: "포인터가 있는 곳만 밝아져요.",
    height: 280,
    render: (bit) => (
      <bit.default theme="dark" spotlightColor={ice} intensity={0.2} spotlightSize={220} flare>
        {note("PFCT", "흩어진 운영 화면을 하나의 어드민으로 모았어요.")}
      </bit.default>
    ),
  },
  {
    name: "PixelCard",
    label: "픽셀 카드",
    hint: "올리면 픽셀이 차올라요.",
    height: 300,
    render: (bit) => (
      <bit.default colors={[paper, ice, cobalt]} glowColor={ice} gap={6} speed={35} theme="dark">
        <p className="desk-pixel-mark">*</p>
      </bit.default>
    ),
  },
  {
    name: "MagicBento",
    label: "도시락 격자",
    hint: "포인터가 지나는 칸의 테두리가 빛나요.",
    fit: "fill",
    height: 360,
    span: 3,
    render: (bit, stage) => (
      <div className="desk-pad">
        <bit.default
          items={[
            {
              label: "ara",
              title: "편집 가능한 캔버스",
              description: "AI가 만든 문서를 같은 곳에서 고쳐요.",
              colSpan: 2,
            },
            { label: "Dipull", title: "기상송 신청", description: "아침 노래를 함께 골라요." },
            { label: "Dipull", title: "세탁 예약", description: "빈 시간을 바로 확인해요." },
            {
              label: "PFCT",
              title: "통합 어드민",
              description: "흩어진 화면을 하나로 모았어요.",
            },
            {
              label: "KT SAT",
              title: "AX 기초 강연",
              description: "임직원에게 AI 활용을 발표했어요.",
            },
          ]}
          columns={stage.width < 620 ? 2 : 3}
          rowHeight={150}
          gap={10}
          radius={18}
          theme="dark"
          glowColor="36, 89, 211"
          enableBorderGlow
          enableSpotlight
          clickEffect
        />
      </div>
    ),
  },
  {
    name: "AnimatedContent",
    label: "차례로 올라오기",
    render: (bit) => (
      <Replay>
        <bit.default distance={60} duration={0.8} stagger={0.1} trigger="mount">
          <p className="desk-card-name">점심 전에 내보내요</p>
          <p>줄마다 차례로 올라와요.</p>
        </bit.default>
      </Replay>
    ),
  },
  {
    name: "FadeContent",
    label: "안개처럼 나타나기",
    render: (bit) => (
      <Replay>
        <bit.default effect="mist" duration={1.6} stagger={0.12} trigger="mount">
          <p className="desk-card-name">천천히 밝아져요</p>
          <p>줄마다 차례로 떠올라요.</p>
        </bit.default>
      </Replay>
    ),
  },
  {
    name: "GradualBlur",
    label: "흐려지는 끝",
    hint: "글을 스크롤하면 아래쪽이 흐려져요.",
    fit: "fill",
    height: 260,
    render: (bit) => <BlurEdge Bit={bit.default} />,
  },
  {
    name: "Noise",
    label: "필름 입자",
    hint: "사이트 전체에도 아주 옅게 깔려 있어요.",
    fit: "fill",
    height: 260,
    auto: true,
    render: (bit) => (
      <div className="desk-noise">
        <img src={portrait} alt="" />
        <bit.default
          opacity={0.35}
          size={1}
          fps={24}
          blendMode="overlay"
          dust={0.3}
          scratches={0.3}
        />
      </div>
    ),
  },
];
