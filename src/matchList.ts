export type Cms = {
  name: string;
  enable: boolean;
  hostname: string;
  panelParentQueryStr: string;
};
export const matchList: Cms[] = [
  {
    name: "javdb",
    enable: true,
    hostname: "javdb.com",
    panelParentQueryStr: "video-meta-panel",
  },
  {
    name: "javbus",
    enable: true,
    hostname: "www.javbus.com",
    panelParentQueryStr: "div.row.movie",
  },
  {
    name: "javlib",
    enable: true,
    hostname: "www.javlibrary.com",
    panelParentQueryStr: "#video_jacket_info",
  },
];
