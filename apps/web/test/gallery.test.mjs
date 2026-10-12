import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";

let vite;
before(async () => {
  vite = await createServer({
    configFile: false,
    resolve: { tsconfigPaths: true },
    server: { middlewareMode: true, hmr: false, ws: false },
    appType: "custom",
  });
});
after(async () => vite?.close());

const screen = {
  id: "home",
  title: "학교 홈",
  description: "오늘 필요한 학교 정보를 모았습니다.",
  src: "/images/dipull-home.012345abcdef.webp",
  width: 390,
  height: 844,
  alt: "Dipull 학교 홈",
  caption: "원본 앱을 가상 데이터로 실행한 화면",
  device: "mobile",
};

test("screen assets stay in the same-origin image directory", async () => {
  const { safeScreenSrc } = await vite.ssrLoadModule("/app/shared/lib/project-media.ts");
  assert.equal(safeScreenSrc(screen.src), screen.src);
  for (const src of [
    "javascript:alert(1)",
    "https://example.com/image.webp",
    "//example.com/a.png",
    "/images/../x.png",
    "/api/private.webp",
    "/images/x.svg",
    "/images/x.png?redirect=evil",
  ])
    assert.equal(safeScreenSrc(src), undefined, src);
});

test("project screens win over legacy media; fallback names existing features", async () => {
  const { projectScreens } = await vite.ssrLoadModule("/app/shared/lib/project-media.ts");
  assert.deepEqual(projectScreens({ slug: "dipull", screens: [screen] }), [screen]);
  const fallback = projectScreens({ slug: "dipull" });
  assert.equal(fallback.length, 3);
  assert.ok(fallback.every((item) => item.title && item.description && item.device === "mobile"));
  assert.deepEqual(projectScreens({ slug: "unrelated" }), []);
});

test("gallery exposes every named screen and native dialog without product CSS or duplicate covers", async () => {
  const { ProductGallery } = await vite.ssrLoadModule("/app/shared/widget/product-gallery.tsx");
  const screens = [
    screen,
    { ...screen, id: "laundry", title: "세탁 예약", src: "/images/dipull-laundry.webp" },
  ];
  const html = renderToStaticMarkup(createElement(ProductGallery, { name: "Dipull", screens }));
  assert.match(html, /학교 홈 화면 선택/);
  assert.match(html, /세탁 예약 화면 선택/);
  assert.match(html, /aria-pressed="true"/);
  assert.match(html, /aria-pressed="false"/);
  assert.match(html, /2개의 화면/);
  assert.match(html, /화면 크게 보기/);
  assert.match(html, /<dialog/);
  assert.match(html, /aria-label="이전 화면"/);
  assert.match(html, /aria-label="다음 화면"/);
  assert.doesNotMatch(html, /<iframe|<style|<script|class="phone/);
  assert.match(html, /원본 앱을 가상 데이터로 실행한 화면/);
});

test("no screenshots renders no empty viewer", async () => {
  const { ProductGallery } = await vite.ssrLoadModule("/app/shared/widget/product-gallery.tsx");
  assert.equal(
    renderToStaticMarkup(createElement(ProductGallery, { name: "None", screens: [] })),
    "",
  );
});
