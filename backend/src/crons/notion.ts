import cron, { Patterns } from "@elysiajs/cron";
import { Client } from "@notionhq/client";
import { ImageBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import dayjs from "dayjs";

import { DataDB } from "@back/models/data";

export const run = async () => {
  try {
    console.log("🐩 Notion start at:", dayjs().format("YYYY-MM-DD HH:mm:ss"));

    const notion = new Client({
      auth: Bun.env.NOTION_API_KEY,
    });
    const databases = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID_PROJECTS as string,
    });
    const data = (databases.results as any[]).map(async (page) => {
      if (page.properties.No.type !== "number" || !page.cover) return;
      const blocks = await notion.blocks.children.list({ block_id: page.id });
      const images = (blocks.results as ImageBlockObjectResponse[]).map((block) => {
        if (block.type !== "image") return;
        if (block.image.type !== "file") return;
        return block.image.file.url;
      }).filter((url) => url !== undefined) as string[];
      return {
        id: page.id,
        no: Number(page.properties.No.number),
        name: page.properties.Name.title[0].plain_text,
        tags: page.properties.Tags.multi_select.map((tag: any) => tag.name),
        cover: page.cover.type === "external" ? page.cover.external.url : page.cover.file.url,
        images: images,
      };
    }).filter((page) => page !== undefined);
    const dataPromise = await Promise.all(data);

    await DataDB.deleteMany({});
    await DataDB.insertMany(dataPromise);

    console.log("🐩 Notion done at:", dayjs().format("YYYY-MM-DD HH:mm:ss"));
  }
  catch (e) {
    console.error(e);
    console.error("🐩 Notion error at:", dayjs().format("YYYY-MM-DD HH:mm:ss"));
  }
};

const Cron_notion = cron({
  name: "cron_notion",
  pattern: Patterns.EVERY_30_MINUTES,
  run: run,
});

export default Cron_notion;
