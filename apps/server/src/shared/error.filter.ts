import { type ArgumentsHost, Catch, type ExceptionFilter, HttpException } from "@nestjs/common";
import type { Response } from "express";

@Catch()
export class SafeErrorFilter implements ExceptionFilter {
  catch(error: unknown, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const parserStatus = (error as { type?: unknown; status?: unknown } | null)?.type;
    const status =
      error instanceof HttpException
        ? error.getStatus()
        : parserStatus === "entity.too.large"
          ? 413
          : parserStatus === "entity.parse.failed"
            ? 400
            : 500;
    const messages: Record<number, string> = {
      400: "요청 내용을 확인해 주세요.",
      403: "허용된 사이트에서만 요청할 수 있습니다.",
      404: "요청한 페이지를 찾을 수 없습니다.",
      413: "입력 내용이 너무 깁니다.",
      415: "JSON 형식으로 요청해 주세요.",
      429: "잠시 후 다시 질문해 주세요.",
      503: "안내 서비스를 잠시 사용할 수 없습니다.",
    };
    response.status(status).json({
      message: messages[status] ?? "요청을 처리하지 못했습니다. 잠시 후 다시 시도해 주세요.",
    });
  }
}
