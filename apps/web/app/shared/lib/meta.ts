import { portfolio } from "@jeamxn/core";

// JEAMXN_SITE_URL is the full deployed site URL, including a Pages project
// path when present. Do not run sitePath here: that would apply basename twice.
export function siteUrl(path: string): string {
  const site = (import.meta.env?.VITE_SITE_URL ?? "https://jeamxn.dev").replace(/\/+$/, "");
  return new URL(path.replace(/^\/+/, ""), `${site}/`).href;
}

export function pageMeta(title: string, description: string, path = "/") {
  const canonical = siteUrl(`${path.replace(/\/+$/, "")}/`);
  return [
    { title: `${title} | 최재민` },
    { name: "description", content: description },
    { property: "og:title", content: `${title} | 최재민` },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: canonical },
    { property: "og:image", content: siteUrl("/images/portrait.webp") },
    { tagName: "link", rel: "canonical", href: canonical },
    { name: "twitter:card", content: "summary_large_image" },
  ];
}
export function safeHref(href: string) {
  if (
    [...href].some(
      (character) =>
        character === "\\" || character.charCodeAt(0) < 32 || character.charCodeAt(0) === 127,
    )
  )
    return "#";
  if (href === `mailto:${portfolio.profile.email}`) return href;
  if (href.startsWith("/") && !href.startsWith("//")) return href;
  try {
    const parsed = new URL(href);
    return parsed.protocol === "https:" && !parsed.username && !parsed.password ? href : "#";
  } catch {
    return "#";
  }
}
