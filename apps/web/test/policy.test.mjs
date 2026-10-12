import assert from "node:assert/strict";
import test from "node:test";
import {
  chatContext,
  MAX_CONTEXT_CHARACTERS,
  MAX_CONTEXT_MESSAGES,
  MAX_INPUT,
  questionError,
} from "../app/feature/assistant/policy.ts";
import { safeHref } from "../app/shared/lib/meta.ts";

test("question validation rejects empty and excessive content", () => {
  assert.ok(questionError("  "));
  assert.ok(questionError("a".repeat(MAX_INPUT + 1)));
  assert.equal(questionError("ara는 어떤 프로젝트인가요?"), "");
});
test("chat history is capped, wire content bounded, question retained", () => {
  const history = Array.from({ length: 28 }, (_, index) => ({
    role: index % 2 ? "assistant" : "user",
    content: "a".repeat(2300),
  }));
  const result = chatContext(history, "  새 질문  ");
  assert.ok(result.length <= MAX_CONTEXT_MESSAGES);
  assert.ok(
    result.reduce((sum, message) => sum + message.content.length, 0) <= MAX_CONTEXT_CHARACTERS,
  );
  assert.equal(result[0].role, "user");
  assert.equal(result.at(-1).content, "새 질문");
  assert.equal(result.at(-1).role, "user");
  assert.ok(result.every((message) => message.content.length <= 1800));
});
test("public links reject executable, protocol-relative and non-HTTPS URLs", () => {
  for (const url of [
    "javascript:alert(1)",
    "data:text/html,test",
    "//evil.example",
    "http://example.com",
    "invalid",
    "mailto:other@example.com",
    "mailto:me@jeamxn.dev?subject=untrusted",
    "/\\evil.example",
    "https://user:password@example.com",
    "/test\u0000",
  ])
    assert.equal(safeHref(url), "#");
  assert.equal(safeHref("/work/ara"), "/work/ara");
  assert.equal(safeHref("mailto:me@jeamxn.dev"), "mailto:me@jeamxn.dev");
  assert.equal(safeHref("https://github.com/jeamxn"), "https://github.com/jeamxn");
});

test("chat context preserves ordered recent messages and bounds the latest question", () => {
  const history = [
    { role: "user", content: "old question" },
    { role: "assistant", content: "old answer" },
    { role: "user", content: "recent question" },
    { role: "assistant", content: "recent answer" },
  ];
  assert.deepEqual(chatContext(history, "new question"), [
    ...history,
    { role: "user", content: "new question" },
  ]);
  const result = chatContext(history, "x".repeat(2000));
  assert.equal(result.at(-1).content.length, MAX_INPUT);
  assert.deepEqual(chatContext([], " latest "), [{ role: "user", content: "latest" }]);
});
