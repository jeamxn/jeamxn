import type { Config } from "@react-router/dev/config";

export default {
  ssr: false,
  prerender: [
    "/",
    "/about",
    "/work/ara",
    "/work/dipull",
    "/work/pfct",
    "/work/multinet",
    "/work/ttililing",
    "/work/yun",
    "/resume",
  ],
} satisfies Config;
