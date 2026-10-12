import assert from "node:assert/strict";
import test from "node:test";
import { portfolioSchema } from "@jeamxn/contract";
import { createPublicKnowledge, portfolio } from "../dist/index.js";

test("public content validates and the assistant receives only the same public object", () => {
  assert.deepEqual(portfolioSchema.parse(portfolio), portfolio);
  assert.deepEqual(JSON.parse(createPublicKnowledge()), portfolio);
  assert.equal(new Set(portfolio.projects.map((p) => p.slug)).size, portfolio.projects.length);
  assert.deepEqual(
    portfolio.projects.filter((p) => p.featured).map((p) => p.slug),
    ["ara", "dipull"],
  );
});
test("public assets and links are safe and disclosure scope is explicit", () => {
  for (const p of portfolio.projects) {
    for (const link of p.links) {
      assert.match(link.href, /^https:\/\//);
    }
  }
  assert.match(portfolio.projects[0].status, /실험/);
  assert.match(portfolio.projects[1].status, /미확인/);
  assert.match(portfolio.projects.find((p) => p.slug === "yun").status, /가족/);
  const text = createPublicKnowledge();
  for (const bad of ["lily.pfct.kr", "/Users/", "threadId="])
    assert.equal(text.includes(bad), false);
});
