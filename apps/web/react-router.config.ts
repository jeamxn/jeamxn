import { portfolio } from "@jeamxn/core";
import type { Config } from "@react-router/dev/config";

const basePath =
  `/${(process.env.JEAMXN_BASE_PATH ?? "/").split("/").filter(Boolean).join("/")}/`.replace(
    /^\/\/$/,
    "/",
  );

export default {
  basename: basePath,
  ssr: false,
  prerender: [
    "/",
    "/about",
    "/work",
    "/resume",
    ...portfolio.projects.map((project) => `/work/${project.slug}`),
    ...portfolio.activities.flatMap((activity) =>
      activity.slug ? [`/activity/${activity.slug}`] : [],
    ),
  ],
} satisfies Config;
