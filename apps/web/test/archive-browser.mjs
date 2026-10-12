import assert from "node:assert/strict";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { portfolio } from "@jeamxn/core";
import { chromium } from "playwright";
import { archiveRecords } from "../app/shared/lib/work-archive.ts";

const base = process.env.QA_BASE_URL ?? process.env.QA_BASE ?? "http://127.0.0.1:5410";
const output = process.env.QA_OUTPUT ?? "/tmp/jeamxn-catalog-v4/archive-qa";
await mkdir(output, { recursive: true });
const browser = await chromium.launch({
  headless: true,
  ...(process.env.QA_BROWSER_PATH ? { executablePath: process.env.QA_BROWSER_PATH } : {}),
});
const results = [];
const errors = [];
try {
  for (const width of [390, 768, 1440]) {
    const page = await browser.newPage({
      viewport: { width, height: 1000 },
      reducedMotion: "reduce",
    });
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(`${base}/work`, { waitUntil: "networkidle" });
    assert.equal(await page.locator(".archive-record").count(), portfolio.projects.length);
    assert.match(await page.title(), /작업 기록/);
    assert.equal(await page.locator(".archive-record img").count(), 0);
    const measurements = await page.evaluate(() => ({
      pageWidth: document.documentElement.scrollWidth,
      viewport: innerWidth,
    }));
    assert.ok(measurements.pageWidth <= width + 1, JSON.stringify(measurements));
    const search = page.getByRole("searchbox");
    await search.fill("없는 검색어 검증");
    await page.getByRole("heading", { name: "일치하는 기록이 없습니다." }).waitFor();
    assert.match(page.url(), /q=/);
    await page.getByRole("button", { name: "모든 기록 보기", exact: true }).click();
    await page.locator(".archive-record").first().waitFor();
    assert.equal(await page.locator(".archive-record").count(), portfolio.projects.length);
    await search.fill("aRa");
    await page.waitForFunction(
      () =>
        document.querySelectorAll(".archive-record").length > 0 &&
        [...document.querySelectorAll(".archive-record")].some(
          (link) => link.getAttribute("href") === "/work/ara",
        ),
    );
    await page.reload({ waitUntil: "networkidle" });
    assert.equal(await search.inputValue(), "aRa");
    await page.getByRole("button", { name: "검색과 필터 지우기" }).click();
    await page.waitForFunction(
      () =>
        !new URLSearchParams(location.search).get("q") &&
        document.querySelector("input").value === "",
    );
    await page.getByLabel("어디에서", { exact: true }).selectOption("company");
    await page.waitForFunction(
      () =>
        document.querySelectorAll(".archive-record-kind").length > 0 &&
        [...document.querySelectorAll(".archive-record-kind")].every((element) =>
          element.textContent.startsWith("회사"),
        ),
    );
    assert.ok((await page.locator(".archive-record").count()) > 0);
    await page.getByRole("button", { name: "검색과 필터 지우기" }).click();
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({ path: `${output}/archive-${width}.png`, fullPage: false });
    // Query-specific initial requests all receive the same static /work HTML.
    // URL state must survive hydration/reload without React recoverable errors.
    for (const query of [
      "q=aRa",
      "collection=school",
      "type=experiment",
      "sort=name",
      "collection=personal&type=learning&sort=name",
      "q=missing-hydration-record",
    ]) {
      const expected = archiveRecords(portfolio.projects, new URLSearchParams(query));
      await page.goto(`${base}/work?${query}`, { waitUntil: "networkidle" });
      assert.equal(await page.locator(".archive-record").count(), expected.length, query);
      assert.deepEqual(
        await page
          .locator(".archive-record")
          .evaluateAll((links) => links.map((link) => link.getAttribute("href"))),
        expected.map((project) => `/work/${project.slug}`),
        query,
      );
      assert.equal(
        await page.getByRole("searchbox").inputValue(),
        new URLSearchParams(query).get("q") ?? "",
      );
      const beforeReload = page.url();
      await page.reload({ waitUntil: "networkidle" });
      assert.equal(page.url(), beforeReload);
      assert.equal(
        await page.locator(".archive-record").count(),
        expected.length,
        `reload ${query}`,
      );
    }
    results.push({
      width,
      count: portfolio.projects.length,
      directQueryChecks: 6,
      ...measurements,
    });
    await page.close();
  }
  const page = await browser.newPage({ viewport: { width: 390, height: 1000 } });
  for (const project of portfolio.projects) {
    await page.goto(`${base}/work/${project.slug}`, { waitUntil: "networkidle" });
    assert.equal((await page.locator("h1").textContent()).trim(), project.name);
    assert.ok((await page.locator("main").textContent()).includes(project.summary), project.slug);
    for (const section of project.sections ?? [])
      assert.ok(
        await page.locator(`[id="${section.id}"]`).count(),
        `${project.slug}#${section.id}`,
      );
    const width = await page.evaluate(() => document.documentElement.scrollWidth);
    assert.ok(width <= 391, `${project.slug} horizontal overflow ${width}`);
    if (!project.image && !project.screens?.length)
      assert.equal(await page.locator("main img").count(), 0);
    if (process.env.QA_STATIC_CHECK === "true") {
      const html = await readFile(
        new URL(`../build/client/work/${project.slug}/index.html`, import.meta.url),
        "utf8",
      );
      assert.ok(html.includes(project.name), `${project.slug} missing prerendered title`);
      assert.ok(html.includes('name="description"'), `${project.slug} missing metadata`);
    }
  }
  await page.goto(base, { waitUntil: "networkidle" });
  assert.ok((await page.locator('a[href="/work"]').count()) > 0);
  assert.equal(await page.locator(".other-work .rotation-batch .work-row").count(), 3);
  assert.equal(
    Number(await page.locator(".work-rotation").getAttribute("data-record-count")),
    portfolio.projects.filter((project) => !project.featured).length,
  );
  assert.equal(await page.locator(".selected-work > .featured").count(), 4);
  assert.equal(await page.locator(".home-company-stories article").count(), 3);
  assert.deepEqual(errors, []);
  await writeFile(
    `${output}/results.json`,
    JSON.stringify({ results, routeCount: portfolio.projects.length, errors }, null, 2),
  );
  console.log(
    JSON.stringify({ pass: true, base, results, routeCount: portfolio.projects.length, errors }),
  );
} finally {
  await browser.close();
}
