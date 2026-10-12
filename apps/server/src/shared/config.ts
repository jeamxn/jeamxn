export const CONFIG = Symbol("JEAMXN_CONFIG");
export type ServerConfig = {
  port: number;
  origins: string[];
  ai: { enabled: boolean; key: string; model: string; baseUrl: string; timeoutMs: number };
  limiter: {
    url: string;
    required: boolean;
    peerLimit: number;
    globalLimit: number;
    concurrency: number;
    dailyLimit: number;
  };
  fontPath?: string;
};
const boundedNumber = (value: string | undefined, fallback: number, min: number, max: number) => {
  const number = Number(value ?? fallback);
  if (!Number.isInteger(number) || number < min || number > max)
    throw new Error("Invalid server configuration");
  return number;
};
export function readConfig(env: NodeJS.ProcessEnv = process.env): ServerConfig {
  const production = env.NODE_ENV === "production";
  const origins = (
    env.JEAMXN_PUBLIC_ORIGIN ?? (production ? "" : "http://localhost:5410,http://127.0.0.1:5410")
  )
    .split(",")
    .filter(Boolean)
    .map((value) => {
      const url = new URL(value.trim());
      if (
        !["http:", "https:"].includes(url.protocol) ||
        url.username ||
        url.password ||
        url.pathname !== "/" ||
        url.search ||
        url.hash
      )
        throw new Error("Invalid public origin");
      return url.origin;
    });
  const base = new URL(env.AI_BASE_URL ?? "https://api.openai.com/v1");
  if (
    (base.protocol !== "https:" &&
      !(
        !production &&
        base.protocol === "http:" &&
        ["localhost", "127.0.0.1", "[::1]"].includes(base.hostname)
      )) ||
    base.username ||
    base.password ||
    base.search ||
    base.hash
  )
    throw new Error("Invalid AI endpoint");
  return {
    port: boundedNumber(env.PORT, 5411, 1, 65535),
    origins,
    ai: {
      enabled: env.AI_ENABLED === "true",
      key: env.AI_API_KEY?.trim() ?? "",
      model: env.AI_MODEL ?? "gpt-4.1-mini",
      baseUrl: base.href.replace(/\/$/, ""),
      timeoutMs: boundedNumber(env.AI_TIMEOUT_MS, 12000, 50, 30000),
    },
    limiter: {
      url: env.VALKEY_URL ?? "",
      required:
        env.AI_REQUIRE_VALKEY === "true" ||
        (env.AI_REQUIRE_VALKEY !== "false" &&
          production &&
          env.AI_ENABLED === "true" &&
          Boolean(env.AI_API_KEY?.trim())),
      peerLimit: boundedNumber(env.AI_PEER_LIMIT, 12, 1, 60),
      globalLimit: boundedNumber(env.AI_GLOBAL_LIMIT, 100, 1, 1000),
      concurrency: boundedNumber(env.AI_CONCURRENCY, 2, 1, 4),
      dailyLimit: boundedNumber(env.AI_GLOBAL_DAILY_LIMIT ?? env.AI_DAILY_LIMIT, 300, 1, 10000),
    },
    ...(env.RESUME_FONT_PATH ? { fontPath: env.RESUME_FONT_PATH } : {}),
  };
}
