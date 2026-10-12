import { ApiError, createApi } from "@jeamxn/api";
import type { ChatRequest } from "@jeamxn/contract";

const client = createApi({ baseUrl: "/api" });
export const api = {
  status: (signal?: AbortSignal) => client.assistantStatus({ signal }),
  chat: async (body: ChatRequest, signal?: AbortSignal) => {
    try {
      return await client.chat(body, { signal });
    } catch (cause) {
      if (cause instanceof ApiError && cause.status === 429)
        throw new Error("질문이 잠시 몰렸습니다. 잠시 뒤 다시 보내주세요.");
      throw new Error(
        "답변을 가져오지 못했습니다. 잠시 뒤 다시 보내거나 프로젝트 이야기를 살펴보세요.",
      );
    }
  },
};
