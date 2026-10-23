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
      subtitle:
        "대화마다 끊기던 기록과 문서, 도구를 한 작업공간에서 이어 쓰려고 친구와 만드는 에이전트예요.",
      summary:
        "박성민과 둘이 만들고 직접 쓰는 통합 에이전트예요. 대화 옆에 문서와 앱랫, 캔버스를 두고, 모델과 도구를 바꿔 가며 다음 작업으로 이어가요.",
      period: "2026 — 현재",
      category: "함께 만든 것",
      role: "아이디어 / 공동 개발 / 검증",
      status: "두 사람이 쓰는 실험 단계예요",
      tags: ["TypeScript", "NestJS", "React Router", "Yjs", "AI"],
      image: "/images/ara-preview.webp",
      color: "#dbe4e9",
      featured: true,
      overview: [
        "여러 AI 에이전트를 쓰면서 대화와 문서, 도구와 작업 맥락이 서로 나뉘고, 기록과 모델 선택이 특정 플랫폼에 묶이는 점이 아쉬웠어요. 이 요소들을 한 에이전트에 모아 대화에서 도구 실행으로, 결과물 편집에서 다음 작업으로 이어가려고 시작했어요.",
        "둘 다 아이디어를 내고 구현하며 테스트해요. 성민은 아키텍처와 확장성, 운영에, 저는 앱랫과 캔버스, purpose 같은 기능 아이디어와 추진에 상대적으로 강점이 있어요. 지금은 두 사람이 직접 쓰는 실험이고, 일반 사용자용 구독 제품과 셀프호스팅 기업용 제품으로 넓히는 건 앞으로의 목표예요.",
      ],
      highlights: [
        {
          title: "도구와 문서, 모델 선택이 따로 놀지 않게 하기",
          body: "성민이 발전시킨 에이전트와 기억 · 작업 스케줄 기반 위에서 도구 연결과 모델 전송, 문서 옆 대화와 결과물 편집을 함께 개발했어요. 도구 호출에 목적을 적는 purpose는 제 아이디어를 성민이 구현했고, 앱랫과 편집 가능한 캔버스는 제가 방향을 제안하고 AI의 지원을 받아 구현 · 검증했어요.",
        },
        {
          title: "대화에서 도구 실행, 편집에서 내보내기까지 끊기지 않게 하기",
          body: "문서 옆에서 맥락을 유지하며 대화하고, 연결한 도구가 무엇을 하려는지 목적과 결과를 바로 확인할 수 있어요. 생성한 문서와 앱은 직접 고치고, 캔버스는 PPTX / PDF / PNG와 영상으로 내보내 다음 작업에 써요. 둘이 직접 쓰면서 막히는 부분을 찾아 기능을 더하고 있어요.",
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
      subtitle:
        "멈춘 교내 서비스 대신 기상송 신청과 세탁 예약을 다시 쓸 수 있게 만든 학교 인트라넷이에요.",
      summary:
        "디미고 학생과 선생님이 같은 계정으로 기상송 신청과 투표, 세탁기 예약, 잔류 · 좌석 신청을 처리하는 서비스예요. 초기 기획과 개발을 맡았고, 졸업 전에 후배들이 이어갈 기여 커뮤니티를 열었어요.",
      period: "2022 — 2025",
      category: "학교에서 만든 것",
      role: "초기 기획 / 개발 / 후배 인계",
      status: "졸업하며 후배 인계를 마쳤고, 지금은 운영 상태 미확인이에요",
      tags: ["Next.js", "TypeScript", "MongoDB", "OAuth"],
      image: "/images/dipull-preview.webp",
      color: "#e2e5db",
      featured: true,
      overview: [
        "2022년 반에서 쓰던 LeagueOfDimi가 먼저 있었어요. 이후 교내 서비스가 멈춰 기상송을 쓸 수 없게 됐고, 세탁 예약은 그때그때 별도 폼을 만들어 받아야 했어요.",
        "고3 때 졸업 이후를 준비하면서 디스코드 기여 커뮤니티를 만들고 후배에게 이어줬어요. 그 뒤의 코드에는 기여자들의 변경도 들어 있어요.",
      ],
      highlights: [
        {
          title: "따로 받던 신청을 계정 하나로 모으기",
          body: "LeagueOfDimi를 교내 인트라넷 Dipull로 넓히는 초기 기획과 개발을 맡았어요. 기상송 신청과 투표, 기기와 시간대별 예약, 잔류 신청과 좌석 선택을 만들고 공통 계정과 권한에 연결했어요. 이후 개선에는 기여자들도 함께 참여했어요.",
        },
        {
          title: "혼자 만든 뒤, 후배들이 이어갈 수 있게 열기",
          body: "학생들이 같은 계정으로 기상송과 예약, 잔류를 신청하고 자신의 내역을 확인할 수 있게 됐어요. 고3 때 기여 커뮤니티를 열고 후배에게 인계했어요. 하루 약 200명은 재학 당시 Google Analytics에서 본 것으로 기억하는 대략적인 방문 규모이고, 현재 이용자 수는 아니에요.",
        },
      ],
      links: [
        { label: "Dipull 저장소 보기", href: "https://github.com/dipull-intra/dipull" },
        { label: "처음 만든 LeagueOfDimi", href: "https://github.com/jeamxn/LeagueOfDimi" },
      ],
    },
    {
      slug: "pfct",
      collection: "company",
      recordType: "product",
      resumeSelected: true,
      name: "PFCT",
      subtitle: "Internal에서는 업무 화면을, AX에서는 AI와 도구를 연결해요.",
      summary:
        "Internal Squad에서는 통합 어드민과 접근 권한, DPD 대시보드를 개발했어요. AX Squad에서는 사내 AI Lily와 MCP 도구 연결, AI 활용 발표를 맡고 있어요.",
      period: "2024 — 현재",
      category: "Operations & AI",
      role: "풀스택 / AI 개발",
      status: "회사 공동 프로젝트",
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
      subtitle: "큰 파일 하나를 Wi-Fi와 테더링, 유선 회선으로 동시에 나눠 받는 다운로더예요.",
      summary:
        "Ubuntu 서버 이미지 받기가 느려서 만든 Go CLI mndl과 Wails 데스크톱 앱이에요. 회선마다 연결을 따로 열고, 끊긴 다운로드는 같은 명령으로 이어받아요.",
      period: "2026",
      category: "개인 작업",
      role: "개발 / 릴리스",
      status: "공개 릴리스(v0.2.0)가 있어요",
      tags: ["Go", "Wails", "Networking"],
      image: "",
      color: "#d4d8df",
      featured: false,
      overview: [
        "Ubuntu 서버 이미지를 내려받는 데 오래 걸려서, 하나의 파일을 여러 네트워크로 나눠 받는 다운로더를 만들었어요. 노트북 내장 Wi-Fi는 한 번에 한 네트워크만 붙어서, 휴대폰 테더링이나 유선 어댑터처럼 실제로 다른 회선이 있어야 효과가 있어요.",
        "Go로 다운로드 엔진과 CLI mndl을 만들고, Wails로 데스크톱 화면을 붙였어요. 회선마다 연결 묶음을 따로 열고, 빠른 회선이 자동으로 더 많은 구간을 가져가요. 한 회선이 끊겨도 나머지가 마무리하고, 중단한 다운로드는 같은 명령을 다시 실행하면 이어받아요. 서버가 연결 수를 제한하면 연결을 줄이고, Range를 지원하지 않는 서버에서는 한 줄기로 받아요.",
        "직접 파일을 내려받는 과정을 기준으로 기능을 정하고 테스트했어요. macOS와 Windows, Linux용 빌드를 GPL-3.0으로 공개했고, 두 회선을 동시에 쓸 때의 실제 속도는 따로 측정하지 않았어요.",
      ],
      highlights: [
        {
          title: "CLI를 핵심으로 두고, 앱은 그 위에 얹기",
          body: "데스크톱 앱은 CLI를 실행하고 그 JSON 출력을 읽어 보여주는 화면이에요. 두 쪽이 같은 설정 파일을 쓰니 앱에서 시작한 다운로드를 터미널에서 그대로 이어갈 수 있고, 각 항목에서 실제로 실행한 CLI 명령도 볼 수 있어요.",
        },
        {
          title: "회선이 정말 둘인지부터 확인하기",
          body: "같은 공유기에 꽂은 어댑터 여러 개는 결국 같은 회선이라 도움이 안 돼요. 앱의 연결 확인에서 회선마다 실제로 인터넷에 닿는지와 공인 IP를 보여주고, 진행 막대는 회선별로 색을 달리해 어느 회선이 얼마나 받았는지 보이게 했어요.",
        },
      ],
      links: [{ label: "GitHub", href: "https://github.com/jeamxn/multinet-dl" }],
    },
    {
      slug: "ttililing",
      collection: "collaboration",
      recordType: "product",
      resumeSelected: true,
      name: "띠리링",
      subtitle: "전화가 오면 긴장하는 팀원들이 AI와 먼저 통화를 연습해 보는 앱이에요.",
      summary:
        "2023년 팀 프로젝트로 만든 AI 통화 연습 앱이에요. 저는 React Native 클라이언트를 맡아 통화 화면과 음성 인식 · 음성 출력 연결, 대화 기록 화면을 만들었어요.",
      period: "2023",
      category: "함께 만든 것",
      role: "React Native 클라이언트 개발",
      status: "2023년에 끝났고 코드만 공개돼 있어요",
      tags: ["React Native", "STT", "TTS", "AI"],
      image: "",
      color: "#e8ded8",
      featured: false,
      overview: [
        "팀원들이 전화가 오면 긴장해서 받기 어렵다고 이야기했어요. 실제 통화 전에 가상의 상황으로 연습할 수 있도록 AI 통화 연습 앱을 만들었고, 저는 React Native 클라이언트를, 서버는 팀원이 맡았어요.",
        "홈에서 오늘의 통화 미션을 고르면 AI가 이름과 사진까지 만든 가상의 상대에게 전화가 와요. 사용자의 음성을 글로 바꿔 AI에 보내고 답을 다시 음성으로 들려주는 통화 흐름, 통화별 대화 기록 화면, 카카오 로그인과 로그인 유지를 만들었어요. 당시에는 한마디를 말한 뒤 답이 돌아오기까지 기다려야 해서, 자연스럽게 대화를 이어가는 데 어려움이 있었어요.",
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
      subtitle: "부모님 건축사사무소의 프로젝트를 보여주는 소개 · 갤러리 사이트예요.",
      summary:
        "2022년에 처음 만들고 2025년에 새로 만들었어요. 프로젝트 사진과 글은 Notion에서 관리하고, 사이트가 주기적으로 가져와 보여줘요.",
      period: "2022 — 2025",
      category: "개인 작업",
      role: "사이트 제작 / 리뉴얼",
      status: "가족 사이트로 지금도 열려 있어요",
      tags: ["Next.js", "Notion CMS"],
      image: "",
      color: "#dfdfdf",
      featured: false,
      overview: [
        "부모님 건축사사무소의 프로젝트를 보여줄 홈페이지가 필요했어요. 소개와 프로젝트 갤러리, 문의로 구성한 반응형 사이트를 2022년에 Next.js로 만들었어요.",
        "2025년에는 사이트를 새로 만들었어요. 프로젝트의 커버와 사진을 Notion에 올리면 사이트가 30분마다 가져오도록 연결해서, 코드를 고치지 않고도 프로젝트를 더할 수 있어요. 유상 외주가 아닌 가족 사이트 제작과 리뉴얼 작업이에요.",
      ],
      highlights: [],
      links: [{ label: "사이트 보기", href: "https://yun-architects.com" }],
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
