import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import test from "node:test";
import { portfolio, resumeProjects } from "@jeamxn/core";
import fontkit from "@pdf-lib/fontkit";
import { decodePDFRawStream, PDFArray, PDFDict, PDFDocument, PDFName, PDFRawStream } from "pdf-lib";
import { generateResumePdf } from "../dist/index.js";
import { resumeProjectCopy } from "../dist/resume-project-copy.js";

function cmap(stream) {
  const text = Buffer.from(decodePDFRawStream(stream).decode()).toString("latin1");
  const glyphs = new Map();
  for (const section of text.matchAll(/beginbfchar([\s\S]*?)endbfchar/g)) {
    for (const [, id, unicode] of section[1].matchAll(/<([\dA-Fa-f]+)>\s*<([\dA-Fa-f]+)>/g)) {
      const bytes = Buffer.from(unicode, "hex");
      let word = "";
      for (let index = 0; index < bytes.length; index += 2)
        word += String.fromCharCode(bytes.readUInt16BE(index));
      glyphs.set(id.toUpperCase(), word);
    }
  }
  return glyphs;
}

// Subset glyph IDs are local to each font. A single global CMap corrupts text
// as soon as a real Bold face is introduced, even though PDF readers are fine.
function textRuns(document) {
  return document.getPages().map((page) => {
    const fonts = page.node.Resources().lookup(PDFName.of("Font"), PDFDict);
    const maps = new Map();
    for (const [name, reference] of fonts.entries()) {
      const font = document.context.lookup(reference, PDFDict);
      const unicode = font.lookup(PDFName.of("ToUnicode"), PDFRawStream);
      maps.set(name.decodeText(), cmap(unicode));
    }
    const contents = page.node.Contents();
    const streams = contents instanceof PDFArray ? contents.asArray() : [contents];
    const runs = [];
    for (const reference of streams) {
      const stream = document.context.lookup(reference, PDFRawStream);
      const source = Buffer.from(decodePDFRawStream(stream).decode()).toString("latin1");
      let font = "";
      let size = 0;
      let x = 0;
      let y = 0;
      for (const match of source.matchAll(
        /\/([^\s/]+)\s+([\d.]+)\s+Tf|1 0 0 1 ([\d.-]+) ([\d.-]+) Tm|<([\dA-Fa-f]+)>\s*Tj/g,
      )) {
        if (match[1]) {
          font = match[1];
          size = Number(match[2]);
        } else if (match[3]) {
          x = Number(match[3]);
          y = Number(match[4]);
        } else {
          let text = "";
          const hex = match[5];
          for (let index = 0; index < hex.length; index += 4)
            text += maps.get(font)?.get(hex.slice(index, index + 4).toUpperCase()) ?? "";
          runs.push({ text, x, y, size, font });
        }
      }
    }
    return runs;
  });
}

test("resume uses the same three projects and confirmed-user-reference canvas, portrait and black/white columns", async () => {
  const bytes = await generateResumePdf();
  const doc = await PDFDocument.load(bytes);
  const pages = textRuns(doc);
  const text = pages
    .flat()
    .map((run) => run.text)
    .join("\n");
  assert.ok(doc.getPageCount() >= 3 && doc.getPageCount() <= 5, `${doc.getPageCount()} pages`);
  assert.deepEqual(
    resumeProjects(portfolio.projects).map((item) => item.slug),
    ["ara", "pfct", "dipull"],
  );
  assert.match(text, /최재민/);
  assert.match(text, /주요 작업/);
  assert.match(text, /AI WAF 관제/);
  assert.match(text, /한국정보통신진흥협회/);
  assert.match(text, /한국정보통신자격협회/);
  assert.equal((text.match(/\[ 개선된 점 \]/gu) ?? []).length, 3);
  assert.match(text, /2026\.01 ~ 현재/);
  assert.doesNotMatch(text, /㏆/);
  const majorRuns = pages.flat();
  const majorStart = majorRuns.findIndex((run) => run.text === "주요 작업");
  const majorTitles = majorRuns
    .slice(majorStart)
    .filter(
      (run) => ["ara", "PFCT", "Dipull"].includes(run.text) && Math.abs(run.size - 14.5125) < 0.001,
    );
  assert.deepEqual(
    majorTitles.map((run) => run.text),
    ["ara", "PFCT", "Dipull"],
  );
  assert.ok(majorTitles.every((run) => run.x === 235.6875));
  assert.ok(
    pages
      .flat()
      .some(
        (run) =>
          run.text === "주요 작업" && run.x === 74.4375 && Math.abs(run.size - 16.125) < 0.001,
      ),
  );
  const dates = pages
    .flat()
    .filter((run) => Math.abs(run.size - 11.2875) < 0.001 && /^(?:19|20)\d{2}/u.test(run.text));
  assert.equal(
    dates.length,
    portfolio.experience.length +
      3 +
      portfolio.education.length +
      portfolio.activities.length +
      portfolio.awards.length,
  );
  assert.ok(dates.every((run) => run.x > 600 && run.x < 735.75));
  assert.ok(pages.flat().some((run) => run.text === portfolio.profile.name && run.size === 32.25));
  assert.ok(
    pages.flat().some((run) => run.text === portfolio.profile.headline && run.size === 19.35),
  );
  assert.equal(doc.getPageCount(), 4, "no URL-only orphan fifth page");
  for (const page of doc.getPages()) {
    assert.ok(Math.abs(page.getWidth() - 810) < 0.01);
    assert.ok(Math.abs(page.getHeight() - 1163.04) < 0.01);
  }
  for (const run of pages.flat()) {
    assert.ok(run.x >= 74.4375 && run.x <= 735.75, `x overflow: ${run.text}`);
    assert.ok(run.y >= 64 && run.y <= 1100, `y overflow: ${run.text}`);
  }
  for (const section of [
    "업무 경험",
    "주요 작업",
    "전문 분야",
    "학력",
    "수상 및 활동",
    "수료 및 자격증",
    "URL",
  ])
    assert.ok(
      pages.some(
        (runs) =>
          runs.some((run) => run.text === section) &&
          runs.some((run) => run.x === 235.6875 && Math.abs(run.size - 14.5125) < 0.001),
      ),
    );
  for (const item of portfolio.education) assert.ok(text.includes(item.school));
  for (const item of portfolio.activities) assert.ok(text.includes(item.title));
  for (const item of portfolio.awards) assert.ok(text.includes(item.title));
  assert.match(text, /아이디어 \/ 공동 개발/);
  assert.match(text, /실험/);
  assert.match(text, /성민이 구현/);
  assert.match(text, /후배 인계/);
  assert.match(text, /운영 상태 미확인/);
  assert.match(text, /사용자가 확인|최종 확인|최종 제출/);
  assert.doesNotMatch(text, /다른 작업|MultiNet|띠리링|YUN Architects/);
  assert.doesNotMatch(text, /010-|admin@isamin|pfct\.kr|Surfit/);
  const objects = doc.context.enumerateIndirectObjects();
  const serialized = objects.map(([, object]) => object.toString()).join("\n");
  assert.match(serialized, /\/FontFile2/);
  assert.match(serialized, /\/Subtype \/Image/);
  assert.match(serialized, /\/Width 672/u);
  assert.match(serialized, /\/Height 900/u);
  const photoImage = objects
    .map(([, object]) => object)
    .find(
      (object) =>
        object instanceof PDFRawStream &&
        object.dict.get(PDFName.of("Subtype"))?.toString() === "/Image" &&
        object.dict.get(PDFName.of("Width"))?.toString() === "672",
    );
  assert.ok(photoImage, "the new portrait is actually embedded");
  assert.doesNotMatch(text, /Jeamin Choi {2}\/ {2}jeamxn.dev|\(계속\)/);
  assert.match(serialized, /\/ToUnicode/);
  for (const href of [
    "https://jeamxn.dev/work)",
    "https://jeamxn.dev/work/ara",
    "https://jeamxn.dev/work/pfct",
    "https://jeamxn.dev/work/dipull",
    "https://jeamxn.dev/activity/kt-sat-ax",
  ])
    assert.ok(serialized.includes(href), `missing URI ${href}`);
  for (const [, object] of objects) {
    if (!(object instanceof PDFRawStream)) continue;
    const content = Buffer.from(decodePDFRawStream(object).decode()).toString("latin1");
    for (const [, r, g, b] of content.matchAll(/([\d.]+) ([\d.]+) ([\d.]+) rg/g))
      assert.ok(
        Math.max(Number(r), Number(g), Number(b)) - Math.min(Number(r), Number(g), Number(b)) <
          0.05,
        "no blue/colored headings",
      );
  }
  const license = await readFile(
    new URL("../assets/fonts/Pretendard-LICENSE.txt", import.meta.url),
    "utf8",
  );
  assert.match(license, /OPEN FONT LICENSE/);
  const bold = await readFile(new URL("../assets/fonts/Pretendard-Bold.ttf", import.meta.url));
  assert.ok(bold.length > 1000000);
  if (process.env.RESUME_DESIGN_OUTPUT) await writeFile(process.env.RESUME_DESIGN_OUTPUT, bytes);
  console.log(
    `resume design: ${doc.getPageCount()} pages, ${bytes.length} bytes, ${pages.flat().length} text runs`,
  );
});

test("missing regular font rejects the build and a later valid generation is independent", async () => {
  for (let attempt = 0; attempt < 2; attempt++)
    await assert.rejects(
      generateResumePdf(portfolio, { fontPath: "/nonexistent/resume-font-fixture.ttf" }),
      { code: "ENOENT" },
    );
  assert.ok((await generateResumePdf()).length > 1000000);
});

test("PDF embeds complete licensed faces and every non-space glyph has a painted outline", async () => {
  const bytes = await generateResumePdf(portfolio);
  const doc = await PDFDocument.load(bytes);
  const originals = await Promise.all(
    ["Regular", "Bold"].map(
      async (weight) =>
        new Uint8Array(
          await readFile(new URL(`../assets/fonts/Pretendard-${weight}.ttf`, import.meta.url)),
        ),
    ),
  );
  const embedded = [];
  for (const [, object] of doc.context.enumerateIndirectObjects()) {
    if (!(object instanceof PDFDict) || !object.has(PDFName.of("FontFile2"))) continue;
    const stream = object.lookup(PDFName.of("FontFile2"), PDFRawStream);
    const buffer = decodePDFRawStream(stream).decode();
    assert.ok(
      originals.some((source) => Buffer.from(source).equals(Buffer.from(buffer))),
      "the complete TTF, not a corrupt subset, must be embedded",
    );
    embedded.push(fontkit.create(buffer));
  }
  assert.equal(embedded.length, 2);
  let checked = 0;
  for (const face of embedded) {
    for (const line of textRuns(doc).flat()) {
      if (line.font.includes("Bold") !== face.postscriptName.includes("Bold")) continue;
      for (const glyph of face.layout(line.text).glyphs) {
        const character = String.fromCodePoint(glyph.codePoints?.[0] ?? 32);
        if (!character.trim()) continue;
        assert.ok(
          glyph.path.commands.length > 0,
          `blank outline in ${face.postscriptName}: ${character}`,
        );
        checked++;
      }
    }
  }
  assert.ok(checked > 2000, `${checked} non-space glyphs inspected`);
});

test("PDF case blocks reuse reviewed prose without blank headings or duplicate paragraphs", () => {
  for (const project of resumeProjects(portfolio.projects)) {
    const blocks = resumeProjectCopy(project);
    assert.deepEqual(
      blocks.map((block) => block.heading),
      ["[ 문제 정의 ]", "[ 해결 과정 ]", "[ 개선된 점 ]"],
    );
    assert.ok(
      blocks.every(
        (block) =>
          block.paragraphs.length > 0 && block.paragraphs.every((text) => text.trim().length > 10),
      ),
      project.slug,
    );
    const paragraphs = blocks.flatMap((block) => block.paragraphs);
    assert.equal(new Set(paragraphs).size, paragraphs.length, project.slug);
  }
});

test("PDF generation needs no HTTP fetch and uses the supplied public portfolio", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = () => {
    throw new Error("PDF generation must not make network requests");
  };
  try {
    const data = structuredClone(portfolio);
    data.profile.name = "조판 검증";
    const doc = await PDFDocument.load(await generateResumePdf(data));
    assert.equal(doc.getAuthor(), "조판 검증");
    assert.equal(doc.getTitle(), "조판 검증 | 제품을 만드는 사람");
    assert.ok(
      textRuns(doc)
        .flat()
        .some((run) => run.text === "조판 검증"),
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});
