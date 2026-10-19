import assert from "node:assert/strict";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { chromium, webkit } from "playwright";

const base = (process.env.QA_BASE_URL ?? "http://127.0.0.1:5412").replace(/\/$/, "");
const basePath = new URL(base).pathname.replace(/\/$/, "");
const sitePath = (route) => `${basePath}${route}`;
const output = process.env.QA_OUTPUT ?? "test-results/resume";
await mkdir(output, { recursive: true });
const results = [];
for (const [engine, type] of [
  ["chromium", chromium],
  ["webkit", webkit],
]) {
  const browser = await type.launch({
    headless: true,
    ...(engine === "chromium" && process.env.QA_BROWSER_PATH
      ? { executablePath: process.env.QA_BROWSER_PATH }
      : {}),
  });
  try {
    for (const width of [390, 768, 1440]) {
      const page = await browser.newPage({
        viewport: { width, height: 1000 },
        acceptDownloads: true,
      });
      const errors = [];
      page.on("pageerror", (error) => errors.push(error.message));
      const response = await page.goto(`${base}/resume`, { waitUntil: "networkidle" });
      assert.equal(response.status(), 200);
      const works = page
        .locator(".resume-section")
        .filter({ has: page.getByRole("heading", { name: "주요 작업", exact: true }) });
      assert.deepEqual(
        await works
          .locator("h3 a")
          .evaluateAll((links) => links.map((link) => link.getAttribute("href"))),
        ["/work/ara", "/work/pfct", "/work/dipull"].map(sitePath),
      );
      assert.deepEqual(await works.locator(".resume-date").allTextContents(), [
        "2026 — 현재",
        "2024 — 현재",
        "2022 — 2025",
      ]);
      assert.equal(await works.locator(".resume-item").count(), 3);
      assert.equal(
        await page.locator(`.resume-item h3 a[href="${sitePath("/activity/kt-sat-ax")}"]`).count(),
        1,
      );
      assert.match(await page.locator(".resume-profile").innerText(), /행복하게.*개발자예요/u);
      assert.equal(
        await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1),
        false,
      );
      assert.equal(
        await page.getByRole("link", { name: "PDF 내려받기" }).getAttribute("href"),
        sitePath("/resume.pdf"),
      );
      const downloadPromise = page.waitForEvent("download");
      await page.getByRole("link", { name: "PDF 내려받기" }).click();
      const download = await downloadPromise;
      assert.equal(await download.failure(), null);
      assert.match(download.suggestedFilename(), /\.pdf$/u);
      await download.saveAs(`${output}/${engine}-${width}-resume.pdf`);
      const pdf = await readFile(`${output}/${engine}-${width}-resume.pdf`);
      assert.equal(pdf.subarray(0, 4).toString(), "%PDF");
      assert.ok(pdf.length > 2_000_000, "real embedded-font resume PDF");
      await page.screenshot({ path: `${output}/${engine}-${width}.png`, fullPage: true });
      assert.deepEqual(errors, []);
      results.push({
        engine,
        width,
        works: ["ara", "pfct", "dipull"],
        chronologicalStartDescending: true,
        lecturePreserved: true,
        realDownload: true,
        errors,
      });
      await page.close();
    }
  } finally {
    await browser.close();
  }
}
await writeFile(`${output}/results.json`, JSON.stringify({ base, passed: true, results }, null, 2));
console.log(JSON.stringify({ base, passed: true, checks: results.length, results }));
