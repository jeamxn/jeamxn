import assert from "node:assert/strict";
import { test } from "node:test";
import { portfolio, resumeProjects } from "@jeamxn/core";
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
  const selected = resumeProjects(portfolio.projects);
  assert.deepEqual(records.slice(0, selected.length), selected);
  const rest = records.slice(selected.length);
  assert.ok(
    rest.every(
      (project, index) => !index || observedYear(rest[index - 1]) >= observedYear(project),
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

test("resume-selected works stay pinned in the same order under both archive sorts", () => {
  const pinned = resumeProjects(portfolio.projects).map((project) => project.slug);
  assert.deepEqual(pinned, ["ara", "pfct", "dipull"]);
  for (const sort of ["recent", "name"]) {
    const records = archiveRecords(portfolio.projects, new URLSearchParams({ sort }));
    assert.deepEqual(
      records.slice(0, pinned.length).map((project) => project.slug),
      pinned,
    );
    const rest = records.slice(pinned.length);
    assert.ok(rest.every((project) => !pinned.includes(project.slug)));
    if (sort === "name")
      assert.deepEqual(
        rest.map((project) => project.name),
        rest.map((project) => project.name).toSorted((a, b) => a.localeCompare(b, "ko")),
      );
  }
});

test("pinning never bypasses query, collection or type filters", () => {
  const selected = resumeProjects(portfolio.projects);
  for (const params of [
    new URLSearchParams({ q: "missing-pinned-project" }),
    new URLSearchParams({ q: "dipull", sort: "name" }),
    new URLSearchParams({ collection: "company" }),
    new URLSearchParams({ collection: "school" }),
    new URLSearchParams({ type: "experiment" }),
  ]) {
    const result = archiveRecords(portfolio.projects, params);
    const expected = selected.filter((project) => archiveRecords([project], params).length);
    assert.deepEqual(
      result.slice(0, expected.length).map((project) => project.slug),
      expected.map((project) => project.slug),
    );
    for (const project of selected)
      assert.equal(
        result.some((record) => record.slug === project.slug),
        expected.includes(project),
      );
    assert.equal(new Set(result.map((project) => project.slug)).size, result.length);
  }
});
