import fontkit from "@pdf-lib/fontkit";
import { PDFDict, type PDFDocument, type PDFFont, PDFName } from "pdf-lib";

/** Keep full TrueType outlines and the Unicode identity of actual shaped glyphs. */
export async function embedResumeFont(doc: PDFDocument, bytes: Uint8Array) {
  const unicode = new Map<number, number[]>();
  // Korean shaping substitutes punctuation into localized glyphs. pdf-lib's
  // generic full-font CMap enumerates only unshaped characterSet glyphs, so it
  // maps these localized IDs to unrelated compatibility characters. Capture
  // actual shaped glyph codePoints rather than inferring them from glyph IDs.
  doc.registerFontkit({
    create(data) {
      const face = fontkit.create(data);
      const layout = face.layout.bind(face);
      face.layout = (text, features) => {
        const run = layout(text, features);
        for (const glyph of run.glyphs)
          if (glyph.codePoints.length) unicode.set(glyph.id, [...glyph.codePoints]);
        return run;
      };
      return face;
    },
  });
  // The subset path loses most painted composite outlines for this face.
  const font = await doc.embedFont(bytes, { subset: false });
  return { font, finalize: () => writeUsedUnicode(doc, font, unicode) };
}

async function writeUsedUnicode(doc: PDFDocument, font: PDFFont, unicode: Map<number, number[]>) {
  await font.embed();
  const hex = (value: number) => value.toString(16).toUpperCase().padStart(4, "0");
  const utf16 = (points: number[]) => {
    const value = String.fromCodePoint(...points);
    return Array.from({ length: value.length }, (_, index) => hex(value.charCodeAt(index))).join(
      "",
    );
  };
  const pairs = [...unicode].sort(([left], [right]) => left - right);
  const blocks: string[] = [];
  for (let start = 0; start < pairs.length; start += 100) {
    const part = pairs.slice(start, start + 100);
    blocks.push(
      `${part.length} beginbfchar\n${part.map(([id, points]) => `<${hex(id)}> <${utf16(points)}>`).join("\n")}\nendbfchar`,
    );
  }
  const cmap = `/CIDInit /ProcSet findresource begin\n12 dict begin\nbegincmap\n/CIDSystemInfo << /Registry (Adobe) /Ordering (UCS) /Supplement 0 >> def\n/CMapName /Resume-Identity-UCS def\n/CMapType 2 def\n1 begincodespacerange\n<0000> <FFFF>\nendcodespacerange\n${blocks.join("\n")}\nendcmap\nCMapName currentdict /CMap defineresource pop\nend\nend`;
  const dictionary = doc.context.lookup(font.ref, PDFDict);
  dictionary.set(PDFName.of("ToUnicode"), doc.context.register(doc.context.flateStream(cmap)));
}
