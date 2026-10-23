import type { Portfolio } from "@jeamxn/contract";
import { enrichActivity } from "./activities.js";
import { additionalProjects } from "./additional-projects.js";
import { normalizePublicCopy } from "./copy.js";
import { enrichMedia } from "./media.js";
import { enrichExperience, enrichProject } from "./projects.js";
import { enrichSupplementalStories } from "./supplemental-stories.js";

const basePortfolio: Portfolio = {
  profile: {
    name: "최재민",
    nameEn: "Jeamin Choi",
    headline: "행복한 개발자 | 기술보다 아이디어를",
    intro: "서비스로 더 많은 사람을 행복하게 만들고 싶은 개발자예요.",
    email: "me@jeamxn.dev",
    github: "https://github.com/jeamxn",
    portrait: "/images/portrait.webp",
    about: [
      "고등학교 때 교내 서비스가 멈추면서 기상송과 세탁 예약을 쓸 수 없게 됐어요. 반에서 쓰던 LeagueOfDimi에 신청과 예약 기능을 더해 교내 인트라넷 Dipull로 넓혔어요. 초기 기획과 개발을 맡았고, 졸업을 앞두고 기여 커뮤니티를 열어 후배들이 이어갈 수 있도록 인계했어요.",
      "PFCT의 Internal Squad에서는 흩어진 어드민을 합치고 업무별 접근 권한을 정리했어요. 통합 어드민의 스택과 초기 코드를 맡고, 계정과 메뉴, 권한 신청과 승인을 같은 기반에 연결했어요. 채권관리 DPD 대시보드도 이 업무의 일부로 주로 개발하며 현황 조회와 필터, 상세 확인, 담당자 일괄 변경을 한 화면에서 이어갈 수 있게 했어요.",
      "AX Squad에서는 사내 AI Lily를 동료들과 개발하고 있어요. 긴 대화의 맥락 압축과 사람과 AI의 실시간 문서 협업, 회의 전사와 요약을 개발했어요. 사내 개발 도구와 업무 도구를 MCP로 연결해 대화에서 실제 작업으로 이어지게 하고, AI 활용 내용을 발표하는 일도 맡았어요.",
      "고등학교 때부터 함께 활동한 박성민과는 대화와 문서, 도구와 작업 맥락을 모으는 통합 에이전트 ara를 만들고 있어요. 둘 다 아이디어를 내고 구현하며 테스트해요. 저는 앱랫과 편집 가능한 캔버스의 방향을 제안하고, AI의 도움을 받아 구현과 검증을 진행했어요. 성민이 발전시킨 공통 기반 위에서 함께 만드는 프로젝트로, 지금은 두 사람이 직접 쓰며 실험하고 있어요.",
      "기능을 만든 뒤에는 그 기능으로 직접 작업해봐요. ara의 캔버스로 발표 자료와 영상을 만들면서 글자 편집과 재생의 문제를 찾고, 화면에서 고친 내용이 내보낸 파일에도 남는지 확인했어요.",
      "학교에서 친구들의 불편을 고치던 일이 지금은 동료들의 수작업을 줄이는 일로 이어졌어요. 필요한 기술을 배우고 함께 쓸 사람들과 의견을 나누면서, 실제로 쓰이는 제품을 계속 만들고 싶어요.",
    ],
    interests: ["F1", "T1", "인디밴드 음악"],
  },
  projects: [
    {
      slug: "ara",
      collection: "personal",
      recordType: "product",
      resumeSelected: true,
      name: "ara",
      subtitle: "대화와 문서, 도구와 맥락을 한 에이전트로 모아요.",
      summary:
        "여러 곳에 나뉜 대화와 문서, 도구와 작업 맥락을 연결하는 통합 에이전트를 친구와 만들고 있어요. 공급자를 바꿔 쓰고, 만든 문서와 앱은 같은 공간에서 직접 고쳐요.",
      period: "2026 — 현재",
      category: "AI workspace",
      role: "아이디어 / 공동 개발 / 테스트",
      status: "두 사람이 사용하는 실험 단계",
      tags: ["TypeScript", "NestJS", "React Router", "Yjs", "AI"],
      image: "/images/ara-preview.webp",
      color: "#dbe4e9",
      featured: true,
      overview: [
        "고등학교 입학 무렵 디스코드에서 만난 박성민과는 처음에는 각자 만들며 경쟁했어요. 학생회장 투표 사이트에서 개발과 운영을 나누며 함께 작업하기 시작했고, 지금도 서로의 강점을 보태 제품을 만들고 있어요.",
        "여러 AI 에이전트를 직접 쓰면서 대화의 연속성, 기록 활용, 공급자 종속성 등 아쉬운 점을 나눴어요. 그러다 '우리가 원하는 것을 직접 만들어보자'고 제안하면서 ara가 시작됐어요.",
        "둘 다 아이디어 / 개발 / 테스트에 참여해요. 성민은 아키텍처 / 확장성 / 운영에, 저는 기능 아이디어와 추진에 상대적으로 강점이 있어요. 지금은 두 사람이 직접 사용하는 실험 단계이고, 일반 사용자용 제품과 셀프호스팅 기업용 제품으로의 확장을 목표로 하고 있어요.",
      ],
      highlights: [
        {
          title: "도구가 아니라, 하는 일을 보여주기",
          body: "툴 이름만 보이면 지금 무슨 일이 진행되는지 추측해야 했어요. 브라우저 소형 모델로 문구를 만드는 방법을 실험했지만 기기 부담이 컸어요. 그래서 실행하는 AI가 purpose 필드에 목적도 함께 적는 방식으로 단순화했어요. 아이디어는 제가 제안했고, ara의 구현은 성민이 맡았어요.",
        },
        {
          title: "생성에서 직접 편집까지",
          body: "AI가 만든 결과를 다시 고치려면 다른 도구로 옮겨야 했어요. 앱랫과 협업 캔버스, 문서 변환과 모션 / 미디어 기능을 연결해 같은 작업공간에서 편집하고 내보낼 수 있도록 함께 개발하고 있어요.",
        },
        {
          title: "직접 쓰면서 발견하는 다음 기능",
          body: "둘 다 기능을 제안하고 직접 구현하며 테스트해요. 만든 캔버스로 발표 자료를 만들고 앱랫을 실행하면서, 편집이나 출력에서 막힌 부분을 찾아 다시 고치고 있어요.",
        },
      ],
      links: [{ label: "함께 만드는 박성민", href: "https://github.com/krisamin" }],
    },
    {
      slug: "dipull",
      collection: "school",
      recordType: "product",
      resumeSelected: true,
      name: "Dipull",
      subtitle: "계정과 생활 신청을 잇는 학교 인트라넷을 만들었어요.",
      summary:
        "기상송과 세탁 예약을 다시 쓸 수 있도록 반에서 쓰던 서비스를 교내 인트라넷으로 넓혔어요. 생활 신청과 계정을 연결하고, 후배들이 개발을 이어갈 수 있도록 공개했어요.",
      period: "2022 — 2025",
      category: "School service",
      role: "초기 기획 / 개발 / 기여 커뮤니티",
      status: "졸업 후 후배 인계 / 현재 운영 상태 미확인",
      tags: ["Next.js", "TypeScript", "MongoDB", "OAuth"],
      image: "/images/dipull-preview.webp",
      color: "#e2e5db",
      featured: true,
      overview: [
        "Dipull은 반 안에서 사용하던 LeagueOfDimi에서 시작했어요. 교내 디미고인 서비스가 멈추면서 기상송과 세탁 예약 같은 일상 기능을 쓸 수 없게 됐어요. 기존 서비스에 학교에서 필요한 기능을 더해 '디미고인 풀 서비스'로 넓혔어요.",
        "학생이자 사용자로 직접 겪은 불편을 해결하면서 신청 / 예약 / 계정 등의 기능을 개발했어요. 초기 제품은 제가 만들었고, 고3 때 후배에게 이어줄 준비를 하면서 디스코드 기여 커뮤니티를 열었어요.",
        "재학 당시 Google Analytics에서 하루 약 200명이 방문하는 것을 확인했다고 기억해요. 당시 관찰한 대략적인 수치로, 현재 이용자 수는 아니에요. 졸업 뒤에는 후배에게 이어주었고 현재 운영 상태는 별도로 확인하지 않았어요.",
      ],
      highlights: [
        {
          title: "생활에 필요한 기능부터",
          body: "기상송을 들을 수 없고 세탁 예약을 매번 별도 폼으로 해야 했어요. 학교에서 직접 쓰는 신청과 예약 기능을 하나의 서비스로 연결했어요.",
        },
        {
          title: "초기 개발에서 함께 이어가는 제품으로",
          body: "처음에는 직접 개발했어요. 졸업을 앞두고 디스코드 커뮤니티에서 기여를 받으며, 후배들이 이어갈 수 있는 오픈소스 프로젝트로 바꿨어요.",
        },
        {
          title: "나와 친구들이 실제로 쓰는 서비스",
          body: "저와 친구들이 쓰면서 필요한 기능을 더했어요. 기상송과 세탁 예약에서 시작해 잔류 신청과 좌석 선택까지, 학교생활에서 반복하는 일을 같은 서비스에서 처리할 수 있게 했어요.",
        },
      ],
      links: [
        { label: "GitHub에서 보기", href: "https://github.com/dipull-intra/dipull" },
        { label: "처음의 LeagueOfDimi", href: "https://github.com/jeamxn/LeagueOfDimi" },
      ],
    },
    {
      slug: "pfct",
      collection: "company",
      recordType: "product",
      resumeSelected: true,
      name: "PFCT",
      subtitle: "동료들이 매일 쓰는 어드민을 하나로 합치고, 사내 AI Lily를 업무 도구에 연결해요.",
      summary:
        "Internal Squad에서는 흩어진 어드민을 통합 어드민으로 합치고 접근 권한을 정리했고, 채권관리 DPD 대시보드를 주로 개발했어요. AX Squad에서는 사내 AI Lily와 AI WAF 관제 시스템을 동료들과 개발하고, 사내 도구의 MCP 연결과 AI 활용 발표를 맡고 있어요.",
      period: "2024 — 현재",
      category: "회사에서 한 일",
      role: "통합 어드민 초기 기반 / DPD 대시보드 주개발 / Lily · AI WAF 관제 개발",
      status: "지금도 동료들과 함께 개발하고 있어요",
      tags: ["Bun", "Elysia", "Next.js", "Python", "AI"],
      image: "",
      color: "#dcdad5",
      featured: true,
      overview: [
        "현장실습과 인턴을 거쳐 대학 진학 뒤 PFCT에 다시 합류했어요. 실제 사용자가 있는 제품을 계속 만들고 전문성을 가진 동료들과 함께 일하고 싶었어요.",
        "Internal Squad에서는 통합 어드민의 스택과 초기 코드, 권한 신청과 승인, DPD 대시보드를 맡았어요. AX Squad에서는 Lily의 회의록과 문서 협업을 개발하고 사내 도구를 MCP로 연결했어요. AI 활용 발표도 함께 맡고 있어요.",
      ],
      highlights: [],
      links: [],
    },
    {
      slug: "multinet",
      collection: "personal",
      recordType: "product",
      resumeSelected: true,
      name: "MultiNet",
      subtitle: "오래 걸리는 다운로드를 여러 회선으로 나눠 받아요.",
      summary: "Ubuntu 서버 이미지 다운로드가 느려서 만들기 시작한 Go CLI / 데스크톱 다운로더예요.",
      period: "2026",
      category: "Desktop & network",
      role: "개발",
      status: "v0.2.0 공개 릴리스",
      tags: ["Go", "Wails", "Networking"],
      image: "",
      color: "#d4d8df",
      featured: false,
      overview: [
        "Ubuntu 서버 이미지를 내려받는 데 오래 걸려서, 하나의 파일을 여러 네트워크로 나눠 받는 다운로더를 만들었어요.",
        "Go로 다운로드 엔진과 CLI를 만들고, Wails로 데스크톱 화면을 연결했어요. 회선별 진행 상태에 따라 작업을 다시 나누고, 중단된 다운로드를 이어받도록 구현했어요. 직접 파일을 내려받는 과정을 기준으로 기능을 정하고 테스트했어요.",
      ],
      highlights: [],
      links: [{ label: "GitHub", href: "https://github.com/jeamxn/multinet-dl" }],
    },
    {
      slug: "ttililing",
      collection: "collaboration",
      recordType: "product",
      resumeSelected: true,
      name: "띠리링",
      subtitle: "전화가 부담스러운 친구들이 먼저 연습할 수 있게 만들었어요.",
      summary: "전화에 부담을 느낀 팀원들의 경험에서 시작한 AI 통화연습 앱이에요.",
      period: "2023",
      category: "Mobile & voice AI",
      role: "React Native 클라이언트 개발",
      status: "과거 팀 프로젝트",
      tags: ["React Native", "STT", "TTS", "AI"],
      image: "",
      color: "#e8ded8",
      featured: false,
      overview: [
        "팀원들이 전화가 오면 긴장하고 받기 어렵다고 이야기했어요. 실제 통화 전에 온라인에서 연습할 수 있도록 AI 통화연습 앱을 만들었고, 저는 React Native 클라이언트 개발을 맡았어요.",
        "가상의 통화 상황에서 사용자의 음성을 받아 AI의 응답을 다시 음성으로 들려주는 흐름을 만들었어요. 당시에는 한마디를 말한 뒤 답이 돌아오기까지 기다려야 해서, 자연스럽게 대화를 이어가는 데 어려움이 있었어요.",
        "지금보다 음성 AI가 낯설었던 때라, 팀원들은 직접 말하며 AI와 대화하는 경험을 신기해했어요. 통화 연습을 위한 팀 프로젝트이고, 불안 완화나 치료 효과를 검증한 서비스는 아니에요.",
      ],
      highlights: [],
      links: [{ label: "GitHub", href: "https://github.com/jeamxn/ttililing-app" }],
    },
    {
      slug: "yun",
      collection: "personal",
      recordType: "product",
      resumeSelected: true,
      name: "YUN Architects",
      subtitle: "건축 프로젝트를 보여주는 작은 갤러리를 만들었어요.",
      summary: "부모님 건축사사무소의 소개 / 프로젝트 갤러리 사이트를 만들고 리뉴얼했어요.",
      period: "2022 — 2025",
      category: "Website",
      role: "사이트 제작 / 리뉴얼",
      status: "가족 사이트 프로젝트",
      tags: ["Next.js", "Notion CMS"],
      image: "",
      color: "#dfdfdf",
      featured: false,
      overview: [
        "부모님 건축사사무소의 프로젝트를 보여주기 위해 반응형 갤러리와 CMS 동기화를 연결했어요. 유상 외주가 아닌 가족 사이트 제작과 리뉴얼 작업이에요.",
      ],
      highlights: [],
      links: [{ label: "사이트", href: "https://yun-architects.com" }],
    },
  ],
  experience: [
    {
      company: "PFCT",
      team: "AX Squad",
      role: "Fullstack & AI Developer",
      period: "2026.01 — 현재",
      description:
        "사내 AI Lily의 회의록과 문서 협업을 개발하고, 사내 개발 · 업무 도구를 MCP로 연결하고 있어요. AI 활용 발표도 맡고 있어요.",
    },
    {
      company: "PFCT",
      team: "Internal Squad",
      role: "Fullstack Developer",
      period: "2025.07 — 2025.12",
      description:
        "분리된 어드민의 초기 기반과 공통 계정, 메뉴, 권한 신청과 승인을 개발했어요. 채권관리 DPD 대시보드의 표와 필터, 요약과 담당자 일괄 변경을 주로 맡았어요.",
    },
    {
      company: "PFCT",
      team: "UX Squad",
      role: "인턴",
      period: "2025.01 — 2025.02",
      description: "고객 이벤트와 웹뷰, 쿠폰과 관리자 화면을 개발하고 기존 기능을 개선했어요.",
    },
    {
      company: "PFCT",
      team: "Platform Service Team",
      role: "현장실습생",
      period: "2024.11 — 2024.12",
      description: "Credit Planet Admin 리뉴얼과 미디어 관리 기능을 개발했어요.",
    },
  ],
  education: [
    { school: "경희대학교", major: "기계공학과", period: "2025.03 — 현재", note: "휴학" },
    {
      school: "한국디지털미디어고등학교",
      major: "해킹방어과",
      period: "2022.03 — 2025.02",
      note: "졸업",
    },
  ],
  activities: [
    {
      title: "AX 기초 강연",
      organization: "KT SAT",
      period: "2026.07",
      description:
        "KT SAT 임직원에게 AI를 판단의 재료와 실제 업무 도구로 활용하는 방법을 설명했어요.",
    },
    {
      title: "IT부 부장",
      organization: "디미고 제22대 학생회",
      period: "2023.09 — 2024.08",
      description: "학생들과 친근하게 소통하고 의견을 대표했어요.",
    },
    {
      title: "학생자치회 부회장",
      organization: "디미고 제21대 학생회",
      period: "2022.06 — 2023.08",
      description: "학교 생활과 학생 자치 활동에 참여했어요.",
    },
    {
      title: "LUNA / JUST",
      organization: "디미고 창업동아리",
      period: "2022 — 2025",
      description: "팀 프로젝트와 개발 / 아이디어 논의에 참여했어요.",
    },
  ],
  awards: [
    {
      title: "YOUTH MAKER 최우수상",
      organization: "고려대학교 KU-3DS",
      year: "2023",
      kind: "award",
    },
    {
      title: "Hello New() World 우수상",
      organization: "신세계아이앤씨 / 교육부 / 함께하는재단",
      year: "2022",
      kind: "award",
    },
    {
      title: "학생 창업유망팀 300 성장트랙 인증",
      organization: "교육부",
      year: "2022",
      kind: "certification",
    },
    {
      title: "Junction Asia 참가",
      organization: "Junction",
      year: "2022 / 2023",
      kind: "participation",
    },
    {
      title: "정보기기운용기능사 / 프로그래밍기능사",
      organization: "한국산업인력공단",
      year: "2026",
      kind: "certification",
    },
    {
      title: "네트워크관리사 2급",
      organization: "한국정보통신자격협회",
      year: "2023",
      kind: "certification",
    },
    {
      title: "리눅스마스터 2급",
      organization: "한국정보통신진흥협회",
      year: "2022",
      kind: "certification",
    },
  ],
};

export const portfolio: Portfolio = normalizePublicCopy({
  ...basePortfolio,
  projects: [...basePortfolio.projects, ...additionalProjects].map((project) =>
    enrichMedia(enrichSupplementalStories(enrichProject(project))),
  ),
  experience: basePortfolio.experience.map(enrichExperience),
  activities: basePortfolio.activities.map(enrichActivity),
});
