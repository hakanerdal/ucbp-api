var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var _a, _value;
import { ensureEffectiveApiKeyValid, getUcbpApiBase, TucbsError, Map as _0x46f0d4, HGM_BASEMAP_IDS, DEFAULT_INITIAL_EXTENT, registerApiKeyRefresh, ApiKeyValidationError, LayerOperationError, MEASURE_LAYER_ID, entityToGeoJSON, featureLabel, measureGround, snapScaleForDisplay, OgcRequestError, buildCapabilitiesUrl, getCapabilities, parseCapabilities, parseWmsTiffFormat, parseWcsTiffFormat, fetchWcsCoverageExtents, detectServiceType, wcsRectangleFor } from "@tucbs/core";
import { Math as _0x2d6059, Color, Cartesian3, VerticalOrigin, HeightReference, Cartesian2, LabelStyle, CallbackProperty, CallbackPositionProperty, ConstantProperty, PolygonHierarchy, HorizontalOrigin, ScreenSpaceEventHandler, ScreenSpaceEventType, Cartographic } from "cesium";
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
  constructor(_0x37bbb8, _0x370563, _0x5b9c8a) {
    if (this["_$cssResult$"] = !![], _0x5b9c8a !== s$4) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this["cssText"] = _0x37bbb8, this["t"] = _0x370563;
  }
  get ["styleSheet"]() {
    let _0x3018dd = this["o"];
    const _0x35c4c8 = this["t"];
    if (e$7 && void 0 === _0x3018dd) {
      const _0x145d01 = void 0 !== _0x35c4c8 && 1 === _0x35c4c8["length"];
      _0x145d01 && (_0x3018dd = o$6["get"](_0x35c4c8)), void 0 === _0x3018dd && ((this["o"] = _0x3018dd = new CSSStyleSheet())["replaceSync"](this["cssText"]), _0x145d01 && o$6["set"](_0x35c4c8, _0x3018dd));
    }
    return _0x3018dd;
  }
  ["toString"]() {
    return this["cssText"];
  }
};
const r$4 = (_0x409bd8) => new n$4("string" == typeof _0x409bd8 ? _0x409bd8 : _0x409bd8 + "", void 0, s$4), i$5 = (_0x2411fb, ..._0x744caa) => {
  const _0x10c16e = 1 === _0x2411fb["length"] ? _0x2411fb[0] : _0x744caa["reduce"]((_0x55a991, _0x16a2e6, _0x33c210) => _0x55a991 + ((_0x580cae) => {
    if (!![] === _0x580cae["_$cssResult$"]) return _0x580cae["cssText"];
    if ("number" == typeof _0x580cae) return _0x580cae;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + _0x580cae + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(_0x16a2e6) + _0x2411fb[_0x33c210 + 1], _0x2411fb[0]);
  return new n$4(_0x10c16e, _0x2411fb, s$4);
}, S$1 = (_0x43f020, _0x3433b8) => {
  if (e$7) _0x43f020["adoptedStyleSheets"] = _0x3433b8["map"]((_0x5bf22b) => _0x5bf22b instanceof CSSStyleSheet ? _0x5bf22b : _0x5bf22b["styleSheet"]);
  else for (const _0x619bda of _0x3433b8) {
    const _0x323189 = document["createElement"]("style"), _0x21c64e = t$5["litNonce"];
    void 0 !== _0x21c64e && _0x323189["setAttribute"]("nonce", _0x21c64e), _0x323189["textContent"] = _0x619bda["cssText"], _0x43f020["appendChild"](_0x323189);
  }
}, c$3 = e$7 ? (_0x2e14f4) => _0x2e14f4 : (_0x1f127a) => _0x1f127a instanceof CSSStyleSheet ? ((_0x38ca15) => {
  let _0x50cc5c = "";
  for (const _0x5c57d2 of _0x38ca15["cssRules"]) _0x50cc5c += _0x5c57d2["cssText"];
  return r$4(_0x50cc5c);
})(_0x1f127a) : _0x1f127a, { is: i$4, defineProperty: e$6, getOwnPropertyDescriptor: h$2, getOwnPropertyNames: r$3, getOwnPropertySymbols: o$5, getPrototypeOf: n$3 } = Object, a$2 = globalThis, c$2 = a$2["trustedTypes"], l$2 = c$2 ? c$2["emptyScript"] : "", p$2 = a$2["reactiveElementPolyfillSupport"], d$1 = (_0x1cf8cc, _0x41ed25) => _0x1cf8cc, u$4 = { "toAttribute"(_0x5f0129, _0x598343) {
  switch (_0x598343) {
    case Boolean:
      _0x5f0129 = _0x5f0129 ? l$2 : null;
      break;
    case Object:
    case Array:
      _0x5f0129 = null == _0x5f0129 ? _0x5f0129 : JSON["stringify"](_0x5f0129);
  }
  return _0x5f0129;
}, "fromAttribute"(_0x3732b9, _0x1d0c24) {
  let _0x221cd4 = _0x3732b9;
  switch (_0x1d0c24) {
    case Boolean:
      _0x221cd4 = null !== _0x3732b9;
      break;
    case Number:
      _0x221cd4 = null === _0x3732b9 ? null : Number(_0x3732b9);
      break;
    case Object:
    case Array:
      try {
        _0x221cd4 = JSON["parse"](_0x3732b9);
      } catch (_0x25196f) {
        _0x221cd4 = null;
      }
  }
  return _0x221cd4;
} }, f$1 = (_0x38e167, _0x292b41) => !i$4(_0x38e167, _0x292b41), b$1 = { "attribute": !![], "type": String, "converter": u$4, "reflect": ![], "useDefault": ![], "hasChanged": f$1 };
Symbol["metadata"] ?? (Symbol["metadata"] = Symbol("metadata")), a$2["litPropertyMetadata"] ?? (a$2["litPropertyMetadata"] = /* @__PURE__ */ new WeakMap());
let y$1 = class y extends HTMLElement {
  static ["addInitializer"](_0x18c305) {
    this["_$Ei"](), (this["l"] ?? (this["l"] = []))["push"](_0x18c305);
  }
  static get ["observedAttributes"]() {
    return this["finalize"](), this["_$Eh"] && [...this["_$Eh"]["keys"]()];
  }
  static ["createProperty"](_0x206b57, _0x4f97b5 = b$1) {
    if (_0x4f97b5["state"] && (_0x4f97b5["attribute"] = ![]), this["_$Ei"](), this["prototype"]["hasOwnProperty"](_0x206b57) && ((_0x4f97b5 = Object["create"](_0x4f97b5))["wrapped"] = !![]), this["elementProperties"]["set"](_0x206b57, _0x4f97b5), !_0x4f97b5["noAccessor"]) {
      const _0x4afb92 = Symbol(), _0x449854 = this["getPropertyDescriptor"](_0x206b57, _0x4afb92, _0x4f97b5);
      void 0 !== _0x449854 && e$6(this["prototype"], _0x206b57, _0x449854);
    }
  }
  static ["getPropertyDescriptor"](_0x3ad532, _0x1ceada, _0x355d83) {
    const { get: _0x1a6b26, set: _0x5e3b4d } = h$2(this["prototype"], _0x3ad532) ?? { "get"() {
      return this[_0x1ceada];
    }, "set"(_0x3de79d) {
      this[_0x1ceada] = _0x3de79d;
    } };
    return { "get": _0x1a6b26, "set"(_0x3ed07e) {
      const _0x2e6e69 = _0x1a6b26 == null ? void 0 : _0x1a6b26["call"](this);
      _0x5e3b4d == null ? void 0 : _0x5e3b4d["call"](this, _0x3ed07e), this["requestUpdate"](_0x3ad532, _0x2e6e69, _0x355d83);
    }, "configurable": !![], "enumerable": !![] };
  }
  static ["getPropertyOptions"](_0x188a3a) {
    return this["elementProperties"]["get"](_0x188a3a) ?? b$1;
  }
  static ["_$Ei"]() {
    if (this["hasOwnProperty"](d$1("elementProperties"))) return;
    const _0x1fe7d2 = n$3(this);
    _0x1fe7d2["finalize"](), void 0 !== _0x1fe7d2["l"] && (this["l"] = [..._0x1fe7d2["l"]]), this["elementProperties"] = new Map(_0x1fe7d2["elementProperties"]);
  }
  static ["finalize"]() {
    if (this["hasOwnProperty"](d$1("finalized"))) return;
    if (this["finalized"] = !![], this["_$Ei"](), this["hasOwnProperty"](d$1("properties"))) {
      const _0x35f51f = this["properties"], _0x3ddaa0 = [...r$3(_0x35f51f), ...o$5(_0x35f51f)];
      for (const _0x375273 of _0x3ddaa0) this["createProperty"](_0x375273, _0x35f51f[_0x375273]);
    }
    const _0x4efb7f = this[Symbol["metadata"]];
    if (null !== _0x4efb7f) {
      const _0x47ef7c = litPropertyMetadata["get"](_0x4efb7f);
      if (void 0 !== _0x47ef7c) {
        for (const [_0x460d3e, _0x42ad5a] of _0x47ef7c) this["elementProperties"]["set"](_0x460d3e, _0x42ad5a);
      }
    }
    this["_$Eh"] = /* @__PURE__ */ new Map();
    for (const [_0x1f2642, _0x5ac2e4] of this["elementProperties"]) {
      const _0x44c728 = this["_$Eu"](_0x1f2642, _0x5ac2e4);
      void 0 !== _0x44c728 && this["_$Eh"]["set"](_0x44c728, _0x1f2642);
    }
    this["elementStyles"] = this["finalizeStyles"](this["styles"]);
  }
  static ["finalizeStyles"](_0x1c5bae) {
    const _0x1ed6c6 = [];
    if (Array["isArray"](_0x1c5bae)) {
      const _0x1f578d = new Set(_0x1c5bae["flat"](1 / 0)["reverse"]());
      for (const _0x44d412 of _0x1f578d) _0x1ed6c6["unshift"](c$3(_0x44d412));
    } else void 0 !== _0x1c5bae && _0x1ed6c6["push"](c$3(_0x1c5bae));
    return _0x1ed6c6;
  }
  static ["_$Eu"](_0x28765e, _0x515afa) {
    const _0x305f57 = _0x515afa["attribute"];
    return ![] === _0x305f57 ? void 0 : "string" == typeof _0x305f57 ? _0x305f57 : "string" == typeof _0x28765e ? _0x28765e["toLowerCase"]() : void 0;
  }
  constructor() {
    super(), this["_$Ep"] = void 0, this["isUpdatePending"] = ![], this["hasUpdated"] = ![], this["_$Em"] = null, this["_$Ev"]();
  }
  ["_$Ev"]() {
    var _a2;
    this["_$ES"] = new Promise((_0x18337e) => this["enableUpdating"] = _0x18337e), this["_$AL"] = /* @__PURE__ */ new Map(), this["_$E_"](), this["requestUpdate"](), (_a2 = this["constructor"]["l"]) == null ? void 0 : _a2["forEach"]((_0x86f45c) => _0x86f45c(this));
  }
  ["addController"](_0x341f83) {
    var _a2;
    (this["_$EO"] ?? (this["_$EO"] = /* @__PURE__ */ new Set()))["add"](_0x341f83), void 0 !== this["renderRoot"] && this["isConnected"] && ((_a2 = _0x341f83["hostConnected"]) == null ? void 0 : _a2.call(_0x341f83));
  }
  ["removeController"](_0x4a0540) {
    var _a2;
    (_a2 = this["_$EO"]) == null ? void 0 : _a2["delete"](_0x4a0540);
  }
  ["_$E_"]() {
    const _0x1fe99b = /* @__PURE__ */ new Map(), _0x596eae = this["constructor"]["elementProperties"];
    for (const _0x22f840 of _0x596eae["keys"]()) this["hasOwnProperty"](_0x22f840) && (_0x1fe99b["set"](_0x22f840, this[_0x22f840]), delete this[_0x22f840]);
    _0x1fe99b["size"] > 0 && (this["_$Ep"] = _0x1fe99b);
  }
  ["createRenderRoot"]() {
    const _0x38441e = this["shadowRoot"] ?? this["attachShadow"](this["constructor"]["shadowRootOptions"]);
    return S$1(_0x38441e, this["constructor"]["elementStyles"]), _0x38441e;
  }
  ["connectedCallback"]() {
    var _a2;
    this["renderRoot"] ?? (this["renderRoot"] = this["createRenderRoot"]()), this["enableUpdating"](!![]), (_a2 = this["_$EO"]) == null ? void 0 : _a2["forEach"]((_0x59b759) => {
      var _a3;
      return (_a3 = _0x59b759["hostConnected"]) == null ? void 0 : _a3.call(_0x59b759);
    });
  }
  ["enableUpdating"](_0x1abb80) {
  }
  ["disconnectedCallback"]() {
    var _a2;
    (_a2 = this["_$EO"]) == null ? void 0 : _a2["forEach"]((_0x26f9a4) => {
      var _a3;
      return (_a3 = _0x26f9a4["hostDisconnected"]) == null ? void 0 : _a3.call(_0x26f9a4);
    });
  }
  ["attributeChangedCallback"](_0x45ac8e, _0x5702d0, _0x286fdd) {
    this["_$AK"](_0x45ac8e, _0x286fdd);
  }
  ["_$ET"](_0x4f40f3, _0x247ea7) {
    var _a2;
    const _0x450792 = this["constructor"]["elementProperties"]["get"](_0x4f40f3), _0x3e5273 = this["constructor"]["_$Eu"](_0x4f40f3, _0x450792);
    if (void 0 !== _0x3e5273 && !![] === _0x450792["reflect"]) {
      const _0x3d788d = (void 0 !== ((_a2 = _0x450792["converter"]) == null ? void 0 : _a2["toAttribute"]) ? _0x450792["converter"] : u$4)["toAttribute"](_0x247ea7, _0x450792["type"]);
      this["_$Em"] = _0x4f40f3, null == _0x3d788d ? this["removeAttribute"](_0x3e5273) : this["setAttribute"](_0x3e5273, _0x3d788d), this["_$Em"] = null;
    }
  }
  ["_$AK"](_0x48f1c2, _0x225033) {
    var _a2, _b;
    const _0x2676b0 = this["constructor"], _0x11cbba = _0x2676b0["_$Eh"]["get"](_0x48f1c2);
    if (void 0 !== _0x11cbba && this["_$Em"] !== _0x11cbba) {
      const _0xd45248 = _0x2676b0["getPropertyOptions"](_0x11cbba), _0x6ad335 = "function" == typeof _0xd45248["converter"] ? { "fromAttribute": _0xd45248["converter"] } : void 0 !== ((_a2 = _0xd45248["converter"]) == null ? void 0 : _a2["fromAttribute"]) ? _0xd45248["converter"] : u$4;
      this["_$Em"] = _0x11cbba;
      const _0x55c504 = _0x6ad335["fromAttribute"](_0x225033, _0xd45248["type"]);
      this[_0x11cbba] = _0x55c504 ?? ((_b = this["_$Ej"]) == null ? void 0 : _b["get"](_0x11cbba)) ?? _0x55c504, this["_$Em"] = null;
    }
  }
  ["requestUpdate"](_0x564974, _0x1104d7, _0x509435, _0x28a6d3 = ![], _0x185fae) {
    var _a2;
    if (void 0 !== _0x564974) {
      const _0x2b9c6c = this["constructor"];
      if (![] === _0x28a6d3 && (_0x185fae = this[_0x564974]), _0x509435 ?? (_0x509435 = _0x2b9c6c["getPropertyOptions"](_0x564974)), !((_0x509435["hasChanged"] ?? f$1)(_0x185fae, _0x1104d7) || _0x509435["useDefault"] && _0x509435["reflect"] && _0x185fae === ((_a2 = this["_$Ej"]) == null ? void 0 : _a2["get"](_0x564974)) && !this["hasAttribute"](_0x2b9c6c["_$Eu"](_0x564974, _0x509435)))) return;
      this["C"](_0x564974, _0x1104d7, _0x509435);
    }
    ![] === this["isUpdatePending"] && (this["_$ES"] = this["_$EP"]());
  }
  ["C"](_0x5754ce, _0xe41c6c, { useDefault: _0xc3a7f6, reflect: _0x3acd69, wrapped: _0x1425cc }, _0x15a795) {
    _0xc3a7f6 && !(this["_$Ej"] ?? (this["_$Ej"] = /* @__PURE__ */ new Map()))["has"](_0x5754ce) && (this["_$Ej"]["set"](_0x5754ce, _0x15a795 ?? _0xe41c6c ?? this[_0x5754ce]), !![] !== _0x1425cc || void 0 !== _0x15a795) || (this["_$AL"]["has"](_0x5754ce) || (this["hasUpdated"] || _0xc3a7f6 || (_0xe41c6c = void 0), this["_$AL"]["set"](_0x5754ce, _0xe41c6c)), !![] === _0x3acd69 && this["_$Em"] !== _0x5754ce && (this["_$Eq"] ?? (this["_$Eq"] = /* @__PURE__ */ new Set()))["add"](_0x5754ce));
  }
  async ["_$EP"]() {
    this["isUpdatePending"] = !![];
    try {
      await this["_$ES"];
    } catch (_0x3a2552) {
      Promise["reject"](_0x3a2552);
    }
    const _0x11dc8a = this["scheduleUpdate"]();
    return null != _0x11dc8a && await _0x11dc8a, !this["isUpdatePending"];
  }
  ["scheduleUpdate"]() {
    return this["performUpdate"]();
  }
  ["performUpdate"]() {
    var _a2;
    if (!this["isUpdatePending"]) return;
    if (!this["hasUpdated"]) {
      if (this["renderRoot"] ?? (this["renderRoot"] = this["createRenderRoot"]()), this["_$Ep"]) {
        for (const [_0x2433f2, _0x49d411] of this["_$Ep"]) this[_0x2433f2] = _0x49d411;
        this["_$Ep"] = void 0;
      }
      const _0x122591 = this["constructor"]["elementProperties"];
      if (_0x122591["size"] > 0) for (const [_0x468c89, _0x29f223] of _0x122591) {
        const { wrapped: _0x4ef5d0 } = _0x29f223, _0x164144 = this[_0x468c89];
        !![] !== _0x4ef5d0 || this["_$AL"]["has"](_0x468c89) || void 0 === _0x164144 || this["C"](_0x468c89, void 0, _0x29f223, _0x164144);
      }
    }
    let _0x322910 = ![];
    const _0x19d26a = this["_$AL"];
    try {
      _0x322910 = this["shouldUpdate"](_0x19d26a), _0x322910 ? (this["willUpdate"](_0x19d26a), (_a2 = this["_$EO"]) == null ? void 0 : _a2["forEach"]((_0x27e40e) => {
        var _a3;
        return (_a3 = _0x27e40e["hostUpdate"]) == null ? void 0 : _a3.call(_0x27e40e);
      }), this["update"](_0x19d26a)) : this["_$EM"]();
    } catch (_0x3807ae) {
      throw _0x322910 = ![], this["_$EM"](), _0x3807ae;
    }
    _0x322910 && this["_$AE"](_0x19d26a);
  }
  ["willUpdate"](_0x32bb7c) {
  }
  ["_$AE"](_0x172514) {
    var _a2;
    (_a2 = this["_$EO"]) == null ? void 0 : _a2["forEach"]((_0x1f81ab) => {
      var _a3;
      return (_a3 = _0x1f81ab["hostUpdated"]) == null ? void 0 : _a3.call(_0x1f81ab);
    }), this["hasUpdated"] || (this["hasUpdated"] = !![], this["firstUpdated"](_0x172514)), this["updated"](_0x172514);
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
  ["shouldUpdate"](_0x268c3e) {
    return !![];
  }
  ["update"](_0x2ebca3) {
    this["_$Eq"] && (this["_$Eq"] = this["_$Eq"]["forEach"]((_0x351687) => this["_$ET"](_0x351687, this[_0x351687]))), this["_$EM"]();
  }
  ["updated"](_0x5d2c9e) {
  }
  ["firstUpdated"](_0x20c527) {
  }
};
y$1["elementStyles"] = [], y$1["shadowRootOptions"] = { "mode": "open" }, y$1[d$1("elementProperties")] = /* @__PURE__ */ new Map(), y$1[d$1("finalized")] = /* @__PURE__ */ new Map(), p$2 == null ? void 0 : p$2({ "ReactiveElement": y$1 }), (a$2["reactiveElementVersions"] ?? (a$2["reactiveElementVersions"] = []))["push"]("2.1.2");
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
const t$4 = globalThis, i$3 = (_0x528ff9) => _0x528ff9, s$3 = t$4["trustedTypes"], e$5 = s$3 ? s$3["createPolicy"]("lit-html", { "createHTML": (_0x1ec782) => _0x1ec782 }) : void 0, h$1 = "$lit$", o$4 = "lit$" + Math["random"]()["toFixed"](9)["slice"](2) + "$", n$2 = "?" + o$4, r$2 = "<" + n$2 + ">", l$1 = document, c$1 = () => l$1["createComment"](""), a$1 = (_0x1cdd14) => null === _0x1cdd14 || "object" != typeof _0x1cdd14 && "function" != typeof _0x1cdd14, u$3 = Array["isArray"], d = (_0x1b373e) => u$3(_0x1b373e) || "function" == typeof (_0x1b373e == null ? void 0 : _0x1b373e[Symbol["iterator"]]), f = "[ 	\n\f\r]", v$1 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, _ = /-->/g, m$1 = />/g, p$1 = RegExp(">|" + f + `(?:([^\\s"'>=/]+)(` + f + "*=" + f + `*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), g = /'/g, $ = /"/g, y2 = /^(?:script|style|textarea|title)$/i, x = (_0x2ace27) => (_0x3aea3f, ..._0x18f649) => ({ "_$litType$": _0x2ace27, "strings": _0x3aea3f, "values": _0x18f649 }), b = x(1), E = Symbol["for"]("lit-noChange"), A = Symbol["for"]("lit-nothing"), C = /* @__PURE__ */ new WeakMap(), P = l$1["createTreeWalker"](l$1, 129);
function V(_0x53eb5f, _0x2c8f35) {
  if (!u$3(_0x53eb5f) || !_0x53eb5f["hasOwnProperty"]("raw")) throw Error("invalid template strings array");
  return void 0 !== e$5 ? e$5["createHTML"](_0x2c8f35) : _0x2c8f35;
}
const N = (_0x3d7f9b, _0x5a6e8c) => {
  const _0x3578af = _0x3d7f9b["length"] - 1, _0x1d4e7d = [];
  let _0x57232d, _0x28e470 = 2 === _0x5a6e8c ? "<svg>" : 3 === _0x5a6e8c ? "<math>" : "", _0x3d68a5 = v$1;
  for (let _0x1fe7a0 = 0; _0x1fe7a0 < _0x3578af; _0x1fe7a0++) {
    const _0x1e0b86 = _0x3d7f9b[_0x1fe7a0];
    let _0x377db9, _0x460726, _0x3606aa = -1, _0x205a59 = 0;
    for (; _0x205a59 < _0x1e0b86["length"] && (_0x3d68a5["lastIndex"] = _0x205a59, _0x460726 = _0x3d68a5["exec"](_0x1e0b86), null !== _0x460726); ) _0x205a59 = _0x3d68a5["lastIndex"], _0x3d68a5 === v$1 ? "!--" === _0x460726[1] ? _0x3d68a5 = _ : void 0 !== _0x460726[1] ? _0x3d68a5 = m$1 : void 0 !== _0x460726[2] ? (y2["test"](_0x460726[2]) && (_0x57232d = RegExp("</" + _0x460726[2], "g")), _0x3d68a5 = p$1) : void 0 !== _0x460726[3] && (_0x3d68a5 = p$1) : _0x3d68a5 === p$1 ? ">" === _0x460726[0] ? (_0x3d68a5 = _0x57232d ?? v$1, _0x3606aa = -1) : void 0 === _0x460726[1] ? _0x3606aa = -2 : (_0x3606aa = _0x3d68a5["lastIndex"] - _0x460726[2]["length"], _0x377db9 = _0x460726[1], _0x3d68a5 = void 0 === _0x460726[3] ? p$1 : '"' === _0x460726[3] ? $ : g) : _0x3d68a5 === $ || _0x3d68a5 === g ? _0x3d68a5 = p$1 : _0x3d68a5 === _ || _0x3d68a5 === m$1 ? _0x3d68a5 = v$1 : (_0x3d68a5 = p$1, _0x57232d = void 0);
    const _0x32602d = _0x3d68a5 === p$1 && _0x3d7f9b[_0x1fe7a0 + 1]["startsWith"]("/>") ? " " : "";
    _0x28e470 += _0x3d68a5 === v$1 ? _0x1e0b86 + r$2 : _0x3606aa >= 0 ? (_0x1d4e7d["push"](_0x377db9), _0x1e0b86["slice"](0, _0x3606aa) + h$1 + _0x1e0b86["slice"](_0x3606aa) + o$4 + _0x32602d) : _0x1e0b86 + o$4 + (-2 === _0x3606aa ? _0x1fe7a0 : _0x32602d);
  }
  return [V(_0x3d7f9b, _0x28e470 + (_0x3d7f9b[_0x3578af] || "<?>") + (2 === _0x5a6e8c ? "</svg>" : 3 === _0x5a6e8c ? "</math>" : "")), _0x1d4e7d];
};
class S {
  constructor({ strings: _0x308dfd, _$litType$: _0x4e0a4a }, _0x509855) {
    let _0x3d5b5e;
    this["parts"] = [];
    let _0x46345c = 0, _0x58237b = 0;
    const _0x198a69 = _0x308dfd["length"] - 1, _0x6c0158 = this["parts"], [_0x2c013b, _0x323e7f] = N(_0x308dfd, _0x4e0a4a);
    if (this["el"] = S["createElement"](_0x2c013b, _0x509855), P["currentNode"] = this["el"]["content"], 2 === _0x4e0a4a || 3 === _0x4e0a4a) {
      const _0x3afaa7 = this["el"]["content"]["firstChild"];
      _0x3afaa7["replaceWith"](..._0x3afaa7["childNodes"]);
    }
    for (; null !== (_0x3d5b5e = P["nextNode"]()) && _0x6c0158["length"] < _0x198a69; ) {
      if (1 === _0x3d5b5e["nodeType"]) {
        if (_0x3d5b5e["hasAttributes"]()) {
          for (const _0x12a0b4 of _0x3d5b5e["getAttributeNames"]()) if (_0x12a0b4["endsWith"](h$1)) {
            const _0x3bad15 = _0x323e7f[_0x58237b++], _0x2d2aa9 = _0x3d5b5e["getAttribute"](_0x12a0b4)["split"](o$4), _0x1a7926 = /([.?@])?(.*)/["exec"](_0x3bad15);
            _0x6c0158["push"]({ "type": 1, "index": _0x46345c, "name": _0x1a7926[2], "strings": _0x2d2aa9, "ctor": "." === _0x1a7926[1] ? I : "?" === _0x1a7926[1] ? L : "@" === _0x1a7926[1] ? z : H }), _0x3d5b5e["removeAttribute"](_0x12a0b4);
          } else _0x12a0b4["startsWith"](o$4) && (_0x6c0158["push"]({ "type": 6, "index": _0x46345c }), _0x3d5b5e["removeAttribute"](_0x12a0b4));
        }
        if (y2["test"](_0x3d5b5e["tagName"])) {
          const _0x230665 = _0x3d5b5e["textContent"]["split"](o$4), _0x282c37 = _0x230665["length"] - 1;
          if (_0x282c37 > 0) {
            _0x3d5b5e["textContent"] = s$3 ? s$3["emptyScript"] : "";
            for (let _0x3cad43 = 0; _0x3cad43 < _0x282c37; _0x3cad43++) _0x3d5b5e["append"](_0x230665[_0x3cad43], c$1()), P["nextNode"](), _0x6c0158["push"]({ "type": 2, "index": ++_0x46345c });
            _0x3d5b5e["append"](_0x230665[_0x282c37], c$1());
          }
        }
      } else {
        if (8 === _0x3d5b5e["nodeType"]) {
          if (_0x3d5b5e["data"] === n$2) _0x6c0158["push"]({ "type": 2, "index": _0x46345c });
          else {
            let _0x2bbe3e = -1;
            for (; -1 !== (_0x2bbe3e = _0x3d5b5e["data"]["indexOf"](o$4, _0x2bbe3e + 1)); ) _0x6c0158["push"]({ "type": 7, "index": _0x46345c }), _0x2bbe3e += o$4["length"] - 1;
          }
        }
      }
      _0x46345c++;
    }
  }
  static ["createElement"](_0x3a43bf, _0x225372) {
    const _0x5c9247 = l$1["createElement"]("template");
    return _0x5c9247["innerHTML"] = _0x3a43bf, _0x5c9247;
  }
}
function M$1(_0x3b3d58, _0x4a6419, _0x4fdfaf = _0x3b3d58, _0x346e26) {
  var _a2, _b;
  if (_0x4a6419 === E) return _0x4a6419;
  let _0x26d3db = void 0 !== _0x346e26 ? (_a2 = _0x4fdfaf["_$Co"]) == null ? void 0 : _a2[_0x346e26] : _0x4fdfaf["_$Cl"];
  const _0x54307e = a$1(_0x4a6419) ? void 0 : _0x4a6419["_$litDirective$"];
  return (_0x26d3db == null ? void 0 : _0x26d3db["constructor"]) !== _0x54307e && ((_b = _0x26d3db == null ? void 0 : _0x26d3db["_$AO"]) == null ? void 0 : _b.call(_0x26d3db, ![]), void 0 === _0x54307e ? _0x26d3db = void 0 : (_0x26d3db = new _0x54307e(_0x3b3d58), _0x26d3db["_$AT"](_0x3b3d58, _0x4fdfaf, _0x346e26)), void 0 !== _0x346e26 ? (_0x4fdfaf["_$Co"] ?? (_0x4fdfaf["_$Co"] = []))[_0x346e26] = _0x26d3db : _0x4fdfaf["_$Cl"] = _0x26d3db), void 0 !== _0x26d3db && (_0x4a6419 = M$1(_0x3b3d58, _0x26d3db["_$AS"](_0x3b3d58, _0x4a6419["values"]), _0x26d3db, _0x346e26)), _0x4a6419;
}
class R {
  constructor(_0x27cc4a, _0x4a7cd6) {
    this["_$AV"] = [], this["_$AN"] = void 0, this["_$AD"] = _0x27cc4a, this["_$AM"] = _0x4a7cd6;
  }
  get ["parentNode"]() {
    return this["_$AM"]["parentNode"];
  }
  get ["_$AU"]() {
    return this["_$AM"]["_$AU"];
  }
  ["u"](_0x51e075) {
    const { el: { content: _0xb8822a }, parts: _0x35598a } = this["_$AD"], _0x43b181 = ((_0x51e075 == null ? void 0 : _0x51e075["creationScope"]) ?? l$1)["importNode"](_0xb8822a, !![]);
    P["currentNode"] = _0x43b181;
    let _0x2d258c = P["nextNode"](), _0x363275 = 0, _0x576830 = 0, _0x473602 = _0x35598a[0];
    for (; void 0 !== _0x473602; ) {
      if (_0x363275 === _0x473602["index"]) {
        let _0x5215d5;
        2 === _0x473602["type"] ? _0x5215d5 = new k(_0x2d258c, _0x2d258c["nextSibling"], this, _0x51e075) : 1 === _0x473602["type"] ? _0x5215d5 = new _0x473602["ctor"](_0x2d258c, _0x473602["name"], _0x473602["strings"], this, _0x51e075) : 6 === _0x473602["type"] && (_0x5215d5 = new Z(_0x2d258c, this, _0x51e075)), this["_$AV"]["push"](_0x5215d5), _0x473602 = _0x35598a[++_0x576830];
      }
      _0x363275 !== (_0x473602 == null ? void 0 : _0x473602["index"]) && (_0x2d258c = P["nextNode"](), _0x363275++);
    }
    return P["currentNode"] = l$1, _0x43b181;
  }
  ["p"](_0x5491db) {
    let _0x49515a = 0;
    for (const _0x1d1eda of this["_$AV"]) void 0 !== _0x1d1eda && (void 0 !== _0x1d1eda["strings"] ? (_0x1d1eda["_$AI"](_0x5491db, _0x1d1eda, _0x49515a), _0x49515a += _0x1d1eda["strings"]["length"] - 2) : _0x1d1eda["_$AI"](_0x5491db[_0x49515a])), _0x49515a++;
  }
}
class k {
  get ["_$AU"]() {
    var _a2;
    return ((_a2 = this["_$AM"]) == null ? void 0 : _a2["_$AU"]) ?? this["_$Cv"];
  }
  constructor(_0x237993, _0x19e661, _0x1e7316, _0x1f04c5) {
    this["type"] = 2, this["_$AH"] = A, this["_$AN"] = void 0, this["_$AA"] = _0x237993, this["_$AB"] = _0x19e661, this["_$AM"] = _0x1e7316, this["options"] = _0x1f04c5, this["_$Cv"] = (_0x1f04c5 == null ? void 0 : _0x1f04c5["isConnected"]) ?? !![];
  }
  get ["parentNode"]() {
    let _0x1ba5cd = this["_$AA"]["parentNode"];
    const _0x1b8809 = this["_$AM"];
    return void 0 !== _0x1b8809 && 11 === (_0x1ba5cd == null ? void 0 : _0x1ba5cd["nodeType"]) && (_0x1ba5cd = _0x1b8809["parentNode"]), _0x1ba5cd;
  }
  get ["startNode"]() {
    return this["_$AA"];
  }
  get ["endNode"]() {
    return this["_$AB"];
  }
  ["_$AI"](_0x52dfc5, _0x591112 = this) {
    _0x52dfc5 = M$1(this, _0x52dfc5, _0x591112), a$1(_0x52dfc5) ? _0x52dfc5 === A || null == _0x52dfc5 || "" === _0x52dfc5 ? (this["_$AH"] !== A && this["_$AR"](), this["_$AH"] = A) : _0x52dfc5 !== this["_$AH"] && _0x52dfc5 !== E && this["_"](_0x52dfc5) : void 0 !== _0x52dfc5["_$litType$"] ? this["$"](_0x52dfc5) : void 0 !== _0x52dfc5["nodeType"] ? this["T"](_0x52dfc5) : d(_0x52dfc5) ? this["k"](_0x52dfc5) : this["_"](_0x52dfc5);
  }
  ["O"](_0x4dfa59) {
    return this["_$AA"]["parentNode"]["insertBefore"](_0x4dfa59, this["_$AB"]);
  }
  ["T"](_0x1245c8) {
    this["_$AH"] !== _0x1245c8 && (this["_$AR"](), this["_$AH"] = this["O"](_0x1245c8));
  }
  ["_"](_0x341a4e) {
    this["_$AH"] !== A && a$1(this["_$AH"]) ? this["_$AA"]["nextSibling"]["data"] = _0x341a4e : this["T"](l$1["createTextNode"](_0x341a4e)), this["_$AH"] = _0x341a4e;
  }
  ["$"](_0x40d86b) {
    var _a2;
    const { values: _0x146bba, _$litType$: _0x4155e8 } = _0x40d86b, _0x28e9c9 = "number" == typeof _0x4155e8 ? this["_$AC"](_0x40d86b) : (void 0 === _0x4155e8["el"] && (_0x4155e8["el"] = S["createElement"](V(_0x4155e8["h"], _0x4155e8["h"][0]), this["options"])), _0x4155e8);
    if (((_a2 = this["_$AH"]) == null ? void 0 : _a2["_$AD"]) === _0x28e9c9) this["_$AH"]["p"](_0x146bba);
    else {
      const _0x10db0f = new R(_0x28e9c9, this), _0x5ca028 = _0x10db0f["u"](this["options"]);
      _0x10db0f["p"](_0x146bba), this["T"](_0x5ca028), this["_$AH"] = _0x10db0f;
    }
  }
  ["_$AC"](_0x1bca2a) {
    let _0x411968 = C["get"](_0x1bca2a["strings"]);
    return void 0 === _0x411968 && C["set"](_0x1bca2a["strings"], _0x411968 = new S(_0x1bca2a)), _0x411968;
  }
  ["k"](_0x41f28f) {
    u$3(this["_$AH"]) || (this["_$AH"] = [], this["_$AR"]());
    const _0x57c880 = this["_$AH"];
    let _0x419698, _0x450d8a = 0;
    for (const _0xf54dbc of _0x41f28f) _0x450d8a === _0x57c880["length"] ? _0x57c880["push"](_0x419698 = new k(this["O"](c$1()), this["O"](c$1()), this, this["options"])) : _0x419698 = _0x57c880[_0x450d8a], _0x419698["_$AI"](_0xf54dbc), _0x450d8a++;
    _0x450d8a < _0x57c880["length"] && (this["_$AR"](_0x419698 && _0x419698["_$AB"]["nextSibling"], _0x450d8a), _0x57c880["length"] = _0x450d8a);
  }
  ["_$AR"](_0x92a7c1 = this["_$AA"]["nextSibling"], _0x1f8008) {
    var _a2;
    for ((_a2 = this["_$AP"]) == null ? void 0 : _a2.call(this, ![], !![], _0x1f8008); _0x92a7c1 !== this["_$AB"]; ) {
      const _0x3cfa10 = i$3(_0x92a7c1)["nextSibling"];
      i$3(_0x92a7c1)["remove"](), _0x92a7c1 = _0x3cfa10;
    }
  }
  ["setConnected"](_0x53cf99) {
    var _a2;
    void 0 === this["_$AM"] && (this["_$Cv"] = _0x53cf99, (_a2 = this["_$AP"]) == null ? void 0 : _a2.call(this, _0x53cf99));
  }
}
class H {
  get ["tagName"]() {
    return this["element"]["tagName"];
  }
  get ["_$AU"]() {
    return this["_$AM"]["_$AU"];
  }
  constructor(_0x516e66, _0x574ed8, _0x52756e, _0x2e7fe1, _0x3947e3) {
    this["type"] = 1, this["_$AH"] = A, this["_$AN"] = void 0, this["element"] = _0x516e66, this["name"] = _0x574ed8, this["_$AM"] = _0x2e7fe1, this["options"] = _0x3947e3, _0x52756e["length"] > 2 || "" !== _0x52756e[0] || "" !== _0x52756e[1] ? (this["_$AH"] = Array(_0x52756e["length"] - 1)["fill"](new String()), this["strings"] = _0x52756e) : this["_$AH"] = A;
  }
  ["_$AI"](_0x54d273, _0x309bc8 = this, _0x36434e, _0x500506) {
    const _0x6ae65d = this["strings"];
    let _0x14a030 = ![];
    if (void 0 === _0x6ae65d) _0x54d273 = M$1(this, _0x54d273, _0x309bc8, 0), _0x14a030 = !a$1(_0x54d273) || _0x54d273 !== this["_$AH"] && _0x54d273 !== E, _0x14a030 && (this["_$AH"] = _0x54d273);
    else {
      const _0x258c42 = _0x54d273;
      let _0x4cbb74, _0x34f415;
      for (_0x54d273 = _0x6ae65d[0], _0x4cbb74 = 0; _0x4cbb74 < _0x6ae65d["length"] - 1; _0x4cbb74++) _0x34f415 = M$1(this, _0x258c42[_0x36434e + _0x4cbb74], _0x309bc8, _0x4cbb74), _0x34f415 === E && (_0x34f415 = this["_$AH"][_0x4cbb74]), _0x14a030 || (_0x14a030 = !a$1(_0x34f415) || _0x34f415 !== this["_$AH"][_0x4cbb74]), _0x34f415 === A ? _0x54d273 = A : _0x54d273 !== A && (_0x54d273 += (_0x34f415 ?? "") + _0x6ae65d[_0x4cbb74 + 1]), this["_$AH"][_0x4cbb74] = _0x34f415;
    }
    _0x14a030 && !_0x500506 && this["j"](_0x54d273);
  }
  ["j"](_0x4d2fff) {
    _0x4d2fff === A ? this["element"]["removeAttribute"](this["name"]) : this["element"]["setAttribute"](this["name"], _0x4d2fff ?? "");
  }
}
class I extends H {
  constructor() {
    super(...arguments), this["type"] = 3;
  }
  ["j"](_0x5a0cd9) {
    this["element"][this["name"]] = _0x5a0cd9 === A ? void 0 : _0x5a0cd9;
  }
}
class L extends H {
  constructor() {
    super(...arguments), this["type"] = 4;
  }
  ["j"](_0x37d376) {
    this["element"]["toggleAttribute"](this["name"], !!_0x37d376 && _0x37d376 !== A);
  }
}
class z extends H {
  constructor(_0xf5fa45, _0x3d5e7a, _0x39ee40, _0x47b8dc, _0x1603dc) {
    super(_0xf5fa45, _0x3d5e7a, _0x39ee40, _0x47b8dc, _0x1603dc), this["type"] = 5;
  }
  ["_$AI"](_0x5c6cf8, _0x3545f6 = this) {
    if ((_0x5c6cf8 = M$1(this, _0x5c6cf8, _0x3545f6, 0) ?? A) === E) return;
    const _0x551ebb = this["_$AH"], _0x26c647 = _0x5c6cf8 === A && _0x551ebb !== A || _0x5c6cf8["capture"] !== _0x551ebb["capture"] || _0x5c6cf8["once"] !== _0x551ebb["once"] || _0x5c6cf8["passive"] !== _0x551ebb["passive"], _0x32f13b = _0x5c6cf8 !== A && (_0x551ebb === A || _0x26c647);
    _0x26c647 && this["element"]["removeEventListener"](this["name"], this, _0x551ebb), _0x32f13b && this["element"]["addEventListener"](this["name"], this, _0x5c6cf8), this["_$AH"] = _0x5c6cf8;
  }
  ["handleEvent"](_0x9ea99) {
    var _a2;
    "function" == typeof this["_$AH"] ? this["_$AH"]["call"](((_a2 = this["options"]) == null ? void 0 : _a2["host"]) ?? this["element"], _0x9ea99) : this["_$AH"]["handleEvent"](_0x9ea99);
  }
}
class Z {
  constructor(_0x362cbd, _0x40761e, _0x25a026) {
    this["element"] = _0x362cbd, this["type"] = 6, this["_$AN"] = void 0, this["_$AM"] = _0x40761e, this["options"] = _0x25a026;
  }
  get ["_$AU"]() {
    return this["_$AM"]["_$AU"];
  }
  ["_$AI"](_0x22ad3d) {
    M$1(this, _0x22ad3d);
  }
}
const j = { "I": k }, B = t$4["litHtmlPolyfillSupport"];
B == null ? void 0 : B(S, k), (t$4["litHtmlVersions"] ?? (t$4["litHtmlVersions"] = []))["push"]("3.3.3");
const D = (_0x128b69, _0x32f285, _0x32f9c0) => {
  const _0x2010e8 = (_0x32f9c0 == null ? void 0 : _0x32f9c0["renderBefore"]) ?? _0x32f285;
  let _0x5511ae = _0x2010e8["_$litPart$"];
  if (void 0 === _0x5511ae) {
    const _0x6812e0 = (_0x32f9c0 == null ? void 0 : _0x32f9c0["renderBefore"]) ?? null;
    _0x2010e8["_$litPart$"] = _0x5511ae = new k(_0x32f285["insertBefore"](c$1(), _0x6812e0), _0x6812e0, void 0, _0x32f9c0 ?? {});
  }
  return _0x5511ae["_$AI"](_0x128b69), _0x5511ae;
}, s$2 = globalThis;
let i$2 = class i extends y$1 {
  constructor() {
    super(...arguments), this["renderOptions"] = { "host": this }, this["_$Do"] = void 0;
  }
  ["createRenderRoot"]() {
    var _a2;
    const _0x3bb3bf = super["createRenderRoot"]();
    return (_a2 = this["renderOptions"])["renderBefore"] ?? (_a2["renderBefore"] = _0x3bb3bf["firstChild"]), _0x3bb3bf;
  }
  ["update"](_0x5ca4fb) {
    const _0x169b09 = this["render"]();
    this["hasUpdated"] || (this["renderOptions"]["isConnected"] = this["isConnected"]), super["update"](_0x5ca4fb), this["_$Do"] = D(_0x169b09, this["renderRoot"], this["renderOptions"]);
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
const t$3 = (_0x4378a3) => (_0x164c16, _0x20d160) => {
  void 0 !== _0x20d160 ? _0x20d160["addInitializer"](() => {
    customElements["define"](_0x4378a3, _0x164c16);
  }) : customElements["define"](_0x4378a3, _0x164c16);
}, o$2 = { "attribute": !![], "type": String, "converter": u$4, "reflect": ![], "hasChanged": f$1 }, r$1 = (_0x22d669 = o$2, _0x2373cb, _0x247520) => {
  const { kind: _0x4163cd, metadata: _0x558e7d } = _0x247520;
  let _0x349244 = globalThis["litPropertyMetadata"]["get"](_0x558e7d);
  if (void 0 === _0x349244 && globalThis["litPropertyMetadata"]["set"](_0x558e7d, _0x349244 = /* @__PURE__ */ new Map()), "setter" === _0x4163cd && ((_0x22d669 = Object["create"](_0x22d669))["wrapped"] = !![]), _0x349244["set"](_0x247520["name"], _0x22d669), "accessor" === _0x4163cd) {
    const { name: _0x570b1e } = _0x247520;
    return { "set"(_0x1764d3) {
      const _0x4a4beb = _0x2373cb["get"]["call"](this);
      _0x2373cb["set"]["call"](this, _0x1764d3), this["requestUpdate"](_0x570b1e, _0x4a4beb, _0x22d669, !![], _0x1764d3);
    }, "init"(_0x4600de) {
      return void 0 !== _0x4600de && this["C"](_0x570b1e, void 0, _0x22d669, _0x4600de), _0x4600de;
    } };
  }
  if ("setter" === _0x4163cd) {
    const { name: _0x3a5c6b } = _0x247520;
    return function(_0x19e3a2) {
      const _0x266eb1 = this[_0x3a5c6b];
      _0x2373cb["call"](this, _0x19e3a2), this["requestUpdate"](_0x3a5c6b, _0x266eb1, _0x22d669, !![], _0x19e3a2);
    };
  }
  throw Error("Unsupported decorator location: " + _0x4163cd);
};
function n$1(_0x2bdd68) {
  return (_0x1085da, _0x87c8ba) => "object" == typeof _0x87c8ba ? r$1(_0x2bdd68, _0x1085da, _0x87c8ba) : ((_0x148638, _0x2bf160, _0x43b727) => {
    const _0x501030 = _0x2bf160["hasOwnProperty"](_0x43b727);
    return _0x2bf160["constructor"]["createProperty"](_0x43b727, _0x148638), _0x501030 ? Object["getOwnPropertyDescriptor"](_0x2bf160, _0x43b727) : void 0;
  })(_0x2bdd68, _0x1085da, _0x87c8ba);
}
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
function r(_0x7b0ed4) {
  return n$1({ ..._0x7b0ed4, "state": !![], "attribute": ![] });
}
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
const e$4 = (_0x449dcf, _0x1a0076, _0x35ffef) => (_0x35ffef["configurable"] = !![], _0x35ffef["enumerable"] = !![], Reflect["decorate"] && "object" != typeof _0x1a0076 && Object["defineProperty"](_0x449dcf, _0x1a0076, _0x35ffef), _0x35ffef);
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
function e$3(_0x1f2b0a, _0x40e760) {
  return (_0x50b018, _0x21a5a2, _0x895cb) => {
    const _0x9dcd1 = (_0x4a85aa) => {
      var _a2;
      return ((_a2 = _0x4a85aa["renderRoot"]) == null ? void 0 : _a2["querySelector"](_0x1f2b0a)) ?? null;
    };
    return e$4(_0x50b018, _0x21a5a2, { "get"() {
      return _0x9dcd1(this);
    } });
  };
}
class WriteOnlyApiKey {
  constructor(_0x53904b) {
    __privateAdd(this, _value, "");
    this["host"] = _0x53904b;
  }
  ["write"](_0xcb8c6a) {
    const _0x138cfc = __privateGet(this, _value);
    __privateSet(this, _value, _0xcb8c6a ?? ""), this["host"]["requestUpdate"]("apiKey", _0x138cfc);
  }
  ["writeDirect"](_0x1d25c0) {
    __privateSet(this, _value, _0x1d25c0);
  }
  get ["masked"]() {
    return __privateGet(this, _value) ? "••••••" : "";
  }
  get ["real"]() {
    return __privateGet(this, _value);
  }
}
_value = new WeakMap();
var __defProp$z = Object["defineProperty"], __getOwnPropDesc$A = Object["getOwnPropertyDescriptor"], __typeError$4 = (_0x9b263c) => {
  throw TypeError(_0x9b263c);
}, __decorateClass$A = (_0x43c90e, _0x1ca1bd, _0x3c62aa, _0x33de51) => {
  var _0xe705a8 = _0x33de51 > 1 ? void 0 : _0x33de51 ? __getOwnPropDesc$A(_0x1ca1bd, _0x3c62aa) : _0x1ca1bd;
  for (var _0x18c50a = _0x43c90e["length"] - 1, _0x58eb9d; _0x18c50a >= 0; _0x18c50a--) if (_0x58eb9d = _0x43c90e[_0x18c50a]) _0xe705a8 = (_0x33de51 ? _0x58eb9d(_0x1ca1bd, _0x3c62aa, _0xe705a8) : _0x58eb9d(_0xe705a8)) || _0xe705a8;
  if (_0x33de51 && _0xe705a8) __defProp$z(_0x1ca1bd, _0x3c62aa, _0xe705a8);
  return _0xe705a8;
}, __accessCheck$4 = (_0x3ca4dd, _0xe70c01, _0x531c41) => _0xe70c01["has"](_0x3ca4dd) || __typeError$4("Cannot " + _0x531c41), __privateGet$4 = (_0x24fbfe, _0x159222, _0x1d8733) => (__accessCheck$4(_0x24fbfe, _0x159222, "read from private field"), _0x1d8733 ? _0x1d8733["call"](_0x24fbfe) : _0x159222["get"](_0x24fbfe)), __privateAdd$4 = (_0x12e6bc, _0x3d5f15, _0x5155cc) => _0x3d5f15["has"](_0x12e6bc) ? __typeError$4("Cannot add the same private member more than once") : _0x3d5f15 instanceof WeakSet ? _0x3d5f15["add"](_0x12e6bc) : _0x3d5f15["set"](_0x12e6bc, _0x5155cc), _apiKeyState$2;
let tucbsMapInstanceCounter = 0, TucbsMap = class extends i$2 {
  constructor() {
    super(...arguments), this["_autoId"] = "tucbs-map-" + ++tucbsMapInstanceCounter, __privateAdd$4(this, _apiKeyState$2, new WriteOnlyApiKey(this)), this["authToken"] = "", this["proxyBase"] = "", this["basemap"] = "hgm-siyasi", this["mode"] = "3D", this["quality"] = 70, this["mapWidth"] = "100%", this["mapHeight"] = "100%", this["_mapInstance"] = null, this["_skipInitialPropertySync"] = ![], this["_authError"] = null, this["_apiKeyAuthState"] = "none";
  }
  get ["hostId"]() {
    return this["id"] || this["_autoId"];
  }
  set ["apiKey"](_0x2867d6) {
    __privateGet$4(this, _apiKeyState$2)["write"](_0x2867d6);
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
  ["_grantApiKeyTo"](_0x39aa18) {
    _0x39aa18["apiKey"] = __privateGet$4(this, _apiKeyState$2)["real"];
  }
  ["createRenderRoot"]() {
    return this;
  }
  ["connectedCallback"]() {
    super["connectedCallback"](), !this["id"] && (this["id"] = this["_autoId"]);
  }
  ["firstUpdated"]() {
    const _0x493d50 = this["getAttribute"]("api-key");
    _0x493d50 && !__privateGet$4(this, _apiKeyState$2)["real"] && __privateGet$4(this, _apiKeyState$2)["writeDirect"](_0x493d50), void this["_prepareMap"]();
  }
  async ["_prepareMap"]() {
    this["_apiKeyAuthState"] = "pending";
    try {
      await ensureEffectiveApiKeyValid(__privateGet$4(this, _apiKeyState$2)["real"] || void 0, getUcbpApiBase());
    } catch (_0x368611) {
      const _0x49d9e4 = _0x368611 instanceof Error ? _0x368611["message"] : String(_0x368611), _0x34a2d3 = _0x368611 instanceof TucbsError ? _0x368611["title"] : "API Hatası";
      console["error"]("[tucbs-map] apiKey validate başarısız:", _0x49d9e4), this["_apiKeyAuthState"] = "failed", this["_authError"] = { "title": _0x34a2d3, "message": _0x49d9e4 }, this["dispatchEvent"](new CustomEvent("error", { "detail": _0x368611 instanceof TucbsError ? { "error": _0x368611, "message": _0x49d9e4, "title": _0x34a2d3, "code": _0x368611["code"], "number": _0x368611["number"] } : { "error": _0x368611, "message": _0x49d9e4, "title": _0x34a2d3 }, "bubbles": !![], "composed": !![] }));
      return;
    }
    const _0x47cb44 = "#" + this["hostId"] + "-host", _0x11b98c = this["renderRoot"]["querySelector"](_0x47cb44), _0x304390 = { "timeline": ![], "animation": ![], "geocoder": ![], "homeButton": ![], "sceneModePicker": ![], "navigationHelpButton": ![], "infoBox": ![], "selectionIndicator": ![], "fullscreenButton": ![], "basemap": this["basemap"], ...__privateGet$4(this, _apiKeyState$2)["real"] ? { "apiKey": __privateGet$4(this, _apiKeyState$2)["real"] } : {}, ...this["initialExtent"] !== void 0 ? { "initialExtent": this["initialExtent"] } : {}, ...this["mapOptions"] };
    this["_mapInstance"] = new _0x46f0d4(_0x11b98c, _0x304390), this["_mapInstance"]["setQuality"](this["quality"]), this["_skipInitialPropertySync"] = !![], this["_apiKeyAuthState"] = "ok", this["_authError"] = null, this["dispatchEvent"](new CustomEvent("ready", { "detail": { "map": this["_mapInstance"] }, "bubbles": !![], "composed": !![] }));
  }
  ["updated"](_0x253ffd) {
    if (!this["_mapInstance"]) return;
    if (this["_skipInitialPropertySync"]) {
      this["_skipInitialPropertySync"] = ![];
      return;
    }
    if (_0x253ffd["has"]("basemap")) this["_mapInstance"]["setBasemap"](this["basemap"]);
    if (_0x253ffd["has"]("mode")) this["_mapInstance"]["setMode"](this["mode"]);
    if (_0x253ffd["has"]("quality")) this["_mapInstance"]["setQuality"](this["quality"]);
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
const t$2 = { "ATTRIBUTE": 1, "CHILD": 2 }, e$2 = (_0x3cc6f0) => (..._0x4d218e) => ({ "_$litDirective$": _0x3cc6f0, "values": _0x4d218e });
let i$1 = class i2 {
  constructor(_0xcd4368) {
  }
  get ["_$AU"]() {
    return this["_$AM"]["_$AU"];
  }
  ["_$AT"](_0x262c77, _0x684d3, _0x220fa5) {
    this["_$Ct"] = _0x262c77, this["_$AM"] = _0x684d3, this["_$Ci"] = _0x220fa5;
  }
  ["_$AS"](_0x840556, _0x5dbf49) {
    return this["update"](_0x840556, _0x5dbf49);
  }
  ["update"](_0x278da3, _0x52f54c) {
    return this["render"](..._0x52f54c);
  }
}, e$1 = class e extends i$1 {
  constructor(_0x27921d) {
    if (super(_0x27921d), this["it"] = A, _0x27921d["type"] !== t$2["CHILD"]) throw Error(this["constructor"]["directiveName"] + "() can only be used in child bindings");
  }
  ["render"](_0x2b9848) {
    if (_0x2b9848 === A || null == _0x2b9848) return this["_t"] = void 0, this["it"] = _0x2b9848;
    if (_0x2b9848 === E) return _0x2b9848;
    if ("string" != typeof _0x2b9848) throw Error(this["constructor"]["directiveName"] + "() called with a non-string value");
    if (_0x2b9848 === this["it"]) return this["_t"];
    this["it"] = _0x2b9848;
    const _0xd77f00 = [_0x2b9848];
    return _0xd77f00["raw"] = _0xd77f00, this["_t"] = { "_$litType$": this["constructor"]["resultType"], "strings": _0xd77f00, "values": [] };
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
  ["activate"](_0x507c64, _0x3fa1df) {
    if (this["entries"]["has"](_0x507c64)) {
      this["touch"](_0x507c64);
      return;
    }
    this["entries"]["size"] >= MAX_CONCURRENT_PREVIEW_VIEWERS && this["evictOldest"](), this["entries"]["set"](_0x507c64, { "lastUsed": performance["now"](), "onEvict": _0x3fa1df });
  }
  ["touch"](_0x21c069) {
    const _0x5c2035 = this["entries"]["get"](_0x21c069);
    if (_0x5c2035) _0x5c2035["lastUsed"] = performance["now"]();
  }
  ["release"](_0x5afd4f) {
    this["entries"]["delete"](_0x5afd4f);
  }
  ["evictOldest"]() {
    let _0x2dd1cc, _0x38df22;
    for (const [_0x2839b1, _0x4463aa] of this["entries"]) {
      (!_0x38df22 || _0x4463aa["lastUsed"] < _0x38df22["lastUsed"]) && (_0x2dd1cc = _0x2839b1, _0x38df22 = _0x4463aa);
    }
    if (_0x2dd1cc === void 0 || _0x38df22 === void 0) return;
    this["entries"]["delete"](_0x2dd1cc), _0x38df22["onEvict"]();
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
  ["isCurrent"](_0x529800) {
    return _0x529800 === this["current"];
  }
}
function iconNodeToString(_0x581a29) {
  const _0x215c61 = _0x581a29["attrs"] ? Object["entries"](_0x581a29["attrs"])["map"](([_0x50af63, _0x29827f]) => _0x50af63 + '="' + String(_0x29827f) + '"')["join"](" ") : "", _0x5c5d40 = (_0x581a29["content"] ?? [])["map"](iconNodeToString)["join"]("");
  return "<" + _0x581a29["elem"] + " " + _0x215c61 + ">" + _0x5c5d40 + "</" + _0x581a29["elem"] + ">";
}
function zoomInProportional(_0x3afb3b, _0xdd3182, _0x702464 = 0) {
  const _0xc6cbcf = _0x3afb3b["positionCartographic"]["height"], _0xc48050 = Math["min"](_0xc6cbcf * _0xdd3182, _0xc6cbcf - _0x702464);
  if (_0xc48050 > 0) _0x3afb3b["zoomIn"](_0xc48050);
}
function zoomOutProportional(_0x26a114, _0x2f7d74, _0x2af07c = Infinity) {
  const _0x3d0c98 = _0x26a114["positionCartographic"]["height"], _0x30910b = Math["min"](_0x3d0c98 * _0x2f7d74, _0x2af07c - _0x3d0c98);
  if (_0x30910b > 0) _0x26a114["zoomOut"](_0x30910b);
}
var __defProp$y = Object["defineProperty"], __getOwnPropDesc$z = Object["getOwnPropertyDescriptor"], __typeError$3 = (_0x3c5e48) => {
  throw TypeError(_0x3c5e48);
}, __decorateClass$z = (_0x37287a, _0x3cc24e, _0x495882, _0x3cdb34) => {
  var _0x5b0a27 = _0x3cdb34 > 1 ? void 0 : _0x3cdb34 ? __getOwnPropDesc$z(_0x3cc24e, _0x495882) : _0x3cc24e;
  for (var _0x2e6ac8 = _0x37287a["length"] - 1, _0x2e674d; _0x2e6ac8 >= 0; _0x2e6ac8--) if (_0x2e674d = _0x37287a[_0x2e6ac8]) _0x5b0a27 = (_0x3cdb34 ? _0x2e674d(_0x3cc24e, _0x495882, _0x5b0a27) : _0x2e674d(_0x5b0a27)) || _0x5b0a27;
  if (_0x3cdb34 && _0x5b0a27) __defProp$y(_0x3cc24e, _0x495882, _0x5b0a27);
  return _0x5b0a27;
}, __accessCheck$3 = (_0x577ab5, _0x42e0ae, _0xb3d45a) => _0x42e0ae["has"](_0x577ab5) || __typeError$3("Cannot " + _0xb3d45a), __privateGet$3 = (_0x177fca, _0x32c039, _0x3a924a) => (__accessCheck$3(_0x177fca, _0x32c039, "read from private field"), _0x3a924a ? _0x3a924a["call"](_0x177fca) : _0x32c039["get"](_0x177fca)), __privateAdd$3 = (_0x487a8c, _0x14c940, _0x3b0ac6) => _0x14c940["has"](_0x487a8c) ? __typeError$3("Cannot add the same private member more than once") : _0x14c940 instanceof WeakSet ? _0x14c940["add"](_0x487a8c) : _0x14c940["set"](_0x487a8c, _0x3b0ac6), __privateSet$1 = (_0x29dc74, _0x4d77a9, _0x52076d, _0x300c32) => (__accessCheck$3(_0x29dc74, _0x4d77a9, "write to private field"), _0x4d77a9["set"](_0x29dc74, _0x52076d), _0x52076d), _apiKey$1;
const ICON_ZOOM_IN$3 = o$1(iconNodeToString(_16_default$1)), ICON_ZOOM_OUT$1 = o$1(iconNodeToString(_16_default)), IMAGERY_LAYER_TYPES = /* @__PURE__ */ new Set(["WMS", "WMTS", "WCS", "GEOTIFF", "XYZ"]), GLOBAL_LONGITUDE_SPAN_THRESHOLD = _0x2d6059["toRadians"](350), GLOBAL_LATITUDE_SPAN_THRESHOLD = _0x2d6059["toRadians"](160);
function isGloballyExtentedLayer(_0x450d16) {
  var _a2;
  const _0x379edf = _0x450d16["cesiumObject"];
  if (!("imageryProvider" in _0x379edf)) return ![];
  const _0x25d3ae = (_a2 = _0x379edf["imageryProvider"]) == null ? void 0 : _a2["rectangle"];
  if (!_0x25d3ae) return ![];
  const _0x4fa4ca = _0x25d3ae["east"] - _0x25d3ae["west"], _0x24d044 = _0x25d3ae["north"] - _0x25d3ae["south"];
  return _0x4fa4ca >= GLOBAL_LONGITUDE_SPAN_THRESHOLD && _0x24d044 >= GLOBAL_LATITUDE_SPAN_THRESHOLD;
}
const HGM_GATED_BASEMAP_IDS = new Set(HGM_BASEMAP_IDS);
let tucbsMapPreviewInstanceCounter = 0, TucbsMapPreview = class extends i$2 {
  constructor() {
    super(...arguments), this["_autoId"] = "tucbs-map-preview-" + ++tucbsMapPreviewInstanceCounter, __privateAdd$3(this, _apiKey$1, ""), this["basemap"] = "hgm-temel", this["mode"] = "2D", this["width"] = "300px", this["height"] = "200px", this["showZoomButtons"] = !![], this["zoomToLayer"] = ![], this["_active"] = ![], this["_mapInstance"] = null, this["_loading"] = ![], this["_basemapBlocked"] = ![], this["_syncGeneration"] = new AsyncGeneration();
  }
  get ["hostId"]() {
    return this["id"] || this["_autoId"];
  }
  set ["apiKey"](_0x2814c8) {
    const _0x240287 = __privateGet$3(this, _apiKey$1);
    __privateSet$1(this, _apiKey$1, _0x2814c8), this["requestUpdate"]("apiKey", _0x240287);
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
    this["_observer"] = new IntersectionObserver((_0x273ca9) => {
      var _a2;
      ((_a2 = _0x273ca9[0]) == null ? void 0 : _a2["isIntersecting"]) ? this["_requestActivate"]() : this["_requestDeactivate"]();
    }), this["_observer"]["observe"](this);
  }
  ["disconnectedCallback"]() {
    var _a2;
    super["disconnectedCallback"](), (_a2 = this["_observer"]) == null ? void 0 : _a2["disconnect"](), this["_requestDeactivate"]();
  }
  ["updated"](_0xda0ea3) {
    if (!this["_mapInstance"]) return;
    if (_0xda0ea3["has"]("basemap") || _0xda0ea3["has"]("apiKey")) void this["_syncBasemap"]();
    if (_0xda0ea3["has"]("mode")) this["_mapInstance"]["setMode"](this["mode"]);
    (_0xda0ea3["has"]("layer") || _0xda0ea3["has"]("layerOptions")) && (void this["_syncLayer"](), void this["_syncBasemap"]());
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
    const _0x55bea6 = this["renderRoot"]["querySelector"]("#" + this["hostId"] + "-host");
    if (!_0x55bea6) return;
    this["_mapInstance"] = new _0x46f0d4(_0x55bea6, { ...__privateGet$3(this, _apiKey$1) ? { "apiKey": __privateGet$3(this, _apiKey$1) } : {}, "timeline": ![], "animation": ![], "geocoder": ![], "homeButton": ![], "sceneModePicker": ![], "navigationHelpButton": ![], "infoBox": ![], "selectionIndicator": ![], "fullscreenButton": ![] }), this["_mapInstance"]["setMode"](this["mode"]), this["_mapInstance"]["setQuality"](75), this["_mapInstance"]["viewer"]["scene"]["globe"]["baseColor"] = Color["fromCssColorString"]("#f4f4f4"), this["_resizeObserver"] = new ResizeObserver(() => {
      var _a2, _b;
      (_a2 = this["_mapInstance"]) == null ? void 0 : _a2["resize"](), (_b = this["_mapInstance"]) == null ? void 0 : _b["setExtent"](DEFAULT_INITIAL_EXTENT);
    }), this["_resizeObserver"]["observe"](_0x55bea6), this["_unregisterApiKeyRefresh"] = registerApiKeyRefresh(() => {
      void this["_syncBasemap"]();
    }), void this["_syncBasemap"](), void this["_syncLayer"]();
  }
  ["_deactivate"]() {
    var _a2, _b, _c;
    this["_active"] = ![], (_a2 = this["_resizeObserver"]) == null ? void 0 : _a2["disconnect"](), this["_resizeObserver"] = void 0, (_b = this["_unregisterApiKeyRefresh"]) == null ? void 0 : _b.call(this), this["_unregisterApiKeyRefresh"] = void 0, (_c = this["_mapInstance"]) == null ? void 0 : _c["destroy"](), this["_mapInstance"] = null, this["_currentLayerId"] = void 0;
  }
  async ["_syncBasemap"]() {
    const _0x4f0676 = this["_mapInstance"];
    if (!_0x4f0676) return;
    if (!HGM_GATED_BASEMAP_IDS["has"](this["basemap"])) {
      this["_basemapBlocked"] = ![], _0x4f0676["setBasemap"](this["basemap"]);
      return;
    }
    try {
      await ensureEffectiveApiKeyValid(__privateGet$3(this, _apiKey$1) || void 0, getUcbpApiBase());
    } catch (_0x196b4d) {
      const _0x4bbe69 = _0x196b4d instanceof ApiKeyValidationError && _0x196b4d["reason"] === "missing-key", _0x4d82eb = this["layerOptions"] ?? this["layer"], _0x1e3fb4 = _0x4d82eb ? _0x4d82eb["options"]["url"] : void 0, _0x4db731 = !!_0x4d82eb && (!_0x1e3fb4 || !_0x4f0676["layerManager"]["layerRequiresApiKey"](_0x1e3fb4));
      this["_basemapBlocked"] = !(_0x4bbe69 && _0x4db731), _0x4f0676["setBasemap"](null);
      return;
    }
    this["_basemapBlocked"] = ![], _0x4f0676["setBasemap"](this["basemap"]);
  }
  async ["_syncLayer"]() {
    const _0x3a3f7a = this["_mapInstance"];
    if (!_0x3a3f7a) return;
    const _0x43aea1 = this["_syncGeneration"]["next"](), _0x39cfdb = this["_currentLayerId"], _0x47462b = this["layerOptions"] ?? this["layer"];
    if (!_0x47462b) {
      this["_loading"] = ![];
      if (_0x39cfdb) _0x3a3f7a["layerManager"]["removeLayer"](_0x39cfdb);
      this["_currentLayerId"] = void 0, _0x3a3f7a["setExtent"](DEFAULT_INITIAL_EXTENT);
      return;
    }
    this["_loading"] = !![];
    try {
      const _0xbc21ca = await this["_addLayer"](_0x3a3f7a, _0x47462b);
      if (!this["_syncGeneration"]["isCurrent"](_0x43aea1)) {
        _0x3a3f7a["layerManager"]["removeLayer"](_0xbc21ca["id"]);
        return;
      }
      this["_currentLayerId"] = _0xbc21ca["id"];
      if (this["zoomToLayer"] && !isGloballyExtentedLayer(_0xbc21ca)) {
        const _0x54dc1c = await _0x3a3f7a["layerManager"]["zoomToLayer"](_0xbc21ca["id"])["catch"](() => ![]);
        if (!_0x54dc1c) _0x3a3f7a["setExtent"](DEFAULT_INITIAL_EXTENT);
      } else _0x3a3f7a["setExtent"](DEFAULT_INITIAL_EXTENT);
      if (IMAGERY_LAYER_TYPES["has"](_0x47462b["layerType"])) {
        await this["_waitForTilesLoaded"](_0x3a3f7a);
        if (!this["_syncGeneration"]["isCurrent"](_0x43aea1)) return;
      }
      _0x39cfdb && _0x39cfdb !== this["_currentLayerId"] && _0x3a3f7a["layerManager"]["removeLayer"](_0x39cfdb);
    } finally {
      if (this["_syncGeneration"]["isCurrent"](_0x43aea1)) this["_loading"] = ![];
    }
  }
  ["_waitForTilesLoaded"](_0x19e6d1, _0x310d7c = 5e3) {
    return new Promise((_0x37983e) => {
      const _0x239a6f = _0x19e6d1["viewer"]["scene"]["globe"];
      if (_0x239a6f["tilesLoaded"]) {
        _0x37983e();
        return;
      }
      let _0x127326 = ![];
      const _0xb63e21 = () => {
        if (_0x127326) return;
        _0x127326 = !![], _0x239a6f["tileLoadProgressEvent"]["removeEventListener"](_0x4cd7b9), clearTimeout(_0x2ef495), _0x37983e();
      }, _0x4cd7b9 = (_0xfd591a) => {
        if (_0xfd591a === 0) _0xb63e21();
      };
      _0x239a6f["tileLoadProgressEvent"]["addEventListener"](_0x4cd7b9);
      const _0x2ef495 = setTimeout(_0xb63e21, _0x310d7c);
    });
  }
  async ["_addLayer"](_0x1ac1a8, _0x49dbe9) {
    switch (_0x49dbe9["layerType"]) {
      case "WMS":
        return _0x1ac1a8["layerManager"]["add"]("WMS", _0x49dbe9["options"]);
      case "WMTS":
        return _0x1ac1a8["layerManager"]["add"]("WMTS", _0x49dbe9["options"]);
      case "WFS":
        return _0x1ac1a8["layerManager"]["add"]("WFS", _0x49dbe9["options"]);
      case "WCS":
        return _0x1ac1a8["layerManager"]["add"]("WCS", _0x49dbe9["options"]);
      case "GEOTIFF":
        return _0x1ac1a8["layerManager"]["add"]("GEOTIFF", _0x49dbe9["options"]);
      case "GEOJSON":
      case "KML":
      case "KMZ":
      case "SHP":
      case "CSV":
        return _0x1ac1a8["layerManager"]["add"](_0x49dbe9["layerType"], _0x49dbe9["options"]);
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
    const _0x49fb56 = (_a2 = this["_mapInstance"]) == null ? void 0 : _a2["viewer"];
    if (!_0x49fb56) return;
    zoomInProportional(_0x49fb56["camera"], TucbsMapPreview["ZOOM_STEP_RATIO"], _0x49fb56["scene"]["screenSpaceCameraController"]["minimumZoomDistance"]);
  }
  ["_zoomOut"]() {
    var _a2;
    const _0xad5294 = (_a2 = this["_mapInstance"]) == null ? void 0 : _a2["viewer"];
    if (!_0xad5294) return;
    zoomOutProportional(_0xad5294["camera"], TucbsMapPreview["ZOOM_STEP_RATIO"], _0xad5294["scene"]["screenSpaceCameraController"]["maximumZoomDistance"]);
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
_apiKey$1 = /* @__PURE__ */ new WeakMap(), TucbsMapPreview["ZOOM_STEP_RATIO"] = 0.5, __decorateClass$z([n$1({ "attribute": "api-key" })], TucbsMapPreview["prototype"], "apiKey", 1), __decorateClass$z([n$1()], TucbsMapPreview["prototype"], "basemap", 2), __decorateClass$z([n$1()], TucbsMapPreview["prototype"], "mode", 2), __decorateClass$z([n$1()], TucbsMapPreview["prototype"], "width", 2), __decorateClass$z([n$1()], TucbsMapPreview["prototype"], "height", 2), __decorateClass$z([n$1({ "type": Object })], TucbsMapPreview["prototype"], "layer", 2), __decorateClass$z([n$1({ "type": Object, "attribute": "layer-options" })], TucbsMapPreview["prototype"], "layerOptions", 2), __decorateClass$z([n$1({ "attribute": "show-zoom-buttons", "converter": (_0x3690d9) => _0x3690d9 !== "false" })], TucbsMapPreview["prototype"], "showZoomButtons", 2), __decorateClass$z([n$1({ "type": Boolean, "attribute": "zoom-to-layer" })], TucbsMapPreview["prototype"], "zoomToLayer", 2), __decorateClass$z([r()], TucbsMapPreview["prototype"], "_active", 2), __decorateClass$z([r()], TucbsMapPreview["prototype"], "_mapInstance", 2), __decorateClass$z([r()], TucbsMapPreview["prototype"], "_loading", 2), __decorateClass$z([r()], TucbsMapPreview["prototype"], "_basemapBlocked", 2), TucbsMapPreview = __decorateClass$z([t$3("tucbs-map-preview")], TucbsMapPreview);
/**
* @license
* Copyright 2020 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
const { I: t2 } = j, i3 = (_0x456d52) => _0x456d52, s$1 = () => document["createComment"](""), v = (_0x246a25, _0x3c719c, _0x12dd7a) => {
  var _a2;
  const _0x1cbc05 = _0x246a25["_$AA"]["parentNode"], _0x43b06d = void 0 === _0x3c719c ? _0x246a25["_$AB"] : _0x3c719c["_$AA"];
  if (void 0 === _0x12dd7a) {
    const _0x2f6081 = _0x1cbc05["insertBefore"](s$1(), _0x43b06d), _0x55b1d9 = _0x1cbc05["insertBefore"](s$1(), _0x43b06d);
    _0x12dd7a = new t2(_0x2f6081, _0x55b1d9, _0x246a25, _0x246a25["options"]);
  } else {
    const _0x4f192d = _0x12dd7a["_$AB"]["nextSibling"], _0x3d840d = _0x12dd7a["_$AM"], _0x2dc874 = _0x3d840d !== _0x246a25;
    if (_0x2dc874) {
      let _0x356dbf;
      (_a2 = _0x12dd7a["_$AQ"]) == null ? void 0 : _a2.call(_0x12dd7a, _0x246a25), _0x12dd7a["_$AM"] = _0x246a25, void 0 !== _0x12dd7a["_$AP"] && (_0x356dbf = _0x246a25["_$AU"]) !== _0x3d840d["_$AU"] && _0x12dd7a["_$AP"](_0x356dbf);
    }
    if (_0x4f192d !== _0x43b06d || _0x2dc874) {
      let _0x3bcd6d = _0x12dd7a["_$AA"];
      for (; _0x3bcd6d !== _0x4f192d; ) {
        const _0x3ea5d3 = i3(_0x3bcd6d)["nextSibling"];
        i3(_0x1cbc05)["insertBefore"](_0x3bcd6d, _0x43b06d), _0x3bcd6d = _0x3ea5d3;
      }
    }
  }
  return _0x12dd7a;
}, u$2 = (_0x73c53d, _0x2513ab, _0x5292db = _0x73c53d) => (_0x73c53d["_$AI"](_0x2513ab, _0x5292db), _0x73c53d), m = {}, p = (_0x49f0c5, _0x5c8f1d = m) => _0x49f0c5["_$AH"] = _0x5c8f1d, M = (_0x32b957) => _0x32b957["_$AH"], h = (_0xe63265) => {
  _0xe63265["_$AR"](), _0xe63265["_$AA"]["remove"]();
}, u$1 = (_0x13f86a, _0x35bcf3, _0x30af53) => {
  const _0x20b503 = /* @__PURE__ */ new Map();
  for (let _0x5180b7 = _0x35bcf3; _0x5180b7 <= _0x30af53; _0x5180b7++) _0x20b503["set"](_0x13f86a[_0x5180b7], _0x5180b7);
  return _0x20b503;
}, c = e$2(class extends i$1 {
  constructor(_0x2f72f4) {
    if (super(_0x2f72f4), _0x2f72f4["type"] !== t$2["CHILD"]) throw Error("repeat() can only be used in text expressions");
  }
  ["dt"](_0x3b703f, _0x27cab4, _0x408d85) {
    let _0x2e91a1;
    void 0 === _0x408d85 ? _0x408d85 = _0x27cab4 : void 0 !== _0x27cab4 && (_0x2e91a1 = _0x27cab4);
    const _0x30daf6 = [], _0x4156ce = [];
    let _0x46a27d = 0;
    for (const _0x30ad44 of _0x3b703f) _0x30daf6[_0x46a27d] = _0x2e91a1 ? _0x2e91a1(_0x30ad44, _0x46a27d) : _0x46a27d, _0x4156ce[_0x46a27d] = _0x408d85(_0x30ad44, _0x46a27d), _0x46a27d++;
    return { "values": _0x4156ce, "keys": _0x30daf6 };
  }
  ["render"](_0x2f0175, _0x20b6a0, _0x438e97) {
    return this["dt"](_0x2f0175, _0x20b6a0, _0x438e97)["values"];
  }
  ["update"](_0x307b79, [_0x41d551, _0x341577, _0x42c80f]) {
    const _0x26c591 = M(_0x307b79), { values: _0x45f8af, keys: _0x3b4514 } = this["dt"](_0x41d551, _0x341577, _0x42c80f);
    if (!Array["isArray"](_0x26c591)) return this["ut"] = _0x3b4514, _0x45f8af;
    const _0x3eaec9 = this["ut"] ?? (this["ut"] = []), _0xa2a4ce = [];
    let _0x2c2400, _0x312d43, _0x1e815f = 0, _0xf184a = _0x26c591["length"] - 1, _0x2e659d = 0, _0x4c7364 = _0x45f8af["length"] - 1;
    for (; _0x1e815f <= _0xf184a && _0x2e659d <= _0x4c7364; ) if (null === _0x26c591[_0x1e815f]) _0x1e815f++;
    else {
      if (null === _0x26c591[_0xf184a]) _0xf184a--;
      else {
        if (_0x3eaec9[_0x1e815f] === _0x3b4514[_0x2e659d]) _0xa2a4ce[_0x2e659d] = u$2(_0x26c591[_0x1e815f], _0x45f8af[_0x2e659d]), _0x1e815f++, _0x2e659d++;
        else {
          if (_0x3eaec9[_0xf184a] === _0x3b4514[_0x4c7364]) _0xa2a4ce[_0x4c7364] = u$2(_0x26c591[_0xf184a], _0x45f8af[_0x4c7364]), _0xf184a--, _0x4c7364--;
          else {
            if (_0x3eaec9[_0x1e815f] === _0x3b4514[_0x4c7364]) _0xa2a4ce[_0x4c7364] = u$2(_0x26c591[_0x1e815f], _0x45f8af[_0x4c7364]), v(_0x307b79, _0xa2a4ce[_0x4c7364 + 1], _0x26c591[_0x1e815f]), _0x1e815f++, _0x4c7364--;
            else {
              if (_0x3eaec9[_0xf184a] === _0x3b4514[_0x2e659d]) _0xa2a4ce[_0x2e659d] = u$2(_0x26c591[_0xf184a], _0x45f8af[_0x2e659d]), v(_0x307b79, _0x26c591[_0x1e815f], _0x26c591[_0xf184a]), _0xf184a--, _0x2e659d++;
              else {
                if (void 0 === _0x2c2400 && (_0x2c2400 = u$1(_0x3b4514, _0x2e659d, _0x4c7364), _0x312d43 = u$1(_0x3eaec9, _0x1e815f, _0xf184a)), _0x2c2400["has"](_0x3eaec9[_0x1e815f])) {
                  if (_0x2c2400["has"](_0x3eaec9[_0xf184a])) {
                    const _0x2233c8 = _0x312d43["get"](_0x3b4514[_0x2e659d]), _0x3012f4 = void 0 !== _0x2233c8 ? _0x26c591[_0x2233c8] : null;
                    if (null === _0x3012f4) {
                      const _0x5339de = v(_0x307b79, _0x26c591[_0x1e815f]);
                      u$2(_0x5339de, _0x45f8af[_0x2e659d]), _0xa2a4ce[_0x2e659d] = _0x5339de;
                    } else _0xa2a4ce[_0x2e659d] = u$2(_0x3012f4, _0x45f8af[_0x2e659d]), v(_0x307b79, _0x26c591[_0x1e815f], _0x3012f4), _0x26c591[_0x2233c8] = null;
                    _0x2e659d++;
                  } else h(_0x26c591[_0xf184a]), _0xf184a--;
                } else h(_0x26c591[_0x1e815f]), _0x1e815f++;
              }
            }
          }
        }
      }
    }
    for (; _0x2e659d <= _0x4c7364; ) {
      const _0x4d1667 = v(_0x307b79, _0xa2a4ce[_0x4c7364 + 1]);
      u$2(_0x4d1667, _0x45f8af[_0x2e659d]), _0xa2a4ce[_0x2e659d++] = _0x4d1667;
    }
    for (; _0x1e815f <= _0xf184a; ) {
      const _0x728da7 = _0x26c591[_0x1e815f++];
      null !== _0x728da7 && h(_0x728da7);
    }
    return this["ut"] = _0x3b4514, p(_0x307b79, _0xa2a4ce), E;
  }
});
function applyCustomCss(_0x2eda98, _0x59de78, _0xdc555c, _0x56054d) {
  if (!_0x2eda98) return;
  if (!_0x59de78) {
    if (_0xdc555c["sheet"]) {
      const _0x4b2814 = _0xdc555c["sheet"];
      _0x2eda98["adoptedStyleSheets"] = _0x2eda98["adoptedStyleSheets"]["filter"]((_0xec8e00) => _0xec8e00 !== _0x4b2814);
    }
    return;
  }
  !_0xdc555c["sheet"] && (_0xdc555c["sheet"] = new CSSStyleSheet(), _0x2eda98["adoptedStyleSheets"] = [..._0x2eda98["adoptedStyleSheets"], _0xdc555c["sheet"]]);
  try {
    _0xdc555c["sheet"]["replaceSync"](_0x59de78);
  } catch (_0x19b055) {
    console["warn"]("[" + _0x56054d + "] customCss gecersiz CSS iceriyor:", _0x19b055);
  }
}
function syncVirtualScrollbar(_0x376537, _0x3042af) {
  const { scrollHeight: _0x64f32b, clientHeight: _0x343a43, scrollTop: _0x53b7e6 } = _0x376537, _0x5d36f5 = _0x64f32b - _0x343a43;
  if (_0x5d36f5 <= 1) {
    _0x3042af["style"]["display"] = "none";
    return;
  }
  _0x3042af["style"]["display"] = "block";
  const _0x2b3c55 = Math["max"](24, _0x343a43 / _0x64f32b * _0x343a43), _0xadcdbc = _0x343a43 - _0x2b3c55, _0x3a34d3 = _0x53b7e6 / _0x5d36f5 * _0xadcdbc;
  _0x3042af["style"]["height"] = _0x2b3c55 + "px", _0x3042af["style"]["top"] = _0x3a34d3 + "px";
}
function startVirtualScrollbarDrag(_0x593fed, _0xacb5aa, _0x502db9) {
  const _0x3071ae = () => {
  };
  if (_0x593fed["button"] !== 0) return _0x3071ae;
  _0x593fed["preventDefault"]();
  const _0x40a7b3 = _0x593fed["currentTarget"], _0x5b6c98 = _0x40a7b3["getBoundingClientRect"](), _0x3c29b6 = _0x593fed["clientY"] - _0x5b6c98["top"], _0x3e6284 = (_0x4208c8) => {
    const _0xe25670 = _0xacb5aa["getBoundingClientRect"](), _0x1a1412 = _0xacb5aa["clientHeight"] - _0x40a7b3["offsetHeight"];
    if (_0x1a1412 <= 0) return;
    const _0x13276b = _0x4208c8["clientY"] - _0xe25670["top"] - _0x3c29b6, _0x1453e2 = Math["min"](Math["max"](_0x13276b, 0), _0x1a1412), _0x5af884 = _0xacb5aa["scrollHeight"] - _0xacb5aa["clientHeight"];
    _0xacb5aa["scrollTop"] = _0x1453e2 / _0x1a1412 * _0x5af884;
  }, _0x3101 = (_0x52fea7) => {
    _0x40a7b3["removeEventListener"]("pointermove", _0x3e6284), _0x40a7b3["removeEventListener"]("pointerup", _0x4874a6), _0x40a7b3["removeEventListener"]("pointercancel", _0x4874a6), _0x52fea7 && _0x40a7b3["hasPointerCapture"](_0x52fea7["pointerId"]) && _0x40a7b3["releasePointerCapture"](_0x52fea7["pointerId"]), _0x502db9 == null ? void 0 : _0x502db9();
  }, _0x4874a6 = (_0xea5aaf) => _0x3101(_0xea5aaf);
  return _0x40a7b3["setPointerCapture"](_0x593fed["pointerId"]), _0x40a7b3["addEventListener"]("pointermove", _0x3e6284), _0x40a7b3["addEventListener"]("pointerup", _0x4874a6), _0x40a7b3["addEventListener"]("pointercancel", _0x4874a6), () => _0x3101();
}
class VirtualScrollbar {
  constructor(_0x5e75ba, _0x1e7386, _0x319a2f) {
    this["host"] = _0x5e75ba, this["getList"] = _0x1e7386, this["getThumb"] = _0x319a2f, this["_stopDrag"] = null, _0x5e75ba["addController"](this);
  }
  ["hostDisconnected"]() {
    var _a2;
    (_a2 = this["_stopDrag"]) == null ? void 0 : _a2.call(this), this["_stopDrag"] = null;
  }
  ["sync"]() {
    const _0xd67ce4 = this["getList"](), _0x444fbf = this["getThumb"]();
    if (!_0xd67ce4 || !_0x444fbf) return;
    syncVirtualScrollbar(_0xd67ce4, _0x444fbf);
  }
  ["startDrag"](_0x841d6a) {
    const _0x59bf94 = this["getList"]();
    if (!_0x59bf94) return;
    this["_stopDrag"] = startVirtualScrollbarDrag(_0x841d6a, _0x59bf94, () => {
      this["_stopDrag"] = null;
    });
  }
}
class DraggablePanelController {
  constructor(_0x53875e, _0x2e07c2) {
    this["options"] = _0x2e07c2, this["_header"] = null, this["_panel"] = null, this["_offset"] = null, this["_move"] = (_0x1ca7f5) => {
      var _a2, _b;
      if (!this["_offset"] || !this["_panel"]) return;
      this["_panel"]["style"]["left"] = _0x1ca7f5["clientX"] - this["_offset"]["x"] + "px", this["_panel"]["style"]["top"] = _0x1ca7f5["clientY"] - this["_offset"]["y"] + "px", (_b = (_a2 = this["options"])["onMove"]) == null ? void 0 : _b.call(_a2);
    }, this["_end"] = (_0x2306b0) => {
      const _0x162162 = _0x2306b0["currentTarget"];
      _0x162162["removeEventListener"]("pointermove", this["_move"]), _0x162162["removeEventListener"]("pointerup", this["_end"]), _0x162162["removeEventListener"]("pointercancel", this["_end"]);
      if (_0x162162["hasPointerCapture"](_0x2306b0["pointerId"])) _0x162162["releasePointerCapture"](_0x2306b0["pointerId"]);
      this["_reset"]();
    }, _0x53875e["addController"](this);
  }
  ["hostDisconnected"]() {
    this["cancel"]();
  }
  ["start"](_0x128d0e) {
    if (_0x128d0e["button"] !== 0) return;
    if (_0x128d0e["target"]["closest"](this["options"]["ignoreSelector"])) return;
    const _0x195524 = _0x128d0e["currentTarget"], _0xbc9907 = this["options"]["getPanel"](_0x195524);
    if (!_0xbc9907) return;
    const _0x19b290 = _0xbc9907["getBoundingClientRect"]();
    _0xbc9907["style"]["left"] = _0x19b290["left"] + "px", _0xbc9907["style"]["top"] = _0x19b290["top"] + "px", _0xbc9907["style"]["transform"] = "none", this["_header"] = _0x195524, this["_panel"] = _0xbc9907, this["_offset"] = { "x": _0x128d0e["clientX"] - _0x19b290["left"], "y": _0x128d0e["clientY"] - _0x19b290["top"] }, _0x195524["setPointerCapture"](_0x128d0e["pointerId"]), _0x195524["addEventListener"]("pointermove", this["_move"]), _0x195524["addEventListener"]("pointerup", this["_end"]), _0x195524["addEventListener"]("pointercancel", this["_end"]);
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
var __defProp$x = Object["defineProperty"], __getOwnPropDesc$y = Object["getOwnPropertyDescriptor"], __decorateClass$y = (_0x2f8c9c, _0x1441f5, _0x2ebe7a, _0xf0d8fe) => {
  var _0x24dd84 = _0xf0d8fe > 1 ? void 0 : _0xf0d8fe ? __getOwnPropDesc$y(_0x1441f5, _0x2ebe7a) : _0x1441f5;
  for (var _0x23d947 = _0x2f8c9c["length"] - 1, _0x2fe06a; _0x23d947 >= 0; _0x23d947--) if (_0x2fe06a = _0x2f8c9c[_0x23d947]) _0x24dd84 = (_0xf0d8fe ? _0x2fe06a(_0x1441f5, _0x2ebe7a, _0x24dd84) : _0x2fe06a(_0x24dd84)) || _0x24dd84;
  if (_0xf0d8fe && _0x24dd84) __defProp$x(_0x1441f5, _0x2ebe7a, _0x24dd84);
  return _0x24dd84;
};
let TucbsServiceStyleCard = class extends i$2 {
  constructor() {
    super(...arguments), this["layerId"] = "", this["layerType"] = "", this["requestId"] = 0, this["_serviceStyles"] = [], this["_serviceStylesLoading"] = ![], this["_serviceStylesError"] = "", this["_selectedServiceStyle"] = "";
  }
  ["willUpdate"](_0x362769) {
    (_0x362769["has"]("layerId") || _0x362769["has"]("layerType") || _0x362769["has"]("layerManager") || _0x362769["has"]("requestId")) && void this["_loadServiceStyles"]();
  }
  async ["_loadServiceStyles"]() {
    var _a2;
    if (!this["layerManager"] || !this["layerId"]) return;
    this["_serviceStylesLoading"] = !![], this["_serviceStylesError"] = "";
    try {
      const _0x5e981a = this["layerType"] === "WMS" ? await this["layerManager"]["getWmsAvailableStyles"](this["layerId"]) : await this["layerManager"]["getWmtsAvailableStyles"](this["layerId"]);
      this["_serviceStyles"] = _0x5e981a, this["_selectedServiceStyle"] = ((_a2 = _0x5e981a[0]) == null ? void 0 : _a2["name"]) ?? "";
    } catch (_0xe4dd20) {
      _0xe4dd20 instanceof TucbsError && console["error"]("[tucbs-style-editor] " + _0xe4dd20["code"] + " (" + _0xe4dd20["number"] + "): " + _0xe4dd20["message"]), this["_serviceStylesError"] = _0xe4dd20 instanceof Error ? _0xe4dd20["message"] : "Sunucu stilleri okunamadı.";
    } finally {
      this["_serviceStylesLoading"] = ![];
    }
  }
  async ["_selectServiceStyle"](_0x5c4a36) {
    if (!this["layerManager"] || !this["layerId"]) return;
    this["_selectedServiceStyle"] = _0x5c4a36;
    try {
      this["layerType"] === "WMS" ? await this["layerManager"]["setWmsStyle"](this["layerId"], _0x5c4a36) : await this["layerManager"]["setWmtsStyle"](this["layerId"], _0x5c4a36);
    } catch (_0x32cab6) {
      _0x32cab6 instanceof TucbsError && console["error"]("[tucbs-style-editor] " + _0x32cab6["code"] + " (" + _0x32cab6["number"] + "): " + _0x32cab6["message"]), this["_serviceStylesError"] = _0x32cab6 instanceof Error ? _0x32cab6["message"] : "Stil uygulanamadı.";
    }
  }
  ["render"]() {
    const _0x20ad0a = this["_serviceStyles"]["find"]((_0x307f17) => _0x307f17["name"] === this["_selectedServiceStyle"]);
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
                    @cds-dropdown-selected=${(_0xec160b) => {
      void this["_selectServiceStyle"](_0xec160b["detail"]["item"]["value"]);
    }}
                  >
                    ${this["_serviceStyles"]["map"]((_0x29f78f) => b`<cds-dropdown-item value=${_0x29f78f["name"]}>${_0x29f78f["title"]}</cds-dropdown-item>`)}
                  </cds-dropdown>
                </div>

                ${(_0x20ad0a == null ? void 0 : _0x20ad0a["legendUrl"]) ? b`
                      <div>
                        <span class="field-label">Lejant</span>
                        <img
                          src=${_0x20ad0a["legendUrl"]}
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
function sampleFromPaletteCss(_0x3fc289, _0x261e6a, _0xbcc88e) {
  if (_0x3fc289["length"] === 0) return "#808080";
  const _0x2b52a6 = Math["max"](0, Math["min"](1, _0x261e6a));
  if (_0xbcc88e === "qualitative") {
    const _0x27ee3b = Math["round"](_0x2b52a6 * (_0x3fc289["length"] - 1));
    return _0x3fc289[_0x27ee3b];
  }
  if (_0x3fc289["length"] === 1) return _0x3fc289[0];
  const _0x1a75e0 = _0x2b52a6 * (_0x3fc289["length"] - 1), _0x5c3f5a = Math["floor"](_0x1a75e0), _0x2eb938 = Math["min"](_0x3fc289["length"] - 1, _0x5c3f5a + 1), _0x5a09fc = _0x1a75e0 - _0x5c3f5a, _0x57e5bb = hexToRgb(_0x3fc289[_0x5c3f5a]), _0x33a6c2 = hexToRgb(_0x3fc289[_0x2eb938]), _0x4a99e9 = Math["round"](_0x57e5bb[0] + (_0x33a6c2[0] - _0x57e5bb[0]) * _0x5a09fc), _0x587589 = Math["round"](_0x57e5bb[1] + (_0x33a6c2[1] - _0x57e5bb[1]) * _0x5a09fc), _0xcca26c = Math["round"](_0x57e5bb[2] + (_0x33a6c2[2] - _0x57e5bb[2]) * _0x5a09fc);
  return "rgb(" + _0x4a99e9 + ", " + _0x587589 + ", " + _0xcca26c + ")";
}
function hexToRgb(_0x35cee1) {
  const _0x2c2bbf = _0x35cee1["replace"]("#", ""), _0x3e81af = parseInt(_0x2c2bbf["length"] === 3 ? _0x2c2bbf["replace"](/(.)/g, "$1$1") : _0x2c2bbf, 16);
  return [_0x3e81af >> 16 & 255, _0x3e81af >> 8 & 255, _0x3e81af & 255];
}
function compareCategoryKeys(_0x33655f, _0x35368e) {
  const _0x105a17 = Number(_0x33655f), _0x2c1023 = Number(_0x35368e), _0x1567fe = Number["isFinite"](_0x105a17) && String(_0x105a17) === _0x33655f, _0x1537c6 = Number["isFinite"](_0x2c1023) && String(_0x2c1023) === _0x35368e;
  if (_0x1567fe && _0x1537c6) return _0x105a17 - _0x2c1023;
  return _0x33655f < _0x35368e ? -1 : _0x33655f > _0x35368e ? 1 : 0;
}
const INTEGER_RELATIVE_TOLERANCE = 1e-12;
function formatLegendNumber(_0x5032a2) {
  if (_0x5032a2 === void 0) return "?";
  const _0x3f1e9f = Math["round"](_0x5032a2), _0x25d725 = INTEGER_RELATIVE_TOLERANCE * Math["max"](1, Math["abs"](_0x5032a2));
  return Math["abs"](_0x5032a2 - _0x3f1e9f) <= _0x25d725 ? String(_0x3f1e9f) : _0x5032a2["toFixed"](2);
}
const DEFAULT_FILL_COLOR = "#1ecfb0", GRADIENT_PALETTES = [{ "value": "Viridis", "label": "Viridis", "colors": ["#440154", "#3b528b", "#21918c", "#5ec962", "#fde725"] }, { "value": "Plasma", "label": "Plasma", "colors": ["#0d0887", "#6a00a8", "#b12a90", "#e16462", "#fca636", "#f0f921"] }, { "value": "Magma", "label": "Magma", "colors": ["#000004", "#3b0f70", "#8c2981", "#de4968", "#fe9f6d", "#fcfdbf"] }, { "value": "Inferno", "label": "Inferno", "colors": ["#000004", "#420a68", "#932667", "#dd513a", "#fca50a", "#fcffa4"] }, { "value": "Cividis", "label": "Cividis", "colors": ["#00224e", "#123570", "#3b496c", "#575d6d", "#88892a", "#fee838"] }, { "value": "Turbo", "label": "Turbo", "colors": ["#30123b", "#4145ab", "#4675ed", "#39a2fc", "#1bcfd4", "#24eca6", "#61fc6c", "#a4fc3b", "#d1e834", "#f3c63a", "#fe9b2d", "#f36315", "#d93806", "#b11901", "#7a0403"] }, { "value": "Blues", "label": "Blues", "colors": ["#f7fbff", "#c6dbef", "#6baed6", "#3182bd", "#08519c"] }, { "value": "Greens", "label": "Greens", "colors": ["#f7fcf5", "#c7e9c0", "#74c476", "#31a354", "#006d2c"] }, { "value": "Oranges", "label": "Oranges", "colors": ["#fff5eb", "#fdd0a2", "#f16913", "#d94801", "#7f2704"] }, { "value": "Reds", "label": "Reds", "colors": ["#fff5f0", "#fcbba1", "#fb6a4a", "#cb181d", "#67000d"] }, { "value": "Purples", "label": "Purples", "colors": ["#fcfbfd", "#dadaeb", "#9e9ac8", "#6a51a3", "#3f007d"] }, { "value": "YlOrRd", "label": "YlOrRd", "colors": ["#ffffcc", "#fed976", "#fd8d3c", "#e31a1c", "#800026"] }, { "value": "YlGnBu", "label": "YlGnBu", "colors": ["#ffffd9", "#c7e9b4", "#41b6c4", "#225ea8", "#081d58"] }, { "value": "Spectral", "label": "Spectral", "colors": ["#9e0142", "#f46d43", "#fee08b", "#ffffbf", "#e6f598", "#66c2a5", "#5e4fa2"] }, { "value": "RdYlGn", "label": "RdYlGn", "colors": ["#a50026", "#f46d43", "#ffffbf", "#a6d96a", "#006837"] }, { "value": "RdYlBu", "label": "RdYlBu", "colors": ["#a50026", "#f46d43", "#ffffbf", "#74add1", "#313695"] }, { "value": "BrBG", "label": "BrBG", "colors": ["#543005", "#bf812d", "#f6e8c3", "#c7eae5", "#35978f", "#003c30"] }, { "value": "RdBu", "label": "RdBu", "colors": ["#67001f", "#d6604d", "#f7f7f7", "#4393c3", "#2166ac"] }, { "value": "PiYG", "label": "PiYG", "colors": ["#8e0152", "#de77ae", "#f7f7f7", "#7fbc41", "#276419"] }, { "value": "Set2", "label": "Set2", "colors": ["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854", "#ffd92f", "#e5c494", "#b3b3b3"] }, { "value": "Set3", "label": "Set3", "colors": ["#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462", "#b3de69", "#fccde5"] }, { "value": "Tableau10", "label": "Tableau10", "colors": ["#4e79a7", "#f28e2b", "#e15759", "#76b7b2", "#59a14f", "#edc948", "#b07aa1", "#ff9da7", "#9c755f", "#bab0ac"] }, { "value": "Dark2", "label": "Dark2", "colors": ["#1b9e77", "#d95f02", "#7570b3", "#e7298a", "#66a61e", "#e6ab02", "#a6761d", "#666666"] }, { "value": "Paired", "label": "Paired", "colors": ["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99", "#e31a1c", "#fdbf6f", "#ff7f00"] }, { "value": "Accent", "label": "Accent", "colors": ["#7fc97f", "#beaed4", "#fdc086", "#ffff99", "#386cb0", "#f0027f", "#bf5b17", "#666666"] }], DEFAULT_GRADIENT_PALETTE = GRADIENT_PALETTES[0]["value"], PALETTE_KIND = { "Viridis": "sequential", "Plasma": "sequential", "Magma": "sequential", "Inferno": "sequential", "Cividis": "sequential", "Turbo": "sequential", "Blues": "sequential", "Greens": "sequential", "Oranges": "sequential", "Reds": "sequential", "Purples": "sequential", "YlOrRd": "sequential", "YlGnBu": "sequential", "Spectral": "diverging", "RdYlGn": "diverging", "RdYlBu": "diverging", "BrBG": "diverging", "RdBu": "diverging", "PiYG": "diverging", "Set2": "qualitative", "Set3": "qualitative", "Tableau10": "qualitative", "Dark2": "qualitative", "Paired": "qualitative", "Accent": "qualitative" };
function paletteKindOf(_0x789dd5) {
  return PALETTE_KIND[_0x789dd5] ?? "sequential";
}
function sanitizeNumericInput(_0x409fcf, _0x34d830) {
  const _0x549c93 = _0x34d830 && _0x409fcf["trimStart"]()["startsWith"]("-");
  let _0x15ae5c = _0x409fcf["replace"](/[^0-9.]/g, "");
  const _0x237b4e = _0x15ae5c["indexOf"](".");
  _0x237b4e !== -1 && (_0x15ae5c = _0x15ae5c["slice"](0, _0x237b4e + 1) + _0x15ae5c["slice"](_0x237b4e + 1)["replace"](/\./g, ""));
  const _0x442def = _0x15ae5c["indexOf"]("."), _0x1c8750 = _0x442def === -1 ? _0x15ae5c : _0x15ae5c["slice"](0, _0x442def), _0x403c21 = _0x442def === -1 ? "" : _0x15ae5c["slice"](_0x442def), _0x3459cb = _0x1c8750["replace"](/^0+(?=\d)/, "");
  return (_0x549c93 ? "-" : "") + _0x3459cb + _0x403c21;
}
function checkGradientBound(_0x3a076a, _0x42fb61, _0x36ede4, _0x411afe) {
  if (_0x3a076a === "") return { "valid": !![], "message": "" };
  const _0x5a1db0 = Number(_0x3a076a);
  if (!Number["isFinite"](_0x5a1db0)) return { "valid": ![], "message": "" };
  if (_0x411afe && (_0x5a1db0 < _0x411afe["min"] || _0x5a1db0 > _0x411afe["max"])) return { "valid": ![], "message": "Değer " + formatLegendNumber(_0x411afe["min"]) + " ile " + formatLegendNumber(_0x411afe["max"]) + " arasında olmalı." };
  const _0x391ae4 = _0x36ede4 === "" ? Number["NaN"] : Number(_0x36ede4);
  if (Number["isFinite"](_0x391ae4)) {
    if (_0x42fb61 === "min" && _0x5a1db0 > _0x391ae4) return { "valid": ![], "message": "Min, Max değerinden (" + formatLegendNumber(_0x391ae4) + ") büyük olamaz." };
    if (_0x42fb61 === "max" && _0x5a1db0 < _0x391ae4) return { "valid": ![], "message": "Max, Min değerinden (" + formatLegendNumber(_0x391ae4) + ") küçük olamaz." };
  }
  return { "valid": !![], "message": "" };
}
function computeMinMax(_0x3308c7, _0x1cf9f9, _0x25dbdc) {
  const _0x55fe8a = {};
  if (_0x3308c7 !== "") {
    const _0x32bbcc = Number(_0x3308c7);
    _0x55fe8a["min"] = _0x25dbdc && Number["isFinite"](_0x32bbcc) ? Math["max"](_0x32bbcc, _0x25dbdc["min"]) : _0x32bbcc;
  }
  if (_0x1cf9f9 !== "") {
    const _0x1dc78d = Number(_0x1cf9f9);
    _0x55fe8a["max"] = _0x25dbdc && Number["isFinite"](_0x1dc78d) ? Math["min"](_0x1dc78d, _0x25dbdc["max"]) : _0x1dc78d;
  }
  return _0x55fe8a["min"] !== void 0 && _0x55fe8a["max"] !== void 0 && _0x55fe8a["min"] > _0x55fe8a["max"] && (_0x55fe8a["min"] = _0x55fe8a["max"]), _0x55fe8a;
}
function buildFillStyle(_0x5215a1) {
  const _0x9a2b0b = _0x5215a1["fillOpacityPercent"] / 100;
  switch (_0x5215a1["colorMode"]) {
    case "solid":
      return { "mode": "solid", "color": _0x5215a1["fillColor"], "opacity": _0x9a2b0b };
    case "gradient":
      return { "mode": "gradient", "column": _0x5215a1["dataColumn"], "palette": _0x5215a1["paletteColors"], "paletteKind": _0x5215a1["paletteKind"], ...computeMinMax(_0x5215a1["gradientMin"], _0x5215a1["gradientMax"], _0x5215a1["columnRange"]), "opacity": _0x9a2b0b };
    case "bin":
      return { "mode": "bin", "column": _0x5215a1["dataColumn"], "palette": _0x5215a1["paletteColors"], "paletteKind": _0x5215a1["paletteKind"], "binCount": _0x5215a1["binCount"], ...computeMinMax(_0x5215a1["gradientMin"], _0x5215a1["gradientMax"], _0x5215a1["columnRange"]), "opacity": _0x9a2b0b };
    case "enum":
      return { "mode": "enum", "column": _0x5215a1["dataColumn"], "colors": _0x5215a1["categoryColors"], "opacity": _0x9a2b0b };
    case "off":
    default:
      return { "mode": "off" };
  }
}
function sortCategoryValues(_0x2f0c58, _0x22e219) {
  if (_0x22e219 === "source") return _0x2f0c58;
  const _0x7d4889 = [..._0x2f0c58]["sort"]((_0x4f5c4b, _0x24bf58) => compareCategoryKeys(String(_0x4f5c4b), String(_0x24bf58)));
  return _0x22e219 === "desc" ? _0x7d4889["reverse"]() : _0x7d4889;
}
function autoFillCategoryColors(_0x518582, _0x556c64, _0x3a7627) {
  const _0x390373 = {};
  return _0x518582["forEach"]((_0x39ccb4, _0x6104d0) => {
    const _0x3f433b = String(_0x39ccb4);
    _0x390373[_0x3f433b] = _0x556c64[_0x3f433b] ?? _0x3a7627[_0x6104d0 % _0x3a7627["length"]] ?? DEFAULT_FILL_COLOR;
  }), _0x390373;
}
function arraysEqual(_0x4d22ce, _0x12e0d9) {
  return _0x4d22ce["length"] === _0x12e0d9["length"] && _0x4d22ce["every"]((_0x15c942, _0x39e296) => _0x15c942 === _0x12e0d9[_0x39e296]);
}
function findPaletteName(_0x2682a1) {
  for (const _0x2a7538 of GRADIENT_PALETTES) {
    if (arraysEqual(_0x2a7538["colors"], _0x2682a1)) return { "name": _0x2a7538["value"], "reversed": ![] };
    if (arraysEqual([..._0x2a7538["colors"]]["reverse"](), _0x2682a1)) return { "name": _0x2a7538["value"], "reversed": !![] };
  }
  return void 0;
}
function toHexColor(_0x326a04) {
  const _0x5b4be0 = /hsl\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*\)/["exec"](_0x326a04);
  if (!_0x5b4be0) return _0x326a04["startsWith"]("#") ? _0x326a04 : "#000000";
  const _0x15eaa6 = Number(_0x5b4be0[1]), _0x5591b6 = Number(_0x5b4be0[2]) / 100, _0x378354 = Number(_0x5b4be0[3]) / 100, _0x4e347e = (1 - Math["abs"](2 * _0x378354 - 1)) * _0x5591b6, _0x2cd210 = _0x4e347e * (1 - Math["abs"](_0x15eaa6 / 60 % 2 - 1)), _0x2ac5b8 = _0x378354 - _0x4e347e / 2, _0x28dbc5 = [[_0x4e347e, _0x2cd210, 0], [_0x2cd210, _0x4e347e, 0], [0, _0x4e347e, _0x2cd210], [0, _0x2cd210, _0x4e347e], [_0x2cd210, 0, _0x4e347e], [_0x4e347e, 0, _0x2cd210]], [_0x430894, _0x20fc73, _0x2751da] = _0x28dbc5[Math["min"](5, Math["floor"](_0x15eaa6 / 60))] ?? _0x28dbc5[0], _0x11f69d = (_0x2d83d6) => Math["round"]((_0x2d83d6 + _0x2ac5b8) * 255)["toString"](16)["padStart"](2, "0");
  return "#" + _0x11f69d(_0x430894) + _0x11f69d(_0x20fc73) + _0x11f69d(_0x2751da);
}
function restoreRangeFields(_0x17610c) {
  const _0x2a35ad = findPaletteName(_0x17610c["palette"]);
  return { "dataColumn": _0x17610c["column"], ..._0x2a35ad && { "gradientPalette": _0x2a35ad["name"], "paletteReversed": _0x2a35ad["reversed"] }, "gradientMin": _0x17610c["min"] !== void 0 ? String(_0x17610c["min"]) : "", "gradientMax": _0x17610c["max"] !== void 0 ? String(_0x17610c["max"]) : "", ..._0x17610c["mode"] === "bin" && { "binCount": String(_0x17610c["binCount"]) } };
}
function restoreEnumFields(_0x1b6aed) {
  const _0x40080f = Object["keys"](_0x1b6aed["colors"])["map"]((_0x3b7b60) => {
    const _0x1d80e4 = Number(_0x3b7b60);
    return Number["isFinite"](_0x1d80e4) && String(_0x1d80e4) === _0x3b7b60 ? _0x1d80e4 : _0x3b7b60;
  });
  return { "dataColumn": _0x1b6aed["column"], "categoryColors": { ..._0x1b6aed["colors"] }, "categoryValues": _0x40080f };
}
function restoreFillFields(_0x10481b) {
  if ((_0x10481b == null ? void 0 : _0x10481b["mode"]) === "gradient" || (_0x10481b == null ? void 0 : _0x10481b["mode"]) === "bin") return restoreRangeFields(_0x10481b);
  if ((_0x10481b == null ? void 0 : _0x10481b["mode"]) === "enum") return restoreEnumFields(_0x10481b);
  return {};
}
function deriveStyleEditorState(_0x55cf3c, _0x7b27e2, _0xd679ed, _0x15a5d7) {
  const _0x4dc18a = (_0x55cf3c == null ? void 0 : _0x55cf3c["fill"]["mode"]) === "solid" ? _0x55cf3c["fill"] : void 0, _0x419231 = _0x7b27e2 ? toHexColor(_0x7b27e2) : DEFAULT_FILL_COLOR, _0x36312b = _0xd679ed !== void 0 ? Math["round"](_0xd679ed * 100) : _0x15a5d7["fillOpacity"];
  return { "colorMode": (_0x55cf3c == null ? void 0 : _0x55cf3c["fill"]["mode"]) ?? _0x15a5d7["colorMode"], "fillColor": _0x4dc18a ? toHexColor(_0x4dc18a["color"]) : _0x419231, "fillOpacity": _0x4dc18a ? Math["round"](_0x4dc18a["opacity"] * 100) : _0x36312b, "dataColumn": "", "gradientPalette": DEFAULT_GRADIENT_PALETTE, "paletteReversed": ![], "gradientMin": "", "gradientMax": "", "binCount": _0x15a5d7["binCount"], "categoryColors": {}, "categoryValues": [], ...restoreFillFields(_0x55cf3c == null ? void 0 : _0x55cf3c["fill"]), "outlineEnabled": (_0x55cf3c == null ? void 0 : _0x55cf3c["outline"]["enabled"]) ?? _0x15a5d7["outlineEnabled"], "outlineColor": _0x55cf3c ? toHexColor(_0x55cf3c["outline"]["color"]) : _0x15a5d7["outlineColor"], "outlineWidth": _0x55cf3c !== void 0 ? String(_0x55cf3c["outline"]["width"]) : _0x15a5d7["outlineWidth"] };
}
const GRADIENT_LEGEND_STEPS = 7;
function gradientLegendRows(_0x5395d3, _0x554a6b, _0x5cd6d8, _0x1657f4 = GRADIENT_LEGEND_STEPS) {
  return Array["from"]({ "length": _0x1657f4 }, (_0x2be1dc, _0x1bce2f) => {
    const _0x3899e6 = _0x1657f4 <= 1 ? 1 : 1 - _0x1bce2f / (_0x1657f4 - 1), _0x2ecbda = _0x5395d3 + _0x3899e6 * (_0x554a6b - _0x5395d3);
    return { "color": _0x5cd6d8(_0x3899e6), "label": formatLegendNumber(_0x2ecbda) };
  });
}
function binLegendRows(_0x30c0fc, _0x273201, _0x276aba, _0x1f632b) {
  const _0x712ac2 = (_0x273201 - _0x30c0fc) / _0x276aba;
  return Array["from"]({ "length": _0x276aba }, (_0x488982, _0x58db72) => {
    const _0x2bf938 = _0x30c0fc + _0x712ac2 * _0x58db72, _0x58c03c = _0x30c0fc + _0x712ac2 * (_0x58db72 + 1), _0x1fbaad = _0x276aba <= 1 ? 0.5 : _0x58db72 / (_0x276aba - 1);
    return { "color": _0x1f632b(_0x1fbaad), "label": formatLegendNumber(_0x2bf938) + " – " + formatLegendNumber(_0x58c03c) };
  });
}
class TimerBag {
  constructor(_0x3e4cc2) {
    this["_timeoutIds"] = /* @__PURE__ */ new Set(), this["_frameIds"] = /* @__PURE__ */ new Set(), _0x3e4cc2["addController"](this);
  }
  ["hostDisconnected"]() {
    for (const _0xfd4c34 of this["_timeoutIds"]) window["clearTimeout"](_0xfd4c34);
    this["_timeoutIds"]["clear"]();
    for (const _0x217315 of this["_frameIds"]) cancelAnimationFrame(_0x217315);
    this["_frameIds"]["clear"]();
  }
  ["setTimeout"](_0x2768fe, _0x4c85e1) {
    const _0x32d361 = window["setTimeout"](() => {
      this["_timeoutIds"]["delete"](_0x32d361), _0x2768fe();
    }, _0x4c85e1);
    return this["_timeoutIds"]["add"](_0x32d361), _0x32d361;
  }
  ["clearTimeout"](_0x5be95b) {
    if (_0x5be95b === null) return;
    window["clearTimeout"](_0x5be95b), this["_timeoutIds"]["delete"](_0x5be95b);
  }
  ["requestAnimationFrame"](_0x43e02d) {
    const _0x521336 = requestAnimationFrame(() => {
      this["_frameIds"]["delete"](_0x521336), _0x43e02d();
    });
    return this["_frameIds"]["add"](_0x521336), _0x521336;
  }
  ["cancelAnimationFrame"](_0x5e724a) {
    if (_0x5e724a === null) return;
    cancelAnimationFrame(_0x5e724a), this["_frameIds"]["delete"](_0x5e724a);
  }
}
const DEFAULT_BIN_COUNT = "5", FILL_COLOR_MODES = [{ "value": "solid", "label": "Sabit Renk" }, { "value": "gradient", "label": "Sürekli (Gradient)" }, { "value": "bin", "label": "Kesikli (Bin)" }, { "value": "enum", "label": "Kategorik (Enum)" }, { "value": "off", "label": "Kapalı" }], CATEGORY_SORT_OPTIONS = [{ "value": "asc", "label": "Artan (eskiden yeniye)" }, { "value": "desc", "label": "Azalan (yeniden eskiye)" }, { "value": "source", "label": "Verideki sıra" }], editStartValues = /* @__PURE__ */ new WeakMap();
function onBoundInput(_0xe5b310, _0x2c4de8, _0x35b86e) {
  const _0x422b77 = _0x35b86e["target"];
  !editStartValues["has"](_0x422b77) && editStartValues["set"](_0x422b77, _0x2c4de8 === "min" ? _0xe5b310["gradientMin"] : _0xe5b310["gradientMax"]);
  const _0x487ab5 = sanitizeNumericInput(_0x422b77["value"], _0x2c4de8 === "min" ? _0xe5b310["allowNegativeMin"]() : _0xe5b310["allowNegativeMax"]());
  if (_0x422b77["value"] !== _0x487ab5) _0x422b77["value"] = _0x487ab5;
  const _0x11f530 = _0xe5b310["checkGradientBound"](_0x2c4de8, _0x487ab5);
  setBoundError(_0xe5b310, _0x2c4de8, _0x11f530["message"]);
  if (!_0x11f530["valid"]) return;
  setBound(_0xe5b310, _0x2c4de8, _0x487ab5), _0xe5b310["scheduleApplyStyle"]();
}
function commitBound(_0x24a6e6, _0x5490d0, _0x4b4474) {
  const _0x18ba08 = _0x4b4474["target"], _0x2acd9e = editStartValues["get"](_0x18ba08);
  editStartValues["delete"](_0x18ba08), setBoundError(_0x24a6e6, _0x5490d0, "");
  if (_0x24a6e6["checkGradientBound"](_0x5490d0, _0x18ba08["value"])["valid"]) return;
  const _0x39237e = _0x5490d0 === "min" ? _0x24a6e6["gradientMin"] : _0x24a6e6["gradientMax"], _0x4d1946 = _0x2acd9e ?? _0x39237e;
  if (_0x18ba08["value"] !== _0x4d1946) _0x18ba08["value"] = _0x4d1946;
  _0x39237e !== _0x4d1946 && (setBound(_0x24a6e6, _0x5490d0, _0x4d1946), _0x24a6e6["scheduleApplyStyle"]());
}
function setBound(_0x3791e0, _0x533ae0, _0x4beeeb) {
  if (_0x533ae0 === "min") _0x3791e0["gradientMin"] = _0x4beeeb;
  else _0x3791e0["gradientMax"] = _0x4beeeb;
}
function setBoundError(_0xb41ada, _0x2acb2c, _0x2c020e) {
  if (_0x2acb2c === "min") _0xb41ada["gradientMinError"] = _0x2c020e;
  else _0xb41ada["gradientMaxError"] = _0x2c020e;
}
const onBoundKeydown = (_0x5f07d8, _0x2c7de7, _0xb84db) => {
  if (_0xb84db["key"] === "Enter") commitBound(_0x5f07d8, _0x2c7de7, _0xb84db);
};
function renderMinMaxFields(_0x5dde3c) {
  return _0x5dde3c["colorMode"] === "gradient" ? b`
        <div style="display:flex; flex-direction:column; gap:0.75rem;">
          <div>
            <span class="field-label">Min</span>
            <cds-text-input
              size="sm"
              label="Min"
              hide-label
              placeholder="Otomatik"
              .value=${_0x5dde3c["gradientMin"]}
              .invalid=${_0x5dde3c["gradientMinError"] !== ""}
              .invalidText=${_0x5dde3c["gradientMinError"]}
              @input=${(_0x9eddba) => onBoundInput(_0x5dde3c, "min", _0x9eddba)}
              @keydown=${(_0x7869c) => onBoundKeydown(_0x5dde3c, "min", _0x7869c)}
              @focusout=${(_0x581393) => commitBound(_0x5dde3c, "min", _0x581393)}
            ></cds-text-input>
          </div>
          <div>
            <span class="field-label">Max</span>
            <cds-text-input
              size="sm"
              label="Max"
              hide-label
              placeholder="Otomatik"
              .value=${_0x5dde3c["gradientMax"]}
              .invalid=${_0x5dde3c["gradientMaxError"] !== ""}
              .invalidText=${_0x5dde3c["gradientMaxError"]}
              @input=${(_0x26d246) => onBoundInput(_0x5dde3c, "max", _0x26d246)}
              @keydown=${(_0x44d392) => onBoundKeydown(_0x5dde3c, "max", _0x44d392)}
              @focusout=${(_0x17acf7) => commitBound(_0x5dde3c, "max", _0x17acf7)}
            ></cds-text-input>
          </div>
        </div>
      ` : "";
}
const isValidBinCount = (_0x3f7dbc) => /^[1-9]$/["test"](_0x3f7dbc);
function onBinCountInput(_0x1f2abb, _0x3e85ac) {
  const _0x30fa3c = _0x3e85ac["currentTarget"];
  if (!editStartValues["has"](_0x30fa3c)) editStartValues["set"](_0x30fa3c, _0x1f2abb["binCount"]);
  const _0x4a3e71 = _0x30fa3c["value"], _0x58ca8d = _0x4a3e71["replace"](/\D/g, "")["replace"](/^0+(?=\d)/, "");
  if (_0x4a3e71 !== _0x58ca8d) _0x30fa3c["value"] = _0x58ca8d;
  isValidBinCount(_0x58ca8d) && _0x58ca8d !== _0x1f2abb["binCount"] && (_0x1f2abb["binCount"] = _0x58ca8d, _0x1f2abb["scheduleApplyStyle"]());
}
function onBinCountStep(_0x33c84c, _0x4b14bf) {
  if (!_0x4b14bf["detail"]["direction"]) return;
  const _0x2b3aea = String(Math["round"](Number(_0x4b14bf["detail"]["value"])));
  isValidBinCount(_0x2b3aea) && _0x2b3aea !== _0x33c84c["binCount"] && (_0x33c84c["binCount"] = _0x2b3aea, _0x33c84c["scheduleApplyStyle"]());
}
function commitBinCount(_0x3215c0, _0x11fac4) {
  const _0x360049 = _0x11fac4["currentTarget"], _0x59f720 = editStartValues["get"](_0x360049);
  editStartValues["delete"](_0x360049);
  if (isValidBinCount(_0x360049["value"])) return;
  const _0x10e231 = _0x59f720 ?? _0x3215c0["binCount"];
  _0x360049["value"] = _0x10e231, _0x3215c0["binCount"] !== _0x10e231 && (_0x3215c0["binCount"] = _0x10e231, _0x3215c0["scheduleApplyStyle"]());
}
function renderBinCountField(_0x444256) {
  return _0x444256["colorMode"] === "bin" ? b`
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
            .value=${_0x444256["binCount"]}
            @input=${(_0x352cad) => onBinCountInput(_0x444256, _0x352cad)}
            @cds-number-input=${(_0x240a3a) => onBinCountStep(_0x444256, _0x240a3a)}
            @keydown=${(_0x6d1cb1) => {
    if (_0x6d1cb1["key"] === "Enter") commitBinCount(_0x444256, _0x6d1cb1);
  }}
            @focusout=${(_0x47fde1) => commitBinCount(_0x444256, _0x47fde1)}
          ></cds-number-input>
        </div>
      ` : "";
}
function renderEnumFields(_0x26b761) {
  return _0x26b761["colorMode"] === "enum" ? b`
        <div>
          <span class="field-label">Kategori Sırası</span>
          <cds-dropdown
            size="sm"
            label="Seçiniz"
            .value=${_0x26b761["categorySort"]}
            @cds-dropdown-selected=${(_0x356552) => {
    _0x26b761["categorySort"] = _0x356552["detail"]["item"]["value"], _0x26b761["categoryValues"] = _0x26b761["sortCategoryValues"](_0x26b761["categoryValues"]);
  }}
          >
            ${CATEGORY_SORT_OPTIONS["map"]((_0xa3d6cf) => b`<cds-dropdown-item value=${_0xa3d6cf["value"]}>${_0xa3d6cf["label"]}</cds-dropdown-item>`)}
          </cds-dropdown>
        </div>

        <div>
          <cds-checkbox
            .checked=${_0x26b761["paletteReversed"]}
            label-text="Paleti ters çevir"
            @cds-checkbox-changed=${(_0x2cd4a9) => {
    var _a2;
    _0x26b761["paletteReversed"] = ((_a2 = _0x2cd4a9["detail"]) == null ? void 0 : _a2["checked"]) ?? !_0x26b761["paletteReversed"], _0x26b761["categoryColors"] = _0x26b761["autoFillCategoryColors"](_0x26b761["categoryValues"], {}), _0x26b761["scheduleApplyStyle"]();
  }}
          ></cds-checkbox>
        </div>
      ` : "";
}
function renderSolidSwatchField(_0x4fbac2) {
  return _0x4fbac2["colorMode"] === "solid" ? b`
        <div>
          <span class="field-label">Renk Paleti</span>
          <span class="color-swatch" style="background:${_0x4fbac2["fillColor"]}">
            <input
              type="color"
              .value=${_0x4fbac2["fillColor"]}
              aria-label="Dolgu rengi"
              @input=${(_0x1d0bd5) => {
    _0x4fbac2["fillColor"] = _0x1d0bd5["target"]["value"], _0x4fbac2["scheduleApplyStyle"]();
  }}
            />
          </span>
        </div>
      ` : "";
}
function renderOpacityField(_0x4e5099) {
  return _0x4e5099["colorMode"] === "off" ? "" : b`
        <div style="margin-top: 8px">
          <span class="field-label">Opaklık (${_0x4e5099["fillOpacity"]}%)</span>
          <input
            type="range"
            class="opacity-slider"
            min="0"
            max="100"
            step="1"
            .value=${String(_0x4e5099["fillOpacity"])}
            style="--fill: ${_0x4e5099["fillOpacity"]}%"
            @input=${(_0x5a51f1) => {
    const _0x5026c5 = _0x5a51f1["target"], _0xa12575 = Number(_0x5026c5["value"]);
    _0x4e5099["updateOpacitySlider"](_0x5026c5, _0xa12575), _0x4e5099["setFillOpacity"](_0xa12575);
  }}
          />
        </div>
      `;
}
function renderColorModeField(_0x161e69) {
  return _0x161e69["isFixedSolidLayer"] ? "" : b`
        <div>
          <span class="field-label">Renk Modu</span>
          <cds-dropdown
            size="sm"
            label="Seçiniz"
            .value=${_0x161e69["colorMode"]}
            @cds-dropdown-selected=${(_0x30bdcc) => {
    _0x161e69["colorMode"] = _0x30bdcc["detail"]["item"]["value"];
    const _0x389742 = _0x161e69["colorMode"] === "gradient" || _0x161e69["colorMode"] === "bin" ? _0x161e69["numericDataColumns"] : _0x161e69["dataColumns"];
    _0x161e69["dataColumn"] && !_0x389742["includes"](_0x161e69["dataColumn"]) && (_0x161e69["dataColumn"] = "");
    if (_0x161e69["dataColumn"]) _0x161e69["onDataColumnChange"](_0x161e69["dataColumn"]);
    else _0x161e69["scheduleApplyStyle"]();
  }}
          >
            ${FILL_COLOR_MODES["map"]((_0x3c0712) => b`<cds-dropdown-item value=${_0x3c0712["value"]}>${_0x3c0712["label"]}</cds-dropdown-item>`)}
          </cds-dropdown>
        </div>
      `;
}
function renderDataFields(_0x941ff3) {
  const _0x3d9040 = _0x941ff3["colorMode"] === "gradient" || _0x941ff3["colorMode"] === "bin" ? _0x941ff3["numericDataColumns"] : _0x941ff3["dataColumns"];
  return _0x941ff3["colorMode"] === "gradient" || _0x941ff3["colorMode"] === "bin" || _0x941ff3["colorMode"] === "enum" ? b`
        <div>
          <span class="field-label">Veri Sütunu</span>
          <cds-dropdown
            size="sm"
            label="Seçiniz"
            .value=${_0x941ff3["dataColumn"]}
            @cds-dropdown-selected=${(_0x212c0c) => {
    _0x941ff3["onDataColumnChange"](_0x212c0c["detail"]["item"]["value"]);
  }}
          >
            ${_0x3d9040["map"]((_0x35d865) => b`<cds-dropdown-item value=${_0x35d865}>${_0x35d865}</cds-dropdown-item>`)}
          </cds-dropdown>
        </div>

        <div>
          <span class="field-label">Renk Paleti</span>
          <div class="palette-dropdown-wrap">
            <cds-dropdown
              size="sm"
              label="Seçiniz"
              .value=${_0x941ff3["gradientPalette"]}
              @cds-dropdown-selected=${(_0x239fb1) => {
    _0x941ff3["gradientPalette"] = _0x239fb1["detail"]["item"]["value"], _0x941ff3["colorMode"] === "enum" && _0x941ff3["categoryValues"]["length"] > 0 && (_0x941ff3["categoryColors"] = _0x941ff3["autoFillCategoryColors"](_0x941ff3["categoryValues"], {})), _0x941ff3["scheduleApplyStyle"]();
  }}
            >
              ${GRADIENT_PALETTES["map"]((_0x7122c0) => b`
                  <cds-dropdown-item value=${_0x7122c0["value"]} title=${_0x7122c0["label"]}>
                    <span
                      class="palette-swatch"
                      aria-label=${_0x7122c0["label"]}
                      style="background: linear-gradient(to right, ${_0x7122c0["colors"]["join"](", ")})"
                    ></span>
                  </cds-dropdown-item>
                `)}
            </cds-dropdown>
            <span
              class="palette-selected-preview"
              style="background: linear-gradient(to right, ${(GRADIENT_PALETTES["find"]((_0x49de74) => _0x49de74["value"] === _0x941ff3["gradientPalette"]) ?? GRADIENT_PALETTES[0])["colors"]["join"](", ")})"
            ></span>
          </div>
        </div>

        ${renderMinMaxFields(_0x941ff3)}
        ${renderBinCountField(_0x941ff3)}
        ${renderEnumFields(_0x941ff3)}
      ` : renderSolidSwatchField(_0x941ff3);
}
function renderFillCard(_0x1e78a2) {
  return b`
    <div class="card">
      <span class="card-title">Dolgu</span>

      ${renderColorModeField(_0x1e78a2)}

      ${renderDataFields(_0x1e78a2)}

      ${renderOpacityField(_0x1e78a2)}
    </div>
  `;
}
var __defProp$w = Object["defineProperty"], __getOwnPropDesc$x = Object["getOwnPropertyDescriptor"], __decorateClass$x = (_0xd380f3, _0x39f4cf, _0x2fd5c6, _0x112575) => {
  var _0x2d33bc = _0x112575 > 1 ? void 0 : _0x112575 ? __getOwnPropDesc$x(_0x39f4cf, _0x2fd5c6) : _0x39f4cf;
  for (var _0x512f07 = _0xd380f3["length"] - 1, _0x582a0f; _0x512f07 >= 0; _0x512f07--) if (_0x582a0f = _0xd380f3[_0x512f07]) _0x2d33bc = (_0x112575 ? _0x582a0f(_0x39f4cf, _0x2fd5c6, _0x2d33bc) : _0x582a0f(_0x2d33bc)) || _0x2d33bc;
  if (_0x112575 && _0x2d33bc) __defProp$w(_0x39f4cf, _0x2fd5c6, _0x2d33bc);
  return _0x2d33bc;
};
const SERVICE_LAYER_TYPES$1 = ["WMS", "WMTS"], ICON_PALETTE_20 = o$1(iconNodeToString(_20_default$3)), ICON_RENEW$1 = o$1(iconNodeToString(_16_default$c)), ICON_CLOSE$6 = o$1(iconNodeToString(_16_default$v)), DEFAULT_FILL_OPACITY = 46, FIXED_SOLID_LAYER_FILL_OPACITY = 40, DEFAULT_OUTLINE_ENABLED = !![], DEFAULT_OUTLINE_COLOR = "#1a73e8", DEFAULT_OUTLINE_WIDTH = "2", FIXED_SOLID_LAYER_OUTLINE_WIDTH = "1", LARGE_LAYER_FEATURE_THRESHOLD = 5e3, VISIBLE_LIST_ROWS = 10, TECHNICAL_COLUMN_PATTERN = /^(shape_area|shape_leng|shape_length|shape_len|objectid|fid|gml_id|gid)(_\d+)?$/i, DEFAULT_COLOR_MODE = FILL_COLOR_MODES[0]["value"], DEFAULT_CATEGORY_SORT = CATEGORY_SORT_OPTIONS[0]["value"], STYLE_EDITOR_FORM_DEFAULTS = { "colorMode": DEFAULT_COLOR_MODE, "fillOpacity": DEFAULT_FILL_OPACITY, "outlineEnabled": DEFAULT_OUTLINE_ENABLED, "outlineColor": DEFAULT_OUTLINE_COLOR, "outlineWidth": DEFAULT_OUTLINE_WIDTH, "binCount": DEFAULT_BIN_COUNT };
let TucbsStyleEditor = class extends i$2 {
  constructor() {
    super(...arguments), this["open"] = ![], this["layerId"] = "", this["layerTitle"] = "", this["layerType"] = "", this["customCss"] = "", this["_customCssState"] = { "sheet": null }, this["_colorMode"] = DEFAULT_COLOR_MODE, this["_dataColumn"] = "", this["_dataColumns"] = [], this["_numericDataColumns"] = [], this["_gradientPalette"] = DEFAULT_GRADIENT_PALETTE, this["_gradientMin"] = "", this["_gradientMax"] = "", this["_gradientMinError"] = "", this["_gradientMaxError"] = "", this["_binCount"] = DEFAULT_BIN_COUNT, this["_categorySort"] = DEFAULT_CATEGORY_SORT, this["_paletteReversed"] = ![], this["_categoryValues"] = [], this["_categoryColors"] = {}, this["_fillColor"] = DEFAULT_FILL_COLOR, this["_fillOpacity"] = DEFAULT_FILL_OPACITY, this["_outlineEnabled"] = DEFAULT_OUTLINE_ENABLED, this["_outlineColor"] = DEFAULT_OUTLINE_COLOR, this["_outlineWidth"] = DEFAULT_OUTLINE_WIDTH, this["_serviceStyleRequestId"] = 0, this["_drag"] = new DraggablePanelController(this, { "getPanel": () => this, "ignoreSelector": ".close-btn" }), this["_categoryScroll"] = new VirtualScrollbar(this, () => this["_categoryListEl"], () => this["_categoryThumbEl"]), this["_legendScroll"] = new VirtualScrollbar(this, () => this["_legendListEl"], () => this["_legendThumbEl"]), this["_applyStyleRaf"] = null, this["_fillOpacityRaf"] = null, this["_timers"] = new TimerBag(this), this["_onLayerStyle"] = (_0x2571bc) => {
      if (!this["open"] || _0x2571bc["id"] !== this["layerId"]) return;
      const { fill: _0x3e7381 } = _0x2571bc["style"];
      if (_0x3e7381["mode"] === "off") return;
      if (_0x3e7381["mode"] === "solid") this["_fillColor"] = toHexColor(_0x3e7381["color"]);
      this["_fillOpacity"] = Math["round"](_0x3e7381["opacity"] * 100);
    }, this["_fillCardHost"] = new class {
      constructor(_0x5c35da) {
        this["editor"] = _0x5c35da;
      }
      get ["colorMode"]() {
        return this["editor"]["_colorMode"];
      }
      set ["colorMode"](_0x50a407) {
        this["editor"]["_colorMode"] = _0x50a407;
      }
      get ["dataColumn"]() {
        return this["editor"]["_dataColumn"];
      }
      set ["dataColumn"](_0x289557) {
        this["editor"]["_dataColumn"] = _0x289557;
      }
      get ["gradientPalette"]() {
        return this["editor"]["_gradientPalette"];
      }
      set ["gradientPalette"](_0x468889) {
        this["editor"]["_gradientPalette"] = _0x468889;
      }
      get ["gradientMin"]() {
        return this["editor"]["_gradientMin"];
      }
      set ["gradientMin"](_0x5528e9) {
        this["editor"]["_gradientMin"] = _0x5528e9;
      }
      get ["gradientMax"]() {
        return this["editor"]["_gradientMax"];
      }
      set ["gradientMax"](_0x491b65) {
        this["editor"]["_gradientMax"] = _0x491b65;
      }
      get ["gradientMinError"]() {
        return this["editor"]["_gradientMinError"];
      }
      set ["gradientMinError"](_0x10d08b) {
        this["editor"]["_gradientMinError"] = _0x10d08b;
      }
      get ["gradientMaxError"]() {
        return this["editor"]["_gradientMaxError"];
      }
      set ["gradientMaxError"](_0x2044a9) {
        this["editor"]["_gradientMaxError"] = _0x2044a9;
      }
      get ["binCount"]() {
        return this["editor"]["_binCount"];
      }
      set ["binCount"](_0x619359) {
        this["editor"]["_binCount"] = _0x619359;
      }
      get ["categorySort"]() {
        return this["editor"]["_categorySort"];
      }
      set ["categorySort"](_0x321b13) {
        this["editor"]["_categorySort"] = _0x321b13;
      }
      get ["paletteReversed"]() {
        return this["editor"]["_paletteReversed"];
      }
      set ["paletteReversed"](_0x33788c) {
        this["editor"]["_paletteReversed"] = _0x33788c;
      }
      get ["categoryValues"]() {
        return this["editor"]["_categoryValues"];
      }
      set ["categoryValues"](_0x261e18) {
        this["editor"]["_categoryValues"] = _0x261e18;
      }
      get ["categoryColors"]() {
        return this["editor"]["_categoryColors"];
      }
      set ["categoryColors"](_0x139697) {
        this["editor"]["_categoryColors"] = _0x139697;
      }
      get ["fillColor"]() {
        return this["editor"]["_fillColor"];
      }
      set ["fillColor"](_0x462e38) {
        this["editor"]["_fillColor"] = _0x462e38;
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
      ["checkGradientBound"](_0x3e3d69, _0x4b372b) {
        return this["editor"]["_checkGradientBound"](_0x3e3d69, _0x4b372b);
      }
      ["scheduleApplyStyle"]() {
        this["editor"]["_scheduleApplyStyle"]();
      }
      ["sortCategoryValues"](_0x883e3b) {
        return this["editor"]["_sortCategoryValues"](_0x883e3b);
      }
      ["autoFillCategoryColors"](_0xb8de91, _0x323e1d) {
        return this["editor"]["_autoFillCategoryColors"](_0xb8de91, _0x323e1d);
      }
      ["updateOpacitySlider"](_0x1a0c0b, _0x2085b0) {
        this["editor"]["_updateOpacitySlider"](_0x1a0c0b, _0x2085b0);
      }
      ["setFillOpacity"](_0x44ce0f) {
        this["editor"]["_setFillOpacity"](_0x44ce0f);
      }
      ["onDataColumnChange"](_0x2d4eb3) {
        this["editor"]["_onDataColumnChange"](_0x2d4eb3);
      }
    }(this);
  }
  ["disconnectedCallback"]() {
    if (this["layerManager"]) this["layerManager"]["off"]("layer:style", this["_onLayerStyle"]);
    super["disconnectedCallback"]();
  }
  ["updated"](_0x2059c5) {
    _0x2059c5["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_customCssState"], "tucbs-style-editor");
    _0x2059c5["has"]("open") && this["open"] && (this["style"]["removeProperty"]("left"), this["style"]["removeProperty"]("top"), this["style"]["removeProperty"]("transform"));
    if (_0x2059c5["has"]("layerManager")) {
      const _0x177b20 = _0x2059c5["get"]("layerManager");
      if (_0x177b20) _0x177b20["off"]("layer:style", this["_onLayerStyle"]);
      if (this["layerManager"]) this["layerManager"]["on"]("layer:style", this["_onLayerStyle"]);
    }
    this["_timers"]["requestAnimationFrame"](() => {
      TucbsStyleEditor["_fitListToRows"](this["_categoryListEl"], ".legend-bin-row"), TucbsStyleEditor["_fitListToRows"](this["_legendListEl"], ".legend-bin-row"), this["_categoryScroll"]["sync"](), this["_legendScroll"]["sync"]();
    });
  }
  ["openFor"](_0x5994bd, _0x1e9d36, _0x1e163f, _0x259600, _0x891811) {
    var _a2, _b;
    this["layerId"] = _0x5994bd, this["layerTitle"] = _0x1e9d36, this["layerType"] = _0x1e163f, this["_featureCount"] = (_a2 = this["layerManager"]) == null ? void 0 : _a2["getFeatureCount"](_0x5994bd), this["_dataColumns"] = [], this["_numericDataColumns"] = [], this["_categorySort"] = DEFAULT_CATEGORY_SORT;
    const _0x2f3e07 = (_b = this["layerManager"]) == null ? void 0 : _b["getLayerStyle"](_0x5994bd), _0x1340c0 = deriveStyleEditorState(_0x2f3e07, _0x259600, _0x891811, STYLE_EDITOR_FORM_DEFAULTS);
    this["_colorMode"] = _0x1340c0["colorMode"], this["_fillColor"] = _0x1340c0["fillColor"], this["_fillOpacity"] = _0x1340c0["fillOpacity"], this["_dataColumn"] = _0x1340c0["dataColumn"], this["_gradientPalette"] = _0x1340c0["gradientPalette"], this["_paletteReversed"] = _0x1340c0["paletteReversed"], this["_gradientMin"] = _0x1340c0["gradientMin"], this["_gradientMax"] = _0x1340c0["gradientMax"], this["_gradientMinError"] = "", this["_gradientMaxError"] = "", this["_binCount"] = _0x1340c0["binCount"], this["_categoryColors"] = _0x1340c0["categoryColors"], this["_categoryValues"] = this["_sortCategoryValues"](_0x1340c0["categoryValues"]), this["_outlineEnabled"] = _0x1340c0["outlineEnabled"], this["_outlineColor"] = _0x1340c0["outlineColor"], this["_outlineWidth"] = _0x1340c0["outlineWidth"];
    for (const _0x3707db of document["querySelectorAll"]("tucbs-identify-panel")) {
      _0x3707db["close"]();
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
    const _0x40d9cd = (_a2 = this["layerManager"]) == null ? void 0 : _a2["getInitialFillColor"](this["layerId"]);
    this["_fillColor"] = _0x40d9cd ? toHexColor(_0x40d9cd) : DEFAULT_FILL_COLOR, this["_fillOpacity"] = this["_isFixedSolidLayer"] ? FIXED_SOLID_LAYER_FILL_OPACITY : DEFAULT_FILL_OPACITY, this["_outlineEnabled"] = DEFAULT_OUTLINE_ENABLED, this["_outlineColor"] = DEFAULT_OUTLINE_COLOR, this["_outlineWidth"] = this["_isFixedSolidLayer"] ? FIXED_SOLID_LAYER_OUTLINE_WIDTH : DEFAULT_OUTLINE_WIDTH;
    if (!this["_isServiceLayer"]) this["_scheduleApplyStyle"]();
  }
  ["_updateOpacitySlider"](_0xc809ec, _0xe5faba) {
    _0xc809ec["style"]["setProperty"]("--fill", _0xe5faba + "%");
  }
  ["_setFillOpacity"](_0x4959ac) {
    this["_timers"]["cancelAnimationFrame"](this["_fillOpacityRaf"]), this["_fillOpacityRaf"] = this["_timers"]["requestAnimationFrame"](() => {
      this["_fillOpacityRaf"] = null, this["_fillOpacity"] = _0x4959ac, this["_scheduleApplyStyle"]();
    });
  }
  ["_loadDataColumns"]() {
    if (!this["layerManager"] || !this["layerId"]) return;
    const _0x4f6293 = this["layerManager"]["getEntityPropertyNames"](this["layerId"])["filter"]((_0x38015b) => !TECHNICAL_COLUMN_PATTERN["test"](_0x38015b));
    this["_dataColumns"] = _0x4f6293, this["_numericDataColumns"] = _0x4f6293["filter"]((_0xc931c0) => this["layerManager"]["getColumnRange"](this["layerId"], _0xc931c0) !== null);
  }
  ["_onDataColumnChange"](_0x38ab52) {
    this["_dataColumn"] = _0x38ab52;
    if (!this["layerManager"] || !this["layerId"] || !_0x38ab52) return;
    if (this["_colorMode"] === "gradient" || this["_colorMode"] === "bin") {
      const _0x5b6b6a = this["layerManager"]["getColumnRange"](this["layerId"], _0x38ab52);
      this["_gradientMin"] = _0x5b6b6a ? String(_0x5b6b6a["min"]) : "", this["_gradientMax"] = _0x5b6b6a ? String(_0x5b6b6a["max"]) : "", this["_gradientMinError"] = "", this["_gradientMaxError"] = "";
    } else this["_colorMode"] === "enum" && this["_loadCategoryValues"](_0x38ab52);
    this["_scheduleApplyStyle"]();
  }
  ["_checkGradientBound"](_0x31f83d, _0x12ae73) {
    const _0x25409d = this["layerManager"] && this["layerId"] && this["_dataColumn"] ? this["layerManager"]["getColumnRange"](this["layerId"], this["_dataColumn"]) : null, _0x5cc367 = _0x31f83d === "min" ? this["_gradientMax"] : this["_gradientMin"];
    return checkGradientBound(_0x12ae73, _0x31f83d, _0x5cc367, _0x25409d);
  }
  ["_allowNegativeMin"]() {
    if (!this["layerManager"] || !this["layerId"] || !this["_dataColumn"]) return !![];
    const _0x50008f = this["layerManager"]["getColumnRange"](this["layerId"], this["_dataColumn"]);
    return !_0x50008f || _0x50008f["min"] < 0;
  }
  ["_allowNegativeMax"]() {
    if (!this["layerManager"] || !this["layerId"] || !this["_dataColumn"]) return !![];
    const _0x13fa15 = this["layerManager"]["getColumnRange"](this["layerId"], this["_dataColumn"]);
    return !_0x13fa15 || _0x13fa15["max"] < 0;
  }
  ["_sortCategoryValues"](_0x589ef1) {
    if (this["_categorySort"] !== "source") return sortCategoryValues(_0x589ef1, this["_categorySort"]);
    if (!this["layerManager"] || !this["layerId"] || !this["_dataColumn"]) return _0x589ef1;
    const _0x21bf46 = /* @__PURE__ */ new Map();
    this["layerManager"]["getUniqueColumnValues"](this["layerId"], this["_dataColumn"])["forEach"]((_0x5d6449, _0x5ef970) => _0x21bf46["set"](String(_0x5d6449), _0x5ef970));
    const _0x58d34e = (_0x5608e1) => _0x21bf46["get"](String(_0x5608e1)) ?? Number["MAX_SAFE_INTEGER"];
    return [..._0x589ef1]["sort"]((_0x11f071, _0x305410) => _0x58d34e(_0x11f071) - _0x58d34e(_0x305410));
  }
  ["_loadCategoryValues"](_0x10c042) {
    if (!this["layerManager"] || !this["layerId"]) return;
    const _0xa2b262 = this["layerManager"]["getUniqueColumnValues"](this["layerId"], _0x10c042);
    this["_categoryValues"] = this["_sortCategoryValues"](_0xa2b262), this["_categoryColors"] = this["_autoFillCategoryColors"](this["_categoryValues"], this["_categoryColors"]);
  }
  ["_autoFillCategoryColors"](_0x42087f, _0x4e21e2) {
    return autoFillCategoryColors(_0x42087f, _0x4e21e2, this["_activePaletteColors"]());
  }
  static ["_fitListToRows"](_0x17cf38, _0x123c11) {
    if (!_0x17cf38) return;
    const _0x5239a5 = _0x17cf38["querySelectorAll"](_0x123c11);
    if (_0x5239a5["length"] === 0) {
      _0x17cf38["style"]["maxHeight"] = "";
      return;
    }
    const _0x9c3070 = _0x5239a5[0]["getBoundingClientRect"]();
    if (_0x5239a5["length"] === 1) {
      _0x17cf38["style"]["maxHeight"] = _0x9c3070["height"] + "px";
      return;
    }
    const _0x2332bf = _0x5239a5[1]["getBoundingClientRect"](), _0x260c7f = _0x2332bf["top"] - _0x9c3070["top"], _0x3037a0 = _0x9c3070["height"] + _0x260c7f * (VISIBLE_LIST_ROWS - 1);
    _0x17cf38["style"]["maxHeight"] = _0x3037a0 + "px";
  }
  ["_activePaletteColors"]() {
    const _0x4a46d0 = GRADIENT_PALETTES["find"]((_0x26fb04) => _0x26fb04["value"] === this["_gradientPalette"]) ?? GRADIENT_PALETTES[0];
    return this["_paletteReversed"] ? [..._0x4a46d0["colors"]]["reverse"]() : _0x4a46d0["colors"];
  }
  ["_buildFillStyle"]() {
    const _0x18c58e = this["layerManager"] && this["layerId"] && this["_dataColumn"] ? this["layerManager"]["getColumnRange"](this["layerId"], this["_dataColumn"]) : null;
    return buildFillStyle({ "colorMode": this["_colorMode"], "fillOpacityPercent": this["_fillOpacity"], "fillColor": this["_fillColor"], "dataColumn": this["_dataColumn"], "paletteColors": this["_activePaletteColors"](), "paletteKind": paletteKindOf(this["_gradientPalette"]), "gradientMin": this["_gradientMin"], "gradientMax": this["_gradientMax"], "columnRange": _0x18c58e, "binCount": Number(this["_binCount"]) || Number(DEFAULT_BIN_COUNT), "categoryColors": this["_categoryColors"] });
  }
  ["_scheduleApplyStyle"](_0x38dc57) {
    if (!this["layerManager"] || !this["layerId"] || this["_isServiceLayer"]) return;
    _0x38dc57 !== void 0 && (this["_pendingOutlineWidthOverride"] = _0x38dc57);
    if (this["_applyStyleRaf"] !== null) return;
    this["_applyStyleRaf"] = this["_timers"]["requestAnimationFrame"](() => {
      this["_applyStyleRaf"] = null;
      const _0x17db94 = this["_pendingOutlineWidthOverride"];
      this["_pendingOutlineWidthOverride"] = void 0;
      const _0x4e1b0e = { "fill": this["_buildFillStyle"](), "outline": { "enabled": this["_outlineEnabled"], "color": this["_outlineColor"], "width": Number(_0x17db94 ?? this["_outlineWidth"]) || Number(DEFAULT_OUTLINE_WIDTH) } };
      void this["layerManager"]["applyLayerStyle"](this["layerId"], _0x4e1b0e);
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
              ${this["_categoryValues"]["map"]((_0x20ea0a) => b`
                  <div class="legend-bin-row">
                    <span class="legend-swatch" style="background:${this["_categoryColors"][String(_0x20ea0a)] ?? DEFAULT_FILL_COLOR}"></span>
                    <span class="legend-value" title=${String(_0x20ea0a)}>${String(_0x20ea0a)}</span>
                  </div>
                `)}
            </div>
          </div>
          <div
            class="category-scroll-thumb"
            @pointerdown=${(_0x5b9019) => this["_categoryScroll"]["startDrag"](_0x5b9019)}
          ></div>
        </div>
      </div>
    `;
  }
  ["_renderLegendCard"]() {
    const _0x308690 = this["layerManager"] && this["layerId"] && this["_dataColumn"] ? this["layerManager"]["getColumnRange"](this["layerId"], this["_dataColumn"]) : null, _0x5931ed = this["_gradientMin"] !== "" ? Number(this["_gradientMin"]) : void 0, _0x23385a = this["_gradientMax"] !== "" ? Number(this["_gradientMax"]) : void 0, _0x569cca = _0x5931ed !== void 0 && Number["isFinite"](_0x5931ed) ? _0x5931ed : _0x308690 == null ? void 0 : _0x308690["min"], _0x3e355c = _0x23385a !== void 0 && Number["isFinite"](_0x23385a) ? _0x23385a : _0x308690 == null ? void 0 : _0x308690["max"];
    if (_0x569cca === void 0 || _0x3e355c === void 0) return "";
    if (this["_colorMode"] === "gradient") {
      const _0x490aa3 = this["_activePaletteColors"](), _0x4894ef = paletteKindOf(this["_gradientPalette"]);
      return b`
        <div class="card">
          <span class="card-title">Lejant</span>
          <div class="legend-bin-wrap">
            <div
              class="legend-bin-list"
              @scroll=${() => this["_legendScroll"]["sync"]()}
            >
              ${gradientLegendRows(_0x569cca, _0x3e355c, (_0x1991a1) => sampleFromPaletteCss(_0x490aa3, _0x1991a1, _0x4894ef))["map"]((_0x46cbeb) => b`
                  <div class="legend-bin-row">
                    <span class="legend-swatch" style="background:${_0x46cbeb["color"]}"></span>
                    <span class="legend-value">${_0x46cbeb["label"]}</span>
                  </div>
                `)}
            </div>
            <div
              class="legend-scroll-thumb"
              @pointerdown=${(_0x5d9b60) => this["_legendScroll"]["startDrag"](_0x5d9b60)}
            ></div>
          </div>
        </div>
      `;
    }
    if (this["_colorMode"] === "bin") {
      const _0x81fdca = Number(this["_binCount"]) || Number(DEFAULT_BIN_COUNT), _0x53ea5f = this["_activePaletteColors"](), _0x5881bf = paletteKindOf(this["_gradientPalette"]);
      return b`
        <div class="card">
          <span class="card-title">Lejant</span>
          <div class="legend-bin-wrap">
            <div
              class="legend-bin-list"
              @scroll=${() => this["_legendScroll"]["sync"]()}
            >
              ${binLegendRows(_0x569cca, _0x3e355c, _0x81fdca, (_0x1e3345) => sampleFromPaletteCss(_0x53ea5f, _0x1e3345, _0x5881bf))["map"]((_0x5e166b) => b`
                  <div class="legend-bin-row">
                    <span class="legend-swatch" style="background:${_0x5e166b["color"]}"></span>
                    <span class="legend-value">${_0x5e166b["label"]}</span>
                  </div>
                `)}
            </div>
            <div
              class="legend-scroll-thumb"
              @pointerdown=${(_0x33406a) => this["_legendScroll"]["startDrag"](_0x33406a)}
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
        <div class="header" @pointerdown=${(_0x198fd1) => this["_drag"]["start"](_0x198fd1)}>
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
                    @input=${(_0x4c1bba) => {
      this["_outlineColor"] = _0x4c1bba["target"]["value"], this["_scheduleApplyStyle"]();
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
                  @input=${(_0x2bc33f) => {
      const _0x1d0ef3 = _0x2bc33f["target"];
      let _0x5d1826 = _0x1d0ef3["value"]["replace"](/[^\d.]/g, "");
      const _0x305173 = _0x5d1826["indexOf"](".");
      _0x305173 !== -1 && (_0x5d1826 = _0x5d1826["slice"](0, _0x305173 + 1) + _0x5d1826["slice"](_0x305173 + 1)["replaceAll"](".", ""));
      if (_0x1d0ef3["value"] !== _0x5d1826) _0x1d0ef3["value"] = _0x5d1826;
      this["_scheduleApplyStyle"](_0x5d1826);
    }}
                  @cds-number-input=${(_0x129a4a) => {
      if (!_0x129a4a["detail"]["direction"]) return;
      const _0x4fb64f = Number(_0x129a4a["detail"]["value"]);
      if (!Number["isNaN"](_0x4fb64f)) this["_outlineWidth"] = String(_0x4fb64f);
      this["_scheduleApplyStyle"]();
    }}
                  @focusout=${(_0x57b931) => {
      const _0x5aa243 = _0x57b931["target"], _0x469780 = Number(_0x5aa243["value"]), _0x2d7c14 = String(Number["isFinite"](_0x469780) && _0x469780 > 0 ? Math["min"](50, Math["max"](0.5, _0x469780)) : Number(DEFAULT_OUTLINE_WIDTH));
      this["_outlineWidth"] = _0x2d7c14, _0x5aa243["value"] = _0x2d7c14, this["_scheduleApplyStyle"]();
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
                  @cds-checkbox-changed=${(_0x1151e1) => {
      var _a3;
      this["_outlineEnabled"] = ((_a3 = _0x1151e1["detail"]) == null ? void 0 : _a3["checked"]) ?? !this["_outlineEnabled"], this["_scheduleApplyStyle"]();
    }}
                ></cds-checkbox>
              </div>
            </div>
    `;
  }
};
TucbsStyleEditor["styles"] = styleEditorStyles, __decorateClass$x([n$1({ "type": Boolean, "reflect": !![] })], TucbsStyleEditor["prototype"], "open", 2), __decorateClass$x([n$1({ "attribute": ![] })], TucbsStyleEditor["prototype"], "layerManager", 2), __decorateClass$x([n$1()], TucbsStyleEditor["prototype"], "layerId", 2), __decorateClass$x([n$1()], TucbsStyleEditor["prototype"], "layerTitle", 2), __decorateClass$x([n$1()], TucbsStyleEditor["prototype"], "layerType", 2), __decorateClass$x([n$1({ "attribute": "custom-css" })], TucbsStyleEditor["prototype"], "customCss", 2), __decorateClass$x([r()], TucbsStyleEditor["prototype"], "_colorMode", 2), __decorateClass$x([r()], TucbsStyleEditor["prototype"], "_dataColumn", 2), __decorateClass$x([r()], TucbsStyleEditor["prototype"], "_dataColumns", 2), __decorateClass$x([r()], TucbsStyleEditor["prototype"], "_numericDataColumns", 2), __decorateClass$x([r()], TucbsStyleEditor["prototype"], "_gradientPalette", 2), __decorateClass$x([r()], TucbsStyleEditor["prototype"], "_gradientMin", 2), __decorateClass$x([r()], TucbsStyleEditor["prototype"], "_gradientMax", 2), __decorateClass$x([r()], TucbsStyleEditor["prototype"], "_gradientMinError", 2), __decorateClass$x([r()], TucbsStyleEditor["prototype"], "_gradientMaxError", 2), __decorateClass$x([r()], TucbsStyleEditor["prototype"], "_binCount", 2), __decorateClass$x([r()], TucbsStyleEditor["prototype"], "_categorySort", 2), __decorateClass$x([r()], TucbsStyleEditor["prototype"], "_paletteReversed", 2), __decorateClass$x([r()], TucbsStyleEditor["prototype"], "_categoryValues", 2), __decorateClass$x([r()], TucbsStyleEditor["prototype"], "_categoryColors", 2), __decorateClass$x([r()], TucbsStyleEditor["prototype"], "_fillColor", 2), __decorateClass$x([r()], TucbsStyleEditor["prototype"], "_fillOpacity", 2), __decorateClass$x([r()], TucbsStyleEditor["prototype"], "_outlineEnabled", 2), __decorateClass$x([r()], TucbsStyleEditor["prototype"], "_outlineColor", 2), __decorateClass$x([r()], TucbsStyleEditor["prototype"], "_outlineWidth", 2), __decorateClass$x([r()], TucbsStyleEditor["prototype"], "_featureCount", 2), __decorateClass$x([r()], TucbsStyleEditor["prototype"], "_serviceStyleRequestId", 2), __decorateClass$x([e$3(".category-values-list")], TucbsStyleEditor["prototype"], "_categoryListEl", 2), __decorateClass$x([e$3(".category-scroll-thumb")], TucbsStyleEditor["prototype"], "_categoryThumbEl", 2), __decorateClass$x([e$3(".legend-bin-list")], TucbsStyleEditor["prototype"], "_legendListEl", 2), __decorateClass$x([e$3(".legend-scroll-thumb")], TucbsStyleEditor["prototype"], "_legendThumbEl", 2), TucbsStyleEditor = __decorateClass$x([t$3("tucbs-style-editor")], TucbsStyleEditor);
var __defProp$v = Object["defineProperty"], __getOwnPropDesc$w = Object["getOwnPropertyDescriptor"], __decorateClass$w = (_0x4de03a, _0x29c767, _0x130fec, _0x349f7e) => {
  var _0x4d698d = _0x349f7e > 1 ? void 0 : _0x349f7e ? __getOwnPropDesc$w(_0x29c767, _0x130fec) : _0x29c767;
  for (var _0xc1dec0 = _0x4de03a["length"] - 1, _0x4384f0; _0xc1dec0 >= 0; _0xc1dec0--) if (_0x4384f0 = _0x4de03a[_0xc1dec0]) _0x4d698d = (_0x349f7e ? _0x4384f0(_0x29c767, _0x130fec, _0x4d698d) : _0x4384f0(_0x4d698d)) || _0x4d698d;
  if (_0x349f7e && _0x4d698d) __defProp$v(_0x29c767, _0x130fec, _0x4d698d);
  return _0x4d698d;
};
const SERVICE_LAYER_TYPES = ["WMS", "WMTS"];
let TucbsLegendPanel = class extends i$2 {
  constructor() {
    super(...arguments), this["layerId"] = "", this["layerType"] = "", this["open"] = ![], this["customCss"] = "", this["_legendUrl"] = "", this["_loading"] = ![], this["_error"] = "", this["_customCssState"] = { "sheet": null }, this["_listScroll"] = new VirtualScrollbar(this, () => this["_listEl"], () => this["_thumbEl"]), this["_timers"] = new TimerBag(this), this["_onLayerStyle"] = (_0x3baf4e) => {
      if (_0x3baf4e["id"] === this["layerId"]) this["_vectorStyle"] = _0x3baf4e["style"];
    };
  }
  get ["_isServiceLayer"]() {
    return SERVICE_LAYER_TYPES["includes"](this["layerType"]);
  }
  ["updated"](_0x53120d) {
    var _a2, _b;
    if (_0x53120d["has"]("layerManager")) {
      const _0x576dc1 = _0x53120d["get"]("layerManager");
      _0x576dc1 == null ? void 0 : _0x576dc1["off"]("layer:style", this["_onLayerStyle"]), (_a2 = this["layerManager"]) == null ? void 0 : _a2["on"]("layer:style", this["_onLayerStyle"]);
    }
    (_0x53120d["has"]("layerId") || _0x53120d["has"]("layerType") || _0x53120d["has"]("layerManager")) && (this["_vectorStyle"] = (_b = this["layerManager"]) == null ? void 0 : _b["getLayerStyle"](this["layerId"]), void this["_loadLegend"]()), _0x53120d["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_customCssState"], "tucbs-legend-panel"), this["_timers"]["requestAnimationFrame"](() => {
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
        const _0x1ba2b7 = await this["layerManager"]["getWmtsAvailableStyles"](this["layerId"]);
        this["_legendUrl"] = ((_a2 = _0x1ba2b7[0]) == null ? void 0 : _a2["legendUrl"]) ?? "";
      }
    } catch (_0x4b73f8) {
      _0x4b73f8 instanceof TucbsError && console["error"]("[tucbs-legend-panel] " + _0x4b73f8["code"] + " (" + _0x4b73f8["number"] + "): " + _0x4b73f8["message"]), this["_error"] = _0x4b73f8 instanceof Error ? _0x4b73f8["message"] : "Lejant yüklenemedi.";
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
  ["_resolveGradientRange"](_0x4fb4fb, _0x21324f, _0x9dbc78) {
    var _a2;
    if (_0x21324f !== void 0 && _0x9dbc78 !== void 0) return { "min": _0x21324f, "max": _0x9dbc78 };
    const _0x1b4c42 = (_a2 = this["layerManager"]) == null ? void 0 : _a2["getColumnRange"](this["layerId"], _0x4fb4fb);
    if (!_0x1b4c42) return void 0;
    return { "min": _0x21324f ?? _0x1b4c42["min"], "max": _0x9dbc78 ?? _0x1b4c42["max"] };
  }
  ["_renderVectorLegend"]() {
    const _0x4ad09b = this["_vectorStyle"];
    if (!_0x4ad09b) return b`<span class="legend-empty">Henüz stil uygulanmadı.</span>`;
    switch (_0x4ad09b["fill"]["mode"]) {
      case "gradient": {
        const { palette: _0x15c6ef, paletteKind: _0x5aa897, column: _0xd2ac72 } = _0x4ad09b["fill"], _0x2ce22c = this["_resolveGradientRange"](_0xd2ac72, _0x4ad09b["fill"]["min"], _0x4ad09b["fill"]["max"]);
        if (!_0x2ce22c) return b`<span class="legend-empty">Aralık hesaplanamadı.</span>`;
        const { min: _0x5d56e5, max: _0xc965c2 } = _0x2ce22c;
        return this["_renderScrollableRows"](gradientLegendRows(_0x5d56e5, _0xc965c2, (_0x2b01b2) => sampleFromPaletteCss(_0x15c6ef, _0x2b01b2, _0x5aa897)));
      }
      case "bin": {
        const { palette: _0x1e2517, binCount: _0x6e1907, paletteKind: _0x501fa8, column: _0x35e945 } = _0x4ad09b["fill"], _0x303433 = this["_resolveGradientRange"](_0x35e945, _0x4ad09b["fill"]["min"], _0x4ad09b["fill"]["max"]);
        if (!_0x303433) return b`<span class="legend-empty">Aralık hesaplanamadı.</span>`;
        const { min: _0x4dc7be, max: _0x43d771 } = _0x303433;
        return this["_renderScrollableRows"](binLegendRows(_0x4dc7be, _0x43d771, _0x6e1907, (_0x20eabd) => sampleFromPaletteCss(_0x1e2517, _0x20eabd, _0x501fa8)));
      }
      case "enum": {
        const _0x3540e2 = Object["entries"](_0x4ad09b["fill"]["colors"]);
        if (_0x3540e2["length"] === 0) return b`<span class="legend-empty">Kategori bulunamadı.</span>`;
        const _0x3664e3 = [..._0x3540e2]["sort"](([_0x19b45d], [_0x16f60d]) => compareCategoryKeys(_0x19b45d, _0x16f60d));
        return this["_renderScrollableRows"](_0x3664e3["map"](([_0x509aa2, _0x18b8e5]) => ({ "color": _0x18b8e5, "label": _0x509aa2 })));
      }
      case "solid":
      case "off":
      default:
        return b`<span class="legend-empty">Bu katman sabit renkli, lejant gerekmiyor.</span>`;
    }
  }
  ["_renderScrollableRows"](_0xdc4dea) {
    return b`
      <div class="legend-bin-wrap">
        <div class="legend-bin-list" @scroll=${() => this["_listScroll"]["sync"]()}>
          ${_0xdc4dea["map"]((_0x47c9c8) => b`
              <div class="legend-bin-row">
                <span class="legend-swatch" style="background:${_0x47c9c8["color"]}"></span>
                <span class="legend-value" title=${_0x47c9c8["label"]}>${_0x47c9c8["label"]}</span>
              </div>
            `)}
        </div>
        <div
          class="legend-scroll-thumb"
          @pointerdown=${(_0x4148c4) => this["_listScroll"]["startDrag"](_0x4148c4)}
        ></div>
      </div>
    `;
  }
  static ["_fitListToRows"](_0x111894) {
    if (!_0x111894) return;
    const _0x453056 = _0x111894["querySelectorAll"](".legend-bin-row");
    if (_0x453056["length"] === 0) {
      _0x111894["style"]["maxHeight"] = "";
      return;
    }
    const _0x56c9de = _0x453056[0]["getBoundingClientRect"]();
    if (_0x453056["length"] === 1) {
      _0x111894["style"]["maxHeight"] = _0x56c9de["height"] + "px";
      return;
    }
    const _0xcbcea3 = _0x453056[1]["getBoundingClientRect"](), _0x2e6694 = _0xcbcea3["top"] - _0x56c9de["top"];
    _0x111894["style"]["maxHeight"] = _0x56c9de["height"] + _0x2e6694 * (TucbsLegendPanel["VISIBLE_LIST_ROWS"] - 1) + "px";
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
var __defProp$u = Object["defineProperty"], __getOwnPropDesc$v = Object["getOwnPropertyDescriptor"], __decorateClass$v = (_0x110dcd, _0x336254, _0x519d20, _0x343585) => {
  var _0x31cb8d = _0x343585 > 1 ? void 0 : _0x343585 ? __getOwnPropDesc$v(_0x336254, _0x519d20) : _0x336254;
  for (var _0x13a083 = _0x110dcd["length"] - 1, _0x1a725d; _0x13a083 >= 0; _0x13a083--) if (_0x1a725d = _0x110dcd[_0x13a083]) _0x31cb8d = (_0x343585 ? _0x1a725d(_0x336254, _0x519d20, _0x31cb8d) : _0x1a725d(_0x31cb8d)) || _0x31cb8d;
  if (_0x343585 && _0x31cb8d) __defProp$u(_0x336254, _0x519d20, _0x31cb8d);
  return _0x31cb8d;
};
const ICON_CLOSE$5 = o$1(iconNodeToString(_16_default$v));
let TucbsSlideOverPanel = class extends i$2 {
  constructor() {
    super(...arguments), this["panelTitle"] = "", this["side"] = "right", this["open"] = ![], this["panelWidth"] = "360px", this["customCss"] = "", this["scrollBody"] = !![], this["_customCssState"] = { "sheet": null };
  }
  ["updated"](_0x3fa5f1) {
    _0x3fa5f1["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_customCssState"], "tucbs-slide-over-panel");
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
  const _0x2105b1 = [];
  if (sharedLeftWidth) _0x2105b1["push"](sharedLeftWidth);
  if (sharedRightWidth) _0x2105b1["push"](sharedRightWidth);
  const _0x321aae = _0x2105b1["length"] ? "calc(100% - " + _0x2105b1["join"](" - ") + ")" : "100%", _0x33be0e = sharedLeftWidth ?? "";
  for (const _0x38398d of layoutTargets) {
    _0x38398d["style"]["width"] = _0x321aae, _0x38398d["style"]["marginLeft"] = _0x33be0e;
  }
}
class PanelLayoutController {
  constructor(_0x438ac1, _0x22ae54 = "right") {
    this["hostForToolbarLookup"] = _0x438ac1, this["side"] = _0x22ae54, this["_mapContainer"] = null, this["_resizeObserver"] = null, this["_toolbarEl"] = null, this["_toolbarLookupDone"] = ![], this["_resizeRaf"] = null, this["onExclusiveClose"] = null, this["_timers"] = new TimerBag(_0x438ac1);
  }
  ["bindMap"](_0x499520) {
    this["_map"] = _0x499520;
    const _0xd6544d = _0x499520["viewer"]["container"];
    this["_mapContainer"] = _0xd6544d, _0xd6544d["style"]["transition"] = "width " + TRANSITION_TIMING + ", margin-left " + TRANSITION_TIMING, layoutTargets["add"](_0xd6544d);
    const _0x56b4c2 = document["querySelector"]("tucbs-info-bar");
    _0x56b4c2 && (_0x56b4c2["style"]["transition"] = "width " + TRANSITION_TIMING + ", margin-left " + TRANSITION_TIMING, layoutTargets["add"](_0x56b4c2)), this["_resizeObserver"] = new ResizeObserver(() => {
      if (this["_resizeRaf"] !== null) return;
      this["_resizeRaf"] = this["_timers"]["requestAnimationFrame"](() => {
        this["_resizeRaf"] = null, _0x499520["resize"]();
      });
    }), this["_resizeObserver"]["observe"](_0xd6544d), applyCombinedLayout();
  }
  ["unbindMap"](_0xbc2089) {
    var _a2;
    (_a2 = this["_resizeObserver"]) == null ? void 0 : _a2["disconnect"](), this["_resizeObserver"] = null;
    this["_resizeRaf"] !== null && (this["_timers"]["cancelAnimationFrame"](this["_resizeRaf"]), this["_resizeRaf"] = null);
    if (openControllerBySide[this["side"]] === this) openControllerBySide[this["side"]] = null;
    if (this["side"] === "left") sharedLeftWidth = null;
    else sharedRightWidth = null;
    applyCombinedLayout();
    if (this["_mapContainer"]) this["_mapContainer"]["style"]["transition"] = "";
    this["_mapContainer"] = null, this["_map"] = void 0, _0xbc2089["resize"]();
  }
  ["setOpen"](_0x52990f, _0x73a08a) {
    var _a2;
    if (_0x52990f) {
      const _0x361c31 = openControllerBySide[this["side"]];
      if (_0x361c31 && _0x361c31 !== this) (_a2 = _0x361c31["onExclusiveClose"]) == null ? void 0 : _a2.call(_0x361c31);
      openControllerBySide[this["side"]] = this;
    } else openControllerBySide[this["side"]] === this && (openControllerBySide[this["side"]] = null);
    if (this["side"] === "left") sharedLeftWidth = _0x52990f ? _0x73a08a : null;
    else sharedRightWidth = _0x52990f ? _0x73a08a : null;
    applyCombinedLayout(), this["_applyToolbarShift"](_0x52990f, _0x73a08a);
  }
  ["_findToolbarHost"]() {
    const _0x1aa27d = this["hostForToolbarLookup"]["getRootNode"]();
    if (_0x1aa27d instanceof ShadowRoot && _0x1aa27d["host"]["tagName"]["toLowerCase"]() === "tucbs-toolbar") return _0x1aa27d["host"];
    return null;
  }
  ["_applyToolbarShift"](_0xbfa1c, _0x392b49) {
    !this["_toolbarLookupDone"] && (this["_toolbarEl"] = this["_findToolbarHost"](), this["_toolbarLookupDone"] = !![]);
    const _0x67d85c = this["_toolbarEl"];
    if (!_0x67d85c) return;
    const _0x17c2dd = _0x67d85c["position"], _0x17bb13 = _0x17c2dd === "right-center" || _0x17c2dd === "top-right" || _0x17c2dd === "bottom-right";
    if (!_0x17bb13) return;
    _0x67d85c["style"]["transition"] = "translate " + TRANSITION_TIMING, _0x67d85c["style"]["translate"] = _0xbfa1c ? "calc(-1 * " + _0x392b49 + ")" : "";
  }
}
class PortalHost {
  constructor(_0x1ce9e6, _0x46c03d, _0x5bb264, _0x11d946) {
    this["tag"] = _0x1ce9e6, this["sync"] = _0x46c03d, this["closeEvent"] = _0x5bb264, this["onClose"] = _0x11d946, this["el"] = null;
  }
  get ["element"]() {
    return this["el"];
  }
  ["ensure"]() {
    if (this["el"]) return;
    const _0x2b4335 = document["createElement"](this["tag"]);
    _0x2b4335["setAttribute"]("data-tucbs-portal", ""), this["closeEvent"] && this["onClose"] && _0x2b4335["addEventListener"](this["closeEvent"], this["onClose"]), document["body"]["appendChild"](_0x2b4335), this["el"] = _0x2b4335, this["sync"](_0x2b4335);
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
  constructor(_0xbc6b97) {
    this["onReorder"] = _0xbc6b97, this["state"] = null;
  }
  ["start"](_0x43d00f, _0x44c6ef, _0x3cf3b5, _0x1b798b) {
    if (_0x43d00f["button"] !== 0 || this["state"]) return;
    _0x43d00f["preventDefault"](), _0x3cf3b5["setPointerCapture"](_0x43d00f["pointerId"]);
    const _0x2ce49e = _0x44c6ef["getBoundingClientRect"](), _0x528eb4 = document["createElement"]("div");
    _0x528eb4["className"] = "layer-placeholder", _0x528eb4["style"]["height"] = _0x2ce49e["height"] + "px", _0x44c6ef["after"](_0x528eb4), _0x44c6ef["classList"]["add"]("layer-item--dragging"), _0x44c6ef["style"]["left"] = _0x2ce49e["left"] + "px", _0x44c6ef["style"]["top"] = _0x2ce49e["top"] + "px", _0x44c6ef["style"]["width"] = _0x2ce49e["width"] + "px";
    const _0x423b79 = { "handle": _0x3cf3b5, "item": _0x44c6ef, "list": _0x1b798b, "placeholder": _0x528eb4, "pointerId": _0x43d00f["pointerId"], "offsetY": _0x43d00f["clientY"] - _0x2ce49e["top"], "onMove": (_0x3a0ed3) => this["move"](_0x3a0ed3), "onEnd": (_0x11c832) => this["end"](_0x11c832) };
    window["addEventListener"]("pointermove", _0x423b79["onMove"]), window["addEventListener"]("pointerup", _0x423b79["onEnd"]), window["addEventListener"]("pointercancel", _0x423b79["onEnd"]), this["state"] = _0x423b79;
  }
  ["move"](_0x496afb) {
    const _0x5c609a = this["state"];
    if (!_0x5c609a || _0x496afb["pointerId"] !== _0x5c609a["pointerId"]) return;
    _0x496afb["preventDefault"](), _0x5c609a["item"]["style"]["top"] = _0x496afb["clientY"] - _0x5c609a["offsetY"] + "px", this["movePlaceholder"](_0x496afb["clientY"]);
  }
  ["movePlaceholder"](_0x2740dd) {
    const _0xbf451c = this["state"];
    if (!_0xbf451c) return;
    const _0x42cc21 = [..._0xbf451c["list"]["querySelectorAll"](".layer-item[data-layer-id]")]["filter"]((_0x1cfcb5) => _0x1cfcb5 !== _0xbf451c["item"]), _0x3c281b = _0x42cc21["find"]((_0x251e10) => {
      const _0x900749 = _0x251e10["getBoundingClientRect"]();
      return _0x2740dd < _0x900749["top"] + _0x900749["height"] / 2;
    });
    _0xbf451c["list"]["insertBefore"](_0xbf451c["placeholder"], _0x3c281b ?? null);
  }
  ["end"](_0x48e0fa) {
    var _a2;
    const _0x1a2ef8 = this["state"];
    if (!_0x1a2ef8 || _0x48e0fa["pointerId"] !== _0x1a2ef8["pointerId"]) return;
    window["removeEventListener"]("pointermove", _0x1a2ef8["onMove"]), window["removeEventListener"]("pointerup", _0x1a2ef8["onEnd"]), window["removeEventListener"]("pointercancel", _0x1a2ef8["onEnd"]);
    _0x1a2ef8["handle"]["hasPointerCapture"](_0x48e0fa["pointerId"]) && _0x1a2ef8["handle"]["releasePointerCapture"](_0x48e0fa["pointerId"]);
    const _0x4d3a76 = _0x1a2ef8["item"]["dataset"]["layerId"], _0x2ab6e1 = (_a2 = _0x1a2ef8["placeholder"]["nextElementSibling"]) == null ? void 0 : _a2["dataset"]["layerId"];
    _0x1a2ef8["placeholder"]["remove"](), _0x1a2ef8["item"]["classList"]["remove"]("layer-item--dragging"), _0x1a2ef8["item"]["removeAttribute"]("style"), this["state"] = null, this["onReorder"](_0x4d3a76, _0x2ab6e1);
  }
  ["dispose"]() {
    if (!this["state"]) return;
    window["removeEventListener"]("pointermove", this["state"]["onMove"]), window["removeEventListener"]("pointerup", this["state"]["onEnd"]), window["removeEventListener"]("pointercancel", this["state"]["onEnd"]), this["state"] = null;
  }
}
class MarkerWatcher {
  constructor(_0x1f9226, _0x4f841e, _0x40dc2b) {
    this["host"] = _0x1f9226, this["tagName"] = _0x4f841e, this["onChange"] = _0x40dc2b, this["observer"] = null, this["current"] = null;
  }
  ["start"]() {
    const _0x36ffc = this["host"]["getRootNode"]();
    this["evaluate"](_0x36ffc), this["observer"] = new MutationObserver(() => this["evaluate"](_0x36ffc)), this["observer"]["observe"](_0x36ffc, { "childList": !![], "subtree": !![] });
  }
  ["evaluate"](_0x13a98b) {
    const _0x3c4fe4 = _0x13a98b["querySelector"](this["tagName"] + ":not([data-tucbs-portal])");
    _0x3c4fe4 !== this["current"] && (this["current"] = _0x3c4fe4, this["onChange"](_0x3c4fe4));
  }
  ["dispose"]() {
    var _a2;
    (_a2 = this["observer"]) == null ? void 0 : _a2["disconnect"](), this["observer"] = null, this["current"] = null;
  }
}
function carbonIcon$3(_0x2e467d) {
  return o$1(iconNodeToString(_0x2e467d));
}
const ICON_ZOOM_IN$2 = carbonIcon$3(_16_default$1), ICON_UP_TO_TOP = carbonIcon$3(_16_default$5), ICON_TRASH_CAN$1 = carbonIcon$3(_16_default$6), ICON_PALETTE = carbonIcon$3(_16_default$t), ICON_LEGEND = carbonIcon$3(_16_default$k), ICON_DOCUMENT_EXPORT = carbonIcon$3(_16_default$r);
function buildLayerMenuActions(_0x35e576, _0x15b6ab, _0x3ec160) {
  const _0x56c115 = [{ "icon": ICON_ZOOM_IN$2, "label": "Yakınlaş", "onClick": _0x3ec160["zoomToLayer"] }, { "icon": ICON_UP_TO_TOP, "label": "En Üste Taşı", "onClick": _0x3ec160["bringToFront"] }, { "icon": ICON_TRASH_CAN$1, "label": "Kaldır", "onClick": _0x3ec160["remove"] }];
  return _0x15b6ab["styleEditorAvailable"] && _0x56c115["push"]({ "icon": ICON_PALETTE, "label": "Stil Düzenle", "onClick": _0x3ec160["openStyleEditor"] }), _0x15b6ab["legendAvailable"] && _0x35e576["styleMode"] !== "solid" && _0x35e576["layerType"] !== "DRAWING" && _0x35e576["layerType"] !== "MEASURE" && _0x56c115["push"]({ "icon": ICON_LEGEND, "label": "Lejant", "onClick": _0x3ec160["toggleLegend"] }), _0x15b6ab["layerExportAvailable"] && _0x35e576["layerType"] === "DRAWING" && _0x56c115["push"]({ "icon": ICON_DOCUMENT_EXPORT, "label": "GeoJSON Olarak Dışa Aktar", "onClick": _0x3ec160["exportLayer"] }), _0x15b6ab["layerExportAvailable"] && _0x15b6ab["isAnalysisResult"] && _0x56c115["push"]({ "icon": ICON_DOCUMENT_EXPORT, "label": "Dışa Aktar", "onClick": () => void 0, "children": [{ "icon": ICON_DOCUMENT_EXPORT, "label": "GeoJSON", "onClick": _0x3ec160["exportLayer"] }, { "icon": ICON_DOCUMENT_EXPORT, "label": "KML", "onClick": _0x3ec160["exportLayerKml"] }, { "icon": ICON_DOCUMENT_EXPORT, "label": "Shapefile (ZIP)", "onClick": _0x3ec160["exportLayerShapefile"] }] }), _0x15b6ab["layerExportAvailable"] && (_0x35e576["layerType"] === "WMS" || _0x35e576["layerType"] === "WCS") && _0x15b6ab["isGeoTiffExportAvailable"] && _0x56c115["push"]({ "icon": ICON_DOCUMENT_EXPORT, "label": "GeoTIFF Olarak Dışa Aktar", "onClick": _0x3ec160["exportLayerAsGeoTiff"] }), _0x56c115;
}
class ExclusiveOverlayCoordinator {
  constructor() {
    this["closers"] = /* @__PURE__ */ new Map();
  }
  ["register"](_0x20c03e, _0x29b5f1) {
    this["closers"]["set"](_0x20c03e, _0x29b5f1);
  }
  ["closeOthers"](_0x1925bf) {
    for (const [_0x2fc22b, _0x1c8dab] of this["closers"]) {
      if (_0x2fc22b !== _0x1925bf) _0x1c8dab();
    }
  }
}
var __defProp$t = Object["defineProperty"], __getOwnPropDesc$u = Object["getOwnPropertyDescriptor"], __decorateClass$u = (_0x1b23bd, _0x599a2f, _0x3bfa78, _0x41a640) => {
  var _0x5d936f = _0x41a640 > 1 ? void 0 : _0x41a640 ? __getOwnPropDesc$u(_0x599a2f, _0x3bfa78) : _0x599a2f;
  for (var _0x3c7457 = _0x1b23bd["length"] - 1, _0x25b8c5; _0x3c7457 >= 0; _0x3c7457--) if (_0x25b8c5 = _0x1b23bd[_0x3c7457]) _0x5d936f = (_0x41a640 ? _0x25b8c5(_0x599a2f, _0x3bfa78, _0x5d936f) : _0x25b8c5(_0x5d936f)) || _0x5d936f;
  if (_0x41a640 && _0x5d936f) __defProp$t(_0x599a2f, _0x3bfa78, _0x5d936f);
  return _0x5d936f;
};
let TucbsLayerMenuPortal = class extends i$2 {
  constructor() {
    super(...arguments), this["open"] = ![], this["actions"] = [], this["x"] = 0, this["y"] = 0;
  }
  ["updated"](_0x3c8ea2) {
    (_0x3c8ea2["has"]("x") || _0x3c8ea2["has"]("y")) && (this["style"]["transform"] = "translate(" + this["x"] + "px, " + this["y"] + "px)");
  }
  ["render"]() {
    return b`
      <div class="layer-menu" role="menu">
        ${this["actions"]["map"]((_0x4b24e2) => {
      var _a2;
      return ((_a2 = _0x4b24e2["children"]) == null ? void 0 : _a2["length"]) ? b`
                <div class="layer-menu-branch">
                  <button type="button" class="layer-menu-item" role="menuitem" aria-haspopup="true">
                    ${_0x4b24e2["icon"]}<span>${_0x4b24e2["label"]}</span><span class="chevron">›</span>
                  </button>
                  <div class="layer-submenu" role="menu">
                    ${_0x4b24e2["children"]["map"]((_0x12e065) => b`
                        <button
                          type="button"
                          class="layer-menu-item"
                          role="menuitem"
                          @click=${_0x12e065["onClick"]}
                        >
                          ${_0x12e065["icon"]}<span>${_0x12e065["label"]}</span>
                        </button>
                      `)}
                  </div>
                </div>
              ` : b`
                <button
                  type="button"
                  class="layer-menu-item"
                  role="menuitem"
                  @click=${_0x4b24e2["onClick"]}
                >
                  ${_0x4b24e2["icon"]}<span>${_0x4b24e2["label"]}</span>
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
var __defProp$s = Object["defineProperty"], __getOwnPropDesc$t = Object["getOwnPropertyDescriptor"], __decorateClass$t = (_0x46c51e, _0x542fe9, _0x3d08f0, _0x6098c2) => {
  var _0xe6782 = _0x6098c2 > 1 ? void 0 : _0x6098c2 ? __getOwnPropDesc$t(_0x542fe9, _0x3d08f0) : _0x542fe9;
  for (var _0x3b8fd6 = _0x46c51e["length"] - 1, _0x8f19ee; _0x3b8fd6 >= 0; _0x3b8fd6--) if (_0x8f19ee = _0x46c51e[_0x3b8fd6]) _0xe6782 = (_0x6098c2 ? _0x8f19ee(_0x542fe9, _0x3d08f0, _0xe6782) : _0x8f19ee(_0xe6782)) || _0xe6782;
  if (_0x6098c2 && _0xe6782) __defProp$s(_0x542fe9, _0x3d08f0, _0xe6782);
  return _0xe6782;
};
let TucbsTooltipPortal = class extends i$2 {
  constructor() {
    super(...arguments), this["open"] = ![], this["text"] = "", this["x"] = 0, this["y"] = 0;
  }
  ["updated"](_0x381cd6) {
    (_0x381cd6["has"]("x") || _0x381cd6["has"]("y")) && (this["style"]["transform"] = "translate(" + this["x"] + "px, " + this["y"] + "px)");
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
function whenTucbsMapReady(_0xed755b, _0x31b85e) {
  const _0x1427e2 = _0xed755b["apiKeyAuthState"] ?? "none";
  if (_0x1427e2 === "failed") return;
  if (_0x1427e2 === "ok" || _0x1427e2 === "none" && _0xed755b["map"]) {
    _0x31b85e(_0xed755b);
    return;
  }
  const _0x90ea62 = () => _0x31b85e(_0xed755b);
  _0xed755b["addEventListener"]("ready", _0x90ea62, { "once": !![] }), _0xed755b["addEventListener"]("error", () => _0xed755b["removeEventListener"]("ready", _0x90ea62), { "once": !![] });
}
function standardMapBindingMessages(_0x1076f9, _0x9f27c2) {
  return { "noIdMessage": "[" + _0x1076f9 + '] "mapElementId" verilmedi ve "map" programatik olarak atanmadi; bilesen haritaya baglanamadigi icin ' + _0x9f27c2 + " kalacak.", "missingElementMessage": (_0x2251d6) => "[" + _0x1076f9 + '] mapElementId="' + _0x2251d6 + '" ile eslesen bir element bulunamadi; bilesen haritaya baglanamadigi icin ' + _0x9f27c2 + " kalacak." };
}
function bindMapByElementId(_0x43acb6, _0x2ded59) {
  if (_0x43acb6["map"]) return;
  if (!_0x43acb6["mapElementId"]) {
    if (_0x2ded59["noIdTiming"] === "sync") {
      console["warn"](_0x2ded59["noIdMessage"]);
      return;
    }
    requestAnimationFrame(() => {
      if (_0x43acb6["map"]) return;
      console["warn"](_0x2ded59["noIdMessage"]);
    });
    return;
  }
  const _0x1903a9 = document["getElementById"](_0x43acb6["mapElementId"]);
  if (!_0x1903a9) {
    console["warn"](_0x2ded59["missingElementMessage"](_0x43acb6["mapElementId"]));
    return;
  }
  _0x1903a9["map"] ? _0x43acb6["map"] = _0x1903a9["map"] : _0x1903a9["addEventListener"]("ready", () => {
    if (_0x1903a9["map"]) _0x43acb6["map"] = _0x1903a9["map"];
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
var __defProp$r = Object["defineProperty"], __getOwnPropDesc$s = Object["getOwnPropertyDescriptor"], __typeError$2 = (_0x58cbd9) => {
  throw TypeError(_0x58cbd9);
}, __decorateClass$s = (_0x578db3, _0x1d09df, _0x245a8c, _0x466a47) => {
  var _0x10281f = _0x466a47 > 1 ? void 0 : _0x466a47 ? __getOwnPropDesc$s(_0x1d09df, _0x245a8c) : _0x1d09df;
  for (var _0x32d29a = _0x578db3["length"] - 1, _0x415c5a; _0x32d29a >= 0; _0x32d29a--) if (_0x415c5a = _0x578db3[_0x32d29a]) _0x10281f = (_0x466a47 ? _0x415c5a(_0x1d09df, _0x245a8c, _0x10281f) : _0x415c5a(_0x10281f)) || _0x10281f;
  if (_0x466a47 && _0x10281f) __defProp$r(_0x1d09df, _0x245a8c, _0x10281f);
  return _0x10281f;
}, __accessCheck$2 = (_0x509269, _0x194a7f, _0x10ca1a) => _0x194a7f["has"](_0x509269) || __typeError$2("Cannot " + _0x10ca1a), __privateGet$2 = (_0x54f265, _0x47a4d5, _0x257b6a) => (__accessCheck$2(_0x54f265, _0x47a4d5, "read from private field"), _0x257b6a ? _0x257b6a["call"](_0x54f265) : _0x47a4d5["get"](_0x54f265)), __privateAdd$2 = (_0xbf34f2, _0x3d6154, _0x473b8e) => _0x3d6154["has"](_0xbf34f2) ? __typeError$2("Cannot add the same private member more than once") : _0x3d6154 instanceof WeakSet ? _0x3d6154["add"](_0xbf34f2) : _0x3d6154["set"](_0xbf34f2, _0x473b8e), _apiKeyState$1;
const NEUTRAL_LAYER_COLOR = "#9e9e9e";
function carbonIcon$2(_0x623acc) {
  return o$1(iconNodeToString(_0x623acc));
}
const ICON_DOCUMENT_BLANK = carbonIcon$2(_20_default$2), ICON_CLOUD_DOWNLOAD$1 = carbonIcon$2(_20_default$4), ICON_CHEVRON_RIGHT$1 = carbonIcon$2(_16_default$x), ICON_OVERFLOW_MENU = carbonIcon$2(_16_default$f), ICON_DRAG_HANDLE = carbonIcon$2(_16_default$o), ICON_API_KEY$1 = carbonIcon$2(_20_default$5), ICON_LAYERS = carbonIcon$2(_16_default$l);
let TucbsLayerList = class extends i$2 {
  constructor() {
    super(...arguments), this["mapElementId"] = "", __privateAdd$2(this, _apiKeyState$1, new WriteOnlyApiKey(this)), this["panelWidth"] = "360px", this["collapsible"] = !![], this["customCss"] = "", this["_open"] = ![], this["_layers"] = [], this["_openMenuId"] = null, this["_geoTiffExportingId"] = null, this["_uploadOpen"] = ![], this["_fileUploadAvailable"] = ![], this["_serviceUploadOpen"] = ![], this["_serviceUploadAvailable"] = ![], this["_styleEditorAvailable"] = ![], this["_legendAvailable"] = ![], this["_layerExportAvailable"] = ![], this["_legendOpenIds"] = /* @__PURE__ */ new Set(), this["_authorizedLayersAvailable"] = ![], this["_authorizedLayersFetching"] = ![], this["_hasApiKey"] = ![], this["_fileUploadMarker"] = null, this["_serviceUploadMarker"] = null, this["_styleEditorMarker"] = null, this["_legendMarker"] = null, this["_layerExportMarker"] = null, this["_authorizedLayersMarker"] = null, this["_fileUploadPortal"] = new PortalHost("tucbs-file-upload", (_0x26eb90) => {
      var _a2;
      _0x26eb90["open"] = this["_uploadOpen"], _0x26eb90["layerManager"] = this["layerManager"], _0x26eb90["customCss"] = ((_a2 = this["_fileUploadMarker"]) == null ? void 0 : _a2["customCss"]) ?? "";
    }, "tucbs-file-upload-closed", () => this["_closeUpload"]()), this["_serviceUploadPortal"] = new PortalHost("tucbs-service-upload", (_0x36d75d) => {
      var _a2;
      _0x36d75d["open"] = this["_serviceUploadOpen"], _0x36d75d["layerManager"] = this["layerManager"], _0x36d75d["customCss"] = ((_a2 = this["_serviceUploadMarker"]) == null ? void 0 : _a2["customCss"]) ?? "", _0x36d75d["apiKey"] = __privateGet$2(this, _apiKeyState$1)["real"];
    }, "tucbs-service-upload-closed", () => this["_closeServiceUpload"]()), this["_styleEditorPortal"] = new PortalHost("tucbs-style-editor", (_0x124659) => {
      var _a2;
      _0x124659["layerManager"] = this["layerManager"], _0x124659["customCss"] = ((_a2 = this["_styleEditorMarker"]) == null ? void 0 : _a2["customCss"]) ?? "";
    }), this["_authorizedLayersPortal"] = new PortalHost("tucbs-authorized-layers", (_0x8bad64) => {
      var _a2;
      _0x8bad64["layerManager"] = this["layerManager"], _0x8bad64["customCss"] = ((_a2 = this["_authorizedLayersMarker"]) == null ? void 0 : _a2["customCss"]) ?? "";
    }), this["_fileUploadWatcher"] = new MarkerWatcher(this, "tucbs-file-upload", (_0x13e270) => {
      this["_fileUploadMarker"] = _0x13e270, this["_fileUploadAvailable"] = _0x13e270 !== null;
      if (_0x13e270) this["_fileUploadPortal"]["ensure"]();
      else this["_fileUploadPortal"]["dispose"]();
    }), this["_serviceUploadWatcher"] = new MarkerWatcher(this, "tucbs-service-upload", (_0x18cdb2) => {
      this["_serviceUploadMarker"] = _0x18cdb2, this["_serviceUploadAvailable"] = _0x18cdb2 !== null;
      if (_0x18cdb2) this["_serviceUploadPortal"]["ensure"]();
      else this["_serviceUploadPortal"]["dispose"]();
    }), this["_styleEditorWatcher"] = new MarkerWatcher(this, "tucbs-style-editor", (_0x58aafa) => {
      this["_styleEditorMarker"] = _0x58aafa, this["_styleEditorAvailable"] = _0x58aafa !== null;
      if (_0x58aafa) this["_styleEditorPortal"]["ensure"]();
      else this["_styleEditorPortal"]["dispose"]();
    }), this["_legendWatcher"] = new MarkerWatcher(this, "tucbs-legend-panel", (_0x515340) => {
      this["_legendMarker"] = _0x515340, this["_legendAvailable"] = _0x515340 !== null;
    }), this["_layerExportWatcher"] = new MarkerWatcher(this, "tucbs-layer-export", (_0x349e77) => {
      this["_layerExportMarker"] = _0x349e77, this["_layerExportAvailable"] = _0x349e77 !== null;
    }), this["_authorizedLayersWatcher"] = new MarkerWatcher(this, "tucbs-authorized-layers", (_0x540ed8) => {
      this["_authorizedLayersMarker"] = _0x540ed8, this["_authorizedLayersAvailable"] = _0x540ed8 !== null;
      if (_0x540ed8) this["_authorizedLayersPortal"]["ensure"]();
      else this["_authorizedLayersPortal"]["dispose"]();
    }), this["_menuPortalEl"] = null, this["_tooltipPortalEl"] = null, this["_colorById"] = /* @__PURE__ */ new Map(), this["_opacityById"] = /* @__PURE__ */ new Map(), this["_dragReorder"] = new DragReorder((_0x1c9985, _0x555cab) => this["_applyReorder"](_0x1c9985, _0x555cab)), this["_overlayCoordinator"] = new ExclusiveOverlayCoordinator(), this["_customCssState"] = { "sheet": null }, this["_layoutController"] = new PanelLayoutController(this, "left"), this["_opacityRaf"] = /* @__PURE__ */ new Map(), this["_timers"] = new TimerBag(this), this["_onDocumentPointerDown"] = (_0x549fa6) => {
      const _0x5a2c6a = _0x549fa6["composedPath"](), _0x57a601 = _0x5a2c6a["some"]((_0xc0440a) => _0xc0440a instanceof HTMLElement && _0xc0440a["classList"]["contains"]("layer-options") || _0xc0440a === this["_menuPortalEl"]);
      if (!_0x57a601) this["_closeMenu"]();
    }, this["_onDocumentKeyDown"] = (_0x35d50d) => {
      if (_0x35d50d["key"] === "Escape") this["_closeMenu"]();
    }, this["_onWindowScrollOrResize"] = () => {
      if (this["_openMenuId"]) this["_closeMenu"]();
      this["_hidePortalTooltip"]();
    }, this["_onLayerAdd"] = () => this["_syncFromLayerManager"](), this["_onLayerRemove"] = () => this["_syncFromLayerManager"](), this["_onLayerReorder"] = () => this["_syncFromLayerManager"](), this["_onLayerVisibility"] = (_0x3b9a3f) => {
      this["_layers"] = this["_layers"]["map"]((_0x27a2e0) => _0x27a2e0["id"] === _0x3b9a3f["id"] ? { ..._0x27a2e0, "visible": _0x3b9a3f["visible"] } : _0x27a2e0);
    }, this["_onLayerOpacity"] = (_0x37a905) => {
      this["_opacityById"]["set"](_0x37a905["id"], _0x37a905["opacity"]), this["_layers"] = this["_layers"]["map"]((_0x39ab97) => _0x39ab97["id"] === _0x37a905["id"] ? { ..._0x39ab97, "opacity": _0x37a905["opacity"] } : _0x39ab97);
    }, this["_onLayerStyle"] = (_0x3c0103) => {
      const { fill: _0x26a7c8 } = _0x3c0103["style"], _0x512062 = _0x26a7c8["mode"] === "solid" ? _0x26a7c8["color"] : NEUTRAL_LAYER_COLOR;
      if (_0x26a7c8["mode"] !== "off") this["_opacityById"]["set"](_0x3c0103["id"], _0x26a7c8["opacity"]);
      this["_layers"] = this["_layers"]["map"]((_0x243f4d) => _0x243f4d["id"] === _0x3c0103["id"] ? { ..._0x243f4d, "fill": _0x512062, "styleMode": _0x26a7c8["mode"], "opacity": _0x26a7c8["mode"] !== "off" ? _0x26a7c8["opacity"] : _0x243f4d["opacity"] } : _0x243f4d);
    }, this["_onApiKeyChange"] = (_0x3deac8) => {
      this["_hasApiKey"] = _0x3deac8["hasApiKey"];
    };
  }
  set ["apiKey"](_0x517df1) {
    __privateGet$2(this, _apiKeyState$1)["write"](_0x517df1);
  }
  get ["apiKey"]() {
    return __privateGet$2(this, _apiKeyState$1)["masked"];
  }
  ["_showPortalTooltip"](_0x56185a, _0x2f30b8) {
    if (!this["_tooltipPortalEl"]) return;
    const _0x47c9f6 = _0x56185a["getBoundingClientRect"]();
    this["_tooltipPortalEl"]["text"] = _0x2f30b8, this["_tooltipPortalEl"]["x"] = _0x47c9f6["left"], this["_tooltipPortalEl"]["y"] = _0x47c9f6["bottom"] + 6, this["_tooltipPortalEl"]["open"] = !![];
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
    const _0x31555c = document["getElementById"](this["mapElementId"]);
    if (!_0x31555c) {
      console["warn"]('[tucbs-layer-list] mapElementId="' + this["mapElementId"] + '" ile eslesen bir element bulunamadi; bilesen haritaya baglanamadigi icin gizli kalacak.');
      return;
    }
    whenTucbsMapReady(_0x31555c, (_0x43d930) => {
      var _a2;
      _0x43d930["layerManager"] && (this["layerManager"] = _0x43d930["layerManager"]), _0x43d930["map"] && (this["map"] = _0x43d930["map"]), (_a2 = _0x43d930["_grantApiKeyTo"]) == null ? void 0 : _a2.call(_0x43d930, this);
    });
  }
  ["updated"](_0x36e774) {
    _0x36e774["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_customCssState"], "tucbs-layer-list");
    if (_0x36e774["has"]("map")) {
      const _0x2cfc20 = _0x36e774["get"]("map");
      if (_0x2cfc20) this["_layoutController"]["unbindMap"](_0x2cfc20);
      if (this["map"]) this["_layoutController"]["bindMap"](this["map"]);
    }
    if (_0x36e774["has"]("layerManager")) {
      const _0x10b76d = _0x36e774["get"]("layerManager");
      if (_0x10b76d) this["_unbindLayerManager"](_0x10b76d);
      if (this["layerManager"]) this["_bindLayerManager"](this["layerManager"]);
      else this["_hasApiKey"] = ![];
    }
    this["_fileUploadPortal"]["update"](), this["_serviceUploadPortal"]["update"](), this["_styleEditorPortal"]["update"](), this["_authorizedLayersPortal"]["update"]();
  }
  ["_bindLayerManager"](_0x5ee53e) {
    _0x5ee53e["on"]("layer:add", this["_onLayerAdd"]), _0x5ee53e["on"]("layer:remove", this["_onLayerRemove"]), _0x5ee53e["on"]("layer:reorder", this["_onLayerReorder"]), _0x5ee53e["on"]("layer:visibility", this["_onLayerVisibility"]), _0x5ee53e["on"]("layer:opacity", this["_onLayerOpacity"]), _0x5ee53e["on"]("layer:style", this["_onLayerStyle"]), _0x5ee53e["on"]("apiKey:change", this["_onApiKeyChange"]), this["_hasApiKey"] = _0x5ee53e["hasApiKey"], this["_syncFromLayerManager"]();
  }
  ["_unbindLayerManager"](_0xc625b1) {
    _0xc625b1["off"]("layer:add", this["_onLayerAdd"]), _0xc625b1["off"]("layer:remove", this["_onLayerRemove"]), _0xc625b1["off"]("layer:reorder", this["_onLayerReorder"]), _0xc625b1["off"]("layer:visibility", this["_onLayerVisibility"]), _0xc625b1["off"]("layer:opacity", this["_onLayerOpacity"]), _0xc625b1["off"]("layer:style", this["_onLayerStyle"]), _0xc625b1["off"]("apiKey:change", this["_onApiKeyChange"]);
  }
  ["_syncFromLayerManager"]() {
    if (!this["layerManager"]) {
      this["_layers"] = [];
      return;
    }
    this["_layers"] = this["layerManager"]["getLayers"]()["filter"]((_0x4123f5) => !_0x4123f5["isBasemap"])["reverse"]()["map"]((_0x1cb74e) => this["_toLayerItem"](_0x1cb74e));
  }
  ["_toLayerItem"](_0x3b443b) {
    var _a2, _b;
    if (!this["_opacityById"]["has"](_0x3b443b["id"])) this["_opacityById"]["set"](_0x3b443b["id"], 1);
    const _0x25b225 = (_a2 = this["layerManager"]) == null ? void 0 : _a2["getLayerStyle"](_0x3b443b["id"]), _0x4e3d90 = (_0x25b225 == null ? void 0 : _0x25b225["fill"]["mode"]) === "solid";
    return { "id": _0x3b443b["id"], "title": _0x3b443b["title"], "visible": _0x3b443b["cesiumObject"]["show"], "opacity": this["_opacityById"]["get"](_0x3b443b["id"]) ?? 1, "fill": _0x4e3d90 ? _0x25b225["fill"]["color"] : NEUTRAL_LAYER_COLOR, "styleMode": _0x25b225 == null ? void 0 : _0x25b225["fill"]["mode"], "layerType": _0x3b443b["layerType"], "analysisResult": ((_b = this["layerManager"]) == null ? void 0 : _b["isAnalysisResult"](_0x3b443b["id"])) ?? ![] };
  }
  ["_openPanel"]() {
    this["_open"] = !![], this["_layoutController"]["setOpen"](!![], this["panelWidth"]);
  }
  ["_closePanel"]() {
    this["_open"] = ![], this["_layoutController"]["setOpen"](![], this["panelWidth"]), this["_closeMenu"]();
  }
  ["_closeStyleEditorIfOpen"]() {
    const _0x3d1d14 = this["_styleEditorPortal"]["element"];
    if (_0x3d1d14 == null ? void 0 : _0x3d1d14["open"]) _0x3d1d14["close"]();
  }
  ["_closeAuthorizedLayersIfOpen"]() {
    const _0x257c43 = this["_authorizedLayersPortal"]["element"];
    if (_0x257c43 == null ? void 0 : _0x257c43["open"]) _0x257c43["closePicker"]();
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
  ["_setVisible"](_0x5aef7b, _0x1df126) {
    var _a2;
    (_a2 = this["layerManager"]) == null ? void 0 : _a2["setVisible"](_0x5aef7b, _0x1df126);
  }
  ["_setLayerColor"](_0x182c49, _0x426615) {
    var _a2, _b;
    const _0x1e5b3f = (_a2 = this["layerManager"]) == null ? void 0 : _a2["getLayerStyle"](_0x182c49), _0xcb2bb6 = (_0x1e5b3f == null ? void 0 : _0x1e5b3f["fill"]["mode"]) === "solid" ? _0x1e5b3f["fill"]["opacity"] : 1, _0x1e8f73 = (_0x1e5b3f == null ? void 0 : _0x1e5b3f["outline"]) ?? { "enabled": !![], "color": "#000000", "width": 2 };
    (_b = this["layerManager"]) == null ? void 0 : _b["applyLayerStyle"](_0x182c49, { "fill": { "mode": "solid", "color": _0x426615, "opacity": _0xcb2bb6 }, "outline": _0x1e8f73 });
  }
  ["_setOpacity"](_0x421fb9, _0x34802b) {
    this["_opacityById"]["set"](_0x421fb9, _0x34802b);
    const _0x561847 = this["_opacityRaf"]["get"](_0x421fb9);
    if (_0x561847 !== void 0) this["_timers"]["cancelAnimationFrame"](_0x561847);
    const _0x24c6f9 = this["_timers"]["requestAnimationFrame"](() => {
      this["_opacityRaf"]["delete"](_0x421fb9), this["_applyOpacity"](_0x421fb9, this["_opacityById"]["get"](_0x421fb9) ?? _0x34802b);
    });
    this["_opacityRaf"]["set"](_0x421fb9, _0x24c6f9);
  }
  ["_applyOpacity"](_0x2971cb, _0x1f9321) {
    if (!this["layerManager"]) return;
    const _0x28db8d = this["layerManager"]["getLayerStyle"](_0x2971cb);
    if (_0x28db8d !== void 0 && _0x28db8d["fill"]["mode"] !== "off") {
      this["layerManager"]["applyLayerStyle"](_0x2971cb, { "fill": { ..._0x28db8d["fill"], "opacity": _0x1f9321 }, "outline": _0x28db8d["outline"] });
      return;
    }
    this["layerManager"]["setOpacity"](_0x2971cb, _0x1f9321);
  }
  ["_updateOpacitySlider"](_0x489f20, _0x106693) {
    _0x489f20["style"]["setProperty"]("--fill", _0x106693 + "%");
  }
  ["_remove"](_0x27bff6) {
    var _a2;
    this["_closeMenu"]();
    const _0x2dadfb = this["_opacityRaf"]["get"](_0x27bff6);
    _0x2dadfb !== void 0 && (cancelAnimationFrame(_0x2dadfb), this["_opacityRaf"]["delete"](_0x27bff6));
    if (this["_legendOpenIds"]["has"](_0x27bff6)) {
      const _0x37ac85 = new Set(this["_legendOpenIds"]);
      _0x37ac85["delete"](_0x27bff6), this["_legendOpenIds"] = _0x37ac85;
    }
    (_a2 = this["layerManager"]) == null ? void 0 : _a2["removeLayer"](_0x27bff6);
  }
  ["_bringToFront"](_0x40c4a4) {
    var _a2;
    this["_closeMenu"](), (_a2 = this["layerManager"]) == null ? void 0 : _a2["raiseToTop"](_0x40c4a4);
  }
  ["_zoomToLayer"](_0x10293e) {
    var _a2;
    this["_closeMenu"](), void ((_a2 = this["layerManager"]) == null ? void 0 : _a2["zoomToLayer"](_0x10293e));
  }
  ["_closeMenu"]() {
    this["_openMenuId"] = null;
    if (this["_menuPortalEl"]) this["_menuPortalEl"]["open"] = ![];
  }
  ["_toggleMenu"](_0x3f8f38, _0x387287) {
    if (this["_openMenuId"] === _0x3f8f38["id"]) {
      this["_closeMenu"]();
      return;
    }
    this["_openMenuId"] = _0x3f8f38["id"], this["_openMenuPortal"](_0x3f8f38, _0x387287["currentTarget"]);
  }
  ["_openMenuPortal"](_0x386929, _0x1f5ff2) {
    var _a2, _b;
    if (!this["_menuPortalEl"]) return;
    const _0x4c7b07 = _0x1f5ff2["getBoundingClientRect"](), _0x279f05 = ((_a2 = this["layerManager"]) == null ? void 0 : _a2["isAnalysisResult"](_0x386929["id"])) ?? _0x386929["analysisResult"];
    this["_menuPortalEl"]["actions"] = buildLayerMenuActions({ "styleMode": _0x386929["styleMode"], "layerType": _0x386929["layerType"] }, { "styleEditorAvailable": this["_styleEditorAvailable"], "legendAvailable": this["_legendAvailable"], "layerExportAvailable": this["_layerExportAvailable"], "isAnalysisResult": _0x279f05, "isGeoTiffExportAvailable": ((_b = this["layerManager"]) == null ? void 0 : _b["isGeoTiffExportAvailable"](_0x386929["id"])) ?? ![] }, { "zoomToLayer": () => this["_zoomToLayer"](_0x386929["id"]), "bringToFront": () => this["_bringToFront"](_0x386929["id"]), "remove": () => this["_remove"](_0x386929["id"]), "openStyleEditor": () => this["_openStyleEditor"](_0x386929), "toggleLegend": () => this["_toggleLegend"](_0x386929["id"]), "exportLayer": () => this["_exportLayer"](_0x386929), "exportLayerKml": () => this["_exportLayerKml"](_0x386929), "exportLayerShapefile": () => this["_exportLayerShapefile"](_0x386929), "exportLayerAsGeoTiff": () => this["_exportLayerAsGeoTiff"](_0x386929) }), this["_menuPortalEl"]["x"] = _0x4c7b07["right"] + 4, this["_menuPortalEl"]["y"] = _0x4c7b07["top"], this["_menuPortalEl"]["open"] = !![];
  }
  ["_openStyleEditor"](_0x613a52) {
    var _a2;
    this["_closeMenu"](), this["_overlayCoordinator"]["closeOthers"]("styleEditor"), (_a2 = this["_styleEditorPortal"]["element"]) == null ? void 0 : _a2["openFor"](_0x613a52["id"], _0x613a52["title"], _0x613a52["layerType"], _0x613a52["fill"], _0x613a52["opacity"]);
  }
  ["_toggleLegend"](_0x3e82b6) {
    this["_closeMenu"]();
    const _0x12e791 = new Set(this["_legendOpenIds"]);
    if (_0x12e791["has"](_0x3e82b6)) _0x12e791["delete"](_0x3e82b6);
    else _0x12e791["add"](_0x3e82b6);
    this["_legendOpenIds"] = _0x12e791;
  }
  ["_exportLayer"](_0x3fb7d9) {
    var _a2;
    this["_closeMenu"]();
    if (!this["layerManager"]) return;
    (_a2 = this["_layerExportMarker"]) == null ? void 0 : _a2["exportLayer"](this["layerManager"], _0x3fb7d9["id"], _0x3fb7d9["title"]);
  }
  ["_exportLayerKml"](_0x14955e) {
    var _a2;
    this["_closeMenu"]();
    if (!this["layerManager"]) return;
    (_a2 = this["_layerExportMarker"]) == null ? void 0 : _a2["exportLayerKml"](this["layerManager"], _0x14955e["id"], _0x14955e["title"]);
  }
  ["_exportLayerShapefile"](_0x2a943c) {
    var _a2;
    this["_closeMenu"]();
    if (!this["layerManager"]) return;
    (_a2 = this["_layerExportMarker"]) == null ? void 0 : _a2["exportLayerShapefile"](this["layerManager"], _0x2a943c["id"], _0x2a943c["title"]);
  }
  async ["_exportLayerAsGeoTiff"](_0x37433f) {
    var _a2;
    this["_closeMenu"]();
    if (!this["layerManager"]) return;
    this["_geoTiffExportingId"] = _0x37433f["id"];
    try {
      await ((_a2 = this["_layerExportMarker"]) == null ? void 0 : _a2["exportLayerAsGeoTiff"](this["layerManager"], _0x37433f["id"], _0x37433f["title"]));
    } catch (_0x5f4407) {
      console["error"]("[tucbs-layer-list] GeoTIFF export başarısız:", _0x5f4407);
    } finally {
      this["_geoTiffExportingId"] = null;
    }
  }
  ["_applyReorder"](_0x401012, _0x35e282) {
    var _a2;
    const _0x23a883 = this["_layers"]["findIndex"]((_0x17f1e2) => _0x17f1e2["id"] === _0x401012), _0xb646e5 = _0x23a883 === -1 ? void 0 : this["_layers"][_0x23a883];
    if (!_0xb646e5) return;
    const _0x2ffe52 = this["_layers"]["filter"]((_0x2c1e88) => _0x2c1e88["id"] !== _0x401012), _0x5a05fc = _0x35e282 ? _0x2ffe52["findIndex"]((_0x56f4d8) => _0x56f4d8["id"] === _0x35e282) : -1, _0x201fad = _0x5a05fc === -1 ? _0x2ffe52["length"] : _0x5a05fc;
    _0x2ffe52["splice"](_0x201fad, 0, _0xb646e5), this["_layers"] = _0x2ffe52, _0x201fad !== _0x23a883 && ((_a2 = this["layerManager"]) == null ? void 0 : _a2["reorder"](this["_layers"]["map"]((_0x437bb5) => _0x437bb5["id"])));
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
          ${this["_layers"]["length"] === 0 ? b`<div class="layer-empty">Katman yok</div>` : c(this["_layers"], (_0x51e068) => _0x51e068["id"], (_0x2a4f21) => this["_renderLayerRow"](_0x2a4f21))}
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
  ["_renderLayerRow"](_0x21c8ee) {
    var _a2;
    const _0x56582d = _0x21c8ee["opacity"] * 100, _0x1dfbf1 = Math["round"](_0x56582d);
    return b`
      <div class="layer-item" data-layer-id=${_0x21c8ee["id"]}>
        <div class="layer-row">
          <button
            type="button"
            class="drag-handle"
            data-tooltip="Sürükleyerek Sırala"
            aria-label="${_0x21c8ee["title"]} katmanını sırala"
            @pointerdown=${(_0xf9e7d8) => {
      const _0x1871cc = _0xf9e7d8["currentTarget"], _0x2ad851 = _0x1871cc["closest"](".layer-item"), _0x18599e = _0x2ad851 == null ? void 0 : _0x2ad851["closest"](".layer-list");
      _0x2ad851 instanceof HTMLElement && _0x18599e instanceof HTMLElement && this["_dragReorder"]["start"](_0xf9e7d8, _0x2ad851, _0x1871cc, _0x18599e);
    }}
          >
            ${ICON_DRAG_HANDLE}
          </button>

          <cds-checkbox
            .checked=${_0x21c8ee["visible"]}
            aria-label=${_0x21c8ee["title"]}
            @cds-checkbox-changed=${(_0x4f2850) => {
      var _a3;
      const _0x5e0164 = ((_a3 = _0x4f2850["detail"]) == null ? void 0 : _a3["checked"]) ?? !_0x21c8ee["visible"];
      this["_setVisible"](_0x21c8ee["id"], !!_0x5e0164);
    }}
          ></cds-checkbox>

          ${_0x21c8ee["layerType"] !== "DRAWING" && _0x21c8ee["layerType"] !== "MEASURE" ? b`
                <span
                  class="layer-color-dot"
                  style="background:${_0x21c8ee["fill"]}"
                  title=${_0x21c8ee["styleMode"] === "solid" ? "Katman rengi" : "Katman rengi (yalnız sabit renk modunda değiştirilebilir)"}
                >
                  <input
                    type="color"
                    .value=${toHexColor(_0x21c8ee["fill"])}
                    ?disabled=${_0x21c8ee["styleMode"] !== "solid"}
                    aria-label="${_0x21c8ee["title"]} rengi"
                    @input=${(_0x42d50d) => {
      this["_setLayerColor"](_0x21c8ee["id"], _0x42d50d["target"]["value"]);
    }}
                  />
                </span>
              ` : ""}
          <span class="layer-name" title=${_0x21c8ee["title"]}>${_0x21c8ee["title"]}</span>

          <div class="layer-actions">
            <div class="layer-options">
              <button
                type="button"
                class="options-btn"
                aria-label=${this["_geoTiffExportingId"] === _0x21c8ee["id"] ? "GeoTIFF İndiriliyor…" : "Katman Seçenekleri"}
                aria-haspopup="menu"
                aria-expanded=${this["_openMenuId"] === _0x21c8ee["id"]}
                ?disabled=${this["_geoTiffExportingId"] === _0x21c8ee["id"]}
                @click=${(_0x2f95d4) => {
      this["_hidePortalTooltip"](), this["_toggleMenu"](_0x21c8ee, _0x2f95d4);
    }}
                @mouseenter=${(_0x867752) => this["_showPortalTooltip"](_0x867752["currentTarget"], this["_geoTiffExportingId"] === _0x21c8ee["id"] ? "GeoTIFF İndiriliyor…" : "Katman Seçenekleri")}
                @mouseleave=${() => this["_hidePortalTooltip"]()}
                @focus=${(_0x4a4f37) => this["_showPortalTooltip"](_0x4a4f37["currentTarget"], this["_geoTiffExportingId"] === _0x21c8ee["id"] ? "GeoTIFF İndiriliyor…" : "Katman Seçenekleri")}
                @blur=${() => this["_hidePortalTooltip"]()}
              >
                ${this["_geoTiffExportingId"] === _0x21c8ee["id"] ? b`<span class="options-btn-spinner"></span>` : ICON_OVERFLOW_MENU}
              </button>
            </div>
          </div>
        </div>

        ${_0x21c8ee["layerType"] !== "DRAWING" && _0x21c8ee["layerType"] !== "MEASURE" ? b`
              <div class="layer-opacity-row">
                <span class="layer-opacity-pct">%${_0x1dfbf1}</span>
                <input
                  type="range"
                  class="opacity-slider"
                  min="0"
                  max="100"
                  step="0.1"
                  .value=${String(_0x56582d)}
                  style="--fill: ${_0x56582d}%"
                  @input=${(_0x287783) => {
      const _0x33a511 = _0x287783["target"], _0x23bcd7 = Number(_0x33a511["value"]);
      this["_updateOpacitySlider"](_0x33a511, _0x23bcd7), this["_setOpacity"](_0x21c8ee["id"], _0x23bcd7 / 100);
    }}
                />
              </div>
            ` : ""}

        ${this["_legendAvailable"] && _0x21c8ee["styleMode"] !== "solid" && this["_legendOpenIds"]["has"](_0x21c8ee["id"]) ? b`<tucbs-legend-panel
              layerId=${_0x21c8ee["id"]}
              layerType=${_0x21c8ee["layerType"]}
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
function showToast(_0x372767, _0x4a02d1) {
  destroyToast();
  const _0x423c21 = document["createElement"]("div");
  document["body"]["appendChild"](_0x423c21);
  const _0x3aa13b = _0x423c21["attachShadow"]({ "mode": "open" }), _0x2c1d16 = new CSSStyleSheet();
  _0x2c1d16["replaceSync"](TOAST_STYLES["cssText"]), _0x3aa13b["adoptedStyleSheets"] = [_0x2c1d16], activeToastEl = _0x423c21;
  const _0x562adb = TOAST_TIMEOUT_MS[_0x372767];
  D(b`
      <cds-inline-notification
        kind=${_0x372767}
        hide-close-button
        timeout=${_0x562adb}
        subtitle=${_0x4a02d1}
        @cds-notification-closed=${() => destroyToast()}
      ></cds-inline-notification>
    `, _0x3aa13b);
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
function dispatch(_0x376f18) {
  document["dispatchEvent"](new CustomEvent("tucbs-busy-changed", { "detail": { "busy": refCount > 0, "message": _0x376f18 } }));
}
function beginBusy(_0x441e44) {
  ensureOverlay(), refCount++, dispatch(_0x441e44);
}
function endBusy() {
  refCount = Math["max"](0, refCount - 1), dispatch();
}
var __defProp$q = Object["defineProperty"], __getOwnPropDesc$r = Object["getOwnPropertyDescriptor"], __decorateClass$r = (_0x448789, _0x38f384, _0x17e19a, _0x2f23b5) => {
  var _0x364917 = _0x2f23b5 > 1 ? void 0 : _0x2f23b5 ? __getOwnPropDesc$r(_0x38f384, _0x17e19a) : _0x38f384;
  for (var _0x3910f6 = _0x448789["length"] - 1, _0xa30fcd; _0x3910f6 >= 0; _0x3910f6--) if (_0xa30fcd = _0x448789[_0x3910f6]) _0x364917 = (_0x2f23b5 ? _0xa30fcd(_0x38f384, _0x17e19a, _0x364917) : _0xa30fcd(_0x364917)) || _0x364917;
  if (_0x2f23b5 && _0x364917) __defProp$q(_0x38f384, _0x17e19a, _0x364917);
  return _0x364917;
};
function carbonIcon$1(_0x17f6c0) {
  return o$1(iconNodeToString(_0x17f6c0));
}
const ICON_API_KEY = carbonIcon$1(_20_default$5), ICON_CLOSE$4 = carbonIcon$1(_16_default$v), ICON_LINK = carbonIcon$1(_16_default$j);
let TucbsAuthorizedLayers = class extends i$2 {
  constructor() {
    super(...arguments), this["customCss"] = "", this["_customCssState"] = { "sheet": null }, this["_authorizedLayersLoading"] = ![], this["_authorizedPickerOpen"] = ![], this["_authorizedItems"] = [], this["_authorizedSelectedKeys"] = [], this["_authorizedFetchError"] = "", this["_authorizedAddError"] = "", this["_tokenUrlDialogOpen"] = ![], this["_tokenUrlDialogValue"] = "", this["_tokenUrlDialogTitle"] = "", this["_tooltipPortalEl"] = null, this["_dialogDrag"] = new DraggablePanelController(this, { "getPanel": (_0x4cb13) => {
      const _0xda5afb = _0x4cb13["closest"](".authorized-dialog");
      return _0xda5afb instanceof HTMLElement ? _0xda5afb : null;
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
  ["updated"](_0x56504b) {
    super["updated"](_0x56504b);
    _0x56504b["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_customCssState"], "tucbs-authorized-layers");
    if (this["_authorizedPickerOpen"]) this["_syncAuthorizedListMaxHeight"]();
  }
  async ["fetchAndOpen"]() {
    if (!this["layerManager"] || this["_authorizedLayersLoading"]) return;
    this["_authorizedLayersLoading"] = !![], beginBusy("Yetkili katmanlar getiriliyor…"), this["_authorizedFetchError"] = "", this["_authorizedAddError"] = "";
    try {
      const _0x4e6a40 = await this["layerManager"]["getAuthorizedLayers"]();
      this["_authorizedItems"] = _0x4e6a40, this["_authorizedSelectedKeys"] = [], this["_authorizedPickerOpen"] = !![], _0x4e6a40["length"] === 0 && (this["_authorizedFetchError"] = "Bu API key için yetkili katman bulunamadı.");
    } catch (_0x3db6ec) {
      _0x3db6ec instanceof TucbsError && console["error"]("[tucbs-authorized-layers] " + _0x3db6ec["code"] + " (" + _0x3db6ec["number"] + "): " + _0x3db6ec["message"]), this["_authorizedItems"] = [], this["_authorizedPickerOpen"] = !![], this["_authorizedFetchError"] = _0x3db6ec instanceof Error ? _0x3db6ec["message"] : "Yetkili katman listesi alınamadı.";
    } finally {
      this["_authorizedLayersLoading"] = ![], endBusy();
    }
  }
  ["closePicker"]() {
    this["_authorizedPickerOpen"] = ![], this["_authorizedAddError"] = "", this["_closeTokenUrlDialog"]();
  }
  ["_openTokenUrlDialog"](_0x4970ed) {
    var _a2;
    const _0x51a7fc = (_a2 = _0x4970ed["tokenUrl"]) == null ? void 0 : _a2["trim"]();
    if (!_0x51a7fc) {
      showToast("warning", "Bu katman için token URL bulunamadı.");
      return;
    }
    this["_tokenUrlDialogTitle"] = _0x4970ed["katmanAdi"] || _0x4970ed["ogcLayerName"] || "Token URL", this["_tokenUrlDialogValue"] = _0x51a7fc, this["_tokenUrlDialogOpen"] = !![];
  }
  ["_closeTokenUrlDialog"]() {
    this["_tokenUrlDialogOpen"] = ![], this["_tokenUrlDialogValue"] = "", this["_tokenUrlDialogTitle"] = "";
  }
  async ["_copyTokenUrl"]() {
    const _0x10ca8f = this["_tokenUrlDialogValue"]["trim"]();
    if (!_0x10ca8f) return;
    try {
      await navigator["clipboard"]["writeText"](_0x10ca8f), showToast("info", "Token URL panoya kopyalandı.");
    } catch {
      showToast("error", "Panoya kopyalanamadı.");
    }
  }
  ["_authorizedKey"](_0x4b67ef) {
    return _0x4b67ef["id"] ?? _0x4b67ef["servisTuru"] + "|" + _0x4b67ef["servisUrl"] + "|" + _0x4b67ef["ogcLayerName"];
  }
  ["_authorizedCanAdd"](_0x3bafb1) {
    var _a2;
    return ((_a2 = this["layerManager"]) == null ? void 0 : _a2["canAddAuthorizedLayer"](_0x3bafb1)) ?? ![];
  }
  ["_toggleAuthorizedSelected"](_0x63c619, _0x570493) {
    this["_authorizedSelectedKeys"] = _0x570493 ? [...this["_authorizedSelectedKeys"], _0x63c619] : this["_authorizedSelectedKeys"]["filter"]((_0x2ff9a4) => _0x2ff9a4 !== _0x63c619);
  }
  async ["_addSelectedAuthorizedLayers"]() {
    if (!this["layerManager"]) {
      this["_authorizedAddError"] = "Harita hazır değil, katman eklenemedi.";
      return;
    }
    const _0x328abd = this["_authorizedItems"]["filter"]((_0x2b1eed) => {
      const _0x403367 = this["_authorizedKey"](_0x2b1eed);
      return this["_authorizedSelectedKeys"]["includes"](_0x403367) && this["_authorizedCanAdd"](_0x2b1eed);
    });
    if (_0x328abd["length"] === 0) return;
    beginBusy("Katmanlar ekleniyor…"), this["_authorizedAddError"] = "";
    const _0x5d3d31 = [];
    for (const _0x357647 of _0x328abd) {
      try {
        await this["layerManager"]["addAuthorizedLayer"](_0x357647);
      } catch {
        _0x5d3d31["push"](_0x357647["katmanAdi"] || _0x357647["ogcLayerName"]);
      }
    }
    this["_authorizedSelectedKeys"] = _0x5d3d31["length"] === 0 ? [] : _0x328abd["filter"]((_0x46b940) => _0x5d3d31["includes"](_0x46b940["katmanAdi"] || _0x46b940["ogcLayerName"]))["map"]((_0x42d6aa) => this["_authorizedKey"](_0x42d6aa)), endBusy(), _0x5d3d31["length"] === 0 ? this["closePicker"]() : this["_authorizedAddError"] = _0x5d3d31["length"] + "/" + _0x328abd["length"] + " katman eklenemedi: " + _0x5d3d31["join"](", ");
  }
  ["_authorizedAddButtonLabel"]() {
    const _0x3cebf8 = this["_authorizedSelectedKeys"]["filter"]((_0x15eff1) => {
      const _0x17a8d9 = this["_authorizedItems"]["find"]((_0x217a04) => this["_authorizedKey"](_0x217a04) === _0x15eff1);
      return _0x17a8d9 && this["_authorizedCanAdd"](_0x17a8d9);
    })["length"];
    if (_0x3cebf8 > 1) return "Haritaya Ekle (" + _0x3cebf8 + ")";
    return "Haritaya Ekle";
  }
  ["_syncAuthorizedListMaxHeight"]() {
    var _a2;
    const _0xbde5ed = (_a2 = this["shadowRoot"]) == null ? void 0 : _a2["querySelector"](".authorized-list");
    if (!_0xbde5ed) return;
    const _0x42f27d = Array["from"](_0xbde5ed["querySelectorAll"](".authorized-row")), _0x55466f = TucbsAuthorizedLayers["AUTHORIZED_VISIBLE_ROWS"];
    if (_0x42f27d["length"] <= _0x55466f) {
      _0xbde5ed["style"]["maxHeight"] = "";
      return;
    }
    const _0x3ff769 = _0x42f27d[_0x55466f - 1];
    if (!_0x3ff769) return;
    const _0x5415cb = _0xbde5ed["getBoundingClientRect"]()["top"], _0x1eb88c = _0x3ff769["getBoundingClientRect"]()["bottom"], _0x1d0799 = _0x1eb88c - _0x5415cb;
    _0xbde5ed["style"]["maxHeight"] = _0x1d0799 + "px";
  }
  ["_showPortalTooltip"](_0x563d29, _0x3dbe4a) {
    if (!this["_tooltipPortalEl"]) return;
    const _0x4a8aa4 = _0x563d29["getBoundingClientRect"]();
    this["_tooltipPortalEl"]["text"] = _0x3dbe4a, this["_tooltipPortalEl"]["x"] = _0x4a8aa4["left"], this["_tooltipPortalEl"]["y"] = _0x4a8aa4["bottom"] + 6, this["_tooltipPortalEl"]["open"] = !![];
  }
  ["_hidePortalTooltip"]() {
    if (this["_tooltipPortalEl"]) this["_tooltipPortalEl"]["open"] = ![];
  }
  ["render"]() {
    if (!this["_authorizedPickerOpen"]) return A;
    return this["_renderAuthorizedPicker"]();
  }
  ["_renderAuthorizedPicker"]() {
    const _0x3b02b7 = this["_authorizedSelectedKeys"]["filter"]((_0x25b427) => {
      const _0x376e1b = this["_authorizedItems"]["find"]((_0x273318) => this["_authorizedKey"](_0x273318) === _0x25b427);
      return _0x376e1b && this["_authorizedCanAdd"](_0x376e1b);
    })["length"];
    return b`
      <div
        class="authorized-dialog"
        role="dialog"
        aria-label="Yetkili katmanlar"
      >
        <div
          class="authorized-dialog-header"
          @pointerdown=${(_0x41c764) => this["_dialogDrag"]["start"](_0x41c764)}
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
                  ${this["_authorizedItems"]["map"]((_0x2b72d2) => {
      var _a2, _b;
      const _0x28717f = this["_authorizedKey"](_0x2b72d2), _0x4ba980 = this["_authorizedCanAdd"](_0x2b72d2), _0x36e269 = _0x2b72d2["katmanAdi"] || _0x2b72d2["ogcLayerName"], _0x681945 = [_0x2b72d2["servisTuru"], _0x2b72d2["ogcLayerName"] !== _0x36e269 ? _0x2b72d2["ogcLayerName"] : "", _0x2b72d2["ustKurumAdi"]]["filter"](Boolean), _0x56bce6 = !_0x4ba980 && ((_a2 = _0x2b72d2["servisTuru"]) == null ? void 0 : _a2["toUpperCase"]()) === "WMTS" && !_0x2b72d2["wmtsTileMatrixSet"] ? " (TileMatrixSet eksik)" : !_0x4ba980 ? " (eksik bilgi)" : "";
      return b`
                      <div
                        class="authorized-row ${_0x4ba980 ? "" : "authorized-row--disabled"}"
                      >
                        <div class="authorized-row-main">
                          <cds-checkbox
                            title=${_0x36e269}
                            ?disabled=${!_0x4ba980}
                            .checked=${this["_authorizedSelectedKeys"]["includes"](_0x28717f)}
                            @cds-checkbox-changed=${(_0x32725a) => {
        var _a3;
        if (!_0x4ba980) return;
        this["_toggleAuthorizedSelected"](_0x28717f, !!((_a3 = _0x32725a["detail"]) == null ? void 0 : _a3["checked"]));
      }}
                          >
                            ${_0x36e269}${_0x56bce6}
                          </cds-checkbox>
                          <button
                            type="button"
                            class="authorized-token-btn"
                            aria-label="URL Göster"
                            ?disabled=${!((_b = _0x2b72d2["tokenUrl"]) == null ? void 0 : _b["trim"]())}
                            @click=${(_0x28e81b) => {
        _0x28e81b["stopPropagation"](), this["_hidePortalTooltip"](), this["_openTokenUrlDialog"](_0x2b72d2);
      }}
                            @mouseenter=${(_0xd83699) => this["_showPortalTooltip"](_0xd83699["currentTarget"], "URL Göster")}
                            @mouseleave=${() => this["_hidePortalTooltip"]()}
                            @focus=${(_0x1b3fec) => this["_showPortalTooltip"](_0x1b3fec["currentTarget"], "URL Göster")}
                            @blur=${() => this["_hidePortalTooltip"]()}
                          >
                            ${ICON_LINK}
                          </button>
                        </div>
                        <div class="authorized-meta">
                          ${_0x681945["join"](" · ")}
                        </div>
                      </div>
                    `;
    })}
                </div>
                <div class="authorized-add-error">${this["_authorizedAddError"]}</div>
                <button
                  type="button"
                  class="authorized-add-btn"
                  ?disabled=${_0x3b02b7 === 0}
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
const a = Symbol["for"](""), o = (_0x3b7850) => {
  if ((_0x3b7850 == null ? void 0 : _0x3b7850["r"]) === a) return _0x3b7850 == null ? void 0 : _0x3b7850["_$litStatic$"];
}, s = (_0x4292ec) => ({ "_$litStatic$": _0x4292ec, "r": a }), l = /* @__PURE__ */ new Map(), n2 = (_0x3389e4) => (_0x241952, ..._0x507511) => {
  const _0x2100d7 = _0x507511["length"];
  let _0x1780ae, _0x326c97;
  const _0x29e2f9 = [], _0x69b3b5 = [];
  let _0x2da764, _0x3a81a4 = 0, _0x3f76a3 = ![];
  for (; _0x3a81a4 < _0x2100d7; ) {
    for (_0x2da764 = _0x241952[_0x3a81a4]; _0x3a81a4 < _0x2100d7 && void 0 !== (_0x326c97 = _0x507511[_0x3a81a4], _0x1780ae = o(_0x326c97)); ) _0x2da764 += _0x1780ae + _0x241952[++_0x3a81a4], _0x3f76a3 = !![];
    _0x3a81a4 !== _0x2100d7 && _0x69b3b5["push"](_0x326c97), _0x29e2f9["push"](_0x2da764), _0x3a81a4++;
  }
  if (_0x3a81a4 === _0x2100d7 && _0x29e2f9["push"](_0x241952[_0x2100d7]), _0x3f76a3) {
    const _0x4943f6 = _0x29e2f9["join"]("$$lit$$");
    void 0 === (_0x241952 = l["get"](_0x4943f6)) && (_0x29e2f9["raw"] = _0x29e2f9, l["set"](_0x4943f6, _0x241952 = _0x29e2f9)), _0x507511 = _0x69b3b5;
  }
  return _0x3389e4(_0x241952, ..._0x507511);
}, u = n2(b);
var __defProp$p = Object["defineProperty"], __getOwnPropDesc$q = Object["getOwnPropertyDescriptor"], __decorateClass$q = (_0x118434, _0x2b3cb3, _0x56b561, _0x96fb76) => {
  var _0x3ad462 = _0x96fb76 > 1 ? void 0 : _0x96fb76 ? __getOwnPropDesc$q(_0x2b3cb3, _0x56b561) : _0x2b3cb3;
  for (var _0x35882b = _0x118434["length"] - 1, _0x928871; _0x35882b >= 0; _0x35882b--) if (_0x928871 = _0x118434[_0x35882b]) _0x3ad462 = (_0x96fb76 ? _0x928871(_0x2b3cb3, _0x56b561, _0x3ad462) : _0x928871(_0x3ad462)) || _0x3ad462;
  if (_0x96fb76 && _0x3ad462) __defProp$p(_0x2b3cb3, _0x56b561, _0x3ad462);
  return _0x3ad462;
};
const MIN_ZOOM_LIMIT_TOLERANCE = 1.1, ICON_ZOOM_IN$1 = o$1(iconNodeToString(_16_default$1)), ICON_ZOOM_OUT = o$1(iconNodeToString(_16_default)), ICON_DEFAULT_EXTENT = o$1(iconNodeToString(_16_default$n));
let TucbsZoomTool = class extends i$2 {
  constructor() {
    super(...arguments), this["mapElementId"] = "", this["customCss"] = "", this["_customCssState"] = { "sheet": null }, this["_atMaxZoom"] = ![], this["_atMinZoom"] = ![];
  }
  ["updated"](_0x2753c0) {
    if (_0x2753c0["has"]("map")) this["_watchZoomLimits"]();
    _0x2753c0["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_customCssState"], "tucbs-zoom-tool");
  }
  ["firstUpdated"]() {
    bindMapByElementId(this, { "noIdTiming": "raf", ...standardMapBindingMessages("tucbs-zoom-tool", "islevsiz") });
  }
  ["_watchZoomLimits"]() {
    var _a2, _b;
    (_a2 = this["_unsubscribeZoomLimits"]) == null ? void 0 : _a2.call(this), this["_unsubscribeZoomLimits"] = void 0;
    const _0x4235fd = (_b = this["map"]) == null ? void 0 : _b["viewer"];
    if (!_0x4235fd) return;
    const _0x4532b6 = _0x4235fd["scene"]["screenSpaceCameraController"], _0xaa0dc4 = () => {
      const _0x35055a = _0x4235fd["camera"]["positionCartographic"]["height"];
      this["_atMaxZoom"] = _0x35055a >= _0x4532b6["maximumZoomDistance"] * 0.999, this["_atMinZoom"] = _0x35055a <= _0x4532b6["minimumZoomDistance"] * MIN_ZOOM_LIMIT_TOLERANCE;
    };
    _0xaa0dc4(), this["_unsubscribeZoomLimits"] = _0x4235fd["scene"]["postRender"]["addEventListener"](_0xaa0dc4);
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
var __defProp$o = Object["defineProperty"], __getOwnPropDesc$p = Object["getOwnPropertyDescriptor"], __decorateClass$p = (_0x532f14, _0x30a7b8, _0x3d5ac5, _0x2d6603) => {
  var _0x4c4b11 = _0x2d6603 > 1 ? void 0 : _0x2d6603 ? __getOwnPropDesc$p(_0x30a7b8, _0x3d5ac5) : _0x30a7b8;
  for (var _0x38ef18 = _0x532f14["length"] - 1, _0x368fdd; _0x38ef18 >= 0; _0x38ef18--) if (_0x368fdd = _0x532f14[_0x38ef18]) _0x4c4b11 = (_0x2d6603 ? _0x368fdd(_0x30a7b8, _0x3d5ac5, _0x4c4b11) : _0x368fdd(_0x4c4b11)) || _0x4c4b11;
  if (_0x2d6603 && _0x4c4b11) __defProp$o(_0x30a7b8, _0x3d5ac5, _0x4c4b11);
  return _0x4c4b11;
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
    const _0x402792 = document["createElement"]("tucbs-slide-over-panel");
    _0x402792["panelTitle"] = "Koordinata Git", _0x402792["panelWidth"] = this["panelWidth"], _0x402792["onCloseRequest"] = () => this["_close"](), document["body"]["appendChild"](_0x402792), this["_panelEl"] = _0x402792, this["_renderIntoPanel"]();
  }
  ["disconnectedCallback"]() {
    var _a2, _b;
    if (this["map"]) this["_layoutController"]["unbindMap"](this["map"]);
    (_a2 = this["map"]) == null ? void 0 : _a2["clearMarker"](), (_b = this["_panelEl"]) == null ? void 0 : _b["remove"](), this["_panelEl"] = null, super["disconnectedCallback"]();
  }
  ["firstUpdated"]() {
    bindMapByElementId(this, { "noIdTiming": "raf", ...standardMapBindingMessages("tucbs-goto-coordinate", "islevsiz") });
  }
  ["updated"](_0x2f969e) {
    _0x2f969e["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_customCssState"], "tucbs-goto-coordinate");
    if (_0x2f969e["has"]("map")) {
      const _0x34d86b = _0x2f969e["get"]("map");
      if (_0x34d86b) this["_layoutController"]["unbindMap"](_0x34d86b);
      if (this["map"]) this["_layoutController"]["bindMap"](this["map"]);
    }
    _0x2f969e["has"]("panelWidth") && this["_open"] && this["_layoutController"]["setOpen"](!![], this["panelWidth"]);
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
  ["_isValid"](_0x984bf6, _0xa66e41) {
    return Number["isFinite"](_0x984bf6) && _0x984bf6 >= -90 && _0x984bf6 <= 90 && Number["isFinite"](_0xa66e41) && _0xa66e41 >= -180 && _0xa66e41 <= 180;
  }
  static ["_sanitizeCoordinateInput"](_0x4c99df) {
    const _0x2d8214 = _0x4c99df["trimStart"]()["startsWith"]("-"), _0x491791 = _0x4c99df["replace"](/[^0-9.,]/g, ""), _0x348a7a = _0x491791["search"](/[.,]/), _0x4b6e5a = _0x348a7a === -1 ? _0x491791 : _0x491791["slice"](0, _0x348a7a + 1) + _0x491791["slice"](_0x348a7a + 1)["replaceAll"](/[.,]/g, "");
    return (_0x2d8214 ? "-" : "") + _0x4b6e5a;
  }
  static ["_parseCoordinate"](_0x44f997) {
    return _0x44f997["trim"]() === "" ? Number["NaN"] : Number(_0x44f997["replace"](",", "."));
  }
  ["_handleCoordInput"](_0x16cf85, _0x5a8237) {
    const _0x34648b = _0x16cf85["target"], _0x9c88ff = TucbsGoToCoordinate["_sanitizeCoordinateInput"](_0x34648b["value"]);
    if (_0x34648b["value"] !== _0x9c88ff) _0x34648b["value"] = _0x9c88ff;
    if (_0x5a8237 === "lat") this["_lat"] = _0x9c88ff;
    else this["_lon"] = _0x9c88ff;
  }
  ["_handleKeydown"](_0x226cb8) {
    if (_0x226cb8["key"] === "Enter") this["_submit"]();
  }
  ["_submit"]() {
    const _0x4b2629 = TucbsGoToCoordinate["_parseCoordinate"](this["_lat"]), _0x348d50 = TucbsGoToCoordinate["_parseCoordinate"](this["_lon"]);
    if (!this["_isValid"](_0x4b2629, _0x348d50) || !this["map"]) return;
    this["map"]["dropMarker"](_0x348d50, _0x4b2629, GOTO_COORDINATE_PIN_URL, GOTO_COORDINATE_PIN_OPTIONS), this["map"]["interactionManager"]["flyToPosition"](_0x348d50, _0x4b2629, { "height": 1e3, "duration": 1.5 });
  }
  ["_renderIntoPanel"]() {
    if (!this["_panelEl"]) return;
    this["_panelEl"]["open"] = this["_open"];
    const _0x421496 = TucbsGoToCoordinate["_parseCoordinate"](this["_lat"]), _0x18a225 = TucbsGoToCoordinate["_parseCoordinate"](this["_lon"]), _0x49f99d = this["_isValid"](_0x421496, _0x18a225), _0x320cae = (this["_lat"] !== "" || this["_lon"] !== "") && !_0x49f99d;
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
              @input=${(_0x42c27) => this["_handleCoordInput"](_0x42c27, "lat")}
              @keydown=${(_0x41d214) => this["_handleKeydown"](_0x41d214)}
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
              @input=${(_0xec04ac) => this["_handleCoordInput"](_0xec04ac, "lon")}
              @keydown=${(_0x24916f) => this["_handleKeydown"](_0x24916f)}
            ></cds-text-input>
          </div>
          ${_0x320cae ? b`<span class="tucbs-goto-error">Enlem -90..90, Boylam -180..180 aralığında olmalı</span>` : ""}
          <button type="button" class="tucbs-goto-submit" ?disabled=${!_0x49f99d} @click=${() => this["_submit"]()}>
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
function showGuide(_0x549c36, _0x220513) {
  hideGuide();
  const _0x5efa5b = document["createElement"]("div");
  document["body"]["appendChild"](_0x5efa5b);
  const _0x4592dd = _0x5efa5b["attachShadow"]({ "mode": "open" }), _0x3b0a56 = new CSSStyleSheet();
  _0x3b0a56["replaceSync"](GUIDE_STYLES["cssText"]), _0x4592dd["adoptedStyleSheets"] = [_0x3b0a56], activeGuideEl = _0x5efa5b, D(b`
      <cds-inline-notification kind="info" role="status" hide-close-button low-contrast>
        <div slot="subtitle">
          <p class="guide-title">${_0x549c36}</p>
          <ul>
            ${_0x220513["map"]((_0x3fe311) => b`<li>${_0x3fe311}</li>`)}
          </ul>
        </div>
      </cds-inline-notification>
    `, _0x4592dd);
}
function hideGuide() {
  activeGuideEl == null ? void 0 : activeGuideEl["remove"](), activeGuideEl = null;
}
const EXIT = "Araçtan çıkmak için sağ tıklayın.", ADD_POINT = "Haritaya sol tıklayarak nokta ekleyin.", CANCEL_DRAWING = "Çizimi Esc ile iptal edin.", FINISH_MULTI = "Çizimi çift tıklayarak bitirin.", FINISH_MEASURE = "Ölçümü çift tıklayarak bitirin.", CANCEL_MEASURE = "Ölçümü Esc ile iptal edin.", DRAW_GUIDES = { "point": { "title": "Nokta Çiz", "steps": ["Nokta eklemek için haritaya sol tıklayın.", EXIT] }, "polyline": { "title": "Çizgi Çiz", "steps": [ADD_POINT, FINISH_MULTI, CANCEL_DRAWING, EXIT] }, "polygon": { "title": "Alan Çiz", "steps": [ADD_POINT, FINISH_MULTI, CANCEL_DRAWING, EXIT] }, "rectangle": { "title": "Dikdörtgen Çiz", "steps": ["Bir köşeye sol tıklayın.", "Karşı köşeye sol tıklayarak bitirin.", CANCEL_DRAWING, EXIT] }, "circle": { "title": "Daire Çiz", "steps": ["Merkeze sol tıklayın.", "Yarıçap noktasına sol tıklayarak bitirin.", CANCEL_DRAWING, EXIT] }, "freehand": { "title": "Serbest Çizim", "steps": ["Sol tuşa basılı tutarak çizin, bırakınca bitirin.", CANCEL_DRAWING, EXIT] } }, MEASURE_GUIDES = { "polyline": { "title": "Mesafe Ölç", "steps": [ADD_POINT, FINISH_MEASURE, CANCEL_MEASURE, EXIT] }, "polygon": { "title": "Alan Ölç", "steps": [ADD_POINT, FINISH_MEASURE, CANCEL_MEASURE, EXIT] } };
function drawGuide(_0x5eb21b, _0x10ac70) {
  if (_0x10ac70 === "measure") return MEASURE_GUIDES[_0x5eb21b] ?? DRAW_GUIDES[_0x5eb21b];
  return DRAW_GUIDES[_0x5eb21b];
}
var __defProp$n = Object["defineProperty"], __getOwnPropDesc$o = Object["getOwnPropertyDescriptor"], __decorateClass$o = (_0x290a6c, _0x30c0b2, _0x2f5b1a, _0x523d5e) => {
  var _0x127b53 = _0x523d5e > 1 ? void 0 : _0x523d5e ? __getOwnPropDesc$o(_0x30c0b2, _0x2f5b1a) : _0x30c0b2;
  for (var _0x1c1eda = _0x290a6c["length"] - 1, _0x39dfbc; _0x1c1eda >= 0; _0x1c1eda--) if (_0x39dfbc = _0x290a6c[_0x1c1eda]) _0x127b53 = (_0x523d5e ? _0x39dfbc(_0x30c0b2, _0x2f5b1a, _0x127b53) : _0x39dfbc(_0x127b53)) || _0x127b53;
  if (_0x523d5e && _0x127b53) __defProp$n(_0x30c0b2, _0x2f5b1a, _0x127b53);
  return _0x127b53;
};
const TOOL_ICON_NODES = { "point": _16_default$q, "polyline": _16_default$z, "polygon": _16_default$m, "rectangle": _16_default$7, "circle": _16_default$w, "freehand": _16_default$e }, MAIN_ICON$1 = o$1(iconNodeToString(_16_default$8)), iconCache$1 = /* @__PURE__ */ new Map();
function iconFor$1(_0x4b4248) {
  const _0xe117a5 = iconCache$1["get"](_0x4b4248);
  if (_0xe117a5) return _0xe117a5;
  const _0x634f74 = TOOL_ICON_NODES[_0x4b4248], _0x2fdf73 = _0x634f74 ? o$1(iconNodeToString(_0x634f74)) : o$1("");
  return iconCache$1["set"](_0x4b4248, _0x2fdf73), _0x2fdf73;
}
let TucbsDrawTool = class extends i$2 {
  constructor() {
    super(...arguments), this["mapElementId"] = "", this["tools"] = "point,polyline,polygon", this["customCss"] = "", this["_activeTool"] = null, this["_flyoutOpen"] = ![], this["_customCssState"] = { "sheet": null }, this["_onDrawStart"] = ({ tool: _0x463411, source: _0x369937 }) => {
      this["_activeTool"] = _0x369937 === "draw" && this["_toolIds"]()["includes"](_0x463411) ? _0x463411 : null;
      if (_0x369937 === "draw") {
        const { title: _0x46eb0b, steps: _0x2611be } = drawGuide(_0x463411, "draw");
        showGuide(_0x46eb0b, _0x2611be);
      }
      this["_flyoutOpen"] = ![];
    }, this["_onDrawCancel"] = () => {
      this["_activeTool"] = null, hideGuide();
    };
  }
  ["_toolIds"]() {
    return this["tools"]["split"](",")["map"]((_0x5396cc) => _0x5396cc["trim"]())["filter"](Boolean);
  }
  ["disconnectedCallback"]() {
    if (this["map"]) this["_unbindDrawingManager"](this["map"]["drawingManager"]);
    if (this["_activeTool"] !== null) hideGuide();
    super["disconnectedCallback"]();
  }
  ["updated"](_0xc1e50f) {
    _0xc1e50f["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_customCssState"], "tucbs-draw-tool");
    if (_0xc1e50f["has"]("map")) {
      const _0x5d692b = _0xc1e50f["get"]("map");
      if (_0x5d692b) this["_unbindDrawingManager"](_0x5d692b["drawingManager"]);
      if (this["map"]) this["_bindDrawingManager"](this["map"]["drawingManager"]);
    }
  }
  ["_bindDrawingManager"](_0x459f06) {
    _0x459f06["on"]("draw:start", this["_onDrawStart"]), _0x459f06["on"]("draw:cancel", this["_onDrawCancel"]);
  }
  ["_unbindDrawingManager"](_0x4da7ba) {
    _0x4da7ba["off"]("draw:start", this["_onDrawStart"]), _0x4da7ba["off"]("draw:cancel", this["_onDrawCancel"]);
  }
  ["firstUpdated"]() {
    bindMapByElementId(this, { "noIdTiming": "raf", ...standardMapBindingMessages("tucbs-draw-tool", "islevsiz") });
  }
  ["_onMainButtonClick"]() {
    this["_flyoutOpen"] = !this["_flyoutOpen"];
  }
  ["_selectTool"](_0x3cd042) {
    var _a2;
    const _0x513f28 = (_a2 = this["map"]) == null ? void 0 : _a2["drawingManager"];
    if (!_0x513f28) return;
    this["_activeTool"] === _0x3cd042 ? _0x513f28["deactivate"]() : _0x513f28["activate"](_0x3cd042, "draw"), this["_flyoutOpen"] = ![];
  }
  ["render"]() {
    const _0xb784ef = this["_activeTool"] !== null ? iconFor$1(this["_activeTool"]) : MAIN_ICON$1, _0x3c1bdb = this["_activeTool"] !== null ? drawGuide(this["_activeTool"], "draw")["title"] : "Çizim";
    return b`
      <div class="draw-tool">
        ${this["_flyoutOpen"] ? b`
              <div class="flyout">
                ${this["_toolIds"]()["map"]((_0x11aec8) => b`
                    <button
                      class="tool-button ${_0x11aec8 === this["_activeTool"] ? "active" : ""}"
                      type="button"
                      aria-label=${drawGuide(_0x11aec8, "draw")["title"]}
                      data-tooltip=${drawGuide(_0x11aec8, "draw")["title"]}
                      @click=${() => this["_selectTool"](_0x11aec8)}
                    >
                      ${iconFor$1(_0x11aec8)}
                    </button>
                  `)}
              </div>
            ` : null}
        <button
          class="tool-button main-button ${this["_activeTool"] !== null ? "active" : ""}"
          type="button"
          aria-label=${_0x3c1bdb}
          data-tooltip=${_0x3c1bdb}
          @click=${this["_onMainButtonClick"]}
        >
          ${_0xb784ef}
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
var __defProp$m = Object["defineProperty"], __getOwnPropDesc$n = Object["getOwnPropertyDescriptor"], __decorateClass$n = (_0x4ca196, _0x519d18, _0x103b91, _0x2fc4f5) => {
  var _0x52dbf2 = _0x2fc4f5 > 1 ? void 0 : _0x2fc4f5 ? __getOwnPropDesc$n(_0x519d18, _0x103b91) : _0x519d18;
  for (var _0x4042ac = _0x4ca196["length"] - 1, _0x5063c5; _0x4042ac >= 0; _0x4042ac--) if (_0x5063c5 = _0x4ca196[_0x4042ac]) _0x52dbf2 = (_0x2fc4f5 ? _0x5063c5(_0x519d18, _0x103b91, _0x52dbf2) : _0x5063c5(_0x52dbf2)) || _0x52dbf2;
  if (_0x2fc4f5 && _0x52dbf2) __defProp$m(_0x519d18, _0x103b91, _0x52dbf2);
  return _0x52dbf2;
};
const ICON_TRASH_CAN = o$1(iconNodeToString(_16_default$6));
let TucbsDeleteTool = class extends i$2 {
  constructor() {
    super(...arguments), this["mapElementId"] = "", this["customCss"] = "", this["_confirming"] = ![], this["_customCssState"] = { "sheet": null };
  }
  ["updated"](_0x1a3a8b) {
    _0x1a3a8b["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_customCssState"], "tucbs-delete-tool");
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
    const _0xa18304 = (_a2 = this["map"]) == null ? void 0 : _a2["drawingManager"];
    this["_confirming"] = ![];
    if (!_0xa18304) return;
    if (_0xa18304["isActive"]()) _0xa18304["deactivate"]();
    _0xa18304["clearAll"]();
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
function metersToReadable(_0x94e345) {
  if (!isFinite(_0x94e345)) return "-";
  return _0x94e345 < 1e3 ? _0x94e345["toFixed"](2) + " m" : (_0x94e345 / 1e3)["toFixed"](2) + " km";
}
function sqmToReadable(_0x128464) {
  if (!isFinite(_0x128464)) return "-";
  return _0x128464 < 1e6 ? _0x128464["toFixed"](2) + " m²" : (_0x128464 / 1e6)["toFixed"](2) + " km²";
}
var __defProp$l = Object["defineProperty"], __getOwnPropDesc$m = Object["getOwnPropertyDescriptor"], __decorateClass$m = (_0x59ae6b, _0x4d0820, _0x1f7196, _0x4b8b8a) => {
  var _0x3f8ad1 = _0x4b8b8a > 1 ? void 0 : _0x4b8b8a ? __getOwnPropDesc$m(_0x4d0820, _0x1f7196) : _0x4d0820;
  for (var _0x3fde6f = _0x59ae6b["length"] - 1, _0x536a85; _0x3fde6f >= 0; _0x3fde6f--) if (_0x536a85 = _0x59ae6b[_0x3fde6f]) _0x3f8ad1 = (_0x4b8b8a ? _0x536a85(_0x4d0820, _0x1f7196, _0x3f8ad1) : _0x536a85(_0x3f8ad1)) || _0x3f8ad1;
  if (_0x4b8b8a && _0x3f8ad1) __defProp$l(_0x4d0820, _0x1f7196, _0x3f8ad1);
  return _0x3f8ad1;
};
const MODE_TOOL = { "distance": "polyline", "area": "polygon" }, MODE_ICON_NODES = { "distance": _16_default$b, "area": _16_default$A };
function modeLabel(_0x13bdf4) {
  return drawGuide(MODE_TOOL[_0x13bdf4], "measure")["title"];
}
const MAIN_ICON = o$1(iconNodeToString(_16_default$a)), iconCache = /* @__PURE__ */ new Map();
function iconFor(_0x3d0a0e) {
  const _0x1ad701 = iconCache["get"](_0x3d0a0e);
  if (_0x1ad701) return _0x1ad701;
  const _0x3542ba = o$1(iconNodeToString(MODE_ICON_NODES[_0x3d0a0e]));
  return iconCache["set"](_0x3d0a0e, _0x3542ba), _0x3542ba;
}
const EARTH_RADIUS_METERS = 6378137;
function projectMeters(_0x18622d, _0x473957) {
  const _0x51cc9e = _0x2d6059["toRadians"](_0x18622d[0]) * Math["cos"](_0x2d6059["toRadians"](_0x473957)) * EARTH_RADIUS_METERS, _0x2ee8f7 = _0x2d6059["toRadians"](_0x18622d[1]) * EARTH_RADIUS_METERS;
  return [_0x51cc9e, _0x2ee8f7];
}
function polygonAreaMeters(_0x4ab771) {
  if (_0x4ab771["length"] < 3) return 0;
  const _0x2a5113 = _0x4ab771[0];
  if (_0x2a5113 === void 0) return 0;
  const _0x1b3177 = _0x2a5113[1], _0x2e093c = _0x4ab771["map"]((_0x2b3592) => projectMeters(_0x2b3592, _0x1b3177));
  let _0x57b71e = 0;
  for (let _0x1e3584 = 0; _0x1e3584 < _0x2e093c["length"]; _0x1e3584++) {
    const _0x25e8f3 = _0x2e093c[_0x1e3584], _0x352cdd = _0x2e093c[(_0x1e3584 + 1) % _0x2e093c["length"]];
    if (_0x25e8f3 === void 0 || _0x352cdd === void 0) continue;
    _0x57b71e += _0x25e8f3[0] * _0x352cdd[1] - _0x352cdd[0] * _0x25e8f3[1];
  }
  return Math["abs"](_0x57b71e) / 2;
}
function toCartesian(_0x422432) {
  return Cartesian3["fromDegrees"](_0x422432[0], _0x422432[1]);
}
function centroidOf(_0x56149f) {
  let _0x454bde = 0, _0x454307 = 0, _0x26bb16 = 0;
  for (const _0x3c191a of _0x56149f) {
    const _0x579ae5 = toCartesian(_0x3c191a);
    _0x454bde += _0x579ae5["x"], _0x454307 += _0x579ae5["y"], _0x26bb16 += _0x579ae5["z"];
  }
  const _0xebae92 = _0x56149f["length"] || 1;
  return new Cartesian3(_0x454bde / _0xebae92, _0x454307 / _0xebae92, _0x26bb16 / _0xebae92);
}
function perimeterMeters(_0x4c8c34) {
  if (_0x4c8c34["length"] < 2) return 0;
  const _0x2fb02d = _0x4c8c34["map"](toCartesian);
  let _0xe08180 = 0;
  for (let _0x4640e1 = 0; _0x4640e1 < _0x2fb02d["length"] - 1; _0x4640e1++) {
    _0xe08180 += Cartesian3["distance"](_0x2fb02d[_0x4640e1], _0x2fb02d[_0x4640e1 + 1]);
  }
  return _0x2fb02d["length"] >= 3 && (_0xe08180 += Cartesian3["distance"](_0x2fb02d[_0x2fb02d["length"] - 1], _0x2fb02d[0])), _0xe08180;
}
const LABEL_FONT = "13px sans-serif", SEGMENT_LABEL_BG = Color["BLACK"]["withAlpha"](0.5), AREA_LABEL_BG = Color["BLACK"]["withAlpha"](0.45), TOTAL_LABEL_BG = Color["fromCssColorString"]("#1d4ed8")["withAlpha"](0.8), HIDDEN_POS = Cartesian3["fromDegrees"](0, 0, -1);
let TucbsMeasureTool = class extends i$2 {
  constructor() {
    super(...arguments), this["mapElementId"] = "", this["customCss"] = "", this["_activeMode"] = null, this["_flyoutOpen"] = ![], this["_customCssState"] = { "sheet": null }, this["_committedCoords"] = [], this["_pendingLabels"] = [], this["_shapeLabels"] = /* @__PURE__ */ new Map(), this["_claimingActivation"] = ![], this["_isSessionOwner"] = ![], this["_onDrawStart"] = ({ tool: _0x258b89, source: _0x274cbd }) => {
      if (_0x274cbd !== "measure") {
        this["_activeMode"] = null, this["_isSessionOwner"] = ![];
        return;
      }
      this["_activeMode"] = _0x258b89 === "polyline" ? "distance" : "area", this["_flyoutOpen"] = ![];
      const { title: _0x3b05b9, steps: _0x4c6298 } = drawGuide(_0x258b89, "measure");
      showGuide(_0x3b05b9, _0x4c6298), this["_isSessionOwner"] = this["_claimingActivation"], this["_claimingActivation"] = ![], this["_isSessionOwner"] && (this["_committedCoords"] = [], this["_livePreviewCoord"] = void 0, this["_pendingLabels"] = [], this["_ensureLiveLabels"]());
    }, this["_onDrawCancel"] = () => {
      this["_isSessionOwner"] && (this["_removeLiveLabels"](), this["_removePendingLabels"]()), this["_activeMode"] = null, this["_isSessionOwner"] = ![], hideGuide();
    }, this["_onAbort"] = () => {
      if (!this["_isSessionOwner"]) return;
      this["_removePendingLabels"]();
    }, this["_onVertex"] = ({ coordinates: _0x31a5f6 }) => {
      if (!this["_isSessionOwner"]) return;
      const _0x5eefba = this["_committedCoords"][this["_committedCoords"]["length"] - 1];
      this["_committedCoords"]["push"](_0x31a5f6), _0x5eefba !== void 0 && this["_pendingLabels"]["push"](this["_addStaticSegmentLabel"](_0x5eefba, _0x31a5f6));
    }, this["_onMove"] = ({ coordinates: _0x29af60 }) => {
      if (!this["_isSessionOwner"]) return;
      this["_livePreviewCoord"] = _0x29af60;
    }, this["_onComplete"] = ({ shape: _0x1d9a28 }) => {
      if (!this["_isSessionOwner"]) return;
      while (this["_committedCoords"]["length"] > _0x1d9a28["coordinates"]["length"]) {
        this["_committedCoords"]["pop"]();
        const _0x4f4925 = this["_pendingLabels"]["pop"]();
        if (_0x4f4925) this["_removeEntity"](_0x4f4925);
      }
      if (this["_activeMode"] === "distance" && _0x1d9a28["length"] !== void 0) this["_pendingLabels"]["push"](this["_addTotalDistanceLabel"](_0x1d9a28));
      else this["_activeMode"] === "area" && _0x1d9a28["area"] !== void 0 && _0x1d9a28["perimeter"] !== void 0 && this["_pendingLabels"]["push"](this["_addAreaSummaryLabel"](_0x1d9a28));
      this["_shapeLabels"]["set"](_0x1d9a28["id"], this["_pendingLabels"]), this["_pendingLabels"] = [], this["_committedCoords"] = [], this["_livePreviewCoord"] = void 0;
    }, this["_onRemove"] = ({ id: _0x146878 }) => {
      const _0x4e3981 = this["_shapeLabels"]["get"](_0x146878);
      if (!_0x4e3981) return;
      for (const _0x2cd36f of _0x4e3981) this["_removeEntity"](_0x2cd36f);
      this["_shapeLabels"]["delete"](_0x146878);
    }, this["_onMeasureLayerVisibility"] = ({ id: _0x646dca, visible: _0x2f41e0 }) => {
      if (_0x646dca !== MEASURE_LAYER_ID) return;
      for (const _0x28c046 of this["_allLabelEntities"]()) _0x28c046["show"] = _0x2f41e0;
    }, this["_onMeasureLayerRemove"] = ({ layer: _0x273245 }) => {
      if (_0x273245["id"] !== MEASURE_LAYER_ID) return;
      for (const _0x27c5a9 of this["_allLabelEntities"]()) this["_removeEntity"](_0x27c5a9);
      this["_shapeLabels"]["clear"](), this["_pendingLabels"] = [], this["_liveSegmentLabel"] = void 0, this["_liveAreaLabel"] = void 0;
    };
  }
  ["_allLabelEntities"]() {
    const _0x52b9d8 = [...this["_pendingLabels"]];
    for (const _0x544db5 of this["_shapeLabels"]["values"]()) _0x52b9d8["push"](..._0x544db5);
    if (this["_liveSegmentLabel"]) _0x52b9d8["push"](this["_liveSegmentLabel"]);
    if (this["_liveAreaLabel"]) _0x52b9d8["push"](this["_liveAreaLabel"]);
    return _0x52b9d8;
  }
  ["_bindLayerManager"](_0x1fc33f) {
    _0x1fc33f["on"]("layer:visibility", this["_onMeasureLayerVisibility"]), _0x1fc33f["on"]("layer:remove", this["_onMeasureLayerRemove"]);
  }
  ["_unbindLayerManager"](_0x1746bb) {
    _0x1746bb["off"]("layer:visibility", this["_onMeasureLayerVisibility"]), _0x1746bb["off"]("layer:remove", this["_onMeasureLayerRemove"]);
  }
  ["disconnectedCallback"]() {
    this["map"] && (this["_unbindDrawingManager"](this["map"]["drawingManager"]), this["_unbindLayerManager"](this["map"]["layerManager"]));
    this["_removeLiveLabels"](), this["_removePendingLabels"]();
    if (this["_activeMode"] !== null) hideGuide();
    super["disconnectedCallback"]();
  }
  ["updated"](_0x62280a) {
    _0x62280a["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_customCssState"], "tucbs-measure-tool");
    if (_0x62280a["has"]("map")) {
      const _0x3a4b8b = _0x62280a["get"]("map");
      _0x3a4b8b && (this["_unbindDrawingManager"](_0x3a4b8b["drawingManager"]), this["_unbindLayerManager"](_0x3a4b8b["layerManager"])), this["map"] && (this["_bindDrawingManager"](this["map"]["drawingManager"]), this["_bindLayerManager"](this["map"]["layerManager"]));
    }
  }
  ["_bindDrawingManager"](_0x3dd430) {
    _0x3dd430["on"]("draw:start", this["_onDrawStart"]), _0x3dd430["on"]("draw:cancel", this["_onDrawCancel"]), _0x3dd430["on"]("draw:abort", this["_onAbort"]), _0x3dd430["on"]("draw:vertex", this["_onVertex"]), _0x3dd430["on"]("draw:move", this["_onMove"]), _0x3dd430["on"]("draw:complete", this["_onComplete"]), _0x3dd430["on"]("draw:remove", this["_onRemove"]);
  }
  ["_unbindDrawingManager"](_0x337407) {
    _0x337407["off"]("draw:start", this["_onDrawStart"]), _0x337407["off"]("draw:cancel", this["_onDrawCancel"]), _0x337407["off"]("draw:abort", this["_onAbort"]), _0x337407["off"]("draw:vertex", this["_onVertex"]), _0x337407["off"]("draw:move", this["_onMove"]), _0x337407["off"]("draw:complete", this["_onComplete"]), _0x337407["off"]("draw:remove", this["_onRemove"]);
  }
  ["firstUpdated"]() {
    bindMapByElementId(this, { "noIdTiming": "raf", ...standardMapBindingMessages("tucbs-measure-tool", "islevsiz") });
  }
  ["_onMainButtonClick"]() {
    this["_flyoutOpen"] = !this["_flyoutOpen"];
  }
  ["_selectMode"](_0x160685) {
    var _a2;
    const _0x2e37c4 = (_a2 = this["map"]) == null ? void 0 : _a2["drawingManager"];
    if (!_0x2e37c4) return;
    this["_activeMode"] === _0x160685 ? _0x2e37c4["deactivate"]() : (this["_claimingActivation"] = !![], _0x2e37c4["activate"](MODE_TOOL[_0x160685], "measure")), this["_flyoutOpen"] = ![];
  }
  ["_removeEntity"](_0x458cee) {
    var _a2;
    (_a2 = this["map"]) == null ? void 0 : _a2["viewer"]["entities"]["remove"](_0x458cee);
  }
  ["_removeLiveLabels"]() {
    this["_liveSegmentLabel"] && (this["_removeEntity"](this["_liveSegmentLabel"]), this["_liveSegmentLabel"] = void 0), this["_liveAreaLabel"] && (this["_removeEntity"](this["_liveAreaLabel"]), this["_liveAreaLabel"] = void 0);
  }
  ["_removePendingLabels"]() {
    for (const _0x2164f0 of this["_pendingLabels"]) this["_removeEntity"](_0x2164f0);
    this["_pendingLabels"] = [], this["_committedCoords"] = [], this["_livePreviewCoord"] = void 0;
  }
  ["_liveSegmentMidpoint"]() {
    const _0x48f6ce = this["_committedCoords"][this["_committedCoords"]["length"] - 1];
    if (_0x48f6ce === void 0 || this["_livePreviewCoord"] === void 0) return void 0;
    return Cartesian3["midpoint"](toCartesian(_0x48f6ce), toCartesian(this["_livePreviewCoord"]), new Cartesian3());
  }
  ["_liveSegmentDistance"]() {
    const _0x59feb6 = this["_committedCoords"][this["_committedCoords"]["length"] - 1];
    if (_0x59feb6 === void 0 || this["_livePreviewCoord"] === void 0) return void 0;
    return Cartesian3["distance"](toCartesian(_0x59feb6), toCartesian(this["_livePreviewCoord"]));
  }
  ["_livePolygonCoords"]() {
    return this["_livePreviewCoord"] ? [...this["_committedCoords"], this["_livePreviewCoord"]] : [...this["_committedCoords"]];
  }
  ["_ensureLiveLabels"]() {
    var _a2;
    const _0x3f87f0 = (_a2 = this["map"]) == null ? void 0 : _a2["viewer"];
    if (!_0x3f87f0) return;
    this["_liveSegmentLabel"] === void 0 && (this["_liveSegmentLabel"] = _0x3f87f0["entities"]["add"]({ "position": new CallbackPositionProperty(() => this["_liveSegmentMidpoint"]() ?? HIDDEN_POS, ![]), "label": { "text": new CallbackProperty(() => {
      const _0x519845 = this["_liveSegmentDistance"]();
      return _0x519845 === void 0 ? "" : metersToReadable(_0x519845);
    }, ![]), "show": new CallbackProperty(() => this["_liveSegmentMidpoint"]() !== void 0, ![]), "showBackground": !![], "backgroundColor": SEGMENT_LABEL_BG, "font": LABEL_FONT, "style": LabelStyle["FILL"], "pixelOffset": new Cartesian2(0, -12), "heightReference": HeightReference["CLAMP_TO_GROUND"], "verticalOrigin": VerticalOrigin["BOTTOM"] } })), this["_liveAreaLabel"] === void 0 && (this["_liveAreaLabel"] = _0x3f87f0["entities"]["add"]({ "position": new CallbackPositionProperty(() => {
      const _0x52c80b = this["_livePolygonCoords"]();
      return _0x52c80b["length"] >= 3 ? centroidOf(_0x52c80b) : HIDDEN_POS;
    }, ![]), "label": { "text": new CallbackProperty(() => {
      const _0x388f63 = this["_livePolygonCoords"]();
      if (_0x388f63["length"] < 3) return "";
      const _0x432a0e = polygonAreaMeters(_0x388f63), _0x9001df = perimeterMeters(_0x388f63);
      return "Alan: " + sqmToReadable(_0x432a0e) + "\nÇevre: " + metersToReadable(_0x9001df);
    }, ![]), "show": new CallbackProperty(() => this["_activeMode"] === "area" && this["_livePolygonCoords"]()["length"] >= 3, ![]), "showBackground": !![], "backgroundColor": AREA_LABEL_BG, "font": LABEL_FONT, "style": LabelStyle["FILL"], "disableDepthTestDistance": Number["POSITIVE_INFINITY"] } }));
  }
  ["_addStaticSegmentLabel"](_0x266383, _0x3c4552) {
    const _0x33874b = toCartesian(_0x266383), _0x445f63 = toCartesian(_0x3c4552), _0x43ddcf = Cartesian3["midpoint"](_0x33874b, _0x445f63, new Cartesian3()), _0x65a32c = Cartesian3["distance"](_0x33874b, _0x445f63);
    return this["map"]["viewer"]["entities"]["add"]({ "position": _0x43ddcf, "label": { "text": metersToReadable(_0x65a32c), "showBackground": !![], "backgroundColor": SEGMENT_LABEL_BG, "font": LABEL_FONT, "style": LabelStyle["FILL"], "pixelOffset": new Cartesian2(0, -12), "heightReference": HeightReference["CLAMP_TO_GROUND"], "verticalOrigin": VerticalOrigin["BOTTOM"] } });
  }
  ["_addTotalDistanceLabel"](_0x3975e9) {
    const _0x50908b = _0x3975e9["coordinates"][_0x3975e9["coordinates"]["length"] - 1], _0x1e96b8 = _0x50908b ? toCartesian(_0x50908b) : HIDDEN_POS;
    return this["map"]["viewer"]["entities"]["add"]({ "position": _0x1e96b8, "label": { "text": "Toplam: " + metersToReadable(_0x3975e9["length"] ?? 0), "showBackground": !![], "backgroundColor": TOTAL_LABEL_BG, "fillColor": Color["WHITE"], "font": LABEL_FONT, "style": LabelStyle["FILL"], "pixelOffset": new Cartesian2(0, 14), "heightReference": HeightReference["CLAMP_TO_GROUND"], "verticalOrigin": VerticalOrigin["TOP"] } });
  }
  ["_addAreaSummaryLabel"](_0x18c2fa) {
    const _0x3b25c4 = centroidOf(_0x18c2fa["coordinates"]);
    return this["map"]["viewer"]["entities"]["add"]({ "position": _0x3b25c4, "label": { "text": "Alan: " + sqmToReadable(_0x18c2fa["area"] ?? 0) + "\nÇevre: " + metersToReadable(_0x18c2fa["perimeter"] ?? 0), "showBackground": !![], "backgroundColor": AREA_LABEL_BG, "font": LABEL_FONT, "style": LabelStyle["FILL"], "disableDepthTestDistance": Number["POSITIVE_INFINITY"] } });
  }
  ["render"]() {
    const _0x525c53 = this["_activeMode"] !== null ? iconFor(this["_activeMode"]) : MAIN_ICON, _0x3fc86c = this["_activeMode"] !== null ? modeLabel(this["_activeMode"]) : "Ölçüm";
    return b`
      <div class="measure-tool">
        ${this["_flyoutOpen"] ? b`
              <div class="flyout">
                ${["distance", "area"]["map"]((_0x68b7d4) => b`
                    <button
                      class="tool-button ${_0x68b7d4 === this["_activeMode"] ? "active" : ""}"
                      type="button"
                      aria-label=${modeLabel(_0x68b7d4)}
                      data-tooltip=${modeLabel(_0x68b7d4)}
                      @click=${() => this["_selectMode"](_0x68b7d4)}
                    >
                      ${iconFor(_0x68b7d4)}
                    </button>
                  `)}
              </div>
            ` : null}
        <button
          class="tool-button main-button ${this["_activeMode"] !== null ? "active" : ""}"
          type="button"
          aria-label=${_0x3fc86c}
          data-tooltip=${_0x3fc86c}
          @click=${this["_onMainButtonClick"]}
        >
          ${_0x525c53}
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
var __defProp$k = Object["defineProperty"], __getOwnPropDesc$l = Object["getOwnPropertyDescriptor"], __decorateClass$l = (_0x4699c1, _0x40e8ea, _0x32294a, _0x3cd9f3) => {
  var _0x36c9f1 = _0x3cd9f3 > 1 ? void 0 : _0x3cd9f3 ? __getOwnPropDesc$l(_0x40e8ea, _0x32294a) : _0x40e8ea;
  for (var _0x27c010 = _0x4699c1["length"] - 1, _0x5057f6; _0x27c010 >= 0; _0x27c010--) if (_0x5057f6 = _0x4699c1[_0x27c010]) _0x36c9f1 = (_0x3cd9f3 ? _0x5057f6(_0x40e8ea, _0x32294a, _0x36c9f1) : _0x5057f6(_0x36c9f1)) || _0x36c9f1;
  if (_0x3cd9f3 && _0x36c9f1) __defProp$k(_0x40e8ea, _0x32294a, _0x36c9f1);
  return _0x36c9f1;
};
const ICON_DOWNLOAD$1 = o$1(iconNodeToString(_16_default$p));
let TucbsMapExport = class extends i$2 {
  constructor() {
    super(...arguments), this["mapElementId"] = "", this["filename"] = "tucbs-harita", this["customCss"] = "", this["_busy"] = ![], this["_customCssState"] = { "sheet": null };
  }
  ["updated"](_0x3921a0) {
    _0x3921a0["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_customCssState"], "tucbs-map-export");
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
const SIYASI_THUMB = "data:image/jpeg;base64,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", TEMEL_THUMB = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAYABgAAD/4QCsRXhpZgAATU0AKgAAAAgABAEaAAUAAAABAAAAPgEbAAUAAAABAAAARgEoAAMAAAABAAIAAIdpAAQAAAABAAAATgAAAAAAAABgAAAAAQAAAGAAAAABAAWQBAACAAAAFAAAAJCSkgACAAAABDIxOACgAQADAAAAAQABAACgAgAEAAAAAQAAAMigAwAEAAAAAQAAAMgAAAAAMjAyNTowMTowMyAxNjo0NTowNwD/7QBSUGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAABkcAVoAAxslRxwCAAACAAIcAlAABXplaHJhADhCSU0EJQAAAAAAEINKDEjKQUMdpRdg27DqV3L/wAARCADIAMgDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9sAQwACAgICAgIEAgIEBQQEBAUHBQUFBQcJBwcHBwcJCwkJCQkJCQsLCwsLCwsLDQ0NDQ0NDw8PDw8RERERERERERER/9sAQwEDAwMEBAQHBAQHEgwKDBISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhIS/90ABAAN/9oADAMBAAIRAxEAPwD9iPC7Q39rPpqmJmjVv3efmX/gH+/tri/iWuiRXFj/AGs98jNHL5bWgXbt3L8zu9dF4Nns9N1iR/KRWuPlaXHzN/wOvQNUW5isblLALJPCrNHFIdu7+5/8RW+NpSjXkcOCnGVCPIcV4ZtdK/suz1uJHeWO3XyZZz+/aL+Pf/Bvr0pvsF1JG+1JHVW8tmHzL/fry5b/AMbXVw6XWmwwRK21pYrncyf8AqfVtO+IU+oRTeHL+3trFY1Xy5Qvm7tvz/wSVxnZH3Tsb+JJ7xnlCttXcqsP9mjUr/xIs0X9g2VvcwSR/M0k3lsrVV0GDW7XTWh8VSxT3XnbWkiG1du7/wCIro4vt9uvzxJIv/TM/N/4/RAIiavYTappsthazvbSzLtWeP7yN/erhNLsNNvdFgTxVf8A9oRXDeZa/bkWFl+XZ9z/AL6q5qN143+3yixmsoYGZfKiuIW8xv8AZ3J8jV0N/oOlatb/AGLVLeK4Xd5jb/m3N/e/9CqijgPFuo3mjWa+HtJtbZrPau1vOWNl+bf9yuWrsPGvhzRPsivdWayurLHHLIN22JF+7XCXTIkLJX0mTwl7I+azicfamVK++Rn/ALzVe0u8ezmbYdqyKysv95XrNor3pQjKPJM8WE5RnzQGRRJbr5KM7Kv8Uh3NT6KKqEOWPJEJz5pc8i3o39j2F41zeWsLqzbmZh91v71evRXltexs8EqSr91mU7q8Wr1HwMumrpv2C1SKBd3zKo2/NXzedYGMf38T3MqxEpfupHpVhPbPHsiXb8vptqhrn2y6tfJ0i/SxnWTczMqyfL/d2f8AfNLa/wChyMko3I33Wqjf+BvCur339pX9qssu372W+avnYH0MC1omm+JLOZ31nUkvEZdqxrAse1t33q2b2zhv7V7OX7si7d1WqKte6ymfPt1Z/Y7p7OVF3Rtt6VlXmm2d/D5N0m5d275TtruPF8SRaw7r96RVZq5avsKMvaUoSkfG1o+wqzjE9F8FaD4ZitmudOtirqy+YsrtJtb/AGd/3a7WfTba4jlRxt85drMv92vIPC/jfw3ocl1Z6peJFtZd27+Fq9tT5l3r91q+ZxcPZ15RifT4SftKEJSGeVCv8K/lRti9F/Kn0VyHWf/Q/T7S2SLUFvLWZ98PzLur1HwVL9lt10qW5e5Zl/1k33vn+fb/AMArz2BfvO67WZvu1o2V19juI7lF3MrfxV9LjcL7Slf7R8tgsbKnP+6elalp0MTMlrH/AMfUnmXTR/Lv2Ls+f/vlUq1O8K2qXOf3TMu1v9qsrVvFum6N5VzdRXVzFdL8v2aHzNq/7f8Ad/8Asak0u8TXo1+ywvHbSL5zLIm1lb5k+7/t/fr5Wx9JvqXb+6uftD6bPb7Y5ofM+0r91Zd33XT/AL5qHwvdeLZ2X+3msWg8v/lhu83d/wADq1dXTrYt5Sq0sfytWba6pbRSNZ2s6Syw/wCsWM/Muz7+9Kgo7xG/u1yOm+Gf7I1J9S+2XtyrM22CR90Sb/8AYrhE+NPhhLeJIluJJJtu1VT/AND+eu48M+IbbxRp7arpbP5as0a+aNrbkqx85yPiPxfpuuQtb6W6SxQtuZ1/vf3a82lleVt7V0/ih9moTou35pP4a5SvuMspRjQgfHY2r7SvIKZLvSNvKXc235Vp9FegcRltdX/8NvV23aZlbzU2VPRWfIPnCtLw8tnFrkFzdIzNu27lLLtrNpUbY2+oxGHjWpSpSNaNWVKfPE+hLW/h8v8AezI6q23zd+7/AL7/APi6XV7V9X0dodLvXtZI2VvNg+Zv92vLvh8jvqU80trbozfeljdvNf5v469fT91/pKfO+395/tLXwlalKlPkkfZ0asakOeJHpEFzYaakN1cPcsv/AC1l+829v8pUeiaveaor/bbKax8v7qz7fn/3KZK0K7bP7QqxybNqsPm21Bd3F5YWcupIkt15P/LKIfvHXd/BWJrznHeMk2a1vX+KNWrjpWRI23GtvW7+51W8+3T2VxY7l2qtyPv7P4krk79t0mz+7X2OX+9QgfI5h7teR1Pg6KF9SimlRGbyZV3MN38P/wCzXcXXjS5066awuNJ1Cd1/jgj3Rv8AL82yvK7B9sKun3lr3PRtettYVki3K6/6xW/9CrzM3w8uf2sT1coxEeX2UjaiffGr4Zdy7trfw0vmH1FOX5130V4Z7Z//0f1U/wB6s2e6mWRkT5dtdx/YkV+supaXL/oqySr84ZWV0Zkddv8AvrXAXn+u3/3lr7HBYilX+E+KxGHq0J8kjcs9e8TWto82k3NpBBHtaZbsN/e2bv8Ax5atazoKSwxP461UWs6+asbQHbG/zfx7/wCOsrRpYYpG+1J5kf8Ay0j/ALy16bFo0zs76lMb6KaZPs7Sxquxfv8A/A6+fzXDxpV+aP2j6HKsR7Wlyy+yZemwW2l6f/ZtnLNdLHJ5fnyHdt3/AD/O/wDwKr1loiQa9dX6W8K+dt2tF/rX/wCeu9/9+n6X4h8K6pv0G1ufMdVZtsaMvyp8j7G/360vtEyW67Xb5W/8frxj0J+6av2OFWWG3YOrLtZVC1HrlreNprJp139ln3Kyy43Kv+zsqeyvXulbftVl+bdWNrOrWQi23l/FaJIzeXvZV3Mn+1/cSqgU/g908dv4rm3VYb+XzZVZvMkUbdzVlV0mvfvWaZSrK21lZfutvrm6++wMuahCR8RiI8tWYUUV2ul+F3lj33TbX/hX71XiMXSw0eaqKjh51ZcsDiqK7zUdBSLT5Zt+9o9u3jbt+auEdHVtj0YXF0sTHmgFXDzpe7MSiiiugxO18AyomveS/wDy0jZVq9f/ABJ0u11SewNncv8AZ5GVmUKu7YzJ/wCy1xelxXlxqUENhctayM23zVTzNv8AwGvcGuLxdqXG12+Tdtr4/PfdxJ9PlEo+wING17StX0mC8ihlRLjc22dfmX+Cums2dV2M2/azKrfxNXI2qarP5r6kyTy+Z+7WMbdsX8G/+9WXL43s9I1r+zUgu51Zl3LHCzbN/wDFv/uV5ED1YSNjxlZpLY+cg+aFlbd/sv8AJ/8AE14ncf66T/er3bxbol5rMKw2d9LZ/K27ytvz/wC/vrwG6ie3WSGV23L8rSN96vp8jq+7KH8p89m9Llq8xbsG2TbP71eseA1RJLq8b5VWNV3NXjOl70ul3zeZ/DXpOnX81loVyIvlb7Qu1v8Aa/ytdWYRlUpcsftHNl8406nNL7J63FdJO2za6/xK0g27qtZf/Z/OuP8AC8815orTSuXljmZlZvmra+26n6j/AL4r5KtQ9nNxPqadb2keY//S/Y690LWtFH9h+HLaL+zrppZZpZZG81JXbe//AH2//s1ebajE6N8w2svytXs3hLSdNsLVprCWadpPmbzZmm2/7m+sPxR4Qhla61u1aWSWRlaSLPyqqLs3IlenlWN9lPll8Mjy81wntI+1h8UTy+w/1x/3a9Mv9EvNEsZb/wAKK8t5J92O7m3Qfe3v/u/xV5nbp5F58zfL/eb+7XqCaDZwb/EOg3VxdLJuuVhafdbN/f2JXXnvvSgcmS/DVOR0Cz8eafqcdzeabpVtHMy/apIlXc0Tt8/zI/zV6B5tzPa/ZrKNk/6aSj/ge5E/ieqlxqlhdataaPqySxSzRr9nVdzK3zfPvdPu/d/jrR1610K6tXttW/1fmbo40fy/mT/aT/gVfOW1sj3PsHMz2cP2iO81Z7qKS1+aNoj8suxt/wBxKw9Ivf7b1KBL9NEuf3Pyqsm6V/8AZ2P/AB1v2WvWFhbpYeXL5S2+1lkO7/gPz/e/366Czs9B0uFbyKztUZY2kjkVFX5fmraph6tP+JEzoYilL4ZHMeKNOttq3lrtWBlVWX7uz/Zrz1rJ03c/KtaWqeJdS1K4lfZ5Cybf9WV2/wC9setyy8TeFbWzWHxCYop5F8vcw+WvWw2YYnBfusTE8qtl9DF81XDSIPCWkJPcf2rekLBb/N8396vRbC6hlm86J9/97yz92uSW60GWOTQd6/vo1ZraT7zq/wD6FXTad4ZsNLtWk0aDylkbcyRj7zV5uNxv1mpzHZhML7Glylv7RZvGySqvlyN91hu+WvL/ABHcabqOvS21hKiyxrtkg/iVk+/XsVrE8Xz7VVl+7u+9trN1GLc3zQqqtuVmYUYTFyw8+aJWIwsa1LlkeCUV3974XhlmX7O/lr/EuKW48JWzxp9nJX+9uH3q+lWeYY+f/syucxoehzaleLeLcy2nk/LujfareZXuFgsybftDqySbl2r935P/ALCsNfCWlXmkrYX8CSRfeXd/D/tV089ml1ZrbIdvlt/D/sf+g185isR9ZryqH0GCw/saXKQLe20V0+51af5Vjjz/ABf3afcL58fnONrKzRyLn/P+zXJXmreEk1RtEtbuFdQaTb5a/wCvVvv7a2Nb1azsNJi8Q3TpE3mRKz427/8AZrmh73unSY2paR/bbLeQardxLtWOSO2kXb8n8X+/92uE8S6XZxXDJazfaUaNW379zP8A79eo+Ep/CstqyeEnia2j/wBYsY+60nz/AMdcj4l8NaVoky3OkWyQJcf6zyx95v71ehlVXlrnFmtLmoc38p5tZxQxXC+UAvzV2EVztspbTH+sZW3f7m6sBrdIpk2/xNW5a2s100iQBmZY921f4q+orcnJqfL0ufmO48DX6L5umv8AKzN5i/7Vek5k9K8W8OWF4+tJ5XytDIrSL/s17Zl6+cx1Gm6zaPo8DWqKikz/0/2B0nwR4bv9Ns/NhaJvLb/USNH/AMC+T/drU1zWNS07xVBYwXkcFr5KtIssfmbtjN8u7+Helcl4Q1m5S6j0370a7pFrO8WzvP4iuX/iVlX/AL4WvXp5bzYudKp/iPDlmUo4SNWJBqMudTW5S2mtVaTdGlym1tr/APslevXmr6FZyLoME9vFc7VjWDdtZfM/uJ/uV5X4o1FNRa1dW/1duqt/vV2tk9g+mwXOrbEeH/lrIFXd/c+d/wDep5lSn9WpSkGX1Y+3qxiaL+JrNdQl0G1MoubdZWZmRlX5F3/e/wC+awNSnsLrQYHidGn3bWZvvbq6ZtZ0TUbFrD7ZatPMr+WqyLu/4BXkl1OlrvtmT9793d/drnyrDqrLmj8UTfMq86UeX7MiBNRdmb7Vubau1dtdjZWmtanb72mLKsP3Sfur/Cv/AI7XJWCRNA8zMfN3bV/3a7zw14X0fQY4tSg3+fcR7d0kzMu1/v8Ayf8AAa9PNavs4x5Tzcspe05uY5y/0u203bqureTEse3/AF8ix/N/drvrLS0uLOJ5UidWXdG0W1lZf71SatpOleI1lsNUghuYJGXcsiKysyfO/wDn/ZrD1nxf4V+HNrbabrLrp9tJG0FqsUbNEqp/DtT7tfOYjESrfGe9SwsaPuwOjTSbaVWmgiVZ9vl7lHzbf96jTNBmXUV1p7u627f+PZX/AHH3f41/irR0i6/tLS49V06cvFcW/mW7Om37/wBxnX79YHg+fxPKs6azPZXKW8jQr9mDKyyo3z79/wDvVl8MjeMfdOqv7OzvLWezvU8yKRdsi7vvVx0CaD4Ovl0S33xtqDbo4mLSKzf7/wDDsrcTxHYLrC+G2WZbll3K3l/u2+Xfu31o3+rabpdu15qkixQRttaST7q0Fcoy1tbaVmR0/i3LzXKxL4/+1KjW2n+R5nzN5jbtu7/0PZXa/PLGjwIrfxKzbayYPFWiXWoNo8Vyi3cbMvlN975Pv/8AoNBMYHQeUj/8BrKutJhuryLUvMnje33fJG+1X3/31/iqil/4nbVvsy2EX2PzP+Pnzvm8r/c/v1qvqVnFcJYXUyLLIrMqZ+Z1T7+yqKMnUoNERJ7mD7Il3Cu7zGWPzFb/AG/465bwzFf2tvLfz382prJb/LYzmL738Gz/ANArR1Lwr4butd87VrS3mW4h/wBe7N5rS/c2/J/BsqBfA2laatz/AMI/ElneNuWGdQ37rev+/wD7NXz+6Tye9zGosd/rPh2SFYZtCmMm1du1pUVG37vk/hqt45uJtO0e2f7K2o7ZNrfOsbfd+9XOW/gX4hRLJ5viiVt3+rXYzbW/77+arXjKwdNHsdN1ST7S0O1mk+7ulTb83/fa1rhIylVjGJli5RjQlKRxcsW5l+b7rbq7jwNEj6pK/wDEsPy/99V5z9td7j5fuVbiuNesLp7nSL5bbcu3a0KyV9TjaVT2HLE+WwU4xr80j6ISCGKRpokVWZtzNj71WvtPsv5Vl6Mt+mlwJq8iy3Pl/vpIxtVm/wByr+xPb/vivj3c+v0P/9T9RdDuvsusQTL/AM9FWur8dWEKyRarEu1pmaNv9rZ/FXB27eVNG6Fdystb/jD7HPqSpZ3Fw3l7WZVk/cbtv9yvrMRGX16lKkfI4fl+p1YSOcrtfCWjabqOm3mm3RZ1m2ySRuWbds/uP/D/AA1xVM336XEf2A3qttZd1kfm/wC+K1zXDxqYaRGW1ZU68T2LSPht4JtZlmsLPZIrLIvzy/KyNvRvv1wHiOKH+2JZrc7opG3K3/odesWc81vZq86O0vk/Krfeb5f4/wDbry7xCs32drm1R1aTzVkjb+Bv4K8HJZ8lc9jNffoROcsLx7iRrC3Tays3zV7DpUFzdyyWGpxqkcdqsTRKfvb1/wDiN1eKQNfxSM+1d395a9C8DRI2uS6lslZ7pdsztI23+/u2V6GbQlKjznDlkoxr8p2vh7w/o/h6zZNJgZVuNvmMzs3+59+uj+yojI7ovyt/F826n2UCJaq7/eVdy/7tQW95DdM7xFZIt3ytGd1fLQ+HmPp+T3jR27m2b9yrUMXkxXUkK7VZpPM/77X/AOxq0kWz/erG1GKGW+gh+ZZW3NHJ/d2VUYhzGynkszfd+981UYrWF7f7NOiOrNubcN1T+ajQrMu1Wk+ZeKkT9197czfeb/Zo90Cb7irt2rtqq9vD/wAfO1Vb+8oovPns5HT5mZdsf+01cO8FtcXEvirTYWur6NV/cR3H7pmf5P8Ac+589acvNEnn949DT5fvVm/Y7O6uo9SnhVpYVZY2x8yK/wB+oNNnv9W01Jr+B7GWT5mjzuZP7lVbjVktbiPStOETT7vmiY7di/3qqMOYmc+UwtU8W6VYX15YX8VxJLbw+YqxIzM6f7D/APAqtaZq9trb5i88SW9wsbPOm3dvX/0Cuvg2J5qP93+L/vmuMV/FV1q0dheafEtism37Usys21N38H996z+waHQXt5Z2US6xfukSrIqxtIdu1f8A7OvJdctbaCHzrXU5tRik3Mu91ZU/2U2V63r0Wmy6ayaokTWytuk80blVE+f7leCajq+g3s0sPhzyhbK3yxxDaq/8A/369PKoc2Jiebms+XDSMqta9a/VV+wRJK275lkfb8tZS/ero6+pxEeaPIfL0Z8suc9Bi0zxtcQW1zpeqQxQeTF+4kh3f76+bWj/AGb42/5+7Srng2WaXRVSX7scjKv+7XWbbevhcVDkqyifbYWXPSjI/9X9LbW40G41SOw1cxOqsrNFIN38NXr+KwivJYdLRUgVtsarXVeNftOm69F/ZbxRLHb7dvkK33//ANla4v7i19ZgOavL61OPKfJ42EaEfYRkJViylRGkm85EaNV3Kzqv8VZsG/dveZXX+FVq1baXYXV0zyxxMzKzbnH3mRa7q/NKk+U4aPLz+8ex/wDCVWcW68limaLdt8xfu/7C1o6k0O2W/iRZ4ryHazRldq/L96rWjXXh7V9DW2sJormBY1WRV+b+H+P/AG68y1T+1dL1SPRLe8S1iWNtsHl7vNZP3r/P/C+yvkKUYufLT/pH1M7xh+9/pnH7Ll12WpVZPu7pBuWutg/4Ta1WBNBSxlkW4aO6aQtDEsW75Nn95/masbU2Se4+3J96RmaRcfdbdWz4UTUvtizRfMkjeW1e5mOH9th+bmPHy7Eezr8vKe028X7n/Sv4f4WH/odQaXpulaTb/ZtIhSCD5pNqj+J/4q5lvFGqxaX/AGxqmmy23lybWjb94zL/ALCJVq88X2FrpttrF1FcLFcfLGqx7m+6331SvlIfyH1J00H7r52O5WVWXb91aklih85blxukXd5dY0WpXS2bJYIJ51s4poY2/d7/APZ/2av6S9/daes2qQfZp2ZlaPfu2/N/fpy5oyJj70Tn9N8JaPZa82sIj/afMaTd5jMvz7t+xa7FUT/lkNq/3lrlbKDWIPEF1f3l4j2PlrHHBs+ZG/3/APvr/vqujWe2eP5j8zNt25/iqYFSOX1zWta068itLDTLi6QsrefHtZV+Zk2tV/SNE03RpJX0u2WBrpt0m0bfmStyWWFFaa4b5V3VwfiG68fo1q/gm2srqNo2aZryZodrfwfc+98tbfYJ+2egO8Ksybvu/wANcHf+GtYfWFv9LuVj8xv3zSIrLt/u7a6bQDqUmlQT69DbxXxX99HA/mRq3+wz/era3IrNSpVZR+EmVKMviKk88MDTvcHYixqzSZ+796uf0Z/GE8Mqaz9iT9z+5ltizfN/effWlq/nS2d5DEnzSW/7vcPvVk2ujaVqn2DXYpHMtnCqrsdlVtn8Lp/FV8v7vmFz/vOU3LWyv30f7HrMyXM7KyySRptVv7nyf981896pFrEV5Kmsywyy7vvRJ5a19LyywwR+dK6xqv8AEx214J4tRH1CWaJlZWbcrL81elkv+8nm50v3ByS/I1dHXN1rWEu9WR/4a+orRPmoHtng3/kAx/8AXR//AEKuurkfCTJF4djf+6zf+hVvf2klfCY3+PI+2wP8CJ//1v1N8UaXqWm606X95LeK0a+W0gX5VrC2712Vs+KLPSv7dkv9LLFZPm3b22sz/f8AkrGr7TLYyjhoRmfGZhKEq8pRIYrWGL/VIFqaiiu44jv/AIfeI9HWBdKWF45ZLh2aTyWXds/2qx9e1SaeRUuAPPj3RyP/ABNsarXhfxPNYXEGlTxO1srSyNJldv3d/wB3/gP/AI9WV4g8l9aufI+ZZJFZf+BrvrwMHh+XGVeY9vFYjmw0eUyltdY+aG6uEeJdzMvl/NuroNG1J7e8W/l3M0bfNtqCKd7O1lhU/Ky+Wzf3qw4rjVbe487Szbr/ANdQ396uxw5aU/tHDCfNVi/hPd/+Eo0pfESeHnmK3LLu2sjL8u3f9+ujl3+S+zduavJND1mbcqa9cRPO2795GPl2/wB1K7Txa/iFfDstx4ant7a5jbzWa7jaRTF829dn9+vk62HnGfKfVUsRCpDmOjt33eU7j943y7v+A1erznwP4iv9T06NNbeGS+Vf9IaBNq/7yL/3zXoafN/wGonSnTlyzNaU4VI80DKlRFvGdEX5lVmVR975q5XVvCng+41aW51S282WZd3yu252+58ipVLxNYz+KNV/s611i80d7M7lkszFul+X5t+9P4Pl+Wqby20+h6g91Hc6hB5i7lV/9Jdfl+b5Kn2VSMfhK9rT5viNmXTPDHhrS2m3rZ2PmRTNuLMrtt+78/8AfSuqg1ewutLa/wBIb7XGqtt8r+Nk/hrldI8I+G7MNLp1mrQSbZvLnLTbnT+JN/8Avf8AA67C38ryfsemReSv97y/LVP+A/36OaRcYxM7R9cfUbF7/UbOXTljbbtuSnzfL/sf981Jqlums6e9hdQy/ZpFXzGifbKv+5srS+waba/6YkCbo/utj5qntX8pms2G1lXdu/vb/v8A/j9EBGDpGl2Ok2C6VY+bsbzVVZ33SfP8+7dTfB8FzF4fjS6+Xdu2/wC7XQSxIsizY+ZpF3f+gVzFvoPiSLVPtjazK9t5zSfZmhX7u7/V7609r+75TP2Xvc5uX+nabrljJpuqRJPE3+siavK73wJpreIkt7OwuIoFb/Xwz7YIvvfei/z96u01fxvomja02lakzxyqqyKypu3K7Kn/AKHItX7C603xRZwaxpcj+RdR7t2Nu5azhOcXzxHUhzwPALi3e1uHtm+9GzLUlk+24Wu48X+Hporxry3/AHm7/Wbf/Qqx9B8L6lqk29U2x/32+6tfaUsbSlh/aOR8dPC1Y1fZ8p3WiXF+vhiV7NIv3LM26R9qt/Ht/wBn/frE/wCEp8Qf8+1j/wCB9djo2nf2dYz6dLtuVmkbbtX5WXbs+em/8I1Y/wDQPtvyr4/FShOrKSPrsFzwoRiz/9f9Qr9/mVKzanli+zwwQ4WPbHt2qd22oK+/pfAfBT+IKKKK0IJEd4m3r96p7z/XLzu2xqu7/gNVKnige4X5PmZazn8XOP8AuDEfbuRvutRuddu//K1GnzUeU9xG6IxXbG3zL/DSntoOBbvNLfS7qC5+0vL50KzeU33U3/cr0rW/GWm3Wj/ZoC7STRt8uPuf79eSRJc/8vU73LfKqs4X5VSpq4vqMKkYzq/FE7frUqfNCl9ovabdfYL6K8/hjb5v92veJfEGlabbtMxVWZfMVV/jr55o37vvUYzL4YiUZykPC42eHjKETZfUfNuJZrg7mkk3V3/hzxC9npMlymmXuy3XczRorefv+Tcn977teVyxeUF835WZd1e0aDoF2V06+e6lRLdf9Sp+V1dfuv8A+PV5+cqMKUOQ7smcp1ZHXWGoJqkMF5Erqs0fmbZBtYf7LJ/frSrKvNJhuoWhR3i3M25k+9tf79GiaT/YenrYJcXFyqszeZcvul/76r56XKfQR5vtFTXP7YRUm0a3huZY/m8ud9q/72/+/ReJ4qa6tXsGtFi2r9qjk3blb+Pym/76rZ/5eV/65/8As1T1BRRnb/R5HVmjbdtX/eq99+mIn3kb+KqFsk1vcNbJtaBV+Xj5l/uL9/5v4qAMbWPA/hnXbz7dq1t50u1V3b2/g+5/6Crf76rWHFrOm6Dv8M+Erb7Vc2cn/Hkp27Vdt7srP/tN/wCPV6PXHQaj4wfVltp9KhW0aba1ys67li/vbKAOgiT7faxXN1CsUjKrSR53bf8AZ31RuJbm1jazx8v8Mi/3aqeIPEf/AAjkkW+zurpZlb/j2TzNrJXRxOl1bxzMjKrKrbZB8y1NwnAzr2wv7rSfsem3TWsvy7ZVG7av+5XLf8Ir40/6GSX/AMBhXoNFUB//0P002P5e/wDh+7UdSNL+5WGo6/QYH5+FFFFUAV1XhjW7HSWnTUYTKlwqr8u35a5WlV9jfJWdalGrDkkXSqypy5onr0vhTQdR0ddS0gtt8l9q/wB9v9vfXlH+kwbobiLyJfuyR5Vv/H0pPPuXhWF3ZkX7qsflWoK5MLhatN+/PmidVfEU6kfdjyhRRRXecQqpvbYldRpWkvYXjT+JEjjtFVlh3Dbvn279r/3v+AVy6s6tvX7y1t3mo2ErXVzZxyrLfMrTNJN5ir/uJ/DXl5hDEy5YUD0cB7CPPKuZU8s08zzT/fZvmr2bSNc/svRdKhure6n+0Lt8yKPzFX5v4/7teJV7Fo174p+w2MOkQWrQLCu5p3ZWb5mT5NlceeQtSgdWS/xZk+o/EvQtOke2lim8xbhrZfkXazIzJ/f+7vX/AH/9io4Nc1Lxin2jwhd/Yxbt5c32mFW371+XYu/5Pu1q3Hw+8LXV5LfTwu8s0nmMzSt97ez7vv8A+1/3x8lbunaNYaR5v2AMqzMrMrOzL/wD+7XzJ9KWrdZlZUnO+RY1Vmxt3NVuoE+aZ/8AZVVqemBz9r4X0qz1qXXrcS/aZt27dIzL8/8As1rI2+8dF/hjXdVqqlk/nRtMm794zN83/fH/ALLSAt1B56fwh2/2lFUdZstVvbVY9JvPsMqyK3meWsm5f7u16NDtdVs7HydZulvJ9zfvVj8v5f7uygCO7tTf+U++WLy5lmXyztZtjfdf/Zf+OtaJ3dfmG2q6f67/AGfvf+PVbpRLCiiimQf/0f0wqrdNcqq/ZVVm3fNu/u1aor9DPz8o27X7sv2hFVavUUUoxAKKKKYBRRRQBVup3g27F3fN81FrP58e/G2oLr+0vM/0XHl7f4v71T2v2n7k6qv+7Wf2jT7JaooorQzGM2xf4m/2V+81er+EbSx1TV/7XOm6hYS26r/x8v8Aun+XZ8ifc/hryv8Ast9Wkjs4oFu5d26OJn2qzf7/APDXufhS90GK+uPD2jxPH9k3fNhmj27vk2P/AMCr5bPZy9rGB9LkUI+zlI7moLiXyl+Qbnb5VWp/4fmqrb/v2+2P/F/q/wDd/wDs68I9sfFbpFHsyzbvvN/erNaX+yVtbaV3dZJPI8x/vfdbZV+/imn0+eGD78kLKvO359teD6D4I8Z6drFhNrdyjWdvMsjKszMzf6//ANnkX/vn/dq4S/mJnH+U+gqw7rS4dZ0mOzlkmiVtrLJA/lt8n+3W4rI33TVS1d1aS2cbfLb5f9pXqSjK0Pw4miSSut1d3Pnbf+PmTzNuz+5XQUVjaj4j0HSbhbbVLyGCRl3bZH2/LSAk1bWdN0O3W/1aZYIt3l+ZJ93/AD8taUUsM8KzQNujkXcrf3lqOWC2vIfJlVXjb+8u6pIv9Wu//wAdoAfRRRQB/9L9MKK3NW0G80aRkuhtb7y/7tYdffwnCrDngfAThOMuSYUUV0miaXqt0v2zTrNb5o23NHJIsa/991OIxEaFL2sjXD0ZV58kTn0i81lRHTd/d3/N/wB8USp5TMjV9EWug6IzR6lLp9ulyy7mby13K235/m/4E1eQ+KtLhtdYnSzG1VZdq15mAzP6xOUJnoY3LPq8OeMjkaKKK9k8kKKKKACiiigDW8P395Yaws1rZTXflxs26Lb8te+6TaNbvJKkrtFIsSrC33U8vd8yf7//ALLXhmg6R/aXmzJc3Fs0cbfNBJ5e5f41r0lvCsMGoRTfbL1Wj8ryYkmZY5dn8L/98/8AfFfG5vPmxMj7DKocuGO1uF+1brP+Hb+8/wDZFqS3ldl/dDcvy/NmpreLyl2btzbtzN/eaobBke1XZ/D8teWegP8A3zff2ov+z8zVU1JLaLT5ZroM0arubn5vkrSqpeWqX9nLZythZlZdy1dL3ZEy+EkiiSKaTaF+b5qzdS+2Mrw2DrFLJDthlYblWXd/HV61ie1hihlfzGWPy2b+81SSwI8cn3vmqSjmdLsvFsF8r6zfw3MG3b5ccPl7m3Vt3ujaVfzLc39tDO8a7VaRFbbU8TPPH+9GyRW+Zc7qt0gI3+SPYn+6tSL8i7Kxtc0lNZsfsDTTQL5it5kD7W/77q3p1n/Z1iln5ks/lrt8yU7pW/33oAvUUUUAf//T/ZPx/Fuktn/haNlrxyvafHf+rs/o1eLV9hlH+6xPkc1/3mQV6/8ADnRrmyhe/e/llim3bbZtu1Pm+9XkFe4+Bv8AkED/AK5N/wChVz55/Aib5J/Hkd3WHq2g2erxt5oCy7dqy4+Za3KU/eb618vGpKFS8T6WdOM6dpHg/ijw4+kzQIj7/MVvmxtrjnR0bY1exfEL/W2f+61eSXP+vr7TLqkqlGLkfG4ynGFaaiVKntbfz5NlQVpaX/x813S+E4yR7CHb8vy1muro2x/4a35Pu1j3X+ves6TZczV0zwqmt2/nXkSSRMsqqzmX723f8+yvoGz3raqjfwrt+X/pnXn/AIP/AORc/wC2sv8A6Jr0W0/1J+stfFY9t4qrc+yy5Ww0SKW62yeTEPMk/ur/AA/7/wDdpkVveQbnWRX3fMyyDb83+w1Q2f8AyG7+tW4/49o/96uM6yKKVJY1dP8A9mpKo6f/AMe7VeoAjf5FZ/7vzUqKirsT7tE3+ol/3KRfuUAMT5Lhk/vLu/74qeoD/wAfg/65SVPQAUUUUAFFFFAH/9k=", ORTOFOTO_THUMB = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAYABgAAD/4QCsRXhpZgAATU0AKgAAAAgABAEaAAUAAAABAAAAPgEbAAUAAAABAAAARgEoAAMAAAABAAIAAIdpAAQAAAABAAAATgAAAAAAAABgAAAAAQAAAGAAAAABAAWQBAACAAAAFAAAAJCSkgACAAAABDg5NgCgAQADAAAAAQABAACgAgAEAAAAAQAAAMigAwAEAAAAAQAAAMgAAAAAMjAyNTowMTowMyAxNjo0NzowNQD/7QBSUGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAABkcAVoAAxslRxwCAAACAAIcAlAABXplaHJhADhCSU0EJQAAAAAAEINKDEjKQUMdpRdg27DqV3L/wAARCADIAMgDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9sAQwACAgICAgIEAgIEBQQEBAUHBQUFBQcJBwcHBwcJCwkJCQkJCQsLCwsLCwsLDQ0NDQ0NDw8PDw8RERERERERERER/9sAQwEDAwMEBAQHBAQHEgwKDBISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhIS/90ABAAN/9oADAMBAAIRAxEAPwDmF0N9U0ttbiRWXy1WTlVbcnybkriNL0uZ5P7NY/OzN+8b+7u3p/n+/Xr3w31ZLqGfwrcbf3n7yPd/4/Wb4g8PfavtNykiRRK3zMo2su/+5/sb1/8AHa4Mwo+zryMKUOalzROB0G/eW4ksJYfKlhk+bn5tv8depxXltOqvKysyx/LtNedT2CJqj3j7vNXytqsNqq38av8A3k+7XVSy+QsqJ95f/Hd/365P7wfCYVra/bPFH2mVvljbb1r06KwtnmeGL7qr5nT7q/x15zZMkF9K7fK0ki/8B+X7tejWt/sZrm4HlLJC22Rv73+3/dq6XulRiVGukih8nK/M21aqWqPFNsQrtb+LPy7azrp/tW1Ffcq/N/tLWVcS3NqrTWpVmVf4vm21Up/zFy92PunQeK9cRtBksIv+XiTd1+Zfm/8Asa8k/hauw8S2Ez6faaxldrLtZc/Nu/3K89v737PDs3fO33a+myWH7j/t44cVPmkYGqSvcM3lNWN4Z1m/8Oal9jvLlfsk0bbfM+Xb/s76tM7tJ+9G3/arHv7CG/j/AHqqzR/d3V9B7KMo8kjCAXTpqmoS36bvmb5d392p0+RWpkHyr/dZa0WVHj85P4qv4fcKJPDOs2Gjasv9qK32G4+W42/eR/8Anr/49XpkUCRbraVfmb3/ANmvELhtu7bXq/g3UX1vR1TeqyxqtlJI38Oxt6N/3wuyvmeIcF7v1qH/AG8b0T1uyltn8pFfe+1Pl+6zf7VPsLh7DUmdPlRm2t/tVnWd1DpM2zV0ZV+bbIv97+7/ALVXrdYftipF/Eu7dnczV8xCr/MdUI/ZOuaL7Vavx8jNt2s1WkuJovAt9ol5EkrsssayMPmVXVk/773tWVq9/Na6TI9k+25b5V3VgQXGpRWbJft8033l+9826umX85X2Jcp8afFDS7nw4snhi/iTzbeT/WY+8teFoqf3a+s/jrBbS2sF5LFtuZm8vdn+GDd83/A9y/8AfNfKGx0Zq9D2vtPeMMLS5aZ+jfwsf4e/FPwfpj2VhFLqXh21gguorkNGqyouxJU2fe37Wr3DSU0TxD5/2h/sOoQqzSNGn8SKyO3lf39n/oNfDn7JOuTWHjy60RH2pqFn8y4+80Db/wD0DdX14iPa61Jr10PInh3fZ5MfKy/3Xrzav7uR6cI+0jynF+BdJ01NJVLdFdmby/NYbWZUXZurtv8AhG7T+/8A+PVk69relS6s39lxtEyqrNAo27H27H/4B910rJ/ti4/vy/nWHvCcF1P/0PK9Ov7nS75dSsztlj3KrY/vrsr1vTr1NU0+ff5TSSbY5G/h37fkZ9/3a8W37PnXb/tVv+HNShtdQjS4l2JN+7kZjuWvVzLCQrQ5/tHn4eryy5Drn0l2vmm+8iqu5lH3flrD1mB1uIr+VW8vbu3Kf9pq62e68iO7trr5YpI28zb8v3G3/J/3zXLPLc69GltEn7qH5Wavj4y15Ds5eUzbqKbyYppfKWeT5tsZ/uNXR2erebYrv+996uSfUktbeO2gVmljmbdI33dr1BdRXNrJ+6VtsnzLtH3v9+lz8pPOem/bE+ztMu1pNv3v7tVLWKG/jVN+1dy7do+81earq9zZQ/Lu3/d3NXT+HJdVuGgezCqsLbVZv4m/g31PNzi5uYk8ZazbWtiumzosbW7bmlY/+O18+pdPdSS3/wAzMzbtrV6T43s01Sae2uDt/ebtq/3q4GK3+yq3y/K1foOWUo08NA4p/GPa4SXa6N96oN+xm3VGqojfLUlekIgZfmqe1ldf3MtPRN26oZYnaZkf7y0AQX9vs2v/AAtV3wRqyaXrn9m3iO9pqG1dsf3ll3fI3/sn/AqZE/mx/Y5f+A1m3CPZzJNs3fN92s8RSjXpTpSKhPlPrq1t4dZjbTdSkXz42Vdqn903yrvb/Z+StXWfCV5oegwXNu+6SGNWk3fLsb5v3X+18i14nZX/APbkLPdO/nx/NujO1mX+D5/+A19A+A/Ee/Tf7E8UXL3kF1DukXy/ltm3b9yP/wCOSV+fVsP7CcqUjspVeY4C8lvLyH7Tb/Iqr/tfe/z/AOhVzC6veXuoLDcL8y/L0/irtfEvhfxJpcMtgsW60abylk8tmVW+/tSVPvJVqw8JeDNU8P8A2y/1G9k1xo5WjigEX2bajbEaV/4Xfa1Zc32CZwnE+Yvj6032rTJm3bZLVvlb/YbZXy9drsr6v/aOs/tEela9Bu2NH9m2t/sfP/8AFV8r6kmxo0/2a9OjD3DSlP7B6H8D9Um0b4qaLqUTNtjuG8zb/FF5Tb1r9fdO0iG/s/sd1Gjsy7m8z5dn+1sr8LlleL57d2Vv7ymv1Q+Fv7Qnhvxb4dj0Te39rxwxNJHIm3e3yo7Js+8m9q48RHmOylImbSbCKTybqdFvLWRo5I1+VZV3fIyb/wD0Crf2W39D/wB8x1uataw621s7IivIrSSbv4vm2VR/4Q2y/wCecNcUNipxV9D/0fIWXZXN6tLf2rL9liWSP/ar1jXPC76XI0yOrW7fNHzubbXnOotsX/Zavo8PiKVX4TyOWUfiPQ/B+vQ69psdtqQWOWFfLXd82/8AuV0TLpunTXT2Ejbf9YytXj3heWzt7rybrc0HmfvFX723+9/7PXq8UVsi3N5Kf3SybV3fLur5bNcPGhX5o/aOmlOUonOa2lnLHE9qq7WZlaRfus26p7KCbUdWj0rzVbcyt5W//vutW/is9S0NblEaC1hk+Zf7zPXHXWr/ANlzRala71khkXy/9lkX71eTM6YHoc+hzWt1BDcPtgaNfmZFZvk+427+/WjLqmxlSJRE23y14/irGsNeudes47y/2K0bNuZfurXTxaJNf2dzeRTB1hZtsaj5v7+6uiEoxj7oP3vhPCNWWbyZd/zMsn3q85Zpnb5/4a9Uv3S9a5df4vm215q8TozV99gavtKUJHlx3Kr0JB5q7Nv8VWvKR5Nm75mX5V/vV09rBDZ27P8A6x/7tGKxtLDR5qsjSEJS+A5y60bUtNZ5pdzRfdZsUxot377+KP5ZP/iq7uyntr+3n/i2rtZc1j3WmpFdeSn3Zo3Vf/Q0/wDQanC42liY80CZ80fiOVlXb86USy211GElba38LU9v9Xv/AIqgnV/L+XburrgI9N+H0ULeIEsLrc3nRt5f+9t+Su8uLWayuFSKL9180m5fl21454N1LZq0Hm7tqt+8b/Z/jrtdR8Qal5aw3TbovlZVVvm27v8AY/3q+N4gjGNeJ2Yf4T6B/wCE+36b9mlhWJppN03O1VV1VN2z+/8Aef8A4FXJXEWlPrktzYQtHFI25VU7Vf5vk37P4Nm6s66lttXs08qJlul2r5Wzd8v96o4PscV0l5vZLVptv+1E33Nv+5XixlL7R0Skcd8Z9G02/wDDLfZV8yWGNb1Vz9z5mSX/AMcavjjVNIhuFZ3+Xb8qtX3bf2cOr61/ZsT/ALq4jljbjd/C1fDmuNf2F1c6bfjbLHIyyL/tJXpYKf7vlMpfEecyp5UjQ53V7h+zxa3jeOmv7VGdrW3b7v8ADvZf/sq8LZt8zPXunwo8UXPhLwf4q1iy2LOtvaxws33llnZkRqqr8J1wPurQdZ/tS+ub9XlWJVaOGOQbVb/Z3Vufa5v+faP/AL/V8m/s++NL/WZLrStenluZZJvMWSVvuqkX3a+pM2Hov51w+yKdWR//0rV01zqmgz6Dbt/pLbfl/vKjfdrxPUon+z7HX7rfMrV7Fok/9s6gj25+e4jZWZht2sn9yuV8S6XDa3Doq7mX/WL/AHqrKMfGMvZTObEYfmj7WJ5XoMSfbGhZtvzKu5v7teqa3L9ljltsLInmfL/Ev8X/AMVXntlb+R4gihi/5bbfLVv4vmr0Lxra3jNL9g2q1vH580e7bvXa29f++2X/AL5q+Ive5DPCR5oyLU97baXHH4evN8sbNE3+9E6/P/wNKx7/AMn+yVtooi67WVWlj2t5qN97Z/F8lbi6XNqWpQXkqLK0drFIu35lVdvz760ZbqzsNHl81ESTzGkt42+Vfn271/3K+c5Jz+A6JnH6JbpFp8tm4ZZG3LGq/eZ69b8IXT2umyJEx37V27v4f4K81tde02Czaz8n5vJ2rKw+ZZf71dVZ39hpOj/LMsskMe5V/idUb+5XT9Ur0/iJhOPMee6zp01hrVzDsby93mf7qvXIy6bCvmzP8y7W2qtdHP4/1jUmnfWdG/cTeUrLHIu5Pu/N/tVsada2zLd+Uy3KqreWy/xfLvr6CjiK+BpRjXic06UakuakcXpunQpcJc3XzLH8zKw+VWT7lT6XcJ9utryXzljk3SNtH3VqDWbW5/49rXey/L80fzf5+7U8+g+fYxOty8vy/KsfzNt/yteNjcX9Zq8x14Wlyl7Sb/Sr1rl0CRJJcfKrD975SL91/wC9/v8A8dSTr9qVbl4WRY2+X/eSr3h7Yt8k1qkUEqzfuWkH3V/jV/71aviO1eKbYu7a0jfN95f92pw+LlhJc0QxEOaJ5PeaW6s7xD5d1Ya2t553zDbt+7/tV6jLBsVvN3bWpLC10e/WW2uLuG1kj+aHz92113f30+7/ABV9PSz/AA38x5vIcXolrcoz3j7f9XtXd/er1HTbfyNJV3k3RRyfvFx8zfvfkqjpejPcWaoqIiXEirDJn7io292/3K7G3tXaRbaCVJVtV+8qL97/AOz+/XzGZ4uWIr+1PTwdL3eaRq6bcW0Wub8bmaHzLeL723fU+uWsN5HIkRDeZ+7k2j+Kuf1ywmsGiSV0by2i2sv91P4f+B11Wiay90s+lYh82b5VWf8Ad/vd3yLv/wDHKyw/ve7I1ny/CcBYWWpWbecyM0lvH5+1T821G2PXzR8fbO2svFyaxZ7fK1K3Wf5f4W+4/wD6CtfVniNdt82sWSTKkiq00DfK39zd/v182fGfRLzUvC9p4hii2QWMzQf7yz/PuT/Y3r/49WuFnyz5TE+Xf4q6TSdUhstJ1XTXi3tfW8Sq39xklV//AIquf/ird8OaXNrOpNYQL8zQzt/3xEz/APstdxZ7F+z1r2j2HiaXTdUC+ZdKv2dmO3cyffi/4Gn/AKDX2/8AbdD/AOgbH/38r85/CXhfxIvjTTLCwTZffaIJFVjtZf3q/wB//P3q+5/+ER+Mf97/AMiR1lUj7xUZ6H//06mm3XnwwTLIImVoty/7W352/wCB1h6p4o0qXxRc6JeFVdVWSznYffZG+da898Dalf6tJHYb1X+GFm+9u3Ls/wDZqyvHOyDVlv3d1+y3Xlybv4P4P8/71Vh8oviatCocn1qUTo9c36H4gs3yu2O6VVb/AH2r0rW7+GwuPtjlGX+7/fXd92vJ/FF1YX8LcrKjeVu3V1XiW8+3+FbGzXzZJY1lkVlG7cyNsT/gH/PSnm1Go8NTlL4iaU4xlLlOxlebw+sSWRVm8uWNVz92LbvrktWuob2xidpU+Zv9Yx3Nuf8Ahf8Au/P/AOhVa01pte0uV1T97Gu75f4V/wBiuE1K6e3t2SJE3bWjaRj/AAv/AOz1llGH9p8PxRKxEv8AyYzYtUvHm+zSo087LtVY/lX5Pk+d69Gs4Ne1axZJ7hXlkVpJOdq7YF+Rf/Hq5HSXs7fTWuUZkufMXauP4dv3t9dlf/6A0FhcOrfao18nc/3V273bZ/tv/q69PNavs4x5YmVKHMUZfC/iHaqSwtuZVbcvzf8AAf8AfrqYtLuZdF33UbRXkjM0axP8vlf3n/23T+CqWqS6rf3Fpo6iKJmbz2kX5f8AfrbtYtYnjurNNiSxx7Y2b7r/AC/+O189iMXOt8R2UqUYnlF14cf5bmy3oyybZI4zubbu+dq7zS9NTTrhUuG/dR7lXb95t613GjWuq6Xa3dnrIintZo2n+1xD5W3/ACJFs++vz1zcu+9vmf5tq/eXFZcht/diQrL/AMTZf3G37Kq7WxuVlo1n7SzSXLbWj2r5kf3fm/3KILW/+0fbJXX5lVlVgy/L/d31qbJlm/cBVWNtzfxUThzGfxFWWWz1G3WGW2SNVVfmj/ib+69Mi8K22tzXlmsLRrt3bsbdn+ylUZ59StVa5tdrbW3NursNL1a5uLVXYvH+7Zl3D70qVn7IqEImJdWCadGiOqp+72rGx+Xa9GkSpcXT20u3cs0TSMv97+Df/wDEVdnuobxot6PLu2tJu/2KZPfvqNx9ps9kUSrt8tR8zUjWMi14m068lt7nZKqs0f7lmG7bvX72z/Y21wmg69DqlvbeM4kV4Jl/eJn5l+bY/wD4/Xf36vfteeRI32ny90Lf5/4FXkGvbIlWFU8rybhY/Lxt2f3/AJE+SrlyxMJz933j1Xykvbe6hdd23dHt/vfNVrVLDwra/CfUdN8bqrabYtFcsrHb/F/A6fPvesrUdi2cH2BpVa6VfJ8sL80v+dvyV4f8cNevLr4SxabeO6yw6wsEkbDbt2LK6b/7z1vS+IKUo/CfJvia10S18QXUPhy4a509Zm+yysNrNF/BvSvW/wBmywS/+KUX3d0NnO0e7+9tVP8A2Zq8Fr0L4S+N7z4feOLTxPYQxTyx7o1jl+62+uuceaHKVCXL7x+lMtvoNrqF9balZwxXLTRfv4l/eNFt2J8/8Mqf+P7qk/s7wx/z86r/AN9Vx154ymvLe2m8UWyLLeN80tsG8hfP+eJXZ/4/l2UzfpH/ADzT/vta8R1KsHy81z0KToTjzH//1PnP4W69c2/ia2vLhEiVbpWZVO7ar11XjeyfVNDXUnj2teefGzqFXe0DfI3+/XAeDbKZdYjdQ7J8jMuPu/N89d/401628u28K6RE7f2a06zXLH/Ws7b/AJE/2PuV79WlL+04ypfynmHnvh7Zf6b5Mv8Ay0XbtzXpPga6/tLS1mZ282x3bt39yP7/AP6CteJaXL9g1KSFdyqzeZHJ/wCh16V4BS8n8YXOlWTrH9qj8z5vu/P8laZrh/aUJDh8R7v4Dazst0O7arTeWq4+bbPudPk/76rxnxHptsmtNNajzYNzKrbf4UZq6e3uns9cl88tFLt8uPaNy/Izf98v8tc5rzpFcfb082OOTcsi43bW+/8A98V85ks+SvI3xHw8pUiuHnmbTYv9Yrbd2PveZ9yvTtNsHuL5ptRhh82NYoFjX/YXfXl0Utt5jvauz7trK0f8P99Uf/Yr0nwXdX9xfS7tskrL8sy/xNu+9/vvur1c1pc1DnMsP8Rpavfu8kSPEztIvltIx+5s3bK6NrWawhS52eWyzJ50md29drb/APgfyrVq60FLjVJUXd5jTbfM37fl+X/gFMsN9+uoabf7VgkbbDGx+b+5u/8AZ6+VPVgbl74c8rT7t7UNtuGXc2fu7P8A4vdXmV1ebIZYYt0kjSbW4/2f/iP/AEGu4lur+CFrCVtke5V6/Nt/vVlXGmwtpu+Xezw3CzrJj/Z/+IarjDm+ExqyjT96RpaHYbrVZkVWgW33Rtn/AGtn/wAVWTLst5v7KRWkeRVkbb97d/BXV2S3NrpssLxp5E0azw8fxP8Af+f+GsKWX/Sorbyv9Jbbunb+Bf8APyf8CrEvk94q6Xp32e6lhncTssf7z5vlbf8A8sv/ALOpNevNKeT7BoLuzW7bZJ8/fbb8+xP9+nvp2sRatI6hEXbK0m4/d+Xf9yql7Fvt5bx0SKWNVaZY/wDVKz/P9/8Aiqxi6XdQpIsMq/LI3lyN/EvzfO1bFnYJp0nk/wCsijb93XP+HvJuvNtrzO5mVvm/up8//stSaj4rsLWZ/D2jTWt3rM23y7KSTbsX7/mvs8z5EiWpjS5g5jv/AAulnr15/bEo8qeNvs0kbD+D5k3f98V4Z4w0m20vxVc+HtrbbyT93Kz7tq/c3fJXsvh/Xvseuf2a6bmuNrMq/e+Td/45srh/Hmlwz/YdYXay2sixyLGm3/cVP9j+D/gNE/eiRVgaqWulaX4Tgmurl/tlruWzXH8W771fLXx41KbVPC9nczunmtfM0iqfmZvK2bn/AO+f/Hq938Tf2l/Z/kyozRwx/vNv3VX7lfJXxa1KGWHT9NiRV8lWkZlHzMz/AN+tcP70iZSjGXKeJ1d0tbZdQge63LEs0XmbfvbN3z1Sq1tRG+f7td5R+qfhJPCWo/D/AEy202zuNQ0zUpvPj81l3KqN8kX9/ej/AMH+1XW/8IR4N/6Fy7/74avnv9jy/m17S28Ma8jy6fY33+jrF8rbp13ur/7H8dfob/wg3gn/AJ8X/wC+64KuHjzDTmj/1fHfC+l6la3SalEjRNJG0G5/4fMX52/3E+/XHeINZttWmubzTVdYlZljaT5WZf4GrtfEfjKHS9SlhsLdp0a3a2VZTtaJtzJuRP4v/sq8jvJ5pVbyjuX5e9fQ5fGdSX1qf2jzDEvd7NviLI33vlNd34D+2T30/iG3k+WzWBW2n+J5d/8A7LXDy7Gk6bWrc8F3j2uqT2aXCxRTW8rbfuq2za+3/wBC8uvUxcealMInv17q9nZ3Uut34uJLabcu5R935lf7n9z/AHKtXsthFazzStFI80e2NY3Vtvyt83/j1as/2O6kgtsu6SLF5asP+WW3/wCIrAnl0qyh1Dw9FDEnl/LbthfN3I38f++lfC4eMZ1v3UTefNynnLs7SRvENjK33mH3v7617T4f86K6uk0s+YrbpFjif5l2Mzp8/wD31XkOoq/k/aYEVW3fdx/tfdrf+HNlrEWvJNZuyxyXHlqrH5v3le5j6XtMPzGNKXLM9pt5Zr9Ue9tfsku5mj2jb8r/AML/AO3WlftDLeN5G1o/JWdWk+8v3k/8f21zGrX8Nrqi+fdPPtZv3nzNEqf+zV1UHiCzvLG2ht9jL5MrMyozKsSbU2y/3fn3P/wJa+RieqcXutk8/wCZpE3faVZR97eu/d/33Xf6TZPqXheWGykSR9rRrEw3bvPVdjI/8Pyf+hV5B58Mt1Fbbmk+y28Cs397+B1/77X/AMer37QdZs1t327Y2tdqrAu1WeX5di/7X3v/AB2tISlzGXLHlOA0l7bVNNnhurj9wv3dp+b5F+6/+xUDy/2dqG/f5m2PyG2/N8u7/wDarVTS9K0O4l8qdEWSOWdo1Py/7C7/APfrzV5/t9wqXD7pZJP3a43f3v8A7Gs5mkP5z0rW/EDxWs+wKssMi7WjH31Rdn/Ad+6uf03Tb/VF/tK82+VJ8391m2fJ93+KrC2tzfr9pvQqK0nlyKv3WVP7lYf9ow3tx+6d1WNm2x/7P+xVQJnV5S1eaSllC9ztlilVvmaT73+98lcdp3w5vLj4pQeM9NumiikVvtXmhdqweQyJFs/2/uV3dhZXnmS3N+ztBu/1f3mbf/n79MvL99GuGtt+5ZF3Mq/w/N/HVfCTDmlHmkaOpaS6ast5F8y2MLMsjfLv2L93/wBkrSvbK/vbP7TcKkW3b5e1t0T/AMfyf7HzVBLdPf6DLbWp23MdrLt83/VNL82zf/31TPBfiDRH+HPh5Em+0tDarBMqn5vPT/W7/wDb/wDiqXLzRNpz5ZGFLqltLI1hcWzbvMiW68s/ei/u18I/Eu1ubrWtlmjSLCv3f4v9ivuvVvFFtdXjTabZ+VOsLKzY+X5/k3J/n+GvknxbFMvjidJRtb5a1wv8Q5eb3oyPOfEHw31vRGR4mW7ikVG3R/Ky/wC+lclfxeVM0P8Atba+jNbv5tq20X+st2/76r56v3eK6nfarbmb71d8zo/wn33+xRfva+HdTeL5fJmnkk4+8vlL/wDE19i/8J7a+n/jtfKH7FEFtF4RvLydv+Xpmb/d2r9+vuH+1fDvrFXjYj+Izop/Cf/W+dviNsl1xrmDcnnKsi7q8ye6fdsx8y/xZr0r4r3iT+JmmsyjQSRq0fl/d/2//H68vl3u29/++sV9jl8JfVoc38p5gLLuaoIoIf7QiuboqiLJ8zL/AA/NUcX+sp8qeVC01uvzR/M26uy2lgPpDwlepYeH7Wa6Z5EjaWOGTO5li/grn9U1Sa4be5bz1+WZsL95G2bv/Hax/h94ts4NNttKuGaRrdrppIJF/wCWW3f/APFVb1S1ht9Qlhi+aNm+Vl+7tr5XC4WVPGVfaRLl8J0XlebDLbbG+Vv4j91qn8NapeaRqDX6u7Sx+aqyKfm/fqybqhgunsLOezidGibarKpXc3zfe/8AHaoaXP8AYLiR5f3byR7oePutu/2/kVK7pw5qU4GUPiPUZbx9N1JL9tjKq+QzSD+5W5ZLf3ul6glrH5azM083+9tVPuf77V5XFewxSR2d1c72mVmj3fxfN/BXrEV6mneEbvVVVvMWRZNufvLub5f+B7f/AB2vjp4edOfIerCrzRML7LDFb2zq7K0i+WzY2/Mm1/8A2avQ/Ct7+8vntUSBZF3SSsPm3fN9x/4f/ZK8y0HxloPiG6lmghaOWTcs1tIfmi3r8ksT/wASfdrv/DlhDZR3P23ddW0kf7xvu7G+5tesqtKrQnyyNYctQ5W/i36wlnA/n+X5UbLnbEv9xXT/AGEqjdWH2PxQyaWzJH5cvzZ+ZWrYTXPN1xntSjTzSLPJuHy7PuIqf7iba5zS/wDiaeJLm8/h27dzbvuozP8A+yrRKlU+OUSeeHwnY2sDvbwJdRyxxxyLJJ97du/up/vp/rP9hqzn0tNJ8QRvL80Fx8zSfw/erVTVLyXynuvm2yblb+7sb/7KrV/cTQeGbWzgtmlaFZdzZZdjPKz7v/QaIS/mKqwjKPuljxDfpZwyXlhcebBIvzNn5VrzzV083bf2o3RTKrNzurGffft5KJ5jR7tyr/ertdRRNUt432/ZWWHzIZMfei+4/wD3w/8A6FVz94whLm+IztE1d/t0VnPtX721sfe3rUHwv8OXlh4Ja/1RFjWa+uvsvO5tqS+S7On8O91b/vmrz2sO2xmi/eeTJ80q/KzM/wDfrv4l/tLTZ7m4m+ZbfbtYfKy7t6fc/wBvdRCfLGUSuTm94qX/AIZuU0W5vIkRY9yssq/eZUb5K+ffEOh6bqXiyS5lXasixTrtO376/P8A+PrX1Lo2s3OpeGZbC6i+VVa2/wA/5/irwi68Pf2tNF5qNFJbssEy5WNtv/A6IfzxJq0uaPLA+bLzfFrV1Zytue3kZZG/vbK891ywd7hvKX5m+7tr2zx54cudG8RNNZh5Wkj/AHisF3f/AGVcxofg3WPFUbXNlHtgX708vyqv/wAV/uV6EJwqR5iI1eX4z1j9mvVrmLwXq+mo/l/vlbr935f/ANmvZPteof8AP5+tfOngrS7nwDp95DZlr5rrbu8hGbbs/v8AybFrf/4S3Wf+fGb8l/8AiK83ETp87sVCdkf/1/lvx1Lsktk/3mrgJZU216h40i8/S1favyt97+KvIWR6+7w/vRPKgPt/9dWltm+dEZfmX+IVk2/+urdii3Mrpt+atplGVpd0+l3S7WSPzFaNuPuq6sm3/vhq9UuNnzWc8nmbo4pI2zu3bF2f+y15BKrxfOw+VW+Zv71et+FIP7ZsW2lXaFdu5vm/3K5MRGEf3swl8ILrKabdLbS2zM7bdyp8qt/tI9SXWqfZWj2I67WVo2YeZ8u1vlep7zSEaPezeXIv94Mys1cwja35LQyxIqQrLJ+7P+f71c/LFrQyH+OrpNJ/sxLX/liq3O3P3mdv/iK9N1n4uaDf6fHYWryyy3EbKsS7VWLerfK//oEdeJ+IIn1K4V3X95t+Zv4fu/8A7Naul6dbeTE+xVWTa3Rflb/9uonl9KpGnOp8UTo5+WJlWs76ReWmsP8AKtvIvmbf+eW751r7Eb4g6JBob20UKWzTR7vMiKrvX/8AbX/x6vlC4gSXzLN127vlatnRtBT7Gj3Xzuvyxt/s/wAFc+Py2lipRnIqlXlTj7p1La3C94zyqytM26P/AGq9t8POn/CNpc7vKW43Rs3/AKB/4+u+vCNRsESP7HcDdt2sy4+Za9w8JWFyvhWCz1L5ljjWTzF/hV9uz/e+9XlZ0oxoR5C8FH96bml3ltPN5NqWkb5mbd8vy/L83/j1eoaXFZxabHNpcqq1xHtZv+Bb/uP/AL1cfdeCPNhs7xb+aCWxh8hWgC/PF/zy/wBx6m/4RyHRrhYbWV54mk/0dWb5lljX51/202V81Dl+E9SfMLa2FhBDdf2dEsXmTMq/Iu7bu+8ldNLpttFZyTfKyL+7kVvmXZ/nbWdFF/ZdjHeX8aK0is3y/e+9/HXRfaLZrPyWb7zRM0bfe/v7a0kZ0oHj0t1c6NbreXCbvm2r5f8AvfJ/8RUfh7Xv9BbdtbbuVl/3K7Txf+62wps+VWVv++fkrxdJbzSdYeG1ZZGmbd0/hrIrk5T6FtYrlbWS/QrHbTbZGjUfL93Y9cVrOjI2sNMqOy7V/wBWfmZv4K6rwfq76vZrDubbt2tGwrN1TV7awWV3DM1vIq7pP4v9r/vunAZ5lrOgvPqHk+UH+ZfmZN37r+Na898UJrfhy6ls7cO1rI33lDbYt/3N7179dX/9vW7XlrDLA0a7mjYL8y/3q6e30vTfEtjeaJqlj573HlNDcr/EyL/47/8AZUSpe9zGUqEK0fe+I8n+Eel3n/CHxS2DK73Em7dKm6JIkb7v/A/79evf2drH/PHTvyq34I1R9E1bYunxRW2nsq+XJH8suxvnbZ/wKvev+FuaL/0CrH/wHo9mluUnGHuo/9DwjyJns2R4V2sv3VNeUXlr57NNFEyq25trDb81evS7/JZ4pfLbb8u4/Kv+1XmWt2ttLIzylpH+Xdt/vV9nh5nkQOORf3lb8Cb161jyp5W3/erctfnjrqNDOnidlZMbm3V3Hw21n+xLi5hlspbpGjVm8uTayrtZPufxfern5Ykl/ffMrfLuWo3lv7C6iv8ASf8AXx7l/wB5X/2P4qwxVKOIpSpSCM+U+r20vQb/AMMwa9ZSoizR+ZC0six7vvfwP/6HXz94juns/EUuiWEySQblgkkUblf/AGd/+fu1yMC23nI7l0kZf3cknzRRs/z/ACJ/ClY9h/psck2ozfNt8uNf4fu/JXn4LL50Obnq80S5TjL7Js3u/UWW2ZfKWH5dq/3tzVBa2W2Nkd9q/wAO0bfm/vPV5US3j/i+9uZv4mpIrj+Bd3/Aq9IyNLe+6KaX73mRK3/A22V9C+DdBs7qFYW2zvHJ80a/+gv/AMDr5luvtP2OTym3bV3bcf3K9Ul8a6D4j02XTdGT7NLeQst8zPtZPm3vsX/2f/ZrycypV6jjGkaw5Y+9Ix9Xv5orp+fMnaRvMZq9h8B3Vy+h2ds3zM1qreXnbu2bv/ZP/Qa8Bi+W1WFpfMVf4/8AZr2bwVpdzfrpls27y441gZm/h3/In/fe6vPzyHLQhE3wXxH0Lpes6VLoqtOzsrf6tcfMq7tif8Do8R6c9rpN2lk372NvPt3b5tjJ86fP/n7zVm2vhJNsG9GRoVVvmLKzSpu/grp/tVy1us10VZZpNsnH3a+Jr1JU3zQPoKFKFT3ZnFf2veeI9Ng1XSBui85YF/2k273/AOB/ersr2J7W1W5tX8t2b7zDd833/uf8BrmNBsE8Gw3SSuyxf2g3kx5+Zl8pXT/xxv8Ax2vTf7Otr+xidpV8qRv4f7u1q9Fe9A8+PuzPD7XRtV0ize21ub7Y0bLPHOvzbVdmR/8AP+1XD6o32WZXT97LGu7co+7sr6Ft/serXE6XUvl+XCzNz8q768r8b2sOm3C21n/rJI1Zv9pf7tTP3S/slrwR4htkjjttjLKu5lbPyvF/zyro7zRtV1nTZNbtURvJVN0cif63f/C6V5LFLcxafHYb/wDV/Mr42steveEvEdzq3g9bO1SKSVmlWSPPzbk+41QRD4uUg8EX9/qOqXmm3mmbIo41VpV3Myv9/wCf/vn/AMdr3DS/D1hZakupb2aCRV2sp3K0u6vKPALv5Ku07tdx7oNsj7mdd2/a/wDe+fdXrzaDNomsanoM+7+z7WaKS1/3Xi3u27/rqzVqTGJ5t4o8Pa9r2pN9gufIguFbzpIx/wAstvyLXE/8KiuP+gnL+Vel2uozXWvX1s0S+RD+783+FYnX5P8Agbu1Xv7OsK4alarzaHQsPSn7zP/R+fb+dPuRZVt33v4a468W5lj2XTKzfd3KK7WWBJVZ4vmbbuauZnl835F+ZfpX2NI8iBxWqW/y/Jup+ky74/4d1at7a+bGvG5axPNhsmV1/iXa20fdauv7JR0aW7y/dX7tT2sGyTe6bv7tVLK/hdd/mKv8XWtnzUl+dX3VmBxt1oz/AGhndm2btyrVi3tf3zXOzy/l27f/AGaty4/ersx8v97+7VB/3St8u2q5gIGldW2f+hUyJ33fP81MV93/AMVVqJMf7NMCT5/L/u/jRLpc3mRzXTNJu+ZW/vf7NWvIe4hZIvvbfu1qq/2q3V2XbtVV21HMHOVVidLeWFV2+Yrbdv8Aeevs7wbF9l0/fBCn+jxxSfKPmZn2/wDoCN/47Xyh4fsPtmuWlmjMu6ZW/wC+Pn/9lr7P8KpZ6Xp88KRvKzL58ki/73yLXyPEc+aVKkenl/2pCajf3Mu57pfLjZt0kn8KrXQaTqlhqmmrNt/dL/qVxt/77rzzxLPqX2jznZVibb5e4/wvWs2oppEzaU0L+ZDCsm6P5fuf/tV8vGXvch6co+7zHRvdaDcTSeakUd0snlruT5vkX5N/+f4a5zWfEaeALXTYbq5laBtcitJGkO5vKull2f8AAEfbXnmr2syX0dzcbopPl7/Lu2/x13/jDw9YalptsmvQv5TRwTyNB95J0l3o3/7H96tMPP3+SRlVh7vOaq6zolvHeaVeoq3kd1FbKzJ8rK7fe/4Am6uZ+JESf25YpBvRY28hZP7q/wAC1HKieIfEU82nKz+XHuXcNrf5+atXXIP7Umk/vKvmL/vfx/8AstXWIgecy3Ftb3kqQN935en8P91/8/xV3fgZ9N03xJcve7Wgm8pdq/Kzf7X+f7tcfqlg7NHc5Vd37pV/iatiwdImW5iCzywyfNH/AH9jfPWUavu8pcoe9znYwQJb6tY+J9LZvKVbr93KPvf7X/oL1JF8QfEKatPYeIS0kcytHJPP/sLsTY/9z/4lqnup9N17wvc21u/2aVV+1wso2rt+bYqf7CVjWGs6D4h0lk1K8W2vI1+WJk+V2T/ll/v/AHvn/gqo8wS5S9Lqn/CK6XLf4WVptqx+V/z1/vJ/3zXM/wDC0vEX9y7qPw540TSbGK51dla2aR2VpE2+XLJ/9hXXf8LW8Kf8/MFck4z5vhLjVptaH//S8IvbL+7uXb91lP3v9muZli9tteoajYPBJJZzjbLG33f4lb+7Xnl6v7xkiXb/ABV9bh6vNH3TxvhMeKJP3m8/L/drVuPDnzQTW6qyblVv/ZKqJA+5X/2l/wC+a7/RHmsrNf3TSyf6uOP+81Ri8X9Wpe1kaQhKrLkiUbXwLDFbveeX8sm7dtH9z77f+PLXHeINIs7Bft9grK8e3csf8S/7lfevh/w1YNY3l54jdGnmXbtjG1VX5f8A0Ovmnxfp2mxaxc2EA2xRzeXGzf3a83Lc1liKvLI3r4f2P2jwVL2GWNXRvvfNuqjLL7fLW/rOkw6da74l+Xdu+X/brkf4d6L8tfQQ94wgW4k+atWCB3rKtfmbZXY6bauy9N1EgILeLZ2+7Wj5W2PZtq99i8qP/ZpWt9sbVzc5kaPgvYmtfbNq/wCiwytub7vz/JXrdn4lmt9B1HSreVvMvIV8ls/eb76V5J4c329w23/lt8v/AAGvZtS8JfbdLtvE+jf7XnRqPuKi7/8A2WvkM3nzYs9jBc3KdTdWqN4ftvPfe0m1ZNo+5sX7v+1WdBfzXuoRaleoySsqwKrD7yoq/NWPol/eXGi6jDcbmZplk+b/AG1/+xruL/VLC4vIpon2/ZY/3ca/xt8qfPXj/b947vslTxDYXNxN9j2uzbW/eKN26Wut+22cvgmXVdZDSQQ2bTyL935UX7v/AI7XF/bLy61RUR/9W3mTN/F8laXhy11LWdBvvBmqJ+48loPNjP3lf/8AaqPZezqRkEavtIcph63K/hfxAupaW7LBdW8VzJHn7qv/AOyV1MF1DLbrrGVaKZVW33f7rJurgPFHh/8AsvUrSweWWeC6sYFWSX7277jr/wCO1R8PX+peHNWls5189Vb7FMrP8u3+9s/v10TgYc3Kdrf6X5tvLCib5f8AlntH3W/jri9IZ7DdYXSmO53bdzf+g13HiCW/0O6ks9UZvKsVRWbHzeV/e/36qXWkpEsWpLtZY227W/hX76NWPIaw9463SNZs7XTbXR7qNvstxcbVlY/wv/DXM+N/C9toPjKOaJ/KlW3WSFlPyszrs2v/AOh1lSpfxSLDBH/ejbn7v3tjJXtl5pN/deFbHW78b2s49szfxMqf6qXZVUo/aKnL3eQ8P077frmjxXOopvWGNvtEaj7sSfJu2/3/AP7Kqn2XwT/zym/79V1+raymm+Gbq58Pp+8ZlWafO3b8yvt/2k+Zq8r/AOE217/ntDW9rnHa2h//08r4oWs0XjS8uZfnSZlkjb+8u1a8hvLL943y/wD2S17p8Vf+QzD/ANeyf+grXkF5/rF/65172Wv9xE8qtpVkcds8qRf7u7a1fU/wl8OW2pKtzOFkVW3fMPu/52rXy3P3/wCutfZvwS/5Bkv0rk4i/wB2idWA/jly/un05rma8/49vu/KfmWuV1Lwzpurab8+1JZP9XKv3q3PGf8AyCrz/fpkH/HlZ18lCpKErxPWnSi9z568UeF3sJlsL8oyt92RfmryDVPDX9nTNNbj5Wr6P+IX/H5BXk/iL/UCvvsqqynRi5HhVvcnJRPNrW1+ZfNXbtba26vQNGt/412srLXIy9ZP+utdp4e/49k/3a78QzE6D5PL8lkVlqjLap9xBV0dKVv9ZXCQR+FLW2bXrSznfavzSMzfdVU+d/8A0Gvp7QbWaXwrZ6bpsSq1xJP80h++qN/7PXy7on/Idj/69Lz/ANFvX114Q/5B2g/9tv8A0Kvj8w/3mR7mC/hnAWGgpoeoXVhqPzyyRrLHFH8u1dzVzMGl6xLql1NFHtVdvlow2/w16b4j/wCSht/14L/6E1Mh/wCQlP8A8A/9Brw61SSqXPVgk6djlLBJorO5ufuyLG27+9Wz4SeaKNblXZW8vasi/N/uVSj/ANRf/wDXN6veD/8AkExfSOt6lWRz06cUrHN/FW6mutU050fdbSWbbdq/dZGXf/8AF/8AAqNE0O2XVvs1/wCVHJeWrfvPuruRWfd/7PVbx3/qNI/697z/ANBirZuv+Qzp3/XpP/6SNXcvgMPtFa/1ZPFFrs1J1S6ut0bLGfv/ALjf/wCyt/31Xa6XZw3XhWLbuaJody7vlb5K8Y0z/kN6b/12f/0kevdNA/5E+z/69payn8BdL4zhIJ0tbpXlXzGjb+H5v9yvbbXxXbXXh++0e1RZJ5rNoG3D5Vif77V4RD/x9Sf70Vdt4X/4/Lz/ALBzVlh/iNaq/dyRyFhEmqaXeeHogscs0bbd33WlSuM/4Vb4p/6d67bw1/yH0/66z165XVexnyp6s//Z", YUKSEKLIK_THUMB = "data:image/jpeg;base64,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";
var __defProp$j = Object["defineProperty"], __getOwnPropDesc$k = Object["getOwnPropertyDescriptor"], __decorateClass$k = (_0x311326, _0x431018, _0x1bed3a, _0xa0383a) => {
  var _0x21f37a = _0xa0383a > 1 ? void 0 : _0xa0383a ? __getOwnPropDesc$k(_0x431018, _0x1bed3a) : _0x431018;
  for (var _0x3e8c72 = _0x311326["length"] - 1, _0x5a542a; _0x3e8c72 >= 0; _0x3e8c72--) if (_0x5a542a = _0x311326[_0x3e8c72]) _0x21f37a = (_0xa0383a ? _0x5a542a(_0x431018, _0x1bed3a, _0x21f37a) : _0x5a542a(_0x21f37a)) || _0x21f37a;
  if (_0xa0383a && _0x21f37a) __defProp$j(_0x431018, _0x1bed3a, _0x21f37a);
  return _0x21f37a;
};
const ICON_CHEVRON_RIGHT = o$1(iconNodeToString(_16_default$x)), ICON_CLOSE$3 = o$1(iconNodeToString(_16_default$v)), ICON_CHECK = o$1(iconNodeToString(_16_default$y)), ICON_WARNING = o$1(iconNodeToString(_16_default$2)), ICON_MAP = o$1(iconNodeToString(_16_default$h)), PENDING_INDICATOR_DELAY_MS = 1500, DEFAULT_BASEMAPS = [{ "id": "hgm-siyasi", "label": "HGM Siyasi", "thumbnail": SIYASI_THUMB }, { "id": "hgm-yukseklik", "label": "HGM Yükseklik", "thumbnail": YUKSEKLIK_THUMB }, { "id": "hgm-ortofoto", "label": "HGM Ortofoto", "thumbnail": ORTOFOTO_THUMB }, { "id": "hgm-temel", "label": "HGM Temel", "thumbnail": TEMEL_THUMB }];
let TucbsBasemapPicker = class extends i$2 {
  constructor() {
    super(...arguments), this["mapElementId"] = "", this["activeBasemap"] = "", this["basemaps"] = DEFAULT_BASEMAPS, this["customCss"] = "", this["embedded"] = ![], this["_open"] = ![], this["_error"] = ![], this["_pending"] = ![], this["_customCssState"] = { "sheet": null }, this["_pendingTimer"] = null, this["_timers"] = new TimerBag(this), this["_onLayerAdd"] = (_0x203c9a) => {
      if (!_0x203c9a["layer"]["isBasemap"]) return;
      this["activeBasemap"] = _0x203c9a["layer"]["title"], this["_clearPendingTimer"](), this["_pending"] = ![], this["_pendingTimer"] = this["_timers"]["setTimeout"](() => {
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
  ["updated"](_0x59c1f9) {
    var _a2;
    _0x59c1f9["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_customCssState"], "tucbs-basemap-picker");
    if (_0x59c1f9["has"]("map")) {
      const _0x47facc = _0x59c1f9["get"]("map");
      if (_0x47facc) this["_unbindMap"](_0x47facc);
      if (this["map"]) this["_bindMap"](this["map"]);
    }
    if (_0x59c1f9["has"]("activeBasemap") && this["activeBasemap"] && this["map"]) {
      const _0x3f5516 = (_a2 = this["map"]["layerManager"]["getLayers"]()["find"]((_0x3be3dc) => _0x3be3dc["isBasemap"])) == null ? void 0 : _a2["title"];
      _0x3f5516 !== this["activeBasemap"] && this["map"]["setBasemap"](this["activeBasemap"]);
    }
  }
  ["_bindMap"](_0x37d8ef) {
    _0x37d8ef["layerManager"]["on"]("layer:add", this["_onLayerAdd"]), _0x37d8ef["layerManager"]["on"]("basemap:error", this["_onBasemapError"]), _0x37d8ef["layerManager"]["on"]("basemap:recovered", this["_onBasemapRecovered"]), this["_syncFromMap"](_0x37d8ef);
    if (_0x37d8ef["basemapStatus"] === "unavailable") this["_error"] = !![];
    else _0x37d8ef["basemapStatus"] === "loading" && (this["_pending"] = !![]);
  }
  ["_unbindMap"](_0x69614b) {
    _0x69614b["layerManager"]["off"]("layer:add", this["_onLayerAdd"]), _0x69614b["layerManager"]["off"]("basemap:error", this["_onBasemapError"]), _0x69614b["layerManager"]["off"]("basemap:recovered", this["_onBasemapRecovered"]);
  }
  ["_syncFromMap"](_0xf5c12a) {
    const _0x1d9c2a = _0xf5c12a["layerManager"]["getLayers"]()["find"]((_0x5edd80) => _0x5edd80["isBasemap"]);
    if (_0x1d9c2a) this["activeBasemap"] = _0x1d9c2a["title"];
  }
  ["_select"](_0x5a8bee) {
    if (this["_error"] || this["_pending"]) return;
    this["_clearPendingTimer"](), this["_pending"] = ![], this["_pendingTimer"] = this["_timers"]["setTimeout"](() => {
      this["_pendingTimer"] = null, this["_pending"] = !![];
    }, PENDING_INDICATOR_DELAY_MS), this["activeBasemap"] = _0x5a8bee;
  }
  ["_openPanel"]() {
    this["_open"] = !![];
  }
  ["_closePanel"]() {
    this["_open"] = ![];
  }
  ["_renderCard"](_0xb78cfc) {
    const _0x2a4820 = _0xb78cfc["id"] === this["activeBasemap"];
    return b`
      <button
        type="button"
        class="card ${_0x2a4820 ? "selected" : ""}"
        style="background-image: url('${_0xb78cfc["thumbnail"]}')"
        role="radio"
        aria-checked=${_0x2a4820}
        ?disabled=${this["_error"] || this["_pending"]}
        aria-disabled=${this["_error"] || this["_pending"]}
        @click=${() => this["_select"](_0xb78cfc["id"])}
      >
        ${_0x2a4820 ? b`<span class="check-badge">${ICON_CHECK}</span>` : A}
        <span class="card-label">${_0xb78cfc["label"]}</span>
      </button>
    `;
  }
  ["_renderGrid"]() {
    return b`
      <div class="grid" role="radiogroup" aria-label="Altlık Haritalar" aria-disabled=${this["_error"] || this["_pending"]}>
        ${c(this["basemaps"], (_0x46eba4) => _0x46eba4["id"], (_0x39c6d0) => this["_renderCard"](_0x39c6d0))}
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
var __defProp$i = Object["defineProperty"], __getOwnPropDesc$j = Object["getOwnPropertyDescriptor"], __decorateClass$j = (_0x381fcd, _0x1c75ad, _0x24e4e5, _0x59cafa) => {
  var _0x53ddbd = _0x59cafa > 1 ? void 0 : _0x59cafa ? __getOwnPropDesc$j(_0x1c75ad, _0x24e4e5) : _0x1c75ad;
  for (var _0x3a9af2 = _0x381fcd["length"] - 1, _0x4c8f2f; _0x3a9af2 >= 0; _0x3a9af2--) if (_0x4c8f2f = _0x381fcd[_0x3a9af2]) _0x53ddbd = (_0x59cafa ? _0x4c8f2f(_0x1c75ad, _0x24e4e5, _0x53ddbd) : _0x4c8f2f(_0x53ddbd)) || _0x53ddbd;
  if (_0x59cafa && _0x53ddbd) __defProp$i(_0x1c75ad, _0x24e4e5, _0x53ddbd);
  return _0x53ddbd;
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
  ["updated"](_0x20cf73) {
    _0x20cf73["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_customCssState"], "tucbs-quality-bar");
    if (_0x20cf73["has"]("map") && this["map"]) this["_syncFromMap"](this["map"]);
  }
  ["_syncFromMap"](_0x5ccb63) {
    this["_quality"] = Math["round"](_0x5ccb63["viewer"]["resolutionScale"] * 100);
  }
  ["_onSliderInput"](_0x4b6324) {
    const _0x2adc5d = _0x4b6324["target"], _0x1c898a = Number(_0x2adc5d["value"]);
    _0x2adc5d["style"]["setProperty"]("--fill", _0x1c898a + "%"), this["_timers"]["cancelAnimationFrame"](this["_qualityRaf"]), this["_qualityRaf"] = this["_timers"]["requestAnimationFrame"](() => {
      var _a2;
      this["_qualityRaf"] = null, this["_quality"] = _0x1c898a, (_a2 = this["map"]) == null ? void 0 : _a2["setQuality"](_0x1c898a);
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
var __defProp$h = Object["defineProperty"], __getOwnPropDesc$i = Object["getOwnPropertyDescriptor"], __decorateClass$i = (_0xc58810, _0x3ebb0e, _0x25ba69, _0x1a4f90) => {
  var _0x2c301d = _0x1a4f90 > 1 ? void 0 : _0x1a4f90 ? __getOwnPropDesc$i(_0x3ebb0e, _0x25ba69) : _0x3ebb0e;
  for (var _0x5092f0 = _0xc58810["length"] - 1, _0x30962a; _0x5092f0 >= 0; _0x5092f0--) if (_0x30962a = _0xc58810[_0x5092f0]) _0x2c301d = (_0x1a4f90 ? _0x30962a(_0x3ebb0e, _0x25ba69, _0x2c301d) : _0x30962a(_0x2c301d)) || _0x2c301d;
  if (_0x1a4f90 && _0x2c301d) __defProp$h(_0x3ebb0e, _0x25ba69, _0x2c301d);
  return _0x2c301d;
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
    const _0x252ec6 = document["createElement"]("tucbs-slide-over-panel");
    _0x252ec6["panelTitle"] = "Ayarlar", _0x252ec6["panelWidth"] = this["panelWidth"], _0x252ec6["onCloseRequest"] = () => this["_toggle"](), document["body"]["appendChild"](_0x252ec6), this["_panelEl"] = _0x252ec6, this["_renderIntoPanel"]();
  }
  ["disconnectedCallback"]() {
    var _a2;
    if (this["map"]) this["_layoutController"]["unbindMap"](this["map"]);
    (_a2 = this["_panelEl"]) == null ? void 0 : _a2["remove"](), this["_panelEl"] = null, super["disconnectedCallback"]();
  }
  ["firstUpdated"]() {
    bindMapByElementId(this, { "noIdTiming": "sync", ...standardMapBindingMessages("tucbs-settings-tool", "islevsiz") });
  }
  ["updated"](_0x4d0ec8) {
    _0x4d0ec8["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_customCssState"], "tucbs-settings-tool");
    if (_0x4d0ec8["has"]("map")) {
      const _0x7c45ce = _0x4d0ec8["get"]("map");
      if (_0x7c45ce) this["_layoutController"]["unbindMap"](_0x7c45ce);
      if (this["map"]) this["_layoutController"]["bindMap"](this["map"]);
    }
    _0x4d0ec8["has"]("panelWidth") && this["_open"] && this["_layoutController"]["setOpen"](!![], this["panelWidth"]);
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
function buildDisclaimerBox(_0x4eef9c) {
  const _0xd2fdaf = _0x4eef9c["createElement"]("div");
  return _0xd2fdaf["className"] = "print-disclaimer", _0xd2fdaf["textContent"] = DISCLAIMER_TEXT, _0xd2fdaf;
}
function buildDatasetsSectionTitle(_0xb8fabe) {
  const _0x4902a9 = _0xb8fabe["createElement"]("h2");
  return _0x4902a9["className"] = "print-section-title", _0x4902a9["textContent"] = "Veri Setleri", _0x4902a9;
}
function buildDatasetNameList(_0x169131, _0x20ce1f) {
  const _0x46d05d = _0x169131["createElement"]("ul");
  _0x46d05d["className"] = "dataset-name-list";
  for (const _0x5126de of _0x20ce1f) {
    const _0x227b78 = _0x169131["createElement"]("li");
    _0x227b78["textContent"] = _0x5126de, _0x46d05d["appendChild"](_0x227b78);
  }
  return _0x46d05d;
}
function buildEmptyDatasetsMessage(_0xff1836) {
  const _0xeeb1b = _0xff1836["createElement"]("p");
  return _0xeeb1b["className"] = "dataset-empty", _0xeeb1b["textContent"] = EMPTY_DATASETS_MESSAGE, _0xeeb1b;
}
function buildLegendSection(_0x30c044, _0x1f6ca5) {
  if (_0x1f6ca5["length"] === 0) return null;
  const _0x1631b5 = _0x30c044["createElement"]("div");
  _0x1631b5["className"] = "legend-section";
  for (const _0x2bba7a of _0x1f6ca5) _0x1631b5["appendChild"](buildLegendEntryElement(_0x30c044, _0x2bba7a));
  return _0x1631b5;
}
function buildLegendEntryElement(_0x168aa6, _0x319202) {
  if (_0x319202["kind"] === "list-columns") return buildListColumnsGrid(_0x168aa6, _0x319202);
  const _0x301627 = _0x168aa6["createElement"]("div");
  return _0x301627["className"] = "legend-entry", _0x301627["append"](...buildLegendEntryHeader(_0x168aa6, _0x319202), buildLegendEntryContent(_0x168aa6, _0x319202)), _0x301627;
}
function buildLegendEntryHeader(_0x18d930, _0x139e3f) {
  if (_0x139e3f["kind"] !== "gradient" && _0x139e3f["kind"] !== "bin" && _0x139e3f["kind"] !== "enum") return buildEntryHeaderLines(_0x18d930, _0x139e3f["layerTitle"], void 0);
  return buildEntryHeaderLines(_0x18d930, _0x139e3f["layerTitle"], _0x139e3f["displayColumn"]);
}
function buildEntryHeaderLines(_0x4f18b0, _0x1835d9, _0x199739) {
  const _0x4c0739 = _0x4f18b0["createElement"]("div");
  _0x4c0739["className"] = "legend-entry-title", _0x4c0739["textContent"] = _0x1835d9;
  if (_0x199739 === void 0) return [_0x4c0739];
  const _0x5b1604 = _0x4f18b0["createElement"]("div");
  _0x5b1604["className"] = "legend-entry-subtitle", _0x5b1604["textContent"] = "Görüntüleme Değişkeni: " + _0x199739;
  const _0x1a6376 = _0x4f18b0["createElement"]("div");
  return _0x1a6376["className"] = "legend-entry-column", _0x1a6376["textContent"] = _0x199739, [_0x4c0739, _0x5b1604, _0x1a6376];
}
function buildLegendEntryContent(_0xd9a183, _0x5129c6) {
  switch (_0x5129c6["kind"]) {
    case "image":
      return buildImageContent(_0xd9a183, _0x5129c6["imageUrl"]);
    case "gradient":
    case "bin":
    case "enum":
      return buildRowsContent(_0xd9a183, _0x5129c6["rows"]);
    case "empty":
      return buildEmptyContent(_0xd9a183, _0x5129c6["message"]);
  }
}
function buildListColumnsGrid(_0x6b8ce8, _0x3596c3) {
  const _0x448587 = _0x6b8ce8["createElement"]("div");
  return _0x448587["className"] = "legend-entry legend-list-columns", _0x3596c3["columnGroups"]["forEach"]((_0x262a60, _0x4baacb) => {
    const _0x15ef42 = _0x6b8ce8["createElement"]("div"), _0x520a73 = _0x6b8ce8["createElement"]("div");
    _0x520a73["append"](...buildEntryHeaderLines(_0x6b8ce8, _0x3596c3["layerTitle"], _0x3596c3["displayColumn"]));
    if (_0x4baacb > 0) _0x520a73["style"]["visibility"] = "hidden";
    _0x15ef42["append"](_0x520a73, buildRowsContent(_0x6b8ce8, _0x262a60)), _0x448587["appendChild"](_0x15ef42);
  }), _0x448587;
}
function buildImageContent(_0x483800, _0x17b224) {
  const _0x59c6fc = _0x483800["createElement"]("img");
  return _0x59c6fc["className"] = "legend-image", _0x59c6fc["src"] = _0x17b224, _0x59c6fc["alt"] = "Lejant", _0x59c6fc;
}
function buildRowsContent(_0x4fa12f, _0x14d0af) {
  const _0x3397cb = _0x4fa12f["createElement"]("div");
  for (const _0x26439a of _0x14d0af) {
    const _0x3af07a = _0x4fa12f["createElement"]("div");
    _0x3af07a["className"] = "legend-row";
    const _0x540aa5 = _0x4fa12f["createElement"]("span");
    _0x540aa5["className"] = "legend-swatch", _0x540aa5["style"]["background"] = _0x26439a["color"];
    const _0x34ee49 = _0x4fa12f["createElement"]("span");
    _0x34ee49["className"] = "legend-value", _0x34ee49["textContent"] = _0x26439a["label"], _0x3af07a["append"](_0x540aa5, _0x34ee49), _0x3397cb["appendChild"](_0x3af07a);
  }
  return _0x3397cb;
}
function buildEmptyContent(_0x28c1cc, _0x39440e) {
  const _0x26e91a = _0x28c1cc["createElement"]("span");
  return _0x26e91a["className"] = "legend-empty", _0x26e91a["textContent"] = _0x39440e, _0x26e91a;
}
function buildDatasetNameContinuationPage(_0x2efd3c, _0x4982df, _0x42ed2e, _0x1e45c3, _0x10dc83, _0x5a4152 = ![]) {
  const _0x10e3be = _0x2efd3c["createElement"]("div");
  _0x10e3be["className"] = "legend-continuation-page", _0x10e3be["style"]["padding"] = _0x10dc83 + "mm", _0x10e3be["style"]["width"] = _0x42ed2e + "mm", _0x10e3be["style"]["boxSizing"] = "border-box";
  _0x5a4152 && _0x10e3be["appendChild"](buildDatasetsSectionTitle(_0x2efd3c));
  const _0x17c44a = buildDatasetNameList(_0x2efd3c, _0x4982df);
  return _0x17c44a["style"]["height"] = _0x1e45c3 + "mm", _0x17c44a["style"]["overflow"] = "hidden", _0x10e3be["appendChild"](_0x17c44a), _0x10e3be;
}
function buildLegendContinuationPage(_0x36a25a, _0x3eda0a, _0x38116b, _0xcca701, _0x2e4eaa, _0x3081db = ![]) {
  const _0x24dd0b = _0x36a25a["createElement"]("div");
  _0x24dd0b["className"] = "legend-continuation-page", _0x24dd0b["style"]["padding"] = _0x2e4eaa + "mm", _0x24dd0b["style"]["width"] = _0x38116b + "mm", _0x24dd0b["style"]["boxSizing"] = "border-box";
  _0x3081db && _0x24dd0b["appendChild"](buildDatasetsSectionTitle(_0x36a25a));
  const _0x32379b = buildLegendSection(_0x36a25a, _0x3eda0a);
  return _0x32379b && (_0x32379b["style"]["height"] = _0xcca701 + "mm", _0x32379b["style"]["overflow"] = "hidden", _0x24dd0b["appendChild"](_0x32379b)), _0x24dd0b;
}
const LEGEND_ROW_HEIGHT_MM = 3.4, LEGEND_COLUMNS_PER_PAGE = 3, COMPACT_ENTRY_ROW_COST = 4, LIST_HEADER_ROW_COST = 7, LEGEND_CONTINUATION_SUFFIX = " (devam)", DATASET_NAME_ROW_HEIGHT_MM = 5.5;
function paginateDatasetNames(_0x3e9a32, _0x8e679e, _0x76ef09) {
  const _0x446711 = Math["max"](1, Math["floor"](_0x8e679e / DATASET_NAME_ROW_HEIGHT_MM)), _0x389a19 = Math["max"](1, Math["floor"](_0x76ef09 / DATASET_NAME_ROW_HEIGHT_MM)), _0x3a4928 = _0x3e9a32["slice"](0, _0x446711), _0x225739 = [];
  for (let _0x208962 = _0x446711; _0x208962 < _0x3e9a32["length"]; _0x208962 += _0x389a19) {
    _0x225739["push"](_0x3e9a32["slice"](_0x208962, _0x208962 + _0x389a19));
  }
  return { "page1Names": _0x3a4928, "continuationPages": _0x225739 };
}
function computeRowsPerColumn(_0x369bbf) {
  return Math["max"](1, Math["floor"](_0x369bbf / LEGEND_ROW_HEIGHT_MM));
}
function splitIntoColumns(_0x3ba925, _0x156298) {
  const _0x2a0e56 = [];
  for (let _0xbe59a1 = 0; _0xbe59a1 < _0x3ba925["length"]; _0xbe59a1 += _0x156298) {
    _0x2a0e56["push"](_0x3ba925["slice"](_0xbe59a1, _0xbe59a1 + _0x156298));
  }
  return _0x2a0e56;
}
function paginateLegendEntries(_0x2d8d5c, _0x31f7e1, _0x33119f) {
  const _0x367def = new LegendPaginator(_0x31f7e1, _0x33119f);
  for (const _0x48b2cf of _0x2d8d5c) {
    if (_0x48b2cf["kind"] === "bin" || _0x48b2cf["kind"] === "enum" || _0x48b2cf["kind"] === "gradient") _0x367def["addList"](_0x48b2cf);
    else _0x367def["addCompact"](_0x48b2cf);
  }
  return _0x367def["result"]();
}
class LegendPaginator {
  constructor(_0x41206d, _0x253955) {
    this["pages"] = [[]], this["compactHeightMmOnCurrentPage"] = 0, this["currentPageHeightMm"] = _0x41206d, this["fullPageHeightMm"] = _0x253955, this["rowsPerColumnForCurrentPage"] = computeRowsPerColumn(_0x41206d), this["fullPageRowsPerColumn"] = computeRowsPerColumn(_0x253955), this["remaining"] = this["rowsPerColumnForCurrentPage"];
  }
  ["addCompact"](_0x570ec4) {
    this["ensureRoomFor"](COMPACT_ENTRY_ROW_COST), this["currentPage"]()["push"](_0x570ec4), this["remaining"] -= COMPACT_ENTRY_ROW_COST, this["compactHeightMmOnCurrentPage"] += COMPACT_ENTRY_ROW_COST * LEGEND_ROW_HEIGHT_MM;
  }
  ["addList"](_0x2a9cd5) {
    let _0xb8103 = _0x2a9cd5["rows"], _0x1af2ae = !![];
    while (_0xb8103["length"] > 0) {
      const _0x208064 = Math["max"](1, this["rowsPerColumnForCurrentPage"] - LIST_HEADER_ROW_COST);
      _0xb8103["length"] <= _0x208064 ? _0xb8103 = this["addSingleColumnChunk"](_0x2a9cd5, _0x1af2ae, _0xb8103) : _0xb8103 = this["addMultiColumnChunk"](_0x2a9cd5, _0x1af2ae, _0xb8103), _0x1af2ae = ![];
    }
  }
  ["addSingleColumnChunk"](_0x25d03c, _0x2e7c1d, _0x4541a7) {
    this["ensureRoomFor"](LIST_HEADER_ROW_COST + 1);
    const _0x1fc980 = Math["max"](1, this["rowsPerColumnForCurrentPage"] - LIST_HEADER_ROW_COST), _0x2c55ff = Math["min"](_0x4541a7["length"], _0x1fc980), _0x4b39d9 = _0x2e7c1d ? _0x25d03c["layerTitle"] : _0x25d03c["layerTitle"] + LEGEND_CONTINUATION_SUFFIX;
    return this["currentPage"]()["push"]({ ..._0x25d03c, "layerTitle": _0x4b39d9, "rows": _0x4541a7["slice"](0, _0x2c55ff) }), this["remaining"] -= _0x2c55ff + LIST_HEADER_ROW_COST, this["compactHeightMmOnCurrentPage"] += (LIST_HEADER_ROW_COST + _0x2c55ff) * LEGEND_ROW_HEIGHT_MM, _0x4541a7["slice"](_0x2c55ff);
  }
  ["addMultiColumnChunk"](_0x37a3a7, _0x1769a8, _0x2c5fbf) {
    const _0x6c4164 = this["currentPageHeightMm"] - this["compactHeightMmOnCurrentPage"];
    let _0x582f03 = Math["max"](0, Math["floor"](_0x6c4164 / LEGEND_ROW_HEIGHT_MM) - LIST_HEADER_ROW_COST);
    _0x582f03 < 1 && (this["advancePage"](), _0x582f03 = Math["max"](1, this["rowsPerColumnForCurrentPage"] - LIST_HEADER_ROW_COST));
    const _0x21ab73 = Math["min"](_0x2c5fbf["length"], _0x582f03 * LEGEND_COLUMNS_PER_PAGE), _0x11e842 = splitIntoColumns(_0x2c5fbf["slice"](0, _0x21ab73), _0x582f03), _0x59a637 = _0x1769a8 ? _0x37a3a7["layerTitle"] : _0x37a3a7["layerTitle"] + LEGEND_CONTINUATION_SUFFIX;
    return this["currentPage"]()["push"]({ "layerTitle": _0x59a637, "kind": "list-columns", "displayColumn": _0x37a3a7["displayColumn"], "columnGroups": _0x11e842 }), this["advancePage"](), _0x2c5fbf["slice"](_0x21ab73);
  }
  ["result"]() {
    return { "page1Entries": this["pages"][0], "continuationPages": this["pages"]["slice"](1)["filter"]((_0xb5dfed) => _0xb5dfed["length"] > 0) };
  }
  ["currentPage"]() {
    return this["pages"][this["pages"]["length"] - 1];
  }
  ["advancePage"]() {
    this["pages"]["push"]([]), this["currentPageHeightMm"] = this["fullPageHeightMm"], this["rowsPerColumnForCurrentPage"] = this["fullPageRowsPerColumn"], this["remaining"] = this["rowsPerColumnForCurrentPage"], this["compactHeightMmOnCurrentPage"] = 0;
  }
  ["ensureRoomFor"](_0x1bfa29) {
    if (this["remaining"] >= _0x1bfa29) return;
    if (this["currentPage"]()["length"] === 0 && _0x1bfa29 > this["fullPageRowsPerColumn"]) return;
    this["advancePage"]();
  }
}
const LEGEND_SECTION_MARGIN_TOP_MM = 3, LEGEND_PAGE1_SAFETY_MARGIN_MM = 5;
function computeLegendMaxHeightMm(_0x1ef4f9) {
  return Math["max"](0, _0x1ef4f9["pageHeightMm"] - 2 * _0x1ef4f9["pageMarginMm"] - _0x1ef4f9["headerHeightMm"] - _0x1ef4f9["footerHeightMm"] - _0x1ef4f9["imageHeightMm"] - LEGEND_SECTION_MARGIN_TOP_MM - LEGEND_PAGE1_SAFETY_MARGIN_MM);
}
const DATASETS_HEADER_BLOCK_MM = 34;
function computeDatasetsListMaxHeightMm(_0xb80b5d) {
  return Math["max"](0, computeLegendMaxHeightMm(_0xb80b5d) - DATASETS_HEADER_BLOCK_MM);
}
function buildPageStyle(_0x29a75d, _0x39aa5a) {
  const _0x27f4cb = _0x29a75d["createElement"]("style");
  return _0x27f4cb["textContent"] = buildBasePageCss(_0x39aa5a) + buildLegendCss(_0x39aa5a), _0x27f4cb;
}
function buildBasePageCss(_0x179d40) {
  return "\n    @page { size: " + _0x179d40["pageWidthMm"] + "mm " + _0x179d40["pageHeightMm"] + `mm; margin: 0; }
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
    .print-page { display: flex; flex-direction: column; align-items: center; width: ` + _0x179d40["pageWidthMm"] + "mm; height: " + _0x179d40["pageHeightMm"] + "mm; padding: " + _0x179d40["pageMarginMm"] + "mm; box-sizing: border-box; }\n    .print-header { width: 100%; text-align: center; box-sizing: border-box; overflow: hidden; height: " + _0x179d40["headerHeightMm"] + 'mm; }\n    .print-header h1 { margin: 0 0 2mm 0; font-size: 18px; font-weight: 600; }\n    .print-header .print-date { font-size: 12px; color: #525252; }\n    .map-frame { position: relative; width: 100%; }\n    .map-frame::before { content: ""; display: block; padding-top: var(--frame-aspect-pct); }\n    .map-frame img { display: block; position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; }\n    .north-arrow { position: absolute; width: 40px; height: 40px; }\n    .north-arrow img { width: 100%; height: 100%; display: block; }\n    .scale-bar { position: absolute; font-size: 12px; font-weight: 600; background: rgba(255,255,255,0.85); padding: 2px 6px; border-radius: 2px; }\n    .print-footer { box-sizing: border-box; overflow: hidden; font-size: 10px; color: #525252; text-align: center; }\n    .preview-toolbar { position: fixed; top: 16px; right: 16px; display: flex; gap: 8px; z-index: 1000; }\n    .preview-toolbar-btn { padding: 8px 16px; border: none; border-radius: 4px; background: #0f62fe; color: #fff; font: inherit; cursor: pointer; }\n    @media print { .preview-toolbar { display: none; } }\n  ';
}
function buildLegendCss(_0xaf657d) {
  const _0x1596e5 = computeLegendMaxHeightMm(_0xaf657d), _0x4ec20c = computeDatasetsListMaxHeightMm(_0xaf657d);
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
    .datasets-section-bounded { height: ` + _0x1596e5 + `mm; overflow: hidden; }
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
    .legend-section { width: 100%; margin-top: ` + LEGEND_SECTION_MARGIN_TOP_MM + "mm; font-size: 10px; height: " + _0x4ec20c + "mm; overflow: hidden; box-sizing: border-box; }\n    /* FAZ 3.4: .datasets-section icinde (SADECE sayfa 1) baslik zaten\n       KENDI margin-bottom'uyla bosluk birakiyor -- .legend-section'in KENDI\n       margin-top'u (devam sayfalarinda hala GEREKLI, o yuzden ASAGIDAKI\n       temel kuraldan KALDIRILMADI) burada FAZLADAN/CIFT bosluk yaratirdi. */\n    .datasets-section .legend-section { margin-top: 0; }\n    .legend-continuation-page { break-before: page; box-sizing: border-box; }\n    .legend-entry { break-inside: avoid; margin-bottom: 3mm; }\n    /* FAZ 2.3/3.5: bkz PrintLegendBuilder.ts buildListColumnsGrid WHY yorumu --\n       acik bir CSS Grid ile kolonlari HIZALI olusturur; .legend-section\n       ARTIK HICBIR ZAMAN CSS columns: baglami acmadigindan (bkz yukarisi)\n       bu Grid'in column-span:all'a ihtiyaci hic olmaz. */\n    .legend-list-columns { display: grid; grid-template-columns: repeat(" + LEGEND_COLUMNS_PER_PAGE + ', 1fr); column-gap: 6mm; }\n    /* FAZ 2.3: kullanici basligin ILK 2 satiri (katman adi + "Goruntuleme\n       Degiskeni") arasindaki bosluk SATIRINI kaldirmayi, bunun yerine\n       lejantin HEMEN USTUNDEKI alan-adi satiriyla lejant satirlari arasina\n       bir bosluk satiri eklemeyi istedi -- toplam kaplanan dikey alan AYNI\n       (1mm+3mm+3mm = eskiden 3mm+3mm+1mm), sadece boslugun YERI degisti,\n       bu yuzden LIST_HEADER_ROW_COST kalibrasyonu ETKILENMEZ. */\n    .legend-entry-title { font-weight: 600; margin-bottom: 1mm; }\n    .legend-entry-subtitle { color: #525252; margin-bottom: 3mm; }\n    .legend-entry-column { font-weight: 600; margin-bottom: 3mm; }\n    .legend-image { max-width: 100%; display: block; }\n    .legend-row { display: flex; align-items: center; gap: 4px; }\n    .legend-swatch { flex: none; width: 8px; height: 8px; border-radius: 2px; }\n    .legend-value { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n    .legend-empty { color: #525252; }\n  ';
}
const OVERLAY_INSET_PX = 12, CONTINUATION_PAGE_SAFETY_MARGIN_MM = 10;
function buildPrintPreviewDocument(_0x49ccee, _0x383946) {
  _0x49ccee["title"] = _0x383946["printTitle"] || "Yazdır", _0x49ccee["head"]["appendChild"](buildPageStyle(_0x49ccee, _0x383946));
  const _0xb67d9b = _0x49ccee["createElement"]("div");
  _0xb67d9b["className"] = "print-page";
  if (_0x383946["printTitle"]) _0xb67d9b["appendChild"](buildHeader(_0x49ccee, _0x383946));
  _0xb67d9b["appendChild"](buildImageContainer(_0x49ccee, _0x383946)), _0x49ccee["body"]["appendChild"](_0xb67d9b), appendDatasetsSection(_0x49ccee, _0xb67d9b, _0x383946);
  if (_0x383946["footerText"]) _0xb67d9b["appendChild"](buildFooter(_0x49ccee, _0x383946["footerText"], _0x383946["footerHeightMm"]));
}
function buildDatasetsSectionWrapper(_0x334421) {
  const _0x2264e6 = _0x334421["createElement"]("div");
  return _0x2264e6["className"] = "datasets-section datasets-section-bounded", _0x2264e6["appendChild"](buildDisclaimerBox(_0x334421)), _0x2264e6["appendChild"](buildDatasetsSectionTitle(_0x334421)), _0x2264e6;
}
function buildDatasetsSectionTitleWrapper(_0x32fbd8) {
  const _0x3af4df = _0x32fbd8["createElement"]("div");
  return _0x3af4df["className"] = "datasets-section datasets-section-bounded", _0x3af4df["appendChild"](buildDatasetsSectionTitle(_0x32fbd8)), _0x3af4df;
}
function appendDatasetsSection(_0x231ed1, _0x4c1de8, _0x396157) {
  if (_0x396157["datasetNames"]["length"] === 0) {
    const _0x11028b = buildDatasetsSectionWrapper(_0x231ed1);
    _0x11028b["appendChild"](buildEmptyDatasetsMessage(_0x231ed1)), _0x4c1de8["appendChild"](_0x11028b);
    return;
  }
  const _0x544f07 = _0x231ed1["createElement"]("div");
  _0x544f07["className"] = "datasets-section", _0x544f07["appendChild"](buildDisclaimerBox(_0x231ed1)), _0x4c1de8["appendChild"](_0x544f07);
  const _0xc82634 = _0x396157["pageHeightMm"] - 2 * _0x396157["pageMarginMm"] - CONTINUATION_PAGE_SAFETY_MARGIN_MM, _0x4def84 = computeDatasetsListMaxHeightMm(_0x396157), _0x3401fd = Math["max"](0, _0xc82634 - DATASETS_HEADER_BLOCK_MM);
  if (!_0x396157["showLegend"]) {
    const _0x31ae1a = paginateDatasetNames(_0x396157["datasetNames"], _0x4def84, _0xc82634), _0xa50806 = _0x31ae1a["page1Names"]["length"] === 0 && _0x31ae1a["continuationPages"]["length"] > 0, { page1Names: _0x4202df, continuationPages: _0x3fd4b7 } = _0xa50806 ? paginateDatasetNames(_0x396157["datasetNames"], _0x3401fd, _0xc82634) : _0x31ae1a;
    if (_0xa50806) _0x231ed1["body"]["appendChild"](buildDatasetNameContinuationPage(_0x231ed1, _0x4202df, _0x396157["pageWidthMm"], _0x3401fd, _0x396157["pageMarginMm"], !![]));
    else {
      const _0x506b22 = buildDatasetsSectionTitleWrapper(_0x231ed1);
      _0x506b22["appendChild"](buildDatasetNameList(_0x231ed1, _0x4202df)), _0x4c1de8["appendChild"](_0x506b22);
    }
    for (const _0x371ef1 of _0x3fd4b7) {
      _0x231ed1["body"]["appendChild"](buildDatasetNameContinuationPage(_0x231ed1, _0x371ef1, _0x396157["pageWidthMm"], _0xc82634, _0x396157["pageMarginMm"]));
    }
    return;
  }
  const _0x418bb4 = paginateLegendEntries(_0x396157["legendEntries"], _0x4def84, _0xc82634), _0x182164 = _0x418bb4["page1Entries"]["length"] === 0 && _0x418bb4["continuationPages"]["length"] > 0, { page1Entries: _0x5d3e61, continuationPages: _0x436035 } = _0x182164 ? paginateLegendEntries(_0x396157["legendEntries"], _0x3401fd, _0xc82634) : _0x418bb4;
  if (_0x182164) _0x231ed1["body"]["appendChild"](buildLegendContinuationPage(_0x231ed1, _0x5d3e61, _0x396157["pageWidthMm"], _0x3401fd, _0x396157["pageMarginMm"], !![]));
  else {
    const _0xba497a = buildDatasetsSectionTitleWrapper(_0x231ed1), _0x41e9d5 = buildLegendSection(_0x231ed1, _0x5d3e61);
    if (_0x41e9d5) _0xba497a["appendChild"](_0x41e9d5);
    _0x4c1de8["appendChild"](_0xba497a);
  }
  for (const _0xba95a4 of _0x436035) {
    _0x231ed1["body"]["appendChild"](buildLegendContinuationPage(_0x231ed1, _0xba95a4, _0x396157["pageWidthMm"], _0xc82634, _0x396157["pageMarginMm"]));
  }
}
function buildPreviewToolbar(_0x3aece4, _0x29c0c6) {
  const _0x5e10ad = _0x3aece4["createElement"]("div");
  _0x5e10ad["className"] = "preview-toolbar";
  const _0x191ae8 = _0x3aece4["createElement"]("button");
  _0x191ae8["type"] = "button", _0x191ae8["className"] = "preview-toolbar-btn", _0x191ae8["textContent"] = "Yazdır", _0x191ae8["addEventListener"]("click", _0x29c0c6["onPrint"]);
  const _0x3ffd38 = _0x3aece4["createElement"]("button");
  _0x3ffd38["type"] = "button", _0x3ffd38["className"] = "preview-toolbar-btn", _0x3ffd38["textContent"] = "Kapat", _0x3ffd38["addEventListener"]("click", _0x29c0c6["onClose"]), _0x5e10ad["append"](_0x191ae8, _0x3ffd38), _0x3aece4["body"]["appendChild"](_0x5e10ad);
}
function buildHeader(_0x1243f2, _0xb08385) {
  const _0x527201 = _0x1243f2["createElement"]("div");
  _0x527201["className"] = "print-header";
  const _0x427c5f = _0x1243f2["createElement"]("h1");
  _0x427c5f["textContent"] = _0xb08385["printTitle"];
  const _0x58d62f = _0x1243f2["createElement"]("div");
  return _0x58d62f["className"] = "print-date", _0x58d62f["textContent"] = formatPrintTimestamp(_0xb08385["printDate"]), _0x527201["append"](_0x427c5f, _0x58d62f), _0x527201;
}
function formatPrintTimestamp(_0xf8919e) {
  return _0xf8919e["toLocaleString"]("tr-TR", { "year": "numeric", "month": "2-digit", "day": "2-digit", "hour": "2-digit", "minute": "2-digit" });
}
function computeVisibleImageOffsetPct(_0x36d21b, _0x561008, _0x14e402) {
  const _0x464445 = _0x36d21b / _0x561008;
  if (_0x14e402 > _0x464445) {
    const _0x1853f8 = _0x464445 / _0x14e402;
    return { "offsetXPct": 0, "offsetYPct": (1 - _0x1853f8) / 2 * 100 };
  }
  const _0x129f45 = _0x14e402 / _0x464445;
  return { "offsetXPct": (1 - _0x129f45) / 2 * 100, "offsetYPct": 0 };
}
function buildImageContainer(_0x3da8b1, _0x4db1fa) {
  const _0x1c5c75 = _0x3da8b1["createElement"]("div");
  _0x1c5c75["className"] = "map-frame";
  const _0x3b793c = _0x4db1fa["imageHeightMm"] / _0x4db1fa["imageWidthMm"] * 100;
  _0x1c5c75["style"]["setProperty"]("--frame-aspect-pct", _0x3b793c + "%");
  const _0x40244c = _0x3da8b1["createElement"]("img");
  _0x40244c["src"] = _0x4db1fa["imageBlobUrl"], _0x1c5c75["appendChild"](_0x40244c);
  const { offsetXPct: _0x4a0a5f, offsetYPct: _0x5a6753 } = computeVisibleImageOffsetPct(_0x4db1fa["imageWidthMm"], _0x4db1fa["imageHeightMm"], _0x4db1fa["captureAspectRatio"]);
  return _0x4db1fa["showNorthArrow"] && _0x1c5c75["appendChild"](buildNorthArrow(_0x3da8b1, _0x4db1fa["northArrowRotationDeg"], _0x4a0a5f, _0x5a6753)), _0x4db1fa["showScaleBar"] && _0x4db1fa["scaleRatioLabel"] && _0x1c5c75["appendChild"](buildScaleBar(_0x3da8b1, _0x4db1fa["scaleRatioLabel"], _0x4a0a5f, _0x5a6753)), _0x1c5c75;
}
function buildNorthArrow(_0x2b58a5, _0x2b02ed, _0x56d4e1, _0x46bbde) {
  const _0x3dfa21 = _0x2b58a5["createElement"]("div");
  _0x3dfa21["className"] = "north-arrow", _0x3dfa21["style"]["top"] = "calc(" + _0x46bbde + "% + " + OVERLAY_INSET_PX + "px)", _0x3dfa21["style"]["right"] = "calc(" + _0x56d4e1 + "% + " + OVERLAY_INSET_PX + "px)", _0x3dfa21["style"]["transform"] = "rotate(" + _0x2b02ed + "deg)";
  const _0xbd4261 = _0x2b58a5["createElement"]("img");
  return _0xbd4261["src"] = NORTH_ARROW_DATA_URI, _0xbd4261["alt"] = "Kuzey Oku", _0x3dfa21["appendChild"](_0xbd4261), _0x3dfa21;
}
function buildScaleBar(_0x497246, _0x839b8c, _0x20b021, _0x51a33a) {
  const _0x477cce = _0x497246["createElement"]("div");
  return _0x477cce["className"] = "scale-bar", _0x477cce["style"]["left"] = "calc(" + _0x20b021 + "% + " + OVERLAY_INSET_PX + "px)", _0x477cce["style"]["bottom"] = "calc(" + _0x51a33a + "% + " + OVERLAY_INSET_PX + "px)", _0x477cce["textContent"] = _0x839b8c, _0x477cce;
}
function buildFooter(_0x14d61f, _0x189c18, _0xa4a575) {
  const _0x28f41e = _0x14d61f["createElement"]("div");
  return _0x28f41e["className"] = "print-footer", _0x28f41e["style"]["height"] = _0xa4a575 + "mm", _0x28f41e["style"]["paddingTop"] = "6mm", _0x28f41e["textContent"] = _0x189c18, _0x28f41e;
}
const PREVIEW_WIDTH_PX = 1450, PREVIEW_MAX_HEIGHT_PX = 1e3, PREVIEW_VIEWPORT_WIDTH_RATIO = 0.9, PREVIEW_VIEWPORT_HEIGHT_RATIO = 0.85, PREVIEW_PAGE_GAP_PX = 24, PREVIEW_BODY_PADDING_PX = 24;
class PrintPreviewOverlayController {
  constructor() {
    this["_overlayEl"] = null, this["_iframe"] = null, this["_imageUrl"] = null;
  }
  async ["show"](_0x1d4bac, _0xb56d2a) {
    this["_imageUrl"] = URL["createObjectURL"](_0x1d4bac);
    const _0x2a59a1 = this["_ensureOverlay"]();
    this["_sizeIframe"](_0x2a59a1), await new Promise((_0x342201) => {
      _0x2a59a1["addEventListener"]("load", () => _0x342201(), { "once": !![] }), _0x2a59a1["srcdoc"] = "<!doctype html><html><head></head><body></body></html>";
    });
    const _0x41dd72 = _0x2a59a1["contentDocument"];
    if (!_0x41dd72) return;
    buildPrintPreviewDocument(_0x41dd72, { ..._0xb56d2a, "imageBlobUrl": this["_imageUrl"] }), this["_paginatePreview"](_0x41dd72, _0x2a59a1), buildPreviewToolbar(_0x41dd72, { "onPrint": () => this["_triggerNativePrint"](), "onClose": () => this["close"]() });
  }
  ["close"]() {
    var _a2;
    (_a2 = this["_overlayEl"]) == null ? void 0 : _a2["remove"](), this["_overlayEl"] = null, this["_iframe"] = null, this["_imageUrl"] && (URL["revokeObjectURL"](this["_imageUrl"]), this["_imageUrl"] = null);
  }
  ["_paginatePreview"](_0x534752, _0x28d9e5) {
    const _0x3c43a7 = Array["from"](_0x534752["querySelectorAll"](".print-page, .legend-continuation-page")), _0x32bac2 = _0x3c43a7[0];
    if (!_0x32bac2) return;
    const _0x21c1d5 = _0x32bac2["offsetWidth"], _0x5a6641 = _0x32bac2["offsetHeight"];
    if (_0x21c1d5 === 0 || _0x5a6641 === 0) return;
    const _0x55b69e = 2 * PREVIEW_BODY_PADDING_PX + Math["max"](0, _0x3c43a7["length"] - 1) * PREVIEW_PAGE_GAP_PX, _0x1051c9 = Math["max"](0, _0x28d9e5["clientHeight"] - _0x55b69e), _0x1b9462 = Math["min"](_0x28d9e5["clientWidth"] / _0x21c1d5, _0x1051c9 / _0x5a6641);
    for (const _0x14c6b2 of _0x3c43a7) {
      const _0xdcdffb = _0x534752["createElement"]("div");
      _0xdcdffb["className"] = "print-page-viewport", _0x14c6b2["replaceWith"](_0xdcdffb), _0xdcdffb["appendChild"](_0x14c6b2);
    }
    const _0x439d6a = _0x534752["createElement"]("style");
    _0x439d6a["textContent"] = "\n      @media screen {\n        html, body { background: #e0e0e0; }\n        body { display: flex; flex-direction: column; align-items: center; gap: " + PREVIEW_PAGE_GAP_PX + "px; padding: " + PREVIEW_BODY_PADDING_PX + "px 0; box-sizing: border-box; }\n        .print-page-viewport { width: " + Math["round"](_0x21c1d5 * _0x1b9462) + "px; height: " + Math["round"](_0x5a6641 * _0x1b9462) + "px; overflow: hidden; flex: none; background: #ffffff; box-shadow: 0 2px 8px rgba(0,0,0,0.35); }\n        .print-page, .legend-continuation-page { transform: scale(" + _0x1b9462 + "); transform-origin: top left; }\n      }\n      @media print {\n        html, body { background: none; }\n        body { display: block; padding: 0; }\n        .print-page-viewport { width: auto; height: auto; overflow: visible; background: none; box-shadow: none; }\n        .print-page, .legend-continuation-page { transform: none; }\n      }\n    ", _0x534752["head"]["appendChild"](_0x439d6a);
  }
  ["_triggerNativePrint"]() {
    var _a2, _b;
    (_b = (_a2 = this["_iframe"]) == null ? void 0 : _a2["contentWindow"]) == null ? void 0 : _b["print"]();
  }
  ["_ensureOverlay"]() {
    if (this["_iframe"]) return this["_iframe"];
    const _0x5e38ba = document["createElement"]("div");
    _0x5e38ba["style"]["cssText"] = "position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,0.6);display:flex;align-items:center;justify-content:center;padding:2rem;overflow:auto;";
    const _0x294b31 = document["createElement"]("iframe");
    return _0x294b31["style"]["cssText"] = "background:#fff;border:none;box-shadow:0 4px 16px rgba(0,0,0,0.3);flex:none;", _0x5e38ba["appendChild"](_0x294b31), document["body"]["appendChild"](_0x5e38ba), this["_overlayEl"] = _0x5e38ba, this["_iframe"] = _0x294b31, _0x294b31;
  }
  ["_sizeIframe"](_0x4192b3) {
    const _0x29f743 = Math["min"](window["innerWidth"] * PREVIEW_VIEWPORT_WIDTH_RATIO, PREVIEW_WIDTH_PX), _0x82276e = Math["min"](window["innerHeight"] * PREVIEW_VIEWPORT_HEIGHT_RATIO, PREVIEW_MAX_HEIGHT_PX);
    _0x4192b3["style"]["width"] = Math["round"](_0x29f743) + "px", _0x4192b3["style"]["height"] = Math["round"](_0x82276e) + "px";
  }
}
function calculateScaleRatio(_0x78db00, _0x5f51d4) {
  const _0x45d4aa = Math["round"](_0x78db00 / _0x5f51d4);
  return { "label": "1/" + _0x45d4aa, "denominator": _0x45d4aa };
}
function getVisibleDataLayers(_0xefaf52) {
  return _0xefaf52["filter"]((_0x40a81a) => !_0x40a81a["isBasemap"] && _0x40a81a["cesiumObject"]["show"] !== ![]);
}
function collectVisibleDatasetNames(_0x205d65) {
  return getVisibleDataLayers(_0x205d65)["map"]((_0x5a37e9) => _0x5a37e9["title"]);
}
async function collectPrintLegendEntries(_0x35906f, _0x3b4a4b) {
  const _0x278fea = getVisibleDataLayers(_0x3b4a4b), _0x549735 = await Promise["allSettled"](_0x278fea["map"]((_0x42502b) => resolveLegendEntry(_0x35906f, _0x42502b)));
  return _0x549735["map"]((_0x3b0983, _0x50d925) => _0x3b0983["status"] === "fulfilled" ? _0x3b0983["value"] : buildEmptyEntry(_0x278fea[_0x50d925]["title"], "Lejant yüklenemedi."));
}
async function resolveLegendEntry(_0x176d1b, _0x487ef2) {
  var _a2;
  if (_0x487ef2["layerType"] === "WMS") return buildImageEntry(_0x487ef2["title"], _0x176d1b["getWmsLegendGraphicUrl"](_0x487ef2["id"]));
  if (_0x487ef2["layerType"] === "WMTS") {
    const _0x46ee20 = await _0x176d1b["getWmtsAvailableStyles"](_0x487ef2["id"]), _0x4df507 = (_a2 = _0x46ee20[0]) == null ? void 0 : _a2["legendUrl"];
    return _0x4df507 ? buildImageEntry(_0x487ef2["title"], _0x4df507) : buildEmptyEntry(_0x487ef2["title"], "Lejant bulunamadı.");
  }
  return buildVectorEntry(_0x487ef2["title"], _0x176d1b["getLayerStyle"](_0x487ef2["id"]));
}
function buildImageEntry(_0x53ab91, _0x4cc545) {
  return { "layerTitle": _0x53ab91, "kind": "image", "imageUrl": _0x4cc545 };
}
function buildEmptyEntry(_0x116663, _0x42a6b4) {
  return { "layerTitle": _0x116663, "kind": "empty", "message": _0x42a6b4 };
}
function buildVectorEntry(_0x57f383, _0x2670b5) {
  if (!_0x2670b5) return buildEmptyEntry(_0x57f383, "Henüz stil uygulanmadı.");
  switch (_0x2670b5["fill"]["mode"]) {
    case "gradient":
      return buildGradientEntry(_0x57f383, _0x2670b5["fill"]["column"], _0x2670b5["fill"]["palette"], _0x2670b5["fill"]["paletteKind"], _0x2670b5["fill"]["min"], _0x2670b5["fill"]["max"]);
    case "bin":
      return buildBinEntry(_0x57f383, _0x2670b5["fill"]["column"], _0x2670b5["fill"]["palette"], _0x2670b5["fill"]["paletteKind"], _0x2670b5["fill"]["min"], _0x2670b5["fill"]["max"], _0x2670b5["fill"]["binCount"]);
    case "enum":
      return buildEnumEntry(_0x57f383, _0x2670b5["fill"]["column"], _0x2670b5["fill"]["colors"]);
    case "solid":
    case "off":
    default:
      return buildEmptyEntry(_0x57f383, "Bu katman sabit renkli, lejant gerekmiyor.");
  }
}
function buildGradientEntry(_0xb4b422, _0x545dc5, _0x53d145, _0x48c95c, _0x14518d, _0x101608) {
  if (_0x14518d === void 0 || _0x101608 === void 0) return buildEmptyEntry(_0xb4b422, "Aralık hesaplanamadı.");
  const _0x4bc731 = gradientLegendRows(_0x14518d, _0x101608, (_0x207542) => sampleFromPaletteCss(_0x53d145, _0x207542, _0x48c95c));
  return { "layerTitle": _0xb4b422, "kind": "gradient", "rows": _0x4bc731, "displayColumn": _0x545dc5 };
}
function buildBinEntry(_0x5d15bf, _0x3b40b8, _0x2b42bc, _0x2fac21, _0x2734ae, _0x504f2d, _0x527e7f) {
  if (_0x2734ae === void 0 || _0x504f2d === void 0) return buildEmptyEntry(_0x5d15bf, "Aralık hesaplanamadı.");
  const _0x19d0d8 = binLegendRows(_0x2734ae, _0x504f2d, _0x527e7f, (_0x23a2f0) => sampleFromPaletteCss(_0x2b42bc, _0x23a2f0, _0x2fac21));
  return { "layerTitle": _0x5d15bf, "kind": "bin", "rows": _0x19d0d8, "displayColumn": _0x3b40b8 };
}
function buildEnumEntry(_0xc7f12d, _0x56b094, _0x582846) {
  const _0x412653 = Object["entries"](_0x582846);
  if (_0x412653["length"] === 0) return buildEmptyEntry(_0xc7f12d, "Kategori bulunamadı.");
  const _0x56badf = [..._0x412653]["sort"](([_0x1b4a02], [_0x45ebe2]) => compareCategoryKeys(_0x1b4a02, _0x45ebe2));
  return { "layerTitle": _0xc7f12d, "kind": "enum", "rows": _0x56badf["map"](([_0x59921c, _0x365de3]) => ({ "color": _0x365de3, "label": _0x59921c })), "displayColumn": _0x56b094 };
}
const MM_PER_INCH = 25.4, SCREEN_DPI = 96, SCREEN_METERS_PER_PIXEL = MM_PER_INCH / SCREEN_DPI / 1e3, PAGE_MARGIN_MM = 8, HEADER_BLOCK_HEIGHT_MM = 14, FOOTER_BLOCK_HEIGHT_MM = 12, IMAGE_TOP_HALF_RATIO = 0.5;
async function buildPrintPreviewInput(_0x1bb867) {
  const { map: _0x2d29d2, pageDims: _0x20d097 } = _0x1bb867, _0x249212 = _0x1bb867["printTitle"] ? HEADER_BLOCK_HEIGHT_MM : 0, _0xacd0ab = _0x1bb867["footerText"] ? FOOTER_BLOCK_HEIGHT_MM : 0, _0x945f9e = computeImageContentDimensionsMm(_0x20d097, _0x249212, _0xacd0ab), _0x2c4f7f = computeScaleRatioLabel(_0x2d29d2, _0x1bb867["showScaleBar"]), _0x4f4dc3 = _0x2d29d2["viewer"]["canvas"], _0x50623e = _0x4f4dc3["clientHeight"] > 0 ? _0x4f4dc3["clientWidth"] / _0x4f4dc3["clientHeight"] : 1, _0x535fa3 = -((_0x2d29d2["viewer"]["camera"]["heading"] ?? 0) * 180) / Math["PI"], _0x502ae3 = collectVisibleDatasetNames(_0x2d29d2["layerManager"]["getLayers"]()), _0x420611 = await resolvePrintLegendEntries(_0x2d29d2, _0x1bb867["showLegend"]);
  return { "imageWidthMm": _0x945f9e["contentWidthMm"], "imageHeightMm": _0x945f9e["contentHeightMm"], "captureAspectRatio": _0x50623e, "printTitle": _0x1bb867["printTitle"], "printDate": /* @__PURE__ */ new Date(), "footerText": _0x1bb867["footerText"], "showNorthArrow": _0x1bb867["showNorthArrow"], "northArrowRotationDeg": _0x535fa3, "showScaleBar": _0x1bb867["showScaleBar"], "scaleRatioLabel": _0x2c4f7f, "pageWidthMm": _0x20d097["widthMm"], "pageHeightMm": _0x20d097["heightMm"], "pageMarginMm": PAGE_MARGIN_MM, "headerHeightMm": _0x249212, "footerHeightMm": _0xacd0ab, "showLegend": _0x1bb867["showLegend"], "datasetNames": _0x502ae3, "legendEntries": _0x420611 };
}
async function resolvePrintLegendEntries(_0x3c148c, _0x36ac7c) {
  if (!_0x36ac7c) return [];
  const _0x5e35b6 = _0x3c148c["layerManager"];
  return collectPrintLegendEntries(_0x5e35b6, _0x5e35b6["getLayers"]());
}
function computeImageContentDimensionsMm(_0x517b57, _0x570682, _0x44fbbd) {
  const _0x3c3360 = _0x517b57["heightMm"] - 2 * PAGE_MARGIN_MM - _0x570682 - _0x44fbbd, _0x37f500 = _0x517b57["heightMm"] * IMAGE_TOP_HALF_RATIO;
  return { "contentWidthMm": _0x517b57["widthMm"] - 2 * PAGE_MARGIN_MM, "contentHeightMm": Math["min"](_0x3c3360, _0x37f500) };
}
function computeScaleRatioLabel(_0x3ad011, _0x31fc6f) {
  if (!_0x31fc6f) return null;
  const _0x469f4d = _0x3ad011["measureGroundMetersPerPixel"]();
  return _0x469f4d !== null ? calculateScaleRatio(_0x469f4d, SCREEN_METERS_PER_PIXEL)["label"] : null;
}
const PAPER_SIZES_MM = { "a0": { "widthMm": 841, "heightMm": 1189, "label": "A0" }, "a1": { "widthMm": 594, "heightMm": 841, "label": "A1" }, "a2": { "widthMm": 420, "heightMm": 594, "label": "A2" }, "a3": { "widthMm": 297, "heightMm": 420, "label": "A3" }, "a4": { "widthMm": 210, "heightMm": 297, "label": "A4" }, "a5": { "widthMm": 148, "heightMm": 210, "label": "A5" } }, ORIENTATION_LABELS = { "landscape": "Yatay", "portrait": "Dikey" };
function getPageDimensionsMm(_0x99cd33, _0xc5b9f2) {
  const _0x1814a0 = PAPER_SIZES_MM[_0x99cd33];
  return _0xc5b9f2 === "landscape" ? { "widthMm": _0x1814a0["heightMm"], "heightMm": _0x1814a0["widthMm"] } : { "widthMm": _0x1814a0["widthMm"], "heightMm": _0x1814a0["heightMm"] };
}
var __defProp$g = Object["defineProperty"], __getOwnPropDesc$h = Object["getOwnPropertyDescriptor"], __decorateClass$h = (_0x5985a7, _0x56408e, _0x49682d, _0x29d809) => {
  var _0x2eaaa5 = _0x29d809 > 1 ? void 0 : _0x29d809 ? __getOwnPropDesc$h(_0x56408e, _0x49682d) : _0x56408e;
  for (var _0x3bca01 = _0x5985a7["length"] - 1, _0x6afb72; _0x3bca01 >= 0; _0x3bca01--) if (_0x6afb72 = _0x5985a7[_0x3bca01]) _0x2eaaa5 = (_0x29d809 ? _0x6afb72(_0x56408e, _0x49682d, _0x2eaaa5) : _0x6afb72(_0x2eaaa5)) || _0x2eaaa5;
  if (_0x29d809 && _0x2eaaa5) __defProp$g(_0x56408e, _0x49682d, _0x2eaaa5);
  return _0x2eaaa5;
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
              @change=${(_0xbe359b) => {
      var _a2;
      return (_a2 = this["onPaperSizeChange"]) == null ? void 0 : _a2.call(this, _0xbe359b["target"]["value"]);
    }}
            >
              ${Object["entries"](PAPER_SIZES_MM)["map"](([_0x52fe09, _0x166bd2]) => b`<option value=${_0x52fe09} ?selected=${_0x52fe09 === this["paperSize"]}>${_0x166bd2["label"]}</option>`)}
            </select>
          </label>
          <label class="field">
            Yön
            <select
              @change=${(_0x51393c) => {
      var _a2;
      return (_a2 = this["onOrientationChange"]) == null ? void 0 : _a2.call(this, _0x51393c["target"]["value"]);
    }}
            >
              ${Object["entries"](ORIENTATION_LABELS)["map"](([_0x33c644, _0x3b8067]) => b`<option value=${_0x33c644} ?selected=${_0x33c644 === this["orientation"]}>${_0x3b8067}</option>`)}
            </select>
          </label>
        </div>
        ${this["showNorthArrowCheckbox"] ? b`<label class="checkbox-row">
              <input
                type="checkbox"
                .checked=${this["showNorthArrow"]}
                @change=${(_0x29d520) => {
      var _a2;
      return (_a2 = this["onNorthArrowToggle"]) == null ? void 0 : _a2.call(this, _0x29d520["target"]["checked"]);
    }}
              />
              Kuzey Oku Göster
            </label>` : ""}
        ${this["showScaleBarCheckbox"] ? b`<label class="checkbox-row">
              <input
                type="checkbox"
                .checked=${this["showScaleBar"]}
                @change=${(_0x23406d) => {
      var _a2;
      return (_a2 = this["onScaleBarToggle"]) == null ? void 0 : _a2.call(this, _0x23406d["target"]["checked"]);
    }}
              />
              Ölçek Oranı Göster
            </label>` : ""}
        ${this["showLegendCheckbox"] ? b`<label class="checkbox-row">
              <input
                type="checkbox"
                .checked=${this["showLegend"]}
                @change=${(_0x1dc9d6) => {
      var _a2;
      return (_a2 = this["onLegendToggle"]) == null ? void 0 : _a2.call(this, _0x1dc9d6["target"]["checked"]);
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
var __defProp$f = Object["defineProperty"], __getOwnPropDesc$g = Object["getOwnPropertyDescriptor"], __decorateClass$g = (_0x3d4f74, _0x21ba5b, _0x5495b2, _0x283d99) => {
  var _0x487435 = _0x283d99 > 1 ? void 0 : _0x283d99 ? __getOwnPropDesc$g(_0x21ba5b, _0x5495b2) : _0x21ba5b;
  for (var _0x36f01b = _0x3d4f74["length"] - 1, _0x309b4a; _0x36f01b >= 0; _0x36f01b--) if (_0x309b4a = _0x3d4f74[_0x36f01b]) _0x487435 = (_0x283d99 ? _0x309b4a(_0x21ba5b, _0x5495b2, _0x487435) : _0x309b4a(_0x487435)) || _0x487435;
  if (_0x283d99 && _0x487435) __defProp$f(_0x21ba5b, _0x5495b2, _0x487435);
  return _0x487435;
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
    const _0x441b36 = document["createElement"]("tucbs-slide-over-panel");
    _0x441b36["panelTitle"] = "Yazdır", _0x441b36["panelWidth"] = this["panelWidth"], _0x441b36["scrollBody"] = ![], _0x441b36["onCloseRequest"] = () => this["_toggle"](), document["body"]["appendChild"](_0x441b36), this["_panelEl"] = _0x441b36, this["_renderIntoPanel"]();
  }
  ["disconnectedCallback"]() {
    var _a2;
    if (this["map"]) this["_layoutController"]["unbindMap"](this["map"]);
    (_a2 = this["_panelEl"]) == null ? void 0 : _a2["remove"](), this["_panelEl"] = null, this["_previewController"]["close"](), super["disconnectedCallback"]();
  }
  ["firstUpdated"]() {
    bindMapByElementId(this, { "noIdTiming": "sync", ...standardMapBindingMessages("tucbs-print-tool", "islevsiz") });
  }
  ["updated"](_0x24fd97) {
    _0x24fd97["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_customCssState"], "tucbs-print-tool");
    if (_0x24fd97["has"]("map")) {
      const _0x4a7c24 = _0x24fd97["get"]("map");
      if (_0x4a7c24) this["_layoutController"]["unbindMap"](_0x4a7c24);
      if (this["map"]) this["_layoutController"]["bindMap"](this["map"]);
    }
    if (_0x24fd97["has"]("panelWidth") && this["_open"]) this["_layoutController"]["setOpen"](!![], this["panelWidth"]);
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
    const _0x3a6f2e = await this["map"]["captureScreenshotBlob"](), _0xdbe48 = await buildPrintPreviewInput({ "map": this["map"], "pageDims": getPageDimensionsMm(this["_selectedPaperSize"], this["_selectedOrientation"]), "printTitle": this["printTitle"], "footerText": this["footerText"], "showNorthArrow": this["_showNorthArrow"], "showScaleBar": this["_showScaleBar"], "showLegend": this["_showLegend"] });
    await this["_previewController"]["show"](_0x3a6f2e, _0xdbe48);
  }
  ["_onPaperSizeChange"](_0x18fc67) {
    this["_selectedPaperSize"] = _0x18fc67;
  }
  ["_onOrientationChange"](_0x2cd3f7) {
    this["_selectedOrientation"] = _0x2cd3f7;
  }
  ["_onNorthArrowToggle"](_0x351759) {
    this["_showNorthArrow"] = _0x351759;
  }
  ["_onScaleBarToggle"](_0x2a49ac) {
    this["_showScaleBar"] = _0x2a49ac;
  }
  ["_onLegendToggle"](_0x2bb6fa) {
    this["_showLegend"] = _0x2bb6fa;
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
          .onPaperSizeChange=${(_0x3bb8d9) => this["_onPaperSizeChange"](_0x3bb8d9)}
          .onOrientationChange=${(_0x31798e) => this["_onOrientationChange"](_0x31798e)}
          .onNorthArrowToggle=${(_0x55d3e9) => this["_onNorthArrowToggle"](_0x55d3e9)}
          .onScaleBarToggle=${(_0x581608) => this["_onScaleBarToggle"](_0x581608)}
          .onLegendToggle=${(_0x500f20) => this["_onLegendToggle"](_0x500f20)}
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
function renderAnalysisHelp(_0x42c1b8, _0x359928, _0x4381fd, _0x26d47c) {
  if (!_0x42c1b8) return null;
  const _0x459d2e = (_0x316cfd) => _0x316cfd["stopPropagation"]();
  return b`
    <div class="help-back" @click=${_0x26d47c}>
      <div class="help-card" @click=${_0x459d2e}>
        <button type="button" class="help-close" aria-label="Kapat" @click=${_0x26d47c}>×</button>
        <h3>${_0x359928}</h3>
        <h4>Ne işe yarar</h4>
        ${_0x4381fd["ne"]["map"]((_0x348bdb) => b`<p>${_0x348bdb}</p>`)}
        <h4>Girdiler</h4>
        <ul>${_0x4381fd["girdiler"]["map"]((_0x5eeec3) => b`<li>${_0x5eeec3}</li>`)}</ul>
        <h4>Adımlar</h4>
        <ol>${_0x4381fd["adimlar"]["map"]((_0x1fb620) => b`<li>${_0x1fb620}</li>`)}</ol>
        <h4>Örnek</h4>
        <ol>${_0x4381fd["ornek"]["map"]((_0x5cde64) => b`<li>${_0x5cde64}</li>`)}</ol>
      </div>
    </div>
  `;
}
var __defProp$e = Object["defineProperty"], __getOwnPropDesc$f = Object["getOwnPropertyDescriptor"], __decorateClass$f = (_0x15725d, _0x576d9f, _0x39d607, _0x3c067d) => {
  var _0x6543d8 = _0x3c067d > 1 ? void 0 : _0x3c067d ? __getOwnPropDesc$f(_0x576d9f, _0x39d607) : _0x576d9f;
  for (var _0x4f19fd = _0x15725d["length"] - 1, _0x5a992f; _0x4f19fd >= 0; _0x4f19fd--) if (_0x5a992f = _0x15725d[_0x4f19fd]) _0x6543d8 = (_0x3c067d ? _0x5a992f(_0x576d9f, _0x39d607, _0x6543d8) : _0x5a992f(_0x6543d8)) || _0x6543d8;
  if (_0x3c067d && _0x6543d8) __defProp$e(_0x576d9f, _0x39d607, _0x6543d8);
  return _0x6543d8;
};
let TucbsBufferTool = class extends i$2 {
  constructor() {
    super(...arguments), this["mapElementId"] = "", this["map"] = null, this["selectedLabel"] = "", this["distanceM"] = null, this["customCss"] = "", this["_distanceStr"] = "", this["_status"] = "idle", this["_message"] = "", this["_helpOpen"] = ![], this["_selectedFeature"] = null, this["_map"] = null, this["_mapHost"] = null, this["_customCssState"] = { "sheet": null }, this["_onEntityClick"] = (_0x1ccf4b) => {
      const _0x50ea57 = entityToGeoJSON(_0x1ccf4b["entity"]);
      if (!_0x50ea57) {
        this["_note"]("error", "Seçilen özellikten GeoJSON üretilemedi.");
        return;
      }
      this["_selectedFeature"] = { "type": "Feature", "id": _0x50ea57["id"], "properties": _0x50ea57["properties"] ?? {}, "geometry": _0x50ea57["geometry"] }, this["selectedLabel"] = featureLabel(_0x50ea57), this["_status"] = "idle", this["_message"] = "", this["_syncHighlight"]();
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
  ["updated"](_0x54a05a) {
    _0x54a05a["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_customCssState"], "tucbs-buffer-tool"), _0x54a05a["has"]("distanceM") && this["distanceM"] != null && (this["_distanceStr"] = String(this["distanceM"])), (_0x54a05a["has"]("mapElementId") || _0x54a05a["has"]("map")) && (this["_unbindMap"](), this["_bindMap"]());
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
    const _0x1fa0cb = this["_resolveMapHost"]();
    if (!_0x1fa0cb) return;
    this["_mapHost"] = _0x1fa0cb;
    if (_0x1fa0cb["map"]) {
      this["_attachInteraction"](_0x1fa0cb["map"]);
      return;
    }
    _0x1fa0cb["addEventListener"]("ready", this["_onMapReady"], { "once": !![] });
  }
  ["_attachInteraction"](_0x22b3f2) {
    if (this["_map"] === _0x22b3f2) return;
    this["_map"] && (this["_map"]["interactionManager"]["off"]("entity:click", this["_onEntityClick"]), this["_map"]["interactionManager"]["resumeIdentify"]()), this["_map"] = _0x22b3f2, _0x22b3f2["interactionManager"]["on"]("entity:click", this["_onEntityClick"]), _0x22b3f2["interactionManager"]["suspendIdentify"]();
  }
  ["_unbindMap"]() {
    this["_map"] && (this["_map"]["interactionManager"]["off"]("entity:click", this["_onEntityClick"]), this["_map"]["clearSelectionHighlight"](), this["_map"]["interactionManager"]["resumeIdentify"](), this["_map"] = null), this["_mapHost"] && (this["_mapHost"]["removeEventListener"]("ready", this["_onMapReady"]), this["_mapHost"] = null);
  }
  ["_onDistanceInput"](_0x5c2d72) {
    const _0xbe1228 = _0x5c2d72["target"]["value"];
    this["_distanceStr"] = _0xbe1228;
    const _0x821242 = Number(_0xbe1228);
    this["distanceM"] = Number["isFinite"](_0x821242) ? _0x821242 : null;
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
    const _0x18b719 = Number(this["_distanceStr"]);
    if (!this["_selectedFeature"]) {
      this["_note"]("error", "Lütfen haritada bir nesne seçin.");
      return;
    }
    if (!this["_distanceStr"] || Number["isNaN"](_0x18b719) || _0x18b719 <= 0) {
      this["_note"]("error", "Geçerli bir mesafe (metre) girin.");
      return;
    }
    !this["_map"] && this["_bindMap"]();
    const _0x12ac64 = this["_resolveMap"]();
    if (!_0x12ac64) {
      this["_note"]("error", "Harita henüz hazır değil.");
      return;
    }
    this["_map"] = _0x12ac64, this["distanceM"] = _0x18b719, this["_status"] = "loading", this["_message"] = "İşleniyor…", this["dispatchEvent"](new CustomEvent("tucbs-buffer-run", { "detail": { "mapElementId": this["mapElementId"], "distanceM": _0x18b719, "selectedLabel": this["selectedLabel"] }, "bubbles": !![], "composed": !![] }));
    try {
      const _0x32148f = "Tampon sonucu (" + _0x18b719 + "m)";
      await _0x12ac64["runBuffer"]({ "geojson": this["_selectedFeature"], "distanceM": _0x18b719 }, { "title": _0x32148f }), this["_clearForm"](), this["_status"] = "idle", this["_message"] = "", showToast("success", "Tampon katmanı eklendi.");
    } catch (_0x2e831c) {
      _0x2e831c instanceof TucbsError && console["error"]("[tucbs-buffer-tool] " + _0x2e831c["code"] + " (" + _0x2e831c["number"] + "): " + _0x2e831c["message"]), this["_note"]("error", _0x2e831c instanceof Error ? _0x2e831c["message"] : "Tampon üretimi başarısız.");
    }
  }
  ["_note"](_0x4220dd, _0x405e44) {
    this["_status"] = "idle", this["_message"] = "", showToast(_0x4220dd, _0x405e44);
  }
  ["render"]() {
    const _0x5f57d7 = this["_status"] === "loading", _0x533abd = Boolean(this["_selectedFeature"] && this["_distanceStr"]) && !_0x5f57d7;
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
            ?disabled=${_0x5f57d7}
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
            ?disabled=${_0x5f57d7}
            @input=${this["_onDistanceInput"]}
          />
          <span class="unit">m</span>
        </div>

        <div class="actions">
          <button class="run" type="button" ?disabled=${!_0x533abd} @click=${this["_onRun"]}>
            ${_0x5f57d7 ? "İşleniyor..." : "Çalıştır"}
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
var __defProp$d = Object["defineProperty"], __getOwnPropDesc$e = Object["getOwnPropertyDescriptor"], __decorateClass$e = (_0x2ecc85, _0x528f32, _0x59b3e6, _0x58a521) => {
  var _0x334569 = _0x58a521 > 1 ? void 0 : _0x58a521 ? __getOwnPropDesc$e(_0x528f32, _0x59b3e6) : _0x528f32;
  for (var _0x455ba0 = _0x2ecc85["length"] - 1, _0x249bf0; _0x455ba0 >= 0; _0x455ba0--) if (_0x249bf0 = _0x2ecc85[_0x455ba0]) _0x334569 = (_0x58a521 ? _0x249bf0(_0x528f32, _0x59b3e6, _0x334569) : _0x249bf0(_0x334569)) || _0x334569;
  if (_0x58a521 && _0x334569) __defProp$d(_0x528f32, _0x59b3e6, _0x334569);
  return _0x334569;
};
function isPolygonFeature$1(_0x375193) {
  var _a2;
  const _0xced93e = (_a2 = _0x375193 == null ? void 0 : _0x375193["geometry"]) == null ? void 0 : _a2["type"];
  return _0xced93e === "Polygon" || _0xced93e === "MultiPolygon";
}
let TucbsIntersectionTool = class extends i$2 {
  constructor() {
    super(...arguments), this["mapElementId"] = "", this["map"] = null, this["customCss"] = "", this["_labelA"] = "", this["_labelB"] = "", this["_status"] = "idle", this["_message"] = "", this["_helpOpen"] = ![], this["_featureA"] = null, this["_featureB"] = null, this["_pendingSlot"] = null, this["_map"] = null, this["_mapHost"] = null, this["_customCssState"] = { "sheet": null }, this["_onEntityClick"] = (_0x27dae4) => {
      var _a2;
      if (!this["_pendingSlot"]) return;
      const _0x2bb869 = entityToGeoJSON(_0x27dae4["entity"]);
      if (!_0x2bb869) {
        this["_note"]("error", "Seçilen özellikten GeoJSON üretilemedi.");
        return;
      }
      const _0x2a3e1d = { "type": "Feature", "id": _0x2bb869["id"], "properties": _0x2bb869["properties"] ?? {}, "geometry": _0x2bb869["geometry"] }, _0x43f768 = (_a2 = _0x2a3e1d["geometry"]) == null ? void 0 : _a2["type"];
      if (_0x43f768 !== "Polygon" && _0x43f768 !== "MultiPolygon") {
        this["_note"]("error", "Kesişim için yalnızca poligon seçin.");
        return;
      }
      const _0x1bec27 = featureLabel(_0x2bb869);
      this["_pendingSlot"] === "a" ? (this["_featureA"] = _0x2a3e1d, this["_labelA"] = _0x1bec27) : (this["_featureB"] = _0x2a3e1d, this["_labelB"] = _0x1bec27), this["_pendingSlot"] = null, this["_status"] = "idle", this["_message"] = "", this["_syncHighlight"]();
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
  ["updated"](_0x50a7b3) {
    _0x50a7b3["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_customCssState"], "tucbs-intersection-tool"), (_0x50a7b3["has"]("mapElementId") || _0x50a7b3["has"]("map")) && (this["_unbindMap"](), this["_bindMap"]());
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
    const _0xd76be4 = this["_resolveMapHost"]();
    if (!_0xd76be4) return;
    this["_mapHost"] = _0xd76be4;
    if (_0xd76be4["map"]) {
      this["_attachInteraction"](_0xd76be4["map"]);
      return;
    }
    _0xd76be4["addEventListener"]("ready", this["_onMapReady"], { "once": !![] });
  }
  ["_attachInteraction"](_0x43f0f6) {
    if (this["_map"] === _0x43f0f6) return;
    this["_map"] && (this["_map"]["interactionManager"]["off"]("entity:click", this["_onEntityClick"]), this["_map"]["interactionManager"]["resumeIdentify"]()), this["_map"] = _0x43f0f6, _0x43f0f6["interactionManager"]["on"]("entity:click", this["_onEntityClick"]), _0x43f0f6["interactionManager"]["suspendIdentify"]();
  }
  ["_unbindMap"]() {
    this["_map"] && (this["_map"]["interactionManager"]["off"]("entity:click", this["_onEntityClick"]), this["_map"]["clearSelectionHighlight"](), this["_map"]["interactionManager"]["resumeIdentify"](), this["_map"] = null), this["_mapHost"] && (this["_mapHost"]["removeEventListener"]("ready", this["_onMapReady"]), this["_mapHost"] = null);
  }
  ["_note"](_0x2a25c6, _0x418b90) {
    this["_status"] = "idle", this["_message"] = "", showToast(_0x2a25c6, _0x418b90);
  }
  ["_beginSelection"](_0x14ce65) {
    this["_pendingSlot"] = _0x14ce65, this["_status"] = "idle", this["_note"]("info", _0x14ce65 === "a" ? "Lütfen ilk poligonu seçin — haritada bir alana tıklayın." : "Lütfen ikinci poligonu seçin — haritada bir alana tıklayın.");
  }
  ["_onInputClick"](_0x572cc2) {
    this["_beginSelection"](_0x572cc2);
  }
  ["_onRefreshSlot"](_0x5208d3) {
    _0x5208d3 === "a" ? (this["_featureA"] = null, this["_labelA"] = "") : (this["_featureB"] = null, this["_labelB"] = ""), this["_beginSelection"](_0x5208d3), this["_syncHighlight"]();
  }
  ["_clearForm"]() {
    this["_featureA"] = null, this["_featureB"] = null, this["_labelA"] = "", this["_labelB"] = "", this["_pendingSlot"] = null, this["_syncHighlight"]();
  }
  ["_syncHighlight"]() {
    var _a2;
    const _0x5dd193 = [this["_featureA"], this["_featureB"]]["filter"]((_0x1aaada) => _0x1aaada !== null);
    (_a2 = this["_map"]) == null ? void 0 : _a2["showSelectionHighlight"](_0x5dd193);
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
    const _0x3dca2f = this["_resolveMap"]();
    if (!_0x3dca2f) {
      this["_note"]("error", "Harita henüz hazır değil.");
      return;
    }
    this["_map"] = _0x3dca2f, this["_status"] = "loading", this["_message"] = "İşleniyor…", this["_pendingSlot"] = null, this["dispatchEvent"](new CustomEvent("tucbs-intersection-run", { "detail": { "mapElementId": this["mapElementId"], "labelA": this["_labelA"], "labelB": this["_labelB"] }, "bubbles": !![], "composed": !![] }));
    try {
      await _0x3dca2f["runIntersection"]({ "geojsonA": this["_featureA"], "geojsonB": this["_featureB"] }, { "title": "Kesişim sonucu" }), this["_clearForm"](), this["_status"] = "idle", this["_message"] = "", showToast("success", "Kesişim tamamlandı.");
    } catch (_0x7ef775) {
      _0x7ef775 instanceof TucbsError && console["error"]("[tucbs-intersection-tool] " + _0x7ef775["code"] + " (" + _0x7ef775["number"] + "): " + _0x7ef775["message"]), this["_note"]("error", _0x7ef775 instanceof Error ? _0x7ef775["message"] : "Kesişim hesaplanamadı.");
    }
  }
  ["render"]() {
    const _0x2898cc = this["_status"] === "loading", _0x376236 = isPolygonFeature$1(this["_featureA"]) && isPolygonFeature$1(this["_featureB"]) && !_0x2898cc;
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
            ?disabled=${_0x2898cc}
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
            ?disabled=${_0x2898cc}
            @click=${() => this["_onInputClick"]("a")}
          />
          <button
            type="button"
            class="refresh"
            title="Yeniden seç"
            ?disabled=${_0x2898cc}
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
            ?disabled=${_0x2898cc}
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
            ?disabled=${_0x2898cc}
            @click=${() => this["_onInputClick"]("b")}
          />
          <button
            type="button"
            class="refresh"
            title="Yeniden seç"
            ?disabled=${_0x2898cc}
            @click=${() => this["_onRefreshSlot"]("b")}
          >
            ⟳
          </button>
        </div>

        <div class="actions">
          <button class="run" type="button" ?disabled=${!_0x376236} @click=${this["_onRun"]}>
            ${_0x2898cc ? "İşleniyor..." : "Çalıştır"}
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
  constructor(_0x1ed762, _0x1a7e24, _0x703ea0) {
    this["resolve"] = _0x1ed762, this["onPick"] = _0x1a7e24, this["onBadGeoJson"] = _0x703ea0, this["map"] = null, this["host"] = null, this["onReady"] = () => {
      this["attach"]();
    }, this["onClick"] = (_0x1daaf1) => {
      const _0x27ab1c = entityToGeoJSON(_0x1daaf1["entity"]);
      if (!_0x27ab1c) {
        this["onBadGeoJson"]();
        return;
      }
      this["onPick"]({ "type": "Feature", "id": _0x27ab1c["id"], "properties": _0x27ab1c["properties"] ?? {}, "geometry": _0x27ab1c["geometry"] }, featureLabel(_0x27ab1c));
    };
  }
  ["attach"]() {
    const { map: _0x264d7f, mapElementId: _0x1f8a0e } = this["resolve"]();
    if (_0x264d7f) {
      this["listen"](_0x264d7f);
      return;
    }
    if (!_0x1f8a0e) return;
    const _0x3e23a6 = document["getElementById"](_0x1f8a0e);
    if (!_0x3e23a6) return;
    this["host"] = _0x3e23a6;
    if (_0x3e23a6["map"]) {
      this["listen"](_0x3e23a6["map"]);
      return;
    }
    _0x3e23a6["addEventListener"]("ready", this["onReady"], { "once": !![] });
  }
  ["detach"]() {
    this["map"] && (this["map"]["interactionManager"]["off"]("entity:click", this["onClick"]), this["map"]["clearSelectionHighlight"](), this["map"]["interactionManager"]["resumeIdentify"](), this["map"] = null), this["host"] && (this["host"]["removeEventListener"]("ready", this["onReady"]), this["host"] = null);
  }
  ["current"]() {
    return this["map"] ?? this["resolve"]()["map"];
  }
  ["highlight"](_0x2cb030) {
    var _a2;
    (_a2 = this["map"]) == null ? void 0 : _a2["showSelectionHighlight"](_0x2cb030);
  }
  ["listen"](_0x1b4d09) {
    if (this["map"] === _0x1b4d09) return;
    this["map"] && (this["map"]["interactionManager"]["off"]("entity:click", this["onClick"]), this["map"]["interactionManager"]["resumeIdentify"]()), this["map"] = _0x1b4d09, _0x1b4d09["interactionManager"]["on"]("entity:click", this["onClick"]), _0x1b4d09["interactionManager"]["suspendIdentify"]();
  }
}
function isPolygonFeature(_0x30f07d) {
  var _a2;
  const _0x33e030 = (_a2 = _0x30f07d == null ? void 0 : _0x30f07d["geometry"]) == null ? void 0 : _a2["type"];
  return _0x33e030 === "Polygon" || _0x33e030 === "MultiPolygon";
}
function isPointFeature(_0x2e7ed2) {
  var _a2;
  const _0x42641f = (_a2 = _0x2e7ed2 == null ? void 0 : _0x2e7ed2["geometry"]) == null ? void 0 : _a2["type"];
  return _0x42641f === "Point" || _0x42641f === "MultiPoint";
}
var __defProp$c = Object["defineProperty"], __getOwnPropDesc$d = Object["getOwnPropertyDescriptor"], __decorateClass$d = (_0x392e56, _0x3321eb, _0x18e4ad, _0x419db7) => {
  var _0x2a2cc3 = _0x419db7 > 1 ? void 0 : _0x419db7 ? __getOwnPropDesc$d(_0x3321eb, _0x18e4ad) : _0x3321eb;
  for (var _0x1d7ece = _0x392e56["length"] - 1, _0x5d5a13; _0x1d7ece >= 0; _0x1d7ece--) if (_0x5d5a13 = _0x392e56[_0x1d7ece]) _0x2a2cc3 = (_0x419db7 ? _0x5d5a13(_0x3321eb, _0x18e4ad, _0x2a2cc3) : _0x5d5a13(_0x2a2cc3)) || _0x2a2cc3;
  if (_0x419db7 && _0x2a2cc3) __defProp$c(_0x3321eb, _0x18e4ad, _0x2a2cc3);
  return _0x2a2cc3;
};
let TucbsBoundaryTool = class extends i$2 {
  constructor() {
    super(...arguments), this["mapElementId"] = "", this["map"] = null, this["customCss"] = "", this["_label"] = "", this["_boundaryType"] = "bbox", this["_output"] = "polygon", this["_status"] = "idle", this["_message"] = "", this["_helpOpen"] = ![], this["_picking"] = ![], this["_feature"] = null, this["_css"] = { "sheet": null }, this["_bind"] = new AnalysisMapBind(() => ({ "map": this["map"], "mapElementId": this["mapElementId"] }), (_0x2db5c4, _0x656bd3) => {
      if (!this["_picking"]) return;
      this["_feature"] = _0x2db5c4, this["_label"] = _0x656bd3, this["_picking"] = ![], this["_status"] = "idle", this["_message"] = "", this["_bind"]["highlight"]([_0x2db5c4]);
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
  ["updated"](_0x28e73a) {
    _0x28e73a["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_css"], "tucbs-boundary-tool"), (_0x28e73a["has"]("mapElementId") || _0x28e73a["has"]("map")) && (this["_bind"]["detach"](), this["_bind"]["attach"]());
  }
  ["_note"](_0x59d2ce, _0x3fa5db) {
    this["_status"] = "idle", this["_message"] = "", showToast(_0x59d2ce, _0x3fa5db);
  }
  async ["_run"]() {
    if (this["_status"] === "loading") return;
    if (!this["_feature"]) {
      this["_note"]("error", "Lütfen haritada bir nesne seçin.");
      return;
    }
    const _0x91f686 = this["_bind"]["current"]();
    if (!_0x91f686) {
      this["_note"]("error", "Harita henüz hazır değil.");
      return;
    }
    this["_status"] = "loading", this["_message"] = "İşleniyor…", this["_picking"] = ![], this["dispatchEvent"](new CustomEvent("tucbs-boundary-run", { "detail": { "mapElementId": this["mapElementId"], "boundaryType": this["_boundaryType"], "outputGeometry": this["_output"] }, "bubbles": !![], "composed": !![] }));
    try {
      await _0x91f686["runBoundary"]({ "geojson": this["_feature"], "boundaryType": this["_boundaryType"], "outputGeometry": this["_output"] }, { "title": this["_boundaryType"] === "bbox" ? "Sınırlayıcı kutu" : "Dışbükey zarf" }), this["_feature"] = null, this["_label"] = "", this["_boundaryType"] = "bbox", this["_output"] = "polygon", this["_bind"]["highlight"]([]), this["_status"] = "idle", this["_message"] = "", showToast("success", "Sınır tamamlandı.");
    } catch (_0x131238) {
      _0x131238 instanceof TucbsError && console["error"]("[tucbs-boundary-tool] " + _0x131238["code"] + " (" + _0x131238["number"] + "): " + _0x131238["message"]), this["_note"]("error", _0x131238 instanceof Error ? _0x131238["message"] : "Sınır üretimi başarısız.");
    }
  }
  ["render"]() {
    const _0x4f2162 = this["_status"] === "loading";
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
            ?disabled=${_0x4f2162}
            @click=${() => {
      this["_picking"] = !![], this["_note"]("info", "Haritadan bir nesne seçin.");
    }}
          />
          <button
            type="button"
            class="refresh"
            title="Yeniden seç"
            ?disabled=${_0x4f2162}
            @click=${() => {
      this["_feature"] = null, this["_label"] = "", this["_picking"] = !![], this["_bind"]["highlight"]([]);
    }}
          >⟳</button>
        </div>
        <label class="lbl">Sınır tipi</label>
        <select
          .value=${this["_boundaryType"]}
          ?disabled=${_0x4f2162}
          @change=${(_0x282f19) => {
      this["_boundaryType"] = _0x282f19["target"]["value"];
    }}
        >
          <option value="bbox">Sınırlayıcı Kutu</option>
          <option value="convex">Dışbükey Zarf</option>
        </select>
        <label class="lbl">Çıktı geometrisi</label>
        <select
          .value=${this["_output"]}
          ?disabled=${_0x4f2162}
          @change=${(_0x530462) => {
      this["_output"] = _0x530462["target"]["value"];
    }}
        >
          <option value="polygon">Poligon</option>
          <option value="line">Çizgi</option>
        </select>
        <div class="actions">
          <button class="run" type="button" ?disabled=${!this["_feature"] || _0x4f2162} @click=${this["_run"]}>
            ${_0x4f2162 ? "İşleniyor..." : "Çalıştır"}
          </button>
        </div>
        ${this["_message"] ? b`<p class="status ${this["_status"]}">${this["_message"]}</p>` : null}
      </div>
    `;
  }
};
TucbsBoundaryTool["styles"] = [geoToolStyles, analysisHelpStyles], __decorateClass$d([n$1()], TucbsBoundaryTool["prototype"], "mapElementId", 2), __decorateClass$d([n$1({ "attribute": ![] })], TucbsBoundaryTool["prototype"], "map", 2), __decorateClass$d([n$1({ "attribute": "custom-css" })], TucbsBoundaryTool["prototype"], "customCss", 2), __decorateClass$d([r()], TucbsBoundaryTool["prototype"], "_label", 2), __decorateClass$d([r()], TucbsBoundaryTool["prototype"], "_boundaryType", 2), __decorateClass$d([r()], TucbsBoundaryTool["prototype"], "_output", 2), __decorateClass$d([r()], TucbsBoundaryTool["prototype"], "_status", 2), __decorateClass$d([r()], TucbsBoundaryTool["prototype"], "_message", 2), __decorateClass$d([r()], TucbsBoundaryTool["prototype"], "_helpOpen", 2), __decorateClass$d([r()], TucbsBoundaryTool["prototype"], "_picking", 2), TucbsBoundaryTool = __decorateClass$d([t$3("tucbs-boundary-tool")], TucbsBoundaryTool);
var __defProp$b = Object["defineProperty"], __getOwnPropDesc$c = Object["getOwnPropertyDescriptor"], __decorateClass$c = (_0x7d6f29, _0x1e800a, _0x198620, _0x154064) => {
  var _0x585e7e = _0x154064 > 1 ? void 0 : _0x154064 ? __getOwnPropDesc$c(_0x1e800a, _0x198620) : _0x1e800a;
  for (var _0x4cc5cb = _0x7d6f29["length"] - 1, _0x3d73bd; _0x4cc5cb >= 0; _0x4cc5cb--) if (_0x3d73bd = _0x7d6f29[_0x4cc5cb]) _0x585e7e = (_0x154064 ? _0x3d73bd(_0x1e800a, _0x198620, _0x585e7e) : _0x3d73bd(_0x585e7e)) || _0x585e7e;
  if (_0x154064 && _0x585e7e) __defProp$b(_0x1e800a, _0x198620, _0x585e7e);
  return _0x585e7e;
};
const CORNER_IDS = ["KB", "KD", "GD", "GB"], CORNER_LABEL = { "KB": "Kuzey-batı", "KD": "Kuzey-doğu", "GD": "Güney-doğu", "GB": "Güney-batı" }, KM_PER_DEG = 111.32;
let TucbsClipTool = class extends i$2 {
  constructor() {
    super(...arguments), this["mapElementId"] = "", this["map"] = null, this["customCss"] = "", this["_label"] = "", this["_drawing"] = ![], this["_status"] = "idle", this["_message"] = "", this["_helpOpen"] = ![], this["_picking"] = ![], this["_box"] = null, this["_coords"] = emptyCoords(), this["_feature"] = null, this["_mask"] = null, this["_shapeId"] = null, this["_shapeEntity"] = null, this["_handles"] = [], this["_drag"] = null, this["_pointer"] = null, this["_css"] = { "sheet": null }, this["_bind"] = new AnalysisMapBind(() => ({ "map": this["map"], "mapElementId": this["mapElementId"] }), (_0x554b25, _0x387044) => {
      if (_0x554b25["properties"]["tucbsClipHandle"]) return;
      if (!this["_picking"] || this["_drawing"]) return;
      this["_feature"] = _0x554b25, this["_label"] = _0x387044, this["_picking"] = ![], this["_status"] = "idle", this["_message"] = "", this["_bind"]["highlight"]([_0x554b25]);
    }, () => {
      this["_note"]("error", "Seçilen özellikten GeoJSON üretilemedi.");
    }), this["_onDrawComplete"] = (_0x20fd4f) => {
      if (_0x20fd4f["shape"]["source"] !== "tucbs-clip" || _0x20fd4f["shape"]["tool"] !== "rectangle") return;
      const _0x2ffe71 = boxFromCoordinates(_0x20fd4f["shape"]["coordinates"]);
      if (!_0x2ffe71) return;
      this["_shapeId"] = _0x20fd4f["shape"]["id"], this["_shapeEntity"] = _0x20fd4f["shape"]["entity"], this["_applyBox"](_0x2ffe71), this["_endDrawMode"](), this["_placeHandles"]();
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
  ["updated"](_0x488f98) {
    _0x488f98["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_css"], "tucbs-clip-tool"), (_0x488f98["has"]("mapElementId") || _0x488f98["has"]("map")) && (this["_listenDraw"](![]), this["_dropPointer"](), this["_bind"]["detach"](), this["_bind"]["attach"](), this["_listenDraw"](!![]));
  }
  ["_note"](_0x115768, _0xeaadb3) {
    this["_status"] = "idle", this["_message"] = "", showToast(_0x115768, _0xeaadb3);
  }
  ["_listenDraw"](_0x4c7e7c) {
    var _a2;
    const _0x409670 = (_a2 = this["_bind"]["current"]()) == null ? void 0 : _a2["drawingManager"];
    if (!_0x409670) return;
    const _0x33fe6e = _0x4c7e7c ? "on" : "off";
    _0x409670[_0x33fe6e]("draw:complete", this["_onDrawComplete"]), _0x409670[_0x33fe6e]("draw:cancel", this["_onDrawCancel"]);
  }
  ["_startDraw"]() {
    const _0x31a41c = this["_bind"]["current"]();
    if (!_0x31a41c) {
      this["_note"]("error", "Harita henüz hazır değil.");
      return;
    }
    this["_clearMask"](_0x31a41c), this["_drawing"] = !![], this["_picking"] = ![], this["_note"]("info", "Haritada dikdörtgen çizin."), _0x31a41c["drawingManager"]["activate"]("rectangle", "tucbs-clip");
  }
  ["_armPick"]() {
    this["_endDrawMode"](), this["_picking"] = !![], this["_note"]("info", "Haritadan nesne seç.");
  }
  ["_endDrawMode"]() {
    const _0xda5962 = this["_bind"]["current"]();
    if ((_0xda5962 == null ? void 0 : _0xda5962["drawingManager"]["getActiveTool"]()) === "rectangle") _0xda5962["drawingManager"]["deactivate"]();
    this["_drawing"] = ![];
  }
  ["_clearMask"](_0x12ed71) {
    this["_removeHandles"]();
    if (_0x12ed71 && this["_shapeId"]) _0x12ed71["drawingManager"]["removeShape"](this["_shapeId"]);
    this["_shapeId"] = null, this["_shapeEntity"] = null, this["_mask"] = null, this["_box"] = null, this["_coords"] = emptyCoords();
  }
  ["_stopDraw"](_0x77cff) {
    this["_endDrawMode"](), this["_dropPointer"]();
    if (_0x77cff) this["_clearMask"](this["_bind"]["current"]());
    this["_drawing"] = ![];
  }
  ["_applyBox"](_0x42d2a8) {
    this["_box"] = _0x42d2a8, this["_coords"] = coordsFromBox(_0x42d2a8), this["_mask"] = maskFromBox(_0x42d2a8), this["_paintPolygon"](_0x42d2a8), this["_status"] = "idle", this["_message"] = "";
  }
  ["_applyCorner"](_0x261450) {
    const _0x13d4f5 = this["_box"];
    if (!_0x13d4f5) return;
    const _0x2645e2 = this["_coords"][_0x261450], _0x24f44c = Number(_0x2645e2["lon"]), _0x25639b = Number(_0x2645e2["lat"]);
    if (!Number["isFinite"](_0x24f44c) || !Number["isFinite"](_0x25639b)) {
      this["_coords"] = coordsFromBox(_0x13d4f5);
      return;
    }
    const _0x5adfa0 = boxFromCorner(_0x13d4f5, _0x261450, _0x24f44c, _0x25639b);
    if (!_0x5adfa0) {
      this["_coords"] = coordsFromBox(_0x13d4f5), this["_note"]("error", "Köşeler geçerli bir dikdörtgen oluşturmuyor.");
      return;
    }
    this["_applyBox"](_0x5adfa0), this["_placeHandles"]();
  }
  ["_setCoord"](_0x3eac33, _0x50a697, _0x33d54b) {
    this["_coords"] = { ...this["_coords"], [_0x3eac33]: { ...this["_coords"][_0x3eac33], [_0x50a697]: _0x33d54b } };
  }
  ["_paintPolygon"](_0x5a6de3) {
    var _a2, _b;
    const _0x5f0acd = (_a2 = this["_shapeEntity"]) == null ? void 0 : _a2["polygon"];
    if (!_0x5f0acd) return;
    _0x5f0acd["hierarchy"] = new ConstantProperty(new PolygonHierarchy(Cartesian3["fromDegreesArray"](flatRing(_0x5a6de3)))), (_b = this["_bind"]["current"]()) == null ? void 0 : _b["viewer"]["scene"]["requestRender"]();
  }
  ["_placeHandles"]() {
    const _0x23248 = this["_bind"]["current"](), _0x3e7c15 = this["_box"];
    if (!_0x23248 || !_0x3e7c15) return;
    this["_removeHandles"]();
    const _0x1de885 = _0x23248["viewer"], _0x5289b9 = cornerPoints(_0x3e7c15);
    for (const _0x21a34d of CORNER_IDS) {
      const _0x11cd56 = _0x5289b9[_0x21a34d];
      this["_handles"]["push"](_0x1de885["entities"]["add"]({ "name": "tucbs-clip-" + _0x21a34d, "position": Cartesian3["fromDegrees"](_0x11cd56["lon"], _0x11cd56["lat"]), "properties": { "tucbsClipHandle": _0x21a34d }, "billboard": { "image": cornerBadge(_0x21a34d), "width": 36, "height": 22, "verticalOrigin": VerticalOrigin["CENTER"], "horizontalOrigin": HorizontalOrigin["CENTER"], "disableDepthTestDistance": Number["POSITIVE_INFINITY"] } }));
    }
    this["_ensurePointer"](_0x1de885), _0x1de885["scene"]["requestRender"]();
  }
  ["_removeHandles"]() {
    var _a2;
    const _0x3a5a8b = (_a2 = this["_bind"]["current"]()) == null ? void 0 : _a2["viewer"];
    if (!_0x3a5a8b) {
      this["_handles"] = [];
      return;
    }
    for (const _0x1a5328 of this["_handles"]) _0x3a5a8b["entities"]["remove"](_0x1a5328);
    this["_handles"] = [], this["_drag"] = null, _0x3a5a8b["scene"]["screenSpaceCameraController"]["enableInputs"] = !![];
  }
  ["_ensurePointer"](_0x43227c) {
    if (this["_pointer"]) return;
    const _0x236ec9 = new ScreenSpaceEventHandler(_0x43227c["scene"]["canvas"]);
    _0x236ec9["setInputAction"]((_0x2ac83d) => {
      const _0x46b753 = this["_cornerAt"](_0x43227c, _0x2ac83d["position"]);
      if (!_0x46b753) return;
      this["_drag"] = _0x46b753, _0x43227c["scene"]["screenSpaceCameraController"]["enableInputs"] = ![];
    }, ScreenSpaceEventType["LEFT_DOWN"]), _0x236ec9["setInputAction"]((_0x31819b) => {
      if (!this["_drag"] || !this["_box"]) return;
      const _0x4fb48c = groundLonLat(_0x43227c, _0x31819b["endPosition"]);
      if (!_0x4fb48c) return;
      const _0x56dd10 = boxFromCorner(this["_box"], this["_drag"], _0x4fb48c[0], _0x4fb48c[1]);
      if (!_0x56dd10) return;
      this["_applyBox"](_0x56dd10), this["_moveHandles"](_0x56dd10);
    }, ScreenSpaceEventType["MOUSE_MOVE"]), _0x236ec9["setInputAction"](() => {
      this["_drag"] = null, _0x43227c["scene"]["screenSpaceCameraController"]["enableInputs"] = !![];
    }, ScreenSpaceEventType["LEFT_UP"]), this["_pointer"] = _0x236ec9;
  }
  ["_cornerAt"](_0x2bbe42, _0x2b0b70) {
    var _a2;
    const _0x48524c = _0x2bbe42["scene"]["pick"](_0x2b0b70), _0x51d4b1 = ((_a2 = _0x48524c == null ? void 0 : _0x48524c["id"]) == null ? void 0 : _a2["name"]) ?? "";
    if (!_0x51d4b1["startsWith"]("tucbs-clip-")) return null;
    const _0x3925d1 = _0x51d4b1["slice"]("tucbs-clip-"["length"]);
    return CORNER_IDS["includes"](_0x3925d1) ? _0x3925d1 : null;
  }
  ["_moveHandles"](_0x1f9391) {
    const _0x2fb65c = cornerPoints(_0x1f9391);
    for (const _0xe8ccb4 of this["_handles"]) {
      const _0x7ad17c = (_0xe8ccb4["name"] ?? "")["slice"]("tucbs-clip-"["length"]), _0x404a82 = _0x2fb65c[_0x7ad17c];
      if (!_0x404a82) continue;
      _0xe8ccb4["position"] = Cartesian3["fromDegrees"](_0x404a82["lon"], _0x404a82["lat"]);
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
    const _0xbe8150 = this["_bind"]["current"]();
    if (!_0xbe8150) {
      this["_note"]("error", "Harita henüz hazır değil.");
      return;
    }
    this["_status"] = "loading", this["_message"] = "İşleniyor…", this["dispatchEvent"](new CustomEvent("tucbs-clip-run", { "detail": { "mapElementId": this["mapElementId"], "label": this["_label"] }, "bubbles": !![], "composed": !![] }));
    try {
      await _0xbe8150["runClip"]({ "geojsonA": this["_feature"], "geojsonB": this["_mask"] }, { "title": "Kırpma sonucu" }), this["_feature"] = null, this["_label"] = "", this["_picking"] = ![], this["_clearMask"](_0xbe8150), this["_bind"]["highlight"]([]), this["_status"] = "idle", this["_message"] = "", showToast("success", "Kırpma işlemi tamamlandı.");
    } catch (_0x5561d5) {
      _0x5561d5 instanceof TucbsError && console["error"]("[tucbs-clip-tool] " + _0x5561d5["code"] + " (" + _0x5561d5["number"] + "): " + _0x5561d5["message"]), this["_note"]("error", _0x5561d5 instanceof Error ? _0x5561d5["message"] : "Kırpma başarısız.");
    }
  }
  ["render"]() {
    const _0x16126a = this["_status"] === "loading", _0x239642 = this["_box"], _0x5d0979 = Boolean(this["_feature"] && this["_mask"] && _0x239642) && !_0x16126a && !this["_drawing"], _0x531801 = _0x239642 ? formatSize(_0x239642) : "";
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
            ?disabled=${_0x16126a || this["_drawing"]}
            @click=${this["_armPick"]}
          />
          <button
            type="button"
            class="refresh"
            title="Yeniden seç"
            ?disabled=${_0x16126a}
            @click=${() => {
      this["_feature"] = null, this["_label"] = "", this["_armPick"](), this["_bind"]["highlight"]([]);
    }}
          >⟳</button>
        </div>
        <label class="lbl">Kırpma alanı (dikdörtgen)</label>
        <div class="area-row">
          <span class="area-size">${this["_drawing"] ? "Çiziliyor…" : _0x531801}</span>
          <div class="area-actions">
            ${_0x239642 && !this["_drawing"] ? b`<button type="button" class="link" ?disabled=${_0x16126a} @click=${() => this["_clearMask"](this["_bind"]["current"]())}>Temizle</button>` : null}
            <button class="secondary" type="button" ?disabled=${_0x16126a || this["_drawing"]} @click=${this["_startDraw"]}>
              ${this["_drawing"] ? "Çiziliyor" : _0x239642 ? "Yeniden çiz" : "Dikdörtgen çiz"}
            </button>
          </div>
        </div>
        ${_0x239642 ? b`
            <div class="corners">
              <h4>Köşe koordinatları</h4>
              ${CORNER_IDS["map"]((_0x2e4e9e) => b`
                <div class="corner">
                  <div class="corner-head">
                    <span class="badge">${_0x2e4e9e}</span>
                    <span class="corner-name">${CORNER_LABEL[_0x2e4e9e]}</span>
                  </div>
                  <div class="corner-fields">
                    <label>
                      Boylam
                      <input
                        .value=${this["_coords"][_0x2e4e9e]["lon"]}
                        ?disabled=${_0x16126a || this["_drawing"]}
                        @input=${(_0x5a2d29) => this["_setCoord"](_0x2e4e9e, "lon", _0x5a2d29["target"]["value"])}
                        @blur=${() => this["_applyCorner"](_0x2e4e9e)}
                        @keydown=${(_0x3b2ca6) => {
      if (_0x3b2ca6["key"] === "Enter") this["_applyCorner"](_0x2e4e9e);
    }}
                      />
                    </label>
                    <label>
                      Enlem
                      <input
                        .value=${this["_coords"][_0x2e4e9e]["lat"]}
                        ?disabled=${_0x16126a || this["_drawing"]}
                        @input=${(_0x310486) => this["_setCoord"](_0x2e4e9e, "lat", _0x310486["target"]["value"])}
                        @blur=${() => this["_applyCorner"](_0x2e4e9e)}
                        @keydown=${(_0x307ba7) => {
      if (_0x307ba7["key"] === "Enter") this["_applyCorner"](_0x2e4e9e);
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
          <button class="run" type="button" ?disabled=${!_0x5d0979} @click=${this["_run"]}>
            ${_0x16126a ? "İşleniyor..." : "Çalıştır"}
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
function cornerBadge(_0x1a4085) {
  const _0x12dc53 = CORNER_BADGE[_0x1a4085];
  if (_0x12dc53) return _0x12dc53;
  const _0x2bf235 = document["createElement"]("canvas");
  _0x2bf235["width"] = 72, _0x2bf235["height"] = 44;
  const _0x17a598 = _0x2bf235["getContext"]("2d");
  if (!_0x17a598) return _0x2bf235;
  return _0x17a598["fillStyle"] = "#dc2626", _0x17a598["strokeStyle"] = "#ffffff", _0x17a598["lineWidth"] = 4, _0x17a598["beginPath"](), _0x17a598["roundRect"](2, 2, 68, 40, 20), _0x17a598["fill"](), _0x17a598["stroke"](), _0x17a598["fillStyle"] = "#ffffff", _0x17a598["font"] = "700 22px sans-serif", _0x17a598["textAlign"] = "center", _0x17a598["textBaseline"] = "middle", _0x17a598["fillText"](_0x1a4085, 36, 23), CORNER_BADGE[_0x1a4085] = _0x2bf235, _0x2bf235;
}
function emptyCoords() {
  return { "KB": { "lon": "", "lat": "" }, "KD": { "lon": "", "lat": "" }, "GD": { "lon": "", "lat": "" }, "GB": { "lon": "", "lat": "" } };
}
function boxFromCoordinates(_0x513a6d) {
  if (_0x513a6d["length"] < 2) return null;
  const _0x275a6d = _0x513a6d["map"]((_0xee4691) => _0xee4691[0]), _0x1e646e = _0x513a6d["map"]((_0x42aad5) => _0x42aad5[1]);
  return normalizeBox(Math["min"](..._0x275a6d), Math["min"](..._0x1e646e), Math["max"](..._0x275a6d), Math["max"](..._0x1e646e));
}
function boxFromCorner(_0x5a6796, _0xc1c080, _0x24ec02, _0x510baa) {
  let { west: _0x4a1aa3, south: _0x31463d, east: _0x553e90, north: _0x420668 } = _0x5a6796;
  if (_0xc1c080 === "KB") _0x4a1aa3 = _0x24ec02, _0x420668 = _0x510baa;
  else {
    if (_0xc1c080 === "KD") _0x553e90 = _0x24ec02, _0x420668 = _0x510baa;
    else _0xc1c080 === "GD" ? (_0x553e90 = _0x24ec02, _0x31463d = _0x510baa) : (_0x4a1aa3 = _0x24ec02, _0x31463d = _0x510baa);
  }
  return normalizeBox(_0x4a1aa3, _0x31463d, _0x553e90, _0x420668);
}
function normalizeBox(_0x1cd496, _0x2a9fea, _0x43c117, _0x78fd00) {
  const _0x11313b = Math["min"](_0x1cd496, _0x43c117), _0x58b547 = Math["max"](_0x1cd496, _0x43c117), _0x4740f8 = Math["min"](_0x2a9fea, _0x78fd00), _0x23677e = Math["max"](_0x2a9fea, _0x78fd00);
  if (_0x58b547 - _0x11313b < 1e-8 || _0x23677e - _0x4740f8 < 1e-8) return null;
  return { "west": _0x11313b, "south": _0x4740f8, "east": _0x58b547, "north": _0x23677e };
}
function coordsFromBox(_0x4091ca) {
  const _0x14c771 = cornerPoints(_0x4091ca), _0x32fe1f = emptyCoords();
  for (const _0x59697b of CORNER_IDS) {
    _0x32fe1f[_0x59697b] = { "lon": _0x14c771[_0x59697b]["lon"]["toFixed"](6), "lat": _0x14c771[_0x59697b]["lat"]["toFixed"](6) };
  }
  return _0x32fe1f;
}
function cornerPoints(_0x319629) {
  return { "KB": { "lon": _0x319629["west"], "lat": _0x319629["north"] }, "KD": { "lon": _0x319629["east"], "lat": _0x319629["north"] }, "GD": { "lon": _0x319629["east"], "lat": _0x319629["south"] }, "GB": { "lon": _0x319629["west"], "lat": _0x319629["south"] } };
}
function flatRing(_0x4c1183) {
  return [_0x4c1183["west"], _0x4c1183["south"], _0x4c1183["east"], _0x4c1183["south"], _0x4c1183["east"], _0x4c1183["north"], _0x4c1183["west"], _0x4c1183["north"]];
}
function maskFromBox(_0x13b10c) {
  const _0x7a1b42 = [[_0x13b10c["west"], _0x13b10c["south"]], [_0x13b10c["east"], _0x13b10c["south"]], [_0x13b10c["east"], _0x13b10c["north"]], [_0x13b10c["west"], _0x13b10c["north"]], [_0x13b10c["west"], _0x13b10c["south"]]], _0x411743 = { "type": "Polygon", "coordinates": [_0x7a1b42] };
  return { "type": "Feature", "properties": {}, "geometry": _0x411743 };
}
function formatSize(_0x10b8e7) {
  const _0x16fda8 = (_0x10b8e7["south"] + _0x10b8e7["north"]) / 2 * (Math["PI"] / 180), _0x5ba8fc = Math["abs"](_0x10b8e7["north"] - _0x10b8e7["south"]) * KM_PER_DEG, _0x2c2977 = Math["abs"](_0x10b8e7["east"] - _0x10b8e7["west"]) * KM_PER_DEG * Math["cos"](_0x16fda8);
  return _0x2c2977["toFixed"](2) + " × " + _0x5ba8fc["toFixed"](2) + " km";
}
function groundLonLat(_0x35edd2, _0x11fe99) {
  const _0x207266 = _0x35edd2["camera"]["getPickRay"](_0x11fe99);
  if (!_0x207266) return null;
  const _0x28bbb9 = _0x35edd2["scene"]["globe"]["pick"](_0x207266, _0x35edd2["scene"]);
  if (!_0x28bbb9) return null;
  const _0x1b230d = Cartographic["fromCartesian"](_0x28bbb9);
  return [_0x2d6059["toDegrees"](_0x1b230d["longitude"]), _0x2d6059["toDegrees"](_0x1b230d["latitude"])];
}
var __defProp$a = Object["defineProperty"], __getOwnPropDesc$b = Object["getOwnPropertyDescriptor"], __decorateClass$b = (_0x62f9bc, _0x1917b6, _0x4b831c, _0x4907bc) => {
  var _0x490ceb = _0x4907bc > 1 ? void 0 : _0x4907bc ? __getOwnPropDesc$b(_0x1917b6, _0x4b831c) : _0x1917b6;
  for (var _0x4f43e4 = _0x62f9bc["length"] - 1, _0xf55901; _0x4f43e4 >= 0; _0x4f43e4--) if (_0xf55901 = _0x62f9bc[_0x4f43e4]) _0x490ceb = (_0x4907bc ? _0xf55901(_0x1917b6, _0x4b831c, _0x490ceb) : _0xf55901(_0x490ceb)) || _0x490ceb;
  if (_0x4907bc && _0x490ceb) __defProp$a(_0x1917b6, _0x4b831c, _0x490ceb);
  return _0x490ceb;
};
const _TucbsTwoFeatureTool = class _TucbsTwoFeatureTool extends i$2 {
  constructor() {
    super(...arguments), this["mapElementId"] = "", this["map"] = null, this["customCss"] = "", this["_labelA"] = "", this["_labelB"] = "", this["_status"] = "idle", this["_message"] = "", this["_helpOpen"] = ![], this["_featureA"] = null, this["_featureB"] = null, this["_pending"] = null, this["_css"] = { "sheet": null }, this["_bind"] = new AnalysisMapBind(() => ({ "map": this["map"], "mapElementId": this["mapElementId"] }), (_0x5010b4, _0x3e163d) => this["_accept"](_0x5010b4, _0x3e163d), () => {
      this["_note"]("error", "Seçilen özellikten GeoJSON üretilemedi.");
    });
  }
  ["connectedCallback"]() {
    super["connectedCallback"](), this["_bind"]["attach"]();
  }
  ["disconnectedCallback"]() {
    this["_bind"]["detach"](), super["disconnectedCallback"]();
  }
  ["updated"](_0x472f2a) {
    _0x472f2a["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_css"], this["tagName"]["toLowerCase"]()), (_0x472f2a["has"]("mapElementId") || _0x472f2a["has"]("map")) && (this["_bind"]["detach"](), this["_bind"]["attach"]());
  }
  ["_accept"](_0x5f3e1c, _0x5393ba) {
    if (!this["_pending"]) return;
    if (!isPolygonFeature(_0x5f3e1c)) {
      this["_note"]("error", this["spec"]()["polygonOnlyMessage"]);
      return;
    }
    this["_pending"] === "a" ? (this["_featureA"] = _0x5f3e1c, this["_labelA"] = _0x5393ba) : (this["_featureB"] = _0x5f3e1c, this["_labelB"] = _0x5393ba), this["_pending"] = null, this["_status"] = "idle", this["_message"] = "", this["_bind"]["highlight"]([this["_featureA"], this["_featureB"]]["filter"]((_0xe62bef) => _0xe62bef !== null));
  }
  ["_arm"](_0x250711) {
    this["_pending"] = _0x250711, this["_note"]("info", _0x250711 === "a" ? "Lütfen birinci poligonu seçin." : "Lütfen ikinci poligonu seçin.");
  }
  ["_refresh"](_0x4e939e) {
    _0x4e939e === "a" ? (this["_featureA"] = null, this["_labelA"] = "") : (this["_featureB"] = null, this["_labelB"] = ""), this["_arm"](_0x4e939e), this["_bind"]["highlight"]([this["_featureA"], this["_featureB"]]["filter"]((_0x5ed0e8) => _0x5ed0e8 !== null));
  }
  ["_clear"]() {
    this["_featureA"] = null, this["_featureB"] = null, this["_labelA"] = "", this["_labelB"] = "", this["_pending"] = null, this["_bind"]["highlight"]([]);
  }
  async ["_run"]() {
    const _0x35ab0f = this["spec"]();
    if (this["_status"] === "loading") return;
    if (!isPolygonFeature(this["_featureA"]) || !isPolygonFeature(this["_featureB"])) {
      this["_note"]("error", _0x35ab0f["bothPolygonMessage"]);
      return;
    }
    const _0x45be43 = this["_bind"]["current"]();
    if (!_0x45be43) {
      this["_bind"]["attach"](), this["_note"]("error", "Harita henüz hazır değil.");
      return;
    }
    this["_status"] = "loading", this["_message"] = "İşleniyor…", this["_pending"] = null, this["dispatchEvent"](new CustomEvent(_0x35ab0f["eventName"], { "detail": { "mapElementId": this["mapElementId"], "labelA": this["_labelA"], "labelB": this["_labelB"] }, "bubbles": !![], "composed": !![] }));
    try {
      await _0x35ab0f["run"](_0x45be43, this["_featureA"], this["_featureB"]), this["_clear"](), this["_status"] = "idle", this["_message"] = "", showToast("success", _0x35ab0f["success"]);
    } catch (_0x11c5ab) {
      _0x11c5ab instanceof TucbsError && console["error"]("[" + this["tagName"] + "] " + _0x11c5ab["code"] + " (" + _0x11c5ab["number"] + "): " + _0x11c5ab["message"]), this["_note"]("error", _0x11c5ab instanceof Error ? _0x11c5ab["message"] : _0x35ab0f["fail"]);
    }
  }
  ["_note"](_0x2b6c9d, _0x8458a2) {
    this["_status"] = "idle", this["_message"] = "", showToast(_0x2b6c9d, _0x8458a2);
  }
  ["_slot"](_0x45dc88, _0x560f93, _0x516b00, _0x49ccc4) {
    const _0x962a21 = this["_status"] === "loading";
    return b`
      <label class="lbl">${_0x560f93}</label>
      <div class="input-wrap">
        <input
          type="text"
          readonly
          placeholder=${_0x516b00}
          .value=${_0x49ccc4 ? "= " + _0x49ccc4 : ""}
          ?disabled=${_0x962a21}
          @click=${() => this["_arm"](_0x45dc88)}
        />
        <button type="button" class="refresh" title="Yeniden seç" ?disabled=${_0x962a21} @click=${() => this["_refresh"](_0x45dc88)}>⟳</button>
      </div>
    `;
  }
  ["render"]() {
    const _0xfe9794 = this["spec"](), _0x26ead2 = this["_status"] === "loading", _0x187c30 = isPolygonFeature(this["_featureA"]) && isPolygonFeature(this["_featureB"]) && !_0x26ead2;
    return b`
      <div class="panel">
        <div class="title-row">
          <h3 class="title">${_0xfe9794["title"]}</h3>
          <button type="button" class="help" aria-label="Yardım" title="Yardım" @click=${() => {
      this["_helpOpen"] = !![];
    }}>?</button>
        </div>
        ${renderAnalysisHelp(this["_helpOpen"], _0xfe9794["title"], _0xfe9794["help"], () => {
      this["_helpOpen"] = ![];
    })}
        ${this["_slot"]("a", _0xfe9794["labelA"], _0xfe9794["placeholderA"], this["_labelA"])}
        ${this["_slot"]("b", _0xfe9794["labelB"], _0xfe9794["placeholderB"], this["_labelB"])}
        <div class="actions">
          <button class="run" type="button" ?disabled=${!_0x187c30} @click=${this["_run"]}>
            ${_0x26ead2 ? "İşleniyor..." : "Çalıştır"}
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
    return { "title": "Fark", "labelA": "İlk poligon (kaynak)...", "placeholderA": "Haritadan poligon seç", "labelB": "İkinci poligon (çıkarılacak)...", "placeholderB": "Poligon seçmek için buraya tıklayın", "eventName": "tucbs-difference-run", "success": "Fark tamamlandı.", "fail": "Fark başarısız.", "polygonOnlyMessage": "Fark için yalnızca poligon seçin.", "bothPolygonMessage": "Her iki seçim de poligon olmalıdır.", "help": COGRAFI_HELP["fark"], "run": (_0x2f284a, _0x39a8ff, _0x1d6c0e) => _0x2f284a["runDifference"]({ "geojsonA": _0x39a8ff, "geojsonB": _0x1d6c0e }, { "title": "Fark sonucu" }) };
  }
};
TucbsDifferenceTool = __decorateClass$b([t$3("tucbs-difference-tool")], TucbsDifferenceTool);
let TucbsSubtractTool = class extends TucbsTwoFeatureTool {
  ["spec"]() {
    return { "title": "Çıkarma", "labelA": "Nesneyi şuradan kaldır:", "placeholderA": "Haritadan nesne seç", "labelB": "...ile örtüşüyor.", "placeholderB": "Nesne seçmek için buraya tıklayın", "eventName": "tucbs-subtract-run", "success": "Çıkarma tamamlandı.", "fail": "Çıkarma başarısız.", "polygonOnlyMessage": "Çıkarma için yalnızca poligon seçin.", "bothPolygonMessage": "Her iki seçim de poligon olmalıdır.", "help": COGRAFI_HELP["cikarma"], "run": (_0x55b366, _0x161d9d, _0x4c851c) => _0x55b366["runSubtract"]({ "geojsonA": _0x161d9d, "geojsonB": _0x4c851c }, { "title": "Çıkarma sonucu" }) };
  }
};
TucbsSubtractTool = __decorateClass$b([t$3("tucbs-subtract-tool")], TucbsSubtractTool);
let TucbsUnionTool = class extends TucbsTwoFeatureTool {
  ["spec"]() {
    return { "title": "Birleştir", "labelA": "Birleştirilecek birinci...", "placeholderA": "Haritadan nesne seç", "labelB": "Birleştirilecek ikinci...", "placeholderB": "Haritadan nesne seç", "eventName": "tucbs-union-run", "success": "Birleştirme tamamlandı.", "fail": "Birleştirme başarısız.", "polygonOnlyMessage": "Birleştirme için yalnızca poligon seçin.", "bothPolygonMessage": "Her iki seçim de poligon olmalıdır.", "help": COGRAFI_HELP["birlestir"], "run": (_0x898292, _0x58855a, _0x458807) => _0x898292["runUnion"]({ "geojsonA": _0x58855a, "geojsonB": _0x458807 }, { "title": "Birleştir sonucu" }) };
  }
};
TucbsUnionTool = __decorateClass$b([t$3("tucbs-union-tool")], TucbsUnionTool);
var __defProp$9 = Object["defineProperty"], __getOwnPropDesc$a = Object["getOwnPropertyDescriptor"], __decorateClass$a = (_0x57abc4, _0x39522e, _0x3adafa, _0x2b82c0) => {
  var _0x3bd6d1 = _0x2b82c0 > 1 ? void 0 : _0x2b82c0 ? __getOwnPropDesc$a(_0x39522e, _0x3adafa) : _0x39522e;
  for (var _0x1dd94f = _0x57abc4["length"] - 1, _0x1b36c0; _0x1dd94f >= 0; _0x1dd94f--) if (_0x1b36c0 = _0x57abc4[_0x1dd94f]) _0x3bd6d1 = (_0x2b82c0 ? _0x1b36c0(_0x39522e, _0x3adafa, _0x3bd6d1) : _0x1b36c0(_0x3bd6d1)) || _0x3bd6d1;
  if (_0x2b82c0 && _0x3bd6d1) __defProp$9(_0x39522e, _0x3adafa, _0x3bd6d1);
  return _0x3bd6d1;
};
let TucbsWedgeBufferTool = class extends i$2 {
  constructor() {
    super(...arguments), this["mapElementId"] = "", this["map"] = null, this["customCss"] = "", this["_label"] = "", this["_distance"] = "", this["_start"] = "0", this["_end"] = "90", this["_status"] = "idle", this["_message"] = "", this["_helpOpen"] = ![], this["_picking"] = ![], this["_feature"] = null, this["_css"] = { "sheet": null }, this["_bind"] = new AnalysisMapBind(() => ({ "map": this["map"], "mapElementId": this["mapElementId"] }), (_0xe72750, _0x5430f1) => {
      if (!this["_picking"]) return;
      if (!isPointFeature(_0xe72750)) {
        this["_note"]("error", "Kama tampon sadece nokta geometrileri için kullanılabilir.");
        return;
      }
      this["_feature"] = _0xe72750, this["_label"] = _0x5430f1, this["_picking"] = ![], this["_status"] = "idle", this["_message"] = "", this["_bind"]["highlight"]([_0xe72750]);
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
  ["updated"](_0x24ac6a) {
    _0x24ac6a["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_css"], "tucbs-wedge-buffer-tool"), (_0x24ac6a["has"]("mapElementId") || _0x24ac6a["has"]("map")) && (this["_bind"]["detach"](), this["_bind"]["attach"]());
  }
  ["_note"](_0x7bdca1, _0x37d095) {
    this["_status"] = "idle", this["_message"] = "", showToast(_0x7bdca1, _0x37d095);
  }
  async ["_run"]() {
    if (this["_status"] === "loading") return;
    if (!isPointFeature(this["_feature"])) {
      this["_note"]("error", "Lütfen haritada bir nokta seçin.");
      return;
    }
    const _0x47ad62 = Number(this["_distance"]), _0x2ee76f = Number(this["_start"]), _0x16ae3d = Number(this["_end"]);
    if (!Number["isFinite"](_0x47ad62) || _0x47ad62 <= 0) {
      this["_note"]("error", "Geçerli bir mesafe girin.");
      return;
    }
    if (!Number["isFinite"](_0x2ee76f) || !Number["isFinite"](_0x16ae3d) || _0x2ee76f >= _0x16ae3d) {
      this["_note"]("error", "Başlangıç açısı bitiş açısından küçük olmalıdır.");
      return;
    }
    const _0x1bc53e = this["_bind"]["current"]();
    if (!_0x1bc53e) {
      this["_note"]("error", "Harita henüz hazır değil.");
      return;
    }
    this["_status"] = "loading", this["_message"] = "İşleniyor…", this["_picking"] = ![], this["dispatchEvent"](new CustomEvent("tucbs-wedge-buffer-run", { "detail": { "mapElementId": this["mapElementId"], "distanceM": _0x47ad62, "startAngle": _0x2ee76f, "endAngle": _0x16ae3d }, "bubbles": !![], "composed": !![] }));
    try {
      await _0x1bc53e["runWedgeBuffer"]({ "geojson": this["_feature"], "distanceM": _0x47ad62, "startAngle": _0x2ee76f, "endAngle": _0x16ae3d }, { "title": "Kama tampon (" + _0x47ad62 + "m, " + _0x2ee76f + "°–" + _0x16ae3d + "°)" }), this["_feature"] = null, this["_label"] = "", this["_distance"] = "", this["_start"] = "0", this["_end"] = "90", this["_bind"]["highlight"]([]), this["_status"] = "idle", this["_message"] = "", showToast("success", "Kama tampon eklendi.");
    } catch (_0x42b28f) {
      _0x42b28f instanceof TucbsError && console["error"]("[tucbs-wedge-buffer-tool] " + _0x42b28f["code"] + " (" + _0x42b28f["number"] + "): " + _0x42b28f["message"]), this["_note"]("error", _0x42b28f instanceof Error ? _0x42b28f["message"] : "Kama tampon başarısız.");
    }
  }
  ["render"]() {
    const _0x2d2465 = this["_status"] === "loading", _0xffabba = Boolean(this["_feature"] && this["_distance"]) && !_0x2d2465;
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
            ?disabled=${_0x2d2465}
            @click=${() => {
      this["_picking"] = !![], this["_note"]("info", "Haritadan bir nokta seçin.");
    }}
          />
          <button
            type="button"
            class="refresh"
            title="Yeniden seç"
            ?disabled=${_0x2d2465}
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
            ?disabled=${_0x2d2465}
            @input=${(_0xece149) => {
      this["_distance"] = _0xece149["target"]["value"];
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
          ?disabled=${_0x2d2465}
          @input=${(_0x13b7e8) => {
      this["_start"] = _0x13b7e8["target"]["value"];
    }}
        />
        <label class="lbl">Bitiş Açısı</label>
        <input
          type="number"
          step="any"
          placeholder="Bitiş açısı"
          .value=${this["_end"]}
          ?disabled=${_0x2d2465}
          @input=${(_0x3fd9a3) => {
      this["_end"] = _0x3fd9a3["target"]["value"];
    }}
        />
        <p class="hint">0° = Kuzey, 90° = Doğu, 180° = Güney, 270° = Batı</p>
        <div class="actions">
          <button class="run" type="button" ?disabled=${!_0xffabba} @click=${this["_run"]}>
            ${_0x2d2465 ? "İşleniyor..." : "Çalıştır"}
          </button>
        </div>
        ${this["_message"] ? b`<p class="status ${this["_status"]}">${this["_message"]}</p>` : null}
      </div>
    `;
  }
};
TucbsWedgeBufferTool["styles"] = [geoToolStyles, analysisHelpStyles], __decorateClass$a([n$1()], TucbsWedgeBufferTool["prototype"], "mapElementId", 2), __decorateClass$a([n$1({ "attribute": ![] })], TucbsWedgeBufferTool["prototype"], "map", 2), __decorateClass$a([n$1({ "attribute": "custom-css" })], TucbsWedgeBufferTool["prototype"], "customCss", 2), __decorateClass$a([r()], TucbsWedgeBufferTool["prototype"], "_label", 2), __decorateClass$a([r()], TucbsWedgeBufferTool["prototype"], "_distance", 2), __decorateClass$a([r()], TucbsWedgeBufferTool["prototype"], "_start", 2), __decorateClass$a([r()], TucbsWedgeBufferTool["prototype"], "_end", 2), __decorateClass$a([r()], TucbsWedgeBufferTool["prototype"], "_status", 2), __decorateClass$a([r()], TucbsWedgeBufferTool["prototype"], "_message", 2), __decorateClass$a([r()], TucbsWedgeBufferTool["prototype"], "_helpOpen", 2), __decorateClass$a([r()], TucbsWedgeBufferTool["prototype"], "_picking", 2), TucbsWedgeBufferTool = __decorateClass$a([t$3("tucbs-wedge-buffer-tool")], TucbsWedgeBufferTool);
var __defProp$8 = Object["defineProperty"], __getOwnPropDesc$9 = Object["getOwnPropertyDescriptor"], __decorateClass$9 = (_0x37c3d0, _0x3a1942, _0x2660de, _0xdebf3c) => {
  var _0xdf0629 = _0xdebf3c > 1 ? void 0 : _0xdebf3c ? __getOwnPropDesc$9(_0x3a1942, _0x2660de) : _0x3a1942;
  for (var _0x57a111 = _0x37c3d0["length"] - 1, _0x474590; _0x57a111 >= 0; _0x57a111--) if (_0x474590 = _0x37c3d0[_0x57a111]) _0xdf0629 = (_0xdebf3c ? _0x474590(_0x3a1942, _0x2660de, _0xdf0629) : _0x474590(_0xdf0629)) || _0xdf0629;
  if (_0xdebf3c && _0xdf0629) __defProp$8(_0x3a1942, _0x2660de, _0xdf0629);
  return _0xdf0629;
};
const TOOLS = [{ "id": "sinir", "label": "Sınır" }, { "id": "tampon", "label": "Tampon" }, { "id": "kirp", "label": "Kırp" }, { "id": "fark", "label": "Fark" }, { "id": "kesisim", "label": "Kesişim" }, { "id": "cikarma", "label": "Çıkarma" }, { "id": "birlestir", "label": "Birleştir" }, { "id": "kama", "label": "Kama Tampon" }];
let TucbsAnalysisPanel = class extends i$2 {
  constructor() {
    super(...arguments), this["mapElementId"] = "", this["customCss"] = "", this["_activeTool"] = null, this["_customCssState"] = { "sheet": null };
  }
  ["updated"](_0x1e48a5) {
    _0x1e48a5["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_customCssState"], "tucbs-analysis-panel");
  }
  ["_openTool"](_0x3bb78e) {
    this["_activeTool"] = _0x3bb78e;
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
          ${TOOLS["map"]((_0x1b164c) => b`
              <li>
                <button type="button" @click=${() => this["_openTool"](_0x1b164c["id"])}>
                  ${_0x1b164c["label"]}
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
    const _0x24745e = this["_toolTag"]();
    if (!_0x24745e) return null;
    return b`
      <div class="shell">
        <button
          type="button"
          class="back"
          aria-label="Araç listesine dön"
          title="Geri"
          @click=${this["_backToList"]}
        >←</button>
        ${_0x24745e === "tucbs-boundary-tool" ? b`<tucbs-boundary-tool .map=${this["map"]} .mapElementId=${this["mapElementId"]}></tucbs-boundary-tool>` : _0x24745e === "tucbs-buffer-tool" ? b`<tucbs-buffer-tool .map=${this["map"]} .mapElementId=${this["mapElementId"]}></tucbs-buffer-tool>` : _0x24745e === "tucbs-clip-tool" ? b`<tucbs-clip-tool .map=${this["map"]} .mapElementId=${this["mapElementId"]}></tucbs-clip-tool>` : _0x24745e === "tucbs-difference-tool" ? b`<tucbs-difference-tool .map=${this["map"]} .mapElementId=${this["mapElementId"]}></tucbs-difference-tool>` : _0x24745e === "tucbs-intersection-tool" ? b`<tucbs-intersection-tool .map=${this["map"]} .mapElementId=${this["mapElementId"]}></tucbs-intersection-tool>` : _0x24745e === "tucbs-subtract-tool" ? b`<tucbs-subtract-tool .map=${this["map"]} .mapElementId=${this["mapElementId"]}></tucbs-subtract-tool>` : _0x24745e === "tucbs-union-tool" ? b`<tucbs-union-tool .map=${this["map"]} .mapElementId=${this["mapElementId"]}></tucbs-union-tool>` : b`<tucbs-wedge-buffer-tool .map=${this["map"]} .mapElementId=${this["mapElementId"]}></tucbs-wedge-buffer-tool>`}
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
var __defProp$7 = Object["defineProperty"], __getOwnPropDesc$8 = Object["getOwnPropertyDescriptor"], __decorateClass$8 = (_0x46566b, _0x1107e9, _0x5da510, _0x340e4f) => {
  var _0x205171 = _0x340e4f > 1 ? void 0 : _0x340e4f ? __getOwnPropDesc$8(_0x1107e9, _0x5da510) : _0x1107e9;
  for (var _0x28a6a6 = _0x46566b["length"] - 1, _0x425f54; _0x28a6a6 >= 0; _0x28a6a6--) if (_0x425f54 = _0x46566b[_0x28a6a6]) _0x205171 = (_0x340e4f ? _0x425f54(_0x1107e9, _0x5da510, _0x205171) : _0x425f54(_0x205171)) || _0x205171;
  if (_0x340e4f && _0x205171) __defProp$7(_0x1107e9, _0x5da510, _0x205171);
  return _0x205171;
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
    const _0x1560bd = document["createElement"]("tucbs-slide-over-panel");
    _0x1560bd["panelTitle"] = "Coğrafi Analiz", _0x1560bd["panelWidth"] = this["panelWidth"], _0x1560bd["onCloseRequest"] = () => this["_toggle"](), document["body"]["appendChild"](_0x1560bd), this["_panelEl"] = _0x1560bd, this["_renderIntoPanel"]();
  }
  ["disconnectedCallback"]() {
    var _a2;
    if (this["map"]) this["_layoutController"]["unbindMap"](this["map"]);
    (_a2 = this["_panelEl"]) == null ? void 0 : _a2["remove"](), this["_panelEl"] = null, super["disconnectedCallback"]();
  }
  ["firstUpdated"]() {
    bindMapByElementId(this, { "noIdTiming": "raf", "noIdMessage": '[tucbs-analysis-tool] "mapElementId" verilmedi ve "map" atanmadı; analiz paneli haritaya bağlanamayabilir.', "missingElementMessage": (_0x19d9ae) => '[tucbs-analysis-tool] mapElementId="' + _0x19d9ae + '" bulunamadı.' });
  }
  ["updated"](_0x447629) {
    _0x447629["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_customCssState"], "tucbs-analysis-tool");
    if (_0x447629["has"]("map")) {
      const _0x405a03 = _0x447629["get"]("map");
      if (_0x405a03) this["_layoutController"]["unbindMap"](_0x405a03);
      if (this["map"]) this["_layoutController"]["bindMap"](this["map"]);
    }
    _0x447629["has"]("panelWidth") && this["_open"] && this["_layoutController"]["setOpen"](!![], this["panelWidth"]);
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
var __defProp$6 = Object["defineProperty"], __getOwnPropDesc$7 = Object["getOwnPropertyDescriptor"], __decorateClass$7 = (_0x4ef1b5, _0x3eeb5f, _0x58ace2, _0x40227a) => {
  var _0x47f716 = _0x40227a > 1 ? void 0 : _0x40227a ? __getOwnPropDesc$7(_0x3eeb5f, _0x58ace2) : _0x3eeb5f;
  for (var _0x253cfa = _0x4ef1b5["length"] - 1, _0xfae943; _0x253cfa >= 0; _0x253cfa--) if (_0xfae943 = _0x4ef1b5[_0x253cfa]) _0x47f716 = (_0x40227a ? _0xfae943(_0x3eeb5f, _0x58ace2, _0x47f716) : _0xfae943(_0x47f716)) || _0x47f716;
  if (_0x40227a && _0x47f716) __defProp$6(_0x3eeb5f, _0x58ace2, _0x47f716);
  return _0x47f716;
};
const POSITION_STYLES = { "right-center": { "top": "50%", "right": "1rem", "bottom": "", "left": "", "transform": "translateY(-50%)" }, "top-right": { "top": "1rem", "right": "1rem", "bottom": "", "left": "", "transform": "" }, "bottom-right": { "bottom": "1rem", "right": "1rem", "top": "", "left": "", "transform": "" }, "top-center": { "top": "1rem", "left": "50%", "right": "", "bottom": "", "transform": "translateX(-50%)" }, "top-left": { "top": "1rem", "left": "1rem", "right": "", "bottom": "", "transform": "" }, "bottom-left": { "bottom": "1rem", "left": "1rem", "top": "", "right": "", "transform": "" }, "left-center": { "top": "50%", "left": "1rem", "right": "", "bottom": "", "transform": "translateY(-50%)" } }, BUILTIN_TOOLS = { "zoom": "tucbs-zoom-tool", "goto-coordinate": "tucbs-goto-coordinate", "draw": "tucbs-draw-tool", "delete": "tucbs-delete-tool", "measure": "tucbs-measure-tool", "map-export": "tucbs-map-export", "settings": "tucbs-settings-tool", "print": "tucbs-print-tool", "analysis": "tucbs-analysis-tool" }, CUSTOM_ELEMENT_NAME_PATTERN = /^[a-z][a-z0-9]*(-[a-z0-9]+)+$/;
let TucbsToolbar = class extends i$2 {
  constructor() {
    super(...arguments), this["mapElementId"] = "", this["position"] = "right-center", this["tools"] = "zoom", this["customTools"] = {}, this["toolProps"] = {}, this["customCss"] = "", this["_customCssState"] = { "sheet": null }, this["_timers"] = new TimerBag(this);
  }
  ["addTool"](_0x4ae82c, _0x1e5e41) {
    const _0x4ca050 = this["_toolIds"]();
    if (_0x1e5e41 === void 0) _0x4ca050["push"](_0x4ae82c);
    else _0x4ca050["splice"](_0x1e5e41, 0, _0x4ae82c);
    this["tools"] = _0x4ca050["join"](",");
  }
  ["removeTool"](_0x30c346) {
    this["tools"] = this["_toolIds"]()["filter"]((_0x2189f7) => _0x2189f7 !== _0x30c346)["join"](",");
  }
  ["registerTool"](_0x278f0f, _0x42d614) {
    if (!CUSTOM_ELEMENT_NAME_PATTERN["test"](_0x42d614)) {
      console["warn"]('[tucbs-toolbar] registerTool("' + _0x278f0f + '", "' + _0x42d614 + '") -- gecersiz custom element adi, yok sayildi.');
      return;
    }
    this["customTools"] = { ...this["customTools"], [_0x278f0f]: _0x42d614 };
  }
  ["setToolProps"](_0x584921, _0x538d43) {
    this["toolProps"] = { ...this["toolProps"], [_0x584921]: _0x538d43 };
  }
  ["_toolIds"]() {
    return this["tools"]["split"](",")["map"]((_0x376031) => _0x376031["trim"]())["filter"](Boolean);
  }
  ["_tagFor"](_0x45fd14) {
    const _0x13fbd8 = this["customTools"][_0x45fd14] ?? BUILTIN_TOOLS[_0x45fd14];
    if (_0x13fbd8 && !CUSTOM_ELEMENT_NAME_PATTERN["test"](_0x13fbd8)) return void 0;
    return _0x13fbd8;
  }
  ["willUpdate"](_0x2edb4d) {
    _0x2edb4d["has"]("position") && Object["assign"](this["style"], POSITION_STYLES[this["position"]]);
    if (_0x2edb4d["has"]("tools") || _0x2edb4d["has"]("customTools")) {
      const _0x3d9ef6 = this["_toolIds"]()["filter"]((_0x34e48d) => !this["_tagFor"](_0x34e48d));
      _0x3d9ef6["length"] > 0 && console["warn"]("[tucbs-toolbar] Bilinmeyen/gecersiz arac id'leri: " + _0x3d9ef6["join"](", ") + " -- yok sayildi (registerTool() ile kayit edilmedi ya da gecersiz etiket adi).");
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
    const _0x45124c = document["getElementById"](this["mapElementId"]);
    if (!_0x45124c) {
      console["warn"]('[tucbs-toolbar] mapElementId="' + this["mapElementId"] + '" ile eslesen bir element bulunamadi; bilesen haritaya baglanamadigi icin icerdeki araclar islevsiz kalacak.');
      return;
    }
    whenTucbsMapReady(_0x45124c, (_0x280411) => {
      _0x280411["map"] && (this["map"] = _0x280411["map"]);
    });
  }
  ["_renderTool"](_0x511c5e) {
    const _0x1fc17d = this["_tagFor"](_0x511c5e);
    if (!_0x1fc17d) return null;
    const _0x216f2e = s(_0x1fc17d);
    return u`<${_0x216f2e} data-tool-id=${_0x511c5e} .map=${this["map"]}></${_0x216f2e}>`;
  }
  ["_applyToolProps"]() {
    for (const [_0x3957e9, _0x51b5e7] of Object["entries"](this["toolProps"])) {
      const _0xc0e251 = this["renderRoot"]["querySelector"]('[data-tool-id="' + _0x3957e9 + '"]');
      if (_0xc0e251) Object["assign"](_0xc0e251, _0x51b5e7);
    }
  }
  ["updated"](_0x176174) {
    _0x176174["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_customCssState"], "tucbs-toolbar"), (_0x176174["has"]("toolProps") || _0x176174["has"]("map") || _0x176174["has"]("tools") || _0x176174["has"]("customTools")) && this["_applyToolProps"]();
  }
  ["render"]() {
    if (!this["map"]) return A;
    return u` <div class="toolbar">${this["_toolIds"]()["map"]((_0x3159a5) => this["_renderTool"](_0x3159a5))}</div> `;
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
var __defProp$5 = Object["defineProperty"], __getOwnPropDesc$6 = Object["getOwnPropertyDescriptor"], __decorateClass$6 = (_0x18fa88, _0x63f81c, _0x7a68f6, _0x576201) => {
  var _0x416871 = _0x576201 > 1 ? void 0 : _0x576201 ? __getOwnPropDesc$6(_0x63f81c, _0x7a68f6) : _0x63f81c;
  for (var _0x439f1b = _0x18fa88["length"] - 1, _0x6c0811; _0x439f1b >= 0; _0x439f1b--) if (_0x6c0811 = _0x18fa88[_0x439f1b]) _0x416871 = (_0x576201 ? _0x6c0811(_0x63f81c, _0x7a68f6, _0x416871) : _0x6c0811(_0x416871)) || _0x416871;
  if (_0x576201 && _0x416871) __defProp$5(_0x63f81c, _0x7a68f6, _0x416871);
  return _0x416871;
};
let TucbsInfoBar = class extends i$2 {
  constructor() {
    super(...arguments), this["mapElementId"] = "", this["customCss"] = "", this["attribution"] = "EPSG:4326 Altlık Harita, Harita Genel Müdürlüğü (HGM) tarafından sağlanmaktadır.", this["_customCssState"] = { "sheet": null }, this["_lon"] = null, this["_lat"] = null, this["_height"] = null, this["_scale"] = null, this["_mouseMoveRaf"] = null, this["_pendingMouseDetail"] = null, this["_cameraRaf"] = null, this["_timers"] = new TimerBag(this), this["_onMapMouseMove"] = (_0xd17b49) => {
      this["_pendingMouseDetail"] = _0xd17b49;
      if (this["_mouseMoveRaf"] !== null) return;
      this["_mouseMoveRaf"] = this["_timers"]["requestAnimationFrame"](() => {
        this["_mouseMoveRaf"] = null;
        const _0x4c2dfd = this["_pendingMouseDetail"];
        if (!_0x4c2dfd) return;
        const [_0x41ea2d, _0x51636a] = _0x4c2dfd["position"];
        this["_lon"] = _0x41ea2d, this["_lat"] = _0x51636a, this["_height"] = this["_sampleHeight"](_0x41ea2d, _0x51636a);
      });
    }, this["_onCameraChanged"] = () => {
      if (this["_cameraRaf"] !== null) return;
      this["_cameraRaf"] = this["_timers"]["requestAnimationFrame"](() => {
        this["_cameraRaf"] = null, this["_scale"] = this["_computeScale"]();
      });
    }, this["_onPostRender"] = () => {
      var _a2, _b;
      const _0x4f0123 = (_a2 = this["interactionManager"]) == null ? void 0 : _a2["camera"];
      if (!_0x4f0123) return;
      if ((_b = this["_lastCameraPosition"]) == null ? void 0 : _b["equals"](_0x4f0123["positionWC"])) return;
      this["_lastCameraPosition"] = _0x4f0123["positionWC"]["clone"](this["_lastCameraPosition"]), this["_onCameraChanged"]();
    };
  }
  ["firstUpdated"]() {
    if (this["interactionManager"] || !this["mapElementId"]) return;
    const _0x49ec95 = document["getElementById"](this["mapElementId"]);
    if (!_0x49ec95) return;
    whenTucbsMapReady(_0x49ec95, (_0xb3b5fb) => {
      _0xb3b5fb["interaction"] && (this["interactionManager"] = _0xb3b5fb["interaction"]);
    });
  }
  ["updated"](_0x28f90c) {
    _0x28f90c["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_customCssState"], "tucbs-info-bar");
    if (!_0x28f90c["has"]("interactionManager")) return;
    const _0x598945 = _0x28f90c["get"]("interactionManager");
    if (_0x598945) this["_unbind"](_0x598945);
    this["interactionManager"] && (this["_bind"](this["interactionManager"]), this["_scale"] = this["_computeScale"]());
  }
  ["disconnectedCallback"]() {
    if (this["interactionManager"]) this["_unbind"](this["interactionManager"]);
    super["disconnectedCallback"]();
  }
  ["_bind"](_0x257c10) {
    this["_removePostRender"] = _0x257c10["scene"]["postRender"]["addEventListener"](this["_onPostRender"]), _0x257c10["on"]("map:mousemove", this["_onMapMouseMove"]), _0x257c10["on"]("camera:changed", this["_onCameraChanged"]), _0x257c10["on"]("camera:moveEnd", this["_onCameraChanged"]);
  }
  ["_unbind"](_0x171273) {
    var _a2;
    (_a2 = this["_removePostRender"]) == null ? void 0 : _a2.call(this), this["_removePostRender"] = void 0, _0x171273["off"]("map:mousemove", this["_onMapMouseMove"]), _0x171273["off"]("camera:changed", this["_onCameraChanged"]), _0x171273["off"]("camera:moveEnd", this["_onCameraChanged"]);
  }
  ["_sampleHeight"](_0x36cb05, _0x5299ec) {
    var _a2;
    const _0x1142ec = (_a2 = this["interactionManager"]) == null ? void 0 : _a2["scene"]["globe"];
    if (!_0x1142ec) return 0;
    const _0x4dd79f = _0x1142ec["getHeight"](Cartographic["fromDegrees"](_0x36cb05, _0x5299ec));
    return _0x4dd79f ?? 0;
  }
  ["_computeScale"]() {
    var _a2;
    const _0xd5c185 = (_a2 = this["interactionManager"]) == null ? void 0 : _a2["scene"];
    if (!_0xd5c185) return null;
    const _0x1bca73 = measureGround(_0xd5c185);
    return _0x1bca73 ? snapScaleForDisplay(_0x1bca73["scale"]) : null;
  }
  ["_formatLat"]() {
    if (this["_lat"] === null) return "–";
    const _0x35e179 = this["_lat"] >= 0 ? "N" : "S";
    return "Enlem " + Math["abs"](this["_lat"])["toFixed"](5) + "° " + _0x35e179;
  }
  ["_formatLon"]() {
    if (this["_lon"] === null) return "–";
    const _0x2f66aa = this["_lon"] >= 0 ? "E" : "W";
    return "Boylam " + Math["abs"](this["_lon"])["toFixed"](5) + "° " + _0x2f66aa;
  }
  ["_formatHeight"]() {
    if (this["_height"] === null) return "–";
    return "Yükseklik " + Math["round"](this["_height"]) + " m";
  }
  ["_formatScale"]() {
    if (this["_scale"] === null || !Number["isFinite"](this["_scale"])) return "–";
    const _0x1715a7 = Math["round"](this["_scale"])["toLocaleString"]("tr-TR");
    return "Ölçek 1/" + _0x1715a7;
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
  constructor(_0x4aeea4) {
    var _a2;
    if (super(_0x4aeea4), _0x4aeea4["type"] !== t$2["ATTRIBUTE"] || "class" !== _0x4aeea4["name"] || ((_a2 = _0x4aeea4["strings"]) == null ? void 0 : _a2["length"]) > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  ["render"](_0xe3051a) {
    return " " + Object["keys"](_0xe3051a)["filter"]((_0x406b43) => _0xe3051a[_0x406b43])["join"](" ") + " ";
  }
  ["update"](_0x3ed10e, [_0x25c974]) {
    var _a2, _b;
    if (void 0 === this["st"]) {
      this["st"] = /* @__PURE__ */ new Set(), void 0 !== _0x3ed10e["strings"] && (this["nt"] = new Set(_0x3ed10e["strings"]["join"](" ")["split"](/\s/)["filter"]((_0x1e474d) => "" !== _0x1e474d)));
      for (const _0x5c8fbd in _0x25c974) _0x25c974[_0x5c8fbd] && !((_a2 = this["nt"]) == null ? void 0 : _a2["has"](_0x5c8fbd)) && this["st"]["add"](_0x5c8fbd);
      return this["render"](_0x25c974);
    }
    const _0x2e4652 = _0x3ed10e["element"]["classList"];
    for (const _0x338d9a of this["st"]) _0x338d9a in _0x25c974 || (_0x2e4652["remove"](_0x338d9a), this["st"]["delete"](_0x338d9a));
    for (const _0x1a7903 in _0x25c974) {
      const _0x2529c6 = !!_0x25c974[_0x1a7903];
      _0x2529c6 === this["st"]["has"](_0x1a7903) || ((_b = this["nt"]) == null ? void 0 : _b["has"](_0x1a7903)) || (_0x2529c6 ? (_0x2e4652["add"](_0x1a7903), this["st"]["add"](_0x1a7903)) : (_0x2e4652["remove"](_0x1a7903), this["st"]["delete"](_0x1a7903)));
    }
    return E;
  }
});
function deferredMeasure(_0x59fc9c, _0x42c1fe) {
  _0x59fc9c["requestAnimationFrame"](_0x42c1fe), _0x59fc9c["setTimeout"](_0x42c1fe, 150);
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
function stripHtml(_0x514a6e) {
  return _0x514a6e["replace"](/<[^>]*>/g, " ")["replace"](/\s+/g, " ")["trim"]();
}
function toResultItem(_0x48c9a0, _0x344960) {
  const _0x43650d = _0x48c9a0["layerId"] ? _0x344960 == null ? void 0 : _0x344960["getLayers"]()["find"]((_0xe41b0c) => _0xe41b0c["id"] === _0x48c9a0["layerId"]) : void 0, _0x481a2c = (_0x43650d == null ? void 0 : _0x43650d["title"]) ?? _0x48c9a0["layerId"] ?? _0x48c9a0["featureId"] ?? "—", _0x472453 = Object["entries"](_0x48c9a0["properties"])["filter"](([_0x2be562]) => _0x2be562 !== "layerId" && _0x2be562 !== "featureId");
  return { "layerTitle": _0x481a2c, "layerType": _0x43650d == null ? void 0 : _0x43650d["layerType"], "propertyEntries": _0x472453, "entity": _0x48c9a0["entity"] };
}
function toImageryResultItem(_0x218817, _0x324324) {
  const _0x49aa19 = _0x324324 == null ? void 0 : _0x324324["getLayers"]()["find"]((_0x396a48) => _0x396a48["cesiumObject"] === _0x218817["imageryLayer"]), _0x409f37 = (_0x49aa19 == null ? void 0 : _0x49aa19["title"]) ?? _0x218817["name"] ?? "—", _0x55deee = Object["entries"](_0x218817["properties"]);
  if (_0x55deee["length"] === 0 && _0x218817["description"]) {
    const _0x34349a = stripHtml(_0x218817["description"]);
    if (_0x34349a) return { "layerTitle": _0x409f37, "layerType": _0x49aa19 == null ? void 0 : _0x49aa19["layerType"], "propertyEntries": [["Bilgi", _0x34349a]], "geometryHint": _0x218817["geometryHint"] };
  }
  return { "layerTitle": _0x409f37, "layerType": _0x49aa19 == null ? void 0 : _0x49aa19["layerType"], "propertyEntries": _0x55deee, "geometryHint": _0x218817["geometryHint"] };
}
function toImageryResultItems(_0x11f3d8, _0x46e83c) {
  return _0x11f3d8["map"]((_0x14ffab) => toImageryResultItem(_0x14ffab, _0x46e83c))["filter"]((_0x887fbf) => _0x887fbf["propertyEntries"]["length"] > 0);
}
function pagedTableItems(_0x51664d, _0x455fe0, _0x2d7018) {
  const _0x5db398 = _0x455fe0 * _0x2d7018;
  return _0x51664d["slice"](_0x5db398, _0x5db398 + _0x2d7018);
}
function itemGlobalIndex(_0x22f309, _0x409dc7) {
  return _0x22f309["indexOf"](_0x409dc7) + 1;
}
const COMPACT_PANEL_MAX_WIDTH = 720, COMPACT_ITEM_BODY_CHROME = 34, VIEWPORT_MARGIN = 32;
function compactItemBodyMaxWidth(_0x4e6af8) {
  const _0x588b7c = Math["min"](COMPACT_PANEL_MAX_WIDTH, _0x4e6af8 - VIEWPORT_MARGIN);
  return Math["max"](0, _0x588b7c - COMPACT_ITEM_BODY_CHROME);
}
const WKT_PATTERN = /^\s*(?:MULTI)?(?:POINT|LINESTRING|POLYGON)|^\s*GEOMETRYCOLLECTION/i, NUMERIC_ARRAY_OR_COMMA = /\[-?[\d.eE+]+(?:,-?[\d.eE+]+)+\]|,/g;
function formatPropertyValue(_0x6a528b) {
  if (_0x6a528b === null || _0x6a528b === void 0) return "—";
  let _0x1f79bc = typeof _0x6a528b === "object" ? JSON["stringify"](_0x6a528b) : String(_0x6a528b);
  return WKT_PATTERN["test"](_0x1f79bc) && (_0x1f79bc = _0x1f79bc["replace"](new RegExp("(?<=\\d) (?=-?\\d)", "g"), " ")), _0x1f79bc["replace"](NUMERIC_ARRAY_OR_COMMA, (_0x5de4ee) => _0x5de4ee === "," ? ",​" : _0x5de4ee);
}
const NEUTRAL_VECTOR_CLICK_STATE = { "kind": "neutral" };
function toNeutral() {
  return NEUTRAL_VECTOR_CLICK_STATE;
}
function toEntityPending(_0x3e4b3a) {
  return { "kind": "entityPending", "pendingVectorClick": _0x3e4b3a };
}
function toEntityCommitted() {
  return { "kind": "entityCommitted" };
}
var __defProp$4 = Object["defineProperty"], __getOwnPropDesc$5 = Object["getOwnPropertyDescriptor"], __decorateClass$5 = (_0x85f56d, _0x4f1c66, _0x56b7d1, _0x1a307a) => {
  var _0x524943 = _0x1a307a > 1 ? void 0 : _0x1a307a ? __getOwnPropDesc$5(_0x4f1c66, _0x56b7d1) : _0x4f1c66;
  for (var _0x3bebad = _0x85f56d["length"] - 1, _0x37bd0f; _0x3bebad >= 0; _0x3bebad--) if (_0x37bd0f = _0x85f56d[_0x3bebad]) _0x524943 = (_0x1a307a ? _0x37bd0f(_0x4f1c66, _0x56b7d1, _0x524943) : _0x37bd0f(_0x524943)) || _0x524943;
  if (_0x1a307a && _0x524943) __defProp$4(_0x4f1c66, _0x56b7d1, _0x524943);
  return _0x524943;
};
function carbonIcon(_0x407830) {
  return o$1(iconNodeToString(_0x407830));
}
const ICON_LOCATION = carbonIcon(_16_default$i), ICON_INFORMATION = carbonIcon(_20_default$1), ICON_CLOSE$2 = carbonIcon(_16_default$v), ICON_ZOOM_IN = carbonIcon(_20_default), BASIC_DISMISS_MS = 4e3, IDENTIFY_PAGE_SIZE = 5, MAX_ITEM_TITLE_WIDTH = 250, ZOOM_FLIGHT_DURATION_SECONDS = 0.6;
function formatLat(_0x5d5323) {
  return Math["abs"](_0x5d5323)["toFixed"](5) + "° " + (_0x5d5323 >= 0 ? "N" : "S");
}
function formatLon(_0x546e68) {
  return Math["abs"](_0x546e68)["toFixed"](5) + "° " + (_0x546e68 >= 0 ? "E" : "W");
}
let TucbsIdentifyPanel = class extends i$2 {
  constructor() {
    super(...arguments), this["mapElementId"] = "", this["customCss"] = "", this["_customCssState"] = { "sheet": null }, this["_basicOpen"] = ![], this["_basicLon"] = 0, this["_basicLat"] = 0, this["_imageryPending"] = ![], this["_vectorClickState"] = NEUTRAL_VECTOR_CLICK_STATE, this["_tableOpen"] = ![], this["_tableItems"] = [], this["_tableLon"] = 0, this["_tableLat"] = 0, this["_accordionPage"] = 0, this["_tableSource"] = "vector", this["_timers"] = new TimerBag(this), this["_basicDismissTimer"] = null, this["_drag"] = new DraggablePanelController(this, { "getPanel": () => this["_attrPanelEl"], "ignoreSelector": ".attr-close-btn" }), this["_onMapClick"] = (_0x4eb8fe) => {
      var _a2;
      if ((_a2 = this["interactionManager"]) == null ? void 0 : _a2["isIdentifySuspended"]()) return;
      this["_tableOpen"] = ![], this["_imageryPending"] = ![], this["_vectorClickState"] = toNeutral();
      const [_0x213927, _0x41cb70] = _0x4eb8fe["position"];
      this["_timers"]["setTimeout"](() => {
        if (this["_imageryPending"]) return;
        this["_basicLon"] = _0x213927, this["_basicLat"] = _0x41cb70, this["_basicOpen"] = !![], this["_scheduleBasicDismiss"]();
      }, 0);
    }, this["_onInteractionSuspend"] = () => {
      this["_closeBasic"]();
    }, this["_onImageryQuerying"] = () => {
      var _a2;
      if ((_a2 = this["interactionManager"]) == null ? void 0 : _a2["isIdentifySuspended"]()) return;
      this["_imageryPending"] = !![];
    }, this["_compactItemBoxGeneration"] = new AsyncGeneration(), this["_itemTitleGroupWidthGeneration"] = new AsyncGeneration(), this["_onEntityClick"] = (_0x5c45d3) => {
      var _a2;
      if ((_a2 = this["interactionManager"]) == null ? void 0 : _a2["isIdentifySuspended"]()) return;
      this["_imageryPending"] = ![];
      const [_0x57c409, _0x4a9ff1] = _0x5c45d3["position"];
      this["_vectorClickState"] = toEntityPending({ "items": _0x5c45d3["features"]["map"]((_0x429d95) => toResultItem(_0x429d95, this["layerManager"])), "lon": _0x57c409, "lat": _0x4a9ff1 }), this["_timers"]["setTimeout"](() => {
        if (this["_vectorClickState"]["kind"] !== "entityPending" || this["_imageryPending"]) return;
        const { pendingVectorClick: _0x586045 } = this["_vectorClickState"];
        this["_openTable"](_0x586045["items"], _0x586045["lon"], _0x586045["lat"], "vector");
      }, 0);
    }, this["_onImageryClick"] = (_0x300bf1) => {
      var _a2;
      if ((_a2 = this["interactionManager"]) == null ? void 0 : _a2["isIdentifySuspended"]()) return;
      this["_imageryPending"] = ![];
      if (this["_vectorClickState"]["kind"] !== "neutral") {
        const _0x3d5839 = toImageryResultItems(_0x300bf1["features"], this["layerManager"]);
        if (this["_vectorClickState"]["kind"] === "entityPending") {
          const { pendingVectorClick: _0xf3fbdb } = this["_vectorClickState"], _0x4f1a7c = _0xf3fbdb["items"];
          this["_openTable"]([..._0x4f1a7c, ..._0x3d5839], _0xf3fbdb["lon"], _0xf3fbdb["lat"], _0x3d5839["length"] > 0 ? "mixed" : "vector");
          return;
        }
        this["_tableOpen"] && _0x3d5839["length"] > 0 && (this["_tableItems"] = [...this["_tableItems"], ..._0x3d5839], this["_tableSource"] = "mixed");
        return;
      }
      const _0x54479d = toImageryResultItems(_0x300bf1["features"], this["layerManager"]), [_0x46234e, _0x583bf0] = _0x300bf1["position"];
      if (_0x54479d["length"] === 0) {
        showToast("info", "Bu konumda öznitelik bilgisi bulunamadı."), this["_basicLon"] = _0x46234e, this["_basicLat"] = _0x583bf0, this["_basicOpen"] = !![], this["_scheduleBasicDismiss"]();
        return;
      }
      this["_openTable"](_0x54479d, _0x46234e, _0x583bf0, "imagery");
    }, this["_onAccordionItemBeforeToggle"] = (_0x3ff952) => {
      const _0x33b1b3 = _0x3ff952["detail"];
      if (_0x33b1b3["open"]) return;
      const _0x3a3dff = _0x3ff952["currentTarget"], _0x5dc6fb = _0x3a3dff["querySelectorAll"]("cds-accordion-item"), _0x142d5e = Array["from"](_0x5dc6fb)["filter"]((_0x3270e8) => _0x3270e8["open"])["length"];
      if (_0x142d5e <= 1) _0x3ff952["preventDefault"]();
    }, this["_onAccordionItemToggled"] = (_0x2976ec) => {
      const _0x23173c = _0x2976ec["detail"];
      if (_0x23173c["open"]) {
        const _0x138278 = _0x2976ec["target"], _0x4920df = _0x2976ec["currentTarget"];
        for (const _0x448890 of _0x4920df["querySelectorAll"]("cds-accordion-item")) {
          if (_0x448890 !== _0x138278) _0x448890["open"] = ![];
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
    const _0x3e0d2b = this["_attrPanelEl"];
    if (!_0x3e0d2b) return;
    if (!this["_isCompactPanel"] || this["_tableItems"]["length"] <= 1) {
      _0x3e0d2b["style"]["removeProperty"]("--tucbs-item-min-width"), _0x3e0d2b["style"]["removeProperty"]("--tucbs-item-min-height");
      return;
    }
    const _0x19d293 = this["_compactItemBoxGeneration"]["next"](), _0x3ce4c5 = this["_tableItems"], _0x2068a9 = document["createElement"]("div");
    _0x2068a9["style"]["cssText"] = "position:fixed;top:-99999px;left:-99999px;visibility:hidden;width:max-content;max-width:" + compactItemBodyMaxWidth(window["innerWidth"]) + "px;", (_a2 = this["shadowRoot"]) == null ? void 0 : _a2["appendChild"](_0x2068a9);
    let _0x2acf50 = 0, _0x29737e = 0;
    for (const _0x4bf53f of _0x3ce4c5) {
      const _0x913d0f = document["createElement"]("div");
      _0x913d0f["className"] = "item-body", _0x2068a9["replaceChildren"](_0x913d0f), D(this["_renderPropertyTable"](_0x4bf53f["propertyEntries"]), _0x913d0f), await new Promise((_0x1f55b7) => this["_timers"]["requestAnimationFrame"](() => _0x1f55b7()));
      if (!this["_compactItemBoxGeneration"]["isCurrent"](_0x19d293)) {
        _0x2068a9["remove"]();
        return;
      }
      const _0x53d811 = _0x913d0f["getBoundingClientRect"]();
      _0x2acf50 = Math["max"](_0x2acf50, _0x53d811["width"]), _0x29737e = Math["max"](_0x29737e, _0x53d811["height"]);
    }
    _0x2068a9["remove"]();
    if (!this["_compactItemBoxGeneration"]["isCurrent"](_0x19d293)) return;
    if (_0x2acf50 > 0) _0x3e0d2b["style"]["setProperty"]("--tucbs-item-min-width", Math["ceil"](_0x2acf50) + "px");
    if (_0x29737e > 0) _0x3e0d2b["style"]["setProperty"]("--tucbs-item-min-height", Math["ceil"](_0x29737e) + "px");
  }
  async ["_syncItemTitleGroupWidth"]() {
    var _a2;
    const _0x1cfe29 = this["_attrPanelEl"];
    if (!_0x1cfe29) return;
    if (this["_tableItems"]["length"] <= 1) {
      _0x1cfe29["style"]["removeProperty"]("--tucbs-item-title-width"), _0x1cfe29["style"]["removeProperty"]("--tucbs-item-suffix-width"), _0x1cfe29["style"]["removeProperty"]("--tucbs-item-tag-width");
      return;
    }
    const _0x29eb36 = this["_itemTitleGroupWidthGeneration"]["next"](), _0x1f1904 = this["_tableItems"], _0x467dc0 = document["createElement"]("cds-accordion-item");
    _0x467dc0["style"]["cssText"] = "position:fixed;top:-99999px;left:-99999px;visibility:hidden;", (_a2 = this["shadowRoot"]) == null ? void 0 : _a2["appendChild"](_0x467dc0);
    let _0x1cf8e3 = 0, _0x4080b7 = 0, _0x2a503f = 0;
    for (const _0x56f43e of _0x1f1904) {
      const _0xabdb07 = document["createElement"]("span");
      _0xabdb07["slot"] = "title", _0xabdb07["className"] = "item-title-group";
      const _0x218f76 = document["createElement"]("span");
      _0x218f76["className"] = "item-title-text", _0x218f76["textContent"] = _0x56f43e["layerTitle"], _0xabdb07["appendChild"](_0x218f76);
      const _0x5c4d78 = document["createElement"]("span");
      _0x5c4d78["className"] = "item-title-suffix", _0x5c4d78["textContent"] = String(this["_itemGlobalIndex"](_0x56f43e)), _0xabdb07["appendChild"](_0x5c4d78);
      const _0x3f2f89 = !!_0x56f43e["layerType"] && _0x56f43e["layerType"] !== "DRAWING" && _0x56f43e["layerType"] !== "MEASURE";
      let _0x582b67 = null;
      _0x3f2f89 && (_0x582b67 = document["createElement"]("span"), _0x582b67["className"] = "attr-type-tag", _0x582b67["textContent"] = _0x56f43e["layerType"], _0xabdb07["appendChild"](_0x582b67));
      _0x467dc0["replaceChildren"](_0xabdb07), await new Promise((_0x2cd4b6) => this["_timers"]["requestAnimationFrame"](() => _0x2cd4b6()));
      if (!this["_itemTitleGroupWidthGeneration"]["isCurrent"](_0x29eb36)) {
        _0x467dc0["remove"]();
        return;
      }
      _0x1cf8e3 = Math["max"](_0x1cf8e3, _0x218f76["getBoundingClientRect"]()["width"]), _0x4080b7 = Math["max"](_0x4080b7, _0x5c4d78["getBoundingClientRect"]()["width"]);
      if (_0x582b67) _0x2a503f = Math["max"](_0x2a503f, _0x582b67["getBoundingClientRect"]()["width"]);
    }
    _0x467dc0["remove"]();
    if (!this["_itemTitleGroupWidthGeneration"]["isCurrent"](_0x29eb36)) return;
    const _0x333eaf = Math["min"](Math["ceil"](_0x1cf8e3), MAX_ITEM_TITLE_WIDTH);
    if (_0x333eaf > 0) _0x1cfe29["style"]["setProperty"]("--tucbs-item-title-width", _0x333eaf + "px");
    if (_0x4080b7 > 0) _0x1cfe29["style"]["setProperty"]("--tucbs-item-suffix-width", Math["ceil"](_0x4080b7) + "px");
    if (_0x2a503f > 0) _0x1cfe29["style"]["setProperty"]("--tucbs-item-tag-width", Math["ceil"](_0x2a503f) + "px");
  }
  get ["_pagedTableItems"]() {
    return pagedTableItems(this["_tableItems"], this["_accordionPage"], IDENTIFY_PAGE_SIZE);
  }
  ["_goToAccordionPage"](_0x275832) {
    this["_accordionPage"] = Math["max"](0, Math["min"](_0x275832, this["_accordionPageCount"] - 1));
  }
  ["_itemGlobalIndex"](_0x3a8034) {
    return itemGlobalIndex(this["_tableItems"], _0x3a8034);
  }
  ["_openTable"](_0x46d3c5, _0x240554, _0x5ae827, _0x340be4) {
    this["_vectorClickState"] = toEntityCommitted(), this["_basicOpen"] = ![], this["_clearBasicDismiss"]();
    for (const _0x84d658 of document["querySelectorAll"]("tucbs-style-editor")) {
      if (_0x84d658["open"]) _0x84d658["close"]();
    }
    this["_tableSource"] = _0x340be4, this["_tableItems"] = _0x46d3c5, this["_accordionPage"] = 0, this["_tableLon"] = _0x240554, this["_tableLat"] = _0x5ae827, this["_tableOpen"] = !![];
  }
  ["_resetAccordionOpen"]() {
    const _0x22e4b0 = () => {
      var _a2;
      const _0x2d917b = (_a2 = this["shadowRoot"]) == null ? void 0 : _a2["querySelectorAll"]("cds-accordion-item:not(.accordion-filler)");
      _0x2d917b == null ? void 0 : _0x2d917b["forEach"]((_0xe735f4, _0x1452b0) => {
        _0xe735f4["open"] = _0x1452b0 === 0;
      });
    };
    deferredMeasure(this["_timers"], _0x22e4b0);
  }
  ["_openAccordionItem"](_0x516f6b) {
    var _a2;
    const _0x1fa91e = (_a2 = this["shadowRoot"]) == null ? void 0 : _a2["querySelectorAll"]("cds-accordion-item:not(.accordion-filler)");
    _0x1fa91e == null ? void 0 : _0x1fa91e["forEach"]((_0x232027, _0x5a4d5b) => {
      _0x232027["open"] = _0x5a4d5b === _0x516f6b;
    }), this["_scheduleScrollThumbSync"]();
  }
  ["firstUpdated"]() {
    if (!this["mapElementId"]) return;
    const _0x34a42c = document["getElementById"](this["mapElementId"]);
    if (!_0x34a42c) return;
    const _0x45a5ff = () => {
      !this["interactionManager"] && _0x34a42c["interaction"] && (this["interactionManager"] = _0x34a42c["interaction"]), !this["layerManager"] && _0x34a42c["layerManager"] && (this["layerManager"] = _0x34a42c["layerManager"]);
    };
    whenTucbsMapReady(_0x34a42c, _0x45a5ff);
  }
  ["updated"](_0x5e5b23) {
    var _a2, _b, _c, _d;
    _0x5e5b23["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_customCssState"], "tucbs-identify-panel");
    if (_0x5e5b23["has"]("interactionManager")) {
      const _0x53dae1 = _0x5e5b23["get"]("interactionManager");
      if (_0x53dae1) this["_unbind"](_0x53dae1);
      if (this["interactionManager"]) this["_bind"](this["interactionManager"]);
    }
    _0x5e5b23["has"]("_tableOpen") && this["_tableOpen"] && ((_a2 = this["_attrPanelEl"]) == null ? void 0 : _a2["style"]["removeProperty"]("left"), (_b = this["_attrPanelEl"]) == null ? void 0 : _b["style"]["removeProperty"]("top"), (_c = this["_attrPanelEl"]) == null ? void 0 : _c["style"]["removeProperty"]("transform")), _0x5e5b23["has"]("_tableOpen") && !this["_tableOpen"] && ((_d = this["layerManager"]) == null ? void 0 : _d["clearHighlight"]()), (_0x5e5b23["has"]("_tableOpen") || _0x5e5b23["has"]("_tableItems")) && (this["_scheduleScrollThumbSync"](), void this["_syncCompactItemBox"](), void this["_syncItemTitleGroupWidth"]()), (_0x5e5b23["has"]("_tableOpen") || _0x5e5b23["has"]("_tableItems") || _0x5e5b23["has"]("_accordionPage")) && this["_resetAccordionOpen"]();
  }
  ["disconnectedCallback"]() {
    if (this["interactionManager"]) this["_unbind"](this["interactionManager"]);
    this["_clearBasicDismiss"](), super["disconnectedCallback"]();
  }
  ["_bind"](_0x5c4e97) {
    _0x5c4e97["on"]("map:click", this["_onMapClick"]), _0x5c4e97["on"]("interaction:suspend", this["_onInteractionSuspend"]), _0x5c4e97["on"]("entity:click", this["_onEntityClick"]), _0x5c4e97["on"]("imagery:click", this["_onImageryClick"]), _0x5c4e97["on"]("imagery:querying", this["_onImageryQuerying"]);
  }
  ["_unbind"](_0x58cddb) {
    _0x58cddb["off"]("map:click", this["_onMapClick"]), _0x58cddb["off"]("interaction:suspend", this["_onInteractionSuspend"]), _0x58cddb["off"]("entity:click", this["_onEntityClick"]), _0x58cddb["off"]("imagery:click", this["_onImageryClick"]), _0x58cddb["off"]("imagery:querying", this["_onImageryQuerying"]);
  }
  ["_scheduleBasicDismiss"]() {
    this["_clearBasicDismiss"](), this["_basicDismissTimer"] = this["_timers"]["setTimeout"](() => {
      this["_basicDismissTimer"] = null, this["_basicOpen"] = ![];
    }, BASIC_DISMISS_MS);
  }
  ["_clearBasicDismiss"]() {
    this["_timers"]["clearTimeout"](this["_basicDismissTimer"]), this["_basicDismissTimer"] = null;
  }
  ["_syncScrollThumbFor"](_0x1ef25f) {
    const _0x2b02df = _0x1ef25f["closest"](".attr-body-wrap, .item-body-wrap"), _0x168017 = _0x2b02df == null ? void 0 : _0x2b02df["querySelector"](".scroll-thumb, .item-scroll-thumb");
    if (_0x168017) syncVirtualScrollbar(_0x1ef25f, _0x168017);
  }
  ["_scheduleScrollThumbSync"]() {
    const _0x2bc64a = () => {
      var _a2;
      (_a2 = this["shadowRoot"]) == null ? void 0 : _a2["querySelectorAll"](".attr-body, .item-body")["forEach"]((_0xce55a0) => this["_syncScrollThumbFor"](_0xce55a0));
    };
    deferredMeasure(this["_timers"], _0x2bc64a);
  }
  ["_startThumbDrag"](_0x374ac3) {
    const _0x41be38 = _0x374ac3["currentTarget"], _0x1ad889 = _0x41be38["closest"](".attr-body-wrap, .item-body-wrap"), _0x6811a7 = _0x1ad889 == null ? void 0 : _0x1ad889["querySelector"](".attr-body, .item-body");
    if (!_0x6811a7) return;
    startVirtualScrollbarDrag(_0x374ac3, _0x6811a7);
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
  ["_zoomToItem"](_0x2b95b3, _0x5a72aa) {
    var _a2, _b, _c, _d, _e, _f, _g, _h;
    (_a2 = this["layerManager"]) == null ? void 0 : _a2["clearHighlight"]();
    if (_0x2b95b3["entity"]) void ((_b = this["layerManager"]) == null ? void 0 : _b["zoomToEntity"](_0x2b95b3["entity"], { "duration": ZOOM_FLIGHT_DURATION_SECONDS })), (_c = this["layerManager"]) == null ? void 0 : _c["highlightEntity"](_0x2b95b3["entity"]);
    else {
      if (((_d = _0x2b95b3["geometryHint"]) == null ? void 0 : _d["kind"]) === "extent") {
        const { west: _0x588250, south: _0x4629b6, east: _0x31285f, north: _0x2c89d } = _0x2b95b3["geometryHint"];
        (_e = this["interactionManager"]) == null ? void 0 : _e["flyToExtent"](_0x588250, _0x4629b6, _0x31285f, _0x2c89d, { "duration": ZOOM_FLIGHT_DURATION_SECONDS });
      } else {
        if (((_f = _0x2b95b3["geometryHint"]) == null ? void 0 : _f["kind"]) === "point") {
          const { longitude: _0x10028b, latitude: _0x5611ee } = _0x2b95b3["geometryHint"];
          (_g = this["interactionManager"]) == null ? void 0 : _g["flyToPosition"](_0x10028b, _0x5611ee, { "duration": ZOOM_FLIGHT_DURATION_SECONDS });
        } else (_h = this["interactionManager"]) == null ? void 0 : _h["flyToPosition"](this["_tableLon"], this["_tableLat"], { "duration": ZOOM_FLIGHT_DURATION_SECONDS });
      }
    }
    if (_0x5a72aa !== void 0) this["_openAccordionItem"](_0x5a72aa);
  }
  ["_renderZoomButton"](_0x265c8a, _0x1312a2) {
    const _0x2a8be4 = () => this["_zoomToItem"](_0x265c8a, _0x1312a2);
    return b`
      <span
        class="zoom-btn"
        role="button"
        tabindex="0"
        title="Yakınlaş"
        aria-label="Yakınlaş"
        @click=${(_0x1a5ffb) => {
      _0x1a5ffb["stopPropagation"](), _0x2a8be4();
    }}
        @keydown=${(_0x537d2d) => {
      if (_0x537d2d["key"] !== "Enter" && _0x537d2d["key"] !== " ") return;
      _0x537d2d["preventDefault"](), _0x537d2d["stopPropagation"](), _0x2a8be4();
    }}
      >
        ${ICON_ZOOM_IN}
      </span>
    `;
  }
  ["_renderPropertyTable"](_0x13d676) {
    return _0x13d676["length"] === 0 ? b`<div class="attr-empty">Öznitelik bilgisi bulunamadı.</div>` : b`
          <cds-table size="sm" use-zebra-styles use-static-width>
            <cds-table-head>
              <cds-table-header-row>
                <cds-table-header-cell>Alan</cds-table-header-cell>
                <cds-table-header-cell>Değer</cds-table-header-cell>
              </cds-table-header-row>
            </cds-table-head>
            <cds-table-body>
              ${_0x13d676["map"](([_0x301c69, _0x236281]) => b`
                  <cds-table-row>
                    <cds-table-cell>${_0x301c69}</cds-table-cell>
                    <cds-table-cell>${formatPropertyValue(_0x236281)}</cds-table-cell>
                  </cds-table-row>
                `)}
            </cds-table-body>
          </cds-table>
        `;
  }
  ["render"]() {
    const _0x66b596 = this["_tableItems"]["length"] === 1 ? this["_tableItems"][0] : void 0, _0x3aac6f = !_0x66b596 ? A : b`
      <div class="attr-breadcrumb ${_0x66b596 ? "attr-breadcrumb-single" : ""}">
        ${(_0x66b596 == null ? void 0 : _0x66b596["layerType"]) && _0x66b596["layerType"] !== "DRAWING" && _0x66b596["layerType"] !== "MEASURE" ? b`<span class="attr-type-tag">${_0x66b596["layerType"]}</span>` : A}
        ${_0x66b596 ? this["_renderZoomButton"](_0x66b596) : A}
        ${_0x66b596 ? b`<span class="attr-layer-title" title=${_0x66b596["layerTitle"]}>${_0x66b596["layerTitle"]}</span>` : A}
      </div>
    `, _0x56263c = _0x66b596 ? b`
          <div class="attr-body-wrap">
            <div class="attr-body" @scroll=${(_0x5d93d3) => this["_syncScrollThumbFor"](_0x5d93d3["currentTarget"])}>
              ${this["_renderPropertyTable"](_0x66b596["propertyEntries"])}
            </div>
            <div class="scroll-thumb" @pointerdown=${(_0x3e1263) => this["_startThumbDrag"](_0x3e1263)}></div>
          </div>
        ` : b`
          <div class="accordion-wrap">
            <cds-accordion
              size="sm"
              @cds-accordion-item-beingtoggled=${this["_onAccordionItemBeforeToggle"]}
              @cds-accordion-item-toggled=${this["_onAccordionItemToggled"]}
            >
              ${this["_pagedTableItems"]["map"]((_0x2e5ddd, _0x1be84a) => b`
                  <cds-accordion-item title=${_0x2e5ddd["layerTitle"]} ?open=${_0x1be84a === 0}>
                    <span slot="title" class="item-title">
                      <span class="item-title-group">
                        <span class="item-title-text">${_0x2e5ddd["layerTitle"]}</span>
                        <span class="item-title-suffix">${this["_itemGlobalIndex"](_0x2e5ddd)}</span>
                        <span class="item-title-tag-slot">
                          ${_0x2e5ddd["layerType"] && _0x2e5ddd["layerType"] !== "DRAWING" && _0x2e5ddd["layerType"] !== "MEASURE" ? b`<span class="attr-type-tag">${_0x2e5ddd["layerType"]}</span>` : A}
                        </span>
                      </span>
                      ${this["_renderZoomButton"](_0x2e5ddd, _0x1be84a)}
                    </span>
                    <div class="item-body-wrap">
                      <div class="item-body" @scroll=${(_0x3b09b1) => this["_syncScrollThumbFor"](_0x3b09b1["currentTarget"])}>
                        ${this["_renderPropertyTable"](_0x2e5ddd["propertyEntries"])}
                      </div>
                      <div class="item-scroll-thumb" @pointerdown=${(_0x306a77) => this["_startThumbDrag"](_0x306a77)}></div>
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
        <div class="attr-header" @pointerdown=${(_0x4f1454) => this["_drag"]["start"](_0x4f1454)}>
          <div class="attr-header-title-group">
            <span class="attr-header-icon">${ICON_INFORMATION}</span>
            <div class="attr-header-text">
              <span class="attr-title">Konum/Bilgi Al</span>
            </div>
          </div>
          ${_0x66b596 ? A : b`<span class="attr-result-count">${this["_tableItems"]["length"]} sonuç bulundu</span>`}
          <button type="button" class="attr-close-btn" aria-label="Kapat" @click=${() => this["_closeTable"]()}>
            ${ICON_CLOSE$2}
          </button>
        </div>

        ${_0x3aac6f}

        ${_0x56263c}

        <div class="attr-footer">
          <span>Enlem/Boylam</span>
          <span class="attr-footer-value">${formatLat(this["_tableLat"])}, ${formatLon(this["_tableLon"])}</span>
        </div>
      </div>
    `;
  }
};
TucbsIdentifyPanel["styles"] = identifyPanelStyles, __decorateClass$5([n$1({ "attribute": ![] })], TucbsIdentifyPanel["prototype"], "interactionManager", 2), __decorateClass$5([n$1({ "attribute": ![] })], TucbsIdentifyPanel["prototype"], "layerManager", 2), __decorateClass$5([n$1()], TucbsIdentifyPanel["prototype"], "mapElementId", 2), __decorateClass$5([n$1({ "attribute": "custom-css" })], TucbsIdentifyPanel["prototype"], "customCss", 2), __decorateClass$5([r()], TucbsIdentifyPanel["prototype"], "_basicOpen", 2), __decorateClass$5([r()], TucbsIdentifyPanel["prototype"], "_basicLon", 2), __decorateClass$5([r()], TucbsIdentifyPanel["prototype"], "_basicLat", 2), __decorateClass$5([r()], TucbsIdentifyPanel["prototype"], "_imageryPending", 2), __decorateClass$5([r()], TucbsIdentifyPanel["prototype"], "_tableOpen", 2), __decorateClass$5([r()], TucbsIdentifyPanel["prototype"], "_tableItems", 2), __decorateClass$5([r()], TucbsIdentifyPanel["prototype"], "_tableLon", 2), __decorateClass$5([r()], TucbsIdentifyPanel["prototype"], "_tableLat", 2), __decorateClass$5([r()], TucbsIdentifyPanel["prototype"], "_accordionPage", 2), __decorateClass$5([r()], TucbsIdentifyPanel["prototype"], "_tableSource", 2), __decorateClass$5([e$3(".attr-panel")], TucbsIdentifyPanel["prototype"], "_attrPanelEl", 2), TucbsIdentifyPanel = __decorateClass$5([t$3("tucbs-identify-panel")], TucbsIdentifyPanel);
var __defProp$3 = Object["defineProperty"], __getOwnPropDesc$4 = Object["getOwnPropertyDescriptor"], __decorateClass$4 = (_0x146a32, _0x33a443, _0x4784e3, _0x883534) => {
  var _0x49d0fc = _0x883534 > 1 ? void 0 : _0x883534 ? __getOwnPropDesc$4(_0x33a443, _0x4784e3) : _0x33a443;
  for (var _0x3c23d1 = _0x146a32["length"] - 1, _0x3e0fea; _0x3c23d1 >= 0; _0x3c23d1--) if (_0x3e0fea = _0x146a32[_0x3c23d1]) _0x49d0fc = (_0x883534 ? _0x3e0fea(_0x33a443, _0x4784e3, _0x49d0fc) : _0x3e0fea(_0x49d0fc)) || _0x49d0fc;
  if (_0x883534 && _0x49d0fc) __defProp$3(_0x33a443, _0x4784e3, _0x49d0fc);
  return _0x49d0fc;
};
const FORMATS = { "geojson": { "extension": ".geojson", "mime": "application/geo+json", "layerType": "GEOJSON", "label": "GeoJSON" }, "kml": { "extension": ".kml", "mime": "application/vnd.google-earth.kml+xml", "layerType": "KML", "label": "KML" }, "kmz": { "extension": ".kmz", "mime": "application/vnd.google-earth.kmz", "layerType": "KMZ", "label": "KMZ" }, "shp": { "extension": ".zip", "mime": "application/zip", "layerType": "SHP", "label": "SHP(ZIP)" }, "csv": { "extension": ".csv", "mime": "text/csv", "layerType": "CSV", "label": "CSV" } }, ALL_FORMATS = ["geojson", "kml", "kmz", "shp", "csv"], ICON_CLOSE$1 = o$1(iconNodeToString(_16_default$v)), ICON_DOCUMENT_ADD = o$1(iconNodeToString(_16_default$s));
let TucbsFileUpload = class extends i$2 {
  constructor() {
    super(...arguments), this["open"] = ![], this["mapElementId"] = "", this["acceptedTypes"] = "", this["maxFileSizeMb"] = 50, this["dragDrop"] = !![], this["customCss"] = "", this["_error"] = "", this["_uploading"] = ![], this["_customCssState"] = { "sheet": null }, this["_drag"] = new DraggablePanelController(this, { "getPanel": () => this, "ignoreSelector": ".close-btn" });
  }
  ["firstUpdated"]() {
    if (this["layerManager"] || !this["mapElementId"]) return;
    const _0xc4e822 = document["getElementById"](this["mapElementId"]);
    if (!_0xc4e822) return;
    _0xc4e822["layerManager"] ? this["layerManager"] = _0xc4e822["layerManager"] : _0xc4e822["addEventListener"]("ready", () => {
      if (_0xc4e822["layerManager"]) this["layerManager"] = _0xc4e822["layerManager"];
    }, { "once": !![] });
  }
  ["updated"](_0xbc310d) {
    _0xbc310d["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_customCssState"], "tucbs-file-upload"), _0xbc310d["has"]("open") && this["open"] && (this["style"]["removeProperty"]("left"), this["style"]["removeProperty"]("top"), this["style"]["removeProperty"]("transform"));
  }
  ["disconnectedCallback"]() {
    destroyToast(), super["disconnectedCallback"]();
  }
  ["_close"]() {
    this["open"] = ![], this["_error"] = "", this["dispatchEvent"](new CustomEvent("tucbs-file-upload-closed", { "bubbles": !![], "composed": !![] }));
  }
  ["_activeFormats"]() {
    const _0x514879 = this["acceptedTypes"]["split"](",")["map"]((_0x436746) => _0x436746["trim"]()["toLowerCase"]())["filter"]((_0x555cdf) => ALL_FORMATS["includes"](_0x555cdf));
    return _0x514879["length"] > 0 ? _0x514879 : [...ALL_FORMATS];
  }
  ["_detectFormat"](_0x4a2d3c) {
    const _0x55216c = _0x4a2d3c["toLowerCase"]();
    return ALL_FORMATS["find"]((_0x58cd7c) => _0x55216c["endsWith"](FORMATS[_0x58cd7c]["extension"]));
  }
  async ["_handleFileAdded"](_0x574da3) {
    this["_error"] = "", destroyToast();
    const _0x19a637 = _0x574da3[0];
    if (!_0x19a637) return;
    const _0x24419d = this["_activeFormats"](), _0x2b96cb = this["_detectFormat"](_0x19a637["name"]);
    if (!_0x2b96cb || !_0x24419d["includes"](_0x2b96cb)) {
      const _0x365615 = _0x24419d["map"]((_0x3ad6d9) => FORMATS[_0x3ad6d9]["label"])["join"](", ");
      this["_error"] = "Sadece " + _0x365615 + " dosyaları desteklenir.";
      return;
    }
    const _0x13725e = this["layerManager"];
    if (!_0x13725e) {
      this["_error"] = "Harita hazır değil, katman eklenemedi.";
      return;
    }
    const { layerType: _0xa72502, extension: _0x53fb15 } = FORMATS[_0x2b96cb], _0x261201 = _0x19a637["name"]["replace"](new RegExp("\\" + _0x53fb15 + "$", "i"), ""), _0x529460 = "upload-" + _0x261201 + "-" + Date["now"](), _0x8e49c1 = (_0x4a7498) => {
      if (_0x4a7498["id"] !== _0x529460) return;
      showToast("info", _0x4a7498["fromEpsg"] + " → " + _0x4a7498["toEpsg"] + " (WGS84) dönüştürüldü.");
    }, _0x395373 = (_0xcb41aa) => {
      if (_0xcb41aa["id"] !== _0x529460) return;
      showToast("warning", "Koordinat sistemi tanınamadı; WGS84 kabul edilerek yüklendi.");
    };
    _0x13725e["on"]("layer:crs-reprojected", _0x8e49c1), _0x13725e["on"]("layer:crs-unresolved", _0x395373), this["_close"](), this["_uploading"] = !![], beginBusy("Katman yükleniyor…"), await new Promise((_0x31778a) => setTimeout(_0x31778a, 200));
    try {
      await _0x13725e["add"](_0xa72502, { "id": _0x529460, "title": _0x261201, "data": _0x19a637, "layerType": _0xa72502, "clampToGround": !![] });
    } catch (_0x573aae) {
      _0x573aae instanceof TucbsError ? console["error"]("[tucbs-file-upload] " + _0x573aae["code"] + " (" + _0x573aae["number"] + "): " + _0x573aae["message"]) : console["error"](_0x573aae), showToast("error", _0x573aae instanceof Error ? _0x573aae["message"] : String(_0x573aae));
    } finally {
      _0x13725e["off"]("layer:crs-reprojected", _0x8e49c1), _0x13725e["off"]("layer:crs-unresolved", _0x395373), this["_uploading"] = ![], endBusy();
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
    const _0x40f125 = this["_activeFormats"](), _0x1c50f0 = _0x40f125["map"]((_0x5e40f6) => {
      const { extension: _0x350b0c, mime: _0x4090ff } = FORMATS[_0x5e40f6];
      return _0x4090ff ? _0x350b0c + "," + _0x4090ff : _0x350b0c;
    })["join"](","), _0x3ada55 = _0x40f125["map"]((_0x2fd563) => FORMATS[_0x2fd563]["label"])["join"](", ");
    return b`
      <div class="panel">
        <div class="header" @pointerdown=${(_0xaea5b4) => this["_drag"]["start"](_0xaea5b4)}>
          <span class="title"><span class="title-icon">${ICON_DOCUMENT_ADD}</span>Veri Dosyası Ekle</span>
          <button type="button" class="close-btn" aria-label="Kapat" @click=${() => this["_close"]()}>
            ${ICON_CLOSE$1}
          </button>
        </div>

        <div class="body">
          <cds-file-uploader-drop-container
            accept=${_0x1c50f0}
            @cds-file-uploader-drop-container-changed=${(_0x45b265) => {
      var _a2;
      return this["_handleFileAdded"](((_a2 = _0x45b265["detail"]) == null ? void 0 : _a2["addedFiles"]) ?? []);
    }}
          >
            <p class="upload-text">${_0x3ada55} dosyasını buraya sürükleyin ya da seçmek için tıklayın</p>
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
function classifyDiscoveryError(_0x388948) {
  if (_0x388948 instanceof OgcRequestError) return { "kind": _0x388948["code"] === "OGC_SERVICE_DISCOVERY_PARSE_FAILED" ? "parse" : "server", "detail": _0x388948["message"] };
  return { "kind": "network", "detail": _0x388948 instanceof Error ? _0x388948["message"] : String(_0x388948) };
}
function discoveryErrorMessage(_0x5b0d0a) {
  switch (_0x5b0d0a == null ? void 0 : _0x5b0d0a["kind"]) {
    case "network":
      return "Servis adresine ulaşılamadı.\nAdresi kontrol edin veya sunucunun CORS/erişim izinlerini doğrulayın.";
    case "server":
      return "Sunucu bir hata döndürdü.\n" + _0x5b0d0a["detail"];
    case "parse":
      return "Sunucunun yanıtı geçerli bir XML olarak ayrıştırılamadı.\nAdresin doğru bir GetCapabilities uç noktası olduğundan emin olun.";
    default:
      return "Servis adresinden geçerli bir yanıt alınamadı.\nAdresi ve seçili servis türünü kontrol edin.";
  }
}
const SERVICE_VERSIONS = { "WMS": ["1.3.0", "1.1.1", "1.1.0", "1.0.0"], "WMTS": ["1.0.0"], "WFS": ["2.0.2", "2.0.0", "1.1.3", "1.1.0", "1.0.0"], "WCS": ["2.1.0", "2.0.1", "2.0.0", "1.1.2", "1.1.1", "1.1.0", "1.0.0"] };
function baseServiceUrl(_0x5b12d9) {
  try {
    const _0x3fba92 = new URL(_0x5b12d9);
    return "" + _0x3fba92["origin"] + _0x3fba92["pathname"];
  } catch {
    return _0x5b12d9["split"]("?")[0] ?? _0x5b12d9;
  }
}
class ServiceDiscoveryController {
  constructor(_0x47c0e2, _0x4c918f) {
    this["sink"] = _0x4c918f, this["generation"] = new AsyncGeneration(), _0x47c0e2["addController"](this);
  }
  ["hostDisconnected"]() {
    this["invalidate"]();
  }
  ["invalidate"]() {
    this["generation"]["next"]();
  }
  async ["discover"](_0x3ce76e, _0x4e9161) {
    const _0x12f12a = _0x4e9161["trim"]();
    if (!_0x12f12a) {
      this["sink"]["setError"]("Servis adresi giriniz.");
      return;
    }
    const _0x2c0887 = baseServiceUrl(_0x12f12a);
    this["sink"]["setDiscovering"](!![]), beginBusy("Servis bilgileri getiriliyor…"), this["sink"]["resetDiscovery"]();
    const _0x5bb6a6 = this["generation"]["next"]();
    try {
      const _0xae49a7 = SERVICE_VERSIONS[_0x3ce76e] ?? [];
      let _0x52f1b8;
      for (const _0x2f67e9 of _0xae49a7) {
        let _0x10b5da;
        try {
          _0x10b5da = buildCapabilitiesUrl(_0x12f12a, _0x3ce76e, _0x2f67e9);
        } catch {
          this["sink"]["setError"]("Servis adresi geçerli bir URL değil.");
          return;
        }
        try {
          const _0x116f7f = this["sink"]["layerManager"](), _0xd86584 = _0x116f7f ? await _0x116f7f["getCapabilitiesDocument"](_0x2c0887, _0x3ce76e, _0x2f67e9) : await getCapabilities(_0x10b5da, void 0);
          if (!this["generation"]["isCurrent"](_0x5bb6a6)) return;
          const _0x12c527 = parseCapabilities(_0x3ce76e, _0xd86584);
          if (_0x12c527["length"] > 0) {
            this["sink"]["setItems"](_0x12c527);
            if (_0x3ce76e === "WMS") this["sink"]["setTiffFormat"](parseWmsTiffFormat(_0xd86584));
            else {
              if (_0x3ce76e === "WCS") {
                this["sink"]["setTiffFormat"](parseWcsTiffFormat(_0xd86584));
                const _0x5ea4a5 = this["sink"]["layerManager"](), _0x235510 = _0x5ea4a5 ? await _0x5ea4a5["getWcsCoverageExtents"](_0x2c0887, _0x12c527["map"]((_0xea41e2) => _0xea41e2["identifier"])) : await fetchWcsCoverageExtents(_0x12f12a, _0x12c527["map"]((_0x1a9dbe) => _0x1a9dbe["identifier"]));
                if (!this["generation"]["isCurrent"](_0x5bb6a6)) return;
                _0x235510["size"] > 0 && this["sink"]["setItems"](_0x12c527["map"]((_0x39490e) => {
                  const _0xdb0a33 = _0x235510["get"](_0x39490e["identifier"]);
                  return _0xdb0a33 ? { ..._0x39490e, "geographicBoundingBox": _0xdb0a33 } : _0x39490e;
                })), _0x235510["size"] < _0x12c527["length"] && showToast("warning", _0x12c527["length"] - _0x235510["size"] + "/" + _0x12c527["length"] + " katmanın tam konumu belirlenemedi; bu katmanlar haritada geniş bir alanda görünebilir.");
              }
            }
            return;
          }
          const _0x1ff104 = detectServiceType(_0xd86584);
          if (_0x1ff104 && _0x1ff104 !== _0x3ce76e) {
            this["sink"]["setError"]("Bu adres bir " + _0x1ff104 + ' servisi gibi görünüyor. Servis türünü "' + _0x1ff104 + '" olarak değiştirip tekrar deneyin.');
            return;
          }
        } catch (_0x56e65c) {
          if (!this["generation"]["isCurrent"](_0x5bb6a6)) return;
          _0x52f1b8 = classifyDiscoveryError(_0x56e65c);
        }
      }
      this["sink"]["setError"](discoveryErrorMessage(_0x52f1b8));
    } finally {
      this["sink"]["setDiscovering"](![]), endBusy();
    }
  }
}
var __defProp$2 = Object["defineProperty"], __getOwnPropDesc$3 = Object["getOwnPropertyDescriptor"], __typeError$1 = (_0x28d9f8) => {
  throw TypeError(_0x28d9f8);
}, __decorateClass$3 = (_0x3bd3fa, _0x50a16a, _0x46d96c, _0x3fcc11) => {
  var _0x8af9cf = _0x3fcc11 > 1 ? void 0 : _0x3fcc11 ? __getOwnPropDesc$3(_0x50a16a, _0x46d96c) : _0x50a16a;
  for (var _0x1a79b0 = _0x3bd3fa["length"] - 1, _0x4e8eaa; _0x1a79b0 >= 0; _0x1a79b0--) if (_0x4e8eaa = _0x3bd3fa[_0x1a79b0]) _0x8af9cf = (_0x3fcc11 ? _0x4e8eaa(_0x50a16a, _0x46d96c, _0x8af9cf) : _0x4e8eaa(_0x8af9cf)) || _0x8af9cf;
  if (_0x3fcc11 && _0x8af9cf) __defProp$2(_0x50a16a, _0x46d96c, _0x8af9cf);
  return _0x8af9cf;
}, __accessCheck$1 = (_0x327f71, _0x2bacf9, _0x1141eb) => _0x2bacf9["has"](_0x327f71) || __typeError$1("Cannot " + _0x1141eb), __privateGet$1 = (_0x275a59, _0x1864af, _0x5a3244) => (__accessCheck$1(_0x275a59, _0x1864af, "read from private field"), _0x5a3244 ? _0x5a3244["call"](_0x275a59) : _0x1864af["get"](_0x275a59)), __privateAdd$1 = (_0x1fa79a, _0x5a450c, _0x8c7546) => _0x5a450c["has"](_0x1fa79a) ? __typeError$1("Cannot add the same private member more than once") : _0x5a450c instanceof WeakSet ? _0x5a450c["add"](_0x1fa79a) : _0x5a450c["set"](_0x1fa79a, _0x8c7546), __privateSet2 = (_0x5121a3, _0x5064e0, _0xbada89, _0x9ed3a1) => (__accessCheck$1(_0x5121a3, _0x5064e0, "write to private field"), _0x5064e0["set"](_0x5121a3, _0xbada89), _0xbada89), _apiKey;
const SERVICE_TYPES = [{ "value": "WMS", "label": "Web Harita Servisi (WMS)" }, { "value": "WMTS", "label": "Web Harita Karo Servisi (WMTS)" }, { "value": "WFS", "label": "Web Özellik Servisi (WFS)" }, { "value": "WCS", "label": "Web Kapsama Servisi (WCS)" }];
function servicePlaceholder(_0x7b31dc) {
  const _0x31cd24 = _0x7b31dc["toLowerCase"]();
  return "Ör: https://.../" + _0x31cd24;
}
const ICON_CLOSE = o$1(iconNodeToString(_16_default$v)), ICON_DOWNLOAD = o$1(iconNodeToString(_16_default$p)), ICON_RENEW = o$1(iconNodeToString(_16_default$c)), ICON_VIEW = o$1(iconNodeToString(_16_default$4)), ICON_VIEW_OFF = o$1(iconNodeToString(_16_default$3)), ICON_CLOUD_DOWNLOAD = o$1(iconNodeToString(_16_default$u));
let TucbsServiceUpload = class extends i$2 {
  constructor() {
    super(...arguments), this["open"] = ![], this["mapElementId"] = "", __privateAdd$1(this, _apiKey, ""), this["customCss"] = "", this["_customCssState"] = { "sheet": null }, this["_serviceType"] = "WMS", this["_serviceUrl"] = "", this["_discovering"] = ![], this["_discovery"] = new ServiceDiscoveryController(this, { "layerManager": () => this["layerManager"], "resetDiscovery": () => this["_resetDiscovery"](), "setDiscovering": (_0x58f8bc) => {
      this["_discovering"] = _0x58f8bc;
    }, "setError": (_0xe49ec0) => {
      this["_discoveryError"] = _0xe49ec0;
    }, "setItems": (_0x5f2923) => {
      this["_discoveredItems"] = _0x5f2923;
    }, "setTiffFormat": (_0x4c62a7) => {
      this["_discoveredTiffFormat"] = _0x4c62a7;
    } }), this["_discoveryError"] = "", this["_discoveredItems"] = [], this["_selectedIdentifiers"] = [], this["_addError"] = "", this["_drag"] = new DraggablePanelController(this, { "getPanel": () => this, "ignoreSelector": ".close-btn, .reset-btn", "onMove": () => this["_syncPreviewPosition"]() }), this["_listScroll"] = new VirtualScrollbar(this, () => this["_discoveredListEl"], () => this["_scrollThumbEl"]), this["_timers"] = new TimerBag(this), this["_onWindowResize"] = () => {
      this["_syncPreviewPosition"](), this["_listScroll"]["sync"]();
    };
  }
  set ["apiKey"](_0x905a1) {
    const _0x3c9d84 = __privateGet$1(this, _apiKey);
    __privateSet2(this, _apiKey, _0x905a1 ?? ""), this["requestUpdate"]("apiKey", _0x3c9d84);
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
      const _0x249cd0 = document["createElement"]("tucbs-map-preview");
      _0x249cd0["setAttribute"]("basemap", "hgm-temel"), _0x249cd0["apiKey"] = __privateGet$1(this, _apiKey), _0x249cd0["zoomToLayer"] = !![], _0x249cd0["style"]["position"] = "fixed", _0x249cd0["style"]["zIndex"] = "1100", _0x249cd0["style"]["display"] = "none", document["body"]["appendChild"](_0x249cd0), this["_previewEl"] = _0x249cd0;
    }
    return this["_previewEl"];
  }
  ["_syncPreviewPosition"]() {
    if (!this["_previewEl"]) return;
    const _0x10a2c7 = this["getBoundingClientRect"]();
    this["_previewEl"]["style"]["left"] = _0x10a2c7["left"] + "px", this["_previewEl"]["style"]["top"] = _0x10a2c7["top"] - TucbsServiceUpload["PREVIEW_HEIGHT_PX"] + "px", this["_previewEl"]["width"] = _0x10a2c7["width"] + "px", this["_previewEl"]["height"] = TucbsServiceUpload["PREVIEW_HEIGHT_PX"] + "px";
  }
  ["_updatePreview"]() {
    const _0xdc3933 = this["open"] && this["_discoveredItems"]["length"] > 0;
    if (!_0xdc3933) {
      if (this["_previewEl"]) this["_previewEl"]["style"]["display"] = "none";
      return;
    }
    const _0x1905ff = this["_ensurePreviewEl"]();
    _0x1905ff["style"]["display"] = "inline-block", _0x1905ff["apiKey"] = __privateGet$1(this, _apiKey), _0x1905ff["layerOptions"] = this["_previewSpec"], this["_syncPreviewPosition"](), this["_timers"]["requestAnimationFrame"](() => this["_syncPreviewPosition"]());
  }
  ["firstUpdated"]() {
    var _a2;
    if (this["layerManager"] || !this["mapElementId"]) return;
    const _0x23c97e = document["getElementById"](this["mapElementId"]);
    if (!_0x23c97e) return;
    _0x23c97e["layerManager"] ? (this["layerManager"] = _0x23c97e["layerManager"], (_a2 = _0x23c97e["_grantApiKeyTo"]) == null ? void 0 : _a2.call(_0x23c97e, this)) : _0x23c97e["addEventListener"]("ready", () => {
      var _a3;
      if (_0x23c97e["layerManager"]) this["layerManager"] = _0x23c97e["layerManager"];
      (_a3 = _0x23c97e["_grantApiKeyTo"]) == null ? void 0 : _a3.call(_0x23c97e, this);
    }, { "once": !![] });
  }
  ["updated"](_0x141436) {
    _0x141436["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_customCssState"], "tucbs-service-upload"), _0x141436["has"]("open") && this["open"] && (this["style"]["removeProperty"]("left"), this["style"]["removeProperty"]("top"), this["style"]["removeProperty"]("transform")), this["toggleAttribute"]("data-preview-open", this["_discoveredItems"]["length"] > 0), this["_updatePreview"](), this["_timers"]["requestAnimationFrame"](() => this["_listScroll"]["sync"]());
  }
  ["_close"]() {
    this["open"] = ![], this["_previewIdentifier"] = void 0, this["_previewSpec"] = void 0, this["dispatchEvent"](new CustomEvent("tucbs-service-upload-closed", { "bubbles": !![], "composed": !![] }));
  }
  ["_resetDiscovery"]() {
    this["_discovery"]["invalidate"](), this["_discoveryError"] = "", this["_discoveredItems"] = [], this["_discoveredTiffFormat"] = void 0, this["_selectedIdentifiers"] = [], this["_addError"] = "", this["_previewIdentifier"] = void 0, this["_previewSpec"] = void 0;
  }
  ["_toggleSelected"](_0x4297e9, _0x1e248f) {
    this["_selectedIdentifiers"] = _0x1e248f ? [...this["_selectedIdentifiers"], _0x4297e9] : this["_selectedIdentifiers"]["filter"]((_0x16d432) => _0x16d432 !== _0x4297e9), this["_addError"] = "";
  }
  ["_togglePreview"](_0x4c5a4b) {
    this["_previewIdentifier"] === _0x4c5a4b["identifier"] ? (this["_previewIdentifier"] = void 0, this["_previewSpec"] = void 0) : (this["_previewIdentifier"] = _0x4c5a4b["identifier"], this["_previewSpec"] = this["_previewSpecFor"](_0x4c5a4b)), this["_updatePreview"]();
  }
  ["_previewSpecFor"](_0x343d3f) {
    if (this["_serviceType"] === "WMTS" && !_0x343d3f["tileMatrixSetID"]) return void 0;
    const _0x39493a = baseServiceUrl(this["_serviceUrl"]["trim"]()), _0x2d7973 = "service-upload-preview-" + _0x343d3f["identifier"];
    switch (this["_serviceType"]) {
      case "WMS":
        return { "layerType": "WMS", "options": { "id": _0x2d7973, "title": _0x343d3f["title"], "url": _0x39493a, "layers": _0x343d3f["identifier"] } };
      case "WMTS":
        return { "layerType": "WMTS", "options": { "id": _0x2d7973, "title": _0x343d3f["title"], "url": _0x39493a, "layer": _0x343d3f["identifier"], "tileMatrixSetID": _0x343d3f["tileMatrixSetID"] } };
      case "WFS":
        return { "layerType": "WFS", "options": { "id": _0x2d7973, "title": _0x343d3f["title"], "url": _0x39493a, "typeName": _0x343d3f["identifier"] } };
      case "WCS": {
        const _0x2a9242 = wcsRectangleFor(_0x343d3f);
        return { "layerType": "WCS", "options": { "id": _0x2d7973, "title": _0x343d3f["title"], "url": _0x39493a, "coverageId": _0x343d3f["identifier"], ..._0x2a9242 && { "rectangle": _0x2a9242 } } };
      }
      default:
        return void 0;
    }
  }
  ["_resetFields"]() {
    this["_serviceType"] = "WMS", this["_serviceUrl"] = "", this["_resetDiscovery"]();
  }
  ["_selectServiceType"](_0x4e94ed) {
    this["_serviceType"] = _0x4e94ed, this["_serviceUrl"] = "", this["_resetDiscovery"]();
  }
  ["_setServiceUrl"](_0x18c570) {
    this["_serviceUrl"] = _0x18c570, this["_resetDiscovery"]();
  }
  async ["_addOneLayer"](_0x2dceb5) {
    if (this["_serviceType"] === "WMTS" && !_0x2dceb5["tileMatrixSetID"]) throw new LayerOperationError("LAYER_WMTS_TILEMATRIXSET_MISSING", "Bu katman için TileMatrixSet bilgisi bulunamadı.");
    const _0x10cf6a = baseServiceUrl(this["_serviceUrl"]["trim"]()), _0x5af527 = "service-" + _0x2dceb5["identifier"] + "-" + Date["now"](), _0x42353a = this["layerManager"];
    switch (this["_serviceType"]) {
      case "WMS": {
        const _0x5b63f9 = { "id": _0x5af527, "title": _0x2dceb5["title"], "url": _0x10cf6a, "layers": _0x2dceb5["identifier"], ...this["_discoveredTiffFormat"] && { "tiffFormat": this["_discoveredTiffFormat"], "geographicBoundingBox": _0x2dceb5["geographicBoundingBox"] } };
        await _0x42353a["add"]("WMS", _0x5b63f9);
        break;
      }
      case "WMTS":
        await _0x42353a["add"]("WMTS", { "id": _0x5af527, "title": _0x2dceb5["title"], "url": _0x10cf6a, "layer": _0x2dceb5["identifier"], "tileMatrixSetID": _0x2dceb5["tileMatrixSetID"] });
        break;
      case "WFS": {
        const _0x5724f6 = (_0x72df11) => {
          if (_0x72df11["id"] !== _0x5af527) return;
          showToast("warning", _0x72df11["totalCount"] + " özellikten sadece " + _0x72df11["loadedCount"] + " tanesi yüklendi; tamamı için filtre uygulayın.");
        };
        _0x42353a["on"]("layer:features-truncated", _0x5724f6);
        try {
          await _0x42353a["add"]("WFS", { "id": _0x5af527, "title": _0x2dceb5["title"], "url": _0x10cf6a, "typeName": _0x2dceb5["identifier"] });
        } finally {
          _0x42353a["off"]("layer:features-truncated", _0x5724f6);
        }
        break;
      }
      case "WCS": {
        const _0x2315cf = wcsRectangleFor(_0x2dceb5), _0x1c063f = { "id": _0x5af527, "title": _0x2dceb5["title"], "url": _0x10cf6a, "coverageId": _0x2dceb5["identifier"], ..._0x2315cf && { "rectangle": _0x2315cf }, ...this["_discoveredTiffFormat"] && { "tiffFormat": this["_discoveredTiffFormat"] } };
        await _0x42353a["add"]("WCS", _0x1c063f);
        break;
      }
    }
  }
  async ["_addSelectedLayers"]() {
    if (!this["layerManager"]) {
      this["_addError"] = "Harita hazır değil, katman eklenemedi.";
      return;
    }
    const _0x22b8f0 = this["_discoveredItems"]["filter"]((_0x518524) => this["_selectedIdentifiers"]["includes"](_0x518524["identifier"]));
    if (_0x22b8f0["length"] === 0) return;
    beginBusy("Katmanlar ekleniyor…"), this["_addError"] = "";
    const _0x52c668 = [];
    for (const _0x34acc6 of _0x22b8f0) {
      try {
        await this["_addOneLayer"](_0x34acc6);
      } catch (_0x168a97) {
        _0x168a97 instanceof TucbsError ? console["error"]("[tucbs-service-upload] " + _0x168a97["code"] + " (" + _0x168a97["number"] + "): " + _0x168a97["message"]) : console["error"](_0x168a97), _0x52c668["push"]({ "label": _0x34acc6["title"] || _0x34acc6["identifier"], "message": _0x168a97 instanceof Error ? _0x168a97["message"] : String(_0x168a97) });
      }
    }
    const _0x2d5d8d = _0x52c668["map"]((_0x3b544e) => _0x3b544e["label"]);
    this["_selectedIdentifiers"] = _0x52c668["length"] === 0 ? [] : _0x22b8f0["filter"]((_0x40bd9c) => _0x2d5d8d["includes"](_0x40bd9c["title"] || _0x40bd9c["identifier"]))["map"]((_0x16419c) => _0x16419c["identifier"]), endBusy();
    if (_0x52c668["length"] === 0) this["_close"]();
    else _0x52c668["length"] === 1 ? this["_addError"] = '"' + _0x52c668[0]["label"] + '" eklenemedi: ' + _0x52c668[0]["message"] : this["_addError"] = _0x52c668["length"] + "/" + _0x22b8f0["length"] + " katman eklenemedi:\n" + _0x52c668["map"]((_0x1c3786) => "• " + _0x1c3786["label"] + ": " + _0x1c3786["message"])["join"]("\n");
  }
  ["_addButtonLabel"]() {
    if (this["_selectedIdentifiers"]["length"] > 1) return "Haritaya Ekle (" + this["_selectedIdentifiers"]["length"] + ")";
    return "Haritaya Ekle";
  }
  ["render"]() {
    if (!this["open"]) return b``;
    const _0x482511 = this["_discoveredItems"]["length"] > 0;
    return b`
      <div class="panel${_0x482511 ? " with-layers" : ""}">
        <div
            class="header"
            @pointerdown=${(_0xbd6c92) => this["_drag"]["start"](_0xbd6c92)}
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
                @cds-dropdown-selected=${(_0x1bfb45) => {
      this["_selectServiceType"](_0x1bfb45["detail"]["item"]["value"]);
    }}
              >
                ${SERVICE_TYPES["map"]((_0x49b2c5) => b`<cds-dropdown-item value=${_0x49b2c5["value"]}
                      >${_0x49b2c5["label"]}</cds-dropdown-item
                    >`)}
              </cds-dropdown>

              <div class="url-row">
                <cds-text-input
                  label="Servis Adresi giriniz"
                  placeholder=${servicePlaceholder(this["_serviceType"])}
                  .value=${this["_serviceUrl"]}
                  @input=${(_0x43d2e6) => {
      this["_setServiceUrl"](_0x43d2e6["target"]["value"]);
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

            ${_0x482511 ? b`
                  <div class="katmanlar-column">
                    <span class="section-label">Katmanlar</span>
                    <div class="discovered-list-wrap">
                      <div
                        class="discovered-list"
                        role="group"
                        aria-label="Katmanlar"
                        @scroll=${() => this["_listScroll"]["sync"]()}
                      >
                        ${this["_discoveredItems"]["map"]((_0x31828e) => {
      const _0x456d8a = this["_previewIdentifier"] === _0x31828e["identifier"], _0x50e7f7 = _0x456d8a ? "Önizlemeyi kapat" : "Haritada önizle";
      return b`
                            <div class="discovered-row">
                              <cds-checkbox
                                title=${_0x31828e["title"]}
                                .checked=${this["_selectedIdentifiers"]["includes"](_0x31828e["identifier"])}
                                @cds-checkbox-changed=${(_0x18b773) => {
        var _a2;
        this["_toggleSelected"](_0x31828e["identifier"], !!((_a2 = _0x18b773["detail"]) == null ? void 0 : _a2["checked"]));
      }}
                              >
                                ${_0x31828e["title"]}
                              </cds-checkbox>
                              <button
                                type="button"
                                class="preview-toggle-btn"
                                aria-pressed=${_0x456d8a}
                                title=${_0x50e7f7}
                                aria-label=${_0x50e7f7}
                                @click=${() => this["_togglePreview"](_0x31828e)}
                              >
                                ${_0x456d8a ? ICON_VIEW : ICON_VIEW_OFF}
                              </button>
                            </div>
                          `;
    })}
                      </div>
                      <div
                        class="scroll-thumb"
                        @pointerdown=${(_0x4cf1b8) => this["_listScroll"]["startDrag"](_0x4cf1b8)}
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
var __getOwnPropDesc$2 = Object["getOwnPropertyDescriptor"], __decorateClass$2 = (_0x585183, _0x5978c2, _0xa74458, _0x59ed2b) => {
  var _0x43f58a = _0x59ed2b > 1 ? void 0 : _0x59ed2b ? __getOwnPropDesc$2(_0x5978c2, _0xa74458) : _0x5978c2;
  for (var _0x20c82b = _0x585183["length"] - 1, _0x49f2cb; _0x20c82b >= 0; _0x20c82b--) if (_0x49f2cb = _0x585183[_0x20c82b]) _0x43f58a = _0x49f2cb(_0x43f58a) || _0x43f58a;
  return _0x43f58a;
};
let TucbsLayerExport = class extends i$2 {
  ["exportLayer"](_0x45ea12, _0xe9fdf8, _0x19faf5) {
    _0x45ea12["exportLayerGeoJSON"](_0xe9fdf8, _0x19faf5);
  }
  ["exportLayerKml"](_0x295bfd, _0x7f8f8a, _0x574ce6) {
    _0x295bfd["exportLayerKml"](_0x7f8f8a, _0x574ce6);
  }
  ["exportLayerShapefile"](_0x5b6d76, _0x5bbebf, _0x359037) {
    _0x5b6d76["exportLayerShapefile"](_0x5bbebf, _0x359037);
  }
  ["exportLayerAsGeoTiff"](_0x830730, _0x1da970, _0x4d153d) {
    return _0x830730["exportLayerAsGeoTiff"](_0x1da970, _0x4d153d);
  }
};
TucbsLayerExport = __decorateClass$2([t$3("tucbs-layer-export")], TucbsLayerExport);
var __defProp$1 = Object["defineProperty"], __getOwnPropDesc$1 = Object["getOwnPropertyDescriptor"], __decorateClass$1 = (_0x34a8ba, _0x1e7a87, _0x2d3961, _0xa916f5) => {
  var _0x5127f7 = _0xa916f5 > 1 ? void 0 : _0xa916f5 ? __getOwnPropDesc$1(_0x1e7a87, _0x2d3961) : _0x1e7a87;
  for (var _0x2df3a6 = _0x34a8ba["length"] - 1, _0x32bf6c; _0x2df3a6 >= 0; _0x2df3a6--) if (_0x32bf6c = _0x34a8ba[_0x2df3a6]) _0x5127f7 = (_0xa916f5 ? _0x32bf6c(_0x1e7a87, _0x2d3961, _0x5127f7) : _0x32bf6c(_0x5127f7)) || _0x5127f7;
  if (_0xa916f5 && _0x5127f7) __defProp$1(_0x1e7a87, _0x2d3961, _0x5127f7);
  return _0x5127f7;
};
let TucbsBusyOverlay = class extends i$2 {
  constructor() {
    super(...arguments), this["active"] = ![], this["_message"] = "İşlem sürüyor…", this["_shownAt"] = 0, this["_timers"] = new TimerBag(this), this["_onBusyChanged"] = (_0xa340d2) => {
      const _0x41536f = _0xa340d2["detail"];
      if (_0x41536f["busy"] && _0x41536f["message"]) this["_message"] = _0x41536f["message"];
      if (_0x41536f["busy"]) {
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
      const _0x5436b2 = TucbsBusyOverlay["MIN_VISIBLE_MS"] - (Date["now"]() - this["_shownAt"]);
      if (_0x5436b2 <= 0) {
        this["active"] = ![];
        return;
      }
      this["_hideTimer"] = this["_timers"]["setTimeout"](() => {
        this["_hideTimer"] = void 0, this["active"] = ![];
      }, _0x5436b2);
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
var __defProp = Object["defineProperty"], __getOwnPropDesc = Object["getOwnPropertyDescriptor"], __typeError2 = (_0x2c6edb) => {
  throw TypeError(_0x2c6edb);
}, __decorateClass = (_0x5acc3e, _0x58debf, _0x318bff, _0x3e765b) => {
  var _0xb47fbb = _0x3e765b > 1 ? void 0 : _0x3e765b ? __getOwnPropDesc(_0x58debf, _0x318bff) : _0x58debf;
  for (var _0x441a30 = _0x5acc3e["length"] - 1, _0xbb55cd; _0x441a30 >= 0; _0x441a30--) if (_0xbb55cd = _0x5acc3e[_0x441a30]) _0xb47fbb = (_0x3e765b ? _0xbb55cd(_0x58debf, _0x318bff, _0xb47fbb) : _0xbb55cd(_0xb47fbb)) || _0xb47fbb;
  if (_0x3e765b && _0xb47fbb) __defProp(_0x58debf, _0x318bff, _0xb47fbb);
  return _0xb47fbb;
}, __accessCheck2 = (_0x30cc03, _0x35f8e2, _0x2bc1ae) => _0x35f8e2["has"](_0x30cc03) || __typeError2("Cannot " + _0x2bc1ae), __privateGet2 = (_0x185595, _0x3ae84f, _0x519164) => (__accessCheck2(_0x185595, _0x3ae84f, "read from private field"), _0x519164 ? _0x519164["call"](_0x185595) : _0x3ae84f["get"](_0x185595)), __privateAdd2 = (_0x210b5e, _0x556025, _0x21e8ff) => _0x556025["has"](_0x210b5e) ? __typeError2("Cannot add the same private member more than once") : _0x556025 instanceof WeakSet ? _0x556025["add"](_0x210b5e) : _0x556025["set"](_0x210b5e, _0x21e8ff), _apiKeyState;
const TOOLBAR_TOOLS = "zoom,goto-coordinate,draw,measure,analysis,delete,settings,print", TOOLBAR_TOOL_PROPS = { "draw": { "tools": "point,polyline,polygon,rectangle,circle,freehand" } };
let TucbsApp = class extends i$2 {
  constructor() {
    super(...arguments), __privateAdd2(this, _apiKeyState, new WriteOnlyApiKey(this)), this["basemap"] = "hgm-temel", this["mode"] = "3D", this["quality"] = 70, this["showLayerList"] = !![], this["showToolbar"] = !![], this["showInfoBar"] = !![], this["_map"] = null, this["_onMapReady"] = (_0x487070) => {
      _0x487070["stopPropagation"]();
      const { map: _0x3f4914 } = _0x487070["detail"];
      this["_map"] = _0x3f4914, this["dispatchEvent"](new CustomEvent("ready", { "detail": { "map": _0x3f4914 }, "bubbles": !![], "composed": !![] }));
    }, this["_onMapError"] = (_0x513d85) => {
      _0x513d85["stopPropagation"]();
      const _0x270e3a = _0x513d85["detail"];
      this["dispatchEvent"](new CustomEvent("error", { "detail": _0x270e3a, "bubbles": !![], "composed": !![] }));
    };
  }
  set ["apiKey"](_0x218d6d) {
    __privateGet2(this, _apiKeyState)["write"](_0x218d6d);
  }
  get ["apiKey"]() {
    return __privateGet2(this, _apiKeyState)["masked"];
  }
  ["createRenderRoot"]() {
    return this;
  }
  ["updated"](_0x4569fd) {
    if (!this["_map"]) return;
    if (_0x4569fd["has"]("basemap")) this["_map"]["setBasemap"](this["basemap"]);
    if (_0x4569fd["has"]("mode")) this["_map"]["setMode"](this["mode"]);
    if (_0x4569fd["has"]("quality")) this["_map"]["setQuality"](this["quality"]);
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
