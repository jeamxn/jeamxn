import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { portfolio } from "@jeamxn/core";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";

for (const base of ["/", "/jeamxn/"]) {
  test(`static portfolio preserves links and media without answer UI at ${base}`, async () => {
    const deployedSite = base === "/" ? "https://jeamxn.dev" : "https://jeamxn.github.io/jeamxn";
    const vite = await createServer({
      configFile: false,
      base,
      define: { "import.meta.env.VITE_SITE_URL": JSON.stringify(deployedSite) },
      ssr: { noExternal: ["react-router"] },
      resolve: { tsconfigPaths: true },
      server: { middlewareMode: true, hmr: false, ws: false },
      appType: "custom",
    });
    try {
      const { MemoryRouter } = await vite.ssrLoadModule("react-router");
      const { SiteShell } = await vite.ssrLoadModule("/app/feature/shell/site-shell.tsx");
      const { HomePage } = await vite.ssrLoadModule("/app/feature/home/home-page.tsx");
      const { ResumePage } = await vite.ssrLoadModule("/app/feature/resume/resume-page.tsx");
      const { WorkPage } = await vite.ssrLoadModule("/app/feature/work/work-page.tsx");
      const { sitePath } = await vite.ssrLoadModule("/app/shared/lib/site-path.ts");
      const { siteUrl, pageMeta } = await vite.ssrLoadModule("/app/shared/lib/meta.ts");
      assert.equal(siteUrl("/images/portrait.webp"), `${deployedSite}/images/portrait.webp`);
      assert.equal(siteUrl("/resume"), `${deployedSite}/resume`);
      for (const [route, args, path] of [
        ["home", undefined, "/"],
        ["resume", undefined, "/resume"],
        ["about", undefined, "/resume"],
        ["work-archive", undefined, "/work"],
        ["work", { params: { slug: "ara" } }, "/work/ara"],
        ["activity", { params: { slug: "kt-sat-ax" } }, "/activity/kt-sat-ax"],
      ]) {
        const { meta } = await vite.ssrLoadModule(`/app/routes/${route}.tsx`);
        const tags = meta(args);
        const expected = `${deployedSite}${path.replace(/\/+$/, "")}/`;
        const canonicals = tags.filter((tag) => tag.rel === "canonical");
        assert.deepEqual(
          canonicals.map((tag) => tag.href),
          [expected],
        );
        assert.equal(tags.find((tag) => tag.property === "og:url").content, expected);
        assert.equal(
          tags.find((tag) => tag.property === "og:image").content,
          `${deployedSite}/images/portrait.webp`,
        );
      }
      assert.ok(pageMeta("title", "description").some((tag) => tag.href === `${deployedSite}/`));
      const { safeScreenSrc } = await vite.ssrLoadModule("/app/shared/lib/project-media.ts");
      const local = (path) => `${base}${path.replace(/^\//u, "")}`;
      const render = (page, path = "") =>
        renderToStaticMarkup(
          createElement(
            MemoryRouter,
            { basename: base, initialEntries: [local(path)] },
            createElement(
              SiteShell,
              {
                email: portfolio.profile.email,
                github: portfolio.profile.github,
                nameEn: portfolio.profile.nameEn,
              },
              page,
            ),
          ),
        );
      const home = render(createElement(HomePage, { data: portfolio }));
      assert.doesNotMatch(
        home,
        /assistant-trigger|assistant-modal|header-ask|ask-inline|질문하기|재민에 대해 물어보기/u,
      );
      assert.ok(home.includes(`href="mailto:${portfolio.profile.email}"`));
      assert.ok(home.includes(`href="${local("resume")}"`));
      assert.match(home, /site-header--home/u);
      assert.ok(home.includes(`href="${local("work/pfct#ai-waf-monitoring")}"`));
      assert.ok(home.includes(`href="${local("work/ara")}"`));
      assert.ok(home.includes(`src="${local(portfolio.profile.portrait)}"`));
      assert.ok(home.includes(`${local("images/portrait-small.webp")} 720w`));
      const resume = render(createElement(ResumePage, { data: portfolio }), "resume");
      assert.ok(resume.includes(`href="${local("resume.pdf")}"`));
      assert.doesNotMatch(resume, /\/api\//u);
      const project = portfolio.projects.find((item) => item.slug === "dipull");
      const work = render(createElement(WorkPage, { project }), "work/dipull");
      for (const html of [home, resume, work]) {
        for (const [, path] of html.matchAll(/(?:href|src)="(\/[^"]*)"/gu))
          assert.ok(path.startsWith(base), path);
      }
      for (const path of ["/", "/resume.pdf", "/work/ara#origin", "/work?q=학교", "/favicon.svg"])
        assert.equal(sitePath(path), local(path));
      for (const path of [
        "#work",
        "?q=학교",
        "https://github.com/jeamxn",
        "mailto:me@jeamxn.dev",
        "//example.com/path",
      ])
        assert.equal(sitePath(path), path);
      assert.equal(safeScreenSrc("/images/screen.webp"), local("images/screen.webp"));
      for (const path of [
        "/images/../private.webp",
        "/images/x.svg",
        "//evil.example/x.webp",
        "/jeamxn/images/screen.webp",
      ])
        assert.equal(safeScreenSrc(path), undefined);
    } finally {
      await vite.close();
    }
  });
}

test("root composes only static site UI; local font files resolve beside each stylesheet", async () => {
  const root = await readFile(new URL("../app/root.tsx", import.meta.url), "utf8");
  assert.doesNotMatch(root, /AssistantPanel|assistantOpen|onAsk|Outlet context/u);
  assert.match(root, /<Outlet \/>/u);
  for (const family of ["interlude", "noto-serif-kr"]) {
    const css = await readFile(
      new URL(`../public/fonts/${family}/fonts.css`, import.meta.url),
      "utf8",
    );
    assert.doesNotMatch(css, /url\(["']?\//u);
    assert.match(css, /url\("\.\//u);
  }
});
