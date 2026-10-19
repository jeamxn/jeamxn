import assert from "node:assert/strict";
import test from "node:test";
import { safeHref } from "../app/shared/lib/meta.ts";

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
