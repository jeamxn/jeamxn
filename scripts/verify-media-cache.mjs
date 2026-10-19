import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import { chromium } from "playwright";
import { portfolio } from "../packages/core/dist/index.js";

const screen = portfolio.projects.find((project) => project.slug === "dipull").screens[0];
const current = await fs.readFile(
  path.resolve(import.meta.dirname, `../apps/web/public${screen.src}`),
);
const old = Buffer.from(
  '<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="1000"><rect width="1440" height="1000" fill="white"/></svg>',
);
let updated = false;
const hits = [];
const server = http.createServer((request, response) => {
  hits.push(request.url);
  if (request.url.startsWith("/images/")) {
    const fresh = updated || request.url.includes(".newhash.");
    response.setHeader("Cache-Control", "public,max-age=3600");
    response.setHeader("Content-Type", fresh ? "image/webp" : "image/svg+xml");
    response.end(fresh ? current : old);
  } else {
    response.setHeader("Cache-Control", "no-store");
    response.setHeader("Content-Type", "text/html");
    response.end(
      `<html><body><img src="${request.url.includes("changed-url") ? "/images/dipull.newhash.webp" : "/images/dipull-preview.webp"}"></body></html>`,
    );
  }
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const base = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({
  headless: true,
  ...(process.env.QA_BROWSER_PATH ? { executablePath: process.env.QA_BROWSER_PATH } : {}),
});
try {
  const page = await browser.newPage();
  await page.goto(`${base}/before`, { waitUntil: "networkidle" });
  assert.equal(await page.locator("img").evaluate((image) => image.naturalHeight), 1000);
  updated = true;
  await page.goto(`${base}/after-same-url`, { waitUntil: "networkidle" });
  assert.equal(await page.locator("img").evaluate((image) => image.naturalHeight), 1000);
  await page.goto(`${base}/changed-url`, { waitUntil: "networkidle" });
  assert.equal(await page.locator("img").evaluate((image) => image.naturalHeight), screen.height);
  assert.equal(hits.filter((url) => url === "/images/dipull-preview.webp").length, 1);
  const digest = crypto.createHash("sha256").update(current).digest("hex").slice(0, 12);
  assert.ok(screen.src.endsWith(`.${digest}.webp`));
  console.log(
    JSON.stringify({
      passed: true,
      oldCachedHeight: 1000,
      newHeight: screen.height,
      selectedNewURL: screen.src,
    }),
  );
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}
