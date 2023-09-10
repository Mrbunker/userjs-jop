// ==UserScript==
// @name         JAV 添加跳转在线观看
// @namespace    https://greasyfork.org/zh-CN/scripts/429173
// @version      1.1.15
// @author       mission522
// @description  为 JavDB、JavBus、JavLibrary 这三个站点添加跳转在线观看的链接
// @license      MIT
// @icon         https://javdb.com/favicon-32x32.png
// @include      /^https?:\/\/(\w*\.)?javdb(\d)*\.com.*$/
// @include      /^https?:\/\/(\w*\.)?(javbus|seejav|javsee)*\.(com|cc|me|life|bid).*$/
// @include      /^http.*\/cn\/\?v=jav.*$/
// @require      https://cdn.jsdelivr.net/npm/preact@10.15.1/dist/preact.min.js
// @connect      jable.tv
// @connect      missav.com
// @connect      missav123.com
// @connect      njav.tv
// @connect      supjav.com
// @connect      netflav.com
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
// @connect      av01.tv
// @connect      18sex.org
// @connect      highporn.net
// @connect      18av.mm-cg.com
// @connect      javbus.com
// @connect      javdb.com
// @connect      javlibrary.com
// @connect      javdb008.com
// @connect      g64w.com
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(t=>{const o=document.createElement("style");o.dataset.source="vite-plugin-monkey",o.textContent=t,document.head.append(o)})(" .jop-list{box-sizing:border-box;display:flex;flex-wrap:wrap;justify-content:flex-start;gap:10px;width:100%;height:100%;z-index:1;background-color:#fff;transition:right .2s ease-in-out;font-family:Roboto,Helvetica,Arial,sans-serif;color:#000}.jop-button,.jop-button_def{position:relative;display:flex;align-items:center;justify-content:center;box-sizing:border-box;padding:3px 10px;border-radius:4px;font-weight:500;font-size:14px;border:1px solid #dcdfe6;color:#606266;cursor:pointer}.jop-button_def{margin:10px 0;width:100px}.jop-button:visited{color:#606266}.jop-button:hover{text-decoration:none;color:#409eff;border:1px solid #c6e2ff;background-color:#ecf5ff}.jop-button_label{position:absolute;font-size:10px;padding:4px;border-radius:4px;top:-13px;right:-10px;line-height:.75;color:#67c23a;border:1px solid #e1f3d8;background:white}.jop-button_green{color:#fff!important;background-color:#67c23a}.jop-button_green:hover{color:#fff!important;background-color:#95d475}.jop-button_red{color:#fff!important;background-color:#f56c6c}.jop-button_red:hover{color:#fff!important;background-color:#f89898}.jop-loading{display:inline-block;width:14px;height:14px;margin-right:10px;border:2px dashed #dcdfe6;border-top-color:transparent;border-radius:100%;animation:btnLoading infinite 1s linear}@keyframes btnLoading{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.jop-tag{padding:3px 6px;color:#409eff!important;background:#ecf5ff;border:1px solid #d9ecff;border-radius:4px}.jop-setting-list{display:flex;flex-wrap:wrap;background-color:#fff}.jop-setting-title{margin:10px 0 5px}.jop-setting-item{display:flex;height:20px;justify-content:center;align-items:center;margin-right:15px;user-select:none;cursor:pointer}.db-panel .movie-panel-info div.panel-block{padding:5.5px 12px}.db-panel .jop-app{padding:15px 12px}.lib-panel .jop-app{padding:20px 30px;margin-top:10px}input[type=checkbox],input[type=radio]{margin:0 0 0 5px;cursor:pointer} ");

(function (preact) {
  'use strict';

  const libSites = [{
    name: "javdb",
    enable: true,
    href: /^https?:\/\/(\w*\.)?javdb(\d)*\.com.*$/,
    querys: {
      panelQueryStr: ".video-meta-panel>.columns.is-desktop .panel.movie-panel-info",
      codeQueryStr: `[data-clipboard-text]`
    },
    method() {
      const columnVideoCover = document.querySelector(".column-video-cover");
      columnVideoCover.style.width = "60%";
      const panel = document.querySelector(".video-meta-panel>.columns.is-desktop>.column:not(.column-video-cover)");
      panel.classList.add("db-panel");
    }
  }, {
    name: "javbus",
    enable: true,
    href: /^https?:\/\/(\w*\.)?(javbus|seejav|javsee)*\.(com|cc|me|life|bid).*$/,
    querys: {
      panelQueryStr: ".movie>div.info",
      codeQueryStr: `span[style="color:#CC0000;"]`
    },
    method() {
    }
  }, {
    name: "javlib",
    enable: true,
    href: /^http.*\/cn\/\?v=jav.*$/,
    querys: {
      panelQueryStr: "#video_jacket_info #video_info",
      codeQueryStr: `#video_id td.text`
    },
    method() {
      const panel = document.querySelector("#video_info");
      panel.classList.add("lib-panel");
    }
  }];
  var _GM_getValue = /* @__PURE__ */ (() => typeof GM_getValue != "undefined" ? GM_getValue : void 0)();
  var _GM_setValue = /* @__PURE__ */ (() => typeof GM_setValue != "undefined" ? GM_setValue : void 0)();
  var _GM_xmlhttpRequest = /* @__PURE__ */ (() => typeof GM_xmlhttpRequest != "undefined" ? GM_xmlhttpRequest : void 0)();
  const isCaseInsensitiveEqual = (str1, str2) => {
    return str1.toLowerCase() === str2.toLowerCase();
  };
  const isErrorCode = (resCode) => {
    return [404, 403].includes(resCode);
  };
  const regEnum = {
    subtitle: /(中文|字幕|subtitle)/,
    leakage: /(无码|無碼|泄漏|Uncensored)/
  };
  const getCode = (libItem) => {
    const {
      codeQueryStr
    } = libItem.querys;
    const codeNode = document.querySelector(codeQueryStr);
    if (!codeNode)
      return "";
    const codeText = libItem.name === "javdb" ? codeNode.dataset.clipboardText : codeNode.innerText.replace("复制", "");
    if (codeText == null ? void 0 : codeText.includes("FC2"))
      return codeText.split("-")[1];
    return codeText;
  };
  const gmFetch = ({
    url
  }) => {
    return new Promise((resolve, reject) => {
      _GM_xmlhttpRequest({
        method: "GET",
        url,
        onload: (response) => resolve(response),
        onerror: (error) => reject(error)
      });
    });
  };
  var t, r, u, i, o$1 = 0, f = [], c = [], e = preact.options.__b, a = preact.options.__r, v = preact.options.diffed, l = preact.options.__c, m = preact.options.unmount;
  function d(t2, u2) {
    preact.options.__h && preact.options.__h(r, t2, o$1 || u2), o$1 = 0;
    var i2 = r.__H || (r.__H = { __: [], __h: [] });
    return t2 >= i2.__.length && i2.__.push({ __V: c }), i2.__[t2];
  }
  function h(n) {
    return o$1 = 1, s(B$1, n);
  }
  function s(n, u2, i2) {
    var o2 = d(t++, 2);
    if (o2.t = n, !o2.__c && (o2.__ = [i2 ? i2(u2) : B$1(void 0, u2), function(n2) {
      var t2 = o2.__N ? o2.__N[0] : o2.__[0], r2 = o2.t(t2, n2);
      t2 !== r2 && (o2.__N = [r2, o2.__[1]], o2.__c.setState({}));
    }], o2.__c = r, !r.u)) {
      var f2 = function(n2, t2, r2) {
        if (!o2.__c.__H)
          return true;
        var u3 = o2.__c.__H.__.filter(function(n3) {
          return n3.__c;
        });
        if (u3.every(function(n3) {
          return !n3.__N;
        }))
          return !c2 || c2.call(this, n2, t2, r2);
        var i3 = false;
        return u3.forEach(function(n3) {
          if (n3.__N) {
            var t3 = n3.__[0];
            n3.__ = n3.__N, n3.__N = void 0, t3 !== n3.__[0] && (i3 = true);
          }
        }), !(!i3 && o2.__c.props === n2) && (!c2 || c2.call(this, n2, t2, r2));
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
  function p(u2, i2) {
    var o2 = d(t++, 3);
    !preact.options.__s && z(o2.__H, i2) && (o2.__ = u2, o2.i = i2, r.__H.__h.push(o2));
  }
  function b() {
    for (var t2; t2 = f.shift(); )
      if (t2.__P && t2.__H)
        try {
          t2.__H.__h.forEach(k), t2.__H.__h.forEach(w$1), t2.__H.__h = [];
        } catch (r2) {
          t2.__H.__h = [], preact.options.__e(r2, t2.__v);
        }
  }
  preact.options.__b = function(n) {
    r = null, e && e(n);
  }, preact.options.__r = function(n) {
    a && a(n), t = 0;
    var i2 = (r = n.__c).__H;
    i2 && (u === r ? (i2.__h = [], r.__h = [], i2.__.forEach(function(n2) {
      n2.__N && (n2.__ = n2.__N), n2.__V = c, n2.__N = n2.i = void 0;
    })) : (i2.__h.forEach(k), i2.__h.forEach(w$1), i2.__h = [], t = 0)), u = r;
  }, preact.options.diffed = function(t2) {
    v && v(t2);
    var o2 = t2.__c;
    o2 && o2.__H && (o2.__H.__h.length && (1 !== f.push(o2) && i === preact.options.requestAnimationFrame || ((i = preact.options.requestAnimationFrame) || j)(b)), o2.__H.__.forEach(function(n) {
      n.i && (n.__H = n.i), n.__V !== c && (n.__ = n.__V), n.i = void 0, n.__V = c;
    })), u = r = null;
  }, preact.options.__c = function(t2, r2) {
    r2.some(function(t3) {
      try {
        t3.__h.forEach(k), t3.__h = t3.__h.filter(function(n) {
          return !n.__ || w$1(n);
        });
      } catch (u2) {
        r2.some(function(n) {
          n.__h && (n.__h = []);
        }), r2 = [], preact.options.__e(u2, t3.__v);
      }
    }), l && l(t2, r2);
  }, preact.options.unmount = function(t2) {
    m && m(t2);
    var r2, u2 = t2.__c;
    u2 && u2.__H && (u2.__H.__.forEach(function(n) {
      try {
        k(n);
      } catch (n2) {
        r2 = n2;
      }
    }), u2.__H = void 0, r2 && preact.options.__e(r2, u2.__v));
  };
  var g$1 = "function" == typeof requestAnimationFrame;
  function j(n) {
    var t2, r2 = function() {
      clearTimeout(u2), g$1 && cancelAnimationFrame(t2), setTimeout(n);
    }, u2 = setTimeout(r2, 100);
    g$1 && (t2 = requestAnimationFrame(r2));
  }
  function k(n) {
    var t2 = r, u2 = n.__c;
    "function" == typeof u2 && (n.__c = void 0, u2()), r = t2;
  }
  function w$1(n) {
    var t2 = r;
    n.__c = n.__(), r = t2;
  }
  function z(n, t2) {
    return !n || n.length !== t2.length || t2.some(function(t3, r2) {
      return t3 !== n[r2];
    });
  }
  function B$1(n, t2) {
    return "function" == typeof t2 ? t2(n) : t2;
  }
  function g(n, t2) {
    for (var e2 in t2)
      n[e2] = t2[e2];
    return n;
  }
  function C(n, t2) {
    for (var e2 in n)
      if ("__source" !== e2 && !(e2 in t2))
        return true;
    for (var r2 in t2)
      if ("__source" !== r2 && n[r2] !== t2[r2])
        return true;
    return false;
  }
  function w(n) {
    this.props = n;
  }
  function x(n, e2) {
    function r2(n2) {
      var t2 = this.props.ref, r3 = t2 == n2.ref;
      return !r3 && t2 && (t2.call ? t2(null) : t2.current = null), e2 ? !e2(this.props, n2) || !r3 : C(this.props, n2);
    }
    function u2(e3) {
      return this.shouldComponentUpdate = r2, preact.createElement(n, e3);
    }
    return u2.displayName = "Memo(" + (n.displayName || n.name) + ")", u2.prototype.isReactComponent = true, u2.__f = true, u2;
  }
  (w.prototype = new preact.Component()).isPureReactComponent = true, w.prototype.shouldComponentUpdate = function(n, t2) {
    return C(this.props, n) || C(this.state, t2);
  };
  var R = preact.options.__b;
  preact.options.__b = function(n) {
    n.type && n.type.__f && n.ref && (n.props.ref = n.ref, n.ref = null), R && R(n);
  };
  var T = preact.options.__e;
  preact.options.__e = function(n, t2, e2, r2) {
    if (n.then) {
      for (var u2, o2 = t2; o2 = o2.__; )
        if ((u2 = o2.__c) && u2.__c)
          return null == t2.__e && (t2.__e = e2.__e, t2.__k = e2.__k), u2.__c(n, t2);
    }
    T(n, t2, e2, r2);
  };
  var I = preact.options.unmount;
  function L(n, t2, e2) {
    return n && (n.__c && n.__c.__H && (n.__c.__H.__.forEach(function(n2) {
      "function" == typeof n2.__c && n2.__c();
    }), n.__c.__H = null), null != (n = g({}, n)).__c && (n.__c.__P === e2 && (n.__c.__P = t2), n.__c = null), n.__k = n.__k && n.__k.map(function(n2) {
      return L(n2, t2, e2);
    })), n;
  }
  function U(n, t2, e2) {
    return n && (n.__v = null, n.__k = n.__k && n.__k.map(function(n2) {
      return U(n2, t2, e2);
    }), n.__c && n.__c.__P === t2 && (n.__e && e2.insertBefore(n.__e, n.__d), n.__c.__e = true, n.__c.__P = e2)), n;
  }
  function D() {
    this.__u = 0, this.t = null, this.__b = null;
  }
  function F(n) {
    var t2 = n.__.__c;
    return t2 && t2.__a && t2.__a(n);
  }
  function V() {
    this.u = null, this.o = null;
  }
  preact.options.unmount = function(n) {
    var t2 = n.__c;
    t2 && t2.__R && t2.__R(), t2 && true === n.__h && (n.type = null), I && I(n);
  }, (D.prototype = new preact.Component()).__c = function(n, t2) {
    var e2 = t2.__c, r2 = this;
    null == r2.t && (r2.t = []), r2.t.push(e2);
    var u2 = F(r2.__v), o2 = false, i2 = function() {
      o2 || (o2 = true, e2.__R = null, u2 ? u2(l2) : l2());
    };
    e2.__R = i2;
    var l2 = function() {
      if (!--r2.__u) {
        if (r2.state.__a) {
          var n2 = r2.state.__a;
          r2.__v.__k[0] = U(n2, n2.__c.__P, n2.__c.__O);
        }
        var t3;
        for (r2.setState({ __a: r2.__b = null }); t3 = r2.t.pop(); )
          t3.forceUpdate();
      }
    }, c2 = true === t2.__h;
    r2.__u++ || c2 || r2.setState({ __a: r2.__b = r2.__v.__k[0] }), n.then(i2, i2);
  }, D.prototype.componentWillUnmount = function() {
    this.t = [];
  }, D.prototype.render = function(n, e2) {
    if (this.__b) {
      if (this.__v.__k) {
        var r2 = document.createElement("div"), o2 = this.__v.__k[0].__c;
        this.__v.__k[0] = L(this.__b, r2, o2.__O = o2.__P);
      }
      this.__b = null;
    }
    var i2 = e2.__a && preact.createElement(preact.Fragment, null, n.fallback);
    return i2 && (i2.__h = null), [preact.createElement(preact.Fragment, null, e2.__a ? null : n.children), i2];
  };
  var W = function(n, t2, e2) {
    if (++e2[1] === e2[0] && n.o.delete(t2), n.props.revealOrder && ("t" !== n.props.revealOrder[0] || !n.o.size))
      for (e2 = n.u; e2; ) {
        for (; e2.length > 3; )
          e2.pop()();
        if (e2[1] < e2[0])
          break;
        n.u = e2 = e2[2];
      }
  };
  (V.prototype = new preact.Component()).__a = function(n) {
    var t2 = this, e2 = F(t2.__v), r2 = t2.o.get(n);
    return r2[0]++, function(u2) {
      var o2 = function() {
        t2.props.revealOrder ? (r2.push(u2), W(t2, n, r2)) : u2();
      };
      e2 ? e2(o2) : o2();
    };
  }, V.prototype.render = function(n) {
    this.u = null, this.o = /* @__PURE__ */ new Map();
    var t2 = preact.toChildArray(n.children);
    n.revealOrder && "b" === n.revealOrder[0] && t2.reverse();
    for (var e2 = t2.length; e2--; )
      this.o.set(t2[e2], this.u = [1, 0, this.u]);
    return n.children;
  }, V.prototype.componentDidUpdate = V.prototype.componentDidMount = function() {
    var n = this;
    this.o.forEach(function(t2, e2) {
      W(n, e2, t2);
    });
  };
  var B = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103, H = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, Z = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, Y = /[A-Z0-9]/g, $ = "undefined" != typeof document, q = function(n) {
    return ("undefined" != typeof Symbol && "symbol" == typeof Symbol() ? /fil|che|rad/ : /fil|che|ra/).test(n);
  };
  preact.Component.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(t2) {
    Object.defineProperty(preact.Component.prototype, t2, { configurable: true, get: function() {
      return this["UNSAFE_" + t2];
    }, set: function(n) {
      Object.defineProperty(this, t2, { configurable: true, writable: true, value: n });
    } });
  });
  var K = preact.options.event;
  function Q() {
  }
  function X() {
    return this.cancelBubble;
  }
  function nn() {
    return this.defaultPrevented;
  }
  preact.options.event = function(n) {
    return K && (n = K(n)), n.persist = Q, n.isPropagationStopped = X, n.isDefaultPrevented = nn, n.nativeEvent = n;
  };
  var en = { enumerable: false, configurable: true, get: function() {
    return this.class;
  } }, rn = preact.options.vnode;
  preact.options.vnode = function(n) {
    "string" == typeof n.type && function(n2) {
      var t2 = n2.props, e2 = n2.type, u2 = {};
      for (var o2 in t2) {
        var i2 = t2[o2];
        if (!("value" === o2 && "defaultValue" in t2 && null == i2 || $ && "children" === o2 && "noscript" === e2 || "class" === o2 || "className" === o2)) {
          var l2 = o2.toLowerCase();
          "defaultValue" === o2 && "value" in t2 && null == t2.value ? o2 = "value" : "download" === o2 && true === i2 ? i2 = "" : "ondoubleclick" === l2 ? o2 = "ondblclick" : "onchange" !== l2 || "input" !== e2 && "textarea" !== e2 || q(t2.type) ? "onfocus" === l2 ? o2 = "onfocusin" : "onblur" === l2 ? o2 = "onfocusout" : Z.test(o2) ? o2 = l2 : -1 === e2.indexOf("-") && H.test(o2) ? o2 = o2.replace(Y, "-$&").toLowerCase() : null === i2 && (i2 = void 0) : l2 = o2 = "oninput", "oninput" === l2 && u2[o2 = l2] && (o2 = "oninputCapture"), u2[o2] = i2;
        }
      }
      "select" == e2 && u2.multiple && Array.isArray(u2.value) && (u2.value = preact.toChildArray(t2.children).forEach(function(n3) {
        n3.props.selected = -1 != u2.value.indexOf(n3.props.value);
      })), "select" == e2 && null != u2.defaultValue && (u2.value = preact.toChildArray(t2.children).forEach(function(n3) {
        n3.props.selected = u2.multiple ? -1 != u2.defaultValue.indexOf(n3.props.value) : u2.defaultValue == n3.props.value;
      })), t2.class && !t2.className ? (u2.class = t2.class, Object.defineProperty(u2, "className", en)) : (t2.className && !t2.class || t2.class && t2.className) && (u2.class = u2.className = t2.className), n2.props = u2;
    }(n), n.$$typeof = B, rn && rn(n);
  };
  var un = preact.options.__r;
  preact.options.__r = function(n) {
    un && un(n), n.__c;
  };
  var on = preact.options.diffed;
  preact.options.diffed = function(n) {
    on && on(n);
    var t2 = n.props, e2 = n.__e;
    null != e2 && "textarea" === n.type && "value" in t2 && t2.value !== e2.value && (e2.value = null == t2.value ? "" : t2.value);
  };
  var _ = 0;
  function o(o2, e2, n, t2, f2, l2) {
    var s2, u2, a2 = {};
    for (u2 in e2)
      "ref" == u2 ? s2 = e2[u2] : a2[u2] = e2[u2];
    var i2 = { type: o2, props: a2, key: n, ref: s2, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, __h: null, constructor: void 0, __v: --_, __source: f2, __self: l2 };
    if ("function" == typeof o2 && (s2 = o2.defaultProps))
      for (u2 in s2)
        void 0 === a2[u2] && (a2[u2] = s2[u2]);
    return preact.options.vnode && preact.options.vnode(i2), i2;
  }
  const Setting = ({
    siteList: siteList2,
    setDisables,
    disables
  }) => {
    const [showSetting, setShowSetting] = h(false);
    const changeCheck = (item, isHidden) => {
      if (isHidden) {
        setDisables(disables.filter((disItem) => disItem !== item.name));
      } else {
        setDisables([...disables, item.name]);
      }
    };
    return o(preact.Fragment, {
      children: [!showSetting ? o("div", {
        className: "jop-button_def",
        onClick: () => {
          setShowSetting(!showSetting);
        },
        children: "设置"
      }) : o("h4", {
        className: "jop-setting-title",
        children: "勾选默认显示的网站"
      }), showSetting && o(preact.Fragment, {
        children: [o("div", {
          className: "jop-setting",
          children: o("div", {
            className: "jop-setting-list",
            children: siteList2.map((item) => {
              const isHidden = disables.includes(item.name);
              return o("div", {
                className: "jop-setting-item",
                onClick: () => {
                  changeCheck(item, isHidden);
                },
                children: [item.name, o("input", {
                  type: "checkbox",
                  className: "jop-setting-checkbox",
                  checked: !isHidden
                })]
              });
            })
          })
        }), o("div", {
          className: "jop-button_def",
          onClick: () => {
            setShowSetting(!showSetting);
          },
          children: "收起设置"
        })]
      })]
    });
  };
  function videoPageParser(responseText, {
    subQuery,
    leakQuery,
    videoQuery
  }) {
    const doc = new DOMParser().parseFromString(responseText, "text/html");
    const subNode = subQuery ? doc.querySelector(subQuery) : "";
    const subNodeText = subNode ? subNode.innerHTML : "";
    const leakNode = leakQuery ? doc.querySelector(leakQuery) : null;
    const linkNodeText = leakNode ? leakNode.innerHTML : "";
    const videoNode = videoQuery ? doc.querySelector(videoQuery) : true;
    return {
      isSuccess: !!videoNode,
      hasSubtitle: regEnum.subtitle.test(subNodeText),
      hasLeakage: regEnum.leakage.test(linkNodeText)
    };
  }
  function serachPageParser(responseText, {
    linkQuery,
    titleQuery,
    listIndex = 0
  }, siteHostName, CODE) {
    const doc = new DOMParser().parseFromString(responseText, "text/html");
    const linkNode = linkQuery ? doc.querySelectorAll(linkQuery)[listIndex] : null;
    const titleNode = titleQuery ? doc.querySelectorAll(titleQuery)[listIndex] : null;
    const titleNodeText = titleNode ? titleNode == null ? void 0 : titleNode.outerHTML : "";
    const codeRegex = /[a-zA-Z]{3,5}-\d{3,5}/;
    const matchCode = titleNodeText.match(codeRegex);
    const isSuccess = linkNode && titleNode && matchCode && isCaseInsensitiveEqual(matchCode[0], CODE);
    if (isSuccess) {
      const targetLinkText = linkNode.href.replace(linkNode.hostname, siteHostName);
      return {
        isSuccess: true,
        targetLink: targetLinkText,
        hasLeakage: regEnum.leakage.test(titleNodeText),
        hasSubtitle: regEnum.subtitle.test(titleNodeText)
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
  const handleFetch = async (siteItem, targetLink, CODE) => {
    try {
      const response = await gmFetch({
        url: targetLink
      });
      if (isErrorCode(response.status)) {
        throw Error(String(response.status));
      }
      if (siteItem.fetcher === "get") {
        return {
          ...videoPageParser(response.responseText, siteItem.domQuery),
          targetLink,
          msg: "[get]，存在资源"
        };
      } else {
        return {
          ...serachPageParser(response.responseText, siteItem.domQuery, siteItem.hostname, CODE),
          msg: "[parser]存在资源"
        };
      }
    } catch (error) {
      return {
        isSuccess: false,
        targetLink,
        hasSubtitle: false,
        hasLeakage: false,
        msg: String(error)
      };
    }
  };
  const SiteBtn = x(({
    siteItem,
    CODE
  }) => {
    const {
      name,
      codeFormater
    } = siteItem;
    const formatCode = codeFormater ? codeFormater(CODE) : CODE;
    const link = siteItem.url.replace("{{code}}", formatCode);
    const [status, setStatus] = h({
      isSuccess: "pedding",
      hasSubtitle: false,
      hasLeakage: false,
      targetLink: ""
    });
    const {
      isSuccess,
      hasSubtitle,
      hasLeakage,
      targetLink
    } = status;
    p(() => {
      handleFetch(siteItem, link, formatCode).then((res) => {
        setStatus({
          isSuccess: res.isSuccess ? "fulfilled" : "rejected",
          hasSubtitle: res.hasSubtitle,
          hasLeakage: res.hasLeakage,
          targetLink: res.targetLink
        });
      });
    }, [handleFetch, siteItem, CODE, link]);
    const colorClass = isSuccess === "pedding" ? " " : isSuccess === "fulfilled" ? "jop-button_green " : "jop-button_red ";
    return o("a", {
      className: "jop-button " + colorClass,
      target: "_blank",
      href: targetLink === "" ? link : targetLink,
      children: [(hasSubtitle || hasLeakage) && o("div", {
        className: "jop-button_label",
        children: [hasSubtitle && o("span", {
          children: "字幕 "
        }), hasLeakage && o("span", {
          children: " 无码"
        })]
      }), o("span", {
        children: name
      })]
    });
  });
  const print = (name) => {
    console.log(name);
  };
  const siteList = [{
    name: "Jable",
    hostname: "jable.tv",
    url: "https://jable.tv/search/{{code}}/",
    fetcher: "parser",
    domQuery: {
      linkQuery: `.container .detail>.title>a`,
      titleQuery: `.container .detail>.title>a`
      // checkMethod: () => ({}),
    },
    method: print
  }, {
    name: "MISSAV",
    hostname: "missav.com",
    url: "https://missav.com/{{code}}/",
    fetcher: "get",
    domQuery: {
      // 标签区的第一个一般是字幕标签
      subQuery: '.space-y-2 a.text-nord13[href="https://missav.com/chinese-subtitle"]'
      // 有个「切換無碼」按钮，藏在分享按钮旁边……
      // leakQuery: ".order-first div.rounded-md a[href]:last-child",
    },
    method: print
  }, {
    name: "MISSAV_",
    hostname: "missav123.com",
    url: "https://missav123.com/{{code}}/",
    fetcher: "get",
    domQuery: {
      // 标签区的第一个一般是字幕标签
      subQuery: '.space-y-2 a.text-nord13[href="https://missav123.com/chinese-subtitle"]',
      // 有个「切換無碼」按钮，藏在分享按钮旁边……
      leakQuery: ".order-first div.rounded-md a[href]:last-child"
    },
    method: print
  }, {
    name: "njav",
    hostname: "njav.tv",
    url: "https://njav.tv/zh/v/{{code}}",
    fetcher: "get",
    domQuery: {
      videoQuery: "#player"
    },
    method: print
  }, {
    // 有可能搜出仨：leakage subtitle 4k
    name: "Supjav",
    hostname: "supjav.com",
    url: "https://supjav.com/zh/?s={{code}}",
    fetcher: "parser",
    domQuery: {
      linkQuery: `.posts.clearfix>.post>a.img[title]`,
      titleQuery: `h3>a[rel="bookmark"][itemprop="url"]`
    },
    method: print
  }, {
    name: "NETFLAV",
    hostname: "netflav.com",
    url: "https://netflav.com/search?type=title&keyword={{code}}",
    fetcher: "parser",
    domQuery: {
      linkQuery: ".grid_cell>a",
      titleQuery: ".grid_cell>a>.grid_title"
    },
    method: print
  }, {
    name: "Avgle",
    hostname: "avgle.com",
    url: "https://avgle.com/search/videos?search_query={{code}}&search_type=videos",
    fetcher: "parser",
    domQuery: {
      linkQuery: ".container>.row .row .well>a[href]",
      titleQuery: ".container>.row .row .well .video-title"
    },
    method: print
  }, {
    name: "JAVHHH",
    hostname: "javhhh.com",
    url: "https://javhhh.com/v/?wd={{code}}",
    fetcher: "parser",
    domQuery: {
      linkQuery: ".typelist>.i-container>a[href]",
      titleQuery: ".typelist>.i-container>a[href]"
    },
    method: print
  }, {
    name: "BestJP",
    hostname: "bestjavporn.com",
    url: "https://www3.bestjavporn.com/search/{{code}}",
    fetcher: "parser",
    domQuery: {
      linkQuery: "article.thumb-block>a",
      titleQuery: "article.thumb-block>a"
    },
    method: print
  }, {
    name: "JAVMENU",
    hostname: "javmenu.com",
    url: "https://javmenu.com/{{code}}",
    fetcher: "get",
    domQuery: {
      videoQuery: "a.nav-link[aria-controls='pills-0']"
    },
    method: print
    // codeFormater: (preCode) => preCode.replace("-", ""),
  }, {
    name: "Jav.Guru",
    hostname: "jav.guru",
    url: "https://jav.guru/?s={{code}}",
    fetcher: "parser",
    domQuery: {
      linkQuery: ".imgg>a[href]",
      titleQuery: ".inside-article>.grid1 a[title]"
    },
    method: print
  }, {
    name: "JAVMOST",
    hostname: "javmost.cx",
    url: "https://javmost.cx/search/{{code}}/",
    fetcher: "parser",
    domQuery: {
      linkQuery: "#content .card a#MyImage",
      titleQuery: "#content .card-block .card-title"
    },
    method: print
  }, {
    name: "HAYAV",
    hostname: "hayav.com",
    url: "https://hayav.com/video/{{code}}/",
    fetcher: "get",
    domQuery: {
      // subQuery: `.site__col>.entry-header>h1.entry-title`,
    },
    method: print
  }, {
    name: "AvJoy",
    hostname: "avjoy.me",
    url: "https://avjoy.me/search/videos/{{code}}",
    fetcher: "parser",
    domQuery: {
      titleQuery: `#wrapper .row .content-info span.content-title`,
      linkQuery: `#wrapper .row a[href^="/video/"]`
    },
    method: print
  }, {
    name: "JAVFC2",
    hostname: "javfc2.net",
    url: "https://javfc2.net/?s={{code}}",
    fetcher: "parser",
    domQuery: {
      linkQuery: "article.loop-video>a[href]",
      titleQuery: "article.loop-video .entry-header"
    },
    method: print
  }, {
    name: "baihuse",
    hostname: "paipancon.com",
    url: "https://paipancon.com/search/{{code}}",
    fetcher: "parser",
    domQuery: {
      linkQuery: "div.col>div.card>a[href]",
      // 然而这个不是 title，是图片，这个站居然 title 里不包含 code，反而图片包含
      titleQuery: "div.card img.card-img-top"
    },
    method: print
  }, {
    name: "GGJAV",
    hostname: "ggjav.com",
    url: "https://ggjav.com/main/search?string={{code}}",
    fetcher: "parser",
    domQuery: {
      listIndex: 1,
      // spaceCode: true,
      titleQuery: "div.columns.large-3.medium-6.small-12.item.float-left>div.item_title>a.gray_a",
      linkQuery: "div.columns.large-3.medium-6.small-12.item.float-left>div.item_title>a.gray_a"
    },
    method: print
  }, {
    name: "AV01",
    hostname: "av01.tv",
    url: "https://www.av01.tv/search/videos?search_query={{code}}",
    fetcher: "parser",
    domQuery: {
      linkQuery: "div[id].well-sm>a",
      titleQuery: ".video-views>.pull-left"
    },
    method: print
  }, {
    name: "18sex",
    hostname: "18sex.org",
    url: "https://www.18sex.org/cn/search/{{code}}/",
    fetcher: "parser",
    domQuery: {
      linkQuery: ".white_link[href]",
      titleQuery: ".white_link>.card-title"
    },
    method: print
  }, {
    name: "highporn",
    hostname: "highporn.net",
    url: "https://highporn.net/search/videos?search_query={{code}}",
    fetcher: "parser",
    domQuery: {
      linkQuery: ".well>a[href]",
      titleQuery: ".well>a[href]>span.video-title"
    },
    method: print
  }, {
    name: "18av",
    hostname: "18av.mm-cg.com",
    url: "https://18av.mm-cg.com/zh/fc_search/all/{{code}}/1.html",
    fetcher: "parser",
    domQuery: {
      linkQuery: ".posts h3>a[href]",
      titleQuery: ".posts h3>a[href]"
    },
    method: print
  }, {
    name: "JavBus",
    disableLibItemName: "javbus",
    hostname: "javbus.com",
    url: "https://javbus.com/{{code}}",
    fetcher: "get",
    domQuery: {},
    method: print
  }, {
    name: "JavDB",
    disableLibItemName: "javdb",
    hostname: "javdb.com",
    url: "https://javdb.com/search?q={{code}}",
    fetcher: "parser",
    domQuery: {
      linkQuery: ".movie-list>.item:first-child>a",
      titleQuery: ".video-title"
    },
    method: print
  }, {
    name: "JAVLib",
    disableLibItemName: "javlib",
    hostname: "javlibrary.com",
    url: "https://www.javlibrary.com/cn/vl_searchbyid.php?keyword={{code}}",
    fetcher: "parser",
    domQuery: {
      linkQuery: ".videothumblist .video[id]:first-child>a",
      titleQuery: ".videothumblist .video[id]:first-child>a>div.id"
    },
    method: print
  }];
  const App = x(function({
    libItem,
    CODE
  }) {
    const defDis = [...["AvJoy", "baihuse", "GGJAV", "AV01", "18sex", "highporn"], ...["JavBus", "JavDB", "JAVLib", "MISSAV_"]];
    const [disables, setDisables] = h(_GM_getValue("disable", defDis));
    return o(preact.Fragment, {
      children: [o("div", {
        class: "jop-list",
        children: siteList.map((siteItem) => {
          const hidden = disables.find((disItem) => disItem === siteItem.name) === void 0;
          const sameSite = libItem.name !== siteItem.disableLibItemName;
          if (hidden && sameSite) {
            return o(SiteBtn, {
              siteItem,
              CODE
            }, siteItem.name);
          } else {
            return o(preact.Fragment, {});
          }
        })
      }), o("div", {
        children: o(Setting, {
          siteList,
          setDisables: (disable) => {
            setDisables(disable);
            _GM_setValue("disable", disable);
          },
          disables
        })
      })]
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
    preact.render(o(App, {
      libItem,
      CODE
    }), app);
    console.log("||脚本挂载成功", CODE);
  }
  main();

})(preact);
