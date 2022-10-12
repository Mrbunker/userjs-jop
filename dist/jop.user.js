// ==UserScript==
// @name         JAV 添加跳转在线观看 三合一
// @namespace    https://greasyfork.org/zh-CN/scripts/429173
// @version      1.0.4
// @author       mission522
// @description  在 JavDB、JavBus、JavLibrart 网站的影片详情页添加跳转在线播放按钮，并在按钮上标注是否支持在线播放、包含无码或包含字幕
// @license      MIT
// @icon         https://javdb.com/favicon-32x32.png
// @include      /^https?:\/\/(\w*\.)?javdb(\d)*\.com.*$/
// @include      /^https?:\/\/(\w*\.)?(javbus|seejav|javsee)*\.(com|cc|me|life).*$/
// @include      /^https?:\/\/(\w*\.)?(javlib|javlibrary)*\.com.*$/
// @match        *://*/cn/?v=jav*
// @require      https://cdn.jsdelivr.net/npm/preact@10.11.0/dist/preact.min.js
// @connect      jable.tv
// @connect      missav.com
// @connect      netflav.com
// @connect      avgle.com
// @connect      javhhh.com
// @connect      bestjavporn.com
// @connect      javmenu.com
// @connect      jav.guru
// @connect      javmost.cx
// @connect      hayav.com
// @connect      javfc2.net
// @connect      paipancon.com
// @connect      ggjav.com
// @connect      av01.tv
// @connect      javbus.com
// @grant        GM_getValue
// @grant        GM_xmlhttpRequest
// @grant        GM_setValue
// ==/UserScript==

(t=>{const o=document.createElement("style");o.dataset.source="vite-plugin-monkey",o.innerText=t,document.head.appendChild(o)})(".jop-panelParent{position:relative}.jop-panel{box-sizing:border-box;position:absolute;top:0;right:-3px;width:100%;height:100%;z-index:1;padding:17.5px;background-color:#fff;transition:right .2s ease-in-out}.jop-top{position:absolute;width:100%;z-index:1}.jop-top-item{position:absolute;top:20px;width:40px;height:40px;cursor:pointer}.jop-top-close{right:10px}.jop-top-setting{position:absolute;right:50px}.jop-top-settingPanel{position:absolute;top:60px;right:20px;width:230px;height:150px;padding:20px;border-radius:4px;box-shadow:#00000042 0 -3px 8px;background:white}.jop-top-settingPanel-item{display:flex;align-items:center;justify-content:space-between}.jop-top-setting-title{font-size:20px;font-weight:700;margin-bottom:10px}.jop-top-checkbox{margin-left:20px;width:14px;height:14px}.jop-info{color:#000;height:30px}.jop-info-code{margin-bottom:20px;color:#3272dc;font-size:30px;cursor:pointer;font-family:system-ui,-apple-system;font-weight:bolder;font-style:italic}.jop-info-actor{margin-top:6px}.jop-info-actor-item{padding:3px 6px;color:#409eff;background:#ecf5ff;border:1px solid #d9ecff;border-radius:4px}.jop-list{position:absolute;top:115px;width:80%;box-sizing:border-box;display:flex;flex-wrap:wrap;justify-content:flex-start;gap:12px}.jop-button{position:relative;display:flex;align-items:center;justify-content:center;box-sizing:border-box;padding:3px 10px;border-radius:4px;font-family:Roboto,Helvetica,Arial,sans-serif;font-weight:500;font-size:14px;border:1px solid #dcdfe6;color:#606266}.jop-button:visited{color:#606266}.jop-button:hover{text-decoration:none;color:#409eff;border:1px solid #c6e2ff;background-color:#ecf5ff}.jop-button_label{position:absolute;font-size:10px;padding:4px;border-radius:4px;top:-13px;right:-10px;line-height:.75;color:#67c23a;border:1px solid #e1f3d8;background:white}.jop-button_green{color:#fff!important;background-color:#67c23a}.jop-button_green:hover{color:#fff!important;background-color:#95d475}.jop-button_red{color:#fff!important;background-color:#f56c6c}.jop-button_red:hover{color:#fff!important;background-color:#f89898}.jop-loading{display:inline-block;width:14px;height:14px;margin-right:10px;border:2px dashed #dcdfe6;border-top-color:transparent;border-radius:100%;animation:btnLoading infinite 1s linear}@keyframes btnLoading{0%{transform:rotate(0)}to{transform:rotate(360deg)}}");

(function(preact2) {
  var _a, _b;
  "use strict";
  const matchList = [{
    name: "javdb",
    enable: true,
    href: /^https:\/\/(\w*\.)?javdb(\d)*\.com.*$/,
    panelParentQueryStr: ".video-meta-panel>.columns.is-desktop>.column:not(.column-video-cover)",
    codeQueryStr: `[data-clipboard-text]`,
    actorQueryStr: `span.value>a[href^="/actors"]`,
    method() {
    }
  }, {
    name: "javbus",
    enable: true,
    href: /^https?:\/\/(\w*\.)?(javbus|seejav|javsee)*\.(com|cc|me|life).*$/,
    panelParentQueryStr: ".movie>div.info",
    codeQueryStr: `span[style="color:#CC0000;"]`,
    actorQueryStr: `.genre>a`,
    method() {
      document.querySelector(".movie>.col-md-9.screencap");
      document.querySelector(".movie>.col-md-3.info");
      return;
    }
  }, {
    name: "javlib",
    enable: true,
    href: /^https?:\/\/(\w*\.)?(javlib|javlibrary)*\.com.*$/,
    panelParentQueryStr: "#video_jacket_info #video_info",
    codeQueryStr: `#video_id td.text`,
    actorQueryStr: `.cast>.star>a`,
    method() {
    }
  }];
  function getInfos(cms) {
    const codeNode = document.querySelector(cms.codeQueryStr);
    const actorNodeList = document.querySelectorAll(cms.actorQueryStr);
    const actorList = [...actorNodeList].map((item) => {
      return {
        text: item.innerHTML,
        link: item.href
      };
    });
    return {
      codeText: cms.name === "javdb" ? codeNode == null ? void 0 : codeNode.dataset.clipboardText : codeNode == null ? void 0 : codeNode.innerText.replace("\u590D\u5236", ""),
      actorList
    };
  }
  const style = "";
  var r$1, u$1, i, o$1, f = 0, c = [], e = [], a = preact2.options.__b, v = preact2.options.__r, l = preact2.options.diffed, m = preact2.options.__c, d = preact2.options.unmount;
  function p(t, r2) {
    preact2.options.__h && preact2.options.__h(u$1, t, f || r2), f = 0;
    var i2 = u$1.__H || (u$1.__H = { __: [], __h: [] });
    return t >= i2.__.length && i2.__.push({ __V: e }), i2.__[t];
  }
  function y(n) {
    return f = 1, h$1(C$1, n);
  }
  function h$1(n, t, i2) {
    var o2 = p(r$1++, 2);
    if (o2.t = n, !o2.__c && (o2.__ = [i2 ? i2(t) : C$1(void 0, t), function(n2) {
      var t2 = o2.__N ? o2.__N[0] : o2.__[0], r2 = o2.t(t2, n2);
      t2 !== r2 && (o2.__N = [r2, o2.__[1]], o2.__c.setState({}));
    }], o2.__c = u$1, !u$1.u)) {
      u$1.u = true;
      var f2 = u$1.shouldComponentUpdate;
      u$1.shouldComponentUpdate = function(n2, t2, r2) {
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
  function s(t, i2) {
    var o2 = p(r$1++, 3);
    !preact2.options.__s && B$1(o2.__H, i2) && (o2.__ = t, o2.i = i2, u$1.__H.__h.push(o2));
  }
  function g$1() {
    for (var t; t = c.shift(); )
      if (t.__P && t.__H)
        try {
          t.__H.__h.forEach(w$1), t.__H.__h.forEach(z$1), t.__H.__h = [];
        } catch (r2) {
          t.__H.__h = [], preact2.options.__e(r2, t.__v);
        }
  }
  preact2.options.__b = function(n) {
    "function" != typeof n.type || n.o || n.type === preact2.Fragment ? n.o || (n.o = n.__ && n.__.o ? n.__.o : "") : n.o = (n.__ && n.__.o ? n.__.o : "") + (n.__ && n.__.__k ? n.__.__k.indexOf(n) : 0), u$1 = null, a && a(n);
  }, preact2.options.__r = function(n) {
    v && v(n), r$1 = 0;
    var t = (u$1 = n.__c).__H;
    t && (i === u$1 ? (t.__h = [], u$1.__h = [], t.__.forEach(function(n2) {
      n2.__N && (n2.__ = n2.__N), n2.__V = e, n2.__N = n2.i = void 0;
    })) : (t.__h.forEach(w$1), t.__h.forEach(z$1), t.__h = [])), i = u$1;
  }, preact2.options.diffed = function(t) {
    l && l(t);
    var r2 = t.__c;
    r2 && r2.__H && (r2.__H.__h.length && (1 !== c.push(r2) && o$1 === preact2.options.requestAnimationFrame || ((o$1 = preact2.options.requestAnimationFrame) || k)(g$1)), r2.__H.__.forEach(function(n) {
      n.i && (n.__H = n.i), n.__V !== e && (n.__ = n.__V), n.i = void 0, n.__V = e;
    })), i = u$1 = null;
  }, preact2.options.__c = function(t, r2) {
    r2.some(function(t2) {
      try {
        t2.__h.forEach(w$1), t2.__h = t2.__h.filter(function(n) {
          return !n.__ || z$1(n);
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
        w$1(n);
      } catch (n2) {
        r2 = n2;
      }
    }), u2.__H = void 0, r2 && preact2.options.__e(r2, u2.__v));
  };
  var j$1 = "function" == typeof requestAnimationFrame;
  function k(n) {
    var t, r2 = function() {
      clearTimeout(u2), j$1 && cancelAnimationFrame(t), setTimeout(n);
    }, u2 = setTimeout(r2, 100);
    j$1 && (t = requestAnimationFrame(r2));
  }
  function w$1(n) {
    var t = u$1, r2 = n.__c;
    "function" == typeof r2 && (n.__c = void 0, r2()), u$1 = t;
  }
  function z$1(n) {
    var t = u$1;
    n.__c = n.__(), u$1 = t;
  }
  function B$1(n, t) {
    return !n || n.length !== t.length || t.some(function(t2, r2) {
      return t2 !== n[r2];
    });
  }
  function C$1(n, t) {
    return "function" == typeof t ? t(n) : t;
  }
  function g(n, t) {
    for (var e2 in t)
      n[e2] = t[e2];
    return n;
  }
  function C(n, t) {
    for (var e2 in n)
      if ("__source" !== e2 && !(e2 in t))
        return true;
    for (var r2 in t)
      if ("__source" !== r2 && n[r2] !== t[r2])
        return true;
    return false;
  }
  function E(n) {
    this.props = n;
  }
  function w(n, e2) {
    function r2(n2) {
      var t = this.props.ref, r3 = t == n2.ref;
      return !r3 && t && (t.call ? t(null) : t.current = null), e2 ? !e2(this.props, n2) || !r3 : C(this.props, n2);
    }
    function u2(e3) {
      return this.shouldComponentUpdate = r2, preact2.createElement(n, e3);
    }
    return u2.displayName = "Memo(" + (n.displayName || n.name) + ")", u2.prototype.isReactComponent = true, u2.__f = true, u2;
  }
  (E.prototype = new preact2.Component()).isPureReactComponent = true, E.prototype.shouldComponentUpdate = function(n, t) {
    return C(this.props, n) || C(this.state, t);
  };
  var R = preact2.options.__b;
  preact2.options.__b = function(n) {
    n.type && n.type.__f && n.ref && (n.props.ref = n.ref, n.ref = null), R && R(n);
  };
  var O = preact2.options.__e;
  preact2.options.__e = function(n, t, e2, r2) {
    if (n.then) {
      for (var u2, o2 = t; o2 = o2.__; )
        if ((u2 = o2.__c) && u2.__c)
          return null == t.__e && (t.__e = e2.__e, t.__k = e2.__k), u2.__c(n, t);
    }
    O(n, t, e2, r2);
  };
  var T = preact2.options.unmount;
  function I(n, t, e2) {
    return n && (n.__c && n.__c.__H && (n.__c.__H.__.forEach(function(n2) {
      "function" == typeof n2.__c && n2.__c();
    }), n.__c.__H = null), null != (n = g({}, n)).__c && (n.__c.__P === e2 && (n.__c.__P = t), n.__c = null), n.__k = n.__k && n.__k.map(function(n2) {
      return I(n2, t, e2);
    })), n;
  }
  function L(n, t, e2) {
    return n && (n.__v = null, n.__k = n.__k && n.__k.map(function(n2) {
      return L(n2, t, e2);
    }), n.__c && n.__c.__P === t && (n.__e && e2.insertBefore(n.__e, n.__d), n.__c.__e = true, n.__c.__P = e2)), n;
  }
  function U() {
    this.__u = 0, this.t = null, this.__b = null;
  }
  function D(n) {
    var t = n.__.__c;
    return t && t.__a && t.__a(n);
  }
  function M() {
    this.u = null, this.o = null;
  }
  preact2.options.unmount = function(n) {
    var t = n.__c;
    t && t.__R && t.__R(), t && true === n.__h && (n.type = null), T && T(n);
  }, (U.prototype = new preact2.Component()).__c = function(n, t) {
    var e2 = t.__c, r2 = this;
    null == r2.t && (r2.t = []), r2.t.push(e2);
    var u2 = D(r2.__v), o2 = false, i2 = function() {
      o2 || (o2 = true, e2.__R = null, u2 ? u2(l2) : l2());
    };
    e2.__R = i2;
    var l2 = function() {
      if (!--r2.__u) {
        if (r2.state.__a) {
          var n2 = r2.state.__a;
          r2.__v.__k[0] = L(n2, n2.__c.__P, n2.__c.__O);
        }
        var t2;
        for (r2.setState({ __a: r2.__b = null }); t2 = r2.t.pop(); )
          t2.forceUpdate();
      }
    }, c2 = true === t.__h;
    r2.__u++ || c2 || r2.setState({ __a: r2.__b = r2.__v.__k[0] }), n.then(i2, i2);
  }, U.prototype.componentWillUnmount = function() {
    this.t = [];
  }, U.prototype.render = function(n, e2) {
    if (this.__b) {
      if (this.__v.__k) {
        var r2 = document.createElement("div"), o2 = this.__v.__k[0].__c;
        this.__v.__k[0] = I(this.__b, r2, o2.__O = o2.__P);
      }
      this.__b = null;
    }
    var i2 = e2.__a && preact2.createElement(preact2.Fragment, null, n.fallback);
    return i2 && (i2.__h = null), [preact2.createElement(preact2.Fragment, null, e2.__a ? null : n.children), i2];
  };
  var V = function(n, t, e2) {
    if (++e2[1] === e2[0] && n.o.delete(t), n.props.revealOrder && ("t" !== n.props.revealOrder[0] || !n.o.size))
      for (e2 = n.u; e2; ) {
        for (; e2.length > 3; )
          e2.pop()();
        if (e2[1] < e2[0])
          break;
        n.u = e2 = e2[2];
      }
  };
  (M.prototype = new preact2.Component()).__a = function(n) {
    var t = this, e2 = D(t.__v), r2 = t.o.get(n);
    return r2[0]++, function(u2) {
      var o2 = function() {
        t.props.revealOrder ? (r2.push(u2), V(t, n, r2)) : u2();
      };
      e2 ? e2(o2) : o2();
    };
  }, M.prototype.render = function(n) {
    this.u = null, this.o = /* @__PURE__ */ new Map();
    var t = preact2.toChildArray(n.children);
    n.revealOrder && "b" === n.revealOrder[0] && t.reverse();
    for (var e2 = t.length; e2--; )
      this.o.set(t[e2], this.u = [1, 0, this.u]);
    return n.children;
  }, M.prototype.componentDidUpdate = M.prototype.componentDidMount = function() {
    var n = this;
    this.o.forEach(function(t, e2) {
      V(n, e2, t);
    });
  };
  var j = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103, z = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, B = "undefined" != typeof document, H = function(n) {
    return ("undefined" != typeof Symbol && "symbol" == typeof Symbol() ? /fil|che|rad/i : /fil|che|ra/i).test(n);
  };
  preact2.Component.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(t) {
    Object.defineProperty(preact2.Component.prototype, t, { configurable: true, get: function() {
      return this["UNSAFE_" + t];
    }, set: function(n) {
      Object.defineProperty(this, t, { configurable: true, writable: true, value: n });
    } });
  });
  var q = preact2.options.event;
  function G() {
  }
  function J() {
    return this.cancelBubble;
  }
  function K() {
    return this.defaultPrevented;
  }
  preact2.options.event = function(n) {
    return q && (n = q(n)), n.persist = G, n.isPropagationStopped = J, n.isDefaultPrevented = K, n.nativeEvent = n;
  };
  var X = { configurable: true, get: function() {
    return this.class;
  } }, nn = preact2.options.vnode;
  preact2.options.vnode = function(n) {
    var t = n.type, e2 = n.props, u2 = e2;
    if ("string" == typeof t) {
      var o2 = -1 === t.indexOf("-");
      for (var i2 in u2 = {}, e2) {
        var l2 = e2[i2];
        B && "children" === i2 && "noscript" === t || "value" === i2 && "defaultValue" in e2 && null == l2 || ("defaultValue" === i2 && "value" in e2 && null == e2.value ? i2 = "value" : "download" === i2 && true === l2 ? l2 = "" : /ondoubleclick/i.test(i2) ? i2 = "ondblclick" : /^onchange(textarea|input)/i.test(i2 + t) && !H(e2.type) ? i2 = "oninput" : /^onfocus$/i.test(i2) ? i2 = "onfocusin" : /^onblur$/i.test(i2) ? i2 = "onfocusout" : /^on(Ani|Tra|Tou|BeforeInp|Compo)/.test(i2) ? i2 = i2.toLowerCase() : o2 && z.test(i2) ? i2 = i2.replace(/[A-Z0-9]/g, "-$&").toLowerCase() : null === l2 && (l2 = void 0), /^oninput$/i.test(i2) && (i2 = i2.toLowerCase(), u2[i2] && (i2 = "oninputCapture")), u2[i2] = l2);
      }
      "select" == t && u2.multiple && Array.isArray(u2.value) && (u2.value = preact2.toChildArray(e2.children).forEach(function(n2) {
        n2.props.selected = -1 != u2.value.indexOf(n2.props.value);
      })), "select" == t && null != u2.defaultValue && (u2.value = preact2.toChildArray(e2.children).forEach(function(n2) {
        n2.props.selected = u2.multiple ? -1 != u2.defaultValue.indexOf(n2.props.value) : u2.defaultValue == n2.props.value;
      })), n.props = u2, e2.class != e2.className && (X.enumerable = "className" in e2, null != e2.className && (u2.class = e2.className), Object.defineProperty(u2, "className", X));
    }
    n.$$typeof = j, nn && nn(n);
  };
  var tn = preact2.options.__r;
  preact2.options.__r = function(n) {
    tn && tn(n), n.__c;
  };
  var r = (_a = Reflect.get(document, "__monkeyWindow")) != null ? _a : window;
  r.GM;
  r.unsafeWindow = (_b = r.unsafeWindow) != null ? _b : window;
  r.unsafeWindow;
  r.GM_info;
  r.GM_cookie;
  var u = (...e2) => r.GM_setValue(...e2), b = (...e2) => r.GM_xmlhttpRequest(...e2), h = (...e2) => r.GM_getValue(...e2);
  function videoPageParser(responseText, {
    subQuery,
    leakQuery,
    videoQuery
  }) {
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
  function serachPageParser(responseText, {
    linkQuery,
    titleQuery,
    listIndex = 0,
    spaceCode = false
  }, siteHostName, CODE) {
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
        return {
          targetLink: "",
          isSuccess: false,
          hasSubtitle: false,
          hasLeakage: false
        };
      }
    }
    return query();
  }
  async function xhr(siteItem, targetLink, CODE) {
    const xhrPromise = new Promise((resolve) => {
      b({
        method: "GET",
        url: targetLink,
        onload: (response) => {
          if (siteItem.fetcher === "get") {
            if (response.status === 404) {
              resolve({
                isSuccess: false,
                targetLink,
                hasSubtitle: false,
                hasLeakage: false,
                msg: "\u5E94\u8BE5\u662F\u6CA1\u6709\u8D44\u6E90"
              });
            } else {
              const {
                hasSubtitle,
                hasLeakage,
                isSuccess
              } = videoPageParser(response.responseText, siteItem.domQuery);
              resolve({
                isSuccess,
                targetLink,
                hasSubtitle,
                hasLeakage,
                msg: "[get]\uFF0C\u5B58\u5728\u8D44\u6E90"
              });
            }
          } else if (siteItem.fetcher === "parser") {
            const {
              targetLink: targetLink2,
              isSuccess,
              hasLeakage,
              hasSubtitle
            } = serachPageParser(response.responseText, siteItem.domQuery, siteItem.hostname, CODE);
            resolve({
              isSuccess,
              targetLink: isSuccess ? targetLink2 : targetLink2,
              hasSubtitle,
              hasLeakage,
              msg: "[parser]\u5B58\u5728\u8D44\u6E90"
            });
          }
        },
        onerror: (error) => {
          resolve({
            isSuccess: false,
            targetLink,
            hasSubtitle: false,
            hasLeakage: false,
            msg: error.error
          });
        }
      });
    });
    return xhrPromise;
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
      name: "HAYAV",
      hostname: "hayav.com",
      url: "https://hayav.com/video/{{code}}/",
      fetcher: "get",
      domQuery: {},
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
    var l2, s2, u2 = {};
    for (s2 in e2)
      "ref" == s2 ? l2 = e2[s2] : u2[s2] = e2[s2];
    var a2 = { type: o2, props: u2, key: n, ref: l2, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, __h: null, constructor: void 0, __v: --_, __source: f2, __self: t };
    if ("function" == typeof o2 && (l2 = o2.defaultProps))
      for (s2 in l2)
        void 0 === u2[s2] && (u2[s2] = l2[s2]);
    return preact2.options.vnode && preact2.options.vnode(a2), a2;
  }
  const Info = w(({
    infos
  }) => {
    return o("div", {
      className: "jop-info",
      children: [o("span", {
        className: "jop-info-code",
        title: "\u70B9\u51FB\u590D\u5236",
        onClick: () => infos.codeText && navigator.clipboard.writeText(infos.codeText),
        children: infos.codeText ? infos.codeText : "\u6682\u65E0"
      }), o("div", {
        class: "jop-info-actor",
        children: infos.actorList.length !== 0 ? o(preact2.Fragment, {
          children: [o("a", {
            class: "jop-info-actor-item",
            target: "_blank",
            href: infos.actorList[0].link,
            children: infos.actorList[0].text
          }), o("span", {
            children: " \u7B49"
          })]
        }) : o("div", {
          children: "\u65E0\u6F14\u5458\u4FE1\u606F"
        })
      })]
    });
  });
  const SiteButton = w(({
    itemData
  }) => {
    const {
      name,
      targetLink,
      status
    } = itemData;
    const {
      isSuccess,
      hasSubtitle,
      hasLeakage
    } = status;
    const colorClass = isSuccess === "pedding" ? " " : isSuccess === "fulfilled" ? "jop-button_green " : "jop-button_red ";
    return o("a", {
      className: "jop-button " + colorClass,
      target: "_blank",
      href: targetLink,
      children: [(hasSubtitle || hasLeakage) && o("div", {
        className: "jop-button_label",
        children: [hasSubtitle && o("span", {
          children: "\u5B57\u5E55 "
        }), hasLeakage && o("span", {
          children: " \u65E0\u7801"
        })]
      }), o("span", {
        children: name
      })]
    });
  });
  const Top = ({
    showPanel,
    setShowPanel
  }) => {
    const [showSettingPanel, setShowSettingPanel] = y(false);
    const gmShowPanel = h("setting", {
      gmShowPanel: true
    }).gmShowPanel;
    return o("div", {
      className: "jop-top",
      children: [showPanel && o("div", {
        className: "jop-top-setting jop-top-item",
        onClick: (e2) => {
          e2.stopPropagation();
          setShowSettingPanel(!showSettingPanel);
        },
        children: o("div", {
          className: "jop-top-setting-svg jop-top-svgicon",
          children: o("svg", {
            width: "25",
            height: "25",
            viewBox: "0 0 48 48",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            children: [o("path", {
              d: "M41.5 10H35.5",
              stroke: "#333",
              "stroke-width": "3",
              "stroke-linecap": "round",
              "stroke-linejoin": "round"
            }), o("path", {
              d: "M27.5 6V14",
              stroke: "#333",
              "stroke-width": "3",
              "stroke-linecap": "round",
              "stroke-linejoin": "round"
            }), o("path", {
              d: "M27.5 10L5.5 10",
              stroke: "#333",
              "stroke-width": "3",
              "stroke-linecap": "round",
              "stroke-linejoin": "round"
            }), o("path", {
              d: "M13.5 24H5.5",
              stroke: "#333",
              "stroke-width": "3",
              "stroke-linecap": "round",
              "stroke-linejoin": "round"
            }), o("path", {
              d: "M21.5 20V28",
              stroke: "#333",
              "stroke-width": "3",
              "stroke-linecap": "round",
              "stroke-linejoin": "round"
            }), o("path", {
              d: "M43.5 24H21.5",
              stroke: "#333",
              "stroke-width": "3",
              "stroke-linecap": "round",
              "stroke-linejoin": "round"
            }), o("path", {
              d: "M41.5 38H35.5",
              stroke: "#333",
              "stroke-width": "3",
              "stroke-linecap": "round",
              "stroke-linejoin": "round"
            }), o("path", {
              d: "M27.5 34V42",
              stroke: "#333",
              "stroke-width": "3",
              "stroke-linecap": "round",
              "stroke-linejoin": "round"
            }), o("path", {
              d: "M27.5 38H5.5",
              stroke: "#333",
              "stroke-width": "3",
              "stroke-linecap": "round",
              "stroke-linejoin": "round"
            })]
          })
        })
      }), showSettingPanel && showPanel && o("div", {
        className: "jop-top-settingPanel",
        children: [o("h4", {
          className: "jop-top-setting-title",
          children: "\u811A\u672C\u8BBE\u7F6E"
        }), o("div", {
          className: "jop-top-settingPanel-item",
          children: ["\u9ED8\u8BA4\u663E\u793A\u811A\u672C\u754C\u9762", o("input", {
            type: "checkbox",
            className: "jop-top-checkbox",
            checked: gmShowPanel,
            onChange: (e2) => {
              const checked = e2.target.checked;
              u("setting", {
                gmShowPanel: checked
              });
              setShowPanel(checked);
            }
          })]
        })]
      }), o("div", {
        className: "jop-top-close jop-top-item jop-top-svgicon",
        onClick: (e2) => {
          e2.stopPropagation();
          setShowPanel(!showPanel);
        },
        children: showPanel ? o("svg", {
          width: "25",
          height: "25",
          viewBox: "0 0 48 48",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: [o("path", {
            d: "M9.85786 18C6.23858 21 4 24 4 24C4 24 12.9543 36 24 36C25.3699 36 26.7076 35.8154 28 35.4921M20.0318 12.5C21.3144 12.1816 22.6414 12 24 12C35.0457 12 44 24 44 24C44 24 41.7614 27 38.1421 30",
            stroke: "#333",
            "stroke-width": "3",
            "stroke-linecap": "round",
            "stroke-linejoin": "round"
          }), o("path", {
            d: "M20.3142 20.6211C19.4981 21.5109 19 22.6972 19 23.9998C19 26.7612 21.2386 28.9998 24 28.9998C25.3627 28.9998 26.5981 28.4546 27.5 27.5705",
            stroke: "#333",
            "stroke-width": "3",
            "stroke-linecap": "round",
            "stroke-linejoin": "round"
          }), o("path", {
            d: "M42 42L6 6",
            stroke: "#333",
            "stroke-width": "3",
            "stroke-linecap": "round",
            "stroke-linejoin": "round"
          })]
        }) : o("svg", {
          width: "25",
          height: "25",
          viewBox: "0 0 48 48",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: [o("path", {
            d: "M24 36C35.0457 36 44 24 44 24C44 24 35.0457 12 24 12C12.9543 12 4 24 4 24C4 24 12.9543 36 24 36Z",
            fill: "none",
            stroke: "#333",
            "stroke-width": "3",
            "stroke-linejoin": "round"
          }), o("path", {
            d: "M24 29C26.7614 29 29 26.7614 29 24C29 21.2386 26.7614 19 24 19C21.2386 19 19 21.2386 19 24C19 26.7614 21.2386 29 24 29Z",
            fill: "none",
            stroke: "#333",
            "stroke-width": "3",
            "stroke-linejoin": "round"
          })]
        })
      })]
    });
  };
  const App = w(function({
    cms,
    infos,
    CODE
  }) {
    const gmShowPanel = h("setting", {
      gmShowPanel: true
    }).gmShowPanel;
    const [showPanel, setShowPanel] = y(gmShowPanel);
    const initSiteList = siteList.filter((item) => item.disable !== cms.name);
    const [renderSiteList, setRenderSiteList] = y(initSiteList.map((item) => ({
      name: item.name,
      targetLink: item.url.replace("{{code}}", CODE),
      status: {
        isSuccess: "pedding",
        hasSubtitle: false,
        hasLeakage: false
      }
    })));
    s(() => {
      initSiteList.forEach(async (siteItem, index) => {
        const targetLink = siteItem.url.replace("{{code}}", CODE);
        const result = await xhr(siteItem, targetLink, CODE);
        renderSiteList[index] = {
          name: siteItem.name,
          targetLink,
          status: {
            isSuccess: result.isSuccess ? "fulfilled" : "rejected",
            hasLeakage: result.hasLeakage,
            hasSubtitle: result.hasSubtitle
          }
        };
        setRenderSiteList([...renderSiteList]);
      });
    }, [xhr, setRenderSiteList]);
    return o(preact2.Fragment, {
      children: [showPanel && o("div", {
        className: "jop-panel",
        children: [o(Info, {
          infos
        }), o("div", {
          className: "jop-list",
          children: renderSiteList.map((item) => {
            return o(SiteButton, {
              itemData: item
            });
          })
        })]
      }), o(Top, {
        showPanel,
        setShowPanel
      })]
    });
  });
  function main() {
    const cms = matchList.find((item) => item.href.test(window.location.href));
    const infos = getInfos(cms);
    const CODE = infos.codeText;
    if (CODE === void 0)
      return;
    cms.method();
    const panelParent = document.querySelector(cms.panelParentQueryStr);
    panelParent == null ? void 0 : panelParent.classList.add("jop-panelParent");
    preact2.render(o(App, {
      cms,
      CODE,
      infos
    }), panelParent);
  }
  main();
})(preact);
