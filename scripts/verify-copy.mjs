import assert from "node:assert/strict";
import { portfolio } from "../packages/core/dist/index.js";

function collect(value) {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(collect);
  if (value !== null && typeof value === "object") return Object.values(value).flatMap(collect);
  return [];
}
const text = collect(portfolio).join("\n");
assert.doesNotMatch(text, /[‘’]/u);
for (const value of collect(portfolio))
  for (const match of value.matchAll(/·/gu)) {
    const i = match.index;
    assert.equal(value[i - 1], " ");
    assert.equal(value[i + 1], " ");
    assert.notEqual(value[i - 2], " ");
    assert.notEqual(value[i + 2], " ");
  }
assert.match(text, /일정 \/ 회의실/u);
assert.ok(text.includes("'"));
console.log(
  JSON.stringify({
    passed: true,
    publicStrings: collect(portfolio).length,
    records: portfolio.projects.length,
  }),
);
