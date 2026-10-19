import type { Project } from "@jeamxn/contract";

type CopyBlock = { heading: string; paragraphs: string[] };
const sentences = (text: string) => text.split(/(?<=[.!?])\s+/u).filter(Boolean);

/** A short reading order over the same reviewed public prose, not new claims. */
export function resumeProjectCopy(project: Project): CopyBlock[] {
  const paragraph = (id: string, index = 0) =>
    project.sections?.find((section) => section.id === id)?.paragraphs[index] ?? "";
  const select = (text: string, from: number, to?: number) =>
    sentences(text).slice(from, to).join(" ");
  const group = (heading: string, paragraphs: string[]): CopyBlock => ({
    heading,
    paragraphs: paragraphs.filter(Boolean),
  });
  if (project.slug === "ara")
    return [
      group("[ 문제 정의 ]", [select(project.overview[0], 0, 1)]),
      group("[ 해결 과정 ]", [project.highlights[0]?.body ?? project.summary]),
      group("[ 개선된 점 ]", [project.highlights[1]?.body ?? ""]),
    ];
  if (project.slug === "pfct")
    return [
      group("[ 문제 정의 ]", [
        `${select(paragraph("dpd-workspace"), 0, 1)} ${select(paragraph("human-agent-collaboration"), 0, 1)}`,
      ]),
      group("[ 해결 과정 ]", [project.highlights[0]?.body ?? project.summary]),
      group("[ 개선된 점 ]", [project.highlights[1]?.body ?? ""]),
    ];
  if (project.slug === "dipull")
    return [
      group("[ 문제 정의 ]", [select(project.overview[0], 1)]),
      group("[ 해결 과정 ]", [project.highlights[0]?.body ?? project.summary]),
      group("[ 개선된 점 ]", [project.highlights[1]?.body ?? ""]),
    ];
  return [group("[ 작업 내용 ]", [project.summary])];
}
