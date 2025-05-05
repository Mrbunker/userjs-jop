// ==UserScript==
// @name         JAV 添加跳转在线观看
// @namespace    https://greasyfork.org/zh-CN/scripts/429173
// @version      1.2.11
// @author       mission522
// @description  为 JavDB、JavBus、JavLibrary 这三个站点添加跳转在线观看的链接
// @license      MIT
// @icon         https://javdb.com/favicon-32x32.png
// @include      /^https?:\/\/(\w*\.)?javdb(\d)*\.com\/v.*$/
// @include      /^https?:\/\/(\w*\.)?(javbus|seejav|javsee)*\.(com|cc|me|life|bid).*$/
// @include      /^https?:\/\/(\w*\.)?javlibrary\.com.*$/
// @include      /^http.*\/cn\/\?v=jav.*$/
// @match        *://*.app.javdb457.com/*
// @match        *://*.javdb457.com/*
// @match        *://*.javdb.com/*
// @match        *://*.v90f.com/*
// @require      https://update.greasyfork.org/scripts/522123/1511104/tampermonkey%20parallel.js
// @require      https://cdn.jsdelivr.net/npm/preact@10.25.4/dist/preact.min.js
// @connect      dmm.co.jp
// @connect      jable.tv
// @connect      missav.ws
// @connect      123av.com
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
// @connect      javhub.net
// @connect      javbus.com
// @connect      javdb.com
// @connect      javlibrary.com
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(o=>{if(typeof GM_addStyle=="function"){GM_addStyle(o);return}const e=document.createElement("style");e.textContent=o,document.head.append(e)})(' .jop-list{box-sizing:border-box;display:flex;flex-wrap:wrap;justify-content:flex-start;gap:10px;width:100%;height:100%;z-index:1;transition:right .2s ease-in-out;color:#000}.jop-button,.jop-button_def{position:relative;display:flex;align-items:center;justify-content:center;box-sizing:border-box;padding:3px 10px;border-radius:4px;font-weight:500;font-size:14px;border:1px solid #dcdfe6;color:#606266;cursor:pointer}.jop-button_def{margin:10px 0;width:100px}.jop-button:visited{color:#606266}.jop-button:hover{text-decoration:none;color:#409eff;border:1px solid #c6e2ff;background-color:#ecf5ff}.jop-button_label{position:absolute;font-size:10px;padding:4px;border-radius:4px;top:-13px;right:-10px;line-height:.75;color:#67c23a;border:1px solid #e1f3d8;background:#fff}.jop-button_green{color:#fff!important;background-color:#67c23a}.jop-button_green:hover{color:#fff!important;background-color:#95d475}.jop-button_red{color:#fff!important;background-color:#f56c6c}.jop-button_red:hover{color:#fff!important;background-color:#f89898}.jop-loading{display:inline-block;width:14px;height:14px;margin-right:10px;border:2px dashed #dcdfe6;border-top-color:transparent;border-radius:100%;animation:btnLoading infinite 1s linear}@keyframes btnLoading{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.jop-tag{padding:3px 6px;color:#409eff!important;background:#ecf5ff;border:1px solid #d9ecff;border-radius:4px}.jop-setting{margin-top:20px}.jop-setting-list{display:flex;flex-wrap:wrap}.jop-setting-title{margin:10px 0 5px;font-weight:700}.jop-setting-item{display:flex;height:20px;align-items:center;margin-right:15px;-webkit-user-select:none;user-select:none;cursor:pointer}.db-panel .movie-panel-info div.panel-block{padding:5.5px 12px}.db-panel .jop-app{padding:15px 12px}.lib-panel .jop-app{padding:20px 30px;margin-top:10px}input[type=checkbox],input[type=radio]{margin:0 0 0 5px;cursor:pointer}.jop-tooltip-container{position:relative;display:inline-block}.jop-tooltip{position:absolute;bottom:100%;left:50%;transform:translate(-50%);background-color:#333;color:#fff;padding:5px 10px;border-radius:4px;font-size:12px;white-space:nowrap;z-index:1000}.jop-setting-label{cursor:pointer}.jop-checkbox{display:inline-flex;align-items:center;cursor:pointer;margin-right:15px;-webkit-user-select:none;user-select:none}.jop-checkbox-input{position:absolute;opacity:0;cursor:pointer}.jop-checkbox-custom{position:relative;display:inline-block;width:16px;height:16px;background-color:#fff;border:1px solid #dcdfe6;border-radius:2px;transition:all .3s}.jop-checkbox-input:checked+.jop-checkbox-custom{background-color:#409eff;border-color:#409eff}.jop-checkbox-input:checked+.jop-checkbox-custom:after{content:"";position:absolute;top:1px;left:4px;width:5px;height:10px;border:solid white;border-width:0 2px 2px 0;transform:rotate(45deg)}.jop-checkbox-label{margin-left:3px;font-size:14px;color:#606266}.jop-checkbox:hover .jop-checkbox-custom{border-color:#409eff} ');

(function (preact) {
  'use strict';

  var f$1 = 0;
  function u$1(e2, t2, n, o2, i2, u2) {
    t2 || (t2 = {});
    var a2, c2, p2 = t2;
    if ("ref" in p2) for (c2 in p2 = {}, t2) "ref" == c2 ? a2 = t2[c2] : p2[c2] = t2[c2];
    var l2 = { type: e2, props: p2, key: n, ref: a2, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --f$1, __i: -1, __u: 0, __source: i2, __self: u2 };
    if ("function" == typeof e2 && (a2 = e2.defaultProps)) for (c2 in a2) void 0 === p2[c2] && (p2[c2] = a2[c2]);
    return preact.options.vnode && preact.options.vnode(l2), l2;
  }
  const libSites = [
    {
      name: "javdb",
      enable: true,
      identifier: "a[href*='javdb']",
      querys: {
        panelQueryStr: ".video-meta-panel>.columns.is-desktop .panel.movie-panel-info",
        codeQueryStr: `[data-clipboard-text]`
      },
      method() {
        const columnVideoCover = document.querySelector(".column-video-cover");
        if (columnVideoCover) {
          columnVideoCover.style.width = "60%";
        }
        const panel = document.querySelector(
          ".video-meta-panel>.columns.is-desktop>.column:not(.column-video-cover)"
        );
        panel == null ? void 0 : panel.classList.add("db-panel");
      }
    },
    {
      name: "javbus",
      enable: true,
      identifier: "a[href*='javbus']",
      querys: {
        panelQueryStr: ".movie>div.info",
        codeQueryStr: `span[style="color:#CC0000;"]`
      },
      method() {
      }
    },
    {
      name: "javlib",
      enable: true,
      identifier: "img[src*='logo-top']",
      querys: {
        panelQueryStr: "#video_jacket_info #video_info",
        codeQueryStr: `#video_id td.text`
      },
      method() {
        const panel = document.querySelector("#video_info");
        panel == null ? void 0 : panel.classList.add("lib-panel");
      }
    }
  ];
  var _GM_getValue = /* @__PURE__ */ (() => typeof GM_getValue != "undefined" ? GM_getValue : void 0)();
  var _GM_setValue = /* @__PURE__ */ (() => typeof GM_setValue != "undefined" ? GM_setValue : void 0)();
  var _GM_xmlhttpRequest = /* @__PURE__ */ (() => typeof GM_xmlhttpRequest != "undefined" ? GM_xmlhttpRequest : void 0)();
  const siteList = [
    {
      name: "FANZA 動画",
      hostname: "dmm.co.jp",
      url: "https://www.dmm.co.jp/digital/videoa/-/detail/=/cid={{code}}/",
      // url: "https://video.dmm.co.jp/av/list/?key={{code}}",
      fetchType: "get",
      codeFormater: (preCode) => {
        const [pre, num] = preCode.split("-");
        const padNum = num.padStart(5, "0");
        if (pre.toLowerCase().startsWith("start")) {
          return `1${pre.toLowerCase()}${padNum}`;
        }
        return `${pre}${padNum}`;
      },
      domQuery: {}
    },
    {
      name: "Jable",
      hostname: "jable.tv",
      url: "https://jable.tv/videos/{{code}}/",
      fetchType: "get",
      domQuery: {
        subQuery: ".info-header",
        leakQuery: ".info-header"
      }
    },
    {
      name: "MISSAV",
      hostname: "missav.ws",
      url: "https://missav.ws/{{code}}/",
      fetchType: "get",
      domQuery: {
        // 标签区的第一个一般是字幕标签
        subQuery: '.space-y-2 a.text-nord13[href="https://missav.ws/chinese-subtitle"]',
        // 有个「切換無碼」按钮，藏在分享按钮旁边……
        leakQuery: ".order-first div.rounded-md a[href]:last-child"
      }
    },
    {
      name: "123av",
      hostname: "123av.com",
      url: "https://123av.com/zh/search?keyword={{code}}",
      fetchType: "parser",
      strictParser: true,
      domQuery: {
        linkQuery: `.detail>a[href*='v/']`,
        titleQuery: `.detail>a[href*='v/']`
      }
    },
    {
      // 有可能搜出仨：leakage subtitle 4k
      name: "Supjav",
      hostname: "supjav.com",
      url: "https://supjav.com/zh/?s={{code}}",
      fetchType: "parser",
      domQuery: {
        linkQuery: `.posts.clearfix>.post>a.img[title]`,
        titleQuery: `h3>a[rel="bookmark"][itemprop="url"]`
      }
    },
    {
      name: "NETFLAV",
      hostname: "netflav5.com",
      url: "https://netflav5.com/search?type=title&keyword={{code}}",
      fetchType: "parser",
      domQuery: {
        linkQuery: ".grid_0_cell>a[href^='/video?']",
        titleQuery: ".grid_0_cell>a[href^='/video?'] .grid_0_title"
      }
    },
    {
      name: "Avgle",
      hostname: "avgle.com",
      url: "https://avgle.com/search/videos?search_query={{code}}&search_type=videos",
      fetchType: "parser",
      domQuery: {
        linkQuery: ".container>.row .row .well>a[href]",
        titleQuery: ".container>.row .row .well .video-title"
      }
    },
    {
      name: "JAVHHH",
      hostname: "javhhh.com",
      url: "https://javhhh.com/v/?wd={{code}}",
      fetchType: "parser",
      domQuery: {
        linkQuery: ".typelist>.i-container>a[href]",
        titleQuery: ".typelist>.i-container>a[href]"
      }
    },
    {
      name: "BestJP",
      hostname: "bestjavporn.com",
      url: "https://www3.bestjavporn.com/search/{{code}}",
      fetchType: "parser",
      domQuery: { linkQuery: "article.thumb-block>a", titleQuery: "article.thumb-block>a" }
    },
    {
      name: "JAVMENU",
      hostname: "javmenu.com",
      url: "https://javmenu.com/{{code}}",
      fetchType: "get",
      domQuery: {
        videoQuery: "a.nav-link[aria-controls='pills-0']"
      }
      // codeFormater: (preCode) => preCode.replace("-", ""),
    },
    {
      name: "Jav.Guru",
      hostname: "jav.guru",
      url: "https://jav.guru/?s={{code}}",
      fetchType: "parser",
      domQuery: { linkQuery: ".imgg>a[href]", titleQuery: ".inside-article>.grid1 a[title]" }
    },
    {
      name: "JAVMOST",
      hostname: "javmost.cx",
      url: "https://javmost.cx/search/{{code}}/",
      fetchType: "parser",
      domQuery: {
        linkQuery: ".card #myButton",
        titleQuery: ".card-block h4.card-title"
      }
    },
    {
      name: "HAYAV",
      hostname: "hayav.com",
      url: "https://hayav.com/video/{{code}}/",
      fetchType: "get",
      domQuery: {
        // subQuery: `.site__col>.entry-header>h1.entry-title`,
      }
    },
    {
      name: "AvJoy",
      hostname: "avjoy.me",
      url: "https://avjoy.me/search/videos/{{code}}",
      fetchType: "parser",
      domQuery: {
        titleQuery: `#wrapper .row .content-info span.content-title`,
        linkQuery: `#wrapper .row a[href^="/video/"]`
      }
    },
    {
      name: "JAVFC2",
      hostname: "javfc2.net",
      url: "https://javfc2.net/?s={{code}}",
      fetchType: "parser",
      domQuery: {
        linkQuery: "article.loop-video>a[href]",
        titleQuery: "article.loop-video .entry-header"
      }
    },
    {
      name: "baihuse",
      hostname: "paipancon.com",
      url: "https://paipancon.com/search/{{code}}",
      fetchType: "parser",
      domQuery: {
        linkQuery: "div.col>div.card>a[href]",
        // 然而这个不是 title，是图片，这个站居然 title 里不包含 code，反而图片包含
        titleQuery: "div.card img.card-img-top"
      }
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
        linkQuery: "div.columns.large-3.medium-6.small-12.item.float-left>div.item_title>a.gray_a"
      }
    },
    {
      name: "AV01",
      hostname: "www.av01.tv",
      url: "https://www.av01.tv/search/videos?search_query={{code}}",
      fetchType: "parser",
      domQuery: {
        linkQuery: "div.well>a[href^='/video/']",
        titleQuery: "div.well>a[href^='/video/']"
      }
    },
    {
      name: "18sex",
      hostname: "18sex.org",
      url: "https://www.18sex.org/cn/search/{{code}}/",
      fetchType: "parser",
      domQuery: { linkQuery: ".white_link[href]", titleQuery: ".white_link>.card-title" }
    },
    {
      name: "highporn",
      hostname: "highporn.net",
      url: "https://highporn.net/search/videos?search_query={{code}}",
      fetchType: "parser",
      domQuery: { linkQuery: ".well>a[href]", titleQuery: ".well>a[href]>span.video-title" }
    },
    {
      // 套了个 cf_clearance 的 cookie，不好搞
      name: "evojav",
      hostname: "evojav.pro",
      url: "https://evojav.pro/video/{{code}}/",
      fetchType: "get",
      domQuery: {}
    },
    {
      name: "18av",
      hostname: "18av.mm-cg.com",
      url: "https://18av.mm-cg.com/zh/fc_search/all/{{code}}/1.html",
      fetchType: "parser",
      domQuery: { linkQuery: ".posts h3>a[href]", titleQuery: ".posts h3>a[href]" }
    },
    {
      name: "javgo",
      hostname: "javgo.to",
      url: "https://javgo.to/zh/v/{{code}}",
      fetchType: "get",
      domQuery: {}
    },
    {
      name: "javhub",
      hostname: "javhub.net",
      url: "https://javhub.net/search/{{code}}",
      fetchType: "parser",
      domQuery: { linkQuery: "a.card-text[href*='play']", titleQuery: "a.card-text[href*='play']" }
    },
    {
      name: "JavBus",
      hostname: "javbus.com",
      url: "https://javbus.com/{{code}}",
      fetchType: "get",
      domQuery: {},
      codeFormater: (preCode) => preCode.startsWith("MIUM") ? `${SP_PREFIX}${preCode}` : preCode
    },
    {
      name: "JavDB",
      hostname: "javdb.com",
      url: "https://javdb.com/search?q={{code}}",
      fetchType: "parser",
      domQuery: {
        linkQuery: ".movie-list>.item:first-child>a",
        titleQuery: ".video-title"
      }
    },
    {
      name: "JAVLib",
      hostname: "javlibrary.com",
      url: "https://www.javlibrary.com/cn/vl_searchbyid.php?keyword={{code}}",
      fetchType: "false"
      // domQuery: {
      //   linkQuery: ".videothumblist .video[id]:first-child>a",
      //   titleQuery: ".videothumblist .video[id]:first-child>a>div.id",
      // },
    }
  ];
  const SP_PREFIX = "300";
  const gmGet = ({ url }) => {
    return new Promise((resolve, reject) => {
      _GM_xmlhttpRequest({
        method: "GET",
        url,
        onload: (response) => resolve(response),
        onerror: (error) => reject(error)
      });
    });
  };
  const isCaseInsensitiveEqual = (str1, str2) => {
    if (!str1 || !str2) return false;
    return str1.toLowerCase() === str2.toLowerCase();
  };
  const isErrorCode = (resCode) => {
    return [404, 403].includes(resCode);
  };
  const getCode = (libItem) => {
    const { codeQueryStr } = libItem.querys;
    const codeNode = document.querySelector(codeQueryStr);
    if (!codeNode) return "";
    const codeText = libItem.name === "javdb" ? codeNode.dataset.clipboardText : codeNode.innerText.replace("复制", "");
    if (codeText.includes("FC2")) return codeText.split("-")[1];
    if (codeText.startsWith(SP_PREFIX)) return codeText.substring(3);
    return codeText;
  };
  const regEnum = {
    subtitle: /(中文|字幕|subtitle)/,
    leakage: /(无码|無碼|泄漏|泄露|Uncensored)/
  };
  const tagsQuery = ({
    leakageText,
    subtitleText
  }) => {
    const hasLeakage = regEnum.leakage.test(leakageText);
    const hasSubtitle = regEnum.subtitle.test(subtitleText);
    const tags = [];
    if (hasLeakage) tags.push("无码");
    if (hasSubtitle) tags.push("字幕");
    return tags.join(" ");
  };
  var t, r, u, i, o = 0, f = [], c = preact.options, e = c.__b, a = c.__r, v = c.diffed, l = c.__c, m = c.unmount, s = c.__;
  function d(n, t2) {
    c.__h && c.__h(r, n, o || t2), o = 0;
    var u2 = r.__H || (r.__H = { __: [], __h: [] });
    return n >= u2.__.length && u2.__.push({}), u2.__[n];
  }
  function h(n) {
    return o = 1, p(D, n);
  }
  function p(n, u2, i2) {
    var o2 = d(t++, 2);
    if (o2.t = n, !o2.__c && (o2.__ = [D(void 0, u2), function(n2) {
      var t2 = o2.__N ? o2.__N[0] : o2.__[0], r2 = o2.t(t2, n2);
      t2 !== r2 && (o2.__N = [r2, o2.__[1]], o2.__c.setState({}));
    }], o2.__c = r, !r.u)) {
      var f2 = function(n2, t2, r2) {
        if (!o2.__c.__H) return true;
        var u3 = o2.__c.__H.__.filter(function(n3) {
          return !!n3.__c;
        });
        if (u3.every(function(n3) {
          return !n3.__N;
        })) return !c2 || c2.call(this, n2, t2, r2);
        var i3 = o2.__c.props !== n2;
        return u3.forEach(function(n3) {
          if (n3.__N) {
            var t3 = n3.__[0];
            n3.__ = n3.__N, n3.__N = void 0, t3 !== n3.__[0] && (i3 = true);
          }
        }), c2 && c2.call(this, n2, t2, r2) || i3;
      };
      r.u = true;
      var c2 = r.shouldComponentUpdate, e2 = r.componentWillUpdate;
      r.componentWillUpdate = function(n2, t2, r2) {
        if (this.__e) {
          var u3 = c2;
          c2 = void 0, f2(n2, t2, r2), c2 = u3;
        }
        e2 && e2.call(this, n2, t2, r2);
      }, r.shouldComponentUpdate = f2;
    }
    return o2.__N || o2.__;
  }
  function y(n, u2) {
    var i2 = d(t++, 3);
    !c.__s && C(i2.__H, u2) && (i2.__ = n, i2.i = u2, r.__H.__h.push(i2));
  }
  function j$1() {
    for (var n; n = f.shift(); ) if (n.__P && n.__H) try {
      n.__H.__h.forEach(z), n.__H.__h.forEach(B$1), n.__H.__h = [];
    } catch (t2) {
      n.__H.__h = [], c.__e(t2, n.__v);
    }
  }
  c.__b = function(n) {
    r = null, e && e(n);
  }, c.__ = function(n, t2) {
    n && t2.__k && t2.__k.__m && (n.__m = t2.__k.__m), s && s(n, t2);
  }, c.__r = function(n) {
    a && a(n), t = 0;
    var i2 = (r = n.__c).__H;
    i2 && (u === r ? (i2.__h = [], r.__h = [], i2.__.forEach(function(n2) {
      n2.__N && (n2.__ = n2.__N), n2.i = n2.__N = void 0;
    })) : (i2.__h.forEach(z), i2.__h.forEach(B$1), i2.__h = [], t = 0)), u = r;
  }, c.diffed = function(n) {
    v && v(n);
    var t2 = n.__c;
    t2 && t2.__H && (t2.__H.__h.length && (1 !== f.push(t2) && i === c.requestAnimationFrame || ((i = c.requestAnimationFrame) || w)(j$1)), t2.__H.__.forEach(function(n2) {
      n2.i && (n2.__H = n2.i), n2.i = void 0;
    })), u = r = null;
  }, c.__c = function(n, t2) {
    t2.some(function(n2) {
      try {
        n2.__h.forEach(z), n2.__h = n2.__h.filter(function(n3) {
          return !n3.__ || B$1(n3);
        });
      } catch (r2) {
        t2.some(function(n3) {
          n3.__h && (n3.__h = []);
        }), t2 = [], c.__e(r2, n2.__v);
      }
    }), l && l(n, t2);
  }, c.unmount = function(n) {
    m && m(n);
    var t2, r2 = n.__c;
    r2 && r2.__H && (r2.__H.__.forEach(function(n2) {
      try {
        z(n2);
      } catch (n3) {
        t2 = n3;
      }
    }), r2.__H = void 0, t2 && c.__e(t2, r2.__v));
  };
  var k = "function" == typeof requestAnimationFrame;
  function w(n) {
    var t2, r2 = function() {
      clearTimeout(u2), k && cancelAnimationFrame(t2), setTimeout(n);
    }, u2 = setTimeout(r2, 100);
    k && (t2 = requestAnimationFrame(r2));
  }
  function z(n) {
    var t2 = r, u2 = n.__c;
    "function" == typeof u2 && (n.__c = void 0, u2()), r = t2;
  }
  function B$1(n) {
    var t2 = r;
    n.__c = n.__(), r = t2;
  }
  function C(n, t2) {
    return !n || n.length !== t2.length || t2.some(function(t3, r2) {
      return t3 !== n[r2];
    });
  }
  function D(n, t2) {
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
  function N(n, t2) {
    this.props = n, this.context = t2;
  }
  function M(n, e2) {
    function r2(n2) {
      var t2 = this.props.ref, r3 = t2 == n2.ref;
      return !r3 && t2 && (t2.call ? t2(null) : t2.current = null), E(this.props, n2);
    }
    function u2(e3) {
      return this.shouldComponentUpdate = r2, preact.createElement(n, e3);
    }
    return u2.displayName = "Memo(" + (n.displayName || n.name) + ")", u2.prototype.isReactComponent = true, u2.__f = true, u2;
  }
  (N.prototype = new preact.Component()).isPureReactComponent = true, N.prototype.shouldComponentUpdate = function(n, t2) {
    return E(this.props, n) || E(this.state, t2);
  };
  var T = preact.options.__b;
  preact.options.__b = function(n) {
    n.type && n.type.__f && n.ref && (n.props.ref = n.ref, n.ref = null), T && T(n);
  };
  var F = preact.options.__e;
  preact.options.__e = function(n, t2, e2, r2) {
    if (n.then) {
      for (var u2, o2 = t2; o2 = o2.__; ) if ((u2 = o2.__c) && u2.__c) return null == t2.__e && (t2.__e = e2.__e, t2.__k = e2.__k), u2.__c(n, t2);
    }
    F(n, t2, e2, r2);
  };
  var U = preact.options.unmount;
  function V(n, t2, e2) {
    return n && (n.__c && n.__c.__H && (n.__c.__H.__.forEach(function(n2) {
      "function" == typeof n2.__c && n2.__c();
    }), n.__c.__H = null), null != (n = g({}, n)).__c && (n.__c.__P === e2 && (n.__c.__P = t2), n.__c = null), n.__k = n.__k && n.__k.map(function(n2) {
      return V(n2, t2, e2);
    })), n;
  }
  function W(n, t2, e2) {
    return n && e2 && (n.__v = null, n.__k = n.__k && n.__k.map(function(n2) {
      return W(n2, t2, e2);
    }), n.__c && n.__c.__P === t2 && (n.__e && e2.appendChild(n.__e), n.__c.__e = true, n.__c.__P = e2)), n;
  }
  function P() {
    this.__u = 0, this.o = null, this.__b = null;
  }
  function j(n) {
    var t2 = n.__.__c;
    return t2 && t2.__a && t2.__a(n);
  }
  function B() {
    this.i = null, this.l = null;
  }
  preact.options.unmount = function(n) {
    var t2 = n.__c;
    t2 && t2.__R && t2.__R(), t2 && 32 & n.__u && (n.type = null), U && U(n);
  }, (P.prototype = new preact.Component()).__c = function(n, t2) {
    var e2 = t2.__c, r2 = this;
    null == r2.o && (r2.o = []), r2.o.push(e2);
    var u2 = j(r2.__v), o2 = false, i2 = function() {
      o2 || (o2 = true, e2.__R = null, u2 ? u2(c2) : c2());
    };
    e2.__R = i2;
    var c2 = function() {
      if (!--r2.__u) {
        if (r2.state.__a) {
          var n2 = r2.state.__a;
          r2.__v.__k[0] = W(n2, n2.__c.__P, n2.__c.__O);
        }
        var t3;
        for (r2.setState({ __a: r2.__b = null }); t3 = r2.o.pop(); ) t3.forceUpdate();
      }
    };
    r2.__u++ || 32 & t2.__u || r2.setState({ __a: r2.__b = r2.__v.__k[0] }), n.then(i2, i2);
  }, P.prototype.componentWillUnmount = function() {
    this.o = [];
  }, P.prototype.render = function(n, e2) {
    if (this.__b) {
      if (this.__v.__k) {
        var r2 = document.createElement("div"), o2 = this.__v.__k[0].__c;
        this.__v.__k[0] = V(this.__b, r2, o2.__O = o2.__P);
      }
      this.__b = null;
    }
    var i2 = e2.__a && preact.createElement(preact.Fragment, null, n.fallback);
    return i2 && (i2.__u &= -33), [preact.createElement(preact.Fragment, null, e2.__a ? null : n.children), i2];
  };
  var H = function(n, t2, e2) {
    if (++e2[1] === e2[0] && n.l.delete(t2), n.props.revealOrder && ("t" !== n.props.revealOrder[0] || !n.l.size)) for (e2 = n.i; e2; ) {
      for (; e2.length > 3; ) e2.pop()();
      if (e2[1] < e2[0]) break;
      n.i = e2 = e2[2];
    }
  };
  (B.prototype = new preact.Component()).__a = function(n) {
    var t2 = this, e2 = j(t2.__v), r2 = t2.l.get(n);
    return r2[0]++, function(u2) {
      var o2 = function() {
        t2.props.revealOrder ? (r2.push(u2), H(t2, n, r2)) : u2();
      };
      e2 ? e2(o2) : o2();
    };
  }, B.prototype.render = function(n) {
    this.i = null, this.l = /* @__PURE__ */ new Map();
    var t2 = preact.toChildArray(n.children);
    n.revealOrder && "b" === n.revealOrder[0] && t2.reverse();
    for (var e2 = t2.length; e2--; ) this.l.set(t2[e2], this.i = [1, 0, this.i]);
    return n.children;
  }, B.prototype.componentDidUpdate = B.prototype.componentDidMount = function() {
    var n = this;
    this.l.forEach(function(t2, e2) {
      H(n, e2, t2);
    });
  };
  var q = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103, G = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, J = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, K = /[A-Z0-9]/g, Q = "undefined" != typeof document, X = function(n) {
    return ("undefined" != typeof Symbol && "symbol" == typeof Symbol() ? /fil|che|rad/ : /fil|che|ra/).test(n);
  };
  preact.Component.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(t2) {
    Object.defineProperty(preact.Component.prototype, t2, { configurable: true, get: function() {
      return this["UNSAFE_" + t2];
    }, set: function(n) {
      Object.defineProperty(this, t2, { configurable: true, writable: true, value: n });
    } });
  });
  var en = preact.options.event;
  function rn() {
  }
  function un() {
    return this.cancelBubble;
  }
  function on() {
    return this.defaultPrevented;
  }
  preact.options.event = function(n) {
    return en && (n = en(n)), n.persist = rn, n.isPropagationStopped = un, n.isDefaultPrevented = on, n.nativeEvent = n;
  };
  var ln = { enumerable: false, configurable: true, get: function() {
    return this.class;
  } }, fn = preact.options.vnode;
  preact.options.vnode = function(n) {
    "string" == typeof n.type && function(n2) {
      var t2 = n2.props, e2 = n2.type, u2 = {}, o2 = -1 === e2.indexOf("-");
      for (var i2 in t2) {
        var c2 = t2[i2];
        if (!("value" === i2 && "defaultValue" in t2 && null == c2 || Q && "children" === i2 && "noscript" === e2 || "class" === i2 || "className" === i2)) {
          var l2 = i2.toLowerCase();
          "defaultValue" === i2 && "value" in t2 && null == t2.value ? i2 = "value" : "download" === i2 && true === c2 ? c2 = "" : "translate" === l2 && "no" === c2 ? c2 = false : "o" === l2[0] && "n" === l2[1] ? "ondoubleclick" === l2 ? i2 = "ondblclick" : "onchange" !== l2 || "input" !== e2 && "textarea" !== e2 || X(t2.type) ? "onfocus" === l2 ? i2 = "onfocusin" : "onblur" === l2 ? i2 = "onfocusout" : J.test(i2) && (i2 = l2) : l2 = i2 = "oninput" : o2 && G.test(i2) ? i2 = i2.replace(K, "-$&").toLowerCase() : null === c2 && (c2 = void 0), "oninput" === l2 && u2[i2 = l2] && (i2 = "oninputCapture"), u2[i2] = c2;
        }
      }
      "select" == e2 && u2.multiple && Array.isArray(u2.value) && (u2.value = preact.toChildArray(t2.children).forEach(function(n3) {
        n3.props.selected = -1 != u2.value.indexOf(n3.props.value);
      })), "select" == e2 && null != u2.defaultValue && (u2.value = preact.toChildArray(t2.children).forEach(function(n3) {
        n3.props.selected = u2.multiple ? -1 != u2.defaultValue.indexOf(n3.props.value) : u2.defaultValue == n3.props.value;
      })), t2.class && !t2.className ? (u2.class = t2.class, Object.defineProperty(u2, "className", ln)) : (t2.className && !t2.class || t2.class && t2.className) && (u2.class = u2.className = t2.className), n2.props = u2;
    }(n), n.$$typeof = q, fn && fn(n);
  };
  var an = preact.options.__r;
  preact.options.__r = function(n) {
    an && an(n), n.__c;
  };
  var sn = preact.options.diffed;
  preact.options.diffed = function(n) {
    sn && sn(n);
    var t2 = n.props, e2 = n.__e;
    null != e2 && "textarea" === n.type && "value" in t2 && t2.value !== e2.value && (e2.value = null == t2.value ? "" : t2.value);
  };
  const Tooltip = ({ content, children }) => {
    const [isVisible, setIsVisible] = h(false);
    return /* @__PURE__ */ u$1(
      "div",
      {
        className: "jop-tooltip-container",
        onMouseEnter: () => setIsVisible(true),
        onMouseLeave: () => setIsVisible(false),
        children: [
          children,
          isVisible && content && /* @__PURE__ */ u$1("div", { className: "jop-tooltip", children: content })
        ]
      }
    );
  };
  const Checkbox = ({ label, value, tip, onChange }) => {
    const handleChange = (event) => {
      onChange(event.currentTarget.checked);
    };
    return /* @__PURE__ */ u$1("label", { className: "jop-checkbox", children: [
      /* @__PURE__ */ u$1(
        "input",
        {
          type: "checkbox",
          className: "jop-checkbox-input",
          checked: value,
          onChange: handleChange
        }
      ),
      /* @__PURE__ */ u$1("span", { className: "jop-checkbox-custom" }),
      /* @__PURE__ */ u$1(Tooltip, { content: tip || "", children: /* @__PURE__ */ u$1("span", { className: "jop-checkbox-label", children: label }) })
    ] });
  };
  const Setting = ({
    siteList: siteList2,
    setDisables,
    disables,
    multipleNavi,
    setMultipleNavi,
    hiddenError,
    setHiddenError
  }) => {
    const [showSetting, setShowSetting] = h(false);
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
    const handlehiddenErrorChange = (checked) => {
      setHiddenError(checked);
      _GM_setValue("hiddenError", checked);
    };
    return /* @__PURE__ */ u$1(preact.Fragment, { children: [
      !showSetting && /* @__PURE__ */ u$1("div", { className: "jop-button_def", onClick: () => setShowSetting(!showSetting), children: "设置" }),
      showSetting && /* @__PURE__ */ u$1(preact.Fragment, { children: [
        /* @__PURE__ */ u$1("div", { className: "jop-setting", children: [
          /* @__PURE__ */ u$1(Group, { title: "勾选默认展示", children: siteList2.map((item) => {
            const isHidden = disables.includes(item.name);
            return /* @__PURE__ */ u$1(
              Checkbox,
              {
                label: item.name,
                value: !isHidden,
                onChange: (checked) => hanleListChange(item, checked)
              }
            );
          }) }),
          /* @__PURE__ */ u$1(Group, { title: "其他设置", children: [
            /* @__PURE__ */ u$1(
              Checkbox,
              {
                label: "展示多个搜索结果",
                value: multipleNavi,
                tip: "一个站点内出现多条匹配结果时，打开后跳转搜索结果页",
                onChange: handleNaviChange
              }
            ),
            /* @__PURE__ */ u$1(
              Checkbox,
              {
                label: "隐藏失败结果",
                value: hiddenError,
                onChange: handlehiddenErrorChange
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ u$1(
          "div",
          {
            className: "jop-button_def",
            onClick: () => {
              setShowSetting(!showSetting);
            },
            children: "收起设置"
          }
        )
      ] })
    ] });
  };
  const Group = ({ title, children }) => {
    return /* @__PURE__ */ u$1(preact.Fragment, { children: [
      /* @__PURE__ */ u$1("h4", { className: "jop-setting-title", children: title }),
      /* @__PURE__ */ u$1("div", { className: "jop-setting-list", children })
    ] });
  };
  function videoPageParser(responseText, { subQuery, leakQuery, videoQuery }) {
    const doc = new DOMParser().parseFromString(responseText, "text/html");
    const subNode = subQuery ? doc.querySelector(subQuery) : "";
    const subNodeText = subNode ? subNode.innerHTML : "";
    const leakNode = leakQuery ? doc.querySelector(leakQuery) : null;
    const leakNodeText = leakNode ? leakNode.innerHTML : "";
    const videoNode = videoQuery ? doc.querySelector(videoQuery) : true;
    return {
      isSuccess: !!videoNode,
      tag: tagsQuery({ leakageText: leakNodeText, subtitleText: subNodeText })
    };
  }
  function searchPageCodeCheck(titleNodes, siteItem, CODE) {
    if (!titleNodes || titleNodes.length === 0) return { isSuccess: false, titleNodeText: "" };
    const codeRegex = /[a-zA-Z]{3,5}-\d{3,5}/;
    if (siteItem.strictParser) {
      const nodes = Array.from(titleNodes);
      const passNodes = nodes.filter((node) => {
        const nodeCode = node.outerHTML.match(codeRegex);
        return isCaseInsensitiveEqual(nodeCode == null ? void 0 : nodeCode[0], CODE);
      });
      const titleNodeText = passNodes.map((node) => node.outerHTML).join(" ");
      return {
        titleNodeText,
        isSuccess: passNodes.length > 0,
        multipleRes: passNodes.length > 1
      };
    } else {
      const titleNode = titleNodes[siteItem.domQuery.listIndex ?? 0];
      const titleNodeText = titleNode ? titleNode == null ? void 0 : titleNode.outerHTML : "";
      const matchCode = titleNodeText.match(codeRegex);
      const isSuccess = isCaseInsensitiveEqual(matchCode == null ? void 0 : matchCode[0], CODE);
      return { titleNodeText, isSuccess, multipleRes: titleNodes.length > 1 };
    }
  }
  function serachPageParser(responseText, siteItem, CODE) {
    const { linkQuery, titleQuery } = siteItem.domQuery;
    const doc = new DOMParser().parseFromString(responseText, "text/html");
    const titleNodes = titleQuery ? doc.querySelectorAll(titleQuery) : [];
    const { isSuccess, titleNodeText, multipleRes } = searchPageCodeCheck(titleNodes, siteItem, CODE);
    const linkNodes = linkQuery ? doc.querySelectorAll(linkQuery) : [];
    const linkNode = linkNodes[siteItem.domQuery.listIndex ?? 0];
    if (!isSuccess) {
      return { isSuccess: false };
    }
    const resultLinkText = linkNode.href.replace(linkNode.hostname, siteItem.hostname);
    return {
      isSuccess: true,
      resultLink: resultLinkText,
      multipleRes,
      tag: tagsQuery({ leakageText: titleNodeText, subtitleText: titleNodeText })
    };
  }
  const baseFetcher = async ({ siteItem, targetLink, CODE }) => {
    if (siteItem.fetchType === "false") {
      return Promise.resolve({
        isSuccess: true,
        resultLink: targetLink
      });
    }
    try {
      const response = await gmGet({ url: targetLink });
      if (isErrorCode(response.status)) {
        throw Error(String(response.status));
      }
      if (siteItem.fetchType === "get") {
        return {
          resultLink: targetLink,
          ...videoPageParser(response.responseText, siteItem.domQuery)
        };
      } else {
        return {
          ...serachPageParser(response.responseText, siteItem, CODE)
        };
      }
    } catch (error) {
      return {
        isSuccess: false
      };
    }
  };
  const javbleFetcher = async (args) => {
    const res = await baseFetcher(args);
    if (res.isSuccess) return res;
    const newLink = args.targetLink.slice(0, -1) + "-c/";
    return await baseFetcher({ ...args, targetLink: newLink });
  };
  const fetcher = (args) => {
    if (args.siteItem.name === "Jable") {
      return javbleFetcher(args);
    }
    return baseFetcher(args);
  };
  const SiteBtn = ({ siteItem, CODE, multipleNavi, hiddenError }) => {
    const { name, codeFormater } = siteItem;
    const formatCode = codeFormater ? codeFormater(CODE) : CODE;
    const originLink = siteItem.url.replace("{{code}}", formatCode);
    const [loading, setLoading] = h(false);
    const [fetchRes, setFetchRes] = h();
    y(() => {
      setLoading(true);
      fetcher({ siteItem, targetLink: originLink, CODE: formatCode }).then((res) => {
        setFetchRes(res);
        setLoading(false);
      });
    }, [fetcher, siteItem, CODE, originLink]);
    const multipleFlag = multipleNavi && (fetchRes == null ? void 0 : fetchRes.multipleRes);
    const tag = multipleFlag ? "多结果" : fetchRes == null ? void 0 : fetchRes.tag;
    const resultLink = multipleFlag ? originLink : fetchRes == null ? void 0 : fetchRes.resultLink;
    const colorClass = (fetchRes == null ? void 0 : fetchRes.isSuccess) ? "jop-button_green " : "jop-button_red ";
    if (hiddenError && !(fetchRes == null ? void 0 : fetchRes.isSuccess)) {
      return /* @__PURE__ */ u$1(preact.Fragment, {});
    }
    return /* @__PURE__ */ u$1(
      "a",
      {
        className: "jop-button " + (loading ? " " : colorClass),
        target: "_blank",
        href: !resultLink ? originLink : resultLink,
        children: [
          tag && /* @__PURE__ */ u$1("div", { className: "jop-button_label", children: tag }),
          /* @__PURE__ */ u$1("span", { children: name })
        ]
      }
    );
  };
  const App = M(function({ libItem, CODE }) {
    const DEF_DIS = [
      ...["AvJoy", "baihuse", "GGJAV", "AV01", "18sex", "highporn", "evojav", "HAYAV"],
      ...["JavBus", "JavDB", "JAVLib", "MISSAV_", "123av", "javhub", "javgo", "JAVMENU"]
    ];
    const [disables, setDisables] = h(_GM_getValue("disable", DEF_DIS));
    const [multipleNavi, setMultipleNavi] = h(_GM_getValue("multipleNavi", true));
    const [hiddenError, setHiddenError] = h(_GM_getValue("hiddenError", false));
    const list = siteList.filter(
      (siteItem) => !disables.includes(siteItem.name) && !siteItem.hostname.includes(libItem.name)
    );
    return /* @__PURE__ */ u$1(preact.Fragment, { children: [
      /* @__PURE__ */ u$1("div", { class: "jop-list", children: list.map((siteItem) => /* @__PURE__ */ u$1(
        SiteBtn,
        {
          siteItem,
          CODE,
          multipleNavi,
          hiddenError
        },
        siteItem.name
      )) }),
      /* @__PURE__ */ u$1(
        Setting,
        {
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
          hiddenError,
          setHiddenError: (v2) => {
            setHiddenError(v2);
            _GM_setValue("hiddenError", v2);
          }
        }
      )
    ] });
  });
  function main() {
    const libItem = libSites.find((item) => document.querySelector(item.identifier));
    if (!libItem) {
      console.error("||jop 匹配站点失败");
      return;
    }
    const CODE = getCode(libItem);
    libItem.method();
    const panel = document.querySelector(libItem.querys.panelQueryStr);
    if (!panel) {
      console.error("||jop 插入界面失败");
      return;
    }
    const app = document.createElement("div");
    app.classList.add("jop-app");
    panel.append(app);
    preact.render(/* @__PURE__ */ u$1(App, { libItem, CODE }), app);
    console.log("||脚本挂载成功", CODE);
  }
  main();

})(preact);