import { portfolio } from "@jeamxn/core";
import type { Config } from "@react-router/dev/config";

export default {
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
