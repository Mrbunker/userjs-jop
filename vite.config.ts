import { defineConfig } from "vite";
import monkey, { MonkeyUserScript } from "vite-plugin-monkey";

const UserscriptConfig: MonkeyUserScript = {
  author: "mission522",
  version: "1.0.0",
  license: "MIT",
  name: "JAV 添加跳转在线观看 三合一",
  match: ["*://*.javdb.com/*", "*://*.javbus.com/*", "*://*.javlibrary.com/*"],
  include: /^https:\/\/(\w*\.)?javdb(\d)*\.com.*$/,
  icon: "https://javdb.com/favicon-32x32.png",
  namespace: "https://greasyfork.org/users/58790",
  description:
    "在 JavDB、JavBus、JavLibrart 网站的影片详情页添加跳转在线播放按钮，并在按钮上标注是否存在可播放资源，资源是否为「字幕」、「无码」等信息。",
  connect: [
    "jable.tv",
    "missav.com",
    "javhhh.com",
    "netflav.com",
    "avgle.com",
    "bestjavporn.com",
    "jav.guru",
    "javmost.cx",
    "hpjav.tv",
    "av01.tv",
    "javbus.com",
    "javmenu.com",
    "javfc2.net",
    "paipancon.com",
    "ggjav.com",
  ],
};

export default defineConfig({
  plugins: [
    monkey({
      entry: "src/index.ts",
      build: { fileName: "jop.user.js" },
      userscript: {
        ...UserscriptConfig,
      },
    }),
  ],
});
