import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";

let vite;
before(async () => {
  vite = await createServer({
    configFile: false,
    resolve: { tsconfigPaths: true },
    server: { middlewareMode: true, hmr: false, ws: false },
    appType: "custom",
  });
});
after(async () => vite?.close());

test("long stories expose every paragraph and meaningful anchor, without collapsed disclosures", async () => {
  const { StoryReader } = await vite.ssrLoadModule("/app/shared/widget/story-reader.tsx");
  const sections = [
    {
      id: "beginning",
      title: "반에서 학교로",
      paragraphs: ["한 반에서 쓰던 서비스입니다.", "학교의 일상에 필요한 기능으로 넓혔습니다."],
    },
    {
      id: "account",
      title: "계정을 이어서",
      paragraphs: ["같은 사람이 여러 도구를 편하게 씁니다."],
    },
    {
      id: "handover",
      title: "후배에게 이어서",
      paragraphs: ["졸업 뒤에도 이어갈 수 있도록 준비했습니다."],
    },
  ];
  const html = renderToStaticMarkup(StoryReader({ sections }));
  for (const section of sections) {
    assert.ok(html.includes(`href="#${section.id}"`));
    assert.ok(html.includes(`id="${section.id}"`));
    assert.ok(html.includes(`<h2 id="${section.id}-title">${section.title}</h2>`));
    for (const paragraph of section.paragraphs) assert.ok(html.includes(paragraph));
  }
  assert.doesNotMatch(html, /<details|<summary|aria-expanded/);
});

test("short stories remain complete and do not need a contents panel", async () => {
  const { StoryReader } = await vite.ssrLoadModule("/app/shared/widget/story-reader.tsx");
  const html = renderToStaticMarkup(
    StoryReader({
      sections: [{ id: "story", title: "이야기", paragraphs: ["짧은 이야기도 전체를 읽습니다."] }],
    }),
  );
  assert.match(html, /짧은 이야기도 전체를 읽습니다/);
  assert.doesNotMatch(html, /<nav/);
});

test("thoughts are shown beside factual paragraphs without a draft label", async () => {
  const { StoryReader } = await vite.ssrLoadModule("/app/shared/widget/story-reader.tsx");
  const html = renderToStaticMarkup(
    StoryReader({
      sections: [
        {
          id: "draft",
          title: "작업",
          paragraphs: ["확인한 작업 내용이에요."],
          draftThought: "같은 일을 반복하지 않도록 만들고 싶었어요.",
        },
      ],
    }),
  );
  assert.match(html, /확인한 작업 내용이에요/u);
  assert.doesNotMatch(html, /커밋에서 추정/u);
  assert.doesNotMatch(html, /확인된 발언이 아니라/u);
  assert.match(html, /같은 일을 반복하지 않도록/u);
});
