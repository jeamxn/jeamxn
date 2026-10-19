import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const exec = promisify(execFile);
const cli = fileURLToPath(new URL("../dist/cli.js", import.meta.url));

test("CLI writes a static PDF to an explicit output relative to its working directory", async () => {
  const cwd = await mkdtemp(join(tmpdir(), "jeamxn-resume-cli-"));
  try {
    const { stdout } = await exec(process.execPath, [cli, "--output", "nested/resume.pdf"], {
      cwd,
      env: { PATH: process.env.PATH },
    });
    const bytes = await readFile(join(cwd, "nested/resume.pdf"));
    assert.equal(bytes.subarray(0, 5).toString("ascii"), "%PDF-");
    assert.ok(bytes.length > 1000000);
    assert.match(stdout, /Generated .*nested\/resume\.pdf/);
  } finally {
    await rm(cwd, { recursive: true, force: true });
  }
});

test("CLI reports font failure as a nonzero build and does not create an output", async () => {
  const cwd = await mkdtemp(join(tmpdir(), "jeamxn-resume-cli-"));
  try {
    await assert.rejects(
      exec(
        process.execPath,
        [cli, "--output", "resume.pdf", "--font-path", "/nonexistent/font.ttf"],
        {
          cwd,
        },
      ),
      (error) => error.code !== 0 && /ENOENT/.test(error.stderr),
    );
    await assert.rejects(readFile(join(cwd, "resume.pdf")), { code: "ENOENT" });
  } finally {
    await rm(cwd, { recursive: true, force: true });
  }
});

test("CLI explains its usage and rejects unknown or missing arguments", async () => {
  assert.match((await exec(process.execPath, [cli, "--help"])).stdout, /--output/);
  for (const args of [["--unknown", "x"], ["--output"]])
    await assert.rejects(exec(process.execPath, [cli, ...args]), /Invalid argument/);
});
