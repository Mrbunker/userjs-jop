import { defineConfig } from "vite";
import monkey, { cdn, MonkeyUserScript } from "vite-plugin-monkey";
import preact from "@preact/preset-vite";
import { siteList } from "./src/utils/siteList";

const connectList = siteList.map((site) => site.hostname).concat(["javdb008.com", "g64w.com"]);

const UserscriptConfig: MonkeyUserScript = {
  author: "mission522",
  version: "1.1.9",
  license: "MIT",
  name: "JAV 添加跳转在线观看",
  match: ["*://*/cn/?v=jav*"],
  include: [
    /^https?:\/\/(\w*\.)?javdb(\d)*\.com.*$/,
    /^https?:\/\/(\w*\.)?(javbus|seejav|javsee)*\.(com|cc|me|life).*$/,
    /^https?:\/\/(\w*\.)?(javlib|javlibrary)*\.com.*$/,
  ],
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
