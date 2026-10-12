import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { portfolio } from "@jeamxn/core";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";

let vite;
before(async () => {
  vite = await createServer({
    configFile: false,
    ssr: { noExternal: ["react-router"] },
    resolve: { tsconfigPaths: true },
    server: { middlewareMode: true, hmr: false, ws: false },
    appType: "custom",
  });
});
after(async () => vite?.close());
test("all archive query URLs hydrate from the same full static first render", async () => {
  const { WorkArchivePage } = await vite.ssrLoadModule("/app/feature/work/work-archive-page.tsx");
  const { MemoryRouter } = await vite.ssrLoadModule("react-router");
  const render = (entry) =>
    renderToStaticMarkup(
      createElement(
        MemoryRouter,
        { initialEntries: [entry] },
        createElement(WorkArchivePage, { data: portfolio }),
      ),
    );
  const full = render("/work");
  assert.equal((full.match(/class="archive-record"/gu) ?? []).length, portfolio.projects.length);
  for (const query of [
    "q=aRa",
    "collection=school",
    "type=experiment",
    "sort=name",
    "collection=personal&type=learning&sort=name",
    "q=missing-hydration-record",
  ])
    assert.equal(render(`/work?${query}`), full, query);
});
