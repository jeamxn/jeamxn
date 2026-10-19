import { useEffect, useRef } from "react";
import { Link } from "react-router";

/** Facts come from HOME_STORY and the PFCT/ara/Dipull sections: what was
 * inconvenient, and what was made because of it. Chronological, so an ol. */
export const TROUBLES = [
  {
    where: "학교",
    trouble: "학교 공식 인트라넷이 DB 랜섬웨어 공격으로 멈췄어요.",
    made: "Dipull",
    how: "반에서 쓰던 서비스에 기상송 신청과 세탁 예약을 붙여 학교 인트라넷으로 넓혔어요.",
    href: "/work/dipull",
  },
  {
    where: "PFCT Internal",
    trouble: "업무마다 따로 들어가야 하는 어드민이 여러 개 있었어요.",
    made: "통합 어드민",
    how: "동료들과 계정과 메뉴, 권한 신청과 승인을 같은 기반으로 모았어요.",
    href: "/work/pfct#admin-foundation",
  },
  {
    where: "PFCT Internal",
    trouble: "채권관리 현황을 볼 때도 엑셀과 여러 화면을 오가야 했어요.",
    made: "DPD 대시보드",
    how: "대상을 찾고 확인한 뒤, 담당자를 한 번에 바꿀 수 있게 했어요.",
    href: "/work/pfct#dpd-workspace",
  },
  {
    where: "PFCT AX",
    trouble: "AI와 대화해도 회의나 문서, 사내 도구의 실제 작업으로는 이어지지 않았어요.",
    made: "Lily",
    how: "회의 전사와 요약, 문서 협업을 만들고 개발 · 업무 도구를 MCP로 연결했어요.",
    href: "/work/pfct#ax-workflow",
  },
  {
    where: "PFCT AX",
    trouble: "방화벽 기록만으로는 의심스러운 요청을 판단하기 부족했어요.",
    made: "AI WAF 관제",
    how: "앱 로그와 서비스 상태를 연결하고, AI가 읽기 도구로 근거를 확인하게 했어요.",
    href: "/work/pfct#ai-waf-monitoring",
  },
  {
    where: "친구와",
    trouble: "대화와 문서, 도구가 따로 있어서 하던 일을 이어가기 어려웠어요.",
    made: "ara",
    how: "대화 옆에서 문서와 앱랫, 캐버스를 열어 다음 작업으로 이어가요.",
    href: "/work/ara",
  },
] as const;

/** Scroll draws a ballpoint line through every line of each inconvenience; the thing that was made
 * then appears beside it. Pure function of position, so reverse scroll undoes it.
 * Without JS or with reduced motion every row is shown complete. */
export function TroubleLedger() {
  const list = useRef<HTMLOListElement>(null);
  useEffect(() => {
    const root = list.current;
    if (!root) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const rows = [...root.querySelectorAll<HTMLElement>("[data-trouble]")];
    let pending = 0;
    const paint = () => {
      pending = 0;
      const height = window.innerHeight;
      for (const row of rows) {
        const top = row.getBoundingClientRect().top;
        // 0 when the row enters the lower third, 1 by the time it reaches 45% height.
        const value = Math.min(1, Math.max(0, (height * 0.8 - top) / (height * 0.35)));
        row.style.setProperty("--strike", value.toFixed(4));
      }
    };
    const schedule = () => {
      if (!pending) pending = window.requestAnimationFrame(paint);
    };
    const sync = () => {
      if (media.matches) {
        root.removeAttribute("data-live");
        for (const row of rows) row.style.removeProperty("--strike");
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", schedule);
        return;
      }
      root.dataset.live = "true";
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule, { passive: true });
      paint();
    };
    sync();
    media.addEventListener("change", sync);
    return () => {
      if (pending) window.cancelAnimationFrame(pending);
      media.removeEventListener("change", sync);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);
  return (
    <ol className="hv-ledger-list" ref={list}>
      {TROUBLES.map((item) => (
        <li key={item.href} data-trouble>
          <Link to={item.href} className="hv-ledger-row">
            <span className="hv-ledger-where">{item.where}</span>
            <span className="hv-ledger-trouble">
              <span className="hv-ledger-text">{item.trouble}</span>
            </span>
            <span className="hv-ledger-made">
              <strong translate="no">{item.made}</strong>
              <span>{item.how}</span>
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
