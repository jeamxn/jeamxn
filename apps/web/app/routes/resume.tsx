import { portfolio } from "@jeamxn/core";
import { ResumePage } from "~/feature/resume/resume-page";
import { pageMeta } from "~/shared/lib/meta";
export function meta() {
  return pageMeta("이력", "최재민의 경험, 프로젝트, 교육과 활동을 한곳에서 살펴볼 수 있습니다.");
}
export default function Resume() {
  return <ResumePage data={portfolio} />;
}
