// ==UserScript==
// @name         JAV 添加跳转在线观看 三合一
// @namespace    https://greasyfork.org/zh-CN/scripts/429173
// @version      1.0.1
// @author       mission522
// @description  在 JavDB、JavBus、JavLibrart 网站的影片详情页添加跳转在线播放按钮，并在按钮上标注是否支持在线播放、包含无码或包含字幕
// @license      MIT
// @icon         https://javdb.com/favicon-32x32.png
// @include      /^https:\/\/(\w*\.)?javdb(\d)*\.com.*$/
// @match        *://*.javdb.com/*
// @match        *://*.javbus.com/*
// @match        *://*.javlibrary.com/*
// @require      https://cdn.jsdelivr.net/npm/preact@10.11.0/dist/preact.min.js
// @connect      jable.tv
// @connect      missav.com
// @connect      javhhh.com
// @connect      netflav.com
// @connect      avgle.com
// @connect      bestjavporn.com
// @connect      jav.guru
// @connect      javmost.cx
// @connect      hpjav.tv
// @connect      av01.tv
// @connect      javbus.com
// @connect      javmenu.com
// @connect      javfc2.net
// @connect      paipancon.com
// @connect      ggjav.com
// ==/UserScript==

(e=>{const o=document.createElement("style");o.dataset.source="vite-plugin-monkey",o.innerText=e,document.head.appendChild(o)})('.jop-panelParent{position:relative}.jop-panel{box-sizing:border-box;position:absolute;top:0;left:1rem;width:100%;height:100%;z-index:10;border-radius:15px 0 0 15px;background-color:#fff;box-shadow:#00000042 -3px 0 8px;transition:right .2s ease-in-out;display:flex;flex-wrap:wrap;justify-content:space-between;gap:10px 0}.jop-panel_open{right:0}.jop-button_leakage:after,.jop-button_subtitle:before{position:absolute;font-size:10px;padding:4px;border-radius:4px;top:-8px;line-height:.75;color:#fff;background:#67c23a}.jop-button_subtitle:before{content:"\\5b57\\5e55";right:-10px}.jop-button_leakage:after{content:"\\65e0\\7801";right:18px}.jop-button{display:inline-flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center;position:relative;box-sizing:border-box;-webkit-tap-highlight-color:transparent;background-color:transparent;outline:0px;cursor:pointer;user-select:none;vertical-align:middle;appearance:none;text-decoration:none;font-family:Roboto,Helvetica,Arial,sans-serif;font-weight:500;font-size:14px;line-height:1.75;letter-spacing:.02857em;min-width:110px;padding:5px 15px;border-radius:8px;transition:background-color .25s cubic-bezier(.4,0,.2,1) 0ms,box-shadow .25s cubic-bezier(.4,0,.2,1) 0ms,border-color .25s cubic-bezier(.4,0,.2,1) 0ms,color .25s cubic-bezier(.4,0,.2,1) 0ms;color:#606266;border:1px solid #dcdfe6}.jop-button:visited{color:#606266}.jop-button:hover{text-decoration:none;color:#409eff;border:1px solid #c6e2ff;background-color:#ecf5ff}.jop-button-loading{position:absolute;left:5px;width:8px;height:8px;border:1px solid #dcdfe6;border-top-color:transparent;border-radius:100%;animation:btnLoading infinite .75s linear}.jop-button_green{color:#67c23a!important;background-color:#f0f9eb;border:1px solid #b3e19d}.jop-button_green:hover{color:#fff!important;background-color:#67c23a}.jop-button_red{color:#f56c6c!important;background-color:#fef0f0;border:1px solid #fab6b6}.jop-button_red:hover{color:#fff!important;background-color:#f56c6c}@keyframes btnLoading{0%{transform:rotate(0)}to{transform:rotate(360deg)}}');

(function(preact2) {
  "use strict";
  const matchList = [
    {
      name: "javdb",
      enable: true,
      hostname: "javdb.com",
      panelParentQueryStr: ".video-meta-panel .column:nth-child(2)",
      infoPanelQueryStr: "video-meta-panel"
    }
  ];
  function getInfo(cmsName) {
    var _a;
    if (cmsName === "javdb") {
      const codeNode = document.querySelector(`[data-clipboard-text]`);
      const actorNode = document.querySelector(`.panel-block>span.value>a`);
      return {
        codeText: codeNode == null ? void 0 : codeNode.dataset.clipboardText,
        codeLink: codeNode == null ? void 0 : codeNode.href,
        actorText: actorNode == null ? void 0 : actorNode.innerHTML,
        actorLink: actorNode == null ? void 0 : actorNode.href
      };
    } else if (cmsName === "javbus") {
      const codeNode = document.querySelector(`span[style="color:#CC0000;"]`);
      document.querySelector(`.panel-block>span.value>a`);
      return {
        codeText: codeNode == null ? void 0 : codeNode.innerText.replace("\u590D\u5236", ""),
        codeLink: "",
        actorText: "",
        actorLink: ""
      };
    } else {
      return {
        codeText: (_a = document.querySelector(`#video_id td.text`)) == null ? void 0 : _a.innerHTML,
        codeLink: "",
        actorText: "",
        actorLink: ""
      };
    }
  }
  const style = "";
  var r, u, i, o$1, f = 0, c = [], e = [], a = preact2.options.__b, v = preact2.options.__r, l = preact2.options.diffed, m = preact2.options.__c, d = preact2.options.unmount;
  function p(t, r2) {
    preact2.options.__h && preact2.options.__h(u, t, f || r2), f = 0;
    var i2 = u.__H || (u.__H = { __: [], __h: [] });
    return t >= i2.__.length && i2.__.push({ __V: e }), i2.__[t];
  }
  function y(n) {
    return f = 1, h(C, n);
  }
  function h(n, t, i2) {
    var o2 = p(r++, 2);
    if (o2.t = n, !o2.__c && (o2.__ = [i2 ? i2(t) : C(void 0, t), function(n2) {
      var t2 = o2.__N ? o2.__N[0] : o2.__[0], r2 = o2.t(t2, n2);
      t2 !== r2 && (o2.__N = [r2, o2.__[1]], o2.__c.setState({}));
    }], o2.__c = u, !u.u)) {
      u.u = true;
      var f2 = u.shouldComponentUpdate;
      u.shouldComponentUpdate = function(n2, t2, r2) {
        if (!o2.__c.__H)
          return true;
        var u2 = o2.__c.__H.__.filter(function(n3) {
          return n3.__c;
        });
        if (u2.every(function(n3) {
          return !n3.__N;
        }))
          return !f2 || f2.call(this, n2, t2, r2);
        var i3 = false;
        return u2.forEach(function(n3) {
          if (n3.__N) {
            var t3 = n3.__[0];
            n3.__ = n3.__N, n3.__N = void 0, t3 !== n3.__[0] && (i3 = true);
          }
        }), !!i3 && (!f2 || f2.call(this, n2, t2, r2));
      };
    }
    return o2.__N || o2.__;
  }
  function g() {
    for (var t; t = c.shift(); )
      if (t.__P && t.__H)
        try {
          t.__H.__h.forEach(w), t.__H.__h.forEach(z), t.__H.__h = [];
        } catch (r2) {
          t.__H.__h = [], preact2.options.__e(r2, t.__v);
        }
  }
  preact2.options.__b = function(n) {
    "function" != typeof n.type || n.o || n.type === preact2.Fragment ? n.o || (n.o = n.__ && n.__.o ? n.__.o : "") : n.o = (n.__ && n.__.o ? n.__.o : "") + (n.__ && n.__.__k ? n.__.__k.indexOf(n) : 0), u = null, a && a(n);
  }, preact2.options.__r = function(n) {
    v && v(n), r = 0;
    var t = (u = n.__c).__H;
    t && (i === u ? (t.__h = [], u.__h = [], t.__.forEach(function(n2) {
      n2.__N && (n2.__ = n2.__N), n2.__V = e, n2.__N = n2.i = void 0;
    })) : (t.__h.forEach(w), t.__h.forEach(z), t.__h = [])), i = u;
  }, preact2.options.diffed = function(t) {
    l && l(t);
    var r2 = t.__c;
    r2 && r2.__H && (r2.__H.__h.length && (1 !== c.push(r2) && o$1 === preact2.options.requestAnimationFrame || ((o$1 = preact2.options.requestAnimationFrame) || k)(g)), r2.__H.__.forEach(function(n) {
      n.i && (n.__H = n.i), n.__V !== e && (n.__ = n.__V), n.i = void 0, n.__V = e;
    })), i = u = null;
  }, preact2.options.__c = function(t, r2) {
    r2.some(function(t2) {
      try {
        t2.__h.forEach(w), t2.__h = t2.__h.filter(function(n) {
          return !n.__ || z(n);
        });
      } catch (u2) {
        r2.some(function(n) {
          n.__h && (n.__h = []);
        }), r2 = [], preact2.options.__e(u2, t2.__v);
      }
    }), m && m(t, r2);
  }, preact2.options.unmount = function(t) {
    d && d(t);
    var r2, u2 = t.__c;
    u2 && u2.__H && (u2.__H.__.forEach(function(n) {
      try {
        w(n);
      } catch (n2) {
        r2 = n2;
      }
    }), u2.__H = void 0, r2 && preact2.options.__e(r2, u2.__v));
  };
  var j = "function" == typeof requestAnimationFrame;
  function k(n) {
    var t, r2 = function() {
      clearTimeout(u2), j && cancelAnimationFrame(t), setTimeout(n);
    }, u2 = setTimeout(r2, 100);
    j && (t = requestAnimationFrame(r2));
  }
  function w(n) {
    var t = u, r2 = n.__c;
    "function" == typeof r2 && (n.__c = void 0, r2()), u = t;
  }
  function z(n) {
    var t = u;
    n.__c = n.__(), u = t;
  }
  function C(n, t) {
    return "function" == typeof t ? t(n) : t;
  }
  const print = (name) => {
    console.log(name);
  };
  const siteList = [
    {
      name: "Jable",
      hostname: "jable.tv",
      url: "https://jable.tv/videos/{{code}}/",
      fetcher: "get",
      domQuery: {
        subQuery: ".header-right>h6"
      },
      method: print
    },
    {
      name: "MISSAV",
      hostname: "missav.com",
      url: "https://missav.com/{{code}}/",
      fetcher: "get",
      domQuery: {
        subQuery: '.space-y-2 a.text-nord13[href="https://missav.com/chinese-subtitle"]',
        leakQuery: ".order-first div.rounded-md a[href]:last-child"
      },
      method: print
    },
    {
      name: "NETFLAV",
      hostname: "netflav.com",
      url: "https://netflav.com/search?type=title&keyword={{code}}",
      fetcher: "parser",
      domQuery: {
        linkQuery: ".grid_cell>a",
        titleQuery: ".grid_cell>a>.grid_title"
      },
      method: print
    },
    {
      name: "Avgle",
      hostname: "avgle.com",
      url: "https://avgle.com/search/videos?search_query={{code}}&search_type=videos",
      fetcher: "parser",
      domQuery: {
        linkQuery: ".container>.row .row .well>a[href]",
        titleQuery: ".container>.row .row .well .video-title"
      },
      method: print
    },
    {
      name: "JAVHHH",
      hostname: "javhhh.com",
      url: "https://javhhh.com/v/?wd={{code}}",
      fetcher: "parser",
      domQuery: {
        linkQuery: ".typelist>.i-container>a[href]",
        titleQuery: ".typelist>.i-container>a[href]"
      },
      method: print
    },
    {
      name: "BestJP",
      hostname: "bestjavporn.com",
      url: "https://www3.bestjavporn.com/search/{{code}}",
      fetcher: "parser",
      domQuery: {
        linkQuery: "article.thumb-block>a",
        titleQuery: "article.thumb-block>a"
      },
      method: print
    },
    {
      name: "JAVMENU",
      hostname: "javmenu.com",
      url: "https://javmenu.com/{{code}}",
      fetcher: "get",
      domQuery: {
        videoQuery: "a.nav-link[aria-controls='pills-0']"
      },
      method: print
    },
    {
      name: "Jav.Guru",
      hostname: "jav.guru",
      url: "https://jav.guru/?s={{code}}",
      fetcher: "parser",
      domQuery: {
        linkQuery: ".imgg>a[href]",
        titleQuery: ".inside-article>.grid1 a[title]"
      },
      method: print
    },
    {
      name: "JAVMOST",
      hostname: "javmost.cx",
      url: "https://javmost.cx/search/{{code}}/",
      fetcher: "parser",
      domQuery: {
        linkQuery: "#content .card a#MyImage",
        titleQuery: "#content .card-block .card-title"
      },
      method: print
    },
    {
      name: "JAVFC2",
      hostname: "javfc2.net",
      url: "https://javfc2.net/?s={{code}}",
      fetcher: "parser",
      domQuery: {
        linkQuery: "article.loop-video>a[href]",
        titleQuery: "article.loop-video .entry-header"
      },
      method: print
    },
    {
      name: "baihuse",
      hostname: "paipancon.com",
      url: "https://paipancon.com/search/{{code}}",
      fetcher: "parser",
      domQuery: {
        linkQuery: "div.col>div.card>a[href]",
        titleQuery: "div.card img.card-img-top"
      },
      method: print
    },
    {
      name: "GGJAV",
      hostname: "ggjav.com",
      url: "https://ggjav.com/main/search?string={{code}}",
      fetcher: "parser",
      domQuery: {
        listIndex: 1,
        spaceCode: true,
        titleQuery: "div.columns.large-3.medium-6.small-12.item.float-left>div.item_title>a.gray_a",
        linkQuery: "div.columns.large-3.medium-6.small-12.item.float-left>div.item_title>a.gray_a"
      },
      method: print
    },
    {
      name: "AV01",
      hostname: "av01.tv",
      url: "https://www.av01.tv/search/videos?search_query={{code}}",
      fetcher: "parser",
      domQuery: {
        linkQuery: "div[id].well-sm>a",
        titleQuery: ".video-views>.pull-left"
      },
      method: print
    },
    {
      name: "JavBus",
      disable: "javbus",
      hostname: "javbus.com",
      url: "https://javbus.com/{{code}}",
      fetcher: "get",
      domQuery: {},
      method: print
    }
  ];
  var _ = 0;
  function o(o2, e2, n, t, f2) {
    var l2, s, u2 = {};
    for (s in e2)
      "ref" == s ? l2 = e2[s] : u2[s] = e2[s];
    var a2 = { type: o2, props: u2, key: n, ref: l2, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, __h: null, constructor: void 0, __v: --_, __source: f2, __self: t };
    if ("function" == typeof o2 && (l2 = o2.defaultProps))
      for (s in l2)
        void 0 === u2[s] && (u2[s] = l2[s]);
    return preact2.options.vnode && preact2.options.vnode(a2), a2;
  }
  const Info = ({
    info
  }) => {
    console.log(info);
    return o("div", {
      children: [o("a", {
        href: info.codeLink,
        children: ["\u756A\u53F7:", info.codeText]
      }), o("a", {
        href: info.actorLink,
        children: ["\u6F14\u5458:", info.actorText]
      })]
    });
  };
  const Panel = function({
    cms,
    info
  }) {
    siteList.filter((item) => item.disable !== cms.name);
    const [showPanel, setShowPanel] = y(true);
    return o(preact2.Fragment, {
      children: [o("div", {
        style: {
          position: "absolute",
          zIndex: 11
        },
        onClick: () => setShowPanel(!showPanel),
        children: "\u5173\u6389"
      }), showPanel && o("div", {
        className: "jop-panel",
        children: o(Info, {
          info
        })
      })]
    });
  };
  function main() {
    const cms = matchList.find((item) => item.hostname === window.location.hostname);
    const info = getInfo(cms.name);
    const CODE = info.codeText;
    if (CODE === void 0)
      return;
    const panelParent = document.querySelector(cms.panelParentQueryStr);
    panelParent == null ? void 0 : panelParent.classList.add("jop-panelParent");
    panelParent && preact2.render(o(Panel, {
      cms,
      info
    }), panelParent);
  }
  main();
})(preact);
