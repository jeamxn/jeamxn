import type { Project } from "@jeamxn/contract";

const resumeProjectSlugs = new Set(["ara", "dipull", "pfct"]);

/** Use the first observed year, not '현재' or the period's final year. */
export function projectStartYear(project: Pick<Project, "period">): number {
  const match = project.period.match(/(?:19|20)\d{2}/u);
  return match ? Number(match[0]) : Number.NEGATIVE_INFINITY;
}

/** Resume selection is independent of homepage representatives and the archive. */
export function resumeProjects(projects: readonly Project[]): Project[] {
  return projects
    .filter((project) => resumeProjectSlugs.has(project.slug))
    .sort((a, b) => projectStartYear(b) - projectStartYear(a) || a.slug.localeCompare(b.slug));
}
