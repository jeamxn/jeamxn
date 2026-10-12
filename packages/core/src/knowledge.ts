import { portfolio } from "./portfolio.js";

/** Only the deliberately public portfolio content enters the assistant. */
export const createPublicKnowledge = (): string => JSON.stringify(portfolio);
