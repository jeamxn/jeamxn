import type { SVGProps } from "react";
import type { StoryTool } from "~/shared/lib/scroll-story";

const drawings: Record<StoryTool, { color: string; label: string; paths: string[] }> = {
  music: {
    color: "#b37827",
    label: "기상송",
    paths: ["M10 5v12.5a3.5 3.5 0 1 1-2-3.16V7l12-3v11.5a3.5 3.5 0 1 1-2-3.16V2z", "M10 7l8-2"],
  },
  laundry: {
    color: "#477da7",
    label: "세탁 예약",
    paths: [
      "M5 2h14a2 2 0 0 1 2 2v17a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a2 2 0 0 1 2-2Z",
      "M4 7h16M6 4.5h.1M9 4.5h.1",
      "M17.5 14a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0Z",
      "M7 14c3-3 6 3 10 0",
    ],
  },
  calendar: {
    color: "#b45a50",
    label: "일정",
    paths: [
      "M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z",
      "M7 2v5M17 2v5M3 10h18",
      "M7 14h3M14 14h3M7 18h3",
    ],
  },
  document: {
    color: "#5c73a4",
    label: "문서",
    paths: ["M6 2h9l5 5v15H4V4a2 2 0 0 1 2-2Z", "M14 2v6h6M8 12h8M8 16h8M8 20h5"],
  },
  chart: {
    color: "#4f8067",
    label: "업무 현황",
    paths: ["M3 3v18h19", "M7 16v-5h3v5zM13 16V7h3v9zM19 16V4h3v12z"],
  },
  data: {
    color: "#82709e",
    label: "데이터",
    paths: [
      "M21 6c0 2.2-4 4-9 4S3 8.2 3 6s4-4 9-4 9 1.8 9 4Z",
      "M3 6v6c0 2.2 4 4 9 4s9-1.8 9-4V6M3 12v6c0 2.2 4 4 9 4s9-1.8 9-4v-6",
    ],
  },
  chat: {
    color: "#68885a",
    label: "대화",
    paths: ["M21 11a8 8 0 0 1-8 8H5l-3 3 1-8a9 9 0 1 1 18-3Z", "M7 10h10M7 14h6"],
  },
  idea: {
    color: "#bd9241",
    label: "아이디어",
    paths: [
      "M9 17c0-3-4-3.5-4-8a7 7 0 1 1 14 0c0 4.5-4 5-4 8z",
      "M9 20h6M10 23h4M12 16v-5M9 9l3 3 3-3",
    ],
  },
};

function ToolGlyph({ tool, ...props }: SVGProps<SVGSVGElement> & { tool: StoryTool }) {
  const drawing = drawings[tool];
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={drawing.color}
      strokeWidth="1.35"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {drawing.paths.map((path, index) => (
        <path key={path} d={path} fill={index === 0 ? `${drawing.color}12` : "none"} />
      ))}
    </svg>
  );
}

const chapterTools: { tool: StoryTool; label: string; x: number; y: number }[][] = [
  [
    { tool: "idea", label: "아이디어", x: 90, y: 78 },
    { tool: "document", label: "만드는 일", x: 58, y: 85 },
  ],
  [
    { tool: "calendar", label: "학교 인트라넷", x: 73, y: 51 },
    { tool: "music", label: "기상송", x: 56, y: 20 },
    { tool: "laundry", label: "세탁 예약", x: 92, y: 66 },
    { tool: "document", label: "생활 신청", x: 55, y: 83 },
  ],
  [
    { tool: "chart", label: "흩어진 어드민", x: 56, y: 24 },
    { tool: "chart", label: "통합 어드민", x: 74, y: 48 },
    { tool: "chart", label: "업무 화면", x: 93, y: 24 },
    { tool: "data", label: "권한과 보안", x: 78, y: 80 },
    { tool: "document", label: "계정 · 승인", x: 53, y: 77 },
    { tool: "chart", label: "DPD", x: 93, y: 80 },
  ],
  [
    { tool: "chat", label: "Lily", x: 72, y: 49 },
    { tool: "data", label: "사내 도구", x: 56, y: 20 },
    { tool: "idea", label: "MCP 연결", x: 94, y: 48 },
    { tool: "document", label: "회의와 문서", x: 54, y: 80 },
    { tool: "chart", label: "AX 발표", x: 91, y: 81 },
  ],
  [
    { tool: "idea", label: "통합 에이전트", x: 73, y: 50 },
    { tool: "document", label: "문서", x: 53, y: 20 },
    { tool: "calendar", label: "일정", x: 94, y: 22 },
    { tool: "data", label: "도구", x: 53, y: 83 },
    { tool: "chart", label: "캔버스", x: 94, y: 82 },
  ],
];
export function StoryTools({ chapter = 0, waf = false }: { chapter?: number; waf?: boolean }) {
  const tools = waf
    ? [
        { tool: "data" as const, label: "WAF 로그", x: 73, y: 49 },
        { tool: "idea" as const, label: "AI 판정", x: 55, y: 23 },
        { tool: "chart" as const, label: "경보 근거", x: 93, y: 79 },
      ]
    : (chapterTools[chapter] ?? chapterTools[0]);
  return (
    <div className="story-constellation" aria-hidden="true" data-fallback-chapter={chapter}>
      {tools.map((item, index) => (
        <div
          className={`story-tool story-tool--${item.tool}`}
          data-story-tool={index}
          key={`${chapter}-${item.label}`}
          style={
            {
              "--tool-x": `${item.x}%`,
              "--tool-y": `${item.y}%`,
              "--fallback-index": index,
            } as import("react").CSSProperties
          }
        >
          <ToolGlyph tool={item.tool} />
          <span className="story-tool-label">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
