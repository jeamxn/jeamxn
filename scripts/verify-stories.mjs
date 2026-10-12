import assert from "node:assert/strict";
import fs from "node:fs/promises";
import { chromium } from "playwright";

const base = process.env.QA_BASE_URL ?? "http://127.0.0.1:5410";
const output = process.env.QA_OUTPUT ?? "test-results/stories";
const browser = await chromium.launch({
  headless: true,
  ...(process.env.QA_BROWSER_PATH ? { executablePath: process.env.QA_BROWSER_PATH } : {}),
});
await fs.mkdir(output, { recursive: true });
const results = [];
try {
  for (const width of [390, 768, 1440]) {
    const page = await browser.newPage({
      viewport: { width, height: 900 },
      reducedMotion: "reduce",
    });
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    for (const route of ["/work/pfct", "/work/ara", "/work/dipull", "/activity/kt-sat-ax"]) {
      await page.goto(`${base}${route}`, { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts.ready);
      const details = await page.evaluate(() => ({
        sectionCount: document.querySelectorAll(".story-section").length,
        prose: [...document.querySelectorAll(".story-section p")]
          .map((p) => p.textContent)
          .join("\n"),
        contents: [...document.querySelectorAll(".story-contents a")].map((a) => ({
          target: a.hash,
          exists: Boolean(document.getElementById(a.hash.slice(1))),
        })),
        horizontalOverflow: document.documentElement.scrollWidth - innerWidth,
      }));
      assert.ok(details.sectionCount >= 4, `${route} needs real sections`);
      assert.ok(details.prose.length > 1200, `${route} is still a credential-sized description`);
      assert.ok(
        details.contents.every((item) => item.exists),
        `${route} broken story navigation`,
      );
      assert.ok(details.horizontalOverflow <= 1, `${route} overflowing`);
      if (route === "/work/pfct") {
        for (const topic of [/어드민/, /회의/, /동료/, /권한/]) assert.match(details.prose, topic);
      }
      if (route === "/activity/kt-sat-ax") {
        for (const topic of [/판단|의사결정/, /실습/, /Skill/, /Tool/, /검증/, /내 이름/])
          assert.match(details.prose, topic);
      }
      assert.deepEqual(errors, []);
      await page.screenshot({
        path: `${output}/${route.slice(1).replaceAll("/", "-")}-${width}.png`,
        fullPage: true,
      });
      results.push({
        route,
        width,
        sectionCount: details.sectionCount,
        characters: details.prose.length,
        anchors: details.contents.length,
      });
    }
    await page.close();
  }
  await fs.writeFile(`${output}/report.json`, `${JSON.stringify(results, null, 2)}\n`);
  console.log(JSON.stringify({ passed: true, storyChecks: results.length, results }, null, 2));
} finally {
  await browser.close();
}
