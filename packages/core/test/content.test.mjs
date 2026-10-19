import assert from "node:assert/strict";
import test from "node:test";
import { portfolioSchema } from "@jeamxn/contract";
import { portfolio } from "../dist/index.js";

// Inspect factual public copy locally; there is no assistant runtime/export.
const publicContent = () => JSON.stringify(portfolio);

test("public content validates without changing its approved project structure", () => {
  assert.deepEqual(portfolioSchema.parse(portfolio), portfolio);
  assert.equal(new Set(portfolio.projects.map((p) => p.slug)).size, portfolio.projects.length);
  assert.deepEqual(
    portfolio.projects.filter((p) => p.featured).map((p) => p.slug),
    ["ara", "dipull", "pfct"],
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
  const text = publicContent();
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

test("product screens have byte-versioned URLs and correct native dimensions", () => {
  for (const slug of ["ara", "dipull"]) {
    const project = portfolio.projects.find((item) => item.slug === slug);
    assert.ok(project.screens.length >= (slug === "ara" ? 6 : 9));
    assert.equal(new Set(project.screens.map((screen) => screen.id)).size, project.screens.length);
    assert.ok(project.screens.some((screen) => screen.src === project.image));
    assert.ok(project.cover.width >= project.cover.height);
    for (const screen of project.screens) {
      assert.match(screen.src, /^\/images\/[a-z0-9-]+\.[a-f0-9]{12}\.webp$/);
      assert.ok(screen.width > 0 && screen.height > 0);
      assert.match(screen.caption, /가상 데이터/);
      assert.doesNotMatch(screen.title, /몽타주|화면 모음/);
    }
  }
});

test("public copy uses straight apostrophes and one space on both sides of middle dots", () => {
  const text = publicContent();
  assert.doesNotMatch(text, /[‘’]/u);
  for (const match of text.matchAll(/·/gu)) {
    const i = match.index;
    assert.equal(text[i - 1], " ");
    assert.equal(text[i + 1], " ");
    assert.notEqual(text[i - 2], " ");
    assert.notEqual(text[i + 2], " ");
  }
  assert.match(text, /개발 · 업무/u);
  assert.match(text, /일정 \/ 회의실/u);
});

test("representatives are ara, Dipull, PFCT and KT SAT without treating a talk as an app", () => {
  assert.deepEqual(
    portfolio.projects.filter((project) => project.featured).map((project) => project.slug),
    ["ara", "dipull", "pfct"],
  );
  assert.deepEqual(
    portfolio.activities.filter((activity) => activity.featured).map((activity) => activity.slug),
    ["kt-sat-ax"],
  );
  assert.equal(portfolio.projects.filter((project) => !project.featured).length, 83);
});

test("certificate issuers preserve the owner's corrected Linux Master authority", () => {
  const linux = portfolio.awards.find((item) => item.title === "리눅스마스터 2급");
  const network = portfolio.awards.find((item) => item.title === "네트워크관리사 2급");
  assert.equal(linux.organization, "한국정보통신진흥협회");
  assert.equal(linux.year, "2022");
  assert.equal(network.organization, "한국정보통신자격협회");
});

test("AI WAF is a discoverable PFCT case with explicit shared foundations and contribution boundaries", () => {
  const pfct = portfolio.projects.find((project) => project.slug === "pfct");
  assert.match(pfct.summary, /AI WAF 관제/u);
  const section = pfct.sections.find((section) => section.id === "ai-waf-monitoring");
  assert.ok(section);
  const text = section.paragraphs.join(" ");
  for (const term of ["Elastic", "Sentry", "Grafana", "읽기 도구", "민감한 값", "IP 차단", "리뷰"])
    assert.ok(text.includes(term), term);
  assert.match(text, /기존 WAF 로그 수집과 규칙 탐지 기반/u);
  assert.doesNotMatch(text, /완전 자동|정확도|100%|8회|120초/u);
  assert.doesNotMatch(text, /peoplefund-tech|pfct\.(kr|io)|arn:aws|\b(?:\d{1,3}\.){3}\d{1,3}\b/u);
});
