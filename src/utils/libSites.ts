/** 当前 macth 站点对象 */
export type LibItem = {
  name: "javdb" | "javbus" | "javlib";
  enable: boolean;
  href: RegExp;
  querys: {
    panelQueryStr: string;
    codeQueryStr: string;
  };
  method: () => void;
};

/** 需要匹配的图书馆站点列表 */
export const libSites: LibItem[] = [
  {
    name: "javdb",
    enable: true,
    href: /^https?:\/\/(\w*\.)?javdb(\d)*\.com.*$/,
    querys: {
      panelQueryStr: ".video-meta-panel>.columns.is-desktop .panel.movie-panel-info",
      codeQueryStr: `[data-clipboard-text]`,
    },
    method() {
      // 一些样式调整
      const columnVideoCover = document.querySelector<HTMLElement>(
        ".column-video-cover",
      ) as HTMLElement;
      columnVideoCover.style.width = "60%";
      const panel = document.querySelector<HTMLElement>(
        ".video-meta-panel>.columns.is-desktop>.column:not(.column-video-cover)",
      ) as HTMLElement;
      panel.classList.add("db-panel");
    },
  },
  {
    name: "javbus",
    enable: true,
    href: /^https?:\/\/(\w*\.)?(javbus|seejav|javsee)*\.(com|cc|me|life|bid).*$/,
    querys: {
      panelQueryStr: ".movie>div.info",
      codeQueryStr: `span[style="color:#CC0000;"]`,
    },
    method() {},
  },
  {
    name: "javlib",
    enable: true,
    href: /^http.*\/cn\/\?v=jav.*$/,
    querys: {
      panelQueryStr: "#video_jacket_info #video_info",
      codeQueryStr: `#video_id td.text`,
    },
    method() {
      const panel = document.querySelector<HTMLElement>("#video_info") as HTMLElement;
      panel.classList.add("lib-panel");
    },
  },
];
