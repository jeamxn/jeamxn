import type { Project } from "@jeamxn/contract";

/** Covers are single original app viewports; never collages or invented product chrome. */
export function enrichMedia(project: Project): Project {
  if (project.slug === "ara") {
    return {
      ...project,
      image: "/images/ara-preview.webp",
      cover: {
        width: 1440,
        height: 900,
        alt: "ara 원본 앱의 대화와 문서함 화면. 대화와 파일은 가상 데이터입니다.",
        caption: "원본 앱을 가상 데이터로 실행한 화면 · 대화와 문서함",
      },
    };
  }
  if (project.slug === "dipull") {
    return {
      ...project,
      image: "/images/dipull-preview.webp",
      cover: {
        width: 1440,
        height: 900,
        alt: "Dipull 원본 앱의 세탁기와 시간대별 예약 화면. 학생과 신청 내역은 가상 데이터입니다.",
        caption: "원본 앱을 가상 데이터로 실행한 화면 · 세탁 예약",
      },
    };
  }
  return project;
}
