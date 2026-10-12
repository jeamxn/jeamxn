import assert from "node:assert/strict";
import { test } from "node:test";
import { portfolio } from "../../../packages/core/dist/index.js";
import {
  curatedReply,
  inScope,
  matchingProjects,
  publicKnowledgeForQuestion,
} from "../dist/assistant/assistant.policy.js";

test("all public project names and slugs are in scope and resolve to their actual public story", () => {
  for (const project of portfolio.projects) {
    const question = `${project.name}에 대해 알려주세요`;
    assert.equal(inScope(question), true, project.name);
    assert.equal(matchingProjects(question, portfolio)[0]?.slug, project.slug, project.name);
    const reply = curatedReply(question);
    assert.ok(
      reply.sources.some(
        (source) =>
          source.href === `/work/${project.slug}` ||
          source.href.startsWith(`/work/${project.slug}#`),
      ),
      project.name,
    );
    assert.ok(reply.answer.length <= 3600, project.name);
  }
});
test("all project FAQ directs to a complete archive, not just six or featured projects", () => {
  for (const question of [
    "전체 프로젝트 목록을 보고 싶습니다",
    "전체 작업 기록을 보고 싶습니다",
    "archive",
    "all projects",
  ])
    assert.equal(inScope(question), true, question);
  const reply = curatedReply("전체 프로젝트 목록을 보고 싶습니다");
  assert.match(reply.answer, new RegExp(`${portfolio.projects.length}개`));
  assert.match(reply.answer, /실험 \/ 학습 \/ 기여/);
  assert.equal(reply.sources[0].href, "/work");
});
test("bounded exact project names outrank substring slugs", () => {
  const seed = portfolio.projects[0];
  const data = {
    ...portfolio,
    projects: [
      { ...seed, name: "AI", slug: "ai" },
      { ...seed, name: "OpenAI Client", slug: "openai-client" },
      { ...seed, name: "ara", slug: "ara" },
    ],
  };
  assert.equal(
    matchingProjects("OpenAI Client에 대해 소개해 주세요", data)[0].slug,
    "openai-client",
  );
  assert.equal(matchingProjects("character 설명", data).length, 0);
  assert.equal(matchingProjects("AI의 역할", data)[0].slug, "ai");
});
test("public model input contains a complete index and valid bounded JSON with requested details", () => {
  for (const project of portfolio.projects) {
    const raw = publicKnowledgeForQuestion(`${project.name} 설명`);
    assert.ok(raw.length < 60000, project.name);
    const knowledge = JSON.parse(raw);
    assert.equal(knowledge.projectIndex.length, portfolio.projects.length);
    assert.equal(knowledge.archive.href, "/work");
    assert.ok(
      knowledge.projectDetails.some((detail) => detail.slug === project.slug),
      project.name,
    );
    assert.ok(
      knowledge.projectIndex.every((record) => record.name && record.role && record.status),
    );
  }
});
test("growing detailed records do not serialize-truncate JSON or put private evidence in model input", () => {
  const seed = portfolio.projects[0];
  const data = {
    ...portfolio,
    projects: [
      ...portfolio.projects,
      ...Array.from({ length: 65 }, (_, index) => ({
        ...seed,
        slug: `test-record-${index}`,
        name: `검증 기록 ${index}`,
        summary: "공개 요약 ".repeat(30),
        overview: Array.from({ length: 10 }, () => "완성된 공개 문단입니다. ".repeat(80)),
        sections: [
          {
            id: "actual-story",
            title: "작업 이야기",
            paragraphs: ["작업의 공개 내용입니다. ".repeat(1500)],
          },
        ],
        links: [],
        screens: undefined,
      })),
    ],
  };
  const raw = publicKnowledgeForQuestion("검증 기록 64 설명", data);
  assert.ok(raw.length < 60000);
  const knowledge = JSON.parse(raw);
  assert.equal(knowledge.projectIndex.length, data.projects.length);
  assert.ok(knowledge.projectDetails.some((project) => project.slug === "test-record-64"));
  assert.doesNotMatch(raw, /PRIVATE_SOURCE|process\.env|SECRET_KEY/);
});

test("new primary public subjects answer exact complete story paragraphs and anchors", () => {
  const samples = [
    ["ara TTS는 어떻게 만들었나요?", "ara", "speech-and-voice-settings"],
    ["ara 이미지 생성 모델은 어떻게 연결했나요?", "ara", "model-transport-and-images"],
    ["ara CSV 계정 등록은 어떻게 개발했나요?", "ara", "subscription-settings-and-policy"],
    ["ara 한글 조합 입력은 어떻게 고쳤나요?", "ara", "context-and-appearance"],
    ["ara MCP 세션 복구는 어떻게 했나요?", "ara", "agent-tool-runtime"],
    ["ara 채택하지 않은 실험은 무엇인가요?", "ara", "unadopted-experiments"],
    ["PFCT 빌드캐시를 어떻게 구현했나요?", "pfct", "build-and-deployment-workflow"],
    ["PFCT 상담 서비스를 어떻게 만들었나요?", "pfct", "consultation-domain"],
    ["PFCT 예약큐는 어떻게 구현했나요?", "pfct", "workflow-queues-and-resume"],
    ["PFCT BI 허브는 어떻게 만들었나요?", "pfct", "scheduled-work-and-bi"],
    [
      "PFCT 긴 대화의 맥락 압축은 어떻게 구현했나요?",
      "pfct",
      "conversation-and-account-continuity",
    ],
    ["PFCT 코드 지식과 서비스 카탈로그는 무엇인가요?", "pfct", "code-and-service-knowledge"],
    ["PFCT 온보딩은 어떻게 도왔나요?", "pfct", "developer-tools-and-handover"],
    ["PFCT Celery 이벤트 루프는 어떻게 고쳤나요?", "pfct", "runtime-and-access-boundaries"],
    ["PFCT 양방향 음성 대화 실험은 무엇인가요?", "pfct", "implementation-experiments"],
    ["PFCT 미니앱에서는 무엇을 했나요?", "pfct", "personal-agent-and-knowledge"],
  ];
  for (const [question, slug, id] of samples) {
    const section = portfolio.projects
      .find((project) => project.slug === slug)
      .sections.find((section) => section.id === id);
    const reply = curatedReply(question);
    assert.equal(reply.sources[0].href, `/work/${slug}#${id}`, question);
    assert.ok(reply.answer.includes(section.paragraphs[0]), question);
    assert.ok(reply.answer.length <= 3600, question);
  }
});

test("public representatives include three products and the KT SAT talk", () => {
  const answer = curatedReply("전체 프로젝트 목록을 알려주세요");
  for (const label of ["ara", "Dipull", "PFCT", "KT SAT"]) assert.ok(answer.answer.includes(label));
  const intro = curatedReply("최재민을 소개해 주세요");
  assert.ok(intro.answer.includes("KT SAT"));
  assert.ok(intro.sources.some((source) => source.href === "/activity/kt-sat-ax"));
  assert.equal(inScope("대표작을 알려주세요"), true);
  const knowledge = JSON.parse(publicKnowledgeForQuestion("대표작을 알려주세요"));
  assert.deepEqual(
    knowledge.representatives.map((record) => record.href),
    ["/work/ara", "/work/dipull", "/work/pfct", "/activity/kt-sat-ax"],
  );
});
