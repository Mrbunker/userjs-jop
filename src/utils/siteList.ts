export interface DomQuery_parser {
  /** 部分网站搜索页结果第一个是广告，加入一个 index，来指定到固定的位置。
   * 点名：GGJAV
   */
  listIndex?: number;

  /** 大部分 code 格式是 `xxx-000`，还有一部分用空格 `xxx 000`。
   * 原来是点名 GGJAV 的
   */
  spaceCode?: boolean;

  /** a 标签 href 的 query */
  linkQuery: string;
  /** 在 title 里检测是否包含「字幕」等文本 */
  titleQuery: string;

  /** 检测有无字幕的方法
   * 点名：Jable
   */
  // checkMethod?: (pageDoc: Document) => { hasSubtitle?: boolean; hasLeakage?: boolean };
}

export interface DomQuery_get {
  /** 检测是否提供播放
   * 点名：JAVMENU  收录视频，但是未提供在线播放资源。
   * 点名：njav  资源没有但是非要返回 404
   */
  videoQuery?: string;

  subQuery?: string;
  leakQuery?: string;
}

interface SiteItemBase {
  name: string;

  /** [废弃] 用户定义的 disable */
  // disable: boolean;

  /** 在指定 LibItem.name 下不显示
   * 点名：都是针对的 matchList 里的三个，防止出现自己检索自己站。
   */
  disableLibItemName?: string;

  hostname: string;
  url: string;
  /** 部分站 CODE 格式不一样 */
  codeFormater?: (preCode: string) => string;
  /** 没用 */
  method?: Function;
}

export interface SiteItem_get extends SiteItemBase {
  fetcher: "get";
  domQuery: DomQuery_get;
}

export interface SiteItem_parser extends SiteItemBase {
  fetcher: "parser";
  domQuery: DomQuery_parser;
}

export type SiteItem = SiteItem_get | SiteItem_parser;

const print = (name: string) => {
  console.log(name);
};

/** 在线网站列表 */
export const siteList: SiteItem[] = [
  {
    name: "Jable",
    hostname: "jable.tv",
    url: "https://jable.tv/search/{{code}}/",
    fetcher: "parser",
    domQuery: {
      linkQuery: `.container .detail>.title>a`,
      titleQuery: `.container .detail>.title>a`,
      // checkMethod: () => ({}),
    },
    method: print,
  },
  {
    name: "MISSAV",
    hostname: "missav.com",
    url: "https://missav.com/{{code}}/",
    fetcher: "get",
    domQuery: {
      // 标签区的第一个一般是字幕标签
      subQuery: '.space-y-2 a.text-nord13[href="https://missav.com/chinese-subtitle"]',
      // 有个「切換無碼」按钮，藏在分享按钮旁边……
      leakQuery: ".order-first div.rounded-md a[href]:last-child",
    },
    method: print,
  },
  {
    name: "MISSAV_",
    hostname: "missav123.com",
    url: "https://missav123.com/{{code}}/",
    fetcher: "get",
    domQuery: {
      // 标签区的第一个一般是字幕标签
      subQuery: '.space-y-2 a.text-nord13[href="https://missav123.com/chinese-subtitle"]',
      // 有个「切換無碼」按钮，藏在分享按钮旁边……
      leakQuery: ".order-first div.rounded-md a[href]:last-child",
    },
    method: print,
  },
  {
    name: "njav",
    hostname: "njav.tv",
    url: "https://njav.tv/zh/v/{{code}}",
    fetcher: "get",
    domQuery: {
      videoQuery: "#player",
    },
    method: print,
  },
  {
    // 有可能搜出仨：leakage subtitle 4k
    name: "Supjav",
    hostname: "supjav.com",
    url: "https://supjav.com/zh/?s={{code}}",
    fetcher: "parser",
    domQuery: {
      linkQuery: `.posts.clearfix>.post>a.img[title]`,
      titleQuery: `h3>a[rel="bookmark"][itemprop="url"]`,
    },
    method: print,
  },
  {
    name: "NETFLAV",
    hostname: "netflav.com",
    url: "https://netflav.com/search?type=title&keyword={{code}}",
    fetcher: "parser",
    domQuery: {
      linkQuery: ".grid_cell>a",
      titleQuery: ".grid_cell>a>.grid_title",
    },
    method: print,
  },
  {
    name: "Avgle",
    hostname: "avgle.com",
    url: "https://avgle.com/search/videos?search_query={{code}}&search_type=videos",
    fetcher: "parser",
    domQuery: {
      linkQuery: ".container>.row .row .well>a[href]",
      titleQuery: ".container>.row .row .well .video-title",
    },
    method: print,
  },
  {
    name: "JAVHHH",
    hostname: "javhhh.com",
    url: "https://javhhh.com/v/?wd={{code}}",
    fetcher: "parser",
    domQuery: {
      linkQuery: ".typelist>.i-container>a[href]",
      titleQuery: ".typelist>.i-container>a[href]",
    },
    method: print,
  },
  {
    name: "BestJP",
    hostname: "bestjavporn.com",
    url: "https://www3.bestjavporn.com/search/{{code}}",
    fetcher: "parser",
    domQuery: { linkQuery: "article.thumb-block>a", titleQuery: "article.thumb-block>a" },
    method: print,
  },
  {
    name: "JAVMENU",
    hostname: "javmenu.com",
    url: "https://javmenu.com/{{code}}",
    fetcher: "get",
    domQuery: {
      videoQuery: "a.nav-link[aria-controls='pills-0']",
    },
    method: print,
    codeFormater: (preCode) => preCode.replace("-", ""),
  },
  {
    name: "Jav.Guru",
    hostname: "jav.guru",
    url: "https://jav.guru/?s={{code}}",
    fetcher: "parser",
    domQuery: { linkQuery: ".imgg>a[href]", titleQuery: ".inside-article>.grid1 a[title]" },
    method: print,
  },
  {
    name: "JAVMOST",
    hostname: "javmost.cx",
    url: "https://javmost.cx/search/{{code}}/",
    fetcher: "parser",
    domQuery: {
      linkQuery: "#content .card a#MyImage",
      titleQuery: "#content .card-block .card-title",
    },
    method: print,
  },
  {
    name: "HAYAV",
    hostname: "hayav.com",
    url: "https://hayav.com/video/{{code}}/",
    fetcher: "get",
    domQuery: {
      // subQuery: `.site__col>.entry-header>h1.entry-title`,
    },
    method: print,
  },
  {
    name: "AvJoy",
    hostname: "avjoy.me",
    url: "https://avjoy.me/search/video/{{code}}",
    fetcher: "parser",
    domQuery: {
      titleQuery: `.content-info>.content-title`,
      linkQuery: `.content-row>a`,
    },
    method: print,
  },
  {
    name: "JAVFC2",
    hostname: "javfc2.net",
    url: "https://javfc2.net/?s={{code}}",
    fetcher: "parser",
    domQuery: {
      linkQuery: "article.loop-video>a[href]",
      titleQuery: "article.loop-video .entry-header",
    },
    method: print,
  },
  {
    name: "baihuse",
    hostname: "paipancon.com",
    url: "https://paipancon.com/search/{{code}}",
    fetcher: "parser",
    domQuery: {
      linkQuery: "div.col>div.card>a[href]",
      // 然而这个不是 title，是图片，这个站居然 title 里不包含 code，反而图片包含
      titleQuery: "div.card img.card-img-top",
    },
    method: print,
  },
  {
    name: "GGJAV",
    hostname: "ggjav.com",
    url: "https://ggjav.com/main/search?string={{code}}",
    fetcher: "parser",
    domQuery: {
      listIndex: 1,
      // spaceCode: true,
      titleQuery: "div.columns.large-3.medium-6.small-12.item.float-left>div.item_title>a.gray_a",
      linkQuery: "div.columns.large-3.medium-6.small-12.item.float-left>div.item_title>a.gray_a",
    },
    method: print,
  },

  {
    name: "AV01",
    hostname: "av01.tv",
    url: "https://www.av01.tv/search/videos?search_query={{code}}",
    fetcher: "parser",
    domQuery: { linkQuery: "div[id].well-sm>a", titleQuery: ".video-views>.pull-left" },
    method: print,
  },
  {
    name: "18sex",
    hostname: "18sex.org",
    url: "https://www.18sex.org/cn/search/{{code}}/",
    fetcher: "parser",
    domQuery: { linkQuery: ".white_link[href]", titleQuery: ".white_link>.card-title" },
    method: print,
  },
  {
    name: "highporn",
    hostname: "highporn.net",
    url: "https://highporn.net/search/videos?search_query={{code}}",
    fetcher: "parser",
    domQuery: { linkQuery: ".well>a[href]", titleQuery: ".well>a[href]>span.video-title" },
    method: print,
  },
  {
    name: "JavBus",
    disableLibItemName: "javbus",
    hostname: "javbus.com",
    url: "https://javbus.com/{{code}}",
    fetcher: "get",
    domQuery: {},
    method: print,
  },
  {
    name: "JavDB",
    disableLibItemName: "javdb",
    hostname: "javdb.com",
    url: "https://javdb.com/search?q={{code}}",
    fetcher: "parser",
    domQuery: {
      linkQuery: ".movie-list>.item:first-child>a",
      titleQuery: ".video-title",
    },
    method: print,
  },
  {
    name: "JAVLib",
    disableLibItemName: "javlib",
    hostname: "javlibrary.com",
    url: "https://www.javlibrary.com/cn/vl_searchbyid.php?keyword={{code}}",
    fetcher: "parser",
    domQuery: {
      linkQuery: ".videothumblist .video[id]:first-child>a",
      titleQuery: ".videothumblist .video[id]:first-child>a>div.id",
    },
    method: print,
  },
];
