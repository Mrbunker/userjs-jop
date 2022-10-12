import { defineConfig } from "vite";
import monkey, { cdn } from "vite-plugin-monkey";
import preact from "@preact/preset-vite";
import type { MonkeyUserScript } from "vite-plugin-monkey";

import { siteList } from "./src/utils/siteList";
const connectList = siteList.map((site) => site.hostname);

const UserscriptConfig: MonkeyUserScript = {
  author: "mission522",
  version: "1.0.4",
  license: "MIT",
  name: "JAV 添加跳转在线观看 三合一",
  match: [
    "*://*/cn/?v=jav*",
    // "*://*.javdb.com/*", "*://*.javbus.com/*", "*://*.seejav.com/*", "*://*.seejav.cc/*", "*://*.javsee.com/*", "*://*.javlib.com/*", "*://*.javlibrary.com/*",
  ],
  include: [
    /^https?:\/\/(\w*\.)?javdb(\d)*\.com.*$/,
    /^https?:\/\/(\w*\.)?(javbus|seejav|javsee)*\.(com|cc|me|life).*$/,
    /^https?:\/\/(\w*\.)?(javlib|javlibrary)*\.com.*$/,
  ],
  icon: "https://javdb.com/favicon-32x32.png",
  namespace: "https://greasyfork.org/zh-CN/scripts/429173",
  description:
    "在 JavDB、JavBus、JavLibrary 网站的影片详情页添加跳转在线播放按钮，并在按钮上标注是否支持在线播放、包含无码或包含字幕",
  connect: connectList,
};

export default defineConfig({
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
