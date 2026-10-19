import assert from "node:assert/strict";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium, webkit } from "playwright";
import { portfolio } from "../packages/core/dist/index.js";

// Run separately against a root build and a build mounted at /jeamxn/.
// This deliberately requires real HTTP 404s: a catch-all SPA preview is not Pages.
const base = (process.env.QA_BASE_URL ?? "http://127.0.0.1:5414").replace(/\/$/, "");
const baseUrl = new URL(base);
assert.ok(!baseUrl.search && !baseUrl.hash, "QA_BASE_URL must not contain query/hash");
const basePath = baseUrl.pathname.replace(/\/$/, "");
const sitePath = (route) => `${basePath}${route}`;
const output = path.resolve(process.env.QA_OUTPUT ?? "test-results/pages");
const engines = (process.env.QA_ENGINES ?? "chromium").split(",");
const widths = (process.env.QA_WIDTHS ?? "390,1440").split(",").map(Number);
const routes = [
  "/",
  "/about",
  "/work",
  "/resume",
  ...portfolio.projects.map((project) => `/work/${project.slug}`),
  ...portfolio.activities.flatMap((activity) =>
    activity.slug ? [`/activity/${activity.slug}`] : [],
  ),
];
const report = {
  base,
  basePath,
  engines,
  widths,
  routes: [],
  assets: [],
  negatives: [],
  apiRequests: [],
  escapedRequests: [],
  externalRequests: [],
  pageErrors: [],
};
const assets = new Map();
const removedUi = ".assistant-trigger,.header-ask,.ask-inline,.assistant-modal";
const htmlText = (text) =>
  text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#x27;");
const normalizedPath = (url) => new URL(url).pathname.replace(/\/$/, "");
await mkdir(output, { recursive: true });

function isApi(url) {
  return /(?:^|\/)api(?:\/|$)/u.test(new URL(url).pathname);
}
function localUrl(value, relativeTo) {
  const url = new URL(value, relativeTo);
  if (url.origin !== baseUrl.origin || !["http:", "https:"].includes(url.protocol)) return null;
  assert.ok(
    url.pathname === basePath || url.pathname.startsWith(`${basePath}/`),
    `asset/link escaped Pages base: ${url}`,
  );
  assert.equal(isApi(url), false, `removed API referenced: ${url}`);
  return url;
}
function asset(value, relativeTo) {
  if (!value || /^(?:data:|blob:)/u.test(value)) return;
  const url = localUrl(value, relativeTo);
  if (url) {
    url.hash = "";
    assets.set(url.href, true);
  }
}

for (const engine of engines) {
  assert.ok(["chromium", "webkit"].includes(engine), `unknown QA_ENGINES entry: ${engine}`);
  const browser = await { chromium, webkit }[engine].launch({
    headless: true,
    ...(engine === "chromium" && process.env.QA_BROWSER_PATH
      ? { executablePath: process.env.QA_BROWSER_PATH }
      : {}),
  });
  try {
    const context = await browser.newContext({ reducedMotion: "reduce", acceptDownloads: true });
    await context.route("**/*", (route) => {
      const url = new URL(route.request().url());
      return isApi(url) ||
        (["http:", "https:"].includes(url.protocol) && url.origin !== baseUrl.origin)
        ? route.abort("blockedbyclient")
        : route.continue();
    });
    context.on("request", (request) => {
      const url = new URL(request.url());
      if (["http:", "https:"].includes(url.protocol) && url.origin !== baseUrl.origin)
        report.externalRequests.push({ engine, url: url.href });
      if (isApi(url)) report.apiRequests.push({ engine, url: url.href });
      if (
        url.origin === baseUrl.origin &&
        !(url.pathname === basePath || url.pathname.startsWith(`${basePath}/`))
      )
        report.escapedRequests.push({ engine, url: url.href });
    });
    // Discover the actual build's site URL rather than silently assuming production.
    const infoResponse = await context.request.get(`${base}/build-info.json`);
    assert.equal(infoResponse.status(), 200, "static build-info exists");
    const info = await infoResponse.json();
    assert.equal(info.hosting, "static");
    assert.equal(info.ai, false);
    assert.equal(info.basePath, `${basePath}/`);
    assert.equal(info.routes, routes.length);
    const site = (process.env.JEAMXN_SITE_URL ?? info.siteUrl).replace(/\/$/, "");
    assert.equal(info.siteUrl, site, "public metadata origin agrees with build configuration");
    report.siteUrl = site;
    for (const width of widths) {
      const page = await context.newPage();
      await page.setViewportSize({ width, height: 1000 });
      page.on("pageerror", (error) =>
        report.pageErrors.push({ engine, width, error: error.message }),
      );
      for (const route of routes) {
        const response = await page.goto(`${base}${route}`, { waitUntil: "networkidle" });
        assert.equal(response?.status(), 200, `${route} real static status`);
        const raw = await response.text();
        const source =
          portfolio.projects.find((project) => route === `/work/${project.slug}`) ??
          portfolio.activities.find((activity) => route === `/activity/${activity.slug}`);
        const title = source && ("name" in source ? source.name : source.title);
        if (title)
          assert.ok(raw.includes(htmlText(title)), `${route} prerendered title, not SPA fallback`);
        assert.match(raw, /<meta[^>]+name="description"/u, `${route} static description`);
        const canonicalRoute = route === "/about" ? "/resume" : route;
        const canonical = `${site}${canonicalRoute === "/" ? "/" : `${canonicalRoute}/`}`;
        assert.ok(
          raw.includes(`rel="canonical" href="${canonical}"`) ||
            raw.includes(`href="${canonical}" rel="canonical"`),
          `${route} canonical ${canonical}`,
        );
        await page.locator("main h1").waitFor();
        if (route === "/about")
          await page.waitForURL(
            (url) => normalizedPath(url) === sitePath("/resume") && url.hash === "#introduction",
          );
        if (title)
          assert.equal(
            (await page.locator("h1").textContent()).trim(),
            title,
            `${route} rendered identity`,
          );
        assert.equal(await page.locator("h1").count(), 1, `${route} single heading`);
        assert.equal(
          await page.locator(removedUi).count(),
          0,
          `${route} answer UI removed, not hidden`,
        );
        assert.ok(
          (await page.locator("main").textContent()).length > 120,
          `${route} substantive static content`,
        );
        assert.ok(
          await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
          `${route} horizontal overflow at ${width}`,
        );
        const urls = await page.evaluate(() => ({
          assets: [
            ...document.querySelectorAll(
              "script[src],link[href],img[src],source[src],video[src],video[poster]",
            ),
          ].flatMap((node) =>
            [
              node.getAttribute("src"),
              node.getAttribute("href"),
              node.getAttribute("poster"),
            ].filter(Boolean),
          ),
          srcsets: [...document.querySelectorAll("[srcset],[imagesrcset]")].map(
            (node) => node.getAttribute("srcset") ?? node.getAttribute("imagesrcset"),
          ),
          links: [...document.querySelectorAll("a[href]")].map((node) => node.getAttribute("href")),
        }));
        for (const value of urls.assets) asset(value, page.url());
        for (const srcset of urls.srcsets)
          for (const candidate of srcset.split(","))
            asset(candidate.trim().split(/\s+/u)[0], page.url());
        for (const value of urls.links) localUrl(value, page.url());
        if (["/", "/work", "/resume"].includes(route)) {
          assert.equal(
            (await page.reload({ waitUntil: "networkidle" }))?.status(),
            200,
            `${route} deep reload`,
          );
          assert.equal(await page.locator(removedUi).count(), 0);
          await page.screenshot({
            path: path.join(output, `${engine}-${width}-${route.slice(1) || "home"}.png`),
            fullPage: false,
          });
        }
        report.routes.push({
          engine,
          width,
          route,
          title: await page.title(),
          staticStatus: response.status(),
        });
      }
      // Direct URL query, hydration and reload preserve both value and actual records.
      await page.goto(`${base}/work?q=${encodeURIComponent("학교")}&collection=school&sort=name`, {
        waitUntil: "networkidle",
      });
      const search = page.getByRole("searchbox");
      assert.equal(await search.inputValue(), "학교");
      const queryLinks = await page
        .locator(".archive-record")
        .evaluateAll((nodes) => nodes.map((node) => node.getAttribute("href")));
      assert.ok(queryLinks.length > 0, "school query has actual records");
      for (const href of queryLinks)
        assert.ok(href.startsWith(sitePath("/work/")), `query result target ${href}`);
      const queryUrl = page.url();
      assert.equal((await page.reload({ waitUntil: "networkidle" }))?.status(), 200);
      assert.equal(page.url(), queryUrl);
      assert.equal(await search.inputValue(), "학교");
      assert.deepEqual(
        await page
          .locator(".archive-record")
          .evaluateAll((nodes) => nodes.map((node) => node.getAttribute("href"))),
        queryLinks,
      );
      // Real pointer opening, complete keyboard cycle, close and focus restoration.
      const opener = page.getByRole("button", { name: "메뉴 열기", exact: true });
      await opener.click();
      const menu = page.locator(".menu-modal[open]");
      await menu.waitFor();
      const links = menu.locator("nav > a");
      assert.deepEqual(await links.allTextContents(), ["이력", "작업 기록", "연락하기"]);
      assert.deepEqual(
        (await links.evaluateAll((nodes) => nodes.map((node) => node.getAttribute("href")))).slice(
          0,
          2,
        ),
        [sitePath("/resume"), sitePath("/work")],
      );
      const focusable = menu.locator("button,a[href]");
      for (let index = 1; index <= (await focusable.count()); index++) {
        await page.keyboard.press("Tab");
        assert.ok(
          await focusable
            .nth(index % (await focusable.count()))
            .evaluate((node) => node === document.activeElement),
          "full menu Tab cycle",
        );
      }
      await page.keyboard.press("Escape");
      await menu.waitFor({ state: "hidden" });
      assert.ok(
        await opener.evaluate((node) => node === document.activeElement),
        "menu restores pointer opener focus",
      );
      await page.goto(`${base}/resume/`, { waitUntil: "networkidle" });
      const pdfLink = page.getByRole("link", { name: "PDF 내려받기", exact: true });
      assert.equal(await pdfLink.getAttribute("href"), sitePath("/resume.pdf"));
      const pendingDownload = page.waitForEvent("download");
      await pdfLink.click();
      const download = await pendingDownload;
      assert.equal(await download.failure(), null);
      const downloaded = path.join(output, `${engine}-${width}-resume.pdf`);
      await download.saveAs(downloaded);
      const bytes = await readFile(downloaded);
      assert.equal(bytes.subarray(0, 4).toString(), "%PDF");
      assert.ok(bytes.length > 2_000_000, "font-embedded static PDF download");
      await page.goto(`${base}/work/pfct/#ai-waf-monitoring`, { waitUntil: "networkidle" });
      await page.locator("#ai-waf-monitoring").waitFor();
      assert.ok(
        (await page.locator("#ai-waf-monitoring").textContent()).includes("WAF"),
        "AI project content is retained",
      );
      assert.equal(new URL(page.url()).hash, "#ai-waf-monitoring");
      await page.close();
    }
    const pdf = await context.request.get(`${base}/resume.pdf`);
    assert.equal(pdf.status(), 200);
    assert.match(pdf.headers()["content-type"] ?? "", /application\/pdf/u);
    assert.equal((await pdf.body()).subarray(0, 4).toString(), "%PDF");
    // API probes intentionally use request context, never app/browser traffic.
    for (const route of [
      "/missing",
      "/work/missing-pages-record",
      "/activity/missing-pages-record",
      "/assets/missing.js",
      "/api/health",
      "/api/portfolio",
      "/api/assistant/status",
      "/api/assistant/chat",
      "/api/resume.pdf",
    ]) {
      const response = await context.request.get(`${base}${route}`);
      assert.equal(
        response.status(),
        404,
        `${route} must not return fallback HTML/old API success`,
      );
      const body = await response.text();
      assert.match(body, /찾지 못|Not found/u, `${route} genuine static 404`);
      report.negatives.push({ engine, route, status: response.status() });
    }
    const missing = await context.newPage();
    assert.equal(
      (await missing.goto(`${base}/missing`, { waitUntil: "networkidle" }))?.status(),
      404,
    );
    await missing.getByRole("heading", { name: /찾지 못/u }).waitFor();
    assert.equal(
      await missing.getByRole("link", { name: "첫 화면으로", exact: true }).getAttribute("href"),
      `${basePath}/`,
    );
    await missing.close();
    // Head and body asset targets, plus font CSS url()s, must all stay under base.
    for (const url of assets.keys()) {
      const response = await context.request.get(url);
      assert.equal(response.status(), 200, `static asset ${url}`);
      const type = response.headers()["content-type"] ?? "";
      if (/\.css(?:\?|$)/u.test(url)) {
        assert.match(type, /text\/css/u);
        for (const match of (await response.text()).matchAll(
          /url\(\s*["']?([^\s)'"\n]+)["']?\s*\)/gu,
        ))
          asset(match[1], url);
      } else if (/\.(?:js|mjs|woff2?|ttf|svg|png|jpe?g|webp)(?:\?|$)/u.test(url))
        assert.ok(!type.includes("text/html"), `asset is not SPA fallback ${url}`);
      report.assets.push({ engine, url, status: response.status(), contentType: type });
    }
    await context.close();
  } catch (error) {
    await writeFile(
      path.join(output, "failure.json"),
      `${JSON.stringify({ passed: false, error: error.message, stack: error.stack, ...report }, null, 2)}\n`,
    );
    throw error;
  } finally {
    await browser.close();
  }
}
assert.deepEqual(report.apiRequests, [], "no browser request to any API/model endpoint");
assert.deepEqual(report.escapedRequests, [], "no same-origin request escaped hosting base");
assert.deepEqual(
  report.externalRequests,
  [],
  "static portfolio never contacts an external model/service",
);
assert.deepEqual(report.pageErrors, [], "no browser/hydration errors");
await writeFile(
  path.join(output, "results.json"),
  `${JSON.stringify({ passed: true, ...report }, null, 2)}\n`,
);
console.log(
  JSON.stringify(
    {
      passed: true,
      base,
      siteUrl: report.siteUrl,
      routeChecks: report.routes.length,
      assetChecks: report.assets.length,
      negativeChecks: report.negatives.length,
      apiRequests: report.apiRequests,
      escapedRequests: report.escapedRequests,
      pageErrors: report.pageErrors,
      externalRequests: report.externalRequests,
      output,
    },
    null,
    2,
  ),
);
