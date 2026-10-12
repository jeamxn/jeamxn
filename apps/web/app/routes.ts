import { index, type RouteConfig, route } from "@react-router/dev/routes";
export default [
  index("routes/home.tsx"),
  route("about", "routes/about.tsx"),
  route("work", "routes/work-archive.tsx"),
  route("work/:slug", "routes/work.tsx"),
  route("activity/:slug", "routes/activity.tsx"),
  route("resume", "routes/resume.tsx"),
] satisfies RouteConfig;
