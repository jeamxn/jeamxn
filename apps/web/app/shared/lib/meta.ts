import { portfolio } from "@jeamxn/core";

export function pageMeta(title: string, description: string) {
  return [
    { title: `${title} | 최재민` },
    { name: "description", content: description },
    { property: "og:title", content: `${title} | 최재민` },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:image", content: "https://jeamxn.dev/images/portrait.webp" },
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
