import { portfolio } from "@jeamxn/core";
import { WorkArchivePage } from "~/feature/work/work-archive-page";
import { pageMeta } from "~/shared/lib/meta";

export function meta() {
  return pageMeta(
    "작업 기록",
    "제품과 실험, 학습과 기여까지 최재민의 공개 작업 기록을 모았어요.",
    "/work",
  );
}
export default function WorkArchive() {
  return <WorkArchivePage data={portfolio} />;
}
