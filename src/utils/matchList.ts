import { GM_getValue } from "$";

/** 当前 macth 站点对象 */
export type Cms = {
  name: "javdb" | "javbus" | "javlib";
  enable: boolean;
  href: RegExp;
  panelParentQueryStr: string;
  codeQueryStr: string;
  actorQueryStr: string;
  method: () => void;
};
export const matchList: Cms[] = [
  {
    name: "javdb",
    enable: true,
    href: /^https:\/\/(\w*\.)?javdb(\d)*\.com.*$/,
    panelParentQueryStr: ".video-meta-panel>.columns.is-desktop>.column:not(.column-video-cover)",
    codeQueryStr: `[data-clipboard-text]`,
    actorQueryStr: `span.value>a[href^="/actors"]`,
    method() {},
  },
  {
    name: "javbus",
    enable: true,
    // hostname: [
    //   "www.javbus.com",
    //   "www.seejav.one",
    //   "www.seejav.cc",
    //   "www.javsee.me",
    //   "www.javsee.in",
    // ],
    href: /^https?:\/\/(\w*\.)?(javbus|seejav|javsee)*\.(com|cc|me|life).*$/,
    panelParentQueryStr: ".movie>div.info",
    codeQueryStr: `span[style="color:#CC0000;"]`,
    actorQueryStr: `.genre>a`,
    method() {
      // panel 加宽
      /** 适配 jav 老司机 */
      const lsjCompatible = GM_getValue("lsjCompatible", false);
      if (lsjCompatible) return;

      const colmd9 = document.querySelector<HTMLElement>(".movie>.col-md-9.screencap");
      const colmd3 = document.querySelector<HTMLElement>(".movie>.col-md-3.info");
      colmd9?.classList.remove("col-md-9");
      colmd9?.classList.add("col-md-8");
      colmd3?.classList.remove("col-md-3");
      colmd3?.classList.add("col-md-4");
    },
  },
  {
    name: "javlib",
    enable: true,
    // hostname: ["www.javlibrary.com", "www.javlib.com"],
    href: /^https?:\/\/(\w*\.)?(javlib|javlibrary)*\.com.*$/,
    panelParentQueryStr: "#video_jacket_info #video_info",
    codeQueryStr: `#video_id td.text`,
    actorQueryStr: `.cast>.star>a`,
    method() {
      // const infoPanel = document.querySelectorAll( `#video_jacket_info td[style="vertical-align: top;"]`, )[1]; infoPanel?.classList.add("JOPAPP");
    },
  },
];
