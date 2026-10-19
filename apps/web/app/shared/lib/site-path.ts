// Router Link/NavLink already apply basename. Use this only for raw same-site
// asset URLs and native anchors; hash/query-only and external URLs stay intact.
export function sitePath(path: string): string {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  const base = import.meta.env?.BASE_URL ?? "/";
  return `${base.replace(/\/$/, "")}${path}`;
}
