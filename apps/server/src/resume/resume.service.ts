import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { Inject, Injectable, ServiceUnavailableException } from "@nestjs/common";
import fontkit from "@pdf-lib/fontkit";
import { PDFDocument, type PDFFont, PDFName, type PDFPage, PDFString, rgb } from "pdf-lib";
import { PortfolioService } from "#portfolio/portfolio.public";
import { CONFIG, type ServerConfig } from "#shared/config";

const PAGE = { width: 595.28, height: 841.89, margin: 48, bottom: 56 };
const INK = rgb(0.13, 0.17, 0.2);
const MUTED = rgb(0.4, 0.45, 0.48);
const ACCENT = rgb(0.16, 0.32, 0.43);
class ResumeLayout {
  private page!: PDFPage;
  private y = 0;
  constructor(
    private readonly doc: PDFDocument,
    private readonly font: PDFFont,
  ) {
    this.newPage();
  }
  private newPage() {
    this.page = this.doc.addPage([PAGE.width, PAGE.height]);
    this.y = PAGE.height - PAGE.margin;
  }
  nextPage() {
    this.newPage();
  }
  private ensure(height: number) {
    if (this.y - height < PAGE.bottom) this.newPage();
  }
  private wrap(text: string, size: number, width: number) {
    const lines: string[] = [];
    // Grapheme-aware wrapping handles Korean without relying on spaces.
    const segmenter = new Intl.Segmenter("ko", { granularity: "grapheme" });
    for (const paragraph of text.split("\n")) {
      let line = "";
      for (const { segment } of segmenter.segment(paragraph)) {
        if (line && this.font.widthOfTextAtSize(line + segment, size) > width) {
          lines.push(line.trimEnd());
          line = segment.trimStart();
        } else line += segment;
      }
      lines.push(line.trimEnd());
    }
    return lines;
  }
  text(text: string, size = 10.4, color = INK, gap = 6) {
    const lineHeight = size * 1.55;
    for (const line of this.wrap(text, size, PAGE.width - PAGE.margin * 2)) {
      this.ensure(lineHeight);
      this.y -= lineHeight;
      this.page.drawText(line, { x: PAGE.margin, y: this.y, size, font: this.font, color });
    }
    this.y -= gap;
  }
  section(title: string) {
    this.ensure(78);
    this.y -= 18;
    this.page.drawLine({
      start: { x: PAGE.margin, y: this.y },
      end: { x: PAGE.width - PAGE.margin, y: this.y },
      thickness: 0.6,
      color: rgb(0.82, 0.86, 0.87),
    });
    this.y -= 8;
    this.text(title, 15, ACCENT, 10);
  }
  item(title: string, meta: string, body: string) {
    this.ensure(78);
    this.text(title, 11.4, INK, 0);
    if (meta) this.text(meta, 9.1, MUTED, 3);
    if (body) this.text(body);
  }
  link(label: string, href: string) {
    const size = 9.2;
    for (const line of this.wrap(`${label}  ${href}`, size, PAGE.width - PAGE.margin * 2)) {
      this.ensure(24);
      this.y -= 18;
      const width = this.font.widthOfTextAtSize(line, size);
      this.page.drawText(line, { x: PAGE.margin, y: this.y, size, font: this.font, color: ACCENT });
      const annotation = this.doc.context.obj({
        Type: "Annot",
        Subtype: "Link",
        Rect: [PAGE.margin, this.y - 3, PAGE.margin + width, this.y + 11],
        Border: [0, 0, 0],
        A: { Type: "Action", S: "URI", URI: PDFString.of(href) },
      });
      this.page.node.addAnnot(this.doc.context.register(annotation));
    }
    this.y -= 5;
  }
  finish() {
    const pages = this.doc.getPages();
    for (const [index, page] of pages.entries()) {
      page.drawText("Jeamin Choi  /  jeamxn.dev", {
        x: PAGE.margin,
        y: 29,
        size: 8,
        font: this.font,
        color: MUTED,
      });
      page.drawText(`${index + 1} / ${pages.length}`, {
        x: PAGE.width - PAGE.margin - 26,
        y: 29,
        size: 8,
        font: this.font,
        color: MUTED,
      });
      page.node.set(PDFName.of("Tabs"), PDFName.of("S"));
    }
  }
}
@Injectable()
export class ResumeService {
  private cached?: Promise<Uint8Array>;
  constructor(
    @Inject(PortfolioService) private readonly portfolio: PortfolioService,
    @Inject(CONFIG) private readonly config: ServerConfig,
  ) {}
  async get(): Promise<Uint8Array> {
    if (!this.cached)
      this.cached = this.render().catch(() => {
        this.cached = undefined;
        throw new ServiceUnavailableException();
      });
    return this.cached;
  }
  private async render(): Promise<Uint8Array> {
    const doc = await PDFDocument.create();
    doc.registerFontkit(fontkit);
    const fontPath =
      this.config.fontPath ??
      fileURLToPath(new URL("../../asset/fonts/NanumGothic-Regular.ttf", import.meta.url));
    const font = await doc.embedFont(await readFile(fontPath), { subset: true });
    const data = this.portfolio.get();
    doc.setTitle(`${data.profile.name} | 제품을 만드는 사람`);
    doc.setAuthor(data.profile.name);
    doc.setSubject("공개 포트폴리오 이력서");
    doc.setLanguage("ko-KR");
    const layout = new ResumeLayout(doc, font);
    layout.text(data.profile.name, 28, INK, 2);
    layout.text(data.profile.nameEn, 13, MUTED, 14);
    layout.text(data.profile.headline, 17, ACCENT, 9);
    layout.text(data.profile.intro, 11, INK, 10);
    layout.link("웹 포트폴리오", "https://jeamxn.dev");
    layout.link("이메일", `mailto:${data.profile.email}`);
    layout.link("GitHub", data.profile.github);
    layout.section("경력");
    for (const item of data.experience)
      layout.item(
        `${item.company} · ${item.team}`,
        `${item.period} · ${item.role}`,
        item.description,
      );
    layout.section("학력");
    for (const item of data.education)
      layout.text(`${item.school} · ${item.major} · ${item.period} · ${item.note}`, 9.4, INK, 6);
    layout.nextPage();
    const pfct = data.projects.find((item) => item.slug === "pfct");
    if (pfct) {
      layout.section("PFCT에서 만든 제품");
      layout.text(pfct.summary, 9.4, INK, 5);
      for (const highlight of pfct.highlights.slice(0, 3))
        layout.text(`${highlight.title}: ${highlight.body}`, 9.4, INK, 5);
      layout.link("기여와 상세 사례", "https://jeamxn.dev/work/pfct");
    }
    layout.section("대표 프로젝트");
    for (const project of data.projects.filter((item) => item.featured)) {
      layout.item(project.name, `${project.period} · ${project.role}`, project.summary);
      layout.text(project.status, 9.1, MUTED, 6);
      // Resume is a compact projection of the same public data, not the full case
      // study transcript. PFCT contributions share this page with one representative
      // decision from each side project; the full narratives stay on the website.
      for (const highlight of project.highlights.slice(0, 1))
        layout.item(highlight.title, "", highlight.body);
      layout.link("상세 이야기", `https://jeamxn.dev/work/${project.slug}`);
    }
    layout.nextPage();
    layout.section("다른 작업");
    for (const project of data.projects.filter((item) => !item.featured && item.slug !== "pfct")) {
      layout.text(
        `${project.name} · ${project.period} · ${project.role} · ${project.status}\n${project.summary}`,
        9.4,
        INK,
        8,
      );
    }
    layout.section("활동");
    for (const item of data.activities) {
      layout.text(`${item.title} · ${item.organization} · ${item.period}`, 9.4, INK, 4);
      if (item.slug) {
        layout.text(item.description, 9.4, INK, 3);
        layout.link("강연의 생각과 내용", `https://jeamxn.dev/activity/${item.slug}`);
      }
    }
    layout.section("수상 · 참여 · 자격");
    for (const item of data.awards) {
      const kind = { award: "수상", participation: "참가", certification: "자격·인증" }[item.kind];
      layout.text(`${item.title} · ${item.year} · ${kind} · ${item.organization}`, 9.4, INK, 5);
    }
    layout.finish();
    return doc.save();
  }
}
