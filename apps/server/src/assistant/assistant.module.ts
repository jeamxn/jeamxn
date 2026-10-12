import { Module } from "@nestjs/common";
import { AssistantController } from "./assistant.controller.js";
import { AssistantLimiter } from "./assistant.limiter.js";
import { AssistantService } from "./assistant.service.js";
@Module({ controllers: [AssistantController], providers: [AssistantService, AssistantLimiter] })
export class AssistantModule {}
