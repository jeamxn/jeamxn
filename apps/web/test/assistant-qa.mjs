import assert from "node:assert/strict";
import { chromium } from "playwright";

const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({
  viewport: { width: 390, height: 844 },
  reducedMotion: "reduce",
});
const base = process.env.QA_BASE ?? "http://localhost:5410";
const results = [];
await page.goto(base, { waitUntil: "networkidle" });
await page.route("**/api/assistant/status", (route) => route.abort());
await page.locator(".assistant-trigger").click();
await page.getByText("서버 연결이 없어 미리 정리한 질문을 안내합니다.").waitFor();
await page.getByRole("button", { name: "ara는 어떻게 시작했나요?" }).click();
await page.locator(".message--assistant").waitFor();
assert.ok(
  (await page.locator(".message--assistant").innerText()).includes(
    "우리가 원하는 것을 직접 만들어보자",
  ),
);
assert.ok((await page.locator(".message--assistant").innerText()).includes("공개 내용 안내"));
results.push("offline explicitly labeled canned public FAQ");
await page.keyboard.press("Escape");
await page.unroute("**/api/assistant/status");
await page.route("**/api/assistant/status", (route) =>
  route.fulfill({
    status: 200,
    contentType: "application/json",
    body: JSON.stringify({ mode: "ai", label: "AI" }),
  }),
);
await page.locator(".assistant-trigger").click();
await page.getByText("AI가 공개된 소개와 프로젝트를 바탕으로 답합니다.").waitFor();
await page.getByRole("button", { name: "새 대화", exact: true }).click();
await page.route("**/api/assistant/chat", async (route) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  await route.fulfill({ status: 429, body: "{}" });
});
await page.locator("#assistant-question").fill("실패를 테스트합니다");
await page.locator(".send-button").click();
assert.equal(await page.locator(".send-button").isDisabled(), true);
await page.getByText("공개 내용에서 답변을 찾고 있습니다…").waitFor();
await page.getByRole("alert").waitFor();
assert.ok((await page.getByRole("alert").innerText()).includes("잠시 뒤 다시"));
assert.equal(await page.locator("#assistant-question").inputValue(), "실패를 테스트합니다");
results.push("AI loading state and 429 retry direction preserve draft");
await page.unroute("**/api/assistant/chat");
await page.route("**/api/assistant/chat", async (route) => {
  const payload = route.request().postDataJSON();
  assert.ok(payload.messages.length <= 10);
  assert.ok(payload.messages.reduce((sum, message) => sum + message.content.length, 0) <= 6000);
  await route.fulfill({
    status: 200,
    contentType: "application/json",
    body: JSON.stringify({
      answer:
        "## 공개 응답\n\n[안전한 링크](/work/ara)\n\n[막힌 링크](javascript:alert(1))\n\n<script>alert(1)</script>\n\n![이미지](https://example.com/private.png)",
      sources: [{ label: "ara", href: "/work/ara" }],
      mode: "ai",
    }),
  });
});
for (let count = 0; count < 10; count++) {
  await page.locator("#assistant-question").fill(`질문 ${count + 1}`);
  await page.locator(".send-button").click();
  await page.waitForFunction(
    (n) => document.querySelectorAll(".message--assistant").length === n,
    count + 1,
  );
}
assert.equal(await page.locator(".send-button").isDisabled(), true);
assert.equal(await page.locator("#assistant-question").isDisabled(), true);
assert.equal(await page.locator(".message script, .message img").count(), 0);
assert.equal(
  await page.getByRole("link", { name: "막힌 링크", exact: true }).first().getAttribute("href"),
  "#",
);
results.push("10-question and 10-wire-message caps; Markdown HTML/images/executable URL rejected");
await page.getByRole("button", { name: "새 대화", exact: true }).click();
assert.equal(await page.locator(".message").count(), 0);
assert.equal(await page.locator("#assistant-question").isDisabled(), false);
await page.keyboard.press("Escape");
await page.goto(`${base}/work/not-a-project`, { waitUntil: "networkidle" });
assert.ok((await page.locator("h1").innerText()).includes("찾지 못했습니다"));
results.push("reset restores controls; missing project helpful state");
await page.goto(base, { waitUntil: "networkidle" });
await page.unroute("**/api/assistant/chat");
await page.route("**/api/assistant/chat", async (route) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  await route
    .fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ answer: "closed request", sources: [], mode: "ai" }),
    })
    .catch(() => {});
});
await page.locator(".assistant-trigger").click();
await page.getByRole("button", { name: "ara는 어떻게 시작했나요?" }).click();
await page.keyboard.press("Escape");
await page.waitForTimeout(1200);
await page.locator(".assistant-trigger").click();
assert.equal(await page.locator(".message").count(), 0);
results.push("closed request aborted; reopening does not append old answer");
await browser.close();
console.log(JSON.stringify({ assistantScenarios: results }, null, 2));
