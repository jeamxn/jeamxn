import type { Project } from "@jeamxn/contract";
import { useState } from "react";

export function ProjectScene({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <figure className={`project-scene project-scene--${project.slug}`}>
      {project.image && !failed ? (
        <img
          src={project.image}
          alt={`${project.name}의 가상 데이터 제품 예시 화면`}
          width={project.slug === "ara" ? 1920 : 1440}
          height={project.slug === "ara" ? 1200 : 1000}
          loading={priority ? "eager" : "lazy"}
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="scene-fallback" aria-hidden="true">
          <span className="scene-wordmark">{project.name}</span>
          <span className="scene-line" />
          <span className="scene-fallback-caption">
            {project.slug === "ara"
              ? "대화에서 작업으로, 하나의 공간에서."
              : "학교의 하루를 조금 더 편하게."}
          </span>
        </div>
      )}
      <figcaption>가상 데이터로 재구성한 화면</figcaption>
    </figure>
  );
}
