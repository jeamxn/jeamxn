import assert from "node:assert/strict";
import { mkdir, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";
import { portfolio } from "../packages/core/dist/index.js";

// Walks every page the way a visitor would (scrolling to the end, pressing every "show it another way"
// button) and records which React Bits components actually mounted. It fails on a page
// error, a console error, a request to another origin, a component that could not
// start, horizontal overflow, or too many live WebGL contexts. Pages are served with
// the production CSP so a blocked font, image, worker or eval shows up here.
const base = (process.env.QA_BASE_URL ?? "http://127.0.0.1:5414").replace(/\/$/, "");
const output = path.resolve(process.env.QA_OUTPUT ?? "test-results/bits");
const width = Number(process.env.QA_WIDTH ?? 1280);
const workers = Number(process.env.QA_WORKERS ?? 4);
const only = process.env.QA_ONLY?.split(",").filter(Boolean);
const wanted = Number(process.env.QA_MIN_USED ?? 180);
const contextLimit = 12;
const origin = new URL(base).origin;
const csp =
  "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'";

const vendored = (
  await readdir(path.resolve(import.meta.dirname, "../apps/web/app/shared/reactbits"))
)
  .filter((file) => file.endsWith(".tsx"))
  .map((file) => file.slice(0, -4));
const routes = [
  "/",
  "/work",
  "/resume",
  ...portfolio.projects.map((project) => `/work/${project.slug}`),
  ...portfolio.activities.flatMap((activity) =>
    activity.slug ? [`/activity/${activity.slug}`] : [],
  ),
  "/missing-page-check",
].filter((route) => !only || only.includes(route));
await mkdir(output, { recursive: true });

const browser = await chromium.launch({
  headless: true,
  args: ["--use-angle=metal", "--ignore-gpu-blocklist"],
  ...(process.env.QA_BROWSER_PATH ? { executablePath: process.env.QA_BROWSER_PATH } : {}),
});
const results = [];

// Counts canvases that hold a WebGL context and are still in the document.
const trackContexts = () => {
  const live = new Set();
  const original = HTMLCanvasElement.prototype.getContext;
  HTMLCanvasElement.prototype.getContext = function getContext(kind, ...rest) {
    const context = original.call(this, kind, ...rest);
    if (context && /webgl/u.test(String(kind))) live.add(this);
    return context;
  };
  window.__liveContexts = () => {
    for (const canvas of live) if (!canvas.isConnected) live.delete(canvas);
    return live.size;
  };
};

async function check(context, route) {
  const page = await context.newPage();
  const faults = [];
  const external = [];
  const missing = route === "/missing-page-check";
  page.on("pageerror", (error) => faults.push(`pageerror: ${error.message.slice(0, 200)}`));
  page.on("console", (message) => {
    if (message.type() !== "error") return;
    if (missing && /status of 404/u.test(message.text())) return;
    faults.push(`console: ${message.text().slice(0, 200)}`);
  });
  page.on("request", (request) => {
    const url = new URL(request.url());
    if (["http:", "https:"].includes(url.protocol) && url.origin !== origin)
      external.push(url.href);
  });
  const seen = new Map();
  let contexts = 0;
  let overflow = false;
  const collect = async () => {
    const state = await page.evaluate(() => ({
      bits: [...document.querySelectorAll("[data-bit]")].map((node) => [
        node.getAttribute("data-bit"),
        node.getAttribute("data-bit-state"),
      ]),
      site: [
        [".site-sparks", "ClickSpark"],
        [".site-pill-nav", "PillNav"],
        [".brand-magnet", "Magnet"],
        [".footer-threads canvas", "Threads"],
        [".footer-heading-line", "VariableProximity"],
        [".story-hero-field canvas", "DotGrid"],
        [".home-marquee", "ScrollVelocity"],
        [".home-about-reveal", "ScrollReveal"],
        [".glare-hover, [class*='glare']", "GlareHover"],
      ]
        .filter(([selector]) => document.querySelector(selector))
        .map(([, name]) => name),
      contexts: window.__liveContexts?.() ?? 0,
      overflow: document.documentElement.scrollWidth > innerWidth + 1,
    }));
    for (const [name, value] of state.bits) {
      if (value === "ready" || value === "failed") seen.set(name, value);
      else if (!seen.has(name)) seen.set(name, value);
    }
    for (const name of state.site) seen.set(name, "ready");
    contexts = Math.max(contexts, state.contexts);
    overflow ||= state.overflow;
  };
  try {
    const response = await page.goto(`${base}${route}`, { waitUntil: "networkidle" });
    assert.equal(response?.status(), missing ? 404 : 200, `${route} status`);
    await page.locator("main").waitFor();
    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let top = 0; top < height; top += 500) {
      await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), top);
      await page.waitForTimeout(260);
      await collect();
    }
    for (const turn of await page.locator(".desk-turn").all()) {
      await turn.scrollIntoViewIfNeeded();
      const turns = Number(await turn.getAttribute("data-turns"));
      for (let step = 0; step < turns; step += 1) {
        await turn.click();
        await page.waitForTimeout(650);
        await collect();
      }
    }
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.waitForTimeout(200);
    await collect();
  } catch (error) {
    faults.push(`check: ${error.message.split("\n")[0]}`);
  } finally {
    await page.close();
  }
  const stuck = [...seen]
    .filter(([, value]) => value !== "ready")
    .map(([name, value]) => `${name}:${value}`);
  return {
    route,
    bits: [...seen]
      .filter(([, value]) => value === "ready")
      .map(([name]) => name)
      .sort(),
    stuck,
    contexts,
    overflow,
    faults: [...new Set(faults)],
    external: [...new Set(external)],
  };
}

try {
  const queue = [...routes];
  await Promise.all(
    Array.from({ length: workers }, async () => {
      const context = await browser.newContext({
        viewport: { width, height: 900 },
        deviceScaleFactor: 1,
      });
      await context.addInitScript(trackContexts);
      await context.route("**/*", async (route) => {
        const request = route.request();
        const url = new URL(request.url());
        if (["http:", "https:"].includes(url.protocol) && url.origin !== origin)
          return route.abort("blockedbyclient");
        if (request.resourceType() !== "document") return route.continue();
        const response = await route.fetch();
        return route.fulfill({
          response,
          headers: { ...response.headers(), "content-security-policy": csp },
        });
      });
      for (let route = queue.shift(); route; route = queue.shift())
        results.push(await check(context, route));
      await context.close();
    }),
  );
} finally {
  await browser.close();
}

results.sort((a, b) => routes.indexOf(a.route) - routes.indexOf(b.route));
const used = new Set(results.flatMap((result) => result.bits));
const unused = vendored.filter((name) => !used.has(name)).sort();
const failed = results.filter(
  (result) =>
    result.faults.length ||
    result.external.length ||
    result.stuck.length ||
    result.overflow ||
    result.contexts > contextLimit,
);
const where = {};
for (const result of results)
  for (const name of result.bits) {
    where[name] ??= [];
    where[name].push(result.route);
  }
await writeFile(
  path.join(output, `results-${width}.json`),
  `${JSON.stringify({ passed: failed.length === 0, base, width, pages: results.length, vendored: vendored.length, used: used.size, unused, failed, where, results }, null, 1)}\n`,
);
console.log(
  JSON.stringify(
    {
      passed: failed.length === 0 && (only ? true : used.size >= wanted),
      width,
      pages: results.length,
      used: used.size,
      of: vendored.length,
      unused,
      maxContexts: Math.max(...results.map((result) => result.contexts)),
      failed: failed.map((result) => ({
        route: result.route,
        stuck: result.stuck,
        contexts: result.contexts,
        overflow: result.overflow,
        faults: result.faults.slice(0, 3),
        external: result.external.slice(0, 3),
      })),
    },
    null,
    1,
  ),
);
assert.equal(failed.length, 0, `${failed.length} pages need attention`);
if (!only) assert.ok(used.size >= wanted, `only ${used.size} components are in use`);
