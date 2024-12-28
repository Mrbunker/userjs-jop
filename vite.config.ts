import { defineConfig } from "vite";
import monkey, { cdn, MonkeyUserScript } from "vite-plugin-monkey";
import preact from "@preact/preset-vite";
import urlConfig from "./script/urlConfig";

const PARALLEL =
  "https://raw.githubusercontent.com/Tampermonkey/utils/refs/heads/main/requires/gh_2215_make_GM_xhr_more_parallel_again.js";

const UserscriptConfig: MonkeyUserScript = {
  author: "mission522",
  version: "1.2.6",
  license: "MIT",
  name: "JAV 添加跳转在线观看",
  icon: "https://javdb.com/favicon-32x32.png",
  namespace: "https://greasyfork.org/zh-CN/scripts/429173",
  description: "为 JavDB、JavBus、JavLibrary 这三个站点添加跳转在线观看的链接",
  ...urlConfig,
  require: [PARALLEL],
};

export default defineConfig({
  build: {
    minify: false,
    rollupOptions: {},
    // target:''
  },

  resolve: { alias: { "@": "/src/" } },
  esbuild: { charset: "utf8" },
  plugins: [
    preact(),
    monkey({
      entry: "src/main.tsx",
      build: {
        fileName: "jop.user.js",
        externalGlobals: {
          preact: cdn.jsdelivr("preact", "dist/preact.min.js"),
        },
      },
      userscript: UserscriptConfig,
    }),
  ],
});
