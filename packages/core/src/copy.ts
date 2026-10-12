/** Apply the owner's public-copy punctuation convention to generated screen metadata too. */
export function normalizePublicCopy<T>(value: T): T {
  if (typeof value === "string")
    return value.replace(/[‘’]/gu, "'").replace(/[ \t]*·[ \t]*/gu, " / ") as T;
  if (Array.isArray(value)) return value.map(normalizePublicCopy) as T;
  if (value !== null && typeof value === "object")
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, normalizePublicCopy(item)]),
    ) as T;
  return value;
}
