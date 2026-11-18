/*!
 * @license
 * UCBP API @tucbs/components
 * Copyright 2026 T.C. Çevre, Şehircilik ve İklim Değişikliği Bakanlığı
 * SPDX-License-Identifier: Apache-2.0
 * Lisans metni ve bildirimler: LICENSE, NOTICE
 * Gömülü üçüncü taraf bileşenler: THIRD_PARTY_NOTICES
 */
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var _a, _value;
import { ensureEffectiveApiKeyValid, getUcbpApiBase, TucbsError, Map as Map$1, HGM_BASEMAP_IDS, DEFAULT_INITIAL_EXTENT, registerApiKeyRefresh, ApiKeyValidationError, LayerOperationError, DEFAULT_POINT_SYMBOL, clampPointSize, POINT_SHAPES, LINE_DASHES, POINT_SIZE_MIN, POINT_SIZE_MAX, POINT_SHAPE_LABELS, LINE_DASH_LABELS, pointSymbolSvg, dashArray, validateDrawLayerTitle, DRAW_LAYER_KIND_LABELS, MEASURE_LAYER_ID, entityToGeoJSON, featureLabel, measureGround, snapScaleForDisplay, OgcRequestError, buildCapabilitiesUrl, getCapabilities, parseCapabilities, parseWmsTiffFormat, detectServiceType, fetchWcsCoverageDescriptions, intersectsServiceExtent, parseWcsTiffFormat, wcsRectangleFor } from "@tucbs/core";
import { Math as Math$1, Color, Cartesian3, VerticalOrigin, HeightReference, Cartesian2, LabelStyle, CallbackProperty, CallbackPositionProperty, ConstantProperty, PolygonHierarchy, HorizontalOrigin, ScreenSpaceEventHandler, ScreenSpaceEventType, Cartographic, EllipsoidTerrainProvider } from "cesium";
import "@carbon/web-components/es/components/checkbox/index.js";
import "@carbon/web-components/es/components/dropdown/index.js";
import "@carbon/web-components/es/components/toggle/index.js";
import "@carbon/web-components/es/components/text-input/index.js";
import "@carbon/web-components/es/components/number-input/index.js";
import "@carbon/web-components/es/components/notification/index.js";
import "@carbon/web-components/es/components/radio-button/index.js";
import "@carbon/web-components/es/components/data-table/index.js";
import "@carbon/web-components/es/components/accordion/index.js";
import "@carbon/web-components/es/components/file-uploader/file-uploader-drop-container.js";
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$5 = globalThis, e$7 = t$5.ShadowRoot && (void 0 === t$5.ShadyCSS || t$5.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, s$4 = Symbol(), o$7 = /* @__PURE__ */ new WeakMap();
let n$4 = class n {
  constructor(t3, e3, o2) {
    if (this._$cssResult$ = true, o2 !== s$4) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t3, this.t = e3;
  }
  get styleSheet() {
    let t3 = this.o;
    const s2 = this.t;
    if (e$7 && void 0 === t3) {
      const e3 = void 0 !== s2 && 1 === s2.length;
      e3 && (t3 = o$7.get(s2)), void 0 === t3 && ((this.o = t3 = new CSSStyleSheet()).replaceSync(this.cssText), e3 && o$7.set(s2, t3));
    }
    return t3;
  }
  toString() {
    return this.cssText;
  }
};
const r$4 = (t3) => new n$4("string" == typeof t3 ? t3 : t3 + "", void 0, s$4), i$6 = (t3, ...e3) => {
  const o2 = 1 === t3.length ? t3[0] : e3.reduce((e4, s2, o3) => e4 + ((t4) => {
    if (true === t4._$cssResult$) return t4.cssText;
    if ("number" == typeof t4) return t4;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t4 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s2) + t3[o3 + 1], t3[0]);
  return new n$4(o2, t3, s$4);
}, S$1 = (s2, o2) => {
  if (e$7) s2.adoptedStyleSheets = o2.map((t3) => t3 instanceof CSSStyleSheet ? t3 : t3.styleSheet);
  else for (const e3 of o2) {
    const o3 = document.createElement("style"), n3 = t$5.litNonce;
    void 0 !== n3 && o3.setAttribute("nonce", n3), o3.textContent = e3.cssText, s2.appendChild(o3);
  }
}, c$3 = e$7 ? (t3) => t3 : (t3) => t3 instanceof CSSStyleSheet ? ((t4) => {
  let e3 = "";
  for (const s2 of t4.cssRules) e3 += s2.cssText;
  return r$4(e3);
})(t3) : t3;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: i$5, defineProperty: e$6, getOwnPropertyDescriptor: h$2, getOwnPropertyNames: r$3, getOwnPropertySymbols: o$6, getPrototypeOf: n$3 } = Object, a$2 = globalThis, c$2 = a$2.trustedTypes, l$2 = c$2 ? c$2.emptyScript : "", p$2 = a$2.reactiveElementPolyfillSupport, d$1 = (t3, s2) => t3, u$4 = { toAttribute(t3, s2) {
  switch (s2) {
    case Boolean:
      t3 = t3 ? l$2 : null;
      break;
    case Object:
    case Array:
      t3 = null == t3 ? t3 : JSON.stringify(t3);
  }
  return t3;
}, fromAttribute(t3, s2) {
  let i4 = t3;
  switch (s2) {
    case Boolean:
      i4 = null !== t3;
      break;
    case Number:
      i4 = null === t3 ? null : Number(t3);
      break;
    case Object:
    case Array:
      try {
        i4 = JSON.parse(t3);
      } catch (t4) {
        i4 = null;
      }
  }
  return i4;
} }, f$1 = (t3, s2) => !i$5(t3, s2), b$1 = { attribute: true, type: String, converter: u$4, reflect: false, useDefault: false, hasChanged: f$1 };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), a$2.litPropertyMetadata ?? (a$2.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let y$1 = class y extends HTMLElement {
  static addInitializer(t3) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t3);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t3, s2 = b$1) {
    if (s2.state && (s2.attribute = false), this._$Ei(), this.prototype.hasOwnProperty(t3) && ((s2 = Object.create(s2)).wrapped = true), this.elementProperties.set(t3, s2), !s2.noAccessor) {
      const i4 = Symbol(), h2 = this.getPropertyDescriptor(t3, i4, s2);
      void 0 !== h2 && e$6(this.prototype, t3, h2);
    }
  }
  static getPropertyDescriptor(t3, s2, i4) {
    const { get: e3, set: r2 } = h$2(this.prototype, t3) ?? { get() {
      return this[s2];
    }, set(t4) {
      this[s2] = t4;
    } };
    return { get: e3, set(s3) {
      const h2 = e3 == null ? void 0 : e3.call(this);
      r2 == null ? void 0 : r2.call(this, s3), this.requestUpdate(t3, h2, i4);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t3) {
    return this.elementProperties.get(t3) ?? b$1;
  }
  static _$Ei() {
    if (this.hasOwnProperty(d$1("elementProperties"))) return;
    const t3 = n$3(this);
    t3.finalize(), void 0 !== t3.l && (this.l = [...t3.l]), this.elementProperties = new Map(t3.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(d$1("finalized"))) return;
    if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d$1("properties"))) {
      const t4 = this.properties, s2 = [...r$3(t4), ...o$6(t4)];
      for (const i4 of s2) this.createProperty(i4, t4[i4]);
    }
    const t3 = this[Symbol.metadata];
    if (null !== t3) {
      const s2 = litPropertyMetadata.get(t3);
      if (void 0 !== s2) for (const [t4, i4] of s2) this.elementProperties.set(t4, i4);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t4, s2] of this.elementProperties) {
      const i4 = this._$Eu(t4, s2);
      void 0 !== i4 && this._$Eh.set(i4, t4);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(s2) {
    const i4 = [];
    if (Array.isArray(s2)) {
      const e3 = new Set(s2.flat(1 / 0).reverse());
      for (const s3 of e3) i4.unshift(c$3(s3));
    } else void 0 !== s2 && i4.push(c$3(s2));
    return i4;
  }
  static _$Eu(t3, s2) {
    const i4 = s2.attribute;
    return false === i4 ? void 0 : "string" == typeof i4 ? i4 : "string" == typeof t3 ? t3.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var _a2;
    this._$ES = new Promise((t3) => this.enableUpdating = t3), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (_a2 = this.constructor.l) == null ? void 0 : _a2.forEach((t3) => t3(this));
  }
  addController(t3) {
    var _a2;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t3), void 0 !== this.renderRoot && this.isConnected && ((_a2 = t3.hostConnected) == null ? void 0 : _a2.call(t3));
  }
  removeController(t3) {
    var _a2;
    (_a2 = this._$EO) == null ? void 0 : _a2.delete(t3);
  }
  _$E_() {
    const t3 = /* @__PURE__ */ new Map(), s2 = this.constructor.elementProperties;
    for (const i4 of s2.keys()) this.hasOwnProperty(i4) && (t3.set(i4, this[i4]), delete this[i4]);
    t3.size > 0 && (this._$Ep = t3);
  }
  createRenderRoot() {
    const t3 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return S$1(t3, this.constructor.elementStyles), t3;
  }
  connectedCallback() {
    var _a2;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), (_a2 = this._$EO) == null ? void 0 : _a2.forEach((t3) => {
      var _a3;
      return (_a3 = t3.hostConnected) == null ? void 0 : _a3.call(t3);
    });
  }
  enableUpdating(t3) {
  }
  disconnectedCallback() {
    var _a2;
    (_a2 = this._$EO) == null ? void 0 : _a2.forEach((t3) => {
      var _a3;
      return (_a3 = t3.hostDisconnected) == null ? void 0 : _a3.call(t3);
    });
  }
  attributeChangedCallback(t3, s2, i4) {
    this._$AK(t3, i4);
  }
  _$ET(t3, s2) {
    var _a2;
    const i4 = this.constructor.elementProperties.get(t3), e3 = this.constructor._$Eu(t3, i4);
    if (void 0 !== e3 && true === i4.reflect) {
      const h2 = (void 0 !== ((_a2 = i4.converter) == null ? void 0 : _a2.toAttribute) ? i4.converter : u$4).toAttribute(s2, i4.type);
      this._$Em = t3, null == h2 ? this.removeAttribute(e3) : this.setAttribute(e3, h2), this._$Em = null;
    }
  }
  _$AK(t3, s2) {
    var _a2, _b;
    const i4 = this.constructor, e3 = i4._$Eh.get(t3);
    if (void 0 !== e3 && this._$Em !== e3) {
      const t4 = i4.getPropertyOptions(e3), h2 = "function" == typeof t4.converter ? { fromAttribute: t4.converter } : void 0 !== ((_a2 = t4.converter) == null ? void 0 : _a2.fromAttribute) ? t4.converter : u$4;
      this._$Em = e3;
      const r2 = h2.fromAttribute(s2, t4.type);
      this[e3] = r2 ?? ((_b = this._$Ej) == null ? void 0 : _b.get(e3)) ?? r2, this._$Em = null;
    }
  }
  requestUpdate(t3, s2, i4, e3 = false, h2) {
    var _a2;
    if (void 0 !== t3) {
      const r2 = this.constructor;
      if (false === e3 && (h2 = this[t3]), i4 ?? (i4 = r2.getPropertyOptions(t3)), !((i4.hasChanged ?? f$1)(h2, s2) || i4.useDefault && i4.reflect && h2 === ((_a2 = this._$Ej) == null ? void 0 : _a2.get(t3)) && !this.hasAttribute(r2._$Eu(t3, i4)))) return;
      this.C(t3, s2, i4);
    }
    false === this.isUpdatePending && (this._$ES = this._$EP());
  }
  C(t3, s2, { useDefault: i4, reflect: e3, wrapped: h2 }, r2) {
    i4 && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t3) && (this._$Ej.set(t3, r2 ?? s2 ?? this[t3]), true !== h2 || void 0 !== r2) || (this._$AL.has(t3) || (this.hasUpdated || i4 || (s2 = void 0), this._$AL.set(t3, s2)), true === e3 && this._$Em !== t3 && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t3));
  }
  async _$EP() {
    this.isUpdatePending = true;
    try {
      await this._$ES;
    } catch (t4) {
      Promise.reject(t4);
    }
    const t3 = this.scheduleUpdate();
    return null != t3 && await t3, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var _a2;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [t5, s3] of this._$Ep) this[t5] = s3;
        this._$Ep = void 0;
      }
      const t4 = this.constructor.elementProperties;
      if (t4.size > 0) for (const [s3, i4] of t4) {
        const { wrapped: t5 } = i4, e3 = this[s3];
        true !== t5 || this._$AL.has(s3) || void 0 === e3 || this.C(s3, void 0, i4, e3);
      }
    }
    let t3 = false;
    const s2 = this._$AL;
    try {
      t3 = this.shouldUpdate(s2), t3 ? (this.willUpdate(s2), (_a2 = this._$EO) == null ? void 0 : _a2.forEach((t4) => {
        var _a3;
        return (_a3 = t4.hostUpdate) == null ? void 0 : _a3.call(t4);
      }), this.update(s2)) : this._$EM();
    } catch (s3) {
      throw t3 = false, this._$EM(), s3;
    }
    t3 && this._$AE(s2);
  }
  willUpdate(t3) {
  }
  _$AE(t3) {
    var _a2;
    (_a2 = this._$EO) == null ? void 0 : _a2.forEach((t4) => {
      var _a3;
      return (_a3 = t4.hostUpdated) == null ? void 0 : _a3.call(t4);
    }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t3)), this.updated(t3);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t3) {
    return true;
  }
  update(t3) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((t4) => this._$ET(t4, this[t4]))), this._$EM();
  }
  updated(t3) {
  }
  firstUpdated(t3) {
  }
};
y$1.elementStyles = [], y$1.shadowRootOptions = { mode: "open" }, y$1[d$1("elementProperties")] = /* @__PURE__ */ new Map(), y$1[d$1("finalized")] = /* @__PURE__ */ new Map(), p$2 == null ? void 0 : p$2({ ReactiveElement: y$1 }), (a$2.reactiveElementVersions ?? (a$2.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$4 = globalThis, i$4 = (t3) => t3, s$3 = t$4.trustedTypes, e$5 = s$3 ? s$3.createPolicy("lit-html", { createHTML: (t3) => t3 }) : void 0, h$1 = "$lit$", o$5 = `lit$${Math.random().toFixed(9).slice(2)}$`, n$2 = "?" + o$5, r$2 = `<${n$2}>`, l$1 = document, c$1 = () => l$1.createComment(""), a$1 = (t3) => null === t3 || "object" != typeof t3 && "function" != typeof t3, u$3 = Array.isArray, d = (t3) => u$3(t3) || "function" == typeof (t3 == null ? void 0 : t3[Symbol.iterator]), f = "[ 	\n\f\r]", v$1 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, _ = /-->/g, m$1 = />/g, p$1 = RegExp(`>|${f}(?:([^\\s"'>=/]+)(${f}*=${f}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), g = /'/g, $ = /"/g, y2 = /^(?:script|style|textarea|title)$/i, x = (t3) => (i4, ...s2) => ({ _$litType$: t3, strings: i4, values: s2 }), b = x(1), w = x(2), E = Symbol.for("lit-noChange"), A = Symbol.for("lit-nothing"), C = /* @__PURE__ */ new WeakMap(), P = l$1.createTreeWalker(l$1, 129);
function V(t3, i4) {
  if (!u$3(t3) || !t3.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return void 0 !== e$5 ? e$5.createHTML(i4) : i4;
}
const N = (t3, i4) => {
  const s2 = t3.length - 1, e3 = [];
  let n3, l2 = 2 === i4 ? "<svg>" : 3 === i4 ? "<math>" : "", c2 = v$1;
  for (let i5 = 0; i5 < s2; i5++) {
    const s3 = t3[i5];
    let a2, u2, d2 = -1, f2 = 0;
    for (; f2 < s3.length && (c2.lastIndex = f2, u2 = c2.exec(s3), null !== u2); ) f2 = c2.lastIndex, c2 === v$1 ? "!--" === u2[1] ? c2 = _ : void 0 !== u2[1] ? c2 = m$1 : void 0 !== u2[2] ? (y2.test(u2[2]) && (n3 = RegExp("</" + u2[2], "g")), c2 = p$1) : void 0 !== u2[3] && (c2 = p$1) : c2 === p$1 ? ">" === u2[0] ? (c2 = n3 ?? v$1, d2 = -1) : void 0 === u2[1] ? d2 = -2 : (d2 = c2.lastIndex - u2[2].length, a2 = u2[1], c2 = void 0 === u2[3] ? p$1 : '"' === u2[3] ? $ : g) : c2 === $ || c2 === g ? c2 = p$1 : c2 === _ || c2 === m$1 ? c2 = v$1 : (c2 = p$1, n3 = void 0);
    const x2 = c2 === p$1 && t3[i5 + 1].startsWith("/>") ? " " : "";
    l2 += c2 === v$1 ? s3 + r$2 : d2 >= 0 ? (e3.push(a2), s3.slice(0, d2) + h$1 + s3.slice(d2) + o$5 + x2) : s3 + o$5 + (-2 === d2 ? i5 : x2);
  }
  return [V(t3, l2 + (t3[s2] || "<?>") + (2 === i4 ? "</svg>" : 3 === i4 ? "</math>" : "")), e3];
};
class S {
  constructor({ strings: t3, _$litType$: i4 }, e3) {
    let r2;
    this.parts = [];
    let l2 = 0, a2 = 0;
    const u2 = t3.length - 1, d2 = this.parts, [f2, v2] = N(t3, i4);
    if (this.el = S.createElement(f2, e3), P.currentNode = this.el.content, 2 === i4 || 3 === i4) {
      const t4 = this.el.content.firstChild;
      t4.replaceWith(...t4.childNodes);
    }
    for (; null !== (r2 = P.nextNode()) && d2.length < u2; ) {
      if (1 === r2.nodeType) {
        if (r2.hasAttributes()) for (const t4 of r2.getAttributeNames()) if (t4.endsWith(h$1)) {
          const i5 = v2[a2++], s2 = r2.getAttribute(t4).split(o$5), e4 = /([.?@])?(.*)/.exec(i5);
          d2.push({ type: 1, index: l2, name: e4[2], strings: s2, ctor: "." === e4[1] ? I : "?" === e4[1] ? L : "@" === e4[1] ? z : H }), r2.removeAttribute(t4);
        } else t4.startsWith(o$5) && (d2.push({ type: 6, index: l2 }), r2.removeAttribute(t4));
        if (y2.test(r2.tagName)) {
          const t4 = r2.textContent.split(o$5), i5 = t4.length - 1;
          if (i5 > 0) {
            r2.textContent = s$3 ? s$3.emptyScript : "";
            for (let s2 = 0; s2 < i5; s2++) r2.append(t4[s2], c$1()), P.nextNode(), d2.push({ type: 2, index: ++l2 });
            r2.append(t4[i5], c$1());
          }
        }
      } else if (8 === r2.nodeType) if (r2.data === n$2) d2.push({ type: 2, index: l2 });
      else {
        let t4 = -1;
        for (; -1 !== (t4 = r2.data.indexOf(o$5, t4 + 1)); ) d2.push({ type: 7, index: l2 }), t4 += o$5.length - 1;
      }
      l2++;
    }
  }
  static createElement(t3, i4) {
    const s2 = l$1.createElement("template");
    return s2.innerHTML = t3, s2;
  }
}
function M$1(t3, i4, s2 = t3, e3) {
  var _a2, _b;
  if (i4 === E) return i4;
  let h2 = void 0 !== e3 ? (_a2 = s2._$Co) == null ? void 0 : _a2[e3] : s2._$Cl;
  const o2 = a$1(i4) ? void 0 : i4._$litDirective$;
  return (h2 == null ? void 0 : h2.constructor) !== o2 && ((_b = h2 == null ? void 0 : h2._$AO) == null ? void 0 : _b.call(h2, false), void 0 === o2 ? h2 = void 0 : (h2 = new o2(t3), h2._$AT(t3, s2, e3)), void 0 !== e3 ? (s2._$Co ?? (s2._$Co = []))[e3] = h2 : s2._$Cl = h2), void 0 !== h2 && (i4 = M$1(t3, h2._$AS(t3, i4.values), h2, e3)), i4;
}
class R {
  constructor(t3, i4) {
    this._$AV = [], this._$AN = void 0, this._$AD = t3, this._$AM = i4;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t3) {
    const { el: { content: i4 }, parts: s2 } = this._$AD, e3 = ((t3 == null ? void 0 : t3.creationScope) ?? l$1).importNode(i4, true);
    P.currentNode = e3;
    let h2 = P.nextNode(), o2 = 0, n3 = 0, r2 = s2[0];
    for (; void 0 !== r2; ) {
      if (o2 === r2.index) {
        let i5;
        2 === r2.type ? i5 = new k(h2, h2.nextSibling, this, t3) : 1 === r2.type ? i5 = new r2.ctor(h2, r2.name, r2.strings, this, t3) : 6 === r2.type && (i5 = new Z(h2, this, t3)), this._$AV.push(i5), r2 = s2[++n3];
      }
      o2 !== (r2 == null ? void 0 : r2.index) && (h2 = P.nextNode(), o2++);
    }
    return P.currentNode = l$1, e3;
  }
  p(t3) {
    let i4 = 0;
    for (const s2 of this._$AV) void 0 !== s2 && (void 0 !== s2.strings ? (s2._$AI(t3, s2, i4), i4 += s2.strings.length - 2) : s2._$AI(t3[i4])), i4++;
  }
}
class k {
  get _$AU() {
    var _a2;
    return ((_a2 = this._$AM) == null ? void 0 : _a2._$AU) ?? this._$Cv;
  }
  constructor(t3, i4, s2, e3) {
    this.type = 2, this._$AH = A, this._$AN = void 0, this._$AA = t3, this._$AB = i4, this._$AM = s2, this.options = e3, this._$Cv = (e3 == null ? void 0 : e3.isConnected) ?? true;
  }
  get parentNode() {
    let t3 = this._$AA.parentNode;
    const i4 = this._$AM;
    return void 0 !== i4 && 11 === (t3 == null ? void 0 : t3.nodeType) && (t3 = i4.parentNode), t3;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t3, i4 = this) {
    t3 = M$1(this, t3, i4), a$1(t3) ? t3 === A || null == t3 || "" === t3 ? (this._$AH !== A && this._$AR(), this._$AH = A) : t3 !== this._$AH && t3 !== E && this._(t3) : void 0 !== t3._$litType$ ? this.$(t3) : void 0 !== t3.nodeType ? this.T(t3) : d(t3) ? this.k(t3) : this._(t3);
  }
  O(t3) {
    return this._$AA.parentNode.insertBefore(t3, this._$AB);
  }
  T(t3) {
    this._$AH !== t3 && (this._$AR(), this._$AH = this.O(t3));
  }
  _(t3) {
    this._$AH !== A && a$1(this._$AH) ? this._$AA.nextSibling.data = t3 : this.T(l$1.createTextNode(t3)), this._$AH = t3;
  }
  $(t3) {
    var _a2;
    const { values: i4, _$litType$: s2 } = t3, e3 = "number" == typeof s2 ? this._$AC(t3) : (void 0 === s2.el && (s2.el = S.createElement(V(s2.h, s2.h[0]), this.options)), s2);
    if (((_a2 = this._$AH) == null ? void 0 : _a2._$AD) === e3) this._$AH.p(i4);
    else {
      const t4 = new R(e3, this), s3 = t4.u(this.options);
      t4.p(i4), this.T(s3), this._$AH = t4;
    }
  }
  _$AC(t3) {
    let i4 = C.get(t3.strings);
    return void 0 === i4 && C.set(t3.strings, i4 = new S(t3)), i4;
  }
  k(t3) {
    u$3(this._$AH) || (this._$AH = [], this._$AR());
    const i4 = this._$AH;
    let s2, e3 = 0;
    for (const h2 of t3) e3 === i4.length ? i4.push(s2 = new k(this.O(c$1()), this.O(c$1()), this, this.options)) : s2 = i4[e3], s2._$AI(h2), e3++;
    e3 < i4.length && (this._$AR(s2 && s2._$AB.nextSibling, e3), i4.length = e3);
  }
  _$AR(t3 = this._$AA.nextSibling, s2) {
    var _a2;
    for ((_a2 = this._$AP) == null ? void 0 : _a2.call(this, false, true, s2); t3 !== this._$AB; ) {
      const s3 = i$4(t3).nextSibling;
      i$4(t3).remove(), t3 = s3;
    }
  }
  setConnected(t3) {
    var _a2;
    void 0 === this._$AM && (this._$Cv = t3, (_a2 = this._$AP) == null ? void 0 : _a2.call(this, t3));
  }
}
class H {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t3, i4, s2, e3, h2) {
    this.type = 1, this._$AH = A, this._$AN = void 0, this.element = t3, this.name = i4, this._$AM = e3, this.options = h2, s2.length > 2 || "" !== s2[0] || "" !== s2[1] ? (this._$AH = Array(s2.length - 1).fill(new String()), this.strings = s2) : this._$AH = A;
  }
  _$AI(t3, i4 = this, s2, e3) {
    const h2 = this.strings;
    let o2 = false;
    if (void 0 === h2) t3 = M$1(this, t3, i4, 0), o2 = !a$1(t3) || t3 !== this._$AH && t3 !== E, o2 && (this._$AH = t3);
    else {
      const e4 = t3;
      let n3, r2;
      for (t3 = h2[0], n3 = 0; n3 < h2.length - 1; n3++) r2 = M$1(this, e4[s2 + n3], i4, n3), r2 === E && (r2 = this._$AH[n3]), o2 || (o2 = !a$1(r2) || r2 !== this._$AH[n3]), r2 === A ? t3 = A : t3 !== A && (t3 += (r2 ?? "") + h2[n3 + 1]), this._$AH[n3] = r2;
    }
    o2 && !e3 && this.j(t3);
  }
  j(t3) {
    t3 === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t3 ?? "");
  }
}
class I extends H {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t3) {
    this.element[this.name] = t3 === A ? void 0 : t3;
  }
}
class L extends H {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t3) {
    this.element.toggleAttribute(this.name, !!t3 && t3 !== A);
  }
}
class z extends H {
  constructor(t3, i4, s2, e3, h2) {
    super(t3, i4, s2, e3, h2), this.type = 5;
  }
  _$AI(t3, i4 = this) {
    if ((t3 = M$1(this, t3, i4, 0) ?? A) === E) return;
    const s2 = this._$AH, e3 = t3 === A && s2 !== A || t3.capture !== s2.capture || t3.once !== s2.once || t3.passive !== s2.passive, h2 = t3 !== A && (s2 === A || e3);
    e3 && this.element.removeEventListener(this.name, this, s2), h2 && this.element.addEventListener(this.name, this, t3), this._$AH = t3;
  }
  handleEvent(t3) {
    var _a2;
    "function" == typeof this._$AH ? this._$AH.call(((_a2 = this.options) == null ? void 0 : _a2.host) ?? this.element, t3) : this._$AH.handleEvent(t3);
  }
}
class Z {
  constructor(t3, i4, s2) {
    this.element = t3, this.type = 6, this._$AN = void 0, this._$AM = i4, this.options = s2;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t3) {
    M$1(this, t3);
  }
}
const j = { I: k }, B = t$4.litHtmlPolyfillSupport;
B == null ? void 0 : B(S, k), (t$4.litHtmlVersions ?? (t$4.litHtmlVersions = [])).push("3.3.3");
const D = (t3, i4, s2) => {
  const e3 = (s2 == null ? void 0 : s2.renderBefore) ?? i4;
  let h2 = e3._$litPart$;
  if (void 0 === h2) {
    const t4 = (s2 == null ? void 0 : s2.renderBefore) ?? null;
    e3._$litPart$ = h2 = new k(i4.insertBefore(c$1(), t4), t4, void 0, s2 ?? {});
  }
  return h2._$AI(t3), h2;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const s$2 = globalThis;
let i$3 = class i extends y$1 {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var _a2;
    const t3 = super.createRenderRoot();
    return (_a2 = this.renderOptions).renderBefore ?? (_a2.renderBefore = t3.firstChild), t3;
  }
  update(t3) {
    const r2 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t3), this._$Do = D(r2, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var _a2;
    super.connectedCallback(), (_a2 = this._$Do) == null ? void 0 : _a2.setConnected(true);
  }
  disconnectedCallback() {
    var _a2;
    super.disconnectedCallback(), (_a2 = this._$Do) == null ? void 0 : _a2.setConnected(false);
  }
  render() {
    return E;
  }
};
i$3._$litElement$ = true, i$3["finalized"] = true, (_a = s$2.litElementHydrateSupport) == null ? void 0 : _a.call(s$2, { LitElement: i$3 });
const o$4 = s$2.litElementPolyfillSupport;
o$4 == null ? void 0 : o$4({ LitElement: i$3 });
(s$2.litElementVersions ?? (s$2.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$3 = (t3) => (e3, o2) => {
  void 0 !== o2 ? o2.addInitializer(() => {
    customElements.define(t3, e3);
  }) : customElements.define(t3, e3);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const o$3 = { attribute: true, type: String, converter: u$4, reflect: false, hasChanged: f$1 }, r$1 = (t3 = o$3, e3, r2) => {
  const { kind: n3, metadata: i4 } = r2;
  let s2 = globalThis.litPropertyMetadata.get(i4);
  if (void 0 === s2 && globalThis.litPropertyMetadata.set(i4, s2 = /* @__PURE__ */ new Map()), "setter" === n3 && ((t3 = Object.create(t3)).wrapped = true), s2.set(r2.name, t3), "accessor" === n3) {
    const { name: o2 } = r2;
    return { set(r3) {
      const n4 = e3.get.call(this);
      e3.set.call(this, r3), this.requestUpdate(o2, n4, t3, true, r3);
    }, init(e4) {
      return void 0 !== e4 && this.C(o2, void 0, t3, e4), e4;
    } };
  }
  if ("setter" === n3) {
    const { name: o2 } = r2;
    return function(r3) {
      const n4 = this[o2];
      e3.call(this, r3), this.requestUpdate(o2, n4, t3, true, r3);
    };
  }
  throw Error("Unsupported decorator location: " + n3);
};
function n$1(t3) {
  return (e3, o2) => "object" == typeof o2 ? r$1(t3, e3, o2) : ((t4, e4, o3) => {
    const r2 = e4.hasOwnProperty(o3);
    return e4.constructor.createProperty(o3, t4), r2 ? Object.getOwnPropertyDescriptor(e4, o3) : void 0;
  })(t3, e3, o2);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function r(r2) {
  return n$1({ ...r2, state: true, attribute: false });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e$4 = (e3, t3, c2) => (c2.configurable = true, c2.enumerable = true, Reflect.decorate && "object" != typeof t3 && Object.defineProperty(e3, t3, c2), c2);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function e$3(e3, r2) {
  return (n3, s2, i4) => {
    const o2 = (t3) => {
      var _a2;
      return ((_a2 = t3.renderRoot) == null ? void 0 : _a2.querySelector(e3)) ?? null;
    };
    return e$4(n3, s2, { get() {
      return o2(this);
    } });
  };
}
class WriteOnlyApiKey {
  constructor(host) {
    __privateAdd(this, _value, "");
    this.host = host;
  }
  /** Gerçek değeri `value ?? ""` olarak yazar ve host'ta `requestUpdate("apiKey", eskiDeğer)` tetikler. */
  write(value) {
    const old = __privateGet(this, _value);
    __privateSet(this, _value, value ?? "");
    this.host.requestUpdate("apiKey", old);
  }
  /** Gerçek değeri `requestUpdate` TETİKLEMEDEN doğrudan yazar (TucbsMap.ts'in geç-attribute-binding telafisi için). */
  writeDirect(value) {
    __privateSet(this, _value, value);
  }
  /** Dışarıya dönecek, maskelenmiş değer -- değer boşsa `""`, doluysa `"••••••"`. */
  get masked() {
    return __privateGet(this, _value) ? "••••••" : "";
  }
  /** Gerçek değer -- SADECE sınıf içinden (host'un kendi metotlarından) okunmalı, asla dışarıya döndürülmemeli. */
  get real() {
    return __privateGet(this, _value);
  }
}
_value = new WeakMap();
var __defProp$A = Object.defineProperty;
var __getOwnPropDesc$B = Object.getOwnPropertyDescriptor;
var __typeError$4 = (msg) => {
  throw TypeError(msg);
};
var __decorateClass$B = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$B(target, key) : target;
  for (var i4 = decorators.length - 1, decorator; i4 >= 0; i4--)
    if (decorator = decorators[i4])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$A(target, key, result);
  return result;
};
var __accessCheck$4 = (obj, member, msg) => member.has(obj) || __typeError$4("Cannot " + msg);
var __privateGet$4 = (obj, member, getter) => (__accessCheck$4(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd$4 = (obj, member, value) => member.has(obj) ? __typeError$4("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var _apiKeyState$2;
let tucbsMapInstanceCounter = 0;
const PROXY_BASE_HINT = "proxy adresini configureTucbs({ proxyBase }) ile verin.";
const AUTH_TOKEN_HINT = 'yetki belirtecini katman eklerken authToken seçeneğiyle verin (ör. layerManager.add("WMS", { url, authToken })).';
const REMOVED_ATTRIBUTE_HINTS = [
  ["proxybase", PROXY_BASE_HINT],
  ["proxy-base", PROXY_BASE_HINT],
  ["authtoken", AUTH_TOKEN_HINT],
  ["auth-token", AUTH_TOKEN_HINT]
];
let TucbsMap = class extends i$3 {
  constructor() {
    super(...arguments);
    this._autoId = `tucbs-map-${++tucbsMapInstanceCounter}`;
    __privateAdd$4(this, _apiKeyState$2, new WriteOnlyApiKey(this));
    this.basemap = "hgm-siyasi";
    this.mode = "3D";
    this.quality = 70;
    this.mapWidth = "100%";
    this.mapHeight = "100%";
    this._mapInstance = null;
    this._skipInitialPropertySync = false;
    this._authError = null;
    this._apiKeyAuthState = "none";
    this._removedAttributesWarned = false;
  }
  get hostId() {
    return this.id || this._autoId;
  }
  set apiKey(value) {
    __privateGet$4(this, _apiKeyState$2).write(value);
  }
  /** apiKey tanımlıysa `"••••••"`, değilse boş metin döner; gerçek değer dışarıdan okunamaz. */
  get apiKey() {
    return __privateGet$4(this, _apiKeyState$2).masked;
  }
  /** apiKey doğrulama durumu ("none" / "pending" / "ok" / "failed"). */
  get apiKeyAuthState() {
    return this._apiKeyAuthState;
  }
  _isMapApiExposed() {
    return this._apiKeyAuthState === "ok";
  }
  // === Public Getter'lar (Core JS API'ye erisim) ===
  /** Core JS API `Map` instance'ı; apiKey doğrulanana kadar `null`. */
  get map() {
    if (!this._isMapApiExposed()) {
      return null;
    }
    return this._mapInstance;
  }
  /** Core JS API `LayerManager`'ı; apiKey doğrulanana kadar `undefined`. */
  get layerManager() {
    var _a2;
    if (!this._isMapApiExposed()) {
      return void 0;
    }
    return (_a2 = this._mapInstance) == null ? void 0 : _a2.layerManager;
  }
  /** Core JS API `DrawingManager`'ı; apiKey doğrulanana kadar `undefined`. */
  get drawing() {
    var _a2;
    if (!this._isMapApiExposed()) {
      return void 0;
    }
    return (_a2 = this._mapInstance) == null ? void 0 : _a2.drawingManager;
  }
  /** Core JS API `InteractionManager`'ı; apiKey doğrulanana kadar `undefined`. */
  get interaction() {
    var _a2;
    if (!this._isMapApiExposed()) {
      return void 0;
    }
    return (_a2 = this._mapInstance) == null ? void 0 : _a2.interactionManager;
  }
  /** Core JS API `AnalysisManager`'ı; apiKey doğrulanana kadar `undefined`. */
  get analysisManager() {
    var _a2;
    if (!this._isMapApiExposed()) {
      return void 0;
    }
    return (_a2 = this._mapInstance) == null ? void 0 : _a2.analysisManager;
  }
  /** Cesium `Viewer` instance'ı; apiKey doğrulanana kadar `undefined`. */
  get viewer() {
    var _a2;
    if (!this._isMapApiExposed()) {
      return void 0;
    }
    return (_a2 = this._mapInstance) == null ? void 0 : _a2.viewer;
  }
  /**
   * Gercek apiKey degerini DOGRUDAN hedefin apiKey setter'ina yazar (PUSH).
   * Hedef (ör. TucbsServiceUpload) bunu kendi basina OKUYAMAZ -- write-only
   * getter deseni (bkz yukaridaki #apiKeyState yorumu) hala geçerli; sadece bu
   * metodu cagirarak TucbsMap'in KENDI bildigi degeri "vermesini" isteyebilir.
   * Transfer TucbsMap'in KENDI closure'i icinde gerceklesir, disaridan
   * okunabilir yeni bir yuzey acilmaz.
   */
  _grantApiKeyTo(target) {
    target.apiKey = __privateGet$4(this, _apiKeyState$2).real;
  }
  // Cesium'un kendi widgets.css'i document <head>'e enjekte ediliyor; Shadow DOM
  // kullanılırsa bu global stil sızmaz ve canvas 0x0 kalır. Bu yüzden Light DOM'a geçiyoruz.
  /** Shadow DOM yerine Light DOM kullanır (bkz yukarıdaki WHY yorumu). */
  createRenderRoot() {
    return this;
  }
  /** Etikette kaldırılmış bir nitelik varsa her biri için bir kez konsol uyarısı basar. */
  _warnRemovedAttributes() {
    if (this._removedAttributesWarned) return;
    this._removedAttributesWarned = true;
    for (const [name, hint] of REMOVED_ATTRIBUTE_HINTS) {
      if (this.hasAttribute(name)) {
        console.warn(`[tucbs-map] "${name}" niteliği kaldırıldı (hiçbir zaman etkili değildi); ${hint}`);
      }
    }
  }
  // === Yasam Dongusu ===
  /** Bileşen DOM'a bağlandığında: kaldırılmış nitelikler için uyarır, `id` yoksa otomatik-üretilen id'yi atar. */
  connectedCallback() {
    super.connectedCallback();
    this._warnRemovedAttributes();
    if (!this.id) {
      this.id = this._autoId;
    }
  }
  /** İlk render sonrası: apiKey'i doğrulayıp haritayı (Cesium `Viewer`'ı) kurar (bkz `_prepareMap`). */
  firstUpdated() {
    const attrKey = this.getAttribute("api-key");
    if (attrKey && !__privateGet$4(this, _apiKeyState$2).real) {
      __privateGet$4(this, _apiKeyState$2).writeDirect(attrKey);
    }
    void this._prepareMap();
  }
  /** apiKey'i (instance veya global) Map kurulmadan ONCE dogrular; basarisizsa Map hic kurulmaz. */
  async _prepareMap() {
    this._apiKeyAuthState = "pending";
    try {
      await ensureEffectiveApiKeyValid(__privateGet$4(this, _apiKeyState$2).real || void 0, getUcbpApiBase());
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      const title = err instanceof TucbsError ? err.title : "API Hatası";
      console.error("[tucbs-map] apiKey validate başarısız:", message);
      this._apiKeyAuthState = "failed";
      this._authError = { title, message };
      this.dispatchEvent(new CustomEvent("error", {
        detail: err instanceof TucbsError ? { error: err, message, title, code: err.code, number: err.number } : { error: err, message, title },
        bubbles: true,
        composed: true
      }));
      return;
    }
    const containerid = `#${this.hostId}-host`;
    const container = this.renderRoot.querySelector(containerid);
    const options = {
      timeline: false,
      animation: false,
      geocoder: false,
      homeButton: false,
      sceneModePicker: false,
      navigationHelpButton: false,
      infoBox: false,
      selectionIndicator: false,
      fullscreenButton: false,
      basemap: this.basemap,
      // Kosulsuz "apiKey: this.#apiKeyState.real" -- gercek deger bos string
      // oldugunda bile (global anahtara guvenilen senaryo) CORE Map'in
      // kendi "options.apiKey ?? getGlobalApiKey()" dususunu TETIKLEMEZDI
      // ("" ?? icin "var" sayilir, undefined degil). Bu yuzden bos ise HIC
      // geçirilmez -- Map kendi global dususunu dogru uygulayabilsin.
      ...__privateGet$4(this, _apiKeyState$2).real ? { apiKey: __privateGet$4(this, _apiKeyState$2).real } : {},
      ...this.initialExtent !== void 0 ? { initialExtent: this.initialExtent } : {},
      ...this.mapOptions
    };
    this._mapInstance = new Map$1(container, options);
    this._mapInstance.setQuality(this.quality);
    this._skipInitialPropertySync = true;
    this._apiKeyAuthState = "ok";
    this._authError = null;
    this.dispatchEvent(new CustomEvent("ready", {
      detail: { map: this._mapInstance },
      bubbles: true,
      composed: true
    }));
  }
  /** Reactive attribute değişikliklerini (basemap/mode/quality) Core JS API'ye iletir. */
  updated(changed) {
    if (!this._mapInstance) return;
    if (this._skipInitialPropertySync) {
      this._skipInitialPropertySync = false;
      return;
    }
    if (changed.has("basemap")) this._mapInstance.setBasemap(this.basemap);
    if (changed.has("mode")) this._mapInstance.setMode(this.mode);
    if (changed.has("quality")) this._mapInstance.setQuality(this.quality);
  }
  /** Bileşen DOM'dan kaldırıldığında haritayı (Cesium `Viewer`'ı) yok eder. */
  disconnectedCallback() {
    var _a2;
    super.disconnectedCallback();
    (_a2 = this._mapInstance) == null ? void 0 : _a2.destroy();
    this._mapInstance = null;
  }
  // === Render ===
  /** Bileşenin şablonunu render eder (harita container'ı + apiKey hata overlay'i). */
  // Light DOM'da :host geçersiz olduğundan stil, gerçek etiket adı ile ekleniyor.
  render() {
    return b`
      <style>
        tucbs-map {
          display: block;
          position: relative;
          width: 100%;
          height: 100%;
        }
        #${this.hostId}-host {
          width: ${this.mapWidth};
          height: ${this.mapHeight};
        }
        .tucbs-map-auth-error {
          position: absolute;
          inset: 0;
          z-index: 20;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          background: rgba(127, 29, 29, 0.45);
          box-sizing: border-box;
        }
        .tucbs-map-auth-error__panel {
          max-width: 420px;
          width: 100%;
          background: #fef2f2;
          color: #111827;
          border: 1px solid #fecaca;
          border-radius: 12px;
          padding: 18px 20px;
          box-shadow: 0 10px 40px rgba(127, 29, 29, 0.2);
          font-family: Segoe UI, system-ui, sans-serif;
        }
        .tucbs-map-auth-error__title {
          margin: 0 0 8px;
          font-size: 16px;
          font-weight: 700;
          color: #991b1b;
        }
        .tucbs-map-auth-error__msg {
          margin: 0;
          font-size: 13.5px;
          line-height: 1.5;
          color: #7f1d1d;
          word-break: break-word;
        }
      </style>
      <div id="${this.hostId}-host"></div>
      ${this._authError ? b`
            <div class="tucbs-map-auth-error" role="alert">
              <div class="tucbs-map-auth-error__panel">
                <p class="tucbs-map-auth-error__title">${this._authError.title}</p>
                <p class="tucbs-map-auth-error__msg">${this._authError.message}</p>
              </div>
            </div>
          ` : null}
    `;
  }
};
_apiKeyState$2 = /* @__PURE__ */ new WeakMap();
__decorateClass$B([
  n$1({ attribute: "api-key" })
], TucbsMap.prototype, "apiKey", 1);
__decorateClass$B([
  n$1()
], TucbsMap.prototype, "basemap", 2);
__decorateClass$B([
  n$1({ type: Object })
], TucbsMap.prototype, "initialExtent", 2);
__decorateClass$B([
  n$1()
], TucbsMap.prototype, "mode", 2);
__decorateClass$B([
  n$1({ type: Number })
], TucbsMap.prototype, "quality", 2);
__decorateClass$B([
  n$1({ type: Object })
], TucbsMap.prototype, "mapOptions", 2);
__decorateClass$B([
  n$1()
], TucbsMap.prototype, "mapWidth", 2);
__decorateClass$B([
  n$1()
], TucbsMap.prototype, "mapHeight", 2);
__decorateClass$B([
  r()
], TucbsMap.prototype, "_mapInstance", 2);
__decorateClass$B([
  r()
], TucbsMap.prototype, "_authError", 2);
__decorateClass$B([
  r()
], TucbsMap.prototype, "_apiKeyAuthState", 2);
TucbsMap = __decorateClass$B([
  t$3("tucbs-map")
], TucbsMap);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2 = { ATTRIBUTE: 1, CHILD: 2 }, e$2 = (t3) => (...e3) => ({ _$litDirective$: t3, values: e3 });
let i$2 = class i2 {
  constructor(t3) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t3, e3, i4) {
    this._$Ct = t3, this._$AM = e3, this._$Ci = i4;
  }
  _$AS(t3, e3) {
    return this.update(t3, e3);
  }
  update(t3, e3) {
    return this.render(...e3);
  }
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let e$1 = class e extends i$2 {
  constructor(i4) {
    if (super(i4), this.it = A, i4.type !== t$2.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(r2) {
    if (r2 === A || null == r2) return this._t = void 0, this.it = r2;
    if (r2 === E) return r2;
    if ("string" != typeof r2) throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (r2 === this.it) return this._t;
    this.it = r2;
    const s2 = [r2];
    return s2.raw = s2, this._t = { _$litType$: this.constructor.resultType, strings: s2, values: [] };
  }
};
e$1.directiveName = "unsafeHTML", e$1.resultType = 1;
const o$2 = e$2(e$1);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let t$1 = class t extends e$1 {
};
t$1.directiveName = "unsafeSVG", t$1.resultType = 2;
const o$1 = e$2(t$1);
var _20_default$5 = {
  "elem": "svg",
  "attrs": {
    "xmlns": "http://www.w3.org/2000/svg",
    "viewBox": "0 0 32 32",
    "fill": "currentColor",
    "width": 20,
    "height": 20
  },
  "content": [
    {
      "elem": "path",
      "attrs": {
        "stroke-width": "0",
        "d": "m28,26c-.178,0-.3472.0308-.5115.0742l-1.0554-1.0552c.3516-.5947.5669-1.2798.5669-2.019s-.2153-1.4243-.5669-2.019l1.0554-1.0552c.1643.0435.3335.0742.5115.0742,1.1045,0,2-.8955,2-2s-.8955-2-2-2-2,.8955-2,2c0,.1777.0308.3472.0742.5117l-1.0552,1.0552c-.595-.3516-1.2795-.5669-2.019-.5669s-1.4241.2153-2.019.5669l-1.0552-1.0552c.0435-.1646.0742-.334.0742-.5117,0-1.1045-.8955-2-2-2s-2,.8955-2,2,.8955,2,2,2c.178,0,.3472-.0308.5115-.0742l1.0554,1.0552c-.3516.5947-.5669,1.2798-.5669,2.019s.2153,1.4243.5669,2.019l-1.0554,1.0552c-.1643-.0435-.3335-.0742-.5115-.0742-1.1045,0-2,.8955-2,2s.8955,2,2,2,2-.8955,2-2c0-.1777-.0308-.3472-.0742-.5117l1.0552-1.0552c.595.3516,1.2795.5669,2.019.5669s1.4241-.2153,2.019-.5669l1.0552,1.0552c-.0435.1646-.0742.334-.0742.5117,0,1.1045.8955,2,2,2s2-.8955,2-2-.8955-2-2-2Zm-7-3c0-1.1025.8972-2,2-2s2,.8975,2,2-.8972,2-2,2-2-.8975-2-2Z"
      }
    },
    {
      "elem": "circle",
      "attrs": {
        "cx": "22",
        "cy": "10",
        "r": "2",
        "stroke-width": "0"
      }
    },
    {
      "elem": "path",
      "attrs": {
        "stroke-width": "0",
        "d": "m21,2c-4.9626,0-9,4.0371-9,9,0,.7788.0989,1.5469.2944,2.291L2,23.5859v6.4141h6.4143l7-7-2.7073-2.707-1.4141,1.4141,1.2927,1.293-1.5896,1.5898-1.2869-1.2949-1.4185,1.4102,1.2913,1.2988-1.9963,1.9961h-3.5857v-3.5859l9.7122-9.7119.8555-.8677-.1982-.5845c-.2451-.7217-.3694-1.4785-.3694-2.25,0-3.8599,3.1401-7,7-7s7,3.1401,7,7h2c0-4.9629-4.0374-9-9-9Z"
      }
    }
  ]
};
var _16_default$A = {
  "elem": "svg",
  "attrs": {
    "xmlns": "http://www.w3.org/2000/svg",
    "viewBox": "0 0 32 32",
    "fill": "currentColor",
    "width": 16,
    "height": 16
  },
  "content": [{
    "elem": "path",
    "attrs": { "d": "M27,22.142V9.858A3.9916,3.9916,0,1,0,22.142,5H9.858A3.9916,3.9916,0,1,0,5,9.858V22.142A3.9916,3.9916,0,1,0,9.858,27H22.142A3.9916,3.9916,0,1,0,27,22.142ZM26,4a2,2,0,1,1-2,2A2.0023,2.0023,0,0,1,26,4ZM4,6A2,2,0,1,1,6,8,2.002,2.002,0,0,1,4,6ZM6,28a2,2,0,1,1,2-2A2.0023,2.0023,0,0,1,6,28Zm16.142-3H9.858A3.9937,3.9937,0,0,0,7,22.142V9.858A3.9947,3.9947,0,0,0,9.858,7H22.142A3.9937,3.9937,0,0,0,25,9.858V22.142A3.9931,3.9931,0,0,0,22.142,25ZM26,28a2,2,0,1,1,2-2A2.0027,2.0027,0,0,1,26,28Z" }
  }],
  "name": "area",
  "size": 16
};
var _16_default$z = {
  "elem": "svg",
  "attrs": {
    "xmlns": "http://www.w3.org/2000/svg",
    "viewBox": "0 0 32 32",
    "fill": "currentColor",
    "width": 16,
    "height": 16
  },
  "content": [{
    "elem": "path",
    "attrs": { "d": "M4.67,28l6.39-12,7.3,6.49a2,2,0,0,0,1.7.47,2,2,0,0,0,1.42-1.07L27,10.9,25.18,10,19.69,21l-7.3-6.49A2,2,0,0,0,10.71,14a2,2,0,0,0-1.42,1L4,25V2H2V28a2,2,0,0,0,2,2H30V28Z" }
  }],
  "name": "chart--line",
  "size": 16
};
var _16_default$y = {
  "elem": "svg",
  "attrs": {
    "xmlns": "http://www.w3.org/2000/svg",
    "viewBox": "0 0 32 32",
    "fill": "currentColor",
    "width": 16,
    "height": 16
  },
  "content": [{
    "elem": "path",
    "attrs": { "d": "M13 24 4 15 5.414 13.586 13 21.171 26.586 7.586 28 9 13 24z" }
  }]
};
var _16_default$x = {
  "elem": "svg",
  "attrs": {
    "xmlns": "http://www.w3.org/2000/svg",
    "viewBox": "0 0 16 16",
    "fill": "currentColor",
    "width": 16,
    "height": 16
  },
  "content": [{
    "elem": "path",
    "attrs": { "d": "M11 8 6 13 5.3 12.3 9.6 8 5.3 3.7 6 3z" }
  }]
};
var _16_default$w = {
  "elem": "svg",
  "attrs": {
    "xmlns": "http://www.w3.org/2000/svg",
    "viewBox": "0 0 32 32",
    "fill": "currentColor",
    "width": 16,
    "height": 16
  },
  "content": [{
    "elem": "path",
    "attrs": {
      "stroke-width": "0",
      "d": "m16,2c-7.732,0-14,6.268-14,14s6.268,14,14,14,14-6.268,14-14S23.732,2,16,2Zm0,26c-6.6274,0-12-5.3726-12-12s5.3726-12,12-12,12,5.3726,12,12-5.3726,12-12,12Z"
    }
  }],
  "name": "circle--outline",
  "size": 16
};
var _16_default$v = {
  "elem": "svg",
  "attrs": {
    "xmlns": "http://www.w3.org/2000/svg",
    "viewBox": "0 0 32 32",
    "fill": "currentColor",
    "width": 16,
    "height": 16
  },
  "content": [{
    "elem": "path",
    "attrs": { "d": "M17.4141 16 24 9.4141 22.5859 8 16 14.5859 9.4143 8 8 9.4141 14.5859 16 8 22.5859 9.4143 24 16 17.4141 22.5859 24 24 22.5859 17.4141 16z" }
  }]
};
var _20_default$4 = {
  "elem": "svg",
  "attrs": {
    "xmlns": "http://www.w3.org/2000/svg",
    "viewBox": "0 0 32 32",
    "fill": "currentColor",
    "width": 20,
    "height": 20
  },
  "content": [{
    "elem": "path",
    "attrs": { "d": "M23.5,22H23V20h.5a4.5,4.5,0,0,0,.36-9L23,11l-.1-.82a7,7,0,0,0-13.88,0L9,11,8.14,11a4.5,4.5,0,0,0,.36,9H9v2H8.5A6.5,6.5,0,0,1,7.2,9.14a9,9,0,0,1,17.6,0A6.5,6.5,0,0,1,23.5,22Z" }
  }, {
    "elem": "path",
    "attrs": { "d": "M17 26.17 17 14 15 14 15 26.17 12.41 23.59 11 25 16 30 21 25 19.59 23.59 17 26.17z" }
  }]
};
var _16_default$u = {
  "elem": "svg",
  "attrs": {
    "xmlns": "http://www.w3.org/2000/svg",
    "viewBox": "0 0 32 32",
    "fill": "currentColor",
    "width": 16,
    "height": 16
  },
  "content": [{
    "elem": "path",
    "attrs": { "d": "M23.5,22H23V20h.5a4.5,4.5,0,0,0,.36-9L23,11l-.1-.82a7,7,0,0,0-13.88,0L9,11,8.14,11a4.5,4.5,0,0,0,.36,9H9v2H8.5A6.5,6.5,0,0,1,7.2,9.14a9,9,0,0,1,17.6,0A6.5,6.5,0,0,1,23.5,22Z" }
  }, {
    "elem": "path",
    "attrs": { "d": "M17 26.17 17 14 15 14 15 26.17 12.41 23.59 11 25 16 30 21 25 19.59 23.59 17 26.17z" }
  }]
};
var _20_default$3 = {
  "elem": "svg",
  "attrs": {
    "xmlns": "http://www.w3.org/2000/svg",
    "viewBox": "0 0 32 32",
    "fill": "currentColor",
    "width": 20,
    "height": 20
  },
  "content": [
    {
      "elem": "circle",
      "attrs": {
        "cx": "10",
        "cy": "12",
        "r": "2"
      }
    },
    {
      "elem": "circle",
      "attrs": {
        "cx": "16",
        "cy": "9",
        "r": "2"
      }
    },
    {
      "elem": "circle",
      "attrs": {
        "cx": "22",
        "cy": "12",
        "r": "2"
      }
    },
    {
      "elem": "circle",
      "attrs": {
        "cx": "23",
        "cy": "18",
        "r": "2"
      }
    },
    {
      "elem": "circle",
      "attrs": {
        "cx": "19",
        "cy": "23",
        "r": "2"
      }
    },
    {
      "elem": "path",
      "attrs": { "d": "M16.54,2A14,14,0,0,0,2,16a4.82,4.82,0,0,0,6.09,4.65l1.12-.31A3,3,0,0,1,13,23.24V27a3,3,0,0,0,3,3A14,14,0,0,0,30,15.46,14.05,14.05,0,0,0,16.54,2Zm8.11,22.31A11.93,11.93,0,0,1,16,28a1,1,0,0,1-1-1V23.24a5,5,0,0,0-5-5,5.07,5.07,0,0,0-1.33.18l-1.12.31A2.82,2.82,0,0,1,4,16,12,12,0,0,1,16.47,4,12.18,12.18,0,0,1,28,15.53,11.89,11.89,0,0,1,24.65,24.32Z" }
    }
  ]
};
var _16_default$t = {
  "elem": "svg",
  "attrs": {
    "xmlns": "http://www.w3.org/2000/svg",
    "viewBox": "0 0 32 32",
    "fill": "currentColor",
    "width": 16,
    "height": 16
  },
  "content": [
    {
      "elem": "circle",
      "attrs": {
        "cx": "10",
        "cy": "12",
        "r": "2"
      }
    },
    {
      "elem": "circle",
      "attrs": {
        "cx": "16",
        "cy": "9",
        "r": "2"
      }
    },
    {
      "elem": "circle",
      "attrs": {
        "cx": "22",
        "cy": "12",
        "r": "2"
      }
    },
    {
      "elem": "circle",
      "attrs": {
        "cx": "23",
        "cy": "18",
        "r": "2"
      }
    },
    {
      "elem": "circle",
      "attrs": {
        "cx": "19",
        "cy": "23",
        "r": "2"
      }
    },
    {
      "elem": "path",
      "attrs": { "d": "M16.54,2A14,14,0,0,0,2,16a4.82,4.82,0,0,0,6.09,4.65l1.12-.31A3,3,0,0,1,13,23.24V27a3,3,0,0,0,3,3A14,14,0,0,0,30,15.46,14.05,14.05,0,0,0,16.54,2Zm8.11,22.31A11.93,11.93,0,0,1,16,28a1,1,0,0,1-1-1V23.24a5,5,0,0,0-5-5,5.07,5.07,0,0,0-1.33.18l-1.12.31A2.82,2.82,0,0,1,4,16,12,12,0,0,1,16.47,4,12.18,12.18,0,0,1,28,15.53,11.89,11.89,0,0,1,24.65,24.32Z" }
    }
  ]
};
var _16_default$s = {
  "elem": "svg",
  "attrs": {
    "xmlns": "http://www.w3.org/2000/svg",
    "viewBox": "0 0 32 32",
    "fill": "currentColor",
    "width": 16,
    "height": 16
  },
  "content": [{
    "elem": "path",
    "attrs": { "d": "M30 24 26 24 26 20 24 20 24 24 20 24 20 26 24 26 24 30 26 30 26 26 30 26 30 24z" }
  }, {
    "elem": "path",
    "attrs": { "d": "M16,28H8V4h8v6a2.0058,2.0058,0,0,0,2,2h6v4h2V10a.9092.9092,0,0,0-.3-.7l-7-7A.9087.9087,0,0,0,18,2H8A2.0058,2.0058,0,0,0,6,4V28a2.0058,2.0058,0,0,0,2,2h8ZM18,4.4,23.6,10H18Z" }
  }]
};
var _20_default$2 = {
  "elem": "svg",
  "attrs": {
    "xmlns": "http://www.w3.org/2000/svg",
    "viewBox": "0 0 32 32",
    "fill": "currentColor",
    "width": 20,
    "height": 20
  },
  "content": [{
    "elem": "path",
    "attrs": { "d": "M25.7,9.3l-7-7A.9078.9078,0,0,0,18,2H8A2.0059,2.0059,0,0,0,6,4V28a2.0059,2.0059,0,0,0,2,2H24a2.0059,2.0059,0,0,0,2-2V10A.9078.9078,0,0,0,25.7,9.3ZM18,4.4,23.6,10H18ZM24,28H8V4h8v6a2.0059,2.0059,0,0,0,2,2h6Z" }
  }]
};
var _16_default$r = {
  "elem": "svg",
  "attrs": {
    "xmlns": "http://www.w3.org/2000/svg",
    "viewBox": "0 0 32 32",
    "fill": "currentColor",
    "width": 16,
    "height": 16
  },
  "content": [{
    "elem": "path",
    "attrs": { "d": "M13 21 26.17 21 23.59 23.59 25 25 30 20 25 15 23.59 16.41 26.17 19 13 19 13 21z" }
  }, {
    "elem": "path",
    "attrs": { "d": "M22,14V10a1,1,0,0,0-.29-.71l-7-7A1,1,0,0,0,14,2H4A2,2,0,0,0,2,4V28a2,2,0,0,0,2,2H20a2,2,0,0,0,2-2V26H20v2H4V4h8v6a2,2,0,0,0,2,2h6v2Zm-8-4V4.41L19.59,10Z" }
  }]
};
var _16_default$q = {
  "elem": "svg",
  "attrs": {
    "xmlns": "http://www.w3.org/2000/svg",
    "viewBox": "0 0 32 32",
    "fill": "currentColor",
    "width": 16,
    "height": 16
  },
  "content": [{
    "elem": "circle",
    "attrs": {
      "cx": "16",
      "cy": "16",
      "r": "8"
    }
  }],
  "name": "dot-mark",
  "size": 16
};
var _16_default$p = {
  "elem": "svg",
  "attrs": {
    "xmlns": "http://www.w3.org/2000/svg",
    "viewBox": "0 0 16 16",
    "fill": "currentColor",
    "width": 16,
    "height": 16
  },
  "content": [{
    "elem": "path",
    "attrs": { "d": "M13 7 12.3 6.3 8.5 10.1 8.5 1 7.5 1 7.5 10.1 3.7 6.3 3 7 8 12z" }
  }, {
    "elem": "path",
    "attrs": { "d": "M13,12v2H3v-2H2v2l0,0c0,0.6,0.4,1,1,1h10c0.6,0,1-0.4,1-1l0,0v-2H13z" }
  }]
};
var _16_default$o = {
  "elem": "svg",
  "attrs": {
    "xmlns": "http://www.w3.org/2000/svg",
    "viewBox": "0 0 32 32",
    "fill": "currentColor",
    "width": 16,
    "height": 16
  },
  "content": [
    {
      "elem": "path",
      "attrs": { "d": "M10 6H14V10H10z" }
    },
    {
      "elem": "path",
      "attrs": { "d": "M18 6H22V10H18z" }
    },
    {
      "elem": "path",
      "attrs": { "d": "M10 14H14V18H10z" }
    },
    {
      "elem": "path",
      "attrs": { "d": "M18 14H22V18H18z" }
    },
    {
      "elem": "path",
      "attrs": { "d": "M10 22H14V26H10z" }
    },
    {
      "elem": "path",
      "attrs": { "d": "M18 22H22V26H18z" }
    }
  ]
};
var _16_default$n = {
  "elem": "svg",
  "attrs": {
    "xmlns": "http://www.w3.org/2000/svg",
    "viewBox": "0 0 32 32",
    "fill": "currentColor",
    "width": 16,
    "height": 16
  },
  "content": [{
    "elem": "path",
    "attrs": { "d": "M16.6123,2.2138a1.01,1.01,0,0,0-1.2427,0L1,13.4194l1.2427,1.5717L4,13.6209V26a2.0041,2.0041,0,0,0,2,2H26a2.0037,2.0037,0,0,0,2-2V13.63L29.7573,15,31,13.4282ZM18,26H14V18h4Zm2,0V18a2.0023,2.0023,0,0,0-2-2H14a2.002,2.002,0,0,0-2,2v8H6V12.0615l10-7.79,10,7.8005V26Z" }
  }]
};
var _20_default$1 = {
  "elem": "svg",
  "attrs": {
    "xmlns": "http://www.w3.org/2000/svg",
    "viewBox": "0 0 32 32",
    "fill": "currentColor",
    "width": 20,
    "height": 20
  },
  "content": [
    {
      "elem": "path",
      "attrs": { "d": "M17 22 17 14 13 14 13 16 15 16 15 22 12 22 12 24 20 24 20 22 17 22z" }
    },
    {
      "elem": "path",
      "attrs": { "d": "M16,8a1.5,1.5,0,1,0,1.5,1.5A1.5,1.5,0,0,0,16,8Z" }
    },
    {
      "elem": "path",
      "attrs": { "d": "M16,30A14,14,0,1,1,30,16,14,14,0,0,1,16,30ZM16,4A12,12,0,1,0,28,16,12,12,0,0,0,16,4Z" }
    }
  ]
};
var _16_default$m = {
  "elem": "svg",
  "attrs": {
    "xmlns": "http://www.w3.org/2000/svg",
    "viewBox": "0 0 32 32",
    "fill": "currentColor",
    "width": 16,
    "height": 16
  },
  "content": [{
    "elem": "path",
    "attrs": { "d": "M29.6245,2.2193a1.0005,1.0005,0,0,0-1.0972-.1006L17.9353,7.8,3.366,2.0694a1,1,0,0,0-1.28,1.3369l6.4353,14.479A3.965,3.965,0,0,0,9.9106,24.83,4.0049,4.0049,0,0,1,6,28H4v2H6a6.0044,6.0044,0,0,0,5.928-5.12,4.0021,4.0021,0,0,0,2.93-2.88H23.24a2,2,0,0,0,1.9273-1.4649L29.9634,3.2676A1,1,0,0,0,29.6245,2.2193ZM11,23a2,2,0,1,1,2-2A2.0025,2.0025,0,0,1,11,23Zm12.24-3H14.8579a3.897,3.897,0,0,0-4.5117-2.9336L4.905,4.8238,18.0647,10,27.41,4.9878Z" }
  }],
  "name": "lasso--polygon",
  "size": 16
};
var _16_default$l = {
  "elem": "svg",
  "attrs": {
    "xmlns": "http://www.w3.org/2000/svg",
    "viewBox": "0 0 32 32",
    "fill": "currentColor",
    "width": 16,
    "height": 16
  },
  "content": [
    {
      "elem": "path",
      "attrs": { "d": "M16,24a.9967.9967,0,0,1-.4741-.12l-13-7L3.4741,15.12,16,21.8643,28.5259,15.12l.9482,1.7607-13,7A.9967.9967,0,0,1,16,24Z" }
    },
    {
      "elem": "path",
      "attrs": { "d": "M16,30a.9967.9967,0,0,1-.4741-.12l-13-7L3.4741,21.12,16,27.8643,28.5259,21.12l.9482,1.7607-13,7A.9967.9967,0,0,1,16,30Z" }
    },
    {
      "elem": "path",
      "attrs": { "d": "M16,18a.9967.9967,0,0,1-.4741-.12l-13-7a1,1,0,0,1,0-1.7607l13-7a.9982.9982,0,0,1,.9482,0l13,7a1,1,0,0,1,0,1.7607l-13,7A.9967.9967,0,0,1,16,18ZM5.1094,10,16,15.8643,26.8906,10,16,4.1358Z" }
    }
  ]
};
var _16_default$k = {
  "elem": "svg",
  "attrs": {
    "xmlns": "http://www.w3.org/2000/svg",
    "viewBox": "0 0 32 32",
    "fill": "currentColor",
    "width": 16,
    "height": 16
  },
  "content": [
    {
      "elem": "path",
      "attrs": { "d": "M16 22H30V24H16z" }
    },
    {
      "elem": "rect",
      "attrs": {
        "width": "6",
        "height": "6",
        "x": "4",
        "y": "20",
        "rx": "1"
      }
    },
    {
      "elem": "path",
      "attrs": { "d": "M16 8H30V10H16z" }
    },
    {
      "elem": "path",
      "attrs": { "d": "M9.5,12h-5a.5.5,0,0,1-.4473-.7236l2.5-5.0224a.5206.5206,0,0,1,.8945,0l2.5,5.0225A.5.5,0,0,1,9.5,12Z" }
    }
  ]
};
var _16_default$j = {
  "elem": "svg",
  "attrs": {
    "xmlns": "http://www.w3.org/2000/svg",
    "viewBox": "0 0 32 32",
    "fill": "currentColor",
    "width": 16,
    "height": 16
  },
  "content": [{
    "elem": "path",
    "attrs": { "d": "M29.25,6.76a6,6,0,0,0-8.5,0l1.42,1.42a4,4,0,1,1,5.67,5.67l-8,8a4,4,0,1,1-5.67-5.66l1.41-1.42-1.41-1.42-1.42,1.42a6,6,0,0,0,0,8.5A6,6,0,0,0,17,25a6,6,0,0,0,4.27-1.76l8-8A6,6,0,0,0,29.25,6.76Z" }
  }, {
    "elem": "path",
    "attrs": { "d": "M4.19,24.82a4,4,0,0,1,0-5.67l8-8a4,4,0,0,1,5.67,0A3.94,3.94,0,0,1,19,14a4,4,0,0,1-1.17,2.85L15.71,19l1.42,1.42,2.12-2.12a6,6,0,0,0-8.51-8.51l-8,8a6,6,0,0,0,0,8.51A6,6,0,0,0,7,28a6.07,6.07,0,0,0,4.28-1.76L9.86,24.82A4,4,0,0,1,4.19,24.82Z" }
  }]
};
var _16_default$i = {
  "elem": "svg",
  "attrs": {
    "xmlns": "http://www.w3.org/2000/svg",
    "viewBox": "0 0 32 32",
    "fill": "currentColor",
    "width": 16,
    "height": 16
  },
  "content": [{
    "elem": "path",
    "attrs": { "d": "M16,18a5,5,0,1,1,5-5A5.0057,5.0057,0,0,1,16,18Zm0-8a3,3,0,1,0,3,3A3.0033,3.0033,0,0,0,16,10Z" }
  }, {
    "elem": "path",
    "attrs": { "d": "M16,30,7.5645,20.0513c-.0479-.0571-.3482-.4515-.3482-.4515A10.8888,10.8888,0,0,1,5,13a11,11,0,0,1,22,0,10.8844,10.8844,0,0,1-2.2148,6.5973l-.0015.0025s-.3.3944-.3447.4474ZM8.8125,18.395c.001.0007.2334.3082.2866.3744L16,26.9079l6.91-8.15c.0439-.0552.2783-.3649.2788-.3657A8.901,8.901,0,0,0,25,13,9,9,0,1,0,7,13a8.9054,8.9054,0,0,0,1.8125,5.395Z" }
  }]
};
var _16_default$h = {
  "elem": "svg",
  "attrs": {
    "xmlns": "http://www.w3.org/2000/svg",
    "viewBox": "0 0 32 32",
    "fill": "currentColor",
    "width": 16,
    "height": 16
  },
  "content": [
    {
      "elem": "path",
      "attrs": { "d": "M16,24l-6.09-8.6A8.14,8.14,0,0,1,16,2a8.08,8.08,0,0,1,8,8.13,8.2,8.2,0,0,1-1.8,5.13ZM16,4a6.07,6.07,0,0,0-6,6.13,6.19,6.19,0,0,0,1.49,4L16,20.52,20.63,14A6.24,6.24,0,0,0,22,10.13,6.07,6.07,0,0,0,16,4Z" }
    },
    {
      "elem": "circle",
      "attrs": {
        "cx": "16",
        "cy": "9",
        "r": "2"
      }
    },
    {
      "elem": "path",
      "attrs": { "d": "M28,12H26v2h2V28H4V14H6V12H4a2,2,0,0,0-2,2V28a2,2,0,0,0,2,2H28a2,2,0,0,0,2-2V14A2,2,0,0,0,28,12Z" }
    }
  ]
};
var _16_default$g = {
  "elem": "svg",
  "attrs": {
    "xmlns": "http://www.w3.org/2000/svg",
    "viewBox": "0 0 32 32",
    "fill": "currentColor",
    "width": 16,
    "height": 16
  },
  "content": [
    {
      "elem": "path",
      "attrs": { "d": "M26,16a9.9283,9.9283,0,0,0-1.1392-4.6182l-1.4961,1.4961A7.9483,7.9483,0,0,1,24,16Z" }
    },
    {
      "elem": "path",
      "attrs": { "d": "M23.4141,10,22,8.5859l-4.7147,4.7147A2.9659,2.9659,0,0,0,16,13a3,3,0,1,0,3,3,2.9659,2.9659,0,0,0-.3006-1.2853ZM16,17a1,1,0,1,1,1-1A1.0013,1.0013,0,0,1,16,17Z" }
    },
    {
      "elem": "path",
      "attrs": { "d": "M16,8a7.9515,7.9515,0,0,1,3.1223.6353l1.4961-1.4961A9.9864,9.9864,0,0,0,6,16H8A8.0092,8.0092,0,0,1,16,8Z" }
    },
    {
      "elem": "path",
      "attrs": { "d": "M16,30A14,14,0,1,1,30,16,14.0158,14.0158,0,0,1,16,30ZM16,4A12,12,0,1,0,28,16,12.0137,12.0137,0,0,0,16,4Z" }
    }
  ]
};
var _16_default$f = {
  "elem": "svg",
  "attrs": {
    "xmlns": "http://www.w3.org/2000/svg",
    "viewBox": "0 0 32 32",
    "fill": "currentColor",
    "width": 16,
    "height": 16
  },
  "content": [
    {
      "elem": "circle",
      "attrs": {
        "cx": "16",
        "cy": "8",
        "r": "2"
      }
    },
    {
      "elem": "circle",
      "attrs": {
        "cx": "16",
        "cy": "16",
        "r": "2"
      }
    },
    {
      "elem": "circle",
      "attrs": {
        "cx": "16",
        "cy": "24",
        "r": "2"
      }
    }
  ]
};
var _16_default$e = {
  "elem": "svg",
  "attrs": {
    "xmlns": "http://www.w3.org/2000/svg",
    "viewBox": "0 0 32 32",
    "fill": "currentColor",
    "width": 16,
    "height": 16
  },
  "content": [{
    "elem": "path",
    "attrs": { "d": "M27.3069,6.1069,30,3.4141,28.5859,2,25.8931,4.6929,24.8,3.6a1.9328,1.9328,0,0,0-2.8,0L4,21.6V28h6.4l18-18a1.9329,1.9329,0,0,0,0-2.8ZM9.6,26H6V22.4L23.4,5,27,8.6Z" }
  }, {
    "elem": "path",
    "attrs": {
      "d": "M8.136 7.5H18.863999999999997V9.5H8.136z",
      "transform": "rotate(-45 13.5 8.5)"
    }
  }],
  "name": "pen",
  "size": 16
};
var _16_default$d = {
  "elem": "svg",
  "attrs": {
    "xmlns": "http://www.w3.org/2000/svg",
    "viewBox": "0 0 32 32",
    "fill": "currentColor",
    "width": 16,
    "height": 16
  },
  "content": [{
    "elem": "path",
    "attrs": { "d": "M28,9H25V3H7V9H4a2,2,0,0,0-2,2V21a2,2,0,0,0,2,2H7v6H25V23h3a2,2,0,0,0,2-2V11A2,2,0,0,0,28,9ZM9,5H23V9H9ZM23,27H9V17H23Zm5-6H25V15H7v6H4V11H28Z" }
  }]
};
var _16_default$c = {
  "elem": "svg",
  "attrs": {
    "xmlns": "http://www.w3.org/2000/svg",
    "viewBox": "0 0 32 32",
    "fill": "currentColor",
    "width": 16,
    "height": 16
  },
  "content": [{
    "elem": "path",
    "attrs": { "d": "M12,10H6.78A11,11,0,0,1,27,16h2A13,13,0,0,0,6,7.68V4H4v8h8Z" }
  }, {
    "elem": "path",
    "attrs": { "d": "M20,22h5.22A11,11,0,0,1,5,16H3a13,13,0,0,0,23,8.32V28h2V20H20Z" }
  }]
};
var _16_default$b = {
  "elem": "svg",
  "attrs": {
    "xmlns": "http://www.w3.org/2000/svg",
    "viewBox": "0 0 32 32",
    "fill": "currentColor",
    "width": 16,
    "height": 16
  },
  "content": [{
    "elem": "path",
    "attrs": { "d": "M29,10H3a1,1,0,0,0-1,1V21a1,1,0,0,0,1,1H29a1,1,0,0,0,1-1V11A1,1,0,0,0,29,10ZM28,20H4V12H8v4h2V12h5v4h2V12h5v4h2V12h4Z" }
  }],
  "name": "ruler",
  "size": 16
};
var _16_default$a = {
  "elem": "svg",
  "attrs": {
    "xmlns": "http://www.w3.org/2000/svg",
    "viewBox": "0 0 32 32",
    "fill": "currentColor",
    "width": 16,
    "height": 16
  },
  "content": [{
    "elem": "path",
    "attrs": { "d": "M29.41,21.67,10.34,2.58a2,2,0,0,0-2.83,0L2.59,7.51a2,2,0,0,0,0,2.82L21.66,29.42a2,2,0,0,0,1.42.58,2,2,0,0,0,1.41-.58l4.92-4.93A2,2,0,0,0,29.41,21.67ZM23.08,28,4,8.92,8.92,4l3.79,3.79L10.46,10l1.41,1.41L14.12,9.2l4.13,4.13L16,15.58,17.42,17l2.25-2.25,4.13,4.13-2.25,2.25L23,22.54l2.25-2.25L28,23.08Z" }
  }]
};
var _16_default$9 = {
  "elem": "svg",
  "attrs": {
    "xmlns": "http://www.w3.org/2000/svg",
    "viewBox": "0 0 16 16",
    "fill": "currentColor",
    "width": 16,
    "height": 16
  },
  "content": [{
    "elem": "path",
    "attrs": { "d": "M13.5,8.4c0-0.1,0-0.3,0-0.4c0-0.1,0-0.3,0-0.4l1-0.8c0.4-0.3,0.4-0.9,0.2-1.3l-1.2-2C13.3,3.2,13,3,12.6,3	c-0.1,0-0.2,0-0.3,0.1l-1.2,0.4c-0.2-0.1-0.4-0.3-0.7-0.4l-0.3-1.3C10.1,1.3,9.7,1,9.2,1H6.8c-0.5,0-0.9,0.3-1,0.8L5.6,3.1	C5.3,3.2,5.1,3.3,4.9,3.4L3.7,3C3.6,3,3.5,3,3.4,3C3,3,2.7,3.2,2.5,3.5l-1.2,2C1.1,5.9,1.2,6.4,1.6,6.8l0.9,0.9c0,0.1,0,0.3,0,0.4	c0,0.1,0,0.3,0,0.4L1.6,9.2c-0.4,0.3-0.5,0.9-0.2,1.3l1.2,2C2.7,12.8,3,13,3.4,13c0.1,0,0.2,0,0.3-0.1l1.2-0.4	c0.2,0.1,0.4,0.3,0.7,0.4l0.3,1.3c0.1,0.5,0.5,0.8,1,0.8h2.4c0.5,0,0.9-0.3,1-0.8l0.3-1.3c0.2-0.1,0.4-0.2,0.7-0.4l1.2,0.4	c0.1,0,0.2,0.1,0.3,0.1c0.4,0,0.7-0.2,0.9-0.5l1.1-2c0.2-0.4,0.2-0.9-0.2-1.3L13.5,8.4z M12.6,12l-1.7-0.6c-0.4,0.3-0.9,0.6-1.4,0.8	L9.2,14H6.8l-0.4-1.8c-0.5-0.2-0.9-0.5-1.4-0.8L3.4,12l-1.2-2l1.4-1.2c-0.1-0.5-0.1-1.1,0-1.6L2.2,6l1.2-2l1.7,0.6	C5.5,4.2,6,4,6.5,3.8L6.8,2h2.4l0.4,1.8c0.5,0.2,0.9,0.5,1.4,0.8L12.6,4l1.2,2l-1.4,1.2c0.1,0.5,0.1,1.1,0,1.6l1.4,1.2L12.6,12z" }
  }, {
    "elem": "path",
    "attrs": { "d": "M8,11c-1.7,0-3-1.3-3-3s1.3-3,3-3s3,1.3,3,3C11,9.6,9.7,11,8,11C8,11,8,11,8,11z M8,6C6.9,6,6,6.8,6,7.9C6,7.9,6,8,6,8	c0,1.1,0.8,2,1.9,2c0,0,0.1,0,0.1,0c1.1,0,2-0.8,2-1.9c0,0,0-0.1,0-0.1C10,6.9,9.2,6,8,6C8.1,6,8,6,8,6z" }
  }]
};
var _16_default$8 = {
  "elem": "svg",
  "attrs": {
    "xmlns": "http://www.w3.org/2000/svg",
    "viewBox": "0 0 32 32",
    "fill": "currentColor",
    "width": 16,
    "height": 16
  },
  "content": [
    {
      "elem": "path",
      "attrs": {
        "stroke-width": "0",
        "d": "m5,16h-2v11c0,1.1045.8954,2,2,2h8v-2H5v-11Z"
      }
    },
    {
      "elem": "path",
      "attrs": {
        "stroke-width": "0",
        "d": "m28,29h-11c-.3535,0-.6809-.1866-.8608-.4911-.0927-.1568-.1392-.3328-.1392-.5089,0-.1658.0412-.3317.1238-.4819l5.5-10c.1898-.3451.5333-.5178.8762-.5181.3434-.0003.6861.1724.8762.5181l5.5,10c.0826.1502.1238.3162.1238.4819,0,.1762-.0465.3521-.1392.5089-.1799.3044-.5073.4911-.8608.4911Zm-9.3088-2h7.6177l-3.8088-6.9249-3.8088,6.9249Z"
      }
    },
    {
      "elem": "path",
      "attrs": {
        "stroke-width": "0",
        "d": "m27,3h-11v2h11v13.9922h2V5c0-1.1045-.8954-2-2-2Z"
      }
    },
    {
      "elem": "path",
      "attrs": {
        "stroke-width": "0",
        "d": "m11,3h-6c-1.1046,0-2,.8955-2,2v6c0,1.1045.8954,2,2,2h6c1.1046,0,2-.8955,2-2v-6c0-1.1045-.8954-2-2-2Zm0,8h-6v-6h6v6Z"
      }
    }
  ]
};
var _16_default$7 = {
  "elem": "svg",
  "attrs": {
    "xmlns": "http://www.w3.org/2000/svg",
    "viewBox": "0 0 32 32",
    "fill": "currentColor",
    "width": 16,
    "height": 16
  },
  "content": [{
    "elem": "path",
    "attrs": {
      "stroke-width": "0",
      "d": "m26,4H6c-1.1046,0-2,.8954-2,2v20c0,1.1046.8954,2,2,2h20c1.1046,0,2-.8954,2-2V6c0-1.1046-.8954-2-2-2ZM6,26V6h20v20H6Z"
    }
  }],
  "name": "square--outline",
  "size": 16
};
var _16_default$6 = {
  "elem": "svg",
  "attrs": {
    "xmlns": "http://www.w3.org/2000/svg",
    "viewBox": "0 0 32 32",
    "fill": "currentColor",
    "width": 16,
    "height": 16
  },
  "content": [
    {
      "elem": "path",
      "attrs": { "d": "M12 12H14V24H12z" }
    },
    {
      "elem": "path",
      "attrs": { "d": "M18 12H20V24H18z" }
    },
    {
      "elem": "path",
      "attrs": { "d": "M4,6V8H6V28a2,2,0,0,0,2,2H24a2,2,0,0,0,2-2V8h2V6ZM8,28V8H24V28Z" }
    },
    {
      "elem": "path",
      "attrs": { "d": "M12 2H20V4H12z" }
    }
  ]
};
var _16_default$5 = {
  "elem": "svg",
  "attrs": {
    "xmlns": "http://www.w3.org/2000/svg",
    "viewBox": "0 0 32 32",
    "fill": "currentColor",
    "width": 16,
    "height": 16
  },
  "content": [{
    "elem": "path",
    "attrs": { "d": "M16 14 6 24 7.4 25.4 16 16.8 24.6 25.4 26 24z" }
  }, {
    "elem": "path",
    "attrs": { "d": "M4 8H28V10H4z" }
  }]
};
var _16_default$4 = {
  "elem": "svg",
  "attrs": {
    "xmlns": "http://www.w3.org/2000/svg",
    "viewBox": "0 0 16 16",
    "fill": "currentColor",
    "width": 16,
    "height": 16
  },
  "content": [{
    "elem": "path",
    "attrs": { "d": "M15.5,7.8C14.3,4.7,11.3,2.6,8,2.5C4.7,2.6,1.7,4.7,0.5,7.8c0,0.1,0,0.2,0,0.3c1.2,3.1,4.1,5.2,7.5,5.3	c3.3-0.1,6.3-2.2,7.5-5.3C15.5,8.1,15.5,7.9,15.5,7.8z M8,12.5c-2.7,0-5.4-2-6.5-4.5c1-2.5,3.8-4.5,6.5-4.5s5.4,2,6.5,4.5	C13.4,10.5,10.6,12.5,8,12.5z" }
  }, {
    "elem": "path",
    "attrs": { "d": "M8,5C6.3,5,5,6.3,5,8s1.3,3,3,3s3-1.3,3-3S9.7,5,8,5z M8,10c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2S9.1,10,8,10z" }
  }]
};
var _16_default$3 = {
  "elem": "svg",
  "attrs": {
    "xmlns": "http://www.w3.org/2000/svg",
    "viewBox": "0 0 16 16",
    "fill": "currentColor",
    "width": 16,
    "height": 16
  },
  "content": [
    {
      "elem": "path",
      "attrs": { "d": "M2.6,11.3l0.7-0.7C2.6,9.8,1.9,9,1.5,8c1-2.5,3.8-4.5,6.5-4.5c0.7,0,1.4,0.1,2,0.4l0.8-0.8C9.9,2.7,9,2.5,8,2.5	C4.7,2.6,1.7,4.7,0.5,7.8c0,0.1,0,0.2,0,0.3C1,9.3,1.7,10.4,2.6,11.3z" }
    },
    {
      "elem": "path",
      "attrs": { "d": "M6,7.9c0.1-1,0.9-1.8,1.8-1.8l0.9-0.9C7.2,4.7,5.5,5.6,5.1,7.2C5,7.7,5,8.3,5.1,8.8L6,7.9z" }
    },
    {
      "elem": "path",
      "attrs": { "d": "M15.5,7.8c-0.6-1.5-1.6-2.8-2.9-3.7L15,1.7L14.3,1L1,14.3L1.7,15l2.6-2.6c1.1,0.7,2.4,1,3.7,1.1c3.3-0.1,6.3-2.2,7.5-5.3	C15.5,8.1,15.5,7.9,15.5,7.8z M10,8c0,1.1-0.9,2-2,2c-0.3,0-0.7-0.1-1-0.3L9.7,7C9.9,7.3,10,7.6,10,8z M8,12.5c-1,0-2.1-0.3-3-0.8	l1.3-1.3c1.4,0.9,3.2,0.6,4.2-0.8c0.7-1,0.7-2.4,0-3.4l1.4-1.4c1.1,0.8,2,1.9,2.6,3.2C13.4,10.5,10.6,12.5,8,12.5z" }
    }
  ]
};
var _16_default$2 = {
  "elem": "svg",
  "attrs": {
    "xmlns": "http://www.w3.org/2000/svg",
    "viewBox": "0 0 32 32",
    "fill": "currentColor",
    "width": 16,
    "height": 16
  },
  "content": [
    {
      "elem": "path",
      "attrs": {
        "fill": "none",
        "d": "M16,26a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,16,26Zm-1.125-5h2.25V12h-2.25Z",
        "data-icon-path": "inner-path"
      }
    },
    {
      "elem": "path",
      "attrs": { "d": "M16.002,6.1714h-.004L4.6487,27.9966,4.6506,28H27.3494l.0019-.0034ZM14.875,12h2.25v9h-2.25ZM16,26a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,16,26Z" }
    },
    {
      "elem": "path",
      "attrs": { "d": "M29,30H3a1,1,0,0,1-.8872-1.4614l13-25a1,1,0,0,1,1.7744,0l13,25A1,1,0,0,1,29,30ZM4.6507,28H27.3493l.002-.0033L16.002,6.1714h-.004L4.6487,27.9967Z" }
    }
  ]
};
var _20_default = {
  "elem": "svg",
  "attrs": {
    "xmlns": "http://www.w3.org/2000/svg",
    "viewBox": "0 0 32 32",
    "fill": "currentColor",
    "width": 20,
    "height": 20
  },
  "content": [{
    "elem": "path",
    "attrs": { "d": "M18 12 14 12 14 8 12 8 12 12 8 12 8 14 12 14 12 18 14 18 14 14 18 14 18 12z" }
  }, {
    "elem": "path",
    "attrs": { "d": "M21.4479,20A10.856,10.856,0,0,0,24,13,11,11,0,1,0,13,24a10.856,10.856,0,0,0,7-2.5521L27.5859,29,29,27.5859ZM13,22a9,9,0,1,1,9-9A9.01,9.01,0,0,1,13,22Z" }
  }]
};
var _16_default$1 = {
  "elem": "svg",
  "attrs": {
    "xmlns": "http://www.w3.org/2000/svg",
    "viewBox": "0 0 16 16",
    "fill": "currentColor",
    "width": 16,
    "height": 16
  },
  "content": [{
    "elem": "path",
    "attrs": { "d": "M9 6 7 6 7 4 6 4 6 6 4 6 4 7 6 7 6 9 7 9 7 7 9 7z" }
  }, {
    "elem": "path",
    "attrs": { "d": "M10.7,10C11.5,9,12,7.8,12,6.5C12,3.5,9.5,1,6.5,1S1,3.5,1,6.5S3.5,12,6.5,12c1.3,0,2.5-0.5,3.5-1.3l3.8,3.8l0.7-0.7	L10.7,10z M6.5,11C4,11,2,9,2,6.5S4,2,6.5,2S11,4,11,6.5S9,11,6.5,11L6.5,11z" }
  }]
};
var _16_default = {
  "elem": "svg",
  "attrs": {
    "xmlns": "http://www.w3.org/2000/svg",
    "viewBox": "0 0 16 16",
    "fill": "currentColor",
    "width": 16,
    "height": 16
  },
  "content": [{
    "elem": "path",
    "attrs": { "d": "M4 6H9V7H4z" }
  }, {
    "elem": "path",
    "attrs": { "d": "M10.7,10C11.5,9,12,7.8,12,6.5C12,3.5,9.5,1,6.5,1S1,3.5,1,6.5S3.5,12,6.5,12c1.3,0,2.5-0.5,3.5-1.3l3.8,3.8l0.7-0.7	L10.7,10z M6.5,11C4,11,2,9,2,6.5S4,2,6.5,2S11,4,11,6.5S9,11,6.5,11L6.5,11z" }
  }]
};
const MAX_CONCURRENT_PREVIEW_VIEWERS = 6;
class PreviewViewerPool {
  constructor() {
    this.entries = /* @__PURE__ */ new Map();
  }
  /** Bir preview'i havuza kaydeder; havuz doluysa en eski kullanilan once tahliye edilir. */
  activate(id, onEvict) {
    if (this.entries.has(id)) {
      this.touch(id);
      return;
    }
    if (this.entries.size >= MAX_CONCURRENT_PREVIEW_VIEWERS) {
      this.evictOldest();
    }
    this.entries.set(id, { lastUsed: performance.now(), onEvict });
  }
  /** Son-kullanim zamanini gunceller (LRU siralamasinda tahliyeden korur). */
  touch(id) {
    const entry = this.entries.get(id);
    if (entry) entry.lastUsed = performance.now();
  }
  /** Preview kendi istegiyle (ör. gorunumden cikinca) havuzdan ayrilir. */
  release(id) {
    this.entries.delete(id);
  }
  evictOldest() {
    let oldestId;
    let oldestEntry;
    for (const [id, entry] of this.entries) {
      if (!oldestEntry || entry.lastUsed < oldestEntry.lastUsed) {
        oldestId = id;
        oldestEntry = entry;
      }
    }
    if (oldestId === void 0 || oldestEntry === void 0) return;
    this.entries.delete(oldestId);
    oldestEntry.onEvict();
  }
}
const previewViewerPool = new PreviewViewerPool();
const mapPreviewStyles = b`
  <style>
    tucbs-map-preview {
      display: inline-block;
    }
    .preview-box {
      /* border-box olmadan, width/height'e eklenen 1px border kutuyu
         disaridan verilen boyuttan (orn. TucbsServiceUpload'un dialog
         ile birebir esitledigi width/height) biraz daha buyuk yapip
         tasmaya yol aciyordu. */
      box-sizing: border-box;
      position: relative;
      overflow: hidden;
      border: 1px solid var(--cds-border-subtle, #e0e0e0);
      border-radius: 4px;
      background: var(--cds-layer-01, #f4f4f4);
    }
    .zoom-controls {
      position: absolute;
      top: 0.25rem;
      left: 0.25rem;
      z-index: 10;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .zoom-button {
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--cds-layer-01, #ffffff);
      border: 1px solid var(--cds-border-subtle, #e0e0e0);
      border-radius: 2px;
      cursor: pointer;
      padding: 0;
    }
    .zoom-button svg {
      width: 16px;
      height: 16px;
    }
    .map-host,
    .placeholder {
      width: 100%;
      height: 100%;
    }
    .loading-overlay {
      position: absolute;
      inset: 0;
      z-index: 20;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(244, 244, 244, 0.7);
    }
    .spinner {
      width: 28px;
      height: 28px;
      border: 3px solid var(--cds-border-subtle, #e0e0e0);
      border-top-color: var(--cds-interactive, #0f62fe);
      border-radius: 50%;
      animation: tucbs-map-preview-spin 0.8s linear infinite;
    }
    @keyframes tucbs-map-preview-spin {
      to {
        transform: rotate(360deg);
      }
    }
    .basemap-blocked-overlay {
      position: absolute;
      inset: 0;
      z-index: 15;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 8px;
      background: rgba(127, 29, 29, 0.45);
      box-sizing: border-box;
    }
    .basemap-blocked-overlay__panel {
      max-width: 100%;
      background: #fef2f2;
      color: #111827;
      border: 1px solid #fecaca;
      border-radius: 8px;
      padding: 8px 10px;
      box-shadow: 0 4px 16px rgba(127, 29, 29, 0.2);
      font-family: Segoe UI, system-ui, sans-serif;
    }
    .basemap-blocked-overlay__title {
      margin: 0 0 4px;
      font-size: 12px;
      font-weight: 700;
      color: #991b1b;
    }
    .basemap-blocked-overlay__msg {
      margin: 0;
      font-size: 11px;
      line-height: 1.4;
      color: #7f1d1d;
      word-break: break-word;
    }
    /* Map.ts, kucuk kredi/attribution SATIRINI (creditContainer) DOM'a hic
       eklenmemis gizli bir div'e yonlendiriyor — ama Cesium'un Scene.js'i
       ayrica bir "creditViewport" (lightbox popup'inin ekleneceği yer)
       bekler ve bu HICBIR ZAMAN verilmedigi icin varsayilan olarak
       canvas.parentNode'u (yani bu bilesenin KENDI, gorunur harita
       container'ini) kullanir. Lightbox normalde tiklanana kadar
       gizli (display:none) kalmasi gereken bir modal olsa da, burada
       bu container icinde beklenmedik sekilde acik gorunuyordu (bkz.
       "Data provided by:" metni onizlemenin ustunde). Kok nedeni
       tamamen elemek yerine (Cesium'un Scene/CreditDisplay ic
       mantigina bagli), dogrudan bastiriyoruz — zaten Map.ts'in
       niyeti onizlemede hicbir credit/attribution UI'i gostermemekti. */
    .map-host
      :is(
        .cesium-credit-lightbox-overlay,
        .cesium-credit-textContainer,
        .cesium-credit-logoContainer,
        .cesium-credit-expand-link
      ) {
      display: none !important;
    }
  </style>
`;
class AsyncGeneration {
  constructor() {
    this.current = 0;
  }
  /** Yeni bir nesil baslatir ve ona ait token'i doner. */
  next() {
    return ++this.current;
  }
  /** Verilen token, EN SON baslatilan nesle ait mi (yani hala gecerli mi)? */
  isCurrent(token) {
    return token === this.current;
  }
}
function defaultTrueAttribute(value) {
  return value !== "false";
}
function iconNodeToString(node) {
  const attrs = node.attrs ? Object.entries(node.attrs).map(([key, value]) => `${key}="${String(value)}"`).join(" ") : "";
  const children = (node.content ?? []).map(iconNodeToString).join("");
  return `<${node.elem} ${attrs}>${children}</${node.elem}>`;
}
function zoomInProportional(camera, stepRatio, minHeight = 0) {
  const height = camera.positionCartographic.height;
  const amount = Math.min(height * stepRatio, height - minHeight);
  if (amount > 0) camera.zoomIn(amount);
}
function zoomOutProportional(camera, stepRatio, maxHeight = Infinity) {
  const height = camera.positionCartographic.height;
  const amount = Math.min(height * stepRatio, maxHeight - height);
  if (amount > 0) camera.zoomOut(amount);
}
var __defProp$z = Object.defineProperty;
var __getOwnPropDesc$A = Object.getOwnPropertyDescriptor;
var __typeError$3 = (msg) => {
  throw TypeError(msg);
};
var __decorateClass$A = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$A(target, key) : target;
  for (var i4 = decorators.length - 1, decorator; i4 >= 0; i4--)
    if (decorator = decorators[i4])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$z(target, key, result);
  return result;
};
var __accessCheck$3 = (obj, member, msg) => member.has(obj) || __typeError$3("Cannot " + msg);
var __privateGet$3 = (obj, member, getter) => (__accessCheck$3(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd$3 = (obj, member, value) => member.has(obj) ? __typeError$3("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet$1 = (obj, member, value, setter) => (__accessCheck$3(obj, member, "write to private field"), member.set(obj, value), value);
var _apiKey$1;
const ICON_ZOOM_IN$3 = o$1(iconNodeToString(_16_default$1));
const ICON_ZOOM_OUT$1 = o$1(iconNodeToString(_16_default));
const IMAGERY_LAYER_TYPES = /* @__PURE__ */ new Set([
  "WMS",
  "WMTS",
  "WCS",
  "GEOTIFF",
  "XYZ"
]);
const GLOBAL_LONGITUDE_SPAN_THRESHOLD = Math$1.toRadians(350);
const GLOBAL_LATITUDE_SPAN_THRESHOLD = Math$1.toRadians(160);
function isGloballyExtentedLayer(managed) {
  var _a2;
  const cesiumObject = managed.cesiumObject;
  if (!("imageryProvider" in cesiumObject)) return false;
  const rectangle = (_a2 = cesiumObject.imageryProvider) == null ? void 0 : _a2.rectangle;
  if (!rectangle) return false;
  const lonSpan = rectangle.east - rectangle.west;
  const latSpan = rectangle.north - rectangle.south;
  return lonSpan >= GLOBAL_LONGITUDE_SPAN_THRESHOLD && latSpan >= GLOBAL_LATITUDE_SPAN_THRESHOLD;
}
const HGM_GATED_BASEMAP_IDS = new Set(HGM_BASEMAP_IDS);
let tucbsMapPreviewInstanceCounter = 0;
let TucbsMapPreview = class extends i$3 {
  constructor() {
    super(...arguments);
    this._autoId = `tucbs-map-preview-${++tucbsMapPreviewInstanceCounter}`;
    __privateAdd$3(this, _apiKey$1, "");
    this.basemap = "hgm-temel";
    this.mode = "2D";
    this.width = "300px";
    this.height = "200px";
    this.showZoomButtons = true;
    this.zoomToLayer = false;
    this._active = false;
    this._mapInstance = null;
    this._loading = false;
    this._basemapBlocked = false;
    this._syncGeneration = new AsyncGeneration();
  }
  get hostId() {
    return this.id || this._autoId;
  }
  set apiKey(value) {
    const old = __privateGet$3(this, _apiKey$1);
    __privateSet$1(this, _apiKey$1, value);
    this.requestUpdate("apiKey", old);
  }
  /** apiKey tanımlıysa `"••••••"`, değilse boş metin döner; gerçek değer dışarıdan okunamaz. */
  get apiKey() {
    return __privateGet$3(this, _apiKey$1) ? "••••••" : "";
  }
  // apiKey gerektiren bir HGM altligi, apiKey yok/gecersiz oldugu icin
  // yuklenmediginde true -- bkz _syncBasemap().
  /** Bileşenin kendi bağımsız Core JS API `Map` instance'ı (bileşen aktif değilken `null`). */
  get map() {
    return this._mapInstance;
  }
  /** Shadow DOM yerine Light DOM kullanır (Cesium widgets.css'in sızabilmesi için, bkz aşağıdaki WHY yorumu). */
  createRenderRoot() {
    return this;
  }
  /** Lit lifecycle: bileşen DOM'a bağlandığında görünürlük tabanlı lazy-mount için IntersectionObserver kurar. */
  connectedCallback() {
    super.connectedCallback();
    if (!this.id) this.id = this._autoId;
    this._observer = new IntersectionObserver((entries) => {
      var _a2;
      if ((_a2 = entries[0]) == null ? void 0 : _a2.isIntersecting) {
        this._requestActivate();
      } else {
        this._requestDeactivate();
      }
    });
    this._observer.observe(this);
  }
  /** Lit lifecycle: bileşen DOM'dan kaldırıldığında observer'ı durdurur ve haritayı deaktive eder. */
  disconnectedCallback() {
    var _a2;
    super.disconnectedCallback();
    (_a2 = this._observer) == null ? void 0 : _a2.disconnect();
    this._requestDeactivate();
  }
  /** Lit lifecycle: `basemap`/`mode`/`apiKey`/`layer`/`layerOptions` değişikliklerine göre haritayı senkronize eder. */
  updated(changed) {
    if (!this._mapInstance) return;
    if (changed.has("basemap") || changed.has("apiKey")) void this._syncBasemap();
    if (changed.has("mode")) this._mapInstance.setMode(this.mode);
    if (changed.has("layer") || changed.has("layerOptions")) {
      void this._syncLayer();
      void this._syncBasemap();
    }
  }
  // === Gorunurluk tabanli lazy-mount ===
  _requestActivate() {
    if (this._active) {
      previewViewerPool.touch(this.hostId);
      return;
    }
    previewViewerPool.activate(this.hostId, () => this._deactivate());
    this._active = true;
    void this.updateComplete.then(() => this._mountMap());
  }
  _requestDeactivate() {
    if (!this._active) return;
    previewViewerPool.release(this.hostId);
    this._deactivate();
  }
  _mountMap() {
    if (this._mapInstance || !this._active) return;
    const container = this.renderRoot.querySelector(
      `#${this.hostId}-host`
    );
    if (!container) return;
    this._mapInstance = new Map$1(container, {
      // TucbsMap.ts'teki AYNI korumayla (bkz o dosyadaki new Map() cagrisi):
      // "" (apiKey hic verilmemis) burada KOSULSUZ gecirilirse Map/LayerManager
      // bunu "bos bir key VERILDI" sanip (yalnizca undefined ile karsilastirir)
      // OGC istekleri icin dogrudan yerine yerel /wms-proxy'yi zorunlu kilar --
      // apiKey gerektirmeyen acik/genel WMS/WMTS servisleri boylece
      // gereksiz yere key isteyen bir proxy'ye takilip kalirdi.
      ...__privateGet$3(this, _apiKey$1) ? { apiKey: __privateGet$3(this, _apiKey$1) } : {},
      // basemap KASITLI OLARAK burada verilmiyor (bkz asagidaki _syncBasemap()
      // cagrisi) -- HGM altliklari icin apiKey dogrulanmadan hicbir karo istegi
      // atilmasin diye (bkz HGM_GATED_BASEMAP_IDS).
      timeline: false,
      animation: false,
      geocoder: false,
      homeButton: false,
      sceneModePicker: false,
      navigationHelpButton: false,
      infoBox: false,
      selectionIndicator: false,
      fullscreenButton: false
    });
    this._mapInstance.setMode(this.mode);
    this._mapInstance.setQuality(75);
    this._mapInstance.viewer.scene.globe.baseColor = Color.fromCssColorString("#f4f4f4");
    this._resizeObserver = new ResizeObserver(() => {
      var _a2, _b;
      (_a2 = this._mapInstance) == null ? void 0 : _a2.resize();
      (_b = this._mapInstance) == null ? void 0 : _b.setExtent(DEFAULT_INITIAL_EXTENT);
    });
    this._resizeObserver.observe(container);
    this._unregisterApiKeyRefresh = registerApiKeyRefresh(() => {
      void this._syncBasemap();
    });
    void this._syncBasemap();
    void this._syncLayer();
  }
  _deactivate() {
    var _a2, _b, _c;
    this._active = false;
    (_a2 = this._resizeObserver) == null ? void 0 : _a2.disconnect();
    this._resizeObserver = void 0;
    (_b = this._unregisterApiKeyRefresh) == null ? void 0 : _b.call(this);
    this._unregisterApiKeyRefresh = void 0;
    (_c = this._mapInstance) == null ? void 0 : _c.destroy();
    this._mapInstance = null;
    this._currentLayerId = void 0;
  }
  // === Basemap senkronizasyonu ===
  // basemap uygulamanin TEK noktasi -- hem ilk mount'ta (_mountMap) hem de
  // runtime'da basemap property'si degisince (updated()) buradan gecer.
  // HGM_GATED_BASEMAP_IDS'te olmayan (acik/custom) bir basemap icin apiKey
  // dogrulamasi hic yapilmaz, dogrudan uygulanir. Gated bir HGM id'si icin
  // ensureEffectiveApiKeyValid() ile instance-veya-global apiKey birlikte
  // cozulup dogrulanir (TucbsMap._prepareMap() ile ayni mekanizma) --
  // basarisizsa hicbir karo istegi atilmadan _basemapBlocked true'ya cekilir
  // (bkz render()'daki gosterge).
  async _syncBasemap() {
    const map = this._mapInstance;
    if (!map) return;
    if (!HGM_GATED_BASEMAP_IDS.has(this.basemap)) {
      this._basemapBlocked = false;
      map.setBasemap(this.basemap);
      return;
    }
    try {
      await ensureEffectiveApiKeyValid(
        __privateGet$3(this, _apiKey$1) || void 0,
        getUcbpApiBase()
      );
    } catch (err) {
      const noKeyAnywhere = err instanceof ApiKeyValidationError && err.reason === "missing-key";
      const spec = this.layerOptions ?? this.layer;
      const url = spec ? spec.options.url : void 0;
      const layerIsOpen = !!spec && (!url || !map.layerManager.layerRequiresApiKey(url));
      this._basemapBlocked = !(noKeyAnywhere && layerIsOpen);
      map.setBasemap(null);
      return;
    }
    this._basemapBlocked = false;
    map.setBasemap(this.basemap);
  }
  async _syncLayer() {
    const map = this._mapInstance;
    if (!map) return;
    const generation = this._syncGeneration.next();
    const previousLayerId = this._currentLayerId;
    const spec = this.layerOptions ?? this.layer;
    if (!spec) {
      this._loading = false;
      if (previousLayerId) map.layerManager.removeLayer(previousLayerId);
      this._currentLayerId = void 0;
      map.setExtent(DEFAULT_INITIAL_EXTENT);
      return;
    }
    this._loading = true;
    try {
      const managed = await this._addLayer(map, spec);
      if (!this._syncGeneration.isCurrent(generation)) {
        map.layerManager.removeLayer(managed.id);
        return;
      }
      this._currentLayerId = managed.id;
      if (this.zoomToLayer && !isGloballyExtentedLayer(managed)) {
        const zoomed = await map.layerManager.zoomToLayer(managed.id).catch(() => false);
        if (!zoomed) map.setExtent(DEFAULT_INITIAL_EXTENT);
      } else {
        map.setExtent(DEFAULT_INITIAL_EXTENT);
      }
      if (IMAGERY_LAYER_TYPES.has(spec.layerType)) {
        await this._waitForTilesLoaded(map);
        if (!this._syncGeneration.isCurrent(generation)) return;
      }
      if (previousLayerId && previousLayerId !== this._currentLayerId) {
        map.layerManager.removeLayer(previousLayerId);
      }
    } finally {
      if (this._syncGeneration.isCurrent(generation)) this._loading = false;
    }
  }
  // globe.tilesLoaded, o anki kamera goruntusu icin (basemap + tum imagery
  // katmanlari dahil) bekleyen karo kalmadiginda true olur. Sonsuza kadar
  // beklememek icin (orn. kirik/yavas bir demo sunucusu) bir guvenlik
  // zaman asimi da var.
  _waitForTilesLoaded(map, timeoutMs = 5e3) {
    return new Promise((resolve) => {
      const globe = map.viewer.scene.globe;
      if (globe.tilesLoaded) {
        resolve();
        return;
      }
      let settled = false;
      const finish = () => {
        if (settled) return;
        settled = true;
        globe.tileLoadProgressEvent.removeEventListener(onProgress);
        clearTimeout(timer);
        resolve();
      };
      const onProgress = (pending) => {
        if (pending === 0) finish();
      };
      globe.tileLoadProgressEvent.addEventListener(onProgress);
      const timer = setTimeout(finish, timeoutMs);
    });
  }
  async _addLayer(map, spec) {
    switch (spec.layerType) {
      case "WMS":
        return map.layerManager.add("WMS", spec.options);
      case "WMTS":
        return map.layerManager.add("WMTS", spec.options);
      case "WFS":
        return map.layerManager.add("WFS", spec.options);
      case "WCS":
        return map.layerManager.add("WCS", spec.options);
      case "GEOTIFF":
        return map.layerManager.add(
          "GEOTIFF",
          spec.options
        );
      case "GEOJSON":
      case "KML":
      case "KMZ":
      case "SHP":
      case "CSV":
        return map.layerManager.add(
          spec.layerType,
          spec.options
        );
      case "XYZ":
        throw new LayerOperationError(
          "LAYER_PREVIEW_UNSUPPORTED_XYZ",
          "TucbsMapPreview: XYZ katmani onizlemede desteklenmiyor."
        );
      case "DRAWING":
        throw new LayerOperationError(
          "LAYER_PREVIEW_UNSUPPORTED_DRAWING",
          "TucbsMapPreview: DRAWING katmani onizlemede desteklenmiyor."
        );
      case "MEASURE":
        throw new LayerOperationError(
          "LAYER_PREVIEW_UNSUPPORTED_MEASURE",
          "TucbsMapPreview: MEASURE katmani onizlemede desteklenmiyor."
        );
    }
  }
  _zoomIn() {
    var _a2;
    const viewer = (_a2 = this._mapInstance) == null ? void 0 : _a2.viewer;
    if (!viewer) return;
    zoomInProportional(
      viewer.camera,
      TucbsMapPreview.ZOOM_STEP_RATIO,
      viewer.scene.screenSpaceCameraController.minimumZoomDistance
    );
  }
  _zoomOut() {
    var _a2;
    const viewer = (_a2 = this._mapInstance) == null ? void 0 : _a2.viewer;
    if (!viewer) return;
    zoomOutProportional(
      viewer.camera,
      TucbsMapPreview.ZOOM_STEP_RATIO,
      viewer.scene.screenSpaceCameraController.maximumZoomDistance
    );
  }
  /** Bileşenin şablonunu render eder: önizleme kutusu, zoom butonları, yükleniyor/basemap-engellendi overlay'leri. */
  render() {
    return b`
      ${mapPreviewStyles}
      <div
        class="preview-box"
        style="width: ${this.width}; height: ${this.height};"
      >
        ${this._active ? b`
              ${this.showZoomButtons ? b`
                    <div class="zoom-controls">
                      <button
                        class="zoom-button"
                        type="button"
                        aria-label="Yakınlaştır"
                        @click=${this._zoomIn}
                      >
                        ${ICON_ZOOM_IN$3}
                      </button>
                      <button
                        class="zoom-button"
                        type="button"
                        aria-label="Uzaklaştır"
                        @click=${this._zoomOut}
                      >
                        ${ICON_ZOOM_OUT$1}
                      </button>
                    </div>
                  ` : null}
              <div id="${this.hostId}-host" class="map-host"></div>
              ${this._loading ? b`<div class="loading-overlay">
                    <div class="spinner"></div>
                  </div>` : null}
              ${!this._loading && this._basemapBlocked ? b`<div class="basemap-blocked-overlay" role="alert">
                    <div class="basemap-blocked-overlay__panel">
                      <p class="basemap-blocked-overlay__title">API Anahtarı Eksik</p>
                      <p class="basemap-blocked-overlay__msg">
                        Bu altlık harita için geçerli bir apiKey gereklidir.
                      </p>
                    </div>
                  </div>` : null}
            ` : b`<div class="placeholder"></div>`}
      </div>
    `;
  }
};
_apiKey$1 = /* @__PURE__ */ new WeakMap();
TucbsMapPreview.ZOOM_STEP_RATIO = 0.5;
__decorateClass$A([
  n$1({ attribute: "api-key" })
], TucbsMapPreview.prototype, "apiKey", 1);
__decorateClass$A([
  n$1()
], TucbsMapPreview.prototype, "basemap", 2);
__decorateClass$A([
  n$1()
], TucbsMapPreview.prototype, "mode", 2);
__decorateClass$A([
  n$1()
], TucbsMapPreview.prototype, "width", 2);
__decorateClass$A([
  n$1()
], TucbsMapPreview.prototype, "height", 2);
__decorateClass$A([
  n$1({ type: Object })
], TucbsMapPreview.prototype, "layer", 2);
__decorateClass$A([
  n$1({ type: Object, attribute: "layer-options" })
], TucbsMapPreview.prototype, "layerOptions", 2);
__decorateClass$A([
  n$1({ attribute: "show-zoom-buttons", converter: defaultTrueAttribute })
], TucbsMapPreview.prototype, "showZoomButtons", 2);
__decorateClass$A([
  n$1({ type: Boolean, attribute: "zoom-to-layer" })
], TucbsMapPreview.prototype, "zoomToLayer", 2);
__decorateClass$A([
  r()
], TucbsMapPreview.prototype, "_active", 2);
__decorateClass$A([
  r()
], TucbsMapPreview.prototype, "_mapInstance", 2);
__decorateClass$A([
  r()
], TucbsMapPreview.prototype, "_loading", 2);
__decorateClass$A([
  r()
], TucbsMapPreview.prototype, "_basemapBlocked", 2);
TucbsMapPreview = __decorateClass$A([
  t$3("tucbs-map-preview")
], TucbsMapPreview);
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { I: t2 } = j, i$1 = (o2) => o2, s$1 = () => document.createComment(""), v = (o2, n3, e3) => {
  var _a2;
  const l2 = o2._$AA.parentNode, d2 = void 0 === n3 ? o2._$AB : n3._$AA;
  if (void 0 === e3) {
    const i4 = l2.insertBefore(s$1(), d2), n4 = l2.insertBefore(s$1(), d2);
    e3 = new t2(i4, n4, o2, o2.options);
  } else {
    const t3 = e3._$AB.nextSibling, n4 = e3._$AM, c2 = n4 !== o2;
    if (c2) {
      let t4;
      (_a2 = e3._$AQ) == null ? void 0 : _a2.call(e3, o2), e3._$AM = o2, void 0 !== e3._$AP && (t4 = o2._$AU) !== n4._$AU && e3._$AP(t4);
    }
    if (t3 !== d2 || c2) {
      let o3 = e3._$AA;
      for (; o3 !== t3; ) {
        const t4 = i$1(o3).nextSibling;
        i$1(l2).insertBefore(o3, d2), o3 = t4;
      }
    }
  }
  return e3;
}, u$2 = (o2, t3, i4 = o2) => (o2._$AI(t3, i4), o2), m = {}, p = (o2, t3 = m) => o2._$AH = t3, M = (o2) => o2._$AH, h = (o2) => {
  o2._$AR(), o2._$AA.remove();
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const u$1 = (e3, s2, t3) => {
  const r2 = /* @__PURE__ */ new Map();
  for (let l2 = s2; l2 <= t3; l2++) r2.set(e3[l2], l2);
  return r2;
}, c = e$2(class extends i$2 {
  constructor(e3) {
    if (super(e3), e3.type !== t$2.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(e3, s2, t3) {
    let r2;
    void 0 === t3 ? t3 = s2 : void 0 !== s2 && (r2 = s2);
    const l2 = [], o2 = [];
    let i4 = 0;
    for (const s3 of e3) l2[i4] = r2 ? r2(s3, i4) : i4, o2[i4] = t3(s3, i4), i4++;
    return { values: o2, keys: l2 };
  }
  render(e3, s2, t3) {
    return this.dt(e3, s2, t3).values;
  }
  update(s2, [t3, r2, c2]) {
    const d2 = M(s2), { values: p$12, keys: a2 } = this.dt(t3, r2, c2);
    if (!Array.isArray(d2)) return this.ut = a2, p$12;
    const h$12 = this.ut ?? (this.ut = []), v$12 = [];
    let m2, y3, x2 = 0, j2 = d2.length - 1, k2 = 0, w2 = p$12.length - 1;
    for (; x2 <= j2 && k2 <= w2; ) if (null === d2[x2]) x2++;
    else if (null === d2[j2]) j2--;
    else if (h$12[x2] === a2[k2]) v$12[k2] = u$2(d2[x2], p$12[k2]), x2++, k2++;
    else if (h$12[j2] === a2[w2]) v$12[w2] = u$2(d2[j2], p$12[w2]), j2--, w2--;
    else if (h$12[x2] === a2[w2]) v$12[w2] = u$2(d2[x2], p$12[w2]), v(s2, v$12[w2 + 1], d2[x2]), x2++, w2--;
    else if (h$12[j2] === a2[k2]) v$12[k2] = u$2(d2[j2], p$12[k2]), v(s2, d2[x2], d2[j2]), j2--, k2++;
    else if (void 0 === m2 && (m2 = u$1(a2, k2, w2), y3 = u$1(h$12, x2, j2)), m2.has(h$12[x2])) if (m2.has(h$12[j2])) {
      const e3 = y3.get(a2[k2]), t4 = void 0 !== e3 ? d2[e3] : null;
      if (null === t4) {
        const e4 = v(s2, d2[x2]);
        u$2(e4, p$12[k2]), v$12[k2] = e4;
      } else v$12[k2] = u$2(t4, p$12[k2]), v(s2, d2[x2], t4), d2[e3] = null;
      k2++;
    } else h(d2[j2]), j2--;
    else h(d2[x2]), x2++;
    for (; k2 <= w2; ) {
      const e3 = v(s2, v$12[w2 + 1]);
      u$2(e3, p$12[k2]), v$12[k2++] = e3;
    }
    for (; x2 <= j2; ) {
      const e3 = d2[x2++];
      null !== e3 && h(e3);
    }
    return this.ut = a2, p(s2, v$12), E;
  }
});
function applyCustomCss(shadowRoot, cssText, state, loggerLabel) {
  if (!shadowRoot) return;
  if (!cssText) {
    if (state.sheet) {
      const sheet = state.sheet;
      shadowRoot.adoptedStyleSheets = shadowRoot.adoptedStyleSheets.filter(
        (s2) => s2 !== sheet
      );
    }
    return;
  }
  if (!state.sheet) {
    state.sheet = new CSSStyleSheet();
    shadowRoot.adoptedStyleSheets = [
      ...shadowRoot.adoptedStyleSheets,
      state.sheet
    ];
  }
  try {
    state.sheet.replaceSync(cssText);
  } catch (error) {
    console.warn(`[${loggerLabel}] customCss gecersiz CSS iceriyor:`, error);
  }
}
function syncVirtualScrollbar(list, thumb) {
  const { scrollHeight, clientHeight, scrollTop } = list;
  const scrollableDistance = scrollHeight - clientHeight;
  if (scrollableDistance <= 1) {
    thumb.style.display = "none";
    return;
  }
  thumb.style.display = "block";
  const thumbHeight = Math.max(24, clientHeight / scrollHeight * clientHeight);
  const maxThumbTop = clientHeight - thumbHeight;
  const thumbTop = scrollTop / scrollableDistance * maxThumbTop;
  thumb.style.height = `${thumbHeight}px`;
  thumb.style.top = `${thumbTop}px`;
}
function startVirtualScrollbarDrag(event, list, onDragEnd) {
  const noop = () => {
  };
  if (event.button !== 0) return noop;
  event.preventDefault();
  const thumb = event.currentTarget;
  const thumbRect = thumb.getBoundingClientRect();
  const dragOffsetY = event.clientY - thumbRect.top;
  const onMove = (moveEvent) => {
    const listRect = list.getBoundingClientRect();
    const maxThumbTop = list.clientHeight - thumb.offsetHeight;
    if (maxThumbTop <= 0) return;
    const rawTop = moveEvent.clientY - listRect.top - dragOffsetY;
    const clampedTop = Math.min(Math.max(rawTop, 0), maxThumbTop);
    const scrollableDistance = list.scrollHeight - list.clientHeight;
    list.scrollTop = clampedTop / maxThumbTop * scrollableDistance;
  };
  const stop = (endEvent) => {
    thumb.removeEventListener("pointermove", onMove);
    thumb.removeEventListener("pointerup", onEnd);
    thumb.removeEventListener("pointercancel", onEnd);
    if (endEvent && thumb.hasPointerCapture(endEvent.pointerId)) {
      thumb.releasePointerCapture(endEvent.pointerId);
    }
    onDragEnd == null ? void 0 : onDragEnd();
  };
  const onEnd = (endEvent) => stop(endEvent);
  thumb.setPointerCapture(event.pointerId);
  thumb.addEventListener("pointermove", onMove);
  thumb.addEventListener("pointerup", onEnd);
  thumb.addEventListener("pointercancel", onEnd);
  return () => stop();
}
class VirtualScrollbar {
  constructor(host, getList, getThumb) {
    this.host = host;
    this.getList = getList;
    this.getThumb = getThumb;
    this._stopDrag = null;
    host.addController(this);
  }
  hostDisconnected() {
    var _a2;
    (_a2 = this._stopDrag) == null ? void 0 : _a2.call(this);
    this._stopDrag = null;
  }
  /** Thumb'ın top/height'ini listenin güncel scroll durumuna göre yeniden hesaplar. */
  sync() {
    const list = this.getList();
    const thumb = this.getThumb();
    if (!list || !thumb) return;
    syncVirtualScrollbar(list, thumb);
  }
  /** Thumb üzerinde `pointerdown` ile tetiklenir; sürüklemeyi başlatır. */
  startDrag(event) {
    const list = this.getList();
    if (!list) return;
    this._stopDrag = startVirtualScrollbarDrag(event, list, () => {
      this._stopDrag = null;
    });
  }
}
class DraggablePanelController {
  /**
   * @param host - Controller'ın bağlanacağı Lit bileşeni; DOM'dan kaldırılınca süren sürükleme iptal edilir.
   * @param options - Sürüklenecek panel, sürüklemeyi başlatmayan elemanlar ve hareket geri çağrısı.
   */
  constructor(host, options) {
    this.options = options;
    this._header = null;
    this._panel = null;
    this._offset = null;
    this._move = (event) => {
      var _a2, _b;
      if (!this._offset || !this._panel) return;
      this._panel.style.left = `${event.clientX - this._offset.x}px`;
      this._panel.style.top = `${event.clientY - this._offset.y}px`;
      (_b = (_a2 = this.options).onMove) == null ? void 0 : _b.call(_a2);
    };
    this._end = (event) => {
      const header = event.currentTarget;
      header.removeEventListener("pointermove", this._move);
      header.removeEventListener("pointerup", this._end);
      header.removeEventListener("pointercancel", this._end);
      if (header.hasPointerCapture(event.pointerId)) header.releasePointerCapture(event.pointerId);
      this._reset();
    };
    host.addController(this);
  }
  /** Lit yaşam döngüsü: host DOM'dan kaldırılınca süren sürüklemeyi iptal eder (bkz {@link cancel}). */
  hostDisconnected() {
    this.cancel();
  }
  /**
   * Başlığın `pointerdown` olayında çağrılır; sol tık değilse veya `ignoreSelector`'e uyan bir elemandan başladıysa yok sayılır.
   * @param event - Başlık elemanında (`currentTarget`) yakalanan `pointerdown` olayı.
   */
  start(event) {
    if (event.button !== 0) return;
    if (event.target.closest(this.options.ignoreSelector)) return;
    const header = event.currentTarget;
    const panel = this.options.getPanel(header);
    if (!panel) return;
    const rect = panel.getBoundingClientRect();
    panel.style.left = `${rect.left}px`;
    panel.style.top = `${rect.top}px`;
    panel.style.transform = "none";
    this._header = header;
    this._panel = panel;
    this._offset = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    header.setPointerCapture(event.pointerId);
    header.addEventListener("pointermove", this._move);
    header.addEventListener("pointerup", this._end);
    header.addEventListener("pointercancel", this._end);
  }
  /**
   * Süren sürüklemenin durumunu sıfırlar ve başlık dinleyicilerini kaldırır (sürükleme yoksa bir şey yapmaz).
   */
  cancel() {
    this._removeListeners();
    this._reset();
  }
  _removeListeners() {
    var _a2, _b, _c;
    (_a2 = this._header) == null ? void 0 : _a2.removeEventListener("pointermove", this._move);
    (_b = this._header) == null ? void 0 : _b.removeEventListener("pointerup", this._end);
    (_c = this._header) == null ? void 0 : _c.removeEventListener("pointercancel", this._end);
  }
  _reset() {
    this._header = null;
    this._panel = null;
    this._offset = null;
  }
}
const styleEditorStyles = i$6`
  :host {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1100;
    display: block;
    font-family: "IBM Plex Sans", system-ui, sans-serif;
    font-size: 0.875rem;
    color: var(--cds-text-primary, #161616);
    /* suppress Carbon's blue focus ring inside the panel */
    --cds-focus: transparent;
    /* Bu proje Carbon'un tema CSS'ini yuklemiyor; dropdown/slider/checkbox/
       text-input bu token'lari fallback'siz kullaniyor. TucbsServiceUpload'daki
       ile ayni "white" tema degerleriyle burada da sabitliyoruz. */
    --cds-field: #f4f4f4;
    --cds-field-hover: #e8e8e8;
    --cds-layer: #ffffff;
    --cds-layer-hover: #e8e8e8;
    --cds-layer-background: #ffffff;
    --cds-layer-selected: #e0e0e0;
    --cds-layer-selected-hover: #d1d1d1;
    --cds-border-subtle: #e0e0e0;
    --cds-border-strong: #8d8d8d;
    --cds-layout-density-padding-inline-local: 1rem;
    --cds-layout-size-height-local: 2.5rem;
  }

  :host([hidden]) {
    display: none;
  }

  .panel {
    background: #ffffff;
    border: 1px solid var(--cds-border-subtle, #e0e0e0);
    border-radius: 4px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    width: fit-content;
  }

  .header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid var(--cds-border-subtle, #e0e0e0);
    cursor: move;
    user-select: none;
    touch-action: none;
  }

  .header-title-group {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    min-width: 0;
  }

  .header-icon {
    display: inline-flex;
    flex: none;
    color: #0f62fe;
    margin-top: 0.125rem;
  }

  .header-text {
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
    min-width: 0;
  }

  .title {
    font-weight: 600;
  }

  .subtitle {
    max-width: 320px;
    color: var(--cds-text-secondary, #525252);
    font-size: 0.75rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .close-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    flex: none;
    border: none;
    border-radius: 4px;
    background: transparent;
    color: var(--cds-icon-secondary, #6f6f6f);
    cursor: pointer;
  }

  .close-btn:hover {
    background: var(--cds-layer-hover-01, #f4f4f4);
    color: var(--cds-icon-primary, #161616);
  }

  .body {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }

  /* "Dolgu" ve "Dis Hat" kartlari yan yana; her biri kendi icerigine gore
     genislikte (flex row'da flex-grow verilmedigi icin varsayilan olarak
     icerige sarilir). */
  /* align-items:stretch (varsayilan) ile Dis Hat karti, daha az alan
     icerdigi icin Dolgu kartinin (daha yuksek) hizasina esitlenir. */
  .style-cards {
    display: flex;
    gap: 1rem;
  }

  .section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
  }

  .section-header-title {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    font-weight: 600;
  }

  .section-header-icon {
    display: inline-flex;
    color: #8a3ffc;
  }

  .reset-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.375rem 0.75rem;
    border: 1px solid var(--cds-border-strong, #8d8d8d);
    border-radius: 999px;
    background: transparent;
    color: var(--cds-text-primary, #161616);
    font: inherit;
    font-size: 0.75rem;
    cursor: pointer;
  }

  .reset-btn:hover {
    background: var(--cds-layer-hover-01, #f4f4f4);
  }

  .card {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: 1rem;
    border: 1px solid var(--cds-border-subtle, #e0e0e0);
    border-radius: 8px;
  }

  .card-title {
    font-weight: 600;
  }

  /* Kart basligi: solda baslik, sagda (varsa) ac/kapa anahtari. */
  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    min-height: 1.5rem;
  }

  /* Kart govdesi: kart gibi dikey, ayni aralikli; anahtar kapaliyken (inert) soluk ve etkilesimsiz. */
  .card-body {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .card-body[inert] {
    opacity: 0.45;
  }

  /* Bu proje Carbon'un tema CSS'ini yuklemiyor; anahtarin acik/kapali renkleri burada. */
  /* Anahtar kutusu, icindeki bos durum yazisi satiri yuzunden anahtardan (16px) 3px uzundu ve
     anahtar basliga gore ~1,5px yukarida kaliyordu; kutuyu anahtar yuksekligine sabitleyerek
     baslikla ayni dikey merkeze oturtuyoruz. */
  /* Baslik metni, ortalanmis kutuda anahtarin gorsel merkezine gore biraz asagida
     algilaniyordu (kullanici geri bildirimi); 1px yukari alinir. */
  .card-header .card-title {
    transform: translateY(-1px);
  }

  .card-header cds-toggle {
    display: block;
    block-size: 1rem;
    flex: none;
  }

  cds-toggle {
    --cds-toggle-off: #8d8d8d;
    --cds-support-success: #0f62fe;
    --cds-icon-on-color: #ffffff;
    --cds-focus: #0f62fe;
  }

  /* Carbon'un kendi form etiketlerinde kullandigi varsayilan bosluk
     (.cds--label { margin-block-end: .5rem }) ile tutarli olmasi icin
     8px. */
  .field-label {
    display: block;
    margin-bottom: 0.5rem;
    color: var(--cds-text-secondary, #525252);
    font-size: 0.75rem;
  }

  /* Dolgu ve Dis Hat "Renk" kutulari (ayni .color-swatch class'ini
     paylasirlar) sabit 222px — kartlar artik icerige gore boyutlandigi
     (fit-content) icin yuzdelik genislik yerine sabit deger kullanilir;
     bu ayni zamanda Dolgu ve Dis Hat kartlarinin birebir ayni genislikte
     olmasini saglar. */
  .color-swatch {
    position: relative;
    display: block;
    width: 222px;
    box-sizing: border-box;
    height: 32px;
    border: none;
    border-radius: 0;
    overflow: hidden;
    cursor: pointer;
  }

  .color-swatch input[type="color"] {
    position: absolute;
    inset: -4px;
    width: calc(100% + 8px);
    height: calc(100% + 8px);
    border: none;
    cursor: pointer;
  }

  /* Bu proje Carbon'un tema/reset CSS'ini yuklemiyor; "Renk Modu" dropdown'i
     host tarayicida varsayilan "inline" kalabiliyor, bu durumda width sabiti
     etkisiz kalir. Layout'un ongorulebilir olmasi icin display'i acikca
     "block" olarak sabitliyoruz. Diger alanlarla (Renk/Opaklik/Genislik)
     ayni sabit genislikte. */
  cds-dropdown {
    display: block;
    width: 222px;
    box-sizing: border-box;
  }

  /* cds-slider (Carbon Web Component) surukleme sirasinda her hareket
     tikinde tam bir Lit re-render'i (kendi ic reaktivitesiyle birlikte)
     tetikleyip takilmaya/gecikmeye yol aciyordu. TucbsLayerList'teki
     katman opaklik bar'i ile AYNI yaklasima geciliyor: duz native
     <input type="range">, --fill CSS custom property'si ile aninda
     (Lit'e hic ugramadan) gorsel guncelleme, gercek state guncellemesi
     ise requestAnimationFrame ile throttle ediliyor (bkz. _setFillOpacity).
     Bu yontem referans alinan yerde kusursuz calisiyor. */
  .opacity-slider {
    display: block;
    width: 222px;
    height: 4px;
    margin: 0;
    appearance: none;
    border-radius: 2px;
    background: linear-gradient(
      to right,
      var(--cds-interactive, #0f62fe) 0%,
      var(--cds-interactive, #0f62fe) var(--fill, 100%),
      var(--cds-border-subtle, #e0e0e0) var(--fill, 100%),
      var(--cds-border-subtle, #e0e0e0) 100%
    );
  }

  .opacity-slider::-webkit-slider-thumb {
    width: 12px;
    height: 12px;
    appearance: none;
    border-radius: 50%;
    background: var(--cds-interactive, #0f62fe);
    cursor: pointer;
  }

  .opacity-slider::-moz-range-thumb {
    width: 12px;
    height: 12px;
    border: none;
    border-radius: 50%;
    background: var(--cds-interactive, #0f62fe);
    cursor: pointer;
  }

  cds-text-input {
    display: block;
    width: 222px;
    box-sizing: border-box;
  }

  cds-number-input {
    display: block;
    width: 222px;
    box-sizing: border-box;
  }

  cds-checkbox {
    margin-top: 10px;
  }

  /* Sembol/cizgi tipi listeleri kisa ve sabit (6 / 5 oge): Carbon'un "sm" menu
     yukseklik siniri (11rem) 6 ogeyi (12rem) kirpip dikey kaydirma cubugu
     cikariyordu. Menu govdesi shadow DOM'da; ::part(menu-body) ile sinir
     kaldirilir. Uzun listeler (palet, renk modu) icin SINIR KALIR. */
  .no-scroll-dropdown::part(menu-body) {
    max-block-size: none;
    overflow-y: visible;
  }

  .palette-swatch {
    display: block;
    width: 100%;
    height: 20px;
    border-radius: 2px;
  }

  /* cds-dropdown kapaliyken secili item'in textContent'ini gosterir; renk
     paleti item'larinin metni olmadigi icin (sadece renk bar'i) kapali
     kutu bos gorunuyordu. Secili paletin rengini kapali kutunun TAMAMININ
     (chevron dahil, ok gorunmesin) uzerine bindirerek "hangi renk secili"
     gorsel olarak gosteriliyor; tiklamalar pointer-events:none sayesinde
     asagidaki gercek dropdown'a geçiyor, acilip secim yapilabiliyor. */
  .palette-dropdown-wrap {
    position: relative;
    /* Bu div genislik belirtmeyen duz bir kapsayici oldugu icin satirin
       (kartin gerdigi) tam genisligine yayiliyordu, oysa icindeki
       cds-dropdown sabit 222px'ti; bu fark, ustteki renk onizlemesinin
       (inset:1px, wrap'a gore konumlanan) dropdown'in gercek sag kenarindan
       disari tasmasina yol aciyordu. Wrap'i da dropdown ile aynı sabit
       genislige kilitliyoruz. */
    width: 222px;
  }

  .palette-selected-preview {
    position: absolute;
    top: 1px;
    left: 1px;
    right: 1px;
    bottom: 1px;
    border-radius: 2px;
    pointer-events: none;
  }

  /* Kategorik (Enum) "Degerler" listesi -- artik kendi bagimsiz kartinda
     (bkz. render()'daki categoryValuesCard), Dolgu'nun ICINDE degil.
     TucbsServiceUpload'daki .discovered-list-wrap/.discovered-list/
     .scroll-thumb ile AYNI ozel scroll-thumb deseni (bkz o dosyadaki
     yorumlar). Burada panel icerige gore boyutlandigi (fit-content) icin
     ustteki gibi "kalan yuksekligi doldur" (flex+absolute inset) yerine
     SABIT bir max-height yeterli. */
  .category-values-wrap {
    position: relative;
    /* Diger tum alanlarla (Renk/Opaklik/Genislik/Dropdown) AYNI sabit
       genislik -- kendi bagimsiz kartinda oldugu icin ARTIK onu genislige
       zorlayan baska sabit-genislikli kardes eleman yok; bu olmadan uzun
       ulke isimleri (orn. "Birlesik Arap Emirlikleri") karti gereksiz
       yere genisletip ellipsis'i hic tetiklemezdi. */
    width: 222px;
  }

  .category-values-list {
    /* Ayni anda TAM 10 satir gorunsun (kullanici istegi -- Degerler artik
       kendi bagimsiz kartinda oldugu icin Dolgu/Dis Hat'i asiri
       uzatmadan daha fazla satira yer var): her satirin yuksekligi
       swatch'in yuksekligiyle (28px, bkz asagidaki .color-swatch inline
       override) sabit, satirlar arasi bosluk 0.5rem (10 satir -> 9 ara
       bosluk) -- bkz asagidaki ic <div style="gap:0.5rem"> sarmalayici. */
    max-height: calc(10 * 28px + 9 * 0.5rem);
    overflow-y: auto;
    scrollbar-width: none;
    padding-right: 0.75rem;
  }

  .category-values-list::-webkit-scrollbar {
    display: none;
  }

  .category-scroll-thumb {
    position: absolute;
    top: 0;
    right: 2px;
    width: 6px;
    border-radius: 3px;
    background: var(--cds-border-strong, #8d8d8d);
    cursor: grab;
    touch-action: none;
    display: none;
  }

  .category-scroll-thumb:active {
    cursor: grabbing;
    background: var(--cds-icon-primary, #161616);
  }

  /* Surekli (Gradient) ve Kesikli (Bin) Lejant karti -- TucbsLegendPanel'in
     .legend-bin-row/.legend-swatch/.legend-value ile AYNI isimlendirme
     (kavramsal olarak aynı lejant), ama bu diyalogun .card/.field-label
     diline uyacak sekilde yeniden stillendirildi -- o bilesen ayri bir
     katman-listesi paneli icin tasarlanmisti, buraya oldugu gibi
     gomulmesi gorsel tutarsizlik yaratirdi. Gradient'te ARTIK duz bir bar
     + iki uc etiket YOK -- referans uygulamadaki gibi (bkz kullanici
     bildirimi) esit araliklı, TEK degerli ornek satirlari (Bin ile AYNI
     .legend-bin-row/.legend-bin-list gorsel dili) kullanilir. */

  /* Bin/Gradient Lejant listesinin sarmalayicisi -- Dolgu/Dis Hat'taki TUM
     alanlarla (Renk/Opaklik/Genislik/Dropdown) AYNI sabit 222px genislik,
     boylece Lejant karti da o kartlarla ayni genislikte olur (bkz
     kullanici bildirimi: Bin'de kartin genisligi icerige gore -- en uzun
     deger araligi metnine gore -- degisiyordu). Kategorik "Degerler"
     listesindeki (.category-values-wrap/.category-values-list/
     .category-scroll-thumb, o da TucbsServiceUpload'daki
     .discovered-list-wrap ile AYNI desen) AYNI ozel scroll-thumb deseni --
     native scrollbar tamamen gizli, gorunen gostergeyi JS ile kendimiz
     ciziyoruz (bkz _legendScroll / shared/ui/VirtualScrollbar.ts). Sürekli (Gradient) HER ZAMAN
     sabit GRADIENT_LEGEND_STEPS (7) satir gosterdiginden bu tavana asla
     ulasmaz; Kesikli (Bin) ise Bin Sayisi alaniyla 100'e kadar
     cikabildiginden 10'dan fazla satirda (bkz kullanici bildirimi)
     scroll'a duser. */
  .legend-bin-wrap {
    position: relative;
    width: 222px;
  }

  .legend-bin-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    /* Ayni anda TAM 10 satir gorunsun: her satirin yuksekligi swatch'in
       yuksekligiyle (16px) sabit, satirlar arasi bosluk 0.5rem (10 satir
       -> 9 ara bosluk). */
    max-height: calc(10 * 16px + 9 * 0.5rem);
    overflow-y: auto;
    scrollbar-width: none;
    padding-right: 0.75rem;
  }

  .legend-bin-list::-webkit-scrollbar {
    display: none;
  }

  .legend-scroll-thumb {
    position: absolute;
    top: 0;
    right: 2px;
    width: 6px;
    border-radius: 3px;
    background: var(--cds-border-strong, #8d8d8d);
    cursor: grab;
    touch-action: none;
    display: none;
  }

  .legend-scroll-thumb:active {
    cursor: grabbing;
    background: var(--cds-icon-primary, #161616);
  }

  .legend-bin-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .legend-swatch {
    flex: none;
    width: 16px;
    height: 16px;
    border-radius: 2px;
  }

  .legend-value {
    color: var(--cds-text-primary, #161616);
    font-size: 0.875rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;
var __defProp$y = Object.defineProperty;
var __getOwnPropDesc$z = Object.getOwnPropertyDescriptor;
var __decorateClass$z = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$z(target, key) : target;
  for (var i4 = decorators.length - 1, decorator; i4 >= 0; i4--)
    if (decorator = decorators[i4])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$y(target, key, result);
  return result;
};
let TucbsServiceStyleCard = class extends i$3 {
  constructor() {
    super(...arguments);
    this.layerId = "";
    this.layerType = "";
    this.requestId = 0;
    this._serviceStyles = [];
    this._serviceStylesLoading = false;
    this._serviceStylesError = "";
    this._selectedServiceStyle = "";
    this._loadGeneration = new AsyncGeneration();
  }
  // willUpdate() (updated() DEGIL) -- _loadServiceStyles() senkron olarak
  // _serviceStylesLoading gibi reactive property'leri hemen yaziyor; bunu
  // updated() icinde yapmak Lit'in "scheduled an update after an update
  // completed" dev-mode uyarisina yol aciyordu (bkz. lit.dev/msg/change-in-update).
  // willUpdate() render'dan ONCE calistigi icin bu degisiklikler AYNI
  // guncelleme dongusune dahil olur, ekstra bir donguye gerek kalmaz.
  /** `layerId`/`layerType`/`layerManager` değiştiğinde sunucu stillerini yeniden sorgular. */
  willUpdate(changed) {
    if (changed.has("layerId") || changed.has("layerType") || changed.has("layerManager") || changed.has("requestId")) {
      void this._loadServiceStyles();
    }
  }
  async _loadServiceStyles() {
    var _a2;
    const generation = this._loadGeneration.next();
    if (!this.layerManager || !this.layerId) return;
    this._serviceStylesLoading = true;
    this._serviceStylesError = "";
    try {
      const styles = this.layerType === "WMS" ? await this.layerManager.getWmsAvailableStyles(this.layerId) : await this.layerManager.getWmtsAvailableStyles(this.layerId);
      if (!this._loadGeneration.isCurrent(generation)) return;
      this._serviceStyles = styles;
      this._selectedServiceStyle = ((_a2 = styles[0]) == null ? void 0 : _a2.name) ?? "";
    } catch (error) {
      if (!this._loadGeneration.isCurrent(generation)) return;
      if (error instanceof TucbsError) {
        console.error(`[tucbs-style-editor] ${error.code} (${error.number}): ${error.message}`);
      }
      this._serviceStylesError = error instanceof Error ? error.message : "Sunucu stilleri okunamadı.";
    } finally {
      if (this._loadGeneration.isCurrent(generation)) this._serviceStylesLoading = false;
    }
  }
  async _selectServiceStyle(styleName) {
    if (!this.layerManager || !this.layerId) return;
    this._selectedServiceStyle = styleName;
    try {
      if (this.layerType === "WMS") {
        await this.layerManager.setWmsStyle(this.layerId, styleName);
      } else {
        await this.layerManager.setWmtsStyle(this.layerId, styleName);
      }
    } catch (error) {
      if (error instanceof TucbsError) {
        console.error(`[tucbs-style-editor] ${error.code} (${error.number}): ${error.message}`);
      }
      this._serviceStylesError = error instanceof Error ? error.message : "Stil uygulanamadı.";
    }
  }
  render() {
    const selected = this._serviceStyles.find((s2) => s2.name === this._selectedServiceStyle);
    return b`
      <div class="card">
        <span class="card-title">Sunucu Stili</span>

        ${this._serviceStylesLoading ? b`<span class="field-label">Stiller yükleniyor…</span>` : this._serviceStylesError ? b`<span class="field-label" style="color:#da1e28;">${this._serviceStylesError}</span>` : b`
                <div>
                  <span class="field-label">Stil</span>
                  <cds-dropdown
                    size="sm"
                    label="Seçiniz"
                    .value=${this._selectedServiceStyle}
                    @cds-dropdown-selected=${(event) => {
      void this._selectServiceStyle(event.detail.item.value);
    }}
                  >
                    ${this._serviceStyles.map(
      (style) => b`<cds-dropdown-item value=${style.name}>${style.title}</cds-dropdown-item>`
    )}
                  </cds-dropdown>
                </div>

                ${(selected == null ? void 0 : selected.legendUrl) ? b`
                      <div>
                        <span class="field-label">Lejant</span>
                        <img
                          src=${selected.legendUrl}
                          alt="Lejant"
                          style="max-width:222px; display:block;"
                        />
                      </div>
                    ` : ""}
              `}
      </div>
    `;
  }
};
TucbsServiceStyleCard.styles = i$6`
    :host {
      display: block;
      font-family: "IBM Plex Sans", system-ui, sans-serif;
      font-size: 0.875rem;
      color: var(--cds-text-primary, #161616);
    }

    .card {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      padding: 1rem;
      border: 1px solid var(--cds-border-subtle, #e0e0e0);
      border-radius: 8px;
    }

    .card-title {
      font-weight: 600;
    }

    /* Carbon'un kendi form etiketlerinde kullandigi varsayilan bosluk
       (.cds--label { margin-block-end: .5rem }) ile tutarli olmasi icin
       8px. */
    .field-label {
      display: block;
      margin-bottom: 0.5rem;
      color: var(--cds-text-secondary, #525252);
      font-size: 0.75rem;
    }

    /* Bu proje Carbon'un tema/reset CSS'ini yuklemiyor; dropdown host
       tarayicida varsayilan "inline" kalabiliyor, bu durumda width sabiti
       etkisiz kalir. Layout'un ongorulebilir olmasi icin display'i acikca
       "block" olarak sabitliyoruz -- Dolgu/Dis Hat kartlarindaki AYNI sabit
       222px genislik (bkz style-editor/styleEditorStyles.ts). */
    cds-dropdown {
      display: block;
      width: 222px;
      box-sizing: border-box;
    }
  `;
__decorateClass$z([
  n$1({ attribute: false })
], TucbsServiceStyleCard.prototype, "layerManager", 2);
__decorateClass$z([
  n$1()
], TucbsServiceStyleCard.prototype, "layerId", 2);
__decorateClass$z([
  n$1()
], TucbsServiceStyleCard.prototype, "layerType", 2);
__decorateClass$z([
  n$1({ attribute: false })
], TucbsServiceStyleCard.prototype, "requestId", 2);
__decorateClass$z([
  r()
], TucbsServiceStyleCard.prototype, "_serviceStyles", 2);
__decorateClass$z([
  r()
], TucbsServiceStyleCard.prototype, "_serviceStylesLoading", 2);
__decorateClass$z([
  r()
], TucbsServiceStyleCard.prototype, "_serviceStylesError", 2);
__decorateClass$z([
  r()
], TucbsServiceStyleCard.prototype, "_selectedServiceStyle", 2);
TucbsServiceStyleCard = __decorateClass$z([
  t$3("tucbs-service-style-card")
], TucbsServiceStyleCard);
function sampleFromPaletteCss(palette, t3, paletteKind) {
  if (palette.length === 0) return "#808080";
  const clamped = Math.max(0, Math.min(1, t3));
  if (paletteKind === "qualitative") {
    const index = Math.round(clamped * (palette.length - 1));
    return palette[index];
  }
  if (palette.length === 1) return palette[0];
  const scaled = clamped * (palette.length - 1);
  const lowIndex = Math.floor(scaled);
  const highIndex = Math.min(palette.length - 1, lowIndex + 1);
  const localT = scaled - lowIndex;
  const low = hexToRgb(palette[lowIndex]);
  const high = hexToRgb(palette[highIndex]);
  const r2 = Math.round(low[0] + (high[0] - low[0]) * localT);
  const g2 = Math.round(low[1] + (high[1] - low[1]) * localT);
  const b2 = Math.round(low[2] + (high[2] - low[2]) * localT);
  return `rgb(${r2}, ${g2}, ${b2})`;
}
function hexToRgb(hex) {
  const normalized = hex.replace("#", "");
  const value = parseInt(normalized.length === 3 ? normalized.replace(/(.)/g, "$1$1") : normalized, 16);
  return [value >> 16 & 255, value >> 8 & 255, value & 255];
}
function compareCategoryKeys(a2, b2) {
  const aNum = Number(a2);
  const bNum = Number(b2);
  const aIsNumeric = Number.isFinite(aNum) && String(aNum) === a2;
  const bIsNumeric = Number.isFinite(bNum) && String(bNum) === b2;
  if (aIsNumeric && bIsNumeric) return aNum - bNum;
  return a2 < b2 ? -1 : a2 > b2 ? 1 : 0;
}
const INTEGER_RELATIVE_TOLERANCE = 1e-12;
function formatLegendNumber(value) {
  if (value === void 0) return "?";
  const rounded = Math.round(value);
  const tolerance = INTEGER_RELATIVE_TOLERANCE * Math.max(1, Math.abs(value));
  return Math.abs(value - rounded) <= tolerance ? String(rounded) : value.toFixed(2);
}
const DEFAULT_FILL_COLOR = "#1ecfb0";
const GRADIENT_PALETTES = [
  // sequential
  { value: "Viridis", label: "Viridis", colors: ["#440154", "#3b528b", "#21918c", "#5ec962", "#fde725"] },
  { value: "Plasma", label: "Plasma", colors: ["#0d0887", "#6a00a8", "#b12a90", "#e16462", "#fca636", "#f0f921"] },
  { value: "Magma", label: "Magma", colors: ["#000004", "#3b0f70", "#8c2981", "#de4968", "#fe9f6d", "#fcfdbf"] },
  { value: "Inferno", label: "Inferno", colors: ["#000004", "#420a68", "#932667", "#dd513a", "#fca50a", "#fcffa4"] },
  { value: "Cividis", label: "Cividis", colors: ["#00224e", "#123570", "#3b496c", "#575d6d", "#88892a", "#fee838"] },
  {
    value: "Turbo",
    label: "Turbo",
    colors: [
      "#30123b",
      "#4145ab",
      "#4675ed",
      "#39a2fc",
      "#1bcfd4",
      "#24eca6",
      "#61fc6c",
      "#a4fc3b",
      "#d1e834",
      "#f3c63a",
      "#fe9b2d",
      "#f36315",
      "#d93806",
      "#b11901",
      "#7a0403"
    ]
  },
  { value: "Blues", label: "Blues", colors: ["#f7fbff", "#c6dbef", "#6baed6", "#3182bd", "#08519c"] },
  { value: "Greens", label: "Greens", colors: ["#f7fcf5", "#c7e9c0", "#74c476", "#31a354", "#006d2c"] },
  { value: "Oranges", label: "Oranges", colors: ["#fff5eb", "#fdd0a2", "#f16913", "#d94801", "#7f2704"] },
  { value: "Reds", label: "Reds", colors: ["#fff5f0", "#fcbba1", "#fb6a4a", "#cb181d", "#67000d"] },
  { value: "Purples", label: "Purples", colors: ["#fcfbfd", "#dadaeb", "#9e9ac8", "#6a51a3", "#3f007d"] },
  { value: "YlOrRd", label: "YlOrRd", colors: ["#ffffcc", "#fed976", "#fd8d3c", "#e31a1c", "#800026"] },
  { value: "YlGnBu", label: "YlGnBu", colors: ["#ffffd9", "#c7e9b4", "#41b6c4", "#225ea8", "#081d58"] },
  // diverging
  {
    value: "Spectral",
    label: "Spectral",
    colors: ["#9e0142", "#f46d43", "#fee08b", "#ffffbf", "#e6f598", "#66c2a5", "#5e4fa2"]
  },
  { value: "RdYlGn", label: "RdYlGn", colors: ["#a50026", "#f46d43", "#ffffbf", "#a6d96a", "#006837"] },
  { value: "RdYlBu", label: "RdYlBu", colors: ["#a50026", "#f46d43", "#ffffbf", "#74add1", "#313695"] },
  { value: "BrBG", label: "BrBG", colors: ["#543005", "#bf812d", "#f6e8c3", "#c7eae5", "#35978f", "#003c30"] },
  { value: "RdBu", label: "RdBu", colors: ["#67001f", "#d6604d", "#f7f7f7", "#4393c3", "#2166ac"] },
  { value: "PiYG", label: "PiYG", colors: ["#8e0152", "#de77ae", "#f7f7f7", "#7fbc41", "#276419"] },
  // qualitative
  {
    value: "Set2",
    label: "Set2",
    colors: ["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854", "#ffd92f", "#e5c494", "#b3b3b3"]
  },
  {
    value: "Set3",
    label: "Set3",
    colors: ["#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462", "#b3de69", "#fccde5"]
  },
  {
    value: "Tableau10",
    label: "Tableau10",
    colors: [
      "#4e79a7",
      "#f28e2b",
      "#e15759",
      "#76b7b2",
      "#59a14f",
      "#edc948",
      "#b07aa1",
      "#ff9da7",
      "#9c755f",
      "#bab0ac"
    ]
  },
  {
    value: "Dark2",
    label: "Dark2",
    colors: ["#1b9e77", "#d95f02", "#7570b3", "#e7298a", "#66a61e", "#e6ab02", "#a6761d", "#666666"]
  },
  {
    value: "Paired",
    label: "Paired",
    colors: ["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99", "#e31a1c", "#fdbf6f", "#ff7f00"]
  },
  {
    value: "Accent",
    label: "Accent",
    colors: ["#7fc97f", "#beaed4", "#fdc086", "#ffff99", "#386cb0", "#f0027f", "#bf5b17", "#666666"]
  }
];
const DEFAULT_GRADIENT_PALETTE = GRADIENT_PALETTES[0].value;
const PALETTE_KIND = {
  Viridis: "sequential",
  Plasma: "sequential",
  Magma: "sequential",
  Inferno: "sequential",
  Cividis: "sequential",
  Turbo: "sequential",
  Blues: "sequential",
  Greens: "sequential",
  Oranges: "sequential",
  Reds: "sequential",
  Purples: "sequential",
  YlOrRd: "sequential",
  YlGnBu: "sequential",
  Spectral: "diverging",
  RdYlGn: "diverging",
  RdYlBu: "diverging",
  BrBG: "diverging",
  RdBu: "diverging",
  PiYG: "diverging",
  Set2: "qualitative",
  Set3: "qualitative",
  Tableau10: "qualitative",
  Dark2: "qualitative",
  Paired: "qualitative",
  Accent: "qualitative"
};
function paletteKindOf(name) {
  return PALETTE_KIND[name] ?? "sequential";
}
function sanitizeNumericInput(raw, allowNegative) {
  const negative = allowNegative && raw.trimStart().startsWith("-");
  let digits = raw.replace(/[^0-9.]/g, "");
  const dotIndex = digits.indexOf(".");
  if (dotIndex !== -1) {
    digits = digits.slice(0, dotIndex + 1) + digits.slice(dotIndex + 1).replace(/\./g, "");
  }
  const secondDotIndex = digits.indexOf(".");
  const intPart = secondDotIndex === -1 ? digits : digits.slice(0, secondDotIndex);
  const fracPart = secondDotIndex === -1 ? "" : digits.slice(secondDotIndex);
  const trimmedInt = intPart.replace(/^0+(?=\d)/, "");
  return (negative ? "-" : "") + trimmedInt + fracPart;
}
function checkGradientBound(value, edited, other, range) {
  if (value === "") return { valid: true, message: "" };
  const number = Number(value);
  if (!Number.isFinite(number)) return { valid: false, message: "" };
  if (range && (number < range.min || number > range.max)) {
    return {
      valid: false,
      message: `Değer ${formatLegendNumber(range.min)} ile ${formatLegendNumber(range.max)} arasında olmalı.`
    };
  }
  const otherNumber = other === "" ? Number.NaN : Number(other);
  if (Number.isFinite(otherNumber)) {
    if (edited === "min" && number > otherNumber) {
      return { valid: false, message: `Min, Max değerinden (${formatLegendNumber(otherNumber)}) büyük olamaz.` };
    }
    if (edited === "max" && number < otherNumber) {
      return { valid: false, message: `Max, Min değerinden (${formatLegendNumber(otherNumber)}) küçük olamaz.` };
    }
  }
  return { valid: true, message: "" };
}
function computeMinMax(gradientMin, gradientMax, range) {
  const result = {};
  if (gradientMin !== "") {
    const value = Number(gradientMin);
    result.min = range && Number.isFinite(value) ? Math.max(value, range.min) : value;
  }
  if (gradientMax !== "") {
    const value = Number(gradientMax);
    result.max = range && Number.isFinite(value) ? Math.min(value, range.max) : value;
  }
  if (result.min !== void 0 && result.max !== void 0 && result.min > result.max) {
    result.min = result.max;
  }
  return result;
}
function buildFillStyle(state) {
  const opacity = state.fillOpacityPercent / 100;
  switch (state.colorMode) {
    case "solid":
      return { mode: "solid", color: state.fillColor, opacity };
    case "gradient":
      return {
        mode: "gradient",
        column: state.dataColumn,
        palette: state.paletteColors,
        paletteKind: state.paletteKind,
        ...computeMinMax(state.gradientMin, state.gradientMax, state.columnRange),
        opacity
      };
    case "bin":
      return {
        mode: "bin",
        column: state.dataColumn,
        palette: state.paletteColors,
        paletteKind: state.paletteKind,
        binCount: state.binCount,
        ...computeMinMax(state.gradientMin, state.gradientMax, state.columnRange),
        opacity
      };
    case "enum":
      return {
        mode: "enum",
        column: state.dataColumn,
        colors: state.categoryColors,
        opacity
      };
    case "off":
    default:
      return { mode: "off" };
  }
}
function sortCategoryValues(values, sort) {
  if (sort === "source") return values;
  const sorted = [...values].sort((a2, b2) => compareCategoryKeys(String(a2), String(b2)));
  return sort === "desc" ? sorted.reverse() : sorted;
}
function autoFillCategoryColors(values, existing, palette) {
  const next = {};
  values.forEach((value, index) => {
    const key = String(value);
    next[key] = existing[key] ?? palette[index % palette.length] ?? DEFAULT_FILL_COLOR;
  });
  return next;
}
function arraysEqual(a2, b2) {
  return a2.length === b2.length && a2.every((value, index) => value === b2[index]);
}
function findPaletteName(colors) {
  for (const palette of GRADIENT_PALETTES) {
    if (arraysEqual(palette.colors, colors)) {
      return { name: palette.value, reversed: false };
    }
    if (arraysEqual([...palette.colors].reverse(), colors)) {
      return { name: palette.value, reversed: true };
    }
  }
  return void 0;
}
function toHexColor(color) {
  const hslMatch = /hsl\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*\)/.exec(color);
  if (!hslMatch) return color.startsWith("#") ? color : "#000000";
  const h2 = Number(hslMatch[1]);
  const s2 = Number(hslMatch[2]) / 100;
  const l2 = Number(hslMatch[3]) / 100;
  const c2 = (1 - Math.abs(2 * l2 - 1)) * s2;
  const x2 = c2 * (1 - Math.abs(h2 / 60 % 2 - 1));
  const m2 = l2 - c2 / 2;
  const sectors = [
    [c2, x2, 0],
    [x2, c2, 0],
    [0, c2, x2],
    [0, x2, c2],
    [x2, 0, c2],
    [c2, 0, x2]
  ];
  const [r0, g0, b0] = sectors[Math.min(5, Math.floor(h2 / 60))] ?? sectors[0];
  const toHex = (v2) => Math.round((v2 + m2) * 255).toString(16).padStart(2, "0");
  return `#${toHex(r0)}${toHex(g0)}${toHex(b0)}`;
}
function restoreRangeFields(fill) {
  const foundPalette = findPaletteName(fill.palette);
  return {
    dataColumn: fill.column,
    ...foundPalette && { gradientPalette: foundPalette.name, paletteReversed: foundPalette.reversed },
    gradientMin: fill.min !== void 0 ? String(fill.min) : "",
    gradientMax: fill.max !== void 0 ? String(fill.max) : "",
    ...fill.mode === "bin" && { binCount: String(fill.binCount) }
  };
}
function restoreEnumFields(fill) {
  const categoryValues = Object.keys(fill.colors).map((key) => {
    const asNumber = Number(key);
    return Number.isFinite(asNumber) && String(asNumber) === key ? asNumber : key;
  });
  return { dataColumn: fill.column, categoryColors: { ...fill.colors }, categoryValues };
}
function restoreFillFields(fill) {
  if ((fill == null ? void 0 : fill.mode) === "gradient" || (fill == null ? void 0 : fill.mode) === "bin") return restoreRangeFields(fill);
  if ((fill == null ? void 0 : fill.mode) === "enum") return restoreEnumFields(fill);
  return {};
}
function deriveStyleEditorState(style, initialFillColor, initialFillOpacity, defaults) {
  const solidFill = (style == null ? void 0 : style.fill.mode) === "solid" ? style.fill : void 0;
  const initialColor = initialFillColor ? toHexColor(initialFillColor) : DEFAULT_FILL_COLOR;
  const initialOpacity = initialFillOpacity !== void 0 ? Math.round(initialFillOpacity * 100) : defaults.fillOpacity;
  return {
    colorMode: (style == null ? void 0 : style.fill.mode) ?? defaults.colorMode,
    fillColor: solidFill ? toHexColor(solidFill.color) : initialColor,
    fillOpacity: solidFill ? Math.round(solidFill.opacity * 100) : initialOpacity,
    dataColumn: "",
    gradientPalette: DEFAULT_GRADIENT_PALETTE,
    paletteReversed: false,
    gradientMin: "",
    gradientMax: "",
    binCount: defaults.binCount,
    categoryColors: {},
    categoryValues: [],
    ...restoreFillFields(style == null ? void 0 : style.fill),
    outlineEnabled: (style == null ? void 0 : style.outline.enabled) ?? defaults.outlineEnabled,
    outlineColor: style ? toHexColor(style.outline.color) : defaults.outlineColor,
    outlineWidth: style !== void 0 ? String(style.outline.width) : defaults.outlineWidth
  };
}
const GRADIENT_LEGEND_STEPS = 7;
function gradientLegendRows(min, max, sample, steps = GRADIENT_LEGEND_STEPS) {
  return Array.from({ length: steps }, (_2, index) => {
    const t3 = steps <= 1 ? 1 : 1 - index / (steps - 1);
    const value = min + t3 * (max - min);
    return { color: sample(t3), label: formatLegendNumber(value) };
  });
}
function binLegendRows(min, max, binCount, sample) {
  const step = (max - min) / binCount;
  return Array.from({ length: binCount }, (_2, index) => {
    const low = min + step * index;
    const high = min + step * (index + 1);
    const t3 = binCount <= 1 ? 0.5 : index / (binCount - 1);
    return { color: sample(t3), label: `${formatLegendNumber(low)} – ${formatLegendNumber(high)}` };
  });
}
class TimerBag {
  constructor(host) {
    this._timeoutIds = /* @__PURE__ */ new Set();
    this._frameIds = /* @__PURE__ */ new Set();
    host.addController(this);
  }
  hostDisconnected() {
    for (const id of this._timeoutIds) window.clearTimeout(id);
    this._timeoutIds.clear();
    for (const id of this._frameIds) cancelAnimationFrame(id);
    this._frameIds.clear();
  }
  /** `window.setTimeout` sarmalayicisi -- id'yi izler, `fn` calistiktan sonra izlemeden düşer. */
  setTimeout(fn, ms) {
    const id = window.setTimeout(() => {
      this._timeoutIds.delete(id);
      fn();
    }, ms);
    this._timeoutIds.add(id);
    return id;
  }
  /** `setTimeout()`'un döndürdüğü id ile bekleyen bir zamanlayıcıyı iptal eder. `null` ile çağrılması güvenlidir (no-op). */
  clearTimeout(id) {
    if (id === null) return;
    window.clearTimeout(id);
    this._timeoutIds.delete(id);
  }
  /** `requestAnimationFrame` sarmalayicisi -- id'yi izler, `fn` calistiktan sonra izlemeden düşer. */
  requestAnimationFrame(fn) {
    const id = requestAnimationFrame(() => {
      this._frameIds.delete(id);
      fn();
    });
    this._frameIds.add(id);
    return id;
  }
  /** `requestAnimationFrame()`'in döndürdüğü id ile bekleyen bir kareyi iptal eder. `null` ile çağrılması güvenlidir (no-op). */
  cancelAnimationFrame(id) {
    if (id === null) return;
    cancelAnimationFrame(id);
    this._frameIds.delete(id);
  }
}
function renderCardHeader(title, toggle) {
  return b`
    <div class="card-header">
      <span class="card-title">${title}</span>
      ${toggle ? b`<cds-toggle
            size="sm"
            label-a=""
            label-b=""
            title=${toggle.label}
            aria-label=${toggle.label}
            ?toggled=${toggle.checked}
            @cds-toggle-changed=${(event) => {
    var _a2;
    return toggle.onChange(((_a2 = event.detail) == null ? void 0 : _a2.checked) ?? !toggle.checked);
  }}
          ></cds-toggle>` : A}
    </div>
  `;
}
const DEFAULT_BIN_COUNT = "5";
const FILL_COLOR_MODES = [
  { value: "solid", label: "Sabit Renk" },
  { value: "gradient", label: "Sürekli (Gradient)" },
  { value: "bin", label: "Kesikli (Bin)" },
  { value: "enum", label: "Kategorik (Enum)" }
];
const CATEGORY_SORT_OPTIONS = [
  { value: "asc", label: "Artan (eskiden yeniye)" },
  { value: "desc", label: "Azalan (yeniden eskiye)" },
  { value: "source", label: "Verideki sıra" }
];
const editStartValues = /* @__PURE__ */ new WeakMap();
function onBoundInput(host, edited, event) {
  const target = event.target;
  if (!editStartValues.has(target)) {
    editStartValues.set(target, edited === "min" ? host.gradientMin : host.gradientMax);
  }
  const sanitized = sanitizeNumericInput(
    target.value,
    edited === "min" ? host.allowNegativeMin() : host.allowNegativeMax()
  );
  if (target.value !== sanitized) target.value = sanitized;
  const check = host.checkGradientBound(edited, sanitized);
  setBoundError(host, edited, check.message);
  if (!check.valid) return;
  setBound(host, edited, sanitized);
  host.scheduleApplyStyle();
}
function commitBound(host, edited, event) {
  const target = event.target;
  const start = editStartValues.get(target);
  editStartValues.delete(target);
  setBoundError(host, edited, "");
  if (host.checkGradientBound(edited, target.value).valid) return;
  const current = edited === "min" ? host.gradientMin : host.gradientMax;
  const restored = start ?? current;
  if (target.value !== restored) target.value = restored;
  if (current !== restored) {
    setBound(host, edited, restored);
    host.scheduleApplyStyle();
  }
}
function setBound(host, edited, value) {
  if (edited === "min") host.gradientMin = value;
  else host.gradientMax = value;
}
function setBoundError(host, edited, message) {
  if (edited === "min") host.gradientMinError = message;
  else host.gradientMaxError = message;
}
const onBoundKeydown = (host, edited, event) => {
  if (event.key === "Enter") commitBound(host, edited, event);
};
function renderMinMaxFields(host) {
  return host.colorMode === "gradient" ? b`
        <div style="display:flex; flex-direction:column; gap:0.75rem;">
          <div>
            <span class="field-label">Min</span>
            <cds-text-input
              size="sm"
              label="Min"
              hide-label
              placeholder="Otomatik"
              .value=${host.gradientMin}
              .invalid=${host.gradientMinError !== ""}
              .invalidText=${host.gradientMinError}
              @input=${(event) => onBoundInput(host, "min", event)}
              @keydown=${(event) => onBoundKeydown(host, "min", event)}
              @focusout=${(event) => commitBound(host, "min", event)}
            ></cds-text-input>
          </div>
          <div>
            <span class="field-label">Max</span>
            <cds-text-input
              size="sm"
              label="Max"
              hide-label
              placeholder="Otomatik"
              .value=${host.gradientMax}
              .invalid=${host.gradientMaxError !== ""}
              .invalidText=${host.gradientMaxError}
              @input=${(event) => onBoundInput(host, "max", event)}
              @keydown=${(event) => onBoundKeydown(host, "max", event)}
              @focusout=${(event) => commitBound(host, "max", event)}
            ></cds-text-input>
          </div>
        </div>
      ` : "";
}
const isValidBinCount = (value) => /^[1-9]$/.test(value);
function onBinCountInput(host, event) {
  const field = event.currentTarget;
  if (!editStartValues.has(field)) editStartValues.set(field, host.binCount);
  const raw = field.value;
  const digitsOnly = raw.replace(/\D/g, "").replace(/^0+(?=\d)/, "");
  if (raw !== digitsOnly) field.value = digitsOnly;
  if (isValidBinCount(digitsOnly) && digitsOnly !== host.binCount) {
    host.binCount = digitsOnly;
    host.scheduleApplyStyle();
  }
}
function onBinCountStep(host, event) {
  if (!event.detail.direction) return;
  const value = String(Math.round(Number(event.detail.value)));
  if (isValidBinCount(value) && value !== host.binCount) {
    host.binCount = value;
    host.scheduleApplyStyle();
  }
}
function commitBinCount(host, event) {
  const field = event.currentTarget;
  const start = editStartValues.get(field);
  editStartValues.delete(field);
  if (isValidBinCount(field.value)) return;
  const restored = start ?? host.binCount;
  field.value = restored;
  if (host.binCount !== restored) {
    host.binCount = restored;
    host.scheduleApplyStyle();
  }
}
function renderBinCountField(host) {
  return host.colorMode === "bin" ? b`
        <div>
          <span class="field-label">Bin Sayısı</span>
          <cds-number-input
            size="sm"
            type="text"
            locale="en"
            label="Bin Sayısı"
            hide-label
            min="1"
            max="9"
            step="1"
            .value=${host.binCount}
            @input=${(event) => onBinCountInput(host, event)}
            @cds-number-input=${(event) => onBinCountStep(host, event)}
            @keydown=${(event) => {
    if (event.key === "Enter") commitBinCount(host, event);
  }}
            @focusout=${(event) => commitBinCount(host, event)}
          ></cds-number-input>
        </div>
      ` : "";
}
function renderEnumFields(host) {
  return host.colorMode === "enum" ? b`
        <div>
          <span class="field-label">Kategori Sırası</span>
          <cds-dropdown
            size="sm"
            label="Seçiniz"
            .value=${host.categorySort}
            @cds-dropdown-selected=${(event) => {
    host.categorySort = event.detail.item.value;
    host.categoryValues = host.sortCategoryValues(host.categoryValues);
  }}
          >
            ${CATEGORY_SORT_OPTIONS.map(
    (option) => b`<cds-dropdown-item value=${option.value}>${option.label}</cds-dropdown-item>`
  )}
          </cds-dropdown>
        </div>

        <div>
          <cds-checkbox
            .checked=${host.paletteReversed}
            label-text="Paleti ters çevir"
            @cds-checkbox-changed=${(event) => {
    var _a2;
    host.paletteReversed = ((_a2 = event.detail) == null ? void 0 : _a2.checked) ?? !host.paletteReversed;
    host.categoryColors = host.autoFillCategoryColors(host.categoryValues, {});
    host.scheduleApplyStyle();
  }}
          ></cds-checkbox>
        </div>
      ` : "";
}
function renderSolidSwatchField(host) {
  return host.colorMode === "solid" ? b`
        <div>
          <span class="field-label">Renk Paleti</span>
          <span class="color-swatch" style="background:${host.fillColor}">
            <input
              type="color"
              .value=${host.fillColor}
              aria-label="Dolgu rengi"
              @input=${(event) => {
    host.fillColor = event.target.value;
    host.scheduleApplyStyle();
  }}
            />
          </span>
        </div>
      ` : "";
}
function renderOpacityField(host) {
  return host.colorMode === "off" ? "" : b`
        <div style="margin-top: 8px">
          <span class="field-label">Opaklık (${host.fillOpacity}%)</span>
          <input
            type="range"
            class="opacity-slider"
            min="0"
            max="100"
            step="1"
            .value=${String(host.fillOpacity)}
            style="--fill: ${host.fillOpacity}%"
            @input=${(event) => {
    const input = event.target;
    const value = Number(input.value);
    host.updateOpacitySlider(input, value);
    host.setFillOpacity(value);
  }}
          />
        </div>
      `;
}
function renderColorModeField(host) {
  return host.isFixedSolidLayer ? "" : b`
        <div>
          <span class="field-label">Renk Modu</span>
          <cds-dropdown
            size="sm"
            label="Seçiniz"
            .value=${host.colorMode}
            @cds-dropdown-selected=${(event) => {
    host.colorMode = event.detail.item.value;
    const options = host.colorMode === "gradient" || host.colorMode === "bin" ? host.numericDataColumns : host.dataColumns;
    if (host.dataColumn && !options.includes(host.dataColumn)) {
      host.dataColumn = "";
    }
    if (host.dataColumn) host.onDataColumnChange(host.dataColumn);
    else host.scheduleApplyStyle();
  }}
          >
            ${FILL_COLOR_MODES.map(
    (option) => b`<cds-dropdown-item value=${option.value}>${option.label}</cds-dropdown-item>`
  )}
          </cds-dropdown>
        </div>
      `;
}
function renderDataFields(host) {
  const columnOptions = host.colorMode === "gradient" || host.colorMode === "bin" ? host.numericDataColumns : host.dataColumns;
  return host.colorMode === "gradient" || host.colorMode === "bin" || host.colorMode === "enum" ? b`
        <div>
          <span class="field-label">Veri Sütunu</span>
          <cds-dropdown
            size="sm"
            label="Seçiniz"
            .value=${host.dataColumn}
            @cds-dropdown-selected=${(event) => {
    host.onDataColumnChange(event.detail.item.value);
  }}
          >
            ${columnOptions.map(
    (name) => b`<cds-dropdown-item value=${name}>${name}</cds-dropdown-item>`
  )}
          </cds-dropdown>
        </div>

        <div>
          <span class="field-label">Renk Paleti</span>
          <div class="palette-dropdown-wrap">
            <cds-dropdown
              size="sm"
              label="Seçiniz"
              .value=${host.gradientPalette}
              @cds-dropdown-selected=${(event) => {
    host.gradientPalette = event.detail.item.value;
    if (host.colorMode === "enum" && host.categoryValues.length > 0) {
      host.categoryColors = host.autoFillCategoryColors(
        host.categoryValues,
        {}
      );
    }
    host.scheduleApplyStyle();
  }}
            >
              ${GRADIENT_PALETTES.map(
    (palette) => b`
                  <cds-dropdown-item value=${palette.value} title=${palette.label}>
                    <span
                      class="palette-swatch"
                      aria-label=${palette.label}
                      style="background: linear-gradient(to right, ${palette.colors.join(", ")})"
                    ></span>
                  </cds-dropdown-item>
                `
  )}
            </cds-dropdown>
            <span
              class="palette-selected-preview"
              style="background: linear-gradient(to right, ${(GRADIENT_PALETTES.find((p2) => p2.value === host.gradientPalette) ?? GRADIENT_PALETTES[0]).colors.join(", ")})"
            ></span>
          </div>
        </div>

        ${renderMinMaxFields(host)}
        ${renderBinCountField(host)}
        ${renderEnumFields(host)}
      ` : renderSolidSwatchField(host);
}
function renderFillCard(host) {
  return b`
    <div class="card">
      ${renderCardHeader("Dolgu", {
    checked: host.fillEnabled,
    label: "Dolgu",
    onChange: (enabled) => host.setFillEnabled(enabled)
  })}

      <div class="card-body" ?inert=${!host.fillEnabled}>
        ${renderColorModeField(host)}

        ${renderDataFields(host)}

        ${renderOpacityField(host)}
      </div>
    </div>
  `;
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const i3 = e$2(class extends i$2 {
  constructor() {
    super(...arguments), this.key = A;
  }
  render(r2, t3) {
    return this.key = r2, t3;
  }
  update(r2, [t3, e3]) {
    return t3 !== this.key && (p(r2), this.key = t3), e3;
  }
});
function deriveSymbolFormState(style) {
  const point = style == null ? void 0 : style.point;
  return {
    pointShape: (point == null ? void 0 : point.shape) ?? DEFAULT_POINT_SYMBOL.shape,
    pointSize: String((point == null ? void 0 : point.size) ?? DEFAULT_POINT_SYMBOL.size),
    pointCustomized: point !== void 0,
    lineDash: (style == null ? void 0 : style.outline.dash) ?? "solid"
  };
}
function buildPointSymbol(state) {
  if (!state.pointCustomized) return void 0;
  return { shape: state.pointShape, size: Number(normalizePointSizeText(state.pointSize)) };
}
function buildLineDash(dash) {
  return dash === "solid" ? {} : { dash };
}
function sanitizePointSizeInput(raw) {
  return raw.replace(/\D/g, "");
}
function isValidPointSize(raw) {
  if (!/^\d+$/.test(raw)) return false;
  const value = Number(raw);
  return value >= POINT_SIZE_MIN && value <= POINT_SIZE_MAX;
}
function normalizePointSizeText(raw) {
  const value = Number(raw);
  if (raw.trim() === "" || !Number.isFinite(value)) return String(DEFAULT_POINT_SYMBOL.size);
  return String(Math.round(clampPointSize(value)));
}
function parsePointShape(value) {
  return POINT_SHAPES.find((shape) => shape === value);
}
function parseLineDash(value) {
  return LINE_DASHES.find((dash) => dash === value);
}
function styleCardLayout(kinds) {
  const point = (kinds == null ? void 0 : kinds.point) === true;
  const line = (kinds == null ? void 0 : kinds.line) === true;
  const area = (kinds == null ? void 0 : kinds.area) === true;
  const symbolDash = line || point || (kinds == null ? void 0 : kinds.dashable) === true;
  const lineOnly = line && !point && !area;
  const fill = !lineOnly;
  return {
    fill,
    symbol: point || symbolDash,
    symbolPoint: point,
    symbolDash,
    outlineTitle: lineOnly ? "Hat" : "Dış Hat",
    outlineEnabledToggle: fill
  };
}
function deriveOutlineOpacityPercent(style) {
  const opacity = style == null ? void 0 : style.outline.opacity;
  return opacity === void 0 ? 100 : Math.round(Math.min(1, Math.max(0, opacity)) * 100);
}
function buildOutlineOpacity(percent) {
  if (!Number.isFinite(percent) || percent >= 100) return {};
  return { opacity: Math.max(0, percent) / 100 };
}
const ICON_SIZE = 16;
const PREVIEW_STROKE = "#161616";
const ICON_INLINE_STYLE = "margin-right:0.5rem;vertical-align:middle;flex:none";
function shapeIcon(shape, fill) {
  const markup = pointSymbolSvg(shape, {
    fill,
    stroke: PREVIEW_STROKE,
    strokeWidth: 1,
    size: ICON_SIZE,
    renderSize: ICON_SIZE
  }).replace("<svg ", `<svg style="${ICON_INLINE_STYLE}" aria-hidden="true" `);
  return o$2(markup);
}
function dashIcon(dash, color) {
  const array = dashArray(dash, 2);
  return b`<svg
    viewBox="0 0 48 8"
    width="48"
    height="8"
    style="margin-right:0.75rem;vertical-align:middle;flex:none"
    aria-hidden="true"
  >
    ${w`<line x1="0" y1="4" x2="48" y2="4" stroke=${color} stroke-width="2" stroke-dasharray=${array ?? A} />`}
  </svg>`;
}
function onSizeInput(host, event) {
  const field = event.currentTarget;
  const digits = sanitizePointSizeInput(field.value);
  if (field.value !== digits) field.value = digits;
  if (isValidPointSize(digits) && digits !== host.pointSize) {
    host.pointSize = digits;
    host.markPointCustomized();
    host.scheduleApplyStyle();
  }
}
function onSizeStep(host, event) {
  if (!event.detail.direction) return;
  const normalized = normalizePointSizeText(String(Math.round(Number(event.detail.value))));
  if (normalized !== host.pointSize) {
    host.pointSize = normalized;
    host.markPointCustomized();
    host.scheduleApplyStyle();
  }
}
function commitSize(host, event) {
  const field = event.currentTarget;
  const normalized = normalizePointSizeText(field.value);
  field.value = normalized;
  if (normalized !== host.pointSize) {
    host.pointSize = normalized;
    host.markPointCustomized();
    host.scheduleApplyStyle();
  }
}
function renderPointFields(host) {
  return b`
    <div>
      <span class="field-label">Şekil</span>
      ${i3(host.fillColor, b`
      <cds-dropdown
        class="no-scroll-dropdown"
        size="sm"
        label="Seçiniz"
        .value=${host.pointShape}
        @cds-dropdown-selected=${(event) => {
    const shape = parsePointShape(event.detail.item.value);
    if (shape === void 0 || shape === host.pointShape) return;
    host.pointShape = shape;
    host.markPointCustomized();
    host.scheduleApplyStyle();
  }}
      >
        ${POINT_SHAPES.map(
    (shape) => b`
            <cds-dropdown-item value=${shape}>
              ${shapeIcon(shape, host.fillColor)}${POINT_SHAPE_LABELS[shape]}
            </cds-dropdown-item>
          `
  )}
      </cds-dropdown>
      `)}
    </div>

    <div>
      <span class="field-label">Boyut</span>
      <cds-number-input
        size="sm"
        type="text"
        locale="en"
        label="Boyut"
        hide-label
        min=${POINT_SIZE_MIN}
        max=${POINT_SIZE_MAX}
        step="1"
        .value=${host.pointSize}
        @input=${(event) => onSizeInput(host, event)}
        @cds-number-input=${(event) => onSizeStep(host, event)}
        @keydown=${(event) => {
    if (event.key === "Enter") commitSize(host, event);
  }}
        @focusout=${(event) => commitSize(host, event)}
      ></cds-number-input>
    </div>
  `;
}
function renderSymbolCard(host, content) {
  return b`
    <div class="card">
      ${renderCardHeader("Sembol")}
      ${content.point ? renderPointFields(host) : A}
      ${content.dash ? renderLineDashField(host) : A}
    </div>
  `;
}
function renderLineDashField(host) {
  return b`
    <div>
      <span class="field-label">Çizgi Tipi</span>
      ${i3(host.outlineColor, b`
      <cds-dropdown
        class="no-scroll-dropdown"
        size="sm"
        label="Seçiniz"
        .value=${host.lineDash}
        ?disabled=${!host.outlineEnabled}
        @cds-dropdown-selected=${(event) => {
    const dash = parseLineDash(event.detail.item.value);
    if (dash === void 0 || dash === host.lineDash) return;
    host.lineDash = dash;
    host.scheduleApplyStyle();
  }}
      >
        ${LINE_DASHES.map(
    (dash) => b`
            <cds-dropdown-item value=${dash}>
              ${dashIcon(dash, host.outlineColor)}${LINE_DASH_LABELS[dash]}
            </cds-dropdown-item>
          `
  )}
      </cds-dropdown>
      `)}
    </div>
  `;
}
var __defProp$x = Object.defineProperty;
var __getOwnPropDesc$y = Object.getOwnPropertyDescriptor;
var __decorateClass$y = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$y(target, key) : target;
  for (var i4 = decorators.length - 1, decorator; i4 >= 0; i4--)
    if (decorator = decorators[i4])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$x(target, key, result);
  return result;
};
const SERVICE_LAYER_TYPES$1 = ["WMS", "WMTS"];
const ICON_PALETTE_20 = o$1(iconNodeToString(_20_default$3));
const ICON_RENEW$1 = o$1(iconNodeToString(_16_default$c));
const ICON_CLOSE$7 = o$1(iconNodeToString(_16_default$v));
const DEFAULT_FILL_OPACITY = 46;
const FIXED_SOLID_LAYER_FILL_OPACITY = 40;
const DEFAULT_OUTLINE_ENABLED = true;
const DEFAULT_OUTLINE_COLOR = "#1a73e8";
const DEFAULT_OUTLINE_WIDTH = "2";
const FIXED_SOLID_LAYER_OUTLINE_WIDTH = "1";
const VISIBLE_LIST_ROWS = 10;
const TECHNICAL_COLUMN_PATTERN = /^(shape_area|shape_leng|shape_length|shape_len|objectid|fid|gml_id|gid)(_\d+)?$/i;
const DEFAULT_COLOR_MODE = FILL_COLOR_MODES[0].value;
const DEFAULT_CATEGORY_SORT = CATEGORY_SORT_OPTIONS[0].value;
const STYLE_EDITOR_FORM_DEFAULTS = {
  colorMode: DEFAULT_COLOR_MODE,
  fillOpacity: DEFAULT_FILL_OPACITY,
  outlineEnabled: DEFAULT_OUTLINE_ENABLED,
  outlineColor: DEFAULT_OUTLINE_COLOR,
  outlineWidth: DEFAULT_OUTLINE_WIDTH,
  binCount: DEFAULT_BIN_COUNT
};
let TucbsStyleEditor = class extends i$3 {
  constructor() {
    super(...arguments);
    this.open = false;
    this.layerId = "";
    this.layerTitle = "";
    this.layerType = "";
    this.customCss = "";
    this._customCssState = { sheet: null };
    this._colorMode = DEFAULT_COLOR_MODE;
    this._dataColumn = "";
    this._dataColumns = [];
    this._numericDataColumns = [];
    this._gradientPalette = DEFAULT_GRADIENT_PALETTE;
    this._gradientMin = "";
    this._gradientMax = "";
    this._gradientMinError = "";
    this._gradientMaxError = "";
    this._binCount = DEFAULT_BIN_COUNT;
    this._categorySort = DEFAULT_CATEGORY_SORT;
    this._paletteReversed = false;
    this._categoryValues = [];
    this._categoryColors = {};
    this._fillColor = DEFAULT_FILL_COLOR;
    this._fillOpacity = DEFAULT_FILL_OPACITY;
    this._outlineEnabled = DEFAULT_OUTLINE_ENABLED;
    this._outlineColor = DEFAULT_OUTLINE_COLOR;
    this._outlineWidth = DEFAULT_OUTLINE_WIDTH;
    this._fillModeBeforeOff = DEFAULT_COLOR_MODE;
    this._outlineOpacity = 100;
    this._outlineOpacityRaf = null;
    this._pointShape = "circle";
    this._pointSize = String(DEFAULT_POINT_SYMBOL.size);
    this._pointCustomized = false;
    this._lineDash = "solid";
    this._serviceStyleRequestId = 0;
    this._drag = new DraggablePanelController(this, {
      getPanel: () => this,
      ignoreSelector: ".close-btn"
    });
    this._categoryScroll = new VirtualScrollbar(
      this,
      () => this._categoryListEl,
      () => this._categoryThumbEl
    );
    this._legendScroll = new VirtualScrollbar(
      this,
      () => this._legendListEl,
      () => this._legendThumbEl
    );
    this._applyStyleRaf = null;
    this._fillOpacityRaf = null;
    this._timers = new TimerBag(this);
    this._onLayerStyle = (payload) => {
      if (!this.open || payload.id !== this.layerId) return;
      const { fill } = payload.style;
      if (fill.mode === "off") return;
      if (fill.mode === "solid") this._fillColor = toHexColor(fill.color);
      this._fillOpacity = Math.round(fill.opacity * 100);
    };
    this._fillCardHost = new class {
      constructor(editor) {
        this.editor = editor;
      }
      get fillEnabled() {
        return this.editor._colorMode !== "off";
      }
      setFillEnabled(enabled) {
        this.editor._setFillEnabled(enabled);
      }
      // Dolgu KAPALIYKEN kartin govdesi (pasif/soluk) kapatilmadan onceki modun alanlarini
      // gosterir; bos bir "Renk Modu" birakmaz. Stile yazilan gercek mod _colorMode'dur.
      get colorMode() {
        return this.editor._colorMode === "off" ? this.editor._fillModeBeforeOff : this.editor._colorMode;
      }
      set colorMode(value) {
        this.editor._colorMode = value;
      }
      get dataColumn() {
        return this.editor._dataColumn;
      }
      set dataColumn(value) {
        this.editor._dataColumn = value;
      }
      get gradientPalette() {
        return this.editor._gradientPalette;
      }
      set gradientPalette(value) {
        this.editor._gradientPalette = value;
      }
      get gradientMin() {
        return this.editor._gradientMin;
      }
      set gradientMin(value) {
        this.editor._gradientMin = value;
      }
      get gradientMax() {
        return this.editor._gradientMax;
      }
      set gradientMax(value) {
        this.editor._gradientMax = value;
      }
      get gradientMinError() {
        return this.editor._gradientMinError;
      }
      set gradientMinError(value) {
        this.editor._gradientMinError = value;
      }
      get gradientMaxError() {
        return this.editor._gradientMaxError;
      }
      set gradientMaxError(value) {
        this.editor._gradientMaxError = value;
      }
      get binCount() {
        return this.editor._binCount;
      }
      set binCount(value) {
        this.editor._binCount = value;
      }
      get categorySort() {
        return this.editor._categorySort;
      }
      set categorySort(value) {
        this.editor._categorySort = value;
      }
      get paletteReversed() {
        return this.editor._paletteReversed;
      }
      set paletteReversed(value) {
        this.editor._paletteReversed = value;
      }
      get categoryValues() {
        return this.editor._categoryValues;
      }
      set categoryValues(value) {
        this.editor._categoryValues = value;
      }
      get categoryColors() {
        return this.editor._categoryColors;
      }
      set categoryColors(value) {
        this.editor._categoryColors = value;
      }
      get fillColor() {
        return this.editor._fillColor;
      }
      set fillColor(value) {
        this.editor._fillColor = value;
      }
      get fillOpacity() {
        return this.editor._fillOpacity;
      }
      get dataColumns() {
        return this.editor._dataColumns;
      }
      get numericDataColumns() {
        return this.editor._numericDataColumns;
      }
      get isFixedSolidLayer() {
        return this.editor._isFixedSolidLayer;
      }
      allowNegativeMin() {
        return this.editor._allowNegativeMin();
      }
      allowNegativeMax() {
        return this.editor._allowNegativeMax();
      }
      checkGradientBound(edited, value) {
        return this.editor._checkGradientBound(edited, value);
      }
      scheduleApplyStyle() {
        this.editor._scheduleApplyStyle();
      }
      sortCategoryValues(values) {
        return this.editor._sortCategoryValues(values);
      }
      autoFillCategoryColors(values, existing) {
        return this.editor._autoFillCategoryColors(values, existing);
      }
      updateOpacitySlider(input, value) {
        this.editor._updateOpacitySlider(input, value);
      }
      setFillOpacity(value) {
        this.editor._setFillOpacity(value);
      }
      onDataColumnChange(column) {
        this.editor._onDataColumnChange(column);
      }
    }(this);
    this._symbolCardHost = new class {
      constructor(editor) {
        this.editor = editor;
      }
      get pointShape() {
        return this.editor._pointShape;
      }
      set pointShape(value) {
        this.editor._pointShape = value;
      }
      get pointSize() {
        return this.editor._pointSize;
      }
      set pointSize(value) {
        this.editor._pointSize = value;
      }
      get lineDash() {
        return this.editor._lineDash;
      }
      set lineDash(value) {
        this.editor._lineDash = value;
      }
      get fillColor() {
        return this.editor._fillColor;
      }
      get outlineColor() {
        return this.editor._outlineColor;
      }
      get outlineEnabled() {
        return this.editor._outlineEnabled;
      }
      markPointCustomized() {
        this.editor._pointCustomized = true;
      }
      scheduleApplyStyle() {
        this.editor._scheduleApplyStyle();
      }
    }(this);
  }
  /** Bileşen DOM'dan kaldırıldığında bekleyen RAF'ları iptal eder ve `layerManager` dinleyicisini kaldırır. */
  disconnectedCallback() {
    if (this.layerManager) this.layerManager.off("layer:style", this._onLayerStyle);
    super.disconnectedCallback();
  }
  /** Reactive property değişikliklerini (customCss/open/layerManager) işler ve liste scroll-thumb'larını yeniden senkronlar. */
  updated(changedProperties) {
    if (changedProperties.has("customCss")) {
      applyCustomCss(this.shadowRoot, this.customCss, this._customCssState, "tucbs-style-editor");
    }
    if (changedProperties.has("open") && this.open) {
      this.style.removeProperty("left");
      this.style.removeProperty("top");
      this.style.removeProperty("transform");
    }
    if (changedProperties.has("layerManager")) {
      const previous = changedProperties.get("layerManager");
      if (previous) previous.off("layer:style", this._onLayerStyle);
      if (this.layerManager) this.layerManager.on("layer:style", this._onLayerStyle);
    }
    this._timers.requestAnimationFrame(() => {
      TucbsStyleEditor._fitListToRows(this._categoryListEl, ".legend-bin-row");
      TucbsStyleEditor._fitListToRows(this._legendListEl, ".legend-bin-row");
      this._categoryScroll.sync();
      this._legendScroll.sync();
    });
  }
  /**
   * Diyalogu belirtilen katman icin, mevcut dolgu rengi/opakligiyla acar.
   *
   * @example
   * ```ts
   * const styleEditor = document.querySelector("tucbs-style-editor");
   * styleEditor.layerManager = map.layerManager;
   * styleEditor.openFor("world-continents", "World Continents (WMS)", "WMS", "#3388ff", 0.8);
   * ```
   */
  openFor(layerId, layerTitle, layerType, initialFillColor, initialFillOpacity) {
    var _a2, _b;
    this.layerId = layerId;
    this.layerTitle = layerTitle;
    this.layerType = layerType;
    this._dataColumns = [];
    this._numericDataColumns = [];
    this._categorySort = DEFAULT_CATEGORY_SORT;
    const currentStyle = (_a2 = this.layerManager) == null ? void 0 : _a2.getLayerStyle(layerId);
    const form = deriveStyleEditorState(
      currentStyle,
      initialFillColor,
      initialFillOpacity,
      STYLE_EDITOR_FORM_DEFAULTS
    );
    this._colorMode = form.colorMode;
    this._fillModeBeforeOff = DEFAULT_COLOR_MODE;
    this._fillColor = form.fillColor;
    this._fillOpacity = form.fillOpacity;
    this._dataColumn = form.dataColumn;
    this._gradientPalette = form.gradientPalette;
    this._paletteReversed = form.paletteReversed;
    this._gradientMin = form.gradientMin;
    this._gradientMax = form.gradientMax;
    this._gradientMinError = "";
    this._gradientMaxError = "";
    this._binCount = form.binCount;
    this._categoryColors = form.categoryColors;
    this._categoryValues = this._sortCategoryValues(form.categoryValues);
    this._outlineEnabled = form.outlineEnabled;
    this._outlineColor = form.outlineColor;
    this._outlineWidth = form.outlineWidth;
    this._outlineOpacity = deriveOutlineOpacityPercent(currentStyle);
    const symbol = deriveSymbolFormState(currentStyle);
    this._pointShape = symbol.pointShape;
    this._pointSize = symbol.pointSize;
    this._pointCustomized = symbol.pointCustomized;
    this._lineDash = symbol.lineDash;
    this._geometryKinds = (_b = this.layerManager) == null ? void 0 : _b.getGeometryKinds(layerId);
    if (!this._cardLayout.outlineEnabledToggle) this._outlineEnabled = true;
    for (const panel of document.querySelectorAll(
      "tucbs-identify-panel"
    )) {
      panel.close();
    }
    this.open = true;
    this._serviceStyleRequestId++;
    if (!this._isServiceLayer) {
      this._loadDataColumns();
    }
  }
  get _isServiceLayer() {
    return SERVICE_LAYER_TYPES$1.includes(this.layerType);
  }
  // Cizim Katmani VE Olcu Katmani'nin fill modu her zaman "solid" kalir --
  // Renk Modu dropdown'u bu katmanlar icin gizlenir (bkz TucbsLayerList.ts'teki
  // ayni layerType kontrolu, renk noktasi/Lejant icin).
  get _isFixedSolidLayer() {
    return this.layerType === "DRAWING" || this.layerType === "MEASURE";
  }
  // Hangi kartlarin gosterilecegi (bkz symbolSpec.styleCardLayout).
  get _cardLayout() {
    return styleCardLayout(this._geometryKinds);
  }
  /**
   * Diger panel/dialoglarla karsilikli disari kapatma icin genel API (bkz TucbsLayerList).
   *
   * @example
   * ```ts
   * styleEditor.close();
   * ```
   */
  close() {
    this._close();
  }
  _close() {
    this.open = false;
    this.dispatchEvent(
      new CustomEvent("tucbs-style-editor-closed", {
        bubbles: true,
        composed: true
      })
    );
  }
  _reset() {
    var _a2, _b;
    this._colorMode = DEFAULT_COLOR_MODE;
    this._dataColumn = "";
    this._gradientMin = "";
    this._gradientMax = "";
    this._gradientMinError = "";
    this._gradientMaxError = "";
    this._gradientPalette = DEFAULT_GRADIENT_PALETTE;
    this._binCount = DEFAULT_BIN_COUNT;
    this._categorySort = DEFAULT_CATEGORY_SORT;
    this._paletteReversed = false;
    this._categoryValues = [];
    this._categoryColors = {};
    const initialColor = (_a2 = this.layerManager) == null ? void 0 : _a2.getInitialFillColor(this.layerId);
    this._fillColor = initialColor ? toHexColor(initialColor) : DEFAULT_FILL_COLOR;
    this._fillOpacity = this._isFixedSolidLayer ? FIXED_SOLID_LAYER_FILL_OPACITY : DEFAULT_FILL_OPACITY;
    this._outlineEnabled = DEFAULT_OUTLINE_ENABLED;
    this._outlineColor = DEFAULT_OUTLINE_COLOR;
    this._outlineWidth = this._isFixedSolidLayer ? FIXED_SOLID_LAYER_OUTLINE_WIDTH : DEFAULT_OUTLINE_WIDTH;
    this._outlineOpacity = 100;
    const defaults = deriveSymbolFormState(void 0);
    this._pointShape = defaults.pointShape;
    this._pointSize = defaults.pointSize;
    this._pointCustomized = ((_b = this._geometryKinds) == null ? void 0 : _b.point) === true;
    this._lineDash = defaults.lineDash;
    if (!this._isServiceLayer) this._scheduleApplyStyle();
  }
  // TucbsLayerList'teki katman opaklik bar'i ile ayni yaklasim: gorsel dolgu
  // aninda (Lit'e ugramadan) --fill CSS degiskeni ile guncellenir; asil
  // _fillOpacity state guncellemesi (ve dolayisiyla bunun tetikledigi
  // re-render) requestAnimationFrame ile frame basina en fazla bir kez
  // uygulanir. Bu, cds-slider'in her surukleme tikinde tam bir Lit
  // re-render'i tetikleyip yol actigi takilmayi ortadan kaldirir.
  _updateOpacitySlider(input, value) {
    input.style.setProperty("--fill", `${value}%`);
  }
  // Dolgu anahtari: kapatirken mevcut renk modu hatirlanir, acarken geri yuklenir
  // (sutun/palet/aralik state'i zaten korunur); kapaliyken stile mode:"off" yazilir.
  _setFillEnabled(enabled) {
    if (enabled) {
      this._colorMode = this._fillModeBeforeOff;
    } else if (this._colorMode !== "off") {
      this._fillModeBeforeOff = this._colorMode;
      this._colorMode = "off";
    }
    this._scheduleApplyStyle();
  }
  // Dolgu opakligiyla ayni RAF-throttle deseni (bkz _setFillOpacity).
  _setOutlineOpacity(value) {
    this._timers.cancelAnimationFrame(this._outlineOpacityRaf);
    this._outlineOpacityRaf = this._timers.requestAnimationFrame(() => {
      this._outlineOpacityRaf = null;
      this._outlineOpacity = value;
      this._scheduleApplyStyle();
    });
  }
  _setFillOpacity(value) {
    this._timers.cancelAnimationFrame(this._fillOpacityRaf);
    this._fillOpacityRaf = this._timers.requestAnimationFrame(() => {
      this._fillOpacityRaf = null;
      this._fillOpacity = value;
      this._scheduleApplyStyle();
    });
  }
  // ── Vektor stil (WFS/LOCAL): veri sutunu + canli onizleme ──────────────────
  _loadDataColumns() {
    if (!this.layerManager || !this.layerId) return;
    const names = this.layerManager.getEntityPropertyNames(this.layerId).filter((name) => !TECHNICAL_COLUMN_PATTERN.test(name));
    this._dataColumns = names;
    this._numericDataColumns = names.filter(
      (name) => this.layerManager.getColumnRange(this.layerId, name) !== null
    );
  }
  _onDataColumnChange(column) {
    this._dataColumn = column;
    if (!this.layerManager || !this.layerId || !column) return;
    if (this._colorMode === "gradient" || this._colorMode === "bin") {
      const range = this.layerManager.getColumnRange(this.layerId, column);
      this._gradientMin = range ? String(range.min) : "";
      this._gradientMax = range ? String(range.max) : "";
      this._gradientMinError = "";
      this._gradientMaxError = "";
    } else if (this._colorMode === "enum") {
      this._loadCategoryValues(column);
    }
    this._scheduleApplyStyle();
  }
  // Min/Max alanina yazilan degerin gecerliligi (veri araligi + Min <= Max);
  // kural ve gecmisi: bkz style-editor/fillStyleSpec.ts checkGradientBound()
  // (gercek hatalar plani H6.2 -- eskiden burada her tusta cagrilan
  // _clampGradientRange() vardi). Bu sarmalayici yalniz guncel sutun
  // araligini ve diger alanin son gecerli degerini toplar.
  _checkGradientBound(edited, value) {
    const range = this.layerManager && this.layerId && this._dataColumn ? this.layerManager.getColumnRange(this.layerId, this._dataColumn) : null;
    const other = edited === "min" ? this._gradientMax : this._gradientMin;
    return checkGradientBound(value, edited, other, range);
  }
  // Sutun secilmemisse/araligi henuz bilinmiyorsa temkinli davranip "-"
  // karakterine izin verilir (kullaniciyi erken engellememek icin); aralik
  // biliniyorsa sadece o alanin GERCEKTEN negatif bir deger alabilecegi
  // durumda izin verilir.
  _allowNegativeMin() {
    if (!this.layerManager || !this.layerId || !this._dataColumn) return true;
    const range = this.layerManager.getColumnRange(this.layerId, this._dataColumn);
    return !range || range.min < 0;
  }
  _allowNegativeMax() {
    if (!this.layerManager || !this.layerId || !this._dataColumn) return true;
    const range = this.layerManager.getColumnRange(this.layerId, this._dataColumn);
    return !range || range.max < 0;
  }
  // "Verideki sira" icin mevcut (zaten siralanmis) liste yeterli degil --
  // sortCategoryValues "source"ta girdiyi aynen dondurdugu icin secenek
  // hicbir sey yapmiyordu. Kaynak sira canli veriden (getUniqueColumnValues,
  // entity sirasi) alinip SADECE siralama icin kullanilir; "Degerler"in
  // kume icerigi (committed fill.colors) degismez, veride artik olmayan
  // degerler sona kalir.
  _sortCategoryValues(values) {
    if (this._categorySort !== "source") return sortCategoryValues(values, this._categorySort);
    if (!this.layerManager || !this.layerId || !this._dataColumn) return values;
    const order = /* @__PURE__ */ new Map();
    this.layerManager.getUniqueColumnValues(this.layerId, this._dataColumn).forEach((value, index) => order.set(String(value), index));
    const rank = (value) => order.get(String(value)) ?? Number.MAX_SAFE_INTEGER;
    return [...values].sort((a2, b2) => rank(a2) - rank(b2));
  }
  _loadCategoryValues(column) {
    if (!this.layerManager || !this.layerId) return;
    const raw = this.layerManager.getUniqueColumnValues(this.layerId, column);
    this._categoryValues = this._sortCategoryValues(raw);
    this._categoryColors = this._autoFillCategoryColors(this._categoryValues, this._categoryColors);
  }
  // Hesap artik style-editor/fillStyleSpec.ts'te (bkz sampleFromPaletteCss/hexToRgb/
  // sortCategoryValues WHY yorumlari; formatLegendNumber shared/util/legendFormat.ts'te) -- bu sarmalayici
  // aktif palet renklerini toplayip cagiriyor, davranis DEGISMEDI.
  _autoFillCategoryColors(values, existing) {
    return autoFillCategoryColors(values, existing, this._activePaletteColors());
  }
  // "Degerler"/"Lejant" listelerinin max-height'ini CSS'te SABIT bir
  // "N * tahmini-satir-yuksekligi" degeri olarak vermek (ilk denemede
  // yapilan buydu) kirilgan cikti -- Kategorik'in 28px'lik swatch'i ile
  // Lejant'in 16px'lik swatch'i arasindaki fark, metin etiketinin GERCEK
  // satir yuksekligi (font-size/line-height'a bagli, tahmin edilenden
  // farkli) yuzunden N. satirin TAM sigmayip alttan KIRPILMASINA yol
  // aciyordu (bkz kullanici bildirimi: "lejant satirlari alttan
  // kesilmesin"). Bunun yerine ILK IKI satirin GERCEK DOM konumlarini
  // olcup aralarindaki mesafeyi ("satir + bosluk" toplami) hesaplayip
  // max-height'i BUNDAN turetiyoruz -- font metrikleri/DOM ic ice
  // yerlesimi ne olursa olsun (Kategorik'te bosluk bir IC div'de, Lejant'ta
  // listenin KENDISINDE -- ikisi de farkli), TAM VISIBLE_LIST_ROWS satir
  // her zaman eksiksiz sigar, N+1. satirda scroll baslar.
  static _fitListToRows(list, rowSelector) {
    if (!list) return;
    const rows = list.querySelectorAll(rowSelector);
    if (rows.length === 0) {
      list.style.maxHeight = "";
      return;
    }
    const firstRect = rows[0].getBoundingClientRect();
    if (rows.length === 1) {
      list.style.maxHeight = `${firstRect.height}px`;
      return;
    }
    const secondRect = rows[1].getBoundingClientRect();
    const rowStride = secondRect.top - firstRect.top;
    const maxHeight = firstRect.height + rowStride * (VISIBLE_LIST_ROWS - 1);
    list.style.maxHeight = `${maxHeight}px`;
  }
  _activePaletteColors() {
    const palette = GRADIENT_PALETTES.find((p2) => p2.value === this._gradientPalette) ?? GRADIENT_PALETTES[0];
    return this._paletteReversed ? [...palette.colors].reverse() : palette.colors;
  }
  // exactOptionalPropertyTypes: true altinda "min: undefined" ile hic
  // key'in olmamasi FARKLI seyler -- bos birakilan min/max alanlari icin
  // key'i tamamen atlamamiz gerekiyor (LayerManager de "verilmemisse
  // otomatik hesapla" mantigini presence/absence uzerinden kuruyor).
  // Harita/Lejant'a GERCEKTEN uygulanan min/max degerinin, UI'daki herhangi
  // bir kenar durumundan (odak/render zamanlamasi, custom element tuhafliklari
  // vb.) bagimsiz olarak HER ZAMAN veri sutunundaki gercek araligin icinde
  // kalmasini garanti eden TEK yetkili nokta -- _checkGradientBound() sadece
  // UI'da YAZILAN degeri denetler, style-editor/fillStyleSpec.ts'teki
  // computeMinMax() (buildFillStyle() araciligiyla) ise FIILEN UYGULANAN
  // degeri.
  //
  // Hesap artik style-editor/fillStyleSpec.ts'teki buildFillStyle()'da -- bu
  // sarmalayici SADECE guncel form durumunu toplayip cagiriyor, davranis
  // DEGISMEDI (bkz o dosyadaki FillStyleFormState/buildFillStyle WHY yorumu).
  _buildFillStyle() {
    const range = this.layerManager && this.layerId && this._dataColumn ? this.layerManager.getColumnRange(this.layerId, this._dataColumn) : null;
    return buildFillStyle({
      colorMode: this._colorMode,
      fillOpacityPercent: this._fillOpacity,
      fillColor: this._fillColor,
      dataColumn: this._dataColumn,
      paletteColors: this._activePaletteColors(),
      paletteKind: paletteKindOf(this._gradientPalette),
      gradientMin: this._gradientMin,
      gradientMax: this._gradientMax,
      columnRange: range,
      binCount: Number(this._binCount) || Number(DEFAULT_BIN_COUNT),
      categoryColors: this._categoryColors
    });
  }
  // Opaklik slider'i ile ayni RAF-throttle deseni: surukleme/hizli ardisik
  // degisikliklerde frame basina en fazla bir kez LayerManager.applyLayerStyle()
  // cagirir (her tus vurusunda/renk secici hareketinde Cesium'un tum entity'leri
  // yeniden boyamasi pahali).
  // outlineWidthOverride: Genislik alanina YAZARKEN (bkz asagidaki @input)
  // canli onizleme icin -- _outlineWidth (bir @state) o sirada BILEREK
  // GUNCELLENMEZ (Carbon'un type="text" "set value()" metodu her deger
  // atamasinda yeniden formatlayip kullanicinin yazdigini bozuyordu, bkz
  // Genislik alanindaki @input yorumu), bu yuzden HAM DOM metni buraya
  // dogrudan gecirilip _outlineWidth'i ETKILEMEDEN uygulanir. Verilmezse
  // (varsayilan) mevcut _outlineWidth state'i kullanilir.
  //
  // ONEMLI (bkz kullanici bildirimi: "oklar ile hizli hizli artirip
  // azaltirken geriden geliyor"): cagrilar bir animasyon karesinden DAHA
  // SIK gelirse (Genislik +/- oklarina hizli ardisik tiklama/klavye tekrari)
  // ONCEKI surum HER cagrida PENDING RAF'i iptal edip YENIDEN planliyordu --
  // bu, sureklilik gosteren bir seri cagri sirasinda planlanan callback'in
  // calisma sirasinin surekli ILERIYE itilip HICBIR ZAMAN gelmemesine (yani
  // kullanici DURANA kadar haritada hicbir guncelleme gorunmemesine) yol
  // aciyordu. Duzeltme: bir RAF ZATEN planliysa yeniden planlamiyoruz --
  // sadece "o an uygulanacak en guncel deger"i (_pendingOutlineWidthOverride)
  // guncelliyoruz; bu, sureklilik gosteren bir seri boyunca bile EN AZ
  // frame basina bir guncelleme GARANTI eder.
  _scheduleApplyStyle(outlineWidthOverride) {
    if (!this.layerManager || !this.layerId || this._isServiceLayer) return;
    if (outlineWidthOverride !== void 0) {
      this._pendingOutlineWidthOverride = outlineWidthOverride;
    }
    if (this._applyStyleRaf !== null) return;
    this._applyStyleRaf = this._timers.requestAnimationFrame(() => {
      this._applyStyleRaf = null;
      const widthOverride = this._pendingOutlineWidthOverride;
      this._pendingOutlineWidthOverride = void 0;
      const point = buildPointSymbol({
        pointCustomized: this._pointCustomized,
        pointShape: this._pointShape,
        pointSize: this._pointSize
      });
      const spec = {
        fill: this._buildFillStyle(),
        outline: {
          enabled: this._outlineEnabled,
          color: this._outlineColor,
          width: Number(widthOverride ?? this._outlineWidth) || Number(DEFAULT_OUTLINE_WIDTH),
          ...buildLineDash(this._lineDash),
          ...buildOutlineOpacity(this._outlineOpacity)
        },
        ...point !== void 0 ? { point } : {}
      };
      void this.layerManager.applyLayerStyle(this.layerId, spec);
    });
  }
  // Kategorik (Enum) modunda "Degerler" (kategori->renk lejanti) ARTIK
  // Dolgu kartinin ICINDE degil, kendi bagimsiz karti olarak Dis Hat'in
  // SAGINDA render edilir -- listenin boyu (5'e kadar item, sonrasi
  // scroll -- bkz. .category-values-list) Dolgu kartini Dis Hat'tan cok
  // daha uzun yapip iki karti dengesiz gosteriyordu (kullanici bildirimi).
  // Sadece bu modda ve en az 1 deger kesfedildiyse gorunur -- diger HICBIR
  // modda (solid/gradient/bin/off) boyle bir liste zaten yok.
  _renderCategoryList() {
    if (!(this._colorMode === "enum" && this._categoryValues.length > 0)) return "";
    return b`
      <div class="card">
        <span class="card-title">Değerler</span>
        <div class="category-values-wrap">
          <div
            class="category-values-list"
            @scroll=${() => this._categoryScroll.sync()}
          >
            <div style="display:flex; flex-direction:column; gap:0.5rem;">
              ${this._categoryValues.map(
      (value) => b`
                  <div class="legend-bin-row">
                    <span class="legend-swatch" style="background:${this._categoryColors[String(value)] ?? DEFAULT_FILL_COLOR}"></span>
                    <span class="legend-value" title=${String(value)}>${String(value)}</span>
                  </div>
                `
    )}
            </div>
          </div>
          <div
            class="category-scroll-thumb"
            @pointerdown=${(event) => this._categoryScroll.startDrag(event)}
          ></div>
        </div>
      </div>
    `;
  }
  // Surekli (Gradient) ve Kesikli (Bin) icin de -- Kategorik (Enum) ile AYNI
  // "3. kart" yerinde (Dis Hat'in saginda) -- min/max ile renk arasindaki
  // eslesmeyi gosteren bir Lejant karti (bkz kullanici bildirimi:
  // "Gradient/Bin'de Lejant cikmiyor, gozukmesi lazim"). Enum'daki
  // "Degerler" kartinin aksine bu SADECE goruntuleme amacli (gradient/bin
  // renkleri palet+min/max alanlarindan turetiliyor, tek tek duzenlenmiyor).
  // Min/max henuz cozulmediyse (orn. veri sutunu henuz secilmediyse)
  // gosterilecek bir sey yok.
  _renderLegendCard() {
    const range = this.layerManager && this.layerId && this._dataColumn ? this.layerManager.getColumnRange(this.layerId, this._dataColumn) : null;
    const typedMin = this._gradientMin !== "" ? Number(this._gradientMin) : void 0;
    const typedMax = this._gradientMax !== "" ? Number(this._gradientMax) : void 0;
    const min = typedMin !== void 0 && Number.isFinite(typedMin) ? typedMin : range == null ? void 0 : range.min;
    const max = typedMax !== void 0 && Number.isFinite(typedMax) ? typedMax : range == null ? void 0 : range.max;
    if (min === void 0 || max === void 0) {
      return "";
    }
    if (this._colorMode === "gradient") {
      const colors = this._activePaletteColors();
      const kind = paletteKindOf(this._gradientPalette);
      return b`
        <div class="card">
          <span class="card-title">Lejant</span>
          <div class="legend-bin-wrap">
            <div
              class="legend-bin-list"
              @scroll=${() => this._legendScroll.sync()}
            >
              ${gradientLegendRows(min, max, (t3) => sampleFromPaletteCss(colors, t3, kind)).map(
        (row) => b`
                  <div class="legend-bin-row">
                    <span class="legend-swatch" style="background:${row.color}"></span>
                    <span class="legend-value">${row.label}</span>
                  </div>
                `
      )}
            </div>
            <div
              class="legend-scroll-thumb"
              @pointerdown=${(event) => this._legendScroll.startDrag(event)}
            ></div>
          </div>
        </div>
      `;
    }
    if (this._colorMode === "bin") {
      const binCount = Number(this._binCount) || Number(DEFAULT_BIN_COUNT);
      const colors = this._activePaletteColors();
      const kind = paletteKindOf(this._gradientPalette);
      return b`
        <div class="card">
          <span class="card-title">Lejant</span>
          <div class="legend-bin-wrap">
            <div
              class="legend-bin-list"
              @scroll=${() => this._legendScroll.sync()}
            >
              ${binLegendRows(min, max, binCount, (t3) => sampleFromPaletteCss(colors, t3, kind)).map(
        (row) => b`
                  <div class="legend-bin-row">
                    <span class="legend-swatch" style="background:${row.color}"></span>
                    <span class="legend-value">${row.label}</span>
                  </div>
                `
      )}
            </div>
            <div
              class="legend-scroll-thumb"
              @pointerdown=${(event) => this._legendScroll.startDrag(event)}
            ></div>
          </div>
        </div>
      `;
    }
    return "";
  }
  /** Bileşenin şablonunu render eder (`open` false ise boş şablon). */
  render() {
    if (!this.open) return b``;
    return b`
      <div class="panel">
        <div class="header" @pointerdown=${(event) => this._drag.start(event)}>
          <div class="header-title-group">
            <span class="header-icon">${ICON_PALETTE_20}</span>
            <div class="header-text">
              <span class="title">Stil Düzenle</span>
              <span class="subtitle" title=${this.layerTitle}>${this.layerTitle}</span>
            </div>
          </div>
          <button type="button" class="close-btn" aria-label="Kapat" @click=${() => this._close()}>
            ${ICON_CLOSE$7}
          </button>
        </div>

        <div class="body">
          <div class="section-header">
            <span class="section-header-title">Katman Stili</span>
            <button type="button" class="reset-btn" @click=${() => this._reset()}>
              ${ICON_RENEW$1} Sıfırla
            </button>
          </div>

          <div class="style-cards">
            ${this._isServiceLayer ? b`
                  <tucbs-service-style-card
                    .layerManager=${this.layerManager}
                    layerId=${this.layerId}
                    layerType=${this.layerType}
                    .requestId=${this._serviceStyleRequestId}
                  ></tucbs-service-style-card>
                ` : b`${this._cardLayout.fill ? renderFillCard(this._fillCardHost) : ""}${this._renderOutlineCard()}${this._cardLayout.symbol ? renderSymbolCard(
      this._symbolCardHost,
      { point: this._cardLayout.symbolPoint, dash: this._cardLayout.symbolDash }
    ) : ""}${this._renderCategoryList()}${this._renderLegendCard()}`}
          </div>
        </div>
      </div>
    `;
  }
  // "Kalınlık" alanı: Dış Hat kartında (nokta/poligon) ya da yalnız-çizgi
  // katmanında Sembol kartında gösterilir (bkz symbolSpec.styleCardLayout).
  _renderOutlineWidthField() {
    return b`
              <div>
                <span class="field-label">Kalınlık</span>
                <cds-number-input
                  size="sm"
                  type="text"
                  locale="en"
                  label="Kalınlık"
                  hide-label
                  min="0.5"
                  max="50"
                  step="0.5"
                  .value=${this._outlineWidth}
                  ?disabled=${!this._outlineEnabled}
                  @input=${(event) => {
      const target = event.target;
      let cleaned = target.value.replace(/[^\d.]/g, "");
      const firstDot = cleaned.indexOf(".");
      if (firstDot !== -1) {
        cleaned = cleaned.slice(0, firstDot + 1) + cleaned.slice(firstDot + 1).replaceAll(".", "");
      }
      if (target.value !== cleaned) target.value = cleaned;
      this._scheduleApplyStyle(cleaned);
    }}
                  @cds-number-input=${(event) => {
      if (!event.detail.direction) return;
      const parsed = Number(event.detail.value);
      if (!Number.isNaN(parsed)) this._outlineWidth = String(parsed);
      this._scheduleApplyStyle();
    }}
                  @focusout=${(event) => {
      const target = event.target;
      const parsed = Number(target.value);
      const clamped = String(
        Number.isFinite(parsed) && parsed > 0 ? Math.min(50, Math.max(0.5, parsed)) : Number(DEFAULT_OUTLINE_WIDTH)
      );
      this._outlineWidth = clamped;
      target.value = clamped;
      this._scheduleApplyStyle();
    }}
                ></cds-number-input>
              </div>
    `;
  }
  _renderOutlineCard() {
    return b`
            <div class="card">
              ${renderCardHeader(
      this._cardLayout.outlineTitle,
      this._cardLayout.outlineEnabledToggle ? {
        checked: this._outlineEnabled,
        label: this._cardLayout.outlineTitle,
        onChange: (enabled) => {
          this._outlineEnabled = enabled;
          this._scheduleApplyStyle();
        }
      } : void 0
    )}

              <div class="card-body" ?inert=${!this._outlineEnabled}>
              <div>
                <span class="field-label">Renk Paleti</span>
                <span class="color-swatch" style="background:${this._outlineColor}">
                  <input
                    type="color"
                    .value=${this._outlineColor}
                    aria-label="Dış hat rengi"
                    ?disabled=${!this._outlineEnabled}
                    @input=${(event) => {
      this._outlineColor = event.target.value;
      this._scheduleApplyStyle();
    }}
                  />
                </span>
              </div>

              <div style="margin-top: 8px">
                <span class="field-label">Opaklık (${this._outlineOpacity}%)</span>
                <input
                  type="range"
                  class="opacity-slider"
                  min="0"
                  max="100"
                  step="1"
                  aria-label="Dış hat opaklığı"
                  .value=${String(this._outlineOpacity)}
                  style="--fill: ${this._outlineOpacity}%"
                  ?disabled=${!this._outlineEnabled}
                  @input=${(event) => {
      const input = event.target;
      const value = Number(input.value);
      this._updateOpacitySlider(input, value);
      this._setOutlineOpacity(value);
    }}
                />
              </div>

              ${this._renderOutlineWidthField()}

              </div>
            </div>
    `;
  }
};
TucbsStyleEditor.styles = styleEditorStyles;
__decorateClass$y([
  n$1({ type: Boolean, reflect: true })
], TucbsStyleEditor.prototype, "open", 2);
__decorateClass$y([
  n$1({ attribute: false })
], TucbsStyleEditor.prototype, "layerManager", 2);
__decorateClass$y([
  n$1()
], TucbsStyleEditor.prototype, "layerId", 2);
__decorateClass$y([
  n$1()
], TucbsStyleEditor.prototype, "layerTitle", 2);
__decorateClass$y([
  n$1()
], TucbsStyleEditor.prototype, "layerType", 2);
__decorateClass$y([
  n$1({ attribute: "custom-css" })
], TucbsStyleEditor.prototype, "customCss", 2);
__decorateClass$y([
  r()
], TucbsStyleEditor.prototype, "_colorMode", 2);
__decorateClass$y([
  r()
], TucbsStyleEditor.prototype, "_dataColumn", 2);
__decorateClass$y([
  r()
], TucbsStyleEditor.prototype, "_dataColumns", 2);
__decorateClass$y([
  r()
], TucbsStyleEditor.prototype, "_numericDataColumns", 2);
__decorateClass$y([
  r()
], TucbsStyleEditor.prototype, "_gradientPalette", 2);
__decorateClass$y([
  r()
], TucbsStyleEditor.prototype, "_gradientMin", 2);
__decorateClass$y([
  r()
], TucbsStyleEditor.prototype, "_gradientMax", 2);
__decorateClass$y([
  r()
], TucbsStyleEditor.prototype, "_gradientMinError", 2);
__decorateClass$y([
  r()
], TucbsStyleEditor.prototype, "_gradientMaxError", 2);
__decorateClass$y([
  r()
], TucbsStyleEditor.prototype, "_binCount", 2);
__decorateClass$y([
  r()
], TucbsStyleEditor.prototype, "_categorySort", 2);
__decorateClass$y([
  r()
], TucbsStyleEditor.prototype, "_paletteReversed", 2);
__decorateClass$y([
  r()
], TucbsStyleEditor.prototype, "_categoryValues", 2);
__decorateClass$y([
  r()
], TucbsStyleEditor.prototype, "_categoryColors", 2);
__decorateClass$y([
  r()
], TucbsStyleEditor.prototype, "_fillColor", 2);
__decorateClass$y([
  r()
], TucbsStyleEditor.prototype, "_fillOpacity", 2);
__decorateClass$y([
  r()
], TucbsStyleEditor.prototype, "_outlineEnabled", 2);
__decorateClass$y([
  r()
], TucbsStyleEditor.prototype, "_outlineColor", 2);
__decorateClass$y([
  r()
], TucbsStyleEditor.prototype, "_outlineWidth", 2);
__decorateClass$y([
  r()
], TucbsStyleEditor.prototype, "_outlineOpacity", 2);
__decorateClass$y([
  r()
], TucbsStyleEditor.prototype, "_pointShape", 2);
__decorateClass$y([
  r()
], TucbsStyleEditor.prototype, "_pointSize", 2);
__decorateClass$y([
  r()
], TucbsStyleEditor.prototype, "_pointCustomized", 2);
__decorateClass$y([
  r()
], TucbsStyleEditor.prototype, "_lineDash", 2);
__decorateClass$y([
  r()
], TucbsStyleEditor.prototype, "_geometryKinds", 2);
__decorateClass$y([
  r()
], TucbsStyleEditor.prototype, "_serviceStyleRequestId", 2);
__decorateClass$y([
  e$3(".category-values-list")
], TucbsStyleEditor.prototype, "_categoryListEl", 2);
__decorateClass$y([
  e$3(".category-scroll-thumb")
], TucbsStyleEditor.prototype, "_categoryThumbEl", 2);
__decorateClass$y([
  e$3(".legend-bin-list")
], TucbsStyleEditor.prototype, "_legendListEl", 2);
__decorateClass$y([
  e$3(".legend-scroll-thumb")
], TucbsStyleEditor.prototype, "_legendThumbEl", 2);
TucbsStyleEditor = __decorateClass$y([
  t$3("tucbs-style-editor")
], TucbsStyleEditor);
var __defProp$w = Object.defineProperty;
var __getOwnPropDesc$x = Object.getOwnPropertyDescriptor;
var __decorateClass$x = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$x(target, key) : target;
  for (var i4 = decorators.length - 1, decorator; i4 >= 0; i4--)
    if (decorator = decorators[i4])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$w(target, key, result);
  return result;
};
const SERVICE_LAYER_TYPES = ["WMS", "WMTS"];
let TucbsLegendPanel = class extends i$3 {
  constructor() {
    super(...arguments);
    this.layerId = "";
    this.layerType = "";
    this.open = false;
    this.customCss = "";
    this._legendUrl = "";
    this._loading = false;
    this._error = "";
    this._customCssState = { sheet: null };
    this._listScroll = new VirtualScrollbar(
      this,
      () => this._listEl,
      () => this._thumbEl
    );
    this._timers = new TimerBag(this);
    this._onLayerStyle = (event) => {
      if (event.id === this.layerId) this._vectorStyle = event.style;
    };
  }
  get _isServiceLayer() {
    return SERVICE_LAYER_TYPES.includes(this.layerType);
  }
  /**
   * Lit yaşam döngüsü: `layerManager` değiştiğinde `layer:style` olay
   * aboneliğini yeniler, `layerId`/`layerType`/`layerManager` değiştiğinde
   * lejantı yeniden yükler, `customCss` değiştiğinde shadow DOM'a stili
   * uygular; her render sonrası liste yüksekliğini ve scroll göstergesini
   * yeniden hesaplar.
   *
   * @param changed - Değişen property'lerin önceki değerlerini içeren harita (Lit tarafından sağlanır).
   */
  updated(changed) {
    var _a2, _b;
    if (changed.has("layerManager")) {
      const previous = changed.get("layerManager");
      previous == null ? void 0 : previous.off("layer:style", this._onLayerStyle);
      (_a2 = this.layerManager) == null ? void 0 : _a2.on("layer:style", this._onLayerStyle);
    }
    if (changed.has("layerId") || changed.has("layerType") || changed.has("layerManager")) {
      this._vectorStyle = (_b = this.layerManager) == null ? void 0 : _b.getLayerStyle(this.layerId);
      void this._loadLegend();
    }
    if (changed.has("customCss")) {
      applyCustomCss(this.shadowRoot, this.customCss, this._customCssState, "tucbs-legend-panel");
    }
    this._timers.requestAnimationFrame(() => {
      TucbsLegendPanel._fitListToRows(this._listEl);
      this._listScroll.sync();
    });
  }
  /** Bileşen DOM'dan kaldırılırken `layerManager` üzerindeki `layer:style` olay aboneliğini temizler. */
  disconnectedCallback() {
    var _a2;
    (_a2 = this.layerManager) == null ? void 0 : _a2.off("layer:style", this._onLayerStyle);
    super.disconnectedCallback();
  }
  async _loadLegend() {
    var _a2;
    this._legendUrl = "";
    this._error = "";
    if (!this.layerManager || !this.layerId || !this._isServiceLayer) return;
    this._loading = true;
    try {
      if (this.layerType === "WMS") {
        this._legendUrl = this.layerManager.getWmsLegendGraphicUrl(this.layerId);
      } else {
        const styles = await this.layerManager.getWmtsAvailableStyles(this.layerId);
        this._legendUrl = ((_a2 = styles[0]) == null ? void 0 : _a2.legendUrl) ?? "";
      }
    } catch (error) {
      if (error instanceof TucbsError) {
        console.error(`[tucbs-legend-panel] ${error.code} (${error.number}): ${error.message}`);
      }
      this._error = error instanceof Error ? error.message : "Lejant yüklenemedi.";
    } finally {
      this._loading = false;
    }
  }
  /** Panel kapalıysa boş, açıksa servis (WMS/WMTS) veya vektör katman lejantını render eder. */
  render() {
    if (!this.open) return b``;
    return b`
      <div class="legend">
        <span class="legend-title">Lejant</span>
        ${this._isServiceLayer ? this._renderServiceLegend() : this._renderVectorLegend()}
      </div>
    `;
  }
  _renderServiceLegend() {
    if (this._loading) return b`<span class="legend-empty">Yükleniyor…</span>`;
    if (this._error) return b`<span class="legend-empty" style="color:#da1e28;">${this._error}</span>`;
    if (!this._legendUrl) return b`<span class="legend-empty">Lejant bulunamadı.</span>`;
    return b`<img class="legend-image" src=${this._legendUrl} alt="Lejant" />`;
  }
  // Min/Max "Otomatik" (bos) birakildiginda TucbsStyleEditor'un gonderdigi
  // FillStyle'da min/max key'i HIC yer almaz (bkz TucbsStyleEditor._minMax())
  // -- bu, "araligi HESAPLAYAMADIK" ile "kullanici bilerek otomatik
  // hesaplanmasini istedi" arasindaki farki KAYBEDERDI: eskiden ikisi de
  // ayni "Aralık hesaplanamadı" mesajina dusuyordu (bkz kullanici bildirimi:
  // "Otomatik moda gecince Stil Editördeki Lejant panelini kaldırıyorsun").
  // Eksik ucu, TucbsStyleEditor'un otomatik degeri populate ederken
  // kullandigi AYNI kaynaktan (LayerManager.getColumnRange) tamamlariz.
  _resolveGradientRange(column, min, max) {
    var _a2;
    if (min !== void 0 && max !== void 0) return { min, max };
    const range = (_a2 = this.layerManager) == null ? void 0 : _a2.getColumnRange(this.layerId, column);
    if (!range) return void 0;
    return { min: min ?? range.min, max: max ?? range.max };
  }
  _renderVectorLegend() {
    const style = this._vectorStyle;
    if (!style) return b`<span class="legend-empty">Henüz stil uygulanmadı.</span>`;
    switch (style.fill.mode) {
      case "gradient": {
        const { palette, paletteKind, column } = style.fill;
        const resolved = this._resolveGradientRange(column, style.fill.min, style.fill.max);
        if (!resolved) {
          return b`<span class="legend-empty">Aralık hesaplanamadı.</span>`;
        }
        const { min, max } = resolved;
        return this._renderScrollableRows(
          gradientLegendRows(min, max, (t3) => sampleFromPaletteCss(palette, t3, paletteKind))
        );
      }
      case "bin": {
        const { palette, binCount, paletteKind, column } = style.fill;
        const resolved = this._resolveGradientRange(column, style.fill.min, style.fill.max);
        if (!resolved) {
          return b`<span class="legend-empty">Aralık hesaplanamadı.</span>`;
        }
        const { min, max } = resolved;
        return this._renderScrollableRows(
          binLegendRows(min, max, binCount, (t3) => sampleFromPaletteCss(palette, t3, paletteKind))
        );
      }
      case "enum": {
        const entries = Object.entries(style.fill.colors);
        if (entries.length === 0) return b`<span class="legend-empty">Kategori bulunamadı.</span>`;
        const sorted = [...entries].sort(([a2], [b2]) => compareCategoryKeys(a2, b2));
        return this._renderScrollableRows(
          sorted.map(([value, color]) => ({ color, label: value }))
        );
      }
      case "solid":
      case "off":
      default:
        return b`<span class="legend-empty">Bu katman sabit renkli, lejant gerekmiyor.</span>`;
    }
  }
  // gradient/bin/enum'un UCU -- kod tekrarindan kacinmak icin TucbsStyleEditor.
  // ts'deki .legend-bin-wrap/.legend-bin-list/.legend-scroll-thumb desenini
  // (bkz o dosyadaki yorumlar) TEK yerden uretir. Kategorik'te (entries)
  // deger onlarca/yuzlerce olabilir ve VISIBLE_LIST_ROWS'u asip scroll'a
  // duser (bkz kullanici bildirimi); Gradient/Bin bu esige HICBIR ZAMAN
  // ulasmaz ama AYNI yapiyi paylasir.
  _renderScrollableRows(rows) {
    return b`
      <div class="legend-bin-wrap">
        <div class="legend-bin-list" @scroll=${() => this._listScroll.sync()}>
          ${rows.map(
      (row) => b`
              <div class="legend-bin-row">
                <span class="legend-swatch" style="background:${row.color}"></span>
                <span class="legend-value" title=${row.label}>${row.label}</span>
              </div>
            `
    )}
        </div>
        <div
          class="legend-scroll-thumb"
          @pointerdown=${(event) => this._listScroll.startDrag(event)}
        ></div>
      </div>
    `;
  }
  // TucbsStyleEditor.ts'deki _fitListToRows ile BIREBIR AYNI teknik: CSS'te
  // SABIT bir "N * tahmini-satir-yuksekligi" degeri kirilgan (font metrikleri
  // tahmin edilenden farkli olabilir, satirlar altta KIRPILIR); bunun yerine
  // ILK IKI satirin GERCEK DOM konumlari olculup aralarindaki mesafe
  // ("satir + bosluk" toplami) hesaplanir.
  static _fitListToRows(list) {
    if (!list) return;
    const rows = list.querySelectorAll(".legend-bin-row");
    if (rows.length === 0) {
      list.style.maxHeight = "";
      return;
    }
    const firstRect = rows[0].getBoundingClientRect();
    if (rows.length === 1) {
      list.style.maxHeight = `${firstRect.height}px`;
      return;
    }
    const secondRect = rows[1].getBoundingClientRect();
    const rowStride = secondRect.top - firstRect.top;
    list.style.maxHeight = `${firstRect.height + rowStride * (TucbsLegendPanel.VISIBLE_LIST_ROWS - 1)}px`;
  }
};
TucbsLegendPanel.styles = i$6`
    :host {
      display: block;
      font-family: "IBM Plex Sans", system-ui, sans-serif;
      font-size: 0.75rem;
      color: var(--cds-text-primary, #161616);
    }

    .legend {
      display: flex;
      flex-direction: column;
      gap: 0.375rem;
      padding: 0.5rem 1rem 0.5rem 24px;
      background: var(--cds-layer-01, #ffffff);
      border-top: 1px solid var(--cds-border-subtle, #e0e0e0);
    }

    .legend-title {
      margin-bottom: 0.125rem;
      color: var(--cds-text-secondary, #525252);
      font-weight: 600;
    }

    .legend-empty {
      color: var(--cds-text-secondary, #525252);
    }

    .legend-image {
      max-width: 220px;
      display: block;
    }

    /* Surekli (Gradient)/Kesikli (Bin)/Kategorik (Enum) satir listesi --
       TucbsStyleEditor.ts'deki .legend-bin-wrap/.legend-bin-list/
       .legend-scroll-thumb ile AYNI ozel scroll-thumb deseni (native
       scrollbar tamamen gizli, gorunen gostergeyi JS ile kendimiz
       ciziyoruz -- bkz _listScroll/_fitListToRows). Kategorik'te
       kategori sayisi veriden gelir (onlarca/yuzlerce olabilir, orn. 195
       ulke) ve VISIBLE_LIST_ROWS'u kolayca asar; Gradient (sabit
       GRADIENT_LEGEND_STEPS=7) ve Bin (en fazla 9, bkz TucbsStyleEditor'un
       Bin Sayisi tavani) bu esige HICBIR ZAMAN ulasmaz ama AYNI yapiyi
       (kod tekrarindan kacinmak icin) paylasir. */
    .legend-bin-wrap {
      position: relative;
      width: 220px;
    }

    .legend-bin-list {
      display: flex;
      flex-direction: column;
      gap: 0.375rem;
      overflow-y: auto;
      scrollbar-width: none;
      padding-right: 0.75rem;
    }

    .legend-bin-list::-webkit-scrollbar {
      display: none;
    }

    .legend-scroll-thumb {
      position: absolute;
      top: 0;
      right: 2px;
      width: 6px;
      border-radius: 3px;
      background: var(--cds-border-strong, #8d8d8d);
      cursor: grab;
      touch-action: none;
      display: none;
    }

    .legend-scroll-thumb:active {
      cursor: grabbing;
      background: var(--cds-icon-primary, #161616);
    }

    .legend-bin-row {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .legend-swatch {
      flex: none;
      width: 12px;
      height: 12px;
      border-radius: 2px;
    }

    .legend-value {
      color: var(--cds-text-primary, #161616);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  `;
TucbsLegendPanel.VISIBLE_LIST_ROWS = 10;
__decorateClass$x([
  n$1()
], TucbsLegendPanel.prototype, "layerId", 2);
__decorateClass$x([
  n$1()
], TucbsLegendPanel.prototype, "layerType", 2);
__decorateClass$x([
  n$1({ attribute: false })
], TucbsLegendPanel.prototype, "layerManager", 2);
__decorateClass$x([
  n$1({ type: Boolean, reflect: true })
], TucbsLegendPanel.prototype, "open", 2);
__decorateClass$x([
  n$1({ attribute: "custom-css" })
], TucbsLegendPanel.prototype, "customCss", 2);
__decorateClass$x([
  r()
], TucbsLegendPanel.prototype, "_legendUrl", 2);
__decorateClass$x([
  r()
], TucbsLegendPanel.prototype, "_loading", 2);
__decorateClass$x([
  r()
], TucbsLegendPanel.prototype, "_error", 2);
__decorateClass$x([
  r()
], TucbsLegendPanel.prototype, "_vectorStyle", 2);
__decorateClass$x([
  e$3(".legend-bin-list")
], TucbsLegendPanel.prototype, "_listEl", 2);
__decorateClass$x([
  e$3(".legend-scroll-thumb")
], TucbsLegendPanel.prototype, "_thumbEl", 2);
TucbsLegendPanel = __decorateClass$x([
  t$3("tucbs-legend-panel")
], TucbsLegendPanel);
var __defProp$v = Object.defineProperty;
var __getOwnPropDesc$w = Object.getOwnPropertyDescriptor;
var __decorateClass$w = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$w(target, key) : target;
  for (var i4 = decorators.length - 1, decorator; i4 >= 0; i4--)
    if (decorator = decorators[i4])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$v(target, key, result);
  return result;
};
const ICON_CLOSE$6 = o$1(iconNodeToString(_16_default$v));
let TucbsSlideOverPanel = class extends i$3 {
  constructor() {
    super(...arguments);
    this.panelTitle = "";
    this.side = "right";
    this.open = false;
    this.panelWidth = "360px";
    this.customCss = "";
    this.scrollBody = true;
    this.closable = true;
    this._customCssState = { sheet: null };
  }
  /** `customCss` değiştiğinde özel CSS'i shadow DOM'a yeniden uygular. */
  updated(changed) {
    if (changed.has("customCss")) {
      applyCustomCss(this.shadowRoot, this.customCss, this._customCssState, "tucbs-slide-over-panel");
    }
  }
  _close() {
    var _a2;
    (_a2 = this.onCloseRequest) == null ? void 0 : _a2.call(this);
  }
  render() {
    return b`
      <aside
        class="panel ${this.open ? "open" : ""}"
        style="width: ${this.panelWidth}"
        ?inert=${!this.open}
        aria-hidden=${this.open ? A : "true"}
      >
        <div class="panel-header">
          <div class="panel-title">
            <slot name="icon"></slot>
            <span>${this.panelTitle}</span>
          </div>
          ${this.closable ? b`<button type="button" class="panel-close-btn" aria-label="Kapat" @click=${this._close}>
                ${ICON_CLOSE$6}
              </button>` : A}
        </div>
        <div class="panel-body" style="overflow-y: ${this.scrollBody ? "auto" : "visible"}">
          <slot></slot>
        </div>
      </aside>
    `;
  }
};
TucbsSlideOverPanel.styles = i$6`
    :host {
      display: block;
      font-family: "IBM Plex Sans", system-ui, sans-serif;
      font-size: 0.875rem;
      color: var(--cds-text-primary, #161616);
      --cds-focus: transparent;
    }

    .panel {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: 999;
      display: flex;
      flex-direction: column;
      background: var(--cds-layer-01, #ffffff);
      border-left: 1px solid var(--cds-border-subtle, #e0e0e0);
      box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);
      transform: translateX(100%);
      transition: transform 240ms cubic-bezier(0.2, 0, 0.38, 0.9);
    }

    .panel.open {
      transform: translateX(0);
    }

    /* "side" (varsayilan "right"): panelin hangi ekran kenarindan
       acildigini/kapaninca hangi yone kaydigini belirler -- Ayarlar paneli
       sagdan/sola, TucbsLayerList'in "Katman Yonetimi"'i (bkz.
       TucbsLayerList.ts) soldan/saga acilir. Sadece konum/kayma yonu
       (left/right, translateX isareti, kenarlik/golge yonu) degisir; geri
       kalan her sey (baslik, kapatma butonu, govde) AYNI. */
    :host([side="left"]) .panel {
      right: auto;
      left: 0;
      border-left: none;
      border-right: 1px solid var(--cds-border-subtle, #e0e0e0);
      box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
      transform: translateX(-100%);
    }

    :host([side="left"]) .panel.open {
      transform: translateX(0);
    }

    .panel-header {
      flex: none;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.5rem;
      padding: 1rem 1.25rem;
      min-height: 3.5rem;
      box-sizing: border-box;
    }

    .panel-title {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      min-width: 0;
      font-size: 1rem;
      font-weight: 600;
      line-height: 1.25;
    }

    .panel-title > span {
      display: inline-flex;
      align-items: center;
      line-height: 1.25;
    }

    ::slotted([slot="icon"]) {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex: none;
      width: 1.25rem;
      height: 1.25rem;
      line-height: 0;
      color: #0f62fe;
    }

    .panel-close-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 2.5rem;
      height: 2.5rem;
      flex: none;
      border: none;
      border-radius: 6px;
      background: transparent;
      color: var(--cds-icon-secondary, #525252);
      cursor: pointer;
    }

    .panel-close-btn:hover {
      background: var(--cds-layer-hover-01, #f4f4f4);
      color: var(--cds-icon-primary, #161616);
    }

    .panel-close-btn svg {
      width: 1.25rem;
      height: 1.25rem;
      display: block;
    }

    /* Icerik tam beyaz bir zemine, dikey olarak aralikli (gap) kartlar
       seklinde yerlesir -- tuketicinin gomdugu her bilesen (bkz.
       TucbsSettingsTool) KENDI hafifce farkli tonlu (#fafcfd) kart
       govdesini bu beyaz zemine karsi gosterir; boylece birden fazla ayar
       grubu birbirinden net sekilde ayrisir (ic cizgi/divider yerine
       bosluk+ince kontrast ile). */
    .panel-body {
      flex: 1;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;
      background: var(--cds-layer-01, #ffffff);
    }
  `;
__decorateClass$w([
  n$1()
], TucbsSlideOverPanel.prototype, "panelTitle", 2);
__decorateClass$w([
  n$1({ reflect: true })
], TucbsSlideOverPanel.prototype, "side", 2);
__decorateClass$w([
  n$1({ type: Boolean, reflect: true })
], TucbsSlideOverPanel.prototype, "open", 2);
__decorateClass$w([
  n$1({ attribute: "panel-width" })
], TucbsSlideOverPanel.prototype, "panelWidth", 2);
__decorateClass$w([
  n$1({ attribute: "custom-css" })
], TucbsSlideOverPanel.prototype, "customCss", 2);
__decorateClass$w([
  n$1({ type: Boolean, attribute: "scroll-body" })
], TucbsSlideOverPanel.prototype, "scrollBody", 2);
__decorateClass$w([
  n$1({ attribute: false })
], TucbsSlideOverPanel.prototype, "onCloseRequest", 2);
__decorateClass$w([
  n$1({ attribute: false })
], TucbsSlideOverPanel.prototype, "closable", 2);
TucbsSlideOverPanel = __decorateClass$w([
  t$3("tucbs-slide-over-panel")
], TucbsSlideOverPanel);
const TRANSITION_TIMING = "240ms cubic-bezier(0.2, 0, 0.38, 0.9)";
let sharedLeftWidth = null;
let sharedRightWidth = null;
const layoutTargets = /* @__PURE__ */ new Set();
let boundControllerCount = 0;
function combinedLayout() {
  const parts = [];
  if (sharedLeftWidth) parts.push(sharedLeftWidth);
  if (sharedRightWidth) parts.push(sharedRightWidth);
  const width = parts.length ? `calc(100% - ${parts.join(" - ")})` : "100%";
  return { width, marginLeft: sharedLeftWidth ?? "" };
}
function applyLayoutTo(el, layout) {
  el.style.width = layout.width;
  el.style.marginLeft = layout.marginLeft;
}
const openControllerBySide = {
  left: null,
  right: null
};
function applyCombinedLayout() {
  const layout = combinedLayout();
  for (const el of layoutTargets) applyLayoutTo(el, layout);
}
function registerLayoutTarget(el) {
  el.style.transition = `width ${TRANSITION_TIMING}, margin-left ${TRANSITION_TIMING}`;
  layoutTargets.add(el);
  if (boundControllerCount > 0) applyLayoutTo(el, combinedLayout());
}
function unregisterLayoutTarget(el) {
  layoutTargets.delete(el);
}
class PanelLayoutController {
  // Host bir Lit bileseni olmali (ReactiveControllerHost): TimerBag ona
  // controller olarak eklenir. ESKIDEN yalnizca Element bekleniyordu
  // (toolbar aramasi icin); dort cagiran da zaten `this` (LitElement) veriyor.
  constructor(hostForToolbarLookup, side = "right") {
    this.hostForToolbarLookup = hostForToolbarLookup;
    this.side = side;
    this._mapContainer = null;
    this._resizeObserver = null;
    this._toolbarEl = null;
    this._toolbarLookupDone = false;
    this._resizeRaf = null;
    this.onExclusiveClose = null;
    this._timers = new TimerBag(hostForToolbarLookup);
  }
  /** Bu controller'ı bir `Map` instance'ına bağlar; harita container'ının boyut geçişlerini/ResizeObserver'ını kurar (`tucbs-info-bar` kendini {@link registerLayoutTarget} ile kaydeder). */
  bindMap(map) {
    this._map = map;
    const container = map.viewer.container;
    this._mapContainer = container;
    container.style.transition = `width ${TRANSITION_TIMING}, margin-left ${TRANSITION_TIMING}`;
    layoutTargets.add(container);
    boundControllerCount++;
    this._resizeObserver = new ResizeObserver(() => {
      if (this._resizeRaf !== null) return;
      this._resizeRaf = this._timers.requestAnimationFrame(() => {
        this._resizeRaf = null;
        map.resize();
      });
    });
    this._resizeObserver.observe(container);
    applyCombinedLayout();
  }
  /** Bu controller'ı haritadan ayırır: gözlemciyi/paylaşılan genişlik durumunu temizler ve haritayı son bir kez `resize()` eder. */
  unbindMap(map) {
    var _a2;
    if (this._map) boundControllerCount = Math.max(0, boundControllerCount - 1);
    (_a2 = this._resizeObserver) == null ? void 0 : _a2.disconnect();
    this._resizeObserver = null;
    if (this._resizeRaf !== null) {
      this._timers.cancelAnimationFrame(this._resizeRaf);
      this._resizeRaf = null;
    }
    if (openControllerBySide[this.side] === this) openControllerBySide[this.side] = null;
    if (this.side === "left") sharedLeftWidth = null;
    else sharedRightWidth = null;
    applyCombinedLayout();
    if (this._mapContainer) this._mapContainer.style.transition = "";
    this._mapContainer = null;
    this._map = void 0;
    map.resize();
  }
  /** Panel acildiginda/kapandiginda haritayi, (varsa) info-bar'i ve (varsa) toolbar'i esler. */
  setOpen(open, panelWidth) {
    var _a2;
    if (open) {
      const current = openControllerBySide[this.side];
      if (current && current !== this) (_a2 = current.onExclusiveClose) == null ? void 0 : _a2.call(current);
      openControllerBySide[this.side] = this;
    } else if (openControllerBySide[this.side] === this) {
      openControllerBySide[this.side] = null;
    }
    if (this.side === "left") sharedLeftWidth = open ? panelWidth : null;
    else sharedRightWidth = open ? panelWidth : null;
    applyCombinedLayout();
    this._applyToolbarShift(open, panelWidth);
  }
  _findToolbarHost() {
    const root = this.hostForToolbarLookup.getRootNode();
    if (root instanceof ShadowRoot && root.host.tagName.toLowerCase() === "tucbs-toolbar") {
      return root.host;
    }
    return null;
  }
  _applyToolbarShift(open, panelWidth) {
    if (!this._toolbarLookupDone) {
      this._toolbarEl = this._findToolbarHost();
      this._toolbarLookupDone = true;
    }
    const toolbar = this._toolbarEl;
    if (!toolbar) return;
    const position = toolbar.position;
    const rightAnchored = position === "right-center" || position === "top-right" || position === "bottom-right";
    if (!rightAnchored) return;
    toolbar.style.transition = `translate ${TRANSITION_TIMING}`;
    toolbar.style.translate = open ? `calc(-1 * ${panelWidth})` : "";
  }
}
class PortalHost {
  /**
   * @param tag Olusturulacak custom element'in etiket adi (ör. `"tucbs-file-upload"`).
   * @param sync `ensure()` ilk olusturmada VE her `update()` cagrisinda, portal elementine guncel durumu (ör. `open`/`customCss`) uygulamak icin cagrilir.
   * @param closeEvent Dinlenecek kapanma olayinin adi (ör. `"tucbs-file-upload-closed"`); bazi portallarda (ör. stil editoru) hic yok, bu durumda atlanir.
   * @param onClose `closeEvent` tetiklendiginde cagrilacak geri cagirim.
   */
  constructor(tag, sync, closeEvent, onClose) {
    this.tag = tag;
    this.sync = sync;
    this.closeEvent = closeEvent;
    this.onClose = onClose;
    this.el = null;
  }
  /** Portal elementi (henuz `ensure()` cagrilmadiysa veya `dispose()` edildiyse `null`). */
  get element() {
    return this.el;
  }
  /** Portal elementi yoksa olusturup body'ye ekler ve senkronlar; zaten varsa HICBIR SEY yapmaz (idempotent). */
  ensure() {
    if (this.el) return;
    const el = document.createElement(this.tag);
    el.setAttribute("data-tucbs-portal", "");
    if (this.closeEvent && this.onClose) {
      el.addEventListener(this.closeEvent, this.onClose);
    }
    document.body.appendChild(el);
    this.el = el;
    this.sync(el);
  }
  /** Portal elementi varsa guncel durumu yeniden uygular; yoksa hicbir sey yapmaz (ensure() cagrilmamis/dispose edilmis olabilir). */
  update() {
    if (this.el) this.sync(this.el);
  }
  /** Portal elementini DOM'dan kaldirir ve ic referansi sifirlar. */
  dispose() {
    var _a2;
    (_a2 = this.el) == null ? void 0 : _a2.remove();
    this.el = null;
  }
}
class DragReorder {
  /**
   * @param onReorder Bir surukleme bittiginde cagirilir. `draggedId`
   * suruklenen ogenin (`item.dataset.layerId`) kimligi -- element bu
   * veri-niteligini tasimiyorsa `undefined` olabilir. `nextId` (varsa)
   * suruklenenin birakildigi yerde ONUNE gelen ogenin kimligidir;
   * listenin SONUNA birakildiysa `undefined`.
   */
  constructor(onReorder) {
    this.onReorder = onReorder;
    this.state = null;
  }
  /** Surukle-birak baslatir (bir `.drag-handle`'in pointerdown handler'indan cagirilir). */
  start(event, item, handle, list) {
    if (event.button !== 0 || this.state) return;
    event.preventDefault();
    handle.setPointerCapture(event.pointerId);
    const rect = item.getBoundingClientRect();
    const placeholder = document.createElement("div");
    placeholder.className = "layer-placeholder";
    placeholder.style.height = `${rect.height}px`;
    item.after(placeholder);
    item.classList.add("layer-item--dragging");
    item.style.left = `${rect.left}px`;
    item.style.top = `${rect.top}px`;
    item.style.width = `${rect.width}px`;
    const state = {
      handle,
      item,
      list,
      placeholder,
      pointerId: event.pointerId,
      offsetY: event.clientY - rect.top,
      onMove: (moveEvent) => this.move(moveEvent),
      onEnd: (endEvent) => this.end(endEvent)
    };
    window.addEventListener("pointermove", state.onMove);
    window.addEventListener("pointerup", state.onEnd);
    window.addEventListener("pointercancel", state.onEnd);
    this.state = state;
  }
  move(event) {
    const state = this.state;
    if (!state || event.pointerId !== state.pointerId) return;
    event.preventDefault();
    state.item.style.top = `${event.clientY - state.offsetY}px`;
    this.movePlaceholder(event.clientY);
  }
  movePlaceholder(clientY) {
    const state = this.state;
    if (!state) return;
    const siblings = [
      ...state.list.querySelectorAll(".layer-item[data-layer-id]")
    ].filter((el) => el !== state.item);
    const insertBefore = siblings.find((el) => {
      const rect = el.getBoundingClientRect();
      return clientY < rect.top + rect.height / 2;
    });
    state.list.insertBefore(state.placeholder, insertBefore ?? null);
  }
  end(event) {
    var _a2;
    const state = this.state;
    if (!state || event.pointerId !== state.pointerId) return;
    window.removeEventListener("pointermove", state.onMove);
    window.removeEventListener("pointerup", state.onEnd);
    window.removeEventListener("pointercancel", state.onEnd);
    if (state.handle.hasPointerCapture(event.pointerId)) {
      state.handle.releasePointerCapture(event.pointerId);
    }
    const draggedId = state.item.dataset.layerId;
    const nextId = (_a2 = state.placeholder.nextElementSibling) == null ? void 0 : _a2.dataset.layerId;
    state.placeholder.remove();
    state.item.classList.remove("layer-item--dragging");
    state.item.removeAttribute("style");
    this.state = null;
    this.onReorder(draggedId, nextId);
  }
  /** Aktif bir surukleme varken cagrilirsa window dinleyicilerini temizler (ör. bilesen kaldirilirken/disconnectedCallback). */
  dispose() {
    if (!this.state) return;
    window.removeEventListener("pointermove", this.state.onMove);
    window.removeEventListener("pointerup", this.state.onEnd);
    window.removeEventListener("pointercancel", this.state.onEnd);
    this.state = null;
  }
}
class MarkerWatcher {
  /** @param onChange Marker'ın varlığı (keşfedilen element VEYA `null`) DEĞİŞTİĞİNDE çağırılır -- `start()` ilk taramada da bir kez çağırır. */
  constructor(host, tagName, onChange) {
    this.host = host;
    this.tagName = tagName;
    this.onChange = onChange;
    this.observer = null;
    this.current = null;
  }
  /** İlk taramayı yapar ve kökü canlı izlemeye başlar (bir kez, `host.connectedCallback()`'ten çağrılmalı). */
  start() {
    const root = this.host.getRootNode();
    this.evaluate(root);
    this.observer = new MutationObserver(() => this.evaluate(root));
    this.observer.observe(root, { childList: true, subtree: true });
  }
  evaluate(root) {
    const marker = root.querySelector(`${this.tagName}:not([data-tucbs-portal])`);
    if (marker !== this.current) {
      this.current = marker;
      this.onChange(marker);
    }
  }
  /** İzlemeyi durdurur (`host.disconnectedCallback()`'ten çağrılmalı). */
  dispose() {
    var _a2;
    (_a2 = this.observer) == null ? void 0 : _a2.disconnect();
    this.observer = null;
    this.current = null;
  }
}
function carbonIcon$3(node) {
  return o$1(iconNodeToString(node));
}
const ICON_ZOOM_IN$2 = carbonIcon$3(_16_default$1);
const ICON_UP_TO_TOP = carbonIcon$3(_16_default$5);
const ICON_TRASH_CAN$1 = carbonIcon$3(_16_default$6);
const ICON_PALETTE = carbonIcon$3(_16_default$t);
const ICON_LEGEND = carbonIcon$3(_16_default$k);
const ICON_DOCUMENT_EXPORT = carbonIcon$3(_16_default$r);
function buildLayerMenuActions(layer, flags, callbacks) {
  const actions = [
    { icon: ICON_ZOOM_IN$2, label: "Yakınlaş", onClick: callbacks.zoomToLayer },
    { icon: ICON_UP_TO_TOP, label: "En Üste Taşı", onClick: callbacks.bringToFront },
    { icon: ICON_TRASH_CAN$1, label: "Kaldır", onClick: callbacks.remove }
  ];
  if (flags.styleEditorAvailable) {
    actions.push({ icon: ICON_PALETTE, label: "Stil Düzenle", onClick: callbacks.openStyleEditor });
  }
  if (flags.legendAvailable && layer.styleMode !== "solid" && layer.layerType !== "DRAWING" && layer.layerType !== "MEASURE") {
    actions.push({ icon: ICON_LEGEND, label: "Lejant", onClick: callbacks.toggleLegend });
  }
  if (flags.layerExportAvailable && layer.layerType === "DRAWING") {
    actions.push({
      icon: ICON_DOCUMENT_EXPORT,
      label: "GeoJSON Olarak Dışa Aktar",
      onClick: callbacks.exportLayer
    });
  }
  if (flags.layerExportAvailable && flags.isAnalysisResult) {
    actions.push({
      icon: ICON_DOCUMENT_EXPORT,
      label: "Dışa Aktar",
      onClick: () => void 0,
      children: [
        { icon: ICON_DOCUMENT_EXPORT, label: "GeoJSON", onClick: callbacks.exportLayer },
        { icon: ICON_DOCUMENT_EXPORT, label: "KML", onClick: callbacks.exportLayerKml },
        { icon: ICON_DOCUMENT_EXPORT, label: "Shapefile (ZIP)", onClick: callbacks.exportLayerShapefile }
      ]
    });
  }
  if (flags.layerExportAvailable && (layer.layerType === "WMS" || layer.layerType === "WCS") && flags.isGeoTiffExportAvailable) {
    actions.push({
      icon: ICON_DOCUMENT_EXPORT,
      label: "GeoTIFF Olarak Dışa Aktar",
      onClick: callbacks.exportLayerAsGeoTiff
    });
  }
  return actions;
}
class ExclusiveOverlayCoordinator {
  constructor() {
    this.closers = /* @__PURE__ */ new Map();
  }
  /**
   * Bir kutunun kapatma fonksiyonunu kaydeder -- genelde `connectedCallback`
   * içinde, bileşenin ömrü boyunca bir kez (aynı `id` ile tekrar çağrılması
   * sadece önceki kaydı değiştirir, hata vermez).
   */
  register(id, close) {
    this.closers.set(id, close);
  }
  /** `id` ile kayıtlı kutu HARİÇ, kayıtlı diğer tüm kutuların kapatma fonksiyonlarını çağırır. */
  closeOthers(id) {
    for (const [otherId, close] of this.closers) {
      if (otherId !== id) close();
    }
  }
}
var __defProp$u = Object.defineProperty;
var __getOwnPropDesc$v = Object.getOwnPropertyDescriptor;
var __decorateClass$v = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$v(target, key) : target;
  for (var i4 = decorators.length - 1, decorator; i4 >= 0; i4--)
    if (decorator = decorators[i4])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$u(target, key, result);
  return result;
};
let TucbsLayerMenuPortal = class extends i$3 {
  constructor() {
    super(...arguments);
    this.open = false;
    this.actions = [];
    this.x = 0;
    this.y = 0;
  }
  /** `x`/`y` değiştiğinde host'un `transform`'unu günceller. */
  updated(changed) {
    if (changed.has("x") || changed.has("y")) {
      this.style.transform = `translate(${this.x}px, ${this.y}px)`;
    }
  }
  render() {
    return b`
      <div class="layer-menu" role="menu">
        ${this.actions.map(
      (action) => {
        var _a2;
        return ((_a2 = action.children) == null ? void 0 : _a2.length) ? b`
                <div class="layer-menu-branch">
                  <button type="button" class="layer-menu-item" role="menuitem" aria-haspopup="true">
                    ${action.icon}<span>${action.label}</span><span class="chevron">›</span>
                  </button>
                  <div class="layer-submenu" role="menu">
                    ${action.children.map(
          (child) => b`
                        <button
                          type="button"
                          class="layer-menu-item"
                          role="menuitem"
                          @click=${child.onClick}
                        >
                          ${child.icon}<span>${child.label}</span>
                        </button>
                      `
        )}
                  </div>
                </div>
              ` : b`
                <button
                  type="button"
                  class="layer-menu-item"
                  role="menuitem"
                  @click=${action.onClick}
                >
                  ${action.icon}<span>${action.label}</span>
                </button>
              `;
      }
    )}
      </div>
    `;
  }
};
TucbsLayerMenuPortal.styles = i$6`
    :host {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1100;
      display: none;
      font-family: "IBM Plex Sans", system-ui, sans-serif;
      font-size: 0.875rem;
    }

    :host([open]) {
      display: block;
    }

    .layer-menu {
      display: flex;
      flex-direction: column;
      min-width: 160px;
      padding: 0.25rem 0;
      background: var(--cds-layer-01, #ffffff);
      border: 1px solid var(--cds-border-subtle, #e0e0e0);
      border-radius: 4px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    }

    .layer-menu-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 0.75rem;
      border: none;
      background: transparent;
      color: var(--cds-text-primary, #161616);
      font-size: 0.8125rem;
      text-align: left;
      cursor: pointer;
    }

    .layer-menu-item:hover {
      background: var(--cds-layer-hover-01, #f4f4f4);
    }

    .layer-menu-branch {
      position: relative;
    }

    .layer-menu-item .chevron {
      margin-left: auto;
    }

    .layer-submenu {
      display: none;
      position: absolute;
      left: 100%;
      top: 0;
      min-width: 160px;
      padding: 0.25rem 0;
      background: var(--cds-layer-01, #ffffff);
      border: 1px solid var(--cds-border-subtle, #e0e0e0);
      border-radius: 4px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    }

    .layer-menu-branch:hover .layer-submenu,
    .layer-menu-branch:focus-within .layer-submenu {
      display: flex;
      flex-direction: column;
    }
  `;
__decorateClass$v([
  n$1({ type: Boolean, reflect: true })
], TucbsLayerMenuPortal.prototype, "open", 2);
__decorateClass$v([
  n$1({ attribute: false })
], TucbsLayerMenuPortal.prototype, "actions", 2);
__decorateClass$v([
  n$1({ type: Number })
], TucbsLayerMenuPortal.prototype, "x", 2);
__decorateClass$v([
  n$1({ type: Number })
], TucbsLayerMenuPortal.prototype, "y", 2);
TucbsLayerMenuPortal = __decorateClass$v([
  t$3("tucbs-layer-menu-portal")
], TucbsLayerMenuPortal);
var __defProp$t = Object.defineProperty;
var __getOwnPropDesc$u = Object.getOwnPropertyDescriptor;
var __decorateClass$u = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$u(target, key) : target;
  for (var i4 = decorators.length - 1, decorator; i4 >= 0; i4--)
    if (decorator = decorators[i4])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$t(target, key, result);
  return result;
};
let TucbsTooltipPortal = class extends i$3 {
  constructor() {
    super(...arguments);
    this.open = false;
    this.text = "";
    this.x = 0;
    this.y = 0;
  }
  /** `x`/`y` değiştiğinde host'un `transform`'unu günceller. */
  updated(changed) {
    if (changed.has("x") || changed.has("y")) {
      this.style.transform = `translate(${this.x}px, ${this.y}px)`;
    }
  }
  render() {
    return b`<div class="tooltip">${this.text}</div>`;
  }
};
TucbsTooltipPortal.styles = i$6`
    :host {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1100;
      display: none;
      pointer-events: none;
    }

    :host([open]) {
      display: block;
    }

    .tooltip {
      background: rgba(22, 22, 22, 0.9);
      color: #ffffff;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-family: "IBM Plex Sans", system-ui, sans-serif;
      font-size: 0.75rem;
      line-height: 1.4;
      white-space: nowrap;
    }
  `;
__decorateClass$u([
  n$1({ type: Boolean, reflect: true })
], TucbsTooltipPortal.prototype, "open", 2);
__decorateClass$u([
  n$1()
], TucbsTooltipPortal.prototype, "text", 2);
__decorateClass$u([
  n$1({ type: Number })
], TucbsTooltipPortal.prototype, "x", 2);
__decorateClass$u([
  n$1({ type: Number })
], TucbsTooltipPortal.prototype, "y", 2);
TucbsTooltipPortal = __decorateClass$u([
  t$3("tucbs-tooltip-portal")
], TucbsTooltipPortal);
function whenTucbsMapReady(mapEl, onReady) {
  const state = mapEl.apiKeyAuthState ?? "none";
  if (state === "failed") {
    return;
  }
  if (state === "ok" || state === "none" && mapEl.map) {
    onReady(mapEl);
    return;
  }
  const onReadyEvent = () => onReady(mapEl);
  mapEl.addEventListener("ready", onReadyEvent, { once: true });
  mapEl.addEventListener(
    "error",
    () => mapEl.removeEventListener("ready", onReadyEvent),
    { once: true }
  );
}
function standardMapBindingMessages(tag, suffix) {
  return {
    noIdMessage: `[${tag}] "mapElementId" verilmedi ve "map" programatik olarak atanmadi; bilesen haritaya baglanamadigi icin ${suffix} kalacak.`,
    missingElementMessage: (mapElementId) => `[${tag}] mapElementId="${mapElementId}" ile eslesen bir element bulunamadi; bilesen haritaya baglanamadigi icin ${suffix} kalacak.`
  };
}
function bindMapByElementId(host, options) {
  if (host.map) return;
  if (!host.mapElementId) {
    if (options.noIdTiming === "sync") {
      console.warn(options.noIdMessage);
      return;
    }
    requestAnimationFrame(() => {
      if (host.map) return;
      console.warn(options.noIdMessage);
    });
    return;
  }
  const mapEl = document.getElementById(host.mapElementId);
  if (!mapEl) {
    console.warn(options.missingElementMessage(host.mapElementId));
    return;
  }
  if (mapEl.map) {
    host.map = mapEl.map;
  } else {
    mapEl.addEventListener(
      "ready",
      () => {
        if (mapEl.map) host.map = mapEl.map;
      },
      { once: true }
    );
  }
}
const TOOLTIP_BASE = i$6`
  [data-tooltip] {
    position: relative;
  }

  [data-tooltip]::after {
    content: attr(data-tooltip);
    position: absolute;
    background: rgba(22, 22, 22, 0.9);
    color: #ffffff;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.75rem;
    line-height: 1.4;
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition: opacity 0.1s ease;
    /* Komsu toolbar butonlarinin (ayni stacking context'teki diger
       [data-tooltip] elemanlarinin) UZERINDE kalmasi icin -- uygulamadaki
       EN YUKSEK z-index'ten (print preview overlay: 99999) bile daha
       yuksek, pratikte "her zaman en ustte" (kullanici istegi). */
    z-index: 2147483647;
  }

  [data-tooltip]:hover::after,
  [data-tooltip]:focus-visible::after {
    opacity: 1;
    visibility: visible;
  }

  /* KOK NEDEN (v18 tooltip-z-index bulgusu): tucbs-toolbar ".toolbar" konteyneri
     "display:flex" kullaniyor, ve her arac (tucbs-draw-tool, tucbs-measure-tool
     vb.) bu flex'in birer FLEX ITEM'i. Flexbox spec'ine gore z-index:auto olan
     bir flex item'in ICINDEKI descendant'larin z-index'i (::after'a verilen
     2147483647 DAHIL) SADECE o flex item'in KENDI icinde karsilastirilir --
     bir SONRAKI KARDES flex item (ör. measure), kendisi de z-index:auto
     oldugu icin AYNI "z-index:0" katmaninda ama DOM SIRASINDA SONRA geldigi
     icin HER ZAMAN ONCEKI kardesin (draw) TUM icerigini (icindeki dev
     z-index'li tooltip DAHIL) ORTER -- descendant'in z-index'i host'un
     KENDI flex-item seviyesini ASAMAZ. Cozum: :has() ile, o an ICINDE
     hover/focus edilen bir tooltip VARSA, HOST'UN KENDI z-index'ini (flex
     item seviyesinde) kardeslerinin ustune cikariyoruz -- boylece o an
     tooltip'i gosteren arac, GECICI olarak butun kardes araclarin ONUNE
     gecer (bkz. gercek Chrome headless repro ile dogrulandi). */
  :host:has([data-tooltip]:hover),
  :host:has([data-tooltip]:focus-visible) {
    z-index: 1;
  }
`;
const leftTooltipStyles = [
  TOOLTIP_BASE,
  i$6`
    [data-tooltip]::after {
      top: 50%;
      right: calc(100% + 0.5rem);
      transform: translateY(-50%);
    }
  `
];
const bottomRightTooltipStyles = [
  TOOLTIP_BASE,
  i$6`
    [data-tooltip]::after {
      top: calc(100% + 0.375rem);
      left: 0;
    }
  `
];
[
  TOOLTIP_BASE,
  i$6`
    [data-tooltip]::after {
      top: calc(100% + 0.5rem);
      left: 50%;
      transform: translateX(-50%);
    }
  `
];
const layerListStyles = i$6`
  :host {
    position: fixed;
    top: 1rem;
    left: 1rem;
    z-index: 1000;
    display: block;
    font-family: "IBM Plex Sans", system-ui, sans-serif;
    font-size: 0.875rem;
    color: var(--cds-text-primary, #161616);
    /* suppress Carbon's blue focus ring on the checkbox */
    --cds-focus: transparent;
  }

  .toggle-btn {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.5rem 0.75rem;
    border: 1px solid var(--cds-border-subtle, #e0e0e0);
    border-radius: 4px;
    background: var(--cds-layer-01, #ffffff);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    color: var(--cds-text-primary, #161616);
    font: inherit;
    cursor: pointer;
  }

  .toggle-btn:hover {
    background: var(--cds-layer-hover-01, #f4f4f4);
  }

  .toggle-arrow {
    display: inline-flex;
    color: var(--cds-icon-secondary, #6f6f6f);
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 0.125rem;
  }

  .add-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    flex: none;
    border: none;
    border-radius: 4px;
    background: transparent;
    color: var(--cds-icon-secondary, #6f6f6f);
    cursor: pointer;
  }

  .add-btn:hover {
    background: var(--cds-layer-hover-01, #f4f4f4);
  }

  .add-btn:disabled {
    opacity: 0.5;
    cursor: default;
  }

  .close-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    flex: none;
    border: none;
    border-radius: 4px;
    background: transparent;
    color: var(--cds-icon-secondary, #6f6f6f);
    cursor: pointer;
  }

  .close-btn:hover {
    background: var(--cds-layer-hover-01, #f4f4f4);
    color: var(--cds-icon-primary, #161616);
  }

  .layer-list {
    display: flex;
    flex-direction: column;
    position: relative;
  }

  .layer-empty {
    padding: 1rem;
    font-size: 0.8125rem;
    color: var(--cds-text-secondary, #525252);
    text-align: center;
  }

  /* Sol dolgu (padding-left) BİLEREK yok: ".panel-body" (bkz.
     SlideOverPanel.ts) zaten 1rem dolgu veriyor -- header-actions'daki
     "Veri Dosyası Ekle" butonu (bkz. .add-btn) da bu dolgudan başka bir
     ekleme yapmadan panel kenarına flush oturuyor. Katman satırının ilk
     öğesi (.drag-handle) de AYNI hizadan başlasın diye burada AYRICA
     1rem eklenmiyor -- yalnızca satırın SAĞ tarafı için (kebap butonuyla
     panel-body'nin sağ dolgusu arasında boşluk kalmasın diye) korunuyor. */
  .layer-item {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 0.5rem 1rem 0.5rem 0;
    background: var(--cds-layer-01, #ffffff);
    border-bottom: 1px solid var(--cds-border-subtle, #e0e0e0);
  }

  /* Aktif Cizim Katmani: satir vurgusu + kalin isim (tiklayarak aktif yapilir). */
  .layer-item--active-drawing {
    background: var(--cds-layer-selected-01, #e8f0fe);
    box-shadow: inset 3px 0 0 var(--cds-interactive, #0f62fe);
  }

  .layer-item:last-child {
    border-bottom: none;
  }

  .layer-item--dragging {
    position: fixed;
    z-index: 20;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    pointer-events: none;
  }

  .layer-placeholder {
    margin: 2px 1rem;
    border: 1px dashed var(--cds-border-strong, #8d8d8d);
    border-radius: 4px;
  }

  .layer-row {
    display: flex;
    align-items: center;
    gap: 0.375rem;
  }

  .drag-handle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    flex: none;
    border: none;
    background: transparent;
    color: var(--cds-icon-secondary, #6f6f6f);
    cursor: grab;
    touch-action: none;
  }

  .drag-handle:active {
    cursor: grabbing;
  }

  /* .layer-row'daki "align-items: center" tum ogeleri satirin ortasina
     hizalar (drag-handle, layer-name, layer-actions da bu sekilde
     hizalaniyor); checkbox ve renk noktasi da elle dikey offset vermeden
     aynı ortak merkeze birakiliyor. */
  /* Carbon'un checkbox'i kendi ic stilinde margin-block-end:.375rem (6px)
     tasiyor (form alanlarinda alt bosluk icin); bu "hayali" alt bosluk
     align-items'in ortalama hesabini yukari kaydiriyordu. Sifirlayarak
     satirdaki diger tum ogelerle (drag-handle, isim, kebap butonu) ayni
     ortak merkeze dogal olarak hizalanmasini sagliyoruz. */
  cds-checkbox {
    flex: none;
    margin: 0 0 0 -4px;
  }

  .layer-color-dot {
    position: relative;
    display: inline-flex;
    flex: none;
    width: 16px;
    height: 16px;
    margin-left: -8px;
    border-radius: 0;
    overflow: hidden;
    cursor: pointer;
  }

  /* Dolgu kapali: kutu bos kalir; icindeki renk girisi (disabled) kendi rengini boyamasin. */
  .layer-color-dot--empty input[type="color"] {
    opacity: 0;
  }

  .layer-color-dot input[type="color"] {
    position: absolute;
    inset: -4px;
    width: calc(100% + 8px);
    height: calc(100% + 8px);
    border: none;
    appearance: none;
    -webkit-appearance: none;
    background: none;
    cursor: pointer;
  }

  /* Renk noktasiyla (.layer-color-dot) ayni 16x16 kutu ve ayni sol hiza. */
  .layer-kind-icon {
    flex: none;
    display: inline-flex;
    width: 16px;
    height: 16px;
    margin-left: -8px;
  }

  .layer-kind-icon svg {
    display: block;
    width: 16px;
    height: 16px;
  }

  .layer-name--drawing {
    cursor: pointer;
  }

  .layer-name--active {
    font-weight: 700;
  }

  .layer-name {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .layer-actions {
    flex: none;
    margin-left: auto;
  }

  .layer-options {
    position: relative;
  }

  .options-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    flex: none;
    border: none;
    background: transparent;
    color: var(--cds-icon-secondary, #6f6f6f);
    cursor: pointer;
  }

  .options-btn:hover,
  .options-btn[aria-expanded="true"] {
    color: var(--cds-icon-primary, #161616);
  }

  .options-btn:disabled {
    cursor: not-allowed;
  }

  /* GeoTIFF export tetiklendiginde (bkz _geoTiffExportingIds) gercek bir ag
     istegi (WMS GetMap/WCS GetCoverage) tamamlanana kadar surer -- bu
     sure boyunca ne olduğu görünmezse (menü zaten kapanmış olduğundan,
     tıklanabilecek hiçbir şey kalmıyor) kullanıcı "hiçbir şey olmuyor"
     sanıp tekrar tıklayabilir. TucbsStyleEditor'daki .outline-busy ile
     AYNI görsel dil (kucuk donen spinner), "..." butonunun YERINE gecer
     ki hangi katmanin indirildigi belli olsun. */
  .options-btn-spinner {
    width: 14px;
    height: 14px;
    flex: none;
    border: 1.5px solid var(--cds-border-subtle, #e0e0e0);
    border-top-color: var(--cds-interactive, #0f62fe);
    border-radius: 50%;
    animation: options-btn-spin 0.7s linear infinite;
  }

  @keyframes options-btn-spin {
    to {
      transform: rotate(360deg);
    }
  }

  .layer-opacity-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding-left: 24px;
  }

  .layer-opacity-pct {
    width: 2.25rem;
    color: var(--cds-text-secondary, #525252);
    font-size: 0.6875rem;
    text-align: right;
  }

  .opacity-slider {
    flex: 1;
    height: 4px;
    margin-right: 6px;
    appearance: none;
    border-radius: 2px;
    background: linear-gradient(
      to right,
      var(--cds-interactive, #0f62fe) 0%,
      var(--cds-interactive, #0f62fe) var(--fill, 100%),
      var(--cds-border-subtle, #e0e0e0) var(--fill, 100%),
      var(--cds-border-subtle, #e0e0e0) 100%
    );
  }

  .opacity-slider::-webkit-slider-thumb {
    width: 12px;
    height: 12px;
    appearance: none;
    border-radius: 50%;
    background: var(--cds-interactive, #0f62fe);
    cursor: pointer;
  }

  .opacity-slider::-moz-range-thumb {
    width: 12px;
    height: 12px;
    border: none;
    border-radius: 50%;
    background: var(--cds-interactive, #0f62fe);
    cursor: pointer;
  }

`;
const DRAW_KIND_NEUTRAL_COLOR = "#9e9e9e";
function drawKindSymbolOf(style) {
  if (style === void 0) return void 0;
  return {
    ...style.point !== void 0 ? { shape: style.point.shape } : {},
    ...style.outline.enabled && style.outline.dash !== void 0 ? { dash: style.outline.dash } : {}
  };
}
const ICON_DASH_WIDTH = 1;
function drawKindPaint(kind, fillColor, outlineColor, symbol) {
  if (kind === "line") {
    const array = dashArray(symbol == null ? void 0 : symbol.dash, ICON_DASH_WIDTH);
    return {
      fill: "none",
      stroke: outlineColor ?? DRAW_KIND_NEUTRAL_COLOR,
      ...array !== void 0 ? { dashArray: array } : {}
    };
  }
  return {
    fill: fillColor,
    // Dolgu KAPALI ("none") ve dis hat da yoksa ikon gorunmez kalirdi: notr cizgiyle cizilir.
    stroke: outlineColor ?? (fillColor === "none" ? DRAW_KIND_NEUTRAL_COLOR : "none"),
    ...kind === "point" && (symbol == null ? void 0 : symbol.shape) !== void 0 ? { shape: symbol.shape } : {}
  };
}
function layerSwatchStyle(styleMode, fill, outlineColor) {
  if (styleMode === "off") {
    return `background:transparent;box-shadow:inset 0 0 0 1.5px ${outlineColor ?? DRAW_KIND_NEUTRAL_COLOR}`;
  }
  return `background:${fill}`;
}
function renderDrawKindIcon(kind, paint) {
  switch (kind) {
    case "point":
      if (paint.shape !== void 0 && paint.shape !== "circle") {
        return b`${o$2(
          pointSymbolSvg(paint.shape, {
            fill: paint.fill,
            ...paint.stroke !== "none" ? { stroke: paint.stroke, strokeWidth: 1.5 } : {},
            size: 16,
            renderSize: 16
          }).replace("<svg ", '<svg aria-hidden="true" ')
        )}`;
      }
      return b`<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
        <circle cx="8" cy="8" r="5.25" fill=${paint.fill} stroke=${paint.stroke} stroke-width="1.5" />
      </svg>`;
    case "line":
      return b`<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
        <line
          x1="0"
          y1="8"
          x2="16"
          y2="8"
          stroke=${paint.stroke}
          stroke-width="2"
          stroke-dasharray=${paint.dashArray ?? A}
        />
      </svg>`;
    case "area":
      return b`<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
        <polygon
          points="8,1.5 14.5,6.3 12,14.25 4,14.25 1.5,6.3"
          fill=${paint.fill}
          stroke=${paint.stroke}
          stroke-width="1.5"
          stroke-linejoin="round"
        />
      </svg>`;
  }
}
const NEUTRAL_LIST_COLOR = "#9e9e9e";
function layerListColorView(style, lineOnly) {
  if (style === void 0) return { fill: NEUTRAL_LIST_COLOR, styleMode: void 0, opacity: void 0 };
  if (lineOnly) return { fill: style.outline.color, styleMode: "solid", opacity: style.outline.opacity ?? 1 };
  return {
    fill: style.fill.mode === "solid" ? style.fill.color : NEUTRAL_LIST_COLOR,
    styleMode: style.fill.mode,
    opacity: style.fill.mode !== "off" ? style.fill.opacity : void 0
  };
}
function colorChangeSpec(current, lineOnly, color) {
  if (current !== void 0 && lineOnly) {
    return { ...current, outline: { ...current.outline, enabled: true, color } };
  }
  const opacity = (current == null ? void 0 : current.fill.mode) === "solid" ? current.fill.opacity : 1;
  const outline = (current == null ? void 0 : current.outline) ?? { enabled: true, color: "#000000", width: 2 };
  return { ...current, fill: { mode: "solid", color, opacity }, outline };
}
function opacityChangeSpec(current, lineOnly, opacity) {
  if (current === void 0) return void 0;
  if (lineOnly) {
    const { opacity: _previous, ...outlineRest } = current.outline;
    return { ...current, outline: opacity >= 1 ? outlineRest : { ...outlineRest, opacity } };
  }
  if (current.fill.mode === "off") return void 0;
  return { ...current, fill: { ...current.fill, opacity } };
}
var __defProp$s = Object.defineProperty;
var __getOwnPropDesc$t = Object.getOwnPropertyDescriptor;
var __typeError$2 = (msg) => {
  throw TypeError(msg);
};
var __decorateClass$t = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$t(target, key) : target;
  for (var i4 = decorators.length - 1, decorator; i4 >= 0; i4--)
    if (decorator = decorators[i4])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$s(target, key, result);
  return result;
};
var __accessCheck$2 = (obj, member, msg) => member.has(obj) || __typeError$2("Cannot " + msg);
var __privateGet$2 = (obj, member, getter) => (__accessCheck$2(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd$2 = (obj, member, value) => member.has(obj) ? __typeError$2("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var _apiKeyState$1;
function carbonIcon$2(node) {
  return o$1(iconNodeToString(node));
}
const ICON_DOCUMENT_BLANK = carbonIcon$2(_20_default$2);
const ICON_CLOUD_DOWNLOAD$1 = carbonIcon$2(_20_default$4);
const ICON_CHEVRON_RIGHT$1 = carbonIcon$2(_16_default$x);
const ICON_OVERFLOW_MENU = carbonIcon$2(_16_default$f);
const ICON_DRAG_HANDLE = carbonIcon$2(_16_default$o);
const ICON_API_KEY$1 = carbonIcon$2(_20_default$5);
const ICON_LAYERS = carbonIcon$2(_16_default$l);
let TucbsLayerList = class extends i$3 {
  constructor() {
    super(...arguments);
    this.mapElementId = "";
    __privateAdd$2(this, _apiKeyState$1, new WriteOnlyApiKey(this));
    this.panelWidth = "360px";
    this.collapsible = true;
    this.customCss = "";
    this._open = false;
    this._layers = [];
    this._openMenuId = null;
    this._geoTiffExportingIds = /* @__PURE__ */ new Set();
    this._uploadOpen = false;
    this._fileUploadAvailable = false;
    this._serviceUploadOpen = false;
    this._serviceUploadAvailable = false;
    this._styleEditorAvailable = false;
    this._legendAvailable = false;
    this._layerExportAvailable = false;
    this._legendOpenIds = /* @__PURE__ */ new Set();
    this._authorizedLayersAvailable = false;
    this._authorizedLayersFetching = false;
    this._hasApiKey = false;
    this._fileUploadMarker = null;
    this._serviceUploadMarker = null;
    this._styleEditorMarker = null;
    this._legendMarker = null;
    this._layerExportMarker = null;
    this._authorizedLayersMarker = null;
    this._fileUploadPortal = new PortalHost(
      "tucbs-file-upload",
      (el) => {
        var _a2, _b, _c, _d;
        el.open = this._uploadOpen;
        el.layerManager = this.layerManager;
        el.customCss = ((_a2 = this._fileUploadMarker) == null ? void 0 : _a2.customCss) ?? "";
        el.acceptedTypes = ((_b = this._fileUploadMarker) == null ? void 0 : _b.acceptedTypes) ?? "";
        el.maxFileSizeMb = ((_c = this._fileUploadMarker) == null ? void 0 : _c.maxFileSizeMb) ?? 0;
        el.dragDrop = ((_d = this._fileUploadMarker) == null ? void 0 : _d.dragDrop) ?? true;
      },
      "tucbs-file-upload-closed",
      () => this._closeUpload()
    );
    this._serviceUploadPortal = new PortalHost(
      "tucbs-service-upload",
      (el) => {
        var _a2;
        el.open = this._serviceUploadOpen;
        el.layerManager = this.layerManager;
        el.customCss = ((_a2 = this._serviceUploadMarker) == null ? void 0 : _a2.customCss) ?? "";
        el.apiKey = __privateGet$2(this, _apiKeyState$1).real;
      },
      "tucbs-service-upload-closed",
      () => this._closeServiceUpload()
    );
    this._styleEditorPortal = new PortalHost(
      "tucbs-style-editor",
      (el) => {
        var _a2;
        el.layerManager = this.layerManager;
        el.customCss = ((_a2 = this._styleEditorMarker) == null ? void 0 : _a2.customCss) ?? "";
      }
    );
    this._authorizedLayersPortal = new PortalHost(
      "tucbs-authorized-layers",
      (el) => {
        var _a2;
        el.layerManager = this.layerManager;
        el.customCss = ((_a2 = this._authorizedLayersMarker) == null ? void 0 : _a2.customCss) ?? "";
      }
    );
    this._fileUploadWatcher = new MarkerWatcher(
      this,
      "tucbs-file-upload",
      (marker) => {
        this._fileUploadMarker = marker;
        this._fileUploadAvailable = marker !== null;
        if (marker) this._fileUploadPortal.ensure();
        else this._fileUploadPortal.dispose();
      }
    );
    this._serviceUploadWatcher = new MarkerWatcher(
      this,
      "tucbs-service-upload",
      (marker) => {
        this._serviceUploadMarker = marker;
        this._serviceUploadAvailable = marker !== null;
        if (marker) this._serviceUploadPortal.ensure();
        else this._serviceUploadPortal.dispose();
      }
    );
    this._styleEditorWatcher = new MarkerWatcher(
      this,
      "tucbs-style-editor",
      (marker) => {
        this._styleEditorMarker = marker;
        this._styleEditorAvailable = marker !== null;
        if (marker) this._styleEditorPortal.ensure();
        else this._styleEditorPortal.dispose();
      }
    );
    this._legendWatcher = new MarkerWatcher(
      this,
      "tucbs-legend-panel",
      (marker) => {
        this._legendMarker = marker;
        this._legendAvailable = marker !== null;
      }
    );
    this._layerExportWatcher = new MarkerWatcher(
      this,
      "tucbs-layer-export",
      (marker) => {
        this._layerExportMarker = marker;
        this._layerExportAvailable = marker !== null;
      }
    );
    this._authorizedLayersWatcher = new MarkerWatcher(
      this,
      "tucbs-authorized-layers",
      (marker) => {
        this._authorizedLayersMarker = marker;
        this._authorizedLayersAvailable = marker !== null;
        if (marker) this._authorizedLayersPortal.ensure();
        else this._authorizedLayersPortal.dispose();
      }
    );
    this._menuPortalEl = null;
    this._tooltipPortalEl = null;
    this._colorById = /* @__PURE__ */ new Map();
    this._opacityById = /* @__PURE__ */ new Map();
    this._lineOnlyById = /* @__PURE__ */ new Map();
    this._dragReorder = new DragReorder(
      (draggedId, nextId) => this._applyReorder(draggedId, nextId)
    );
    this._overlayCoordinator = new ExclusiveOverlayCoordinator();
    this._customCssState = { sheet: null };
    this._layoutController = new PanelLayoutController(this, "left");
    this._opacityRaf = /* @__PURE__ */ new Map();
    this._timers = new TimerBag(this);
    this._onDocumentPointerDown = (event) => {
      const path = event.composedPath();
      const insideOptions = path.some(
        (el) => el instanceof HTMLElement && el.classList.contains("layer-options") || el === this._menuPortalEl
      );
      if (!insideOptions) this._closeMenu();
    };
    this._onDocumentKeyDown = (event) => {
      if (event.key === "Escape") this._closeMenu();
    };
    this._onWindowScrollOrResize = () => {
      if (this._openMenuId) this._closeMenu();
      this._hidePortalTooltip();
    };
    this._onDrawingLayersChange = ({ activeId }) => {
      this._activeDrawingLayerId = activeId;
      this.requestUpdate();
    };
    this._onLayerAdd = () => this._syncFromLayerManager();
    this._onLayerRemove = () => this._syncFromLayerManager();
    this._onLayerReorder = () => this._syncFromLayerManager();
    this._onLayerVisibility = (payload) => {
      this._layers = this._layers.map(
        (layer) => layer.id === payload.id ? { ...layer, visible: payload.visible } : layer
      );
    };
    this._onLayerOpacity = (payload) => {
      this._opacityById.set(payload.id, payload.opacity);
      this._layers = this._layers.map(
        (layer) => layer.id === payload.id ? { ...layer, opacity: payload.opacity } : layer
      );
    };
    this._onLayerStyle = (payload) => {
      const view = layerListColorView(payload.style, this._isLineOnly(payload.id));
      if (view.opacity !== void 0) this._opacityById.set(payload.id, view.opacity);
      this._layers = this._layers.map(
        (layer) => layer.id === payload.id ? {
          ...layer,
          fill: view.fill,
          outlineColor: payload.style.outline.enabled ? payload.style.outline.color : void 0,
          symbol: drawKindSymbolOf(payload.style),
          styleMode: view.styleMode,
          opacity: view.opacity ?? layer.opacity
        } : layer
      );
    };
    this._onApiKeyChange = (payload) => {
      this._hasApiKey = payload.hasApiKey;
    };
  }
  set apiKey(value) {
    __privateGet$2(this, _apiKeyState$1).write(value);
  }
  /** apiKey tanımlıysa `"••••••"`, değilse boş metin döner; gerçek değer dışarıdan okunamaz. */
  get apiKey() {
    return __privateGet$2(this, _apiKeyState$1).masked;
  }
  // Kirpma sinirina flush yasli buton tooltip'lerini _tooltipPortalEl
  // uzerinden gosterir/gizler -- bkz. _tooltipPortalEl field yorumu (neden
  // portal gerekiyor, hangi butonlar kullaniyor).
  _showPortalTooltip(anchor, text) {
    if (!this._tooltipPortalEl) return;
    const rect = anchor.getBoundingClientRect();
    this._tooltipPortalEl.text = text;
    this._tooltipPortalEl.x = rect.left;
    this._tooltipPortalEl.y = rect.bottom + 6;
    this._tooltipPortalEl.open = true;
  }
  _hidePortalTooltip() {
    if (this._tooltipPortalEl) this._tooltipPortalEl.open = false;
  }
  /** Bileşen DOM'a bağlandığında: global dinleyicileri, portal elementlerini ve sıra dışı bileşen (upload/style-editor/legend/export) varlık bayraklarını kurar. */
  connectedCallback() {
    super.connectedCallback();
    document.addEventListener("pointerdown", this._onDocumentPointerDown);
    document.addEventListener("keydown", this._onDocumentKeyDown);
    window.addEventListener("scroll", this._onWindowScrollOrResize, true);
    window.addEventListener("resize", this._onWindowScrollOrResize);
    this._menuPortalEl = document.createElement(
      "tucbs-layer-menu-portal"
    );
    document.body.appendChild(this._menuPortalEl);
    this._tooltipPortalEl = document.createElement(
      "tucbs-tooltip-portal"
    );
    document.body.appendChild(this._tooltipPortalEl);
    this._overlayCoordinator.register("upload", () => {
      this._uploadOpen = false;
    });
    this._overlayCoordinator.register("serviceUpload", () => {
      this._serviceUploadOpen = false;
    });
    this._overlayCoordinator.register("styleEditor", () => this._closeStyleEditorIfOpen());
    this._overlayCoordinator.register("authorizedLayers", () => this._closeAuthorizedLayersIfOpen());
    this._fileUploadWatcher.start();
    this._serviceUploadWatcher.start();
    this._styleEditorWatcher.start();
    this._legendWatcher.start();
    this._layerExportWatcher.start();
    this._authorizedLayersWatcher.start();
  }
  /** Bileşen DOM'dan kaldırıldığında: global dinleyicileri, portalları ve bekleyen RAF/sürükleme durumunu temizler. */
  disconnectedCallback() {
    var _a2, _b;
    document.removeEventListener("pointerdown", this._onDocumentPointerDown);
    document.removeEventListener("keydown", this._onDocumentKeyDown);
    window.removeEventListener("scroll", this._onWindowScrollOrResize, true);
    window.removeEventListener("resize", this._onWindowScrollOrResize);
    if (this.layerManager) this._unbindLayerManager(this.layerManager);
    if (this.map) {
      this._layoutController.unbindMap(this.map);
      this.map.drawingLayers.off("drawinglayers:change", this._onDrawingLayersChange);
    }
    this._fileUploadPortal.dispose();
    this._serviceUploadPortal.dispose();
    this._styleEditorPortal.dispose();
    this._authorizedLayersPortal.dispose();
    this._fileUploadWatcher.dispose();
    this._serviceUploadWatcher.dispose();
    this._styleEditorWatcher.dispose();
    this._legendWatcher.dispose();
    this._layerExportWatcher.dispose();
    this._authorizedLayersWatcher.dispose();
    (_a2 = this._menuPortalEl) == null ? void 0 : _a2.remove();
    this._menuPortalEl = null;
    (_b = this._tooltipPortalEl) == null ? void 0 : _b.remove();
    this._tooltipPortalEl = null;
    this._opacityRaf.clear();
    this._dragReorder.dispose();
    super.disconnectedCallback();
  }
  // === Yasam Dongusu: LayerManager baglama ===
  /** `layerManager`/`map` dışarıdan atanmamışsa, `mapElementId` üzerinden `tucbs-map`'e bağlanmayı dener. */
  firstUpdated() {
    if (this.layerManager) return;
    if (!this.mapElementId) {
      if (this.closest("tucbs-app")) return;
      this._timers.requestAnimationFrame(() => {
        if (this.layerManager) return;
        console.warn(
          '[tucbs-layer-list] "mapElementId" verilmedi ve "layerManager" programatik olarak atanmadi; bilesen haritaya baglanamadigi icin gizli kalacak.'
        );
      });
      return;
    }
    const mapEl = document.getElementById(this.mapElementId);
    if (!mapEl) {
      console.warn(
        `[tucbs-layer-list] mapElementId="${this.mapElementId}" ile eslesen bir element bulunamadi; bilesen haritaya baglanamadigi icin gizli kalacak.`
      );
      return;
    }
    whenTucbsMapReady(mapEl, (host) => {
      var _a2;
      if (host.layerManager) {
        this.layerManager = host.layerManager;
      }
      if (host.map) {
        this.map = host.map;
      }
      (_a2 = host._grantApiKeyTo) == null ? void 0 : _a2.call(host, this);
    });
  }
  /** Reactive property değişikliklerini (customCss/map/layerManager/apiKey vb.) işler ve bağlı Core JS API instance'larını senkronlar. */
  /** `collapsible` false olunca paneli render'dan önce açar ("her zaman açık panel", backlog B4). */
  willUpdate(changed) {
    if (changed.has("collapsible") && !this.collapsible && !this._open) this._openPanel();
  }
  updated(changed) {
    if (changed.has("customCss")) {
      applyCustomCss(
        this.shadowRoot,
        this.customCss,
        this._customCssState,
        "tucbs-layer-list"
      );
    }
    if (changed.has("map")) {
      const previousMap = changed.get("map");
      if (previousMap) {
        this._layoutController.unbindMap(previousMap);
        previousMap.drawingLayers.off("drawinglayers:change", this._onDrawingLayersChange);
      }
      if (this.map) {
        this._layoutController.bindMap(this.map);
        this.map.drawingLayers.on("drawinglayers:change", this._onDrawingLayersChange);
        this._activeDrawingLayerId = this.map.drawingLayers.getActiveId();
      }
    }
    if (changed.has("layerManager")) {
      const previous = changed.get("layerManager");
      if (previous) this._unbindLayerManager(previous);
      if (this.layerManager) this._bindLayerManager(this.layerManager);
      else this._hasApiKey = false;
    }
    this._fileUploadPortal.update();
    this._serviceUploadPortal.update();
    this._styleEditorPortal.update();
    this._authorizedLayersPortal.update();
  }
  _bindLayerManager(layerManager) {
    layerManager.on("layer:add", this._onLayerAdd);
    layerManager.on("layer:remove", this._onLayerRemove);
    layerManager.on("layer:reorder", this._onLayerReorder);
    layerManager.on("layer:visibility", this._onLayerVisibility);
    layerManager.on("layer:opacity", this._onLayerOpacity);
    layerManager.on("layer:style", this._onLayerStyle);
    layerManager.on("apiKey:change", this._onApiKeyChange);
    this._hasApiKey = layerManager.hasApiKey;
    this._syncFromLayerManager();
  }
  _unbindLayerManager(layerManager) {
    layerManager.off("layer:add", this._onLayerAdd);
    layerManager.off("layer:remove", this._onLayerRemove);
    layerManager.off("layer:reorder", this._onLayerReorder);
    layerManager.off("layer:visibility", this._onLayerVisibility);
    layerManager.off("layer:opacity", this._onLayerOpacity);
    layerManager.off("layer:style", this._onLayerStyle);
    layerManager.off("apiKey:change", this._onApiKeyChange);
  }
  // LayerManager'daki basemap disindaki tum katmanlari _layers'a yansitir.
  // getLayers() katmanlari z-sirasina gore artan (en arkadaki once) dondurur;
  // listede en ustte en onde/en son yukseltilmis katman gorunmesi icin ters
  // cevrilir (bu, _reorderInLayerManager'daki "index 0 = raiseToTop" ile tutarlidir).
  _syncFromLayerManager() {
    if (!this.layerManager) {
      this._layers = [];
      return;
    }
    this._layers = this.layerManager.getLayers().filter((layer) => !layer.isBasemap).reverse().map((layer) => this._toLayerItem(layer));
  }
  _isLineOnly(id) {
    var _a2;
    const cached = this._lineOnlyById.get(id);
    if (cached !== void 0) return cached;
    let lineOnly = false;
    try {
      const kinds = (_a2 = this.layerManager) == null ? void 0 : _a2.getGeometryKinds(id);
      lineOnly = (kinds == null ? void 0 : kinds.line) === true && !kinds.point && !kinds.area;
    } catch {
    }
    this._lineOnlyById.set(id, lineOnly);
    return lineOnly;
  }
  _toLayerItem(layer) {
    var _a2, _b;
    if (!this._opacityById.has(layer.id)) this._opacityById.set(layer.id, 1);
    const style = (_a2 = this.layerManager) == null ? void 0 : _a2.getLayerStyle(layer.id);
    const lineOnly = style !== void 0 && this._isLineOnly(layer.id);
    const view = layerListColorView(style, lineOnly);
    if (lineOnly) this._opacityById.set(layer.id, view.opacity ?? 1);
    return {
      id: layer.id,
      title: layer.title,
      visible: layer.cesiumObject.show,
      opacity: this._opacityById.get(layer.id) ?? 1,
      fill: view.fill,
      outlineColor: (style == null ? void 0 : style.outline.enabled) ? style.outline.color : void 0,
      symbol: drawKindSymbolOf(style),
      styleMode: view.styleMode,
      layerType: layer.layerType,
      analysisResult: ((_b = this.layerManager) == null ? void 0 : _b.isAnalysisResult(layer.id)) ?? false
    };
  }
  _openPanel() {
    this._open = true;
    this._layoutController.setOpen(true, this.panelWidth);
  }
  _closePanel() {
    if (!this.collapsible) return;
    this._open = false;
    this._layoutController.setOpen(false, this.panelWidth);
    this._closeMenu();
  }
  // Veri Dosyasi Ekle / Cografi Veri Servisi Ekle / Yetkili Katmanlar / Stil
  // Duzenle -- hepsi haritanin ustune serbest (modal olmayan, z-index'e
  // dayali) kutular olarak biniyor; ayni anda ikisi acik kalirsa ust uste
  // binip alttakini tiklanamaz/okunamaz hale getiriyor (bkz kullanici
  // ekran goruntusu). Bu yuzden biri acilirken digerleri KAPATILIR.
  _closeStyleEditorIfOpen() {
    const el = this._styleEditorPortal.element;
    if (el == null ? void 0 : el.open) el.close();
  }
  _closeAuthorizedLayersIfOpen() {
    const el = this._authorizedLayersPortal.element;
    if (el == null ? void 0 : el.open) el.closePicker();
  }
  _openUpload() {
    this._overlayCoordinator.closeOthers("upload");
    this._uploadOpen = true;
  }
  _closeUpload() {
    this._uploadOpen = false;
  }
  _openServiceUpload() {
    this._overlayCoordinator.closeOthers("serviceUpload");
    this._serviceUploadOpen = true;
  }
  _closeServiceUpload() {
    this._serviceUploadOpen = false;
  }
  /**
   * "Yetkili Katmanlarımı Getir" butonu — diğer serbest kutuları kapatıp
   * `<tucbs-authorized-layers>` portalının `fetchAndOpen()`'ını tetikler
   * (bkz GC-03 4.4 Adım 3, asıl fetch/dialog mantığı artık o bileşende).
   */
  async _openAuthorizedLayers() {
    var _a2;
    if (this._authorizedLayersFetching) return;
    this._overlayCoordinator.closeOthers("authorizedLayers");
    this._authorizedLayersFetching = true;
    try {
      await ((_a2 = this._authorizedLayersPortal.element) == null ? void 0 : _a2.fetchAndOpen());
    } finally {
      this._authorizedLayersFetching = false;
    }
  }
  _setVisible(id, visible) {
    var _a2;
    (_a2 = this.layerManager) == null ? void 0 : _a2.setVisible(id, visible);
  }
  // Yalnız solid modda çağrılır (swatch o dışındaki modlarda pasif).
  // Gerçek katman rengini LayerManager üzerinden değiştirir; "layer:style"
  // event'i hem bu bileşenin (_onLayerStyle) hem de açık olabilecek
  // StyleEditor'ün state'ini otomatik günceller.
  _setLayerColor(id, color) {
    var _a2, _b;
    const current = (_a2 = this.layerManager) == null ? void 0 : _a2.getLayerStyle(id);
    void ((_b = this.layerManager) == null ? void 0 : _b.applyLayerStyle(id, colorChangeSpec(current, this._isLineOnly(id), color)));
  }
  _setOpacity(id, opacity) {
    this._opacityById.set(id, opacity);
    const pending = this._opacityRaf.get(id);
    if (pending !== void 0) this._timers.cancelAnimationFrame(pending);
    const raf = this._timers.requestAnimationFrame(() => {
      this._opacityRaf.delete(id);
      this._applyOpacity(id, this._opacityById.get(id) ?? opacity);
    });
    this._opacityRaf.set(id, raf);
  }
  // Entity-tabanli (vektor) katmanlarda bu bar, TucbsStyleEditor'un "Dolgu"
  // kartindaki Opaklik slider'iyla AYNI degeri (fill.opacity) okur/yazar --
  // eskiden burasi TAMAMEN AYRI, tum katman genelinde CARPAN olarak
  // uygulanan LayerManager.setOpacity()'i cagiriyordu (bkz o metodun/
  // prepareDataSourceOpacity'nin yorumlari: alpha = fill.alpha * layerOpacity);
  // iki slider farkli sayilari gosterip birbirinden habersiz kaliyordu (bkz
  // kullanici bildirimi). fill.mode "off" ise (StyleEditor'da Opaklik alani
  // zaten gizlenir) senkronize edilecek bir fill opakligi YOK -- bu TEK
  // durumda ve raster (WMS/WMTS/WCS -- getLayerStyle() bunlar icin hep
  // undefined doner, applyLayerStyle entity-disi katmanlarda zaten hata
  // firlatir) katmanlarda eski katman-geneli mekanizmaya dusulur.
  _applyOpacity(id, opacity) {
    if (!this.layerManager) return;
    const spec = opacityChangeSpec(this.layerManager.getLayerStyle(id), this._isLineOnly(id), opacity);
    if (spec !== void 0) {
      void this.layerManager.applyLayerStyle(id, spec);
      return;
    }
    this.layerManager.setOpacity(id, opacity);
  }
  _updateOpacitySlider(input, value) {
    input.style.setProperty("--fill", `${value}%`);
  }
  _remove(id) {
    var _a2;
    this._lineOnlyById.delete(id);
    this._closeMenu();
    const pendingOpacity = this._opacityRaf.get(id);
    if (pendingOpacity !== void 0) {
      cancelAnimationFrame(pendingOpacity);
      this._opacityRaf.delete(id);
    }
    if (this._legendOpenIds.has(id)) {
      const next = new Set(this._legendOpenIds);
      next.delete(id);
      this._legendOpenIds = next;
    }
    (_a2 = this.layerManager) == null ? void 0 : _a2.removeLayer(id);
  }
  _bringToFront(id) {
    var _a2;
    this._closeMenu();
    (_a2 = this.layerManager) == null ? void 0 : _a2.raiseToTop(id);
  }
  _zoomToLayer(id) {
    var _a2;
    this._closeMenu();
    void ((_a2 = this.layerManager) == null ? void 0 : _a2.zoomToLayer(id));
  }
  _closeMenu() {
    this._openMenuId = null;
    if (this._menuPortalEl) this._menuPortalEl.open = false;
  }
  _toggleMenu(layer, event) {
    if (this._openMenuId === layer.id) {
      this._closeMenu();
      return;
    }
    this._openMenuId = layer.id;
    this._openMenuPortal(layer, event.currentTarget);
  }
  // Menu icerigini/konumunu portal instance'ina yazar -- bkz.
  // layer-list/LayerMenuPortal.ts WHY yorumu (panel-body'nin yatay kirpmasindan
  // kacinmak icin document.body'ye portallanmis TEK instance). Hangi
  // aksiyonlarin hangi sirada gorunecegine karar veren mantik GC-03 yardimci
  // sinif cikarma plani Faz 2'de layer-list/LayerMenuActions.ts'e tasindi --
  // burada SADECE LayerManager sorgularini flags/callbacks'e cozup
  // pozisyonu hesaplayip portala yazmak kalir.
  _openMenuPortal(layer, anchor) {
    var _a2, _b;
    if (!this._menuPortalEl) return;
    const rect = anchor.getBoundingClientRect();
    const analysisResult = ((_a2 = this.layerManager) == null ? void 0 : _a2.isAnalysisResult(layer.id)) ?? layer.analysisResult;
    this._menuPortalEl.actions = buildLayerMenuActions(
      { styleMode: layer.styleMode, layerType: layer.layerType },
      {
        styleEditorAvailable: this._styleEditorAvailable,
        legendAvailable: this._legendAvailable,
        layerExportAvailable: this._layerExportAvailable,
        isAnalysisResult: analysisResult,
        isGeoTiffExportAvailable: ((_b = this.layerManager) == null ? void 0 : _b.isGeoTiffExportAvailable(layer.id)) ?? false
      },
      {
        zoomToLayer: () => this._zoomToLayer(layer.id),
        bringToFront: () => this._bringToFront(layer.id),
        remove: () => this._remove(layer.id),
        openStyleEditor: () => this._openStyleEditor(layer),
        toggleLegend: () => this._toggleLegend(layer.id),
        exportLayer: () => this._exportLayer(layer),
        exportLayerKml: () => this._exportLayerKml(layer),
        exportLayerShapefile: () => this._exportLayerShapefile(layer),
        exportLayerAsGeoTiff: () => this._exportLayerAsGeoTiff(layer)
      }
    );
    this._menuPortalEl.x = rect.right + 4;
    this._menuPortalEl.y = rect.top;
    this._menuPortalEl.open = true;
  }
  _openStyleEditor(layer) {
    var _a2;
    this._closeMenu();
    this._overlayCoordinator.closeOthers("styleEditor");
    (_a2 = this._styleEditorPortal.element) == null ? void 0 : _a2.openFor(
      layer.id,
      layer.title,
      layer.layerType,
      layer.fill,
      layer.opacity
    );
  }
  _toggleLegend(id) {
    this._closeMenu();
    const next = new Set(this._legendOpenIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    this._legendOpenIds = next;
  }
  _exportLayer(layer) {
    var _a2;
    this._closeMenu();
    if (!this.layerManager) return;
    (_a2 = this._layerExportMarker) == null ? void 0 : _a2.exportLayer(this.layerManager, layer.id, layer.title);
  }
  /** Analiz sonucu katmanı KML indirir. Çizim menüsü bu yolu kullanmaz. */
  _exportLayerKml(layer) {
    var _a2;
    this._closeMenu();
    if (!this.layerManager) return;
    (_a2 = this._layerExportMarker) == null ? void 0 : _a2.exportLayerKml(this.layerManager, layer.id, layer.title);
  }
  /** Analiz sonucu katmanı Shapefile zip indirir. Çizim menüsü bu yolu kullanmaz. */
  _exportLayerShapefile(layer) {
    var _a2;
    this._closeMenu();
    if (!this.layerManager) return;
    (_a2 = this._layerExportMarker) == null ? void 0 : _a2.exportLayerShapefile(this.layerManager, layer.id, layer.title);
  }
  // GeoJSON export'un (yukarisi) aksine gercek bir ag istegi -- basarisiz
  // olabilir (sunucu erisilemez/CORS/beklenmedik yanit). Bu panelde asenkron
  // islemler icin bir bildirim/toast mekanizmasi yok; MVP kapsaminda hata
  // sessizce konsola loglanir (TucbsMapPreview.ensureApiKeyValid() ile AYNI
  // "yakala ve logla" deseni) -- kullanici indirmenin gerceklesmedigini
  // sadece tarayicida bir indirme baslamamasindan anlar.
  async _exportLayerAsGeoTiff(layer) {
    var _a2;
    this._closeMenu();
    if (!this.layerManager) return;
    this._geoTiffExportingIds = new Set(this._geoTiffExportingIds).add(layer.id);
    try {
      await ((_a2 = this._layerExportMarker) == null ? void 0 : _a2.exportLayerAsGeoTiff(
        this.layerManager,
        layer.id,
        layer.title
      ));
    } catch (err) {
      console.error("[tucbs-layer-list] GeoTIFF export başarısız:", err);
    } finally {
      this._geoTiffExportingIds = new Set([...this._geoTiffExportingIds].filter((id) => id !== layer.id));
    }
  }
  // GC-03 Adim 5 (Faz 2): pointer/DOM mekanigi layer-list/DragReorder.ts'e
  // tasindi (bkz _dragReorder alani) -- burada SADECE is mantigi kalir:
  // surukleme bittiginde yeni sirayi `_layers`'a uygulamak ve
  // `LayerManager.reorder()` cagirmak. ORIJINAL _endDrag'in TEK SATIR
  // davranis degisikligi OLMADAN tasinmis son yarisi.
  _applyReorder(draggedId, nextId) {
    var _a2;
    const oldIndex = this._layers.findIndex((layer) => layer.id === draggedId);
    const dragged = oldIndex === -1 ? void 0 : this._layers[oldIndex];
    if (!dragged) return;
    const rest = this._layers.filter((layer) => layer.id !== draggedId);
    const insertIndex = nextId ? rest.findIndex((layer) => layer.id === nextId) : -1;
    const newIndex = insertIndex === -1 ? rest.length : insertIndex;
    rest.splice(newIndex, 0, dragged);
    this._layers = rest;
    if (newIndex !== oldIndex) {
      (_a2 = this.layerManager) == null ? void 0 : _a2.reorder(this._layers.map((layer) => layer.id));
    }
  }
  /** Bileşenin şablonunu render eder (`layerManager` bağlanmamışsa tamamen gizli kalır). */
  render() {
    if (!this.layerManager) return A;
    return b`
      ${!this._open && this.collapsible ? b`
            <button
              type="button"
              class="toggle-btn"
              @click=${() => this._openPanel()}
            >
              Katmanları Göster
              <span class="toggle-arrow" aria-hidden="true"
                >${ICON_CHEVRON_RIGHT$1}</span
              >
            </button>
          ` : A}
      <tucbs-slide-over-panel
        side="left"
        panelTitle="Katman Yönetimi"
        panel-width=${this.panelWidth}
        .open=${this._open}
        .closable=${this.collapsible}
        .onCloseRequest=${() => this._closePanel()}
      >
        <span slot="icon">${ICON_LAYERS}</span>
        ${this._renderHeader()}

        <div class="layer-list">
          ${this._layers.length === 0 ? b`<div class="layer-empty">Katman yok</div>` : c(
      this._layers,
      (layer) => layer.id,
      (layer) => this._renderLayerRow(layer)
    )}
        </div>
      </tucbs-slide-over-panel>
    `;
  }
  _renderHeader() {
    if (!this._fileUploadAvailable && !this._serviceUploadAvailable && !(this._authorizedLayersAvailable && this._hasApiKey)) {
      return A;
    }
    return b`
      <div class="header-actions">
        ${this._fileUploadAvailable ? b`
              <button
                type="button"
                class="add-btn"
                data-tooltip="Veri Dosyası Ekle"
                aria-label="Veri Dosyası Ekle"
                @click=${() => this._openUpload()}
              >
                ${ICON_DOCUMENT_BLANK}
              </button>
            ` : ""}
        ${this._serviceUploadAvailable ? b`
              <button
                type="button"
                class="add-btn"
                data-tooltip="Coğrafi Veri Servisi Ekle"
                aria-label="Coğrafi Veri Servisi Ekle"
                @click=${() => this._openServiceUpload()}
              >
                ${ICON_CLOUD_DOWNLOAD$1}
              </button>
            ` : ""}
        ${this._authorizedLayersAvailable && this._hasApiKey ? b`
              <button
                type="button"
                class="add-btn"
                data-tooltip="APIKey ile Yetkili Katmanlarımı Getir"
                aria-label="APIKey ile Yetkili Katmanlarımı Getir"
                ?disabled=${this._authorizedLayersFetching}
                @click=${() => this._openAuthorizedLayers()}
              >
                ${ICON_API_KEY$1}
              </button>
            ` : ""}
      </div>
    `;
  }
  _activateDrawingLayer(id) {
    var _a2;
    (_a2 = this.map) == null ? void 0 : _a2.drawingLayers.setActive(id);
  }
  // Sadece Cizim Katmanlari (kayit defterinde olanlar) "aktif" olabilir; diger
  // katmanlar ve Olcu Katmani icin null doner (isim satiri bugunku gibi kalir).
  _renderLayerName(layer) {
    var _a2;
    const drawing = (_a2 = this.map) == null ? void 0 : _a2.drawingLayers.get(layer.id);
    if (!drawing) return b`<span class="layer-name" title=${layer.title}>${layer.title}</span>`;
    const active = layer.id === this._activeDrawingLayerId;
    return b`
      <span class="layer-kind-icon" aria-hidden="true"
        >${renderDrawKindIcon(drawing.kind, drawKindPaint(drawing.kind, layer.styleMode === "off" ? "none" : layer.fill, layer.outlineColor, layer.symbol))}</span
      >
      <span
        class="layer-name layer-name--drawing ${active ? "layer-name--active" : ""}"
        role="button"
        tabindex="0"
        aria-pressed=${active ? "true" : "false"}
        title=${active ? `${layer.title} (aktif çizim katmanı)` : `${layer.title} — aktif çizim katmanı yapmak için tıklayın`}
        @click=${() => this._activateDrawingLayer(layer.id)}
        @keydown=${(event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        this._activateDrawingLayer(layer.id);
      }
    }}
        >${layer.title}</span
      >
    `;
  }
  _renderLayerRow(layer) {
    var _a2, _b;
    const sliderValue = layer.opacity * 100;
    const pct = Math.round(sliderValue);
    const activeDrawing = layer.id === this._activeDrawingLayerId && ((_a2 = this.map) == null ? void 0 : _a2.drawingLayers.has(layer.id));
    return b`
      <div class="layer-item ${activeDrawing ? "layer-item--active-drawing" : ""}" data-layer-id=${layer.id}>
        <div class="layer-row">
          <button
            type="button"
            class="drag-handle"
            data-tooltip="Sürükleyerek Sırala"
            aria-label="${layer.title} katmanını sırala"
            @pointerdown=${(event) => {
      const handle = event.currentTarget;
      const item = handle.closest(".layer-item");
      const list = item == null ? void 0 : item.closest(".layer-list");
      if (item instanceof HTMLElement && list instanceof HTMLElement) {
        this._dragReorder.start(event, item, handle, list);
      }
    }}
          >
            ${ICON_DRAG_HANDLE}
          </button>

          <cds-checkbox
            .checked=${layer.visible}
            aria-label=${layer.title}
            @cds-checkbox-changed=${(event) => {
      var _a3;
      const checked = ((_a3 = event.detail) == null ? void 0 : _a3.checked) ?? !layer.visible;
      this._setVisible(layer.id, !!checked);
    }}
          ></cds-checkbox>

          ${layer.layerType !== "DRAWING" && layer.layerType !== "MEASURE" ? b`
                <span
                  class="layer-color-dot ${layer.styleMode === "off" ? "layer-color-dot--empty" : ""}"
                  style=${layerSwatchStyle(layer.styleMode, layer.fill, layer.outlineColor)}
                  title=${layer.styleMode === "solid" ? "Katman rengi" : "Katman rengi (yalnız sabit renk modunda değiştirilebilir)"}
                >
                  <input
                    type="color"
                    .value=${toHexColor(layer.fill)}
                    ?disabled=${layer.styleMode !== "solid"}
                    aria-label="${layer.title} rengi"
                    @input=${(event) => {
      this._setLayerColor(
        layer.id,
        event.target.value
      );
    }}
                  />
                </span>
              ` : ""}
          ${this._renderLayerName(layer)}

          <div class="layer-actions">
            <div class="layer-options">
              <button
                type="button"
                class="options-btn"
                aria-label=${this._geoTiffExportingIds.has(layer.id) ? "GeoTIFF İndiriliyor…" : "Katman Seçenekleri"}
                aria-haspopup="menu"
                aria-expanded=${this._openMenuId === layer.id}
                ?disabled=${this._geoTiffExportingIds.has(layer.id)}
                @click=${(event) => {
      this._hidePortalTooltip();
      this._toggleMenu(layer, event);
    }}
                @mouseenter=${(event) => this._showPortalTooltip(
      event.currentTarget,
      this._geoTiffExportingIds.has(layer.id) ? "GeoTIFF İndiriliyor…" : "Katman Seçenekleri"
    )}
                @mouseleave=${() => this._hidePortalTooltip()}
                @focus=${(event) => this._showPortalTooltip(
      event.currentTarget,
      this._geoTiffExportingIds.has(layer.id) ? "GeoTIFF İndiriliyor…" : "Katman Seçenekleri"
    )}
                @blur=${() => this._hidePortalTooltip()}
              >
                ${this._geoTiffExportingIds.has(layer.id) ? b`<span class="options-btn-spinner"></span>` : ICON_OVERFLOW_MENU}
              </button>
            </div>
          </div>
        </div>

        ${layer.layerType !== "DRAWING" && layer.layerType !== "MEASURE" ? b`
              <div class="layer-opacity-row">
                <span class="layer-opacity-pct">%${pct}</span>
                <input
                  type="range"
                  class="opacity-slider"
                  min="0"
                  max="100"
                  step="0.1"
                  .value=${String(sliderValue)}
                  style="--fill: ${sliderValue}%"
                  @input=${(event) => {
      const input = event.target;
      const value = Number(input.value);
      this._updateOpacitySlider(input, value);
      this._setOpacity(layer.id, value / 100);
    }}
                />
              </div>
            ` : ""}

        ${this._legendAvailable && layer.styleMode !== "solid" && this._legendOpenIds.has(layer.id) ? b`<tucbs-legend-panel
              layerId=${layer.id}
              layerType=${layer.layerType}
              .layerManager=${this.layerManager}
              .open=${true}
              .customCss=${((_b = this._legendMarker) == null ? void 0 : _b.customCss) ?? ""}
            ></tucbs-legend-panel>` : ""}
      </div>
    `;
  }
};
_apiKeyState$1 = /* @__PURE__ */ new WeakMap();
TucbsLayerList.styles = [bottomRightTooltipStyles, layerListStyles];
__decorateClass$t([
  n$1({ attribute: false })
], TucbsLayerList.prototype, "layerManager", 2);
__decorateClass$t([
  n$1({ attribute: false })
], TucbsLayerList.prototype, "map", 2);
__decorateClass$t([
  n$1()
], TucbsLayerList.prototype, "mapElementId", 2);
__decorateClass$t([
  n$1({ attribute: "api-key" })
], TucbsLayerList.prototype, "apiKey", 1);
__decorateClass$t([
  n$1({ attribute: "panel-width" })
], TucbsLayerList.prototype, "panelWidth", 2);
__decorateClass$t([
  n$1({ converter: defaultTrueAttribute })
], TucbsLayerList.prototype, "collapsible", 2);
__decorateClass$t([
  n$1({ attribute: "custom-css" })
], TucbsLayerList.prototype, "customCss", 2);
__decorateClass$t([
  r()
], TucbsLayerList.prototype, "_open", 2);
__decorateClass$t([
  r()
], TucbsLayerList.prototype, "_layers", 2);
__decorateClass$t([
  r()
], TucbsLayerList.prototype, "_activeDrawingLayerId", 2);
__decorateClass$t([
  r()
], TucbsLayerList.prototype, "_openMenuId", 2);
__decorateClass$t([
  r()
], TucbsLayerList.prototype, "_geoTiffExportingIds", 2);
__decorateClass$t([
  r()
], TucbsLayerList.prototype, "_uploadOpen", 2);
__decorateClass$t([
  r()
], TucbsLayerList.prototype, "_fileUploadAvailable", 2);
__decorateClass$t([
  r()
], TucbsLayerList.prototype, "_serviceUploadOpen", 2);
__decorateClass$t([
  r()
], TucbsLayerList.prototype, "_serviceUploadAvailable", 2);
__decorateClass$t([
  r()
], TucbsLayerList.prototype, "_styleEditorAvailable", 2);
__decorateClass$t([
  r()
], TucbsLayerList.prototype, "_legendAvailable", 2);
__decorateClass$t([
  r()
], TucbsLayerList.prototype, "_layerExportAvailable", 2);
__decorateClass$t([
  r()
], TucbsLayerList.prototype, "_legendOpenIds", 2);
__decorateClass$t([
  r()
], TucbsLayerList.prototype, "_authorizedLayersAvailable", 2);
__decorateClass$t([
  r()
], TucbsLayerList.prototype, "_authorizedLayersFetching", 2);
__decorateClass$t([
  r()
], TucbsLayerList.prototype, "_hasApiKey", 2);
TucbsLayerList = __decorateClass$t([
  t$3("tucbs-layer-list")
], TucbsLayerList);
const authorizedLayersStyles = i$6`
  /* font-family burada (display:contents olsa da) :host'a verilir -- bu
     inherited bir CSS ozelligi oldugundan kutu uretip uretmemesinden
     (display degerinden) BAGIMSIZ olarak alt agaca akar; TucbsLayerList'in
     KENDI ":host{font-family:...}" kuralindan miras alinan degerin AYNISI
     (bkz. taşınmadan önceki orijinal, bu bilesen artik o shadow root'ta
     degil, kendi miras zincirini kurmasi gerekiyor). */
  :host {
    display: contents;
    font-family: "IBM Plex Sans", system-ui, sans-serif;
  }

  /* Yetkili katman seçici — coğrafi veri servisi ekle ile aynı seç→ekle deseni */
  .authorized-dialog {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 10000;
    display: flex;
    flex-direction: column;
    width: min(420px, calc(100vw - 2rem));
    /* 520px -> 620px: liste artik (bkz. .authorized-list flex:0 0 auto
       WHY yorumu) 5 satirlik dogal yuksekligini KORUYOR -- basarisiz
       ekleme sonrasi ".authorized-error" banner'i da araya girince
       (baslik+5 satir+hata+buton) toplam icerik eski 520px sinirini
       asiyor, "Haritaya Ekle" butonu dialogun beyaz kutusunun DISINA
       tasip haritanin ustunde havada kalmis gibi goruluyordu (bkz
       kullanici bildirimi: "buton asagiya kaymis") -- overflow hicbir
       yerde auto olmadigindan bu tasma GORUNUR ama TIKLANAMAZ/kesik
       degildi. overflow-y:auto ise (asagida) cok kisa viewport gibi
       daha da uc durumlar icin son bir guvenlik agi -- normalde
       600px'lik yeni sinir icine sigdigi icin devreye girmez. */
    max-height: min(620px, calc(100vh - 2rem));
    overflow-y: auto;
    /* overflow-x:hidden SART -- yalnizca overflow-y verilip overflow-x
       "visible" birakilirsa CSS spec geregi tarayici overflow-x'i de
       zimnen "auto" hesaplar (bkz. CSS Overflow spec, "if one of
       overflow-x/overflow-y is not visible, the other computes to auto"),
       bu da yatay scrollbar'in GEREKSIZ yere belirmesine yol aciyordu
       (bkz kullanici bildirimi: "Horizontal scroll hiç olmasın"). */
    overflow-x: hidden;
    transform: translate(-50%, -50%);
    background: var(--cds-layer-01, #ffffff);
    border: 1px solid var(--cds-border-subtle, #e0e0e0);
    border-radius: 4px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
    font-size: 0.875rem;
    color: var(--cds-text-primary, #161616);
  }

  .authorized-dialog-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid var(--cds-border-subtle, #e0e0e0);
    font-weight: 600;
    cursor: move;
    user-select: none;
    touch-action: none;
  }

  .authorized-dialog-title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    white-space: nowrap;
  }

  .title-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.25rem;
    height: 1.25rem;
    line-height: 0;
    color: #0f62fe;
  }

  .title-icon svg {
    width: 1.25rem;
    height: 1.25rem;
    display: block;
  }

  .authorized-dialog-close {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border: none;
    background: transparent;
    color: var(--cds-icon-secondary, #6f6f6f);
    cursor: pointer;
  }

  .authorized-dialog-body {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 0.75rem;
    min-height: 0;
    padding: 0.75rem 1rem 1rem;
  }

  .authorized-list {
    /* flex:1 (flex-basis:0%) DEGIL -- bu, ebeveyn ".authorized-dialog-body"
       flex-basis:0% ile SIRALI (nested) iki flex:1 ogesi zincirinde,
       konteynir yuksekligi max-height ile SINIRLI (ama height:auto)
       oldugunda tarayicinin listeyi kendi (5 satirlik) icerik boyundan
       KUCUK boyuta sikistirmasina yol aciyordu -- ozellikle listenin
       ALTINDA ".authorized-error"/ekle butonu gibi KARDES bir eleman
       belirince (bkz kullanici bildirimi: "5 item varken scroll cikmiyor
       ama hata mesaji gelince scroll'a dusuyor"). flex:0 0 auto ile
       listenin yuksekligi SADECE kendi icerigine (ya da >5 durumunda asagidaki
       max-height JS atamasina) baglidir, kardes elemanlar tarafindan
       KUCULTULEMEZ. */
    flex: 0 0 auto;
    overflow: auto;
    border: 1px solid var(--cds-border-subtle, #e0e0e0);
    border-radius: 4px;
    /* max-height JS ile _syncAuthorizedListMaxHeight() tarafından atanır --
       bkz. o metodun WHY yorumu (satır sayisi degil, gercek piksel
       yukseklik gerekiyor cunku satirlar degisken yukseklikte/metin
       kirpilmiyor). */
  }

  .authorized-row {
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
    padding: 0.5rem 0.75rem;
    /* Satirlar arasi ayrac CIKARILDI -- son gorunecek satirin kendi
       border-bottom'u, listenin (".authorized-list") KENDI kutu
       kenarligiyla ayni noktada UST USTE/bitisik iki cizgi gibi
       goruntyordu (bkz kullanici bildirimi: ekran goruntusu, "2 border
       line ust uste gelmis"). Tek cizgi kalsin diye satir ayraci
       tamamen kaldirildi -- satirlar arasi bosluk artik sadece padding
       ile ayirt ediliyor. */
  }

  .authorized-row--disabled {
    opacity: 0.55;
  }

  .authorized-row-main {
    display: flex;
    align-items: flex-start;
    gap: 0.25rem;
  }

  .authorized-row-main cds-checkbox {
    flex: 1;
    min-width: 0;
  }

  .authorized-token-btn {
    display: inline-flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    margin-top: 0.1rem;
    border: none;
    border-radius: 4px;
    background: transparent;
    color: var(--cds-icon-secondary, #6f6f6f);
    cursor: pointer;
  }

  .authorized-token-btn:hover:not(:disabled) {
    background: var(--cds-layer-hover-01, #e8e8e8);
    color: var(--cds-icon-primary, #161616);
  }

  .authorized-token-btn:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }

  .authorized-meta {
    padding-left: 1.75rem;
    color: var(--cds-text-secondary, #525252);
    font-size: 0.75rem;
  }

  .token-url-dialog {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 10001;
    display: flex;
    flex-direction: column;
    width: min(520px, calc(100vw - 2rem));
    max-height: min(360px, calc(100vh - 2rem));
    transform: translate(-50%, -50%);
    background: var(--cds-layer-01, #ffffff);
    border: 1px solid var(--cds-border-subtle, #e0e0e0);
    border-radius: 4px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.22);
    font-size: 0.875rem;
    color: var(--cds-text-primary, #161616);
  }

  .token-url-dialog-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid var(--cds-border-subtle, #e0e0e0);
    font-weight: 600;
  }

  .token-url-dialog-body {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 0.75rem;
    min-height: 0;
    padding: 0.75rem 1rem 1rem;
  }

  .token-url-value {
    flex: 1;
    margin: 0;
    padding: 0.75rem;
    overflow: auto;
    border: 1px solid var(--cds-border-subtle, #e0e0e0);
    border-radius: 4px;
    background: var(--cds-field-01, #f4f4f4);
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    font-size: 0.75rem;
    line-height: 1.4;
    white-space: pre-wrap;
    word-break: break-all;
  }

  .token-url-actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
  }

  .token-url-btn {
    padding: 0.5rem 1rem;
    border: 1px solid var(--cds-border-subtle, #e0e0e0);
    border-radius: 4px;
    background: var(--cds-layer-02, #ffffff);
    color: var(--cds-text-primary, #161616);
    font: inherit;
    font-weight: 600;
    cursor: pointer;
  }

  .token-url-btn--primary {
    border-color: transparent;
    background: var(--cds-button-primary, #0f62fe);
    color: #fff;
  }

  .token-url-btn:hover {
    filter: brightness(0.97);
  }

  .authorized-error {
    color: var(--cds-support-error, #da1e28);
    font-size: 0.75rem;
    white-space: pre-wrap;
  }

  /* "Haritaya Ekle" basarisiz olunca beliren hata mesaji icin SABIT yer:
     bos/dolu farketmeksizin HER ZAMAN render edilir (bkz asagidaki
     _renderAuthorizedPicker), min-height ile tek satirlik mesaj kadar
     alan ayrilir. Boylece hata cikinca dialog aniden buyumez/"ziplamaz"
     (bkz kullanici bildirimi: "hata mesaji gelince diyalog buyuyor,
     beni rahatsiz etti -- sabit yer ayiralim"). min-height BILEREK tek
     satirlik mesaj yuksekligi kadar (2 satirlik degil) -- daha genis
     tutmak, mesaj tek satirken buton ile mesaj arasinda GEREKSIZ bos
     alan birakiyordu (bkz kullanici bildirimi: ekran goruntusu). Nadir
     gorulen 2 satirlik (birden fazla katman basarisiz oldugunda) mesaj
     durumunda dialog bir miktar buyur -- bu, HER ZAMAN goze batan sabit
     bosluktan daha iyi bir odun. */
  .authorized-add-error {
    min-height: 1.125rem;
    color: var(--cds-support-error, #da1e28);
    font-size: 0.75rem;
    white-space: pre-wrap;
  }

  .authorized-add-btn {
    align-self: stretch;
    padding: 0.625rem 1rem;
    border: none;
    border-radius: 4px;
    background: var(--cds-button-primary, #0f62fe);
    color: #fff;
    font: inherit;
    font-weight: 600;
    cursor: pointer;
  }

  .authorized-add-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
const TOAST_STYLES = i$6`
  @keyframes tucbs-toast-in {
    from {
      opacity: 0;
      transform: translate(-50%, -12px);
    }
    to {
      opacity: 1;
      transform: translate(-50%, 0);
    }
  }

  :host {
    position: fixed;
    top: 16px;
    left: 50%;
    /* Baslangic durumu transform'un KENDISI (translate(-50%,-12px)) --
       animasyonun "from" karesiyle AYNI olmali, aksi halde ilk kare
       yaniltici bir sicramaya sebep olur. */
    transform: translate(-50%, -12px);
    /* TucbsBusyOverlay'in (z-index: 2000) UZERINDE kalmali -- CRS donusum/
       WFS kayit-sinirlamasi uyarilari layerManager.add() cozulmeden ONCE
       (add()'in kendi govdesi icinde senkron emit() ile) tetiklenir, yani
       toast overlay hala AKTIFKEN gosterilir; z-index daha DUSUK olsaydi
       toast overlay'in ARKASINDA kalip GORUNMEZ olurdu (bkz kullanici
       bildirimi: bu uyarilar gorulemiyordu). */
    z-index: 2100;
    display: block;
    font-family: "IBM Plex Sans", system-ui, sans-serif;
    font-size: 0.875rem;
    width: 320px;
    max-width: calc(100vw - 2rem);
    animation: tucbs-toast-in 220ms ease-out forwards;
  }

  cds-inline-notification {
    width: 100%;
  }
`;
let activeToastEl = null;
const TOAST_TIMEOUT_MS = {
  success: 4e3,
  info: 4e3,
  warning: 6e3,
  error: 7e3
};
function showToast(kind, message) {
  destroyToast();
  const el = document.createElement("div");
  document.body.appendChild(el);
  const shadow = el.attachShadow({ mode: "open" });
  const sheet = new CSSStyleSheet();
  sheet.replaceSync(TOAST_STYLES.cssText);
  shadow.adoptedStyleSheets = [sheet];
  activeToastEl = el;
  const timeout = TOAST_TIMEOUT_MS[kind];
  D(
    b`
      <cds-inline-notification
        kind=${kind}
        hide-close-button
        timeout=${timeout}
        subtitle=${message}
        @cds-notification-closed=${() => destroyToast()}
      ></cds-inline-notification>
    `,
    shadow
  );
}
function destroyToast() {
  activeToastEl == null ? void 0 : activeToastEl.remove();
  activeToastEl = null;
}
let refCount = 0;
let overlayEnsured = false;
function ensureOverlay() {
  if (overlayEnsured || typeof document === "undefined") return;
  overlayEnsured = true;
  if (document.querySelector("tucbs-busy-overlay")) return;
  document.body.appendChild(document.createElement("tucbs-busy-overlay"));
}
function dispatch(message) {
  document.dispatchEvent(
    new CustomEvent("tucbs-busy-changed", {
      detail: { busy: refCount > 0, message }
    })
  );
}
function beginBusy(message) {
  ensureOverlay();
  refCount++;
  dispatch(message);
}
function endBusy() {
  refCount = Math.max(0, refCount - 1);
  dispatch();
}
var __defProp$r = Object.defineProperty;
var __getOwnPropDesc$s = Object.getOwnPropertyDescriptor;
var __decorateClass$s = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$s(target, key) : target;
  for (var i4 = decorators.length - 1, decorator; i4 >= 0; i4--)
    if (decorator = decorators[i4])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$r(target, key, result);
  return result;
};
function carbonIcon$1(node) {
  return o$1(iconNodeToString(node));
}
const ICON_API_KEY = carbonIcon$1(_20_default$5);
const ICON_CLOSE$5 = carbonIcon$1(_16_default$v);
const ICON_LINK = carbonIcon$1(_16_default$j);
let TucbsAuthorizedLayers = class extends i$3 {
  constructor() {
    super(...arguments);
    this.customCss = "";
    this._customCssState = { sheet: null };
    this._authorizedLayersLoading = false;
    this._authorizedPickerOpen = false;
    this._authorizedItems = [];
    this._authorizedSelectedKeys = [];
    this._authorizedFetchError = "";
    this._authorizedAddError = "";
    this._tokenUrlDialogOpen = false;
    this._tokenUrlDialogValue = "";
    this._tokenUrlDialogTitle = "";
    this._tooltipPortalEl = null;
    this._dialogDrag = new DraggablePanelController(this, {
      getPanel: (header) => {
        const dialogEl = header.closest(".authorized-dialog");
        return dialogEl instanceof HTMLElement ? dialogEl : null;
      },
      ignoreSelector: ".authorized-dialog-close"
    });
  }
  /** Picker açık mı (dışarıdan, ör. karşılıklı-dışlama için okunur). */
  get open() {
    return this._authorizedPickerOpen;
  }
  /** Lit yaşam döngüsü: bileşen DOM'a bağlandığında satır ipuçları için `document.body`'ye bir tooltip portalı ekler. */
  connectedCallback() {
    super.connectedCallback();
    this._tooltipPortalEl = document.createElement(
      "tucbs-tooltip-portal"
    );
    document.body.appendChild(this._tooltipPortalEl);
  }
  /** Lit yaşam döngüsü: bileşen DOM'dan kaldırılırken tooltip portalını kaldırır. */
  disconnectedCallback() {
    var _a2;
    (_a2 = this._tooltipPortalEl) == null ? void 0 : _a2.remove();
    this._tooltipPortalEl = null;
    super.disconnectedCallback();
  }
  /** `customCss` değişince stili uygular; seçim diyaloğu açıkken liste yüksekliğini görünür satır sayısına göre yeniden ayarlar. */
  updated(changed) {
    super.updated(changed);
    if (changed.has("customCss")) {
      applyCustomCss(this.shadowRoot, this.customCss, this._customCssState, "tucbs-authorized-layers");
    }
    if (this._authorizedPickerOpen) this._syncAuthorizedListMaxHeight();
  }
  /**
   * Yetkili katmanlar: GET /layers → seçim dialogu (coğrafi veri servisi gibi).
   * Otomatik haritaya ekleme yok. `TucbsLayerList`'in "Yetkili Katmanlarımı
   * Getir" butonu tarafından çağrılır.
   */
  async fetchAndOpen() {
    if (!this.layerManager || this._authorizedLayersLoading) return;
    this._authorizedLayersLoading = true;
    beginBusy("Yetkili katmanlar getiriliyor…");
    this._authorizedFetchError = "";
    this._authorizedAddError = "";
    try {
      const authorized = await this.layerManager.getAuthorizedLayers();
      this._authorizedItems = authorized;
      this._authorizedSelectedKeys = [];
      this._authorizedPickerOpen = true;
      if (authorized.length === 0) {
        this._authorizedFetchError = "Bu API key için yetkili katman bulunamadı.";
      }
    } catch (error) {
      if (error instanceof TucbsError) {
        console.error(`[tucbs-authorized-layers] ${error.code} (${error.number}): ${error.message}`);
      }
      this._authorizedItems = [];
      this._authorizedPickerOpen = true;
      this._authorizedFetchError = error instanceof Error ? error.message : "Yetkili katman listesi alınamadı.";
    } finally {
      this._authorizedLayersLoading = false;
      endBusy();
    }
  }
  /** Yetkili katmanlar penceresini (ve açıksa token URL penceresini) kapatır; seçim hatasını temizler. */
  closePicker() {
    this._authorizedPickerOpen = false;
    this._authorizedAddError = "";
    this._closeTokenUrlDialog();
  }
  _openTokenUrlDialog(info) {
    var _a2;
    const url = (_a2 = info.tokenUrl) == null ? void 0 : _a2.trim();
    if (!url) {
      showToast("warning", "Bu katman için token URL bulunamadı.");
      return;
    }
    this._tokenUrlDialogTitle = info.katmanAdi || info.ogcLayerName || "Token URL";
    this._tokenUrlDialogValue = url;
    this._tokenUrlDialogOpen = true;
  }
  _closeTokenUrlDialog() {
    this._tokenUrlDialogOpen = false;
    this._tokenUrlDialogValue = "";
    this._tokenUrlDialogTitle = "";
  }
  async _copyTokenUrl() {
    const url = this._tokenUrlDialogValue.trim();
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
      showToast("info", "Token URL panoya kopyalandı.");
    } catch {
      showToast("error", "Panoya kopyalanamadı.");
    }
  }
  _authorizedKey(info) {
    return info.id ?? `${info.servisTuru}|${info.servisUrl}|${info.ogcLayerName}`;
  }
  // GC-03 Adim 3 (Faz 7): eklenebilirlik mantigi artik
  // LayerManager.canAddAuthorizedLayer()'a tasindi (bkz
  // auth/ApiKeyPolicy.canAddAuthorizedLayer) -- hem bu Lit bilesen hem
  // baska bir UI katmani (ör. React) AYNI kaynagi kullanir.
  _authorizedCanAdd(info) {
    var _a2;
    return ((_a2 = this.layerManager) == null ? void 0 : _a2.canAddAuthorizedLayer(info)) ?? false;
  }
  _toggleAuthorizedSelected(key, checked) {
    this._authorizedSelectedKeys = checked ? [...this._authorizedSelectedKeys, key] : this._authorizedSelectedKeys.filter((k2) => k2 !== key);
  }
  async _addSelectedAuthorizedLayers() {
    if (!this.layerManager) {
      this._authorizedAddError = "Harita hazır değil, katman eklenemedi.";
      return;
    }
    const toAdd = this._authorizedItems.filter((info) => {
      const key = this._authorizedKey(info);
      return this._authorizedSelectedKeys.includes(key) && this._authorizedCanAdd(info);
    });
    if (toAdd.length === 0) return;
    beginBusy("Katmanlar ekleniyor…");
    this._authorizedAddError = "";
    const failed = [];
    for (const info of toAdd) {
      try {
        await this.layerManager.addAuthorizedLayer(info);
      } catch {
        failed.push(info.katmanAdi || info.ogcLayerName);
      }
    }
    this._authorizedSelectedKeys = failed.length === 0 ? [] : toAdd.filter(
      (info) => failed.includes(info.katmanAdi || info.ogcLayerName)
    ).map((info) => this._authorizedKey(info));
    endBusy();
    if (failed.length === 0) {
      this.closePicker();
    } else {
      this._authorizedAddError = `${failed.length}/${toAdd.length} katman eklenemedi: ${failed.join(", ")}`;
    }
  }
  _authorizedAddButtonLabel() {
    const n3 = this._authorizedSelectedKeys.filter((key) => {
      const info = this._authorizedItems.find(
        (item) => this._authorizedKey(item) === key
      );
      return info && this._authorizedCanAdd(info);
    }).length;
    if (n3 > 1) return `Haritaya Ekle (${n3})`;
    return "Haritaya Ekle";
  }
  _syncAuthorizedListMaxHeight() {
    var _a2;
    const list = (_a2 = this.shadowRoot) == null ? void 0 : _a2.querySelector(".authorized-list");
    if (!list) return;
    const rows = Array.from(list.querySelectorAll(".authorized-row"));
    const visibleCount = TucbsAuthorizedLayers.AUTHORIZED_VISIBLE_ROWS;
    if (rows.length <= visibleCount) {
      list.style.maxHeight = "";
      return;
    }
    const lastVisibleRow = rows[visibleCount - 1];
    if (!lastVisibleRow) return;
    const listTop = list.getBoundingClientRect().top;
    const rowBottom = lastVisibleRow.getBoundingClientRect().bottom;
    const visibleHeight = rowBottom - listTop;
    list.style.maxHeight = `${visibleHeight}px`;
  }
  // Kirpma sinirina flush yasli "URL Göster" butonunun tooltip'ini
  // _tooltipPortalEl uzerinden gosterir/gizler -- bkz. field yorumu.
  _showPortalTooltip(anchor, text) {
    if (!this._tooltipPortalEl) return;
    const rect = anchor.getBoundingClientRect();
    this._tooltipPortalEl.text = text;
    this._tooltipPortalEl.x = rect.left;
    this._tooltipPortalEl.y = rect.bottom + 6;
    this._tooltipPortalEl.open = true;
  }
  _hidePortalTooltip() {
    if (this._tooltipPortalEl) this._tooltipPortalEl.open = false;
  }
  /** Bileşenin şablonunu render eder: seçim diyaloğu kapalıyken hiçbir şey, açıkken yetkili katman seçim diyaloğu. */
  render() {
    if (!this._authorizedPickerOpen) return A;
    return this._renderAuthorizedPicker();
  }
  _renderAuthorizedPicker() {
    const selectableCount = this._authorizedSelectedKeys.filter((key) => {
      const info = this._authorizedItems.find(
        (item) => this._authorizedKey(item) === key
      );
      return info && this._authorizedCanAdd(info);
    }).length;
    return b`
      <div
        class="authorized-dialog"
        role="dialog"
        aria-label="Yetkili katmanlar"
      >
        <div
          class="authorized-dialog-header"
          @pointerdown=${(event) => this._dialogDrag.start(event)}
        >
          <span class="authorized-dialog-title"><span class="title-icon">${ICON_API_KEY}</span>Yetkili Katmanlar</span>
          <button
            type="button"
            class="authorized-dialog-close"
            data-tooltip="Kapat"
            aria-label="Kapat"
            @click=${() => this.closePicker()}
          >
            ${ICON_CLOSE$5}
          </button>
        </div>
        <div class="authorized-dialog-body">
          ${this._authorizedFetchError ? b`<div class="authorized-error">
                ${this._authorizedFetchError}
              </div>` : A}
          ${this._authorizedItems.length > 0 ? b`
                <div class="authorized-list" role="group" aria-label="Katmanlar">
                  ${this._authorizedItems.map((info) => {
      var _a2, _b;
      const key = this._authorizedKey(info);
      const canAdd = this._authorizedCanAdd(info);
      const title = info.katmanAdi || info.ogcLayerName;
      const metaParts = [
        info.servisTuru,
        info.ogcLayerName !== title ? info.ogcLayerName : "",
        info.ustKurumAdi
      ].filter(Boolean);
      const disabledHint = !canAdd && ((_a2 = info.servisTuru) == null ? void 0 : _a2.toUpperCase()) === "WMTS" && !info.wmtsTileMatrixSet ? " (TileMatrixSet eksik)" : !canAdd ? " (eksik bilgi)" : "";
      return b`
                      <div
                        class="authorized-row ${canAdd ? "" : "authorized-row--disabled"}"
                      >
                        <div class="authorized-row-main">
                          <cds-checkbox
                            title=${title}
                            ?disabled=${!canAdd}
                            .checked=${this._authorizedSelectedKeys.includes(key)}
                            @cds-checkbox-changed=${(event) => {
        var _a3;
        if (!canAdd) return;
        this._toggleAuthorizedSelected(
          key,
          !!((_a3 = event.detail) == null ? void 0 : _a3.checked)
        );
      }}
                          >
                            ${title}${disabledHint}
                          </cds-checkbox>
                          <button
                            type="button"
                            class="authorized-token-btn"
                            aria-label="URL Göster"
                            ?disabled=${!((_b = info.tokenUrl) == null ? void 0 : _b.trim())}
                            @click=${(event) => {
        event.stopPropagation();
        this._hidePortalTooltip();
        this._openTokenUrlDialog(info);
      }}
                            @mouseenter=${(event) => this._showPortalTooltip(event.currentTarget, "URL Göster")}
                            @mouseleave=${() => this._hidePortalTooltip()}
                            @focus=${(event) => this._showPortalTooltip(event.currentTarget, "URL Göster")}
                            @blur=${() => this._hidePortalTooltip()}
                          >
                            ${ICON_LINK}
                          </button>
                        </div>
                        <div class="authorized-meta">
                          ${metaParts.join(" · ")}
                        </div>
                      </div>
                    `;
    })}
                </div>
                <div class="authorized-add-error">${this._authorizedAddError}</div>
                <button
                  type="button"
                  class="authorized-add-btn"
                  ?disabled=${selectableCount === 0}
                  @click=${() => this._addSelectedAuthorizedLayers()}
                >
                  ${this._authorizedAddButtonLabel()}
                </button>
              ` : A}
        </div>
      </div>
      ${this._tokenUrlDialogOpen ? this._renderTokenUrlDialog() : A}
    `;
  }
  _renderTokenUrlDialog() {
    return b`
      <div
        class="token-url-dialog"
        role="dialog"
        aria-label="Token URL"
      >
        <div class="token-url-dialog-header">
          <span>${this._tokenUrlDialogTitle}</span>
          <button
            type="button"
            class="authorized-dialog-close"
            data-tooltip="Kapat"
            aria-label="Kapat"
            @click=${() => this._closeTokenUrlDialog()}
          >
            ${ICON_CLOSE$5}
          </button>
        </div>
        <div class="token-url-dialog-body">
          <pre class="token-url-value">${this._tokenUrlDialogValue}</pre>
          <div class="token-url-actions">
            <button
              type="button"
              class="token-url-btn"
              @click=${() => this._closeTokenUrlDialog()}
            >
              Kapat
            </button>
            <button
              type="button"
              class="token-url-btn token-url-btn--primary"
              @click=${() => this._copyTokenUrl()}
            >
              Kopyala
            </button>
          </div>
        </div>
      </div>
    `;
  }
};
TucbsAuthorizedLayers.styles = authorizedLayersStyles;
TucbsAuthorizedLayers.AUTHORIZED_VISIBLE_ROWS = 4;
__decorateClass$s([
  n$1({ attribute: false })
], TucbsAuthorizedLayers.prototype, "layerManager", 2);
__decorateClass$s([
  n$1({ attribute: "custom-css" })
], TucbsAuthorizedLayers.prototype, "customCss", 2);
__decorateClass$s([
  r()
], TucbsAuthorizedLayers.prototype, "_authorizedLayersLoading", 2);
__decorateClass$s([
  r()
], TucbsAuthorizedLayers.prototype, "_authorizedPickerOpen", 2);
__decorateClass$s([
  r()
], TucbsAuthorizedLayers.prototype, "_authorizedItems", 2);
__decorateClass$s([
  r()
], TucbsAuthorizedLayers.prototype, "_authorizedSelectedKeys", 2);
__decorateClass$s([
  r()
], TucbsAuthorizedLayers.prototype, "_authorizedFetchError", 2);
__decorateClass$s([
  r()
], TucbsAuthorizedLayers.prototype, "_authorizedAddError", 2);
__decorateClass$s([
  r()
], TucbsAuthorizedLayers.prototype, "_tokenUrlDialogOpen", 2);
__decorateClass$s([
  r()
], TucbsAuthorizedLayers.prototype, "_tokenUrlDialogValue", 2);
__decorateClass$s([
  r()
], TucbsAuthorizedLayers.prototype, "_tokenUrlDialogTitle", 2);
TucbsAuthorizedLayers = __decorateClass$s([
  t$3("tucbs-authorized-layers")
], TucbsAuthorizedLayers);
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const a = Symbol.for(""), o = (t3) => {
  if ((t3 == null ? void 0 : t3.r) === a) return t3 == null ? void 0 : t3._$litStatic$;
}, s = (t3) => ({ _$litStatic$: t3, r: a }), l = /* @__PURE__ */ new Map(), n2 = (t3) => (r2, ...e3) => {
  const a2 = e3.length;
  let s2, i4;
  const n3 = [], u2 = [];
  let c2, $2 = 0, f2 = false;
  for (; $2 < a2; ) {
    for (c2 = r2[$2]; $2 < a2 && void 0 !== (i4 = e3[$2], s2 = o(i4)); ) c2 += s2 + r2[++$2], f2 = true;
    $2 !== a2 && u2.push(i4), n3.push(c2), $2++;
  }
  if ($2 === a2 && n3.push(r2[a2]), f2) {
    const t4 = n3.join("$$lit$$");
    void 0 === (r2 = l.get(t4)) && (n3.raw = n3, l.set(t4, r2 = n3)), e3 = u2;
  }
  return t3(r2, ...e3);
}, u = n2(b);
var __defProp$q = Object.defineProperty;
var __getOwnPropDesc$r = Object.getOwnPropertyDescriptor;
var __decorateClass$r = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$r(target, key) : target;
  for (var i4 = decorators.length - 1, decorator; i4 >= 0; i4--)
    if (decorator = decorators[i4])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$q(target, key, result);
  return result;
};
const MIN_ZOOM_LIMIT_TOLERANCE = 1.1;
const ICON_ZOOM_IN$1 = o$1(iconNodeToString(_16_default$1));
const ICON_ZOOM_OUT = o$1(iconNodeToString(_16_default));
const ICON_DEFAULT_EXTENT = o$1(iconNodeToString(_16_default$n));
let TucbsZoomTool = class extends i$3 {
  constructor() {
    super(...arguments);
    this.mapElementId = "";
    this.customCss = "";
    this._customCssState = { sheet: null };
    this._atMaxZoom = false;
    this._atMinZoom = false;
  }
  /** `customCss` degistiginde shadow DOM'a enjekte edilen ozel stili gunceller. */
  updated(changed) {
    if (changed.has("map")) this._watchZoomLimits();
    if (changed.has("customCss")) {
      applyCustomCss(this.shadowRoot, this.customCss, this._customCssState, "tucbs-zoom-tool");
    }
  }
  // === Yasam Dongusu: Map baglama ===
  /**
   * Ilk render sonrasi haritaya baglanir: `map` property binding ile zaten
   * atanmissa (Senaryo 1) hicbir sey yapmaz; aksi halde `mapElementId` ile
   * DOM'dan haritayi bulup `map`'i atar, gerekirse elementin `ready`
   * event'ini bekler (Senaryo 2).
   */
  firstUpdated() {
    bindMapByElementId(this, {
      noIdTiming: "raf",
      ...standardMapBindingMessages("tucbs-zoom-tool", "islevsiz")
    });
  }
  // postRender her karede tetiklenir; kamera durunca (requestRenderMode ya da
  // degisim yoksa) hic cagrilmaz. Sadece sinir durumu DEGISINCE state yazilir,
  // yani gereksiz Lit render'i olusmaz.
  _watchZoomLimits() {
    var _a2, _b;
    (_a2 = this._unsubscribeZoomLimits) == null ? void 0 : _a2.call(this);
    this._unsubscribeZoomLimits = void 0;
    const viewer = (_b = this.map) == null ? void 0 : _b.viewer;
    if (!viewer) return;
    const controller = viewer.scene.screenSpaceCameraController;
    const update = () => {
      const height = viewer.camera.positionCartographic.height;
      this._atMaxZoom = height >= controller.maximumZoomDistance * 0.999;
      this._atMinZoom = height <= controller.minimumZoomDistance * MIN_ZOOM_LIMIT_TOLERANCE;
    };
    update();
    this._unsubscribeZoomLimits = viewer.scene.postRender.addEventListener(update);
  }
  /** Lit yaşam döngüsü: bileşen DOM'dan kaldırılırken kamera yakınlaştırma sınırı izleyicisini (`postRender` aboneliği) kaldırır. */
  disconnectedCallback() {
    var _a2;
    super.disconnectedCallback();
    (_a2 = this._unsubscribeZoomLimits) == null ? void 0 : _a2.call(this);
    this._unsubscribeZoomLimits = void 0;
  }
  /** Lit yaşam döngüsü: bileşen DOM'a yeniden eklendiğinde, harita bağlıysa kamera yakınlaştırma sınırı izleyicisini yeniden kurar. */
  connectedCallback() {
    super.connectedCallback();
    if (this.map && !this._unsubscribeZoomLimits) this._watchZoomLimits();
  }
  _zoomIn() {
    var _a2;
    (_a2 = this.map) == null ? void 0 : _a2.zoomInStep();
  }
  _zoomOut() {
    var _a2;
    (_a2 = this.map) == null ? void 0 : _a2.zoomOutStep();
  }
  _goToDefaultExtent() {
    if (!this.map) return;
    this.map.setExtent(this.defaultExtent ?? DEFAULT_INITIAL_EXTENT);
  }
  /** Yakinlastir, Varsayilan Sinir ve Uzaklastir butonlarindan olusan buton grubunu render eder. */
  render() {
    return b`
      <div class="tool-group">
        <button
          class="tool-button"
          type="button"
          aria-label="Varsayılan Sınır"
          data-tooltip="Varsayılan Sınır"
          @click=${this._goToDefaultExtent}
        >
          ${ICON_DEFAULT_EXTENT}
        </button>
        <button
          class="tool-button"
          type="button"
          aria-label="Yakınlaştır"
          data-tooltip="Yakınlaştır"
          ?disabled=${this._atMinZoom}
          @click=${this._zoomIn}
        >
          ${ICON_ZOOM_IN$1}
        </button>
        <button
          class="tool-button"
          type="button"
          aria-label="Uzaklaştır"
          data-tooltip="Uzaklaştır"
          ?disabled=${this._atMaxZoom}
          @click=${this._zoomOut}
        >
          ${ICON_ZOOM_OUT}
        </button>
      </div>
    `;
  }
};
TucbsZoomTool.styles = [
  leftTooltipStyles,
  i$6`
    :host {
      display: inline-flex;
      font-family: "IBM Plex Sans", system-ui, sans-serif;
    }

    .tool-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .tool-button {
      width: 2.25rem;
      height: 2.25rem;
      border-radius: 50%;
      border: 1px solid var(--cds-border-subtle, #e0e0e0);
      background: var(--cds-layer-01, #ffffff);
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      cursor: pointer;
      color: var(--cds-text-primary, #161616);
    }

    .tool-button:hover:not(:disabled) {
      background: var(--cds-layer-hover-01, #e8e8e8);
    }

    .tool-button:disabled {
      cursor: not-allowed;
      opacity: 0.4;
      color: var(--cds-text-disabled, #8d8d8d);
    }

    .tool-button svg {
      width: 1rem;
      height: 1rem;
    }
  `
];
__decorateClass$r([
  n$1()
], TucbsZoomTool.prototype, "mapElementId", 2);
__decorateClass$r([
  n$1({ type: Object, attribute: "default-extent" })
], TucbsZoomTool.prototype, "defaultExtent", 2);
__decorateClass$r([
  n$1({ attribute: "custom-css" })
], TucbsZoomTool.prototype, "customCss", 2);
__decorateClass$r([
  n$1({ attribute: false })
], TucbsZoomTool.prototype, "map", 2);
__decorateClass$r([
  r()
], TucbsZoomTool.prototype, "_atMaxZoom", 2);
__decorateClass$r([
  r()
], TucbsZoomTool.prototype, "_atMinZoom", 2);
TucbsZoomTool = __decorateClass$r([
  t$3("tucbs-zoom-tool")
], TucbsZoomTool);
const GOTO_COORDINATE_PIN_URL = "data:image/png;base64,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";
const GOTO_COORDINATE_PIN_OPTIONS = {
  /** Pinin ekrandaki genişliği (CSS px). */
  width: 32,
  /** Pinin ekrandaki yüksekliği (CSS px). */
  height: 32,
  /** Pin dairesel olduğu için merkezi koordinata oturur. */
  anchor: "center"
};
var __defProp$p = Object.defineProperty;
var __getOwnPropDesc$q = Object.getOwnPropertyDescriptor;
var __decorateClass$q = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$q(target, key) : target;
  for (var i4 = decorators.length - 1, decorator; i4 >= 0; i4--)
    if (decorator = decorators[i4])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$p(target, key, result);
  return result;
};
const ICON_LOCATION$1 = o$1(iconNodeToString(_16_default$i));
const PANEL_CONTENT_STYLES = `
  .tucbs-goto-field-label {
    display: block;
    margin-bottom: 0.5rem;
    color: var(--cds-text-secondary, #525252);
    font-size: 0.75rem;
  }

  .tucbs-goto-card cds-text-input {
    display: block;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid var(--cds-border-strong-01, #8d8d8d);
    border-radius: 4px;
  }

  .tucbs-goto-card cds-text-input:focus-within {
    border-color: var(--cds-interactive, #0f62fe);
  }

  .tucbs-goto-card {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .tucbs-goto-error {
    font-size: 0.75rem;
    color: var(--cds-text-error, #da1e28);
  }

  .tucbs-goto-submit {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 2.25rem;
    border: none;
    border-radius: 4px;
    background: var(--cds-interactive, #0f62fe);
    color: #ffffff;
    font-family: inherit;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
  }

  .tucbs-goto-submit:hover:not(:disabled) {
    background: var(--cds-button-primary-hover, #0353e9);
  }

  .tucbs-goto-submit:disabled {
    background: var(--cds-button-disabled, #c6c6c6);
    color: var(--cds-text-on-color-disabled, #8d8d8d);
    cursor: not-allowed;
  }
`;
let TucbsGoToCoordinate = class extends i$3 {
  constructor() {
    super(...arguments);
    this.mapElementId = "";
    this.panelWidth = "360px";
    this.customCss = "";
    this._open = false;
    this._lat = "";
    this._lon = "";
    this._layoutController = new PanelLayoutController(this);
    this._panelEl = null;
    this._customCssState = { sheet: null };
    this._onDrawStart = () => {
      if (this._open) this._close();
    };
  }
  // === Yasam Dongusu ===
  /** Paylasilan slide-over paneli olusturup `document.body`'ye portal eder (bkz. SlideOverPanel.ts WHY yorumu). */
  connectedCallback() {
    super.connectedCallback();
    this._layoutController.onExclusiveClose = () => {
      if (this._open) this._close();
    };
    const panel = document.createElement("tucbs-slide-over-panel");
    panel.panelTitle = "Koordinata Git";
    panel.panelWidth = this.panelWidth;
    panel.onCloseRequest = () => this._close();
    document.body.appendChild(panel);
    this._panelEl = panel;
    this._renderIntoPanel();
  }
  /** Haritadan/layout controller'dan ayrilir, pin'i temizler ve portal edilmis paneli kaldirir. */
  disconnectedCallback() {
    var _a2, _b;
    if (this.map) {
      this._layoutController.unbindMap(this.map);
      this._unbindDrawingManager(this.map.drawingManager);
    }
    (_a2 = this.map) == null ? void 0 : _a2.clearMarker();
    (_b = this._panelEl) == null ? void 0 : _b.remove();
    this._panelEl = null;
    super.disconnectedCallback();
  }
  /** Ilk render sonrasi `map`i (programatik atanmadiysa) `mapElementId` uzerinden haritaya baglar. */
  firstUpdated() {
    bindMapByElementId(this, {
      noIdTiming: "raf",
      ...standardMapBindingMessages("tucbs-goto-coordinate", "islevsiz")
    });
  }
  /** `customCss`/`map`/`panelWidth` degisimlerini isler ve panel icerigini yeniden render eder. */
  updated(changed) {
    if (changed.has("customCss")) {
      applyCustomCss(this.shadowRoot, this.customCss, this._customCssState, "tucbs-goto-coordinate");
    }
    if (changed.has("map")) {
      const previous = changed.get("map");
      if (previous) {
        this._layoutController.unbindMap(previous);
        this._unbindDrawingManager(previous.drawingManager);
      }
      if (this.map) {
        this._layoutController.bindMap(this.map);
        this._bindDrawingManager(this.map.drawingManager);
      }
    }
    if (changed.has("panelWidth") && this._open) {
      this._layoutController.setOpen(true, this.panelWidth);
    }
    if (this._panelEl) this._panelEl.panelWidth = this.panelWidth;
    this._renderIntoPanel();
  }
  _bindDrawingManager(drawingManager) {
    drawingManager.on("draw:start", this._onDrawStart);
  }
  _unbindDrawingManager(drawingManager) {
    drawingManager.off("draw:start", this._onDrawStart);
  }
  _toggle() {
    if (!this.map) return;
    if (this._open) this._close();
    else this._openPanel();
  }
  _openPanel() {
    var _a2;
    (_a2 = this.map) == null ? void 0 : _a2.drawingManager.deactivate();
    this._open = true;
    this._layoutController.setOpen(true, this.panelWidth);
    this._renderIntoPanel();
  }
  _close() {
    var _a2;
    this._open = false;
    this._layoutController.setOpen(false, this.panelWidth);
    (_a2 = this.map) == null ? void 0 : _a2.clearMarker();
    this._lat = "";
    this._lon = "";
    this._renderIntoPanel();
    this.dispatchEvent(new CustomEvent("tucbs-goto-coordinate-closed", { bubbles: true, composed: true }));
  }
  _isValid(lat, lon) {
    return Number.isFinite(lat) && lat >= -90 && lat <= 90 && Number.isFinite(lon) && lon >= -180 && lon <= 180;
  }
  // StyleEditor'daki Min/Max alanlarinin ayni sanitizasyon deseni (bkz
  // TucbsStyleEditor._sanitizeNumericInput yorumu): rakam disi HERHANGI bir
  // karakter aninda temizlenir, en fazla tek "-" (basta) ve tek ondalik
  // ayirici kabul edilir. Ondalik ayirici nokta VEYA virgul olabilir
  // ("39.925" ve "39,925" -- Turkce klavye/yerel); ilk yazilan korunur,
  // sonrakiler atilir. cds-text-input duz bir metin kutusu oldugundan
  // (cds-number-input'un aksine) `.value` her tus vurusunda guncellenebilir --
  // Carbon'un deger'i yeniden yazip kullanicinin yazdigini bozma riski YOK.
  static _sanitizeCoordinateInput(raw) {
    const negative = raw.trimStart().startsWith("-");
    const digits = raw.replace(/[^0-9.,]/g, "");
    const sepIndex = digits.search(/[.,]/);
    const cleaned = sepIndex === -1 ? digits : digits.slice(0, sepIndex + 1) + digits.slice(sepIndex + 1).replaceAll(/[.,]/g, "");
    return (negative ? "-" : "") + cleaned;
  }
  // Tek alana yapistirilan "enlem, boylam" ciftini (Google Haritalar'dan
  // kopyalanan bicim) iki parcaya ayirir; cift degilse null. Eskiden cift
  // _sanitizeCoordinateInput'tan gecip tek sayiya birlesiyordu ("39.925,
  // 32.854" -> 39.92532854) ve gecerli bir enlem oldugu icin UYARISIZ yanlis
  // konuma gidiliyordu. Ayirici: ";", virgul+bosluk ya da yalnizca bosluk;
  // bosluksuz virgul YALNIZCA ilk sayi noktali ondalikliysa ("39.925,32.854")
  // ayirici sayilir -- "39,925" Turkce ondalik olarak tek sayi kalir.
  // Bosluksuz DORT rakam grubu ("39,925,32,854") de ciftir: bir koordinatta
  // en fazla bir ondalik ayirici olabildiginden tek okunusu 39,925 + 32,854.
  static _splitCoordinatePair(raw) {
    const text = raw.trim();
    const num = String.raw`[-+]?\d+(?:[.,]\d+)?`;
    const pair = new RegExp(String.raw`^(${num})(?:\s*;\s*|\s*,\s+|\s+)(${num})$`).exec(text) ?? new RegExp(String.raw`^([-+]?\d+\.\d+),([-+]?\d+(?:\.\d+)?)$`).exec(text) ?? /^([-+]?\d+[.,]\d+)[.,]([-+]?\d+[.,]\d+)$/.exec(text);
    return pair ? [pair[1], pair[2]] : null;
  }
  // Virgullu girisi sayiya cevirir; bos alan NaN (eskiden Number("") === 0
  // oldugundan bos formda "Git" 0,0'a gidebiliyordu).
  static _parseCoordinate(text) {
    return text.trim() === "" ? Number.NaN : Number(text.replace(",", "."));
  }
  _handleCoordInput(event, field) {
    const target = event.target;
    const pair = TucbsGoToCoordinate._splitCoordinatePair(target.value);
    if (pair) {
      this._lat = TucbsGoToCoordinate._sanitizeCoordinateInput(pair[0]);
      this._lon = TucbsGoToCoordinate._sanitizeCoordinateInput(pair[1]);
      target.value = field === "lat" ? this._lat : this._lon;
      return;
    }
    const sanitized = TucbsGoToCoordinate._sanitizeCoordinateInput(target.value);
    if (target.value !== sanitized) target.value = sanitized;
    if (field === "lat") this._lat = sanitized;
    else this._lon = sanitized;
  }
  _handleKeydown(event) {
    if (event.key === "Enter") this._submit();
  }
  _submit() {
    const lat = TucbsGoToCoordinate._parseCoordinate(this._lat);
    const lon = TucbsGoToCoordinate._parseCoordinate(this._lon);
    if (!this._isValid(lat, lon) || !this.map) return;
    this.map.dropMarker(lon, lat, GOTO_COORDINATE_PIN_URL, GOTO_COORDINATE_PIN_OPTIONS);
    this.map.interactionManager.flyToPosition(lon, lat, { height: 1e3, duration: 1.5 });
  }
  _renderIntoPanel() {
    if (!this._panelEl) return;
    this._panelEl.open = this._open;
    const lat = TucbsGoToCoordinate._parseCoordinate(this._lat);
    const lon = TucbsGoToCoordinate._parseCoordinate(this._lon);
    const valid = this._isValid(lat, lon);
    const showError = (this._lat !== "" || this._lon !== "") && !valid;
    D(
      b`
        <style>
          ${PANEL_CONTENT_STYLES}
        </style>
        <span slot="icon">${ICON_LOCATION$1}</span>
        <div class="tucbs-goto-card">
          <div>
            <span class="tucbs-goto-field-label">Enlem</span>
            <cds-text-input
              size="sm"
              label="Enlem"
              hide-label
              placeholder="ör. 39.925 veya 39,925"
              .value=${this._lat}
              @input=${(event) => this._handleCoordInput(event, "lat")}
              @keydown=${(event) => this._handleKeydown(event)}
            ></cds-text-input>
          </div>
          <div>
            <span class="tucbs-goto-field-label">Boylam</span>
            <cds-text-input
              size="sm"
              label="Boylam"
              hide-label
              placeholder="ör. 32.854 veya 32,854"
              .value=${this._lon}
              @input=${(event) => this._handleCoordInput(event, "lon")}
              @keydown=${(event) => this._handleKeydown(event)}
            ></cds-text-input>
          </div>
          ${showError ? b`<span class="tucbs-goto-error">Enlem -90..90, Boylam -180..180 aralığında olmalı</span>` : ""}
          <button type="button" class="tucbs-goto-submit" ?disabled=${!valid} @click=${() => this._submit()}>
            Git
          </button>
        </div>
      `,
      this._panelEl
    );
  }
  /** Toolbar'daki dairesel "Koordinata Git" butonunu render eder. */
  render() {
    return b`
      <button
        type="button"
        class="tool-button ${this._open ? "active" : ""}"
        aria-label="Koordinata Git"
        data-tooltip="Koordinata Git"
        aria-pressed=${this._open}
        @click=${this._toggle}
      >
        ${ICON_LOCATION$1}
      </button>
    `;
  }
};
TucbsGoToCoordinate.styles = [
  leftTooltipStyles,
  i$6`
    :host {
      display: inline-flex;
      font-family: "IBM Plex Sans", system-ui, sans-serif;
      font-size: 0.875rem;
      color: var(--cds-text-primary, #161616);
      --cds-focus: transparent;
    }

    .tool-button {
      width: 2.25rem;
      height: 2.25rem;
      border-radius: 50%;
      border: 1px solid var(--cds-border-subtle, #e0e0e0);
      background: var(--cds-layer-01, #ffffff);
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      cursor: pointer;
      color: var(--cds-text-primary, #161616);
    }

    .tool-button:hover {
      background: var(--cds-layer-hover-01, #e8e8e8);
    }

    .tool-button.active {
      background: var(--cds-background-selected, #e0e0e0);
      border-color: var(--cds-border-strong-01, #8d8d8d);
    }

    .tool-button svg {
      width: 1rem;
      height: 1rem;
    }
  `
];
__decorateClass$q([
  n$1()
], TucbsGoToCoordinate.prototype, "mapElementId", 2);
__decorateClass$q([
  n$1({ attribute: "panel-width" })
], TucbsGoToCoordinate.prototype, "panelWidth", 2);
__decorateClass$q([
  n$1({ attribute: "custom-css" })
], TucbsGoToCoordinate.prototype, "customCss", 2);
__decorateClass$q([
  n$1({ attribute: false })
], TucbsGoToCoordinate.prototype, "map", 2);
__decorateClass$q([
  r()
], TucbsGoToCoordinate.prototype, "_open", 2);
__decorateClass$q([
  r()
], TucbsGoToCoordinate.prototype, "_lat", 2);
__decorateClass$q([
  r()
], TucbsGoToCoordinate.prototype, "_lon", 2);
TucbsGoToCoordinate = __decorateClass$q([
  t$3("tucbs-goto-coordinate")
], TucbsGoToCoordinate);
const GUIDE_STYLES = i$6`
  :host {
    position: fixed;
    top: 16px;
    right: 4.5rem;
    z-index: 2100;
    display: block;
    font-family: "IBM Plex Sans", system-ui, sans-serif;
    font-size: 0.875rem;
    width: 380px;
    max-width: calc(100vw - 6rem);
  }

  cds-inline-notification {
    width: 100%;
    max-width: none;
  }

  /* Baslik VE liste TEK bloktadir (subtitle slot'u): Carbon'un title/subtitle
     kutulari yan yana (flex-wrap) dizildiginden, maddeler kisaldiginda baslik
     listenin soluna kayiyordu. */
  .guide-title {
    margin: 0;
    font-weight: 600;
  }

  ul {
    margin: 0.25rem 0 0;
    padding-left: 1.1rem;
  }

  li {
    margin: 0.125rem 0;
  }
`;
let activeGuideEl = null;
function showGuide(title, steps) {
  hideGuide();
  const el = document.createElement("div");
  document.body.appendChild(el);
  const shadow = el.attachShadow({ mode: "open" });
  const sheet = new CSSStyleSheet();
  sheet.replaceSync(GUIDE_STYLES.cssText);
  shadow.adoptedStyleSheets = [sheet];
  activeGuideEl = el;
  D(
    b`
      <cds-inline-notification kind="info" role="status" hide-close-button low-contrast>
        <div slot="subtitle">
          <p class="guide-title">${title}</p>
          <ul>
            ${steps.map((step) => b`<li>${step}</li>`)}
          </ul>
        </div>
      </cds-inline-notification>
    `,
    shadow
  );
}
function hideGuide() {
  activeGuideEl == null ? void 0 : activeGuideEl.remove();
  activeGuideEl = null;
}
const EXIT = "Araçtan çıkmak için sağ tıklayın.";
const ADD_POINT = "Haritaya sol tıklayarak nokta ekleyin.";
const CANCEL_DRAWING = "Çizimi Esc ile iptal edin.";
const FINISH_MULTI = "Çizimi çift tıklayarak bitirin.";
const FINISH_MEASURE = "Ölçümü çift tıklayarak bitirin.";
const CANCEL_MEASURE = "Ölçümü Esc ile iptal edin.";
const DRAW_GUIDES = {
  point: { title: "Nokta Çiz", steps: ["Nokta eklemek için haritaya sol tıklayın.", EXIT] },
  polyline: {
    title: "Çizgi Çiz",
    steps: [ADD_POINT, FINISH_MULTI, CANCEL_DRAWING, EXIT]
  },
  polygon: {
    title: "Alan Çiz",
    steps: [ADD_POINT, FINISH_MULTI, CANCEL_DRAWING, EXIT]
  },
  rectangle: {
    title: "Dikdörtgen Çiz",
    steps: ["Bir köşeye sol tıklayın.", "Karşı köşeye sol tıklayarak bitirin.", CANCEL_DRAWING, EXIT]
  },
  circle: {
    title: "Daire Çiz",
    steps: ["Merkeze sol tıklayın.", "Yarıçap noktasına sol tıklayarak bitirin.", CANCEL_DRAWING, EXIT]
  },
  freehand: {
    title: "Serbest Çizim",
    steps: ["Sol tuşa basılı tutarak çizin, bırakınca bitirin.", CANCEL_DRAWING, EXIT]
  }
};
const MEASURE_GUIDES = {
  polyline: {
    title: "Mesafe Ölç",
    steps: [ADD_POINT, FINISH_MEASURE, CANCEL_MEASURE, EXIT]
  },
  polygon: {
    title: "Alan Ölç",
    steps: [ADD_POINT, FINISH_MEASURE, CANCEL_MEASURE, EXIT]
  }
};
function drawGuide(tool, source) {
  if (source === "measure") return MEASURE_GUIDES[tool] ?? DRAW_GUIDES[tool];
  return DRAW_GUIDES[tool];
}
function initialDrawLayerDialogState(request) {
  const first = request.layers[0];
  return {
    mode: first !== void 0 ? "existing" : "new",
    layerId: (first == null ? void 0 : first.id) ?? "",
    title: request.suggestedTitle
  };
}
function drawLayerTitleError(state, request) {
  return state.mode === "new" ? validateDrawLayerTitle(state.title, request.existingTitles) : null;
}
function canConfirmDrawLayerDialog(state, request) {
  if (state.mode === "existing") return state.layerId !== "";
  return drawLayerTitleError(state, request) === null;
}
function drawLayerDialogChoice(state, request) {
  if (!canConfirmDrawLayerDialog(state, request)) return null;
  return state.mode === "existing" ? { type: "existing", layerId: state.layerId } : { type: "new", title: state.title.trim() };
}
var __defProp$o = Object.defineProperty;
var __getOwnPropDesc$p = Object.getOwnPropertyDescriptor;
var __decorateClass$p = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$p(target, key) : target;
  for (var i4 = decorators.length - 1, decorator; i4 >= 0; i4--)
    if (decorator = decorators[i4])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$o(target, key, result);
  return result;
};
const ICON_CLOSE$4 = o$1(iconNodeToString(_16_default$v));
const RESULT_EVENT = "tucbs-draw-layer-result";
let TucbsDrawLayerDialog = class extends i$3 {
  constructor() {
    super(...arguments);
    this._drag = new DraggablePanelController(this, {
      getPanel: (header) => header.closest(".panel"),
      ignoreSelector: ".close-btn"
    });
    this._form = { mode: "new", layerId: "", title: "" };
    this._onKeyDown = (event) => {
      if (this._fromOpenDropdown(event)) return;
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        this._finish(null);
      } else if (event.key === "Enter" && !this._fromButton(event) && this.request && canConfirmDrawLayerDialog(this._form, this.request)) {
        event.preventDefault();
        event.stopPropagation();
        this._confirm();
      }
    };
  }
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("keydown", this._onKeyDown, true);
  }
  disconnectedCallback() {
    window.removeEventListener("keydown", this._onKeyDown, true);
    super.disconnectedCallback();
  }
  willUpdate(changed) {
    if (changed.has("request") && this.request) {
      this._form = initialDrawLayerDialogState(this.request);
    }
  }
  updated(changed) {
    var _a2;
    if (changed.has("request") && this.request) {
      const selector = this._form.mode === "new" ? "cds-text-input" : "cds-dropdown";
      (_a2 = this.renderRoot.querySelector(selector)) == null ? void 0 : _a2.focus();
    }
  }
  // Acik bir cds-dropdown'in kendi Esc/Enter'i (menuyu kapat/ogeyi sec) diyalogu
  // kapatmasin/onaylamasin diye, olay dropdown'dan geliyorsa diyalog karar vermez.
  _fromOpenDropdown(event) {
    const dropdown = event.composedPath().find((el) => el instanceof HTMLElement && el.localName === "cds-dropdown");
    return dropdown instanceof HTMLElement && dropdown.hasAttribute("open");
  }
  // Odak bir dugmedeyken (Iptal, X, Tamam) Enter'in yerel etkinlestirmesi o dugmeye
  // birakilir; yoksa Iptal'de Enter diyalogu onaylar.
  _fromButton(event) {
    return event.composedPath().some((el) => el instanceof HTMLButtonElement);
  }
  _finish(choice) {
    this.dispatchEvent(new CustomEvent(RESULT_EVENT, { detail: choice }));
  }
  _confirm() {
    if (!this.request) return;
    const choice = drawLayerDialogChoice(this._form, this.request);
    if (choice !== null) this._finish(choice);
  }
  render() {
    const request = this.request;
    if (!request) return null;
    const hasLayers = request.layers.length > 0;
    const titleError = drawLayerTitleError(this._form, request);
    const showDuplicate = titleError === "duplicate";
    return b`
      <div class="panel" role="dialog" aria-modal="true" aria-label="Çizim Katmanı Seç/Oluştur">
        <div class="header" @pointerdown=${(event) => this._drag.start(event)}>
          <span>Çizim Katmanı Seç/Oluştur</span>
          <button class="close-btn" type="button" aria-label="Kapat" @click=${() => this._finish(null)}>
            ${ICON_CLOSE$4}
          </button>
        </div>
        <div class="body">
          <p class="kind">Çizim tipi: <strong>${DRAW_LAYER_KIND_LABELS[request.kind]}</strong></p>

          <div class="row">
            <cds-radio-button
              label-text="Kayıtlı Katman"
              value="existing"
              name="mode"
              ?disabled=${!hasLayers}
              ?checked=${this._form.mode === "existing"}
              @cds-radio-button-changed=${() => this._form = { ...this._form, mode: "existing" }}
            ></cds-radio-button>
            <cds-dropdown
              label=${hasLayers ? "Seçiniz" : "—"}
              aria-label="Kayıtlı Katman"
              ?disabled=${!hasLayers}
              .value=${this._form.layerId}
              @cds-dropdown-selected=${(event) => this._form = { ...this._form, mode: "existing", layerId: event.detail.item.value }}
            >
              ${request.layers.map(
      (layer) => b`<cds-dropdown-item value=${layer.id}>${layer.title}</cds-dropdown-item>`
    )}
            </cds-dropdown>
          </div>

          <div class="row">
            <cds-radio-button
              label-text="Yeni Katman"
              value="new"
              name="mode"
              ?checked=${this._form.mode === "new"}
              @cds-radio-button-changed=${() => this._form = { ...this._form, mode: "new" }}
            ></cds-radio-button>
            <cds-text-input
              label="Yeni Katman adı"
              hide-label
              ?invalid=${showDuplicate}
              invalid-text="Bu adla bir çizim katmanı zaten var."
              .value=${this._form.title}
              @focusin=${() => this._form.mode !== "new" && (this._form = { ...this._form, mode: "new" })}
              @input=${(event) => this._form = { ...this._form, mode: "new", title: event.target.value }}
            ></cds-text-input>
          </div>
        </div>
        <div class="footer">
          <button
            class="btn btn-primary"
            type="button"
            ?disabled=${!canConfirmDrawLayerDialog(this._form, request)}
            @click=${() => this._confirm()}
          >
            Tamam
          </button>
          <button class="btn btn-secondary" type="button" @click=${() => this._finish(null)}>İptal</button>
        </div>
      </div>
    `;
  }
};
TucbsDrawLayerDialog.styles = i$6`
    :host {
      position: fixed;
      inset: 0;
      z-index: 2200;
      background: rgba(22, 22, 22, 0.35);
      font-family: "IBM Plex Sans", system-ui, sans-serif;
      font-size: 0.875rem;
      color: var(--cds-text-primary, #161616);
      --cds-focus: #0f62fe;
      /* cds-dropdown/cds-text-input global tema CSS'i olmadan bu token'lari
         fallback'siz kullaniyor; "white" tema degerleriyle sabitlenir
         (bkz layer-sources/serviceUploadStyles.ts). */
      --cds-field: #f4f4f4;
      --cds-field-hover: #e8e8e8;
      --cds-layer: #ffffff;
      --cds-layer-hover: #e8e8e8;
      --cds-layer-background: #ffffff;
      --cds-layer-selected: #e0e0e0;
      --cds-layer-selected-hover: #d1d1d1;
      --cds-border-subtle: #e0e0e0;
      --cds-border-strong: #8d8d8d;
      --cds-layout-density-padding-inline-local: 1rem;
      --cds-layout-size-height-local: 2.5rem;
    }

    /* Fixed + ortalama transform'u: DraggablePanelController surukleme
       basinda left/top'u piksel olarak sabitleyip transform'u sifirlar. */
    .panel {
      position: fixed;
      top: 12vh;
      left: 50%;
      transform: translateX(-50%);
      width: min(460px, calc(100vw - 2rem));
      background: #ffffff;
      border: 1px solid var(--cds-border-subtle, #e0e0e0);
      border-radius: 4px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.75rem 1rem;
      border-radius: 4px 4px 0 0;
      background: var(--cds-layer-accent-01, #f2f4f8);
      border-bottom: 1px solid var(--cds-border-subtle, #e0e0e0);
      font-weight: 600;
      cursor: move;
      user-select: none;
      touch-action: none;
    }

    .close-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border: none;
      border-radius: 4px;
      background: transparent;
      color: var(--cds-icon-secondary, #6f6f6f);
      cursor: pointer;
    }

    .close-btn:hover {
      background: var(--cds-layer-hover-01, #e8e8e8);
    }

    .body {
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .kind {
      margin: 0;
      color: var(--cds-text-secondary, #525252);
    }

    .row {
      display: grid;
      grid-template-columns: 9.5rem 1fr;
      align-items: center;
      gap: 0.75rem;
    }

    cds-dropdown,
    cds-text-input {
      width: 100%;
    }

    .btn {
      height: 2.5rem;
      padding: 0 1.25rem;
      border: 1px solid transparent;
      border-radius: 4px;
      font: inherit;
      font-weight: 600;
      cursor: pointer;
    }

    .btn-primary {
      background: #2563eb;
      color: #ffffff;
    }

    .btn-primary:disabled {
      background: var(--cds-layer-accent-01, #e0e0e0);
      color: var(--cds-text-disabled, #a8a8a8);
      cursor: not-allowed;
    }

    .btn-secondary {
      background: #ffffff;
      border-color: var(--cds-border-strong-01, #8d8d8d);
      color: var(--cds-text-primary, #161616);
    }

    .footer {
      display: flex;
      justify-content: flex-end;
      gap: 0.5rem;
      padding: 0.75rem 1rem;
      border-top: 1px solid var(--cds-border-subtle, #e0e0e0);
    }
  `;
__decorateClass$p([
  n$1({ attribute: false })
], TucbsDrawLayerDialog.prototype, "request", 2);
__decorateClass$p([
  r()
], TucbsDrawLayerDialog.prototype, "_form", 2);
TucbsDrawLayerDialog = __decorateClass$p([
  t$3("tucbs-draw-layer-dialog")
], TucbsDrawLayerDialog);
function pickDrawingLayer(request) {
  return new Promise((resolve) => {
    const el = document.createElement("tucbs-draw-layer-dialog");
    el.setAttribute("data-tucbs-portal", "");
    el.request = request;
    el.addEventListener(
      RESULT_EVENT,
      (event) => {
        el.remove();
        resolve(event.detail);
      },
      { once: true }
    );
    document.body.appendChild(el);
  });
}
var __defProp$n = Object.defineProperty;
var __getOwnPropDesc$o = Object.getOwnPropertyDescriptor;
var __decorateClass$o = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$o(target, key) : target;
  for (var i4 = decorators.length - 1, decorator; i4 >= 0; i4--)
    if (decorator = decorators[i4])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$n(target, key, result);
  return result;
};
const TOOL_ICON_NODES = {
  point: _16_default$q,
  polyline: _16_default$z,
  polygon: _16_default$m,
  rectangle: _16_default$7,
  circle: _16_default$w,
  freehand: _16_default$e
};
const MAIN_ICON$1 = o$1(iconNodeToString(_16_default$8));
const iconCache$1 = /* @__PURE__ */ new Map();
function iconFor$1(tool) {
  const cached = iconCache$1.get(tool);
  if (cached) return cached;
  const node = TOOL_ICON_NODES[tool];
  const icon = node ? o$1(iconNodeToString(node)) : o$1("");
  iconCache$1.set(tool, icon);
  return icon;
}
let TucbsDrawTool = class extends i$3 {
  constructor() {
    super(...arguments);
    this.mapElementId = "";
    this.tools = "point,polyline,polygon";
    this.customCss = "";
    this._activeTool = null;
    this._flyoutOpen = false;
    this._customCssState = { sheet: null };
    this._onDrawStart = ({
      tool,
      source
    }) => {
      this._activeTool = source === "draw" && this._toolIds().includes(tool) ? tool : null;
      if (source === "draw") {
        const { title, steps } = drawGuide(tool, "draw");
        showGuide(title, steps);
      }
      this._flyoutOpen = false;
    };
    this._onDrawCancel = () => {
      this._activeTool = null;
      hideGuide();
    };
  }
  _toolIds() {
    return this.tools.split(",").map((id) => id.trim()).filter(Boolean);
  }
  /** Bilesen DOM'dan kaldirilirken DrawingManager event aboneliklerini iptal eder. */
  disconnectedCallback() {
    if (this.map) this._unbindDrawingManager(this.map.drawingManager);
    if (this._activeTool !== null) hideGuide();
    super.disconnectedCallback();
  }
  /**
   * `customCss` degistiginde ozel CSS'i yeniden uygular; `map` degistiginde
   * onceki DrawingManager'dan cikip yenisine baglanir.
   */
  updated(changed) {
    if (changed.has("customCss")) {
      applyCustomCss(this.shadowRoot, this.customCss, this._customCssState, "tucbs-draw-tool");
    }
    if (changed.has("map")) {
      const previous = changed.get("map");
      if (previous) this._unbindDrawingManager(previous.drawingManager);
      if (this.map) {
        this._bindDrawingManager(this.map.drawingManager);
        this.map.setDrawingLayerPicker(pickDrawingLayer);
      }
    }
  }
  _bindDrawingManager(drawingManager) {
    drawingManager.on("draw:start", this._onDrawStart);
    drawingManager.on("draw:cancel", this._onDrawCancel);
  }
  _unbindDrawingManager(drawingManager) {
    drawingManager.off("draw:start", this._onDrawStart);
    drawingManager.off("draw:cancel", this._onDrawCancel);
  }
  // === Yasam Dongusu: Map baglama ===
  /**
   * Ilk render sonrasi haritaya baglanmayi dener: `map` zaten atanmissa (Senaryo 1)
   * hicbir sey yapmaz; aksi halde `mapElementId` ile eslesen elementi bulup
   * haritasina baglanir (Senaryo 2), gerekirse elementin `ready` olayini bekler.
   */
  firstUpdated() {
    bindMapByElementId(this, {
      noIdTiming: "raf",
      ...standardMapBindingMessages("tucbs-draw-tool", "islevsiz")
    });
  }
  // Ana buton her zaman sadece flyout'u acar/kapatir; arac secimi flyout'tan yapilir.
  _onMainButtonClick() {
    this._flyoutOpen = !this._flyoutOpen;
  }
  _selectTool(tool) {
    var _a2;
    const drawingManager = (_a2 = this.map) == null ? void 0 : _a2.drawingManager;
    if (!drawingManager) return;
    if (this._activeTool === tool) {
      drawingManager.deactivate();
    } else {
      drawingManager.activate(tool, "draw");
    }
    this._flyoutOpen = false;
  }
  /** Ana butonu ve (aciksa) arac secim flyout'unu render eder. */
  render() {
    const mainIcon = this._activeTool !== null ? iconFor$1(this._activeTool) : MAIN_ICON$1;
    const mainLabel = this._activeTool !== null ? drawGuide(this._activeTool, "draw").title : "Çizim";
    return b`
      <div class="draw-tool">
        ${this._flyoutOpen ? b`
              <div class="flyout">
                ${this._toolIds().map(
      (tool) => b`
                    <button
                      class="tool-button ${tool === this._activeTool ? "active" : ""}"
                      type="button"
                      aria-label=${drawGuide(tool, "draw").title}
                      data-tooltip=${drawGuide(tool, "draw").title}
                      @click=${() => this._selectTool(tool)}
                    >
                      ${iconFor$1(tool)}
                    </button>
                  `
    )}
              </div>
            ` : null}
        <button
          class="tool-button main-button ${this._activeTool !== null ? "active" : ""}"
          type="button"
          aria-label=${mainLabel}
          data-tooltip=${mainLabel}
          @click=${this._onMainButtonClick}
        >
          ${mainIcon}
        </button>
      </div>
    `;
  }
};
TucbsDrawTool.styles = [
  leftTooltipStyles,
  i$6`
    :host {
      display: inline-flex;
      font-family: "IBM Plex Sans", system-ui, sans-serif;
    }

    .draw-tool {
      position: relative;
      display: inline-flex;
    }

    .flyout {
      position: absolute;
      right: 100%;
      top: 50%;
      transform: translateY(-50%);
      margin-right: 0.5rem;
      display: flex;
      flex-direction: row;
      gap: 0.5rem;
    }

    .tool-button {
      width: 2.25rem;
      height: 2.25rem;
      border-radius: 50%;
      border: 1px solid var(--cds-border-subtle, #e0e0e0);
      background: var(--cds-layer-01, #ffffff);
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      cursor: pointer;
      color: var(--cds-text-primary, #161616);
    }

    .tool-button:hover {
      background: var(--cds-layer-hover-01, #e8e8e8);
    }

    .tool-button.active {
      background: var(--cds-background-selected, #e0e0e0);
      border-color: var(--cds-border-strong-01, #8d8d8d);
    }

    .tool-button svg {
      width: 1rem;
      height: 1rem;
    }

    /* Ana buton toolbar'da SABIT durdugu icin (aktif/pasif fark etmeksizin,
       sadece ikonu degisir) tooltip'i DAIMA leftTooltipStyles'in varsayilan
       SOL konumunda kalir -- aktiflik durumuna gore konum degistirmek
       (once altta, tiklayinca solda) kullanici tarafindan tutarsiz/yanlis
       bulundu (bkz. feedback). SADECE flyout'taki alt secenekler altta acilir. */

    /* Flyout'taki alt secenek butonlari (Nokta/Cizgi/Alan) DAIMA butonun
       ALTINDA tooltip gosterir -- ana butonun aksine flyout'un actigi
       yonden bagimsiz. */
    .tool-button:not(.main-button)[data-tooltip]::after {
      top: calc(100% + 0.5rem);
      right: auto;
      left: 50%;
      transform: translateX(-50%);
    }
  `
];
__decorateClass$o([
  n$1()
], TucbsDrawTool.prototype, "mapElementId", 2);
__decorateClass$o([
  n$1()
], TucbsDrawTool.prototype, "tools", 2);
__decorateClass$o([
  n$1({ attribute: "custom-css" })
], TucbsDrawTool.prototype, "customCss", 2);
__decorateClass$o([
  n$1({ attribute: false })
], TucbsDrawTool.prototype, "map", 2);
__decorateClass$o([
  r()
], TucbsDrawTool.prototype, "_activeTool", 2);
__decorateClass$o([
  r()
], TucbsDrawTool.prototype, "_flyoutOpen", 2);
TucbsDrawTool = __decorateClass$o([
  t$3("tucbs-draw-tool")
], TucbsDrawTool);
var __defProp$m = Object.defineProperty;
var __getOwnPropDesc$n = Object.getOwnPropertyDescriptor;
var __decorateClass$n = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$n(target, key) : target;
  for (var i4 = decorators.length - 1, decorator; i4 >= 0; i4--)
    if (decorator = decorators[i4])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$m(target, key, result);
  return result;
};
const ICON_TRASH_CAN = o$1(iconNodeToString(_16_default$6));
let TucbsDeleteTool = class extends i$3 {
  constructor() {
    super(...arguments);
    this.mapElementId = "";
    this.customCss = "";
    this._confirming = false;
    this._customCssState = { sheet: null };
  }
  /** `customCss` degistiginde shadow DOM'a yeniden uygular. */
  updated(changed) {
    if (changed.has("customCss")) {
      applyCustomCss(this.shadowRoot, this.customCss, this._customCssState, "tucbs-delete-tool");
    }
  }
  // === Yasam Dongusu: Map baglama ===
  /** `mapElementId` ile eslesen elementten `map` referansini alir (henuz `map` atanmamissa). */
  firstUpdated() {
    bindMapByElementId(this, {
      noIdTiming: "raf",
      ...standardMapBindingMessages("tucbs-delete-tool", "islevsiz")
    });
  }
  _openConfirm() {
    var _a2;
    if ((((_a2 = this.map) == null ? void 0 : _a2.drawingManager.getShapes().length) ?? 0) === 0) return;
    this._confirming = true;
  }
  _cancel() {
    this._confirming = false;
  }
  _confirmDelete() {
    var _a2;
    const drawingManager = (_a2 = this.map) == null ? void 0 : _a2.drawingManager;
    this._confirming = false;
    if (!drawingManager) return;
    if (drawingManager.isActive()) drawingManager.deactivate();
    drawingManager.clearAll();
  }
  /** Sil butonunu ve (`_confirming` true iken) onay bildirimini render eder. */
  render() {
    return b`
      <div class="delete-tool">
        ${this._confirming ? b`
              <cds-actionable-notification
                class="confirm"
                kind="warning"
                title="Tüm çizimler kalıcı olarak silinecektir. Emin misiniz?"
                action-button-label="Sil"
                @cds-notification-closed=${this._cancel}
              >
                <cds-actionable-notification-button slot="action" @click=${this._confirmDelete}>
                  Sil
                </cds-actionable-notification-button>
              </cds-actionable-notification>
            ` : null}
        <button
          class="tool-button"
          type="button"
          data-tooltip="Tümünü Sil"
          aria-label="Tümünü Sil"
          @click=${this._openConfirm}
        >
          ${ICON_TRASH_CAN}
        </button>
      </div>
    `;
  }
};
TucbsDeleteTool.styles = [
  leftTooltipStyles,
  i$6`
    :host {
      display: inline-flex;
      font-family: "IBM Plex Sans", system-ui, sans-serif;
    }

    .delete-tool {
      position: relative;
      display: inline-flex;
    }

    .tool-button {
      width: 2.25rem;
      height: 2.25rem;
      border-radius: 50%;
      border: 1px solid var(--cds-border-subtle, #e0e0e0);
      background: var(--cds-layer-01, #ffffff);
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      cursor: pointer;
      color: var(--cds-text-primary, #161616);
    }

    .tool-button:hover {
      background: var(--cds-layer-hover-01, #e8e8e8);
    }

    .tool-button svg {
      width: 1rem;
      height: 1rem;
    }

    .confirm {
      position: absolute;
      right: 100%;
      top: 50%;
      transform: translateY(-50%);
      margin-right: 0.5rem;
      width: 18rem;
    }

    /* cds-actionable-notification-button kendi boyutunu daima size="sm" olarak
       zorluyor (bkz. Carbon kaynak kodu); daha kucuk gorunmesi icin kendi
       ::part(button)'ini burada override ediyoruz. */
    cds-actionable-notification-button::part(button) {
      font-size: 0.75rem;
      padding-block: 0.25rem;
      padding-inline: 0.75rem;
      min-block-size: auto;
    }
  `
];
__decorateClass$n([
  n$1()
], TucbsDeleteTool.prototype, "mapElementId", 2);
__decorateClass$n([
  n$1({ attribute: "custom-css" })
], TucbsDeleteTool.prototype, "customCss", 2);
__decorateClass$n([
  n$1({ attribute: false })
], TucbsDeleteTool.prototype, "map", 2);
__decorateClass$n([
  r()
], TucbsDeleteTool.prototype, "_confirming", 2);
TucbsDeleteTool = __decorateClass$n([
  t$3("tucbs-delete-tool")
], TucbsDeleteTool);
function metersToReadable(m2) {
  if (!isFinite(m2)) return "-";
  return m2 < 1e3 ? `${m2.toFixed(2)} m` : `${(m2 / 1e3).toFixed(2)} km`;
}
function sqmToReadable(a2) {
  if (!isFinite(a2)) return "-";
  return a2 < 1e6 ? `${a2.toFixed(2)} m²` : `${(a2 / 1e6).toFixed(2)} km²`;
}
const EARTH_RADIUS_METERS = 6378137;
function projectEqualAreaMeters(coordinate) {
  const x2 = Math$1.toRadians(coordinate[0]) * EARTH_RADIUS_METERS;
  const y3 = Math.sin(Math$1.toRadians(coordinate[1])) * EARTH_RADIUS_METERS;
  return [x2, y3];
}
function polygonAreaMeters(coordinates) {
  if (coordinates.length < 3) return 0;
  const projected = coordinates.map(projectEqualAreaMeters);
  let sum = 0;
  for (let i4 = 0; i4 < projected.length; i4++) {
    const p1 = projected[i4];
    const p2 = projected[(i4 + 1) % projected.length];
    if (p1 === void 0 || p2 === void 0) continue;
    sum += p1[0] * p2[1] - p2[0] * p1[1];
  }
  return Math.abs(sum) / 2;
}
function toCartesian(coordinate) {
  return Cartesian3.fromDegrees(coordinate[0], coordinate[1]);
}
function centroidOf(coordinates) {
  let cx = 0;
  let cy = 0;
  let cz = 0;
  for (const c2 of coordinates) {
    const p2 = toCartesian(c2);
    cx += p2.x;
    cy += p2.y;
    cz += p2.z;
  }
  const n3 = coordinates.length || 1;
  return new Cartesian3(cx / n3, cy / n3, cz / n3);
}
function perimeterMeters(coordinates) {
  if (coordinates.length < 2) return 0;
  const cartesians = coordinates.map(toCartesian);
  let total = 0;
  for (let i4 = 0; i4 < cartesians.length - 1; i4++) {
    total += Cartesian3.distance(
      cartesians[i4],
      cartesians[i4 + 1]
    );
  }
  if (cartesians.length >= 3) {
    total += Cartesian3.distance(
      cartesians[cartesians.length - 1],
      cartesians[0]
    );
  }
  return total;
}
var __defProp$l = Object.defineProperty;
var __getOwnPropDesc$m = Object.getOwnPropertyDescriptor;
var __decorateClass$m = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$m(target, key) : target;
  for (var i4 = decorators.length - 1, decorator; i4 >= 0; i4--)
    if (decorator = decorators[i4])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$l(target, key, result);
  return result;
};
const MODE_TOOL = {
  distance: "polyline",
  area: "polygon"
};
const MODE_ICON_NODES = {
  distance: _16_default$b,
  area: _16_default$A
};
function modeLabel(mode) {
  return drawGuide(MODE_TOOL[mode], "measure").title;
}
const MAIN_ICON = o$1(iconNodeToString(_16_default$a));
const iconCache = /* @__PURE__ */ new Map();
function iconFor(mode) {
  const cached = iconCache.get(mode);
  if (cached) return cached;
  const icon = o$1(iconNodeToString(MODE_ICON_NODES[mode]));
  iconCache.set(mode, icon);
  return icon;
}
const LABEL_FONT = "13px sans-serif";
const SEGMENT_LABEL_BG = Color.BLACK.withAlpha(0.5);
const AREA_LABEL_BG = Color.BLACK.withAlpha(0.45);
const TOTAL_LABEL_BG = Color.fromCssColorString("#1d4ed8").withAlpha(0.8);
const HIDDEN_POS = Cartesian3.fromDegrees(0, 0, -1);
let TucbsMeasureTool = class extends i$3 {
  constructor() {
    super(...arguments);
    this.mapElementId = "";
    this.customCss = "";
    this._activeMode = null;
    this._flyoutOpen = false;
    this._customCssState = { sheet: null };
    this._committedCoords = [];
    this._pendingLabels = [];
    this._shapeLabels = /* @__PURE__ */ new Map();
    this._claimingActivation = false;
    this._isSessionOwner = false;
    this._onDrawStart = ({
      tool,
      source
    }) => {
      if (source !== "measure") {
        this._activeMode = null;
        this._isSessionOwner = false;
        return;
      }
      this._activeMode = tool === "polyline" ? "distance" : "area";
      this._flyoutOpen = false;
      const { title, steps } = drawGuide(tool, "measure");
      showGuide(title, steps);
      this._isSessionOwner = this._claimingActivation;
      this._claimingActivation = false;
      if (this._isSessionOwner) {
        this._committedCoords = [];
        this._livePreviewCoord = void 0;
        this._pendingLabels = [];
        this._ensureLiveLabels();
      }
    };
    this._onDrawCancel = () => {
      if (this._isSessionOwner) {
        this._removeLiveLabels();
        this._removePendingLabels();
      }
      this._activeMode = null;
      this._isSessionOwner = false;
      hideGuide();
    };
    this._onAbort = () => {
      if (!this._isSessionOwner) return;
      this._removePendingLabels();
    };
    this._onVertex = ({
      coordinates
    }) => {
      if (!this._isSessionOwner) return;
      const previous = this._committedCoords[this._committedCoords.length - 1];
      this._committedCoords.push(coordinates);
      if (previous !== void 0) {
        this._pendingLabels.push(this._addStaticSegmentLabel(previous, coordinates));
      }
    };
    this._onMove = ({
      coordinates
    }) => {
      if (!this._isSessionOwner) return;
      this._livePreviewCoord = coordinates;
    };
    this._onComplete = ({ shape }) => {
      if (!this._isSessionOwner) return;
      while (this._committedCoords.length > shape.coordinates.length) {
        this._committedCoords.pop();
        const ghost = this._pendingLabels.pop();
        if (ghost) this._removeEntity(ghost);
      }
      if (this._activeMode === "distance" && shape.length !== void 0) {
        this._pendingLabels.push(this._addTotalDistanceLabel(shape));
      } else if (this._activeMode === "area" && shape.area !== void 0 && shape.perimeter !== void 0) {
        this._pendingLabels.push(this._addAreaSummaryLabel(shape));
      }
      this._shapeLabels.set(shape.id, this._pendingLabels);
      this._pendingLabels = [];
      this._committedCoords = [];
      this._livePreviewCoord = void 0;
    };
    this._onRemove = ({ id }) => {
      const labels = this._shapeLabels.get(id);
      if (!labels) return;
      for (const label of labels) this._removeEntity(label);
      this._shapeLabels.delete(id);
    };
    this._onMeasureLayerVisibility = ({
      id,
      visible
    }) => {
      if (id !== MEASURE_LAYER_ID) return;
      for (const entity of this._allLabelEntities()) entity.show = visible;
    };
    this._onMeasureLayerRemove = ({
      layer
    }) => {
      if (layer.id !== MEASURE_LAYER_ID) return;
      for (const entity of this._allLabelEntities()) this._removeEntity(entity);
      this._shapeLabels.clear();
      this._pendingLabels = [];
      this._liveSegmentLabel = void 0;
      this._liveAreaLabel = void 0;
    };
  }
  // Su an ekranda takip edilen TUM etiket entity'leri -- devam eden oturumun
  // henuz sekle baglanmamis etiketleri (_pendingLabels), tamamlanmis her
  // seklin etiketleri (_shapeLabels), ve kalici canli onizleme etiketleri
  // (_liveSegmentLabel/_liveAreaLabel, bkz _ensureLiveLabels).
  _allLabelEntities() {
    const all = [...this._pendingLabels];
    for (const labels of this._shapeLabels.values()) all.push(...labels);
    if (this._liveSegmentLabel) all.push(this._liveSegmentLabel);
    if (this._liveAreaLabel) all.push(this._liveAreaLabel);
    return all;
  }
  _bindLayerManager(layerManager) {
    layerManager.on("layer:visibility", this._onMeasureLayerVisibility);
    layerManager.on("layer:remove", this._onMeasureLayerRemove);
  }
  _unbindLayerManager(layerManager) {
    layerManager.off("layer:visibility", this._onMeasureLayerVisibility);
    layerManager.off("layer:remove", this._onMeasureLayerRemove);
  }
  /**
   * Lit yaşam döngüsü: bileşen DOM'dan kaldırılırken DrawingManager/
   * LayerManager event aboneliklerini ve tüm canlı/bekleyen etiket
   * entity'lerini temizler.
   */
  disconnectedCallback() {
    if (this.map) {
      this._unbindDrawingManager(this.map.drawingManager);
      this._unbindLayerManager(this.map.layerManager);
    }
    this._removeLiveLabels();
    this._removePendingLabels();
    if (this._activeMode !== null) hideGuide();
    super.disconnectedCallback();
  }
  /**
   * Lit yaşam döngüsü: `customCss` değiştiğinde shadow DOM'a enjekte eder;
   * `map` değiştiğinde önceki haritanın DrawingManager/LayerManager
   * bağlarını çözüp yenisine bağlanır.
   *
   * @param changed - Değişen reactive property'lerin Lit tarafından
   *   sağlanan haritası.
   */
  updated(changed) {
    if (changed.has("customCss")) {
      applyCustomCss(this.shadowRoot, this.customCss, this._customCssState, "tucbs-measure-tool");
    }
    if (changed.has("map")) {
      const previous = changed.get("map");
      if (previous) {
        this._unbindDrawingManager(previous.drawingManager);
        this._unbindLayerManager(previous.layerManager);
      }
      if (this.map) {
        this._bindDrawingManager(this.map.drawingManager);
        this._bindLayerManager(this.map.layerManager);
      }
    }
  }
  _bindDrawingManager(drawingManager) {
    drawingManager.on("draw:start", this._onDrawStart);
    drawingManager.on("draw:cancel", this._onDrawCancel);
    drawingManager.on("draw:abort", this._onAbort);
    drawingManager.on("draw:vertex", this._onVertex);
    drawingManager.on("draw:move", this._onMove);
    drawingManager.on("draw:complete", this._onComplete);
    drawingManager.on("draw:remove", this._onRemove);
  }
  _unbindDrawingManager(drawingManager) {
    drawingManager.off("draw:start", this._onDrawStart);
    drawingManager.off("draw:cancel", this._onDrawCancel);
    drawingManager.off("draw:abort", this._onAbort);
    drawingManager.off("draw:vertex", this._onVertex);
    drawingManager.off("draw:move", this._onMove);
    drawingManager.off("draw:complete", this._onComplete);
    drawingManager.off("draw:remove", this._onRemove);
  }
  /**
   * Lit yaşam döngüsü: `map` henüz atanmamışsa `mapElementId` ile eşleşen
   * elementi bulur ve varsa doğrudan, yoksa elementin `ready` event'ini
   * bekleyerek `map` özelliğini atar.
   */
  // === Yasam Dongusu: Map baglama (Zoom/Draw/Delete ile ayni desen) ===
  firstUpdated() {
    bindMapByElementId(this, {
      noIdTiming: "raf",
      ...standardMapBindingMessages("tucbs-measure-tool", "islevsiz")
    });
  }
  _onMainButtonClick() {
    this._flyoutOpen = !this._flyoutOpen;
  }
  _selectMode(mode) {
    var _a2;
    const drawingManager = (_a2 = this.map) == null ? void 0 : _a2.drawingManager;
    if (!drawingManager) return;
    if (this._activeMode === mode) {
      drawingManager.deactivate();
    } else {
      this._claimingActivation = true;
      drawingManager.activate(MODE_TOOL[mode], "measure");
    }
    this._flyoutOpen = false;
  }
  // ── Cesium label entity'leri ─────────────────────────────────────────────
  _removeEntity(entity) {
    var _a2;
    (_a2 = this.map) == null ? void 0 : _a2.viewer.entities.remove(entity);
  }
  _removeLiveLabels() {
    if (this._liveSegmentLabel) {
      this._removeEntity(this._liveSegmentLabel);
      this._liveSegmentLabel = void 0;
    }
    if (this._liveAreaLabel) {
      this._removeEntity(this._liveAreaLabel);
      this._liveAreaLabel = void 0;
    }
  }
  _removePendingLabels() {
    for (const label of this._pendingLabels) this._removeEntity(label);
    this._pendingLabels = [];
    this._committedCoords = [];
    this._livePreviewCoord = void 0;
  }
  _liveSegmentMidpoint() {
    const last = this._committedCoords[this._committedCoords.length - 1];
    if (last === void 0 || this._livePreviewCoord === void 0) return void 0;
    return Cartesian3.midpoint(toCartesian(last), toCartesian(this._livePreviewCoord), new Cartesian3());
  }
  _liveSegmentDistance() {
    const last = this._committedCoords[this._committedCoords.length - 1];
    if (last === void 0 || this._livePreviewCoord === void 0) return void 0;
    return Cartesian3.distance(toCartesian(last), toCartesian(this._livePreviewCoord));
  }
  _livePolygonCoords() {
    return this._livePreviewCoord ? [...this._committedCoords, this._livePreviewCoord] : [...this._committedCoords];
  }
  // tucbs-react MeasureToolPanel.tsx'teki Entity.label + CallbackProperty +
  // HIDDEN_POS teknigi BIREBIR (bkz plan SS4) -- sadece VERI kaynagi farkli
  // (DrawingManager.on(...) event'leri, dogrudan ScreenSpaceEventHandler
  // DEGIL).
  _ensureLiveLabels() {
    var _a2;
    const viewer = (_a2 = this.map) == null ? void 0 : _a2.viewer;
    if (!viewer) return;
    if (this._liveSegmentLabel === void 0) {
      this._liveSegmentLabel = viewer.entities.add({
        position: new CallbackPositionProperty(() => this._liveSegmentMidpoint() ?? HIDDEN_POS, false),
        label: {
          text: new CallbackProperty(() => {
            const d2 = this._liveSegmentDistance();
            return d2 === void 0 ? "" : metersToReadable(d2);
          }, false),
          show: new CallbackProperty(() => this._liveSegmentMidpoint() !== void 0, false),
          showBackground: true,
          backgroundColor: SEGMENT_LABEL_BG,
          font: LABEL_FONT,
          style: LabelStyle.FILL,
          pixelOffset: new Cartesian2(0, -12),
          heightReference: HeightReference.CLAMP_TO_GROUND,
          verticalOrigin: VerticalOrigin.BOTTOM
        }
      });
    }
    if (this._liveAreaLabel === void 0) {
      this._liveAreaLabel = viewer.entities.add({
        position: new CallbackPositionProperty(() => {
          const pts = this._livePolygonCoords();
          return pts.length >= 3 ? centroidOf(pts) : HIDDEN_POS;
        }, false),
        label: {
          text: new CallbackProperty(() => {
            const pts = this._livePolygonCoords();
            if (pts.length < 3) return "";
            const area = polygonAreaMeters(pts);
            const perimeter = perimeterMeters(pts);
            return `Alan: ${sqmToReadable(area)}
Çevre: ${metersToReadable(perimeter)}`;
          }, false),
          show: new CallbackProperty(
            () => this._activeMode === "area" && this._livePolygonCoords().length >= 3,
            false
          ),
          showBackground: true,
          backgroundColor: AREA_LABEL_BG,
          font: LABEL_FONT,
          style: LabelStyle.FILL,
          disableDepthTestDistance: Number.POSITIVE_INFINITY
        }
      });
    }
  }
  _addStaticSegmentLabel(previous, current) {
    const p1 = toCartesian(previous);
    const p2 = toCartesian(current);
    const midpoint = Cartesian3.midpoint(p1, p2, new Cartesian3());
    const distance = Cartesian3.distance(p1, p2);
    return this.map.viewer.entities.add({
      position: midpoint,
      label: {
        text: metersToReadable(distance),
        showBackground: true,
        backgroundColor: SEGMENT_LABEL_BG,
        font: LABEL_FONT,
        style: LabelStyle.FILL,
        pixelOffset: new Cartesian2(0, -12),
        heightReference: HeightReference.CLAMP_TO_GROUND,
        verticalOrigin: VerticalOrigin.BOTTOM
      }
    });
  }
  // tucbs-react'te YOK -- kullanici istegiyle EKLENDI (bkz plan SS4, "Biri
  // cizgi cizip... toplam cizgi olcusunu de yazacak"). Son segment
  // etiketinden ayirt edilsin diye ters yonde offset + farkli renk.
  _addTotalDistanceLabel(shape) {
    const lastCoord = shape.coordinates[shape.coordinates.length - 1];
    const position = lastCoord ? toCartesian(lastCoord) : HIDDEN_POS;
    return this.map.viewer.entities.add({
      position,
      label: {
        text: `Toplam: ${metersToReadable(shape.length ?? 0)}`,
        showBackground: true,
        backgroundColor: TOTAL_LABEL_BG,
        fillColor: Color.WHITE,
        font: LABEL_FONT,
        style: LabelStyle.FILL,
        pixelOffset: new Cartesian2(0, 14),
        heightReference: HeightReference.CLAMP_TO_GROUND,
        verticalOrigin: VerticalOrigin.TOP
      }
    });
  }
  _addAreaSummaryLabel(shape) {
    const position = centroidOf(shape.coordinates);
    return this.map.viewer.entities.add({
      position,
      label: {
        text: `Alan: ${sqmToReadable(shape.area ?? 0)}
Çevre: ${metersToReadable(shape.perimeter ?? 0)}`,
        showBackground: true,
        backgroundColor: AREA_LABEL_BG,
        font: LABEL_FONT,
        style: LabelStyle.FILL,
        disableDepthTestDistance: Number.POSITIVE_INFINITY
      }
    });
  }
  /**
   * Bileşenin şablonunu render eder: ana ölçüm butonu ve (`_flyoutOpen`
   * iken) Mesafe Ölç/Alan Ölç seçenek butonlarını içeren flyout.
   */
  render() {
    const mainIcon = this._activeMode !== null ? iconFor(this._activeMode) : MAIN_ICON;
    const mainLabel = this._activeMode !== null ? modeLabel(this._activeMode) : "Ölçüm";
    return b`
      <div class="measure-tool">
        ${this._flyoutOpen ? b`
              <div class="flyout">
                ${["distance", "area"].map(
      (mode) => b`
                    <button
                      class="tool-button ${mode === this._activeMode ? "active" : ""}"
                      type="button"
                      aria-label=${modeLabel(mode)}
                      data-tooltip=${modeLabel(mode)}
                      @click=${() => this._selectMode(mode)}
                    >
                      ${iconFor(mode)}
                    </button>
                  `
    )}
              </div>
            ` : null}
        <button
          class="tool-button main-button ${this._activeMode !== null ? "active" : ""}"
          type="button"
          aria-label=${mainLabel}
          data-tooltip=${mainLabel}
          @click=${this._onMainButtonClick}
        >
          ${mainIcon}
        </button>
      </div>
    `;
  }
};
TucbsMeasureTool.styles = [
  leftTooltipStyles,
  i$6`
    :host {
      display: inline-flex;
      font-family: "IBM Plex Sans", system-ui, sans-serif;
    }

    .measure-tool {
      position: relative;
      display: inline-flex;
    }

    .flyout {
      position: absolute;
      right: 100%;
      top: 50%;
      transform: translateY(-50%);
      margin-right: 0.5rem;
      display: flex;
      flex-direction: row;
      gap: 0.5rem;
    }

    .tool-button {
      width: 2.25rem;
      height: 2.25rem;
      border-radius: 50%;
      border: 1px solid var(--cds-border-subtle, #e0e0e0);
      background: var(--cds-layer-01, #ffffff);
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      cursor: pointer;
      color: var(--cds-text-primary, #161616);
    }

    .tool-button:hover {
      background: var(--cds-layer-hover-01, #e8e8e8);
    }

    .tool-button.active {
      background: var(--cds-background-selected, #e0e0e0);
      border-color: var(--cds-border-strong-01, #8d8d8d);
    }

    .tool-button svg {
      width: 1rem;
      height: 1rem;
    }

    /* Ana buton toolbar'da SABIT durdugu icin (aktif/pasif fark etmeksizin,
       sadece ikonu degisir) tooltip'i DAIMA leftTooltipStyles'in varsayilan
       SOL konumunda kalir -- aktiflik durumuna gore konum degistirmek
       (once altta, tiklayinca solda) kullanici tarafindan tutarsiz/yanlis
       bulundu (bkz. feedback). SADECE flyout'taki alt secenekler altta acilir. */

    /* Flyout'taki alt secenek butonlari (Mesafe Olc/Alan Olc) DAIMA butonun
       ALTINDA tooltip gosterir -- ana butonun aksine flyout'un actigi
       yonden bagimsiz. */
    .tool-button:not(.main-button)[data-tooltip]::after {
      top: calc(100% + 0.5rem);
      right: auto;
      left: 50%;
      transform: translateX(-50%);
    }
  `
];
__decorateClass$m([
  n$1()
], TucbsMeasureTool.prototype, "mapElementId", 2);
__decorateClass$m([
  n$1({ attribute: "custom-css" })
], TucbsMeasureTool.prototype, "customCss", 2);
__decorateClass$m([
  n$1({ attribute: false })
], TucbsMeasureTool.prototype, "map", 2);
__decorateClass$m([
  r()
], TucbsMeasureTool.prototype, "_activeMode", 2);
__decorateClass$m([
  r()
], TucbsMeasureTool.prototype, "_flyoutOpen", 2);
TucbsMeasureTool = __decorateClass$m([
  t$3("tucbs-measure-tool")
], TucbsMeasureTool);
var __defProp$k = Object.defineProperty;
var __getOwnPropDesc$l = Object.getOwnPropertyDescriptor;
var __decorateClass$l = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$l(target, key) : target;
  for (var i4 = decorators.length - 1, decorator; i4 >= 0; i4--)
    if (decorator = decorators[i4])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$k(target, key, result);
  return result;
};
const ICON_DOWNLOAD$1 = o$1(iconNodeToString(_16_default$p));
let TucbsMapExport = class extends i$3 {
  constructor() {
    super(...arguments);
    this.mapElementId = "";
    this.filename = "tucbs-harita";
    this.customCss = "";
    this._busy = false;
    this._customCssState = { sheet: null };
  }
  /** `customCss` degistiginde shadow DOM'a enjekte edilen ozel stili gunceller. */
  updated(changed) {
    if (changed.has("customCss")) {
      applyCustomCss(this.shadowRoot, this.customCss, this._customCssState, "tucbs-map-export");
    }
  }
  // === Yasam Dongusu: Map baglama (Zoom/Draw/Delete ile ayni desen) ===
  /** `mapElementId` uzerinden (veya `ready` olayini bekleyerek) `map` referansini coze; hicbiri saglanmazsa uyari loglar. */
  firstUpdated() {
    bindMapByElementId(this, {
      noIdTiming: "raf",
      ...standardMapBindingMessages("tucbs-map-export", "islevsiz")
    });
  }
  async _onClick() {
    if (this._busy || !this.map) return;
    this._busy = true;
    try {
      await this.map.exportJPEG(this.filename);
    } finally {
      this._busy = false;
    }
  }
  /** Bilesenin indirme dugmesini (JPG ikonu) render eder. */
  render() {
    return b`
      <button
        class="tool-button"
        type="button"
        aria-label="Haritayı İndir (JPG)"
        data-tooltip="Haritayı İndir (JPG)"
        ?disabled=${this._busy}
        @click=${this._onClick}
      >
        ${ICON_DOWNLOAD$1}
      </button>
    `;
  }
};
TucbsMapExport.styles = [
  leftTooltipStyles,
  i$6`
    :host {
      display: inline-flex;
      font-family: "IBM Plex Sans", system-ui, sans-serif;
    }

    .tool-button {
      width: 2.25rem;
      height: 2.25rem;
      border-radius: 50%;
      border: 1px solid var(--cds-border-subtle, #e0e0e0);
      background: var(--cds-layer-01, #ffffff);
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      cursor: pointer;
      color: var(--cds-text-primary, #161616);
    }

    .tool-button:hover:not(:disabled) {
      background: var(--cds-layer-hover-01, #e8e8e8);
    }

    .tool-button:disabled {
      cursor: progress;
      opacity: 0.6;
    }

    .tool-button svg {
      width: 1rem;
      height: 1rem;
    }
  `
];
__decorateClass$l([
  n$1()
], TucbsMapExport.prototype, "mapElementId", 2);
__decorateClass$l([
  n$1()
], TucbsMapExport.prototype, "filename", 2);
__decorateClass$l([
  n$1({ attribute: "custom-css" })
], TucbsMapExport.prototype, "customCss", 2);
__decorateClass$l([
  n$1({ attribute: false })
], TucbsMapExport.prototype, "map", 2);
__decorateClass$l([
  r()
], TucbsMapExport.prototype, "_busy", 2);
TucbsMapExport = __decorateClass$l([
  t$3("tucbs-map-export")
], TucbsMapExport);
const SIYASI_THUMB = "data:image/jpeg;base64,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";
const TEMEL_THUMB = "data:image/jpeg;base64,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";
const ORTOFOTO_THUMB = "data:image/jpeg;base64,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";
const YUKSEKLIK_THUMB = "data:image/jpeg;base64,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";
var __defProp$j = Object.defineProperty;
var __getOwnPropDesc$k = Object.getOwnPropertyDescriptor;
var __decorateClass$k = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$k(target, key) : target;
  for (var i4 = decorators.length - 1, decorator; i4 >= 0; i4--)
    if (decorator = decorators[i4])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$j(target, key, result);
  return result;
};
const ICON_CHEVRON_RIGHT = o$1(iconNodeToString(_16_default$x));
const ICON_CLOSE$3 = o$1(iconNodeToString(_16_default$v));
const ICON_CHECK = o$1(iconNodeToString(_16_default$y));
const ICON_WARNING = o$1(iconNodeToString(_16_default$2));
const ICON_MAP = o$1(iconNodeToString(_16_default$h));
const PENDING_INDICATOR_DELAY_MS = 1500;
const DEFAULT_BASEMAPS = [
  { id: "hgm-siyasi", label: "HGM Siyasi", thumbnail: SIYASI_THUMB },
  { id: "hgm-yukseklik", label: "HGM Yükseklik", thumbnail: YUKSEKLIK_THUMB },
  { id: "hgm-ortofoto", label: "HGM Ortofoto", thumbnail: ORTOFOTO_THUMB },
  { id: "hgm-temel", label: "HGM Temel", thumbnail: TEMEL_THUMB }
];
let TucbsBasemapPicker = class extends i$3 {
  constructor() {
    super(...arguments);
    this.mapElementId = "";
    this.activeBasemap = "";
    this.basemaps = DEFAULT_BASEMAPS;
    this.customCss = "";
    this.embedded = false;
    this._open = false;
    this._error = false;
    this._pending = false;
    this._customCssState = { sheet: null };
    this._pendingTimer = null;
    this._timers = new TimerBag(this);
    this._onLayerAdd = (payload) => {
      if (!payload.layer.isBasemap) return;
      this.activeBasemap = payload.layer.title;
      this._clearPendingTimer();
      this._pending = false;
      this._pendingTimer = this._timers.setTimeout(() => {
        this._pendingTimer = null;
        this._pending = true;
      }, PENDING_INDICATOR_DELAY_MS);
    };
    this._onBasemapError = () => {
      this._clearPendingTimer();
      this._pending = false;
      this._error = true;
    };
    this._onBasemapRecovered = () => {
      this._clearPendingTimer();
      this._pending = false;
      this._error = false;
    };
  }
  _clearPendingTimer() {
    if (this._pendingTimer !== null) {
      this._timers.clearTimeout(this._pendingTimer);
      this._pendingTimer = null;
    }
  }
  /** Lit yaşam döngüsü: bileşen DOM'dan kaldırılırken bekleyen zamanlayıcıyı temizler ve haritaya bağlıysa event dinleyicilerini çözer. */
  disconnectedCallback() {
    this._clearPendingTimer();
    if (this.map) this._unbindMap(this.map);
    super.disconnectedCallback();
  }
  /**
   * Lit yaşam döngüsü: `map` henüz atanmamışsa `mapElementId` ile eşleşen
   * `tucbs-map` elementini bulur ve varsa doğrudan, yoksa elementin `ready`
   * event'ini bekleyerek `map` özelliğini atar.
   */
  // === Yasam Dongusu: Map baglama ===
  firstUpdated() {
    bindMapByElementId(this, {
      noIdTiming: "raf",
      ...standardMapBindingMessages("tucbs-basemap-picker", "gizli")
    });
  }
  /**
   * Lit yaşam döngüsü: reaktif özellik değişikliklerini işler — `customCss`
   * değiştiğinde shadow DOM'a yeniden uygulanır, `map` değiştiğinde önceki
   * haritadan çözülüp yenisine bağlanılır, `activeBasemap` dışarıdan
   * değiştirildiğinde (haritanın güncel basemap'inden farklıysa)
   * `map.setBasemap()` çağrılır.
   *
   * @param changed - Değişen reactive property'lerin Lit tarafından sağlanan haritası.
   */
  updated(changed) {
    var _a2;
    if (changed.has("customCss")) {
      applyCustomCss(this.shadowRoot, this.customCss, this._customCssState, "tucbs-basemap-picker");
    }
    if (changed.has("map")) {
      const previous = changed.get("map");
      if (previous) this._unbindMap(previous);
      if (this.map) this._bindMap(this.map);
    }
    if (changed.has("activeBasemap") && this.activeBasemap && this.map) {
      const current = (_a2 = this.map.layerManager.getLayers().find((layer) => layer.isBasemap)) == null ? void 0 : _a2.title;
      if (current !== this.activeBasemap) {
        this.map.setBasemap(this.activeBasemap);
      }
    }
  }
  _bindMap(map) {
    map.layerManager.on("layer:add", this._onLayerAdd);
    map.layerManager.on("basemap:error", this._onBasemapError);
    map.layerManager.on("basemap:recovered", this._onBasemapRecovered);
    this._syncFromMap(map);
    if (map.basemapStatus === "unavailable") {
      this._error = true;
    } else if (map.basemapStatus === "loading") {
      this._pending = true;
    }
  }
  _unbindMap(map) {
    map.layerManager.off("layer:add", this._onLayerAdd);
    map.layerManager.off("basemap:error", this._onBasemapError);
    map.layerManager.off("basemap:recovered", this._onBasemapRecovered);
  }
  // Haritadaki mevcut aktif basemap'i listede secili hale getirir (ör. baglanma aninda
  // harita zaten bir basemap ile acilmissa, secim ilk render'da dogru gorunur).
  _syncFromMap(map) {
    const active = map.layerManager.getLayers().find((layer) => layer.isBasemap);
    if (active) this.activeBasemap = active.title;
  }
  _select(id) {
    if (this._error || this._pending) return;
    this._clearPendingTimer();
    this._pending = false;
    this._pendingTimer = this._timers.setTimeout(() => {
      this._pendingTimer = null;
      this._pending = true;
    }, PENDING_INDICATOR_DELAY_MS);
    this.activeBasemap = id;
  }
  _openPanel() {
    this._open = true;
  }
  _closePanel() {
    this._open = false;
  }
  _renderCard(basemap) {
    const selected = basemap.id === this.activeBasemap;
    return b`
      <button
        type="button"
        class="card ${selected ? "selected" : ""}"
        style="background-image: url('${basemap.thumbnail}')"
        role="radio"
        aria-checked=${selected}
        ?disabled=${this._error || this._pending}
        aria-disabled=${this._error || this._pending}
        @click=${() => this._select(basemap.id)}
      >
        ${selected ? b`<span class="check-badge">${ICON_CHECK}</span>` : A}
        <span class="card-label">${basemap.label}</span>
      </button>
    `;
  }
  _renderGrid() {
    return b`
      <div class="grid" role="radiogroup" aria-label="Altlık Haritalar" aria-disabled=${this._error || this._pending}>
        ${c(this.basemaps, (basemap) => basemap.id, (basemap) => this._renderCard(basemap))}
      </div>
    `;
  }
  // HGM/Turksat proxy'sine erisilemedigi (bkz _onBasemapError) durumda
  // gosterilen acik hata bildirimi -- ucuncu taraf bir haritaya sessizce
  // dusulmedigini kullaniciya bildirir.
  _renderErrorBanner() {
    if (!this._error) return A;
    return b`
      <div class="error-banner" role="alert">
        ${ICON_WARNING}
        <span>Altlık Haritalar servisine erişilemiyor.</span>
      </div>
    `;
  }
  // Sadece HGM gozle gorulur derecede gecikince (bkz PENDING_INDICATOR_DELAY_MS)
  // gorunur -- normal/hizli yuklenen durumda HIC render edilmez. _error ile
  // AYNI ANDA gorunmez (biri diger onu zaten temizler, bkz _onBasemapError/
  // _onBasemapRecovered), ama gene de ikisi ayni banner alanini paylastigi
  // icin acikca birbirini dislar.
  _renderLoadingBanner() {
    if (!this._pending || this._error) return A;
    return b`
      <div class="loading-banner" role="status">
        <span class="loading-spinner"></span>
        <span>Altlık Haritalar yükleniyor…</span>
      </div>
    `;
  }
  /**
   * Bileşenin şablonunu render eder: bağımsız modda toggle butonu/panel,
   * embedded modda salt başlık+grid içerik; haritaya bağlı değilse gizli kalır.
   */
  render() {
    if (!this.map) return A;
    if (this.embedded) {
      return b`
        <div class="panel">
          <span class="title">Altlık Haritalar</span>
          ${this._renderErrorBanner()}
          ${this._renderLoadingBanner()}
          ${this._renderGrid()}
        </div>
      `;
    }
    if (!this._open) {
      return b`
        <button type="button" class="toggle-btn ${this._error ? "has-error" : ""}" @click=${() => this._openPanel()}>
          Altlık Haritalar
          ${this._error ? ICON_WARNING : A}
          <span class="toggle-arrow" aria-hidden="true">${ICON_CHEVRON_RIGHT}</span>
        </button>
      `;
    }
    return b`
      <div class="panel">
        <div class="header">
          <span class="title"><span class="title-icon">${ICON_MAP}</span>Altlık Haritalar</span>
          <button type="button" class="close-btn" aria-label="Kapat" @click=${() => this._closePanel()}>
            ${ICON_CLOSE$3}
          </button>
        </div>
        ${this._renderErrorBanner()}
        ${this._renderLoadingBanner()}
        ${this._renderGrid()}
      </div>
    `;
  }
};
TucbsBasemapPicker.styles = i$6`
    :host {
      position: fixed;
      top: 1rem;
      right: 1rem;
      z-index: 1000;
      display: block;
      font-family: "IBM Plex Sans", system-ui, sans-serif;
      font-size: 0.875rem;
      color: var(--cds-text-primary, #161616);
      --cds-focus: transparent;
    }

    .toggle-btn {
      display: flex;
      align-items: center;
      gap: 0.375rem;
      padding: 0.5rem 0.75rem;
      border: 1px solid var(--cds-border-subtle, #e0e0e0);
      border-radius: 4px;
      background: var(--cds-layer-01, #ffffff);
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
      color: var(--cds-text-primary, #161616);
      font: inherit;
      cursor: pointer;
    }

    .toggle-btn:hover {
      background: var(--cds-layer-hover-01, #f4f4f4);
    }

    .toggle-arrow {
      display: inline-flex;
      color: var(--cds-icon-secondary, #6f6f6f);
    }

    .panel {
      background: #fafcfd;
      border: 1px solid var(--cds-border-subtle, #e0e0e0);
      border-radius: 12px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
      min-width: 280px;
      max-width: 360px;
      padding: 1rem;
    }

    .title {
      display: block;
      font-weight: 700;
      font-size: 0.875rem;
      margin-bottom: 0.875rem;
    }

    /* Bagimsiz modda (bkz. embedded) baslik + kapatma (X) butonu bir satirda --
       TucbsLayerList'teki ".header" ile ayni fikir. Embedded modda (Ayarlar
       panelinin icinde) bu satir/buton hic YOK, sadece duz ".title" kullanilir. */
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.875rem;
    }

    .header .title {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0;
    }

    .title-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 1rem;
      height: 1rem;
      line-height: 0;
      color: #0f62fe;
    }

    .title-icon svg {
      width: 1rem;
      height: 1rem;
      display: block;
    }

    .close-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      flex: none;
      border: none;
      border-radius: 4px;
      background: transparent;
      color: var(--cds-icon-secondary, #6f6f6f);
      cursor: pointer;
    }

    .close-btn:hover {
      background: var(--cds-layer-hover-01, #f4f4f4);
      color: var(--cds-icon-primary, #161616);
    }

    .close-btn svg {
      width: 1rem;
      height: 1rem;
    }

    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.75rem;
    }

    .card {
      position: relative;
      aspect-ratio: 3 / 2;
      display: flex;
      align-items: flex-end;
      padding: 0;
      border: 2px solid transparent;
      border-radius: 10px;
      overflow: hidden;
      background-size: cover;
      background-position: center;
      font: inherit;
      cursor: pointer;
    }

    .card::after {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(0, 0, 0, 0.55) 0%, rgba(0, 0, 0, 0) 55%);
    }

    .card.selected {
      border-color: #0f62fe;
      box-shadow: 0 0 0 2px rgba(15, 98, 254, 0.35);
    }

    .card:disabled {
      cursor: not-allowed;
      opacity: 0.45;
      filter: grayscale(60%);
    }

    .check-badge {
      position: absolute;
      top: 0.5rem;
      left: 50%;
      transform: translateX(-50%);
      z-index: 2;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 2.25rem;
      height: 1.375rem;
      border-radius: 999px;
      background: #0f62fe;
      color: #ffffff;
    }

    .check-badge svg {
      width: 14px;
      height: 14px;
    }

    .card-label {
      position: relative;
      z-index: 1;
      padding: 0.5rem 0.625rem;
      font-weight: 600;
      font-size: 0.75rem;
      color: #ffffff;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
    }

    .error-banner {
      display: flex;
      align-items: flex-start;
      gap: 0.5rem;
      margin-bottom: 0.75rem;
      padding: 0.5rem 0.625rem;
      border-radius: 6px;
      background: var(--cds-support-error-inverse, #fff1f1);
      color: var(--cds-support-error, #da1e28);
      font-size: 0.75rem;
      line-height: 1.3;
    }

    .error-banner svg {
      flex: none;
      width: 1rem;
      height: 1rem;
      margin-top: 0.0625rem;
    }

    .toggle-btn.has-error {
      border-color: var(--cds-support-error, #da1e28);
      color: var(--cds-support-error, #da1e28);
    }

    .loading-banner {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.75rem;
      padding: 0.5rem 0.625rem;
      border-radius: 6px;
      background: var(--cds-layer-01, #f4f4f4);
      color: var(--cds-text-secondary, #525252);
      font-size: 0.75rem;
      line-height: 1.3;
    }

    .loading-spinner {
      flex: none;
      width: 1rem;
      height: 1rem;
      border: 2px solid var(--cds-border-subtle, #e0e0e0);
      border-top-color: var(--cds-interactive, #0f62fe);
      border-radius: 50%;
      animation: basemap-loading-spin 0.7s linear infinite;
    }

    @keyframes basemap-loading-spin {
      to {
        transform: rotate(360deg);
      }
    }
  `;
__decorateClass$k([
  n$1()
], TucbsBasemapPicker.prototype, "mapElementId", 2);
__decorateClass$k([
  n$1({ attribute: "active-basemap" })
], TucbsBasemapPicker.prototype, "activeBasemap", 2);
__decorateClass$k([
  n$1({ attribute: false })
], TucbsBasemapPicker.prototype, "map", 2);
__decorateClass$k([
  n$1({ attribute: false })
], TucbsBasemapPicker.prototype, "basemaps", 2);
__decorateClass$k([
  n$1({ attribute: "custom-css" })
], TucbsBasemapPicker.prototype, "customCss", 2);
__decorateClass$k([
  n$1({ type: Boolean, attribute: false })
], TucbsBasemapPicker.prototype, "embedded", 2);
__decorateClass$k([
  r()
], TucbsBasemapPicker.prototype, "_open", 2);
__decorateClass$k([
  r()
], TucbsBasemapPicker.prototype, "_error", 2);
__decorateClass$k([
  r()
], TucbsBasemapPicker.prototype, "_pending", 2);
TucbsBasemapPicker = __decorateClass$k([
  t$3("tucbs-basemap-picker")
], TucbsBasemapPicker);
var __defProp$i = Object.defineProperty;
var __getOwnPropDesc$j = Object.getOwnPropertyDescriptor;
var __decorateClass$j = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$j(target, key) : target;
  for (var i4 = decorators.length - 1, decorator; i4 >= 0; i4--)
    if (decorator = decorators[i4])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$i(target, key, result);
  return result;
};
const ICON_METER = o$1(iconNodeToString(_16_default$g));
let TucbsQualityBar = class extends i$3 {
  constructor() {
    super(...arguments);
    this.mapElementId = "";
    this.position = "bottom-left";
    this.customCss = "";
    this._customCssState = { sheet: null };
    this._quality = 75;
    this._qualityRaf = null;
    this._timers = new TimerBag(this);
  }
  /** Bekleyen RAF (kalite guncelleme) varsa iptal eder, ardindan super'i cagirir. */
  disconnectedCallback() {
    super.disconnectedCallback();
  }
  // === Yasam Dongusu: Map baglama ===
  /** Map instance'ina baglanir: property binding (Senaryo 1) veya `mapElementId` (Senaryo 2A/2B) uzerinden. */
  firstUpdated() {
    bindMapByElementId(this, {
      noIdTiming: "raf",
      ...standardMapBindingMessages("tucbs-quality-bar", "gizli")
    });
  }
  /** `customCss` degisince ozel CSS'i yeniden uygular; `map` degisince bar'i haritanin guncel kalitesinden senkronlar. */
  updated(changed) {
    if (changed.has("customCss")) {
      applyCustomCss(this.shadowRoot, this.customCss, this._customCssState, "tucbs-quality-bar");
    }
    if (changed.has("map") && this.map) this._syncFromMap(this.map);
  }
  _syncFromMap(map) {
    this._quality = Math.round(map.viewer.resolutionScale * 100);
  }
  _onSliderInput(event) {
    const input = event.target;
    const value = Number(input.value);
    input.style.setProperty("--fill", `${value}%`);
    this._timers.cancelAnimationFrame(this._qualityRaf);
    this._qualityRaf = this._timers.requestAnimationFrame(() => {
      var _a2;
      this._qualityRaf = null;
      this._quality = value;
      (_a2 = this.map) == null ? void 0 : _a2.setQuality(value);
    });
  }
  /** Map baglanmadiysa `nothing` (bilesen gizli); baglandiysa kalite surgulu panelini cizer. */
  render() {
    if (!this.map) return A;
    return b`
      <div class="panel">
        <div class="header-row">
          <span class="title"><span class="title-icon">${ICON_METER}</span>Harita Kalitesi</span>
          <span class="value-badge">%${this._quality}</span>
        </div>
        <input
          type="range"
          class="quality-slider"
          min="0"
          max="100"
          step="5"
          .value=${String(this._quality)}
          style="--fill: ${this._quality}%"
          @input=${this._onSliderInput}
        />
        <div class="quality-labels">
          <span>← Performans</span>
          <span class="center">Varsayılan</span>
          <span>Kalite →</span>
        </div>
      </div>
    `;
  }
};
TucbsQualityBar.styles = i$6`
    :host {
      position: fixed;
      z-index: 950;
      display: block;
      font-family: "IBM Plex Sans", system-ui, sans-serif;
      font-size: 0.75rem;
    }

    /* TucbsInfoBar varsayilan olarak alt kenarda 28px yukseklikte sabit
       durur; "bottom-left"/"bottom-right" bu bar'in ustunde kalacak sekilde
       28px + bosluk kadar yukariya tasinir. */
    :host([position="bottom-left"]) {
      left: 0.75rem;
      bottom: calc(28px + 0.5rem);
    }

    :host([position="bottom-right"]) {
      right: 0.75rem;
      bottom: calc(28px + 0.5rem);
    }

    :host([position="top-left"]) {
      left: 0.75rem;
      top: 0.75rem;
    }

    :host([position="top-right"]) {
      right: 0.75rem;
      top: 0.75rem;
    }

    .panel {
      display: flex;
      flex-direction: column;
      gap: 0.625rem;
      min-width: 240px;
      padding: 1rem;
      background: #fafcfd;
      border: 1px solid var(--cds-border-subtle, #e0e0e0);
      border-radius: 12px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
      color: var(--cds-text-primary, #161616);
    }

    .header-row {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      margin-bottom: 0.5rem;
    }

    .title {
      display: inline-flex;
      align-items: center;
      gap: 0.375rem;
      font-weight: 600;
      font-size: 0.875rem;
    }

    .title-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 1rem;
      height: 1rem;
      line-height: 0;
      color: #0f62fe;
    }

    .title-icon svg {
      width: 1rem;
      height: 1rem;
      display: block;
    }

    .value-badge {
      font-weight: 700;
      font-size: 0.875rem;
      color: #0f62fe;
    }

    /* Deger, native <input>'in KENDI "--fill" custom property'siyle (bkz.
       TucbsLayerList'teki katman opaklik bar'i, AYNI desen) aninda -- Lit
       re-render'ina UGRAMADAN -- gorsellestirilir; surukleme sirasinda
       gercek yan etkiler (map.setQuality() + _quality state'i) RAF ile
       frame basina en fazla bir kez uygulanir (bkz. _onSliderInput). Bu,
       Carbon'un cds-slider'inin (denendi, geri alindi) hem surukleme
       jank'ine hem de RTL'de deger<->gorsel-konum tutarsizligina
       (slider.js: thumb HER ZAMAN fiziksel "left:rate%" ile cizilir, "isRtl"
       SADECE pointer->deger hesabini etkiler) yol acmasindan TAMAMEN
       kacinir. */
    .quality-slider {
      display: block;
      width: 100%;
      height: 4px;
      margin: 0;
      appearance: none;
      border-radius: 2px;
      background: linear-gradient(
        to right,
        #0f62fe 0%,
        #0f62fe var(--fill, 75%),
        var(--cds-border-subtle, #e0e0e0) var(--fill, 75%),
        var(--cds-border-subtle, #e0e0e0) 100%
      );
      cursor: pointer;
    }

    .quality-slider::-webkit-slider-thumb {
      width: 14px;
      height: 14px;
      appearance: none;
      border-radius: 50%;
      background: #0f62fe;
      cursor: pointer;
    }

    .quality-slider::-moz-range-thumb {
      width: 14px;
      height: 14px;
      border: none;
      border-radius: 50%;
      background: #0f62fe;
      cursor: pointer;
    }

    .quality-labels {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: var(--cds-text-secondary, #525252);
    }

    .quality-labels .center {
      color: var(--cds-text-placeholder, #a8a8a8);
    }
  `;
__decorateClass$j([
  n$1()
], TucbsQualityBar.prototype, "mapElementId", 2);
__decorateClass$j([
  n$1({ reflect: true })
], TucbsQualityBar.prototype, "position", 2);
__decorateClass$j([
  n$1({ attribute: "custom-css" })
], TucbsQualityBar.prototype, "customCss", 2);
__decorateClass$j([
  n$1({ attribute: false })
], TucbsQualityBar.prototype, "map", 2);
__decorateClass$j([
  r()
], TucbsQualityBar.prototype, "_quality", 2);
TucbsQualityBar = __decorateClass$j([
  t$3("tucbs-quality-bar")
], TucbsQualityBar);
var __defProp$h = Object.defineProperty;
var __getOwnPropDesc$i = Object.getOwnPropertyDescriptor;
var __decorateClass$i = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$i(target, key) : target;
  for (var i4 = decorators.length - 1, decorator; i4 >= 0; i4--)
    if (decorator = decorators[i4])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$h(target, key, result);
  return result;
};
const ICON_SETTINGS = o$1(iconNodeToString(_16_default$9));
const EMBED_BASEMAP_CSS = `
  :host {
    position: static !important;
    inset: auto !important;
    z-index: auto !important;
  }
`;
const EMBED_QUALITY_CSS = `
  :host {
    position: static !important;
    inset: auto !important;
    z-index: auto !important;
  }
`;
let TucbsSettingsTool = class extends i$3 {
  constructor() {
    super(...arguments);
    this.mapElementId = "";
    this.panelWidth = "360px";
    this.customCss = "";
    this._open = false;
    this._layoutController = new PanelLayoutController(this);
    this._panelEl = null;
    this._customCssState = { sheet: null };
  }
  /**
   * Lit yasam dongusu: bilesen DOM'a baglandiginda paylasilan
   * `tucbs-slide-over-panel`'i olusturup `document.body`'ye portal eder,
   * baslik/genislik/kapatma callback'ini ayarlar ve ilk icerigi panele render eder.
   */
  connectedCallback() {
    super.connectedCallback();
    this._layoutController.onExclusiveClose = () => {
      if (this._open) this._toggle();
    };
    const panel = document.createElement("tucbs-slide-over-panel");
    panel.panelTitle = "Ayarlar";
    panel.panelWidth = this.panelWidth;
    panel.onCloseRequest = () => this._toggle();
    document.body.appendChild(panel);
    this._panelEl = panel;
    this._renderIntoPanel();
  }
  /**
   * Lit yasam dongusu: bilesen DOM'dan kaldirildiginda haritadan/layout
   * controller'dan ayrilir ve portal edilmis paneli DOM'dan kaldirir.
   */
  disconnectedCallback() {
    var _a2;
    if (this.map) this._layoutController.unbindMap(this.map);
    (_a2 = this._panelEl) == null ? void 0 : _a2.remove();
    this._panelEl = null;
    super.disconnectedCallback();
  }
  // === Yasam Dongusu: Map baglama ===
  /**
   * Lit yasam dongusu: ilk render sonrasi haritaya baglanir -- `map`
   * property binding ile zaten atanmissa (Senaryo 1) hicbir sey yapmaz,
   * aksi halde `mapElementId` ile referans verilen `tucbs-map` elementini
   * bulup (varsa `ready` event'ini bekleyerek) `map`'i atar (Senaryo 2).
   */
  firstUpdated() {
    bindMapByElementId(this, {
      noIdTiming: "sync",
      ...standardMapBindingMessages("tucbs-settings-tool", "islevsiz")
    });
  }
  /**
   * Lit yasam dongusu: `customCss` degistiginde shadow DOM'a yeniden uygular,
   * `map` degistiginde layout controller'in bind/unbind islemlerini yapar,
   * `panelWidth` degisip panel aciksa yeni genisligi uygular ve panelin
   * icerigini (basemap-picker/quality-bar) yeniden render eder.
   *
   * @param changed - Degisen property'leri iceren Lit `PropertyValues` haritasi.
   */
  updated(changed) {
    if (changed.has("customCss")) {
      applyCustomCss(this.shadowRoot, this.customCss, this._customCssState, "tucbs-settings-tool");
    }
    if (changed.has("map")) {
      const previous = changed.get("map");
      if (previous) this._layoutController.unbindMap(previous);
      if (this.map) this._layoutController.bindMap(this.map);
    }
    if (changed.has("panelWidth") && this._open) {
      this._layoutController.setOpen(true, this.panelWidth);
    }
    if (this._panelEl) this._panelEl.panelWidth = this.panelWidth;
    this._renderIntoPanel();
  }
  _renderIntoPanel() {
    if (!this._panelEl) return;
    this._panelEl.open = this._open;
    D(
      b`
        <span slot="icon">${ICON_SETTINGS}</span>
        <tucbs-basemap-picker
          .map=${this.map}
          .embedded=${true}
          custom-css=${EMBED_BASEMAP_CSS}
        ></tucbs-basemap-picker>
        <tucbs-quality-bar .map=${this.map} custom-css=${EMBED_QUALITY_CSS}></tucbs-quality-bar>
      `,
      this._panelEl
    );
  }
  _toggle() {
    if (!this.map) return;
    this._open = !this._open;
    this._layoutController.setOpen(this._open, this.panelWidth);
    this._renderIntoPanel();
  }
  /** Toolbar butonunu render eder; tiklaninca ayarlar panelini acip kapatir. */
  render() {
    return b`
      <button
        type="button"
        class="tool-button ${this._open ? "active" : ""}"
        aria-label="Ayarlar"
        data-tooltip="Ayarlar"
        aria-pressed=${this._open}
        @click=${this._toggle}
      >
        ${ICON_SETTINGS}
      </button>
    `;
  }
};
TucbsSettingsTool.styles = [
  leftTooltipStyles,
  i$6`
    :host {
      display: inline-flex;
      font-family: "IBM Plex Sans", system-ui, sans-serif;
      font-size: 0.875rem;
      color: var(--cds-text-primary, #161616);
      --cds-focus: transparent;
    }

    .tool-button {
      width: 2.25rem;
      height: 2.25rem;
      border-radius: 50%;
      border: 1px solid var(--cds-border-subtle, #e0e0e0);
      background: var(--cds-layer-01, #ffffff);
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      cursor: pointer;
      color: var(--cds-text-primary, #161616);
    }

    .tool-button:hover {
      background: var(--cds-layer-hover-01, #e8e8e8);
    }

    .tool-button.active {
      background: var(--cds-background-selected, #e0e0e0);
      border-color: var(--cds-border-strong-01, #8d8d8d);
    }

    .tool-button svg {
      width: 1rem;
      height: 1rem;
    }
  `
];
__decorateClass$i([
  n$1()
], TucbsSettingsTool.prototype, "mapElementId", 2);
__decorateClass$i([
  n$1({ attribute: "panel-width" })
], TucbsSettingsTool.prototype, "panelWidth", 2);
__decorateClass$i([
  n$1({ attribute: "custom-css" })
], TucbsSettingsTool.prototype, "customCss", 2);
__decorateClass$i([
  n$1({ attribute: false })
], TucbsSettingsTool.prototype, "map", 2);
__decorateClass$i([
  r()
], TucbsSettingsTool.prototype, "_open", 2);
TucbsSettingsTool = __decorateClass$i([
  t$3("tucbs-settings-tool")
], TucbsSettingsTool);
const NORTH_ARROW_DATA_URI = "data:image/png;base64,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048v04K5f//+cVa9+uqreWxAkinI4pYZAAA0OC0tlldeeeXMTj8SL7/8ch4bkCRXWGYAABBF80QF04877rgjzrIXXnghrw3ItyGLWm4AANS7U9IieaWVVsr09CPx3HPP5bUBSfJnyw0AgHo2d8gXaYF82223xVn39NNP57kBmRiyiGUHAEC9OiktjldYYYV4ypQpmW9AHn/88Tw3IEn+ZNkBAFCPuoSMSgvjW2+9Nc6Dhx9+OO8NyDchC1l+AADUmxOjnE0/Evfff3/eG5AkF1t+AADUk2T6MTItiG+++eY4L+65555aaEAmhPSwDAEAqBfHp8Vwr169cjP9SNx555210IAkucgyBACgHnQO+TwthPv16xfnye23314rDcj4kAUsRwAAat1xaRG83HLLxZMnT85VA5J8XaxGGpAkF1iOAADUsk4hI9IC+MYbb4zz5oYbbqilBuTrkO6WJQAAteqYtPhddtllczf9SFxzzTW11IAk+Z1lCQBALUqmH5+lhe/1118f59HVV19daw3IuJBulicAALXmqLToXXrppXM5/UhcccUVtdaAJDnX8gQAoJZ0DPk0LXivu+66OK/+9Kc/1WIDMiZkPssUAIBa8du02O3Zs2c8adKk3DYgF198cS02IEnOtkwBAKgFHUI+SQvd5EfceXbhhRfWagPyVci8lisAAHl3RFrkLrXUUrmefiTOP//8Wm1AkpxhuQIAkGfJ9OPjtMDt27dvnHdnn312LTcgo0O6WrYAAOTV4Wlxu+SSS8bffvtt7huQ008/vZYbkCSnWbYAAOTRXCEfpYXtX//617gWnHzyybXegHwZMo/lCwBA3hyaFrVLLLFETUw/EieccEKtNyBJTrZ8AQDIk2T6MTwtaP/yl7/EteKYY46phwZkVEgXyxgAgLw4JC1mF1988XjixIk104AceeSR9dCAJDnRMgYAIA+S6ceHaSF71VVXxbXk0EMPrZcGZGRkCgIAQA78Oi1iF1tssZqafiQOPvjgemlAkhxnOQMAkGXtQz5IC9grrrgirjUHHHBAPTUgI0I6WdYAAGTVQWnxusgii8TffPNNzTUg++67bz01IEmOsawBAMiiZPrxXlq4Xn755XEt2muvveqtAfksMgUBACCDfhXV+PQjsfvuu9dbA5Lkt5Y3AABZ0i4qmH5cdtllca3aeeed67EB+SSkg2UOAEBWHJAWqwsttFA8YcKEmm1A+vTpU48NSJIjLHMAALIgmX4MSwvVSy+9NK5l2223Xb02IB9HpiAAAGTA/lGdTD8SW2+9db02IEkOs9wBAKimtiHvpAXqJZdcEte6n/zkJ/XcgAyPGt50DwAAVbFfWpz26NEjHj9+fM03IJtttlk9NyBJDrHsAQCohmT68XZamP7xj3+M68FGG21U7w1I8qb79pY/AACVtk9alC644ILx119/XRcNyPrrr1/vDUiSgy1/AAAqKZl+DE0L0osuuiiuF+uss44GJIrejxqefgYAABWxd1qMLrDAAnUz/UisscYaGpCGHOg2AACgEtqEvJUWohdeeGFcT1ZZZRXNR0PejUxBAACogF+kRWj37t3jcePG1VUDsuKKK2o+/j/7ux0AACinZPoxJC1AL7jggrjeLLfcchqP/0/yDpi2bgsAAMplz7T4nH/++etu+pHo2bOnxmPm7Ou2AACgHJLpx5tp4fm73/0urkeLL764pmPmJE9DMwUBAKDkdk+Lzm7dusVjx46tywZk4YUX1nR8P3u7PQAAKKXWIYPTgvO8886L61Xy2GENx/eSPBWtjdsEAIBS2TUtNuebb754zJgxdduAJP9+Dccss6fbBACAUphp+nHuuefG9WyeeebRbMw6ye+DTEEAAGixXdIic955542/+uqrum5AOnXqpNmYfXZ3uwAA0BLJ9OP1tMA8++yz43rXvn17jcbsM3j6mgEAgGb5eVpcdu3aNR49enTdNyCtW7fWaMw5u7htAABojuQv2YPSwvKss86q++Zj2rRpGowfzuuRKQgAAM2wU2T6MZNJkyZpMBqXn7t9AABoilYhr6UF5RlnnBETx998843monEZFJmCAADQBH3SYjJ57OyXX36p+wjGjRunuWh8+riNAABojGT68WpaSJ5++uk6j+mSr6FpLBqdV6evJQAAmKMd0iJy7rnnjr/44gudx3QjR47UWDQtO7idAACYk+Qv1q+kBeSpp56q6yjw6aefaiqaloGRKQgAAHOwfVo8dunSJR41apSuo8Dw4cM1FU3Pdm4rAABmJflL9b/TwvHkk0/WcRR57733NBRNz0uRKQgAALOwbVQw/Uh+78DM3nnnHQ1F8/JTtxcAAIWSv1C/lBaMJ510km5jFt566y3NRPPyr8gUBACAAtukxWLnzp1NP2Zj8ODB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";
const DISCLAIMER_TEXT = "Ulusal Coğrafi Bilgi Platformundan (UCBP) alınmıştır, bilgi amaçlıdır. Haritada yer alan coğrafi veriler ile ilgili sorumluluk, verilerin sahibi kurumlara aittir.";
const EMPTY_DATASETS_MESSAGE = "Haritada gösterilecek veri seti bulunmamaktadır.";
function buildDisclaimerBox(doc) {
  const box = doc.createElement("div");
  box.className = "print-disclaimer";
  box.textContent = DISCLAIMER_TEXT;
  return box;
}
function buildDatasetsSectionTitle(doc) {
  const title = doc.createElement("h2");
  title.className = "print-section-title";
  title.textContent = "Veri Setleri";
  return title;
}
function buildDatasetNameList(doc, names) {
  const list = doc.createElement("ul");
  list.className = "dataset-name-list";
  for (const name of names) {
    const item = doc.createElement("li");
    item.textContent = name;
    list.appendChild(item);
  }
  return list;
}
function buildEmptyDatasetsMessage(doc) {
  const message = doc.createElement("p");
  message.className = "dataset-empty";
  message.textContent = EMPTY_DATASETS_MESSAGE;
  return message;
}
function buildLegendSection(doc, entries) {
  if (entries.length === 0) return null;
  const section = doc.createElement("div");
  section.className = "legend-section";
  for (const entry of entries) section.appendChild(buildLegendEntryElement(doc, entry));
  return section;
}
function buildLegendEntryElement(doc, entry) {
  if (entry.kind === "list-columns") return buildListColumnsGrid(doc, entry);
  const wrapper = doc.createElement("div");
  wrapper.className = "legend-entry";
  wrapper.append(...buildLegendEntryHeader(doc, entry), buildLegendEntryContent(doc, entry));
  return wrapper;
}
function buildLegendEntryHeader(doc, entry) {
  if (entry.kind !== "gradient" && entry.kind !== "bin" && entry.kind !== "enum") {
    return buildEntryHeaderLines(doc, entry.layerTitle, void 0);
  }
  return buildEntryHeaderLines(doc, entry.layerTitle, entry.displayColumn);
}
function buildEntryHeaderLines(doc, layerTitle, displayColumn) {
  const title = doc.createElement("div");
  title.className = "legend-entry-title";
  title.textContent = layerTitle;
  if (displayColumn === void 0) return [title];
  const subtitle = doc.createElement("div");
  subtitle.className = "legend-entry-subtitle";
  subtitle.textContent = `Görüntüleme Değişkeni: ${displayColumn}`;
  const columnRepeat = doc.createElement("div");
  columnRepeat.className = "legend-entry-column";
  columnRepeat.textContent = displayColumn;
  return [title, subtitle, columnRepeat];
}
function buildLegendEntryContent(doc, entry) {
  switch (entry.kind) {
    case "image":
      return buildImageContent(doc, entry.imageUrl);
    case "gradient":
    case "bin":
    case "enum":
      return buildRowsContent(doc, entry.rows);
    case "empty":
      return buildEmptyContent(doc, entry.message);
  }
}
function buildListColumnsGrid(doc, entry) {
  const grid = doc.createElement("div");
  grid.className = "legend-entry legend-list-columns";
  entry.columnGroups.forEach((rows, index) => {
    const column = doc.createElement("div");
    const header = doc.createElement("div");
    header.append(...buildEntryHeaderLines(doc, entry.layerTitle, entry.displayColumn));
    if (index > 0) header.style.visibility = "hidden";
    column.append(header, buildRowsContent(doc, rows));
    grid.appendChild(column);
  });
  return grid;
}
function buildImageContent(doc, imageUrl) {
  const img = doc.createElement("img");
  img.className = "legend-image";
  img.src = imageUrl;
  img.alt = "Lejant";
  return img;
}
function buildRowsContent(doc, rows) {
  const wrapper = doc.createElement("div");
  for (const row of rows) {
    const rowEl = doc.createElement("div");
    rowEl.className = "legend-row";
    const swatch = doc.createElement("span");
    swatch.className = "legend-swatch";
    swatch.style.background = row.color;
    const value = doc.createElement("span");
    value.className = "legend-value";
    value.textContent = row.label;
    rowEl.append(swatch, value);
    wrapper.appendChild(rowEl);
  }
  return wrapper;
}
function buildEmptyContent(doc, message) {
  const span = doc.createElement("span");
  span.className = "legend-empty";
  span.textContent = message;
  return span;
}
function buildDatasetNameContinuationPage(doc, names, pageWidthMm, sectionHeightMm, pageMarginMm, includeHeader = false) {
  const page = doc.createElement("div");
  page.className = "legend-continuation-page";
  page.style.padding = `${pageMarginMm}mm`;
  page.style.width = `${pageWidthMm}mm`;
  page.style.boxSizing = "border-box";
  if (includeHeader) {
    page.appendChild(buildDatasetsSectionTitle(doc));
  }
  const list = buildDatasetNameList(doc, names);
  list.style.height = `${sectionHeightMm}mm`;
  list.style.overflow = "hidden";
  page.appendChild(list);
  return page;
}
function buildLegendContinuationPage(doc, entries, pageWidthMm, sectionHeightMm, pageMarginMm, includeHeader = false) {
  const page = doc.createElement("div");
  page.className = "legend-continuation-page";
  page.style.padding = `${pageMarginMm}mm`;
  page.style.width = `${pageWidthMm}mm`;
  page.style.boxSizing = "border-box";
  if (includeHeader) {
    page.appendChild(buildDatasetsSectionTitle(doc));
  }
  const section = buildLegendSection(doc, entries);
  if (section) {
    section.style.height = `${sectionHeightMm}mm`;
    section.style.overflow = "hidden";
    page.appendChild(section);
  }
  return page;
}
const LEGEND_ROW_HEIGHT_MM = 3.4;
const LEGEND_COLUMNS_PER_PAGE = 3;
const COMPACT_ENTRY_ROW_COST = 4;
const LIST_HEADER_ROW_COST = 7;
const LEGEND_CONTINUATION_SUFFIX = " (devam)";
const DATASET_NAME_ROW_HEIGHT_MM = 5.5;
function paginateDatasetNames(names, page1HeightMm, fullPageHeightMm) {
  const page1Capacity = Math.max(1, Math.floor(page1HeightMm / DATASET_NAME_ROW_HEIGHT_MM));
  const fullPageCapacity = Math.max(1, Math.floor(fullPageHeightMm / DATASET_NAME_ROW_HEIGHT_MM));
  const page1Names = names.slice(0, page1Capacity);
  const continuationPages = [];
  for (let index = page1Capacity; index < names.length; index += fullPageCapacity) {
    continuationPages.push(names.slice(index, index + fullPageCapacity));
  }
  return { page1Names, continuationPages };
}
function computeRowsPerColumn(availableHeightMm) {
  return Math.max(1, Math.floor(availableHeightMm / LEGEND_ROW_HEIGHT_MM));
}
function splitIntoColumns(rows, capacityPerColumn) {
  const groups = [];
  for (let index = 0; index < rows.length; index += capacityPerColumn) {
    groups.push(rows.slice(index, index + capacityPerColumn));
  }
  return groups;
}
function paginateLegendEntries(entries, page1HeightMm, fullPageHeightMm) {
  const paginator = new LegendPaginator(page1HeightMm, fullPageHeightMm);
  for (const entry of entries) {
    if (entry.kind === "bin" || entry.kind === "enum" || entry.kind === "gradient") paginator.addList(entry);
    else paginator.addCompact(entry);
  }
  return paginator.result();
}
class LegendPaginator {
  constructor(page1HeightMm, fullPageHeightMm) {
    this.pages = [[]];
    this.compactHeightMmOnCurrentPage = 0;
    this.currentPageHeightMm = page1HeightMm;
    this.fullPageHeightMm = fullPageHeightMm;
    this.rowsPerColumnForCurrentPage = computeRowsPerColumn(page1HeightMm);
    this.fullPageRowsPerColumn = computeRowsPerColumn(fullPageHeightMm);
    this.remaining = this.rowsPerColumnForCurrentPage;
  }
  addCompact(entry) {
    this.ensureRoomFor(COMPACT_ENTRY_ROW_COST);
    this.currentPage().push(entry);
    this.remaining -= COMPACT_ENTRY_ROW_COST;
    this.compactHeightMmOnCurrentPage += COMPACT_ENTRY_ROW_COST * LEGEND_ROW_HEIGHT_MM;
  }
  addList(entry) {
    let rows = entry.rows;
    let isFirstChunk = true;
    while (rows.length > 0) {
      const singleColumnCapacity = Math.max(1, this.rowsPerColumnForCurrentPage - LIST_HEADER_ROW_COST);
      if (rows.length <= singleColumnCapacity) {
        rows = this.addSingleColumnChunk(entry, isFirstChunk, rows);
      } else {
        rows = this.addMultiColumnChunk(entry, isFirstChunk, rows);
      }
      isFirstChunk = false;
    }
  }
  // Kalan satirlar TEK kolona sigacak kadar azsa -- diger kompakt girdilerle
  // AYNI sayfayi/butceyi paylasir, `.legend-section`in (FAZ 3.5'ten beri
  // HER ZAMAN tek-sutunlu) duz blok akisinda digerlerinin ALTINA eklenir.
  addSingleColumnChunk(entry, isFirstChunk, rows) {
    this.ensureRoomFor(LIST_HEADER_ROW_COST + 1);
    const capacityNow = Math.max(1, this.remaining - LIST_HEADER_ROW_COST);
    const takeCount = Math.min(rows.length, capacityNow);
    const title = isFirstChunk ? entry.layerTitle : entry.layerTitle + LEGEND_CONTINUATION_SUFFIX;
    this.currentPage().push({ ...entry, layerTitle: title, rows: rows.slice(0, takeCount) });
    this.remaining -= takeCount + LIST_HEADER_ROW_COST;
    this.compactHeightMmOnCurrentPage += (LIST_HEADER_ROW_COST + takeCount) * LEGEND_ROW_HEIGHT_MM;
    return rows.slice(takeCount);
  }
  // Kalan satirlar TEK koloni asiyorsa -- FAZ 2.4: kullanici, Faz 2.3'un
  // HER ZAMAN yeni BOS bir sayfaya gecen davranisini ISTEMEDI ("öncelikle
  // ilk sayfayi da kullanmani istiyorum, sonra ikinci sayfadan devam et").
  // Bu yuzden ONCE mevcut sayfada (varsa kompakt girdilerden) kalan GERCEK
  // mm yukseklik kullanilir; hicbir satira yetmiyorsa (capacityPerColumn<1)
  // yeni (tam) bir sayfaya gecilip OYLE hesaplanir. Tahmin BILINCLI olarak
  // MUHAFAZAKAR tutulur (`compactHeightMmOnCurrentPage` COMPACT_ENTRY_ROW_COST
  // ile AYNI comert sabiti kullanir) -- `.legend-section` sabit yukseklik+
  // overflow:hidden kullandigindan (CSS'in KENDI sayfalamasina
  // GUVENILMIYOR), yanlis-iyimser bir tahmin satirlarin SESSIZCE
  // kirpilmasina yol acardi; bu oturumun yerlesik prensibiyle tutarli
  // sekilde "satirlarin kesilmesindense fazladan devam sayfasi tercih
  // edilir".
  addMultiColumnChunk(entry, isFirstChunk, rows) {
    const availableHeightMm = this.currentPageHeightMm - this.compactHeightMmOnCurrentPage;
    let capacityPerColumn = Math.max(0, Math.floor(availableHeightMm / LEGEND_ROW_HEIGHT_MM) - LIST_HEADER_ROW_COST);
    if (capacityPerColumn < 1) {
      this.advancePage();
      capacityPerColumn = Math.max(1, this.rowsPerColumnForCurrentPage - LIST_HEADER_ROW_COST);
    }
    const takeCount = Math.min(rows.length, capacityPerColumn * LEGEND_COLUMNS_PER_PAGE);
    const columnGroups = splitIntoColumns(rows.slice(0, takeCount), capacityPerColumn);
    const title = isFirstChunk ? entry.layerTitle : entry.layerTitle + LEGEND_CONTINUATION_SUFFIX;
    this.currentPage().push({ layerTitle: title, kind: "list-columns", displayColumn: entry.displayColumn, columnGroups });
    this.advancePage();
    return rows.slice(takeCount);
  }
  result() {
    return {
      page1Entries: this.pages[0],
      continuationPages: this.pages.slice(1).filter((page) => page.length > 0)
    };
  }
  currentPage() {
    return this.pages[this.pages.length - 1];
  }
  advancePage() {
    this.pages.push([]);
    this.currentPageHeightMm = this.fullPageHeightMm;
    this.rowsPerColumnForCurrentPage = this.fullPageRowsPerColumn;
    this.remaining = this.rowsPerColumnForCurrentPage;
    this.compactHeightMmOnCurrentPage = 0;
  }
  // FAZ 2.5: A5 Yatay + Lejant Goster gibi sayfa 1'in (rezerve uyari
  // kutusu+baslik yuzunden, bkz PrintPreviewStyles.ts DATASETS_HEADER_BLOCK_MM)
  // NEREDEYSE SIFIRA yakin bir satir butcesine (ör. 2mm) dustugu durumlarda
  // bulunan hata: eski kural "sayfa BOSSA HER ZAMAN buraya zorla sigdir,
  // asla ilerleme" idi -- bu, TAM bir sayfaya rahatca sigacak (kucuk, tek
  // satirlik) bir girdiyi bile, sirf sayfa1 BOS diye, gercekte 2mm'lik
  // `.legend-section` kutusuna zorluyor, `overflow:hidden` de basligi
  // GORUNUP satirlarin KIRPILMASINA yol aciyordu (gercek kullanici
  // bildirimi: A5 Yatay + Lejant Goster'de ilk veri setinin basligi
  // gorunuyor ama altindaki renk satirlari hic gorunmuyordu). Ayrim simdi
  // ACIKCA yapiliyor: girdi TAM bir sayfaya (fullPageRowsPerColumn) sigacak
  // kadar kucukse, BOS bile olsa mevcut (kucultulmus) sayfaya ZORLANMAZ --
  // once TAM kapasiteli bir sonraki sayfaya gecilir. Girdi TAM bir sayfaya
  // bile sigmayacak kadar buyukse (needed>fullPageCapacity) eski "ilerleme
  // garantisi" davranisi KORUNUR -- aksi halde sonsuz "hep bos sayfaya gec"
  // dongusune girilirdi.
  ensureRoomFor(needed) {
    if (this.remaining >= needed) return;
    if (this.currentPage().length === 0 && needed > this.fullPageRowsPerColumn) return;
    this.advancePage();
  }
}
const LEGEND_SECTION_MARGIN_TOP_MM = 3;
const LEGEND_PAGE1_SAFETY_MARGIN_MM = 5;
function computeLegendMaxHeightMm(content) {
  return Math.max(
    0,
    content.pageHeightMm - 2 * content.pageMarginMm - content.headerHeightMm - content.footerHeightMm - content.imageHeightMm - LEGEND_SECTION_MARGIN_TOP_MM - LEGEND_PAGE1_SAFETY_MARGIN_MM
  );
}
const DATASETS_HEADER_BLOCK_MM = 34;
function computeDatasetsListMaxHeightMm(content) {
  return Math.max(0, computeLegendMaxHeightMm(content) - DATASETS_HEADER_BLOCK_MM);
}
function buildPageStyle(doc, content) {
  const style = doc.createElement("style");
  style.textContent = buildBasePageCss(content) + buildLegendCss(content);
  return style;
}
function buildBasePageCss(content) {
  return `
    @page { size: ${content.pageWidthMm}mm ${content.pageHeightMm}mm; margin: 0; }
    /* Faz 2.1: tarayicilar varsayilan olarak CSS background renklerini
       (kullanici "Arka plan grafikleri" secenegini ACIKCA isaretlemedikce)
       GERCEK yazdirma/PDF ciktisinda basmaz -- lejant renk kutucuklari
       (.legend-swatch) TAMAMEN CSS background'a dayandigindan, bu olmadan
       renkler kullanicinin yazici ayarindan BAGIMSIZ olarak hep
       kayboluyordu (olculerek bulundu: page.pdf() + pdftoppm ile PDF
       piksellerinde renk YOKTU, DOM computed-style'da ise vardi -- fark
       SADECE gercek PRINT render'inda ortaya cikiyor).  */
    html, body { margin: 0; font-family: "IBM Plex Sans", system-ui, sans-serif; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    /* FAZ 2.6: genislik ARTIK 100% (kutuya-esnek) DEGIL, sayfanin GERCEK
       fiziksel mm boyutu -- boylece belge HER ZAMAN "dogal" (gercek
       yazdirma ciktisiyla BIREBIR orantili) boyutunda render olur; harita
       (yuzdesel olcekli) ile baslik/altbilgi/lejant (sabit mm) arasindaki
       oran ARTIK onizleme kutusunun boyutundan ETKILENMEZ. Kutuya
       sigdirma islemi BURADA DEGIL, PrintPreviewOverlayController.ts'te
       TEK bir olcekleme ile (SADECE ekranda, yazdirmada sifirlanarak)
       yapilir -- bkz o dosyanin WHY yorumu.
       FAZ 2.8: ayni gerekceyle YUKSEKLIK de artik sabit fiziksel mm --
       eskiden SADECE genislik sabitti, yukseklik icerige (baslik+harita+
       altbilgi) gore DOGAL olarak buzuluyordu. Lejant ACIKKEN bu fark
       gizli kaliyordu (lejant bolumunun KENDI sabit yuksekligi kalan
       alani dolduruyordu), lejant KAPALIYKEN doldurucu olmadigindan kutu
       kisaliyor, olceklendirme haritayi kutunun NEREDEYSE TAMAMINI
       kaplayacak sekilde buyutuyordu -- kullanicinin gercek yazdirma
       ciktisinda gormesi gereken "harita ust yaride, alt yari fiziksel
       olarak BOS" gorunumunu YANSITMIYORDU (kullanicinin gonderdigi
       referans goruntuyle olculerek dogrulandi). Icerik bu yukseklikten
       daha AZ yer kapladiginda (lejant yok/kisa) fazlasi sadece BOS
       kalir; daha FAZLA yer gerektiginde (overflow kisitlanmadigindan)
       kutu GORSEL olarak tasar, _fitPageToViewport'un GERCEK olculen
       offsetHeight'i buna gore uyum saglar -- kirpma riski yok. */
    .print-page { display: flex; flex-direction: column; align-items: center; width: ${content.pageWidthMm}mm; height: ${content.pageHeightMm}mm; padding: ${content.pageMarginMm}mm; box-sizing: border-box; }
    .print-header { width: 100%; text-align: center; box-sizing: border-box; overflow: hidden; height: ${content.headerHeightMm}mm; }
    .print-header h1 { margin: 0 0 2mm 0; font-size: 18px; font-weight: 600; }
    .print-header .print-date { font-size: 12px; color: #525252; }
    .map-frame { position: relative; width: 100%; }
    .map-frame::before { content: ""; display: block; padding-top: var(--frame-aspect-pct); }
    .map-frame img { display: block; position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; }
    .north-arrow { position: absolute; width: 40px; height: 40px; }
    .north-arrow img { width: 100%; height: 100%; display: block; }
    .scale-bar { position: absolute; font-size: 12px; font-weight: 600; background: rgba(255,255,255,0.85); padding: 2px 6px; border-radius: 2px; }
    .print-footer { box-sizing: border-box; overflow: hidden; font-size: 10px; color: #525252; text-align: center; }
    .preview-toolbar { position: fixed; top: 16px; right: 16px; display: flex; gap: 8px; z-index: 1000; }
    .preview-toolbar-btn { padding: 8px 16px; border: none; border-radius: 4px; background: #0f62fe; color: #fff; font: inherit; cursor: pointer; }
    @media print { .preview-toolbar { display: none; } }
  `;
}
function buildLegendCss(content) {
  const legendMaxHeightMm = computeLegendMaxHeightMm(content);
  const legendListMaxHeightMm = computeDatasetsListMaxHeightMm(content);
  return `
    /* FAZ 3.4: haritanin altindaki TUM bolumu (uyari kutusu+baslik+icerik)
       saran DIS kutu -- 3dmap referansiyla (RecordToolPanel.tsx) BIREBIR
       ayni renk/kenarlik degerleri KORUNARAK, mm-tabanli kompakt sayfa
       baglamimiza olceklendi (piksel degerleri DEGIL, renkler/kalinliklar
       aynen alindi -- kullanicinin ACIKCA istedigi "ayni renk"). Kesin
       height+overflow:hidden BURADA da (Faz 2.1'in .legend-section icin
       kesfettigi) AYNI Chromium sayfalama guvenlik agi geregi. */
    .datasets-section { width: 100%; margin-top: ${LEGEND_SECTION_MARGIN_TOP_MM}mm; box-sizing: border-box; }
    /* FAZ 3.5: uyari kutusunu (disclaimerWrapper, bkz PrintPreviewBuilder.ts
       appendDatasetsSection) TASIYAN .datasets-section artik bu (bounded
       olmayan) TEMEL kuralla auto-yukseklikte kalir -- asagidaki
       .datasets-section-bounded SADECE gercekten TUM kalan sayfa payini
       (legendMaxHeightMm) kaplayacak sarmalayicilara (bos-durum kutusu VE
       baslik+liste kutusu) uygulanir. Eskiden HER .datasets-section bu sabit
       yuksekligi aliyordu -- uyari kutusunu TEK BASINA saran (kucuk, ~birkac
       mm'lik) div de ayni tam-sayfa-payi yuksekligini alinca, hemen
       ARDINDAN gelen "Veri Setleri" basligi bu devasa (gorunmez, bos)
       kutunun ALTINA itiliyor, harita ile baslik arasinda dev bir bosluk
       olusuyordu (kullanici bulgusu: yazdirma onizlemesinde harita ile veri
       seti listesi arasinda gereksiz bosluk). */
    .datasets-section-bounded { height: ${legendMaxHeightMm}mm; overflow: hidden; }
    .print-disclaimer { margin: 0 0 4mm; padding: 2.5mm 3mm; background: #f0fdf4; border-left: 1mm solid #10b981; color: #065f46; line-height: 1.5; font-size: 9px; border-radius: 1mm; box-sizing: border-box; }
    .print-section-title { font-size: 13px; font-weight: 700; color: #111827; margin: 0 0 4mm; padding-bottom: 1.5mm; }
    .dataset-name-list { list-style: none; margin: 0; padding: 0; font-size: 10px; }
    .dataset-name-list li { padding: 1mm 0; border-bottom: 1px solid #e5e7eb; }
    .dataset-empty { text-align: center; padding: 8mm 0; color: #9ca3af; font-size: 10px; }
    /* FAZ 2.1: max-height YERINE kesin (definite) height -- Chromium'un
       @page sayfalama motoru, sadece max-height (+ overflow:hidden)
       verilen bir kutunun DOGAL (tasan) icerigini "sayfalama SIRASINDA"
       yine de barindirmaya calisip binlerce (cogunlukla bos) ek sayfa
       uretiyordu (919 kategorili gercek veriyle olculerek bulundu: 4137
       sayfa). Kesin height verilince bu davranis TAMAMEN duzeliyor
       (ayni veriyle 4137->2 sayfa, olculerek dogrulandi) -- artik asil
       guvenlik paginateLegendEntries()'in onceden dogru satir sayisini
       hesaplamasi, bu height+overflow:hidden ise SADECE ek bir
       guvenlik agi. FAZ 3.4: height ARTIK legendMaxHeightMm (TAM sarmalayici
       payi) DEGIL, legendListMaxHeightMm (uyari kutusu+baslik DUSULMUS satir
       payi) -- bu deger SADECE 1. sayfadaki (inline style OLMAYAN) kullanima
       uygulanir, devam sayfalari (bkz buildLegendContinuationPage) kendi
       inline height'ini AYRICA yazdigindan bu class-varsayilanindan
       ETKILENMEZ. */
    /* FAZ 3.5: kullanici, farkli veri setlerinin lejantlarinin CSS
       columns: masonry akisiyla YAN YANA (ayri sutunlarda) gorunmesini
       ISTEMEDI -- "Lejant açık veya değil her zaman Verisetleri varsa
       Lejantları alt alta gösterilecek". Bu yuzden .legend-section ARTIK
       coklu-sutun baglami ACMAZ, TUM girdiler (kompakt olsun/olmasin) DUZ
       blok akisinda ALT ALTA render olur -- TEK bir veri setinin KENDI COK
       UZUN kategori listesini okunabilirlik icin ic ice (acik CSS Grid ile,
       bkz PrintLegendBuilder.ts buildListColumnsGrid/.legend-list-columns)
       kendi ICINDE bolme ozelligi bundan ETKILENMEZ/KALDIRILMADI -- o, bu
       disaridaki masonry baglamindan TAMAMEN bagimsiz kendi Grid'ini kurar. */
    .legend-section { width: 100%; margin-top: ${LEGEND_SECTION_MARGIN_TOP_MM}mm; font-size: 10px; height: ${legendListMaxHeightMm}mm; overflow: hidden; box-sizing: border-box; }
    /* FAZ 3.4: .datasets-section icinde (SADECE sayfa 1) baslik zaten
       KENDI margin-bottom'uyla bosluk birakiyor -- .legend-section'in KENDI
       margin-top'u (devam sayfalarinda hala GEREKLI, o yuzden ASAGIDAKI
       temel kuraldan KALDIRILMADI) burada FAZLADAN/CIFT bosluk yaratirdi. */
    .datasets-section .legend-section { margin-top: 0; }
    .legend-continuation-page { break-before: page; box-sizing: border-box; }
    .legend-entry { break-inside: avoid; margin-bottom: 3mm; }
    /* FAZ 2.3/3.5: bkz PrintLegendBuilder.ts buildListColumnsGrid WHY yorumu --
       acik bir CSS Grid ile kolonlari HIZALI olusturur; .legend-section
       ARTIK HICBIR ZAMAN CSS columns: baglami acmadigindan (bkz yukarisi)
       bu Grid'in column-span:all'a ihtiyaci hic olmaz. */
    .legend-list-columns { display: grid; grid-template-columns: repeat(${LEGEND_COLUMNS_PER_PAGE}, 1fr); column-gap: 6mm; }
    /* FAZ 2.3: kullanici basligin ILK 2 satiri (katman adi + "Goruntuleme
       Degiskeni") arasindaki bosluk SATIRINI kaldirmayi, bunun yerine
       lejantin HEMEN USTUNDEKI alan-adi satiriyla lejant satirlari arasina
       bir bosluk satiri eklemeyi istedi -- toplam kaplanan dikey alan AYNI
       (1mm+3mm+3mm = eskiden 3mm+3mm+1mm), sadece boslugun YERI degisti,
       bu yuzden LIST_HEADER_ROW_COST kalibrasyonu ETKILENMEZ. */
    .legend-entry-title { font-weight: 600; margin-bottom: 1mm; }
    .legend-entry-subtitle { color: #525252; margin-bottom: 3mm; }
    .legend-entry-column { font-weight: 600; margin-bottom: 3mm; }
    .legend-image { max-width: 100%; display: block; }
    .legend-row { display: flex; align-items: center; gap: 4px; }
    .legend-swatch { flex: none; width: 8px; height: 8px; border-radius: 2px; }
    .legend-value { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .legend-empty { color: #525252; }
  `;
}
const OVERLAY_INSET_PX = 12;
const CONTINUATION_PAGE_SAFETY_MARGIN_MM = 10;
function buildPrintPreviewDocument(doc, content) {
  doc.title = content.printTitle || "Yazdır";
  doc.head.appendChild(buildPageStyle(doc, content));
  const page = doc.createElement("div");
  page.className = "print-page";
  if (content.printTitle) page.appendChild(buildHeader(doc, content));
  page.appendChild(buildImageContainer(doc, content));
  doc.body.appendChild(page);
  appendDatasetsSection(doc, page, content);
  if (content.footerText) page.appendChild(buildFooter(doc, content.footerText, content.footerHeightMm));
}
function buildDatasetsSectionWrapper(doc) {
  const wrapper = doc.createElement("div");
  wrapper.className = "datasets-section datasets-section-bounded";
  wrapper.appendChild(buildDisclaimerBox(doc));
  wrapper.appendChild(buildDatasetsSectionTitle(doc));
  return wrapper;
}
function buildDatasetsSectionTitleWrapper(doc) {
  const wrapper = doc.createElement("div");
  wrapper.className = "datasets-section datasets-section-bounded";
  wrapper.appendChild(buildDatasetsSectionTitle(doc));
  return wrapper;
}
function appendDatasetsSection(doc, page, content) {
  if (content.datasetNames.length === 0) {
    const wrapper = buildDatasetsSectionWrapper(doc);
    wrapper.appendChild(buildEmptyDatasetsMessage(doc));
    page.appendChild(wrapper);
    return;
  }
  const disclaimerWrapper = doc.createElement("div");
  disclaimerWrapper.className = "datasets-section";
  disclaimerWrapper.appendChild(buildDisclaimerBox(doc));
  page.appendChild(disclaimerWrapper);
  const fullPageHeightMm = content.pageHeightMm - 2 * content.pageMarginMm - CONTINUATION_PAGE_SAFETY_MARGIN_MM;
  const legendListMaxHeightMm = computeDatasetsListMaxHeightMm(content);
  const fullPageListHeightMm = Math.max(0, fullPageHeightMm - DATASETS_HEADER_BLOCK_MM);
  if (!content.showLegend) {
    const firstTry2 = paginateDatasetNames(content.datasetNames, legendListMaxHeightMm, fullPageHeightMm);
    const page1Empty2 = firstTry2.page1Names.length === 0 && firstTry2.continuationPages.length > 0;
    const { page1Names, continuationPages: continuationPages2 } = page1Empty2 ? paginateDatasetNames(content.datasetNames, fullPageListHeightMm, fullPageHeightMm) : firstTry2;
    if (page1Empty2) {
      doc.body.appendChild(
        buildDatasetNameContinuationPage(doc, page1Names, content.pageWidthMm, fullPageListHeightMm, content.pageMarginMm, true)
      );
    } else {
      const wrapper = buildDatasetsSectionTitleWrapper(doc);
      wrapper.appendChild(buildDatasetNameList(doc, page1Names));
      page.appendChild(wrapper);
    }
    for (const chunkNames of continuationPages2) {
      doc.body.appendChild(
        buildDatasetNameContinuationPage(doc, chunkNames, content.pageWidthMm, fullPageHeightMm, content.pageMarginMm)
      );
    }
    return;
  }
  const firstTry = paginateLegendEntries(content.legendEntries, legendListMaxHeightMm, fullPageHeightMm);
  const page1Empty = firstTry.page1Entries.length === 0 && firstTry.continuationPages.length > 0;
  const { page1Entries, continuationPages } = page1Empty ? paginateLegendEntries(content.legendEntries, fullPageListHeightMm, fullPageHeightMm) : firstTry;
  if (page1Empty) {
    doc.body.appendChild(
      buildLegendContinuationPage(doc, page1Entries, content.pageWidthMm, fullPageListHeightMm, content.pageMarginMm, true)
    );
  } else {
    const wrapper = buildDatasetsSectionTitleWrapper(doc);
    const legendSection = buildLegendSection(doc, page1Entries);
    if (legendSection) wrapper.appendChild(legendSection);
    page.appendChild(wrapper);
  }
  for (const chunkEntries of continuationPages) {
    doc.body.appendChild(
      buildLegendContinuationPage(doc, chunkEntries, content.pageWidthMm, fullPageHeightMm, content.pageMarginMm)
    );
  }
}
function buildPreviewToolbar(doc, callbacks) {
  const toolbar = doc.createElement("div");
  toolbar.className = "preview-toolbar";
  const printBtn = doc.createElement("button");
  printBtn.type = "button";
  printBtn.className = "preview-toolbar-btn";
  printBtn.textContent = "Yazdır";
  printBtn.addEventListener("click", callbacks.onPrint);
  const closeBtn = doc.createElement("button");
  closeBtn.type = "button";
  closeBtn.className = "preview-toolbar-btn";
  closeBtn.textContent = "Kapat";
  closeBtn.addEventListener("click", callbacks.onClose);
  toolbar.append(printBtn, closeBtn);
  doc.body.appendChild(toolbar);
}
function buildHeader(doc, content) {
  const header = doc.createElement("div");
  header.className = "print-header";
  const title = doc.createElement("h1");
  title.textContent = content.printTitle;
  const date = doc.createElement("div");
  date.className = "print-date";
  date.textContent = formatPrintTimestamp(content.printDate);
  header.append(title, date);
  return header;
}
function formatPrintTimestamp(date) {
  return date.toLocaleString("tr-TR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
}
function computeVisibleImageOffsetPct(imageWidthMm, imageHeightMm, captureAspectRatio) {
  const frameAspectRatio = imageWidthMm / imageHeightMm;
  if (captureAspectRatio > frameAspectRatio) {
    const visibleHeightFraction = frameAspectRatio / captureAspectRatio;
    return { offsetXPct: 0, offsetYPct: (1 - visibleHeightFraction) / 2 * 100 };
  }
  const visibleWidthFraction = captureAspectRatio / frameAspectRatio;
  return { offsetXPct: (1 - visibleWidthFraction) / 2 * 100, offsetYPct: 0 };
}
function buildImageContainer(doc, content) {
  const frame = doc.createElement("div");
  frame.className = "map-frame";
  const aspectPct = content.imageHeightMm / content.imageWidthMm * 100;
  frame.style.setProperty("--frame-aspect-pct", `${aspectPct}%`);
  const img = doc.createElement("img");
  img.src = content.imageBlobUrl;
  frame.appendChild(img);
  const { offsetXPct, offsetYPct } = computeVisibleImageOffsetPct(
    content.imageWidthMm,
    content.imageHeightMm,
    content.captureAspectRatio
  );
  if (content.showNorthArrow) {
    frame.appendChild(buildNorthArrow(doc, content.northArrowRotationDeg, offsetXPct, offsetYPct));
  }
  if (content.showScaleBar && content.scaleRatioLabel) {
    frame.appendChild(buildScaleBar(doc, content.scaleRatioLabel, offsetXPct, offsetYPct));
  }
  return frame;
}
function buildNorthArrow(doc, rotationDeg, offsetXPct, offsetYPct) {
  const arrow = doc.createElement("div");
  arrow.className = "north-arrow";
  arrow.style.top = `calc(${offsetYPct}% + ${OVERLAY_INSET_PX}px)`;
  arrow.style.right = `calc(${offsetXPct}% + ${OVERLAY_INSET_PX}px)`;
  arrow.style.transform = `rotate(${rotationDeg}deg)`;
  const img = doc.createElement("img");
  img.src = NORTH_ARROW_DATA_URI;
  img.alt = "Kuzey Oku";
  arrow.appendChild(img);
  return arrow;
}
function buildScaleBar(doc, ratioLabel, offsetXPct, offsetYPct) {
  const container = doc.createElement("div");
  container.className = "scale-bar";
  container.style.left = `calc(${offsetXPct}% + ${OVERLAY_INSET_PX}px)`;
  container.style.bottom = `calc(${offsetYPct}% + ${OVERLAY_INSET_PX}px)`;
  container.textContent = ratioLabel;
  return container;
}
function buildFooter(doc, footerText, footerHeightMm) {
  const footer = doc.createElement("div");
  footer.className = "print-footer";
  footer.style.height = `${footerHeightMm}mm`;
  footer.style.paddingTop = "6mm";
  footer.textContent = footerText;
  return footer;
}
const PREVIEW_WIDTH_PX = 1450;
const PREVIEW_MAX_HEIGHT_PX = 1e3;
const PREVIEW_VIEWPORT_WIDTH_RATIO = 0.9;
const PREVIEW_VIEWPORT_HEIGHT_RATIO = 0.85;
const PREVIEW_PAGE_GAP_PX = 24;
const PREVIEW_BODY_PADDING_PX = 24;
class PrintPreviewOverlayController {
  constructor() {
    this._overlayEl = null;
    this._iframe = null;
    this._imageUrl = null;
  }
  /**
   * Onizleme dokumanini kurup gosterir. `imageBlob`'un sahipligini alir --
   * `close()` cagrilana kadar olusturulan Object URL'i kendisi yonetir/iptal
   * eder.
   */
  async show(imageBlob, content) {
    this._imageUrl = URL.createObjectURL(imageBlob);
    const iframe = this._ensureOverlay();
    this._sizeIframe(iframe);
    await new Promise((resolve) => {
      iframe.addEventListener("load", () => resolve(), { once: true });
      iframe.srcdoc = "<!doctype html><html><head></head><body></body></html>";
    });
    const doc = iframe.contentDocument;
    if (!doc) return;
    buildPrintPreviewDocument(doc, { ...content, imageBlobUrl: this._imageUrl });
    this._paginatePreview(doc, iframe);
    buildPreviewToolbar(doc, {
      onPrint: () => this._triggerNativePrint(),
      onClose: () => this.close()
    });
  }
  /** Önizleme overlay'ini kapatır/DOM'dan kaldırır ve `show()`'un oluşturduğu Object URL'i iptal eder. */
  close() {
    var _a2;
    (_a2 = this._overlayEl) == null ? void 0 : _a2.remove();
    this._overlayEl = null;
    this._iframe = null;
    if (this._imageUrl) {
      URL.revokeObjectURL(this._imageUrl);
      this._imageUrl = null;
    }
  }
  // FAZ 2.6: `.print-page` `PrintPreviewBuilder.ts`'te GERCEK fiziksel mm
  // boyutunda ("dogal boyut") render ediliyor -- bu, ekran onizleme
  // kutusundan (1024x850) COK daha buyuk (ör. A0) veya kucuk (ör. A5
  // Yatay) olabilir. Kullanici "ilk sayfanin TAMAMINI bir kerede,
  // kaydirma olmadan gorebilir miyiz" istedigi icin, dogal boyut
  // OLCULEREK (96dpi gibi bir varsayim ELLE kodlanmadan, tarayicinin
  // GERCEK hesapladigi px degeri kullanilarak) kutuya TAM sigacak tek bir
  // olcek orani hesaplanip TUM sayfalara AYNI `transform:scale()`
  // uygulanir -- KUCUK sayfalar BUYUTULUR, BUYUK sayfalar KUCULTULUR
  // (kullanicinin ACIKCA onayladigi tasarim karari).
  //
  // FAZ 2.9: eskiden SADECE 1. sayfa (`.print-page`) bu sarmalama/olcekleme
  // islemini goruyordu -- lejant devam sayfalari (`.legend-continuation-page`)
  // `doc.body`'ye DOGRUDAN, hicbir olcekleme/ortalama OLMADAN ekleniyordu.
  // Kullanici gercek 919-kategorili senaryoda ekran onizlemesinde 2.
  // sayfadan itibaren lejant kolonlarinin 1. sayfaya gore SOLA KAYDIGINI
  // bildirdi (gercek yazdirma ciktisinda sorun YOKTU, cunku orada TUM
  // olcekleme `@media print` ile sifirlaniyor -- fark SADECE ekran
  // onizlemesine ozguydu). Kok neden: 1. sayfa kendi `.print-page-viewport`
  // sarmalayicisiyla ORTALANIP olceklenirken, devam sayfalari body'nin
  // normal (sol-hizali) akisinda DOGAL (olceksiz) boyutunda kaliyordu --
  // iki FARKLI yerlesim mantigi ayni ekranda cakisiyordu. Cozum: ARTIK
  // TUM sayfalar (1. sayfa + devam sayfalari) AYNI mekanizmadan geciyor,
  // HER biri kendi `.print-page-viewport`'una sarilip AYNI tek olcekle
  // (1. sayfanin dogal boyutundan hesaplanan) merkezlenip dikey olarak
  // istifleniyor -- boylece hizalari HER ZAMAN ozdes.
  //
  // Bu istif ayrica kullanicinin 2. istegini (sayfalari "Yazdir" iletisim
  // kutusundaki gibi AYRI AYRI, sinirlari GORUNUR sekilde gostermek)
  // karsilar: `body` gri arka plana donusturulup sayfalar arasina
  // bosluk+golge eklenir (native yazdirma onizlemesinin beyaz sayfa
  // kartlari deseniyle AYNI), boylece sayfanin nerede bittigi HER ZAMAN
  // gorsel olarak nettir. 1. sayfa GENE kutuya tam sigacak sekilde
  // olceklendigi icin (Faz 2.6'nin garantisi KORUNUR) TEK BASINA hala
  // kaydirmadan tam gorunur; devam sayfalari varsa iframe'in KENDI
  // (tarayici varsayilani, `overflow` HICBIR YERDE kisitlanmadigi icin
  // otomatik devreye giren) dikey kaydirmasiyla sirayla asagida ortaya
  // cikar -- bu, native yazdirma onizlemesinin "kaydirdikca sonraki
  // sayfayi gor" davranisiyla AYNIDIR, ayrica bir PDF render kutuphanesi
  // GEREKTIRMEZ.
  //
  // `.print-page-viewport` sarmalayicisi olceklenmis FOOTPRINT'i (px
  // cinsinden SABIT genislik/yukseklik) rezerve eder -- sadece
  // `transform:scale` kullanilsaydi (sarmalayici OLMADAN) tarayici normal
  // akista HALA dogal (buyuk) boyutu ayirir, gorsel olarak kucuk gorunse
  // bile ALTINDA/YANINDA fazladan bosluk birakirdi. `@media print` altinda
  // TUM bu stiller sifirlanir -- gercek yazdirma her zaman GERCEK fiziksel
  // `@page` mm boyutunu kullanir, bu TAMAMEN ekran-onizlemesine ozgu bir
  // davranistir.
  _paginatePreview(doc, iframe) {
    const pages = Array.from(doc.querySelectorAll(".print-page, .legend-continuation-page"));
    const firstPage = pages[0];
    if (!firstPage) return;
    const naturalWidthPx = firstPage.offsetWidth;
    const naturalHeightPx = firstPage.offsetHeight;
    if (naturalWidthPx === 0 || naturalHeightPx === 0) return;
    const chromeHeightPx = 2 * PREVIEW_BODY_PADDING_PX + Math.max(0, pages.length - 1) * PREVIEW_PAGE_GAP_PX;
    const availableHeightPx = Math.max(0, iframe.clientHeight - chromeHeightPx);
    const scale = Math.min(iframe.clientWidth / naturalWidthPx, availableHeightPx / naturalHeightPx);
    for (const page of pages) {
      const viewport = doc.createElement("div");
      viewport.className = "print-page-viewport";
      page.replaceWith(viewport);
      viewport.appendChild(page);
    }
    const style = doc.createElement("style");
    style.textContent = `
      @media screen {
        html, body { background: #e0e0e0; }
        body { display: flex; flex-direction: column; align-items: center; gap: ${PREVIEW_PAGE_GAP_PX}px; padding: ${PREVIEW_BODY_PADDING_PX}px 0; box-sizing: border-box; }
        .print-page-viewport { width: ${Math.round(naturalWidthPx * scale)}px; height: ${Math.round(naturalHeightPx * scale)}px; overflow: hidden; flex: none; background: #ffffff; box-shadow: 0 2px 8px rgba(0,0,0,0.35); }
        .print-page, .legend-continuation-page { transform: scale(${scale}); transform-origin: top left; }
      }
      @media print {
        html, body { background: none; }
        body { display: block; padding: 0; }
        .print-page-viewport { width: auto; height: auto; overflow: visible; background: none; box-shadow: none; }
        .print-page, .legend-continuation-page { transform: none; }
      }
    `;
    doc.head.appendChild(style);
  }
  _triggerNativePrint() {
    var _a2, _b;
    (_b = (_a2 = this._iframe) == null ? void 0 : _a2.contentWindow) == null ? void 0 : _b.print();
  }
  _ensureOverlay() {
    if (this._iframe) return this._iframe;
    const overlay = document.createElement("div");
    overlay.style.cssText = "position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,0.6);display:flex;align-items:center;justify-content:center;padding:2rem;overflow:auto;";
    const iframe = document.createElement("iframe");
    iframe.style.cssText = "background:#fff;border:none;box-shadow:0 4px 16px rgba(0,0,0,0.3);flex:none;";
    overlay.appendChild(iframe);
    document.body.appendChild(overlay);
    this._overlayEl = overlay;
    this._iframe = iframe;
    return iframe;
  }
  // FAZ 2.5: genislik/yukseklik artik BIRBIRINDEN BAGIMSIZ (sayfanin en-boy
  // oranindan turetilmiyor) -- bkz dosya-ustu PREVIEW_WIDTH_PX WHY yorumu.
  // Gercek yazdirma cozunurlugu bundan tamamen BAGIMSIZDIR, sadece
  // EKRANDAKI onizleme kutusunun boyutudur.
  _sizeIframe(iframe) {
    const widthPx = Math.min(window.innerWidth * PREVIEW_VIEWPORT_WIDTH_RATIO, PREVIEW_WIDTH_PX);
    const heightPx = Math.min(window.innerHeight * PREVIEW_VIEWPORT_HEIGHT_RATIO, PREVIEW_MAX_HEIGHT_PX);
    iframe.style.width = `${Math.round(widthPx)}px`;
    iframe.style.height = `${Math.round(heightPx)}px`;
  }
}
function calculateScaleRatio(groundMetersPerPixel, paperMetersPerPixel) {
  const denominator = Math.round(groundMetersPerPixel / paperMetersPerPixel);
  return { label: `1/${denominator}`, denominator };
}
function getVisibleDataLayers(layers) {
  return layers.filter((layer) => !layer.isBasemap && layer.cesiumObject.show !== false);
}
function collectVisibleDatasetNames(layers) {
  return getVisibleDataLayers(layers).map((layer) => layer.title);
}
async function collectPrintLegendEntries(layerManager, layers) {
  const visible = getVisibleDataLayers(layers);
  const settled = await Promise.allSettled(visible.map((layer) => resolveLegendEntry(layerManager, layer)));
  return settled.map(
    (result, index) => result.status === "fulfilled" ? result.value : buildEmptyEntry(visible[index].title, "Lejant yüklenemedi.")
  );
}
async function resolveLegendEntry(layerManager, layer) {
  var _a2;
  if (layer.layerType === "WMS") {
    return buildImageEntry(layer.title, layerManager.getWmsLegendGraphicUrl(layer.id));
  }
  if (layer.layerType === "WMTS") {
    const styles = await layerManager.getWmtsAvailableStyles(layer.id);
    const legendUrl = (_a2 = styles[0]) == null ? void 0 : _a2.legendUrl;
    return legendUrl ? buildImageEntry(layer.title, legendUrl) : buildEmptyEntry(layer.title, "Lejant bulunamadı.");
  }
  return buildVectorEntry(layer.title, layerManager.getLayerStyle(layer.id));
}
function buildImageEntry(layerTitle, imageUrl) {
  return { layerTitle, kind: "image", imageUrl };
}
function buildEmptyEntry(layerTitle, message) {
  return { layerTitle, kind: "empty", message };
}
function buildVectorEntry(layerTitle, style) {
  if (!style) return buildEmptyEntry(layerTitle, "Henüz stil uygulanmadı.");
  switch (style.fill.mode) {
    case "gradient":
      return buildGradientEntry(
        layerTitle,
        style.fill.column,
        style.fill.palette,
        style.fill.paletteKind,
        style.fill.min,
        style.fill.max
      );
    case "bin":
      return buildBinEntry(
        layerTitle,
        style.fill.column,
        style.fill.palette,
        style.fill.paletteKind,
        style.fill.min,
        style.fill.max,
        style.fill.binCount
      );
    case "enum":
      return buildEnumEntry(layerTitle, style.fill.column, style.fill.colors);
    case "solid":
    case "off":
    default:
      return buildEmptyEntry(layerTitle, "Bu katman sabit renkli, lejant gerekmiyor.");
  }
}
function buildGradientEntry(layerTitle, displayColumn, palette, paletteKind, min, max) {
  if (min === void 0 || max === void 0) return buildEmptyEntry(layerTitle, "Aralık hesaplanamadı.");
  const rows = gradientLegendRows(min, max, (t3) => sampleFromPaletteCss(palette, t3, paletteKind));
  return { layerTitle, kind: "gradient", rows, displayColumn };
}
function buildBinEntry(layerTitle, displayColumn, palette, paletteKind, min, max, binCount) {
  if (min === void 0 || max === void 0) return buildEmptyEntry(layerTitle, "Aralık hesaplanamadı.");
  const rows = binLegendRows(min, max, binCount, (t3) => sampleFromPaletteCss(palette, t3, paletteKind));
  return { layerTitle, kind: "bin", rows, displayColumn };
}
function buildEnumEntry(layerTitle, displayColumn, colors) {
  const entries = Object.entries(colors);
  if (entries.length === 0) return buildEmptyEntry(layerTitle, "Kategori bulunamadı.");
  const sorted = [...entries].sort(([a2], [b2]) => compareCategoryKeys(a2, b2));
  return {
    layerTitle,
    kind: "enum",
    rows: sorted.map(([value, color]) => ({ color, label: value })),
    displayColumn
  };
}
const MM_PER_INCH = 25.4;
const SCREEN_DPI = 96;
const SCREEN_METERS_PER_PIXEL = MM_PER_INCH / SCREEN_DPI / 1e3;
const PAGE_MARGIN_MM = 8;
const HEADER_BLOCK_HEIGHT_MM = 14;
const FOOTER_BLOCK_HEIGHT_MM = 12;
const IMAGE_TOP_HALF_RATIO = 0.5;
async function buildPrintPreviewInput(options) {
  const { map, pageDims } = options;
  const headerHeightMm = options.printTitle ? HEADER_BLOCK_HEIGHT_MM : 0;
  const footerHeightMm = options.footerText ? FOOTER_BLOCK_HEIGHT_MM : 0;
  const contentDims = computeImageContentDimensionsMm(pageDims, headerHeightMm, footerHeightMm);
  const scaleRatioLabel = computeScaleRatioLabel(map, options.showScaleBar);
  const canvas = map.viewer.canvas;
  const captureAspectRatio = canvas.clientHeight > 0 ? canvas.clientWidth / canvas.clientHeight : 1;
  const northArrowRotationDeg = -((map.viewer.camera.heading ?? 0) * 180) / Math.PI;
  const datasetNames = collectVisibleDatasetNames(map.layerManager.getLayers());
  const legendEntries = await resolvePrintLegendEntries(map, options.showLegend);
  return {
    imageWidthMm: contentDims.contentWidthMm,
    imageHeightMm: contentDims.contentHeightMm,
    captureAspectRatio,
    printTitle: options.printTitle,
    printDate: /* @__PURE__ */ new Date(),
    footerText: options.footerText,
    showNorthArrow: options.showNorthArrow,
    northArrowRotationDeg,
    showScaleBar: options.showScaleBar,
    scaleRatioLabel,
    pageWidthMm: pageDims.widthMm,
    pageHeightMm: pageDims.heightMm,
    pageMarginMm: PAGE_MARGIN_MM,
    headerHeightMm,
    footerHeightMm,
    showLegend: options.showLegend,
    datasetNames,
    legendEntries
  };
}
async function resolvePrintLegendEntries(map, showLegend) {
  if (!showLegend) return [];
  const layerManager = map.layerManager;
  return collectPrintLegendEntries(layerManager, layerManager.getLayers());
}
function computeImageContentDimensionsMm(pageDims, headerHeightMm, footerHeightMm) {
  const availableContentHeightMm = pageDims.heightMm - 2 * PAGE_MARGIN_MM - headerHeightMm - footerHeightMm;
  const topHalfHeightLimitMm = pageDims.heightMm * IMAGE_TOP_HALF_RATIO;
  return {
    contentWidthMm: pageDims.widthMm - 2 * PAGE_MARGIN_MM,
    contentHeightMm: Math.min(availableContentHeightMm, topHalfHeightLimitMm)
  };
}
function computeScaleRatioLabel(map, showScaleBar) {
  if (!showScaleBar) return null;
  const groundMetersPerPixel = map.measureGroundMetersPerPixel();
  return groundMetersPerPixel !== null ? calculateScaleRatio(groundMetersPerPixel, SCREEN_METERS_PER_PIXEL).label : null;
}
const PAPER_SIZES_MM = {
  a0: { widthMm: 841, heightMm: 1189, label: "A0" },
  a1: { widthMm: 594, heightMm: 841, label: "A1" },
  a2: { widthMm: 420, heightMm: 594, label: "A2" },
  a3: { widthMm: 297, heightMm: 420, label: "A3" },
  a4: { widthMm: 210, heightMm: 297, label: "A4" },
  a5: { widthMm: 148, heightMm: 210, label: "A5" }
};
const ORIENTATION_LABELS = { landscape: "Yatay", portrait: "Dikey" };
function getPageDimensionsMm(paperSize, orientation) {
  const base = PAPER_SIZES_MM[paperSize];
  return orientation === "landscape" ? { widthMm: base.heightMm, heightMm: base.widthMm } : { widthMm: base.widthMm, heightMm: base.heightMm };
}
const DEFAULT_PAPER_SIZE = "a4";
const DEFAULT_PAGE_ORIENTATION = "portrait";
function parsePaperSize(value) {
  const key = String(value ?? "").trim().toLowerCase();
  return Object.hasOwn(PAPER_SIZES_MM, key) ? key : null;
}
function parsePageOrientation(value) {
  const key = String(value ?? "").trim().toLowerCase();
  return Object.hasOwn(ORIENTATION_LABELS, key) ? key : null;
}
var __defProp$g = Object.defineProperty;
var __getOwnPropDesc$h = Object.getOwnPropertyDescriptor;
var __decorateClass$h = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$h(target, key) : target;
  for (var i4 = decorators.length - 1, decorator; i4 >= 0; i4--)
    if (decorator = decorators[i4])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$g(target, key, result);
  return result;
};
let TucbsPrintPanelContent = class extends i$3 {
  constructor() {
    super(...arguments);
    this.paperSize = "a4";
    this.orientation = "portrait";
    this.showNorthArrowCheckbox = true;
    this.showScaleBarCheckbox = true;
    this.showLegendCheckbox = true;
    this.showNorthArrow = true;
    this.showScaleBar = true;
    this.showLegend = false;
    this.busy = false;
  }
  render() {
    return b`
      <button
        type="button"
        class="btn download-btn"
        ?disabled=${this.busy}
        @click=${() => {
      var _a2;
      return (_a2 = this.onDownloadClick) == null ? void 0 : _a2.call(this);
    }}
      >
        Harita İndir (JPG)
      </button>
      <div class="panel">
        <div class="row">
          <label class="field">
            Kağıt Boyutu
            <select
              @change=${(e3) => {
      var _a2;
      return (_a2 = this.onPaperSizeChange) == null ? void 0 : _a2.call(this, e3.target.value);
    }}
            >
              ${Object.entries(PAPER_SIZES_MM).map(
      ([key, config]) => b`<option value=${key} ?selected=${key === this.paperSize}>${config.label}</option>`
    )}
            </select>
          </label>
          <label class="field">
            Yön
            <select
              @change=${(e3) => {
      var _a2;
      return (_a2 = this.onOrientationChange) == null ? void 0 : _a2.call(this, e3.target.value);
    }}
            >
              ${Object.entries(ORIENTATION_LABELS).map(
      ([key, label]) => b`<option value=${key} ?selected=${key === this.orientation}>${label}</option>`
    )}
            </select>
          </label>
        </div>
        ${this.showNorthArrowCheckbox ? b`<label class="checkbox-row">
              <input
                type="checkbox"
                .checked=${this.showNorthArrow}
                @change=${(e3) => {
      var _a2;
      return (_a2 = this.onNorthArrowToggle) == null ? void 0 : _a2.call(this, e3.target.checked);
    }}
              />
              Kuzey Oku Göster
            </label>` : ""}
        ${this.showScaleBarCheckbox ? b`<label class="checkbox-row">
              <input
                type="checkbox"
                .checked=${this.showScaleBar}
                @change=${(e3) => {
      var _a2;
      return (_a2 = this.onScaleBarToggle) == null ? void 0 : _a2.call(this, e3.target.checked);
    }}
              />
              Ölçek Oranı Göster
            </label>` : ""}
        ${this.showLegendCheckbox ? b`<label class="checkbox-row">
              <input
                type="checkbox"
                .checked=${this.showLegend}
                @change=${(e3) => {
      var _a2;
      return (_a2 = this.onLegendToggle) == null ? void 0 : _a2.call(this, e3.target.checked);
    }}
              />
              Lejant Göster
            </label>` : ""}
        <button type="button" class="btn" ?disabled=${this.busy} @click=${() => {
      var _a2;
      return (_a2 = this.onPrintClick) == null ? void 0 : _a2.call(this);
    }}>
          Yazdır
        </button>
      </div>
    `;
  }
};
TucbsPrintPanelContent.styles = i$6`
    :host {
      display: block;
      font-family: "IBM Plex Sans", system-ui, sans-serif;
      font-size: 0.875rem;
      color: var(--cds-text-primary, #161616);
    }
    .panel {
      background: #fafcfd;
      border: 1px solid var(--cds-border-subtle, #e0e0e0);
      border-radius: 12px;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    .row {
      display: flex;
      gap: 0.5rem;
    }
    .field {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.375rem;
      font-weight: 600;
    }
    select {
      padding: 0.5rem;
      border: 1px solid var(--cds-border-subtle, #e0e0e0);
      border-radius: 4px;
      font: inherit;
    }
    .checkbox-row {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .download-btn {
      margin-bottom: 0.75rem;
    }
    .btn {
      width: 100%;
      padding: 0.625rem;
      border: none;
      border-radius: 4px;
      background: var(--cds-interactive, #0f62fe);
      color: #fff;
      font: inherit;
      cursor: pointer;
    }
    .btn:disabled {
      opacity: 0.6;
      cursor: default;
    }
  `;
__decorateClass$h([
  n$1({ attribute: false })
], TucbsPrintPanelContent.prototype, "paperSize", 2);
__decorateClass$h([
  n$1({ attribute: false })
], TucbsPrintPanelContent.prototype, "orientation", 2);
__decorateClass$h([
  n$1({ type: Boolean, attribute: false })
], TucbsPrintPanelContent.prototype, "showNorthArrowCheckbox", 2);
__decorateClass$h([
  n$1({ type: Boolean, attribute: false })
], TucbsPrintPanelContent.prototype, "showScaleBarCheckbox", 2);
__decorateClass$h([
  n$1({ type: Boolean, attribute: false })
], TucbsPrintPanelContent.prototype, "showLegendCheckbox", 2);
__decorateClass$h([
  n$1({ type: Boolean, attribute: false })
], TucbsPrintPanelContent.prototype, "showNorthArrow", 2);
__decorateClass$h([
  n$1({ type: Boolean, attribute: false })
], TucbsPrintPanelContent.prototype, "showScaleBar", 2);
__decorateClass$h([
  n$1({ type: Boolean, attribute: false })
], TucbsPrintPanelContent.prototype, "showLegend", 2);
__decorateClass$h([
  n$1({ type: Boolean, attribute: false })
], TucbsPrintPanelContent.prototype, "busy", 2);
__decorateClass$h([
  n$1({ attribute: false })
], TucbsPrintPanelContent.prototype, "onPaperSizeChange", 2);
__decorateClass$h([
  n$1({ attribute: false })
], TucbsPrintPanelContent.prototype, "onOrientationChange", 2);
__decorateClass$h([
  n$1({ attribute: false })
], TucbsPrintPanelContent.prototype, "onNorthArrowToggle", 2);
__decorateClass$h([
  n$1({ attribute: false })
], TucbsPrintPanelContent.prototype, "onScaleBarToggle", 2);
__decorateClass$h([
  n$1({ attribute: false })
], TucbsPrintPanelContent.prototype, "onLegendToggle", 2);
__decorateClass$h([
  n$1({ attribute: false })
], TucbsPrintPanelContent.prototype, "onDownloadClick", 2);
__decorateClass$h([
  n$1({ attribute: false })
], TucbsPrintPanelContent.prototype, "onPrintClick", 2);
TucbsPrintPanelContent = __decorateClass$h([
  t$3("tucbs-print-panel-content")
], TucbsPrintPanelContent);
var __defProp$f = Object.defineProperty;
var __getOwnPropDesc$g = Object.getOwnPropertyDescriptor;
var __decorateClass$g = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$g(target, key) : target;
  for (var i4 = decorators.length - 1, decorator; i4 >= 0; i4--)
    if (decorator = decorators[i4])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$f(target, key, result);
  return result;
};
const ICON_PRINT = o$1(iconNodeToString(_16_default$d));
let TucbsPrintTool = class extends i$3 {
  constructor() {
    super(...arguments);
    this.mapElementId = "";
    this.panelWidth = "360px";
    this.customCss = "";
    this.filename = "tucbs-harita";
    this.pageSize = DEFAULT_PAPER_SIZE;
    this.pageOrientation = DEFAULT_PAGE_ORIENTATION;
    this.footerText = "";
    this.printTitle = "Harita Görünümü";
    this.showLegendCheckbox = true;
    this.showScaleBarCheckbox = true;
    this.showNorthArrowCheckbox = true;
    this._open = false;
    this._busy = false;
    this._selectedPaperSize = DEFAULT_PAPER_SIZE;
    this._selectedOrientation = DEFAULT_PAGE_ORIENTATION;
    this._showNorthArrow = true;
    this._showScaleBar = true;
    this._showLegend = false;
    this._layoutController = new PanelLayoutController(this);
    this._previewController = new PrintPreviewOverlayController();
    this._customCssState = { sheet: null };
    this._panelEl = null;
  }
  /** Yazdirma panelini `document.body`'ye ekler ve icerigini ilk kez render eder. */
  connectedCallback() {
    super.connectedCallback();
    this._layoutController.onExclusiveClose = () => {
      if (this._open) this._toggle();
    };
    const panel = document.createElement("tucbs-slide-over-panel");
    panel.panelTitle = "Yazdır";
    panel.panelWidth = this.panelWidth;
    panel.scrollBody = false;
    panel.onCloseRequest = () => this._toggle();
    document.body.appendChild(panel);
    this._panelEl = panel;
    this._renderIntoPanel();
  }
  /** Haritadan bag cozer, panel elementini DOM'dan kaldirir ve acik onizlemeyi kapatir. */
  disconnectedCallback() {
    var _a2;
    if (this.map) this._layoutController.unbindMap(this.map);
    (_a2 = this._panelEl) == null ? void 0 : _a2.remove();
    this._panelEl = null;
    this._previewController.close();
    super.disconnectedCallback();
  }
  // === Yasam Dongusu: Map baglama (diger tool'larla ayni desen) ===
  /** `mapElementId` ile eslesen elementten `map` referansini alir (henuz `map` atanmamissa). */
  firstUpdated() {
    bindMapByElementId(this, {
      noIdTiming: "sync",
      ...standardMapBindingMessages("tucbs-print-tool", "islevsiz")
    });
  }
  /**
   * `pageSize`/`pageOrientation` değişince (ilk açılış dahil) paneldeki seçimi
   * günceller; nitelik çalışırken değişirse kullanıcının panel seçiminin yerine
   * geçer. Tanınmayan değerde varsayılan kullanılır ve uyarı yazılır.
   *
   * @param changed - Bu güncellemede değişen property'lerin eski değerleri.
   */
  willUpdate(changed) {
    if (changed.has("pageSize")) {
      const size = parsePaperSize(this.pageSize);
      if (!size) {
        console.warn(
          `[tucbs-print-tool] page-size="${String(this.pageSize)}" tanınmadı (geçerli: a0, a1, a2, a3, a4, a5); "${DEFAULT_PAPER_SIZE}" kullanılıyor.`
        );
      }
      this._selectedPaperSize = size ?? DEFAULT_PAPER_SIZE;
    }
    if (changed.has("pageOrientation")) {
      const orientation = parsePageOrientation(this.pageOrientation);
      if (!orientation) {
        console.warn(
          `[tucbs-print-tool] page-orientation="${String(this.pageOrientation)}" tanınmadı (geçerli: portrait, landscape); "${DEFAULT_PAGE_ORIENTATION}" kullanılıyor.`
        );
      }
      this._selectedOrientation = orientation ?? DEFAULT_PAGE_ORIENTATION;
    }
  }
  /** `customCss`/`map`/`panelWidth` degisimlerini isler ve panel icerigini yeniden render eder. */
  updated(changed) {
    if (changed.has("customCss")) {
      applyCustomCss(this.shadowRoot, this.customCss, this._customCssState, "tucbs-print-tool");
    }
    if (changed.has("map")) {
      const previous = changed.get("map");
      if (previous) this._layoutController.unbindMap(previous);
      if (this.map) this._layoutController.bindMap(this.map);
    }
    if (changed.has("panelWidth") && this._open) this._layoutController.setOpen(true, this.panelWidth);
    if (this._panelEl) this._panelEl.panelWidth = this.panelWidth;
    this._renderIntoPanel();
  }
  _toggle() {
    if (!this.map) return;
    this._open = !this._open;
    this._layoutController.setOpen(this._open, this.panelWidth);
    this._renderIntoPanel();
  }
  async _onDownloadClick() {
    if (this._busy || !this.map) return;
    this._busy = true;
    try {
      await this.map.exportJPEG(this.filename);
    } finally {
      this._busy = false;
    }
  }
  async _onPrintClick() {
    if (this._busy || !this.map) return;
    this._busy = true;
    try {
      await this._openPreview();
    } finally {
      this._busy = false;
    }
  }
  async _openPreview() {
    if (!this.map) return;
    const blob = await this.map.captureScreenshotBlob();
    const content = await buildPrintPreviewInput({
      map: this.map,
      pageDims: getPageDimensionsMm(this._selectedPaperSize, this._selectedOrientation),
      printTitle: this.printTitle,
      footerText: this.footerText,
      showNorthArrow: this._showNorthArrow,
      showScaleBar: this._showScaleBar,
      showLegend: this._showLegend
    });
    await this._previewController.show(blob, content);
  }
  _onPaperSizeChange(value) {
    this._selectedPaperSize = value;
  }
  _onOrientationChange(value) {
    this._selectedOrientation = value;
  }
  _onNorthArrowToggle(checked) {
    this._showNorthArrow = checked;
  }
  _onScaleBarToggle(checked) {
    this._showScaleBar = checked;
  }
  _onLegendToggle(checked) {
    this._showLegend = checked;
  }
  _renderIntoPanel() {
    if (!this._panelEl) return;
    this._panelEl.open = this._open;
    D(
      b`
        <span slot="icon">${ICON_PRINT}</span>
        <tucbs-print-panel-content
          .paperSize=${this._selectedPaperSize}
          .orientation=${this._selectedOrientation}
          .showNorthArrowCheckbox=${this.showNorthArrowCheckbox}
          .showScaleBarCheckbox=${this.showScaleBarCheckbox}
          .showLegendCheckbox=${this.showLegendCheckbox}
          .showNorthArrow=${this._showNorthArrow}
          .showScaleBar=${this._showScaleBar}
          .showLegend=${this._showLegend}
          .busy=${this._busy}
          .onPaperSizeChange=${(value) => this._onPaperSizeChange(value)}
          .onOrientationChange=${(value) => this._onOrientationChange(value)}
          .onNorthArrowToggle=${(checked) => this._onNorthArrowToggle(checked)}
          .onScaleBarToggle=${(checked) => this._onScaleBarToggle(checked)}
          .onLegendToggle=${(checked) => this._onLegendToggle(checked)}
          .onDownloadClick=${() => this._onDownloadClick()}
          .onPrintClick=${() => this._onPrintClick()}
        ></tucbs-print-panel-content>
      `,
      this._panelEl
    );
  }
  /** Toolbar butonunu render eder (tiklaninca yazdirma panelini acar/kapatir). */
  render() {
    return b`
      <button
        type="button"
        class="tool-button ${this._open ? "active" : ""}"
        aria-label="Yazdır"
        data-tooltip="Yazdır"
        aria-pressed=${this._open}
        @click=${this._toggle}
      >
        ${ICON_PRINT}
      </button>
    `;
  }
};
TucbsPrintTool.styles = [
  leftTooltipStyles,
  i$6`
    :host {
      display: inline-flex;
      font-family: "IBM Plex Sans", system-ui, sans-serif;
      font-size: 0.875rem;
      color: var(--cds-text-primary, #161616);
      --cds-focus: transparent;
    }
    .tool-button {
      width: 2.25rem;
      height: 2.25rem;
      border-radius: 50%;
      border: 1px solid var(--cds-border-subtle, #e0e0e0);
      background: var(--cds-layer-01, #ffffff);
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      cursor: pointer;
      color: var(--cds-text-primary, #161616);
    }
    .tool-button:hover {
      background: var(--cds-layer-hover-01, #e8e8e8);
    }
    .tool-button.active {
      background: var(--cds-background-selected, #e0e0e0);
      border-color: var(--cds-border-strong-01, #8d8d8d);
    }
    .tool-button svg {
      width: 1rem;
      height: 1rem;
    }
  `
];
__decorateClass$g([
  n$1()
], TucbsPrintTool.prototype, "mapElementId", 2);
__decorateClass$g([
  n$1({ attribute: "panel-width" })
], TucbsPrintTool.prototype, "panelWidth", 2);
__decorateClass$g([
  n$1({ attribute: "custom-css" })
], TucbsPrintTool.prototype, "customCss", 2);
__decorateClass$g([
  n$1()
], TucbsPrintTool.prototype, "filename", 2);
__decorateClass$g([
  n$1({ attribute: "page-size" })
], TucbsPrintTool.prototype, "pageSize", 2);
__decorateClass$g([
  n$1({ attribute: "page-orientation" })
], TucbsPrintTool.prototype, "pageOrientation", 2);
__decorateClass$g([
  n$1({ attribute: "footer-text" })
], TucbsPrintTool.prototype, "footerText", 2);
__decorateClass$g([
  n$1({ attribute: "print-title" })
], TucbsPrintTool.prototype, "printTitle", 2);
__decorateClass$g([
  n$1({ attribute: "show-legend-checkbox", converter: defaultTrueAttribute })
], TucbsPrintTool.prototype, "showLegendCheckbox", 2);
__decorateClass$g([
  n$1({ attribute: "show-scale-bar-checkbox", converter: defaultTrueAttribute })
], TucbsPrintTool.prototype, "showScaleBarCheckbox", 2);
__decorateClass$g([
  n$1({ attribute: "show-north-arrow-checkbox", converter: defaultTrueAttribute })
], TucbsPrintTool.prototype, "showNorthArrowCheckbox", 2);
__decorateClass$g([
  n$1({ attribute: false })
], TucbsPrintTool.prototype, "map", 2);
__decorateClass$g([
  r()
], TucbsPrintTool.prototype, "_open", 2);
__decorateClass$g([
  r()
], TucbsPrintTool.prototype, "_busy", 2);
__decorateClass$g([
  r()
], TucbsPrintTool.prototype, "_selectedPaperSize", 2);
__decorateClass$g([
  r()
], TucbsPrintTool.prototype, "_selectedOrientation", 2);
__decorateClass$g([
  r()
], TucbsPrintTool.prototype, "_showNorthArrow", 2);
__decorateClass$g([
  r()
], TucbsPrintTool.prototype, "_showScaleBar", 2);
__decorateClass$g([
  r()
], TucbsPrintTool.prototype, "_showLegend", 2);
TucbsPrintTool = __decorateClass$g([
  t$3("tucbs-print-tool")
], TucbsPrintTool);
const COGRAFI_HELP = {
  sinir: {
    ne: ["Seçilen geometrinin sınırını üretir: sınırlayıcı kutu veya dışbükey zarf."],
    girdiler: [
      "Zorunlu: haritadan bir nesne (nokta / çizgi / poligon)",
      "Sınır tipi: Sınırlayıcı Kutu veya Dışbükey Zarf",
      "Çıktı geometrisi: poligon veya çizgi"
    ],
    adimlar: [
      "Analiz listesinden Sınır’ı açın",
      "Haritada nesneyi seçin",
      "Sınır tipini ve çıktı geometrisini ayarlayın",
      "Çalıştır’a basın; sonuç yeni katman olur"
    ],
    ornek: [
      "Yol veya park katmanını ekleyin",
      "Nesneyi seçin; sınır tipi ve çıktıyı ayarlayın",
      "Çalıştırın ve yeni sınır katmanını kontrol edin"
    ]
  },
  tampon: {
    ne: ["Seçilen geometrinin etrafında verilen mesafede (metre) tampon poligonu oluşturur."],
    girdiler: [
      "Zorunlu: haritadan bir nesne (nokta / çizgi / poligon)",
      "Zorunlu: mesafe (metre), 0’dan büyük"
    ],
    adimlar: [
      "Analiz listesinden Tampon’u açın",
      "Haritada nesneyi seçin",
      "Mesafeyi metre cinsinden girin",
      "Çalıştır’a basın; tampon yeni katman olur"
    ],
    ornek: ["Nokta, çizgi veya alan ekleyin", "Nesneyi seçin; mesafe girin (örn. 300)", "Çalıştırın"]
  },
  kirp: {
    ne: ["Kaynak nesnenin, çizilen dikdörtgen içinde kalan kısmını tutar."],
    girdiler: ["Zorunlu: kırpılacak nesne", "Zorunlu: haritada çizilen dikdörtgen alan"],
    adimlar: [
      "Analiz listesinden Kırp’ı açın",
      "Kaynak nesneyi seçin",
      "Alan çiz ile dikdörtgeni belirleyin",
      "Çalıştır’a basın"
    ],
    ornek: ["Kaynağı seçin", "Parkın bir kısmını kapsayan dikdörtgen çizin", "Yalnızca içerde kalan parçayı kontrol edin"]
  },
  fark: {
    ne: ["İlk poligondan ikinci poligonla örtüşen kısmı çıkarır."],
    girdiler: ["Zorunlu: ilk poligon (kaynak)", "Zorunlu: ikinci poligon (çıkarılacak)"],
    adimlar: [
      "Analiz listesinden Fark’ı açın",
      "İki poligon yuvalarını doldurun",
      "Çalıştır’a basın; örtüşmeyen kısım sonuç olur"
    ],
    ornek: ["İlk = kaynak poligon, ikinci = çıkarılacak poligon", "Çalıştırın", "Örtüşen dilimin eksildiğini kontrol edin"]
  },
  kesisim: {
    ne: ["İki poligonun ortak (kesişen) alanını üretir."],
    girdiler: ["Zorunlu: birinci poligon", "Zorunlu: ikinci poligon", "Örtüşme yoksa sonuç boş kalabilir"],
    adimlar: [
      "Analiz listesinden Kesişim’i açın",
      "İki poligon yuvalarını doldurun",
      "Çalıştır’a basın; ortak alan yeni katman olur"
    ],
    ornek: ["İki örtüşen poligon seçin", "Çalıştırın", "Yalnızca ortak bölgenin kaldığını kontrol edin"]
  },
  cikarma: {
    ne: ["Bir poligondan, diğeriyle örtüşen kısımları kaldırır."],
    girdiler: ["Zorunlu: kaynak poligon", "Zorunlu: örtüşen poligon"],
    adimlar: [
      "Analiz listesinden Çıkarma’yı açın",
      "Kaynak ve örtüşen poligonu seçin",
      "Çalıştır’a basın"
    ],
    ornek: ["Kaynak ve örtüşen poligonu seçin", "Çalıştırın", "Örtüşen bölgenin kaynaktan çıktığını kontrol edin"]
  },
  birlestir: {
    ne: ["İki poligonu tek birleşik alana eritir."],
    girdiler: ["Zorunlu: birinci poligon", "Zorunlu: ikinci poligon"],
    adimlar: [
      "Analiz listesinden Birleştir’i açın",
      "İki poligon yuvalarını doldurun",
      "Çalıştır’a basın; birleşik alan yeni katman olur"
    ],
    ornek: ["İki poligon seçin", "Çalıştırın", "Tek birleşik sınırın oluştuğunu kontrol edin"]
  },
  kama: {
    ne: ["Nokta etrafında mesafe ve açı aralığıyla dilim (kama) tamponu üretir."],
    girdiler: [
      "Zorunlu: nokta",
      "Zorunlu: mesafe (metre) > 0",
      "Zorunlu: başlangıç açısı bitiş açısından küçük (0° = kuzey)"
    ],
    adimlar: [
      "Analiz listesinden Kama Tampon’u açın",
      "Haritada bir nokta seçin",
      "Mesafe ile açıları girin",
      "Çalıştır’a basın"
    ],
    ornek: ["Bir nokta seçin", "Örn. 200 m, 0°–90°", "Noktadan yayılan dilimi kontrol edin"]
  }
};
const analysisHelpStyles = i$6`
  .title-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 16px;
  }

  .title-row .title {
    margin: 0 0 6px;
  }

  button.help {
    width: 1.75rem;
    height: 1.75rem;
    border-radius: 8px;
    border: 1px solid #d1d5db;
    background: #f9fafb;
    font-weight: 700;
    cursor: pointer;
    color: #1d4ed8;
  }

  .help-back {
    position: fixed;
    inset: 0;
    z-index: 30;
    background: rgba(15, 23, 42, 0.45);
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 12vh 16px 16px;
  }

  .help-card {
    width: min(520px, 100%);
    max-height: min(70vh, 640px);
    overflow: auto;
    background: #fff;
    border-radius: 10px;
    padding: 14px 16px 16px;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.18);
    color: #111827;
  }

  .help-card h3 {
    margin: 0 0 8px;
    font-size: 16px;
  }

  .help-card h4 {
    margin: 12px 0 4px;
    font-size: 13px;
  }

  .help-card p,
  .help-card li {
    margin: 0 0 6px;
    font-size: 13px;
    line-height: 1.45;
  }

  .help-card ul,
  .help-card ol {
    margin: 0;
    padding-left: 1.2rem;
  }

  .help-close {
    float: right;
    border: none;
    background: transparent;
    font-size: 18px;
    cursor: pointer;
    color: #6b7280;
  }
`;
function renderAnalysisHelp(open, title, help, onClose) {
  if (!open) return null;
  const stop = (e3) => e3.stopPropagation();
  return b`
    <div class="help-back" @click=${onClose}>
      <div class="help-card" @click=${stop}>
        <button type="button" class="help-close" aria-label="Kapat" @click=${onClose}>×</button>
        <h3>${title}</h3>
        <h4>Ne işe yarar</h4>
        ${help.ne.map((satir) => b`<p>${satir}</p>`)}
        <h4>Girdiler</h4>
        <ul>${help.girdiler.map((satir) => b`<li>${satir}</li>`)}</ul>
        <h4>Adımlar</h4>
        <ol>${help.adimlar.map((satir) => b`<li>${satir}</li>`)}</ol>
        <h4>Örnek</h4>
        <ol>${help.ornek.map((satir) => b`<li>${satir}</li>`)}</ol>
      </div>
    </div>
  `;
}
var __defProp$e = Object.defineProperty;
var __getOwnPropDesc$f = Object.getOwnPropertyDescriptor;
var __decorateClass$f = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$f(target, key) : target;
  for (var i4 = decorators.length - 1, decorator; i4 >= 0; i4--)
    if (decorator = decorators[i4])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$e(target, key, result);
  return result;
};
let TucbsBufferTool = class extends i$3 {
  constructor() {
    super(...arguments);
    this.mapElementId = "";
    this.map = null;
    this.selectedLabel = "";
    this.distanceM = null;
    this.customCss = "";
    this._distanceStr = "";
    this._status = "idle";
    this._message = "";
    this._helpOpen = false;
    this._selectedFeature = null;
    this._map = null;
    this._mapHost = null;
    this._customCssState = { sheet: null };
    this._onEntityClick = (detail) => {
      const feature = entityToGeoJSON(detail.entity);
      if (!feature) {
        this._note("error", "Seçilen özellikten GeoJSON üretilemedi.");
        return;
      }
      this._selectedFeature = {
        type: "Feature",
        id: feature.id,
        properties: feature.properties ?? {},
        geometry: feature.geometry
      };
      this.selectedLabel = featureLabel(feature);
      this._status = "idle";
      this._message = "";
      this._syncHighlight();
    };
    this._onMapReady = () => {
      this._bindMap();
    };
  }
  /** Lit yaşam döngüsü — bileşen DOM'a bağlandığında başlangıç mesafe metnini ayarlar ve haritaya bağlanmayı dener. */
  connectedCallback() {
    super.connectedCallback();
    if (this.distanceM != null && this.distanceM > 0) {
      this._distanceStr = String(this.distanceM);
    }
    this._bindMap();
  }
  /** Lit yaşam döngüsü — bileşen DOM'dan kaldırılırken harita bağlantısını (interaction/event) çözer. */
  disconnectedCallback() {
    this._unbindMap();
    super.disconnectedCallback();
  }
  /**
   * Lit yaşam döngüsü — `customCss`, `distanceM`, `mapElementId`/`map` değişikliklerinde ilgili yan etkileri uygular.
   *
   * @param changed Değişen property adları ve önceki değerleri.
   */
  updated(changed) {
    if (changed.has("customCss")) {
      applyCustomCss(
        this.shadowRoot,
        this.customCss,
        this._customCssState,
        "tucbs-buffer-tool"
      );
    }
    if (changed.has("distanceM") && this.distanceM != null) {
      this._distanceStr = String(this.distanceM);
    }
    if (changed.has("mapElementId") || changed.has("map")) {
      this._unbindMap();
      this._bindMap();
    }
  }
  _resolveMap() {
    var _a2;
    if (this.map) return this.map;
    return ((_a2 = this._resolveMapHost()) == null ? void 0 : _a2.map) ?? null;
  }
  _resolveMapHost() {
    if (!this.mapElementId) return null;
    return document.getElementById(this.mapElementId);
  }
  _bindMap() {
    if (this.map) {
      this._attachInteraction(this.map);
      return;
    }
    const host = this._resolveMapHost();
    if (!host) return;
    this._mapHost = host;
    if (host.map) {
      this._attachInteraction(host.map);
      return;
    }
    host.addEventListener("ready", this._onMapReady, { once: true });
  }
  _attachInteraction(map) {
    if (this._map === map) return;
    if (this._map) {
      this._map.interactionManager.off("entity:click", this._onEntityClick);
      this._map.interactionManager.resumeIdentify();
    }
    this._map = map;
    map.interactionManager.on("entity:click", this._onEntityClick);
    map.interactionManager.suspendIdentify();
  }
  _unbindMap() {
    if (this._map) {
      this._map.interactionManager.off("entity:click", this._onEntityClick);
      this._map.clearSelectionHighlight();
      this._map.interactionManager.resumeIdentify();
      this._map = null;
    }
    if (this._mapHost) {
      this._mapHost.removeEventListener("ready", this._onMapReady);
      this._mapHost = null;
    }
  }
  _onDistanceInput(e3) {
    const raw = e3.target.value;
    this._distanceStr = raw;
    const n3 = Number(raw);
    this.distanceM = Number.isFinite(n3) ? n3 : null;
  }
  _onReselect() {
    this.selectedLabel = "";
    this._selectedFeature = null;
    this._note("info", "Haritada bir noktaya / çizgiye / alana tıklayın.");
    this._syncHighlight();
  }
  /** Sonuçtan sonra seçim ve mesafe ilk haline döner; kırmızı vurgu kalkar. */
  _clearForm() {
    this._selectedFeature = null;
    this.selectedLabel = "";
    this._distanceStr = "";
    this.distanceM = null;
    this._syncHighlight();
  }
  _syncHighlight() {
    var _a2;
    (_a2 = this._map) == null ? void 0 : _a2.showSelectionHighlight(this._selectedFeature ? [this._selectedFeature] : []);
  }
  _onSelectionClick() {
    if (this._selectedFeature) {
      this._note("info", `Seçili: ${this.selectedLabel}`);
    } else {
      this._note("info", "Haritada bir noktaya, çizgiye veya alana tıklayın.");
    }
  }
  async _onRun() {
    if (this._status === "loading") return;
    const dist = Number(this._distanceStr);
    if (!this._selectedFeature) {
      this._note("error", "Lütfen haritada bir nesne seçin.");
      return;
    }
    if (!this._distanceStr || Number.isNaN(dist) || dist <= 0) {
      this._note("error", "Geçerli bir mesafe (metre) girin.");
      return;
    }
    if (!this._map) {
      this._bindMap();
    }
    const map = this._resolveMap();
    if (!map) {
      this._note("error", "Harita henüz hazır değil.");
      return;
    }
    this._map = map;
    this.distanceM = dist;
    this._status = "loading";
    this._message = "İşleniyor…";
    this.dispatchEvent(
      new CustomEvent("tucbs-buffer-run", {
        detail: {
          mapElementId: this.mapElementId,
          distanceM: dist,
          selectedLabel: this.selectedLabel
        },
        bubbles: true,
        composed: true
      })
    );
    try {
      const title = `Tampon sonucu (${dist}m)`;
      await map.runBuffer(
        {
          geojson: this._selectedFeature,
          distanceM: dist
        },
        { title }
      );
      this._clearForm();
      this._status = "idle";
      this._message = "";
      showToast("success", "Tampon katmanı eklendi.");
    } catch (err) {
      if (err instanceof TucbsError) {
        console.error(`[tucbs-buffer-tool] ${err.code} (${err.number}): ${err.message}`);
      }
      this._note("error", err instanceof Error ? err.message : "Tampon üretimi başarısız.");
    }
  }
  /** Sonuç, hata ve seçim uyarısını formun altında bırakmadan toast olarak gösterir. */
  _note(kind, message) {
    this._status = "idle";
    this._message = "";
    showToast(kind, message);
  }
  /** Tampon formunu (seçim, mesafe, çalıştır butonu) render eder. */
  render() {
    const busy = this._status === "loading";
    const canRun = Boolean(this._selectedFeature && this._distanceStr) && !busy;
    return b`
      <div class="panel">
        <div class="title-row">
          <h3 class="title">Tampon</h3>
          <button type="button" class="help" aria-label="Yardım" title="Yardım" @click=${() => {
      this._helpOpen = true;
    }}>?</button>
        </div>
        ${renderAnalysisHelp(this._helpOpen, "Tampon", COGRAFI_HELP.tampon, () => {
      this._helpOpen = false;
    })}

        <div class="row-between">
          <label class="lbl">Etrafında tampon oluştur...</label>
        </div>

        <div class="input-wrap">
          <input
            type="text"
            readonly
            placeholder="Haritada nesne seçin"
            .value=${this.selectedLabel ? `= ${this.selectedLabel}` : ""}
            @click=${this._onSelectionClick}
          />
          <button
            type="button"
            class="refresh"
            title="Yeniden seç"
            ?disabled=${busy}
            @click=${this._onReselect}
          >
            ⟳
          </button>
        </div>

        <label class="lbl">Mesafe</label>
        <div class="distance-row">
          <input
            type="number"
            min="0"
            step="any"
            placeholder="Mesafe girin"
            .value=${this._distanceStr}
            ?disabled=${busy}
            @input=${this._onDistanceInput}
          />
          <span class="unit">m</span>
        </div>

        <div class="actions">
          <button class="run" type="button" ?disabled=${!canRun} @click=${this._onRun}>
            ${busy ? "İşleniyor..." : "Çalıştır"}
          </button>
        </div>

        ${this._message ? b`<p class="status ${this._status}">${this._message}</p>` : null}
      </div>
    `;
  }
};
TucbsBufferTool.styles = [i$6`
    :host {
      display: block;
      box-sizing: border-box;
      font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
      color: #111827;
    }

    .panel {
      padding: 0;
    }

    .title {
      margin: 0 0 6px;
      font-size: 16px;
      font-weight: 600;
    }

    .info {
      margin: 0 0 12px;
      padding: 8px 10px;
      font-size: 12.5px;
      line-height: 1.4;
      color: #374151;
      background: #f3f4f6;
      border-radius: 8px;
    }

    .row-between {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 4px;
    }

    label.lbl {
      display: block;
      font-weight: 600;
      font-size: 12.5px;
      margin-bottom: 4px;
    }

    .input-wrap {
      position: relative;
      margin-bottom: 12px;
    }

    input[type="text"],
    input[type="number"] {
      box-sizing: border-box;
      width: 100%;
      padding: 10px 34px 10px 10px;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      background: #f9fafb;
      font-size: 13px;
      outline: none;
      color: inherit;
    }

    input[type="number"] {
      padding-right: 10px;
    }

    .distance-row {
      display: flex;
      align-items: center;
      margin-bottom: 12px;
    }

    .distance-row input {
      margin-bottom: 0;
    }

    .unit {
      margin-left: 8px;
      font-size: 13px;
      color: #374151;
    }

    .refresh {
      position: absolute;
      right: 8px;
      top: 50%;
      transform: translateY(-50%);
      border: none;
      background: transparent;
      cursor: pointer;
      font-size: 16px;
      color: #9ca3af;
      line-height: 1;
    }

    .actions {
      display: flex;
      justify-content: flex-end;
      margin-top: 4px;
    }

    button.run {
      background: #2563eb;
      color: #fff;
      border: none;
      padding: 8px 14px;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 600;
      font-size: 13px;
    }

    button.run:disabled {
      background: #e5e7eb;
      color: #9ca3af;
      cursor: not-allowed;
    }

    .status {
      margin: 8px 0 0;
      font-size: 12.5px;
    }

    .status.error {
      color: #da1e28;
    }

    .status.success {
      color: #198038;
    }

    .status.loading {
      color: #525252;
    }
  `, analysisHelpStyles];
__decorateClass$f([
  n$1()
], TucbsBufferTool.prototype, "mapElementId", 2);
__decorateClass$f([
  n$1({ attribute: false })
], TucbsBufferTool.prototype, "map", 2);
__decorateClass$f([
  n$1()
], TucbsBufferTool.prototype, "selectedLabel", 2);
__decorateClass$f([
  n$1({ type: Number })
], TucbsBufferTool.prototype, "distanceM", 2);
__decorateClass$f([
  n$1({ attribute: "custom-css" })
], TucbsBufferTool.prototype, "customCss", 2);
__decorateClass$f([
  r()
], TucbsBufferTool.prototype, "_distanceStr", 2);
__decorateClass$f([
  r()
], TucbsBufferTool.prototype, "_status", 2);
__decorateClass$f([
  r()
], TucbsBufferTool.prototype, "_message", 2);
__decorateClass$f([
  r()
], TucbsBufferTool.prototype, "_helpOpen", 2);
TucbsBufferTool = __decorateClass$f([
  t$3("tucbs-buffer-tool")
], TucbsBufferTool);
var __defProp$d = Object.defineProperty;
var __getOwnPropDesc$e = Object.getOwnPropertyDescriptor;
var __decorateClass$e = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$e(target, key) : target;
  for (var i4 = decorators.length - 1, decorator; i4 >= 0; i4--)
    if (decorator = decorators[i4])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$d(target, key, result);
  return result;
};
function isPolygonFeature$1(feature) {
  var _a2;
  const t3 = (_a2 = feature == null ? void 0 : feature.geometry) == null ? void 0 : _a2.type;
  return t3 === "Polygon" || t3 === "MultiPolygon";
}
let TucbsIntersectionTool = class extends i$3 {
  constructor() {
    super(...arguments);
    this.mapElementId = "";
    this.map = null;
    this.customCss = "";
    this._labelA = "";
    this._labelB = "";
    this._status = "idle";
    this._message = "";
    this._helpOpen = false;
    this._featureA = null;
    this._featureB = null;
    this._pendingSlot = null;
    this._map = null;
    this._mapHost = null;
    this._customCssState = { sheet: null };
    this._onEntityClick = (detail) => {
      var _a2;
      if (!this._pendingSlot) return;
      const feature = entityToGeoJSON(detail.entity);
      if (!feature) {
        this._note("error", "Seçilen özellikten GeoJSON üretilemedi.");
        return;
      }
      const selected = {
        type: "Feature",
        id: feature.id,
        properties: feature.properties ?? {},
        geometry: feature.geometry
      };
      const gtype = (_a2 = selected.geometry) == null ? void 0 : _a2.type;
      if (gtype !== "Polygon" && gtype !== "MultiPolygon") {
        this._note("error", "Kesişim için yalnızca poligon seçin.");
        return;
      }
      const label = featureLabel(feature);
      if (this._pendingSlot === "a") {
        this._featureA = selected;
        this._labelA = label;
      } else {
        this._featureB = selected;
        this._labelB = label;
      }
      this._pendingSlot = null;
      this._status = "idle";
      this._message = "";
      this._syncHighlight();
    };
    this._onMapReady = () => {
      this._bindMap();
    };
  }
  /** Bileşen DOM'a bağlandığında haritaya bağlanır. */
  connectedCallback() {
    super.connectedCallback();
    this._bindMap();
  }
  /** Bileşen DOM'dan kaldırıldığında harita bağlantısını ve identify baskılamasını kaldırır. */
  disconnectedCallback() {
    this._unbindMap();
    super.disconnectedCallback();
  }
  /**
   * `customCss` değiştiğinde stil uygular; `mapElementId` veya `map` değiştiğinde
   * harita bağlantısını yeniden kurar.
   */
  updated(changed) {
    if (changed.has("customCss")) {
      applyCustomCss(
        this.shadowRoot,
        this.customCss,
        this._customCssState,
        "tucbs-intersection-tool"
      );
    }
    if (changed.has("mapElementId") || changed.has("map")) {
      this._unbindMap();
      this._bindMap();
    }
  }
  _resolveMap() {
    var _a2;
    if (this.map) return this.map;
    return ((_a2 = this._resolveMapHost()) == null ? void 0 : _a2.map) ?? null;
  }
  _resolveMapHost() {
    if (!this.mapElementId) return null;
    return document.getElementById(this.mapElementId);
  }
  _bindMap() {
    if (this.map) {
      this._attachInteraction(this.map);
      return;
    }
    const host = this._resolveMapHost();
    if (!host) return;
    this._mapHost = host;
    if (host.map) {
      this._attachInteraction(host.map);
      return;
    }
    host.addEventListener("ready", this._onMapReady, { once: true });
  }
  _attachInteraction(map) {
    if (this._map === map) return;
    if (this._map) {
      this._map.interactionManager.off("entity:click", this._onEntityClick);
      this._map.interactionManager.resumeIdentify();
    }
    this._map = map;
    map.interactionManager.on("entity:click", this._onEntityClick);
    map.interactionManager.suspendIdentify();
  }
  _unbindMap() {
    if (this._map) {
      this._map.interactionManager.off("entity:click", this._onEntityClick);
      this._map.clearSelectionHighlight();
      this._map.interactionManager.resumeIdentify();
      this._map = null;
    }
    if (this._mapHost) {
      this._mapHost.removeEventListener("ready", this._onMapReady);
      this._mapHost = null;
    }
  }
  /** Form altındaki satır yerine toast basar. */
  _note(kind, message) {
    this._status = "idle";
    this._message = "";
    showToast(kind, message);
  }
  _beginSelection(slot) {
    this._pendingSlot = slot;
    this._status = "idle";
    this._note(
      "info",
      slot === "a" ? "Lütfen ilk poligonu seçin — haritada bir alana tıklayın." : "Lütfen ikinci poligonu seçin — haritada bir alana tıklayın."
    );
  }
  _onInputClick(slot) {
    this._beginSelection(slot);
  }
  _onRefreshSlot(slot) {
    if (slot === "a") {
      this._featureA = null;
      this._labelA = "";
    } else {
      this._featureB = null;
      this._labelB = "";
    }
    this._beginSelection(slot);
    this._syncHighlight();
  }
  /** Sonuçtan sonra iki seçim ve kırmızı vurgu kalkar. */
  _clearForm() {
    this._featureA = null;
    this._featureB = null;
    this._labelA = "";
    this._labelB = "";
    this._pendingSlot = null;
    this._syncHighlight();
  }
  _syncHighlight() {
    var _a2;
    const features = [this._featureA, this._featureB].filter((feature) => feature !== null);
    (_a2 = this._map) == null ? void 0 : _a2.showSelectionHighlight(features);
  }
  _onSwitchToDatasets() {
    this._note("info", "Veri kümesi seçimi bu sürümde henüz desteklenmiyor.");
  }
  async _onRun() {
    if (this._status === "loading") return;
    if (!isPolygonFeature$1(this._featureA) || !isPolygonFeature$1(this._featureB)) {
      this._note("error", "Her iki seçim de poligon olmalıdır.");
      return;
    }
    if (!this._map) {
      this._bindMap();
    }
    const map = this._resolveMap();
    if (!map) {
      this._note("error", "Harita henüz hazır değil.");
      return;
    }
    this._map = map;
    this._status = "loading";
    this._message = "İşleniyor…";
    this._pendingSlot = null;
    this.dispatchEvent(
      new CustomEvent("tucbs-intersection-run", {
        detail: {
          mapElementId: this.mapElementId,
          labelA: this._labelA,
          labelB: this._labelB
        },
        bubbles: true,
        composed: true
      })
    );
    try {
      await map.runIntersection(
        {
          geojsonA: this._featureA,
          geojsonB: this._featureB
        },
        { title: "Kesişim sonucu" }
      );
      this._clearForm();
      this._status = "idle";
      this._message = "";
      showToast("success", "Kesişim tamamlandı.");
    } catch (err) {
      if (err instanceof TucbsError) {
        console.error(`[tucbs-intersection-tool] ${err.code} (${err.number}): ${err.message}`);
      }
      this._note("error", err instanceof Error ? err.message : "Kesişim hesaplanamadı.");
    }
  }
  /** Bileşenin şablonunu render eder. */
  render() {
    const busy = this._status === "loading";
    const canRun = isPolygonFeature$1(this._featureA) && isPolygonFeature$1(this._featureB) && !busy;
    return b`
      <div class="panel">
        <div class="title-row">
          <h3 class="title">Kesişim</h3>
          <button type="button" class="help" aria-label="Yardım" title="Yardım" @click=${() => {
      this._helpOpen = true;
    }}>?</button>
        </div>
        ${renderAnalysisHelp(this._helpOpen, "Kesişim", COGRAFI_HELP.kesisim, () => {
      this._helpOpen = false;
    })}

        <div class="row-between">
          <label class="lbl">Arasındaki kesişme...</label>
          <button
            type="button"
            class="switch"
            ?disabled=${busy}
            @click=${this._onSwitchToDatasets}
          >
            Veri kümelerine geç
          </button>
        </div>

        <div class="input-wrap">
          <input
            type="text"
            readonly
            placeholder="Poligon seç"
            .value=${this._labelA ? `= ${this._labelA}` : ""}
            ?disabled=${busy}
            @click=${() => this._onInputClick("a")}
          />
          <button
            type="button"
            class="refresh"
            title="Yeniden seç"
            ?disabled=${busy}
            @click=${() => this._onRefreshSlot("a")}
          >
            ⟳
          </button>
        </div>

        <div class="row-between">
          <label class="lbl">Ve...</label>
          <button
            type="button"
            class="switch"
            ?disabled=${busy}
            @click=${this._onSwitchToDatasets}
          >
            Veri kümelerine geç
          </button>
        </div>

        <div class="input-wrap">
          <input
            type="text"
            readonly
            placeholder="Poligon seç"
            .value=${this._labelB ? `= ${this._labelB}` : ""}
            ?disabled=${busy}
            @click=${() => this._onInputClick("b")}
          />
          <button
            type="button"
            class="refresh"
            title="Yeniden seç"
            ?disabled=${busy}
            @click=${() => this._onRefreshSlot("b")}
          >
            ⟳
          </button>
        </div>

        <div class="actions">
          <button class="run" type="button" ?disabled=${!canRun} @click=${this._onRun}>
            ${busy ? "İşleniyor..." : "Çalıştır"}
          </button>
        </div>

        ${this._message ? b`<p class="status ${this._status}">${this._message}</p>` : null}
      </div>
    `;
  }
};
TucbsIntersectionTool.styles = [i$6`
    :host {
      display: block;
      box-sizing: border-box;
      font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
      color: #111827;
    }

    .panel {
      padding: 0;
    }

    .title {
      margin: 0 0 6px;
      font-size: 16px;
      font-weight: 600;
    }

    .info {
      margin: 0 0 12px;
      padding: 8px 10px;
      font-size: 12.5px;
      line-height: 1.4;
      color: #374151;
      background: #f3f4f6;
      border-radius: 8px;
    }

    .row-between {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 4px;
    }

    label.lbl {
      display: block;
      font-weight: 600;
      font-size: 12.5px;
      margin-bottom: 4px;
    }

    .switch {
      background: transparent;
      border: none;
      color: #2563eb;
      font-size: 12px;
      cursor: pointer;
      padding: 0;
      text-decoration: underline;
    }

    .switch:disabled {
      color: #9ca3af;
      cursor: not-allowed;
      text-decoration: none;
    }

    .input-wrap {
      position: relative;
      margin-bottom: 12px;
    }

    input[type="text"] {
      box-sizing: border-box;
      width: 100%;
      padding: 10px 34px 10px 10px;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      background: #f9fafb;
      font-size: 13px;
      outline: none;
      color: inherit;
      cursor: pointer;
    }

    .refresh {
      position: absolute;
      right: 8px;
      top: 50%;
      transform: translateY(-50%);
      border: none;
      background: transparent;
      cursor: pointer;
      font-size: 16px;
      color: #9ca3af;
      line-height: 1;
    }

    .actions {
      display: flex;
      justify-content: flex-end;
      margin-top: 4px;
    }

    button.run {
      background: #2563eb;
      color: #fff;
      border: none;
      padding: 8px 14px;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 600;
      font-size: 13px;
    }

    button.run:disabled {
      background: #e5e7eb;
      color: #9ca3af;
      cursor: not-allowed;
    }

    .status {
      margin: 8px 0 0;
      font-size: 12.5px;
    }

    .status.error {
      color: #da1e28;
    }

    .status.success {
      color: #198038;
    }

    .status.loading {
      color: #525252;
    }
  `, analysisHelpStyles];
__decorateClass$e([
  n$1()
], TucbsIntersectionTool.prototype, "mapElementId", 2);
__decorateClass$e([
  n$1({ attribute: false })
], TucbsIntersectionTool.prototype, "map", 2);
__decorateClass$e([
  n$1({ attribute: "custom-css" })
], TucbsIntersectionTool.prototype, "customCss", 2);
__decorateClass$e([
  r()
], TucbsIntersectionTool.prototype, "_labelA", 2);
__decorateClass$e([
  r()
], TucbsIntersectionTool.prototype, "_labelB", 2);
__decorateClass$e([
  r()
], TucbsIntersectionTool.prototype, "_status", 2);
__decorateClass$e([
  r()
], TucbsIntersectionTool.prototype, "_message", 2);
__decorateClass$e([
  r()
], TucbsIntersectionTool.prototype, "_helpOpen", 2);
TucbsIntersectionTool = __decorateClass$e([
  t$3("tucbs-intersection-tool")
], TucbsIntersectionTool);
const geoToolStyles = i$6`
  :host {
    display: block;
    box-sizing: border-box;
    font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
    color: #111827;
  }

  .panel { padding: 0; }

  .title {
    margin: 0 0 6px;
    font-size: 16px;
    font-weight: 600;
  }

  .info {
    margin: 0 0 12px;
    padding: 8px 10px;
    font-size: 12.5px;
    line-height: 1.4;
    color: #374151;
    background: #f3f4f6;
    border-radius: 8px;
  }

  .row-between {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 4px;
  }

  label.lbl {
    display: block;
    font-weight: 600;
    font-size: 12.5px;
    margin-bottom: 4px;
  }

  .hint {
    margin: -4px 0 12px;
    font-size: 12px;
    color: #6b7280;
  }

  select,
  input[type="text"],
  input[type="number"] {
    box-sizing: border-box;
    width: 100%;
    padding: 10px;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    background: #f9fafb;
    font-size: 13px;
    outline: none;
    color: inherit;
    margin-bottom: 12px;
  }

  input[type="text"] {
    padding-right: 34px;
    cursor: pointer;
  }

  .input-wrap {
    position: relative;
    margin-bottom: 12px;
  }

  .input-wrap input {
    margin-bottom: 0;
  }

  .distance-row {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
  }

  .distance-row input {
    margin-bottom: 0;
  }

  .unit {
    margin-left: 8px;
    font-size: 13px;
    color: #374151;
  }

  .refresh,
  .draw-btn {
    border: none;
    background: transparent;
    cursor: pointer;
    color: #2563eb;
    font-size: 13px;
  }

  .refresh {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 16px;
    color: #9ca3af;
  }

  .actions {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 4px;
  }

  button.run,
  button.secondary {
    border-radius: 8px;
    padding: 8px 14px;
    font-weight: 600;
    font-size: 13px;
    cursor: pointer;
  }

  button.run {
    background: #2563eb;
    color: #fff;
    border: none;
  }

  button.secondary {
    background: #fff;
    color: #1d4ed8;
    border: 1px solid #bfdbfe;
  }

  button.run:disabled,
  button.secondary:disabled,
  .refresh:disabled {
    background: #e5e7eb;
    color: #9ca3af;
    cursor: not-allowed;
    border-color: #e5e7eb;
  }

  .status { margin: 8px 0 0; font-size: 12.5px; }
  .status.error { color: #da1e28; }
  .status.success { color: #198038; }
  .status.loading { color: #525252; }
`;
class AnalysisMapBind {
  constructor(resolve, onPick, onBadGeoJson) {
    this.resolve = resolve;
    this.onPick = onPick;
    this.onBadGeoJson = onBadGeoJson;
    this.map = null;
    this.host = null;
    this.onReady = () => {
      this.attach();
    };
    this.onClick = (detail) => {
      const feature = entityToGeoJSON(detail.entity);
      if (!feature) {
        this.onBadGeoJson();
        return;
      }
      this.onPick(
        {
          type: "Feature",
          id: feature.id,
          properties: feature.properties ?? {},
          geometry: feature.geometry
        },
        featureLabel(feature)
      );
    };
  }
  /** Haritayı bulur ve entity tıklamasını dinler. */
  attach() {
    const { map, mapElementId } = this.resolve();
    if (map) {
      this.listen(map);
      return;
    }
    if (!mapElementId) return;
    const host = document.getElementById(mapElementId);
    if (!host) return;
    this.host = host;
    if (host.map) {
      this.listen(host.map);
      return;
    }
    host.addEventListener("ready", this.onReady, { once: true });
  }
  /** Dinleyiciyi ve identify askısını kaldırır. */
  detach() {
    if (this.map) {
      this.map.interactionManager.off("entity:click", this.onClick);
      this.map.clearSelectionHighlight();
      this.map.interactionManager.resumeIdentify();
      this.map = null;
    }
    if (this.host) {
      this.host.removeEventListener("ready", this.onReady);
      this.host = null;
    }
  }
  /** Bağlı haritayı döndürür; henüz bağlanmadıysa `map` ya da `mapElementId` üzerinden çözmeyi dener. */
  current() {
    return this.map ?? this.resolve().map;
  }
  /** Seçili nesneleri kırmızı vurguyla gösterir. */
  highlight(features) {
    var _a2;
    (_a2 = this.map) == null ? void 0 : _a2.showSelectionHighlight(features);
  }
  listen(map) {
    if (this.map === map) return;
    if (this.map) {
      this.map.interactionManager.off("entity:click", this.onClick);
      this.map.interactionManager.resumeIdentify();
    }
    this.map = map;
    map.interactionManager.on("entity:click", this.onClick);
    map.interactionManager.suspendIdentify();
  }
}
function isPolygonFeature(feature) {
  var _a2;
  const t3 = (_a2 = feature == null ? void 0 : feature.geometry) == null ? void 0 : _a2.type;
  return t3 === "Polygon" || t3 === "MultiPolygon";
}
function isPointFeature(feature) {
  var _a2;
  const t3 = (_a2 = feature == null ? void 0 : feature.geometry) == null ? void 0 : _a2.type;
  return t3 === "Point" || t3 === "MultiPoint";
}
var __defProp$c = Object.defineProperty;
var __getOwnPropDesc$d = Object.getOwnPropertyDescriptor;
var __decorateClass$d = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$d(target, key) : target;
  for (var i4 = decorators.length - 1, decorator; i4 >= 0; i4--)
    if (decorator = decorators[i4])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$c(target, key, result);
  return result;
};
let TucbsBoundaryTool = class extends i$3 {
  constructor() {
    super(...arguments);
    this.mapElementId = "";
    this.map = null;
    this.customCss = "";
    this._label = "";
    this._boundaryType = "bbox";
    this._output = "polygon";
    this._status = "idle";
    this._message = "";
    this._helpOpen = false;
    this._picking = false;
    this._feature = null;
    this._css = { sheet: null };
    this._bind = new AnalysisMapBind(
      () => ({ map: this.map, mapElementId: this.mapElementId }),
      (feature, label) => {
        if (!this._picking) return;
        this._feature = feature;
        this._label = label;
        this._picking = false;
        this._status = "idle";
        this._message = "";
        this._bind.highlight([feature]);
      },
      () => {
        this._note("error", "Seçilen özellikten GeoJSON üretilemedi.");
      }
    );
  }
  connectedCallback() {
    super.connectedCallback();
    this._bind.attach();
  }
  disconnectedCallback() {
    this._bind.detach();
    super.disconnectedCallback();
  }
  updated(changed) {
    if (changed.has("customCss")) {
      applyCustomCss(this.shadowRoot, this.customCss, this._css, "tucbs-boundary-tool");
    }
    if (changed.has("mapElementId") || changed.has("map")) {
      this._bind.detach();
      this._bind.attach();
    }
  }
  /** Form altındaki satır yerine toast basar. */
  _note(kind, message) {
    this._status = "idle";
    this._message = "";
    showToast(kind, message);
  }
  /** Seçim ve tipler doluysa sınır üretir. */
  async _run() {
    if (this._status === "loading") return;
    if (!this._feature) {
      this._note("error", "Lütfen haritada bir nesne seçin.");
      return;
    }
    const map = this._bind.current();
    if (!map) {
      this._note("error", "Harita henüz hazır değil.");
      return;
    }
    this._status = "loading";
    this._message = "İşleniyor…";
    this._picking = false;
    this.dispatchEvent(
      new CustomEvent("tucbs-boundary-run", {
        detail: {
          mapElementId: this.mapElementId,
          boundaryType: this._boundaryType,
          outputGeometry: this._output
        },
        bubbles: true,
        composed: true
      })
    );
    try {
      await map.runBoundary(
        {
          geojson: this._feature,
          boundaryType: this._boundaryType,
          outputGeometry: this._output
        },
        { title: this._boundaryType === "bbox" ? "Sınırlayıcı kutu" : "Dışbükey zarf" }
      );
      this._feature = null;
      this._label = "";
      this._boundaryType = "bbox";
      this._output = "polygon";
      this._bind.highlight([]);
      this._status = "idle";
      this._message = "";
      showToast("success", "Sınır tamamlandı.");
    } catch (err) {
      if (err instanceof TucbsError) {
        console.error(`[tucbs-boundary-tool] ${err.code} (${err.number}): ${err.message}`);
      }
      this._note("error", err instanceof Error ? err.message : "Sınır üretimi başarısız.");
    }
  }
  render() {
    const busy = this._status === "loading";
    return b`
      <div class="panel">
        <div class="title-row">
          <h3 class="title">Sınır</h3>
          <button type="button" class="help" aria-label="Yardım" title="Yardım" @click=${() => {
      this._helpOpen = true;
    }}>?</button>
        </div>
        ${renderAnalysisHelp(this._helpOpen, "Sınır", COGRAFI_HELP.sinir, () => {
      this._helpOpen = false;
    })}
        <label class="lbl">Nesne seç</label>
        <div class="input-wrap">
          <input
            type="text"
            readonly
            placeholder="Haritadan nesne seç"
            .value=${this._label ? `= ${this._label}` : ""}
            ?disabled=${busy}
            @click=${() => {
      this._picking = true;
      this._note("info", "Haritadan bir nesne seçin.");
    }}
          />
          <button
            type="button"
            class="refresh"
            title="Yeniden seç"
            ?disabled=${busy}
            @click=${() => {
      this._feature = null;
      this._label = "";
      this._picking = true;
      this._bind.highlight([]);
    }}
          >⟳</button>
        </div>
        <label class="lbl">Sınır tipi</label>
        <select
          .value=${this._boundaryType}
          ?disabled=${busy}
          @change=${(e3) => {
      this._boundaryType = e3.target.value;
    }}
        >
          <option value="bbox">Sınırlayıcı Kutu</option>
          <option value="convex">Dışbükey Zarf</option>
        </select>
        <label class="lbl">Çıktı geometrisi</label>
        <select
          .value=${this._output}
          ?disabled=${busy}
          @change=${(e3) => {
      this._output = e3.target.value;
    }}
        >
          <option value="polygon">Poligon</option>
          <option value="line">Çizgi</option>
        </select>
        <div class="actions">
          <button class="run" type="button" ?disabled=${!this._feature || busy} @click=${this._run}>
            ${busy ? "İşleniyor..." : "Çalıştır"}
          </button>
        </div>
        ${this._message ? b`<p class="status ${this._status}">${this._message}</p>` : null}
      </div>
    `;
  }
};
TucbsBoundaryTool.styles = [geoToolStyles, analysisHelpStyles];
__decorateClass$d([
  n$1()
], TucbsBoundaryTool.prototype, "mapElementId", 2);
__decorateClass$d([
  n$1({ attribute: false })
], TucbsBoundaryTool.prototype, "map", 2);
__decorateClass$d([
  n$1({ attribute: "custom-css" })
], TucbsBoundaryTool.prototype, "customCss", 2);
__decorateClass$d([
  r()
], TucbsBoundaryTool.prototype, "_label", 2);
__decorateClass$d([
  r()
], TucbsBoundaryTool.prototype, "_boundaryType", 2);
__decorateClass$d([
  r()
], TucbsBoundaryTool.prototype, "_output", 2);
__decorateClass$d([
  r()
], TucbsBoundaryTool.prototype, "_status", 2);
__decorateClass$d([
  r()
], TucbsBoundaryTool.prototype, "_message", 2);
__decorateClass$d([
  r()
], TucbsBoundaryTool.prototype, "_helpOpen", 2);
__decorateClass$d([
  r()
], TucbsBoundaryTool.prototype, "_picking", 2);
TucbsBoundaryTool = __decorateClass$d([
  t$3("tucbs-boundary-tool")
], TucbsBoundaryTool);
const CORNER_IDS = ["KB", "KD", "GD", "GB"];
const KM_PER_DEG = 111.32;
function emptyCoords() {
  return {
    KB: { lon: "", lat: "" },
    KD: { lon: "", lat: "" },
    GD: { lon: "", lat: "" },
    GB: { lon: "", lat: "" }
  };
}
function boxFromCoordinates(coordinates) {
  if (coordinates.length < 2) return null;
  const lons = coordinates.map((c2) => c2[0]);
  const lats = coordinates.map((c2) => c2[1]);
  return normalizeBox(Math.min(...lons), Math.min(...lats), Math.max(...lons), Math.max(...lats));
}
function boxFromCorner(box, id, lon, lat) {
  let { west, south, east, north } = box;
  if (id === "KB") {
    west = lon;
    north = lat;
  } else if (id === "KD") {
    east = lon;
    north = lat;
  } else if (id === "GD") {
    east = lon;
    south = lat;
  } else {
    west = lon;
    south = lat;
  }
  return normalizeBox(west, south, east, north);
}
function normalizeBox(west, south, east, north) {
  const w2 = Math.min(west, east);
  const e3 = Math.max(west, east);
  const s2 = Math.min(south, north);
  const n3 = Math.max(south, north);
  if (e3 - w2 < 1e-8 || n3 - s2 < 1e-8) return null;
  return { west: w2, south: s2, east: e3, north: n3 };
}
function coordsFromBox(box) {
  const points = cornerPoints(box);
  const out = emptyCoords();
  for (const id of CORNER_IDS) {
    out[id] = { lon: points[id].lon.toFixed(6), lat: points[id].lat.toFixed(6) };
  }
  return out;
}
function cornerPoints(box) {
  return {
    KB: { lon: box.west, lat: box.north },
    KD: { lon: box.east, lat: box.north },
    GD: { lon: box.east, lat: box.south },
    GB: { lon: box.west, lat: box.south }
  };
}
function flatRing(box) {
  return [box.west, box.south, box.east, box.south, box.east, box.north, box.west, box.north];
}
function maskFromBox(box) {
  const ring = [
    [box.west, box.south],
    [box.east, box.south],
    [box.east, box.north],
    [box.west, box.north],
    [box.west, box.south]
  ];
  const geometry = { type: "Polygon", coordinates: [ring] };
  return { type: "Feature", properties: {}, geometry };
}
function formatSize(box) {
  const midLat = (box.south + box.north) / 2 * (Math.PI / 180);
  const heightKm = Math.abs(box.north - box.south) * KM_PER_DEG;
  const widthKm = Math.abs(box.east - box.west) * KM_PER_DEG * Math.cos(midLat);
  return `${widthKm.toFixed(2)} × ${heightKm.toFixed(2)} km`;
}
var __defProp$b = Object.defineProperty;
var __getOwnPropDesc$c = Object.getOwnPropertyDescriptor;
var __decorateClass$c = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$c(target, key) : target;
  for (var i4 = decorators.length - 1, decorator; i4 >= 0; i4--)
    if (decorator = decorators[i4])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$b(target, key, result);
  return result;
};
const CORNER_LABEL = {
  KB: "Kuzey-batı",
  KD: "Kuzey-doğu",
  GD: "Güney-doğu",
  GB: "Güney-batı"
};
let TucbsClipTool = class extends i$3 {
  constructor() {
    super(...arguments);
    this.mapElementId = "";
    this.map = null;
    this.customCss = "";
    this._label = "";
    this._drawing = false;
    this._status = "idle";
    this._message = "";
    this._helpOpen = false;
    this._picking = false;
    this._box = null;
    this._coords = emptyCoords();
    this._feature = null;
    this._mask = null;
    this._shapeId = null;
    this._shapeEntity = null;
    this._handles = [];
    this._drag = null;
    this._pointer = null;
    this._css = { sheet: null };
    this._bind = new AnalysisMapBind(
      () => ({ map: this.map, mapElementId: this.mapElementId }),
      (feature, label) => {
        if (feature.properties.tucbsClipHandle) return;
        if (!this._picking || this._drawing) return;
        this._feature = feature;
        this._label = label;
        this._picking = false;
        this._status = "idle";
        this._message = "";
        this._bind.highlight([feature]);
      },
      () => {
        this._note("error", "Seçilen özellikten GeoJSON üretilemedi.");
      }
    );
    this._onDrawComplete = (payload) => {
      if (payload.shape.source !== "tucbs-clip" || payload.shape.tool !== "rectangle") return;
      const box = boxFromCoordinates(payload.shape.coordinates);
      if (!box) return;
      this._shapeId = payload.shape.id;
      this._shapeEntity = payload.shape.entity;
      this._applyBox(box);
      this._endDrawMode();
      this._placeHandles();
    };
    this._onDrawCancel = () => {
      this._drawing = false;
    };
  }
  connectedCallback() {
    super.connectedCallback();
    this._bind.attach();
    this._listenDraw(true);
  }
  disconnectedCallback() {
    this._stopDraw(true);
    this._listenDraw(false);
    this._bind.detach();
    super.disconnectedCallback();
  }
  updated(changed) {
    if (changed.has("customCss")) {
      applyCustomCss(this.shadowRoot, this.customCss, this._css, "tucbs-clip-tool");
    }
    if (changed.has("mapElementId") || changed.has("map")) {
      this._listenDraw(false);
      this._dropPointer();
      this._bind.detach();
      this._bind.attach();
      this._listenDraw(true);
    }
  }
  /** Form altındaki satır yerine toast basar. */
  _note(kind, message) {
    this._status = "idle";
    this._message = "";
    showToast(kind, message);
  }
  /** Çizim olaylarını haritaya bağlar veya koparır. */
  _listenDraw(on) {
    var _a2;
    const manager = (_a2 = this._bind.current()) == null ? void 0 : _a2.drawingManager;
    if (!manager) return;
    const method = on ? "on" : "off";
    manager[method]("draw:complete", this._onDrawComplete);
    manager[method]("draw:cancel", this._onDrawCancel);
  }
  /** Dikdörtgen çizmeyi başlatır; önceki maske silinir. */
  _startDraw() {
    const map = this._bind.current();
    if (!map) {
      this._note("error", "Harita henüz hazır değil.");
      return;
    }
    this._clearMask(map);
    this._drawing = true;
    this._picking = false;
    this._note("info", "Haritada dikdörtgen çizin.");
    map.drawingManager.activate("rectangle", "tucbs-clip");
  }
  /** Nesne seçimine geçmeden önce açık çizim oturumunu kapatır. */
  _armPick() {
    this._endDrawMode();
    this._picking = true;
    this._note("info", "Haritadan nesne seç.");
  }
  /** Çizim modundan çıkar; tamamlanmış dikdörtgeni silmez. */
  _endDrawMode() {
    const map = this._bind.current();
    if ((map == null ? void 0 : map.drawingManager.getActiveTool()) === "rectangle") map.drawingManager.deactivate();
    this._drawing = false;
  }
  _clearMask(map) {
    this._removeHandles();
    if (map && this._shapeId) map.drawingManager.removeShape(this._shapeId);
    this._shapeId = null;
    this._shapeEntity = null;
    this._mask = null;
    this._box = null;
    this._coords = emptyCoords();
  }
  _stopDraw(removeShape) {
    this._endDrawMode();
    this._dropPointer();
    if (removeShape) this._clearMask(this._bind.current());
    this._drawing = false;
  }
  /** Köşe kutusunu ve kırpma maskesini aynı dikdörtgene yazar. */
  _applyBox(box) {
    this._box = box;
    this._coords = coordsFromBox(box);
    this._mask = maskFromBox(box);
    this._paintPolygon(box);
    this._status = "idle";
    this._message = "";
  }
  /** Yazılan köşeyi blur veya Enter ile dikdörtgene işler. */
  _applyCorner(id) {
    const box = this._box;
    if (!box) return;
    const raw = this._coords[id];
    const lon = Number(raw.lon);
    const lat = Number(raw.lat);
    if (!Number.isFinite(lon) || !Number.isFinite(lat)) {
      this._coords = coordsFromBox(box);
      return;
    }
    const next = boxFromCorner(box, id, lon, lat);
    if (!next) {
      this._coords = coordsFromBox(box);
      this._note("error", "Köşeler geçerli bir dikdörtgen oluşturmuyor.");
      return;
    }
    this._applyBox(next);
    this._placeHandles();
  }
  _setCoord(id, field, value) {
    this._coords = { ...this._coords, [id]: { ...this._coords[id], [field]: value } };
  }
  /** Haritadaki dikdörtgen dolgusunu köşe kutusuna çeker. */
  _paintPolygon(box) {
    var _a2, _b;
    const polygon = (_a2 = this._shapeEntity) == null ? void 0 : _a2.polygon;
    if (!polygon) return;
    polygon.hierarchy = new ConstantProperty(
      new PolygonHierarchy(Cartesian3.fromDegreesArray(flatRing(box)))
    );
    (_b = this._bind.current()) == null ? void 0 : _b.viewer.scene.requestRender();
  }
  /** Köşe tutamaçlarını dikdörtgenin dört ucuna KB/KD/GD/GB yazısıyla koyar. */
  _placeHandles() {
    const map = this._bind.current();
    const box = this._box;
    if (!map || !box) return;
    this._removeHandles();
    const viewer = map.viewer;
    const points = cornerPoints(box);
    for (const id of CORNER_IDS) {
      const point = points[id];
      this._handles.push(viewer.entities.add({
        name: `tucbs-clip-${id}`,
        position: Cartesian3.fromDegrees(point.lon, point.lat),
        properties: { tucbsClipHandle: id },
        billboard: {
          image: cornerBadge(id),
          width: 36,
          height: 22,
          verticalOrigin: VerticalOrigin.CENTER,
          horizontalOrigin: HorizontalOrigin.CENTER,
          disableDepthTestDistance: Number.POSITIVE_INFINITY
        }
      }));
    }
    this._ensurePointer(viewer);
    viewer.scene.requestRender();
  }
  _removeHandles() {
    var _a2;
    const viewer = (_a2 = this._bind.current()) == null ? void 0 : _a2.viewer;
    if (!viewer) {
      this._handles = [];
      return;
    }
    for (const handle of this._handles) viewer.entities.remove(handle);
    this._handles = [];
    this._drag = null;
    viewer.scene.screenSpaceCameraController.enableInputs = true;
  }
  /** Köşe noktasını sürükleyince dikdörtgeni günceller. */
  _ensurePointer(viewer) {
    if (this._pointer) return;
    const handler = new ScreenSpaceEventHandler(viewer.scene.canvas);
    handler.setInputAction((event) => {
      const id = this._cornerAt(viewer, event.position);
      if (!id) return;
      this._drag = id;
      viewer.scene.screenSpaceCameraController.enableInputs = false;
    }, ScreenSpaceEventType.LEFT_DOWN);
    handler.setInputAction((event) => {
      if (!this._drag || !this._box) return;
      const lonLat = groundLonLat(viewer, event.endPosition);
      if (!lonLat) return;
      const next = boxFromCorner(this._box, this._drag, lonLat[0], lonLat[1]);
      if (!next) return;
      this._applyBox(next);
      this._moveHandles(next);
    }, ScreenSpaceEventType.MOUSE_MOVE);
    handler.setInputAction(() => {
      this._drag = null;
      viewer.scene.screenSpaceCameraController.enableInputs = true;
    }, ScreenSpaceEventType.LEFT_UP);
    this._pointer = handler;
  }
  _cornerAt(viewer, position) {
    var _a2;
    const picked = viewer.scene.pick(position);
    const name = ((_a2 = picked == null ? void 0 : picked.id) == null ? void 0 : _a2.name) ?? "";
    if (!name.startsWith("tucbs-clip-")) return null;
    const id = name.slice("tucbs-clip-".length);
    return CORNER_IDS.includes(id) ? id : null;
  }
  _moveHandles(box) {
    const points = cornerPoints(box);
    for (const handle of this._handles) {
      const id = (handle.name ?? "").slice("tucbs-clip-".length);
      const point = points[id];
      if (!point) continue;
      handle.position = Cartesian3.fromDegrees(point.lon, point.lat);
    }
  }
  _dropPointer() {
    var _a2;
    this._removeHandles();
    (_a2 = this._pointer) == null ? void 0 : _a2.destroy();
    this._pointer = null;
  }
  /** Nesne ve dikdörtgen doluysa kırpar. */
  async _run() {
    if (this._status === "loading") return;
    if (!this._feature || !this._mask) {
      this._note("error", "Kırpılacak nesne ve dikdörtgen alan gerekli.");
      return;
    }
    const map = this._bind.current();
    if (!map) {
      this._note("error", "Harita henüz hazır değil.");
      return;
    }
    this._status = "loading";
    this._message = "İşleniyor…";
    this.dispatchEvent(
      new CustomEvent("tucbs-clip-run", {
        detail: { mapElementId: this.mapElementId, label: this._label },
        bubbles: true,
        composed: true
      })
    );
    try {
      await map.runClip(
        { geojsonA: this._feature, geojsonB: this._mask },
        { title: "Kırpma sonucu" }
      );
      this._feature = null;
      this._label = "";
      this._picking = false;
      this._clearMask(map);
      this._bind.highlight([]);
      this._status = "idle";
      this._message = "";
      showToast("success", "Kırpma işlemi tamamlandı.");
    } catch (err) {
      if (err instanceof TucbsError) {
        console.error(`[tucbs-clip-tool] ${err.code} (${err.number}): ${err.message}`);
      }
      this._note("error", err instanceof Error ? err.message : "Kırpma başarısız.");
    }
  }
  render() {
    const busy = this._status === "loading";
    const box = this._box;
    const canRun = Boolean(this._feature && this._mask && box) && !busy && !this._drawing;
    const size = box ? formatSize(box) : "";
    return b`
      <div class="panel">
        <div class="title-row">
          <h3 class="title">Kırpma</h3>
          <button type="button" class="help" aria-label="Yardım" title="Yardım" @click=${() => {
      this._helpOpen = true;
    }}>?</button>
        </div>
        ${renderAnalysisHelp(this._helpOpen, "Kırpma", COGRAFI_HELP.kirp, () => {
      this._helpOpen = false;
    })}
        <label class="lbl">Kırpılacak nesne</label>
        <div class="input-wrap">
          <input
            type="text"
            readonly
            placeholder="Haritadan nesne seç"
            .value=${this._label ? `= ${this._label}` : ""}
            ?disabled=${busy || this._drawing}
            @click=${this._armPick}
          />
          <button
            type="button"
            class="refresh"
            title="Yeniden seç"
            ?disabled=${busy}
            @click=${() => {
      this._feature = null;
      this._label = "";
      this._armPick();
      this._bind.highlight([]);
    }}
          >⟳</button>
        </div>
        <label class="lbl">Kırpma alanı (dikdörtgen)</label>
        <div class="area-row">
          <span class="area-size">${this._drawing ? "Çiziliyor…" : size}</span>
          <div class="area-actions">
            ${box && !this._drawing ? b`<button type="button" class="link" ?disabled=${busy} @click=${() => this._clearMask(this._bind.current())}>Temizle</button>` : null}
            <button class="secondary" type="button" ?disabled=${busy || this._drawing} @click=${this._startDraw}>
              ${this._drawing ? "Çiziliyor" : box ? "Yeniden çiz" : "Dikdörtgen çiz"}
            </button>
          </div>
        </div>
        ${box ? b`
            <div class="corners">
              <h4>Köşe koordinatları</h4>
              ${CORNER_IDS.map((id) => b`
                <div class="corner">
                  <div class="corner-head">
                    <span class="badge">${id}</span>
                    <span class="corner-name">${CORNER_LABEL[id]}</span>
                  </div>
                  <div class="corner-fields">
                    <label>
                      Boylam
                      <input
                        .value=${this._coords[id].lon}
                        ?disabled=${busy || this._drawing}
                        @input=${(event) => this._setCoord(id, "lon", event.target.value)}
                        @blur=${() => this._applyCorner(id)}
                        @keydown=${(event) => {
      if (event.key === "Enter") this._applyCorner(id);
    }}
                      />
                    </label>
                    <label>
                      Enlem
                      <input
                        .value=${this._coords[id].lat}
                        ?disabled=${busy || this._drawing}
                        @input=${(event) => this._setCoord(id, "lat", event.target.value)}
                        @blur=${() => this._applyCorner(id)}
                        @keydown=${(event) => {
      if (event.key === "Enter") this._applyCorner(id);
    }}
                      />
                    </label>
                  </div>
                </div>
              `)}
              <p class="foot">Enter veya alandan çıkınca uygulanır. Köşeleri haritada da sürükleyebilirsiniz.</p>
            </div>
          ` : b`<p class="hint">Haritada sürükleyerek çizin.</p>`}
        <div class="actions">
          <button class="run" type="button" ?disabled=${!canRun} @click=${this._run}>
            ${busy ? "İşleniyor..." : "Çalıştır"}
          </button>
        </div>
        ${this._message ? b`<p class="status ${this._status}">${this._message}</p>` : null}
      </div>
    `;
  }
};
TucbsClipTool.styles = [
  geoToolStyles,
  analysisHelpStyles,
  i$6`
      .area-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        margin-bottom: 8px;
      }
      .area-size { font-size: 13px; color: #374151; }
      .area-actions { display: flex; align-items: center; gap: 8px; }
      button.link {
        background: transparent;
        border: none;
        color: #6b7280;
        font-size: 12px;
        text-decoration: underline;
        cursor: pointer;
        padding: 0;
      }
      button.link:disabled { color: #9ca3af; cursor: not-allowed; }
      .title-row { margin-bottom: 16px; }
      .hint { margin: 0 0 8px; font-size: 12px; color: #6b7280; }
      .corners {
        margin: 4px 0 8px;
        padding: 10px;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        background: #f9fafb;
      }
      .corners h4 { margin: 0 0 8px; font-size: 12px; }
      .corner { margin-bottom: 10px; padding-bottom: 8px; border-bottom: 1px solid #e5e7eb; }
      .corner:last-of-type { margin-bottom: 0; padding-bottom: 0; border-bottom: none; }
      .corner-head { display: flex; align-items: center; gap: 8px; margin-bottom: 6px; }
      .badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 1.6rem;
        height: 1.25rem;
        padding: 0 6px;
        border-radius: 999px;
        background: #da1e28;
        color: #fff;
        font-size: 11px;
        font-weight: 700;
      }
      .corner-name { font-size: 12px; color: #374151; }
      .corner-fields {
        display: grid;
        grid-template-columns: calc(50% - 4px) calc(50% - 4px);
        gap: 8px;
        width: 100%;
      }
      .corner-fields label {
        display: flex;
        flex-direction: column;
        gap: 4px;
        min-width: 0;
        font-size: 11px;
        color: #6b7280;
      }
      .corner-fields input {
        width: 100%;
        min-width: 0;
        max-width: 100%;
        box-sizing: border-box;
        margin: 0;
        padding: 6px 8px;
      }
      .foot { margin: 6px 0 0; font-size: 11px; color: #9ca3af; }
    `
];
__decorateClass$c([
  n$1()
], TucbsClipTool.prototype, "mapElementId", 2);
__decorateClass$c([
  n$1({ attribute: false })
], TucbsClipTool.prototype, "map", 2);
__decorateClass$c([
  n$1({ attribute: "custom-css" })
], TucbsClipTool.prototype, "customCss", 2);
__decorateClass$c([
  r()
], TucbsClipTool.prototype, "_label", 2);
__decorateClass$c([
  r()
], TucbsClipTool.prototype, "_drawing", 2);
__decorateClass$c([
  r()
], TucbsClipTool.prototype, "_status", 2);
__decorateClass$c([
  r()
], TucbsClipTool.prototype, "_message", 2);
__decorateClass$c([
  r()
], TucbsClipTool.prototype, "_helpOpen", 2);
__decorateClass$c([
  r()
], TucbsClipTool.prototype, "_picking", 2);
__decorateClass$c([
  r()
], TucbsClipTool.prototype, "_box", 2);
__decorateClass$c([
  r()
], TucbsClipTool.prototype, "_coords", 2);
TucbsClipTool = __decorateClass$c([
  t$3("tucbs-clip-tool")
], TucbsClipTool);
const CORNER_BADGE = {};
function cornerBadge(id) {
  const cached = CORNER_BADGE[id];
  if (cached) return cached;
  const canvas = document.createElement("canvas");
  canvas.width = 72;
  canvas.height = 44;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;
  ctx.fillStyle = "#dc2626";
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.roundRect(2, 2, 68, 40, 20);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#ffffff";
  ctx.font = "700 22px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(id, 36, 23);
  CORNER_BADGE[id] = canvas;
  return canvas;
}
function groundLonLat(viewer, position) {
  const ray = viewer.camera.getPickRay(position);
  if (!ray) return null;
  const cartesian = viewer.scene.globe.pick(ray, viewer.scene);
  if (!cartesian) return null;
  const carto = Cartographic.fromCartesian(cartesian);
  return [Math$1.toDegrees(carto.longitude), Math$1.toDegrees(carto.latitude)];
}
var __defProp$a = Object.defineProperty;
var __getOwnPropDesc$b = Object.getOwnPropertyDescriptor;
var __decorateClass$b = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$b(target, key) : target;
  for (var i4 = decorators.length - 1, decorator; i4 >= 0; i4--)
    if (decorator = decorators[i4])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$a(target, key, result);
  return result;
};
const _TucbsTwoFeatureTool = class _TucbsTwoFeatureTool extends i$3 {
  constructor() {
    super(...arguments);
    this.mapElementId = "";
    this.map = null;
    this.customCss = "";
    this._labelA = "";
    this._labelB = "";
    this._status = "idle";
    this._message = "";
    this._helpOpen = false;
    this._featureA = null;
    this._featureB = null;
    this._pending = null;
    this._css = { sheet: null };
    this._bind = new AnalysisMapBind(
      () => ({ map: this.map, mapElementId: this.mapElementId }),
      (feature, label) => this._accept(feature, label),
      () => {
        this._note("error", "Seçilen özellikten GeoJSON üretilemedi.");
      }
    );
  }
  connectedCallback() {
    super.connectedCallback();
    this._bind.attach();
  }
  disconnectedCallback() {
    this._bind.detach();
    super.disconnectedCallback();
  }
  updated(changed) {
    if (changed.has("customCss")) {
      applyCustomCss(this.shadowRoot, this.customCss, this._css, this.tagName.toLowerCase());
    }
    if (changed.has("mapElementId") || changed.has("map")) {
      this._bind.detach();
      this._bind.attach();
    }
  }
  /** Tıklanan nesneyi bekleyen slota yazar; poligon değilse reddeder. */
  _accept(feature, label) {
    if (!this._pending) return;
    if (!isPolygonFeature(feature)) {
      this._note("error", this.spec().polygonOnlyMessage);
      return;
    }
    if (this._pending === "a") {
      this._featureA = feature;
      this._labelA = label;
    } else {
      this._featureB = feature;
      this._labelB = label;
    }
    this._pending = null;
    this._status = "idle";
    this._message = "";
    this._bind.highlight([this._featureA, this._featureB].filter((f2) => f2 !== null));
  }
  _arm(slot) {
    this._pending = slot;
    this._note("info", slot === "a" ? "Lütfen birinci poligonu seçin." : "Lütfen ikinci poligonu seçin.");
  }
  _refresh(slot) {
    if (slot === "a") {
      this._featureA = null;
      this._labelA = "";
    } else {
      this._featureB = null;
      this._labelB = "";
    }
    this._arm(slot);
    this._bind.highlight([this._featureA, this._featureB].filter((f2) => f2 !== null));
  }
  _clear() {
    this._featureA = null;
    this._featureB = null;
    this._labelA = "";
    this._labelB = "";
    this._pending = null;
    this._bind.highlight([]);
  }
  /** İki poligon doluysa ilgili coğrafi işlemi çalıştırır. */
  async _run() {
    const spec = this.spec();
    if (this._status === "loading") return;
    if (!isPolygonFeature(this._featureA) || !isPolygonFeature(this._featureB)) {
      this._note("error", spec.bothPolygonMessage);
      return;
    }
    const map = this._bind.current();
    if (!map) {
      this._bind.attach();
      this._note("error", "Harita henüz hazır değil.");
      return;
    }
    this._status = "loading";
    this._message = "İşleniyor…";
    this._pending = null;
    this.dispatchEvent(
      new CustomEvent(spec.eventName, {
        detail: { mapElementId: this.mapElementId, labelA: this._labelA, labelB: this._labelB },
        bubbles: true,
        composed: true
      })
    );
    try {
      await spec.run(map, this._featureA, this._featureB);
      this._clear();
      this._status = "idle";
      this._message = "";
      showToast("success", spec.success);
    } catch (err) {
      if (err instanceof TucbsError) {
        console.error(`[${this.tagName}] ${err.code} (${err.number}): ${err.message}`);
      }
      this._note("error", err instanceof Error ? err.message : spec.fail);
    }
  }
  /** Form altındaki satır yerine toast basar. */
  _note(kind, message) {
    this._status = "idle";
    this._message = "";
    showToast(kind, message);
  }
  _slot(slot, label, placeholder, value) {
    const busy = this._status === "loading";
    return b`
      <label class="lbl">${label}</label>
      <div class="input-wrap">
        <input
          type="text"
          readonly
          placeholder=${placeholder}
          .value=${value ? `= ${value}` : ""}
          ?disabled=${busy}
          @click=${() => this._arm(slot)}
        />
        <button type="button" class="refresh" title="Yeniden seç" ?disabled=${busy} @click=${() => this._refresh(slot)}>⟳</button>
      </div>
    `;
  }
  render() {
    const spec = this.spec();
    const busy = this._status === "loading";
    const canRun = isPolygonFeature(this._featureA) && isPolygonFeature(this._featureB) && !busy;
    return b`
      <div class="panel">
        <div class="title-row">
          <h3 class="title">${spec.title}</h3>
          <button type="button" class="help" aria-label="Yardım" title="Yardım" @click=${() => {
      this._helpOpen = true;
    }}>?</button>
        </div>
        ${renderAnalysisHelp(this._helpOpen, spec.title, spec.help, () => {
      this._helpOpen = false;
    })}
        ${this._slot("a", spec.labelA, spec.placeholderA, this._labelA)}
        ${this._slot("b", spec.labelB, spec.placeholderB, this._labelB)}
        <div class="actions">
          <button class="run" type="button" ?disabled=${!canRun} @click=${this._run}>
            ${busy ? "İşleniyor..." : "Çalıştır"}
          </button>
        </div>
        ${this._message ? b`<p class="status ${this._status}">${this._message}</p>` : null}
      </div>
    `;
  }
};
_TucbsTwoFeatureTool.styles = [geoToolStyles, analysisHelpStyles];
let TucbsTwoFeatureTool = _TucbsTwoFeatureTool;
__decorateClass$b([
  n$1()
], TucbsTwoFeatureTool.prototype, "mapElementId", 2);
__decorateClass$b([
  n$1({ attribute: false })
], TucbsTwoFeatureTool.prototype, "map", 2);
__decorateClass$b([
  n$1({ attribute: "custom-css" })
], TucbsTwoFeatureTool.prototype, "customCss", 2);
__decorateClass$b([
  r()
], TucbsTwoFeatureTool.prototype, "_labelA", 2);
__decorateClass$b([
  r()
], TucbsTwoFeatureTool.prototype, "_labelB", 2);
__decorateClass$b([
  r()
], TucbsTwoFeatureTool.prototype, "_status", 2);
__decorateClass$b([
  r()
], TucbsTwoFeatureTool.prototype, "_message", 2);
__decorateClass$b([
  r()
], TucbsTwoFeatureTool.prototype, "_helpOpen", 2);
let TucbsDifferenceTool = class extends TucbsTwoFeatureTool {
  spec() {
    return {
      title: "Fark",
      labelA: "İlk poligon (kaynak)...",
      placeholderA: "Haritadan poligon seç",
      labelB: "İkinci poligon (çıkarılacak)...",
      placeholderB: "Poligon seçmek için buraya tıklayın",
      eventName: "tucbs-difference-run",
      success: "Fark tamamlandı.",
      fail: "Fark başarısız.",
      polygonOnlyMessage: "Fark için yalnızca poligon seçin.",
      bothPolygonMessage: "Her iki seçim de poligon olmalıdır.",
      help: COGRAFI_HELP.fark,
      run: (map, a2, b2) => map.runDifference({ geojsonA: a2, geojsonB: b2 }, { title: "Fark sonucu" })
    };
  }
};
TucbsDifferenceTool = __decorateClass$b([
  t$3("tucbs-difference-tool")
], TucbsDifferenceTool);
let TucbsSubtractTool = class extends TucbsTwoFeatureTool {
  spec() {
    return {
      title: "Çıkarma",
      labelA: "Nesneyi şuradan kaldır:",
      placeholderA: "Haritadan nesne seç",
      labelB: "...ile örtüşüyor.",
      placeholderB: "Nesne seçmek için buraya tıklayın",
      eventName: "tucbs-subtract-run",
      success: "Çıkarma tamamlandı.",
      fail: "Çıkarma başarısız.",
      polygonOnlyMessage: "Çıkarma için yalnızca poligon seçin.",
      bothPolygonMessage: "Her iki seçim de poligon olmalıdır.",
      help: COGRAFI_HELP.cikarma,
      run: (map, a2, b2) => map.runSubtract({ geojsonA: a2, geojsonB: b2 }, { title: "Çıkarma sonucu" })
    };
  }
};
TucbsSubtractTool = __decorateClass$b([
  t$3("tucbs-subtract-tool")
], TucbsSubtractTool);
let TucbsUnionTool = class extends TucbsTwoFeatureTool {
  spec() {
    return {
      title: "Birleştir",
      labelA: "Birleştirilecek birinci...",
      placeholderA: "Haritadan nesne seç",
      labelB: "Birleştirilecek ikinci...",
      placeholderB: "Haritadan nesne seç",
      eventName: "tucbs-union-run",
      success: "Birleştirme tamamlandı.",
      fail: "Birleştirme başarısız.",
      polygonOnlyMessage: "Birleştirme için yalnızca poligon seçin.",
      bothPolygonMessage: "Her iki seçim de poligon olmalıdır.",
      help: COGRAFI_HELP.birlestir,
      run: (map, a2, b2) => map.runUnion({ geojsonA: a2, geojsonB: b2 }, { title: "Birleştir sonucu" })
    };
  }
};
TucbsUnionTool = __decorateClass$b([
  t$3("tucbs-union-tool")
], TucbsUnionTool);
var __defProp$9 = Object.defineProperty;
var __getOwnPropDesc$a = Object.getOwnPropertyDescriptor;
var __decorateClass$a = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$a(target, key) : target;
  for (var i4 = decorators.length - 1, decorator; i4 >= 0; i4--)
    if (decorator = decorators[i4])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$9(target, key, result);
  return result;
};
let TucbsWedgeBufferTool = class extends i$3 {
  constructor() {
    super(...arguments);
    this.mapElementId = "";
    this.map = null;
    this.customCss = "";
    this._label = "";
    this._distance = "";
    this._start = "0";
    this._end = "90";
    this._status = "idle";
    this._message = "";
    this._helpOpen = false;
    this._picking = false;
    this._feature = null;
    this._css = { sheet: null };
    this._bind = new AnalysisMapBind(
      () => ({ map: this.map, mapElementId: this.mapElementId }),
      (feature, label) => {
        if (!this._picking) return;
        if (!isPointFeature(feature)) {
          this._note("error", "Kama tampon sadece nokta geometrileri için kullanılabilir.");
          return;
        }
        this._feature = feature;
        this._label = label;
        this._picking = false;
        this._status = "idle";
        this._message = "";
        this._bind.highlight([feature]);
      },
      () => {
        this._note("error", "Seçilen özellikten GeoJSON üretilemedi.");
      }
    );
  }
  connectedCallback() {
    super.connectedCallback();
    this._bind.attach();
  }
  disconnectedCallback() {
    this._bind.detach();
    super.disconnectedCallback();
  }
  updated(changed) {
    if (changed.has("customCss")) {
      applyCustomCss(this.shadowRoot, this.customCss, this._css, "tucbs-wedge-buffer-tool");
    }
    if (changed.has("mapElementId") || changed.has("map")) {
      this._bind.detach();
      this._bind.attach();
    }
  }
  /** Form altındaki satır yerine toast basar. */
  _note(kind, message) {
    this._status = "idle";
    this._message = "";
    showToast(kind, message);
  }
  /** Nokta, pozitif mesafe ve artan açı aralığıyla kama üretir. */
  async _run() {
    if (this._status === "loading") return;
    if (!isPointFeature(this._feature)) {
      this._note("error", "Lütfen haritada bir nokta seçin.");
      return;
    }
    const distance = Number(this._distance);
    const start = Number(this._start);
    const end = Number(this._end);
    if (!Number.isFinite(distance) || distance <= 0) {
      this._note("error", "Geçerli bir mesafe girin.");
      return;
    }
    if (!Number.isFinite(start) || !Number.isFinite(end) || start >= end) {
      this._note("error", "Başlangıç açısı bitiş açısından küçük olmalıdır.");
      return;
    }
    const map = this._bind.current();
    if (!map) {
      this._note("error", "Harita henüz hazır değil.");
      return;
    }
    this._status = "loading";
    this._message = "İşleniyor…";
    this._picking = false;
    this.dispatchEvent(
      new CustomEvent("tucbs-wedge-buffer-run", {
        detail: { mapElementId: this.mapElementId, distanceM: distance, startAngle: start, endAngle: end },
        bubbles: true,
        composed: true
      })
    );
    try {
      await map.runWedgeBuffer(
        { geojson: this._feature, distanceM: distance, startAngle: start, endAngle: end },
        { title: `Kama tampon (${distance}m, ${start}°–${end}°)` }
      );
      this._feature = null;
      this._label = "";
      this._distance = "";
      this._start = "0";
      this._end = "90";
      this._bind.highlight([]);
      this._status = "idle";
      this._message = "";
      showToast("success", "Kama tampon eklendi.");
    } catch (err) {
      if (err instanceof TucbsError) {
        console.error(`[tucbs-wedge-buffer-tool] ${err.code} (${err.number}): ${err.message}`);
      }
      this._note("error", err instanceof Error ? err.message : "Kama tampon başarısız.");
    }
  }
  render() {
    const busy = this._status === "loading";
    const canRun = Boolean(this._feature && this._distance) && !busy;
    return b`
      <div class="panel">
        <div class="title-row">
          <h3 class="title">Kama Tampon</h3>
          <button type="button" class="help" aria-label="Yardım" title="Yardım" @click=${() => {
      this._helpOpen = true;
    }}>?</button>
        </div>
        ${renderAnalysisHelp(this._helpOpen, "Kama Tampon", COGRAFI_HELP.kama, () => {
      this._helpOpen = false;
    })}
        <label class="lbl">Nokta seç...</label>
        <div class="input-wrap">
          <input
            type="text"
            readonly
            placeholder="Nokta seçmek için buraya tıklayın"
            .value=${this._label ? `= ${this._label}` : ""}
            ?disabled=${busy}
            @click=${() => {
      this._picking = true;
      this._note("info", "Haritadan bir nokta seçin.");
    }}
          />
          <button
            type="button"
            class="refresh"
            title="Yeniden seç"
            ?disabled=${busy}
            @click=${() => {
      this._feature = null;
      this._label = "";
      this._picking = true;
      this._bind.highlight([]);
    }}
          >⟳</button>
        </div>
        <label class="lbl">Mesafe</label>
        <div class="distance-row">
          <input
            type="number"
            min="0"
            step="any"
            placeholder="Mesafe girin"
            .value=${this._distance}
            ?disabled=${busy}
            @input=${(e3) => {
      this._distance = e3.target.value;
    }}
          />
          <span class="unit">m</span>
        </div>
        <label class="lbl">Başlangıç Açısı</label>
        <input
          type="number"
          step="any"
          placeholder="Başlangıç açısı"
          .value=${this._start}
          ?disabled=${busy}
          @input=${(e3) => {
      this._start = e3.target.value;
    }}
        />
        <label class="lbl">Bitiş Açısı</label>
        <input
          type="number"
          step="any"
          placeholder="Bitiş açısı"
          .value=${this._end}
          ?disabled=${busy}
          @input=${(e3) => {
      this._end = e3.target.value;
    }}
        />
        <p class="hint">0° = Kuzey, 90° = Doğu, 180° = Güney, 270° = Batı</p>
        <div class="actions">
          <button class="run" type="button" ?disabled=${!canRun} @click=${this._run}>
            ${busy ? "İşleniyor..." : "Çalıştır"}
          </button>
        </div>
        ${this._message ? b`<p class="status ${this._status}">${this._message}</p>` : null}
      </div>
    `;
  }
};
TucbsWedgeBufferTool.styles = [geoToolStyles, analysisHelpStyles];
__decorateClass$a([
  n$1()
], TucbsWedgeBufferTool.prototype, "mapElementId", 2);
__decorateClass$a([
  n$1({ attribute: false })
], TucbsWedgeBufferTool.prototype, "map", 2);
__decorateClass$a([
  n$1({ attribute: "custom-css" })
], TucbsWedgeBufferTool.prototype, "customCss", 2);
__decorateClass$a([
  r()
], TucbsWedgeBufferTool.prototype, "_label", 2);
__decorateClass$a([
  r()
], TucbsWedgeBufferTool.prototype, "_distance", 2);
__decorateClass$a([
  r()
], TucbsWedgeBufferTool.prototype, "_start", 2);
__decorateClass$a([
  r()
], TucbsWedgeBufferTool.prototype, "_end", 2);
__decorateClass$a([
  r()
], TucbsWedgeBufferTool.prototype, "_status", 2);
__decorateClass$a([
  r()
], TucbsWedgeBufferTool.prototype, "_message", 2);
__decorateClass$a([
  r()
], TucbsWedgeBufferTool.prototype, "_helpOpen", 2);
__decorateClass$a([
  r()
], TucbsWedgeBufferTool.prototype, "_picking", 2);
TucbsWedgeBufferTool = __decorateClass$a([
  t$3("tucbs-wedge-buffer-tool")
], TucbsWedgeBufferTool);
var __defProp$8 = Object.defineProperty;
var __getOwnPropDesc$9 = Object.getOwnPropertyDescriptor;
var __decorateClass$9 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$9(target, key) : target;
  for (var i4 = decorators.length - 1, decorator; i4 >= 0; i4--)
    if (decorator = decorators[i4])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$8(target, key, result);
  return result;
};
const TOOLS = [
  { id: "sinir", label: "Sınır" },
  { id: "tampon", label: "Tampon" },
  { id: "kirp", label: "Kırp" },
  { id: "fark", label: "Fark" },
  { id: "kesisim", label: "Kesişim" },
  { id: "cikarma", label: "Çıkarma" },
  { id: "birlestir", label: "Birleştir" },
  { id: "kama", label: "Kama Tampon" }
];
let TucbsAnalysisPanel = class extends i$3 {
  constructor() {
    super(...arguments);
    this.mapElementId = "";
    this.customCss = "";
    this._activeTool = null;
    this._customCssState = { sheet: null };
  }
  /** `customCss` degistiginde ozel CSS'i shadow DOM'a yeniden uygular. */
  updated(changed) {
    if (changed.has("customCss")) {
      applyCustomCss(
        this.shadowRoot,
        this.customCss,
        this._customCssState,
        "tucbs-analysis-panel"
      );
    }
  }
  _openTool(id) {
    this._activeTool = id;
  }
  _backToList() {
    this._activeTool = null;
  }
  /**
   * Aktif aracı temizler; panel araç listesine döner.
   *
   * @example
   * ```ts
   * analysisPanel.resetActiveTool();
   * ```
   */
  // TucbsAnalysisTool, slide-over panel "← Analiz" oku yerine DOGRUDAN
  // kapatildiginda (X butonu veya toolbar'daki ana butona tekrar basilinca)
  // cagirir -- aktif aracin (varsa) <tucbs-buffer-tool>/<tucbs-intersection-tool>
  // DOM'dan kaldirilmasini saglar, boylece o aracin disconnectedCallback'i
  // InteractionManager.resumeIdentify()'i tetikler. Bu cagri olmasaydi
  // kullanici paneli "geri" oku yerine dogrudan kapattiginda arac DOM'da
  // (gorunmez ama BAGLI) kalir, identify SONSUZA KADAR suspend edilmis
  // kalirdi (bkz kullanici geri bildirimi: "hic geri gelmiyor").
  resetActiveTool() {
    this._activeTool = null;
  }
  _renderToolList() {
    return b`
      <div class="shell">
        <h3 class="heading">Coğrafi Analiz</h3>
        <p class="hint">Bir araç seçin.</p>
        <ul class="tool-list">
          ${TOOLS.map(
      (t3) => b`
              <li>
                <button type="button" @click=${() => this._openTool(t3.id)}>
                  ${t3.label}
                </button>
              </li>
            `
    )}
        </ul>
      </div>
    `;
  }
  _toolTag() {
    switch (this._activeTool) {
      case "sinir":
        return "tucbs-boundary-tool";
      case "tampon":
        return "tucbs-buffer-tool";
      case "kirp":
        return "tucbs-clip-tool";
      case "fark":
        return "tucbs-difference-tool";
      case "kesisim":
        return "tucbs-intersection-tool";
      case "cikarma":
        return "tucbs-subtract-tool";
      case "birlestir":
        return "tucbs-union-tool";
      case "kama":
        return "tucbs-wedge-buffer-tool";
      default:
        return "";
    }
  }
  /** Seçilen coğrafi işlem formunu geri okuyla açar. */
  _renderActiveTool() {
    const tag = this._toolTag();
    if (!tag) return null;
    return b`
      <div class="shell">
        <button
          type="button"
          class="back"
          aria-label="Araç listesine dön"
          title="Geri"
          @click=${this._backToList}
        >←</button>
        ${tag === "tucbs-boundary-tool" ? b`<tucbs-boundary-tool .map=${this.map} .mapElementId=${this.mapElementId}></tucbs-boundary-tool>` : tag === "tucbs-buffer-tool" ? b`<tucbs-buffer-tool .map=${this.map} .mapElementId=${this.mapElementId}></tucbs-buffer-tool>` : tag === "tucbs-clip-tool" ? b`<tucbs-clip-tool .map=${this.map} .mapElementId=${this.mapElementId}></tucbs-clip-tool>` : tag === "tucbs-difference-tool" ? b`<tucbs-difference-tool .map=${this.map} .mapElementId=${this.mapElementId}></tucbs-difference-tool>` : tag === "tucbs-intersection-tool" ? b`<tucbs-intersection-tool .map=${this.map} .mapElementId=${this.mapElementId}></tucbs-intersection-tool>` : tag === "tucbs-subtract-tool" ? b`<tucbs-subtract-tool .map=${this.map} .mapElementId=${this.mapElementId}></tucbs-subtract-tool>` : tag === "tucbs-union-tool" ? b`<tucbs-union-tool .map=${this.map} .mapElementId=${this.mapElementId}></tucbs-union-tool>` : b`<tucbs-wedge-buffer-tool .map=${this.map} .mapElementId=${this.mapElementId}></tucbs-wedge-buffer-tool>`}
      </div>
    `;
  }
  /** Aktif araç varsa onu (geri okuyla birlikte), yoksa araç seçim listesini render eder. */
  render() {
    if (this._activeTool) {
      return this._renderActiveTool();
    }
    return this._renderToolList();
  }
};
TucbsAnalysisPanel.styles = i$6`
    :host {
      display: block;
      box-sizing: border-box;
      font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
      color: #111827;
      font-size: 13px;
    }

    .shell {
      padding: 8px 12px;
      background: #fff;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
    }

    .heading {
      margin: 0 0 8px;
      font-size: 16px;
      font-weight: 600;
    }

    .hint {
      margin: 0 0 12px;
      font-size: 12.5px;
      color: #6b7280;
    }

    .tool-list {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .tool-list button {
      width: 100%;
      text-align: left;
      padding: 10px 12px;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      background: #f9fafb;
      font: inherit;
      font-weight: 600;
      cursor: pointer;
      color: #111827;
    }

    .tool-list button:hover {
      background: #eff6ff;
      border-color: #bfdbfe;
    }

    .back {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 2.25rem;
      height: 2.25rem;
      margin: 0 0 10px;
      padding: 0;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      background: #f9fafb;
      font: inherit;
      font-size: 1.15rem;
      line-height: 1;
      cursor: pointer;
      color: #111827;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
    }

    .back:hover {
      background: #eff6ff;
      border-color: #93c5fd;
      color: #1d4ed8;
    }

    .back:focus-visible {
      outline: 2px solid #2563eb;
      outline-offset: 2px;
    }
  `;
__decorateClass$9([
  n$1()
], TucbsAnalysisPanel.prototype, "mapElementId", 2);
__decorateClass$9([
  n$1({ attribute: false })
], TucbsAnalysisPanel.prototype, "map", 2);
__decorateClass$9([
  n$1({ attribute: "custom-css" })
], TucbsAnalysisPanel.prototype, "customCss", 2);
__decorateClass$9([
  r()
], TucbsAnalysisPanel.prototype, "_activeTool", 2);
TucbsAnalysisPanel = __decorateClass$9([
  t$3("tucbs-analysis-panel")
], TucbsAnalysisPanel);
var __defProp$7 = Object.defineProperty;
var __getOwnPropDesc$8 = Object.getOwnPropertyDescriptor;
var __decorateClass$8 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$8(target, key) : target;
  for (var i4 = decorators.length - 1, decorator; i4 >= 0; i4--)
    if (decorator = decorators[i4])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$7(target, key, result);
  return result;
};
const ICON_ANALYSIS = o$1(iconNodeToString(_16_default$z));
const EMBED_ANALYSIS_PANEL_CSS = `
  :host {
    position: static !important;
    inset: auto !important;
    z-index: auto !important;
  }
  .shell {
    border: none;
    padding: 0;
    background: transparent;
  }
`;
const EXCLUSIVE_DRAW_SOURCES = /* @__PURE__ */ new Set(["draw", "measure"]);
let TucbsAnalysisTool = class extends i$3 {
  constructor() {
    super(...arguments);
    this.mapElementId = "";
    this.panelWidth = "360px";
    this.customCss = "";
    this._open = false;
    this._layoutController = new PanelLayoutController(this);
    this._panelEl = null;
    this._customCssState = { sheet: null };
    this._onDrawStart = ({ source }) => {
      if (this._open && source !== void 0 && EXCLUSIVE_DRAW_SOURCES.has(source)) this._toggle();
    };
  }
  /** Analiz panelini (`tucbs-slide-over-panel`) `document.body`'ye ekler ve içeriğini ilk kez render eder. */
  connectedCallback() {
    super.connectedCallback();
    this._layoutController.onExclusiveClose = () => {
      if (this._open) this._toggle();
    };
    const panel = document.createElement("tucbs-slide-over-panel");
    panel.panelTitle = "Coğrafi Analiz";
    panel.panelWidth = this.panelWidth;
    panel.onCloseRequest = () => this._toggle();
    document.body.appendChild(panel);
    this._panelEl = panel;
    this._renderIntoPanel();
  }
  /** Bileşen DOM'dan kaldırıldığında haritadan bağ çözer ve panel elementini DOM'dan kaldırır. */
  disconnectedCallback() {
    var _a2;
    if (this.map) {
      this._layoutController.unbindMap(this.map);
      this._unbindDrawingManager(this.map.drawingManager);
    }
    (_a2 = this._panelEl) == null ? void 0 : _a2.remove();
    this._panelEl = null;
    super.disconnectedCallback();
  }
  /** İlk render sonrası `map`i (programatik atanmadıysa) `mapElementId` üzerinden haritaya bağlar. */
  firstUpdated() {
    bindMapByElementId(this, {
      noIdTiming: "raf",
      noIdMessage: '[tucbs-analysis-tool] "mapElementId" verilmedi ve "map" atanmadı; analiz paneli haritaya bağlanamayabilir.',
      missingElementMessage: (mapElementId) => `[tucbs-analysis-tool] mapElementId="${mapElementId}" bulunamadı.`
    });
  }
  /** `customCss`/`map`/`panelWidth` değişimlerini işler (shadow DOM'a stil uygulama, layout bağlama/panel genişliği) ve panel içeriğini yeniden render eder. */
  updated(changed) {
    if (changed.has("customCss")) {
      applyCustomCss(this.shadowRoot, this.customCss, this._customCssState, "tucbs-analysis-tool");
    }
    if (changed.has("map")) {
      const previous = changed.get("map");
      if (previous) {
        this._layoutController.unbindMap(previous);
        this._unbindDrawingManager(previous.drawingManager);
      }
      if (this.map) {
        this._layoutController.bindMap(this.map);
        this._bindDrawingManager(this.map.drawingManager);
      }
    }
    if (changed.has("panelWidth") && this._open) {
      this._layoutController.setOpen(true, this.panelWidth);
    }
    if (this._panelEl) this._panelEl.panelWidth = this.panelWidth;
    this._renderIntoPanel();
  }
  _renderIntoPanel() {
    if (!this._panelEl) return;
    this._panelEl.open = this._open;
    D(
      b`
        <span slot="icon" style="display:inline-flex;align-items:center;justify-content:center;line-height:0;width:1.25rem;height:1.25rem">${ICON_ANALYSIS}</span>
        <tucbs-analysis-panel
          .map=${this.map}
          .mapElementId=${this.mapElementId}
          custom-css=${EMBED_ANALYSIS_PANEL_CSS}
        ></tucbs-analysis-panel>
      `,
      this._panelEl
    );
  }
  _bindDrawingManager(drawingManager) {
    drawingManager.on("draw:start", this._onDrawStart);
  }
  _unbindDrawingManager(drawingManager) {
    drawingManager.off("draw:start", this._onDrawStart);
  }
  _toggle() {
    var _a2, _b, _c;
    this._open = !this._open;
    if (this._open) {
      (_a2 = this.map) == null ? void 0 : _a2.drawingManager.deactivate();
    } else {
      (_c = (_b = this._panelEl) == null ? void 0 : _b.querySelector("tucbs-analysis-panel")) == null ? void 0 : _c.resetActiveTool();
    }
    this._layoutController.setOpen(this._open, this.panelWidth);
    this._renderIntoPanel();
  }
  /** Toolbar'daki dairesel "Coğrafi Analiz" butonunu render eder. */
  render() {
    return b`
      <button
        type="button"
        class="tool-button ${this._open ? "active" : ""}"
        aria-label="Coğrafi Analiz"
        data-tooltip="Coğrafi Analiz"
        aria-pressed=${this._open}
        @click=${this._toggle}
      >
        ${ICON_ANALYSIS}
      </button>
    `;
  }
};
TucbsAnalysisTool.styles = [
  leftTooltipStyles,
  i$6`
    :host {
      display: inline-flex;
      font-family: "IBM Plex Sans", system-ui, sans-serif;
      font-size: 0.875rem;
      color: var(--cds-text-primary, #161616);
      --cds-focus: transparent;
    }

    .tool-button {
      width: 2.25rem;
      height: 2.25rem;
      border-radius: 50%;
      border: 1px solid var(--cds-border-subtle, #e0e0e0);
      background: var(--cds-layer-01, #ffffff);
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      cursor: pointer;
      color: var(--cds-text-primary, #161616);
    }

    .tool-button:hover {
      background: var(--cds-layer-hover-01, #e8e8e8);
    }

    .tool-button.active {
      background: var(--cds-background-selected, #e0e0e0);
      border-color: var(--cds-border-strong-01, #8d8d8d);
    }

    .tool-button svg {
      width: 1rem;
      height: 1rem;
    }
  `
];
__decorateClass$8([
  n$1()
], TucbsAnalysisTool.prototype, "mapElementId", 2);
__decorateClass$8([
  n$1({ attribute: "panel-width" })
], TucbsAnalysisTool.prototype, "panelWidth", 2);
__decorateClass$8([
  n$1({ attribute: "custom-css" })
], TucbsAnalysisTool.prototype, "customCss", 2);
__decorateClass$8([
  n$1({ attribute: false })
], TucbsAnalysisTool.prototype, "map", 2);
__decorateClass$8([
  r()
], TucbsAnalysisTool.prototype, "_open", 2);
TucbsAnalysisTool = __decorateClass$8([
  t$3("tucbs-analysis-tool")
], TucbsAnalysisTool);
var __defProp$6 = Object.defineProperty;
var __getOwnPropDesc$7 = Object.getOwnPropertyDescriptor;
var __decorateClass$7 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$7(target, key) : target;
  for (var i4 = decorators.length - 1, decorator; i4 >= 0; i4--)
    if (decorator = decorators[i4])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$6(target, key, result);
  return result;
};
const POSITION_STYLES = {
  "right-center": { top: "50%", right: "1rem", bottom: "", left: "", transform: "translateY(-50%)" },
  "top-right": { top: "1rem", right: "1rem", bottom: "", left: "", transform: "" },
  "bottom-right": { bottom: "1rem", right: "1rem", top: "", left: "", transform: "" },
  "top-center": { top: "1rem", left: "50%", right: "", bottom: "", transform: "translateX(-50%)" },
  "top-left": { top: "1rem", left: "1rem", right: "", bottom: "", transform: "" },
  "bottom-left": { bottom: "1rem", left: "1rem", top: "", right: "", transform: "" },
  "left-center": { top: "50%", left: "1rem", right: "", bottom: "", transform: "translateY(-50%)" }
};
const BUILTIN_TOOLS = {
  zoom: "tucbs-zoom-tool",
  "goto-coordinate": "tucbs-goto-coordinate",
  draw: "tucbs-draw-tool",
  delete: "tucbs-delete-tool",
  measure: "tucbs-measure-tool",
  "map-export": "tucbs-map-export",
  settings: "tucbs-settings-tool",
  print: "tucbs-print-tool",
  analysis: "tucbs-analysis-tool"
};
const CUSTOM_ELEMENT_NAME_PATTERN = /^[a-z][a-z0-9]*(-[a-z0-9]+)+$/;
let TucbsToolbar = class extends i$3 {
  constructor() {
    super(...arguments);
    this.mapElementId = "";
    this.position = "right-center";
    this.tools = "zoom";
    this.customTools = {};
    this.toolProps = {};
    this.customCss = "";
    this._customCssState = { sheet: null };
    this._timers = new TimerBag(this);
  }
  // === JS-only Methods (calisma zamaninda arac ekleme/cikarma) ===
  /**
   * `tools` listesine bir arac id'si ekler (verilirse `index` konumuna, aksi halde sona).
   *
   * @param id - Eklenecek arac id'si.
   * @param index - Opsiyonel eklenecegi konum; verilmezse listenin sonuna eklenir.
   *
   * @example
   * ```ts
   * toolbar.addTool("delete");
   * ```
   */
  addTool(id, index) {
    const list = this._toolIds();
    if (index === void 0) list.push(id);
    else list.splice(index, 0, id);
    this.tools = list.join(",");
  }
  /**
   * `tools` listesinden verilen id'yi cikarir.
   *
   * @param id - Cikarilacak arac id'si.
   *
   * @example
   * ```ts
   * toolbar.removeTool("measure");
   * ```
   */
  removeTool(id) {
    this.tools = this._toolIds().filter((existing) => existing !== id).join(",");
  }
  /**
   * Bir arac id'sini ozel bir custom element etiket adina baglar.
   *
   * @param id - Baglanacak arac id'si.
   * @param tagName - Kayit edilecek custom element etiket adi (gecerli bir custom-element adi olmalidir).
   *
   * @example
   * ```ts
   * toolbar.registerTool("my-tool", "my-custom-element");
   * toolbar.addTool("my-tool");
   * ```
   */
  // `tools`'a ayrica addTool(id) ile eklenmedikce bu KAYIT tek basina hicbir
  // sey render ETMEZ -- `tools` "ne gosterilecek/hangi sirada", `customTools`
  // "o ID hangi etikete karsilik gelir" sorusunu cevaplar, ikisi ayri
  // kaygilardir.
  registerTool(id, tagName) {
    if (!CUSTOM_ELEMENT_NAME_PATTERN.test(tagName)) {
      console.warn(
        `[tucbs-toolbar] registerTool("${id}", "${tagName}") -- gecersiz custom element adi, yok sayildi.`
      );
      return;
    }
    this.customTools = { ...this.customTools, [id]: tagName };
  }
  /**
   * Belirli bir arac id'sine ek property'ler atar (ör. `{tools:"point,polygon"}`).
   *
   * @param id - Property'lerin atanacagi arac id'si.
   * @param props - Ilgili arac component'ine dogrudan atanacak property'ler.
   *
   * @example
   * ```ts
   * toolbar.setToolProps("draw", { tools: "point,polygon" });
   * ```
   */
  // registerTool() ile AYNI JS-API deseni, `tool-props` attribute'unun
  // programatik esdegeri.
  setToolProps(id, props) {
    this.toolProps = { ...this.toolProps, [id]: props };
  }
  _toolIds() {
    return this.tools.split(",").map((id) => id.trim()).filter(Boolean);
  }
  // Gercek render icin kullanilacak etiket adini dondurur -- customTools
  // (registerTool() VEYA custom-tools attribute'u ile gelmis olabilir, HER
  // IKI yol da ayni property'ye yazdigindan burada tek noktadan dogrulanir)
  // BUILTIN_TOOLS'un onune gecer. Gecersiz bir custom-element adi (attribute
  // JSON'undan dogrudan gelmis, registerTool()'un regex kontrolunu atlamis
  // olabilir) burada da reddedilir -- tek gercek kapi budur.
  _tagFor(id) {
    const tagName = this.customTools[id] ?? BUILTIN_TOOLS[id];
    if (tagName && !CUSTOM_ELEMENT_NAME_PATTERN.test(tagName)) return void 0;
    return tagName;
  }
  /** `position` değiştiğinde host'a ilgili sabit-konum stillerini uygular; `tools`/`customTools` değiştiğinde bilinmeyen/geçersiz arac id'leri için uyarı loglar. */
  willUpdate(changed) {
    if (changed.has("position")) {
      Object.assign(this.style, POSITION_STYLES[this.position]);
    }
    if (changed.has("tools") || changed.has("customTools")) {
      const unknown = this._toolIds().filter((id) => !this._tagFor(id));
      if (unknown.length > 0) {
        console.warn(
          `[tucbs-toolbar] Bilinmeyen/gecersiz arac id'leri: ${unknown.join(", ")} -- yok sayildi (registerTool() ile kayit edilmedi ya da gecersiz etiket adi).`
        );
      }
    }
  }
  // === Yasam Dongusu: Map baglama ===
  /**
   * Ilk render'dan sonra haritaya baglanmayi dener: `map` disaridan zaten
   * atanmamissa `mapElementId` ile eslesen `tucbs-map` elementini bulup
   * hazir oldugunda `map` property'sini otomatik doldurur (Senaryo 2).
   */
  firstUpdated() {
    if (this.map) return;
    if (!this.mapElementId) {
      if (this.closest("tucbs-app")) return;
      this._timers.requestAnimationFrame(() => {
        if (this.map) return;
        console.warn(
          '[tucbs-toolbar] "mapElementId" verilmedi ve "map" programatik olarak atanmadi; bilesen haritaya baglanamadigi icin icerdeki araclar islevsiz kalacak.'
        );
      });
      return;
    }
    const mapEl = document.getElementById(this.mapElementId);
    if (!mapEl) {
      console.warn(
        `[tucbs-toolbar] mapElementId="${this.mapElementId}" ile eslesen bir element bulunamadi; bilesen haritaya baglanamadigi icin icerdeki araclar islevsiz kalacak.`
      );
      return;
    }
    whenTucbsMapReady(mapEl, (host) => {
      if (host.map) {
        this.map = host.map;
      }
    });
  }
  _renderTool(id) {
    const tagName = this._tagFor(id);
    if (!tagName) return null;
    const tag = s(tagName);
    return u`<${tag} data-tool-id=${id} .map=${this.map}></${tag}>`;
  }
  // toolProps'taki her giris icin ilgili alt-arac elementini `data-tool-id`
  // ile bulup property'lerini DOGRUDAN atar (Object.assign) -- HTML string
  // birlestirme YOK, bu yuzden customTools'taki gibi ayri bir dogrulamaya
  // ihtiyac yok. Idempotent: ayni degerlerin tekrar atanmasi zararsizdir,
  // bu yuzden her `updated()` sonrasi guvenle tekrar cagrilabilir.
  _applyToolProps() {
    for (const [id, props] of Object.entries(this.toolProps)) {
      const el = this.renderRoot.querySelector(`[data-tool-id="${id}"]`);
      if (el) Object.assign(el, props);
    }
  }
  /** `customCss` değiştiğinde özel CSS'i shadow DOM'a uygular; `toolProps`/`map`/`tools`/`customTools` değiştiğinde alt araçların property'lerini yeniden atar. */
  updated(changed) {
    if (changed.has("customCss")) {
      applyCustomCss(this.shadowRoot, this.customCss, this._customCssState, "tucbs-toolbar");
    }
    if (changed.has("toolProps") || changed.has("map") || changed.has("tools") || changed.has("customTools")) {
      this._applyToolProps();
    }
  }
  /**
   * `map` henuz atanmamissa hicbir sey render etmez; atanmissa `tools`
   * listesindeki her arac id'sini sirasiyla ilgili custom element olarak render eder.
   */
  render() {
    if (!this.map) {
      return A;
    }
    return u` <div class="toolbar">${this._toolIds().map((id) => this._renderTool(id))}</div> `;
  }
};
TucbsToolbar.styles = i$6`
    :host {
      position: fixed;
      z-index: 1000;
      display: block;
    }

    .toolbar {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
  `;
__decorateClass$7([
  n$1()
], TucbsToolbar.prototype, "mapElementId", 2);
__decorateClass$7([
  n$1()
], TucbsToolbar.prototype, "position", 2);
__decorateClass$7([
  n$1()
], TucbsToolbar.prototype, "tools", 2);
__decorateClass$7([
  n$1({ type: Object, attribute: "custom-tools" })
], TucbsToolbar.prototype, "customTools", 2);
__decorateClass$7([
  n$1({ type: Object, attribute: "tool-props" })
], TucbsToolbar.prototype, "toolProps", 2);
__decorateClass$7([
  n$1({ attribute: "custom-css" })
], TucbsToolbar.prototype, "customCss", 2);
__decorateClass$7([
  n$1({ attribute: false })
], TucbsToolbar.prototype, "map", 2);
TucbsToolbar = __decorateClass$7([
  t$3("tucbs-toolbar")
], TucbsToolbar);
const APP_BRAND_LOGO_DATA_URI = "data:image/png;base64,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";
var __defProp$5 = Object.defineProperty;
var __getOwnPropDesc$6 = Object.getOwnPropertyDescriptor;
var __decorateClass$6 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$6(target, key) : target;
  for (var i4 = decorators.length - 1, decorator; i4 >= 0; i4--)
    if (decorator = decorators[i4])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$5(target, key, result);
  return result;
};
const SCALE_RETRY_MS = 250;
let TucbsInfoBar = class extends i$3 {
  constructor() {
    super(...arguments);
    this.mapElementId = "";
    this.customCss = "";
    this.attribution = "EPSG:4326 Altlık Harita, Harita Genel Müdürlüğü (HGM) tarafından sağlanmaktadır.";
    this.showBrand = true;
    this._customCssState = { sheet: null };
    this._lon = null;
    this._lat = null;
    this._height = null;
    this._scale = null;
    this._fallbackAttribution = null;
    this._basemapUnavailable = false;
    this._onFallbackShown = ({ attribution }) => {
      this._fallbackAttribution = attribution;
    };
    this._onFallbackHidden = () => {
      this._fallbackAttribution = null;
    };
    this._onBasemapError = () => {
      this._basemapUnavailable = true;
    };
    this._onBasemapRecovered = () => {
      this._basemapUnavailable = false;
    };
    this._onLayerAdd = ({ layer }) => {
      if (layer.isBasemap) this._basemapUnavailable = false;
    };
    this._mouseMoveRaf = null;
    this._pendingMouseDetail = null;
    this._cameraRaf = null;
    this._timers = new TimerBag(this);
    this._onMapMouseMove = (detail) => {
      this._pendingMouseDetail = detail;
      if (this._mouseMoveRaf !== null) return;
      this._mouseMoveRaf = this._timers.requestAnimationFrame(() => {
        this._mouseMoveRaf = null;
        const pending = this._pendingMouseDetail;
        if (!pending) return;
        const [lon, lat] = pending.position;
        this._lon = lon;
        this._lat = lat;
        this._height = this._hasTerrain() ? this._sampleHeight(lon, lat) : null;
      });
    };
    this._onCameraChanged = () => {
      if (this._cameraRaf !== null) return;
      this._cameraRaf = this._timers.requestAnimationFrame(() => {
        this._cameraRaf = null;
        this._scale = this._computeScale();
      });
    };
    this._lastScaleRetry = 0;
    this._onPostRender = () => {
      var _a2, _b;
      const camera = (_a2 = this.interactionManager) == null ? void 0 : _a2.camera;
      if (!camera) return;
      if ((_b = this._lastCameraPosition) == null ? void 0 : _b.equals(camera.positionWC)) {
        if (this._scale !== null) return;
        const now = performance.now();
        if (now - this._lastScaleRetry < SCALE_RETRY_MS) return;
        this._lastScaleRetry = now;
      }
      this._lastCameraPosition = camera.positionWC.clone(this._lastCameraPosition);
      this._onCameraChanged();
    };
  }
  /**
   * `interactionManager` ya da `map` disaridan verilmemisse, `mapElementId` ile
   * bulunan `tucbs-map` elementinin hazir olmasini bekleyip ondan alir.
   */
  firstUpdated() {
    if (this.interactionManager && this.map || !this.mapElementId) return;
    const mapEl = document.getElementById(this.mapElementId);
    if (!mapEl) return;
    whenTucbsMapReady(mapEl, (host) => {
      if (host.interaction && !this.interactionManager) {
        this.interactionManager = host.interaction;
      }
      if (host.map && !this.map) {
        this.map = host.map;
      }
    });
  }
  /**
   * `customCss` degistiginde ozel stili shadow DOM'a uygular; `interactionManager`
   * ya da `map` degistiginde onceki referanstan olay dinleyicilerini kaldirip yenisine baglar.
   */
  updated(changed) {
    var _a2, _b;
    if (changed.has("customCss")) {
      applyCustomCss(this.shadowRoot, this.customCss, this._customCssState, "tucbs-info-bar");
    }
    if (changed.has("map")) {
      const previousMap = changed.get("map");
      if (previousMap) this._unbindMap(previousMap);
      if (this.map) this._bindMap(this.map);
      this._fallbackAttribution = ((_a2 = this.map) == null ? void 0 : _a2.fallbackAttribution) ?? null;
      this._basemapUnavailable = ((_b = this.map) == null ? void 0 : _b.basemapStatus) === "unavailable";
    }
    if (!changed.has("interactionManager")) return;
    const previous = changed.get("interactionManager");
    if (previous) this._unbind(previous);
    if (this.interactionManager) {
      this._bind(this.interactionManager);
      this._scale = this._computeScale();
    }
  }
  // Panel yerlesimine (Katman Yonetimi/Ayarlar acikken haritayla ayni
  // daralma) kendini kaydeder -- tucbs-app cubugu gizleyip yeniden
  // gosterdiginde yeni eleman da yerlesimi alsin diye (backlog B21).
  /** DOM'a bağlandığında panel yerleşimine kaydolur; açık bir panel varsa hemen ona göre daralır. */
  connectedCallback() {
    super.connectedCallback();
    registerLayoutTarget(this);
  }
  /** Baglanti kesildiginde olay dinleyicilerini, bekleyen animation frame'leri ve panel yerlesimi kaydini temizler. */
  disconnectedCallback() {
    unregisterLayoutTarget(this);
    if (this.interactionManager) this._unbind(this.interactionManager);
    if (this.map) this._unbindMap(this.map);
    super.disconnectedCallback();
  }
  _bind(interactionManager) {
    this._removePostRender = interactionManager.scene.postRender.addEventListener(this._onPostRender);
    interactionManager.on("map:mousemove", this._onMapMouseMove);
    interactionManager.on("camera:changed", this._onCameraChanged);
    interactionManager.on("camera:moveEnd", this._onCameraChanged);
  }
  _unbind(interactionManager) {
    var _a2;
    (_a2 = this._removePostRender) == null ? void 0 : _a2.call(this);
    this._removePostRender = void 0;
    interactionManager.off("map:mousemove", this._onMapMouseMove);
    interactionManager.off("camera:changed", this._onCameraChanged);
    interactionManager.off("camera:moveEnd", this._onCameraChanged);
  }
  _bindMap(map) {
    map.layerManager.on("basemap:fallback-shown", this._onFallbackShown);
    map.layerManager.on("basemap:fallback-hidden", this._onFallbackHidden);
    map.layerManager.on("basemap:error", this._onBasemapError);
    map.layerManager.on("basemap:recovered", this._onBasemapRecovered);
    map.layerManager.on("layer:add", this._onLayerAdd);
  }
  _unbindMap(map) {
    map.layerManager.off("basemap:fallback-shown", this._onFallbackShown);
    map.layerManager.off("basemap:fallback-hidden", this._onFallbackHidden);
    map.layerManager.off("basemap:error", this._onBasemapError);
    map.layerManager.off("basemap:recovered", this._onBasemapRecovered);
    map.layerManager.off("layer:add", this._onLayerAdd);
  }
  /**
   * Sagdaki atif metni: `attribution`, yedek goruntu gosteriliyorsa yanina kaynagi.
   * Altlik kesin basarisizsa ekranda yalniz yedek goruntu oldugundan `attribution` atlanir.
   */
  _attributionText() {
    if (!this._fallbackAttribution) return this.attribution;
    const fallback = `Yedek görüntü: ${this._fallbackAttribution}`;
    if (this._basemapUnavailable) return fallback;
    return [this.attribution, fallback].filter(Boolean).join(" · ");
  }
  // WHY (backlog B22): Core Map, Viewer'a arazi kaynagi vermez; Cesium
  // varsayilan olarak duz elipsoidi (EllipsoidTerrainProvider) kullanir.
  // globe.getHeight() o durumda elipsoidi yaklasiklayan duz ucgenli KARO
  // AGINI okur ve kamera uzakligina gore eksi/0 anlamsiz degerler verir
  // (canli: "Yukseklik -32 m"; Ankara ~900 m iken "0 m"). Bu yuzden gercek
  // bir arazi kaynagi yokken yukseklik hic gosterilmez (kullanici karari
  // 2026-10-21, secenek A).
  /** Sahnede gerçek bir arazi (yükseklik) kaynağı var mı; düz elipsoit ya da sahne yoksa `false`. */
  _hasTerrain() {
    var _a2;
    const terrainProvider = (_a2 = this.interactionManager) == null ? void 0 : _a2.scene.terrainProvider;
    return !!terrainProvider && !(terrainProvider instanceof EllipsoidTerrainProvider);
  }
  // O karo icin arazi verisi henuz gelmemisse null ("–"); 0 DEGIL.
  _sampleHeight(lon, lat) {
    var _a2;
    const globe = (_a2 = this.interactionManager) == null ? void 0 : _a2.scene.globe;
    if (!globe) return null;
    return globe.getHeight(Cartographic.fromDegrees(lon, lat)) ?? null;
  }
  // Olcegi zoom adimlariyla AYNI olcumden (core measureGround) alir; basamaga
  // cok yakinsa tam basamak olarak gosterir (1/2.499.843 yerine 1/2.500).
  _computeScale() {
    var _a2;
    const scene = (_a2 = this.interactionManager) == null ? void 0 : _a2.scene;
    if (!scene) return null;
    const ground = measureGround(scene);
    return ground ? snapScaleForDisplay(ground.scale) : null;
  }
  _formatLat() {
    if (this._lat === null) return "–";
    const suffix = this._lat >= 0 ? "N" : "S";
    return `Enlem ${Math.abs(this._lat).toFixed(5)}° ${suffix}`;
  }
  _formatLon() {
    if (this._lon === null) return "–";
    const suffix = this._lon >= 0 ? "E" : "W";
    return `Boylam ${Math.abs(this._lon).toFixed(5)}° ${suffix}`;
  }
  _formatHeight() {
    if (this._height === null) return "–";
    return `Yükseklik ${Math.round(this._height)} m`;
  }
  _formatScale() {
    if (this._scale === null || !Number.isFinite(this._scale)) return "–";
    const formatted = Math.round(this._scale).toLocaleString("tr-TR");
    return `Ölçek 1/${formatted}`;
  }
  /** `interactionManager` yoksa hicbir sey render etmez; varsa koordinat/olcek satirini (gercek arazi verisi varsa yukseklikle) ve -- `showBrand` ise -- ustundeki logoyu cizer. */
  render() {
    if (!this.interactionManager) {
      return A;
    }
    return b`
      ${this.showBrand ? b`<div class="brand" aria-hidden="true">
            <img src=${APP_BRAND_LOGO_DATA_URI} alt="" />
            <span class="brand-name">
              <span>Ulusal Coğrafi</span>
              <span>Bilgi Platformu</span>
            </span>
          </div>` : A}
      <div class="bar">
        <div class="left">
          <span>${this._formatLat()}</span>
          <span>${this._formatLon()}</span>
          ${this._hasTerrain() ? b`<span>${this._formatHeight()}</span>` : A}
          <span>${this._formatScale()}</span>
        </div>
        <div class="right">${this._attributionText()}</div>
      </div>
    `;
  }
};
TucbsInfoBar.styles = i$6`
    :host {
      position: fixed;
      left: 0;
      bottom: 0;
      z-index: 900;
      display: block;
      box-sizing: border-box;
      width: 100%;
      height: 28px;
      font-family: "IBM Plex Sans", system-ui, sans-serif;
      font-size: 0.75rem;
      /* Bar, Cesium canvas'inin uzerine bindigi icin altindaki
         pan/zoom etkilesimini bloklamamasi gerekir. */
      pointer-events: none;
    }

    /* Gorsel govde bilerek :host'tan ayri bir class'ta -- boylece tuketici
       customCss ile bunu ozellestirirken :host (custom property inheritance
       riski tasir) yerine sadece bu class'i hedefler. */
    .bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      padding: 0 0.75rem;
      background: rgba(38, 38, 38, 0.85);
      color: #f4f4f4;
    }

    .left {
      display: flex;
      align-items: center;
      gap: 1.25rem;
      overflow: hidden;
      white-space: nowrap;
    }

    .right {
      flex: none;
      margin-left: 1rem;
      color: #c6c6c6;
      white-space: nowrap;
    }

    /* Sag alttaki seffaf logo + uygulama adi; cubugun ustune tasar. :host
       pointer-events:none oldugu icin harita etkilesimini bloklamaz. */
    .brand {
      position: absolute;
      right: 1rem;
      bottom: calc(100% + 0.75rem);
      display: flex;
      align-items: center;
      gap: 0.5rem;
      opacity: 0.6;
      user-select: none;
      font-size: 0.875rem;
      line-height: 1.2;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      color: #393939;
    }

    .brand img {
      display: block;
      height: 40px;
      width: auto;
    }

    .brand-name {
      display: flex;
      flex-direction: column;
      white-space: nowrap;
    }
  `;
__decorateClass$6([
  n$1({ attribute: false })
], TucbsInfoBar.prototype, "interactionManager", 2);
__decorateClass$6([
  n$1({ attribute: false })
], TucbsInfoBar.prototype, "map", 2);
__decorateClass$6([
  n$1()
], TucbsInfoBar.prototype, "mapElementId", 2);
__decorateClass$6([
  n$1({ attribute: "custom-css" })
], TucbsInfoBar.prototype, "customCss", 2);
__decorateClass$6([
  n$1()
], TucbsInfoBar.prototype, "attribution", 2);
__decorateClass$6([
  n$1({ attribute: "show-brand", converter: defaultTrueAttribute })
], TucbsInfoBar.prototype, "showBrand", 2);
__decorateClass$6([
  r()
], TucbsInfoBar.prototype, "_lon", 2);
__decorateClass$6([
  r()
], TucbsInfoBar.prototype, "_lat", 2);
__decorateClass$6([
  r()
], TucbsInfoBar.prototype, "_height", 2);
__decorateClass$6([
  r()
], TucbsInfoBar.prototype, "_scale", 2);
__decorateClass$6([
  r()
], TucbsInfoBar.prototype, "_fallbackAttribution", 2);
__decorateClass$6([
  r()
], TucbsInfoBar.prototype, "_basemapUnavailable", 2);
TucbsInfoBar = __decorateClass$6([
  t$3("tucbs-info-bar")
], TucbsInfoBar);
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e2 = e$2(class extends i$2 {
  constructor(t3) {
    var _a2;
    if (super(t3), t3.type !== t$2.ATTRIBUTE || "class" !== t3.name || ((_a2 = t3.strings) == null ? void 0 : _a2.length) > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(t3) {
    return " " + Object.keys(t3).filter((s2) => t3[s2]).join(" ") + " ";
  }
  update(s2, [i4]) {
    var _a2, _b;
    if (void 0 === this.st) {
      this.st = /* @__PURE__ */ new Set(), void 0 !== s2.strings && (this.nt = new Set(s2.strings.join(" ").split(/\s/).filter((t3) => "" !== t3)));
      for (const t3 in i4) i4[t3] && !((_a2 = this.nt) == null ? void 0 : _a2.has(t3)) && this.st.add(t3);
      return this.render(i4);
    }
    const r2 = s2.element.classList;
    for (const t3 of this.st) t3 in i4 || (r2.remove(t3), this.st.delete(t3));
    for (const t3 in i4) {
      const s3 = !!i4[t3];
      s3 === this.st.has(t3) || ((_b = this.nt) == null ? void 0 : _b.has(t3)) || (s3 ? (r2.add(t3), this.st.add(t3)) : (r2.remove(t3), this.st.delete(t3)));
    }
    return E;
  }
});
function deferredMeasure(timers, fn) {
  timers.requestAnimationFrame(fn);
  timers.setTimeout(fn, 150);
}
const identifyPanelStyles = i$6`
  :host {
    display: block;
    font-family: "IBM Plex Sans", system-ui, sans-serif;
    font-size: 10px;
    color: var(--cds-text-primary, #161616);
    /* cds-accordion-item kendi shadow DOM'unda bu token'lari fallback'siz
       kullaniyor (orn. hover arka plani icin dogrudan var(--cds-layer-hover),
       virgullu fallback yok) — TucbsServiceUpload'daki ayni sebeple (bkz. o
       bilesendeki --cds-field/--cds-layer notu) Carbon'un "white" tema
       degerleriyle burada sabitliyoruz, aksi halde hover/ayirac cizgileri
       hic gorunmez. */
    --cds-layer-hover: #e8e8e8;
    --cds-border-subtle: #e0e0e0;
  }

  /* ── Basit koordinat karti (map:click) ─────────────────────────────── */

  .coord-card {
    position: fixed;
    top: 1rem;
    right: 1rem;
    z-index: 1000;
    display: flex;
    align-items: flex-start;
    gap: 0.625rem;
    width: 260px;
    padding: 0.75rem;
    box-sizing: border-box;
    background: #ffffff;
    border: 1px solid var(--cds-border-subtle, #e0e0e0);
    border-radius: 4px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  .coord-card[hidden] {
    display: none;
  }

  .coord-icon {
    display: inline-flex;
    flex: none;
    margin-top: 0.125rem;
    color: #0f62fe;
  }

  .coord-body {
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
    min-width: 0;
  }

  .coord-title {
    font-size: 0.875rem;
    font-weight: 600;
  }

  .coord-value {
    color: var(--cds-text-secondary, #525252);
  }

  .coord-close-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: none;
    width: 24px;
    height: 24px;
    margin-left: auto;
    border: none;
    border-radius: 4px;
    background: transparent;
    color: var(--cds-icon-secondary, #6f6f6f);
    cursor: pointer;
  }

  .coord-close-btn:hover {
    background: var(--cds-layer-hover-01, #f4f4f4);
    color: var(--cds-icon-primary, #161616);
  }

  /* ── WMS/WMTS GetFeatureInfo sorgusu surerken (imagery:querying) ────── */
  /* .coord-card ile ayni konum/gorunum -- ama "sonuc" degil "bekleniyor"
     oldugu ACIKCA anlasilsin diye konum ikonu yerine donen bir spinner
     kullanilir. Sorgu bitince (basarili/basarisiz) bu kart kaybolur ve
     yerine dogrudan sonuc (oznitelik paneli) veya koordinat karti gelir --
     arada asla "Koordinat" gibi nihai bir sonuc gorunmuyormus hissi
     vermez (bkz proje geri bildirimi: onceki "Sorgulanıyor…" metniyle
     koordinat kartinin AYNI kart olmasi kafa karistiriyordu).
  */
  .loading-card {
    position: fixed;
    top: 1rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
    display: flex;
    align-items: center;
    gap: 0.625rem;
    padding: 0.75rem 1rem;
    box-sizing: border-box;
    background: #ffffff;
    border: 1px solid var(--cds-border-subtle, #e0e0e0);
    border-radius: 4px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    font-size: 0.875rem;
    font-weight: 600;
  }

  .loading-card[hidden] {
    display: none;
  }

  .loading-spinner {
    flex: none;
    width: 16px;
    height: 16px;
    border: 2px solid var(--cds-border-subtle, #e0e0e0);
    border-top-color: #0f62fe;
    border-radius: 50%;
    animation: tucbs-identify-spin 0.8s linear infinite;
  }

  @keyframes tucbs-identify-spin {
    to {
      transform: rotate(360deg);
    }
  }

  /* ── Oznitelik tablosu diyalogu (entity:click) ─────────────────────── */

  .attr-panel {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1100;
    display: flex;
    flex-direction: column;
    /* Icerige gore JS ile olculup kilitlenen degisken genislik/yukseklik
       (bkz eski _syncPanelWidth/_syncItemBodyHeight) kullanicidan gelen
       acik geri bildirim uzerine kaldirildi -- ne gelirse gelsin SABIT
       720x640 kullanilir, tek istisna dar/kisa ekranlarda (max-width/
       max-height) tasmayi onlemek. Icerik kisa kalirsa (bkz .attr-body-wrap/
       .accordion-wrap "flex:1") footer HER ZAMAN panelin en altina
       sabitlenir, bosluk sadece govde alaninda kalir. */
    width: 720px;
    height: 640px;
    max-width: calc(100vw - 2rem);
    max-height: calc(100vh - 2rem);
    box-sizing: border-box;
    background: #ffffff;
    border: 1px solid var(--cds-border-subtle, #e0e0e0);
    border-radius: 4px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  .attr-panel[hidden] {
    display: none;
  }

  /* 5 (=IDENTIFY_PAGE_SIZE) veya daha az sonucta hicbir zaman sayfalama
     devreye girmedigi icin (bkz _isCompactPanel/_accordionPageCount) SABIT
     720x640 yerine icerigin GERCEK boyutuna gore boyutlanir -- kisa/dar bir
     tek sonuc/az sayida sonucta govde bos yayilmaz (bkz kullanici geri
     bildirimi: "gereksiz bosluklar olusuyor" / "width olarak yaymasin, fit
     etmesi lazim"). min-width, baslik+kapat butonuyla footer'daki enlem/
     boylam rozetinin sigmasi icin bir alt sinir verir. max-width'e ayrica
     SABIT 720px eklendi: cds-accordion-item'in kendi ResizeObserver'i
     (bkz asagidaki ::part(content) yorumu) suruklemeye baslarken tetiklenen
     bir reflow'da genisligi hesaba katip yeniden buyuyebiliyordu, bu da
     diyalogu ekranin neredeyse tamamina yayiyordu (bkz kullanici geri
     bildirimi: "drag-drop yapmaya kalkinca width yayiliyor") -- 720px
     ustsiniri bu buyumeyi/yayilmayi ne sebeple olursa olsun engeller, asla
     5'ten fazla sonuctaki (sayfalama) mevcut SABIT 720px genislikten daha
     genis olamaz. max-height ayni tasma sinirini korur; 5'ten FAZLA
     sonuctaki (sayfalama devrede) yukaridaki SABIT 720x640 akis (bkz
     .attr-panel yorumu) hic degismez. */
  .attr-panel.attr-panel--auto {
    width: fit-content;
    min-width: 360px;
    max-width: min(720px, calc(100vw - 2rem));
    height: auto;
    max-height: calc(100vh - 2rem);
  }

  .attr-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid var(--cds-border-subtle, #e0e0e0);
    cursor: move;
    user-select: none;
    touch-action: none;
  }

  .attr-header-title-group {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    min-width: 0;
  }

  .attr-header-icon {
    display: inline-flex;
    flex: none;
    color: #0f62fe;
  }

  .attr-header-text {
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
    min-width: 0;
  }

  .attr-title {
    font-size: 0.875rem;
    font-weight: 600;
  }

  /* Sonuc sayaci: kapat butonunun hemen solunda, header'in sag ucunda.
     Basligi bastirmasin diye kucuk, normal agirlikli ve ikincil renkte. */
  .attr-result-count {
    margin-left: auto;
    overflow: hidden;
    color: var(--cds-text-secondary, #525252);
    font-size: 0.75rem;
    font-weight: 400;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .attr-close-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    flex: none;
    border: none;
    border-radius: 4px;
    background: transparent;
    color: var(--cds-icon-secondary, #6f6f6f);
    cursor: pointer;
  }

  .attr-close-btn:hover {
    background: var(--cds-layer-hover-01, #f4f4f4);
    color: var(--cds-icon-primary, #161616);
  }

  .attr-breadcrumb {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.625rem 1rem;
    font-size: 0.875rem;
  }

  /* Accordion modunda (birden fazla sonuc) ilk cds-accordion-item zaten
     kendi ust kenarligini tasidigindan, breadcrumb'in KENDI alt kenarligi
     ust uste binip kalin/cift bir cizgi gibi gorunuyordu (bkz kullanici
     geri bildirimi). Tek sonucta ise ".attr-body"nin kendi kenarligi
     olmadigindan bu tek ayrac breadcrumb'ta kalmali. */
  .attr-breadcrumb-single {
    border-bottom: 1px solid var(--cds-border-subtle, #e0e0e0);
  }

  .attr-type-tag {
    padding: 0.0625rem 0.5rem;
    border-radius: 999px;
    background: var(--cds-layer-hover-01, #f4f4f4);
    color: var(--cds-text-secondary, #525252);
    font-weight: 600;
    letter-spacing: 0.02em;
    text-transform: uppercase;
  }

  /* Katman turu rozetinin (attr-type-tag) hemen yanina oturur -- hem
     breadcrumb'ta (tek sonuc) hem de her accordion item'inin slot="title"
     icinde (coklu sonuc). "title" slotu Carbon tarafindan KENDI expando
     <button>'inin ICINE render edildiginden (bkz accordion-item.js render())
     burada GERCEK bir <button> KULLANILAMAZ -- HTML'de <button> icine
     <button> gecersizdir, tarayici parser'i disdaki expando'yu ERKEN kapatip
     accordion'u BOZAR. Bunun yerine role="button" tasiyan bir <span>
     kullanilir (bkz render() _renderZoomButton) -- click/keydown (Enter/Space)
     elle stopPropagation edilip accordion'un kendi toggle'ini TETIKLEMEDEN
     tiklanabilir kalir. */
  .zoom-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: none;
    width: 26px;
    height: 26px;
    border-radius: 4px;
    background: transparent;
    color: var(--cds-icon-secondary, #6f6f6f);
    cursor: pointer;
  }

  .zoom-btn:hover {
    background: var(--cds-layer-hover-01, #f4f4f4);
    color: var(--cds-icon-primary, #161616);
  }

  .zoom-btn svg {
    width: 18px;
    height: 18px;
  }

  .item-title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    min-width: 0;
  }

  /* NOT: burada TEK bir "grup genisligi" kilitlemek YETMEZ -- gruba tek
     bir sabit genislik verilse bile, ICERIDEKI baslik/rozet/etiket
     varsayilan flex davranisiyla birbirine "paketlenmis" (packed) kalir;
     farkli uzunluktaki basliklarda rozet/etiket yine KENDI satirinin
     baslik uzunluguna gore farkli x-konumunda duruyordu (bkz kullanici
     geri bildirimi: "Beyza ile baslayan en uzun ama kayma var" -- ayni
     basligi paylasan GEOJSON satirlari TESADUFEN hizali gorunuyordu,
     cunku hepsinin metni ayniydi). Dogru cozum: ASAGIDA HER SUTUNU
     (baslik/rozet/etiket) AYRI AYRI sabit genislige kilitlemek -- boylece
     grubun kendi DOGAL genisligi (auto) zaten TUM satirlarda ayni sabit
     toplam olur, ayrica bir grup-genisligi belirlemeye gerek kalmaz. */
  .item-title-group {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    min-width: 0;
    flex: none;
  }

  /* width: TUM item'ler arasindaki EN UZUN baslik metninin GERCEK render
     genisligine (bkz _syncItemTitleGroupWidth), MAX_ITEM_TITLE_WIDTH ile
     ustsinirlanmis olarak KILITLENIR -- boylece kisa bir baslik da uzun
     bir baslikla AYNI sutun genisligini kaplar. flex:none: bu sabit
     genislik, satirin diger ogeleri (rozet/etiket/zoom) yer actigi icin
     flex'in varsayilan shrink'iyle KUCULTULMESIN (white-space:nowrap
     oldugundan zaten kucultulemez, ama shrink denemesi tasmaya yol
     acabilir). Deger atanmamissa (tek sonuc / henuz olculmedi) "auto" ile
     tamamen etkisizdir. */
  .item-title-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex: none;
    width: var(--tucbs-item-title-width, auto);
  }

  /* Her item'in TUM sonuc setindeki global sirasi (bkz _itemGlobalIndex)
     -- .attr-type-tag (GEOJSON/WFS rozeti) ile AYNI kucuk pill/badge
     gorunumu kullanilir, boylece hem gorsel olarak tutarli hem de baslik
     uzun olup kirpilsa (ellipsis) bile flex:none sayesinde HER ZAMAN
     gorunur kalir. width/text-align: rakam sayisi (1 vs 10) arasindaki
     kucuk genislik farkinin da rozeti kaydirmamasi icin AYNI baslik/etiket
     sutunlari gibi sabit genislige kilitlenir (bkz _syncItemTitleGroupWidth),
     icerik ortalanir. */
  .item-title-suffix {
    flex: none;
    padding: 0.0625rem 0.5rem;
    border-radius: 999px;
    background: var(--cds-layer-hover-01, #f4f4f4);
    color: var(--cds-text-secondary, #525252);
    font-weight: 600;
    letter-spacing: 0.02em;
    width: var(--tucbs-item-suffix-width, auto);
    text-align: center;
    box-sizing: border-box;
  }

  /* Etiketin (.attr-type-tag pill'i) KENDISINI genisletmek yerine (bu,
     kisa bir metni -- orn. "WMS" -- gereksiz yere uzun bir arka plana
     geriyordu, bkz kullanici geri bildirimi: "WMS'in badge'i kendi
     uzunlugu kadar olsun") GORUNMEZ bir "slot" kutusu TUM item'ler
     arasindaki EN GENIS tip etiketinin genisligine kilitlenir (bkz
     _syncItemTitleGroupWidth), pill'in KENDISI ise dogal/kucuk boyutunda
     slotun SOLUNA yaslanir. Boylece hizalama (zoom ikonunun konumu)
     KORUNUR ama her pill kendi gercek boyutunda gorunur. Slot HER ZAMAN
     render edilir (tip etiketi olmayan DRAWING/MEASURE satirlarinda da,
     bkz render()) ki o satirlarda da zoom konumu BOZULMASIN. */
  .item-title-tag-slot {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex: none;
    width: var(--tucbs-item-tag-width, auto);
  }

  .attr-layer-title {
    overflow: hidden;
    font-weight: 600;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* Yatay bosluk zaten Carbon'un kendi accordion token'larindan (title/
     heading padding-inline) geliyor; burada sadece breadcrumb/footer'a
     gore dikey nefes payi veriyoruz. "flex:1" -- .attr-panel artik SABIT
     640px oldugundan (bkz .attr-panel), icerik kisa kalirsa bu alan
     BUYUYUP footer'i her zaman panelin en altina iter. Kendisi de flex
     column: <cds-accordion> asagida "flex:1" ile BUYUYUP/kayarak bosluk
     alani icini doldurur, ".accordion-pager" (Sayfa X/Y) ise sabit
     boyutta kalip HER ZAMAN bu alanin (yani footer'in tam ustunun) en
     altina sabitlenir -- bosluk accordion'un ALTINDA degil, pager'in
     UZERINDE kalir (bkz kullanici geri bildirimi: "Sayfa yazisi en altta
     dursun her zaman"). */
  .accordion-wrap {
    padding: 0.5rem 0;
    flex: 1;
    min-height: 0;
    display: flex;
    flex-direction: column;
  }

  cds-accordion {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    scrollbar-width: none;
  }

  cds-accordion::-webkit-scrollbar {
    display: none;
  }

  /* Tek sonuc modunda da ayni sebep: .attr-body-wrap buyuyup footer'i
     en alta iter (bkz .accordion-wrap yorumu). */
  .attr-body-wrap {
    flex: 1;
  }

  .attr-body-wrap,
  .item-body-wrap {
    position: relative;
    min-height: 0;
  }

  .attr-body {
    max-height: 320px;
    padding: 0.5rem 1rem;
    overflow-y: auto;
    /* Native scrollbar (bkz. TucbsServiceUpload .discovered-list ile ayni
       sebep): macOS'ta sadece kaydirma aninda beliren "overlay" davranisi
       yuzunden kullanici icerigin kaydirilabilir oldugunu fark etmiyordu.
       Bunun yerine asagidaki .scroll-thumb, JS ile (bkz.
       shared/ui/VirtualScrollbar.ts) her zaman gorunen kendi gostergemizdir. */
    scrollbar-width: none;
  }

  /* Accordion (birden fazla sonuc) modunda disaridaki .attr-body TUM
     listeyi degil, SADECE o an acik olan item'in kendi Alan/Deger
     tablosunu bir kutuya alip kaydirir (bkz. render() — her item'in
     icerigi kendi .item-body'sine sarilir). Boylece kapali item basliklari
     HER ZAMAN normal akista kalir, uzun bir tablo yuzunden scroll'un
     altinda kaybolmazlar. MAX-height kullanilir ki icerik kisaysa (orn.
     WMS'ten gelen tek satirlik bir "Bilgi" sonucu) kutu GEREKSIZ yere
     bos alan birakmasin (bkz kullanici geri bildirimi: "fazladan bir alan
     kalmis, gereksiz alanlari kaldiralim") -- sadece gercekten tasan
     (orn. WFS'ten gelen uzun bir oznitelik listesi) icerik kendi icinde
     kayar. */
  /* min-width/min-height: Carbon'un cds-accordion-item'i KAPALI oldugunda
     icerigini DOM'dan tamamen cikardigindan (bkz _syncCompactItemBox
     yorumu), her seferinde SADECE o an ACIK olan item'in .item-body'si
     olculebilir durumdadir -- bu iki custom property, TUM item'ler
     arasindaki EN BUYUK olculen genislik/yukseklige kilitlenir (bkz
     _syncCompactItemBox), boylece hangi item acilirsa acilsin govde bundan
     KUCUK olmaz ve panelin fit-content boyutu item degistikce zipla(maz).
     Deger atanmamissa (5'ten fazla sonuc / sabit 720x640 akisinda, bkz
     _syncCompactItemBox'taki erken donus) "auto" ile tamamen etkisizdir. */
  .item-body {
    max-height: 220px;
    overflow-y: auto;
    scrollbar-width: none;
    min-width: var(--tucbs-item-min-width, auto);
    min-height: var(--tucbs-item-min-height, auto);
  }

  .attr-body::-webkit-scrollbar,
  .item-body::-webkit-scrollbar {
    display: none;
  }

  .scroll-thumb,
  .item-scroll-thumb {
    position: absolute;
    top: 0;
    right: 2px;
    width: 6px;
    border-radius: 3px;
    background: var(--cds-border-strong, #8d8d8d);
    cursor: grab;
    touch-action: none;
    display: none;
  }

  .scroll-thumb:active,
  .item-scroll-thumb:active {
    cursor: grabbing;
    background: var(--cds-icon-primary, #161616);
  }

  .attr-empty {
    padding: 0.75rem 0;
    color: var(--cds-text-secondary, #525252);
    text-align: center;
  }

  /* Diyalogun geri kalanindaki kucuk/ozel kontrol stiline uyar (kapat/
     surukle butonlari, footer degeri) -- Carbon'un cds-pagination'i
     sayfa-boyutu secici + buyuk butonlar iceren cok daha "agir" bir toolbar
     oldugundan bilerek kullanilmadi. */
  .accordion-pager {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    padding: 0.5rem 1rem;
    border-top: 1px solid var(--cds-border-subtle, #e0e0e0);
    /* .accordion-wrap'in flex-column'inda kucul(til)meden HER ZAMAN kendi
       dogal boyutunda kalir -- boylece <cds-accordion> yaninda buyuyen
       bosluk pager'i degil, pager'in USTUNDEKI alani doldurur. */
    flex: none;
  }

  .pager-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    border: none;
    border-radius: 4px;
    background: transparent;
    color: var(--cds-icon-primary, #161616);
    font-size: 12px;
    line-height: 1;
    cursor: pointer;
  }

  .pager-btn:hover:not(:disabled) {
    background: var(--cds-layer-hover-01, #f4f4f4);
  }

  .pager-btn:disabled {
    color: var(--cds-icon-disabled, #c6c6c6);
    cursor: not-allowed;
  }

  .pager-status {
    font-size: 12px;
    color: var(--cds-text-secondary, #525252);
  }

  /* IDENTIFY_PAGE_SIZE'dan az item olan (genelde son) sayfada, gorunmez
     "dolgu" satirlari kalan bosluklari doldurur -- boylece sayfalar arasi
     gecis, kapali item baslik satiri sayisi (5 vs 4 gibi) FARKLI oldugu
     icin diyalogun boyunu degistirmiyor (bkz. IDENTIFY_PAGE_SIZE tanimi).
     Gercek bir <cds-accordion-item> kullanilir ki collapsed baslik
     yuksekligi PIKSEL BIRE BIR ayni olsun; visibility:hidden ile layout'a
     katilir (yukseklik korunur) ama gorunmez/etkilesimsiz kalir. */
  .accordion-filler {
    visibility: hidden;
    pointer-events: none;
  }

  /* Carbon accordion-item, kendi olcumune (ResizeObserver, bkz. accordion-
     item.js _sizesBreakpoints: sm>=480px, md>=640px) gore icerigine
     "padding-inline-end:25%" (md varyanti) uyguluyor — bu, KENDI genisliginin
     YUZDESI oldugu icin width:fit-content zincirinde bir geri besleme
     dongusune yol aciyordu: genislik 640px'i gecince %25 padding eklenir,
     bu da toplam genisligi daha da arttirip diyalogu gercek icerikten
     (kisa bir oznitelik tablosu) COK daha buyuk, .attr-panel'in max-width
     sinirina (720px) dayanan bir kutuya sisiriyordu. ::part(content) ile
     TUM boyut varyantlarini sabit/kucuk bir degere sabitleyip bu dongüyü
     kesiyoruz — genislik artik SADECE gercek tablo icerigine gore belirlenir. */
  /* Akordiyon basligi: soldan saga griden beyaza yumusak gecis (sade kalsin
     diye tek renk ailesi, sadece gri tonlari). Acik item bir ton koyu. */
  cds-accordion-item::part(expando) {
    background: linear-gradient(90deg, #e8e8e8 0%, #f4f4f4 55%, #ffffff 100%);
  }

  cds-accordion-item[open]::part(expando) {
    background: linear-gradient(90deg, #dcdcdc 0%, #ebebeb 55%, #f7f7f7 100%);
  }

  cds-accordion-item:not(.accordion-filler):not([disabled])::part(expando):hover {
    background: linear-gradient(90deg, #d0d0d0 0%, #e0e0e0 55%, #efefef 100%);
  }

  /* Carbon, baslik butonuna fareyle tiklaninca da mavi odak cercevesi
     cizer (:focus). Fare tiklamasinda cerceve kaldirilir; klavye ile
     gezinirken (:focus-visible) erisilebilirlik icin Carbon'un cercevesi
     aynen geri verilir. */
  cds-accordion-item::part(expando):focus {
    box-shadow: none;
  }

  cds-accordion-item::part(expando):focus-visible {
    box-shadow:
      0 -1px 0 0 var(--cds-focus, #0f62fe),
      inset 0 1px 0 0 var(--cds-focus, #0f62fe),
      inset 2px 0 0 0 var(--cds-focus, #0f62fe),
      0 1px 0 0 var(--cds-focus, #0f62fe),
      inset 0 -1px 0 0 var(--cds-focus, #0f62fe),
      inset -2px 0 0 0 var(--cds-focus, #0f62fe);
  }

  cds-accordion-item::part(content) {
    padding-inline-end: 1rem !important;
  }

  /* Tablo genisligi de icerige gore belirlenir (table-layout:fixed +
     width:100% diyalogun fit-content olmasini engelliyordu); sutunlar
     kendi icerigine gore daralir/genisler, gereksiz bosluk birakmaz. */
  cds-table-header-cell,
  cds-table-cell {
    /* Carbon, hucre metni icin kendi sabit font-size'ini uyguluyor; :host
       uzerinden kalitim yetmiyor, dogrudan bu elementlere yazmak gerekiyor. */
    font-size: 12px;
    /* "anywhere" sayilarin ortasindan kirilmasina yol aciyordu (bkz.
       formatPropertyValue): satir kirma sadece orada eklenen gorunmez
       karakterlerde (virgulden sonra) olsun diye normale dondurulur. */
    overflow-wrap: normal;
  }

  /* "Alan" / "Değer" kolon basliklari kalin. */
  cds-table-header-cell {
    font-weight: 700;
  }

  .attr-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border-top: 1px solid var(--cds-border-subtle, #e0e0e0);
    color: var(--cds-text-secondary, #525252);
    /* Tablo icerigiyle (12px) tutarli; koordinat degeri de bunu miras alir. */
    font-size: 12px;
  }

  .attr-footer-value {
    padding: 0.1875rem 0.5rem;
    border-radius: 999px;
    background: var(--cds-layer-hover-01, #f4f4f4);
    color: var(--cds-text-primary, #161616);
    font-weight: 600;
  }
`;
function stripHtml(html) {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}
function toResultItem(feature, layerManager) {
  const layer = feature.layerId ? layerManager == null ? void 0 : layerManager.getLayers().find((candidate) => candidate.id === feature.layerId) : void 0;
  const layerTitle = (layer == null ? void 0 : layer.title) ?? feature.layerId ?? feature.featureId ?? "—";
  const propertyEntries = Object.entries(feature.properties).filter(
    ([key]) => key !== "layerId" && key !== "featureId"
  );
  return { layerTitle, layerType: layer == null ? void 0 : layer.layerType, propertyEntries, entity: feature.entity };
}
function toImageryResultItem(feature, layerManager) {
  const layer = layerManager == null ? void 0 : layerManager.getLayers().find((candidate) => candidate.cesiumObject === feature.imageryLayer);
  const layerTitle = (layer == null ? void 0 : layer.title) ?? feature.name ?? "—";
  const propertyEntries = Object.entries(feature.properties);
  if (propertyEntries.length === 0 && feature.description) {
    const text = stripHtml(feature.description);
    if (text) {
      return {
        layerTitle,
        layerType: layer == null ? void 0 : layer.layerType,
        propertyEntries: [["Bilgi", text]],
        geometryHint: feature.geometryHint
      };
    }
  }
  return { layerTitle, layerType: layer == null ? void 0 : layer.layerType, propertyEntries, geometryHint: feature.geometryHint };
}
function toImageryResultItems(features, layerManager) {
  return features.map((feature) => toImageryResultItem(feature, layerManager)).filter((item) => item.propertyEntries.length > 0);
}
function pagedTableItems(tableItems, accordionPage, pageSize) {
  const start = accordionPage * pageSize;
  return tableItems.slice(start, start + pageSize);
}
function itemGlobalIndex(tableItems, item) {
  return tableItems.indexOf(item) + 1;
}
const COMPACT_PANEL_MAX_WIDTH = 720;
const COMPACT_ITEM_BODY_CHROME = 34;
const VIEWPORT_MARGIN = 32;
function compactItemBodyMaxWidth(viewportWidth) {
  const panel = Math.min(COMPACT_PANEL_MAX_WIDTH, viewportWidth - VIEWPORT_MARGIN);
  return Math.max(0, panel - COMPACT_ITEM_BODY_CHROME);
}
const WKT_PATTERN = /^\s*(?:MULTI)?(?:POINT|LINESTRING|POLYGON)|^\s*GEOMETRYCOLLECTION/i;
const NUMERIC_ARRAY_OR_COMMA = /\[-?[\d.eE+]+(?:,-?[\d.eE+]+)+\]|,/g;
function formatPropertyValue(value) {
  if (value === null || value === void 0) return "—";
  let text = typeof value === "object" ? JSON.stringify(value) : String(value);
  if (WKT_PATTERN.test(text)) {
    text = text.replace(new RegExp("(?<=\\d) (?=-?\\d)", "g"), " ");
  }
  return text.replace(NUMERIC_ARRAY_OR_COMMA, (match) => match === "," ? ",​" : match);
}
const NEUTRAL_VECTOR_CLICK_STATE = { kind: "neutral" };
function toNeutral() {
  return NEUTRAL_VECTOR_CLICK_STATE;
}
function toEntityPending(pendingVectorClick) {
  return { kind: "entityPending", pendingVectorClick };
}
function toEntityCommitted() {
  return { kind: "entityCommitted" };
}
var __defProp$4 = Object.defineProperty;
var __getOwnPropDesc$5 = Object.getOwnPropertyDescriptor;
var __decorateClass$5 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$5(target, key) : target;
  for (var i4 = decorators.length - 1, decorator; i4 >= 0; i4--)
    if (decorator = decorators[i4])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$4(target, key, result);
  return result;
};
function carbonIcon(node) {
  return o$1(iconNodeToString(node));
}
const ICON_LOCATION = carbonIcon(_16_default$i);
const ICON_INFORMATION = carbonIcon(_20_default$1);
const ICON_CLOSE$2 = carbonIcon(_16_default$v);
const ICON_ZOOM_IN = carbonIcon(_20_default);
const BASIC_DISMISS_MS = 4e3;
const IDENTIFY_PAGE_SIZE = 5;
const MAX_ITEM_TITLE_WIDTH = 250;
const ZOOM_FLIGHT_DURATION_SECONDS = 0.6;
function formatLat(lat) {
  return `${Math.abs(lat).toFixed(5)}° ${lat >= 0 ? "N" : "S"}`;
}
function formatLon(lon) {
  return `${Math.abs(lon).toFixed(5)}° ${lon >= 0 ? "E" : "W"}`;
}
let TucbsIdentifyPanel = class extends i$3 {
  constructor() {
    super(...arguments);
    this.mapElementId = "";
    this.customCss = "";
    this._customCssState = { sheet: null };
    this._basicOpen = false;
    this._basicLon = 0;
    this._basicLat = 0;
    this._imageryPending = false;
    this._vectorClickState = NEUTRAL_VECTOR_CLICK_STATE;
    this._tableOpen = false;
    this._tableItems = [];
    this._tableLon = 0;
    this._tableLat = 0;
    this._accordionPage = 0;
    this._tableSource = "vector";
    this._timers = new TimerBag(this);
    this._basicDismissTimer = null;
    this._drag = new DraggablePanelController(this, {
      getPanel: () => this._attrPanelEl,
      ignoreSelector: ".attr-close-btn"
    });
    this._onMapClick = (detail) => {
      var _a2;
      if ((_a2 = this.interactionManager) == null ? void 0 : _a2.isIdentifySuspended()) return;
      this._tableOpen = false;
      this._imageryPending = false;
      this._vectorClickState = toNeutral();
      const [lon, lat] = detail.position;
      this._timers.setTimeout(() => {
        if (this._imageryPending) return;
        this._basicLon = lon;
        this._basicLat = lat;
        this._basicOpen = true;
        this._scheduleBasicDismiss();
      }, 0);
    };
    this._onInteractionSuspend = () => {
      this._closeBasic();
    };
    this._onImageryQuerying = () => {
      var _a2;
      if ((_a2 = this.interactionManager) == null ? void 0 : _a2.isIdentifySuspended()) return;
      this._imageryPending = true;
    };
    this._compactItemBoxGeneration = new AsyncGeneration();
    this._itemTitleGroupWidthGeneration = new AsyncGeneration();
    this._onEntityClick = (detail) => {
      var _a2;
      if ((_a2 = this.interactionManager) == null ? void 0 : _a2.isIdentifySuspended()) return;
      this._imageryPending = false;
      const [lon, lat] = detail.position;
      this._vectorClickState = toEntityPending({
        items: detail.features.map((feature) => toResultItem(feature, this.layerManager)),
        lon,
        lat
      });
      this._timers.setTimeout(() => {
        if (this._vectorClickState.kind !== "entityPending" || this._imageryPending) return;
        const { pendingVectorClick } = this._vectorClickState;
        this._openTable(pendingVectorClick.items, pendingVectorClick.lon, pendingVectorClick.lat, "vector");
      }, 0);
    };
    this._onImageryClick = (detail) => {
      var _a2;
      if ((_a2 = this.interactionManager) == null ? void 0 : _a2.isIdentifySuspended()) return;
      this._imageryPending = false;
      if (this._vectorClickState.kind !== "neutral") {
        const rasterItems = toImageryResultItems(detail.features, this.layerManager);
        if (this._vectorClickState.kind === "entityPending") {
          const { pendingVectorClick } = this._vectorClickState;
          const vectorItems = pendingVectorClick.items;
          this._openTable(
            [...vectorItems, ...rasterItems],
            pendingVectorClick.lon,
            pendingVectorClick.lat,
            rasterItems.length > 0 ? "mixed" : "vector"
          );
          return;
        }
        if (this._tableOpen && rasterItems.length > 0) {
          this._tableItems = [...this._tableItems, ...rasterItems];
          this._tableSource = "mixed";
        }
        return;
      }
      const imageryItems = toImageryResultItems(detail.features, this.layerManager);
      const [lon, lat] = detail.position;
      if (imageryItems.length === 0) {
        showToast("info", "Bu konumda öznitelik bilgisi bulunamadı.");
        this._basicLon = lon;
        this._basicLat = lat;
        this._basicOpen = true;
        this._scheduleBasicDismiss();
        return;
      }
      this._openTable(imageryItems, lon, lat, "imagery");
    };
    this._onAccordionItemBeforeToggle = (event) => {
      const detail = event.detail;
      if (detail.open) return;
      const accordion = event.currentTarget;
      const items = accordion.querySelectorAll("cds-accordion-item");
      const openCount = Array.from(items).filter(
        (item) => item.open
      ).length;
      if (openCount <= 1) event.preventDefault();
    };
    this._onAccordionItemToggled = (event) => {
      const detail = event.detail;
      if (detail.open) {
        const openedItem = event.target;
        const accordion = event.currentTarget;
        for (const item of accordion.querySelectorAll("cds-accordion-item")) {
          if (item !== openedItem) item.open = false;
        }
      }
      this._scheduleScrollThumbSync();
    };
  }
  get _accordionPageCount() {
    return Math.max(1, Math.ceil(this._tableItems.length / IDENTIFY_PAGE_SIZE));
  }
  // Sayfalama YOKKEN (bkz _accordionPageCount) ".attr-panel" artik SABIT
  // 640px yerine icerige gore boyutlanir (bkz ".attr-panel--auto" CSS'i) --
  // 5'ten FAZLA sonucta (sayfalama devrede) bu HER ZAMAN false doner ve
  // mevcut sabit yukseklik akisi degismeden kalir.
  get _isCompactPanel() {
    return this._accordionPageCount <= 1;
  }
  async _syncCompactItemBox() {
    var _a2;
    const panel = this._attrPanelEl;
    if (!panel) return;
    if (!this._isCompactPanel || this._tableItems.length <= 1) {
      panel.style.removeProperty("--tucbs-item-min-width");
      panel.style.removeProperty("--tucbs-item-min-height");
      return;
    }
    const token = this._compactItemBoxGeneration.next();
    const items = this._tableItems;
    const probe = document.createElement("div");
    probe.style.cssText = `position:fixed;top:-99999px;left:-99999px;visibility:hidden;width:max-content;max-width:${compactItemBodyMaxWidth(window.innerWidth)}px;`;
    (_a2 = this.shadowRoot) == null ? void 0 : _a2.appendChild(probe);
    let maxWidth = 0;
    let maxHeight = 0;
    for (const item of items) {
      const box = document.createElement("div");
      box.className = "item-body";
      probe.replaceChildren(box);
      D(this._renderPropertyTable(item.propertyEntries), box);
      await new Promise((resolve) => this._timers.requestAnimationFrame(() => resolve()));
      if (!this._compactItemBoxGeneration.isCurrent(token)) {
        probe.remove();
        return;
      }
      const rect = box.getBoundingClientRect();
      maxWidth = Math.max(maxWidth, rect.width);
      maxHeight = Math.max(maxHeight, rect.height);
    }
    probe.remove();
    if (!this._compactItemBoxGeneration.isCurrent(token)) return;
    if (maxWidth > 0) panel.style.setProperty("--tucbs-item-min-width", `${Math.ceil(maxWidth)}px`);
    if (maxHeight > 0) panel.style.setProperty("--tucbs-item-min-height", `${Math.ceil(maxHeight)}px`);
  }
  async _syncItemTitleGroupWidth() {
    var _a2;
    const panel = this._attrPanelEl;
    if (!panel) return;
    if (this._tableItems.length <= 1) {
      panel.style.removeProperty("--tucbs-item-title-width");
      panel.style.removeProperty("--tucbs-item-suffix-width");
      panel.style.removeProperty("--tucbs-item-tag-width");
      return;
    }
    const token = this._itemTitleGroupWidthGeneration.next();
    const items = this._tableItems;
    const probeHost = document.createElement("cds-accordion-item");
    probeHost.style.cssText = "position:fixed;top:-99999px;left:-99999px;visibility:hidden;";
    (_a2 = this.shadowRoot) == null ? void 0 : _a2.appendChild(probeHost);
    let maxTitleWidth = 0;
    let maxSuffixWidth = 0;
    let maxTagWidth = 0;
    for (const item of items) {
      const group = document.createElement("span");
      group.slot = "title";
      group.className = "item-title-group";
      const textEl = document.createElement("span");
      textEl.className = "item-title-text";
      textEl.textContent = item.layerTitle;
      group.appendChild(textEl);
      const suffixEl = document.createElement("span");
      suffixEl.className = "item-title-suffix";
      suffixEl.textContent = String(this._itemGlobalIndex(item));
      group.appendChild(suffixEl);
      const hasTag = !!item.layerType && item.layerType !== "DRAWING" && item.layerType !== "MEASURE";
      let tagEl = null;
      if (hasTag) {
        tagEl = document.createElement("span");
        tagEl.className = "attr-type-tag";
        tagEl.textContent = item.layerType;
        group.appendChild(tagEl);
      }
      probeHost.replaceChildren(group);
      await new Promise((resolve) => this._timers.requestAnimationFrame(() => resolve()));
      if (!this._itemTitleGroupWidthGeneration.isCurrent(token)) {
        probeHost.remove();
        return;
      }
      maxTitleWidth = Math.max(maxTitleWidth, textEl.getBoundingClientRect().width);
      maxSuffixWidth = Math.max(maxSuffixWidth, suffixEl.getBoundingClientRect().width);
      if (tagEl) maxTagWidth = Math.max(maxTagWidth, tagEl.getBoundingClientRect().width);
    }
    probeHost.remove();
    if (!this._itemTitleGroupWidthGeneration.isCurrent(token)) return;
    const clampedTitle = Math.min(Math.ceil(maxTitleWidth), MAX_ITEM_TITLE_WIDTH);
    if (clampedTitle > 0) panel.style.setProperty("--tucbs-item-title-width", `${clampedTitle}px`);
    if (maxSuffixWidth > 0) panel.style.setProperty("--tucbs-item-suffix-width", `${Math.ceil(maxSuffixWidth)}px`);
    if (maxTagWidth > 0) panel.style.setProperty("--tucbs-item-tag-width", `${Math.ceil(maxTagWidth)}px`);
  }
  get _pagedTableItems() {
    return pagedTableItems(this._tableItems, this._accordionPage, IDENTIFY_PAGE_SIZE);
  }
  _goToAccordionPage(page) {
    this._accordionPage = Math.max(0, Math.min(page, this._accordionPageCount - 1));
  }
  _itemGlobalIndex(item) {
    return itemGlobalIndex(this._tableItems, item);
  }
  // Tabloyu (vektor-only, raster-only VEYA vektor+raster birlikte) TEK bir
  // yerden acar -- hem _onEntityClick'in setTimeout'u hem de _onImageryClick
  // buraya yonlenir, _vectorClickState'in "entityCommitted"e gecisiyle
  // ikisinden SADECE ilk gelen gercekten "acar", diger sadece "zaten acik"
  // durumunu bulur.
  _openTable(items, lon, lat, source) {
    this._vectorClickState = toEntityCommitted();
    this._basicOpen = false;
    this._clearBasicDismiss();
    for (const editor of document.querySelectorAll(
      "tucbs-style-editor"
    )) {
      if (editor.open) editor.close();
    }
    this._tableSource = source;
    this._tableItems = items;
    this._accordionPage = 0;
    this._tableLon = lon;
    this._tableLat = lat;
    this._tableOpen = true;
  }
  // cds-accordion-item'lar .map() ile KEYSIZ render edildiginden (bkz render()),
  // Lit ayni pozisyondaki DOM node'unu YENI bir tiklamada da YENIDEN KULLANIR.
  // _onAccordionItemToggled ise kullanici bir item'i actiginda DIGERLERINI
  // Lit'in DIREKTIF sistemi DISINDAN (dogrudan ".open = false" atayarak)
  // kapatiyor -- Lit bu harici degisiklikten HABERSIZ kalip "?open=${index===0}"
  // icin kendi ONBELLEGINDEKI (ilk render'daki) degeri gecerli sayabiliyor,
  // boylece YENI bir sorguda (farkli/yeni _tableItems ile) index 0'in GERCEKTE
  // acilmasi gerekirken kapali kalabiliyordu (bkz kullanici geri bildirimi:
  // "her zaman ilk item acik gelecek"). Render'dan SONRA acik durumu ELLE
  // (Lit'i by-pass ederek) index 0 = acik / digerleri = kapali olarak zorluyoruz.
  _resetAccordionOpen() {
    const fix = () => {
      var _a2;
      const items = (_a2 = this.shadowRoot) == null ? void 0 : _a2.querySelectorAll(
        "cds-accordion-item:not(.accordion-filler)"
      );
      items == null ? void 0 : items.forEach((item, index) => {
        item.open = index === 0;
      });
    };
    deferredMeasure(this._timers, fix);
  }
  // _resetAccordionOpen ile AYNI Lit-by-pass teknigi (bkz o metodun yorumu),
  // ama sabit index 0 yerine PARAMETRE olarak verilen index'i acar --
  // "Yakınlaş" butonuna basildiginda o feature'in oznitelik tablosu da
  // GORUNUR olsun diye (bkz _zoomToItem) kullanilir. _tableItems/_accordionPage
  // DEGISMEDIGINDEN updated() burada TETIKLENMEZ, yani _resetAccordionOpen
  // ARDINDAN bu acmayi ustune YAZMAZ.
  _openAccordionItem(index) {
    var _a2;
    const items = (_a2 = this.shadowRoot) == null ? void 0 : _a2.querySelectorAll(
      "cds-accordion-item:not(.accordion-filler)"
    );
    items == null ? void 0 : items.forEach((item, i4) => {
      item.open = i4 === index;
    });
    this._scheduleScrollThumbSync();
  }
  /** `interactionManager`/`layerManager` eksikse, `mapElementId` üzerinden `tucbs-map`'e bağlanmayı dener. */
  firstUpdated() {
    if (!this.mapElementId) return;
    const mapEl = document.getElementById(this.mapElementId);
    if (!mapEl) return;
    const connect = () => {
      if (!this.interactionManager && mapEl.interaction) {
        this.interactionManager = mapEl.interaction;
      }
      if (!this.layerManager && mapEl.layerManager) {
        this.layerManager = mapEl.layerManager;
      }
    };
    whenTucbsMapReady(mapEl, connect);
  }
  /** Reactive property değişikliklerini işler: `interactionManager` bağını yeniler, tablo diyaloğu açılış/kapanışını ve accordion/scroll durumunu senkronlar. */
  updated(changed) {
    var _a2, _b, _c, _d;
    if (changed.has("customCss")) {
      applyCustomCss(this.shadowRoot, this.customCss, this._customCssState, "tucbs-identify-panel");
    }
    if (changed.has("interactionManager")) {
      const previous = changed.get("interactionManager");
      if (previous) this._unbind(previous);
      if (this.interactionManager) this._bind(this.interactionManager);
    }
    if (changed.has("_tableOpen") && this._tableOpen) {
      (_a2 = this._attrPanelEl) == null ? void 0 : _a2.style.removeProperty("left");
      (_b = this._attrPanelEl) == null ? void 0 : _b.style.removeProperty("top");
      (_c = this._attrPanelEl) == null ? void 0 : _c.style.removeProperty("transform");
    }
    if (changed.has("_tableOpen") && !this._tableOpen) {
      (_d = this.layerManager) == null ? void 0 : _d.clearHighlight();
    }
    if (changed.has("_tableOpen") || changed.has("_tableItems")) {
      this._scheduleScrollThumbSync();
      void this._syncCompactItemBox();
      void this._syncItemTitleGroupWidth();
    }
    if (changed.has("_tableOpen") || changed.has("_tableItems") || changed.has("_accordionPage")) {
      this._resetAccordionOpen();
    }
  }
  /** Bileşen DOM'dan kaldırıldığında `interactionManager` dinleyicisini kaldırır ve bekleyen zamanlayıcıları temizler. */
  disconnectedCallback() {
    if (this.interactionManager) this._unbind(this.interactionManager);
    this._clearBasicDismiss();
    super.disconnectedCallback();
  }
  _bind(interactionManager) {
    interactionManager.on("map:click", this._onMapClick);
    interactionManager.on("interaction:suspend", this._onInteractionSuspend);
    interactionManager.on("entity:click", this._onEntityClick);
    interactionManager.on("imagery:click", this._onImageryClick);
    interactionManager.on("imagery:querying", this._onImageryQuerying);
  }
  _unbind(interactionManager) {
    interactionManager.off("map:click", this._onMapClick);
    interactionManager.off("interaction:suspend", this._onInteractionSuspend);
    interactionManager.off("entity:click", this._onEntityClick);
    interactionManager.off("imagery:click", this._onImageryClick);
    interactionManager.off("imagery:querying", this._onImageryQuerying);
  }
  _scheduleBasicDismiss() {
    this._clearBasicDismiss();
    this._basicDismissTimer = this._timers.setTimeout(() => {
      this._basicDismissTimer = null;
      this._basicOpen = false;
    }, BASIC_DISMISS_MS);
  }
  _clearBasicDismiss() {
    this._timers.clearTimeout(this._basicDismissTimer);
    this._basicDismissTimer = null;
  }
  // Native scrollbar tamamen gizli (bkz. .attr-body/.item-body CSS'i); bunun
  // yerine ilgili .scroll-thumb/.item-scroll-thumb'in top/height'ini
  // syncVirtualScrollbar (bkz shared/ui/VirtualScrollbar.ts --
  // TucbsStyleEditor/TucbsServiceUpload ile PAYLASILAN tek hesap) ile
  // hesaplatiyoruz. Tek bir sabit ciftle degil, PARAMETRE olarak aliyoruz:
  // accordion modunda birden fazla ".item-body" olabilir (sadece acik olan
  // gorunur/olculebilir), tek sonucta ise ".attr-body" kullanilir.
  _syncScrollThumbFor(body) {
    const wrap = body.closest(".attr-body-wrap, .item-body-wrap");
    const thumb = wrap == null ? void 0 : wrap.querySelector(".scroll-thumb, .item-scroll-thumb");
    if (thumb) syncVirtualScrollbar(body, thumb);
  }
  // cds-accordion-item gibi cocuk custom element'ler ilk render'ini/acilma-
  // kapanma gecisini (bkz. Carbon accordion 110ms transition) HEMEN degil bir
  // sonraki frame'de veya kisa bir gecikmeyle tamamlayabiliyor — tek bir rAF
  // yetmedigi icin (TucbsServiceUpload._updatePreview'daki ayni sebep) kisa
  // bir setTimeout ile ikinci bir olcum daha yapiyoruz. Kapali (gizli)
  // ".item-body"lerin olcumu zararsizdir (scrollHeight===clientHeight -> thumb
  // gizli kalir), bu yuzden hepsini ayirt etmeden tarayabiliriz.
  _scheduleScrollThumbSync() {
    const sync = () => {
      var _a2;
      (_a2 = this.shadowRoot) == null ? void 0 : _a2.querySelectorAll(".attr-body, .item-body").forEach((body) => this._syncScrollThumbFor(body));
    };
    deferredMeasure(this._timers, sync);
  }
  // .scroll-thumb/.item-scroll-thumb'a tiklayip surukleyerek ilgili kutuyu
  // kaydirir -- hesap startVirtualScrollbarDrag'de (bkz
  // shared/ui/VirtualScrollbar.ts). Surukleme durumu kapali degiskenlerde
  // degil, o fonksiyonun KENDI closure'inda tutulur — boylece ayni anda
  // birden fazla ".item-body" olsa bile her surukleme kendi body/thumb
  // ciftine dogru baglanir.
  _startThumbDrag(event) {
    const thumb = event.currentTarget;
    const wrap = thumb.closest(".attr-body-wrap, .item-body-wrap");
    const body = wrap == null ? void 0 : wrap.querySelector(".attr-body, .item-body");
    if (!body) return;
    startVirtualScrollbarDrag(event, body);
  }
  /**
   * Konum/Bilgi Al koordinat kartını ve öznitelik tablosunu kapatır (diğer diyaloglarla karşılıklı kapatma için).
   *
   * @example
   * ```ts
   * identifyPanel.close();
   * ```
   */
  close() {
    this._closeBasic();
    this._closeTable();
  }
  _closeBasic() {
    this._clearBasicDismiss();
    this._basicOpen = false;
  }
  _closeTable() {
    this._tableOpen = false;
  }
  // Vektor sonuclarda (entity dolu) feature'in KENDI cercevesine yakinlasip
  // (bkz zoomToEntity) AYNI zamanda SABIT (animasyonsuz) gecici bir stroke
  // vurgusu ekler (bkz highlightEntity) -- cakisan/yakin feature'larda salt
  // zoom, HANGISININ vurgulandigini ayirt etmeye yetmeyebilir. Bu vurgu
  // zamanlayiciyla KENDI KENDINE kaybolmaz -- diyalog kapaninca (bkz
  // updated() "_tableOpen" -> false dali) clearHighlight() ile kaldirilir.
  // Raster (WMS/WMTS) sonuclarda ise (entity yok, client-side geometri/
  // vurgulanacak bir sey yok) sadece tiklanan NOKTAYA yakinlasir -- bkz
  // IdentifyResultItem.entity yorumu. "accordionIndex" SADECE coklu sonucta
  // (accordion) verilir -- o feature'in oznitelik tablosu da GORUNUR olsun
  // diye ilgili cds-accordion-item'i acar (bkz _openAccordionItem); tek
  // sonucta (breadcrumb) zaten tablo tek basina acik oldugundan gerek yoktur.
  _zoomToItem(item, accordionIndex) {
    var _a2, _b, _c, _d, _e, _f, _g, _h;
    (_a2 = this.layerManager) == null ? void 0 : _a2.clearHighlight();
    if (item.entity) {
      void ((_b = this.layerManager) == null ? void 0 : _b.zoomToEntity(item.entity, { duration: ZOOM_FLIGHT_DURATION_SECONDS }));
      (_c = this.layerManager) == null ? void 0 : _c.highlightEntity(item.entity);
    } else if (((_d = item.geometryHint) == null ? void 0 : _d.kind) === "extent") {
      const { west, south, east, north } = item.geometryHint;
      (_e = this.interactionManager) == null ? void 0 : _e.flyToExtent(west, south, east, north, {
        duration: ZOOM_FLIGHT_DURATION_SECONDS
      });
    } else if (((_f = item.geometryHint) == null ? void 0 : _f.kind) === "point") {
      const { longitude, latitude } = item.geometryHint;
      (_g = this.interactionManager) == null ? void 0 : _g.flyToPosition(longitude, latitude, {
        duration: ZOOM_FLIGHT_DURATION_SECONDS
      });
    } else {
      (_h = this.interactionManager) == null ? void 0 : _h.flyToPosition(this._tableLon, this._tableLat, {
        duration: ZOOM_FLIGHT_DURATION_SECONDS
      });
    }
    if (accordionIndex !== void 0) this._openAccordionItem(accordionIndex);
  }
  // Katman turu rozetinin (attr-type-tag) hemen yanina yerlesecek sekilde
  // hem breadcrumb'ta hem de accordion item basliklarinda (slot="title")
  // KULLANILABILMESI icin gercek <button> DEGIL role="button" tasiyan bir
  // <span> doner (bkz .zoom-btn WHY yorumu) -- accordion baglaminda click/
  // keydown, o title'in KENDI expando <button>'ini TETIKLEMESIN diye elle
  // stopPropagation edilir; breadcrumb'ta bu gereksiz ama zararsizdir (orada
  // zaten baska bir tiklanabilir ata yok).
  _renderZoomButton(item, accordionIndex) {
    const zoom = () => this._zoomToItem(item, accordionIndex);
    return b`
      <span
        class="zoom-btn"
        role="button"
        tabindex="0"
        title="Yakınlaş"
        aria-label="Yakınlaş"
        @click=${(event) => {
      event.stopPropagation();
      zoom();
    }}
        @keydown=${(event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      event.stopPropagation();
      zoom();
    }}
      >
        ${ICON_ZOOM_IN}
      </span>
    `;
  }
  _renderPropertyTable(entries) {
    return entries.length === 0 ? b`<div class="attr-empty">Öznitelik bilgisi bulunamadı.</div>` : b`
          <cds-table size="sm" use-zebra-styles use-static-width>
            <cds-table-head>
              <cds-table-header-row>
                <cds-table-header-cell>Alan</cds-table-header-cell>
                <cds-table-header-cell>Değer</cds-table-header-cell>
              </cds-table-header-row>
            </cds-table-head>
            <cds-table-body>
              ${entries.map(
      ([key, value]) => b`
                  <cds-table-row>
                    <cds-table-cell>${key}</cds-table-cell>
                    <cds-table-cell>${formatPropertyValue(value)}</cds-table-cell>
                  </cds-table-row>
                `
    )}
            </cds-table-body>
          </cds-table>
        `;
  }
  /** Bileşenin şablonunu render eder (koordinat kartı veya öznitelik tablosu/accordion). */
  render() {
    const singleItem = this._tableItems.length === 1 ? this._tableItems[0] : void 0;
    const breadcrumb = !singleItem ? A : b`
      <div class="attr-breadcrumb ${singleItem ? "attr-breadcrumb-single" : ""}">
        ${(singleItem == null ? void 0 : singleItem.layerType) && singleItem.layerType !== "DRAWING" && singleItem.layerType !== "MEASURE" ? b`<span class="attr-type-tag">${singleItem.layerType}</span>` : A}
        ${singleItem ? this._renderZoomButton(singleItem) : A}
        ${singleItem ? b`<span class="attr-layer-title" title=${singleItem.layerTitle}>${singleItem.layerTitle}</span>` : A}
      </div>
    `;
    const body = singleItem ? b`
          <div class="attr-body-wrap">
            <div class="attr-body" @scroll=${(event) => this._syncScrollThumbFor(event.currentTarget)}>
              ${this._renderPropertyTable(singleItem.propertyEntries)}
            </div>
            <div class="scroll-thumb" @pointerdown=${(event) => this._startThumbDrag(event)}></div>
          </div>
        ` : b`
          <div class="accordion-wrap">
            <cds-accordion
              size="sm"
              @cds-accordion-item-beingtoggled=${this._onAccordionItemBeforeToggle}
              @cds-accordion-item-toggled=${this._onAccordionItemToggled}
            >
              ${this._pagedTableItems.map(
      (item, index) => b`
                  <cds-accordion-item title=${item.layerTitle} ?open=${index === 0}>
                    <span slot="title" class="item-title">
                      <span class="item-title-group">
                        <span class="item-title-text">${item.layerTitle}</span>
                        <span class="item-title-suffix">${this._itemGlobalIndex(item)}</span>
                        <span class="item-title-tag-slot">
                          ${item.layerType && item.layerType !== "DRAWING" && item.layerType !== "MEASURE" ? b`<span class="attr-type-tag">${item.layerType}</span>` : A}
                        </span>
                      </span>
                      ${this._renderZoomButton(item, index)}
                    </span>
                    <div class="item-body-wrap">
                      <div class="item-body" @scroll=${(event) => this._syncScrollThumbFor(event.currentTarget)}>
                        ${this._renderPropertyTable(item.propertyEntries)}
                      </div>
                      <div class="item-scroll-thumb" @pointerdown=${(event) => this._startThumbDrag(event)}></div>
                    </div>
                  </cds-accordion-item>
                `
    )}
              ${this._accordionPageCount > 1 ? Array.from({ length: IDENTIFY_PAGE_SIZE - this._pagedTableItems.length }).map(
      () => b`<cds-accordion-item class="accordion-filler" disabled></cds-accordion-item>`
    ) : A}
            </cds-accordion>
            ${this._accordionPageCount > 1 ? b`
                  <div class="accordion-pager">
                    <button
                      type="button"
                      class="pager-btn"
                      aria-label="Önceki sayfa"
                      ?disabled=${this._accordionPage === 0}
                      @click=${() => this._goToAccordionPage(this._accordionPage - 1)}
                    >
                      ‹
                    </button>
                    <span class="pager-status">Sayfa ${this._accordionPage + 1} / ${this._accordionPageCount}</span>
                    <button
                      type="button"
                      class="pager-btn"
                      aria-label="Sonraki sayfa"
                      ?disabled=${this._accordionPage >= this._accordionPageCount - 1}
                      @click=${() => this._goToAccordionPage(this._accordionPage + 1)}
                    >
                      ›
                    </button>
                  </div>
                ` : A}
          </div>
        `;
    return b`
      <div class="coord-card" ?hidden=${!this._basicOpen}>
        <span class="coord-icon">${ICON_LOCATION}</span>
        <div class="coord-body">
          <span class="coord-title">Koordinat</span>
          <span class="coord-value">${formatLat(this._basicLat)}, ${formatLon(this._basicLon)}</span>
        </div>
        <button type="button" class="coord-close-btn" aria-label="Kapat" @click=${() => this._closeBasic()}>
          ${ICON_CLOSE$2}
        </button>
      </div>

      <div class="loading-card" ?hidden=${!this._imageryPending}>
        <span class="loading-spinner"></span>
        <span>Sorgulanıyor…</span>
      </div>

      <div
        class=${e2({ "attr-panel": true, "attr-panel--auto": this._isCompactPanel })}
        ?hidden=${!this._tableOpen}
      >
        <div class="attr-header" @pointerdown=${(event) => this._drag.start(event)}>
          <div class="attr-header-title-group">
            <span class="attr-header-icon">${ICON_INFORMATION}</span>
            <div class="attr-header-text">
              <span class="attr-title">Konum/Bilgi Al</span>
            </div>
          </div>
          ${singleItem ? A : b`<span class="attr-result-count">${this._tableItems.length} sonuç bulundu</span>`}
          <button type="button" class="attr-close-btn" aria-label="Kapat" @click=${() => this._closeTable()}>
            ${ICON_CLOSE$2}
          </button>
        </div>

        ${breadcrumb}

        ${body}

        <div class="attr-footer">
          <span>Enlem/Boylam</span>
          <span class="attr-footer-value">${formatLat(this._tableLat)}, ${formatLon(this._tableLon)}</span>
        </div>
      </div>
    `;
  }
};
TucbsIdentifyPanel.styles = identifyPanelStyles;
__decorateClass$5([
  n$1({ attribute: false })
], TucbsIdentifyPanel.prototype, "interactionManager", 2);
__decorateClass$5([
  n$1({ attribute: false })
], TucbsIdentifyPanel.prototype, "layerManager", 2);
__decorateClass$5([
  n$1()
], TucbsIdentifyPanel.prototype, "mapElementId", 2);
__decorateClass$5([
  n$1({ attribute: "custom-css" })
], TucbsIdentifyPanel.prototype, "customCss", 2);
__decorateClass$5([
  r()
], TucbsIdentifyPanel.prototype, "_basicOpen", 2);
__decorateClass$5([
  r()
], TucbsIdentifyPanel.prototype, "_basicLon", 2);
__decorateClass$5([
  r()
], TucbsIdentifyPanel.prototype, "_basicLat", 2);
__decorateClass$5([
  r()
], TucbsIdentifyPanel.prototype, "_imageryPending", 2);
__decorateClass$5([
  r()
], TucbsIdentifyPanel.prototype, "_tableOpen", 2);
__decorateClass$5([
  r()
], TucbsIdentifyPanel.prototype, "_tableItems", 2);
__decorateClass$5([
  r()
], TucbsIdentifyPanel.prototype, "_tableLon", 2);
__decorateClass$5([
  r()
], TucbsIdentifyPanel.prototype, "_tableLat", 2);
__decorateClass$5([
  r()
], TucbsIdentifyPanel.prototype, "_accordionPage", 2);
__decorateClass$5([
  r()
], TucbsIdentifyPanel.prototype, "_tableSource", 2);
__decorateClass$5([
  e$3(".attr-panel")
], TucbsIdentifyPanel.prototype, "_attrPanelEl", 2);
TucbsIdentifyPanel = __decorateClass$5([
  t$3("tucbs-identify-panel")
], TucbsIdentifyPanel);
var __defProp$3 = Object.defineProperty;
var __getOwnPropDesc$4 = Object.getOwnPropertyDescriptor;
var __decorateClass$4 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$4(target, key) : target;
  for (var i4 = decorators.length - 1, decorator; i4 >= 0; i4--)
    if (decorator = decorators[i4])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$3(target, key, result);
  return result;
};
const FORMATS = {
  geojson: { extension: ".geojson", mime: "application/geo+json", layerType: "GEOJSON", label: "GeoJSON" },
  kml: { extension: ".kml", mime: "application/vnd.google-earth.kml+xml", layerType: "KML", label: "KML" },
  kmz: { extension: ".kmz", mime: "application/vnd.google-earth.kmz", layerType: "KMZ", label: "KMZ" },
  shp: { extension: ".zip", mime: "application/zip", layerType: "SHP", label: "SHP(ZIP)" },
  csv: { extension: ".csv", mime: "text/csv", layerType: "CSV", label: "CSV" }
};
const ALL_FORMATS = ["geojson", "kml", "kmz", "shp", "csv"];
const BYTES_PER_MB = 1024 * 1024;
function formatMb(mb) {
  return mb.toLocaleString("tr-TR", { maximumFractionDigits: 1 });
}
const ICON_CLOSE$1 = o$1(iconNodeToString(_16_default$v));
const ICON_DOCUMENT_ADD = o$1(iconNodeToString(_16_default$s));
let TucbsFileUpload = class extends i$3 {
  constructor() {
    super(...arguments);
    this.open = false;
    this.mapElementId = "";
    this.acceptedTypes = "";
    this.maxFileSizeMb = 0;
    this.dragDrop = true;
    this.customCss = "";
    this._error = "";
    this._uploading = false;
    this._customCssState = { sheet: null };
    this._drag = new DraggablePanelController(this, {
      getPanel: () => this,
      ignoreSelector: ".close-btn"
    });
    this._blockDropWhenDisabled = (event) => {
      if (this.dragDrop) return;
      event.preventDefault();
      event.stopPropagation();
      if (event.dataTransfer) event.dataTransfer.dropEffect = "none";
    };
  }
  // === Yasam Dongusu: LayerManager baglama (TucbsServiceUpload'daki ile
  // AYNI yontem -- ikisi de TucbsApp icinde bagsiz/binding'siz "marker tag"
  // olarak kullanilabiliyor (bkz TucbsApp.render() "Ciplak marker tag'ler"
  // yorumu); mapElementId hic verilmemesi bu durumda GECERLI bir kullanim,
  // uyarmak YANLIS ALARM olurdu -- eskiden burada console.warn vardi, ama
  // bu bilesen HER ZAMAN bagsiz-marker olarak da kullanildigi icin sessizce
  // cikilir (TucbsLayerList'ten farki bu -- o hicbir zaman bagsiz kullanilmiyor). ===
  /** `layerManager` dışarıdan atanmamışsa, `mapElementId` üzerinden `tucbs-map`'e bağlanmayı dener. */
  firstUpdated() {
    if (this.layerManager || !this.mapElementId) return;
    const mapEl = document.getElementById(this.mapElementId);
    if (!mapEl) return;
    if (mapEl.layerManager) {
      this.layerManager = mapEl.layerManager;
    } else {
      mapEl.addEventListener(
        "ready",
        () => {
          if (mapEl.layerManager) this.layerManager = mapEl.layerManager;
        },
        { once: true }
      );
    }
  }
  /** Pencere yeniden açılırken önceki denemenin hatasını render'dan önce temizler. */
  willUpdate(changedProperties) {
    if (changedProperties.has("open") && this.open) this._error = "";
  }
  /** Reactive property değişikliklerini işler: `customCss`'i uygular, `open` true yapıldığında sürüklemeden kalan konumu sıfırlar. */
  updated(changedProperties) {
    if (changedProperties.has("customCss")) {
      applyCustomCss(this.shadowRoot, this.customCss, this._customCssState, "tucbs-file-upload");
    }
    if (changedProperties.has("open") && this.open) {
      this.style.removeProperty("left");
      this.style.removeProperty("top");
      this.style.removeProperty("transform");
    }
  }
  /** Bileşen DOM'dan kaldırıldığında açık kalmış olabilecek toast'ı yok eder. */
  disconnectedCallback() {
    destroyToast();
    super.disconnectedCallback();
  }
  _close() {
    this.open = false;
    this._error = "";
    this.dispatchEvent(new CustomEvent("tucbs-file-upload-closed", { bubbles: true, composed: true }));
  }
  // acceptedTypes bos ise desteklenen tum formatlar; doluysa sadece belirtilenler.
  _activeFormats() {
    const requested = this.acceptedTypes.split(",").map((type) => type.trim().toLowerCase()).filter((type) => ALL_FORMATS.includes(type));
    return requested.length > 0 ? requested : [...ALL_FORMATS];
  }
  /** "Sadece GeoJSON, KML dosyaları desteklenir." -- etkin biçimlerle. */
  _formatError(activeFormats) {
    const labels = activeFormats.map((f2) => FORMATS[f2].label).join(", ");
    return `Sadece ${labels} dosyaları desteklenir.`;
  }
  // Sınır aşılırsa hata metni, aşılmazsa (ya da sınır yoksa) null.
  _sizeError(file) {
    const limitMb = this.maxFileSizeMb;
    if (!Number.isFinite(limitMb) || limitMb <= 0) return null;
    const fileMb = file.size / BYTES_PER_MB;
    if (fileMb <= limitMb) return null;
    return `Dosya en fazla ${formatMb(limitMb)} MB olabilir (seçilen: ${formatMb(fileMb)} MB).`;
  }
  _detectFormat(fileName) {
    const lowerFileName = fileName.toLowerCase();
    return ALL_FORMATS.find((format) => lowerFileName.endsWith(FORMATS[format].extension));
  }
  //SHPJS kütüphanesi yoksa SHP dosyası ekleme sırasındaki hata mesajını vermek için async yapıldı.
  async _handleFileAdded(files) {
    this._error = "";
    destroyToast();
    const activeFormats = this._activeFormats();
    const file = files[0];
    if (!file) {
      this._error = this._formatError(activeFormats);
      return;
    }
    const format = this._detectFormat(file.name);
    if (!format || !activeFormats.includes(format)) {
      this._error = this._formatError(activeFormats);
      return;
    }
    const sizeError = this._sizeError(file);
    if (sizeError) {
      this._error = sizeError;
      return;
    }
    const layerManager = this.layerManager;
    if (!layerManager) {
      this._error = "Harita hazır değil, katman eklenemedi.";
      return;
    }
    const { layerType, extension } = FORMATS[format];
    const title = file.name.replace(new RegExp(`\\${extension}$`, "i"), "");
    const id = `upload-${title}-${Date.now()}`;
    const onCrsReprojected = (payload) => {
      if (payload.id !== id) return;
      showToast("info", `${payload.fromEpsg} → ${payload.toEpsg} (WGS84) dönüştürüldü.`);
    };
    const onCrsUnresolved = (payload) => {
      if (payload.id !== id) return;
      showToast("warning", "Koordinat sistemi tanınamadı; WGS84 kabul edilerek yüklendi.");
    };
    layerManager.on("layer:crs-reprojected", onCrsReprojected);
    layerManager.on("layer:crs-unresolved", onCrsUnresolved);
    this._close();
    this._uploading = true;
    beginBusy("Katman yükleniyor…");
    await new Promise((resolve) => setTimeout(resolve, 200));
    try {
      await layerManager.add(layerType, {
        id,
        title,
        data: file,
        layerType,
        clampToGround: true
      });
    } catch (err) {
      if (err instanceof TucbsError) {
        console.error(`[tucbs-file-upload] ${err.code} (${err.number}): ${err.message}`);
      } else {
        console.error(err);
      }
      showToast("error", err instanceof Error ? err.message : String(err));
    } finally {
      layerManager.off("layer:crs-reprojected", onCrsReprojected);
      layerManager.off("layer:crs-unresolved", onCrsUnresolved);
      this._uploading = false;
      endBusy();
    }
  }
  /** Bileşenin şablonunu render eder (yükleme sürerken bağımsız gösterge, `open` false ise boş şablon). */
  render() {
    if (this._uploading) {
      return b`
        <div class="standalone">
          <span class="upload-spinner"></span>
          <p class="upload-text">Katman yükleniyor…</p>
        </div>
      `;
    }
    if (!this.open) {
      return b``;
    }
    const activeFormats = this._activeFormats();
    const accept = activeFormats.map((f2) => {
      const { extension, mime } = FORMATS[f2];
      return mime ? `${extension},${mime}` : extension;
    }).join(",");
    const labels = activeFormats.map((f2) => FORMATS[f2].label).join(", ");
    return b`
      <div class="panel">
        <div class="header" @pointerdown=${(event) => this._drag.start(event)}>
          <span class="title"><span class="title-icon">${ICON_DOCUMENT_ADD}</span>Veri Dosyası Ekle</span>
          <button type="button" class="close-btn" aria-label="Kapat" @click=${() => this._close()}>
            ${ICON_CLOSE$1}
          </button>
        </div>

        <div
          class="body"
          @dragover=${{ handleEvent: this._blockDropWhenDisabled, capture: true }}
          @drop=${{ handleEvent: this._blockDropWhenDisabled, capture: true }}
        >
          <cds-file-uploader-drop-container
            accept=${accept}
            @cds-file-uploader-drop-container-changed=${(event) => {
      var _a2;
      return this._handleFileAdded(((_a2 = event.detail) == null ? void 0 : _a2.addedFiles) ?? []);
    }}
          >
            <p class="upload-text">
              ${this.dragDrop ? `${labels} dosyasını buraya sürükleyin ya da seçmek için tıklayın` : `${labels} dosyasını seçmek için tıklayın`}
            </p>
          </cds-file-uploader-drop-container>
          ${this._error ? b`
                <cds-inline-notification
                  kind="error"
                  title="Katman eklenemedi"
                  subtitle=${this._error}
                  @cds-notification-closed=${() => {
      this._error = "";
    }}
                ></cds-inline-notification>
              ` : ""}
        </div>
      </div>
    `;
  }
};
TucbsFileUpload.styles = i$6`
    :host {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1100;
      display: block;
      font-family: "IBM Plex Sans", system-ui, sans-serif;
      font-size: 0.875rem;
      color: var(--cds-text-primary, #161616);
      /* suppress Carbon's blue focus ring inside the drop container */
      --cds-focus: transparent;
    }

    :host([hidden]) {
      display: none;
    }

    .panel {
      background: #ffffff;
      border: 1px solid var(--cds-border-subtle, #e0e0e0);
      border-radius: 4px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      width: max-content;
      max-width: 320px;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.75rem 1rem;
      border-bottom: 1px solid var(--cds-border-subtle, #e0e0e0);
      cursor: move;
      user-select: none;
      touch-action: none;
    }

    .title {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 600;
    }

    .title-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 1.25rem;
      height: 1.25rem;
      line-height: 0;
      color: #0f62fe;
    }

    .title-icon svg {
      width: 1.25rem;
      height: 1.25rem;
      display: block;
    }

    .close-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      flex: none;
      border: none;
      border-radius: 4px;
      background: transparent;
      color: var(--cds-icon-secondary, #6f6f6f);
      cursor: pointer;
    }

    .close-btn:hover {
      background: var(--cds-layer-hover-01, #f4f4f4);
      color: var(--cds-icon-primary, #161616);
    }

    .body {
      padding: 1rem;
    }

    .upload-text {
      margin: 0;
      font-size: 0.75rem;
      color: var(--cds-text-secondary, #525252);
      text-align: center;
    }

    cds-inline-notification {
      margin-top: 0.75rem;
    }

    /* Dosya secilir secilmez diyalog (baslik/kapat/surukleme cercevesi)
       KAPATILIR (bkz _handleFileAdded); layerManager.add() cozulene kadar
       (buyuk dosyalarda -- 68-86MB'lik GeoJSON gibi -- hem veri parse hem
       de Cesium'un asenkron primitive kurulumu birkac saniye surebiliyor,
       bkz LayerManager.waitForRenderSettle() yorumu) YERINE bagimsiz/yalin
       bu kucuk gosterge kalir -- kullanicinin "hicbir sey olmuyor"
       sanmamasi icin, ama diyalogun tam cercevesi OLMADAN (bkz kullanici
       bildirimi: "tek basina gozuksun"). Ayni kapsayici, yukleme diyalog
       zaten KAPANDIKTAN SONRA basarisiz olursa (bkz render()) kisa omurlu
       bir hata gostergesi icin de kullanilir.
       */
    .standalone {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 1rem;
      background: #ffffff;
      border: 1px solid var(--cds-border-subtle, #e0e0e0);
      border-radius: 4px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }

    .standalone .upload-text {
      margin: 0;
      text-align: left;
    }

    .upload-spinner {
      width: 24px;
      height: 24px;
      flex: none;
      border: 2.5px solid var(--cds-border-subtle, #e0e0e0);
      border-top-color: var(--cds-interactive, #0f62fe);
      border-radius: 50%;
      animation: upload-spin 0.7s linear infinite;
    }

    @keyframes upload-spin {
      to {
        transform: rotate(360deg);
      }
    }
  `;
__decorateClass$4([
  n$1({ type: Boolean, reflect: true })
], TucbsFileUpload.prototype, "open", 2);
__decorateClass$4([
  n$1({ attribute: false })
], TucbsFileUpload.prototype, "layerManager", 2);
__decorateClass$4([
  n$1()
], TucbsFileUpload.prototype, "mapElementId", 2);
__decorateClass$4([
  n$1({ attribute: "accepted-types" })
], TucbsFileUpload.prototype, "acceptedTypes", 2);
__decorateClass$4([
  n$1({ attribute: "max-file-size-mb", type: Number })
], TucbsFileUpload.prototype, "maxFileSizeMb", 2);
__decorateClass$4([
  n$1({ attribute: "drag-drop", converter: defaultTrueAttribute })
], TucbsFileUpload.prototype, "dragDrop", 2);
__decorateClass$4([
  n$1({ attribute: "custom-css" })
], TucbsFileUpload.prototype, "customCss", 2);
__decorateClass$4([
  r()
], TucbsFileUpload.prototype, "_error", 2);
__decorateClass$4([
  r()
], TucbsFileUpload.prototype, "_uploading", 2);
TucbsFileUpload = __decorateClass$4([
  t$3("tucbs-file-upload")
], TucbsFileUpload);
const serviceUploadStyles = i$6`
  :host {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1100;
    display: block;
    font-family: "IBM Plex Sans", system-ui, sans-serif;
    font-size: 0.875rem;
    color: var(--cds-text-primary, #161616);
    /* suppress Carbon's blue focus ring inside the panel */
    --cds-focus: transparent;
    /* cds-dropdown/cds-text-input global tema CSS'i olmadan bu token'lari
       fallback'siz kullaniyor (orn. --cds-field, --cds-layer); tanimsiz
       kalirlarsa acilan dropdown menusu saydam arka planla render olup
       altindaki text-input'un metniyle gorsel olarak karisiyordu. Carbon'un
       "white" tema degerleriyle burada sabitliyoruz. */
    --cds-field: #f4f4f4;
    --cds-field-hover: #e8e8e8;
    --cds-layer: #ffffff;
    --cds-layer-hover: #e8e8e8;
    --cds-layer-background: #ffffff;
    --cds-layer-selected: #e0e0e0;
    --cds-layer-selected-hover: #d1d1d1;
    --cds-border-subtle: #e0e0e0;
    --cds-border-strong: #8d8d8d;
    --cds-layout-density-padding-inline-local: 1rem;
    --cds-layout-size-height-local: 2.5rem;
  }

  :host([hidden]) {
    display: none;
  }

  /* Onizleme acikken (bkz. .panel.with-layers / TucbsMapPreview), panelin
     TAM USTUNE oturan onizleme seridi toplam blok yuksekligini
     PREVIEW_HEIGHT_PX (300px) kadar artirir. Sadece paneli merkezlemek
     (yukarideki translate(-50%,-50%)) bu durumda TOPLAM BLOGU (onizleme+
     panel) merkezin altina kaydirir, gorsel olarak "yukari kaymis" gosterir.
     Panelin KENDI dikey merkezini PREVIEW_HEIGHT_PX/2 (150px) kadar asagi
     kaydirarak, onizleme+panel BUTUNUNUN merkezi viewport merkeziyle
     ortusur: panelCenterY = viewportCenterY + previewHeight/2 (turetim:
     combinedTop = viewportCenterY - (previewHeight+panelHeight)/2;
     panelCenterY = combinedTop + previewHeight + panelHeight/2). Genislik
     icin ayri bir ayara gerek yok — onizleme genisligi panelinkiyle birebir
     esit (bkz. _syncPreviewPosition), yani paneli yatayda merkezlemek
     butunu de yatayda merkezlemek anlamina gelir. Attribute kesif
     basarili olup katmanlar listelendiginde updated() icinde takilir
     (bkz. asagida). */
  :host([data-preview-open]) {
    top: calc(50% + 150px);
  }

  .panel {
    /* preview genisligi bu kutunun getBoundingClientRect()'inden BIREBIR
       kopyalanir (bkz. TucbsServiceUpload._syncPreviewPosition); border-box
       olmadan gercek genislik 2x1px border kadar eksik olcumlenirdi. */
    box-sizing: border-box;
    background: #ffffff;
    border: 1px solid var(--cds-border-subtle, #e0e0e0);
    border-radius: 4px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    /* Sabit genislik: en uzun servis turu etiketine ("Web Harita Karo
       Servisi (WMTS)") gore hesaplandi. "max-content" kullanilsaydi,
       dropdown'da secim degistikce panel genisligi de degisip kayardi. */
    width: 400px;
    /* Yukseklik, TucbsMapPreview'in yukseklikle BIREBIR ayni olmasi icin
       PREVIEW_HEIGHT_PX ile sabitlenmis (bkz. asagidaki TS sabiti) —
       diyalog uzarsa ikisi arasinda gorsel "kayma" olusurdu. Icerik
       (katmanlar listesi gibi) sigmazsa .discovered-list kendi icinde
       scroll olur (bkz. asagida), panelin kendisi hep 300px kalir. */
    height: 300px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  /* Katmanlar sutunu acilinca panel, form-column (338px icerik) + sabit
     300px'lik katmanlar-column'u yan yana barindiracak sekilde genisler.
     Bu deger de sabit oldugu icin (icerige gore degil), form-column'un
     gorunen genisligi iki durumda da AYNI kalir (bkz. .form-column flex:1),
     yani katmanlar acilip kapanirken dropdown/metin kutusu genisligi
     kaymaz. */
  .panel.with-layers {
    width: 700px;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: none;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid var(--cds-border-subtle, #e0e0e0);
    cursor: move;
    user-select: none;
    touch-action: none;
  }

  .title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 600;
    white-space: nowrap;
  }

  .title-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.25rem;
    height: 1.25rem;
    line-height: 0;
    color: #0f62fe;
  }

  .title-icon svg {
    width: 1.25rem;
    height: 1.25rem;
    display: block;
  }

  .header-actions {
    display: flex;
    align-items: center;
    flex: none;
    gap: 0.5rem;
  }

  .reset-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    flex: none;
    padding: 0.375rem 0.75rem;
    border: 1px solid var(--cds-border-strong, #8d8d8d);
    border-radius: 999px;
    background: transparent;
    color: var(--cds-text-primary, #161616);
    font: inherit;
    font-size: 0.75rem;
    cursor: pointer;
  }

  .reset-btn:hover {
    background: var(--cds-layer-hover-01, #f4f4f4);
  }

  .close-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    flex: none;
    border: none;
    border-radius: 4px;
    background: transparent;
    color: var(--cds-icon-secondary, #6f6f6f);
    cursor: pointer;
  }

  .close-btn:hover {
    background: var(--cds-layer-hover-01, #f4f4f4);
    color: var(--cds-icon-primary, #161616);
  }

  .content {
    display: flex;
    align-items: stretch;
    /* .panel'in kalan (header disindaki) TUM yuksekligini doldurur;
       min-height:0 olmadan flex item'lar varsayilan "min-height:auto"
       (icerik boyutu) kullanir ve panel 300px'in UZERINE tasabilirdi. */
    flex: 1 1 auto;
    min-height: 0;
    overflow: hidden;
  }

  .form-column {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    min-height: 0;
    gap: 1rem;
    padding: 1rem;
    min-width: 260px;
  }

  .katmanlar-column {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    flex: 0 0 300px;
    min-height: 0;
    gap: 0.75rem;
    padding: 1rem;
    border-left: 1px solid var(--cds-border-subtle, #e0e0e0);
  }

  cds-dropdown {
    position: relative;
    z-index: 1;
    width: 100%;
  }

  .url-row {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .url-row cds-text-input {
    flex: 1;
    min-width: 0;
  }

  .fetch-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    /* Servis Adresi giriniz" etiketinin yuksekligi kadar asagi alip
       butonun giris kutusuyla (label/helper-text degil) hizali gorunmesini
       sagliyor. */
    margin-top: 1.5rem;
    flex: none;
    border: none;
    border-radius: 4px;
    background: transparent;
    color: var(--cds-icon-secondary, #6f6f6f);
    cursor: pointer;
  }

  .fetch-btn:hover {
    background: var(--cds-layer-hover-01, #f4f4f4);
    color: var(--cds-icon-primary, #161616);
  }

  .fetch-btn:disabled {
    color: var(--cds-icon-disabled, rgba(22, 22, 22, 0.25));
    cursor: not-allowed;
  }

  .error-text {
    flex: none;
    font-size: 0.75rem;
    color: var(--cds-text-error, #da1e28);
    /* Bazi hata mesajlari (bkz. ServiceDiscoveryController) iki cumleyi \n ile
       ayirip alt alta gostermek icin bu satiri kullanir. */
    white-space: pre-line;
  }

  .add-layer-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: none;
    height: 2.5rem;
    padding: 0 1rem;
    border: none;
    border-radius: 4px;
    background: var(--cds-interactive, #0f62fe);
    color: #ffffff;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
  }

  .add-layer-btn:hover:not(:disabled) {
    background: var(--cds-button-primary-hover, #0353e9);
  }

  .add-layer-btn:disabled {
    background: var(--cds-button-disabled, #c6c6c6);
    color: var(--cds-text-on-color-disabled, #8d8d8d);
    cursor: not-allowed;
  }

  .section-label {
    flex: none;
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--cds-text-secondary, #525252);
  }

  /* katmanlar-column'daki TEK esneyen/kayan alan budur: panel sabit 300px
     oldugu icin (bkz. .panel) buradaki katman sayisi sigmazsa section-label
     ve "Haritaya Ekle" butonu (ikisi de flex:none) yerinde sabit kalir,
     sadece bu liste kendi icinde dikey scroll olur. */
  .discovered-list-wrap {
    position: relative;
    flex: 1 1 auto;
    min-height: 0;
  }

  .discovered-list {
    /* Native scrollbar (OS/tarayici "overlay" davranisiyla sadece
       kaydirma/hover aninda beliriyor — kullanici scroll'u "yok"
       zannedip listenin tamamini gordugunu dusunuyordu; bu davranis
       WebKit'te ::-webkit-scrollbar ile de guvenilir sekilde
       devre disi birakilamadi) TAMAMEN GIZLENIR; onun yerine
       asagidaki .scroll-thumb, JS ile (bkz. _listScroll /
       shared/ui/VirtualScrollbar.ts) her zaman gorunen kendi cizdigimiz
       bir gostergedir. */
    position: absolute;
    inset: 0;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 0.5rem 0.75rem 0.5rem 0.5rem;
    overflow-y: auto;
    border: 1px solid var(--cds-border-subtle, #e0e0e0);
    border-radius: 4px;
    scrollbar-width: none;
  }

  .discovered-list::-webkit-scrollbar {
    display: none;
  }

  .scroll-thumb {
    position: absolute;
    top: 0;
    right: 2px;
    width: 6px;
    border-radius: 3px;
    background: var(--cds-border-strong, #8d8d8d);
    cursor: grab;
    touch-action: none;
    display: none;
  }

  .scroll-thumb:active {
    cursor: grabbing;
    background: var(--cds-icon-primary, #161616);
  }

  .discovered-row {
    display: flex;
    /* "center" iken, cds-checkbox'in etiketi (item.title) iki satira
       sardiginda satir yuksekliği artiyor ve dikey ortalanan
       .preview-toggle-btn tam metnin ORTASINA denk gelip metnin
       (ikinci satirinin) uzerine biniyordu. "flex-start" ile buton
       satirin EN USTUNE sabitlenir; etiket kac satira sararsa sarsin
       artik uzerine binmez. */
    align-items: flex-start;
    justify-content: space-between;
    gap: 0.5rem;
  }

  .discovered-row cds-checkbox {
    flex: 1;
    min-width: 0;
  }

  /* KOK SEBEP align-items degil, YATAY tasmaydi: katman adlari alt cizgiyle
     birlesik TEK KELIME oldugundan (orn. "DEP3Elevation_Hillshade_Gray")
     bosluk olmadigi icin tarayici satiri SARAMIYOR — Carbon'un ic
     ".cds--checkbox-label-text" span'i (flex item, min-width:auto) bu
     "kirilamaz" metnin TAM genisligini talep edip flex:1'in verdigi
     genisligin disina tasiyor, bu da gorsel olarak preview-toggle-btn'in
     ALTINA/USTUNE biniyordu. Carbon bu span'i disaridan hedeflemek icin
     bir ::part() sunmuyor; tek erisilebilir kanca disaridaki <label>
     ("part=label"). Onu flex'ten block'a cevirip (checkbox glyph'i zaten
     :before/:after ile ABSOLUTE konumlandigi icin bundan etkilenmez)
     standart tek-satir ellipsis kesme kurallarini uygulanabilir hale
     getiriyoruz. Tam ad, <cds-checkbox>'a verilen title attribute'u
     (bkz. render()) uzerinden native tooltip ile hala gorulebilir. */
  .discovered-row cds-checkbox::part(label) {
    /* display:block tek basina yetmiyor: :host(cds-checkbox) kendi
       icinde "flex-direction:column; align-items:flex-start" kullaniyor
       (bkz. Carbon checkbox.scss) — bu, cross-axis'te (column'da bu
       GENISLIK demektir) varsayilan olarak STRETCH DEGIL, iceriğe gore
       buyume anlamina gelir. width:100% OLMADAN label, kirilamayan
       metnin (alt cizgili tek "kelime") tam genisligine buyup host'un
       (ve dolayisiyla flex:1'in ayirdigi alanin) DISINA taşıyordu — o
       yuzden ellipsis hic tetiklenmiyordu (tasacak bir sinir yoktu).
       width:100% ile label artik host'un GERCEK genisligine (ki o da
       .discovered-row cds-checkbox { flex:1; min-width:0; } ile dogru
       sekilde sinirlanmis) sabitlenir; ancak O ZAMAN metin tasar ve
       ellipsis devreye girer. */
    display: block;
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .preview-toggle-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    flex: none;
    border: none;
    border-radius: 4px;
    background: transparent;
    color: var(--cds-icon-secondary, #6f6f6f);
    cursor: pointer;
  }

  .preview-toggle-btn:hover {
    background: var(--cds-layer-hover-01, #f4f4f4);
    color: var(--cds-icon-primary, #161616);
  }

  .preview-toggle-btn[aria-pressed="true"] {
    color: var(--cds-interactive, #0f62fe);
    background: var(--cds-layer-hover-01, #f4f4f4);
  }
`;
function classifyDiscoveryError(err) {
  if (err instanceof OgcRequestError) {
    return {
      kind: err.code === "OGC_SERVICE_DISCOVERY_PARSE_FAILED" ? "parse" : "server",
      detail: err.message
    };
  }
  return { kind: "network", detail: err instanceof Error ? err.message : String(err) };
}
function discoveryErrorMessage(failure) {
  switch (failure == null ? void 0 : failure.kind) {
    case "network":
      return "Servis adresine ulaşılamadı.\nAdresi kontrol edin veya sunucunun CORS/erişim izinlerini doğrulayın.";
    case "server":
      return `Sunucu bir hata döndürdü.
${failure.detail}`;
    case "parse":
      return "Sunucunun yanıtı geçerli bir XML olarak ayrıştırılamadı.\nAdresin doğru bir GetCapabilities uç noktası olduğundan emin olun.";
    default:
      return "Servis adresinden geçerli bir yanıt alınamadı.\nAdresi ve seçili servis türünü kontrol edin.";
  }
}
const SERVICE_VERSIONS = {
  WMS: ["1.3.0", "1.1.1", "1.1.0", "1.0.0"],
  WMTS: ["1.0.0"],
  WFS: ["2.0.2", "2.0.0", "1.1.3", "1.1.0", "1.0.0"],
  WCS: ["2.1.0", "2.0.1", "2.0.0", "1.1.2", "1.1.1", "1.1.0", "1.0.0"]
};
function baseServiceUrl(url) {
  try {
    const parsed = new URL(url);
    return `${parsed.origin}${parsed.pathname}`;
  } catch {
    return url.split("?")[0] ?? url;
  }
}
class ServiceDiscoveryController {
  /**
   * @param host - Denetleyiciyi barındıran bileşen.
   * @param sink - Keşif sonuçlarının yazılacağı yer.
   */
  constructor(host, sink) {
    this.sink = sink;
    this.generation = new AsyncGeneration();
    host.addController(this);
  }
  /** Bileşen DOM'dan kaldırılınca süren keşfin sonucunu geçersiz kılar. */
  hostDisconnected() {
    this.invalidate();
  }
  /** Süren keşfin sonucunu geçersiz kılar (form değişince/sıfırlanınca). */
  invalidate() {
    this.generation.next();
  }
  /** Servisin katmanlarını keşfeder; bilinen sürümleri en yeniden eskiye dener ve ilk başarılı sonucu forma yazar. */
  // Kullanicinin girdigi cIplak servis adresi icin, bu servis turunun
  // desteklendigi bilinen TUM surumleri (en guncelden en eskiye) sirayla
  // dener; bir surum gercek katman/tip donduren ilk anda durur ("ilk
  // basarili sonuc yeterli"). Bir surum 0 sonuc donduruyorsa (sunucu o
  // surumu desteklemiyorsa genelde ServiceExceptionReport gibi Layer/
  // FeatureType/CoverageSummary icermeyen gecerli bir XML doner — hata
  // FIRLATMAZ, sadece bos gelir) bir sonraki surume gecilir. Servis turu
  // acikca UYUSMUYORSA (orn. WFS secilip bir WMS adresi girilmisse) hemen
  // durulur — versiyon degistirmek bu durumu duzeltmez.
  async discover(serviceType, serviceUrl) {
    const rawUrl = serviceUrl.trim();
    if (!rawUrl) {
      this.sink.setError("Servis adresi giriniz.");
      return;
    }
    const discoveryBaseUrl = baseServiceUrl(rawUrl);
    this.sink.setDiscovering(true);
    beginBusy("Servis bilgileri getiriliyor…");
    this.sink.resetDiscovery();
    const generation = this.generation.next();
    try {
      const versions = SERVICE_VERSIONS[serviceType] ?? [];
      let lastError;
      for (const version of versions) {
        let candidateUrl;
        try {
          candidateUrl = buildCapabilitiesUrl(rawUrl, serviceType, version);
        } catch {
          this.sink.setError("Servis adresi geçerli bir URL değil.");
          return;
        }
        try {
          const manager = this.sink.layerManager();
          const doc = manager ? await manager.getCapabilitiesDocument(
            discoveryBaseUrl,
            serviceType,
            version
          ) : await getCapabilities(candidateUrl, void 0);
          if (!this.generation.isCurrent(generation)) return;
          const items = parseCapabilities(serviceType, doc);
          if (items.length > 0) {
            if (serviceType === "WCS") {
              await this.applyWcsItems(generation, doc, items, discoveryBaseUrl, rawUrl);
              return;
            }
            this.sink.setItems(items);
            if (serviceType === "WMS") {
              this.sink.setTiffFormat(parseWmsTiffFormat(doc));
            }
            return;
          }
          const detected = detectServiceType(doc);
          if (detected && detected !== serviceType) {
            this.sink.setError(
              `Bu adres bir ${detected} servisi gibi görünüyor. Servis türünü "${detected}" olarak değiştirip tekrar deneyin.`
            );
            return;
          }
        } catch (err) {
          if (!this.generation.isCurrent(generation)) return;
          lastError = classifyDiscoveryError(err);
        }
      }
      this.sink.setError(discoveryErrorMessage(lastError));
    } finally {
      this.sink.setDiscovering(false);
      endBusy();
    }
  }
  // WCS'in GetCapabilities ozeti (<CoverageSummary>) bbox TASIMAZ (bkz
  // parseWcsCoverageEnvelope WHY yorumu) -- ayri bir DescribeCoverage
  // istegiyle TAMAMLANIR, aksi halde katmanlar haritada/onizlemede varsayilan
  // global rectangle'a yayilip yanlis konumda gorunur. Basarisiz olursa (bkz
  // o fonksiyonun catch'i) katmanlar kutusuz kalir -- kesif akisini BLOKE
  // ETMEZ. ML-12/Faz 5b: bu istek de layerManager baglanmissa proxy/apiKey'den
  // gecer.
  //
  // TUCBS1-1403: liste zarflar gelmeden YAZILMAZ -- Turkiye extent'i disindaki
  // coverage'lar listede hic gorunmemeli (once gosterip sonra silmek
  // titremeye yol acardi). Kutusu cozulemeyen coverage da listelenmez:
  // eklenirse goruntu dunya geneline yayilmis sayilir ve Turkiye kirpmasi
  // bu gerilmis goruntunun bir dilimini Turkiye'nin ustune cizerdi (ör.
  // epsg.io'ya erisilemeyince service.geo.llv.li'nin EPSG:2056 ortofotolari).
  // Hicbiri kalmazsa liste gelmez, kullanici ekranin ust ortasinda (toast)
  // uyarilir.
  //
  // TUCBS1-1441: ayni DescribeCoverage yaniti coverage'lari yukseklik
  // (Elevation) / GeoTIFF olarak da siniflandirir (bkz core
  // fetchWcsCoverageDescriptions) -- bu yuzden artik kutusu GetCapabilities'te
  // olan coverage'lar icin de istenir. Yalnizca GeoTIFF coverage'lari
  // listelenir; servis tamamen yukseklikten olusuyorsa liste acilmaz, toast
  // ile uyarilir.
  async applyWcsItems(generation, doc, items, discoveryBaseUrl, rawUrl) {
    const ids = items.map((item) => item.identifier);
    const unlocated = items.filter((item) => !item.geographicBoundingBox).map((item) => item.identifier);
    const descriptionsManager = this.sink.layerManager();
    const { extents, elevationIds } = descriptionsManager ? await descriptionsManager.getWcsCoverageDescriptions(discoveryBaseUrl, ids, unlocated) : await fetchWcsCoverageDescriptions(rawUrl, ids, unlocated);
    if (!this.generation.isCurrent(generation)) return;
    const geoTiffItems = items.filter((item) => !elevationIds.has(item.identifier));
    if (geoTiffItems.length === 0) {
      showToast("warning", "Bu servis yalnızca yükseklik katmanları içeriyor, eklenecek GeoTIFF katmanı bulunamadı.");
      return;
    }
    const located = geoTiffItems.flatMap((item) => {
      const box = item.geographicBoundingBox ?? extents.get(item.identifier);
      return box ? [{ ...item, geographicBoundingBox: box }] : [];
    });
    const inServiceExtent = located.filter((item) => intersectsServiceExtent(item.geographicBoundingBox));
    if (inServiceExtent.length === 0) {
      showToast("warning", "Servisteki katmanların hiçbiri Türkiye sınırları içinde değil.");
      return;
    }
    this.sink.setItems(inServiceExtent);
    this.sink.setTiffFormat(parseWcsTiffFormat(doc));
  }
}
var __defProp$2 = Object.defineProperty;
var __getOwnPropDesc$3 = Object.getOwnPropertyDescriptor;
var __typeError$1 = (msg) => {
  throw TypeError(msg);
};
var __decorateClass$3 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$3(target, key) : target;
  for (var i4 = decorators.length - 1, decorator; i4 >= 0; i4--)
    if (decorator = decorators[i4])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$2(target, key, result);
  return result;
};
var __accessCheck$1 = (obj, member, msg) => member.has(obj) || __typeError$1("Cannot " + msg);
var __privateGet$1 = (obj, member, getter) => (__accessCheck$1(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd$1 = (obj, member, value) => member.has(obj) ? __typeError$1("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet2 = (obj, member, value, setter) => (__accessCheck$1(obj, member, "write to private field"), member.set(obj, value), value);
var _apiKey;
const SERVICE_TYPES = [
  { value: "WMS", label: "Web Harita Servisi (WMS)" },
  { value: "WMTS", label: "Web Harita Karo Servisi (WMTS)" },
  { value: "WFS", label: "Web Özellik Servisi (WFS)" },
  { value: "WCS", label: "Web Kapsama Servisi (WCS)" }
];
function servicePlaceholder(serviceType) {
  const path = serviceType.toLowerCase();
  return `Ör: https://.../${path}`;
}
const ICON_CLOSE = o$1(iconNodeToString(_16_default$v));
const ICON_DOWNLOAD = o$1(iconNodeToString(_16_default$p));
const ICON_RENEW = o$1(iconNodeToString(_16_default$c));
const ICON_VIEW = o$1(iconNodeToString(_16_default$4));
const ICON_VIEW_OFF = o$1(iconNodeToString(_16_default$3));
const ICON_CLOUD_DOWNLOAD = o$1(iconNodeToString(_16_default$u));
let TucbsServiceUpload = class extends i$3 {
  constructor() {
    super(...arguments);
    this.open = false;
    this.mapElementId = "";
    __privateAdd$1(this, _apiKey, "");
    this.customCss = "";
    this._customCssState = { sheet: null };
    this._serviceType = "WMS";
    this._serviceUrl = "";
    this._discovering = false;
    this._discovery = new ServiceDiscoveryController(this, {
      layerManager: () => this.layerManager,
      resetDiscovery: () => this._resetDiscovery(),
      setDiscovering: (discovering) => {
        this._discovering = discovering;
      },
      setError: (message) => {
        this._discoveryError = message;
      },
      setItems: (items) => {
        this._discoveredItems = items;
      },
      setTiffFormat: (format) => {
        this._discoveredTiffFormat = format;
      }
    });
    this._discoveryError = "";
    this._discoveredItems = [];
    this._selectedIdentifiers = [];
    this._addError = "";
    this._drag = new DraggablePanelController(this, {
      getPanel: () => this,
      ignoreSelector: ".close-btn, .reset-btn",
      onMove: () => this._syncPreviewPosition()
    });
    this._listScroll = new VirtualScrollbar(
      this,
      () => this._discoveredListEl,
      () => this._scrollThumbEl
    );
    this._timers = new TimerBag(this);
    this._onWindowResize = () => {
      this._syncPreviewPosition();
      this._listScroll.sync();
    };
  }
  set apiKey(value) {
    const old = __privateGet$1(this, _apiKey);
    __privateSet2(this, _apiKey, value ?? "");
    this.requestUpdate("apiKey", old);
  }
  /** apiKey tanımlıysa `"••••••"`, değilse boş metin döner; gerçek değer dışarıdan okunamaz. */
  get apiKey() {
    return __privateGet$1(this, _apiKey) ? "••••••" : "";
  }
  /** Bileşen DOM'a bağlandığında pencere `resize` dinleyicisini kurar (önizleme konumu/scroll-thumb senkronu için). */
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("resize", this._onWindowResize);
  }
  /** Bileşen DOM'dan kaldırıldığında `resize` dinleyicisini ve gömülü önizleme elementini kaldırır. */
  disconnectedCallback() {
    var _a2;
    window.removeEventListener("resize", this._onWindowResize);
    (_a2 = this._previewEl) == null ? void 0 : _a2.remove();
    this._previewEl = void 0;
    super.disconnectedCallback();
  }
  _ensurePreviewEl() {
    if (!this._previewEl) {
      const el = document.createElement("tucbs-map-preview");
      el.setAttribute("basemap", "hgm-temel");
      el.apiKey = __privateGet$1(this, _apiKey);
      el.zoomToLayer = true;
      el.style.position = "fixed";
      el.style.zIndex = "1100";
      el.style.display = "none";
      document.body.appendChild(el);
      this._previewEl = el;
    }
    return this._previewEl;
  }
  // Dialog'un o anki ekran konumuna (surukleniyor olsa bile) TAM USTUNE,
  // sol kenari dialog'un sol kenariyla hizali ve genisligi dialog ile
  // BIREBIR ESIT olacak sekilde yerlesir (yatay/landscape serit, sabit
  // yukseklik: PREVIEW_HEIGHT_PX). getBoundingClientRect() zaten
  // viewport-relative koordinat dondurdugu icin position:fixed bir
  // "kardes" element'i konumlandirmak icin dogrudan kullanilabilir.
  // width/height burada `.style` degil dogrudan REACTIVE PROPERTY olarak
  // atanir (`el.width`/`el.height`) — TucbsMapPreview.render() bunlari
  // `.preview-box`'in inline style'ina kendi template'i icinde
  // islediginden, host'un kendi `.style`'ini degistirmek onlari etkilemez.
  _syncPreviewPosition() {
    if (!this._previewEl) return;
    const rect = this.getBoundingClientRect();
    this._previewEl.style.left = `${rect.left}px`;
    this._previewEl.style.top = `${rect.top - TucbsServiceUpload.PREVIEW_HEIGHT_PX}px`;
    this._previewEl.width = `${rect.width}px`;
    this._previewEl.height = `${TucbsServiceUpload.PREVIEW_HEIGHT_PX}px`;
  }
  // Katmanlar listesi gorunur oldugu surece (dialog acik + en az 1 sonuc
  // bulundu) preview gorunur kalir; layerOptions her cagrida guncellenir
  // (secili katman degisince veya secim kalkinca undefined olarak).
  _updatePreview() {
    const shouldShow = this.open && this._discoveredItems.length > 0;
    if (!shouldShow) {
      if (this._previewEl) this._previewEl.style.display = "none";
      return;
    }
    const el = this._ensurePreviewEl();
    el.style.display = "inline-block";
    el.apiKey = __privateGet$1(this, _apiKey);
    el.layerOptions = this._previewSpec;
    this._syncPreviewPosition();
    this._timers.requestAnimationFrame(() => this._syncPreviewPosition());
  }
  // === Yasam Dongusu: LayerManager baglama (TucbsFileUpload'daki ile ayni yontem) ===
  /** `layerManager` dışarıdan atanmamışsa, `mapElementId` üzerinden `tucbs-map`'e bağlanmayı dener. */
  firstUpdated() {
    var _a2;
    if (this.layerManager || !this.mapElementId) return;
    const mapEl = document.getElementById(this.mapElementId);
    if (!mapEl) return;
    if (mapEl.layerManager) {
      this.layerManager = mapEl.layerManager;
      (_a2 = mapEl._grantApiKeyTo) == null ? void 0 : _a2.call(mapEl, this);
    } else {
      mapEl.addEventListener(
        "ready",
        () => {
          var _a3;
          if (mapEl.layerManager) this.layerManager = mapEl.layerManager;
          (_a3 = mapEl._grantApiKeyTo) == null ? void 0 : _a3.call(mapEl, this);
        },
        { once: true }
      );
    }
  }
  /** Reactive property değişikliklerini işler, önizlemeyi ve liste scroll-thumb'unu günceller. */
  updated(changedProperties) {
    if (changedProperties.has("customCss")) {
      applyCustomCss(this.shadowRoot, this.customCss, this._customCssState, "tucbs-service-upload");
    }
    if (changedProperties.has("open") && this.open) {
      this.style.removeProperty("left");
      this.style.removeProperty("top");
      this.style.removeProperty("transform");
    }
    this.toggleAttribute(
      "data-preview-open",
      this._discoveredItems.length > 0
    );
    this._updatePreview();
    this._timers.requestAnimationFrame(() => this._listScroll.sync());
  }
  _close() {
    this.open = false;
    this._previewIdentifier = void 0;
    this._previewSpec = void 0;
    this.dispatchEvent(
      new CustomEvent("tucbs-service-upload-closed", {
        bubbles: true,
        composed: true
      })
    );
  }
  // Servis turu veya adresi degistiginde, onceki aramaya ait sonuclar artik
  // gecersiz oldugu icin temizlenir.
  _resetDiscovery() {
    this._discovery.invalidate();
    this._discoveryError = "";
    this._discoveredItems = [];
    this._discoveredTiffFormat = void 0;
    this._selectedIdentifiers = [];
    this._addError = "";
    this._previewIdentifier = void 0;
    this._previewSpec = void 0;
  }
  _toggleSelected(identifier, checked) {
    this._selectedIdentifiers = checked ? [...this._selectedIdentifiers, identifier] : this._selectedIdentifiers.filter(
      (candidate) => candidate !== identifier
    );
    this._addError = "";
  }
  // Onizleme paneli her zaman TEK bir katman gosterir: yeni bir satirin
  // butonuna basmak oncekini otomatik kapatir, ayni satira tekrar basmak
  // onizlemeyi tamamen kapatir.
  _togglePreview(item) {
    if (this._previewIdentifier === item.identifier) {
      this._previewIdentifier = void 0;
      this._previewSpec = void 0;
    } else {
      this._previewIdentifier = item.identifier;
      this._previewSpec = this._previewSpecFor(item);
    }
    this._updatePreview();
  }
  // WMTS disindaki servis turlerinde tileMatrixSetID gerekmez; WMTS'te
  // eksikse (capabilities'te bulunamadiysa) onizleme sessizce atlanir —
  // ayni kural _addOneLayer'da hata olarak ele alinir, burada sadece
  // onizleme butonunun bu satir icin calismamasina yol acar.
  _previewSpecFor(item) {
    if (this._serviceType === "WMTS" && !item.tileMatrixSetID) return void 0;
    const url = baseServiceUrl(this._serviceUrl.trim());
    const id = `service-upload-preview-${item.identifier}`;
    switch (this._serviceType) {
      case "WMS":
        return {
          layerType: "WMS",
          options: { id, title: item.title, url, layers: item.identifier }
        };
      case "WMTS":
        return {
          layerType: "WMTS",
          options: {
            id,
            title: item.title,
            url,
            layer: item.identifier,
            tileMatrixSetID: item.tileMatrixSetID
          }
        };
      case "WFS":
        return {
          layerType: "WFS",
          options: { id, title: item.title, url, typeName: item.identifier }
        };
      case "WCS": {
        const rectangle = wcsRectangleFor(item);
        return {
          layerType: "WCS",
          options: {
            id,
            title: item.title,
            url,
            coverageId: item.identifier,
            ...rectangle && { rectangle }
          }
        };
      }
      default:
        return void 0;
    }
  }
  // Tum formu (servis turu, servis adresi, kesif sonuclari/secimleri, onizleme)
  // ilk acilistaki varsayilan duruma dondurur -- TucbsStyleEditor._reset() ile
  // AYNI amac (kullaniciya, elle tek tek temizlemek yerine tek tikla "bastan
  // basla" secenegi sunmak), buradaki karsiligi.
  _resetFields() {
    this._serviceType = "WMS";
    this._serviceUrl = "";
    this._resetDiscovery();
  }
  _selectServiceType(value) {
    this._serviceType = value;
    this._serviceUrl = "";
    this._resetDiscovery();
  }
  _setServiceUrl(value) {
    this._serviceUrl = value;
    this._resetDiscovery();
  }
  async _addOneLayer(item) {
    if (this._serviceType === "WMTS" && !item.tileMatrixSetID) {
      throw new LayerOperationError("LAYER_WMTS_TILEMATRIXSET_MISSING", "Bu katman için TileMatrixSet bilgisi bulunamadı.");
    }
    const url = baseServiceUrl(this._serviceUrl.trim());
    const id = `service-${item.identifier}-${Date.now()}`;
    const layerManager = this.layerManager;
    switch (this._serviceType) {
      case "WMS": {
        const options = {
          id,
          title: item.title,
          url,
          layers: item.identifier,
          ...this._discoveredTiffFormat && {
            tiffFormat: this._discoveredTiffFormat,
            geographicBoundingBox: item.geographicBoundingBox
          }
        };
        await layerManager.add("WMS", options);
        break;
      }
      case "WMTS":
        await layerManager.add("WMTS", {
          id,
          title: item.title,
          url,
          layer: item.identifier,
          tileMatrixSetID: item.tileMatrixSetID
        });
        break;
      case "WFS": {
        const onFeaturesTruncated = (payload) => {
          if (payload.id !== id) return;
          showToast(
            "warning",
            `${payload.totalCount} özellikten sadece ${payload.loadedCount} tanesi yüklendi; tamamı için filtre uygulayın.`
          );
        };
        layerManager.on("layer:features-truncated", onFeaturesTruncated);
        try {
          await layerManager.add("WFS", {
            id,
            title: item.title,
            url,
            typeName: item.identifier
          });
        } finally {
          layerManager.off("layer:features-truncated", onFeaturesTruncated);
        }
        break;
      }
      case "WCS": {
        const rectangle = wcsRectangleFor(item);
        const options = {
          id,
          title: item.title,
          url,
          coverageId: item.identifier,
          ...rectangle && { rectangle },
          ...this._discoveredTiffFormat && {
            tiffFormat: this._discoveredTiffFormat
          }
        };
        await layerManager.add("WCS", options);
        break;
      }
    }
  }
  // Secilen katmanlarin tumunu sirayla (ayni sunucuyu ayni anda cok sayida
  // istekle bogmamak icin) eklemeye calisir. Basarisiz olanlar secili
  // kalir ki kullanici sadece onlari tekrar deneyebilsin; basarili olanlar
  // secimden cikarilir. Panel yalnizca hepsi basarili olduysa kapanir.
  async _addSelectedLayers() {
    if (!this.layerManager) {
      this._addError = "Harita hazır değil, katman eklenemedi.";
      return;
    }
    const toAdd = this._discoveredItems.filter(
      (candidate) => this._selectedIdentifiers.includes(candidate.identifier)
    );
    if (toAdd.length === 0) return;
    beginBusy("Katmanlar ekleniyor…");
    this._addError = "";
    const failed = [];
    for (const item of toAdd) {
      try {
        await this._addOneLayer(item);
      } catch (err) {
        if (err instanceof TucbsError) {
          console.error(`[tucbs-service-upload] ${err.code} (${err.number}): ${err.message}`);
        } else {
          console.error(err);
        }
        failed.push({
          label: item.title || item.identifier,
          message: err instanceof Error ? err.message : String(err)
        });
      }
    }
    const failedLabels = failed.map((f2) => f2.label);
    this._selectedIdentifiers = failed.length === 0 ? [] : toAdd.filter((item) => failedLabels.includes(item.title || item.identifier)).map((item) => item.identifier);
    endBusy();
    if (failed.length === 0) {
      this._close();
    } else if (failed.length === 1) {
      this._addError = `"${failed[0].label}" eklenemedi: ${failed[0].message}`;
    } else {
      this._addError = `${failed.length}/${toAdd.length} katman eklenemedi:
${failed.map((f2) => `• ${f2.label}: ${f2.message}`).join("\n")}`;
    }
  }
  _addButtonLabel() {
    if (this._selectedIdentifiers.length > 1) {
      return `Haritaya Ekle (${this._selectedIdentifiers.length})`;
    }
    return "Haritaya Ekle";
  }
  /** Bileşenin şablonunu render eder (`open` false ise boş şablon). */
  render() {
    if (!this.open) return b``;
    const hasLayers = this._discoveredItems.length > 0;
    return b`
      <div class="panel${hasLayers ? " with-layers" : ""}">
        <div
            class="header"
            @pointerdown=${(event) => this._drag.start(event)}
          >
            <span class="title"><span class="title-icon">${ICON_CLOUD_DOWNLOAD}</span>Coğrafi Veri Servisi Ekle</span>
            <div class="header-actions">
              <button
                type="button"
                class="reset-btn"
                @click=${() => this._resetFields()}
              >
                ${ICON_RENEW} Sıfırla
              </button>
              <button
                type="button"
                class="close-btn"
                aria-label="Kapat"
                @click=${() => this._close()}
              >
                ${ICON_CLOSE}
              </button>
            </div>
          </div>

          <div class="content">
            <div class="form-column">
              <cds-dropdown
                title-text="Servis Türü seçiniz"
                label="Seçiniz"
                .value=${this._serviceType}
                @cds-dropdown-selected=${(event) => {
      this._selectServiceType(event.detail.item.value);
    }}
              >
                ${SERVICE_TYPES.map(
      (option) => b`<cds-dropdown-item value=${option.value}
                      >${option.label}</cds-dropdown-item
                    >`
    )}
              </cds-dropdown>

              <div class="url-row">
                <cds-text-input
                  label="Servis Adresi giriniz"
                  placeholder=${servicePlaceholder(this._serviceType)}
                  .value=${this._serviceUrl}
                  @input=${(event) => {
      this._setServiceUrl(
        event.target.value
      );
    }}
                ></cds-text-input>

                <button
                  type="button"
                  class="fetch-btn"
                  title="Servis bilgilerini getir"
                  aria-label="Servis bilgilerini getir"
                  ?disabled=${this._discovering}
                  @click=${() => this._discovery.discover(this._serviceType, this._serviceUrl)}
                >
                  ${ICON_DOWNLOAD}
                </button>
              </div>

              ${this._discoveryError ? b`<div class="error-text">${this._discoveryError}</div>` : ""}
            </div>

            ${hasLayers ? b`
                  <div class="katmanlar-column">
                    <span class="section-label">Katmanlar</span>
                    <div class="discovered-list-wrap">
                      <div
                        class="discovered-list"
                        role="group"
                        aria-label="Katmanlar"
                        @scroll=${() => this._listScroll.sync()}
                      >
                        ${this._discoveredItems.map((item) => {
      const isPreviewing = this._previewIdentifier === item.identifier;
      const previewLabel = isPreviewing ? "Önizlemeyi kapat" : "Haritada önizle";
      return b`
                            <div class="discovered-row">
                              <cds-checkbox
                                title=${item.title}
                                .checked=${this._selectedIdentifiers.includes(
        item.identifier
      )}
                                @cds-checkbox-changed=${(event) => {
        var _a2;
        this._toggleSelected(
          item.identifier,
          !!((_a2 = event.detail) == null ? void 0 : _a2.checked)
        );
      }}
                              >
                                ${item.title}
                              </cds-checkbox>
                              <button
                                type="button"
                                class="preview-toggle-btn"
                                aria-pressed=${isPreviewing}
                                title=${previewLabel}
                                aria-label=${previewLabel}
                                @click=${() => this._togglePreview(item)}
                              >
                                ${isPreviewing ? ICON_VIEW : ICON_VIEW_OFF}
                              </button>
                            </div>
                          `;
    })}
                      </div>
                      <div
                        class="scroll-thumb"
                        @pointerdown=${(event) => this._listScroll.startDrag(event)}
                      ></div>
                    </div>

                    ${this._addError ? b`<div class="error-text">${this._addError}</div>` : ""}

                    <button
                      type="button"
                      class="add-layer-btn"
                      ?disabled=${this._selectedIdentifiers.length === 0}
                      @click=${() => this._addSelectedLayers()}
                    >
                      ${this._addButtonLabel()}
                    </button>
                  </div>
                ` : ""}
          </div>
      </div>
    `;
  }
};
_apiKey = /* @__PURE__ */ new WeakMap();
TucbsServiceUpload.styles = serviceUploadStyles;
TucbsServiceUpload.PREVIEW_HEIGHT_PX = 300;
__decorateClass$3([
  n$1({ type: Boolean, reflect: true })
], TucbsServiceUpload.prototype, "open", 2);
__decorateClass$3([
  n$1({ attribute: false })
], TucbsServiceUpload.prototype, "layerManager", 2);
__decorateClass$3([
  n$1()
], TucbsServiceUpload.prototype, "mapElementId", 2);
__decorateClass$3([
  n$1({ attribute: "api-key" })
], TucbsServiceUpload.prototype, "apiKey", 1);
__decorateClass$3([
  n$1({ attribute: "custom-css" })
], TucbsServiceUpload.prototype, "customCss", 2);
__decorateClass$3([
  r()
], TucbsServiceUpload.prototype, "_serviceType", 2);
__decorateClass$3([
  r()
], TucbsServiceUpload.prototype, "_serviceUrl", 2);
__decorateClass$3([
  r()
], TucbsServiceUpload.prototype, "_discovering", 2);
__decorateClass$3([
  r()
], TucbsServiceUpload.prototype, "_discoveryError", 2);
__decorateClass$3([
  r()
], TucbsServiceUpload.prototype, "_discoveredItems", 2);
__decorateClass$3([
  r()
], TucbsServiceUpload.prototype, "_discoveredTiffFormat", 2);
__decorateClass$3([
  r()
], TucbsServiceUpload.prototype, "_selectedIdentifiers", 2);
__decorateClass$3([
  r()
], TucbsServiceUpload.prototype, "_addError", 2);
__decorateClass$3([
  r()
], TucbsServiceUpload.prototype, "_previewIdentifier", 2);
__decorateClass$3([
  e$3(".discovered-list")
], TucbsServiceUpload.prototype, "_discoveredListEl", 2);
__decorateClass$3([
  e$3(".scroll-thumb")
], TucbsServiceUpload.prototype, "_scrollThumbEl", 2);
TucbsServiceUpload = __decorateClass$3([
  t$3("tucbs-service-upload")
], TucbsServiceUpload);
var __getOwnPropDesc$2 = Object.getOwnPropertyDescriptor;
var __decorateClass$2 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$2(target, key) : target;
  for (var i4 = decorators.length - 1, decorator; i4 >= 0; i4--)
    if (decorator = decorators[i4])
      result = decorator(result) || result;
  return result;
};
let TucbsLayerExport = class extends i$3 {
  /**
   * SADECE Çizim Katmanı (DRAWING) için sunulur (bkz TucbsLayerList).
   *
   * @example
   * ```ts
   * layerExport.exportLayer(map.layerManager, "katman-id", "katmanim");
   * ```
   */
  exportLayer(layerManager, id, title) {
    layerManager.exportLayerGeoJSON(id, title);
  }
  /** Analiz sonucu katmanı KML indirir. Çizim menüsü bu metodu çağırmaz. */
  exportLayerKml(layerManager, id, title) {
    layerManager.exportLayerKml(id, title);
  }
  /** Analiz sonucu katmanı Shapefile zip indirir. Çizim menüsü bu metodu çağırmaz. */
  exportLayerShapefile(layerManager, id, title) {
    layerManager.exportLayerShapefile(id, title);
  }
  /**
   * SADECE sunucusu tiff/geotiff destekleyen WMS/WCS katmanları için
   * sunulur (bkz LayerManager.isGeoTiffExportAvailable). GeoJSON export'un
   * aksine ağdan gerçek bir GetMap/GetCoverage isteği attığı için
   * başarısız olabilir -- çağıran taraf (TucbsLayerList) hatayı yakalar.
   *
   * @example
   * ```ts
   * await layerExport.exportLayerAsGeoTiff(map.layerManager, "katman-id", "katmanim");
   * ```
   */
  exportLayerAsGeoTiff(layerManager, id, title) {
    return layerManager.exportLayerAsGeoTiff(id, title);
  }
};
TucbsLayerExport = __decorateClass$2([
  t$3("tucbs-layer-export")
], TucbsLayerExport);
var __defProp$1 = Object.defineProperty;
var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
var __decorateClass$1 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$1(target, key) : target;
  for (var i4 = decorators.length - 1, decorator; i4 >= 0; i4--)
    if (decorator = decorators[i4])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$1(target, key, result);
  return result;
};
let TucbsBusyOverlay = class extends i$3 {
  constructor() {
    super(...arguments);
    this.active = false;
    this._message = "İşlem sürüyor…";
    this._shownAt = 0;
    this._timers = new TimerBag(this);
    this._onBusyChanged = (event) => {
      const detail = event.detail;
      if (detail.busy && detail.message) this._message = detail.message;
      if (detail.busy) {
        this._timers.clearTimeout(this._hideTimer ?? null);
        this._hideTimer = void 0;
        if (!this.active && this._showTimer === void 0) {
          this._showTimer = this._timers.setTimeout(() => {
            this._showTimer = void 0;
            this.active = true;
            this._shownAt = Date.now();
          }, TucbsBusyOverlay.SHOW_DELAY_MS);
        }
        return;
      }
      if (this._showTimer !== void 0) {
        this._timers.clearTimeout(this._showTimer);
        this._showTimer = void 0;
        return;
      }
      if (!this.active) return;
      const remaining = TucbsBusyOverlay.MIN_VISIBLE_MS - (Date.now() - this._shownAt);
      if (remaining <= 0) {
        this.active = false;
        return;
      }
      this._hideTimer = this._timers.setTimeout(() => {
        this._hideTimer = void 0;
        this.active = false;
      }, remaining);
    };
  }
  /** `document` üzerindeki `tucbs-busy-changed` event'ine abone olur (bkz `shared/util/busy.ts`). */
  connectedCallback() {
    super.connectedCallback();
    document.addEventListener("tucbs-busy-changed", this._onBusyChanged);
  }
  /** `document` event aboneliğini kaldırır ve bekleyen gösterme/gizleme zamanlayıcılarını temizler. */
  disconnectedCallback() {
    document.removeEventListener("tucbs-busy-changed", this._onBusyChanged);
    this._showTimer = void 0;
    this._hideTimer = void 0;
    super.disconnectedCallback();
  }
  /** Bileşenin şablonunu render eder: etkin değilken boş şablon, etkinken spinner ve mesajlı meşgul paneli. */
  render() {
    if (!this.active) return b``;
    return b`
      <div class="panel" role="alert" aria-live="assertive">
        <span class="spinner"></span>
        <span>${this._message}</span>
      </div>
    `;
  }
};
TucbsBusyOverlay.styles = i$6`
    :host {
      position: fixed;
      inset: 0;
      z-index: 2000;
      display: none;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.35);
    }

    :host([active]) {
      display: flex;
    }

    .panel {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 1.25rem;
      background: #ffffff;
      border-radius: 4px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      font-family: "IBM Plex Sans", system-ui, sans-serif;
      font-size: 0.875rem;
      color: var(--cds-text-primary, #161616);
    }

    .spinner {
      width: 24px;
      height: 24px;
      flex: none;
      border: 2.5px solid var(--cds-border-subtle, #e0e0e0);
      border-top-color: var(--cds-interactive, #0f62fe);
      border-radius: 50%;
      animation: tucbs-busy-spin 0.7s linear infinite;
    }

    @keyframes tucbs-busy-spin {
      to {
        transform: rotate(360deg);
      }
    }
  `;
TucbsBusyOverlay.SHOW_DELAY_MS = 150;
TucbsBusyOverlay.MIN_VISIBLE_MS = 300;
__decorateClass$1([
  n$1({ type: Boolean, reflect: true })
], TucbsBusyOverlay.prototype, "active", 2);
__decorateClass$1([
  r()
], TucbsBusyOverlay.prototype, "_message", 2);
TucbsBusyOverlay = __decorateClass$1([
  t$3("tucbs-busy-overlay")
], TucbsBusyOverlay);
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __typeError2 = (msg) => {
  throw TypeError(msg);
};
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i4 = decorators.length - 1, decorator; i4 >= 0; i4--)
    if (decorator = decorators[i4])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
var __accessCheck2 = (obj, member, msg) => member.has(obj) || __typeError2("Cannot " + msg);
var __privateGet2 = (obj, member, getter) => (__accessCheck2(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd2 = (obj, member, value) => member.has(obj) ? __typeError2("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var _apiKeyState;
const TOOLBAR_TOOLS = "zoom,goto-coordinate,draw,measure,analysis,delete,settings,print";
const TOOLBAR_TOOL_PROPS = {
  draw: { tools: "point,polyline,polygon,rectangle,circle,freehand" }
};
let TucbsApp = class extends i$3 {
  constructor() {
    super(...arguments);
    __privateAdd2(this, _apiKeyState, new WriteOnlyApiKey(this));
    this.basemap = "hgm-temel";
    this.mode = "3D";
    this.quality = 70;
    this.showLayerList = true;
    this.showToolbar = true;
    this.showInfoBar = true;
    this._map = null;
    this._onMapReady = (event) => {
      event.stopPropagation();
      const { map } = event.detail;
      this._map = map;
      this.dispatchEvent(
        new CustomEvent("ready", { detail: { map }, bubbles: true, composed: true })
      );
    };
    this._onMapError = (event) => {
      event.stopPropagation();
      const detail = event.detail;
      this.dispatchEvent(
        new CustomEvent("error", { detail, bubbles: true, composed: true })
      );
    };
  }
  set apiKey(value) {
    __privateGet2(this, _apiKeyState).write(value);
  }
  /** apiKey tanımlıysa `"••••••"`, değilse boş metin döner; gerçek değer dışarıdan okunamaz. */
  get apiKey() {
    return __privateGet2(this, _apiKeyState).masked;
  }
  // tucbs-map (ve dolayisiyla dahili Cesium widgets.css'i) Shadow DOM
  // sinirini gecemedigi icin -- ayrica tucbs-layer-list'in kendi
  // "document.querySelector('tucbs-file-upload')" tarzi varlik-tespiti da
  // ust-seviye document'e bakiyor -- TucbsApp de TucbsMap ile AYNI nedenle
  // Light DOM kullanir (kendi Shadow root'unu olusturmaz).
  /** Shadow DOM yerine Light DOM kullanır (bkz yukarıdaki WHY yorumu). */
  createRenderRoot() {
    return this;
  }
  /**
   * `basemap`/`mode`/`quality` property'lerindeki degisiklikleri, harita
   * hazir oldugunda (`_map` atanmisken) ilgili `Map` metodlarina uygular.
   *
   * @param changed - Bu guncellemede degisen property'lerin eski degerleri.
   */
  updated(changed) {
    if (!this._map) return;
    if (changed.has("basemap")) this._map.setBasemap(this.basemap);
    if (changed.has("mode")) this._map.setMode(this.mode);
    if (changed.has("quality")) this._map.setQuality(this.quality);
  }
  /**
   * Tam harita uygulamasini olusturur: dahili `<tucbs-layer-list>`,
   * `<tucbs-map>`, `<tucbs-toolbar>`, `<tucbs-identify-panel>`,
   * `<tucbs-info-bar>` ve varlik-tespiti icin kullanilan ciplak marker
   * tag'leri (`tucbs-file-upload`, `tucbs-service-upload`,
   * `tucbs-style-editor`, `tucbs-legend-panel`, `tucbs-layer-export`,
   * `tucbs-authorized-layers`).
   */
  render() {
    var _a2, _b, _c, _d;
    return b`
      <style>
        tucbs-app {
          display: block;
          width: 100%;
          height: 100%;
        }
      </style>

      ${this.showLayerList ? b`<tucbs-layer-list
            .layerManager=${(_a2 = this._map) == null ? void 0 : _a2.layerManager}
            .map=${this._map ?? void 0}
            .apiKey=${__privateGet2(this, _apiKeyState).real}
          ></tucbs-layer-list>` : A}

      <tucbs-map
        .apiKey=${__privateGet2(this, _apiKeyState).real}
        .basemap=${this.basemap}
        .mode=${this.mode}
        .quality=${this.quality}
        @ready=${this._onMapReady}
        @error=${this._onMapError}
      ></tucbs-map>

      ${this.showToolbar ? b`<tucbs-toolbar
            .map=${this._map ?? void 0}
            tools=${TOOLBAR_TOOLS}
            .toolProps=${TOOLBAR_TOOL_PROPS}
          ></tucbs-toolbar>` : A}

      <tucbs-identify-panel
        .interactionManager=${(_b = this._map) == null ? void 0 : _b.interactionManager}
        .layerManager=${(_c = this._map) == null ? void 0 : _c.layerManager}
      ></tucbs-identify-panel>

      ${this.showInfoBar ? b`<tucbs-info-bar
            .interactionManager=${(_d = this._map) == null ? void 0 : _d.interactionManager}
            .map=${this._map ?? void 0}
          ></tucbs-info-bar>` : A}

      <!-- tucbs-layer-list kendi ic-taraf file-upload/service-upload/style-
           editor/legend-panel butonlarini SADECE bu tag'lerin kendi KOKUNDE
           (this.getRootNode() -- document VEYA bir shadow root, bkz GC-03
           4.4 Adim 6/internal/MarkerWatcher.ts) var oldugunu gorunce
           gosterir; bir MutationObserver ile bu CANLI izlenir (sonradan
           eklenir/kaldirilirsa buton da canli guncellenir). Bu ciplak/bagsiz
           tag'ler SADECE o tespit icin var, gercek isleyisi tucbs-layer-list
           kendi ic bunyesinde .layerManager binding'iyle yapar (bkz.
           TucbsLayerList _openStyleEditor/_openServiceUpload). tucbs-map-preview
           de benzer sekilde tucbs-service-upload tarafindan document.body'ye
           dogrudan portal olarak eklenir -- burada ayrica tag olarak GEREKMEZ. -->
      <tucbs-file-upload></tucbs-file-upload>
      <tucbs-service-upload></tucbs-service-upload>
      <tucbs-style-editor></tucbs-style-editor>
      <tucbs-legend-panel></tucbs-legend-panel>
      <tucbs-layer-export></tucbs-layer-export>
      <tucbs-authorized-layers></tucbs-authorized-layers>
      <tucbs-busy-overlay></tucbs-busy-overlay>
    `;
  }
};
_apiKeyState = /* @__PURE__ */ new WeakMap();
__decorateClass([
  n$1({ attribute: "api-key" })
], TucbsApp.prototype, "apiKey", 1);
__decorateClass([
  n$1()
], TucbsApp.prototype, "basemap", 2);
__decorateClass([
  n$1()
], TucbsApp.prototype, "mode", 2);
__decorateClass([
  n$1({ type: Number })
], TucbsApp.prototype, "quality", 2);
__decorateClass([
  n$1({ attribute: "show-layer-list", converter: defaultTrueAttribute })
], TucbsApp.prototype, "showLayerList", 2);
__decorateClass([
  n$1({ attribute: "show-toolbar", converter: defaultTrueAttribute })
], TucbsApp.prototype, "showToolbar", 2);
__decorateClass([
  n$1({ attribute: "show-info-bar", converter: defaultTrueAttribute })
], TucbsApp.prototype, "showInfoBar", 2);
__decorateClass([
  r()
], TucbsApp.prototype, "_map", 2);
TucbsApp = __decorateClass([
  t$3("tucbs-app")
], TucbsApp);
export {
  TucbsAnalysisPanel,
  TucbsAnalysisTool,
  TucbsApp,
  TucbsAuthorizedLayers,
  TucbsBasemapPicker,
  TucbsBusyOverlay,
  TucbsDeleteTool,
  TucbsDrawTool,
  TucbsFileUpload,
  TucbsGoToCoordinate,
  TucbsIdentifyPanel,
  TucbsInfoBar,
  TucbsLayerExport,
  TucbsLayerList,
  TucbsLegendPanel,
  TucbsMap,
  TucbsMapExport,
  TucbsMapPreview,
  TucbsMeasureTool,
  TucbsPrintTool,
  TucbsQualityBar,
  TucbsServiceUpload,
  TucbsSettingsTool,
  TucbsStyleEditor,
  TucbsToolbar,
  TucbsZoomTool
};
