import { Icon } from "@jeamxn/icon";
import { Modal } from "@jeamxn/ui";
import { type ReactNode, useState } from "react";
import { Link, NavLink } from "react-router";

export function SiteShell({
  children,
  email,
  github,
  nameEn,
  onAsk,
}: {
  children: ReactNode;
  email: string;
  github: string;
  nameEn: string;
  onAsk: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <a className="skip-link" href="#main">
        본문으로 건너뛰기
      </a>
      <header className="site-header container">
        <Link to="/" className="brand" translate="no" aria-label="최재민 홈">
          jeamxn<span aria-hidden="true">*</span>
        </Link>
        <nav className="desktop-nav" aria-label="주 메뉴">
          <NavLink to="/#work">만든 제품</NavLink>
          <NavLink to="/about">소개</NavLink>
          <NavLink to="/resume">이력</NavLink>
        </nav>
        <button type="button" onClick={onAsk} className="header-ask">
          <Icon name="chat" size={19} />
          <span>질문하기</span>
        </button>
        <button
          type="button"
          className="mobile-menu-button icon-button"
          onClick={() => setMenuOpen(true)}
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
              함께 만들
              <br />
              이야기가 있나요?
            </h2>
            <a className="footer-orbit" href={`mailto:${email}`} aria-label="이메일로 연락하기">
              <Icon name="arrow-up-right" size={44} />
            </a>
          </div>
          <a className="footer-email" href={`mailto:${email}`}>
            {email}
          </a>
          <div className="footer-bottom">
            <span>좋은 아이디어와 새로운 만남을 기다립니다.</span>
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
      <button type="button" className="assistant-trigger" onClick={onAsk}>
        <Icon name="chat" size={21} />
        <span>재민에 대해 물어보기</span>
        <Icon name="plus" size={17} />
      </button>
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
          <Link to="/#work" onClick={() => setMenuOpen(false)}>
            만든 제품
            <Icon name="arrow-up-right" />
          </Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>
            소개
            <Icon name="arrow-up-right" />
          </Link>
          <Link to="/resume" onClick={() => setMenuOpen(false)}>
            이력
            <Icon name="arrow-up-right" />
          </Link>
          <a href={`mailto:${email}`} onClick={() => setMenuOpen(false)}>
            연락하기
            <Icon name="arrow-up-right" />
          </a>
        </nav>
        <p>아이디어를 제품으로 만드는 최재민입니다.</p>
      </Modal>
    </>
  );
}
