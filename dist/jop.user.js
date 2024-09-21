// ==UserScript==
// @name         JAV 添加跳转在线观看
// @namespace    https://greasyfork.org/zh-CN/scripts/429173
// @version      1.2.0
// @author       mission522
// @description  为 JavDB、JavBus、JavLibrary 这三个站点添加跳转在线观看的链接
// @license      MIT
// @icon         https://javdb.com/favicon-32x32.png
// @include      /^https?:\/\/(\w*\.)?javdb(\d)*\.com\/v.*$/
// @include      /^https?:\/\/(\w*\.)?(javbus|seejav|javsee)*\.(com|cc|me|life|bid).*$/
// @include      /^http.*\/cn\/\?v=jav.*$/
// @require      https://cdn.jsdelivr.net/npm/preact@10.22.0/dist/preact.min.js
// @connect      jable.tv
// @connect      missav.com
// @connect      missav123.com
// @connect      njav.tv
// @connect      supjav.com
// @connect      netflav5.com
// @connect      avgle.com
// @connect      javhhh.com
// @connect      bestjavporn.com
// @connect      javmenu.com
// @connect      jav.guru
// @connect      javmost.cx
// @connect      hayav.com
// @connect      avjoy.me
// @connect      javfc2.net
// @connect      paipancon.com
// @connect      ggjav.com
// @connect      www.av01.tv
// @connect      18sex.org
// @connect      highporn.net
// @connect      evojav.pro
// @connect      18av.mm-cg.com
// @connect      javgo.to
// @connect      javbus.com
// @connect      javdb.com
// @connect      javlibrary.com
// @connect      javdb368.com
// @connect      javdb369.com
// @connect      g64w.com
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// ==/UserScript==

((o) => {
  if (typeof GM_addStyle == "function") {
    GM_addStyle(o);
    return;
  }
  const e = document.createElement("style");
  (e.textContent = o), document.head.append(e);
})(
  ' .jop-list{box-sizing:border-box;display:flex;flex-wrap:wrap;justify-content:flex-start;gap:10px;width:100%;height:100%;z-index:1;transition:right .2s ease-in-out;color:#000}.jop-button,.jop-button_def{position:relative;display:flex;align-items:center;justify-content:center;box-sizing:border-box;padding:3px 10px;border-radius:4px;font-weight:500;font-size:14px;border:1px solid #dcdfe6;color:#606266;cursor:pointer}.jop-button_def{margin:10px 0;width:100px}.jop-button:visited{color:#606266}.jop-button:hover{text-decoration:none;color:#409eff;border:1px solid #c6e2ff;background-color:#ecf5ff}.jop-button_label{position:absolute;font-size:10px;padding:4px;border-radius:4px;top:-13px;right:-10px;line-height:.75;color:#67c23a;border:1px solid #e1f3d8;background:white}.jop-button_green{color:#fff!important;background-color:#67c23a}.jop-button_green:hover{color:#fff!important;background-color:#95d475}.jop-button_red{color:#fff!important;background-color:#f56c6c}.jop-button_red:hover{color:#fff!important;background-color:#f89898}.jop-loading{display:inline-block;width:14px;height:14px;margin-right:10px;border:2px dashed #dcdfe6;border-top-color:transparent;border-radius:100%;animation:btnLoading infinite 1s linear}@keyframes btnLoading{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.jop-tag{padding:3px 6px;color:#409eff!important;background:#ecf5ff;border:1px solid #d9ecff;border-radius:4px}.jop-setting{margin-top:20px}.jop-setting-list{display:flex;flex-wrap:wrap}.jop-setting-title{margin:10px 0 5px;font-weight:700}.jop-setting-item{display:flex;height:20px;align-items:center;margin-right:15px;-webkit-user-select:none;user-select:none;cursor:pointer}.db-panel .movie-panel-info div.panel-block{padding:5.5px 12px}.db-panel .jop-app{padding:15px 12px}.lib-panel .jop-app{padding:20px 30px;margin-top:10px}input[type=checkbox],input[type=radio]{margin:0 0 0 5px;cursor:pointer}.jop-tooltip-container{position:relative;display:inline-block}.jop-tooltip{position:absolute;bottom:100%;left:50%;transform:translate(-50%);background-color:#333;color:#fff;padding:5px 10px;border-radius:4px;font-size:12px;white-space:nowrap;z-index:1000}.jop-setting-label{cursor:pointer}.jop-checkbox{display:inline-flex;align-items:center;cursor:pointer;margin-right:15px;-webkit-user-select:none;user-select:none}.jop-checkbox-input{position:absolute;opacity:0;cursor:pointer}.jop-checkbox-custom{position:relative;display:inline-block;width:16px;height:16px;background-color:#fff;border:1px solid #dcdfe6;border-radius:2px;transition:all .3s}.jop-checkbox-input:checked+.jop-checkbox-custom{background-color:#409eff;border-color:#409eff}.jop-checkbox-input:checked+.jop-checkbox-custom:after{content:"";position:absolute;top:1px;left:4px;width:5px;height:10px;border:solid white;border-width:0 2px 2px 0;transform:rotate(45deg)}.jop-checkbox-label{margin-left:3px;font-size:14px;color:#606266}.jop-checkbox:hover .jop-checkbox-custom{border-color:#409eff} ',
);

(function (preact) {
  "use strict";

  const libSites = [
    {
      name: "javdb",
      enable: true,
      href: /^https?:\/\/(\w*\.)?javdb(\d)*\.com\/v.*$/,
      querys: {
        panelQueryStr: ".video-meta-panel>.columns.is-desktop .panel.movie-panel-info",
        codeQueryStr: `[data-clipboard-text]`,
      },
      method() {
        const columnVideoCover = document.querySelector(".column-video-cover");
        if (columnVideoCover) {
          columnVideoCover.style.width = "60%";
        }
        const panel = document.querySelector(
          ".video-meta-panel>.columns.is-desktop>.column:not(.column-video-cover)",
        );
        panel == null ? void 0 : panel.classList.add("db-panel");
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
        const panel = document.querySelector("#video_info");
        panel == null ? void 0 : panel.classList.add("lib-panel");
      },
    },
  ];
  var _GM_getValue = /* @__PURE__ */ (() =>
    typeof GM_getValue != "undefined" ? GM_getValue : void 0)();
  var _GM_setValue = /* @__PURE__ */ (() =>
    typeof GM_setValue != "undefined" ? GM_setValue : void 0)();
  var _GM_xmlhttpRequest = /* @__PURE__ */ (() =>
    typeof GM_xmlhttpRequest != "undefined" ? GM_xmlhttpRequest : void 0)();
  const siteList = [
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
      name: "njav",
      hostname: "njav.tv",
      url: "https://njav.tv/zh/v/{{code}}",
      fetchType: "get",
      domQuery: {
        videoQuery: "#player",
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
        linkQuery: ".grid_cell>a",
        titleQuery: ".grid_cell>a>.grid_title",
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
      domQuery: {
        linkQuery: "article.thumb-block>a",
        titleQuery: "article.thumb-block>a",
      },
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
      domQuery: {
        linkQuery: ".imgg>a[href]",
        titleQuery: ".inside-article>.grid1 a[title]",
      },
    },
    {
      name: "JAVMOST",
      hostname: "javmost.cx",
      url: "https://javmost.cx/search/{{code}}/",
      fetchType: "parser",
      domQuery: {
        linkQuery: "#content .card a#MyImage",
        titleQuery: "#content .card-block .card-title",
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
        linkQuery: "div[id].well-sm>a",
        titleQuery: ".video-views>.pull-left",
      },
    },
    {
      name: "18sex",
      hostname: "18sex.org",
      url: "https://www.18sex.org/cn/search/{{code}}/",
      fetchType: "parser",
      domQuery: {
        linkQuery: ".white_link[href]",
        titleQuery: ".white_link>.card-title",
      },
    },
    {
      name: "highporn",
      hostname: "highporn.net",
      url: "https://highporn.net/search/videos?search_query={{code}}",
      fetchType: "parser",
      domQuery: {
        linkQuery: ".well>a[href]",
        titleQuery: ".well>a[href]>span.video-title",
      },
    },
    {
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
      domQuery: {
        linkQuery: ".posts h3>a[href]",
        titleQuery: ".posts h3>a[href]",
      },
    },
    {
      name: "javgo",
      hostname: "javgo.to",
      url: "https://javgo.to/zh/v/{{code}}",
      fetchType: "get",
      domQuery: {},
    },
    {
      name: "JavBus",
      disableLibItemName: "javbus",
      hostname: "javbus.com",
      url: "https://javbus.com/{{code}}",
      fetchType: "get",
      domQuery: {},
      codeFormater: (preCode) => (preCode.startsWith("MIUM") ? `${SP_PREFIX}${preCode}` : preCode),
    },
    {
      name: "JavDB",
      disableLibItemName: "javdb",
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
      disableLibItemName: "javlib",
      hostname: "javlibrary.com",
      url: "https://www.javlibrary.com/cn/vl_searchbyid.php?keyword={{code}}",
      fetchType: "parser",
      domQuery: {
        linkQuery: ".videothumblist .video[id]:first-child>a",
        titleQuery: ".videothumblist .video[id]:first-child>a>div.id",
      },
    },
  ];
  const SP_PREFIX = "300";
  const gmGet = ({ url }) => {
    return new Promise((resolve, reject) => {
      _GM_xmlhttpRequest({
        method: "GET",
        url,
        onload: (response) => resolve(response),
        onerror: (error) => reject(error),
      });
    });
  };
  const isCaseInsensitiveEqual = (str1, str2) => {
    return str1.toLowerCase() === str2.toLowerCase();
  };
  const isErrorCode = (resCode) => {
    return [404, 403].includes(resCode);
  };
  const getCode = (libItem) => {
    const { codeQueryStr } = libItem.querys;
    const codeNode = document.querySelector(codeQueryStr);
    if (!codeNode) return "";
    const codeText =
      libItem.name === "javdb"
        ? codeNode.dataset.clipboardText
        : codeNode.innerText.replace("复制", "");
    if (codeText.includes("FC2")) return codeText.split("-")[1];
    if (codeText.startsWith(SP_PREFIX)) return codeText.substring(3);
    return codeText;
  };
  const regEnum = {
    subtitle: /(中文|字幕|subtitle)/,
    leakage: /(无码|無碼|泄漏|Uncensored)/,
  };
  const tagsQuery = ({ leakageText, subtitleText }) => {
    const hasLeakage = regEnum.leakage.test(leakageText);
    const hasSubtitle = regEnum.subtitle.test(subtitleText);
    const tags = [];
    if (hasLeakage) tags.push("无码");
    if (hasSubtitle) tags.push("字幕");
    return tags.join(" ");
  };
  var t,
    r,
    u$1,
    i,
    o = 0,
    f$1 = [],
    c = [],
    e = preact.options,
    a = e.__b,
    v = e.__r,
    l = e.diffed,
    m = e.__c,
    s = e.unmount,
    d = e.__;
  function h(n, t2) {
    e.__h && e.__h(r, n, o || t2), (o = 0);
    var u2 = r.__H || (r.__H = { __: [], __h: [] });
    return n >= u2.__.length && u2.__.push({ __V: c }), u2.__[n];
  }
  function p(n) {
    return (o = 1), y(D$1, n);
  }
  function y(n, u2, i2) {
    var o2 = h(t++, 2);
    if (
      ((o2.t = n),
      !o2.__c &&
        ((o2.__ = [
          i2 ? i2(u2) : D$1(void 0, u2),
          function (n2) {
            var t2 = o2.__N ? o2.__N[0] : o2.__[0],
              r2 = o2.t(t2, n2);
            t2 !== r2 && ((o2.__N = [r2, o2.__[1]]), o2.__c.setState({}));
          },
        ]),
        (o2.__c = r),
        !r.u))
    ) {
      var f2 = function (n2, t2, r2) {
        if (!o2.__c.__H) return true;
        var u3 = o2.__c.__H.__.filter(function (n3) {
          return !!n3.__c;
        });
        if (
          u3.every(function (n3) {
            return !n3.__N;
          })
        )
          return !c2 || c2.call(this, n2, t2, r2);
        var i3 = false;
        return (
          u3.forEach(function (n3) {
            if (n3.__N) {
              var t3 = n3.__[0];
              (n3.__ = n3.__N), (n3.__N = void 0), t3 !== n3.__[0] && (i3 = true);
            }
          }),
          !(!i3 && o2.__c.props === n2) && (!c2 || c2.call(this, n2, t2, r2))
        );
      };
      r.u = true;
      var c2 = r.shouldComponentUpdate,
        e2 = r.componentWillUpdate;
      (r.componentWillUpdate = function (n2, t2, r2) {
        if (this.__e) {
          var u3 = c2;
          (c2 = void 0), f2(n2, t2, r2), (c2 = u3);
        }
        e2 && e2.call(this, n2, t2, r2);
      }),
        (r.shouldComponentUpdate = f2);
    }
    return o2.__N || o2.__;
  }
  function _(n, u2) {
    var i2 = h(t++, 3);
    !e.__s && C$1(i2.__H, u2) && ((i2.__ = n), (i2.i = u2), r.__H.__h.push(i2));
  }
  function j() {
    for (var n; (n = f$1.shift()); )
      if (n.__P && n.__H)
        try {
          n.__H.__h.forEach(z$1), n.__H.__h.forEach(B$1), (n.__H.__h = []);
        } catch (t2) {
          (n.__H.__h = []), e.__e(t2, n.__v);
        }
  }
  (e.__b = function (n) {
    (r = null), a && a(n);
  }),
    (e.__ = function (n, t2) {
      n && t2.__k && t2.__k.__m && (n.__m = t2.__k.__m), d && d(n, t2);
    }),
    (e.__r = function (n) {
      v && v(n), (t = 0);
      var i2 = (r = n.__c).__H;
      i2 &&
        (u$1 === r
          ? ((i2.__h = []),
            (r.__h = []),
            i2.__.forEach(function (n2) {
              n2.__N && (n2.__ = n2.__N), (n2.__V = c), (n2.__N = n2.i = void 0);
            }))
          : (i2.__h.forEach(z$1), i2.__h.forEach(B$1), (i2.__h = []), (t = 0))),
        (u$1 = r);
    }),
    (e.diffed = function (n) {
      l && l(n);
      var t2 = n.__c;
      t2 &&
        t2.__H &&
        (t2.__H.__h.length &&
          ((1 !== f$1.push(t2) && i === e.requestAnimationFrame) ||
            ((i = e.requestAnimationFrame) || w)(j)),
        t2.__H.__.forEach(function (n2) {
          n2.i && (n2.__H = n2.i), n2.__V !== c && (n2.__ = n2.__V), (n2.i = void 0), (n2.__V = c);
        })),
        (u$1 = r = null);
    }),
    (e.__c = function (n, t2) {
      t2.some(function (n2) {
        try {
          n2.__h.forEach(z$1),
            (n2.__h = n2.__h.filter(function (n3) {
              return !n3.__ || B$1(n3);
            }));
        } catch (r2) {
          t2.some(function (n3) {
            n3.__h && (n3.__h = []);
          }),
            (t2 = []),
            e.__e(r2, n2.__v);
        }
      }),
        m && m(n, t2);
    }),
    (e.unmount = function (n) {
      s && s(n);
      var t2,
        r2 = n.__c;
      r2 &&
        r2.__H &&
        (r2.__H.__.forEach(function (n2) {
          try {
            z$1(n2);
          } catch (n3) {
            t2 = n3;
          }
        }),
        (r2.__H = void 0),
        t2 && e.__e(t2, r2.__v));
    });
  var k = "function" == typeof requestAnimationFrame;
  function w(n) {
    var t2,
      r2 = function () {
        clearTimeout(u2), k && cancelAnimationFrame(t2), setTimeout(n);
      },
      u2 = setTimeout(r2, 100);
    k && (t2 = requestAnimationFrame(r2));
  }
  function z$1(n) {
    var t2 = r,
      u2 = n.__c;
    "function" == typeof u2 && ((n.__c = void 0), u2()), (r = t2);
  }
  function B$1(n) {
    var t2 = r;
    (n.__c = n.__()), (r = t2);
  }
  function C$1(n, t2) {
    return (
      !n ||
      n.length !== t2.length ||
      t2.some(function (t3, r2) {
        return t3 !== n[r2];
      })
    );
  }
  function D$1(n, t2) {
    return "function" == typeof t2 ? t2(n) : t2;
  }
  function g(n, t2) {
    for (var e2 in t2) n[e2] = t2[e2];
    return n;
  }
  function E(n, t2) {
    for (var e2 in n) if ("__source" !== e2 && !(e2 in t2)) return true;
    for (var r2 in t2) if ("__source" !== r2 && n[r2] !== t2[r2]) return true;
    return false;
  }
  function C(n, t2) {
    (this.props = n), (this.context = t2);
  }
  function x(n, e2) {
    function r2(n2) {
      var t2 = this.props.ref,
        r3 = t2 == n2.ref;
      return (
        !r3 && t2 && (t2.call ? t2(null) : (t2.current = null)),
        e2 ? !e2(this.props, n2) || !r3 : E(this.props, n2)
      );
    }
    function u2(e3) {
      return (this.shouldComponentUpdate = r2), preact.createElement(n, e3);
    }
    return (
      (u2.displayName = "Memo(" + (n.displayName || n.name) + ")"),
      (u2.prototype.isReactComponent = true),
      (u2.__f = true),
      u2
    );
  }
  ((C.prototype = new preact.Component()).isPureReactComponent = true),
    (C.prototype.shouldComponentUpdate = function (n, t2) {
      return E(this.props, n) || E(this.state, t2);
    });
  var R = preact.options.__b;
  preact.options.__b = function (n) {
    n.type && n.type.__f && n.ref && ((n.props.ref = n.ref), (n.ref = null)), R && R(n);
  };
  var M = preact.options.__e;
  preact.options.__e = function (n, t2, e2, r2) {
    if (n.then) {
      for (var u2, o2 = t2; (o2 = o2.__); )
        if ((u2 = o2.__c) && u2.__c)
          return null == t2.__e && ((t2.__e = e2.__e), (t2.__k = e2.__k)), u2.__c(n, t2);
    }
    M(n, t2, e2, r2);
  };
  var T = preact.options.unmount;
  function A(n, t2, e2) {
    return (
      n &&
        (n.__c &&
          n.__c.__H &&
          (n.__c.__H.__.forEach(function (n2) {
            "function" == typeof n2.__c && n2.__c();
          }),
          (n.__c.__H = null)),
        null != (n = g({}, n)).__c && (n.__c.__P === e2 && (n.__c.__P = t2), (n.__c = null)),
        (n.__k =
          n.__k &&
          n.__k.map(function (n2) {
            return A(n2, t2, e2);
          }))),
      n
    );
  }
  function D(n, t2, e2) {
    return (
      n &&
        e2 &&
        ((n.__v = null),
        (n.__k =
          n.__k &&
          n.__k.map(function (n2) {
            return D(n2, t2, e2);
          })),
        n.__c &&
          n.__c.__P === t2 &&
          (n.__e && e2.appendChild(n.__e), (n.__c.__e = true), (n.__c.__P = e2))),
      n
    );
  }
  function L() {
    (this.__u = 0), (this.t = null), (this.__b = null);
  }
  function O(n) {
    var t2 = n.__.__c;
    return t2 && t2.__a && t2.__a(n);
  }
  function U() {
    (this.u = null), (this.o = null);
  }
  (preact.options.unmount = function (n) {
    var t2 = n.__c;
    t2 && t2.__R && t2.__R(), t2 && 32 & n.__u && (n.type = null), T && T(n);
  }),
    ((L.prototype = new preact.Component()).__c = function (n, t2) {
      var e2 = t2.__c,
        r2 = this;
      null == r2.t && (r2.t = []), r2.t.push(e2);
      var u2 = O(r2.__v),
        o2 = false,
        i2 = function () {
          o2 || ((o2 = true), (e2.__R = null), u2 ? u2(l2) : l2());
        };
      e2.__R = i2;
      var l2 = function () {
        if (!--r2.__u) {
          if (r2.state.__a) {
            var n2 = r2.state.__a;
            r2.__v.__k[0] = D(n2, n2.__c.__P, n2.__c.__O);
          }
          var t3;
          for (r2.setState({ __a: (r2.__b = null) }); (t3 = r2.t.pop()); ) t3.forceUpdate();
        }
      };
      r2.__u++ || 32 & t2.__u || r2.setState({ __a: (r2.__b = r2.__v.__k[0]) }), n.then(i2, i2);
    }),
    (L.prototype.componentWillUnmount = function () {
      this.t = [];
    }),
    (L.prototype.render = function (n, e2) {
      if (this.__b) {
        if (this.__v.__k) {
          var r2 = document.createElement("div"),
            o2 = this.__v.__k[0].__c;
          this.__v.__k[0] = A(this.__b, r2, (o2.__O = o2.__P));
        }
        this.__b = null;
      }
      var i2 = e2.__a && preact.createElement(preact.Fragment, null, n.fallback);
      return (
        i2 && (i2.__u &= -33),
        [preact.createElement(preact.Fragment, null, e2.__a ? null : n.children), i2]
      );
    });
  var V = function (n, t2, e2) {
    if (
      (++e2[1] === e2[0] && n.o.delete(t2),
      n.props.revealOrder && ("t" !== n.props.revealOrder[0] || !n.o.size))
    )
      for (e2 = n.u; e2; ) {
        for (; e2.length > 3; ) e2.pop()();
        if (e2[1] < e2[0]) break;
        n.u = e2 = e2[2];
      }
  };
  ((U.prototype = new preact.Component()).__a = function (n) {
    var t2 = this,
      e2 = O(t2.__v),
      r2 = t2.o.get(n);
    return (
      r2[0]++,
      function (u2) {
        var o2 = function () {
          t2.props.revealOrder ? (r2.push(u2), V(t2, n, r2)) : u2();
        };
        e2 ? e2(o2) : o2();
      }
    );
  }),
    (U.prototype.render = function (n) {
      (this.u = null), (this.o = /* @__PURE__ */ new Map());
      var t2 = preact.toChildArray(n.children);
      n.revealOrder && "b" === n.revealOrder[0] && t2.reverse();
      for (var e2 = t2.length; e2--; ) this.o.set(t2[e2], (this.u = [1, 0, this.u]));
      return n.children;
    }),
    (U.prototype.componentDidUpdate = U.prototype.componentDidMount =
      function () {
        var n = this;
        this.o.forEach(function (t2, e2) {
          V(n, e2, t2);
        });
      });
  var z = ("undefined" != typeof Symbol && Symbol.for && Symbol.for("react.element")) || 60103,
    B =
      /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/,
    H = /^on(Ani|Tra|Tou|BeforeInp|Compo)/,
    Z = /[A-Z0-9]/g,
    Y = "undefined" != typeof document,
    $ = function (n) {
      return (
        "undefined" != typeof Symbol && "symbol" == typeof Symbol() ? /fil|che|rad/ : /fil|che|ra/
      ).test(n);
    };
  (preact.Component.prototype.isReactComponent = {}),
    ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function (
      t2,
    ) {
      Object.defineProperty(preact.Component.prototype, t2, {
        configurable: true,
        get: function () {
          return this["UNSAFE_" + t2];
        },
        set: function (n) {
          Object.defineProperty(this, t2, { configurable: true, writable: true, value: n });
        },
      });
    });
  var J = preact.options.event;
  function K() {}
  function Q() {
    return this.cancelBubble;
  }
  function X() {
    return this.defaultPrevented;
  }
  preact.options.event = function (n) {
    return (
      J && (n = J(n)),
      (n.persist = K),
      (n.isPropagationStopped = Q),
      (n.isDefaultPrevented = X),
      (n.nativeEvent = n)
    );
  };
  var tn = {
      enumerable: false,
      configurable: true,
      get: function () {
        return this.class;
      },
    },
    en = preact.options.vnode;
  preact.options.vnode = function (n) {
    "string" == typeof n.type &&
      (function (n2) {
        var t2 = n2.props,
          e2 = n2.type,
          u2 = {};
        for (var o2 in t2) {
          var i2 = t2[o2];
          if (
            !(
              ("value" === o2 && "defaultValue" in t2 && null == i2) ||
              (Y && "children" === o2 && "noscript" === e2) ||
              "class" === o2 ||
              "className" === o2
            )
          ) {
            var l2 = o2.toLowerCase();
            "defaultValue" === o2 && "value" in t2 && null == t2.value
              ? (o2 = "value")
              : "download" === o2 && true === i2
              ? (i2 = "")
              : "translate" === l2 && "no" === i2
              ? (i2 = false)
              : "ondoubleclick" === l2
              ? (o2 = "ondblclick")
              : "onchange" !== l2 || ("input" !== e2 && "textarea" !== e2) || $(t2.type)
              ? "onfocus" === l2
                ? (o2 = "onfocusin")
                : "onblur" === l2
                ? (o2 = "onfocusout")
                : H.test(o2)
                ? (o2 = l2)
                : -1 === e2.indexOf("-") && B.test(o2)
                ? (o2 = o2.replace(Z, "-$&").toLowerCase())
                : null === i2 && (i2 = void 0)
              : (l2 = o2 = "oninput"),
              "oninput" === l2 && u2[(o2 = l2)] && (o2 = "oninputCapture"),
              (u2[o2] = i2);
          }
        }
        "select" == e2 &&
          u2.multiple &&
          Array.isArray(u2.value) &&
          (u2.value = preact.toChildArray(t2.children).forEach(function (n3) {
            n3.props.selected = -1 != u2.value.indexOf(n3.props.value);
          })),
          "select" == e2 &&
            null != u2.defaultValue &&
            (u2.value = preact.toChildArray(t2.children).forEach(function (n3) {
              n3.props.selected = u2.multiple
                ? -1 != u2.defaultValue.indexOf(n3.props.value)
                : u2.defaultValue == n3.props.value;
            })),
          t2.class && !t2.className
            ? ((u2.class = t2.class), Object.defineProperty(u2, "className", tn))
            : ((t2.className && !t2.class) || (t2.class && t2.className)) &&
              (u2.class = u2.className = t2.className),
          (n2.props = u2);
      })(n),
      (n.$$typeof = z),
      en && en(n);
  };
  var rn = preact.options.__r;
  preact.options.__r = function (n) {
    rn && rn(n), n.__c;
  };
  var un = preact.options.diffed;
  preact.options.diffed = function (n) {
    un && un(n);
    var t2 = n.props,
      e2 = n.__e;
    null != e2 &&
      "textarea" === n.type &&
      "value" in t2 &&
      t2.value !== e2.value &&
      (e2.value = null == t2.value ? "" : t2.value);
  };
  var f = 0;
  function u(e2, t2, n, o2, i2, u2) {
    t2 || (t2 = {});
    var a2,
      c2,
      p2 = t2;
    if ("ref" in p2) for (c2 in ((p2 = {}), t2)) "ref" == c2 ? (a2 = t2[c2]) : (p2[c2] = t2[c2]);
    var l2 = {
      type: e2,
      props: p2,
      key: n,
      ref: a2,
      __k: null,
      __: null,
      __b: 0,
      __e: null,
      __d: void 0,
      __c: null,
      constructor: void 0,
      __v: --f,
      __i: -1,
      __u: 0,
      __source: i2,
      __self: u2,
    };
    if ("function" == typeof e2 && (a2 = e2.defaultProps))
      for (c2 in a2) void 0 === p2[c2] && (p2[c2] = a2[c2]);
    return preact.options.vnode && preact.options.vnode(l2), l2;
  }
  const Tooltip = ({ content, children }) => {
    const [isVisible, setIsVisible] = p(false);
    return u("div", {
      className: "jop-tooltip-container",
      onMouseEnter: () => setIsVisible(true),
      onMouseLeave: () => setIsVisible(false),
      children: [
        children,
        isVisible &&
          content &&
          u("div", {
            className: "jop-tooltip",
            children: content,
          }),
      ],
    });
  };
  const Checkbox = ({ label, value, tip, onChange }) => {
    const handleChange = (event) => {
      onChange(event.currentTarget.checked);
    };
    return u("label", {
      className: "jop-checkbox",
      children: [
        u("input", {
          type: "checkbox",
          className: "jop-checkbox-input",
          checked: value,
          onChange: handleChange,
        }),
        u("span", {
          className: "jop-checkbox-custom",
        }),
        u(Tooltip, {
          content: tip || "",
          children: u("span", {
            className: "jop-checkbox-label",
            children: label,
          }),
        }),
      ],
    });
  };
  const Setting = ({
    siteList: siteList2,
    setDisables,
    disables,
    multipleNavi,
    setMultipleNavi,
  }) => {
    const [showSetting, setShowSetting] = p(true);
    const hanleListChange = (item, isHidden) => {
      if (isHidden) {
        setDisables(disables.filter((disItem) => disItem !== item.name));
      } else {
        setDisables([...disables, item.name]);
      }
    };
    const handleNaviChange = (checked) => {
      setMultipleNavi(checked);
      _GM_setValue("multipleNavi", checked);
    };
    return u(preact.Fragment, {
      children: [
        !showSetting &&
          u("div", {
            className: "jop-button_def",
            onClick: () => setShowSetting(!showSetting),
            children: "设置",
          }),
        showSetting &&
          u(preact.Fragment, {
            children: [
              u("div", {
                className: "jop-setting",
                children: [
                  u(Group, {
                    title: "勾选默认展示",
                    children: siteList2.map((item) => {
                      const isHidden = disables.includes(item.name);
                      return u(Checkbox, {
                        label: item.name,
                        value: !isHidden,
                        onChange: (checked) => hanleListChange(item, checked),
                      });
                    }),
                  }),
                  u(Group, {
                    title: "其他设置",
                    children: u(Checkbox, {
                      label: "展示多个搜索结果",
                      value: multipleNavi,
                      tip: "一个站点内出现多条匹配结果时，打开后跳转搜索结果页",
                      onChange: handleNaviChange,
                    }),
                  }),
                ],
              }),
              u("div", {
                className: "jop-button_def",
                onClick: () => {
                  setShowSetting(!showSetting);
                },
                children: "收起设置",
              }),
            ],
          }),
      ],
    });
  };
  const Group = ({ title, children }) => {
    return u(preact.Fragment, {
      children: [
        u("h4", {
          className: "jop-setting-title",
          children: title,
        }),
        u("div", {
          className: "jop-setting-list",
          children,
        }),
      ],
    });
  };
  function videoPageParser(responseText, { subQuery, leakQuery, videoQuery }) {
    const doc = new DOMParser().parseFromString(responseText, "text/html");
    const subNode = subQuery ? doc.querySelector(subQuery) : "";
    const subNodeText = subNode ? subNode.innerHTML : "";
    const leakNode = leakQuery ? doc.querySelector(leakQuery) : null;
    const linkNodeText = leakNode ? leakNode.innerHTML : "";
    const videoNode = videoQuery ? doc.querySelector(videoQuery) : true;
    return {
      isSuccess: !!videoNode,
      tag: tagsQuery({
        leakageText: linkNodeText,
        subtitleText: subNodeText,
      }),
    };
  }
  function serachPageParser(
    responseText,
    { linkQuery, titleQuery, listIndex = 0 },
    siteHostName,
    CODE,
    searchPageLink,
  ) {
    const doc = new DOMParser().parseFromString(responseText, "text/html");
    const titleNodes = titleQuery ? doc.querySelectorAll(titleQuery) : [];
    const linkNodes = linkQuery ? doc.querySelectorAll(linkQuery) : [];
    const titleNode = titleNodes[listIndex];
    const linkNode = linkNodes[listIndex];
    const titleNodeText = titleNode ? (titleNode == null ? void 0 : titleNode.outerHTML) : "";
    const codeRegex = /[a-zA-Z]{3,5}-\d{3,5}/;
    const matchCode = titleNodeText.match(codeRegex);
    const isSuccess =
      linkNode && titleNode && matchCode && isCaseInsensitiveEqual(matchCode[0], CODE);
    if (!isSuccess) {
      return {
        isSuccess: false,
      };
    }
    const targetLinkText = linkNode.href.replace(linkNode.hostname, siteHostName);
    return {
      isSuccess: true,
      targetLink: targetLinkText,
      multipResLink: searchPageLink,
      multipleRes: titleNodes.length > 1,
      tag: tagsQuery({
        leakageText: titleNodeText,
        subtitleText: titleNodeText,
      }),
    };
  }
  const baseFetcher = async ({ siteItem, targetLink, CODE }) => {
    try {
      const response = await gmGet({
        url: targetLink,
      });
      if (isErrorCode(response.status)) {
        throw Error(String(response.status));
      }
      if (siteItem.fetchType === "get") {
        return {
          ...videoPageParser(response.responseText, siteItem.domQuery),
          targetLink,
        };
      } else {
        return {
          ...serachPageParser(
            response.responseText,
            siteItem.domQuery,
            siteItem.hostname,
            CODE,
            targetLink,
          ),
        };
      }
    } catch (error) {
      return {
        isSuccess: false,
        targetLink,
      };
    }
  };
  const javbleFetcher = async (args) => {
    const res = await baseFetcher(args);
    if (res.isSuccess) return res;
    const newLink = args.targetLink.slice(0, -1) + "-c/";
    return await baseFetcher({
      ...args,
      targetLink: newLink,
    });
  };
  const fetcher = (args) => {
    if (args.siteItem.name === "Jable") {
      return javbleFetcher(args);
    }
    return baseFetcher(args);
  };
  const SiteBtn = x(({ siteItem, CODE, multipleNavi }) => {
    const { name, codeFormater } = siteItem;
    const formatCode = codeFormater ? codeFormater(CODE) : CODE;
    const link = siteItem.url.replace("{{code}}", formatCode);
    const [status, setStatus] = p({
      isSuccess: "pedding",
      tag: "",
      resultLink: "",
    });
    const { isSuccess, tag, resultLink } = status;
    _(() => {
      fetcher({
        siteItem,
        targetLink: link,
        CODE: formatCode,
      }).then((res) => {
        const resultLink2 = multipleNavi && res.multipleRes ? res.multipResLink : res.targetLink;
        setStatus({
          isSuccess: res.isSuccess ? "fulfilled" : "rejected",
          tag: multipleNavi && res.multipleRes ? "多结果" : res.tag,
          resultLink: resultLink2,
        });
      });
    }, [fetcher, siteItem, CODE, link, multipleNavi]);
    const colorClass =
      isSuccess === "pedding"
        ? " "
        : isSuccess === "fulfilled"
        ? "jop-button_green "
        : "jop-button_red ";
    return u("a", {
      className: "jop-button " + colorClass,
      target: "_blank",
      href: resultLink === "" ? link : resultLink,
      children: [
        tag &&
          u("div", {
            className: "jop-button_label",
            children: tag,
          }),
        u("span", {
          children: name,
        }),
      ],
    });
  });
  const App = x(function ({ libItem, CODE }) {
    const DEF_DIS = [
      ...["AvJoy", "baihuse", "GGJAV", "AV01", "18sex", "highporn"],
      ...["JavBus", "JavDB", "JAVLib", "MISSAV_"],
    ];
    const [disables, setDisables] = p(_GM_getValue("disable", DEF_DIS));
    const [multipleNavi, setMultipleNavi] = p(_GM_getValue("multipleNavi", true));
    return u(preact.Fragment, {
      children: [
        u("div", {
          class: "jop-list",
          children: siteList
            .filter(
              (siteItem) =>
                !disables.includes(siteItem.name) && libItem.name !== siteItem.disableLibItemName,
            )
            .map((siteItem) =>
              u(
                SiteBtn,
                {
                  siteItem,
                  CODE,
                  multipleNavi,
                },
                siteItem.name,
              ),
            ),
        }),
        u(Setting, {
          siteList,
          setDisables: (disable) => {
            setDisables(disable);
            _GM_setValue("disable", disable);
          },
          multipleNavi,
          setMultipleNavi: (multipleNavi2) => {
            setMultipleNavi(multipleNavi2);
            _GM_setValue("multipleNavi", multipleNavi2);
          },
          disables,
        }),
      ],
    });
  });
  function main() {
    const libItem = libSites.find((item) => item.href.test(window.location.href));
    if (!libItem) {
      console.error("||脚本挂载错误");
      return;
    }
    const CODE = getCode(libItem);
    libItem.method();
    const panel = document.querySelector(libItem.querys.panelQueryStr);
    if (!panel) {
      console.error("||脚本挂载错误");
      return;
    }
    const app = document.createElement("div");
    app.classList.add("jop-app");
    panel.append(app);
    preact.render(
      u(App, {
        libItem,
        CODE,
      }),
      app,
    );
    console.log("||脚本挂载成功", CODE);
  }
  main();
})(preact);
