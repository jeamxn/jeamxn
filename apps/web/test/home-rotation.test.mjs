import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { portfolio } from "@jeamxn/core";
import {
  nextBatch,
  otherProjects,
  projectBatches,
  ROTATION_INTERVAL,
} from "../app/shared/lib/project-rotation.ts";

test("all 83 nonrepresentative records rotate in 28 complete batches with no six-record cap", () => {
  const records = otherProjects(portfolio.projects);
  const batches = projectBatches(records);
  assert.equal(records.length, 83);
  assert.equal(batches.length, 28);
  assert.deepEqual(
    batches.map((batch) => batch.length),
    [...Array(27).fill(3), 2],
  );
  assert.deepEqual(
    new Set(batches.flat().map((record) => record.slug)),
    new Set(records.map((record) => record.slug)),
  );
  assert.equal(batches.flat().length, 83);
  assert.ok(!batches.flat().some((record) => ["ara", "dipull", "pfct"].includes(record.slug)));
  assert.equal(ROTATION_INTERVAL, 3000);
});
test("every batch is reachable forward and backward, with safe empty and singleton handling", () => {
  for (const count of [0, 1, 28]) {
    assert.equal(nextBatch(0, -1, count), count ? count - 1 : 0);
    assert.equal(nextBatch(count - 1, 1, count), 0);
  }
  let index = 0;
  const seen = new Set();
  for (let step = 0; step < 28; step++) {
    seen.add(index);
    index = nextBatch(index, 1, 28);
  }
  assert.equal(seen.size, 28);
  assert.equal(index, 0);
  assert.deepEqual(projectBatches([]), []);
  assert.throws(() => projectBatches(portfolio.projects, 0), RangeError);
});
test("four representatives remain genuine projects plus a genuine activity", async () => {
  assert.deepEqual(
    portfolio.projects.filter((record) => record.featured).map((record) => record.slug),
    ["ara", "dipull", "pfct"],
  );
  assert.equal(portfolio.activities.find((activity) => activity.featured)?.slug, "kt-sat-ax");
  const source = await readFile(
    new URL("../app/feature/home/home-page.tsx", import.meta.url),
    "utf8",
  );
  assert.ok(source.includes("featured--pfct home-company"));
  assert.ok(source.includes("featured--kt-sat"));
  assert.ok(!source.includes("home-activity container"));
});
