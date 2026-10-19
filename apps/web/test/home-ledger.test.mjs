import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { after, before, test } from "node:test";
import { portfolio } from "@jeamxn/core";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createMemoryRouter, RouterProvider } from "react-router";
import { createServer } from "vite";

let vite;
let html;
let TROUBLES;
before(async () => {
  vite = await createServer({
    configFile: false,
    resolve: { tsconfigPaths: true },
    server: { middlewareMode: true, hmr: false, ws: false },
    appType: "custom",
  });
  const { HomePage } = await vite.ssrLoadModule("/app/feature/home/home-page.tsx");
  ({ TROUBLES } = await vite.ssrLoadModule("/app/feature/home/trouble-ledger.tsx"));
  const router = createMemoryRouter([
    { path: "/", element: createElement(HomePage, { data: portfolio }) },
  ]);
  html = renderToStaticMarkup(createElement(RouterProvider, { router }));
});
after(async () => vite?.close());

test("homepage has one headline and the scroll story moved to /story", async () => {
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
  assert.ok(html.includes("기술보다"));
  assert.ok(html.includes("아이디어를"));
  assert.ok(html.includes('href="/story"'));
  assert.doesNotMatch(html, /scroll-story/u);
  const routes = await readFile(new URL("../app/routes.ts", import.meta.url), "utf8");
  assert.match(routes, /route\("story", "routes\/story\.tsx"\)/u);
  const config = await readFile(new URL("../react-router.config.ts", import.meta.url), "utf8");
  assert.match(config, /"\/story"/u);
});

test("every inconvenience links to a real public section and renders complete without JS", () => {
  assert.equal(TROUBLES.length, 6);
  for (const item of TROUBLES) {
    const [path, hash] = item.href.split("#");
    const slug = path.replace("/work/", "");
    const project = portfolio.projects.find((entry) => entry.slug === slug);
    assert.ok(project, item.href);
    if (hash)
      assert.ok(
        project.sections?.some((section) => section.id === hash),
        item.href,
      );
    assert.ok(html.includes(item.trouble), item.trouble);
    assert.ok(html.includes(item.how), item.how);
    assert.ok(html.includes(`href="${item.href}"`), item.href);
    assert.doesNotMatch(item.how, /\S·|·\S/u, "middle dots keep a space on both sides");
  }
  // Static markup is the finished, readable state: the pen line is a CSS default.
  assert.doesNotMatch(html, /data-live|--strike/u);
  assert.equal((html.match(/<li data-trouble=/g) ?? []).length, 6);
});

test("the four featured works keep their hooks in order", () => {
  const names = [...html.matchAll(/<h3 translate="no">([^<]+)<\/h3>/g)].map((m) => m[1]);
  assert.deepEqual(names.slice(0, 4), ["ara", "Dipull", "PFCT", "KT SAT"]);
  assert.ok(html.includes('id="work"'));
});
