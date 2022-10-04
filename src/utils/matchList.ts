/** 当前 macth 站点对象 */
export type Cms = {
  name: "javdb" | "javbus" | "javlib";
  enable: boolean;
  hostname: string;
  panelParentQueryStr: string;
  codeQueryStr: string;
  actorQueryStr: string;
  method: () => void;
};
export const matchList: Cms[] = [
  {
    name: "javdb",
    enable: true,
    hostname: "javdb.com",
    panelParentQueryStr: ".video-meta-panel>.columns.is-desktop>.column:not(.column-video-cover)",
    codeQueryStr: `span[style="color:#CC0000;"]`,
    actorQueryStr: `span.value>a[href^="/actors"]`,
    method() {},
  },
  {
    name: "javbus",
    enable: true,
    hostname: "www.javbus.com",
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
    hostname: "www.javlibrary.com",
    panelParentQueryStr: "#video_jacket_info",
    codeQueryStr: `#video_id td.text`,
    actorQueryStr: `.cast>.star>a`,
    method() {},
  },
];
