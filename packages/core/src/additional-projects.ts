import type { Project } from "@jeamxn/contract";

// 개인 / 학교 / 협업 / 오픈소스 기록. 기간은 확인된 작업 기록 기준입니다.
export const additionalProjects: Project[] = [
  {
    slug: "yhms-timetable",
    name: "YHMS TimeTable",
    subtitle:
      "원격수업 때 수업 링크를 찾아 헤매지 않게, 시간표에서 바로 Teams로 들어가는 중학교 웹이에요.",
    summary:
      "HTML / CSS / JavaScript로 만든 시간표 웹이에요. 현재 교시와 시종을 보여 주고, 반장들이 모아 준 반별 Teams 링크로 바로 수업에 들어가요.",
    period: "2021 기록",
    category: "학교에서 만든 것",
    role: "웹 개발",
    status: "지금은 운영하지 않고 코드만 공개돼 있어요",
    tags: ["HTML", "CSS", "JavaScript"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "원격수업 때는 다음 수업이 무엇인지 확인한 뒤에 수업 링크를 또 찾아야 했어요. 그래서 시간표에 현재 교시와 시종을 표시하고 반마다 Teams 바로가기를 붙여, 한 화면에서 수업으로 들어갈 수 있게 만들었어요. 학년 · 반을 고르는 설정과 급식 화면도 같이 넣었어요.",
      "중3 때 반장들에게 반별 수업 링크를 모아 달라고 부탁했고, 3학년에서 먼저 테스트로 쓰기 시작했어요. 전교 도입은 당시 세운 계획으로 남아 있고, 실제로 이어졌는지는 확인하지 못했어요.",
    ],
    highlights: [],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/jeamxn/YHMS-TimeTable",
      },
    ],
    featured: false,
    collection: "school",
    recordType: "product",
    resumeSelected: false,
    sections: [
      {
        id: "what",
        title: "다음 수업 링크를 찾아 헤매던 게 시작이었어요",
        paragraphs: [
          "원격수업 때는 다음 수업이 무엇인지 확인한 뒤에 수업 링크를 또 찾아야 했어요. 그래서 시간표에 현재 교시와 시종을 표시하고 반마다 Teams 바로가기를 붙여, 한 화면에서 수업으로 들어갈 수 있게 만들었어요. 학년 · 반을 고르는 설정과 급식 화면도 같이 넣었어요.",
        ],
      },
      {
        id: "contribution",
        title: "반장들이 모아 준 링크로 3학년이 먼저 썼어요",
        paragraphs: [
          "중3 때 반장들에게 반별 수업 링크를 모아 달라고 부탁했고, 3학년에서 먼저 테스트로 쓰기 시작했어요. 전교 도입은 당시 세운 계획으로 남아 있고, 실제로 이어졌는지는 확인하지 못했어요.",
        ],
      },
    ],
  },
  {
    slug: "random-word",
    name: "Random Word",
    subtitle: "영단어를 정해진 순서 없이 섞어서 보여 주는 작은 웹 단어장이에요.",
    summary:
      "처음 웹을 익히던 때 HTML과 JavaScript로 만든 학습 도구예요. 단어 목록을 파일로 따로 두고 브라우저에서 무작위로 꺼내 보여 줘요.",
    period: "2021 기록",
    category: "개인 작업",
    role: "웹 개발",
    status: "지금은 쓰지 않아요",
    tags: ["HTML", "JavaScript"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "영단어를 정해진 순서가 아니라 무작위로 확인할 수 있는 웹 단어장이에요. 단어 데이터를 data.js 파일에 따로 두고 브라우저에서 불러와서, 화면 코드를 건드리지 않고 단어만 바꿀 수 있게 했어요.",
      "처음 웹을 익히던 때라 HTML과 JavaScript만으로 만들었어요. 단어 목록을 불러와 화면에 그리는 흐름을 연습한 코드와 수정 기록을 지금도 보관하고 있어요.",
    ],
    highlights: [],
    links: [],
    featured: false,
    collection: "personal",
    recordType: "learning",
    resumeSelected: false,
    sections: [
      {
        id: "what",
        title: "단어를 섞어서 꺼내 보는 작은 단어장이에요",
        paragraphs: [
          "영단어를 정해진 순서가 아니라 무작위로 확인할 수 있는 웹 단어장이에요. 단어 데이터를 data.js 파일에 따로 두고 브라우저에서 불러와서, 화면 코드를 건드리지 않고 단어만 바꿀 수 있게 했어요.",
        ],
      },
      {
        id: "contribution",
        title: "처음 웹을 배우며 데이터와 화면을 연결해 봤어요",
        paragraphs: [
          "처음 웹을 익히던 때라 HTML과 JavaScript만으로 만들었어요. 단어 목록을 불러와 화면에 그리는 흐름을 연습한 코드와 수정 기록을 지금도 보관하고 있어요.",
        ],
      },
    ],
  },
  {
    slug: "personal-website",
    name: "개인 웹사이트의 변천사",
    subtitle:
      "HTML 소개 페이지에서 시작해 지금 보고 계신 포트폴리오까지 이어 온 개인 웹사이트예요.",
    summary:
      "HTML 소개 페이지, JavaScript 홈페이지, Next.js 사이트, Notion 연동 포트폴리오를 차례로 거쳐 왔어요. 저장소는 여럿이지만 같은 사이트를 고쳐 온 과정이에요.",
    period: "2021 — 현재",
    category: "개인 작업",
    role: "기획 / 웹 개발",
    status: "지금 보고 계신 사이트로 이어지고 있어요",
    tags: ["HTML", "JavaScript", "Next.js", "Elysia", "Bun", "MongoDB", "Notion API"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "처음에는 HTML로 저를 소개하는 작은 페이지를 만들었어요. 이후 JavaScript 홈페이지와 Next.js 사이트를 거치면서, 프로젝트와 수상 기록을 Notion에서 관리하고 웹에서 보여 주는 구조로 바꿨어요.",
      "이전 포트폴리오는 Next.js 화면에 Elysia / Bun 서버와 MongoDB를 연결하고, Notion에서 바꾼 내용을 30분마다 가져와 동기화했어요.",
      "저장소가 여럿 남아 있지만 각각 다른 제품이 아니라 같은 개인 웹사이트를 고쳐 온 과정이에요. 지금 보고 계신 사이트도 그동안의 코드와 콘텐츠 구조를 바탕으로 다시 만들고 있어요.",
    ],
    highlights: [],
    links: [
      {
        label: "지금 사이트 (GitHub)",
        href: "https://github.com/jeamxn/jeamxn",
      },
      {
        label: "이전 포트폴리오 (GitHub)",
        href: "https://github.com/jeamxn/portfolio-jeamxn",
      },
    ],
    featured: false,
    collection: "personal",
    recordType: "product",
    resumeSelected: false,
    sections: [
      {
        id: "what",
        title: "저를 소개하는 페이지 하나에서 시작했어요",
        paragraphs: [
          "처음에는 HTML로 저를 소개하는 작은 페이지를 만들었어요. 이후 JavaScript 홈페이지와 Next.js 사이트를 거치면서, 프로젝트와 수상 기록을 Notion에서 관리하고 웹에서 보여 주는 구조로 바꿨어요.",
        ],
      },
      {
        id: "contribution",
        title: "이전 포트폴리오는 Notion을 서버에서 동기화했어요",
        paragraphs: [
          "이전 포트폴리오는 Next.js 화면에 Elysia / Bun 서버와 MongoDB를 연결하고, Notion에서 바꾼 내용을 30분마다 가져와 동기화했어요.",
          "저장소가 여럿 남아 있지만 각각 다른 제품이 아니라 같은 개인 웹사이트를 고쳐 온 과정이에요. 지금 보고 계신 사이트도 그동안의 코드와 콘텐츠 구조를 바탕으로 다시 만들고 있어요.",
        ],
      },
    ],
  },
  {
    slug: "jennie-quiz",
    name: "Jennie Quiz Game",
    subtitle: "문제를 차례로 풀고 마지막에 결과를 보는, 처음 만들어 본 브라우저 퀴즈 게임이에요.",
    summary:
      "브라우저에서 문제를 풀고 결과를 보는 작은 퀴즈 게임이에요. 문제 화면 아홉 개와 종료 화면을 JavaScript로 연결하며 화면 전환을 처음 연습했어요.",
    period: "2021 기록",
    category: "개인 작업",
    role: "웹 개발",
    status: "실험으로 끝났어요",
    tags: ["JavaScript"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "문제 화면을 차례로 넘기고 마지막에 결과를 확인하는 브라우저 퀴즈예요. 문제마다 화면 파일을 하나씩 두고, JavaScript로 입력을 받아 다음 화면으로 넘기는 흐름을 연습했어요.",
      "당시 사용한 인물 이미지와 외부 자산은 권리를 따로 확인해야 해서 다시 공개하지 않고, 구현한 기능만 소개해요.",
    ],
    highlights: [],
    links: [],
    featured: false,
    collection: "personal",
    recordType: "experiment",
    resumeSelected: false,
    sections: [
      {
        id: "what",
        title: "문제 화면을 넘기며 화면 전환을 연습했어요",
        paragraphs: [
          "문제 화면을 차례로 넘기고 마지막에 결과를 확인하는 브라우저 퀴즈예요. 문제마다 화면 파일을 하나씩 두고, JavaScript로 입력을 받아 다음 화면으로 넘기는 흐름을 연습했어요.",
        ],
      },
      {
        id: "contribution",
        title: "당시 쓴 이미지는 다시 싣지 않아요",
        paragraphs: [
          "당시 사용한 인물 이미지와 외부 자산은 권리를 따로 확인해야 해서 다시 공개하지 않고, 구현한 기능만 소개해요.",
        ],
      },
    ],
  },
  {
    slug: "dolly-dot",
    name: "돌리와 도트",
    subtitle: "사람 말을 듣고 좋은 말인지 욕설인지에 따라 물 펌프를 움직이는 메이커 장치예요.",
    summary:
      "Python으로 음성인식 결과를 읽어 Arduino 펌프에 명령을 보내는 팀 프로젝트예요. 저는 프로그래밍을, 동료는 3D 모델링을 맡았어요.",
    period: "2021 — 2022 기록",
    category: "학교에서 만든 것",
    role: "프로그래밍 / 장치 제어",
    status: "메이커 행사 시제품으로 끝났어요",
    tags: ["Python", "SpeechRecognition", "Serial", "Arduino", "IoT"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "음성인식 서비스가 돌려준 문장에서 좋은 말과 욕설에 해당하는 단어를 찾고, 그 결과에 따라 물 펌프가 움직이게 만들었어요. 사람의 말이 Python 프로그램을 거쳐 Arduino 장치의 동작으로 이어지는 구조예요.",
      "저는 Python 프로그램과 Arduino 제어를, 동료는 3D 모델링을 맡았어요. 자체 음성 모델을 학습하는 대신 Google 음성인식 API로 문장을 받고, 단어 검사 결과를 시리얼 통신으로 Arduino에 보내 펌프를 켰어요. 이 시제품으로 부산에서 열린 메이커 행사에 참가했어요.",
    ],
    highlights: [],
    links: [],
    featured: false,
    collection: "school",
    recordType: "experiment",
    resumeSelected: false,
    sections: [
      {
        id: "what",
        title: "말을 듣고 펌프를 움직이는 장치예요",
        paragraphs: [
          "음성인식 서비스가 돌려준 문장에서 좋은 말과 욕설에 해당하는 단어를 찾고, 그 결과에 따라 물 펌프가 움직이게 만들었어요. 사람의 말이 Python 프로그램을 거쳐 Arduino 장치의 동작으로 이어지는 구조예요.",
        ],
      },
      {
        id: "contribution",
        title: "모델을 학습하는 대신 API와 시리얼 통신을 연결했어요",
        paragraphs: [
          "저는 Python 프로그램과 Arduino 제어를, 동료는 3D 모델링을 맡았어요. 자체 음성 모델을 학습하는 대신 Google 음성인식 API로 문장을 받고, 단어 검사 결과를 시리얼 통신으로 Arduino에 보내 펌프를 켰어요. 이 시제품으로 부산에서 열린 메이커 행사에 참가했어요.",
        ],
      },
    ],
  },
  {
    slug: "yongho-intranet",
    name: "용호중학교 인트라넷",
    subtitle: "시간표 · 급식 · 공지 · 대나무숲을 한곳에 모은 중학교 인트라넷이에요.",
    summary:
      "자주 찾는 학교 정보와 소통 화면을 PHP와 JavaScript로 묶은 학교 웹이에요. 원격수업 시간표 다음에 참여한 작업이에요.",
    period: "2021 기록",
    category: "학교에서 만든 것",
    role: "웹 개발",
    status: "코드만 공개돼 있어요",
    tags: ["PHP", "JavaScript"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "시간표와 급식처럼 자주 찾는 정보, 공지와 대나무숲 같은 소통 화면, 계정 화면을 한곳에 모은 중학교 인트라넷이에요. 원격수업 시간표를 만든 뒤 이어서 PHP와 JavaScript로 학교 생활 정보를 묶은 웹에 참여했어요.",
      "저장소에는 PHP와 JavaScript 페이지 구조와 제가 수정한 코드가 남아 있어요. 다만 초기 기능 일부가 한 번에 옮겨져서, 각 기능을 처음 만든 시점까지는 알 수 없어요.",
    ],
    highlights: [],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/jeamxn/Yongho-Intranet",
      },
    ],
    featured: false,
    collection: "school",
    recordType: "product",
    resumeSelected: false,
    sections: [
      {
        id: "what",
        title: "시간표 웹 다음으로 학교 정보를 한곳에 모았어요",
        paragraphs: [
          "시간표와 급식처럼 자주 찾는 정보, 공지와 대나무숲 같은 소통 화면, 계정 화면을 한곳에 모은 중학교 인트라넷이에요. 원격수업 시간표를 만든 뒤 이어서 PHP와 JavaScript로 학교 생활 정보를 묶은 웹에 참여했어요.",
        ],
      },
      {
        id: "contribution",
        title: "기능마다 처음 만든 시점은 저장소에 남아 있지 않아요",
        paragraphs: [
          "저장소에는 PHP와 JavaScript 페이지 구조와 제가 수정한 코드가 남아 있어요. 다만 초기 기능 일부가 한 번에 옮겨져서, 각 기능을 처음 만든 시점까지는 알 수 없어요.",
        ],
      },
    ],
  },
  {
    slug: "dimi-monster",
    name: "디미충일기",
    subtitle: "친구가 운영하던 급식 · 시간표 웹 '디미충일기'에 화면 수정과 운영 설정을 보탰어요.",
    summary:
      "친구가 만들고 운영하던 교내 급식 / 시간표 웹이에요. 저는 HTML / PHP 화면 수정, 웹 자산 CDN 교체, HTTPS 인증서 발급용 설정 같은 변경을 맡았어요.",
    period: "2022 기록",
    category: "함께 만든 것",
    role: "화면 수정 / 운영 설정",
    status: "친구 프로젝트에 일부만 보탰어요",
    tags: ["PHP", "웹 운영"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "친구가 만들고 운영하던 디미충일기에 참여했어요. 교내 급식과 시간표를 보여 주는 웹에서 화면을 손보고 운영에 필요한 설정을 바꿨어요. 전체 서비스를 새로 만든 작업이 아니라, 기존 학교 웹에 필요한 변경을 보탠 협업이에요.",
      "제가 맡은 건 HTML / PHP 화면 수정과 웹 자산 CDN 교체, HTTPS 인증서 발급을 위한 설정 파일 추가예요. 공개 저장소에 이 변경들이 제 커밋으로 남아 있어요.",
    ],
    highlights: [],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/potato179/dimi.monster",
      },
    ],
    featured: false,
    collection: "collaboration",
    recordType: "contribution",
    resumeSelected: false,
    sections: [
      {
        id: "what",
        title: "친구의 서비스에 필요한 변경을 보탰어요",
        paragraphs: [
          "친구가 만들고 운영하던 디미충일기에 참여했어요. 교내 급식과 시간표를 보여 주는 웹에서 화면을 손보고 운영에 필요한 설정을 바꿨어요. 전체 서비스를 새로 만든 작업이 아니라, 기존 학교 웹에 필요한 변경을 보탠 협업이에요.",
        ],
      },
      {
        id: "contribution",
        title: "CDN 교체와 인증서 설정 같은 작은 변경이에요",
        paragraphs: [
          "제가 맡은 건 HTML / PHP 화면 수정과 웹 자산 CDN 교체, HTTPS 인증서 발급을 위한 설정 파일 추가예요. 공개 저장소에 이 변경들이 제 커밋으로 남아 있어요.",
        ],
      },
    ],
  },
  {
    slug: "dimicheck",
    name: "DimiCheck",
    subtitle: "학생증 바코드를 찍기만 하면 자습 위치가 등록되는 교내 도구예요.",
    summary:
      "매번 로그인해서 위치를 고르던 자습 등록을 카메라 스캔으로 바꿨어요. 학반별 현황은 TV 화면에서 볼 수 있어요.",
    period: "2022 기록",
    category: "학교에서 만든 것",
    role: "기획 / 웹 개발",
    status: "코드만 공개돼 있어요",
    tags: ["JavaScript", "PHP", "Barcode camera"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "자습 위치를 등록하려면 공용 휴대폰으로 매번 아이디와 비밀번호를 치고 화면을 찾아가야 했어요. 그래서 학생증 바코드를 스마트폰 카메라로 읽어 바로 등록되게 만들고, 나갈 때 · 들어올 때 · 위치를 바꿀 때를 같은 도구에서 처리하도록 구성했어요. 화장실처럼 잠깐 나가는 경우는 위치를 고르지 않고 바코드만 찍으면 돼요.",
      "학반을 입력해 두면 스마트 TV 화면에서 그 반의 자습 현황을 볼 수 있는 클라이언트도 함께 만들었어요. 여러 반을 한 화면에 더할 수 있어요. JavaScript와 PHP로 바코드 인식, 위치 등록 / 변경, 학반별 현황 화면을 연결했고, 모든 학반을 지원하도록 만들었지만 실제로 전교에서 쓰였는지는 확인하지 못했어요.",
    ],
    highlights: [],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/jeamxn/DimiCheck",
      },
    ],
    featured: false,
    collection: "school",
    recordType: "product",
    resumeSelected: false,
    sections: [
      {
        id: "what",
        title: "매번 로그인하는 게 번거로워서 학생증을 찍게 했어요",
        paragraphs: [
          "자습 위치를 등록하려면 공용 휴대폰으로 매번 아이디와 비밀번호를 치고 화면을 찾아가야 했어요. 그래서 학생증 바코드를 스마트폰 카메라로 읽어 바로 등록되게 만들고, 나갈 때 · 들어올 때 · 위치를 바꿀 때를 같은 도구에서 처리하도록 구성했어요. 화장실처럼 잠깐 나가는 경우는 위치를 고르지 않고 바코드만 찍으면 돼요.",
        ],
      },
      {
        id: "contribution",
        title: "학반별 현황은 TV에서 봐요",
        paragraphs: [
          "학반을 입력해 두면 스마트 TV 화면에서 그 반의 자습 현황을 볼 수 있는 클라이언트도 함께 만들었어요. 여러 반을 한 화면에 더할 수 있어요. JavaScript와 PHP로 바코드 인식, 위치 등록 / 변경, 학반별 현황 화면을 연결했고, 모든 학반을 지원하도록 만들었지만 실제로 전교에서 쓰였는지는 확인하지 못했어요.",
        ],
      },
    ],
  },
  {
    slug: "leagueofdimi",
    name: "LeagueOfDimi",
    subtitle:
      "우리 반에서 쓰려고 만든 시간표 · 학급 포인트 · 자리 경매 웹이에요. Dipull의 전신이에요.",
    summary:
      "디미고 1학년 때 반에서 쓸 생활 정보를 모은 작은 인트라넷이에요. 당일 시간표와 포인트 순위, 포인트로 하는 자리 경매, 제보 기능이 있었어요.",
    period: "2022 기록",
    category: "학교에서 만든 것",
    role: "초기 기획 / 웹 개발",
    status: "이후 Dipull로 이어졌고 코드만 공개돼 있어요",
    tags: ["PHP", "JavaScript"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "디미고에 입학한 뒤 반에서 쓸 생활 정보를 모은 웹을 만들었어요. 처음부터 학교 전체를 위한 서비스를 계획했다기보다는, 가까운 친구들과 바로 쓸 수 있는 도구에서 시작했어요.",
      "메인에는 당일 시간표와 지금 몇 교시인지 알려 주는 시계를 뒀어요. 반에서 운영하던 학급 포인트 제도를 그대로 옮겨서 포인트 순위를 보고, 모은 포인트로 자리 경매를 하고, 자습 시간에 시끄러운 친구를 제보하는 기능까지 PHP와 JavaScript로 만들었어요.",
      "이후 교내 서비스 장애를 계기로 필요한 기능을 더하면서 Dipull로 확장했어요. 이 기록은 초기 저장소의 작업만 다루고, 그다음은 Dipull에서 이어서 소개해요.",
    ],
    highlights: [],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/jeamxn/LeagueOfDimi",
      },
    ],
    featured: false,
    collection: "school",
    recordType: "product",
    resumeSelected: false,
    sections: [
      {
        id: "what",
        title: "학교 전체가 아니라 우리 반부터 시작했어요",
        paragraphs: [
          "디미고에 입학한 뒤 반에서 쓸 생활 정보를 모은 웹을 만들었어요. 처음부터 학교 전체를 위한 서비스를 계획했다기보다는, 가까운 친구들과 바로 쓸 수 있는 도구에서 시작했어요.",
          "메인에는 당일 시간표와 지금 몇 교시인지 알려 주는 시계를 뒀어요. 반에서 운영하던 학급 포인트 제도를 그대로 옮겨서 포인트 순위를 보고, 모은 포인트로 자리 경매를 하고, 자습 시간에 시끄러운 친구를 제보하는 기능까지 PHP와 JavaScript로 만들었어요.",
        ],
      },
      {
        id: "contribution",
        title: "이후 개발은 Dipull에서 이어가요",
        paragraphs: [
          "이후 교내 서비스 장애를 계기로 필요한 기능을 더하면서 Dipull로 확장했어요. 이 기록은 초기 저장소의 작업만 다루고, 그다음은 Dipull에서 이어서 소개해요.",
        ],
      },
    ],
  },
  {
    slug: "bogo-sort",
    name: "Bogo Sort Challenge",
    subtitle: "일부러 운에 맡기는 정렬, Bogo Sort를 브라우저에서 돌려 본 실험이에요.",
    summary:
      "배열을 정렬될 때까지 무작위로 섞기만 하는 Bogo Sort를 JavaScript로 구현해 본 작은 학습 기록이에요. 빠른 정렬이 아니라 알고리즘이 어떻게 멈추는지 보려고 만들었어요.",
    period: "2022 기록",
    category: "개인 작업",
    role: "JavaScript 실험",
    status: "학습 실험으로 끝났어요",
    tags: ["JavaScript", "Algorithms"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "배열을 무작위로 섞다가 정렬된 상태가 되면 멈추는 Bogo Sort를 브라우저에서 돌려 봤어요. 빠른 정렬이나 제품 성능 개선을 위한 도구가 아니라, 알고리즘이 동작하는 방식을 직접 구현해 본 학습 작업이에요.",
      "배열을 섞는 함수와 정렬 상태를 확인하는 함수를 JavaScript로 쓰고, 테스트 파일에서 돌려 봤어요. 커밋 두 개로 끝난 작은 실험이에요.",
    ],
    highlights: [],
    links: [],
    featured: false,
    collection: "personal",
    recordType: "learning",
    resumeSelected: false,
    sections: [
      {
        id: "what",
        title: "일부러 운에 맡기는 정렬을 구현해 봤어요",
        paragraphs: [
          "배열을 무작위로 섞다가 정렬된 상태가 되면 멈추는 Bogo Sort를 브라우저에서 돌려 봤어요. 빠른 정렬이나 제품 성능 개선을 위한 도구가 아니라, 알고리즘이 동작하는 방식을 직접 구현해 본 학습 작업이에요.",
        ],
      },
      {
        id: "contribution",
        title: "섞기와 정렬 확인을 코드와 테스트로 옮겼어요",
        paragraphs: [
          "배열을 섞는 함수와 정렬 상태를 확인하는 함수를 JavaScript로 쓰고, 테스트 파일에서 돌려 봤어요. 커밋 두 개로 끝난 작은 실험이에요.",
        ],
      },
    ],
  },
  {
    slug: "discord-stlt",
    name: "학교 Discord 봇",
    subtitle: "급식과 학교 정보를 Discord 대화방에서 명령어로 보는 학교 봇이에요.",
    summary:
      "디미고인 API와 Discord.js를 연결한 팀 봇이에요. 급식 명령과 API 연동, 날짜가 하루에 고정되던 버그 수정이 제 커밋으로 남아 있어요.",
    period: "2022 기록",
    category: "학교에서 만든 것",
    role: "봇 연동 / 버그 수정",
    status: "코드만 팀 저장소에 공개돼 있어요",
    tags: ["JavaScript", "Discord.js", "API"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "학교 정보를 Discord 대화방에서도 볼 수 있도록 만든 팀 봇이에요. Discord.js로 봇 기본 코드와 명령어를 잡고 급식 명령을 더한 뒤, 디미고인 API를 연결해 학교 정보를 가져오게 했어요.",
      "API를 연결한 뒤 날짜가 하루에 고정되어 늘 같은 정보가 나오던 문제를 찾아서 고쳤어요. 팀 조직 저장소에 올린 코드이고, 외부 정보를 연결하고 날짜를 처리하는 부분이 제가 맡은 일이었어요.",
    ],
    highlights: [],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/Discord-STLT/discord-bot-v1",
      },
    ],
    featured: false,
    collection: "school",
    recordType: "contribution",
    resumeSelected: false,
    sections: [
      {
        id: "what",
        title: "학교 정보를 Discord에서도 보게 했어요",
        paragraphs: [
          "학교 정보를 Discord 대화방에서도 볼 수 있도록 만든 팀 봇이에요. Discord.js로 봇 기본 코드와 명령어를 잡고 급식 명령을 더한 뒤, 디미고인 API를 연결해 학교 정보를 가져오게 했어요.",
        ],
      },
      {
        id: "contribution",
        title: "날짜가 하루에 고정되던 버그를 고쳤어요",
        paragraphs: [
          "API를 연결한 뒤 날짜가 하루에 고정되어 늘 같은 정보가 나오던 문제를 찾아서 고쳤어요. 팀 조직 저장소에 올린 코드이고, 외부 정보를 연결하고 날짜를 처리하는 부분이 제가 맡은 일이었어요.",
        ],
      },
    ],
  },
  {
    slug: "zero",
    name: "ZERO",
    subtitle: "친환경 활동 서비스 ZERO의 소개 페이지와 환경영향 테스트, 앱 화면을 만들었어요.",
    summary:
      "팀원의 친환경 아이디어를 교내에서 시험해 본 팀 프로젝트예요. 저는 랜딩 / 환경영향 테스트 / 플로깅 · 마켓 · 픽업 화면을 HTML / CSS / JavaScript로 맡았어요.",
    period: "2022 기록",
    category: "함께 만든 것",
    role: "프론트엔드 개발",
    status: "교내에서 시도한 뒤 프로토타입에서 멈췄어요",
    tags: ["HTML", "CSS", "JavaScript", "Product UI"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "팀원이 발견한 친환경 활동 아이디어를 교내에서 시험해 봤어요. 서비스 소개와 환경영향 테스트, 플로깅 / 마켓 / 픽업 화면을 만들어 팀의 아이디어를 직접 살펴볼 수 있게 했어요.",
      "저는 HTML / CSS / JavaScript로 소개 페이지, 지구를 얼마나 망가뜨리는지 묻는 환경영향 테스트, 앱 화면을 맡았어요. 세 저장소에 나뉘어 있고, 교내에서 시도한 뒤 멈춘 시제품이라 당시 코드와 실험 과정만 남아 있어요.",
    ],
    highlights: [],
    links: [
      {
        label: "소개 사이트 (GitHub)",
        href: "https://github.com/zero-young-com/zero-front-v2",
      },
      {
        label: "환경영향 테스트 (GitHub)",
        href: "https://github.com/zero-young-com/zero-env-test",
      },
    ],
    featured: false,
    collection: "collaboration",
    recordType: "experiment",
    resumeSelected: false,
    sections: [
      {
        id: "what",
        title: "친환경 아이디어를 교내에서 먼저 시험했어요",
        paragraphs: [
          "팀원이 발견한 친환경 활동 아이디어를 교내에서 시험해 봤어요. 서비스 소개와 환경영향 테스트, 플로깅 / 마켓 / 픽업 화면을 만들어 팀의 아이디어를 직접 살펴볼 수 있게 했어요.",
        ],
      },
      {
        id: "contribution",
        title: "제 몫은 화면 세 갈래였어요",
        paragraphs: [
          "저는 HTML / CSS / JavaScript로 소개 페이지, 지구를 얼마나 망가뜨리는지 묻는 환경영향 테스트, 앱 화면을 맡았어요. 세 저장소에 나뉘어 있고, 교내에서 시도한 뒤 멈춘 시제품이라 당시 코드와 실험 과정만 남아 있어요.",
        ],
      },
    ],
  },
  {
    slug: "zeping",
    name: "ZEPING",
    subtitle: "밴드로 받은 자녀 위치를 보호자와 ZEP 공간에 연결하는 해커톤 프로토타입의 서버예요.",
    summary:
      "2022 Junction 해커톤에서 PHP와 MySQL로 사용자 / 밴드 / 위치 / 메시지 API를 만들고 ZEP 연동 데이터를 맡았어요.",
    period: "2022 기록",
    category: "함께 만든 것",
    role: "백엔드 개발",
    status: "2022 Junction 해커톤 프로토타입에서 멈췄어요",
    tags: ["PHP", "MySQL", "Geolocation", "Hackathon"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "밴드와 보호자 / 자녀의 위치 정보를 연결하고 ZEP 안에서도 활용하려던 해커톤 프로토타입이에요. 짧은 개발 기간 안에 클라이언트가 바로 쓸 사용자와 위치, 메시지 서버 기능을 만들었어요.",
      "저는 PHP와 MySQL로 사용자 / 밴드 / 위치 / 메시지 API를 만들고 ZEP 연동 데이터를 연결했어요. Flutter 앱과 밴드 시뮬레이터는 동료가 맡았어요. 기능을 이어 붙인 해커톤 시제품이라, 실제 아동 안전 효과까지 검증하지는 못했어요.",
    ],
    highlights: [],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/Junction-TOO/zeping_backend",
      },
    ],
    featured: false,
    collection: "collaboration",
    recordType: "experiment",
    resumeSelected: false,
    sections: [
      {
        id: "what",
        title: "밴드 위치를 보호자와 ZEP에 연결하는 서버를 맡았어요",
        paragraphs: [
          "밴드와 보호자 / 자녀의 위치 정보를 연결하고 ZEP 안에서도 활용하려던 해커톤 프로토타입이에요. 짧은 개발 기간 안에 클라이언트가 바로 쓸 사용자와 위치, 메시지 서버 기능을 만들었어요.",
        ],
      },
      {
        id: "contribution",
        title: "앱과 밴드 시뮬레이터는 동료가 맡았어요",
        paragraphs: [
          "저는 PHP와 MySQL로 사용자 / 밴드 / 위치 / 메시지 API를 만들고 ZEP 연동 데이터를 연결했어요. Flutter 앱과 밴드 시뮬레이터는 동료가 맡았어요. 기능을 이어 붙인 해커톤 시제품이라, 실제 아동 안전 효과까지 검증하지는 못했어요.",
        ],
      },
    ],
  },
  {
    slug: "iot-class",
    name: "IoT 서비스기획 실습",
    subtitle: "Raspberry Pi에 온습도 센서와 카메라를 붙여 Python으로 읽어 본 수업 실습이에요.",
    summary: "IoT 서비스기획 수업에서 센서 입력과 카메라 영상을 OpenCV로 다뤄 본 학습 기록이에요.",
    period: "2022 기록",
    category: "학교에서 만든 것",
    role: "Python 실습",
    status: "수업 과제로 끝났어요",
    tags: ["Python", "Raspberry Pi", "OpenCV", "IoT"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "수업에서 온습도 센서와 카메라를 Raspberry Pi에 연결하고 Python으로 값을 읽어 봤어요. 카메라 영상을 OpenCV로 다루면서, 웹 화면 밖에서 들어오는 데이터를 프로그램으로 확인하는 방법을 익혔어요.",
      "온습도 센서 드라이버는 기존 라이브러리를 그대로 사용했고, 제가 쓴 건 기기를 연결해 값을 읽는 실습 코드와 카메라 / OpenCV 코드예요.",
    ],
    highlights: [],
    links: [],
    featured: false,
    collection: "school",
    recordType: "learning",
    resumeSelected: false,
    sections: [
      {
        id: "what",
        title: "브라우저 밖에서 들어오는 데이터를 처음 다뤘어요",
        paragraphs: [
          "수업에서 온습도 센서와 카메라를 Raspberry Pi에 연결하고 Python으로 값을 읽어 봤어요. 카메라 영상을 OpenCV로 다루면서, 웹 화면 밖에서 들어오는 데이터를 프로그램으로 확인하는 방법을 익혔어요.",
        ],
      },
      {
        id: "contribution",
        title: "센서 드라이버는 가져다 쓰고 읽는 코드만 썼어요",
        paragraphs: [
          "온습도 센서 드라이버는 기존 라이브러리를 그대로 사용했고, 제가 쓴 건 기기를 연결해 값을 읽는 실습 코드와 카메라 / OpenCV 코드예요.",
        ],
      },
    ],
  },
  {
    slug: "justartup",
    name: "JUSTARTUP",
    subtitle: "창업동아리 JUST의 멤버 · 프로젝트 · FAQ를 소개하는 동아리 사이트예요.",
    summary:
      "HTML 사이트에 멤버 소개와 FAQ 페이지를 만들고, 이후 같은 사이트를 React와 SCSS로 다시 만드는 후속판을 시작했어요.",
    period: "2022 — 2023 기록",
    category: "학교에서 만든 것",
    role: "프론트엔드 개발",
    status: "코드는 공개돼 있고, 후속판은 프로토타입에서 멈췄어요",
    tags: ["JavaScript", "React", "SCSS"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "디미고 창업동아리 JUST의 활동과 멤버, 프로젝트를 소개하는 사이트예요. 멤버 소개 페이지와 FAQ, 배경 화면, 페이지 사이의 이동을 만들었어요.",
      "이후 같은 사이트를 React로 다시 만드는 후속판을 시작해 라우팅과 SCSS 스타일까지 구성했어요. 초기 HTML 화면부터 React 후속판까지, 같은 동아리 사이트를 여러 번 다듬은 과정을 한 기록으로 모았어요.",
    ],
    highlights: [],
    links: [
      {
        label: "동아리 사이트 (GitHub)",
        href: "https://github.com/JUSTARTUP/just-main-v2",
      },
      {
        label: "React 후속판 (GitHub)",
        href: "https://github.com/JUSTARTUP/just-main-v3",
      },
    ],
    featured: false,
    collection: "school",
    recordType: "product",
    resumeSelected: false,
    sections: [
      {
        id: "what",
        title: "동아리를 소개하는 사이트를 만들었어요",
        paragraphs: [
          "디미고 창업동아리 JUST의 활동과 멤버, 프로젝트를 소개하는 사이트예요. 멤버 소개 페이지와 FAQ, 배경 화면, 페이지 사이의 이동을 만들었어요.",
        ],
      },
      {
        id: "contribution",
        title: "React와 SCSS로 후속판을 시작했어요",
        paragraphs: [
          "이후 같은 사이트를 React로 다시 만드는 후속판을 시작해 라우팅과 SCSS 스타일까지 구성했어요. 초기 HTML 화면부터 React 후속판까지, 같은 동아리 사이트를 여러 번 다듬은 과정을 한 기록으로 모았어요.",
        ],
      },
    ],
  },
  {
    slug: "flirting-coach",
    name: "대화 코치 UI 프로토타입",
    subtitle: "대화 코치 서비스의 채팅 · 로그인 · 분석 화면을 먼저 잡아 본 팀 프로토타입이에요.",
    summary:
      "대화 코치 앱의 채팅 / 로그인 / 분석 화면을 HTML과 JavaScript로 잡아 본 초기 팀 작업이에요. 상담 기능이 실제로 동작하는 서비스는 아니에요.",
    period: "2022 기록",
    category: "함께 만든 것",
    role: "프론트엔드 참여",
    status: "프로토타입에서 멈췄어요",
    tags: ["HTML", "JavaScript"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "대화 코치라는 아이디어를 채팅과 로그인, 분석 화면으로 구성한 팀 프로토타입이에요. HTML과 JavaScript로 화면 구조를 잡은 단계이고, 완성된 상담 서비스는 아니에요.",
      "초기 코드 일부가 한 번에 저장소로 옮겨져 누가 어디까지 만들었는지 전부 나누기는 어렵지만, 채팅 / 로그인 / 분석 화면에 참여한 이력은 커밋으로 남아 있어요. 같은 팀의 다른 앱과는 별도로 작업한 화면이고, 원문 대화와 실제 이용자 자료는 공개하지 않아요.",
    ],
    highlights: [],
    links: [],
    featured: false,
    collection: "collaboration",
    recordType: "experiment",
    resumeSelected: false,
    sections: [
      {
        id: "what",
        title: "화면 구조부터 잡은 초기 프로토타입이에요",
        paragraphs: [
          "대화 코치라는 아이디어를 채팅과 로그인, 분석 화면으로 구성한 팀 프로토타입이에요. HTML과 JavaScript로 화면 구조를 잡은 단계이고, 완성된 상담 서비스는 아니에요.",
        ],
      },
      {
        id: "contribution",
        title: "세부 역할은 남은 기록만큼만 말할 수 있어요",
        paragraphs: [
          "초기 코드 일부가 한 번에 저장소로 옮겨져 누가 어디까지 만들었는지 전부 나누기는 어렵지만, 채팅 / 로그인 / 분석 화면에 참여한 이력은 커밋으로 남아 있어요. 같은 팀의 다른 앱과는 별도로 작업한 화면이고, 원문 대화와 실제 이용자 자료는 공개하지 않아요.",
        ],
      },
    ],
  },
  {
    slug: "sso-school-early",
    name: "SSO School",
    subtitle: "학교 계정과 커뮤니티, 시간표를 한 서비스로 묶으려던 팀의 첫 버전이에요.",
    summary:
      "학교 생활 기능을 한 계정으로 쓰게 하려던 팀 프로젝트의 초기판이에요. Express 서버의 계정 · 권한 · 메일 기능과 React 화면 일부를 맡았어요.",
    period: "2022 — 2023 기록",
    category: "함께 만든 것",
    role: "서버 개발 / 화면 일부 개발",
    status: "초기판에서 멈췄고 지금은 운영하지 않아요",
    tags: ["React", "Express", "MongoDB", "JWT"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "학교 생활에 필요한 기능이 서비스마다 흩어져 있어서 계정도 화면도 따로였어요. 팀에서 학교 계정과 커뮤니티, 시간표를 한 서비스 안에 모으는 첫 버전을 만들기 시작했어요. React 화면과 Express 서버, MongoDB로 구성했어요.",
      "저는 Express 서버에서 계정과 권한, 메일 발송 기능을 만들고 MongoDB와 JWT 인증을 연결했어요. React 화면도 일부 손봤지만 서버 쪽 비중이 더 컸어요. 동료들이 만든 기능도 같은 코드에 남아 있어서, 여기에는 제가 작성한 범위만 적었어요.",
    ],
    highlights: [],
    links: [],
    featured: false,
    collection: "collaboration",
    recordType: "experiment",
    resumeSelected: false,
    sections: [
      {
        id: "what",
        title: "학교 계정 하나로 커뮤니티와 시간표까지 쓰게 하려던 시작",
        paragraphs: [
          "학교 생활에 필요한 기능이 서비스마다 흩어져 있어서 계정도 화면도 따로였어요. 팀에서 학교 계정과 커뮤니티, 시간표를 한 서비스 안에 모으는 첫 버전을 만들기 시작했어요. React 화면과 Express 서버, MongoDB로 구성했어요.",
        ],
      },
      {
        id: "contribution",
        title: "서버의 계정 · 권한 · 메일 쪽을 주로 맡았어요",
        paragraphs: [
          "저는 Express 서버에서 계정과 권한, 메일 발송 기능을 만들고 MongoDB와 JWT 인증을 연결했어요. React 화면도 일부 손봤지만 서버 쪽 비중이 더 컸어요. 동료들이 만든 기능도 같은 코드에 남아 있어서, 여기에는 제가 작성한 범위만 적었어요.",
        ],
      },
    ],
  },
  {
    slug: "gpt-fashion",
    name: "GPT-3 패션 추천 실험",
    subtitle: "날씨와 옷차림 조건을 보내면 GPT-3가 패션을 추천하게 해 봤어요.",
    summary:
      "Express 서버가 날씨와 패션 맥락을 프롬프트에 담아 OpenAI API에 묻고 추천 문장을 돌려줘요. 2023년 초에 짧게 만든 실험이에요.",
    period: "2023 기록",
    category: "개인 작업",
    role: "서버 개발 / OpenAI API 연동",
    status: "짧은 실험으로 끝났어요",
    tags: ["AI", "Express", "OpenAI API"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "모델을 직접 학습하는 대신 제공되는 AI API만으로 작은 서비스 기능을 만들어 본 실험이에요. Express 서버가 날씨와 패션 맥락을 요청에 담아 OpenAI API에 보내고, 돌아온 추천 문장을 응답으로 돌려주게 했어요.",
      "요청을 만들고 응답을 다듬는 서버 코드를 썼어요. 소스가 거의 같은 저장소가 두 개 남아 있는데, 별개의 제품이 아니라 같은 실험과 그 연습 버전이라 하나의 기록으로 모았어요.",
    ],
    highlights: [],
    links: [],
    featured: false,
    collection: "personal",
    recordType: "experiment",
    resumeSelected: false,
    sections: [
      {
        id: "what",
        title: "날씨와 패션 맥락을 프롬프트에 담아 추천을 받아 봤어요",
        paragraphs: [
          "모델을 직접 학습하는 대신 제공되는 AI API만으로 작은 서비스 기능을 만들어 본 실험이에요. Express 서버가 날씨와 패션 맥락을 요청에 담아 OpenAI API에 보내고, 돌아온 추천 문장을 응답으로 돌려주게 했어요.",
        ],
      },
      {
        id: "contribution",
        title: "비슷한 저장소 두 개는 같은 실험이에요",
        paragraphs: [
          "요청을 만들고 응답을 다듬는 서버 코드를 썼어요. 소스가 거의 같은 저장소가 두 개 남아 있는데, 별개의 제품이 아니라 같은 실험과 그 연습 버전이라 하나의 기록으로 모았어요.",
        ],
      },
    ],
  },
  {
    slug: "auto-realfabric",
    name: "AI 패턴 이미지 실험",
    subtitle: "AI로 만든 패턴 이미지를 다듬어 상품으로 올리는 과정을 자동화해 봤어요.",
    summary:
      "OpenAI 이미지 API로 패턴을 만들고 Sharp · Canvas로 편집한 뒤 판매 플랫폼에 올리는 흐름을 한 스크립트로 이어 본 개인 실험이에요.",
    period: "2023 기록",
    category: "개인 작업",
    role: "이미지 API 연동 / 이미지 처리 코드",
    status: "프로토타입에서 멈췄어요",
    tags: ["AI", "JavaScript", "OpenAI API", "Sharp", "Canvas"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "결과 이미지 하나를 만드는 데서 그치지 않고, 다음 단계에서 쓸 수 있는 형태로 바꾸는 것까지 코드로 이었어요. 이미지 생성 API로 패턴을 만들고 Sharp와 Canvas로 후처리한 뒤, 내려받아 상품으로 올리는 순서예요.",
      "생성 · 편집 · 내려받기 · 업로드 · 삭제 단계를 각각 모듈로 나눠 만들었어요. 상품 업로드까지 시도했지만 실제로 팔렸는지는 확인하지 않았어요. 계정과 플랫폼 인증 정보는 공개하지 않고 이미지 처리 부분만 소개해요.",
    ],
    highlights: [],
    links: [],
    featured: false,
    collection: "personal",
    recordType: "experiment",
    resumeSelected: false,
    sections: [
      {
        id: "what",
        title: "패턴 생성부터 편집, 업로드까지 한 흐름으로 이었어요",
        paragraphs: [
          "결과 이미지 하나를 만드는 데서 그치지 않고, 다음 단계에서 쓸 수 있는 형태로 바꾸는 것까지 코드로 이었어요. 이미지 생성 API로 패턴을 만들고 Sharp와 Canvas로 후처리한 뒤, 내려받아 상품으로 올리는 순서예요.",
        ],
      },
      {
        id: "contribution",
        title: "판매까지 갔는지는 확인하지 않았어요",
        paragraphs: [
          "생성 · 편집 · 내려받기 · 업로드 · 삭제 단계를 각각 모듈로 나눠 만들었어요. 상품 업로드까지 시도했지만 실제로 팔렸는지는 확인하지 않았어요. 계정과 플랫폼 인증 정보는 공개하지 않고 이미지 처리 부분만 소개해요.",
        ],
      },
    ],
  },
  {
    slug: "roadcap",
    name: "RoadCap",
    subtitle: "로드뷰 한 장면을 보고 지도에서 그 자리를 찍는 게임이에요.",
    summary:
      "제한 시간 안에 로드뷰 속 위치를 지도에서 고르면 점수가 나오는 웹 게임이에요. React와 Kakao Maps · Leaflet으로 화면을, Express로 서버를 만들었어요.",
    period: "2023 기록",
    category: "개인 작업",
    role: "프론트엔드 / 서버 개발",
    status: "프로토타입에서 멈췄어요",
    tags: ["React", "Geolocation", "Express"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "로드뷰로 거리 풍경을 살펴본 뒤 지도에서 그 위치라고 생각하는 곳을 고르면, 제한 시간 안에 고른 결과로 점수가 나오는 게임이에요. 풍경 보기, 지도 선택, 타이머, 점수를 한 판의 흐름으로 이었어요.",
      "React와 Recoil로 게임 화면과 상태를 만들고, Kakao Maps와 Leaflet으로 지도를, Express로 서버 구조를 구성했어요. 랭킹이나 실제 플레이 기록 같은 운영 기능까지는 확인하지 않은 시제품이고, 당시 코드와 수정 기록은 보관하고 있어요.",
    ],
    highlights: [],
    links: [],
    featured: false,
    collection: "personal",
    recordType: "experiment",
    resumeSelected: false,
    sections: [
      {
        id: "what",
        title: "로드뷰를 보고 지도에서 찍으면 점수가 나와요",
        paragraphs: [
          "로드뷰로 거리 풍경을 살펴본 뒤 지도에서 그 위치라고 생각하는 곳을 고르면, 제한 시간 안에 고른 결과로 점수가 나오는 게임이에요. 풍경 보기, 지도 선택, 타이머, 점수를 한 판의 흐름으로 이었어요.",
        ],
      },
      {
        id: "contribution",
        title: "화면과 지도, 서버 구조를 직접 구성했어요",
        paragraphs: [
          "React와 Recoil로 게임 화면과 상태를 만들고, Kakao Maps와 Leaflet으로 지도를, Express로 서버 구조를 구성했어요. 랭킹이나 실제 플레이 기록 같은 운영 기능까지는 확인하지 않은 시제품이고, 당시 코드와 수정 기록은 보관하고 있어요.",
        ],
      },
    ],
  },
  {
    slug: "youtube-karaoke",
    name: "YouTube Karaoke",
    subtitle: "노래방 인기곡을 찾아 YouTube에서 바로 따라 부르게 돕는 도구예요.",
    summary:
      "노래 검색과 인기곡 목록을 주는 Next.js API를 만들고, YouTube 영상 페이지를 노래방처럼 쓰게 돕는 브라우저 확장을 붙였어요. 개인 프로토타입이에요.",
    period: "2023 기록",
    category: "개인 작업",
    role: "웹 API / 브라우저 확장 개발",
    status: "프로토타입에서 멈췄어요",
    tags: ["Next.js", "Browser extension", "API"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "노래를 검색하고 인기곡을 살펴본 뒤 YouTube에서 바로 트는 흐름을 만들었어요. Next.js API가 검색과 인기곡 조회를 맡고, 브라우저 확장이 YouTube 영상 페이지에서 그 결과를 이어서 쓰게 했어요.",
      "검색과 인기곡 조회 API, 영상 페이지를 보조하는 확장 코드를 만들었어요. 느려지는 문제와 스크롤 동작을 고치면서 사용 흐름도 손봤어요. 음악과 영상은 외부 콘텐츠라 이 페이지에 원본을 싣지 않아요.",
    ],
    highlights: [],
    links: [],
    featured: false,
    collection: "personal",
    recordType: "experiment",
    resumeSelected: false,
    sections: [
      {
        id: "what",
        title: "노래 찾기와 YouTube 보기를 한 흐름으로 이었어요",
        paragraphs: [
          "노래를 검색하고 인기곡을 살펴본 뒤 YouTube에서 바로 트는 흐름을 만들었어요. Next.js API가 검색과 인기곡 조회를 맡고, 브라우저 확장이 YouTube 영상 페이지에서 그 결과를 이어서 쓰게 했어요.",
        ],
      },
      {
        id: "contribution",
        title: "속도와 스크롤 문제를 고치며 다듬었어요",
        paragraphs: [
          "검색과 인기곡 조회 API, 영상 페이지를 보조하는 확장 코드를 만들었어요. 느려지는 문제와 스크롤 동작을 고치면서 사용 흐름도 손봤어요. 음악과 영상은 외부 콘텐츠라 이 페이지에 원본을 싣지 않아요.",
        ],
      },
    ],
  },
  {
    slug: "dimigogo",
    name: "Dimigogo",
    subtitle: "학교에서 이동할 때 목적지와 날짜를 고르고 예약하는 앱을 팀에서 만들었어요.",
    summary:
      "지도에서 출발지와 목적지를 고르고 날짜를 정해 예약까지 이어지는 React Native 앱이에요. 카카오 로그인과 지도, 장소 검색 화면과 Fastify 서버를 맡았어요.",
    period: "2023 기록",
    category: "함께 만든 것",
    role: "React Native 화면 / Fastify 서버 개발",
    status: "코드만 공개돼 있어요",
    tags: ["React Native", "Fastify", "MongoDB", "Maps"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "학교에서 이동할 때 필요한 지도와 위치, 차량 정보, 예약을 한 앱에 모으려던 팀 프로젝트예요. 출발지와 목적지를 고르는 창, 날짜와 시간을 고르는 창, 장소 검색을 거쳐 예약까지 가는 흐름을 React Native로 만들었어요.",
      "iOS와 Android 양쪽에서 카카오 로그인이 되게 붙이고, 만료된 토큰이 자동으로 다시 발급되게 했어요. 지도는 카카오와 네이버, 구글 지도를 차례로 붙여 보며 맞췄어요. 장소 검색은 외부 API 대신 서버에 자체 검색 API를 두는 쪽으로 바꿨어요. 서버는 Fastify와 MongoDB로 로그인 연동과 토큰 확인을 처리해요.",
      "앱스토어 배포나 실제 이용까지는 확인하지 않았고, 2023년 6월 이후로는 제 변경이 없어요.",
    ],
    highlights: [],
    links: [
      {
        label: "앱 (GitHub)",
        href: "https://github.com/sso-school/dimigogo-front-v1",
      },
      {
        label: "서버 (GitHub)",
        href: "https://github.com/sso-school/dimigogo-back-v1",
      },
    ],
    featured: false,
    collection: "collaboration",
    recordType: "experiment",
    resumeSelected: false,
    sections: [
      {
        id: "what",
        title: "출발지와 목적지, 날짜를 고르면 예약으로 이어지는 앱",
        paragraphs: [
          "학교에서 이동할 때 필요한 지도와 위치, 차량 정보, 예약을 한 앱에 모으려던 팀 프로젝트예요. 출발지와 목적지를 고르는 창, 날짜와 시간을 고르는 창, 장소 검색을 거쳐 예약까지 가는 흐름을 React Native로 만들었어요.",
        ],
      },
      {
        id: "contribution",
        title: "카카오 로그인과 지도, 서버를 맡았어요",
        paragraphs: [
          "iOS와 Android 양쪽에서 카카오 로그인이 되게 붙이고, 만료된 토큰이 자동으로 다시 발급되게 했어요. 지도는 카카오와 네이버, 구글 지도를 차례로 붙여 보며 맞췄어요. 장소 검색은 외부 API 대신 서버에 자체 검색 API를 두는 쪽으로 바꿨어요. 서버는 Fastify와 MongoDB로 로그인 연동과 토큰 확인을 처리해요.",
          "앱스토어 배포나 실제 이용까지는 확인하지 않았고, 2023년 6월 이후로는 제 변경이 없어요.",
        ],
      },
    ],
  },
  {
    slug: "xiaoxingyun",
    name: "小幸運 연습 웹",
    subtitle: "중국어 수행평가 곡 小幸運의 가사와 한자를 연습하는 웹이에요.",
    summary:
      "수행평가로 부를 노래의 가사를 고르고 한자 표기를 바꿔 가며 연습할 수 있게 만든 React 웹이에요. 수업 준비용으로 직접 만들었어요.",
    period: "2023 기록",
    category: "학교에서 만든 것",
    role: "프론트엔드 개발",
    status: "수행평가 준비용으로 끝났어요",
    tags: ["React", "Education"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "중국어 수행평가로 노래 小幸運을 준비하면서, 가사와 한자를 연습할 작은 화면이 필요했어요. 연습할 부분을 고르고 가사의 한자를 간체로 바꿔 보여 주는 React 화면을 만들었어요.",
      "연습할 내용을 고르는 화면과 가사의 한자 표기를 바꾸는 기능을 React로 구현했어요. 수업 준비용으로 만든 화면만 소개하고, 외부 가사 원문은 싣지 않아요.",
    ],
    highlights: [],
    links: [],
    featured: false,
    collection: "school",
    recordType: "learning",
    resumeSelected: false,
    sections: [
      {
        id: "what",
        title: "가사를 고르고 한자 표기를 바꿔 가며 연습해요",
        paragraphs: [
          "중국어 수행평가로 노래 小幸運을 준비하면서, 가사와 한자를 연습할 작은 화면이 필요했어요. 연습할 부분을 고르고 가사의 한자를 간체로 바꿔 보여 주는 React 화면을 만들었어요.",
        ],
      },
      {
        id: "contribution",
        title: "수업 준비용으로 제게 맞춰 만든 작은 도구예요",
        paragraphs: [
          "연습할 내용을 고르는 화면과 가사의 한자 표기를 바꾸는 기능을 React로 구현했어요. 수업 준비용으로 만든 화면만 소개하고, 외부 가사 원문은 싣지 않아요.",
        ],
      },
    ],
  },
  {
    slug: "teacher-day",
    name: "스승의 날 메시지 웹",
    subtitle: "스승의 날에 선생님께 보낼 메시지를 모아 보여 주는 웹이에요.",
    summary:
      "선생님별로 메시지를 남기고 역할에 따라 모아 볼 수 있게 만든 학교 행사 웹이에요. Next.js와 MongoDB로 제출과 조회, 로그인까지 짧은 기간에 만들었어요.",
    period: "2023 기록",
    category: "학교에서 만든 것",
    role: "풀스택 개발",
    status: "행사용으로 만들었고 지금은 운영하지 않아요",
    tags: ["Next.js", "MongoDB", "Auth"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "스승의 날에 학생들이 선생님께 메시지를 남기고, 그 메시지를 역할에 따라 모아 볼 수 있는 웹이 필요했어요. Next.js와 MongoDB로 제출과 조회 화면을 만들고 카카오 로그인을 붙여 스승의 날 직전에 짧게 완성했어요.",
      "메시지 제출 · 조회 화면과 로그인 기능을 만들었어요. Enter를 누르면 메시지가 의도와 다르게 바로 전송되는 문제와 특수문자 처리 버그는 이슈로 남기고 고쳤어요. 실제 메시지와 개인정보는 싣지 않고 만든 기능만 소개해요.",
    ],
    highlights: [],
    links: [],
    featured: false,
    collection: "school",
    recordType: "product",
    resumeSelected: false,
    sections: [
      {
        id: "what",
        title: "선생님별로 메시지를 남기고 모아 보는 행사 웹",
        paragraphs: [
          "스승의 날에 학생들이 선생님께 메시지를 남기고, 그 메시지를 역할에 따라 모아 볼 수 있는 웹이 필요했어요. Next.js와 MongoDB로 제출과 조회 화면을 만들고 카카오 로그인을 붙여 스승의 날 직전에 짧게 완성했어요.",
        ],
      },
      {
        id: "contribution",
        title: "Enter 전송과 특수문자 버그를 고쳤어요",
        paragraphs: [
          "메시지 제출 · 조회 화면과 로그인 기능을 만들었어요. Enter를 누르면 메시지가 의도와 다르게 바로 전송되는 문제와 특수문자 처리 버그는 이슈로 남기고 고쳤어요. 실제 메시지와 개인정보는 싣지 않고 만든 기능만 소개해요.",
        ],
      },
    ],
  },
  {
    slug: "dimigo-election",
    name: "디미고 선거 웹",
    subtitle: "학교 선거에서 후보를 고르고 현황을 볼 수 있게 만든 웹이에요.",
    summary:
      "후보 선택과 선거 현황 화면을 Next.js와 MongoDB로 만든 학교 선거 웹이에요. 박성민과 처음 함께한 작업으로, 저는 코드를 쓰고 성민은 운영 설정을 맡았어요.",
    period: "2023 기록",
    category: "학교에서 만든 것",
    role: "웹 개발 / 운영 설정 협업",
    status: "환경설정을 뺀 코드 사본이 공개돼 있어요",
    tags: ["Next.js", "MongoDB"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "학교 선거에서 후보를 고르고 선거 현황을 볼 수 있는 웹이 필요했어요. Next.js로 후보 선택과 현황 화면을 만들고 MongoDB로 데이터를 처리했어요.",
      "박성민과 처음 함께한 작업이에요. 저는 코드를 작성하고, 성민은 운영 설정을 맡아 웹을 사용할 수 있는 형태로 연결했어요. 공개된 저장소는 환경설정을 제거한 같은 프로젝트의 코드 사본이에요. 학교 선거를 위해 만든 웹이라, 법적 완결성이나 보안 인증을 갖춘 투표 시스템으로 검증한 건 아니에요.",
    ],
    highlights: [],
    links: [
      {
        label: "코드 사본 (GitHub)",
        href: "https://github.com/sso-school/dimigo-election-without-env",
      },
    ],
    featured: false,
    collection: "school",
    recordType: "product",
    resumeSelected: false,
    sections: [
      {
        id: "what",
        title: "후보를 고르고 현황을 보는 선거 웹",
        paragraphs: [
          "학교 선거에서 후보를 고르고 선거 현황을 볼 수 있는 웹이 필요했어요. Next.js로 후보 선택과 현황 화면을 만들고 MongoDB로 데이터를 처리했어요.",
        ],
      },
      {
        id: "contribution",
        title: "박성민과 처음으로 개발과 운영을 나눠 맡았어요",
        paragraphs: [
          "박성민과 처음 함께한 작업이에요. 저는 코드를 작성하고, 성민은 운영 설정을 맡아 웹을 사용할 수 있는 형태로 연결했어요. 공개된 저장소는 환경설정을 제거한 같은 프로젝트의 코드 사본이에요. 학교 선거를 위해 만든 웹이라, 법적 완결성이나 보안 인증을 갖춘 투표 시스템으로 검증한 건 아니에요.",
        ],
      },
    ],
  },
  {
    slug: "assertive-school-main",
    name: "학교 / 팀 메인 사이트 초안",
    subtitle: "학교와 팀을 소개할 메인 사이트의 뼈대를 Next.js로 잡았어요.",
    summary:
      "공통 헤더와 푸터, 페이지 이동 경로까지만 만든 메인 사이트 초안이에요. 제 기록은 전체 페이지를 채우기 전 레이아웃 단계까지예요.",
    period: "2023 기록",
    category: "학교에서 만든 것",
    role: "프론트엔드 개발",
    status: "초안 단계의 코드만 공개돼 있어요",
    tags: ["Next.js"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "학교와 팀을 소개하는 메인 사이트를 만들기 전에, 먼저 공통 레이아웃과 화면 구조부터 잡았어요. Next.js로 헤더와 푸터를 만들고 페이지 사이 이동 경로를 연결했어요.",
      "제가 남긴 작업은 공통 헤더와 푸터, 라우팅 설정과 Docker 빌드 설정까지예요. 비슷한 시기의 초기 저장소 두 곳에 나뉘어 있어서 같은 레이아웃을 만든 과정으로 한 기록에 모았어요. 그 뒤 페이지가 어디까지 채워졌는지는 확인하지 않았어요.",
    ],
    highlights: [],
    links: [
      {
        label: "초안 코드 (GitHub)",
        href: "https://github.com/sso-school/assertive-main-v1",
      },
    ],
    featured: false,
    collection: "school",
    recordType: "experiment",
    resumeSelected: false,
    sections: [
      {
        id: "what",
        title: "헤더 · 푸터 · 라우팅까지 잡은 초안",
        paragraphs: [
          "학교와 팀을 소개하는 메인 사이트를 만들기 전에, 먼저 공통 레이아웃과 화면 구조부터 잡았어요. Next.js로 헤더와 푸터를 만들고 페이지 사이 이동 경로를 연결했어요.",
        ],
      },
      {
        id: "contribution",
        title: "두 저장소에 나뉜 같은 레이아웃 작업이에요",
        paragraphs: [
          "제가 남긴 작업은 공통 헤더와 푸터, 라우팅 설정과 Docker 빌드 설정까지예요. 비슷한 시기의 초기 저장소 두 곳에 나뉘어 있어서 같은 레이아웃을 만든 과정으로 한 기록에 모았어요. 그 뒤 페이지가 어디까지 채워졌는지는 확인하지 않았어요.",
        ],
      },
    ],
  },
  {
    slug: "php-assessment",
    name: "PHP / DB 수행평가",
    subtitle: "PHP와 MySQL로 회원 기능과 테이블 CRUD를 실습한 수업 과제예요.",
    summary:
      "수업에서 PHP로 MySQL에 연결해 테이블을 만들고 데이터를 넣고 지우는 과정과 회원 기능을 파일별로 실습한 수행평가예요.",
    period: "2023 기록",
    category: "학교에서 만든 것",
    role: "PHP / MySQL 실습",
    status: "수업 과제로 끝났어요",
    tags: ["PHP", "MySQL"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "웹 화면에서 들어온 데이터가 서버와 데이터베이스에서 어떻게 저장되고 바뀌는지 수업에서 실습했어요. PHP의 mysqli로 MySQL에 연결하고 테이블 생성, 삽입, 삭제와 회원 기능을 파일별로 나누어 만들었어요.",
      "수업 예제와 수행평가 과제 풀이를 같은 저장소에 함께 저장한 학습 기록이에요. 운영한 서비스가 아니라 기본 흐름을 익히는 과제였어요.",
    ],
    highlights: [],
    links: [],
    featured: false,
    collection: "school",
    recordType: "learning",
    resumeSelected: false,
    sections: [
      {
        id: "what",
        title: "화면 뒤에서 데이터가 저장되고 바뀌는 흐름을 손으로 익혔어요",
        paragraphs: [
          "웹 화면에서 들어온 데이터가 서버와 데이터베이스에서 어떻게 저장되고 바뀌는지 수업에서 실습했어요. PHP의 mysqli로 MySQL에 연결하고 테이블 생성, 삽입, 삭제와 회원 기능을 파일별로 나누어 만들었어요.",
        ],
      },
      {
        id: "contribution",
        title: "예제와 과제 풀이를 한 저장소에 모았어요",
        paragraphs: [
          "수업 예제와 수행평가 과제 풀이를 같은 저장소에 함께 저장한 학습 기록이에요. 운영한 서비스가 아니라 기본 흐름을 익히는 과제였어요.",
        ],
      },
    ],
  },
  {
    slug: "luna-literacy",
    name: "루나 문해력 퀴즈",
    subtitle: "문해력 퀴즈를 풀면 점수판에서 참여 현황이 함께 보이는 행사 웹이에요.",
    summary:
      "문제를 풀고 결과를 확인하는 화면과 학교별 참여 현황 점수판을 Next.js · MongoDB · Socket.IO로 만든 교육 행사 웹이에요.",
    period: "2023 기록",
    category: "학교에서 만든 것",
    role: "풀스택 개발",
    status: "코드만 공개돼 있어요",
    tags: ["Next.js", "Socket.IO", "MongoDB"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "문해력 퀴즈를 한 사람이 풀고 끝나는 게 아니라, 누가 얼마나 참여했는지까지 보이게 하려던 행사 웹이에요. 문제 화면과 결과 화면, 학교별 데이터와 참여 현황을 Next.js와 MongoDB로 구성했어요.",
      "퀴즈 UI와 API를 만들고, Socket.IO로 참여 현황이 점수판에 바로 반영되게 연결했어요. 문제마다 제한 시간을 두고 처음 5초에서 10초로 늘렸고, 휴대폰 화면도 맞췄어요. 나중에 접속 분석과 공유용 미리보기 이미지를 붙였어요.",
    ],
    highlights: [],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/jeamxn/luna-literacy-quiz",
      },
    ],
    featured: false,
    collection: "school",
    recordType: "product",
    resumeSelected: false,
    sections: [
      {
        id: "what",
        title: "문제 풀이에서 참여 현황까지 한 흐름",
        paragraphs: [
          "문해력 퀴즈를 한 사람이 풀고 끝나는 게 아니라, 누가 얼마나 참여했는지까지 보이게 하려던 행사 웹이에요. 문제 화면과 결과 화면, 학교별 데이터와 참여 현황을 Next.js와 MongoDB로 구성했어요.",
        ],
      },
      {
        id: "contribution",
        title: "제한 시간 있는 문제 화면과 바로 갱신되는 점수판을 만들었어요",
        paragraphs: [
          "퀴즈 UI와 API를 만들고, Socket.IO로 참여 현황이 점수판에 바로 반영되게 연결했어요. 문제마다 제한 시간을 두고 처음 5초에서 10초로 늘렸고, 휴대폰 화면도 맞췄어요. 나중에 접속 분석과 공유용 미리보기 이미지를 붙였어요.",
        ],
      },
    ],
  },
  {
    slug: "anony",
    name: "Anony",
    subtitle: "익명으로 질문을 받고 답변을 피드로 보여 주는 웹이에요.",
    summary:
      "누구나 익명으로 질문을 남기고, 받은 사람이 답하거나 숨길 수 있는 질문 웹이에요. Next.js와 MongoDB로 화면과 API를 만들었어요.",
    period: "2023 기록",
    category: "개인 작업",
    role: "풀스택 개발",
    status: "프로토타입에서 멈췄어요",
    tags: ["Next.js", "MongoDB"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "익명으로 질문을 남기면 받은 사람이 답하고, 그 답이 피드에 쌓여 다시 보이는 작은 커뮤니티 구조예요. Next.js와 MongoDB로 화면과 API를 연결했어요.",
      "답변과 피드, 질문 숨김 API를 만들고 쿠키를 쓰는 기능을 넣었어요. 저장소에 다른 협업 이력이 함께 옮겨진 부분이 있어 여기서는 제 변경이 남은 구현만 소개해요. 실제 질문과 이용자 정보는 공개하지 않아요.",
    ],
    highlights: [],
    links: [],
    featured: false,
    collection: "personal",
    recordType: "experiment",
    resumeSelected: false,
    sections: [
      {
        id: "what",
        title: "질문을 모아 답변과 함께 다시 보여 주는 구조",
        paragraphs: [
          "익명으로 질문을 남기면 받은 사람이 답하고, 그 답이 피드에 쌓여 다시 보이는 작은 커뮤니티 구조예요. Next.js와 MongoDB로 화면과 API를 연결했어요.",
        ],
      },
      {
        id: "contribution",
        title: "답변 · 피드 · 숨김 API와 쿠키 처리를 만들었어요",
        paragraphs: [
          "답변과 피드, 질문 숨김 API를 만들고 쿠키를 쓰는 기능을 넣었어요. 저장소에 다른 협업 이력이 함께 옮겨진 부분이 있어 여기서는 제 변경이 남은 구현만 소개해요. 실제 질문과 이용자 정보는 공개하지 않아요.",
        ],
      },
    ],
  },
  {
    slug: "bfoption",
    name: "투자 / 지갑 UI 프로토타입",
    subtitle: "투자 · 주문 · 지갑 정보를 화면별로 나눠 보여 주는 UI 시제품이에요.",
    summary:
      "투자와 주문, 거래, 지갑, 문의 화면을 Next.js와 MUI, Visx로 만든 팀 프로토타입이에요. 실제 금융 거래가 붙은 서비스가 아니라 화면 중심의 시제품이에요.",
    period: "2023 기록",
    category: "함께 만든 것",
    role: "웹 화면 개발",
    status: "프로토타입에서 멈췄어요",
    tags: ["Next.js", "MUI", "Visx", "MongoDB"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "투자와 주문, 거래, 지갑 정보처럼 한 화면에 다 담기 어려운 내용을 여러 화면으로 나눠 보여 주는 프로토타입에 참여했어요. Next.js와 MUI로 화면을, Visx로 데이터 표시를 구성했어요.",
      "웹 화면과 MongoDB 연동 구조를 만들고 고쳤어요. 3주 남짓 PR 단위로 작업을 올리며 팀과 맞췄어요. 실거래와 사업 승인, 금융 계산의 정확성까지 확인한 서비스는 아니에요. 그래서 고객과 계좌 정보, 거래 수치는 싣지 않고 화면 개발 내용만 소개해요.",
    ],
    highlights: [],
    links: [],
    featured: false,
    collection: "collaboration",
    recordType: "experiment",
    resumeSelected: false,
    sections: [
      {
        id: "what",
        title: "복잡한 금융 정보를 화면 단위로 나눴어요",
        paragraphs: [
          "투자와 주문, 거래, 지갑 정보처럼 한 화면에 다 담기 어려운 내용을 여러 화면으로 나눠 보여 주는 프로토타입에 참여했어요. Next.js와 MUI로 화면을, Visx로 데이터 표시를 구성했어요.",
        ],
      },
      {
        id: "contribution",
        title: "실거래 없는 화면 시제품으로만 소개해요",
        paragraphs: [
          "웹 화면과 MongoDB 연동 구조를 만들고 고쳤어요. 3주 남짓 PR 단위로 작업을 올리며 팀과 맞췄어요. 실거래와 사업 승인, 금융 계산의 정확성까지 확인한 서비스는 아니에요. 그래서 고객과 계좌 정보, 거래 수치는 싣지 않고 화면 개발 내용만 소개해요.",
        ],
      },
    ],
  },
  {
    slug: "sso-native-v2",
    name: "SSO School 모바일 UI",
    subtitle: "학교 서비스 화면을 React Native 앱으로 옮겨 본 짧은 실험이에요.",
    summary:
      "웹에서 쓰던 알림과 확인 창을 화면 이동으로 바꾸고 모달을 다듬었어요. 모바일 내비게이션에 맞게 고쳐 본 React Native 후속판이에요.",
    period: "2023 기록",
    category: "개인 작업",
    role: "모바일 화면 개발",
    status: "짧은 실험으로 끝났어요",
    tags: ["React Native"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "학교 서비스의 화면을 React Native로 다시 구성해 본 모바일 후속판이에요. 웹에서 쓰던 알림과 확인 창을 모바일에 맞게 화면 이동 흐름으로 바꾸고, 모달과 화면을 손봤어요.",
      "React Native 화면과 내비게이션, 모달을 수정한 짧은 기록이에요. 이름이 같은 다른 학교 웹과 같은 제품인지는 확인하지 못해서, 이 저장소에서 작업한 화면만 따로 소개해요.",
    ],
    highlights: [],
    links: [],
    featured: false,
    collection: "personal",
    recordType: "experiment",
    resumeSelected: false,
    sections: [
      {
        id: "what",
        title: "알림창 대신 화면 이동으로 바꿨어요",
        paragraphs: [
          "학교 서비스의 화면을 React Native로 다시 구성해 본 모바일 후속판이에요. 웹에서 쓰던 알림과 확인 창을 모바일에 맞게 화면 이동 흐름으로 바꾸고, 모달과 화면을 손봤어요.",
        ],
      },
      {
        id: "contribution",
        title: "같은 이름의 다른 웹과는 따로 떼어 소개해요",
        paragraphs: [
          "React Native 화면과 내비게이션, 모달을 수정한 짧은 기록이에요. 이름이 같은 다른 학교 웹과 같은 제품인지는 확인하지 못해서, 이 저장소에서 작업한 화면만 따로 소개해요.",
        ],
      },
    ],
  },
  {
    slug: "pdf-share",
    name: "PDF Share",
    subtitle: "PDF를 올려 두고 검색해서 다시 여는 작은 공유 웹이에요.",
    summary: "파일 업로드와 검색, PDF 보기 API를 Next.js와 MongoDB로 연결한 개인 프로토타입이에요.",
    period: "2023 기록",
    category: "개인 작업",
    role: "풀스택 개발",
    status: "프로토타입에서 멈췄어요",
    tags: ["Next.js", "MongoDB", "File upload"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "PDF를 올리고 검색한 뒤 다시 열어볼 수 있는 작은 웹이에요. 문서를 저장하는 데서 끝내지 않고 화면에서 다시 찾아 쓰는 흐름까지 Next.js와 MongoDB로 이었어요.",
      "업로드 · 검색 · PDF 조회 API와 웹 화면을 개발했어요. 올라간 문서 원문과 이용자 자료는 공개하지 않아요.",
    ],
    highlights: [],
    links: [],
    featured: false,
    collection: "personal",
    recordType: "experiment",
    resumeSelected: false,
    sections: [
      {
        id: "what",
        title: "올리고, 찾고, 다시 여는 흐름",
        paragraphs: [
          "PDF를 올리고 검색한 뒤 다시 열어볼 수 있는 작은 웹이에요. 문서를 저장하는 데서 끝내지 않고 화면에서 다시 찾아 쓰는 흐름까지 Next.js와 MongoDB로 이었어요.",
        ],
      },
      {
        id: "contribution",
        title: "업로드 · 검색 · PDF 조회 API를 만들었어요",
        paragraphs: [
          "업로드 · 검색 · PDF 조회 API와 웹 화면을 개발했어요. 올라간 문서 원문과 이용자 자료는 공개하지 않아요.",
        ],
      },
    ],
  },
  {
    slug: "voyage",
    name: "Voyage",
    subtitle: "지도에서 위치를 찾고 카메라와 미니게임으로 이어지는 팀 앱이에요.",
    summary:
      "2023년 8월 팀원들과 짧게 만든 시제품이에요. 저는 React Native 앱과 Next.js 웹에서 지도 · 주소 · 카메라 · 미니게임 화면을 맡았어요.",
    period: "2023 기록",
    category: "함께 만든 것",
    role: "모바일 / 웹 공동 개발",
    status: "프로토타입에서 멈췄어요",
    tags: ["React Native", "Next.js", "MongoDB", "Camera", "Maps"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "지도에서 현재 위치와 주소를 확인하고, 거기서 카메라 화면과 미니게임으로 넘어가는 팀 시제품이에요. React Native 앱과 Next.js 웹을 같이 두고, 기기 기능 여러 개를 짧은 기간 안에 한 흐름으로 연결하는 게 목표였어요.",
      "저는 지도 · 주소 · 카메라 · 모달 · 미니게임 화면을 팀원들과 나눠 맡아 앱과 웹 양쪽에 구현했어요. 전체 구현이 아니라 제가 참여한 부분만 소개하고, 링크한 저장소는 공개된 앱 쪽이에요.",
    ],
    highlights: [],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/team-voyage/voyage-app",
      },
    ],
    featured: false,
    collection: "collaboration",
    recordType: "experiment",
    resumeSelected: false,
    sections: [
      {
        id: "what",
        title: "지도에서 카메라, 미니게임까지 한 흐름으로 이었어요",
        paragraphs: [
          "지도에서 현재 위치와 주소를 확인하고, 거기서 카메라 화면과 미니게임으로 넘어가는 팀 시제품이에요. React Native 앱과 Next.js 웹을 같이 두고, 기기 기능 여러 개를 짧은 기간 안에 한 흐름으로 연결하는 게 목표였어요.",
        ],
      },
      {
        id: "contribution",
        title: "제가 맡은 화면과 이 기록의 범위",
        paragraphs: [
          "저는 지도 · 주소 · 카메라 · 모달 · 미니게임 화면을 팀원들과 나눠 맡아 앱과 웹 양쪽에 구현했어요. 전체 구현이 아니라 제가 참여한 부분만 소개하고, 링크한 저장소는 공개된 앱 쪽이에요.",
        ],
      },
    ],
  },
  {
    slug: "ktml",
    name: "KTML",
    subtitle: "div를 구획으로 바꾸듯 HTML 태그 · 속성 이름을 한국어로 쓰고 되돌리는 변환기예요.",
    summary:
      "한국어로 적은 태그를 HTML로, HTML을 다시 한국어로 바꾸는 TypeScript 라이브러리예요. 사전과 정규식 치환으로 동작하고 파일 읽기 · 쓰기와 작은 웹 서버도 붙어 있어요.",
    period: "2023 기록",
    category: "개인 작업",
    role: "변환 라이브러리 / CLI 개발",
    status: "코드만 공개돼 있어요",
    tags: ["TypeScript", "CLI", "Developer tooling"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "HTML의 태그와 속성 이름을 한국어로 적어도 브라우저가 읽는 HTML이 나오게 하고 싶었어요. 태그마다 한국어 이름을 정한 사전을 만들고(div는 구획), 정규식 치환으로 한국어 표현과 HTML 사이를 오가게 했어요. 완전한 HTML 파서나 컴파일러는 아니고 이름을 바꿔 주는 도구예요.",
      "변환 코드와 타입, 파일 읽기 · 쓰기, 결과를 바로 보는 작은 웹 서버를 TypeScript로 만들고 이미지 · 입력 태그까지 사전을 넓혔어요. 코드는 GitHub에 공개돼 있지만 npm 배포나 다른 사람이 쓴 기록은 확인하지 못했어요.",
    ],
    highlights: [],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/jeamxn/ktml",
      },
    ],
    featured: false,
    collection: "personal",
    recordType: "experiment",
    resumeSelected: false,
    sections: [
      {
        id: "what",
        title: "태그 이름을 한국어로 쓰면 어떨까 하는 실험이었어요",
        paragraphs: [
          "HTML의 태그와 속성 이름을 한국어로 적어도 브라우저가 읽는 HTML이 나오게 하고 싶었어요. 태그마다 한국어 이름을 정한 사전을 만들고(div는 구획), 정규식 치환으로 한국어 표현과 HTML 사이를 오가게 했어요. 완전한 HTML 파서나 컴파일러는 아니고 이름을 바꿔 주는 도구예요.",
        ],
      },
      {
        id: "contribution",
        title: "TypeScript로 만든 범위와 지금 상태",
        paragraphs: [
          "변환 코드와 타입, 파일 읽기 · 쓰기, 결과를 바로 보는 작은 웹 서버를 TypeScript로 만들고 이미지 · 입력 태그까지 사전을 넓혔어요. 코드는 GitHub에 공개돼 있지만 npm 배포나 다른 사람이 쓴 기록은 확인하지 못했어요.",
        ],
      },
    ],
  },
  {
    slug: "selectu",
    name: "SelectU 모바일 UI 실험",
    subtitle: "SelectU라는 앱의 React Native 화면들을 만들고 구조를 정리했어요.",
    summary:
      "React Native로 여러 페이지와 컴포넌트를 나눠 만든 초기 UI 작업이에요. 제품이 어디까지 갔는지는 남은 기록이 없어요.",
    period: "2023 기록",
    category: "개인 작업",
    role: "모바일 화면 개발",
    status: "초기 화면 작업에서 멈췄어요",
    tags: ["React Native"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "SelectU라는 이름으로 모바일 페이지 여러 장과 공용 컴포넌트를 React Native로 만들었어요. 어떤 서비스가 되려던 건지는 남은 기록이 없어서, 여기서는 초기 UI 작업으로만 소개해요.",
      "페이지와 컴포넌트를 폴더로 나누고 import 경로를 정리한 코드가 남아 있어요. 저장소는 비공개라 코드 링크는 없어요.",
    ],
    highlights: [],
    links: [],
    featured: false,
    collection: "personal",
    recordType: "experiment",
    resumeSelected: false,
    sections: [
      {
        id: "what",
        title: "화면 여러 장을 먼저 그려 본 React Native 프로젝트예요",
        paragraphs: [
          "SelectU라는 이름으로 모바일 페이지 여러 장과 공용 컴포넌트를 React Native로 만들었어요. 어떤 서비스가 되려던 건지는 남은 기록이 없어서, 여기서는 초기 UI 작업으로만 소개해요.",
        ],
      },
      {
        id: "contribution",
        title: "남아 있는 건 화면 코드와 정리된 import 구조예요",
        paragraphs: [
          "페이지와 컴포넌트를 폴더로 나누고 import 경로를 정리한 코드가 남아 있어요. 저장소는 비공개라 코드 링크는 없어요.",
        ],
      },
    ],
  },
  {
    slug: "student-council",
    name: "학생회 지출 현황 웹",
    subtitle: "학생회 돈이 누구에게, 언제 나갔는지 한눈에 보는 웹이에요.",
    summary:
      "학생회 지출을 사람별 · 시간순으로 모아 합계와 잔액을 보여 주는 웹이에요. 학생회에서 쓰려고 Next.js와 MongoDB로 만들었어요.",
    period: "2023 기록",
    category: "학교에서 만든 것",
    role: "풀스택 개발",
    status: "지금은 운영하지 않아요",
    tags: ["Next.js", "MongoDB"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "학생회 지출은 한 줄씩 쌓이는 목록이라 누가 얼마를 썼는지와 언제 얼마가 나갔는지를 한 번에 보기 어려웠어요. 그래서 하나의 지출 목록을 사람별 화면과 타임라인 화면으로 나눠 보여 주고, 각 화면에서 합계와 잔액을 바로 확인하게 만들었어요.",
      "사람별 · 타임라인별 화면과 합계 · 잔액 계산을 Next.js와 MongoDB로 개발했어요. 실제 지출 내역과 개인정보는 공개하지 않고, 저장소도 비공개예요.",
    ],
    highlights: [],
    links: [],
    featured: false,
    collection: "school",
    recordType: "product",
    resumeSelected: false,
    sections: [
      {
        id: "what",
        title: "같은 지출 목록을 사람과 시간, 두 방향으로 읽게 했어요",
        paragraphs: [
          "학생회 지출은 한 줄씩 쌓이는 목록이라 누가 얼마를 썼는지와 언제 얼마가 나갔는지를 한 번에 보기 어려웠어요. 그래서 하나의 지출 목록을 사람별 화면과 타임라인 화면으로 나눠 보여 주고, 각 화면에서 합계와 잔액을 바로 확인하게 만들었어요.",
        ],
      },
      {
        id: "contribution",
        title: "Next.js와 MongoDB로 만들었고 실제 내역은 싣지 않아요",
        paragraphs: [
          "사람별 · 타임라인별 화면과 합계 · 잔액 계산을 Next.js와 MongoDB로 개발했어요. 실제 지출 내역과 개인정보는 공개하지 않고, 저장소도 비공개예요.",
        ],
      },
    ],
  },
  {
    slug: "refer-place",
    name: "수하물 보관 파트너 웹",
    subtitle: "짐을 맡아 주는 매장이 운영시간 · 휴일 · 보관 조건을 직접 관리하는 파트너 웹이에요.",
    summary:
      "수하물 보관 서비스의 매장용 웹이에요. 팀에서 저는 Next.js 프론트엔드를 맡아 매장 정보 등록부터 당일 보관 현황까지 화면을 만들었어요.",
    period: "2023 기록",
    category: "함께 만든 것",
    role: "파트너 웹 프론트엔드",
    status: "2023년 12월 이후로는 참여하지 않았어요",
    tags: ["Next.js", "TypeScript", "Maps", "i18n", "IndexedDB"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "짐을 맡아 주는 매장이 자기 정보를 등록하고 운영 조건을 관리하는 파트너 웹이에요. 휴일과 운영시간, 매장 사진, 보관 가능한 조건을 입력하고, 오늘 맡은 짐과 전체 현황을 따로 보게 했어요. 같은 서비스라도 짐을 맡기는 이용자 앱과 받는 매장 화면은 하는 일이 달라서 둘을 나눠 만들었어요.",
      "저는 Next.js 파트너 웹 프론트엔드를 맡아 지도와 주소 검색 입력, 다국어 사전, IndexedDB 저장, QR 관련 화면을 만들었어요. 이용자 앱과 백엔드는 동료가 개발했고, 서비스가 실제로 운영됐는지는 확인하지 못했어요. 팀의 고객 정보와 운영 자료는 공개하지 않아요.",
    ],
    highlights: [],
    links: [],
    featured: false,
    collection: "collaboration",
    recordType: "experiment",
    resumeSelected: false,
    sections: [
      {
        id: "what",
        title: "짐을 맡기는 이용자와 받는 매장은 필요한 화면이 달라요",
        paragraphs: [
          "짐을 맡아 주는 매장이 자기 정보를 등록하고 운영 조건을 관리하는 파트너 웹이에요. 휴일과 운영시간, 매장 사진, 보관 가능한 조건을 입력하고, 오늘 맡은 짐과 전체 현황을 따로 보게 했어요. 같은 서비스라도 짐을 맡기는 이용자 앱과 받는 매장 화면은 하는 일이 달라서 둘을 나눠 만들었어요.",
        ],
      },
      {
        id: "contribution",
        title: "지도와 주소 입력, 다국어, 브라우저 저장까지 프론트를 맡았어요",
        paragraphs: [
          "저는 Next.js 파트너 웹 프론트엔드를 맡아 지도와 주소 검색 입력, 다국어 사전, IndexedDB 저장, QR 관련 화면을 만들었어요. 이용자 앱과 백엔드는 동료가 개발했고, 서비스가 실제로 운영됐는지는 확인하지 못했어요. 팀의 고객 정보와 운영 자료는 공개하지 않아요.",
        ],
      },
    ],
  },
  {
    slug: "luna-bot",
    name: "LUNA 봇 실습",
    subtitle: "동아리 Discord 봇의 뼈대와 echo 슬래시 명령을 만들어 봤어요.",
    summary: "TypeScript와 Discord.js로 봇을 띄우고 슬래시 명령 하나에 답하게 한 짧은 실습이에요.",
    period: "2024 기록",
    category: "학교에서 만든 것",
    role: "봇 코드 실습",
    status: "명령 하나를 만든 실습에서 멈췄어요",
    tags: ["TypeScript", "Discord.js"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "동아리 LUNA에서 쓸 Discord 봇을 만들려고 실행 구조를 잡고, 사용자가 보낸 말을 그대로 돌려주는 echo 슬래시 명령을 붙였어요. TypeScript와 Discord.js로 명령을 받고 응답하는 한 바퀴를 확인하는 게 목적이었어요.",
      "커밋 두 개 분량의 초기 코드라, 동아리 운영을 자동화한 봇이 아니라 명령 하나를 처리하는 흐름을 연습한 기록이에요. 저장소는 비공개예요.",
    ],
    highlights: [],
    links: [],
    featured: false,
    collection: "school",
    recordType: "learning",
    resumeSelected: false,
    sections: [
      {
        id: "what",
        title: "명령 하나가 오가는 흐름부터 확인했어요",
        paragraphs: [
          "동아리 LUNA에서 쓸 Discord 봇을 만들려고 실행 구조를 잡고, 사용자가 보낸 말을 그대로 돌려주는 echo 슬래시 명령을 붙였어요. TypeScript와 Discord.js로 명령을 받고 응답하는 한 바퀴를 확인하는 게 목적이었어요.",
        ],
      },
      {
        id: "contribution",
        title: "동아리 운영 봇이 아니라 실습 단계예요",
        paragraphs: [
          "커밋 두 개 분량의 초기 코드라, 동아리 운영을 자동화한 봇이 아니라 명령 하나를 처리하는 흐름을 연습한 기록이에요. 저장소는 비공개예요.",
        ],
      },
    ],
  },
  {
    slug: "systems-course",
    name: "시스템 프로그래밍 학습",
    subtitle: "C로 Linux의 파일 · 프로세스 · 메모리 · 소켓을 직접 만져 본 수업이에요.",
    summary:
      "고등학교 시스템 프로그래밍 수업에서 C로 푼 실습과 과제, 수업 노트예요. 웹에서 당연하게 쓰던 운영체제 기능을 작은 코드로 확인했어요.",
    period: "2024 기록",
    category: "학교에서 만든 것",
    role: "C / Linux 수업 실습",
    status: "수업 과제로 끝났어요",
    tags: ["C", "Linux", "System programming"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "웹 서비스를 만들 때는 파일을 열고 프로세스를 띄우고 소켓으로 통신하는 일을 프레임워크가 대신해 줬어요. 이 수업에서는 그 밑단을 C로 직접 다뤘어요. Linux에서 파일 입출력, 프로세스 생성, 메모리, IPC, 소켓 통신을 작은 코드로 하나씩 확인했어요.",
      "GitHub Classroom 과제 저장소에 풀이를 제출했고, 수업 시간에 따라 친 코드와 노트는 따로 공개 저장소에 남겼어요. 교재와 선생님 예제가 제 풀이와 섞여 있어서, 제품 코드가 아니라 수업에서 배운 기록으로 소개해요.",
    ],
    highlights: [],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/jeamxn/2024-sys-prog-classtime",
      },
    ],
    featured: false,
    collection: "school",
    recordType: "learning",
    resumeSelected: false,
    sections: [
      {
        id: "what",
        title: "웹 아래에서 운영체제가 해 주던 일을 C로 확인했어요",
        paragraphs: [
          "웹 서비스를 만들 때는 파일을 열고 프로세스를 띄우고 소켓으로 통신하는 일을 프레임워크가 대신해 줬어요. 이 수업에서는 그 밑단을 C로 직접 다뤘어요. Linux에서 파일 입출력, 프로세스 생성, 메모리, IPC, 소켓 통신을 작은 코드로 하나씩 확인했어요.",
        ],
      },
      {
        id: "contribution",
        title: "실습 풀이와 수업 노트를 함께 남겼어요",
        paragraphs: [
          "GitHub Classroom 과제 저장소에 풀이를 제출했고, 수업 시간에 따라 친 코드와 노트는 따로 공개 저장소에 남겼어요. 교재와 선생님 예제가 제 풀이와 섞여 있어서, 제품 코드가 아니라 수업에서 배운 기록으로 소개해요.",
        ],
      },
    ],
  },
  {
    slug: "impeachment",
    name: "국민동의청원 현황 대시보드",
    subtitle: "국회 국민동의청원의 동의 수가 얼마나 빨리 느는지 보여 주는 대시보드예요.",
    summary:
      "공개된 청원 동의 수를 모아 분 · 시간 단위 증가량과 그래프, 예상 시간을 보여 준 Next.js 웹이에요. 2024년 7월에 짧게 만들어 돌린 일회성 작업이에요.",
    period: "2024 기록",
    category: "개인 작업",
    role: "풀스택 개발",
    status: "지금은 운영하지 않아요",
    tags: ["Next.js", "Data visualization"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "청원 페이지는 지금 동의 수만 보여 줘서, 얼마나 빠르게 늘고 있는지는 알기 어려웠어요. 공개된 동의 수를 가져와 MongoDB에 쌓고, 분 · 시간 단위 증가량과 그래프, 예상 시간을 한 화면에 그렸어요.",
      "Next.js로 수집한 수치와 화면을 연결하고, 화면에 열린국회정보 같은 공공 데이터 출처를 표시했어요. 예상 시간은 실험용 계산이라 검증된 예측은 아니고, 2024년 7월에 며칠 운영한 뒤로는 돌리지 않아요.",
    ],
    highlights: [],
    links: [],
    featured: false,
    collection: "personal",
    recordType: "experiment",
    resumeSelected: false,
    sections: [
      {
        id: "what",
        title: "숫자 하나가 변하는 속도를 그래프로 보여 줬어요",
        paragraphs: [
          "청원 페이지는 지금 동의 수만 보여 줘서, 얼마나 빠르게 늘고 있는지는 알기 어려웠어요. 공개된 동의 수를 가져와 MongoDB에 쌓고, 분 · 시간 단위 증가량과 그래프, 예상 시간을 한 화면에 그렸어요.",
        ],
      },
      {
        id: "contribution",
        title: "출처를 밝힌 짧은 시각화 작업이에요",
        paragraphs: [
          "Next.js로 수집한 수치와 화면을 연결하고, 화면에 열린국회정보 같은 공공 데이터 출처를 표시했어요. 예상 시간은 실험용 계산이라 검증된 예측은 아니고, 2024년 7월에 며칠 운영한 뒤로는 돌리지 않아요.",
        ],
      },
    ],
  },
  {
    slug: "luna-domain",
    name: "LUNA 랜딩 운영 기여",
    subtitle: "동아리 LUNA 랜딩 페이지의 도메인 연결 설정을 고쳤어요.",
    summary:
      "GitHub Pages로 올라간 동아리 랜딩의 CNAME 설정을 정리한 작은 운영 기여예요. 랜딩 화면 자체는 제가 만든 게 아니에요.",
    period: "2024 기록",
    category: "학교에서 만든 것",
    role: "도메인 설정 기여",
    status: "설정을 두 번 고친 작은 기여예요",
    tags: ["DNS", "GitHub Pages"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "LUNA 랜딩 페이지는 GitHub Pages로 서빙되고 있었고, 저는 사이트 주소를 연결하는 CNAME 설정을 삭제했다가 다시 바로잡았어요. 화면을 만드는 일이 아니라, 이미 있는 사이트에 사람들이 들어오는 주소를 관리하는 일이었어요.",
      "이 저장소에서 제 커밋은 CNAME을 고친 두 개뿐이에요. 랜딩 화면과 내용은 다른 사람들이 만들었고, 저는 운영 설정만 손봤어요.",
    ],
    highlights: [],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/LUNA-coding/luna-landing",
      },
    ],
    featured: false,
    collection: "school",
    recordType: "contribution",
    resumeSelected: false,
    sections: [
      {
        id: "what",
        title: "접속 주소가 제대로 가리키도록 CNAME을 손봤어요",
        paragraphs: [
          "LUNA 랜딩 페이지는 GitHub Pages로 서빙되고 있었고, 저는 사이트 주소를 연결하는 CNAME 설정을 삭제했다가 다시 바로잡았어요. 화면을 만드는 일이 아니라, 이미 있는 사이트에 사람들이 들어오는 주소를 관리하는 일이었어요.",
        ],
      },
      {
        id: "contribution",
        title: "랜딩 제작은 제 기여가 아니에요",
        paragraphs: [
          "이 저장소에서 제 커밋은 CNAME을 고친 두 개뿐이에요. 랜딩 화면과 내용은 다른 사람들이 만들었고, 저는 운영 설정만 손봤어요.",
        ],
      },
    ],
  },
  {
    slug: "kiugi-shop",
    name: "KIUGI Notion 쇼핑몰 실험",
    subtitle: "Notion에 상품을 적으면 그대로 웹 쇼핑몰에 뜨게 한 실험이에요.",
    summary:
      "Notion 템플릿을 상품 관리 화면으로 쓰고, Next.js 웹에 로그인 · 메일 · 상품 페이지를 붙인 쇼핑몰 프로토타입이에요.",
    period: "2024 기록",
    category: "개인 작업",
    role: "풀스택 개발",
    status: "프로토타입에서 멈췄어요",
    tags: ["Next.js", "MongoDB", "Notion integration"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "상품 목록이 바뀔 때마다 코드를 수정하는 대신, Notion 템플릿에 상품을 등록하면 웹에 그대로 표시되게 하고 싶었어요. 그래서 콘텐츠를 관리하는 곳(Notion)과 사용자가 보는 화면(웹)을 나누고, 그 사이를 Notion 연동으로 이었어요.",
      "Next.js와 MongoDB로 상품 화면과 로그인 · 토큰 갱신 · 로그아웃, 메일 기능을 만들고 Notion 페이지를 불러오게 했어요. 2024년 9월 구현에서 멈춘 프로토타입이라 실제 주문이나 매출로 이어졌는지는 확인하지 못했고, 비공개 상품과 계정 자료는 싣지 않았어요.",
    ],
    highlights: [],
    links: [],
    featured: false,
    collection: "personal",
    recordType: "experiment",
    resumeSelected: false,
    sections: [
      {
        id: "what",
        title: "상품을 바꿀 때마다 코드를 고치고 싶지 않았어요",
        paragraphs: [
          "상품 목록이 바뀔 때마다 코드를 수정하는 대신, Notion 템플릿에 상품을 등록하면 웹에 그대로 표시되게 하고 싶었어요. 그래서 콘텐츠를 관리하는 곳(Notion)과 사용자가 보는 화면(웹)을 나누고, 그 사이를 Notion 연동으로 이었어요.",
        ],
      },
      {
        id: "contribution",
        title: "로그인과 메일까지 붙였지만 주문은 확인하지 못했어요",
        paragraphs: [
          "Next.js와 MongoDB로 상품 화면과 로그인 · 토큰 갱신 · 로그아웃, 메일 기능을 만들고 Notion 페이지를 불러오게 했어요. 2024년 9월 구현에서 멈춘 프로토타입이라 실제 주문이나 매출로 이어졌는지는 확인하지 못했고, 비공개 상품과 계정 자료는 싣지 않았어요.",
        ],
      },
    ],
  },
  {
    slug: "kiugi-exam",
    name: "모의고사 키우기",
    subtitle: "EBSi 모의고사 기출문제를 로그인 없이 한곳에서 찾아 받는 웹이에요.",
    summary:
      "학년과 검색 조건으로 모의고사 기출 자료를 찾고 다운로드하는 Next.js 웹이에요. 원래는 EBSi에 로그인해야 받을 수 있던 자료를 한 화면에 모았어요.",
    period: "2024 — 2025 기록",
    category: "개인 작업",
    role: "프론트엔드 개발",
    status: "코드는 공개돼 있고 지금은 접속이 안 돼요",
    tags: ["Next.js", "Education"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "모의고사 기출문제는 EBSi에 로그인한 뒤 회차별로 찾아 내려받아야 했어요. 학년을 고르고 검색하면 바로 목록이 뜨고 다운로드까지 이어지도록, 로그인 없이 쓰는 웹을 Next.js로 만들었어요.",
      "검색과 학년 선택, 다운로드 UI를 개발했고 2025년 2월까지 손봤어요. 문제 콘텐츠는 출제 기관의 자료이고 저는 찾는 화면을 만들었어요. 코드는 GitHub에 공개돼 있지만 연결돼 있던 도메인은 지금 열리지 않아요.",
    ],
    highlights: [],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/jeamxn/kiugi-exam",
      },
    ],
    featured: false,
    collection: "personal",
    recordType: "product",
    resumeSelected: false,
    sections: [
      {
        id: "what",
        title: "로그인하고 찾아다니던 기출문제를 한 화면에 모았어요",
        paragraphs: [
          "모의고사 기출문제는 EBSi에 로그인한 뒤 회차별로 찾아 내려받아야 했어요. 학년을 고르고 검색하면 바로 목록이 뜨고 다운로드까지 이어지도록, 로그인 없이 쓰는 웹을 Next.js로 만들었어요.",
        ],
      },
      {
        id: "contribution",
        title: "자료를 찾는 화면을 맡았고 문제는 출제 기관 것이에요",
        paragraphs: [
          "검색과 학년 선택, 다운로드 UI를 개발했고 2025년 2월까지 손봤어요. 문제 콘텐츠는 출제 기관의 자료이고 저는 찾는 화면을 만들었어요. 코드는 GitHub에 공개돼 있지만 연결돼 있던 도메인은 지금 열리지 않아요.",
        ],
      },
    ],
  },
  {
    slug: "t1-calendar",
    name: "T1 Calendar",
    subtitle: "T1 이벤트 일정을 캘린더 앱에서 구독하게 ICS로 바꿔 주는 도구예요.",
    summary:
      "팬 사이트에 올라오는 T1 일정을 달마다 받아 캐시하고, 캘린더 앱이 읽는 ICS로 만들어 주는 개인 도구예요. TypeScript와 Bun으로 만들었어요.",
    period: "2025 기록",
    category: "개인 작업",
    role: "수집기 / 캘린더 변환 개발",
    status: "코드는 공개돼 있고 지금 돌아가는지는 몰라요",
    tags: ["TypeScript", "ICS", "Data ingestion"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "좋아하는 팀의 일정은 팬 사이트 안에서만 볼 수 있어서, 제 캘린더 앱에 다른 일정과 함께 두고 싶었어요. 공개된 일정을 달 단위로 받아 하루 동안 캐시에 두고, 일반 캘린더 앱이 구독할 수 있는 ICS 형식으로 변환하게 만들었어요.",
      "TypeScript와 Bun으로 수집 · 캐시 · ICS 생성 코드를 만들고 시간대 처리를 고쳤어요. 팀의 공식 제품이 아니라 개인 도구이고, 지금 서버가 돌아가는지와 구독자 수는 확인하지 못했어요.",
    ],
    highlights: [],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/jeamxn/t1-calendar",
      },
    ],
    featured: false,
    collection: "personal",
    recordType: "product",
    resumeSelected: false,
    sections: [
      {
        id: "what",
        title: "팬 사이트 일정을 제 캘린더에 구독하고 싶었어요",
        paragraphs: [
          "좋아하는 팀의 일정은 팬 사이트 안에서만 볼 수 있어서, 제 캘린더 앱에 다른 일정과 함께 두고 싶었어요. 공개된 일정을 달 단위로 받아 하루 동안 캐시에 두고, 일반 캘린더 앱이 구독할 수 있는 ICS 형식으로 변환하게 만들었어요.",
        ],
      },
      {
        id: "contribution",
        title: "시간대 처리까지 고친 개인 도구예요",
        paragraphs: [
          "TypeScript와 Bun으로 수집 · 캐시 · ICS 생성 코드를 만들고 시간대 처리를 고쳤어요. 팀의 공식 제품이 아니라 개인 도구이고, 지금 서버가 돌아가는지와 구독자 수는 확인하지 못했어요.",
        ],
      },
    ],
  },
  {
    slug: "kiugi-promotion",
    name: "KIUGI AI Playground",
    subtitle: "회원가입부터 OpenAI 요청까지 한 저장소에서 돌아가는 실험 웹이에요.",
    summary:
      "KIUGI 소개 페이지에 계정 · 대시보드 · OpenAI 요청 기능을 붙여 본 웹이에요. Next.js 프론트엔드와 Elysia 서버를 모노레포로 묶었어요.",
    period: "2025 기록",
    category: "개인 작업",
    role: "풀스택 개발",
    status: "실험으로 끝났고 코드는 공개돼 있어요",
    tags: ["Elysia", "Next.js", "MongoDB", "Auth"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "KIUGI를 소개하는 홍보 페이지에 로그인 · 회원가입 · 대시보드와 AI 요청 기능을 함께 얹어 실험했어요. Next.js 프론트엔드와 Elysia 서버를 한 모노레포에 두고 MongoDB로 연결해서, 화면과 서버를 같은 저장소에서 같이 고칠 수 있게 했어요.",
      "JWT 기반 로그인 · 회원가입과 대시보드 흐름, OpenAI에 요청을 보내는 서버 라우트를 만들었어요. 처음 구조에서 모노레포로 옮긴 변경도 PR로 남아 있어요. 홍보 웹으로 실제 쓰였는지는 기록이 없어서 실험 기록으로만 공개해 뒀어요.",
    ],
    highlights: [],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/jeamxn/kiugi-promotion",
      },
    ],
    featured: false,
    collection: "personal",
    recordType: "experiment",
    resumeSelected: false,
    sections: [
      {
        id: "what",
        title: "홍보 페이지와 기능 실험을 한 구조 안에 뒀어요",
        paragraphs: [
          "KIUGI를 소개하는 홍보 페이지에 로그인 · 회원가입 · 대시보드와 AI 요청 기능을 함께 얹어 실험했어요. Next.js 프론트엔드와 Elysia 서버를 한 모노레포에 두고 MongoDB로 연결해서, 화면과 서버를 같은 저장소에서 같이 고칠 수 있게 했어요.",
        ],
      },
      {
        id: "contribution",
        title: "JWT 계정 흐름과 OpenAI 라우트를 구현했어요",
        paragraphs: [
          "JWT 기반 로그인 · 회원가입과 대시보드 흐름, OpenAI에 요청을 보내는 서버 라우트를 만들었어요. 처음 구조에서 모노레포로 옮긴 변경도 PR로 남아 있어요. 홍보 웹으로 실제 쓰였는지는 기록이 없어서 실험 기록으로만 공개해 뒀어요.",
        ],
      },
    ],
  },
  {
    slug: "khu-oop",
    name: "객체지향 프로그래밍 학습",
    subtitle: "경희대 객체지향 프로그래밍 수업에서 C++ 과제를 풀며 남긴 코드예요.",
    summary:
      "2025년 C++ 실습과 과제를 날짜별로 모아 둔 수업 기록이에요. 새 언어를 연습한 흔적이고 제품 코드는 아니에요.",
    period: "2025 기록",
    category: "학교에서 만든 것",
    role: "C++ 수업 실습",
    status: "수업 과제로 끝났어요",
    tags: ["C++", "Education"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "대학 객체지향 프로그래밍 수업에서 C++로 수업 예제와 과제를 풀었어요. 익숙하지 않은 언어와 프로그래밍 방식을 연습하면서 작성한 코드를 날짜별 폴더로 모아 두었어요.",
      "수업 예제와 제가 푼 과제, 실습 파일이 한 저장소에 함께 있어요. 설계부터 한 작업이나 과제 평가 결과가 아니라 당시 연습한 내용이고, 저장소는 비공개예요.",
    ],
    highlights: [],
    links: [],
    featured: false,
    collection: "school",
    recordType: "learning",
    resumeSelected: false,
    sections: [
      {
        id: "what",
        title: "C++와 객체지향을 과제로 익혔어요",
        paragraphs: [
          "대학 객체지향 프로그래밍 수업에서 C++로 수업 예제와 과제를 풀었어요. 익숙하지 않은 언어와 프로그래밍 방식을 연습하면서 작성한 코드를 날짜별 폴더로 모아 두었어요.",
        ],
      },
      {
        id: "contribution",
        title: "예제와 제 풀이가 섞인 학습 기록이에요",
        paragraphs: [
          "수업 예제와 제가 푼 과제, 실습 파일이 한 저장소에 함께 있어요. 설계부터 한 작업이나 과제 평가 결과가 아니라 당시 연습한 내용이고, 저장소는 비공개예요.",
        ],
      },
    ],
  },
  {
    slug: "khu-meal",
    name: "경희대 식단 웹",
    subtitle: "경희대 캠퍼스 식당 식단을 아침 · 점심 · 저녁으로 한 화면에서 보는 웹이에요.",
    summary:
      "캠퍼스 · 식당별 메뉴를 보여 주는 Next.js 웹과 식단을 정기 수집하는 Elysia 서버, 식단 이미지를 읽는 OCR 실험까지 혼자 만들었어요.",
    period: "2025 기록",
    category: "개인 작업",
    role: "웹 / 서버 / 수집기 개발",
    status: "코드는 공개돼 있고 지금은 접속이 안 돼요",
    tags: ["Next.js", "Elysia", "MongoDB", "Python", "EasyOCR", "Cron"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "경희대 식당 메뉴는 식당마다 따로 찾아봐야 해서 끼니마다 번거로웠어요. 캠퍼스와 식당을 고르면 아침 · 점심 · 저녁 메뉴가 바로 보이는 웹을 만들고, 서버가 정해진 시각에 기숙사 식당의 주간 식단을 받아 와 날짜별로 저장하게 했어요.",
      "Next.js 웹과 Elysia · MongoDB 서버, 정기 수집 cron을 만들고 Notion 데이터베이스와도 동기화했어요. 식단 이미지의 글자를 EasyOCR로 읽는 Python 실험도 따로 했는데, 모델을 학습한 건 아니고 기존 OCR 도구를 붙여 본 수준이에요. 웹과 서버 코드는 공개돼 있고 OCR 코드는 비공개예요.",
    ],
    highlights: [],
    links: [
      {
        label: "웹 (GitHub)",
        href: "https://github.com/jeamxn/khu-meal",
      },
      {
        label: "서버 (GitHub)",
        href: "https://github.com/jeamxn/khu-meal-back",
      },
    ],
    featured: false,
    collection: "personal",
    recordType: "product",
    resumeSelected: false,
    sections: [
      {
        id: "what",
        title: "식당마다 따로 찾아보던 식단을 한 화면에 모았어요",
        paragraphs: [
          "경희대 식당 메뉴는 식당마다 따로 찾아봐야 해서 끼니마다 번거로웠어요. 캠퍼스와 식당을 고르면 아침 · 점심 · 저녁 메뉴가 바로 보이는 웹을 만들고, 서버가 정해진 시각에 기숙사 식당의 주간 식단을 받아 와 날짜별로 저장하게 했어요.",
        ],
      },
      {
        id: "contribution",
        title: "웹 · 서버 · OCR 실험을 따로 나눠 만들었어요",
        paragraphs: [
          "Next.js 웹과 Elysia · MongoDB 서버, 정기 수집 cron을 만들고 Notion 데이터베이스와도 동기화했어요. 식단 이미지의 글자를 EasyOCR로 읽는 Python 실험도 따로 했는데, 모델을 학습한 건 아니고 기존 OCR 도구를 붙여 본 수준이에요. 웹과 서버 코드는 공개돼 있고 OCR 코드는 비공개예요.",
        ],
      },
    ],
  },
  {
    slug: "semothon-team8",
    name: "세모톤 TEAM 8",
    subtitle: "학교 활동과 동아리를 등록하고 가입하고 게시판에서 이야기하는 해커톤 팀 서비스예요.",
    summary:
      "2025년 세모톤에서 팀으로 만든 활동 · 동아리 서비스예요. 저는 DB와 계정 · 권한 로직, 활동 API, 메인 · 게시판 UI를 맡았어요.",
    period: "2025 기록",
    category: "함께 만든 것",
    role: "풀스택 공동 개발",
    status: "해커톤에서 만든 시제품이에요",
    tags: ["Hackathon", "Next.js", "Elysia", "MongoDB", "Authorization"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "활동과 동아리 정보를 올리고, 관심 있는 사람이 가입하고, 게시판에서 이야기하는 서비스를 팀으로 만들었어요. 메인 화면부터 활동 API와 정보 수정까지 연결하고, 누가 어디까지 바꿀 수 있는지 나누는 권한 로직을 넣었어요. 해커톤 기간 안에 화면과 서버를 함께 세운 작업이에요.",
      "저는 DB 모델과 계정 · 권한 로직, 활동 API, 메인 · 게시판 UI를 맡았어요. 캘린더는 다른 팀원이 구현했고 저는 리뷰와 병합에 참여했어요. 링크한 저장소는 제 계정 쪽이고 팀 fork와 같은 이력이에요. 수상이나 이후 운영 여부는 확인하지 못했어요.",
    ],
    highlights: [],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/jeamxn/semothon",
      },
    ],
    featured: false,
    collection: "collaboration",
    recordType: "experiment",
    resumeSelected: false,
    sections: [
      {
        id: "what",
        title: "활동 등록부터 가입, 게시판까지 해커톤 기간 안에 이었어요",
        paragraphs: [
          "활동과 동아리 정보를 올리고, 관심 있는 사람이 가입하고, 게시판에서 이야기하는 서비스를 팀으로 만들었어요. 메인 화면부터 활동 API와 정보 수정까지 연결하고, 누가 어디까지 바꿀 수 있는지 나누는 권한 로직을 넣었어요. 해커톤 기간 안에 화면과 서버를 함께 세운 작업이에요.",
        ],
      },
      {
        id: "contribution",
        title: "제 몫과 팀원 몫을 나눠 적어요",
        paragraphs: [
          "저는 DB 모델과 계정 · 권한 로직, 활동 API, 메인 · 게시판 UI를 맡았어요. 캘린더는 다른 팀원이 구현했고 저는 리뷰와 병합에 참여했어요. 링크한 저장소는 제 계정 쪽이고 팀 fork와 같은 이력이에요. 수상이나 이후 운영 여부는 확인하지 못했어요.",
        ],
      },
    ],
  },
  {
    slug: "cau-video",
    name: "학습 영상 배속 확장",
    subtitle:
      "배속 버튼이 없는 학습 영상 페이지에서 재생 속도를 바꾸고 기억하는 Chrome 확장이에요.",
    summary:
      "학습 영상 페이지를 보면서 제가 쓰려고 만든 개인 도구예요. 영상 요소가 새로 바뀌어도 저장한 속도가 그대로 따라와요.",
    period: "2025 기록",
    category: "개인 작업",
    role: "브라우저 확장 개발",
    status: "혼자 쓰려고 만든 도구라 코드는 공개하지 않았어요",
    tags: ["Browser extension", "JavaScript"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "학습 영상 페이지에 배속 옵션이 없어서, 영상 요소의 재생 속도를 직접 바꾸는 Chrome 확장을 만들었어요. 한 번 고른 속도는 저장해 두고 다음에 열 때도 그대로 쓰도록 했어요.",
      "페이지 안에서 영상 요소가 새로 생기거나 바뀌는 경우가 있었어요. 그래서 MutationObserver로 변화를 감지하고, 새 요소에도 저장한 속도를 다시 적용하게 했어요. 확장 설정과 JavaScript 재생 속도 처리까지 작은 범위를 혼자 구성한 도구예요.",
    ],
    highlights: [],
    links: [],
    featured: false,
    collection: "personal",
    recordType: "product",
    resumeSelected: false,
    sections: [
      {
        id: "what",
        title: "배속 버튼이 없는 페이지에 속도 조절을 붙였어요",
        paragraphs: [
          "학습 영상 페이지에 배속 옵션이 없어서, 영상 요소의 재생 속도를 직접 바꾸는 Chrome 확장을 만들었어요. 한 번 고른 속도는 저장해 두고 다음에 열 때도 그대로 쓰도록 했어요.",
        ],
      },
      {
        id: "contribution",
        title: "영상이 바뀌어도 저장한 속도를 다시 적용해요",
        paragraphs: [
          "페이지 안에서 영상 요소가 새로 생기거나 바뀌는 경우가 있었어요. 그래서 MutationObserver로 변화를 감지하고, 새 요소에도 저장한 속도를 다시 적용하게 했어요. 확장 설정과 JavaScript 재생 속도 처리까지 작은 범위를 혼자 구성한 도구예요.",
        ],
      },
    ],
  },
  {
    slug: "openai-watermark",
    name: "텍스트 공백 정리 실험",
    subtitle: "붙여 넣은 텍스트의 공백과 줄바꿈을 정리하고 어디가 달라졌는지 보여 주는 웹이에요.",
    summary:
      "입력 텍스트를 정규화한 뒤 개행과 띄어쓰기를 검사하고, 바뀐 자리를 스크롤 UI에서 짚어 주는 Next.js 실험이에요.",
    period: "2025 기록",
    category: "개인 작업",
    role: "프론트엔드 개발",
    status: "짧게 해 본 실험이고 코드는 공개하지 않았어요",
    tags: ["Next.js", "Text processing"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "텍스트를 눈으로 볼 때는 공백이나 줄바꿈이 어디서 달라지는지 알기 어려워요. 그래서 입력한 텍스트의 공백을 정규화하고 개행과 띄어쓰기를 검사해, 차이를 스크롤 UI에서 확인하는 Next.js 페이지를 만들었어요.",
      "저장소 이름에는 워터마크가 들어가지만, 실제로 구현한 건 입력 텍스트를 정리하고 차이를 보여 주는 기능까지예요. AI 워터마크를 지우는 효과를 입증한 도구는 아니에요.",
    ],
    highlights: [],
    links: [],
    featured: false,
    collection: "personal",
    recordType: "experiment",
    resumeSelected: false,
    sections: [
      {
        id: "what",
        title: "공백과 줄바꿈 차이를 화면에서 보이게 했어요",
        paragraphs: [
          "텍스트를 눈으로 볼 때는 공백이나 줄바꿈이 어디서 달라지는지 알기 어려워요. 그래서 입력한 텍스트의 공백을 정규화하고 개행과 띄어쓰기를 검사해, 차이를 스크롤 UI에서 확인하는 Next.js 페이지를 만들었어요.",
        ],
      },
      {
        id: "contribution",
        title: "저장소 이름과 실제로 한 일은 달라요",
        paragraphs: [
          "저장소 이름에는 워터마크가 들어가지만, 실제로 구현한 건 입력 텍스트를 정리하고 차이를 보여 주는 기능까지예요. AI 워터마크를 지우는 효과를 입증한 도구는 아니에요.",
        ],
      },
    ],
  },
  {
    slug: "univ-festa",
    name: "대학축제 일정 웹",
    subtitle: "2025년 대학 축제의 날짜와 출연진을 대학별로 모아 보는 웹이에요.",
    summary:
      "Notion에 정리한 축제 데이터를 Bun · Elysia 서버가 읽어 와요. Next.js 화면에서는 날짜 · 요일 · 게스트 목록으로 보여 줘요.",
    period: "2025 기록",
    category: "개인 작업",
    role: "웹 / 서버 개발",
    status: "2025년 행사에 맞춰 만든 웹이고, 코드는 공개돼 있어요",
    tags: ["Next.js", "Elysia", "Notion API"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "여러 대학의 축제 일정과 출연진을 한 곳에서 보려고 만든 웹이에요. 대학별 날짜와 요일, 게스트 목록을 보여 주고, 데이터는 Notion에 정리해 두고 서버가 읽어 오는 구조예요.",
      "화면은 Next.js와 React Query로, 서버는 Bun과 Elysia로 만들었어요. 데이터는 Notion API에서 가져오도록 연결했어요. 올리고 나서는 요일 계산과 기준 날짜, 게스트 표시를 고쳐 나갔어요. 행사 기간에 맞춘 짧은 개인 프로젝트예요.",
    ],
    highlights: [],
    links: [
      {
        label: "웹 (GitHub)",
        href: "https://github.com/jeamxn/univ-festa",
      },
      {
        label: "서버 (GitHub)",
        href: "https://github.com/jeamxn/univ-festa-back",
      },
    ],
    featured: false,
    collection: "personal",
    recordType: "product",
    resumeSelected: false,
    sections: [
      {
        id: "what",
        title: "대학별 축제 날짜와 출연진을 한 화면에 모았어요",
        paragraphs: [
          "여러 대학의 축제 일정과 출연진을 한 곳에서 보려고 만든 웹이에요. 대학별 날짜와 요일, 게스트 목록을 보여 주고, 데이터는 Notion에 정리해 두고 서버가 읽어 오는 구조예요.",
        ],
      },
      {
        id: "contribution",
        title: "Next.js 화면과 Elysia 서버, Notion 연동을 직접 만들었어요",
        paragraphs: [
          "화면은 Next.js와 React Query로, 서버는 Bun과 Elysia로 만들었어요. 데이터는 Notion API에서 가져오도록 연결했어요. 올리고 나서는 요일 계산과 기준 날짜, 게스트 표시를 고쳐 나갔어요. 행사 기간에 맞춘 짧은 개인 프로젝트예요.",
        ],
      },
    ],
  },
  {
    slug: "data-course",
    name: "영화 리뷰 수집 과제",
    subtitle:
      "대학 데이터분석 수업 과제로 영화 리뷰의 점수 · 본문 · 날짜를 모으는 수집 코드를 짰어요.",
    summary:
      "영화 코드를 찾은 뒤 리뷰를 긁어 오는 TypeScript 수집기예요. 분석에 쓸 데이터를 모으는 단계까지 진행했어요.",
    period: "2025 기록",
    category: "학교에서 만든 것",
    role: "데이터 수집 코드 개발",
    status: "수업 과제로 끝났고 코드는 공개하지 않았어요",
    tags: ["TypeScript", "Data collection", "Education"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "데이터분석 과제를 하려면 분석할 리뷰 데이터가 먼저 있어야 했어요. 그래서 영화 코드를 찾고, 영화별 리뷰의 점수와 글, 작성 날짜를 추출하는 수집 코드를 TypeScript로 만들었어요.",
      "Bun 위에서 axios로 페이지를 받고 cheerio로 리뷰 항목을 골라냈어요. 저장소에 남아 있는 건 수집 코드까지라, 최종 분석 결과나 발표는 이 기록에 넣지 않았어요. 원본 리뷰와 작성자 정보도 공개하지 않아요.",
    ],
    highlights: [],
    links: [],
    featured: false,
    collection: "school",
    recordType: "learning",
    resumeSelected: false,
    sections: [
      {
        id: "what",
        title: "분석보다 먼저 데이터를 모으는 코드부터 만들었어요",
        paragraphs: [
          "데이터분석 과제를 하려면 분석할 리뷰 데이터가 먼저 있어야 했어요. 그래서 영화 코드를 찾고, 영화별 리뷰의 점수와 글, 작성 날짜를 추출하는 수집 코드를 TypeScript로 만들었어요.",
        ],
      },
      {
        id: "contribution",
        title: "Bun과 cheerio로 수집했고, 분석 단계는 기록에 없어요",
        paragraphs: [
          "Bun 위에서 axios로 페이지를 받고 cheerio로 리뷰 항목을 골라냈어요. 저장소에 남아 있는 건 수집 코드까지라, 최종 분석 결과나 발표는 이 기록에 넣지 않았어요. 원본 리뷰와 작성자 정보도 공개하지 않아요.",
        ],
      },
    ],
  },
  {
    slug: "election-live",
    name: "2025 개표 현황 웹",
    subtitle:
      "2025년 선거 개표가 진행되는 동안 공개 개표율과 후보별 득표 수를 카드로 보여 준 대시보드예요.",
    summary:
      "Next.js API로 공개 수치를 받아 후보 카드에 색상과 함께 그려 주는 일회성 화면이에요. 선거 당일에 맞춰 하루 안에 만들었어요.",
    period: "2025 기록",
    category: "개인 작업",
    role: "프론트엔드 / API 개발",
    status: "선거 당일에 맞춘 일회성 화면이라 코드는 공개하지 않았어요",
    tags: ["Next.js", "Data visualization"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "2025년 선거 개표가 진행되는 동안 공개된 개표율과 후보별 득표 수를 바뀌는 대로 읽고 싶었어요. 그래서 Next.js API로 공개 수치를 받아 오고, 후보마다 카드와 색상으로 표시하는 대시보드를 만들었어요.",
      "공식 선거 시스템이나 특정 후보를 지지하는 작업과는 관계없고, 공개된 수치를 보기 좋게 옮긴 개인 화면이에요. 개발도 그날 하루에 끝났어요.",
    ],
    highlights: [],
    links: [],
    featured: false,
    collection: "personal",
    recordType: "experiment",
    resumeSelected: false,
    sections: [
      {
        id: "what",
        title: "개표 당일 바뀌는 수치를 카드로 읽게 했어요",
        paragraphs: [
          "2025년 선거 개표가 진행되는 동안 공개된 개표율과 후보별 득표 수를 바뀌는 대로 읽고 싶었어요. 그래서 Next.js API로 공개 수치를 받아 오고, 후보마다 카드와 색상으로 표시하는 대시보드를 만들었어요.",
        ],
      },
      {
        id: "contribution",
        title: "공개 수치만 옮긴 개인 화면이에요",
        paragraphs: [
          "공식 선거 시스템이나 특정 후보를 지지하는 작업과는 관계없고, 공개된 수치를 보기 좋게 옮긴 개인 화면이에요. 개발도 그날 하루에 끝났어요.",
        ],
      },
    ],
  },
  {
    slug: "halsam",
    name: "Halsam",
    subtitle:
      "GPT · 모바일뱅킹 · 온라인쇼핑 사용법을 한 단계씩 음성과 그림으로 따라가는 안내 화면이에요.",
    summary: "주제를 고르면 챕터별 그림 설명과 음성을 차례로 들려주는 Next.js 프로토타입이에요.",
    period: "2025 기록",
    category: "개인 작업",
    role: "프론트엔드 개발",
    status: "화면 프로토타입에서 멈췄고 코드는 공개하지 않았어요",
    tags: ["Next.js", "Audio UI", "Education"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "서비스 사용법을 긴 글 하나로 읽는 건 따라 하기 어려워요. 그래서 GPT와 모바일뱅킹, 온라인쇼핑 같은 주제를 고르면 챕터별로 그림과 설명을 보여 주고, 각 단계의 음성을 들려주는 화면을 만들었어요.",
      "Next.js로 돌려 가며 고르는 주제 선택 화면과 설명 화면을 만들고, HTMLAudioElement로 단계마다 음성이 재생되도록 연결했어요. 안내 UI까지만 만든 단계라 실제 AI 챗봇 기능이나 접근성 효과는 검증하지 못했고, 예시에 개인정보나 금융 계정 자료는 넣지 않았어요.",
    ],
    highlights: [],
    links: [],
    featured: false,
    collection: "personal",
    recordType: "experiment",
    resumeSelected: false,
    sections: [
      {
        id: "what",
        title: "긴 설명서 대신 화면을 따라가며 배우게 했어요",
        paragraphs: [
          "서비스 사용법을 긴 글 하나로 읽는 건 따라 하기 어려워요. 그래서 GPT와 모바일뱅킹, 온라인쇼핑 같은 주제를 고르면 챕터별로 그림과 설명을 보여 주고, 각 단계의 음성을 들려주는 화면을 만들었어요.",
        ],
      },
      {
        id: "contribution",
        title: "주제 선택과 음성 재생까지 만든 UI 단계예요",
        paragraphs: [
          "Next.js로 돌려 가며 고르는 주제 선택 화면과 설명 화면을 만들고, HTMLAudioElement로 단계마다 음성이 재생되도록 연결했어요. 안내 UI까지만 만든 단계라 실제 AI 챗봇 기능이나 접근성 효과는 검증하지 못했고, 예시에 개인정보나 금융 계정 자료는 넣지 않았어요.",
        ],
      },
    ],
  },
  {
    slug: "schedule-checker",
    name: "Schedule Checker",
    subtitle: "방 코드 하나로 모여 각자 가능한 시간을 등록하는 일정 조율 웹이에요.",
    summary:
      "메신저에 흩어지는 '나는 몇 시 돼요'를 한 화면에 모으려고 만들었어요. Next.js 화면과 Elysia · MongoDB 서버로 방 생성부터 시간 등록까지 이어져요.",
    period: "2025 기록",
    category: "개인 작업",
    role: "풀스택 개발",
    status: "기본 흐름까지 만든 프로토타입이고, 코드는 공개돼 있어요",
    tags: ["Next.js", "Elysia", "MongoDB"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "약속을 잡을 때 각자 되는 시간이 메신저 여기저기에 흩어져요. 그래서 방을 만들고 방 코드로 들어가, 사람마다 시작과 종료 시간을 등록하는 웹을 만들었어요.",
      "Next.js 프론트엔드와 Elysia · MongoDB 서버를 직접 구성했어요. 방 생성과 코드 진입, 시작 · 종료 시간 등록을 화면과 데이터로 연결했어요. 시간을 모으는 기본 흐름까지 구현한 상태에서 멈춘 프로토타입이라, 실제로 여러 사람과 써 본 기록은 없어요.",
    ],
    highlights: [],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/jeamxn/schedule-checker",
      },
    ],
    featured: false,
    collection: "personal",
    recordType: "experiment",
    resumeSelected: false,
    sections: [
      {
        id: "what",
        title: "흩어진 가능 시간을 방 하나에 모았어요",
        paragraphs: [
          "약속을 잡을 때 각자 되는 시간이 메신저 여기저기에 흩어져요. 그래서 방을 만들고 방 코드로 들어가, 사람마다 시작과 종료 시간을 등록하는 웹을 만들었어요.",
        ],
      },
      {
        id: "contribution",
        title: "방 생성부터 시간 등록까지 화면과 데이터를 이었어요",
        paragraphs: [
          "Next.js 프론트엔드와 Elysia · MongoDB 서버를 직접 구성했어요. 방 생성과 코드 진입, 시작 · 종료 시간 등록을 화면과 데이터로 연결했어요. 시간을 모으는 기본 흐름까지 구현한 상태에서 멈춘 프로토타입이라, 실제로 여러 사람과 써 본 기록은 없어요.",
        ],
      },
    ],
  },
  {
    slug: "future-calc",
    name: "선물 수익 / 청산 계산기",
    subtitle:
      "진입가 · 레버리지 · 수량 · 현재가를 넣으면 예상 수익과 청산가를 바로 보여 주는 계산기예요.",
    summary:
      "값을 바꿀 때마다 결과가 같이 바뀌는 Next.js 계산 화면이에요. 거래소 조건과 수수료까지 맞춘 도구는 아니에요.",
    period: "2025 기록",
    category: "개인 작업",
    role: "프론트엔드 개발",
    status: "코드만 공개돼 있고, 금융 계산의 정확성은 검증하지 않았어요",
    tags: ["Next.js", "Calculators"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "선물 거래에서 진입가와 레버리지, 수량이나 총액, 현재가를 바꿔 가며 수익과 청산가가 어떻게 달라지는지 보고 싶었어요. 그래서 값을 입력하면 결과가 같이 갱신되는 계산 화면을 Next.js로 만들었어요.",
      "수익률과 청산가 관련 입력과 결과 표시 UI를 직접 만들었어요. 실제 거래소의 모든 조건과 수수료는 반영하지 못해서, 투자 조언이나 수익 보장에 쓰는 도구로는 제공하지 않아요. 제 계좌나 거래 기록도 공개하지 않아요.",
    ],
    highlights: [],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/jeamxn/future-calc",
      },
    ],
    featured: false,
    collection: "personal",
    recordType: "experiment",
    resumeSelected: false,
    sections: [
      {
        id: "what",
        title: "입력값을 바꾸면 결과가 바로 따라오게 했어요",
        paragraphs: [
          "선물 거래에서 진입가와 레버리지, 수량이나 총액, 현재가를 바꿔 가며 수익과 청산가가 어떻게 달라지는지 보고 싶었어요. 그래서 값을 입력하면 결과가 같이 갱신되는 계산 화면을 Next.js로 만들었어요.",
        ],
      },
      {
        id: "contribution",
        title: "참고용 계산이고 투자 판단에 쓰는 도구는 아니에요",
        paragraphs: [
          "수익률과 청산가 관련 입력과 결과 표시 UI를 직접 만들었어요. 실제 거래소의 모든 조건과 수수료는 반영하지 못해서, 투자 조언이나 수익 보장에 쓰는 도구로는 제공하지 않아요. 제 계좌나 거래 기록도 공개하지 않아요.",
        ],
      },
    ],
  },
  {
    slug: "movie-checker",
    name: "영화 상영 모니터링",
    subtitle:
      "CGV · 롯데시네마 · 메가박스 상영 정보를 cron으로 주기적으로 긁어 모으는 개인 서버예요.",
    summary:
      "극장 세 곳의 사이트를 하나씩 열어 보는 대신, Bun · Elysia 서버가 정해진 시간마다 상영 정보를 모아 두게 했어요.",
    period: "2025 기록",
    category: "개인 작업",
    role: "서버 / 정기 수집 개발",
    status: "혼자 쓰려고 만든 도구라 코드는 공개하지 않았어요",
    tags: ["Bun", "Elysia", "Cron"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "보고 싶은 영화의 상영 정보를 극장마다 따로 확인하는 게 번거로웠어요. 그래서 CGV와 롯데시네마, 메가박스의 상영 정보를 가져오는 수집 작업을 cron으로 돌리는 서버를 Bun과 Elysia로 만들었어요.",
      "극장별 수집 작업을 따로 두고 cron 실행과 오류 처리를 고쳐 나갔어요. 수집 결과를 알림으로 보내는 단계까지 갔는지는 확인하지 않았고, 계정과 예매 정보는 공개하지 않아요.",
    ],
    highlights: [],
    links: [],
    featured: false,
    collection: "personal",
    recordType: "product",
    resumeSelected: false,
    sections: [
      {
        id: "what",
        title: "세 극장의 상영 정보를 정해진 시간마다 모았어요",
        paragraphs: [
          "보고 싶은 영화의 상영 정보를 극장마다 따로 확인하는 게 번거로웠어요. 그래서 CGV와 롯데시네마, 메가박스의 상영 정보를 가져오는 수집 작업을 cron으로 돌리는 서버를 Bun과 Elysia로 만들었어요.",
        ],
      },
      {
        id: "contribution",
        title: "cron 실행과 오류 처리를 손봤어요",
        paragraphs: [
          "극장별 수집 작업을 따로 두고 cron 실행과 오류 처리를 고쳐 나갔어요. 수집 결과를 알림으로 보내는 단계까지 갔는지는 확인하지 않았고, 계정과 예매 정보는 공개하지 않아요.",
        ],
      },
    ],
  },
  {
    slug: "iframe-maker",
    name: "iframe Maker",
    subtitle: "주소를 넘기면 그 페이지를 iframe에 담은 HTML을 돌려주는 아주 작은 Bun 서버예요.",
    summary:
      "다른 화면에 웹페이지를 끼워 넣어야 할 때 쓰려고 만든 래퍼예요. Bun.serve 하나로 임베드 페이지를 만들어 줘요.",
    period: "2025 기록",
    category: "개인 작업",
    role: "서버 / HTML 개발",
    status: "코드만 공개돼 있어요",
    tags: ["Bun", "HTML"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "웹페이지를 다른 화면에 끼워 넣을 일이 있어서, 주소를 전달하면 그 페이지를 iframe으로 감싼 HTML을 돌려주는 작은 서버를 만들었어요. Bun.serve와 HTML 한 장으로 끝나는 단순한 구조예요.",
      "별도의 브라우저 엔진을 만든 게 아니라 기존 웹을 iframe으로 감싸는 래퍼라서, 상대 페이지가 iframe 임베드를 허용해야 보여요. 필요한 만큼만 만든 작은 도구예요.",
    ],
    highlights: [],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/jeamxn/iframe-maker",
      },
    ],
    featured: false,
    collection: "personal",
    recordType: "product",
    resumeSelected: false,
    sections: [
      {
        id: "what",
        title: "주소 하나로 임베드 페이지를 만들어요",
        paragraphs: [
          "웹페이지를 다른 화면에 끼워 넣을 일이 있어서, 주소를 전달하면 그 페이지를 iframe으로 감싼 HTML을 돌려주는 작은 서버를 만들었어요. Bun.serve와 HTML 한 장으로 끝나는 단순한 구조예요.",
        ],
      },
      {
        id: "contribution",
        title: "브라우저 엔진이 아니라 감싸는 래퍼예요",
        paragraphs: [
          "별도의 브라우저 엔진을 만든 게 아니라 기존 웹을 iframe으로 감싸는 래퍼라서, 상대 페이지가 iframe 임베드를 허용해야 보여요. 필요한 만큼만 만든 작은 도구예요.",
        ],
      },
    ],
  },
  {
    slug: "fearless-banpick",
    name: "Fearless Banpick",
    subtitle:
      "LoL 클라이언트가 떠 있는 호스트의 밴픽 화면을 방 코드로 들어온 사람들이 같이 보는 웹이에요.",
    summary:
      "PeerJS P2P로 호스트의 챔피언 선택을 게스트 화면에 바로 전달하고, 세트마다 이미 쓴 챔피언을 피어리스 규칙으로 막아 줘요.",
    period: "2025 기록",
    category: "개인 작업",
    role: "기획 / 검수",
    status: "코드만 공개돼 있어요",
    tags: ["React", "PeerJS", "WebSocket"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "LoL 클라이언트가 실행 중인 컴퓨터에서 방을 만들어요. 방 코드를 받은 사람들은 호스트의 챔피언 선택 화면을 자기 브라우저에서 그대로 볼 수 있어요. 데이터는 PeerJS P2P로 호스트에서 게스트로 바로 흘러가고, WebSocket으로 선택이 바뀔 때마다 갱신돼요.",
      "세트가 끝나면 밴픽 내역을 기록해 둬요. 논 · 소프트 · 하드 피어리스 규칙에 따라 이미 쓴 챔피언을 다음 세트에서 막아 줘요.",
      "코드와 디자인, 아키텍처는 모두 Claude Sonnet 4.5로 생성했다고 저장소 README에 밝혀 뒀어요. 제가 한 일은 어떤 기능이 필요한지 정하고 결과를 확인하는 쪽이라, 직접 작성한 코드로 내세우지는 않아요.",
    ],
    highlights: [],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/jeamxn/fearless-banpick",
      },
    ],
    featured: false,
    collection: "personal",
    recordType: "experiment",
    resumeSelected: false,
    sections: [
      {
        id: "what",
        title: "호스트의 밴픽 화면을 방 코드로 함께 봐요",
        paragraphs: [
          "LoL 클라이언트가 실행 중인 컴퓨터에서 방을 만들어요. 방 코드를 받은 사람들은 호스트의 챔피언 선택 화면을 자기 브라우저에서 그대로 볼 수 있어요. 데이터는 PeerJS P2P로 호스트에서 게스트로 바로 흘러가고, WebSocket으로 선택이 바뀔 때마다 갱신돼요.",
          "세트가 끝나면 밴픽 내역을 기록해 둬요. 논 · 소프트 · 하드 피어리스 규칙에 따라 이미 쓴 챔피언을 다음 세트에서 막아 줘요.",
        ],
      },
      {
        id: "contribution",
        title: "코드와 디자인은 Claude Sonnet 4.5로 만들었어요",
        paragraphs: [
          "코드와 디자인, 아키텍처는 모두 Claude Sonnet 4.5로 생성했다고 저장소 README에 밝혀 뒀어요. 제가 한 일은 어떤 기능이 필요한지 정하고 결과를 확인하는 쪽이라, 직접 작성한 코드로 내세우지는 않아요.",
        ],
      },
    ],
  },
  {
    slug: "sentry-bugbot",
    name: "Sentry Bugbot",
    subtitle:
      "Sentry에 올라온 오류를 AI 에이전트가 읽고, 저장소를 받아 Docker에서 돌려 보며 고치는 흐름을 시험한 PoC예요.",
    summary:
      "Bun · Elysia 서버 위에 LangChain 에이전트를 두고 Sentry · GitHub · Docker를 도구로 붙였어요. 수정 PR의 정확도까지 검증하진 않았어요.",
    period: "2025 — 2026 기록",
    category: "개인 작업",
    role: "아이디어 / 에이전트 도구 통합",
    status: "코드만 공개돼 있고, 실제 운영에서 검증한 적은 없어요",
    tags: ["AI", "Agent tooling", "LangChain", "Docker", "GitHub API", "Sentry"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "오류 알림을 사람이 읽고 저장소를 열어 재현하는 과정을 AI가 대신 이어 갈 수 있을지 궁금했어요. 그래서 Sentry 오류를 받는 경로와 GitHub 저장소 클론, Docker 실행 환경을 LangChain 에이전트의 도구로 연결했어요.",
      "Bun과 Elysia 서버에 Mongoose 저장소, Docker 실행 · 중지 도구, Sentry 라우트를 구현했어요. 도구 호출이 실패할 때의 오류 처리도 다듬었어요. 모델은 Bedrock과 Anthropic, Ollama를 바꿔 끼울 수 있게 뒀어요. 실제 수정 PR의 정확도나 운영 채택까지는 검증하지 않았고, 오류 원문과 비밀 키는 공개하지 않아요.",
    ],
    highlights: [],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/jeamxn/sentry-bugbot",
      },
    ],
    featured: false,
    collection: "personal",
    recordType: "experiment",
    resumeSelected: false,
    sections: [
      {
        id: "what",
        title: "오류를 읽은 AI가 도구로 수정까지 이어 가는지 봤어요",
        paragraphs: [
          "오류 알림을 사람이 읽고 저장소를 열어 재현하는 과정을 AI가 대신 이어 갈 수 있을지 궁금했어요. 그래서 Sentry 오류를 받는 경로와 GitHub 저장소 클론, Docker 실행 환경을 LangChain 에이전트의 도구로 연결했어요.",
        ],
      },
      {
        id: "contribution",
        title: "서버와 도구 연결까지 만들었고 정확도는 검증 전이에요",
        paragraphs: [
          "Bun과 Elysia 서버에 Mongoose 저장소, Docker 실행 · 중지 도구, Sentry 라우트를 구현했어요. 도구 호출이 실패할 때의 오류 처리도 다듬었어요. 모델은 Bedrock과 Anthropic, Ollama를 바꿔 끼울 수 있게 뒀어요. 실제 수정 PR의 정확도나 운영 채택까지는 검증하지 않았고, 오류 원문과 비밀 키는 공개하지 않아요.",
        ],
      },
    ],
  },
  {
    slug: "chagok",
    name: "Chagok 라우팅 실험",
    subtitle:
      "iOS · Android · 웹에서 같은 선언으로 화면을 옮겨 다니는 React Native 라우팅 기반을 만들어 봤어요.",
    summary:
      "React Native와 React Native Web, Vite를 한데 묶고, 스택과 링크를 타입으로 선언하는 화면 이동 구조를 실험했어요. 생활 앱 자체가 아니라 그 기반까지예요.",
    period: "2025 기록",
    category: "개인 작업",
    role: "프론트엔드 기반 코드 개발",
    status: "라우팅 기반까지 만든 프로토타입이고, 코드는 공개돼 있어요",
    tags: ["React Native", "React Native Web", "TypeScript", "Navigation"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "iOS와 Android, 웹을 따로 라우팅하면 같은 화면 구조를 세 번 적게 돼요. 그래서 React Native와 React Native Web, Vite를 연결했어요. 화면 스택과 링크를 타입 기반으로 한 번만 선언하는 구조를 실험했어요.",
      "스택을 정의하고 타입을 뽑아내는 코드, 링크 처리와 훅을 구성했고 Reanimated와 웹 환경을 함께 다뤘어요. 생활 앱 전체를 만든 게 아니라 화면 이동 기반까지 구현한 공개 프로토타입이에요.",
    ],
    highlights: [],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/jeamxn/chagok",
      },
    ],
    featured: false,
    collection: "personal",
    recordType: "experiment",
    resumeSelected: false,
    sections: [
      {
        id: "what",
        title: "세 플랫폼의 화면 이동을 한 선언으로 다루려 했어요",
        paragraphs: [
          "iOS와 Android, 웹을 따로 라우팅하면 같은 화면 구조를 세 번 적게 돼요. 그래서 React Native와 React Native Web, Vite를 연결했어요. 화면 스택과 링크를 타입 기반으로 한 번만 선언하는 구조를 실험했어요.",
        ],
      },
      {
        id: "contribution",
        title: "스택 선언과 링크, 훅까지 구현한 기반 단계예요",
        paragraphs: [
          "스택을 정의하고 타입을 뽑아내는 코드, 링크 처리와 훅을 구성했고 Reanimated와 웹 환경을 함께 다뤘어요. 생활 앱 전체를 만든 게 아니라 화면 이동 기반까지 구현한 공개 프로토타입이에요.",
        ],
      },
    ],
  },
  {
    slug: "namu-topic",
    name: "Namu Topic",
    subtitle: "실시간 인기 검색어 옆에 왜 떠올랐는지 Gemini가 쓴 짧은 설명을 붙여 주는 웹이에요.",
    summary:
      "Bun 서버가 검색어를 모아 MongoDB에 쌓고, React 화면에서 검색어와 AI 요약을 함께 보여 줘요. 요약은 자동 생성이라 사실 확인이 따로 필요해요.",
    period: "2026 기록",
    category: "개인 작업",
    role: "웹 / 서버 / AI 통합",
    status: "코드만 공개돼 있어요",
    tags: ["React", "Bun", "Gemini", "MongoDB"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "실시간 인기 검색어 목록은 단어만 보여서 왜 화제인지 알 수 없어요. 그래서 검색어를 모으는 Bun 서버와 MongoDB를 두고, Gemini로 각 검색어의 맥락을 요약했어요. React 화면에서는 검색어와 요약을 함께 읽을 수 있어요.",
      "화면과 서버를 함께 만들고 2026년 1월부터 5월까지 검색어 수집과 설명 생성을 손봐 왔어요. 설명은 Gemini가 자동으로 쓴 글이라 사실과 다를 수 있고, 뉴스 정확도나 이용 지표는 따로 확인하지 않았어요.",
    ],
    highlights: [],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/jeamxn/namu-topic",
      },
    ],
    featured: false,
    collection: "personal",
    recordType: "experiment",
    resumeSelected: false,
    sections: [
      {
        id: "what",
        title: "검색어만이 아니라 떠오른 이유까지 보여 줘요",
        paragraphs: [
          "실시간 인기 검색어 목록은 단어만 보여서 왜 화제인지 알 수 없어요. 그래서 검색어를 모으는 Bun 서버와 MongoDB를 두고, Gemini로 각 검색어의 맥락을 요약했어요. React 화면에서는 검색어와 요약을 함께 읽을 수 있어요.",
        ],
      },
      {
        id: "contribution",
        title: "2026년 1월부터 5월까지 고쳐 왔고 요약은 AI가 쓴 글이에요",
        paragraphs: [
          "화면과 서버를 함께 만들고 2026년 1월부터 5월까지 검색어 수집과 설명 생성을 손봐 왔어요. 설명은 Gemini가 자동으로 쓴 글이라 사실과 다를 수 있고, 뉴스 정확도나 이용 지표는 따로 확인하지 않았어요.",
        ],
      },
    ],
  },
  {
    slug: "codeblock-bff",
    name: "CodeBlock BFF",
    subtitle: "여러 API 호출을 블록으로 이어 붙여 하나의 엔드포인트로 실행하는 편집기와 서버예요.",
    summary:
      "Vue Flow로 블록을 드래그해 흐름을 만들고, Bun 서버가 그 흐름을 저장해 두었다가 주소 하나로 실행해 줘요. 성능까지 본 제품은 아니에요.",
    period: "2026 기록",
    category: "개인 작업",
    role: "프론트엔드 / 서버 개발",
    status: "코드만 공개돼 있는 PoC예요",
    tags: ["Vue", "Vue Flow", "Bun", "MongoDB", "Redis"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "여러 API를 묶는 BFF 로직을 매번 코드로 쌓는 대신, 블록을 드래그해 데이터 흐름을 그리면 어떨까 해서 시작했어요. Vue와 Vue Flow로 편집 화면을 만들고, 저장한 흐름을 Bun 서버가 주소 하나로 실행해 주도록 구성했어요.",
      "흐름의 생성 · 수정 · 삭제와 공개한 흐름의 실행, Redis 캐시와 실행 로그를 MongoDB와 함께 구현했어요. 편집한 흐름이 서버에서 실제로 실행되는 단계까지 확인한 PoC라, 프로덕션 환경의 성능은 검증하지 않았어요.",
    ],
    highlights: [],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/jeamxn/codeblock-bff",
      },
    ],
    featured: false,
    collection: "personal",
    recordType: "experiment",
    resumeSelected: false,
    sections: [
      {
        id: "what",
        title: "API 조합을 코드 대신 블록으로 그렸어요",
        paragraphs: [
          "여러 API를 묶는 BFF 로직을 매번 코드로 쌓는 대신, 블록을 드래그해 데이터 흐름을 그리면 어떨까 해서 시작했어요. Vue와 Vue Flow로 편집 화면을 만들고, 저장한 흐름을 Bun 서버가 주소 하나로 실행해 주도록 구성했어요.",
        ],
      },
      {
        id: "contribution",
        title: "저장 · 실행 · 캐시 · 로그까지 만든 PoC예요",
        paragraphs: [
          "흐름의 생성 · 수정 · 삭제와 공개한 흐름의 실행, Redis 캐시와 실행 로그를 MongoDB와 함께 구현했어요. 편집한 흐름이 서버에서 실제로 실행되는 단계까지 확인한 PoC라, 프로덕션 환경의 성능은 검증하지 않았어요.",
        ],
      },
    ],
  },
  {
    slug: "jusawi",
    name: "공유 주사위",
    subtitle: "누가 굴리든 접속한 모든 화면에 같은 주사위 눈이 뜨는 작은 웹이에요.",
    summary:
      "주사위 값과 접속 수를 서버가 들고 있다가 WebSocket으로 모든 화면에 뿌려 주는 장난감 실험이에요.",
    period: "2026 기록",
    category: "개인 작업",
    role: "웹 / WebSocket 서버 개발",
    status: "코드만 공개돼 있는 작은 실험이에요",
    tags: ["Bun", "WebSocket"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "여러 사람이 각자 화면에서 같은 주사위를 보게 하려고, Bun의 WebSocket과 정적 파일 서버를 묶은 작은 웹을 만들었어요. 지금 주사위 값과 접속한 사람 수를 서버가 들고 있다가 모든 화면에 보내 줘요.",
      "주사위 상태와 접속 수를 pub / sub로 연결해서, 값이 하나 바뀌면 접속한 모든 화면이 같은 상태를 받도록 했어요. 짧은 코드로 실시간 상태 공유 흐름을 확인해 본 장난감 수준의 실험이에요.",
    ],
    highlights: [],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/jeamxn/jusawi",
      },
    ],
    featured: false,
    collection: "personal",
    recordType: "experiment",
    resumeSelected: false,
    sections: [
      {
        id: "what",
        title: "한 번 굴리면 모든 화면이 같은 눈을 봐요",
        paragraphs: [
          "여러 사람이 각자 화면에서 같은 주사위를 보게 하려고, Bun의 WebSocket과 정적 파일 서버를 묶은 작은 웹을 만들었어요. 지금 주사위 값과 접속한 사람 수를 서버가 들고 있다가 모든 화면에 보내 줘요.",
        ],
      },
      {
        id: "contribution",
        title: "pub / sub 한 줄기로 실시간 공유를 확인해 봤어요",
        paragraphs: [
          "주사위 상태와 접속 수를 pub / sub로 연결해서, 값이 하나 바뀌면 접속한 모든 화면이 같은 상태를 받도록 했어요. 짧은 코드로 실시간 상태 공유 흐름을 확인해 본 장난감 수준의 실험이에요.",
        ],
      },
    ],
  },
  {
    slug: "vault-get",
    name: "vault-get",
    subtitle: "개발 환경을 준비할 때 Vault의 비밀값을 .env 파일로 내려받는 CLI예요.",
    summary:
      "HashiCorp Vault에 OIDC나 토큰으로 로그인해 KV 시크릿을 .env로 옮겨 주는 Bun · TypeScript 도구예요. 새 환경을 꾸릴 때마다 반복하던 설정 작업을 명령 한 줄로 줄였어요.",
    period: "2026 기록",
    category: "개인 작업",
    role: "CLI 개발",
    status: "코드만 공개돼 있어요",
    tags: ["CLI", "TypeScript", "Bun", "Vault", "OIDC"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "개발 환경을 새로 준비할 때마다 Vault의 값을 환경 설정 파일로 옮기는 일이 반복됐어요. 그래서 시크릿 경로 하나만 넘기면 Vault의 KV 값을 읽어 .env 파일로 써 주는 CLI를 Bun과 TypeScript로 만들었어요. KV v1과 v2를 자동으로 구분하고 출력 파일 이름은 옵션으로 바꿀 수 있어요.",
      "로그인은 OIDC와 토큰 두 방식을 두고, OIDC는 브라우저가 열려 인증이 끝나면 토큰을 자동으로 받아 오게 했어요. 받은 토큰은 설정 파일에 저장해 다음 실행에서 다시 쓰고 만료되면 다시 로그인해요. 운영체제와 아키텍처별 빌드와 설치 스크립트도 정리했어요.",
      "범용 도구의 코드만 공개했고 실제 비밀값과 비공개 주소는 싣지 않았어요. 실제로 얼마나 쓰이는지는 따로 세어 보지 않았어요.",
    ],
    highlights: [],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/jeamxn/vault-get",
      },
    ],
    featured: false,
    collection: "personal",
    recordType: "product",
    resumeSelected: false,
    sections: [
      {
        id: "what",
        title: "경로 하나만 넘기면 Vault의 값이 .env로 내려오게",
        paragraphs: [
          "개발 환경을 새로 준비할 때마다 Vault의 값을 환경 설정 파일로 옮기는 일이 반복됐어요. 그래서 시크릿 경로 하나만 넘기면 Vault의 KV 값을 읽어 .env 파일로 써 주는 CLI를 Bun과 TypeScript로 만들었어요. KV v1과 v2를 자동으로 구분하고 출력 파일 이름은 옵션으로 바꿀 수 있어요.",
        ],
      },
      {
        id: "contribution",
        title: "로그인은 브라우저 OIDC로, 토큰은 다음 실행까지 기억하도록",
        paragraphs: [
          "로그인은 OIDC와 토큰 두 방식을 두고, OIDC는 브라우저가 열려 인증이 끝나면 토큰을 자동으로 받아 오게 했어요. 받은 토큰은 설정 파일에 저장해 다음 실행에서 다시 쓰고 만료되면 다시 로그인해요. 운영체제와 아키텍처별 빌드와 설치 스크립트도 정리했어요.",
          "범용 도구의 코드만 공개했고 실제 비밀값과 비공개 주소는 싣지 않았어요. 실제로 얼마나 쓰이는지는 따로 세어 보지 않았어요.",
        ],
      },
    ],
  },
  {
    slug: "f1-rules",
    name: "F1 규정 문서 뷰어",
    subtitle: "F1 규정 문서를 한국어로 읽을 수 있게 목차와 검색을 붙인 웹이에요.",
    summary:
      "한국어로 옮긴 F1 규정을 Next.js와 MDX로 보여 주는 개인 문서 사이트예요. 목차와 검색으로 원하는 조항을 찾아 읽을 수 있어요.",
    period: "2026 기록",
    category: "개인 작업",
    role: "문서 웹 개발",
    status: "코드는 공개돼 있고 지금은 사이트가 열리지 않아요",
    tags: ["Next.js", "MDX", "Documentation"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "F1 규정은 원문이 길어서 궁금한 조항 하나를 찾아 읽기가 번거로웠어요. 그래서 한국어로 옮긴 규정을 Next.js와 MDX로 올리고, 목차와 검색으로 원하는 부분에 바로 가도록 화면을 만들었어요.",
      "Markdown 처리 구조와 문서 UI를 만들고 remark와 rehype로 본문을 렌더링했어요. FIA의 공식 번역이 아닌 개인 문서 뷰어라서, 규정 해석이 중요할 때는 원문을 함께 확인해야 해요.",
    ],
    highlights: [],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/jeamxn/f1-regulations-korean",
      },
    ],
    featured: false,
    collection: "personal",
    recordType: "experiment",
    resumeSelected: false,
    sections: [
      {
        id: "what",
        title: "긴 규정 원문 대신 목차와 검색이 있는 한국어 문서로",
        paragraphs: [
          "F1 규정은 원문이 길어서 궁금한 조항 하나를 찾아 읽기가 번거로웠어요. 그래서 한국어로 옮긴 규정을 Next.js와 MDX로 올리고, 목차와 검색으로 원하는 부분에 바로 가도록 화면을 만들었어요.",
        ],
      },
      {
        id: "contribution",
        title: "공식 번역이 아니라 원문과 같이 읽어야 해요",
        paragraphs: [
          "Markdown 처리 구조와 문서 UI를 만들고 remark와 rehype로 본문을 렌더링했어요. FIA의 공식 번역이 아닌 개인 문서 뷰어라서, 규정 해석이 중요할 때는 원문을 함께 확인해야 해요.",
        ],
      },
    ],
  },
  {
    slug: "auto-invest",
    name: "거래 상태 동기화 실험",
    subtitle: "거래소에 남은 포지션과 코드가 아는 상태가 어긋나지 않게 맞춘 Python 실험이에요.",
    summary:
      "거래소의 포지션을 읽어 코드의 상태와 맞추고, 청산과 수수료를 반영한 손익을 계산하는 자동 거래 코드의 개인 프로토타입이에요. 실제 서비스가 아니라 혼자 돌려 본 코드예요.",
    period: "2026 기록",
    category: "개인 작업",
    role: "Python 개발",
    status: "프로토타입에서 멈췄어요",
    tags: ["Python", "Trading automation"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "자동 거래 코드는 주문을 낸 뒤의 상태와 거래소에 실제로 남은 포지션이 어긋나기 쉬워요. 그래서 거래소 포지션을 읽어 코드의 현재 상태와 맞추고, 실행 전 상태와 실행 후 상태를 구분하도록 Python 프로토타입을 고쳤어요.",
      "포지션 종료는 보유량을 줄이는 방향으로만 주문이 나가게 하고, 수수료를 포함해 손익을 계산하도록 수정했어요. 위험이 큰 개인 실험이라 안전성과 수익성은 검증하지 않았고, 다른 사람의 투자를 돕거나 조언하는 제품도 아니에요. 실제 계좌와 자금, 거래 결과는 공개하지 않아요.",
    ],
    highlights: [],
    links: [],
    featured: false,
    collection: "personal",
    recordType: "experiment",
    resumeSelected: false,
    sections: [
      {
        id: "what",
        title: "거래소에 실제로 남은 포지션과 코드가 아는 상태를 맞추기",
        paragraphs: [
          "자동 거래 코드는 주문을 낸 뒤의 상태와 거래소에 실제로 남은 포지션이 어긋나기 쉬워요. 그래서 거래소 포지션을 읽어 코드의 현재 상태와 맞추고, 실행 전 상태와 실행 후 상태를 구분하도록 Python 프로토타입을 고쳤어요.",
        ],
      },
      {
        id: "contribution",
        title: "수익성도 안전성도 검증하지 않은 개인 실험이에요",
        paragraphs: [
          "포지션 종료는 보유량을 줄이는 방향으로만 주문이 나가게 하고, 수수료를 포함해 손익을 계산하도록 수정했어요. 위험이 큰 개인 실험이라 안전성과 수익성은 검증하지 않았고, 다른 사람의 투자를 돕거나 조언하는 제품도 아니에요. 실제 계좌와 자금, 거래 결과는 공개하지 않아요.",
        ],
      },
    ],
  },
  {
    slug: "f1-slack",
    name: "F1 Race Control Slack Bot",
    subtitle: "F1 레이스 컨트롤 메시지를 Slack으로 바로 받아 보는 알림 봇이에요.",
    summary:
      "F1 공식 라이브 타이밍 피드를 SignalR로 구독해 옐로 플래그, 세이프티카, 페널티 같은 레이스 컨트롤 메시지를 Slack 채널로 보내는 Python 봇이에요. 한 번 띄워 두면 다음 세션까지 알아서 이어 받아요.",
    period: "2026 기록",
    category: "개인 작업",
    role: "봇 개발 / 연결 안정성 개선",
    status: "개인 알림으로 써 봤고 코드는 공개돼 있어요",
    tags: ["Python", "SignalR", "WebSocket", "Slack", "Resilience", "CI"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "F1 세션 중 올라오는 레이스 컨트롤 메시지를 Slack에서 바로 보고 싶었어요. 그래서 공식 라이브 타이밍 SignalR 피드를 구독해 플래그와 카테고리에 맞게 정리한 뒤 Slack 채널로 보내는 봇을 Python으로 만들었어요. 타이밍과 피트 정보도 같이 읽어요.",
      "연결이 끊기면 횟수 제한 없이 백오프로 다시 붙고 구독을 다시 보내게 했고, 다음 세션이 올라오면 자동으로 감지해 넘어가도록 했어요. 구독 직후 통째로 내려오는 과거 메시지는 시각 기준으로 걸러요. 살아 있음을 알리는 상태 파일과 네트워크 없이 도는 테스트, CI도 붙였어요.",
      "개인 알림으로 써 봤지만 Slack 전송 제한에 걸리면 일부 알림이 빠지는 문제는 아직 남아 있어요.",
    ],
    highlights: [],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/jeamxn/slack-f1-race-control-message",
      },
    ],
    featured: false,
    collection: "personal",
    recordType: "product",
    resumeSelected: false,
    sections: [
      {
        id: "what",
        title: "세션 중 올라오는 레이스 컨트롤 메시지를 Slack에서 바로 보기",
        paragraphs: [
          "F1 세션 중 올라오는 레이스 컨트롤 메시지를 Slack에서 바로 보고 싶었어요. 그래서 공식 라이브 타이밍 SignalR 피드를 구독해 플래그와 카테고리에 맞게 정리한 뒤 Slack 채널로 보내는 봇을 Python으로 만들었어요. 타이밍과 피트 정보도 같이 읽어요.",
        ],
      },
      {
        id: "contribution",
        title: "재연결과 세션 전환은 풀었지만 Slack 전송 제한은 남아 있어요",
        paragraphs: [
          "연결이 끊기면 횟수 제한 없이 백오프로 다시 붙고 구독을 다시 보내게 했고, 다음 세션이 올라오면 자동으로 감지해 넘어가도록 했어요. 구독 직후 통째로 내려오는 과거 메시지는 시각 기준으로 걸러요. 살아 있음을 알리는 상태 파일과 네트워크 없이 도는 테스트, CI도 붙였어요.",
          "개인 알림으로 써 봤지만 Slack 전송 제한에 걸리면 일부 알림이 빠지는 문제는 아직 남아 있어요.",
        ],
      },
    ],
  },
  {
    slug: "srt-auto",
    name: "SRT 예약 워크플로 실험",
    subtitle: "원하는 SRT 열차를 대기열에 넣어 두면 자리가 날 때까지 대신 재시도하는 웹이에요.",
    summary:
      "열차를 검색해 대기열에 담고 정한 간격으로 예약을 재시도하는 도우미 프로토타입이에요. Django와 Celery, React Router 화면으로 구성했어요.",
    period: "2026 기록",
    category: "개인 작업",
    role: "풀스택 개발",
    status: "코드만 공개돼 있어요",
    tags: ["Django", "Celery", "React Router", "PostgreSQL"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "원하는 SRT 열차가 매진이면 자리가 날 때까지 직접 새로고침을 반복해야 해요. 그래서 열차를 검색해 대기열에 담아 두면 정한 간격(밀리초 · 초 · 분)으로 서버가 대신 재시도하고, 자리가 잡히면 상태가 예약됨으로 바뀌는 웹을 만들었어요. 결제는 SRT 앱이나 홈페이지에서 직접 해야 해요.",
      "Django와 DRF API, Celery와 Redis 작업, PostgreSQL, React Router 화면을 묶고 작업별로 시작 · 일시중지 · 중단을 할 수 있게 했어요. 코드는 AI 지원으로 작성했고 열차 조회는 외부 SRTrain 라이브러리에 기댔어요.",
      "공식 SRT 제품이 아니고 실제 발권이나 결제 성공은 검증하지 못했어요. 운송 약관과 본인 계정 범위를 지켜야 하는 개인 실험이라 인증 정보와 재시도 세부 흐름은 공개하지 않아요.",
    ],
    highlights: [],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/jeamxn/srt",
      },
    ],
    featured: false,
    collection: "personal",
    recordType: "experiment",
    resumeSelected: false,
    sections: [
      {
        id: "what",
        title: "매진된 열차를 새로고침하며 기다리는 대신 대기열에 넣어 두기",
        paragraphs: [
          "원하는 SRT 열차가 매진이면 자리가 날 때까지 직접 새로고침을 반복해야 해요. 그래서 열차를 검색해 대기열에 담아 두면 정한 간격(밀리초 · 초 · 분)으로 서버가 대신 재시도하고, 자리가 잡히면 상태가 예약됨으로 바뀌는 웹을 만들었어요. 결제는 SRT 앱이나 홈페이지에서 직접 해야 해요.",
        ],
      },
      {
        id: "contribution",
        title: "재시도는 Celery 작업으로, 현황은 React Router 화면으로",
        paragraphs: [
          "Django와 DRF API, Celery와 Redis 작업, PostgreSQL, React Router 화면을 묶고 작업별로 시작 · 일시중지 · 중단을 할 수 있게 했어요. 코드는 AI 지원으로 작성했고 열차 조회는 외부 SRTrain 라이브러리에 기댔어요.",
          "공식 SRT 제품이 아니고 실제 발권이나 결제 성공은 검증하지 못했어요. 운송 약관과 본인 계정 범위를 지켜야 하는 개인 실험이라 인증 정보와 재시도 세부 흐름은 공개하지 않아요.",
        ],
      },
    ],
  },
  {
    slug: "webtoon",
    name: "AI Webtoon",
    subtitle:
      "주제와 예시 이미지로 인터뷰를 거쳐 스토리보드와 컷 이미지까지 만드는 웹툰 제작 도구예요.",
    summary:
      "AI가 질문을 던져 이야기를 구체화하고 스토리보드, 화별 콘티, 컷 이미지를 차례로 생성하는 개인 프로토타입이에요. NestJS와 React Router, OpenAI 모델로 만들었어요.",
    period: "2026 기록",
    category: "개인 작업",
    role: "워크플로 설계 / 풀스택 개발",
    status: "프로토타입이고 코드는 공개돼 있어요",
    tags: ["NestJS", "React Router", "OpenAI", "Image generation", "Redis"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "이미지 한 장을 만드는 데서 끝나면 앞 컷의 맥락과 캐릭터가 다음 컷으로 이어지지 않아요. 그래서 주제와 화풍 예시 이미지를 올리면 AI가 질문 몇 개로 이야기를 구체화하고, 스토리보드와 화별 콘티, 컷 이미지 순서로 생성하는 워크플로를 만들었어요. 제가 직접 써 보며 다듬은 개인 프로젝트예요.",
      "NestJS API와 React Router 화면, 공유 타입 패키지를 모노레포로 묶고, LLM과 이미지 작업은 Redis 기반 백그라운드 잡으로 돌려 화면을 나가도 이어지게 했어요. 진행 상태와 스트리밍 텍스트는 SSE로 화면에 보내요.",
      "스토리보드가 나오면 캐릭터 시트를 먼저 만들고, 컷을 그릴 때 화풍 참조와 캐릭터 참조를 따로 넘겨 한 장면에 맞게 보정했어요. 코드는 AI 지원으로 작성했고 완성작 품질이나 운영은 검증하지 않았어요.",
    ],
    highlights: [],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/jeamxn/webtoon",
      },
    ],
    featured: false,
    collection: "personal",
    recordType: "experiment",
    resumeSelected: false,
    sections: [
      {
        id: "what",
        title: "그림 한 장 생성에서 끝내지 않고 이야기 단위로 이어 가기",
        paragraphs: [
          "이미지 한 장을 만드는 데서 끝나면 앞 컷의 맥락과 캐릭터가 다음 컷으로 이어지지 않아요. 그래서 주제와 화풍 예시 이미지를 올리면 AI가 질문 몇 개로 이야기를 구체화하고, 스토리보드와 화별 콘티, 컷 이미지 순서로 생성하는 워크플로를 만들었어요. 제가 직접 써 보며 다듬은 개인 프로젝트예요.",
        ],
      },
      {
        id: "contribution",
        title: "캐릭터 시트와 화풍 참조를 나눠 컷마다 맥락을 넘겼어요",
        paragraphs: [
          "NestJS API와 React Router 화면, 공유 타입 패키지를 모노레포로 묶고, LLM과 이미지 작업은 Redis 기반 백그라운드 잡으로 돌려 화면을 나가도 이어지게 했어요. 진행 상태와 스트리밍 텍스트는 SSE로 화면에 보내요.",
          "스토리보드가 나오면 캐릭터 시트를 먼저 만들고, 컷을 그릴 때 화풍 참조와 캐릭터 참조를 따로 넘겨 한 장면에 맞게 보정했어요. 코드는 AI 지원으로 작성했고 완성작 품질이나 운영은 검증하지 않았어요.",
        ],
      },
    ],
  },
  {
    slug: "local-phone",
    name: "Local Phone",
    subtitle: "통화 상대의 말을 내가 고른 언어로 실시간 번역해 들려주는 WebRTC 통화 앱이에요.",
    summary:
      "브라우저끼리 P2P로 음성 · 영상 통화와 화면 공유, 채팅을 하고, 상대 음성은 Gemini Live로 번역해 원본 · 번역 · 동시 듣기를 고를 수 있는 개인 프로토타입이에요.",
    period: "2026 기록",
    category: "개인 작업",
    role: "WebRTC 통화 / 번역 릴레이 서버 개발",
    status: "프로토타입이고 코드는 공개돼 있어요",
    tags: ["WebRTC", "Socket.IO", "NestJS", "Gemini Live"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "음성 · 영상 통화와 화면 공유, 채팅은 WebRTC로 브라우저끼리 직접 잇고, 상대 음성의 번역만 Gemini Live로 받아 들려주는 앱을 만들었어요. 원본만, 번역만, 둘 다 듣기 중에서 고를 수 있어요. 통화 화면 안에서 여러 언어의 대화를 어떻게 다룰 수 있을지 실험한 개인 프로젝트예요.",
      "NestJS와 Socket.IO로 시그널링과 채팅 릴레이를 만들고 React Router 화면에 통화 UI를 올렸어요. Vertex AI 서비스 계정 인증을 브라우저에 노출할 수 없어서, 마이크 PCM을 서버로 보내 듣는 사람의 언어로 번역 세션을 여는 구조로 했어요.",
      "코드는 AI 지원으로 작성했고 모델을 직접 만든 건 아니에요. 종단 지연 같은 성능은 재지 않았고, 실제 상대방 정보와 대화 원문은 공개하지 않아요.",
    ],
    highlights: [],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/jeamxn/local-phone",
      },
    ],
    featured: false,
    collection: "personal",
    recordType: "experiment",
    resumeSelected: false,
    sections: [
      {
        id: "what",
        title: "통화는 브라우저끼리 직접, 번역은 서버를 거쳐",
        paragraphs: [
          "음성 · 영상 통화와 화면 공유, 채팅은 WebRTC로 브라우저끼리 직접 잇고, 상대 음성의 번역만 Gemini Live로 받아 들려주는 앱을 만들었어요. 원본만, 번역만, 둘 다 듣기 중에서 고를 수 있어요. 통화 화면 안에서 여러 언어의 대화를 어떻게 다룰 수 있을지 실험한 개인 프로젝트예요.",
        ],
      },
      {
        id: "contribution",
        title: "서비스 계정 키를 브라우저에 두지 않으려고 번역을 서버 릴레이로 뺐어요",
        paragraphs: [
          "NestJS와 Socket.IO로 시그널링과 채팅 릴레이를 만들고 React Router 화면에 통화 UI를 올렸어요. Vertex AI 서비스 계정 인증을 브라우저에 노출할 수 없어서, 마이크 PCM을 서버로 보내 듣는 사람의 언어로 번역 세션을 여는 구조로 했어요.",
          "코드는 AI 지원으로 작성했고 모델을 직접 만든 건 아니에요. 종단 지연 같은 성능은 재지 않았고, 실제 상대방 정보와 대화 원문은 공개하지 않아요.",
        ],
      },
    ],
  },
  {
    slug: "bizmeka-mcp",
    name: "KT Bizmeka MCP",
    subtitle:
      "KT Bizmeka 포털의 메일 · 일정 · 회의실 기능을 AI가 쓸 수 있는 MCP 도구로 연결했어요.",
    summary:
      "메일 조회와 발송, 일정 조회와 등록, 예약할 시설 확인을 MCP 도구로 노출한 비공식 개인 구현이에요. Bun으로 빌드한 단일 실행 파일이라 따로 설치할 게 없어요.",
    period: "2026 기록",
    category: "개인 작업",
    role: "MCP 서버 개발 / 릴리스 자동화",
    status: "비공식 도구이고 공개 릴리스가 있어요",
    tags: ["MCP", "TypeScript", "Bun", "OAuth", "Browser automation", "CLI", "CI"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "업무 포털의 메일이나 일정은 AI에게 물어봐도 결국 사람이 들어가서 처리해야 했어요. 그래서 Bizmeka 포털에 로그인하고 메일 조회와 발송, 일정 조회 · 검색 · 등록 · 수정, 예약할 시설 목록 확인을 MCP 도구로 노출하는 서버를 TypeScript와 Bun으로 만들었어요. 사용자가 직접 인증한 자기 업무 공간 안에서만 동작해요.",
      "로그인은 RSA 암호화와 CSRF 토큰, SMS 2차 인증, SAML SSO를 차례로 거치는데 인증번호는 사람이 읽어야 해서 시작과 확인 두 단계의 도구로 나눴어요. 도구가 계속 늘어나서 작업 전에 사용법과 도구 목록을 먼저 돌려주는 안내 도구도 두었어요. main에 올릴 때마다 GitHub Actions가 날짜 태그로 macOS · Linux · Windows 실행 파일을 릴리스해요.",
      "코드는 AI 지원으로 작성했고 KT의 공식 제품이나 공식 API는 아니에요. 도구가 구현돼 있어도 실제 계정의 모든 업무를 검증한 것은 아니고, 인증 정보와 업무 데이터는 공개하지 않아요.",
    ],
    highlights: [],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/jeamxn/kt-bizmeka-mcp",
      },
    ],
    featured: false,
    collection: "personal",
    recordType: "product",
    resumeSelected: false,
    sections: [
      {
        id: "what",
        title: "답으로 설명하는 데서 끝내지 않고 포털 업무를 도구로 넘겨주기",
        paragraphs: [
          "업무 포털의 메일이나 일정은 AI에게 물어봐도 결국 사람이 들어가서 처리해야 했어요. 그래서 Bizmeka 포털에 로그인하고 메일 조회와 발송, 일정 조회 · 검색 · 등록 · 수정, 예약할 시설 목록 확인을 MCP 도구로 노출하는 서버를 TypeScript와 Bun으로 만들었어요. 사용자가 직접 인증한 자기 업무 공간 안에서만 동작해요.",
        ],
      },
      {
        id: "contribution",
        title: "SMS 2차 인증 때문에 로그인은 두 번의 도구 호출로 나눴어요",
        paragraphs: [
          "로그인은 RSA 암호화와 CSRF 토큰, SMS 2차 인증, SAML SSO를 차례로 거치는데 인증번호는 사람이 읽어야 해서 시작과 확인 두 단계의 도구로 나눴어요. 도구가 계속 늘어나서 작업 전에 사용법과 도구 목록을 먼저 돌려주는 안내 도구도 두었어요. main에 올릴 때마다 GitHub Actions가 날짜 태그로 macOS · Linux · Windows 실행 파일을 릴리스해요.",
          "코드는 AI 지원으로 작성했고 KT의 공식 제품이나 공식 API는 아니에요. 도구가 구현돼 있어도 실제 계정의 모든 업무를 검증한 것은 아니고, 인증 정보와 업무 데이터는 공개하지 않아요.",
        ],
      },
    ],
  },
  {
    slug: "unha",
    name: "인터랙티브 랜딩 실험",
    subtitle: "타이포와 클로버 모양, 글리치 모션으로 꾸민 한 화면짜리 랜딩이에요.",
    summary:
      "React Router로 만든 한 화면 랜딩 실험이에요. 글자와 클로버 컴포넌트에 글리치와 모션을 넣고 공유용 미리보기 메타데이터까지 설정했어요.",
    period: "2026 기록",
    category: "개인 작업",
    role: "프론트엔드 개발",
    status: "짧은 실험으로 끝났어요",
    tags: ["React Router", "Motion"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "React Router로 타이포와 클로버 모양, 글리치와 모션을 한 화면에 배치한 랜딩을 만들었어요. 컴포넌트로 화면을 나누고, 링크를 공유했을 때 보이는 미리보기 메타데이터도 설정했어요.",
      "클로버 컴포넌트와 타이포, 모션을 구성했어요. 특정 브랜드나 고객과 연결된 기록은 없어서 외주 사례가 아닌 개인 랜딩 실험으로 적어 두어요.",
    ],
    highlights: [],
    links: [],
    featured: false,
    collection: "personal",
    recordType: "experiment",
    resumeSelected: false,
    sections: [
      {
        id: "what",
        title: "한 화면에서 글자와 클로버가 움직이는 랜딩",
        paragraphs: [
          "React Router로 타이포와 클로버 모양, 글리치와 모션을 한 화면에 배치한 랜딩을 만들었어요. 컴포넌트로 화면을 나누고, 링크를 공유했을 때 보이는 미리보기 메타데이터도 설정했어요.",
        ],
      },
      {
        id: "contribution",
        title: "외주 사례가 아니라 랜딩 실험으로만 소개해요",
        paragraphs: [
          "클로버 컴포넌트와 타이포, 모션을 구성했어요. 특정 브랜드나 고객과 연결된 기록은 없어서 외주 사례가 아닌 개인 랜딩 실험으로 적어 두어요.",
        ],
      },
    ],
  },
  {
    slug: "cgv-cli",
    name: "CGV CLI",
    subtitle:
      "CGV 영화 · 극장 · 상영 시간과 잔여 좌석을 터미널에서 조회하는 비공식 클라이언트예요.",
    summary:
      "영화에서 극장, 날짜, 상영관별 잔여 좌석까지 이어지는 CGV 예매 흐름을 감싼 TypeScript 라이브러리이자 CLI예요. 런타임 의존성 없이 Node.js 내장 fetch만 써요.",
    period: "2026 기록",
    category: "개인 작업",
    role: "CLI / HTTP 클라이언트 개발",
    status: "코드만 공개돼 있고 릴리스는 없어요",
    tags: ["CLI", "TypeScript", "Node.js", "HTTP client", "API analysis"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "보고 싶은 영화의 극장별 잔여 좌석을 확인하려면 매번 예매 화면을 처음부터 눌러 들어가야 해요. 그래서 영화 목록, 상영 극장, 날짜, 상영관별 회차와 잔여 좌석을 명령 한 줄로 조회하는 클라이언트를 만들었어요. 영화와 극장은 ID 대신 이름으로 넣어도 찾아 주고 모든 명령에 JSON 출력이 있어요.",
      "쿠키 · 세션, 암호화, 전송, 오류 처리를 모듈로 나누고 좌석 배치도 조회, 좌석 선점과 해제, 결제 개시 명령까지 구현했어요. 결제의 최종 승인은 사용자가 결제 앱에서 직접 하는 단계라 CLI는 승인 URL 발급과 상태 확인까지만 해요.",
      "CGV의 공식 제품은 아니고 실제 결제 완료는 검증하지 못했어요. 계정과 세션, 결제 정보와 인증 세부는 공개하지 않아요.",
    ],
    highlights: [],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/jeamxn/cgv-cli",
      },
    ],
    featured: false,
    collection: "personal",
    recordType: "product",
    resumeSelected: false,
    sections: [
      {
        id: "what",
        title: "예매 화면을 처음부터 누르지 않고 잔여 좌석 확인하기",
        paragraphs: [
          "보고 싶은 영화의 극장별 잔여 좌석을 확인하려면 매번 예매 화면을 처음부터 눌러 들어가야 해요. 그래서 영화 목록, 상영 극장, 날짜, 상영관별 회차와 잔여 좌석을 명령 한 줄로 조회하는 클라이언트를 만들었어요. 영화와 극장은 ID 대신 이름으로 넣어도 찾아 주고 모든 명령에 JSON 출력이 있어요.",
        ],
      },
      {
        id: "contribution",
        title: "좌석 선점과 결제 개시까지만, 결제 완료는 검증하지 않았어요",
        paragraphs: [
          "쿠키 · 세션, 암호화, 전송, 오류 처리를 모듈로 나누고 좌석 배치도 조회, 좌석 선점과 해제, 결제 개시 명령까지 구현했어요. 결제의 최종 승인은 사용자가 결제 앱에서 직접 하는 단계라 CLI는 승인 URL 발급과 상태 확인까지만 해요.",
          "CGV의 공식 제품은 아니고 실제 결제 완료는 검증하지 못했어요. 계정과 세션, 결제 정보와 인증 세부는 공개하지 않아요.",
        ],
      },
    ],
  },
  {
    slug: "facefusion-setup",
    name: "FaceFusion macOS 래퍼",
    subtitle:
      "FaceFusion으로 바꾼 웹캠 얼굴을 OBS 가상 카메라로 내보내는 macOS 설치 · 실행 스크립트예요.",
    summary:
      "Apple Silicon Mac에서 FaceFusion 설치부터 OBS 가상 카메라 연결까지 한 번에 준비하는 셸 스크립트와 안내예요. 얼굴 처리 모델은 외부 FaceFusion을 그대로 쓰고 모든 처리는 로컬에서만 해요.",
    period: "2026 기록",
    category: "개인 작업",
    role: "설치 스크립트 / 실행 환경 구성",
    status: "스크립트가 공개돼 있어요",
    tags: ["macOS", "Shell", "OBS", "Third-party integration"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "FaceFusion을 macOS에서 돌려 화상회의에 쓰려면 Python 환경과 ffmpeg, OBS, 가상 카메라 승인까지 손으로 맞춰야 했어요. 그래서 setup.sh 한 번으로 의존성을 설치하고, run.sh로 FaceFusion을 띄워 UDP 스트림을 OBS 미디어 소스로 받는 흐름을 정리했어요. AI 모델을 개발한 게 아니라 기존 도구를 제 환경에서 쓰기 위한 통합 작업이에요.",
      "셸 스크립트와 실행 안내, 벤치마크 구성을 만들고 카메라 권한처럼 자주 막히는 지점을 FAQ로 적었어요. 얼굴 처리는 외부 FaceFusion 구현이라 OpenRAIL 라이선스와 당사자 동의가 필요하고, 안내에서도 AI 생성 가상 얼굴만 쓰고 상대에게 필터 사용을 밝히라고 적었어요. 사칭이나 기만을 위한 활용은 소개하지 않아요.",
    ],
    highlights: [],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/jeamxn/facefusion-swap",
      },
    ],
    featured: false,
    collection: "personal",
    recordType: "experiment",
    resumeSelected: false,
    sections: [
      {
        id: "what",
        title: "외부 도구를 화상회의까지 이어 주는 설치 한 번",
        paragraphs: [
          "FaceFusion을 macOS에서 돌려 화상회의에 쓰려면 Python 환경과 ffmpeg, OBS, 가상 카메라 승인까지 손으로 맞춰야 했어요. 그래서 setup.sh 한 번으로 의존성을 설치하고, run.sh로 FaceFusion을 띄워 UDP 스트림을 OBS 미디어 소스로 받는 흐름을 정리했어요. AI 모델을 개발한 게 아니라 기존 도구를 제 환경에서 쓰기 위한 통합 작업이에요.",
        ],
      },
      {
        id: "contribution",
        title: "동의와 라이선스를 먼저 읽게 했어요",
        paragraphs: [
          "셸 스크립트와 실행 안내, 벤치마크 구성을 만들고 카메라 권한처럼 자주 막히는 지점을 FAQ로 적었어요. 얼굴 처리는 외부 FaceFusion 구현이라 OpenRAIL 라이선스와 당사자 동의가 필요하고, 안내에서도 AI 생성 가상 얼굴만 쓰고 상대에게 필터 사용을 밝히라고 적었어요. 사칭이나 기만을 위한 활용은 소개하지 않아요.",
        ],
      },
    ],
  },
  {
    slug: "dbad-korean",
    name: "DBAD License 한국어 번역",
    subtitle: "DBAD 라이선스 문서의 한국어 번역을 PR로 제출했어요.",
    summary:
      "오픈소스 라이선스 DBAD의 한국어 번역 파일 하나를 작성해 원본 저장소에 pull request로 보낸 기록이에요.",
    period: "2024 기록",
    category: "오픈소스 기여",
    role: "번역 / PR 제출",
    status: "PR을 냈지만 병합되지 않았어요",
    tags: ["Documentation", "Translation"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "DBAD 라이선스 저장소에 한국어 번역 파일 하나를 작성해 pull request로 제안했어요. 2024년 7월에 제출한 짧은 문서 기여예요.",
      "PR #92는 리뷰 없이 닫혔고 병합되지 않았어요. 번역을 쓰고 제출한 단계까지가 제 기록이고, 채택된 기여로는 세지 않아요.",
    ],
    highlights: [],
    links: [
      {
        label: "제출한 PR #92",
        href: "https://github.com/philsturgeon/dbad/pull/92",
      },
    ],
    featured: false,
    collection: "opensource",
    recordType: "contribution",
    resumeSelected: false,
    sections: [
      {
        id: "what",
        title: "라이선스 문서를 한국어로 옮겨 원본 저장소에 제안",
        paragraphs: [
          "DBAD 라이선스 저장소에 한국어 번역 파일 하나를 작성해 pull request로 제안했어요. 2024년 7월에 제출한 짧은 문서 기여예요.",
        ],
      },
      {
        id: "contribution",
        title: "PR은 닫혔고 병합되지는 않았어요",
        paragraphs: [
          "PR #92는 리뷰 없이 닫혔고 병합되지 않았어요. 번역을 쓰고 제출한 단계까지가 제 기록이고, 채택된 기여로는 세지 않아요.",
        ],
      },
    ],
  },
  {
    slug: "slack-cli-send",
    name: "Slack CLI 메시지 전송 기여",
    subtitle: "읽기와 초안 중심이던 Slack CLI에 메시지를 바로 보내는 send 명령을 보탰어요.",
    summary:
      "다른 개발자가 만든 Slack CLI에 직접 전송과 초안 전송, AI가 쓸 MCP 도구 두 개를 추가해 pull request로 보낸 외부 기여예요.",
    period: "2026 기록",
    category: "오픈소스 기여",
    role: "기능 구현 / PR 제출",
    status: "PR을 냈지만 아직 병합되지 않았어요",
    tags: ["TypeScript", "Slack API", "MCP"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "제가 쓰던 외부 Slack CLI는 메시지를 읽고 초안을 만드는 데 맞춰져 있어서 명시적으로 보내는 명령이 없었어요. 그래서 바로 보내는 send와 초안을 보내는 draft send 명령, 같은 일을 AI가 할 수 있게 하는 MCP 도구 두 개를 추가했어요. 사용자와 채널 참조를 Slack 서식으로 바꿔 주는 변환도 넣었어요.",
      "6개 파일에 275줄을 더한 변경을 krisamin/slack-cli PR #1로 제출했고, 실제 호출로 동작을 확인한 내용을 커밋 본문에 남겼어요. 확인한 시점에 PR은 열려 있고 병합되지 않았어요. 그래서 원본 저장소를 그대로 설치하면 이 기능은 아직 없어요.",
    ],
    highlights: [],
    links: [
      {
        label: "제출한 PR #1",
        href: "https://github.com/krisamin/slack-cli/pull/1",
      },
    ],
    featured: false,
    collection: "opensource",
    recordType: "contribution",
    resumeSelected: false,
    sections: [
      {
        id: "what",
        title: "쓰던 도구에 빠져 있던 보내기를 채우기",
        paragraphs: [
          "제가 쓰던 외부 Slack CLI는 메시지를 읽고 초안을 만드는 데 맞춰져 있어서 명시적으로 보내는 명령이 없었어요. 그래서 바로 보내는 send와 초안을 보내는 draft send 명령, 같은 일을 AI가 할 수 있게 하는 MCP 도구 두 개를 추가했어요. 사용자와 채널 참조를 Slack 서식으로 바꿔 주는 변환도 넣었어요.",
        ],
      },
      {
        id: "contribution",
        title: "PR은 열려 있고 기본 설치본에는 아직 안 들어갔어요",
        paragraphs: [
          "6개 파일에 275줄을 더한 변경을 krisamin/slack-cli PR #1로 제출했고, 실제 호출로 동작을 확인한 내용을 커밋 본문에 남겼어요. 확인한 시점에 PR은 열려 있고 병합되지 않았어요. 그래서 원본 저장소를 그대로 설치하면 이 기능은 아직 없어요.",
        ],
      },
    ],
  },
  {
    slug: "side-gig-prep",
    name: "AI 디자인 가상 샘플",
    subtitle: "IR 발표자료와 상세페이지, 벡터 로고를 가상의 브랜드로 만들어 본 샘플이에요.",
    summary:
      "외주 서비스를 소개할 예시로 가상 브랜드의 발표자료, 상세페이지, 벡터 로고를 AI 지원으로 만든 준비 단계 기록이에요. 실제 의뢰나 납품은 없어요.",
    period: "2026 기록",
    category: "개인 작업",
    role: "샘플 기획 / 제작",
    status: "가상 샘플이고 판매 실적은 없어요",
    tags: ["Design automation", "Canvas", "PPT", "SVG", "Business planning"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "디자인 작업을 외주로 받으려면 먼저 보여 줄 예시가 필요했어요. 그래서 가상의 브랜드와 발표 상황을 정해 IR 발표자료와 상품 상세페이지, 벡터 로고를 만들고 등록용 소개 원고까지 써 봤어요. 도화지와 SVG 같은 도구로 결과물을 만들었고 제작에는 AI 지원을 받았어요.",
      "실주문이나 납품, 매출이 발생한 외주 작업은 아니에요. 부모님 사이트 제작과 사업자 등록도 유상 외주 실적에 넣지 않았어요.",
    ],
    highlights: [],
    links: [],
    featured: false,
    collection: "personal",
    recordType: "experiment",
    resumeSelected: false,
    sections: [
      {
        id: "what",
        title: "실제 의뢰 전에 어떤 결과물을 낼 수 있는지 먼저 만들어 보기",
        paragraphs: [
          "디자인 작업을 외주로 받으려면 먼저 보여 줄 예시가 필요했어요. 그래서 가상의 브랜드와 발표 상황을 정해 IR 발표자료와 상품 상세페이지, 벡터 로고를 만들고 등록용 소개 원고까지 써 봤어요. 도화지와 SVG 같은 도구로 결과물을 만들었고 제작에는 AI 지원을 받았어요.",
        ],
      },
      {
        id: "contribution",
        title: "가상 샘플이라 매출도 납품도 없어요",
        paragraphs: [
          "실주문이나 납품, 매출이 발생한 외주 작업은 아니에요. 부모님 사이트 제작과 사업자 등록도 유상 외주 실적에 넣지 않았어요.",
        ],
      },
    ],
  },
  {
    slug: "apk-static-research",
    name: "APK 정적 구조 분석",
    subtitle:
      "앱을 실행하지 않고 APK 안의 타입 선언과 통신 인터페이스를 읽어 구조를 정리한 연구예요.",
    summary:
      "JADX로 디컴파일한 APK에서 직렬화 선언과 통신 인터페이스를 정적으로 추출해 데이터 흐름을 정리한 개인 학습 기록이에요.",
    period: "2026 기록",
    category: "개인 작업",
    role: "정적 분석 학습",
    status: "분석 문서로만 남아 있어요",
    tags: ["Infosec", "Static analysis", "API analysis"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "기존 앱이 서버와 무엇을 주고받는지 알고 싶을 때 실행해서 트래픽을 잡는 대신 코드 구조부터 읽어 보기로 했어요. JADX로 디컴파일한 결과에서 타입 선언과 직렬화 구조, 통신 인터페이스를 읽어 앱 내부의 데이터 흐름을 정리했어요. 앱을 개발한 경력과는 별개로 남이 만든 프로그램의 구조를 읽는 방법을 익힌 작업이에요.",
      "정적 분석 문서는 남아 있지만 파서와 전체 추출 수치는 이번 정리에서 다시 검증하지 않아서 성과로 세지 않아요. 실제 트래픽이나 주문 · 결제 전반을 확인한 작업도, 대상 회사의 제품 개발에 참여한 이력도 아니에요. 원본 APK와 주소, 인증 흐름과 계정 자료는 공개하지 않아요.",
    ],
    highlights: [],
    links: [],
    featured: false,
    collection: "personal",
    recordType: "learning",
    resumeSelected: false,
    sections: [
      {
        id: "what",
        title: "실행해서 트래픽을 잡기 전에 구조부터 읽기",
        paragraphs: [
          "기존 앱이 서버와 무엇을 주고받는지 알고 싶을 때 실행해서 트래픽을 잡는 대신 코드 구조부터 읽어 보기로 했어요. JADX로 디컴파일한 결과에서 타입 선언과 직렬화 구조, 통신 인터페이스를 읽어 앱 내부의 데이터 흐름을 정리했어요. 앱을 개발한 경력과는 별개로 남이 만든 프로그램의 구조를 읽는 방법을 익힌 작업이에요.",
        ],
      },
      {
        id: "contribution",
        title: "문서는 남아 있지만 추출 수치는 다시 검증하지 않았어요",
        paragraphs: [
          "정적 분석 문서는 남아 있지만 파서와 전체 추출 수치는 이번 정리에서 다시 검증하지 않아서 성과로 세지 않아요. 실제 트래픽이나 주문 · 결제 전반을 확인한 작업도, 대상 회사의 제품 개발에 참여한 이력도 아니에요. 원본 APK와 주소, 인증 흐름과 계정 자료는 공개하지 않아요.",
        ],
      },
    ],
  },
  {
    slug: "browser-avatar-rig",
    name: "브라우저 아바타 리깅 실험",
    subtitle: "AI로 그린 캐릭터를 파츠로 나눠 마이크에 맞춰 입을 움직이는 브라우저 아바타예요.",
    summary:
      "캐릭터 그림을 눈 · 입 파츠로 나누고 마이크 립싱크, 자동 깜빡임, 호흡, 키보드 표정 전환을 HTML 한 장에 붙인 개인 시안이에요.",
    period: "2026 기록",
    category: "개인 작업",
    role: "시안 기획",
    status: "시안 단계에서 멈췄어요",
    tags: ["HTML", "Web Audio", "Image generation", "Avatar"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "AI로 만든 캐릭터 그림을 눈과 입 같은 파츠로 나눠 브라우저에서 움직이는 아바타로 연결했어요. 마이크 입력에 따라 입 모양이 바뀌고, 자동으로 눈을 깜빡이고 숨 쉬듯 움직이며, 키보드로 표정을 바꾸는 HTML 시안이에요.",
      "제가 시안을 요청하고 이미지와 HTML은 AI 지원으로 구성했어요. 첫 HTML에는 마이크 입력과 표정 · 입 모양 전환까지 넣었고, 이후 파츠를 더 잘게 나누는 리깅을 실험했지만 표정 재구성과 측면 키폼 작업은 남아 있어요. 완성된 Live2D 모델이나 판매 · 납품 결과는 아니에요.",
    ],
    highlights: [],
    links: [],
    featured: false,
    collection: "personal",
    recordType: "experiment",
    resumeSelected: false,
    sections: [
      {
        id: "what",
        title: "그림 한 장에 목소리와 숨을 붙이기",
        paragraphs: [
          "AI로 만든 캐릭터 그림을 눈과 입 같은 파츠로 나눠 브라우저에서 움직이는 아바타로 연결했어요. 마이크 입력에 따라 입 모양이 바뀌고, 자동으로 눈을 깜빡이고 숨 쉬듯 움직이며, 키보드로 표정을 바꾸는 HTML 시안이에요.",
        ],
      },
      {
        id: "contribution",
        title: "파츠를 더 잘게 나누는 리깅은 남겨 두었어요",
        paragraphs: [
          "제가 시안을 요청하고 이미지와 HTML은 AI 지원으로 구성했어요. 첫 HTML에는 마이크 입력과 표정 · 입 모양 전환까지 넣었고, 이후 파츠를 더 잘게 나누는 리깅을 실험했지만 표정 재구성과 측면 키폼 작업은 남아 있어요. 완성된 Live2D 모델이나 판매 · 납품 결과는 아니에요.",
        ],
      },
    ],
  },
];
