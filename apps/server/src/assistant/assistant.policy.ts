import {
  type ChatResponse,
  type Portfolio,
  portfolioSchema,
  type StorySection,
} from "@jeamxn/contract";
import { createPublicKnowledge } from "@jeamxn/core";
export const publicPortfolio = (): Portfolio =>
  portfolioSchema.parse(JSON.parse(createPublicKnowledge()));
const INJECTION =
  /ignore.{0,40}(instruction|rule|prompt)|system\s*(prompt|message)|developer\s*message|jailbreak|act\s+as|pretend|이전.{0,20}(지시|규칙).{0,10}(무시|잊)|시스템.{0,10}(프롬프트|메시지)|프롬프트.{0,10}(보여|출력|공개)|역할.{0,10}(바꿔|변경)|비밀|api.?key|토큰|비밀번호|개인정보|주민|전화번호|보안.{0,10}사고|내부.{0,10}(자료|링크|문서|코드)|사내.{0,10}(자료|링크|문서|코드)/iu;
const SCOPE =
  /재민|jeamin|jeamxn|최재민|포트폴리오|프로젝트|이력|경력|경험|개발|학력|학교|기술|스택|연락|협업|소개|관심|수상|자격|제품|아이디어|역할|ara|아라|dipull|디풀|디미고|pfct|lily|릴리|yun|건축|multinet|띠리링|portfolio|project|experience|education|resume|contact|career|skills|work|who|about|purpose|성민|박성민|친구|협력|강점|F1|T1|인디|음악|취향|좋아하는|기계공학|기계과|경희|해킹방어|해방과|직책|리더|강연|skill|tool|KT\s*SAT|강연|강의|발표|AX|회의|협업|DPD|ERP|monitoring|모니터링|맥락|컨텍스트|검증|기상송|세탁|운영|대시보드|배포/iu;
const OFF_TOPIC =
  /날씨|기온|주가|매수|투자.{0,6}추천|레시피|메뉴.{0,6}추천|정치|선거.{0,6}예측|의료.{0,6}진단|write.{0,15}code|코드.{0,10}(작성|짜줘)|calculate|계산해/iu;
export function inScope(text: string) {
  const normalized = text.normalize("NFKC").replace(/\p{Cf}/gu, "");
  return !INJECTION.test(normalized) && !OFF_TOPIC.test(normalized) && SCOPE.test(normalized);
}
export function refusal(): ChatResponse {
  return {
    mode: "local",
    answer:
      "최재민의 공개 포트폴리오만 안내합니다. 프로젝트, 경력, 함께 일하는 방식이나 연락 방법을 질문해 주세요. 비공개 자료·개인정보·시스템 지시는 제공하지 않습니다.",
    sources: [
      { label: "소개", href: "/about" },
      { label: "이력서", href: "/resume" },
    ],
  };
}
type StoryTopic = { question: RegExp; section: RegExp };
const PROJECT_TOPICS: Record<string, StoryTopic[]> = {
  ara: [
    {
      question: /purpose|필드|진행.{0,10}문구|소형.{0,10}모델|기기.{0,10}부담|하는 일/iu,
      section: /purpose|진행|목적|하는 일|부담/iu,
    },
    {
      question: /시작|계기|왜|배경|종속|연속성/iu,
      section: /시작|계기|만들기|직접|wanted|origin/iu,
    },
    {
      question: /성민|친구|누가|기여|강점|공동|협력/iu,
      section: /성민|함께|둘|기여|친구|collaboration/iu,
    },
    {
      question: /캔버스|도화지|미디어|모션|영상|편집|앱랫/iu,
      section: /편집|도화지|캔버스|미디어|앱랫|canvas|media/iu,
    },
    {
      question: /기억|맥락|컨텍스트|기록|문서|지식|도구|기기|툴/iu,
      section: /기억|맥락|기록|문서|기기|도구|memory|context|tool/iu,
    },
    {
      question: /출시|판매|구독|운영|확장|계획|사용자/iu,
      section: /실험|현재|확장|앞으로|사용|next/iu,
    },
  ],
  pfct: [
    { question: /회의|녹음|회의록|meeting/iu, section: /회의|녹음|meeting/iu },
    {
      question: /crdt|동시|실시간|협업|공동.{0,8}편집|yjs/iu,
      section: /협업|동시|CRDT|Yjs|collaboration/iu,
    },
    { question: /dpd|연체|대시보드/iu, section: /DPD|연체|대시보드/iu },
    { question: /erp|업무.{0,8}(시스템|방식)|재설계/iu, section: /ERP|재설계|업무/iu },
    {
      question: /monitoring|모니터링|관측|온콜|경보/iu,
      section: /monitoring|모니터링|관측|경보/iu,
    },
    { question: /gateway|게이트웨이|기기|로컬/iu, section: /gateway|게이트웨이|기기|로컬/iu },
    {
      question: /배포|빌드|buildkit|presync|jenkins|마이그레이션/iu,
      section: /배포|빌드|마이그레이션|운영|deploy/iu,
    },
    { question: /어드민|admin|스택|기반|통합|공통/iu, section: /어드민|admin|기반|통합|공통/iu },
    { question: /시작|계기|왜|재합류|돌아/iu, section: /재합류|돌아|시작|동료|출발|origin/iu },
  ],
  dipull: [
    { question: /세탁|예약|laundry/iu, section: /세탁|예약|laundry/iu },
    { question: /기상송|음악|wakeup/iu, section: /기상송|생활|wakeup/iu },
    { question: /계정|인증|oauth|로그인/iu, section: /계정|인증|oauth|로그인/iu },
    {
      question: /후배|졸업|인계|오픈소스|커뮤니티|기여/iu,
      section: /community-and-handoff|졸업|후배|인계|커뮤니티|기여|handover/iu,
    },
    { question: /시작|계기|왜|장애|league/iu, section: /시작|계기|반|league|origin/iu },
    { question: /사용자|이용자|몇|200|운영|현재/iu, section: /사용|관찰|현재|200|운영/iu },
  ],
};
const LECTURE_TOPICS: StoryTopic[] = [
  {
    question: /질문.{0,12}(반응|참여|기억)|청중|참여자|반응|기억.{0,12}(장면|질문)/iu,
    section: /^conversation$/u,
  },
  { question: /도구|skill|tool|mcp|행동|에이전트|agent/iu, section: /^workflow$/u },
  { question: /검증|한계|환각|확인|책임|위험|주의|보안/iu, section: /^responsibility$/u },
  { question: /판단|의사결정|직책|리더|임원|재료/iu, section: /^judgment$/u },
  {
    question: /맥락|컨텍스트|context|프롬프트|prompt|목적|제약|질문.{0,8}(방법|설명)/iu,
    section: /^brief$/u,
  },
  { question: /맡게|추천|초대|계기|준비|출발/iu, section: /^invitation$/u },
  { question: /업무|사례|실습|활용|일하는|시연/iu, section: /^workflow$/u },
];
function lectureMatches(sections: StorySection[], question: string) {
  const matches = LECTURE_TOPICS.filter((topic) => topic.question.test(question));
  if (
    /생각|전하|관점|철학/iu.test(question) &&
    !LECTURE_TOPICS.slice(0, 3).some((topic) => topic.question.test(question))
  )
    return ["judgment", "brief"].flatMap(
      (id) => sections.find((section) => section.id === id) ?? [],
    );
  if (matches.length) return sections.filter((section) => matches[0].section.test(section.id));
  if (/생각|전하|관점|철학/iu.test(question))
    return ["judgment", "brief"].flatMap(
      (id) => sections.find((section) => section.id === id) ?? [],
    );
  return [];
}
function storyMatches(sections: StorySection[], question: string, topics: StoryTopic[]) {
  const active = topics.filter((topic) => topic.question.test(question));
  if (!active.length) return [];
  return sections
    .map((section, index) => {
      const heading = `${section.id} ${section.title}`;
      const body = section.paragraphs.join(" ");
      const score = active.reduce(
        (sum, topic) =>
          sum +
          (topic.section.test(heading) ? 5 : topic.section.test(body) ? 1 : 0) *
            (topics.length - topics.indexOf(topic)),
        0,
      );
      return { section, index, score };
    })
    .filter((match) => match.score > 0)
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, active.length > 1 ? 2 : 1)
    .map((match) => match.section);
}
function storyReply(sections: StorySection[], path: string, prefix: string): ChatResponse {
  // Use complete curated paragraphs, never an unrelated first-N-character project intro.
  const answer: string[] = [];
  const sources: ChatResponse["sources"] = [];
  let remaining = 3000 - prefix.length;
  for (const section of sections) {
    const paragraphs: string[] = [];
    remaining -= section.title.length + 4;
    for (const paragraph of section.paragraphs) {
      if (paragraph.length + 2 > remaining) break;
      paragraphs.push(paragraph);
      remaining -= paragraph.length + 2;
    }
    answer.push(
      `${section.title}\n\n${paragraphs.length ? paragraphs.join("\n\n") : "전체 내용은 연결된 이야기에서 읽을 수 있습니다."}`,
    );
    sources.push({ label: section.title, href: `${path}#${section.id}` });
  }
  return { mode: "local", answer: `${prefix}${answer.join("\n\n")}`, sources };
}
export function curatedReply(question: string, prefix = ""): ChatResponse {
  const data = publicPortfolio();
  const text = question.normalize("NFKC").toLowerCase();
  const lecture = data.activities.find((item) => item.slug === "kt-sat-ax");
  if (
    lecture &&
    (/kt\s*sat|강연|강의|발표|lecture/iu.test(text) ||
      (!/ara|아라|dipull|디풀|pfct|릴리|lily/iu.test(text) && /직책|리더|skill|tool/iu.test(text)))
  ) {
    const sections = lectureMatches(lecture.sections ?? [], question);
    if (sections.length) return storyReply(sections, `/activity/${lecture.slug}`, prefix);
    return {
      mode: "local",
      answer: `${prefix}${[`${lecture.organization} · ${lecture.title} (${lecture.period})`, lecture.lead, lecture.description, ...(lecture.sections?.map((section) => section.title) ?? [])].filter(Boolean).join("\n\n")}`,
      sources: [{ label: "KT SAT 강연 이야기", href: `/activity/${lecture.slug}` }],
    };
  }
  let project = data.projects.find(
    (item) =>
      text.includes(item.slug) ||
      text.includes(item.name.toLowerCase()) ||
      (item.slug === "ara" && text.includes("아라")) ||
      (item.slug === "dipull" && /디풀|디미고/iu.test(text)),
  );
  if (!project && /purpose|진행.{0,10}문구|성민|친구/iu.test(text))
    project = data.projects.find((item) => item.slug === "ara");
  if (!project && /회의|dpd|erp|monitoring|모니터링|어드민|게이트웨이|배포/iu.test(text))
    project = data.projects.find((item) => item.slug === "pfct");
  if (project) {
    if (
      project.slug === "ara" &&
      /성민|친구|누가|강점|공동|협력/iu.test(question) &&
      !/purpose|진행.{0,10}문구/iu.test(question)
    ) {
      const paragraphs = project.overview.filter((paragraph) =>
        /둘 다|강점|아키텍처|성민/iu.test(paragraph),
      );
      return {
        mode: "local",
        answer: `${prefix}${paragraphs.join("\n\n")}`,
        sources: [
          {
            label: "함께 만드는 ara",
            href: "/work/ara",
          },
        ],
      };
    }
    const sections = storyMatches(
      project.sections ?? [],
      question,
      PROJECT_TOPICS[project.slug] ?? [],
    );
    if (sections.length) return storyReply(sections, `/work/${project.slug}`, prefix);
    // Older short projects still work; detailed projects point into the full story.
    return {
      mode: "local",
      answer: `${prefix}${[project.name, project.lead ?? project.summary, `${project.period} · ${project.role}`, project.status, ...(project.sections?.length ? project.sections.map((section) => section.title) : project.overview)].join("\n\n")}`,
      sources: [
        { label: `${project.name} 이야기`, href: `/work/${project.slug}` },
        ...project.links,
      ],
    };
  }
  let answer: string;
  let sources: ChatResponse["sources"];
  if (
    /F1|T1|인디|음악|취향|관심사|좋아하는/iu.test(question) &&
    !/프로젝트|기술|스택/iu.test(question)
  ) {
    answer = `개발 외 관심사는 ${data.profile.interests.join(", ")}입니다. 공개된 소개에는 이 관심사까지만 적혀 있으며, 좋아하는 아티스트나 곡 등 구체적인 취향은 따로 공개하지 않았습니다.`;
    sources = [{ label: "소개", href: "/about" }];
  } else if (/기계공학|기계과|경희|해킹방어|해방과|학력|교육|학교|education/iu.test(text)) {
    answer = data.education
      .map((item) => `${item.school} · ${item.major}\n${item.period} · ${item.note}`)
      .join("\n\n");
    sources = [{ label: "이력서", href: "/resume" }];
  } else if (/연락|협업|contact|email|메일/iu.test(text)) {
    answer = `제품을 함께 만들 동료와 새로운 기회를 만나고 싶습니다. 연락은 ${data.profile.email}로 부탁드립니다. GitHub에서도 작업을 확인할 수 있습니다.`;
    sources = [
      { label: "이메일", href: `mailto:${data.profile.email}` },
      { label: "GitHub", href: data.profile.github },
    ];
  } else if (/경력|이력|경험|career|experience|resume|pfct|릴리|lily/iu.test(text)) {
    answer = data.experience
      .map(
        (item) =>
          `${item.company} · ${item.team}\n${item.period} · ${item.role}\n${item.description}`,
      )
      .join("\n\n");
    sources = [
      { label: "이력서", href: "/resume" },
      { label: "PFCT에서 만든 제품", href: "/work/pfct" },
    ];
  } else if (/수상|자격|award|certification/iu.test(text)) {
    answer = data.awards
      .map((item) => `${item.year} · ${item.title} (${item.organization})`)
      .join("\n");
    sources = [{ label: "이력서", href: "/resume" }];
  } else {
    answer = [
      data.profile.headline,
      data.profile.intro,
      "대표 프로젝트는 ara와 Dipull입니다.",
      ...data.profile.about,
    ].join("\n\n");
    sources = [
      { label: "소개", href: "/about" },
      { label: "ara", href: "/work/ara" },
      { label: "Dipull", href: "/work/dipull" },
    ];
  }
  return { mode: "local", answer: `${prefix}${answer}`.slice(0, 3600), sources };
}
export function safeAnswer(raw: string, data: Portfolio): string {
  const allowed = new Set([
    data.profile.github,
    `mailto:${data.profile.email}`,
    ...data.projects.flatMap((item) => item.links.map((link) => link.href)),
  ]);
  // Only app-owned sources are clickable. Turn model markup into plain text rather
  // than maintaining a partial Markdown parser with protocol/escaping ambiguities.
  return (
    raw
      .replace(/<[^>]*>/g, "")
      .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
      .replace(/\[([^\]]+)\]\[[^\]]*\]/g, "$1")
      .replace(/^\s*\[[^\]]+\]:.*$/gm, "")
      .replace(/(?:https?:\/\/|mailto:|javascript:|data:|www\.)[^\s<>)\]]+/giu, (url) =>
        allowed.has(url) ? url : "[확인되지 않은 링크]",
      )
      .replace(/[<>&[\]`]/g, "")
      // biome-ignore lint/suspicious/noControlCharactersInRegex: sanitize upstream control characters.
      .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, "")
      .slice(0, 3600)
      .trim()
  );
}
