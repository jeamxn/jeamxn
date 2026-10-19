import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { generateResumePdf } from "./resume.js";

const args = process.argv.slice(2);
if (args.includes("--help")) {
  console.log("Usage: node dist/cli.js [--output <resume.pdf>] [--font-path <regular.ttf>]");
} else {
  const values = new Map<string, string>();
  for (let index = 0; index < args.length; index += 2) {
    const name = args[index];
    const value = args[index + 1];
    if (!["--output", "--font-path"].includes(name) || !value || value.startsWith("--"))
      throw new Error(`Invalid argument: ${name}. Use --help for usage.`);
    values.set(name, value);
  }
  const output = values.has("--output")
    ? resolve(values.get("--output") as string)
    : fileURLToPath(new URL("../../../apps/web/public/resume.pdf", import.meta.url));
  const bytes = await generateResumePdf(undefined, { fontPath: values.get("--font-path") });
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, bytes);
  console.log(`Generated ${output} (${bytes.byteLength} bytes)`);
}
