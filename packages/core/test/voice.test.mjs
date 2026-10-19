import assert from "node:assert/strict";
import { test } from "node:test";
import { portfolio } from "../dist/index.js";

function storyStrings(project) {
  return [
    project.subtitle,
    project.summary,
    project.lead,
    ...(project.overview ?? []),
    ...(project.highlights ?? []).flatMap((item) => [item.title, item.body]),
    ...(project.sections ?? []).flatMap((item) => [item.title, ...item.paragraphs]),
  ].filter(Boolean);
}
test("the owner's narrative is conversational 해요체, not a corporate report", () => {
  const strings = [
    portfolio.profile.intro,
    ...portfolio.profile.about,
    ...portfolio.projects.flatMap(storyStrings),
    ...portfolio.experience.map((item) => item.description),
    ...portfolio.activities.flatMap((item) => [
      item.description,
      item.lead,
      ...(item.sections ?? []).flatMap((section) => [section.title, ...section.paragraphs]),
    ]),
  ].filter(Boolean);
  assert.ok(strings.length > 600);
  for (const text of strings) assert.doesNotMatch(text, /(?:습니다|합니다|입니다)[.!]?/u);
  const dipull = portfolio.projects.find((project) => project.slug === "dipull");
  assert.match(dipull.lead, /불편|기상송|세탁/u);
  assert.match(portfolio.profile.intro, /행복하게.*개발자예요/u);
});
test("friendlier voice retains shared authorship, experimental status and historical limits", () => {
  const bySlug = new Map(portfolio.projects.map((project) => [project.slug, project]));
  assert.match(JSON.stringify(bySlug.get("ara")), /성민.{0,40}구현/u);
  assert.match(bySlug.get("ara").status, /두 사람|두 사람|두 사람이/u);
  const dipull = JSON.stringify(bySlug.get("dipull"));
  assert.match(dipull, /200/u);
  assert.match(dipull, /현재.{0,50}아니|지금.{0,50}아니/u);
  assert.match(bySlug.get("dipull").status, /후배 인계.*미확인/u);
  assert.match(JSON.stringify(bySlug.get("dbad-korean")), /병합.{0,20}않/u);
  assert.match(JSON.stringify(bySlug.get("side-gig-prep")), /매출.{0,40}아니/u);
  assert.match(JSON.stringify(bySlug.get("bizmeka-mcp")), /공식.{0,40}아니/u);
});

// Inspect factual public copy locally; there is no assistant runtime/export.
const publicContent = () =>
  JSON.stringify(portfolio, (key, value) => (key === "draftThought" ? undefined : value));

test("DPD is Internal work, while AX covers Lily, MCP and sharing without invented dates", () => {
  const internal = portfolio.experience.find((item) => item.team === "Internal Squad");
  const ax = portfolio.experience.find((item) => item.team === "AX Squad");
  assert.match(internal.description, /DPD/u);
  assert.doesNotMatch(ax.description, /DPD/u);
  assert.match(ax.description, /Lily/u);
  assert.match(ax.description, /MCP/u);
  assert.match(ax.description, /발표/u);
  assert.equal(internal.period, "2025.07 — 2025.12");
  const pfct = portfolio.projects.find((project) => project.slug === "pfct");
  for (const id of [
    "admin-foundation",
    "internal-security",
    "dpd-workspace",
    "ax-workflow",
    "ax-sharing",
  ])
    assert.ok(pfct.sections.find((section) => section.id === id));
  assert.match(
    pfct.sections.find((section) => section.id === "dpd-workspace").paragraphs.join(" "),
    /Internal/u,
  );
});
test("draft thoughts are explicit optional fields and not part of the factual public-copy projection", () => {
  const thoughts = portfolio.projects
    .flatMap((project) => project.sections ?? [])
    .filter((section) => section.draftThought);
  assert.ok(thoughts.length >= 7);
  assert.ok(thoughts.length <= 12);
  const knowledge = publicContent();
  assert.doesNotMatch(knowledge, /draftThought/u);
  for (const section of thoughts) assert.ok(!knowledge.includes(section.draftThought));
});

test("personal project and external activity stories do not borrow PFCT work", () => {
  const companyProducts =
    /\bpfct\b|\blily\b|릴리(?!스)|피플펀드|peoplefund|Credit Planet|Internal Squad|AX Squad/iu;
  for (const project of portfolio.projects.filter((item) => item.slug !== "pfct")) {
    assert.doesNotMatch(JSON.stringify(project), companyProducts, project.slug);
  }
  for (const activity of portfolio.activities) {
    assert.doesNotMatch(JSON.stringify(activity), companyProducts, activity.slug ?? activity.title);
  }
  const ara = portfolio.projects.find((project) => project.slug === "ara");
  const origin = ara.sections.find((section) => section.id === "starting-together");
  assert.match(origin.paragraphs.join(" "), /Hermes Agent와 Claude Code, Codex/u);
  assert.match(JSON.stringify(ara), /제 아이디어를 성민이 구현/u);
  const pfct = portfolio.projects.find((project) => project.slug === "pfct");
  assert.match(JSON.stringify(pfct), /Lily/u);
});
