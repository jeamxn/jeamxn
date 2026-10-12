import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import type { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "#app.module";
import { readConfig, type ServerConfig } from "#shared/config";
import { SafeErrorFilter } from "#shared/error.filter";
export async function createApp(config: ServerConfig = readConfig()) {
  const app = await NestFactory.create<NestExpressApplication>(AppModule.register(config), {
    bodyParser: false,
    logger: false,
    abortOnError: false,
  });
  const express = app.getHttpAdapter().getInstance();
  express.disable("x-powered-by");
  // Never infer a peer identity from user-controlled Forwarded/X-Forwarded-* headers.
  express.set("trust proxy", false);
  app.useBodyParser("json", { limit: "16kb", strict: true, type: "application/json" });
  app.useGlobalFilters(new SafeErrorFilter());
  const server = app.getHttpServer();
  server.requestTimeout = 15000;
  server.headersTimeout = 10000;
  server.keepAliveTimeout = 5000;
  app.setGlobalPrefix("api");
  try {
    await app.init();
    return app;
  } catch (error) {
    await app.close();
    throw error;
  }
}
