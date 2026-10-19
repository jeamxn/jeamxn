import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import type { Portfolio } from "@jeamxn/contract";
import { portfolio, resumeProjects } from "@jeamxn/core";
import { PDFDocument } from "pdf-lib";
import { embedResumeFont } from "./resume-font.js";
import { ResumeLayout } from "./resume-layout.js";
import { resumeProjectCopy } from "./resume-project-copy.js";

export type ResumePdfOptions = { fontPath?: string };

/** Generate the reviewed public resume at build time, without HTTP or a backend. */
export async function generateResumePdf(
  data: Portfolio = portfolio,
  options: ResumePdfOptions = {},
): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const fontPath =
    options.fontPath ??
    fileURLToPath(new URL("../assets/fonts/Pretendard-Regular.ttf", import.meta.url));
  const regularFace = await embedResumeFont(doc, await readFile(fontPath));
  const boldFace = await embedResumeFont(
    doc,
    await readFile(fileURLToPath(new URL("../assets/fonts/Pretendard-Bold.ttf", import.meta.url))),
  );
  const font = regularFace.font;
  const bold = boldFace.font;
  doc.setTitle(`${data.profile.name} | 제품을 만드는 사람`);
  doc.setAuthor(data.profile.name);
  doc.setSubject("공개 포트폴리오 이력서");
  doc.setLanguage("ko-KR");
  const layout = new ResumeLayout(doc, font, bold);
  const portrait = await doc.embedPng(
    await readFile(fileURLToPath(new URL("../assets/fonts/resume-portrait.png", import.meta.url))),
  );
  layout.header(data.profile, portrait);
  layout.section("업무 경험");
  for (const item of data.experience)
    layout.entry({
      title: item.company,
      period: item.period,
      meta: [`${item.role} / ${item.team}`],
      paragraphs: [item.description],
    });

  // The web resume and PDF use the same immutable, start-year-sorted selection.
  // Keep the public role/status and compact highlights, not the whole case study.
  layout.section("주요 작업");
  for (const project of resumeProjects(data.projects))
    layout.entry({
      title: project.name,
      period: project.period,
      meta: [project.role, project.status],
      paragraphs: resumeProjectCopy(project),
      links: [
        {
          label: `상세 이야기 / jeamxn.dev/work/${project.slug}`,
          href: `https://jeamxn.dev/work/${project.slug}`,
        },
        ...(project.slug === "ara" ? project.links.slice(0, 1) : []),
      ],
    });
  layout.entry({
    title: "모든 작업 기록",
    links: [{ label: "jeamxn.dev/work", href: "https://jeamxn.dev/work" }],
  });

  layout.section("전문 분야");
  layout.skills([...new Set(resumeProjects(data.projects).flatMap((item) => item.tags))]);
  layout.section("학력");
  for (const item of data.education)
    layout.entry({
      title: item.school,
      period: item.period,
      meta: [`${item.major} / ${item.note}`],
    });
  layout.section("수상 및 활동");
  const activities = [
    ...data.activities.map((item) => ({
      title: item.title,
      period: item.period,
      meta: [item.organization],
      paragraphs: [item.description],
      links: item.slug
        ? [
            {
              label: "강연 이야기 / jeamxn.dev",
              href: `https://jeamxn.dev/activity/${item.slug}`,
            },
          ]
        : [],
    })),
    ...data.awards
      .filter((item) => item.kind !== "certification" || item.title.includes("창업유망팀"))
      .map((item) => ({
        title: item.title,
        period: item.year,
        meta: [item.organization],
        paragraphs: [],
        links: [],
      })),
  ].sort(
    (a, b) =>
      Number(b.period.match(/20\d{2}/u)?.[0] ?? 0) - Number(a.period.match(/20\d{2}/u)?.[0] ?? 0),
  );
  for (const item of activities) layout.entry(item);
  layout.section("수료 및 자격증");
  for (const item of data.awards.filter(
    (item) => item.kind === "certification" && !item.title.includes("창업유망팀"),
  ))
    layout.entry({ title: item.title, period: item.year, meta: [item.organization] });
  layout.section("URL");
  layout.entry({
    title: "포트폴리오 / GitHub",
    links: [
      { label: "https://jeamxn.dev", href: "https://jeamxn.dev" },
      { label: data.profile.github, href: data.profile.github },
      { label: "모든 작업 기록 / jeamxn.dev/work", href: "https://jeamxn.dev/work" },
    ],
  });
  await regularFace.finalize();
  await boldFace.finalize();
  return doc.save();
}
