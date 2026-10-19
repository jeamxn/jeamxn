import { portfolio } from "@jeamxn/core";
import { ResumePage } from "~/feature/resume/resume-page";
import { pageMeta } from "~/shared/lib/meta";
export function meta() {
  return pageMeta("이력", "최재민의 경력과 주요 작업, 교육과 활동을 한곳에 모았어요.", "/resume");
}
export default function Resume() {
  return <ResumePage data={portfolio} />;
}
