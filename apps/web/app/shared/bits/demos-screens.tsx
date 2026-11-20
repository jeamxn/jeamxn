import { type ComponentProps, type CSSProperties, useState } from "react";
import { Link } from "react-router";
import type { BitComponent } from "~/shared/lib/bits";
import { sitePath } from "~/shared/lib/site-path";
import { cobalt, type Demo, ice, ink, markWhite, paper, shots, tallShots, wideShots } from "./demo";

const urls = wideShots.map((shot) => shot.src);
const cover = { width: "100%", height: "100%", objectFit: "cover" } as const;
const fit = (wanted: number, stage: number, pad = 40) =>
  Math.max(200, Math.min(wanted, stage - pad));

/* The stack of screens: the same product captures, laid out by every gallery. */
export const screenDemos: Demo[] = [
  {
    name: "CircularGallery",
    label: "휘어진 띠",
    hint: "옆으로 끌거나 휠을 굴려 보세요.",
    fit: "fill",
    render: (bit) => (
      <bit.default
        items={wideShots.map((shot) => ({ image: shot.src, text: shot.title, alt: shot.alt }))}
        bend={3}
        textColor={paper}
        borderRadius={0.05}
        font='600 26px "Interlude Variable"'
        itemAspect={1.6}
      />
    ),
  },
  {
    name: "Carousel",
    label: "넘기는 카드",
    hint: "옆으로 밀거나 화살표를 눌러요.",
    render: (bit, stage) => (
      <bit.default
        items={wideShots.map((shot) => ({
          id: shot.src,
          title: shot.title,
          description: `${shot.product}의 화면이에요.`,
          image: shot.src,
          alt: shot.alt,
        }))}
        baseWidth={fit(460, stage.width)}
        aspectRatio={1.3}
        effect="tilt"
        indicator="dots"
        arrows
        loop
        theme="dark"
      />
    ),
  },
  {
    name: "CardSwap",
    label: "돌아가는 카드 더미",
    hint: "맨 앞 카드를 끌어 뒤로 보내 보세요.",
    fit: "fill",
    render: (bit, stage) => (
      <bit.default
        items={wideShots.slice(0, 5).map((shot) => ({
          title: shot.title,
          image: shot.src,
          alt: shot.alt,
        }))}
        width={fit(440, stage.width, 120)}
        height={fit(440, stage.width, 120) * 0.66}
        delay={3500}
        pauseOnHover
        theme="dark"
      />
    ),
  },
  {
    name: "Stack",
    label: "사진 더미",
    hint: "맨 위 장을 던지면 맨 뒤로 가요.",
    render: (bit, stage) => (
      <div style={{ width: fit(420, stage.width, 80), aspectRatio: "1.6" }}>
        <bit.default
          layout="fan"
          sendToBackOnClick
          cards={wideShots
            .slice(0, 5)
            .map((shot) => <img key={shot.src} src={shot.src} alt={shot.alt} style={cover} />)}
        />
      </div>
    ),
  },
  {
    name: "BounceCards",
    label: "튀어나오는 카드",
    hint: "한 장에 올리면 옆 장들이 비켜요.",
    render: (bit, stage) => {
      const width = fit(560, stage.width, 24);
      return (
        <bit.default
          images={tallShots.slice(0, 5).map((shot) => shot.src)}
          containerWidth={width}
          containerHeight={340}
          cardSize={Math.round(width * 0.32)}
          spread={Math.round(width * 0.15)}
          rotation={8}
          borderWidth={4}
          borderColor="#ffffff"
          radius={18}
          enableHover
        />
      );
    },
  },
  {
    name: "AccordionGallery",
    label: "펼쳐지는 띠",
    hint: "포인터를 올린 칸이 넓어져요.",
    fit: "fill",
    render: (bit) => (
      <div className="desk-pad">
        <bit.default
          items={wideShots.slice(0, 5).map((shot) => ({
            image: shot.src,
            label: shot.title,
            alt: shot.alt,
          }))}
          defaultIndex={1}
          expandRatio={0.52}
          trigger="hover"
          height={380}
          accentColor={ice}
        />
      </div>
    ),
  },
  {
    name: "ChromaGrid",
    label: "색이 돌아오는 격자",
    hint: "포인터 근처만 원래 색으로 보여요.",
    fit: "fill",
    render: (bit, stage) => (
      <div className="desk-pad">
        <bit.default
          items={wideShots.slice(0, 6).map((shot, index) => ({
            image: shot.src,
            title: shot.title,
            subtitle: shot.product,
            alt: shot.alt,
            accent: index % 2 ? ice : cobalt,
          }))}
          columns={stage.width < 560 ? 2 : 3}
          radius={240}
          aspectRatio="16 / 10"
          theme="dark"
        />
      </div>
    ),
  },
  {
    name: "Masonry",
    label: "벽돌 쌓기",
    hint: "눌러서 크게 보고, 끌어서 자리를 바꿔요.",
    fit: "fill",
    render: (bit, stage) => (
      <div className="desk-pad desk-scroll">
        <bit.default
          items={shots.map((shot) => ({
            id: shot.src,
            img: shot.src,
            width: shot.width,
            height: shot.height,
            title: shot.title,
            alt: shot.alt,
          }))}
          columnWidth={stage.width < 560 ? 150 : 220}
          gap={10}
          radius={10}
          animateFrom="bottom"
          hoverEffect="zoom"
          captions="hover"
          lightbox
          draggable
        />
      </div>
    ),
  },
  {
    name: "DomeGallery",
    label: "돔",
    hint: "돔을 잡고 돌리다가 한 장을 눌러 보세요.",
    fit: "fill",
    render: (bit) => (
      <bit.default
        images={shots.map((shot) => ({ src: shot.src, alt: shot.alt }))}
        grayscale={false}
        overlayBlurColor={ink}
        imageBorderRadius="12px"
        openedImageBorderRadius="14px"
      />
    ),
  },
  {
    name: "CircularCarousel",
    label: "원통",
    hint: "옆으로 끌면 원통이 돌아요.",
    fit: "fill",
    render: (bit, stage) => (
      <bit.default
        items={wideShots.map((shot) => ({
          src: shot.src,
          alt: shot.alt,
          title: shot.title,
          subtitle: shot.product,
        }))}
        preset="cylinder"
        intro="rise"
        cardWidth={stage.width < 560 ? 200 : 300}
        aspectRatio={1.6}
        speed={14}
        fadeColor={ink}
        captions
      />
    ),
  },
  {
    name: "DepthCarousel",
    label: "깊이 있는 카드",
    hint: "화살표로 넘기면 뒤 카드가 앞으로 나와요.",
    fit: "fill",
    render: (bit, stage) => (
      <bit.default
        items={wideShots.map((shot) => ({ image: shot.src, alt: shot.alt }))}
        cardWidth={fit(440, stage.width, 100)}
        cardHeight={fit(440, stage.width, 100) * 0.625}
        depth={220}
        spread={90}
        tilt={22}
        visibleCards={4}
        autoplay
        loop
      />
    ),
  },
  {
    name: "FlexCarousel",
    label: "휘는 필름",
    hint: "끌면 필름처럼 휘면서 넘어가요.",
    fit: "fill",
    render: (bit) => (
      <bit.default
        items={wideShots.map((shot) => ({ src: shot.src, alt: shot.alt, title: shot.title }))}
        preset="liquid"
        intro="rise"
        cardHeight={0.5}
        gap={12}
        squeeze={0.2}
        focusOnClick
        captions
      />
    ),
  },
  {
    name: "MorphSlider",
    label: "녹아드는 전환",
    hint: "다음 장으로 넘기면 화면이 녹으면서 바뀌어요.",
    fit: "fill",
    render: (bit) => (
      <bit.default
        items={wideShots.slice(0, 5).map((shot) => ({ image: shot.src, caption: shot.title }))}
        transition="melt"
        intensity={0.55}
        aberration={0.35}
        autoplay
        overlayColor={ink}
      />
    ),
  },
  {
    name: "FlyingPosters",
    label: "휘날리는 포스터",
    hint: "이 칸 안에서 휠을 굴리거나 끌어 보세요.",
    fit: "fill",
    render: (bit) => (
      <bit.default
        items={urls}
        planeWidth={420}
        planeHeight={262}
        distortion={3}
        scrollEase={0.02}
      />
    ),
  },
  {
    name: "InfiniteMenu",
    label: "끝없는 구",
    hint: "구를 잡고 굴리면 가운데 화면의 이름이 나와요.",
    fit: "fill",
    render: (bit) => (
      <bit.default
        items={wideShots.map((shot) => ({
          image: shot.src,
          title: shot.title,
          description: `${shot.product}의 화면이에요.`,
        }))}
        grayscale={false}
        dim={0.4}
        showInfo
        theme="dark"
        accentColor={cobalt}
        backgroundColor={ink}
      />
    ),
  },
  {
    name: "InfiniteSpiral",
    label: "나선 계단",
    hint: "끌거나 휠을 굴리면 나선이 돌아요.",
    fit: "fill",
    render: (bit) => (
      <bit.default
        items={shots.map((shot) => ({ src: shot.src, alt: shot.alt }))}
        animationMode="all"
        speed={0.5}
        radius={170}
        cardWidth={130}
        cardHeight={90}
        verticalSpacing={56}
        cardsPerTurn={7}
        pauseOnHover
      />
    ),
  },
  {
    name: "DriftWall",
    label: "흐르는 벽",
    hint: "올려 둔 화면이 앞으로 나와요.",
    fit: "fill",
    render: (bit) => (
      <bit.default
        items={[...wideShots, ...wideShots].map((shot) => ({
          image: shot.src,
          title: shot.title,
        }))}
        columns={5}
        tileWidth={200}
        tileHeight={125}
        gap={16}
        speed={36}
        overlayColor={ink}
      />
    ),
  },
  {
    name: "GridMotion",
    label: "엇갈리는 줄",
    hint: "포인터를 좌우로 움직이면 줄마다 다르게 밀려요.",
    fit: "fill",
    render: (bit) => (
      <bit.default
        items={[...urls, "ara", ...urls, "Dipull"]}
        rows={4}
        aspectRatio={1.6}
        gap={14}
        radius={12}
        angle={-12}
        speed={22}
        tileColor="#22262e"
        textColor={paper}
        theme="dark"
      />
    ),
  },
  {
    name: "OrbitImages",
    label: "궤도",
    hint: "가운데 이름 둘레를 화면들이 돌아요.",
    fit: "fill",
    render: (bit, stage) => (
      <bit.default
        images={urls.slice(0, 6)}
        altPrefix="제품 화면"
        shape="ellipse"
        radiusX={Math.min(340, stage.width * 0.38)}
        radiusY={90}
        rotation={-8}
        duration={30}
        itemSize={stage.width < 560 ? 84 : 120}
        depth={0.6}
        showPath
        pathColor="#3a4258"
        centerContent={<p className="desk-orbit-center">ara</p>}
      />
    ),
  },
  {
    name: "ScrollStack",
    label: "쌓이는 카드",
    hint: "이 칸 안에서 스크롤하면 카드가 차곡차곡 쌓여요.",
    fit: "fill",
    render: (bit) => {
      const Item = bit.ScrollStackItem;
      return (
        <bit.default itemDistance={60} itemStackDistance={24} className="desk-scroll-stack">
          {wideShots.slice(0, 4).map((shot) => (
            <Item key={shot.src} itemClassName="desk-scroll-stack-item">
              <img src={shot.src} alt={shot.alt} />
              <p>
                {shot.product} / {shot.title}
              </p>
            </Item>
          ))}
        </bit.default>
      );
    },
  },
  {
    name: "Folder",
    label: "서류철",
    hint: "폴더를 열고 종이를 꺼내 보세요.",
    render: (bit) => (
      <bit.default
        label="ara"
        color={cobalt}
        items={wideShots.slice(0, 3).map((shot) => ({
          image: shot.src,
          title: shot.title,
          alt: shot.alt,
        }))}
        size={1.4}
        theme="dark"
      />
    ),
  },
];

const menu = [
  { label: "첫 화면", href: "/" },
  { label: "이력", href: "/resume" },
  { label: "작업 기록", href: "/work" },
  { label: "ara", href: "/work/ara" },
];
const wheelNames = ["ara", "Dipull", "PFCT", "KT SAT", "MultiNet", "띠리링"];

/* Vendored menus hand over plain hrefs; keep them client-side navigations. */
function MenuLink({ href = "/", ...props }: ComponentProps<"a">) {
  if (!href.startsWith("/")) return <a href={href} {...props} />;
  return <Link to={href} {...props} />;
}

const go = (path: string) => window.location.assign(sitePath(path));

function Glyph({ children }: { children: string }) {
  return (
    <span className="desk-glyph" aria-hidden="true">
      {children}
    </span>
  );
}

function Wheel({ Bit }: { Bit: BitComponent }) {
  const [picked, setPicked] = useState(wheelNames[1]);
  return (
    <div className="desk-wheel">
      <Bit
        items={wheelNames}
        defaultSelected={1}
        textColor="#8b8f99"
        activeColor={paper}
        side="left"
        fontSize={2.6}
        spacing={1.4}
        draggable
        onChange={(_: number, item: string) => setPicked(item)}
      />
      <p aria-live="polite">지금 고른 것: {picked}</p>
    </div>
  );
}

/* The menu board: navigation patterns, wired to this site's real pages. */
export const navDemos: Demo[] = [
  {
    name: "Dock",
    label: "독",
    hint: "아이콘 위를 지나가면 커져요.",
    fit: "fill",
    render: (bit) => (
      <bit.default
        items={[
          { icon: <Glyph>*</Glyph>, label: "첫 화면", onClick: () => go("/") },
          { icon: <Glyph>이</Glyph>, label: "이력", onClick: () => go("/resume") },
          { icon: <Glyph>작</Glyph>, label: "작업 기록", badge: 86, onClick: () => go("/work") },
          { separator: true },
          { icon: <Glyph>a</Glyph>, label: "ara", onClick: () => go("/work/ara") },
          { icon: <Glyph>D</Glyph>, label: "Dipull", onClick: () => go("/work/dipull") },
        ]}
        baseItemSize={50}
        magnification={72}
        panelHeight={68}
        accentColor={cobalt}
        theme="dark"
      />
    ),
  },
  {
    name: "GooeyNav",
    label: "끈적이는 탭",
    hint: "탭을 바꾸면 방울이 튀어요.",
    render: (bit) => (
      <bit.default
        items={menu.map((item) => ({ label: item.label, href: sitePath(item.href) }))}
        initialActiveIndex={-1}
        theme="dark"
        size="md"
        frame
        particleCount={15}
        colors={[cobalt, ice, paper]}
      />
    ),
  },
  {
    name: "PillNav",
    label: "알약 메뉴",
    hint: "이 사이트 맨 위 메뉴가 이 컴포넌트예요.",
    render: (bit) => (
      <bit.default
        items={menu}
        activeHref=""
        linkComponent={MenuLink}
        theme="dark"
        itemStyle="plain"
        hoverEffect="glide"
        indicator="dot"
        collapse="never"
        intro={false}
        ariaLabel="알약 메뉴"
        style={{ "--pn-dot": ice } as CSSProperties}
      />
    ),
  },
  {
    name: "CardNav",
    label: "카드 메뉴",
    hint: "메뉴를 열면 카드 세 장이 펼쳐져요.",
    fit: "fill",
    render: (bit) => (
      <div className="desk-pad">
        <bit.default
          logo={<span className="desk-nav-logo">jeamxn*</span>}
          logoHref="/"
          items={[
            {
              label: "이력",
              description: "경력과 활동을 한곳에 모았어요.",
              bgColor: "#22262e",
              textColor: paper,
              links: [{ label: "이력 보기", href: "/resume" }],
            },
            {
              label: "작업 기록",
              description: "학교와 회사에서 만든 것들이에요.",
              bgColor: cobalt,
              textColor: "#ffffff",
              links: [
                { label: "ara", href: "/work/ara" },
                { label: "Dipull", href: "/work/dipull" },
              ],
            },
            {
              label: "활동",
              description: "KT SAT에서 한 강연 이야기예요.",
              bgColor: "#2c3140",
              textColor: paper,
              links: [{ label: "KT SAT 강연", href: "/activity/kt-sat-ax" }],
            },
          ]}
          cta={{ label: "메일 보내기", href: "mailto:me@jeamxn.dev" }}
          linkComponent={MenuLink}
          cardEffect="rise"
          openOn="click"
          theme="dark"
          accentColor={cobalt}
          ariaLabel="카드 메뉴"
        />
      </div>
    ),
  },
  {
    name: "BubbleMenu",
    label: "비눗방울 메뉴",
    hint: "오른쪽 위 단추를 누르면 알약들이 떠올라요.",
    fit: "fill",
    render: (bit) => (
      <bit.default
        logo={<span className="desk-nav-logo desk-nav-logo--ink">jeamxn*</span>}
        items={menu.map((item, index) => ({
          label: item.label,
          href: sitePath(item.href),
          ariaLabel: item.label,
          rotation: index % 2 ? 8 : -8,
          hoverStyles: { bgColor: index % 2 ? ice : cobalt, textColor: "#ffffff" },
        }))}
        menuAriaLabel="비눗방울 메뉴 여닫기"
        menuBg="#ffffff"
        menuContentColor={ink}
        useFixedPosition={false}
        animationEase="back.out(1.5)"
        animationDuration={0.5}
        staggerDelay={0.12}
      />
    ),
  },
  {
    name: "FlowingMenu",
    label: "흐르는 메뉴",
    hint: "줄 위에 올리면 띠가 흘러들어와요.",
    fit: "fill",
    render: (bit) => (
      <bit.default
        items={[
          { text: "ara", link: sitePath("/work/ara"), image: wideShots[1].src, meta: "2026" },
          { text: "Dipull", link: sitePath("/work/dipull"), image: wideShots[6].src, meta: "2022" },
          { text: "PFCT", link: sitePath("/work/pfct"), image: wideShots[2].src, meta: "2024" },
          {
            text: "KT SAT",
            link: sitePath("/activity/kt-sat-ax"),
            image: wideShots[3].src,
            meta: "2026",
          },
        ]}
        speed={60}
        textColor={paper}
        bgColor={ink}
        marqueeBgColor={paper}
        marqueeTextColor={ink}
        borderColor="#3a4258"
        ariaLabel="흐르는 메뉴"
      />
    ),
  },
  {
    name: "StaggeredMenu",
    label: "계단 메뉴",
    hint: "오른쪽 위 Menu를 누르면 면이 차례로 덮여요.",
    fit: "fill",
    render: (bit) => (
      <div className="desk-field-wrap">
        <div className="desk-field">
          <p className="desk-field-copy">오른쪽 위 Menu를 눌러 보세요.</p>
        </div>
        <bit.default
          position="right"
          isFixed={false}
          items={menu.map((item) => ({
            label: item.label,
            ariaLabel: item.label,
            link: sitePath(item.href),
          }))}
          socialItems={[{ label: "GitHub", link: "https://github.com/jeamxn" }]}
          displaySocials
          displayItemNumbering
          logoUrl={markWhite}
          menuButtonColor="#ffffff"
          openMenuButtonColor={ink}
          changeMenuColorOnOpen
          colors={[ice, cobalt]}
          accentColor={cobalt}
        />
      </div>
    ),
  },
  {
    name: "LineSidebar",
    label: "눈금 목차",
    hint: "포인터 가까운 항목이 옆으로 밀려 나와요.",
    render: (bit) => (
      <bit.default
        items={["활자 상자", "마우스", "사진 한 장", "화면 묶음", "부품 서랍", "바탕화면"]}
        accentColor={ice}
        textColor="#c4c8d0"
        markerColor="#5a6070"
        showIndex
        showMarker
        fontSize={1.05}
        defaultActive={0}
      />
    ),
  },
  {
    name: "OptionWheel",
    label: "돌림판",
    hint: "위아래로 끌거나 휠을 굴려 골라요.",
    fit: "fill",
    render: (bit) => <Wheel Bit={bit.default} />,
  },
];
