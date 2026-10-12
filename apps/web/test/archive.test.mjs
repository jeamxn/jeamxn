import assert from "node:assert/strict";
import { test } from "node:test";
import { portfolio } from "@jeamxn/core";
import {
  archiveRecords,
  observedYear,
  projectCollection,
  projectRecordType,
} from "../app/shared/lib/work-archive.ts";

test("archive exposes every public record by default, with no featured or six-item cap", () => {
  const records = archiveRecords(portfolio.projects, new URLSearchParams());
  assert.equal(records.length, portfolio.projects.length);
  assert.deepEqual(
    new Set(records.map((project) => project.slug)),
    new Set(portfolio.projects.map((project) => project.slug)),
  );
  assert.ok(
    records.every(
      (project, index) => !index || observedYear(records[index - 1]) >= observedYear(project),
    ),
  );
});
test("case-insensitive multiword search uses name, summary, role, tags, period and status", () => {
  const seed = portfolio.projects[0];
  const projects = [
    {
      ...seed,
      slug: "filter-check",
      name: "Sample",
      summary: "학교 생활",
      tags: ["TypeScript"],
      role: "공동 개발",
      period: "2022 기록",
      status: "보관된 실험",
    },
  ];
  for (const q of ["sample", "학교 TYPESCRIPT", "공동 2022", "보관된 실험"])
    assert.equal(archiveRecords(projects, new URLSearchParams({ q })).length, 1);
  assert.equal(archiveRecords(projects, new URLSearchParams({ q: "없는 검색어" })).length, 0);
});
test("collection and record type filters reflect metadata independently", () => {
  for (const project of portfolio.projects) {
    const params = new URLSearchParams({
      collection: projectCollection(project),
      type: projectRecordType(project),
    });
    const result = archiveRecords(portfolio.projects, params);
    assert.ok(result.some((record) => record.slug === project.slug));
    assert.ok(
      result.every(
        (record) =>
          projectCollection(record) === projectCollection(project) &&
          projectRecordType(record) === projectRecordType(project),
      ),
    );
  }
});
