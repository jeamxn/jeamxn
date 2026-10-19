import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { test } from "node:test";
import { basePath, siteUrl } from "../scripts/static-config.mjs";

test("public build base is explicit and cannot escape the artifact", () => {
  assert.equal(basePath("/"), "/");
  assert.equal(basePath("/jeamxn"), "/jeamxn/");
  assert.equal(basePath("/jeamxn/"), "/jeamxn/");
  for (const input of [
    "../x",
    "/../x/",
    "//host/",
    "/a\\b",
    "/a?q=1",
    "/a#b",
    "https://example.com",
  ])
    assert.throws(() => basePath(input));
  assert.equal(siteUrl("https://jeamxn.github.io/jeamxn/"), "https://jeamxn.github.io/jeamxn");
  for (const input of [
    "javascript:alert(1)",
    "https://user:pass@example.com",
    "https://example.com?q=1",
  ])
    assert.throws(() => siteUrl(input));
});
test("the workspace has no backend, AI runtime or API client package", async () => {
  assert.deepEqual(
    (await readdir(new URL("../apps/", import.meta.url)))
      .filter((name) => !name.startsWith("."))
      .sort(),
    ["web"],
  );
  const packages = await readdir(new URL("../packages/", import.meta.url));
  assert.ok(!packages.includes("api"));
  assert.ok(packages.includes("resume-pdf"));
  const contract = await readFile(
    new URL("../packages/contract/src/index.ts", import.meta.url),
    "utf8",
  );
  assert.doesNotMatch(contract, /chatRequestSchema|chatResponseSchema|assistantStatusSchema/);
  const lock = await readFile(new URL("../pnpm-lock.yaml", import.meta.url), "utf8");
  assert.doesNotMatch(lock, /@nestjs\/|iovalkey|openai:/);
  const compose = await readFile(new URL("../docker-compose.yml", import.meta.url), "utf8");
  assert.doesNotMatch(compose, /^ {2}(?:server|valkey):|AI_API_KEY|VALKEY_URL/m);
});
test("Pages deploys only the verified static artifact and requires no service secrets", async () => {
  const workflow = await readFile(
    new URL("../.github/workflows/pages.yml", import.meta.url),
    "utf8",
  );
  for (const action of [
    "actions/configure-pages@",
    "actions/upload-pages-artifact@",
    "actions/deploy-pages@",
  ])
    assert.ok(workflow.includes(action));
  assert.match(workflow, /path: apps\/web\/build\/client/);
  assert.doesNotMatch(workflow, /secrets\.|AI_API_KEY|server:3000|auto.?enable/i);
  assert.match(workflow, /pages: write/);
  assert.match(workflow, /id-token: write/);
});
