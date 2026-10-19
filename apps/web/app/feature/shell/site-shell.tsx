import { Icon } from "@jeamxn/icon";
import { Modal } from "@jeamxn/ui";
import { type ReactNode, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";

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
  // The scroll story overlays its full-screen stage under the header.
  const overlay = pathname === "/story" || pathname === "/story/";
  return (
    <>
      <a className="skip-link" href="#main">
        본문으로 건너뛰기
      </a>
      <header
        className={`site-header container${home ? " site-header--home" : ""}${overlay ? " site-header--home site-header--story" : ""}`}
      >
        <Link to="/" className="brand" translate="no" aria-label="최재민 홈">
          jeamxn<span aria-hidden="true">*</span>
        </Link>
        <nav className="desktop-nav" aria-label="주 메뉴">
          <NavLink to="/resume">이력</NavLink>
          <NavLink to="/work">작업 기록</NavLink>
        </nav>
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
        <div className="container">
          <div className="footer-heading">
            <h2>
              함께 만들고 싶은
              <br />
              제품이 있나요?
            </h2>
            <a className="footer-orbit" href={`mailto:${email}`} aria-label="이메일로 연락하기">
              <Icon name="arrow-up-right" size={44} />
            </a>
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
