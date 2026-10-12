import { Module } from "@nestjs/common";
import { PortfolioModule } from "#portfolio/portfolio.public";
import { ResumeController } from "./resume.controller.js";
import { ResumeService } from "./resume.service.js";
@Module({ imports: [PortfolioModule], controllers: [ResumeController], providers: [ResumeService] })
export class ResumeModule {}
