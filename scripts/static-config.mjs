/** Public build configuration only. Never put service credentials in this build. */
export function basePath(value = process.env.JEAMXN_BASE_PATH ?? "/") {
  if (!value || value === "/") return "/";
  if (!/^\/(?:[A-Za-z0-9._~-]+\/)*[A-Za-z0-9._~-]*\/?$/.test(value) || value.includes(".."))
    throw new Error("JEAMXN_BASE_PATH must be an absolute URL path such as / or /jeamxn/");
  return `${value.replace(/\/+$/, "")}/`;
}
export function siteUrl(value = process.env.JEAMXN_SITE_URL ?? "https://jeamxn.dev") {
  const url = new URL(value);
  if (
    !["https:", "http:"].includes(url.protocol) ||
    url.username ||
    url.password ||
    url.search ||
    url.hash
  )
    throw new Error(
      "JEAMXN_SITE_URL must be a public http(s) site URL without credentials/query/hash",
    );
  return url.href.replace(/\/$/, "");
}
