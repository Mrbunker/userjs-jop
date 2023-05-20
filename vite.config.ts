import { defineConfig } from "vite";
import monkey, { cdn, MonkeyUserScript } from "vite-plugin-monkey";
import preact from "@preact/preset-vite";
import { siteList } from "./src/utils/siteList";
import { libSites } from "./src/utils/libSites";

const connectList = siteList.map((site) => site.hostname).concat(["javdb008.com", "g64w.com"]);

const includeList = libSites.map((libItem) => libItem.href);

const UserscriptConfig: MonkeyUserScript = {
  author: "mission522",
  version: "1.1.13",
  license: "MIT",
  name: "JAV 添加跳转在线观看",
  match: ["*://*/cn/?v=jav*"],
  include: includeList,
  icon: "https://javdb.com/favicon-32x32.png",
  namespace: "https://greasyfork.org/zh-CN/scripts/429173",
  description: "为 JavDB、JavBus、JavLibrary 这三个站点添加跳转在线观看的链接",
  connect: connectList,
};

export default defineConfig({
  build: {
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
