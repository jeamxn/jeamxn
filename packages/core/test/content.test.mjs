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

test("case studies explain actual work rather than only listing credentials", () => {
  const bySlug = new Map(portfolio.projects.map((project) => [project.slug, project]));
  for (const slug of ["pfct", "ara", "dipull"]) {
    const sections = bySlug.get(slug).sections ?? [];
    assert.ok(sections.length >= 4, `${slug} needs real case-study sections`);
    assert.equal(new Set(sections.map((section) => section.id)).size, sections.length);
    assert.ok(sections.every((section) => section.paragraphs.length > 0));
    assert.ok(sections.flatMap((section) => section.paragraphs).join("").length > 1200);
  }
  const pfct = JSON.stringify(bySlug.get("pfct"));
  for (const topic of [/어드민/, /회의/, /권한/, /대시보드/]) assert.match(pfct, topic);
  assert.match(JSON.stringify(bySlug.get("ara")), /purpose/);
  assert.match(JSON.stringify(bySlug.get("dipull")), /세탁/);
});

test("KT SAT story includes practical instruction, human responsibility and the speaker's viewpoint", () => {
  const talk = portfolio.activities.find((activity) => activity.slug === "kt-sat-ax");
  assert.ok(talk);
  assert.ok(talk.sections.length >= 5);
  const story = JSON.stringify(talk);
  for (const topic of [/판단/, /보고서/, /Skill/, /Tool/, /검증/, /보안/, /질문/])
    assert.match(story, topic);
  assert.ok(story.length > 2000);
  assert.doesNotMatch(story, /추천으로 임직원 대상 생성형 AI와 업무 활용 강연을 진행했습니다/);
  assert.doesNotMatch(story, /이직.{0,20}(예정|예상)|기밀|api.?key|010-/i);
});
