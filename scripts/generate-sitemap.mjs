import fs from "node:fs/promises";
import path from "node:path";
import { portfolio } from "../packages/core/dist/index.js";

const routes = [
  "/",
  "/about",
  "/work",
  "/resume",
  ...portfolio.projects.map((project) => `/work/${project.slug}`),
  ...portfolio.activities.flatMap((activity) =>
    activity.slug ? [`/activity/${activity.slug}`] : [],
  ),
];
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map((route) => `  <url><loc>https://jeamxn.dev${route}</loc></url>`).join("\n")}\n</urlset>\n`;
await fs.writeFile(path.resolve(import.meta.dirname, "../apps/web/public/sitemap.xml"), xml);
const built = path.resolve(import.meta.dirname, "../apps/web/build/client/sitemap.xml");
try {
  await fs.writeFile(built, xml);
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}
console.log(`Sitemap: ${routes.length} public routes`);
