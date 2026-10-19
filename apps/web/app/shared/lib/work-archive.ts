import type { Project } from "@jeamxn/contract";
import { resumeProjects } from "@jeamxn/core";

export const collections = {
  personal: "개인",
  school: "학교",
  company: "회사",
  collaboration: "협업",
  opensource: "오픈소스",
} as const;
export const recordTypes = {
  product: "제품",
  experiment: "실험",
  learning: "학습",
  contribution: "기여",
} as const;
export function projectCollection(project: Project) {
  return project.collection ?? (project.slug === "pfct" ? "company" : "personal");
}
export function projectRecordType(project: Project) {
  return project.recordType ?? (project.slug === "pfct" ? "contribution" : "product");
}
export function observedYear(project: Project) {
  const years = project.period.match(/(?:19|20)\d{2}/gu) ?? [];
  return years.length ? Math.max(...years.map(Number)) : 0;
}
export function archiveRecords(projects: Project[], params: URLSearchParams) {
  const query = (params.get("q") ?? "").normalize("NFKC").toLocaleLowerCase("ko").trim();
  const words = query.split(/\s+/u).filter(Boolean);
  const collection = params.get("collection");
  const type = params.get("type");
  const pinnedOrder = new Map(
    resumeProjects(projects).map((project, index) => [project.slug, index]),
  );
  return projects
    .filter((project) => {
      const haystack = [
        project.name,
        project.slug,
        project.subtitle,
        project.summary,
        project.role,
        project.period,
        project.status,
        ...project.tags,
      ]
        .join(" ")
        .normalize("NFKC")
        .toLocaleLowerCase("ko");
      return (
        words.every((word) => haystack.includes(word)) &&
        (!collection ||
          !(collection in collections) ||
          projectCollection(project) === collection) &&
        (!type || !(type in recordTypes) || projectRecordType(project) === type)
      );
    })
    .sort((a, b) => {
      const aPin = pinnedOrder.get(a.slug) ?? projects.length;
      const bPin = pinnedOrder.get(b.slug) ?? projects.length;
      if (aPin !== bPin) return aPin - bPin;
      return params.get("sort") === "name"
        ? a.name.localeCompare(b.name, "ko")
        : observedYear(b) - observedYear(a) || a.name.localeCompare(b.name, "ko");
    });
}
