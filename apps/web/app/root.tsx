import { portfolio } from "@jeamxn/core";
import { type ReactNode, useSyncExternalStore } from "react";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { SiteShell } from "~/feature/shell/site-shell";
import { sitePath } from "~/shared/lib/site-path";
import { MissingBoard } from "~/shared/widget/missing-board";
import { MissingMark } from "~/shared/widget/missing-mark";
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
/* The real HTTP 404 page is the empty app shell served at an unknown URL. Its HTML has
   no page content, so the first (hydration) render must be empty too; the not-found
   screen appears on the render right after. Prerendered pages are unaffected. */
const subscribeToNothing = () => () => {};
const inEmptyShell = () =>
  typeof window !== "undefined" &&
  (window as { __reactRouterContext?: { isSpaMode?: boolean } }).__reactRouterContext?.isSpaMode ===
    true;
function useShellReady() {
  return useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => !inEmptyShell(),
  );
}

export default function App() {
  const ready = useShellReady();
  if (!ready) return null;
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
  const ready = useShellReady();
  if (!ready) return null;
  const screen = (
    <div className="container missing-page">
      {notFound && <title>페이지를 찾지 못했어요 | 최재민</title>}
      <MissingMark />
      <h1>{notFound ? "페이지를 찾지 못했어요." : "페이지를 불러오지 못했어요."}</h1>
      <p>
        {notFound
          ? "주소를 확인하거나 첫 화면에서 다시 살펴보세요."
          : "새로고침하거나 잠시 뒤 다시 방문해 주세요."}
      </p>
      {/* A plain link: this screen is also the real HTTP 404 page, loaded at any URL. */}
      <a className="button button--solid" href={sitePath("/")}>
        첫 화면으로
      </a>
      {notFound && <MissingBoard />}
    </div>
  );
  // An unknown address still gets the menu and footer. Any other failure may have come
  // from the shell itself, so that one is shown bare.
  return notFound ? (
    <SiteShell
      email={portfolio.profile.email}
      github={portfolio.profile.github}
      nameEn={portfolio.profile.nameEn}
    >
      {screen}
    </SiteShell>
  ) : (
    screen
  );
}
