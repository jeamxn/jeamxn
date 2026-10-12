import {
  assistantStatusSchema,
  type ChatRequest,
  chatRequestSchema,
  chatResponseSchema,
  portfolioSchema,
} from "@jeamxn/contract";
export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly retryAfter: number | null = null,
  ) {
    super(message);
    this.name = "ApiError";
  }
}
export type RequestOptions = { signal?: AbortSignal };
export type ApiOptions = { baseUrl?: string; fetch?: typeof globalThis.fetch };
export function createApi(options: ApiOptions = {}) {
  const base = (options.baseUrl ?? "/api").replace(/\/$/, "");
  const transport = options.fetch ?? globalThis.fetch.bind(globalThis);
  const request = async (path: string, init: RequestInit = {}) => {
    const response = await transport(`${base}${path}`, { ...init, credentials: "same-origin" });
    if (!response.ok) {
      const retry = Number(response.headers.get("retry-after"));
      throw new ApiError(
        response.status,
        response.status === 429 ? "잠시 후 다시 질문해 주세요." : "요청을 처리하지 못했습니다.",
        Number.isFinite(retry) && retry > 0 ? retry : null,
      );
    }
    return response;
  };
  return {
    portfolio: async ({ signal }: RequestOptions = {}) =>
      portfolioSchema.parse(await (await request("/portfolio", { signal })).json()),
    assistantStatus: async ({ signal }: RequestOptions = {}) =>
      assistantStatusSchema.parse(await (await request("/assistant/status", { signal })).json()),
    chat: async (input: ChatRequest, { signal }: RequestOptions = {}) => {
      const payload = chatRequestSchema.parse(input);
      return chatResponseSchema.parse(
        await (
          await request("/assistant/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
            signal,
          })
        ).json(),
      );
    },
    resumeUrl: () => `${base}/resume.pdf`,
    resume: async ({ signal }: RequestOptions = {}) =>
      (await request("/resume.pdf", { signal })).blob(),
  };
}
export type Api = ReturnType<typeof createApi>;
