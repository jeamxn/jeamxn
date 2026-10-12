import type { Project } from "@jeamxn/contract";
import { projectScreens } from "./screens.js";

/** Individual original app viewports use byte-versioned URLs to avoid stale captures. */
export function enrichMedia(project: Project): Project {
  const screens = projectScreens[project.slug];
  // A desktop cover keeps the home editorial frame readable; the gallery may
  // begin with a mobile home screen without making the cover several screens tall.
  const cover = screens?.find((screen) => screen.device === "desktop") ?? screens?.[0];
  if (!cover) return project;
  return {
    ...project,
    image: cover.src,
    cover: { width: cover.width, height: cover.height, alt: cover.alt, caption: cover.caption },
    screens,
  };
}
