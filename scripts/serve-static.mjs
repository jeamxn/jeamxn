import { readFile, stat } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";
import { basePath } from "./static-config.mjs";

const args = process.argv.slice(2);
const option = (name, fallback) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : fallback;
};
const root = path.resolve(option("--dir", "apps/web/build/client"));
const mount = basePath(option("--base", process.env.JEAMXN_BASE_PATH ?? "/"));
const port = Number(option("--port", process.env.JEAMXN_HTTP_PORT ?? "5414"));
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".pdf": "application/pdf",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".vtt": "text/vtt; charset=utf-8",
  ".mp4": "video/mp4",
  ".data": "application/octet-stream",
};
const server = createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost");
  if (!["GET", "HEAD"].includes(req.method)) {
    res.writeHead(405, { Allow: "GET, HEAD" });
    return res.end();
  }
  const missing = async () => {
    res.statusCode = 404;
    res.setHeader("Content-Type", types[".html"]);
    res.setHeader("Cache-Control", "no-cache");
    try {
      const html = await readFile(path.join(root, "404.html"));
      res.end(req.method === "HEAD" ? undefined : html);
    } catch {
      res.end("Not found");
    }
  };
  try {
    let pathname = decodeURIComponent(url.pathname);
    if (mount !== "/" && pathname === mount.slice(0, -1)) {
      res.writeHead(301, { Location: mount + url.search });
      return res.end();
    }
    if (!pathname.startsWith(mount) || pathname.includes("\\") || pathname.includes("\0"))
      return missing();
    pathname = pathname.slice(mount.length);
    const file = path.resolve(root, pathname);
    if (file !== root && !file.startsWith(root + path.sep)) return missing();
    let selected = file,
      info = await stat(selected);
    if (info.isDirectory()) {
      if (!url.pathname.endsWith("/")) {
        res.writeHead(301, { Location: url.pathname + "/" + url.search });
        return res.end();
      }
      selected = path.join(file, "index.html");
      info = await stat(selected);
    }
    if (!info.isFile()) return missing();
    const ext = path.extname(selected).toLowerCase();
    res.setHeader("Content-Type", types[ext] ?? "application/octet-stream");
    res.setHeader("Content-Length", info.size);
    res.setHeader(
      "Cache-Control",
      /\.[a-f\d]{12}\./i.test(selected) ? "public,max-age=31536000,immutable" : "no-cache",
    );
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.end(req.method === "HEAD" ? undefined : await readFile(selected));
  } catch (error) {
    if (["ENOENT", "ENOTDIR", "URIError"].includes(error.code ?? error.name)) return missing();
    console.error(error);
    res.statusCode = 500;
    res.end("Internal error");
  }
});
server.listen(port, "127.0.0.1", () =>
  console.log(
    `Static preview http://127.0.0.1:${port}${mount} from ${root} (no API, no SPA fallback)`,
  ),
);
for (const signal of ["SIGINT", "SIGTERM"])
  process.on(signal, () => server.close(() => process.exit(0)));
