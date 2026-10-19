import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { portfolio } from "@jeamxn/core";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";

test("resume SSR shows exactly three works newest start first and leaves KT SAT in activities", async () => {
  const vite = await createServer({
    configFile: false,
    server: { middlewareMode: true, hmr: false, ws: false },
    ssr: { noExternal: ["react-router"] },
    resolve: { alias: { "~": new URL("../app", import.meta.url).pathname } },
    esbuild: { jsx: "automatic" },
  });
  try {
    const { ResumePage } = await vite.ssrLoadModule(
      new URL("../app/feature/resume/resume-page.tsx", import.meta.url).pathname,
    );
    const { MemoryRouter } = await vite.ssrLoadModule("react-router");
    const html = renderToStaticMarkup(
      createElement(MemoryRouter, {}, createElement(ResumePage, { data: portfolio })),
    );
    const projects = html.split("주요 작업</h2>")[1].split("</section>")[0];
    assert.deepEqual(
      [...projects.matchAll(/href="\/work\/([^"]+)"/gu)].map((match) => match[1]),
      ["ara", "pfct", "dipull"],
    );
    assert.doesNotMatch(projects, /MultiNet|띠리링|YUN Architects/);
    assert.match(html.split("활동</h2>")[1], /kt-sat-ax/);
    assert.match(html, /href="\/resume.pdf"/);
    assert.equal((html.match(/<h1>/gu) ?? []).length, 1);
    const introduction = html.split('id="introduction"')[1].split("</section>")[0];
    for (const paragraph of portfolio.profile.about) assert.ok(introduction.includes(paragraph));
    for (const interest of portfolio.profile.interests) assert.ok(introduction.includes(interest));
    assert.doesNotMatch(introduction, /portrait.webp|resume-portrait/u);
    const heading = html.split('class="resume-heading"')[1].split("</header>")[0];
    assert.match(heading, /class="resume-id-photo"/u);
    assert.match(heading, /alt="최재민의 증명사진"/u);
    assert.ok(heading.indexOf('class="resume-id-photo"') < heading.indexOf("<h1>"));
    assert.doesNotMatch(html, /srcSet="[^"]*portrait-small/u);
    for (const education of portfolio.education)
      assert.equal(html.split(education.school).length - 1, 1);

    const { default: About, meta } = await vite.ssrLoadModule("/app/routes/about.tsx");
    const legacyHtml = renderToStaticMarkup(
      createElement(MemoryRouter, { initialEntries: ["/about"] }, createElement(About)),
    );
    assert.equal(legacyHtml, html);
    assert.ok(
      meta().some(
        (entry) => entry.rel === "canonical" && entry.href === "https://jeamxn.dev/resume/",
      ),
    );

    const { SiteShell } = await vite.ssrLoadModule("/app/feature/shell/site-shell.tsx");
    const shell = renderToStaticMarkup(
      createElement(
        MemoryRouter,
        { initialEntries: ["/"] },
        createElement(SiteShell, {
          email: portfolio.profile.email,
          github: portfolio.profile.github,
          nameEn: portfolio.profile.nameEn,
        }),
      ),
    );
    const desktop = shell.split('aria-label="주 메뉴"')[1].split("</nav>")[0];
    // Closed native modal children are not rendered by the SSR shell.
    const shellSource = await readFile(
      new URL("../app/feature/shell/site-shell.tsx", import.meta.url),
      "utf8",
    );
    const mobile = shellSource.split('aria-label="모바일 주 메뉴"')[1].split("</nav>")[0];
    assert.deepEqual(
      [...desktop.matchAll(/href="([^"]+)"/gu)].map((match) => match[1]),
      ["/resume", "/work"],
    );
    assert.deepEqual(
      [...mobile.matchAll(/<Link to="([^"]+)"/gu)].map((match) => match[1]),
      ["/resume", "/work"],
    );
    assert.doesNotMatch(shellSource, /to="\/about"/);
    assert.match(mobile, /href=\{`mailto:\$\{email\}`\}/);
    assert.doesNotMatch(shell, /href="\/about"/);
    assert.match(shell, /site-header--home/);
  } finally {
    await vite.close();
  }
});
