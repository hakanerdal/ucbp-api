var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var _a, _value;
import { ensureEffectiveApiKeyValid, getUcbpApiBase, TucbsError, Map as _0xf63773, HGM_BASEMAP_IDS, DEFAULT_INITIAL_EXTENT, registerApiKeyRefresh, ApiKeyValidationError, LayerOperationError, MEASURE_LAYER_ID, entityToGeoJSON, featureLabel, measureGround, snapScaleForDisplay, OgcRequestError, buildCapabilitiesUrl, getCapabilities, parseCapabilities, parseWmsTiffFormat, parseWcsTiffFormat, fetchWcsCoverageExtents, detectServiceType, wcsRectangleFor } from "@tucbs/core";
import { Math as _0xf1e7b, Color, Cartesian3, VerticalOrigin, HeightReference, Cartesian2, LabelStyle, CallbackProperty, CallbackPositionProperty, ConstantProperty, PolygonHierarchy, HorizontalOrigin, ScreenSpaceEventHandler, ScreenSpaceEventType, Cartographic } from "cesium";
import "@carbon/web-components/es/components/checkbox/index.js";
import "@carbon/web-components/es/components/dropdown/index.js";
import "@carbon/web-components/es/components/text-input/index.js";
import "@carbon/web-components/es/components/number-input/index.js";
import "@carbon/web-components/es/components/notification/index.js";
import "@carbon/web-components/es/components/data-table/index.js";
import "@carbon/web-components/es/components/accordion/index.js";
import "@carbon/web-components/es/components/file-uploader/file-uploader-drop-container.js";
/**
* @license
* Copyright 2019 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
const t$5 = globalThis, e$7 = t$5["ShadowRoot"] && (void 0 === t$5["ShadyCSS"] || t$5["ShadyCSS"]["nativeShadow"]) && "adoptedStyleSheets" in Document["prototype"] && "replace" in CSSStyleSheet["prototype"], s$4 = Symbol(), o$6 = /* @__PURE__ */ new WeakMap();
let n$4 = class n {
  constructor(_0x24eb74, _0x47dad5, _0x256fd5) {
    if (this["_$cssResult$"] = !![], _0x256fd5 !== s$4) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this["cssText"] = _0x24eb74, this["t"] = _0x47dad5;
  }
  get ["styleSheet"]() {
    let _0x3c6713 = this["o"];
    const _0x8feb4c = this["t"];
    if (e$7 && void 0 === _0x3c6713) {
      const _0xf4ae03 = void 0 !== _0x8feb4c && 1 === _0x8feb4c["length"];
      _0xf4ae03 && (_0x3c6713 = o$6["get"](_0x8feb4c)), void 0 === _0x3c6713 && ((this["o"] = _0x3c6713 = new CSSStyleSheet())["replaceSync"](this["cssText"]), _0xf4ae03 && o$6["set"](_0x8feb4c, _0x3c6713));
    }
    return _0x3c6713;
  }
  ["toString"]() {
    return this["cssText"];
  }
};
const r$4 = (_0x4ee2ba) => new n$4("string" == typeof _0x4ee2ba ? _0x4ee2ba : _0x4ee2ba + "", void 0, s$4), i$5 = (_0xcb6d2, ..._0x1603ae) => {
  const _0x353ced = 1 === _0xcb6d2["length"] ? _0xcb6d2[0] : _0x1603ae["reduce"]((_0x144483, _0x315c44, _0x2270b9) => _0x144483 + ((_0x6ee6f7) => {
    if (!![] === _0x6ee6f7["_$cssResult$"]) return _0x6ee6f7["cssText"];
    if ("number" == typeof _0x6ee6f7) return _0x6ee6f7;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + _0x6ee6f7 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(_0x315c44) + _0xcb6d2[_0x2270b9 + 1], _0xcb6d2[0]);
  return new n$4(_0x353ced, _0xcb6d2, s$4);
}, S$1 = (_0x7e789e, _0x1232c2) => {
  if (e$7) _0x7e789e["adoptedStyleSheets"] = _0x1232c2["map"]((_0x4c7868) => _0x4c7868 instanceof CSSStyleSheet ? _0x4c7868 : _0x4c7868["styleSheet"]);
  else for (const _0x41c0f4 of _0x1232c2) {
    const _0x5573a3 = document["createElement"]("style"), _0x117372 = t$5["litNonce"];
    void 0 !== _0x117372 && _0x5573a3["setAttribute"]("nonce", _0x117372), _0x5573a3["textContent"] = _0x41c0f4["cssText"], _0x7e789e["appendChild"](_0x5573a3);
  }
}, c$3 = e$7 ? (_0x1557c2) => _0x1557c2 : (_0x51f14d) => _0x51f14d instanceof CSSStyleSheet ? ((_0x29cd86) => {
  let _0x187eac = "";
  for (const _0x302b97 of _0x29cd86["cssRules"]) _0x187eac += _0x302b97["cssText"];
  return r$4(_0x187eac);
})(_0x51f14d) : _0x51f14d, { is: i$4, defineProperty: e$6, getOwnPropertyDescriptor: h$2, getOwnPropertyNames: r$3, getOwnPropertySymbols: o$5, getPrototypeOf: n$3 } = Object, a$2 = globalThis, c$2 = a$2["trustedTypes"], l$2 = c$2 ? c$2["emptyScript"] : "", p$2 = a$2["reactiveElementPolyfillSupport"], d$1 = (_0x4d54f0, _0x236a0a) => _0x4d54f0, u$4 = { "toAttribute"(_0x238d6d, _0x476a5d) {
  switch (_0x476a5d) {
    case Boolean:
      _0x238d6d = _0x238d6d ? l$2 : null;
      break;
    case Object:
    case Array:
      _0x238d6d = null == _0x238d6d ? _0x238d6d : JSON["stringify"](_0x238d6d);
  }
  return _0x238d6d;
}, "fromAttribute"(_0x3082bd, _0x1919e9) {
  let _0x42c2c6 = _0x3082bd;
  switch (_0x1919e9) {
    case Boolean:
      _0x42c2c6 = null !== _0x3082bd;
      break;
    case Number:
      _0x42c2c6 = null === _0x3082bd ? null : Number(_0x3082bd);
      break;
    case Object:
    case Array:
      try {
        _0x42c2c6 = JSON["parse"](_0x3082bd);
      } catch (_0x51d68e) {
        _0x42c2c6 = null;
      }
  }
  return _0x42c2c6;
} }, f$1 = (_0x29d549, _0x4d8161) => !i$4(_0x29d549, _0x4d8161), b$1 = { "attribute": !![], "type": String, "converter": u$4, "reflect": ![], "useDefault": ![], "hasChanged": f$1 };
Symbol["metadata"] ?? (Symbol["metadata"] = Symbol("metadata")), a$2["litPropertyMetadata"] ?? (a$2["litPropertyMetadata"] = /* @__PURE__ */ new WeakMap());
let y$1 = class y extends HTMLElement {
  static ["addInitializer"](_0x112431) {
    this["_$Ei"](), (this["l"] ?? (this["l"] = []))["push"](_0x112431);
  }
  static get ["observedAttributes"]() {
    return this["finalize"](), this["_$Eh"] && [...this["_$Eh"]["keys"]()];
  }
  static ["createProperty"](_0x45d6f9, _0x595a93 = b$1) {
    if (_0x595a93["state"] && (_0x595a93["attribute"] = ![]), this["_$Ei"](), this["prototype"]["hasOwnProperty"](_0x45d6f9) && ((_0x595a93 = Object["create"](_0x595a93))["wrapped"] = !![]), this["elementProperties"]["set"](_0x45d6f9, _0x595a93), !_0x595a93["noAccessor"]) {
      const _0x1caa89 = Symbol(), _0x411488 = this["getPropertyDescriptor"](_0x45d6f9, _0x1caa89, _0x595a93);
      void 0 !== _0x411488 && e$6(this["prototype"], _0x45d6f9, _0x411488);
    }
  }
  static ["getPropertyDescriptor"](_0x7fec8d, _0x4b8065, _0x13d50f) {
    const { get: _0x267c0d, set: _0x20056d } = h$2(this["prototype"], _0x7fec8d) ?? { "get"() {
      return this[_0x4b8065];
    }, "set"(_0x2c7a09) {
      this[_0x4b8065] = _0x2c7a09;
    } };
    return { "get": _0x267c0d, "set"(_0x56408f) {
      const _0x32db98 = _0x267c0d == null ? void 0 : _0x267c0d["call"](this);
      _0x20056d == null ? void 0 : _0x20056d["call"](this, _0x56408f), this["requestUpdate"](_0x7fec8d, _0x32db98, _0x13d50f);
    }, "configurable": !![], "enumerable": !![] };
  }
  static ["getPropertyOptions"](_0x230118) {
    return this["elementProperties"]["get"](_0x230118) ?? b$1;
  }
  static ["_$Ei"]() {
    if (this["hasOwnProperty"](d$1("elementProperties"))) return;
    const _0x174a33 = n$3(this);
    _0x174a33["finalize"](), void 0 !== _0x174a33["l"] && (this["l"] = [..._0x174a33["l"]]), this["elementProperties"] = new Map(_0x174a33["elementProperties"]);
  }
  static ["finalize"]() {
    if (this["hasOwnProperty"](d$1("finalized"))) return;
    if (this["finalized"] = !![], this["_$Ei"](), this["hasOwnProperty"](d$1("properties"))) {
      const _0x391d4e = this["properties"], _0x124ed3 = [...r$3(_0x391d4e), ...o$5(_0x391d4e)];
      for (const _0x136e0a of _0x124ed3) this["createProperty"](_0x136e0a, _0x391d4e[_0x136e0a]);
    }
    const _0x2a36d5 = this[Symbol["metadata"]];
    if (null !== _0x2a36d5) {
      const _0x17829f = litPropertyMetadata["get"](_0x2a36d5);
      if (void 0 !== _0x17829f) {
        for (const [_0x326704, _0x4a3848] of _0x17829f) this["elementProperties"]["set"](_0x326704, _0x4a3848);
      }
    }
    this["_$Eh"] = /* @__PURE__ */ new Map();
    for (const [_0x27f33e, _0x321cbd] of this["elementProperties"]) {
      const _0xbbf217 = this["_$Eu"](_0x27f33e, _0x321cbd);
      void 0 !== _0xbbf217 && this["_$Eh"]["set"](_0xbbf217, _0x27f33e);
    }
    this["elementStyles"] = this["finalizeStyles"](this["styles"]);
  }
  static ["finalizeStyles"](_0x249d9a) {
    const _0x245cdf = [];
    if (Array["isArray"](_0x249d9a)) {
      const _0x439357 = new Set(_0x249d9a["flat"](1 / 0)["reverse"]());
      for (const _0x59c3fe of _0x439357) _0x245cdf["unshift"](c$3(_0x59c3fe));
    } else void 0 !== _0x249d9a && _0x245cdf["push"](c$3(_0x249d9a));
    return _0x245cdf;
  }
  static ["_$Eu"](_0xc237fd, _0x27b966) {
    const _0x42a3fc = _0x27b966["attribute"];
    return ![] === _0x42a3fc ? void 0 : "string" == typeof _0x42a3fc ? _0x42a3fc : "string" == typeof _0xc237fd ? _0xc237fd["toLowerCase"]() : void 0;
  }
  constructor() {
    super(), this["_$Ep"] = void 0, this["isUpdatePending"] = ![], this["hasUpdated"] = ![], this["_$Em"] = null, this["_$Ev"]();
  }
  ["_$Ev"]() {
    var _a2;
    this["_$ES"] = new Promise((_0x9cd70d) => this["enableUpdating"] = _0x9cd70d), this["_$AL"] = /* @__PURE__ */ new Map(), this["_$E_"](), this["requestUpdate"](), (_a2 = this["constructor"]["l"]) == null ? void 0 : _a2["forEach"]((_0x1e1473) => _0x1e1473(this));
  }
  ["addController"](_0x2aecc1) {
    var _a2;
    (this["_$EO"] ?? (this["_$EO"] = /* @__PURE__ */ new Set()))["add"](_0x2aecc1), void 0 !== this["renderRoot"] && this["isConnected"] && ((_a2 = _0x2aecc1["hostConnected"]) == null ? void 0 : _a2.call(_0x2aecc1));
  }
  ["removeController"](_0x53eab7) {
    var _a2;
    (_a2 = this["_$EO"]) == null ? void 0 : _a2["delete"](_0x53eab7);
  }
  ["_$E_"]() {
    const _0x54fcb2 = /* @__PURE__ */ new Map(), _0x23297b = this["constructor"]["elementProperties"];
    for (const _0xbe2e1f of _0x23297b["keys"]()) this["hasOwnProperty"](_0xbe2e1f) && (_0x54fcb2["set"](_0xbe2e1f, this[_0xbe2e1f]), delete this[_0xbe2e1f]);
    _0x54fcb2["size"] > 0 && (this["_$Ep"] = _0x54fcb2);
  }
  ["createRenderRoot"]() {
    const _0x4998f9 = this["shadowRoot"] ?? this["attachShadow"](this["constructor"]["shadowRootOptions"]);
    return S$1(_0x4998f9, this["constructor"]["elementStyles"]), _0x4998f9;
  }
  ["connectedCallback"]() {
    var _a2;
    this["renderRoot"] ?? (this["renderRoot"] = this["createRenderRoot"]()), this["enableUpdating"](!![]), (_a2 = this["_$EO"]) == null ? void 0 : _a2["forEach"]((_0x1e75d6) => {
      var _a3;
      return (_a3 = _0x1e75d6["hostConnected"]) == null ? void 0 : _a3.call(_0x1e75d6);
    });
  }
  ["enableUpdating"](_0xb85d2a) {
  }
  ["disconnectedCallback"]() {
    var _a2;
    (_a2 = this["_$EO"]) == null ? void 0 : _a2["forEach"]((_0x35c15c) => {
      var _a3;
      return (_a3 = _0x35c15c["hostDisconnected"]) == null ? void 0 : _a3.call(_0x35c15c);
    });
  }
  ["attributeChangedCallback"](_0x4ffd18, _0x2fbaf0, _0x5f0064) {
    this["_$AK"](_0x4ffd18, _0x5f0064);
  }
  ["_$ET"](_0x2d70e8, _0x89c6e4) {
    var _a2;
    const _0x11f908 = this["constructor"]["elementProperties"]["get"](_0x2d70e8), _0x22b3b6 = this["constructor"]["_$Eu"](_0x2d70e8, _0x11f908);
    if (void 0 !== _0x22b3b6 && !![] === _0x11f908["reflect"]) {
      const _0x71e612 = (void 0 !== ((_a2 = _0x11f908["converter"]) == null ? void 0 : _a2["toAttribute"]) ? _0x11f908["converter"] : u$4)["toAttribute"](_0x89c6e4, _0x11f908["type"]);
      this["_$Em"] = _0x2d70e8, null == _0x71e612 ? this["removeAttribute"](_0x22b3b6) : this["setAttribute"](_0x22b3b6, _0x71e612), this["_$Em"] = null;
    }
  }
  ["_$AK"](_0x220685, _0x5d1f0f) {
    var _a2, _b;
    const _0x527252 = this["constructor"], _0x24aa8a = _0x527252["_$Eh"]["get"](_0x220685);
    if (void 0 !== _0x24aa8a && this["_$Em"] !== _0x24aa8a) {
      const _0x185661 = _0x527252["getPropertyOptions"](_0x24aa8a), _0x210231 = "function" == typeof _0x185661["converter"] ? { "fromAttribute": _0x185661["converter"] } : void 0 !== ((_a2 = _0x185661["converter"]) == null ? void 0 : _a2["fromAttribute"]) ? _0x185661["converter"] : u$4;
      this["_$Em"] = _0x24aa8a;
      const _0xe0c33d = _0x210231["fromAttribute"](_0x5d1f0f, _0x185661["type"]);
      this[_0x24aa8a] = _0xe0c33d ?? ((_b = this["_$Ej"]) == null ? void 0 : _b["get"](_0x24aa8a)) ?? _0xe0c33d, this["_$Em"] = null;
    }
  }
  ["requestUpdate"](_0x1b0e5b, _0x49f31f, _0x9d7a30, _0xbf8274 = ![], _0x58fc8c) {
    var _a2;
    if (void 0 !== _0x1b0e5b) {
      const _0x487c77 = this["constructor"];
      if (![] === _0xbf8274 && (_0x58fc8c = this[_0x1b0e5b]), _0x9d7a30 ?? (_0x9d7a30 = _0x487c77["getPropertyOptions"](_0x1b0e5b)), !((_0x9d7a30["hasChanged"] ?? f$1)(_0x58fc8c, _0x49f31f) || _0x9d7a30["useDefault"] && _0x9d7a30["reflect"] && _0x58fc8c === ((_a2 = this["_$Ej"]) == null ? void 0 : _a2["get"](_0x1b0e5b)) && !this["hasAttribute"](_0x487c77["_$Eu"](_0x1b0e5b, _0x9d7a30)))) return;
      this["C"](_0x1b0e5b, _0x49f31f, _0x9d7a30);
    }
    ![] === this["isUpdatePending"] && (this["_$ES"] = this["_$EP"]());
  }
  ["C"](_0x65a4ce, _0x2f4a8f, { useDefault: _0x39af62, reflect: _0x28bf75, wrapped: _0x19d111 }, _0x45531c) {
    _0x39af62 && !(this["_$Ej"] ?? (this["_$Ej"] = /* @__PURE__ */ new Map()))["has"](_0x65a4ce) && (this["_$Ej"]["set"](_0x65a4ce, _0x45531c ?? _0x2f4a8f ?? this[_0x65a4ce]), !![] !== _0x19d111 || void 0 !== _0x45531c) || (this["_$AL"]["has"](_0x65a4ce) || (this["hasUpdated"] || _0x39af62 || (_0x2f4a8f = void 0), this["_$AL"]["set"](_0x65a4ce, _0x2f4a8f)), !![] === _0x28bf75 && this["_$Em"] !== _0x65a4ce && (this["_$Eq"] ?? (this["_$Eq"] = /* @__PURE__ */ new Set()))["add"](_0x65a4ce));
  }
  async ["_$EP"]() {
    this["isUpdatePending"] = !![];
    try {
      await this["_$ES"];
    } catch (_0x3a6a8b) {
      Promise["reject"](_0x3a6a8b);
    }
    const _0x2f8223 = this["scheduleUpdate"]();
    return null != _0x2f8223 && await _0x2f8223, !this["isUpdatePending"];
  }
  ["scheduleUpdate"]() {
    return this["performUpdate"]();
  }
  ["performUpdate"]() {
    var _a2;
    if (!this["isUpdatePending"]) return;
    if (!this["hasUpdated"]) {
      if (this["renderRoot"] ?? (this["renderRoot"] = this["createRenderRoot"]()), this["_$Ep"]) {
        for (const [_0x34d420, _0x4fa647] of this["_$Ep"]) this[_0x34d420] = _0x4fa647;
        this["_$Ep"] = void 0;
      }
      const _0x51eae9 = this["constructor"]["elementProperties"];
      if (_0x51eae9["size"] > 0) for (const [_0x783fe9, _0x26ee24] of _0x51eae9) {
        const { wrapped: _0x1bed1c } = _0x26ee24, _0xaa8eae = this[_0x783fe9];
        !![] !== _0x1bed1c || this["_$AL"]["has"](_0x783fe9) || void 0 === _0xaa8eae || this["C"](_0x783fe9, void 0, _0x26ee24, _0xaa8eae);
      }
    }
    let _0x58c0a3 = ![];
    const _0x382a51 = this["_$AL"];
    try {
      _0x58c0a3 = this["shouldUpdate"](_0x382a51), _0x58c0a3 ? (this["willUpdate"](_0x382a51), (_a2 = this["_$EO"]) == null ? void 0 : _a2["forEach"]((_0x1f0123) => {
        var _a3;
        return (_a3 = _0x1f0123["hostUpdate"]) == null ? void 0 : _a3.call(_0x1f0123);
      }), this["update"](_0x382a51)) : this["_$EM"]();
    } catch (_0x26fe68) {
      throw _0x58c0a3 = ![], this["_$EM"](), _0x26fe68;
    }
    _0x58c0a3 && this["_$AE"](_0x382a51);
  }
  ["willUpdate"](_0x5c20dc) {
  }
  ["_$AE"](_0x13cc6d) {
    var _a2;
    (_a2 = this["_$EO"]) == null ? void 0 : _a2["forEach"]((_0xb38303) => {
      var _a3;
      return (_a3 = _0xb38303["hostUpdated"]) == null ? void 0 : _a3.call(_0xb38303);
    }), this["hasUpdated"] || (this["hasUpdated"] = !![], this["firstUpdated"](_0x13cc6d)), this["updated"](_0x13cc6d);
  }
  ["_$EM"]() {
    this["_$AL"] = /* @__PURE__ */ new Map(), this["isUpdatePending"] = ![];
  }
  get ["updateComplete"]() {
    return this["getUpdateComplete"]();
  }
  ["getUpdateComplete"]() {
    return this["_$ES"];
  }
  ["shouldUpdate"](_0x57fbf1) {
    return !![];
  }
  ["update"](_0x6cb254) {
    this["_$Eq"] && (this["_$Eq"] = this["_$Eq"]["forEach"]((_0x1b211a) => this["_$ET"](_0x1b211a, this[_0x1b211a]))), this["_$EM"]();
  }
  ["updated"](_0x535966) {
  }
  ["firstUpdated"](_0x54cdce) {
  }
};
y$1["elementStyles"] = [], y$1["shadowRootOptions"] = { "mode": "open" }, y$1[d$1("elementProperties")] = /* @__PURE__ */ new Map(), y$1[d$1("finalized")] = /* @__PURE__ */ new Map(), p$2 == null ? void 0 : p$2({ "ReactiveElement": y$1 }), (a$2["reactiveElementVersions"] ?? (a$2["reactiveElementVersions"] = []))["push"]("2.1.2");
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
const t$4 = globalThis, i$3 = (_0x3aa3d9) => _0x3aa3d9, s$3 = t$4["trustedTypes"], e$5 = s$3 ? s$3["createPolicy"]("lit-html", { "createHTML": (_0x6b0671) => _0x6b0671 }) : void 0, h$1 = "$lit$", o$4 = "lit$" + Math["random"]()["toFixed"](9)["slice"](2) + "$", n$2 = "?" + o$4, r$2 = "<" + n$2 + ">", l$1 = document, c$1 = () => l$1["createComment"](""), a$1 = (_0x2b0364) => null === _0x2b0364 || "object" != typeof _0x2b0364 && "function" != typeof _0x2b0364, u$3 = Array["isArray"], d = (_0x597b73) => u$3(_0x597b73) || "function" == typeof (_0x597b73 == null ? void 0 : _0x597b73[Symbol["iterator"]]), f = "[ 	\n\f\r]", v$1 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, _ = /-->/g, m$1 = />/g, p$1 = RegExp(">|" + f + `(?:([^\\s"'>=/]+)(` + f + "*=" + f + `*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), g = /'/g, $ = /"/g, y2 = /^(?:script|style|textarea|title)$/i, x = (_0x14a0d1) => (_0x247433, ..._0x5a33f4) => ({ "_$litType$": _0x14a0d1, "strings": _0x247433, "values": _0x5a33f4 }), b = x(1), E = Symbol["for"]("lit-noChange"), A = Symbol["for"]("lit-nothing"), C = /* @__PURE__ */ new WeakMap(), P = l$1["createTreeWalker"](l$1, 129);
function V(_0x2045ce, _0x296587) {
  if (!u$3(_0x2045ce) || !_0x2045ce["hasOwnProperty"]("raw")) throw Error("invalid template strings array");
  return void 0 !== e$5 ? e$5["createHTML"](_0x296587) : _0x296587;
}
const N = (_0x72d360, _0x3eb096) => {
  const _0x28126a = _0x72d360["length"] - 1, _0x201494 = [];
  let _0x16d118, _0x376339 = 2 === _0x3eb096 ? "<svg>" : 3 === _0x3eb096 ? "<math>" : "", _0x66c3ad = v$1;
  for (let _0x3471fd = 0; _0x3471fd < _0x28126a; _0x3471fd++) {
    const _0x13cf09 = _0x72d360[_0x3471fd];
    let _0x361fc6, _0xe3d8f5, _0x559b82 = -1, _0x10ab9a = 0;
    for (; _0x10ab9a < _0x13cf09["length"] && (_0x66c3ad["lastIndex"] = _0x10ab9a, _0xe3d8f5 = _0x66c3ad["exec"](_0x13cf09), null !== _0xe3d8f5); ) _0x10ab9a = _0x66c3ad["lastIndex"], _0x66c3ad === v$1 ? "!--" === _0xe3d8f5[1] ? _0x66c3ad = _ : void 0 !== _0xe3d8f5[1] ? _0x66c3ad = m$1 : void 0 !== _0xe3d8f5[2] ? (y2["test"](_0xe3d8f5[2]) && (_0x16d118 = RegExp("</" + _0xe3d8f5[2], "g")), _0x66c3ad = p$1) : void 0 !== _0xe3d8f5[3] && (_0x66c3ad = p$1) : _0x66c3ad === p$1 ? ">" === _0xe3d8f5[0] ? (_0x66c3ad = _0x16d118 ?? v$1, _0x559b82 = -1) : void 0 === _0xe3d8f5[1] ? _0x559b82 = -2 : (_0x559b82 = _0x66c3ad["lastIndex"] - _0xe3d8f5[2]["length"], _0x361fc6 = _0xe3d8f5[1], _0x66c3ad = void 0 === _0xe3d8f5[3] ? p$1 : '"' === _0xe3d8f5[3] ? $ : g) : _0x66c3ad === $ || _0x66c3ad === g ? _0x66c3ad = p$1 : _0x66c3ad === _ || _0x66c3ad === m$1 ? _0x66c3ad = v$1 : (_0x66c3ad = p$1, _0x16d118 = void 0);
    const _0x578dea = _0x66c3ad === p$1 && _0x72d360[_0x3471fd + 1]["startsWith"]("/>") ? " " : "";
    _0x376339 += _0x66c3ad === v$1 ? _0x13cf09 + r$2 : _0x559b82 >= 0 ? (_0x201494["push"](_0x361fc6), _0x13cf09["slice"](0, _0x559b82) + h$1 + _0x13cf09["slice"](_0x559b82) + o$4 + _0x578dea) : _0x13cf09 + o$4 + (-2 === _0x559b82 ? _0x3471fd : _0x578dea);
  }
  return [V(_0x72d360, _0x376339 + (_0x72d360[_0x28126a] || "<?>") + (2 === _0x3eb096 ? "</svg>" : 3 === _0x3eb096 ? "</math>" : "")), _0x201494];
};
class S {
  constructor({ strings: _0xb2c46b, _$litType$: _0x4a478c }, _0x532249) {
    let _0x393612;
    this["parts"] = [];
    let _0xb40389 = 0, _0x518969 = 0;
    const _0x3559a6 = _0xb2c46b["length"] - 1, _0x3ad612 = this["parts"], [_0x517374, _0x557c9e] = N(_0xb2c46b, _0x4a478c);
    if (this["el"] = S["createElement"](_0x517374, _0x532249), P["currentNode"] = this["el"]["content"], 2 === _0x4a478c || 3 === _0x4a478c) {
      const _0x1fcf84 = this["el"]["content"]["firstChild"];
      _0x1fcf84["replaceWith"](..._0x1fcf84["childNodes"]);
    }
    for (; null !== (_0x393612 = P["nextNode"]()) && _0x3ad612["length"] < _0x3559a6; ) {
      if (1 === _0x393612["nodeType"]) {
        if (_0x393612["hasAttributes"]()) {
          for (const _0xc744a9 of _0x393612["getAttributeNames"]()) if (_0xc744a9["endsWith"](h$1)) {
            const _0x51fc7c = _0x557c9e[_0x518969++], _0x3551a2 = _0x393612["getAttribute"](_0xc744a9)["split"](o$4), _0x13eaf9 = /([.?@])?(.*)/["exec"](_0x51fc7c);
            _0x3ad612["push"]({ "type": 1, "index": _0xb40389, "name": _0x13eaf9[2], "strings": _0x3551a2, "ctor": "." === _0x13eaf9[1] ? I : "?" === _0x13eaf9[1] ? L : "@" === _0x13eaf9[1] ? z : H }), _0x393612["removeAttribute"](_0xc744a9);
          } else _0xc744a9["startsWith"](o$4) && (_0x3ad612["push"]({ "type": 6, "index": _0xb40389 }), _0x393612["removeAttribute"](_0xc744a9));
        }
        if (y2["test"](_0x393612["tagName"])) {
          const _0x9cb51b = _0x393612["textContent"]["split"](o$4), _0x392112 = _0x9cb51b["length"] - 1;
          if (_0x392112 > 0) {
            _0x393612["textContent"] = s$3 ? s$3["emptyScript"] : "";
            for (let _0x5d2543 = 0; _0x5d2543 < _0x392112; _0x5d2543++) _0x393612["append"](_0x9cb51b[_0x5d2543], c$1()), P["nextNode"](), _0x3ad612["push"]({ "type": 2, "index": ++_0xb40389 });
            _0x393612["append"](_0x9cb51b[_0x392112], c$1());
          }
        }
      } else {
        if (8 === _0x393612["nodeType"]) {
          if (_0x393612["data"] === n$2) _0x3ad612["push"]({ "type": 2, "index": _0xb40389 });
          else {
            let _0x422948 = -1;
            for (; -1 !== (_0x422948 = _0x393612["data"]["indexOf"](o$4, _0x422948 + 1)); ) _0x3ad612["push"]({ "type": 7, "index": _0xb40389 }), _0x422948 += o$4["length"] - 1;
          }
        }
      }
      _0xb40389++;
    }
  }
  static ["createElement"](_0xc0e291, _0x1bd8d9) {
    const _0x2e591c = l$1["createElement"]("template");
    return _0x2e591c["innerHTML"] = _0xc0e291, _0x2e591c;
  }
}
function M$1(_0x55a186, _0x401b5a, _0x48d90c = _0x55a186, _0x32aed4) {
  var _a2, _b;
  if (_0x401b5a === E) return _0x401b5a;
  let _0x390f09 = void 0 !== _0x32aed4 ? (_a2 = _0x48d90c["_$Co"]) == null ? void 0 : _a2[_0x32aed4] : _0x48d90c["_$Cl"];
  const _0x2c4f8d = a$1(_0x401b5a) ? void 0 : _0x401b5a["_$litDirective$"];
  return (_0x390f09 == null ? void 0 : _0x390f09["constructor"]) !== _0x2c4f8d && ((_b = _0x390f09 == null ? void 0 : _0x390f09["_$AO"]) == null ? void 0 : _b.call(_0x390f09, ![]), void 0 === _0x2c4f8d ? _0x390f09 = void 0 : (_0x390f09 = new _0x2c4f8d(_0x55a186), _0x390f09["_$AT"](_0x55a186, _0x48d90c, _0x32aed4)), void 0 !== _0x32aed4 ? (_0x48d90c["_$Co"] ?? (_0x48d90c["_$Co"] = []))[_0x32aed4] = _0x390f09 : _0x48d90c["_$Cl"] = _0x390f09), void 0 !== _0x390f09 && (_0x401b5a = M$1(_0x55a186, _0x390f09["_$AS"](_0x55a186, _0x401b5a["values"]), _0x390f09, _0x32aed4)), _0x401b5a;
}
class R {
  constructor(_0x4ae25a, _0x4982a1) {
    this["_$AV"] = [], this["_$AN"] = void 0, this["_$AD"] = _0x4ae25a, this["_$AM"] = _0x4982a1;
  }
  get ["parentNode"]() {
    return this["_$AM"]["parentNode"];
  }
  get ["_$AU"]() {
    return this["_$AM"]["_$AU"];
  }
  ["u"](_0x27ca2c) {
    const { el: { content: _0x8ff896 }, parts: _0x29740f } = this["_$AD"], _0x13b770 = ((_0x27ca2c == null ? void 0 : _0x27ca2c["creationScope"]) ?? l$1)["importNode"](_0x8ff896, !![]);
    P["currentNode"] = _0x13b770;
    let _0x11c34b = P["nextNode"](), _0x5b38a9 = 0, _0x1ec30d = 0, _0x36cabb = _0x29740f[0];
    for (; void 0 !== _0x36cabb; ) {
      if (_0x5b38a9 === _0x36cabb["index"]) {
        let _0x5be218;
        2 === _0x36cabb["type"] ? _0x5be218 = new k(_0x11c34b, _0x11c34b["nextSibling"], this, _0x27ca2c) : 1 === _0x36cabb["type"] ? _0x5be218 = new _0x36cabb["ctor"](_0x11c34b, _0x36cabb["name"], _0x36cabb["strings"], this, _0x27ca2c) : 6 === _0x36cabb["type"] && (_0x5be218 = new Z(_0x11c34b, this, _0x27ca2c)), this["_$AV"]["push"](_0x5be218), _0x36cabb = _0x29740f[++_0x1ec30d];
      }
      _0x5b38a9 !== (_0x36cabb == null ? void 0 : _0x36cabb["index"]) && (_0x11c34b = P["nextNode"](), _0x5b38a9++);
    }
    return P["currentNode"] = l$1, _0x13b770;
  }
  ["p"](_0x2aeb85) {
    let _0xf0006e = 0;
    for (const _0x4a359b of this["_$AV"]) void 0 !== _0x4a359b && (void 0 !== _0x4a359b["strings"] ? (_0x4a359b["_$AI"](_0x2aeb85, _0x4a359b, _0xf0006e), _0xf0006e += _0x4a359b["strings"]["length"] - 2) : _0x4a359b["_$AI"](_0x2aeb85[_0xf0006e])), _0xf0006e++;
  }
}
class k {
  get ["_$AU"]() {
    var _a2;
    return ((_a2 = this["_$AM"]) == null ? void 0 : _a2["_$AU"]) ?? this["_$Cv"];
  }
  constructor(_0x4975eb, _0x5800a8, _0x3c0830, _0x581a7f) {
    this["type"] = 2, this["_$AH"] = A, this["_$AN"] = void 0, this["_$AA"] = _0x4975eb, this["_$AB"] = _0x5800a8, this["_$AM"] = _0x3c0830, this["options"] = _0x581a7f, this["_$Cv"] = (_0x581a7f == null ? void 0 : _0x581a7f["isConnected"]) ?? !![];
  }
  get ["parentNode"]() {
    let _0x3fc8ef = this["_$AA"]["parentNode"];
    const _0x10e72b = this["_$AM"];
    return void 0 !== _0x10e72b && 11 === (_0x3fc8ef == null ? void 0 : _0x3fc8ef["nodeType"]) && (_0x3fc8ef = _0x10e72b["parentNode"]), _0x3fc8ef;
  }
  get ["startNode"]() {
    return this["_$AA"];
  }
  get ["endNode"]() {
    return this["_$AB"];
  }
  ["_$AI"](_0x19328e, _0x52e9fd = this) {
    _0x19328e = M$1(this, _0x19328e, _0x52e9fd), a$1(_0x19328e) ? _0x19328e === A || null == _0x19328e || "" === _0x19328e ? (this["_$AH"] !== A && this["_$AR"](), this["_$AH"] = A) : _0x19328e !== this["_$AH"] && _0x19328e !== E && this["_"](_0x19328e) : void 0 !== _0x19328e["_$litType$"] ? this["$"](_0x19328e) : void 0 !== _0x19328e["nodeType"] ? this["T"](_0x19328e) : d(_0x19328e) ? this["k"](_0x19328e) : this["_"](_0x19328e);
  }
  ["O"](_0x59f4b2) {
    return this["_$AA"]["parentNode"]["insertBefore"](_0x59f4b2, this["_$AB"]);
  }
  ["T"](_0x4da934) {
    this["_$AH"] !== _0x4da934 && (this["_$AR"](), this["_$AH"] = this["O"](_0x4da934));
  }
  ["_"](_0x25d8d1) {
    this["_$AH"] !== A && a$1(this["_$AH"]) ? this["_$AA"]["nextSibling"]["data"] = _0x25d8d1 : this["T"](l$1["createTextNode"](_0x25d8d1)), this["_$AH"] = _0x25d8d1;
  }
  ["$"](_0x1c6aad) {
    var _a2;
    const { values: _0x69e126, _$litType$: _0x43ea8e } = _0x1c6aad, _0x3f14d9 = "number" == typeof _0x43ea8e ? this["_$AC"](_0x1c6aad) : (void 0 === _0x43ea8e["el"] && (_0x43ea8e["el"] = S["createElement"](V(_0x43ea8e["h"], _0x43ea8e["h"][0]), this["options"])), _0x43ea8e);
    if (((_a2 = this["_$AH"]) == null ? void 0 : _a2["_$AD"]) === _0x3f14d9) this["_$AH"]["p"](_0x69e126);
    else {
      const _0x3b582e = new R(_0x3f14d9, this), _0x5c1023 = _0x3b582e["u"](this["options"]);
      _0x3b582e["p"](_0x69e126), this["T"](_0x5c1023), this["_$AH"] = _0x3b582e;
    }
  }
  ["_$AC"](_0x1e3cca) {
    let _0x1b7b30 = C["get"](_0x1e3cca["strings"]);
    return void 0 === _0x1b7b30 && C["set"](_0x1e3cca["strings"], _0x1b7b30 = new S(_0x1e3cca)), _0x1b7b30;
  }
  ["k"](_0x285d2b) {
    u$3(this["_$AH"]) || (this["_$AH"] = [], this["_$AR"]());
    const _0x5acc12 = this["_$AH"];
    let _0x2e5c0e, _0x4f618 = 0;
    for (const _0x5d3ab9 of _0x285d2b) _0x4f618 === _0x5acc12["length"] ? _0x5acc12["push"](_0x2e5c0e = new k(this["O"](c$1()), this["O"](c$1()), this, this["options"])) : _0x2e5c0e = _0x5acc12[_0x4f618], _0x2e5c0e["_$AI"](_0x5d3ab9), _0x4f618++;
    _0x4f618 < _0x5acc12["length"] && (this["_$AR"](_0x2e5c0e && _0x2e5c0e["_$AB"]["nextSibling"], _0x4f618), _0x5acc12["length"] = _0x4f618);
  }
  ["_$AR"](_0x1690d7 = this["_$AA"]["nextSibling"], _0x82e7e6) {
    var _a2;
    for ((_a2 = this["_$AP"]) == null ? void 0 : _a2.call(this, ![], !![], _0x82e7e6); _0x1690d7 !== this["_$AB"]; ) {
      const _0x4cc57a = i$3(_0x1690d7)["nextSibling"];
      i$3(_0x1690d7)["remove"](), _0x1690d7 = _0x4cc57a;
    }
  }
  ["setConnected"](_0x2ba176) {
    var _a2;
    void 0 === this["_$AM"] && (this["_$Cv"] = _0x2ba176, (_a2 = this["_$AP"]) == null ? void 0 : _a2.call(this, _0x2ba176));
  }
}
class H {
  get ["tagName"]() {
    return this["element"]["tagName"];
  }
  get ["_$AU"]() {
    return this["_$AM"]["_$AU"];
  }
  constructor(_0x5246fc, _0x12b616, _0x462ef2, _0x3f8103, _0x57d019) {
    this["type"] = 1, this["_$AH"] = A, this["_$AN"] = void 0, this["element"] = _0x5246fc, this["name"] = _0x12b616, this["_$AM"] = _0x3f8103, this["options"] = _0x57d019, _0x462ef2["length"] > 2 || "" !== _0x462ef2[0] || "" !== _0x462ef2[1] ? (this["_$AH"] = Array(_0x462ef2["length"] - 1)["fill"](new String()), this["strings"] = _0x462ef2) : this["_$AH"] = A;
  }
  ["_$AI"](_0x27119f, _0x2c07a7 = this, _0x4312e8, _0x262777) {
    const _0x946e89 = this["strings"];
    let _0x28f444 = ![];
    if (void 0 === _0x946e89) _0x27119f = M$1(this, _0x27119f, _0x2c07a7, 0), _0x28f444 = !a$1(_0x27119f) || _0x27119f !== this["_$AH"] && _0x27119f !== E, _0x28f444 && (this["_$AH"] = _0x27119f);
    else {
      const _0x432855 = _0x27119f;
      let _0x434ea8, _0x472f12;
      for (_0x27119f = _0x946e89[0], _0x434ea8 = 0; _0x434ea8 < _0x946e89["length"] - 1; _0x434ea8++) _0x472f12 = M$1(this, _0x432855[_0x4312e8 + _0x434ea8], _0x2c07a7, _0x434ea8), _0x472f12 === E && (_0x472f12 = this["_$AH"][_0x434ea8]), _0x28f444 || (_0x28f444 = !a$1(_0x472f12) || _0x472f12 !== this["_$AH"][_0x434ea8]), _0x472f12 === A ? _0x27119f = A : _0x27119f !== A && (_0x27119f += (_0x472f12 ?? "") + _0x946e89[_0x434ea8 + 1]), this["_$AH"][_0x434ea8] = _0x472f12;
    }
    _0x28f444 && !_0x262777 && this["j"](_0x27119f);
  }
  ["j"](_0x50bcb5) {
    _0x50bcb5 === A ? this["element"]["removeAttribute"](this["name"]) : this["element"]["setAttribute"](this["name"], _0x50bcb5 ?? "");
  }
}
class I extends H {
  constructor() {
    super(...arguments), this["type"] = 3;
  }
  ["j"](_0x528e30) {
    this["element"][this["name"]] = _0x528e30 === A ? void 0 : _0x528e30;
  }
}
class L extends H {
  constructor() {
    super(...arguments), this["type"] = 4;
  }
  ["j"](_0x2b96bd) {
    this["element"]["toggleAttribute"](this["name"], !!_0x2b96bd && _0x2b96bd !== A);
  }
}
class z extends H {
  constructor(_0x2e9744, _0x53e534, _0x52eee7, _0x2bbf4d, _0x586845) {
    super(_0x2e9744, _0x53e534, _0x52eee7, _0x2bbf4d, _0x586845), this["type"] = 5;
  }
  ["_$AI"](_0x41c2f0, _0x569ca1 = this) {
    if ((_0x41c2f0 = M$1(this, _0x41c2f0, _0x569ca1, 0) ?? A) === E) return;
    const _0x5b5543 = this["_$AH"], _0x5aceb8 = _0x41c2f0 === A && _0x5b5543 !== A || _0x41c2f0["capture"] !== _0x5b5543["capture"] || _0x41c2f0["once"] !== _0x5b5543["once"] || _0x41c2f0["passive"] !== _0x5b5543["passive"], _0x85e0d5 = _0x41c2f0 !== A && (_0x5b5543 === A || _0x5aceb8);
    _0x5aceb8 && this["element"]["removeEventListener"](this["name"], this, _0x5b5543), _0x85e0d5 && this["element"]["addEventListener"](this["name"], this, _0x41c2f0), this["_$AH"] = _0x41c2f0;
  }
  ["handleEvent"](_0x5b99c8) {
    var _a2;
    "function" == typeof this["_$AH"] ? this["_$AH"]["call"](((_a2 = this["options"]) == null ? void 0 : _a2["host"]) ?? this["element"], _0x5b99c8) : this["_$AH"]["handleEvent"](_0x5b99c8);
  }
}
class Z {
  constructor(_0x9f19d8, _0x47f8d8, _0x4c897e) {
    this["element"] = _0x9f19d8, this["type"] = 6, this["_$AN"] = void 0, this["_$AM"] = _0x47f8d8, this["options"] = _0x4c897e;
  }
  get ["_$AU"]() {
    return this["_$AM"]["_$AU"];
  }
  ["_$AI"](_0xed2561) {
    M$1(this, _0xed2561);
  }
}
const j = { "I": k }, B = t$4["litHtmlPolyfillSupport"];
B == null ? void 0 : B(S, k), (t$4["litHtmlVersions"] ?? (t$4["litHtmlVersions"] = []))["push"]("3.3.3");
const D = (_0x3cf099, _0x3b8a2c, _0x44dfd1) => {
  const _0x436e13 = (_0x44dfd1 == null ? void 0 : _0x44dfd1["renderBefore"]) ?? _0x3b8a2c;
  let _0x12f1c7 = _0x436e13["_$litPart$"];
  if (void 0 === _0x12f1c7) {
    const _0x183031 = (_0x44dfd1 == null ? void 0 : _0x44dfd1["renderBefore"]) ?? null;
    _0x436e13["_$litPart$"] = _0x12f1c7 = new k(_0x3b8a2c["insertBefore"](c$1(), _0x183031), _0x183031, void 0, _0x44dfd1 ?? {});
  }
  return _0x12f1c7["_$AI"](_0x3cf099), _0x12f1c7;
}, s$2 = globalThis;
let i$2 = class i extends y$1 {
  constructor() {
    super(...arguments), this["renderOptions"] = { "host": this }, this["_$Do"] = void 0;
  }
  ["createRenderRoot"]() {
    var _a2;
    const _0x2be219 = super["createRenderRoot"]();
    return (_a2 = this["renderOptions"])["renderBefore"] ?? (_a2["renderBefore"] = _0x2be219["firstChild"]), _0x2be219;
  }
  ["update"](_0x1b93fc) {
    const _0x412a22 = this["render"]();
    this["hasUpdated"] || (this["renderOptions"]["isConnected"] = this["isConnected"]), super["update"](_0x1b93fc), this["_$Do"] = D(_0x412a22, this["renderRoot"], this["renderOptions"]);
  }
  ["connectedCallback"]() {
    var _a2;
    super["connectedCallback"](), (_a2 = this["_$Do"]) == null ? void 0 : _a2["setConnected"](!![]);
  }
  ["disconnectedCallback"]() {
    var _a2;
    super["disconnectedCallback"](), (_a2 = this["_$Do"]) == null ? void 0 : _a2["setConnected"](![]);
  }
  ["render"]() {
    return E;
  }
};
i$2["_$litElement$"] = !![], i$2["finalized"] = !![], (_a = s$2["litElementHydrateSupport"]) == null ? void 0 : _a.call(s$2, { "LitElement": i$2 });
const o$3 = s$2["litElementPolyfillSupport"];
o$3 == null ? void 0 : o$3({ "LitElement": i$2 }), (s$2["litElementVersions"] ?? (s$2["litElementVersions"] = []))["push"]("4.2.2");
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
const t$3 = (_0x2b9c4d) => (_0x2e5746, _0x175097) => {
  void 0 !== _0x175097 ? _0x175097["addInitializer"](() => {
    customElements["define"](_0x2b9c4d, _0x2e5746);
  }) : customElements["define"](_0x2b9c4d, _0x2e5746);
}, o$2 = { "attribute": !![], "type": String, "converter": u$4, "reflect": ![], "hasChanged": f$1 }, r$1 = (_0x36d620 = o$2, _0x14219d, _0x1d8cd5) => {
  const { kind: _0xd485b, metadata: _0x1468e5 } = _0x1d8cd5;
  let _0x5c746f = globalThis["litPropertyMetadata"]["get"](_0x1468e5);
  if (void 0 === _0x5c746f && globalThis["litPropertyMetadata"]["set"](_0x1468e5, _0x5c746f = /* @__PURE__ */ new Map()), "setter" === _0xd485b && ((_0x36d620 = Object["create"](_0x36d620))["wrapped"] = !![]), _0x5c746f["set"](_0x1d8cd5["name"], _0x36d620), "accessor" === _0xd485b) {
    const { name: _0x8b8b20 } = _0x1d8cd5;
    return { "set"(_0x4c0e50) {
      const _0x447271 = _0x14219d["get"]["call"](this);
      _0x14219d["set"]["call"](this, _0x4c0e50), this["requestUpdate"](_0x8b8b20, _0x447271, _0x36d620, !![], _0x4c0e50);
    }, "init"(_0x25d949) {
      return void 0 !== _0x25d949 && this["C"](_0x8b8b20, void 0, _0x36d620, _0x25d949), _0x25d949;
    } };
  }
  if ("setter" === _0xd485b) {
    const { name: _0x1dd687 } = _0x1d8cd5;
    return function(_0x23a29f) {
      const _0x1f7a49 = this[_0x1dd687];
      _0x14219d["call"](this, _0x23a29f), this["requestUpdate"](_0x1dd687, _0x1f7a49, _0x36d620, !![], _0x23a29f);
    };
  }
  throw Error("Unsupported decorator location: " + _0xd485b);
};
function n$1(_0x43cc38) {
  return (_0x129c7e, _0x3b523e) => "object" == typeof _0x3b523e ? r$1(_0x43cc38, _0x129c7e, _0x3b523e) : ((_0x15918d, _0x3024d8, _0x3904e4) => {
    const _0x36463f = _0x3024d8["hasOwnProperty"](_0x3904e4);
    return _0x3024d8["constructor"]["createProperty"](_0x3904e4, _0x15918d), _0x36463f ? Object["getOwnPropertyDescriptor"](_0x3024d8, _0x3904e4) : void 0;
  })(_0x43cc38, _0x129c7e, _0x3b523e);
}
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
function r(_0x2a8fb5) {
  return n$1({ ..._0x2a8fb5, "state": !![], "attribute": ![] });
}
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
const e$4 = (_0x373ee2, _0x4e3e6a, _0x16c975) => (_0x16c975["configurable"] = !![], _0x16c975["enumerable"] = !![], Reflect["decorate"] && "object" != typeof _0x4e3e6a && Object["defineProperty"](_0x373ee2, _0x4e3e6a, _0x16c975), _0x16c975);
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
function e$3(_0x24364f, _0x4a9109) {
  return (_0x5a9e54, _0x2738e1, _0x108509) => {
    const _0x2f24f5 = (_0x46be1d) => {
      var _a2;
      return ((_a2 = _0x46be1d["renderRoot"]) == null ? void 0 : _a2["querySelector"](_0x24364f)) ?? null;
    };
    return e$4(_0x5a9e54, _0x2738e1, { "get"() {
      return _0x2f24f5(this);
    } });
  };
}
class WriteOnlyApiKey {
  constructor(_0x540885) {
    __privateAdd(this, _value, "");
    this["host"] = _0x540885;
  }
  ["write"](_0x1cb907) {
    const _0x52326a = __privateGet(this, _value);
    __privateSet(this, _value, _0x1cb907 ?? ""), this["host"]["requestUpdate"]("apiKey", _0x52326a);
  }
  ["writeDirect"](_0x36053b) {
    __privateSet(this, _value, _0x36053b);
  }
  get ["masked"]() {
    return __privateGet(this, _value) ? "••••••" : "";
  }
  get ["real"]() {
    return __privateGet(this, _value);
  }
}
_value = new WeakMap();
var __defProp$z = Object["defineProperty"], __getOwnPropDesc$A = Object["getOwnPropertyDescriptor"], __typeError$4 = (_0x4fe9f6) => {
  throw TypeError(_0x4fe9f6);
}, __decorateClass$A = (_0x2e08a5, _0x44dadc, _0x166c1d, _0x4e34ce) => {
  var _0x201463 = _0x4e34ce > 1 ? void 0 : _0x4e34ce ? __getOwnPropDesc$A(_0x44dadc, _0x166c1d) : _0x44dadc;
  for (var _0x2705ce = _0x2e08a5["length"] - 1, _0x2de86d; _0x2705ce >= 0; _0x2705ce--) if (_0x2de86d = _0x2e08a5[_0x2705ce]) _0x201463 = (_0x4e34ce ? _0x2de86d(_0x44dadc, _0x166c1d, _0x201463) : _0x2de86d(_0x201463)) || _0x201463;
  if (_0x4e34ce && _0x201463) __defProp$z(_0x44dadc, _0x166c1d, _0x201463);
  return _0x201463;
}, __accessCheck$4 = (_0x350cc6, _0x2ef8c4, _0x4abba1) => _0x2ef8c4["has"](_0x350cc6) || __typeError$4("Cannot " + _0x4abba1), __privateGet$4 = (_0x5d4b71, _0x4a7b77, _0x3d52db) => (__accessCheck$4(_0x5d4b71, _0x4a7b77, "read from private field"), _0x3d52db ? _0x3d52db["call"](_0x5d4b71) : _0x4a7b77["get"](_0x5d4b71)), __privateAdd$4 = (_0x5d42f0, _0x1aa3e2, _0x394846) => _0x1aa3e2["has"](_0x5d42f0) ? __typeError$4("Cannot add the same private member more than once") : _0x1aa3e2 instanceof WeakSet ? _0x1aa3e2["add"](_0x5d42f0) : _0x1aa3e2["set"](_0x5d42f0, _0x394846), _apiKeyState$2;
let tucbsMapInstanceCounter = 0, TucbsMap = class extends i$2 {
  constructor() {
    super(...arguments), this["_autoId"] = "tucbs-map-" + ++tucbsMapInstanceCounter, __privateAdd$4(this, _apiKeyState$2, new WriteOnlyApiKey(this)), this["authToken"] = "", this["proxyBase"] = "", this["basemap"] = "hgm-siyasi", this["mode"] = "3D", this["quality"] = 70, this["mapWidth"] = "100%", this["mapHeight"] = "100%", this["_mapInstance"] = null, this["_skipInitialPropertySync"] = ![], this["_authError"] = null, this["_apiKeyAuthState"] = "none";
  }
  get ["hostId"]() {
    return this["id"] || this["_autoId"];
  }
  set ["apiKey"](_0x440db1) {
    __privateGet$4(this, _apiKeyState$2)["write"](_0x440db1);
  }
  get ["apiKey"]() {
    return __privateGet$4(this, _apiKeyState$2)["masked"];
  }
  get ["apiKeyAuthState"]() {
    return this["_apiKeyAuthState"];
  }
  ["_isMapApiExposed"]() {
    return this["_apiKeyAuthState"] === "ok";
  }
  get ["map"]() {
    if (!this["_isMapApiExposed"]()) return null;
    return this["_mapInstance"];
  }
  get ["layerManager"]() {
    var _a2;
    if (!this["_isMapApiExposed"]()) return void 0;
    return (_a2 = this["_mapInstance"]) == null ? void 0 : _a2["layerManager"];
  }
  get ["drawing"]() {
    var _a2;
    if (!this["_isMapApiExposed"]()) return void 0;
    return (_a2 = this["_mapInstance"]) == null ? void 0 : _a2["drawingManager"];
  }
  get ["interaction"]() {
    var _a2;
    if (!this["_isMapApiExposed"]()) return void 0;
    return (_a2 = this["_mapInstance"]) == null ? void 0 : _a2["interactionManager"];
  }
  get ["analysisManager"]() {
    var _a2;
    if (!this["_isMapApiExposed"]()) return void 0;
    return (_a2 = this["_mapInstance"]) == null ? void 0 : _a2["analysisManager"];
  }
  get ["viewer"]() {
    var _a2;
    if (!this["_isMapApiExposed"]()) return void 0;
    return (_a2 = this["_mapInstance"]) == null ? void 0 : _a2["viewer"];
  }
  ["_grantApiKeyTo"](_0x58d01c) {
    _0x58d01c["apiKey"] = __privateGet$4(this, _apiKeyState$2)["real"];
  }
  ["createRenderRoot"]() {
    return this;
  }
  ["connectedCallback"]() {
    super["connectedCallback"](), !this["id"] && (this["id"] = this["_autoId"]);
  }
  ["firstUpdated"]() {
    const _0x4f14ac = this["getAttribute"]("api-key");
    _0x4f14ac && !__privateGet$4(this, _apiKeyState$2)["real"] && __privateGet$4(this, _apiKeyState$2)["writeDirect"](_0x4f14ac), void this["_prepareMap"]();
  }
  async ["_prepareMap"]() {
    this["_apiKeyAuthState"] = "pending";
    try {
      await ensureEffectiveApiKeyValid(__privateGet$4(this, _apiKeyState$2)["real"] || void 0, getUcbpApiBase());
    } catch (_0x57a076) {
      const _0x1ebf88 = _0x57a076 instanceof Error ? _0x57a076["message"] : String(_0x57a076), _0x205a6a = _0x57a076 instanceof TucbsError ? _0x57a076["title"] : "API Hatası";
      console["error"]("[tucbs-map] apiKey validate başarısız:", _0x1ebf88), this["_apiKeyAuthState"] = "failed", this["_authError"] = { "title": _0x205a6a, "message": _0x1ebf88 }, this["dispatchEvent"](new CustomEvent("error", { "detail": _0x57a076 instanceof TucbsError ? { "error": _0x57a076, "message": _0x1ebf88, "title": _0x205a6a, "code": _0x57a076["code"], "number": _0x57a076["number"] } : { "error": _0x57a076, "message": _0x1ebf88, "title": _0x205a6a }, "bubbles": !![], "composed": !![] }));
      return;
    }
    const _0x342fcb = "#" + this["hostId"] + "-host", _0x17acba = this["renderRoot"]["querySelector"](_0x342fcb), _0x5866df = { "timeline": ![], "animation": ![], "geocoder": ![], "homeButton": ![], "sceneModePicker": ![], "navigationHelpButton": ![], "infoBox": ![], "selectionIndicator": ![], "fullscreenButton": ![], "basemap": this["basemap"], ...__privateGet$4(this, _apiKeyState$2)["real"] ? { "apiKey": __privateGet$4(this, _apiKeyState$2)["real"] } : {}, ...this["initialExtent"] !== void 0 ? { "initialExtent": this["initialExtent"] } : {}, ...this["mapOptions"] };
    this["_mapInstance"] = new _0xf63773(_0x17acba, _0x5866df), this["_mapInstance"]["setQuality"](this["quality"]), this["_skipInitialPropertySync"] = !![], this["_apiKeyAuthState"] = "ok", this["_authError"] = null, this["dispatchEvent"](new CustomEvent("ready", { "detail": { "map": this["_mapInstance"] }, "bubbles": !![], "composed": !![] }));
  }
  ["updated"](_0x6ce8c) {
    if (!this["_mapInstance"]) return;
    if (this["_skipInitialPropertySync"]) {
      this["_skipInitialPropertySync"] = ![];
      return;
    }
    if (_0x6ce8c["has"]("basemap")) this["_mapInstance"]["setBasemap"](this["basemap"]);
    if (_0x6ce8c["has"]("mode")) this["_mapInstance"]["setMode"](this["mode"]);
    if (_0x6ce8c["has"]("quality")) this["_mapInstance"]["setQuality"](this["quality"]);
  }
  ["disconnectedCallback"]() {
    var _a2;
    super["disconnectedCallback"](), (_a2 = this["_mapInstance"]) == null ? void 0 : _a2["destroy"](), this["_mapInstance"] = null;
  }
  ["render"]() {
    return b`
      <style>
        tucbs-map {
          display: block;
          position: relative;
          width: 100%;
          height: 100%;
        }
        #${this["hostId"]}-host {
          width: ${this["mapWidth"]};
          height: ${this["mapHeight"]};
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
      <div id="${this["hostId"]}-host"></div>
      ${this["_authError"] ? b`
            <div class="tucbs-map-auth-error" role="alert">
              <div class="tucbs-map-auth-error__panel">
                <p class="tucbs-map-auth-error__title">${this["_authError"]["title"]}</p>
                <p class="tucbs-map-auth-error__msg">${this["_authError"]["message"]}</p>
              </div>
            </div>
          ` : null}
    `;
  }
};
_apiKeyState$2 = /* @__PURE__ */ new WeakMap(), __decorateClass$A([n$1({ "attribute": "api-key" })], TucbsMap["prototype"], "apiKey", 1), __decorateClass$A([n$1()], TucbsMap["prototype"], "authToken", 2), __decorateClass$A([n$1()], TucbsMap["prototype"], "proxyBase", 2), __decorateClass$A([n$1()], TucbsMap["prototype"], "basemap", 2), __decorateClass$A([n$1({ "type": Object })], TucbsMap["prototype"], "initialExtent", 2), __decorateClass$A([n$1()], TucbsMap["prototype"], "mode", 2), __decorateClass$A([n$1({ "type": Number })], TucbsMap["prototype"], "quality", 2), __decorateClass$A([n$1({ "type": Object })], TucbsMap["prototype"], "mapOptions", 2), __decorateClass$A([n$1()], TucbsMap["prototype"], "mapWidth", 2), __decorateClass$A([n$1()], TucbsMap["prototype"], "mapHeight", 2), __decorateClass$A([r()], TucbsMap["prototype"], "_mapInstance", 2), __decorateClass$A([r()], TucbsMap["prototype"], "_authError", 2), __decorateClass$A([r()], TucbsMap["prototype"], "_apiKeyAuthState", 2), TucbsMap = __decorateClass$A([t$3("tucbs-map")], TucbsMap);
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
const t$2 = { "ATTRIBUTE": 1, "CHILD": 2 }, e$2 = (_0x18b493) => (..._0x850ed) => ({ "_$litDirective$": _0x18b493, "values": _0x850ed });
let i$1 = class i2 {
  constructor(_0x2801d3) {
  }
  get ["_$AU"]() {
    return this["_$AM"]["_$AU"];
  }
  ["_$AT"](_0x551127, _0x2bd861, _0x4fb1ed) {
    this["_$Ct"] = _0x551127, this["_$AM"] = _0x2bd861, this["_$Ci"] = _0x4fb1ed;
  }
  ["_$AS"](_0xf164c7, _0x55620d) {
    return this["update"](_0xf164c7, _0x55620d);
  }
  ["update"](_0x342b4b, _0x3b2fe5) {
    return this["render"](..._0x3b2fe5);
  }
}, e$1 = class e extends i$1 {
  constructor(_0x1d1f44) {
    if (super(_0x1d1f44), this["it"] = A, _0x1d1f44["type"] !== t$2["CHILD"]) throw Error(this["constructor"]["directiveName"] + "() can only be used in child bindings");
  }
  ["render"](_0x2fc55e) {
    if (_0x2fc55e === A || null == _0x2fc55e) return this["_t"] = void 0, this["it"] = _0x2fc55e;
    if (_0x2fc55e === E) return _0x2fc55e;
    if ("string" != typeof _0x2fc55e) throw Error(this["constructor"]["directiveName"] + "() called with a non-string value");
    if (_0x2fc55e === this["it"]) return this["_t"];
    this["it"] = _0x2fc55e;
    const _0x4440ba = [_0x2fc55e];
    return _0x4440ba["raw"] = _0x4440ba, this["_t"] = { "_$litType$": this["constructor"]["resultType"], "strings": _0x4440ba, "values": [] };
  }
};
e$1["directiveName"] = "unsafeHTML", e$1["resultType"] = 1;
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
let t$1 = class t extends e$1 {
};
t$1["directiveName"] = "unsafeSVG", t$1["resultType"] = 2;
const o$1 = e$2(t$1);
var _20_default$5 = { "elem": "svg", "attrs": { "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 32 32", "fill": "currentColor", "width": 20, "height": 20 }, "content": [{ "elem": "path", "attrs": { "stroke-width": "0", "d": "m28,26c-.178,0-.3472.0308-.5115.0742l-1.0554-1.0552c.3516-.5947.5669-1.2798.5669-2.019s-.2153-1.4243-.5669-2.019l1.0554-1.0552c.1643.0435.3335.0742.5115.0742,1.1045,0,2-.8955,2-2s-.8955-2-2-2-2,.8955-2,2c0,.1777.0308.3472.0742.5117l-1.0552,1.0552c-.595-.3516-1.2795-.5669-2.019-.5669s-1.4241.2153-2.019.5669l-1.0552-1.0552c.0435-.1646.0742-.334.0742-.5117,0-1.1045-.8955-2-2-2s-2,.8955-2,2,.8955,2,2,2c.178,0,.3472-.0308.5115-.0742l1.0554,1.0552c-.3516.5947-.5669,1.2798-.5669,2.019s.2153,1.4243.5669,2.019l-1.0554,1.0552c-.1643-.0435-.3335-.0742-.5115-.0742-1.1045,0-2,.8955-2,2s.8955,2,2,2,2-.8955,2-2c0-.1777-.0308-.3472-.0742-.5117l1.0552-1.0552c.595.3516,1.2795.5669,2.019.5669s1.4241-.2153,2.019-.5669l1.0552,1.0552c-.0435.1646-.0742.334-.0742.5117,0,1.1045.8955,2,2,2s2-.8955,2-2-.8955-2-2-2Zm-7-3c0-1.1025.8972-2,2-2s2,.8975,2,2-.8972,2-2,2-2-.8975-2-2Z" } }, { "elem": "circle", "attrs": { "cx": "22", "cy": "10", "r": "2", "stroke-width": "0" } }, { "elem": "path", "attrs": { "stroke-width": "0", "d": "m21,2c-4.9626,0-9,4.0371-9,9,0,.7788.0989,1.5469.2944,2.291L2,23.5859v6.4141h6.4143l7-7-2.7073-2.707-1.4141,1.4141,1.2927,1.293-1.5896,1.5898-1.2869-1.2949-1.4185,1.4102,1.2913,1.2988-1.9963,1.9961h-3.5857v-3.5859l9.7122-9.7119.8555-.8677-.1982-.5845c-.2451-.7217-.3694-1.4785-.3694-2.25,0-3.8599,3.1401-7,7-7s7,3.1401,7,7h2c0-4.9629-4.0374-9-9-9Z" } }] }, _16_default$A = { "elem": "svg", "attrs": { "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 32 32", "fill": "currentColor", "width": 16, "height": 16 }, "content": [{ "elem": "path", "attrs": { "d": "M27,22.142V9.858A3.9916,3.9916,0,1,0,22.142,5H9.858A3.9916,3.9916,0,1,0,5,9.858V22.142A3.9916,3.9916,0,1,0,9.858,27H22.142A3.9916,3.9916,0,1,0,27,22.142ZM26,4a2,2,0,1,1-2,2A2.0023,2.0023,0,0,1,26,4ZM4,6A2,2,0,1,1,6,8,2.002,2.002,0,0,1,4,6ZM6,28a2,2,0,1,1,2-2A2.0023,2.0023,0,0,1,6,28Zm16.142-3H9.858A3.9937,3.9937,0,0,0,7,22.142V9.858A3.9947,3.9947,0,0,0,9.858,7H22.142A3.9937,3.9937,0,0,0,25,9.858V22.142A3.9931,3.9931,0,0,0,22.142,25ZM26,28a2,2,0,1,1,2-2A2.0027,2.0027,0,0,1,26,28Z" } }], "name": "area", "size": 16 }, _16_default$z = { "elem": "svg", "attrs": { "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 32 32", "fill": "currentColor", "width": 16, "height": 16 }, "content": [{ "elem": "path", "attrs": { "d": "M4.67,28l6.39-12,7.3,6.49a2,2,0,0,0,1.7.47,2,2,0,0,0,1.42-1.07L27,10.9,25.18,10,19.69,21l-7.3-6.49A2,2,0,0,0,10.71,14a2,2,0,0,0-1.42,1L4,25V2H2V28a2,2,0,0,0,2,2H30V28Z" } }], "name": "chart--line", "size": 16 }, _16_default$y = { "elem": "svg", "attrs": { "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 32 32", "fill": "currentColor", "width": 16, "height": 16 }, "content": [{ "elem": "path", "attrs": { "d": "M13 24 4 15 5.414 13.586 13 21.171 26.586 7.586 28 9 13 24z" } }] }, _16_default$x = { "elem": "svg", "attrs": { "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 16 16", "fill": "currentColor", "width": 16, "height": 16 }, "content": [{ "elem": "path", "attrs": { "d": "M11 8 6 13 5.3 12.3 9.6 8 5.3 3.7 6 3z" } }] }, _16_default$w = { "elem": "svg", "attrs": { "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 32 32", "fill": "currentColor", "width": 16, "height": 16 }, "content": [{ "elem": "path", "attrs": { "stroke-width": "0", "d": "m16,2c-7.732,0-14,6.268-14,14s6.268,14,14,14,14-6.268,14-14S23.732,2,16,2Zm0,26c-6.6274,0-12-5.3726-12-12s5.3726-12,12-12,12,5.3726,12,12-5.3726,12-12,12Z" } }], "name": "circle--outline", "size": 16 }, _16_default$v = { "elem": "svg", "attrs": { "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 32 32", "fill": "currentColor", "width": 16, "height": 16 }, "content": [{ "elem": "path", "attrs": { "d": "M17.4141 16 24 9.4141 22.5859 8 16 14.5859 9.4143 8 8 9.4141 14.5859 16 8 22.5859 9.4143 24 16 17.4141 22.5859 24 24 22.5859 17.4141 16z" } }] }, _20_default$4 = { "elem": "svg", "attrs": { "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 32 32", "fill": "currentColor", "width": 20, "height": 20 }, "content": [{ "elem": "path", "attrs": { "d": "M23.5,22H23V20h.5a4.5,4.5,0,0,0,.36-9L23,11l-.1-.82a7,7,0,0,0-13.88,0L9,11,8.14,11a4.5,4.5,0,0,0,.36,9H9v2H8.5A6.5,6.5,0,0,1,7.2,9.14a9,9,0,0,1,17.6,0A6.5,6.5,0,0,1,23.5,22Z" } }, { "elem": "path", "attrs": { "d": "M17 26.17 17 14 15 14 15 26.17 12.41 23.59 11 25 16 30 21 25 19.59 23.59 17 26.17z" } }] }, _16_default$u = { "elem": "svg", "attrs": { "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 32 32", "fill": "currentColor", "width": 16, "height": 16 }, "content": [{ "elem": "path", "attrs": { "d": "M23.5,22H23V20h.5a4.5,4.5,0,0,0,.36-9L23,11l-.1-.82a7,7,0,0,0-13.88,0L9,11,8.14,11a4.5,4.5,0,0,0,.36,9H9v2H8.5A6.5,6.5,0,0,1,7.2,9.14a9,9,0,0,1,17.6,0A6.5,6.5,0,0,1,23.5,22Z" } }, { "elem": "path", "attrs": { "d": "M17 26.17 17 14 15 14 15 26.17 12.41 23.59 11 25 16 30 21 25 19.59 23.59 17 26.17z" } }] }, _20_default$3 = { "elem": "svg", "attrs": { "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 32 32", "fill": "currentColor", "width": 20, "height": 20 }, "content": [{ "elem": "circle", "attrs": { "cx": "10", "cy": "12", "r": "2" } }, { "elem": "circle", "attrs": { "cx": "16", "cy": "9", "r": "2" } }, { "elem": "circle", "attrs": { "cx": "22", "cy": "12", "r": "2" } }, { "elem": "circle", "attrs": { "cx": "23", "cy": "18", "r": "2" } }, { "elem": "circle", "attrs": { "cx": "19", "cy": "23", "r": "2" } }, { "elem": "path", "attrs": { "d": "M16.54,2A14,14,0,0,0,2,16a4.82,4.82,0,0,0,6.09,4.65l1.12-.31A3,3,0,0,1,13,23.24V27a3,3,0,0,0,3,3A14,14,0,0,0,30,15.46,14.05,14.05,0,0,0,16.54,2Zm8.11,22.31A11.93,11.93,0,0,1,16,28a1,1,0,0,1-1-1V23.24a5,5,0,0,0-5-5,5.07,5.07,0,0,0-1.33.18l-1.12.31A2.82,2.82,0,0,1,4,16,12,12,0,0,1,16.47,4,12.18,12.18,0,0,1,28,15.53,11.89,11.89,0,0,1,24.65,24.32Z" } }] }, _16_default$t = { "elem": "svg", "attrs": { "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 32 32", "fill": "currentColor", "width": 16, "height": 16 }, "content": [{ "elem": "circle", "attrs": { "cx": "10", "cy": "12", "r": "2" } }, { "elem": "circle", "attrs": { "cx": "16", "cy": "9", "r": "2" } }, { "elem": "circle", "attrs": { "cx": "22", "cy": "12", "r": "2" } }, { "elem": "circle", "attrs": { "cx": "23", "cy": "18", "r": "2" } }, { "elem": "circle", "attrs": { "cx": "19", "cy": "23", "r": "2" } }, { "elem": "path", "attrs": { "d": "M16.54,2A14,14,0,0,0,2,16a4.82,4.82,0,0,0,6.09,4.65l1.12-.31A3,3,0,0,1,13,23.24V27a3,3,0,0,0,3,3A14,14,0,0,0,30,15.46,14.05,14.05,0,0,0,16.54,2Zm8.11,22.31A11.93,11.93,0,0,1,16,28a1,1,0,0,1-1-1V23.24a5,5,0,0,0-5-5,5.07,5.07,0,0,0-1.33.18l-1.12.31A2.82,2.82,0,0,1,4,16,12,12,0,0,1,16.47,4,12.18,12.18,0,0,1,28,15.53,11.89,11.89,0,0,1,24.65,24.32Z" } }] }, _16_default$s = { "elem": "svg", "attrs": { "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 32 32", "fill": "currentColor", "width": 16, "height": 16 }, "content": [{ "elem": "path", "attrs": { "d": "M30 24 26 24 26 20 24 20 24 24 20 24 20 26 24 26 24 30 26 30 26 26 30 26 30 24z" } }, { "elem": "path", "attrs": { "d": "M16,28H8V4h8v6a2.0058,2.0058,0,0,0,2,2h6v4h2V10a.9092.9092,0,0,0-.3-.7l-7-7A.9087.9087,0,0,0,18,2H8A2.0058,2.0058,0,0,0,6,4V28a2.0058,2.0058,0,0,0,2,2h8ZM18,4.4,23.6,10H18Z" } }] }, _20_default$2 = { "elem": "svg", "attrs": { "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 32 32", "fill": "currentColor", "width": 20, "height": 20 }, "content": [{ "elem": "path", "attrs": { "d": "M25.7,9.3l-7-7A.9078.9078,0,0,0,18,2H8A2.0059,2.0059,0,0,0,6,4V28a2.0059,2.0059,0,0,0,2,2H24a2.0059,2.0059,0,0,0,2-2V10A.9078.9078,0,0,0,25.7,9.3ZM18,4.4,23.6,10H18ZM24,28H8V4h8v6a2.0059,2.0059,0,0,0,2,2h6Z" } }] }, _16_default$r = { "elem": "svg", "attrs": { "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 32 32", "fill": "currentColor", "width": 16, "height": 16 }, "content": [{ "elem": "path", "attrs": { "d": "M13 21 26.17 21 23.59 23.59 25 25 30 20 25 15 23.59 16.41 26.17 19 13 19 13 21z" } }, { "elem": "path", "attrs": { "d": "M22,14V10a1,1,0,0,0-.29-.71l-7-7A1,1,0,0,0,14,2H4A2,2,0,0,0,2,4V28a2,2,0,0,0,2,2H20a2,2,0,0,0,2-2V26H20v2H4V4h8v6a2,2,0,0,0,2,2h6v2Zm-8-4V4.41L19.59,10Z" } }] }, _16_default$q = { "elem": "svg", "attrs": { "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 32 32", "fill": "currentColor", "width": 16, "height": 16 }, "content": [{ "elem": "circle", "attrs": { "cx": "16", "cy": "16", "r": "8" } }], "name": "dot-mark", "size": 16 }, _16_default$p = { "elem": "svg", "attrs": { "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 16 16", "fill": "currentColor", "width": 16, "height": 16 }, "content": [{ "elem": "path", "attrs": { "d": "M13 7 12.3 6.3 8.5 10.1 8.5 1 7.5 1 7.5 10.1 3.7 6.3 3 7 8 12z" } }, { "elem": "path", "attrs": { "d": "M13,12v2H3v-2H2v2l0,0c0,0.6,0.4,1,1,1h10c0.6,0,1-0.4,1-1l0,0v-2H13z" } }] }, _16_default$o = { "elem": "svg", "attrs": { "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 32 32", "fill": "currentColor", "width": 16, "height": 16 }, "content": [{ "elem": "path", "attrs": { "d": "M10 6H14V10H10z" } }, { "elem": "path", "attrs": { "d": "M18 6H22V10H18z" } }, { "elem": "path", "attrs": { "d": "M10 14H14V18H10z" } }, { "elem": "path", "attrs": { "d": "M18 14H22V18H18z" } }, { "elem": "path", "attrs": { "d": "M10 22H14V26H10z" } }, { "elem": "path", "attrs": { "d": "M18 22H22V26H18z" } }] }, _16_default$n = { "elem": "svg", "attrs": { "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 32 32", "fill": "currentColor", "width": 16, "height": 16 }, "content": [{ "elem": "path", "attrs": { "d": "M16.6123,2.2138a1.01,1.01,0,0,0-1.2427,0L1,13.4194l1.2427,1.5717L4,13.6209V26a2.0041,2.0041,0,0,0,2,2H26a2.0037,2.0037,0,0,0,2-2V13.63L29.7573,15,31,13.4282ZM18,26H14V18h4Zm2,0V18a2.0023,2.0023,0,0,0-2-2H14a2.002,2.002,0,0,0-2,2v8H6V12.0615l10-7.79,10,7.8005V26Z" } }] }, _20_default$1 = { "elem": "svg", "attrs": { "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 32 32", "fill": "currentColor", "width": 20, "height": 20 }, "content": [{ "elem": "path", "attrs": { "d": "M17 22 17 14 13 14 13 16 15 16 15 22 12 22 12 24 20 24 20 22 17 22z" } }, { "elem": "path", "attrs": { "d": "M16,8a1.5,1.5,0,1,0,1.5,1.5A1.5,1.5,0,0,0,16,8Z" } }, { "elem": "path", "attrs": { "d": "M16,30A14,14,0,1,1,30,16,14,14,0,0,1,16,30ZM16,4A12,12,0,1,0,28,16,12,12,0,0,0,16,4Z" } }] }, _16_default$m = { "elem": "svg", "attrs": { "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 32 32", "fill": "currentColor", "width": 16, "height": 16 }, "content": [{ "elem": "path", "attrs": { "d": "M29.6245,2.2193a1.0005,1.0005,0,0,0-1.0972-.1006L17.9353,7.8,3.366,2.0694a1,1,0,0,0-1.28,1.3369l6.4353,14.479A3.965,3.965,0,0,0,9.9106,24.83,4.0049,4.0049,0,0,1,6,28H4v2H6a6.0044,6.0044,0,0,0,5.928-5.12,4.0021,4.0021,0,0,0,2.93-2.88H23.24a2,2,0,0,0,1.9273-1.4649L29.9634,3.2676A1,1,0,0,0,29.6245,2.2193ZM11,23a2,2,0,1,1,2-2A2.0025,2.0025,0,0,1,11,23Zm12.24-3H14.8579a3.897,3.897,0,0,0-4.5117-2.9336L4.905,4.8238,18.0647,10,27.41,4.9878Z" } }], "name": "lasso--polygon", "size": 16 }, _16_default$l = { "elem": "svg", "attrs": { "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 32 32", "fill": "currentColor", "width": 16, "height": 16 }, "content": [{ "elem": "path", "attrs": { "d": "M16,24a.9967.9967,0,0,1-.4741-.12l-13-7L3.4741,15.12,16,21.8643,28.5259,15.12l.9482,1.7607-13,7A.9967.9967,0,0,1,16,24Z" } }, { "elem": "path", "attrs": { "d": "M16,30a.9967.9967,0,0,1-.4741-.12l-13-7L3.4741,21.12,16,27.8643,28.5259,21.12l.9482,1.7607-13,7A.9967.9967,0,0,1,16,30Z" } }, { "elem": "path", "attrs": { "d": "M16,18a.9967.9967,0,0,1-.4741-.12l-13-7a1,1,0,0,1,0-1.7607l13-7a.9982.9982,0,0,1,.9482,0l13,7a1,1,0,0,1,0,1.7607l-13,7A.9967.9967,0,0,1,16,18ZM5.1094,10,16,15.8643,26.8906,10,16,4.1358Z" } }] }, _16_default$k = { "elem": "svg", "attrs": { "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 32 32", "fill": "currentColor", "width": 16, "height": 16 }, "content": [{ "elem": "path", "attrs": { "d": "M16 22H30V24H16z" } }, { "elem": "rect", "attrs": { "width": "6", "height": "6", "x": "4", "y": "20", "rx": "1" } }, { "elem": "path", "attrs": { "d": "M16 8H30V10H16z" } }, { "elem": "path", "attrs": { "d": "M9.5,12h-5a.5.5,0,0,1-.4473-.7236l2.5-5.0224a.5206.5206,0,0,1,.8945,0l2.5,5.0225A.5.5,0,0,1,9.5,12Z" } }] }, _16_default$j = { "elem": "svg", "attrs": { "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 32 32", "fill": "currentColor", "width": 16, "height": 16 }, "content": [{ "elem": "path", "attrs": { "d": "M29.25,6.76a6,6,0,0,0-8.5,0l1.42,1.42a4,4,0,1,1,5.67,5.67l-8,8a4,4,0,1,1-5.67-5.66l1.41-1.42-1.41-1.42-1.42,1.42a6,6,0,0,0,0,8.5A6,6,0,0,0,17,25a6,6,0,0,0,4.27-1.76l8-8A6,6,0,0,0,29.25,6.76Z" } }, { "elem": "path", "attrs": { "d": "M4.19,24.82a4,4,0,0,1,0-5.67l8-8a4,4,0,0,1,5.67,0A3.94,3.94,0,0,1,19,14a4,4,0,0,1-1.17,2.85L15.71,19l1.42,1.42,2.12-2.12a6,6,0,0,0-8.51-8.51l-8,8a6,6,0,0,0,0,8.51A6,6,0,0,0,7,28a6.07,6.07,0,0,0,4.28-1.76L9.86,24.82A4,4,0,0,1,4.19,24.82Z" } }] }, _16_default$i = { "elem": "svg", "attrs": { "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 32 32", "fill": "currentColor", "width": 16, "height": 16 }, "content": [{ "elem": "path", "attrs": { "d": "M16,18a5,5,0,1,1,5-5A5.0057,5.0057,0,0,1,16,18Zm0-8a3,3,0,1,0,3,3A3.0033,3.0033,0,0,0,16,10Z" } }, { "elem": "path", "attrs": { "d": "M16,30,7.5645,20.0513c-.0479-.0571-.3482-.4515-.3482-.4515A10.8888,10.8888,0,0,1,5,13a11,11,0,0,1,22,0,10.8844,10.8844,0,0,1-2.2148,6.5973l-.0015.0025s-.3.3944-.3447.4474ZM8.8125,18.395c.001.0007.2334.3082.2866.3744L16,26.9079l6.91-8.15c.0439-.0552.2783-.3649.2788-.3657A8.901,8.901,0,0,0,25,13,9,9,0,1,0,7,13a8.9054,8.9054,0,0,0,1.8125,5.395Z" } }] }, _16_default$h = { "elem": "svg", "attrs": { "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 32 32", "fill": "currentColor", "width": 16, "height": 16 }, "content": [{ "elem": "path", "attrs": { "d": "M16,24l-6.09-8.6A8.14,8.14,0,0,1,16,2a8.08,8.08,0,0,1,8,8.13,8.2,8.2,0,0,1-1.8,5.13ZM16,4a6.07,6.07,0,0,0-6,6.13,6.19,6.19,0,0,0,1.49,4L16,20.52,20.63,14A6.24,6.24,0,0,0,22,10.13,6.07,6.07,0,0,0,16,4Z" } }, { "elem": "circle", "attrs": { "cx": "16", "cy": "9", "r": "2" } }, { "elem": "path", "attrs": { "d": "M28,12H26v2h2V28H4V14H6V12H4a2,2,0,0,0-2,2V28a2,2,0,0,0,2,2H28a2,2,0,0,0,2-2V14A2,2,0,0,0,28,12Z" } }] }, _16_default$g = { "elem": "svg", "attrs": { "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 32 32", "fill": "currentColor", "width": 16, "height": 16 }, "content": [{ "elem": "path", "attrs": { "d": "M26,16a9.9283,9.9283,0,0,0-1.1392-4.6182l-1.4961,1.4961A7.9483,7.9483,0,0,1,24,16Z" } }, { "elem": "path", "attrs": { "d": "M23.4141,10,22,8.5859l-4.7147,4.7147A2.9659,2.9659,0,0,0,16,13a3,3,0,1,0,3,3,2.9659,2.9659,0,0,0-.3006-1.2853ZM16,17a1,1,0,1,1,1-1A1.0013,1.0013,0,0,1,16,17Z" } }, { "elem": "path", "attrs": { "d": "M16,8a7.9515,7.9515,0,0,1,3.1223.6353l1.4961-1.4961A9.9864,9.9864,0,0,0,6,16H8A8.0092,8.0092,0,0,1,16,8Z" } }, { "elem": "path", "attrs": { "d": "M16,30A14,14,0,1,1,30,16,14.0158,14.0158,0,0,1,16,30ZM16,4A12,12,0,1,0,28,16,12.0137,12.0137,0,0,0,16,4Z" } }] }, _16_default$f = { "elem": "svg", "attrs": { "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 32 32", "fill": "currentColor", "width": 16, "height": 16 }, "content": [{ "elem": "circle", "attrs": { "cx": "16", "cy": "8", "r": "2" } }, { "elem": "circle", "attrs": { "cx": "16", "cy": "16", "r": "2" } }, { "elem": "circle", "attrs": { "cx": "16", "cy": "24", "r": "2" } }] }, _16_default$e = { "elem": "svg", "attrs": { "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 32 32", "fill": "currentColor", "width": 16, "height": 16 }, "content": [{ "elem": "path", "attrs": { "d": "M27.3069,6.1069,30,3.4141,28.5859,2,25.8931,4.6929,24.8,3.6a1.9328,1.9328,0,0,0-2.8,0L4,21.6V28h6.4l18-18a1.9329,1.9329,0,0,0,0-2.8ZM9.6,26H6V22.4L23.4,5,27,8.6Z" } }, { "elem": "path", "attrs": { "d": "M8.136 7.5H18.863999999999997V9.5H8.136z", "transform": "rotate(-45 13.5 8.5)" } }], "name": "pen", "size": 16 }, _16_default$d = { "elem": "svg", "attrs": { "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 32 32", "fill": "currentColor", "width": 16, "height": 16 }, "content": [{ "elem": "path", "attrs": { "d": "M28,9H25V3H7V9H4a2,2,0,0,0-2,2V21a2,2,0,0,0,2,2H7v6H25V23h3a2,2,0,0,0,2-2V11A2,2,0,0,0,28,9ZM9,5H23V9H9ZM23,27H9V17H23Zm5-6H25V15H7v6H4V11H28Z" } }] }, _16_default$c = { "elem": "svg", "attrs": { "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 32 32", "fill": "currentColor", "width": 16, "height": 16 }, "content": [{ "elem": "path", "attrs": { "d": "M12,10H6.78A11,11,0,0,1,27,16h2A13,13,0,0,0,6,7.68V4H4v8h8Z" } }, { "elem": "path", "attrs": { "d": "M20,22h5.22A11,11,0,0,1,5,16H3a13,13,0,0,0,23,8.32V28h2V20H20Z" } }] }, _16_default$b = { "elem": "svg", "attrs": { "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 32 32", "fill": "currentColor", "width": 16, "height": 16 }, "content": [{ "elem": "path", "attrs": { "d": "M29,10H3a1,1,0,0,0-1,1V21a1,1,0,0,0,1,1H29a1,1,0,0,0,1-1V11A1,1,0,0,0,29,10ZM28,20H4V12H8v4h2V12h5v4h2V12h5v4h2V12h4Z" } }], "name": "ruler", "size": 16 }, _16_default$a = { "elem": "svg", "attrs": { "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 32 32", "fill": "currentColor", "width": 16, "height": 16 }, "content": [{ "elem": "path", "attrs": { "d": "M29.41,21.67,10.34,2.58a2,2,0,0,0-2.83,0L2.59,7.51a2,2,0,0,0,0,2.82L21.66,29.42a2,2,0,0,0,1.42.58,2,2,0,0,0,1.41-.58l4.92-4.93A2,2,0,0,0,29.41,21.67ZM23.08,28,4,8.92,8.92,4l3.79,3.79L10.46,10l1.41,1.41L14.12,9.2l4.13,4.13L16,15.58,17.42,17l2.25-2.25,4.13,4.13-2.25,2.25L23,22.54l2.25-2.25L28,23.08Z" } }] }, _16_default$9 = { "elem": "svg", "attrs": { "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 16 16", "fill": "currentColor", "width": 16, "height": 16 }, "content": [{ "elem": "path", "attrs": { "d": "M13.5,8.4c0-0.1,0-0.3,0-0.4c0-0.1,0-0.3,0-0.4l1-0.8c0.4-0.3,0.4-0.9,0.2-1.3l-1.2-2C13.3,3.2,13,3,12.6,3	c-0.1,0-0.2,0-0.3,0.1l-1.2,0.4c-0.2-0.1-0.4-0.3-0.7-0.4l-0.3-1.3C10.1,1.3,9.7,1,9.2,1H6.8c-0.5,0-0.9,0.3-1,0.8L5.6,3.1	C5.3,3.2,5.1,3.3,4.9,3.4L3.7,3C3.6,3,3.5,3,3.4,3C3,3,2.7,3.2,2.5,3.5l-1.2,2C1.1,5.9,1.2,6.4,1.6,6.8l0.9,0.9c0,0.1,0,0.3,0,0.4	c0,0.1,0,0.3,0,0.4L1.6,9.2c-0.4,0.3-0.5,0.9-0.2,1.3l1.2,2C2.7,12.8,3,13,3.4,13c0.1,0,0.2,0,0.3-0.1l1.2-0.4	c0.2,0.1,0.4,0.3,0.7,0.4l0.3,1.3c0.1,0.5,0.5,0.8,1,0.8h2.4c0.5,0,0.9-0.3,1-0.8l0.3-1.3c0.2-0.1,0.4-0.2,0.7-0.4l1.2,0.4	c0.1,0,0.2,0.1,0.3,0.1c0.4,0,0.7-0.2,0.9-0.5l1.1-2c0.2-0.4,0.2-0.9-0.2-1.3L13.5,8.4z M12.6,12l-1.7-0.6c-0.4,0.3-0.9,0.6-1.4,0.8	L9.2,14H6.8l-0.4-1.8c-0.5-0.2-0.9-0.5-1.4-0.8L3.4,12l-1.2-2l1.4-1.2c-0.1-0.5-0.1-1.1,0-1.6L2.2,6l1.2-2l1.7,0.6	C5.5,4.2,6,4,6.5,3.8L6.8,2h2.4l0.4,1.8c0.5,0.2,0.9,0.5,1.4,0.8L12.6,4l1.2,2l-1.4,1.2c0.1,0.5,0.1,1.1,0,1.6l1.4,1.2L12.6,12z" } }, { "elem": "path", "attrs": { "d": "M8,11c-1.7,0-3-1.3-3-3s1.3-3,3-3s3,1.3,3,3C11,9.6,9.7,11,8,11C8,11,8,11,8,11z M8,6C6.9,6,6,6.8,6,7.9C6,7.9,6,8,6,8	c0,1.1,0.8,2,1.9,2c0,0,0.1,0,0.1,0c1.1,0,2-0.8,2-1.9c0,0,0-0.1,0-0.1C10,6.9,9.2,6,8,6C8.1,6,8,6,8,6z" } }] }, _16_default$8 = { "elem": "svg", "attrs": { "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 32 32", "fill": "currentColor", "width": 16, "height": 16 }, "content": [{ "elem": "path", "attrs": { "stroke-width": "0", "d": "m5,16h-2v11c0,1.1045.8954,2,2,2h8v-2H5v-11Z" } }, { "elem": "path", "attrs": { "stroke-width": "0", "d": "m28,29h-11c-.3535,0-.6809-.1866-.8608-.4911-.0927-.1568-.1392-.3328-.1392-.5089,0-.1658.0412-.3317.1238-.4819l5.5-10c.1898-.3451.5333-.5178.8762-.5181.3434-.0003.6861.1724.8762.5181l5.5,10c.0826.1502.1238.3162.1238.4819,0,.1762-.0465.3521-.1392.5089-.1799.3044-.5073.4911-.8608.4911Zm-9.3088-2h7.6177l-3.8088-6.9249-3.8088,6.9249Z" } }, { "elem": "path", "attrs": { "stroke-width": "0", "d": "m27,3h-11v2h11v13.9922h2V5c0-1.1045-.8954-2-2-2Z" } }, { "elem": "path", "attrs": { "stroke-width": "0", "d": "m11,3h-6c-1.1046,0-2,.8955-2,2v6c0,1.1045.8954,2,2,2h6c1.1046,0,2-.8955,2-2v-6c0-1.1045-.8954-2-2-2Zm0,8h-6v-6h6v6Z" } }] }, _16_default$7 = { "elem": "svg", "attrs": { "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 32 32", "fill": "currentColor", "width": 16, "height": 16 }, "content": [{ "elem": "path", "attrs": { "stroke-width": "0", "d": "m26,4H6c-1.1046,0-2,.8954-2,2v20c0,1.1046.8954,2,2,2h20c1.1046,0,2-.8954,2-2V6c0-1.1046-.8954-2-2-2ZM6,26V6h20v20H6Z" } }], "name": "square--outline", "size": 16 }, _16_default$6 = { "elem": "svg", "attrs": { "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 32 32", "fill": "currentColor", "width": 16, "height": 16 }, "content": [{ "elem": "path", "attrs": { "d": "M12 12H14V24H12z" } }, { "elem": "path", "attrs": { "d": "M18 12H20V24H18z" } }, { "elem": "path", "attrs": { "d": "M4,6V8H6V28a2,2,0,0,0,2,2H24a2,2,0,0,0,2-2V8h2V6ZM8,28V8H24V28Z" } }, { "elem": "path", "attrs": { "d": "M12 2H20V4H12z" } }] }, _16_default$5 = { "elem": "svg", "attrs": { "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 32 32", "fill": "currentColor", "width": 16, "height": 16 }, "content": [{ "elem": "path", "attrs": { "d": "M16 14 6 24 7.4 25.4 16 16.8 24.6 25.4 26 24z" } }, { "elem": "path", "attrs": { "d": "M4 8H28V10H4z" } }] }, _16_default$4 = { "elem": "svg", "attrs": { "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 16 16", "fill": "currentColor", "width": 16, "height": 16 }, "content": [{ "elem": "path", "attrs": { "d": "M15.5,7.8C14.3,4.7,11.3,2.6,8,2.5C4.7,2.6,1.7,4.7,0.5,7.8c0,0.1,0,0.2,0,0.3c1.2,3.1,4.1,5.2,7.5,5.3	c3.3-0.1,6.3-2.2,7.5-5.3C15.5,8.1,15.5,7.9,15.5,7.8z M8,12.5c-2.7,0-5.4-2-6.5-4.5c1-2.5,3.8-4.5,6.5-4.5s5.4,2,6.5,4.5	C13.4,10.5,10.6,12.5,8,12.5z" } }, { "elem": "path", "attrs": { "d": "M8,5C6.3,5,5,6.3,5,8s1.3,3,3,3s3-1.3,3-3S9.7,5,8,5z M8,10c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2S9.1,10,8,10z" } }] }, _16_default$3 = { "elem": "svg", "attrs": { "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 16 16", "fill": "currentColor", "width": 16, "height": 16 }, "content": [{ "elem": "path", "attrs": { "d": "M2.6,11.3l0.7-0.7C2.6,9.8,1.9,9,1.5,8c1-2.5,3.8-4.5,6.5-4.5c0.7,0,1.4,0.1,2,0.4l0.8-0.8C9.9,2.7,9,2.5,8,2.5	C4.7,2.6,1.7,4.7,0.5,7.8c0,0.1,0,0.2,0,0.3C1,9.3,1.7,10.4,2.6,11.3z" } }, { "elem": "path", "attrs": { "d": "M6,7.9c0.1-1,0.9-1.8,1.8-1.8l0.9-0.9C7.2,4.7,5.5,5.6,5.1,7.2C5,7.7,5,8.3,5.1,8.8L6,7.9z" } }, { "elem": "path", "attrs": { "d": "M15.5,7.8c-0.6-1.5-1.6-2.8-2.9-3.7L15,1.7L14.3,1L1,14.3L1.7,15l2.6-2.6c1.1,0.7,2.4,1,3.7,1.1c3.3-0.1,6.3-2.2,7.5-5.3	C15.5,8.1,15.5,7.9,15.5,7.8z M10,8c0,1.1-0.9,2-2,2c-0.3,0-0.7-0.1-1-0.3L9.7,7C9.9,7.3,10,7.6,10,8z M8,12.5c-1,0-2.1-0.3-3-0.8	l1.3-1.3c1.4,0.9,3.2,0.6,4.2-0.8c0.7-1,0.7-2.4,0-3.4l1.4-1.4c1.1,0.8,2,1.9,2.6,3.2C13.4,10.5,10.6,12.5,8,12.5z" } }] }, _16_default$2 = { "elem": "svg", "attrs": { "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 32 32", "fill": "currentColor", "width": 16, "height": 16 }, "content": [{ "elem": "path", "attrs": { "fill": "none", "d": "M16,26a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,16,26Zm-1.125-5h2.25V12h-2.25Z", "data-icon-path": "inner-path" } }, { "elem": "path", "attrs": { "d": "M16.002,6.1714h-.004L4.6487,27.9966,4.6506,28H27.3494l.0019-.0034ZM14.875,12h2.25v9h-2.25ZM16,26a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,16,26Z" } }, { "elem": "path", "attrs": { "d": "M29,30H3a1,1,0,0,1-.8872-1.4614l13-25a1,1,0,0,1,1.7744,0l13,25A1,1,0,0,1,29,30ZM4.6507,28H27.3493l.002-.0033L16.002,6.1714h-.004L4.6487,27.9967Z" } }] }, _20_default = { "elem": "svg", "attrs": { "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 32 32", "fill": "currentColor", "width": 20, "height": 20 }, "content": [{ "elem": "path", "attrs": { "d": "M18 12 14 12 14 8 12 8 12 12 8 12 8 14 12 14 12 18 14 18 14 14 18 14 18 12z" } }, { "elem": "path", "attrs": { "d": "M21.4479,20A10.856,10.856,0,0,0,24,13,11,11,0,1,0,13,24a10.856,10.856,0,0,0,7-2.5521L27.5859,29,29,27.5859ZM13,22a9,9,0,1,1,9-9A9.01,9.01,0,0,1,13,22Z" } }] }, _16_default$1 = { "elem": "svg", "attrs": { "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 16 16", "fill": "currentColor", "width": 16, "height": 16 }, "content": [{ "elem": "path", "attrs": { "d": "M9 6 7 6 7 4 6 4 6 6 4 6 4 7 6 7 6 9 7 9 7 7 9 7z" } }, { "elem": "path", "attrs": { "d": "M10.7,10C11.5,9,12,7.8,12,6.5C12,3.5,9.5,1,6.5,1S1,3.5,1,6.5S3.5,12,6.5,12c1.3,0,2.5-0.5,3.5-1.3l3.8,3.8l0.7-0.7	L10.7,10z M6.5,11C4,11,2,9,2,6.5S4,2,6.5,2S11,4,11,6.5S9,11,6.5,11L6.5,11z" } }] }, _16_default = { "elem": "svg", "attrs": { "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 16 16", "fill": "currentColor", "width": 16, "height": 16 }, "content": [{ "elem": "path", "attrs": { "d": "M4 6H9V7H4z" } }, { "elem": "path", "attrs": { "d": "M10.7,10C11.5,9,12,7.8,12,6.5C12,3.5,9.5,1,6.5,1S1,3.5,1,6.5S3.5,12,6.5,12c1.3,0,2.5-0.5,3.5-1.3l3.8,3.8l0.7-0.7	L10.7,10z M6.5,11C4,11,2,9,2,6.5S4,2,6.5,2S11,4,11,6.5S9,11,6.5,11L6.5,11z" } }] };
const MAX_CONCURRENT_PREVIEW_VIEWERS = 6;
class PreviewViewerPool {
  constructor() {
    this["entries"] = /* @__PURE__ */ new Map();
  }
  ["activate"](_0x50250e, _0x18d831) {
    if (this["entries"]["has"](_0x50250e)) {
      this["touch"](_0x50250e);
      return;
    }
    this["entries"]["size"] >= MAX_CONCURRENT_PREVIEW_VIEWERS && this["evictOldest"](), this["entries"]["set"](_0x50250e, { "lastUsed": performance["now"](), "onEvict": _0x18d831 });
  }
  ["touch"](_0x354b69) {
    const _0x6ec44 = this["entries"]["get"](_0x354b69);
    if (_0x6ec44) _0x6ec44["lastUsed"] = performance["now"]();
  }
  ["release"](_0x3ffffb) {
    this["entries"]["delete"](_0x3ffffb);
  }
  ["evictOldest"]() {
    let _0x9613b0, _0x252088;
    for (const [_0x21436d, _0x48af45] of this["entries"]) {
      (!_0x252088 || _0x48af45["lastUsed"] < _0x252088["lastUsed"]) && (_0x9613b0 = _0x21436d, _0x252088 = _0x48af45);
    }
    if (_0x9613b0 === void 0 || _0x252088 === void 0) return;
    this["entries"]["delete"](_0x9613b0), _0x252088["onEvict"]();
  }
}
const previewViewerPool = new PreviewViewerPool(), mapPreviewStyles = b`
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
    this["current"] = 0;
  }
  ["next"]() {
    return ++this["current"];
  }
  ["isCurrent"](_0x57f1c6) {
    return _0x57f1c6 === this["current"];
  }
}
function iconNodeToString(_0x67a24e) {
  const _0x1d36cc = _0x67a24e["attrs"] ? Object["entries"](_0x67a24e["attrs"])["map"](([_0x22b15c, _0x2919e1]) => _0x22b15c + '="' + String(_0x2919e1) + '"')["join"](" ") : "", _0x15ce55 = (_0x67a24e["content"] ?? [])["map"](iconNodeToString)["join"]("");
  return "<" + _0x67a24e["elem"] + " " + _0x1d36cc + ">" + _0x15ce55 + "</" + _0x67a24e["elem"] + ">";
}
function zoomInProportional(_0x570798, _0x4d3d88, _0xcd58fa = 0) {
  const _0x42c344 = _0x570798["positionCartographic"]["height"], _0x21d105 = Math["min"](_0x42c344 * _0x4d3d88, _0x42c344 - _0xcd58fa);
  if (_0x21d105 > 0) _0x570798["zoomIn"](_0x21d105);
}
function zoomOutProportional(_0x7eb587, _0x39b767, _0xaef792 = Infinity) {
  const _0x5ea2a2 = _0x7eb587["positionCartographic"]["height"], _0x1b5c0f = Math["min"](_0x5ea2a2 * _0x39b767, _0xaef792 - _0x5ea2a2);
  if (_0x1b5c0f > 0) _0x7eb587["zoomOut"](_0x1b5c0f);
}
var __defProp$y = Object["defineProperty"], __getOwnPropDesc$z = Object["getOwnPropertyDescriptor"], __typeError$3 = (_0x3af530) => {
  throw TypeError(_0x3af530);
}, __decorateClass$z = (_0x5c2b88, _0x11edc7, _0x259d16, _0xe30fcf) => {
  var _0x406ce0 = _0xe30fcf > 1 ? void 0 : _0xe30fcf ? __getOwnPropDesc$z(_0x11edc7, _0x259d16) : _0x11edc7;
  for (var _0x59122c = _0x5c2b88["length"] - 1, _0x1d98eb; _0x59122c >= 0; _0x59122c--) if (_0x1d98eb = _0x5c2b88[_0x59122c]) _0x406ce0 = (_0xe30fcf ? _0x1d98eb(_0x11edc7, _0x259d16, _0x406ce0) : _0x1d98eb(_0x406ce0)) || _0x406ce0;
  if (_0xe30fcf && _0x406ce0) __defProp$y(_0x11edc7, _0x259d16, _0x406ce0);
  return _0x406ce0;
}, __accessCheck$3 = (_0x19d5af, _0x1d6e73, _0x456274) => _0x1d6e73["has"](_0x19d5af) || __typeError$3("Cannot " + _0x456274), __privateGet$3 = (_0x404c1f, _0x44feb7, _0x341c83) => (__accessCheck$3(_0x404c1f, _0x44feb7, "read from private field"), _0x341c83 ? _0x341c83["call"](_0x404c1f) : _0x44feb7["get"](_0x404c1f)), __privateAdd$3 = (_0x55e9f1, _0x2ddb28, _0x44d490) => _0x2ddb28["has"](_0x55e9f1) ? __typeError$3("Cannot add the same private member more than once") : _0x2ddb28 instanceof WeakSet ? _0x2ddb28["add"](_0x55e9f1) : _0x2ddb28["set"](_0x55e9f1, _0x44d490), __privateSet$1 = (_0x15c62d, _0x34d9e6, _0xadc92b, _0x224e8e) => (__accessCheck$3(_0x15c62d, _0x34d9e6, "write to private field"), _0x34d9e6["set"](_0x15c62d, _0xadc92b), _0xadc92b), _apiKey$1;
const ICON_ZOOM_IN$3 = o$1(iconNodeToString(_16_default$1)), ICON_ZOOM_OUT$1 = o$1(iconNodeToString(_16_default)), IMAGERY_LAYER_TYPES = /* @__PURE__ */ new Set(["WMS", "WMTS", "WCS", "GEOTIFF", "XYZ"]), GLOBAL_LONGITUDE_SPAN_THRESHOLD = _0xf1e7b["toRadians"](350), GLOBAL_LATITUDE_SPAN_THRESHOLD = _0xf1e7b["toRadians"](160);
function isGloballyExtentedLayer(_0x5a63c6) {
  var _a2;
  const _0x49c148 = _0x5a63c6["cesiumObject"];
  if (!("imageryProvider" in _0x49c148)) return ![];
  const _0x323a4d = (_a2 = _0x49c148["imageryProvider"]) == null ? void 0 : _a2["rectangle"];
  if (!_0x323a4d) return ![];
  const _0x30baf5 = _0x323a4d["east"] - _0x323a4d["west"], _0x4f2529 = _0x323a4d["north"] - _0x323a4d["south"];
  return _0x30baf5 >= GLOBAL_LONGITUDE_SPAN_THRESHOLD && _0x4f2529 >= GLOBAL_LATITUDE_SPAN_THRESHOLD;
}
const HGM_GATED_BASEMAP_IDS = new Set(HGM_BASEMAP_IDS);
let tucbsMapPreviewInstanceCounter = 0, TucbsMapPreview = class extends i$2 {
  constructor() {
    super(...arguments), this["_autoId"] = "tucbs-map-preview-" + ++tucbsMapPreviewInstanceCounter, __privateAdd$3(this, _apiKey$1, ""), this["basemap"] = "hgm-temel", this["mode"] = "2D", this["width"] = "300px", this["height"] = "200px", this["showZoomButtons"] = !![], this["zoomToLayer"] = ![], this["_active"] = ![], this["_mapInstance"] = null, this["_loading"] = ![], this["_basemapBlocked"] = ![], this["_syncGeneration"] = new AsyncGeneration();
  }
  get ["hostId"]() {
    return this["id"] || this["_autoId"];
  }
  set ["apiKey"](_0xcdd0c3) {
    const _0x46018b = __privateGet$3(this, _apiKey$1);
    __privateSet$1(this, _apiKey$1, _0xcdd0c3), this["requestUpdate"]("apiKey", _0x46018b);
  }
  get ["apiKey"]() {
    return __privateGet$3(this, _apiKey$1) ? "••••••" : "";
  }
  get ["map"]() {
    return this["_mapInstance"];
  }
  ["createRenderRoot"]() {
    return this;
  }
  ["connectedCallback"]() {
    super["connectedCallback"]();
    if (!this["id"]) this["id"] = this["_autoId"];
    this["_observer"] = new IntersectionObserver((_0x4040d8) => {
      var _a2;
      ((_a2 = _0x4040d8[0]) == null ? void 0 : _a2["isIntersecting"]) ? this["_requestActivate"]() : this["_requestDeactivate"]();
    }), this["_observer"]["observe"](this);
  }
  ["disconnectedCallback"]() {
    var _a2;
    super["disconnectedCallback"](), (_a2 = this["_observer"]) == null ? void 0 : _a2["disconnect"](), this["_requestDeactivate"]();
  }
  ["updated"](_0x998ee0) {
    if (!this["_mapInstance"]) return;
    if (_0x998ee0["has"]("basemap") || _0x998ee0["has"]("apiKey")) void this["_syncBasemap"]();
    if (_0x998ee0["has"]("mode")) this["_mapInstance"]["setMode"](this["mode"]);
    (_0x998ee0["has"]("layer") || _0x998ee0["has"]("layerOptions")) && (void this["_syncLayer"](), void this["_syncBasemap"]());
  }
  ["_requestActivate"]() {
    if (this["_active"]) {
      previewViewerPool["touch"](this["hostId"]);
      return;
    }
    previewViewerPool["activate"](this["hostId"], () => this["_deactivate"]()), this["_active"] = !![], void this["updateComplete"]["then"](() => this["_mountMap"]());
  }
  ["_requestDeactivate"]() {
    if (!this["_active"]) return;
    previewViewerPool["release"](this["hostId"]), this["_deactivate"]();
  }
  ["_mountMap"]() {
    if (this["_mapInstance"] || !this["_active"]) return;
    const _0x1852f4 = this["renderRoot"]["querySelector"]("#" + this["hostId"] + "-host");
    if (!_0x1852f4) return;
    this["_mapInstance"] = new _0xf63773(_0x1852f4, { ...__privateGet$3(this, _apiKey$1) ? { "apiKey": __privateGet$3(this, _apiKey$1) } : {}, "timeline": ![], "animation": ![], "geocoder": ![], "homeButton": ![], "sceneModePicker": ![], "navigationHelpButton": ![], "infoBox": ![], "selectionIndicator": ![], "fullscreenButton": ![] }), this["_mapInstance"]["setMode"](this["mode"]), this["_mapInstance"]["setQuality"](75), this["_mapInstance"]["viewer"]["scene"]["globe"]["baseColor"] = Color["fromCssColorString"]("#f4f4f4"), this["_resizeObserver"] = new ResizeObserver(() => {
      var _a2, _b;
      (_a2 = this["_mapInstance"]) == null ? void 0 : _a2["resize"](), (_b = this["_mapInstance"]) == null ? void 0 : _b["setExtent"](DEFAULT_INITIAL_EXTENT);
    }), this["_resizeObserver"]["observe"](_0x1852f4), this["_unregisterApiKeyRefresh"] = registerApiKeyRefresh(() => {
      void this["_syncBasemap"]();
    }), void this["_syncBasemap"](), void this["_syncLayer"]();
  }
  ["_deactivate"]() {
    var _a2, _b, _c;
    this["_active"] = ![], (_a2 = this["_resizeObserver"]) == null ? void 0 : _a2["disconnect"](), this["_resizeObserver"] = void 0, (_b = this["_unregisterApiKeyRefresh"]) == null ? void 0 : _b.call(this), this["_unregisterApiKeyRefresh"] = void 0, (_c = this["_mapInstance"]) == null ? void 0 : _c["destroy"](), this["_mapInstance"] = null, this["_currentLayerId"] = void 0;
  }
  async ["_syncBasemap"]() {
    const _0x1539ba = this["_mapInstance"];
    if (!_0x1539ba) return;
    if (!HGM_GATED_BASEMAP_IDS["has"](this["basemap"])) {
      this["_basemapBlocked"] = ![], _0x1539ba["setBasemap"](this["basemap"]);
      return;
    }
    try {
      await ensureEffectiveApiKeyValid(__privateGet$3(this, _apiKey$1) || void 0, getUcbpApiBase());
    } catch (_0x510bc8) {
      const _0x2f6a60 = _0x510bc8 instanceof ApiKeyValidationError && _0x510bc8["reason"] === "missing-key", _0x2c13f4 = this["layerOptions"] ?? this["layer"], _0x5895e2 = _0x2c13f4 ? _0x2c13f4["options"]["url"] : void 0, _0x20f5e8 = !!_0x2c13f4 && (!_0x5895e2 || !_0x1539ba["layerManager"]["layerRequiresApiKey"](_0x5895e2));
      this["_basemapBlocked"] = !(_0x2f6a60 && _0x20f5e8), _0x1539ba["setBasemap"](null);
      return;
    }
    this["_basemapBlocked"] = ![], _0x1539ba["setBasemap"](this["basemap"]);
  }
  async ["_syncLayer"]() {
    const _0x5d2a92 = this["_mapInstance"];
    if (!_0x5d2a92) return;
    const _0x8437af = this["_syncGeneration"]["next"](), _0x13e5f2 = this["_currentLayerId"], _0x2a4610 = this["layerOptions"] ?? this["layer"];
    if (!_0x2a4610) {
      this["_loading"] = ![];
      if (_0x13e5f2) _0x5d2a92["layerManager"]["removeLayer"](_0x13e5f2);
      this["_currentLayerId"] = void 0, _0x5d2a92["setExtent"](DEFAULT_INITIAL_EXTENT);
      return;
    }
    this["_loading"] = !![];
    try {
      const _0x22b750 = await this["_addLayer"](_0x5d2a92, _0x2a4610);
      if (!this["_syncGeneration"]["isCurrent"](_0x8437af)) {
        _0x5d2a92["layerManager"]["removeLayer"](_0x22b750["id"]);
        return;
      }
      this["_currentLayerId"] = _0x22b750["id"];
      if (this["zoomToLayer"] && !isGloballyExtentedLayer(_0x22b750)) {
        const _0x442fee = await _0x5d2a92["layerManager"]["zoomToLayer"](_0x22b750["id"])["catch"](() => ![]);
        if (!_0x442fee) _0x5d2a92["setExtent"](DEFAULT_INITIAL_EXTENT);
      } else _0x5d2a92["setExtent"](DEFAULT_INITIAL_EXTENT);
      if (IMAGERY_LAYER_TYPES["has"](_0x2a4610["layerType"])) {
        await this["_waitForTilesLoaded"](_0x5d2a92);
        if (!this["_syncGeneration"]["isCurrent"](_0x8437af)) return;
      }
      _0x13e5f2 && _0x13e5f2 !== this["_currentLayerId"] && _0x5d2a92["layerManager"]["removeLayer"](_0x13e5f2);
    } finally {
      if (this["_syncGeneration"]["isCurrent"](_0x8437af)) this["_loading"] = ![];
    }
  }
  ["_waitForTilesLoaded"](_0x20a969, _0x2b32d7 = 5e3) {
    return new Promise((_0x25cdf5) => {
      const _0xb6207 = _0x20a969["viewer"]["scene"]["globe"];
      if (_0xb6207["tilesLoaded"]) {
        _0x25cdf5();
        return;
      }
      let _0x1de5b4 = ![];
      const _0x3645c2 = () => {
        if (_0x1de5b4) return;
        _0x1de5b4 = !![], _0xb6207["tileLoadProgressEvent"]["removeEventListener"](_0x4ef644), clearTimeout(_0x308be4), _0x25cdf5();
      }, _0x4ef644 = (_0x1a9c94) => {
        if (_0x1a9c94 === 0) _0x3645c2();
      };
      _0xb6207["tileLoadProgressEvent"]["addEventListener"](_0x4ef644);
      const _0x308be4 = setTimeout(_0x3645c2, _0x2b32d7);
    });
  }
  async ["_addLayer"](_0x55b780, _0x4719ee) {
    switch (_0x4719ee["layerType"]) {
      case "WMS":
        return _0x55b780["layerManager"]["add"]("WMS", _0x4719ee["options"]);
      case "WMTS":
        return _0x55b780["layerManager"]["add"]("WMTS", _0x4719ee["options"]);
      case "WFS":
        return _0x55b780["layerManager"]["add"]("WFS", _0x4719ee["options"]);
      case "WCS":
        return _0x55b780["layerManager"]["add"]("WCS", _0x4719ee["options"]);
      case "GEOTIFF":
        return _0x55b780["layerManager"]["add"]("GEOTIFF", _0x4719ee["options"]);
      case "GEOJSON":
      case "KML":
      case "KMZ":
      case "SHP":
      case "CSV":
        return _0x55b780["layerManager"]["add"](_0x4719ee["layerType"], _0x4719ee["options"]);
      case "XYZ":
        throw new LayerOperationError("LAYER_PREVIEW_UNSUPPORTED_XYZ", "TucbsMapPreview: XYZ katmani onizlemede desteklenmiyor.");
      case "DRAWING":
        throw new LayerOperationError("LAYER_PREVIEW_UNSUPPORTED_DRAWING", "TucbsMapPreview: DRAWING katmani onizlemede desteklenmiyor.");
      case "MEASURE":
        throw new LayerOperationError("LAYER_PREVIEW_UNSUPPORTED_MEASURE", "TucbsMapPreview: MEASURE katmani onizlemede desteklenmiyor.");
    }
  }
  ["_zoomIn"]() {
    var _a2;
    const _0x3b8326 = (_a2 = this["_mapInstance"]) == null ? void 0 : _a2["viewer"];
    if (!_0x3b8326) return;
    zoomInProportional(_0x3b8326["camera"], TucbsMapPreview["ZOOM_STEP_RATIO"], _0x3b8326["scene"]["screenSpaceCameraController"]["minimumZoomDistance"]);
  }
  ["_zoomOut"]() {
    var _a2;
    const _0x56875e = (_a2 = this["_mapInstance"]) == null ? void 0 : _a2["viewer"];
    if (!_0x56875e) return;
    zoomOutProportional(_0x56875e["camera"], TucbsMapPreview["ZOOM_STEP_RATIO"], _0x56875e["scene"]["screenSpaceCameraController"]["maximumZoomDistance"]);
  }
  ["render"]() {
    return b`
      ${mapPreviewStyles}
      <div
        class="preview-box"
        style="width: ${this["width"]}; height: ${this["height"]};"
      >
        ${this["_active"] ? b`
              ${this["showZoomButtons"] ? b`
                    <div class="zoom-controls">
                      <button
                        class="zoom-button"
                        type="button"
                        aria-label="Yakınlaştır"
                        @click=${this["_zoomIn"]}
                      >
                        ${ICON_ZOOM_IN$3}
                      </button>
                      <button
                        class="zoom-button"
                        type="button"
                        aria-label="Uzaklaştır"
                        @click=${this["_zoomOut"]}
                      >
                        ${ICON_ZOOM_OUT$1}
                      </button>
                    </div>
                  ` : null}
              <div id="${this["hostId"]}-host" class="map-host"></div>
              ${this["_loading"] ? b`<div class="loading-overlay">
                    <div class="spinner"></div>
                  </div>` : null}
              ${!this["_loading"] && this["_basemapBlocked"] ? b`<div class="basemap-blocked-overlay" role="alert">
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
_apiKey$1 = /* @__PURE__ */ new WeakMap(), TucbsMapPreview["ZOOM_STEP_RATIO"] = 0.5, __decorateClass$z([n$1({ "attribute": "api-key" })], TucbsMapPreview["prototype"], "apiKey", 1), __decorateClass$z([n$1()], TucbsMapPreview["prototype"], "basemap", 2), __decorateClass$z([n$1()], TucbsMapPreview["prototype"], "mode", 2), __decorateClass$z([n$1()], TucbsMapPreview["prototype"], "width", 2), __decorateClass$z([n$1()], TucbsMapPreview["prototype"], "height", 2), __decorateClass$z([n$1({ "type": Object })], TucbsMapPreview["prototype"], "layer", 2), __decorateClass$z([n$1({ "type": Object, "attribute": "layer-options" })], TucbsMapPreview["prototype"], "layerOptions", 2), __decorateClass$z([n$1({ "attribute": "show-zoom-buttons", "converter": (_0x4d5069) => _0x4d5069 !== "false" })], TucbsMapPreview["prototype"], "showZoomButtons", 2), __decorateClass$z([n$1({ "type": Boolean, "attribute": "zoom-to-layer" })], TucbsMapPreview["prototype"], "zoomToLayer", 2), __decorateClass$z([r()], TucbsMapPreview["prototype"], "_active", 2), __decorateClass$z([r()], TucbsMapPreview["prototype"], "_mapInstance", 2), __decorateClass$z([r()], TucbsMapPreview["prototype"], "_loading", 2), __decorateClass$z([r()], TucbsMapPreview["prototype"], "_basemapBlocked", 2), TucbsMapPreview = __decorateClass$z([t$3("tucbs-map-preview")], TucbsMapPreview);
/**
* @license
* Copyright 2020 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
const { I: t2 } = j, i3 = (_0x469a13) => _0x469a13, s$1 = () => document["createComment"](""), v = (_0x4877cd, _0x24d8f5, _0x1345ef) => {
  var _a2;
  const _0x1f6e61 = _0x4877cd["_$AA"]["parentNode"], _0x3685aa = void 0 === _0x24d8f5 ? _0x4877cd["_$AB"] : _0x24d8f5["_$AA"];
  if (void 0 === _0x1345ef) {
    const _0x4faa08 = _0x1f6e61["insertBefore"](s$1(), _0x3685aa), _0x4feb33 = _0x1f6e61["insertBefore"](s$1(), _0x3685aa);
    _0x1345ef = new t2(_0x4faa08, _0x4feb33, _0x4877cd, _0x4877cd["options"]);
  } else {
    const _0x2ee53d = _0x1345ef["_$AB"]["nextSibling"], _0x2daf51 = _0x1345ef["_$AM"], _0x19d95c = _0x2daf51 !== _0x4877cd;
    if (_0x19d95c) {
      let _0x23c191;
      (_a2 = _0x1345ef["_$AQ"]) == null ? void 0 : _a2.call(_0x1345ef, _0x4877cd), _0x1345ef["_$AM"] = _0x4877cd, void 0 !== _0x1345ef["_$AP"] && (_0x23c191 = _0x4877cd["_$AU"]) !== _0x2daf51["_$AU"] && _0x1345ef["_$AP"](_0x23c191);
    }
    if (_0x2ee53d !== _0x3685aa || _0x19d95c) {
      let _0x31c191 = _0x1345ef["_$AA"];
      for (; _0x31c191 !== _0x2ee53d; ) {
        const _0x1af25b = i3(_0x31c191)["nextSibling"];
        i3(_0x1f6e61)["insertBefore"](_0x31c191, _0x3685aa), _0x31c191 = _0x1af25b;
      }
    }
  }
  return _0x1345ef;
}, u$2 = (_0x45eb84, _0x1c201e, _0x2a0050 = _0x45eb84) => (_0x45eb84["_$AI"](_0x1c201e, _0x2a0050), _0x45eb84), m = {}, p = (_0x27cc1e, _0x351911 = m) => _0x27cc1e["_$AH"] = _0x351911, M = (_0x597212) => _0x597212["_$AH"], h = (_0x100ef6) => {
  _0x100ef6["_$AR"](), _0x100ef6["_$AA"]["remove"]();
}, u$1 = (_0x48e453, _0x1b5ccc, _0x4079fa) => {
  const _0x21d64d = /* @__PURE__ */ new Map();
  for (let _0x4e45bd = _0x1b5ccc; _0x4e45bd <= _0x4079fa; _0x4e45bd++) _0x21d64d["set"](_0x48e453[_0x4e45bd], _0x4e45bd);
  return _0x21d64d;
}, c = e$2(class extends i$1 {
  constructor(_0x55f80b) {
    if (super(_0x55f80b), _0x55f80b["type"] !== t$2["CHILD"]) throw Error("repeat() can only be used in text expressions");
  }
  ["dt"](_0x2977c9, _0x3770e0, _0x1a955a) {
    let _0x49698e;
    void 0 === _0x1a955a ? _0x1a955a = _0x3770e0 : void 0 !== _0x3770e0 && (_0x49698e = _0x3770e0);
    const _0x521095 = [], _0x12aeda = [];
    let _0x38fc76 = 0;
    for (const _0x377073 of _0x2977c9) _0x521095[_0x38fc76] = _0x49698e ? _0x49698e(_0x377073, _0x38fc76) : _0x38fc76, _0x12aeda[_0x38fc76] = _0x1a955a(_0x377073, _0x38fc76), _0x38fc76++;
    return { "values": _0x12aeda, "keys": _0x521095 };
  }
  ["render"](_0x3e7c02, _0x26def7, _0x4a745f) {
    return this["dt"](_0x3e7c02, _0x26def7, _0x4a745f)["values"];
  }
  ["update"](_0x565a96, [_0x5513d7, _0x10c28b, _0x58c31a]) {
    const _0x35460f = M(_0x565a96), { values: _0x393f80, keys: _0x4597dc } = this["dt"](_0x5513d7, _0x10c28b, _0x58c31a);
    if (!Array["isArray"](_0x35460f)) return this["ut"] = _0x4597dc, _0x393f80;
    const _0x91e153 = this["ut"] ?? (this["ut"] = []), _0x1f5cbe = [];
    let _0x15f952, _0x5ed89e, _0x38d6fe = 0, _0x4acda1 = _0x35460f["length"] - 1, _0x9d3c98 = 0, _0x56c259 = _0x393f80["length"] - 1;
    for (; _0x38d6fe <= _0x4acda1 && _0x9d3c98 <= _0x56c259; ) if (null === _0x35460f[_0x38d6fe]) _0x38d6fe++;
    else {
      if (null === _0x35460f[_0x4acda1]) _0x4acda1--;
      else {
        if (_0x91e153[_0x38d6fe] === _0x4597dc[_0x9d3c98]) _0x1f5cbe[_0x9d3c98] = u$2(_0x35460f[_0x38d6fe], _0x393f80[_0x9d3c98]), _0x38d6fe++, _0x9d3c98++;
        else {
          if (_0x91e153[_0x4acda1] === _0x4597dc[_0x56c259]) _0x1f5cbe[_0x56c259] = u$2(_0x35460f[_0x4acda1], _0x393f80[_0x56c259]), _0x4acda1--, _0x56c259--;
          else {
            if (_0x91e153[_0x38d6fe] === _0x4597dc[_0x56c259]) _0x1f5cbe[_0x56c259] = u$2(_0x35460f[_0x38d6fe], _0x393f80[_0x56c259]), v(_0x565a96, _0x1f5cbe[_0x56c259 + 1], _0x35460f[_0x38d6fe]), _0x38d6fe++, _0x56c259--;
            else {
              if (_0x91e153[_0x4acda1] === _0x4597dc[_0x9d3c98]) _0x1f5cbe[_0x9d3c98] = u$2(_0x35460f[_0x4acda1], _0x393f80[_0x9d3c98]), v(_0x565a96, _0x35460f[_0x38d6fe], _0x35460f[_0x4acda1]), _0x4acda1--, _0x9d3c98++;
              else {
                if (void 0 === _0x15f952 && (_0x15f952 = u$1(_0x4597dc, _0x9d3c98, _0x56c259), _0x5ed89e = u$1(_0x91e153, _0x38d6fe, _0x4acda1)), _0x15f952["has"](_0x91e153[_0x38d6fe])) {
                  if (_0x15f952["has"](_0x91e153[_0x4acda1])) {
                    const _0x14a69f = _0x5ed89e["get"](_0x4597dc[_0x9d3c98]), _0x117606 = void 0 !== _0x14a69f ? _0x35460f[_0x14a69f] : null;
                    if (null === _0x117606) {
                      const _0xcfbc34 = v(_0x565a96, _0x35460f[_0x38d6fe]);
                      u$2(_0xcfbc34, _0x393f80[_0x9d3c98]), _0x1f5cbe[_0x9d3c98] = _0xcfbc34;
                    } else _0x1f5cbe[_0x9d3c98] = u$2(_0x117606, _0x393f80[_0x9d3c98]), v(_0x565a96, _0x35460f[_0x38d6fe], _0x117606), _0x35460f[_0x14a69f] = null;
                    _0x9d3c98++;
                  } else h(_0x35460f[_0x4acda1]), _0x4acda1--;
                } else h(_0x35460f[_0x38d6fe]), _0x38d6fe++;
              }
            }
          }
        }
      }
    }
    for (; _0x9d3c98 <= _0x56c259; ) {
      const _0x16462d = v(_0x565a96, _0x1f5cbe[_0x56c259 + 1]);
      u$2(_0x16462d, _0x393f80[_0x9d3c98]), _0x1f5cbe[_0x9d3c98++] = _0x16462d;
    }
    for (; _0x38d6fe <= _0x4acda1; ) {
      const _0x579beb = _0x35460f[_0x38d6fe++];
      null !== _0x579beb && h(_0x579beb);
    }
    return this["ut"] = _0x4597dc, p(_0x565a96, _0x1f5cbe), E;
  }
});
function applyCustomCss(_0x5ebbe1, _0x579d71, _0x549766, _0x23a76f) {
  if (!_0x5ebbe1) return;
  if (!_0x579d71) {
    if (_0x549766["sheet"]) {
      const _0x3091f4 = _0x549766["sheet"];
      _0x5ebbe1["adoptedStyleSheets"] = _0x5ebbe1["adoptedStyleSheets"]["filter"]((_0x4aef5d) => _0x4aef5d !== _0x3091f4);
    }
    return;
  }
  !_0x549766["sheet"] && (_0x549766["sheet"] = new CSSStyleSheet(), _0x5ebbe1["adoptedStyleSheets"] = [..._0x5ebbe1["adoptedStyleSheets"], _0x549766["sheet"]]);
  try {
    _0x549766["sheet"]["replaceSync"](_0x579d71);
  } catch (_0x407996) {
    console["warn"]("[" + _0x23a76f + "] customCss gecersiz CSS iceriyor:", _0x407996);
  }
}
function syncVirtualScrollbar(_0x176358, _0x3d1f12) {
  const { scrollHeight: _0x5d5fd6, clientHeight: _0x4079e8, scrollTop: _0x17f7ad } = _0x176358, _0x19bd95 = _0x5d5fd6 - _0x4079e8;
  if (_0x19bd95 <= 1) {
    _0x3d1f12["style"]["display"] = "none";
    return;
  }
  _0x3d1f12["style"]["display"] = "block";
  const _0x1cd21a = Math["max"](24, _0x4079e8 / _0x5d5fd6 * _0x4079e8), _0x440127 = _0x4079e8 - _0x1cd21a, _0x2385b3 = _0x17f7ad / _0x19bd95 * _0x440127;
  _0x3d1f12["style"]["height"] = _0x1cd21a + "px", _0x3d1f12["style"]["top"] = _0x2385b3 + "px";
}
function startVirtualScrollbarDrag(_0x23d60f, _0x5c82e3, _0x18fccb) {
  const _0xc55659 = () => {
  };
  if (_0x23d60f["button"] !== 0) return _0xc55659;
  _0x23d60f["preventDefault"]();
  const _0x49af8d = _0x23d60f["currentTarget"], _0x517ce6 = _0x49af8d["getBoundingClientRect"](), _0x10ccc0 = _0x23d60f["clientY"] - _0x517ce6["top"], _0x45c8be = (_0x5db68b) => {
    const _0x33b09d = _0x5c82e3["getBoundingClientRect"](), _0x379285 = _0x5c82e3["clientHeight"] - _0x49af8d["offsetHeight"];
    if (_0x379285 <= 0) return;
    const _0x97d2aa = _0x5db68b["clientY"] - _0x33b09d["top"] - _0x10ccc0, _0x184edf = Math["min"](Math["max"](_0x97d2aa, 0), _0x379285), _0x557682 = _0x5c82e3["scrollHeight"] - _0x5c82e3["clientHeight"];
    _0x5c82e3["scrollTop"] = _0x184edf / _0x379285 * _0x557682;
  }, _0x6d10dc = (_0x56b582) => {
    _0x49af8d["removeEventListener"]("pointermove", _0x45c8be), _0x49af8d["removeEventListener"]("pointerup", _0x2fb6b1), _0x49af8d["removeEventListener"]("pointercancel", _0x2fb6b1), _0x56b582 && _0x49af8d["hasPointerCapture"](_0x56b582["pointerId"]) && _0x49af8d["releasePointerCapture"](_0x56b582["pointerId"]), _0x18fccb == null ? void 0 : _0x18fccb();
  }, _0x2fb6b1 = (_0x1cf1ae) => _0x6d10dc(_0x1cf1ae);
  return _0x49af8d["setPointerCapture"](_0x23d60f["pointerId"]), _0x49af8d["addEventListener"]("pointermove", _0x45c8be), _0x49af8d["addEventListener"]("pointerup", _0x2fb6b1), _0x49af8d["addEventListener"]("pointercancel", _0x2fb6b1), () => _0x6d10dc();
}
class VirtualScrollbar {
  constructor(_0xa11639, _0x8e1b92, _0x3e26f7) {
    this["host"] = _0xa11639, this["getList"] = _0x8e1b92, this["getThumb"] = _0x3e26f7, this["_stopDrag"] = null, _0xa11639["addController"](this);
  }
  ["hostDisconnected"]() {
    var _a2;
    (_a2 = this["_stopDrag"]) == null ? void 0 : _a2.call(this), this["_stopDrag"] = null;
  }
  ["sync"]() {
    const _0x5779a2 = this["getList"](), _0x155ae3 = this["getThumb"]();
    if (!_0x5779a2 || !_0x155ae3) return;
    syncVirtualScrollbar(_0x5779a2, _0x155ae3);
  }
  ["startDrag"](_0x4fbba5) {
    const _0x19aefd = this["getList"]();
    if (!_0x19aefd) return;
    this["_stopDrag"] = startVirtualScrollbarDrag(_0x4fbba5, _0x19aefd, () => {
      this["_stopDrag"] = null;
    });
  }
}
class DraggablePanelController {
  constructor(_0x31b06e, _0x48bb00) {
    this["options"] = _0x48bb00, this["_header"] = null, this["_panel"] = null, this["_offset"] = null, this["_move"] = (_0x22ae6b) => {
      var _a2, _b;
      if (!this["_offset"] || !this["_panel"]) return;
      this["_panel"]["style"]["left"] = _0x22ae6b["clientX"] - this["_offset"]["x"] + "px", this["_panel"]["style"]["top"] = _0x22ae6b["clientY"] - this["_offset"]["y"] + "px", (_b = (_a2 = this["options"])["onMove"]) == null ? void 0 : _b.call(_a2);
    }, this["_end"] = (_0x4b9b10) => {
      const _0x55aee0 = _0x4b9b10["currentTarget"];
      _0x55aee0["removeEventListener"]("pointermove", this["_move"]), _0x55aee0["removeEventListener"]("pointerup", this["_end"]), _0x55aee0["removeEventListener"]("pointercancel", this["_end"]);
      if (_0x55aee0["hasPointerCapture"](_0x4b9b10["pointerId"])) _0x55aee0["releasePointerCapture"](_0x4b9b10["pointerId"]);
      this["_reset"]();
    }, _0x31b06e["addController"](this);
  }
  ["hostDisconnected"]() {
    this["cancel"]();
  }
  ["start"](_0x1f134b) {
    if (_0x1f134b["button"] !== 0) return;
    if (_0x1f134b["target"]["closest"](this["options"]["ignoreSelector"])) return;
    const _0x353d32 = _0x1f134b["currentTarget"], _0x40d23a = this["options"]["getPanel"](_0x353d32);
    if (!_0x40d23a) return;
    const _0x58aef6 = _0x40d23a["getBoundingClientRect"]();
    _0x40d23a["style"]["left"] = _0x58aef6["left"] + "px", _0x40d23a["style"]["top"] = _0x58aef6["top"] + "px", _0x40d23a["style"]["transform"] = "none", this["_header"] = _0x353d32, this["_panel"] = _0x40d23a, this["_offset"] = { "x": _0x1f134b["clientX"] - _0x58aef6["left"], "y": _0x1f134b["clientY"] - _0x58aef6["top"] }, _0x353d32["setPointerCapture"](_0x1f134b["pointerId"]), _0x353d32["addEventListener"]("pointermove", this["_move"]), _0x353d32["addEventListener"]("pointerup", this["_end"]), _0x353d32["addEventListener"]("pointercancel", this["_end"]);
  }
  ["cancel"]() {
    this["_removeListeners"](), this["_reset"]();
  }
  ["_removeListeners"]() {
    var _a2, _b, _c;
    (_a2 = this["_header"]) == null ? void 0 : _a2["removeEventListener"]("pointermove", this["_move"]), (_b = this["_header"]) == null ? void 0 : _b["removeEventListener"]("pointerup", this["_end"]), (_c = this["_header"]) == null ? void 0 : _c["removeEventListener"]("pointercancel", this["_end"]);
  }
  ["_reset"]() {
    this["_header"] = null, this["_panel"] = null, this["_offset"] = null;
  }
}
const styleEditorStyles = i$5`
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

  /* Carbon'un kendi form etiketlerinde kullandigi varsayilan bosluk
     (.cds--label { margin-block-end: .5rem }) ile tutarli olmasi icin
     8px. */
  .field-label {
    display: block;
    margin-bottom: 0.5rem;
    color: var(--cds-text-secondary, #525252);
    font-size: 0.75rem;
  }

  /* bkz _outlineWidthDisabledByScale WHY yorumu -- SADECE bu esik
     asildiginda gorunur, disabled bir alanin sebebini hover'a GEREK
     KALMADAN aciklar (kullanici bildirimi: "kullanıcılar niye disable
     diye sorarlarsa"). */
  .field-hint {
    display: block;
    margin-top: 0.375rem;
    color: var(--cds-text-error, #da1e28);
    font-size: 0.6875rem;
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
var __defProp$x = Object["defineProperty"], __getOwnPropDesc$y = Object["getOwnPropertyDescriptor"], __decorateClass$y = (_0x54e203, _0x28897c, _0x2678b5, _0x1bf566) => {
  var _0x9c4ba5 = _0x1bf566 > 1 ? void 0 : _0x1bf566 ? __getOwnPropDesc$y(_0x28897c, _0x2678b5) : _0x28897c;
  for (var _0x5a96f3 = _0x54e203["length"] - 1, _0x5cb096; _0x5a96f3 >= 0; _0x5a96f3--) if (_0x5cb096 = _0x54e203[_0x5a96f3]) _0x9c4ba5 = (_0x1bf566 ? _0x5cb096(_0x28897c, _0x2678b5, _0x9c4ba5) : _0x5cb096(_0x9c4ba5)) || _0x9c4ba5;
  if (_0x1bf566 && _0x9c4ba5) __defProp$x(_0x28897c, _0x2678b5, _0x9c4ba5);
  return _0x9c4ba5;
};
let TucbsServiceStyleCard = class extends i$2 {
  constructor() {
    super(...arguments), this["layerId"] = "", this["layerType"] = "", this["requestId"] = 0, this["_serviceStyles"] = [], this["_serviceStylesLoading"] = ![], this["_serviceStylesError"] = "", this["_selectedServiceStyle"] = "";
  }
  ["willUpdate"](_0x113677) {
    (_0x113677["has"]("layerId") || _0x113677["has"]("layerType") || _0x113677["has"]("layerManager") || _0x113677["has"]("requestId")) && void this["_loadServiceStyles"]();
  }
  async ["_loadServiceStyles"]() {
    var _a2;
    if (!this["layerManager"] || !this["layerId"]) return;
    this["_serviceStylesLoading"] = !![], this["_serviceStylesError"] = "";
    try {
      const _0xc53519 = this["layerType"] === "WMS" ? await this["layerManager"]["getWmsAvailableStyles"](this["layerId"]) : await this["layerManager"]["getWmtsAvailableStyles"](this["layerId"]);
      this["_serviceStyles"] = _0xc53519, this["_selectedServiceStyle"] = ((_a2 = _0xc53519[0]) == null ? void 0 : _a2["name"]) ?? "";
    } catch (_0x3165af) {
      _0x3165af instanceof TucbsError && console["error"]("[tucbs-style-editor] " + _0x3165af["code"] + " (" + _0x3165af["number"] + "): " + _0x3165af["message"]), this["_serviceStylesError"] = _0x3165af instanceof Error ? _0x3165af["message"] : "Sunucu stilleri okunamadı.";
    } finally {
      this["_serviceStylesLoading"] = ![];
    }
  }
  async ["_selectServiceStyle"](_0x53f78d) {
    if (!this["layerManager"] || !this["layerId"]) return;
    this["_selectedServiceStyle"] = _0x53f78d;
    try {
      this["layerType"] === "WMS" ? await this["layerManager"]["setWmsStyle"](this["layerId"], _0x53f78d) : await this["layerManager"]["setWmtsStyle"](this["layerId"], _0x53f78d);
    } catch (_0x4316a5) {
      _0x4316a5 instanceof TucbsError && console["error"]("[tucbs-style-editor] " + _0x4316a5["code"] + " (" + _0x4316a5["number"] + "): " + _0x4316a5["message"]), this["_serviceStylesError"] = _0x4316a5 instanceof Error ? _0x4316a5["message"] : "Stil uygulanamadı.";
    }
  }
  ["render"]() {
    const _0x2f6c83 = this["_serviceStyles"]["find"]((_0x19938a) => _0x19938a["name"] === this["_selectedServiceStyle"]);
    return b`
      <div class="card">
        <span class="card-title">Sunucu Stili</span>

        ${this["_serviceStylesLoading"] ? b`<span class="field-label">Stiller yükleniyor…</span>` : this["_serviceStylesError"] ? b`<span class="field-label" style="color:#da1e28;">${this["_serviceStylesError"]}</span>` : b`
                <div>
                  <span class="field-label">Stil</span>
                  <cds-dropdown
                    size="sm"
                    label="Seçiniz"
                    .value=${this["_selectedServiceStyle"]}
                    @cds-dropdown-selected=${(_0xf023c1) => {
      void this["_selectServiceStyle"](_0xf023c1["detail"]["item"]["value"]);
    }}
                  >
                    ${this["_serviceStyles"]["map"]((_0x1ff65a) => b`<cds-dropdown-item value=${_0x1ff65a["name"]}>${_0x1ff65a["title"]}</cds-dropdown-item>`)}
                  </cds-dropdown>
                </div>

                ${(_0x2f6c83 == null ? void 0 : _0x2f6c83["legendUrl"]) ? b`
                      <div>
                        <span class="field-label">Lejant</span>
                        <img
                          src=${_0x2f6c83["legendUrl"]}
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
TucbsServiceStyleCard["styles"] = i$5`
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
  `, __decorateClass$y([n$1({ "attribute": ![] })], TucbsServiceStyleCard["prototype"], "layerManager", 2), __decorateClass$y([n$1()], TucbsServiceStyleCard["prototype"], "layerId", 2), __decorateClass$y([n$1()], TucbsServiceStyleCard["prototype"], "layerType", 2), __decorateClass$y([n$1({ "attribute": ![] })], TucbsServiceStyleCard["prototype"], "requestId", 2), __decorateClass$y([r()], TucbsServiceStyleCard["prototype"], "_serviceStyles", 2), __decorateClass$y([r()], TucbsServiceStyleCard["prototype"], "_serviceStylesLoading", 2), __decorateClass$y([r()], TucbsServiceStyleCard["prototype"], "_serviceStylesError", 2), __decorateClass$y([r()], TucbsServiceStyleCard["prototype"], "_selectedServiceStyle", 2), TucbsServiceStyleCard = __decorateClass$y([t$3("tucbs-service-style-card")], TucbsServiceStyleCard);
function sampleFromPaletteCss(_0x4106a2, _0x387c94, _0x18a2f3) {
  if (_0x4106a2["length"] === 0) return "#808080";
  const _0x307fac = Math["max"](0, Math["min"](1, _0x387c94));
  if (_0x18a2f3 === "qualitative") {
    const _0x475950 = Math["round"](_0x307fac * (_0x4106a2["length"] - 1));
    return _0x4106a2[_0x475950];
  }
  if (_0x4106a2["length"] === 1) return _0x4106a2[0];
  const _0x3b3212 = _0x307fac * (_0x4106a2["length"] - 1), _0x4e15c3 = Math["floor"](_0x3b3212), _0x7dae84 = Math["min"](_0x4106a2["length"] - 1, _0x4e15c3 + 1), _0x27bb9e = _0x3b3212 - _0x4e15c3, _0x2c44bc = hexToRgb(_0x4106a2[_0x4e15c3]), _0x568584 = hexToRgb(_0x4106a2[_0x7dae84]), _0x89377 = Math["round"](_0x2c44bc[0] + (_0x568584[0] - _0x2c44bc[0]) * _0x27bb9e), _0x43015c = Math["round"](_0x2c44bc[1] + (_0x568584[1] - _0x2c44bc[1]) * _0x27bb9e), _0x1edfa2 = Math["round"](_0x2c44bc[2] + (_0x568584[2] - _0x2c44bc[2]) * _0x27bb9e);
  return "rgb(" + _0x89377 + ", " + _0x43015c + ", " + _0x1edfa2 + ")";
}
function hexToRgb(_0x263ee3) {
  const _0x167133 = _0x263ee3["replace"]("#", ""), _0x5f312a = parseInt(_0x167133["length"] === 3 ? _0x167133["replace"](/(.)/g, "$1$1") : _0x167133, 16);
  return [_0x5f312a >> 16 & 255, _0x5f312a >> 8 & 255, _0x5f312a & 255];
}
function compareCategoryKeys(_0x2798ab, _0x1be587) {
  const _0x42709f = Number(_0x2798ab), _0x501b2a = Number(_0x1be587), _0x3fac25 = Number["isFinite"](_0x42709f) && String(_0x42709f) === _0x2798ab, _0x51bf29 = Number["isFinite"](_0x501b2a) && String(_0x501b2a) === _0x1be587;
  if (_0x3fac25 && _0x51bf29) return _0x42709f - _0x501b2a;
  return _0x2798ab < _0x1be587 ? -1 : _0x2798ab > _0x1be587 ? 1 : 0;
}
const INTEGER_RELATIVE_TOLERANCE = 1e-12;
function formatLegendNumber(_0x2bec5f) {
  if (_0x2bec5f === void 0) return "?";
  const _0x2a974a = Math["round"](_0x2bec5f), _0x433e09 = INTEGER_RELATIVE_TOLERANCE * Math["max"](1, Math["abs"](_0x2bec5f));
  return Math["abs"](_0x2bec5f - _0x2a974a) <= _0x433e09 ? String(_0x2a974a) : _0x2bec5f["toFixed"](2);
}
const DEFAULT_FILL_COLOR = "#1ecfb0", GRADIENT_PALETTES = [{ "value": "Viridis", "label": "Viridis", "colors": ["#440154", "#3b528b", "#21918c", "#5ec962", "#fde725"] }, { "value": "Plasma", "label": "Plasma", "colors": ["#0d0887", "#6a00a8", "#b12a90", "#e16462", "#fca636", "#f0f921"] }, { "value": "Magma", "label": "Magma", "colors": ["#000004", "#3b0f70", "#8c2981", "#de4968", "#fe9f6d", "#fcfdbf"] }, { "value": "Inferno", "label": "Inferno", "colors": ["#000004", "#420a68", "#932667", "#dd513a", "#fca50a", "#fcffa4"] }, { "value": "Cividis", "label": "Cividis", "colors": ["#00224e", "#123570", "#3b496c", "#575d6d", "#88892a", "#fee838"] }, { "value": "Turbo", "label": "Turbo", "colors": ["#30123b", "#4145ab", "#4675ed", "#39a2fc", "#1bcfd4", "#24eca6", "#61fc6c", "#a4fc3b", "#d1e834", "#f3c63a", "#fe9b2d", "#f36315", "#d93806", "#b11901", "#7a0403"] }, { "value": "Blues", "label": "Blues", "colors": ["#f7fbff", "#c6dbef", "#6baed6", "#3182bd", "#08519c"] }, { "value": "Greens", "label": "Greens", "colors": ["#f7fcf5", "#c7e9c0", "#74c476", "#31a354", "#006d2c"] }, { "value": "Oranges", "label": "Oranges", "colors": ["#fff5eb", "#fdd0a2", "#f16913", "#d94801", "#7f2704"] }, { "value": "Reds", "label": "Reds", "colors": ["#fff5f0", "#fcbba1", "#fb6a4a", "#cb181d", "#67000d"] }, { "value": "Purples", "label": "Purples", "colors": ["#fcfbfd", "#dadaeb", "#9e9ac8", "#6a51a3", "#3f007d"] }, { "value": "YlOrRd", "label": "YlOrRd", "colors": ["#ffffcc", "#fed976", "#fd8d3c", "#e31a1c", "#800026"] }, { "value": "YlGnBu", "label": "YlGnBu", "colors": ["#ffffd9", "#c7e9b4", "#41b6c4", "#225ea8", "#081d58"] }, { "value": "Spectral", "label": "Spectral", "colors": ["#9e0142", "#f46d43", "#fee08b", "#ffffbf", "#e6f598", "#66c2a5", "#5e4fa2"] }, { "value": "RdYlGn", "label": "RdYlGn", "colors": ["#a50026", "#f46d43", "#ffffbf", "#a6d96a", "#006837"] }, { "value": "RdYlBu", "label": "RdYlBu", "colors": ["#a50026", "#f46d43", "#ffffbf", "#74add1", "#313695"] }, { "value": "BrBG", "label": "BrBG", "colors": ["#543005", "#bf812d", "#f6e8c3", "#c7eae5", "#35978f", "#003c30"] }, { "value": "RdBu", "label": "RdBu", "colors": ["#67001f", "#d6604d", "#f7f7f7", "#4393c3", "#2166ac"] }, { "value": "PiYG", "label": "PiYG", "colors": ["#8e0152", "#de77ae", "#f7f7f7", "#7fbc41", "#276419"] }, { "value": "Set2", "label": "Set2", "colors": ["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854", "#ffd92f", "#e5c494", "#b3b3b3"] }, { "value": "Set3", "label": "Set3", "colors": ["#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462", "#b3de69", "#fccde5"] }, { "value": "Tableau10", "label": "Tableau10", "colors": ["#4e79a7", "#f28e2b", "#e15759", "#76b7b2", "#59a14f", "#edc948", "#b07aa1", "#ff9da7", "#9c755f", "#bab0ac"] }, { "value": "Dark2", "label": "Dark2", "colors": ["#1b9e77", "#d95f02", "#7570b3", "#e7298a", "#66a61e", "#e6ab02", "#a6761d", "#666666"] }, { "value": "Paired", "label": "Paired", "colors": ["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99", "#e31a1c", "#fdbf6f", "#ff7f00"] }, { "value": "Accent", "label": "Accent", "colors": ["#7fc97f", "#beaed4", "#fdc086", "#ffff99", "#386cb0", "#f0027f", "#bf5b17", "#666666"] }], DEFAULT_GRADIENT_PALETTE = GRADIENT_PALETTES[0]["value"], PALETTE_KIND = { "Viridis": "sequential", "Plasma": "sequential", "Magma": "sequential", "Inferno": "sequential", "Cividis": "sequential", "Turbo": "sequential", "Blues": "sequential", "Greens": "sequential", "Oranges": "sequential", "Reds": "sequential", "Purples": "sequential", "YlOrRd": "sequential", "YlGnBu": "sequential", "Spectral": "diverging", "RdYlGn": "diverging", "RdYlBu": "diverging", "BrBG": "diverging", "RdBu": "diverging", "PiYG": "diverging", "Set2": "qualitative", "Set3": "qualitative", "Tableau10": "qualitative", "Dark2": "qualitative", "Paired": "qualitative", "Accent": "qualitative" };
function paletteKindOf(_0x4094fc) {
  return PALETTE_KIND[_0x4094fc] ?? "sequential";
}
function sanitizeNumericInput(_0x448bb8, _0x4b1585) {
  const _0x51dd29 = _0x4b1585 && _0x448bb8["trimStart"]()["startsWith"]("-");
  let _0x50b3d7 = _0x448bb8["replace"](/[^0-9.]/g, "");
  const _0x283809 = _0x50b3d7["indexOf"](".");
  _0x283809 !== -1 && (_0x50b3d7 = _0x50b3d7["slice"](0, _0x283809 + 1) + _0x50b3d7["slice"](_0x283809 + 1)["replace"](/\./g, ""));
  const _0x543b57 = _0x50b3d7["indexOf"]("."), _0x26424e = _0x543b57 === -1 ? _0x50b3d7 : _0x50b3d7["slice"](0, _0x543b57), _0x51fa69 = _0x543b57 === -1 ? "" : _0x50b3d7["slice"](_0x543b57), _0x1b8cea = _0x26424e["replace"](/^0+(?=\d)/, "");
  return (_0x51dd29 ? "-" : "") + _0x1b8cea + _0x51fa69;
}
function checkGradientBound(_0x31918e, _0x107d3f, _0x4ad489, _0x32de88) {
  if (_0x31918e === "") return { "valid": !![], "message": "" };
  const _0x527d40 = Number(_0x31918e);
  if (!Number["isFinite"](_0x527d40)) return { "valid": ![], "message": "" };
  if (_0x32de88 && (_0x527d40 < _0x32de88["min"] || _0x527d40 > _0x32de88["max"])) return { "valid": ![], "message": "Değer " + formatLegendNumber(_0x32de88["min"]) + " ile " + formatLegendNumber(_0x32de88["max"]) + " arasında olmalı." };
  const _0x44e4d2 = _0x4ad489 === "" ? Number["NaN"] : Number(_0x4ad489);
  if (Number["isFinite"](_0x44e4d2)) {
    if (_0x107d3f === "min" && _0x527d40 > _0x44e4d2) return { "valid": ![], "message": "Min, Max değerinden (" + formatLegendNumber(_0x44e4d2) + ") büyük olamaz." };
    if (_0x107d3f === "max" && _0x527d40 < _0x44e4d2) return { "valid": ![], "message": "Max, Min değerinden (" + formatLegendNumber(_0x44e4d2) + ") küçük olamaz." };
  }
  return { "valid": !![], "message": "" };
}
function computeMinMax(_0x66c9bc, _0x184dc5, _0x53d3fd) {
  const _0x2b1c9e = {};
  if (_0x66c9bc !== "") {
    const _0x6e2bb3 = Number(_0x66c9bc);
    _0x2b1c9e["min"] = _0x53d3fd && Number["isFinite"](_0x6e2bb3) ? Math["max"](_0x6e2bb3, _0x53d3fd["min"]) : _0x6e2bb3;
  }
  if (_0x184dc5 !== "") {
    const _0x5c328c = Number(_0x184dc5);
    _0x2b1c9e["max"] = _0x53d3fd && Number["isFinite"](_0x5c328c) ? Math["min"](_0x5c328c, _0x53d3fd["max"]) : _0x5c328c;
  }
  return _0x2b1c9e["min"] !== void 0 && _0x2b1c9e["max"] !== void 0 && _0x2b1c9e["min"] > _0x2b1c9e["max"] && (_0x2b1c9e["min"] = _0x2b1c9e["max"]), _0x2b1c9e;
}
function buildFillStyle(_0x492cb0) {
  const _0x2185de = _0x492cb0["fillOpacityPercent"] / 100;
  switch (_0x492cb0["colorMode"]) {
    case "solid":
      return { "mode": "solid", "color": _0x492cb0["fillColor"], "opacity": _0x2185de };
    case "gradient":
      return { "mode": "gradient", "column": _0x492cb0["dataColumn"], "palette": _0x492cb0["paletteColors"], "paletteKind": _0x492cb0["paletteKind"], ...computeMinMax(_0x492cb0["gradientMin"], _0x492cb0["gradientMax"], _0x492cb0["columnRange"]), "opacity": _0x2185de };
    case "bin":
      return { "mode": "bin", "column": _0x492cb0["dataColumn"], "palette": _0x492cb0["paletteColors"], "paletteKind": _0x492cb0["paletteKind"], "binCount": _0x492cb0["binCount"], ...computeMinMax(_0x492cb0["gradientMin"], _0x492cb0["gradientMax"], _0x492cb0["columnRange"]), "opacity": _0x2185de };
    case "enum":
      return { "mode": "enum", "column": _0x492cb0["dataColumn"], "colors": _0x492cb0["categoryColors"], "opacity": _0x2185de };
    case "off":
    default:
      return { "mode": "off" };
  }
}
function sortCategoryValues(_0x4beba9, _0x4dc600) {
  if (_0x4dc600 === "source") return _0x4beba9;
  const _0x3a2acf = [..._0x4beba9]["sort"]((_0x60f8ee, _0x26b59b) => compareCategoryKeys(String(_0x60f8ee), String(_0x26b59b)));
  return _0x4dc600 === "desc" ? _0x3a2acf["reverse"]() : _0x3a2acf;
}
function autoFillCategoryColors(_0x394e9c, _0x48dc56, _0x1918f3) {
  const _0x53cdb4 = {};
  return _0x394e9c["forEach"]((_0x2335e7, _0x4bdbe2) => {
    const _0xbafa7c = String(_0x2335e7);
    _0x53cdb4[_0xbafa7c] = _0x48dc56[_0xbafa7c] ?? _0x1918f3[_0x4bdbe2 % _0x1918f3["length"]] ?? DEFAULT_FILL_COLOR;
  }), _0x53cdb4;
}
function arraysEqual(_0x493de1, _0xd3bd72) {
  return _0x493de1["length"] === _0xd3bd72["length"] && _0x493de1["every"]((_0x273926, _0x4ac027) => _0x273926 === _0xd3bd72[_0x4ac027]);
}
function findPaletteName(_0x361f13) {
  for (const _0x75ee91 of GRADIENT_PALETTES) {
    if (arraysEqual(_0x75ee91["colors"], _0x361f13)) return { "name": _0x75ee91["value"], "reversed": ![] };
    if (arraysEqual([..._0x75ee91["colors"]]["reverse"](), _0x361f13)) return { "name": _0x75ee91["value"], "reversed": !![] };
  }
  return void 0;
}
function toHexColor(_0x2b4bfe) {
  const _0x42c51b = /hsl\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*\)/["exec"](_0x2b4bfe);
  if (!_0x42c51b) return _0x2b4bfe["startsWith"]("#") ? _0x2b4bfe : "#000000";
  const _0x7aac36 = Number(_0x42c51b[1]), _0x1ed120 = Number(_0x42c51b[2]) / 100, _0x57e1ed = Number(_0x42c51b[3]) / 100, _0x16aaca = (1 - Math["abs"](2 * _0x57e1ed - 1)) * _0x1ed120, _0x45bc18 = _0x16aaca * (1 - Math["abs"](_0x7aac36 / 60 % 2 - 1)), _0x50ab99 = _0x57e1ed - _0x16aaca / 2, _0x16da30 = [[_0x16aaca, _0x45bc18, 0], [_0x45bc18, _0x16aaca, 0], [0, _0x16aaca, _0x45bc18], [0, _0x45bc18, _0x16aaca], [_0x45bc18, 0, _0x16aaca], [_0x16aaca, 0, _0x45bc18]], [_0x41e473, _0x45e9a1, _0x1db041] = _0x16da30[Math["min"](5, Math["floor"](_0x7aac36 / 60))] ?? _0x16da30[0], _0x2092cc = (_0x7644be) => Math["round"]((_0x7644be + _0x50ab99) * 255)["toString"](16)["padStart"](2, "0");
  return "#" + _0x2092cc(_0x41e473) + _0x2092cc(_0x45e9a1) + _0x2092cc(_0x1db041);
}
function restoreRangeFields(_0x41eddf) {
  const _0x226731 = findPaletteName(_0x41eddf["palette"]);
  return { "dataColumn": _0x41eddf["column"], ..._0x226731 && { "gradientPalette": _0x226731["name"], "paletteReversed": _0x226731["reversed"] }, "gradientMin": _0x41eddf["min"] !== void 0 ? String(_0x41eddf["min"]) : "", "gradientMax": _0x41eddf["max"] !== void 0 ? String(_0x41eddf["max"]) : "", ..._0x41eddf["mode"] === "bin" && { "binCount": String(_0x41eddf["binCount"]) } };
}
function restoreEnumFields(_0x18dcd6) {
  const _0x2c66f1 = Object["keys"](_0x18dcd6["colors"])["map"]((_0x4ed5e4) => {
    const _0x5ccd50 = Number(_0x4ed5e4);
    return Number["isFinite"](_0x5ccd50) && String(_0x5ccd50) === _0x4ed5e4 ? _0x5ccd50 : _0x4ed5e4;
  });
  return { "dataColumn": _0x18dcd6["column"], "categoryColors": { ..._0x18dcd6["colors"] }, "categoryValues": _0x2c66f1 };
}
function restoreFillFields(_0x5d837a) {
  if ((_0x5d837a == null ? void 0 : _0x5d837a["mode"]) === "gradient" || (_0x5d837a == null ? void 0 : _0x5d837a["mode"]) === "bin") return restoreRangeFields(_0x5d837a);
  if ((_0x5d837a == null ? void 0 : _0x5d837a["mode"]) === "enum") return restoreEnumFields(_0x5d837a);
  return {};
}
function deriveStyleEditorState(_0x270613, _0x3f2b29, _0x43d4b3, _0x1ca6f1) {
  const _0x219169 = (_0x270613 == null ? void 0 : _0x270613["fill"]["mode"]) === "solid" ? _0x270613["fill"] : void 0, _0x2e914f = _0x3f2b29 ? toHexColor(_0x3f2b29) : DEFAULT_FILL_COLOR, _0xe5859f = _0x43d4b3 !== void 0 ? Math["round"](_0x43d4b3 * 100) : _0x1ca6f1["fillOpacity"];
  return { "colorMode": (_0x270613 == null ? void 0 : _0x270613["fill"]["mode"]) ?? _0x1ca6f1["colorMode"], "fillColor": _0x219169 ? toHexColor(_0x219169["color"]) : _0x2e914f, "fillOpacity": _0x219169 ? Math["round"](_0x219169["opacity"] * 100) : _0xe5859f, "dataColumn": "", "gradientPalette": DEFAULT_GRADIENT_PALETTE, "paletteReversed": ![], "gradientMin": "", "gradientMax": "", "binCount": _0x1ca6f1["binCount"], "categoryColors": {}, "categoryValues": [], ...restoreFillFields(_0x270613 == null ? void 0 : _0x270613["fill"]), "outlineEnabled": (_0x270613 == null ? void 0 : _0x270613["outline"]["enabled"]) ?? _0x1ca6f1["outlineEnabled"], "outlineColor": _0x270613 ? toHexColor(_0x270613["outline"]["color"]) : _0x1ca6f1["outlineColor"], "outlineWidth": _0x270613 !== void 0 ? String(_0x270613["outline"]["width"]) : _0x1ca6f1["outlineWidth"] };
}
const GRADIENT_LEGEND_STEPS = 7;
function gradientLegendRows(_0x505a7a, _0x108431, _0x3ca13d, _0x2d5b57 = GRADIENT_LEGEND_STEPS) {
  return Array["from"]({ "length": _0x2d5b57 }, (_0x5e85c6, _0x5d5281) => {
    const _0x128a4b = _0x2d5b57 <= 1 ? 1 : 1 - _0x5d5281 / (_0x2d5b57 - 1), _0x3301a3 = _0x505a7a + _0x128a4b * (_0x108431 - _0x505a7a);
    return { "color": _0x3ca13d(_0x128a4b), "label": formatLegendNumber(_0x3301a3) };
  });
}
function binLegendRows(_0x57d124, _0x1106f2, _0x239353, _0x3f461f) {
  const _0x579cc7 = (_0x1106f2 - _0x57d124) / _0x239353;
  return Array["from"]({ "length": _0x239353 }, (_0x5bba70, _0x36ff70) => {
    const _0x4da18a = _0x57d124 + _0x579cc7 * _0x36ff70, _0x23c727 = _0x57d124 + _0x579cc7 * (_0x36ff70 + 1), _0xc339fe = _0x239353 <= 1 ? 0.5 : _0x36ff70 / (_0x239353 - 1);
    return { "color": _0x3f461f(_0xc339fe), "label": formatLegendNumber(_0x4da18a) + " – " + formatLegendNumber(_0x23c727) };
  });
}
class TimerBag {
  constructor(_0x2e41fa) {
    this["_timeoutIds"] = /* @__PURE__ */ new Set(), this["_frameIds"] = /* @__PURE__ */ new Set(), _0x2e41fa["addController"](this);
  }
  ["hostDisconnected"]() {
    for (const _0x1000cc of this["_timeoutIds"]) window["clearTimeout"](_0x1000cc);
    this["_timeoutIds"]["clear"]();
    for (const _0x8ec905 of this["_frameIds"]) cancelAnimationFrame(_0x8ec905);
    this["_frameIds"]["clear"]();
  }
  ["setTimeout"](_0x2c3798, _0x3f80e5) {
    const _0xaedb07 = window["setTimeout"](() => {
      this["_timeoutIds"]["delete"](_0xaedb07), _0x2c3798();
    }, _0x3f80e5);
    return this["_timeoutIds"]["add"](_0xaedb07), _0xaedb07;
  }
  ["clearTimeout"](_0x8167f) {
    if (_0x8167f === null) return;
    window["clearTimeout"](_0x8167f), this["_timeoutIds"]["delete"](_0x8167f);
  }
  ["requestAnimationFrame"](_0x879408) {
    const _0x65233e = requestAnimationFrame(() => {
      this["_frameIds"]["delete"](_0x65233e), _0x879408();
    });
    return this["_frameIds"]["add"](_0x65233e), _0x65233e;
  }
  ["cancelAnimationFrame"](_0x4c8e4d) {
    if (_0x4c8e4d === null) return;
    cancelAnimationFrame(_0x4c8e4d), this["_frameIds"]["delete"](_0x4c8e4d);
  }
}
const DEFAULT_BIN_COUNT = "5", FILL_COLOR_MODES = [{ "value": "solid", "label": "Sabit Renk" }, { "value": "gradient", "label": "Sürekli (Gradient)" }, { "value": "bin", "label": "Kesikli (Bin)" }, { "value": "enum", "label": "Kategorik (Enum)" }, { "value": "off", "label": "Kapalı" }], CATEGORY_SORT_OPTIONS = [{ "value": "asc", "label": "Artan (eskiden yeniye)" }, { "value": "desc", "label": "Azalan (yeniden eskiye)" }, { "value": "source", "label": "Verideki sıra" }], editStartValues = /* @__PURE__ */ new WeakMap();
function onBoundInput(_0x208594, _0x23db26, _0x12c5d9) {
  const _0x1319b8 = _0x12c5d9["target"];
  !editStartValues["has"](_0x1319b8) && editStartValues["set"](_0x1319b8, _0x23db26 === "min" ? _0x208594["gradientMin"] : _0x208594["gradientMax"]);
  const _0x3d7a05 = sanitizeNumericInput(_0x1319b8["value"], _0x23db26 === "min" ? _0x208594["allowNegativeMin"]() : _0x208594["allowNegativeMax"]());
  if (_0x1319b8["value"] !== _0x3d7a05) _0x1319b8["value"] = _0x3d7a05;
  const _0x42757f = _0x208594["checkGradientBound"](_0x23db26, _0x3d7a05);
  setBoundError(_0x208594, _0x23db26, _0x42757f["message"]);
  if (!_0x42757f["valid"]) return;
  setBound(_0x208594, _0x23db26, _0x3d7a05), _0x208594["scheduleApplyStyle"]();
}
function commitBound(_0x5c9d78, _0x56faf9, _0x1534ae) {
  const _0x35771d = _0x1534ae["target"], _0x29cb35 = editStartValues["get"](_0x35771d);
  editStartValues["delete"](_0x35771d), setBoundError(_0x5c9d78, _0x56faf9, "");
  if (_0x5c9d78["checkGradientBound"](_0x56faf9, _0x35771d["value"])["valid"]) return;
  const _0x3ef9f3 = _0x56faf9 === "min" ? _0x5c9d78["gradientMin"] : _0x5c9d78["gradientMax"], _0x1561a1 = _0x29cb35 ?? _0x3ef9f3;
  if (_0x35771d["value"] !== _0x1561a1) _0x35771d["value"] = _0x1561a1;
  _0x3ef9f3 !== _0x1561a1 && (setBound(_0x5c9d78, _0x56faf9, _0x1561a1), _0x5c9d78["scheduleApplyStyle"]());
}
function setBound(_0x539529, _0x236ac2, _0x385eae) {
  if (_0x236ac2 === "min") _0x539529["gradientMin"] = _0x385eae;
  else _0x539529["gradientMax"] = _0x385eae;
}
function setBoundError(_0x516ef3, _0xc5a570, _0x14fd53) {
  if (_0xc5a570 === "min") _0x516ef3["gradientMinError"] = _0x14fd53;
  else _0x516ef3["gradientMaxError"] = _0x14fd53;
}
const onBoundKeydown = (_0x47e9a9, _0x5e96d7, _0x33b2df) => {
  if (_0x33b2df["key"] === "Enter") commitBound(_0x47e9a9, _0x5e96d7, _0x33b2df);
};
function renderMinMaxFields(_0x39a321) {
  return _0x39a321["colorMode"] === "gradient" ? b`
        <div style="display:flex; flex-direction:column; gap:0.75rem;">
          <div>
            <span class="field-label">Min</span>
            <cds-text-input
              size="sm"
              label="Min"
              hide-label
              placeholder="Otomatik"
              .value=${_0x39a321["gradientMin"]}
              .invalid=${_0x39a321["gradientMinError"] !== ""}
              .invalidText=${_0x39a321["gradientMinError"]}
              @input=${(_0x3e533c) => onBoundInput(_0x39a321, "min", _0x3e533c)}
              @keydown=${(_0x44c907) => onBoundKeydown(_0x39a321, "min", _0x44c907)}
              @focusout=${(_0x36fa95) => commitBound(_0x39a321, "min", _0x36fa95)}
            ></cds-text-input>
          </div>
          <div>
            <span class="field-label">Max</span>
            <cds-text-input
              size="sm"
              label="Max"
              hide-label
              placeholder="Otomatik"
              .value=${_0x39a321["gradientMax"]}
              .invalid=${_0x39a321["gradientMaxError"] !== ""}
              .invalidText=${_0x39a321["gradientMaxError"]}
              @input=${(_0x35b0f4) => onBoundInput(_0x39a321, "max", _0x35b0f4)}
              @keydown=${(_0x18e811) => onBoundKeydown(_0x39a321, "max", _0x18e811)}
              @focusout=${(_0x3ee303) => commitBound(_0x39a321, "max", _0x3ee303)}
            ></cds-text-input>
          </div>
        </div>
      ` : "";
}
const isValidBinCount = (_0x53474c) => /^[1-9]$/["test"](_0x53474c);
function onBinCountInput(_0x3aee11, _0x141a0a) {
  const _0x29336f = _0x141a0a["currentTarget"];
  if (!editStartValues["has"](_0x29336f)) editStartValues["set"](_0x29336f, _0x3aee11["binCount"]);
  const _0x18def2 = _0x29336f["value"], _0x104c2b = _0x18def2["replace"](/\D/g, "")["replace"](/^0+(?=\d)/, "");
  if (_0x18def2 !== _0x104c2b) _0x29336f["value"] = _0x104c2b;
  isValidBinCount(_0x104c2b) && _0x104c2b !== _0x3aee11["binCount"] && (_0x3aee11["binCount"] = _0x104c2b, _0x3aee11["scheduleApplyStyle"]());
}
function onBinCountStep(_0x4312c9, _0x27ccd6) {
  if (!_0x27ccd6["detail"]["direction"]) return;
  const _0x4ea926 = String(Math["round"](Number(_0x27ccd6["detail"]["value"])));
  isValidBinCount(_0x4ea926) && _0x4ea926 !== _0x4312c9["binCount"] && (_0x4312c9["binCount"] = _0x4ea926, _0x4312c9["scheduleApplyStyle"]());
}
function commitBinCount(_0x13a3cc, _0x1ab1df) {
  const _0x48379 = _0x1ab1df["currentTarget"], _0x42f0b8 = editStartValues["get"](_0x48379);
  editStartValues["delete"](_0x48379);
  if (isValidBinCount(_0x48379["value"])) return;
  const _0x56d038 = _0x42f0b8 ?? _0x13a3cc["binCount"];
  _0x48379["value"] = _0x56d038, _0x13a3cc["binCount"] !== _0x56d038 && (_0x13a3cc["binCount"] = _0x56d038, _0x13a3cc["scheduleApplyStyle"]());
}
function renderBinCountField(_0x4c0aca) {
  return _0x4c0aca["colorMode"] === "bin" ? b`
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
            .value=${_0x4c0aca["binCount"]}
            @input=${(_0x2ed29f) => onBinCountInput(_0x4c0aca, _0x2ed29f)}
            @cds-number-input=${(_0x4c1103) => onBinCountStep(_0x4c0aca, _0x4c1103)}
            @keydown=${(_0x3523a5) => {
    if (_0x3523a5["key"] === "Enter") commitBinCount(_0x4c0aca, _0x3523a5);
  }}
            @focusout=${(_0x4fba8d) => commitBinCount(_0x4c0aca, _0x4fba8d)}
          ></cds-number-input>
        </div>
      ` : "";
}
function renderEnumFields(_0x3d5bcb) {
  return _0x3d5bcb["colorMode"] === "enum" ? b`
        <div>
          <span class="field-label">Kategori Sırası</span>
          <cds-dropdown
            size="sm"
            label="Seçiniz"
            .value=${_0x3d5bcb["categorySort"]}
            @cds-dropdown-selected=${(_0x1cffa8) => {
    _0x3d5bcb["categorySort"] = _0x1cffa8["detail"]["item"]["value"], _0x3d5bcb["categoryValues"] = _0x3d5bcb["sortCategoryValues"](_0x3d5bcb["categoryValues"]);
  }}
          >
            ${CATEGORY_SORT_OPTIONS["map"]((_0x4721c5) => b`<cds-dropdown-item value=${_0x4721c5["value"]}>${_0x4721c5["label"]}</cds-dropdown-item>`)}
          </cds-dropdown>
        </div>

        <div>
          <cds-checkbox
            .checked=${_0x3d5bcb["paletteReversed"]}
            label-text="Paleti ters çevir"
            @cds-checkbox-changed=${(_0x31d929) => {
    var _a2;
    _0x3d5bcb["paletteReversed"] = ((_a2 = _0x31d929["detail"]) == null ? void 0 : _a2["checked"]) ?? !_0x3d5bcb["paletteReversed"], _0x3d5bcb["categoryColors"] = _0x3d5bcb["autoFillCategoryColors"](_0x3d5bcb["categoryValues"], {}), _0x3d5bcb["scheduleApplyStyle"]();
  }}
          ></cds-checkbox>
        </div>
      ` : "";
}
function renderSolidSwatchField(_0x5f288c) {
  return _0x5f288c["colorMode"] === "solid" ? b`
        <div>
          <span class="field-label">Renk Paleti</span>
          <span class="color-swatch" style="background:${_0x5f288c["fillColor"]}">
            <input
              type="color"
              .value=${_0x5f288c["fillColor"]}
              aria-label="Dolgu rengi"
              @input=${(_0x3b00a4) => {
    _0x5f288c["fillColor"] = _0x3b00a4["target"]["value"], _0x5f288c["scheduleApplyStyle"]();
  }}
            />
          </span>
        </div>
      ` : "";
}
function renderOpacityField(_0x2417c8) {
  return _0x2417c8["colorMode"] === "off" ? "" : b`
        <div style="margin-top: 8px">
          <span class="field-label">Opaklık (${_0x2417c8["fillOpacity"]}%)</span>
          <input
            type="range"
            class="opacity-slider"
            min="0"
            max="100"
            step="1"
            .value=${String(_0x2417c8["fillOpacity"])}
            style="--fill: ${_0x2417c8["fillOpacity"]}%"
            @input=${(_0x4fab77) => {
    const _0x3562a3 = _0x4fab77["target"], _0x587b43 = Number(_0x3562a3["value"]);
    _0x2417c8["updateOpacitySlider"](_0x3562a3, _0x587b43), _0x2417c8["setFillOpacity"](_0x587b43);
  }}
          />
        </div>
      `;
}
function renderColorModeField(_0x2bee5b) {
  return _0x2bee5b["isFixedSolidLayer"] ? "" : b`
        <div>
          <span class="field-label">Renk Modu</span>
          <cds-dropdown
            size="sm"
            label="Seçiniz"
            .value=${_0x2bee5b["colorMode"]}
            @cds-dropdown-selected=${(_0x3a9f7c) => {
    _0x2bee5b["colorMode"] = _0x3a9f7c["detail"]["item"]["value"];
    const _0x254f13 = _0x2bee5b["colorMode"] === "gradient" || _0x2bee5b["colorMode"] === "bin" ? _0x2bee5b["numericDataColumns"] : _0x2bee5b["dataColumns"];
    _0x2bee5b["dataColumn"] && !_0x254f13["includes"](_0x2bee5b["dataColumn"]) && (_0x2bee5b["dataColumn"] = "");
    if (_0x2bee5b["dataColumn"]) _0x2bee5b["onDataColumnChange"](_0x2bee5b["dataColumn"]);
    else _0x2bee5b["scheduleApplyStyle"]();
  }}
          >
            ${FILL_COLOR_MODES["map"]((_0x345b05) => b`<cds-dropdown-item value=${_0x345b05["value"]}>${_0x345b05["label"]}</cds-dropdown-item>`)}
          </cds-dropdown>
        </div>
      `;
}
function renderDataFields(_0x485db0) {
  const _0x221a30 = _0x485db0["colorMode"] === "gradient" || _0x485db0["colorMode"] === "bin" ? _0x485db0["numericDataColumns"] : _0x485db0["dataColumns"];
  return _0x485db0["colorMode"] === "gradient" || _0x485db0["colorMode"] === "bin" || _0x485db0["colorMode"] === "enum" ? b`
        <div>
          <span class="field-label">Veri Sütunu</span>
          <cds-dropdown
            size="sm"
            label="Seçiniz"
            .value=${_0x485db0["dataColumn"]}
            @cds-dropdown-selected=${(_0xb63470) => {
    _0x485db0["onDataColumnChange"](_0xb63470["detail"]["item"]["value"]);
  }}
          >
            ${_0x221a30["map"]((_0x100f61) => b`<cds-dropdown-item value=${_0x100f61}>${_0x100f61}</cds-dropdown-item>`)}
          </cds-dropdown>
        </div>

        <div>
          <span class="field-label">Renk Paleti</span>
          <div class="palette-dropdown-wrap">
            <cds-dropdown
              size="sm"
              label="Seçiniz"
              .value=${_0x485db0["gradientPalette"]}
              @cds-dropdown-selected=${(_0x2cec2c) => {
    _0x485db0["gradientPalette"] = _0x2cec2c["detail"]["item"]["value"], _0x485db0["colorMode"] === "enum" && _0x485db0["categoryValues"]["length"] > 0 && (_0x485db0["categoryColors"] = _0x485db0["autoFillCategoryColors"](_0x485db0["categoryValues"], {})), _0x485db0["scheduleApplyStyle"]();
  }}
            >
              ${GRADIENT_PALETTES["map"]((_0x4d08fe) => b`
                  <cds-dropdown-item value=${_0x4d08fe["value"]} title=${_0x4d08fe["label"]}>
                    <span
                      class="palette-swatch"
                      aria-label=${_0x4d08fe["label"]}
                      style="background: linear-gradient(to right, ${_0x4d08fe["colors"]["join"](", ")})"
                    ></span>
                  </cds-dropdown-item>
                `)}
            </cds-dropdown>
            <span
              class="palette-selected-preview"
              style="background: linear-gradient(to right, ${(GRADIENT_PALETTES["find"]((_0x5300f1) => _0x5300f1["value"] === _0x485db0["gradientPalette"]) ?? GRADIENT_PALETTES[0])["colors"]["join"](", ")})"
            ></span>
          </div>
        </div>

        ${renderMinMaxFields(_0x485db0)}
        ${renderBinCountField(_0x485db0)}
        ${renderEnumFields(_0x485db0)}
      ` : renderSolidSwatchField(_0x485db0);
}
function renderFillCard(_0x44dbdc) {
  return b`
    <div class="card">
      <span class="card-title">Dolgu</span>

      ${renderColorModeField(_0x44dbdc)}

      ${renderDataFields(_0x44dbdc)}

      ${renderOpacityField(_0x44dbdc)}
    </div>
  `;
}
var __defProp$w = Object["defineProperty"], __getOwnPropDesc$x = Object["getOwnPropertyDescriptor"], __decorateClass$x = (_0x1f18d4, _0x202719, _0x195752, _0x3277f9) => {
  var _0x2a41e2 = _0x3277f9 > 1 ? void 0 : _0x3277f9 ? __getOwnPropDesc$x(_0x202719, _0x195752) : _0x202719;
  for (var _0x2e2b1d = _0x1f18d4["length"] - 1, _0x384aa4; _0x2e2b1d >= 0; _0x2e2b1d--) if (_0x384aa4 = _0x1f18d4[_0x2e2b1d]) _0x2a41e2 = (_0x3277f9 ? _0x384aa4(_0x202719, _0x195752, _0x2a41e2) : _0x384aa4(_0x2a41e2)) || _0x2a41e2;
  if (_0x3277f9 && _0x2a41e2) __defProp$w(_0x202719, _0x195752, _0x2a41e2);
  return _0x2a41e2;
};
const SERVICE_LAYER_TYPES$1 = ["WMS", "WMTS"], ICON_PALETTE_20 = o$1(iconNodeToString(_20_default$3)), ICON_RENEW$1 = o$1(iconNodeToString(_16_default$c)), ICON_CLOSE$6 = o$1(iconNodeToString(_16_default$v)), DEFAULT_FILL_OPACITY = 46, FIXED_SOLID_LAYER_FILL_OPACITY = 40, DEFAULT_OUTLINE_ENABLED = !![], DEFAULT_OUTLINE_COLOR = "#1a73e8", DEFAULT_OUTLINE_WIDTH = "2", FIXED_SOLID_LAYER_OUTLINE_WIDTH = "1", LARGE_LAYER_FEATURE_THRESHOLD = 5e3, VISIBLE_LIST_ROWS = 10, TECHNICAL_COLUMN_PATTERN = /^(shape_area|shape_leng|shape_length|shape_len|objectid|fid|gml_id|gid)(_\d+)?$/i, DEFAULT_COLOR_MODE = FILL_COLOR_MODES[0]["value"], DEFAULT_CATEGORY_SORT = CATEGORY_SORT_OPTIONS[0]["value"], STYLE_EDITOR_FORM_DEFAULTS = { "colorMode": DEFAULT_COLOR_MODE, "fillOpacity": DEFAULT_FILL_OPACITY, "outlineEnabled": DEFAULT_OUTLINE_ENABLED, "outlineColor": DEFAULT_OUTLINE_COLOR, "outlineWidth": DEFAULT_OUTLINE_WIDTH, "binCount": DEFAULT_BIN_COUNT };
let TucbsStyleEditor = class extends i$2 {
  constructor() {
    super(...arguments), this["open"] = ![], this["layerId"] = "", this["layerTitle"] = "", this["layerType"] = "", this["customCss"] = "", this["_customCssState"] = { "sheet": null }, this["_colorMode"] = DEFAULT_COLOR_MODE, this["_dataColumn"] = "", this["_dataColumns"] = [], this["_numericDataColumns"] = [], this["_gradientPalette"] = DEFAULT_GRADIENT_PALETTE, this["_gradientMin"] = "", this["_gradientMax"] = "", this["_gradientMinError"] = "", this["_gradientMaxError"] = "", this["_binCount"] = DEFAULT_BIN_COUNT, this["_categorySort"] = DEFAULT_CATEGORY_SORT, this["_paletteReversed"] = ![], this["_categoryValues"] = [], this["_categoryColors"] = {}, this["_fillColor"] = DEFAULT_FILL_COLOR, this["_fillOpacity"] = DEFAULT_FILL_OPACITY, this["_outlineEnabled"] = DEFAULT_OUTLINE_ENABLED, this["_outlineColor"] = DEFAULT_OUTLINE_COLOR, this["_outlineWidth"] = DEFAULT_OUTLINE_WIDTH, this["_serviceStyleRequestId"] = 0, this["_drag"] = new DraggablePanelController(this, { "getPanel": () => this, "ignoreSelector": ".close-btn" }), this["_categoryScroll"] = new VirtualScrollbar(this, () => this["_categoryListEl"], () => this["_categoryThumbEl"]), this["_legendScroll"] = new VirtualScrollbar(this, () => this["_legendListEl"], () => this["_legendThumbEl"]), this["_applyStyleRaf"] = null, this["_fillOpacityRaf"] = null, this["_timers"] = new TimerBag(this), this["_onLayerStyle"] = (_0x506489) => {
      if (!this["open"] || _0x506489["id"] !== this["layerId"]) return;
      const { fill: _0x1f1f92 } = _0x506489["style"];
      if (_0x1f1f92["mode"] === "off") return;
      if (_0x1f1f92["mode"] === "solid") this["_fillColor"] = toHexColor(_0x1f1f92["color"]);
      this["_fillOpacity"] = Math["round"](_0x1f1f92["opacity"] * 100);
    }, this["_fillCardHost"] = new class {
      constructor(_0x5c4a2f) {
        this["editor"] = _0x5c4a2f;
      }
      get ["colorMode"]() {
        return this["editor"]["_colorMode"];
      }
      set ["colorMode"](_0x1d231f) {
        this["editor"]["_colorMode"] = _0x1d231f;
      }
      get ["dataColumn"]() {
        return this["editor"]["_dataColumn"];
      }
      set ["dataColumn"](_0x5099ef) {
        this["editor"]["_dataColumn"] = _0x5099ef;
      }
      get ["gradientPalette"]() {
        return this["editor"]["_gradientPalette"];
      }
      set ["gradientPalette"](_0x5ae2a9) {
        this["editor"]["_gradientPalette"] = _0x5ae2a9;
      }
      get ["gradientMin"]() {
        return this["editor"]["_gradientMin"];
      }
      set ["gradientMin"](_0x22e4e5) {
        this["editor"]["_gradientMin"] = _0x22e4e5;
      }
      get ["gradientMax"]() {
        return this["editor"]["_gradientMax"];
      }
      set ["gradientMax"](_0x4ffbff) {
        this["editor"]["_gradientMax"] = _0x4ffbff;
      }
      get ["gradientMinError"]() {
        return this["editor"]["_gradientMinError"];
      }
      set ["gradientMinError"](_0x552828) {
        this["editor"]["_gradientMinError"] = _0x552828;
      }
      get ["gradientMaxError"]() {
        return this["editor"]["_gradientMaxError"];
      }
      set ["gradientMaxError"](_0x4063a2) {
        this["editor"]["_gradientMaxError"] = _0x4063a2;
      }
      get ["binCount"]() {
        return this["editor"]["_binCount"];
      }
      set ["binCount"](_0x363101) {
        this["editor"]["_binCount"] = _0x363101;
      }
      get ["categorySort"]() {
        return this["editor"]["_categorySort"];
      }
      set ["categorySort"](_0x2de0a8) {
        this["editor"]["_categorySort"] = _0x2de0a8;
      }
      get ["paletteReversed"]() {
        return this["editor"]["_paletteReversed"];
      }
      set ["paletteReversed"](_0x108f2e) {
        this["editor"]["_paletteReversed"] = _0x108f2e;
      }
      get ["categoryValues"]() {
        return this["editor"]["_categoryValues"];
      }
      set ["categoryValues"](_0x3756a1) {
        this["editor"]["_categoryValues"] = _0x3756a1;
      }
      get ["categoryColors"]() {
        return this["editor"]["_categoryColors"];
      }
      set ["categoryColors"](_0x3237ed) {
        this["editor"]["_categoryColors"] = _0x3237ed;
      }
      get ["fillColor"]() {
        return this["editor"]["_fillColor"];
      }
      set ["fillColor"](_0x2a1963) {
        this["editor"]["_fillColor"] = _0x2a1963;
      }
      get ["fillOpacity"]() {
        return this["editor"]["_fillOpacity"];
      }
      get ["dataColumns"]() {
        return this["editor"]["_dataColumns"];
      }
      get ["numericDataColumns"]() {
        return this["editor"]["_numericDataColumns"];
      }
      get ["isFixedSolidLayer"]() {
        return this["editor"]["_isFixedSolidLayer"];
      }
      ["allowNegativeMin"]() {
        return this["editor"]["_allowNegativeMin"]();
      }
      ["allowNegativeMax"]() {
        return this["editor"]["_allowNegativeMax"]();
      }
      ["checkGradientBound"](_0x117d9b, _0x2fa8c3) {
        return this["editor"]["_checkGradientBound"](_0x117d9b, _0x2fa8c3);
      }
      ["scheduleApplyStyle"]() {
        this["editor"]["_scheduleApplyStyle"]();
      }
      ["sortCategoryValues"](_0x2d8a35) {
        return this["editor"]["_sortCategoryValues"](_0x2d8a35);
      }
      ["autoFillCategoryColors"](_0xd03be0, _0x5cdd8a) {
        return this["editor"]["_autoFillCategoryColors"](_0xd03be0, _0x5cdd8a);
      }
      ["updateOpacitySlider"](_0x54b4f8, _0x2f740b) {
        this["editor"]["_updateOpacitySlider"](_0x54b4f8, _0x2f740b);
      }
      ["setFillOpacity"](_0x5b3598) {
        this["editor"]["_setFillOpacity"](_0x5b3598);
      }
      ["onDataColumnChange"](_0x423567) {
        this["editor"]["_onDataColumnChange"](_0x423567);
      }
    }(this);
  }
  ["disconnectedCallback"]() {
    if (this["layerManager"]) this["layerManager"]["off"]("layer:style", this["_onLayerStyle"]);
    super["disconnectedCallback"]();
  }
  ["updated"](_0x3d4d4c) {
    _0x3d4d4c["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_customCssState"], "tucbs-style-editor");
    _0x3d4d4c["has"]("open") && this["open"] && (this["style"]["removeProperty"]("left"), this["style"]["removeProperty"]("top"), this["style"]["removeProperty"]("transform"));
    if (_0x3d4d4c["has"]("layerManager")) {
      const _0x18684f = _0x3d4d4c["get"]("layerManager");
      if (_0x18684f) _0x18684f["off"]("layer:style", this["_onLayerStyle"]);
      if (this["layerManager"]) this["layerManager"]["on"]("layer:style", this["_onLayerStyle"]);
    }
    this["_timers"]["requestAnimationFrame"](() => {
      TucbsStyleEditor["_fitListToRows"](this["_categoryListEl"], ".legend-bin-row"), TucbsStyleEditor["_fitListToRows"](this["_legendListEl"], ".legend-bin-row"), this["_categoryScroll"]["sync"](), this["_legendScroll"]["sync"]();
    });
  }
  ["openFor"](_0x3c4d32, _0x27fd99, _0x3d2650, _0x46e3d0, _0xdad9b1) {
    var _a2, _b;
    this["layerId"] = _0x3c4d32, this["layerTitle"] = _0x27fd99, this["layerType"] = _0x3d2650, this["_featureCount"] = (_a2 = this["layerManager"]) == null ? void 0 : _a2["getFeatureCount"](_0x3c4d32), this["_dataColumns"] = [], this["_numericDataColumns"] = [], this["_categorySort"] = DEFAULT_CATEGORY_SORT;
    const _0x27b90e = (_b = this["layerManager"]) == null ? void 0 : _b["getLayerStyle"](_0x3c4d32), _0x5c3353 = deriveStyleEditorState(_0x27b90e, _0x46e3d0, _0xdad9b1, STYLE_EDITOR_FORM_DEFAULTS);
    this["_colorMode"] = _0x5c3353["colorMode"], this["_fillColor"] = _0x5c3353["fillColor"], this["_fillOpacity"] = _0x5c3353["fillOpacity"], this["_dataColumn"] = _0x5c3353["dataColumn"], this["_gradientPalette"] = _0x5c3353["gradientPalette"], this["_paletteReversed"] = _0x5c3353["paletteReversed"], this["_gradientMin"] = _0x5c3353["gradientMin"], this["_gradientMax"] = _0x5c3353["gradientMax"], this["_gradientMinError"] = "", this["_gradientMaxError"] = "", this["_binCount"] = _0x5c3353["binCount"], this["_categoryColors"] = _0x5c3353["categoryColors"], this["_categoryValues"] = this["_sortCategoryValues"](_0x5c3353["categoryValues"]), this["_outlineEnabled"] = _0x5c3353["outlineEnabled"], this["_outlineColor"] = _0x5c3353["outlineColor"], this["_outlineWidth"] = _0x5c3353["outlineWidth"];
    for (const _0x579488 of document["querySelectorAll"]("tucbs-identify-panel")) {
      _0x579488["close"]();
    }
    this["open"] = !![], this["_serviceStyleRequestId"]++, !this["_isServiceLayer"] && this["_loadDataColumns"]();
  }
  get ["_isServiceLayer"]() {
    return SERVICE_LAYER_TYPES$1["includes"](this["layerType"]);
  }
  get ["_isFixedSolidLayer"]() {
    return this["layerType"] === "DRAWING" || this["layerType"] === "MEASURE";
  }
  get ["_outlineWidthDisabledByScale"]() {
    return this["_featureCount"] !== void 0 && this["_featureCount"] > LARGE_LAYER_FEATURE_THRESHOLD;
  }
  ["close"]() {
    this["_close"]();
  }
  ["_close"]() {
    this["open"] = ![], this["dispatchEvent"](new CustomEvent("tucbs-style-editor-closed", { "bubbles": !![], "composed": !![] }));
  }
  ["_reset"]() {
    var _a2;
    this["_colorMode"] = DEFAULT_COLOR_MODE, this["_dataColumn"] = "", this["_gradientMin"] = "", this["_gradientMax"] = "", this["_gradientMinError"] = "", this["_gradientMaxError"] = "", this["_gradientPalette"] = DEFAULT_GRADIENT_PALETTE, this["_binCount"] = DEFAULT_BIN_COUNT, this["_categorySort"] = DEFAULT_CATEGORY_SORT, this["_paletteReversed"] = ![], this["_categoryValues"] = [], this["_categoryColors"] = {};
    const _0x4a82b3 = (_a2 = this["layerManager"]) == null ? void 0 : _a2["getInitialFillColor"](this["layerId"]);
    this["_fillColor"] = _0x4a82b3 ? toHexColor(_0x4a82b3) : DEFAULT_FILL_COLOR, this["_fillOpacity"] = this["_isFixedSolidLayer"] ? FIXED_SOLID_LAYER_FILL_OPACITY : DEFAULT_FILL_OPACITY, this["_outlineEnabled"] = DEFAULT_OUTLINE_ENABLED, this["_outlineColor"] = DEFAULT_OUTLINE_COLOR, this["_outlineWidth"] = this["_isFixedSolidLayer"] ? FIXED_SOLID_LAYER_OUTLINE_WIDTH : DEFAULT_OUTLINE_WIDTH;
    if (!this["_isServiceLayer"]) this["_scheduleApplyStyle"]();
  }
  ["_updateOpacitySlider"](_0x5d5452, _0x262294) {
    _0x5d5452["style"]["setProperty"]("--fill", _0x262294 + "%");
  }
  ["_setFillOpacity"](_0x1e2982) {
    this["_timers"]["cancelAnimationFrame"](this["_fillOpacityRaf"]), this["_fillOpacityRaf"] = this["_timers"]["requestAnimationFrame"](() => {
      this["_fillOpacityRaf"] = null, this["_fillOpacity"] = _0x1e2982, this["_scheduleApplyStyle"]();
    });
  }
  ["_loadDataColumns"]() {
    if (!this["layerManager"] || !this["layerId"]) return;
    const _0x3b0a77 = this["layerManager"]["getEntityPropertyNames"](this["layerId"])["filter"]((_0x59b21a) => !TECHNICAL_COLUMN_PATTERN["test"](_0x59b21a));
    this["_dataColumns"] = _0x3b0a77, this["_numericDataColumns"] = _0x3b0a77["filter"]((_0x34a81d) => this["layerManager"]["getColumnRange"](this["layerId"], _0x34a81d) !== null);
  }
  ["_onDataColumnChange"](_0x5236d6) {
    this["_dataColumn"] = _0x5236d6;
    if (!this["layerManager"] || !this["layerId"] || !_0x5236d6) return;
    if (this["_colorMode"] === "gradient" || this["_colorMode"] === "bin") {
      const _0x4a9e6d = this["layerManager"]["getColumnRange"](this["layerId"], _0x5236d6);
      this["_gradientMin"] = _0x4a9e6d ? String(_0x4a9e6d["min"]) : "", this["_gradientMax"] = _0x4a9e6d ? String(_0x4a9e6d["max"]) : "", this["_gradientMinError"] = "", this["_gradientMaxError"] = "";
    } else this["_colorMode"] === "enum" && this["_loadCategoryValues"](_0x5236d6);
    this["_scheduleApplyStyle"]();
  }
  ["_checkGradientBound"](_0x85bef2, _0xedc9d4) {
    const _0x3b6716 = this["layerManager"] && this["layerId"] && this["_dataColumn"] ? this["layerManager"]["getColumnRange"](this["layerId"], this["_dataColumn"]) : null, _0x5649c9 = _0x85bef2 === "min" ? this["_gradientMax"] : this["_gradientMin"];
    return checkGradientBound(_0xedc9d4, _0x85bef2, _0x5649c9, _0x3b6716);
  }
  ["_allowNegativeMin"]() {
    if (!this["layerManager"] || !this["layerId"] || !this["_dataColumn"]) return !![];
    const _0x1beff8 = this["layerManager"]["getColumnRange"](this["layerId"], this["_dataColumn"]);
    return !_0x1beff8 || _0x1beff8["min"] < 0;
  }
  ["_allowNegativeMax"]() {
    if (!this["layerManager"] || !this["layerId"] || !this["_dataColumn"]) return !![];
    const _0x116243 = this["layerManager"]["getColumnRange"](this["layerId"], this["_dataColumn"]);
    return !_0x116243 || _0x116243["max"] < 0;
  }
  ["_sortCategoryValues"](_0x3b0c28) {
    if (this["_categorySort"] !== "source") return sortCategoryValues(_0x3b0c28, this["_categorySort"]);
    if (!this["layerManager"] || !this["layerId"] || !this["_dataColumn"]) return _0x3b0c28;
    const _0x56b2bd = /* @__PURE__ */ new Map();
    this["layerManager"]["getUniqueColumnValues"](this["layerId"], this["_dataColumn"])["forEach"]((_0x18ae29, _0x527a74) => _0x56b2bd["set"](String(_0x18ae29), _0x527a74));
    const _0x3d81a9 = (_0x117bff) => _0x56b2bd["get"](String(_0x117bff)) ?? Number["MAX_SAFE_INTEGER"];
    return [..._0x3b0c28]["sort"]((_0x5710cd, _0x487ea9) => _0x3d81a9(_0x5710cd) - _0x3d81a9(_0x487ea9));
  }
  ["_loadCategoryValues"](_0x147fe0) {
    if (!this["layerManager"] || !this["layerId"]) return;
    const _0x35f876 = this["layerManager"]["getUniqueColumnValues"](this["layerId"], _0x147fe0);
    this["_categoryValues"] = this["_sortCategoryValues"](_0x35f876), this["_categoryColors"] = this["_autoFillCategoryColors"](this["_categoryValues"], this["_categoryColors"]);
  }
  ["_autoFillCategoryColors"](_0x3825de, _0x368b8f) {
    return autoFillCategoryColors(_0x3825de, _0x368b8f, this["_activePaletteColors"]());
  }
  static ["_fitListToRows"](_0x25dc97, _0x30d9ef) {
    if (!_0x25dc97) return;
    const _0x13ac83 = _0x25dc97["querySelectorAll"](_0x30d9ef);
    if (_0x13ac83["length"] === 0) {
      _0x25dc97["style"]["maxHeight"] = "";
      return;
    }
    const _0x31a0f0 = _0x13ac83[0]["getBoundingClientRect"]();
    if (_0x13ac83["length"] === 1) {
      _0x25dc97["style"]["maxHeight"] = _0x31a0f0["height"] + "px";
      return;
    }
    const _0x466d9b = _0x13ac83[1]["getBoundingClientRect"](), _0x3c143d = _0x466d9b["top"] - _0x31a0f0["top"], _0x36368a = _0x31a0f0["height"] + _0x3c143d * (VISIBLE_LIST_ROWS - 1);
    _0x25dc97["style"]["maxHeight"] = _0x36368a + "px";
  }
  ["_activePaletteColors"]() {
    const _0x4a5a72 = GRADIENT_PALETTES["find"]((_0x5c85ad) => _0x5c85ad["value"] === this["_gradientPalette"]) ?? GRADIENT_PALETTES[0];
    return this["_paletteReversed"] ? [..._0x4a5a72["colors"]]["reverse"]() : _0x4a5a72["colors"];
  }
  ["_buildFillStyle"]() {
    const _0xa20bfa = this["layerManager"] && this["layerId"] && this["_dataColumn"] ? this["layerManager"]["getColumnRange"](this["layerId"], this["_dataColumn"]) : null;
    return buildFillStyle({ "colorMode": this["_colorMode"], "fillOpacityPercent": this["_fillOpacity"], "fillColor": this["_fillColor"], "dataColumn": this["_dataColumn"], "paletteColors": this["_activePaletteColors"](), "paletteKind": paletteKindOf(this["_gradientPalette"]), "gradientMin": this["_gradientMin"], "gradientMax": this["_gradientMax"], "columnRange": _0xa20bfa, "binCount": Number(this["_binCount"]) || Number(DEFAULT_BIN_COUNT), "categoryColors": this["_categoryColors"] });
  }
  ["_scheduleApplyStyle"](_0x45d87a) {
    if (!this["layerManager"] || !this["layerId"] || this["_isServiceLayer"]) return;
    _0x45d87a !== void 0 && (this["_pendingOutlineWidthOverride"] = _0x45d87a);
    if (this["_applyStyleRaf"] !== null) return;
    this["_applyStyleRaf"] = this["_timers"]["requestAnimationFrame"](() => {
      this["_applyStyleRaf"] = null;
      const _0xcb8529 = this["_pendingOutlineWidthOverride"];
      this["_pendingOutlineWidthOverride"] = void 0;
      const _0x5d2ca8 = { "fill": this["_buildFillStyle"](), "outline": { "enabled": this["_outlineEnabled"], "color": this["_outlineColor"], "width": Number(_0xcb8529 ?? this["_outlineWidth"]) || Number(DEFAULT_OUTLINE_WIDTH) } };
      void this["layerManager"]["applyLayerStyle"](this["layerId"], _0x5d2ca8);
    });
  }
  ["_renderCategoryList"]() {
    if (!(this["_colorMode"] === "enum" && this["_categoryValues"]["length"] > 0)) return "";
    return b`
      <div class="card">
        <span class="card-title">Değerler</span>
        <div class="category-values-wrap">
          <div
            class="category-values-list"
            @scroll=${() => this["_categoryScroll"]["sync"]()}
          >
            <div style="display:flex; flex-direction:column; gap:0.5rem;">
              ${this["_categoryValues"]["map"]((_0x127e68) => b`
                  <div class="legend-bin-row">
                    <span class="legend-swatch" style="background:${this["_categoryColors"][String(_0x127e68)] ?? DEFAULT_FILL_COLOR}"></span>
                    <span class="legend-value" title=${String(_0x127e68)}>${String(_0x127e68)}</span>
                  </div>
                `)}
            </div>
          </div>
          <div
            class="category-scroll-thumb"
            @pointerdown=${(_0x525ceb) => this["_categoryScroll"]["startDrag"](_0x525ceb)}
          ></div>
        </div>
      </div>
    `;
  }
  ["_renderLegendCard"]() {
    const _0x3b9cbf = this["layerManager"] && this["layerId"] && this["_dataColumn"] ? this["layerManager"]["getColumnRange"](this["layerId"], this["_dataColumn"]) : null, _0x5e9710 = this["_gradientMin"] !== "" ? Number(this["_gradientMin"]) : void 0, _0x2e1ae5 = this["_gradientMax"] !== "" ? Number(this["_gradientMax"]) : void 0, _0x4c3ac3 = _0x5e9710 !== void 0 && Number["isFinite"](_0x5e9710) ? _0x5e9710 : _0x3b9cbf == null ? void 0 : _0x3b9cbf["min"], _0x364814 = _0x2e1ae5 !== void 0 && Number["isFinite"](_0x2e1ae5) ? _0x2e1ae5 : _0x3b9cbf == null ? void 0 : _0x3b9cbf["max"];
    if (_0x4c3ac3 === void 0 || _0x364814 === void 0) return "";
    if (this["_colorMode"] === "gradient") {
      const _0x2273f8 = this["_activePaletteColors"](), _0x5b4bc9 = paletteKindOf(this["_gradientPalette"]);
      return b`
        <div class="card">
          <span class="card-title">Lejant</span>
          <div class="legend-bin-wrap">
            <div
              class="legend-bin-list"
              @scroll=${() => this["_legendScroll"]["sync"]()}
            >
              ${gradientLegendRows(_0x4c3ac3, _0x364814, (_0x409d41) => sampleFromPaletteCss(_0x2273f8, _0x409d41, _0x5b4bc9))["map"]((_0x275b2a) => b`
                  <div class="legend-bin-row">
                    <span class="legend-swatch" style="background:${_0x275b2a["color"]}"></span>
                    <span class="legend-value">${_0x275b2a["label"]}</span>
                  </div>
                `)}
            </div>
            <div
              class="legend-scroll-thumb"
              @pointerdown=${(_0x1f4dae) => this["_legendScroll"]["startDrag"](_0x1f4dae)}
            ></div>
          </div>
        </div>
      `;
    }
    if (this["_colorMode"] === "bin") {
      const _0x4b3092 = Number(this["_binCount"]) || Number(DEFAULT_BIN_COUNT), _0x5df9f3 = this["_activePaletteColors"](), _0x57cb5d = paletteKindOf(this["_gradientPalette"]);
      return b`
        <div class="card">
          <span class="card-title">Lejant</span>
          <div class="legend-bin-wrap">
            <div
              class="legend-bin-list"
              @scroll=${() => this["_legendScroll"]["sync"]()}
            >
              ${binLegendRows(_0x4c3ac3, _0x364814, _0x4b3092, (_0x236d35) => sampleFromPaletteCss(_0x5df9f3, _0x236d35, _0x57cb5d))["map"]((_0x54373d) => b`
                  <div class="legend-bin-row">
                    <span class="legend-swatch" style="background:${_0x54373d["color"]}"></span>
                    <span class="legend-value">${_0x54373d["label"]}</span>
                  </div>
                `)}
            </div>
            <div
              class="legend-scroll-thumb"
              @pointerdown=${(_0xef965) => this["_legendScroll"]["startDrag"](_0xef965)}
            ></div>
          </div>
        </div>
      `;
    }
    return "";
  }
  ["render"]() {
    if (!this["open"]) return b``;
    return b`
      <div class="panel">
        <div class="header" @pointerdown=${(_0x2be9f1) => this["_drag"]["start"](_0x2be9f1)}>
          <div class="header-title-group">
            <span class="header-icon">${ICON_PALETTE_20}</span>
            <div class="header-text">
              <span class="title">Stil Düzenle</span>
              <span class="subtitle" title=${this["layerTitle"]}>${this["layerTitle"]}</span>
            </div>
          </div>
          <button type="button" class="close-btn" aria-label="Kapat" @click=${() => this["_close"]()}>
            ${ICON_CLOSE$6}
          </button>
        </div>

        <div class="body">
          <div class="section-header">
            <span class="section-header-title">Katman Stili</span>
            <button type="button" class="reset-btn" @click=${() => this["_reset"]()}>
              ${ICON_RENEW$1} Sıfırla
            </button>
          </div>

          <div class="style-cards">
            ${this["_isServiceLayer"] ? b`
                  <tucbs-service-style-card
                    .layerManager=${this["layerManager"]}
                    layerId=${this["layerId"]}
                    layerType=${this["layerType"]}
                    .requestId=${this["_serviceStyleRequestId"]}
                  ></tucbs-service-style-card>
                ` : b`${renderFillCard(this["_fillCardHost"])}${this["_renderOutlineCard"]()}${this["_renderCategoryList"]()}${this["_renderLegendCard"]()}`}
          </div>
        </div>
      </div>
    `;
  }
  ["_renderOutlineCard"]() {
    var _a2;
    return b`
            <div class="card">
              <span class="card-title">Dış Hat</span>

              <div>
                <span class="field-label">Renk Paleti</span>
                <span class="color-swatch" style="background:${this["_outlineColor"]}">
                  <input
                    type="color"
                    .value=${this["_outlineColor"]}
                    aria-label="Dış hat rengi"
                    ?disabled=${!this["_outlineEnabled"]}
                    @input=${(_0x43a95c) => {
      this["_outlineColor"] = _0x43a95c["target"]["value"], this["_scheduleApplyStyle"]();
    }}
                  />
                </span>
              </div>

              <div>
                <span class="field-label">Genişlik</span>
                <cds-number-input
                  size="sm"
                  type="text"
                  locale="en"
                  label="Genişlik"
                  hide-label
                  min="0.5"
                  max="50"
                  step="0.5"
                  .value=${this["_outlineWidth"]}
                  ?disabled=${!this["_outlineEnabled"] || this["_outlineWidthDisabledByScale"]}
                  @input=${(_0x30ad32) => {
      const _0x46ca91 = _0x30ad32["target"];
      let _0x5aa6e5 = _0x46ca91["value"]["replace"](/[^\d.]/g, "");
      const _0x3d2864 = _0x5aa6e5["indexOf"](".");
      _0x3d2864 !== -1 && (_0x5aa6e5 = _0x5aa6e5["slice"](0, _0x3d2864 + 1) + _0x5aa6e5["slice"](_0x3d2864 + 1)["replaceAll"](".", ""));
      if (_0x46ca91["value"] !== _0x5aa6e5) _0x46ca91["value"] = _0x5aa6e5;
      this["_scheduleApplyStyle"](_0x5aa6e5);
    }}
                  @cds-number-input=${(_0x584005) => {
      if (!_0x584005["detail"]["direction"]) return;
      const _0x34ea09 = Number(_0x584005["detail"]["value"]);
      if (!Number["isNaN"](_0x34ea09)) this["_outlineWidth"] = String(_0x34ea09);
      this["_scheduleApplyStyle"]();
    }}
                  @focusout=${(_0x1c2941) => {
      const _0x2381c6 = _0x1c2941["target"], _0x4ade0f = Number(_0x2381c6["value"]), _0x9ad0e8 = String(Number["isFinite"](_0x4ade0f) && _0x4ade0f > 0 ? Math["min"](50, Math["max"](0.5, _0x4ade0f)) : Number(DEFAULT_OUTLINE_WIDTH));
      this["_outlineWidth"] = _0x9ad0e8, _0x2381c6["value"] = _0x9ad0e8, this["_scheduleApplyStyle"]();
    }}
                ></cds-number-input>
                ${this["_outlineWidthDisabledByScale"] ? b`<span class="field-hint"
                      >Bu katmanda ${(_a2 = this["_featureCount"]) == null ? void 0 : _a2["toLocaleString"]("tr-TR")} detay var.<br />
                      Performans nedeniyle devre dışı.</span
                    >` : ""}
              </div>

              <div>
                <cds-checkbox
                  .checked=${this["_outlineEnabled"]}
                  label-text="Etkin"
                  @cds-checkbox-changed=${(_0x2c600a) => {
      var _a3;
      this["_outlineEnabled"] = ((_a3 = _0x2c600a["detail"]) == null ? void 0 : _a3["checked"]) ?? !this["_outlineEnabled"], this["_scheduleApplyStyle"]();
    }}
                ></cds-checkbox>
              </div>
            </div>
    `;
  }
};
TucbsStyleEditor["styles"] = styleEditorStyles, __decorateClass$x([n$1({ "type": Boolean, "reflect": !![] })], TucbsStyleEditor["prototype"], "open", 2), __decorateClass$x([n$1({ "attribute": ![] })], TucbsStyleEditor["prototype"], "layerManager", 2), __decorateClass$x([n$1()], TucbsStyleEditor["prototype"], "layerId", 2), __decorateClass$x([n$1()], TucbsStyleEditor["prototype"], "layerTitle", 2), __decorateClass$x([n$1()], TucbsStyleEditor["prototype"], "layerType", 2), __decorateClass$x([n$1({ "attribute": "custom-css" })], TucbsStyleEditor["prototype"], "customCss", 2), __decorateClass$x([r()], TucbsStyleEditor["prototype"], "_colorMode", 2), __decorateClass$x([r()], TucbsStyleEditor["prototype"], "_dataColumn", 2), __decorateClass$x([r()], TucbsStyleEditor["prototype"], "_dataColumns", 2), __decorateClass$x([r()], TucbsStyleEditor["prototype"], "_numericDataColumns", 2), __decorateClass$x([r()], TucbsStyleEditor["prototype"], "_gradientPalette", 2), __decorateClass$x([r()], TucbsStyleEditor["prototype"], "_gradientMin", 2), __decorateClass$x([r()], TucbsStyleEditor["prototype"], "_gradientMax", 2), __decorateClass$x([r()], TucbsStyleEditor["prototype"], "_gradientMinError", 2), __decorateClass$x([r()], TucbsStyleEditor["prototype"], "_gradientMaxError", 2), __decorateClass$x([r()], TucbsStyleEditor["prototype"], "_binCount", 2), __decorateClass$x([r()], TucbsStyleEditor["prototype"], "_categorySort", 2), __decorateClass$x([r()], TucbsStyleEditor["prototype"], "_paletteReversed", 2), __decorateClass$x([r()], TucbsStyleEditor["prototype"], "_categoryValues", 2), __decorateClass$x([r()], TucbsStyleEditor["prototype"], "_categoryColors", 2), __decorateClass$x([r()], TucbsStyleEditor["prototype"], "_fillColor", 2), __decorateClass$x([r()], TucbsStyleEditor["prototype"], "_fillOpacity", 2), __decorateClass$x([r()], TucbsStyleEditor["prototype"], "_outlineEnabled", 2), __decorateClass$x([r()], TucbsStyleEditor["prototype"], "_outlineColor", 2), __decorateClass$x([r()], TucbsStyleEditor["prototype"], "_outlineWidth", 2), __decorateClass$x([r()], TucbsStyleEditor["prototype"], "_featureCount", 2), __decorateClass$x([r()], TucbsStyleEditor["prototype"], "_serviceStyleRequestId", 2), __decorateClass$x([e$3(".category-values-list")], TucbsStyleEditor["prototype"], "_categoryListEl", 2), __decorateClass$x([e$3(".category-scroll-thumb")], TucbsStyleEditor["prototype"], "_categoryThumbEl", 2), __decorateClass$x([e$3(".legend-bin-list")], TucbsStyleEditor["prototype"], "_legendListEl", 2), __decorateClass$x([e$3(".legend-scroll-thumb")], TucbsStyleEditor["prototype"], "_legendThumbEl", 2), TucbsStyleEditor = __decorateClass$x([t$3("tucbs-style-editor")], TucbsStyleEditor);
var __defProp$v = Object["defineProperty"], __getOwnPropDesc$w = Object["getOwnPropertyDescriptor"], __decorateClass$w = (_0x314b9a, _0x3914f3, _0x22e3fb, _0x38133a) => {
  var _0x19f479 = _0x38133a > 1 ? void 0 : _0x38133a ? __getOwnPropDesc$w(_0x3914f3, _0x22e3fb) : _0x3914f3;
  for (var _0x25860d = _0x314b9a["length"] - 1, _0x1dc926; _0x25860d >= 0; _0x25860d--) if (_0x1dc926 = _0x314b9a[_0x25860d]) _0x19f479 = (_0x38133a ? _0x1dc926(_0x3914f3, _0x22e3fb, _0x19f479) : _0x1dc926(_0x19f479)) || _0x19f479;
  if (_0x38133a && _0x19f479) __defProp$v(_0x3914f3, _0x22e3fb, _0x19f479);
  return _0x19f479;
};
const SERVICE_LAYER_TYPES = ["WMS", "WMTS"];
let TucbsLegendPanel = class extends i$2 {
  constructor() {
    super(...arguments), this["layerId"] = "", this["layerType"] = "", this["open"] = ![], this["customCss"] = "", this["_legendUrl"] = "", this["_loading"] = ![], this["_error"] = "", this["_customCssState"] = { "sheet": null }, this["_listScroll"] = new VirtualScrollbar(this, () => this["_listEl"], () => this["_thumbEl"]), this["_timers"] = new TimerBag(this), this["_onLayerStyle"] = (_0xca417e) => {
      if (_0xca417e["id"] === this["layerId"]) this["_vectorStyle"] = _0xca417e["style"];
    };
  }
  get ["_isServiceLayer"]() {
    return SERVICE_LAYER_TYPES["includes"](this["layerType"]);
  }
  ["updated"](_0x38ae71) {
    var _a2, _b;
    if (_0x38ae71["has"]("layerManager")) {
      const _0x3a702c = _0x38ae71["get"]("layerManager");
      _0x3a702c == null ? void 0 : _0x3a702c["off"]("layer:style", this["_onLayerStyle"]), (_a2 = this["layerManager"]) == null ? void 0 : _a2["on"]("layer:style", this["_onLayerStyle"]);
    }
    (_0x38ae71["has"]("layerId") || _0x38ae71["has"]("layerType") || _0x38ae71["has"]("layerManager")) && (this["_vectorStyle"] = (_b = this["layerManager"]) == null ? void 0 : _b["getLayerStyle"](this["layerId"]), void this["_loadLegend"]()), _0x38ae71["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_customCssState"], "tucbs-legend-panel"), this["_timers"]["requestAnimationFrame"](() => {
      TucbsLegendPanel["_fitListToRows"](this["_listEl"]), this["_listScroll"]["sync"]();
    });
  }
  ["disconnectedCallback"]() {
    var _a2;
    (_a2 = this["layerManager"]) == null ? void 0 : _a2["off"]("layer:style", this["_onLayerStyle"]), super["disconnectedCallback"]();
  }
  async ["_loadLegend"]() {
    var _a2;
    this["_legendUrl"] = "", this["_error"] = "";
    if (!this["layerManager"] || !this["layerId"] || !this["_isServiceLayer"]) return;
    this["_loading"] = !![];
    try {
      if (this["layerType"] === "WMS") this["_legendUrl"] = this["layerManager"]["getWmsLegendGraphicUrl"](this["layerId"]);
      else {
        const _0xcf48e7 = await this["layerManager"]["getWmtsAvailableStyles"](this["layerId"]);
        this["_legendUrl"] = ((_a2 = _0xcf48e7[0]) == null ? void 0 : _a2["legendUrl"]) ?? "";
      }
    } catch (_0x2aabfd) {
      _0x2aabfd instanceof TucbsError && console["error"]("[tucbs-legend-panel] " + _0x2aabfd["code"] + " (" + _0x2aabfd["number"] + "): " + _0x2aabfd["message"]), this["_error"] = _0x2aabfd instanceof Error ? _0x2aabfd["message"] : "Lejant yüklenemedi.";
    } finally {
      this["_loading"] = ![];
    }
  }
  ["render"]() {
    if (!this["open"]) return b``;
    return b`
      <div class="legend">
        <span class="legend-title">Lejant</span>
        ${this["_isServiceLayer"] ? this["_renderServiceLegend"]() : this["_renderVectorLegend"]()}
      </div>
    `;
  }
  ["_renderServiceLegend"]() {
    if (this["_loading"]) return b`<span class="legend-empty">Yükleniyor…</span>`;
    if (this["_error"]) return b`<span class="legend-empty" style="color:#da1e28;">${this["_error"]}</span>`;
    if (!this["_legendUrl"]) return b`<span class="legend-empty">Lejant bulunamadı.</span>`;
    return b`<img class="legend-image" src=${this["_legendUrl"]} alt="Lejant" />`;
  }
  ["_resolveGradientRange"](_0x403c0d, _0x3c9736, _0x15178c) {
    var _a2;
    if (_0x3c9736 !== void 0 && _0x15178c !== void 0) return { "min": _0x3c9736, "max": _0x15178c };
    const _0xcf48e1 = (_a2 = this["layerManager"]) == null ? void 0 : _a2["getColumnRange"](this["layerId"], _0x403c0d);
    if (!_0xcf48e1) return void 0;
    return { "min": _0x3c9736 ?? _0xcf48e1["min"], "max": _0x15178c ?? _0xcf48e1["max"] };
  }
  ["_renderVectorLegend"]() {
    const _0x534b8e = this["_vectorStyle"];
    if (!_0x534b8e) return b`<span class="legend-empty">Henüz stil uygulanmadı.</span>`;
    switch (_0x534b8e["fill"]["mode"]) {
      case "gradient": {
        const { palette: _0x2be243, paletteKind: _0x398e8a, column: _0x75a57c } = _0x534b8e["fill"], _0x45f4ea = this["_resolveGradientRange"](_0x75a57c, _0x534b8e["fill"]["min"], _0x534b8e["fill"]["max"]);
        if (!_0x45f4ea) return b`<span class="legend-empty">Aralık hesaplanamadı.</span>`;
        const { min: _0x4f9ade, max: _0x324858 } = _0x45f4ea;
        return this["_renderScrollableRows"](gradientLegendRows(_0x4f9ade, _0x324858, (_0x191224) => sampleFromPaletteCss(_0x2be243, _0x191224, _0x398e8a)));
      }
      case "bin": {
        const { palette: _0x131e30, binCount: _0x3b3352, paletteKind: _0x493f66, column: _0x26ec89 } = _0x534b8e["fill"], _0x3a45b0 = this["_resolveGradientRange"](_0x26ec89, _0x534b8e["fill"]["min"], _0x534b8e["fill"]["max"]);
        if (!_0x3a45b0) return b`<span class="legend-empty">Aralık hesaplanamadı.</span>`;
        const { min: _0x3993e9, max: _0x47f892 } = _0x3a45b0;
        return this["_renderScrollableRows"](binLegendRows(_0x3993e9, _0x47f892, _0x3b3352, (_0xfb888d) => sampleFromPaletteCss(_0x131e30, _0xfb888d, _0x493f66)));
      }
      case "enum": {
        const _0x295d8 = Object["entries"](_0x534b8e["fill"]["colors"]);
        if (_0x295d8["length"] === 0) return b`<span class="legend-empty">Kategori bulunamadı.</span>`;
        const _0x23c4e8 = [..._0x295d8]["sort"](([_0x2ffffa], [_0x47cafa]) => compareCategoryKeys(_0x2ffffa, _0x47cafa));
        return this["_renderScrollableRows"](_0x23c4e8["map"](([_0x425da2, _0x3fe6fb]) => ({ "color": _0x3fe6fb, "label": _0x425da2 })));
      }
      case "solid":
      case "off":
      default:
        return b`<span class="legend-empty">Bu katman sabit renkli, lejant gerekmiyor.</span>`;
    }
  }
  ["_renderScrollableRows"](_0x5d90b3) {
    return b`
      <div class="legend-bin-wrap">
        <div class="legend-bin-list" @scroll=${() => this["_listScroll"]["sync"]()}>
          ${_0x5d90b3["map"]((_0x251527) => b`
              <div class="legend-bin-row">
                <span class="legend-swatch" style="background:${_0x251527["color"]}"></span>
                <span class="legend-value" title=${_0x251527["label"]}>${_0x251527["label"]}</span>
              </div>
            `)}
        </div>
        <div
          class="legend-scroll-thumb"
          @pointerdown=${(_0x4661aa) => this["_listScroll"]["startDrag"](_0x4661aa)}
        ></div>
      </div>
    `;
  }
  static ["_fitListToRows"](_0x56c31a) {
    if (!_0x56c31a) return;
    const _0x2b4aaf = _0x56c31a["querySelectorAll"](".legend-bin-row");
    if (_0x2b4aaf["length"] === 0) {
      _0x56c31a["style"]["maxHeight"] = "";
      return;
    }
    const _0xf1c131 = _0x2b4aaf[0]["getBoundingClientRect"]();
    if (_0x2b4aaf["length"] === 1) {
      _0x56c31a["style"]["maxHeight"] = _0xf1c131["height"] + "px";
      return;
    }
    const _0x58460a = _0x2b4aaf[1]["getBoundingClientRect"](), _0x1e12c5 = _0x58460a["top"] - _0xf1c131["top"];
    _0x56c31a["style"]["maxHeight"] = _0xf1c131["height"] + _0x1e12c5 * (TucbsLegendPanel["VISIBLE_LIST_ROWS"] - 1) + "px";
  }
};
TucbsLegendPanel["styles"] = i$5`
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
  `, TucbsLegendPanel["VISIBLE_LIST_ROWS"] = 10, __decorateClass$w([n$1()], TucbsLegendPanel["prototype"], "layerId", 2), __decorateClass$w([n$1()], TucbsLegendPanel["prototype"], "layerType", 2), __decorateClass$w([n$1({ "attribute": ![] })], TucbsLegendPanel["prototype"], "layerManager", 2), __decorateClass$w([n$1({ "type": Boolean, "reflect": !![] })], TucbsLegendPanel["prototype"], "open", 2), __decorateClass$w([n$1({ "attribute": "custom-css" })], TucbsLegendPanel["prototype"], "customCss", 2), __decorateClass$w([r()], TucbsLegendPanel["prototype"], "_legendUrl", 2), __decorateClass$w([r()], TucbsLegendPanel["prototype"], "_loading", 2), __decorateClass$w([r()], TucbsLegendPanel["prototype"], "_error", 2), __decorateClass$w([r()], TucbsLegendPanel["prototype"], "_vectorStyle", 2), __decorateClass$w([e$3(".legend-bin-list")], TucbsLegendPanel["prototype"], "_listEl", 2), __decorateClass$w([e$3(".legend-scroll-thumb")], TucbsLegendPanel["prototype"], "_thumbEl", 2), TucbsLegendPanel = __decorateClass$w([t$3("tucbs-legend-panel")], TucbsLegendPanel);
var __defProp$u = Object["defineProperty"], __getOwnPropDesc$v = Object["getOwnPropertyDescriptor"], __decorateClass$v = (_0x17a56b, _0x13bd54, _0x218bd6, _0x3a82a9) => {
  var _0x273a7c = _0x3a82a9 > 1 ? void 0 : _0x3a82a9 ? __getOwnPropDesc$v(_0x13bd54, _0x218bd6) : _0x13bd54;
  for (var _0x17c8d6 = _0x17a56b["length"] - 1, _0x361b2a; _0x17c8d6 >= 0; _0x17c8d6--) if (_0x361b2a = _0x17a56b[_0x17c8d6]) _0x273a7c = (_0x3a82a9 ? _0x361b2a(_0x13bd54, _0x218bd6, _0x273a7c) : _0x361b2a(_0x273a7c)) || _0x273a7c;
  if (_0x3a82a9 && _0x273a7c) __defProp$u(_0x13bd54, _0x218bd6, _0x273a7c);
  return _0x273a7c;
};
const ICON_CLOSE$5 = o$1(iconNodeToString(_16_default$v));
let TucbsSlideOverPanel = class extends i$2 {
  constructor() {
    super(...arguments), this["panelTitle"] = "", this["side"] = "right", this["open"] = ![], this["panelWidth"] = "360px", this["customCss"] = "", this["scrollBody"] = !![], this["_customCssState"] = { "sheet": null };
  }
  ["updated"](_0x5e9b85) {
    _0x5e9b85["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_customCssState"], "tucbs-slide-over-panel");
  }
  ["_close"]() {
    var _a2;
    (_a2 = this["onCloseRequest"]) == null ? void 0 : _a2.call(this);
  }
  ["render"]() {
    return b`
      <aside
        class="panel ${this["open"] ? "open" : ""}"
        style="width: ${this["panelWidth"]}"
        ?inert=${!this["open"]}
        aria-hidden=${this["open"] ? A : "true"}
      >
        <div class="panel-header">
          <div class="panel-title">
            <slot name="icon"></slot>
            <span>${this["panelTitle"]}</span>
          </div>
          <button type="button" class="panel-close-btn" aria-label="Kapat" @click=${this["_close"]}>
            ${ICON_CLOSE$5}
          </button>
        </div>
        <div class="panel-body" style="overflow-y: ${this["scrollBody"] ? "auto" : "visible"}">
          <slot></slot>
        </div>
      </aside>
    `;
  }
};
TucbsSlideOverPanel["styles"] = i$5`
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
  `, __decorateClass$v([n$1()], TucbsSlideOverPanel["prototype"], "panelTitle", 2), __decorateClass$v([n$1({ "reflect": !![] })], TucbsSlideOverPanel["prototype"], "side", 2), __decorateClass$v([n$1({ "type": Boolean, "reflect": !![] })], TucbsSlideOverPanel["prototype"], "open", 2), __decorateClass$v([n$1({ "attribute": "panel-width" })], TucbsSlideOverPanel["prototype"], "panelWidth", 2), __decorateClass$v([n$1({ "attribute": "custom-css" })], TucbsSlideOverPanel["prototype"], "customCss", 2), __decorateClass$v([n$1({ "type": Boolean, "attribute": "scroll-body" })], TucbsSlideOverPanel["prototype"], "scrollBody", 2), __decorateClass$v([n$1({ "attribute": ![] })], TucbsSlideOverPanel["prototype"], "onCloseRequest", 2), TucbsSlideOverPanel = __decorateClass$v([t$3("tucbs-slide-over-panel")], TucbsSlideOverPanel);
const TRANSITION_TIMING = "240ms cubic-bezier(0.2, 0, 0.38, 0.9)";
let sharedLeftWidth = null, sharedRightWidth = null;
const layoutTargets = /* @__PURE__ */ new Set(), openControllerBySide = { "left": null, "right": null };
function applyCombinedLayout() {
  const _0x3baa86 = [];
  if (sharedLeftWidth) _0x3baa86["push"](sharedLeftWidth);
  if (sharedRightWidth) _0x3baa86["push"](sharedRightWidth);
  const _0x279668 = _0x3baa86["length"] ? "calc(100% - " + _0x3baa86["join"](" - ") + ")" : "100%", _0x130fcb = sharedLeftWidth ?? "";
  for (const _0x992263 of layoutTargets) {
    _0x992263["style"]["width"] = _0x279668, _0x992263["style"]["marginLeft"] = _0x130fcb;
  }
}
class PanelLayoutController {
  constructor(_0x427989, _0xa8755e = "right") {
    this["hostForToolbarLookup"] = _0x427989, this["side"] = _0xa8755e, this["_mapContainer"] = null, this["_resizeObserver"] = null, this["_toolbarEl"] = null, this["_toolbarLookupDone"] = ![], this["_resizeRaf"] = null, this["onExclusiveClose"] = null, this["_timers"] = new TimerBag(_0x427989);
  }
  ["bindMap"](_0x34706b) {
    this["_map"] = _0x34706b;
    const _0xa0dc49 = _0x34706b["viewer"]["container"];
    this["_mapContainer"] = _0xa0dc49, _0xa0dc49["style"]["transition"] = "width " + TRANSITION_TIMING + ", margin-left " + TRANSITION_TIMING, layoutTargets["add"](_0xa0dc49);
    const _0x1c4c2f = document["querySelector"]("tucbs-info-bar");
    _0x1c4c2f && (_0x1c4c2f["style"]["transition"] = "width " + TRANSITION_TIMING + ", margin-left " + TRANSITION_TIMING, layoutTargets["add"](_0x1c4c2f)), this["_resizeObserver"] = new ResizeObserver(() => {
      if (this["_resizeRaf"] !== null) return;
      this["_resizeRaf"] = this["_timers"]["requestAnimationFrame"](() => {
        this["_resizeRaf"] = null, _0x34706b["resize"]();
      });
    }), this["_resizeObserver"]["observe"](_0xa0dc49), applyCombinedLayout();
  }
  ["unbindMap"](_0x10069f) {
    var _a2;
    (_a2 = this["_resizeObserver"]) == null ? void 0 : _a2["disconnect"](), this["_resizeObserver"] = null;
    this["_resizeRaf"] !== null && (this["_timers"]["cancelAnimationFrame"](this["_resizeRaf"]), this["_resizeRaf"] = null);
    if (openControllerBySide[this["side"]] === this) openControllerBySide[this["side"]] = null;
    if (this["side"] === "left") sharedLeftWidth = null;
    else sharedRightWidth = null;
    applyCombinedLayout();
    if (this["_mapContainer"]) this["_mapContainer"]["style"]["transition"] = "";
    this["_mapContainer"] = null, this["_map"] = void 0, _0x10069f["resize"]();
  }
  ["setOpen"](_0x129c5e, _0x5cf349) {
    var _a2;
    if (_0x129c5e) {
      const _0x44f1e9 = openControllerBySide[this["side"]];
      if (_0x44f1e9 && _0x44f1e9 !== this) (_a2 = _0x44f1e9["onExclusiveClose"]) == null ? void 0 : _a2.call(_0x44f1e9);
      openControllerBySide[this["side"]] = this;
    } else openControllerBySide[this["side"]] === this && (openControllerBySide[this["side"]] = null);
    if (this["side"] === "left") sharedLeftWidth = _0x129c5e ? _0x5cf349 : null;
    else sharedRightWidth = _0x129c5e ? _0x5cf349 : null;
    applyCombinedLayout(), this["_applyToolbarShift"](_0x129c5e, _0x5cf349);
  }
  ["_findToolbarHost"]() {
    const _0x270417 = this["hostForToolbarLookup"]["getRootNode"]();
    if (_0x270417 instanceof ShadowRoot && _0x270417["host"]["tagName"]["toLowerCase"]() === "tucbs-toolbar") return _0x270417["host"];
    return null;
  }
  ["_applyToolbarShift"](_0x29788e, _0x553bb4) {
    !this["_toolbarLookupDone"] && (this["_toolbarEl"] = this["_findToolbarHost"](), this["_toolbarLookupDone"] = !![]);
    const _0x53602c = this["_toolbarEl"];
    if (!_0x53602c) return;
    const _0x50b2ef = _0x53602c["position"], _0x52d04a = _0x50b2ef === "right-center" || _0x50b2ef === "top-right" || _0x50b2ef === "bottom-right";
    if (!_0x52d04a) return;
    _0x53602c["style"]["transition"] = "translate " + TRANSITION_TIMING, _0x53602c["style"]["translate"] = _0x29788e ? "calc(-1 * " + _0x553bb4 + ")" : "";
  }
}
class PortalHost {
  constructor(_0x25d314, _0x2cb03c, _0x1a73e8, _0x656f35) {
    this["tag"] = _0x25d314, this["sync"] = _0x2cb03c, this["closeEvent"] = _0x1a73e8, this["onClose"] = _0x656f35, this["el"] = null;
  }
  get ["element"]() {
    return this["el"];
  }
  ["ensure"]() {
    if (this["el"]) return;
    const _0x11b35c = document["createElement"](this["tag"]);
    _0x11b35c["setAttribute"]("data-tucbs-portal", ""), this["closeEvent"] && this["onClose"] && _0x11b35c["addEventListener"](this["closeEvent"], this["onClose"]), document["body"]["appendChild"](_0x11b35c), this["el"] = _0x11b35c, this["sync"](_0x11b35c);
  }
  ["update"]() {
    if (this["el"]) this["sync"](this["el"]);
  }
  ["dispose"]() {
    var _a2;
    (_a2 = this["el"]) == null ? void 0 : _a2["remove"](), this["el"] = null;
  }
}
class DragReorder {
  constructor(_0x4c8c7b) {
    this["onReorder"] = _0x4c8c7b, this["state"] = null;
  }
  ["start"](_0x4d0387, _0x446b28, _0x532bc3, _0x33e380) {
    if (_0x4d0387["button"] !== 0 || this["state"]) return;
    _0x4d0387["preventDefault"](), _0x532bc3["setPointerCapture"](_0x4d0387["pointerId"]);
    const _0x203bbb = _0x446b28["getBoundingClientRect"](), _0x3998d8 = document["createElement"]("div");
    _0x3998d8["className"] = "layer-placeholder", _0x3998d8["style"]["height"] = _0x203bbb["height"] + "px", _0x446b28["after"](_0x3998d8), _0x446b28["classList"]["add"]("layer-item--dragging"), _0x446b28["style"]["left"] = _0x203bbb["left"] + "px", _0x446b28["style"]["top"] = _0x203bbb["top"] + "px", _0x446b28["style"]["width"] = _0x203bbb["width"] + "px";
    const _0x5a5239 = { "handle": _0x532bc3, "item": _0x446b28, "list": _0x33e380, "placeholder": _0x3998d8, "pointerId": _0x4d0387["pointerId"], "offsetY": _0x4d0387["clientY"] - _0x203bbb["top"], "onMove": (_0xcf395b) => this["move"](_0xcf395b), "onEnd": (_0x2a31c4) => this["end"](_0x2a31c4) };
    window["addEventListener"]("pointermove", _0x5a5239["onMove"]), window["addEventListener"]("pointerup", _0x5a5239["onEnd"]), window["addEventListener"]("pointercancel", _0x5a5239["onEnd"]), this["state"] = _0x5a5239;
  }
  ["move"](_0x4c53b3) {
    const _0x57ca4b = this["state"];
    if (!_0x57ca4b || _0x4c53b3["pointerId"] !== _0x57ca4b["pointerId"]) return;
    _0x4c53b3["preventDefault"](), _0x57ca4b["item"]["style"]["top"] = _0x4c53b3["clientY"] - _0x57ca4b["offsetY"] + "px", this["movePlaceholder"](_0x4c53b3["clientY"]);
  }
  ["movePlaceholder"](_0x369145) {
    const _0xdf7bda = this["state"];
    if (!_0xdf7bda) return;
    const _0xb1db87 = [..._0xdf7bda["list"]["querySelectorAll"](".layer-item[data-layer-id]")]["filter"]((_0x5a626c) => _0x5a626c !== _0xdf7bda["item"]), _0x2c166b = _0xb1db87["find"]((_0x2376de) => {
      const _0x41aacb = _0x2376de["getBoundingClientRect"]();
      return _0x369145 < _0x41aacb["top"] + _0x41aacb["height"] / 2;
    });
    _0xdf7bda["list"]["insertBefore"](_0xdf7bda["placeholder"], _0x2c166b ?? null);
  }
  ["end"](_0x303160) {
    var _a2;
    const _0x3fc734 = this["state"];
    if (!_0x3fc734 || _0x303160["pointerId"] !== _0x3fc734["pointerId"]) return;
    window["removeEventListener"]("pointermove", _0x3fc734["onMove"]), window["removeEventListener"]("pointerup", _0x3fc734["onEnd"]), window["removeEventListener"]("pointercancel", _0x3fc734["onEnd"]);
    _0x3fc734["handle"]["hasPointerCapture"](_0x303160["pointerId"]) && _0x3fc734["handle"]["releasePointerCapture"](_0x303160["pointerId"]);
    const _0x23e646 = _0x3fc734["item"]["dataset"]["layerId"], _0x48d1f9 = (_a2 = _0x3fc734["placeholder"]["nextElementSibling"]) == null ? void 0 : _a2["dataset"]["layerId"];
    _0x3fc734["placeholder"]["remove"](), _0x3fc734["item"]["classList"]["remove"]("layer-item--dragging"), _0x3fc734["item"]["removeAttribute"]("style"), this["state"] = null, this["onReorder"](_0x23e646, _0x48d1f9);
  }
  ["dispose"]() {
    if (!this["state"]) return;
    window["removeEventListener"]("pointermove", this["state"]["onMove"]), window["removeEventListener"]("pointerup", this["state"]["onEnd"]), window["removeEventListener"]("pointercancel", this["state"]["onEnd"]), this["state"] = null;
  }
}
class MarkerWatcher {
  constructor(_0x5c4a6e, _0x5323fb, _0x692602) {
    this["host"] = _0x5c4a6e, this["tagName"] = _0x5323fb, this["onChange"] = _0x692602, this["observer"] = null, this["current"] = null;
  }
  ["start"]() {
    const _0x51debf = this["host"]["getRootNode"]();
    this["evaluate"](_0x51debf), this["observer"] = new MutationObserver(() => this["evaluate"](_0x51debf)), this["observer"]["observe"](_0x51debf, { "childList": !![], "subtree": !![] });
  }
  ["evaluate"](_0x59bd98) {
    const _0x321454 = _0x59bd98["querySelector"](this["tagName"] + ":not([data-tucbs-portal])");
    _0x321454 !== this["current"] && (this["current"] = _0x321454, this["onChange"](_0x321454));
  }
  ["dispose"]() {
    var _a2;
    (_a2 = this["observer"]) == null ? void 0 : _a2["disconnect"](), this["observer"] = null, this["current"] = null;
  }
}
function carbonIcon$3(_0x302df5) {
  return o$1(iconNodeToString(_0x302df5));
}
const ICON_ZOOM_IN$2 = carbonIcon$3(_16_default$1), ICON_UP_TO_TOP = carbonIcon$3(_16_default$5), ICON_TRASH_CAN$1 = carbonIcon$3(_16_default$6), ICON_PALETTE = carbonIcon$3(_16_default$t), ICON_LEGEND = carbonIcon$3(_16_default$k), ICON_DOCUMENT_EXPORT = carbonIcon$3(_16_default$r);
function buildLayerMenuActions(_0x3f45fd, _0x35d342, _0x5b5c21) {
  const _0x179729 = [{ "icon": ICON_ZOOM_IN$2, "label": "Yakınlaş", "onClick": _0x5b5c21["zoomToLayer"] }, { "icon": ICON_UP_TO_TOP, "label": "En Üste Taşı", "onClick": _0x5b5c21["bringToFront"] }, { "icon": ICON_TRASH_CAN$1, "label": "Kaldır", "onClick": _0x5b5c21["remove"] }];
  return _0x35d342["styleEditorAvailable"] && _0x179729["push"]({ "icon": ICON_PALETTE, "label": "Stil Düzenle", "onClick": _0x5b5c21["openStyleEditor"] }), _0x35d342["legendAvailable"] && _0x3f45fd["styleMode"] !== "solid" && _0x3f45fd["layerType"] !== "DRAWING" && _0x3f45fd["layerType"] !== "MEASURE" && _0x179729["push"]({ "icon": ICON_LEGEND, "label": "Lejant", "onClick": _0x5b5c21["toggleLegend"] }), _0x35d342["layerExportAvailable"] && _0x3f45fd["layerType"] === "DRAWING" && _0x179729["push"]({ "icon": ICON_DOCUMENT_EXPORT, "label": "GeoJSON Olarak Dışa Aktar", "onClick": _0x5b5c21["exportLayer"] }), _0x35d342["layerExportAvailable"] && _0x35d342["isAnalysisResult"] && _0x179729["push"]({ "icon": ICON_DOCUMENT_EXPORT, "label": "Dışa Aktar", "onClick": () => void 0, "children": [{ "icon": ICON_DOCUMENT_EXPORT, "label": "GeoJSON", "onClick": _0x5b5c21["exportLayer"] }, { "icon": ICON_DOCUMENT_EXPORT, "label": "KML", "onClick": _0x5b5c21["exportLayerKml"] }, { "icon": ICON_DOCUMENT_EXPORT, "label": "Shapefile (ZIP)", "onClick": _0x5b5c21["exportLayerShapefile"] }] }), _0x35d342["layerExportAvailable"] && (_0x3f45fd["layerType"] === "WMS" || _0x3f45fd["layerType"] === "WCS") && _0x35d342["isGeoTiffExportAvailable"] && _0x179729["push"]({ "icon": ICON_DOCUMENT_EXPORT, "label": "GeoTIFF Olarak Dışa Aktar", "onClick": _0x5b5c21["exportLayerAsGeoTiff"] }), _0x179729;
}
class ExclusiveOverlayCoordinator {
  constructor() {
    this["closers"] = /* @__PURE__ */ new Map();
  }
  ["register"](_0x44ecb3, _0x53b4e4) {
    this["closers"]["set"](_0x44ecb3, _0x53b4e4);
  }
  ["closeOthers"](_0xbb8083) {
    for (const [_0x1c7c85, _0x109fd4] of this["closers"]) {
      if (_0x1c7c85 !== _0xbb8083) _0x109fd4();
    }
  }
}
var __defProp$t = Object["defineProperty"], __getOwnPropDesc$u = Object["getOwnPropertyDescriptor"], __decorateClass$u = (_0xf7964b, _0x79e76d, _0xe227a9, _0x3c046e) => {
  var _0x1a3bb8 = _0x3c046e > 1 ? void 0 : _0x3c046e ? __getOwnPropDesc$u(_0x79e76d, _0xe227a9) : _0x79e76d;
  for (var _0xd6a537 = _0xf7964b["length"] - 1, _0x2e7db1; _0xd6a537 >= 0; _0xd6a537--) if (_0x2e7db1 = _0xf7964b[_0xd6a537]) _0x1a3bb8 = (_0x3c046e ? _0x2e7db1(_0x79e76d, _0xe227a9, _0x1a3bb8) : _0x2e7db1(_0x1a3bb8)) || _0x1a3bb8;
  if (_0x3c046e && _0x1a3bb8) __defProp$t(_0x79e76d, _0xe227a9, _0x1a3bb8);
  return _0x1a3bb8;
};
let TucbsLayerMenuPortal = class extends i$2 {
  constructor() {
    super(...arguments), this["open"] = ![], this["actions"] = [], this["x"] = 0, this["y"] = 0;
  }
  ["updated"](_0x268535) {
    (_0x268535["has"]("x") || _0x268535["has"]("y")) && (this["style"]["transform"] = "translate(" + this["x"] + "px, " + this["y"] + "px)");
  }
  ["render"]() {
    return b`
      <div class="layer-menu" role="menu">
        ${this["actions"]["map"]((_0x3c3353) => {
      var _a2;
      return ((_a2 = _0x3c3353["children"]) == null ? void 0 : _a2["length"]) ? b`
                <div class="layer-menu-branch">
                  <button type="button" class="layer-menu-item" role="menuitem" aria-haspopup="true">
                    ${_0x3c3353["icon"]}<span>${_0x3c3353["label"]}</span><span class="chevron">›</span>
                  </button>
                  <div class="layer-submenu" role="menu">
                    ${_0x3c3353["children"]["map"]((_0x32e8e7) => b`
                        <button
                          type="button"
                          class="layer-menu-item"
                          role="menuitem"
                          @click=${_0x32e8e7["onClick"]}
                        >
                          ${_0x32e8e7["icon"]}<span>${_0x32e8e7["label"]}</span>
                        </button>
                      `)}
                  </div>
                </div>
              ` : b`
                <button
                  type="button"
                  class="layer-menu-item"
                  role="menuitem"
                  @click=${_0x3c3353["onClick"]}
                >
                  ${_0x3c3353["icon"]}<span>${_0x3c3353["label"]}</span>
                </button>
              `;
    })}
      </div>
    `;
  }
};
TucbsLayerMenuPortal["styles"] = i$5`
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
  `, __decorateClass$u([n$1({ "type": Boolean, "reflect": !![] })], TucbsLayerMenuPortal["prototype"], "open", 2), __decorateClass$u([n$1({ "attribute": ![] })], TucbsLayerMenuPortal["prototype"], "actions", 2), __decorateClass$u([n$1({ "type": Number })], TucbsLayerMenuPortal["prototype"], "x", 2), __decorateClass$u([n$1({ "type": Number })], TucbsLayerMenuPortal["prototype"], "y", 2), TucbsLayerMenuPortal = __decorateClass$u([t$3("tucbs-layer-menu-portal")], TucbsLayerMenuPortal);
var __defProp$s = Object["defineProperty"], __getOwnPropDesc$t = Object["getOwnPropertyDescriptor"], __decorateClass$t = (_0x248441, _0x3e82b1, _0x340c48, _0x3af0a0) => {
  var _0x3a5bbb = _0x3af0a0 > 1 ? void 0 : _0x3af0a0 ? __getOwnPropDesc$t(_0x3e82b1, _0x340c48) : _0x3e82b1;
  for (var _0x29ade5 = _0x248441["length"] - 1, _0x283ef6; _0x29ade5 >= 0; _0x29ade5--) if (_0x283ef6 = _0x248441[_0x29ade5]) _0x3a5bbb = (_0x3af0a0 ? _0x283ef6(_0x3e82b1, _0x340c48, _0x3a5bbb) : _0x283ef6(_0x3a5bbb)) || _0x3a5bbb;
  if (_0x3af0a0 && _0x3a5bbb) __defProp$s(_0x3e82b1, _0x340c48, _0x3a5bbb);
  return _0x3a5bbb;
};
let TucbsTooltipPortal = class extends i$2 {
  constructor() {
    super(...arguments), this["open"] = ![], this["text"] = "", this["x"] = 0, this["y"] = 0;
  }
  ["updated"](_0x23e289) {
    (_0x23e289["has"]("x") || _0x23e289["has"]("y")) && (this["style"]["transform"] = "translate(" + this["x"] + "px, " + this["y"] + "px)");
  }
  ["render"]() {
    return b`<div class="tooltip">${this["text"]}</div>`;
  }
};
TucbsTooltipPortal["styles"] = i$5`
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
  `, __decorateClass$t([n$1({ "type": Boolean, "reflect": !![] })], TucbsTooltipPortal["prototype"], "open", 2), __decorateClass$t([n$1()], TucbsTooltipPortal["prototype"], "text", 2), __decorateClass$t([n$1({ "type": Number })], TucbsTooltipPortal["prototype"], "x", 2), __decorateClass$t([n$1({ "type": Number })], TucbsTooltipPortal["prototype"], "y", 2), TucbsTooltipPortal = __decorateClass$t([t$3("tucbs-tooltip-portal")], TucbsTooltipPortal);
function whenTucbsMapReady(_0x5bbe57, _0x53a0d3) {
  const _0x16f4bc = _0x5bbe57["apiKeyAuthState"] ?? "none";
  if (_0x16f4bc === "failed") return;
  if (_0x16f4bc === "ok" || _0x16f4bc === "none" && _0x5bbe57["map"]) {
    _0x53a0d3(_0x5bbe57);
    return;
  }
  const _0x51597d = () => _0x53a0d3(_0x5bbe57);
  _0x5bbe57["addEventListener"]("ready", _0x51597d, { "once": !![] }), _0x5bbe57["addEventListener"]("error", () => _0x5bbe57["removeEventListener"]("ready", _0x51597d), { "once": !![] });
}
function standardMapBindingMessages(_0x3ad12b, _0x518e78) {
  return { "noIdMessage": "[" + _0x3ad12b + '] "mapElementId" verilmedi ve "map" programatik olarak atanmadi; bilesen haritaya baglanamadigi icin ' + _0x518e78 + " kalacak.", "missingElementMessage": (_0x5ccf8b) => "[" + _0x3ad12b + '] mapElementId="' + _0x5ccf8b + '" ile eslesen bir element bulunamadi; bilesen haritaya baglanamadigi icin ' + _0x518e78 + " kalacak." };
}
function bindMapByElementId(_0x97d9d3, _0x236ae3) {
  if (_0x97d9d3["map"]) return;
  if (!_0x97d9d3["mapElementId"]) {
    if (_0x236ae3["noIdTiming"] === "sync") {
      console["warn"](_0x236ae3["noIdMessage"]);
      return;
    }
    requestAnimationFrame(() => {
      if (_0x97d9d3["map"]) return;
      console["warn"](_0x236ae3["noIdMessage"]);
    });
    return;
  }
  const _0x272fb6 = document["getElementById"](_0x97d9d3["mapElementId"]);
  if (!_0x272fb6) {
    console["warn"](_0x236ae3["missingElementMessage"](_0x97d9d3["mapElementId"]));
    return;
  }
  _0x272fb6["map"] ? _0x97d9d3["map"] = _0x272fb6["map"] : _0x272fb6["addEventListener"]("ready", () => {
    if (_0x272fb6["map"]) _0x97d9d3["map"] = _0x272fb6["map"];
  }, { "once": !![] });
}
const TOOLTIP_BASE = i$5`
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
`, leftTooltipStyles = [TOOLTIP_BASE, i$5`
    [data-tooltip]::after {
      top: 50%;
      right: calc(100% + 0.5rem);
      transform: translateY(-50%);
    }
  `], bottomRightTooltipStyles = [TOOLTIP_BASE, i$5`
    [data-tooltip]::after {
      top: calc(100% + 0.375rem);
      left: 0;
    }
  `];
[TOOLTIP_BASE, i$5`
    [data-tooltip]::after {
      top: calc(100% + 0.5rem);
      left: 50%;
      transform: translateX(-50%);
    }
  `];
const layerListStyles = i$5`
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

  /* GeoTIFF export tetiklendiginde (bkz _geoTiffExportingId) gercek bir ag
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
var __defProp$r = Object["defineProperty"], __getOwnPropDesc$s = Object["getOwnPropertyDescriptor"], __typeError$2 = (_0x218a86) => {
  throw TypeError(_0x218a86);
}, __decorateClass$s = (_0x3e767e, _0x2113a8, _0x1dade9, _0xd16181) => {
  var _0x9443cf = _0xd16181 > 1 ? void 0 : _0xd16181 ? __getOwnPropDesc$s(_0x2113a8, _0x1dade9) : _0x2113a8;
  for (var _0x555ef5 = _0x3e767e["length"] - 1, _0x19115a; _0x555ef5 >= 0; _0x555ef5--) if (_0x19115a = _0x3e767e[_0x555ef5]) _0x9443cf = (_0xd16181 ? _0x19115a(_0x2113a8, _0x1dade9, _0x9443cf) : _0x19115a(_0x9443cf)) || _0x9443cf;
  if (_0xd16181 && _0x9443cf) __defProp$r(_0x2113a8, _0x1dade9, _0x9443cf);
  return _0x9443cf;
}, __accessCheck$2 = (_0x19f6b3, _0x4aff97, _0x2f1cda) => _0x4aff97["has"](_0x19f6b3) || __typeError$2("Cannot " + _0x2f1cda), __privateGet$2 = (_0x2df221, _0x298d95, _0x57e108) => (__accessCheck$2(_0x2df221, _0x298d95, "read from private field"), _0x57e108 ? _0x57e108["call"](_0x2df221) : _0x298d95["get"](_0x2df221)), __privateAdd$2 = (_0x18e047, _0x3fa83a, _0x1e2eb) => _0x3fa83a["has"](_0x18e047) ? __typeError$2("Cannot add the same private member more than once") : _0x3fa83a instanceof WeakSet ? _0x3fa83a["add"](_0x18e047) : _0x3fa83a["set"](_0x18e047, _0x1e2eb), _apiKeyState$1;
const NEUTRAL_LAYER_COLOR = "#9e9e9e";
function carbonIcon$2(_0xf5fa32) {
  return o$1(iconNodeToString(_0xf5fa32));
}
const ICON_DOCUMENT_BLANK = carbonIcon$2(_20_default$2), ICON_CLOUD_DOWNLOAD$1 = carbonIcon$2(_20_default$4), ICON_CHEVRON_RIGHT$1 = carbonIcon$2(_16_default$x), ICON_OVERFLOW_MENU = carbonIcon$2(_16_default$f), ICON_DRAG_HANDLE = carbonIcon$2(_16_default$o), ICON_API_KEY$1 = carbonIcon$2(_20_default$5), ICON_LAYERS = carbonIcon$2(_16_default$l);
let TucbsLayerList = class extends i$2 {
  constructor() {
    super(...arguments), this["mapElementId"] = "", __privateAdd$2(this, _apiKeyState$1, new WriteOnlyApiKey(this)), this["panelWidth"] = "360px", this["collapsible"] = !![], this["customCss"] = "", this["_open"] = ![], this["_layers"] = [], this["_openMenuId"] = null, this["_geoTiffExportingId"] = null, this["_uploadOpen"] = ![], this["_fileUploadAvailable"] = ![], this["_serviceUploadOpen"] = ![], this["_serviceUploadAvailable"] = ![], this["_styleEditorAvailable"] = ![], this["_legendAvailable"] = ![], this["_layerExportAvailable"] = ![], this["_legendOpenIds"] = /* @__PURE__ */ new Set(), this["_authorizedLayersAvailable"] = ![], this["_authorizedLayersFetching"] = ![], this["_hasApiKey"] = ![], this["_fileUploadMarker"] = null, this["_serviceUploadMarker"] = null, this["_styleEditorMarker"] = null, this["_legendMarker"] = null, this["_layerExportMarker"] = null, this["_authorizedLayersMarker"] = null, this["_fileUploadPortal"] = new PortalHost("tucbs-file-upload", (_0x51da24) => {
      var _a2;
      _0x51da24["open"] = this["_uploadOpen"], _0x51da24["layerManager"] = this["layerManager"], _0x51da24["customCss"] = ((_a2 = this["_fileUploadMarker"]) == null ? void 0 : _a2["customCss"]) ?? "";
    }, "tucbs-file-upload-closed", () => this["_closeUpload"]()), this["_serviceUploadPortal"] = new PortalHost("tucbs-service-upload", (_0xd0d89d) => {
      var _a2;
      _0xd0d89d["open"] = this["_serviceUploadOpen"], _0xd0d89d["layerManager"] = this["layerManager"], _0xd0d89d["customCss"] = ((_a2 = this["_serviceUploadMarker"]) == null ? void 0 : _a2["customCss"]) ?? "", _0xd0d89d["apiKey"] = __privateGet$2(this, _apiKeyState$1)["real"];
    }, "tucbs-service-upload-closed", () => this["_closeServiceUpload"]()), this["_styleEditorPortal"] = new PortalHost("tucbs-style-editor", (_0x4e823d) => {
      var _a2;
      _0x4e823d["layerManager"] = this["layerManager"], _0x4e823d["customCss"] = ((_a2 = this["_styleEditorMarker"]) == null ? void 0 : _a2["customCss"]) ?? "";
    }), this["_authorizedLayersPortal"] = new PortalHost("tucbs-authorized-layers", (_0x3f16e6) => {
      var _a2;
      _0x3f16e6["layerManager"] = this["layerManager"], _0x3f16e6["customCss"] = ((_a2 = this["_authorizedLayersMarker"]) == null ? void 0 : _a2["customCss"]) ?? "";
    }), this["_fileUploadWatcher"] = new MarkerWatcher(this, "tucbs-file-upload", (_0x19c148) => {
      this["_fileUploadMarker"] = _0x19c148, this["_fileUploadAvailable"] = _0x19c148 !== null;
      if (_0x19c148) this["_fileUploadPortal"]["ensure"]();
      else this["_fileUploadPortal"]["dispose"]();
    }), this["_serviceUploadWatcher"] = new MarkerWatcher(this, "tucbs-service-upload", (_0xc80a21) => {
      this["_serviceUploadMarker"] = _0xc80a21, this["_serviceUploadAvailable"] = _0xc80a21 !== null;
      if (_0xc80a21) this["_serviceUploadPortal"]["ensure"]();
      else this["_serviceUploadPortal"]["dispose"]();
    }), this["_styleEditorWatcher"] = new MarkerWatcher(this, "tucbs-style-editor", (_0x33fae3) => {
      this["_styleEditorMarker"] = _0x33fae3, this["_styleEditorAvailable"] = _0x33fae3 !== null;
      if (_0x33fae3) this["_styleEditorPortal"]["ensure"]();
      else this["_styleEditorPortal"]["dispose"]();
    }), this["_legendWatcher"] = new MarkerWatcher(this, "tucbs-legend-panel", (_0x1158dc) => {
      this["_legendMarker"] = _0x1158dc, this["_legendAvailable"] = _0x1158dc !== null;
    }), this["_layerExportWatcher"] = new MarkerWatcher(this, "tucbs-layer-export", (_0x22291c) => {
      this["_layerExportMarker"] = _0x22291c, this["_layerExportAvailable"] = _0x22291c !== null;
    }), this["_authorizedLayersWatcher"] = new MarkerWatcher(this, "tucbs-authorized-layers", (_0x380e3d) => {
      this["_authorizedLayersMarker"] = _0x380e3d, this["_authorizedLayersAvailable"] = _0x380e3d !== null;
      if (_0x380e3d) this["_authorizedLayersPortal"]["ensure"]();
      else this["_authorizedLayersPortal"]["dispose"]();
    }), this["_menuPortalEl"] = null, this["_tooltipPortalEl"] = null, this["_colorById"] = /* @__PURE__ */ new Map(), this["_opacityById"] = /* @__PURE__ */ new Map(), this["_dragReorder"] = new DragReorder((_0x70f43, _0x10a190) => this["_applyReorder"](_0x70f43, _0x10a190)), this["_overlayCoordinator"] = new ExclusiveOverlayCoordinator(), this["_customCssState"] = { "sheet": null }, this["_layoutController"] = new PanelLayoutController(this, "left"), this["_opacityRaf"] = /* @__PURE__ */ new Map(), this["_timers"] = new TimerBag(this), this["_onDocumentPointerDown"] = (_0xadcc62) => {
      const _0x41a281 = _0xadcc62["composedPath"](), _0x5912cd = _0x41a281["some"]((_0x3594d1) => _0x3594d1 instanceof HTMLElement && _0x3594d1["classList"]["contains"]("layer-options") || _0x3594d1 === this["_menuPortalEl"]);
      if (!_0x5912cd) this["_closeMenu"]();
    }, this["_onDocumentKeyDown"] = (_0x1194ce) => {
      if (_0x1194ce["key"] === "Escape") this["_closeMenu"]();
    }, this["_onWindowScrollOrResize"] = () => {
      if (this["_openMenuId"]) this["_closeMenu"]();
      this["_hidePortalTooltip"]();
    }, this["_onLayerAdd"] = () => this["_syncFromLayerManager"](), this["_onLayerRemove"] = () => this["_syncFromLayerManager"](), this["_onLayerReorder"] = () => this["_syncFromLayerManager"](), this["_onLayerVisibility"] = (_0x1dc30b) => {
      this["_layers"] = this["_layers"]["map"]((_0x31aaa1) => _0x31aaa1["id"] === _0x1dc30b["id"] ? { ..._0x31aaa1, "visible": _0x1dc30b["visible"] } : _0x31aaa1);
    }, this["_onLayerOpacity"] = (_0x15293d) => {
      this["_opacityById"]["set"](_0x15293d["id"], _0x15293d["opacity"]), this["_layers"] = this["_layers"]["map"]((_0x4eaedf) => _0x4eaedf["id"] === _0x15293d["id"] ? { ..._0x4eaedf, "opacity": _0x15293d["opacity"] } : _0x4eaedf);
    }, this["_onLayerStyle"] = (_0x1fb5a7) => {
      const { fill: _0x1c88d7 } = _0x1fb5a7["style"], _0x50eaf1 = _0x1c88d7["mode"] === "solid" ? _0x1c88d7["color"] : NEUTRAL_LAYER_COLOR;
      if (_0x1c88d7["mode"] !== "off") this["_opacityById"]["set"](_0x1fb5a7["id"], _0x1c88d7["opacity"]);
      this["_layers"] = this["_layers"]["map"]((_0xeabc95) => _0xeabc95["id"] === _0x1fb5a7["id"] ? { ..._0xeabc95, "fill": _0x50eaf1, "styleMode": _0x1c88d7["mode"], "opacity": _0x1c88d7["mode"] !== "off" ? _0x1c88d7["opacity"] : _0xeabc95["opacity"] } : _0xeabc95);
    }, this["_onApiKeyChange"] = (_0x4be360) => {
      this["_hasApiKey"] = _0x4be360["hasApiKey"];
    };
  }
  set ["apiKey"](_0x38ccb0) {
    __privateGet$2(this, _apiKeyState$1)["write"](_0x38ccb0);
  }
  get ["apiKey"]() {
    return __privateGet$2(this, _apiKeyState$1)["masked"];
  }
  ["_showPortalTooltip"](_0x1320d4, _0x1247e6) {
    if (!this["_tooltipPortalEl"]) return;
    const _0x1e65a0 = _0x1320d4["getBoundingClientRect"]();
    this["_tooltipPortalEl"]["text"] = _0x1247e6, this["_tooltipPortalEl"]["x"] = _0x1e65a0["left"], this["_tooltipPortalEl"]["y"] = _0x1e65a0["bottom"] + 6, this["_tooltipPortalEl"]["open"] = !![];
  }
  ["_hidePortalTooltip"]() {
    if (this["_tooltipPortalEl"]) this["_tooltipPortalEl"]["open"] = ![];
  }
  ["connectedCallback"]() {
    super["connectedCallback"](), document["addEventListener"]("pointerdown", this["_onDocumentPointerDown"]), document["addEventListener"]("keydown", this["_onDocumentKeyDown"]), window["addEventListener"]("scroll", this["_onWindowScrollOrResize"], !![]), window["addEventListener"]("resize", this["_onWindowScrollOrResize"]), this["_menuPortalEl"] = document["createElement"]("tucbs-layer-menu-portal"), document["body"]["appendChild"](this["_menuPortalEl"]), this["_tooltipPortalEl"] = document["createElement"]("tucbs-tooltip-portal"), document["body"]["appendChild"](this["_tooltipPortalEl"]), this["_overlayCoordinator"]["register"]("upload", () => {
      this["_uploadOpen"] = ![];
    }), this["_overlayCoordinator"]["register"]("serviceUpload", () => {
      this["_serviceUploadOpen"] = ![];
    }), this["_overlayCoordinator"]["register"]("styleEditor", () => this["_closeStyleEditorIfOpen"]()), this["_overlayCoordinator"]["register"]("authorizedLayers", () => this["_closeAuthorizedLayersIfOpen"]()), this["_fileUploadWatcher"]["start"](), this["_serviceUploadWatcher"]["start"](), this["_styleEditorWatcher"]["start"](), this["_legendWatcher"]["start"](), this["_layerExportWatcher"]["start"](), this["_authorizedLayersWatcher"]["start"]();
  }
  ["disconnectedCallback"]() {
    var _a2, _b;
    document["removeEventListener"]("pointerdown", this["_onDocumentPointerDown"]), document["removeEventListener"]("keydown", this["_onDocumentKeyDown"]), window["removeEventListener"]("scroll", this["_onWindowScrollOrResize"], !![]), window["removeEventListener"]("resize", this["_onWindowScrollOrResize"]);
    if (this["layerManager"]) this["_unbindLayerManager"](this["layerManager"]);
    if (this["map"]) this["_layoutController"]["unbindMap"](this["map"]);
    this["_fileUploadPortal"]["dispose"](), this["_serviceUploadPortal"]["dispose"](), this["_styleEditorPortal"]["dispose"](), this["_authorizedLayersPortal"]["dispose"](), this["_fileUploadWatcher"]["dispose"](), this["_serviceUploadWatcher"]["dispose"](), this["_styleEditorWatcher"]["dispose"](), this["_legendWatcher"]["dispose"](), this["_layerExportWatcher"]["dispose"](), this["_authorizedLayersWatcher"]["dispose"](), (_a2 = this["_menuPortalEl"]) == null ? void 0 : _a2["remove"](), this["_menuPortalEl"] = null, (_b = this["_tooltipPortalEl"]) == null ? void 0 : _b["remove"](), this["_tooltipPortalEl"] = null, this["_opacityRaf"]["clear"](), this["_dragReorder"]["dispose"](), super["disconnectedCallback"]();
  }
  ["firstUpdated"]() {
    if (this["layerManager"]) return;
    if (!this["mapElementId"]) {
      this["_timers"]["requestAnimationFrame"](() => {
        if (this["layerManager"]) return;
        console["warn"]('[tucbs-layer-list] "mapElementId" verilmedi ve "layerManager" programatik olarak atanmadi; bilesen haritaya baglanamadigi icin gizli kalacak.');
      });
      return;
    }
    const _0x5be113 = document["getElementById"](this["mapElementId"]);
    if (!_0x5be113) {
      console["warn"]('[tucbs-layer-list] mapElementId="' + this["mapElementId"] + '" ile eslesen bir element bulunamadi; bilesen haritaya baglanamadigi icin gizli kalacak.');
      return;
    }
    whenTucbsMapReady(_0x5be113, (_0x187ee1) => {
      var _a2;
      _0x187ee1["layerManager"] && (this["layerManager"] = _0x187ee1["layerManager"]), _0x187ee1["map"] && (this["map"] = _0x187ee1["map"]), (_a2 = _0x187ee1["_grantApiKeyTo"]) == null ? void 0 : _a2.call(_0x187ee1, this);
    });
  }
  ["updated"](_0x2525e9) {
    _0x2525e9["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_customCssState"], "tucbs-layer-list");
    if (_0x2525e9["has"]("map")) {
      const _0x1a2b65 = _0x2525e9["get"]("map");
      if (_0x1a2b65) this["_layoutController"]["unbindMap"](_0x1a2b65);
      if (this["map"]) this["_layoutController"]["bindMap"](this["map"]);
    }
    if (_0x2525e9["has"]("layerManager")) {
      const _0x4a77b2 = _0x2525e9["get"]("layerManager");
      if (_0x4a77b2) this["_unbindLayerManager"](_0x4a77b2);
      if (this["layerManager"]) this["_bindLayerManager"](this["layerManager"]);
      else this["_hasApiKey"] = ![];
    }
    this["_fileUploadPortal"]["update"](), this["_serviceUploadPortal"]["update"](), this["_styleEditorPortal"]["update"](), this["_authorizedLayersPortal"]["update"]();
  }
  ["_bindLayerManager"](_0x39bed0) {
    _0x39bed0["on"]("layer:add", this["_onLayerAdd"]), _0x39bed0["on"]("layer:remove", this["_onLayerRemove"]), _0x39bed0["on"]("layer:reorder", this["_onLayerReorder"]), _0x39bed0["on"]("layer:visibility", this["_onLayerVisibility"]), _0x39bed0["on"]("layer:opacity", this["_onLayerOpacity"]), _0x39bed0["on"]("layer:style", this["_onLayerStyle"]), _0x39bed0["on"]("apiKey:change", this["_onApiKeyChange"]), this["_hasApiKey"] = _0x39bed0["hasApiKey"], this["_syncFromLayerManager"]();
  }
  ["_unbindLayerManager"](_0x1b625a) {
    _0x1b625a["off"]("layer:add", this["_onLayerAdd"]), _0x1b625a["off"]("layer:remove", this["_onLayerRemove"]), _0x1b625a["off"]("layer:reorder", this["_onLayerReorder"]), _0x1b625a["off"]("layer:visibility", this["_onLayerVisibility"]), _0x1b625a["off"]("layer:opacity", this["_onLayerOpacity"]), _0x1b625a["off"]("layer:style", this["_onLayerStyle"]), _0x1b625a["off"]("apiKey:change", this["_onApiKeyChange"]);
  }
  ["_syncFromLayerManager"]() {
    if (!this["layerManager"]) {
      this["_layers"] = [];
      return;
    }
    this["_layers"] = this["layerManager"]["getLayers"]()["filter"]((_0x262967) => !_0x262967["isBasemap"])["reverse"]()["map"]((_0x1148d4) => this["_toLayerItem"](_0x1148d4));
  }
  ["_toLayerItem"](_0x3c97fd) {
    var _a2, _b;
    if (!this["_opacityById"]["has"](_0x3c97fd["id"])) this["_opacityById"]["set"](_0x3c97fd["id"], 1);
    const _0x17d2dc = (_a2 = this["layerManager"]) == null ? void 0 : _a2["getLayerStyle"](_0x3c97fd["id"]), _0x338acf = (_0x17d2dc == null ? void 0 : _0x17d2dc["fill"]["mode"]) === "solid";
    return { "id": _0x3c97fd["id"], "title": _0x3c97fd["title"], "visible": _0x3c97fd["cesiumObject"]["show"], "opacity": this["_opacityById"]["get"](_0x3c97fd["id"]) ?? 1, "fill": _0x338acf ? _0x17d2dc["fill"]["color"] : NEUTRAL_LAYER_COLOR, "styleMode": _0x17d2dc == null ? void 0 : _0x17d2dc["fill"]["mode"], "layerType": _0x3c97fd["layerType"], "analysisResult": ((_b = this["layerManager"]) == null ? void 0 : _b["isAnalysisResult"](_0x3c97fd["id"])) ?? ![] };
  }
  ["_openPanel"]() {
    this["_open"] = !![], this["_layoutController"]["setOpen"](!![], this["panelWidth"]);
  }
  ["_closePanel"]() {
    this["_open"] = ![], this["_layoutController"]["setOpen"](![], this["panelWidth"]), this["_closeMenu"]();
  }
  ["_closeStyleEditorIfOpen"]() {
    const _0x57512a = this["_styleEditorPortal"]["element"];
    if (_0x57512a == null ? void 0 : _0x57512a["open"]) _0x57512a["close"]();
  }
  ["_closeAuthorizedLayersIfOpen"]() {
    const _0x4978cd = this["_authorizedLayersPortal"]["element"];
    if (_0x4978cd == null ? void 0 : _0x4978cd["open"]) _0x4978cd["closePicker"]();
  }
  ["_openUpload"]() {
    this["_overlayCoordinator"]["closeOthers"]("upload"), this["_uploadOpen"] = !![];
  }
  ["_closeUpload"]() {
    this["_uploadOpen"] = ![];
  }
  ["_openServiceUpload"]() {
    this["_overlayCoordinator"]["closeOthers"]("serviceUpload"), this["_serviceUploadOpen"] = !![];
  }
  ["_closeServiceUpload"]() {
    this["_serviceUploadOpen"] = ![];
  }
  async ["_openAuthorizedLayers"]() {
    var _a2;
    if (this["_authorizedLayersFetching"]) return;
    this["_overlayCoordinator"]["closeOthers"]("authorizedLayers"), this["_authorizedLayersFetching"] = !![];
    try {
      await ((_a2 = this["_authorizedLayersPortal"]["element"]) == null ? void 0 : _a2["fetchAndOpen"]());
    } finally {
      this["_authorizedLayersFetching"] = ![];
    }
  }
  ["_setVisible"](_0x9f4847, _0x4d6379) {
    var _a2;
    (_a2 = this["layerManager"]) == null ? void 0 : _a2["setVisible"](_0x9f4847, _0x4d6379);
  }
  ["_setLayerColor"](_0x381ffc, _0x34d018) {
    var _a2, _b;
    const _0x1714a9 = (_a2 = this["layerManager"]) == null ? void 0 : _a2["getLayerStyle"](_0x381ffc), _0x12aed1 = (_0x1714a9 == null ? void 0 : _0x1714a9["fill"]["mode"]) === "solid" ? _0x1714a9["fill"]["opacity"] : 1, _0x57baae = (_0x1714a9 == null ? void 0 : _0x1714a9["outline"]) ?? { "enabled": !![], "color": "#000000", "width": 2 };
    (_b = this["layerManager"]) == null ? void 0 : _b["applyLayerStyle"](_0x381ffc, { "fill": { "mode": "solid", "color": _0x34d018, "opacity": _0x12aed1 }, "outline": _0x57baae });
  }
  ["_setOpacity"](_0x3ac025, _0x1f3d2d) {
    this["_opacityById"]["set"](_0x3ac025, _0x1f3d2d);
    const _0x492a33 = this["_opacityRaf"]["get"](_0x3ac025);
    if (_0x492a33 !== void 0) this["_timers"]["cancelAnimationFrame"](_0x492a33);
    const _0x4380d3 = this["_timers"]["requestAnimationFrame"](() => {
      this["_opacityRaf"]["delete"](_0x3ac025), this["_applyOpacity"](_0x3ac025, this["_opacityById"]["get"](_0x3ac025) ?? _0x1f3d2d);
    });
    this["_opacityRaf"]["set"](_0x3ac025, _0x4380d3);
  }
  ["_applyOpacity"](_0x367179, _0x41d7c5) {
    if (!this["layerManager"]) return;
    const _0x5055b9 = this["layerManager"]["getLayerStyle"](_0x367179);
    if (_0x5055b9 !== void 0 && _0x5055b9["fill"]["mode"] !== "off") {
      this["layerManager"]["applyLayerStyle"](_0x367179, { "fill": { ..._0x5055b9["fill"], "opacity": _0x41d7c5 }, "outline": _0x5055b9["outline"] });
      return;
    }
    this["layerManager"]["setOpacity"](_0x367179, _0x41d7c5);
  }
  ["_updateOpacitySlider"](_0x3500c4, _0x34bbc8) {
    _0x3500c4["style"]["setProperty"]("--fill", _0x34bbc8 + "%");
  }
  ["_remove"](_0x37db78) {
    var _a2;
    this["_closeMenu"]();
    const _0x50c522 = this["_opacityRaf"]["get"](_0x37db78);
    _0x50c522 !== void 0 && (cancelAnimationFrame(_0x50c522), this["_opacityRaf"]["delete"](_0x37db78));
    if (this["_legendOpenIds"]["has"](_0x37db78)) {
      const _0x2b313c = new Set(this["_legendOpenIds"]);
      _0x2b313c["delete"](_0x37db78), this["_legendOpenIds"] = _0x2b313c;
    }
    (_a2 = this["layerManager"]) == null ? void 0 : _a2["removeLayer"](_0x37db78);
  }
  ["_bringToFront"](_0x20a4f9) {
    var _a2;
    this["_closeMenu"](), (_a2 = this["layerManager"]) == null ? void 0 : _a2["raiseToTop"](_0x20a4f9);
  }
  ["_zoomToLayer"](_0x1a9dd1) {
    var _a2;
    this["_closeMenu"](), void ((_a2 = this["layerManager"]) == null ? void 0 : _a2["zoomToLayer"](_0x1a9dd1));
  }
  ["_closeMenu"]() {
    this["_openMenuId"] = null;
    if (this["_menuPortalEl"]) this["_menuPortalEl"]["open"] = ![];
  }
  ["_toggleMenu"](_0x11fda8, _0x3d9845) {
    if (this["_openMenuId"] === _0x11fda8["id"]) {
      this["_closeMenu"]();
      return;
    }
    this["_openMenuId"] = _0x11fda8["id"], this["_openMenuPortal"](_0x11fda8, _0x3d9845["currentTarget"]);
  }
  ["_openMenuPortal"](_0x281172, _0x31021c) {
    var _a2, _b;
    if (!this["_menuPortalEl"]) return;
    const _0xdc7cce = _0x31021c["getBoundingClientRect"](), _0x560a72 = ((_a2 = this["layerManager"]) == null ? void 0 : _a2["isAnalysisResult"](_0x281172["id"])) ?? _0x281172["analysisResult"];
    this["_menuPortalEl"]["actions"] = buildLayerMenuActions({ "styleMode": _0x281172["styleMode"], "layerType": _0x281172["layerType"] }, { "styleEditorAvailable": this["_styleEditorAvailable"], "legendAvailable": this["_legendAvailable"], "layerExportAvailable": this["_layerExportAvailable"], "isAnalysisResult": _0x560a72, "isGeoTiffExportAvailable": ((_b = this["layerManager"]) == null ? void 0 : _b["isGeoTiffExportAvailable"](_0x281172["id"])) ?? ![] }, { "zoomToLayer": () => this["_zoomToLayer"](_0x281172["id"]), "bringToFront": () => this["_bringToFront"](_0x281172["id"]), "remove": () => this["_remove"](_0x281172["id"]), "openStyleEditor": () => this["_openStyleEditor"](_0x281172), "toggleLegend": () => this["_toggleLegend"](_0x281172["id"]), "exportLayer": () => this["_exportLayer"](_0x281172), "exportLayerKml": () => this["_exportLayerKml"](_0x281172), "exportLayerShapefile": () => this["_exportLayerShapefile"](_0x281172), "exportLayerAsGeoTiff": () => this["_exportLayerAsGeoTiff"](_0x281172) }), this["_menuPortalEl"]["x"] = _0xdc7cce["right"] + 4, this["_menuPortalEl"]["y"] = _0xdc7cce["top"], this["_menuPortalEl"]["open"] = !![];
  }
  ["_openStyleEditor"](_0x5486f1) {
    var _a2;
    this["_closeMenu"](), this["_overlayCoordinator"]["closeOthers"]("styleEditor"), (_a2 = this["_styleEditorPortal"]["element"]) == null ? void 0 : _a2["openFor"](_0x5486f1["id"], _0x5486f1["title"], _0x5486f1["layerType"], _0x5486f1["fill"], _0x5486f1["opacity"]);
  }
  ["_toggleLegend"](_0x196549) {
    this["_closeMenu"]();
    const _0x5f0313 = new Set(this["_legendOpenIds"]);
    if (_0x5f0313["has"](_0x196549)) _0x5f0313["delete"](_0x196549);
    else _0x5f0313["add"](_0x196549);
    this["_legendOpenIds"] = _0x5f0313;
  }
  ["_exportLayer"](_0x2d19e5) {
    var _a2;
    this["_closeMenu"]();
    if (!this["layerManager"]) return;
    (_a2 = this["_layerExportMarker"]) == null ? void 0 : _a2["exportLayer"](this["layerManager"], _0x2d19e5["id"], _0x2d19e5["title"]);
  }
  ["_exportLayerKml"](_0x5a718f) {
    var _a2;
    this["_closeMenu"]();
    if (!this["layerManager"]) return;
    (_a2 = this["_layerExportMarker"]) == null ? void 0 : _a2["exportLayerKml"](this["layerManager"], _0x5a718f["id"], _0x5a718f["title"]);
  }
  ["_exportLayerShapefile"](_0x53ca38) {
    var _a2;
    this["_closeMenu"]();
    if (!this["layerManager"]) return;
    (_a2 = this["_layerExportMarker"]) == null ? void 0 : _a2["exportLayerShapefile"](this["layerManager"], _0x53ca38["id"], _0x53ca38["title"]);
  }
  async ["_exportLayerAsGeoTiff"](_0x32db88) {
    var _a2;
    this["_closeMenu"]();
    if (!this["layerManager"]) return;
    this["_geoTiffExportingId"] = _0x32db88["id"];
    try {
      await ((_a2 = this["_layerExportMarker"]) == null ? void 0 : _a2["exportLayerAsGeoTiff"](this["layerManager"], _0x32db88["id"], _0x32db88["title"]));
    } catch (_0x7cdd1d) {
      console["error"]("[tucbs-layer-list] GeoTIFF export başarısız:", _0x7cdd1d);
    } finally {
      this["_geoTiffExportingId"] = null;
    }
  }
  ["_applyReorder"](_0x4b2693, _0x1f624e) {
    var _a2;
    const _0x46df60 = this["_layers"]["findIndex"]((_0x5cc571) => _0x5cc571["id"] === _0x4b2693), _0x54be44 = _0x46df60 === -1 ? void 0 : this["_layers"][_0x46df60];
    if (!_0x54be44) return;
    const _0x518b57 = this["_layers"]["filter"]((_0x1cc486) => _0x1cc486["id"] !== _0x4b2693), _0x412872 = _0x1f624e ? _0x518b57["findIndex"]((_0x16054a) => _0x16054a["id"] === _0x1f624e) : -1, _0x201a1c = _0x412872 === -1 ? _0x518b57["length"] : _0x412872;
    _0x518b57["splice"](_0x201a1c, 0, _0x54be44), this["_layers"] = _0x518b57, _0x201a1c !== _0x46df60 && ((_a2 = this["layerManager"]) == null ? void 0 : _a2["reorder"](this["_layers"]["map"]((_0x56ed5d) => _0x56ed5d["id"])));
  }
  ["render"]() {
    if (!this["layerManager"]) return A;
    return b`
      ${!this["_open"] ? b`
            <button
              type="button"
              class="toggle-btn"
              @click=${() => this["_openPanel"]()}
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
        panel-width=${this["panelWidth"]}
        .open=${this["_open"]}
        .onCloseRequest=${() => this["_closePanel"]()}
      >
        <span slot="icon">${ICON_LAYERS}</span>
        ${this["_renderHeader"]()}

        <div class="layer-list">
          ${this["_layers"]["length"] === 0 ? b`<div class="layer-empty">Katman yok</div>` : c(this["_layers"], (_0x1cafb7) => _0x1cafb7["id"], (_0x1e8440) => this["_renderLayerRow"](_0x1e8440))}
        </div>
      </tucbs-slide-over-panel>
    `;
  }
  ["_renderHeader"]() {
    if (!this["_fileUploadAvailable"] && !this["_serviceUploadAvailable"] && !(this["_authorizedLayersAvailable"] && this["_hasApiKey"])) return A;
    return b`
      <div class="header-actions">
        ${this["_fileUploadAvailable"] ? b`
              <button
                type="button"
                class="add-btn"
                data-tooltip="Veri Dosyası Ekle"
                aria-label="Veri Dosyası Ekle"
                @click=${() => this["_openUpload"]()}
              >
                ${ICON_DOCUMENT_BLANK}
              </button>
            ` : ""}
        ${this["_serviceUploadAvailable"] ? b`
              <button
                type="button"
                class="add-btn"
                data-tooltip="Coğrafi Veri Servisi Ekle"
                aria-label="Coğrafi Veri Servisi Ekle"
                @click=${() => this["_openServiceUpload"]()}
              >
                ${ICON_CLOUD_DOWNLOAD$1}
              </button>
            ` : ""}
        ${this["_authorizedLayersAvailable"] && this["_hasApiKey"] ? b`
              <button
                type="button"
                class="add-btn"
                data-tooltip="APIKey ile Yetkili Katmanlarımı Getir"
                aria-label="APIKey ile Yetkili Katmanlarımı Getir"
                ?disabled=${this["_authorizedLayersFetching"]}
                @click=${() => this["_openAuthorizedLayers"]()}
              >
                ${ICON_API_KEY$1}
              </button>
            ` : ""}
      </div>
    `;
  }
  ["_renderLayerRow"](_0x2909c8) {
    var _a2;
    const _0x5e4036 = _0x2909c8["opacity"] * 100, _0x461012 = Math["round"](_0x5e4036);
    return b`
      <div class="layer-item" data-layer-id=${_0x2909c8["id"]}>
        <div class="layer-row">
          <button
            type="button"
            class="drag-handle"
            data-tooltip="Sürükleyerek Sırala"
            aria-label="${_0x2909c8["title"]} katmanını sırala"
            @pointerdown=${(_0x2b7d49) => {
      const _0x22c98f = _0x2b7d49["currentTarget"], _0x567f6f = _0x22c98f["closest"](".layer-item"), _0x324ff6 = _0x567f6f == null ? void 0 : _0x567f6f["closest"](".layer-list");
      _0x567f6f instanceof HTMLElement && _0x324ff6 instanceof HTMLElement && this["_dragReorder"]["start"](_0x2b7d49, _0x567f6f, _0x22c98f, _0x324ff6);
    }}
          >
            ${ICON_DRAG_HANDLE}
          </button>

          <cds-checkbox
            .checked=${_0x2909c8["visible"]}
            aria-label=${_0x2909c8["title"]}
            @cds-checkbox-changed=${(_0x49a911) => {
      var _a3;
      const _0x53851d = ((_a3 = _0x49a911["detail"]) == null ? void 0 : _a3["checked"]) ?? !_0x2909c8["visible"];
      this["_setVisible"](_0x2909c8["id"], !!_0x53851d);
    }}
          ></cds-checkbox>

          ${_0x2909c8["layerType"] !== "DRAWING" && _0x2909c8["layerType"] !== "MEASURE" ? b`
                <span
                  class="layer-color-dot"
                  style="background:${_0x2909c8["fill"]}"
                  title=${_0x2909c8["styleMode"] === "solid" ? "Katman rengi" : "Katman rengi (yalnız sabit renk modunda değiştirilebilir)"}
                >
                  <input
                    type="color"
                    .value=${toHexColor(_0x2909c8["fill"])}
                    ?disabled=${_0x2909c8["styleMode"] !== "solid"}
                    aria-label="${_0x2909c8["title"]} rengi"
                    @input=${(_0x2c7eab) => {
      this["_setLayerColor"](_0x2909c8["id"], _0x2c7eab["target"]["value"]);
    }}
                  />
                </span>
              ` : ""}
          <span class="layer-name" title=${_0x2909c8["title"]}>${_0x2909c8["title"]}</span>

          <div class="layer-actions">
            <div class="layer-options">
              <button
                type="button"
                class="options-btn"
                aria-label=${this["_geoTiffExportingId"] === _0x2909c8["id"] ? "GeoTIFF İndiriliyor…" : "Katman Seçenekleri"}
                aria-haspopup="menu"
                aria-expanded=${this["_openMenuId"] === _0x2909c8["id"]}
                ?disabled=${this["_geoTiffExportingId"] === _0x2909c8["id"]}
                @click=${(_0x49d124) => {
      this["_hidePortalTooltip"](), this["_toggleMenu"](_0x2909c8, _0x49d124);
    }}
                @mouseenter=${(_0x11c934) => this["_showPortalTooltip"](_0x11c934["currentTarget"], this["_geoTiffExportingId"] === _0x2909c8["id"] ? "GeoTIFF İndiriliyor…" : "Katman Seçenekleri")}
                @mouseleave=${() => this["_hidePortalTooltip"]()}
                @focus=${(_0x139598) => this["_showPortalTooltip"](_0x139598["currentTarget"], this["_geoTiffExportingId"] === _0x2909c8["id"] ? "GeoTIFF İndiriliyor…" : "Katman Seçenekleri")}
                @blur=${() => this["_hidePortalTooltip"]()}
              >
                ${this["_geoTiffExportingId"] === _0x2909c8["id"] ? b`<span class="options-btn-spinner"></span>` : ICON_OVERFLOW_MENU}
              </button>
            </div>
          </div>
        </div>

        ${_0x2909c8["layerType"] !== "DRAWING" && _0x2909c8["layerType"] !== "MEASURE" ? b`
              <div class="layer-opacity-row">
                <span class="layer-opacity-pct">%${_0x461012}</span>
                <input
                  type="range"
                  class="opacity-slider"
                  min="0"
                  max="100"
                  step="0.1"
                  .value=${String(_0x5e4036)}
                  style="--fill: ${_0x5e4036}%"
                  @input=${(_0x290d00) => {
      const _0x4455fb = _0x290d00["target"], _0x678b4a = Number(_0x4455fb["value"]);
      this["_updateOpacitySlider"](_0x4455fb, _0x678b4a), this["_setOpacity"](_0x2909c8["id"], _0x678b4a / 100);
    }}
                />
              </div>
            ` : ""}

        ${this["_legendAvailable"] && _0x2909c8["styleMode"] !== "solid" && this["_legendOpenIds"]["has"](_0x2909c8["id"]) ? b`<tucbs-legend-panel
              layerId=${_0x2909c8["id"]}
              layerType=${_0x2909c8["layerType"]}
              .layerManager=${this["layerManager"]}
              .open=${!![]}
              .customCss=${((_a2 = this["_legendMarker"]) == null ? void 0 : _a2["customCss"]) ?? ""}
            ></tucbs-legend-panel>` : ""}
      </div>
    `;
  }
};
_apiKeyState$1 = /* @__PURE__ */ new WeakMap(), TucbsLayerList["styles"] = [bottomRightTooltipStyles, layerListStyles], __decorateClass$s([n$1({ "attribute": ![] })], TucbsLayerList["prototype"], "layerManager", 2), __decorateClass$s([n$1({ "attribute": ![] })], TucbsLayerList["prototype"], "map", 2), __decorateClass$s([n$1()], TucbsLayerList["prototype"], "mapElementId", 2), __decorateClass$s([n$1({ "attribute": "api-key" })], TucbsLayerList["prototype"], "apiKey", 1), __decorateClass$s([n$1({ "attribute": "panel-width" })], TucbsLayerList["prototype"], "panelWidth", 2), __decorateClass$s([n$1({ "type": Boolean })], TucbsLayerList["prototype"], "collapsible", 2), __decorateClass$s([n$1({ "attribute": "custom-css" })], TucbsLayerList["prototype"], "customCss", 2), __decorateClass$s([r()], TucbsLayerList["prototype"], "_open", 2), __decorateClass$s([r()], TucbsLayerList["prototype"], "_layers", 2), __decorateClass$s([r()], TucbsLayerList["prototype"], "_openMenuId", 2), __decorateClass$s([r()], TucbsLayerList["prototype"], "_geoTiffExportingId", 2), __decorateClass$s([r()], TucbsLayerList["prototype"], "_uploadOpen", 2), __decorateClass$s([r()], TucbsLayerList["prototype"], "_fileUploadAvailable", 2), __decorateClass$s([r()], TucbsLayerList["prototype"], "_serviceUploadOpen", 2), __decorateClass$s([r()], TucbsLayerList["prototype"], "_serviceUploadAvailable", 2), __decorateClass$s([r()], TucbsLayerList["prototype"], "_styleEditorAvailable", 2), __decorateClass$s([r()], TucbsLayerList["prototype"], "_legendAvailable", 2), __decorateClass$s([r()], TucbsLayerList["prototype"], "_layerExportAvailable", 2), __decorateClass$s([r()], TucbsLayerList["prototype"], "_legendOpenIds", 2), __decorateClass$s([r()], TucbsLayerList["prototype"], "_authorizedLayersAvailable", 2), __decorateClass$s([r()], TucbsLayerList["prototype"], "_authorizedLayersFetching", 2), __decorateClass$s([r()], TucbsLayerList["prototype"], "_hasApiKey", 2), TucbsLayerList = __decorateClass$s([t$3("tucbs-layer-list")], TucbsLayerList);
const authorizedLayersStyles = i$5`
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
`, TOAST_STYLES = i$5`
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
const TOAST_TIMEOUT_MS = { "success": 4e3, "info": 4e3, "warning": 6e3, "error": 7e3 };
function showToast(_0x48fea3, _0x8acddf) {
  destroyToast();
  const _0x3f1dbf = document["createElement"]("div");
  document["body"]["appendChild"](_0x3f1dbf);
  const _0x241962 = _0x3f1dbf["attachShadow"]({ "mode": "open" }), _0x3a90ca = new CSSStyleSheet();
  _0x3a90ca["replaceSync"](TOAST_STYLES["cssText"]), _0x241962["adoptedStyleSheets"] = [_0x3a90ca], activeToastEl = _0x3f1dbf;
  const _0xf6acc4 = TOAST_TIMEOUT_MS[_0x48fea3];
  D(b`
      <cds-inline-notification
        kind=${_0x48fea3}
        hide-close-button
        timeout=${_0xf6acc4}
        subtitle=${_0x8acddf}
        @cds-notification-closed=${() => destroyToast()}
      ></cds-inline-notification>
    `, _0x241962);
}
function destroyToast() {
  activeToastEl == null ? void 0 : activeToastEl["remove"](), activeToastEl = null;
}
let refCount = 0, overlayEnsured = ![];
function ensureOverlay() {
  if (overlayEnsured || typeof document === "undefined") return;
  overlayEnsured = !![];
  if (document["querySelector"]("tucbs-busy-overlay")) return;
  document["body"]["appendChild"](document["createElement"]("tucbs-busy-overlay"));
}
function dispatch(_0x5beb74) {
  document["dispatchEvent"](new CustomEvent("tucbs-busy-changed", { "detail": { "busy": refCount > 0, "message": _0x5beb74 } }));
}
function beginBusy(_0x2d753b) {
  ensureOverlay(), refCount++, dispatch(_0x2d753b);
}
function endBusy() {
  refCount = Math["max"](0, refCount - 1), dispatch();
}
var __defProp$q = Object["defineProperty"], __getOwnPropDesc$r = Object["getOwnPropertyDescriptor"], __decorateClass$r = (_0x3ac9c9, _0x533b6a, _0x24bc35, _0x38571a) => {
  var _0x2c8313 = _0x38571a > 1 ? void 0 : _0x38571a ? __getOwnPropDesc$r(_0x533b6a, _0x24bc35) : _0x533b6a;
  for (var _0x3b8480 = _0x3ac9c9["length"] - 1, _0x2c29b2; _0x3b8480 >= 0; _0x3b8480--) if (_0x2c29b2 = _0x3ac9c9[_0x3b8480]) _0x2c8313 = (_0x38571a ? _0x2c29b2(_0x533b6a, _0x24bc35, _0x2c8313) : _0x2c29b2(_0x2c8313)) || _0x2c8313;
  if (_0x38571a && _0x2c8313) __defProp$q(_0x533b6a, _0x24bc35, _0x2c8313);
  return _0x2c8313;
};
function carbonIcon$1(_0x484a7e) {
  return o$1(iconNodeToString(_0x484a7e));
}
const ICON_API_KEY = carbonIcon$1(_20_default$5), ICON_CLOSE$4 = carbonIcon$1(_16_default$v), ICON_LINK = carbonIcon$1(_16_default$j);
let TucbsAuthorizedLayers = class extends i$2 {
  constructor() {
    super(...arguments), this["customCss"] = "", this["_customCssState"] = { "sheet": null }, this["_authorizedLayersLoading"] = ![], this["_authorizedPickerOpen"] = ![], this["_authorizedItems"] = [], this["_authorizedSelectedKeys"] = [], this["_authorizedFetchError"] = "", this["_authorizedAddError"] = "", this["_tokenUrlDialogOpen"] = ![], this["_tokenUrlDialogValue"] = "", this["_tokenUrlDialogTitle"] = "", this["_tooltipPortalEl"] = null, this["_dialogDrag"] = new DraggablePanelController(this, { "getPanel": (_0x1d1e9c) => {
      const _0x1ae7dc = _0x1d1e9c["closest"](".authorized-dialog");
      return _0x1ae7dc instanceof HTMLElement ? _0x1ae7dc : null;
    }, "ignoreSelector": ".authorized-dialog-close" });
  }
  get ["open"]() {
    return this["_authorizedPickerOpen"];
  }
  ["connectedCallback"]() {
    super["connectedCallback"](), this["_tooltipPortalEl"] = document["createElement"]("tucbs-tooltip-portal"), document["body"]["appendChild"](this["_tooltipPortalEl"]);
  }
  ["disconnectedCallback"]() {
    var _a2;
    (_a2 = this["_tooltipPortalEl"]) == null ? void 0 : _a2["remove"](), this["_tooltipPortalEl"] = null, super["disconnectedCallback"]();
  }
  ["updated"](_0x499089) {
    super["updated"](_0x499089);
    _0x499089["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_customCssState"], "tucbs-authorized-layers");
    if (this["_authorizedPickerOpen"]) this["_syncAuthorizedListMaxHeight"]();
  }
  async ["fetchAndOpen"]() {
    if (!this["layerManager"] || this["_authorizedLayersLoading"]) return;
    this["_authorizedLayersLoading"] = !![], beginBusy("Yetkili katmanlar getiriliyor…"), this["_authorizedFetchError"] = "", this["_authorizedAddError"] = "";
    try {
      const _0x439f7b = await this["layerManager"]["getAuthorizedLayers"]();
      this["_authorizedItems"] = _0x439f7b, this["_authorizedSelectedKeys"] = [], this["_authorizedPickerOpen"] = !![], _0x439f7b["length"] === 0 && (this["_authorizedFetchError"] = "Bu API key için yetkili katman bulunamadı.");
    } catch (_0x190c25) {
      _0x190c25 instanceof TucbsError && console["error"]("[tucbs-authorized-layers] " + _0x190c25["code"] + " (" + _0x190c25["number"] + "): " + _0x190c25["message"]), this["_authorizedItems"] = [], this["_authorizedPickerOpen"] = !![], this["_authorizedFetchError"] = _0x190c25 instanceof Error ? _0x190c25["message"] : "Yetkili katman listesi alınamadı.";
    } finally {
      this["_authorizedLayersLoading"] = ![], endBusy();
    }
  }
  ["closePicker"]() {
    this["_authorizedPickerOpen"] = ![], this["_authorizedAddError"] = "", this["_closeTokenUrlDialog"]();
  }
  ["_openTokenUrlDialog"](_0x3b414c) {
    var _a2;
    const _0x4f01d6 = (_a2 = _0x3b414c["tokenUrl"]) == null ? void 0 : _a2["trim"]();
    if (!_0x4f01d6) {
      showToast("warning", "Bu katman için token URL bulunamadı.");
      return;
    }
    this["_tokenUrlDialogTitle"] = _0x3b414c["katmanAdi"] || _0x3b414c["ogcLayerName"] || "Token URL", this["_tokenUrlDialogValue"] = _0x4f01d6, this["_tokenUrlDialogOpen"] = !![];
  }
  ["_closeTokenUrlDialog"]() {
    this["_tokenUrlDialogOpen"] = ![], this["_tokenUrlDialogValue"] = "", this["_tokenUrlDialogTitle"] = "";
  }
  async ["_copyTokenUrl"]() {
    const _0x584d81 = this["_tokenUrlDialogValue"]["trim"]();
    if (!_0x584d81) return;
    try {
      await navigator["clipboard"]["writeText"](_0x584d81), showToast("info", "Token URL panoya kopyalandı.");
    } catch {
      showToast("error", "Panoya kopyalanamadı.");
    }
  }
  ["_authorizedKey"](_0x30d19b) {
    return _0x30d19b["id"] ?? _0x30d19b["servisTuru"] + "|" + _0x30d19b["servisUrl"] + "|" + _0x30d19b["ogcLayerName"];
  }
  ["_authorizedCanAdd"](_0x107798) {
    var _a2;
    return ((_a2 = this["layerManager"]) == null ? void 0 : _a2["canAddAuthorizedLayer"](_0x107798)) ?? ![];
  }
  ["_toggleAuthorizedSelected"](_0x47e1ba, _0x918be3) {
    this["_authorizedSelectedKeys"] = _0x918be3 ? [...this["_authorizedSelectedKeys"], _0x47e1ba] : this["_authorizedSelectedKeys"]["filter"]((_0x5db583) => _0x5db583 !== _0x47e1ba);
  }
  async ["_addSelectedAuthorizedLayers"]() {
    if (!this["layerManager"]) {
      this["_authorizedAddError"] = "Harita hazır değil, katman eklenemedi.";
      return;
    }
    const _0xd5bec2 = this["_authorizedItems"]["filter"]((_0x53e9a9) => {
      const _0x24392a = this["_authorizedKey"](_0x53e9a9);
      return this["_authorizedSelectedKeys"]["includes"](_0x24392a) && this["_authorizedCanAdd"](_0x53e9a9);
    });
    if (_0xd5bec2["length"] === 0) return;
    beginBusy("Katmanlar ekleniyor…"), this["_authorizedAddError"] = "";
    const _0x451702 = [];
    for (const _0x1d5328 of _0xd5bec2) {
      try {
        await this["layerManager"]["addAuthorizedLayer"](_0x1d5328);
      } catch {
        _0x451702["push"](_0x1d5328["katmanAdi"] || _0x1d5328["ogcLayerName"]);
      }
    }
    this["_authorizedSelectedKeys"] = _0x451702["length"] === 0 ? [] : _0xd5bec2["filter"]((_0xbb6e6b) => _0x451702["includes"](_0xbb6e6b["katmanAdi"] || _0xbb6e6b["ogcLayerName"]))["map"]((_0x3162af) => this["_authorizedKey"](_0x3162af)), endBusy(), _0x451702["length"] === 0 ? this["closePicker"]() : this["_authorizedAddError"] = _0x451702["length"] + "/" + _0xd5bec2["length"] + " katman eklenemedi: " + _0x451702["join"](", ");
  }
  ["_authorizedAddButtonLabel"]() {
    const _0x163cb2 = this["_authorizedSelectedKeys"]["filter"]((_0x2dc640) => {
      const _0x266a18 = this["_authorizedItems"]["find"]((_0x1083bb) => this["_authorizedKey"](_0x1083bb) === _0x2dc640);
      return _0x266a18 && this["_authorizedCanAdd"](_0x266a18);
    })["length"];
    if (_0x163cb2 > 1) return "Haritaya Ekle (" + _0x163cb2 + ")";
    return "Haritaya Ekle";
  }
  ["_syncAuthorizedListMaxHeight"]() {
    var _a2;
    const _0x1a9c26 = (_a2 = this["shadowRoot"]) == null ? void 0 : _a2["querySelector"](".authorized-list");
    if (!_0x1a9c26) return;
    const _0x1525b6 = Array["from"](_0x1a9c26["querySelectorAll"](".authorized-row")), _0x278e22 = TucbsAuthorizedLayers["AUTHORIZED_VISIBLE_ROWS"];
    if (_0x1525b6["length"] <= _0x278e22) {
      _0x1a9c26["style"]["maxHeight"] = "";
      return;
    }
    const _0x2758f6 = _0x1525b6[_0x278e22 - 1];
    if (!_0x2758f6) return;
    const _0x4ade41 = _0x1a9c26["getBoundingClientRect"]()["top"], _0x1484a5 = _0x2758f6["getBoundingClientRect"]()["bottom"], _0x2cd64 = _0x1484a5 - _0x4ade41;
    _0x1a9c26["style"]["maxHeight"] = _0x2cd64 + "px";
  }
  ["_showPortalTooltip"](_0x1ecad6, _0x983b87) {
    if (!this["_tooltipPortalEl"]) return;
    const _0x31f582 = _0x1ecad6["getBoundingClientRect"]();
    this["_tooltipPortalEl"]["text"] = _0x983b87, this["_tooltipPortalEl"]["x"] = _0x31f582["left"], this["_tooltipPortalEl"]["y"] = _0x31f582["bottom"] + 6, this["_tooltipPortalEl"]["open"] = !![];
  }
  ["_hidePortalTooltip"]() {
    if (this["_tooltipPortalEl"]) this["_tooltipPortalEl"]["open"] = ![];
  }
  ["render"]() {
    if (!this["_authorizedPickerOpen"]) return A;
    return this["_renderAuthorizedPicker"]();
  }
  ["_renderAuthorizedPicker"]() {
    const _0x160504 = this["_authorizedSelectedKeys"]["filter"]((_0x2a4a47) => {
      const _0x44f62d = this["_authorizedItems"]["find"]((_0x2de5d9) => this["_authorizedKey"](_0x2de5d9) === _0x2a4a47);
      return _0x44f62d && this["_authorizedCanAdd"](_0x44f62d);
    })["length"];
    return b`
      <div
        class="authorized-dialog"
        role="dialog"
        aria-label="Yetkili katmanlar"
      >
        <div
          class="authorized-dialog-header"
          @pointerdown=${(_0x146538) => this["_dialogDrag"]["start"](_0x146538)}
        >
          <span class="authorized-dialog-title"><span class="title-icon">${ICON_API_KEY}</span>Yetkili Katmanlar</span>
          <button
            type="button"
            class="authorized-dialog-close"
            data-tooltip="Kapat"
            aria-label="Kapat"
            @click=${() => this["closePicker"]()}
          >
            ${ICON_CLOSE$4}
          </button>
        </div>
        <div class="authorized-dialog-body">
          ${this["_authorizedFetchError"] ? b`<div class="authorized-error">
                ${this["_authorizedFetchError"]}
              </div>` : A}
          ${this["_authorizedItems"]["length"] > 0 ? b`
                <div class="authorized-list" role="group" aria-label="Katmanlar">
                  ${this["_authorizedItems"]["map"]((_0x717b4c) => {
      var _a2, _b;
      const _0x194cd6 = this["_authorizedKey"](_0x717b4c), _0x5bca12 = this["_authorizedCanAdd"](_0x717b4c), _0x1279bb = _0x717b4c["katmanAdi"] || _0x717b4c["ogcLayerName"], _0x18893a = [_0x717b4c["servisTuru"], _0x717b4c["ogcLayerName"] !== _0x1279bb ? _0x717b4c["ogcLayerName"] : "", _0x717b4c["ustKurumAdi"]]["filter"](Boolean), _0x16fb58 = !_0x5bca12 && ((_a2 = _0x717b4c["servisTuru"]) == null ? void 0 : _a2["toUpperCase"]()) === "WMTS" && !_0x717b4c["wmtsTileMatrixSet"] ? " (TileMatrixSet eksik)" : !_0x5bca12 ? " (eksik bilgi)" : "";
      return b`
                      <div
                        class="authorized-row ${_0x5bca12 ? "" : "authorized-row--disabled"}"
                      >
                        <div class="authorized-row-main">
                          <cds-checkbox
                            title=${_0x1279bb}
                            ?disabled=${!_0x5bca12}
                            .checked=${this["_authorizedSelectedKeys"]["includes"](_0x194cd6)}
                            @cds-checkbox-changed=${(_0x4837d9) => {
        var _a3;
        if (!_0x5bca12) return;
        this["_toggleAuthorizedSelected"](_0x194cd6, !!((_a3 = _0x4837d9["detail"]) == null ? void 0 : _a3["checked"]));
      }}
                          >
                            ${_0x1279bb}${_0x16fb58}
                          </cds-checkbox>
                          <button
                            type="button"
                            class="authorized-token-btn"
                            aria-label="URL Göster"
                            ?disabled=${!((_b = _0x717b4c["tokenUrl"]) == null ? void 0 : _b["trim"]())}
                            @click=${(_0x55b268) => {
        _0x55b268["stopPropagation"](), this["_hidePortalTooltip"](), this["_openTokenUrlDialog"](_0x717b4c);
      }}
                            @mouseenter=${(_0x4aeb6e) => this["_showPortalTooltip"](_0x4aeb6e["currentTarget"], "URL Göster")}
                            @mouseleave=${() => this["_hidePortalTooltip"]()}
                            @focus=${(_0x7d29cb) => this["_showPortalTooltip"](_0x7d29cb["currentTarget"], "URL Göster")}
                            @blur=${() => this["_hidePortalTooltip"]()}
                          >
                            ${ICON_LINK}
                          </button>
                        </div>
                        <div class="authorized-meta">
                          ${_0x18893a["join"](" · ")}
                        </div>
                      </div>
                    `;
    })}
                </div>
                <div class="authorized-add-error">${this["_authorizedAddError"]}</div>
                <button
                  type="button"
                  class="authorized-add-btn"
                  ?disabled=${_0x160504 === 0}
                  @click=${() => this["_addSelectedAuthorizedLayers"]()}
                >
                  ${this["_authorizedAddButtonLabel"]()}
                </button>
              ` : A}
        </div>
      </div>
      ${this["_tokenUrlDialogOpen"] ? this["_renderTokenUrlDialog"]() : A}
    `;
  }
  ["_renderTokenUrlDialog"]() {
    return b`
      <div
        class="token-url-dialog"
        role="dialog"
        aria-label="Token URL"
      >
        <div class="token-url-dialog-header">
          <span>${this["_tokenUrlDialogTitle"]}</span>
          <button
            type="button"
            class="authorized-dialog-close"
            data-tooltip="Kapat"
            aria-label="Kapat"
            @click=${() => this["_closeTokenUrlDialog"]()}
          >
            ${ICON_CLOSE$4}
          </button>
        </div>
        <div class="token-url-dialog-body">
          <pre class="token-url-value">${this["_tokenUrlDialogValue"]}</pre>
          <div class="token-url-actions">
            <button
              type="button"
              class="token-url-btn"
              @click=${() => this["_closeTokenUrlDialog"]()}
            >
              Kapat
            </button>
            <button
              type="button"
              class="token-url-btn token-url-btn--primary"
              @click=${() => this["_copyTokenUrl"]()}
            >
              Kopyala
            </button>
          </div>
        </div>
      </div>
    `;
  }
};
TucbsAuthorizedLayers["styles"] = authorizedLayersStyles, TucbsAuthorizedLayers["AUTHORIZED_VISIBLE_ROWS"] = 4, __decorateClass$r([n$1({ "attribute": ![] })], TucbsAuthorizedLayers["prototype"], "layerManager", 2), __decorateClass$r([n$1({ "attribute": "custom-css" })], TucbsAuthorizedLayers["prototype"], "customCss", 2), __decorateClass$r([r()], TucbsAuthorizedLayers["prototype"], "_authorizedLayersLoading", 2), __decorateClass$r([r()], TucbsAuthorizedLayers["prototype"], "_authorizedPickerOpen", 2), __decorateClass$r([r()], TucbsAuthorizedLayers["prototype"], "_authorizedItems", 2), __decorateClass$r([r()], TucbsAuthorizedLayers["prototype"], "_authorizedSelectedKeys", 2), __decorateClass$r([r()], TucbsAuthorizedLayers["prototype"], "_authorizedFetchError", 2), __decorateClass$r([r()], TucbsAuthorizedLayers["prototype"], "_authorizedAddError", 2), __decorateClass$r([r()], TucbsAuthorizedLayers["prototype"], "_tokenUrlDialogOpen", 2), __decorateClass$r([r()], TucbsAuthorizedLayers["prototype"], "_tokenUrlDialogValue", 2), __decorateClass$r([r()], TucbsAuthorizedLayers["prototype"], "_tokenUrlDialogTitle", 2), TucbsAuthorizedLayers = __decorateClass$r([t$3("tucbs-authorized-layers")], TucbsAuthorizedLayers);
/**
* @license
* Copyright 2020 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
const a = Symbol["for"](""), o = (_0x37004e) => {
  if ((_0x37004e == null ? void 0 : _0x37004e["r"]) === a) return _0x37004e == null ? void 0 : _0x37004e["_$litStatic$"];
}, s = (_0x10f1ac) => ({ "_$litStatic$": _0x10f1ac, "r": a }), l = /* @__PURE__ */ new Map(), n2 = (_0x4a576f) => (_0x551203, ..._0x2d39bf) => {
  const _0x417c1e = _0x2d39bf["length"];
  let _0x5f0714, _0x4d3402;
  const _0x4aeed0 = [], _0xcbf634 = [];
  let _0x2888ce, _0x2bc00d = 0, _0x5d3da5 = ![];
  for (; _0x2bc00d < _0x417c1e; ) {
    for (_0x2888ce = _0x551203[_0x2bc00d]; _0x2bc00d < _0x417c1e && void 0 !== (_0x4d3402 = _0x2d39bf[_0x2bc00d], _0x5f0714 = o(_0x4d3402)); ) _0x2888ce += _0x5f0714 + _0x551203[++_0x2bc00d], _0x5d3da5 = !![];
    _0x2bc00d !== _0x417c1e && _0xcbf634["push"](_0x4d3402), _0x4aeed0["push"](_0x2888ce), _0x2bc00d++;
  }
  if (_0x2bc00d === _0x417c1e && _0x4aeed0["push"](_0x551203[_0x417c1e]), _0x5d3da5) {
    const _0xbf29ee = _0x4aeed0["join"]("$$lit$$");
    void 0 === (_0x551203 = l["get"](_0xbf29ee)) && (_0x4aeed0["raw"] = _0x4aeed0, l["set"](_0xbf29ee, _0x551203 = _0x4aeed0)), _0x2d39bf = _0xcbf634;
  }
  return _0x4a576f(_0x551203, ..._0x2d39bf);
}, u = n2(b);
var __defProp$p = Object["defineProperty"], __getOwnPropDesc$q = Object["getOwnPropertyDescriptor"], __decorateClass$q = (_0x1548cb, _0x5d1ae3, _0x490e05, _0x55f8ff) => {
  var _0x3e768a = _0x55f8ff > 1 ? void 0 : _0x55f8ff ? __getOwnPropDesc$q(_0x5d1ae3, _0x490e05) : _0x5d1ae3;
  for (var _0x2ee245 = _0x1548cb["length"] - 1, _0x4f0e06; _0x2ee245 >= 0; _0x2ee245--) if (_0x4f0e06 = _0x1548cb[_0x2ee245]) _0x3e768a = (_0x55f8ff ? _0x4f0e06(_0x5d1ae3, _0x490e05, _0x3e768a) : _0x4f0e06(_0x3e768a)) || _0x3e768a;
  if (_0x55f8ff && _0x3e768a) __defProp$p(_0x5d1ae3, _0x490e05, _0x3e768a);
  return _0x3e768a;
};
const MIN_ZOOM_LIMIT_TOLERANCE = 1.1, ICON_ZOOM_IN$1 = o$1(iconNodeToString(_16_default$1)), ICON_ZOOM_OUT = o$1(iconNodeToString(_16_default)), ICON_DEFAULT_EXTENT = o$1(iconNodeToString(_16_default$n));
let TucbsZoomTool = class extends i$2 {
  constructor() {
    super(...arguments), this["mapElementId"] = "", this["customCss"] = "", this["_customCssState"] = { "sheet": null }, this["_atMaxZoom"] = ![], this["_atMinZoom"] = ![];
  }
  ["updated"](_0x3bbf1f) {
    if (_0x3bbf1f["has"]("map")) this["_watchZoomLimits"]();
    _0x3bbf1f["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_customCssState"], "tucbs-zoom-tool");
  }
  ["firstUpdated"]() {
    bindMapByElementId(this, { "noIdTiming": "raf", ...standardMapBindingMessages("tucbs-zoom-tool", "islevsiz") });
  }
  ["_watchZoomLimits"]() {
    var _a2, _b;
    (_a2 = this["_unsubscribeZoomLimits"]) == null ? void 0 : _a2.call(this), this["_unsubscribeZoomLimits"] = void 0;
    const _0x1ecddd = (_b = this["map"]) == null ? void 0 : _b["viewer"];
    if (!_0x1ecddd) return;
    const _0x335c03 = _0x1ecddd["scene"]["screenSpaceCameraController"], _0x1ff2e8 = () => {
      const _0x1e4260 = _0x1ecddd["camera"]["positionCartographic"]["height"];
      this["_atMaxZoom"] = _0x1e4260 >= _0x335c03["maximumZoomDistance"] * 0.999, this["_atMinZoom"] = _0x1e4260 <= _0x335c03["minimumZoomDistance"] * MIN_ZOOM_LIMIT_TOLERANCE;
    };
    _0x1ff2e8(), this["_unsubscribeZoomLimits"] = _0x1ecddd["scene"]["postRender"]["addEventListener"](_0x1ff2e8);
  }
  ["disconnectedCallback"]() {
    var _a2;
    super["disconnectedCallback"](), (_a2 = this["_unsubscribeZoomLimits"]) == null ? void 0 : _a2.call(this), this["_unsubscribeZoomLimits"] = void 0;
  }
  ["connectedCallback"]() {
    super["connectedCallback"]();
    if (this["map"] && !this["_unsubscribeZoomLimits"]) this["_watchZoomLimits"]();
  }
  ["_zoomIn"]() {
    var _a2;
    (_a2 = this["map"]) == null ? void 0 : _a2["zoomInStep"]();
  }
  ["_zoomOut"]() {
    var _a2;
    (_a2 = this["map"]) == null ? void 0 : _a2["zoomOutStep"]();
  }
  ["_goToDefaultExtent"]() {
    if (!this["map"]) return;
    this["map"]["setExtent"](this["defaultExtent"] ?? DEFAULT_INITIAL_EXTENT);
  }
  ["render"]() {
    return b`
      <div class="tool-group">
        <button
          class="tool-button"
          type="button"
          aria-label="Varsayılan Sınır"
          data-tooltip="Varsayılan Sınır"
          @click=${this["_goToDefaultExtent"]}
        >
          ${ICON_DEFAULT_EXTENT}
        </button>
        <button
          class="tool-button"
          type="button"
          aria-label="Yakınlaştır"
          data-tooltip="Yakınlaştır"
          ?disabled=${this["_atMinZoom"]}
          @click=${this["_zoomIn"]}
        >
          ${ICON_ZOOM_IN$1}
        </button>
        <button
          class="tool-button"
          type="button"
          aria-label="Uzaklaştır"
          data-tooltip="Uzaklaştır"
          ?disabled=${this["_atMaxZoom"]}
          @click=${this["_zoomOut"]}
        >
          ${ICON_ZOOM_OUT}
        </button>
      </div>
    `;
  }
};
TucbsZoomTool["styles"] = [leftTooltipStyles, i$5`
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
  `], __decorateClass$q([n$1()], TucbsZoomTool["prototype"], "mapElementId", 2), __decorateClass$q([n$1({ "type": Object, "attribute": "default-extent" })], TucbsZoomTool["prototype"], "defaultExtent", 2), __decorateClass$q([n$1({ "attribute": "custom-css" })], TucbsZoomTool["prototype"], "customCss", 2), __decorateClass$q([n$1({ "attribute": ![] })], TucbsZoomTool["prototype"], "map", 2), __decorateClass$q([r()], TucbsZoomTool["prototype"], "_atMaxZoom", 2), __decorateClass$q([r()], TucbsZoomTool["prototype"], "_atMinZoom", 2), TucbsZoomTool = __decorateClass$q([t$3("tucbs-zoom-tool")], TucbsZoomTool);
const GOTO_COORDINATE_PIN_URL = "data:image/png;base64,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", GOTO_COORDINATE_PIN_OPTIONS = { "width": 32, "height": 32, "anchor": "center" };
var __defProp$o = Object["defineProperty"], __getOwnPropDesc$p = Object["getOwnPropertyDescriptor"], __decorateClass$p = (_0x56aa9d, _0x30534a, _0x4fcbdd, _0x4aaef2) => {
  var _0xb73701 = _0x4aaef2 > 1 ? void 0 : _0x4aaef2 ? __getOwnPropDesc$p(_0x30534a, _0x4fcbdd) : _0x30534a;
  for (var _0x5e4bbd = _0x56aa9d["length"] - 1, _0x256784; _0x5e4bbd >= 0; _0x5e4bbd--) if (_0x256784 = _0x56aa9d[_0x5e4bbd]) _0xb73701 = (_0x4aaef2 ? _0x256784(_0x30534a, _0x4fcbdd, _0xb73701) : _0x256784(_0xb73701)) || _0xb73701;
  if (_0x4aaef2 && _0xb73701) __defProp$o(_0x30534a, _0x4fcbdd, _0xb73701);
  return _0xb73701;
};
const ICON_LOCATION$1 = o$1(iconNodeToString(_16_default$i)), PANEL_CONTENT_STYLES = "\n  .tucbs-goto-field-label {\n    display: block;\n    margin-bottom: 0.5rem;\n    color: var(--cds-text-secondary, #525252);\n    font-size: 0.75rem;\n  }\n\n  .tucbs-goto-card cds-text-input {\n    display: block;\n    width: 100%;\n    box-sizing: border-box;\n    border: 1px solid var(--cds-border-strong-01, #8d8d8d);\n    border-radius: 4px;\n  }\n\n  .tucbs-goto-card cds-text-input:focus-within {\n    border-color: var(--cds-interactive, #0f62fe);\n  }\n\n  .tucbs-goto-card {\n    display: flex;\n    flex-direction: column;\n    gap: 0.75rem;\n  }\n\n  .tucbs-goto-error {\n    font-size: 0.75rem;\n    color: var(--cds-text-error, #da1e28);\n  }\n\n  .tucbs-goto-submit {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    height: 2.25rem;\n    border: none;\n    border-radius: 4px;\n    background: var(--cds-interactive, #0f62fe);\n    color: #ffffff;\n    font-family: inherit;\n    font-size: 0.875rem;\n    font-weight: 600;\n    cursor: pointer;\n  }\n\n  .tucbs-goto-submit:hover:not(:disabled) {\n    background: var(--cds-button-primary-hover, #0353e9);\n  }\n\n  .tucbs-goto-submit:disabled {\n    background: var(--cds-button-disabled, #c6c6c6);\n    color: var(--cds-text-on-color-disabled, #8d8d8d);\n    cursor: not-allowed;\n  }\n";
let TucbsGoToCoordinate = class extends i$2 {
  constructor() {
    super(...arguments), this["mapElementId"] = "", this["panelWidth"] = "360px", this["customCss"] = "", this["_open"] = ![], this["_lat"] = "", this["_lon"] = "", this["_layoutController"] = new PanelLayoutController(this), this["_panelEl"] = null, this["_customCssState"] = { "sheet": null };
  }
  ["connectedCallback"]() {
    super["connectedCallback"](), this["_layoutController"]["onExclusiveClose"] = () => {
      if (this["_open"]) this["_close"]();
    };
    const _0x5fc99b = document["createElement"]("tucbs-slide-over-panel");
    _0x5fc99b["panelTitle"] = "Koordinata Git", _0x5fc99b["panelWidth"] = this["panelWidth"], _0x5fc99b["onCloseRequest"] = () => this["_close"](), document["body"]["appendChild"](_0x5fc99b), this["_panelEl"] = _0x5fc99b, this["_renderIntoPanel"]();
  }
  ["disconnectedCallback"]() {
    var _a2, _b;
    if (this["map"]) this["_layoutController"]["unbindMap"](this["map"]);
    (_a2 = this["map"]) == null ? void 0 : _a2["clearMarker"](), (_b = this["_panelEl"]) == null ? void 0 : _b["remove"](), this["_panelEl"] = null, super["disconnectedCallback"]();
  }
  ["firstUpdated"]() {
    bindMapByElementId(this, { "noIdTiming": "raf", ...standardMapBindingMessages("tucbs-goto-coordinate", "islevsiz") });
  }
  ["updated"](_0x1d4bb5) {
    _0x1d4bb5["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_customCssState"], "tucbs-goto-coordinate");
    if (_0x1d4bb5["has"]("map")) {
      const _0x45eb1b = _0x1d4bb5["get"]("map");
      if (_0x45eb1b) this["_layoutController"]["unbindMap"](_0x45eb1b);
      if (this["map"]) this["_layoutController"]["bindMap"](this["map"]);
    }
    _0x1d4bb5["has"]("panelWidth") && this["_open"] && this["_layoutController"]["setOpen"](!![], this["panelWidth"]);
    if (this["_panelEl"]) this["_panelEl"]["panelWidth"] = this["panelWidth"];
    this["_renderIntoPanel"]();
  }
  ["_toggle"]() {
    if (!this["map"]) return;
    if (this["_open"]) this["_close"]();
    else this["_openPanel"]();
  }
  ["_openPanel"]() {
    this["_open"] = !![], this["_layoutController"]["setOpen"](!![], this["panelWidth"]), this["_renderIntoPanel"]();
  }
  ["_close"]() {
    var _a2;
    this["_open"] = ![], this["_layoutController"]["setOpen"](![], this["panelWidth"]), (_a2 = this["map"]) == null ? void 0 : _a2["clearMarker"](), this["_lat"] = "", this["_lon"] = "", this["_renderIntoPanel"](), this["dispatchEvent"](new CustomEvent("tucbs-goto-coordinate-closed", { "bubbles": !![], "composed": !![] }));
  }
  ["_isValid"](_0x5f5dd4, _0x1af7b5) {
    return Number["isFinite"](_0x5f5dd4) && _0x5f5dd4 >= -90 && _0x5f5dd4 <= 90 && Number["isFinite"](_0x1af7b5) && _0x1af7b5 >= -180 && _0x1af7b5 <= 180;
  }
  static ["_sanitizeCoordinateInput"](_0x48005b) {
    const _0x305ff1 = _0x48005b["trimStart"]()["startsWith"]("-"), _0x41db94 = _0x48005b["replace"](/[^0-9.,]/g, ""), _0x294446 = _0x41db94["search"](/[.,]/), _0x1e4bec = _0x294446 === -1 ? _0x41db94 : _0x41db94["slice"](0, _0x294446 + 1) + _0x41db94["slice"](_0x294446 + 1)["replaceAll"](/[.,]/g, "");
    return (_0x305ff1 ? "-" : "") + _0x1e4bec;
  }
  static ["_parseCoordinate"](_0x4fd86a) {
    return _0x4fd86a["trim"]() === "" ? Number["NaN"] : Number(_0x4fd86a["replace"](",", "."));
  }
  ["_handleCoordInput"](_0x169924, _0x55d810) {
    const _0x4dc9e2 = _0x169924["target"], _0xbde7e1 = TucbsGoToCoordinate["_sanitizeCoordinateInput"](_0x4dc9e2["value"]);
    if (_0x4dc9e2["value"] !== _0xbde7e1) _0x4dc9e2["value"] = _0xbde7e1;
    if (_0x55d810 === "lat") this["_lat"] = _0xbde7e1;
    else this["_lon"] = _0xbde7e1;
  }
  ["_handleKeydown"](_0x347e0f) {
    if (_0x347e0f["key"] === "Enter") this["_submit"]();
  }
  ["_submit"]() {
    const _0x59d84c = TucbsGoToCoordinate["_parseCoordinate"](this["_lat"]), _0x57deb9 = TucbsGoToCoordinate["_parseCoordinate"](this["_lon"]);
    if (!this["_isValid"](_0x59d84c, _0x57deb9) || !this["map"]) return;
    this["map"]["dropMarker"](_0x57deb9, _0x59d84c, GOTO_COORDINATE_PIN_URL, GOTO_COORDINATE_PIN_OPTIONS), this["map"]["interactionManager"]["flyToPosition"](_0x57deb9, _0x59d84c, { "height": 1e3, "duration": 1.5 });
  }
  ["_renderIntoPanel"]() {
    if (!this["_panelEl"]) return;
    this["_panelEl"]["open"] = this["_open"];
    const _0x13ca1d = TucbsGoToCoordinate["_parseCoordinate"](this["_lat"]), _0x22486d = TucbsGoToCoordinate["_parseCoordinate"](this["_lon"]), _0x464a89 = this["_isValid"](_0x13ca1d, _0x22486d), _0x4ba9c = (this["_lat"] !== "" || this["_lon"] !== "") && !_0x464a89;
    D(b`
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
              .value=${this["_lat"]}
              @input=${(_0xc373ea) => this["_handleCoordInput"](_0xc373ea, "lat")}
              @keydown=${(_0x2b28ce) => this["_handleKeydown"](_0x2b28ce)}
            ></cds-text-input>
          </div>
          <div>
            <span class="tucbs-goto-field-label">Boylam</span>
            <cds-text-input
              size="sm"
              label="Boylam"
              hide-label
              placeholder="ör. 32.854 veya 32,854"
              .value=${this["_lon"]}
              @input=${(_0x607df0) => this["_handleCoordInput"](_0x607df0, "lon")}
              @keydown=${(_0x318538) => this["_handleKeydown"](_0x318538)}
            ></cds-text-input>
          </div>
          ${_0x4ba9c ? b`<span class="tucbs-goto-error">Enlem -90..90, Boylam -180..180 aralığında olmalı</span>` : ""}
          <button type="button" class="tucbs-goto-submit" ?disabled=${!_0x464a89} @click=${() => this["_submit"]()}>
            Git
          </button>
        </div>
      `, this["_panelEl"]);
  }
  ["render"]() {
    return b`
      <button
        type="button"
        class="tool-button ${this["_open"] ? "active" : ""}"
        aria-label="Koordinata Git"
        data-tooltip="Koordinata Git"
        aria-pressed=${this["_open"]}
        @click=${this["_toggle"]}
      >
        ${ICON_LOCATION$1}
      </button>
    `;
  }
};
TucbsGoToCoordinate["styles"] = [leftTooltipStyles, i$5`
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
  `], __decorateClass$p([n$1()], TucbsGoToCoordinate["prototype"], "mapElementId", 2), __decorateClass$p([n$1({ "attribute": "panel-width" })], TucbsGoToCoordinate["prototype"], "panelWidth", 2), __decorateClass$p([n$1({ "attribute": "custom-css" })], TucbsGoToCoordinate["prototype"], "customCss", 2), __decorateClass$p([n$1({ "attribute": ![] })], TucbsGoToCoordinate["prototype"], "map", 2), __decorateClass$p([r()], TucbsGoToCoordinate["prototype"], "_open", 2), __decorateClass$p([r()], TucbsGoToCoordinate["prototype"], "_lat", 2), __decorateClass$p([r()], TucbsGoToCoordinate["prototype"], "_lon", 2), TucbsGoToCoordinate = __decorateClass$p([t$3("tucbs-goto-coordinate")], TucbsGoToCoordinate);
const GUIDE_STYLES = i$5`
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
function showGuide(_0xb94391, _0x30452c) {
  hideGuide();
  const _0x3bacb2 = document["createElement"]("div");
  document["body"]["appendChild"](_0x3bacb2);
  const _0x1c49cf = _0x3bacb2["attachShadow"]({ "mode": "open" }), _0x20a80b = new CSSStyleSheet();
  _0x20a80b["replaceSync"](GUIDE_STYLES["cssText"]), _0x1c49cf["adoptedStyleSheets"] = [_0x20a80b], activeGuideEl = _0x3bacb2, D(b`
      <cds-inline-notification kind="info" role="status" hide-close-button low-contrast>
        <div slot="subtitle">
          <p class="guide-title">${_0xb94391}</p>
          <ul>
            ${_0x30452c["map"]((_0x238fc5) => b`<li>${_0x238fc5}</li>`)}
          </ul>
        </div>
      </cds-inline-notification>
    `, _0x1c49cf);
}
function hideGuide() {
  activeGuideEl == null ? void 0 : activeGuideEl["remove"](), activeGuideEl = null;
}
const EXIT = "Araçtan çıkmak için sağ tıklayın.", ADD_POINT = "Haritaya sol tıklayarak nokta ekleyin.", CANCEL_DRAWING = "Çizimi Esc ile iptal edin.", FINISH_MULTI = "Çizimi çift tıklayarak bitirin.", FINISH_MEASURE = "Ölçümü çift tıklayarak bitirin.", CANCEL_MEASURE = "Ölçümü Esc ile iptal edin.", DRAW_GUIDES = { "point": { "title": "Nokta Çiz", "steps": ["Nokta eklemek için haritaya sol tıklayın.", EXIT] }, "polyline": { "title": "Çizgi Çiz", "steps": [ADD_POINT, FINISH_MULTI, CANCEL_DRAWING, EXIT] }, "polygon": { "title": "Alan Çiz", "steps": [ADD_POINT, FINISH_MULTI, CANCEL_DRAWING, EXIT] }, "rectangle": { "title": "Dikdörtgen Çiz", "steps": ["Bir köşeye sol tıklayın.", "Karşı köşeye sol tıklayarak bitirin.", CANCEL_DRAWING, EXIT] }, "circle": { "title": "Daire Çiz", "steps": ["Merkeze sol tıklayın.", "Yarıçap noktasına sol tıklayarak bitirin.", CANCEL_DRAWING, EXIT] }, "freehand": { "title": "Serbest Çizim", "steps": ["Sol tuşa basılı tutarak çizin, bırakınca bitirin.", CANCEL_DRAWING, EXIT] } }, MEASURE_GUIDES = { "polyline": { "title": "Mesafe Ölç", "steps": [ADD_POINT, FINISH_MEASURE, CANCEL_MEASURE, EXIT] }, "polygon": { "title": "Alan Ölç", "steps": [ADD_POINT, FINISH_MEASURE, CANCEL_MEASURE, EXIT] } };
function drawGuide(_0x31701a, _0x4962eb) {
  if (_0x4962eb === "measure") return MEASURE_GUIDES[_0x31701a] ?? DRAW_GUIDES[_0x31701a];
  return DRAW_GUIDES[_0x31701a];
}
var __defProp$n = Object["defineProperty"], __getOwnPropDesc$o = Object["getOwnPropertyDescriptor"], __decorateClass$o = (_0x220b84, _0x26b5f2, _0x368a87, _0x2e457c) => {
  var _0x2450c5 = _0x2e457c > 1 ? void 0 : _0x2e457c ? __getOwnPropDesc$o(_0x26b5f2, _0x368a87) : _0x26b5f2;
  for (var _0x4738f2 = _0x220b84["length"] - 1, _0x4e25f5; _0x4738f2 >= 0; _0x4738f2--) if (_0x4e25f5 = _0x220b84[_0x4738f2]) _0x2450c5 = (_0x2e457c ? _0x4e25f5(_0x26b5f2, _0x368a87, _0x2450c5) : _0x4e25f5(_0x2450c5)) || _0x2450c5;
  if (_0x2e457c && _0x2450c5) __defProp$n(_0x26b5f2, _0x368a87, _0x2450c5);
  return _0x2450c5;
};
const TOOL_ICON_NODES = { "point": _16_default$q, "polyline": _16_default$z, "polygon": _16_default$m, "rectangle": _16_default$7, "circle": _16_default$w, "freehand": _16_default$e }, MAIN_ICON$1 = o$1(iconNodeToString(_16_default$8)), iconCache$1 = /* @__PURE__ */ new Map();
function iconFor$1(_0x27fcec) {
  const _0x83e8c0 = iconCache$1["get"](_0x27fcec);
  if (_0x83e8c0) return _0x83e8c0;
  const _0x5602ca = TOOL_ICON_NODES[_0x27fcec], _0x1f24f = _0x5602ca ? o$1(iconNodeToString(_0x5602ca)) : o$1("");
  return iconCache$1["set"](_0x27fcec, _0x1f24f), _0x1f24f;
}
let TucbsDrawTool = class extends i$2 {
  constructor() {
    super(...arguments), this["mapElementId"] = "", this["tools"] = "point,polyline,polygon", this["customCss"] = "", this["_activeTool"] = null, this["_flyoutOpen"] = ![], this["_customCssState"] = { "sheet": null }, this["_onDrawStart"] = ({ tool: _0x5904a0, source: _0x41ebf0 }) => {
      this["_activeTool"] = _0x41ebf0 === "draw" && this["_toolIds"]()["includes"](_0x5904a0) ? _0x5904a0 : null;
      if (_0x41ebf0 === "draw") {
        const { title: _0x3a567c, steps: _0x1c709c } = drawGuide(_0x5904a0, "draw");
        showGuide(_0x3a567c, _0x1c709c);
      }
      this["_flyoutOpen"] = ![];
    }, this["_onDrawCancel"] = () => {
      this["_activeTool"] = null, hideGuide();
    };
  }
  ["_toolIds"]() {
    return this["tools"]["split"](",")["map"]((_0x33b9ba) => _0x33b9ba["trim"]())["filter"](Boolean);
  }
  ["disconnectedCallback"]() {
    if (this["map"]) this["_unbindDrawingManager"](this["map"]["drawingManager"]);
    if (this["_activeTool"] !== null) hideGuide();
    super["disconnectedCallback"]();
  }
  ["updated"](_0x55c3ba) {
    _0x55c3ba["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_customCssState"], "tucbs-draw-tool");
    if (_0x55c3ba["has"]("map")) {
      const _0x3b754c = _0x55c3ba["get"]("map");
      if (_0x3b754c) this["_unbindDrawingManager"](_0x3b754c["drawingManager"]);
      if (this["map"]) this["_bindDrawingManager"](this["map"]["drawingManager"]);
    }
  }
  ["_bindDrawingManager"](_0x29e525) {
    _0x29e525["on"]("draw:start", this["_onDrawStart"]), _0x29e525["on"]("draw:cancel", this["_onDrawCancel"]);
  }
  ["_unbindDrawingManager"](_0x56666a) {
    _0x56666a["off"]("draw:start", this["_onDrawStart"]), _0x56666a["off"]("draw:cancel", this["_onDrawCancel"]);
  }
  ["firstUpdated"]() {
    bindMapByElementId(this, { "noIdTiming": "raf", ...standardMapBindingMessages("tucbs-draw-tool", "islevsiz") });
  }
  ["_onMainButtonClick"]() {
    this["_flyoutOpen"] = !this["_flyoutOpen"];
  }
  ["_selectTool"](_0x29952a) {
    var _a2;
    const _0x50adcc = (_a2 = this["map"]) == null ? void 0 : _a2["drawingManager"];
    if (!_0x50adcc) return;
    this["_activeTool"] === _0x29952a ? _0x50adcc["deactivate"]() : _0x50adcc["activate"](_0x29952a, "draw"), this["_flyoutOpen"] = ![];
  }
  ["render"]() {
    const _0x37da56 = this["_activeTool"] !== null ? iconFor$1(this["_activeTool"]) : MAIN_ICON$1, _0x33e773 = this["_activeTool"] !== null ? drawGuide(this["_activeTool"], "draw")["title"] : "Çizim";
    return b`
      <div class="draw-tool">
        ${this["_flyoutOpen"] ? b`
              <div class="flyout">
                ${this["_toolIds"]()["map"]((_0x564053) => b`
                    <button
                      class="tool-button ${_0x564053 === this["_activeTool"] ? "active" : ""}"
                      type="button"
                      aria-label=${drawGuide(_0x564053, "draw")["title"]}
                      data-tooltip=${drawGuide(_0x564053, "draw")["title"]}
                      @click=${() => this["_selectTool"](_0x564053)}
                    >
                      ${iconFor$1(_0x564053)}
                    </button>
                  `)}
              </div>
            ` : null}
        <button
          class="tool-button main-button ${this["_activeTool"] !== null ? "active" : ""}"
          type="button"
          aria-label=${_0x33e773}
          data-tooltip=${_0x33e773}
          @click=${this["_onMainButtonClick"]}
        >
          ${_0x37da56}
        </button>
      </div>
    `;
  }
};
TucbsDrawTool["styles"] = [leftTooltipStyles, i$5`
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
  `], __decorateClass$o([n$1()], TucbsDrawTool["prototype"], "mapElementId", 2), __decorateClass$o([n$1()], TucbsDrawTool["prototype"], "tools", 2), __decorateClass$o([n$1({ "attribute": "custom-css" })], TucbsDrawTool["prototype"], "customCss", 2), __decorateClass$o([n$1({ "attribute": ![] })], TucbsDrawTool["prototype"], "map", 2), __decorateClass$o([r()], TucbsDrawTool["prototype"], "_activeTool", 2), __decorateClass$o([r()], TucbsDrawTool["prototype"], "_flyoutOpen", 2), TucbsDrawTool = __decorateClass$o([t$3("tucbs-draw-tool")], TucbsDrawTool);
var __defProp$m = Object["defineProperty"], __getOwnPropDesc$n = Object["getOwnPropertyDescriptor"], __decorateClass$n = (_0x50ac61, _0x50fdb9, _0x477cee, _0x1b170e) => {
  var _0x3e987f = _0x1b170e > 1 ? void 0 : _0x1b170e ? __getOwnPropDesc$n(_0x50fdb9, _0x477cee) : _0x50fdb9;
  for (var _0x42c2ad = _0x50ac61["length"] - 1, _0x52e62b; _0x42c2ad >= 0; _0x42c2ad--) if (_0x52e62b = _0x50ac61[_0x42c2ad]) _0x3e987f = (_0x1b170e ? _0x52e62b(_0x50fdb9, _0x477cee, _0x3e987f) : _0x52e62b(_0x3e987f)) || _0x3e987f;
  if (_0x1b170e && _0x3e987f) __defProp$m(_0x50fdb9, _0x477cee, _0x3e987f);
  return _0x3e987f;
};
const ICON_TRASH_CAN = o$1(iconNodeToString(_16_default$6));
let TucbsDeleteTool = class extends i$2 {
  constructor() {
    super(...arguments), this["mapElementId"] = "", this["customCss"] = "", this["_confirming"] = ![], this["_customCssState"] = { "sheet": null };
  }
  ["updated"](_0x1b0147) {
    _0x1b0147["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_customCssState"], "tucbs-delete-tool");
  }
  ["firstUpdated"]() {
    bindMapByElementId(this, { "noIdTiming": "raf", ...standardMapBindingMessages("tucbs-delete-tool", "islevsiz") });
  }
  ["_openConfirm"]() {
    var _a2;
    if ((((_a2 = this["map"]) == null ? void 0 : _a2["drawingManager"]["getShapes"]()["length"]) ?? 0) === 0) return;
    this["_confirming"] = !![];
  }
  ["_cancel"]() {
    this["_confirming"] = ![];
  }
  ["_confirmDelete"]() {
    var _a2;
    const _0x265f6f = (_a2 = this["map"]) == null ? void 0 : _a2["drawingManager"];
    this["_confirming"] = ![];
    if (!_0x265f6f) return;
    if (_0x265f6f["isActive"]()) _0x265f6f["deactivate"]();
    _0x265f6f["clearAll"]();
  }
  ["render"]() {
    return b`
      <div class="delete-tool">
        ${this["_confirming"] ? b`
              <cds-actionable-notification
                class="confirm"
                kind="warning"
                title="Tüm çizimler kalıcı olarak silinecektir. Emin misiniz?"
                action-button-label="Sil"
                @cds-notification-closed=${this["_cancel"]}
              >
                <cds-actionable-notification-button slot="action" @click=${this["_confirmDelete"]}>
                  Sil
                </cds-actionable-notification-button>
              </cds-actionable-notification>
            ` : null}
        <button
          class="tool-button"
          type="button"
          data-tooltip="Tümünü Sil"
          aria-label="Tümünü Sil"
          @click=${this["_openConfirm"]}
        >
          ${ICON_TRASH_CAN}
        </button>
      </div>
    `;
  }
};
TucbsDeleteTool["styles"] = [leftTooltipStyles, i$5`
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
  `], __decorateClass$n([n$1()], TucbsDeleteTool["prototype"], "mapElementId", 2), __decorateClass$n([n$1({ "attribute": "custom-css" })], TucbsDeleteTool["prototype"], "customCss", 2), __decorateClass$n([n$1({ "attribute": ![] })], TucbsDeleteTool["prototype"], "map", 2), __decorateClass$n([r()], TucbsDeleteTool["prototype"], "_confirming", 2), TucbsDeleteTool = __decorateClass$n([t$3("tucbs-delete-tool")], TucbsDeleteTool);
function metersToReadable(_0x4b2f53) {
  if (!isFinite(_0x4b2f53)) return "-";
  return _0x4b2f53 < 1e3 ? _0x4b2f53["toFixed"](2) + " m" : (_0x4b2f53 / 1e3)["toFixed"](2) + " km";
}
function sqmToReadable(_0x39f0fb) {
  if (!isFinite(_0x39f0fb)) return "-";
  return _0x39f0fb < 1e6 ? _0x39f0fb["toFixed"](2) + " m²" : (_0x39f0fb / 1e6)["toFixed"](2) + " km²";
}
var __defProp$l = Object["defineProperty"], __getOwnPropDesc$m = Object["getOwnPropertyDescriptor"], __decorateClass$m = (_0x2c7bc7, _0xe12836, _0x2282e4, _0x26d142) => {
  var _0x37cccb = _0x26d142 > 1 ? void 0 : _0x26d142 ? __getOwnPropDesc$m(_0xe12836, _0x2282e4) : _0xe12836;
  for (var _0x1024c7 = _0x2c7bc7["length"] - 1, _0x1e0210; _0x1024c7 >= 0; _0x1024c7--) if (_0x1e0210 = _0x2c7bc7[_0x1024c7]) _0x37cccb = (_0x26d142 ? _0x1e0210(_0xe12836, _0x2282e4, _0x37cccb) : _0x1e0210(_0x37cccb)) || _0x37cccb;
  if (_0x26d142 && _0x37cccb) __defProp$l(_0xe12836, _0x2282e4, _0x37cccb);
  return _0x37cccb;
};
const MODE_TOOL = { "distance": "polyline", "area": "polygon" }, MODE_ICON_NODES = { "distance": _16_default$b, "area": _16_default$A };
function modeLabel(_0x371d09) {
  return drawGuide(MODE_TOOL[_0x371d09], "measure")["title"];
}
const MAIN_ICON = o$1(iconNodeToString(_16_default$a)), iconCache = /* @__PURE__ */ new Map();
function iconFor(_0x37f14a) {
  const _0x4d2fe7 = iconCache["get"](_0x37f14a);
  if (_0x4d2fe7) return _0x4d2fe7;
  const _0x4c6c92 = o$1(iconNodeToString(MODE_ICON_NODES[_0x37f14a]));
  return iconCache["set"](_0x37f14a, _0x4c6c92), _0x4c6c92;
}
const EARTH_RADIUS_METERS = 6378137;
function projectMeters(_0x4e5be1, _0x4627a5) {
  const _0x311edb = _0xf1e7b["toRadians"](_0x4e5be1[0]) * Math["cos"](_0xf1e7b["toRadians"](_0x4627a5)) * EARTH_RADIUS_METERS, _0x2db472 = _0xf1e7b["toRadians"](_0x4e5be1[1]) * EARTH_RADIUS_METERS;
  return [_0x311edb, _0x2db472];
}
function polygonAreaMeters(_0x313747) {
  if (_0x313747["length"] < 3) return 0;
  const _0x3dca80 = _0x313747[0];
  if (_0x3dca80 === void 0) return 0;
  const _0x1d103c = _0x3dca80[1], _0x232ad0 = _0x313747["map"]((_0xcc77fa) => projectMeters(_0xcc77fa, _0x1d103c));
  let _0x5e7c38 = 0;
  for (let _0x559183 = 0; _0x559183 < _0x232ad0["length"]; _0x559183++) {
    const _0x6814b0 = _0x232ad0[_0x559183], _0x578018 = _0x232ad0[(_0x559183 + 1) % _0x232ad0["length"]];
    if (_0x6814b0 === void 0 || _0x578018 === void 0) continue;
    _0x5e7c38 += _0x6814b0[0] * _0x578018[1] - _0x578018[0] * _0x6814b0[1];
  }
  return Math["abs"](_0x5e7c38) / 2;
}
function toCartesian(_0x5434c3) {
  return Cartesian3["fromDegrees"](_0x5434c3[0], _0x5434c3[1]);
}
function centroidOf(_0x5a328d) {
  let _0x2613d4 = 0, _0x880530 = 0, _0x453b74 = 0;
  for (const _0x2c0ec1 of _0x5a328d) {
    const _0xd641de = toCartesian(_0x2c0ec1);
    _0x2613d4 += _0xd641de["x"], _0x880530 += _0xd641de["y"], _0x453b74 += _0xd641de["z"];
  }
  const _0x2f42d3 = _0x5a328d["length"] || 1;
  return new Cartesian3(_0x2613d4 / _0x2f42d3, _0x880530 / _0x2f42d3, _0x453b74 / _0x2f42d3);
}
function perimeterMeters(_0x49716b) {
  if (_0x49716b["length"] < 2) return 0;
  const _0x5d2d4a = _0x49716b["map"](toCartesian);
  let _0x316546 = 0;
  for (let _0x1cfa8f = 0; _0x1cfa8f < _0x5d2d4a["length"] - 1; _0x1cfa8f++) {
    _0x316546 += Cartesian3["distance"](_0x5d2d4a[_0x1cfa8f], _0x5d2d4a[_0x1cfa8f + 1]);
  }
  return _0x5d2d4a["length"] >= 3 && (_0x316546 += Cartesian3["distance"](_0x5d2d4a[_0x5d2d4a["length"] - 1], _0x5d2d4a[0])), _0x316546;
}
const LABEL_FONT = "13px sans-serif", SEGMENT_LABEL_BG = Color["BLACK"]["withAlpha"](0.5), AREA_LABEL_BG = Color["BLACK"]["withAlpha"](0.45), TOTAL_LABEL_BG = Color["fromCssColorString"]("#1d4ed8")["withAlpha"](0.8), HIDDEN_POS = Cartesian3["fromDegrees"](0, 0, -1);
let TucbsMeasureTool = class extends i$2 {
  constructor() {
    super(...arguments), this["mapElementId"] = "", this["customCss"] = "", this["_activeMode"] = null, this["_flyoutOpen"] = ![], this["_customCssState"] = { "sheet": null }, this["_committedCoords"] = [], this["_pendingLabels"] = [], this["_shapeLabels"] = /* @__PURE__ */ new Map(), this["_claimingActivation"] = ![], this["_isSessionOwner"] = ![], this["_onDrawStart"] = ({ tool: _0x2d1957, source: _0x55cbd1 }) => {
      if (_0x55cbd1 !== "measure") {
        this["_activeMode"] = null, this["_isSessionOwner"] = ![];
        return;
      }
      this["_activeMode"] = _0x2d1957 === "polyline" ? "distance" : "area", this["_flyoutOpen"] = ![];
      const { title: _0x454676, steps: _0x382454 } = drawGuide(_0x2d1957, "measure");
      showGuide(_0x454676, _0x382454), this["_isSessionOwner"] = this["_claimingActivation"], this["_claimingActivation"] = ![], this["_isSessionOwner"] && (this["_committedCoords"] = [], this["_livePreviewCoord"] = void 0, this["_pendingLabels"] = [], this["_ensureLiveLabels"]());
    }, this["_onDrawCancel"] = () => {
      this["_isSessionOwner"] && (this["_removeLiveLabels"](), this["_removePendingLabels"]()), this["_activeMode"] = null, this["_isSessionOwner"] = ![], hideGuide();
    }, this["_onAbort"] = () => {
      if (!this["_isSessionOwner"]) return;
      this["_removePendingLabels"]();
    }, this["_onVertex"] = ({ coordinates: _0x2b0534 }) => {
      if (!this["_isSessionOwner"]) return;
      const _0x4da881 = this["_committedCoords"][this["_committedCoords"]["length"] - 1];
      this["_committedCoords"]["push"](_0x2b0534), _0x4da881 !== void 0 && this["_pendingLabels"]["push"](this["_addStaticSegmentLabel"](_0x4da881, _0x2b0534));
    }, this["_onMove"] = ({ coordinates: _0x2aaa43 }) => {
      if (!this["_isSessionOwner"]) return;
      this["_livePreviewCoord"] = _0x2aaa43;
    }, this["_onComplete"] = ({ shape: _0x4a3406 }) => {
      if (!this["_isSessionOwner"]) return;
      while (this["_committedCoords"]["length"] > _0x4a3406["coordinates"]["length"]) {
        this["_committedCoords"]["pop"]();
        const _0x1e8926 = this["_pendingLabels"]["pop"]();
        if (_0x1e8926) this["_removeEntity"](_0x1e8926);
      }
      if (this["_activeMode"] === "distance" && _0x4a3406["length"] !== void 0) this["_pendingLabels"]["push"](this["_addTotalDistanceLabel"](_0x4a3406));
      else this["_activeMode"] === "area" && _0x4a3406["area"] !== void 0 && _0x4a3406["perimeter"] !== void 0 && this["_pendingLabels"]["push"](this["_addAreaSummaryLabel"](_0x4a3406));
      this["_shapeLabels"]["set"](_0x4a3406["id"], this["_pendingLabels"]), this["_pendingLabels"] = [], this["_committedCoords"] = [], this["_livePreviewCoord"] = void 0;
    }, this["_onRemove"] = ({ id: _0x5ccc56 }) => {
      const _0x5b43f2 = this["_shapeLabels"]["get"](_0x5ccc56);
      if (!_0x5b43f2) return;
      for (const _0x57ea75 of _0x5b43f2) this["_removeEntity"](_0x57ea75);
      this["_shapeLabels"]["delete"](_0x5ccc56);
    }, this["_onMeasureLayerVisibility"] = ({ id: _0x4e1fe4, visible: _0x1d29a8 }) => {
      if (_0x4e1fe4 !== MEASURE_LAYER_ID) return;
      for (const _0x196a98 of this["_allLabelEntities"]()) _0x196a98["show"] = _0x1d29a8;
    }, this["_onMeasureLayerRemove"] = ({ layer: _0x2e2e7f }) => {
      if (_0x2e2e7f["id"] !== MEASURE_LAYER_ID) return;
      for (const _0x2eccb8 of this["_allLabelEntities"]()) this["_removeEntity"](_0x2eccb8);
      this["_shapeLabels"]["clear"](), this["_pendingLabels"] = [], this["_liveSegmentLabel"] = void 0, this["_liveAreaLabel"] = void 0;
    };
  }
  ["_allLabelEntities"]() {
    const _0x866c36 = [...this["_pendingLabels"]];
    for (const _0x247c2d of this["_shapeLabels"]["values"]()) _0x866c36["push"](..._0x247c2d);
    if (this["_liveSegmentLabel"]) _0x866c36["push"](this["_liveSegmentLabel"]);
    if (this["_liveAreaLabel"]) _0x866c36["push"](this["_liveAreaLabel"]);
    return _0x866c36;
  }
  ["_bindLayerManager"](_0x9955b) {
    _0x9955b["on"]("layer:visibility", this["_onMeasureLayerVisibility"]), _0x9955b["on"]("layer:remove", this["_onMeasureLayerRemove"]);
  }
  ["_unbindLayerManager"](_0x56d725) {
    _0x56d725["off"]("layer:visibility", this["_onMeasureLayerVisibility"]), _0x56d725["off"]("layer:remove", this["_onMeasureLayerRemove"]);
  }
  ["disconnectedCallback"]() {
    this["map"] && (this["_unbindDrawingManager"](this["map"]["drawingManager"]), this["_unbindLayerManager"](this["map"]["layerManager"]));
    this["_removeLiveLabels"](), this["_removePendingLabels"]();
    if (this["_activeMode"] !== null) hideGuide();
    super["disconnectedCallback"]();
  }
  ["updated"](_0x49a726) {
    _0x49a726["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_customCssState"], "tucbs-measure-tool");
    if (_0x49a726["has"]("map")) {
      const _0x1520ee = _0x49a726["get"]("map");
      _0x1520ee && (this["_unbindDrawingManager"](_0x1520ee["drawingManager"]), this["_unbindLayerManager"](_0x1520ee["layerManager"])), this["map"] && (this["_bindDrawingManager"](this["map"]["drawingManager"]), this["_bindLayerManager"](this["map"]["layerManager"]));
    }
  }
  ["_bindDrawingManager"](_0x332119) {
    _0x332119["on"]("draw:start", this["_onDrawStart"]), _0x332119["on"]("draw:cancel", this["_onDrawCancel"]), _0x332119["on"]("draw:abort", this["_onAbort"]), _0x332119["on"]("draw:vertex", this["_onVertex"]), _0x332119["on"]("draw:move", this["_onMove"]), _0x332119["on"]("draw:complete", this["_onComplete"]), _0x332119["on"]("draw:remove", this["_onRemove"]);
  }
  ["_unbindDrawingManager"](_0x1fa305) {
    _0x1fa305["off"]("draw:start", this["_onDrawStart"]), _0x1fa305["off"]("draw:cancel", this["_onDrawCancel"]), _0x1fa305["off"]("draw:abort", this["_onAbort"]), _0x1fa305["off"]("draw:vertex", this["_onVertex"]), _0x1fa305["off"]("draw:move", this["_onMove"]), _0x1fa305["off"]("draw:complete", this["_onComplete"]), _0x1fa305["off"]("draw:remove", this["_onRemove"]);
  }
  ["firstUpdated"]() {
    bindMapByElementId(this, { "noIdTiming": "raf", ...standardMapBindingMessages("tucbs-measure-tool", "islevsiz") });
  }
  ["_onMainButtonClick"]() {
    this["_flyoutOpen"] = !this["_flyoutOpen"];
  }
  ["_selectMode"](_0x5e0656) {
    var _a2;
    const _0x252141 = (_a2 = this["map"]) == null ? void 0 : _a2["drawingManager"];
    if (!_0x252141) return;
    this["_activeMode"] === _0x5e0656 ? _0x252141["deactivate"]() : (this["_claimingActivation"] = !![], _0x252141["activate"](MODE_TOOL[_0x5e0656], "measure")), this["_flyoutOpen"] = ![];
  }
  ["_removeEntity"](_0x225305) {
    var _a2;
    (_a2 = this["map"]) == null ? void 0 : _a2["viewer"]["entities"]["remove"](_0x225305);
  }
  ["_removeLiveLabels"]() {
    this["_liveSegmentLabel"] && (this["_removeEntity"](this["_liveSegmentLabel"]), this["_liveSegmentLabel"] = void 0), this["_liveAreaLabel"] && (this["_removeEntity"](this["_liveAreaLabel"]), this["_liveAreaLabel"] = void 0);
  }
  ["_removePendingLabels"]() {
    for (const _0x256fad of this["_pendingLabels"]) this["_removeEntity"](_0x256fad);
    this["_pendingLabels"] = [], this["_committedCoords"] = [], this["_livePreviewCoord"] = void 0;
  }
  ["_liveSegmentMidpoint"]() {
    const _0x3df79d = this["_committedCoords"][this["_committedCoords"]["length"] - 1];
    if (_0x3df79d === void 0 || this["_livePreviewCoord"] === void 0) return void 0;
    return Cartesian3["midpoint"](toCartesian(_0x3df79d), toCartesian(this["_livePreviewCoord"]), new Cartesian3());
  }
  ["_liveSegmentDistance"]() {
    const _0x1e63b = this["_committedCoords"][this["_committedCoords"]["length"] - 1];
    if (_0x1e63b === void 0 || this["_livePreviewCoord"] === void 0) return void 0;
    return Cartesian3["distance"](toCartesian(_0x1e63b), toCartesian(this["_livePreviewCoord"]));
  }
  ["_livePolygonCoords"]() {
    return this["_livePreviewCoord"] ? [...this["_committedCoords"], this["_livePreviewCoord"]] : [...this["_committedCoords"]];
  }
  ["_ensureLiveLabels"]() {
    var _a2;
    const _0xa3c4a = (_a2 = this["map"]) == null ? void 0 : _a2["viewer"];
    if (!_0xa3c4a) return;
    this["_liveSegmentLabel"] === void 0 && (this["_liveSegmentLabel"] = _0xa3c4a["entities"]["add"]({ "position": new CallbackPositionProperty(() => this["_liveSegmentMidpoint"]() ?? HIDDEN_POS, ![]), "label": { "text": new CallbackProperty(() => {
      const _0x1e9e26 = this["_liveSegmentDistance"]();
      return _0x1e9e26 === void 0 ? "" : metersToReadable(_0x1e9e26);
    }, ![]), "show": new CallbackProperty(() => this["_liveSegmentMidpoint"]() !== void 0, ![]), "showBackground": !![], "backgroundColor": SEGMENT_LABEL_BG, "font": LABEL_FONT, "style": LabelStyle["FILL"], "pixelOffset": new Cartesian2(0, -12), "heightReference": HeightReference["CLAMP_TO_GROUND"], "verticalOrigin": VerticalOrigin["BOTTOM"] } })), this["_liveAreaLabel"] === void 0 && (this["_liveAreaLabel"] = _0xa3c4a["entities"]["add"]({ "position": new CallbackPositionProperty(() => {
      const _0x509f09 = this["_livePolygonCoords"]();
      return _0x509f09["length"] >= 3 ? centroidOf(_0x509f09) : HIDDEN_POS;
    }, ![]), "label": { "text": new CallbackProperty(() => {
      const _0x119dcb = this["_livePolygonCoords"]();
      if (_0x119dcb["length"] < 3) return "";
      const _0x3d59f8 = polygonAreaMeters(_0x119dcb), _0x77083d = perimeterMeters(_0x119dcb);
      return "Alan: " + sqmToReadable(_0x3d59f8) + "\nÇevre: " + metersToReadable(_0x77083d);
    }, ![]), "show": new CallbackProperty(() => this["_activeMode"] === "area" && this["_livePolygonCoords"]()["length"] >= 3, ![]), "showBackground": !![], "backgroundColor": AREA_LABEL_BG, "font": LABEL_FONT, "style": LabelStyle["FILL"], "disableDepthTestDistance": Number["POSITIVE_INFINITY"] } }));
  }
  ["_addStaticSegmentLabel"](_0x3e665a, _0xfef48b) {
    const _0x1e2820 = toCartesian(_0x3e665a), _0x2eebe1 = toCartesian(_0xfef48b), _0xcbef06 = Cartesian3["midpoint"](_0x1e2820, _0x2eebe1, new Cartesian3()), _0x5905d8 = Cartesian3["distance"](_0x1e2820, _0x2eebe1);
    return this["map"]["viewer"]["entities"]["add"]({ "position": _0xcbef06, "label": { "text": metersToReadable(_0x5905d8), "showBackground": !![], "backgroundColor": SEGMENT_LABEL_BG, "font": LABEL_FONT, "style": LabelStyle["FILL"], "pixelOffset": new Cartesian2(0, -12), "heightReference": HeightReference["CLAMP_TO_GROUND"], "verticalOrigin": VerticalOrigin["BOTTOM"] } });
  }
  ["_addTotalDistanceLabel"](_0x1687f0) {
    const _0x46037b = _0x1687f0["coordinates"][_0x1687f0["coordinates"]["length"] - 1], _0x24d58e = _0x46037b ? toCartesian(_0x46037b) : HIDDEN_POS;
    return this["map"]["viewer"]["entities"]["add"]({ "position": _0x24d58e, "label": { "text": "Toplam: " + metersToReadable(_0x1687f0["length"] ?? 0), "showBackground": !![], "backgroundColor": TOTAL_LABEL_BG, "fillColor": Color["WHITE"], "font": LABEL_FONT, "style": LabelStyle["FILL"], "pixelOffset": new Cartesian2(0, 14), "heightReference": HeightReference["CLAMP_TO_GROUND"], "verticalOrigin": VerticalOrigin["TOP"] } });
  }
  ["_addAreaSummaryLabel"](_0x11afaf) {
    const _0x5f27c5 = centroidOf(_0x11afaf["coordinates"]);
    return this["map"]["viewer"]["entities"]["add"]({ "position": _0x5f27c5, "label": { "text": "Alan: " + sqmToReadable(_0x11afaf["area"] ?? 0) + "\nÇevre: " + metersToReadable(_0x11afaf["perimeter"] ?? 0), "showBackground": !![], "backgroundColor": AREA_LABEL_BG, "font": LABEL_FONT, "style": LabelStyle["FILL"], "disableDepthTestDistance": Number["POSITIVE_INFINITY"] } });
  }
  ["render"]() {
    const _0x440a51 = this["_activeMode"] !== null ? iconFor(this["_activeMode"]) : MAIN_ICON, _0x284acd = this["_activeMode"] !== null ? modeLabel(this["_activeMode"]) : "Ölçüm";
    return b`
      <div class="measure-tool">
        ${this["_flyoutOpen"] ? b`
              <div class="flyout">
                ${["distance", "area"]["map"]((_0x2f5e09) => b`
                    <button
                      class="tool-button ${_0x2f5e09 === this["_activeMode"] ? "active" : ""}"
                      type="button"
                      aria-label=${modeLabel(_0x2f5e09)}
                      data-tooltip=${modeLabel(_0x2f5e09)}
                      @click=${() => this["_selectMode"](_0x2f5e09)}
                    >
                      ${iconFor(_0x2f5e09)}
                    </button>
                  `)}
              </div>
            ` : null}
        <button
          class="tool-button main-button ${this["_activeMode"] !== null ? "active" : ""}"
          type="button"
          aria-label=${_0x284acd}
          data-tooltip=${_0x284acd}
          @click=${this["_onMainButtonClick"]}
        >
          ${_0x440a51}
        </button>
      </div>
    `;
  }
};
TucbsMeasureTool["styles"] = [leftTooltipStyles, i$5`
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
  `], __decorateClass$m([n$1()], TucbsMeasureTool["prototype"], "mapElementId", 2), __decorateClass$m([n$1({ "attribute": "custom-css" })], TucbsMeasureTool["prototype"], "customCss", 2), __decorateClass$m([n$1({ "attribute": ![] })], TucbsMeasureTool["prototype"], "map", 2), __decorateClass$m([r()], TucbsMeasureTool["prototype"], "_activeMode", 2), __decorateClass$m([r()], TucbsMeasureTool["prototype"], "_flyoutOpen", 2), TucbsMeasureTool = __decorateClass$m([t$3("tucbs-measure-tool")], TucbsMeasureTool);
var __defProp$k = Object["defineProperty"], __getOwnPropDesc$l = Object["getOwnPropertyDescriptor"], __decorateClass$l = (_0x367e10, _0x1c6c41, _0x25cbb7, _0x22438e) => {
  var _0x825265 = _0x22438e > 1 ? void 0 : _0x22438e ? __getOwnPropDesc$l(_0x1c6c41, _0x25cbb7) : _0x1c6c41;
  for (var _0x22a107 = _0x367e10["length"] - 1, _0x109b85; _0x22a107 >= 0; _0x22a107--) if (_0x109b85 = _0x367e10[_0x22a107]) _0x825265 = (_0x22438e ? _0x109b85(_0x1c6c41, _0x25cbb7, _0x825265) : _0x109b85(_0x825265)) || _0x825265;
  if (_0x22438e && _0x825265) __defProp$k(_0x1c6c41, _0x25cbb7, _0x825265);
  return _0x825265;
};
const ICON_DOWNLOAD$1 = o$1(iconNodeToString(_16_default$p));
let TucbsMapExport = class extends i$2 {
  constructor() {
    super(...arguments), this["mapElementId"] = "", this["filename"] = "tucbs-harita", this["customCss"] = "", this["_busy"] = ![], this["_customCssState"] = { "sheet": null };
  }
  ["updated"](_0x5d4ec2) {
    _0x5d4ec2["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_customCssState"], "tucbs-map-export");
  }
  ["firstUpdated"]() {
    bindMapByElementId(this, { "noIdTiming": "raf", ...standardMapBindingMessages("tucbs-map-export", "islevsiz") });
  }
  async ["_onClick"]() {
    if (this["_busy"] || !this["map"]) return;
    this["_busy"] = !![];
    try {
      await this["map"]["exportJPEG"](this["filename"]);
    } finally {
      this["_busy"] = ![];
    }
  }
  ["render"]() {
    return b`
      <button
        class="tool-button"
        type="button"
        aria-label="Haritayı İndir (JPG)"
        data-tooltip="Haritayı İndir (JPG)"
        ?disabled=${this["_busy"]}
        @click=${this["_onClick"]}
      >
        ${ICON_DOWNLOAD$1}
      </button>
    `;
  }
};
TucbsMapExport["styles"] = [leftTooltipStyles, i$5`
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
  `], __decorateClass$l([n$1()], TucbsMapExport["prototype"], "mapElementId", 2), __decorateClass$l([n$1()], TucbsMapExport["prototype"], "filename", 2), __decorateClass$l([n$1({ "attribute": "custom-css" })], TucbsMapExport["prototype"], "customCss", 2), __decorateClass$l([n$1({ "attribute": ![] })], TucbsMapExport["prototype"], "map", 2), __decorateClass$l([r()], TucbsMapExport["prototype"], "_busy", 2), TucbsMapExport = __decorateClass$l([t$3("tucbs-map-export")], TucbsMapExport);
const SIYASI_THUMB = "data:image/jpeg;base64,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", TEMEL_THUMB = "data:image/jpeg;base64,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", ORTOFOTO_THUMB = "data:image/jpeg;base64,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", YUKSEKLIK_THUMB = "data:image/jpeg;base64,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";
var __defProp$j = Object["defineProperty"], __getOwnPropDesc$k = Object["getOwnPropertyDescriptor"], __decorateClass$k = (_0x5843d1, _0x4ea14d, _0x32f438, _0x1c88f3) => {
  var _0x1cbc88 = _0x1c88f3 > 1 ? void 0 : _0x1c88f3 ? __getOwnPropDesc$k(_0x4ea14d, _0x32f438) : _0x4ea14d;
  for (var _0x128633 = _0x5843d1["length"] - 1, _0x5b2f34; _0x128633 >= 0; _0x128633--) if (_0x5b2f34 = _0x5843d1[_0x128633]) _0x1cbc88 = (_0x1c88f3 ? _0x5b2f34(_0x4ea14d, _0x32f438, _0x1cbc88) : _0x5b2f34(_0x1cbc88)) || _0x1cbc88;
  if (_0x1c88f3 && _0x1cbc88) __defProp$j(_0x4ea14d, _0x32f438, _0x1cbc88);
  return _0x1cbc88;
};
const ICON_CHEVRON_RIGHT = o$1(iconNodeToString(_16_default$x)), ICON_CLOSE$3 = o$1(iconNodeToString(_16_default$v)), ICON_CHECK = o$1(iconNodeToString(_16_default$y)), ICON_WARNING = o$1(iconNodeToString(_16_default$2)), ICON_MAP = o$1(iconNodeToString(_16_default$h)), PENDING_INDICATOR_DELAY_MS = 1500, DEFAULT_BASEMAPS = [{ "id": "hgm-siyasi", "label": "HGM Siyasi", "thumbnail": SIYASI_THUMB }, { "id": "hgm-yukseklik", "label": "HGM Yükseklik", "thumbnail": YUKSEKLIK_THUMB }, { "id": "hgm-ortofoto", "label": "HGM Ortofoto", "thumbnail": ORTOFOTO_THUMB }, { "id": "hgm-temel", "label": "HGM Temel", "thumbnail": TEMEL_THUMB }];
let TucbsBasemapPicker = class extends i$2 {
  constructor() {
    super(...arguments), this["mapElementId"] = "", this["activeBasemap"] = "", this["basemaps"] = DEFAULT_BASEMAPS, this["customCss"] = "", this["embedded"] = ![], this["_open"] = ![], this["_error"] = ![], this["_pending"] = ![], this["_customCssState"] = { "sheet": null }, this["_pendingTimer"] = null, this["_timers"] = new TimerBag(this), this["_onLayerAdd"] = (_0x257a7a) => {
      if (!_0x257a7a["layer"]["isBasemap"]) return;
      this["activeBasemap"] = _0x257a7a["layer"]["title"], this["_clearPendingTimer"](), this["_pending"] = ![], this["_pendingTimer"] = this["_timers"]["setTimeout"](() => {
        this["_pendingTimer"] = null, this["_pending"] = !![];
      }, PENDING_INDICATOR_DELAY_MS);
    }, this["_onBasemapError"] = () => {
      this["_clearPendingTimer"](), this["_pending"] = ![], this["_error"] = !![];
    }, this["_onBasemapRecovered"] = () => {
      this["_clearPendingTimer"](), this["_pending"] = ![], this["_error"] = ![];
    };
  }
  ["_clearPendingTimer"]() {
    this["_pendingTimer"] !== null && (this["_timers"]["clearTimeout"](this["_pendingTimer"]), this["_pendingTimer"] = null);
  }
  ["disconnectedCallback"]() {
    this["_clearPendingTimer"]();
    if (this["map"]) this["_unbindMap"](this["map"]);
    super["disconnectedCallback"]();
  }
  ["firstUpdated"]() {
    bindMapByElementId(this, { "noIdTiming": "raf", ...standardMapBindingMessages("tucbs-basemap-picker", "gizli") });
  }
  ["updated"](_0x4b56ca) {
    var _a2;
    _0x4b56ca["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_customCssState"], "tucbs-basemap-picker");
    if (_0x4b56ca["has"]("map")) {
      const _0x500e35 = _0x4b56ca["get"]("map");
      if (_0x500e35) this["_unbindMap"](_0x500e35);
      if (this["map"]) this["_bindMap"](this["map"]);
    }
    if (_0x4b56ca["has"]("activeBasemap") && this["activeBasemap"] && this["map"]) {
      const _0x264372 = (_a2 = this["map"]["layerManager"]["getLayers"]()["find"]((_0x1f87b1) => _0x1f87b1["isBasemap"])) == null ? void 0 : _a2["title"];
      _0x264372 !== this["activeBasemap"] && this["map"]["setBasemap"](this["activeBasemap"]);
    }
  }
  ["_bindMap"](_0x11cb7a) {
    _0x11cb7a["layerManager"]["on"]("layer:add", this["_onLayerAdd"]), _0x11cb7a["layerManager"]["on"]("basemap:error", this["_onBasemapError"]), _0x11cb7a["layerManager"]["on"]("basemap:recovered", this["_onBasemapRecovered"]), this["_syncFromMap"](_0x11cb7a);
    if (_0x11cb7a["basemapStatus"] === "unavailable") this["_error"] = !![];
    else _0x11cb7a["basemapStatus"] === "loading" && (this["_pending"] = !![]);
  }
  ["_unbindMap"](_0x563108) {
    _0x563108["layerManager"]["off"]("layer:add", this["_onLayerAdd"]), _0x563108["layerManager"]["off"]("basemap:error", this["_onBasemapError"]), _0x563108["layerManager"]["off"]("basemap:recovered", this["_onBasemapRecovered"]);
  }
  ["_syncFromMap"](_0x7c531a) {
    const _0x3a538f = _0x7c531a["layerManager"]["getLayers"]()["find"]((_0x25c9b5) => _0x25c9b5["isBasemap"]);
    if (_0x3a538f) this["activeBasemap"] = _0x3a538f["title"];
  }
  ["_select"](_0x13528f) {
    if (this["_error"] || this["_pending"]) return;
    this["_clearPendingTimer"](), this["_pending"] = ![], this["_pendingTimer"] = this["_timers"]["setTimeout"](() => {
      this["_pendingTimer"] = null, this["_pending"] = !![];
    }, PENDING_INDICATOR_DELAY_MS), this["activeBasemap"] = _0x13528f;
  }
  ["_openPanel"]() {
    this["_open"] = !![];
  }
  ["_closePanel"]() {
    this["_open"] = ![];
  }
  ["_renderCard"](_0x3a1dca) {
    const _0x443db1 = _0x3a1dca["id"] === this["activeBasemap"];
    return b`
      <button
        type="button"
        class="card ${_0x443db1 ? "selected" : ""}"
        style="background-image: url('${_0x3a1dca["thumbnail"]}')"
        role="radio"
        aria-checked=${_0x443db1}
        ?disabled=${this["_error"] || this["_pending"]}
        aria-disabled=${this["_error"] || this["_pending"]}
        @click=${() => this["_select"](_0x3a1dca["id"])}
      >
        ${_0x443db1 ? b`<span class="check-badge">${ICON_CHECK}</span>` : A}
        <span class="card-label">${_0x3a1dca["label"]}</span>
      </button>
    `;
  }
  ["_renderGrid"]() {
    return b`
      <div class="grid" role="radiogroup" aria-label="Altlık Haritalar" aria-disabled=${this["_error"] || this["_pending"]}>
        ${c(this["basemaps"], (_0x2320e9) => _0x2320e9["id"], (_0x2a9e30) => this["_renderCard"](_0x2a9e30))}
      </div>
    `;
  }
  ["_renderErrorBanner"]() {
    if (!this["_error"]) return A;
    return b`
      <div class="error-banner" role="alert">
        ${ICON_WARNING}
        <span>Altlık Haritalar servisine erişilemiyor.</span>
      </div>
    `;
  }
  ["_renderLoadingBanner"]() {
    if (!this["_pending"] || this["_error"]) return A;
    return b`
      <div class="loading-banner" role="status">
        <span class="loading-spinner"></span>
        <span>Altlık Haritalar yükleniyor…</span>
      </div>
    `;
  }
  ["render"]() {
    if (!this["map"]) return A;
    if (this["embedded"]) return b`
        <div class="panel">
          <span class="title">Altlık Haritalar</span>
          ${this["_renderErrorBanner"]()}
          ${this["_renderLoadingBanner"]()}
          ${this["_renderGrid"]()}
        </div>
      `;
    if (!this["_open"]) return b`
        <button type="button" class="toggle-btn ${this["_error"] ? "has-error" : ""}" @click=${() => this["_openPanel"]()}>
          Altlık Haritalar
          ${this["_error"] ? ICON_WARNING : A}
          <span class="toggle-arrow" aria-hidden="true">${ICON_CHEVRON_RIGHT}</span>
        </button>
      `;
    return b`
      <div class="panel">
        <div class="header">
          <span class="title"><span class="title-icon">${ICON_MAP}</span>Altlık Haritalar</span>
          <button type="button" class="close-btn" aria-label="Kapat" @click=${() => this["_closePanel"]()}>
            ${ICON_CLOSE$3}
          </button>
        </div>
        ${this["_renderErrorBanner"]()}
        ${this["_renderLoadingBanner"]()}
        ${this["_renderGrid"]()}
      </div>
    `;
  }
};
TucbsBasemapPicker["styles"] = i$5`
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
  `, __decorateClass$k([n$1()], TucbsBasemapPicker["prototype"], "mapElementId", 2), __decorateClass$k([n$1({ "attribute": "active-basemap" })], TucbsBasemapPicker["prototype"], "activeBasemap", 2), __decorateClass$k([n$1({ "attribute": ![] })], TucbsBasemapPicker["prototype"], "map", 2), __decorateClass$k([n$1({ "attribute": ![] })], TucbsBasemapPicker["prototype"], "basemaps", 2), __decorateClass$k([n$1({ "attribute": "custom-css" })], TucbsBasemapPicker["prototype"], "customCss", 2), __decorateClass$k([n$1({ "type": Boolean, "attribute": ![] })], TucbsBasemapPicker["prototype"], "embedded", 2), __decorateClass$k([r()], TucbsBasemapPicker["prototype"], "_open", 2), __decorateClass$k([r()], TucbsBasemapPicker["prototype"], "_error", 2), __decorateClass$k([r()], TucbsBasemapPicker["prototype"], "_pending", 2), TucbsBasemapPicker = __decorateClass$k([t$3("tucbs-basemap-picker")], TucbsBasemapPicker);
var __defProp$i = Object["defineProperty"], __getOwnPropDesc$j = Object["getOwnPropertyDescriptor"], __decorateClass$j = (_0x3049b8, _0x57b491, _0x1b8e9f, _0x28a325) => {
  var _0xebc183 = _0x28a325 > 1 ? void 0 : _0x28a325 ? __getOwnPropDesc$j(_0x57b491, _0x1b8e9f) : _0x57b491;
  for (var _0x3ffb43 = _0x3049b8["length"] - 1, _0x5199c2; _0x3ffb43 >= 0; _0x3ffb43--) if (_0x5199c2 = _0x3049b8[_0x3ffb43]) _0xebc183 = (_0x28a325 ? _0x5199c2(_0x57b491, _0x1b8e9f, _0xebc183) : _0x5199c2(_0xebc183)) || _0xebc183;
  if (_0x28a325 && _0xebc183) __defProp$i(_0x57b491, _0x1b8e9f, _0xebc183);
  return _0xebc183;
};
const ICON_METER = o$1(iconNodeToString(_16_default$g));
let TucbsQualityBar = class extends i$2 {
  constructor() {
    super(...arguments), this["mapElementId"] = "", this["position"] = "bottom-left", this["customCss"] = "", this["_customCssState"] = { "sheet": null }, this["_quality"] = 75, this["_qualityRaf"] = null, this["_timers"] = new TimerBag(this);
  }
  ["disconnectedCallback"]() {
    super["disconnectedCallback"]();
  }
  ["firstUpdated"]() {
    bindMapByElementId(this, { "noIdTiming": "raf", ...standardMapBindingMessages("tucbs-quality-bar", "gizli") });
  }
  ["updated"](_0x3b4e4a) {
    _0x3b4e4a["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_customCssState"], "tucbs-quality-bar");
    if (_0x3b4e4a["has"]("map") && this["map"]) this["_syncFromMap"](this["map"]);
  }
  ["_syncFromMap"](_0x3826cd) {
    this["_quality"] = Math["round"](_0x3826cd["viewer"]["resolutionScale"] * 100);
  }
  ["_onSliderInput"](_0x5ac751) {
    const _0x370c86 = _0x5ac751["target"], _0x18d8ab = Number(_0x370c86["value"]);
    _0x370c86["style"]["setProperty"]("--fill", _0x18d8ab + "%"), this["_timers"]["cancelAnimationFrame"](this["_qualityRaf"]), this["_qualityRaf"] = this["_timers"]["requestAnimationFrame"](() => {
      var _a2;
      this["_qualityRaf"] = null, this["_quality"] = _0x18d8ab, (_a2 = this["map"]) == null ? void 0 : _a2["setQuality"](_0x18d8ab);
    });
  }
  ["render"]() {
    if (!this["map"]) return A;
    return b`
      <div class="panel">
        <div class="header-row">
          <span class="title"><span class="title-icon">${ICON_METER}</span>Harita Kalitesi</span>
          <span class="value-badge">%${this["_quality"]}</span>
        </div>
        <input
          type="range"
          class="quality-slider"
          min="0"
          max="100"
          step="5"
          .value=${String(this["_quality"])}
          style="--fill: ${this["_quality"]}%"
          @input=${this["_onSliderInput"]}
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
TucbsQualityBar["styles"] = i$5`
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
  `, __decorateClass$j([n$1()], TucbsQualityBar["prototype"], "mapElementId", 2), __decorateClass$j([n$1({ "reflect": !![] })], TucbsQualityBar["prototype"], "position", 2), __decorateClass$j([n$1({ "attribute": "custom-css" })], TucbsQualityBar["prototype"], "customCss", 2), __decorateClass$j([n$1({ "attribute": ![] })], TucbsQualityBar["prototype"], "map", 2), __decorateClass$j([r()], TucbsQualityBar["prototype"], "_quality", 2), TucbsQualityBar = __decorateClass$j([t$3("tucbs-quality-bar")], TucbsQualityBar);
var __defProp$h = Object["defineProperty"], __getOwnPropDesc$i = Object["getOwnPropertyDescriptor"], __decorateClass$i = (_0x264426, _0x4c7fe9, _0x3945b2, _0x5373db) => {
  var _0x39d424 = _0x5373db > 1 ? void 0 : _0x5373db ? __getOwnPropDesc$i(_0x4c7fe9, _0x3945b2) : _0x4c7fe9;
  for (var _0x4ef180 = _0x264426["length"] - 1, _0x26f995; _0x4ef180 >= 0; _0x4ef180--) if (_0x26f995 = _0x264426[_0x4ef180]) _0x39d424 = (_0x5373db ? _0x26f995(_0x4c7fe9, _0x3945b2, _0x39d424) : _0x26f995(_0x39d424)) || _0x39d424;
  if (_0x5373db && _0x39d424) __defProp$h(_0x4c7fe9, _0x3945b2, _0x39d424);
  return _0x39d424;
};
const ICON_SETTINGS = o$1(iconNodeToString(_16_default$9)), EMBED_BASEMAP_CSS = "\n  :host {\n    position: static !important;\n    inset: auto !important;\n    z-index: auto !important;\n  }\n", EMBED_QUALITY_CSS = "\n  :host {\n    position: static !important;\n    inset: auto !important;\n    z-index: auto !important;\n  }\n";
let TucbsSettingsTool = class extends i$2 {
  constructor() {
    super(...arguments), this["mapElementId"] = "", this["panelWidth"] = "360px", this["customCss"] = "", this["_open"] = ![], this["_layoutController"] = new PanelLayoutController(this), this["_panelEl"] = null, this["_customCssState"] = { "sheet": null };
  }
  ["connectedCallback"]() {
    super["connectedCallback"](), this["_layoutController"]["onExclusiveClose"] = () => {
      if (this["_open"]) this["_toggle"]();
    };
    const _0x465a2d = document["createElement"]("tucbs-slide-over-panel");
    _0x465a2d["panelTitle"] = "Ayarlar", _0x465a2d["panelWidth"] = this["panelWidth"], _0x465a2d["onCloseRequest"] = () => this["_toggle"](), document["body"]["appendChild"](_0x465a2d), this["_panelEl"] = _0x465a2d, this["_renderIntoPanel"]();
  }
  ["disconnectedCallback"]() {
    var _a2;
    if (this["map"]) this["_layoutController"]["unbindMap"](this["map"]);
    (_a2 = this["_panelEl"]) == null ? void 0 : _a2["remove"](), this["_panelEl"] = null, super["disconnectedCallback"]();
  }
  ["firstUpdated"]() {
    bindMapByElementId(this, { "noIdTiming": "sync", ...standardMapBindingMessages("tucbs-settings-tool", "islevsiz") });
  }
  ["updated"](_0x43eaa6) {
    _0x43eaa6["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_customCssState"], "tucbs-settings-tool");
    if (_0x43eaa6["has"]("map")) {
      const _0x4de163 = _0x43eaa6["get"]("map");
      if (_0x4de163) this["_layoutController"]["unbindMap"](_0x4de163);
      if (this["map"]) this["_layoutController"]["bindMap"](this["map"]);
    }
    _0x43eaa6["has"]("panelWidth") && this["_open"] && this["_layoutController"]["setOpen"](!![], this["panelWidth"]);
    if (this["_panelEl"]) this["_panelEl"]["panelWidth"] = this["panelWidth"];
    this["_renderIntoPanel"]();
  }
  ["_renderIntoPanel"]() {
    if (!this["_panelEl"]) return;
    this["_panelEl"]["open"] = this["_open"], D(b`
        <span slot="icon">${ICON_SETTINGS}</span>
        <tucbs-basemap-picker
          .map=${this["map"]}
          .embedded=${!![]}
          custom-css=${EMBED_BASEMAP_CSS}
        ></tucbs-basemap-picker>
        <tucbs-quality-bar .map=${this["map"]} custom-css=${EMBED_QUALITY_CSS}></tucbs-quality-bar>
      `, this["_panelEl"]);
  }
  ["_toggle"]() {
    if (!this["map"]) return;
    this["_open"] = !this["_open"], this["_layoutController"]["setOpen"](this["_open"], this["panelWidth"]), this["_renderIntoPanel"]();
  }
  ["render"]() {
    return b`
      <button
        type="button"
        class="tool-button ${this["_open"] ? "active" : ""}"
        aria-label="Ayarlar"
        data-tooltip="Ayarlar"
        aria-pressed=${this["_open"]}
        @click=${this["_toggle"]}
      >
        ${ICON_SETTINGS}
      </button>
    `;
  }
};
TucbsSettingsTool["styles"] = [leftTooltipStyles, i$5`
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
  `], __decorateClass$i([n$1()], TucbsSettingsTool["prototype"], "mapElementId", 2), __decorateClass$i([n$1({ "attribute": "panel-width" })], TucbsSettingsTool["prototype"], "panelWidth", 2), __decorateClass$i([n$1({ "attribute": "custom-css" })], TucbsSettingsTool["prototype"], "customCss", 2), __decorateClass$i([n$1({ "attribute": ![] })], TucbsSettingsTool["prototype"], "map", 2), __decorateClass$i([r()], TucbsSettingsTool["prototype"], "_open", 2), TucbsSettingsTool = __decorateClass$i([t$3("tucbs-settings-tool")], TucbsSettingsTool);
const NORTH_ARROW_DATA_URI = "data:image/png;base64,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048v04K5f//+cVa9+uqreWxAkinI4pYZAAA0OC0tlldeeeXMTj8SL7/8ch4bkCRXWGYAABBF80QF04877rgjzrIXXnghrw3ItyGLWm4AANS7U9IieaWVVsr09CPx3HPP5bUBSfJnyw0AgHo2d8gXaYF82223xVn39NNP57kBmRiyiGUHAEC9OiktjldYYYV4ypQpmW9AHn/88Tw3IEn+ZNkBAFCPuoSMSgvjW2+9Nc6Dhx9+OO8NyDchC1l+AADUmxOjnE0/Evfff3/eG5AkF1t+AADUk2T6MTItiG+++eY4L+65555aaEAmhPSwDAEAqBfHp8Vwr169cjP9SNx555210IAkucgyBACgHnQO+TwthPv16xfnye23314rDcj4kAUsRwAAat1xaRG83HLLxZMnT85VA5J8XaxGGpAkF1iOAADUsk4hI9IC+MYbb4zz5oYbbqilBuTrkO6WJQAAteqYtPhddtllczf9SFxzzTW11IAk+Z1lCQBALUqmH5+lhe/1118f59HVV19daw3IuJBulicAALXmqLToXXrppXM5/UhcccUVtdaAJDnX8gQAoJZ0DPk0LXivu+66OK/+9Kc/1WIDMiZkPssUAIBa8du02O3Zs2c8adKk3DYgF198cS02IEnOtkwBAKgFHUI+SQvd5EfceXbhhRfWagPyVci8lisAAHl3RFrkLrXUUrmefiTOP//8Wm1AkpxhuQIAkGfJ9OPjtMDt27dvnHdnn312LTcgo0O6WrYAAOTV4Wlxu+SSS8bffvtt7huQ008/vZYbkCSnWbYAAOTRXCEfpYXtX//617gWnHzyybXegHwZMo/lCwBA3hyaFrVLLLFETUw/EieccEKtNyBJTrZ8AQDIk2T6MTwtaP/yl7/EteKYY46phwZkVEgXyxgAgLw4JC1mF1988XjixIk104AceeSR9dCAJDnRMgYAIA+S6ceHaSF71VVXxbXk0EMPrZcGZGRkCgIAQA78Oi1iF1tssZqafiQOPvjgemlAkhxnOQMAkGXtQz5IC9grrrgirjUHHHBAPTUgI0I6WdYAAGTVQWnxusgii8TffPNNzTUg++67bz01IEmOsawBAMiiZPrxXlq4Xn755XEt2muvveqtAfksMgUBACCDfhXV+PQjsfvuu9dbA5Lkt5Y3AABZ0i4qmH5cdtllca3aeeed67EB+SSkg2UOAEBWHJAWqwsttFA8YcKEmm1A+vTpU48NSJIjLHMAALIgmX4MSwvVSy+9NK5l2223Xb02IB9HpiAAAGTA/lGdTD8SW2+9db02IEkOs9wBAKimtiHvpAXqJZdcEte6n/zkJ/XcgAyPGt50DwAAVbFfWpz26NEjHj9+fM03IJtttlk9NyBJDrHsAQCohmT68XZamP7xj3+M68FGG21U7w1I8qb79pY/AACVtk9alC644ILx119/XRcNyPrrr1/vDUiSgy1/AAAqKZl+DE0L0osuuiiuF+uss44GJIrejxqefgYAABWxd1qMLrDAAnUz/UisscYaGpCGHOg2AACgEtqEvJUWohdeeGFcT1ZZZRXNR0PejUxBAACogF+kRWj37t3jcePG1VUDsuKKK2o+/j/7ux0AACinZPoxJC1AL7jggrjeLLfcchqP/0/yDpi2bgsAAMplz7T4nH/++etu+pHo2bOnxmPm7Ou2AACgHJLpx5tp4fm73/0urkeLL764pmPmJE9DMwUBAKDkdk+Lzm7dusVjx46tywZk4YUX1nR8P3u7PQAAKKXWIYPTgvO8886L61Xy2GENx/eSPBWtjdsEAIBS2TUtNuebb754zJgxdduAJP9+Dccss6fbBACAUphp+nHuuefG9WyeeebRbMw6ye+DTEEAAGixXdIic955542/+uqrum5AOnXqpNmYfXZ3uwAA0BLJ9OP1tMA8++yz43rXvn17jcbsM3j6mgEAgGb5eVpcdu3aNR49enTdNyCtW7fWaMw5u7htAABojuQv2YPSwvKss86q++Zj2rRpGowfzuuRKQgAAM2wU2T6MZNJkyZpMBqXn7t9AABoilYhr6UF5RlnnBETx998843monEZFJmCAADQBH3SYjJ57OyXX36p+wjGjRunuWh8+riNAABojGT68WpaSJ5++uk6j+mSr6FpLBqdV6evJQAAmKMd0iJy7rnnjr/44gudx3QjR47UWDQtO7idAACYk+Qv1q+kBeSpp56q6yjw6aefaiqaloGRKQgAAHOwfVo8dunSJR41apSuo8Dw4cM1FU3Pdm4rAABmJflL9b/TwvHkk0/WcRR57733NBRNz0uRKQgAALOwbVQw/Uh+78DM3nnnHQ1F8/JTtxcAAIWSv1C/lBaMJ510km5jFt566y3NRPPyr8gUBACAAtukxWLnzp1NP2Zj8ODB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", DISCLAIMER_TEXT = "Ulusal Coğrafi Bilgi Platformundan (UCBP) alınmıştır, bilgi amaçlıdır. Haritada yer alan coğrafi veriler ile ilgili sorumluluk, verilerin sahibi kurumlara aittir.", EMPTY_DATASETS_MESSAGE = "Haritada gösterilecek veri seti bulunmamaktadır.";
function buildDisclaimerBox(_0x4a2150) {
  const _0x4ca15c = _0x4a2150["createElement"]("div");
  return _0x4ca15c["className"] = "print-disclaimer", _0x4ca15c["textContent"] = DISCLAIMER_TEXT, _0x4ca15c;
}
function buildDatasetsSectionTitle(_0x2c5e01) {
  const _0x3280eb = _0x2c5e01["createElement"]("h2");
  return _0x3280eb["className"] = "print-section-title", _0x3280eb["textContent"] = "Veri Setleri", _0x3280eb;
}
function buildDatasetNameList(_0x50e891, _0x53218f) {
  const _0x5536f4 = _0x50e891["createElement"]("ul");
  _0x5536f4["className"] = "dataset-name-list";
  for (const _0x25650b of _0x53218f) {
    const _0x1a0d99 = _0x50e891["createElement"]("li");
    _0x1a0d99["textContent"] = _0x25650b, _0x5536f4["appendChild"](_0x1a0d99);
  }
  return _0x5536f4;
}
function buildEmptyDatasetsMessage(_0x4b6f00) {
  const _0x28e7b5 = _0x4b6f00["createElement"]("p");
  return _0x28e7b5["className"] = "dataset-empty", _0x28e7b5["textContent"] = EMPTY_DATASETS_MESSAGE, _0x28e7b5;
}
function buildLegendSection(_0x2ca583, _0x21d012) {
  if (_0x21d012["length"] === 0) return null;
  const _0x429535 = _0x2ca583["createElement"]("div");
  _0x429535["className"] = "legend-section";
  for (const _0x32e2fa of _0x21d012) _0x429535["appendChild"](buildLegendEntryElement(_0x2ca583, _0x32e2fa));
  return _0x429535;
}
function buildLegendEntryElement(_0x30f202, _0x21947f) {
  if (_0x21947f["kind"] === "list-columns") return buildListColumnsGrid(_0x30f202, _0x21947f);
  const _0x36ba96 = _0x30f202["createElement"]("div");
  return _0x36ba96["className"] = "legend-entry", _0x36ba96["append"](...buildLegendEntryHeader(_0x30f202, _0x21947f), buildLegendEntryContent(_0x30f202, _0x21947f)), _0x36ba96;
}
function buildLegendEntryHeader(_0x4e89cc, _0x579ea1) {
  if (_0x579ea1["kind"] !== "gradient" && _0x579ea1["kind"] !== "bin" && _0x579ea1["kind"] !== "enum") return buildEntryHeaderLines(_0x4e89cc, _0x579ea1["layerTitle"], void 0);
  return buildEntryHeaderLines(_0x4e89cc, _0x579ea1["layerTitle"], _0x579ea1["displayColumn"]);
}
function buildEntryHeaderLines(_0x2d6d7e, _0x8d2564, _0x187c09) {
  const _0x2c5cf7 = _0x2d6d7e["createElement"]("div");
  _0x2c5cf7["className"] = "legend-entry-title", _0x2c5cf7["textContent"] = _0x8d2564;
  if (_0x187c09 === void 0) return [_0x2c5cf7];
  const _0x573346 = _0x2d6d7e["createElement"]("div");
  _0x573346["className"] = "legend-entry-subtitle", _0x573346["textContent"] = "Görüntüleme Değişkeni: " + _0x187c09;
  const _0xd2180d = _0x2d6d7e["createElement"]("div");
  return _0xd2180d["className"] = "legend-entry-column", _0xd2180d["textContent"] = _0x187c09, [_0x2c5cf7, _0x573346, _0xd2180d];
}
function buildLegendEntryContent(_0x41f3a4, _0x523513) {
  switch (_0x523513["kind"]) {
    case "image":
      return buildImageContent(_0x41f3a4, _0x523513["imageUrl"]);
    case "gradient":
    case "bin":
    case "enum":
      return buildRowsContent(_0x41f3a4, _0x523513["rows"]);
    case "empty":
      return buildEmptyContent(_0x41f3a4, _0x523513["message"]);
  }
}
function buildListColumnsGrid(_0x292405, _0x3f32ee) {
  const _0x2251a6 = _0x292405["createElement"]("div");
  return _0x2251a6["className"] = "legend-entry legend-list-columns", _0x3f32ee["columnGroups"]["forEach"]((_0x3f9e83, _0x5201e6) => {
    const _0x3f63df = _0x292405["createElement"]("div"), _0x4a7165 = _0x292405["createElement"]("div");
    _0x4a7165["append"](...buildEntryHeaderLines(_0x292405, _0x3f32ee["layerTitle"], _0x3f32ee["displayColumn"]));
    if (_0x5201e6 > 0) _0x4a7165["style"]["visibility"] = "hidden";
    _0x3f63df["append"](_0x4a7165, buildRowsContent(_0x292405, _0x3f9e83)), _0x2251a6["appendChild"](_0x3f63df);
  }), _0x2251a6;
}
function buildImageContent(_0x3ebbd4, _0x1750c9) {
  const _0x3c3d80 = _0x3ebbd4["createElement"]("img");
  return _0x3c3d80["className"] = "legend-image", _0x3c3d80["src"] = _0x1750c9, _0x3c3d80["alt"] = "Lejant", _0x3c3d80;
}
function buildRowsContent(_0xd5e376, _0x4e1f8b) {
  const _0x12d6a1 = _0xd5e376["createElement"]("div");
  for (const _0x9cd17d of _0x4e1f8b) {
    const _0x5f3f03 = _0xd5e376["createElement"]("div");
    _0x5f3f03["className"] = "legend-row";
    const _0x4f99ff = _0xd5e376["createElement"]("span");
    _0x4f99ff["className"] = "legend-swatch", _0x4f99ff["style"]["background"] = _0x9cd17d["color"];
    const _0x1271f9 = _0xd5e376["createElement"]("span");
    _0x1271f9["className"] = "legend-value", _0x1271f9["textContent"] = _0x9cd17d["label"], _0x5f3f03["append"](_0x4f99ff, _0x1271f9), _0x12d6a1["appendChild"](_0x5f3f03);
  }
  return _0x12d6a1;
}
function buildEmptyContent(_0x414d5a, _0x596316) {
  const _0x30ceee = _0x414d5a["createElement"]("span");
  return _0x30ceee["className"] = "legend-empty", _0x30ceee["textContent"] = _0x596316, _0x30ceee;
}
function buildDatasetNameContinuationPage(_0x418f48, _0x11b9c0, _0x1b8d92, _0x50ce75, _0x2e3407, _0x5a0bb2 = ![]) {
  const _0x4799b9 = _0x418f48["createElement"]("div");
  _0x4799b9["className"] = "legend-continuation-page", _0x4799b9["style"]["padding"] = _0x2e3407 + "mm", _0x4799b9["style"]["width"] = _0x1b8d92 + "mm", _0x4799b9["style"]["boxSizing"] = "border-box";
  _0x5a0bb2 && _0x4799b9["appendChild"](buildDatasetsSectionTitle(_0x418f48));
  const _0x7d464c = buildDatasetNameList(_0x418f48, _0x11b9c0);
  return _0x7d464c["style"]["height"] = _0x50ce75 + "mm", _0x7d464c["style"]["overflow"] = "hidden", _0x4799b9["appendChild"](_0x7d464c), _0x4799b9;
}
function buildLegendContinuationPage(_0x4a7f8c, _0x3dc6a6, _0x821a05, _0x5581ea, _0x3b1682, _0x4685df = ![]) {
  const _0x29e1b1 = _0x4a7f8c["createElement"]("div");
  _0x29e1b1["className"] = "legend-continuation-page", _0x29e1b1["style"]["padding"] = _0x3b1682 + "mm", _0x29e1b1["style"]["width"] = _0x821a05 + "mm", _0x29e1b1["style"]["boxSizing"] = "border-box";
  _0x4685df && _0x29e1b1["appendChild"](buildDatasetsSectionTitle(_0x4a7f8c));
  const _0x2d7fbf = buildLegendSection(_0x4a7f8c, _0x3dc6a6);
  return _0x2d7fbf && (_0x2d7fbf["style"]["height"] = _0x5581ea + "mm", _0x2d7fbf["style"]["overflow"] = "hidden", _0x29e1b1["appendChild"](_0x2d7fbf)), _0x29e1b1;
}
const LEGEND_ROW_HEIGHT_MM = 3.4, LEGEND_COLUMNS_PER_PAGE = 3, COMPACT_ENTRY_ROW_COST = 4, LIST_HEADER_ROW_COST = 7, LEGEND_CONTINUATION_SUFFIX = " (devam)", DATASET_NAME_ROW_HEIGHT_MM = 5.5;
function paginateDatasetNames(_0x5dff3c, _0x20f5cf, _0x1ccb0e) {
  const _0x47cc55 = Math["max"](1, Math["floor"](_0x20f5cf / DATASET_NAME_ROW_HEIGHT_MM)), _0x353766 = Math["max"](1, Math["floor"](_0x1ccb0e / DATASET_NAME_ROW_HEIGHT_MM)), _0x56c047 = _0x5dff3c["slice"](0, _0x47cc55), _0x422e13 = [];
  for (let _0x270529 = _0x47cc55; _0x270529 < _0x5dff3c["length"]; _0x270529 += _0x353766) {
    _0x422e13["push"](_0x5dff3c["slice"](_0x270529, _0x270529 + _0x353766));
  }
  return { "page1Names": _0x56c047, "continuationPages": _0x422e13 };
}
function computeRowsPerColumn(_0x25d8ff) {
  return Math["max"](1, Math["floor"](_0x25d8ff / LEGEND_ROW_HEIGHT_MM));
}
function splitIntoColumns(_0x2477ec, _0x24e976) {
  const _0x54f51a = [];
  for (let _0x2de0c3 = 0; _0x2de0c3 < _0x2477ec["length"]; _0x2de0c3 += _0x24e976) {
    _0x54f51a["push"](_0x2477ec["slice"](_0x2de0c3, _0x2de0c3 + _0x24e976));
  }
  return _0x54f51a;
}
function paginateLegendEntries(_0x4372e3, _0x293ede, _0x5c294a) {
  const _0x55849f = new LegendPaginator(_0x293ede, _0x5c294a);
  for (const _0x1884a4 of _0x4372e3) {
    if (_0x1884a4["kind"] === "bin" || _0x1884a4["kind"] === "enum" || _0x1884a4["kind"] === "gradient") _0x55849f["addList"](_0x1884a4);
    else _0x55849f["addCompact"](_0x1884a4);
  }
  return _0x55849f["result"]();
}
class LegendPaginator {
  constructor(_0x4d50a1, _0x3787fd) {
    this["pages"] = [[]], this["compactHeightMmOnCurrentPage"] = 0, this["currentPageHeightMm"] = _0x4d50a1, this["fullPageHeightMm"] = _0x3787fd, this["rowsPerColumnForCurrentPage"] = computeRowsPerColumn(_0x4d50a1), this["fullPageRowsPerColumn"] = computeRowsPerColumn(_0x3787fd), this["remaining"] = this["rowsPerColumnForCurrentPage"];
  }
  ["addCompact"](_0x5709f4) {
    this["ensureRoomFor"](COMPACT_ENTRY_ROW_COST), this["currentPage"]()["push"](_0x5709f4), this["remaining"] -= COMPACT_ENTRY_ROW_COST, this["compactHeightMmOnCurrentPage"] += COMPACT_ENTRY_ROW_COST * LEGEND_ROW_HEIGHT_MM;
  }
  ["addList"](_0xe31794) {
    let _0x549c45 = _0xe31794["rows"], _0x2bfea1 = !![];
    while (_0x549c45["length"] > 0) {
      const _0x530ac8 = Math["max"](1, this["rowsPerColumnForCurrentPage"] - LIST_HEADER_ROW_COST);
      _0x549c45["length"] <= _0x530ac8 ? _0x549c45 = this["addSingleColumnChunk"](_0xe31794, _0x2bfea1, _0x549c45) : _0x549c45 = this["addMultiColumnChunk"](_0xe31794, _0x2bfea1, _0x549c45), _0x2bfea1 = ![];
    }
  }
  ["addSingleColumnChunk"](_0x1194c2, _0x2242b4, _0x2e7c4c) {
    this["ensureRoomFor"](LIST_HEADER_ROW_COST + 1);
    const _0x3d5687 = Math["max"](1, this["rowsPerColumnForCurrentPage"] - LIST_HEADER_ROW_COST), _0xd90b68 = Math["min"](_0x2e7c4c["length"], _0x3d5687), _0x9c1d85 = _0x2242b4 ? _0x1194c2["layerTitle"] : _0x1194c2["layerTitle"] + LEGEND_CONTINUATION_SUFFIX;
    return this["currentPage"]()["push"]({ ..._0x1194c2, "layerTitle": _0x9c1d85, "rows": _0x2e7c4c["slice"](0, _0xd90b68) }), this["remaining"] -= _0xd90b68 + LIST_HEADER_ROW_COST, this["compactHeightMmOnCurrentPage"] += (LIST_HEADER_ROW_COST + _0xd90b68) * LEGEND_ROW_HEIGHT_MM, _0x2e7c4c["slice"](_0xd90b68);
  }
  ["addMultiColumnChunk"](_0x2527a0, _0x4a4273, _0x320dfb) {
    const _0x2f617d = this["currentPageHeightMm"] - this["compactHeightMmOnCurrentPage"];
    let _0x46679c = Math["max"](0, Math["floor"](_0x2f617d / LEGEND_ROW_HEIGHT_MM) - LIST_HEADER_ROW_COST);
    _0x46679c < 1 && (this["advancePage"](), _0x46679c = Math["max"](1, this["rowsPerColumnForCurrentPage"] - LIST_HEADER_ROW_COST));
    const _0xf74412 = Math["min"](_0x320dfb["length"], _0x46679c * LEGEND_COLUMNS_PER_PAGE), _0x3f8e5b = splitIntoColumns(_0x320dfb["slice"](0, _0xf74412), _0x46679c), _0x1759fa = _0x4a4273 ? _0x2527a0["layerTitle"] : _0x2527a0["layerTitle"] + LEGEND_CONTINUATION_SUFFIX;
    return this["currentPage"]()["push"]({ "layerTitle": _0x1759fa, "kind": "list-columns", "displayColumn": _0x2527a0["displayColumn"], "columnGroups": _0x3f8e5b }), this["advancePage"](), _0x320dfb["slice"](_0xf74412);
  }
  ["result"]() {
    return { "page1Entries": this["pages"][0], "continuationPages": this["pages"]["slice"](1)["filter"]((_0x56ec55) => _0x56ec55["length"] > 0) };
  }
  ["currentPage"]() {
    return this["pages"][this["pages"]["length"] - 1];
  }
  ["advancePage"]() {
    this["pages"]["push"]([]), this["currentPageHeightMm"] = this["fullPageHeightMm"], this["rowsPerColumnForCurrentPage"] = this["fullPageRowsPerColumn"], this["remaining"] = this["rowsPerColumnForCurrentPage"], this["compactHeightMmOnCurrentPage"] = 0;
  }
  ["ensureRoomFor"](_0x2039e5) {
    if (this["remaining"] >= _0x2039e5) return;
    if (this["currentPage"]()["length"] === 0 && _0x2039e5 > this["fullPageRowsPerColumn"]) return;
    this["advancePage"]();
  }
}
const LEGEND_SECTION_MARGIN_TOP_MM = 3, LEGEND_PAGE1_SAFETY_MARGIN_MM = 5;
function computeLegendMaxHeightMm(_0x3e7a17) {
  return Math["max"](0, _0x3e7a17["pageHeightMm"] - 2 * _0x3e7a17["pageMarginMm"] - _0x3e7a17["headerHeightMm"] - _0x3e7a17["footerHeightMm"] - _0x3e7a17["imageHeightMm"] - LEGEND_SECTION_MARGIN_TOP_MM - LEGEND_PAGE1_SAFETY_MARGIN_MM);
}
const DATASETS_HEADER_BLOCK_MM = 34;
function computeDatasetsListMaxHeightMm(_0x32fe45) {
  return Math["max"](0, computeLegendMaxHeightMm(_0x32fe45) - DATASETS_HEADER_BLOCK_MM);
}
function buildPageStyle(_0x10187d, _0x366a06) {
  const _0x14d565 = _0x10187d["createElement"]("style");
  return _0x14d565["textContent"] = buildBasePageCss(_0x366a06) + buildLegendCss(_0x366a06), _0x14d565;
}
function buildBasePageCss(_0x54458e) {
  return "\n    @page { size: " + _0x54458e["pageWidthMm"] + "mm " + _0x54458e["pageHeightMm"] + `mm; margin: 0; }
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
    .print-page { display: flex; flex-direction: column; align-items: center; width: ` + _0x54458e["pageWidthMm"] + "mm; height: " + _0x54458e["pageHeightMm"] + "mm; padding: " + _0x54458e["pageMarginMm"] + "mm; box-sizing: border-box; }\n    .print-header { width: 100%; text-align: center; box-sizing: border-box; overflow: hidden; height: " + _0x54458e["headerHeightMm"] + 'mm; }\n    .print-header h1 { margin: 0 0 2mm 0; font-size: 18px; font-weight: 600; }\n    .print-header .print-date { font-size: 12px; color: #525252; }\n    .map-frame { position: relative; width: 100%; }\n    .map-frame::before { content: ""; display: block; padding-top: var(--frame-aspect-pct); }\n    .map-frame img { display: block; position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; }\n    .north-arrow { position: absolute; width: 40px; height: 40px; }\n    .north-arrow img { width: 100%; height: 100%; display: block; }\n    .scale-bar { position: absolute; font-size: 12px; font-weight: 600; background: rgba(255,255,255,0.85); padding: 2px 6px; border-radius: 2px; }\n    .print-footer { box-sizing: border-box; overflow: hidden; font-size: 10px; color: #525252; text-align: center; }\n    .preview-toolbar { position: fixed; top: 16px; right: 16px; display: flex; gap: 8px; z-index: 1000; }\n    .preview-toolbar-btn { padding: 8px 16px; border: none; border-radius: 4px; background: #0f62fe; color: #fff; font: inherit; cursor: pointer; }\n    @media print { .preview-toolbar { display: none; } }\n  ';
}
function buildLegendCss(_0x4ed51a) {
  const _0x2bb58e = computeLegendMaxHeightMm(_0x4ed51a), _0x4afbb0 = computeDatasetsListMaxHeightMm(_0x4ed51a);
  return `
    /* FAZ 3.4: haritanin altindaki TUM bolumu (uyari kutusu+baslik+icerik)
       saran DIS kutu -- 3dmap referansiyla (RecordToolPanel.tsx) BIREBIR
       ayni renk/kenarlik degerleri KORUNARAK, mm-tabanli kompakt sayfa
       baglamimiza olceklendi (piksel degerleri DEGIL, renkler/kalinliklar
       aynen alindi -- kullanicinin ACIKCA istedigi "ayni renk"). Kesin
       height+overflow:hidden BURADA da (Faz 2.1'in .legend-section icin
       kesfettigi) AYNI Chromium sayfalama guvenlik agi geregi. */
    .datasets-section { width: 100%; margin-top: ` + LEGEND_SECTION_MARGIN_TOP_MM + `mm; box-sizing: border-box; }
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
    .datasets-section-bounded { height: ` + _0x2bb58e + `mm; overflow: hidden; }
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
    .legend-section { width: 100%; margin-top: ` + LEGEND_SECTION_MARGIN_TOP_MM + "mm; font-size: 10px; height: " + _0x4afbb0 + "mm; overflow: hidden; box-sizing: border-box; }\n    /* FAZ 3.4: .datasets-section icinde (SADECE sayfa 1) baslik zaten\n       KENDI margin-bottom'uyla bosluk birakiyor -- .legend-section'in KENDI\n       margin-top'u (devam sayfalarinda hala GEREKLI, o yuzden ASAGIDAKI\n       temel kuraldan KALDIRILMADI) burada FAZLADAN/CIFT bosluk yaratirdi. */\n    .datasets-section .legend-section { margin-top: 0; }\n    .legend-continuation-page { break-before: page; box-sizing: border-box; }\n    .legend-entry { break-inside: avoid; margin-bottom: 3mm; }\n    /* FAZ 2.3/3.5: bkz PrintLegendBuilder.ts buildListColumnsGrid WHY yorumu --\n       acik bir CSS Grid ile kolonlari HIZALI olusturur; .legend-section\n       ARTIK HICBIR ZAMAN CSS columns: baglami acmadigindan (bkz yukarisi)\n       bu Grid'in column-span:all'a ihtiyaci hic olmaz. */\n    .legend-list-columns { display: grid; grid-template-columns: repeat(" + LEGEND_COLUMNS_PER_PAGE + ', 1fr); column-gap: 6mm; }\n    /* FAZ 2.3: kullanici basligin ILK 2 satiri (katman adi + "Goruntuleme\n       Degiskeni") arasindaki bosluk SATIRINI kaldirmayi, bunun yerine\n       lejantin HEMEN USTUNDEKI alan-adi satiriyla lejant satirlari arasina\n       bir bosluk satiri eklemeyi istedi -- toplam kaplanan dikey alan AYNI\n       (1mm+3mm+3mm = eskiden 3mm+3mm+1mm), sadece boslugun YERI degisti,\n       bu yuzden LIST_HEADER_ROW_COST kalibrasyonu ETKILENMEZ. */\n    .legend-entry-title { font-weight: 600; margin-bottom: 1mm; }\n    .legend-entry-subtitle { color: #525252; margin-bottom: 3mm; }\n    .legend-entry-column { font-weight: 600; margin-bottom: 3mm; }\n    .legend-image { max-width: 100%; display: block; }\n    .legend-row { display: flex; align-items: center; gap: 4px; }\n    .legend-swatch { flex: none; width: 8px; height: 8px; border-radius: 2px; }\n    .legend-value { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n    .legend-empty { color: #525252; }\n  ';
}
const OVERLAY_INSET_PX = 12, CONTINUATION_PAGE_SAFETY_MARGIN_MM = 10;
function buildPrintPreviewDocument(_0x38c214, _0x52edc8) {
  _0x38c214["title"] = _0x52edc8["printTitle"] || "Yazdır", _0x38c214["head"]["appendChild"](buildPageStyle(_0x38c214, _0x52edc8));
  const _0x7f0551 = _0x38c214["createElement"]("div");
  _0x7f0551["className"] = "print-page";
  if (_0x52edc8["printTitle"]) _0x7f0551["appendChild"](buildHeader(_0x38c214, _0x52edc8));
  _0x7f0551["appendChild"](buildImageContainer(_0x38c214, _0x52edc8)), _0x38c214["body"]["appendChild"](_0x7f0551), appendDatasetsSection(_0x38c214, _0x7f0551, _0x52edc8);
  if (_0x52edc8["footerText"]) _0x7f0551["appendChild"](buildFooter(_0x38c214, _0x52edc8["footerText"], _0x52edc8["footerHeightMm"]));
}
function buildDatasetsSectionWrapper(_0x53b806) {
  const _0x3c85ab = _0x53b806["createElement"]("div");
  return _0x3c85ab["className"] = "datasets-section datasets-section-bounded", _0x3c85ab["appendChild"](buildDisclaimerBox(_0x53b806)), _0x3c85ab["appendChild"](buildDatasetsSectionTitle(_0x53b806)), _0x3c85ab;
}
function buildDatasetsSectionTitleWrapper(_0x4a9391) {
  const _0x4b2788 = _0x4a9391["createElement"]("div");
  return _0x4b2788["className"] = "datasets-section datasets-section-bounded", _0x4b2788["appendChild"](buildDatasetsSectionTitle(_0x4a9391)), _0x4b2788;
}
function appendDatasetsSection(_0x3c8bcf, _0x45304a, _0x826569) {
  if (_0x826569["datasetNames"]["length"] === 0) {
    const _0x4efe5c = buildDatasetsSectionWrapper(_0x3c8bcf);
    _0x4efe5c["appendChild"](buildEmptyDatasetsMessage(_0x3c8bcf)), _0x45304a["appendChild"](_0x4efe5c);
    return;
  }
  const _0xd15eca = _0x3c8bcf["createElement"]("div");
  _0xd15eca["className"] = "datasets-section", _0xd15eca["appendChild"](buildDisclaimerBox(_0x3c8bcf)), _0x45304a["appendChild"](_0xd15eca);
  const _0x5c21dc = _0x826569["pageHeightMm"] - 2 * _0x826569["pageMarginMm"] - CONTINUATION_PAGE_SAFETY_MARGIN_MM, _0x1e118d = computeDatasetsListMaxHeightMm(_0x826569), _0x27cc59 = Math["max"](0, _0x5c21dc - DATASETS_HEADER_BLOCK_MM);
  if (!_0x826569["showLegend"]) {
    const _0x347f74 = paginateDatasetNames(_0x826569["datasetNames"], _0x1e118d, _0x5c21dc), _0xe554bd = _0x347f74["page1Names"]["length"] === 0 && _0x347f74["continuationPages"]["length"] > 0, { page1Names: _0x1937c5, continuationPages: _0x3da333 } = _0xe554bd ? paginateDatasetNames(_0x826569["datasetNames"], _0x27cc59, _0x5c21dc) : _0x347f74;
    if (_0xe554bd) _0x3c8bcf["body"]["appendChild"](buildDatasetNameContinuationPage(_0x3c8bcf, _0x1937c5, _0x826569["pageWidthMm"], _0x27cc59, _0x826569["pageMarginMm"], !![]));
    else {
      const _0x2b939c = buildDatasetsSectionTitleWrapper(_0x3c8bcf);
      _0x2b939c["appendChild"](buildDatasetNameList(_0x3c8bcf, _0x1937c5)), _0x45304a["appendChild"](_0x2b939c);
    }
    for (const _0x1169f3 of _0x3da333) {
      _0x3c8bcf["body"]["appendChild"](buildDatasetNameContinuationPage(_0x3c8bcf, _0x1169f3, _0x826569["pageWidthMm"], _0x5c21dc, _0x826569["pageMarginMm"]));
    }
    return;
  }
  const _0xf57ce0 = paginateLegendEntries(_0x826569["legendEntries"], _0x1e118d, _0x5c21dc), _0x19461b = _0xf57ce0["page1Entries"]["length"] === 0 && _0xf57ce0["continuationPages"]["length"] > 0, { page1Entries: _0x484ad4, continuationPages: _0x2bacf2 } = _0x19461b ? paginateLegendEntries(_0x826569["legendEntries"], _0x27cc59, _0x5c21dc) : _0xf57ce0;
  if (_0x19461b) _0x3c8bcf["body"]["appendChild"](buildLegendContinuationPage(_0x3c8bcf, _0x484ad4, _0x826569["pageWidthMm"], _0x27cc59, _0x826569["pageMarginMm"], !![]));
  else {
    const _0x54f7b1 = buildDatasetsSectionTitleWrapper(_0x3c8bcf), _0x1831ca = buildLegendSection(_0x3c8bcf, _0x484ad4);
    if (_0x1831ca) _0x54f7b1["appendChild"](_0x1831ca);
    _0x45304a["appendChild"](_0x54f7b1);
  }
  for (const _0x4e3c8 of _0x2bacf2) {
    _0x3c8bcf["body"]["appendChild"](buildLegendContinuationPage(_0x3c8bcf, _0x4e3c8, _0x826569["pageWidthMm"], _0x5c21dc, _0x826569["pageMarginMm"]));
  }
}
function buildPreviewToolbar(_0x4cac6c, _0x42a699) {
  const _0x569804 = _0x4cac6c["createElement"]("div");
  _0x569804["className"] = "preview-toolbar";
  const _0x587eb7 = _0x4cac6c["createElement"]("button");
  _0x587eb7["type"] = "button", _0x587eb7["className"] = "preview-toolbar-btn", _0x587eb7["textContent"] = "Yazdır", _0x587eb7["addEventListener"]("click", _0x42a699["onPrint"]);
  const _0x38d862 = _0x4cac6c["createElement"]("button");
  _0x38d862["type"] = "button", _0x38d862["className"] = "preview-toolbar-btn", _0x38d862["textContent"] = "Kapat", _0x38d862["addEventListener"]("click", _0x42a699["onClose"]), _0x569804["append"](_0x587eb7, _0x38d862), _0x4cac6c["body"]["appendChild"](_0x569804);
}
function buildHeader(_0x3b27b9, _0x534886) {
  const _0x120970 = _0x3b27b9["createElement"]("div");
  _0x120970["className"] = "print-header";
  const _0x43af92 = _0x3b27b9["createElement"]("h1");
  _0x43af92["textContent"] = _0x534886["printTitle"];
  const _0x175443 = _0x3b27b9["createElement"]("div");
  return _0x175443["className"] = "print-date", _0x175443["textContent"] = formatPrintTimestamp(_0x534886["printDate"]), _0x120970["append"](_0x43af92, _0x175443), _0x120970;
}
function formatPrintTimestamp(_0x17e91b) {
  return _0x17e91b["toLocaleString"]("tr-TR", { "year": "numeric", "month": "2-digit", "day": "2-digit", "hour": "2-digit", "minute": "2-digit" });
}
function computeVisibleImageOffsetPct(_0x509493, _0x487a8a, _0x2d47d1) {
  const _0x1e80ea = _0x509493 / _0x487a8a;
  if (_0x2d47d1 > _0x1e80ea) {
    const _0x2692eb = _0x1e80ea / _0x2d47d1;
    return { "offsetXPct": 0, "offsetYPct": (1 - _0x2692eb) / 2 * 100 };
  }
  const _0x50732a = _0x2d47d1 / _0x1e80ea;
  return { "offsetXPct": (1 - _0x50732a) / 2 * 100, "offsetYPct": 0 };
}
function buildImageContainer(_0x4abcd1, _0x302c2f) {
  const _0x3dde57 = _0x4abcd1["createElement"]("div");
  _0x3dde57["className"] = "map-frame";
  const _0x5ef05c = _0x302c2f["imageHeightMm"] / _0x302c2f["imageWidthMm"] * 100;
  _0x3dde57["style"]["setProperty"]("--frame-aspect-pct", _0x5ef05c + "%");
  const _0x5c9614 = _0x4abcd1["createElement"]("img");
  _0x5c9614["src"] = _0x302c2f["imageBlobUrl"], _0x3dde57["appendChild"](_0x5c9614);
  const { offsetXPct: _0x5c9590, offsetYPct: _0x2d9080 } = computeVisibleImageOffsetPct(_0x302c2f["imageWidthMm"], _0x302c2f["imageHeightMm"], _0x302c2f["captureAspectRatio"]);
  return _0x302c2f["showNorthArrow"] && _0x3dde57["appendChild"](buildNorthArrow(_0x4abcd1, _0x302c2f["northArrowRotationDeg"], _0x5c9590, _0x2d9080)), _0x302c2f["showScaleBar"] && _0x302c2f["scaleRatioLabel"] && _0x3dde57["appendChild"](buildScaleBar(_0x4abcd1, _0x302c2f["scaleRatioLabel"], _0x5c9590, _0x2d9080)), _0x3dde57;
}
function buildNorthArrow(_0x52ebe3, _0x2755fa, _0x46f876, _0x364dcd) {
  const _0x5129b7 = _0x52ebe3["createElement"]("div");
  _0x5129b7["className"] = "north-arrow", _0x5129b7["style"]["top"] = "calc(" + _0x364dcd + "% + " + OVERLAY_INSET_PX + "px)", _0x5129b7["style"]["right"] = "calc(" + _0x46f876 + "% + " + OVERLAY_INSET_PX + "px)", _0x5129b7["style"]["transform"] = "rotate(" + _0x2755fa + "deg)";
  const _0x495bcd = _0x52ebe3["createElement"]("img");
  return _0x495bcd["src"] = NORTH_ARROW_DATA_URI, _0x495bcd["alt"] = "Kuzey Oku", _0x5129b7["appendChild"](_0x495bcd), _0x5129b7;
}
function buildScaleBar(_0x27dd36, _0x26272c, _0x5293e1, _0xe0c724) {
  const _0x145a8a = _0x27dd36["createElement"]("div");
  return _0x145a8a["className"] = "scale-bar", _0x145a8a["style"]["left"] = "calc(" + _0x5293e1 + "% + " + OVERLAY_INSET_PX + "px)", _0x145a8a["style"]["bottom"] = "calc(" + _0xe0c724 + "% + " + OVERLAY_INSET_PX + "px)", _0x145a8a["textContent"] = _0x26272c, _0x145a8a;
}
function buildFooter(_0x8e789a, _0x556bb2, _0x29b01d) {
  const _0x294b94 = _0x8e789a["createElement"]("div");
  return _0x294b94["className"] = "print-footer", _0x294b94["style"]["height"] = _0x29b01d + "mm", _0x294b94["style"]["paddingTop"] = "6mm", _0x294b94["textContent"] = _0x556bb2, _0x294b94;
}
const PREVIEW_WIDTH_PX = 1450, PREVIEW_MAX_HEIGHT_PX = 1e3, PREVIEW_VIEWPORT_WIDTH_RATIO = 0.9, PREVIEW_VIEWPORT_HEIGHT_RATIO = 0.85, PREVIEW_PAGE_GAP_PX = 24, PREVIEW_BODY_PADDING_PX = 24;
class PrintPreviewOverlayController {
  constructor() {
    this["_overlayEl"] = null, this["_iframe"] = null, this["_imageUrl"] = null;
  }
  async ["show"](_0x51d0b6, _0xc0e0f8) {
    this["_imageUrl"] = URL["createObjectURL"](_0x51d0b6);
    const _0x89d79 = this["_ensureOverlay"]();
    this["_sizeIframe"](_0x89d79), await new Promise((_0x2f3feb) => {
      _0x89d79["addEventListener"]("load", () => _0x2f3feb(), { "once": !![] }), _0x89d79["srcdoc"] = "<!doctype html><html><head></head><body></body></html>";
    });
    const _0x16fa04 = _0x89d79["contentDocument"];
    if (!_0x16fa04) return;
    buildPrintPreviewDocument(_0x16fa04, { ..._0xc0e0f8, "imageBlobUrl": this["_imageUrl"] }), this["_paginatePreview"](_0x16fa04, _0x89d79), buildPreviewToolbar(_0x16fa04, { "onPrint": () => this["_triggerNativePrint"](), "onClose": () => this["close"]() });
  }
  ["close"]() {
    var _a2;
    (_a2 = this["_overlayEl"]) == null ? void 0 : _a2["remove"](), this["_overlayEl"] = null, this["_iframe"] = null, this["_imageUrl"] && (URL["revokeObjectURL"](this["_imageUrl"]), this["_imageUrl"] = null);
  }
  ["_paginatePreview"](_0xb43a6c, _0x14778d) {
    const _0x32a23b = Array["from"](_0xb43a6c["querySelectorAll"](".print-page, .legend-continuation-page")), _0x182076 = _0x32a23b[0];
    if (!_0x182076) return;
    const _0x3b9535 = _0x182076["offsetWidth"], _0x1d41d4 = _0x182076["offsetHeight"];
    if (_0x3b9535 === 0 || _0x1d41d4 === 0) return;
    const _0x1aa282 = 2 * PREVIEW_BODY_PADDING_PX + Math["max"](0, _0x32a23b["length"] - 1) * PREVIEW_PAGE_GAP_PX, _0x41edf6 = Math["max"](0, _0x14778d["clientHeight"] - _0x1aa282), _0x47f91b = Math["min"](_0x14778d["clientWidth"] / _0x3b9535, _0x41edf6 / _0x1d41d4);
    for (const _0x3d5a04 of _0x32a23b) {
      const _0x1b70e6 = _0xb43a6c["createElement"]("div");
      _0x1b70e6["className"] = "print-page-viewport", _0x3d5a04["replaceWith"](_0x1b70e6), _0x1b70e6["appendChild"](_0x3d5a04);
    }
    const _0x5517fd = _0xb43a6c["createElement"]("style");
    _0x5517fd["textContent"] = "\n      @media screen {\n        html, body { background: #e0e0e0; }\n        body { display: flex; flex-direction: column; align-items: center; gap: " + PREVIEW_PAGE_GAP_PX + "px; padding: " + PREVIEW_BODY_PADDING_PX + "px 0; box-sizing: border-box; }\n        .print-page-viewport { width: " + Math["round"](_0x3b9535 * _0x47f91b) + "px; height: " + Math["round"](_0x1d41d4 * _0x47f91b) + "px; overflow: hidden; flex: none; background: #ffffff; box-shadow: 0 2px 8px rgba(0,0,0,0.35); }\n        .print-page, .legend-continuation-page { transform: scale(" + _0x47f91b + "); transform-origin: top left; }\n      }\n      @media print {\n        html, body { background: none; }\n        body { display: block; padding: 0; }\n        .print-page-viewport { width: auto; height: auto; overflow: visible; background: none; box-shadow: none; }\n        .print-page, .legend-continuation-page { transform: none; }\n      }\n    ", _0xb43a6c["head"]["appendChild"](_0x5517fd);
  }
  ["_triggerNativePrint"]() {
    var _a2, _b;
    (_b = (_a2 = this["_iframe"]) == null ? void 0 : _a2["contentWindow"]) == null ? void 0 : _b["print"]();
  }
  ["_ensureOverlay"]() {
    if (this["_iframe"]) return this["_iframe"];
    const _0x4476b7 = document["createElement"]("div");
    _0x4476b7["style"]["cssText"] = "position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,0.6);display:flex;align-items:center;justify-content:center;padding:2rem;overflow:auto;";
    const _0x26b6e5 = document["createElement"]("iframe");
    return _0x26b6e5["style"]["cssText"] = "background:#fff;border:none;box-shadow:0 4px 16px rgba(0,0,0,0.3);flex:none;", _0x4476b7["appendChild"](_0x26b6e5), document["body"]["appendChild"](_0x4476b7), this["_overlayEl"] = _0x4476b7, this["_iframe"] = _0x26b6e5, _0x26b6e5;
  }
  ["_sizeIframe"](_0x1ab19c) {
    const _0xf3064b = Math["min"](window["innerWidth"] * PREVIEW_VIEWPORT_WIDTH_RATIO, PREVIEW_WIDTH_PX), _0x170d6e = Math["min"](window["innerHeight"] * PREVIEW_VIEWPORT_HEIGHT_RATIO, PREVIEW_MAX_HEIGHT_PX);
    _0x1ab19c["style"]["width"] = Math["round"](_0xf3064b) + "px", _0x1ab19c["style"]["height"] = Math["round"](_0x170d6e) + "px";
  }
}
function calculateScaleRatio(_0xf8aa0d, _0x360a0f) {
  const _0x3ff4ed = Math["round"](_0xf8aa0d / _0x360a0f);
  return { "label": "1/" + _0x3ff4ed, "denominator": _0x3ff4ed };
}
function getVisibleDataLayers(_0x1b2532) {
  return _0x1b2532["filter"]((_0x234851) => !_0x234851["isBasemap"] && _0x234851["cesiumObject"]["show"] !== ![]);
}
function collectVisibleDatasetNames(_0x5ba482) {
  return getVisibleDataLayers(_0x5ba482)["map"]((_0x388039) => _0x388039["title"]);
}
async function collectPrintLegendEntries(_0x31f8af, _0x67235) {
  const _0x1547ad = getVisibleDataLayers(_0x67235), _0x25933b = await Promise["allSettled"](_0x1547ad["map"]((_0x5465c3) => resolveLegendEntry(_0x31f8af, _0x5465c3)));
  return _0x25933b["map"]((_0x3f220f, _0x2edeef) => _0x3f220f["status"] === "fulfilled" ? _0x3f220f["value"] : buildEmptyEntry(_0x1547ad[_0x2edeef]["title"], "Lejant yüklenemedi."));
}
async function resolveLegendEntry(_0x346c8f, _0x532a03) {
  var _a2;
  if (_0x532a03["layerType"] === "WMS") return buildImageEntry(_0x532a03["title"], _0x346c8f["getWmsLegendGraphicUrl"](_0x532a03["id"]));
  if (_0x532a03["layerType"] === "WMTS") {
    const _0x2500c4 = await _0x346c8f["getWmtsAvailableStyles"](_0x532a03["id"]), _0x478ce4 = (_a2 = _0x2500c4[0]) == null ? void 0 : _a2["legendUrl"];
    return _0x478ce4 ? buildImageEntry(_0x532a03["title"], _0x478ce4) : buildEmptyEntry(_0x532a03["title"], "Lejant bulunamadı.");
  }
  return buildVectorEntry(_0x532a03["title"], _0x346c8f["getLayerStyle"](_0x532a03["id"]));
}
function buildImageEntry(_0x54e358, _0x36c921) {
  return { "layerTitle": _0x54e358, "kind": "image", "imageUrl": _0x36c921 };
}
function buildEmptyEntry(_0x2afe66, _0xf83764) {
  return { "layerTitle": _0x2afe66, "kind": "empty", "message": _0xf83764 };
}
function buildVectorEntry(_0x5b935f, _0x439498) {
  if (!_0x439498) return buildEmptyEntry(_0x5b935f, "Henüz stil uygulanmadı.");
  switch (_0x439498["fill"]["mode"]) {
    case "gradient":
      return buildGradientEntry(_0x5b935f, _0x439498["fill"]["column"], _0x439498["fill"]["palette"], _0x439498["fill"]["paletteKind"], _0x439498["fill"]["min"], _0x439498["fill"]["max"]);
    case "bin":
      return buildBinEntry(_0x5b935f, _0x439498["fill"]["column"], _0x439498["fill"]["palette"], _0x439498["fill"]["paletteKind"], _0x439498["fill"]["min"], _0x439498["fill"]["max"], _0x439498["fill"]["binCount"]);
    case "enum":
      return buildEnumEntry(_0x5b935f, _0x439498["fill"]["column"], _0x439498["fill"]["colors"]);
    case "solid":
    case "off":
    default:
      return buildEmptyEntry(_0x5b935f, "Bu katman sabit renkli, lejant gerekmiyor.");
  }
}
function buildGradientEntry(_0x5b1328, _0x5b8098, _0x2f7fe0, _0x37c039, _0x1878d4, _0x296ebe) {
  if (_0x1878d4 === void 0 || _0x296ebe === void 0) return buildEmptyEntry(_0x5b1328, "Aralık hesaplanamadı.");
  const _0x48a724 = gradientLegendRows(_0x1878d4, _0x296ebe, (_0x15a5f7) => sampleFromPaletteCss(_0x2f7fe0, _0x15a5f7, _0x37c039));
  return { "layerTitle": _0x5b1328, "kind": "gradient", "rows": _0x48a724, "displayColumn": _0x5b8098 };
}
function buildBinEntry(_0x21adc5, _0x69b868, _0x1777a7, _0x16817d, _0x33f697, _0x358866, _0x6647ae) {
  if (_0x33f697 === void 0 || _0x358866 === void 0) return buildEmptyEntry(_0x21adc5, "Aralık hesaplanamadı.");
  const _0x16cdb4 = binLegendRows(_0x33f697, _0x358866, _0x6647ae, (_0x5c4056) => sampleFromPaletteCss(_0x1777a7, _0x5c4056, _0x16817d));
  return { "layerTitle": _0x21adc5, "kind": "bin", "rows": _0x16cdb4, "displayColumn": _0x69b868 };
}
function buildEnumEntry(_0x5c8226, _0x27e831, _0x406a24) {
  const _0x292544 = Object["entries"](_0x406a24);
  if (_0x292544["length"] === 0) return buildEmptyEntry(_0x5c8226, "Kategori bulunamadı.");
  const _0x3f8005 = [..._0x292544]["sort"](([_0x2124ac], [_0x214095]) => compareCategoryKeys(_0x2124ac, _0x214095));
  return { "layerTitle": _0x5c8226, "kind": "enum", "rows": _0x3f8005["map"](([_0xe8dbf3, _0x1ce890]) => ({ "color": _0x1ce890, "label": _0xe8dbf3 })), "displayColumn": _0x27e831 };
}
const MM_PER_INCH = 25.4, SCREEN_DPI = 96, SCREEN_METERS_PER_PIXEL = MM_PER_INCH / SCREEN_DPI / 1e3, PAGE_MARGIN_MM = 8, HEADER_BLOCK_HEIGHT_MM = 14, FOOTER_BLOCK_HEIGHT_MM = 12, IMAGE_TOP_HALF_RATIO = 0.5;
async function buildPrintPreviewInput(_0x1c657f) {
  const { map: _0xe6c77c, pageDims: _0x306e04 } = _0x1c657f, _0x57b643 = _0x1c657f["printTitle"] ? HEADER_BLOCK_HEIGHT_MM : 0, _0x124dd7 = _0x1c657f["footerText"] ? FOOTER_BLOCK_HEIGHT_MM : 0, _0x31c126 = computeImageContentDimensionsMm(_0x306e04, _0x57b643, _0x124dd7), _0xaeff7d = computeScaleRatioLabel(_0xe6c77c, _0x1c657f["showScaleBar"]), _0x157fa0 = _0xe6c77c["viewer"]["canvas"], _0x33f518 = _0x157fa0["clientHeight"] > 0 ? _0x157fa0["clientWidth"] / _0x157fa0["clientHeight"] : 1, _0x5957db = -((_0xe6c77c["viewer"]["camera"]["heading"] ?? 0) * 180) / Math["PI"], _0x4ebfdf = collectVisibleDatasetNames(_0xe6c77c["layerManager"]["getLayers"]()), _0x365b1f = await resolvePrintLegendEntries(_0xe6c77c, _0x1c657f["showLegend"]);
  return { "imageWidthMm": _0x31c126["contentWidthMm"], "imageHeightMm": _0x31c126["contentHeightMm"], "captureAspectRatio": _0x33f518, "printTitle": _0x1c657f["printTitle"], "printDate": /* @__PURE__ */ new Date(), "footerText": _0x1c657f["footerText"], "showNorthArrow": _0x1c657f["showNorthArrow"], "northArrowRotationDeg": _0x5957db, "showScaleBar": _0x1c657f["showScaleBar"], "scaleRatioLabel": _0xaeff7d, "pageWidthMm": _0x306e04["widthMm"], "pageHeightMm": _0x306e04["heightMm"], "pageMarginMm": PAGE_MARGIN_MM, "headerHeightMm": _0x57b643, "footerHeightMm": _0x124dd7, "showLegend": _0x1c657f["showLegend"], "datasetNames": _0x4ebfdf, "legendEntries": _0x365b1f };
}
async function resolvePrintLegendEntries(_0x419b0b, _0x431c12) {
  if (!_0x431c12) return [];
  const _0x1724db = _0x419b0b["layerManager"];
  return collectPrintLegendEntries(_0x1724db, _0x1724db["getLayers"]());
}
function computeImageContentDimensionsMm(_0x56b63e, _0x40152b, _0x1abed1) {
  const _0x507d48 = _0x56b63e["heightMm"] - 2 * PAGE_MARGIN_MM - _0x40152b - _0x1abed1, _0x19e0a1 = _0x56b63e["heightMm"] * IMAGE_TOP_HALF_RATIO;
  return { "contentWidthMm": _0x56b63e["widthMm"] - 2 * PAGE_MARGIN_MM, "contentHeightMm": Math["min"](_0x507d48, _0x19e0a1) };
}
function computeScaleRatioLabel(_0x35e50f, _0x2a74f1) {
  if (!_0x2a74f1) return null;
  const _0x42373f = _0x35e50f["measureGroundMetersPerPixel"]();
  return _0x42373f !== null ? calculateScaleRatio(_0x42373f, SCREEN_METERS_PER_PIXEL)["label"] : null;
}
const PAPER_SIZES_MM = { "a0": { "widthMm": 841, "heightMm": 1189, "label": "A0" }, "a1": { "widthMm": 594, "heightMm": 841, "label": "A1" }, "a2": { "widthMm": 420, "heightMm": 594, "label": "A2" }, "a3": { "widthMm": 297, "heightMm": 420, "label": "A3" }, "a4": { "widthMm": 210, "heightMm": 297, "label": "A4" }, "a5": { "widthMm": 148, "heightMm": 210, "label": "A5" } }, ORIENTATION_LABELS = { "landscape": "Yatay", "portrait": "Dikey" };
function getPageDimensionsMm(_0x179277, _0x58f0ba) {
  const _0x15f7d7 = PAPER_SIZES_MM[_0x179277];
  return _0x58f0ba === "landscape" ? { "widthMm": _0x15f7d7["heightMm"], "heightMm": _0x15f7d7["widthMm"] } : { "widthMm": _0x15f7d7["widthMm"], "heightMm": _0x15f7d7["heightMm"] };
}
var __defProp$g = Object["defineProperty"], __getOwnPropDesc$h = Object["getOwnPropertyDescriptor"], __decorateClass$h = (_0x38cb38, _0x166e03, _0x30fb29, _0x178571) => {
  var _0x1360dc = _0x178571 > 1 ? void 0 : _0x178571 ? __getOwnPropDesc$h(_0x166e03, _0x30fb29) : _0x166e03;
  for (var _0x561e25 = _0x38cb38["length"] - 1, _0x56e4fb; _0x561e25 >= 0; _0x561e25--) if (_0x56e4fb = _0x38cb38[_0x561e25]) _0x1360dc = (_0x178571 ? _0x56e4fb(_0x166e03, _0x30fb29, _0x1360dc) : _0x56e4fb(_0x1360dc)) || _0x1360dc;
  if (_0x178571 && _0x1360dc) __defProp$g(_0x166e03, _0x30fb29, _0x1360dc);
  return _0x1360dc;
};
let TucbsPrintPanelContent = class extends i$2 {
  constructor() {
    super(...arguments), this["paperSize"] = "a4", this["orientation"] = "portrait", this["showNorthArrowCheckbox"] = !![], this["showScaleBarCheckbox"] = !![], this["showLegendCheckbox"] = !![], this["showNorthArrow"] = !![], this["showScaleBar"] = !![], this["showLegend"] = ![], this["busy"] = ![];
  }
  ["render"]() {
    return b`
      <button
        type="button"
        class="btn download-btn"
        ?disabled=${this["busy"]}
        @click=${() => {
      var _a2;
      return (_a2 = this["onDownloadClick"]) == null ? void 0 : _a2.call(this);
    }}
      >
        Harita İndir (JPG)
      </button>
      <div class="panel">
        <div class="row">
          <label class="field">
            Kağıt Boyutu
            <select
              @change=${(_0x210bc0) => {
      var _a2;
      return (_a2 = this["onPaperSizeChange"]) == null ? void 0 : _a2.call(this, _0x210bc0["target"]["value"]);
    }}
            >
              ${Object["entries"](PAPER_SIZES_MM)["map"](([_0x43b337, _0x30a7fa]) => b`<option value=${_0x43b337} ?selected=${_0x43b337 === this["paperSize"]}>${_0x30a7fa["label"]}</option>`)}
            </select>
          </label>
          <label class="field">
            Yön
            <select
              @change=${(_0x4187e2) => {
      var _a2;
      return (_a2 = this["onOrientationChange"]) == null ? void 0 : _a2.call(this, _0x4187e2["target"]["value"]);
    }}
            >
              ${Object["entries"](ORIENTATION_LABELS)["map"](([_0x50d7ee, _0x5b5b2a]) => b`<option value=${_0x50d7ee} ?selected=${_0x50d7ee === this["orientation"]}>${_0x5b5b2a}</option>`)}
            </select>
          </label>
        </div>
        ${this["showNorthArrowCheckbox"] ? b`<label class="checkbox-row">
              <input
                type="checkbox"
                .checked=${this["showNorthArrow"]}
                @change=${(_0x361c32) => {
      var _a2;
      return (_a2 = this["onNorthArrowToggle"]) == null ? void 0 : _a2.call(this, _0x361c32["target"]["checked"]);
    }}
              />
              Kuzey Oku Göster
            </label>` : ""}
        ${this["showScaleBarCheckbox"] ? b`<label class="checkbox-row">
              <input
                type="checkbox"
                .checked=${this["showScaleBar"]}
                @change=${(_0x35ae84) => {
      var _a2;
      return (_a2 = this["onScaleBarToggle"]) == null ? void 0 : _a2.call(this, _0x35ae84["target"]["checked"]);
    }}
              />
              Ölçek Oranı Göster
            </label>` : ""}
        ${this["showLegendCheckbox"] ? b`<label class="checkbox-row">
              <input
                type="checkbox"
                .checked=${this["showLegend"]}
                @change=${(_0x59f50e) => {
      var _a2;
      return (_a2 = this["onLegendToggle"]) == null ? void 0 : _a2.call(this, _0x59f50e["target"]["checked"]);
    }}
              />
              Lejant Göster
            </label>` : ""}
        <button type="button" class="btn" ?disabled=${this["busy"]} @click=${() => {
      var _a2;
      return (_a2 = this["onPrintClick"]) == null ? void 0 : _a2.call(this);
    }}>
          Yazdır
        </button>
      </div>
    `;
  }
};
TucbsPrintPanelContent["styles"] = i$5`
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
  `, __decorateClass$h([n$1({ "attribute": ![] })], TucbsPrintPanelContent["prototype"], "paperSize", 2), __decorateClass$h([n$1({ "attribute": ![] })], TucbsPrintPanelContent["prototype"], "orientation", 2), __decorateClass$h([n$1({ "type": Boolean, "attribute": ![] })], TucbsPrintPanelContent["prototype"], "showNorthArrowCheckbox", 2), __decorateClass$h([n$1({ "type": Boolean, "attribute": ![] })], TucbsPrintPanelContent["prototype"], "showScaleBarCheckbox", 2), __decorateClass$h([n$1({ "type": Boolean, "attribute": ![] })], TucbsPrintPanelContent["prototype"], "showLegendCheckbox", 2), __decorateClass$h([n$1({ "type": Boolean, "attribute": ![] })], TucbsPrintPanelContent["prototype"], "showNorthArrow", 2), __decorateClass$h([n$1({ "type": Boolean, "attribute": ![] })], TucbsPrintPanelContent["prototype"], "showScaleBar", 2), __decorateClass$h([n$1({ "type": Boolean, "attribute": ![] })], TucbsPrintPanelContent["prototype"], "showLegend", 2), __decorateClass$h([n$1({ "type": Boolean, "attribute": ![] })], TucbsPrintPanelContent["prototype"], "busy", 2), __decorateClass$h([n$1({ "attribute": ![] })], TucbsPrintPanelContent["prototype"], "onPaperSizeChange", 2), __decorateClass$h([n$1({ "attribute": ![] })], TucbsPrintPanelContent["prototype"], "onOrientationChange", 2), __decorateClass$h([n$1({ "attribute": ![] })], TucbsPrintPanelContent["prototype"], "onNorthArrowToggle", 2), __decorateClass$h([n$1({ "attribute": ![] })], TucbsPrintPanelContent["prototype"], "onScaleBarToggle", 2), __decorateClass$h([n$1({ "attribute": ![] })], TucbsPrintPanelContent["prototype"], "onLegendToggle", 2), __decorateClass$h([n$1({ "attribute": ![] })], TucbsPrintPanelContent["prototype"], "onDownloadClick", 2), __decorateClass$h([n$1({ "attribute": ![] })], TucbsPrintPanelContent["prototype"], "onPrintClick", 2), TucbsPrintPanelContent = __decorateClass$h([t$3("tucbs-print-panel-content")], TucbsPrintPanelContent);
var __defProp$f = Object["defineProperty"], __getOwnPropDesc$g = Object["getOwnPropertyDescriptor"], __decorateClass$g = (_0x5f90b8, _0x54a2b9, _0x285486, _0x4329b7) => {
  var _0x6883b3 = _0x4329b7 > 1 ? void 0 : _0x4329b7 ? __getOwnPropDesc$g(_0x54a2b9, _0x285486) : _0x54a2b9;
  for (var _0x21b3bb = _0x5f90b8["length"] - 1, _0x7e03fc; _0x21b3bb >= 0; _0x21b3bb--) if (_0x7e03fc = _0x5f90b8[_0x21b3bb]) _0x6883b3 = (_0x4329b7 ? _0x7e03fc(_0x54a2b9, _0x285486, _0x6883b3) : _0x7e03fc(_0x6883b3)) || _0x6883b3;
  if (_0x4329b7 && _0x6883b3) __defProp$f(_0x54a2b9, _0x285486, _0x6883b3);
  return _0x6883b3;
};
const ICON_PRINT = o$1(iconNodeToString(_16_default$d));
let TucbsPrintTool = class extends i$2 {
  constructor() {
    super(...arguments), this["mapElementId"] = "", this["panelWidth"] = "360px", this["customCss"] = "", this["filename"] = "tucbs-harita", this["pageSize"] = "a4", this["pageOrientation"] = "portrait", this["footerText"] = "", this["printTitle"] = "Harita Görünümü", this["showLegendCheckbox"] = !![], this["showScaleBarCheckbox"] = !![], this["showNorthArrowCheckbox"] = !![], this["_open"] = ![], this["_busy"] = ![], this["_selectedPaperSize"] = this["pageSize"], this["_selectedOrientation"] = this["pageOrientation"], this["_showNorthArrow"] = !![], this["_showScaleBar"] = !![], this["_showLegend"] = ![], this["_layoutController"] = new PanelLayoutController(this), this["_previewController"] = new PrintPreviewOverlayController(), this["_customCssState"] = { "sheet": null }, this["_panelEl"] = null;
  }
  ["connectedCallback"]() {
    super["connectedCallback"](), this["_layoutController"]["onExclusiveClose"] = () => {
      if (this["_open"]) this["_toggle"]();
    };
    const _0x50b475 = document["createElement"]("tucbs-slide-over-panel");
    _0x50b475["panelTitle"] = "Yazdır", _0x50b475["panelWidth"] = this["panelWidth"], _0x50b475["scrollBody"] = ![], _0x50b475["onCloseRequest"] = () => this["_toggle"](), document["body"]["appendChild"](_0x50b475), this["_panelEl"] = _0x50b475, this["_renderIntoPanel"]();
  }
  ["disconnectedCallback"]() {
    var _a2;
    if (this["map"]) this["_layoutController"]["unbindMap"](this["map"]);
    (_a2 = this["_panelEl"]) == null ? void 0 : _a2["remove"](), this["_panelEl"] = null, this["_previewController"]["close"](), super["disconnectedCallback"]();
  }
  ["firstUpdated"]() {
    bindMapByElementId(this, { "noIdTiming": "sync", ...standardMapBindingMessages("tucbs-print-tool", "islevsiz") });
  }
  ["updated"](_0x348117) {
    _0x348117["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_customCssState"], "tucbs-print-tool");
    if (_0x348117["has"]("map")) {
      const _0x3b5a6e = _0x348117["get"]("map");
      if (_0x3b5a6e) this["_layoutController"]["unbindMap"](_0x3b5a6e);
      if (this["map"]) this["_layoutController"]["bindMap"](this["map"]);
    }
    if (_0x348117["has"]("panelWidth") && this["_open"]) this["_layoutController"]["setOpen"](!![], this["panelWidth"]);
    if (this["_panelEl"]) this["_panelEl"]["panelWidth"] = this["panelWidth"];
    this["_renderIntoPanel"]();
  }
  ["_toggle"]() {
    if (!this["map"]) return;
    this["_open"] = !this["_open"], this["_layoutController"]["setOpen"](this["_open"], this["panelWidth"]), this["_renderIntoPanel"]();
  }
  async ["_onDownloadClick"]() {
    if (this["_busy"] || !this["map"]) return;
    this["_busy"] = !![];
    try {
      await this["map"]["exportJPEG"](this["filename"]);
    } finally {
      this["_busy"] = ![];
    }
  }
  async ["_onPrintClick"]() {
    if (this["_busy"] || !this["map"]) return;
    this["_busy"] = !![];
    try {
      await this["_openPreview"]();
    } finally {
      this["_busy"] = ![];
    }
  }
  async ["_openPreview"]() {
    if (!this["map"]) return;
    const _0x2935b0 = await this["map"]["captureScreenshotBlob"](), _0x48c044 = await buildPrintPreviewInput({ "map": this["map"], "pageDims": getPageDimensionsMm(this["_selectedPaperSize"], this["_selectedOrientation"]), "printTitle": this["printTitle"], "footerText": this["footerText"], "showNorthArrow": this["_showNorthArrow"], "showScaleBar": this["_showScaleBar"], "showLegend": this["_showLegend"] });
    await this["_previewController"]["show"](_0x2935b0, _0x48c044);
  }
  ["_onPaperSizeChange"](_0x490b9f) {
    this["_selectedPaperSize"] = _0x490b9f;
  }
  ["_onOrientationChange"](_0x24364d) {
    this["_selectedOrientation"] = _0x24364d;
  }
  ["_onNorthArrowToggle"](_0x192bb0) {
    this["_showNorthArrow"] = _0x192bb0;
  }
  ["_onScaleBarToggle"](_0x4e59b6) {
    this["_showScaleBar"] = _0x4e59b6;
  }
  ["_onLegendToggle"](_0x92339e) {
    this["_showLegend"] = _0x92339e;
  }
  ["_renderIntoPanel"]() {
    if (!this["_panelEl"]) return;
    this["_panelEl"]["open"] = this["_open"], D(b`
        <span slot="icon">${ICON_PRINT}</span>
        <tucbs-print-panel-content
          .paperSize=${this["_selectedPaperSize"]}
          .orientation=${this["_selectedOrientation"]}
          .showNorthArrowCheckbox=${this["showNorthArrowCheckbox"]}
          .showScaleBarCheckbox=${this["showScaleBarCheckbox"]}
          .showLegendCheckbox=${this["showLegendCheckbox"]}
          .showNorthArrow=${this["_showNorthArrow"]}
          .showScaleBar=${this["_showScaleBar"]}
          .showLegend=${this["_showLegend"]}
          .busy=${this["_busy"]}
          .onPaperSizeChange=${(_0x3da8d5) => this["_onPaperSizeChange"](_0x3da8d5)}
          .onOrientationChange=${(_0x5484e5) => this["_onOrientationChange"](_0x5484e5)}
          .onNorthArrowToggle=${(_0x118f56) => this["_onNorthArrowToggle"](_0x118f56)}
          .onScaleBarToggle=${(_0xa4afd1) => this["_onScaleBarToggle"](_0xa4afd1)}
          .onLegendToggle=${(_0x185194) => this["_onLegendToggle"](_0x185194)}
          .onDownloadClick=${() => this["_onDownloadClick"]()}
          .onPrintClick=${() => this["_onPrintClick"]()}
        ></tucbs-print-panel-content>
      `, this["_panelEl"]);
  }
  ["render"]() {
    return b`
      <button
        type="button"
        class="tool-button ${this["_open"] ? "active" : ""}"
        aria-label="Yazdır"
        data-tooltip="Yazdır"
        aria-pressed=${this["_open"]}
        @click=${this["_toggle"]}
      >
        ${ICON_PRINT}
      </button>
    `;
  }
};
TucbsPrintTool["styles"] = [leftTooltipStyles, i$5`
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
  `], __decorateClass$g([n$1()], TucbsPrintTool["prototype"], "mapElementId", 2), __decorateClass$g([n$1({ "attribute": "panel-width" })], TucbsPrintTool["prototype"], "panelWidth", 2), __decorateClass$g([n$1({ "attribute": "custom-css" })], TucbsPrintTool["prototype"], "customCss", 2), __decorateClass$g([n$1()], TucbsPrintTool["prototype"], "filename", 2), __decorateClass$g([n$1({ "attribute": "page-size" })], TucbsPrintTool["prototype"], "pageSize", 2), __decorateClass$g([n$1({ "attribute": "page-orientation" })], TucbsPrintTool["prototype"], "pageOrientation", 2), __decorateClass$g([n$1({ "attribute": "footer-text" })], TucbsPrintTool["prototype"], "footerText", 2), __decorateClass$g([n$1({ "attribute": "print-title" })], TucbsPrintTool["prototype"], "printTitle", 2), __decorateClass$g([n$1({ "type": Boolean, "attribute": "show-legend-checkbox" })], TucbsPrintTool["prototype"], "showLegendCheckbox", 2), __decorateClass$g([n$1({ "type": Boolean, "attribute": "show-scale-bar-checkbox" })], TucbsPrintTool["prototype"], "showScaleBarCheckbox", 2), __decorateClass$g([n$1({ "type": Boolean, "attribute": "show-north-arrow-checkbox" })], TucbsPrintTool["prototype"], "showNorthArrowCheckbox", 2), __decorateClass$g([n$1({ "attribute": ![] })], TucbsPrintTool["prototype"], "map", 2), __decorateClass$g([r()], TucbsPrintTool["prototype"], "_open", 2), __decorateClass$g([r()], TucbsPrintTool["prototype"], "_busy", 2), __decorateClass$g([r()], TucbsPrintTool["prototype"], "_selectedPaperSize", 2), __decorateClass$g([r()], TucbsPrintTool["prototype"], "_selectedOrientation", 2), __decorateClass$g([r()], TucbsPrintTool["prototype"], "_showNorthArrow", 2), __decorateClass$g([r()], TucbsPrintTool["prototype"], "_showScaleBar", 2), __decorateClass$g([r()], TucbsPrintTool["prototype"], "_showLegend", 2), TucbsPrintTool = __decorateClass$g([t$3("tucbs-print-tool")], TucbsPrintTool);
const COGRAFI_HELP = { "sinir": { "ne": ["Seçilen geometrinin sınırını üretir: sınırlayıcı kutu veya dışbükey zarf."], "girdiler": ["Zorunlu: haritadan bir nesne (nokta / çizgi / poligon)", "Sınır tipi: Sınırlayıcı Kutu veya Dışbükey Zarf", "Çıktı geometrisi: poligon veya çizgi"], "adimlar": ["Analiz listesinden Sınır’ı açın", "Haritada nesneyi seçin", "Sınır tipini ve çıktı geometrisini ayarlayın", "Çalıştır’a basın; sonuç yeni katman olur"], "ornek": ["Yol veya park katmanını ekleyin", "Nesneyi seçin; sınır tipi ve çıktıyı ayarlayın", "Çalıştırın ve yeni sınır katmanını kontrol edin"] }, "tampon": { "ne": ["Seçilen geometrinin etrafında verilen mesafede (metre) tampon poligonu oluşturur."], "girdiler": ["Zorunlu: haritadan bir nesne (nokta / çizgi / poligon)", "Zorunlu: mesafe (metre), 0’dan büyük"], "adimlar": ["Analiz listesinden Tampon’u açın", "Haritada nesneyi seçin", "Mesafeyi metre cinsinden girin", "Çalıştır’a basın; tampon yeni katman olur"], "ornek": ["Nokta, çizgi veya alan ekleyin", "Nesneyi seçin; mesafe girin (örn. 300)", "Çalıştırın"] }, "kirp": { "ne": ["Kaynak nesnenin, çizilen dikdörtgen içinde kalan kısmını tutar."], "girdiler": ["Zorunlu: kırpılacak nesne", "Zorunlu: haritada çizilen dikdörtgen alan"], "adimlar": ["Analiz listesinden Kırp’ı açın", "Kaynak nesneyi seçin", "Alan çiz ile dikdörtgeni belirleyin", "Çalıştır’a basın"], "ornek": ["Kaynağı seçin", "Parkın bir kısmını kapsayan dikdörtgen çizin", "Yalnızca içerde kalan parçayı kontrol edin"] }, "fark": { "ne": ["İlk poligondan ikinci poligonla örtüşen kısmı çıkarır."], "girdiler": ["Zorunlu: ilk poligon (kaynak)", "Zorunlu: ikinci poligon (çıkarılacak)"], "adimlar": ["Analiz listesinden Fark’ı açın", "İki poligon yuvalarını doldurun", "Çalıştır’a basın; örtüşmeyen kısım sonuç olur"], "ornek": ["İlk = kaynak poligon, ikinci = çıkarılacak poligon", "Çalıştırın", "Örtüşen dilimin eksildiğini kontrol edin"] }, "kesisim": { "ne": ["İki poligonun ortak (kesişen) alanını üretir."], "girdiler": ["Zorunlu: birinci poligon", "Zorunlu: ikinci poligon", "Örtüşme yoksa sonuç boş kalabilir"], "adimlar": ["Analiz listesinden Kesişim’i açın", "İki poligon yuvalarını doldurun", "Çalıştır’a basın; ortak alan yeni katman olur"], "ornek": ["İki örtüşen poligon seçin", "Çalıştırın", "Yalnızca ortak bölgenin kaldığını kontrol edin"] }, "cikarma": { "ne": ["Bir poligondan, diğeriyle örtüşen kısımları kaldırır."], "girdiler": ["Zorunlu: kaynak poligon", "Zorunlu: örtüşen poligon"], "adimlar": ["Analiz listesinden Çıkarma’yı açın", "Kaynak ve örtüşen poligonu seçin", "Çalıştır’a basın"], "ornek": ["Kaynak ve örtüşen poligonu seçin", "Çalıştırın", "Örtüşen bölgenin kaynaktan çıktığını kontrol edin"] }, "birlestir": { "ne": ["İki poligonu tek birleşik alana eritir."], "girdiler": ["Zorunlu: birinci poligon", "Zorunlu: ikinci poligon"], "adimlar": ["Analiz listesinden Birleştir’i açın", "İki poligon yuvalarını doldurun", "Çalıştır’a basın; birleşik alan yeni katman olur"], "ornek": ["İki poligon seçin", "Çalıştırın", "Tek birleşik sınırın oluştuğunu kontrol edin"] }, "kama": { "ne": ["Nokta etrafında mesafe ve açı aralığıyla dilim (kama) tamponu üretir."], "girdiler": ["Zorunlu: nokta", "Zorunlu: mesafe (metre) > 0", "Zorunlu: başlangıç açısı bitiş açısından küçük (0° = kuzey)"], "adimlar": ["Analiz listesinden Kama Tampon’u açın", "Haritada bir nokta seçin", "Mesafe ile açıları girin", "Çalıştır’a basın"], "ornek": ["Bir nokta seçin", "Örn. 200 m, 0°–90°", "Noktadan yayılan dilimi kontrol edin"] } }, analysisHelpStyles = i$5`
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
function renderAnalysisHelp(_0x28966c, _0x528126, _0x1d0f30, _0x2ba572) {
  if (!_0x28966c) return null;
  const _0x2442e0 = (_0x41f22c) => _0x41f22c["stopPropagation"]();
  return b`
    <div class="help-back" @click=${_0x2ba572}>
      <div class="help-card" @click=${_0x2442e0}>
        <button type="button" class="help-close" aria-label="Kapat" @click=${_0x2ba572}>×</button>
        <h3>${_0x528126}</h3>
        <h4>Ne işe yarar</h4>
        ${_0x1d0f30["ne"]["map"]((_0x324255) => b`<p>${_0x324255}</p>`)}
        <h4>Girdiler</h4>
        <ul>${_0x1d0f30["girdiler"]["map"]((_0x412c40) => b`<li>${_0x412c40}</li>`)}</ul>
        <h4>Adımlar</h4>
        <ol>${_0x1d0f30["adimlar"]["map"]((_0x371473) => b`<li>${_0x371473}</li>`)}</ol>
        <h4>Örnek</h4>
        <ol>${_0x1d0f30["ornek"]["map"]((_0x4ee346) => b`<li>${_0x4ee346}</li>`)}</ol>
      </div>
    </div>
  `;
}
var __defProp$e = Object["defineProperty"], __getOwnPropDesc$f = Object["getOwnPropertyDescriptor"], __decorateClass$f = (_0x182950, _0x2e87a5, _0x421c54, _0x5c654f) => {
  var _0x2c3765 = _0x5c654f > 1 ? void 0 : _0x5c654f ? __getOwnPropDesc$f(_0x2e87a5, _0x421c54) : _0x2e87a5;
  for (var _0x1a95dc = _0x182950["length"] - 1, _0x527a48; _0x1a95dc >= 0; _0x1a95dc--) if (_0x527a48 = _0x182950[_0x1a95dc]) _0x2c3765 = (_0x5c654f ? _0x527a48(_0x2e87a5, _0x421c54, _0x2c3765) : _0x527a48(_0x2c3765)) || _0x2c3765;
  if (_0x5c654f && _0x2c3765) __defProp$e(_0x2e87a5, _0x421c54, _0x2c3765);
  return _0x2c3765;
};
let TucbsBufferTool = class extends i$2 {
  constructor() {
    super(...arguments), this["mapElementId"] = "", this["map"] = null, this["selectedLabel"] = "", this["distanceM"] = null, this["customCss"] = "", this["_distanceStr"] = "", this["_status"] = "idle", this["_message"] = "", this["_helpOpen"] = ![], this["_selectedFeature"] = null, this["_map"] = null, this["_mapHost"] = null, this["_customCssState"] = { "sheet": null }, this["_onEntityClick"] = (_0x22b2dc) => {
      const _0x484811 = entityToGeoJSON(_0x22b2dc["entity"]);
      if (!_0x484811) {
        this["_note"]("error", "Seçilen özellikten GeoJSON üretilemedi.");
        return;
      }
      this["_selectedFeature"] = { "type": "Feature", "id": _0x484811["id"], "properties": _0x484811["properties"] ?? {}, "geometry": _0x484811["geometry"] }, this["selectedLabel"] = featureLabel(_0x484811), this["_status"] = "idle", this["_message"] = "", this["_syncHighlight"]();
    }, this["_onMapReady"] = () => {
      this["_bindMap"]();
    };
  }
  ["connectedCallback"]() {
    super["connectedCallback"](), this["distanceM"] != null && this["distanceM"] > 0 && (this["_distanceStr"] = String(this["distanceM"])), this["_bindMap"]();
  }
  ["disconnectedCallback"]() {
    this["_unbindMap"](), super["disconnectedCallback"]();
  }
  ["updated"](_0x253dc8) {
    _0x253dc8["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_customCssState"], "tucbs-buffer-tool"), _0x253dc8["has"]("distanceM") && this["distanceM"] != null && (this["_distanceStr"] = String(this["distanceM"])), (_0x253dc8["has"]("mapElementId") || _0x253dc8["has"]("map")) && (this["_unbindMap"](), this["_bindMap"]());
  }
  ["_resolveMap"]() {
    var _a2;
    if (this["map"]) return this["map"];
    return ((_a2 = this["_resolveMapHost"]()) == null ? void 0 : _a2["map"]) ?? null;
  }
  ["_resolveMapHost"]() {
    if (!this["mapElementId"]) return null;
    return document["getElementById"](this["mapElementId"]);
  }
  ["_bindMap"]() {
    if (this["map"]) {
      this["_attachInteraction"](this["map"]);
      return;
    }
    const _0x4488d9 = this["_resolveMapHost"]();
    if (!_0x4488d9) return;
    this["_mapHost"] = _0x4488d9;
    if (_0x4488d9["map"]) {
      this["_attachInteraction"](_0x4488d9["map"]);
      return;
    }
    _0x4488d9["addEventListener"]("ready", this["_onMapReady"], { "once": !![] });
  }
  ["_attachInteraction"](_0x5a545d) {
    if (this["_map"] === _0x5a545d) return;
    this["_map"] && (this["_map"]["interactionManager"]["off"]("entity:click", this["_onEntityClick"]), this["_map"]["interactionManager"]["resumeIdentify"]()), this["_map"] = _0x5a545d, _0x5a545d["interactionManager"]["on"]("entity:click", this["_onEntityClick"]), _0x5a545d["interactionManager"]["suspendIdentify"]();
  }
  ["_unbindMap"]() {
    this["_map"] && (this["_map"]["interactionManager"]["off"]("entity:click", this["_onEntityClick"]), this["_map"]["clearSelectionHighlight"](), this["_map"]["interactionManager"]["resumeIdentify"](), this["_map"] = null), this["_mapHost"] && (this["_mapHost"]["removeEventListener"]("ready", this["_onMapReady"]), this["_mapHost"] = null);
  }
  ["_onDistanceInput"](_0xc69d60) {
    const _0x4efb31 = _0xc69d60["target"]["value"];
    this["_distanceStr"] = _0x4efb31;
    const _0x5ec826 = Number(_0x4efb31);
    this["distanceM"] = Number["isFinite"](_0x5ec826) ? _0x5ec826 : null;
  }
  ["_onReselect"]() {
    this["selectedLabel"] = "", this["_selectedFeature"] = null, this["_note"]("info", "Haritada bir noktaya / çizgiye / alana tıklayın."), this["_syncHighlight"]();
  }
  ["_clearForm"]() {
    this["_selectedFeature"] = null, this["selectedLabel"] = "", this["_distanceStr"] = "", this["distanceM"] = null, this["_syncHighlight"]();
  }
  ["_syncHighlight"]() {
    var _a2;
    (_a2 = this["_map"]) == null ? void 0 : _a2["showSelectionHighlight"](this["_selectedFeature"] ? [this["_selectedFeature"]] : []);
  }
  ["_onSelectionClick"]() {
    this["_selectedFeature"] ? this["_note"]("info", "Seçili: " + this["selectedLabel"]) : this["_note"]("info", "Haritada bir noktaya, çizgiye veya alana tıklayın.");
  }
  async ["_onRun"]() {
    if (this["_status"] === "loading") return;
    const _0x1c64e1 = Number(this["_distanceStr"]);
    if (!this["_selectedFeature"]) {
      this["_note"]("error", "Lütfen haritada bir nesne seçin.");
      return;
    }
    if (!this["_distanceStr"] || Number["isNaN"](_0x1c64e1) || _0x1c64e1 <= 0) {
      this["_note"]("error", "Geçerli bir mesafe (metre) girin.");
      return;
    }
    !this["_map"] && this["_bindMap"]();
    const _0x209ab2 = this["_resolveMap"]();
    if (!_0x209ab2) {
      this["_note"]("error", "Harita henüz hazır değil.");
      return;
    }
    this["_map"] = _0x209ab2, this["distanceM"] = _0x1c64e1, this["_status"] = "loading", this["_message"] = "İşleniyor…", this["dispatchEvent"](new CustomEvent("tucbs-buffer-run", { "detail": { "mapElementId": this["mapElementId"], "distanceM": _0x1c64e1, "selectedLabel": this["selectedLabel"] }, "bubbles": !![], "composed": !![] }));
    try {
      const _0x19f57b = "Tampon sonucu (" + _0x1c64e1 + "m)";
      await _0x209ab2["runBuffer"]({ "geojson": this["_selectedFeature"], "distanceM": _0x1c64e1 }, { "title": _0x19f57b }), this["_clearForm"](), this["_status"] = "idle", this["_message"] = "", showToast("success", "Tampon katmanı eklendi.");
    } catch (_0x443305) {
      _0x443305 instanceof TucbsError && console["error"]("[tucbs-buffer-tool] " + _0x443305["code"] + " (" + _0x443305["number"] + "): " + _0x443305["message"]), this["_note"]("error", _0x443305 instanceof Error ? _0x443305["message"] : "Tampon üretimi başarısız.");
    }
  }
  ["_note"](_0x3eb214, _0x23538f) {
    this["_status"] = "idle", this["_message"] = "", showToast(_0x3eb214, _0x23538f);
  }
  ["render"]() {
    const _0x1af5ff = this["_status"] === "loading", _0x430e27 = Boolean(this["_selectedFeature"] && this["_distanceStr"]) && !_0x1af5ff;
    return b`
      <div class="panel">
        <div class="title-row">
          <h3 class="title">Tampon</h3>
          <button type="button" class="help" aria-label="Yardım" title="Yardım" @click=${() => {
      this["_helpOpen"] = !![];
    }}>?</button>
        </div>
        ${renderAnalysisHelp(this["_helpOpen"], "Tampon", COGRAFI_HELP["tampon"], () => {
      this["_helpOpen"] = ![];
    })}

        <div class="row-between">
          <label class="lbl">Etrafında tampon oluştur...</label>
        </div>

        <div class="input-wrap">
          <input
            type="text"
            readonly
            placeholder="Haritada nesne seçin"
            .value=${this["selectedLabel"] ? "= " + this["selectedLabel"] : ""}
            @click=${this["_onSelectionClick"]}
          />
          <button
            type="button"
            class="refresh"
            title="Yeniden seç"
            ?disabled=${_0x1af5ff}
            @click=${this["_onReselect"]}
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
            .value=${this["_distanceStr"]}
            ?disabled=${_0x1af5ff}
            @input=${this["_onDistanceInput"]}
          />
          <span class="unit">m</span>
        </div>

        <div class="actions">
          <button class="run" type="button" ?disabled=${!_0x430e27} @click=${this["_onRun"]}>
            ${_0x1af5ff ? "İşleniyor..." : "Çalıştır"}
          </button>
        </div>

        ${this["_message"] ? b`<p class="status ${this["_status"]}">${this["_message"]}</p>` : null}
      </div>
    `;
  }
};
TucbsBufferTool["styles"] = [i$5`
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
  `, analysisHelpStyles], __decorateClass$f([n$1()], TucbsBufferTool["prototype"], "mapElementId", 2), __decorateClass$f([n$1({ "attribute": ![] })], TucbsBufferTool["prototype"], "map", 2), __decorateClass$f([n$1()], TucbsBufferTool["prototype"], "selectedLabel", 2), __decorateClass$f([n$1({ "type": Number })], TucbsBufferTool["prototype"], "distanceM", 2), __decorateClass$f([n$1({ "attribute": "custom-css" })], TucbsBufferTool["prototype"], "customCss", 2), __decorateClass$f([r()], TucbsBufferTool["prototype"], "_distanceStr", 2), __decorateClass$f([r()], TucbsBufferTool["prototype"], "_status", 2), __decorateClass$f([r()], TucbsBufferTool["prototype"], "_message", 2), __decorateClass$f([r()], TucbsBufferTool["prototype"], "_helpOpen", 2), TucbsBufferTool = __decorateClass$f([t$3("tucbs-buffer-tool")], TucbsBufferTool);
var __defProp$d = Object["defineProperty"], __getOwnPropDesc$e = Object["getOwnPropertyDescriptor"], __decorateClass$e = (_0x417852, _0x1b17e4, _0x2613fe, _0x320df2) => {
  var _0x3bde5b = _0x320df2 > 1 ? void 0 : _0x320df2 ? __getOwnPropDesc$e(_0x1b17e4, _0x2613fe) : _0x1b17e4;
  for (var _0xf432a4 = _0x417852["length"] - 1, _0x33370f; _0xf432a4 >= 0; _0xf432a4--) if (_0x33370f = _0x417852[_0xf432a4]) _0x3bde5b = (_0x320df2 ? _0x33370f(_0x1b17e4, _0x2613fe, _0x3bde5b) : _0x33370f(_0x3bde5b)) || _0x3bde5b;
  if (_0x320df2 && _0x3bde5b) __defProp$d(_0x1b17e4, _0x2613fe, _0x3bde5b);
  return _0x3bde5b;
};
function isPolygonFeature$1(_0x4ec7d2) {
  var _a2;
  const _0x57082b = (_a2 = _0x4ec7d2 == null ? void 0 : _0x4ec7d2["geometry"]) == null ? void 0 : _a2["type"];
  return _0x57082b === "Polygon" || _0x57082b === "MultiPolygon";
}
let TucbsIntersectionTool = class extends i$2 {
  constructor() {
    super(...arguments), this["mapElementId"] = "", this["map"] = null, this["customCss"] = "", this["_labelA"] = "", this["_labelB"] = "", this["_status"] = "idle", this["_message"] = "", this["_helpOpen"] = ![], this["_featureA"] = null, this["_featureB"] = null, this["_pendingSlot"] = null, this["_map"] = null, this["_mapHost"] = null, this["_customCssState"] = { "sheet": null }, this["_onEntityClick"] = (_0x5a03ec) => {
      var _a2;
      if (!this["_pendingSlot"]) return;
      const _0x104b09 = entityToGeoJSON(_0x5a03ec["entity"]);
      if (!_0x104b09) {
        this["_note"]("error", "Seçilen özellikten GeoJSON üretilemedi.");
        return;
      }
      const _0xac1f17 = { "type": "Feature", "id": _0x104b09["id"], "properties": _0x104b09["properties"] ?? {}, "geometry": _0x104b09["geometry"] }, _0x9ebddb = (_a2 = _0xac1f17["geometry"]) == null ? void 0 : _a2["type"];
      if (_0x9ebddb !== "Polygon" && _0x9ebddb !== "MultiPolygon") {
        this["_note"]("error", "Kesişim için yalnızca poligon seçin.");
        return;
      }
      const _0x441d52 = featureLabel(_0x104b09);
      this["_pendingSlot"] === "a" ? (this["_featureA"] = _0xac1f17, this["_labelA"] = _0x441d52) : (this["_featureB"] = _0xac1f17, this["_labelB"] = _0x441d52), this["_pendingSlot"] = null, this["_status"] = "idle", this["_message"] = "", this["_syncHighlight"]();
    }, this["_onMapReady"] = () => {
      this["_bindMap"]();
    };
  }
  ["connectedCallback"]() {
    super["connectedCallback"](), this["_bindMap"]();
  }
  ["disconnectedCallback"]() {
    this["_unbindMap"](), super["disconnectedCallback"]();
  }
  ["updated"](_0x20120c) {
    _0x20120c["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_customCssState"], "tucbs-intersection-tool"), (_0x20120c["has"]("mapElementId") || _0x20120c["has"]("map")) && (this["_unbindMap"](), this["_bindMap"]());
  }
  ["_resolveMap"]() {
    var _a2;
    if (this["map"]) return this["map"];
    return ((_a2 = this["_resolveMapHost"]()) == null ? void 0 : _a2["map"]) ?? null;
  }
  ["_resolveMapHost"]() {
    if (!this["mapElementId"]) return null;
    return document["getElementById"](this["mapElementId"]);
  }
  ["_bindMap"]() {
    if (this["map"]) {
      this["_attachInteraction"](this["map"]);
      return;
    }
    const _0x309cb8 = this["_resolveMapHost"]();
    if (!_0x309cb8) return;
    this["_mapHost"] = _0x309cb8;
    if (_0x309cb8["map"]) {
      this["_attachInteraction"](_0x309cb8["map"]);
      return;
    }
    _0x309cb8["addEventListener"]("ready", this["_onMapReady"], { "once": !![] });
  }
  ["_attachInteraction"](_0x548603) {
    if (this["_map"] === _0x548603) return;
    this["_map"] && (this["_map"]["interactionManager"]["off"]("entity:click", this["_onEntityClick"]), this["_map"]["interactionManager"]["resumeIdentify"]()), this["_map"] = _0x548603, _0x548603["interactionManager"]["on"]("entity:click", this["_onEntityClick"]), _0x548603["interactionManager"]["suspendIdentify"]();
  }
  ["_unbindMap"]() {
    this["_map"] && (this["_map"]["interactionManager"]["off"]("entity:click", this["_onEntityClick"]), this["_map"]["clearSelectionHighlight"](), this["_map"]["interactionManager"]["resumeIdentify"](), this["_map"] = null), this["_mapHost"] && (this["_mapHost"]["removeEventListener"]("ready", this["_onMapReady"]), this["_mapHost"] = null);
  }
  ["_note"](_0x5673ad, _0x4c0229) {
    this["_status"] = "idle", this["_message"] = "", showToast(_0x5673ad, _0x4c0229);
  }
  ["_beginSelection"](_0x182031) {
    this["_pendingSlot"] = _0x182031, this["_status"] = "idle", this["_note"]("info", _0x182031 === "a" ? "Lütfen ilk poligonu seçin — haritada bir alana tıklayın." : "Lütfen ikinci poligonu seçin — haritada bir alana tıklayın.");
  }
  ["_onInputClick"](_0x321dfa) {
    this["_beginSelection"](_0x321dfa);
  }
  ["_onRefreshSlot"](_0x587bfe) {
    _0x587bfe === "a" ? (this["_featureA"] = null, this["_labelA"] = "") : (this["_featureB"] = null, this["_labelB"] = ""), this["_beginSelection"](_0x587bfe), this["_syncHighlight"]();
  }
  ["_clearForm"]() {
    this["_featureA"] = null, this["_featureB"] = null, this["_labelA"] = "", this["_labelB"] = "", this["_pendingSlot"] = null, this["_syncHighlight"]();
  }
  ["_syncHighlight"]() {
    var _a2;
    const _0x43d62f = [this["_featureA"], this["_featureB"]]["filter"]((_0x7d6a9e) => _0x7d6a9e !== null);
    (_a2 = this["_map"]) == null ? void 0 : _a2["showSelectionHighlight"](_0x43d62f);
  }
  ["_onSwitchToDatasets"]() {
    this["_note"]("info", "Veri kümesi seçimi bu sürümde henüz desteklenmiyor.");
  }
  async ["_onRun"]() {
    if (this["_status"] === "loading") return;
    if (!isPolygonFeature$1(this["_featureA"]) || !isPolygonFeature$1(this["_featureB"])) {
      this["_note"]("error", "Her iki seçim de poligon olmalıdır.");
      return;
    }
    !this["_map"] && this["_bindMap"]();
    const _0x2b341e = this["_resolveMap"]();
    if (!_0x2b341e) {
      this["_note"]("error", "Harita henüz hazır değil.");
      return;
    }
    this["_map"] = _0x2b341e, this["_status"] = "loading", this["_message"] = "İşleniyor…", this["_pendingSlot"] = null, this["dispatchEvent"](new CustomEvent("tucbs-intersection-run", { "detail": { "mapElementId": this["mapElementId"], "labelA": this["_labelA"], "labelB": this["_labelB"] }, "bubbles": !![], "composed": !![] }));
    try {
      await _0x2b341e["runIntersection"]({ "geojsonA": this["_featureA"], "geojsonB": this["_featureB"] }, { "title": "Kesişim sonucu" }), this["_clearForm"](), this["_status"] = "idle", this["_message"] = "", showToast("success", "Kesişim tamamlandı.");
    } catch (_0x4647d0) {
      _0x4647d0 instanceof TucbsError && console["error"]("[tucbs-intersection-tool] " + _0x4647d0["code"] + " (" + _0x4647d0["number"] + "): " + _0x4647d0["message"]), this["_note"]("error", _0x4647d0 instanceof Error ? _0x4647d0["message"] : "Kesişim hesaplanamadı.");
    }
  }
  ["render"]() {
    const _0x148bd2 = this["_status"] === "loading", _0x55a92f = isPolygonFeature$1(this["_featureA"]) && isPolygonFeature$1(this["_featureB"]) && !_0x148bd2;
    return b`
      <div class="panel">
        <div class="title-row">
          <h3 class="title">Kesişim</h3>
          <button type="button" class="help" aria-label="Yardım" title="Yardım" @click=${() => {
      this["_helpOpen"] = !![];
    }}>?</button>
        </div>
        ${renderAnalysisHelp(this["_helpOpen"], "Kesişim", COGRAFI_HELP["kesisim"], () => {
      this["_helpOpen"] = ![];
    })}

        <div class="row-between">
          <label class="lbl">Arasındaki kesişme...</label>
          <button
            type="button"
            class="switch"
            ?disabled=${_0x148bd2}
            @click=${this["_onSwitchToDatasets"]}
          >
            Veri kümelerine geç
          </button>
        </div>

        <div class="input-wrap">
          <input
            type="text"
            readonly
            placeholder="Poligon seç"
            .value=${this["_labelA"] ? "= " + this["_labelA"] : ""}
            ?disabled=${_0x148bd2}
            @click=${() => this["_onInputClick"]("a")}
          />
          <button
            type="button"
            class="refresh"
            title="Yeniden seç"
            ?disabled=${_0x148bd2}
            @click=${() => this["_onRefreshSlot"]("a")}
          >
            ⟳
          </button>
        </div>

        <div class="row-between">
          <label class="lbl">Ve...</label>
          <button
            type="button"
            class="switch"
            ?disabled=${_0x148bd2}
            @click=${this["_onSwitchToDatasets"]}
          >
            Veri kümelerine geç
          </button>
        </div>

        <div class="input-wrap">
          <input
            type="text"
            readonly
            placeholder="Poligon seç"
            .value=${this["_labelB"] ? "= " + this["_labelB"] : ""}
            ?disabled=${_0x148bd2}
            @click=${() => this["_onInputClick"]("b")}
          />
          <button
            type="button"
            class="refresh"
            title="Yeniden seç"
            ?disabled=${_0x148bd2}
            @click=${() => this["_onRefreshSlot"]("b")}
          >
            ⟳
          </button>
        </div>

        <div class="actions">
          <button class="run" type="button" ?disabled=${!_0x55a92f} @click=${this["_onRun"]}>
            ${_0x148bd2 ? "İşleniyor..." : "Çalıştır"}
          </button>
        </div>

        ${this["_message"] ? b`<p class="status ${this["_status"]}">${this["_message"]}</p>` : null}
      </div>
    `;
  }
};
TucbsIntersectionTool["styles"] = [i$5`
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
  `, analysisHelpStyles], __decorateClass$e([n$1()], TucbsIntersectionTool["prototype"], "mapElementId", 2), __decorateClass$e([n$1({ "attribute": ![] })], TucbsIntersectionTool["prototype"], "map", 2), __decorateClass$e([n$1({ "attribute": "custom-css" })], TucbsIntersectionTool["prototype"], "customCss", 2), __decorateClass$e([r()], TucbsIntersectionTool["prototype"], "_labelA", 2), __decorateClass$e([r()], TucbsIntersectionTool["prototype"], "_labelB", 2), __decorateClass$e([r()], TucbsIntersectionTool["prototype"], "_status", 2), __decorateClass$e([r()], TucbsIntersectionTool["prototype"], "_message", 2), __decorateClass$e([r()], TucbsIntersectionTool["prototype"], "_helpOpen", 2), TucbsIntersectionTool = __decorateClass$e([t$3("tucbs-intersection-tool")], TucbsIntersectionTool);
const geoToolStyles = i$5`
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
  constructor(_0x8f65e7, _0x275014, _0x24247f) {
    this["resolve"] = _0x8f65e7, this["onPick"] = _0x275014, this["onBadGeoJson"] = _0x24247f, this["map"] = null, this["host"] = null, this["onReady"] = () => {
      this["attach"]();
    }, this["onClick"] = (_0x1e6062) => {
      const _0x258fce = entityToGeoJSON(_0x1e6062["entity"]);
      if (!_0x258fce) {
        this["onBadGeoJson"]();
        return;
      }
      this["onPick"]({ "type": "Feature", "id": _0x258fce["id"], "properties": _0x258fce["properties"] ?? {}, "geometry": _0x258fce["geometry"] }, featureLabel(_0x258fce));
    };
  }
  ["attach"]() {
    const { map: _0x4ea8b7, mapElementId: _0x11b27c } = this["resolve"]();
    if (_0x4ea8b7) {
      this["listen"](_0x4ea8b7);
      return;
    }
    if (!_0x11b27c) return;
    const _0x56fa34 = document["getElementById"](_0x11b27c);
    if (!_0x56fa34) return;
    this["host"] = _0x56fa34;
    if (_0x56fa34["map"]) {
      this["listen"](_0x56fa34["map"]);
      return;
    }
    _0x56fa34["addEventListener"]("ready", this["onReady"], { "once": !![] });
  }
  ["detach"]() {
    this["map"] && (this["map"]["interactionManager"]["off"]("entity:click", this["onClick"]), this["map"]["clearSelectionHighlight"](), this["map"]["interactionManager"]["resumeIdentify"](), this["map"] = null), this["host"] && (this["host"]["removeEventListener"]("ready", this["onReady"]), this["host"] = null);
  }
  ["current"]() {
    return this["map"] ?? this["resolve"]()["map"];
  }
  ["highlight"](_0x5208a0) {
    var _a2;
    (_a2 = this["map"]) == null ? void 0 : _a2["showSelectionHighlight"](_0x5208a0);
  }
  ["listen"](_0x38ee7e) {
    if (this["map"] === _0x38ee7e) return;
    this["map"] && (this["map"]["interactionManager"]["off"]("entity:click", this["onClick"]), this["map"]["interactionManager"]["resumeIdentify"]()), this["map"] = _0x38ee7e, _0x38ee7e["interactionManager"]["on"]("entity:click", this["onClick"]), _0x38ee7e["interactionManager"]["suspendIdentify"]();
  }
}
function isPolygonFeature(_0x11f263) {
  var _a2;
  const _0x4c9228 = (_a2 = _0x11f263 == null ? void 0 : _0x11f263["geometry"]) == null ? void 0 : _a2["type"];
  return _0x4c9228 === "Polygon" || _0x4c9228 === "MultiPolygon";
}
function isPointFeature(_0x42a7b5) {
  var _a2;
  const _0x9a517e = (_a2 = _0x42a7b5 == null ? void 0 : _0x42a7b5["geometry"]) == null ? void 0 : _a2["type"];
  return _0x9a517e === "Point" || _0x9a517e === "MultiPoint";
}
var __defProp$c = Object["defineProperty"], __getOwnPropDesc$d = Object["getOwnPropertyDescriptor"], __decorateClass$d = (_0x4b408e, _0x338f28, _0x4a3026, _0x520d14) => {
  var _0xe6d4ca = _0x520d14 > 1 ? void 0 : _0x520d14 ? __getOwnPropDesc$d(_0x338f28, _0x4a3026) : _0x338f28;
  for (var _0xd9f92e = _0x4b408e["length"] - 1, _0x5adc18; _0xd9f92e >= 0; _0xd9f92e--) if (_0x5adc18 = _0x4b408e[_0xd9f92e]) _0xe6d4ca = (_0x520d14 ? _0x5adc18(_0x338f28, _0x4a3026, _0xe6d4ca) : _0x5adc18(_0xe6d4ca)) || _0xe6d4ca;
  if (_0x520d14 && _0xe6d4ca) __defProp$c(_0x338f28, _0x4a3026, _0xe6d4ca);
  return _0xe6d4ca;
};
let TucbsBoundaryTool = class extends i$2 {
  constructor() {
    super(...arguments), this["mapElementId"] = "", this["map"] = null, this["customCss"] = "", this["_label"] = "", this["_boundaryType"] = "bbox", this["_output"] = "polygon", this["_status"] = "idle", this["_message"] = "", this["_helpOpen"] = ![], this["_picking"] = ![], this["_feature"] = null, this["_css"] = { "sheet": null }, this["_bind"] = new AnalysisMapBind(() => ({ "map": this["map"], "mapElementId": this["mapElementId"] }), (_0x415cfa, _0x3f6e66) => {
      if (!this["_picking"]) return;
      this["_feature"] = _0x415cfa, this["_label"] = _0x3f6e66, this["_picking"] = ![], this["_status"] = "idle", this["_message"] = "", this["_bind"]["highlight"]([_0x415cfa]);
    }, () => {
      this["_note"]("error", "Seçilen özellikten GeoJSON üretilemedi.");
    });
  }
  ["connectedCallback"]() {
    super["connectedCallback"](), this["_bind"]["attach"]();
  }
  ["disconnectedCallback"]() {
    this["_bind"]["detach"](), super["disconnectedCallback"]();
  }
  ["updated"](_0x56388a) {
    _0x56388a["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_css"], "tucbs-boundary-tool"), (_0x56388a["has"]("mapElementId") || _0x56388a["has"]("map")) && (this["_bind"]["detach"](), this["_bind"]["attach"]());
  }
  ["_note"](_0x1316ee, _0x3ab33e) {
    this["_status"] = "idle", this["_message"] = "", showToast(_0x1316ee, _0x3ab33e);
  }
  async ["_run"]() {
    if (this["_status"] === "loading") return;
    if (!this["_feature"]) {
      this["_note"]("error", "Lütfen haritada bir nesne seçin.");
      return;
    }
    const _0x507ab0 = this["_bind"]["current"]();
    if (!_0x507ab0) {
      this["_note"]("error", "Harita henüz hazır değil.");
      return;
    }
    this["_status"] = "loading", this["_message"] = "İşleniyor…", this["_picking"] = ![], this["dispatchEvent"](new CustomEvent("tucbs-boundary-run", { "detail": { "mapElementId": this["mapElementId"], "boundaryType": this["_boundaryType"], "outputGeometry": this["_output"] }, "bubbles": !![], "composed": !![] }));
    try {
      await _0x507ab0["runBoundary"]({ "geojson": this["_feature"], "boundaryType": this["_boundaryType"], "outputGeometry": this["_output"] }, { "title": this["_boundaryType"] === "bbox" ? "Sınırlayıcı kutu" : "Dışbükey zarf" }), this["_feature"] = null, this["_label"] = "", this["_boundaryType"] = "bbox", this["_output"] = "polygon", this["_bind"]["highlight"]([]), this["_status"] = "idle", this["_message"] = "", showToast("success", "Sınır tamamlandı.");
    } catch (_0x595525) {
      _0x595525 instanceof TucbsError && console["error"]("[tucbs-boundary-tool] " + _0x595525["code"] + " (" + _0x595525["number"] + "): " + _0x595525["message"]), this["_note"]("error", _0x595525 instanceof Error ? _0x595525["message"] : "Sınır üretimi başarısız.");
    }
  }
  ["render"]() {
    const _0x5b55b5 = this["_status"] === "loading";
    return b`
      <div class="panel">
        <div class="title-row">
          <h3 class="title">Sınır</h3>
          <button type="button" class="help" aria-label="Yardım" title="Yardım" @click=${() => {
      this["_helpOpen"] = !![];
    }}>?</button>
        </div>
        ${renderAnalysisHelp(this["_helpOpen"], "Sınır", COGRAFI_HELP["sinir"], () => {
      this["_helpOpen"] = ![];
    })}
        <label class="lbl">Nesne seç</label>
        <div class="input-wrap">
          <input
            type="text"
            readonly
            placeholder="Haritadan nesne seç"
            .value=${this["_label"] ? "= " + this["_label"] : ""}
            ?disabled=${_0x5b55b5}
            @click=${() => {
      this["_picking"] = !![], this["_note"]("info", "Haritadan bir nesne seçin.");
    }}
          />
          <button
            type="button"
            class="refresh"
            title="Yeniden seç"
            ?disabled=${_0x5b55b5}
            @click=${() => {
      this["_feature"] = null, this["_label"] = "", this["_picking"] = !![], this["_bind"]["highlight"]([]);
    }}
          >⟳</button>
        </div>
        <label class="lbl">Sınır tipi</label>
        <select
          .value=${this["_boundaryType"]}
          ?disabled=${_0x5b55b5}
          @change=${(_0x3b166c) => {
      this["_boundaryType"] = _0x3b166c["target"]["value"];
    }}
        >
          <option value="bbox">Sınırlayıcı Kutu</option>
          <option value="convex">Dışbükey Zarf</option>
        </select>
        <label class="lbl">Çıktı geometrisi</label>
        <select
          .value=${this["_output"]}
          ?disabled=${_0x5b55b5}
          @change=${(_0x142f50) => {
      this["_output"] = _0x142f50["target"]["value"];
    }}
        >
          <option value="polygon">Poligon</option>
          <option value="line">Çizgi</option>
        </select>
        <div class="actions">
          <button class="run" type="button" ?disabled=${!this["_feature"] || _0x5b55b5} @click=${this["_run"]}>
            ${_0x5b55b5 ? "İşleniyor..." : "Çalıştır"}
          </button>
        </div>
        ${this["_message"] ? b`<p class="status ${this["_status"]}">${this["_message"]}</p>` : null}
      </div>
    `;
  }
};
TucbsBoundaryTool["styles"] = [geoToolStyles, analysisHelpStyles], __decorateClass$d([n$1()], TucbsBoundaryTool["prototype"], "mapElementId", 2), __decorateClass$d([n$1({ "attribute": ![] })], TucbsBoundaryTool["prototype"], "map", 2), __decorateClass$d([n$1({ "attribute": "custom-css" })], TucbsBoundaryTool["prototype"], "customCss", 2), __decorateClass$d([r()], TucbsBoundaryTool["prototype"], "_label", 2), __decorateClass$d([r()], TucbsBoundaryTool["prototype"], "_boundaryType", 2), __decorateClass$d([r()], TucbsBoundaryTool["prototype"], "_output", 2), __decorateClass$d([r()], TucbsBoundaryTool["prototype"], "_status", 2), __decorateClass$d([r()], TucbsBoundaryTool["prototype"], "_message", 2), __decorateClass$d([r()], TucbsBoundaryTool["prototype"], "_helpOpen", 2), __decorateClass$d([r()], TucbsBoundaryTool["prototype"], "_picking", 2), TucbsBoundaryTool = __decorateClass$d([t$3("tucbs-boundary-tool")], TucbsBoundaryTool);
var __defProp$b = Object["defineProperty"], __getOwnPropDesc$c = Object["getOwnPropertyDescriptor"], __decorateClass$c = (_0x21d691, _0x282708, _0x50db75, _0x48fed6) => {
  var _0x1ae64c = _0x48fed6 > 1 ? void 0 : _0x48fed6 ? __getOwnPropDesc$c(_0x282708, _0x50db75) : _0x282708;
  for (var _0x3fd4d2 = _0x21d691["length"] - 1, _0x343110; _0x3fd4d2 >= 0; _0x3fd4d2--) if (_0x343110 = _0x21d691[_0x3fd4d2]) _0x1ae64c = (_0x48fed6 ? _0x343110(_0x282708, _0x50db75, _0x1ae64c) : _0x343110(_0x1ae64c)) || _0x1ae64c;
  if (_0x48fed6 && _0x1ae64c) __defProp$b(_0x282708, _0x50db75, _0x1ae64c);
  return _0x1ae64c;
};
const CORNER_IDS = ["KB", "KD", "GD", "GB"], CORNER_LABEL = { "KB": "Kuzey-batı", "KD": "Kuzey-doğu", "GD": "Güney-doğu", "GB": "Güney-batı" }, KM_PER_DEG = 111.32;
let TucbsClipTool = class extends i$2 {
  constructor() {
    super(...arguments), this["mapElementId"] = "", this["map"] = null, this["customCss"] = "", this["_label"] = "", this["_drawing"] = ![], this["_status"] = "idle", this["_message"] = "", this["_helpOpen"] = ![], this["_picking"] = ![], this["_box"] = null, this["_coords"] = emptyCoords(), this["_feature"] = null, this["_mask"] = null, this["_shapeId"] = null, this["_shapeEntity"] = null, this["_handles"] = [], this["_drag"] = null, this["_pointer"] = null, this["_css"] = { "sheet": null }, this["_bind"] = new AnalysisMapBind(() => ({ "map": this["map"], "mapElementId": this["mapElementId"] }), (_0x279e26, _0x2e4fc6) => {
      if (_0x279e26["properties"]["tucbsClipHandle"]) return;
      if (!this["_picking"] || this["_drawing"]) return;
      this["_feature"] = _0x279e26, this["_label"] = _0x2e4fc6, this["_picking"] = ![], this["_status"] = "idle", this["_message"] = "", this["_bind"]["highlight"]([_0x279e26]);
    }, () => {
      this["_note"]("error", "Seçilen özellikten GeoJSON üretilemedi.");
    }), this["_onDrawComplete"] = (_0x21e364) => {
      if (_0x21e364["shape"]["source"] !== "tucbs-clip" || _0x21e364["shape"]["tool"] !== "rectangle") return;
      const _0x21deda = boxFromCoordinates(_0x21e364["shape"]["coordinates"]);
      if (!_0x21deda) return;
      this["_shapeId"] = _0x21e364["shape"]["id"], this["_shapeEntity"] = _0x21e364["shape"]["entity"], this["_applyBox"](_0x21deda), this["_endDrawMode"](), this["_placeHandles"]();
    }, this["_onDrawCancel"] = () => {
      this["_drawing"] = ![];
    };
  }
  ["connectedCallback"]() {
    super["connectedCallback"](), this["_bind"]["attach"](), this["_listenDraw"](!![]);
  }
  ["disconnectedCallback"]() {
    this["_stopDraw"](!![]), this["_listenDraw"](![]), this["_bind"]["detach"](), super["disconnectedCallback"]();
  }
  ["updated"](_0x218259) {
    _0x218259["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_css"], "tucbs-clip-tool"), (_0x218259["has"]("mapElementId") || _0x218259["has"]("map")) && (this["_listenDraw"](![]), this["_dropPointer"](), this["_bind"]["detach"](), this["_bind"]["attach"](), this["_listenDraw"](!![]));
  }
  ["_note"](_0x2201a2, _0x1b561f) {
    this["_status"] = "idle", this["_message"] = "", showToast(_0x2201a2, _0x1b561f);
  }
  ["_listenDraw"](_0x5745a4) {
    var _a2;
    const _0x25677e = (_a2 = this["_bind"]["current"]()) == null ? void 0 : _a2["drawingManager"];
    if (!_0x25677e) return;
    const _0x31eeec = _0x5745a4 ? "on" : "off";
    _0x25677e[_0x31eeec]("draw:complete", this["_onDrawComplete"]), _0x25677e[_0x31eeec]("draw:cancel", this["_onDrawCancel"]);
  }
  ["_startDraw"]() {
    const _0x3c5aef = this["_bind"]["current"]();
    if (!_0x3c5aef) {
      this["_note"]("error", "Harita henüz hazır değil.");
      return;
    }
    this["_clearMask"](_0x3c5aef), this["_drawing"] = !![], this["_picking"] = ![], this["_note"]("info", "Haritada dikdörtgen çizin."), _0x3c5aef["drawingManager"]["activate"]("rectangle", "tucbs-clip");
  }
  ["_armPick"]() {
    this["_endDrawMode"](), this["_picking"] = !![], this["_note"]("info", "Haritadan nesne seç.");
  }
  ["_endDrawMode"]() {
    const _0x2cc22f = this["_bind"]["current"]();
    if ((_0x2cc22f == null ? void 0 : _0x2cc22f["drawingManager"]["getActiveTool"]()) === "rectangle") _0x2cc22f["drawingManager"]["deactivate"]();
    this["_drawing"] = ![];
  }
  ["_clearMask"](_0x527e9c) {
    this["_removeHandles"]();
    if (_0x527e9c && this["_shapeId"]) _0x527e9c["drawingManager"]["removeShape"](this["_shapeId"]);
    this["_shapeId"] = null, this["_shapeEntity"] = null, this["_mask"] = null, this["_box"] = null, this["_coords"] = emptyCoords();
  }
  ["_stopDraw"](_0x2638f9) {
    this["_endDrawMode"](), this["_dropPointer"]();
    if (_0x2638f9) this["_clearMask"](this["_bind"]["current"]());
    this["_drawing"] = ![];
  }
  ["_applyBox"](_0x333716) {
    this["_box"] = _0x333716, this["_coords"] = coordsFromBox(_0x333716), this["_mask"] = maskFromBox(_0x333716), this["_paintPolygon"](_0x333716), this["_status"] = "idle", this["_message"] = "";
  }
  ["_applyCorner"](_0x1e0ce5) {
    const _0x2d783a = this["_box"];
    if (!_0x2d783a) return;
    const _0x407eea = this["_coords"][_0x1e0ce5], _0x427bb2 = Number(_0x407eea["lon"]), _0x1435d7 = Number(_0x407eea["lat"]);
    if (!Number["isFinite"](_0x427bb2) || !Number["isFinite"](_0x1435d7)) {
      this["_coords"] = coordsFromBox(_0x2d783a);
      return;
    }
    const _0x1d551d = boxFromCorner(_0x2d783a, _0x1e0ce5, _0x427bb2, _0x1435d7);
    if (!_0x1d551d) {
      this["_coords"] = coordsFromBox(_0x2d783a), this["_note"]("error", "Köşeler geçerli bir dikdörtgen oluşturmuyor.");
      return;
    }
    this["_applyBox"](_0x1d551d), this["_placeHandles"]();
  }
  ["_setCoord"](_0x18067e, _0x5ae9c2, _0x2a43c1) {
    this["_coords"] = { ...this["_coords"], [_0x18067e]: { ...this["_coords"][_0x18067e], [_0x5ae9c2]: _0x2a43c1 } };
  }
  ["_paintPolygon"](_0x1c482d) {
    var _a2, _b;
    const _0x82a321 = (_a2 = this["_shapeEntity"]) == null ? void 0 : _a2["polygon"];
    if (!_0x82a321) return;
    _0x82a321["hierarchy"] = new ConstantProperty(new PolygonHierarchy(Cartesian3["fromDegreesArray"](flatRing(_0x1c482d)))), (_b = this["_bind"]["current"]()) == null ? void 0 : _b["viewer"]["scene"]["requestRender"]();
  }
  ["_placeHandles"]() {
    const _0x372421 = this["_bind"]["current"](), _0x227797 = this["_box"];
    if (!_0x372421 || !_0x227797) return;
    this["_removeHandles"]();
    const _0x1b57dd = _0x372421["viewer"], _0x38d9b7 = cornerPoints(_0x227797);
    for (const _0x2700fa of CORNER_IDS) {
      const _0x169689 = _0x38d9b7[_0x2700fa];
      this["_handles"]["push"](_0x1b57dd["entities"]["add"]({ "name": "tucbs-clip-" + _0x2700fa, "position": Cartesian3["fromDegrees"](_0x169689["lon"], _0x169689["lat"]), "properties": { "tucbsClipHandle": _0x2700fa }, "billboard": { "image": cornerBadge(_0x2700fa), "width": 36, "height": 22, "verticalOrigin": VerticalOrigin["CENTER"], "horizontalOrigin": HorizontalOrigin["CENTER"], "disableDepthTestDistance": Number["POSITIVE_INFINITY"] } }));
    }
    this["_ensurePointer"](_0x1b57dd), _0x1b57dd["scene"]["requestRender"]();
  }
  ["_removeHandles"]() {
    var _a2;
    const _0x273d11 = (_a2 = this["_bind"]["current"]()) == null ? void 0 : _a2["viewer"];
    if (!_0x273d11) {
      this["_handles"] = [];
      return;
    }
    for (const _0x1eeaf1 of this["_handles"]) _0x273d11["entities"]["remove"](_0x1eeaf1);
    this["_handles"] = [], this["_drag"] = null, _0x273d11["scene"]["screenSpaceCameraController"]["enableInputs"] = !![];
  }
  ["_ensurePointer"](_0x1ae18e) {
    if (this["_pointer"]) return;
    const _0x5d60b8 = new ScreenSpaceEventHandler(_0x1ae18e["scene"]["canvas"]);
    _0x5d60b8["setInputAction"]((_0x17847d) => {
      const _0xacde1e = this["_cornerAt"](_0x1ae18e, _0x17847d["position"]);
      if (!_0xacde1e) return;
      this["_drag"] = _0xacde1e, _0x1ae18e["scene"]["screenSpaceCameraController"]["enableInputs"] = ![];
    }, ScreenSpaceEventType["LEFT_DOWN"]), _0x5d60b8["setInputAction"]((_0x19f10d) => {
      if (!this["_drag"] || !this["_box"]) return;
      const _0x29389c = groundLonLat(_0x1ae18e, _0x19f10d["endPosition"]);
      if (!_0x29389c) return;
      const _0x3acebf = boxFromCorner(this["_box"], this["_drag"], _0x29389c[0], _0x29389c[1]);
      if (!_0x3acebf) return;
      this["_applyBox"](_0x3acebf), this["_moveHandles"](_0x3acebf);
    }, ScreenSpaceEventType["MOUSE_MOVE"]), _0x5d60b8["setInputAction"](() => {
      this["_drag"] = null, _0x1ae18e["scene"]["screenSpaceCameraController"]["enableInputs"] = !![];
    }, ScreenSpaceEventType["LEFT_UP"]), this["_pointer"] = _0x5d60b8;
  }
  ["_cornerAt"](_0x2cc880, _0x181a07) {
    var _a2;
    const _0x4c38e1 = _0x2cc880["scene"]["pick"](_0x181a07), _0xb5bdc2 = ((_a2 = _0x4c38e1 == null ? void 0 : _0x4c38e1["id"]) == null ? void 0 : _a2["name"]) ?? "";
    if (!_0xb5bdc2["startsWith"]("tucbs-clip-")) return null;
    const _0x46f720 = _0xb5bdc2["slice"]("tucbs-clip-"["length"]);
    return CORNER_IDS["includes"](_0x46f720) ? _0x46f720 : null;
  }
  ["_moveHandles"](_0x24726b) {
    const _0x3415a0 = cornerPoints(_0x24726b);
    for (const _0x1a4eb6 of this["_handles"]) {
      const _0x9bbeb0 = (_0x1a4eb6["name"] ?? "")["slice"]("tucbs-clip-"["length"]), _0x5d0c47 = _0x3415a0[_0x9bbeb0];
      if (!_0x5d0c47) continue;
      _0x1a4eb6["position"] = Cartesian3["fromDegrees"](_0x5d0c47["lon"], _0x5d0c47["lat"]);
    }
  }
  ["_dropPointer"]() {
    var _a2;
    this["_removeHandles"](), (_a2 = this["_pointer"]) == null ? void 0 : _a2["destroy"](), this["_pointer"] = null;
  }
  async ["_run"]() {
    if (this["_status"] === "loading") return;
    if (!this["_feature"] || !this["_mask"]) {
      this["_note"]("error", "Kırpılacak nesne ve dikdörtgen alan gerekli.");
      return;
    }
    const _0x5045ff = this["_bind"]["current"]();
    if (!_0x5045ff) {
      this["_note"]("error", "Harita henüz hazır değil.");
      return;
    }
    this["_status"] = "loading", this["_message"] = "İşleniyor…", this["dispatchEvent"](new CustomEvent("tucbs-clip-run", { "detail": { "mapElementId": this["mapElementId"], "label": this["_label"] }, "bubbles": !![], "composed": !![] }));
    try {
      await _0x5045ff["runClip"]({ "geojsonA": this["_feature"], "geojsonB": this["_mask"] }, { "title": "Kırpma sonucu" }), this["_feature"] = null, this["_label"] = "", this["_picking"] = ![], this["_clearMask"](_0x5045ff), this["_bind"]["highlight"]([]), this["_status"] = "idle", this["_message"] = "", showToast("success", "Kırpma işlemi tamamlandı.");
    } catch (_0x103bdd) {
      _0x103bdd instanceof TucbsError && console["error"]("[tucbs-clip-tool] " + _0x103bdd["code"] + " (" + _0x103bdd["number"] + "): " + _0x103bdd["message"]), this["_note"]("error", _0x103bdd instanceof Error ? _0x103bdd["message"] : "Kırpma başarısız.");
    }
  }
  ["render"]() {
    const _0x306685 = this["_status"] === "loading", _0x5e7ca2 = this["_box"], _0x5ab2cb = Boolean(this["_feature"] && this["_mask"] && _0x5e7ca2) && !_0x306685 && !this["_drawing"], _0x5ef606 = _0x5e7ca2 ? formatSize(_0x5e7ca2) : "";
    return b`
      <div class="panel">
        <div class="title-row">
          <h3 class="title">Kırpma</h3>
          <button type="button" class="help" aria-label="Yardım" title="Yardım" @click=${() => {
      this["_helpOpen"] = !![];
    }}>?</button>
        </div>
        ${renderAnalysisHelp(this["_helpOpen"], "Kırpma", COGRAFI_HELP["kirp"], () => {
      this["_helpOpen"] = ![];
    })}
        <label class="lbl">Kırpılacak nesne</label>
        <div class="input-wrap">
          <input
            type="text"
            readonly
            placeholder="Haritadan nesne seç"
            .value=${this["_label"] ? "= " + this["_label"] : ""}
            ?disabled=${_0x306685 || this["_drawing"]}
            @click=${this["_armPick"]}
          />
          <button
            type="button"
            class="refresh"
            title="Yeniden seç"
            ?disabled=${_0x306685}
            @click=${() => {
      this["_feature"] = null, this["_label"] = "", this["_armPick"](), this["_bind"]["highlight"]([]);
    }}
          >⟳</button>
        </div>
        <label class="lbl">Kırpma alanı (dikdörtgen)</label>
        <div class="area-row">
          <span class="area-size">${this["_drawing"] ? "Çiziliyor…" : _0x5ef606}</span>
          <div class="area-actions">
            ${_0x5e7ca2 && !this["_drawing"] ? b`<button type="button" class="link" ?disabled=${_0x306685} @click=${() => this["_clearMask"](this["_bind"]["current"]())}>Temizle</button>` : null}
            <button class="secondary" type="button" ?disabled=${_0x306685 || this["_drawing"]} @click=${this["_startDraw"]}>
              ${this["_drawing"] ? "Çiziliyor" : _0x5e7ca2 ? "Yeniden çiz" : "Dikdörtgen çiz"}
            </button>
          </div>
        </div>
        ${_0x5e7ca2 ? b`
            <div class="corners">
              <h4>Köşe koordinatları</h4>
              ${CORNER_IDS["map"]((_0xc757b6) => b`
                <div class="corner">
                  <div class="corner-head">
                    <span class="badge">${_0xc757b6}</span>
                    <span class="corner-name">${CORNER_LABEL[_0xc757b6]}</span>
                  </div>
                  <div class="corner-fields">
                    <label>
                      Boylam
                      <input
                        .value=${this["_coords"][_0xc757b6]["lon"]}
                        ?disabled=${_0x306685 || this["_drawing"]}
                        @input=${(_0x3eb575) => this["_setCoord"](_0xc757b6, "lon", _0x3eb575["target"]["value"])}
                        @blur=${() => this["_applyCorner"](_0xc757b6)}
                        @keydown=${(_0x1e5f7c) => {
      if (_0x1e5f7c["key"] === "Enter") this["_applyCorner"](_0xc757b6);
    }}
                      />
                    </label>
                    <label>
                      Enlem
                      <input
                        .value=${this["_coords"][_0xc757b6]["lat"]}
                        ?disabled=${_0x306685 || this["_drawing"]}
                        @input=${(_0x120536) => this["_setCoord"](_0xc757b6, "lat", _0x120536["target"]["value"])}
                        @blur=${() => this["_applyCorner"](_0xc757b6)}
                        @keydown=${(_0x71324d) => {
      if (_0x71324d["key"] === "Enter") this["_applyCorner"](_0xc757b6);
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
          <button class="run" type="button" ?disabled=${!_0x5ab2cb} @click=${this["_run"]}>
            ${_0x306685 ? "İşleniyor..." : "Çalıştır"}
          </button>
        </div>
        ${this["_message"] ? b`<p class="status ${this["_status"]}">${this["_message"]}</p>` : null}
      </div>
    `;
  }
};
TucbsClipTool["styles"] = [geoToolStyles, analysisHelpStyles, i$5`
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
    `], __decorateClass$c([n$1()], TucbsClipTool["prototype"], "mapElementId", 2), __decorateClass$c([n$1({ "attribute": ![] })], TucbsClipTool["prototype"], "map", 2), __decorateClass$c([n$1({ "attribute": "custom-css" })], TucbsClipTool["prototype"], "customCss", 2), __decorateClass$c([r()], TucbsClipTool["prototype"], "_label", 2), __decorateClass$c([r()], TucbsClipTool["prototype"], "_drawing", 2), __decorateClass$c([r()], TucbsClipTool["prototype"], "_status", 2), __decorateClass$c([r()], TucbsClipTool["prototype"], "_message", 2), __decorateClass$c([r()], TucbsClipTool["prototype"], "_helpOpen", 2), __decorateClass$c([r()], TucbsClipTool["prototype"], "_picking", 2), __decorateClass$c([r()], TucbsClipTool["prototype"], "_box", 2), __decorateClass$c([r()], TucbsClipTool["prototype"], "_coords", 2), TucbsClipTool = __decorateClass$c([t$3("tucbs-clip-tool")], TucbsClipTool);
const CORNER_BADGE = {};
function cornerBadge(_0x3f3633) {
  const _0x2e8635 = CORNER_BADGE[_0x3f3633];
  if (_0x2e8635) return _0x2e8635;
  const _0x4108fc = document["createElement"]("canvas");
  _0x4108fc["width"] = 72, _0x4108fc["height"] = 44;
  const _0x3de1b6 = _0x4108fc["getContext"]("2d");
  if (!_0x3de1b6) return _0x4108fc;
  return _0x3de1b6["fillStyle"] = "#dc2626", _0x3de1b6["strokeStyle"] = "#ffffff", _0x3de1b6["lineWidth"] = 4, _0x3de1b6["beginPath"](), _0x3de1b6["roundRect"](2, 2, 68, 40, 20), _0x3de1b6["fill"](), _0x3de1b6["stroke"](), _0x3de1b6["fillStyle"] = "#ffffff", _0x3de1b6["font"] = "700 22px sans-serif", _0x3de1b6["textAlign"] = "center", _0x3de1b6["textBaseline"] = "middle", _0x3de1b6["fillText"](_0x3f3633, 36, 23), CORNER_BADGE[_0x3f3633] = _0x4108fc, _0x4108fc;
}
function emptyCoords() {
  return { "KB": { "lon": "", "lat": "" }, "KD": { "lon": "", "lat": "" }, "GD": { "lon": "", "lat": "" }, "GB": { "lon": "", "lat": "" } };
}
function boxFromCoordinates(_0x549068) {
  if (_0x549068["length"] < 2) return null;
  const _0x3d9a47 = _0x549068["map"]((_0x134809) => _0x134809[0]), _0x3373e8 = _0x549068["map"]((_0x3b306d) => _0x3b306d[1]);
  return normalizeBox(Math["min"](..._0x3d9a47), Math["min"](..._0x3373e8), Math["max"](..._0x3d9a47), Math["max"](..._0x3373e8));
}
function boxFromCorner(_0x3cdfec, _0x2e0a56, _0xd61cc3, _0x43464d) {
  let { west: _0x26f8d4, south: _0x30ce9e, east: _0x202f17, north: _0x461e28 } = _0x3cdfec;
  if (_0x2e0a56 === "KB") _0x26f8d4 = _0xd61cc3, _0x461e28 = _0x43464d;
  else {
    if (_0x2e0a56 === "KD") _0x202f17 = _0xd61cc3, _0x461e28 = _0x43464d;
    else _0x2e0a56 === "GD" ? (_0x202f17 = _0xd61cc3, _0x30ce9e = _0x43464d) : (_0x26f8d4 = _0xd61cc3, _0x30ce9e = _0x43464d);
  }
  return normalizeBox(_0x26f8d4, _0x30ce9e, _0x202f17, _0x461e28);
}
function normalizeBox(_0x377bef, _0x367a3b, _0x2c3149, _0x519123) {
  const _0x477eac = Math["min"](_0x377bef, _0x2c3149), _0x1a8a63 = Math["max"](_0x377bef, _0x2c3149), _0x1f200f = Math["min"](_0x367a3b, _0x519123), _0x1014ff = Math["max"](_0x367a3b, _0x519123);
  if (_0x1a8a63 - _0x477eac < 1e-8 || _0x1014ff - _0x1f200f < 1e-8) return null;
  return { "west": _0x477eac, "south": _0x1f200f, "east": _0x1a8a63, "north": _0x1014ff };
}
function coordsFromBox(_0x207855) {
  const _0x1b55f7 = cornerPoints(_0x207855), _0x56ed71 = emptyCoords();
  for (const _0x679922 of CORNER_IDS) {
    _0x56ed71[_0x679922] = { "lon": _0x1b55f7[_0x679922]["lon"]["toFixed"](6), "lat": _0x1b55f7[_0x679922]["lat"]["toFixed"](6) };
  }
  return _0x56ed71;
}
function cornerPoints(_0x356d33) {
  return { "KB": { "lon": _0x356d33["west"], "lat": _0x356d33["north"] }, "KD": { "lon": _0x356d33["east"], "lat": _0x356d33["north"] }, "GD": { "lon": _0x356d33["east"], "lat": _0x356d33["south"] }, "GB": { "lon": _0x356d33["west"], "lat": _0x356d33["south"] } };
}
function flatRing(_0x2e788c) {
  return [_0x2e788c["west"], _0x2e788c["south"], _0x2e788c["east"], _0x2e788c["south"], _0x2e788c["east"], _0x2e788c["north"], _0x2e788c["west"], _0x2e788c["north"]];
}
function maskFromBox(_0x1126d) {
  const _0x1f23c4 = [[_0x1126d["west"], _0x1126d["south"]], [_0x1126d["east"], _0x1126d["south"]], [_0x1126d["east"], _0x1126d["north"]], [_0x1126d["west"], _0x1126d["north"]], [_0x1126d["west"], _0x1126d["south"]]], _0x2e0fa1 = { "type": "Polygon", "coordinates": [_0x1f23c4] };
  return { "type": "Feature", "properties": {}, "geometry": _0x2e0fa1 };
}
function formatSize(_0x39a2a5) {
  const _0x5e80d0 = (_0x39a2a5["south"] + _0x39a2a5["north"]) / 2 * (Math["PI"] / 180), _0xe5cc4c = Math["abs"](_0x39a2a5["north"] - _0x39a2a5["south"]) * KM_PER_DEG, _0x3a6a3e = Math["abs"](_0x39a2a5["east"] - _0x39a2a5["west"]) * KM_PER_DEG * Math["cos"](_0x5e80d0);
  return _0x3a6a3e["toFixed"](2) + " × " + _0xe5cc4c["toFixed"](2) + " km";
}
function groundLonLat(_0x333224, _0x57706a) {
  const _0x5bf087 = _0x333224["camera"]["getPickRay"](_0x57706a);
  if (!_0x5bf087) return null;
  const _0x50fc08 = _0x333224["scene"]["globe"]["pick"](_0x5bf087, _0x333224["scene"]);
  if (!_0x50fc08) return null;
  const _0x57cfb4 = Cartographic["fromCartesian"](_0x50fc08);
  return [_0xf1e7b["toDegrees"](_0x57cfb4["longitude"]), _0xf1e7b["toDegrees"](_0x57cfb4["latitude"])];
}
var __defProp$a = Object["defineProperty"], __getOwnPropDesc$b = Object["getOwnPropertyDescriptor"], __decorateClass$b = (_0x412cb0, _0x33e85e, _0x59977b, _0x1d31e8) => {
  var _0x3a1926 = _0x1d31e8 > 1 ? void 0 : _0x1d31e8 ? __getOwnPropDesc$b(_0x33e85e, _0x59977b) : _0x33e85e;
  for (var _0xdda5f4 = _0x412cb0["length"] - 1, _0x411bd1; _0xdda5f4 >= 0; _0xdda5f4--) if (_0x411bd1 = _0x412cb0[_0xdda5f4]) _0x3a1926 = (_0x1d31e8 ? _0x411bd1(_0x33e85e, _0x59977b, _0x3a1926) : _0x411bd1(_0x3a1926)) || _0x3a1926;
  if (_0x1d31e8 && _0x3a1926) __defProp$a(_0x33e85e, _0x59977b, _0x3a1926);
  return _0x3a1926;
};
const _TucbsTwoFeatureTool = class _TucbsTwoFeatureTool extends i$2 {
  constructor() {
    super(...arguments), this["mapElementId"] = "", this["map"] = null, this["customCss"] = "", this["_labelA"] = "", this["_labelB"] = "", this["_status"] = "idle", this["_message"] = "", this["_helpOpen"] = ![], this["_featureA"] = null, this["_featureB"] = null, this["_pending"] = null, this["_css"] = { "sheet": null }, this["_bind"] = new AnalysisMapBind(() => ({ "map": this["map"], "mapElementId": this["mapElementId"] }), (_0x536078, _0x3f6272) => this["_accept"](_0x536078, _0x3f6272), () => {
      this["_note"]("error", "Seçilen özellikten GeoJSON üretilemedi.");
    });
  }
  ["connectedCallback"]() {
    super["connectedCallback"](), this["_bind"]["attach"]();
  }
  ["disconnectedCallback"]() {
    this["_bind"]["detach"](), super["disconnectedCallback"]();
  }
  ["updated"](_0xa595cf) {
    _0xa595cf["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_css"], this["tagName"]["toLowerCase"]()), (_0xa595cf["has"]("mapElementId") || _0xa595cf["has"]("map")) && (this["_bind"]["detach"](), this["_bind"]["attach"]());
  }
  ["_accept"](_0x3d336f, _0x115186) {
    if (!this["_pending"]) return;
    if (!isPolygonFeature(_0x3d336f)) {
      this["_note"]("error", this["spec"]()["polygonOnlyMessage"]);
      return;
    }
    this["_pending"] === "a" ? (this["_featureA"] = _0x3d336f, this["_labelA"] = _0x115186) : (this["_featureB"] = _0x3d336f, this["_labelB"] = _0x115186), this["_pending"] = null, this["_status"] = "idle", this["_message"] = "", this["_bind"]["highlight"]([this["_featureA"], this["_featureB"]]["filter"]((_0x592c67) => _0x592c67 !== null));
  }
  ["_arm"](_0x206e3b) {
    this["_pending"] = _0x206e3b, this["_note"]("info", _0x206e3b === "a" ? "Lütfen birinci poligonu seçin." : "Lütfen ikinci poligonu seçin.");
  }
  ["_refresh"](_0xcb3de0) {
    _0xcb3de0 === "a" ? (this["_featureA"] = null, this["_labelA"] = "") : (this["_featureB"] = null, this["_labelB"] = ""), this["_arm"](_0xcb3de0), this["_bind"]["highlight"]([this["_featureA"], this["_featureB"]]["filter"]((_0x34afa2) => _0x34afa2 !== null));
  }
  ["_clear"]() {
    this["_featureA"] = null, this["_featureB"] = null, this["_labelA"] = "", this["_labelB"] = "", this["_pending"] = null, this["_bind"]["highlight"]([]);
  }
  async ["_run"]() {
    const _0x377d50 = this["spec"]();
    if (this["_status"] === "loading") return;
    if (!isPolygonFeature(this["_featureA"]) || !isPolygonFeature(this["_featureB"])) {
      this["_note"]("error", _0x377d50["bothPolygonMessage"]);
      return;
    }
    const _0x1cf126 = this["_bind"]["current"]();
    if (!_0x1cf126) {
      this["_bind"]["attach"](), this["_note"]("error", "Harita henüz hazır değil.");
      return;
    }
    this["_status"] = "loading", this["_message"] = "İşleniyor…", this["_pending"] = null, this["dispatchEvent"](new CustomEvent(_0x377d50["eventName"], { "detail": { "mapElementId": this["mapElementId"], "labelA": this["_labelA"], "labelB": this["_labelB"] }, "bubbles": !![], "composed": !![] }));
    try {
      await _0x377d50["run"](_0x1cf126, this["_featureA"], this["_featureB"]), this["_clear"](), this["_status"] = "idle", this["_message"] = "", showToast("success", _0x377d50["success"]);
    } catch (_0x5db446) {
      _0x5db446 instanceof TucbsError && console["error"]("[" + this["tagName"] + "] " + _0x5db446["code"] + " (" + _0x5db446["number"] + "): " + _0x5db446["message"]), this["_note"]("error", _0x5db446 instanceof Error ? _0x5db446["message"] : _0x377d50["fail"]);
    }
  }
  ["_note"](_0x49472a, _0x2b874d) {
    this["_status"] = "idle", this["_message"] = "", showToast(_0x49472a, _0x2b874d);
  }
  ["_slot"](_0x5b9b72, _0x13ae83, _0x17d633, _0x15b0ab) {
    const _0x52c907 = this["_status"] === "loading";
    return b`
      <label class="lbl">${_0x13ae83}</label>
      <div class="input-wrap">
        <input
          type="text"
          readonly
          placeholder=${_0x17d633}
          .value=${_0x15b0ab ? "= " + _0x15b0ab : ""}
          ?disabled=${_0x52c907}
          @click=${() => this["_arm"](_0x5b9b72)}
        />
        <button type="button" class="refresh" title="Yeniden seç" ?disabled=${_0x52c907} @click=${() => this["_refresh"](_0x5b9b72)}>⟳</button>
      </div>
    `;
  }
  ["render"]() {
    const _0x5486a2 = this["spec"](), _0x4677df = this["_status"] === "loading", _0x3da7d3 = isPolygonFeature(this["_featureA"]) && isPolygonFeature(this["_featureB"]) && !_0x4677df;
    return b`
      <div class="panel">
        <div class="title-row">
          <h3 class="title">${_0x5486a2["title"]}</h3>
          <button type="button" class="help" aria-label="Yardım" title="Yardım" @click=${() => {
      this["_helpOpen"] = !![];
    }}>?</button>
        </div>
        ${renderAnalysisHelp(this["_helpOpen"], _0x5486a2["title"], _0x5486a2["help"], () => {
      this["_helpOpen"] = ![];
    })}
        ${this["_slot"]("a", _0x5486a2["labelA"], _0x5486a2["placeholderA"], this["_labelA"])}
        ${this["_slot"]("b", _0x5486a2["labelB"], _0x5486a2["placeholderB"], this["_labelB"])}
        <div class="actions">
          <button class="run" type="button" ?disabled=${!_0x3da7d3} @click=${this["_run"]}>
            ${_0x4677df ? "İşleniyor..." : "Çalıştır"}
          </button>
        </div>
        ${this["_message"] ? b`<p class="status ${this["_status"]}">${this["_message"]}</p>` : null}
      </div>
    `;
  }
};
_TucbsTwoFeatureTool["styles"] = [geoToolStyles, analysisHelpStyles];
let TucbsTwoFeatureTool = _TucbsTwoFeatureTool;
__decorateClass$b([n$1()], TucbsTwoFeatureTool["prototype"], "mapElementId", 2), __decorateClass$b([n$1({ "attribute": ![] })], TucbsTwoFeatureTool["prototype"], "map", 2), __decorateClass$b([n$1({ "attribute": "custom-css" })], TucbsTwoFeatureTool["prototype"], "customCss", 2), __decorateClass$b([r()], TucbsTwoFeatureTool["prototype"], "_labelA", 2), __decorateClass$b([r()], TucbsTwoFeatureTool["prototype"], "_labelB", 2), __decorateClass$b([r()], TucbsTwoFeatureTool["prototype"], "_status", 2), __decorateClass$b([r()], TucbsTwoFeatureTool["prototype"], "_message", 2), __decorateClass$b([r()], TucbsTwoFeatureTool["prototype"], "_helpOpen", 2);
let TucbsDifferenceTool = class extends TucbsTwoFeatureTool {
  ["spec"]() {
    return { "title": "Fark", "labelA": "İlk poligon (kaynak)...", "placeholderA": "Haritadan poligon seç", "labelB": "İkinci poligon (çıkarılacak)...", "placeholderB": "Poligon seçmek için buraya tıklayın", "eventName": "tucbs-difference-run", "success": "Fark tamamlandı.", "fail": "Fark başarısız.", "polygonOnlyMessage": "Fark için yalnızca poligon seçin.", "bothPolygonMessage": "Her iki seçim de poligon olmalıdır.", "help": COGRAFI_HELP["fark"], "run": (_0x3ac14d, _0x3ac3b9, _0x296785) => _0x3ac14d["runDifference"]({ "geojsonA": _0x3ac3b9, "geojsonB": _0x296785 }, { "title": "Fark sonucu" }) };
  }
};
TucbsDifferenceTool = __decorateClass$b([t$3("tucbs-difference-tool")], TucbsDifferenceTool);
let TucbsSubtractTool = class extends TucbsTwoFeatureTool {
  ["spec"]() {
    return { "title": "Çıkarma", "labelA": "Nesneyi şuradan kaldır:", "placeholderA": "Haritadan nesne seç", "labelB": "...ile örtüşüyor.", "placeholderB": "Nesne seçmek için buraya tıklayın", "eventName": "tucbs-subtract-run", "success": "Çıkarma tamamlandı.", "fail": "Çıkarma başarısız.", "polygonOnlyMessage": "Çıkarma için yalnızca poligon seçin.", "bothPolygonMessage": "Her iki seçim de poligon olmalıdır.", "help": COGRAFI_HELP["cikarma"], "run": (_0x11e75a, _0x1d2a61, _0x40c383) => _0x11e75a["runSubtract"]({ "geojsonA": _0x1d2a61, "geojsonB": _0x40c383 }, { "title": "Çıkarma sonucu" }) };
  }
};
TucbsSubtractTool = __decorateClass$b([t$3("tucbs-subtract-tool")], TucbsSubtractTool);
let TucbsUnionTool = class extends TucbsTwoFeatureTool {
  ["spec"]() {
    return { "title": "Birleştir", "labelA": "Birleştirilecek birinci...", "placeholderA": "Haritadan nesne seç", "labelB": "Birleştirilecek ikinci...", "placeholderB": "Haritadan nesne seç", "eventName": "tucbs-union-run", "success": "Birleştirme tamamlandı.", "fail": "Birleştirme başarısız.", "polygonOnlyMessage": "Birleştirme için yalnızca poligon seçin.", "bothPolygonMessage": "Her iki seçim de poligon olmalıdır.", "help": COGRAFI_HELP["birlestir"], "run": (_0x4ebe29, _0x674d5d, _0x3e9c2d) => _0x4ebe29["runUnion"]({ "geojsonA": _0x674d5d, "geojsonB": _0x3e9c2d }, { "title": "Birleştir sonucu" }) };
  }
};
TucbsUnionTool = __decorateClass$b([t$3("tucbs-union-tool")], TucbsUnionTool);
var __defProp$9 = Object["defineProperty"], __getOwnPropDesc$a = Object["getOwnPropertyDescriptor"], __decorateClass$a = (_0x2617e0, _0x37e8e6, _0x33b1f9, _0x3966ea) => {
  var _0x14a63f = _0x3966ea > 1 ? void 0 : _0x3966ea ? __getOwnPropDesc$a(_0x37e8e6, _0x33b1f9) : _0x37e8e6;
  for (var _0x5cb432 = _0x2617e0["length"] - 1, _0x14df92; _0x5cb432 >= 0; _0x5cb432--) if (_0x14df92 = _0x2617e0[_0x5cb432]) _0x14a63f = (_0x3966ea ? _0x14df92(_0x37e8e6, _0x33b1f9, _0x14a63f) : _0x14df92(_0x14a63f)) || _0x14a63f;
  if (_0x3966ea && _0x14a63f) __defProp$9(_0x37e8e6, _0x33b1f9, _0x14a63f);
  return _0x14a63f;
};
let TucbsWedgeBufferTool = class extends i$2 {
  constructor() {
    super(...arguments), this["mapElementId"] = "", this["map"] = null, this["customCss"] = "", this["_label"] = "", this["_distance"] = "", this["_start"] = "0", this["_end"] = "90", this["_status"] = "idle", this["_message"] = "", this["_helpOpen"] = ![], this["_picking"] = ![], this["_feature"] = null, this["_css"] = { "sheet": null }, this["_bind"] = new AnalysisMapBind(() => ({ "map": this["map"], "mapElementId": this["mapElementId"] }), (_0x4f7844, _0x369731) => {
      if (!this["_picking"]) return;
      if (!isPointFeature(_0x4f7844)) {
        this["_note"]("error", "Kama tampon sadece nokta geometrileri için kullanılabilir.");
        return;
      }
      this["_feature"] = _0x4f7844, this["_label"] = _0x369731, this["_picking"] = ![], this["_status"] = "idle", this["_message"] = "", this["_bind"]["highlight"]([_0x4f7844]);
    }, () => {
      this["_note"]("error", "Seçilen özellikten GeoJSON üretilemedi.");
    });
  }
  ["connectedCallback"]() {
    super["connectedCallback"](), this["_bind"]["attach"]();
  }
  ["disconnectedCallback"]() {
    this["_bind"]["detach"](), super["disconnectedCallback"]();
  }
  ["updated"](_0x18b1bc) {
    _0x18b1bc["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_css"], "tucbs-wedge-buffer-tool"), (_0x18b1bc["has"]("mapElementId") || _0x18b1bc["has"]("map")) && (this["_bind"]["detach"](), this["_bind"]["attach"]());
  }
  ["_note"](_0x471a25, _0x1b8568) {
    this["_status"] = "idle", this["_message"] = "", showToast(_0x471a25, _0x1b8568);
  }
  async ["_run"]() {
    if (this["_status"] === "loading") return;
    if (!isPointFeature(this["_feature"])) {
      this["_note"]("error", "Lütfen haritada bir nokta seçin.");
      return;
    }
    const _0x239df7 = Number(this["_distance"]), _0x654867 = Number(this["_start"]), _0x5dcf25 = Number(this["_end"]);
    if (!Number["isFinite"](_0x239df7) || _0x239df7 <= 0) {
      this["_note"]("error", "Geçerli bir mesafe girin.");
      return;
    }
    if (!Number["isFinite"](_0x654867) || !Number["isFinite"](_0x5dcf25) || _0x654867 >= _0x5dcf25) {
      this["_note"]("error", "Başlangıç açısı bitiş açısından küçük olmalıdır.");
      return;
    }
    const _0x4ea10a = this["_bind"]["current"]();
    if (!_0x4ea10a) {
      this["_note"]("error", "Harita henüz hazır değil.");
      return;
    }
    this["_status"] = "loading", this["_message"] = "İşleniyor…", this["_picking"] = ![], this["dispatchEvent"](new CustomEvent("tucbs-wedge-buffer-run", { "detail": { "mapElementId": this["mapElementId"], "distanceM": _0x239df7, "startAngle": _0x654867, "endAngle": _0x5dcf25 }, "bubbles": !![], "composed": !![] }));
    try {
      await _0x4ea10a["runWedgeBuffer"]({ "geojson": this["_feature"], "distanceM": _0x239df7, "startAngle": _0x654867, "endAngle": _0x5dcf25 }, { "title": "Kama tampon (" + _0x239df7 + "m, " + _0x654867 + "°–" + _0x5dcf25 + "°)" }), this["_feature"] = null, this["_label"] = "", this["_distance"] = "", this["_start"] = "0", this["_end"] = "90", this["_bind"]["highlight"]([]), this["_status"] = "idle", this["_message"] = "", showToast("success", "Kama tampon eklendi.");
    } catch (_0x191c52) {
      _0x191c52 instanceof TucbsError && console["error"]("[tucbs-wedge-buffer-tool] " + _0x191c52["code"] + " (" + _0x191c52["number"] + "): " + _0x191c52["message"]), this["_note"]("error", _0x191c52 instanceof Error ? _0x191c52["message"] : "Kama tampon başarısız.");
    }
  }
  ["render"]() {
    const _0x2fa0fc = this["_status"] === "loading", _0x3f9a77 = Boolean(this["_feature"] && this["_distance"]) && !_0x2fa0fc;
    return b`
      <div class="panel">
        <div class="title-row">
          <h3 class="title">Kama Tampon</h3>
          <button type="button" class="help" aria-label="Yardım" title="Yardım" @click=${() => {
      this["_helpOpen"] = !![];
    }}>?</button>
        </div>
        ${renderAnalysisHelp(this["_helpOpen"], "Kama Tampon", COGRAFI_HELP["kama"], () => {
      this["_helpOpen"] = ![];
    })}
        <label class="lbl">Nokta seç...</label>
        <div class="input-wrap">
          <input
            type="text"
            readonly
            placeholder="Nokta seçmek için buraya tıklayın"
            .value=${this["_label"] ? "= " + this["_label"] : ""}
            ?disabled=${_0x2fa0fc}
            @click=${() => {
      this["_picking"] = !![], this["_note"]("info", "Haritadan bir nokta seçin.");
    }}
          />
          <button
            type="button"
            class="refresh"
            title="Yeniden seç"
            ?disabled=${_0x2fa0fc}
            @click=${() => {
      this["_feature"] = null, this["_label"] = "", this["_picking"] = !![], this["_bind"]["highlight"]([]);
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
            .value=${this["_distance"]}
            ?disabled=${_0x2fa0fc}
            @input=${(_0x27e422) => {
      this["_distance"] = _0x27e422["target"]["value"];
    }}
          />
          <span class="unit">m</span>
        </div>
        <label class="lbl">Başlangıç Açısı</label>
        <input
          type="number"
          step="any"
          placeholder="Başlangıç açısı"
          .value=${this["_start"]}
          ?disabled=${_0x2fa0fc}
          @input=${(_0x6653e4) => {
      this["_start"] = _0x6653e4["target"]["value"];
    }}
        />
        <label class="lbl">Bitiş Açısı</label>
        <input
          type="number"
          step="any"
          placeholder="Bitiş açısı"
          .value=${this["_end"]}
          ?disabled=${_0x2fa0fc}
          @input=${(_0x2d6d3b) => {
      this["_end"] = _0x2d6d3b["target"]["value"];
    }}
        />
        <p class="hint">0° = Kuzey, 90° = Doğu, 180° = Güney, 270° = Batı</p>
        <div class="actions">
          <button class="run" type="button" ?disabled=${!_0x3f9a77} @click=${this["_run"]}>
            ${_0x2fa0fc ? "İşleniyor..." : "Çalıştır"}
          </button>
        </div>
        ${this["_message"] ? b`<p class="status ${this["_status"]}">${this["_message"]}</p>` : null}
      </div>
    `;
  }
};
TucbsWedgeBufferTool["styles"] = [geoToolStyles, analysisHelpStyles], __decorateClass$a([n$1()], TucbsWedgeBufferTool["prototype"], "mapElementId", 2), __decorateClass$a([n$1({ "attribute": ![] })], TucbsWedgeBufferTool["prototype"], "map", 2), __decorateClass$a([n$1({ "attribute": "custom-css" })], TucbsWedgeBufferTool["prototype"], "customCss", 2), __decorateClass$a([r()], TucbsWedgeBufferTool["prototype"], "_label", 2), __decorateClass$a([r()], TucbsWedgeBufferTool["prototype"], "_distance", 2), __decorateClass$a([r()], TucbsWedgeBufferTool["prototype"], "_start", 2), __decorateClass$a([r()], TucbsWedgeBufferTool["prototype"], "_end", 2), __decorateClass$a([r()], TucbsWedgeBufferTool["prototype"], "_status", 2), __decorateClass$a([r()], TucbsWedgeBufferTool["prototype"], "_message", 2), __decorateClass$a([r()], TucbsWedgeBufferTool["prototype"], "_helpOpen", 2), __decorateClass$a([r()], TucbsWedgeBufferTool["prototype"], "_picking", 2), TucbsWedgeBufferTool = __decorateClass$a([t$3("tucbs-wedge-buffer-tool")], TucbsWedgeBufferTool);
var __defProp$8 = Object["defineProperty"], __getOwnPropDesc$9 = Object["getOwnPropertyDescriptor"], __decorateClass$9 = (_0xfa5c2, _0x57fd4f, _0x6d3ce8, _0x1ba1d3) => {
  var _0x5cefb5 = _0x1ba1d3 > 1 ? void 0 : _0x1ba1d3 ? __getOwnPropDesc$9(_0x57fd4f, _0x6d3ce8) : _0x57fd4f;
  for (var _0x3d4356 = _0xfa5c2["length"] - 1, _0x55970c; _0x3d4356 >= 0; _0x3d4356--) if (_0x55970c = _0xfa5c2[_0x3d4356]) _0x5cefb5 = (_0x1ba1d3 ? _0x55970c(_0x57fd4f, _0x6d3ce8, _0x5cefb5) : _0x55970c(_0x5cefb5)) || _0x5cefb5;
  if (_0x1ba1d3 && _0x5cefb5) __defProp$8(_0x57fd4f, _0x6d3ce8, _0x5cefb5);
  return _0x5cefb5;
};
const TOOLS = [{ "id": "sinir", "label": "Sınır" }, { "id": "tampon", "label": "Tampon" }, { "id": "kirp", "label": "Kırp" }, { "id": "fark", "label": "Fark" }, { "id": "kesisim", "label": "Kesişim" }, { "id": "cikarma", "label": "Çıkarma" }, { "id": "birlestir", "label": "Birleştir" }, { "id": "kama", "label": "Kama Tampon" }];
let TucbsAnalysisPanel = class extends i$2 {
  constructor() {
    super(...arguments), this["mapElementId"] = "", this["customCss"] = "", this["_activeTool"] = null, this["_customCssState"] = { "sheet": null };
  }
  ["updated"](_0x35779f) {
    _0x35779f["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_customCssState"], "tucbs-analysis-panel");
  }
  ["_openTool"](_0x36a6e4) {
    this["_activeTool"] = _0x36a6e4;
  }
  ["_backToList"]() {
    this["_activeTool"] = null;
  }
  ["resetActiveTool"]() {
    this["_activeTool"] = null;
  }
  ["_renderToolList"]() {
    return b`
      <div class="shell">
        <h3 class="heading">Coğrafi Analiz</h3>
        <p class="hint">Bir araç seçin.</p>
        <ul class="tool-list">
          ${TOOLS["map"]((_0x12f8a0) => b`
              <li>
                <button type="button" @click=${() => this["_openTool"](_0x12f8a0["id"])}>
                  ${_0x12f8a0["label"]}
                </button>
              </li>
            `)}
        </ul>
      </div>
    `;
  }
  ["_toolTag"]() {
    switch (this["_activeTool"]) {
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
  ["_renderActiveTool"]() {
    const _0x56cd74 = this["_toolTag"]();
    if (!_0x56cd74) return null;
    return b`
      <div class="shell">
        <button
          type="button"
          class="back"
          aria-label="Araç listesine dön"
          title="Geri"
          @click=${this["_backToList"]}
        >←</button>
        ${_0x56cd74 === "tucbs-boundary-tool" ? b`<tucbs-boundary-tool .map=${this["map"]} .mapElementId=${this["mapElementId"]}></tucbs-boundary-tool>` : _0x56cd74 === "tucbs-buffer-tool" ? b`<tucbs-buffer-tool .map=${this["map"]} .mapElementId=${this["mapElementId"]}></tucbs-buffer-tool>` : _0x56cd74 === "tucbs-clip-tool" ? b`<tucbs-clip-tool .map=${this["map"]} .mapElementId=${this["mapElementId"]}></tucbs-clip-tool>` : _0x56cd74 === "tucbs-difference-tool" ? b`<tucbs-difference-tool .map=${this["map"]} .mapElementId=${this["mapElementId"]}></tucbs-difference-tool>` : _0x56cd74 === "tucbs-intersection-tool" ? b`<tucbs-intersection-tool .map=${this["map"]} .mapElementId=${this["mapElementId"]}></tucbs-intersection-tool>` : _0x56cd74 === "tucbs-subtract-tool" ? b`<tucbs-subtract-tool .map=${this["map"]} .mapElementId=${this["mapElementId"]}></tucbs-subtract-tool>` : _0x56cd74 === "tucbs-union-tool" ? b`<tucbs-union-tool .map=${this["map"]} .mapElementId=${this["mapElementId"]}></tucbs-union-tool>` : b`<tucbs-wedge-buffer-tool .map=${this["map"]} .mapElementId=${this["mapElementId"]}></tucbs-wedge-buffer-tool>`}
      </div>
    `;
  }
  ["render"]() {
    if (this["_activeTool"]) return this["_renderActiveTool"]();
    return this["_renderToolList"]();
  }
};
TucbsAnalysisPanel["styles"] = i$5`
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
  `, __decorateClass$9([n$1()], TucbsAnalysisPanel["prototype"], "mapElementId", 2), __decorateClass$9([n$1({ "attribute": ![] })], TucbsAnalysisPanel["prototype"], "map", 2), __decorateClass$9([n$1({ "attribute": "custom-css" })], TucbsAnalysisPanel["prototype"], "customCss", 2), __decorateClass$9([r()], TucbsAnalysisPanel["prototype"], "_activeTool", 2), TucbsAnalysisPanel = __decorateClass$9([t$3("tucbs-analysis-panel")], TucbsAnalysisPanel);
var __defProp$7 = Object["defineProperty"], __getOwnPropDesc$8 = Object["getOwnPropertyDescriptor"], __decorateClass$8 = (_0x2e9f7d, _0xd343c7, _0x575272, _0x4a40c7) => {
  var _0x56ab12 = _0x4a40c7 > 1 ? void 0 : _0x4a40c7 ? __getOwnPropDesc$8(_0xd343c7, _0x575272) : _0xd343c7;
  for (var _0x3c99ce = _0x2e9f7d["length"] - 1, _0x78a6b; _0x3c99ce >= 0; _0x3c99ce--) if (_0x78a6b = _0x2e9f7d[_0x3c99ce]) _0x56ab12 = (_0x4a40c7 ? _0x78a6b(_0xd343c7, _0x575272, _0x56ab12) : _0x78a6b(_0x56ab12)) || _0x56ab12;
  if (_0x4a40c7 && _0x56ab12) __defProp$7(_0xd343c7, _0x575272, _0x56ab12);
  return _0x56ab12;
};
const ICON_ANALYSIS = o$1(iconNodeToString(_16_default$z)), EMBED_ANALYSIS_PANEL_CSS = "\n  :host {\n    position: static !important;\n    inset: auto !important;\n    z-index: auto !important;\n  }\n  .shell {\n    border: none;\n    padding: 0;\n    background: transparent;\n  }\n";
let TucbsAnalysisTool = class extends i$2 {
  constructor() {
    super(...arguments), this["mapElementId"] = "", this["panelWidth"] = "360px", this["customCss"] = "", this["_open"] = ![], this["_layoutController"] = new PanelLayoutController(this), this["_panelEl"] = null, this["_customCssState"] = { "sheet": null };
  }
  ["connectedCallback"]() {
    super["connectedCallback"](), this["_layoutController"]["onExclusiveClose"] = () => {
      if (this["_open"]) this["_toggle"]();
    };
    const _0x13b532 = document["createElement"]("tucbs-slide-over-panel");
    _0x13b532["panelTitle"] = "Coğrafi Analiz", _0x13b532["panelWidth"] = this["panelWidth"], _0x13b532["onCloseRequest"] = () => this["_toggle"](), document["body"]["appendChild"](_0x13b532), this["_panelEl"] = _0x13b532, this["_renderIntoPanel"]();
  }
  ["disconnectedCallback"]() {
    var _a2;
    if (this["map"]) this["_layoutController"]["unbindMap"](this["map"]);
    (_a2 = this["_panelEl"]) == null ? void 0 : _a2["remove"](), this["_panelEl"] = null, super["disconnectedCallback"]();
  }
  ["firstUpdated"]() {
    bindMapByElementId(this, { "noIdTiming": "raf", "noIdMessage": '[tucbs-analysis-tool] "mapElementId" verilmedi ve "map" atanmadı; analiz paneli haritaya bağlanamayabilir.', "missingElementMessage": (_0x385251) => '[tucbs-analysis-tool] mapElementId="' + _0x385251 + '" bulunamadı.' });
  }
  ["updated"](_0x23d914) {
    _0x23d914["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_customCssState"], "tucbs-analysis-tool");
    if (_0x23d914["has"]("map")) {
      const _0x455d62 = _0x23d914["get"]("map");
      if (_0x455d62) this["_layoutController"]["unbindMap"](_0x455d62);
      if (this["map"]) this["_layoutController"]["bindMap"](this["map"]);
    }
    _0x23d914["has"]("panelWidth") && this["_open"] && this["_layoutController"]["setOpen"](!![], this["panelWidth"]);
    if (this["_panelEl"]) this["_panelEl"]["panelWidth"] = this["panelWidth"];
    this["_renderIntoPanel"]();
  }
  ["_renderIntoPanel"]() {
    if (!this["_panelEl"]) return;
    this["_panelEl"]["open"] = this["_open"], D(b`
        <span slot="icon" style="display:inline-flex;align-items:center;justify-content:center;line-height:0;width:1.25rem;height:1.25rem">${ICON_ANALYSIS}</span>
        <tucbs-analysis-panel
          .map=${this["map"]}
          .mapElementId=${this["mapElementId"]}
          custom-css=${EMBED_ANALYSIS_PANEL_CSS}
        ></tucbs-analysis-panel>
      `, this["_panelEl"]);
  }
  ["_toggle"]() {
    var _a2, _b;
    this["_open"] = !this["_open"], !this["_open"] && ((_b = (_a2 = this["_panelEl"]) == null ? void 0 : _a2["querySelector"]("tucbs-analysis-panel")) == null ? void 0 : _b["resetActiveTool"]()), this["_layoutController"]["setOpen"](this["_open"], this["panelWidth"]), this["_renderIntoPanel"]();
  }
  ["render"]() {
    return b`
      <button
        type="button"
        class="tool-button ${this["_open"] ? "active" : ""}"
        aria-label="Coğrafi Analiz"
        data-tooltip="Coğrafi Analiz"
        aria-pressed=${this["_open"]}
        @click=${this["_toggle"]}
      >
        ${ICON_ANALYSIS}
      </button>
    `;
  }
};
TucbsAnalysisTool["styles"] = [leftTooltipStyles, i$5`
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
  `], __decorateClass$8([n$1()], TucbsAnalysisTool["prototype"], "mapElementId", 2), __decorateClass$8([n$1({ "attribute": "panel-width" })], TucbsAnalysisTool["prototype"], "panelWidth", 2), __decorateClass$8([n$1({ "attribute": "custom-css" })], TucbsAnalysisTool["prototype"], "customCss", 2), __decorateClass$8([n$1({ "attribute": ![] })], TucbsAnalysisTool["prototype"], "map", 2), __decorateClass$8([r()], TucbsAnalysisTool["prototype"], "_open", 2), TucbsAnalysisTool = __decorateClass$8([t$3("tucbs-analysis-tool")], TucbsAnalysisTool);
var __defProp$6 = Object["defineProperty"], __getOwnPropDesc$7 = Object["getOwnPropertyDescriptor"], __decorateClass$7 = (_0x2f8826, _0x255a42, _0x1f414f, _0x5d147e) => {
  var _0x24108c = _0x5d147e > 1 ? void 0 : _0x5d147e ? __getOwnPropDesc$7(_0x255a42, _0x1f414f) : _0x255a42;
  for (var _0x437152 = _0x2f8826["length"] - 1, _0x37d9b2; _0x437152 >= 0; _0x437152--) if (_0x37d9b2 = _0x2f8826[_0x437152]) _0x24108c = (_0x5d147e ? _0x37d9b2(_0x255a42, _0x1f414f, _0x24108c) : _0x37d9b2(_0x24108c)) || _0x24108c;
  if (_0x5d147e && _0x24108c) __defProp$6(_0x255a42, _0x1f414f, _0x24108c);
  return _0x24108c;
};
const POSITION_STYLES = { "right-center": { "top": "50%", "right": "1rem", "bottom": "", "left": "", "transform": "translateY(-50%)" }, "top-right": { "top": "1rem", "right": "1rem", "bottom": "", "left": "", "transform": "" }, "bottom-right": { "bottom": "1rem", "right": "1rem", "top": "", "left": "", "transform": "" }, "top-center": { "top": "1rem", "left": "50%", "right": "", "bottom": "", "transform": "translateX(-50%)" }, "top-left": { "top": "1rem", "left": "1rem", "right": "", "bottom": "", "transform": "" }, "bottom-left": { "bottom": "1rem", "left": "1rem", "top": "", "right": "", "transform": "" }, "left-center": { "top": "50%", "left": "1rem", "right": "", "bottom": "", "transform": "translateY(-50%)" } }, BUILTIN_TOOLS = { "zoom": "tucbs-zoom-tool", "goto-coordinate": "tucbs-goto-coordinate", "draw": "tucbs-draw-tool", "delete": "tucbs-delete-tool", "measure": "tucbs-measure-tool", "map-export": "tucbs-map-export", "settings": "tucbs-settings-tool", "print": "tucbs-print-tool", "analysis": "tucbs-analysis-tool" }, CUSTOM_ELEMENT_NAME_PATTERN = /^[a-z][a-z0-9]*(-[a-z0-9]+)+$/;
let TucbsToolbar = class extends i$2 {
  constructor() {
    super(...arguments), this["mapElementId"] = "", this["position"] = "right-center", this["tools"] = "zoom", this["customTools"] = {}, this["toolProps"] = {}, this["customCss"] = "", this["_customCssState"] = { "sheet": null }, this["_timers"] = new TimerBag(this);
  }
  ["addTool"](_0x3ba207, _0x294294) {
    const _0x12928d = this["_toolIds"]();
    if (_0x294294 === void 0) _0x12928d["push"](_0x3ba207);
    else _0x12928d["splice"](_0x294294, 0, _0x3ba207);
    this["tools"] = _0x12928d["join"](",");
  }
  ["removeTool"](_0x187c0c) {
    this["tools"] = this["_toolIds"]()["filter"]((_0x1ae57e) => _0x1ae57e !== _0x187c0c)["join"](",");
  }
  ["registerTool"](_0x37576f, _0x3484be) {
    if (!CUSTOM_ELEMENT_NAME_PATTERN["test"](_0x3484be)) {
      console["warn"]('[tucbs-toolbar] registerTool("' + _0x37576f + '", "' + _0x3484be + '") -- gecersiz custom element adi, yok sayildi.');
      return;
    }
    this["customTools"] = { ...this["customTools"], [_0x37576f]: _0x3484be };
  }
  ["setToolProps"](_0x352e4a, _0x42007c) {
    this["toolProps"] = { ...this["toolProps"], [_0x352e4a]: _0x42007c };
  }
  ["_toolIds"]() {
    return this["tools"]["split"](",")["map"]((_0x586763) => _0x586763["trim"]())["filter"](Boolean);
  }
  ["_tagFor"](_0x38a44f) {
    const _0x15a6ce = this["customTools"][_0x38a44f] ?? BUILTIN_TOOLS[_0x38a44f];
    if (_0x15a6ce && !CUSTOM_ELEMENT_NAME_PATTERN["test"](_0x15a6ce)) return void 0;
    return _0x15a6ce;
  }
  ["willUpdate"](_0x31d2ec) {
    _0x31d2ec["has"]("position") && Object["assign"](this["style"], POSITION_STYLES[this["position"]]);
    if (_0x31d2ec["has"]("tools") || _0x31d2ec["has"]("customTools")) {
      const _0x47960f = this["_toolIds"]()["filter"]((_0x47738b) => !this["_tagFor"](_0x47738b));
      _0x47960f["length"] > 0 && console["warn"]("[tucbs-toolbar] Bilinmeyen/gecersiz arac id'leri: " + _0x47960f["join"](", ") + " -- yok sayildi (registerTool() ile kayit edilmedi ya da gecersiz etiket adi).");
    }
  }
  ["firstUpdated"]() {
    if (this["map"]) return;
    if (!this["mapElementId"]) {
      this["_timers"]["requestAnimationFrame"](() => {
        if (this["map"]) return;
        console["warn"]('[tucbs-toolbar] "mapElementId" verilmedi ve "map" programatik olarak atanmadi; bilesen haritaya baglanamadigi icin icerdeki araclar islevsiz kalacak.');
      });
      return;
    }
    const _0x58520a = document["getElementById"](this["mapElementId"]);
    if (!_0x58520a) {
      console["warn"]('[tucbs-toolbar] mapElementId="' + this["mapElementId"] + '" ile eslesen bir element bulunamadi; bilesen haritaya baglanamadigi icin icerdeki araclar islevsiz kalacak.');
      return;
    }
    whenTucbsMapReady(_0x58520a, (_0x5e661b) => {
      _0x5e661b["map"] && (this["map"] = _0x5e661b["map"]);
    });
  }
  ["_renderTool"](_0x2f2b04) {
    const _0x194ebf = this["_tagFor"](_0x2f2b04);
    if (!_0x194ebf) return null;
    const _0x4e9ee5 = s(_0x194ebf);
    return u`<${_0x4e9ee5} data-tool-id=${_0x2f2b04} .map=${this["map"]}></${_0x4e9ee5}>`;
  }
  ["_applyToolProps"]() {
    for (const [_0x54f656, _0x33566] of Object["entries"](this["toolProps"])) {
      const _0x5ef38f = this["renderRoot"]["querySelector"]('[data-tool-id="' + _0x54f656 + '"]');
      if (_0x5ef38f) Object["assign"](_0x5ef38f, _0x33566);
    }
  }
  ["updated"](_0x4488af) {
    _0x4488af["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_customCssState"], "tucbs-toolbar"), (_0x4488af["has"]("toolProps") || _0x4488af["has"]("map") || _0x4488af["has"]("tools") || _0x4488af["has"]("customTools")) && this["_applyToolProps"]();
  }
  ["render"]() {
    if (!this["map"]) return A;
    return u` <div class="toolbar">${this["_toolIds"]()["map"]((_0x24474a) => this["_renderTool"](_0x24474a))}</div> `;
  }
};
TucbsToolbar["styles"] = i$5`
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
  `, __decorateClass$7([n$1()], TucbsToolbar["prototype"], "mapElementId", 2), __decorateClass$7([n$1()], TucbsToolbar["prototype"], "position", 2), __decorateClass$7([n$1()], TucbsToolbar["prototype"], "tools", 2), __decorateClass$7([n$1({ "type": Object, "attribute": "custom-tools" })], TucbsToolbar["prototype"], "customTools", 2), __decorateClass$7([n$1({ "type": Object, "attribute": "tool-props" })], TucbsToolbar["prototype"], "toolProps", 2), __decorateClass$7([n$1({ "attribute": "custom-css" })], TucbsToolbar["prototype"], "customCss", 2), __decorateClass$7([n$1({ "attribute": ![] })], TucbsToolbar["prototype"], "map", 2), TucbsToolbar = __decorateClass$7([t$3("tucbs-toolbar")], TucbsToolbar);
var __defProp$5 = Object["defineProperty"], __getOwnPropDesc$6 = Object["getOwnPropertyDescriptor"], __decorateClass$6 = (_0x2effed, _0x13f42f, _0x39e38e, _0x323a9d) => {
  var _0x39c6c4 = _0x323a9d > 1 ? void 0 : _0x323a9d ? __getOwnPropDesc$6(_0x13f42f, _0x39e38e) : _0x13f42f;
  for (var _0x2510d2 = _0x2effed["length"] - 1, _0x985d42; _0x2510d2 >= 0; _0x2510d2--) if (_0x985d42 = _0x2effed[_0x2510d2]) _0x39c6c4 = (_0x323a9d ? _0x985d42(_0x13f42f, _0x39e38e, _0x39c6c4) : _0x985d42(_0x39c6c4)) || _0x39c6c4;
  if (_0x323a9d && _0x39c6c4) __defProp$5(_0x13f42f, _0x39e38e, _0x39c6c4);
  return _0x39c6c4;
};
let TucbsInfoBar = class extends i$2 {
  constructor() {
    super(...arguments), this["mapElementId"] = "", this["customCss"] = "", this["attribution"] = "EPSG:4326 Altlık Harita, Harita Genel Müdürlüğü (HGM) tarafından sağlanmaktadır.", this["_customCssState"] = { "sheet": null }, this["_lon"] = null, this["_lat"] = null, this["_height"] = null, this["_scale"] = null, this["_mouseMoveRaf"] = null, this["_pendingMouseDetail"] = null, this["_cameraRaf"] = null, this["_timers"] = new TimerBag(this), this["_onMapMouseMove"] = (_0x27fe26) => {
      this["_pendingMouseDetail"] = _0x27fe26;
      if (this["_mouseMoveRaf"] !== null) return;
      this["_mouseMoveRaf"] = this["_timers"]["requestAnimationFrame"](() => {
        this["_mouseMoveRaf"] = null;
        const _0x1ea2ce = this["_pendingMouseDetail"];
        if (!_0x1ea2ce) return;
        const [_0x3930fa, _0x3fbf5d] = _0x1ea2ce["position"];
        this["_lon"] = _0x3930fa, this["_lat"] = _0x3fbf5d, this["_height"] = this["_sampleHeight"](_0x3930fa, _0x3fbf5d);
      });
    }, this["_onCameraChanged"] = () => {
      if (this["_cameraRaf"] !== null) return;
      this["_cameraRaf"] = this["_timers"]["requestAnimationFrame"](() => {
        this["_cameraRaf"] = null, this["_scale"] = this["_computeScale"]();
      });
    }, this["_onPostRender"] = () => {
      var _a2, _b;
      const _0x1e480d = (_a2 = this["interactionManager"]) == null ? void 0 : _a2["camera"];
      if (!_0x1e480d) return;
      if ((_b = this["_lastCameraPosition"]) == null ? void 0 : _b["equals"](_0x1e480d["positionWC"])) return;
      this["_lastCameraPosition"] = _0x1e480d["positionWC"]["clone"](this["_lastCameraPosition"]), this["_onCameraChanged"]();
    };
  }
  ["firstUpdated"]() {
    if (this["interactionManager"] || !this["mapElementId"]) return;
    const _0x173d82 = document["getElementById"](this["mapElementId"]);
    if (!_0x173d82) return;
    whenTucbsMapReady(_0x173d82, (_0x8d65ae) => {
      _0x8d65ae["interaction"] && (this["interactionManager"] = _0x8d65ae["interaction"]);
    });
  }
  ["updated"](_0x3f5297) {
    _0x3f5297["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_customCssState"], "tucbs-info-bar");
    if (!_0x3f5297["has"]("interactionManager")) return;
    const _0x455be7 = _0x3f5297["get"]("interactionManager");
    if (_0x455be7) this["_unbind"](_0x455be7);
    this["interactionManager"] && (this["_bind"](this["interactionManager"]), this["_scale"] = this["_computeScale"]());
  }
  ["disconnectedCallback"]() {
    if (this["interactionManager"]) this["_unbind"](this["interactionManager"]);
    super["disconnectedCallback"]();
  }
  ["_bind"](_0x4e1bd8) {
    this["_removePostRender"] = _0x4e1bd8["scene"]["postRender"]["addEventListener"](this["_onPostRender"]), _0x4e1bd8["on"]("map:mousemove", this["_onMapMouseMove"]), _0x4e1bd8["on"]("camera:changed", this["_onCameraChanged"]), _0x4e1bd8["on"]("camera:moveEnd", this["_onCameraChanged"]);
  }
  ["_unbind"](_0x31b198) {
    var _a2;
    (_a2 = this["_removePostRender"]) == null ? void 0 : _a2.call(this), this["_removePostRender"] = void 0, _0x31b198["off"]("map:mousemove", this["_onMapMouseMove"]), _0x31b198["off"]("camera:changed", this["_onCameraChanged"]), _0x31b198["off"]("camera:moveEnd", this["_onCameraChanged"]);
  }
  ["_sampleHeight"](_0xc5535d, _0x4019fb) {
    var _a2;
    const _0x216bd8 = (_a2 = this["interactionManager"]) == null ? void 0 : _a2["scene"]["globe"];
    if (!_0x216bd8) return 0;
    const _0xb939f3 = _0x216bd8["getHeight"](Cartographic["fromDegrees"](_0xc5535d, _0x4019fb));
    return _0xb939f3 ?? 0;
  }
  ["_computeScale"]() {
    var _a2;
    const _0x3bb418 = (_a2 = this["interactionManager"]) == null ? void 0 : _a2["scene"];
    if (!_0x3bb418) return null;
    const _0x232ed4 = measureGround(_0x3bb418);
    return _0x232ed4 ? snapScaleForDisplay(_0x232ed4["scale"]) : null;
  }
  ["_formatLat"]() {
    if (this["_lat"] === null) return "–";
    const _0x695dfb = this["_lat"] >= 0 ? "N" : "S";
    return "Enlem " + Math["abs"](this["_lat"])["toFixed"](5) + "° " + _0x695dfb;
  }
  ["_formatLon"]() {
    if (this["_lon"] === null) return "–";
    const _0x138ee9 = this["_lon"] >= 0 ? "E" : "W";
    return "Boylam " + Math["abs"](this["_lon"])["toFixed"](5) + "° " + _0x138ee9;
  }
  ["_formatHeight"]() {
    if (this["_height"] === null) return "–";
    return "Yükseklik " + Math["round"](this["_height"]) + " m";
  }
  ["_formatScale"]() {
    if (this["_scale"] === null || !Number["isFinite"](this["_scale"])) return "–";
    const _0x4f8504 = Math["round"](this["_scale"])["toLocaleString"]("tr-TR");
    return "Ölçek 1/" + _0x4f8504;
  }
  ["render"]() {
    if (!this["interactionManager"]) return A;
    return b`
      <div class="bar">
        <div class="left">
          <span>${this["_formatLat"]()}</span>
          <span>${this["_formatLon"]()}</span>
          <span>${this["_formatHeight"]()}</span>
          <span>${this["_formatScale"]()}</span>
        </div>
        <div class="right">${this["attribution"]}</div>
      </div>
    `;
  }
};
TucbsInfoBar["styles"] = i$5`
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
  `, __decorateClass$6([n$1({ "attribute": ![] })], TucbsInfoBar["prototype"], "interactionManager", 2), __decorateClass$6([n$1()], TucbsInfoBar["prototype"], "mapElementId", 2), __decorateClass$6([n$1({ "attribute": "custom-css" })], TucbsInfoBar["prototype"], "customCss", 2), __decorateClass$6([n$1()], TucbsInfoBar["prototype"], "attribution", 2), __decorateClass$6([r()], TucbsInfoBar["prototype"], "_lon", 2), __decorateClass$6([r()], TucbsInfoBar["prototype"], "_lat", 2), __decorateClass$6([r()], TucbsInfoBar["prototype"], "_height", 2), __decorateClass$6([r()], TucbsInfoBar["prototype"], "_scale", 2), TucbsInfoBar = __decorateClass$6([t$3("tucbs-info-bar")], TucbsInfoBar);
/**
* @license
* Copyright 2018 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
const e2 = e$2(class extends i$1 {
  constructor(_0x28df4e) {
    var _a2;
    if (super(_0x28df4e), _0x28df4e["type"] !== t$2["ATTRIBUTE"] || "class" !== _0x28df4e["name"] || ((_a2 = _0x28df4e["strings"]) == null ? void 0 : _a2["length"]) > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  ["render"](_0x45e359) {
    return " " + Object["keys"](_0x45e359)["filter"]((_0x362b9b) => _0x45e359[_0x362b9b])["join"](" ") + " ";
  }
  ["update"](_0x312fbb, [_0x567655]) {
    var _a2, _b;
    if (void 0 === this["st"]) {
      this["st"] = /* @__PURE__ */ new Set(), void 0 !== _0x312fbb["strings"] && (this["nt"] = new Set(_0x312fbb["strings"]["join"](" ")["split"](/\s/)["filter"]((_0x2012d0) => "" !== _0x2012d0)));
      for (const _0x1721f8 in _0x567655) _0x567655[_0x1721f8] && !((_a2 = this["nt"]) == null ? void 0 : _a2["has"](_0x1721f8)) && this["st"]["add"](_0x1721f8);
      return this["render"](_0x567655);
    }
    const _0x2b5582 = _0x312fbb["element"]["classList"];
    for (const _0x465580 of this["st"]) _0x465580 in _0x567655 || (_0x2b5582["remove"](_0x465580), this["st"]["delete"](_0x465580));
    for (const _0x197034 in _0x567655) {
      const _0x528361 = !!_0x567655[_0x197034];
      _0x528361 === this["st"]["has"](_0x197034) || ((_b = this["nt"]) == null ? void 0 : _b["has"](_0x197034)) || (_0x528361 ? (_0x2b5582["add"](_0x197034), this["st"]["add"](_0x197034)) : (_0x2b5582["remove"](_0x197034), this["st"]["delete"](_0x197034)));
    }
    return E;
  }
});
function deferredMeasure(_0x6e6f63, _0x15d6b0) {
  _0x6e6f63["requestAnimationFrame"](_0x15d6b0), _0x6e6f63["setTimeout"](_0x15d6b0, 150);
}
const identifyPanelStyles = i$5`
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
function stripHtml(_0x39d522) {
  return _0x39d522["replace"](/<[^>]*>/g, " ")["replace"](/\s+/g, " ")["trim"]();
}
function toResultItem(_0x52bbc5, _0x57577c) {
  const _0x34f38d = _0x52bbc5["layerId"] ? _0x57577c == null ? void 0 : _0x57577c["getLayers"]()["find"]((_0x2271ce) => _0x2271ce["id"] === _0x52bbc5["layerId"]) : void 0, _0xf767a2 = (_0x34f38d == null ? void 0 : _0x34f38d["title"]) ?? _0x52bbc5["layerId"] ?? _0x52bbc5["featureId"] ?? "—", _0x410557 = Object["entries"](_0x52bbc5["properties"])["filter"](([_0x4a256b]) => _0x4a256b !== "layerId" && _0x4a256b !== "featureId");
  return { "layerTitle": _0xf767a2, "layerType": _0x34f38d == null ? void 0 : _0x34f38d["layerType"], "propertyEntries": _0x410557, "entity": _0x52bbc5["entity"] };
}
function toImageryResultItem(_0x502cd2, _0x2e90f9) {
  const _0x1e2e39 = _0x2e90f9 == null ? void 0 : _0x2e90f9["getLayers"]()["find"]((_0x208001) => _0x208001["cesiumObject"] === _0x502cd2["imageryLayer"]), _0x38cd21 = (_0x1e2e39 == null ? void 0 : _0x1e2e39["title"]) ?? _0x502cd2["name"] ?? "—", _0x5b6c54 = Object["entries"](_0x502cd2["properties"]);
  if (_0x5b6c54["length"] === 0 && _0x502cd2["description"]) {
    const _0x13fa32 = stripHtml(_0x502cd2["description"]);
    if (_0x13fa32) return { "layerTitle": _0x38cd21, "layerType": _0x1e2e39 == null ? void 0 : _0x1e2e39["layerType"], "propertyEntries": [["Bilgi", _0x13fa32]], "geometryHint": _0x502cd2["geometryHint"] };
  }
  return { "layerTitle": _0x38cd21, "layerType": _0x1e2e39 == null ? void 0 : _0x1e2e39["layerType"], "propertyEntries": _0x5b6c54, "geometryHint": _0x502cd2["geometryHint"] };
}
function toImageryResultItems(_0x562fc3, _0xd1037a) {
  return _0x562fc3["map"]((_0x32b3e1) => toImageryResultItem(_0x32b3e1, _0xd1037a))["filter"]((_0x3a1ce3) => _0x3a1ce3["propertyEntries"]["length"] > 0);
}
function pagedTableItems(_0x15bd73, _0x30f091, _0x54ce58) {
  const _0x58f10f = _0x30f091 * _0x54ce58;
  return _0x15bd73["slice"](_0x58f10f, _0x58f10f + _0x54ce58);
}
function itemGlobalIndex(_0x47e78e, _0x3a180f) {
  return _0x47e78e["indexOf"](_0x3a180f) + 1;
}
const COMPACT_PANEL_MAX_WIDTH = 720, COMPACT_ITEM_BODY_CHROME = 34, VIEWPORT_MARGIN = 32;
function compactItemBodyMaxWidth(_0x2b0fe0) {
  const _0x543f58 = Math["min"](COMPACT_PANEL_MAX_WIDTH, _0x2b0fe0 - VIEWPORT_MARGIN);
  return Math["max"](0, _0x543f58 - COMPACT_ITEM_BODY_CHROME);
}
const WKT_PATTERN = /^\s*(?:MULTI)?(?:POINT|LINESTRING|POLYGON)|^\s*GEOMETRYCOLLECTION/i, NUMERIC_ARRAY_OR_COMMA = /\[-?[\d.eE+]+(?:,-?[\d.eE+]+)+\]|,/g;
function formatPropertyValue(_0x2cd732) {
  if (_0x2cd732 === null || _0x2cd732 === void 0) return "—";
  let _0x2163ba = typeof _0x2cd732 === "object" ? JSON["stringify"](_0x2cd732) : String(_0x2cd732);
  return WKT_PATTERN["test"](_0x2163ba) && (_0x2163ba = _0x2163ba["replace"](new RegExp("(?<=\\d) (?=-?\\d)", "g"), " ")), _0x2163ba["replace"](NUMERIC_ARRAY_OR_COMMA, (_0x29300e) => _0x29300e === "," ? ",​" : _0x29300e);
}
const NEUTRAL_VECTOR_CLICK_STATE = { "kind": "neutral" };
function toNeutral() {
  return NEUTRAL_VECTOR_CLICK_STATE;
}
function toEntityPending(_0x5bca2e) {
  return { "kind": "entityPending", "pendingVectorClick": _0x5bca2e };
}
function toEntityCommitted() {
  return { "kind": "entityCommitted" };
}
var __defProp$4 = Object["defineProperty"], __getOwnPropDesc$5 = Object["getOwnPropertyDescriptor"], __decorateClass$5 = (_0xe49194, _0x1b7ca5, _0x23e83c, _0x2e8cda) => {
  var _0x577809 = _0x2e8cda > 1 ? void 0 : _0x2e8cda ? __getOwnPropDesc$5(_0x1b7ca5, _0x23e83c) : _0x1b7ca5;
  for (var _0x3704a6 = _0xe49194["length"] - 1, _0x325515; _0x3704a6 >= 0; _0x3704a6--) if (_0x325515 = _0xe49194[_0x3704a6]) _0x577809 = (_0x2e8cda ? _0x325515(_0x1b7ca5, _0x23e83c, _0x577809) : _0x325515(_0x577809)) || _0x577809;
  if (_0x2e8cda && _0x577809) __defProp$4(_0x1b7ca5, _0x23e83c, _0x577809);
  return _0x577809;
};
function carbonIcon(_0x2dce0e) {
  return o$1(iconNodeToString(_0x2dce0e));
}
const ICON_LOCATION = carbonIcon(_16_default$i), ICON_INFORMATION = carbonIcon(_20_default$1), ICON_CLOSE$2 = carbonIcon(_16_default$v), ICON_ZOOM_IN = carbonIcon(_20_default), BASIC_DISMISS_MS = 4e3, IDENTIFY_PAGE_SIZE = 5, MAX_ITEM_TITLE_WIDTH = 250, ZOOM_FLIGHT_DURATION_SECONDS = 0.6;
function formatLat(_0x315d4d) {
  return Math["abs"](_0x315d4d)["toFixed"](5) + "° " + (_0x315d4d >= 0 ? "N" : "S");
}
function formatLon(_0x3c6691) {
  return Math["abs"](_0x3c6691)["toFixed"](5) + "° " + (_0x3c6691 >= 0 ? "E" : "W");
}
let TucbsIdentifyPanel = class extends i$2 {
  constructor() {
    super(...arguments), this["mapElementId"] = "", this["customCss"] = "", this["_customCssState"] = { "sheet": null }, this["_basicOpen"] = ![], this["_basicLon"] = 0, this["_basicLat"] = 0, this["_imageryPending"] = ![], this["_vectorClickState"] = NEUTRAL_VECTOR_CLICK_STATE, this["_tableOpen"] = ![], this["_tableItems"] = [], this["_tableLon"] = 0, this["_tableLat"] = 0, this["_accordionPage"] = 0, this["_tableSource"] = "vector", this["_timers"] = new TimerBag(this), this["_basicDismissTimer"] = null, this["_drag"] = new DraggablePanelController(this, { "getPanel": () => this["_attrPanelEl"], "ignoreSelector": ".attr-close-btn" }), this["_onMapClick"] = (_0x1bd7e5) => {
      var _a2;
      if ((_a2 = this["interactionManager"]) == null ? void 0 : _a2["isIdentifySuspended"]()) return;
      this["_tableOpen"] = ![], this["_imageryPending"] = ![], this["_vectorClickState"] = toNeutral();
      const [_0x3c440a, _0x2a50fb] = _0x1bd7e5["position"];
      this["_timers"]["setTimeout"](() => {
        if (this["_imageryPending"]) return;
        this["_basicLon"] = _0x3c440a, this["_basicLat"] = _0x2a50fb, this["_basicOpen"] = !![], this["_scheduleBasicDismiss"]();
      }, 0);
    }, this["_onInteractionSuspend"] = () => {
      this["_closeBasic"]();
    }, this["_onImageryQuerying"] = () => {
      var _a2;
      if ((_a2 = this["interactionManager"]) == null ? void 0 : _a2["isIdentifySuspended"]()) return;
      this["_imageryPending"] = !![];
    }, this["_compactItemBoxGeneration"] = new AsyncGeneration(), this["_itemTitleGroupWidthGeneration"] = new AsyncGeneration(), this["_onEntityClick"] = (_0x5431b1) => {
      var _a2;
      if ((_a2 = this["interactionManager"]) == null ? void 0 : _a2["isIdentifySuspended"]()) return;
      this["_imageryPending"] = ![];
      const [_0x3946b3, _0x1616be] = _0x5431b1["position"];
      this["_vectorClickState"] = toEntityPending({ "items": _0x5431b1["features"]["map"]((_0xc063b4) => toResultItem(_0xc063b4, this["layerManager"])), "lon": _0x3946b3, "lat": _0x1616be }), this["_timers"]["setTimeout"](() => {
        if (this["_vectorClickState"]["kind"] !== "entityPending" || this["_imageryPending"]) return;
        const { pendingVectorClick: _0x4439f9 } = this["_vectorClickState"];
        this["_openTable"](_0x4439f9["items"], _0x4439f9["lon"], _0x4439f9["lat"], "vector");
      }, 0);
    }, this["_onImageryClick"] = (_0x42d17f) => {
      var _a2;
      if ((_a2 = this["interactionManager"]) == null ? void 0 : _a2["isIdentifySuspended"]()) return;
      this["_imageryPending"] = ![];
      if (this["_vectorClickState"]["kind"] !== "neutral") {
        const _0x4e0beb = toImageryResultItems(_0x42d17f["features"], this["layerManager"]);
        if (this["_vectorClickState"]["kind"] === "entityPending") {
          const { pendingVectorClick: _0x4c53fe } = this["_vectorClickState"], _0x597d92 = _0x4c53fe["items"];
          this["_openTable"]([..._0x597d92, ..._0x4e0beb], _0x4c53fe["lon"], _0x4c53fe["lat"], _0x4e0beb["length"] > 0 ? "mixed" : "vector");
          return;
        }
        this["_tableOpen"] && _0x4e0beb["length"] > 0 && (this["_tableItems"] = [...this["_tableItems"], ..._0x4e0beb], this["_tableSource"] = "mixed");
        return;
      }
      const _0x4d9f9e = toImageryResultItems(_0x42d17f["features"], this["layerManager"]), [_0x2ae78b, _0x24dc55] = _0x42d17f["position"];
      if (_0x4d9f9e["length"] === 0) {
        showToast("info", "Bu konumda öznitelik bilgisi bulunamadı."), this["_basicLon"] = _0x2ae78b, this["_basicLat"] = _0x24dc55, this["_basicOpen"] = !![], this["_scheduleBasicDismiss"]();
        return;
      }
      this["_openTable"](_0x4d9f9e, _0x2ae78b, _0x24dc55, "imagery");
    }, this["_onAccordionItemBeforeToggle"] = (_0x404433) => {
      const _0xc308fa = _0x404433["detail"];
      if (_0xc308fa["open"]) return;
      const _0x2bceef = _0x404433["currentTarget"], _0x1f6009 = _0x2bceef["querySelectorAll"]("cds-accordion-item"), _0x30de39 = Array["from"](_0x1f6009)["filter"]((_0x13ed0c) => _0x13ed0c["open"])["length"];
      if (_0x30de39 <= 1) _0x404433["preventDefault"]();
    }, this["_onAccordionItemToggled"] = (_0x23cf2a) => {
      const _0x43739d = _0x23cf2a["detail"];
      if (_0x43739d["open"]) {
        const _0x1bff8c = _0x23cf2a["target"], _0x2c2717 = _0x23cf2a["currentTarget"];
        for (const _0x2b0177 of _0x2c2717["querySelectorAll"]("cds-accordion-item")) {
          if (_0x2b0177 !== _0x1bff8c) _0x2b0177["open"] = ![];
        }
      }
      this["_scheduleScrollThumbSync"]();
    };
  }
  get ["_accordionPageCount"]() {
    return Math["max"](1, Math["ceil"](this["_tableItems"]["length"] / IDENTIFY_PAGE_SIZE));
  }
  get ["_isCompactPanel"]() {
    return this["_accordionPageCount"] <= 1;
  }
  async ["_syncCompactItemBox"]() {
    var _a2;
    const _0x24f310 = this["_attrPanelEl"];
    if (!_0x24f310) return;
    if (!this["_isCompactPanel"] || this["_tableItems"]["length"] <= 1) {
      _0x24f310["style"]["removeProperty"]("--tucbs-item-min-width"), _0x24f310["style"]["removeProperty"]("--tucbs-item-min-height");
      return;
    }
    const _0x1cfa0f = this["_compactItemBoxGeneration"]["next"](), _0x5145f3 = this["_tableItems"], _0x5ea798 = document["createElement"]("div");
    _0x5ea798["style"]["cssText"] = "position:fixed;top:-99999px;left:-99999px;visibility:hidden;width:max-content;max-width:" + compactItemBodyMaxWidth(window["innerWidth"]) + "px;", (_a2 = this["shadowRoot"]) == null ? void 0 : _a2["appendChild"](_0x5ea798);
    let _0x4257b9 = 0, _0x127c92 = 0;
    for (const _0x4f1ee3 of _0x5145f3) {
      const _0x1c7c58 = document["createElement"]("div");
      _0x1c7c58["className"] = "item-body", _0x5ea798["replaceChildren"](_0x1c7c58), D(this["_renderPropertyTable"](_0x4f1ee3["propertyEntries"]), _0x1c7c58), await new Promise((_0x2ad05f) => this["_timers"]["requestAnimationFrame"](() => _0x2ad05f()));
      if (!this["_compactItemBoxGeneration"]["isCurrent"](_0x1cfa0f)) {
        _0x5ea798["remove"]();
        return;
      }
      const _0x2613bf = _0x1c7c58["getBoundingClientRect"]();
      _0x4257b9 = Math["max"](_0x4257b9, _0x2613bf["width"]), _0x127c92 = Math["max"](_0x127c92, _0x2613bf["height"]);
    }
    _0x5ea798["remove"]();
    if (!this["_compactItemBoxGeneration"]["isCurrent"](_0x1cfa0f)) return;
    if (_0x4257b9 > 0) _0x24f310["style"]["setProperty"]("--tucbs-item-min-width", Math["ceil"](_0x4257b9) + "px");
    if (_0x127c92 > 0) _0x24f310["style"]["setProperty"]("--tucbs-item-min-height", Math["ceil"](_0x127c92) + "px");
  }
  async ["_syncItemTitleGroupWidth"]() {
    var _a2;
    const _0x531e86 = this["_attrPanelEl"];
    if (!_0x531e86) return;
    if (this["_tableItems"]["length"] <= 1) {
      _0x531e86["style"]["removeProperty"]("--tucbs-item-title-width"), _0x531e86["style"]["removeProperty"]("--tucbs-item-suffix-width"), _0x531e86["style"]["removeProperty"]("--tucbs-item-tag-width");
      return;
    }
    const _0x10a1f3 = this["_itemTitleGroupWidthGeneration"]["next"](), _0x2d2561 = this["_tableItems"], _0x37bfd5 = document["createElement"]("cds-accordion-item");
    _0x37bfd5["style"]["cssText"] = "position:fixed;top:-99999px;left:-99999px;visibility:hidden;", (_a2 = this["shadowRoot"]) == null ? void 0 : _a2["appendChild"](_0x37bfd5);
    let _0x3714f2 = 0, _0x4b5eb = 0, _0x25e94b = 0;
    for (const _0x254c45 of _0x2d2561) {
      const _0x3857a5 = document["createElement"]("span");
      _0x3857a5["slot"] = "title", _0x3857a5["className"] = "item-title-group";
      const _0x284811 = document["createElement"]("span");
      _0x284811["className"] = "item-title-text", _0x284811["textContent"] = _0x254c45["layerTitle"], _0x3857a5["appendChild"](_0x284811);
      const _0x19d05b = document["createElement"]("span");
      _0x19d05b["className"] = "item-title-suffix", _0x19d05b["textContent"] = String(this["_itemGlobalIndex"](_0x254c45)), _0x3857a5["appendChild"](_0x19d05b);
      const _0x31d68b = !!_0x254c45["layerType"] && _0x254c45["layerType"] !== "DRAWING" && _0x254c45["layerType"] !== "MEASURE";
      let _0x15f106 = null;
      _0x31d68b && (_0x15f106 = document["createElement"]("span"), _0x15f106["className"] = "attr-type-tag", _0x15f106["textContent"] = _0x254c45["layerType"], _0x3857a5["appendChild"](_0x15f106));
      _0x37bfd5["replaceChildren"](_0x3857a5), await new Promise((_0x507b8f) => this["_timers"]["requestAnimationFrame"](() => _0x507b8f()));
      if (!this["_itemTitleGroupWidthGeneration"]["isCurrent"](_0x10a1f3)) {
        _0x37bfd5["remove"]();
        return;
      }
      _0x3714f2 = Math["max"](_0x3714f2, _0x284811["getBoundingClientRect"]()["width"]), _0x4b5eb = Math["max"](_0x4b5eb, _0x19d05b["getBoundingClientRect"]()["width"]);
      if (_0x15f106) _0x25e94b = Math["max"](_0x25e94b, _0x15f106["getBoundingClientRect"]()["width"]);
    }
    _0x37bfd5["remove"]();
    if (!this["_itemTitleGroupWidthGeneration"]["isCurrent"](_0x10a1f3)) return;
    const _0x4c6fed = Math["min"](Math["ceil"](_0x3714f2), MAX_ITEM_TITLE_WIDTH);
    if (_0x4c6fed > 0) _0x531e86["style"]["setProperty"]("--tucbs-item-title-width", _0x4c6fed + "px");
    if (_0x4b5eb > 0) _0x531e86["style"]["setProperty"]("--tucbs-item-suffix-width", Math["ceil"](_0x4b5eb) + "px");
    if (_0x25e94b > 0) _0x531e86["style"]["setProperty"]("--tucbs-item-tag-width", Math["ceil"](_0x25e94b) + "px");
  }
  get ["_pagedTableItems"]() {
    return pagedTableItems(this["_tableItems"], this["_accordionPage"], IDENTIFY_PAGE_SIZE);
  }
  ["_goToAccordionPage"](_0x5e5101) {
    this["_accordionPage"] = Math["max"](0, Math["min"](_0x5e5101, this["_accordionPageCount"] - 1));
  }
  ["_itemGlobalIndex"](_0x1109f6) {
    return itemGlobalIndex(this["_tableItems"], _0x1109f6);
  }
  ["_openTable"](_0x372e8f, _0x57feaa, _0x53a1dd, _0x16d182) {
    this["_vectorClickState"] = toEntityCommitted(), this["_basicOpen"] = ![], this["_clearBasicDismiss"]();
    for (const _0x1b8800 of document["querySelectorAll"]("tucbs-style-editor")) {
      if (_0x1b8800["open"]) _0x1b8800["close"]();
    }
    this["_tableSource"] = _0x16d182, this["_tableItems"] = _0x372e8f, this["_accordionPage"] = 0, this["_tableLon"] = _0x57feaa, this["_tableLat"] = _0x53a1dd, this["_tableOpen"] = !![];
  }
  ["_resetAccordionOpen"]() {
    const _0xd93b20 = () => {
      var _a2;
      const _0x19000e = (_a2 = this["shadowRoot"]) == null ? void 0 : _a2["querySelectorAll"]("cds-accordion-item:not(.accordion-filler)");
      _0x19000e == null ? void 0 : _0x19000e["forEach"]((_0x4986d1, _0x1edaac) => {
        _0x4986d1["open"] = _0x1edaac === 0;
      });
    };
    deferredMeasure(this["_timers"], _0xd93b20);
  }
  ["_openAccordionItem"](_0x228e4c) {
    var _a2;
    const _0x180e7a = (_a2 = this["shadowRoot"]) == null ? void 0 : _a2["querySelectorAll"]("cds-accordion-item:not(.accordion-filler)");
    _0x180e7a == null ? void 0 : _0x180e7a["forEach"]((_0x4ba5fd, _0x243d7d) => {
      _0x4ba5fd["open"] = _0x243d7d === _0x228e4c;
    }), this["_scheduleScrollThumbSync"]();
  }
  ["firstUpdated"]() {
    if (!this["mapElementId"]) return;
    const _0x26cf5c = document["getElementById"](this["mapElementId"]);
    if (!_0x26cf5c) return;
    const _0x9aa991 = () => {
      !this["interactionManager"] && _0x26cf5c["interaction"] && (this["interactionManager"] = _0x26cf5c["interaction"]), !this["layerManager"] && _0x26cf5c["layerManager"] && (this["layerManager"] = _0x26cf5c["layerManager"]);
    };
    whenTucbsMapReady(_0x26cf5c, _0x9aa991);
  }
  ["updated"](_0x2241a5) {
    var _a2, _b, _c, _d;
    _0x2241a5["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_customCssState"], "tucbs-identify-panel");
    if (_0x2241a5["has"]("interactionManager")) {
      const _0x5c9308 = _0x2241a5["get"]("interactionManager");
      if (_0x5c9308) this["_unbind"](_0x5c9308);
      if (this["interactionManager"]) this["_bind"](this["interactionManager"]);
    }
    _0x2241a5["has"]("_tableOpen") && this["_tableOpen"] && ((_a2 = this["_attrPanelEl"]) == null ? void 0 : _a2["style"]["removeProperty"]("left"), (_b = this["_attrPanelEl"]) == null ? void 0 : _b["style"]["removeProperty"]("top"), (_c = this["_attrPanelEl"]) == null ? void 0 : _c["style"]["removeProperty"]("transform")), _0x2241a5["has"]("_tableOpen") && !this["_tableOpen"] && ((_d = this["layerManager"]) == null ? void 0 : _d["clearHighlight"]()), (_0x2241a5["has"]("_tableOpen") || _0x2241a5["has"]("_tableItems")) && (this["_scheduleScrollThumbSync"](), void this["_syncCompactItemBox"](), void this["_syncItemTitleGroupWidth"]()), (_0x2241a5["has"]("_tableOpen") || _0x2241a5["has"]("_tableItems") || _0x2241a5["has"]("_accordionPage")) && this["_resetAccordionOpen"]();
  }
  ["disconnectedCallback"]() {
    if (this["interactionManager"]) this["_unbind"](this["interactionManager"]);
    this["_clearBasicDismiss"](), super["disconnectedCallback"]();
  }
  ["_bind"](_0x24be73) {
    _0x24be73["on"]("map:click", this["_onMapClick"]), _0x24be73["on"]("interaction:suspend", this["_onInteractionSuspend"]), _0x24be73["on"]("entity:click", this["_onEntityClick"]), _0x24be73["on"]("imagery:click", this["_onImageryClick"]), _0x24be73["on"]("imagery:querying", this["_onImageryQuerying"]);
  }
  ["_unbind"](_0x42074e) {
    _0x42074e["off"]("map:click", this["_onMapClick"]), _0x42074e["off"]("interaction:suspend", this["_onInteractionSuspend"]), _0x42074e["off"]("entity:click", this["_onEntityClick"]), _0x42074e["off"]("imagery:click", this["_onImageryClick"]), _0x42074e["off"]("imagery:querying", this["_onImageryQuerying"]);
  }
  ["_scheduleBasicDismiss"]() {
    this["_clearBasicDismiss"](), this["_basicDismissTimer"] = this["_timers"]["setTimeout"](() => {
      this["_basicDismissTimer"] = null, this["_basicOpen"] = ![];
    }, BASIC_DISMISS_MS);
  }
  ["_clearBasicDismiss"]() {
    this["_timers"]["clearTimeout"](this["_basicDismissTimer"]), this["_basicDismissTimer"] = null;
  }
  ["_syncScrollThumbFor"](_0x59f461) {
    const _0x4eb56f = _0x59f461["closest"](".attr-body-wrap, .item-body-wrap"), _0x5b6aa6 = _0x4eb56f == null ? void 0 : _0x4eb56f["querySelector"](".scroll-thumb, .item-scroll-thumb");
    if (_0x5b6aa6) syncVirtualScrollbar(_0x59f461, _0x5b6aa6);
  }
  ["_scheduleScrollThumbSync"]() {
    const _0x47b8d5 = () => {
      var _a2;
      (_a2 = this["shadowRoot"]) == null ? void 0 : _a2["querySelectorAll"](".attr-body, .item-body")["forEach"]((_0x4340d4) => this["_syncScrollThumbFor"](_0x4340d4));
    };
    deferredMeasure(this["_timers"], _0x47b8d5);
  }
  ["_startThumbDrag"](_0x2c8583) {
    const _0x19c4f1 = _0x2c8583["currentTarget"], _0x69490e = _0x19c4f1["closest"](".attr-body-wrap, .item-body-wrap"), _0x368468 = _0x69490e == null ? void 0 : _0x69490e["querySelector"](".attr-body, .item-body");
    if (!_0x368468) return;
    startVirtualScrollbarDrag(_0x2c8583, _0x368468);
  }
  ["close"]() {
    this["_closeBasic"](), this["_closeTable"]();
  }
  ["_closeBasic"]() {
    this["_clearBasicDismiss"](), this["_basicOpen"] = ![];
  }
  ["_closeTable"]() {
    this["_tableOpen"] = ![];
  }
  ["_zoomToItem"](_0x5400f0, _0x292397) {
    var _a2, _b, _c, _d, _e, _f, _g, _h;
    (_a2 = this["layerManager"]) == null ? void 0 : _a2["clearHighlight"]();
    if (_0x5400f0["entity"]) void ((_b = this["layerManager"]) == null ? void 0 : _b["zoomToEntity"](_0x5400f0["entity"], { "duration": ZOOM_FLIGHT_DURATION_SECONDS })), (_c = this["layerManager"]) == null ? void 0 : _c["highlightEntity"](_0x5400f0["entity"]);
    else {
      if (((_d = _0x5400f0["geometryHint"]) == null ? void 0 : _d["kind"]) === "extent") {
        const { west: _0x2e62fa, south: _0x34785f, east: _0x4a18b9, north: _0x33d637 } = _0x5400f0["geometryHint"];
        (_e = this["interactionManager"]) == null ? void 0 : _e["flyToExtent"](_0x2e62fa, _0x34785f, _0x4a18b9, _0x33d637, { "duration": ZOOM_FLIGHT_DURATION_SECONDS });
      } else {
        if (((_f = _0x5400f0["geometryHint"]) == null ? void 0 : _f["kind"]) === "point") {
          const { longitude: _0x46b6e0, latitude: _0x117a2a } = _0x5400f0["geometryHint"];
          (_g = this["interactionManager"]) == null ? void 0 : _g["flyToPosition"](_0x46b6e0, _0x117a2a, { "duration": ZOOM_FLIGHT_DURATION_SECONDS });
        } else (_h = this["interactionManager"]) == null ? void 0 : _h["flyToPosition"](this["_tableLon"], this["_tableLat"], { "duration": ZOOM_FLIGHT_DURATION_SECONDS });
      }
    }
    if (_0x292397 !== void 0) this["_openAccordionItem"](_0x292397);
  }
  ["_renderZoomButton"](_0x3d0806, _0x1af987) {
    const _0x42fd61 = () => this["_zoomToItem"](_0x3d0806, _0x1af987);
    return b`
      <span
        class="zoom-btn"
        role="button"
        tabindex="0"
        title="Yakınlaş"
        aria-label="Yakınlaş"
        @click=${(_0x3c6579) => {
      _0x3c6579["stopPropagation"](), _0x42fd61();
    }}
        @keydown=${(_0xcb7a0c) => {
      if (_0xcb7a0c["key"] !== "Enter" && _0xcb7a0c["key"] !== " ") return;
      _0xcb7a0c["preventDefault"](), _0xcb7a0c["stopPropagation"](), _0x42fd61();
    }}
      >
        ${ICON_ZOOM_IN}
      </span>
    `;
  }
  ["_renderPropertyTable"](_0x35ef27) {
    return _0x35ef27["length"] === 0 ? b`<div class="attr-empty">Öznitelik bilgisi bulunamadı.</div>` : b`
          <cds-table size="sm" use-zebra-styles use-static-width>
            <cds-table-head>
              <cds-table-header-row>
                <cds-table-header-cell>Alan</cds-table-header-cell>
                <cds-table-header-cell>Değer</cds-table-header-cell>
              </cds-table-header-row>
            </cds-table-head>
            <cds-table-body>
              ${_0x35ef27["map"](([_0x2e422d, _0x4c312b]) => b`
                  <cds-table-row>
                    <cds-table-cell>${_0x2e422d}</cds-table-cell>
                    <cds-table-cell>${formatPropertyValue(_0x4c312b)}</cds-table-cell>
                  </cds-table-row>
                `)}
            </cds-table-body>
          </cds-table>
        `;
  }
  ["render"]() {
    const _0x4bc3a9 = this["_tableItems"]["length"] === 1 ? this["_tableItems"][0] : void 0, _0x18ad2e = !_0x4bc3a9 ? A : b`
      <div class="attr-breadcrumb ${_0x4bc3a9 ? "attr-breadcrumb-single" : ""}">
        ${(_0x4bc3a9 == null ? void 0 : _0x4bc3a9["layerType"]) && _0x4bc3a9["layerType"] !== "DRAWING" && _0x4bc3a9["layerType"] !== "MEASURE" ? b`<span class="attr-type-tag">${_0x4bc3a9["layerType"]}</span>` : A}
        ${_0x4bc3a9 ? this["_renderZoomButton"](_0x4bc3a9) : A}
        ${_0x4bc3a9 ? b`<span class="attr-layer-title" title=${_0x4bc3a9["layerTitle"]}>${_0x4bc3a9["layerTitle"]}</span>` : A}
      </div>
    `, _0x2f6d3d = _0x4bc3a9 ? b`
          <div class="attr-body-wrap">
            <div class="attr-body" @scroll=${(_0x561d21) => this["_syncScrollThumbFor"](_0x561d21["currentTarget"])}>
              ${this["_renderPropertyTable"](_0x4bc3a9["propertyEntries"])}
            </div>
            <div class="scroll-thumb" @pointerdown=${(_0x5d4e9e) => this["_startThumbDrag"](_0x5d4e9e)}></div>
          </div>
        ` : b`
          <div class="accordion-wrap">
            <cds-accordion
              size="sm"
              @cds-accordion-item-beingtoggled=${this["_onAccordionItemBeforeToggle"]}
              @cds-accordion-item-toggled=${this["_onAccordionItemToggled"]}
            >
              ${this["_pagedTableItems"]["map"]((_0x5c74ad, _0x5ecbbe) => b`
                  <cds-accordion-item title=${_0x5c74ad["layerTitle"]} ?open=${_0x5ecbbe === 0}>
                    <span slot="title" class="item-title">
                      <span class="item-title-group">
                        <span class="item-title-text">${_0x5c74ad["layerTitle"]}</span>
                        <span class="item-title-suffix">${this["_itemGlobalIndex"](_0x5c74ad)}</span>
                        <span class="item-title-tag-slot">
                          ${_0x5c74ad["layerType"] && _0x5c74ad["layerType"] !== "DRAWING" && _0x5c74ad["layerType"] !== "MEASURE" ? b`<span class="attr-type-tag">${_0x5c74ad["layerType"]}</span>` : A}
                        </span>
                      </span>
                      ${this["_renderZoomButton"](_0x5c74ad, _0x5ecbbe)}
                    </span>
                    <div class="item-body-wrap">
                      <div class="item-body" @scroll=${(_0xe50448) => this["_syncScrollThumbFor"](_0xe50448["currentTarget"])}>
                        ${this["_renderPropertyTable"](_0x5c74ad["propertyEntries"])}
                      </div>
                      <div class="item-scroll-thumb" @pointerdown=${(_0xc292a) => this["_startThumbDrag"](_0xc292a)}></div>
                    </div>
                  </cds-accordion-item>
                `)}
              ${this["_accordionPageCount"] > 1 ? Array["from"]({ "length": IDENTIFY_PAGE_SIZE - this["_pagedTableItems"]["length"] })["map"](() => b`<cds-accordion-item class="accordion-filler" disabled></cds-accordion-item>`) : A}
            </cds-accordion>
            ${this["_accordionPageCount"] > 1 ? b`
                  <div class="accordion-pager">
                    <button
                      type="button"
                      class="pager-btn"
                      aria-label="Önceki sayfa"
                      ?disabled=${this["_accordionPage"] === 0}
                      @click=${() => this["_goToAccordionPage"](this["_accordionPage"] - 1)}
                    >
                      ‹
                    </button>
                    <span class="pager-status">Sayfa ${this["_accordionPage"] + 1} / ${this["_accordionPageCount"]}</span>
                    <button
                      type="button"
                      class="pager-btn"
                      aria-label="Sonraki sayfa"
                      ?disabled=${this["_accordionPage"] >= this["_accordionPageCount"] - 1}
                      @click=${() => this["_goToAccordionPage"](this["_accordionPage"] + 1)}
                    >
                      ›
                    </button>
                  </div>
                ` : A}
          </div>
        `;
    return b`
      <div class="coord-card" ?hidden=${!this["_basicOpen"]}>
        <span class="coord-icon">${ICON_LOCATION}</span>
        <div class="coord-body">
          <span class="coord-title">Koordinat</span>
          <span class="coord-value">${formatLat(this["_basicLat"])}, ${formatLon(this["_basicLon"])}</span>
        </div>
        <button type="button" class="coord-close-btn" aria-label="Kapat" @click=${() => this["_closeBasic"]()}>
          ${ICON_CLOSE$2}
        </button>
      </div>

      <div class="loading-card" ?hidden=${!this["_imageryPending"]}>
        <span class="loading-spinner"></span>
        <span>Sorgulanıyor…</span>
      </div>

      <div
        class=${e2({ "attr-panel": !![], "attr-panel--auto": this["_isCompactPanel"] })}
        ?hidden=${!this["_tableOpen"]}
      >
        <div class="attr-header" @pointerdown=${(_0x4c32af) => this["_drag"]["start"](_0x4c32af)}>
          <div class="attr-header-title-group">
            <span class="attr-header-icon">${ICON_INFORMATION}</span>
            <div class="attr-header-text">
              <span class="attr-title">Konum/Bilgi Al</span>
            </div>
          </div>
          ${_0x4bc3a9 ? A : b`<span class="attr-result-count">${this["_tableItems"]["length"]} sonuç bulundu</span>`}
          <button type="button" class="attr-close-btn" aria-label="Kapat" @click=${() => this["_closeTable"]()}>
            ${ICON_CLOSE$2}
          </button>
        </div>

        ${_0x18ad2e}

        ${_0x2f6d3d}

        <div class="attr-footer">
          <span>Enlem/Boylam</span>
          <span class="attr-footer-value">${formatLat(this["_tableLat"])}, ${formatLon(this["_tableLon"])}</span>
        </div>
      </div>
    `;
  }
};
TucbsIdentifyPanel["styles"] = identifyPanelStyles, __decorateClass$5([n$1({ "attribute": ![] })], TucbsIdentifyPanel["prototype"], "interactionManager", 2), __decorateClass$5([n$1({ "attribute": ![] })], TucbsIdentifyPanel["prototype"], "layerManager", 2), __decorateClass$5([n$1()], TucbsIdentifyPanel["prototype"], "mapElementId", 2), __decorateClass$5([n$1({ "attribute": "custom-css" })], TucbsIdentifyPanel["prototype"], "customCss", 2), __decorateClass$5([r()], TucbsIdentifyPanel["prototype"], "_basicOpen", 2), __decorateClass$5([r()], TucbsIdentifyPanel["prototype"], "_basicLon", 2), __decorateClass$5([r()], TucbsIdentifyPanel["prototype"], "_basicLat", 2), __decorateClass$5([r()], TucbsIdentifyPanel["prototype"], "_imageryPending", 2), __decorateClass$5([r()], TucbsIdentifyPanel["prototype"], "_tableOpen", 2), __decorateClass$5([r()], TucbsIdentifyPanel["prototype"], "_tableItems", 2), __decorateClass$5([r()], TucbsIdentifyPanel["prototype"], "_tableLon", 2), __decorateClass$5([r()], TucbsIdentifyPanel["prototype"], "_tableLat", 2), __decorateClass$5([r()], TucbsIdentifyPanel["prototype"], "_accordionPage", 2), __decorateClass$5([r()], TucbsIdentifyPanel["prototype"], "_tableSource", 2), __decorateClass$5([e$3(".attr-panel")], TucbsIdentifyPanel["prototype"], "_attrPanelEl", 2), TucbsIdentifyPanel = __decorateClass$5([t$3("tucbs-identify-panel")], TucbsIdentifyPanel);
var __defProp$3 = Object["defineProperty"], __getOwnPropDesc$4 = Object["getOwnPropertyDescriptor"], __decorateClass$4 = (_0x4f660f, _0x11e293, _0x34c449, _0x1de8f2) => {
  var _0x293d6a = _0x1de8f2 > 1 ? void 0 : _0x1de8f2 ? __getOwnPropDesc$4(_0x11e293, _0x34c449) : _0x11e293;
  for (var _0x21e35b = _0x4f660f["length"] - 1, _0x5153d8; _0x21e35b >= 0; _0x21e35b--) if (_0x5153d8 = _0x4f660f[_0x21e35b]) _0x293d6a = (_0x1de8f2 ? _0x5153d8(_0x11e293, _0x34c449, _0x293d6a) : _0x5153d8(_0x293d6a)) || _0x293d6a;
  if (_0x1de8f2 && _0x293d6a) __defProp$3(_0x11e293, _0x34c449, _0x293d6a);
  return _0x293d6a;
};
const FORMATS = { "geojson": { "extension": ".geojson", "mime": "application/geo+json", "layerType": "GEOJSON", "label": "GeoJSON" }, "kml": { "extension": ".kml", "mime": "application/vnd.google-earth.kml+xml", "layerType": "KML", "label": "KML" }, "kmz": { "extension": ".kmz", "mime": "application/vnd.google-earth.kmz", "layerType": "KMZ", "label": "KMZ" }, "shp": { "extension": ".zip", "mime": "application/zip", "layerType": "SHP", "label": "SHP(ZIP)" }, "csv": { "extension": ".csv", "mime": "text/csv", "layerType": "CSV", "label": "CSV" } }, ALL_FORMATS = ["geojson", "kml", "kmz", "shp", "csv"], ICON_CLOSE$1 = o$1(iconNodeToString(_16_default$v)), ICON_DOCUMENT_ADD = o$1(iconNodeToString(_16_default$s));
let TucbsFileUpload = class extends i$2 {
  constructor() {
    super(...arguments), this["open"] = ![], this["mapElementId"] = "", this["acceptedTypes"] = "", this["maxFileSizeMb"] = 50, this["dragDrop"] = !![], this["customCss"] = "", this["_error"] = "", this["_uploading"] = ![], this["_customCssState"] = { "sheet": null }, this["_drag"] = new DraggablePanelController(this, { "getPanel": () => this, "ignoreSelector": ".close-btn" });
  }
  ["firstUpdated"]() {
    if (this["layerManager"] || !this["mapElementId"]) return;
    const _0x1ea69f = document["getElementById"](this["mapElementId"]);
    if (!_0x1ea69f) return;
    _0x1ea69f["layerManager"] ? this["layerManager"] = _0x1ea69f["layerManager"] : _0x1ea69f["addEventListener"]("ready", () => {
      if (_0x1ea69f["layerManager"]) this["layerManager"] = _0x1ea69f["layerManager"];
    }, { "once": !![] });
  }
  ["updated"](_0x4212fa) {
    _0x4212fa["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_customCssState"], "tucbs-file-upload"), _0x4212fa["has"]("open") && this["open"] && (this["style"]["removeProperty"]("left"), this["style"]["removeProperty"]("top"), this["style"]["removeProperty"]("transform"));
  }
  ["disconnectedCallback"]() {
    destroyToast(), super["disconnectedCallback"]();
  }
  ["_close"]() {
    this["open"] = ![], this["_error"] = "", this["dispatchEvent"](new CustomEvent("tucbs-file-upload-closed", { "bubbles": !![], "composed": !![] }));
  }
  ["_activeFormats"]() {
    const _0x10f3a1 = this["acceptedTypes"]["split"](",")["map"]((_0x2d5fd7) => _0x2d5fd7["trim"]()["toLowerCase"]())["filter"]((_0x3c1d4d) => ALL_FORMATS["includes"](_0x3c1d4d));
    return _0x10f3a1["length"] > 0 ? _0x10f3a1 : [...ALL_FORMATS];
  }
  ["_detectFormat"](_0x149ec7) {
    const _0x5a251f = _0x149ec7["toLowerCase"]();
    return ALL_FORMATS["find"]((_0x435b1e) => _0x5a251f["endsWith"](FORMATS[_0x435b1e]["extension"]));
  }
  async ["_handleFileAdded"](_0xf058a6) {
    this["_error"] = "", destroyToast();
    const _0x46e784 = _0xf058a6[0];
    if (!_0x46e784) return;
    const _0x1e38ea = this["_activeFormats"](), _0x55c833 = this["_detectFormat"](_0x46e784["name"]);
    if (!_0x55c833 || !_0x1e38ea["includes"](_0x55c833)) {
      const _0x5ea306 = _0x1e38ea["map"]((_0x15c8c3) => FORMATS[_0x15c8c3]["label"])["join"](", ");
      this["_error"] = "Sadece " + _0x5ea306 + " dosyaları desteklenir.";
      return;
    }
    const _0x56604b = this["layerManager"];
    if (!_0x56604b) {
      this["_error"] = "Harita hazır değil, katman eklenemedi.";
      return;
    }
    const { layerType: _0x3aa18c, extension: _0x373736 } = FORMATS[_0x55c833], _0x347c3c = _0x46e784["name"]["replace"](new RegExp("\\" + _0x373736 + "$", "i"), ""), _0x51e8be = "upload-" + _0x347c3c + "-" + Date["now"](), _0x435021 = (_0x1e3e75) => {
      if (_0x1e3e75["id"] !== _0x51e8be) return;
      showToast("info", _0x1e3e75["fromEpsg"] + " → " + _0x1e3e75["toEpsg"] + " (WGS84) dönüştürüldü.");
    }, _0x471acc = (_0x2eb3b8) => {
      if (_0x2eb3b8["id"] !== _0x51e8be) return;
      showToast("warning", "Koordinat sistemi tanınamadı; WGS84 kabul edilerek yüklendi.");
    };
    _0x56604b["on"]("layer:crs-reprojected", _0x435021), _0x56604b["on"]("layer:crs-unresolved", _0x471acc), this["_close"](), this["_uploading"] = !![], beginBusy("Katman yükleniyor…"), await new Promise((_0x5814dc) => setTimeout(_0x5814dc, 200));
    try {
      await _0x56604b["add"](_0x3aa18c, { "id": _0x51e8be, "title": _0x347c3c, "data": _0x46e784, "layerType": _0x3aa18c, "clampToGround": !![] });
    } catch (_0x1f55c3) {
      _0x1f55c3 instanceof TucbsError ? console["error"]("[tucbs-file-upload] " + _0x1f55c3["code"] + " (" + _0x1f55c3["number"] + "): " + _0x1f55c3["message"]) : console["error"](_0x1f55c3), showToast("error", _0x1f55c3 instanceof Error ? _0x1f55c3["message"] : String(_0x1f55c3));
    } finally {
      _0x56604b["off"]("layer:crs-reprojected", _0x435021), _0x56604b["off"]("layer:crs-unresolved", _0x471acc), this["_uploading"] = ![], endBusy();
    }
  }
  ["render"]() {
    if (this["_uploading"]) return b`
        <div class="standalone">
          <span class="upload-spinner"></span>
          <p class="upload-text">Katman yükleniyor…</p>
        </div>
      `;
    if (!this["open"]) return b``;
    const _0x588143 = this["_activeFormats"](), _0x215c1a = _0x588143["map"]((_0x538153) => {
      const { extension: _0xfde56, mime: _0xb38aad } = FORMATS[_0x538153];
      return _0xb38aad ? _0xfde56 + "," + _0xb38aad : _0xfde56;
    })["join"](","), _0xc5fbe7 = _0x588143["map"]((_0x51ec30) => FORMATS[_0x51ec30]["label"])["join"](", ");
    return b`
      <div class="panel">
        <div class="header" @pointerdown=${(_0x15fc5b) => this["_drag"]["start"](_0x15fc5b)}>
          <span class="title"><span class="title-icon">${ICON_DOCUMENT_ADD}</span>Veri Dosyası Ekle</span>
          <button type="button" class="close-btn" aria-label="Kapat" @click=${() => this["_close"]()}>
            ${ICON_CLOSE$1}
          </button>
        </div>

        <div class="body">
          <cds-file-uploader-drop-container
            accept=${_0x215c1a}
            @cds-file-uploader-drop-container-changed=${(_0x108311) => {
      var _a2;
      return this["_handleFileAdded"](((_a2 = _0x108311["detail"]) == null ? void 0 : _a2["addedFiles"]) ?? []);
    }}
          >
            <p class="upload-text">${_0xc5fbe7} dosyasını buraya sürükleyin ya da seçmek için tıklayın</p>
          </cds-file-uploader-drop-container>
          ${this["_error"] ? b`
                <cds-inline-notification
                  kind="error"
                  title="Katman eklenemedi"
                  subtitle=${this["_error"]}
                  @cds-notification-closed=${() => {
      this["_error"] = "";
    }}
                ></cds-inline-notification>
              ` : ""}
        </div>
      </div>
    `;
  }
};
TucbsFileUpload["styles"] = i$5`
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
  `, __decorateClass$4([n$1({ "type": Boolean, "reflect": !![] })], TucbsFileUpload["prototype"], "open", 2), __decorateClass$4([n$1({ "attribute": ![] })], TucbsFileUpload["prototype"], "layerManager", 2), __decorateClass$4([n$1()], TucbsFileUpload["prototype"], "mapElementId", 2), __decorateClass$4([n$1({ "attribute": "accepted-types" })], TucbsFileUpload["prototype"], "acceptedTypes", 2), __decorateClass$4([n$1({ "attribute": "max-file-size-mb", "type": Number })], TucbsFileUpload["prototype"], "maxFileSizeMb", 2), __decorateClass$4([n$1({ "attribute": "drag-drop", "type": Boolean })], TucbsFileUpload["prototype"], "dragDrop", 2), __decorateClass$4([n$1({ "attribute": "custom-css" })], TucbsFileUpload["prototype"], "customCss", 2), __decorateClass$4([r()], TucbsFileUpload["prototype"], "_error", 2), __decorateClass$4([r()], TucbsFileUpload["prototype"], "_uploading", 2), TucbsFileUpload = __decorateClass$4([t$3("tucbs-file-upload")], TucbsFileUpload);
const serviceUploadStyles = i$5`
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
function classifyDiscoveryError(_0x10245f) {
  if (_0x10245f instanceof OgcRequestError) return { "kind": _0x10245f["code"] === "OGC_SERVICE_DISCOVERY_PARSE_FAILED" ? "parse" : "server", "detail": _0x10245f["message"] };
  return { "kind": "network", "detail": _0x10245f instanceof Error ? _0x10245f["message"] : String(_0x10245f) };
}
function discoveryErrorMessage(_0x1a1272) {
  switch (_0x1a1272 == null ? void 0 : _0x1a1272["kind"]) {
    case "network":
      return "Servis adresine ulaşılamadı.\nAdresi kontrol edin veya sunucunun CORS/erişim izinlerini doğrulayın.";
    case "server":
      return "Sunucu bir hata döndürdü.\n" + _0x1a1272["detail"];
    case "parse":
      return "Sunucunun yanıtı geçerli bir XML olarak ayrıştırılamadı.\nAdresin doğru bir GetCapabilities uç noktası olduğundan emin olun.";
    default:
      return "Servis adresinden geçerli bir yanıt alınamadı.\nAdresi ve seçili servis türünü kontrol edin.";
  }
}
const SERVICE_VERSIONS = { "WMS": ["1.3.0", "1.1.1", "1.1.0", "1.0.0"], "WMTS": ["1.0.0"], "WFS": ["2.0.2", "2.0.0", "1.1.3", "1.1.0", "1.0.0"], "WCS": ["2.1.0", "2.0.1", "2.0.0", "1.1.2", "1.1.1", "1.1.0", "1.0.0"] };
function baseServiceUrl(_0x1ef4b5) {
  try {
    const _0x4a56b8 = new URL(_0x1ef4b5);
    return "" + _0x4a56b8["origin"] + _0x4a56b8["pathname"];
  } catch {
    return _0x1ef4b5["split"]("?")[0] ?? _0x1ef4b5;
  }
}
class ServiceDiscoveryController {
  constructor(_0x537ad7, _0x20af1a) {
    this["sink"] = _0x20af1a, this["generation"] = new AsyncGeneration(), _0x537ad7["addController"](this);
  }
  ["hostDisconnected"]() {
    this["invalidate"]();
  }
  ["invalidate"]() {
    this["generation"]["next"]();
  }
  async ["discover"](_0x507caa, _0x23f971) {
    const _0x5472a6 = _0x23f971["trim"]();
    if (!_0x5472a6) {
      this["sink"]["setError"]("Servis adresi giriniz.");
      return;
    }
    const _0x52a6f8 = baseServiceUrl(_0x5472a6);
    this["sink"]["setDiscovering"](!![]), beginBusy("Servis bilgileri getiriliyor…"), this["sink"]["resetDiscovery"]();
    const _0xe40915 = this["generation"]["next"]();
    try {
      const _0x35557d = SERVICE_VERSIONS[_0x507caa] ?? [];
      let _0x30fe81;
      for (const _0x499dba of _0x35557d) {
        let _0xb38a70;
        try {
          _0xb38a70 = buildCapabilitiesUrl(_0x5472a6, _0x507caa, _0x499dba);
        } catch {
          this["sink"]["setError"]("Servis adresi geçerli bir URL değil.");
          return;
        }
        try {
          const _0x339e3e = this["sink"]["layerManager"](), _0x5498a0 = _0x339e3e ? await _0x339e3e["getCapabilitiesDocument"](_0x52a6f8, _0x507caa, _0x499dba) : await getCapabilities(_0xb38a70, void 0);
          if (!this["generation"]["isCurrent"](_0xe40915)) return;
          const _0x18d950 = parseCapabilities(_0x507caa, _0x5498a0);
          if (_0x18d950["length"] > 0) {
            this["sink"]["setItems"](_0x18d950);
            if (_0x507caa === "WMS") this["sink"]["setTiffFormat"](parseWmsTiffFormat(_0x5498a0));
            else {
              if (_0x507caa === "WCS") {
                this["sink"]["setTiffFormat"](parseWcsTiffFormat(_0x5498a0));
                const _0x5614e5 = this["sink"]["layerManager"](), _0x36dd31 = _0x5614e5 ? await _0x5614e5["getWcsCoverageExtents"](_0x52a6f8, _0x18d950["map"]((_0x372ad3) => _0x372ad3["identifier"])) : await fetchWcsCoverageExtents(_0x5472a6, _0x18d950["map"]((_0x4858ec) => _0x4858ec["identifier"]));
                if (!this["generation"]["isCurrent"](_0xe40915)) return;
                _0x36dd31["size"] > 0 && this["sink"]["setItems"](_0x18d950["map"]((_0x5407e2) => {
                  const _0x2fde49 = _0x36dd31["get"](_0x5407e2["identifier"]);
                  return _0x2fde49 ? { ..._0x5407e2, "geographicBoundingBox": _0x2fde49 } : _0x5407e2;
                })), _0x36dd31["size"] < _0x18d950["length"] && showToast("warning", _0x18d950["length"] - _0x36dd31["size"] + "/" + _0x18d950["length"] + " katmanın tam konumu belirlenemedi; bu katmanlar haritada geniş bir alanda görünebilir.");
              }
            }
            return;
          }
          const _0x12393a = detectServiceType(_0x5498a0);
          if (_0x12393a && _0x12393a !== _0x507caa) {
            this["sink"]["setError"]("Bu adres bir " + _0x12393a + ' servisi gibi görünüyor. Servis türünü "' + _0x12393a + '" olarak değiştirip tekrar deneyin.');
            return;
          }
        } catch (_0xff3392) {
          if (!this["generation"]["isCurrent"](_0xe40915)) return;
          _0x30fe81 = classifyDiscoveryError(_0xff3392);
        }
      }
      this["sink"]["setError"](discoveryErrorMessage(_0x30fe81));
    } finally {
      this["sink"]["setDiscovering"](![]), endBusy();
    }
  }
}
var __defProp$2 = Object["defineProperty"], __getOwnPropDesc$3 = Object["getOwnPropertyDescriptor"], __typeError$1 = (_0x4c71e2) => {
  throw TypeError(_0x4c71e2);
}, __decorateClass$3 = (_0x333cea, _0x1b332c, _0x1424e8, _0x361bfe) => {
  var _0x4ab8ff = _0x361bfe > 1 ? void 0 : _0x361bfe ? __getOwnPropDesc$3(_0x1b332c, _0x1424e8) : _0x1b332c;
  for (var _0x572e18 = _0x333cea["length"] - 1, _0x2b3a45; _0x572e18 >= 0; _0x572e18--) if (_0x2b3a45 = _0x333cea[_0x572e18]) _0x4ab8ff = (_0x361bfe ? _0x2b3a45(_0x1b332c, _0x1424e8, _0x4ab8ff) : _0x2b3a45(_0x4ab8ff)) || _0x4ab8ff;
  if (_0x361bfe && _0x4ab8ff) __defProp$2(_0x1b332c, _0x1424e8, _0x4ab8ff);
  return _0x4ab8ff;
}, __accessCheck$1 = (_0x3423af, _0x462ad7, _0x97f76c) => _0x462ad7["has"](_0x3423af) || __typeError$1("Cannot " + _0x97f76c), __privateGet$1 = (_0x268c39, _0x1d89e7, _0x41b1a7) => (__accessCheck$1(_0x268c39, _0x1d89e7, "read from private field"), _0x41b1a7 ? _0x41b1a7["call"](_0x268c39) : _0x1d89e7["get"](_0x268c39)), __privateAdd$1 = (_0xb737d3, _0x4f7755, _0x4af13e) => _0x4f7755["has"](_0xb737d3) ? __typeError$1("Cannot add the same private member more than once") : _0x4f7755 instanceof WeakSet ? _0x4f7755["add"](_0xb737d3) : _0x4f7755["set"](_0xb737d3, _0x4af13e), __privateSet2 = (_0x1f3d57, _0x353f27, _0x8cbb2, _0xe43982) => (__accessCheck$1(_0x1f3d57, _0x353f27, "write to private field"), _0x353f27["set"](_0x1f3d57, _0x8cbb2), _0x8cbb2), _apiKey;
const SERVICE_TYPES = [{ "value": "WMS", "label": "Web Harita Servisi (WMS)" }, { "value": "WMTS", "label": "Web Harita Karo Servisi (WMTS)" }, { "value": "WFS", "label": "Web Özellik Servisi (WFS)" }, { "value": "WCS", "label": "Web Kapsama Servisi (WCS)" }];
function servicePlaceholder(_0x133e30) {
  const _0x2f6b8a = _0x133e30["toLowerCase"]();
  return "Ör: https://.../" + _0x2f6b8a;
}
const ICON_CLOSE = o$1(iconNodeToString(_16_default$v)), ICON_DOWNLOAD = o$1(iconNodeToString(_16_default$p)), ICON_RENEW = o$1(iconNodeToString(_16_default$c)), ICON_VIEW = o$1(iconNodeToString(_16_default$4)), ICON_VIEW_OFF = o$1(iconNodeToString(_16_default$3)), ICON_CLOUD_DOWNLOAD = o$1(iconNodeToString(_16_default$u));
let TucbsServiceUpload = class extends i$2 {
  constructor() {
    super(...arguments), this["open"] = ![], this["mapElementId"] = "", __privateAdd$1(this, _apiKey, ""), this["customCss"] = "", this["_customCssState"] = { "sheet": null }, this["_serviceType"] = "WMS", this["_serviceUrl"] = "", this["_discovering"] = ![], this["_discovery"] = new ServiceDiscoveryController(this, { "layerManager": () => this["layerManager"], "resetDiscovery": () => this["_resetDiscovery"](), "setDiscovering": (_0x3e28da) => {
      this["_discovering"] = _0x3e28da;
    }, "setError": (_0x333cee) => {
      this["_discoveryError"] = _0x333cee;
    }, "setItems": (_0x1e8133) => {
      this["_discoveredItems"] = _0x1e8133;
    }, "setTiffFormat": (_0x366b6c) => {
      this["_discoveredTiffFormat"] = _0x366b6c;
    } }), this["_discoveryError"] = "", this["_discoveredItems"] = [], this["_selectedIdentifiers"] = [], this["_addError"] = "", this["_drag"] = new DraggablePanelController(this, { "getPanel": () => this, "ignoreSelector": ".close-btn, .reset-btn", "onMove": () => this["_syncPreviewPosition"]() }), this["_listScroll"] = new VirtualScrollbar(this, () => this["_discoveredListEl"], () => this["_scrollThumbEl"]), this["_timers"] = new TimerBag(this), this["_onWindowResize"] = () => {
      this["_syncPreviewPosition"](), this["_listScroll"]["sync"]();
    };
  }
  set ["apiKey"](_0x2da900) {
    const _0x9045bf = __privateGet$1(this, _apiKey);
    __privateSet2(this, _apiKey, _0x2da900 ?? ""), this["requestUpdate"]("apiKey", _0x9045bf);
  }
  get ["apiKey"]() {
    return __privateGet$1(this, _apiKey) ? "••••••" : "";
  }
  ["connectedCallback"]() {
    super["connectedCallback"](), window["addEventListener"]("resize", this["_onWindowResize"]);
  }
  ["disconnectedCallback"]() {
    var _a2;
    window["removeEventListener"]("resize", this["_onWindowResize"]), (_a2 = this["_previewEl"]) == null ? void 0 : _a2["remove"](), this["_previewEl"] = void 0, super["disconnectedCallback"]();
  }
  ["_ensurePreviewEl"]() {
    if (!this["_previewEl"]) {
      const _0x4fb901 = document["createElement"]("tucbs-map-preview");
      _0x4fb901["setAttribute"]("basemap", "hgm-temel"), _0x4fb901["apiKey"] = __privateGet$1(this, _apiKey), _0x4fb901["zoomToLayer"] = !![], _0x4fb901["style"]["position"] = "fixed", _0x4fb901["style"]["zIndex"] = "1100", _0x4fb901["style"]["display"] = "none", document["body"]["appendChild"](_0x4fb901), this["_previewEl"] = _0x4fb901;
    }
    return this["_previewEl"];
  }
  ["_syncPreviewPosition"]() {
    if (!this["_previewEl"]) return;
    const _0x531e98 = this["getBoundingClientRect"]();
    this["_previewEl"]["style"]["left"] = _0x531e98["left"] + "px", this["_previewEl"]["style"]["top"] = _0x531e98["top"] - TucbsServiceUpload["PREVIEW_HEIGHT_PX"] + "px", this["_previewEl"]["width"] = _0x531e98["width"] + "px", this["_previewEl"]["height"] = TucbsServiceUpload["PREVIEW_HEIGHT_PX"] + "px";
  }
  ["_updatePreview"]() {
    const _0x527dd4 = this["open"] && this["_discoveredItems"]["length"] > 0;
    if (!_0x527dd4) {
      if (this["_previewEl"]) this["_previewEl"]["style"]["display"] = "none";
      return;
    }
    const _0x99bc9e = this["_ensurePreviewEl"]();
    _0x99bc9e["style"]["display"] = "inline-block", _0x99bc9e["apiKey"] = __privateGet$1(this, _apiKey), _0x99bc9e["layerOptions"] = this["_previewSpec"], this["_syncPreviewPosition"](), this["_timers"]["requestAnimationFrame"](() => this["_syncPreviewPosition"]());
  }
  ["firstUpdated"]() {
    var _a2;
    if (this["layerManager"] || !this["mapElementId"]) return;
    const _0x487c96 = document["getElementById"](this["mapElementId"]);
    if (!_0x487c96) return;
    _0x487c96["layerManager"] ? (this["layerManager"] = _0x487c96["layerManager"], (_a2 = _0x487c96["_grantApiKeyTo"]) == null ? void 0 : _a2.call(_0x487c96, this)) : _0x487c96["addEventListener"]("ready", () => {
      var _a3;
      if (_0x487c96["layerManager"]) this["layerManager"] = _0x487c96["layerManager"];
      (_a3 = _0x487c96["_grantApiKeyTo"]) == null ? void 0 : _a3.call(_0x487c96, this);
    }, { "once": !![] });
  }
  ["updated"](_0x4e1991) {
    _0x4e1991["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_customCssState"], "tucbs-service-upload"), _0x4e1991["has"]("open") && this["open"] && (this["style"]["removeProperty"]("left"), this["style"]["removeProperty"]("top"), this["style"]["removeProperty"]("transform")), this["toggleAttribute"]("data-preview-open", this["_discoveredItems"]["length"] > 0), this["_updatePreview"](), this["_timers"]["requestAnimationFrame"](() => this["_listScroll"]["sync"]());
  }
  ["_close"]() {
    this["open"] = ![], this["_previewIdentifier"] = void 0, this["_previewSpec"] = void 0, this["dispatchEvent"](new CustomEvent("tucbs-service-upload-closed", { "bubbles": !![], "composed": !![] }));
  }
  ["_resetDiscovery"]() {
    this["_discovery"]["invalidate"](), this["_discoveryError"] = "", this["_discoveredItems"] = [], this["_discoveredTiffFormat"] = void 0, this["_selectedIdentifiers"] = [], this["_addError"] = "", this["_previewIdentifier"] = void 0, this["_previewSpec"] = void 0;
  }
  ["_toggleSelected"](_0x3743fa, _0x128fa3) {
    this["_selectedIdentifiers"] = _0x128fa3 ? [...this["_selectedIdentifiers"], _0x3743fa] : this["_selectedIdentifiers"]["filter"]((_0xa79f11) => _0xa79f11 !== _0x3743fa), this["_addError"] = "";
  }
  ["_togglePreview"](_0x34c44d) {
    this["_previewIdentifier"] === _0x34c44d["identifier"] ? (this["_previewIdentifier"] = void 0, this["_previewSpec"] = void 0) : (this["_previewIdentifier"] = _0x34c44d["identifier"], this["_previewSpec"] = this["_previewSpecFor"](_0x34c44d)), this["_updatePreview"]();
  }
  ["_previewSpecFor"](_0x4210f7) {
    if (this["_serviceType"] === "WMTS" && !_0x4210f7["tileMatrixSetID"]) return void 0;
    const _0x565c37 = baseServiceUrl(this["_serviceUrl"]["trim"]()), _0x8678ad = "service-upload-preview-" + _0x4210f7["identifier"];
    switch (this["_serviceType"]) {
      case "WMS":
        return { "layerType": "WMS", "options": { "id": _0x8678ad, "title": _0x4210f7["title"], "url": _0x565c37, "layers": _0x4210f7["identifier"] } };
      case "WMTS":
        return { "layerType": "WMTS", "options": { "id": _0x8678ad, "title": _0x4210f7["title"], "url": _0x565c37, "layer": _0x4210f7["identifier"], "tileMatrixSetID": _0x4210f7["tileMatrixSetID"] } };
      case "WFS":
        return { "layerType": "WFS", "options": { "id": _0x8678ad, "title": _0x4210f7["title"], "url": _0x565c37, "typeName": _0x4210f7["identifier"] } };
      case "WCS": {
        const _0x29114d = wcsRectangleFor(_0x4210f7);
        return { "layerType": "WCS", "options": { "id": _0x8678ad, "title": _0x4210f7["title"], "url": _0x565c37, "coverageId": _0x4210f7["identifier"], ..._0x29114d && { "rectangle": _0x29114d } } };
      }
      default:
        return void 0;
    }
  }
  ["_resetFields"]() {
    this["_serviceType"] = "WMS", this["_serviceUrl"] = "", this["_resetDiscovery"]();
  }
  ["_selectServiceType"](_0x49dfaa) {
    this["_serviceType"] = _0x49dfaa, this["_serviceUrl"] = "", this["_resetDiscovery"]();
  }
  ["_setServiceUrl"](_0xa6ec7) {
    this["_serviceUrl"] = _0xa6ec7, this["_resetDiscovery"]();
  }
  async ["_addOneLayer"](_0x290421) {
    if (this["_serviceType"] === "WMTS" && !_0x290421["tileMatrixSetID"]) throw new LayerOperationError("LAYER_WMTS_TILEMATRIXSET_MISSING", "Bu katman için TileMatrixSet bilgisi bulunamadı.");
    const _0x481b3b = baseServiceUrl(this["_serviceUrl"]["trim"]()), _0xc29b2e = "service-" + _0x290421["identifier"] + "-" + Date["now"](), _0x418bac = this["layerManager"];
    switch (this["_serviceType"]) {
      case "WMS": {
        const _0x320a36 = { "id": _0xc29b2e, "title": _0x290421["title"], "url": _0x481b3b, "layers": _0x290421["identifier"], ...this["_discoveredTiffFormat"] && { "tiffFormat": this["_discoveredTiffFormat"], "geographicBoundingBox": _0x290421["geographicBoundingBox"] } };
        await _0x418bac["add"]("WMS", _0x320a36);
        break;
      }
      case "WMTS":
        await _0x418bac["add"]("WMTS", { "id": _0xc29b2e, "title": _0x290421["title"], "url": _0x481b3b, "layer": _0x290421["identifier"], "tileMatrixSetID": _0x290421["tileMatrixSetID"] });
        break;
      case "WFS": {
        const _0x4e3e67 = (_0x9bb34) => {
          if (_0x9bb34["id"] !== _0xc29b2e) return;
          showToast("warning", _0x9bb34["totalCount"] + " özellikten sadece " + _0x9bb34["loadedCount"] + " tanesi yüklendi; tamamı için filtre uygulayın.");
        };
        _0x418bac["on"]("layer:features-truncated", _0x4e3e67);
        try {
          await _0x418bac["add"]("WFS", { "id": _0xc29b2e, "title": _0x290421["title"], "url": _0x481b3b, "typeName": _0x290421["identifier"] });
        } finally {
          _0x418bac["off"]("layer:features-truncated", _0x4e3e67);
        }
        break;
      }
      case "WCS": {
        const _0xb02c50 = wcsRectangleFor(_0x290421), _0x3c7472 = { "id": _0xc29b2e, "title": _0x290421["title"], "url": _0x481b3b, "coverageId": _0x290421["identifier"], ..._0xb02c50 && { "rectangle": _0xb02c50 }, ...this["_discoveredTiffFormat"] && { "tiffFormat": this["_discoveredTiffFormat"] } };
        await _0x418bac["add"]("WCS", _0x3c7472);
        break;
      }
    }
  }
  async ["_addSelectedLayers"]() {
    if (!this["layerManager"]) {
      this["_addError"] = "Harita hazır değil, katman eklenemedi.";
      return;
    }
    const _0x103e9a = this["_discoveredItems"]["filter"]((_0x5ca710) => this["_selectedIdentifiers"]["includes"](_0x5ca710["identifier"]));
    if (_0x103e9a["length"] === 0) return;
    beginBusy("Katmanlar ekleniyor…"), this["_addError"] = "";
    const _0x152b9f = [];
    for (const _0x1d4a91 of _0x103e9a) {
      try {
        await this["_addOneLayer"](_0x1d4a91);
      } catch (_0x5bf35a) {
        _0x5bf35a instanceof TucbsError ? console["error"]("[tucbs-service-upload] " + _0x5bf35a["code"] + " (" + _0x5bf35a["number"] + "): " + _0x5bf35a["message"]) : console["error"](_0x5bf35a), _0x152b9f["push"]({ "label": _0x1d4a91["title"] || _0x1d4a91["identifier"], "message": _0x5bf35a instanceof Error ? _0x5bf35a["message"] : String(_0x5bf35a) });
      }
    }
    const _0x3a07df = _0x152b9f["map"]((_0x3d0df7) => _0x3d0df7["label"]);
    this["_selectedIdentifiers"] = _0x152b9f["length"] === 0 ? [] : _0x103e9a["filter"]((_0x150d34) => _0x3a07df["includes"](_0x150d34["title"] || _0x150d34["identifier"]))["map"]((_0x585f0b) => _0x585f0b["identifier"]), endBusy();
    if (_0x152b9f["length"] === 0) this["_close"]();
    else _0x152b9f["length"] === 1 ? this["_addError"] = '"' + _0x152b9f[0]["label"] + '" eklenemedi: ' + _0x152b9f[0]["message"] : this["_addError"] = _0x152b9f["length"] + "/" + _0x103e9a["length"] + " katman eklenemedi:\n" + _0x152b9f["map"]((_0x3c39aa) => "• " + _0x3c39aa["label"] + ": " + _0x3c39aa["message"])["join"]("\n");
  }
  ["_addButtonLabel"]() {
    if (this["_selectedIdentifiers"]["length"] > 1) return "Haritaya Ekle (" + this["_selectedIdentifiers"]["length"] + ")";
    return "Haritaya Ekle";
  }
  ["render"]() {
    if (!this["open"]) return b``;
    const _0x2246e3 = this["_discoveredItems"]["length"] > 0;
    return b`
      <div class="panel${_0x2246e3 ? " with-layers" : ""}">
        <div
            class="header"
            @pointerdown=${(_0x4c22ef) => this["_drag"]["start"](_0x4c22ef)}
          >
            <span class="title"><span class="title-icon">${ICON_CLOUD_DOWNLOAD}</span>Coğrafi Veri Servisi Ekle</span>
            <div class="header-actions">
              <button
                type="button"
                class="reset-btn"
                @click=${() => this["_resetFields"]()}
              >
                ${ICON_RENEW} Sıfırla
              </button>
              <button
                type="button"
                class="close-btn"
                aria-label="Kapat"
                @click=${() => this["_close"]()}
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
                .value=${this["_serviceType"]}
                @cds-dropdown-selected=${(_0x2a9b62) => {
      this["_selectServiceType"](_0x2a9b62["detail"]["item"]["value"]);
    }}
              >
                ${SERVICE_TYPES["map"]((_0x48a9b2) => b`<cds-dropdown-item value=${_0x48a9b2["value"]}
                      >${_0x48a9b2["label"]}</cds-dropdown-item
                    >`)}
              </cds-dropdown>

              <div class="url-row">
                <cds-text-input
                  label="Servis Adresi giriniz"
                  placeholder=${servicePlaceholder(this["_serviceType"])}
                  .value=${this["_serviceUrl"]}
                  @input=${(_0x42f57a) => {
      this["_setServiceUrl"](_0x42f57a["target"]["value"]);
    }}
                ></cds-text-input>

                <button
                  type="button"
                  class="fetch-btn"
                  title="Servis bilgilerini getir"
                  aria-label="Servis bilgilerini getir"
                  ?disabled=${this["_discovering"]}
                  @click=${() => this["_discovery"]["discover"](this["_serviceType"], this["_serviceUrl"])}
                >
                  ${ICON_DOWNLOAD}
                </button>
              </div>

              ${this["_discoveryError"] ? b`<div class="error-text">${this["_discoveryError"]}</div>` : ""}
            </div>

            ${_0x2246e3 ? b`
                  <div class="katmanlar-column">
                    <span class="section-label">Katmanlar</span>
                    <div class="discovered-list-wrap">
                      <div
                        class="discovered-list"
                        role="group"
                        aria-label="Katmanlar"
                        @scroll=${() => this["_listScroll"]["sync"]()}
                      >
                        ${this["_discoveredItems"]["map"]((_0x34a7e9) => {
      const _0x13482d = this["_previewIdentifier"] === _0x34a7e9["identifier"], _0x4734ac = _0x13482d ? "Önizlemeyi kapat" : "Haritada önizle";
      return b`
                            <div class="discovered-row">
                              <cds-checkbox
                                title=${_0x34a7e9["title"]}
                                .checked=${this["_selectedIdentifiers"]["includes"](_0x34a7e9["identifier"])}
                                @cds-checkbox-changed=${(_0x3d7fa1) => {
        var _a2;
        this["_toggleSelected"](_0x34a7e9["identifier"], !!((_a2 = _0x3d7fa1["detail"]) == null ? void 0 : _a2["checked"]));
      }}
                              >
                                ${_0x34a7e9["title"]}
                              </cds-checkbox>
                              <button
                                type="button"
                                class="preview-toggle-btn"
                                aria-pressed=${_0x13482d}
                                title=${_0x4734ac}
                                aria-label=${_0x4734ac}
                                @click=${() => this["_togglePreview"](_0x34a7e9)}
                              >
                                ${_0x13482d ? ICON_VIEW : ICON_VIEW_OFF}
                              </button>
                            </div>
                          `;
    })}
                      </div>
                      <div
                        class="scroll-thumb"
                        @pointerdown=${(_0x271ce3) => this["_listScroll"]["startDrag"](_0x271ce3)}
                      ></div>
                    </div>

                    ${this["_addError"] ? b`<div class="error-text">${this["_addError"]}</div>` : ""}

                    <button
                      type="button"
                      class="add-layer-btn"
                      ?disabled=${this["_selectedIdentifiers"]["length"] === 0}
                      @click=${() => this["_addSelectedLayers"]()}
                    >
                      ${this["_addButtonLabel"]()}
                    </button>
                  </div>
                ` : ""}
          </div>
      </div>
    `;
  }
};
_apiKey = /* @__PURE__ */ new WeakMap(), TucbsServiceUpload["styles"] = serviceUploadStyles, TucbsServiceUpload["PREVIEW_HEIGHT_PX"] = 300, __decorateClass$3([n$1({ "type": Boolean, "reflect": !![] })], TucbsServiceUpload["prototype"], "open", 2), __decorateClass$3([n$1({ "attribute": ![] })], TucbsServiceUpload["prototype"], "layerManager", 2), __decorateClass$3([n$1()], TucbsServiceUpload["prototype"], "mapElementId", 2), __decorateClass$3([n$1({ "attribute": "api-key" })], TucbsServiceUpload["prototype"], "apiKey", 1), __decorateClass$3([n$1({ "attribute": "custom-css" })], TucbsServiceUpload["prototype"], "customCss", 2), __decorateClass$3([r()], TucbsServiceUpload["prototype"], "_serviceType", 2), __decorateClass$3([r()], TucbsServiceUpload["prototype"], "_serviceUrl", 2), __decorateClass$3([r()], TucbsServiceUpload["prototype"], "_discovering", 2), __decorateClass$3([r()], TucbsServiceUpload["prototype"], "_discoveryError", 2), __decorateClass$3([r()], TucbsServiceUpload["prototype"], "_discoveredItems", 2), __decorateClass$3([r()], TucbsServiceUpload["prototype"], "_discoveredTiffFormat", 2), __decorateClass$3([r()], TucbsServiceUpload["prototype"], "_selectedIdentifiers", 2), __decorateClass$3([r()], TucbsServiceUpload["prototype"], "_addError", 2), __decorateClass$3([r()], TucbsServiceUpload["prototype"], "_previewIdentifier", 2), __decorateClass$3([e$3(".discovered-list")], TucbsServiceUpload["prototype"], "_discoveredListEl", 2), __decorateClass$3([e$3(".scroll-thumb")], TucbsServiceUpload["prototype"], "_scrollThumbEl", 2), TucbsServiceUpload = __decorateClass$3([t$3("tucbs-service-upload")], TucbsServiceUpload);
var __getOwnPropDesc$2 = Object["getOwnPropertyDescriptor"], __decorateClass$2 = (_0x3402d5, _0x3db119, _0x62c7ac, _0x220b72) => {
  var _0xf7059d = _0x220b72 > 1 ? void 0 : _0x220b72 ? __getOwnPropDesc$2(_0x3db119, _0x62c7ac) : _0x3db119;
  for (var _0x4a5ecf = _0x3402d5["length"] - 1, _0x4c5c99; _0x4a5ecf >= 0; _0x4a5ecf--) if (_0x4c5c99 = _0x3402d5[_0x4a5ecf]) _0xf7059d = _0x4c5c99(_0xf7059d) || _0xf7059d;
  return _0xf7059d;
};
let TucbsLayerExport = class extends i$2 {
  ["exportLayer"](_0x59065e, _0x359992, _0x1c5374) {
    _0x59065e["exportLayerGeoJSON"](_0x359992, _0x1c5374);
  }
  ["exportLayerKml"](_0x143b98, _0x36e623, _0x41ecd8) {
    _0x143b98["exportLayerKml"](_0x36e623, _0x41ecd8);
  }
  ["exportLayerShapefile"](_0x13ff09, _0x4962f9, _0x3f9b10) {
    _0x13ff09["exportLayerShapefile"](_0x4962f9, _0x3f9b10);
  }
  ["exportLayerAsGeoTiff"](_0x1a1096, _0x341000, _0x881b41) {
    return _0x1a1096["exportLayerAsGeoTiff"](_0x341000, _0x881b41);
  }
};
TucbsLayerExport = __decorateClass$2([t$3("tucbs-layer-export")], TucbsLayerExport);
var __defProp$1 = Object["defineProperty"], __getOwnPropDesc$1 = Object["getOwnPropertyDescriptor"], __decorateClass$1 = (_0x46a5c9, _0x249492, _0x1ee2a6, _0x4df96e) => {
  var _0x25471f = _0x4df96e > 1 ? void 0 : _0x4df96e ? __getOwnPropDesc$1(_0x249492, _0x1ee2a6) : _0x249492;
  for (var _0xdb7140 = _0x46a5c9["length"] - 1, _0x1e3242; _0xdb7140 >= 0; _0xdb7140--) if (_0x1e3242 = _0x46a5c9[_0xdb7140]) _0x25471f = (_0x4df96e ? _0x1e3242(_0x249492, _0x1ee2a6, _0x25471f) : _0x1e3242(_0x25471f)) || _0x25471f;
  if (_0x4df96e && _0x25471f) __defProp$1(_0x249492, _0x1ee2a6, _0x25471f);
  return _0x25471f;
};
let TucbsBusyOverlay = class extends i$2 {
  constructor() {
    super(...arguments), this["active"] = ![], this["_message"] = "İşlem sürüyor…", this["_shownAt"] = 0, this["_timers"] = new TimerBag(this), this["_onBusyChanged"] = (_0x1209b2) => {
      const _0x169e01 = _0x1209b2["detail"];
      if (_0x169e01["busy"] && _0x169e01["message"]) this["_message"] = _0x169e01["message"];
      if (_0x169e01["busy"]) {
        this["_timers"]["clearTimeout"](this["_hideTimer"] ?? null), this["_hideTimer"] = void 0;
        !this["active"] && this["_showTimer"] === void 0 && (this["_showTimer"] = this["_timers"]["setTimeout"](() => {
          this["_showTimer"] = void 0, this["active"] = !![], this["_shownAt"] = Date["now"]();
        }, TucbsBusyOverlay["SHOW_DELAY_MS"]));
        return;
      }
      if (this["_showTimer"] !== void 0) {
        this["_timers"]["clearTimeout"](this["_showTimer"]), this["_showTimer"] = void 0;
        return;
      }
      if (!this["active"]) return;
      const _0x4d2749 = TucbsBusyOverlay["MIN_VISIBLE_MS"] - (Date["now"]() - this["_shownAt"]);
      if (_0x4d2749 <= 0) {
        this["active"] = ![];
        return;
      }
      this["_hideTimer"] = this["_timers"]["setTimeout"](() => {
        this["_hideTimer"] = void 0, this["active"] = ![];
      }, _0x4d2749);
    };
  }
  ["connectedCallback"]() {
    super["connectedCallback"](), document["addEventListener"]("tucbs-busy-changed", this["_onBusyChanged"]);
  }
  ["disconnectedCallback"]() {
    document["removeEventListener"]("tucbs-busy-changed", this["_onBusyChanged"]), this["_showTimer"] = void 0, this["_hideTimer"] = void 0, super["disconnectedCallback"]();
  }
  ["render"]() {
    if (!this["active"]) return b``;
    return b`
      <div class="panel" role="alert" aria-live="assertive">
        <span class="spinner"></span>
        <span>${this["_message"]}</span>
      </div>
    `;
  }
};
TucbsBusyOverlay["styles"] = i$5`
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
  `, TucbsBusyOverlay["SHOW_DELAY_MS"] = 150, TucbsBusyOverlay["MIN_VISIBLE_MS"] = 300, __decorateClass$1([n$1({ "type": Boolean, "reflect": !![] })], TucbsBusyOverlay["prototype"], "active", 2), __decorateClass$1([r()], TucbsBusyOverlay["prototype"], "_message", 2), TucbsBusyOverlay = __decorateClass$1([t$3("tucbs-busy-overlay")], TucbsBusyOverlay);
var __defProp = Object["defineProperty"], __getOwnPropDesc = Object["getOwnPropertyDescriptor"], __typeError2 = (_0x35b1c1) => {
  throw TypeError(_0x35b1c1);
}, __decorateClass = (_0x41ef7d, _0x53cee1, _0x602a82, _0x434104) => {
  var _0xb7f2ea = _0x434104 > 1 ? void 0 : _0x434104 ? __getOwnPropDesc(_0x53cee1, _0x602a82) : _0x53cee1;
  for (var _0x65dcbd = _0x41ef7d["length"] - 1, _0x5a4d80; _0x65dcbd >= 0; _0x65dcbd--) if (_0x5a4d80 = _0x41ef7d[_0x65dcbd]) _0xb7f2ea = (_0x434104 ? _0x5a4d80(_0x53cee1, _0x602a82, _0xb7f2ea) : _0x5a4d80(_0xb7f2ea)) || _0xb7f2ea;
  if (_0x434104 && _0xb7f2ea) __defProp(_0x53cee1, _0x602a82, _0xb7f2ea);
  return _0xb7f2ea;
}, __accessCheck2 = (_0x5bc2b5, _0x32ead6, _0x9e61c3) => _0x32ead6["has"](_0x5bc2b5) || __typeError2("Cannot " + _0x9e61c3), __privateGet2 = (_0x161225, _0x4ba5bd, _0x1bf575) => (__accessCheck2(_0x161225, _0x4ba5bd, "read from private field"), _0x1bf575 ? _0x1bf575["call"](_0x161225) : _0x4ba5bd["get"](_0x161225)), __privateAdd2 = (_0x57e3b6, _0x1d6d6d, _0x108adf) => _0x1d6d6d["has"](_0x57e3b6) ? __typeError2("Cannot add the same private member more than once") : _0x1d6d6d instanceof WeakSet ? _0x1d6d6d["add"](_0x57e3b6) : _0x1d6d6d["set"](_0x57e3b6, _0x108adf), _apiKeyState;
const TOOLBAR_TOOLS = "zoom,goto-coordinate,draw,measure,analysis,delete,settings,print", TOOLBAR_TOOL_PROPS = { "draw": { "tools": "point,polyline,polygon,rectangle,circle,freehand" } };
let TucbsApp = class extends i$2 {
  constructor() {
    super(...arguments), __privateAdd2(this, _apiKeyState, new WriteOnlyApiKey(this)), this["basemap"] = "hgm-temel", this["mode"] = "3D", this["quality"] = 70, this["showLayerList"] = !![], this["showToolbar"] = !![], this["showInfoBar"] = !![], this["_map"] = null, this["_onMapReady"] = (_0x1fba33) => {
      _0x1fba33["stopPropagation"]();
      const { map: _0x1b19db } = _0x1fba33["detail"];
      this["_map"] = _0x1b19db, this["dispatchEvent"](new CustomEvent("ready", { "detail": { "map": _0x1b19db }, "bubbles": !![], "composed": !![] }));
    }, this["_onMapError"] = (_0x1bddda) => {
      _0x1bddda["stopPropagation"]();
      const _0x4f51fe = _0x1bddda["detail"];
      this["dispatchEvent"](new CustomEvent("error", { "detail": _0x4f51fe, "bubbles": !![], "composed": !![] }));
    };
  }
  set ["apiKey"](_0x3e761f) {
    __privateGet2(this, _apiKeyState)["write"](_0x3e761f);
  }
  get ["apiKey"]() {
    return __privateGet2(this, _apiKeyState)["masked"];
  }
  ["createRenderRoot"]() {
    return this;
  }
  ["updated"](_0x15f69f) {
    if (!this["_map"]) return;
    if (_0x15f69f["has"]("basemap")) this["_map"]["setBasemap"](this["basemap"]);
    if (_0x15f69f["has"]("mode")) this["_map"]["setMode"](this["mode"]);
    if (_0x15f69f["has"]("quality")) this["_map"]["setQuality"](this["quality"]);
  }
  ["render"]() {
    var _a2, _b, _c, _d;
    return b`
      <style>
        tucbs-app {
          display: block;
          width: 100%;
          height: 100%;
        }
      </style>

      ${this["showLayerList"] ? b`<tucbs-layer-list
            .layerManager=${(_a2 = this["_map"]) == null ? void 0 : _a2["layerManager"]}
            .map=${this["_map"] ?? void 0}
            .apiKey=${__privateGet2(this, _apiKeyState)["real"]}
          ></tucbs-layer-list>` : A}

      <tucbs-map
        .apiKey=${__privateGet2(this, _apiKeyState)["real"]}
        .basemap=${this["basemap"]}
        .mode=${this["mode"]}
        .quality=${this["quality"]}
        @ready=${this["_onMapReady"]}
        @error=${this["_onMapError"]}
      ></tucbs-map>

      ${this["showToolbar"] ? b`<tucbs-toolbar
            .map=${this["_map"] ?? void 0}
            tools=${TOOLBAR_TOOLS}
            .toolProps=${TOOLBAR_TOOL_PROPS}
          ></tucbs-toolbar>` : A}

      <tucbs-identify-panel
        .interactionManager=${(_b = this["_map"]) == null ? void 0 : _b["interactionManager"]}
        .layerManager=${(_c = this["_map"]) == null ? void 0 : _c["layerManager"]}
      ></tucbs-identify-panel>

      ${this["showInfoBar"] ? b`<tucbs-info-bar .interactionManager=${(_d = this["_map"]) == null ? void 0 : _d["interactionManager"]}></tucbs-info-bar>` : A}

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
_apiKeyState = /* @__PURE__ */ new WeakMap(), __decorateClass([n$1({ "attribute": "api-key" })], TucbsApp["prototype"], "apiKey", 1), __decorateClass([n$1()], TucbsApp["prototype"], "basemap", 2), __decorateClass([n$1()], TucbsApp["prototype"], "mode", 2), __decorateClass([n$1({ "type": Number })], TucbsApp["prototype"], "quality", 2), __decorateClass([n$1({ "attribute": "show-layer-list", "type": Boolean })], TucbsApp["prototype"], "showLayerList", 2), __decorateClass([n$1({ "attribute": "show-toolbar", "type": Boolean })], TucbsApp["prototype"], "showToolbar", 2), __decorateClass([n$1({ "attribute": "show-info-bar", "type": Boolean })], TucbsApp["prototype"], "showInfoBar", 2), __decorateClass([r()], TucbsApp["prototype"], "_map", 2), TucbsApp = __decorateClass([t$3("tucbs-app")], TucbsApp);
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
