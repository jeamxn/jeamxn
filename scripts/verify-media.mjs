import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { portfolio } from "../packages/core/dist/index.js";

function webpSize(bytes) {
  assert.equal(bytes.toString("ascii", 0, 4), "RIFF");
  assert.equal(bytes.toString("ascii", 8, 12), "WEBP");
  let offset = 12;
  while (offset + 8 <= bytes.length) {
    const type = bytes.toString("ascii", offset, offset + 4);
    const length = bytes.readUInt32LE(offset + 4);
    const start = offset + 8;
    if (type === "VP8X")
      return [bytes.readUIntLE(start + 4, 3) + 1, bytes.readUIntLE(start + 7, 3) + 1];
    if (type === "VP8 ") {
      assert.equal(bytes.toString("hex", start + 3, start + 6), "9d012a");
      return [bytes.readUInt16LE(start + 6) & 0x3fff, bytes.readUInt16LE(start + 8) & 0x3fff];
    }
    if (type === "VP8L") {
      assert.equal(bytes[start], 0x2f);
      const bits = bytes.readUInt32LE(start + 1);
      return [(bits & 0x3fff) + 1, ((bits >>> 14) & 0x3fff) + 1];
    }
    offset = start + length + (length & 1);
  }
  throw new Error("No WebP dimensions");
}
const root = path.resolve(import.meta.dirname, "../apps/web/public");
let checked = 0;
for (const project of portfolio.projects) {
  for (const screen of project.screens ?? []) {
    assert.match(screen.src, /^\/images\/[a-z0-9-]+\.[a-f0-9]{12}\.webp$/u);
    const bytes = await fs.readFile(path.join(root, screen.src));
    const digest = crypto.createHash("sha256").update(bytes).digest("hex").slice(0, 12);
    assert.ok(screen.src.endsWith(`.${digest}.webp`), `${screen.id}: stale URL`);
    assert.deepEqual(
      webpSize(bytes),
      [screen.width, screen.height],
      `${screen.id}: wrong geometry`,
    );
    console.log(project.slug, screen.id, screen.width, screen.height, bytes.length, screen.src);
    checked++;
  }
}
assert.ok(checked >= 6);
console.log(JSON.stringify({ passed: true, screenChecks: checked }));
