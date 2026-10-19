export type HomeStoryChapterId = "intro" | "dipull" | "internal" | "ax" | "ara";
export type HomeStorySentence = {
  id: string;
  text: string;
  lines?: readonly string[];
  note?: string;
  hero?: boolean;
  models: readonly string[];
  screen?: { project: "dipull" | "ara"; id: string };
  link?: { label: string; href: string };
};
export type HomeStoryChapter = {
  id: HomeStoryChapterId;
  label: string;
  sentences: readonly HomeStorySentence[];
};

/** Owner-directed narration, not inferred historical quotations. Product screens
 * are the already reviewed synthetic-data captures; company scenes remain 3D. */
export const HOME_STORY: readonly HomeStoryChapter[] = [
  {
    id: "intro",
    label: "최재민",
    sentences: [
      {
        id: "headline",
        text: "행복한 개발자 · 기술보다 아이디어를",
        hero: true,
        models: ["idea", "document"],
      },
      {
        id: "hello",
        text: "안녕하세요? 최재민입니다!",
        lines: ["안녕하세요?", "최재민입니다!"],
        models: ["idea", "document"],
      },
      {
        id: "wish",
        text: "저는 서비스로 더 많은 사람들을 행복하게 만들어주고 싶어요.",
        lines: ["저는 서비스로 더 많은 사람들을", "행복하게 만들어주고 싶어요."],
        models: ["idea", "document"],
      },
      {
        id: "invitation",
        text: "저의 이야기를 한 번 들어볼래요?",
        lines: ["저의 이야기를", "한 번 들어볼래요?"],
        models: ["idea", "document"],
      },
    ],
  },
  {
    id: "dipull",
    label: "Dipull",
    sentences: [
      {
        id: "school-opening",
        text: "첫 이야기는, 작은 프로젝트가 학교 전체 시스템이 된 이야기예요.",
        lines: ["첫 이야기는, 작은 프로젝트가", "학교 전체 시스템이 된 이야기예요."],
        models: ["campus"],
      },
      {
        id: "class-service",
        text: "처음에는 반에서 쓰던 작은 서비스였어요.",
        lines: ["처음에는 반에서 쓰던", "작은 서비스였어요."],
        models: ["campus"],
      },
      {
        id: "intranet-incident",
        text: "어느 날, 학교 공식 인트라넷이 해킹을 당했어요!",
        lines: ["어느 날, 학교 공식 인트라넷이", "해킹을 당했어요!"],
        note: "무려 DB 랜섬웨어 공격이었어요.",
        models: ["campus"],
      },
      {
        id: "add-school-tools",
        text: "그래서, 어? 하고 반에서 쓰던 서비스에 하나, 둘 기능을 붙였어요.",
        lines: ["그래서, 어? 하고", "반에서 쓰던 서비스에", "하나, 둘 기능을 붙였어요."],
        models: ["campus", "music", "laundry", "calendar"],
      },
      {
        id: "wakeup-screen",
        text: "아침에 듣고 싶은 노래를 신청하고, 친구들이 투표할 수 있게 했어요.",
        lines: ["아침에 듣고 싶은 노래를 신청하고,", "친구들이 투표할 수 있게 했어요."],
        models: ["campus", "music", "laundry", "calendar"],
        screen: { project: "dipull", id: "wakeup" },
      },
      {
        id: "laundry-screen",
        text: "세탁기와 시간을 고르면, 내 예약을 다시 확인할 수 있게 했어요.",
        lines: ["세탁기와 시간을 고르면,", "내 예약을 다시 확인할 수 있게 했어요."],
        models: ["campus", "music", "laundry", "calendar"],
        screen: { project: "dipull", id: "laundry" },
      },
      {
        id: "seats-screen",
        text: "학교에 남는 날에는 잔류 신청과 좌석 선택도 한곳에서 할 수 있었어요.",
        lines: ["학교에 남는 날에는", "잔류 신청과 좌석 선택도", "한곳에서 할 수 있었어요."],
        models: ["campus", "music", "laundry", "calendar"],
        screen: { project: "dipull", id: "stay-seats" },
      },
      {
        id: "school-home-screen",
        text: "오늘의 식단과 시간표도 같은 계정으로 확인할 수 있게 됐어요.",
        lines: ["오늘의 식단과 시간표도", "같은 계정으로 확인할 수 있게 됐어요."],
        models: ["campus", "music", "laundry", "calendar"],
        screen: { project: "dipull", id: "home" },
      },
      {
        id: "dipull-ending",
        text: "그렇게 학교 생활을 잇는 인트라넷 Dipull이 됐어요.",
        lines: ["그렇게 학교 생활을 잇는", "인트라넷 Dipull이 됐어요."],
        note: "졸업을 앞두고 기여 커뮤니티를 열어 후배들이 이어갈 수 있도록 인계했어요.",
        models: ["campus", "music", "laundry", "calendar"],
        link: { label: "Dipull 이야기 자세히 보기", href: "/work/dipull" },
      },
    ],
  },
  {
    id: "internal",
    label: "PFCT · Internal",
    sentences: [
      {
        id: "internal-opening",
        text: "학교에서 시작한 이야기는, 동료들이 쓰는 업무 도구로 이어졌어요.",
        lines: ["학교에서 시작한 이야기는,", "동료들이 쓰는 업무 도구로 이어졌어요."],
        models: ["admin-left", "admin-right"],
      },
      {
        id: "scattered-admins",
        text: "회사에는 업무마다 따로 들어가야 하는 어드민이 여러 개 있었어요.",
        lines: ["회사에는 업무마다 따로 들어가야 하는", "어드민이 여러 개 있었어요."],
        models: ["admin-left", "admin-right"],
      },
      {
        id: "shared-foundation",
        text: "그래서 동료들과, 계정과 메뉴를 같은 기반으로 모으기 시작했어요.",
        lines: ["그래서 동료들과,", "계정과 메뉴를 같은 기반으로", "모으기 시작했어요."],
        models: ["admin-left", "admin-center", "admin-right"],
      },
      {
        id: "permissions",
        text: "화면만 합치는 게 아니라, 필요한 권한을 신청하고 승인받는 흐름도 만들었어요.",
        lines: [
          "화면만 합치는 게 아니라,",
          "필요한 권한을 신청하고",
          "승인받는 흐름도 만들었어요.",
        ],
        models: ["admin-left", "admin-center", "admin-right", "shield", "key"],
      },
      {
        id: "dpd-problem",
        text: "채권관리 현황을 볼 때도 엑셀과 여러 화면을 오가야 했어요.",
        lines: ["채권관리 현황을 볼 때도", "엑셀과 여러 화면을 오가야 했어요."],
        models: ["admin-left", "admin-center", "admin-right", "shield", "key", "dpd"],
      },
      {
        id: "dpd-workflow",
        text: "DPD 대시보드에서 대상을 찾고, 확인한 뒤 담당자를 한 번에 바꿀 수 있게 했어요.",
        lines: [
          "DPD 대시보드에서 대상을 찾고,",
          "확인한 뒤 담당자를",
          "한 번에 바꿀 수 있게 했어요.",
        ],
        models: ["admin-left", "admin-center", "admin-right", "shield", "key", "dpd"],
      },
      {
        id: "internal-ending",
        text: "흩어진 화면을 모으면서, 그 사이에서 끊기던 업무도 하나씩 연결했어요.",
        lines: ["흩어진 화면을 모으면서,", "그 사이에서 끊기던 업무도", "하나씩 연결했어요."],
        note: "실제 사내 화면 대신, 작업의 흐름을 3D로 표현했어요.",
        models: ["admin-left", "admin-center", "admin-right", "shield", "key", "dpd"],
        link: { label: "Internal 이야기 자세히 보기", href: "/work/pfct#admin-foundation" },
      },
    ],
  },
  {
    id: "ax",
    label: "PFCT · AX",
    sentences: [
      {
        id: "ax-opening",
        text: "다음에는, AI가 동료들의 일을 어떻게 도울 수 있을지 고민했어요.",
        lines: ["다음에는, AI가 동료들의 일을", "어떻게 도울 수 있을지 고민했어요."],
        models: ["lily"],
      },
      {
        id: "lily-development",
        text: "AX Squad에서 동료들과 사내 AI Lily를 개발하기 시작했어요.",
        lines: ["AX Squad에서 동료들과", "사내 AI Lily를 개발하기 시작했어요."],
        models: ["lily"],
      },
      {
        id: "meeting-flow",
        text: "회의 중에는 전사를 보고 질문하고, 끝난 뒤에는 요약하고 공유하도록 연결했어요.",
        lines: [
          "회의 중에는 전사를 보고 질문하고,",
          "끝난 뒤에는 요약하고",
          "공유하도록 연결했어요.",
        ],
        models: ["lily", "meeting"],
      },
      {
        id: "wiki-flow",
        text: "사람이 열어둔 문서를 AI도 같은 자리에서 고칠 수 있게 했어요.",
        lines: ["사람이 열어둔 문서를", "AI도 같은 자리에서", "고칠 수 있게 했어요."],
        models: ["lily", "meeting", "mcp-server"],
      },
      {
        id: "mcp-flow",
        text: "개발 · 업무 도구를 MCP로 연결해서, 대화가 실제 작업으로 이어지게 했어요.",
        lines: ["개발 · 업무 도구를 MCP로 연결해서,", "대화가 실제 작업으로 이어지게 했어요."],
        models: ["lily", "mcp-server", "tool-plug", "meeting"],
      },
      {
        id: "waf-opening",
        text: "서비스를 운영할 때는, 의심스러운 요청을 놓치지 않는 일도 필요했어요.",
        lines: ["서비스를 운영할 때는,", "의심스러운 요청을", "놓치지 않는 일도 필요했어요."],
        models: ["waf-radar"],
      },
      {
        id: "waf-connected-logs",
        text: "방화벽 기록만으로는 부족해서, 앱 로그와 서비스의 상태도 함께 연결했어요.",
        lines: ["방화벽 기록만으로는 부족해서,", "앱 로그와 서비스의 상태도", "함께 연결했어요."],
        models: ["waf-radar", "waf-events"],
      },
      {
        id: "waf-ai-investigation",
        text: "AI가 필요한 읽기 도구를 직접 불러, 추가 근거를 확인하도록 만들었어요.",
        lines: ["AI가 필요한 읽기 도구를 직접 불러,", "추가 근거를 확인하도록 만들었어요."],
        models: ["waf-radar", "waf-shield", "waf-events"],
      },
      {
        id: "waf-verdict-evidence",
        text: "운영자는 판정만 보는 게 아니라, 어떤 로그와 도구를 확인했는지도 볼 수 있어요.",
        lines: [
          "운영자는 판정만 보는 게 아니라,",
          "어떤 로그와 도구를 확인했는지도",
          "볼 수 있어요.",
        ],
        models: ["waf-radar", "waf-shield", "waf-events"],
      },
      {
        id: "waf-alerts",
        text: "AI 판정에 맞춰 경보를 보여주고, 자세한 근거를 같은 화면에서 살펴보게 했어요.",
        lines: [
          "AI 판정에 맞춰 경보를 보여주고,",
          "자세한 근거를 같은 화면에서",
          "살펴보게 했어요.",
        ],
        models: ["waf-radar", "waf-shield", "waf-events"],
      },
      {
        id: "waf-ending",
        text: "그렇게 동료들과 AI WAF 관제 시스템을 만들고 다듬었어요.",
        lines: ["그렇게 동료들과", "AI WAF 관제 시스템을", "만들고 다듬었어요."],
        note: "실제 사내 화면 대신, 로그와 AI 판정이 연결되는 흐름을 3D로 표현했어요.",
        models: ["waf-radar", "waf-shield", "waf-events"],
        link: {
          label: "AI WAF 관제 이야기 자세히 보기",
          href: "/work/pfct#ai-waf-monitoring",
        },
      },
      {
        id: "ax-sharing",
        text: "만드는 데서 끝내지 않고, AI를 어디에 쓰고 무엇을 확인할지도 발표로 공유했어요.",
        lines: [
          "만드는 데서 끝내지 않고,",
          "AI를 어디에 쓰고 무엇을 확인할지도",
          "발표로 공유했어요.",
        ],
        models: ["lily", "mcp-server", "tool-plug", "meeting", "presentation"],
      },
      {
        id: "ax-ending",
        text: "지금도 동료들과 직접 써보면서, 실제 업무에서 막히는 부분을 고치고 있어요.",
        lines: ["지금도 동료들과 직접 써보면서,", "실제 업무에서 막히는 부분을", "고치고 있어요."],
        note: "실제 사내 화면 대신, AI와 도구를 연결하는 모습을 3D로 표현했어요.",
        models: ["lily", "mcp-server", "tool-plug", "meeting", "presentation"],
        link: { label: "AX 이야기 자세히 보기", href: "/work/pfct#ax-workflow" },
      },
    ],
  },
  {
    id: "ara",
    label: "ara",
    sentences: [
      {
        id: "ara-opening",
        text: "마지막은, 친구와 우리가 직접 쓰려고 만드는 에이전트 이야기예요.",
        lines: ["마지막은, 친구와", "우리가 직접 쓰려고 만드는", "에이전트 이야기예요."],
        models: ["document", "calendar"],
      },
      {
        id: "agents-we-used",
        text: "Hermes Agent와 Claude Code, Codex를 쓰면서 아쉬운 점을 자주 이야기했어요.",
        lines: ["Hermes Agent와 Claude Code,", "Codex를 쓰면서 아쉬운 점을", "자주 이야기했어요."],
        models: ["document", "calendar"],
      },
      {
        id: "ara-problem",
        text: "대화와 문서, 도구가 따로 있으면 하던 일을 이어가기 어려웠어요.",
        lines: ["대화와 문서, 도구가 따로 있으면", "하던 일을 이어가기 어려웠어요."],
        models: ["document", "calendar", "tool-plug"],
      },
      {
        id: "ara-decision",
        text: "그러다, 우리가 원하는 에이전트를 직접 만들어보자고 했어요.",
        lines: ["그러다, 우리가 원하는 에이전트를", "직접 만들어보자고 했어요."],
        models: ["agent", "document", "calendar", "tool-plug"],
      },
      {
        id: "ara-chat-screen",
        text: "대화 옆에 문서를 열고, 필요한 도구를 연결해서 작업해요.",
        lines: ["대화 옆에 문서를 열고,", "필요한 도구를 연결해서 작업해요."],
        models: ["agent", "document", "calendar", "tool-plug", "canvas"],
        screen: { project: "ara", id: "chat" },
      },
      {
        id: "ara-documents-screen",
        text: "만든 문서와 앱은 같은 문서함에 남기고, 필요할 때 다시 찾아 써요.",
        lines: ["만든 문서와 앱은 같은 문서함에 남기고,", "필요할 때 다시 찾아 써요."],
        models: ["agent", "document", "calendar", "tool-plug", "canvas"],
        screen: { project: "ara", id: "documents" },
      },
      {
        id: "ara-canvas-screen",
        text: "AI가 만든 결과도 사람이 직접 고칠 수 있도록 캔버스를 만들었어요.",
        lines: ["AI가 만든 결과도", "사람이 직접 고칠 수 있도록", "캔버스를 만들었어요."],
        models: ["agent", "document", "calendar", "tool-plug", "canvas"],
        screen: { project: "ara", id: "canvas" },
      },
      {
        id: "ara-motion-screen",
        text: "발표 자료에 움직임과 소리를 넣고, 영상으로 내보내며 직접 써봤어요.",
        lines: ["발표 자료에 움직임과 소리를 넣고,", "영상으로 내보내며 직접 써봤어요."],
        models: ["agent", "document", "calendar", "tool-plug", "canvas"],
        screen: { project: "ara", id: "canvas-timeline" },
      },
      {
        id: "ara-ending",
        text: "이렇게 두 사람이 아이디어를 내고, 만들고, 테스트하며 ara를 다듬고 있어요.",
        lines: ["이렇게 두 사람이 아이디어를 내고,", "만들고, 테스트하며", "ara를 다듬고 있어요."],
        note: "아직 두 사람이 직접 사용하는 실험 단계예요.",
        models: ["agent", "document", "calendar", "tool-plug", "canvas"],
        link: { label: "ara 이야기 자세히 보기", href: "/work/ara" },
      },
    ],
  },
];
