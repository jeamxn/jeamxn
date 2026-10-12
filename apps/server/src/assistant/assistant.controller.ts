import { chatRequestSchema, chatResponseSchema } from "@jeamxn/contract";
import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpException,
  Inject,
  Post,
  Req,
  Res,
  UnsupportedMediaTypeException,
} from "@nestjs/common";
import type { Request, Response } from "express";
import { CONFIG, type ServerConfig } from "#shared/config";
import { AssistantLimiter } from "./assistant.limiter.js";
import { AssistantService } from "./assistant.service.js";
@Controller("assistant")
export class AssistantController {
  constructor(
    @Inject(AssistantService) private readonly service: AssistantService,
    @Inject(AssistantLimiter) private readonly limiter: AssistantLimiter,
    @Inject(CONFIG) private readonly config: ServerConfig,
  ) {}
  @Get("status") status() {
    return this.service.status();
  }
  @Post("chat") async chat(
    @Body() body: unknown,
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    response.setHeader("Cache-Control", "no-store");
    if (
      !request.headers.origin ||
      !this.config.origins.includes(request.headers.origin) ||
      request.headers["sec-fetch-site"] === "cross-site"
    )
      throw new ForbiddenException();
    if (!request.is("application/json")) throw new UnsupportedMediaTypeException();
    const parsed = chatRequestSchema.safeParse(body);
    if (
      !parsed.success ||
      parsed.data.messages.at(-1)?.role !== "user" ||
      parsed.data.messages.some((message) => !message.content.trim()) ||
      parsed.data.messages.reduce((total, message) => total + message.content.length, 0) > 6000
    )
      throw new BadRequestException();
    const lease = await this.limiter.reserve(request.socket.remoteAddress ?? "unknown");
    if (!lease.allowed) {
      response.setHeader("Retry-After", String(lease.retryAfter));
      throw new HttpException("Unavailable", lease.unavailable ? 503 : 429);
    }
    try {
      return chatResponseSchema.parse(await this.service.chat(parsed.data));
    } finally {
      await lease.release();
    }
  }
}
