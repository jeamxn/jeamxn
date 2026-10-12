import { createHash, randomUUID } from "node:crypto";
import { Inject, Injectable, type OnModuleDestroy, type OnModuleInit } from "@nestjs/common";
import { Valkey } from "iovalkey";
import { CONFIG, type ServerConfig } from "#shared/config";

const WINDOW_MS = 60000;
const DAY_MS = 86400000;
const LEASE_MS = 35000;
// All checks and reservations are atomic across replicas. Failed LLM calls still count
// toward the daily budget, because the upstream may already have billed them.
const RESERVE = `
local now = tonumber(ARGV[1])
redis.call('ZREMRANGEBYSCORE', KEYS[4], '-inf', now)
if tonumber(redis.call('GET', KEYS[1]) or '0') >= tonumber(ARGV[2]) then return {0, 60} end
if tonumber(redis.call('GET', KEYS[2]) or '0') >= tonumber(ARGV[3]) then return {0, 60} end
if tonumber(redis.call('GET', KEYS[3]) or '0') >= tonumber(ARGV[4]) then return {0, tonumber(ARGV[8])} end
if redis.call('ZCARD', KEYS[4]) >= tonumber(ARGV[5]) then return {0, 2} end
for i = 1, 3 do
  redis.call('INCR', KEYS[i])
  redis.call('PEXPIRE', KEYS[i], i == 3 and ARGV[9] or 120000)
end
redis.call('ZADD', KEYS[4], now + tonumber(ARGV[7]), ARGV[6])
redis.call('PEXPIRE', KEYS[4], ARGV[7])
return {1, 0}
`;
export type Reservation =
  | { allowed: true; release: () => Promise<void> }
  | { allowed: false; retryAfter: number; unavailable?: boolean };
@Injectable()
export class AssistantLimiter implements OnModuleInit, OnModuleDestroy {
  private client?: Valkey;
  private readonly peers = new Map<string, number>();
  private minute = -1;
  private day = -1;
  private count = 0;
  private daily = 0;
  private active = 0;
  constructor(@Inject(CONFIG) private readonly config: ServerConfig) {}
  async onModuleInit() {
    if (!this.config.limiter.url) {
      if (this.config.limiter.required) throw new Error("A shared assistant limiter is required");
      return;
    }
    this.client = new Valkey(this.config.limiter.url, {
      lazyConnect: true,
      enableOfflineQueue: false,
      maxRetriesPerRequest: 0,
      connectTimeout: 1000,
      commandTimeout: 1000,
      retryStrategy: (attempt) => Math.min(attempt * 200, 2000),
    });
    this.client.on("error", () => {
      /* no credentials or request data in logs */
    });
    try {
      await this.client.connect();
    } catch {
      if (this.config.limiter.required) throw new Error("Shared limiter unavailable");
    }
  }
  async reserve(peer: string): Promise<Reservation> {
    const now = Date.now();
    const minute = Math.floor(now / WINDOW_MS);
    const day = Math.floor(now / DAY_MS);
    const hash = createHash("sha256").update(peer).digest("hex").slice(0, 24);
    if (this.client) {
      if (this.client.status !== "ready")
        return { allowed: false, retryAfter: 30, unavailable: true };
      const id = randomUUID();
      const prefix = "jeamxn:{assistant}:v1";
      const leaseKey = `${prefix}:active`;
      try {
        const result = (await this.client.eval(
          RESERVE,
          4,
          `${prefix}:peer:${minute}:${hash}`,
          `${prefix}:minute:${minute}`,
          `${prefix}:day:${day}`,
          leaseKey,
          now,
          this.config.limiter.peerLimit,
          this.config.limiter.globalLimit,
          this.config.limiter.dailyLimit,
          this.config.limiter.concurrency,
          id,
          LEASE_MS,
          Math.ceil((DAY_MS - (now % DAY_MS)) / 1000),
          DAY_MS * 2,
        )) as number[];
        if (result[0] !== 1) return { allowed: false, retryAfter: result[1] || 60 };
        return {
          allowed: true,
          release: async () => {
            try {
              await this.client?.zrem(leaseKey, id);
            } catch {
              /* lease expires, fail closed until then */
            }
          },
        };
      } catch {
        return { allowed: false, retryAfter: 30, unavailable: true };
      }
    }
    if (this.minute !== minute) {
      this.minute = minute;
      this.peers.clear();
      this.count = 0;
    }
    if (this.day !== day) {
      this.day = day;
      this.daily = 0;
    }
    if (this.daily >= this.config.limiter.dailyLimit)
      return { allowed: false, retryAfter: Math.ceil((DAY_MS - (now % DAY_MS)) / 1000) };
    if (this.active >= this.config.limiter.concurrency) return { allowed: false, retryAfter: 2 };
    const peerCount = this.peers.get(hash) ?? 0;
    if (peerCount >= this.config.limiter.peerLimit || this.count >= this.config.limiter.globalLimit)
      return { allowed: false, retryAfter: 60 };
    this.peers.set(hash, peerCount + 1);
    this.count++;
    this.daily++;
    this.active++;
    let released = false;
    return {
      allowed: true,
      release: async () => {
        if (!released) {
          released = true;
          this.active--;
        }
      },
    };
  }
  onModuleDestroy() {
    this.client?.disconnect();
  }
}
