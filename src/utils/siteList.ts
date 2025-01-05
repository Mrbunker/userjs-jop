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
}

export interface DomQuery_get {
  /** 检测是否提供播放
   * JAVMENU  收录视频，但是未提供在线播放资源
   */
  videoQuery?: string;

  subQuery?: string;
  leakQuery?: string;
}

interface SiteItemBase {
  name: string;

  /** [废弃] 用户定义的 disable */
  // disable: boolean;

  /** 在指定 LibItem.name 下不显示 */

  hostname: string;
  url: string;
  /** 部分站 CODE 格式不一样 */
  codeFormater?: (preCode: string) => string;
}

export interface SiteItem_get extends SiteItemBase {
  fetchType: "get";
  domQuery: DomQuery_get;
}

export interface SiteItem_parser extends SiteItemBase {
  fetchType: "parser";
  /** 严格匹配，会检查搜索结果的 code */
  strictParser?: true;
  domQuery: DomQuery_parser;
}
// export interface SiteItem_post extends SiteItemBase {
//   fetchType: "post";
//   postParams: Record<string, any>;
//   domQuery: DomQuery_parser;
// }

export type SiteItem = SiteItem_get | SiteItem_parser;

/** 在线网站列表 */
export const siteList: SiteItem[] = [
  {
    name: "Jable",
    hostname: "jable.tv",
    url: "https://jable.tv/videos/{{code}}/",
    fetchType: "get",
    domQuery: {
      subQuery: ".info-header",
      leakQuery: ".info-header",
    },
  },
  {
    name: "MISSAV",
    hostname: "missav.com",
    url: "https://missav.com/{{code}}/",
    fetchType: "get",
    domQuery: {
      // 标签区的第一个一般是字幕标签
      subQuery: '.space-y-2 a.text-nord13[href="https://missav.com/chinese-subtitle"]',
      // 有个「切換無碼」按钮，藏在分享按钮旁边……
      leakQuery: ".order-first div.rounded-md a[href]:last-child",
    },
  },
  {
    name: "MISSAV_",
    hostname: "missav123.com",
    url: "https://missav123.com/{{code}}/",
    fetchType: "get",
    domQuery: {
      // 标签区的第一个一般是字幕标签
      subQuery: '.space-y-2 a.text-nord13[href="https://missav123.com/chinese-subtitle"]',
      // 有个「切換無碼」按钮，藏在分享按钮旁边……
      leakQuery: ".order-first div.rounded-md a[href]:last-child",
    },
  },
  {
    name: "123av",
    hostname: "123av.com",
    url: "https://123av.com/zh/search?keyword={{code}}",
    fetchType: "parser",
    strictParser: true,
    domQuery: {
      linkQuery: `.detail>a[href*='v/']`,
      titleQuery: `.detail>a[href*='v/']`,
    },
  },
  {
    // 有可能搜出仨：leakage subtitle 4k
    name: "Supjav",
    hostname: "supjav.com",
    url: "https://supjav.com/zh/?s={{code}}",
    fetchType: "parser",
    domQuery: {
      linkQuery: `.posts.clearfix>.post>a.img[title]`,
      titleQuery: `h3>a[rel="bookmark"][itemprop="url"]`,
    },
  },
  {
    name: "NETFLAV",
    hostname: "netflav5.com",
    url: "https://netflav5.com/search?type=title&keyword={{code}}",
    fetchType: "parser",
    domQuery: {
      linkQuery: ".grid_0_cell>a[href^='/video?']",
      titleQuery: ".grid_0_cell>a[href^='/video?'] .grid_0_title",
    },
  },
  {
    name: "Avgle",
    hostname: "avgle.com",
    url: "https://avgle.com/search/videos?search_query={{code}}&search_type=videos",
    fetchType: "parser",
    domQuery: {
      linkQuery: ".container>.row .row .well>a[href]",
      titleQuery: ".container>.row .row .well .video-title",
    },
  },
  {
    name: "JAVHHH",
    hostname: "javhhh.com",
    url: "https://javhhh.com/v/?wd={{code}}",
    fetchType: "parser",
    domQuery: {
      linkQuery: ".typelist>.i-container>a[href]",
      titleQuery: ".typelist>.i-container>a[href]",
    },
  },
  {
    name: "BestJP",
    hostname: "bestjavporn.com",
    url: "https://www3.bestjavporn.com/search/{{code}}",
    fetchType: "parser",
    domQuery: { linkQuery: "article.thumb-block>a", titleQuery: "article.thumb-block>a" },
  },
  {
    name: "JAVMENU",
    hostname: "javmenu.com",
    url: "https://javmenu.com/{{code}}",
    fetchType: "get",
    domQuery: {
      videoQuery: "a.nav-link[aria-controls='pills-0']",
    },
    // codeFormater: (preCode) => preCode.replace("-", ""),
  },
  {
    name: "Jav.Guru",
    hostname: "jav.guru",
    url: "https://jav.guru/?s={{code}}",
    fetchType: "parser",
    domQuery: { linkQuery: ".imgg>a[href]", titleQuery: ".inside-article>.grid1 a[title]" },
  },
  {
    name: "JAVMOST",
    hostname: "javmost.cx",
    url: "https://javmost.cx/search/{{code}}/",
    fetchType: "parser",
    domQuery: {
      linkQuery: ".card #myButton",
      titleQuery: ".card-block h4.card-title",
    },
  },
  {
    name: "HAYAV",
    hostname: "hayav.com",
    url: "https://hayav.com/video/{{code}}/",
    fetchType: "get",
    domQuery: {
      // subQuery: `.site__col>.entry-header>h1.entry-title`,
    },
  },
  {
    name: "AvJoy",
    hostname: "avjoy.me",
    url: "https://avjoy.me/search/videos/{{code}}",
    fetchType: "parser",
    domQuery: {
      titleQuery: `#wrapper .row .content-info span.content-title`,
      linkQuery: `#wrapper .row a[href^="/video/"]`,
    },
  },
  {
    name: "JAVFC2",
    hostname: "javfc2.net",
    url: "https://javfc2.net/?s={{code}}",
    fetchType: "parser",
    domQuery: {
      linkQuery: "article.loop-video>a[href]",
      titleQuery: "article.loop-video .entry-header",
    },
  },
  {
    name: "baihuse",
    hostname: "paipancon.com",
    url: "https://paipancon.com/search/{{code}}",
    fetchType: "parser",
    domQuery: {
      linkQuery: "div.col>div.card>a[href]",
      // 然而这个不是 title，是图片，这个站居然 title 里不包含 code，反而图片包含
      titleQuery: "div.card img.card-img-top",
    },
  },
  {
    name: "GGJAV",
    hostname: "ggjav.com",
    url: "https://ggjav.com/main/search?string={{code}}",
    fetchType: "parser",
    domQuery: {
      listIndex: 1,
      // spaceCode: true,
      titleQuery: "div.columns.large-3.medium-6.small-12.item.float-left>div.item_title>a.gray_a",
      linkQuery: "div.columns.large-3.medium-6.small-12.item.float-left>div.item_title>a.gray_a",
    },
  },

  {
    name: "AV01",
    hostname: "www.av01.tv",
    url: "https://www.av01.tv/search/videos?search_query={{code}}",
    fetchType: "parser",
    domQuery: {
      linkQuery: "div.well>a[href^='/video/']",
      titleQuery: "div.well>a[href^='/video/']",
    },
  },
  {
    name: "18sex",
    hostname: "18sex.org",
    url: "https://www.18sex.org/cn/search/{{code}}/",
    fetchType: "parser",
    domQuery: { linkQuery: ".white_link[href]", titleQuery: ".white_link>.card-title" },
  },
  {
    name: "highporn",
    hostname: "highporn.net",
    url: "https://highporn.net/search/videos?search_query={{code}}",
    fetchType: "parser",
    domQuery: { linkQuery: ".well>a[href]", titleQuery: ".well>a[href]>span.video-title" },
  },
  {
    // 套了个 cf_clearance 的 cookie，不好搞
    name: "evojav",
    hostname: "evojav.pro",
    url: "https://evojav.pro/video/{{code}}/",
    fetchType: "get",
    domQuery: {},
  },
  {
    name: "18av",
    hostname: "18av.mm-cg.com",
    url: "https://18av.mm-cg.com/zh/fc_search/all/{{code}}/1.html",
    fetchType: "parser",
    domQuery: { linkQuery: ".posts h3>a[href]", titleQuery: ".posts h3>a[href]" },
  },
  {
    name: "javgo",
    hostname: "javgo.to",
    url: "https://javgo.to/zh/v/{{code}}",
    fetchType: "get",
    domQuery: {},
  },
  {
    name: "javhub",
    hostname: "javhub.net",
    url: "https://javhub.net/search/{{code}}",
    fetchType: "parser",
    domQuery: { linkQuery: "a.card-text[href*='play']", titleQuery: "a.card-text[href*='play']" },
  },
  {
    name: "JavBus",
    hostname: "javbus.com",
    url: "https://javbus.com/{{code}}",
    fetchType: "get",
    domQuery: {},
    codeFormater: (preCode) => (preCode.startsWith("MIUM") ? `${SP_PREFIX}${preCode}` : preCode),
  },
  {
    name: "JavDB",
    hostname: "javdb.com",
    url: "https://javdb.com/search?q={{code}}",
    fetchType: "parser",
    domQuery: {
      linkQuery: ".movie-list>.item:first-child>a",
      titleQuery: ".video-title",
    },
  },
  {
    name: "JAVLib",
    hostname: "javlibrary.com",
    url: "https://www.javlibrary.com/cn/vl_searchbyid.php?keyword={{code}}",
    fetchType: "parser",
    domQuery: {
      linkQuery: ".videothumblist .video[id]:first-child>a",
      titleQuery: ".videothumblist .video[id]:first-child>a>div.id",
    },
  },
];

/** bus 里有些以 '300MIUM' 开头，要处理掉这个 300 */
export const SP_PREFIX = "300" as const;
