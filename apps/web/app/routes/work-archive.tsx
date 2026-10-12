import { portfolio } from "@jeamxn/core";
import { WorkArchivePage } from "~/feature/work/work-archive-page";
import { pageMeta } from "~/shared/lib/meta";

export function meta() {
  return pageMeta(
    "작업 기록",
    "대표작부터 작은 실험과 학습까지, 최재민의 공개 작업 기록을 검색하고 살펴봅니다.",
  );
}
export default function WorkArchive() {
  return <WorkArchivePage data={portfolio} />;
}
