import type { Project } from "@jeamxn/contract";
import { useState } from "react";
import { sitePath } from "~/shared/lib/site-path";

export function ProjectScene({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <figure
      className={`project-scene project-scene--${project.slug}${project.cover ? " project-scene--natural" : ""}`}
    >
      {project.image && !failed ? (
        <img
          src={sitePath(project.image)}
          alt={project.cover?.alt ?? `${project.name}의 가상 데이터 제품 예시 화면`}
          width={project.cover?.width ?? (project.slug === "ara" ? 1920 : 1440)}
          height={project.cover?.height ?? (project.slug === "ara" ? 1200 : 1000)}
          loading={priority ? "eager" : "lazy"}
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="scene-fallback" aria-hidden="true">
          <span className="scene-wordmark">{project.name}</span>
          <span className="scene-line" />
          <span className="scene-fallback-caption">
            {project.slug === "ara"
              ? "AI와 대화하고 결과물을 편집하는 작업공간"
              : "기상송 신청과 세탁 예약을 모은 교내 서비스"}
          </span>
        </div>
      )}
      <figcaption>{project.cover?.caption ?? "가상 데이터로 재구성한 화면"}</figcaption>
    </figure>
  );
}
