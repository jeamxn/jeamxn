import assert from "node:assert/strict";
import { test } from "node:test";
import { Valkey } from "iovalkey";
import { createApp } from "../dist/app.js";
import { readConfig } from "../dist/shared/config.js";

const endpoint = process.env.JEAMXN_TEST_VALKEY_URL;
// Explicit dedicated store opt-in only; default suite never touches a shared app DB.
// Run with a new empty Valkey instance, as documented in the parent report.
test("actual Valkey enforces atomic quota across two Nest replicas", {
  skip: !endpoint,
}, async () => {
  const client = new Valkey(endpoint, { maxRetriesPerRequest: 0 });
  const apps = [];
  try {
    await client.ping();
    // Refuse an occupied test store instead of flushing another application's data.
    assert.equal(
      await client.dbsize(),
      0,
      "JEAMXN_TEST_VALKEY_URL must point to a fresh dedicated store",
    );
    const config = readConfig({
      JEAMXN_PUBLIC_ORIGIN: "https://jeamxn.dev",
      VALKEY_URL: endpoint,
      AI_REQUIRE_VALKEY: "true",
      AI_GLOBAL_LIMIT: "3",
      AI_GLOBAL_DAILY_LIMIT: "3",
      AI_PEER_LIMIT: "60",
      AI_CONCURRENCY: "4",
    });
    for (let i = 0; i < 2; i++) {
      const app = await createApp(config);
      await app.listen(0, "127.0.0.1");
      apps.push(app);
    }
    const ask = (app) =>
      fetch(`http://127.0.0.1:${app.getHttpServer().address().port}/api/assistant/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Origin: "https://jeamxn.dev" },
        body: JSON.stringify({ messages: [{ role: "user", content: "ara 프로젝트" }] }),
      });
    const requests = await Promise.all(Array.from({ length: 8 }, (_, i) => ask(apps[i % 2])));
    assert.equal(requests.filter((response) => response.status === 201).length, 3);
    const rejected = requests.filter((response) => response.status === 429);
    assert.equal(rejected.length, 5);
    assert.ok(rejected.every((response) => Number(response.headers.get("retry-after")) >= 1));
    const active = await client.zcard("jeamxn:{assistant}:v1:active");
    assert.equal(active, 0);
    // A configured-but-disconnected store never silently switches to memory.
    const limiter = apps[0].get(
      (await import("../dist/assistant/assistant.limiter.js")).AssistantLimiter,
    );
    limiter.onModuleDestroy();
    const failed = await ask(apps[0]);
    assert.equal(failed.status, 503);
    assert.equal(failed.headers.get("retry-after"), "30");
  } finally {
    for (const app of apps.reverse()) await app.close();
    client.disconnect();
  }
});
