import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { chromium, webkit } from "playwright";

const base = (process.env.QA_BASE_URL ?? process.env.QA_BASE ?? "http://localhost:5410").replace(
  /\/$/,
  "",
);
const basePath = new URL(base).pathname.replace(/\/$/, "");
const sitePath = (route) => `${basePath}${route}`;
const output = process.env.QA_OUTPUT ?? "/tmp/jeamxn-menu-qa";
await mkdir(output, { recursive: true });
const results = [];
const faults = [];

function centered(box, width, height, gutter) {
  assert.ok(box, "menu has a visible bounding box");
  assert.ok(Math.abs(box.x + box.width / 2 - width / 2) <= 1, "horizontal center");
  assert.ok(Math.abs(box.y + box.height / 2 - height / 2) <= 1, "vertical center");
  assert.ok(box.x >= gutter - 1 && box.y >= 19, "viewport edge clearance");
  assert.ok(box.width <= Math.min(500, width - gutter * 2) + 1, "bounded card width");
  assert.ok(box.x + box.width <= width - gutter + 1, "right edge clearance");
  assert.ok(box.y + box.height <= height - 19, "bottom edge clearance");
}

for (const [engine, driver] of Object.entries({ chromium, webkit })) {
  const browser = await driver.launch({
    headless: true,
    ...(engine === "chromium" && process.env.QA_BROWSER_PATH
      ? { executablePath: process.env.QA_BROWSER_PATH }
      : {}),
  });
  try {
    for (const width of [390, 768, 1440]) {
      const height = 1000;
      const page = await browser.newPage({
        viewport: { width, height },
        deviceScaleFactor: 1,
        reducedMotion: "reduce",
      });
      page.on("pageerror", (error) => faults.push({ engine, width, error: error.message }));
      try {
        await page.goto(`${base}/work`, { waitUntil: "networkidle" });
        await page.evaluate(() => document.fonts.ready);
        const trigger = page.getByRole("button", { name: "메뉴 열기", exact: true });
        const menu = page.locator(".menu-modal");
        const close = page.getByRole("button", { name: "메뉴 닫기", exact: true });
        const before = await page.evaluate(() => ({
          overflow: document.body.style.overflow,
          padding: document.body.style.paddingRight,
        }));
        async function open(mode = "pointer") {
          if (mode === "keyboard") {
            await trigger.focus();
            await page.keyboard.press("Enter");
          } else {
            await trigger.click();
          }
          await page.locator(".menu-modal[open]").waitFor();
          assert.equal(await trigger.getAttribute("aria-expanded"), "true");
          assert.equal(await close.evaluate((element) => element === document.activeElement), true);
          assert.equal(await page.evaluate(() => document.body.style.overflow), "hidden");
        }
        async function closed() {
          await page.waitForFunction(() => !document.querySelector(".menu-modal")?.open);
          assert.equal(await trigger.getAttribute("aria-expanded"), "false");
          assert.equal(
            await trigger.evaluate((element) => element === document.activeElement),
            true,
          );
          assert.deepEqual(
            await page.evaluate(() => ({
              overflow: document.body.style.overflow,
              padding: document.body.style.paddingRight,
            })),
            before,
          );
        }
        // Pointer opening must work without keyboard assistance too.
        await trigger.click();
        await page.locator(".menu-modal[open]").waitFor();
        assert.equal(await close.evaluate((element) => element === document.activeElement), true);
        centered(await menu.boundingBox(), width, height, width <= 767 ? 12 : 20);
        await close.click();
        await closed();
        await open("keyboard");
        const box = await menu.boundingBox();
        centered(box, width, height, width <= 767 ? 12 : 20);
        assert.equal(await menu.getAttribute("aria-labelledby"), "menu-title");
        assert.equal(await menu.getByRole("heading", { name: "둘러보기" }).count(), 1);
        const links = menu.locator("nav > a");
        assert.deepEqual(await links.allTextContents(), ["이력", "작업 기록", "연락하기"]);
        assert.deepEqual(
          await links.evaluateAll((elements) =>
            elements.map((element) => element.getAttribute("href")),
          ),
          [
            sitePath("/resume"),
            sitePath("/work"),
            await page.locator(".footer-email").getAttribute("href"),
          ],
        );
        const focusable = menu.locator("button, a[href]");
        assert.equal(await focusable.count(), 4);
        for (const element of await focusable.all()) {
          const hit = await element.boundingBox();
          assert.ok(hit.width >= 44 && hit.height >= 44, "44px pointer targets");
        }
        // Full forward cycle and both end wraps must stay inside the native dialog.
        for (let index = 1; index <= 4; index++) {
          await page.keyboard.press("Tab");
          assert.equal(
            await focusable
              .nth(index % 4)
              .evaluate((element) => element === document.activeElement),
            true,
          );
        }
        await page.keyboard.press("Shift+Tab");
        assert.equal(
          await links.last().evaluate((element) => element === document.activeElement),
          true,
        );
        await page.keyboard.press("Tab");
        assert.equal(await close.evaluate((element) => element === document.activeElement), true);
        const y = await page.evaluate(() => scrollY);
        await page.mouse.move(5, 5);
        await page.mouse.wheel(0, 500);
        await page.waitForTimeout(150);
        assert.equal(await page.evaluate(() => scrollY), y, "background stays scroll locked");
        // Padding is part of the card, not the backdrop.
        await page.mouse.click(box.x + 8, box.y + 8);
        assert.equal(await menu.evaluate((element) => element.open), true);
        await page.screenshot({ path: `${output}/after-${engine}-${width}.png` });
        await page.keyboard.press("Escape");
        await closed();
        await open();
        await close.click();
        await closed();
        await open();
        await page.mouse.click(5, 5);
        await closed();
        await open();
        await menu.getByRole("link", { name: "이력", exact: true }).click();
        await page.waitForURL((url) => url.pathname.replace(/\/$/, "") === sitePath("/resume"));
        await closed();
        assert.equal(new URL(page.url()).pathname.replace(/\/$/, ""), sitePath("/resume"));
        await open();
        await menu.getByRole("link", { name: "작업 기록", exact: true }).click();
        await page.waitForURL((url) => url.pathname.replace(/\/$/, "") === sitePath("/work"));
        await closed();
        results.push({
          engine,
          width,
          height,
          box,
          checks:
            "pointer-and-keyboard-open/center/gutters/44px/tab/escape/button/backdrop/padding/pointer-and-keyboard-focus/scroll/navigation",
        });
      } finally {
        await page.close();
      }
    }
  } finally {
    await browser.close();
  }
}
assert.deepEqual(faults, [], "no browser exceptions");
await writeFile(`${output}/results.json`, JSON.stringify({ base, results, faults }, null, 2));
console.log(JSON.stringify({ base, passed: results.length, results, faults }, null, 2));
