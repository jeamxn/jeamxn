import {
  type Color,
  type PDFDocument,
  type PDFFont,
  type PDFImage,
  type PDFPage,
  PDFString,
  rgb,
} from "pdf-lib";

// Measured from the confirmed 2026-10-18 user attachment, not a generic A4 template.
export const RESUME_PAGE = {
  width: 810,
  height: 1163.04,
  margin: 74.4375,
  top: 64.5,
  bottom: 64.5,
};
export const RESUME_COLUMNS = { section: 74.4375, body: 235.6875, right: 735.75 };
export const RESUME_TYPE = {
  name: 32.25,
  headline: 19.35,
  section: 16.125,
  title: 14.5125,
  meta: 12.9,
  body: 12.09375,
  date: 11.2875,
  leading: 19.5,
};
const INK = rgb(24 / 255, 25 / 255, 27 / 255);
const MUTED = rgb(50 / 255, 50 / 255, 53 / 255);
type Link = { label: string; href: string };
type Paragraph = string | { heading: string; paragraphs: string[] };
type Entry = {
  title: string;
  period?: string;
  meta?: string[];
  paragraphs?: Paragraph[];
  links?: Link[];
};
type Line = {
  text: string;
  size: number;
  leading: number;
  font: PDFFont;
  color: Color;
  after: number;
  href?: string;
};

/** Flowing reference-style resume. No synthetic continuation labels or page footers. */
export class ResumeLayout {
  private page!: PDFPage;
  private y = 0;
  private sectionTitle = "";
  private sectionPending = false;
  private freshPage = true;
  constructor(
    private readonly doc: PDFDocument,
    private readonly regular: PDFFont,
    private readonly bold: PDFFont,
  ) {
    this.newPage();
  }
  private newPage() {
    this.page = this.doc.addPage([RESUME_PAGE.width, RESUME_PAGE.height]);
    this.y = RESUME_PAGE.height - RESUME_PAGE.top;
    this.freshPage = true;
  }
  private wrap(text: string, size: number, width: number, font = this.regular) {
    const lines: string[] = [];
    const segmenter = new Intl.Segmenter("ko", { granularity: "grapheme" });
    for (const paragraph of text.split("\n")) {
      let line = "";
      for (const { segment } of segmenter.segment(paragraph)) {
        if (line && font.widthOfTextAtSize(line + segment, size) > width) {
          const space = line.lastIndexOf(" ");
          if (space > 0 && font.widthOfTextAtSize(line.slice(0, space), size) > width * 0.6) {
            lines.push(line.slice(0, space).trimEnd());
            line = (line.slice(space + 1) + segment).trimStart();
          } else {
            lines.push(line.trimEnd());
            line = segment.trimStart();
          }
        } else line += segment;
      }
      if (line.trim()) lines.push(line.trimEnd());
    }
    return lines;
  }
  private annotation(href: string, x: number, y: number, width: number, size: number) {
    const object = this.doc.context.obj({
      Type: "Annot",
      Subtype: "Link",
      Rect: [x, y - 2, Math.min(x + width, RESUME_COLUMNS.right), y + size + 2],
      Border: [0, 0, 0],
      A: { Type: "Action", S: "URI", URI: PDFString.of(href) },
    });
    this.page.node.addAnnot(this.doc.context.register(object));
  }
  private draw(line: Line, x: number) {
    const baseline = this.y - line.size;
    this.page.drawText(line.text, {
      x,
      y: baseline,
      size: line.size,
      font: line.font,
      color: line.color,
    });
    if (line.href)
      this.annotation(
        line.href,
        x,
        baseline,
        line.font.widthOfTextAtSize(line.text, line.size),
        line.size,
      );
    this.y -= line.leading + line.after;
    this.freshPage = false;
  }
  header(
    profile: {
      name: string;
      headline: string;
      intro: string;
      about: string[];
      email: string;
      github: string;
    },
    portrait: PDFImage,
  ) {
    const x = RESUME_COLUMNS.section,
      width = RESUME_COLUMNS.right - x;
    // Replace only the portrait. Fit the whole ID photo inside the existing
    // header slot, without stretching it or cropping away hair/shoulders.
    const photo = portrait.scaleToFit(113.25, 113.25);
    this.page.drawImage(portrait, {
      x: 622.5 + (113.25 - photo.width) / 2,
      y: RESUME_PAGE.height - 64.5 - photo.height,
      width: photo.width,
      height: photo.height,
    });
    this.y = RESUME_PAGE.height - 66;
    this.draw(
      {
        text: profile.name,
        size: RESUME_TYPE.name,
        leading: 54,
        font: this.bold,
        color: INK,
        after: 0,
      },
      x,
    );
    for (const text of this.wrap(profile.headline, RESUME_TYPE.headline, 520))
      this.draw(
        { text, size: RESUME_TYPE.headline, leading: 30, font: this.regular, color: INK, after: 0 },
        x,
      );
    this.y = RESUME_PAGE.height - 176.85;
    const contact = profile.email;
    this.draw(
      {
        text: contact,
        size: 12.9,
        leading: 20,
        font: this.regular,
        color: INK,
        after: 0,
        href: `mailto:${profile.email}`,
      },
      x,
    );
    this.y = RESUME_PAGE.height - 229.65;
    for (const text of this.wrap(profile.intro, RESUME_TYPE.headline, width))
      this.draw(
        {
          text,
          size: RESUME_TYPE.headline,
          leading: 29.25,
          font: this.regular,
          color: INK,
          after: 0,
        },
        x,
      );
    this.y -= 14;
    // Same reviewed biography as the site; do not invent achievements to fill a page.
    for (const paragraph of profile.about.slice(0, 4)) {
      for (const text of this.wrap(paragraph, 12.9, width))
        this.draw(
          { text, size: 12.9, leading: 20.625, font: this.regular, color: INK, after: 0 },
          x,
        );
      this.y -= 20.625;
    }
    this.y -= 30;
  }
  section(title: string) {
    this.sectionTitle = title;
    this.sectionPending = true;
  }
  private makeLines(entry: Entry) {
    const width = RESUME_COLUMNS.right - RESUME_COLUMNS.body;
    const dateWidth = entry.period
      ? this.regular.widthOfTextAtSize(entry.period, RESUME_TYPE.date)
      : 0;
    const lines: Line[] = [];
    const append = (
      text: string,
      size = RESUME_TYPE.body,
      leading = RESUME_TYPE.leading,
      font = this.regular,
      after = 0,
      href?: string,
      availableWidth = width,
    ) => {
      const wrapped = this.wrap(text, size, availableWidth, font);
      wrapped.forEach((text, index) => {
        lines.push({
          text,
          size,
          leading,
          font,
          color: INK,
          after: index === wrapped.length - 1 ? after : 0,
          href,
        });
      });
    };
    append(
      entry.title,
      RESUME_TYPE.title,
      23.4,
      this.bold,
      0,
      undefined,
      width - (dateWidth ? dateWidth + 16 : 0),
    );
    for (const meta of entry.meta ?? []) append(meta, RESUME_TYPE.meta, 20.25, this.regular, 0);
    if (entry.meta?.length) lines.at(-1)!.after += 7;
    for (const paragraph of entry.paragraphs ?? []) {
      if (typeof paragraph === "string")
        append(paragraph, RESUME_TYPE.body, RESUME_TYPE.leading, this.regular, 13.5);
      else {
        append(paragraph.heading, RESUME_TYPE.body, RESUME_TYPE.leading, this.regular, 0);
        for (const text of paragraph.paragraphs)
          append(text, RESUME_TYPE.body, RESUME_TYPE.leading, this.regular, 13.5);
      }
    }
    for (const link of entry.links ?? []) append(link.label, 10.48, 18, this.regular, 4, link.href);
    return { lines, dateWidth };
  }
  entry(entry: Entry) {
    // Match the reference's ASCII date separator. Pretendard aliases its em dash
    // glyph to a compatibility character in a full-font ToUnicode map; using ~
    // keeps displayed and copied dates identical without changing source dates.
    entry = { ...entry, period: entry.period?.replaceAll(" — ", " ~ ") };
    const { lines, dateWidth } = this.makeLines(entry);
    // Reserve title, subtitle and two body lines together; allow long records to flow like the reference.
    const firstBody = lines.findIndex((line) => line.size === RESUME_TYPE.body);
    let keep = Math.min(lines.length, Math.max(3, firstBody + 3));
    while (keep < lines.length && lines[keep - 1].after === 0) keep++;
    const firstHeight = lines
      .slice(0, keep)
      .reduce((sum, line) => sum + line.leading + line.after, 0);
    const sectionGap = this.sectionPending && !this.freshPage ? 18 : 0;
    if (this.y - firstHeight - sectionGap < RESUME_PAGE.bottom && !this.freshPage) this.newPage();
    else this.y -= sectionGap;
    if (this.sectionPending)
      this.page.drawText(this.sectionTitle, {
        x: RESUME_COLUMNS.section,
        y: this.y - RESUME_TYPE.section,
        size: RESUME_TYPE.section,
        font: this.bold,
        color: INK,
      });
    this.sectionPending = false;
    if (entry.period)
      this.page.drawText(entry.period, {
        x: RESUME_COLUMNS.right - dateWidth,
        y: this.y - RESUME_TYPE.title,
        size: RESUME_TYPE.date,
        font: this.regular,
        color: MUTED,
      });
    for (let index = 0; index < lines.length; index++) {
      const line = lines[index];
      // Keep complete paragraphs and their bracket heading when they fit on a page.
      const groupStart = index === 0 || lines[index - 1].after > 0;
      let end = index;
      if (groupStart) while (end < lines.length - 1 && lines[end].after === 0) end++;
      const groupHeight = lines
        .slice(index, end + 1)
        .reduce((sum, item) => sum + item.leading + item.after, 0);
      const required =
        groupStart && groupHeight < RESUME_PAGE.height - RESUME_PAGE.top - RESUME_PAGE.bottom
          ? groupHeight
          : line.leading + line.after;
      if (this.y - required < RESUME_PAGE.bottom) this.newPage();
      this.draw(line, RESUME_COLUMNS.body);
    }
    // Short education/award/certificate rows do not need a full story gap.
    // This keeps the final contact links with the resume instead of a near-empty page.
    this.y -= entry.paragraphs?.length ? 39 : 20;
  }
  skills(tags: string[]) {
    const first = tags.slice(0, 12);
    let x = RESUME_COLUMNS.body;
    const rowHeight = 38.25;
    if (this.y - 80 < RESUME_PAGE.bottom) this.newPage();
    if (this.sectionPending)
      this.page.drawText(this.sectionTitle, {
        x: RESUME_COLUMNS.section,
        y: this.y - RESUME_TYPE.section,
        size: RESUME_TYPE.section,
        font: this.bold,
        color: INK,
      });
    this.sectionPending = false;
    for (const tag of first) {
      const w = this.regular.widthOfTextAtSize(tag, 11.2875) + 25.5;
      if (x + w > RESUME_COLUMNS.right) {
        x = RESUME_COLUMNS.body;
        this.y -= rowHeight;
      }
      this.page.drawRectangle({
        x,
        y: this.y - 28.5,
        width: w,
        height: 28.5,
        borderColor: rgb(0.83, 0.83, 0.83),
        borderWidth: 0.65,
        color: rgb(1, 1, 1),
      });
      this.page.drawText(tag, {
        x: x + 12.75,
        y: this.y - 19.5,
        size: 11.2875,
        font: this.regular,
        color: INK,
      });
      x += w + 12;
    }
    this.y -= rowHeight + 39;
  }
}
