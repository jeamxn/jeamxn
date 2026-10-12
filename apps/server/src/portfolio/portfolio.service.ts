import { portfolioSchema } from "@jeamxn/contract";
import { portfolio } from "@jeamxn/core";
import { Injectable } from "@nestjs/common";
@Injectable()
export class PortfolioService {
  get() {
    return portfolioSchema.parse(portfolio);
  }
}
