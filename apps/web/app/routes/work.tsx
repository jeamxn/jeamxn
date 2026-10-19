import { portfolio } from "@jeamxn/core";
import { Link, useParams } from "react-router";
import { WorkPage } from "~/feature/work/work-page";
import { pageMeta } from "~/shared/lib/meta";
import type { Route } from "./+types/work";
export function meta({ params }: Route.MetaArgs) {
  const project = portfolio.projects.find((p) => p.slug === params.slug);
  return pageMeta(
    project?.name ?? "프로젝트를 찾지 못했어요",
    project?.summary ?? "프로젝트 목록에서 다른 이야기를 살펴보세요.",
    project ? `/work/${project.slug}` : "/work",
  );
}
export default function Work() {
  const { slug } = useParams();
  const index = portfolio.projects.findIndex((p) => p.slug === slug);
  const project = portfolio.projects[index];
  return project ? (
    <WorkPage
      project={project}
      next={portfolio.projects[(index + 1) % portfolio.projects.length]}
    />
  ) : (
    <div className="container missing-page">
      <h1>이 프로젝트는 찾지 못했어요.</h1>
      <p>주소를 확인하거나, 작업 기록에서 다시 살펴보세요.</p>
      <Link className="button button--solid" to="/work">
        모든 작업 기록 보기
      </Link>
    </div>
  );
}
