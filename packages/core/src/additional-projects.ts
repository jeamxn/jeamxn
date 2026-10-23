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
        label: "지금 사이트 코드",
        href: "https://github.com/jeamxn/jeamxn",
      },
      {
        label: "이전 포트폴리오 코드",
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
        label: "소개 사이트 코드",
        href: "https://github.com/zero-young-com/zero-front-v2",
      },
      {
        label: "환경영향 테스트 코드",
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
        label: "동아리 사이트 코드",
        href: "https://github.com/JUSTARTUP/just-main-v2",
      },
      {
        label: "React 후속판 코드",
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
    subtitle: "학교 계정과 생활 기능을 묶어 보는 초기 협업을 했어요.",
    summary: "학교 계정 / 커뮤니티 / 시간표를 다루는 React 화면과 서버 개발에 참여했어요.",
    period: "2022 — 2023 기록",
    category: "함께 만든 것",
    role: "프론트엔드 / 백엔드 공동 개발",
    status: "과거 협업 초기판 / 보관된 기록",
    tags: ["React", "Express", "MongoDB", "JWT"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "학교 계정과 커뮤니티, 시간표 기능을 한 서비스 안에서 다루려던 초기 협업이에요. React 화면과 Express 서버를 만들고 MongoDB로 데이터를 연결했어요. 학교 생활의 기능마다 흩어져 있던 화면과 계정을 함께 다뤄 보던 시기의 프로젝트예요.",
      "React 화면과 Express 서버에서 계정 / 권한 / 메일 기능을 함께 개발하고 MongoDB를 연결했어요. 동료와 함께 화면과 서버를 구성한 초기 협업이며, 코드에도 각자 구현한 부분이 함께 남아 있어요.",
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
        title: "무엇을 만들었나요",
        paragraphs: [
          "학교 계정과 커뮤니티, 시간표 기능을 한 서비스 안에서 다루려던 초기 협업이에요. React 화면과 Express 서버를 만들고 MongoDB로 데이터를 연결했어요. 학교 생활의 기능마다 흩어져 있던 화면과 계정을 함께 다뤄 보던 시기의 프로젝트예요.",
        ],
      },
      {
        id: "contribution",
        title: "제가 맡은 부분과 남은 기록",
        paragraphs: [
          "React 화면과 Express 서버에서 계정 / 권한 / 메일 기능을 함께 개발하고 MongoDB를 연결했어요. 동료와 함께 화면과 서버를 구성한 초기 협업이며, 코드에도 각자 구현한 부분이 함께 남아 있어요.",
        ],
      },
    ],
  },
  {
    slug: "gpt-fashion",
    name: "GPT-3 패션 추천 실험",
    subtitle: "날씨와 패션 맥락을 AI 요청에 담아 봤어요.",
    summary: "Express 서버에서 날씨 / 패션 맥락을 OpenAI API에 연결한 초기 실험이에요.",
    period: "2023 기록",
    category: "개인 작업",
    role: "API 통합 / 서버 개발",
    status: "2023년 LLM 프로토타입 / 보관된 기록",
    tags: ["AI", "Express", "OpenAI API"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "날씨와 패션 맥락을 요청에 담아 AI가 추천을 반환하도록 실험했어요. Express 서버에 OpenAI API를 연결하고 요청과 응답을 다뤘어요. 자체 모델을 학습하는 대신, 제공되는 AI API를 작은 서비스 기능으로 활용해 봤어요.",
      "Express 서버에서 OpenAI 요청을 보내고 응답을 받는 코드를 작성했어요. 유사한 소스가 담긴 두 저장소는 별개의 제품이 아니라, 같은 실험과 그 연습 버전으로 모았어요.",
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
        title: "무엇을 만들었나요",
        paragraphs: [
          "날씨와 패션 맥락을 요청에 담아 AI가 추천을 반환하도록 실험했어요. Express 서버에 OpenAI API를 연결하고 요청과 응답을 다뤘어요. 자체 모델을 학습하는 대신, 제공되는 AI API를 작은 서비스 기능으로 활용해 봤어요.",
        ],
      },
      {
        id: "contribution",
        title: "제가 맡은 부분과 남은 기록",
        paragraphs: [
          "Express 서버에서 OpenAI 요청을 보내고 응답을 받는 코드를 작성했어요. 유사한 소스가 담긴 두 저장소는 별개의 제품이 아니라, 같은 실험과 그 연습 버전으로 모았어요.",
        ],
      },
    ],
  },
  {
    slug: "auto-realfabric",
    name: "AI 패턴 이미지 실험",
    subtitle: "이미지를 만들고 편집한 뒤 활용하는 흐름을 연결했어요.",
    summary: "AI 이미지 생성과 패턴 편집을 연결해 본 개인 워크플로 실험이에요.",
    period: "2023 기록",
    category: "개인 작업",
    role: "이미지 API 통합 / 처리 코드 개발",
    status: "과거 이미지 워크플로 프로토타입",
    tags: ["AI", "JavaScript", "OpenAI API", "Sharp", "Canvas"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "AI로 패턴 이미지를 생성한 뒤 편집하고 활용하는 흐름을 실험했어요. 이미지 생성 API와 Sharp / Canvas를 연결해서 생성물의 후처리를 다뤘어요. 결과 이미지 하나를 만드는 데서 그치지 않고, 다음 단계에 사용할 형태로 바꾸는 코드를 구성했어요.",
      "이미지 생성과 편집, 다운로드를 이어 주는 코드를 개발하고 상품 업로드도 시도했어요. 실제 판매 여부는 확인하지 못했어요. 이 페이지에는 이미지 처리 기능만 소개하고, 계정과 플랫폼 인증 정보는 공개하지 않아요.",
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
        title: "무엇을 만들었나요",
        paragraphs: [
          "AI로 패턴 이미지를 생성한 뒤 편집하고 활용하는 흐름을 실험했어요. 이미지 생성 API와 Sharp / Canvas를 연결해서 생성물의 후처리를 다뤘어요. 결과 이미지 하나를 만드는 데서 그치지 않고, 다음 단계에 사용할 형태로 바꾸는 코드를 구성했어요.",
        ],
      },
      {
        id: "contribution",
        title: "제가 맡은 부분과 남은 기록",
        paragraphs: [
          "이미지 생성과 편집, 다운로드를 이어 주는 코드를 개발하고 상품 업로드도 시도했어요. 실제 판매 여부는 확인하지 못했어요. 이 페이지에는 이미지 처리 기능만 소개하고, 계정과 플랫폼 인증 정보는 공개하지 않아요.",
        ],
      },
    ],
  },
  {
    slug: "roadcap",
    name: "RoadCap",
    subtitle: "로드뷰를 보고 지도에서 위치를 맞히는 게임을 만들었어요.",
    summary: "로드뷰 / 지도 / 타이머 / 점수를 연결한 위치 맞히기 게임 프로토타입이에요.",
    period: "2023 기록",
    category: "개인 작업",
    role: "프론트엔드 / 서버 개발",
    status: "과거 개인 게임 프로토타입",
    tags: ["React", "Geolocation", "Express"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "로드뷰를 살펴보고 지도에서 위치를 맞히는 게임을 만들었어요. 지도와 거리의 풍경, 제한 시간과 점수를 한 플레이 흐름으로 구성했어요. React와 지도 도구를 함께 다루면서 사용자의 선택이 게임 결과로 이어지는 경험을 구현했어요.",
      "React / Recoil로 게임 화면을 만들고 Kakao Maps / Leaflet과 Express 구조를 구성했어요. 지도에서 위치를 선택하면 타이머와 점수로 이어지는 시제품이며, 당시 코드와 수정 기록을 보관하고 있어요.",
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
        title: "무엇을 만들었나요",
        paragraphs: [
          "로드뷰를 살펴보고 지도에서 위치를 맞히는 게임을 만들었어요. 지도와 거리의 풍경, 제한 시간과 점수를 한 플레이 흐름으로 구성했어요. React와 지도 도구를 함께 다루면서 사용자의 선택이 게임 결과로 이어지는 경험을 구현했어요.",
        ],
      },
      {
        id: "contribution",
        title: "제가 맡은 부분과 남은 기록",
        paragraphs: [
          "React / Recoil로 게임 화면을 만들고 Kakao Maps / Leaflet과 Express 구조를 구성했어요. 지도에서 위치를 선택하면 타이머와 점수로 이어지는 시제품이며, 당시 코드와 수정 기록을 보관하고 있어요.",
        ],
      },
    ],
  },
  {
    slug: "youtube-karaoke",
    name: "YouTube Karaoke",
    subtitle: "노래를 찾고 따라 부를 때 쓸 작은 보조 도구를 만들었어요.",
    summary: "노래 검색 / 인기곡 조회와 YouTube 화면을 연결한 개인 프로토타입이에요.",
    period: "2023 기록",
    category: "개인 작업",
    role: "웹 / 브라우저 확장 개발",
    status: "과거 개인 도구 / 보관된 기록",
    tags: ["Next.js", "Browser extension", "API"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "노래를 검색하고 인기곡을 살펴본 뒤 YouTube 화면에서 활용할 수 있는 보조 도구를 만들었어요. Next.js API와 브라우저 확장 코드를 함께 구성해, 기존 YouTube 플레이어에서 콘텐츠를 찾고 이용하는 흐름을 연결했어요.",
      "검색과 인기곡 조회 API, 영상 페이지를 보조하는 코드를 만들었어요. 속도 문제와 스크롤 동작을 수정하면서 화면의 사용 흐름도 손봤어요. 음악과 영상은 외부 콘텐츠라서 이 페이지에 원본을 재배포하지 않아요.",
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
        title: "무엇을 만들었나요",
        paragraphs: [
          "노래를 검색하고 인기곡을 살펴본 뒤 YouTube 화면에서 활용할 수 있는 보조 도구를 만들었어요. Next.js API와 브라우저 확장 코드를 함께 구성해, 기존 YouTube 플레이어에서 콘텐츠를 찾고 이용하는 흐름을 연결했어요.",
        ],
      },
      {
        id: "contribution",
        title: "제가 맡은 부분과 남은 기록",
        paragraphs: [
          "검색과 인기곡 조회 API, 영상 페이지를 보조하는 코드를 만들었어요. 속도 문제와 스크롤 동작을 수정하면서 화면의 사용 흐름도 손봤어요. 음악과 영상은 외부 콘텐츠라서 이 페이지에 원본을 재배포하지 않아요.",
        ],
      },
    ],
  },
  {
    slug: "dimigogo",
    name: "Dimigogo",
    subtitle: "학교에서 이동할 때 필요한 정보를 앱으로 모았어요.",
    summary:
      "지도 / 목적지 / 날짜 / 예약 화면을 React Native 앱과 서버로 연결한 학교 팀 프로젝트예요.",
    period: "2023 기록",
    category: "함께 만든 것",
    role: "모바일 / 백엔드 공동 개발",
    status: "과거 학교 앱 프로토타입",
    tags: ["React Native", "Fastify", "MongoDB", "Maps"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "학교에서 이동과 교통에 필요한 정보를 모으고 목적지와 날짜를 선택하는 앱을 만들었어요. 지도와 위치, 차량 정보, 예약 화면을 모바일 흐름으로 구성했어요. React Native 클라이언트와 Fastify 서버를 함께 연결한 학교 팀 프로젝트예요.",
      "React Native 화면과 Fastify / MongoDB 서버를 함께 개발했어요. 팀에서 지도와 위치, 차량 정보를 모바일 화면에 연결하는 부분에 참여했어요.",
    ],
    highlights: [],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/sso-school/dimigogo-front-v1",
      },
      {
        label: "관련 저장소",
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
        title: "무엇을 만들었나요",
        paragraphs: [
          "학교에서 이동과 교통에 필요한 정보를 모으고 목적지와 날짜를 선택하는 앱을 만들었어요. 지도와 위치, 차량 정보, 예약 화면을 모바일 흐름으로 구성했어요. React Native 클라이언트와 Fastify 서버를 함께 연결한 학교 팀 프로젝트예요.",
        ],
      },
      {
        id: "contribution",
        title: "제가 맡은 부분과 남은 기록",
        paragraphs: [
          "React Native 화면과 Fastify / MongoDB 서버를 함께 개발했어요. 팀에서 지도와 위치, 차량 정보를 모바일 화면에 연결하는 부분에 참여했어요.",
        ],
      },
    ],
  },
  {
    slug: "xiaoxingyun",
    name: "小幸運 연습 웹",
    subtitle: "중국어 수행평가를 준비하면서 연습 화면을 만들었어요.",
    summary: "노래 가사와 한자를 연습하려고 만든 React 학습 웹이에요.",
    period: "2023 기록",
    category: "학교에서 만든 것",
    role: "프론트엔드 개발",
    status: "과거 학교 학습 도구",
    tags: ["React", "Education"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "중국어 수행평가를 준비하면서 노래 가사와 한자를 연습하는 웹을 만들었어요. React 화면에서 내용을 선택하고 가사의 한자 표기를 다루는 기능을 구성했어요. 수업에서 필요한 연습을 저에게 맞는 작은 도구로 옮겨 봤어요.",
      "React로 내용을 선택하는 화면과 가사의 한자 표기를 바꾸는 기능을 구현했어요. 수업 준비용 학습 도구로 만든 화면을 소개하고, 외부 가사 원문은 재배포하지 않아요.",
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
        title: "무엇을 만들었나요",
        paragraphs: [
          "중국어 수행평가를 준비하면서 노래 가사와 한자를 연습하는 웹을 만들었어요. React 화면에서 내용을 선택하고 가사의 한자 표기를 다루는 기능을 구성했어요. 수업에서 필요한 연습을 저에게 맞는 작은 도구로 옮겨 봤어요.",
        ],
      },
      {
        id: "contribution",
        title: "제가 맡은 부분과 남은 기록",
        paragraphs: [
          "React로 내용을 선택하는 화면과 가사의 한자 표기를 바꾸는 기능을 구현했어요. 수업 준비용 학습 도구로 만든 화면을 소개하고, 외부 가사 원문은 재배포하지 않아요.",
        ],
      },
    ],
  },
  {
    slug: "teacher-day",
    name: "스승의 날 메시지 웹",
    subtitle: "스승의 날 메시지를 웹으로 모았어요.",
    summary: "교사와 역할에 따라 메시지를 제출하고 확인하는 학교 행사 프로젝트예요.",
    period: "2023 기록",
    category: "학교에서 만든 것",
    role: "풀스택 개발",
    status: "과거 학교 행사 웹 / 보관된 기록",
    tags: ["Next.js", "MongoDB", "Auth"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "스승의 날 행사에서 메시지를 제출하고 확인할 수 있는 웹을 만들었어요. 교사와 역할에 따라 화면과 메시지 흐름을 구성하고 Next.js와 MongoDB로 연결했어요. 특정 행사에 필요한 제출과 조회 기능을 짧은 기간 안에 구현한 학교 작업이에요.",
      "메시지 제출 / 조회와 로그인 기능을 개발했어요. Enter 입력으로 메시지가 전송되는 문제와 특수문자 처리 버그도 고쳤어요. 학생과 교사의 실제 메시지나 개인정보는 싣지 않고, 행사 웹에서 만든 기능만 소개해요.",
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
        title: "무엇을 만들었나요",
        paragraphs: [
          "스승의 날 행사에서 메시지를 제출하고 확인할 수 있는 웹을 만들었어요. 교사와 역할에 따라 화면과 메시지 흐름을 구성하고 Next.js와 MongoDB로 연결했어요. 특정 행사에 필요한 제출과 조회 기능을 짧은 기간 안에 구현한 학교 작업이에요.",
        ],
      },
      {
        id: "contribution",
        title: "제가 맡은 부분과 남은 기록",
        paragraphs: [
          "메시지 제출 / 조회와 로그인 기능을 개발했어요. Enter 입력으로 메시지가 전송되는 문제와 특수문자 처리 버그도 고쳤어요. 학생과 교사의 실제 메시지나 개인정보는 싣지 않고, 행사 웹에서 만든 기능만 소개해요.",
        ],
      },
    ],
  },
  {
    slug: "dimigo-election",
    name: "디미고 선거 웹",
    subtitle: "처음으로 친구와 개발과 운영을 나눠 맡았어요.",
    summary: "후보 선택과 선거 현황 화면을 구성한 학교 선거 프로젝트예요.",
    period: "2023 기록",
    category: "학교에서 만든 것",
    role: "웹 개발 / 동료와 운영 협업",
    status: "과거 학교 선거 웹",
    tags: ["Next.js", "MongoDB"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "학교 선거를 위한 후보 선택과 현황 화면을 만들었어요. 박성민과 처음 함께한 작업으로, 저는 코드를 작성하고 성민은 운영 설정을 맡아 웹을 사용할 수 있는 형태로 연결했어요.",
      "Next.js와 MongoDB로 화면과 데이터 처리를 개발했어요. 환경설정을 제거해 공개한 저장소는 같은 프로젝트의 코드 사본이에요. 학교 선거를 위해 만든 웹이며, 법적 완결성이나 보안 인증을 갖춘 투표 시스템으로 검증한 것은 아니에요.",
    ],
    highlights: [],
    links: [
      {
        label: "GitHub",
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
        title: "무엇을 만들었나요",
        paragraphs: [
          "학교 선거를 위한 후보 선택과 현황 화면을 만들었어요. 박성민과 처음 함께한 작업으로, 저는 코드를 작성하고 성민은 운영 설정을 맡아 웹을 사용할 수 있는 형태로 연결했어요.",
        ],
      },
      {
        id: "contribution",
        title: "제가 맡은 부분과 남은 기록",
        paragraphs: [
          "Next.js와 MongoDB로 화면과 데이터 처리를 개발했어요. 환경설정을 제거해 공개한 저장소는 같은 프로젝트의 코드 사본이에요. 학교 선거를 위해 만든 웹이며, 법적 완결성이나 보안 인증을 갖춘 투표 시스템으로 검증한 것은 아니에요.",
        ],
      },
    ],
  },
  {
    slug: "assertive-school-main",
    name: "학교 / 팀 메인 사이트 초안",
    subtitle: "작은 레이아웃부터 사이트를 구성했어요.",
    summary: "헤더 / 푸터 / 경로를 구성한 Next.js 초기 화면 작업이에요.",
    period: "2023 기록",
    category: "학교에서 만든 것",
    role: "프론트엔드 개발",
    status: "과거 사이트 초안",
    tags: ["Next.js"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "학교와 팀을 소개하는 메인 사이트의 초안을 만들었어요. Next.js로 헤더와 푸터를 구성하고 페이지 사이의 이동을 연결했어요. 전체 사이트를 완성하기 전, 공통 레이아웃과 화면 구조를 잡은 단계예요.",
      "공통 헤더와 푸터, 페이지 라우팅을 구성했어요. 연관된 두 초기 저장소에 남은 작업은 같은 레이아웃을 만든 과정으로 모았어요.",
    ],
    highlights: [],
    links: [
      {
        label: "GitHub",
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
        title: "무엇을 만들었나요",
        paragraphs: [
          "학교와 팀을 소개하는 메인 사이트의 초안을 만들었어요. Next.js로 헤더와 푸터를 구성하고 페이지 사이의 이동을 연결했어요. 전체 사이트를 완성하기 전, 공통 레이아웃과 화면 구조를 잡은 단계예요.",
        ],
      },
      {
        id: "contribution",
        title: "제가 맡은 부분과 남은 기록",
        paragraphs: [
          "공통 헤더와 푸터, 페이지 라우팅을 구성했어요. 연관된 두 초기 저장소에 남은 작업은 같은 레이아웃을 만든 과정으로 모았어요.",
        ],
      },
    ],
  },
  {
    slug: "php-assessment",
    name: "PHP / DB 수행평가",
    subtitle: "수업에서 화면 뒤의 데이터를 다뤄 봤어요.",
    summary: "PHP와 MySQL로 회원 / 테이블 생성 / CRUD를 실습한 학교 과제예요.",
    period: "2023 기록",
    category: "학교에서 만든 것",
    role: "PHP / DB 실습",
    status: "과거 학교 수업 과제",
    tags: ["PHP", "MySQL"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "PHP에서 MySQL에 연결하고 테이블을 만들거나 데이터를 추가하는 과정을 실습했어요. 회원 기능과 테이블 CRUD를 여러 파일로 나누어 다룬 학교 수행평가예요. 수업 예제와 과제를 풀면서 웹의 데이터를 저장하고 바꾸는 기본 흐름을 익혔어요.",
      "PHP와 mysqli로 테이블 생성 / 삽입 / 삭제, 회원 기능을 실습했어요. 수업 예제와 과제 풀이를 함께 저장한 학습 자료예요. 화면에서 들어온 데이터를 서버와 데이터베이스로 처리하는 기본 흐름을 익혔어요.",
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
        title: "무엇을 만들었나요",
        paragraphs: [
          "PHP에서 MySQL에 연결하고 테이블을 만들거나 데이터를 추가하는 과정을 실습했어요. 회원 기능과 테이블 CRUD를 여러 파일로 나누어 다룬 학교 수행평가예요. 수업 예제와 과제를 풀면서 웹의 데이터를 저장하고 바꾸는 기본 흐름을 익혔어요.",
        ],
      },
      {
        id: "contribution",
        title: "제가 맡은 부분과 남은 기록",
        paragraphs: [
          "PHP와 mysqli로 테이블 생성 / 삽입 / 삭제, 회원 기능을 실습했어요. 수업 예제와 과제 풀이를 함께 저장한 학습 자료예요. 화면에서 들어온 데이터를 서버와 데이터베이스로 처리하는 기본 흐름을 익혔어요.",
        ],
      },
    ],
  },
  {
    slug: "luna-literacy",
    name: "루나 문해력 퀴즈",
    subtitle: "문제를 풀고 결과를 함께 확인하는 흐름을 만들었어요.",
    summary: "퀴즈 / 결과 / 참여 현황을 연결한 교육 행사 웹이에요.",
    period: "2023 기록",
    category: "학교에서 만든 것",
    role: "풀스택 개발",
    status: "과거 교육 / 행사 웹",
    tags: ["Next.js", "Socket.IO", "MongoDB"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "문해력 퀴즈를 풀고 결과와 참여 현황을 확인할 수 있는 웹을 만들었어요. 문제 화면과 결과 화면, 학교별 데이터와 현황 기능을 Next.js와 MongoDB로 구성했어요. 한 사람이 퀴즈를 푸는 데서 끝나지 않고, 참여 흐름까지 연결해 본 작업이에요.",
      "퀴즈 UI와 API, Socket.IO로 참여 현황을 연결하는 개발에 참여했어요. Next.js와 MongoDB로 문제를 푼 뒤 결과와 현황을 확인하는 화면을 구성했어요.",
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
        title: "무엇을 만들었나요",
        paragraphs: [
          "문해력 퀴즈를 풀고 결과와 참여 현황을 확인할 수 있는 웹을 만들었어요. 문제 화면과 결과 화면, 학교별 데이터와 현황 기능을 Next.js와 MongoDB로 구성했어요. 한 사람이 퀴즈를 푸는 데서 끝나지 않고, 참여 흐름까지 연결해 본 작업이에요.",
        ],
      },
      {
        id: "contribution",
        title: "제가 맡은 부분과 남은 기록",
        paragraphs: [
          "퀴즈 UI와 API, Socket.IO로 참여 현황을 연결하는 개발에 참여했어요. Next.js와 MongoDB로 문제를 푼 뒤 결과와 현황을 확인하는 화면을 구성했어요.",
        ],
      },
    ],
  },
  {
    slug: "anony",
    name: "Anony",
    subtitle: "질문과 답변을 익명 피드로 연결했어요.",
    summary: "익명 질문 / 답변 / 피드 / 숨김 기능을 구성한 웹 프로토타입이에요.",
    period: "2023 기록",
    category: "개인 작업",
    role: "풀스택 개발",
    status: "과거 익명 질문 프로토타입",
    tags: ["Next.js", "MongoDB"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "질문을 남기고 답변과 피드를 확인할 수 있는 익명 질문 웹을 만들었어요. Next.js와 MongoDB로 화면과 API를 연결하고 질문에 답변하거나 숨기는 기능을 구성했어요. 사용자 입력을 모아서 다시 보여 주는 작은 커뮤니티 구조를 구현한 작업이에요.",
      "답변 / 피드 / 숨김 API와 쿠키를 사용하는 기능에 참여했어요. 다른 협업 이력과 함께 저장소로 옮겨진 부분이 있어, 여기서는 제 변경이 남은 구현을 소개해요. 실제 질문과 이용자 정보는 공개하지 않아요.",
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
        title: "무엇을 만들었나요",
        paragraphs: [
          "질문을 남기고 답변과 피드를 확인할 수 있는 익명 질문 웹을 만들었어요. Next.js와 MongoDB로 화면과 API를 연결하고 질문에 답변하거나 숨기는 기능을 구성했어요. 사용자 입력을 모아서 다시 보여 주는 작은 커뮤니티 구조를 구현한 작업이에요.",
        ],
      },
      {
        id: "contribution",
        title: "제가 맡은 부분과 남은 기록",
        paragraphs: [
          "답변 / 피드 / 숨김 API와 쿠키를 사용하는 기능에 참여했어요. 다른 협업 이력과 함께 저장소로 옮겨진 부분이 있어, 여기서는 제 변경이 남은 구현을 소개해요. 실제 질문과 이용자 정보는 공개하지 않아요.",
        ],
      },
    ],
  },
  {
    slug: "bfoption",
    name: "투자 / 지갑 UI 프로토타입",
    subtitle: "복잡한 정보를 여러 화면으로 나눠 봤어요.",
    summary: "투자 / 주문 / 지갑 / 문의 화면을 구성한 과거 UI 중심 프로토타입이에요.",
    period: "2023 기록",
    category: "함께 만든 것",
    role: "웹 개발 참여",
    status: "과거 금융 화면 프로토타입 / 실제 거래 미확인",
    tags: ["Next.js", "MUI", "Visx", "MongoDB"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "투자와 주문, 거래와 지갑 정보를 여러 화면으로 나누어 보여 주는 프로토타입에 참여했어요. Next.js와 MUI, Visx로 복잡한 상태와 데이터를 표시하는 화면을 구성했어요. 실제 금융 상품을 운영한 서비스가 아니라 UI 중심의 시제품이에요.",
      "웹 화면과 MongoDB 연동 구조를 수정했어요. 실거래와 사업 승인, 금융 계산의 정확성까지 확인한 서비스는 아니에요. 이 페이지에는 화면 개발 내용만 소개하고, 고객과 계좌 정보, 거래 수치와 내부 주소는 공개하지 않아요.",
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
        title: "무엇을 만들었나요",
        paragraphs: [
          "투자와 주문, 거래와 지갑 정보를 여러 화면으로 나누어 보여 주는 프로토타입에 참여했어요. Next.js와 MUI, Visx로 복잡한 상태와 데이터를 표시하는 화면을 구성했어요. 실제 금융 상품을 운영한 서비스가 아니라 UI 중심의 시제품이에요.",
        ],
      },
      {
        id: "contribution",
        title: "제가 맡은 부분과 남은 기록",
        paragraphs: [
          "웹 화면과 MongoDB 연동 구조를 수정했어요. 실거래와 사업 승인, 금융 계산의 정확성까지 확인한 서비스는 아니에요. 이 페이지에는 화면 개발 내용만 소개하고, 고객과 계좌 정보, 거래 수치와 내부 주소는 공개하지 않아요.",
        ],
      },
    ],
  },
  {
    slug: "sso-native-v2",
    name: "SSO School 모바일 UI",
    subtitle: "학교 서비스의 흐름을 모바일로 옮겨 봤어요.",
    summary: "내비게이션 / 모달 / 화면 전환을 다룬 React Native 후속 실험이에요.",
    period: "2023 기록",
    category: "개인 작업",
    role: "모바일 화면 개발",
    status: "과거 모바일 UI 실험 / 보관된 기록",
    tags: ["React Native"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "학교 서비스의 화면을 React Native로 구성해 본 모바일 후속판이에요. 알림과 확인 창을 이동 흐름으로 바꾸고 모달과 화면을 손봤어요. 웹에서 익숙했던 인터랙션을 모바일 내비게이션에 맞게 다뤄 본 짧은 개발 기록이에요.",
      "React Native 화면과 내비게이션, 모달을 수정했어요. 모바일에서 알림과 화면 전환을 구성한 UI 실험이에요. 이름이 같은 다른 학교 웹과의 관계는 확인하지 못해, 이 저장소에서 작업한 화면만 따로 소개해요.",
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
        title: "무엇을 만들었나요",
        paragraphs: [
          "학교 서비스의 화면을 React Native로 구성해 본 모바일 후속판이에요. 알림과 확인 창을 이동 흐름으로 바꾸고 모달과 화면을 손봤어요. 웹에서 익숙했던 인터랙션을 모바일 내비게이션에 맞게 다뤄 본 짧은 개발 기록이에요.",
        ],
      },
      {
        id: "contribution",
        title: "제가 맡은 부분과 남은 기록",
        paragraphs: [
          "React Native 화면과 내비게이션, 모달을 수정했어요. 모바일에서 알림과 화면 전환을 구성한 UI 실험이에요. 이름이 같은 다른 학교 웹과의 관계는 확인하지 못해, 이 저장소에서 작업한 화면만 따로 소개해요.",
        ],
      },
    ],
  },
  {
    slug: "pdf-share",
    name: "PDF Share",
    subtitle: "파일을 올리고 찾은 뒤 다시 열어보는 흐름을 만들었어요.",
    summary: "PDF 업로드 / 검색 / 보기 API를 연결한 웹 프로토타입이에요.",
    period: "2023 기록",
    category: "개인 작업",
    role: "풀스택 개발",
    status: "과거 파일 공유 프로토타입",
    tags: ["Next.js", "MongoDB", "File upload"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "PDF를 올리고 검색한 뒤 다시 열어볼 수 있는 작은 웹을 만들었어요. 파일 업로드와 검색, 보기 기능을 Next.js와 MongoDB로 연결했어요. 문서 파일을 단순히 저장하는 것뿐 아니라 사용자 화면에서 다시 찾아 사용하는 흐름까지 구성했어요.",
      "업로드 / 검색 / PDF 조회 API와 웹 화면을 개발했어요. Next.js와 MongoDB로 파일을 저장하고 다시 찾아 여는 기능을 연결했어요. 업로드된 문서 원문과 이용자 자료는 공개하지 않아요.",
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
        title: "무엇을 만들었나요",
        paragraphs: [
          "PDF를 올리고 검색한 뒤 다시 열어볼 수 있는 작은 웹을 만들었어요. 파일 업로드와 검색, 보기 기능을 Next.js와 MongoDB로 연결했어요. 문서 파일을 단순히 저장하는 것뿐 아니라 사용자 화면에서 다시 찾아 사용하는 흐름까지 구성했어요.",
        ],
      },
      {
        id: "contribution",
        title: "제가 맡은 부분과 남은 기록",
        paragraphs: [
          "업로드 / 검색 / PDF 조회 API와 웹 화면을 개발했어요. Next.js와 MongoDB로 파일을 저장하고 다시 찾아 여는 기능을 연결했어요. 업로드된 문서 원문과 이용자 자료는 공개하지 않아요.",
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
        label: "GitHub",
        href: "https://github.com/jeamxn/khu-meal",
      },
      {
        label: "서버 저장소",
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
    subtitle: "반복해서 보는 영상의 재생 속도를 기억하게 했어요.",
    summary: "영상 배속을 바꾸고 선택한 속도를 저장하는 개인 브라우저 확장이에요.",
    period: "2025 기록",
    category: "개인 작업",
    role: "브라우저 확장 개발",
    status: "과거 개인 보조 도구",
    tags: ["Browser extension", "JavaScript"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "배속 옵션이 없는 학습 영상 페이지를 보조하는 브라우저 확장을 만들었어요. 영상 재생 속도를 바꾸고 선택한 값을 저장하며, 페이지에서 영상 요소가 바뀌는 경우도 감지하도록 구성했어요. 제가 영상을 보는 흐름에 필요한 작은 기능을 덧붙인 작업이에요.",
      "Chrome 확장 설정과 JavaScript 재생 속도 처리, MutationObserver 코드를 구성했어요. 새 영상 요소가 생기면 저장한 속도를 다시 적용하는 작은 보조 기능이에요. 학습 페이지를 사용하는 경험을 보완한 개인 도구예요.",
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
        title: "무엇을 만들었나요",
        paragraphs: [
          "배속 옵션이 없는 학습 영상 페이지를 보조하는 브라우저 확장을 만들었어요. 영상 재생 속도를 바꾸고 선택한 값을 저장하며, 페이지에서 영상 요소가 바뀌는 경우도 감지하도록 구성했어요. 제가 영상을 보는 흐름에 필요한 작은 기능을 덧붙인 작업이에요.",
        ],
      },
      {
        id: "contribution",
        title: "제가 맡은 부분과 남은 기록",
        paragraphs: [
          "Chrome 확장 설정과 JavaScript 재생 속도 처리, MutationObserver 코드를 구성했어요. 새 영상 요소가 생기면 저장한 속도를 다시 적용하는 작은 보조 기능이에요. 학습 페이지를 사용하는 경험을 보완한 개인 도구예요.",
        ],
      },
    ],
  },
  {
    slug: "openai-watermark",
    name: "텍스트 공백 정리 실험",
    subtitle: "공백과 줄바꿈이 어디서 달라지는지 확인해 봤어요.",
    summary: "텍스트 공백 / 개행 정규화와 차이 표시를 구성한 Next.js 실험이에요.",
    period: "2025 기록",
    category: "개인 작업",
    role: "프론트엔드 개발",
    status: "과거 텍스트 처리 실험",
    tags: ["Next.js", "Text processing"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "텍스트의 공백과 줄바꿈을 정리하고 차이를 화면에서 확인하는 웹을 만들었어요. Next.js 페이지에 공백 정규화와 개행 / 띄어쓰기 검사, 스크롤 UI를 구성했어요. 텍스트를 눈으로 볼 때 놓치기 쉬운 차이를 드러내는 작은 처리 실험이에요.",
      "공백과 개행을 검사하고 정규화하는 코드를 작성했어요. 저장소 이름에는 워터마크가 들어가지만, 실제로 구현하고 살펴본 기능은 입력 텍스트를 정리하고 차이를 보여주는 것이에요. AI 워터마크 제거 효과까지 입증한 도구는 아니에요.",
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
        title: "무엇을 만들었나요",
        paragraphs: [
          "텍스트의 공백과 줄바꿈을 정리하고 차이를 화면에서 확인하는 웹을 만들었어요. Next.js 페이지에 공백 정규화와 개행 / 띄어쓰기 검사, 스크롤 UI를 구성했어요. 텍스트를 눈으로 볼 때 놓치기 쉬운 차이를 드러내는 작은 처리 실험이에요.",
        ],
      },
      {
        id: "contribution",
        title: "제가 맡은 부분과 남은 기록",
        paragraphs: [
          "공백과 개행을 검사하고 정규화하는 코드를 작성했어요. 저장소 이름에는 워터마크가 들어가지만, 실제로 구현하고 살펴본 기능은 입력 텍스트를 정리하고 차이를 보여주는 것이에요. AI 워터마크 제거 효과까지 입증한 도구는 아니에요.",
        ],
      },
    ],
  },
  {
    slug: "univ-festa",
    name: "대학축제 일정 웹",
    subtitle: "대학별 축제 날짜와 출연진을 모아 봤어요.",
    summary: "대학 축제의 날짜 / 요일 / 게스트 목록을 보여 주는 웹과 Notion 연동 서버예요.",
    period: "2025 기록",
    category: "개인 작업",
    role: "웹 / 서버 개발",
    status: "과거 2025 행사 웹",
    tags: ["Next.js", "Elysia", "Notion API"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "대학 축제의 날짜와 요일, 출연진 정보를 대학별로 모아 보는 웹을 만들었어요. 화면에 필요한 목록을 보여 주고 Notion 기반 데이터와 서버를 연결했어요. 시기가 정해진 행사 정보를 읽기 쉬운 형태로 정리한 개인 프로젝트예요.",
      "Next.js와 React Query 화면, Bun / Elysia 서버와 Notion 연동을 개발했어요. 요일과 기준 날짜, 게스트 표시도 수정했어요. 행사 데이터를 화면에서 읽을 수 있도록 구성한 개인 웹의 개발 기록이에요.",
    ],
    highlights: [],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/jeamxn/univ-festa",
      },
      {
        label: "관련 저장소",
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
        title: "무엇을 만들었나요",
        paragraphs: [
          "대학 축제의 날짜와 요일, 출연진 정보를 대학별로 모아 보는 웹을 만들었어요. 화면에 필요한 목록을 보여 주고 Notion 기반 데이터와 서버를 연결했어요. 시기가 정해진 행사 정보를 읽기 쉬운 형태로 정리한 개인 프로젝트예요.",
        ],
      },
      {
        id: "contribution",
        title: "제가 맡은 부분과 남은 기록",
        paragraphs: [
          "Next.js와 React Query 화면, Bun / Elysia 서버와 Notion 연동을 개발했어요. 요일과 기준 날짜, 게스트 표시도 수정했어요. 행사 데이터를 화면에서 읽을 수 있도록 구성한 개인 웹의 개발 기록이에요.",
        ],
      },
    ],
  },
  {
    slug: "data-course",
    name: "영화 리뷰 수집 과제",
    subtitle: "분석에 앞서 데이터를 모으는 단계부터 해 봤어요.",
    summary: "영화 코드와 리뷰 점수 / 글 / 날짜를 수집한 대학 데이터분석 과제 기록이에요.",
    period: "2025 기록",
    category: "학교에서 만든 것",
    role: "데이터 수집 코드 개발",
    status: "과거 대학 과제 / 수집 단계",
    tags: ["TypeScript", "Data collection", "Education"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "데이터분석 과제를 준비하면서 영화와 리뷰 정보를 수집하는 코드를 만들었어요. 영화 코드를 찾고 리뷰 점수와 글, 날짜를 추출하는 과정을 TypeScript로 구성했어요. 최종 분석이 아닌, 필요한 데이터를 모으는 단계까지 진행한 과제예요.",
      "Bun과 axios / cheerio로 영화 코드와 리뷰 정보를 수집했어요. 최종 분석 이전의 수집 코드가 남아 있어요. 원본 리뷰와 작성자 정보는 공개하지 않아요.",
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
        title: "무엇을 만들었나요",
        paragraphs: [
          "데이터분석 과제를 준비하면서 영화와 리뷰 정보를 수집하는 코드를 만들었어요. 영화 코드를 찾고 리뷰 점수와 글, 날짜를 추출하는 과정을 TypeScript로 구성했어요. 최종 분석이 아닌, 필요한 데이터를 모으는 단계까지 진행한 과제예요.",
        ],
      },
      {
        id: "contribution",
        title: "제가 맡은 부분과 남은 기록",
        paragraphs: [
          "Bun과 axios / cheerio로 영화 코드와 리뷰 정보를 수집했어요. 최종 분석 이전의 수집 코드가 남아 있어요. 원본 리뷰와 작성자 정보는 공개하지 않아요.",
        ],
      },
    ],
  },
  {
    slug: "election-live",
    name: "2025 개표 현황 웹",
    subtitle: "공개 개표 수치를 카드와 그래프로 보여 줬어요.",
    summary: "개표율과 후보별 투표 수를 시각화한 일회성 대시보드예요.",
    period: "2025 기록",
    category: "개인 작업",
    role: "프론트엔드 / API 개발",
    status: "과거 일회성 공개 데이터 대시보드",
    tags: ["Next.js", "Data visualization"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "2025년 선거의 공개 개표율과 후보별 투표 수를 보여 주는 대시보드를 만들었어요. API와 후보 카드, 색상 표시를 구성해 계속 바뀌는 수치를 읽을 수 있도록 했어요. 특정 행사를 위해 짧게 진행한 공개 데이터 시각화 작업이에요.",
      "Next.js API와 개표 화면을 개발하고 후보 카드와 색상 표시를 손봤어요. 공개 수치를 보여 주기 위해 만든 개인 대시보드이며, 공식 선거 시스템 개발이나 특정 정치적 입장을 나타내는 작업과는 구분해요.",
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
        title: "무엇을 만들었나요",
        paragraphs: [
          "2025년 선거의 공개 개표율과 후보별 투표 수를 보여 주는 대시보드를 만들었어요. API와 후보 카드, 색상 표시를 구성해 계속 바뀌는 수치를 읽을 수 있도록 했어요. 특정 행사를 위해 짧게 진행한 공개 데이터 시각화 작업이에요.",
        ],
      },
      {
        id: "contribution",
        title: "제가 맡은 부분과 남은 기록",
        paragraphs: [
          "Next.js API와 개표 화면을 개발하고 후보 카드와 색상 표시를 손봤어요. 공개 수치를 보여 주기 위해 만든 개인 대시보드이며, 공식 선거 시스템 개발이나 특정 정치적 입장을 나타내는 작업과는 구분해요.",
        ],
      },
    ],
  },
  {
    slug: "halsam",
    name: "Halsam",
    subtitle: "디지털 서비스 사용법을 한 단계씩 따라가게 했어요.",
    summary: "음성과 이미지로 GPT / 모바일뱅킹 / 온라인쇼핑 사용법을 안내하는 UI 프로토타입이에요.",
    period: "2025 기록",
    category: "개인 작업",
    role: "프론트엔드 개발",
    status: "과거 학습 UI 프로토타입",
    tags: ["Next.js", "Audio UI", "Education"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "디지털 서비스의 사용법을 주제별로 고르고 단계마다 음성과 이미지를 확인하는 화면을 만들었어요. GPT와 모바일뱅킹, 온라인쇼핑 같은 서로 다른 주제를 챕터와 설명으로 나눴어요. 긴 글 하나를 읽는 대신 화면을 따라가며 사용법을 볼 수 있도록 구성해 봤어요.",
      "Next.js로 주제 선택과 설명 화면을 만들고 HTMLAudioElement로 음성을 재생하도록 연결했어요. 안내 UI를 만든 단계로, 실제 AI 챗봇 기능이나 접근성 효과까지 검증하지는 못했어요. 개인정보와 금융 계정 자료는 예시에 싣지 않았어요.",
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
        title: "무엇을 만들었나요",
        paragraphs: [
          "디지털 서비스의 사용법을 주제별로 고르고 단계마다 음성과 이미지를 확인하는 화면을 만들었어요. GPT와 모바일뱅킹, 온라인쇼핑 같은 서로 다른 주제를 챕터와 설명으로 나눴어요. 긴 글 하나를 읽는 대신 화면을 따라가며 사용법을 볼 수 있도록 구성해 봤어요.",
        ],
      },
      {
        id: "contribution",
        title: "제가 맡은 부분과 남은 기록",
        paragraphs: [
          "Next.js로 주제 선택과 설명 화면을 만들고 HTMLAudioElement로 음성을 재생하도록 연결했어요. 안내 UI를 만든 단계로, 실제 AI 챗봇 기능이나 접근성 효과까지 검증하지는 못했어요. 개인정보와 금융 계정 자료는 예시에 싣지 않았어요.",
        ],
      },
    ],
  },
  {
    slug: "schedule-checker",
    name: "Schedule Checker",
    subtitle: "함께 가능한 시간을 한 방에 모으려고 했어요.",
    summary: "방을 만들고 사람별 가능한 시간을 등록하는 일정 조율 웹이에요.",
    period: "2025 기록",
    category: "개인 작업",
    role: "풀스택 개발",
    status: "공개 프로토타입 / 운영 미확인",
    tags: ["Next.js", "Elysia", "MongoDB"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "일정을 조율할 때 각자 가능한 시간을 같은 공간에 모으는 웹을 만들었어요. 방을 만들고 방 코드로 들어가 시작과 종료 시간을 등록하는 흐름이에요. 메신저에 흩어진 시간 정보를 별도의 화면에서 다뤄 보려고 만든 개인 프로토타입이에요.",
      "Next.js 프론트엔드와 Elysia / MongoDB 서버를 구성했어요. 방 생성과 코드 진입, 시작 / 종료 시간 등록을 화면과 데이터로 연결했어요. 가능한 시간을 모으는 기본 흐름까지 구현한 공개 프로토타입이에요.",
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
        title: "무엇을 만들었나요",
        paragraphs: [
          "일정을 조율할 때 각자 가능한 시간을 같은 공간에 모으는 웹을 만들었어요. 방을 만들고 방 코드로 들어가 시작과 종료 시간을 등록하는 흐름이에요. 메신저에 흩어진 시간 정보를 별도의 화면에서 다뤄 보려고 만든 개인 프로토타입이에요.",
        ],
      },
      {
        id: "contribution",
        title: "제가 맡은 부분과 남은 기록",
        paragraphs: [
          "Next.js 프론트엔드와 Elysia / MongoDB 서버를 구성했어요. 방 생성과 코드 진입, 시작 / 종료 시간 등록을 화면과 데이터로 연결했어요. 가능한 시간을 모으는 기본 흐름까지 구현한 공개 프로토타입이에요.",
        ],
      },
    ],
  },
  {
    slug: "future-calc",
    name: "선물 수익 / 청산 계산기",
    subtitle: "값을 바꾸면서 계산 결과를 확인하는 화면을 만들었어요.",
    summary: "진입가 / 레버리지 / 수량 / 현재가를 입력하는 개인 계산 UI예요.",
    period: "2025 기록",
    category: "개인 작업",
    role: "프론트엔드 개발",
    status: "공개 계산 도구 / 금융 정확성 미검증",
    tags: ["Next.js", "Calculators"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "진입가와 레버리지, 수량이나 총액, 현재가를 입력하면 수익과 청산 관련 계산을 보여주는 화면을 만들었어요. Next.js로 값이 바뀔 때 결과를 함께 확인하는 계산 UI를 실험했어요. 금융 모델의 정확성까지 검증한 도구는 아니에요.",
      "입력값과 결과 표시, 수익률과 청산가 관련 UI를 개발했어요. 실제 거래소의 모든 조건과 수수료를 검증하지는 못해, 투자 조언이나 수익 보장에 쓰는 도구로 제공하지 않아요. 계좌와 실제 거래 기록도 공개하지 않아요.",
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
        title: "무엇을 만들었나요",
        paragraphs: [
          "진입가와 레버리지, 수량이나 총액, 현재가를 입력하면 수익과 청산 관련 계산을 보여주는 화면을 만들었어요. Next.js로 값이 바뀔 때 결과를 함께 확인하는 계산 UI를 실험했어요. 금융 모델의 정확성까지 검증한 도구는 아니에요.",
        ],
      },
      {
        id: "contribution",
        title: "제가 맡은 부분과 남은 기록",
        paragraphs: [
          "입력값과 결과 표시, 수익률과 청산가 관련 UI를 개발했어요. 실제 거래소의 모든 조건과 수수료를 검증하지는 못해, 투자 조언이나 수익 보장에 쓰는 도구로 제공하지 않아요. 계좌와 실제 거래 기록도 공개하지 않아요.",
        ],
      },
    ],
  },
  {
    slug: "movie-checker",
    name: "영화 상영 모니터링",
    subtitle: "여러 극장의 상영 정보를 주기적으로 모았어요.",
    summary: "CGV / 롯데시네마 / 메가박스의 상영 정보를 수집하는 개인 서버 도구예요.",
    period: "2025 기록",
    category: "개인 작업",
    role: "서버 / 정기 수집 개발",
    status: "과거 개인 수집 도구",
    tags: ["Bun", "Elysia", "Cron"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "여러 영화관의 상영 정보를 주기적으로 확인하는 서버 도구를 만들었어요. CGV와 롯데시네마, 메가박스의 수집 작업을 cron으로 구성하고 오류 처리를 개선했어요. 원하는 정보를 여러 곳에서 수동으로 확인하는 대신 정기 작업으로 모아 보도록 만든 개인 프로젝트예요.",
      "Bun과 Elysia로 서버와 영화관별 수집 작업을 구성했어요. cron 실행과 오류 처리를 손보며 여러 출처의 정보를 주기적으로 가져오도록 만들었어요. 계정과 예매 정보는 공개하지 않고, 상영 정보를 수집하는 구현을 남겨요.",
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
        title: "무엇을 만들었나요",
        paragraphs: [
          "여러 영화관의 상영 정보를 주기적으로 확인하는 서버 도구를 만들었어요. CGV와 롯데시네마, 메가박스의 수집 작업을 cron으로 구성하고 오류 처리를 개선했어요. 원하는 정보를 여러 곳에서 수동으로 확인하는 대신 정기 작업으로 모아 보도록 만든 개인 프로젝트예요.",
        ],
      },
      {
        id: "contribution",
        title: "제가 맡은 부분과 남은 기록",
        paragraphs: [
          "Bun과 Elysia로 서버와 영화관별 수집 작업을 구성했어요. cron 실행과 오류 처리를 손보며 여러 출처의 정보를 주기적으로 가져오도록 만들었어요. 계정과 예매 정보는 공개하지 않고, 상영 정보를 수집하는 구현을 남겨요.",
        ],
      },
    ],
  },
  {
    slug: "iframe-maker",
    name: "iframe Maker",
    subtitle: "주소를 받아 작은 임베드 화면으로 보여 줬어요.",
    summary: "URL을 전달받아 iframe으로 보여 주는 Bun 기반 소형 도구예요.",
    period: "2025 기록",
    category: "개인 작업",
    role: "서버 / HTML 개발",
    status: "공개 소형 도구",
    tags: ["Bun", "HTML"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "주소를 전달하면 iframe 안에서 페이지를 보여 주는 작은 래퍼를 만들었어요. Bun 서버와 HTML로 임베드 화면을 반환하는 단순한 구조예요. 웹페이지를 다른 화면에 끼워 넣으려는 작은 필요를 짧은 도구로 해결해 봤어요.",
      "Bun.serve로 주소를 받아 HTML 임베드 페이지를 반환하도록 만들었어요. 별도 브라우저 엔진이 아니라 기존 웹을 감싸는 래퍼여서, 외부 페이지가 iframe 임베드를 허용해야 표시할 수 있어요.",
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
        title: "무엇을 만들었나요",
        paragraphs: [
          "주소를 전달하면 iframe 안에서 페이지를 보여 주는 작은 래퍼를 만들었어요. Bun 서버와 HTML로 임베드 화면을 반환하는 단순한 구조예요. 웹페이지를 다른 화면에 끼워 넣으려는 작은 필요를 짧은 도구로 해결해 봤어요.",
        ],
      },
      {
        id: "contribution",
        title: "제가 맡은 부분과 남은 기록",
        paragraphs: [
          "Bun.serve로 주소를 받아 HTML 임베드 페이지를 반환하도록 만들었어요. 별도 브라우저 엔진이 아니라 기존 웹을 감싸는 래퍼여서, 외부 페이지가 iframe 임베드를 허용해야 표시할 수 있어요.",
        ],
      },
    ],
  },
  {
    slug: "fearless-banpick",
    name: "Fearless Banpick",
    subtitle: "호스트의 챔피언 선택을 다른 화면에서도 함께 보도록 했어요.",
    summary: "LoL 피어리스 밴픽 상태를 P2P로 공유하는 AI 지원 프로젝트예요.",
    period: "2025 기록",
    category: "개인 작업",
    role: "개인 프로젝트 / AI 지원 구현",
    status: "공개 AI 지원 프로토타입",
    tags: ["React", "PeerJS", "WebSocket"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "호스트 화면에서 선택한 챔피언 상태를 게스트와 공유하는 밴픽 도구예요. React와 PeerJS, WebSocket을 사용한 P2P 공유 구조를 다뤘어요. 여러 화면에서 게임의 선택 상태를 함께 보는 흐름을 AI 지원으로 구성한 개인 프로젝트예요.",
      "코드 / 디자인 / 아키텍처는 Claude Sonnet 4.5로 생성했다고 저장소에 명시했어요. 직접 작성한 코드가 아니라, AI 지원으로 React와 PeerJS의 밴픽 공유 기능을 구성한 프로젝트예요.",
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
        title: "무엇을 만들었나요",
        paragraphs: [
          "호스트 화면에서 선택한 챔피언 상태를 게스트와 공유하는 밴픽 도구예요. React와 PeerJS, WebSocket을 사용한 P2P 공유 구조를 다뤘어요. 여러 화면에서 게임의 선택 상태를 함께 보는 흐름을 AI 지원으로 구성한 개인 프로젝트예요.",
        ],
      },
      {
        id: "contribution",
        title: "제가 맡은 부분과 남은 기록",
        paragraphs: [
          "코드 / 디자인 / 아키텍처는 Claude Sonnet 4.5로 생성했다고 저장소에 명시했어요. 직접 작성한 코드가 아니라, AI 지원으로 React와 PeerJS의 밴픽 공유 기능을 구성한 프로젝트예요.",
        ],
      },
    ],
  },
  {
    slug: "sentry-bugbot",
    name: "Sentry Bugbot",
    subtitle: "오류를 읽는 AI가 도구로 작업까지 이어 가면 어떨까 했어요.",
    summary: "Sentry 오류와 GitHub / Docker 도구를 AI 에이전트에 연결한 초기 PoC예요.",
    period: "2025 — 2026 기록",
    category: "개인 작업",
    role: "아이디어 / 에이전트 도구 통합",
    status: "공개 PoC / 정확도와 운영 채택률 미검증",
    tags: ["AI", "Agent tooling", "LangChain", "Docker", "GitHub API", "Sentry"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "오류를 읽은 AI가 도구를 사용해 수정 작업까지 이어 갈 수 있는지 실험했어요. Sentry 오류와 GitHub 저장소, Docker 실행 환경을 에이전트 도구로 연결한 초기 PoC예요.",
      "Bun / Elysia 서버에 LangChain 에이전트와 Docker 도구를 연결하고 오류 처리를 구성했어요. 실제 수정 PR의 정확도와 운영 채택률까지 검증한 제품은 아니에요. 오류 원문과 비밀 키는 공개하지 않아요.",
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
        title: "무엇을 만들었나요",
        paragraphs: [
          "오류를 읽은 AI가 도구를 사용해 수정 작업까지 이어 갈 수 있는지 실험했어요. Sentry 오류와 GitHub 저장소, Docker 실행 환경을 에이전트 도구로 연결한 초기 PoC예요.",
        ],
      },
      {
        id: "contribution",
        title: "제가 맡은 부분과 남은 기록",
        paragraphs: [
          "Bun / Elysia 서버에 LangChain 에이전트와 Docker 도구를 연결하고 오류 처리를 구성했어요. 실제 수정 PR의 정확도와 운영 채택률까지 검증한 제품은 아니에요. 오류 원문과 비밀 키는 공개하지 않아요.",
        ],
      },
    ],
  },
  {
    slug: "chagok",
    name: "Chagok 라우팅 실험",
    subtitle: "여러 플랫폼에서 함께 쓸 화면 이동 구조를 실험했어요.",
    summary: "React Native / 웹에 함께 쓰는 타입 기반 화면 라우팅 프로토타입이에요.",
    period: "2025 기록",
    category: "개인 작업",
    role: "프론트엔드 기반 코드 개발",
    status: "공개 개발 기반 실험",
    tags: ["React Native", "React Native Web", "TypeScript", "Navigation"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "iOS와 Android, 웹에서 함께 쓸 화면 라우팅 구조를 실험했어요. React Native와 React Native Web, Vite를 연결하고 화면 스택과 링크, 타입 기반 선언을 구성했어요. 생활 앱 전체가 아니라, 여러 플랫폼의 화면 이동을 만드는 기반까지 구현했어요.",
      "스택 정의와 타입 처리, 링크와 훅 코드를 구성했어요. Reanimated와 웹 환경을 함께 다루고, 화면 선언을 여러 플랫폼의 이동 흐름으로 연결했어요. 앱 전체보다는 라우팅 기반을 구현한 공개 프로토타입이에요.",
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
        title: "무엇을 만들었나요",
        paragraphs: [
          "iOS와 Android, 웹에서 함께 쓸 화면 라우팅 구조를 실험했어요. React Native와 React Native Web, Vite를 연결하고 화면 스택과 링크, 타입 기반 선언을 구성했어요. 생활 앱 전체가 아니라, 여러 플랫폼의 화면 이동을 만드는 기반까지 구현했어요.",
        ],
      },
      {
        id: "contribution",
        title: "제가 맡은 부분과 남은 기록",
        paragraphs: [
          "스택 정의와 타입 처리, 링크와 훅 코드를 구성했어요. Reanimated와 웹 환경을 함께 다루고, 화면 선언을 여러 플랫폼의 이동 흐름으로 연결했어요. 앱 전체보다는 라우팅 기반을 구현한 공개 프로토타입이에요.",
        ],
      },
    ],
  },
  {
    slug: "namu-topic",
    name: "Namu Topic",
    subtitle: "검색어만 보는 대신 왜 화제인지도 함께 읽게 했어요.",
    summary: "실시간 인기 검색어와 맥락을 Gemini로 요약하는 개인 AI 프로젝트예요.",
    period: "2026 기록",
    category: "개인 작업",
    role: "웹 / 서버 / AI 통합",
    status: "공개 AI 지원 프로젝트 / 과거 수정 기록",
    tags: ["React", "Bun", "Gemini", "MongoDB"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "실시간 인기 검색어를 보여 주고 그 이유와 맥락을 AI가 요약하는 프로젝트예요. React 화면과 Bun 서버, MongoDB를 연결하고 Gemini로 설명을 생성했어요. 단어 목록만 보는 대신 그 주변의 이야기도 함께 읽을 수 있도록 구성했어요.",
      "검색어와 AI 설명을 연결하고 화면과 서버를 수정했어요. 데이터를 모으는 서버와 Gemini의 요약을 보여주는 웹을 함께 만들었어요. 요약은 자동 생성된 내용이라 별도의 사실 확인이 필요해요.",
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
        title: "무엇을 만들었나요",
        paragraphs: [
          "실시간 인기 검색어를 보여 주고 그 이유와 맥락을 AI가 요약하는 프로젝트예요. React 화면과 Bun 서버, MongoDB를 연결하고 Gemini로 설명을 생성했어요. 단어 목록만 보는 대신 그 주변의 이야기도 함께 읽을 수 있도록 구성했어요.",
        ],
      },
      {
        id: "contribution",
        title: "제가 맡은 부분과 남은 기록",
        paragraphs: [
          "검색어와 AI 설명을 연결하고 화면과 서버를 수정했어요. 데이터를 모으는 서버와 Gemini의 요약을 보여주는 웹을 함께 만들었어요. 요약은 자동 생성된 내용이라 별도의 사실 확인이 필요해요.",
        ],
      },
    ],
  },
  {
    slug: "codeblock-bff",
    name: "CodeBlock BFF",
    subtitle: "여러 API의 흐름을 블록으로 연결해 봤어요.",
    summary: "블록형 API 흐름의 저장 / 실행 / 캐시를 구성한 시각적 조합 PoC예요.",
    period: "2026 기록",
    category: "개인 작업",
    role: "프론트엔드 / 서버 개발",
    status: "공개 시각적 API 조합 PoC",
    tags: ["Vue", "Vue Flow", "Bun", "MongoDB", "Redis"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "여러 API의 흐름을 블록으로 연결하고 하나의 실행 흐름으로 다루는 프로토타입이에요. Vue와 Vue Flow로 편집 화면을 만들고 Bun 서버에서 흐름을 저장하고 실행하도록 구성했어요. 코드를 한 파일에 쌓는 대신 데이터 흐름을 시각적으로 표현해 본 개발 도구 실험이에요.",
      "흐름 CRUD와 공개 흐름 실행, 캐시와 로그 기능을 만들었어요. MongoDB와 Redis를 연결해 편집한 흐름을 서버에서 실행하는 단계까지 구현한 PoC예요. 프로덕션 환경의 성능까지 검증한 제품은 아니에요.",
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
        title: "무엇을 만들었나요",
        paragraphs: [
          "여러 API의 흐름을 블록으로 연결하고 하나의 실행 흐름으로 다루는 프로토타입이에요. Vue와 Vue Flow로 편집 화면을 만들고 Bun 서버에서 흐름을 저장하고 실행하도록 구성했어요. 코드를 한 파일에 쌓는 대신 데이터 흐름을 시각적으로 표현해 본 개발 도구 실험이에요.",
        ],
      },
      {
        id: "contribution",
        title: "제가 맡은 부분과 남은 기록",
        paragraphs: [
          "흐름 CRUD와 공개 흐름 실행, 캐시와 로그 기능을 만들었어요. MongoDB와 Redis를 연결해 편집한 흐름을 서버에서 실행하는 단계까지 구현한 PoC예요. 프로덕션 환경의 성능까지 검증한 제품은 아니에요.",
        ],
      },
    ],
  },
  {
    slug: "jusawi",
    name: "공유 주사위",
    subtitle: "여러 화면에서 같은 주사위 결과를 보게 했어요.",
    summary: "WebSocket으로 주사위 상태와 접속 수를 공유하는 작은 웹 실험이에요.",
    period: "2026 기록",
    category: "개인 작업",
    role: "웹 / WebSocket 서버 개발",
    status: "공개 소형 실험",
    tags: ["Bun", "WebSocket"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "여러 사용자의 화면에서 같은 주사위 상태를 볼 수 있는 작은 웹을 만들었어요. Bun의 WebSocket과 정적 파일 서버를 연결하고 현재 주사위 값과 접속 수를 공유했어요. 실시간 상태가 여러 화면에 전달되는 흐름을 짧은 코드로 확인해 봤어요.",
      "주사위 상태와 접속 수, pub / sub 연결을 구성했어요. 하나의 값이 바뀌면 접속한 여러 화면이 같은 상태를 받는 흐름이에요. 작은 웹 안에서 실시간 상태 공유를 구현해 본 공개 실험이에요.",
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
        title: "무엇을 만들었나요",
        paragraphs: [
          "여러 사용자의 화면에서 같은 주사위 상태를 볼 수 있는 작은 웹을 만들었어요. Bun의 WebSocket과 정적 파일 서버를 연결하고 현재 주사위 값과 접속 수를 공유했어요. 실시간 상태가 여러 화면에 전달되는 흐름을 짧은 코드로 확인해 봤어요.",
        ],
      },
      {
        id: "contribution",
        title: "제가 맡은 부분과 남은 기록",
        paragraphs: [
          "주사위 상태와 접속 수, pub / sub 연결을 구성했어요. 하나의 값이 바뀌면 접속한 여러 화면이 같은 상태를 받는 흐름이에요. 작은 웹 안에서 실시간 상태 공유를 구현해 본 공개 실험이에요.",
        ],
      },
    ],
  },
  {
    slug: "vault-get",
    name: "vault-get",
    subtitle: "개발 설정을 터미널에서 가져오는 작은 CLI를 만들었어요.",
    summary: "Vault의 값을 개발용 환경 설정 파일로 옮기는 범용 CLI 도구예요.",
    period: "2026 기록",
    category: "개인 작업",
    role: "CLI 개발",
    status: "공개 코드 / 실제 배포 / 채택 수 미확인",
    tags: ["CLI", "TypeScript", "Bun", "Vault", "OIDC"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "개발 환경을 준비할 때 Vault의 값을 환경 설정 파일로 가져오는 CLI를 만들었어요. 로그인 상태와 값 읽기, 파일 쓰기 흐름을 Bun과 TypeScript로 구성했어요. 반복해서 준비하는 설정 작업을 작은 명령행 도구로 다뤄 봤어요.",
      "Bun / TypeScript CLI에 Vault 연결과 환경 설정 파일 출력을 구성하고 빌드 스크립트를 정리했어요. 범용 도구의 코드만 공개했고, 실제 비밀값과 비공개 주소는 싣지 않았어요.",
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
        title: "무엇을 만들었나요",
        paragraphs: [
          "개발 환경을 준비할 때 Vault의 값을 환경 설정 파일로 가져오는 CLI를 만들었어요. 로그인 상태와 값 읽기, 파일 쓰기 흐름을 Bun과 TypeScript로 구성했어요. 반복해서 준비하는 설정 작업을 작은 명령행 도구로 다뤄 봤어요.",
        ],
      },
      {
        id: "contribution",
        title: "제가 맡은 부분과 남은 기록",
        paragraphs: [
          "Bun / TypeScript CLI에 Vault 연결과 환경 설정 파일 출력을 구성하고 빌드 스크립트를 정리했어요. 범용 도구의 코드만 공개했고, 실제 비밀값과 비공개 주소는 싣지 않았어요.",
        ],
      },
    ],
  },
  {
    slug: "f1-rules",
    name: "F1 규정 문서 뷰어",
    subtitle: "관심 있는 규정을 찾아 읽기 좋은 화면으로 옮겨 봤어요.",
    summary: "한국어 규정 문서의 목차 / 검색 / Markdown 화면을 구성한 개인 웹이에요.",
    period: "2026 기록",
    category: "개인 작업",
    role: "문서 웹 개발",
    status: "공개 문서 뷰어 / 번역 정확성 미검증",
    tags: ["Next.js", "MDX", "Documentation"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "F1 규정 문서를 한국어로 찾아 읽는 화면을 구성했어요. Next.js와 MDX, Markdown 처리 도구로 문서와 목차, 검색 화면을 다뤘어요. 관심 있는 주제의 긴 문서를 웹에서 탐색하는 경험으로 옮겨 본 개인 작업이에요.",
      "문서 UI와 Markdown 처리 구조를 만들고 목차와 검색으로 긴 문서를 탐색하도록 구성했어요. FIA의 공식 번역이 아닌 개인 문서 뷰어이며, 규정 해석과 번역의 정확성을 확인하려면 원문도 함께 읽어야 해요.",
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
        title: "무엇을 만들었나요",
        paragraphs: [
          "F1 규정 문서를 한국어로 찾아 읽는 화면을 구성했어요. Next.js와 MDX, Markdown 처리 도구로 문서와 목차, 검색 화면을 다뤘어요. 관심 있는 주제의 긴 문서를 웹에서 탐색하는 경험으로 옮겨 본 개인 작업이에요.",
        ],
      },
      {
        id: "contribution",
        title: "제가 맡은 부분과 남은 기록",
        paragraphs: [
          "문서 UI와 Markdown 처리 구조를 만들고 목차와 검색으로 긴 문서를 탐색하도록 구성했어요. FIA의 공식 번역이 아닌 개인 문서 뷰어이며, 규정 해석과 번역의 정확성을 확인하려면 원문도 함께 읽어야 해요.",
        ],
      },
    ],
  },
  {
    slug: "auto-invest",
    name: "거래 상태 동기화 실험",
    subtitle: "변하는 외부 상태를 코드의 상태와 맞춰 봤어요.",
    summary: "거래 상태와 수수료 계산 처리를 다룬 Python 개인 프로토타입이에요.",
    period: "2026 기록",
    category: "개인 작업",
    role: "Python 코드 개발",
    status: "과거 고위험 개인 프로토타입 / 수익성 미검증",
    tags: ["Python", "Trading automation"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "외부 거래 상태와 Python 코드의 상태를 맞추고, 수수료를 포함한 결과 계산을 실험했어요. 자동화 코드에서 현재 상태와 실행 후 상태를 구분하도록 수정한 개인 프로토타입이에요. 실제 금융 서비스를 출시한 작업은 아니에요.",
      "포지션 동기화와 종료 처리, 수수료 계산을 수정했어요. 안전성과 수익성을 검증하지 않은 개인 실험이며, 타인의 투자를 돕거나 투자 조언을 제공하는 제품은 아니에요. 실제 계좌와 자금, 거래 결과는 공개하지 않아요.",
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
        title: "무엇을 만들었나요",
        paragraphs: [
          "외부 거래 상태와 Python 코드의 상태를 맞추고, 수수료를 포함한 결과 계산을 실험했어요. 자동화 코드에서 현재 상태와 실행 후 상태를 구분하도록 수정한 개인 프로토타입이에요. 실제 금융 서비스를 출시한 작업은 아니에요.",
        ],
      },
      {
        id: "contribution",
        title: "제가 맡은 부분과 남은 기록",
        paragraphs: [
          "포지션 동기화와 종료 처리, 수수료 계산을 수정했어요. 안전성과 수익성을 검증하지 않은 개인 실험이며, 타인의 투자를 돕거나 투자 조언을 제공하는 제품은 아니에요. 실제 계좌와 자금, 거래 결과는 공개하지 않아요.",
        ],
      },
    ],
  },
  {
    slug: "f1-slack",
    name: "F1 Race Control Slack Bot",
    subtitle: "좋아하는 레이스 소식을 대화방으로 가져왔어요.",
    summary: "F1 라이브 피드의 레이스 컨트롤 / 타이밍 / 피트 정보를 Slack에 알리는 개인 봇이에요.",
    period: "2026 기록",
    category: "개인 작업",
    role: "봇 개발 / 연결 안정성 개선",
    status: "공개 코드 / 개인 알림 사용 기록",
    tags: ["Python", "SignalR", "WebSocket", "Slack", "Resilience", "CI"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "F1 라이브 피드에서 레이스 컨트롤과 타이밍, 피트 정보를 읽어 Slack으로 보내는 봇을 만들었어요. 세션과 네트워크가 바뀌어도 알림이 이어지도록 연결 유지 방식을 손봤어요.",
      "Python과 SignalR로 재연결 / 재구독 / 세션 전환 처리를 개선하고, 상태 확인과 테스트, CI를 추가했어요. 개인 알림으로 사용해 봤지만 Slack 전송 제한으로 일부 알림이 빠지는 문제는 남아 있어요.",
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
        title: "무엇을 만들었나요",
        paragraphs: [
          "F1 라이브 피드에서 레이스 컨트롤과 타이밍, 피트 정보를 읽어 Slack으로 보내는 봇을 만들었어요. 세션과 네트워크가 바뀌어도 알림이 이어지도록 연결 유지 방식을 손봤어요.",
        ],
      },
      {
        id: "contribution",
        title: "제가 맡은 부분과 남은 기록",
        paragraphs: [
          "Python과 SignalR로 재연결 / 재구독 / 세션 전환 처리를 개선하고, 상태 확인과 테스트, CI를 추가했어요. 개인 알림으로 사용해 봤지만 Slack 전송 제한으로 일부 알림이 빠지는 문제는 남아 있어요.",
        ],
      },
    ],
  },
  {
    slug: "srt-auto",
    name: "SRT 예약 워크플로 실험",
    subtitle: "선택한 열차와 대기 작업의 상태를 웹에서 다뤄 봤어요.",
    summary: "열차 선택과 대기 작업을 웹 / 서버 / 비동기 작업으로 연결한 AI 지원 프로토타입이에요.",
    period: "2026 기록",
    category: "개인 작업",
    role: "개인 프로젝트 / AI 지원 구현",
    status: "공개 예약 자동화 프로토타입",
    tags: ["Django", "Celery", "React Router", "PostgreSQL"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "열차를 선택하고 예약 대기 작업의 상태를 웹에서 관리하는 프로토타입을 만들었어요. Django와 React Router 화면, Celery 비동기 작업을 연결한 구조예요. 외부 라이브러리를 활용해 긴 작업을 화면과 서버에서 함께 다뤄 본 AI 지원 프로젝트예요.",
      "Django / DRF와 Celery, Redis와 PostgreSQL로 구성한 AI 지원 코드가 공개돼 있어요. 공식 SRT 제품은 아니며, 실제 발권이나 결제 성공 여부는 검증하지 못했어요. 운송 약관과 사용자 권한을 지켜야 하는 개인 실험으로, 인증 정보와 재시도 세부 흐름은 공개하지 않아요.",
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
        title: "무엇을 만들었나요",
        paragraphs: [
          "열차를 선택하고 예약 대기 작업의 상태를 웹에서 관리하는 프로토타입을 만들었어요. Django와 React Router 화면, Celery 비동기 작업을 연결한 구조예요. 외부 라이브러리를 활용해 긴 작업을 화면과 서버에서 함께 다뤄 본 AI 지원 프로젝트예요.",
        ],
      },
      {
        id: "contribution",
        title: "제가 맡은 부분과 남은 기록",
        paragraphs: [
          "Django / DRF와 Celery, Redis와 PostgreSQL로 구성한 AI 지원 코드가 공개돼 있어요. 공식 SRT 제품은 아니며, 실제 발권이나 결제 성공 여부는 검증하지 못했어요. 운송 약관과 사용자 권한을 지켜야 하는 개인 실험으로, 인증 정보와 재시도 세부 흐름은 공개하지 않아요.",
        ],
      },
    ],
  },
  {
    slug: "webtoon",
    name: "AI Webtoon",
    subtitle: "이미지 한 장에서 끝내지 않고 이야기로 이어 가려고 했어요.",
    summary: "인터뷰 / 스토리보드 / 화별 콘티 / 컷 생성을 연결한 AI 지원 워크플로예요.",
    period: "2026 기록",
    category: "개인 작업",
    role: "개인 프로젝트 / AI 지원 구현",
    status: "공개 프로토타입 / 개인 사용 기록",
    tags: ["NestJS", "React Router", "OpenAI", "Image generation", "Redis"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "이미지와 주제로 인터뷰를 진행하고 스토리보드, 화별 콘티와 컷 생성으로 이어가는 웹툰 제작 워크플로예요. 이미지 한 장을 생성하는 데서 끝내지 않고 앞선 컷의 맥락과 캐릭터, 스타일을 다음 결과에 연결하는 구조를 다뤘어요. 제가 직접 사용하며 만든 AI 지원 개인 프로젝트예요.",
      "NestJS와 React Router, OpenAI와 Redis 작업 / 이벤트를 연결했어요. 캐릭터와 스타일 참조를 나누고 한 장면에 맞게 결과를 보정했어요. 외부 이미지 모델을 워크플로에 통합한 AI 지원 개인 프로젝트예요.",
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
        title: "무엇을 만들었나요",
        paragraphs: [
          "이미지와 주제로 인터뷰를 진행하고 스토리보드, 화별 콘티와 컷 생성으로 이어가는 웹툰 제작 워크플로예요. 이미지 한 장을 생성하는 데서 끝내지 않고 앞선 컷의 맥락과 캐릭터, 스타일을 다음 결과에 연결하는 구조를 다뤘어요. 제가 직접 사용하며 만든 AI 지원 개인 프로젝트예요.",
        ],
      },
      {
        id: "contribution",
        title: "제가 맡은 부분과 남은 기록",
        paragraphs: [
          "NestJS와 React Router, OpenAI와 Redis 작업 / 이벤트를 연결했어요. 캐릭터와 스타일 참조를 나누고 한 장면에 맞게 결과를 보정했어요. 외부 이미지 모델을 워크플로에 통합한 AI 지원 개인 프로젝트예요.",
        ],
      },
    ],
  },
  {
    slug: "local-phone",
    name: "Local Phone",
    subtitle: "통화와 번역을 같은 화면에서 실험했어요.",
    summary:
      "음성 / 영상 통화 / 화면 공유 / 채팅과 Gemini 실시간 번역을 연결한 개인 프로토타입이에요.",
    period: "2026 기록",
    category: "개인 작업",
    role: "개인 프로젝트 / AI 지원 구현",
    status: "공개 WebRTC 프로토타입 / 개인 사용 기록",
    tags: ["WebRTC", "Socket.IO", "NestJS", "Gemini Live"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "음성과 영상 통화, 화면 공유와 채팅에 실시간 번역을 함께 붙인 개인 프로젝트예요. WebRTC 통화와 Socket.IO 신호 전달, Gemini Live를 연결했어요. 제가 직접 사용하는 통화 경험 안에서 여러 언어의 대화를 어떻게 다룰 수 있는지 실험했어요.",
      "AI 지원으로 NestJS 서버와 React Router 화면, 실시간 AI 모델을 연결했어요. WebRTC 통화와 번역 요청을 같은 화면에서 다룬 시제품이며, 실제 상대방 정보와 대화 원문은 공개하지 않아요.",
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
        title: "무엇을 만들었나요",
        paragraphs: [
          "음성과 영상 통화, 화면 공유와 채팅에 실시간 번역을 함께 붙인 개인 프로젝트예요. WebRTC 통화와 Socket.IO 신호 전달, Gemini Live를 연결했어요. 제가 직접 사용하는 통화 경험 안에서 여러 언어의 대화를 어떻게 다룰 수 있는지 실험했어요.",
        ],
      },
      {
        id: "contribution",
        title: "제가 맡은 부분과 남은 기록",
        paragraphs: [
          "AI 지원으로 NestJS 서버와 React Router 화면, 실시간 AI 모델을 연결했어요. WebRTC 통화와 번역 요청을 같은 화면에서 다룬 시제품이며, 실제 상대방 정보와 대화 원문은 공개하지 않아요.",
        ],
      },
    ],
  },
  {
    slug: "bizmeka-mcp",
    name: "KT Bizmeka MCP",
    subtitle: "업무 포털을 AI가 사용할 수 있는 도구로 연결했어요.",
    summary: "메일 / 일정 / 회의실 업무를 MCP 도구로 연결한 비공식 개인 구현이에요.",
    period: "2026 기록",
    category: "개인 작업",
    role: "개인 프로젝트 / AI 지원 구현",
    status: "공개 릴리스 기록 / 비공식 도구",
    tags: ["MCP", "TypeScript", "Bun", "OAuth", "Browser automation", "CLI", "CI"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "Bizmeka 포털의 메일 / 일정 / 회의실 업무를 AI가 사용할 수 있는 MCP 도구로 연결한 개인 프로젝트예요. 메일 조회와 발송, 일정 조회 / 검색 / 등록 / 수정, 예약할 시설 목록을 확인하는 도구를 TypeScript와 Bun으로 구성했어요. 답변으로 설명하는 데서 끝내지 않고 사용자가 인증한 업무 공간의 기능을 도구로 이어 줬어요.",
      "MCP SDK와 명령행 실행, 배포 파일을 연결해 여러 운영체제용 실행 파일을 공개했어요. AI 지원으로 만든 비공식 개인 프로젝트이며 KT의 공식 제품이나 공식 API는 아니에요. 공개 코드에 도구가 구현돼 있어도 실제 계정의 모든 업무를 검증한 것은 아니에요. 인증 정보와 업무 데이터는 공개하지 않아요.",
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
        title: "무엇을 만들었나요",
        paragraphs: [
          "Bizmeka 포털의 메일 / 일정 / 회의실 업무를 AI가 사용할 수 있는 MCP 도구로 연결한 개인 프로젝트예요. 메일 조회와 발송, 일정 조회 / 검색 / 등록 / 수정, 예약할 시설 목록을 확인하는 도구를 TypeScript와 Bun으로 구성했어요. 답변으로 설명하는 데서 끝내지 않고 사용자가 인증한 업무 공간의 기능을 도구로 이어 줬어요.",
        ],
      },
      {
        id: "contribution",
        title: "제가 맡은 부분과 남은 기록",
        paragraphs: [
          "MCP SDK와 명령행 실행, 배포 파일을 연결해 여러 운영체제용 실행 파일을 공개했어요. AI 지원으로 만든 비공식 개인 프로젝트이며 KT의 공식 제품이나 공식 API는 아니에요. 공개 코드에 도구가 구현돼 있어도 실제 계정의 모든 업무를 검증한 것은 아니에요. 인증 정보와 업무 데이터는 공개하지 않아요.",
        ],
      },
    ],
  },
  {
    slug: "unha",
    name: "인터랙티브 랜딩 실험",
    subtitle: "한 화면의 타이포와 움직임을 다뤄 봤어요.",
    summary: "타이포 / 클로버 / 글리치 / 모션을 구성한 React Router 랜딩 실험이에요.",
    period: "2026 기록",
    category: "개인 작업",
    role: "프론트엔드 개발",
    status: "과거 랜딩 실험 / 브랜드 관계 미확인",
    tags: ["React Router", "Motion"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "React Router로 타이포와 클로버 모양, 글리치와 모션을 배치한 랜딩 화면을 만들었어요. 컴포넌트로 화면을 구성하고 공유 미리보기 메타데이터도 설정했어요. 한 화면의 시각적 표현과 움직임을 다뤄 본 개인 실험이에요.",
      "클로버 컴포넌트와 타이포, 모션을 구성했어요. 특정 브랜드나 고객과의 관계를 확인할 수 없어, 외주 사례가 아닌 랜딩 실험으로 소개해요.",
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
        title: "무엇을 만들었나요",
        paragraphs: [
          "React Router로 타이포와 클로버 모양, 글리치와 모션을 배치한 랜딩 화면을 만들었어요. 컴포넌트로 화면을 구성하고 공유 미리보기 메타데이터도 설정했어요. 한 화면의 시각적 표현과 움직임을 다뤄 본 개인 실험이에요.",
        ],
      },
      {
        id: "contribution",
        title: "제가 맡은 부분과 남은 기록",
        paragraphs: [
          "클로버 컴포넌트와 타이포, 모션을 구성했어요. 특정 브랜드나 고객과의 관계를 확인할 수 없어, 외주 사례가 아닌 랜딩 실험으로 소개해요.",
        ],
      },
    ],
  },
  {
    slug: "cgv-cli",
    name: "CGV CLI",
    subtitle: "영화와 상영 정보를 터미널에서도 다뤄 봤어요.",
    summary: "영화 / 극장 / 날짜 / 잔여 좌석을 다루는 비공식 TypeScript 클라이언트예요.",
    period: "2026 기록",
    category: "개인 작업",
    role: "CLI / HTTP 클라이언트 개발",
    status: "공개 코드 / 개인 사용 기록 / 릴리스 없음",
    tags: ["CLI", "TypeScript", "Node.js", "HTTP client", "API analysis"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "영화와 극장, 날짜와 잔여 좌석 정보를 터미널에서 다룰 수 있도록 만든 비공식 클라이언트예요. Node.js의 fetch와 TypeScript로 통신 코드를 나누고 명령행 흐름을 구성했어요. 제가 직접 쓰는 영화 도구를 화면 밖의 코드와 터미널로 연결한 작업이에요.",
      "클라이언트와 명령행 기능, 통신 오류 처리를 만들었어요. CGV의 공식 제품은 아니고, 결제 준비 코드가 있지만 실제 결제 완료 여부는 검증하지 못했어요. 계정과 세션, 결제 정보와 인증 세부는 공개하지 않아요.",
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
        title: "무엇을 만들었나요",
        paragraphs: [
          "영화와 극장, 날짜와 잔여 좌석 정보를 터미널에서 다룰 수 있도록 만든 비공식 클라이언트예요. Node.js의 fetch와 TypeScript로 통신 코드를 나누고 명령행 흐름을 구성했어요. 제가 직접 쓰는 영화 도구를 화면 밖의 코드와 터미널로 연결한 작업이에요.",
        ],
      },
      {
        id: "contribution",
        title: "제가 맡은 부분과 남은 기록",
        paragraphs: [
          "클라이언트와 명령행 기능, 통신 오류 처리를 만들었어요. CGV의 공식 제품은 아니고, 결제 준비 코드가 있지만 실제 결제 완료 여부는 검증하지 못했어요. 계정과 세션, 결제 정보와 인증 세부는 공개하지 않아요.",
        ],
      },
    ],
  },
  {
    slug: "facefusion-setup",
    name: "FaceFusion macOS 래퍼",
    subtitle: "외부 도구를 제 작업환경에 맞게 연결했어요.",
    summary: "FaceFusion 실행과 OBS 가상카메라 연결을 돕는 macOS 설치 / 실행 스크립트예요.",
    period: "2026 기록",
    category: "개인 작업",
    role: "설치 / 실행 / 환경 통합",
    status: "공개 통합 도구 / 외부 모델 활용",
    tags: ["macOS", "Shell", "OBS", "Third-party integration"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "외부 FaceFusion을 macOS에서 실행하고 OBS 가상카메라와 연결할 수 있도록 설치 / 실행 / 점검 스크립트와 사용 안내를 정리했어요. AI 모델 자체를 개발한 것이 아니라, 기존 도구를 제 작업환경에서 쓰기 위한 통합 작업이에요.",
      "셸 스크립트와 실행 안내, 벤치마크 구성을 만들고 실행 기본값을 손봤어요. 얼굴 처리 모델은 외부 FaceFusion의 구현을 사용하며, 모델 라이선스와 당사자 동의가 필요해요. 여기서는 설치와 실행 환경만 다루고, 사칭이나 기만을 위한 활용은 소개하지 않아요.",
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
        title: "무엇을 만들었나요",
        paragraphs: [
          "외부 FaceFusion을 macOS에서 실행하고 OBS 가상카메라와 연결할 수 있도록 설치 / 실행 / 점검 스크립트와 사용 안내를 정리했어요. AI 모델 자체를 개발한 것이 아니라, 기존 도구를 제 작업환경에서 쓰기 위한 통합 작업이에요.",
        ],
      },
      {
        id: "contribution",
        title: "제가 맡은 부분과 남은 기록",
        paragraphs: [
          "셸 스크립트와 실행 안내, 벤치마크 구성을 만들고 실행 기본값을 손봤어요. 얼굴 처리 모델은 외부 FaceFusion의 구현을 사용하며, 모델 라이선스와 당사자 동의가 필요해요. 여기서는 설치와 실행 환경만 다루고, 사칭이나 기만을 위한 활용은 소개하지 않아요.",
        ],
      },
    ],
  },
  {
    slug: "dbad-korean",
    name: "DBAD License 한국어 번역",
    subtitle: "오픈소스 문서에 한국어 번역을 제출했어요.",
    summary: "외부 라이선스 문서의 한국어 번역을 PR로 제출한 기록이에요.",
    period: "2024 기록",
    category: "오픈소스 기여",
    role: "한국어 문서 번역 제출",
    status: "PR 닫힘 / 병합되지 않음",
    tags: ["Documentation", "Translation"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "외부 오픈소스 라이선스 문서를 한국어로 번역해 pull request로 제출했어요. DBAD 저장소에 번역 파일 하나를 작성해 제안한 문서 기여예요.",
      "한국어 번역을 PR #92로 제출했어요. PR은 닫혔고 병합되지는 않았어요. 번역을 작성하고 제출한 단계까지 진행한 작업이에요.",
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
        title: "무엇을 만들었나요",
        paragraphs: [
          "외부 오픈소스 라이선스 문서를 한국어로 번역해 pull request로 제출했어요. DBAD 저장소에 번역 파일 하나를 작성해 제안한 문서 기여예요.",
        ],
      },
      {
        id: "contribution",
        title: "제가 맡은 부분과 남은 기록",
        paragraphs: [
          "한국어 번역을 PR #92로 제출했어요. PR은 닫혔고 병합되지는 않았어요. 번역을 작성하고 제출한 단계까지 진행한 작업이에요.",
        ],
      },
    ],
  },
  {
    slug: "slack-cli-send",
    name: "Slack CLI 메시지 전송 기여",
    subtitle: "읽고 초안을 준비하던 도구에 명시적인 전송 기능을 보탰어요.",
    summary: "직접 전송 / 초안 전송과 MCP 도구를 추가해 제출한 외부 PR이에요.",
    period: "2026 기록",
    category: "오픈소스 기여",
    role: "CLI / MCP 기능 구현 / 제출",
    status: "PR 열림 / 병합되지 않음",
    tags: ["TypeScript", "Slack API", "MCP"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "메시지를 읽고 초안을 다루던 외부 Slack CLI에 명시적인 메시지 전송 기능을 보탰어요. 직접 전송과 초안 전송, AI가 사용할 MCP 도구를 함께 구성한 변경이에요. 이미 쓰고 있던 다른 개발자의 도구에 필요한 기능을 추가해 pull request로 전달했어요.",
      "전송 기능과 MCP 도구, 메시지 참조 변환을 구현해 krisamin/slack-cli PR #1로 제출했어요. 확인한 시점에는 PR이 열려 있고 아직 병합되지 않았어요.",
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
        title: "무엇을 만들었나요",
        paragraphs: [
          "메시지를 읽고 초안을 다루던 외부 Slack CLI에 명시적인 메시지 전송 기능을 보탰어요. 직접 전송과 초안 전송, AI가 사용할 MCP 도구를 함께 구성한 변경이에요. 이미 쓰고 있던 다른 개발자의 도구에 필요한 기능을 추가해 pull request로 전달했어요.",
        ],
      },
      {
        id: "contribution",
        title: "제가 맡은 부분과 남은 기록",
        paragraphs: [
          "전송 기능과 MCP 도구, 메시지 참조 변환을 구현해 krisamin/slack-cli PR #1로 제출했어요. 확인한 시점에는 PR이 열려 있고 아직 병합되지 않았어요.",
        ],
      },
    ],
  },
  {
    slug: "side-gig-prep",
    name: "AI 디자인 가상 샘플",
    subtitle: "발표자료와 상세페이지를 샘플로 만들어 봤어요.",
    summary: "IR 발표자료 / 상세페이지 / 벡터 로고를 AI 지원으로 만든 준비 단계 기록이에요.",
    period: "2026 기록",
    category: "개인 작업",
    role: "개인 샘플 기획 / AI 지원 제작",
    status: "가상 샘플 / 판매 준비 / 유상 실적 아님",
    tags: ["Design automation", "Canvas", "PPT", "SVG", "Business planning"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "발표자료와 상세페이지, 벡터 로고를 AI 지원으로 만들어 본 가상 샘플 작업이에요. 도화지와 SVG 등을 사용해 결과물과 등록용 원고를 구성했어요. 실제 고객 의뢰가 아니라 제작 방식과 소개할 예시를 준비해 본 단계예요.",
      "가상의 브랜드와 발표 상황을 정해 AI 지원으로 샘플을 제작했어요. 실주문이나 납품, 매출이 발생한 외주 작업은 아니에요. 부모님 사이트 제작과 사업자 등록도 유상 외주 실적에 포함하지 않았어요.",
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
        title: "무엇을 만들었나요",
        paragraphs: [
          "발표자료와 상세페이지, 벡터 로고를 AI 지원으로 만들어 본 가상 샘플 작업이에요. 도화지와 SVG 등을 사용해 결과물과 등록용 원고를 구성했어요. 실제 고객 의뢰가 아니라 제작 방식과 소개할 예시를 준비해 본 단계예요.",
        ],
      },
      {
        id: "contribution",
        title: "제가 맡은 부분과 남은 기록",
        paragraphs: [
          "가상의 브랜드와 발표 상황을 정해 AI 지원으로 샘플을 제작했어요. 실주문이나 납품, 매출이 발생한 외주 작업은 아니에요. 부모님 사이트 제작과 사업자 등록도 유상 외주 실적에 포함하지 않았어요.",
        ],
      },
    ],
  },
  {
    slug: "apk-static-research",
    name: "APK 정적 구조 분석",
    subtitle: "앱의 코드를 실행하기 전에 구조부터 읽어 봤어요.",
    summary: "APK의 타입 선언과 통신 인터페이스를 정적으로 살펴본 독립 학습 연구예요.",
    period: "2026 기록",
    category: "개인 작업",
    role: "정적 분석 학습",
    status: "과거 독립 연구 기록 / 전체 수치 미검증",
    tags: ["Infosec", "Static analysis", "API analysis"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "APK에서 타입 선언과 통신 인터페이스를 읽고 앱 내부의 데이터 흐름을 정적으로 정리해 본 연구예요. JADX와 선언 정보, 직렬화 구조를 다뤘어요. 앱을 직접 개발한 경력과는 별개로 기존 프로그램의 구조를 읽는 방법을 익힌 작업이에요.",
      "정적 분석 문서는 남아 있지만, 파서와 전체 추출 수치는 이번 정리에서 다시 검증하지 않았어요. 실제 트래픽과 주문 / 결제 전반을 확인한 작업이나 대상 회사의 제품 개발에 참여한 이력은 아니에요. 원본 APK와 주소, 인증 흐름과 계정 자료는 공개하지 않아요.",
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
        title: "무엇을 만들었나요",
        paragraphs: [
          "APK에서 타입 선언과 통신 인터페이스를 읽고 앱 내부의 데이터 흐름을 정적으로 정리해 본 연구예요. JADX와 선언 정보, 직렬화 구조를 다뤘어요. 앱을 직접 개발한 경력과는 별개로 기존 프로그램의 구조를 읽는 방법을 익힌 작업이에요.",
        ],
      },
      {
        id: "contribution",
        title: "제가 맡은 부분과 남은 기록",
        paragraphs: [
          "정적 분석 문서는 남아 있지만, 파서와 전체 추출 수치는 이번 정리에서 다시 검증하지 않았어요. 실제 트래픽과 주문 / 결제 전반을 확인한 작업이나 대상 회사의 제품 개발에 참여한 이력은 아니에요. 원본 APK와 주소, 인증 흐름과 계정 자료는 공개하지 않아요.",
        ],
      },
    ],
  },
  {
    slug: "browser-avatar-rig",
    name: "브라우저 아바타 리깅 실험",
    subtitle: "생성한 그림에 목소리와 움직임을 붙여 봤어요.",
    summary:
      "AI 지원으로 그림을 파츠로 나누고 마이크 립싱크 / 깜빡임 / 호흡을 연결한 HTML 아바타 시안이에요.",
    period: "2026 기록",
    category: "개인 작업",
    role: "개인 시안 요청 / AI 지원 제작",
    status: "과거 AI 지원 시안 / 후속 리깅 미완성",
    tags: ["HTML", "Web Audio", "Image generation", "Avatar"],
    image: "",
    color: "#dfdfdf",
    overview: [
      "AI로 만든 캐릭터 그림을 눈과 입 등의 파츠로 나눠 브라우저에서 움직이는 아바타로 연결했어요. 마이크 입력에 따른 입 모양 변화와 자동 깜빡임, 호흡, 키보드 표정 전환을 붙인 개인 시안이에요.",
      "제가 시안을 요청하고 AI 지원으로 이미지와 HTML을 구성했어요. 초기 HTML에는 마이크 입력과 표정 / 입 모양 전환을 구현했어요. 이후 파츠를 더 잘게 나누는 리깅을 실험했지만, 표정 재구성과 측면 키폼 작업은 남아 있어요. 완성된 Live2D 모델이나 판매 / 납품 결과는 아니에요.",
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
        title: "무엇을 만들었나요",
        paragraphs: [
          "AI로 만든 캐릭터 그림을 눈과 입 등의 파츠로 나눠 브라우저에서 움직이는 아바타로 연결했어요. 마이크 입력에 따른 입 모양 변화와 자동 깜빡임, 호흡, 키보드 표정 전환을 붙인 개인 시안이에요.",
        ],
      },
      {
        id: "contribution",
        title: "제가 맡은 부분과 남은 기록",
        paragraphs: [
          "제가 시안을 요청하고 AI 지원으로 이미지와 HTML을 구성했어요. 초기 HTML에는 마이크 입력과 표정 / 입 모양 전환을 구현했어요. 이후 파츠를 더 잘게 나누는 리깅을 실험했지만, 표정 재구성과 측면 키폼 작업은 남아 있어요. 완성된 Live2D 모델이나 판매 / 납품 결과는 아니에요.",
        ],
      },
    ],
  },
];
