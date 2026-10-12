import { Controller, Get, Inject } from "@nestjs/common";
import { PortfolioService } from "./portfolio.service.js";
@Controller("portfolio")
export class PortfolioController {
  constructor(@Inject(PortfolioService) private readonly portfolio: PortfolioService) {}
  @Get() get() {
    return this.portfolio.get();
  }
}
