import { portfolio } from "@jeamxn/core";
import type { ReactNode } from "react";
import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { SiteShell } from "~/feature/shell/site-shell";
import { sitePath } from "~/shared/lib/site-path";
import type { Route } from "./+types/root";
import "./app.css";

export function links() {
  return [
    { rel: "stylesheet", href: sitePath("/fonts/interlude/fonts.css") },
    { rel: "stylesheet", href: sitePath("/fonts/noto-serif-kr/fonts.css") },
    {
      rel: "preload",
      as: "font",
      type: "font/woff2",
      href: sitePath("/fonts/interlude/InterludeVariable.subset.base.15o-z1u4_~ysk.woff2"),
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
        <meta name="theme-color" content="#f7f7f7" />
        <link rel="icon" href={sitePath("/favicon.svg")} type="image/svg+xml" />
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
  return (
    <SiteShell
      email={portfolio.profile.email}
      github={portfolio.profile.github}
      nameEn={portfolio.profile.nameEn}
    >
      <Outlet />
    </SiteShell>
  );
}
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const notFound = isRouteErrorResponse(error) && error.status === 404;
  return (
    <div className="container missing-page">
      <h1>{notFound ? "페이지를 찾지 못했어요." : "페이지를 불러오지 못했어요."}</h1>
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
