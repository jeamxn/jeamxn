import { portfolio } from "@jeamxn/core";
import { colors } from "@jeamxn/token";
import { type ReactNode, useState } from "react";
import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { AssistantPanel } from "~/feature/assistant/assistant-panel";
import { SiteShell } from "~/feature/shell/site-shell";
import type { Route } from "./+types/root";
import "wanted-sans/fonts/webfonts/variable/split/WantedSansVariable.css";
import "@fontsource/geist/latin-400.css";
import "@fontsource/geist/latin-500.css";
import geistFontUrl from "@fontsource/geist/files/geist-latin-400-normal.woff2?url";
import "./app.css";

export function links() {
  return [
    {
      rel: "preload",
      as: "font",
      type: "font/woff2",
      href: geistFontUrl,
      crossOrigin: "anonymous",
    },
  ];
}

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content={colors.fog} />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
export default function App() {
  const [assistantOpen, setAssistantOpen] = useState(false);
  return (
    <>
      <SiteShell
        email={portfolio.profile.email}
        github={portfolio.profile.github}
        nameEn={portfolio.profile.nameEn}
        onAsk={() => setAssistantOpen(true)}
      >
        <Outlet context={{ onAsk: () => setAssistantOpen(true) }} />
      </SiteShell>
      <AssistantPanel
        open={assistantOpen}
        onClose={() => setAssistantOpen(false)}
        data={portfolio}
      />
    </>
  );
}
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const notFound = isRouteErrorResponse(error) && error.status === 404;
  return (
    <div className="container missing-page">
      <h1>{notFound ? "이 페이지는 찾지 못했습니다." : "페이지를 불러오지 못했습니다."}</h1>
      <p>
        {notFound
          ? "주소를 확인하거나 첫 화면에서 다시 살펴보세요."
          : "새로고침하거나 잠시 뒤 다시 방문해 주세요."}
      </p>
      <Link className="button button--solid" to="/">
        첫 화면으로
      </Link>
    </div>
  );
}
