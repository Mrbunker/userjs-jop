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
      const colmd8 = document.querySelector(".movie>.col-md-9.screencap");
      colmd8?.classList.remove("col-md-9");
      colmd8?.classList.add("col-md-8");
      const colmd4 = document.querySelector(".movie>.col-md-3.info");
      colmd4?.classList.remove("col-md-3");
      colmd4?.classList.add("col-md-4");
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
