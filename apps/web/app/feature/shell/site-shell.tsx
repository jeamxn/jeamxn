import { Icon } from "@jeamxn/icon";
import { Modal } from "@jeamxn/ui";
import { type ComponentProps, type CSSProperties, type ReactNode, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import Magnet from "~/shared/reactbits/Magnet";
import PillNav from "~/shared/reactbits/PillNav";
import Threads from "~/shared/reactbits/Threads";
import VariableProximity from "~/shared/reactbits/VariableProximity";

const navItems = [
  { label: "이력", href: "/resume" },
  { label: "작업 기록", href: "/work" },
];

/* PillNav hands every item an href; internal ones stay client-side navigations. */
function NavAnchor({ href = "/", ...props }: ComponentProps<"a">) {
  if (!href.startsWith("/")) return <a href={href} {...props} />;
  return <Link to={href} {...props} />;
}

const footerLines = ["함께 만들고 싶은", "제품이 있나요?"];

export function SiteShell({
  children,
  email,
  github,
  nameEn,
}: {
  children: ReactNode;
  email: string;
  github: string;
  nameEn: string;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const home = pathname === "/";
  const footerHeading = useRef<HTMLHeadingElement>(null);
  const active = navItems.find(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
  );
  return (
    <>
      <a className="skip-link" href="#main">
        본문으로 건너뛰기
      </a>
      <header className={`site-header container${home ? " site-header--home" : ""}`}>
        <Magnet padding={36} magnetStrength={5} maxOffset={6} wrapperClassName="brand-magnet">
          <Link to="/" className="brand" translate="no" aria-label="최재민 홈">
            jeamxn<span aria-hidden="true">*</span>
          </Link>
        </Magnet>
        <div className="desktop-nav">
          <PillNav
            items={navItems}
            activeHref={active?.href ?? ""}
            linkComponent={NavAnchor}
            theme="light"
            barColor="rgba(255, 255, 255, 0.62)"
            highlightColor="#161616"
            highlightTextColor="#ffffff"
            textColor="#161616"
            style={{ "--pn-dot": "#2459d3" } as CSSProperties}
            layout="joined"
            size="md"
            surface="glass"
            itemStyle="plain"
            hoverEffect="glide"
            indicator="dot"
            collapse="never"
            intro={false}
            ariaLabel="주 메뉴"
            className="site-pill-nav"
          />
          <Magnet padding={28} magnetStrength={4} maxOffset={8} wrapperClassName="nav-contact">
            <a className="nav-contact-link" href={`mailto:${email}`}>
              연락하기
              <Icon name="arrow-up-right" size={16} />
            </a>
          </Magnet>
        </div>
        <button
          type="button"
          className="mobile-menu-button icon-button"
          onClick={(event) => {
            event.currentTarget.focus({ preventScroll: true });
            setMenuOpen(true);
          }}
          aria-label="메뉴 열기"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <Icon name="menu" />
        </button>
      </header>
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <footer className="site-footer" id="contact">
        <div className="footer-threads" aria-hidden="true">
          <Threads
            color="#8fa6e8"
            accentColor="#2459d3"
            amplitude={1.1}
            distance={0.25}
            lineCount={44}
            thickness={0.5}
            speed={0.35}
            brightness={1.05}
            fade={0.35}
            opacity={0.55}
            enableMouseInteraction
            parting={0.6}
          />
        </div>
        <div className="container footer-inner">
          <div className="footer-heading">
            <h2 ref={footerHeading} aria-label={footerLines.join(" ")}>
              {footerLines.map((line) => (
                <span className="footer-heading-line" key={line} aria-hidden="true">
                  <VariableProximity
                    label={line}
                    containerRef={footerHeading}
                    fromFontVariationSettings="'wght' 420, 'wdth' 100"
                    toFontVariationSettings="'wght' 880, 'wdth' 112"
                    radius={150}
                    falloff="gaussian"
                    style={{ fontFamily: "inherit" }}
                  />
                </span>
              ))}
            </h2>
            <Magnet padding={70} magnetStrength={3} maxOffset={22} wrapperClassName="footer-magnet">
              <a className="footer-orbit" href={`mailto:${email}`} aria-label="이메일로 연락하기">
                <span>메일 보내기</span>
                <Icon name="arrow-up-right" size={28} />
              </a>
            </Magnet>
          </div>
          <a className="footer-email" href={`mailto:${email}`}>
            {email}
          </a>
          <div className="footer-bottom">
            <span>협업이나 채용에 관한 이야기는 이메일로 보내주세요.</span>
            <div>
              <a href={github} target="_blank" rel="noreferrer">
                GitHub
                <Icon name="arrow-up-right" size={16} />
                <span className="sr-only">(새 탭)</span>
              </a>
              <Link to="/resume">
                이력 보기
                <Icon name="arrow-up-right" size={16} />
              </Link>
              <span>© 2026 {nameEn}</span>
            </div>
          </div>
        </div>
      </footer>
      <Modal
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        titleId="menu-title"
        className="menu-modal"
      >
        <div className="menu-header">
          <h2 id="menu-title">둘러보기</h2>
          <button
            type="button"
            className="icon-button"
            data-modal-focus
            aria-label="메뉴 닫기"
            onClick={() => setMenuOpen(false)}
          >
            <Icon name="close" />
          </button>
        </div>
        <nav id="mobile-menu" aria-label="모바일 주 메뉴">
          <Link to="/resume" onClick={() => setMenuOpen(false)}>
            이력
            <Icon name="arrow-up-right" />
          </Link>
          <Link to="/work" onClick={() => setMenuOpen(false)}>
            작업 기록
            <Icon name="arrow-up-right" />
          </Link>
          <a href={`mailto:${email}`} onClick={() => setMenuOpen(false)}>
            연락하기
            <Icon name="arrow-up-right" />
          </a>
        </nav>
        <p>이력과 작업 기록을 살펴보거나 이메일로 연락할 수 있어요.</p>
      </Modal>
    </>
  );
}
