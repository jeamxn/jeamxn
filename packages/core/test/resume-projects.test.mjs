import assert from "node:assert/strict";
import { test } from "node:test";
import { portfolio, projectStartYear, resumeProjects } from "../dist/index.js";

test("resume keeps only ara, PFCT and Dipull, newest start first", () => {
  assert.deepEqual(
    resumeProjects(portfolio.projects).map((project) => project.slug),
    ["ara", "pfct", "dipull"],
  );
  assert.deepEqual(
    resumeProjects([...portfolio.projects].reverse()).map((project) => project.slug),
    ["ara", "pfct", "dipull"],
  );
});
test("start sorting uses the first year, not the end year or current status", () => {
  assert.equal(projectStartYear({ period: "2022 — 2025" }), 2022);
  assert.equal(projectStartYear({ period: "2024 — 현재" }), 2024);
  assert.equal(projectStartYear({ period: "2026 기록" }), 2026);
  assert.equal(projectStartYear({ period: "시기 미확인" }), Number.NEGATIVE_INFINITY);
});
test("resume projection never changes shared data, flags or the 86-record archive", () => {
  const before = JSON.stringify(portfolio);
  resumeProjects(portfolio.projects);
  assert.equal(JSON.stringify(portfolio), before);
  assert.equal(portfolio.projects.length, 86);
  assert.equal(portfolio.projects.filter((project) => !project.featured).length, 83);
  assert.equal(
    portfolio.activities.some((activity) => activity.slug === "kt-sat-ax" && activity.featured),
    true,
  );
});
