import { type ChatResponse, type Portfolio, portfolioSchema } from "@jeamxn/contract";
import { createPublicKnowledge } from "@jeamxn/core";
export const publicPortfolio = (): Portfolio =>
  portfolioSchema.parse(JSON.parse(createPublicKnowledge()));
const INJECTION =
  /ignore.{0,40}(instruction|rule|prompt)|system\s*(prompt|message)|developer\s*message|jailbreak|act\s+as|pretend|이전.{0,20}(지시|규칙).{0,10}(무시|잊)|시스템.{0,10}(프롬프트|메시지)|프롬프트.{0,10}(보여|출력|공개)|역할.{0,10}(바꿔|변경)|비밀|api.?key|토큰|비밀번호|개인정보|주민|전화번호|보안.{0,10}사고|내부.{0,10}(자료|링크|문서|코드)|사내.{0,10}(자료|링크|문서|코드)/iu;
const SCOPE =
  /재민|jeamin|jeamxn|최재민|포트폴리오|프로젝트|이력|경력|경험|개발|학력|학교|기술|스택|연락|협업|소개|관심|수상|자격|제품|아이디어|역할|ara|아라|dipull|디풀|디미고|pfct|lily|릴리|yun|건축|multinet|띠리링|portfolio|project|experience|education|resume|contact|career|skills|work|who|about|purpose|성민|박성민|친구|협력|강점|F1|T1|인디|음악|취향|좋아하는|기계공학|기계과|경희|해킹방어|해방과/iu;
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
export function curatedReply(question: string, prefix = ""): ChatResponse {
  const data = publicPortfolio();
  const text = question.toLowerCase();
  const project = data.projects.find(
    (item) =>
      text.includes(item.slug) ||
      text.includes(item.name.toLowerCase()) ||
      (item.slug === "ara" && text.includes("아라")) ||
      (item.slug === "dipull" && /디풀|디미고|school/.test(text)),
  );
  let answer: string;
  let sources: ChatResponse["sources"];
  if (
    /F1|T1|인디|음악|취향|관심사|좋아하는/i.test(question) &&
    !/프로젝트|기술|스택/.test(question)
  ) {
    answer = `개발 외 관심사는 ${data.profile.interests.join(", ")}입니다. 공개된 소개에는 이 관심사까지만 적혀 있으며, 좋아하는 아티스트나 곡 등 구체적인 취향은 따로 공개하지 않았습니다.`;
    sources = [{ label: "소개", href: "/about" }];
  } else if (
    /purpose|필드|도구.{0,10}목적|진행.{0,10}문구|소형.{0,10}모델|기기.{0,10}부담/i.test(question)
  ) {
    const ara = data.projects.find((item) => item.slug === "ara");
    const highlight = ara?.highlights.find((item) => item.title.includes("하는 일"));
    answer = highlight
      ? `${highlight.title}\n\n${highlight.body}`
      : "공개된 소개에 해당 내용은 없습니다.";
    sources = [{ label: "ara 이야기", href: "/work/ara" }];
  } else if (/성민|친구|협력|강점|함께.{0,6}만들|누가.{0,6}(개발|구현)/.test(question)) {
    const ara = data.projects.find((item) => item.slug === "ara");
    answer = ara ? `${ara.overview[0]}\n\n${ara.overview[2]}` : data.profile.about[2];
    sources = [{ label: "ara 이야기", href: "/work/ara" }];
  } else if (
    /기계공학|기계과|경희|해킹방어|해방과|학력|교육|학교|education/.test(text) &&
    !/dipull|디풀/.test(text)
  ) {
    answer = data.education
      .map((item) => `${item.school} · ${item.major}\n${item.period} · ${item.note}`)
      .join("\n\n");
    sources = [{ label: "이력서", href: "/resume" }];
  } else if (project) {
    answer = [
      project.name,
      project.summary,
      `${project.period} · ${project.role}`,
      project.status,
      ...project.overview,
    ].join("\n\n");
    sources = project.featured
      ? [{ label: project.name, href: `/work/${project.slug}` }, ...project.links]
      : [{ label: "이력서", href: "/resume" }, ...project.links];
  } else if (/연락|협업|contact|email|메일/.test(text)) {
    answer = `제품을 함께 만들 동료와 새로운 기회를 만나고 싶습니다. 연락은 ${data.profile.email}로 부탁드립니다. GitHub에서도 작업을 확인할 수 있습니다.`;
    sources = [
      { label: "이메일", href: `mailto:${data.profile.email}` },
      { label: "GitHub", href: data.profile.github },
    ];
  } else if (/학력|교육|학교|education/.test(text)) {
    answer = data.education
      .map((item) => `${item.school} · ${item.major}\n${item.period} · ${item.note}`)
      .join("\n\n");
    sources = [{ label: "이력서", href: "/resume" }];
  } else if (/경력|이력|경험|career|experience|resume|pfct|릴리|lily/.test(text)) {
    answer = data.experience
      .map(
        (item) =>
          `${item.company} · ${item.team}\n${item.period} · ${item.role}\n${item.description}`,
      )
      .join("\n\n");
    sources = [{ label: "이력서", href: "/resume" }];
  } else if (/수상|자격|award|certification/.test(text)) {
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
