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
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(e=>{const o=document.createElement("style");o.dataset.source="vite-plugin-monkey",o.innerText=e,document.head.appendChild(o)})('.jop-panel{box-sizing:border-box;position:fixed;top:37.5%;right:-305px;width:330px;height:400px;padding:35px 35px 35px 60px;border-radius:15px 0 0 15px;background-color:#fff;box-shadow:#00000042 3px 0 8px;transition:right .2s ease-in-out;display:flex;flex-wrap:wrap;justify-content:space-between;gap:10px 0}.jop-panel_open{right:0}.jop-button_leakage:after,.jop-button_subtitle:before{position:absolute;font-size:10px;padding:4px;border-radius:4px;top:-8px;line-height:.75;color:#fff;background:#67c23a}.jop-button_subtitle:before{content:"\\5b57\\5e55";right:-10px}.jop-button_leakage:after{content:"\\65e0\\7801";right:18px}.jop-button{display:inline-flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center;position:relative;box-sizing:border-box;-webkit-tap-highlight-color:transparent;background-color:transparent;outline:0px;cursor:pointer;user-select:none;vertical-align:middle;appearance:none;text-decoration:none;font-family:Roboto,Helvetica,Arial,sans-serif;font-weight:500;font-size:14px;line-height:1.75;letter-spacing:.02857em;min-width:110px;padding:5px 15px;border-radius:8px;transition:background-color .25s cubic-bezier(.4,0,.2,1) 0ms,box-shadow .25s cubic-bezier(.4,0,.2,1) 0ms,border-color .25s cubic-bezier(.4,0,.2,1) 0ms,color .25s cubic-bezier(.4,0,.2,1) 0ms;color:#606266;border:1px solid #dcdfe6}.jop-button:visited{color:#606266}.jop-button:hover{text-decoration:none;color:#409eff;border:1px solid #c6e2ff;background-color:#ecf5ff}.jop-button-loading{position:absolute;left:5px;width:8px;height:8px;border:1px solid #dcdfe6;border-top-color:transparent;border-radius:100%;animation:btnLoading infinite .75s linear}.jop-button_green{color:#67c23a!important;background-color:#f0f9eb;border:1px solid #b3e19d}.jop-button_green:hover{color:#fff!important;background-color:#67c23a}.jop-button_red{color:#f56c6c!important;background-color:#fef0f0;border:1px solid #fab6b6}.jop-button_red:hover{color:#fff!important;background-color:#f56c6c}@keyframes btnLoading{0%{transform:rotate(0)}to{transform:rotate(360deg)}}');

var vite_plugin_monkey_a18d479d16c8e = function(exports) {
  var _a, _b;
  "use strict";
  function createPanel() {
    const parentNode = document.querySelector("body");
    const panelNode = document.createElement("div");
    parentNode && parentNode.appendChild(panelNode);
    panelNode.classList.add("jop-panel");
    panelNode.addEventListener("click", () => {
      const class1 = panelNode.classList[1];
      if (class1 === void 0) {
        panelNode.classList.add("jop-panel_open");
      } else {
        panelNode.classList.remove("jop-panel_open");
      }
    });
    return panelNode;
  }
  function createButtonNode(panelNode, siteName, siteUrl) {
    const button = document.createElement("a");
    button.setAttribute("target", "_blank");
    button.classList.add("jop-button");
    button.innerHTML = siteName;
    button.href = siteUrl;
    button.addEventListener("click", (e) => e.stopPropagation());
    panelNode.appendChild(button);
    const loadAni = document.createElement("span");
    loadAni.classList.add("jop-button-loading");
    button.appendChild(loadAni);
    const setButtonStatus = (targetLink, color, hasLeakage = false, hasSubtitle = false) => {
      button.href = targetLink;
      button.classList.add(`jop-button_${color}`);
      loadAni.classList.remove("jop-button-loading");
      hasLeakage && button.classList.add("jop-button_leakage");
      hasSubtitle && button.classList.add("jop-button_subtitle");
    };
    return { button, setButtonStatus };
  }
  const matchList = [
    {
      name: "javdb",
      enable: true,
      hostname: "javdb.com",
      panelParentQueryStr: "video-meta-panel"
    },
    {
      name: "javbus",
      enable: true,
      hostname: "www.javbus.com",
      panelParentQueryStr: "div.row.movie"
    },
    {
      name: "javlib",
      enable: true,
      hostname: "www.javlibrary.com",
      panelParentQueryStr: "#video_jacket_info"
    }
  ];
  const print = (name) => {
    console.log(name);
  };
  const siteList = [
    {
      name: "Jable",
      hostname: "jable.tv",
      url: "https://jable.tv/videos/{{code}}/",
      fetcher: "get",
      domQuery: { subQuery: ".header-right>h6" },
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
      domQuery: { linkQuery: ".grid_cell>a", titleQuery: ".grid_cell>a>.grid_title" },
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
      domQuery: { linkQuery: "article.thumb-block>a", titleQuery: "article.thumb-block>a" },
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
      domQuery: { linkQuery: ".imgg>a[href]", titleQuery: ".inside-article>.grid1 a[title]" },
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
      domQuery: { linkQuery: "div[id].well-sm>a", titleQuery: ".video-views>.pull-left" },
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
  var r = (_a = Reflect.get(document, "__monkeyWindow")) != null ? _a : window;
  r.GM;
  r.unsafeWindow = (_b = r.unsafeWindow) != null ? _b : window;
  r.unsafeWindow;
  r.GM_info;
  r.GM_cookie;
  var b = (...e) => r.GM_xmlhttpRequest(...e);
  function videoPageParser(responseText, { subQuery, leakQuery, videoQuery }) {
    const doc = new DOMParser().parseFromString(responseText, "text/html");
    const subNode = subQuery ? doc.querySelector(subQuery) : "";
    const subNodeText = subNode ? subNode.innerHTML : "";
    const leakNode = leakQuery ? doc.querySelector(leakQuery) : null;
    const videoNode = videoQuery ? doc.querySelector(videoQuery) : true;
    return {
      isSuccess: !!videoNode,
      hasSubtitle: subNodeText.includes("\u5B57\u5E55") || subNodeText.includes("subtitle"),
      hasLeakage: !!leakNode
    };
  }
  function serachPageParser(responseText, { linkQuery, titleQuery, listIndex = 0, spaceCode = false }, siteHostName, CODE) {
    const doc = new DOMParser().parseFromString(responseText, "text/html");
    const linkNode = linkQuery ? doc.querySelectorAll(linkQuery)[listIndex] : null;
    const titleNode = titleQuery ? doc.querySelectorAll(titleQuery)[listIndex] : null;
    const titleNodeText = titleNode ? titleNode == null ? void 0 : titleNode.outerHTML : "";
    function query() {
      const envCodeWithSpace = spaceCode ? CODE.replace("-", " ") : CODE;
      const condition = linkNode && titleNode && (titleNodeText.includes(envCodeWithSpace) || titleNodeText.includes(CODE));
      if (condition) {
        return {
          isSuccess: true,
          targetLink: linkNode.href.replace(linkNode.hostname, siteHostName),
          hasLeakage: titleNodeText.includes("\u65E0\u7801") || titleNodeText.includes("Uncensored"),
          hasSubtitle: titleNodeText.includes("\u5B57\u5E55") || titleNodeText.includes("subtitle")
        };
      } else {
        return { targetLink: "", isSuccess: false };
      }
    }
    return query();
  }
  async function xhr(siteItem, siteUrl, CODE) {
    const xhrPromise = new Promise((resolve) => {
      b({
        method: "GET",
        url: siteUrl,
        onload: (response) => {
          if (siteItem.fetcher === "get") {
            if (response.status === 404) {
              resolve({
                isSuccess: false,
                targetLink: siteUrl,
                name: siteItem.name,
                msg: "\u5E94\u8BE5\u662F\u6CA1\u6709\u8D44\u6E90"
              });
            } else {
              const { hasSubtitle, hasLeakage, isSuccess } = videoPageParser(
                response.responseText,
                siteItem.domQuery
              );
              resolve({
                isSuccess,
                targetLink: siteUrl,
                name: siteItem.name,
                hasSubtitle,
                hasLeakage,
                msg: "[get]\uFF0C\u5B58\u5728\u8D44\u6E90"
              });
            }
          } else if (siteItem.fetcher === "parser") {
            const { targetLink, isSuccess, hasLeakage, hasSubtitle } = serachPageParser(
              response.responseText,
              siteItem.domQuery,
              siteItem.hostname,
              CODE
            );
            resolve({
              name: siteItem.name,
              isSuccess,
              targetLink: isSuccess ? targetLink : siteUrl,
              hasSubtitle,
              hasLeakage,
              msg: "[parser]\u5B58\u5728\u8D44\u6E90"
            });
          }
        },
        onerror: (error) => {
          resolve({
            isSuccess: false,
            targetLink: siteUrl,
            name: siteItem.name,
            msg: error.error
          });
        }
      });
    });
    return xhrPromise;
  }
  const style = "";
  function getCode(cmsName) {
    var _a2, _b2, _c;
    if (cmsName === "javdb") {
      return (_a2 = document.querySelector(`[data-clipboard-text]`)) == null ? void 0 : _a2.dataset.clipboardText;
    } else if (cmsName === "javbus") {
      return (_b2 = document.querySelector(`span[style="color:#CC0000;"]`)) == null ? void 0 : _b2.innerText.replace("\u590D\u5236", "");
    } else {
      return (_c = document.querySelector(`#video_id td.text`)) == null ? void 0 : _c.innerHTML;
    }
  }
  async function main() {
    const cms = matchList.find((item) => item.hostname === window.location.hostname);
    const CODE = getCode(cms.name);
    if (CODE === void 0)
      return;
    const panel = createPanel();
    const envSiteList = siteList.filter((item) => item.disable !== cms.name);
    envSiteList.forEach(async (siteItem) => {
      const siteUrl = siteItem.url.replace("{{code}}", CODE);
      const { setButtonStatus } = createButtonNode(panel, siteItem.name, siteUrl);
      const { isSuccess, hasLeakage, hasSubtitle, targetLink } = await xhr(siteItem, siteUrl, CODE);
      setButtonStatus(targetLink, isSuccess ? "green" : "red", hasLeakage, hasSubtitle);
    });
  }
  main();
  exports.main = main;
  Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
  return exports;
}({});
