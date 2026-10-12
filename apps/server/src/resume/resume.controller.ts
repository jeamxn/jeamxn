import { Controller, Get, Inject, Res, StreamableFile } from "@nestjs/common";
import type { Response } from "express";
import { ResumeService } from "./resume.service.js";
@Controller("resume.pdf")
export class ResumeController {
  constructor(@Inject(ResumeService) private readonly resume: ResumeService) {}
  @Get() async get(@Res({ passthrough: true }) response: Response) {
    response.setHeader("Cache-Control", "public, max-age=3600");
    const bytes = await this.resume.get();
    return new StreamableFile(Buffer.from(bytes), {
      type: "application/pdf",
      disposition: `attachment; filename="Jeamin-Choi-Resume.pdf"; filename*=UTF-8''${encodeURIComponent("최재민-이력서.pdf")}`,
      length: bytes.length,
    });
  }
}
