import { defineConfig } from "vite";
import monkey, { cdn, MonkeyUserScript } from "vite-plugin-monkey";
import preact from "@preact/preset-vite";
import { siteList } from "./src/utils/siteList";

const connectList = siteList.map((site) => site.hostname).concat(["javdb007.com"]);

const UserscriptConfig: MonkeyUserScript = {
  author: "mission522",
  version: "1.1.4",
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
  description:
    "[高效寻找最佳的在线资源] 在影片详情页添加跳转在线播放的按钮，并注是否提供在线播放资源或无码资源、字幕资源等信息。支持 JavDB、JavBus 以及 JavLibrary",
  connect: connectList,
};

export default defineConfig({
  build: {},
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
