var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var _a, _value;
import { ensureEffectiveApiKeyValid, getUcbpApiBase, TucbsError, Map as _0xf20948, HGM_BASEMAP_IDS, DEFAULT_INITIAL_EXTENT, registerApiKeyRefresh, ApiKeyValidationError, LayerOperationError, MEASURE_LAYER_ID, entityToGeoJSON, featureLabel, measureGround, snapScaleForDisplay, OgcRequestError, buildCapabilitiesUrl, getCapabilities, parseCapabilities, parseWmsTiffFormat, parseWcsTiffFormat, fetchWcsCoverageExtents, detectServiceType, wcsRectangleFor } from "@tucbs/core";
import { Math as _0x30289b, Color, Cartesian3, VerticalOrigin, HeightReference, Cartesian2, LabelStyle, CallbackProperty, CallbackPositionProperty, ConstantProperty, PolygonHierarchy, HorizontalOrigin, ScreenSpaceEventHandler, ScreenSpaceEventType, Cartographic } from "cesium";
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
  constructor(_0x2536c6, _0x36b451, _0x50b2f5) {
    if (this["_$cssResult$"] = !![], _0x50b2f5 !== s$4) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this["cssText"] = _0x2536c6, this["t"] = _0x36b451;
  }
  get ["styleSheet"]() {
    let _0x3c3881 = this["o"];
    const _0xb0622 = this["t"];
    if (e$7 && void 0 === _0x3c3881) {
      const _0xf2277b = void 0 !== _0xb0622 && 1 === _0xb0622["length"];
      _0xf2277b && (_0x3c3881 = o$6["get"](_0xb0622)), void 0 === _0x3c3881 && ((this["o"] = _0x3c3881 = new CSSStyleSheet())["replaceSync"](this["cssText"]), _0xf2277b && o$6["set"](_0xb0622, _0x3c3881));
    }
    return _0x3c3881;
  }
  ["toString"]() {
    return this["cssText"];
  }
};
const r$4 = (_0x330116) => new n$4("string" == typeof _0x330116 ? _0x330116 : _0x330116 + "", void 0, s$4), i$5 = (_0x213bb7, ..._0x13b08c) => {
  const _0x186ecb = 1 === _0x213bb7["length"] ? _0x213bb7[0] : _0x13b08c["reduce"]((_0x2286b0, _0x2d9690, _0x2d420b) => _0x2286b0 + ((_0x33cd3a) => {
    if (!![] === _0x33cd3a["_$cssResult$"]) return _0x33cd3a["cssText"];
    if ("number" == typeof _0x33cd3a) return _0x33cd3a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + _0x33cd3a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(_0x2d9690) + _0x213bb7[_0x2d420b + 1], _0x213bb7[0]);
  return new n$4(_0x186ecb, _0x213bb7, s$4);
}, S$1 = (_0x272fe8, _0x421f31) => {
  if (e$7) _0x272fe8["adoptedStyleSheets"] = _0x421f31["map"]((_0x5633d0) => _0x5633d0 instanceof CSSStyleSheet ? _0x5633d0 : _0x5633d0["styleSheet"]);
  else for (const _0x1e1eb8 of _0x421f31) {
    const _0x2faf31 = document["createElement"]("style"), _0x675417 = t$5["litNonce"];
    void 0 !== _0x675417 && _0x2faf31["setAttribute"]("nonce", _0x675417), _0x2faf31["textContent"] = _0x1e1eb8["cssText"], _0x272fe8["appendChild"](_0x2faf31);
  }
}, c$3 = e$7 ? (_0x10e830) => _0x10e830 : (_0x39a295) => _0x39a295 instanceof CSSStyleSheet ? ((_0x153315) => {
  let _0x255e79 = "";
  for (const _0x59ba3c of _0x153315["cssRules"]) _0x255e79 += _0x59ba3c["cssText"];
  return r$4(_0x255e79);
})(_0x39a295) : _0x39a295, { is: i$4, defineProperty: e$6, getOwnPropertyDescriptor: h$2, getOwnPropertyNames: r$3, getOwnPropertySymbols: o$5, getPrototypeOf: n$3 } = Object, a$2 = globalThis, c$2 = a$2["trustedTypes"], l$2 = c$2 ? c$2["emptyScript"] : "", p$2 = a$2["reactiveElementPolyfillSupport"], d$1 = (_0x36bbd5, _0x1eb217) => _0x36bbd5, u$4 = { "toAttribute"(_0x13b72b, _0x15e7ca) {
  switch (_0x15e7ca) {
    case Boolean:
      _0x13b72b = _0x13b72b ? l$2 : null;
      break;
    case Object:
    case Array:
      _0x13b72b = null == _0x13b72b ? _0x13b72b : JSON["stringify"](_0x13b72b);
  }
  return _0x13b72b;
}, "fromAttribute"(_0x160d96, _0x1d14e9) {
  let _0x1b2a65 = _0x160d96;
  switch (_0x1d14e9) {
    case Boolean:
      _0x1b2a65 = null !== _0x160d96;
      break;
    case Number:
      _0x1b2a65 = null === _0x160d96 ? null : Number(_0x160d96);
      break;
    case Object:
    case Array:
      try {
        _0x1b2a65 = JSON["parse"](_0x160d96);
      } catch (_0x27ccf8) {
        _0x1b2a65 = null;
      }
  }
  return _0x1b2a65;
} }, f$1 = (_0x1ee3ca, _0x27baef) => !i$4(_0x1ee3ca, _0x27baef), b$1 = { "attribute": !![], "type": String, "converter": u$4, "reflect": ![], "useDefault": ![], "hasChanged": f$1 };
Symbol["metadata"] ?? (Symbol["metadata"] = Symbol("metadata")), a$2["litPropertyMetadata"] ?? (a$2["litPropertyMetadata"] = /* @__PURE__ */ new WeakMap());
let y$1 = class y extends HTMLElement {
  static ["addInitializer"](_0x3b3a53) {
    this["_$Ei"](), (this["l"] ?? (this["l"] = []))["push"](_0x3b3a53);
  }
  static get ["observedAttributes"]() {
    return this["finalize"](), this["_$Eh"] && [...this["_$Eh"]["keys"]()];
  }
  static ["createProperty"](_0x544d09, _0x33eebb = b$1) {
    if (_0x33eebb["state"] && (_0x33eebb["attribute"] = ![]), this["_$Ei"](), this["prototype"]["hasOwnProperty"](_0x544d09) && ((_0x33eebb = Object["create"](_0x33eebb))["wrapped"] = !![]), this["elementProperties"]["set"](_0x544d09, _0x33eebb), !_0x33eebb["noAccessor"]) {
      const _0x38164e = Symbol(), _0x2730bf = this["getPropertyDescriptor"](_0x544d09, _0x38164e, _0x33eebb);
      void 0 !== _0x2730bf && e$6(this["prototype"], _0x544d09, _0x2730bf);
    }
  }
  static ["getPropertyDescriptor"](_0x5d95ea, _0x296422, _0x340e13) {
    const { get: _0x59508b, set: _0x5528a5 } = h$2(this["prototype"], _0x5d95ea) ?? { "get"() {
      return this[_0x296422];
    }, "set"(_0x2bb4da) {
      this[_0x296422] = _0x2bb4da;
    } };
    return { "get": _0x59508b, "set"(_0x22774b) {
      const _0x4de40d = _0x59508b == null ? void 0 : _0x59508b["call"](this);
      _0x5528a5 == null ? void 0 : _0x5528a5["call"](this, _0x22774b), this["requestUpdate"](_0x5d95ea, _0x4de40d, _0x340e13);
    }, "configurable": !![], "enumerable": !![] };
  }
  static ["getPropertyOptions"](_0x1caa0f) {
    return this["elementProperties"]["get"](_0x1caa0f) ?? b$1;
  }
  static ["_$Ei"]() {
    if (this["hasOwnProperty"](d$1("elementProperties"))) return;
    const _0x182ac2 = n$3(this);
    _0x182ac2["finalize"](), void 0 !== _0x182ac2["l"] && (this["l"] = [..._0x182ac2["l"]]), this["elementProperties"] = new Map(_0x182ac2["elementProperties"]);
  }
  static ["finalize"]() {
    if (this["hasOwnProperty"](d$1("finalized"))) return;
    if (this["finalized"] = !![], this["_$Ei"](), this["hasOwnProperty"](d$1("properties"))) {
      const _0x18c590 = this["properties"], _0x15c7b9 = [...r$3(_0x18c590), ...o$5(_0x18c590)];
      for (const _0x1f97cb of _0x15c7b9) this["createProperty"](_0x1f97cb, _0x18c590[_0x1f97cb]);
    }
    const _0x4b5132 = this[Symbol["metadata"]];
    if (null !== _0x4b5132) {
      const _0x13b96a = litPropertyMetadata["get"](_0x4b5132);
      if (void 0 !== _0x13b96a) {
        for (const [_0xe1e6bc, _0x14a7f9] of _0x13b96a) this["elementProperties"]["set"](_0xe1e6bc, _0x14a7f9);
      }
    }
    this["_$Eh"] = /* @__PURE__ */ new Map();
    for (const [_0x2a65ce, _0x2b6093] of this["elementProperties"]) {
      const _0x4225a3 = this["_$Eu"](_0x2a65ce, _0x2b6093);
      void 0 !== _0x4225a3 && this["_$Eh"]["set"](_0x4225a3, _0x2a65ce);
    }
    this["elementStyles"] = this["finalizeStyles"](this["styles"]);
  }
  static ["finalizeStyles"](_0x14c2a0) {
    const _0x1a5c61 = [];
    if (Array["isArray"](_0x14c2a0)) {
      const _0x48ca15 = new Set(_0x14c2a0["flat"](1 / 0)["reverse"]());
      for (const _0x28f528 of _0x48ca15) _0x1a5c61["unshift"](c$3(_0x28f528));
    } else void 0 !== _0x14c2a0 && _0x1a5c61["push"](c$3(_0x14c2a0));
    return _0x1a5c61;
  }
  static ["_$Eu"](_0x49f461, _0x46dab6) {
    const _0x60ccf1 = _0x46dab6["attribute"];
    return ![] === _0x60ccf1 ? void 0 : "string" == typeof _0x60ccf1 ? _0x60ccf1 : "string" == typeof _0x49f461 ? _0x49f461["toLowerCase"]() : void 0;
  }
  constructor() {
    super(), this["_$Ep"] = void 0, this["isUpdatePending"] = ![], this["hasUpdated"] = ![], this["_$Em"] = null, this["_$Ev"]();
  }
  ["_$Ev"]() {
    var _a2;
    this["_$ES"] = new Promise((_0x2a459b) => this["enableUpdating"] = _0x2a459b), this["_$AL"] = /* @__PURE__ */ new Map(), this["_$E_"](), this["requestUpdate"](), (_a2 = this["constructor"]["l"]) == null ? void 0 : _a2["forEach"]((_0x3520cf) => _0x3520cf(this));
  }
  ["addController"](_0x3fdc66) {
    var _a2;
    (this["_$EO"] ?? (this["_$EO"] = /* @__PURE__ */ new Set()))["add"](_0x3fdc66), void 0 !== this["renderRoot"] && this["isConnected"] && ((_a2 = _0x3fdc66["hostConnected"]) == null ? void 0 : _a2.call(_0x3fdc66));
  }
  ["removeController"](_0x5caeea) {
    var _a2;
    (_a2 = this["_$EO"]) == null ? void 0 : _a2["delete"](_0x5caeea);
  }
  ["_$E_"]() {
    const _0x78f800 = /* @__PURE__ */ new Map(), _0x4224ca = this["constructor"]["elementProperties"];
    for (const _0x3f505e of _0x4224ca["keys"]()) this["hasOwnProperty"](_0x3f505e) && (_0x78f800["set"](_0x3f505e, this[_0x3f505e]), delete this[_0x3f505e]);
    _0x78f800["size"] > 0 && (this["_$Ep"] = _0x78f800);
  }
  ["createRenderRoot"]() {
    const _0x292d31 = this["shadowRoot"] ?? this["attachShadow"](this["constructor"]["shadowRootOptions"]);
    return S$1(_0x292d31, this["constructor"]["elementStyles"]), _0x292d31;
  }
  ["connectedCallback"]() {
    var _a2;
    this["renderRoot"] ?? (this["renderRoot"] = this["createRenderRoot"]()), this["enableUpdating"](!![]), (_a2 = this["_$EO"]) == null ? void 0 : _a2["forEach"]((_0x56f070) => {
      var _a3;
      return (_a3 = _0x56f070["hostConnected"]) == null ? void 0 : _a3.call(_0x56f070);
    });
  }
  ["enableUpdating"](_0x34f87b) {
  }
  ["disconnectedCallback"]() {
    var _a2;
    (_a2 = this["_$EO"]) == null ? void 0 : _a2["forEach"]((_0x4136b4) => {
      var _a3;
      return (_a3 = _0x4136b4["hostDisconnected"]) == null ? void 0 : _a3.call(_0x4136b4);
    });
  }
  ["attributeChangedCallback"](_0x5e14f8, _0xc7afb7, _0x1c2dc1) {
    this["_$AK"](_0x5e14f8, _0x1c2dc1);
  }
  ["_$ET"](_0x36218d, _0x37124) {
    var _a2;
    const _0x33628e = this["constructor"]["elementProperties"]["get"](_0x36218d), _0x4e29b5 = this["constructor"]["_$Eu"](_0x36218d, _0x33628e);
    if (void 0 !== _0x4e29b5 && !![] === _0x33628e["reflect"]) {
      const _0x394f35 = (void 0 !== ((_a2 = _0x33628e["converter"]) == null ? void 0 : _a2["toAttribute"]) ? _0x33628e["converter"] : u$4)["toAttribute"](_0x37124, _0x33628e["type"]);
      this["_$Em"] = _0x36218d, null == _0x394f35 ? this["removeAttribute"](_0x4e29b5) : this["setAttribute"](_0x4e29b5, _0x394f35), this["_$Em"] = null;
    }
  }
  ["_$AK"](_0x5801c4, _0x2d7c4d) {
    var _a2, _b;
    const _0x5bac57 = this["constructor"], _0x56a4e1 = _0x5bac57["_$Eh"]["get"](_0x5801c4);
    if (void 0 !== _0x56a4e1 && this["_$Em"] !== _0x56a4e1) {
      const _0x1ec0f1 = _0x5bac57["getPropertyOptions"](_0x56a4e1), _0x37dae4 = "function" == typeof _0x1ec0f1["converter"] ? { "fromAttribute": _0x1ec0f1["converter"] } : void 0 !== ((_a2 = _0x1ec0f1["converter"]) == null ? void 0 : _a2["fromAttribute"]) ? _0x1ec0f1["converter"] : u$4;
      this["_$Em"] = _0x56a4e1;
      const _0x28692a = _0x37dae4["fromAttribute"](_0x2d7c4d, _0x1ec0f1["type"]);
      this[_0x56a4e1] = _0x28692a ?? ((_b = this["_$Ej"]) == null ? void 0 : _b["get"](_0x56a4e1)) ?? _0x28692a, this["_$Em"] = null;
    }
  }
  ["requestUpdate"](_0x1630ab, _0xef99f1, _0x561e42, _0x5f27be = ![], _0x520135) {
    var _a2;
    if (void 0 !== _0x1630ab) {
      const _0x4277c4 = this["constructor"];
      if (![] === _0x5f27be && (_0x520135 = this[_0x1630ab]), _0x561e42 ?? (_0x561e42 = _0x4277c4["getPropertyOptions"](_0x1630ab)), !((_0x561e42["hasChanged"] ?? f$1)(_0x520135, _0xef99f1) || _0x561e42["useDefault"] && _0x561e42["reflect"] && _0x520135 === ((_a2 = this["_$Ej"]) == null ? void 0 : _a2["get"](_0x1630ab)) && !this["hasAttribute"](_0x4277c4["_$Eu"](_0x1630ab, _0x561e42)))) return;
      this["C"](_0x1630ab, _0xef99f1, _0x561e42);
    }
    ![] === this["isUpdatePending"] && (this["_$ES"] = this["_$EP"]());
  }
  ["C"](_0x420c84, _0x3a3ae3, { useDefault: _0x34c70d, reflect: _0x411c45, wrapped: _0x4cfed1 }, _0x28009c) {
    _0x34c70d && !(this["_$Ej"] ?? (this["_$Ej"] = /* @__PURE__ */ new Map()))["has"](_0x420c84) && (this["_$Ej"]["set"](_0x420c84, _0x28009c ?? _0x3a3ae3 ?? this[_0x420c84]), !![] !== _0x4cfed1 || void 0 !== _0x28009c) || (this["_$AL"]["has"](_0x420c84) || (this["hasUpdated"] || _0x34c70d || (_0x3a3ae3 = void 0), this["_$AL"]["set"](_0x420c84, _0x3a3ae3)), !![] === _0x411c45 && this["_$Em"] !== _0x420c84 && (this["_$Eq"] ?? (this["_$Eq"] = /* @__PURE__ */ new Set()))["add"](_0x420c84));
  }
  async ["_$EP"]() {
    this["isUpdatePending"] = !![];
    try {
      await this["_$ES"];
    } catch (_0x69b55d) {
      Promise["reject"](_0x69b55d);
    }
    const _0x39e592 = this["scheduleUpdate"]();
    return null != _0x39e592 && await _0x39e592, !this["isUpdatePending"];
  }
  ["scheduleUpdate"]() {
    return this["performUpdate"]();
  }
  ["performUpdate"]() {
    var _a2;
    if (!this["isUpdatePending"]) return;
    if (!this["hasUpdated"]) {
      if (this["renderRoot"] ?? (this["renderRoot"] = this["createRenderRoot"]()), this["_$Ep"]) {
        for (const [_0x334d80, _0x51cd3f] of this["_$Ep"]) this[_0x334d80] = _0x51cd3f;
        this["_$Ep"] = void 0;
      }
      const _0x1346aa = this["constructor"]["elementProperties"];
      if (_0x1346aa["size"] > 0) for (const [_0x554a4b, _0x3ce30a] of _0x1346aa) {
        const { wrapped: _0x7beedb } = _0x3ce30a, _0x51a273 = this[_0x554a4b];
        !![] !== _0x7beedb || this["_$AL"]["has"](_0x554a4b) || void 0 === _0x51a273 || this["C"](_0x554a4b, void 0, _0x3ce30a, _0x51a273);
      }
    }
    let _0x8a966b = ![];
    const _0x45b1f1 = this["_$AL"];
    try {
      _0x8a966b = this["shouldUpdate"](_0x45b1f1), _0x8a966b ? (this["willUpdate"](_0x45b1f1), (_a2 = this["_$EO"]) == null ? void 0 : _a2["forEach"]((_0xabbefe) => {
        var _a3;
        return (_a3 = _0xabbefe["hostUpdate"]) == null ? void 0 : _a3.call(_0xabbefe);
      }), this["update"](_0x45b1f1)) : this["_$EM"]();
    } catch (_0x308d1b) {
      throw _0x8a966b = ![], this["_$EM"](), _0x308d1b;
    }
    _0x8a966b && this["_$AE"](_0x45b1f1);
  }
  ["willUpdate"](_0x1dc2e1) {
  }
  ["_$AE"](_0x1726f9) {
    var _a2;
    (_a2 = this["_$EO"]) == null ? void 0 : _a2["forEach"]((_0x222cd6) => {
      var _a3;
      return (_a3 = _0x222cd6["hostUpdated"]) == null ? void 0 : _a3.call(_0x222cd6);
    }), this["hasUpdated"] || (this["hasUpdated"] = !![], this["firstUpdated"](_0x1726f9)), this["updated"](_0x1726f9);
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
  ["shouldUpdate"](_0x2deca2) {
    return !![];
  }
  ["update"](_0x30a4e6) {
    this["_$Eq"] && (this["_$Eq"] = this["_$Eq"]["forEach"]((_0x4c5fc4) => this["_$ET"](_0x4c5fc4, this[_0x4c5fc4]))), this["_$EM"]();
  }
  ["updated"](_0x1b2199) {
  }
  ["firstUpdated"](_0x39a273) {
  }
};
y$1["elementStyles"] = [], y$1["shadowRootOptions"] = { "mode": "open" }, y$1[d$1("elementProperties")] = /* @__PURE__ */ new Map(), y$1[d$1("finalized")] = /* @__PURE__ */ new Map(), p$2 == null ? void 0 : p$2({ "ReactiveElement": y$1 }), (a$2["reactiveElementVersions"] ?? (a$2["reactiveElementVersions"] = []))["push"]("2.1.2");
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
const t$4 = globalThis, i$3 = (_0x5c3452) => _0x5c3452, s$3 = t$4["trustedTypes"], e$5 = s$3 ? s$3["createPolicy"]("lit-html", { "createHTML": (_0x1bd1e2) => _0x1bd1e2 }) : void 0, h$1 = "$lit$", o$4 = "lit$" + Math["random"]()["toFixed"](9)["slice"](2) + "$", n$2 = "?" + o$4, r$2 = "<" + n$2 + ">", l$1 = document, c$1 = () => l$1["createComment"](""), a$1 = (_0x591357) => null === _0x591357 || "object" != typeof _0x591357 && "function" != typeof _0x591357, u$3 = Array["isArray"], d = (_0x47116d) => u$3(_0x47116d) || "function" == typeof (_0x47116d == null ? void 0 : _0x47116d[Symbol["iterator"]]), f = "[ 	\n\f\r]", v$1 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, _ = /-->/g, m$1 = />/g, p$1 = RegExp(">|" + f + `(?:([^\\s"'>=/]+)(` + f + "*=" + f + `*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), g = /'/g, $ = /"/g, y2 = /^(?:script|style|textarea|title)$/i, x = (_0x591f52) => (_0x235272, ..._0x1c3ea8) => ({ "_$litType$": _0x591f52, "strings": _0x235272, "values": _0x1c3ea8 }), b = x(1), E = Symbol["for"]("lit-noChange"), A = Symbol["for"]("lit-nothing"), C = /* @__PURE__ */ new WeakMap(), P = l$1["createTreeWalker"](l$1, 129);
function V(_0x12de0c, _0x14d5e6) {
  if (!u$3(_0x12de0c) || !_0x12de0c["hasOwnProperty"]("raw")) throw Error("invalid template strings array");
  return void 0 !== e$5 ? e$5["createHTML"](_0x14d5e6) : _0x14d5e6;
}
const N = (_0x575071, _0x4114e1) => {
  const _0x20b43a = _0x575071["length"] - 1, _0x44c6f0 = [];
  let _0x16f668, _0x3615d5 = 2 === _0x4114e1 ? "<svg>" : 3 === _0x4114e1 ? "<math>" : "", _0x35c570 = v$1;
  for (let _0x1f6164 = 0; _0x1f6164 < _0x20b43a; _0x1f6164++) {
    const _0x58cca2 = _0x575071[_0x1f6164];
    let _0x5498d7, _0x4f5b54, _0xe1c6d2 = -1, _0x2b16dc = 0;
    for (; _0x2b16dc < _0x58cca2["length"] && (_0x35c570["lastIndex"] = _0x2b16dc, _0x4f5b54 = _0x35c570["exec"](_0x58cca2), null !== _0x4f5b54); ) _0x2b16dc = _0x35c570["lastIndex"], _0x35c570 === v$1 ? "!--" === _0x4f5b54[1] ? _0x35c570 = _ : void 0 !== _0x4f5b54[1] ? _0x35c570 = m$1 : void 0 !== _0x4f5b54[2] ? (y2["test"](_0x4f5b54[2]) && (_0x16f668 = RegExp("</" + _0x4f5b54[2], "g")), _0x35c570 = p$1) : void 0 !== _0x4f5b54[3] && (_0x35c570 = p$1) : _0x35c570 === p$1 ? ">" === _0x4f5b54[0] ? (_0x35c570 = _0x16f668 ?? v$1, _0xe1c6d2 = -1) : void 0 === _0x4f5b54[1] ? _0xe1c6d2 = -2 : (_0xe1c6d2 = _0x35c570["lastIndex"] - _0x4f5b54[2]["length"], _0x5498d7 = _0x4f5b54[1], _0x35c570 = void 0 === _0x4f5b54[3] ? p$1 : '"' === _0x4f5b54[3] ? $ : g) : _0x35c570 === $ || _0x35c570 === g ? _0x35c570 = p$1 : _0x35c570 === _ || _0x35c570 === m$1 ? _0x35c570 = v$1 : (_0x35c570 = p$1, _0x16f668 = void 0);
    const _0x4a69a9 = _0x35c570 === p$1 && _0x575071[_0x1f6164 + 1]["startsWith"]("/>") ? " " : "";
    _0x3615d5 += _0x35c570 === v$1 ? _0x58cca2 + r$2 : _0xe1c6d2 >= 0 ? (_0x44c6f0["push"](_0x5498d7), _0x58cca2["slice"](0, _0xe1c6d2) + h$1 + _0x58cca2["slice"](_0xe1c6d2) + o$4 + _0x4a69a9) : _0x58cca2 + o$4 + (-2 === _0xe1c6d2 ? _0x1f6164 : _0x4a69a9);
  }
  return [V(_0x575071, _0x3615d5 + (_0x575071[_0x20b43a] || "<?>") + (2 === _0x4114e1 ? "</svg>" : 3 === _0x4114e1 ? "</math>" : "")), _0x44c6f0];
};
class S {
  constructor({ strings: _0x1c0f06, _$litType$: _0x21eb63 }, _0x10d511) {
    let _0x2546d4;
    this["parts"] = [];
    let _0x5cffb5 = 0, _0xc9a6f7 = 0;
    const _0x15bd54 = _0x1c0f06["length"] - 1, _0x388805 = this["parts"], [_0x2d6240, _0x4567b8] = N(_0x1c0f06, _0x21eb63);
    if (this["el"] = S["createElement"](_0x2d6240, _0x10d511), P["currentNode"] = this["el"]["content"], 2 === _0x21eb63 || 3 === _0x21eb63) {
      const _0x35a232 = this["el"]["content"]["firstChild"];
      _0x35a232["replaceWith"](..._0x35a232["childNodes"]);
    }
    for (; null !== (_0x2546d4 = P["nextNode"]()) && _0x388805["length"] < _0x15bd54; ) {
      if (1 === _0x2546d4["nodeType"]) {
        if (_0x2546d4["hasAttributes"]()) {
          for (const _0x34eb59 of _0x2546d4["getAttributeNames"]()) if (_0x34eb59["endsWith"](h$1)) {
            const _0x38cf46 = _0x4567b8[_0xc9a6f7++], _0x5297fb = _0x2546d4["getAttribute"](_0x34eb59)["split"](o$4), _0x2a793e = /([.?@])?(.*)/["exec"](_0x38cf46);
            _0x388805["push"]({ "type": 1, "index": _0x5cffb5, "name": _0x2a793e[2], "strings": _0x5297fb, "ctor": "." === _0x2a793e[1] ? I : "?" === _0x2a793e[1] ? L : "@" === _0x2a793e[1] ? z : H }), _0x2546d4["removeAttribute"](_0x34eb59);
          } else _0x34eb59["startsWith"](o$4) && (_0x388805["push"]({ "type": 6, "index": _0x5cffb5 }), _0x2546d4["removeAttribute"](_0x34eb59));
        }
        if (y2["test"](_0x2546d4["tagName"])) {
          const _0x104efe = _0x2546d4["textContent"]["split"](o$4), _0x10251b = _0x104efe["length"] - 1;
          if (_0x10251b > 0) {
            _0x2546d4["textContent"] = s$3 ? s$3["emptyScript"] : "";
            for (let _0x1650b1 = 0; _0x1650b1 < _0x10251b; _0x1650b1++) _0x2546d4["append"](_0x104efe[_0x1650b1], c$1()), P["nextNode"](), _0x388805["push"]({ "type": 2, "index": ++_0x5cffb5 });
            _0x2546d4["append"](_0x104efe[_0x10251b], c$1());
          }
        }
      } else {
        if (8 === _0x2546d4["nodeType"]) {
          if (_0x2546d4["data"] === n$2) _0x388805["push"]({ "type": 2, "index": _0x5cffb5 });
          else {
            let _0x26f0d1 = -1;
            for (; -1 !== (_0x26f0d1 = _0x2546d4["data"]["indexOf"](o$4, _0x26f0d1 + 1)); ) _0x388805["push"]({ "type": 7, "index": _0x5cffb5 }), _0x26f0d1 += o$4["length"] - 1;
          }
        }
      }
      _0x5cffb5++;
    }
  }
  static ["createElement"](_0x39bcbc, _0x4defe8) {
    const _0x46bc1e = l$1["createElement"]("template");
    return _0x46bc1e["innerHTML"] = _0x39bcbc, _0x46bc1e;
  }
}
function M$1(_0x2b9c35, _0x16b3e8, _0x217e80 = _0x2b9c35, _0x221324) {
  var _a2, _b;
  if (_0x16b3e8 === E) return _0x16b3e8;
  let _0x8ce3cb = void 0 !== _0x221324 ? (_a2 = _0x217e80["_$Co"]) == null ? void 0 : _a2[_0x221324] : _0x217e80["_$Cl"];
  const _0x49ad44 = a$1(_0x16b3e8) ? void 0 : _0x16b3e8["_$litDirective$"];
  return (_0x8ce3cb == null ? void 0 : _0x8ce3cb["constructor"]) !== _0x49ad44 && ((_b = _0x8ce3cb == null ? void 0 : _0x8ce3cb["_$AO"]) == null ? void 0 : _b.call(_0x8ce3cb, ![]), void 0 === _0x49ad44 ? _0x8ce3cb = void 0 : (_0x8ce3cb = new _0x49ad44(_0x2b9c35), _0x8ce3cb["_$AT"](_0x2b9c35, _0x217e80, _0x221324)), void 0 !== _0x221324 ? (_0x217e80["_$Co"] ?? (_0x217e80["_$Co"] = []))[_0x221324] = _0x8ce3cb : _0x217e80["_$Cl"] = _0x8ce3cb), void 0 !== _0x8ce3cb && (_0x16b3e8 = M$1(_0x2b9c35, _0x8ce3cb["_$AS"](_0x2b9c35, _0x16b3e8["values"]), _0x8ce3cb, _0x221324)), _0x16b3e8;
}
class R {
  constructor(_0x530939, _0x3ab11a) {
    this["_$AV"] = [], this["_$AN"] = void 0, this["_$AD"] = _0x530939, this["_$AM"] = _0x3ab11a;
  }
  get ["parentNode"]() {
    return this["_$AM"]["parentNode"];
  }
  get ["_$AU"]() {
    return this["_$AM"]["_$AU"];
  }
  ["u"](_0x371747) {
    const { el: { content: _0x4f0b45 }, parts: _0x8afb0f } = this["_$AD"], _0x3800d4 = ((_0x371747 == null ? void 0 : _0x371747["creationScope"]) ?? l$1)["importNode"](_0x4f0b45, !![]);
    P["currentNode"] = _0x3800d4;
    let _0x235c92 = P["nextNode"](), _0x72028 = 0, _0x32c80d = 0, _0x45bae1 = _0x8afb0f[0];
    for (; void 0 !== _0x45bae1; ) {
      if (_0x72028 === _0x45bae1["index"]) {
        let _0x24913a;
        2 === _0x45bae1["type"] ? _0x24913a = new k(_0x235c92, _0x235c92["nextSibling"], this, _0x371747) : 1 === _0x45bae1["type"] ? _0x24913a = new _0x45bae1["ctor"](_0x235c92, _0x45bae1["name"], _0x45bae1["strings"], this, _0x371747) : 6 === _0x45bae1["type"] && (_0x24913a = new Z(_0x235c92, this, _0x371747)), this["_$AV"]["push"](_0x24913a), _0x45bae1 = _0x8afb0f[++_0x32c80d];
      }
      _0x72028 !== (_0x45bae1 == null ? void 0 : _0x45bae1["index"]) && (_0x235c92 = P["nextNode"](), _0x72028++);
    }
    return P["currentNode"] = l$1, _0x3800d4;
  }
  ["p"](_0x391f2c) {
    let _0x5c485a = 0;
    for (const _0x42806e of this["_$AV"]) void 0 !== _0x42806e && (void 0 !== _0x42806e["strings"] ? (_0x42806e["_$AI"](_0x391f2c, _0x42806e, _0x5c485a), _0x5c485a += _0x42806e["strings"]["length"] - 2) : _0x42806e["_$AI"](_0x391f2c[_0x5c485a])), _0x5c485a++;
  }
}
class k {
  get ["_$AU"]() {
    var _a2;
    return ((_a2 = this["_$AM"]) == null ? void 0 : _a2["_$AU"]) ?? this["_$Cv"];
  }
  constructor(_0x451b5d, _0xe08323, _0x3a428f, _0x3bd15c) {
    this["type"] = 2, this["_$AH"] = A, this["_$AN"] = void 0, this["_$AA"] = _0x451b5d, this["_$AB"] = _0xe08323, this["_$AM"] = _0x3a428f, this["options"] = _0x3bd15c, this["_$Cv"] = (_0x3bd15c == null ? void 0 : _0x3bd15c["isConnected"]) ?? !![];
  }
  get ["parentNode"]() {
    let _0x37c8f6 = this["_$AA"]["parentNode"];
    const _0x252a5a = this["_$AM"];
    return void 0 !== _0x252a5a && 11 === (_0x37c8f6 == null ? void 0 : _0x37c8f6["nodeType"]) && (_0x37c8f6 = _0x252a5a["parentNode"]), _0x37c8f6;
  }
  get ["startNode"]() {
    return this["_$AA"];
  }
  get ["endNode"]() {
    return this["_$AB"];
  }
  ["_$AI"](_0x5de4be, _0x9f2bbd = this) {
    _0x5de4be = M$1(this, _0x5de4be, _0x9f2bbd), a$1(_0x5de4be) ? _0x5de4be === A || null == _0x5de4be || "" === _0x5de4be ? (this["_$AH"] !== A && this["_$AR"](), this["_$AH"] = A) : _0x5de4be !== this["_$AH"] && _0x5de4be !== E && this["_"](_0x5de4be) : void 0 !== _0x5de4be["_$litType$"] ? this["$"](_0x5de4be) : void 0 !== _0x5de4be["nodeType"] ? this["T"](_0x5de4be) : d(_0x5de4be) ? this["k"](_0x5de4be) : this["_"](_0x5de4be);
  }
  ["O"](_0x32d28e) {
    return this["_$AA"]["parentNode"]["insertBefore"](_0x32d28e, this["_$AB"]);
  }
  ["T"](_0x54f59c) {
    this["_$AH"] !== _0x54f59c && (this["_$AR"](), this["_$AH"] = this["O"](_0x54f59c));
  }
  ["_"](_0x2decb7) {
    this["_$AH"] !== A && a$1(this["_$AH"]) ? this["_$AA"]["nextSibling"]["data"] = _0x2decb7 : this["T"](l$1["createTextNode"](_0x2decb7)), this["_$AH"] = _0x2decb7;
  }
  ["$"](_0x4704c8) {
    var _a2;
    const { values: _0x5384ca, _$litType$: _0x17cb4d } = _0x4704c8, _0x22ef25 = "number" == typeof _0x17cb4d ? this["_$AC"](_0x4704c8) : (void 0 === _0x17cb4d["el"] && (_0x17cb4d["el"] = S["createElement"](V(_0x17cb4d["h"], _0x17cb4d["h"][0]), this["options"])), _0x17cb4d);
    if (((_a2 = this["_$AH"]) == null ? void 0 : _a2["_$AD"]) === _0x22ef25) this["_$AH"]["p"](_0x5384ca);
    else {
      const _0x5a5b1b = new R(_0x22ef25, this), _0x2cf34a = _0x5a5b1b["u"](this["options"]);
      _0x5a5b1b["p"](_0x5384ca), this["T"](_0x2cf34a), this["_$AH"] = _0x5a5b1b;
    }
  }
  ["_$AC"](_0x311296) {
    let _0x13c059 = C["get"](_0x311296["strings"]);
    return void 0 === _0x13c059 && C["set"](_0x311296["strings"], _0x13c059 = new S(_0x311296)), _0x13c059;
  }
  ["k"](_0x541119) {
    u$3(this["_$AH"]) || (this["_$AH"] = [], this["_$AR"]());
    const _0x2864ed = this["_$AH"];
    let _0x3135b4, _0x5c3b68 = 0;
    for (const _0x387fc2 of _0x541119) _0x5c3b68 === _0x2864ed["length"] ? _0x2864ed["push"](_0x3135b4 = new k(this["O"](c$1()), this["O"](c$1()), this, this["options"])) : _0x3135b4 = _0x2864ed[_0x5c3b68], _0x3135b4["_$AI"](_0x387fc2), _0x5c3b68++;
    _0x5c3b68 < _0x2864ed["length"] && (this["_$AR"](_0x3135b4 && _0x3135b4["_$AB"]["nextSibling"], _0x5c3b68), _0x2864ed["length"] = _0x5c3b68);
  }
  ["_$AR"](_0x47971e = this["_$AA"]["nextSibling"], _0x1573f3) {
    var _a2;
    for ((_a2 = this["_$AP"]) == null ? void 0 : _a2.call(this, ![], !![], _0x1573f3); _0x47971e !== this["_$AB"]; ) {
      const _0x5a7317 = i$3(_0x47971e)["nextSibling"];
      i$3(_0x47971e)["remove"](), _0x47971e = _0x5a7317;
    }
  }
  ["setConnected"](_0x2fbcac) {
    var _a2;
    void 0 === this["_$AM"] && (this["_$Cv"] = _0x2fbcac, (_a2 = this["_$AP"]) == null ? void 0 : _a2.call(this, _0x2fbcac));
  }
}
class H {
  get ["tagName"]() {
    return this["element"]["tagName"];
  }
  get ["_$AU"]() {
    return this["_$AM"]["_$AU"];
  }
  constructor(_0x3213aa, _0x4759bf, _0x1e1685, _0x5df50d, _0x5d67ff) {
    this["type"] = 1, this["_$AH"] = A, this["_$AN"] = void 0, this["element"] = _0x3213aa, this["name"] = _0x4759bf, this["_$AM"] = _0x5df50d, this["options"] = _0x5d67ff, _0x1e1685["length"] > 2 || "" !== _0x1e1685[0] || "" !== _0x1e1685[1] ? (this["_$AH"] = Array(_0x1e1685["length"] - 1)["fill"](new String()), this["strings"] = _0x1e1685) : this["_$AH"] = A;
  }
  ["_$AI"](_0x304d44, _0x520fad = this, _0x28b41c, _0x38e3f4) {
    const _0x4b3f1a = this["strings"];
    let _0x5c52a3 = ![];
    if (void 0 === _0x4b3f1a) _0x304d44 = M$1(this, _0x304d44, _0x520fad, 0), _0x5c52a3 = !a$1(_0x304d44) || _0x304d44 !== this["_$AH"] && _0x304d44 !== E, _0x5c52a3 && (this["_$AH"] = _0x304d44);
    else {
      const _0x585c00 = _0x304d44;
      let _0x231a9e, _0x3efdbb;
      for (_0x304d44 = _0x4b3f1a[0], _0x231a9e = 0; _0x231a9e < _0x4b3f1a["length"] - 1; _0x231a9e++) _0x3efdbb = M$1(this, _0x585c00[_0x28b41c + _0x231a9e], _0x520fad, _0x231a9e), _0x3efdbb === E && (_0x3efdbb = this["_$AH"][_0x231a9e]), _0x5c52a3 || (_0x5c52a3 = !a$1(_0x3efdbb) || _0x3efdbb !== this["_$AH"][_0x231a9e]), _0x3efdbb === A ? _0x304d44 = A : _0x304d44 !== A && (_0x304d44 += (_0x3efdbb ?? "") + _0x4b3f1a[_0x231a9e + 1]), this["_$AH"][_0x231a9e] = _0x3efdbb;
    }
    _0x5c52a3 && !_0x38e3f4 && this["j"](_0x304d44);
  }
  ["j"](_0x3dbf52) {
    _0x3dbf52 === A ? this["element"]["removeAttribute"](this["name"]) : this["element"]["setAttribute"](this["name"], _0x3dbf52 ?? "");
  }
}
class I extends H {
  constructor() {
    super(...arguments), this["type"] = 3;
  }
  ["j"](_0x5ac75) {
    this["element"][this["name"]] = _0x5ac75 === A ? void 0 : _0x5ac75;
  }
}
class L extends H {
  constructor() {
    super(...arguments), this["type"] = 4;
  }
  ["j"](_0x551f99) {
    this["element"]["toggleAttribute"](this["name"], !!_0x551f99 && _0x551f99 !== A);
  }
}
class z extends H {
  constructor(_0x2c0176, _0xdf88cc, _0x2a8be1, _0x48510a, _0x5b4dbb) {
    super(_0x2c0176, _0xdf88cc, _0x2a8be1, _0x48510a, _0x5b4dbb), this["type"] = 5;
  }
  ["_$AI"](_0x63ed53, _0x23337d = this) {
    if ((_0x63ed53 = M$1(this, _0x63ed53, _0x23337d, 0) ?? A) === E) return;
    const _0x4551d8 = this["_$AH"], _0x1f17a5 = _0x63ed53 === A && _0x4551d8 !== A || _0x63ed53["capture"] !== _0x4551d8["capture"] || _0x63ed53["once"] !== _0x4551d8["once"] || _0x63ed53["passive"] !== _0x4551d8["passive"], _0x5b7462 = _0x63ed53 !== A && (_0x4551d8 === A || _0x1f17a5);
    _0x1f17a5 && this["element"]["removeEventListener"](this["name"], this, _0x4551d8), _0x5b7462 && this["element"]["addEventListener"](this["name"], this, _0x63ed53), this["_$AH"] = _0x63ed53;
  }
  ["handleEvent"](_0x45c0a3) {
    var _a2;
    "function" == typeof this["_$AH"] ? this["_$AH"]["call"](((_a2 = this["options"]) == null ? void 0 : _a2["host"]) ?? this["element"], _0x45c0a3) : this["_$AH"]["handleEvent"](_0x45c0a3);
  }
}
class Z {
  constructor(_0x3ac183, _0x4c86fc, _0x122eda) {
    this["element"] = _0x3ac183, this["type"] = 6, this["_$AN"] = void 0, this["_$AM"] = _0x4c86fc, this["options"] = _0x122eda;
  }
  get ["_$AU"]() {
    return this["_$AM"]["_$AU"];
  }
  ["_$AI"](_0x8641a3) {
    M$1(this, _0x8641a3);
  }
}
const j = { "I": k }, B = t$4["litHtmlPolyfillSupport"];
B == null ? void 0 : B(S, k), (t$4["litHtmlVersions"] ?? (t$4["litHtmlVersions"] = []))["push"]("3.3.3");
const D = (_0x50188d, _0x3fa220, _0x2494cd) => {
  const _0x1cab44 = (_0x2494cd == null ? void 0 : _0x2494cd["renderBefore"]) ?? _0x3fa220;
  let _0x1b4543 = _0x1cab44["_$litPart$"];
  if (void 0 === _0x1b4543) {
    const _0x5c04c9 = (_0x2494cd == null ? void 0 : _0x2494cd["renderBefore"]) ?? null;
    _0x1cab44["_$litPart$"] = _0x1b4543 = new k(_0x3fa220["insertBefore"](c$1(), _0x5c04c9), _0x5c04c9, void 0, _0x2494cd ?? {});
  }
  return _0x1b4543["_$AI"](_0x50188d), _0x1b4543;
}, s$2 = globalThis;
let i$2 = class i extends y$1 {
  constructor() {
    super(...arguments), this["renderOptions"] = { "host": this }, this["_$Do"] = void 0;
  }
  ["createRenderRoot"]() {
    var _a2;
    const _0x1eaae9 = super["createRenderRoot"]();
    return (_a2 = this["renderOptions"])["renderBefore"] ?? (_a2["renderBefore"] = _0x1eaae9["firstChild"]), _0x1eaae9;
  }
  ["update"](_0x41abc8) {
    const _0x1ffd80 = this["render"]();
    this["hasUpdated"] || (this["renderOptions"]["isConnected"] = this["isConnected"]), super["update"](_0x41abc8), this["_$Do"] = D(_0x1ffd80, this["renderRoot"], this["renderOptions"]);
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
const t$3 = (_0x3a9b51) => (_0x10cc5f, _0x4a4fab) => {
  void 0 !== _0x4a4fab ? _0x4a4fab["addInitializer"](() => {
    customElements["define"](_0x3a9b51, _0x10cc5f);
  }) : customElements["define"](_0x3a9b51, _0x10cc5f);
}, o$2 = { "attribute": !![], "type": String, "converter": u$4, "reflect": ![], "hasChanged": f$1 }, r$1 = (_0x468d69 = o$2, _0x42d4d4, _0x14eacc) => {
  const { kind: _0x101ceb, metadata: _0x6d9566 } = _0x14eacc;
  let _0x7a4edf = globalThis["litPropertyMetadata"]["get"](_0x6d9566);
  if (void 0 === _0x7a4edf && globalThis["litPropertyMetadata"]["set"](_0x6d9566, _0x7a4edf = /* @__PURE__ */ new Map()), "setter" === _0x101ceb && ((_0x468d69 = Object["create"](_0x468d69))["wrapped"] = !![]), _0x7a4edf["set"](_0x14eacc["name"], _0x468d69), "accessor" === _0x101ceb) {
    const { name: _0x3f4ffa } = _0x14eacc;
    return { "set"(_0x3a49af) {
      const _0x5408f4 = _0x42d4d4["get"]["call"](this);
      _0x42d4d4["set"]["call"](this, _0x3a49af), this["requestUpdate"](_0x3f4ffa, _0x5408f4, _0x468d69, !![], _0x3a49af);
    }, "init"(_0x378758) {
      return void 0 !== _0x378758 && this["C"](_0x3f4ffa, void 0, _0x468d69, _0x378758), _0x378758;
    } };
  }
  if ("setter" === _0x101ceb) {
    const { name: _0x3ba30f } = _0x14eacc;
    return function(_0xe1095d) {
      const _0x47975d = this[_0x3ba30f];
      _0x42d4d4["call"](this, _0xe1095d), this["requestUpdate"](_0x3ba30f, _0x47975d, _0x468d69, !![], _0xe1095d);
    };
  }
  throw Error("Unsupported decorator location: " + _0x101ceb);
};
function n$1(_0x382a11) {
  return (_0x1e377c, _0x57ab44) => "object" == typeof _0x57ab44 ? r$1(_0x382a11, _0x1e377c, _0x57ab44) : ((_0x47bf82, _0x1a9f78, _0x152926) => {
    const _0x125c1c = _0x1a9f78["hasOwnProperty"](_0x152926);
    return _0x1a9f78["constructor"]["createProperty"](_0x152926, _0x47bf82), _0x125c1c ? Object["getOwnPropertyDescriptor"](_0x1a9f78, _0x152926) : void 0;
  })(_0x382a11, _0x1e377c, _0x57ab44);
}
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
function r(_0x17c745) {
  return n$1({ ..._0x17c745, "state": !![], "attribute": ![] });
}
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
const e$4 = (_0xd84e09, _0x514b13, _0x28e159) => (_0x28e159["configurable"] = !![], _0x28e159["enumerable"] = !![], Reflect["decorate"] && "object" != typeof _0x514b13 && Object["defineProperty"](_0xd84e09, _0x514b13, _0x28e159), _0x28e159);
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
function e$3(_0x497aa0, _0x18c589) {
  return (_0x1af05b, _0x2f2f18, _0x2ecfcc) => {
    const _0xcbd75e = (_0x57abc3) => {
      var _a2;
      return ((_a2 = _0x57abc3["renderRoot"]) == null ? void 0 : _a2["querySelector"](_0x497aa0)) ?? null;
    };
    return e$4(_0x1af05b, _0x2f2f18, { "get"() {
      return _0xcbd75e(this);
    } });
  };
}
class WriteOnlyApiKey {
  constructor(_0x37be86) {
    __privateAdd(this, _value, "");
    this["host"] = _0x37be86;
  }
  ["write"](_0x354bd2) {
    const _0x3d2f00 = __privateGet(this, _value);
    __privateSet(this, _value, _0x354bd2 ?? ""), this["host"]["requestUpdate"]("apiKey", _0x3d2f00);
  }
  ["writeDirect"](_0x40db4f) {
    __privateSet(this, _value, _0x40db4f);
  }
  get ["masked"]() {
    return __privateGet(this, _value) ? "••••••" : "";
  }
  get ["real"]() {
    return __privateGet(this, _value);
  }
}
_value = new WeakMap();
var __defProp$z = Object["defineProperty"], __getOwnPropDesc$A = Object["getOwnPropertyDescriptor"], __typeError$4 = (_0x3152b) => {
  throw TypeError(_0x3152b);
}, __decorateClass$A = (_0xf5ed00, _0x37e1e1, _0x2e6f5f, _0x50f385) => {
  var _0x24b24a = _0x50f385 > 1 ? void 0 : _0x50f385 ? __getOwnPropDesc$A(_0x37e1e1, _0x2e6f5f) : _0x37e1e1;
  for (var _0x5acd1a = _0xf5ed00["length"] - 1, _0x363faa; _0x5acd1a >= 0; _0x5acd1a--) if (_0x363faa = _0xf5ed00[_0x5acd1a]) _0x24b24a = (_0x50f385 ? _0x363faa(_0x37e1e1, _0x2e6f5f, _0x24b24a) : _0x363faa(_0x24b24a)) || _0x24b24a;
  if (_0x50f385 && _0x24b24a) __defProp$z(_0x37e1e1, _0x2e6f5f, _0x24b24a);
  return _0x24b24a;
}, __accessCheck$4 = (_0x521372, _0x1569dc, _0x2104fe) => _0x1569dc["has"](_0x521372) || __typeError$4("Cannot " + _0x2104fe), __privateGet$4 = (_0x15162a, _0x281841, _0x2ac7dc) => (__accessCheck$4(_0x15162a, _0x281841, "read from private field"), _0x2ac7dc ? _0x2ac7dc["call"](_0x15162a) : _0x281841["get"](_0x15162a)), __privateAdd$4 = (_0x4ce2b8, _0x4dbb99, _0x43057c) => _0x4dbb99["has"](_0x4ce2b8) ? __typeError$4("Cannot add the same private member more than once") : _0x4dbb99 instanceof WeakSet ? _0x4dbb99["add"](_0x4ce2b8) : _0x4dbb99["set"](_0x4ce2b8, _0x43057c), _apiKeyState$2;
let tucbsMapInstanceCounter = 0, TucbsMap = class extends i$2 {
  constructor() {
    super(...arguments), this["_autoId"] = "tucbs-map-" + ++tucbsMapInstanceCounter, __privateAdd$4(this, _apiKeyState$2, new WriteOnlyApiKey(this)), this["authToken"] = "", this["proxyBase"] = "", this["basemap"] = "hgm-siyasi", this["mode"] = "3D", this["quality"] = 70, this["mapWidth"] = "100%", this["mapHeight"] = "100%", this["_mapInstance"] = null, this["_skipInitialPropertySync"] = ![], this["_authError"] = null, this["_apiKeyAuthState"] = "none";
  }
  get ["hostId"]() {
    return this["id"] || this["_autoId"];
  }
  set ["apiKey"](_0x4035bd) {
    __privateGet$4(this, _apiKeyState$2)["write"](_0x4035bd);
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
  ["_grantApiKeyTo"](_0x584a6a) {
    _0x584a6a["apiKey"] = __privateGet$4(this, _apiKeyState$2)["real"];
  }
  ["createRenderRoot"]() {
    return this;
  }
  ["connectedCallback"]() {
    super["connectedCallback"](), !this["id"] && (this["id"] = this["_autoId"]);
  }
  ["firstUpdated"]() {
    const _0x5e3d2f = this["getAttribute"]("api-key");
    _0x5e3d2f && !__privateGet$4(this, _apiKeyState$2)["real"] && __privateGet$4(this, _apiKeyState$2)["writeDirect"](_0x5e3d2f), void this["_prepareMap"]();
  }
  async ["_prepareMap"]() {
    this["_apiKeyAuthState"] = "pending";
    try {
      await ensureEffectiveApiKeyValid(__privateGet$4(this, _apiKeyState$2)["real"] || void 0, getUcbpApiBase());
    } catch (_0x2b286d) {
      const _0x2f8b6d = _0x2b286d instanceof Error ? _0x2b286d["message"] : String(_0x2b286d), _0x319014 = _0x2b286d instanceof TucbsError ? _0x2b286d["title"] : "API Hatası";
      console["error"]("[tucbs-map] apiKey validate başarısız:", _0x2f8b6d), this["_apiKeyAuthState"] = "failed", this["_authError"] = { "title": _0x319014, "message": _0x2f8b6d }, this["dispatchEvent"](new CustomEvent("error", { "detail": _0x2b286d instanceof TucbsError ? { "error": _0x2b286d, "message": _0x2f8b6d, "title": _0x319014, "code": _0x2b286d["code"], "number": _0x2b286d["number"] } : { "error": _0x2b286d, "message": _0x2f8b6d, "title": _0x319014 }, "bubbles": !![], "composed": !![] }));
      return;
    }
    const _0x571bf5 = "#" + this["hostId"] + "-host", _0x48f577 = this["renderRoot"]["querySelector"](_0x571bf5), _0x446d4d = { "timeline": ![], "animation": ![], "geocoder": ![], "homeButton": ![], "sceneModePicker": ![], "navigationHelpButton": ![], "infoBox": ![], "selectionIndicator": ![], "fullscreenButton": ![], "basemap": this["basemap"], ...__privateGet$4(this, _apiKeyState$2)["real"] ? { "apiKey": __privateGet$4(this, _apiKeyState$2)["real"] } : {}, ...this["initialExtent"] !== void 0 ? { "initialExtent": this["initialExtent"] } : {}, ...this["mapOptions"] };
    this["_mapInstance"] = new _0xf20948(_0x48f577, _0x446d4d), this["_mapInstance"]["setQuality"](this["quality"]), this["_skipInitialPropertySync"] = !![], this["_apiKeyAuthState"] = "ok", this["_authError"] = null, this["dispatchEvent"](new CustomEvent("ready", { "detail": { "map": this["_mapInstance"] }, "bubbles": !![], "composed": !![] }));
  }
  ["updated"](_0x258c88) {
    if (!this["_mapInstance"]) return;
    if (this["_skipInitialPropertySync"]) {
      this["_skipInitialPropertySync"] = ![];
      return;
    }
    if (_0x258c88["has"]("basemap")) this["_mapInstance"]["setBasemap"](this["basemap"]);
    if (_0x258c88["has"]("mode")) this["_mapInstance"]["setMode"](this["mode"]);
    if (_0x258c88["has"]("quality")) this["_mapInstance"]["setQuality"](this["quality"]);
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
const t$2 = { "ATTRIBUTE": 1, "CHILD": 2 }, e$2 = (_0x5bbd75) => (..._0x28bf0e) => ({ "_$litDirective$": _0x5bbd75, "values": _0x28bf0e });
let i$1 = class i2 {
  constructor(_0x343ec0) {
  }
  get ["_$AU"]() {
    return this["_$AM"]["_$AU"];
  }
  ["_$AT"](_0x3780c1, _0x3fd6cd, _0x48c0cd) {
    this["_$Ct"] = _0x3780c1, this["_$AM"] = _0x3fd6cd, this["_$Ci"] = _0x48c0cd;
  }
  ["_$AS"](_0x2be45d, _0x4733ac) {
    return this["update"](_0x2be45d, _0x4733ac);
  }
  ["update"](_0xac8ebf, _0x40b8aa) {
    return this["render"](..._0x40b8aa);
  }
}, e$1 = class e extends i$1 {
  constructor(_0x19fed9) {
    if (super(_0x19fed9), this["it"] = A, _0x19fed9["type"] !== t$2["CHILD"]) throw Error(this["constructor"]["directiveName"] + "() can only be used in child bindings");
  }
  ["render"](_0x1245d5) {
    if (_0x1245d5 === A || null == _0x1245d5) return this["_t"] = void 0, this["it"] = _0x1245d5;
    if (_0x1245d5 === E) return _0x1245d5;
    if ("string" != typeof _0x1245d5) throw Error(this["constructor"]["directiveName"] + "() called with a non-string value");
    if (_0x1245d5 === this["it"]) return this["_t"];
    this["it"] = _0x1245d5;
    const _0x44b0fc = [_0x1245d5];
    return _0x44b0fc["raw"] = _0x44b0fc, this["_t"] = { "_$litType$": this["constructor"]["resultType"], "strings": _0x44b0fc, "values": [] };
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
  ["activate"](_0x2b283c, _0x17a133) {
    if (this["entries"]["has"](_0x2b283c)) {
      this["touch"](_0x2b283c);
      return;
    }
    this["entries"]["size"] >= MAX_CONCURRENT_PREVIEW_VIEWERS && this["evictOldest"](), this["entries"]["set"](_0x2b283c, { "lastUsed": performance["now"](), "onEvict": _0x17a133 });
  }
  ["touch"](_0x547f76) {
    const _0x103d05 = this["entries"]["get"](_0x547f76);
    if (_0x103d05) _0x103d05["lastUsed"] = performance["now"]();
  }
  ["release"](_0x2ff8d0) {
    this["entries"]["delete"](_0x2ff8d0);
  }
  ["evictOldest"]() {
    let _0x495b49, _0x280e0e;
    for (const [_0xd9e36d, _0x1bd313] of this["entries"]) {
      (!_0x280e0e || _0x1bd313["lastUsed"] < _0x280e0e["lastUsed"]) && (_0x495b49 = _0xd9e36d, _0x280e0e = _0x1bd313);
    }
    if (_0x495b49 === void 0 || _0x280e0e === void 0) return;
    this["entries"]["delete"](_0x495b49), _0x280e0e["onEvict"]();
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
  ["isCurrent"](_0x4ed0d6) {
    return _0x4ed0d6 === this["current"];
  }
}
function iconNodeToString(_0x5d9bd3) {
  const _0x408fa6 = _0x5d9bd3["attrs"] ? Object["entries"](_0x5d9bd3["attrs"])["map"](([_0x5cef22, _0x41016b]) => _0x5cef22 + '="' + String(_0x41016b) + '"')["join"](" ") : "", _0x2ee9a1 = (_0x5d9bd3["content"] ?? [])["map"](iconNodeToString)["join"]("");
  return "<" + _0x5d9bd3["elem"] + " " + _0x408fa6 + ">" + _0x2ee9a1 + "</" + _0x5d9bd3["elem"] + ">";
}
function zoomInProportional(_0x316ec3, _0x330bec, _0x6af458 = 0) {
  const _0x16d62d = _0x316ec3["positionCartographic"]["height"], _0x4dff00 = Math["min"](_0x16d62d * _0x330bec, _0x16d62d - _0x6af458);
  if (_0x4dff00 > 0) _0x316ec3["zoomIn"](_0x4dff00);
}
function zoomOutProportional(_0x112f64, _0x27c5fa, _0x4ed0ab = Infinity) {
  const _0x1201a2 = _0x112f64["positionCartographic"]["height"], _0x52b7ba = Math["min"](_0x1201a2 * _0x27c5fa, _0x4ed0ab - _0x1201a2);
  if (_0x52b7ba > 0) _0x112f64["zoomOut"](_0x52b7ba);
}
var __defProp$y = Object["defineProperty"], __getOwnPropDesc$z = Object["getOwnPropertyDescriptor"], __typeError$3 = (_0x10c845) => {
  throw TypeError(_0x10c845);
}, __decorateClass$z = (_0x4e333e, _0x269cb9, _0x44eb3c, _0x3bee48) => {
  var _0x7d4489 = _0x3bee48 > 1 ? void 0 : _0x3bee48 ? __getOwnPropDesc$z(_0x269cb9, _0x44eb3c) : _0x269cb9;
  for (var _0x2e99ca = _0x4e333e["length"] - 1, _0x30bf84; _0x2e99ca >= 0; _0x2e99ca--) if (_0x30bf84 = _0x4e333e[_0x2e99ca]) _0x7d4489 = (_0x3bee48 ? _0x30bf84(_0x269cb9, _0x44eb3c, _0x7d4489) : _0x30bf84(_0x7d4489)) || _0x7d4489;
  if (_0x3bee48 && _0x7d4489) __defProp$y(_0x269cb9, _0x44eb3c, _0x7d4489);
  return _0x7d4489;
}, __accessCheck$3 = (_0x46d5a9, _0x1ccc5b, _0x37c428) => _0x1ccc5b["has"](_0x46d5a9) || __typeError$3("Cannot " + _0x37c428), __privateGet$3 = (_0x506675, _0x427ac1, _0x22c9dc) => (__accessCheck$3(_0x506675, _0x427ac1, "read from private field"), _0x22c9dc ? _0x22c9dc["call"](_0x506675) : _0x427ac1["get"](_0x506675)), __privateAdd$3 = (_0x21368f, _0x16e32c, _0xe39b03) => _0x16e32c["has"](_0x21368f) ? __typeError$3("Cannot add the same private member more than once") : _0x16e32c instanceof WeakSet ? _0x16e32c["add"](_0x21368f) : _0x16e32c["set"](_0x21368f, _0xe39b03), __privateSet$1 = (_0x2dd34c, _0x1f05e6, _0x5cdea7, _0x4849de) => (__accessCheck$3(_0x2dd34c, _0x1f05e6, "write to private field"), _0x1f05e6["set"](_0x2dd34c, _0x5cdea7), _0x5cdea7), _apiKey$1;
const ICON_ZOOM_IN$3 = o$1(iconNodeToString(_16_default$1)), ICON_ZOOM_OUT$1 = o$1(iconNodeToString(_16_default)), IMAGERY_LAYER_TYPES = /* @__PURE__ */ new Set(["WMS", "WMTS", "WCS", "GEOTIFF", "XYZ"]), GLOBAL_LONGITUDE_SPAN_THRESHOLD = _0x30289b["toRadians"](350), GLOBAL_LATITUDE_SPAN_THRESHOLD = _0x30289b["toRadians"](160);
function isGloballyExtentedLayer(_0x6e8893) {
  var _a2;
  const _0xae5ba = _0x6e8893["cesiumObject"];
  if (!("imageryProvider" in _0xae5ba)) return ![];
  const _0x2f55b2 = (_a2 = _0xae5ba["imageryProvider"]) == null ? void 0 : _a2["rectangle"];
  if (!_0x2f55b2) return ![];
  const _0x952094 = _0x2f55b2["east"] - _0x2f55b2["west"], _0x595088 = _0x2f55b2["north"] - _0x2f55b2["south"];
  return _0x952094 >= GLOBAL_LONGITUDE_SPAN_THRESHOLD && _0x595088 >= GLOBAL_LATITUDE_SPAN_THRESHOLD;
}
const HGM_GATED_BASEMAP_IDS = new Set(HGM_BASEMAP_IDS);
let tucbsMapPreviewInstanceCounter = 0, TucbsMapPreview = class extends i$2 {
  constructor() {
    super(...arguments), this["_autoId"] = "tucbs-map-preview-" + ++tucbsMapPreviewInstanceCounter, __privateAdd$3(this, _apiKey$1, ""), this["basemap"] = "hgm-temel", this["mode"] = "2D", this["width"] = "300px", this["height"] = "200px", this["showZoomButtons"] = !![], this["zoomToLayer"] = ![], this["_active"] = ![], this["_mapInstance"] = null, this["_loading"] = ![], this["_basemapBlocked"] = ![], this["_syncGeneration"] = new AsyncGeneration();
  }
  get ["hostId"]() {
    return this["id"] || this["_autoId"];
  }
  set ["apiKey"](_0x241c80) {
    const _0x356d5e = __privateGet$3(this, _apiKey$1);
    __privateSet$1(this, _apiKey$1, _0x241c80), this["requestUpdate"]("apiKey", _0x356d5e);
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
    this["_observer"] = new IntersectionObserver((_0x132a08) => {
      var _a2;
      ((_a2 = _0x132a08[0]) == null ? void 0 : _a2["isIntersecting"]) ? this["_requestActivate"]() : this["_requestDeactivate"]();
    }), this["_observer"]["observe"](this);
  }
  ["disconnectedCallback"]() {
    var _a2;
    super["disconnectedCallback"](), (_a2 = this["_observer"]) == null ? void 0 : _a2["disconnect"](), this["_requestDeactivate"]();
  }
  ["updated"](_0x593b71) {
    if (!this["_mapInstance"]) return;
    if (_0x593b71["has"]("basemap") || _0x593b71["has"]("apiKey")) void this["_syncBasemap"]();
    if (_0x593b71["has"]("mode")) this["_mapInstance"]["setMode"](this["mode"]);
    (_0x593b71["has"]("layer") || _0x593b71["has"]("layerOptions")) && (void this["_syncLayer"](), void this["_syncBasemap"]());
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
    const _0x339452 = this["renderRoot"]["querySelector"]("#" + this["hostId"] + "-host");
    if (!_0x339452) return;
    this["_mapInstance"] = new _0xf20948(_0x339452, { ...__privateGet$3(this, _apiKey$1) ? { "apiKey": __privateGet$3(this, _apiKey$1) } : {}, "timeline": ![], "animation": ![], "geocoder": ![], "homeButton": ![], "sceneModePicker": ![], "navigationHelpButton": ![], "infoBox": ![], "selectionIndicator": ![], "fullscreenButton": ![] }), this["_mapInstance"]["setMode"](this["mode"]), this["_mapInstance"]["setQuality"](75), this["_mapInstance"]["viewer"]["scene"]["globe"]["baseColor"] = Color["fromCssColorString"]("#f4f4f4"), this["_resizeObserver"] = new ResizeObserver(() => {
      var _a2, _b;
      (_a2 = this["_mapInstance"]) == null ? void 0 : _a2["resize"](), (_b = this["_mapInstance"]) == null ? void 0 : _b["setExtent"](DEFAULT_INITIAL_EXTENT);
    }), this["_resizeObserver"]["observe"](_0x339452), this["_unregisterApiKeyRefresh"] = registerApiKeyRefresh(() => {
      void this["_syncBasemap"]();
    }), void this["_syncBasemap"](), void this["_syncLayer"]();
  }
  ["_deactivate"]() {
    var _a2, _b, _c;
    this["_active"] = ![], (_a2 = this["_resizeObserver"]) == null ? void 0 : _a2["disconnect"](), this["_resizeObserver"] = void 0, (_b = this["_unregisterApiKeyRefresh"]) == null ? void 0 : _b.call(this), this["_unregisterApiKeyRefresh"] = void 0, (_c = this["_mapInstance"]) == null ? void 0 : _c["destroy"](), this["_mapInstance"] = null, this["_currentLayerId"] = void 0;
  }
  async ["_syncBasemap"]() {
    const _0x466647 = this["_mapInstance"];
    if (!_0x466647) return;
    if (!HGM_GATED_BASEMAP_IDS["has"](this["basemap"])) {
      this["_basemapBlocked"] = ![], _0x466647["setBasemap"](this["basemap"]);
      return;
    }
    try {
      await ensureEffectiveApiKeyValid(__privateGet$3(this, _apiKey$1) || void 0, getUcbpApiBase());
    } catch (_0x583212) {
      const _0x3658fe = _0x583212 instanceof ApiKeyValidationError && _0x583212["reason"] === "missing-key", _0x332611 = this["layerOptions"] ?? this["layer"], _0x341550 = _0x332611 ? _0x332611["options"]["url"] : void 0, _0x27d91c = !!_0x332611 && (!_0x341550 || !_0x466647["layerManager"]["layerRequiresApiKey"](_0x341550));
      this["_basemapBlocked"] = !(_0x3658fe && _0x27d91c), _0x466647["setBasemap"](null);
      return;
    }
    this["_basemapBlocked"] = ![], _0x466647["setBasemap"](this["basemap"]);
  }
  async ["_syncLayer"]() {
    const _0x9e452e = this["_mapInstance"];
    if (!_0x9e452e) return;
    const _0x492afe = this["_syncGeneration"]["next"](), _0x172a0b = this["_currentLayerId"], _0x34a757 = this["layerOptions"] ?? this["layer"];
    if (!_0x34a757) {
      this["_loading"] = ![];
      if (_0x172a0b) _0x9e452e["layerManager"]["removeLayer"](_0x172a0b);
      this["_currentLayerId"] = void 0, _0x9e452e["setExtent"](DEFAULT_INITIAL_EXTENT);
      return;
    }
    this["_loading"] = !![];
    try {
      const _0xd03358 = await this["_addLayer"](_0x9e452e, _0x34a757);
      if (!this["_syncGeneration"]["isCurrent"](_0x492afe)) {
        _0x9e452e["layerManager"]["removeLayer"](_0xd03358["id"]);
        return;
      }
      this["_currentLayerId"] = _0xd03358["id"];
      if (this["zoomToLayer"] && !isGloballyExtentedLayer(_0xd03358)) {
        const _0xf6a48d = await _0x9e452e["layerManager"]["zoomToLayer"](_0xd03358["id"])["catch"](() => ![]);
        if (!_0xf6a48d) _0x9e452e["setExtent"](DEFAULT_INITIAL_EXTENT);
      } else _0x9e452e["setExtent"](DEFAULT_INITIAL_EXTENT);
      if (IMAGERY_LAYER_TYPES["has"](_0x34a757["layerType"])) {
        await this["_waitForTilesLoaded"](_0x9e452e);
        if (!this["_syncGeneration"]["isCurrent"](_0x492afe)) return;
      }
      _0x172a0b && _0x172a0b !== this["_currentLayerId"] && _0x9e452e["layerManager"]["removeLayer"](_0x172a0b);
    } finally {
      if (this["_syncGeneration"]["isCurrent"](_0x492afe)) this["_loading"] = ![];
    }
  }
  ["_waitForTilesLoaded"](_0x3a17af, _0x273318 = 5e3) {
    return new Promise((_0x5b44f7) => {
      const _0x5ea7cf = _0x3a17af["viewer"]["scene"]["globe"];
      if (_0x5ea7cf["tilesLoaded"]) {
        _0x5b44f7();
        return;
      }
      let _0x4cd2fd = ![];
      const _0x2a5d2d = () => {
        if (_0x4cd2fd) return;
        _0x4cd2fd = !![], _0x5ea7cf["tileLoadProgressEvent"]["removeEventListener"](_0x3cede6), clearTimeout(_0x30b26c), _0x5b44f7();
      }, _0x3cede6 = (_0x235791) => {
        if (_0x235791 === 0) _0x2a5d2d();
      };
      _0x5ea7cf["tileLoadProgressEvent"]["addEventListener"](_0x3cede6);
      const _0x30b26c = setTimeout(_0x2a5d2d, _0x273318);
    });
  }
  async ["_addLayer"](_0x5802d0, _0x3cc9c1) {
    switch (_0x3cc9c1["layerType"]) {
      case "WMS":
        return _0x5802d0["layerManager"]["add"]("WMS", _0x3cc9c1["options"]);
      case "WMTS":
        return _0x5802d0["layerManager"]["add"]("WMTS", _0x3cc9c1["options"]);
      case "WFS":
        return _0x5802d0["layerManager"]["add"]("WFS", _0x3cc9c1["options"]);
      case "WCS":
        return _0x5802d0["layerManager"]["add"]("WCS", _0x3cc9c1["options"]);
      case "GEOTIFF":
        return _0x5802d0["layerManager"]["add"]("GEOTIFF", _0x3cc9c1["options"]);
      case "GEOJSON":
      case "KML":
      case "KMZ":
      case "SHP":
      case "CSV":
        return _0x5802d0["layerManager"]["add"](_0x3cc9c1["layerType"], _0x3cc9c1["options"]);
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
    const _0x7d08cf = (_a2 = this["_mapInstance"]) == null ? void 0 : _a2["viewer"];
    if (!_0x7d08cf) return;
    zoomInProportional(_0x7d08cf["camera"], TucbsMapPreview["ZOOM_STEP_RATIO"], _0x7d08cf["scene"]["screenSpaceCameraController"]["minimumZoomDistance"]);
  }
  ["_zoomOut"]() {
    var _a2;
    const _0x1e67d2 = (_a2 = this["_mapInstance"]) == null ? void 0 : _a2["viewer"];
    if (!_0x1e67d2) return;
    zoomOutProportional(_0x1e67d2["camera"], TucbsMapPreview["ZOOM_STEP_RATIO"], _0x1e67d2["scene"]["screenSpaceCameraController"]["maximumZoomDistance"]);
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
_apiKey$1 = /* @__PURE__ */ new WeakMap(), TucbsMapPreview["ZOOM_STEP_RATIO"] = 0.5, __decorateClass$z([n$1({ "attribute": "api-key" })], TucbsMapPreview["prototype"], "apiKey", 1), __decorateClass$z([n$1()], TucbsMapPreview["prototype"], "basemap", 2), __decorateClass$z([n$1()], TucbsMapPreview["prototype"], "mode", 2), __decorateClass$z([n$1()], TucbsMapPreview["prototype"], "width", 2), __decorateClass$z([n$1()], TucbsMapPreview["prototype"], "height", 2), __decorateClass$z([n$1({ "type": Object })], TucbsMapPreview["prototype"], "layer", 2), __decorateClass$z([n$1({ "type": Object, "attribute": "layer-options" })], TucbsMapPreview["prototype"], "layerOptions", 2), __decorateClass$z([n$1({ "attribute": "show-zoom-buttons", "converter": (_0x38aab3) => _0x38aab3 !== "false" })], TucbsMapPreview["prototype"], "showZoomButtons", 2), __decorateClass$z([n$1({ "type": Boolean, "attribute": "zoom-to-layer" })], TucbsMapPreview["prototype"], "zoomToLayer", 2), __decorateClass$z([r()], TucbsMapPreview["prototype"], "_active", 2), __decorateClass$z([r()], TucbsMapPreview["prototype"], "_mapInstance", 2), __decorateClass$z([r()], TucbsMapPreview["prototype"], "_loading", 2), __decorateClass$z([r()], TucbsMapPreview["prototype"], "_basemapBlocked", 2), TucbsMapPreview = __decorateClass$z([t$3("tucbs-map-preview")], TucbsMapPreview);
/**
* @license
* Copyright 2020 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
const { I: t2 } = j, i3 = (_0x3c5d42) => _0x3c5d42, s$1 = () => document["createComment"](""), v = (_0xc9f3d7, _0x231869, _0x43ebdf) => {
  var _a2;
  const _0x133182 = _0xc9f3d7["_$AA"]["parentNode"], _0x1e65fb = void 0 === _0x231869 ? _0xc9f3d7["_$AB"] : _0x231869["_$AA"];
  if (void 0 === _0x43ebdf) {
    const _0x34d2d4 = _0x133182["insertBefore"](s$1(), _0x1e65fb), _0x520469 = _0x133182["insertBefore"](s$1(), _0x1e65fb);
    _0x43ebdf = new t2(_0x34d2d4, _0x520469, _0xc9f3d7, _0xc9f3d7["options"]);
  } else {
    const _0x5011ab = _0x43ebdf["_$AB"]["nextSibling"], _0x1fd0da = _0x43ebdf["_$AM"], _0x5149d9 = _0x1fd0da !== _0xc9f3d7;
    if (_0x5149d9) {
      let _0x781dda;
      (_a2 = _0x43ebdf["_$AQ"]) == null ? void 0 : _a2.call(_0x43ebdf, _0xc9f3d7), _0x43ebdf["_$AM"] = _0xc9f3d7, void 0 !== _0x43ebdf["_$AP"] && (_0x781dda = _0xc9f3d7["_$AU"]) !== _0x1fd0da["_$AU"] && _0x43ebdf["_$AP"](_0x781dda);
    }
    if (_0x5011ab !== _0x1e65fb || _0x5149d9) {
      let _0x57c1b3 = _0x43ebdf["_$AA"];
      for (; _0x57c1b3 !== _0x5011ab; ) {
        const _0x3c6431 = i3(_0x57c1b3)["nextSibling"];
        i3(_0x133182)["insertBefore"](_0x57c1b3, _0x1e65fb), _0x57c1b3 = _0x3c6431;
      }
    }
  }
  return _0x43ebdf;
}, u$2 = (_0x2babe3, _0x45a598, _0x230e99 = _0x2babe3) => (_0x2babe3["_$AI"](_0x45a598, _0x230e99), _0x2babe3), m = {}, p = (_0x126f35, _0x5125a6 = m) => _0x126f35["_$AH"] = _0x5125a6, M = (_0x406541) => _0x406541["_$AH"], h = (_0x2cee0b) => {
  _0x2cee0b["_$AR"](), _0x2cee0b["_$AA"]["remove"]();
}, u$1 = (_0x144027, _0x598362, _0x254f14) => {
  const _0x443fa2 = /* @__PURE__ */ new Map();
  for (let _0x3fca61 = _0x598362; _0x3fca61 <= _0x254f14; _0x3fca61++) _0x443fa2["set"](_0x144027[_0x3fca61], _0x3fca61);
  return _0x443fa2;
}, c = e$2(class extends i$1 {
  constructor(_0x4bf112) {
    if (super(_0x4bf112), _0x4bf112["type"] !== t$2["CHILD"]) throw Error("repeat() can only be used in text expressions");
  }
  ["dt"](_0x618d1b, _0x2851c1, _0x1fb981) {
    let _0x277e3d;
    void 0 === _0x1fb981 ? _0x1fb981 = _0x2851c1 : void 0 !== _0x2851c1 && (_0x277e3d = _0x2851c1);
    const _0x5e9c18 = [], _0x24b529 = [];
    let _0x52c956 = 0;
    for (const _0x4b5c41 of _0x618d1b) _0x5e9c18[_0x52c956] = _0x277e3d ? _0x277e3d(_0x4b5c41, _0x52c956) : _0x52c956, _0x24b529[_0x52c956] = _0x1fb981(_0x4b5c41, _0x52c956), _0x52c956++;
    return { "values": _0x24b529, "keys": _0x5e9c18 };
  }
  ["render"](_0x19649d, _0x3ee0d5, _0x43026f) {
    return this["dt"](_0x19649d, _0x3ee0d5, _0x43026f)["values"];
  }
  ["update"](_0x15dd55, [_0x29778d, _0x31b302, _0x10b530]) {
    const _0x21840d = M(_0x15dd55), { values: _0x384353, keys: _0x2a42e9 } = this["dt"](_0x29778d, _0x31b302, _0x10b530);
    if (!Array["isArray"](_0x21840d)) return this["ut"] = _0x2a42e9, _0x384353;
    const _0x5c05c0 = this["ut"] ?? (this["ut"] = []), _0x2b914e = [];
    let _0x2cd37b, _0x122dfb, _0x5e79cd = 0, _0x38b489 = _0x21840d["length"] - 1, _0x3b589e = 0, _0x19849d = _0x384353["length"] - 1;
    for (; _0x5e79cd <= _0x38b489 && _0x3b589e <= _0x19849d; ) if (null === _0x21840d[_0x5e79cd]) _0x5e79cd++;
    else {
      if (null === _0x21840d[_0x38b489]) _0x38b489--;
      else {
        if (_0x5c05c0[_0x5e79cd] === _0x2a42e9[_0x3b589e]) _0x2b914e[_0x3b589e] = u$2(_0x21840d[_0x5e79cd], _0x384353[_0x3b589e]), _0x5e79cd++, _0x3b589e++;
        else {
          if (_0x5c05c0[_0x38b489] === _0x2a42e9[_0x19849d]) _0x2b914e[_0x19849d] = u$2(_0x21840d[_0x38b489], _0x384353[_0x19849d]), _0x38b489--, _0x19849d--;
          else {
            if (_0x5c05c0[_0x5e79cd] === _0x2a42e9[_0x19849d]) _0x2b914e[_0x19849d] = u$2(_0x21840d[_0x5e79cd], _0x384353[_0x19849d]), v(_0x15dd55, _0x2b914e[_0x19849d + 1], _0x21840d[_0x5e79cd]), _0x5e79cd++, _0x19849d--;
            else {
              if (_0x5c05c0[_0x38b489] === _0x2a42e9[_0x3b589e]) _0x2b914e[_0x3b589e] = u$2(_0x21840d[_0x38b489], _0x384353[_0x3b589e]), v(_0x15dd55, _0x21840d[_0x5e79cd], _0x21840d[_0x38b489]), _0x38b489--, _0x3b589e++;
              else {
                if (void 0 === _0x2cd37b && (_0x2cd37b = u$1(_0x2a42e9, _0x3b589e, _0x19849d), _0x122dfb = u$1(_0x5c05c0, _0x5e79cd, _0x38b489)), _0x2cd37b["has"](_0x5c05c0[_0x5e79cd])) {
                  if (_0x2cd37b["has"](_0x5c05c0[_0x38b489])) {
                    const _0x3d8bcf = _0x122dfb["get"](_0x2a42e9[_0x3b589e]), _0x3dc2ba = void 0 !== _0x3d8bcf ? _0x21840d[_0x3d8bcf] : null;
                    if (null === _0x3dc2ba) {
                      const _0x5d5472 = v(_0x15dd55, _0x21840d[_0x5e79cd]);
                      u$2(_0x5d5472, _0x384353[_0x3b589e]), _0x2b914e[_0x3b589e] = _0x5d5472;
                    } else _0x2b914e[_0x3b589e] = u$2(_0x3dc2ba, _0x384353[_0x3b589e]), v(_0x15dd55, _0x21840d[_0x5e79cd], _0x3dc2ba), _0x21840d[_0x3d8bcf] = null;
                    _0x3b589e++;
                  } else h(_0x21840d[_0x38b489]), _0x38b489--;
                } else h(_0x21840d[_0x5e79cd]), _0x5e79cd++;
              }
            }
          }
        }
      }
    }
    for (; _0x3b589e <= _0x19849d; ) {
      const _0x1ab89d = v(_0x15dd55, _0x2b914e[_0x19849d + 1]);
      u$2(_0x1ab89d, _0x384353[_0x3b589e]), _0x2b914e[_0x3b589e++] = _0x1ab89d;
    }
    for (; _0x5e79cd <= _0x38b489; ) {
      const _0x413efd = _0x21840d[_0x5e79cd++];
      null !== _0x413efd && h(_0x413efd);
    }
    return this["ut"] = _0x2a42e9, p(_0x15dd55, _0x2b914e), E;
  }
});
function applyCustomCss(_0x4c54e1, _0x3377a6, _0xc1ad5b, _0x65780d) {
  if (!_0x4c54e1) return;
  if (!_0x3377a6) {
    if (_0xc1ad5b["sheet"]) {
      const _0x1ac2f7 = _0xc1ad5b["sheet"];
      _0x4c54e1["adoptedStyleSheets"] = _0x4c54e1["adoptedStyleSheets"]["filter"]((_0x4390ac) => _0x4390ac !== _0x1ac2f7);
    }
    return;
  }
  !_0xc1ad5b["sheet"] && (_0xc1ad5b["sheet"] = new CSSStyleSheet(), _0x4c54e1["adoptedStyleSheets"] = [..._0x4c54e1["adoptedStyleSheets"], _0xc1ad5b["sheet"]]);
  try {
    _0xc1ad5b["sheet"]["replaceSync"](_0x3377a6);
  } catch (_0x50381d) {
    console["warn"]("[" + _0x65780d + "] customCss gecersiz CSS iceriyor:", _0x50381d);
  }
}
function syncVirtualScrollbar(_0x3c9e23, _0x5474f7) {
  const { scrollHeight: _0x1dda01, clientHeight: _0xe5c4ce, scrollTop: _0x2695c7 } = _0x3c9e23, _0x27303d = _0x1dda01 - _0xe5c4ce;
  if (_0x27303d <= 1) {
    _0x5474f7["style"]["display"] = "none";
    return;
  }
  _0x5474f7["style"]["display"] = "block";
  const _0x55d308 = Math["max"](24, _0xe5c4ce / _0x1dda01 * _0xe5c4ce), _0x24fb39 = _0xe5c4ce - _0x55d308, _0x3270fc = _0x2695c7 / _0x27303d * _0x24fb39;
  _0x5474f7["style"]["height"] = _0x55d308 + "px", _0x5474f7["style"]["top"] = _0x3270fc + "px";
}
function startVirtualScrollbarDrag(_0x14d3ab, _0x56c07d, _0x1f427f) {
  const _0x10a950 = () => {
  };
  if (_0x14d3ab["button"] !== 0) return _0x10a950;
  _0x14d3ab["preventDefault"]();
  const _0x27ac3f = _0x14d3ab["currentTarget"], _0x5c65b0 = _0x27ac3f["getBoundingClientRect"](), _0x4683a4 = _0x14d3ab["clientY"] - _0x5c65b0["top"], _0x37c17a = (_0x83b5fb) => {
    const _0x44bd0e = _0x56c07d["getBoundingClientRect"](), _0x2462bd = _0x56c07d["clientHeight"] - _0x27ac3f["offsetHeight"];
    if (_0x2462bd <= 0) return;
    const _0x5eecd9 = _0x83b5fb["clientY"] - _0x44bd0e["top"] - _0x4683a4, _0x5ef997 = Math["min"](Math["max"](_0x5eecd9, 0), _0x2462bd), _0x3fc4f5 = _0x56c07d["scrollHeight"] - _0x56c07d["clientHeight"];
    _0x56c07d["scrollTop"] = _0x5ef997 / _0x2462bd * _0x3fc4f5;
  }, _0x5083c1 = (_0x500b20) => {
    _0x27ac3f["removeEventListener"]("pointermove", _0x37c17a), _0x27ac3f["removeEventListener"]("pointerup", _0xec3ccf), _0x27ac3f["removeEventListener"]("pointercancel", _0xec3ccf), _0x500b20 && _0x27ac3f["hasPointerCapture"](_0x500b20["pointerId"]) && _0x27ac3f["releasePointerCapture"](_0x500b20["pointerId"]), _0x1f427f == null ? void 0 : _0x1f427f();
  }, _0xec3ccf = (_0x1b1c6f) => _0x5083c1(_0x1b1c6f);
  return _0x27ac3f["setPointerCapture"](_0x14d3ab["pointerId"]), _0x27ac3f["addEventListener"]("pointermove", _0x37c17a), _0x27ac3f["addEventListener"]("pointerup", _0xec3ccf), _0x27ac3f["addEventListener"]("pointercancel", _0xec3ccf), () => _0x5083c1();
}
class VirtualScrollbar {
  constructor(_0x66b38, _0x372f65, _0x1ca4dd) {
    this["host"] = _0x66b38, this["getList"] = _0x372f65, this["getThumb"] = _0x1ca4dd, this["_stopDrag"] = null, _0x66b38["addController"](this);
  }
  ["hostDisconnected"]() {
    var _a2;
    (_a2 = this["_stopDrag"]) == null ? void 0 : _a2.call(this), this["_stopDrag"] = null;
  }
  ["sync"]() {
    const _0x126727 = this["getList"](), _0x34c631 = this["getThumb"]();
    if (!_0x126727 || !_0x34c631) return;
    syncVirtualScrollbar(_0x126727, _0x34c631);
  }
  ["startDrag"](_0x5ab92e) {
    const _0x418a3d = this["getList"]();
    if (!_0x418a3d) return;
    this["_stopDrag"] = startVirtualScrollbarDrag(_0x5ab92e, _0x418a3d, () => {
      this["_stopDrag"] = null;
    });
  }
}
class DraggablePanelController {
  constructor(_0x343f41, _0xb544df) {
    this["options"] = _0xb544df, this["_header"] = null, this["_panel"] = null, this["_offset"] = null, this["_move"] = (_0x2c77d5) => {
      var _a2, _b;
      if (!this["_offset"] || !this["_panel"]) return;
      this["_panel"]["style"]["left"] = _0x2c77d5["clientX"] - this["_offset"]["x"] + "px", this["_panel"]["style"]["top"] = _0x2c77d5["clientY"] - this["_offset"]["y"] + "px", (_b = (_a2 = this["options"])["onMove"]) == null ? void 0 : _b.call(_a2);
    }, this["_end"] = (_0xed8eb) => {
      const _0x361d86 = _0xed8eb["currentTarget"];
      _0x361d86["removeEventListener"]("pointermove", this["_move"]), _0x361d86["removeEventListener"]("pointerup", this["_end"]), _0x361d86["removeEventListener"]("pointercancel", this["_end"]);
      if (_0x361d86["hasPointerCapture"](_0xed8eb["pointerId"])) _0x361d86["releasePointerCapture"](_0xed8eb["pointerId"]);
      this["_reset"]();
    }, _0x343f41["addController"](this);
  }
  ["hostDisconnected"]() {
    this["cancel"]();
  }
  ["start"](_0x4fb468) {
    if (_0x4fb468["button"] !== 0) return;
    if (_0x4fb468["target"]["closest"](this["options"]["ignoreSelector"])) return;
    const _0x5e2904 = _0x4fb468["currentTarget"], _0x161282 = this["options"]["getPanel"](_0x5e2904);
    if (!_0x161282) return;
    const _0x59351f = _0x161282["getBoundingClientRect"]();
    _0x161282["style"]["left"] = _0x59351f["left"] + "px", _0x161282["style"]["top"] = _0x59351f["top"] + "px", _0x161282["style"]["transform"] = "none", this["_header"] = _0x5e2904, this["_panel"] = _0x161282, this["_offset"] = { "x": _0x4fb468["clientX"] - _0x59351f["left"], "y": _0x4fb468["clientY"] - _0x59351f["top"] }, _0x5e2904["setPointerCapture"](_0x4fb468["pointerId"]), _0x5e2904["addEventListener"]("pointermove", this["_move"]), _0x5e2904["addEventListener"]("pointerup", this["_end"]), _0x5e2904["addEventListener"]("pointercancel", this["_end"]);
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
var __defProp$x = Object["defineProperty"], __getOwnPropDesc$y = Object["getOwnPropertyDescriptor"], __decorateClass$y = (_0xbd3099, _0x287d23, _0x4e90e8, _0x4e29cb) => {
  var _0x3c99a5 = _0x4e29cb > 1 ? void 0 : _0x4e29cb ? __getOwnPropDesc$y(_0x287d23, _0x4e90e8) : _0x287d23;
  for (var _0x4aa311 = _0xbd3099["length"] - 1, _0x10a1ea; _0x4aa311 >= 0; _0x4aa311--) if (_0x10a1ea = _0xbd3099[_0x4aa311]) _0x3c99a5 = (_0x4e29cb ? _0x10a1ea(_0x287d23, _0x4e90e8, _0x3c99a5) : _0x10a1ea(_0x3c99a5)) || _0x3c99a5;
  if (_0x4e29cb && _0x3c99a5) __defProp$x(_0x287d23, _0x4e90e8, _0x3c99a5);
  return _0x3c99a5;
};
let TucbsServiceStyleCard = class extends i$2 {
  constructor() {
    super(...arguments), this["layerId"] = "", this["layerType"] = "", this["requestId"] = 0, this["_serviceStyles"] = [], this["_serviceStylesLoading"] = ![], this["_serviceStylesError"] = "", this["_selectedServiceStyle"] = "";
  }
  ["willUpdate"](_0x535b32) {
    (_0x535b32["has"]("layerId") || _0x535b32["has"]("layerType") || _0x535b32["has"]("layerManager") || _0x535b32["has"]("requestId")) && void this["_loadServiceStyles"]();
  }
  async ["_loadServiceStyles"]() {
    var _a2;
    if (!this["layerManager"] || !this["layerId"]) return;
    this["_serviceStylesLoading"] = !![], this["_serviceStylesError"] = "";
    try {
      const _0x1e7fbe = this["layerType"] === "WMS" ? await this["layerManager"]["getWmsAvailableStyles"](this["layerId"]) : await this["layerManager"]["getWmtsAvailableStyles"](this["layerId"]);
      this["_serviceStyles"] = _0x1e7fbe, this["_selectedServiceStyle"] = ((_a2 = _0x1e7fbe[0]) == null ? void 0 : _a2["name"]) ?? "";
    } catch (_0x44c1ea) {
      _0x44c1ea instanceof TucbsError && console["error"]("[tucbs-style-editor] " + _0x44c1ea["code"] + " (" + _0x44c1ea["number"] + "): " + _0x44c1ea["message"]), this["_serviceStylesError"] = _0x44c1ea instanceof Error ? _0x44c1ea["message"] : "Sunucu stilleri okunamadı.";
    } finally {
      this["_serviceStylesLoading"] = ![];
    }
  }
  async ["_selectServiceStyle"](_0x19a0d1) {
    if (!this["layerManager"] || !this["layerId"]) return;
    this["_selectedServiceStyle"] = _0x19a0d1;
    try {
      this["layerType"] === "WMS" ? await this["layerManager"]["setWmsStyle"](this["layerId"], _0x19a0d1) : await this["layerManager"]["setWmtsStyle"](this["layerId"], _0x19a0d1);
    } catch (_0x21e62e) {
      _0x21e62e instanceof TucbsError && console["error"]("[tucbs-style-editor] " + _0x21e62e["code"] + " (" + _0x21e62e["number"] + "): " + _0x21e62e["message"]), this["_serviceStylesError"] = _0x21e62e instanceof Error ? _0x21e62e["message"] : "Stil uygulanamadı.";
    }
  }
  ["render"]() {
    const _0x46b254 = this["_serviceStyles"]["find"]((_0x1ba7a7) => _0x1ba7a7["name"] === this["_selectedServiceStyle"]);
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
                    @cds-dropdown-selected=${(_0x5b8e7d) => {
      void this["_selectServiceStyle"](_0x5b8e7d["detail"]["item"]["value"]);
    }}
                  >
                    ${this["_serviceStyles"]["map"]((_0x211db7) => b`<cds-dropdown-item value=${_0x211db7["name"]}>${_0x211db7["title"]}</cds-dropdown-item>`)}
                  </cds-dropdown>
                </div>

                ${(_0x46b254 == null ? void 0 : _0x46b254["legendUrl"]) ? b`
                      <div>
                        <span class="field-label">Lejant</span>
                        <img
                          src=${_0x46b254["legendUrl"]}
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
function sampleFromPaletteCss(_0x17cbdd, _0x4501ee, _0x486101) {
  if (_0x17cbdd["length"] === 0) return "#808080";
  const _0x475588 = Math["max"](0, Math["min"](1, _0x4501ee));
  if (_0x486101 === "qualitative") {
    const _0xa19c3a = Math["round"](_0x475588 * (_0x17cbdd["length"] - 1));
    return _0x17cbdd[_0xa19c3a];
  }
  if (_0x17cbdd["length"] === 1) return _0x17cbdd[0];
  const _0x2d48b1 = _0x475588 * (_0x17cbdd["length"] - 1), _0x3f8df0 = Math["floor"](_0x2d48b1), _0x1aa6df = Math["min"](_0x17cbdd["length"] - 1, _0x3f8df0 + 1), _0x83666d = _0x2d48b1 - _0x3f8df0, _0x504e96 = hexToRgb(_0x17cbdd[_0x3f8df0]), _0x47413a = hexToRgb(_0x17cbdd[_0x1aa6df]), _0x5b6c41 = Math["round"](_0x504e96[0] + (_0x47413a[0] - _0x504e96[0]) * _0x83666d), _0xc0e136 = Math["round"](_0x504e96[1] + (_0x47413a[1] - _0x504e96[1]) * _0x83666d), _0x26270d = Math["round"](_0x504e96[2] + (_0x47413a[2] - _0x504e96[2]) * _0x83666d);
  return "rgb(" + _0x5b6c41 + ", " + _0xc0e136 + ", " + _0x26270d + ")";
}
function hexToRgb(_0x191e1e) {
  const _0x57f16f = _0x191e1e["replace"]("#", ""), _0x548f54 = parseInt(_0x57f16f["length"] === 3 ? _0x57f16f["replace"](/(.)/g, "$1$1") : _0x57f16f, 16);
  return [_0x548f54 >> 16 & 255, _0x548f54 >> 8 & 255, _0x548f54 & 255];
}
function compareCategoryKeys(_0x3ec81d, _0x5b89ae) {
  const _0x5adfb9 = Number(_0x3ec81d), _0x3bb09 = Number(_0x5b89ae), _0x3bc636 = Number["isFinite"](_0x5adfb9) && String(_0x5adfb9) === _0x3ec81d, _0xde75aa = Number["isFinite"](_0x3bb09) && String(_0x3bb09) === _0x5b89ae;
  if (_0x3bc636 && _0xde75aa) return _0x5adfb9 - _0x3bb09;
  return _0x3ec81d < _0x5b89ae ? -1 : _0x3ec81d > _0x5b89ae ? 1 : 0;
}
const INTEGER_RELATIVE_TOLERANCE = 1e-12;
function formatLegendNumber(_0x22a5ba) {
  if (_0x22a5ba === void 0) return "?";
  const _0x648f74 = Math["round"](_0x22a5ba), _0x30dd9d = INTEGER_RELATIVE_TOLERANCE * Math["max"](1, Math["abs"](_0x22a5ba));
  return Math["abs"](_0x22a5ba - _0x648f74) <= _0x30dd9d ? String(_0x648f74) : _0x22a5ba["toFixed"](2);
}
const DEFAULT_FILL_COLOR = "#1ecfb0", GRADIENT_PALETTES = [{ "value": "Viridis", "label": "Viridis", "colors": ["#440154", "#3b528b", "#21918c", "#5ec962", "#fde725"] }, { "value": "Plasma", "label": "Plasma", "colors": ["#0d0887", "#6a00a8", "#b12a90", "#e16462", "#fca636", "#f0f921"] }, { "value": "Magma", "label": "Magma", "colors": ["#000004", "#3b0f70", "#8c2981", "#de4968", "#fe9f6d", "#fcfdbf"] }, { "value": "Inferno", "label": "Inferno", "colors": ["#000004", "#420a68", "#932667", "#dd513a", "#fca50a", "#fcffa4"] }, { "value": "Cividis", "label": "Cividis", "colors": ["#00224e", "#123570", "#3b496c", "#575d6d", "#88892a", "#fee838"] }, { "value": "Turbo", "label": "Turbo", "colors": ["#30123b", "#4145ab", "#4675ed", "#39a2fc", "#1bcfd4", "#24eca6", "#61fc6c", "#a4fc3b", "#d1e834", "#f3c63a", "#fe9b2d", "#f36315", "#d93806", "#b11901", "#7a0403"] }, { "value": "Blues", "label": "Blues", "colors": ["#f7fbff", "#c6dbef", "#6baed6", "#3182bd", "#08519c"] }, { "value": "Greens", "label": "Greens", "colors": ["#f7fcf5", "#c7e9c0", "#74c476", "#31a354", "#006d2c"] }, { "value": "Oranges", "label": "Oranges", "colors": ["#fff5eb", "#fdd0a2", "#f16913", "#d94801", "#7f2704"] }, { "value": "Reds", "label": "Reds", "colors": ["#fff5f0", "#fcbba1", "#fb6a4a", "#cb181d", "#67000d"] }, { "value": "Purples", "label": "Purples", "colors": ["#fcfbfd", "#dadaeb", "#9e9ac8", "#6a51a3", "#3f007d"] }, { "value": "YlOrRd", "label": "YlOrRd", "colors": ["#ffffcc", "#fed976", "#fd8d3c", "#e31a1c", "#800026"] }, { "value": "YlGnBu", "label": "YlGnBu", "colors": ["#ffffd9", "#c7e9b4", "#41b6c4", "#225ea8", "#081d58"] }, { "value": "Spectral", "label": "Spectral", "colors": ["#9e0142", "#f46d43", "#fee08b", "#ffffbf", "#e6f598", "#66c2a5", "#5e4fa2"] }, { "value": "RdYlGn", "label": "RdYlGn", "colors": ["#a50026", "#f46d43", "#ffffbf", "#a6d96a", "#006837"] }, { "value": "RdYlBu", "label": "RdYlBu", "colors": ["#a50026", "#f46d43", "#ffffbf", "#74add1", "#313695"] }, { "value": "BrBG", "label": "BrBG", "colors": ["#543005", "#bf812d", "#f6e8c3", "#c7eae5", "#35978f", "#003c30"] }, { "value": "RdBu", "label": "RdBu", "colors": ["#67001f", "#d6604d", "#f7f7f7", "#4393c3", "#2166ac"] }, { "value": "PiYG", "label": "PiYG", "colors": ["#8e0152", "#de77ae", "#f7f7f7", "#7fbc41", "#276419"] }, { "value": "Set2", "label": "Set2", "colors": ["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854", "#ffd92f", "#e5c494", "#b3b3b3"] }, { "value": "Set3", "label": "Set3", "colors": ["#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462", "#b3de69", "#fccde5"] }, { "value": "Tableau10", "label": "Tableau10", "colors": ["#4e79a7", "#f28e2b", "#e15759", "#76b7b2", "#59a14f", "#edc948", "#b07aa1", "#ff9da7", "#9c755f", "#bab0ac"] }, { "value": "Dark2", "label": "Dark2", "colors": ["#1b9e77", "#d95f02", "#7570b3", "#e7298a", "#66a61e", "#e6ab02", "#a6761d", "#666666"] }, { "value": "Paired", "label": "Paired", "colors": ["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99", "#e31a1c", "#fdbf6f", "#ff7f00"] }, { "value": "Accent", "label": "Accent", "colors": ["#7fc97f", "#beaed4", "#fdc086", "#ffff99", "#386cb0", "#f0027f", "#bf5b17", "#666666"] }], DEFAULT_GRADIENT_PALETTE = GRADIENT_PALETTES[0]["value"], PALETTE_KIND = { "Viridis": "sequential", "Plasma": "sequential", "Magma": "sequential", "Inferno": "sequential", "Cividis": "sequential", "Turbo": "sequential", "Blues": "sequential", "Greens": "sequential", "Oranges": "sequential", "Reds": "sequential", "Purples": "sequential", "YlOrRd": "sequential", "YlGnBu": "sequential", "Spectral": "diverging", "RdYlGn": "diverging", "RdYlBu": "diverging", "BrBG": "diverging", "RdBu": "diverging", "PiYG": "diverging", "Set2": "qualitative", "Set3": "qualitative", "Tableau10": "qualitative", "Dark2": "qualitative", "Paired": "qualitative", "Accent": "qualitative" };
function paletteKindOf(_0x255b0a) {
  return PALETTE_KIND[_0x255b0a] ?? "sequential";
}
function sanitizeNumericInput(_0xae7a08, _0x4f2463) {
  const _0x31382e = _0x4f2463 && _0xae7a08["trimStart"]()["startsWith"]("-");
  let _0x2bd895 = _0xae7a08["replace"](/[^0-9.]/g, "");
  const _0x18eb79 = _0x2bd895["indexOf"](".");
  _0x18eb79 !== -1 && (_0x2bd895 = _0x2bd895["slice"](0, _0x18eb79 + 1) + _0x2bd895["slice"](_0x18eb79 + 1)["replace"](/\./g, ""));
  const _0x3d305f = _0x2bd895["indexOf"]("."), _0x148a12 = _0x3d305f === -1 ? _0x2bd895 : _0x2bd895["slice"](0, _0x3d305f), _0x1732be = _0x3d305f === -1 ? "" : _0x2bd895["slice"](_0x3d305f), _0x7ea84c = _0x148a12["replace"](/^0+(?=\d)/, "");
  return (_0x31382e ? "-" : "") + _0x7ea84c + _0x1732be;
}
function checkGradientBound(_0x23ed80, _0x444286, _0x2222aa, _0x3a44f6) {
  if (_0x23ed80 === "") return { "valid": !![], "message": "" };
  const _0x70f664 = Number(_0x23ed80);
  if (!Number["isFinite"](_0x70f664)) return { "valid": ![], "message": "" };
  if (_0x3a44f6 && (_0x70f664 < _0x3a44f6["min"] || _0x70f664 > _0x3a44f6["max"])) return { "valid": ![], "message": "Değer " + formatLegendNumber(_0x3a44f6["min"]) + " ile " + formatLegendNumber(_0x3a44f6["max"]) + " arasında olmalı." };
  const _0x143a11 = _0x2222aa === "" ? Number["NaN"] : Number(_0x2222aa);
  if (Number["isFinite"](_0x143a11)) {
    if (_0x444286 === "min" && _0x70f664 > _0x143a11) return { "valid": ![], "message": "Min, Max değerinden (" + formatLegendNumber(_0x143a11) + ") büyük olamaz." };
    if (_0x444286 === "max" && _0x70f664 < _0x143a11) return { "valid": ![], "message": "Max, Min değerinden (" + formatLegendNumber(_0x143a11) + ") küçük olamaz." };
  }
  return { "valid": !![], "message": "" };
}
function computeMinMax(_0x28e97f, _0x37ef21, _0x63f442) {
  const _0x10f2b2 = {};
  if (_0x28e97f !== "") {
    const _0x55be6c = Number(_0x28e97f);
    _0x10f2b2["min"] = _0x63f442 && Number["isFinite"](_0x55be6c) ? Math["max"](_0x55be6c, _0x63f442["min"]) : _0x55be6c;
  }
  if (_0x37ef21 !== "") {
    const _0x5bf403 = Number(_0x37ef21);
    _0x10f2b2["max"] = _0x63f442 && Number["isFinite"](_0x5bf403) ? Math["min"](_0x5bf403, _0x63f442["max"]) : _0x5bf403;
  }
  return _0x10f2b2["min"] !== void 0 && _0x10f2b2["max"] !== void 0 && _0x10f2b2["min"] > _0x10f2b2["max"] && (_0x10f2b2["min"] = _0x10f2b2["max"]), _0x10f2b2;
}
function buildFillStyle(_0x2626a3) {
  const _0x4e938d = _0x2626a3["fillOpacityPercent"] / 100;
  switch (_0x2626a3["colorMode"]) {
    case "solid":
      return { "mode": "solid", "color": _0x2626a3["fillColor"], "opacity": _0x4e938d };
    case "gradient":
      return { "mode": "gradient", "column": _0x2626a3["dataColumn"], "palette": _0x2626a3["paletteColors"], "paletteKind": _0x2626a3["paletteKind"], ...computeMinMax(_0x2626a3["gradientMin"], _0x2626a3["gradientMax"], _0x2626a3["columnRange"]), "opacity": _0x4e938d };
    case "bin":
      return { "mode": "bin", "column": _0x2626a3["dataColumn"], "palette": _0x2626a3["paletteColors"], "paletteKind": _0x2626a3["paletteKind"], "binCount": _0x2626a3["binCount"], ...computeMinMax(_0x2626a3["gradientMin"], _0x2626a3["gradientMax"], _0x2626a3["columnRange"]), "opacity": _0x4e938d };
    case "enum":
      return { "mode": "enum", "column": _0x2626a3["dataColumn"], "colors": _0x2626a3["categoryColors"], "opacity": _0x4e938d };
    case "off":
    default:
      return { "mode": "off" };
  }
}
function sortCategoryValues(_0x1fbd6a, _0x395b0a) {
  if (_0x395b0a === "source") return _0x1fbd6a;
  const _0x283ce1 = [..._0x1fbd6a]["sort"]((_0x5e8672, _0x9161ce) => compareCategoryKeys(String(_0x5e8672), String(_0x9161ce)));
  return _0x395b0a === "desc" ? _0x283ce1["reverse"]() : _0x283ce1;
}
function autoFillCategoryColors(_0x3061ab, _0x430299, _0x45f303) {
  const _0x295a94 = {};
  return _0x3061ab["forEach"]((_0x542650, _0x551268) => {
    const _0x3f730f = String(_0x542650);
    _0x295a94[_0x3f730f] = _0x430299[_0x3f730f] ?? _0x45f303[_0x551268 % _0x45f303["length"]] ?? DEFAULT_FILL_COLOR;
  }), _0x295a94;
}
function arraysEqual(_0x16f15c, _0x273fbe) {
  return _0x16f15c["length"] === _0x273fbe["length"] && _0x16f15c["every"]((_0xa9c60d, _0x2def01) => _0xa9c60d === _0x273fbe[_0x2def01]);
}
function findPaletteName(_0x53cdc5) {
  for (const _0x24a4d8 of GRADIENT_PALETTES) {
    if (arraysEqual(_0x24a4d8["colors"], _0x53cdc5)) return { "name": _0x24a4d8["value"], "reversed": ![] };
    if (arraysEqual([..._0x24a4d8["colors"]]["reverse"](), _0x53cdc5)) return { "name": _0x24a4d8["value"], "reversed": !![] };
  }
  return void 0;
}
function toHexColor(_0x45eb2b) {
  const _0x1b42cc = /hsl\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*\)/["exec"](_0x45eb2b);
  if (!_0x1b42cc) return _0x45eb2b["startsWith"]("#") ? _0x45eb2b : "#000000";
  const _0x48441a = Number(_0x1b42cc[1]), _0x2588a4 = Number(_0x1b42cc[2]) / 100, _0x360bce = Number(_0x1b42cc[3]) / 100, _0x57ee16 = (1 - Math["abs"](2 * _0x360bce - 1)) * _0x2588a4, _0x1d3b07 = _0x57ee16 * (1 - Math["abs"](_0x48441a / 60 % 2 - 1)), _0x14b2f7 = _0x360bce - _0x57ee16 / 2, _0x1eccc3 = [[_0x57ee16, _0x1d3b07, 0], [_0x1d3b07, _0x57ee16, 0], [0, _0x57ee16, _0x1d3b07], [0, _0x1d3b07, _0x57ee16], [_0x1d3b07, 0, _0x57ee16], [_0x57ee16, 0, _0x1d3b07]], [_0xbda255, _0x5f29c, _0x5bf8db] = _0x1eccc3[Math["min"](5, Math["floor"](_0x48441a / 60))] ?? _0x1eccc3[0], _0x5b09ba = (_0x3c5927) => Math["round"]((_0x3c5927 + _0x14b2f7) * 255)["toString"](16)["padStart"](2, "0");
  return "#" + _0x5b09ba(_0xbda255) + _0x5b09ba(_0x5f29c) + _0x5b09ba(_0x5bf8db);
}
function restoreRangeFields(_0x30c747) {
  const _0x3cd9fe = findPaletteName(_0x30c747["palette"]);
  return { "dataColumn": _0x30c747["column"], ..._0x3cd9fe && { "gradientPalette": _0x3cd9fe["name"], "paletteReversed": _0x3cd9fe["reversed"] }, "gradientMin": _0x30c747["min"] !== void 0 ? String(_0x30c747["min"]) : "", "gradientMax": _0x30c747["max"] !== void 0 ? String(_0x30c747["max"]) : "", ..._0x30c747["mode"] === "bin" && { "binCount": String(_0x30c747["binCount"]) } };
}
function restoreEnumFields(_0x15bd76) {
  const _0x36bd23 = Object["keys"](_0x15bd76["colors"])["map"]((_0x47a5c8) => {
    const _0x4f807c = Number(_0x47a5c8);
    return Number["isFinite"](_0x4f807c) && String(_0x4f807c) === _0x47a5c8 ? _0x4f807c : _0x47a5c8;
  });
  return { "dataColumn": _0x15bd76["column"], "categoryColors": { ..._0x15bd76["colors"] }, "categoryValues": _0x36bd23 };
}
function restoreFillFields(_0x491a14) {
  if ((_0x491a14 == null ? void 0 : _0x491a14["mode"]) === "gradient" || (_0x491a14 == null ? void 0 : _0x491a14["mode"]) === "bin") return restoreRangeFields(_0x491a14);
  if ((_0x491a14 == null ? void 0 : _0x491a14["mode"]) === "enum") return restoreEnumFields(_0x491a14);
  return {};
}
function deriveStyleEditorState(_0x5c6cf6, _0x525c35, _0x824aa5, _0x14a1b6) {
  const _0x4e2495 = (_0x5c6cf6 == null ? void 0 : _0x5c6cf6["fill"]["mode"]) === "solid" ? _0x5c6cf6["fill"] : void 0, _0x342a41 = _0x525c35 ? toHexColor(_0x525c35) : DEFAULT_FILL_COLOR, _0x4dbf1f = _0x824aa5 !== void 0 ? Math["round"](_0x824aa5 * 100) : _0x14a1b6["fillOpacity"];
  return { "colorMode": (_0x5c6cf6 == null ? void 0 : _0x5c6cf6["fill"]["mode"]) ?? _0x14a1b6["colorMode"], "fillColor": _0x4e2495 ? toHexColor(_0x4e2495["color"]) : _0x342a41, "fillOpacity": _0x4e2495 ? Math["round"](_0x4e2495["opacity"] * 100) : _0x4dbf1f, "dataColumn": "", "gradientPalette": DEFAULT_GRADIENT_PALETTE, "paletteReversed": ![], "gradientMin": "", "gradientMax": "", "binCount": _0x14a1b6["binCount"], "categoryColors": {}, "categoryValues": [], ...restoreFillFields(_0x5c6cf6 == null ? void 0 : _0x5c6cf6["fill"]), "outlineEnabled": (_0x5c6cf6 == null ? void 0 : _0x5c6cf6["outline"]["enabled"]) ?? _0x14a1b6["outlineEnabled"], "outlineColor": _0x5c6cf6 ? toHexColor(_0x5c6cf6["outline"]["color"]) : _0x14a1b6["outlineColor"], "outlineWidth": _0x5c6cf6 !== void 0 ? String(_0x5c6cf6["outline"]["width"]) : _0x14a1b6["outlineWidth"] };
}
const GRADIENT_LEGEND_STEPS = 7;
function gradientLegendRows(_0x5e1751, _0x1adeba, _0xb17643, _0xa2b5b2 = GRADIENT_LEGEND_STEPS) {
  return Array["from"]({ "length": _0xa2b5b2 }, (_0xb04743, _0x5b949b) => {
    const _0x278b6c = _0xa2b5b2 <= 1 ? 1 : 1 - _0x5b949b / (_0xa2b5b2 - 1), _0x2b0a9a = _0x5e1751 + _0x278b6c * (_0x1adeba - _0x5e1751);
    return { "color": _0xb17643(_0x278b6c), "label": formatLegendNumber(_0x2b0a9a) };
  });
}
function binLegendRows(_0x2bef89, _0x171de1, _0x30f462, _0x5c3f30) {
  const _0x2576ca = (_0x171de1 - _0x2bef89) / _0x30f462;
  return Array["from"]({ "length": _0x30f462 }, (_0x1ef602, _0x2de78b) => {
    const _0x2b978a = _0x2bef89 + _0x2576ca * _0x2de78b, _0x1863e7 = _0x2bef89 + _0x2576ca * (_0x2de78b + 1), _0x3b0c52 = _0x30f462 <= 1 ? 0.5 : _0x2de78b / (_0x30f462 - 1);
    return { "color": _0x5c3f30(_0x3b0c52), "label": formatLegendNumber(_0x2b978a) + " – " + formatLegendNumber(_0x1863e7) };
  });
}
class TimerBag {
  constructor(_0x335e86) {
    this["_timeoutIds"] = /* @__PURE__ */ new Set(), this["_frameIds"] = /* @__PURE__ */ new Set(), _0x335e86["addController"](this);
  }
  ["hostDisconnected"]() {
    for (const _0x29c1a1 of this["_timeoutIds"]) window["clearTimeout"](_0x29c1a1);
    this["_timeoutIds"]["clear"]();
    for (const _0x2303f0 of this["_frameIds"]) cancelAnimationFrame(_0x2303f0);
    this["_frameIds"]["clear"]();
  }
  ["setTimeout"](_0x2bca39, _0x1980fe) {
    const _0x4f1a01 = window["setTimeout"](() => {
      this["_timeoutIds"]["delete"](_0x4f1a01), _0x2bca39();
    }, _0x1980fe);
    return this["_timeoutIds"]["add"](_0x4f1a01), _0x4f1a01;
  }
  ["clearTimeout"](_0x5a97a8) {
    if (_0x5a97a8 === null) return;
    window["clearTimeout"](_0x5a97a8), this["_timeoutIds"]["delete"](_0x5a97a8);
  }
  ["requestAnimationFrame"](_0x3cd330) {
    const _0x5a8ce4 = requestAnimationFrame(() => {
      this["_frameIds"]["delete"](_0x5a8ce4), _0x3cd330();
    });
    return this["_frameIds"]["add"](_0x5a8ce4), _0x5a8ce4;
  }
  ["cancelAnimationFrame"](_0x19550e) {
    if (_0x19550e === null) return;
    cancelAnimationFrame(_0x19550e), this["_frameIds"]["delete"](_0x19550e);
  }
}
const DEFAULT_BIN_COUNT = "5", FILL_COLOR_MODES = [{ "value": "solid", "label": "Sabit Renk" }, { "value": "gradient", "label": "Sürekli (Gradient)" }, { "value": "bin", "label": "Kesikli (Bin)" }, { "value": "enum", "label": "Kategorik (Enum)" }, { "value": "off", "label": "Kapalı" }], CATEGORY_SORT_OPTIONS = [{ "value": "asc", "label": "Artan (eskiden yeniye)" }, { "value": "desc", "label": "Azalan (yeniden eskiye)" }, { "value": "source", "label": "Verideki sıra" }], editStartValues = /* @__PURE__ */ new WeakMap();
function onBoundInput(_0x10dbf8, _0x4e5369, _0x43b817) {
  const _0x56393f = _0x43b817["target"];
  !editStartValues["has"](_0x56393f) && editStartValues["set"](_0x56393f, _0x4e5369 === "min" ? _0x10dbf8["gradientMin"] : _0x10dbf8["gradientMax"]);
  const _0x76f494 = sanitizeNumericInput(_0x56393f["value"], _0x4e5369 === "min" ? _0x10dbf8["allowNegativeMin"]() : _0x10dbf8["allowNegativeMax"]());
  if (_0x56393f["value"] !== _0x76f494) _0x56393f["value"] = _0x76f494;
  const _0x5b46ee = _0x10dbf8["checkGradientBound"](_0x4e5369, _0x76f494);
  setBoundError(_0x10dbf8, _0x4e5369, _0x5b46ee["message"]);
  if (!_0x5b46ee["valid"]) return;
  setBound(_0x10dbf8, _0x4e5369, _0x76f494), _0x10dbf8["scheduleApplyStyle"]();
}
function commitBound(_0x111c3c, _0x5d29a8, _0x11181f) {
  const _0x4f9bc3 = _0x11181f["target"], _0x42555e = editStartValues["get"](_0x4f9bc3);
  editStartValues["delete"](_0x4f9bc3), setBoundError(_0x111c3c, _0x5d29a8, "");
  if (_0x111c3c["checkGradientBound"](_0x5d29a8, _0x4f9bc3["value"])["valid"]) return;
  const _0x4ecf46 = _0x5d29a8 === "min" ? _0x111c3c["gradientMin"] : _0x111c3c["gradientMax"], _0x5dbea6 = _0x42555e ?? _0x4ecf46;
  if (_0x4f9bc3["value"] !== _0x5dbea6) _0x4f9bc3["value"] = _0x5dbea6;
  _0x4ecf46 !== _0x5dbea6 && (setBound(_0x111c3c, _0x5d29a8, _0x5dbea6), _0x111c3c["scheduleApplyStyle"]());
}
function setBound(_0x1e2f3a, _0x35444d, _0x46e455) {
  if (_0x35444d === "min") _0x1e2f3a["gradientMin"] = _0x46e455;
  else _0x1e2f3a["gradientMax"] = _0x46e455;
}
function setBoundError(_0x3fb8b7, _0x37fda3, _0x12c22c) {
  if (_0x37fda3 === "min") _0x3fb8b7["gradientMinError"] = _0x12c22c;
  else _0x3fb8b7["gradientMaxError"] = _0x12c22c;
}
const onBoundKeydown = (_0x2aa749, _0x4a267b, _0x143885) => {
  if (_0x143885["key"] === "Enter") commitBound(_0x2aa749, _0x4a267b, _0x143885);
};
function renderMinMaxFields(_0x4559ba) {
  return _0x4559ba["colorMode"] === "gradient" ? b`
        <div style="display:flex; flex-direction:column; gap:0.75rem;">
          <div>
            <span class="field-label">Min</span>
            <cds-text-input
              size="sm"
              label="Min"
              hide-label
              placeholder="Otomatik"
              .value=${_0x4559ba["gradientMin"]}
              .invalid=${_0x4559ba["gradientMinError"] !== ""}
              .invalidText=${_0x4559ba["gradientMinError"]}
              @input=${(_0x5db2d9) => onBoundInput(_0x4559ba, "min", _0x5db2d9)}
              @keydown=${(_0x7b5258) => onBoundKeydown(_0x4559ba, "min", _0x7b5258)}
              @focusout=${(_0xe87c52) => commitBound(_0x4559ba, "min", _0xe87c52)}
            ></cds-text-input>
          </div>
          <div>
            <span class="field-label">Max</span>
            <cds-text-input
              size="sm"
              label="Max"
              hide-label
              placeholder="Otomatik"
              .value=${_0x4559ba["gradientMax"]}
              .invalid=${_0x4559ba["gradientMaxError"] !== ""}
              .invalidText=${_0x4559ba["gradientMaxError"]}
              @input=${(_0x41790a) => onBoundInput(_0x4559ba, "max", _0x41790a)}
              @keydown=${(_0x2ba627) => onBoundKeydown(_0x4559ba, "max", _0x2ba627)}
              @focusout=${(_0x18a792) => commitBound(_0x4559ba, "max", _0x18a792)}
            ></cds-text-input>
          </div>
        </div>
      ` : "";
}
const isValidBinCount = (_0x140a90) => /^[1-9]$/["test"](_0x140a90);
function onBinCountInput(_0x38a748, _0x106dec) {
  const _0x41a4fa = _0x106dec["currentTarget"];
  if (!editStartValues["has"](_0x41a4fa)) editStartValues["set"](_0x41a4fa, _0x38a748["binCount"]);
  const _0x3bc8b9 = _0x41a4fa["value"], _0x1cd763 = _0x3bc8b9["replace"](/\D/g, "")["replace"](/^0+(?=\d)/, "");
  if (_0x3bc8b9 !== _0x1cd763) _0x41a4fa["value"] = _0x1cd763;
  isValidBinCount(_0x1cd763) && _0x1cd763 !== _0x38a748["binCount"] && (_0x38a748["binCount"] = _0x1cd763, _0x38a748["scheduleApplyStyle"]());
}
function onBinCountStep(_0xb84376, _0x11d92f) {
  if (!_0x11d92f["detail"]["direction"]) return;
  const _0x5ba8a5 = String(Math["round"](Number(_0x11d92f["detail"]["value"])));
  isValidBinCount(_0x5ba8a5) && _0x5ba8a5 !== _0xb84376["binCount"] && (_0xb84376["binCount"] = _0x5ba8a5, _0xb84376["scheduleApplyStyle"]());
}
function commitBinCount(_0x37888d, _0x224c56) {
  const _0x5b1b7a = _0x224c56["currentTarget"], _0x355aac = editStartValues["get"](_0x5b1b7a);
  editStartValues["delete"](_0x5b1b7a);
  if (isValidBinCount(_0x5b1b7a["value"])) return;
  const _0x3212bc = _0x355aac ?? _0x37888d["binCount"];
  _0x5b1b7a["value"] = _0x3212bc, _0x37888d["binCount"] !== _0x3212bc && (_0x37888d["binCount"] = _0x3212bc, _0x37888d["scheduleApplyStyle"]());
}
function renderBinCountField(_0x219d0d) {
  return _0x219d0d["colorMode"] === "bin" ? b`
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
            .value=${_0x219d0d["binCount"]}
            @input=${(_0xb18ab9) => onBinCountInput(_0x219d0d, _0xb18ab9)}
            @cds-number-input=${(_0x191a80) => onBinCountStep(_0x219d0d, _0x191a80)}
            @keydown=${(_0x3f1ffa) => {
    if (_0x3f1ffa["key"] === "Enter") commitBinCount(_0x219d0d, _0x3f1ffa);
  }}
            @focusout=${(_0x21d4cc) => commitBinCount(_0x219d0d, _0x21d4cc)}
          ></cds-number-input>
        </div>
      ` : "";
}
function renderEnumFields(_0x30501e) {
  return _0x30501e["colorMode"] === "enum" ? b`
        <div>
          <span class="field-label">Kategori Sırası</span>
          <cds-dropdown
            size="sm"
            label="Seçiniz"
            .value=${_0x30501e["categorySort"]}
            @cds-dropdown-selected=${(_0x365ee9) => {
    _0x30501e["categorySort"] = _0x365ee9["detail"]["item"]["value"], _0x30501e["categoryValues"] = _0x30501e["sortCategoryValues"](_0x30501e["categoryValues"]);
  }}
          >
            ${CATEGORY_SORT_OPTIONS["map"]((_0x74bd6) => b`<cds-dropdown-item value=${_0x74bd6["value"]}>${_0x74bd6["label"]}</cds-dropdown-item>`)}
          </cds-dropdown>
        </div>

        <div>
          <cds-checkbox
            .checked=${_0x30501e["paletteReversed"]}
            label-text="Paleti ters çevir"
            @cds-checkbox-changed=${(_0x372626) => {
    var _a2;
    _0x30501e["paletteReversed"] = ((_a2 = _0x372626["detail"]) == null ? void 0 : _a2["checked"]) ?? !_0x30501e["paletteReversed"], _0x30501e["categoryColors"] = _0x30501e["autoFillCategoryColors"](_0x30501e["categoryValues"], {}), _0x30501e["scheduleApplyStyle"]();
  }}
          ></cds-checkbox>
        </div>
      ` : "";
}
function renderSolidSwatchField(_0x1f6193) {
  return _0x1f6193["colorMode"] === "solid" ? b`
        <div>
          <span class="field-label">Renk Paleti</span>
          <span class="color-swatch" style="background:${_0x1f6193["fillColor"]}">
            <input
              type="color"
              .value=${_0x1f6193["fillColor"]}
              aria-label="Dolgu rengi"
              @input=${(_0x32a82f) => {
    _0x1f6193["fillColor"] = _0x32a82f["target"]["value"], _0x1f6193["scheduleApplyStyle"]();
  }}
            />
          </span>
        </div>
      ` : "";
}
function renderOpacityField(_0x45a3a5) {
  return _0x45a3a5["colorMode"] === "off" ? "" : b`
        <div style="margin-top: 8px">
          <span class="field-label">Opaklık (${_0x45a3a5["fillOpacity"]}%)</span>
          <input
            type="range"
            class="opacity-slider"
            min="0"
            max="100"
            step="1"
            .value=${String(_0x45a3a5["fillOpacity"])}
            style="--fill: ${_0x45a3a5["fillOpacity"]}%"
            @input=${(_0x4c6b73) => {
    const _0x3709d6 = _0x4c6b73["target"], _0x321846 = Number(_0x3709d6["value"]);
    _0x45a3a5["updateOpacitySlider"](_0x3709d6, _0x321846), _0x45a3a5["setFillOpacity"](_0x321846);
  }}
          />
        </div>
      `;
}
function renderColorModeField(_0x207ac6) {
  return _0x207ac6["isFixedSolidLayer"] ? "" : b`
        <div>
          <span class="field-label">Renk Modu</span>
          <cds-dropdown
            size="sm"
            label="Seçiniz"
            .value=${_0x207ac6["colorMode"]}
            @cds-dropdown-selected=${(_0x3bf4ac) => {
    _0x207ac6["colorMode"] = _0x3bf4ac["detail"]["item"]["value"];
    const _0x22858f = _0x207ac6["colorMode"] === "gradient" || _0x207ac6["colorMode"] === "bin" ? _0x207ac6["numericDataColumns"] : _0x207ac6["dataColumns"];
    _0x207ac6["dataColumn"] && !_0x22858f["includes"](_0x207ac6["dataColumn"]) && (_0x207ac6["dataColumn"] = "");
    if (_0x207ac6["dataColumn"]) _0x207ac6["onDataColumnChange"](_0x207ac6["dataColumn"]);
    else _0x207ac6["scheduleApplyStyle"]();
  }}
          >
            ${FILL_COLOR_MODES["map"]((_0x2dfbd7) => b`<cds-dropdown-item value=${_0x2dfbd7["value"]}>${_0x2dfbd7["label"]}</cds-dropdown-item>`)}
          </cds-dropdown>
        </div>
      `;
}
function renderDataFields(_0x50e9d2) {
  const _0x477640 = _0x50e9d2["colorMode"] === "gradient" || _0x50e9d2["colorMode"] === "bin" ? _0x50e9d2["numericDataColumns"] : _0x50e9d2["dataColumns"];
  return _0x50e9d2["colorMode"] === "gradient" || _0x50e9d2["colorMode"] === "bin" || _0x50e9d2["colorMode"] === "enum" ? b`
        <div>
          <span class="field-label">Veri Sütunu</span>
          <cds-dropdown
            size="sm"
            label="Seçiniz"
            .value=${_0x50e9d2["dataColumn"]}
            @cds-dropdown-selected=${(_0x4c7ee9) => {
    _0x50e9d2["onDataColumnChange"](_0x4c7ee9["detail"]["item"]["value"]);
  }}
          >
            ${_0x477640["map"]((_0x2e9ef7) => b`<cds-dropdown-item value=${_0x2e9ef7}>${_0x2e9ef7}</cds-dropdown-item>`)}
          </cds-dropdown>
        </div>

        <div>
          <span class="field-label">Renk Paleti</span>
          <div class="palette-dropdown-wrap">
            <cds-dropdown
              size="sm"
              label="Seçiniz"
              .value=${_0x50e9d2["gradientPalette"]}
              @cds-dropdown-selected=${(_0x15f78f) => {
    _0x50e9d2["gradientPalette"] = _0x15f78f["detail"]["item"]["value"], _0x50e9d2["colorMode"] === "enum" && _0x50e9d2["categoryValues"]["length"] > 0 && (_0x50e9d2["categoryColors"] = _0x50e9d2["autoFillCategoryColors"](_0x50e9d2["categoryValues"], {})), _0x50e9d2["scheduleApplyStyle"]();
  }}
            >
              ${GRADIENT_PALETTES["map"]((_0x2ba70a) => b`
                  <cds-dropdown-item value=${_0x2ba70a["value"]} title=${_0x2ba70a["label"]}>
                    <span
                      class="palette-swatch"
                      aria-label=${_0x2ba70a["label"]}
                      style="background: linear-gradient(to right, ${_0x2ba70a["colors"]["join"](", ")})"
                    ></span>
                  </cds-dropdown-item>
                `)}
            </cds-dropdown>
            <span
              class="palette-selected-preview"
              style="background: linear-gradient(to right, ${(GRADIENT_PALETTES["find"]((_0x35da9f) => _0x35da9f["value"] === _0x50e9d2["gradientPalette"]) ?? GRADIENT_PALETTES[0])["colors"]["join"](", ")})"
            ></span>
          </div>
        </div>

        ${renderMinMaxFields(_0x50e9d2)}
        ${renderBinCountField(_0x50e9d2)}
        ${renderEnumFields(_0x50e9d2)}
      ` : renderSolidSwatchField(_0x50e9d2);
}
function renderFillCard(_0x5724da) {
  return b`
    <div class="card">
      <span class="card-title">Dolgu</span>

      ${renderColorModeField(_0x5724da)}

      ${renderDataFields(_0x5724da)}

      ${renderOpacityField(_0x5724da)}
    </div>
  `;
}
var __defProp$w = Object["defineProperty"], __getOwnPropDesc$x = Object["getOwnPropertyDescriptor"], __decorateClass$x = (_0x22f95c, _0x3bb3ce, _0x3aab93, _0x55eefc) => {
  var _0x17ffb1 = _0x55eefc > 1 ? void 0 : _0x55eefc ? __getOwnPropDesc$x(_0x3bb3ce, _0x3aab93) : _0x3bb3ce;
  for (var _0x384155 = _0x22f95c["length"] - 1, _0x33e416; _0x384155 >= 0; _0x384155--) if (_0x33e416 = _0x22f95c[_0x384155]) _0x17ffb1 = (_0x55eefc ? _0x33e416(_0x3bb3ce, _0x3aab93, _0x17ffb1) : _0x33e416(_0x17ffb1)) || _0x17ffb1;
  if (_0x55eefc && _0x17ffb1) __defProp$w(_0x3bb3ce, _0x3aab93, _0x17ffb1);
  return _0x17ffb1;
};
const SERVICE_LAYER_TYPES$1 = ["WMS", "WMTS"], ICON_PALETTE_20 = o$1(iconNodeToString(_20_default$3)), ICON_RENEW$1 = o$1(iconNodeToString(_16_default$c)), ICON_CLOSE$6 = o$1(iconNodeToString(_16_default$v)), DEFAULT_FILL_OPACITY = 46, FIXED_SOLID_LAYER_FILL_OPACITY = 40, DEFAULT_OUTLINE_ENABLED = !![], DEFAULT_OUTLINE_COLOR = "#1a73e8", DEFAULT_OUTLINE_WIDTH = "2", FIXED_SOLID_LAYER_OUTLINE_WIDTH = "1", LARGE_LAYER_FEATURE_THRESHOLD = 5e3, VISIBLE_LIST_ROWS = 10, TECHNICAL_COLUMN_PATTERN = /^(shape_area|shape_leng|shape_length|shape_len|objectid|fid|gml_id|gid)(_\d+)?$/i, DEFAULT_COLOR_MODE = FILL_COLOR_MODES[0]["value"], DEFAULT_CATEGORY_SORT = CATEGORY_SORT_OPTIONS[0]["value"], STYLE_EDITOR_FORM_DEFAULTS = { "colorMode": DEFAULT_COLOR_MODE, "fillOpacity": DEFAULT_FILL_OPACITY, "outlineEnabled": DEFAULT_OUTLINE_ENABLED, "outlineColor": DEFAULT_OUTLINE_COLOR, "outlineWidth": DEFAULT_OUTLINE_WIDTH, "binCount": DEFAULT_BIN_COUNT };
let TucbsStyleEditor = class extends i$2 {
  constructor() {
    super(...arguments), this["open"] = ![], this["layerId"] = "", this["layerTitle"] = "", this["layerType"] = "", this["customCss"] = "", this["_customCssState"] = { "sheet": null }, this["_colorMode"] = DEFAULT_COLOR_MODE, this["_dataColumn"] = "", this["_dataColumns"] = [], this["_numericDataColumns"] = [], this["_gradientPalette"] = DEFAULT_GRADIENT_PALETTE, this["_gradientMin"] = "", this["_gradientMax"] = "", this["_gradientMinError"] = "", this["_gradientMaxError"] = "", this["_binCount"] = DEFAULT_BIN_COUNT, this["_categorySort"] = DEFAULT_CATEGORY_SORT, this["_paletteReversed"] = ![], this["_categoryValues"] = [], this["_categoryColors"] = {}, this["_fillColor"] = DEFAULT_FILL_COLOR, this["_fillOpacity"] = DEFAULT_FILL_OPACITY, this["_outlineEnabled"] = DEFAULT_OUTLINE_ENABLED, this["_outlineColor"] = DEFAULT_OUTLINE_COLOR, this["_outlineWidth"] = DEFAULT_OUTLINE_WIDTH, this["_serviceStyleRequestId"] = 0, this["_drag"] = new DraggablePanelController(this, { "getPanel": () => this, "ignoreSelector": ".close-btn" }), this["_categoryScroll"] = new VirtualScrollbar(this, () => this["_categoryListEl"], () => this["_categoryThumbEl"]), this["_legendScroll"] = new VirtualScrollbar(this, () => this["_legendListEl"], () => this["_legendThumbEl"]), this["_applyStyleRaf"] = null, this["_fillOpacityRaf"] = null, this["_timers"] = new TimerBag(this), this["_onLayerStyle"] = (_0x32061e) => {
      if (!this["open"] || _0x32061e["id"] !== this["layerId"]) return;
      const { fill: _0x584987 } = _0x32061e["style"];
      if (_0x584987["mode"] === "off") return;
      if (_0x584987["mode"] === "solid") this["_fillColor"] = toHexColor(_0x584987["color"]);
      this["_fillOpacity"] = Math["round"](_0x584987["opacity"] * 100);
    }, this["_fillCardHost"] = new class {
      constructor(_0x305727) {
        this["editor"] = _0x305727;
      }
      get ["colorMode"]() {
        return this["editor"]["_colorMode"];
      }
      set ["colorMode"](_0x523604) {
        this["editor"]["_colorMode"] = _0x523604;
      }
      get ["dataColumn"]() {
        return this["editor"]["_dataColumn"];
      }
      set ["dataColumn"](_0x2eb8ec) {
        this["editor"]["_dataColumn"] = _0x2eb8ec;
      }
      get ["gradientPalette"]() {
        return this["editor"]["_gradientPalette"];
      }
      set ["gradientPalette"](_0x2a9080) {
        this["editor"]["_gradientPalette"] = _0x2a9080;
      }
      get ["gradientMin"]() {
        return this["editor"]["_gradientMin"];
      }
      set ["gradientMin"](_0x394f36) {
        this["editor"]["_gradientMin"] = _0x394f36;
      }
      get ["gradientMax"]() {
        return this["editor"]["_gradientMax"];
      }
      set ["gradientMax"](_0x5f3699) {
        this["editor"]["_gradientMax"] = _0x5f3699;
      }
      get ["gradientMinError"]() {
        return this["editor"]["_gradientMinError"];
      }
      set ["gradientMinError"](_0x21ef20) {
        this["editor"]["_gradientMinError"] = _0x21ef20;
      }
      get ["gradientMaxError"]() {
        return this["editor"]["_gradientMaxError"];
      }
      set ["gradientMaxError"](_0x2456c7) {
        this["editor"]["_gradientMaxError"] = _0x2456c7;
      }
      get ["binCount"]() {
        return this["editor"]["_binCount"];
      }
      set ["binCount"](_0x291c05) {
        this["editor"]["_binCount"] = _0x291c05;
      }
      get ["categorySort"]() {
        return this["editor"]["_categorySort"];
      }
      set ["categorySort"](_0x25525f) {
        this["editor"]["_categorySort"] = _0x25525f;
      }
      get ["paletteReversed"]() {
        return this["editor"]["_paletteReversed"];
      }
      set ["paletteReversed"](_0x19e806) {
        this["editor"]["_paletteReversed"] = _0x19e806;
      }
      get ["categoryValues"]() {
        return this["editor"]["_categoryValues"];
      }
      set ["categoryValues"](_0x48eecc) {
        this["editor"]["_categoryValues"] = _0x48eecc;
      }
      get ["categoryColors"]() {
        return this["editor"]["_categoryColors"];
      }
      set ["categoryColors"](_0x4630cd) {
        this["editor"]["_categoryColors"] = _0x4630cd;
      }
      get ["fillColor"]() {
        return this["editor"]["_fillColor"];
      }
      set ["fillColor"](_0x5a007c) {
        this["editor"]["_fillColor"] = _0x5a007c;
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
      ["checkGradientBound"](_0x1d68db, _0x17932f) {
        return this["editor"]["_checkGradientBound"](_0x1d68db, _0x17932f);
      }
      ["scheduleApplyStyle"]() {
        this["editor"]["_scheduleApplyStyle"]();
      }
      ["sortCategoryValues"](_0x53c93e) {
        return this["editor"]["_sortCategoryValues"](_0x53c93e);
      }
      ["autoFillCategoryColors"](_0x284da0, _0xe55672) {
        return this["editor"]["_autoFillCategoryColors"](_0x284da0, _0xe55672);
      }
      ["updateOpacitySlider"](_0xbb02d2, _0x402d60) {
        this["editor"]["_updateOpacitySlider"](_0xbb02d2, _0x402d60);
      }
      ["setFillOpacity"](_0xf5951a) {
        this["editor"]["_setFillOpacity"](_0xf5951a);
      }
      ["onDataColumnChange"](_0x21da47) {
        this["editor"]["_onDataColumnChange"](_0x21da47);
      }
    }(this);
  }
  ["disconnectedCallback"]() {
    if (this["layerManager"]) this["layerManager"]["off"]("layer:style", this["_onLayerStyle"]);
    super["disconnectedCallback"]();
  }
  ["updated"](_0x52a03b) {
    _0x52a03b["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_customCssState"], "tucbs-style-editor");
    _0x52a03b["has"]("open") && this["open"] && (this["style"]["removeProperty"]("left"), this["style"]["removeProperty"]("top"), this["style"]["removeProperty"]("transform"));
    if (_0x52a03b["has"]("layerManager")) {
      const _0x51ffb1 = _0x52a03b["get"]("layerManager");
      if (_0x51ffb1) _0x51ffb1["off"]("layer:style", this["_onLayerStyle"]);
      if (this["layerManager"]) this["layerManager"]["on"]("layer:style", this["_onLayerStyle"]);
    }
    this["_timers"]["requestAnimationFrame"](() => {
      TucbsStyleEditor["_fitListToRows"](this["_categoryListEl"], ".legend-bin-row"), TucbsStyleEditor["_fitListToRows"](this["_legendListEl"], ".legend-bin-row"), this["_categoryScroll"]["sync"](), this["_legendScroll"]["sync"]();
    });
  }
  ["openFor"](_0x3e62a8, _0x34583b, _0x2c5936, _0x4d771b, _0x2366a2) {
    var _a2, _b;
    this["layerId"] = _0x3e62a8, this["layerTitle"] = _0x34583b, this["layerType"] = _0x2c5936, this["_featureCount"] = (_a2 = this["layerManager"]) == null ? void 0 : _a2["getFeatureCount"](_0x3e62a8), this["_dataColumns"] = [], this["_numericDataColumns"] = [], this["_categorySort"] = DEFAULT_CATEGORY_SORT;
    const _0x4e491e = (_b = this["layerManager"]) == null ? void 0 : _b["getLayerStyle"](_0x3e62a8), _0x46db3e = deriveStyleEditorState(_0x4e491e, _0x4d771b, _0x2366a2, STYLE_EDITOR_FORM_DEFAULTS);
    this["_colorMode"] = _0x46db3e["colorMode"], this["_fillColor"] = _0x46db3e["fillColor"], this["_fillOpacity"] = _0x46db3e["fillOpacity"], this["_dataColumn"] = _0x46db3e["dataColumn"], this["_gradientPalette"] = _0x46db3e["gradientPalette"], this["_paletteReversed"] = _0x46db3e["paletteReversed"], this["_gradientMin"] = _0x46db3e["gradientMin"], this["_gradientMax"] = _0x46db3e["gradientMax"], this["_gradientMinError"] = "", this["_gradientMaxError"] = "", this["_binCount"] = _0x46db3e["binCount"], this["_categoryColors"] = _0x46db3e["categoryColors"], this["_categoryValues"] = this["_sortCategoryValues"](_0x46db3e["categoryValues"]), this["_outlineEnabled"] = _0x46db3e["outlineEnabled"], this["_outlineColor"] = _0x46db3e["outlineColor"], this["_outlineWidth"] = _0x46db3e["outlineWidth"];
    for (const _0x4276fc of document["querySelectorAll"]("tucbs-identify-panel")) {
      _0x4276fc["close"]();
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
    const _0xb2f7e0 = (_a2 = this["layerManager"]) == null ? void 0 : _a2["getInitialFillColor"](this["layerId"]);
    this["_fillColor"] = _0xb2f7e0 ? toHexColor(_0xb2f7e0) : DEFAULT_FILL_COLOR, this["_fillOpacity"] = this["_isFixedSolidLayer"] ? FIXED_SOLID_LAYER_FILL_OPACITY : DEFAULT_FILL_OPACITY, this["_outlineEnabled"] = DEFAULT_OUTLINE_ENABLED, this["_outlineColor"] = DEFAULT_OUTLINE_COLOR, this["_outlineWidth"] = this["_isFixedSolidLayer"] ? FIXED_SOLID_LAYER_OUTLINE_WIDTH : DEFAULT_OUTLINE_WIDTH;
    if (!this["_isServiceLayer"]) this["_scheduleApplyStyle"]();
  }
  ["_updateOpacitySlider"](_0x5bfd98, _0x2cd51e) {
    _0x5bfd98["style"]["setProperty"]("--fill", _0x2cd51e + "%");
  }
  ["_setFillOpacity"](_0x1b98e2) {
    this["_timers"]["cancelAnimationFrame"](this["_fillOpacityRaf"]), this["_fillOpacityRaf"] = this["_timers"]["requestAnimationFrame"](() => {
      this["_fillOpacityRaf"] = null, this["_fillOpacity"] = _0x1b98e2, this["_scheduleApplyStyle"]();
    });
  }
  ["_loadDataColumns"]() {
    if (!this["layerManager"] || !this["layerId"]) return;
    const _0x4dc699 = this["layerManager"]["getEntityPropertyNames"](this["layerId"])["filter"]((_0x4dcf3b) => !TECHNICAL_COLUMN_PATTERN["test"](_0x4dcf3b));
    this["_dataColumns"] = _0x4dc699, this["_numericDataColumns"] = _0x4dc699["filter"]((_0x5330f2) => this["layerManager"]["getColumnRange"](this["layerId"], _0x5330f2) !== null);
  }
  ["_onDataColumnChange"](_0x4c84c7) {
    this["_dataColumn"] = _0x4c84c7;
    if (!this["layerManager"] || !this["layerId"] || !_0x4c84c7) return;
    if (this["_colorMode"] === "gradient" || this["_colorMode"] === "bin") {
      const _0x166e15 = this["layerManager"]["getColumnRange"](this["layerId"], _0x4c84c7);
      this["_gradientMin"] = _0x166e15 ? String(_0x166e15["min"]) : "", this["_gradientMax"] = _0x166e15 ? String(_0x166e15["max"]) : "", this["_gradientMinError"] = "", this["_gradientMaxError"] = "";
    } else this["_colorMode"] === "enum" && this["_loadCategoryValues"](_0x4c84c7);
    this["_scheduleApplyStyle"]();
  }
  ["_checkGradientBound"](_0x14fb25, _0x96da64) {
    const _0x300ac5 = this["layerManager"] && this["layerId"] && this["_dataColumn"] ? this["layerManager"]["getColumnRange"](this["layerId"], this["_dataColumn"]) : null, _0x4d1570 = _0x14fb25 === "min" ? this["_gradientMax"] : this["_gradientMin"];
    return checkGradientBound(_0x96da64, _0x14fb25, _0x4d1570, _0x300ac5);
  }
  ["_allowNegativeMin"]() {
    if (!this["layerManager"] || !this["layerId"] || !this["_dataColumn"]) return !![];
    const _0x500fa2 = this["layerManager"]["getColumnRange"](this["layerId"], this["_dataColumn"]);
    return !_0x500fa2 || _0x500fa2["min"] < 0;
  }
  ["_allowNegativeMax"]() {
    if (!this["layerManager"] || !this["layerId"] || !this["_dataColumn"]) return !![];
    const _0x3b93f8 = this["layerManager"]["getColumnRange"](this["layerId"], this["_dataColumn"]);
    return !_0x3b93f8 || _0x3b93f8["max"] < 0;
  }
  ["_sortCategoryValues"](_0x2f1442) {
    if (this["_categorySort"] !== "source") return sortCategoryValues(_0x2f1442, this["_categorySort"]);
    if (!this["layerManager"] || !this["layerId"] || !this["_dataColumn"]) return _0x2f1442;
    const _0x2f9fa7 = /* @__PURE__ */ new Map();
    this["layerManager"]["getUniqueColumnValues"](this["layerId"], this["_dataColumn"])["forEach"]((_0x49948b, _0x12a04a) => _0x2f9fa7["set"](String(_0x49948b), _0x12a04a));
    const _0xdc28a = (_0x3847f2) => _0x2f9fa7["get"](String(_0x3847f2)) ?? Number["MAX_SAFE_INTEGER"];
    return [..._0x2f1442]["sort"]((_0xdc049c, _0x1a51f5) => _0xdc28a(_0xdc049c) - _0xdc28a(_0x1a51f5));
  }
  ["_loadCategoryValues"](_0x59003c) {
    if (!this["layerManager"] || !this["layerId"]) return;
    const _0x3b318e = this["layerManager"]["getUniqueColumnValues"](this["layerId"], _0x59003c);
    this["_categoryValues"] = this["_sortCategoryValues"](_0x3b318e), this["_categoryColors"] = this["_autoFillCategoryColors"](this["_categoryValues"], this["_categoryColors"]);
  }
  ["_autoFillCategoryColors"](_0x274c2e, _0x12b8b8) {
    return autoFillCategoryColors(_0x274c2e, _0x12b8b8, this["_activePaletteColors"]());
  }
  static ["_fitListToRows"](_0x368596, _0x470deb) {
    if (!_0x368596) return;
    const _0x2c5619 = _0x368596["querySelectorAll"](_0x470deb);
    if (_0x2c5619["length"] === 0) {
      _0x368596["style"]["maxHeight"] = "";
      return;
    }
    const _0x83bbdb = _0x2c5619[0]["getBoundingClientRect"]();
    if (_0x2c5619["length"] === 1) {
      _0x368596["style"]["maxHeight"] = _0x83bbdb["height"] + "px";
      return;
    }
    const _0x558530 = _0x2c5619[1]["getBoundingClientRect"](), _0x2e5880 = _0x558530["top"] - _0x83bbdb["top"], _0x16d53b = _0x83bbdb["height"] + _0x2e5880 * (VISIBLE_LIST_ROWS - 1);
    _0x368596["style"]["maxHeight"] = _0x16d53b + "px";
  }
  ["_activePaletteColors"]() {
    const _0x36f1ad = GRADIENT_PALETTES["find"]((_0x3516ae) => _0x3516ae["value"] === this["_gradientPalette"]) ?? GRADIENT_PALETTES[0];
    return this["_paletteReversed"] ? [..._0x36f1ad["colors"]]["reverse"]() : _0x36f1ad["colors"];
  }
  ["_buildFillStyle"]() {
    const _0x465798 = this["layerManager"] && this["layerId"] && this["_dataColumn"] ? this["layerManager"]["getColumnRange"](this["layerId"], this["_dataColumn"]) : null;
    return buildFillStyle({ "colorMode": this["_colorMode"], "fillOpacityPercent": this["_fillOpacity"], "fillColor": this["_fillColor"], "dataColumn": this["_dataColumn"], "paletteColors": this["_activePaletteColors"](), "paletteKind": paletteKindOf(this["_gradientPalette"]), "gradientMin": this["_gradientMin"], "gradientMax": this["_gradientMax"], "columnRange": _0x465798, "binCount": Number(this["_binCount"]) || Number(DEFAULT_BIN_COUNT), "categoryColors": this["_categoryColors"] });
  }
  ["_scheduleApplyStyle"](_0x401520) {
    if (!this["layerManager"] || !this["layerId"] || this["_isServiceLayer"]) return;
    _0x401520 !== void 0 && (this["_pendingOutlineWidthOverride"] = _0x401520);
    if (this["_applyStyleRaf"] !== null) return;
    this["_applyStyleRaf"] = this["_timers"]["requestAnimationFrame"](() => {
      this["_applyStyleRaf"] = null;
      const _0x1de444 = this["_pendingOutlineWidthOverride"];
      this["_pendingOutlineWidthOverride"] = void 0;
      const _0x2bea61 = { "fill": this["_buildFillStyle"](), "outline": { "enabled": this["_outlineEnabled"], "color": this["_outlineColor"], "width": Number(_0x1de444 ?? this["_outlineWidth"]) || Number(DEFAULT_OUTLINE_WIDTH) } };
      void this["layerManager"]["applyLayerStyle"](this["layerId"], _0x2bea61);
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
              ${this["_categoryValues"]["map"]((_0x39f2cb) => b`
                  <div class="legend-bin-row">
                    <span class="legend-swatch" style="background:${this["_categoryColors"][String(_0x39f2cb)] ?? DEFAULT_FILL_COLOR}"></span>
                    <span class="legend-value" title=${String(_0x39f2cb)}>${String(_0x39f2cb)}</span>
                  </div>
                `)}
            </div>
          </div>
          <div
            class="category-scroll-thumb"
            @pointerdown=${(_0x5ee75c) => this["_categoryScroll"]["startDrag"](_0x5ee75c)}
          ></div>
        </div>
      </div>
    `;
  }
  ["_renderLegendCard"]() {
    const _0x212129 = this["layerManager"] && this["layerId"] && this["_dataColumn"] ? this["layerManager"]["getColumnRange"](this["layerId"], this["_dataColumn"]) : null, _0x4a665b = this["_gradientMin"] !== "" ? Number(this["_gradientMin"]) : void 0, _0x5d3612 = this["_gradientMax"] !== "" ? Number(this["_gradientMax"]) : void 0, _0x61824e = _0x4a665b !== void 0 && Number["isFinite"](_0x4a665b) ? _0x4a665b : _0x212129 == null ? void 0 : _0x212129["min"], _0x1f8243 = _0x5d3612 !== void 0 && Number["isFinite"](_0x5d3612) ? _0x5d3612 : _0x212129 == null ? void 0 : _0x212129["max"];
    if (_0x61824e === void 0 || _0x1f8243 === void 0) return "";
    if (this["_colorMode"] === "gradient") {
      const _0x12da45 = this["_activePaletteColors"](), _0x53325c = paletteKindOf(this["_gradientPalette"]);
      return b`
        <div class="card">
          <span class="card-title">Lejant</span>
          <div class="legend-bin-wrap">
            <div
              class="legend-bin-list"
              @scroll=${() => this["_legendScroll"]["sync"]()}
            >
              ${gradientLegendRows(_0x61824e, _0x1f8243, (_0x428b8c) => sampleFromPaletteCss(_0x12da45, _0x428b8c, _0x53325c))["map"]((_0x62f40c) => b`
                  <div class="legend-bin-row">
                    <span class="legend-swatch" style="background:${_0x62f40c["color"]}"></span>
                    <span class="legend-value">${_0x62f40c["label"]}</span>
                  </div>
                `)}
            </div>
            <div
              class="legend-scroll-thumb"
              @pointerdown=${(_0x5b5102) => this["_legendScroll"]["startDrag"](_0x5b5102)}
            ></div>
          </div>
        </div>
      `;
    }
    if (this["_colorMode"] === "bin") {
      const _0x478ad8 = Number(this["_binCount"]) || Number(DEFAULT_BIN_COUNT), _0x48bc3a = this["_activePaletteColors"](), _0x441b5c = paletteKindOf(this["_gradientPalette"]);
      return b`
        <div class="card">
          <span class="card-title">Lejant</span>
          <div class="legend-bin-wrap">
            <div
              class="legend-bin-list"
              @scroll=${() => this["_legendScroll"]["sync"]()}
            >
              ${binLegendRows(_0x61824e, _0x1f8243, _0x478ad8, (_0x220043) => sampleFromPaletteCss(_0x48bc3a, _0x220043, _0x441b5c))["map"]((_0x9439f) => b`
                  <div class="legend-bin-row">
                    <span class="legend-swatch" style="background:${_0x9439f["color"]}"></span>
                    <span class="legend-value">${_0x9439f["label"]}</span>
                  </div>
                `)}
            </div>
            <div
              class="legend-scroll-thumb"
              @pointerdown=${(_0x17e351) => this["_legendScroll"]["startDrag"](_0x17e351)}
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
        <div class="header" @pointerdown=${(_0x32362c) => this["_drag"]["start"](_0x32362c)}>
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
                    @input=${(_0x413474) => {
      this["_outlineColor"] = _0x413474["target"]["value"], this["_scheduleApplyStyle"]();
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
                  @input=${(_0x185500) => {
      const _0x3d4114 = _0x185500["target"];
      let _0x5154d0 = _0x3d4114["value"]["replace"](/[^\d.]/g, "");
      const _0x1ccadf = _0x5154d0["indexOf"](".");
      _0x1ccadf !== -1 && (_0x5154d0 = _0x5154d0["slice"](0, _0x1ccadf + 1) + _0x5154d0["slice"](_0x1ccadf + 1)["replaceAll"](".", ""));
      if (_0x3d4114["value"] !== _0x5154d0) _0x3d4114["value"] = _0x5154d0;
      this["_scheduleApplyStyle"](_0x5154d0);
    }}
                  @cds-number-input=${(_0x1fb339) => {
      if (!_0x1fb339["detail"]["direction"]) return;
      const _0x475388 = Number(_0x1fb339["detail"]["value"]);
      if (!Number["isNaN"](_0x475388)) this["_outlineWidth"] = String(_0x475388);
      this["_scheduleApplyStyle"]();
    }}
                  @focusout=${(_0x28b5d5) => {
      const _0x28af4d = _0x28b5d5["target"], _0x187130 = Number(_0x28af4d["value"]), _0x34a841 = String(Number["isFinite"](_0x187130) && _0x187130 > 0 ? Math["min"](50, Math["max"](0.5, _0x187130)) : Number(DEFAULT_OUTLINE_WIDTH));
      this["_outlineWidth"] = _0x34a841, _0x28af4d["value"] = _0x34a841, this["_scheduleApplyStyle"]();
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
                  @cds-checkbox-changed=${(_0x4b169d) => {
      var _a3;
      this["_outlineEnabled"] = ((_a3 = _0x4b169d["detail"]) == null ? void 0 : _a3["checked"]) ?? !this["_outlineEnabled"], this["_scheduleApplyStyle"]();
    }}
                ></cds-checkbox>
              </div>
            </div>
    `;
  }
};
TucbsStyleEditor["styles"] = styleEditorStyles, __decorateClass$x([n$1({ "type": Boolean, "reflect": !![] })], TucbsStyleEditor["prototype"], "open", 2), __decorateClass$x([n$1({ "attribute": ![] })], TucbsStyleEditor["prototype"], "layerManager", 2), __decorateClass$x([n$1()], TucbsStyleEditor["prototype"], "layerId", 2), __decorateClass$x([n$1()], TucbsStyleEditor["prototype"], "layerTitle", 2), __decorateClass$x([n$1()], TucbsStyleEditor["prototype"], "layerType", 2), __decorateClass$x([n$1({ "attribute": "custom-css" })], TucbsStyleEditor["prototype"], "customCss", 2), __decorateClass$x([r()], TucbsStyleEditor["prototype"], "_colorMode", 2), __decorateClass$x([r()], TucbsStyleEditor["prototype"], "_dataColumn", 2), __decorateClass$x([r()], TucbsStyleEditor["prototype"], "_dataColumns", 2), __decorateClass$x([r()], TucbsStyleEditor["prototype"], "_numericDataColumns", 2), __decorateClass$x([r()], TucbsStyleEditor["prototype"], "_gradientPalette", 2), __decorateClass$x([r()], TucbsStyleEditor["prototype"], "_gradientMin", 2), __decorateClass$x([r()], TucbsStyleEditor["prototype"], "_gradientMax", 2), __decorateClass$x([r()], TucbsStyleEditor["prototype"], "_gradientMinError", 2), __decorateClass$x([r()], TucbsStyleEditor["prototype"], "_gradientMaxError", 2), __decorateClass$x([r()], TucbsStyleEditor["prototype"], "_binCount", 2), __decorateClass$x([r()], TucbsStyleEditor["prototype"], "_categorySort", 2), __decorateClass$x([r()], TucbsStyleEditor["prototype"], "_paletteReversed", 2), __decorateClass$x([r()], TucbsStyleEditor["prototype"], "_categoryValues", 2), __decorateClass$x([r()], TucbsStyleEditor["prototype"], "_categoryColors", 2), __decorateClass$x([r()], TucbsStyleEditor["prototype"], "_fillColor", 2), __decorateClass$x([r()], TucbsStyleEditor["prototype"], "_fillOpacity", 2), __decorateClass$x([r()], TucbsStyleEditor["prototype"], "_outlineEnabled", 2), __decorateClass$x([r()], TucbsStyleEditor["prototype"], "_outlineColor", 2), __decorateClass$x([r()], TucbsStyleEditor["prototype"], "_outlineWidth", 2), __decorateClass$x([r()], TucbsStyleEditor["prototype"], "_featureCount", 2), __decorateClass$x([r()], TucbsStyleEditor["prototype"], "_serviceStyleRequestId", 2), __decorateClass$x([e$3(".category-values-list")], TucbsStyleEditor["prototype"], "_categoryListEl", 2), __decorateClass$x([e$3(".category-scroll-thumb")], TucbsStyleEditor["prototype"], "_categoryThumbEl", 2), __decorateClass$x([e$3(".legend-bin-list")], TucbsStyleEditor["prototype"], "_legendListEl", 2), __decorateClass$x([e$3(".legend-scroll-thumb")], TucbsStyleEditor["prototype"], "_legendThumbEl", 2), TucbsStyleEditor = __decorateClass$x([t$3("tucbs-style-editor")], TucbsStyleEditor);
var __defProp$v = Object["defineProperty"], __getOwnPropDesc$w = Object["getOwnPropertyDescriptor"], __decorateClass$w = (_0x53705d, _0x459b29, _0x3b8f3e, _0x3ebf95) => {
  var _0x370aa6 = _0x3ebf95 > 1 ? void 0 : _0x3ebf95 ? __getOwnPropDesc$w(_0x459b29, _0x3b8f3e) : _0x459b29;
  for (var _0x22b710 = _0x53705d["length"] - 1, _0x452292; _0x22b710 >= 0; _0x22b710--) if (_0x452292 = _0x53705d[_0x22b710]) _0x370aa6 = (_0x3ebf95 ? _0x452292(_0x459b29, _0x3b8f3e, _0x370aa6) : _0x452292(_0x370aa6)) || _0x370aa6;
  if (_0x3ebf95 && _0x370aa6) __defProp$v(_0x459b29, _0x3b8f3e, _0x370aa6);
  return _0x370aa6;
};
const SERVICE_LAYER_TYPES = ["WMS", "WMTS"];
let TucbsLegendPanel = class extends i$2 {
  constructor() {
    super(...arguments), this["layerId"] = "", this["layerType"] = "", this["open"] = ![], this["customCss"] = "", this["_legendUrl"] = "", this["_loading"] = ![], this["_error"] = "", this["_customCssState"] = { "sheet": null }, this["_listScroll"] = new VirtualScrollbar(this, () => this["_listEl"], () => this["_thumbEl"]), this["_timers"] = new TimerBag(this), this["_onLayerStyle"] = (_0x54262e) => {
      if (_0x54262e["id"] === this["layerId"]) this["_vectorStyle"] = _0x54262e["style"];
    };
  }
  get ["_isServiceLayer"]() {
    return SERVICE_LAYER_TYPES["includes"](this["layerType"]);
  }
  ["updated"](_0x59616c) {
    var _a2, _b;
    if (_0x59616c["has"]("layerManager")) {
      const _0x21f618 = _0x59616c["get"]("layerManager");
      _0x21f618 == null ? void 0 : _0x21f618["off"]("layer:style", this["_onLayerStyle"]), (_a2 = this["layerManager"]) == null ? void 0 : _a2["on"]("layer:style", this["_onLayerStyle"]);
    }
    (_0x59616c["has"]("layerId") || _0x59616c["has"]("layerType") || _0x59616c["has"]("layerManager")) && (this["_vectorStyle"] = (_b = this["layerManager"]) == null ? void 0 : _b["getLayerStyle"](this["layerId"]), void this["_loadLegend"]()), _0x59616c["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_customCssState"], "tucbs-legend-panel"), this["_timers"]["requestAnimationFrame"](() => {
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
        const _0x23f995 = await this["layerManager"]["getWmtsAvailableStyles"](this["layerId"]);
        this["_legendUrl"] = ((_a2 = _0x23f995[0]) == null ? void 0 : _a2["legendUrl"]) ?? "";
      }
    } catch (_0x413dde) {
      _0x413dde instanceof TucbsError && console["error"]("[tucbs-legend-panel] " + _0x413dde["code"] + " (" + _0x413dde["number"] + "): " + _0x413dde["message"]), this["_error"] = _0x413dde instanceof Error ? _0x413dde["message"] : "Lejant yüklenemedi.";
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
  ["_resolveGradientRange"](_0x1de3ad, _0x91216b, _0x3a945f) {
    var _a2;
    if (_0x91216b !== void 0 && _0x3a945f !== void 0) return { "min": _0x91216b, "max": _0x3a945f };
    const _0x51a576 = (_a2 = this["layerManager"]) == null ? void 0 : _a2["getColumnRange"](this["layerId"], _0x1de3ad);
    if (!_0x51a576) return void 0;
    return { "min": _0x91216b ?? _0x51a576["min"], "max": _0x3a945f ?? _0x51a576["max"] };
  }
  ["_renderVectorLegend"]() {
    const _0x87c927 = this["_vectorStyle"];
    if (!_0x87c927) return b`<span class="legend-empty">Henüz stil uygulanmadı.</span>`;
    switch (_0x87c927["fill"]["mode"]) {
      case "gradient": {
        const { palette: _0x36418d, paletteKind: _0x44e060, column: _0x296c56 } = _0x87c927["fill"], _0x1b370e = this["_resolveGradientRange"](_0x296c56, _0x87c927["fill"]["min"], _0x87c927["fill"]["max"]);
        if (!_0x1b370e) return b`<span class="legend-empty">Aralık hesaplanamadı.</span>`;
        const { min: _0x224e95, max: _0x287e8e } = _0x1b370e;
        return this["_renderScrollableRows"](gradientLegendRows(_0x224e95, _0x287e8e, (_0x50a5a5) => sampleFromPaletteCss(_0x36418d, _0x50a5a5, _0x44e060)));
      }
      case "bin": {
        const { palette: _0x223175, binCount: _0xeedc8f, paletteKind: _0x1267cb, column: _0x5406ce } = _0x87c927["fill"], _0x2733a3 = this["_resolveGradientRange"](_0x5406ce, _0x87c927["fill"]["min"], _0x87c927["fill"]["max"]);
        if (!_0x2733a3) return b`<span class="legend-empty">Aralık hesaplanamadı.</span>`;
        const { min: _0x31f1ae, max: _0xc16924 } = _0x2733a3;
        return this["_renderScrollableRows"](binLegendRows(_0x31f1ae, _0xc16924, _0xeedc8f, (_0x42318d) => sampleFromPaletteCss(_0x223175, _0x42318d, _0x1267cb)));
      }
      case "enum": {
        const _0x4c9d3d = Object["entries"](_0x87c927["fill"]["colors"]);
        if (_0x4c9d3d["length"] === 0) return b`<span class="legend-empty">Kategori bulunamadı.</span>`;
        const _0x3449be = [..._0x4c9d3d]["sort"](([_0x1c045f], [_0x3563ae]) => compareCategoryKeys(_0x1c045f, _0x3563ae));
        return this["_renderScrollableRows"](_0x3449be["map"](([_0x1f89d0, _0x53fd15]) => ({ "color": _0x53fd15, "label": _0x1f89d0 })));
      }
      case "solid":
      case "off":
      default:
        return b`<span class="legend-empty">Bu katman sabit renkli, lejant gerekmiyor.</span>`;
    }
  }
  ["_renderScrollableRows"](_0x40accd) {
    return b`
      <div class="legend-bin-wrap">
        <div class="legend-bin-list" @scroll=${() => this["_listScroll"]["sync"]()}>
          ${_0x40accd["map"]((_0x9d5e2f) => b`
              <div class="legend-bin-row">
                <span class="legend-swatch" style="background:${_0x9d5e2f["color"]}"></span>
                <span class="legend-value" title=${_0x9d5e2f["label"]}>${_0x9d5e2f["label"]}</span>
              </div>
            `)}
        </div>
        <div
          class="legend-scroll-thumb"
          @pointerdown=${(_0x19ff5c) => this["_listScroll"]["startDrag"](_0x19ff5c)}
        ></div>
      </div>
    `;
  }
  static ["_fitListToRows"](_0x21f5d2) {
    if (!_0x21f5d2) return;
    const _0x1c4a28 = _0x21f5d2["querySelectorAll"](".legend-bin-row");
    if (_0x1c4a28["length"] === 0) {
      _0x21f5d2["style"]["maxHeight"] = "";
      return;
    }
    const _0x18ba71 = _0x1c4a28[0]["getBoundingClientRect"]();
    if (_0x1c4a28["length"] === 1) {
      _0x21f5d2["style"]["maxHeight"] = _0x18ba71["height"] + "px";
      return;
    }
    const _0x4979e5 = _0x1c4a28[1]["getBoundingClientRect"](), _0x2698a5 = _0x4979e5["top"] - _0x18ba71["top"];
    _0x21f5d2["style"]["maxHeight"] = _0x18ba71["height"] + _0x2698a5 * (TucbsLegendPanel["VISIBLE_LIST_ROWS"] - 1) + "px";
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
var __defProp$u = Object["defineProperty"], __getOwnPropDesc$v = Object["getOwnPropertyDescriptor"], __decorateClass$v = (_0x20f89f, _0x17baf2, _0x3c6c79, _0x230814) => {
  var _0x2cdc47 = _0x230814 > 1 ? void 0 : _0x230814 ? __getOwnPropDesc$v(_0x17baf2, _0x3c6c79) : _0x17baf2;
  for (var _0x1606d3 = _0x20f89f["length"] - 1, _0x36b38f; _0x1606d3 >= 0; _0x1606d3--) if (_0x36b38f = _0x20f89f[_0x1606d3]) _0x2cdc47 = (_0x230814 ? _0x36b38f(_0x17baf2, _0x3c6c79, _0x2cdc47) : _0x36b38f(_0x2cdc47)) || _0x2cdc47;
  if (_0x230814 && _0x2cdc47) __defProp$u(_0x17baf2, _0x3c6c79, _0x2cdc47);
  return _0x2cdc47;
};
const ICON_CLOSE$5 = o$1(iconNodeToString(_16_default$v));
let TucbsSlideOverPanel = class extends i$2 {
  constructor() {
    super(...arguments), this["panelTitle"] = "", this["side"] = "right", this["open"] = ![], this["panelWidth"] = "360px", this["customCss"] = "", this["scrollBody"] = !![], this["_customCssState"] = { "sheet": null };
  }
  ["updated"](_0x1357ca) {
    _0x1357ca["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_customCssState"], "tucbs-slide-over-panel");
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
  const _0x56362d = [];
  if (sharedLeftWidth) _0x56362d["push"](sharedLeftWidth);
  if (sharedRightWidth) _0x56362d["push"](sharedRightWidth);
  const _0x59f9da = _0x56362d["length"] ? "calc(100% - " + _0x56362d["join"](" - ") + ")" : "100%", _0x2c7741 = sharedLeftWidth ?? "";
  for (const _0x3ca22e of layoutTargets) {
    _0x3ca22e["style"]["width"] = _0x59f9da, _0x3ca22e["style"]["marginLeft"] = _0x2c7741;
  }
}
class PanelLayoutController {
  constructor(_0x42187f, _0x1854a7 = "right") {
    this["hostForToolbarLookup"] = _0x42187f, this["side"] = _0x1854a7, this["_mapContainer"] = null, this["_resizeObserver"] = null, this["_toolbarEl"] = null, this["_toolbarLookupDone"] = ![], this["_resizeRaf"] = null, this["onExclusiveClose"] = null, this["_timers"] = new TimerBag(_0x42187f);
  }
  ["bindMap"](_0x3257d6) {
    this["_map"] = _0x3257d6;
    const _0x32f91d = _0x3257d6["viewer"]["container"];
    this["_mapContainer"] = _0x32f91d, _0x32f91d["style"]["transition"] = "width " + TRANSITION_TIMING + ", margin-left " + TRANSITION_TIMING, layoutTargets["add"](_0x32f91d);
    const _0x596a6d = document["querySelector"]("tucbs-info-bar");
    _0x596a6d && (_0x596a6d["style"]["transition"] = "width " + TRANSITION_TIMING + ", margin-left " + TRANSITION_TIMING, layoutTargets["add"](_0x596a6d)), this["_resizeObserver"] = new ResizeObserver(() => {
      if (this["_resizeRaf"] !== null) return;
      this["_resizeRaf"] = this["_timers"]["requestAnimationFrame"](() => {
        this["_resizeRaf"] = null, _0x3257d6["resize"]();
      });
    }), this["_resizeObserver"]["observe"](_0x32f91d), applyCombinedLayout();
  }
  ["unbindMap"](_0x4c762e) {
    var _a2;
    (_a2 = this["_resizeObserver"]) == null ? void 0 : _a2["disconnect"](), this["_resizeObserver"] = null;
    this["_resizeRaf"] !== null && (this["_timers"]["cancelAnimationFrame"](this["_resizeRaf"]), this["_resizeRaf"] = null);
    if (openControllerBySide[this["side"]] === this) openControllerBySide[this["side"]] = null;
    if (this["side"] === "left") sharedLeftWidth = null;
    else sharedRightWidth = null;
    applyCombinedLayout();
    if (this["_mapContainer"]) this["_mapContainer"]["style"]["transition"] = "";
    this["_mapContainer"] = null, this["_map"] = void 0, _0x4c762e["resize"]();
  }
  ["setOpen"](_0x1fb700, _0x57c115) {
    var _a2;
    if (_0x1fb700) {
      const _0x424052 = openControllerBySide[this["side"]];
      if (_0x424052 && _0x424052 !== this) (_a2 = _0x424052["onExclusiveClose"]) == null ? void 0 : _a2.call(_0x424052);
      openControllerBySide[this["side"]] = this;
    } else openControllerBySide[this["side"]] === this && (openControllerBySide[this["side"]] = null);
    if (this["side"] === "left") sharedLeftWidth = _0x1fb700 ? _0x57c115 : null;
    else sharedRightWidth = _0x1fb700 ? _0x57c115 : null;
    applyCombinedLayout(), this["_applyToolbarShift"](_0x1fb700, _0x57c115);
  }
  ["_findToolbarHost"]() {
    const _0x1e152a = this["hostForToolbarLookup"]["getRootNode"]();
    if (_0x1e152a instanceof ShadowRoot && _0x1e152a["host"]["tagName"]["toLowerCase"]() === "tucbs-toolbar") return _0x1e152a["host"];
    return null;
  }
  ["_applyToolbarShift"](_0x568763, _0x51831f) {
    !this["_toolbarLookupDone"] && (this["_toolbarEl"] = this["_findToolbarHost"](), this["_toolbarLookupDone"] = !![]);
    const _0x3f9b17 = this["_toolbarEl"];
    if (!_0x3f9b17) return;
    const _0x1e1871 = _0x3f9b17["position"], _0x16ca4f = _0x1e1871 === "right-center" || _0x1e1871 === "top-right" || _0x1e1871 === "bottom-right";
    if (!_0x16ca4f) return;
    _0x3f9b17["style"]["transition"] = "translate " + TRANSITION_TIMING, _0x3f9b17["style"]["translate"] = _0x568763 ? "calc(-1 * " + _0x51831f + ")" : "";
  }
}
class PortalHost {
  constructor(_0x3d2869, _0x506ee1, _0x1ab1d2, _0x3c6089) {
    this["tag"] = _0x3d2869, this["sync"] = _0x506ee1, this["closeEvent"] = _0x1ab1d2, this["onClose"] = _0x3c6089, this["el"] = null;
  }
  get ["element"]() {
    return this["el"];
  }
  ["ensure"]() {
    if (this["el"]) return;
    const _0x827f9e = document["createElement"](this["tag"]);
    _0x827f9e["setAttribute"]("data-tucbs-portal", ""), this["closeEvent"] && this["onClose"] && _0x827f9e["addEventListener"](this["closeEvent"], this["onClose"]), document["body"]["appendChild"](_0x827f9e), this["el"] = _0x827f9e, this["sync"](_0x827f9e);
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
  constructor(_0x13e99b) {
    this["onReorder"] = _0x13e99b, this["state"] = null;
  }
  ["start"](_0x4ecedb, _0x55f2a2, _0x303c9a, _0x4b2bfb) {
    if (_0x4ecedb["button"] !== 0 || this["state"]) return;
    _0x4ecedb["preventDefault"](), _0x303c9a["setPointerCapture"](_0x4ecedb["pointerId"]);
    const _0x210d3a = _0x55f2a2["getBoundingClientRect"](), _0x3c0d6d = document["createElement"]("div");
    _0x3c0d6d["className"] = "layer-placeholder", _0x3c0d6d["style"]["height"] = _0x210d3a["height"] + "px", _0x55f2a2["after"](_0x3c0d6d), _0x55f2a2["classList"]["add"]("layer-item--dragging"), _0x55f2a2["style"]["left"] = _0x210d3a["left"] + "px", _0x55f2a2["style"]["top"] = _0x210d3a["top"] + "px", _0x55f2a2["style"]["width"] = _0x210d3a["width"] + "px";
    const _0x26956a = { "handle": _0x303c9a, "item": _0x55f2a2, "list": _0x4b2bfb, "placeholder": _0x3c0d6d, "pointerId": _0x4ecedb["pointerId"], "offsetY": _0x4ecedb["clientY"] - _0x210d3a["top"], "onMove": (_0x4da4f0) => this["move"](_0x4da4f0), "onEnd": (_0x410bb4) => this["end"](_0x410bb4) };
    window["addEventListener"]("pointermove", _0x26956a["onMove"]), window["addEventListener"]("pointerup", _0x26956a["onEnd"]), window["addEventListener"]("pointercancel", _0x26956a["onEnd"]), this["state"] = _0x26956a;
  }
  ["move"](_0x179da4) {
    const _0xab69d6 = this["state"];
    if (!_0xab69d6 || _0x179da4["pointerId"] !== _0xab69d6["pointerId"]) return;
    _0x179da4["preventDefault"](), _0xab69d6["item"]["style"]["top"] = _0x179da4["clientY"] - _0xab69d6["offsetY"] + "px", this["movePlaceholder"](_0x179da4["clientY"]);
  }
  ["movePlaceholder"](_0x1fc0e0) {
    const _0xc2333 = this["state"];
    if (!_0xc2333) return;
    const _0x3ddd18 = [..._0xc2333["list"]["querySelectorAll"](".layer-item[data-layer-id]")]["filter"]((_0x264ae2) => _0x264ae2 !== _0xc2333["item"]), _0x32707f = _0x3ddd18["find"]((_0x152ef3) => {
      const _0x1679f8 = _0x152ef3["getBoundingClientRect"]();
      return _0x1fc0e0 < _0x1679f8["top"] + _0x1679f8["height"] / 2;
    });
    _0xc2333["list"]["insertBefore"](_0xc2333["placeholder"], _0x32707f ?? null);
  }
  ["end"](_0x293b29) {
    var _a2;
    const _0x2dd332 = this["state"];
    if (!_0x2dd332 || _0x293b29["pointerId"] !== _0x2dd332["pointerId"]) return;
    window["removeEventListener"]("pointermove", _0x2dd332["onMove"]), window["removeEventListener"]("pointerup", _0x2dd332["onEnd"]), window["removeEventListener"]("pointercancel", _0x2dd332["onEnd"]);
    _0x2dd332["handle"]["hasPointerCapture"](_0x293b29["pointerId"]) && _0x2dd332["handle"]["releasePointerCapture"](_0x293b29["pointerId"]);
    const _0x56eca6 = _0x2dd332["item"]["dataset"]["layerId"], _0x1dd3ff = (_a2 = _0x2dd332["placeholder"]["nextElementSibling"]) == null ? void 0 : _a2["dataset"]["layerId"];
    _0x2dd332["placeholder"]["remove"](), _0x2dd332["item"]["classList"]["remove"]("layer-item--dragging"), _0x2dd332["item"]["removeAttribute"]("style"), this["state"] = null, this["onReorder"](_0x56eca6, _0x1dd3ff);
  }
  ["dispose"]() {
    if (!this["state"]) return;
    window["removeEventListener"]("pointermove", this["state"]["onMove"]), window["removeEventListener"]("pointerup", this["state"]["onEnd"]), window["removeEventListener"]("pointercancel", this["state"]["onEnd"]), this["state"] = null;
  }
}
class MarkerWatcher {
  constructor(_0x5b8768, _0x35a03e, _0x5ba5c5) {
    this["host"] = _0x5b8768, this["tagName"] = _0x35a03e, this["onChange"] = _0x5ba5c5, this["observer"] = null, this["current"] = null;
  }
  ["start"]() {
    const _0xfaac39 = this["host"]["getRootNode"]();
    this["evaluate"](_0xfaac39), this["observer"] = new MutationObserver(() => this["evaluate"](_0xfaac39)), this["observer"]["observe"](_0xfaac39, { "childList": !![], "subtree": !![] });
  }
  ["evaluate"](_0x197f95) {
    const _0xa55763 = _0x197f95["querySelector"](this["tagName"] + ":not([data-tucbs-portal])");
    _0xa55763 !== this["current"] && (this["current"] = _0xa55763, this["onChange"](_0xa55763));
  }
  ["dispose"]() {
    var _a2;
    (_a2 = this["observer"]) == null ? void 0 : _a2["disconnect"](), this["observer"] = null, this["current"] = null;
  }
}
function carbonIcon$3(_0x32aeae) {
  return o$1(iconNodeToString(_0x32aeae));
}
const ICON_ZOOM_IN$2 = carbonIcon$3(_16_default$1), ICON_UP_TO_TOP = carbonIcon$3(_16_default$5), ICON_TRASH_CAN$1 = carbonIcon$3(_16_default$6), ICON_PALETTE = carbonIcon$3(_16_default$t), ICON_LEGEND = carbonIcon$3(_16_default$k), ICON_DOCUMENT_EXPORT = carbonIcon$3(_16_default$r);
function buildLayerMenuActions(_0x4a1dee, _0x58c0e7, _0x343af1) {
  const _0x272f1f = [{ "icon": ICON_ZOOM_IN$2, "label": "Yakınlaş", "onClick": _0x343af1["zoomToLayer"] }, { "icon": ICON_UP_TO_TOP, "label": "En Üste Taşı", "onClick": _0x343af1["bringToFront"] }, { "icon": ICON_TRASH_CAN$1, "label": "Kaldır", "onClick": _0x343af1["remove"] }];
  return _0x58c0e7["styleEditorAvailable"] && _0x272f1f["push"]({ "icon": ICON_PALETTE, "label": "Stil Düzenle", "onClick": _0x343af1["openStyleEditor"] }), _0x58c0e7["legendAvailable"] && _0x4a1dee["styleMode"] !== "solid" && _0x4a1dee["layerType"] !== "DRAWING" && _0x4a1dee["layerType"] !== "MEASURE" && _0x272f1f["push"]({ "icon": ICON_LEGEND, "label": "Lejant", "onClick": _0x343af1["toggleLegend"] }), _0x58c0e7["layerExportAvailable"] && _0x4a1dee["layerType"] === "DRAWING" && _0x272f1f["push"]({ "icon": ICON_DOCUMENT_EXPORT, "label": "GeoJSON Olarak Dışa Aktar", "onClick": _0x343af1["exportLayer"] }), _0x58c0e7["layerExportAvailable"] && _0x58c0e7["isAnalysisResult"] && _0x272f1f["push"]({ "icon": ICON_DOCUMENT_EXPORT, "label": "Dışa Aktar", "onClick": () => void 0, "children": [{ "icon": ICON_DOCUMENT_EXPORT, "label": "GeoJSON", "onClick": _0x343af1["exportLayer"] }, { "icon": ICON_DOCUMENT_EXPORT, "label": "KML", "onClick": _0x343af1["exportLayerKml"] }, { "icon": ICON_DOCUMENT_EXPORT, "label": "Shapefile (ZIP)", "onClick": _0x343af1["exportLayerShapefile"] }] }), _0x58c0e7["layerExportAvailable"] && (_0x4a1dee["layerType"] === "WMS" || _0x4a1dee["layerType"] === "WCS") && _0x58c0e7["isGeoTiffExportAvailable"] && _0x272f1f["push"]({ "icon": ICON_DOCUMENT_EXPORT, "label": "GeoTIFF Olarak Dışa Aktar", "onClick": _0x343af1["exportLayerAsGeoTiff"] }), _0x272f1f;
}
class ExclusiveOverlayCoordinator {
  constructor() {
    this["closers"] = /* @__PURE__ */ new Map();
  }
  ["register"](_0xee05a, _0x1605d1) {
    this["closers"]["set"](_0xee05a, _0x1605d1);
  }
  ["closeOthers"](_0x202883) {
    for (const [_0x3ab59d, _0x482ec4] of this["closers"]) {
      if (_0x3ab59d !== _0x202883) _0x482ec4();
    }
  }
}
var __defProp$t = Object["defineProperty"], __getOwnPropDesc$u = Object["getOwnPropertyDescriptor"], __decorateClass$u = (_0x35ce26, _0x2ade7f, _0xc05b54, _0x59bb6c) => {
  var _0x4144f4 = _0x59bb6c > 1 ? void 0 : _0x59bb6c ? __getOwnPropDesc$u(_0x2ade7f, _0xc05b54) : _0x2ade7f;
  for (var _0x519cd7 = _0x35ce26["length"] - 1, _0x5adf6d; _0x519cd7 >= 0; _0x519cd7--) if (_0x5adf6d = _0x35ce26[_0x519cd7]) _0x4144f4 = (_0x59bb6c ? _0x5adf6d(_0x2ade7f, _0xc05b54, _0x4144f4) : _0x5adf6d(_0x4144f4)) || _0x4144f4;
  if (_0x59bb6c && _0x4144f4) __defProp$t(_0x2ade7f, _0xc05b54, _0x4144f4);
  return _0x4144f4;
};
let TucbsLayerMenuPortal = class extends i$2 {
  constructor() {
    super(...arguments), this["open"] = ![], this["actions"] = [], this["x"] = 0, this["y"] = 0;
  }
  ["updated"](_0x1e924f) {
    (_0x1e924f["has"]("x") || _0x1e924f["has"]("y")) && (this["style"]["transform"] = "translate(" + this["x"] + "px, " + this["y"] + "px)");
  }
  ["render"]() {
    return b`
      <div class="layer-menu" role="menu">
        ${this["actions"]["map"]((_0x3b1375) => {
      var _a2;
      return ((_a2 = _0x3b1375["children"]) == null ? void 0 : _a2["length"]) ? b`
                <div class="layer-menu-branch">
                  <button type="button" class="layer-menu-item" role="menuitem" aria-haspopup="true">
                    ${_0x3b1375["icon"]}<span>${_0x3b1375["label"]}</span><span class="chevron">›</span>
                  </button>
                  <div class="layer-submenu" role="menu">
                    ${_0x3b1375["children"]["map"]((_0x3cb249) => b`
                        <button
                          type="button"
                          class="layer-menu-item"
                          role="menuitem"
                          @click=${_0x3cb249["onClick"]}
                        >
                          ${_0x3cb249["icon"]}<span>${_0x3cb249["label"]}</span>
                        </button>
                      `)}
                  </div>
                </div>
              ` : b`
                <button
                  type="button"
                  class="layer-menu-item"
                  role="menuitem"
                  @click=${_0x3b1375["onClick"]}
                >
                  ${_0x3b1375["icon"]}<span>${_0x3b1375["label"]}</span>
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
var __defProp$s = Object["defineProperty"], __getOwnPropDesc$t = Object["getOwnPropertyDescriptor"], __decorateClass$t = (_0x224333, _0x42e142, _0xa4a6e, _0x4e3782) => {
  var _0x4b7956 = _0x4e3782 > 1 ? void 0 : _0x4e3782 ? __getOwnPropDesc$t(_0x42e142, _0xa4a6e) : _0x42e142;
  for (var _0x181928 = _0x224333["length"] - 1, _0x539804; _0x181928 >= 0; _0x181928--) if (_0x539804 = _0x224333[_0x181928]) _0x4b7956 = (_0x4e3782 ? _0x539804(_0x42e142, _0xa4a6e, _0x4b7956) : _0x539804(_0x4b7956)) || _0x4b7956;
  if (_0x4e3782 && _0x4b7956) __defProp$s(_0x42e142, _0xa4a6e, _0x4b7956);
  return _0x4b7956;
};
let TucbsTooltipPortal = class extends i$2 {
  constructor() {
    super(...arguments), this["open"] = ![], this["text"] = "", this["x"] = 0, this["y"] = 0;
  }
  ["updated"](_0x4542be) {
    (_0x4542be["has"]("x") || _0x4542be["has"]("y")) && (this["style"]["transform"] = "translate(" + this["x"] + "px, " + this["y"] + "px)");
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
function whenTucbsMapReady(_0x514275, _0x5105e3) {
  const _0x587cc6 = _0x514275["apiKeyAuthState"] ?? "none";
  if (_0x587cc6 === "failed") return;
  if (_0x587cc6 === "ok" || _0x587cc6 === "none" && _0x514275["map"]) {
    _0x5105e3(_0x514275);
    return;
  }
  const _0x2d7441 = () => _0x5105e3(_0x514275);
  _0x514275["addEventListener"]("ready", _0x2d7441, { "once": !![] }), _0x514275["addEventListener"]("error", () => _0x514275["removeEventListener"]("ready", _0x2d7441), { "once": !![] });
}
function standardMapBindingMessages(_0x2775f5, _0x2e63bd) {
  return { "noIdMessage": "[" + _0x2775f5 + '] "mapElementId" verilmedi ve "map" programatik olarak atanmadi; bilesen haritaya baglanamadigi icin ' + _0x2e63bd + " kalacak.", "missingElementMessage": (_0x553617) => "[" + _0x2775f5 + '] mapElementId="' + _0x553617 + '" ile eslesen bir element bulunamadi; bilesen haritaya baglanamadigi icin ' + _0x2e63bd + " kalacak." };
}
function bindMapByElementId(_0x2e2314, _0x1d3970) {
  if (_0x2e2314["map"]) return;
  if (!_0x2e2314["mapElementId"]) {
    if (_0x1d3970["noIdTiming"] === "sync") {
      console["warn"](_0x1d3970["noIdMessage"]);
      return;
    }
    requestAnimationFrame(() => {
      if (_0x2e2314["map"]) return;
      console["warn"](_0x1d3970["noIdMessage"]);
    });
    return;
  }
  const _0x4a0009 = document["getElementById"](_0x2e2314["mapElementId"]);
  if (!_0x4a0009) {
    console["warn"](_0x1d3970["missingElementMessage"](_0x2e2314["mapElementId"]));
    return;
  }
  _0x4a0009["map"] ? _0x2e2314["map"] = _0x4a0009["map"] : _0x4a0009["addEventListener"]("ready", () => {
    if (_0x4a0009["map"]) _0x2e2314["map"] = _0x4a0009["map"];
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
var __defProp$r = Object["defineProperty"], __getOwnPropDesc$s = Object["getOwnPropertyDescriptor"], __typeError$2 = (_0x2d97a2) => {
  throw TypeError(_0x2d97a2);
}, __decorateClass$s = (_0x2621b5, _0x2882e8, _0x56d445, _0x1ed820) => {
  var _0x1a6cfa = _0x1ed820 > 1 ? void 0 : _0x1ed820 ? __getOwnPropDesc$s(_0x2882e8, _0x56d445) : _0x2882e8;
  for (var _0x22d15d = _0x2621b5["length"] - 1, _0x480760; _0x22d15d >= 0; _0x22d15d--) if (_0x480760 = _0x2621b5[_0x22d15d]) _0x1a6cfa = (_0x1ed820 ? _0x480760(_0x2882e8, _0x56d445, _0x1a6cfa) : _0x480760(_0x1a6cfa)) || _0x1a6cfa;
  if (_0x1ed820 && _0x1a6cfa) __defProp$r(_0x2882e8, _0x56d445, _0x1a6cfa);
  return _0x1a6cfa;
}, __accessCheck$2 = (_0x29d409, _0x50c6d6, _0x413a36) => _0x50c6d6["has"](_0x29d409) || __typeError$2("Cannot " + _0x413a36), __privateGet$2 = (_0x3c391e, _0x4eeed0, _0xacedc9) => (__accessCheck$2(_0x3c391e, _0x4eeed0, "read from private field"), _0xacedc9 ? _0xacedc9["call"](_0x3c391e) : _0x4eeed0["get"](_0x3c391e)), __privateAdd$2 = (_0x9b9e32, _0x5d704d, _0x40863d) => _0x5d704d["has"](_0x9b9e32) ? __typeError$2("Cannot add the same private member more than once") : _0x5d704d instanceof WeakSet ? _0x5d704d["add"](_0x9b9e32) : _0x5d704d["set"](_0x9b9e32, _0x40863d), _apiKeyState$1;
const NEUTRAL_LAYER_COLOR = "#9e9e9e";
function carbonIcon$2(_0x3b0d9d) {
  return o$1(iconNodeToString(_0x3b0d9d));
}
const ICON_DOCUMENT_BLANK = carbonIcon$2(_20_default$2), ICON_CLOUD_DOWNLOAD$1 = carbonIcon$2(_20_default$4), ICON_CHEVRON_RIGHT$1 = carbonIcon$2(_16_default$x), ICON_OVERFLOW_MENU = carbonIcon$2(_16_default$f), ICON_DRAG_HANDLE = carbonIcon$2(_16_default$o), ICON_API_KEY$1 = carbonIcon$2(_20_default$5), ICON_LAYERS = carbonIcon$2(_16_default$l);
let TucbsLayerList = class extends i$2 {
  constructor() {
    super(...arguments), this["mapElementId"] = "", __privateAdd$2(this, _apiKeyState$1, new WriteOnlyApiKey(this)), this["panelWidth"] = "360px", this["collapsible"] = !![], this["customCss"] = "", this["_open"] = ![], this["_layers"] = [], this["_openMenuId"] = null, this["_geoTiffExportingId"] = null, this["_uploadOpen"] = ![], this["_fileUploadAvailable"] = ![], this["_serviceUploadOpen"] = ![], this["_serviceUploadAvailable"] = ![], this["_styleEditorAvailable"] = ![], this["_legendAvailable"] = ![], this["_layerExportAvailable"] = ![], this["_legendOpenIds"] = /* @__PURE__ */ new Set(), this["_authorizedLayersAvailable"] = ![], this["_authorizedLayersFetching"] = ![], this["_hasApiKey"] = ![], this["_fileUploadMarker"] = null, this["_serviceUploadMarker"] = null, this["_styleEditorMarker"] = null, this["_legendMarker"] = null, this["_layerExportMarker"] = null, this["_authorizedLayersMarker"] = null, this["_fileUploadPortal"] = new PortalHost("tucbs-file-upload", (_0x409600) => {
      var _a2;
      _0x409600["open"] = this["_uploadOpen"], _0x409600["layerManager"] = this["layerManager"], _0x409600["customCss"] = ((_a2 = this["_fileUploadMarker"]) == null ? void 0 : _a2["customCss"]) ?? "";
    }, "tucbs-file-upload-closed", () => this["_closeUpload"]()), this["_serviceUploadPortal"] = new PortalHost("tucbs-service-upload", (_0x3bfd55) => {
      var _a2;
      _0x3bfd55["open"] = this["_serviceUploadOpen"], _0x3bfd55["layerManager"] = this["layerManager"], _0x3bfd55["customCss"] = ((_a2 = this["_serviceUploadMarker"]) == null ? void 0 : _a2["customCss"]) ?? "", _0x3bfd55["apiKey"] = __privateGet$2(this, _apiKeyState$1)["real"];
    }, "tucbs-service-upload-closed", () => this["_closeServiceUpload"]()), this["_styleEditorPortal"] = new PortalHost("tucbs-style-editor", (_0x5bd95f) => {
      var _a2;
      _0x5bd95f["layerManager"] = this["layerManager"], _0x5bd95f["customCss"] = ((_a2 = this["_styleEditorMarker"]) == null ? void 0 : _a2["customCss"]) ?? "";
    }), this["_authorizedLayersPortal"] = new PortalHost("tucbs-authorized-layers", (_0x574304) => {
      var _a2;
      _0x574304["layerManager"] = this["layerManager"], _0x574304["customCss"] = ((_a2 = this["_authorizedLayersMarker"]) == null ? void 0 : _a2["customCss"]) ?? "";
    }), this["_fileUploadWatcher"] = new MarkerWatcher(this, "tucbs-file-upload", (_0x232c0b) => {
      this["_fileUploadMarker"] = _0x232c0b, this["_fileUploadAvailable"] = _0x232c0b !== null;
      if (_0x232c0b) this["_fileUploadPortal"]["ensure"]();
      else this["_fileUploadPortal"]["dispose"]();
    }), this["_serviceUploadWatcher"] = new MarkerWatcher(this, "tucbs-service-upload", (_0x4a9da8) => {
      this["_serviceUploadMarker"] = _0x4a9da8, this["_serviceUploadAvailable"] = _0x4a9da8 !== null;
      if (_0x4a9da8) this["_serviceUploadPortal"]["ensure"]();
      else this["_serviceUploadPortal"]["dispose"]();
    }), this["_styleEditorWatcher"] = new MarkerWatcher(this, "tucbs-style-editor", (_0x45a7ca) => {
      this["_styleEditorMarker"] = _0x45a7ca, this["_styleEditorAvailable"] = _0x45a7ca !== null;
      if (_0x45a7ca) this["_styleEditorPortal"]["ensure"]();
      else this["_styleEditorPortal"]["dispose"]();
    }), this["_legendWatcher"] = new MarkerWatcher(this, "tucbs-legend-panel", (_0x22a0f6) => {
      this["_legendMarker"] = _0x22a0f6, this["_legendAvailable"] = _0x22a0f6 !== null;
    }), this["_layerExportWatcher"] = new MarkerWatcher(this, "tucbs-layer-export", (_0x4d1f2e) => {
      this["_layerExportMarker"] = _0x4d1f2e, this["_layerExportAvailable"] = _0x4d1f2e !== null;
    }), this["_authorizedLayersWatcher"] = new MarkerWatcher(this, "tucbs-authorized-layers", (_0x32babe) => {
      this["_authorizedLayersMarker"] = _0x32babe, this["_authorizedLayersAvailable"] = _0x32babe !== null;
      if (_0x32babe) this["_authorizedLayersPortal"]["ensure"]();
      else this["_authorizedLayersPortal"]["dispose"]();
    }), this["_menuPortalEl"] = null, this["_tooltipPortalEl"] = null, this["_colorById"] = /* @__PURE__ */ new Map(), this["_opacityById"] = /* @__PURE__ */ new Map(), this["_dragReorder"] = new DragReorder((_0x54a3d4, _0x188b53) => this["_applyReorder"](_0x54a3d4, _0x188b53)), this["_overlayCoordinator"] = new ExclusiveOverlayCoordinator(), this["_customCssState"] = { "sheet": null }, this["_layoutController"] = new PanelLayoutController(this, "left"), this["_opacityRaf"] = /* @__PURE__ */ new Map(), this["_timers"] = new TimerBag(this), this["_onDocumentPointerDown"] = (_0xdbe715) => {
      const _0x58932b = _0xdbe715["composedPath"](), _0x33646f = _0x58932b["some"]((_0x214833) => _0x214833 instanceof HTMLElement && _0x214833["classList"]["contains"]("layer-options") || _0x214833 === this["_menuPortalEl"]);
      if (!_0x33646f) this["_closeMenu"]();
    }, this["_onDocumentKeyDown"] = (_0x5abeeb) => {
      if (_0x5abeeb["key"] === "Escape") this["_closeMenu"]();
    }, this["_onWindowScrollOrResize"] = () => {
      if (this["_openMenuId"]) this["_closeMenu"]();
      this["_hidePortalTooltip"]();
    }, this["_onLayerAdd"] = () => this["_syncFromLayerManager"](), this["_onLayerRemove"] = () => this["_syncFromLayerManager"](), this["_onLayerReorder"] = () => this["_syncFromLayerManager"](), this["_onLayerVisibility"] = (_0x96724b) => {
      this["_layers"] = this["_layers"]["map"]((_0x297b05) => _0x297b05["id"] === _0x96724b["id"] ? { ..._0x297b05, "visible": _0x96724b["visible"] } : _0x297b05);
    }, this["_onLayerOpacity"] = (_0x531df0) => {
      this["_opacityById"]["set"](_0x531df0["id"], _0x531df0["opacity"]), this["_layers"] = this["_layers"]["map"]((_0x3b703c) => _0x3b703c["id"] === _0x531df0["id"] ? { ..._0x3b703c, "opacity": _0x531df0["opacity"] } : _0x3b703c);
    }, this["_onLayerStyle"] = (_0x55ee3b) => {
      const { fill: _0x4bf115 } = _0x55ee3b["style"], _0x166e2c = _0x4bf115["mode"] === "solid" ? _0x4bf115["color"] : NEUTRAL_LAYER_COLOR;
      if (_0x4bf115["mode"] !== "off") this["_opacityById"]["set"](_0x55ee3b["id"], _0x4bf115["opacity"]);
      this["_layers"] = this["_layers"]["map"]((_0x457496) => _0x457496["id"] === _0x55ee3b["id"] ? { ..._0x457496, "fill": _0x166e2c, "styleMode": _0x4bf115["mode"], "opacity": _0x4bf115["mode"] !== "off" ? _0x4bf115["opacity"] : _0x457496["opacity"] } : _0x457496);
    }, this["_onApiKeyChange"] = (_0x5b2c28) => {
      this["_hasApiKey"] = _0x5b2c28["hasApiKey"];
    };
  }
  set ["apiKey"](_0x468bee) {
    __privateGet$2(this, _apiKeyState$1)["write"](_0x468bee);
  }
  get ["apiKey"]() {
    return __privateGet$2(this, _apiKeyState$1)["masked"];
  }
  ["_showPortalTooltip"](_0x4d6451, _0x41fc35) {
    if (!this["_tooltipPortalEl"]) return;
    const _0x2df6d7 = _0x4d6451["getBoundingClientRect"]();
    this["_tooltipPortalEl"]["text"] = _0x41fc35, this["_tooltipPortalEl"]["x"] = _0x2df6d7["left"], this["_tooltipPortalEl"]["y"] = _0x2df6d7["bottom"] + 6, this["_tooltipPortalEl"]["open"] = !![];
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
    const _0x365659 = document["getElementById"](this["mapElementId"]);
    if (!_0x365659) {
      console["warn"]('[tucbs-layer-list] mapElementId="' + this["mapElementId"] + '" ile eslesen bir element bulunamadi; bilesen haritaya baglanamadigi icin gizli kalacak.');
      return;
    }
    whenTucbsMapReady(_0x365659, (_0x2eda6b) => {
      var _a2;
      _0x2eda6b["layerManager"] && (this["layerManager"] = _0x2eda6b["layerManager"]), _0x2eda6b["map"] && (this["map"] = _0x2eda6b["map"]), (_a2 = _0x2eda6b["_grantApiKeyTo"]) == null ? void 0 : _a2.call(_0x2eda6b, this);
    });
  }
  ["updated"](_0x40182d) {
    _0x40182d["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_customCssState"], "tucbs-layer-list");
    if (_0x40182d["has"]("map")) {
      const _0x4e5a50 = _0x40182d["get"]("map");
      if (_0x4e5a50) this["_layoutController"]["unbindMap"](_0x4e5a50);
      if (this["map"]) this["_layoutController"]["bindMap"](this["map"]);
    }
    if (_0x40182d["has"]("layerManager")) {
      const _0x49f328 = _0x40182d["get"]("layerManager");
      if (_0x49f328) this["_unbindLayerManager"](_0x49f328);
      if (this["layerManager"]) this["_bindLayerManager"](this["layerManager"]);
      else this["_hasApiKey"] = ![];
    }
    this["_fileUploadPortal"]["update"](), this["_serviceUploadPortal"]["update"](), this["_styleEditorPortal"]["update"](), this["_authorizedLayersPortal"]["update"]();
  }
  ["_bindLayerManager"](_0x52a500) {
    _0x52a500["on"]("layer:add", this["_onLayerAdd"]), _0x52a500["on"]("layer:remove", this["_onLayerRemove"]), _0x52a500["on"]("layer:reorder", this["_onLayerReorder"]), _0x52a500["on"]("layer:visibility", this["_onLayerVisibility"]), _0x52a500["on"]("layer:opacity", this["_onLayerOpacity"]), _0x52a500["on"]("layer:style", this["_onLayerStyle"]), _0x52a500["on"]("apiKey:change", this["_onApiKeyChange"]), this["_hasApiKey"] = _0x52a500["hasApiKey"], this["_syncFromLayerManager"]();
  }
  ["_unbindLayerManager"](_0x528dbd) {
    _0x528dbd["off"]("layer:add", this["_onLayerAdd"]), _0x528dbd["off"]("layer:remove", this["_onLayerRemove"]), _0x528dbd["off"]("layer:reorder", this["_onLayerReorder"]), _0x528dbd["off"]("layer:visibility", this["_onLayerVisibility"]), _0x528dbd["off"]("layer:opacity", this["_onLayerOpacity"]), _0x528dbd["off"]("layer:style", this["_onLayerStyle"]), _0x528dbd["off"]("apiKey:change", this["_onApiKeyChange"]);
  }
  ["_syncFromLayerManager"]() {
    if (!this["layerManager"]) {
      this["_layers"] = [];
      return;
    }
    this["_layers"] = this["layerManager"]["getLayers"]()["filter"]((_0x12d440) => !_0x12d440["isBasemap"])["reverse"]()["map"]((_0x2a54af) => this["_toLayerItem"](_0x2a54af));
  }
  ["_toLayerItem"](_0x5c5cf1) {
    var _a2, _b;
    if (!this["_opacityById"]["has"](_0x5c5cf1["id"])) this["_opacityById"]["set"](_0x5c5cf1["id"], 1);
    const _0x4cfb60 = (_a2 = this["layerManager"]) == null ? void 0 : _a2["getLayerStyle"](_0x5c5cf1["id"]), _0x138f0f = (_0x4cfb60 == null ? void 0 : _0x4cfb60["fill"]["mode"]) === "solid";
    return { "id": _0x5c5cf1["id"], "title": _0x5c5cf1["title"], "visible": _0x5c5cf1["cesiumObject"]["show"], "opacity": this["_opacityById"]["get"](_0x5c5cf1["id"]) ?? 1, "fill": _0x138f0f ? _0x4cfb60["fill"]["color"] : NEUTRAL_LAYER_COLOR, "styleMode": _0x4cfb60 == null ? void 0 : _0x4cfb60["fill"]["mode"], "layerType": _0x5c5cf1["layerType"], "analysisResult": ((_b = this["layerManager"]) == null ? void 0 : _b["isAnalysisResult"](_0x5c5cf1["id"])) ?? ![] };
  }
  ["_openPanel"]() {
    this["_open"] = !![], this["_layoutController"]["setOpen"](!![], this["panelWidth"]);
  }
  ["_closePanel"]() {
    this["_open"] = ![], this["_layoutController"]["setOpen"](![], this["panelWidth"]), this["_closeMenu"]();
  }
  ["_closeStyleEditorIfOpen"]() {
    const _0x170a93 = this["_styleEditorPortal"]["element"];
    if (_0x170a93 == null ? void 0 : _0x170a93["open"]) _0x170a93["close"]();
  }
  ["_closeAuthorizedLayersIfOpen"]() {
    const _0x44fb5e = this["_authorizedLayersPortal"]["element"];
    if (_0x44fb5e == null ? void 0 : _0x44fb5e["open"]) _0x44fb5e["closePicker"]();
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
  ["_setVisible"](_0x32982c, _0x17e92a) {
    var _a2;
    (_a2 = this["layerManager"]) == null ? void 0 : _a2["setVisible"](_0x32982c, _0x17e92a);
  }
  ["_setLayerColor"](_0x3dae94, _0x57c56) {
    var _a2, _b;
    const _0x70f7e = (_a2 = this["layerManager"]) == null ? void 0 : _a2["getLayerStyle"](_0x3dae94), _0x3933fe = (_0x70f7e == null ? void 0 : _0x70f7e["fill"]["mode"]) === "solid" ? _0x70f7e["fill"]["opacity"] : 1, _0x590172 = (_0x70f7e == null ? void 0 : _0x70f7e["outline"]) ?? { "enabled": !![], "color": "#000000", "width": 2 };
    (_b = this["layerManager"]) == null ? void 0 : _b["applyLayerStyle"](_0x3dae94, { "fill": { "mode": "solid", "color": _0x57c56, "opacity": _0x3933fe }, "outline": _0x590172 });
  }
  ["_setOpacity"](_0x575aae, _0x38ebcc) {
    this["_opacityById"]["set"](_0x575aae, _0x38ebcc);
    const _0x103bd9 = this["_opacityRaf"]["get"](_0x575aae);
    if (_0x103bd9 !== void 0) this["_timers"]["cancelAnimationFrame"](_0x103bd9);
    const _0x264a88 = this["_timers"]["requestAnimationFrame"](() => {
      this["_opacityRaf"]["delete"](_0x575aae), this["_applyOpacity"](_0x575aae, this["_opacityById"]["get"](_0x575aae) ?? _0x38ebcc);
    });
    this["_opacityRaf"]["set"](_0x575aae, _0x264a88);
  }
  ["_applyOpacity"](_0x33dc33, _0x3b7118) {
    if (!this["layerManager"]) return;
    const _0x2d00c0 = this["layerManager"]["getLayerStyle"](_0x33dc33);
    if (_0x2d00c0 !== void 0 && _0x2d00c0["fill"]["mode"] !== "off") {
      this["layerManager"]["applyLayerStyle"](_0x33dc33, { "fill": { ..._0x2d00c0["fill"], "opacity": _0x3b7118 }, "outline": _0x2d00c0["outline"] });
      return;
    }
    this["layerManager"]["setOpacity"](_0x33dc33, _0x3b7118);
  }
  ["_updateOpacitySlider"](_0x2aa403, _0x2e2f66) {
    _0x2aa403["style"]["setProperty"]("--fill", _0x2e2f66 + "%");
  }
  ["_remove"](_0x109c23) {
    var _a2;
    this["_closeMenu"]();
    const _0x4ab889 = this["_opacityRaf"]["get"](_0x109c23);
    _0x4ab889 !== void 0 && (cancelAnimationFrame(_0x4ab889), this["_opacityRaf"]["delete"](_0x109c23));
    if (this["_legendOpenIds"]["has"](_0x109c23)) {
      const _0x155b54 = new Set(this["_legendOpenIds"]);
      _0x155b54["delete"](_0x109c23), this["_legendOpenIds"] = _0x155b54;
    }
    (_a2 = this["layerManager"]) == null ? void 0 : _a2["removeLayer"](_0x109c23);
  }
  ["_bringToFront"](_0x3703e7) {
    var _a2;
    this["_closeMenu"](), (_a2 = this["layerManager"]) == null ? void 0 : _a2["raiseToTop"](_0x3703e7);
  }
  ["_zoomToLayer"](_0xc82a57) {
    var _a2;
    this["_closeMenu"](), void ((_a2 = this["layerManager"]) == null ? void 0 : _a2["zoomToLayer"](_0xc82a57));
  }
  ["_closeMenu"]() {
    this["_openMenuId"] = null;
    if (this["_menuPortalEl"]) this["_menuPortalEl"]["open"] = ![];
  }
  ["_toggleMenu"](_0x5f58df, _0x5851c6) {
    if (this["_openMenuId"] === _0x5f58df["id"]) {
      this["_closeMenu"]();
      return;
    }
    this["_openMenuId"] = _0x5f58df["id"], this["_openMenuPortal"](_0x5f58df, _0x5851c6["currentTarget"]);
  }
  ["_openMenuPortal"](_0x5f38b5, _0x533631) {
    var _a2, _b;
    if (!this["_menuPortalEl"]) return;
    const _0x327e11 = _0x533631["getBoundingClientRect"](), _0x3da281 = ((_a2 = this["layerManager"]) == null ? void 0 : _a2["isAnalysisResult"](_0x5f38b5["id"])) ?? _0x5f38b5["analysisResult"];
    this["_menuPortalEl"]["actions"] = buildLayerMenuActions({ "styleMode": _0x5f38b5["styleMode"], "layerType": _0x5f38b5["layerType"] }, { "styleEditorAvailable": this["_styleEditorAvailable"], "legendAvailable": this["_legendAvailable"], "layerExportAvailable": this["_layerExportAvailable"], "isAnalysisResult": _0x3da281, "isGeoTiffExportAvailable": ((_b = this["layerManager"]) == null ? void 0 : _b["isGeoTiffExportAvailable"](_0x5f38b5["id"])) ?? ![] }, { "zoomToLayer": () => this["_zoomToLayer"](_0x5f38b5["id"]), "bringToFront": () => this["_bringToFront"](_0x5f38b5["id"]), "remove": () => this["_remove"](_0x5f38b5["id"]), "openStyleEditor": () => this["_openStyleEditor"](_0x5f38b5), "toggleLegend": () => this["_toggleLegend"](_0x5f38b5["id"]), "exportLayer": () => this["_exportLayer"](_0x5f38b5), "exportLayerKml": () => this["_exportLayerKml"](_0x5f38b5), "exportLayerShapefile": () => this["_exportLayerShapefile"](_0x5f38b5), "exportLayerAsGeoTiff": () => this["_exportLayerAsGeoTiff"](_0x5f38b5) }), this["_menuPortalEl"]["x"] = _0x327e11["right"] + 4, this["_menuPortalEl"]["y"] = _0x327e11["top"], this["_menuPortalEl"]["open"] = !![];
  }
  ["_openStyleEditor"](_0x38f55e) {
    var _a2;
    this["_closeMenu"](), this["_overlayCoordinator"]["closeOthers"]("styleEditor"), (_a2 = this["_styleEditorPortal"]["element"]) == null ? void 0 : _a2["openFor"](_0x38f55e["id"], _0x38f55e["title"], _0x38f55e["layerType"], _0x38f55e["fill"], _0x38f55e["opacity"]);
  }
  ["_toggleLegend"](_0x53e976) {
    this["_closeMenu"]();
    const _0x32e481 = new Set(this["_legendOpenIds"]);
    if (_0x32e481["has"](_0x53e976)) _0x32e481["delete"](_0x53e976);
    else _0x32e481["add"](_0x53e976);
    this["_legendOpenIds"] = _0x32e481;
  }
  ["_exportLayer"](_0x4fa0a4) {
    var _a2;
    this["_closeMenu"]();
    if (!this["layerManager"]) return;
    (_a2 = this["_layerExportMarker"]) == null ? void 0 : _a2["exportLayer"](this["layerManager"], _0x4fa0a4["id"], _0x4fa0a4["title"]);
  }
  ["_exportLayerKml"](_0x4e0f74) {
    var _a2;
    this["_closeMenu"]();
    if (!this["layerManager"]) return;
    (_a2 = this["_layerExportMarker"]) == null ? void 0 : _a2["exportLayerKml"](this["layerManager"], _0x4e0f74["id"], _0x4e0f74["title"]);
  }
  ["_exportLayerShapefile"](_0x4de37a) {
    var _a2;
    this["_closeMenu"]();
    if (!this["layerManager"]) return;
    (_a2 = this["_layerExportMarker"]) == null ? void 0 : _a2["exportLayerShapefile"](this["layerManager"], _0x4de37a["id"], _0x4de37a["title"]);
  }
  async ["_exportLayerAsGeoTiff"](_0x59774b) {
    var _a2;
    this["_closeMenu"]();
    if (!this["layerManager"]) return;
    this["_geoTiffExportingId"] = _0x59774b["id"];
    try {
      await ((_a2 = this["_layerExportMarker"]) == null ? void 0 : _a2["exportLayerAsGeoTiff"](this["layerManager"], _0x59774b["id"], _0x59774b["title"]));
    } catch (_0x19653d) {
      console["error"]("[tucbs-layer-list] GeoTIFF export başarısız:", _0x19653d);
    } finally {
      this["_geoTiffExportingId"] = null;
    }
  }
  ["_applyReorder"](_0x3ac53a, _0x5841ca) {
    var _a2;
    const _0xf52368 = this["_layers"]["findIndex"]((_0x1e0791) => _0x1e0791["id"] === _0x3ac53a), _0x1f5dda = _0xf52368 === -1 ? void 0 : this["_layers"][_0xf52368];
    if (!_0x1f5dda) return;
    const _0x38bddb = this["_layers"]["filter"]((_0x2492fb) => _0x2492fb["id"] !== _0x3ac53a), _0x20630f = _0x5841ca ? _0x38bddb["findIndex"]((_0x33bde6) => _0x33bde6["id"] === _0x5841ca) : -1, _0x3cd4a8 = _0x20630f === -1 ? _0x38bddb["length"] : _0x20630f;
    _0x38bddb["splice"](_0x3cd4a8, 0, _0x1f5dda), this["_layers"] = _0x38bddb, _0x3cd4a8 !== _0xf52368 && ((_a2 = this["layerManager"]) == null ? void 0 : _a2["reorder"](this["_layers"]["map"]((_0x54b29e) => _0x54b29e["id"])));
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
          ${this["_layers"]["length"] === 0 ? b`<div class="layer-empty">Katman yok</div>` : c(this["_layers"], (_0x371a15) => _0x371a15["id"], (_0x58199c) => this["_renderLayerRow"](_0x58199c))}
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
  ["_renderLayerRow"](_0xd03a54) {
    var _a2;
    const _0x14f661 = _0xd03a54["opacity"] * 100, _0x4b6b84 = Math["round"](_0x14f661);
    return b`
      <div class="layer-item" data-layer-id=${_0xd03a54["id"]}>
        <div class="layer-row">
          <button
            type="button"
            class="drag-handle"
            data-tooltip="Sürükleyerek Sırala"
            aria-label="${_0xd03a54["title"]} katmanını sırala"
            @pointerdown=${(_0x4edec5) => {
      const _0x246e5a = _0x4edec5["currentTarget"], _0x279674 = _0x246e5a["closest"](".layer-item"), _0x2b33d4 = _0x279674 == null ? void 0 : _0x279674["closest"](".layer-list");
      _0x279674 instanceof HTMLElement && _0x2b33d4 instanceof HTMLElement && this["_dragReorder"]["start"](_0x4edec5, _0x279674, _0x246e5a, _0x2b33d4);
    }}
          >
            ${ICON_DRAG_HANDLE}
          </button>

          <cds-checkbox
            .checked=${_0xd03a54["visible"]}
            aria-label=${_0xd03a54["title"]}
            @cds-checkbox-changed=${(_0x385f6a) => {
      var _a3;
      const _0x1c7a8a = ((_a3 = _0x385f6a["detail"]) == null ? void 0 : _a3["checked"]) ?? !_0xd03a54["visible"];
      this["_setVisible"](_0xd03a54["id"], !!_0x1c7a8a);
    }}
          ></cds-checkbox>

          ${_0xd03a54["layerType"] !== "DRAWING" && _0xd03a54["layerType"] !== "MEASURE" ? b`
                <span
                  class="layer-color-dot"
                  style="background:${_0xd03a54["fill"]}"
                  title=${_0xd03a54["styleMode"] === "solid" ? "Katman rengi" : "Katman rengi (yalnız sabit renk modunda değiştirilebilir)"}
                >
                  <input
                    type="color"
                    .value=${toHexColor(_0xd03a54["fill"])}
                    ?disabled=${_0xd03a54["styleMode"] !== "solid"}
                    aria-label="${_0xd03a54["title"]} rengi"
                    @input=${(_0x52a4b0) => {
      this["_setLayerColor"](_0xd03a54["id"], _0x52a4b0["target"]["value"]);
    }}
                  />
                </span>
              ` : ""}
          <span class="layer-name" title=${_0xd03a54["title"]}>${_0xd03a54["title"]}</span>

          <div class="layer-actions">
            <div class="layer-options">
              <button
                type="button"
                class="options-btn"
                aria-label=${this["_geoTiffExportingId"] === _0xd03a54["id"] ? "GeoTIFF İndiriliyor…" : "Katman Seçenekleri"}
                aria-haspopup="menu"
                aria-expanded=${this["_openMenuId"] === _0xd03a54["id"]}
                ?disabled=${this["_geoTiffExportingId"] === _0xd03a54["id"]}
                @click=${(_0x4ae87) => {
      this["_hidePortalTooltip"](), this["_toggleMenu"](_0xd03a54, _0x4ae87);
    }}
                @mouseenter=${(_0x27d1b2) => this["_showPortalTooltip"](_0x27d1b2["currentTarget"], this["_geoTiffExportingId"] === _0xd03a54["id"] ? "GeoTIFF İndiriliyor…" : "Katman Seçenekleri")}
                @mouseleave=${() => this["_hidePortalTooltip"]()}
                @focus=${(_0x190926) => this["_showPortalTooltip"](_0x190926["currentTarget"], this["_geoTiffExportingId"] === _0xd03a54["id"] ? "GeoTIFF İndiriliyor…" : "Katman Seçenekleri")}
                @blur=${() => this["_hidePortalTooltip"]()}
              >
                ${this["_geoTiffExportingId"] === _0xd03a54["id"] ? b`<span class="options-btn-spinner"></span>` : ICON_OVERFLOW_MENU}
              </button>
            </div>
          </div>
        </div>

        ${_0xd03a54["layerType"] !== "DRAWING" && _0xd03a54["layerType"] !== "MEASURE" ? b`
              <div class="layer-opacity-row">
                <span class="layer-opacity-pct">%${_0x4b6b84}</span>
                <input
                  type="range"
                  class="opacity-slider"
                  min="0"
                  max="100"
                  step="0.1"
                  .value=${String(_0x14f661)}
                  style="--fill: ${_0x14f661}%"
                  @input=${(_0x35a91b) => {
      const _0x187715 = _0x35a91b["target"], _0x48a896 = Number(_0x187715["value"]);
      this["_updateOpacitySlider"](_0x187715, _0x48a896), this["_setOpacity"](_0xd03a54["id"], _0x48a896 / 100);
    }}
                />
              </div>
            ` : ""}

        ${this["_legendAvailable"] && _0xd03a54["styleMode"] !== "solid" && this["_legendOpenIds"]["has"](_0xd03a54["id"]) ? b`<tucbs-legend-panel
              layerId=${_0xd03a54["id"]}
              layerType=${_0xd03a54["layerType"]}
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
function showToast(_0x204606, _0x2854b4) {
  destroyToast();
  const _0x6c61ff = document["createElement"]("div");
  document["body"]["appendChild"](_0x6c61ff);
  const _0x5adec4 = _0x6c61ff["attachShadow"]({ "mode": "open" }), _0x2c2031 = new CSSStyleSheet();
  _0x2c2031["replaceSync"](TOAST_STYLES["cssText"]), _0x5adec4["adoptedStyleSheets"] = [_0x2c2031], activeToastEl = _0x6c61ff;
  const _0x413d9d = TOAST_TIMEOUT_MS[_0x204606];
  D(b`
      <cds-inline-notification
        kind=${_0x204606}
        hide-close-button
        timeout=${_0x413d9d}
        subtitle=${_0x2854b4}
        @cds-notification-closed=${() => destroyToast()}
      ></cds-inline-notification>
    `, _0x5adec4);
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
function dispatch(_0x2444cc) {
  document["dispatchEvent"](new CustomEvent("tucbs-busy-changed", { "detail": { "busy": refCount > 0, "message": _0x2444cc } }));
}
function beginBusy(_0x3c3279) {
  ensureOverlay(), refCount++, dispatch(_0x3c3279);
}
function endBusy() {
  refCount = Math["max"](0, refCount - 1), dispatch();
}
var __defProp$q = Object["defineProperty"], __getOwnPropDesc$r = Object["getOwnPropertyDescriptor"], __decorateClass$r = (_0x2f34c5, _0x272222, _0x9dabc9, _0x3f2acb) => {
  var _0x2f140e = _0x3f2acb > 1 ? void 0 : _0x3f2acb ? __getOwnPropDesc$r(_0x272222, _0x9dabc9) : _0x272222;
  for (var _0x2d3ee5 = _0x2f34c5["length"] - 1, _0x30afe5; _0x2d3ee5 >= 0; _0x2d3ee5--) if (_0x30afe5 = _0x2f34c5[_0x2d3ee5]) _0x2f140e = (_0x3f2acb ? _0x30afe5(_0x272222, _0x9dabc9, _0x2f140e) : _0x30afe5(_0x2f140e)) || _0x2f140e;
  if (_0x3f2acb && _0x2f140e) __defProp$q(_0x272222, _0x9dabc9, _0x2f140e);
  return _0x2f140e;
};
function carbonIcon$1(_0xd91c53) {
  return o$1(iconNodeToString(_0xd91c53));
}
const ICON_API_KEY = carbonIcon$1(_20_default$5), ICON_CLOSE$4 = carbonIcon$1(_16_default$v), ICON_LINK = carbonIcon$1(_16_default$j);
let TucbsAuthorizedLayers = class extends i$2 {
  constructor() {
    super(...arguments), this["customCss"] = "", this["_customCssState"] = { "sheet": null }, this["_authorizedLayersLoading"] = ![], this["_authorizedPickerOpen"] = ![], this["_authorizedItems"] = [], this["_authorizedSelectedKeys"] = [], this["_authorizedFetchError"] = "", this["_authorizedAddError"] = "", this["_tokenUrlDialogOpen"] = ![], this["_tokenUrlDialogValue"] = "", this["_tokenUrlDialogTitle"] = "", this["_tooltipPortalEl"] = null, this["_dialogDrag"] = new DraggablePanelController(this, { "getPanel": (_0x4950df) => {
      const _0x872d86 = _0x4950df["closest"](".authorized-dialog");
      return _0x872d86 instanceof HTMLElement ? _0x872d86 : null;
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
  ["updated"](_0xb7eb86) {
    super["updated"](_0xb7eb86);
    _0xb7eb86["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_customCssState"], "tucbs-authorized-layers");
    if (this["_authorizedPickerOpen"]) this["_syncAuthorizedListMaxHeight"]();
  }
  async ["fetchAndOpen"]() {
    if (!this["layerManager"] || this["_authorizedLayersLoading"]) return;
    this["_authorizedLayersLoading"] = !![], beginBusy("Yetkili katmanlar getiriliyor…"), this["_authorizedFetchError"] = "", this["_authorizedAddError"] = "";
    try {
      const _0x3a8e7d = await this["layerManager"]["getAuthorizedLayers"]();
      this["_authorizedItems"] = _0x3a8e7d, this["_authorizedSelectedKeys"] = [], this["_authorizedPickerOpen"] = !![], _0x3a8e7d["length"] === 0 && (this["_authorizedFetchError"] = "Bu API key için yetkili katman bulunamadı.");
    } catch (_0x54a15e) {
      _0x54a15e instanceof TucbsError && console["error"]("[tucbs-authorized-layers] " + _0x54a15e["code"] + " (" + _0x54a15e["number"] + "): " + _0x54a15e["message"]), this["_authorizedItems"] = [], this["_authorizedPickerOpen"] = !![], this["_authorizedFetchError"] = _0x54a15e instanceof Error ? _0x54a15e["message"] : "Yetkili katman listesi alınamadı.";
    } finally {
      this["_authorizedLayersLoading"] = ![], endBusy();
    }
  }
  ["closePicker"]() {
    this["_authorizedPickerOpen"] = ![], this["_authorizedAddError"] = "", this["_closeTokenUrlDialog"]();
  }
  ["_openTokenUrlDialog"](_0x3285ae) {
    var _a2;
    const _0x429aeb = (_a2 = _0x3285ae["tokenUrl"]) == null ? void 0 : _a2["trim"]();
    if (!_0x429aeb) {
      showToast("warning", "Bu katman için token URL bulunamadı.");
      return;
    }
    this["_tokenUrlDialogTitle"] = _0x3285ae["katmanAdi"] || _0x3285ae["ogcLayerName"] || "Token URL", this["_tokenUrlDialogValue"] = _0x429aeb, this["_tokenUrlDialogOpen"] = !![];
  }
  ["_closeTokenUrlDialog"]() {
    this["_tokenUrlDialogOpen"] = ![], this["_tokenUrlDialogValue"] = "", this["_tokenUrlDialogTitle"] = "";
  }
  async ["_copyTokenUrl"]() {
    const _0x4aa254 = this["_tokenUrlDialogValue"]["trim"]();
    if (!_0x4aa254) return;
    try {
      await navigator["clipboard"]["writeText"](_0x4aa254), showToast("info", "Token URL panoya kopyalandı.");
    } catch {
      showToast("error", "Panoya kopyalanamadı.");
    }
  }
  ["_authorizedKey"](_0x3fe05c) {
    return _0x3fe05c["id"] ?? _0x3fe05c["servisTuru"] + "|" + _0x3fe05c["servisUrl"] + "|" + _0x3fe05c["ogcLayerName"];
  }
  ["_authorizedCanAdd"](_0x2f5a6c) {
    var _a2;
    return ((_a2 = this["layerManager"]) == null ? void 0 : _a2["canAddAuthorizedLayer"](_0x2f5a6c)) ?? ![];
  }
  ["_toggleAuthorizedSelected"](_0x102f24, _0xd9eadb) {
    this["_authorizedSelectedKeys"] = _0xd9eadb ? [...this["_authorizedSelectedKeys"], _0x102f24] : this["_authorizedSelectedKeys"]["filter"]((_0x57881b) => _0x57881b !== _0x102f24);
  }
  async ["_addSelectedAuthorizedLayers"]() {
    if (!this["layerManager"]) {
      this["_authorizedAddError"] = "Harita hazır değil, katman eklenemedi.";
      return;
    }
    const _0x5d757a = this["_authorizedItems"]["filter"]((_0x4b3556) => {
      const _0x3ad487 = this["_authorizedKey"](_0x4b3556);
      return this["_authorizedSelectedKeys"]["includes"](_0x3ad487) && this["_authorizedCanAdd"](_0x4b3556);
    });
    if (_0x5d757a["length"] === 0) return;
    beginBusy("Katmanlar ekleniyor…"), this["_authorizedAddError"] = "";
    const _0x4bdc37 = [];
    for (const _0x548729 of _0x5d757a) {
      try {
        await this["layerManager"]["addAuthorizedLayer"](_0x548729);
      } catch {
        _0x4bdc37["push"](_0x548729["katmanAdi"] || _0x548729["ogcLayerName"]);
      }
    }
    this["_authorizedSelectedKeys"] = _0x4bdc37["length"] === 0 ? [] : _0x5d757a["filter"]((_0x49e945) => _0x4bdc37["includes"](_0x49e945["katmanAdi"] || _0x49e945["ogcLayerName"]))["map"]((_0x3b10f3) => this["_authorizedKey"](_0x3b10f3)), endBusy(), _0x4bdc37["length"] === 0 ? this["closePicker"]() : this["_authorizedAddError"] = _0x4bdc37["length"] + "/" + _0x5d757a["length"] + " katman eklenemedi: " + _0x4bdc37["join"](", ");
  }
  ["_authorizedAddButtonLabel"]() {
    const _0x5a4348 = this["_authorizedSelectedKeys"]["filter"]((_0xbb4bbb) => {
      const _0x3fc13a = this["_authorizedItems"]["find"]((_0x31f64b) => this["_authorizedKey"](_0x31f64b) === _0xbb4bbb);
      return _0x3fc13a && this["_authorizedCanAdd"](_0x3fc13a);
    })["length"];
    if (_0x5a4348 > 1) return "Haritaya Ekle (" + _0x5a4348 + ")";
    return "Haritaya Ekle";
  }
  ["_syncAuthorizedListMaxHeight"]() {
    var _a2;
    const _0x2406ed = (_a2 = this["shadowRoot"]) == null ? void 0 : _a2["querySelector"](".authorized-list");
    if (!_0x2406ed) return;
    const _0x36d279 = Array["from"](_0x2406ed["querySelectorAll"](".authorized-row")), _0x297e7c = TucbsAuthorizedLayers["AUTHORIZED_VISIBLE_ROWS"];
    if (_0x36d279["length"] <= _0x297e7c) {
      _0x2406ed["style"]["maxHeight"] = "";
      return;
    }
    const _0x5d008e = _0x36d279[_0x297e7c - 1];
    if (!_0x5d008e) return;
    const _0x156165 = _0x2406ed["getBoundingClientRect"]()["top"], _0x150c75 = _0x5d008e["getBoundingClientRect"]()["bottom"], _0x2a37ae = _0x150c75 - _0x156165;
    _0x2406ed["style"]["maxHeight"] = _0x2a37ae + "px";
  }
  ["_showPortalTooltip"](_0x1c71fb, _0x4ce6d1) {
    if (!this["_tooltipPortalEl"]) return;
    const _0x39d9e1 = _0x1c71fb["getBoundingClientRect"]();
    this["_tooltipPortalEl"]["text"] = _0x4ce6d1, this["_tooltipPortalEl"]["x"] = _0x39d9e1["left"], this["_tooltipPortalEl"]["y"] = _0x39d9e1["bottom"] + 6, this["_tooltipPortalEl"]["open"] = !![];
  }
  ["_hidePortalTooltip"]() {
    if (this["_tooltipPortalEl"]) this["_tooltipPortalEl"]["open"] = ![];
  }
  ["render"]() {
    if (!this["_authorizedPickerOpen"]) return A;
    return this["_renderAuthorizedPicker"]();
  }
  ["_renderAuthorizedPicker"]() {
    const _0x43a337 = this["_authorizedSelectedKeys"]["filter"]((_0x1a4509) => {
      const _0x45f4ca = this["_authorizedItems"]["find"]((_0x188c52) => this["_authorizedKey"](_0x188c52) === _0x1a4509);
      return _0x45f4ca && this["_authorizedCanAdd"](_0x45f4ca);
    })["length"];
    return b`
      <div
        class="authorized-dialog"
        role="dialog"
        aria-label="Yetkili katmanlar"
      >
        <div
          class="authorized-dialog-header"
          @pointerdown=${(_0x1c2e19) => this["_dialogDrag"]["start"](_0x1c2e19)}
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
                  ${this["_authorizedItems"]["map"]((_0x4e90a3) => {
      var _a2, _b;
      const _0x5165f8 = this["_authorizedKey"](_0x4e90a3), _0x18d6d3 = this["_authorizedCanAdd"](_0x4e90a3), _0x3b4b12 = _0x4e90a3["katmanAdi"] || _0x4e90a3["ogcLayerName"], _0x1f2ce3 = [_0x4e90a3["servisTuru"], _0x4e90a3["ogcLayerName"] !== _0x3b4b12 ? _0x4e90a3["ogcLayerName"] : "", _0x4e90a3["ustKurumAdi"]]["filter"](Boolean), _0x421692 = !_0x18d6d3 && ((_a2 = _0x4e90a3["servisTuru"]) == null ? void 0 : _a2["toUpperCase"]()) === "WMTS" && !_0x4e90a3["wmtsTileMatrixSet"] ? " (TileMatrixSet eksik)" : !_0x18d6d3 ? " (eksik bilgi)" : "";
      return b`
                      <div
                        class="authorized-row ${_0x18d6d3 ? "" : "authorized-row--disabled"}"
                      >
                        <div class="authorized-row-main">
                          <cds-checkbox
                            title=${_0x3b4b12}
                            ?disabled=${!_0x18d6d3}
                            .checked=${this["_authorizedSelectedKeys"]["includes"](_0x5165f8)}
                            @cds-checkbox-changed=${(_0x4bcf63) => {
        var _a3;
        if (!_0x18d6d3) return;
        this["_toggleAuthorizedSelected"](_0x5165f8, !!((_a3 = _0x4bcf63["detail"]) == null ? void 0 : _a3["checked"]));
      }}
                          >
                            ${_0x3b4b12}${_0x421692}
                          </cds-checkbox>
                          <button
                            type="button"
                            class="authorized-token-btn"
                            aria-label="URL Göster"
                            ?disabled=${!((_b = _0x4e90a3["tokenUrl"]) == null ? void 0 : _b["trim"]())}
                            @click=${(_0x52e642) => {
        _0x52e642["stopPropagation"](), this["_hidePortalTooltip"](), this["_openTokenUrlDialog"](_0x4e90a3);
      }}
                            @mouseenter=${(_0x32ce44) => this["_showPortalTooltip"](_0x32ce44["currentTarget"], "URL Göster")}
                            @mouseleave=${() => this["_hidePortalTooltip"]()}
                            @focus=${(_0x58fc90) => this["_showPortalTooltip"](_0x58fc90["currentTarget"], "URL Göster")}
                            @blur=${() => this["_hidePortalTooltip"]()}
                          >
                            ${ICON_LINK}
                          </button>
                        </div>
                        <div class="authorized-meta">
                          ${_0x1f2ce3["join"](" · ")}
                        </div>
                      </div>
                    `;
    })}
                </div>
                <div class="authorized-add-error">${this["_authorizedAddError"]}</div>
                <button
                  type="button"
                  class="authorized-add-btn"
                  ?disabled=${_0x43a337 === 0}
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
const a = Symbol["for"](""), o = (_0x1c4fb7) => {
  if ((_0x1c4fb7 == null ? void 0 : _0x1c4fb7["r"]) === a) return _0x1c4fb7 == null ? void 0 : _0x1c4fb7["_$litStatic$"];
}, s = (_0x166332) => ({ "_$litStatic$": _0x166332, "r": a }), l = /* @__PURE__ */ new Map(), n2 = (_0x26709f) => (_0x549636, ..._0x4c25c1) => {
  const _0x2d82a0 = _0x4c25c1["length"];
  let _0x3de794, _0x144205;
  const _0x41bf13 = [], _0x131ef1 = [];
  let _0x29e1b8, _0xbedae4 = 0, _0x41ef44 = ![];
  for (; _0xbedae4 < _0x2d82a0; ) {
    for (_0x29e1b8 = _0x549636[_0xbedae4]; _0xbedae4 < _0x2d82a0 && void 0 !== (_0x144205 = _0x4c25c1[_0xbedae4], _0x3de794 = o(_0x144205)); ) _0x29e1b8 += _0x3de794 + _0x549636[++_0xbedae4], _0x41ef44 = !![];
    _0xbedae4 !== _0x2d82a0 && _0x131ef1["push"](_0x144205), _0x41bf13["push"](_0x29e1b8), _0xbedae4++;
  }
  if (_0xbedae4 === _0x2d82a0 && _0x41bf13["push"](_0x549636[_0x2d82a0]), _0x41ef44) {
    const _0x22d593 = _0x41bf13["join"]("$$lit$$");
    void 0 === (_0x549636 = l["get"](_0x22d593)) && (_0x41bf13["raw"] = _0x41bf13, l["set"](_0x22d593, _0x549636 = _0x41bf13)), _0x4c25c1 = _0x131ef1;
  }
  return _0x26709f(_0x549636, ..._0x4c25c1);
}, u = n2(b);
var __defProp$p = Object["defineProperty"], __getOwnPropDesc$q = Object["getOwnPropertyDescriptor"], __decorateClass$q = (_0x3f2fda, _0x52db79, _0x5cd835, _0x195d38) => {
  var _0x31fa8f = _0x195d38 > 1 ? void 0 : _0x195d38 ? __getOwnPropDesc$q(_0x52db79, _0x5cd835) : _0x52db79;
  for (var _0x31da59 = _0x3f2fda["length"] - 1, _0x31ccd; _0x31da59 >= 0; _0x31da59--) if (_0x31ccd = _0x3f2fda[_0x31da59]) _0x31fa8f = (_0x195d38 ? _0x31ccd(_0x52db79, _0x5cd835, _0x31fa8f) : _0x31ccd(_0x31fa8f)) || _0x31fa8f;
  if (_0x195d38 && _0x31fa8f) __defProp$p(_0x52db79, _0x5cd835, _0x31fa8f);
  return _0x31fa8f;
};
const MIN_ZOOM_LIMIT_TOLERANCE = 1.1, ICON_ZOOM_IN$1 = o$1(iconNodeToString(_16_default$1)), ICON_ZOOM_OUT = o$1(iconNodeToString(_16_default)), ICON_DEFAULT_EXTENT = o$1(iconNodeToString(_16_default$n));
let TucbsZoomTool = class extends i$2 {
  constructor() {
    super(...arguments), this["mapElementId"] = "", this["customCss"] = "", this["_customCssState"] = { "sheet": null }, this["_atMaxZoom"] = ![], this["_atMinZoom"] = ![];
  }
  ["updated"](_0x50c840) {
    if (_0x50c840["has"]("map")) this["_watchZoomLimits"]();
    _0x50c840["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_customCssState"], "tucbs-zoom-tool");
  }
  ["firstUpdated"]() {
    bindMapByElementId(this, { "noIdTiming": "raf", ...standardMapBindingMessages("tucbs-zoom-tool", "islevsiz") });
  }
  ["_watchZoomLimits"]() {
    var _a2, _b;
    (_a2 = this["_unsubscribeZoomLimits"]) == null ? void 0 : _a2.call(this), this["_unsubscribeZoomLimits"] = void 0;
    const _0x7a83c2 = (_b = this["map"]) == null ? void 0 : _b["viewer"];
    if (!_0x7a83c2) return;
    const _0x59adf1 = _0x7a83c2["scene"]["screenSpaceCameraController"], _0x2788af = () => {
      const _0x4d6cc4 = _0x7a83c2["camera"]["positionCartographic"]["height"];
      this["_atMaxZoom"] = _0x4d6cc4 >= _0x59adf1["maximumZoomDistance"] * 0.999, this["_atMinZoom"] = _0x4d6cc4 <= _0x59adf1["minimumZoomDistance"] * MIN_ZOOM_LIMIT_TOLERANCE;
    };
    _0x2788af(), this["_unsubscribeZoomLimits"] = _0x7a83c2["scene"]["postRender"]["addEventListener"](_0x2788af);
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
var __defProp$o = Object["defineProperty"], __getOwnPropDesc$p = Object["getOwnPropertyDescriptor"], __decorateClass$p = (_0x28808b, _0x47010c, _0x641385, _0x36c853) => {
  var _0x39928e = _0x36c853 > 1 ? void 0 : _0x36c853 ? __getOwnPropDesc$p(_0x47010c, _0x641385) : _0x47010c;
  for (var _0x8c7091 = _0x28808b["length"] - 1, _0x10c900; _0x8c7091 >= 0; _0x8c7091--) if (_0x10c900 = _0x28808b[_0x8c7091]) _0x39928e = (_0x36c853 ? _0x10c900(_0x47010c, _0x641385, _0x39928e) : _0x10c900(_0x39928e)) || _0x39928e;
  if (_0x36c853 && _0x39928e) __defProp$o(_0x47010c, _0x641385, _0x39928e);
  return _0x39928e;
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
    const _0x2c255b = document["createElement"]("tucbs-slide-over-panel");
    _0x2c255b["panelTitle"] = "Koordinata Git", _0x2c255b["panelWidth"] = this["panelWidth"], _0x2c255b["onCloseRequest"] = () => this["_close"](), document["body"]["appendChild"](_0x2c255b), this["_panelEl"] = _0x2c255b, this["_renderIntoPanel"]();
  }
  ["disconnectedCallback"]() {
    var _a2, _b;
    if (this["map"]) this["_layoutController"]["unbindMap"](this["map"]);
    (_a2 = this["map"]) == null ? void 0 : _a2["clearMarker"](), (_b = this["_panelEl"]) == null ? void 0 : _b["remove"](), this["_panelEl"] = null, super["disconnectedCallback"]();
  }
  ["firstUpdated"]() {
    bindMapByElementId(this, { "noIdTiming": "raf", ...standardMapBindingMessages("tucbs-goto-coordinate", "islevsiz") });
  }
  ["updated"](_0x34e112) {
    _0x34e112["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_customCssState"], "tucbs-goto-coordinate");
    if (_0x34e112["has"]("map")) {
      const _0x5b42a0 = _0x34e112["get"]("map");
      if (_0x5b42a0) this["_layoutController"]["unbindMap"](_0x5b42a0);
      if (this["map"]) this["_layoutController"]["bindMap"](this["map"]);
    }
    _0x34e112["has"]("panelWidth") && this["_open"] && this["_layoutController"]["setOpen"](!![], this["panelWidth"]);
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
  ["_isValid"](_0x450297, _0x3eaa6b) {
    return Number["isFinite"](_0x450297) && _0x450297 >= -90 && _0x450297 <= 90 && Number["isFinite"](_0x3eaa6b) && _0x3eaa6b >= -180 && _0x3eaa6b <= 180;
  }
  static ["_sanitizeCoordinateInput"](_0x2f8dd1) {
    const _0x375631 = _0x2f8dd1["trimStart"]()["startsWith"]("-"), _0x3a5673 = _0x2f8dd1["replace"](/[^0-9.,]/g, ""), _0x4f70ce = _0x3a5673["search"](/[.,]/), _0x1ebfa2 = _0x4f70ce === -1 ? _0x3a5673 : _0x3a5673["slice"](0, _0x4f70ce + 1) + _0x3a5673["slice"](_0x4f70ce + 1)["replaceAll"](/[.,]/g, "");
    return (_0x375631 ? "-" : "") + _0x1ebfa2;
  }
  static ["_parseCoordinate"](_0x274ba6) {
    return _0x274ba6["trim"]() === "" ? Number["NaN"] : Number(_0x274ba6["replace"](",", "."));
  }
  ["_handleCoordInput"](_0x3a1bd2, _0x35b476) {
    const _0xdad6a6 = _0x3a1bd2["target"], _0x31f184 = TucbsGoToCoordinate["_sanitizeCoordinateInput"](_0xdad6a6["value"]);
    if (_0xdad6a6["value"] !== _0x31f184) _0xdad6a6["value"] = _0x31f184;
    if (_0x35b476 === "lat") this["_lat"] = _0x31f184;
    else this["_lon"] = _0x31f184;
  }
  ["_handleKeydown"](_0x21916b) {
    if (_0x21916b["key"] === "Enter") this["_submit"]();
  }
  ["_submit"]() {
    const _0x2ec034 = TucbsGoToCoordinate["_parseCoordinate"](this["_lat"]), _0x39cf65 = TucbsGoToCoordinate["_parseCoordinate"](this["_lon"]);
    if (!this["_isValid"](_0x2ec034, _0x39cf65) || !this["map"]) return;
    this["map"]["dropMarker"](_0x39cf65, _0x2ec034, GOTO_COORDINATE_PIN_URL, GOTO_COORDINATE_PIN_OPTIONS), this["map"]["interactionManager"]["flyToPosition"](_0x39cf65, _0x2ec034, { "height": 1e3, "duration": 1.5 });
  }
  ["_renderIntoPanel"]() {
    if (!this["_panelEl"]) return;
    this["_panelEl"]["open"] = this["_open"];
    const _0x3e1fa4 = TucbsGoToCoordinate["_parseCoordinate"](this["_lat"]), _0x1d7d71 = TucbsGoToCoordinate["_parseCoordinate"](this["_lon"]), _0x3e1934 = this["_isValid"](_0x3e1fa4, _0x1d7d71), _0x9ecc27 = (this["_lat"] !== "" || this["_lon"] !== "") && !_0x3e1934;
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
              @input=${(_0x5634b6) => this["_handleCoordInput"](_0x5634b6, "lat")}
              @keydown=${(_0x25b936) => this["_handleKeydown"](_0x25b936)}
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
              @input=${(_0xc74c41) => this["_handleCoordInput"](_0xc74c41, "lon")}
              @keydown=${(_0x105bee) => this["_handleKeydown"](_0x105bee)}
            ></cds-text-input>
          </div>
          ${_0x9ecc27 ? b`<span class="tucbs-goto-error">Enlem -90..90, Boylam -180..180 aralığında olmalı</span>` : ""}
          <button type="button" class="tucbs-goto-submit" ?disabled=${!_0x3e1934} @click=${() => this["_submit"]()}>
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
function showGuide(_0x10792b, _0x2f10b8) {
  hideGuide();
  const _0x4926cb = document["createElement"]("div");
  document["body"]["appendChild"](_0x4926cb);
  const _0x39f1bb = _0x4926cb["attachShadow"]({ "mode": "open" }), _0x5b62d0 = new CSSStyleSheet();
  _0x5b62d0["replaceSync"](GUIDE_STYLES["cssText"]), _0x39f1bb["adoptedStyleSheets"] = [_0x5b62d0], activeGuideEl = _0x4926cb, D(b`
      <cds-inline-notification kind="info" role="status" hide-close-button low-contrast>
        <div slot="subtitle">
          <p class="guide-title">${_0x10792b}</p>
          <ul>
            ${_0x2f10b8["map"]((_0x4bf4ba) => b`<li>${_0x4bf4ba}</li>`)}
          </ul>
        </div>
      </cds-inline-notification>
    `, _0x39f1bb);
}
function hideGuide() {
  activeGuideEl == null ? void 0 : activeGuideEl["remove"](), activeGuideEl = null;
}
const EXIT = "Araçtan çıkmak için sağ tıklayın.", ADD_POINT = "Haritaya sol tıklayarak nokta ekleyin.", CANCEL_DRAWING = "Çizimi Esc ile iptal edin.", FINISH_MULTI = "Çizimi çift tıklayarak bitirin.", FINISH_MEASURE = "Ölçümü çift tıklayarak bitirin.", CANCEL_MEASURE = "Ölçümü Esc ile iptal edin.", DRAW_GUIDES = { "point": { "title": "Nokta Çiz", "steps": ["Nokta eklemek için haritaya sol tıklayın.", EXIT] }, "polyline": { "title": "Çizgi Çiz", "steps": [ADD_POINT, FINISH_MULTI, CANCEL_DRAWING, EXIT] }, "polygon": { "title": "Alan Çiz", "steps": [ADD_POINT, FINISH_MULTI, CANCEL_DRAWING, EXIT] }, "rectangle": { "title": "Dikdörtgen Çiz", "steps": ["Bir köşeye sol tıklayın.", "Karşı köşeye sol tıklayarak bitirin.", CANCEL_DRAWING, EXIT] }, "circle": { "title": "Daire Çiz", "steps": ["Merkeze sol tıklayın.", "Yarıçap noktasına sol tıklayarak bitirin.", CANCEL_DRAWING, EXIT] }, "freehand": { "title": "Serbest Çizim", "steps": ["Sol tuşa basılı tutarak çizin, bırakınca bitirin.", CANCEL_DRAWING, EXIT] } }, MEASURE_GUIDES = { "polyline": { "title": "Mesafe Ölç", "steps": [ADD_POINT, FINISH_MEASURE, CANCEL_MEASURE, EXIT] }, "polygon": { "title": "Alan Ölç", "steps": [ADD_POINT, FINISH_MEASURE, CANCEL_MEASURE, EXIT] } };
function drawGuide(_0x1838eb, _0x2ff44c) {
  if (_0x2ff44c === "measure") return MEASURE_GUIDES[_0x1838eb] ?? DRAW_GUIDES[_0x1838eb];
  return DRAW_GUIDES[_0x1838eb];
}
var __defProp$n = Object["defineProperty"], __getOwnPropDesc$o = Object["getOwnPropertyDescriptor"], __decorateClass$o = (_0x43df00, _0x3bac13, _0xc5b8ee, _0x1ab26a) => {
  var _0xd4146e = _0x1ab26a > 1 ? void 0 : _0x1ab26a ? __getOwnPropDesc$o(_0x3bac13, _0xc5b8ee) : _0x3bac13;
  for (var _0x582f0d = _0x43df00["length"] - 1, _0x5403f5; _0x582f0d >= 0; _0x582f0d--) if (_0x5403f5 = _0x43df00[_0x582f0d]) _0xd4146e = (_0x1ab26a ? _0x5403f5(_0x3bac13, _0xc5b8ee, _0xd4146e) : _0x5403f5(_0xd4146e)) || _0xd4146e;
  if (_0x1ab26a && _0xd4146e) __defProp$n(_0x3bac13, _0xc5b8ee, _0xd4146e);
  return _0xd4146e;
};
const TOOL_ICON_NODES = { "point": _16_default$q, "polyline": _16_default$z, "polygon": _16_default$m, "rectangle": _16_default$7, "circle": _16_default$w, "freehand": _16_default$e }, MAIN_ICON$1 = o$1(iconNodeToString(_16_default$8)), iconCache$1 = /* @__PURE__ */ new Map();
function iconFor$1(_0x561b1e) {
  const _0xbd8ecc = iconCache$1["get"](_0x561b1e);
  if (_0xbd8ecc) return _0xbd8ecc;
  const _0x19a252 = TOOL_ICON_NODES[_0x561b1e], _0x4e04da = _0x19a252 ? o$1(iconNodeToString(_0x19a252)) : o$1("");
  return iconCache$1["set"](_0x561b1e, _0x4e04da), _0x4e04da;
}
let TucbsDrawTool = class extends i$2 {
  constructor() {
    super(...arguments), this["mapElementId"] = "", this["tools"] = "point,polyline,polygon", this["customCss"] = "", this["_activeTool"] = null, this["_flyoutOpen"] = ![], this["_customCssState"] = { "sheet": null }, this["_onDrawStart"] = ({ tool: _0x323b49, source: _0x3d7de3 }) => {
      this["_activeTool"] = _0x3d7de3 === "draw" && this["_toolIds"]()["includes"](_0x323b49) ? _0x323b49 : null;
      if (_0x3d7de3 === "draw") {
        const { title: _0x4ea3e2, steps: _0x2bf9ac } = drawGuide(_0x323b49, "draw");
        showGuide(_0x4ea3e2, _0x2bf9ac);
      }
      this["_flyoutOpen"] = ![];
    }, this["_onDrawCancel"] = () => {
      this["_activeTool"] = null, hideGuide();
    };
  }
  ["_toolIds"]() {
    return this["tools"]["split"](",")["map"]((_0x366ba2) => _0x366ba2["trim"]())["filter"](Boolean);
  }
  ["disconnectedCallback"]() {
    if (this["map"]) this["_unbindDrawingManager"](this["map"]["drawingManager"]);
    if (this["_activeTool"] !== null) hideGuide();
    super["disconnectedCallback"]();
  }
  ["updated"](_0x19fd6a) {
    _0x19fd6a["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_customCssState"], "tucbs-draw-tool");
    if (_0x19fd6a["has"]("map")) {
      const _0x330fdd = _0x19fd6a["get"]("map");
      if (_0x330fdd) this["_unbindDrawingManager"](_0x330fdd["drawingManager"]);
      if (this["map"]) this["_bindDrawingManager"](this["map"]["drawingManager"]);
    }
  }
  ["_bindDrawingManager"](_0x522525) {
    _0x522525["on"]("draw:start", this["_onDrawStart"]), _0x522525["on"]("draw:cancel", this["_onDrawCancel"]);
  }
  ["_unbindDrawingManager"](_0x51aa16) {
    _0x51aa16["off"]("draw:start", this["_onDrawStart"]), _0x51aa16["off"]("draw:cancel", this["_onDrawCancel"]);
  }
  ["firstUpdated"]() {
    bindMapByElementId(this, { "noIdTiming": "raf", ...standardMapBindingMessages("tucbs-draw-tool", "islevsiz") });
  }
  ["_onMainButtonClick"]() {
    this["_flyoutOpen"] = !this["_flyoutOpen"];
  }
  ["_selectTool"](_0x23c0c6) {
    var _a2;
    const _0x13373f = (_a2 = this["map"]) == null ? void 0 : _a2["drawingManager"];
    if (!_0x13373f) return;
    this["_activeTool"] === _0x23c0c6 ? _0x13373f["deactivate"]() : _0x13373f["activate"](_0x23c0c6, "draw"), this["_flyoutOpen"] = ![];
  }
  ["render"]() {
    const _0x5b94c1 = this["_activeTool"] !== null ? iconFor$1(this["_activeTool"]) : MAIN_ICON$1, _0x5b1244 = this["_activeTool"] !== null ? drawGuide(this["_activeTool"], "draw")["title"] : "Çizim";
    return b`
      <div class="draw-tool">
        ${this["_flyoutOpen"] ? b`
              <div class="flyout">
                ${this["_toolIds"]()["map"]((_0xaed5ad) => b`
                    <button
                      class="tool-button ${_0xaed5ad === this["_activeTool"] ? "active" : ""}"
                      type="button"
                      aria-label=${drawGuide(_0xaed5ad, "draw")["title"]}
                      data-tooltip=${drawGuide(_0xaed5ad, "draw")["title"]}
                      @click=${() => this["_selectTool"](_0xaed5ad)}
                    >
                      ${iconFor$1(_0xaed5ad)}
                    </button>
                  `)}
              </div>
            ` : null}
        <button
          class="tool-button main-button ${this["_activeTool"] !== null ? "active" : ""}"
          type="button"
          aria-label=${_0x5b1244}
          data-tooltip=${_0x5b1244}
          @click=${this["_onMainButtonClick"]}
        >
          ${_0x5b94c1}
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
var __defProp$m = Object["defineProperty"], __getOwnPropDesc$n = Object["getOwnPropertyDescriptor"], __decorateClass$n = (_0x5bf74b, _0x49053e, _0x5d4a69, _0x4a3bdc) => {
  var _0x27d449 = _0x4a3bdc > 1 ? void 0 : _0x4a3bdc ? __getOwnPropDesc$n(_0x49053e, _0x5d4a69) : _0x49053e;
  for (var _0x179390 = _0x5bf74b["length"] - 1, _0x2276d0; _0x179390 >= 0; _0x179390--) if (_0x2276d0 = _0x5bf74b[_0x179390]) _0x27d449 = (_0x4a3bdc ? _0x2276d0(_0x49053e, _0x5d4a69, _0x27d449) : _0x2276d0(_0x27d449)) || _0x27d449;
  if (_0x4a3bdc && _0x27d449) __defProp$m(_0x49053e, _0x5d4a69, _0x27d449);
  return _0x27d449;
};
const ICON_TRASH_CAN = o$1(iconNodeToString(_16_default$6));
let TucbsDeleteTool = class extends i$2 {
  constructor() {
    super(...arguments), this["mapElementId"] = "", this["customCss"] = "", this["_confirming"] = ![], this["_customCssState"] = { "sheet": null };
  }
  ["updated"](_0x142ae3) {
    _0x142ae3["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_customCssState"], "tucbs-delete-tool");
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
    const _0x2df4e7 = (_a2 = this["map"]) == null ? void 0 : _a2["drawingManager"];
    this["_confirming"] = ![];
    if (!_0x2df4e7) return;
    if (_0x2df4e7["isActive"]()) _0x2df4e7["deactivate"]();
    _0x2df4e7["clearAll"]();
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
function metersToReadable(_0x2be514) {
  if (!isFinite(_0x2be514)) return "-";
  return _0x2be514 < 1e3 ? _0x2be514["toFixed"](2) + " m" : (_0x2be514 / 1e3)["toFixed"](2) + " km";
}
function sqmToReadable(_0xc064cb) {
  if (!isFinite(_0xc064cb)) return "-";
  return _0xc064cb < 1e6 ? _0xc064cb["toFixed"](2) + " m²" : (_0xc064cb / 1e6)["toFixed"](2) + " km²";
}
var __defProp$l = Object["defineProperty"], __getOwnPropDesc$m = Object["getOwnPropertyDescriptor"], __decorateClass$m = (_0x374163, _0x3bb500, _0x2b466f, _0x55da2d) => {
  var _0x3ef2ee = _0x55da2d > 1 ? void 0 : _0x55da2d ? __getOwnPropDesc$m(_0x3bb500, _0x2b466f) : _0x3bb500;
  for (var _0x5eab18 = _0x374163["length"] - 1, _0x55e197; _0x5eab18 >= 0; _0x5eab18--) if (_0x55e197 = _0x374163[_0x5eab18]) _0x3ef2ee = (_0x55da2d ? _0x55e197(_0x3bb500, _0x2b466f, _0x3ef2ee) : _0x55e197(_0x3ef2ee)) || _0x3ef2ee;
  if (_0x55da2d && _0x3ef2ee) __defProp$l(_0x3bb500, _0x2b466f, _0x3ef2ee);
  return _0x3ef2ee;
};
const MODE_TOOL = { "distance": "polyline", "area": "polygon" }, MODE_ICON_NODES = { "distance": _16_default$b, "area": _16_default$A };
function modeLabel(_0xf7a1b4) {
  return drawGuide(MODE_TOOL[_0xf7a1b4], "measure")["title"];
}
const MAIN_ICON = o$1(iconNodeToString(_16_default$a)), iconCache = /* @__PURE__ */ new Map();
function iconFor(_0x2209b9) {
  const _0x71a9f7 = iconCache["get"](_0x2209b9);
  if (_0x71a9f7) return _0x71a9f7;
  const _0x5be2e2 = o$1(iconNodeToString(MODE_ICON_NODES[_0x2209b9]));
  return iconCache["set"](_0x2209b9, _0x5be2e2), _0x5be2e2;
}
const EARTH_RADIUS_METERS = 6378137;
function projectMeters(_0x5139a7, _0x12478f) {
  const _0x4ebc75 = _0x30289b["toRadians"](_0x5139a7[0]) * Math["cos"](_0x30289b["toRadians"](_0x12478f)) * EARTH_RADIUS_METERS, _0x24715d = _0x30289b["toRadians"](_0x5139a7[1]) * EARTH_RADIUS_METERS;
  return [_0x4ebc75, _0x24715d];
}
function polygonAreaMeters(_0x343f01) {
  if (_0x343f01["length"] < 3) return 0;
  const _0x21a260 = _0x343f01[0];
  if (_0x21a260 === void 0) return 0;
  const _0x3476a0 = _0x21a260[1], _0x50fd59 = _0x343f01["map"]((_0x11c361) => projectMeters(_0x11c361, _0x3476a0));
  let _0x3726d2 = 0;
  for (let _0x33cb6a = 0; _0x33cb6a < _0x50fd59["length"]; _0x33cb6a++) {
    const _0x237983 = _0x50fd59[_0x33cb6a], _0x61488 = _0x50fd59[(_0x33cb6a + 1) % _0x50fd59["length"]];
    if (_0x237983 === void 0 || _0x61488 === void 0) continue;
    _0x3726d2 += _0x237983[0] * _0x61488[1] - _0x61488[0] * _0x237983[1];
  }
  return Math["abs"](_0x3726d2) / 2;
}
function toCartesian(_0x4507d5) {
  return Cartesian3["fromDegrees"](_0x4507d5[0], _0x4507d5[1]);
}
function centroidOf(_0x491733) {
  let _0xbe9de9 = 0, _0x5aee6d = 0, _0x20c981 = 0;
  for (const _0x4f1465 of _0x491733) {
    const _0x1542cc = toCartesian(_0x4f1465);
    _0xbe9de9 += _0x1542cc["x"], _0x5aee6d += _0x1542cc["y"], _0x20c981 += _0x1542cc["z"];
  }
  const _0x126dd3 = _0x491733["length"] || 1;
  return new Cartesian3(_0xbe9de9 / _0x126dd3, _0x5aee6d / _0x126dd3, _0x20c981 / _0x126dd3);
}
function perimeterMeters(_0x2d961c) {
  if (_0x2d961c["length"] < 2) return 0;
  const _0x3e9007 = _0x2d961c["map"](toCartesian);
  let _0x117f93 = 0;
  for (let _0x1b0124 = 0; _0x1b0124 < _0x3e9007["length"] - 1; _0x1b0124++) {
    _0x117f93 += Cartesian3["distance"](_0x3e9007[_0x1b0124], _0x3e9007[_0x1b0124 + 1]);
  }
  return _0x3e9007["length"] >= 3 && (_0x117f93 += Cartesian3["distance"](_0x3e9007[_0x3e9007["length"] - 1], _0x3e9007[0])), _0x117f93;
}
const LABEL_FONT = "13px sans-serif", SEGMENT_LABEL_BG = Color["BLACK"]["withAlpha"](0.5), AREA_LABEL_BG = Color["BLACK"]["withAlpha"](0.45), TOTAL_LABEL_BG = Color["fromCssColorString"]("#1d4ed8")["withAlpha"](0.8), HIDDEN_POS = Cartesian3["fromDegrees"](0, 0, -1);
let TucbsMeasureTool = class extends i$2 {
  constructor() {
    super(...arguments), this["mapElementId"] = "", this["customCss"] = "", this["_activeMode"] = null, this["_flyoutOpen"] = ![], this["_customCssState"] = { "sheet": null }, this["_committedCoords"] = [], this["_pendingLabels"] = [], this["_shapeLabels"] = /* @__PURE__ */ new Map(), this["_claimingActivation"] = ![], this["_isSessionOwner"] = ![], this["_onDrawStart"] = ({ tool: _0x1fed59, source: _0x2f55f3 }) => {
      if (_0x2f55f3 !== "measure") {
        this["_activeMode"] = null, this["_isSessionOwner"] = ![];
        return;
      }
      this["_activeMode"] = _0x1fed59 === "polyline" ? "distance" : "area", this["_flyoutOpen"] = ![];
      const { title: _0xdb4731, steps: _0x1ba0b0 } = drawGuide(_0x1fed59, "measure");
      showGuide(_0xdb4731, _0x1ba0b0), this["_isSessionOwner"] = this["_claimingActivation"], this["_claimingActivation"] = ![], this["_isSessionOwner"] && (this["_committedCoords"] = [], this["_livePreviewCoord"] = void 0, this["_pendingLabels"] = [], this["_ensureLiveLabels"]());
    }, this["_onDrawCancel"] = () => {
      this["_isSessionOwner"] && (this["_removeLiveLabels"](), this["_removePendingLabels"]()), this["_activeMode"] = null, this["_isSessionOwner"] = ![], hideGuide();
    }, this["_onAbort"] = () => {
      if (!this["_isSessionOwner"]) return;
      this["_removePendingLabels"]();
    }, this["_onVertex"] = ({ coordinates: _0x38a172 }) => {
      if (!this["_isSessionOwner"]) return;
      const _0x186971 = this["_committedCoords"][this["_committedCoords"]["length"] - 1];
      this["_committedCoords"]["push"](_0x38a172), _0x186971 !== void 0 && this["_pendingLabels"]["push"](this["_addStaticSegmentLabel"](_0x186971, _0x38a172));
    }, this["_onMove"] = ({ coordinates: _0x6335b8 }) => {
      if (!this["_isSessionOwner"]) return;
      this["_livePreviewCoord"] = _0x6335b8;
    }, this["_onComplete"] = ({ shape: _0x8f51f8 }) => {
      if (!this["_isSessionOwner"]) return;
      while (this["_committedCoords"]["length"] > _0x8f51f8["coordinates"]["length"]) {
        this["_committedCoords"]["pop"]();
        const _0x23afaa = this["_pendingLabels"]["pop"]();
        if (_0x23afaa) this["_removeEntity"](_0x23afaa);
      }
      if (this["_activeMode"] === "distance" && _0x8f51f8["length"] !== void 0) this["_pendingLabels"]["push"](this["_addTotalDistanceLabel"](_0x8f51f8));
      else this["_activeMode"] === "area" && _0x8f51f8["area"] !== void 0 && _0x8f51f8["perimeter"] !== void 0 && this["_pendingLabels"]["push"](this["_addAreaSummaryLabel"](_0x8f51f8));
      this["_shapeLabels"]["set"](_0x8f51f8["id"], this["_pendingLabels"]), this["_pendingLabels"] = [], this["_committedCoords"] = [], this["_livePreviewCoord"] = void 0;
    }, this["_onRemove"] = ({ id: _0x3aa593 }) => {
      const _0x175c3d = this["_shapeLabels"]["get"](_0x3aa593);
      if (!_0x175c3d) return;
      for (const _0x4a8fde of _0x175c3d) this["_removeEntity"](_0x4a8fde);
      this["_shapeLabels"]["delete"](_0x3aa593);
    }, this["_onMeasureLayerVisibility"] = ({ id: _0x542348, visible: _0x13b47a }) => {
      if (_0x542348 !== MEASURE_LAYER_ID) return;
      for (const _0x220627 of this["_allLabelEntities"]()) _0x220627["show"] = _0x13b47a;
    }, this["_onMeasureLayerRemove"] = ({ layer: _0x12a9b2 }) => {
      if (_0x12a9b2["id"] !== MEASURE_LAYER_ID) return;
      for (const _0x231c47 of this["_allLabelEntities"]()) this["_removeEntity"](_0x231c47);
      this["_shapeLabels"]["clear"](), this["_pendingLabels"] = [], this["_liveSegmentLabel"] = void 0, this["_liveAreaLabel"] = void 0;
    };
  }
  ["_allLabelEntities"]() {
    const _0x1d6b1a = [...this["_pendingLabels"]];
    for (const _0x28bfaa of this["_shapeLabels"]["values"]()) _0x1d6b1a["push"](..._0x28bfaa);
    if (this["_liveSegmentLabel"]) _0x1d6b1a["push"](this["_liveSegmentLabel"]);
    if (this["_liveAreaLabel"]) _0x1d6b1a["push"](this["_liveAreaLabel"]);
    return _0x1d6b1a;
  }
  ["_bindLayerManager"](_0x9fce68) {
    _0x9fce68["on"]("layer:visibility", this["_onMeasureLayerVisibility"]), _0x9fce68["on"]("layer:remove", this["_onMeasureLayerRemove"]);
  }
  ["_unbindLayerManager"](_0x1de29d) {
    _0x1de29d["off"]("layer:visibility", this["_onMeasureLayerVisibility"]), _0x1de29d["off"]("layer:remove", this["_onMeasureLayerRemove"]);
  }
  ["disconnectedCallback"]() {
    this["map"] && (this["_unbindDrawingManager"](this["map"]["drawingManager"]), this["_unbindLayerManager"](this["map"]["layerManager"]));
    this["_removeLiveLabels"](), this["_removePendingLabels"]();
    if (this["_activeMode"] !== null) hideGuide();
    super["disconnectedCallback"]();
  }
  ["updated"](_0x55c46c) {
    _0x55c46c["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_customCssState"], "tucbs-measure-tool");
    if (_0x55c46c["has"]("map")) {
      const _0x5a4b0c = _0x55c46c["get"]("map");
      _0x5a4b0c && (this["_unbindDrawingManager"](_0x5a4b0c["drawingManager"]), this["_unbindLayerManager"](_0x5a4b0c["layerManager"])), this["map"] && (this["_bindDrawingManager"](this["map"]["drawingManager"]), this["_bindLayerManager"](this["map"]["layerManager"]));
    }
  }
  ["_bindDrawingManager"](_0x1c7609) {
    _0x1c7609["on"]("draw:start", this["_onDrawStart"]), _0x1c7609["on"]("draw:cancel", this["_onDrawCancel"]), _0x1c7609["on"]("draw:abort", this["_onAbort"]), _0x1c7609["on"]("draw:vertex", this["_onVertex"]), _0x1c7609["on"]("draw:move", this["_onMove"]), _0x1c7609["on"]("draw:complete", this["_onComplete"]), _0x1c7609["on"]("draw:remove", this["_onRemove"]);
  }
  ["_unbindDrawingManager"](_0x493462) {
    _0x493462["off"]("draw:start", this["_onDrawStart"]), _0x493462["off"]("draw:cancel", this["_onDrawCancel"]), _0x493462["off"]("draw:abort", this["_onAbort"]), _0x493462["off"]("draw:vertex", this["_onVertex"]), _0x493462["off"]("draw:move", this["_onMove"]), _0x493462["off"]("draw:complete", this["_onComplete"]), _0x493462["off"]("draw:remove", this["_onRemove"]);
  }
  ["firstUpdated"]() {
    bindMapByElementId(this, { "noIdTiming": "raf", ...standardMapBindingMessages("tucbs-measure-tool", "islevsiz") });
  }
  ["_onMainButtonClick"]() {
    this["_flyoutOpen"] = !this["_flyoutOpen"];
  }
  ["_selectMode"](_0x2d02dc) {
    var _a2;
    const _0x2e5a19 = (_a2 = this["map"]) == null ? void 0 : _a2["drawingManager"];
    if (!_0x2e5a19) return;
    this["_activeMode"] === _0x2d02dc ? _0x2e5a19["deactivate"]() : (this["_claimingActivation"] = !![], _0x2e5a19["activate"](MODE_TOOL[_0x2d02dc], "measure")), this["_flyoutOpen"] = ![];
  }
  ["_removeEntity"](_0x1111aa) {
    var _a2;
    (_a2 = this["map"]) == null ? void 0 : _a2["viewer"]["entities"]["remove"](_0x1111aa);
  }
  ["_removeLiveLabels"]() {
    this["_liveSegmentLabel"] && (this["_removeEntity"](this["_liveSegmentLabel"]), this["_liveSegmentLabel"] = void 0), this["_liveAreaLabel"] && (this["_removeEntity"](this["_liveAreaLabel"]), this["_liveAreaLabel"] = void 0);
  }
  ["_removePendingLabels"]() {
    for (const _0x30c5ec of this["_pendingLabels"]) this["_removeEntity"](_0x30c5ec);
    this["_pendingLabels"] = [], this["_committedCoords"] = [], this["_livePreviewCoord"] = void 0;
  }
  ["_liveSegmentMidpoint"]() {
    const _0x401b5b = this["_committedCoords"][this["_committedCoords"]["length"] - 1];
    if (_0x401b5b === void 0 || this["_livePreviewCoord"] === void 0) return void 0;
    return Cartesian3["midpoint"](toCartesian(_0x401b5b), toCartesian(this["_livePreviewCoord"]), new Cartesian3());
  }
  ["_liveSegmentDistance"]() {
    const _0x3116e5 = this["_committedCoords"][this["_committedCoords"]["length"] - 1];
    if (_0x3116e5 === void 0 || this["_livePreviewCoord"] === void 0) return void 0;
    return Cartesian3["distance"](toCartesian(_0x3116e5), toCartesian(this["_livePreviewCoord"]));
  }
  ["_livePolygonCoords"]() {
    return this["_livePreviewCoord"] ? [...this["_committedCoords"], this["_livePreviewCoord"]] : [...this["_committedCoords"]];
  }
  ["_ensureLiveLabels"]() {
    var _a2;
    const _0x44bf0c = (_a2 = this["map"]) == null ? void 0 : _a2["viewer"];
    if (!_0x44bf0c) return;
    this["_liveSegmentLabel"] === void 0 && (this["_liveSegmentLabel"] = _0x44bf0c["entities"]["add"]({ "position": new CallbackPositionProperty(() => this["_liveSegmentMidpoint"]() ?? HIDDEN_POS, ![]), "label": { "text": new CallbackProperty(() => {
      const _0x1afa58 = this["_liveSegmentDistance"]();
      return _0x1afa58 === void 0 ? "" : metersToReadable(_0x1afa58);
    }, ![]), "show": new CallbackProperty(() => this["_liveSegmentMidpoint"]() !== void 0, ![]), "showBackground": !![], "backgroundColor": SEGMENT_LABEL_BG, "font": LABEL_FONT, "style": LabelStyle["FILL"], "pixelOffset": new Cartesian2(0, -12), "heightReference": HeightReference["CLAMP_TO_GROUND"], "verticalOrigin": VerticalOrigin["BOTTOM"] } })), this["_liveAreaLabel"] === void 0 && (this["_liveAreaLabel"] = _0x44bf0c["entities"]["add"]({ "position": new CallbackPositionProperty(() => {
      const _0x31c555 = this["_livePolygonCoords"]();
      return _0x31c555["length"] >= 3 ? centroidOf(_0x31c555) : HIDDEN_POS;
    }, ![]), "label": { "text": new CallbackProperty(() => {
      const _0x52ee19 = this["_livePolygonCoords"]();
      if (_0x52ee19["length"] < 3) return "";
      const _0x50a916 = polygonAreaMeters(_0x52ee19), _0xf51fad = perimeterMeters(_0x52ee19);
      return "Alan: " + sqmToReadable(_0x50a916) + "\nÇevre: " + metersToReadable(_0xf51fad);
    }, ![]), "show": new CallbackProperty(() => this["_activeMode"] === "area" && this["_livePolygonCoords"]()["length"] >= 3, ![]), "showBackground": !![], "backgroundColor": AREA_LABEL_BG, "font": LABEL_FONT, "style": LabelStyle["FILL"], "disableDepthTestDistance": Number["POSITIVE_INFINITY"] } }));
  }
  ["_addStaticSegmentLabel"](_0x5a03ea, _0x2c72d0) {
    const _0x17ee06 = toCartesian(_0x5a03ea), _0x1c2b87 = toCartesian(_0x2c72d0), _0x524c6c = Cartesian3["midpoint"](_0x17ee06, _0x1c2b87, new Cartesian3()), _0x12687e = Cartesian3["distance"](_0x17ee06, _0x1c2b87);
    return this["map"]["viewer"]["entities"]["add"]({ "position": _0x524c6c, "label": { "text": metersToReadable(_0x12687e), "showBackground": !![], "backgroundColor": SEGMENT_LABEL_BG, "font": LABEL_FONT, "style": LabelStyle["FILL"], "pixelOffset": new Cartesian2(0, -12), "heightReference": HeightReference["CLAMP_TO_GROUND"], "verticalOrigin": VerticalOrigin["BOTTOM"] } });
  }
  ["_addTotalDistanceLabel"](_0x352fda) {
    const _0x1ca69f = _0x352fda["coordinates"][_0x352fda["coordinates"]["length"] - 1], _0x3bc9de = _0x1ca69f ? toCartesian(_0x1ca69f) : HIDDEN_POS;
    return this["map"]["viewer"]["entities"]["add"]({ "position": _0x3bc9de, "label": { "text": "Toplam: " + metersToReadable(_0x352fda["length"] ?? 0), "showBackground": !![], "backgroundColor": TOTAL_LABEL_BG, "fillColor": Color["WHITE"], "font": LABEL_FONT, "style": LabelStyle["FILL"], "pixelOffset": new Cartesian2(0, 14), "heightReference": HeightReference["CLAMP_TO_GROUND"], "verticalOrigin": VerticalOrigin["TOP"] } });
  }
  ["_addAreaSummaryLabel"](_0x24892e) {
    const _0x166cc4 = centroidOf(_0x24892e["coordinates"]);
    return this["map"]["viewer"]["entities"]["add"]({ "position": _0x166cc4, "label": { "text": "Alan: " + sqmToReadable(_0x24892e["area"] ?? 0) + "\nÇevre: " + metersToReadable(_0x24892e["perimeter"] ?? 0), "showBackground": !![], "backgroundColor": AREA_LABEL_BG, "font": LABEL_FONT, "style": LabelStyle["FILL"], "disableDepthTestDistance": Number["POSITIVE_INFINITY"] } });
  }
  ["render"]() {
    const _0x217a68 = this["_activeMode"] !== null ? iconFor(this["_activeMode"]) : MAIN_ICON, _0x461977 = this["_activeMode"] !== null ? modeLabel(this["_activeMode"]) : "Ölçüm";
    return b`
      <div class="measure-tool">
        ${this["_flyoutOpen"] ? b`
              <div class="flyout">
                ${["distance", "area"]["map"]((_0x309907) => b`
                    <button
                      class="tool-button ${_0x309907 === this["_activeMode"] ? "active" : ""}"
                      type="button"
                      aria-label=${modeLabel(_0x309907)}
                      data-tooltip=${modeLabel(_0x309907)}
                      @click=${() => this["_selectMode"](_0x309907)}
                    >
                      ${iconFor(_0x309907)}
                    </button>
                  `)}
              </div>
            ` : null}
        <button
          class="tool-button main-button ${this["_activeMode"] !== null ? "active" : ""}"
          type="button"
          aria-label=${_0x461977}
          data-tooltip=${_0x461977}
          @click=${this["_onMainButtonClick"]}
        >
          ${_0x217a68}
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
var __defProp$k = Object["defineProperty"], __getOwnPropDesc$l = Object["getOwnPropertyDescriptor"], __decorateClass$l = (_0x2afb2d, _0x2ba409, _0x3c6ede, _0x559d54) => {
  var _0x55a293 = _0x559d54 > 1 ? void 0 : _0x559d54 ? __getOwnPropDesc$l(_0x2ba409, _0x3c6ede) : _0x2ba409;
  for (var _0x5ea8dc = _0x2afb2d["length"] - 1, _0x56af52; _0x5ea8dc >= 0; _0x5ea8dc--) if (_0x56af52 = _0x2afb2d[_0x5ea8dc]) _0x55a293 = (_0x559d54 ? _0x56af52(_0x2ba409, _0x3c6ede, _0x55a293) : _0x56af52(_0x55a293)) || _0x55a293;
  if (_0x559d54 && _0x55a293) __defProp$k(_0x2ba409, _0x3c6ede, _0x55a293);
  return _0x55a293;
};
const ICON_DOWNLOAD$1 = o$1(iconNodeToString(_16_default$p));
let TucbsMapExport = class extends i$2 {
  constructor() {
    super(...arguments), this["mapElementId"] = "", this["filename"] = "tucbs-harita", this["customCss"] = "", this["_busy"] = ![], this["_customCssState"] = { "sheet": null };
  }
  ["updated"](_0x477ecf) {
    _0x477ecf["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_customCssState"], "tucbs-map-export");
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
var __defProp$j = Object["defineProperty"], __getOwnPropDesc$k = Object["getOwnPropertyDescriptor"], __decorateClass$k = (_0x18bc5f, _0x6f2325, _0x29c3b7, _0x5bb58e) => {
  var _0x3c46dd = _0x5bb58e > 1 ? void 0 : _0x5bb58e ? __getOwnPropDesc$k(_0x6f2325, _0x29c3b7) : _0x6f2325;
  for (var _0x105356 = _0x18bc5f["length"] - 1, _0x14199c; _0x105356 >= 0; _0x105356--) if (_0x14199c = _0x18bc5f[_0x105356]) _0x3c46dd = (_0x5bb58e ? _0x14199c(_0x6f2325, _0x29c3b7, _0x3c46dd) : _0x14199c(_0x3c46dd)) || _0x3c46dd;
  if (_0x5bb58e && _0x3c46dd) __defProp$j(_0x6f2325, _0x29c3b7, _0x3c46dd);
  return _0x3c46dd;
};
const ICON_CHEVRON_RIGHT = o$1(iconNodeToString(_16_default$x)), ICON_CLOSE$3 = o$1(iconNodeToString(_16_default$v)), ICON_CHECK = o$1(iconNodeToString(_16_default$y)), ICON_WARNING = o$1(iconNodeToString(_16_default$2)), ICON_MAP = o$1(iconNodeToString(_16_default$h)), PENDING_INDICATOR_DELAY_MS = 1500, DEFAULT_BASEMAPS = [{ "id": "hgm-siyasi", "label": "HGM Siyasi", "thumbnail": SIYASI_THUMB }, { "id": "hgm-yukseklik", "label": "HGM Yükseklik", "thumbnail": YUKSEKLIK_THUMB }, { "id": "hgm-ortofoto", "label": "HGM Ortofoto", "thumbnail": ORTOFOTO_THUMB }, { "id": "hgm-temel", "label": "HGM Temel", "thumbnail": TEMEL_THUMB }];
let TucbsBasemapPicker = class extends i$2 {
  constructor() {
    super(...arguments), this["mapElementId"] = "", this["activeBasemap"] = "", this["basemaps"] = DEFAULT_BASEMAPS, this["customCss"] = "", this["embedded"] = ![], this["_open"] = ![], this["_error"] = ![], this["_pending"] = ![], this["_customCssState"] = { "sheet": null }, this["_pendingTimer"] = null, this["_timers"] = new TimerBag(this), this["_onLayerAdd"] = (_0x222c32) => {
      if (!_0x222c32["layer"]["isBasemap"]) return;
      this["activeBasemap"] = _0x222c32["layer"]["title"], this["_clearPendingTimer"](), this["_pending"] = ![], this["_pendingTimer"] = this["_timers"]["setTimeout"](() => {
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
  ["updated"](_0x210792) {
    var _a2;
    _0x210792["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_customCssState"], "tucbs-basemap-picker");
    if (_0x210792["has"]("map")) {
      const _0x5ab6b0 = _0x210792["get"]("map");
      if (_0x5ab6b0) this["_unbindMap"](_0x5ab6b0);
      if (this["map"]) this["_bindMap"](this["map"]);
    }
    if (_0x210792["has"]("activeBasemap") && this["activeBasemap"] && this["map"]) {
      const _0x26a2de = (_a2 = this["map"]["layerManager"]["getLayers"]()["find"]((_0x17ccb6) => _0x17ccb6["isBasemap"])) == null ? void 0 : _a2["title"];
      _0x26a2de !== this["activeBasemap"] && this["map"]["setBasemap"](this["activeBasemap"]);
    }
  }
  ["_bindMap"](_0x3eea86) {
    _0x3eea86["layerManager"]["on"]("layer:add", this["_onLayerAdd"]), _0x3eea86["layerManager"]["on"]("basemap:error", this["_onBasemapError"]), _0x3eea86["layerManager"]["on"]("basemap:recovered", this["_onBasemapRecovered"]), this["_syncFromMap"](_0x3eea86);
    if (_0x3eea86["basemapStatus"] === "unavailable") this["_error"] = !![];
    else _0x3eea86["basemapStatus"] === "loading" && (this["_pending"] = !![]);
  }
  ["_unbindMap"](_0x1cc07d) {
    _0x1cc07d["layerManager"]["off"]("layer:add", this["_onLayerAdd"]), _0x1cc07d["layerManager"]["off"]("basemap:error", this["_onBasemapError"]), _0x1cc07d["layerManager"]["off"]("basemap:recovered", this["_onBasemapRecovered"]);
  }
  ["_syncFromMap"](_0x33046c) {
    const _0xb0418e = _0x33046c["layerManager"]["getLayers"]()["find"]((_0x16fb84) => _0x16fb84["isBasemap"]);
    if (_0xb0418e) this["activeBasemap"] = _0xb0418e["title"];
  }
  ["_select"](_0x46fc49) {
    if (this["_error"] || this["_pending"]) return;
    this["_clearPendingTimer"](), this["_pending"] = ![], this["_pendingTimer"] = this["_timers"]["setTimeout"](() => {
      this["_pendingTimer"] = null, this["_pending"] = !![];
    }, PENDING_INDICATOR_DELAY_MS), this["activeBasemap"] = _0x46fc49;
  }
  ["_openPanel"]() {
    this["_open"] = !![];
  }
  ["_closePanel"]() {
    this["_open"] = ![];
  }
  ["_renderCard"](_0x266a65) {
    const _0x4db882 = _0x266a65["id"] === this["activeBasemap"];
    return b`
      <button
        type="button"
        class="card ${_0x4db882 ? "selected" : ""}"
        style="background-image: url('${_0x266a65["thumbnail"]}')"
        role="radio"
        aria-checked=${_0x4db882}
        ?disabled=${this["_error"] || this["_pending"]}
        aria-disabled=${this["_error"] || this["_pending"]}
        @click=${() => this["_select"](_0x266a65["id"])}
      >
        ${_0x4db882 ? b`<span class="check-badge">${ICON_CHECK}</span>` : A}
        <span class="card-label">${_0x266a65["label"]}</span>
      </button>
    `;
  }
  ["_renderGrid"]() {
    return b`
      <div class="grid" role="radiogroup" aria-label="Altlık Haritalar" aria-disabled=${this["_error"] || this["_pending"]}>
        ${c(this["basemaps"], (_0x148225) => _0x148225["id"], (_0x16d65d) => this["_renderCard"](_0x16d65d))}
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
var __defProp$i = Object["defineProperty"], __getOwnPropDesc$j = Object["getOwnPropertyDescriptor"], __decorateClass$j = (_0x1a6b61, _0x2beb53, _0x2759a0, _0x42a1c2) => {
  var _0x33ed4d = _0x42a1c2 > 1 ? void 0 : _0x42a1c2 ? __getOwnPropDesc$j(_0x2beb53, _0x2759a0) : _0x2beb53;
  for (var _0xed197a = _0x1a6b61["length"] - 1, _0x215382; _0xed197a >= 0; _0xed197a--) if (_0x215382 = _0x1a6b61[_0xed197a]) _0x33ed4d = (_0x42a1c2 ? _0x215382(_0x2beb53, _0x2759a0, _0x33ed4d) : _0x215382(_0x33ed4d)) || _0x33ed4d;
  if (_0x42a1c2 && _0x33ed4d) __defProp$i(_0x2beb53, _0x2759a0, _0x33ed4d);
  return _0x33ed4d;
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
  ["updated"](_0x3a857a) {
    _0x3a857a["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_customCssState"], "tucbs-quality-bar");
    if (_0x3a857a["has"]("map") && this["map"]) this["_syncFromMap"](this["map"]);
  }
  ["_syncFromMap"](_0xaca1ce) {
    this["_quality"] = Math["round"](_0xaca1ce["viewer"]["resolutionScale"] * 100);
  }
  ["_onSliderInput"](_0x554924) {
    const _0x237765 = _0x554924["target"], _0x1a108d = Number(_0x237765["value"]);
    _0x237765["style"]["setProperty"]("--fill", _0x1a108d + "%"), this["_timers"]["cancelAnimationFrame"](this["_qualityRaf"]), this["_qualityRaf"] = this["_timers"]["requestAnimationFrame"](() => {
      var _a2;
      this["_qualityRaf"] = null, this["_quality"] = _0x1a108d, (_a2 = this["map"]) == null ? void 0 : _a2["setQuality"](_0x1a108d);
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
var __defProp$h = Object["defineProperty"], __getOwnPropDesc$i = Object["getOwnPropertyDescriptor"], __decorateClass$i = (_0x5d3737, _0x5967db, _0x39adec, _0x5abbd5) => {
  var _0x145ce5 = _0x5abbd5 > 1 ? void 0 : _0x5abbd5 ? __getOwnPropDesc$i(_0x5967db, _0x39adec) : _0x5967db;
  for (var _0x23f192 = _0x5d3737["length"] - 1, _0x13cbb6; _0x23f192 >= 0; _0x23f192--) if (_0x13cbb6 = _0x5d3737[_0x23f192]) _0x145ce5 = (_0x5abbd5 ? _0x13cbb6(_0x5967db, _0x39adec, _0x145ce5) : _0x13cbb6(_0x145ce5)) || _0x145ce5;
  if (_0x5abbd5 && _0x145ce5) __defProp$h(_0x5967db, _0x39adec, _0x145ce5);
  return _0x145ce5;
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
    const _0x32fc8a = document["createElement"]("tucbs-slide-over-panel");
    _0x32fc8a["panelTitle"] = "Ayarlar", _0x32fc8a["panelWidth"] = this["panelWidth"], _0x32fc8a["onCloseRequest"] = () => this["_toggle"](), document["body"]["appendChild"](_0x32fc8a), this["_panelEl"] = _0x32fc8a, this["_renderIntoPanel"]();
  }
  ["disconnectedCallback"]() {
    var _a2;
    if (this["map"]) this["_layoutController"]["unbindMap"](this["map"]);
    (_a2 = this["_panelEl"]) == null ? void 0 : _a2["remove"](), this["_panelEl"] = null, super["disconnectedCallback"]();
  }
  ["firstUpdated"]() {
    bindMapByElementId(this, { "noIdTiming": "sync", ...standardMapBindingMessages("tucbs-settings-tool", "islevsiz") });
  }
  ["updated"](_0x84fe08) {
    _0x84fe08["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_customCssState"], "tucbs-settings-tool");
    if (_0x84fe08["has"]("map")) {
      const _0x26d2c8 = _0x84fe08["get"]("map");
      if (_0x26d2c8) this["_layoutController"]["unbindMap"](_0x26d2c8);
      if (this["map"]) this["_layoutController"]["bindMap"](this["map"]);
    }
    _0x84fe08["has"]("panelWidth") && this["_open"] && this["_layoutController"]["setOpen"](!![], this["panelWidth"]);
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
function buildDisclaimerBox(_0x10cf07) {
  const _0x51047f = _0x10cf07["createElement"]("div");
  return _0x51047f["className"] = "print-disclaimer", _0x51047f["textContent"] = DISCLAIMER_TEXT, _0x51047f;
}
function buildDatasetsSectionTitle(_0x4b1b1f) {
  const _0x1a0417 = _0x4b1b1f["createElement"]("h2");
  return _0x1a0417["className"] = "print-section-title", _0x1a0417["textContent"] = "Veri Setleri", _0x1a0417;
}
function buildDatasetNameList(_0x3f9656, _0x5dee3c) {
  const _0x4616e9 = _0x3f9656["createElement"]("ul");
  _0x4616e9["className"] = "dataset-name-list";
  for (const _0x456597 of _0x5dee3c) {
    const _0x2a09c6 = _0x3f9656["createElement"]("li");
    _0x2a09c6["textContent"] = _0x456597, _0x4616e9["appendChild"](_0x2a09c6);
  }
  return _0x4616e9;
}
function buildEmptyDatasetsMessage(_0x2f8923) {
  const _0x50c0c4 = _0x2f8923["createElement"]("p");
  return _0x50c0c4["className"] = "dataset-empty", _0x50c0c4["textContent"] = EMPTY_DATASETS_MESSAGE, _0x50c0c4;
}
function buildLegendSection(_0x441a03, _0x452e75) {
  if (_0x452e75["length"] === 0) return null;
  const _0x3835e3 = _0x441a03["createElement"]("div");
  _0x3835e3["className"] = "legend-section";
  for (const _0xc90aef of _0x452e75) _0x3835e3["appendChild"](buildLegendEntryElement(_0x441a03, _0xc90aef));
  return _0x3835e3;
}
function buildLegendEntryElement(_0x48ffc5, _0xeb8af4) {
  if (_0xeb8af4["kind"] === "list-columns") return buildListColumnsGrid(_0x48ffc5, _0xeb8af4);
  const _0x1f5e06 = _0x48ffc5["createElement"]("div");
  return _0x1f5e06["className"] = "legend-entry", _0x1f5e06["append"](...buildLegendEntryHeader(_0x48ffc5, _0xeb8af4), buildLegendEntryContent(_0x48ffc5, _0xeb8af4)), _0x1f5e06;
}
function buildLegendEntryHeader(_0x2174ab, _0x19b606) {
  if (_0x19b606["kind"] !== "gradient" && _0x19b606["kind"] !== "bin" && _0x19b606["kind"] !== "enum") return buildEntryHeaderLines(_0x2174ab, _0x19b606["layerTitle"], void 0);
  return buildEntryHeaderLines(_0x2174ab, _0x19b606["layerTitle"], _0x19b606["displayColumn"]);
}
function buildEntryHeaderLines(_0x556cad, _0x51acb6, _0x3ff17a) {
  const _0x1e7ece = _0x556cad["createElement"]("div");
  _0x1e7ece["className"] = "legend-entry-title", _0x1e7ece["textContent"] = _0x51acb6;
  if (_0x3ff17a === void 0) return [_0x1e7ece];
  const _0x8bb51 = _0x556cad["createElement"]("div");
  _0x8bb51["className"] = "legend-entry-subtitle", _0x8bb51["textContent"] = "Görüntüleme Değişkeni: " + _0x3ff17a;
  const _0x3afb22 = _0x556cad["createElement"]("div");
  return _0x3afb22["className"] = "legend-entry-column", _0x3afb22["textContent"] = _0x3ff17a, [_0x1e7ece, _0x8bb51, _0x3afb22];
}
function buildLegendEntryContent(_0x17c32e, _0x44f915) {
  switch (_0x44f915["kind"]) {
    case "image":
      return buildImageContent(_0x17c32e, _0x44f915["imageUrl"]);
    case "gradient":
    case "bin":
    case "enum":
      return buildRowsContent(_0x17c32e, _0x44f915["rows"]);
    case "empty":
      return buildEmptyContent(_0x17c32e, _0x44f915["message"]);
  }
}
function buildListColumnsGrid(_0x84274c, _0x44b89a) {
  const _0x2011ba = _0x84274c["createElement"]("div");
  return _0x2011ba["className"] = "legend-entry legend-list-columns", _0x44b89a["columnGroups"]["forEach"]((_0x430754, _0x506c73) => {
    const _0xeb53d5 = _0x84274c["createElement"]("div"), _0x4d7663 = _0x84274c["createElement"]("div");
    _0x4d7663["append"](...buildEntryHeaderLines(_0x84274c, _0x44b89a["layerTitle"], _0x44b89a["displayColumn"]));
    if (_0x506c73 > 0) _0x4d7663["style"]["visibility"] = "hidden";
    _0xeb53d5["append"](_0x4d7663, buildRowsContent(_0x84274c, _0x430754)), _0x2011ba["appendChild"](_0xeb53d5);
  }), _0x2011ba;
}
function buildImageContent(_0xd6da99, _0x1b536b) {
  const _0x34d332 = _0xd6da99["createElement"]("img");
  return _0x34d332["className"] = "legend-image", _0x34d332["src"] = _0x1b536b, _0x34d332["alt"] = "Lejant", _0x34d332;
}
function buildRowsContent(_0x264696, _0x8b7582) {
  const _0x28f55c = _0x264696["createElement"]("div");
  for (const _0x3f9914 of _0x8b7582) {
    const _0x548a5a = _0x264696["createElement"]("div");
    _0x548a5a["className"] = "legend-row";
    const _0x28de08 = _0x264696["createElement"]("span");
    _0x28de08["className"] = "legend-swatch", _0x28de08["style"]["background"] = _0x3f9914["color"];
    const _0x3c4d89 = _0x264696["createElement"]("span");
    _0x3c4d89["className"] = "legend-value", _0x3c4d89["textContent"] = _0x3f9914["label"], _0x548a5a["append"](_0x28de08, _0x3c4d89), _0x28f55c["appendChild"](_0x548a5a);
  }
  return _0x28f55c;
}
function buildEmptyContent(_0x33658a, _0x4e23e6) {
  const _0x3609a4 = _0x33658a["createElement"]("span");
  return _0x3609a4["className"] = "legend-empty", _0x3609a4["textContent"] = _0x4e23e6, _0x3609a4;
}
function buildDatasetNameContinuationPage(_0x2969b6, _0x35a55e, _0x57ea70, _0x379a76, _0x3687a0, _0x52dc79 = ![]) {
  const _0x574547 = _0x2969b6["createElement"]("div");
  _0x574547["className"] = "legend-continuation-page", _0x574547["style"]["padding"] = _0x3687a0 + "mm", _0x574547["style"]["width"] = _0x57ea70 + "mm", _0x574547["style"]["boxSizing"] = "border-box";
  _0x52dc79 && _0x574547["appendChild"](buildDatasetsSectionTitle(_0x2969b6));
  const _0x34ab73 = buildDatasetNameList(_0x2969b6, _0x35a55e);
  return _0x34ab73["style"]["height"] = _0x379a76 + "mm", _0x34ab73["style"]["overflow"] = "hidden", _0x574547["appendChild"](_0x34ab73), _0x574547;
}
function buildLegendContinuationPage(_0x3c8c4f, _0x324bb7, _0x1c78ea, _0x1023d6, _0x41d773, _0x16db9d = ![]) {
  const _0x330d95 = _0x3c8c4f["createElement"]("div");
  _0x330d95["className"] = "legend-continuation-page", _0x330d95["style"]["padding"] = _0x41d773 + "mm", _0x330d95["style"]["width"] = _0x1c78ea + "mm", _0x330d95["style"]["boxSizing"] = "border-box";
  _0x16db9d && _0x330d95["appendChild"](buildDatasetsSectionTitle(_0x3c8c4f));
  const _0x56f9d8 = buildLegendSection(_0x3c8c4f, _0x324bb7);
  return _0x56f9d8 && (_0x56f9d8["style"]["height"] = _0x1023d6 + "mm", _0x56f9d8["style"]["overflow"] = "hidden", _0x330d95["appendChild"](_0x56f9d8)), _0x330d95;
}
const LEGEND_ROW_HEIGHT_MM = 3.4, LEGEND_COLUMNS_PER_PAGE = 3, COMPACT_ENTRY_ROW_COST = 4, LIST_HEADER_ROW_COST = 7, LEGEND_CONTINUATION_SUFFIX = " (devam)", DATASET_NAME_ROW_HEIGHT_MM = 5.5;
function paginateDatasetNames(_0x3e62e2, _0x1c87a9, _0x3803b6) {
  const _0x416e36 = Math["max"](1, Math["floor"](_0x1c87a9 / DATASET_NAME_ROW_HEIGHT_MM)), _0x19413a = Math["max"](1, Math["floor"](_0x3803b6 / DATASET_NAME_ROW_HEIGHT_MM)), _0x49f754 = _0x3e62e2["slice"](0, _0x416e36), _0xa2358b = [];
  for (let _0x4ab52a = _0x416e36; _0x4ab52a < _0x3e62e2["length"]; _0x4ab52a += _0x19413a) {
    _0xa2358b["push"](_0x3e62e2["slice"](_0x4ab52a, _0x4ab52a + _0x19413a));
  }
  return { "page1Names": _0x49f754, "continuationPages": _0xa2358b };
}
function computeRowsPerColumn(_0x4b1411) {
  return Math["max"](1, Math["floor"](_0x4b1411 / LEGEND_ROW_HEIGHT_MM));
}
function splitIntoColumns(_0x4a7208, _0x1ecd29) {
  const _0x16be31 = [];
  for (let _0x54a080 = 0; _0x54a080 < _0x4a7208["length"]; _0x54a080 += _0x1ecd29) {
    _0x16be31["push"](_0x4a7208["slice"](_0x54a080, _0x54a080 + _0x1ecd29));
  }
  return _0x16be31;
}
function paginateLegendEntries(_0x256df9, _0x58861f, _0x4e8e44) {
  const _0x91e7cf = new LegendPaginator(_0x58861f, _0x4e8e44);
  for (const _0x493ae3 of _0x256df9) {
    if (_0x493ae3["kind"] === "bin" || _0x493ae3["kind"] === "enum" || _0x493ae3["kind"] === "gradient") _0x91e7cf["addList"](_0x493ae3);
    else _0x91e7cf["addCompact"](_0x493ae3);
  }
  return _0x91e7cf["result"]();
}
class LegendPaginator {
  constructor(_0x5b6002, _0x30bfc6) {
    this["pages"] = [[]], this["compactHeightMmOnCurrentPage"] = 0, this["currentPageHeightMm"] = _0x5b6002, this["fullPageHeightMm"] = _0x30bfc6, this["rowsPerColumnForCurrentPage"] = computeRowsPerColumn(_0x5b6002), this["fullPageRowsPerColumn"] = computeRowsPerColumn(_0x30bfc6), this["remaining"] = this["rowsPerColumnForCurrentPage"];
  }
  ["addCompact"](_0x34fb09) {
    this["ensureRoomFor"](COMPACT_ENTRY_ROW_COST), this["currentPage"]()["push"](_0x34fb09), this["remaining"] -= COMPACT_ENTRY_ROW_COST, this["compactHeightMmOnCurrentPage"] += COMPACT_ENTRY_ROW_COST * LEGEND_ROW_HEIGHT_MM;
  }
  ["addList"](_0x39c25a) {
    let _0x1c9df6 = _0x39c25a["rows"], _0x3f5fca = !![];
    while (_0x1c9df6["length"] > 0) {
      const _0xceb1e6 = Math["max"](1, this["rowsPerColumnForCurrentPage"] - LIST_HEADER_ROW_COST);
      _0x1c9df6["length"] <= _0xceb1e6 ? _0x1c9df6 = this["addSingleColumnChunk"](_0x39c25a, _0x3f5fca, _0x1c9df6) : _0x1c9df6 = this["addMultiColumnChunk"](_0x39c25a, _0x3f5fca, _0x1c9df6), _0x3f5fca = ![];
    }
  }
  ["addSingleColumnChunk"](_0x2bcfbc, _0x515b21, _0x564e85) {
    this["ensureRoomFor"](LIST_HEADER_ROW_COST + 1);
    const _0x4c7b86 = Math["max"](1, this["rowsPerColumnForCurrentPage"] - LIST_HEADER_ROW_COST), _0x12deae = Math["min"](_0x564e85["length"], _0x4c7b86), _0x5bb5a3 = _0x515b21 ? _0x2bcfbc["layerTitle"] : _0x2bcfbc["layerTitle"] + LEGEND_CONTINUATION_SUFFIX;
    return this["currentPage"]()["push"]({ ..._0x2bcfbc, "layerTitle": _0x5bb5a3, "rows": _0x564e85["slice"](0, _0x12deae) }), this["remaining"] -= _0x12deae + LIST_HEADER_ROW_COST, this["compactHeightMmOnCurrentPage"] += (LIST_HEADER_ROW_COST + _0x12deae) * LEGEND_ROW_HEIGHT_MM, _0x564e85["slice"](_0x12deae);
  }
  ["addMultiColumnChunk"](_0x34d7a2, _0xbcfa5f, _0x2f2da5) {
    const _0x1e5870 = this["currentPageHeightMm"] - this["compactHeightMmOnCurrentPage"];
    let _0x1cbd50 = Math["max"](0, Math["floor"](_0x1e5870 / LEGEND_ROW_HEIGHT_MM) - LIST_HEADER_ROW_COST);
    _0x1cbd50 < 1 && (this["advancePage"](), _0x1cbd50 = Math["max"](1, this["rowsPerColumnForCurrentPage"] - LIST_HEADER_ROW_COST));
    const _0x465ef3 = Math["min"](_0x2f2da5["length"], _0x1cbd50 * LEGEND_COLUMNS_PER_PAGE), _0x416bf4 = splitIntoColumns(_0x2f2da5["slice"](0, _0x465ef3), _0x1cbd50), _0x1aa977 = _0xbcfa5f ? _0x34d7a2["layerTitle"] : _0x34d7a2["layerTitle"] + LEGEND_CONTINUATION_SUFFIX;
    return this["currentPage"]()["push"]({ "layerTitle": _0x1aa977, "kind": "list-columns", "displayColumn": _0x34d7a2["displayColumn"], "columnGroups": _0x416bf4 }), this["advancePage"](), _0x2f2da5["slice"](_0x465ef3);
  }
  ["result"]() {
    return { "page1Entries": this["pages"][0], "continuationPages": this["pages"]["slice"](1)["filter"]((_0x1fefee) => _0x1fefee["length"] > 0) };
  }
  ["currentPage"]() {
    return this["pages"][this["pages"]["length"] - 1];
  }
  ["advancePage"]() {
    this["pages"]["push"]([]), this["currentPageHeightMm"] = this["fullPageHeightMm"], this["rowsPerColumnForCurrentPage"] = this["fullPageRowsPerColumn"], this["remaining"] = this["rowsPerColumnForCurrentPage"], this["compactHeightMmOnCurrentPage"] = 0;
  }
  ["ensureRoomFor"](_0x31b658) {
    if (this["remaining"] >= _0x31b658) return;
    if (this["currentPage"]()["length"] === 0 && _0x31b658 > this["fullPageRowsPerColumn"]) return;
    this["advancePage"]();
  }
}
const LEGEND_SECTION_MARGIN_TOP_MM = 3, LEGEND_PAGE1_SAFETY_MARGIN_MM = 5;
function computeLegendMaxHeightMm(_0xf0da2) {
  return Math["max"](0, _0xf0da2["pageHeightMm"] - 2 * _0xf0da2["pageMarginMm"] - _0xf0da2["headerHeightMm"] - _0xf0da2["footerHeightMm"] - _0xf0da2["imageHeightMm"] - LEGEND_SECTION_MARGIN_TOP_MM - LEGEND_PAGE1_SAFETY_MARGIN_MM);
}
const DATASETS_HEADER_BLOCK_MM = 34;
function computeDatasetsListMaxHeightMm(_0x3bcc0d) {
  return Math["max"](0, computeLegendMaxHeightMm(_0x3bcc0d) - DATASETS_HEADER_BLOCK_MM);
}
function buildPageStyle(_0x18036f, _0x525a4f) {
  const _0x34c043 = _0x18036f["createElement"]("style");
  return _0x34c043["textContent"] = buildBasePageCss(_0x525a4f) + buildLegendCss(_0x525a4f), _0x34c043;
}
function buildBasePageCss(_0xbddd0c) {
  return "\n    @page { size: " + _0xbddd0c["pageWidthMm"] + "mm " + _0xbddd0c["pageHeightMm"] + `mm; margin: 0; }
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
    .print-page { display: flex; flex-direction: column; align-items: center; width: ` + _0xbddd0c["pageWidthMm"] + "mm; height: " + _0xbddd0c["pageHeightMm"] + "mm; padding: " + _0xbddd0c["pageMarginMm"] + "mm; box-sizing: border-box; }\n    .print-header { width: 100%; text-align: center; box-sizing: border-box; overflow: hidden; height: " + _0xbddd0c["headerHeightMm"] + 'mm; }\n    .print-header h1 { margin: 0 0 2mm 0; font-size: 18px; font-weight: 600; }\n    .print-header .print-date { font-size: 12px; color: #525252; }\n    .map-frame { position: relative; width: 100%; }\n    .map-frame::before { content: ""; display: block; padding-top: var(--frame-aspect-pct); }\n    .map-frame img { display: block; position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; }\n    .north-arrow { position: absolute; width: 40px; height: 40px; }\n    .north-arrow img { width: 100%; height: 100%; display: block; }\n    .scale-bar { position: absolute; font-size: 12px; font-weight: 600; background: rgba(255,255,255,0.85); padding: 2px 6px; border-radius: 2px; }\n    .print-footer { box-sizing: border-box; overflow: hidden; font-size: 10px; color: #525252; text-align: center; }\n    .preview-toolbar { position: fixed; top: 16px; right: 16px; display: flex; gap: 8px; z-index: 1000; }\n    .preview-toolbar-btn { padding: 8px 16px; border: none; border-radius: 4px; background: #0f62fe; color: #fff; font: inherit; cursor: pointer; }\n    @media print { .preview-toolbar { display: none; } }\n  ';
}
function buildLegendCss(_0x4a1475) {
  const _0x3161e4 = computeLegendMaxHeightMm(_0x4a1475), _0x21ab04 = computeDatasetsListMaxHeightMm(_0x4a1475);
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
    .datasets-section-bounded { height: ` + _0x3161e4 + `mm; overflow: hidden; }
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
    .legend-section { width: 100%; margin-top: ` + LEGEND_SECTION_MARGIN_TOP_MM + "mm; font-size: 10px; height: " + _0x21ab04 + "mm; overflow: hidden; box-sizing: border-box; }\n    /* FAZ 3.4: .datasets-section icinde (SADECE sayfa 1) baslik zaten\n       KENDI margin-bottom'uyla bosluk birakiyor -- .legend-section'in KENDI\n       margin-top'u (devam sayfalarinda hala GEREKLI, o yuzden ASAGIDAKI\n       temel kuraldan KALDIRILMADI) burada FAZLADAN/CIFT bosluk yaratirdi. */\n    .datasets-section .legend-section { margin-top: 0; }\n    .legend-continuation-page { break-before: page; box-sizing: border-box; }\n    .legend-entry { break-inside: avoid; margin-bottom: 3mm; }\n    /* FAZ 2.3/3.5: bkz PrintLegendBuilder.ts buildListColumnsGrid WHY yorumu --\n       acik bir CSS Grid ile kolonlari HIZALI olusturur; .legend-section\n       ARTIK HICBIR ZAMAN CSS columns: baglami acmadigindan (bkz yukarisi)\n       bu Grid'in column-span:all'a ihtiyaci hic olmaz. */\n    .legend-list-columns { display: grid; grid-template-columns: repeat(" + LEGEND_COLUMNS_PER_PAGE + ', 1fr); column-gap: 6mm; }\n    /* FAZ 2.3: kullanici basligin ILK 2 satiri (katman adi + "Goruntuleme\n       Degiskeni") arasindaki bosluk SATIRINI kaldirmayi, bunun yerine\n       lejantin HEMEN USTUNDEKI alan-adi satiriyla lejant satirlari arasina\n       bir bosluk satiri eklemeyi istedi -- toplam kaplanan dikey alan AYNI\n       (1mm+3mm+3mm = eskiden 3mm+3mm+1mm), sadece boslugun YERI degisti,\n       bu yuzden LIST_HEADER_ROW_COST kalibrasyonu ETKILENMEZ. */\n    .legend-entry-title { font-weight: 600; margin-bottom: 1mm; }\n    .legend-entry-subtitle { color: #525252; margin-bottom: 3mm; }\n    .legend-entry-column { font-weight: 600; margin-bottom: 3mm; }\n    .legend-image { max-width: 100%; display: block; }\n    .legend-row { display: flex; align-items: center; gap: 4px; }\n    .legend-swatch { flex: none; width: 8px; height: 8px; border-radius: 2px; }\n    .legend-value { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n    .legend-empty { color: #525252; }\n  ';
}
const OVERLAY_INSET_PX = 12, CONTINUATION_PAGE_SAFETY_MARGIN_MM = 10;
function buildPrintPreviewDocument(_0x1039c5, _0x683325) {
  _0x1039c5["title"] = _0x683325["printTitle"] || "Yazdır", _0x1039c5["head"]["appendChild"](buildPageStyle(_0x1039c5, _0x683325));
  const _0x3a7e4b = _0x1039c5["createElement"]("div");
  _0x3a7e4b["className"] = "print-page";
  if (_0x683325["printTitle"]) _0x3a7e4b["appendChild"](buildHeader(_0x1039c5, _0x683325));
  _0x3a7e4b["appendChild"](buildImageContainer(_0x1039c5, _0x683325)), _0x1039c5["body"]["appendChild"](_0x3a7e4b), appendDatasetsSection(_0x1039c5, _0x3a7e4b, _0x683325);
  if (_0x683325["footerText"]) _0x3a7e4b["appendChild"](buildFooter(_0x1039c5, _0x683325["footerText"], _0x683325["footerHeightMm"]));
}
function buildDatasetsSectionWrapper(_0x50828b) {
  const _0x7636c5 = _0x50828b["createElement"]("div");
  return _0x7636c5["className"] = "datasets-section datasets-section-bounded", _0x7636c5["appendChild"](buildDisclaimerBox(_0x50828b)), _0x7636c5["appendChild"](buildDatasetsSectionTitle(_0x50828b)), _0x7636c5;
}
function buildDatasetsSectionTitleWrapper(_0x21744f) {
  const _0x4ec4e5 = _0x21744f["createElement"]("div");
  return _0x4ec4e5["className"] = "datasets-section datasets-section-bounded", _0x4ec4e5["appendChild"](buildDatasetsSectionTitle(_0x21744f)), _0x4ec4e5;
}
function appendDatasetsSection(_0x2b8b2e, _0x1b3445, _0x467006) {
  if (_0x467006["datasetNames"]["length"] === 0) {
    const _0x28099b = buildDatasetsSectionWrapper(_0x2b8b2e);
    _0x28099b["appendChild"](buildEmptyDatasetsMessage(_0x2b8b2e)), _0x1b3445["appendChild"](_0x28099b);
    return;
  }
  const _0x486450 = _0x2b8b2e["createElement"]("div");
  _0x486450["className"] = "datasets-section", _0x486450["appendChild"](buildDisclaimerBox(_0x2b8b2e)), _0x1b3445["appendChild"](_0x486450);
  const _0x55e5d7 = _0x467006["pageHeightMm"] - 2 * _0x467006["pageMarginMm"] - CONTINUATION_PAGE_SAFETY_MARGIN_MM, _0x5241dd = computeDatasetsListMaxHeightMm(_0x467006), _0x4062f1 = Math["max"](0, _0x55e5d7 - DATASETS_HEADER_BLOCK_MM);
  if (!_0x467006["showLegend"]) {
    const _0x575947 = paginateDatasetNames(_0x467006["datasetNames"], _0x5241dd, _0x55e5d7), _0x3b69bb = _0x575947["page1Names"]["length"] === 0 && _0x575947["continuationPages"]["length"] > 0, { page1Names: _0x190cfa, continuationPages: _0x29e627 } = _0x3b69bb ? paginateDatasetNames(_0x467006["datasetNames"], _0x4062f1, _0x55e5d7) : _0x575947;
    if (_0x3b69bb) _0x2b8b2e["body"]["appendChild"](buildDatasetNameContinuationPage(_0x2b8b2e, _0x190cfa, _0x467006["pageWidthMm"], _0x4062f1, _0x467006["pageMarginMm"], !![]));
    else {
      const _0x5b6d50 = buildDatasetsSectionTitleWrapper(_0x2b8b2e);
      _0x5b6d50["appendChild"](buildDatasetNameList(_0x2b8b2e, _0x190cfa)), _0x1b3445["appendChild"](_0x5b6d50);
    }
    for (const _0x4523a8 of _0x29e627) {
      _0x2b8b2e["body"]["appendChild"](buildDatasetNameContinuationPage(_0x2b8b2e, _0x4523a8, _0x467006["pageWidthMm"], _0x55e5d7, _0x467006["pageMarginMm"]));
    }
    return;
  }
  const _0x57d20d = paginateLegendEntries(_0x467006["legendEntries"], _0x5241dd, _0x55e5d7), _0x508239 = _0x57d20d["page1Entries"]["length"] === 0 && _0x57d20d["continuationPages"]["length"] > 0, { page1Entries: _0x37117d, continuationPages: _0x1945a9 } = _0x508239 ? paginateLegendEntries(_0x467006["legendEntries"], _0x4062f1, _0x55e5d7) : _0x57d20d;
  if (_0x508239) _0x2b8b2e["body"]["appendChild"](buildLegendContinuationPage(_0x2b8b2e, _0x37117d, _0x467006["pageWidthMm"], _0x4062f1, _0x467006["pageMarginMm"], !![]));
  else {
    const _0xf8bc35 = buildDatasetsSectionTitleWrapper(_0x2b8b2e), _0x109095 = buildLegendSection(_0x2b8b2e, _0x37117d);
    if (_0x109095) _0xf8bc35["appendChild"](_0x109095);
    _0x1b3445["appendChild"](_0xf8bc35);
  }
  for (const _0x43bc50 of _0x1945a9) {
    _0x2b8b2e["body"]["appendChild"](buildLegendContinuationPage(_0x2b8b2e, _0x43bc50, _0x467006["pageWidthMm"], _0x55e5d7, _0x467006["pageMarginMm"]));
  }
}
function buildPreviewToolbar(_0x32a6d5, _0x3d0909) {
  const _0x3b81f4 = _0x32a6d5["createElement"]("div");
  _0x3b81f4["className"] = "preview-toolbar";
  const _0x166588 = _0x32a6d5["createElement"]("button");
  _0x166588["type"] = "button", _0x166588["className"] = "preview-toolbar-btn", _0x166588["textContent"] = "Yazdır", _0x166588["addEventListener"]("click", _0x3d0909["onPrint"]);
  const _0x1f3ff8 = _0x32a6d5["createElement"]("button");
  _0x1f3ff8["type"] = "button", _0x1f3ff8["className"] = "preview-toolbar-btn", _0x1f3ff8["textContent"] = "Kapat", _0x1f3ff8["addEventListener"]("click", _0x3d0909["onClose"]), _0x3b81f4["append"](_0x166588, _0x1f3ff8), _0x32a6d5["body"]["appendChild"](_0x3b81f4);
}
function buildHeader(_0x5621ea, _0x3ff0c6) {
  const _0x28317f = _0x5621ea["createElement"]("div");
  _0x28317f["className"] = "print-header";
  const _0x10422a = _0x5621ea["createElement"]("h1");
  _0x10422a["textContent"] = _0x3ff0c6["printTitle"];
  const _0x7c899f = _0x5621ea["createElement"]("div");
  return _0x7c899f["className"] = "print-date", _0x7c899f["textContent"] = formatPrintTimestamp(_0x3ff0c6["printDate"]), _0x28317f["append"](_0x10422a, _0x7c899f), _0x28317f;
}
function formatPrintTimestamp(_0x47b8ef) {
  return _0x47b8ef["toLocaleString"]("tr-TR", { "year": "numeric", "month": "2-digit", "day": "2-digit", "hour": "2-digit", "minute": "2-digit" });
}
function computeVisibleImageOffsetPct(_0x1cb003, _0x2601e2, _0x284ec4) {
  const _0x570ee7 = _0x1cb003 / _0x2601e2;
  if (_0x284ec4 > _0x570ee7) {
    const _0x3df1bb = _0x570ee7 / _0x284ec4;
    return { "offsetXPct": 0, "offsetYPct": (1 - _0x3df1bb) / 2 * 100 };
  }
  const _0x3bfb58 = _0x284ec4 / _0x570ee7;
  return { "offsetXPct": (1 - _0x3bfb58) / 2 * 100, "offsetYPct": 0 };
}
function buildImageContainer(_0x288351, _0x33ba87) {
  const _0x883980 = _0x288351["createElement"]("div");
  _0x883980["className"] = "map-frame";
  const _0x39cb5f = _0x33ba87["imageHeightMm"] / _0x33ba87["imageWidthMm"] * 100;
  _0x883980["style"]["setProperty"]("--frame-aspect-pct", _0x39cb5f + "%");
  const _0x1d86f3 = _0x288351["createElement"]("img");
  _0x1d86f3["src"] = _0x33ba87["imageBlobUrl"], _0x883980["appendChild"](_0x1d86f3);
  const { offsetXPct: _0xf37fd0, offsetYPct: _0x3413a6 } = computeVisibleImageOffsetPct(_0x33ba87["imageWidthMm"], _0x33ba87["imageHeightMm"], _0x33ba87["captureAspectRatio"]);
  return _0x33ba87["showNorthArrow"] && _0x883980["appendChild"](buildNorthArrow(_0x288351, _0x33ba87["northArrowRotationDeg"], _0xf37fd0, _0x3413a6)), _0x33ba87["showScaleBar"] && _0x33ba87["scaleRatioLabel"] && _0x883980["appendChild"](buildScaleBar(_0x288351, _0x33ba87["scaleRatioLabel"], _0xf37fd0, _0x3413a6)), _0x883980;
}
function buildNorthArrow(_0x5bb479, _0x4c4751, _0x58d710, _0xcd68a3) {
  const _0x167c90 = _0x5bb479["createElement"]("div");
  _0x167c90["className"] = "north-arrow", _0x167c90["style"]["top"] = "calc(" + _0xcd68a3 + "% + " + OVERLAY_INSET_PX + "px)", _0x167c90["style"]["right"] = "calc(" + _0x58d710 + "% + " + OVERLAY_INSET_PX + "px)", _0x167c90["style"]["transform"] = "rotate(" + _0x4c4751 + "deg)";
  const _0x55ecf1 = _0x5bb479["createElement"]("img");
  return _0x55ecf1["src"] = NORTH_ARROW_DATA_URI, _0x55ecf1["alt"] = "Kuzey Oku", _0x167c90["appendChild"](_0x55ecf1), _0x167c90;
}
function buildScaleBar(_0x47d340, _0x357370, _0x4a188a, _0x5e8d30) {
  const _0x46d3fe = _0x47d340["createElement"]("div");
  return _0x46d3fe["className"] = "scale-bar", _0x46d3fe["style"]["left"] = "calc(" + _0x4a188a + "% + " + OVERLAY_INSET_PX + "px)", _0x46d3fe["style"]["bottom"] = "calc(" + _0x5e8d30 + "% + " + OVERLAY_INSET_PX + "px)", _0x46d3fe["textContent"] = _0x357370, _0x46d3fe;
}
function buildFooter(_0xf92a36, _0x148153, _0x108af5) {
  const _0x3abe7f = _0xf92a36["createElement"]("div");
  return _0x3abe7f["className"] = "print-footer", _0x3abe7f["style"]["height"] = _0x108af5 + "mm", _0x3abe7f["style"]["paddingTop"] = "6mm", _0x3abe7f["textContent"] = _0x148153, _0x3abe7f;
}
const PREVIEW_WIDTH_PX = 1450, PREVIEW_MAX_HEIGHT_PX = 1e3, PREVIEW_VIEWPORT_WIDTH_RATIO = 0.9, PREVIEW_VIEWPORT_HEIGHT_RATIO = 0.85, PREVIEW_PAGE_GAP_PX = 24, PREVIEW_BODY_PADDING_PX = 24;
class PrintPreviewOverlayController {
  constructor() {
    this["_overlayEl"] = null, this["_iframe"] = null, this["_imageUrl"] = null;
  }
  async ["show"](_0x43f4d2, _0x25c594) {
    this["_imageUrl"] = URL["createObjectURL"](_0x43f4d2);
    const _0x2d5225 = this["_ensureOverlay"]();
    this["_sizeIframe"](_0x2d5225), await new Promise((_0x59ba07) => {
      _0x2d5225["addEventListener"]("load", () => _0x59ba07(), { "once": !![] }), _0x2d5225["srcdoc"] = "<!doctype html><html><head></head><body></body></html>";
    });
    const _0x38e69d = _0x2d5225["contentDocument"];
    if (!_0x38e69d) return;
    buildPrintPreviewDocument(_0x38e69d, { ..._0x25c594, "imageBlobUrl": this["_imageUrl"] }), this["_paginatePreview"](_0x38e69d, _0x2d5225), buildPreviewToolbar(_0x38e69d, { "onPrint": () => this["_triggerNativePrint"](), "onClose": () => this["close"]() });
  }
  ["close"]() {
    var _a2;
    (_a2 = this["_overlayEl"]) == null ? void 0 : _a2["remove"](), this["_overlayEl"] = null, this["_iframe"] = null, this["_imageUrl"] && (URL["revokeObjectURL"](this["_imageUrl"]), this["_imageUrl"] = null);
  }
  ["_paginatePreview"](_0x3575dd, _0x1449e6) {
    const _0x34f3b4 = Array["from"](_0x3575dd["querySelectorAll"](".print-page, .legend-continuation-page")), _0x349b85 = _0x34f3b4[0];
    if (!_0x349b85) return;
    const _0x1be757 = _0x349b85["offsetWidth"], _0x5e4933 = _0x349b85["offsetHeight"];
    if (_0x1be757 === 0 || _0x5e4933 === 0) return;
    const _0x4d4fa0 = 2 * PREVIEW_BODY_PADDING_PX + Math["max"](0, _0x34f3b4["length"] - 1) * PREVIEW_PAGE_GAP_PX, _0x24ac05 = Math["max"](0, _0x1449e6["clientHeight"] - _0x4d4fa0), _0x51a3ec = Math["min"](_0x1449e6["clientWidth"] / _0x1be757, _0x24ac05 / _0x5e4933);
    for (const _0x5c4ece of _0x34f3b4) {
      const _0x471d26 = _0x3575dd["createElement"]("div");
      _0x471d26["className"] = "print-page-viewport", _0x5c4ece["replaceWith"](_0x471d26), _0x471d26["appendChild"](_0x5c4ece);
    }
    const _0x440988 = _0x3575dd["createElement"]("style");
    _0x440988["textContent"] = "\n      @media screen {\n        html, body { background: #e0e0e0; }\n        body { display: flex; flex-direction: column; align-items: center; gap: " + PREVIEW_PAGE_GAP_PX + "px; padding: " + PREVIEW_BODY_PADDING_PX + "px 0; box-sizing: border-box; }\n        .print-page-viewport { width: " + Math["round"](_0x1be757 * _0x51a3ec) + "px; height: " + Math["round"](_0x5e4933 * _0x51a3ec) + "px; overflow: hidden; flex: none; background: #ffffff; box-shadow: 0 2px 8px rgba(0,0,0,0.35); }\n        .print-page, .legend-continuation-page { transform: scale(" + _0x51a3ec + "); transform-origin: top left; }\n      }\n      @media print {\n        html, body { background: none; }\n        body { display: block; padding: 0; }\n        .print-page-viewport { width: auto; height: auto; overflow: visible; background: none; box-shadow: none; }\n        .print-page, .legend-continuation-page { transform: none; }\n      }\n    ", _0x3575dd["head"]["appendChild"](_0x440988);
  }
  ["_triggerNativePrint"]() {
    var _a2, _b;
    (_b = (_a2 = this["_iframe"]) == null ? void 0 : _a2["contentWindow"]) == null ? void 0 : _b["print"]();
  }
  ["_ensureOverlay"]() {
    if (this["_iframe"]) return this["_iframe"];
    const _0x15a973 = document["createElement"]("div");
    _0x15a973["style"]["cssText"] = "position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,0.6);display:flex;align-items:center;justify-content:center;padding:2rem;overflow:auto;";
    const _0x252121 = document["createElement"]("iframe");
    return _0x252121["style"]["cssText"] = "background:#fff;border:none;box-shadow:0 4px 16px rgba(0,0,0,0.3);flex:none;", _0x15a973["appendChild"](_0x252121), document["body"]["appendChild"](_0x15a973), this["_overlayEl"] = _0x15a973, this["_iframe"] = _0x252121, _0x252121;
  }
  ["_sizeIframe"](_0x39f9d2) {
    const _0x57ef84 = Math["min"](window["innerWidth"] * PREVIEW_VIEWPORT_WIDTH_RATIO, PREVIEW_WIDTH_PX), _0xb6962b = Math["min"](window["innerHeight"] * PREVIEW_VIEWPORT_HEIGHT_RATIO, PREVIEW_MAX_HEIGHT_PX);
    _0x39f9d2["style"]["width"] = Math["round"](_0x57ef84) + "px", _0x39f9d2["style"]["height"] = Math["round"](_0xb6962b) + "px";
  }
}
function calculateScaleRatio(_0x4b7f17, _0x561c03) {
  const _0x21f2c9 = Math["round"](_0x4b7f17 / _0x561c03);
  return { "label": "1/" + _0x21f2c9, "denominator": _0x21f2c9 };
}
function getVisibleDataLayers(_0xdf071d) {
  return _0xdf071d["filter"]((_0x5c6eb9) => !_0x5c6eb9["isBasemap"] && _0x5c6eb9["cesiumObject"]["show"] !== ![]);
}
function collectVisibleDatasetNames(_0x5b204e) {
  return getVisibleDataLayers(_0x5b204e)["map"]((_0x4fe0de) => _0x4fe0de["title"]);
}
async function collectPrintLegendEntries(_0x4c078c, _0x822769) {
  const _0x3906c4 = getVisibleDataLayers(_0x822769), _0x24dc37 = await Promise["allSettled"](_0x3906c4["map"]((_0x1d494c) => resolveLegendEntry(_0x4c078c, _0x1d494c)));
  return _0x24dc37["map"]((_0x21cfaa, _0x84206f) => _0x21cfaa["status"] === "fulfilled" ? _0x21cfaa["value"] : buildEmptyEntry(_0x3906c4[_0x84206f]["title"], "Lejant yüklenemedi."));
}
async function resolveLegendEntry(_0x2044fb, _0x27fbda) {
  var _a2;
  if (_0x27fbda["layerType"] === "WMS") return buildImageEntry(_0x27fbda["title"], _0x2044fb["getWmsLegendGraphicUrl"](_0x27fbda["id"]));
  if (_0x27fbda["layerType"] === "WMTS") {
    const _0x4a32f7 = await _0x2044fb["getWmtsAvailableStyles"](_0x27fbda["id"]), _0x1b2ab8 = (_a2 = _0x4a32f7[0]) == null ? void 0 : _a2["legendUrl"];
    return _0x1b2ab8 ? buildImageEntry(_0x27fbda["title"], _0x1b2ab8) : buildEmptyEntry(_0x27fbda["title"], "Lejant bulunamadı.");
  }
  return buildVectorEntry(_0x27fbda["title"], _0x2044fb["getLayerStyle"](_0x27fbda["id"]));
}
function buildImageEntry(_0x4330d6, _0x59c217) {
  return { "layerTitle": _0x4330d6, "kind": "image", "imageUrl": _0x59c217 };
}
function buildEmptyEntry(_0x3724e9, _0x1a9bd5) {
  return { "layerTitle": _0x3724e9, "kind": "empty", "message": _0x1a9bd5 };
}
function buildVectorEntry(_0x2565ca, _0x3dbe84) {
  if (!_0x3dbe84) return buildEmptyEntry(_0x2565ca, "Henüz stil uygulanmadı.");
  switch (_0x3dbe84["fill"]["mode"]) {
    case "gradient":
      return buildGradientEntry(_0x2565ca, _0x3dbe84["fill"]["column"], _0x3dbe84["fill"]["palette"], _0x3dbe84["fill"]["paletteKind"], _0x3dbe84["fill"]["min"], _0x3dbe84["fill"]["max"]);
    case "bin":
      return buildBinEntry(_0x2565ca, _0x3dbe84["fill"]["column"], _0x3dbe84["fill"]["palette"], _0x3dbe84["fill"]["paletteKind"], _0x3dbe84["fill"]["min"], _0x3dbe84["fill"]["max"], _0x3dbe84["fill"]["binCount"]);
    case "enum":
      return buildEnumEntry(_0x2565ca, _0x3dbe84["fill"]["column"], _0x3dbe84["fill"]["colors"]);
    case "solid":
    case "off":
    default:
      return buildEmptyEntry(_0x2565ca, "Bu katman sabit renkli, lejant gerekmiyor.");
  }
}
function buildGradientEntry(_0x5a9b9a, _0x3f2ecf, _0x25b982, _0x4d9a21, _0x49892e, _0x56a4b8) {
  if (_0x49892e === void 0 || _0x56a4b8 === void 0) return buildEmptyEntry(_0x5a9b9a, "Aralık hesaplanamadı.");
  const _0x5ba61c = gradientLegendRows(_0x49892e, _0x56a4b8, (_0xae29a6) => sampleFromPaletteCss(_0x25b982, _0xae29a6, _0x4d9a21));
  return { "layerTitle": _0x5a9b9a, "kind": "gradient", "rows": _0x5ba61c, "displayColumn": _0x3f2ecf };
}
function buildBinEntry(_0x4a925c, _0x16e78f, _0x52f4bd, _0x1acfe1, _0x24e12e, _0x1fa7b7, _0x2baac8) {
  if (_0x24e12e === void 0 || _0x1fa7b7 === void 0) return buildEmptyEntry(_0x4a925c, "Aralık hesaplanamadı.");
  const _0x37ec26 = binLegendRows(_0x24e12e, _0x1fa7b7, _0x2baac8, (_0xea1493) => sampleFromPaletteCss(_0x52f4bd, _0xea1493, _0x1acfe1));
  return { "layerTitle": _0x4a925c, "kind": "bin", "rows": _0x37ec26, "displayColumn": _0x16e78f };
}
function buildEnumEntry(_0x5eb036, _0x4864e9, _0x284092) {
  const _0x149dd6 = Object["entries"](_0x284092);
  if (_0x149dd6["length"] === 0) return buildEmptyEntry(_0x5eb036, "Kategori bulunamadı.");
  const _0x523004 = [..._0x149dd6]["sort"](([_0x49ef2e], [_0x53cab0]) => compareCategoryKeys(_0x49ef2e, _0x53cab0));
  return { "layerTitle": _0x5eb036, "kind": "enum", "rows": _0x523004["map"](([_0x32b201, _0x4cfd9e]) => ({ "color": _0x4cfd9e, "label": _0x32b201 })), "displayColumn": _0x4864e9 };
}
const MM_PER_INCH = 25.4, SCREEN_DPI = 96, SCREEN_METERS_PER_PIXEL = MM_PER_INCH / SCREEN_DPI / 1e3, PAGE_MARGIN_MM = 8, HEADER_BLOCK_HEIGHT_MM = 14, FOOTER_BLOCK_HEIGHT_MM = 12, IMAGE_TOP_HALF_RATIO = 0.5;
async function buildPrintPreviewInput(_0x648e7d) {
  const { map: _0x1f1767, pageDims: _0x498007 } = _0x648e7d, _0xdd4c10 = _0x648e7d["printTitle"] ? HEADER_BLOCK_HEIGHT_MM : 0, _0x4a9383 = _0x648e7d["footerText"] ? FOOTER_BLOCK_HEIGHT_MM : 0, _0x4d6cbd = computeImageContentDimensionsMm(_0x498007, _0xdd4c10, _0x4a9383), _0x475abc = computeScaleRatioLabel(_0x1f1767, _0x648e7d["showScaleBar"]), _0x522f18 = _0x1f1767["viewer"]["canvas"], _0x47b1e6 = _0x522f18["clientHeight"] > 0 ? _0x522f18["clientWidth"] / _0x522f18["clientHeight"] : 1, _0x1c50eb = -((_0x1f1767["viewer"]["camera"]["heading"] ?? 0) * 180) / Math["PI"], _0x4be6bf = collectVisibleDatasetNames(_0x1f1767["layerManager"]["getLayers"]()), _0x66306f = await resolvePrintLegendEntries(_0x1f1767, _0x648e7d["showLegend"]);
  return { "imageWidthMm": _0x4d6cbd["contentWidthMm"], "imageHeightMm": _0x4d6cbd["contentHeightMm"], "captureAspectRatio": _0x47b1e6, "printTitle": _0x648e7d["printTitle"], "printDate": /* @__PURE__ */ new Date(), "footerText": _0x648e7d["footerText"], "showNorthArrow": _0x648e7d["showNorthArrow"], "northArrowRotationDeg": _0x1c50eb, "showScaleBar": _0x648e7d["showScaleBar"], "scaleRatioLabel": _0x475abc, "pageWidthMm": _0x498007["widthMm"], "pageHeightMm": _0x498007["heightMm"], "pageMarginMm": PAGE_MARGIN_MM, "headerHeightMm": _0xdd4c10, "footerHeightMm": _0x4a9383, "showLegend": _0x648e7d["showLegend"], "datasetNames": _0x4be6bf, "legendEntries": _0x66306f };
}
async function resolvePrintLegendEntries(_0x5d9ae0, _0x32be42) {
  if (!_0x32be42) return [];
  const _0xb6d4f0 = _0x5d9ae0["layerManager"];
  return collectPrintLegendEntries(_0xb6d4f0, _0xb6d4f0["getLayers"]());
}
function computeImageContentDimensionsMm(_0x3e4c11, _0x168ca0, _0x3a80c1) {
  const _0x3bf03f = _0x3e4c11["heightMm"] - 2 * PAGE_MARGIN_MM - _0x168ca0 - _0x3a80c1, _0x18eff6 = _0x3e4c11["heightMm"] * IMAGE_TOP_HALF_RATIO;
  return { "contentWidthMm": _0x3e4c11["widthMm"] - 2 * PAGE_MARGIN_MM, "contentHeightMm": Math["min"](_0x3bf03f, _0x18eff6) };
}
function computeScaleRatioLabel(_0x525f27, _0x323611) {
  if (!_0x323611) return null;
  const _0x10d5c2 = _0x525f27["measureGroundMetersPerPixel"]();
  return _0x10d5c2 !== null ? calculateScaleRatio(_0x10d5c2, SCREEN_METERS_PER_PIXEL)["label"] : null;
}
const PAPER_SIZES_MM = { "a0": { "widthMm": 841, "heightMm": 1189, "label": "A0" }, "a1": { "widthMm": 594, "heightMm": 841, "label": "A1" }, "a2": { "widthMm": 420, "heightMm": 594, "label": "A2" }, "a3": { "widthMm": 297, "heightMm": 420, "label": "A3" }, "a4": { "widthMm": 210, "heightMm": 297, "label": "A4" }, "a5": { "widthMm": 148, "heightMm": 210, "label": "A5" } }, ORIENTATION_LABELS = { "landscape": "Yatay", "portrait": "Dikey" };
function getPageDimensionsMm(_0x5c082e, _0x1beeae) {
  const _0x53ebba = PAPER_SIZES_MM[_0x5c082e];
  return _0x1beeae === "landscape" ? { "widthMm": _0x53ebba["heightMm"], "heightMm": _0x53ebba["widthMm"] } : { "widthMm": _0x53ebba["widthMm"], "heightMm": _0x53ebba["heightMm"] };
}
var __defProp$g = Object["defineProperty"], __getOwnPropDesc$h = Object["getOwnPropertyDescriptor"], __decorateClass$h = (_0x27dc32, _0x191e98, _0x357a66, _0x448fb8) => {
  var _0x109a9b = _0x448fb8 > 1 ? void 0 : _0x448fb8 ? __getOwnPropDesc$h(_0x191e98, _0x357a66) : _0x191e98;
  for (var _0x4de503 = _0x27dc32["length"] - 1, _0x9671ab; _0x4de503 >= 0; _0x4de503--) if (_0x9671ab = _0x27dc32[_0x4de503]) _0x109a9b = (_0x448fb8 ? _0x9671ab(_0x191e98, _0x357a66, _0x109a9b) : _0x9671ab(_0x109a9b)) || _0x109a9b;
  if (_0x448fb8 && _0x109a9b) __defProp$g(_0x191e98, _0x357a66, _0x109a9b);
  return _0x109a9b;
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
              @change=${(_0xa11827) => {
      var _a2;
      return (_a2 = this["onPaperSizeChange"]) == null ? void 0 : _a2.call(this, _0xa11827["target"]["value"]);
    }}
            >
              ${Object["entries"](PAPER_SIZES_MM)["map"](([_0x2e07b6, _0x2cbb67]) => b`<option value=${_0x2e07b6} ?selected=${_0x2e07b6 === this["paperSize"]}>${_0x2cbb67["label"]}</option>`)}
            </select>
          </label>
          <label class="field">
            Yön
            <select
              @change=${(_0x7ee9f5) => {
      var _a2;
      return (_a2 = this["onOrientationChange"]) == null ? void 0 : _a2.call(this, _0x7ee9f5["target"]["value"]);
    }}
            >
              ${Object["entries"](ORIENTATION_LABELS)["map"](([_0x4d97c9, _0x3d2df3]) => b`<option value=${_0x4d97c9} ?selected=${_0x4d97c9 === this["orientation"]}>${_0x3d2df3}</option>`)}
            </select>
          </label>
        </div>
        ${this["showNorthArrowCheckbox"] ? b`<label class="checkbox-row">
              <input
                type="checkbox"
                .checked=${this["showNorthArrow"]}
                @change=${(_0x3cf641) => {
      var _a2;
      return (_a2 = this["onNorthArrowToggle"]) == null ? void 0 : _a2.call(this, _0x3cf641["target"]["checked"]);
    }}
              />
              Kuzey Oku Göster
            </label>` : ""}
        ${this["showScaleBarCheckbox"] ? b`<label class="checkbox-row">
              <input
                type="checkbox"
                .checked=${this["showScaleBar"]}
                @change=${(_0x1aa6d6) => {
      var _a2;
      return (_a2 = this["onScaleBarToggle"]) == null ? void 0 : _a2.call(this, _0x1aa6d6["target"]["checked"]);
    }}
              />
              Ölçek Oranı Göster
            </label>` : ""}
        ${this["showLegendCheckbox"] ? b`<label class="checkbox-row">
              <input
                type="checkbox"
                .checked=${this["showLegend"]}
                @change=${(_0x22d113) => {
      var _a2;
      return (_a2 = this["onLegendToggle"]) == null ? void 0 : _a2.call(this, _0x22d113["target"]["checked"]);
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
var __defProp$f = Object["defineProperty"], __getOwnPropDesc$g = Object["getOwnPropertyDescriptor"], __decorateClass$g = (_0x1697d0, _0x2cc1e8, _0x431379, _0x5d0977) => {
  var _0x321dee = _0x5d0977 > 1 ? void 0 : _0x5d0977 ? __getOwnPropDesc$g(_0x2cc1e8, _0x431379) : _0x2cc1e8;
  for (var _0x37801d = _0x1697d0["length"] - 1, _0x1494b2; _0x37801d >= 0; _0x37801d--) if (_0x1494b2 = _0x1697d0[_0x37801d]) _0x321dee = (_0x5d0977 ? _0x1494b2(_0x2cc1e8, _0x431379, _0x321dee) : _0x1494b2(_0x321dee)) || _0x321dee;
  if (_0x5d0977 && _0x321dee) __defProp$f(_0x2cc1e8, _0x431379, _0x321dee);
  return _0x321dee;
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
    const _0x390d51 = document["createElement"]("tucbs-slide-over-panel");
    _0x390d51["panelTitle"] = "Yazdır", _0x390d51["panelWidth"] = this["panelWidth"], _0x390d51["scrollBody"] = ![], _0x390d51["onCloseRequest"] = () => this["_toggle"](), document["body"]["appendChild"](_0x390d51), this["_panelEl"] = _0x390d51, this["_renderIntoPanel"]();
  }
  ["disconnectedCallback"]() {
    var _a2;
    if (this["map"]) this["_layoutController"]["unbindMap"](this["map"]);
    (_a2 = this["_panelEl"]) == null ? void 0 : _a2["remove"](), this["_panelEl"] = null, this["_previewController"]["close"](), super["disconnectedCallback"]();
  }
  ["firstUpdated"]() {
    bindMapByElementId(this, { "noIdTiming": "sync", ...standardMapBindingMessages("tucbs-print-tool", "islevsiz") });
  }
  ["updated"](_0x436f61) {
    _0x436f61["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_customCssState"], "tucbs-print-tool");
    if (_0x436f61["has"]("map")) {
      const _0x14ac6f = _0x436f61["get"]("map");
      if (_0x14ac6f) this["_layoutController"]["unbindMap"](_0x14ac6f);
      if (this["map"]) this["_layoutController"]["bindMap"](this["map"]);
    }
    if (_0x436f61["has"]("panelWidth") && this["_open"]) this["_layoutController"]["setOpen"](!![], this["panelWidth"]);
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
    const _0x535bde = await this["map"]["captureScreenshotBlob"](), _0x187654 = await buildPrintPreviewInput({ "map": this["map"], "pageDims": getPageDimensionsMm(this["_selectedPaperSize"], this["_selectedOrientation"]), "printTitle": this["printTitle"], "footerText": this["footerText"], "showNorthArrow": this["_showNorthArrow"], "showScaleBar": this["_showScaleBar"], "showLegend": this["_showLegend"] });
    await this["_previewController"]["show"](_0x535bde, _0x187654);
  }
  ["_onPaperSizeChange"](_0x34c4e5) {
    this["_selectedPaperSize"] = _0x34c4e5;
  }
  ["_onOrientationChange"](_0x1cc8d2) {
    this["_selectedOrientation"] = _0x1cc8d2;
  }
  ["_onNorthArrowToggle"](_0x434fc9) {
    this["_showNorthArrow"] = _0x434fc9;
  }
  ["_onScaleBarToggle"](_0x3fc91f) {
    this["_showScaleBar"] = _0x3fc91f;
  }
  ["_onLegendToggle"](_0x17f143) {
    this["_showLegend"] = _0x17f143;
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
          .onPaperSizeChange=${(_0x4015cb) => this["_onPaperSizeChange"](_0x4015cb)}
          .onOrientationChange=${(_0x24e192) => this["_onOrientationChange"](_0x24e192)}
          .onNorthArrowToggle=${(_0x400722) => this["_onNorthArrowToggle"](_0x400722)}
          .onScaleBarToggle=${(_0x839a8e) => this["_onScaleBarToggle"](_0x839a8e)}
          .onLegendToggle=${(_0x49a9ca) => this["_onLegendToggle"](_0x49a9ca)}
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
function renderAnalysisHelp(_0x4a7124, _0x191743, _0x3c4b9c, _0xe48ef) {
  if (!_0x4a7124) return null;
  const _0x2d711e = (_0x286a4c) => _0x286a4c["stopPropagation"]();
  return b`
    <div class="help-back" @click=${_0xe48ef}>
      <div class="help-card" @click=${_0x2d711e}>
        <button type="button" class="help-close" aria-label="Kapat" @click=${_0xe48ef}>×</button>
        <h3>${_0x191743}</h3>
        <h4>Ne işe yarar</h4>
        ${_0x3c4b9c["ne"]["map"]((_0x45096a) => b`<p>${_0x45096a}</p>`)}
        <h4>Girdiler</h4>
        <ul>${_0x3c4b9c["girdiler"]["map"]((_0x503a97) => b`<li>${_0x503a97}</li>`)}</ul>
        <h4>Adımlar</h4>
        <ol>${_0x3c4b9c["adimlar"]["map"]((_0x3020d4) => b`<li>${_0x3020d4}</li>`)}</ol>
        <h4>Örnek</h4>
        <ol>${_0x3c4b9c["ornek"]["map"]((_0x3a557c) => b`<li>${_0x3a557c}</li>`)}</ol>
      </div>
    </div>
  `;
}
var __defProp$e = Object["defineProperty"], __getOwnPropDesc$f = Object["getOwnPropertyDescriptor"], __decorateClass$f = (_0x1ac0c1, _0x46486d, _0x4e94b4, _0x4fbbdb) => {
  var _0x23f1c5 = _0x4fbbdb > 1 ? void 0 : _0x4fbbdb ? __getOwnPropDesc$f(_0x46486d, _0x4e94b4) : _0x46486d;
  for (var _0x42f306 = _0x1ac0c1["length"] - 1, _0x54d7b2; _0x42f306 >= 0; _0x42f306--) if (_0x54d7b2 = _0x1ac0c1[_0x42f306]) _0x23f1c5 = (_0x4fbbdb ? _0x54d7b2(_0x46486d, _0x4e94b4, _0x23f1c5) : _0x54d7b2(_0x23f1c5)) || _0x23f1c5;
  if (_0x4fbbdb && _0x23f1c5) __defProp$e(_0x46486d, _0x4e94b4, _0x23f1c5);
  return _0x23f1c5;
};
let TucbsBufferTool = class extends i$2 {
  constructor() {
    super(...arguments), this["mapElementId"] = "", this["map"] = null, this["selectedLabel"] = "", this["distanceM"] = null, this["customCss"] = "", this["_distanceStr"] = "", this["_status"] = "idle", this["_message"] = "", this["_helpOpen"] = ![], this["_selectedFeature"] = null, this["_map"] = null, this["_mapHost"] = null, this["_customCssState"] = { "sheet": null }, this["_onEntityClick"] = (_0x3bbcfc) => {
      const _0x30ff91 = entityToGeoJSON(_0x3bbcfc["entity"]);
      if (!_0x30ff91) {
        this["_note"]("error", "Seçilen özellikten GeoJSON üretilemedi.");
        return;
      }
      this["_selectedFeature"] = { "type": "Feature", "id": _0x30ff91["id"], "properties": _0x30ff91["properties"] ?? {}, "geometry": _0x30ff91["geometry"] }, this["selectedLabel"] = featureLabel(_0x30ff91), this["_status"] = "idle", this["_message"] = "", this["_syncHighlight"]();
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
  ["updated"](_0x5a2385) {
    _0x5a2385["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_customCssState"], "tucbs-buffer-tool"), _0x5a2385["has"]("distanceM") && this["distanceM"] != null && (this["_distanceStr"] = String(this["distanceM"])), (_0x5a2385["has"]("mapElementId") || _0x5a2385["has"]("map")) && (this["_unbindMap"](), this["_bindMap"]());
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
    const _0x45ef16 = this["_resolveMapHost"]();
    if (!_0x45ef16) return;
    this["_mapHost"] = _0x45ef16;
    if (_0x45ef16["map"]) {
      this["_attachInteraction"](_0x45ef16["map"]);
      return;
    }
    _0x45ef16["addEventListener"]("ready", this["_onMapReady"], { "once": !![] });
  }
  ["_attachInteraction"](_0x444723) {
    if (this["_map"] === _0x444723) return;
    this["_map"] && (this["_map"]["interactionManager"]["off"]("entity:click", this["_onEntityClick"]), this["_map"]["interactionManager"]["resumeIdentify"]()), this["_map"] = _0x444723, _0x444723["interactionManager"]["on"]("entity:click", this["_onEntityClick"]), _0x444723["interactionManager"]["suspendIdentify"]();
  }
  ["_unbindMap"]() {
    this["_map"] && (this["_map"]["interactionManager"]["off"]("entity:click", this["_onEntityClick"]), this["_map"]["clearSelectionHighlight"](), this["_map"]["interactionManager"]["resumeIdentify"](), this["_map"] = null), this["_mapHost"] && (this["_mapHost"]["removeEventListener"]("ready", this["_onMapReady"]), this["_mapHost"] = null);
  }
  ["_onDistanceInput"](_0x4b0710) {
    const _0x173e78 = _0x4b0710["target"]["value"];
    this["_distanceStr"] = _0x173e78;
    const _0x358870 = Number(_0x173e78);
    this["distanceM"] = Number["isFinite"](_0x358870) ? _0x358870 : null;
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
    const _0x1bb576 = Number(this["_distanceStr"]);
    if (!this["_selectedFeature"]) {
      this["_note"]("error", "Lütfen haritada bir nesne seçin.");
      return;
    }
    if (!this["_distanceStr"] || Number["isNaN"](_0x1bb576) || _0x1bb576 <= 0) {
      this["_note"]("error", "Geçerli bir mesafe (metre) girin.");
      return;
    }
    !this["_map"] && this["_bindMap"]();
    const _0xa616db = this["_resolveMap"]();
    if (!_0xa616db) {
      this["_note"]("error", "Harita henüz hazır değil.");
      return;
    }
    this["_map"] = _0xa616db, this["distanceM"] = _0x1bb576, this["_status"] = "loading", this["_message"] = "İşleniyor…", this["dispatchEvent"](new CustomEvent("tucbs-buffer-run", { "detail": { "mapElementId": this["mapElementId"], "distanceM": _0x1bb576, "selectedLabel": this["selectedLabel"] }, "bubbles": !![], "composed": !![] }));
    try {
      const _0x4bd966 = "Tampon sonucu (" + _0x1bb576 + "m)";
      await _0xa616db["runBuffer"]({ "geojson": this["_selectedFeature"], "distanceM": _0x1bb576 }, { "title": _0x4bd966 }), this["_clearForm"](), this["_status"] = "idle", this["_message"] = "", showToast("success", "Tampon katmanı eklendi.");
    } catch (_0x388b01) {
      _0x388b01 instanceof TucbsError && console["error"]("[tucbs-buffer-tool] " + _0x388b01["code"] + " (" + _0x388b01["number"] + "): " + _0x388b01["message"]), this["_note"]("error", _0x388b01 instanceof Error ? _0x388b01["message"] : "Tampon üretimi başarısız.");
    }
  }
  ["_note"](_0x7a04d2, _0x374a1f) {
    this["_status"] = "idle", this["_message"] = "", showToast(_0x7a04d2, _0x374a1f);
  }
  ["render"]() {
    const _0x56efcc = this["_status"] === "loading", _0x14a1e0 = Boolean(this["_selectedFeature"] && this["_distanceStr"]) && !_0x56efcc;
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
            ?disabled=${_0x56efcc}
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
            ?disabled=${_0x56efcc}
            @input=${this["_onDistanceInput"]}
          />
          <span class="unit">m</span>
        </div>

        <div class="actions">
          <button class="run" type="button" ?disabled=${!_0x14a1e0} @click=${this["_onRun"]}>
            ${_0x56efcc ? "İşleniyor..." : "Çalıştır"}
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
var __defProp$d = Object["defineProperty"], __getOwnPropDesc$e = Object["getOwnPropertyDescriptor"], __decorateClass$e = (_0x5359a1, _0x121a80, _0x78e90, _0x4c35ba) => {
  var _0x1c41ee = _0x4c35ba > 1 ? void 0 : _0x4c35ba ? __getOwnPropDesc$e(_0x121a80, _0x78e90) : _0x121a80;
  for (var _0x38d2b2 = _0x5359a1["length"] - 1, _0x296c37; _0x38d2b2 >= 0; _0x38d2b2--) if (_0x296c37 = _0x5359a1[_0x38d2b2]) _0x1c41ee = (_0x4c35ba ? _0x296c37(_0x121a80, _0x78e90, _0x1c41ee) : _0x296c37(_0x1c41ee)) || _0x1c41ee;
  if (_0x4c35ba && _0x1c41ee) __defProp$d(_0x121a80, _0x78e90, _0x1c41ee);
  return _0x1c41ee;
};
function isPolygonFeature$1(_0x41845c) {
  var _a2;
  const _0x58a18d = (_a2 = _0x41845c == null ? void 0 : _0x41845c["geometry"]) == null ? void 0 : _a2["type"];
  return _0x58a18d === "Polygon" || _0x58a18d === "MultiPolygon";
}
let TucbsIntersectionTool = class extends i$2 {
  constructor() {
    super(...arguments), this["mapElementId"] = "", this["map"] = null, this["customCss"] = "", this["_labelA"] = "", this["_labelB"] = "", this["_status"] = "idle", this["_message"] = "", this["_helpOpen"] = ![], this["_featureA"] = null, this["_featureB"] = null, this["_pendingSlot"] = null, this["_map"] = null, this["_mapHost"] = null, this["_customCssState"] = { "sheet": null }, this["_onEntityClick"] = (_0x3e6c81) => {
      var _a2;
      if (!this["_pendingSlot"]) return;
      const _0x5af8cf = entityToGeoJSON(_0x3e6c81["entity"]);
      if (!_0x5af8cf) {
        this["_note"]("error", "Seçilen özellikten GeoJSON üretilemedi.");
        return;
      }
      const _0x21e90f = { "type": "Feature", "id": _0x5af8cf["id"], "properties": _0x5af8cf["properties"] ?? {}, "geometry": _0x5af8cf["geometry"] }, _0x39724d = (_a2 = _0x21e90f["geometry"]) == null ? void 0 : _a2["type"];
      if (_0x39724d !== "Polygon" && _0x39724d !== "MultiPolygon") {
        this["_note"]("error", "Kesişim için yalnızca poligon seçin.");
        return;
      }
      const _0x2de386 = featureLabel(_0x5af8cf);
      this["_pendingSlot"] === "a" ? (this["_featureA"] = _0x21e90f, this["_labelA"] = _0x2de386) : (this["_featureB"] = _0x21e90f, this["_labelB"] = _0x2de386), this["_pendingSlot"] = null, this["_status"] = "idle", this["_message"] = "", this["_syncHighlight"]();
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
  ["updated"](_0x265a2d) {
    _0x265a2d["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_customCssState"], "tucbs-intersection-tool"), (_0x265a2d["has"]("mapElementId") || _0x265a2d["has"]("map")) && (this["_unbindMap"](), this["_bindMap"]());
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
    const _0x43e0b4 = this["_resolveMapHost"]();
    if (!_0x43e0b4) return;
    this["_mapHost"] = _0x43e0b4;
    if (_0x43e0b4["map"]) {
      this["_attachInteraction"](_0x43e0b4["map"]);
      return;
    }
    _0x43e0b4["addEventListener"]("ready", this["_onMapReady"], { "once": !![] });
  }
  ["_attachInteraction"](_0x11c7e2) {
    if (this["_map"] === _0x11c7e2) return;
    this["_map"] && (this["_map"]["interactionManager"]["off"]("entity:click", this["_onEntityClick"]), this["_map"]["interactionManager"]["resumeIdentify"]()), this["_map"] = _0x11c7e2, _0x11c7e2["interactionManager"]["on"]("entity:click", this["_onEntityClick"]), _0x11c7e2["interactionManager"]["suspendIdentify"]();
  }
  ["_unbindMap"]() {
    this["_map"] && (this["_map"]["interactionManager"]["off"]("entity:click", this["_onEntityClick"]), this["_map"]["clearSelectionHighlight"](), this["_map"]["interactionManager"]["resumeIdentify"](), this["_map"] = null), this["_mapHost"] && (this["_mapHost"]["removeEventListener"]("ready", this["_onMapReady"]), this["_mapHost"] = null);
  }
  ["_note"](_0x2cc01a, _0x449764) {
    this["_status"] = "idle", this["_message"] = "", showToast(_0x2cc01a, _0x449764);
  }
  ["_beginSelection"](_0x5e164a) {
    this["_pendingSlot"] = _0x5e164a, this["_status"] = "idle", this["_note"]("info", _0x5e164a === "a" ? "Lütfen ilk poligonu seçin — haritada bir alana tıklayın." : "Lütfen ikinci poligonu seçin — haritada bir alana tıklayın.");
  }
  ["_onInputClick"](_0x377921) {
    this["_beginSelection"](_0x377921);
  }
  ["_onRefreshSlot"](_0x455e7d) {
    _0x455e7d === "a" ? (this["_featureA"] = null, this["_labelA"] = "") : (this["_featureB"] = null, this["_labelB"] = ""), this["_beginSelection"](_0x455e7d), this["_syncHighlight"]();
  }
  ["_clearForm"]() {
    this["_featureA"] = null, this["_featureB"] = null, this["_labelA"] = "", this["_labelB"] = "", this["_pendingSlot"] = null, this["_syncHighlight"]();
  }
  ["_syncHighlight"]() {
    var _a2;
    const _0x7b317c = [this["_featureA"], this["_featureB"]]["filter"]((_0x5f3ad5) => _0x5f3ad5 !== null);
    (_a2 = this["_map"]) == null ? void 0 : _a2["showSelectionHighlight"](_0x7b317c);
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
    const _0x217438 = this["_resolveMap"]();
    if (!_0x217438) {
      this["_note"]("error", "Harita henüz hazır değil.");
      return;
    }
    this["_map"] = _0x217438, this["_status"] = "loading", this["_message"] = "İşleniyor…", this["_pendingSlot"] = null, this["dispatchEvent"](new CustomEvent("tucbs-intersection-run", { "detail": { "mapElementId": this["mapElementId"], "labelA": this["_labelA"], "labelB": this["_labelB"] }, "bubbles": !![], "composed": !![] }));
    try {
      await _0x217438["runIntersection"]({ "geojsonA": this["_featureA"], "geojsonB": this["_featureB"] }, { "title": "Kesişim sonucu" }), this["_clearForm"](), this["_status"] = "idle", this["_message"] = "", showToast("success", "Kesişim tamamlandı.");
    } catch (_0x558d79) {
      _0x558d79 instanceof TucbsError && console["error"]("[tucbs-intersection-tool] " + _0x558d79["code"] + " (" + _0x558d79["number"] + "): " + _0x558d79["message"]), this["_note"]("error", _0x558d79 instanceof Error ? _0x558d79["message"] : "Kesişim hesaplanamadı.");
    }
  }
  ["render"]() {
    const _0xe19fd8 = this["_status"] === "loading", _0x12f4ed = isPolygonFeature$1(this["_featureA"]) && isPolygonFeature$1(this["_featureB"]) && !_0xe19fd8;
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
            ?disabled=${_0xe19fd8}
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
            ?disabled=${_0xe19fd8}
            @click=${() => this["_onInputClick"]("a")}
          />
          <button
            type="button"
            class="refresh"
            title="Yeniden seç"
            ?disabled=${_0xe19fd8}
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
            ?disabled=${_0xe19fd8}
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
            ?disabled=${_0xe19fd8}
            @click=${() => this["_onInputClick"]("b")}
          />
          <button
            type="button"
            class="refresh"
            title="Yeniden seç"
            ?disabled=${_0xe19fd8}
            @click=${() => this["_onRefreshSlot"]("b")}
          >
            ⟳
          </button>
        </div>

        <div class="actions">
          <button class="run" type="button" ?disabled=${!_0x12f4ed} @click=${this["_onRun"]}>
            ${_0xe19fd8 ? "İşleniyor..." : "Çalıştır"}
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
  constructor(_0xd3aa2b, _0x50342f, _0x292c16) {
    this["resolve"] = _0xd3aa2b, this["onPick"] = _0x50342f, this["onBadGeoJson"] = _0x292c16, this["map"] = null, this["host"] = null, this["onReady"] = () => {
      this["attach"]();
    }, this["onClick"] = (_0x133e5c) => {
      const _0x316d4e = entityToGeoJSON(_0x133e5c["entity"]);
      if (!_0x316d4e) {
        this["onBadGeoJson"]();
        return;
      }
      this["onPick"]({ "type": "Feature", "id": _0x316d4e["id"], "properties": _0x316d4e["properties"] ?? {}, "geometry": _0x316d4e["geometry"] }, featureLabel(_0x316d4e));
    };
  }
  ["attach"]() {
    const { map: _0x32c12c, mapElementId: _0x366c01 } = this["resolve"]();
    if (_0x32c12c) {
      this["listen"](_0x32c12c);
      return;
    }
    if (!_0x366c01) return;
    const _0x2876f3 = document["getElementById"](_0x366c01);
    if (!_0x2876f3) return;
    this["host"] = _0x2876f3;
    if (_0x2876f3["map"]) {
      this["listen"](_0x2876f3["map"]);
      return;
    }
    _0x2876f3["addEventListener"]("ready", this["onReady"], { "once": !![] });
  }
  ["detach"]() {
    this["map"] && (this["map"]["interactionManager"]["off"]("entity:click", this["onClick"]), this["map"]["clearSelectionHighlight"](), this["map"]["interactionManager"]["resumeIdentify"](), this["map"] = null), this["host"] && (this["host"]["removeEventListener"]("ready", this["onReady"]), this["host"] = null);
  }
  ["current"]() {
    return this["map"] ?? this["resolve"]()["map"];
  }
  ["highlight"](_0x4faa46) {
    var _a2;
    (_a2 = this["map"]) == null ? void 0 : _a2["showSelectionHighlight"](_0x4faa46);
  }
  ["listen"](_0xa12c89) {
    if (this["map"] === _0xa12c89) return;
    this["map"] && (this["map"]["interactionManager"]["off"]("entity:click", this["onClick"]), this["map"]["interactionManager"]["resumeIdentify"]()), this["map"] = _0xa12c89, _0xa12c89["interactionManager"]["on"]("entity:click", this["onClick"]), _0xa12c89["interactionManager"]["suspendIdentify"]();
  }
}
function isPolygonFeature(_0x445487) {
  var _a2;
  const _0x30a329 = (_a2 = _0x445487 == null ? void 0 : _0x445487["geometry"]) == null ? void 0 : _a2["type"];
  return _0x30a329 === "Polygon" || _0x30a329 === "MultiPolygon";
}
function isPointFeature(_0x1369cb) {
  var _a2;
  const _0x5dd06c = (_a2 = _0x1369cb == null ? void 0 : _0x1369cb["geometry"]) == null ? void 0 : _a2["type"];
  return _0x5dd06c === "Point" || _0x5dd06c === "MultiPoint";
}
var __defProp$c = Object["defineProperty"], __getOwnPropDesc$d = Object["getOwnPropertyDescriptor"], __decorateClass$d = (_0xbd7575, _0x5c9e7e, _0x392dcb, _0x5a67bb) => {
  var _0x5e42b4 = _0x5a67bb > 1 ? void 0 : _0x5a67bb ? __getOwnPropDesc$d(_0x5c9e7e, _0x392dcb) : _0x5c9e7e;
  for (var _0x2d9280 = _0xbd7575["length"] - 1, _0x12f747; _0x2d9280 >= 0; _0x2d9280--) if (_0x12f747 = _0xbd7575[_0x2d9280]) _0x5e42b4 = (_0x5a67bb ? _0x12f747(_0x5c9e7e, _0x392dcb, _0x5e42b4) : _0x12f747(_0x5e42b4)) || _0x5e42b4;
  if (_0x5a67bb && _0x5e42b4) __defProp$c(_0x5c9e7e, _0x392dcb, _0x5e42b4);
  return _0x5e42b4;
};
let TucbsBoundaryTool = class extends i$2 {
  constructor() {
    super(...arguments), this["mapElementId"] = "", this["map"] = null, this["customCss"] = "", this["_label"] = "", this["_boundaryType"] = "bbox", this["_output"] = "polygon", this["_status"] = "idle", this["_message"] = "", this["_helpOpen"] = ![], this["_picking"] = ![], this["_feature"] = null, this["_css"] = { "sheet": null }, this["_bind"] = new AnalysisMapBind(() => ({ "map": this["map"], "mapElementId": this["mapElementId"] }), (_0x56b2a6, _0xecc2ba) => {
      if (!this["_picking"]) return;
      this["_feature"] = _0x56b2a6, this["_label"] = _0xecc2ba, this["_picking"] = ![], this["_status"] = "idle", this["_message"] = "", this["_bind"]["highlight"]([_0x56b2a6]);
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
  ["updated"](_0x235a3d) {
    _0x235a3d["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_css"], "tucbs-boundary-tool"), (_0x235a3d["has"]("mapElementId") || _0x235a3d["has"]("map")) && (this["_bind"]["detach"](), this["_bind"]["attach"]());
  }
  ["_note"](_0xd566bb, _0x3b230e) {
    this["_status"] = "idle", this["_message"] = "", showToast(_0xd566bb, _0x3b230e);
  }
  async ["_run"]() {
    if (this["_status"] === "loading") return;
    if (!this["_feature"]) {
      this["_note"]("error", "Lütfen haritada bir nesne seçin.");
      return;
    }
    const _0x2f6bcc = this["_bind"]["current"]();
    if (!_0x2f6bcc) {
      this["_note"]("error", "Harita henüz hazır değil.");
      return;
    }
    this["_status"] = "loading", this["_message"] = "İşleniyor…", this["_picking"] = ![], this["dispatchEvent"](new CustomEvent("tucbs-boundary-run", { "detail": { "mapElementId": this["mapElementId"], "boundaryType": this["_boundaryType"], "outputGeometry": this["_output"] }, "bubbles": !![], "composed": !![] }));
    try {
      await _0x2f6bcc["runBoundary"]({ "geojson": this["_feature"], "boundaryType": this["_boundaryType"], "outputGeometry": this["_output"] }, { "title": this["_boundaryType"] === "bbox" ? "Sınırlayıcı kutu" : "Dışbükey zarf" }), this["_feature"] = null, this["_label"] = "", this["_boundaryType"] = "bbox", this["_output"] = "polygon", this["_bind"]["highlight"]([]), this["_status"] = "idle", this["_message"] = "", showToast("success", "Sınır tamamlandı.");
    } catch (_0x3f3385) {
      _0x3f3385 instanceof TucbsError && console["error"]("[tucbs-boundary-tool] " + _0x3f3385["code"] + " (" + _0x3f3385["number"] + "): " + _0x3f3385["message"]), this["_note"]("error", _0x3f3385 instanceof Error ? _0x3f3385["message"] : "Sınır üretimi başarısız.");
    }
  }
  ["render"]() {
    const _0x258dbe = this["_status"] === "loading";
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
            ?disabled=${_0x258dbe}
            @click=${() => {
      this["_picking"] = !![], this["_note"]("info", "Haritadan bir nesne seçin.");
    }}
          />
          <button
            type="button"
            class="refresh"
            title="Yeniden seç"
            ?disabled=${_0x258dbe}
            @click=${() => {
      this["_feature"] = null, this["_label"] = "", this["_picking"] = !![], this["_bind"]["highlight"]([]);
    }}
          >⟳</button>
        </div>
        <label class="lbl">Sınır tipi</label>
        <select
          .value=${this["_boundaryType"]}
          ?disabled=${_0x258dbe}
          @change=${(_0x158b2e) => {
      this["_boundaryType"] = _0x158b2e["target"]["value"];
    }}
        >
          <option value="bbox">Sınırlayıcı Kutu</option>
          <option value="convex">Dışbükey Zarf</option>
        </select>
        <label class="lbl">Çıktı geometrisi</label>
        <select
          .value=${this["_output"]}
          ?disabled=${_0x258dbe}
          @change=${(_0x3a8bf6) => {
      this["_output"] = _0x3a8bf6["target"]["value"];
    }}
        >
          <option value="polygon">Poligon</option>
          <option value="line">Çizgi</option>
        </select>
        <div class="actions">
          <button class="run" type="button" ?disabled=${!this["_feature"] || _0x258dbe} @click=${this["_run"]}>
            ${_0x258dbe ? "İşleniyor..." : "Çalıştır"}
          </button>
        </div>
        ${this["_message"] ? b`<p class="status ${this["_status"]}">${this["_message"]}</p>` : null}
      </div>
    `;
  }
};
TucbsBoundaryTool["styles"] = [geoToolStyles, analysisHelpStyles], __decorateClass$d([n$1()], TucbsBoundaryTool["prototype"], "mapElementId", 2), __decorateClass$d([n$1({ "attribute": ![] })], TucbsBoundaryTool["prototype"], "map", 2), __decorateClass$d([n$1({ "attribute": "custom-css" })], TucbsBoundaryTool["prototype"], "customCss", 2), __decorateClass$d([r()], TucbsBoundaryTool["prototype"], "_label", 2), __decorateClass$d([r()], TucbsBoundaryTool["prototype"], "_boundaryType", 2), __decorateClass$d([r()], TucbsBoundaryTool["prototype"], "_output", 2), __decorateClass$d([r()], TucbsBoundaryTool["prototype"], "_status", 2), __decorateClass$d([r()], TucbsBoundaryTool["prototype"], "_message", 2), __decorateClass$d([r()], TucbsBoundaryTool["prototype"], "_helpOpen", 2), __decorateClass$d([r()], TucbsBoundaryTool["prototype"], "_picking", 2), TucbsBoundaryTool = __decorateClass$d([t$3("tucbs-boundary-tool")], TucbsBoundaryTool);
var __defProp$b = Object["defineProperty"], __getOwnPropDesc$c = Object["getOwnPropertyDescriptor"], __decorateClass$c = (_0x32204e, _0x324f50, _0x41d377, _0x56941a) => {
  var _0x12d984 = _0x56941a > 1 ? void 0 : _0x56941a ? __getOwnPropDesc$c(_0x324f50, _0x41d377) : _0x324f50;
  for (var _0x2a3095 = _0x32204e["length"] - 1, _0x434963; _0x2a3095 >= 0; _0x2a3095--) if (_0x434963 = _0x32204e[_0x2a3095]) _0x12d984 = (_0x56941a ? _0x434963(_0x324f50, _0x41d377, _0x12d984) : _0x434963(_0x12d984)) || _0x12d984;
  if (_0x56941a && _0x12d984) __defProp$b(_0x324f50, _0x41d377, _0x12d984);
  return _0x12d984;
};
const CORNER_IDS = ["KB", "KD", "GD", "GB"], CORNER_LABEL = { "KB": "Kuzey-batı", "KD": "Kuzey-doğu", "GD": "Güney-doğu", "GB": "Güney-batı" }, KM_PER_DEG = 111.32;
let TucbsClipTool = class extends i$2 {
  constructor() {
    super(...arguments), this["mapElementId"] = "", this["map"] = null, this["customCss"] = "", this["_label"] = "", this["_drawing"] = ![], this["_status"] = "idle", this["_message"] = "", this["_helpOpen"] = ![], this["_picking"] = ![], this["_box"] = null, this["_coords"] = emptyCoords(), this["_feature"] = null, this["_mask"] = null, this["_shapeId"] = null, this["_shapeEntity"] = null, this["_handles"] = [], this["_drag"] = null, this["_pointer"] = null, this["_css"] = { "sheet": null }, this["_bind"] = new AnalysisMapBind(() => ({ "map": this["map"], "mapElementId": this["mapElementId"] }), (_0x4ef44c, _0x43e819) => {
      if (_0x4ef44c["properties"]["tucbsClipHandle"]) return;
      if (!this["_picking"] || this["_drawing"]) return;
      this["_feature"] = _0x4ef44c, this["_label"] = _0x43e819, this["_picking"] = ![], this["_status"] = "idle", this["_message"] = "", this["_bind"]["highlight"]([_0x4ef44c]);
    }, () => {
      this["_note"]("error", "Seçilen özellikten GeoJSON üretilemedi.");
    }), this["_onDrawComplete"] = (_0x3514cf) => {
      if (_0x3514cf["shape"]["source"] !== "tucbs-clip" || _0x3514cf["shape"]["tool"] !== "rectangle") return;
      const _0x304add = boxFromCoordinates(_0x3514cf["shape"]["coordinates"]);
      if (!_0x304add) return;
      this["_shapeId"] = _0x3514cf["shape"]["id"], this["_shapeEntity"] = _0x3514cf["shape"]["entity"], this["_applyBox"](_0x304add), this["_endDrawMode"](), this["_placeHandles"]();
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
  ["updated"](_0x2e09ed) {
    _0x2e09ed["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_css"], "tucbs-clip-tool"), (_0x2e09ed["has"]("mapElementId") || _0x2e09ed["has"]("map")) && (this["_listenDraw"](![]), this["_dropPointer"](), this["_bind"]["detach"](), this["_bind"]["attach"](), this["_listenDraw"](!![]));
  }
  ["_note"](_0x37c54e, _0x199ea9) {
    this["_status"] = "idle", this["_message"] = "", showToast(_0x37c54e, _0x199ea9);
  }
  ["_listenDraw"](_0x16d024) {
    var _a2;
    const _0x477899 = (_a2 = this["_bind"]["current"]()) == null ? void 0 : _a2["drawingManager"];
    if (!_0x477899) return;
    const _0x28b61d = _0x16d024 ? "on" : "off";
    _0x477899[_0x28b61d]("draw:complete", this["_onDrawComplete"]), _0x477899[_0x28b61d]("draw:cancel", this["_onDrawCancel"]);
  }
  ["_startDraw"]() {
    const _0x54571e = this["_bind"]["current"]();
    if (!_0x54571e) {
      this["_note"]("error", "Harita henüz hazır değil.");
      return;
    }
    this["_clearMask"](_0x54571e), this["_drawing"] = !![], this["_picking"] = ![], this["_note"]("info", "Haritada dikdörtgen çizin."), _0x54571e["drawingManager"]["activate"]("rectangle", "tucbs-clip");
  }
  ["_armPick"]() {
    this["_endDrawMode"](), this["_picking"] = !![], this["_note"]("info", "Haritadan nesne seç.");
  }
  ["_endDrawMode"]() {
    const _0x222027 = this["_bind"]["current"]();
    if ((_0x222027 == null ? void 0 : _0x222027["drawingManager"]["getActiveTool"]()) === "rectangle") _0x222027["drawingManager"]["deactivate"]();
    this["_drawing"] = ![];
  }
  ["_clearMask"](_0x15f93d) {
    this["_removeHandles"]();
    if (_0x15f93d && this["_shapeId"]) _0x15f93d["drawingManager"]["removeShape"](this["_shapeId"]);
    this["_shapeId"] = null, this["_shapeEntity"] = null, this["_mask"] = null, this["_box"] = null, this["_coords"] = emptyCoords();
  }
  ["_stopDraw"](_0x102cd4) {
    this["_endDrawMode"](), this["_dropPointer"]();
    if (_0x102cd4) this["_clearMask"](this["_bind"]["current"]());
    this["_drawing"] = ![];
  }
  ["_applyBox"](_0x15162f) {
    this["_box"] = _0x15162f, this["_coords"] = coordsFromBox(_0x15162f), this["_mask"] = maskFromBox(_0x15162f), this["_paintPolygon"](_0x15162f), this["_status"] = "idle", this["_message"] = "";
  }
  ["_applyCorner"](_0x50a0eb) {
    const _0x5dfd4d = this["_box"];
    if (!_0x5dfd4d) return;
    const _0x10a9b5 = this["_coords"][_0x50a0eb], _0x1bab05 = Number(_0x10a9b5["lon"]), _0x2525d0 = Number(_0x10a9b5["lat"]);
    if (!Number["isFinite"](_0x1bab05) || !Number["isFinite"](_0x2525d0)) {
      this["_coords"] = coordsFromBox(_0x5dfd4d);
      return;
    }
    const _0x483f87 = boxFromCorner(_0x5dfd4d, _0x50a0eb, _0x1bab05, _0x2525d0);
    if (!_0x483f87) {
      this["_coords"] = coordsFromBox(_0x5dfd4d), this["_note"]("error", "Köşeler geçerli bir dikdörtgen oluşturmuyor.");
      return;
    }
    this["_applyBox"](_0x483f87), this["_placeHandles"]();
  }
  ["_setCoord"](_0x4c2128, _0x2c1231, _0x1087d1) {
    this["_coords"] = { ...this["_coords"], [_0x4c2128]: { ...this["_coords"][_0x4c2128], [_0x2c1231]: _0x1087d1 } };
  }
  ["_paintPolygon"](_0x4e2c33) {
    var _a2, _b;
    const _0x377aa1 = (_a2 = this["_shapeEntity"]) == null ? void 0 : _a2["polygon"];
    if (!_0x377aa1) return;
    _0x377aa1["hierarchy"] = new ConstantProperty(new PolygonHierarchy(Cartesian3["fromDegreesArray"](flatRing(_0x4e2c33)))), (_b = this["_bind"]["current"]()) == null ? void 0 : _b["viewer"]["scene"]["requestRender"]();
  }
  ["_placeHandles"]() {
    const _0x5b1bc4 = this["_bind"]["current"](), _0x52fc81 = this["_box"];
    if (!_0x5b1bc4 || !_0x52fc81) return;
    this["_removeHandles"]();
    const _0x4eeaea = _0x5b1bc4["viewer"], _0x228287 = cornerPoints(_0x52fc81);
    for (const _0x2d9325 of CORNER_IDS) {
      const _0x13a5ab = _0x228287[_0x2d9325];
      this["_handles"]["push"](_0x4eeaea["entities"]["add"]({ "name": "tucbs-clip-" + _0x2d9325, "position": Cartesian3["fromDegrees"](_0x13a5ab["lon"], _0x13a5ab["lat"]), "properties": { "tucbsClipHandle": _0x2d9325 }, "billboard": { "image": cornerBadge(_0x2d9325), "width": 36, "height": 22, "verticalOrigin": VerticalOrigin["CENTER"], "horizontalOrigin": HorizontalOrigin["CENTER"], "disableDepthTestDistance": Number["POSITIVE_INFINITY"] } }));
    }
    this["_ensurePointer"](_0x4eeaea), _0x4eeaea["scene"]["requestRender"]();
  }
  ["_removeHandles"]() {
    var _a2;
    const _0x540292 = (_a2 = this["_bind"]["current"]()) == null ? void 0 : _a2["viewer"];
    if (!_0x540292) {
      this["_handles"] = [];
      return;
    }
    for (const _0x514f32 of this["_handles"]) _0x540292["entities"]["remove"](_0x514f32);
    this["_handles"] = [], this["_drag"] = null, _0x540292["scene"]["screenSpaceCameraController"]["enableInputs"] = !![];
  }
  ["_ensurePointer"](_0x1fad02) {
    if (this["_pointer"]) return;
    const _0xd3c6bd = new ScreenSpaceEventHandler(_0x1fad02["scene"]["canvas"]);
    _0xd3c6bd["setInputAction"]((_0x476bc7) => {
      const _0x4abdaa = this["_cornerAt"](_0x1fad02, _0x476bc7["position"]);
      if (!_0x4abdaa) return;
      this["_drag"] = _0x4abdaa, _0x1fad02["scene"]["screenSpaceCameraController"]["enableInputs"] = ![];
    }, ScreenSpaceEventType["LEFT_DOWN"]), _0xd3c6bd["setInputAction"]((_0x4a4b8c) => {
      if (!this["_drag"] || !this["_box"]) return;
      const _0x278694 = groundLonLat(_0x1fad02, _0x4a4b8c["endPosition"]);
      if (!_0x278694) return;
      const _0x52d5af = boxFromCorner(this["_box"], this["_drag"], _0x278694[0], _0x278694[1]);
      if (!_0x52d5af) return;
      this["_applyBox"](_0x52d5af), this["_moveHandles"](_0x52d5af);
    }, ScreenSpaceEventType["MOUSE_MOVE"]), _0xd3c6bd["setInputAction"](() => {
      this["_drag"] = null, _0x1fad02["scene"]["screenSpaceCameraController"]["enableInputs"] = !![];
    }, ScreenSpaceEventType["LEFT_UP"]), this["_pointer"] = _0xd3c6bd;
  }
  ["_cornerAt"](_0x278540, _0x514540) {
    var _a2;
    const _0x3eebe4 = _0x278540["scene"]["pick"](_0x514540), _0x32186c = ((_a2 = _0x3eebe4 == null ? void 0 : _0x3eebe4["id"]) == null ? void 0 : _a2["name"]) ?? "";
    if (!_0x32186c["startsWith"]("tucbs-clip-")) return null;
    const _0x56accc = _0x32186c["slice"]("tucbs-clip-"["length"]);
    return CORNER_IDS["includes"](_0x56accc) ? _0x56accc : null;
  }
  ["_moveHandles"](_0x5a71b8) {
    const _0x49ba34 = cornerPoints(_0x5a71b8);
    for (const _0x289a7b of this["_handles"]) {
      const _0x38652a = (_0x289a7b["name"] ?? "")["slice"]("tucbs-clip-"["length"]), _0x3dc85b = _0x49ba34[_0x38652a];
      if (!_0x3dc85b) continue;
      _0x289a7b["position"] = Cartesian3["fromDegrees"](_0x3dc85b["lon"], _0x3dc85b["lat"]);
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
    const _0x423c07 = this["_bind"]["current"]();
    if (!_0x423c07) {
      this["_note"]("error", "Harita henüz hazır değil.");
      return;
    }
    this["_status"] = "loading", this["_message"] = "İşleniyor…", this["dispatchEvent"](new CustomEvent("tucbs-clip-run", { "detail": { "mapElementId": this["mapElementId"], "label": this["_label"] }, "bubbles": !![], "composed": !![] }));
    try {
      await _0x423c07["runClip"]({ "geojsonA": this["_feature"], "geojsonB": this["_mask"] }, { "title": "Kırpma sonucu" }), this["_feature"] = null, this["_label"] = "", this["_picking"] = ![], this["_clearMask"](_0x423c07), this["_bind"]["highlight"]([]), this["_status"] = "idle", this["_message"] = "", showToast("success", "Kırpma işlemi tamamlandı.");
    } catch (_0x461023) {
      _0x461023 instanceof TucbsError && console["error"]("[tucbs-clip-tool] " + _0x461023["code"] + " (" + _0x461023["number"] + "): " + _0x461023["message"]), this["_note"]("error", _0x461023 instanceof Error ? _0x461023["message"] : "Kırpma başarısız.");
    }
  }
  ["render"]() {
    const _0x294233 = this["_status"] === "loading", _0x88695f = this["_box"], _0x526d9e = Boolean(this["_feature"] && this["_mask"] && _0x88695f) && !_0x294233 && !this["_drawing"], _0x547bd3 = _0x88695f ? formatSize(_0x88695f) : "";
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
            ?disabled=${_0x294233 || this["_drawing"]}
            @click=${this["_armPick"]}
          />
          <button
            type="button"
            class="refresh"
            title="Yeniden seç"
            ?disabled=${_0x294233}
            @click=${() => {
      this["_feature"] = null, this["_label"] = "", this["_armPick"](), this["_bind"]["highlight"]([]);
    }}
          >⟳</button>
        </div>
        <label class="lbl">Kırpma alanı (dikdörtgen)</label>
        <div class="area-row">
          <span class="area-size">${this["_drawing"] ? "Çiziliyor…" : _0x547bd3}</span>
          <div class="area-actions">
            ${_0x88695f && !this["_drawing"] ? b`<button type="button" class="link" ?disabled=${_0x294233} @click=${() => this["_clearMask"](this["_bind"]["current"]())}>Temizle</button>` : null}
            <button class="secondary" type="button" ?disabled=${_0x294233 || this["_drawing"]} @click=${this["_startDraw"]}>
              ${this["_drawing"] ? "Çiziliyor" : _0x88695f ? "Yeniden çiz" : "Dikdörtgen çiz"}
            </button>
          </div>
        </div>
        ${_0x88695f ? b`
            <div class="corners">
              <h4>Köşe koordinatları</h4>
              ${CORNER_IDS["map"]((_0x256ec5) => b`
                <div class="corner">
                  <div class="corner-head">
                    <span class="badge">${_0x256ec5}</span>
                    <span class="corner-name">${CORNER_LABEL[_0x256ec5]}</span>
                  </div>
                  <div class="corner-fields">
                    <label>
                      Boylam
                      <input
                        .value=${this["_coords"][_0x256ec5]["lon"]}
                        ?disabled=${_0x294233 || this["_drawing"]}
                        @input=${(_0x3ca3eb) => this["_setCoord"](_0x256ec5, "lon", _0x3ca3eb["target"]["value"])}
                        @blur=${() => this["_applyCorner"](_0x256ec5)}
                        @keydown=${(_0x243eb0) => {
      if (_0x243eb0["key"] === "Enter") this["_applyCorner"](_0x256ec5);
    }}
                      />
                    </label>
                    <label>
                      Enlem
                      <input
                        .value=${this["_coords"][_0x256ec5]["lat"]}
                        ?disabled=${_0x294233 || this["_drawing"]}
                        @input=${(_0x2b0ac3) => this["_setCoord"](_0x256ec5, "lat", _0x2b0ac3["target"]["value"])}
                        @blur=${() => this["_applyCorner"](_0x256ec5)}
                        @keydown=${(_0x5a8ce8) => {
      if (_0x5a8ce8["key"] === "Enter") this["_applyCorner"](_0x256ec5);
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
          <button class="run" type="button" ?disabled=${!_0x526d9e} @click=${this["_run"]}>
            ${_0x294233 ? "İşleniyor..." : "Çalıştır"}
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
function cornerBadge(_0x49d016) {
  const _0x3b8c80 = CORNER_BADGE[_0x49d016];
  if (_0x3b8c80) return _0x3b8c80;
  const _0x5f4002 = document["createElement"]("canvas");
  _0x5f4002["width"] = 72, _0x5f4002["height"] = 44;
  const _0x2f441d = _0x5f4002["getContext"]("2d");
  if (!_0x2f441d) return _0x5f4002;
  return _0x2f441d["fillStyle"] = "#dc2626", _0x2f441d["strokeStyle"] = "#ffffff", _0x2f441d["lineWidth"] = 4, _0x2f441d["beginPath"](), _0x2f441d["roundRect"](2, 2, 68, 40, 20), _0x2f441d["fill"](), _0x2f441d["stroke"](), _0x2f441d["fillStyle"] = "#ffffff", _0x2f441d["font"] = "700 22px sans-serif", _0x2f441d["textAlign"] = "center", _0x2f441d["textBaseline"] = "middle", _0x2f441d["fillText"](_0x49d016, 36, 23), CORNER_BADGE[_0x49d016] = _0x5f4002, _0x5f4002;
}
function emptyCoords() {
  return { "KB": { "lon": "", "lat": "" }, "KD": { "lon": "", "lat": "" }, "GD": { "lon": "", "lat": "" }, "GB": { "lon": "", "lat": "" } };
}
function boxFromCoordinates(_0x750806) {
  if (_0x750806["length"] < 2) return null;
  const _0x1977c6 = _0x750806["map"]((_0x2b1e87) => _0x2b1e87[0]), _0x2ba976 = _0x750806["map"]((_0x3e2e62) => _0x3e2e62[1]);
  return normalizeBox(Math["min"](..._0x1977c6), Math["min"](..._0x2ba976), Math["max"](..._0x1977c6), Math["max"](..._0x2ba976));
}
function boxFromCorner(_0x2a88bf, _0x1f7596, _0x5f21b6, _0x15e854) {
  let { west: _0x37cbe1, south: _0x582ec1, east: _0x244905, north: _0x2a003e } = _0x2a88bf;
  if (_0x1f7596 === "KB") _0x37cbe1 = _0x5f21b6, _0x2a003e = _0x15e854;
  else {
    if (_0x1f7596 === "KD") _0x244905 = _0x5f21b6, _0x2a003e = _0x15e854;
    else _0x1f7596 === "GD" ? (_0x244905 = _0x5f21b6, _0x582ec1 = _0x15e854) : (_0x37cbe1 = _0x5f21b6, _0x582ec1 = _0x15e854);
  }
  return normalizeBox(_0x37cbe1, _0x582ec1, _0x244905, _0x2a003e);
}
function normalizeBox(_0x42e71e, _0x14e7c6, _0x4cdb51, _0xcb444f) {
  const _0x58842f = Math["min"](_0x42e71e, _0x4cdb51), _0x3d2fe5 = Math["max"](_0x42e71e, _0x4cdb51), _0xae0cd2 = Math["min"](_0x14e7c6, _0xcb444f), _0x3d7706 = Math["max"](_0x14e7c6, _0xcb444f);
  if (_0x3d2fe5 - _0x58842f < 1e-8 || _0x3d7706 - _0xae0cd2 < 1e-8) return null;
  return { "west": _0x58842f, "south": _0xae0cd2, "east": _0x3d2fe5, "north": _0x3d7706 };
}
function coordsFromBox(_0x5bdc5e) {
  const _0x4cf036 = cornerPoints(_0x5bdc5e), _0x3436b6 = emptyCoords();
  for (const _0x219382 of CORNER_IDS) {
    _0x3436b6[_0x219382] = { "lon": _0x4cf036[_0x219382]["lon"]["toFixed"](6), "lat": _0x4cf036[_0x219382]["lat"]["toFixed"](6) };
  }
  return _0x3436b6;
}
function cornerPoints(_0x169f03) {
  return { "KB": { "lon": _0x169f03["west"], "lat": _0x169f03["north"] }, "KD": { "lon": _0x169f03["east"], "lat": _0x169f03["north"] }, "GD": { "lon": _0x169f03["east"], "lat": _0x169f03["south"] }, "GB": { "lon": _0x169f03["west"], "lat": _0x169f03["south"] } };
}
function flatRing(_0x5ebea5) {
  return [_0x5ebea5["west"], _0x5ebea5["south"], _0x5ebea5["east"], _0x5ebea5["south"], _0x5ebea5["east"], _0x5ebea5["north"], _0x5ebea5["west"], _0x5ebea5["north"]];
}
function maskFromBox(_0x4794e2) {
  const _0x469dcc = [[_0x4794e2["west"], _0x4794e2["south"]], [_0x4794e2["east"], _0x4794e2["south"]], [_0x4794e2["east"], _0x4794e2["north"]], [_0x4794e2["west"], _0x4794e2["north"]], [_0x4794e2["west"], _0x4794e2["south"]]], _0x334fe3 = { "type": "Polygon", "coordinates": [_0x469dcc] };
  return { "type": "Feature", "properties": {}, "geometry": _0x334fe3 };
}
function formatSize(_0x186851) {
  const _0x1ab855 = (_0x186851["south"] + _0x186851["north"]) / 2 * (Math["PI"] / 180), _0x466834 = Math["abs"](_0x186851["north"] - _0x186851["south"]) * KM_PER_DEG, _0x1830ce = Math["abs"](_0x186851["east"] - _0x186851["west"]) * KM_PER_DEG * Math["cos"](_0x1ab855);
  return _0x1830ce["toFixed"](2) + " × " + _0x466834["toFixed"](2) + " km";
}
function groundLonLat(_0x30717b, _0x3919f1) {
  const _0x138f84 = _0x30717b["camera"]["getPickRay"](_0x3919f1);
  if (!_0x138f84) return null;
  const _0xdfb9b7 = _0x30717b["scene"]["globe"]["pick"](_0x138f84, _0x30717b["scene"]);
  if (!_0xdfb9b7) return null;
  const _0x5a3084 = Cartographic["fromCartesian"](_0xdfb9b7);
  return [_0x30289b["toDegrees"](_0x5a3084["longitude"]), _0x30289b["toDegrees"](_0x5a3084["latitude"])];
}
var __defProp$a = Object["defineProperty"], __getOwnPropDesc$b = Object["getOwnPropertyDescriptor"], __decorateClass$b = (_0x6d194b, _0x3a22be, _0x59d964, _0x8c7426) => {
  var _0x41c528 = _0x8c7426 > 1 ? void 0 : _0x8c7426 ? __getOwnPropDesc$b(_0x3a22be, _0x59d964) : _0x3a22be;
  for (var _0x4407d4 = _0x6d194b["length"] - 1, _0x97a716; _0x4407d4 >= 0; _0x4407d4--) if (_0x97a716 = _0x6d194b[_0x4407d4]) _0x41c528 = (_0x8c7426 ? _0x97a716(_0x3a22be, _0x59d964, _0x41c528) : _0x97a716(_0x41c528)) || _0x41c528;
  if (_0x8c7426 && _0x41c528) __defProp$a(_0x3a22be, _0x59d964, _0x41c528);
  return _0x41c528;
};
const _TucbsTwoFeatureTool = class _TucbsTwoFeatureTool extends i$2 {
  constructor() {
    super(...arguments), this["mapElementId"] = "", this["map"] = null, this["customCss"] = "", this["_labelA"] = "", this["_labelB"] = "", this["_status"] = "idle", this["_message"] = "", this["_helpOpen"] = ![], this["_featureA"] = null, this["_featureB"] = null, this["_pending"] = null, this["_css"] = { "sheet": null }, this["_bind"] = new AnalysisMapBind(() => ({ "map": this["map"], "mapElementId": this["mapElementId"] }), (_0xbe9b63, _0x1ec5b8) => this["_accept"](_0xbe9b63, _0x1ec5b8), () => {
      this["_note"]("error", "Seçilen özellikten GeoJSON üretilemedi.");
    });
  }
  ["connectedCallback"]() {
    super["connectedCallback"](), this["_bind"]["attach"]();
  }
  ["disconnectedCallback"]() {
    this["_bind"]["detach"](), super["disconnectedCallback"]();
  }
  ["updated"](_0x2fed44) {
    _0x2fed44["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_css"], this["tagName"]["toLowerCase"]()), (_0x2fed44["has"]("mapElementId") || _0x2fed44["has"]("map")) && (this["_bind"]["detach"](), this["_bind"]["attach"]());
  }
  ["_accept"](_0x304ca1, _0x58e82f) {
    if (!this["_pending"]) return;
    if (!isPolygonFeature(_0x304ca1)) {
      this["_note"]("error", this["spec"]()["polygonOnlyMessage"]);
      return;
    }
    this["_pending"] === "a" ? (this["_featureA"] = _0x304ca1, this["_labelA"] = _0x58e82f) : (this["_featureB"] = _0x304ca1, this["_labelB"] = _0x58e82f), this["_pending"] = null, this["_status"] = "idle", this["_message"] = "", this["_bind"]["highlight"]([this["_featureA"], this["_featureB"]]["filter"]((_0x3030a6) => _0x3030a6 !== null));
  }
  ["_arm"](_0x2d7acd) {
    this["_pending"] = _0x2d7acd, this["_note"]("info", _0x2d7acd === "a" ? "Lütfen birinci poligonu seçin." : "Lütfen ikinci poligonu seçin.");
  }
  ["_refresh"](_0x14b8a8) {
    _0x14b8a8 === "a" ? (this["_featureA"] = null, this["_labelA"] = "") : (this["_featureB"] = null, this["_labelB"] = ""), this["_arm"](_0x14b8a8), this["_bind"]["highlight"]([this["_featureA"], this["_featureB"]]["filter"]((_0x5e9e65) => _0x5e9e65 !== null));
  }
  ["_clear"]() {
    this["_featureA"] = null, this["_featureB"] = null, this["_labelA"] = "", this["_labelB"] = "", this["_pending"] = null, this["_bind"]["highlight"]([]);
  }
  async ["_run"]() {
    const _0x3cad1f = this["spec"]();
    if (this["_status"] === "loading") return;
    if (!isPolygonFeature(this["_featureA"]) || !isPolygonFeature(this["_featureB"])) {
      this["_note"]("error", _0x3cad1f["bothPolygonMessage"]);
      return;
    }
    const _0x5e1b68 = this["_bind"]["current"]();
    if (!_0x5e1b68) {
      this["_bind"]["attach"](), this["_note"]("error", "Harita henüz hazır değil.");
      return;
    }
    this["_status"] = "loading", this["_message"] = "İşleniyor…", this["_pending"] = null, this["dispatchEvent"](new CustomEvent(_0x3cad1f["eventName"], { "detail": { "mapElementId": this["mapElementId"], "labelA": this["_labelA"], "labelB": this["_labelB"] }, "bubbles": !![], "composed": !![] }));
    try {
      await _0x3cad1f["run"](_0x5e1b68, this["_featureA"], this["_featureB"]), this["_clear"](), this["_status"] = "idle", this["_message"] = "", showToast("success", _0x3cad1f["success"]);
    } catch (_0x3d7888) {
      _0x3d7888 instanceof TucbsError && console["error"]("[" + this["tagName"] + "] " + _0x3d7888["code"] + " (" + _0x3d7888["number"] + "): " + _0x3d7888["message"]), this["_note"]("error", _0x3d7888 instanceof Error ? _0x3d7888["message"] : _0x3cad1f["fail"]);
    }
  }
  ["_note"](_0x1f557b, _0x4854f4) {
    this["_status"] = "idle", this["_message"] = "", showToast(_0x1f557b, _0x4854f4);
  }
  ["_slot"](_0x23bfe9, _0x3685b1, _0x488404, _0x16101c) {
    const _0x155189 = this["_status"] === "loading";
    return b`
      <label class="lbl">${_0x3685b1}</label>
      <div class="input-wrap">
        <input
          type="text"
          readonly
          placeholder=${_0x488404}
          .value=${_0x16101c ? "= " + _0x16101c : ""}
          ?disabled=${_0x155189}
          @click=${() => this["_arm"](_0x23bfe9)}
        />
        <button type="button" class="refresh" title="Yeniden seç" ?disabled=${_0x155189} @click=${() => this["_refresh"](_0x23bfe9)}>⟳</button>
      </div>
    `;
  }
  ["render"]() {
    const _0xbecccf = this["spec"](), _0x514303 = this["_status"] === "loading", _0x1b48fc = isPolygonFeature(this["_featureA"]) && isPolygonFeature(this["_featureB"]) && !_0x514303;
    return b`
      <div class="panel">
        <div class="title-row">
          <h3 class="title">${_0xbecccf["title"]}</h3>
          <button type="button" class="help" aria-label="Yardım" title="Yardım" @click=${() => {
      this["_helpOpen"] = !![];
    }}>?</button>
        </div>
        ${renderAnalysisHelp(this["_helpOpen"], _0xbecccf["title"], _0xbecccf["help"], () => {
      this["_helpOpen"] = ![];
    })}
        ${this["_slot"]("a", _0xbecccf["labelA"], _0xbecccf["placeholderA"], this["_labelA"])}
        ${this["_slot"]("b", _0xbecccf["labelB"], _0xbecccf["placeholderB"], this["_labelB"])}
        <div class="actions">
          <button class="run" type="button" ?disabled=${!_0x1b48fc} @click=${this["_run"]}>
            ${_0x514303 ? "İşleniyor..." : "Çalıştır"}
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
    return { "title": "Fark", "labelA": "İlk poligon (kaynak)...", "placeholderA": "Haritadan poligon seç", "labelB": "İkinci poligon (çıkarılacak)...", "placeholderB": "Poligon seçmek için buraya tıklayın", "eventName": "tucbs-difference-run", "success": "Fark tamamlandı.", "fail": "Fark başarısız.", "polygonOnlyMessage": "Fark için yalnızca poligon seçin.", "bothPolygonMessage": "Her iki seçim de poligon olmalıdır.", "help": COGRAFI_HELP["fark"], "run": (_0x30347a, _0x48d906, _0x5d638c) => _0x30347a["runDifference"]({ "geojsonA": _0x48d906, "geojsonB": _0x5d638c }, { "title": "Fark sonucu" }) };
  }
};
TucbsDifferenceTool = __decorateClass$b([t$3("tucbs-difference-tool")], TucbsDifferenceTool);
let TucbsSubtractTool = class extends TucbsTwoFeatureTool {
  ["spec"]() {
    return { "title": "Çıkarma", "labelA": "Nesneyi şuradan kaldır:", "placeholderA": "Haritadan nesne seç", "labelB": "...ile örtüşüyor.", "placeholderB": "Nesne seçmek için buraya tıklayın", "eventName": "tucbs-subtract-run", "success": "Çıkarma tamamlandı.", "fail": "Çıkarma başarısız.", "polygonOnlyMessage": "Çıkarma için yalnızca poligon seçin.", "bothPolygonMessage": "Her iki seçim de poligon olmalıdır.", "help": COGRAFI_HELP["cikarma"], "run": (_0xdc7a0c, _0x2d62f1, _0x3f13e9) => _0xdc7a0c["runSubtract"]({ "geojsonA": _0x2d62f1, "geojsonB": _0x3f13e9 }, { "title": "Çıkarma sonucu" }) };
  }
};
TucbsSubtractTool = __decorateClass$b([t$3("tucbs-subtract-tool")], TucbsSubtractTool);
let TucbsUnionTool = class extends TucbsTwoFeatureTool {
  ["spec"]() {
    return { "title": "Birleştir", "labelA": "Birleştirilecek birinci...", "placeholderA": "Haritadan nesne seç", "labelB": "Birleştirilecek ikinci...", "placeholderB": "Haritadan nesne seç", "eventName": "tucbs-union-run", "success": "Birleştirme tamamlandı.", "fail": "Birleştirme başarısız.", "polygonOnlyMessage": "Birleştirme için yalnızca poligon seçin.", "bothPolygonMessage": "Her iki seçim de poligon olmalıdır.", "help": COGRAFI_HELP["birlestir"], "run": (_0x24758a, _0x31735f, _0x2831ad) => _0x24758a["runUnion"]({ "geojsonA": _0x31735f, "geojsonB": _0x2831ad }, { "title": "Birleştir sonucu" }) };
  }
};
TucbsUnionTool = __decorateClass$b([t$3("tucbs-union-tool")], TucbsUnionTool);
var __defProp$9 = Object["defineProperty"], __getOwnPropDesc$a = Object["getOwnPropertyDescriptor"], __decorateClass$a = (_0x49ec80, _0x504926, _0x5ef687, _0x705d34) => {
  var _0x4fcf32 = _0x705d34 > 1 ? void 0 : _0x705d34 ? __getOwnPropDesc$a(_0x504926, _0x5ef687) : _0x504926;
  for (var _0x403e5d = _0x49ec80["length"] - 1, _0x279cb9; _0x403e5d >= 0; _0x403e5d--) if (_0x279cb9 = _0x49ec80[_0x403e5d]) _0x4fcf32 = (_0x705d34 ? _0x279cb9(_0x504926, _0x5ef687, _0x4fcf32) : _0x279cb9(_0x4fcf32)) || _0x4fcf32;
  if (_0x705d34 && _0x4fcf32) __defProp$9(_0x504926, _0x5ef687, _0x4fcf32);
  return _0x4fcf32;
};
let TucbsWedgeBufferTool = class extends i$2 {
  constructor() {
    super(...arguments), this["mapElementId"] = "", this["map"] = null, this["customCss"] = "", this["_label"] = "", this["_distance"] = "", this["_start"] = "0", this["_end"] = "90", this["_status"] = "idle", this["_message"] = "", this["_helpOpen"] = ![], this["_picking"] = ![], this["_feature"] = null, this["_css"] = { "sheet": null }, this["_bind"] = new AnalysisMapBind(() => ({ "map": this["map"], "mapElementId": this["mapElementId"] }), (_0x1367c6, _0x1ba767) => {
      if (!this["_picking"]) return;
      if (!isPointFeature(_0x1367c6)) {
        this["_note"]("error", "Kama tampon sadece nokta geometrileri için kullanılabilir.");
        return;
      }
      this["_feature"] = _0x1367c6, this["_label"] = _0x1ba767, this["_picking"] = ![], this["_status"] = "idle", this["_message"] = "", this["_bind"]["highlight"]([_0x1367c6]);
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
  ["updated"](_0x362514) {
    _0x362514["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_css"], "tucbs-wedge-buffer-tool"), (_0x362514["has"]("mapElementId") || _0x362514["has"]("map")) && (this["_bind"]["detach"](), this["_bind"]["attach"]());
  }
  ["_note"](_0x5054f3, _0x4def55) {
    this["_status"] = "idle", this["_message"] = "", showToast(_0x5054f3, _0x4def55);
  }
  async ["_run"]() {
    if (this["_status"] === "loading") return;
    if (!isPointFeature(this["_feature"])) {
      this["_note"]("error", "Lütfen haritada bir nokta seçin.");
      return;
    }
    const _0x5ef3e9 = Number(this["_distance"]), _0x5d7816 = Number(this["_start"]), _0xc2a7c2 = Number(this["_end"]);
    if (!Number["isFinite"](_0x5ef3e9) || _0x5ef3e9 <= 0) {
      this["_note"]("error", "Geçerli bir mesafe girin.");
      return;
    }
    if (!Number["isFinite"](_0x5d7816) || !Number["isFinite"](_0xc2a7c2) || _0x5d7816 >= _0xc2a7c2) {
      this["_note"]("error", "Başlangıç açısı bitiş açısından küçük olmalıdır.");
      return;
    }
    const _0x3ed255 = this["_bind"]["current"]();
    if (!_0x3ed255) {
      this["_note"]("error", "Harita henüz hazır değil.");
      return;
    }
    this["_status"] = "loading", this["_message"] = "İşleniyor…", this["_picking"] = ![], this["dispatchEvent"](new CustomEvent("tucbs-wedge-buffer-run", { "detail": { "mapElementId": this["mapElementId"], "distanceM": _0x5ef3e9, "startAngle": _0x5d7816, "endAngle": _0xc2a7c2 }, "bubbles": !![], "composed": !![] }));
    try {
      await _0x3ed255["runWedgeBuffer"]({ "geojson": this["_feature"], "distanceM": _0x5ef3e9, "startAngle": _0x5d7816, "endAngle": _0xc2a7c2 }, { "title": "Kama tampon (" + _0x5ef3e9 + "m, " + _0x5d7816 + "°–" + _0xc2a7c2 + "°)" }), this["_feature"] = null, this["_label"] = "", this["_distance"] = "", this["_start"] = "0", this["_end"] = "90", this["_bind"]["highlight"]([]), this["_status"] = "idle", this["_message"] = "", showToast("success", "Kama tampon eklendi.");
    } catch (_0x504fd5) {
      _0x504fd5 instanceof TucbsError && console["error"]("[tucbs-wedge-buffer-tool] " + _0x504fd5["code"] + " (" + _0x504fd5["number"] + "): " + _0x504fd5["message"]), this["_note"]("error", _0x504fd5 instanceof Error ? _0x504fd5["message"] : "Kama tampon başarısız.");
    }
  }
  ["render"]() {
    const _0x167a5f = this["_status"] === "loading", _0x570e47 = Boolean(this["_feature"] && this["_distance"]) && !_0x167a5f;
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
            ?disabled=${_0x167a5f}
            @click=${() => {
      this["_picking"] = !![], this["_note"]("info", "Haritadan bir nokta seçin.");
    }}
          />
          <button
            type="button"
            class="refresh"
            title="Yeniden seç"
            ?disabled=${_0x167a5f}
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
            ?disabled=${_0x167a5f}
            @input=${(_0x1df2d3) => {
      this["_distance"] = _0x1df2d3["target"]["value"];
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
          ?disabled=${_0x167a5f}
          @input=${(_0x586843) => {
      this["_start"] = _0x586843["target"]["value"];
    }}
        />
        <label class="lbl">Bitiş Açısı</label>
        <input
          type="number"
          step="any"
          placeholder="Bitiş açısı"
          .value=${this["_end"]}
          ?disabled=${_0x167a5f}
          @input=${(_0x3bfb8d) => {
      this["_end"] = _0x3bfb8d["target"]["value"];
    }}
        />
        <p class="hint">0° = Kuzey, 90° = Doğu, 180° = Güney, 270° = Batı</p>
        <div class="actions">
          <button class="run" type="button" ?disabled=${!_0x570e47} @click=${this["_run"]}>
            ${_0x167a5f ? "İşleniyor..." : "Çalıştır"}
          </button>
        </div>
        ${this["_message"] ? b`<p class="status ${this["_status"]}">${this["_message"]}</p>` : null}
      </div>
    `;
  }
};
TucbsWedgeBufferTool["styles"] = [geoToolStyles, analysisHelpStyles], __decorateClass$a([n$1()], TucbsWedgeBufferTool["prototype"], "mapElementId", 2), __decorateClass$a([n$1({ "attribute": ![] })], TucbsWedgeBufferTool["prototype"], "map", 2), __decorateClass$a([n$1({ "attribute": "custom-css" })], TucbsWedgeBufferTool["prototype"], "customCss", 2), __decorateClass$a([r()], TucbsWedgeBufferTool["prototype"], "_label", 2), __decorateClass$a([r()], TucbsWedgeBufferTool["prototype"], "_distance", 2), __decorateClass$a([r()], TucbsWedgeBufferTool["prototype"], "_start", 2), __decorateClass$a([r()], TucbsWedgeBufferTool["prototype"], "_end", 2), __decorateClass$a([r()], TucbsWedgeBufferTool["prototype"], "_status", 2), __decorateClass$a([r()], TucbsWedgeBufferTool["prototype"], "_message", 2), __decorateClass$a([r()], TucbsWedgeBufferTool["prototype"], "_helpOpen", 2), __decorateClass$a([r()], TucbsWedgeBufferTool["prototype"], "_picking", 2), TucbsWedgeBufferTool = __decorateClass$a([t$3("tucbs-wedge-buffer-tool")], TucbsWedgeBufferTool);
var __defProp$8 = Object["defineProperty"], __getOwnPropDesc$9 = Object["getOwnPropertyDescriptor"], __decorateClass$9 = (_0x1e12cf, _0x19456e, _0x4f1789, _0x1164e3) => {
  var _0x558088 = _0x1164e3 > 1 ? void 0 : _0x1164e3 ? __getOwnPropDesc$9(_0x19456e, _0x4f1789) : _0x19456e;
  for (var _0x52f8fc = _0x1e12cf["length"] - 1, _0x4f57d2; _0x52f8fc >= 0; _0x52f8fc--) if (_0x4f57d2 = _0x1e12cf[_0x52f8fc]) _0x558088 = (_0x1164e3 ? _0x4f57d2(_0x19456e, _0x4f1789, _0x558088) : _0x4f57d2(_0x558088)) || _0x558088;
  if (_0x1164e3 && _0x558088) __defProp$8(_0x19456e, _0x4f1789, _0x558088);
  return _0x558088;
};
const TOOLS = [{ "id": "sinir", "label": "Sınır" }, { "id": "tampon", "label": "Tampon" }, { "id": "kirp", "label": "Kırp" }, { "id": "fark", "label": "Fark" }, { "id": "kesisim", "label": "Kesişim" }, { "id": "cikarma", "label": "Çıkarma" }, { "id": "birlestir", "label": "Birleştir" }, { "id": "kama", "label": "Kama Tampon" }];
let TucbsAnalysisPanel = class extends i$2 {
  constructor() {
    super(...arguments), this["mapElementId"] = "", this["customCss"] = "", this["_activeTool"] = null, this["_customCssState"] = { "sheet": null };
  }
  ["updated"](_0x267a43) {
    _0x267a43["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_customCssState"], "tucbs-analysis-panel");
  }
  ["_openTool"](_0x22bbb0) {
    this["_activeTool"] = _0x22bbb0;
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
          ${TOOLS["map"]((_0x17b759) => b`
              <li>
                <button type="button" @click=${() => this["_openTool"](_0x17b759["id"])}>
                  ${_0x17b759["label"]}
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
    const _0x5788fa = this["_toolTag"]();
    if (!_0x5788fa) return null;
    return b`
      <div class="shell">
        <button
          type="button"
          class="back"
          aria-label="Araç listesine dön"
          title="Geri"
          @click=${this["_backToList"]}
        >←</button>
        ${_0x5788fa === "tucbs-boundary-tool" ? b`<tucbs-boundary-tool .map=${this["map"]} .mapElementId=${this["mapElementId"]}></tucbs-boundary-tool>` : _0x5788fa === "tucbs-buffer-tool" ? b`<tucbs-buffer-tool .map=${this["map"]} .mapElementId=${this["mapElementId"]}></tucbs-buffer-tool>` : _0x5788fa === "tucbs-clip-tool" ? b`<tucbs-clip-tool .map=${this["map"]} .mapElementId=${this["mapElementId"]}></tucbs-clip-tool>` : _0x5788fa === "tucbs-difference-tool" ? b`<tucbs-difference-tool .map=${this["map"]} .mapElementId=${this["mapElementId"]}></tucbs-difference-tool>` : _0x5788fa === "tucbs-intersection-tool" ? b`<tucbs-intersection-tool .map=${this["map"]} .mapElementId=${this["mapElementId"]}></tucbs-intersection-tool>` : _0x5788fa === "tucbs-subtract-tool" ? b`<tucbs-subtract-tool .map=${this["map"]} .mapElementId=${this["mapElementId"]}></tucbs-subtract-tool>` : _0x5788fa === "tucbs-union-tool" ? b`<tucbs-union-tool .map=${this["map"]} .mapElementId=${this["mapElementId"]}></tucbs-union-tool>` : b`<tucbs-wedge-buffer-tool .map=${this["map"]} .mapElementId=${this["mapElementId"]}></tucbs-wedge-buffer-tool>`}
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
var __defProp$7 = Object["defineProperty"], __getOwnPropDesc$8 = Object["getOwnPropertyDescriptor"], __decorateClass$8 = (_0x4db1fa, _0x838743, _0x3f6b3e, _0x516e93) => {
  var _0x4c061b = _0x516e93 > 1 ? void 0 : _0x516e93 ? __getOwnPropDesc$8(_0x838743, _0x3f6b3e) : _0x838743;
  for (var _0x4f0d1d = _0x4db1fa["length"] - 1, _0x3e99f7; _0x4f0d1d >= 0; _0x4f0d1d--) if (_0x3e99f7 = _0x4db1fa[_0x4f0d1d]) _0x4c061b = (_0x516e93 ? _0x3e99f7(_0x838743, _0x3f6b3e, _0x4c061b) : _0x3e99f7(_0x4c061b)) || _0x4c061b;
  if (_0x516e93 && _0x4c061b) __defProp$7(_0x838743, _0x3f6b3e, _0x4c061b);
  return _0x4c061b;
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
    const _0xf6c00a = document["createElement"]("tucbs-slide-over-panel");
    _0xf6c00a["panelTitle"] = "Coğrafi Analiz", _0xf6c00a["panelWidth"] = this["panelWidth"], _0xf6c00a["onCloseRequest"] = () => this["_toggle"](), document["body"]["appendChild"](_0xf6c00a), this["_panelEl"] = _0xf6c00a, this["_renderIntoPanel"]();
  }
  ["disconnectedCallback"]() {
    var _a2;
    if (this["map"]) this["_layoutController"]["unbindMap"](this["map"]);
    (_a2 = this["_panelEl"]) == null ? void 0 : _a2["remove"](), this["_panelEl"] = null, super["disconnectedCallback"]();
  }
  ["firstUpdated"]() {
    bindMapByElementId(this, { "noIdTiming": "raf", "noIdMessage": '[tucbs-analysis-tool] "mapElementId" verilmedi ve "map" atanmadı; analiz paneli haritaya bağlanamayabilir.', "missingElementMessage": (_0x4f271b) => '[tucbs-analysis-tool] mapElementId="' + _0x4f271b + '" bulunamadı.' });
  }
  ["updated"](_0x3a0705) {
    _0x3a0705["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_customCssState"], "tucbs-analysis-tool");
    if (_0x3a0705["has"]("map")) {
      const _0xb28094 = _0x3a0705["get"]("map");
      if (_0xb28094) this["_layoutController"]["unbindMap"](_0xb28094);
      if (this["map"]) this["_layoutController"]["bindMap"](this["map"]);
    }
    _0x3a0705["has"]("panelWidth") && this["_open"] && this["_layoutController"]["setOpen"](!![], this["panelWidth"]);
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
var __defProp$6 = Object["defineProperty"], __getOwnPropDesc$7 = Object["getOwnPropertyDescriptor"], __decorateClass$7 = (_0x20817b, _0x40888a, _0x2400e0, _0xf0fbe8) => {
  var _0x4a659b = _0xf0fbe8 > 1 ? void 0 : _0xf0fbe8 ? __getOwnPropDesc$7(_0x40888a, _0x2400e0) : _0x40888a;
  for (var _0x3e3bd6 = _0x20817b["length"] - 1, _0x30be27; _0x3e3bd6 >= 0; _0x3e3bd6--) if (_0x30be27 = _0x20817b[_0x3e3bd6]) _0x4a659b = (_0xf0fbe8 ? _0x30be27(_0x40888a, _0x2400e0, _0x4a659b) : _0x30be27(_0x4a659b)) || _0x4a659b;
  if (_0xf0fbe8 && _0x4a659b) __defProp$6(_0x40888a, _0x2400e0, _0x4a659b);
  return _0x4a659b;
};
const POSITION_STYLES = { "right-center": { "top": "50%", "right": "1rem", "bottom": "", "left": "", "transform": "translateY(-50%)" }, "top-right": { "top": "1rem", "right": "1rem", "bottom": "", "left": "", "transform": "" }, "bottom-right": { "bottom": "1rem", "right": "1rem", "top": "", "left": "", "transform": "" }, "top-center": { "top": "1rem", "left": "50%", "right": "", "bottom": "", "transform": "translateX(-50%)" }, "top-left": { "top": "1rem", "left": "1rem", "right": "", "bottom": "", "transform": "" }, "bottom-left": { "bottom": "1rem", "left": "1rem", "top": "", "right": "", "transform": "" }, "left-center": { "top": "50%", "left": "1rem", "right": "", "bottom": "", "transform": "translateY(-50%)" } }, BUILTIN_TOOLS = { "zoom": "tucbs-zoom-tool", "goto-coordinate": "tucbs-goto-coordinate", "draw": "tucbs-draw-tool", "delete": "tucbs-delete-tool", "measure": "tucbs-measure-tool", "map-export": "tucbs-map-export", "settings": "tucbs-settings-tool", "print": "tucbs-print-tool", "analysis": "tucbs-analysis-tool" }, CUSTOM_ELEMENT_NAME_PATTERN = /^[a-z][a-z0-9]*(-[a-z0-9]+)+$/;
let TucbsToolbar = class extends i$2 {
  constructor() {
    super(...arguments), this["mapElementId"] = "", this["position"] = "right-center", this["tools"] = "zoom", this["customTools"] = {}, this["toolProps"] = {}, this["customCss"] = "", this["_customCssState"] = { "sheet": null }, this["_timers"] = new TimerBag(this);
  }
  ["addTool"](_0x429016, _0x79b089) {
    const _0x44eda8 = this["_toolIds"]();
    if (_0x79b089 === void 0) _0x44eda8["push"](_0x429016);
    else _0x44eda8["splice"](_0x79b089, 0, _0x429016);
    this["tools"] = _0x44eda8["join"](",");
  }
  ["removeTool"](_0x27b2d2) {
    this["tools"] = this["_toolIds"]()["filter"]((_0x46e9f1) => _0x46e9f1 !== _0x27b2d2)["join"](",");
  }
  ["registerTool"](_0x5e6714, _0x236d0c) {
    if (!CUSTOM_ELEMENT_NAME_PATTERN["test"](_0x236d0c)) {
      console["warn"]('[tucbs-toolbar] registerTool("' + _0x5e6714 + '", "' + _0x236d0c + '") -- gecersiz custom element adi, yok sayildi.');
      return;
    }
    this["customTools"] = { ...this["customTools"], [_0x5e6714]: _0x236d0c };
  }
  ["setToolProps"](_0x3bb3a4, _0x5a86e3) {
    this["toolProps"] = { ...this["toolProps"], [_0x3bb3a4]: _0x5a86e3 };
  }
  ["_toolIds"]() {
    return this["tools"]["split"](",")["map"]((_0xa80054) => _0xa80054["trim"]())["filter"](Boolean);
  }
  ["_tagFor"](_0x205b35) {
    const _0x93e519 = this["customTools"][_0x205b35] ?? BUILTIN_TOOLS[_0x205b35];
    if (_0x93e519 && !CUSTOM_ELEMENT_NAME_PATTERN["test"](_0x93e519)) return void 0;
    return _0x93e519;
  }
  ["willUpdate"](_0x1e446e) {
    _0x1e446e["has"]("position") && Object["assign"](this["style"], POSITION_STYLES[this["position"]]);
    if (_0x1e446e["has"]("tools") || _0x1e446e["has"]("customTools")) {
      const _0x359bc3 = this["_toolIds"]()["filter"]((_0x465af4) => !this["_tagFor"](_0x465af4));
      _0x359bc3["length"] > 0 && console["warn"]("[tucbs-toolbar] Bilinmeyen/gecersiz arac id'leri: " + _0x359bc3["join"](", ") + " -- yok sayildi (registerTool() ile kayit edilmedi ya da gecersiz etiket adi).");
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
    const _0x2e3417 = document["getElementById"](this["mapElementId"]);
    if (!_0x2e3417) {
      console["warn"]('[tucbs-toolbar] mapElementId="' + this["mapElementId"] + '" ile eslesen bir element bulunamadi; bilesen haritaya baglanamadigi icin icerdeki araclar islevsiz kalacak.');
      return;
    }
    whenTucbsMapReady(_0x2e3417, (_0x5ec8d3) => {
      _0x5ec8d3["map"] && (this["map"] = _0x5ec8d3["map"]);
    });
  }
  ["_renderTool"](_0x2e77f0) {
    const _0x214567 = this["_tagFor"](_0x2e77f0);
    if (!_0x214567) return null;
    const _0xa3e3ea = s(_0x214567);
    return u`<${_0xa3e3ea} data-tool-id=${_0x2e77f0} .map=${this["map"]}></${_0xa3e3ea}>`;
  }
  ["_applyToolProps"]() {
    for (const [_0x5cdbb1, _0x2a5e16] of Object["entries"](this["toolProps"])) {
      const _0x5b483d = this["renderRoot"]["querySelector"]('[data-tool-id="' + _0x5cdbb1 + '"]');
      if (_0x5b483d) Object["assign"](_0x5b483d, _0x2a5e16);
    }
  }
  ["updated"](_0x829c51) {
    _0x829c51["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_customCssState"], "tucbs-toolbar"), (_0x829c51["has"]("toolProps") || _0x829c51["has"]("map") || _0x829c51["has"]("tools") || _0x829c51["has"]("customTools")) && this["_applyToolProps"]();
  }
  ["render"]() {
    if (!this["map"]) return A;
    return u` <div class="toolbar">${this["_toolIds"]()["map"]((_0x5aea82) => this["_renderTool"](_0x5aea82))}</div> `;
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
var __defProp$5 = Object["defineProperty"], __getOwnPropDesc$6 = Object["getOwnPropertyDescriptor"], __decorateClass$6 = (_0x36ec3a, _0x1e93f6, _0x1704c5, _0x4dfc65) => {
  var _0x15aa94 = _0x4dfc65 > 1 ? void 0 : _0x4dfc65 ? __getOwnPropDesc$6(_0x1e93f6, _0x1704c5) : _0x1e93f6;
  for (var _0x10d994 = _0x36ec3a["length"] - 1, _0xd1937b; _0x10d994 >= 0; _0x10d994--) if (_0xd1937b = _0x36ec3a[_0x10d994]) _0x15aa94 = (_0x4dfc65 ? _0xd1937b(_0x1e93f6, _0x1704c5, _0x15aa94) : _0xd1937b(_0x15aa94)) || _0x15aa94;
  if (_0x4dfc65 && _0x15aa94) __defProp$5(_0x1e93f6, _0x1704c5, _0x15aa94);
  return _0x15aa94;
};
let TucbsInfoBar = class extends i$2 {
  constructor() {
    super(...arguments), this["mapElementId"] = "", this["customCss"] = "", this["attribution"] = "EPSG:4326 Altlık Harita, Harita Genel Müdürlüğü (HGM) tarafından sağlanmaktadır.", this["_customCssState"] = { "sheet": null }, this["_lon"] = null, this["_lat"] = null, this["_height"] = null, this["_scale"] = null, this["_mouseMoveRaf"] = null, this["_pendingMouseDetail"] = null, this["_cameraRaf"] = null, this["_timers"] = new TimerBag(this), this["_onMapMouseMove"] = (_0x41c895) => {
      this["_pendingMouseDetail"] = _0x41c895;
      if (this["_mouseMoveRaf"] !== null) return;
      this["_mouseMoveRaf"] = this["_timers"]["requestAnimationFrame"](() => {
        this["_mouseMoveRaf"] = null;
        const _0x3ad7c0 = this["_pendingMouseDetail"];
        if (!_0x3ad7c0) return;
        const [_0x436712, _0x670168] = _0x3ad7c0["position"];
        this["_lon"] = _0x436712, this["_lat"] = _0x670168, this["_height"] = this["_sampleHeight"](_0x436712, _0x670168);
      });
    }, this["_onCameraChanged"] = () => {
      if (this["_cameraRaf"] !== null) return;
      this["_cameraRaf"] = this["_timers"]["requestAnimationFrame"](() => {
        this["_cameraRaf"] = null, this["_scale"] = this["_computeScale"]();
      });
    }, this["_onPostRender"] = () => {
      var _a2, _b;
      const _0x170029 = (_a2 = this["interactionManager"]) == null ? void 0 : _a2["camera"];
      if (!_0x170029) return;
      if ((_b = this["_lastCameraPosition"]) == null ? void 0 : _b["equals"](_0x170029["positionWC"])) return;
      this["_lastCameraPosition"] = _0x170029["positionWC"]["clone"](this["_lastCameraPosition"]), this["_onCameraChanged"]();
    };
  }
  ["firstUpdated"]() {
    if (this["interactionManager"] || !this["mapElementId"]) return;
    const _0x21b4a5 = document["getElementById"](this["mapElementId"]);
    if (!_0x21b4a5) return;
    whenTucbsMapReady(_0x21b4a5, (_0x3c7f62) => {
      _0x3c7f62["interaction"] && (this["interactionManager"] = _0x3c7f62["interaction"]);
    });
  }
  ["updated"](_0x24e8b7) {
    _0x24e8b7["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_customCssState"], "tucbs-info-bar");
    if (!_0x24e8b7["has"]("interactionManager")) return;
    const _0x412f22 = _0x24e8b7["get"]("interactionManager");
    if (_0x412f22) this["_unbind"](_0x412f22);
    this["interactionManager"] && (this["_bind"](this["interactionManager"]), this["_scale"] = this["_computeScale"]());
  }
  ["disconnectedCallback"]() {
    if (this["interactionManager"]) this["_unbind"](this["interactionManager"]);
    super["disconnectedCallback"]();
  }
  ["_bind"](_0x34e40a) {
    this["_removePostRender"] = _0x34e40a["scene"]["postRender"]["addEventListener"](this["_onPostRender"]), _0x34e40a["on"]("map:mousemove", this["_onMapMouseMove"]), _0x34e40a["on"]("camera:changed", this["_onCameraChanged"]), _0x34e40a["on"]("camera:moveEnd", this["_onCameraChanged"]);
  }
  ["_unbind"](_0x584c85) {
    var _a2;
    (_a2 = this["_removePostRender"]) == null ? void 0 : _a2.call(this), this["_removePostRender"] = void 0, _0x584c85["off"]("map:mousemove", this["_onMapMouseMove"]), _0x584c85["off"]("camera:changed", this["_onCameraChanged"]), _0x584c85["off"]("camera:moveEnd", this["_onCameraChanged"]);
  }
  ["_sampleHeight"](_0xb433f5, _0x1d282b) {
    var _a2;
    const _0x1ba104 = (_a2 = this["interactionManager"]) == null ? void 0 : _a2["scene"]["globe"];
    if (!_0x1ba104) return 0;
    const _0x24e14a = _0x1ba104["getHeight"](Cartographic["fromDegrees"](_0xb433f5, _0x1d282b));
    return _0x24e14a ?? 0;
  }
  ["_computeScale"]() {
    var _a2;
    const _0x566161 = (_a2 = this["interactionManager"]) == null ? void 0 : _a2["scene"];
    if (!_0x566161) return null;
    const _0x157d84 = measureGround(_0x566161);
    return _0x157d84 ? snapScaleForDisplay(_0x157d84["scale"]) : null;
  }
  ["_formatLat"]() {
    if (this["_lat"] === null) return "–";
    const _0x21e4bd = this["_lat"] >= 0 ? "N" : "S";
    return "Enlem " + Math["abs"](this["_lat"])["toFixed"](5) + "° " + _0x21e4bd;
  }
  ["_formatLon"]() {
    if (this["_lon"] === null) return "–";
    const _0x4200ca = this["_lon"] >= 0 ? "E" : "W";
    return "Boylam " + Math["abs"](this["_lon"])["toFixed"](5) + "° " + _0x4200ca;
  }
  ["_formatHeight"]() {
    if (this["_height"] === null) return "–";
    return "Yükseklik " + Math["round"](this["_height"]) + " m";
  }
  ["_formatScale"]() {
    if (this["_scale"] === null || !Number["isFinite"](this["_scale"])) return "–";
    const _0x5c9ebb = Math["round"](this["_scale"])["toLocaleString"]("tr-TR");
    return "Ölçek 1/" + _0x5c9ebb;
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
  constructor(_0x965986) {
    var _a2;
    if (super(_0x965986), _0x965986["type"] !== t$2["ATTRIBUTE"] || "class" !== _0x965986["name"] || ((_a2 = _0x965986["strings"]) == null ? void 0 : _a2["length"]) > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  ["render"](_0x31f0a4) {
    return " " + Object["keys"](_0x31f0a4)["filter"]((_0x80ffa7) => _0x31f0a4[_0x80ffa7])["join"](" ") + " ";
  }
  ["update"](_0x59c519, [_0x243f95]) {
    var _a2, _b;
    if (void 0 === this["st"]) {
      this["st"] = /* @__PURE__ */ new Set(), void 0 !== _0x59c519["strings"] && (this["nt"] = new Set(_0x59c519["strings"]["join"](" ")["split"](/\s/)["filter"]((_0x301400) => "" !== _0x301400)));
      for (const _0x29be02 in _0x243f95) _0x243f95[_0x29be02] && !((_a2 = this["nt"]) == null ? void 0 : _a2["has"](_0x29be02)) && this["st"]["add"](_0x29be02);
      return this["render"](_0x243f95);
    }
    const _0x1d3ef2 = _0x59c519["element"]["classList"];
    for (const _0x58e0d7 of this["st"]) _0x58e0d7 in _0x243f95 || (_0x1d3ef2["remove"](_0x58e0d7), this["st"]["delete"](_0x58e0d7));
    for (const _0x31c15a in _0x243f95) {
      const _0x4004ee = !!_0x243f95[_0x31c15a];
      _0x4004ee === this["st"]["has"](_0x31c15a) || ((_b = this["nt"]) == null ? void 0 : _b["has"](_0x31c15a)) || (_0x4004ee ? (_0x1d3ef2["add"](_0x31c15a), this["st"]["add"](_0x31c15a)) : (_0x1d3ef2["remove"](_0x31c15a), this["st"]["delete"](_0x31c15a)));
    }
    return E;
  }
});
function deferredMeasure(_0x2e31bc, _0x5396af) {
  _0x2e31bc["requestAnimationFrame"](_0x5396af), _0x2e31bc["setTimeout"](_0x5396af, 150);
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
function stripHtml(_0x4b6f19) {
  return _0x4b6f19["replace"](/<[^>]*>/g, " ")["replace"](/\s+/g, " ")["trim"]();
}
function toResultItem(_0x3fe2e4, _0x14b19d) {
  const _0x5391f6 = _0x3fe2e4["layerId"] ? _0x14b19d == null ? void 0 : _0x14b19d["getLayers"]()["find"]((_0x56aa44) => _0x56aa44["id"] === _0x3fe2e4["layerId"]) : void 0, _0x293e4e = (_0x5391f6 == null ? void 0 : _0x5391f6["title"]) ?? _0x3fe2e4["layerId"] ?? _0x3fe2e4["featureId"] ?? "—", _0x48f2dd = Object["entries"](_0x3fe2e4["properties"])["filter"](([_0x27c337]) => _0x27c337 !== "layerId" && _0x27c337 !== "featureId");
  return { "layerTitle": _0x293e4e, "layerType": _0x5391f6 == null ? void 0 : _0x5391f6["layerType"], "propertyEntries": _0x48f2dd, "entity": _0x3fe2e4["entity"] };
}
function toImageryResultItem(_0x27311a, _0x5455eb) {
  const _0x1f728f = _0x5455eb == null ? void 0 : _0x5455eb["getLayers"]()["find"]((_0x188ea7) => _0x188ea7["cesiumObject"] === _0x27311a["imageryLayer"]), _0x24dddc = (_0x1f728f == null ? void 0 : _0x1f728f["title"]) ?? _0x27311a["name"] ?? "—", _0x1e1144 = Object["entries"](_0x27311a["properties"]);
  if (_0x1e1144["length"] === 0 && _0x27311a["description"]) {
    const _0x275208 = stripHtml(_0x27311a["description"]);
    if (_0x275208) return { "layerTitle": _0x24dddc, "layerType": _0x1f728f == null ? void 0 : _0x1f728f["layerType"], "propertyEntries": [["Bilgi", _0x275208]], "geometryHint": _0x27311a["geometryHint"] };
  }
  return { "layerTitle": _0x24dddc, "layerType": _0x1f728f == null ? void 0 : _0x1f728f["layerType"], "propertyEntries": _0x1e1144, "geometryHint": _0x27311a["geometryHint"] };
}
function toImageryResultItems(_0x511544, _0x2eb6d9) {
  return _0x511544["map"]((_0x11714e) => toImageryResultItem(_0x11714e, _0x2eb6d9))["filter"]((_0x4d2229) => _0x4d2229["propertyEntries"]["length"] > 0);
}
function pagedTableItems(_0x5dd883, _0xf4f8c6, _0x487830) {
  const _0x12219c = _0xf4f8c6 * _0x487830;
  return _0x5dd883["slice"](_0x12219c, _0x12219c + _0x487830);
}
function itemGlobalIndex(_0x53d7de, _0x3f83d1) {
  return _0x53d7de["indexOf"](_0x3f83d1) + 1;
}
const COMPACT_PANEL_MAX_WIDTH = 720, COMPACT_ITEM_BODY_CHROME = 34, VIEWPORT_MARGIN = 32;
function compactItemBodyMaxWidth(_0xc635f9) {
  const _0xbc1720 = Math["min"](COMPACT_PANEL_MAX_WIDTH, _0xc635f9 - VIEWPORT_MARGIN);
  return Math["max"](0, _0xbc1720 - COMPACT_ITEM_BODY_CHROME);
}
const WKT_PATTERN = /^\s*(?:MULTI)?(?:POINT|LINESTRING|POLYGON)|^\s*GEOMETRYCOLLECTION/i, NUMERIC_ARRAY_OR_COMMA = /\[-?[\d.eE+]+(?:,-?[\d.eE+]+)+\]|,/g;
function formatPropertyValue(_0x210437) {
  if (_0x210437 === null || _0x210437 === void 0) return "—";
  let _0x5c5fcb = typeof _0x210437 === "object" ? JSON["stringify"](_0x210437) : String(_0x210437);
  return WKT_PATTERN["test"](_0x5c5fcb) && (_0x5c5fcb = _0x5c5fcb["replace"](new RegExp("(?<=\\d) (?=-?\\d)", "g"), " ")), _0x5c5fcb["replace"](NUMERIC_ARRAY_OR_COMMA, (_0x430f24) => _0x430f24 === "," ? ",​" : _0x430f24);
}
const NEUTRAL_VECTOR_CLICK_STATE = { "kind": "neutral" };
function toNeutral() {
  return NEUTRAL_VECTOR_CLICK_STATE;
}
function toEntityPending(_0x1a07b8) {
  return { "kind": "entityPending", "pendingVectorClick": _0x1a07b8 };
}
function toEntityCommitted() {
  return { "kind": "entityCommitted" };
}
var __defProp$4 = Object["defineProperty"], __getOwnPropDesc$5 = Object["getOwnPropertyDescriptor"], __decorateClass$5 = (_0x2a4e1a, _0x79727b, _0x5d2432, _0x2ccc4d) => {
  var _0x119385 = _0x2ccc4d > 1 ? void 0 : _0x2ccc4d ? __getOwnPropDesc$5(_0x79727b, _0x5d2432) : _0x79727b;
  for (var _0x2270ea = _0x2a4e1a["length"] - 1, _0xf5eb; _0x2270ea >= 0; _0x2270ea--) if (_0xf5eb = _0x2a4e1a[_0x2270ea]) _0x119385 = (_0x2ccc4d ? _0xf5eb(_0x79727b, _0x5d2432, _0x119385) : _0xf5eb(_0x119385)) || _0x119385;
  if (_0x2ccc4d && _0x119385) __defProp$4(_0x79727b, _0x5d2432, _0x119385);
  return _0x119385;
};
function carbonIcon(_0x4e246e) {
  return o$1(iconNodeToString(_0x4e246e));
}
const ICON_LOCATION = carbonIcon(_16_default$i), ICON_INFORMATION = carbonIcon(_20_default$1), ICON_CLOSE$2 = carbonIcon(_16_default$v), ICON_ZOOM_IN = carbonIcon(_20_default), BASIC_DISMISS_MS = 4e3, IDENTIFY_PAGE_SIZE = 5, MAX_ITEM_TITLE_WIDTH = 250, ZOOM_FLIGHT_DURATION_SECONDS = 0.6;
function formatLat(_0x1b3c41) {
  return Math["abs"](_0x1b3c41)["toFixed"](5) + "° " + (_0x1b3c41 >= 0 ? "N" : "S");
}
function formatLon(_0x515514) {
  return Math["abs"](_0x515514)["toFixed"](5) + "° " + (_0x515514 >= 0 ? "E" : "W");
}
let TucbsIdentifyPanel = class extends i$2 {
  constructor() {
    super(...arguments), this["mapElementId"] = "", this["customCss"] = "", this["_customCssState"] = { "sheet": null }, this["_basicOpen"] = ![], this["_basicLon"] = 0, this["_basicLat"] = 0, this["_imageryPending"] = ![], this["_vectorClickState"] = NEUTRAL_VECTOR_CLICK_STATE, this["_tableOpen"] = ![], this["_tableItems"] = [], this["_tableLon"] = 0, this["_tableLat"] = 0, this["_accordionPage"] = 0, this["_tableSource"] = "vector", this["_timers"] = new TimerBag(this), this["_basicDismissTimer"] = null, this["_drag"] = new DraggablePanelController(this, { "getPanel": () => this["_attrPanelEl"], "ignoreSelector": ".attr-close-btn" }), this["_onMapClick"] = (_0x3085be) => {
      var _a2;
      if ((_a2 = this["interactionManager"]) == null ? void 0 : _a2["isIdentifySuspended"]()) return;
      this["_tableOpen"] = ![], this["_imageryPending"] = ![], this["_vectorClickState"] = toNeutral();
      const [_0x299cdb, _0x62cd7f] = _0x3085be["position"];
      this["_timers"]["setTimeout"](() => {
        if (this["_imageryPending"]) return;
        this["_basicLon"] = _0x299cdb, this["_basicLat"] = _0x62cd7f, this["_basicOpen"] = !![], this["_scheduleBasicDismiss"]();
      }, 0);
    }, this["_onInteractionSuspend"] = () => {
      this["_closeBasic"]();
    }, this["_onImageryQuerying"] = () => {
      var _a2;
      if ((_a2 = this["interactionManager"]) == null ? void 0 : _a2["isIdentifySuspended"]()) return;
      this["_imageryPending"] = !![];
    }, this["_compactItemBoxGeneration"] = new AsyncGeneration(), this["_itemTitleGroupWidthGeneration"] = new AsyncGeneration(), this["_onEntityClick"] = (_0x20783b) => {
      var _a2;
      if ((_a2 = this["interactionManager"]) == null ? void 0 : _a2["isIdentifySuspended"]()) return;
      this["_imageryPending"] = ![];
      const [_0x3d4d83, _0xee1e1b] = _0x20783b["position"];
      this["_vectorClickState"] = toEntityPending({ "items": _0x20783b["features"]["map"]((_0xdd9d29) => toResultItem(_0xdd9d29, this["layerManager"])), "lon": _0x3d4d83, "lat": _0xee1e1b }), this["_timers"]["setTimeout"](() => {
        if (this["_vectorClickState"]["kind"] !== "entityPending" || this["_imageryPending"]) return;
        const { pendingVectorClick: _0xc06c0b } = this["_vectorClickState"];
        this["_openTable"](_0xc06c0b["items"], _0xc06c0b["lon"], _0xc06c0b["lat"], "vector");
      }, 0);
    }, this["_onImageryClick"] = (_0x2538f2) => {
      var _a2;
      if ((_a2 = this["interactionManager"]) == null ? void 0 : _a2["isIdentifySuspended"]()) return;
      this["_imageryPending"] = ![];
      if (this["_vectorClickState"]["kind"] !== "neutral") {
        const _0xf69fe6 = toImageryResultItems(_0x2538f2["features"], this["layerManager"]);
        if (this["_vectorClickState"]["kind"] === "entityPending") {
          const { pendingVectorClick: _0x1d5810 } = this["_vectorClickState"], _0x129102 = _0x1d5810["items"];
          this["_openTable"]([..._0x129102, ..._0xf69fe6], _0x1d5810["lon"], _0x1d5810["lat"], _0xf69fe6["length"] > 0 ? "mixed" : "vector");
          return;
        }
        this["_tableOpen"] && _0xf69fe6["length"] > 0 && (this["_tableItems"] = [...this["_tableItems"], ..._0xf69fe6], this["_tableSource"] = "mixed");
        return;
      }
      const _0x58fdec = toImageryResultItems(_0x2538f2["features"], this["layerManager"]), [_0x54d39a, _0x596991] = _0x2538f2["position"];
      if (_0x58fdec["length"] === 0) {
        showToast("info", "Bu konumda öznitelik bilgisi bulunamadı."), this["_basicLon"] = _0x54d39a, this["_basicLat"] = _0x596991, this["_basicOpen"] = !![], this["_scheduleBasicDismiss"]();
        return;
      }
      this["_openTable"](_0x58fdec, _0x54d39a, _0x596991, "imagery");
    }, this["_onAccordionItemBeforeToggle"] = (_0xe0afeb) => {
      const _0x2429b3 = _0xe0afeb["detail"];
      if (_0x2429b3["open"]) return;
      const _0x36570a = _0xe0afeb["currentTarget"], _0x229bdf = _0x36570a["querySelectorAll"]("cds-accordion-item"), _0x9aa46d = Array["from"](_0x229bdf)["filter"]((_0x13b398) => _0x13b398["open"])["length"];
      if (_0x9aa46d <= 1) _0xe0afeb["preventDefault"]();
    }, this["_onAccordionItemToggled"] = (_0x2350fd) => {
      const _0x5383f2 = _0x2350fd["detail"];
      if (_0x5383f2["open"]) {
        const _0x526abb = _0x2350fd["target"], _0x225d8b = _0x2350fd["currentTarget"];
        for (const _0x48cc56 of _0x225d8b["querySelectorAll"]("cds-accordion-item")) {
          if (_0x48cc56 !== _0x526abb) _0x48cc56["open"] = ![];
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
    const _0x1aca0e = this["_attrPanelEl"];
    if (!_0x1aca0e) return;
    if (!this["_isCompactPanel"] || this["_tableItems"]["length"] <= 1) {
      _0x1aca0e["style"]["removeProperty"]("--tucbs-item-min-width"), _0x1aca0e["style"]["removeProperty"]("--tucbs-item-min-height");
      return;
    }
    const _0x176d43 = this["_compactItemBoxGeneration"]["next"](), _0x57ee54 = this["_tableItems"], _0xec3c8 = document["createElement"]("div");
    _0xec3c8["style"]["cssText"] = "position:fixed;top:-99999px;left:-99999px;visibility:hidden;width:max-content;max-width:" + compactItemBodyMaxWidth(window["innerWidth"]) + "px;", (_a2 = this["shadowRoot"]) == null ? void 0 : _a2["appendChild"](_0xec3c8);
    let _0x13df29 = 0, _0x29b51d = 0;
    for (const _0x2ee5c7 of _0x57ee54) {
      const _0x16bf5c = document["createElement"]("div");
      _0x16bf5c["className"] = "item-body", _0xec3c8["replaceChildren"](_0x16bf5c), D(this["_renderPropertyTable"](_0x2ee5c7["propertyEntries"]), _0x16bf5c), await new Promise((_0x37c0a4) => this["_timers"]["requestAnimationFrame"](() => _0x37c0a4()));
      if (!this["_compactItemBoxGeneration"]["isCurrent"](_0x176d43)) {
        _0xec3c8["remove"]();
        return;
      }
      const _0x40174f = _0x16bf5c["getBoundingClientRect"]();
      _0x13df29 = Math["max"](_0x13df29, _0x40174f["width"]), _0x29b51d = Math["max"](_0x29b51d, _0x40174f["height"]);
    }
    _0xec3c8["remove"]();
    if (!this["_compactItemBoxGeneration"]["isCurrent"](_0x176d43)) return;
    if (_0x13df29 > 0) _0x1aca0e["style"]["setProperty"]("--tucbs-item-min-width", Math["ceil"](_0x13df29) + "px");
    if (_0x29b51d > 0) _0x1aca0e["style"]["setProperty"]("--tucbs-item-min-height", Math["ceil"](_0x29b51d) + "px");
  }
  async ["_syncItemTitleGroupWidth"]() {
    var _a2;
    const _0x2e7d90 = this["_attrPanelEl"];
    if (!_0x2e7d90) return;
    if (this["_tableItems"]["length"] <= 1) {
      _0x2e7d90["style"]["removeProperty"]("--tucbs-item-title-width"), _0x2e7d90["style"]["removeProperty"]("--tucbs-item-suffix-width"), _0x2e7d90["style"]["removeProperty"]("--tucbs-item-tag-width");
      return;
    }
    const _0xcbc42 = this["_itemTitleGroupWidthGeneration"]["next"](), _0x287b5f = this["_tableItems"], _0x476db2 = document["createElement"]("cds-accordion-item");
    _0x476db2["style"]["cssText"] = "position:fixed;top:-99999px;left:-99999px;visibility:hidden;", (_a2 = this["shadowRoot"]) == null ? void 0 : _a2["appendChild"](_0x476db2);
    let _0x16d21c = 0, _0x51b468 = 0, _0x23ffa3 = 0;
    for (const _0x55032a of _0x287b5f) {
      const _0x1c3cd5 = document["createElement"]("span");
      _0x1c3cd5["slot"] = "title", _0x1c3cd5["className"] = "item-title-group";
      const _0xadd39e = document["createElement"]("span");
      _0xadd39e["className"] = "item-title-text", _0xadd39e["textContent"] = _0x55032a["layerTitle"], _0x1c3cd5["appendChild"](_0xadd39e);
      const _0x4a689a = document["createElement"]("span");
      _0x4a689a["className"] = "item-title-suffix", _0x4a689a["textContent"] = String(this["_itemGlobalIndex"](_0x55032a)), _0x1c3cd5["appendChild"](_0x4a689a);
      const _0x52267a = !!_0x55032a["layerType"] && _0x55032a["layerType"] !== "DRAWING" && _0x55032a["layerType"] !== "MEASURE";
      let _0x18f678 = null;
      _0x52267a && (_0x18f678 = document["createElement"]("span"), _0x18f678["className"] = "attr-type-tag", _0x18f678["textContent"] = _0x55032a["layerType"], _0x1c3cd5["appendChild"](_0x18f678));
      _0x476db2["replaceChildren"](_0x1c3cd5), await new Promise((_0x40f606) => this["_timers"]["requestAnimationFrame"](() => _0x40f606()));
      if (!this["_itemTitleGroupWidthGeneration"]["isCurrent"](_0xcbc42)) {
        _0x476db2["remove"]();
        return;
      }
      _0x16d21c = Math["max"](_0x16d21c, _0xadd39e["getBoundingClientRect"]()["width"]), _0x51b468 = Math["max"](_0x51b468, _0x4a689a["getBoundingClientRect"]()["width"]);
      if (_0x18f678) _0x23ffa3 = Math["max"](_0x23ffa3, _0x18f678["getBoundingClientRect"]()["width"]);
    }
    _0x476db2["remove"]();
    if (!this["_itemTitleGroupWidthGeneration"]["isCurrent"](_0xcbc42)) return;
    const _0x136c1b = Math["min"](Math["ceil"](_0x16d21c), MAX_ITEM_TITLE_WIDTH);
    if (_0x136c1b > 0) _0x2e7d90["style"]["setProperty"]("--tucbs-item-title-width", _0x136c1b + "px");
    if (_0x51b468 > 0) _0x2e7d90["style"]["setProperty"]("--tucbs-item-suffix-width", Math["ceil"](_0x51b468) + "px");
    if (_0x23ffa3 > 0) _0x2e7d90["style"]["setProperty"]("--tucbs-item-tag-width", Math["ceil"](_0x23ffa3) + "px");
  }
  get ["_pagedTableItems"]() {
    return pagedTableItems(this["_tableItems"], this["_accordionPage"], IDENTIFY_PAGE_SIZE);
  }
  ["_goToAccordionPage"](_0x298192) {
    this["_accordionPage"] = Math["max"](0, Math["min"](_0x298192, this["_accordionPageCount"] - 1));
  }
  ["_itemGlobalIndex"](_0x484a36) {
    return itemGlobalIndex(this["_tableItems"], _0x484a36);
  }
  ["_openTable"](_0x32c359, _0x14da6d, _0x1a25a4, _0x5aae9e) {
    this["_vectorClickState"] = toEntityCommitted(), this["_basicOpen"] = ![], this["_clearBasicDismiss"]();
    for (const _0x5b7814 of document["querySelectorAll"]("tucbs-style-editor")) {
      if (_0x5b7814["open"]) _0x5b7814["close"]();
    }
    this["_tableSource"] = _0x5aae9e, this["_tableItems"] = _0x32c359, this["_accordionPage"] = 0, this["_tableLon"] = _0x14da6d, this["_tableLat"] = _0x1a25a4, this["_tableOpen"] = !![];
  }
  ["_resetAccordionOpen"]() {
    const _0x31728b = () => {
      var _a2;
      const _0x125bae = (_a2 = this["shadowRoot"]) == null ? void 0 : _a2["querySelectorAll"]("cds-accordion-item:not(.accordion-filler)");
      _0x125bae == null ? void 0 : _0x125bae["forEach"]((_0x1687c9, _0x46b89e) => {
        _0x1687c9["open"] = _0x46b89e === 0;
      });
    };
    deferredMeasure(this["_timers"], _0x31728b);
  }
  ["_openAccordionItem"](_0x1fe317) {
    var _a2;
    const _0x3fb8b2 = (_a2 = this["shadowRoot"]) == null ? void 0 : _a2["querySelectorAll"]("cds-accordion-item:not(.accordion-filler)");
    _0x3fb8b2 == null ? void 0 : _0x3fb8b2["forEach"]((_0x3b0891, _0x265b43) => {
      _0x3b0891["open"] = _0x265b43 === _0x1fe317;
    }), this["_scheduleScrollThumbSync"]();
  }
  ["firstUpdated"]() {
    if (!this["mapElementId"]) return;
    const _0x5a3c86 = document["getElementById"](this["mapElementId"]);
    if (!_0x5a3c86) return;
    const _0x3e7579 = () => {
      !this["interactionManager"] && _0x5a3c86["interaction"] && (this["interactionManager"] = _0x5a3c86["interaction"]), !this["layerManager"] && _0x5a3c86["layerManager"] && (this["layerManager"] = _0x5a3c86["layerManager"]);
    };
    whenTucbsMapReady(_0x5a3c86, _0x3e7579);
  }
  ["updated"](_0x407d4d) {
    var _a2, _b, _c, _d;
    _0x407d4d["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_customCssState"], "tucbs-identify-panel");
    if (_0x407d4d["has"]("interactionManager")) {
      const _0x4b97f3 = _0x407d4d["get"]("interactionManager");
      if (_0x4b97f3) this["_unbind"](_0x4b97f3);
      if (this["interactionManager"]) this["_bind"](this["interactionManager"]);
    }
    _0x407d4d["has"]("_tableOpen") && this["_tableOpen"] && ((_a2 = this["_attrPanelEl"]) == null ? void 0 : _a2["style"]["removeProperty"]("left"), (_b = this["_attrPanelEl"]) == null ? void 0 : _b["style"]["removeProperty"]("top"), (_c = this["_attrPanelEl"]) == null ? void 0 : _c["style"]["removeProperty"]("transform")), _0x407d4d["has"]("_tableOpen") && !this["_tableOpen"] && ((_d = this["layerManager"]) == null ? void 0 : _d["clearHighlight"]()), (_0x407d4d["has"]("_tableOpen") || _0x407d4d["has"]("_tableItems")) && (this["_scheduleScrollThumbSync"](), void this["_syncCompactItemBox"](), void this["_syncItemTitleGroupWidth"]()), (_0x407d4d["has"]("_tableOpen") || _0x407d4d["has"]("_tableItems") || _0x407d4d["has"]("_accordionPage")) && this["_resetAccordionOpen"]();
  }
  ["disconnectedCallback"]() {
    if (this["interactionManager"]) this["_unbind"](this["interactionManager"]);
    this["_clearBasicDismiss"](), super["disconnectedCallback"]();
  }
  ["_bind"](_0x426128) {
    _0x426128["on"]("map:click", this["_onMapClick"]), _0x426128["on"]("interaction:suspend", this["_onInteractionSuspend"]), _0x426128["on"]("entity:click", this["_onEntityClick"]), _0x426128["on"]("imagery:click", this["_onImageryClick"]), _0x426128["on"]("imagery:querying", this["_onImageryQuerying"]);
  }
  ["_unbind"](_0x2a40c3) {
    _0x2a40c3["off"]("map:click", this["_onMapClick"]), _0x2a40c3["off"]("interaction:suspend", this["_onInteractionSuspend"]), _0x2a40c3["off"]("entity:click", this["_onEntityClick"]), _0x2a40c3["off"]("imagery:click", this["_onImageryClick"]), _0x2a40c3["off"]("imagery:querying", this["_onImageryQuerying"]);
  }
  ["_scheduleBasicDismiss"]() {
    this["_clearBasicDismiss"](), this["_basicDismissTimer"] = this["_timers"]["setTimeout"](() => {
      this["_basicDismissTimer"] = null, this["_basicOpen"] = ![];
    }, BASIC_DISMISS_MS);
  }
  ["_clearBasicDismiss"]() {
    this["_timers"]["clearTimeout"](this["_basicDismissTimer"]), this["_basicDismissTimer"] = null;
  }
  ["_syncScrollThumbFor"](_0x5693a1) {
    const _0x13523b = _0x5693a1["closest"](".attr-body-wrap, .item-body-wrap"), _0x1b3426 = _0x13523b == null ? void 0 : _0x13523b["querySelector"](".scroll-thumb, .item-scroll-thumb");
    if (_0x1b3426) syncVirtualScrollbar(_0x5693a1, _0x1b3426);
  }
  ["_scheduleScrollThumbSync"]() {
    const _0x2f830c = () => {
      var _a2;
      (_a2 = this["shadowRoot"]) == null ? void 0 : _a2["querySelectorAll"](".attr-body, .item-body")["forEach"]((_0x12e1a5) => this["_syncScrollThumbFor"](_0x12e1a5));
    };
    deferredMeasure(this["_timers"], _0x2f830c);
  }
  ["_startThumbDrag"](_0x12f0e0) {
    const _0x555cdc = _0x12f0e0["currentTarget"], _0x4e4c7a = _0x555cdc["closest"](".attr-body-wrap, .item-body-wrap"), _0x1e10a8 = _0x4e4c7a == null ? void 0 : _0x4e4c7a["querySelector"](".attr-body, .item-body");
    if (!_0x1e10a8) return;
    startVirtualScrollbarDrag(_0x12f0e0, _0x1e10a8);
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
  ["_zoomToItem"](_0xe2a806, _0x27f02a) {
    var _a2, _b, _c, _d, _e, _f, _g, _h;
    (_a2 = this["layerManager"]) == null ? void 0 : _a2["clearHighlight"]();
    if (_0xe2a806["entity"]) void ((_b = this["layerManager"]) == null ? void 0 : _b["zoomToEntity"](_0xe2a806["entity"], { "duration": ZOOM_FLIGHT_DURATION_SECONDS })), (_c = this["layerManager"]) == null ? void 0 : _c["highlightEntity"](_0xe2a806["entity"]);
    else {
      if (((_d = _0xe2a806["geometryHint"]) == null ? void 0 : _d["kind"]) === "extent") {
        const { west: _0x44cfd6, south: _0x4a9a84, east: _0x10e092, north: _0x391c58 } = _0xe2a806["geometryHint"];
        (_e = this["interactionManager"]) == null ? void 0 : _e["flyToExtent"](_0x44cfd6, _0x4a9a84, _0x10e092, _0x391c58, { "duration": ZOOM_FLIGHT_DURATION_SECONDS });
      } else {
        if (((_f = _0xe2a806["geometryHint"]) == null ? void 0 : _f["kind"]) === "point") {
          const { longitude: _0x507a3a, latitude: _0x3a33d3 } = _0xe2a806["geometryHint"];
          (_g = this["interactionManager"]) == null ? void 0 : _g["flyToPosition"](_0x507a3a, _0x3a33d3, { "duration": ZOOM_FLIGHT_DURATION_SECONDS });
        } else (_h = this["interactionManager"]) == null ? void 0 : _h["flyToPosition"](this["_tableLon"], this["_tableLat"], { "duration": ZOOM_FLIGHT_DURATION_SECONDS });
      }
    }
    if (_0x27f02a !== void 0) this["_openAccordionItem"](_0x27f02a);
  }
  ["_renderZoomButton"](_0x44fdee, _0x4da30a) {
    const _0x599295 = () => this["_zoomToItem"](_0x44fdee, _0x4da30a);
    return b`
      <span
        class="zoom-btn"
        role="button"
        tabindex="0"
        title="Yakınlaş"
        aria-label="Yakınlaş"
        @click=${(_0x579b6a) => {
      _0x579b6a["stopPropagation"](), _0x599295();
    }}
        @keydown=${(_0x5bfd3b) => {
      if (_0x5bfd3b["key"] !== "Enter" && _0x5bfd3b["key"] !== " ") return;
      _0x5bfd3b["preventDefault"](), _0x5bfd3b["stopPropagation"](), _0x599295();
    }}
      >
        ${ICON_ZOOM_IN}
      </span>
    `;
  }
  ["_renderPropertyTable"](_0x562bbf) {
    return _0x562bbf["length"] === 0 ? b`<div class="attr-empty">Öznitelik bilgisi bulunamadı.</div>` : b`
          <cds-table size="sm" use-zebra-styles use-static-width>
            <cds-table-head>
              <cds-table-header-row>
                <cds-table-header-cell>Alan</cds-table-header-cell>
                <cds-table-header-cell>Değer</cds-table-header-cell>
              </cds-table-header-row>
            </cds-table-head>
            <cds-table-body>
              ${_0x562bbf["map"](([_0x4b8ea8, _0x29f27d]) => b`
                  <cds-table-row>
                    <cds-table-cell>${_0x4b8ea8}</cds-table-cell>
                    <cds-table-cell>${formatPropertyValue(_0x29f27d)}</cds-table-cell>
                  </cds-table-row>
                `)}
            </cds-table-body>
          </cds-table>
        `;
  }
  ["render"]() {
    const _0x335d96 = this["_tableItems"]["length"] === 1 ? this["_tableItems"][0] : void 0, _0x459ab4 = !_0x335d96 ? A : b`
      <div class="attr-breadcrumb ${_0x335d96 ? "attr-breadcrumb-single" : ""}">
        ${(_0x335d96 == null ? void 0 : _0x335d96["layerType"]) && _0x335d96["layerType"] !== "DRAWING" && _0x335d96["layerType"] !== "MEASURE" ? b`<span class="attr-type-tag">${_0x335d96["layerType"]}</span>` : A}
        ${_0x335d96 ? this["_renderZoomButton"](_0x335d96) : A}
        ${_0x335d96 ? b`<span class="attr-layer-title" title=${_0x335d96["layerTitle"]}>${_0x335d96["layerTitle"]}</span>` : A}
      </div>
    `, _0x3e2445 = _0x335d96 ? b`
          <div class="attr-body-wrap">
            <div class="attr-body" @scroll=${(_0x306e31) => this["_syncScrollThumbFor"](_0x306e31["currentTarget"])}>
              ${this["_renderPropertyTable"](_0x335d96["propertyEntries"])}
            </div>
            <div class="scroll-thumb" @pointerdown=${(_0x7ff365) => this["_startThumbDrag"](_0x7ff365)}></div>
          </div>
        ` : b`
          <div class="accordion-wrap">
            <cds-accordion
              size="sm"
              @cds-accordion-item-beingtoggled=${this["_onAccordionItemBeforeToggle"]}
              @cds-accordion-item-toggled=${this["_onAccordionItemToggled"]}
            >
              ${this["_pagedTableItems"]["map"]((_0x3b2130, _0x31e895) => b`
                  <cds-accordion-item title=${_0x3b2130["layerTitle"]} ?open=${_0x31e895 === 0}>
                    <span slot="title" class="item-title">
                      <span class="item-title-group">
                        <span class="item-title-text">${_0x3b2130["layerTitle"]}</span>
                        <span class="item-title-suffix">${this["_itemGlobalIndex"](_0x3b2130)}</span>
                        <span class="item-title-tag-slot">
                          ${_0x3b2130["layerType"] && _0x3b2130["layerType"] !== "DRAWING" && _0x3b2130["layerType"] !== "MEASURE" ? b`<span class="attr-type-tag">${_0x3b2130["layerType"]}</span>` : A}
                        </span>
                      </span>
                      ${this["_renderZoomButton"](_0x3b2130, _0x31e895)}
                    </span>
                    <div class="item-body-wrap">
                      <div class="item-body" @scroll=${(_0x572a47) => this["_syncScrollThumbFor"](_0x572a47["currentTarget"])}>
                        ${this["_renderPropertyTable"](_0x3b2130["propertyEntries"])}
                      </div>
                      <div class="item-scroll-thumb" @pointerdown=${(_0x16ebea) => this["_startThumbDrag"](_0x16ebea)}></div>
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
        <div class="attr-header" @pointerdown=${(_0x10b65a) => this["_drag"]["start"](_0x10b65a)}>
          <div class="attr-header-title-group">
            <span class="attr-header-icon">${ICON_INFORMATION}</span>
            <div class="attr-header-text">
              <span class="attr-title">Konum/Bilgi Al</span>
            </div>
          </div>
          ${_0x335d96 ? A : b`<span class="attr-result-count">${this["_tableItems"]["length"]} sonuç bulundu</span>`}
          <button type="button" class="attr-close-btn" aria-label="Kapat" @click=${() => this["_closeTable"]()}>
            ${ICON_CLOSE$2}
          </button>
        </div>

        ${_0x459ab4}

        ${_0x3e2445}

        <div class="attr-footer">
          <span>Enlem/Boylam</span>
          <span class="attr-footer-value">${formatLat(this["_tableLat"])}, ${formatLon(this["_tableLon"])}</span>
        </div>
      </div>
    `;
  }
};
TucbsIdentifyPanel["styles"] = identifyPanelStyles, __decorateClass$5([n$1({ "attribute": ![] })], TucbsIdentifyPanel["prototype"], "interactionManager", 2), __decorateClass$5([n$1({ "attribute": ![] })], TucbsIdentifyPanel["prototype"], "layerManager", 2), __decorateClass$5([n$1()], TucbsIdentifyPanel["prototype"], "mapElementId", 2), __decorateClass$5([n$1({ "attribute": "custom-css" })], TucbsIdentifyPanel["prototype"], "customCss", 2), __decorateClass$5([r()], TucbsIdentifyPanel["prototype"], "_basicOpen", 2), __decorateClass$5([r()], TucbsIdentifyPanel["prototype"], "_basicLon", 2), __decorateClass$5([r()], TucbsIdentifyPanel["prototype"], "_basicLat", 2), __decorateClass$5([r()], TucbsIdentifyPanel["prototype"], "_imageryPending", 2), __decorateClass$5([r()], TucbsIdentifyPanel["prototype"], "_tableOpen", 2), __decorateClass$5([r()], TucbsIdentifyPanel["prototype"], "_tableItems", 2), __decorateClass$5([r()], TucbsIdentifyPanel["prototype"], "_tableLon", 2), __decorateClass$5([r()], TucbsIdentifyPanel["prototype"], "_tableLat", 2), __decorateClass$5([r()], TucbsIdentifyPanel["prototype"], "_accordionPage", 2), __decorateClass$5([r()], TucbsIdentifyPanel["prototype"], "_tableSource", 2), __decorateClass$5([e$3(".attr-panel")], TucbsIdentifyPanel["prototype"], "_attrPanelEl", 2), TucbsIdentifyPanel = __decorateClass$5([t$3("tucbs-identify-panel")], TucbsIdentifyPanel);
var __defProp$3 = Object["defineProperty"], __getOwnPropDesc$4 = Object["getOwnPropertyDescriptor"], __decorateClass$4 = (_0x2040fc, _0x823100, _0x4cb170, _0x208406) => {
  var _0x61ae3b = _0x208406 > 1 ? void 0 : _0x208406 ? __getOwnPropDesc$4(_0x823100, _0x4cb170) : _0x823100;
  for (var _0x4cb128 = _0x2040fc["length"] - 1, _0x25fe9c; _0x4cb128 >= 0; _0x4cb128--) if (_0x25fe9c = _0x2040fc[_0x4cb128]) _0x61ae3b = (_0x208406 ? _0x25fe9c(_0x823100, _0x4cb170, _0x61ae3b) : _0x25fe9c(_0x61ae3b)) || _0x61ae3b;
  if (_0x208406 && _0x61ae3b) __defProp$3(_0x823100, _0x4cb170, _0x61ae3b);
  return _0x61ae3b;
};
const FORMATS = { "geojson": { "extension": ".geojson", "mime": "application/geo+json", "layerType": "GEOJSON", "label": "GeoJSON" }, "kml": { "extension": ".kml", "mime": "application/vnd.google-earth.kml+xml", "layerType": "KML", "label": "KML" }, "kmz": { "extension": ".kmz", "mime": "application/vnd.google-earth.kmz", "layerType": "KMZ", "label": "KMZ" }, "shp": { "extension": ".zip", "mime": "application/zip", "layerType": "SHP", "label": "SHP(ZIP)" }, "csv": { "extension": ".csv", "mime": "text/csv", "layerType": "CSV", "label": "CSV" } }, ALL_FORMATS = ["geojson", "kml", "kmz", "shp", "csv"], ICON_CLOSE$1 = o$1(iconNodeToString(_16_default$v)), ICON_DOCUMENT_ADD = o$1(iconNodeToString(_16_default$s));
let TucbsFileUpload = class extends i$2 {
  constructor() {
    super(...arguments), this["open"] = ![], this["mapElementId"] = "", this["acceptedTypes"] = "", this["maxFileSizeMb"] = 50, this["dragDrop"] = !![], this["customCss"] = "", this["_error"] = "", this["_uploading"] = ![], this["_customCssState"] = { "sheet": null }, this["_drag"] = new DraggablePanelController(this, { "getPanel": () => this, "ignoreSelector": ".close-btn" });
  }
  ["firstUpdated"]() {
    if (this["layerManager"] || !this["mapElementId"]) return;
    const _0xd66ed2 = document["getElementById"](this["mapElementId"]);
    if (!_0xd66ed2) return;
    _0xd66ed2["layerManager"] ? this["layerManager"] = _0xd66ed2["layerManager"] : _0xd66ed2["addEventListener"]("ready", () => {
      if (_0xd66ed2["layerManager"]) this["layerManager"] = _0xd66ed2["layerManager"];
    }, { "once": !![] });
  }
  ["updated"](_0x518203) {
    _0x518203["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_customCssState"], "tucbs-file-upload"), _0x518203["has"]("open") && this["open"] && (this["style"]["removeProperty"]("left"), this["style"]["removeProperty"]("top"), this["style"]["removeProperty"]("transform"));
  }
  ["disconnectedCallback"]() {
    destroyToast(), super["disconnectedCallback"]();
  }
  ["_close"]() {
    this["open"] = ![], this["_error"] = "", this["dispatchEvent"](new CustomEvent("tucbs-file-upload-closed", { "bubbles": !![], "composed": !![] }));
  }
  ["_activeFormats"]() {
    const _0x4bb3a6 = this["acceptedTypes"]["split"](",")["map"]((_0xf467dc) => _0xf467dc["trim"]()["toLowerCase"]())["filter"]((_0xc6627c) => ALL_FORMATS["includes"](_0xc6627c));
    return _0x4bb3a6["length"] > 0 ? _0x4bb3a6 : [...ALL_FORMATS];
  }
  ["_detectFormat"](_0x130e70) {
    const _0x3de8d8 = _0x130e70["toLowerCase"]();
    return ALL_FORMATS["find"]((_0x10b263) => _0x3de8d8["endsWith"](FORMATS[_0x10b263]["extension"]));
  }
  async ["_handleFileAdded"](_0x59a337) {
    this["_error"] = "", destroyToast();
    const _0x402774 = _0x59a337[0];
    if (!_0x402774) return;
    const _0x2292fa = this["_activeFormats"](), _0x5838bc = this["_detectFormat"](_0x402774["name"]);
    if (!_0x5838bc || !_0x2292fa["includes"](_0x5838bc)) {
      const _0x192595 = _0x2292fa["map"]((_0x26a1f6) => FORMATS[_0x26a1f6]["label"])["join"](", ");
      this["_error"] = "Sadece " + _0x192595 + " dosyaları desteklenir.";
      return;
    }
    const _0x641051 = this["layerManager"];
    if (!_0x641051) {
      this["_error"] = "Harita hazır değil, katman eklenemedi.";
      return;
    }
    const { layerType: _0x444cfb, extension: _0x1f5bc7 } = FORMATS[_0x5838bc], _0x36f3d7 = _0x402774["name"]["replace"](new RegExp("\\" + _0x1f5bc7 + "$", "i"), ""), _0x14b701 = "upload-" + _0x36f3d7 + "-" + Date["now"](), _0x265d7d = (_0x39bc32) => {
      if (_0x39bc32["id"] !== _0x14b701) return;
      showToast("info", _0x39bc32["fromEpsg"] + " → " + _0x39bc32["toEpsg"] + " (WGS84) dönüştürüldü.");
    }, _0xfbdb55 = (_0x3ade77) => {
      if (_0x3ade77["id"] !== _0x14b701) return;
      showToast("warning", "Koordinat sistemi tanınamadı; WGS84 kabul edilerek yüklendi.");
    };
    _0x641051["on"]("layer:crs-reprojected", _0x265d7d), _0x641051["on"]("layer:crs-unresolved", _0xfbdb55), this["_close"](), this["_uploading"] = !![], beginBusy("Katman yükleniyor…"), await new Promise((_0x151916) => setTimeout(_0x151916, 200));
    try {
      await _0x641051["add"](_0x444cfb, { "id": _0x14b701, "title": _0x36f3d7, "data": _0x402774, "layerType": _0x444cfb, "clampToGround": !![] });
    } catch (_0x82cf5d) {
      _0x82cf5d instanceof TucbsError ? console["error"]("[tucbs-file-upload] " + _0x82cf5d["code"] + " (" + _0x82cf5d["number"] + "): " + _0x82cf5d["message"]) : console["error"](_0x82cf5d), showToast("error", _0x82cf5d instanceof Error ? _0x82cf5d["message"] : String(_0x82cf5d));
    } finally {
      _0x641051["off"]("layer:crs-reprojected", _0x265d7d), _0x641051["off"]("layer:crs-unresolved", _0xfbdb55), this["_uploading"] = ![], endBusy();
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
    const _0x31d4d4 = this["_activeFormats"](), _0x57ef0d = _0x31d4d4["map"]((_0x535348) => {
      const { extension: _0x19b999, mime: _0x26a420 } = FORMATS[_0x535348];
      return _0x26a420 ? _0x19b999 + "," + _0x26a420 : _0x19b999;
    })["join"](","), _0x1180e3 = _0x31d4d4["map"]((_0x38f779) => FORMATS[_0x38f779]["label"])["join"](", ");
    return b`
      <div class="panel">
        <div class="header" @pointerdown=${(_0x27ac61) => this["_drag"]["start"](_0x27ac61)}>
          <span class="title"><span class="title-icon">${ICON_DOCUMENT_ADD}</span>Veri Dosyası Ekle</span>
          <button type="button" class="close-btn" aria-label="Kapat" @click=${() => this["_close"]()}>
            ${ICON_CLOSE$1}
          </button>
        </div>

        <div class="body">
          <cds-file-uploader-drop-container
            accept=${_0x57ef0d}
            @cds-file-uploader-drop-container-changed=${(_0x54a7b2) => {
      var _a2;
      return this["_handleFileAdded"](((_a2 = _0x54a7b2["detail"]) == null ? void 0 : _a2["addedFiles"]) ?? []);
    }}
          >
            <p class="upload-text">${_0x1180e3} dosyasını buraya sürükleyin ya da seçmek için tıklayın</p>
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
function classifyDiscoveryError(_0x51f226) {
  if (_0x51f226 instanceof OgcRequestError) return { "kind": _0x51f226["code"] === "OGC_SERVICE_DISCOVERY_PARSE_FAILED" ? "parse" : "server", "detail": _0x51f226["message"] };
  return { "kind": "network", "detail": _0x51f226 instanceof Error ? _0x51f226["message"] : String(_0x51f226) };
}
function discoveryErrorMessage(_0x2f948b) {
  switch (_0x2f948b == null ? void 0 : _0x2f948b["kind"]) {
    case "network":
      return "Servis adresine ulaşılamadı.\nAdresi kontrol edin veya sunucunun CORS/erişim izinlerini doğrulayın.";
    case "server":
      return "Sunucu bir hata döndürdü.\n" + _0x2f948b["detail"];
    case "parse":
      return "Sunucunun yanıtı geçerli bir XML olarak ayrıştırılamadı.\nAdresin doğru bir GetCapabilities uç noktası olduğundan emin olun.";
    default:
      return "Servis adresinden geçerli bir yanıt alınamadı.\nAdresi ve seçili servis türünü kontrol edin.";
  }
}
const SERVICE_VERSIONS = { "WMS": ["1.3.0", "1.1.1", "1.1.0", "1.0.0"], "WMTS": ["1.0.0"], "WFS": ["2.0.2", "2.0.0", "1.1.3", "1.1.0", "1.0.0"], "WCS": ["2.1.0", "2.0.1", "2.0.0", "1.1.2", "1.1.1", "1.1.0", "1.0.0"] };
function baseServiceUrl(_0x5d9174) {
  try {
    const _0x5ebc14 = new URL(_0x5d9174);
    return "" + _0x5ebc14["origin"] + _0x5ebc14["pathname"];
  } catch {
    return _0x5d9174["split"]("?")[0] ?? _0x5d9174;
  }
}
class ServiceDiscoveryController {
  constructor(_0x3859ed, _0x3f7696) {
    this["sink"] = _0x3f7696, this["generation"] = new AsyncGeneration(), _0x3859ed["addController"](this);
  }
  ["hostDisconnected"]() {
    this["invalidate"]();
  }
  ["invalidate"]() {
    this["generation"]["next"]();
  }
  async ["discover"](_0x1d42a4, _0x9b1632) {
    const _0x4c8619 = _0x9b1632["trim"]();
    if (!_0x4c8619) {
      this["sink"]["setError"]("Servis adresi giriniz.");
      return;
    }
    const _0x1b0ef9 = baseServiceUrl(_0x4c8619);
    this["sink"]["setDiscovering"](!![]), beginBusy("Servis bilgileri getiriliyor…"), this["sink"]["resetDiscovery"]();
    const _0x261eff = this["generation"]["next"]();
    try {
      const _0x4097d6 = SERVICE_VERSIONS[_0x1d42a4] ?? [];
      let _0x23e234;
      for (const _0x5e7216 of _0x4097d6) {
        let _0x462c2b;
        try {
          _0x462c2b = buildCapabilitiesUrl(_0x4c8619, _0x1d42a4, _0x5e7216);
        } catch {
          this["sink"]["setError"]("Servis adresi geçerli bir URL değil.");
          return;
        }
        try {
          const _0x335520 = this["sink"]["layerManager"](), _0x525306 = _0x335520 ? await _0x335520["getCapabilitiesDocument"](_0x1b0ef9, _0x1d42a4, _0x5e7216) : await getCapabilities(_0x462c2b, void 0);
          if (!this["generation"]["isCurrent"](_0x261eff)) return;
          const _0x797fc2 = parseCapabilities(_0x1d42a4, _0x525306);
          if (_0x797fc2["length"] > 0) {
            this["sink"]["setItems"](_0x797fc2);
            if (_0x1d42a4 === "WMS") this["sink"]["setTiffFormat"](parseWmsTiffFormat(_0x525306));
            else {
              if (_0x1d42a4 === "WCS") {
                this["sink"]["setTiffFormat"](parseWcsTiffFormat(_0x525306));
                const _0x4320cc = this["sink"]["layerManager"](), _0x23da39 = _0x4320cc ? await _0x4320cc["getWcsCoverageExtents"](_0x1b0ef9, _0x797fc2["map"]((_0x1c1c1a) => _0x1c1c1a["identifier"])) : await fetchWcsCoverageExtents(_0x4c8619, _0x797fc2["map"]((_0x3d3098) => _0x3d3098["identifier"]));
                if (!this["generation"]["isCurrent"](_0x261eff)) return;
                _0x23da39["size"] > 0 && this["sink"]["setItems"](_0x797fc2["map"]((_0x4697df) => {
                  const _0x3ca449 = _0x23da39["get"](_0x4697df["identifier"]);
                  return _0x3ca449 ? { ..._0x4697df, "geographicBoundingBox": _0x3ca449 } : _0x4697df;
                })), _0x23da39["size"] < _0x797fc2["length"] && showToast("warning", _0x797fc2["length"] - _0x23da39["size"] + "/" + _0x797fc2["length"] + " katmanın tam konumu belirlenemedi; bu katmanlar haritada geniş bir alanda görünebilir.");
              }
            }
            return;
          }
          const _0x1cbed6 = detectServiceType(_0x525306);
          if (_0x1cbed6 && _0x1cbed6 !== _0x1d42a4) {
            this["sink"]["setError"]("Bu adres bir " + _0x1cbed6 + ' servisi gibi görünüyor. Servis türünü "' + _0x1cbed6 + '" olarak değiştirip tekrar deneyin.');
            return;
          }
        } catch (_0x1c5c49) {
          if (!this["generation"]["isCurrent"](_0x261eff)) return;
          _0x23e234 = classifyDiscoveryError(_0x1c5c49);
        }
      }
      this["sink"]["setError"](discoveryErrorMessage(_0x23e234));
    } finally {
      this["sink"]["setDiscovering"](![]), endBusy();
    }
  }
}
var __defProp$2 = Object["defineProperty"], __getOwnPropDesc$3 = Object["getOwnPropertyDescriptor"], __typeError$1 = (_0x360fff) => {
  throw TypeError(_0x360fff);
}, __decorateClass$3 = (_0x48bcb4, _0x236db2, _0x37b8bb, _0x444b60) => {
  var _0x2a3616 = _0x444b60 > 1 ? void 0 : _0x444b60 ? __getOwnPropDesc$3(_0x236db2, _0x37b8bb) : _0x236db2;
  for (var _0x5e3390 = _0x48bcb4["length"] - 1, _0x57ffd5; _0x5e3390 >= 0; _0x5e3390--) if (_0x57ffd5 = _0x48bcb4[_0x5e3390]) _0x2a3616 = (_0x444b60 ? _0x57ffd5(_0x236db2, _0x37b8bb, _0x2a3616) : _0x57ffd5(_0x2a3616)) || _0x2a3616;
  if (_0x444b60 && _0x2a3616) __defProp$2(_0x236db2, _0x37b8bb, _0x2a3616);
  return _0x2a3616;
}, __accessCheck$1 = (_0x5be2fd, _0x54a209, _0x5982f0) => _0x54a209["has"](_0x5be2fd) || __typeError$1("Cannot " + _0x5982f0), __privateGet$1 = (_0x18ada9, _0x42526d, _0x435c53) => (__accessCheck$1(_0x18ada9, _0x42526d, "read from private field"), _0x435c53 ? _0x435c53["call"](_0x18ada9) : _0x42526d["get"](_0x18ada9)), __privateAdd$1 = (_0x29eafa, _0x2628b4, _0x516e38) => _0x2628b4["has"](_0x29eafa) ? __typeError$1("Cannot add the same private member more than once") : _0x2628b4 instanceof WeakSet ? _0x2628b4["add"](_0x29eafa) : _0x2628b4["set"](_0x29eafa, _0x516e38), __privateSet2 = (_0x1ca8c4, _0x390560, _0x4aba1b, _0x100309) => (__accessCheck$1(_0x1ca8c4, _0x390560, "write to private field"), _0x390560["set"](_0x1ca8c4, _0x4aba1b), _0x4aba1b), _apiKey;
const SERVICE_TYPES = [{ "value": "WMS", "label": "Web Harita Servisi (WMS)" }, { "value": "WMTS", "label": "Web Harita Karo Servisi (WMTS)" }, { "value": "WFS", "label": "Web Özellik Servisi (WFS)" }, { "value": "WCS", "label": "Web Kapsama Servisi (WCS)" }];
function servicePlaceholder(_0x1256e6) {
  const _0x4e54e9 = _0x1256e6["toLowerCase"]();
  return "Ör: https://.../" + _0x4e54e9;
}
const ICON_CLOSE = o$1(iconNodeToString(_16_default$v)), ICON_DOWNLOAD = o$1(iconNodeToString(_16_default$p)), ICON_RENEW = o$1(iconNodeToString(_16_default$c)), ICON_VIEW = o$1(iconNodeToString(_16_default$4)), ICON_VIEW_OFF = o$1(iconNodeToString(_16_default$3)), ICON_CLOUD_DOWNLOAD = o$1(iconNodeToString(_16_default$u));
let TucbsServiceUpload = class extends i$2 {
  constructor() {
    super(...arguments), this["open"] = ![], this["mapElementId"] = "", __privateAdd$1(this, _apiKey, ""), this["customCss"] = "", this["_customCssState"] = { "sheet": null }, this["_serviceType"] = "WMS", this["_serviceUrl"] = "", this["_discovering"] = ![], this["_discovery"] = new ServiceDiscoveryController(this, { "layerManager": () => this["layerManager"], "resetDiscovery": () => this["_resetDiscovery"](), "setDiscovering": (_0x548f8b) => {
      this["_discovering"] = _0x548f8b;
    }, "setError": (_0x2ead6b) => {
      this["_discoveryError"] = _0x2ead6b;
    }, "setItems": (_0x4cf81c) => {
      this["_discoveredItems"] = _0x4cf81c;
    }, "setTiffFormat": (_0x3add26) => {
      this["_discoveredTiffFormat"] = _0x3add26;
    } }), this["_discoveryError"] = "", this["_discoveredItems"] = [], this["_selectedIdentifiers"] = [], this["_addError"] = "", this["_drag"] = new DraggablePanelController(this, { "getPanel": () => this, "ignoreSelector": ".close-btn, .reset-btn", "onMove": () => this["_syncPreviewPosition"]() }), this["_listScroll"] = new VirtualScrollbar(this, () => this["_discoveredListEl"], () => this["_scrollThumbEl"]), this["_timers"] = new TimerBag(this), this["_onWindowResize"] = () => {
      this["_syncPreviewPosition"](), this["_listScroll"]["sync"]();
    };
  }
  set ["apiKey"](_0x143b68) {
    const _0x3978b1 = __privateGet$1(this, _apiKey);
    __privateSet2(this, _apiKey, _0x143b68 ?? ""), this["requestUpdate"]("apiKey", _0x3978b1);
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
      const _0x82f0a7 = document["createElement"]("tucbs-map-preview");
      _0x82f0a7["setAttribute"]("basemap", "hgm-temel"), _0x82f0a7["apiKey"] = __privateGet$1(this, _apiKey), _0x82f0a7["zoomToLayer"] = !![], _0x82f0a7["style"]["position"] = "fixed", _0x82f0a7["style"]["zIndex"] = "1100", _0x82f0a7["style"]["display"] = "none", document["body"]["appendChild"](_0x82f0a7), this["_previewEl"] = _0x82f0a7;
    }
    return this["_previewEl"];
  }
  ["_syncPreviewPosition"]() {
    if (!this["_previewEl"]) return;
    const _0x2c64f8 = this["getBoundingClientRect"]();
    this["_previewEl"]["style"]["left"] = _0x2c64f8["left"] + "px", this["_previewEl"]["style"]["top"] = _0x2c64f8["top"] - TucbsServiceUpload["PREVIEW_HEIGHT_PX"] + "px", this["_previewEl"]["width"] = _0x2c64f8["width"] + "px", this["_previewEl"]["height"] = TucbsServiceUpload["PREVIEW_HEIGHT_PX"] + "px";
  }
  ["_updatePreview"]() {
    const _0x199ebf = this["open"] && this["_discoveredItems"]["length"] > 0;
    if (!_0x199ebf) {
      if (this["_previewEl"]) this["_previewEl"]["style"]["display"] = "none";
      return;
    }
    const _0x80f2ce = this["_ensurePreviewEl"]();
    _0x80f2ce["style"]["display"] = "inline-block", _0x80f2ce["apiKey"] = __privateGet$1(this, _apiKey), _0x80f2ce["layerOptions"] = this["_previewSpec"], this["_syncPreviewPosition"](), this["_timers"]["requestAnimationFrame"](() => this["_syncPreviewPosition"]());
  }
  ["firstUpdated"]() {
    var _a2;
    if (this["layerManager"] || !this["mapElementId"]) return;
    const _0x3c8506 = document["getElementById"](this["mapElementId"]);
    if (!_0x3c8506) return;
    _0x3c8506["layerManager"] ? (this["layerManager"] = _0x3c8506["layerManager"], (_a2 = _0x3c8506["_grantApiKeyTo"]) == null ? void 0 : _a2.call(_0x3c8506, this)) : _0x3c8506["addEventListener"]("ready", () => {
      var _a3;
      if (_0x3c8506["layerManager"]) this["layerManager"] = _0x3c8506["layerManager"];
      (_a3 = _0x3c8506["_grantApiKeyTo"]) == null ? void 0 : _a3.call(_0x3c8506, this);
    }, { "once": !![] });
  }
  ["updated"](_0x307f5a) {
    _0x307f5a["has"]("customCss") && applyCustomCss(this["shadowRoot"], this["customCss"], this["_customCssState"], "tucbs-service-upload"), _0x307f5a["has"]("open") && this["open"] && (this["style"]["removeProperty"]("left"), this["style"]["removeProperty"]("top"), this["style"]["removeProperty"]("transform")), this["toggleAttribute"]("data-preview-open", this["_discoveredItems"]["length"] > 0), this["_updatePreview"](), this["_timers"]["requestAnimationFrame"](() => this["_listScroll"]["sync"]());
  }
  ["_close"]() {
    this["open"] = ![], this["_previewIdentifier"] = void 0, this["_previewSpec"] = void 0, this["dispatchEvent"](new CustomEvent("tucbs-service-upload-closed", { "bubbles": !![], "composed": !![] }));
  }
  ["_resetDiscovery"]() {
    this["_discovery"]["invalidate"](), this["_discoveryError"] = "", this["_discoveredItems"] = [], this["_discoveredTiffFormat"] = void 0, this["_selectedIdentifiers"] = [], this["_addError"] = "", this["_previewIdentifier"] = void 0, this["_previewSpec"] = void 0;
  }
  ["_toggleSelected"](_0x2ac702, _0x2e8639) {
    this["_selectedIdentifiers"] = _0x2e8639 ? [...this["_selectedIdentifiers"], _0x2ac702] : this["_selectedIdentifiers"]["filter"]((_0x324e89) => _0x324e89 !== _0x2ac702), this["_addError"] = "";
  }
  ["_togglePreview"](_0x494d7e) {
    this["_previewIdentifier"] === _0x494d7e["identifier"] ? (this["_previewIdentifier"] = void 0, this["_previewSpec"] = void 0) : (this["_previewIdentifier"] = _0x494d7e["identifier"], this["_previewSpec"] = this["_previewSpecFor"](_0x494d7e)), this["_updatePreview"]();
  }
  ["_previewSpecFor"](_0x3198d9) {
    if (this["_serviceType"] === "WMTS" && !_0x3198d9["tileMatrixSetID"]) return void 0;
    const _0x33d50e = baseServiceUrl(this["_serviceUrl"]["trim"]()), _0x410730 = "service-upload-preview-" + _0x3198d9["identifier"];
    switch (this["_serviceType"]) {
      case "WMS":
        return { "layerType": "WMS", "options": { "id": _0x410730, "title": _0x3198d9["title"], "url": _0x33d50e, "layers": _0x3198d9["identifier"] } };
      case "WMTS":
        return { "layerType": "WMTS", "options": { "id": _0x410730, "title": _0x3198d9["title"], "url": _0x33d50e, "layer": _0x3198d9["identifier"], "tileMatrixSetID": _0x3198d9["tileMatrixSetID"] } };
      case "WFS":
        return { "layerType": "WFS", "options": { "id": _0x410730, "title": _0x3198d9["title"], "url": _0x33d50e, "typeName": _0x3198d9["identifier"] } };
      case "WCS": {
        const _0x350994 = wcsRectangleFor(_0x3198d9);
        return { "layerType": "WCS", "options": { "id": _0x410730, "title": _0x3198d9["title"], "url": _0x33d50e, "coverageId": _0x3198d9["identifier"], ..._0x350994 && { "rectangle": _0x350994 } } };
      }
      default:
        return void 0;
    }
  }
  ["_resetFields"]() {
    this["_serviceType"] = "WMS", this["_serviceUrl"] = "", this["_resetDiscovery"]();
  }
  ["_selectServiceType"](_0x432a5b) {
    this["_serviceType"] = _0x432a5b, this["_serviceUrl"] = "", this["_resetDiscovery"]();
  }
  ["_setServiceUrl"](_0x16bb48) {
    this["_serviceUrl"] = _0x16bb48, this["_resetDiscovery"]();
  }
  async ["_addOneLayer"](_0x1eb5af) {
    if (this["_serviceType"] === "WMTS" && !_0x1eb5af["tileMatrixSetID"]) throw new LayerOperationError("LAYER_WMTS_TILEMATRIXSET_MISSING", "Bu katman için TileMatrixSet bilgisi bulunamadı.");
    const _0x11644e = baseServiceUrl(this["_serviceUrl"]["trim"]()), _0xc4767e = "service-" + _0x1eb5af["identifier"] + "-" + Date["now"](), _0x28409c = this["layerManager"];
    switch (this["_serviceType"]) {
      case "WMS": {
        const _0x25888e = { "id": _0xc4767e, "title": _0x1eb5af["title"], "url": _0x11644e, "layers": _0x1eb5af["identifier"], ...this["_discoveredTiffFormat"] && { "tiffFormat": this["_discoveredTiffFormat"], "geographicBoundingBox": _0x1eb5af["geographicBoundingBox"] } };
        await _0x28409c["add"]("WMS", _0x25888e);
        break;
      }
      case "WMTS":
        await _0x28409c["add"]("WMTS", { "id": _0xc4767e, "title": _0x1eb5af["title"], "url": _0x11644e, "layer": _0x1eb5af["identifier"], "tileMatrixSetID": _0x1eb5af["tileMatrixSetID"] });
        break;
      case "WFS": {
        const _0xec2c6 = (_0xd25cbf) => {
          if (_0xd25cbf["id"] !== _0xc4767e) return;
          showToast("warning", _0xd25cbf["totalCount"] + " özellikten sadece " + _0xd25cbf["loadedCount"] + " tanesi yüklendi; tamamı için filtre uygulayın.");
        };
        _0x28409c["on"]("layer:features-truncated", _0xec2c6);
        try {
          await _0x28409c["add"]("WFS", { "id": _0xc4767e, "title": _0x1eb5af["title"], "url": _0x11644e, "typeName": _0x1eb5af["identifier"] });
        } finally {
          _0x28409c["off"]("layer:features-truncated", _0xec2c6);
        }
        break;
      }
      case "WCS": {
        const _0x48ded4 = wcsRectangleFor(_0x1eb5af), _0x5db050 = { "id": _0xc4767e, "title": _0x1eb5af["title"], "url": _0x11644e, "coverageId": _0x1eb5af["identifier"], ..._0x48ded4 && { "rectangle": _0x48ded4 }, ...this["_discoveredTiffFormat"] && { "tiffFormat": this["_discoveredTiffFormat"] } };
        await _0x28409c["add"]("WCS", _0x5db050);
        break;
      }
    }
  }
  async ["_addSelectedLayers"]() {
    if (!this["layerManager"]) {
      this["_addError"] = "Harita hazır değil, katman eklenemedi.";
      return;
    }
    const _0xdb8bb6 = this["_discoveredItems"]["filter"]((_0x25c542) => this["_selectedIdentifiers"]["includes"](_0x25c542["identifier"]));
    if (_0xdb8bb6["length"] === 0) return;
    beginBusy("Katmanlar ekleniyor…"), this["_addError"] = "";
    const _0x1dfe69 = [];
    for (const _0x1e18d3 of _0xdb8bb6) {
      try {
        await this["_addOneLayer"](_0x1e18d3);
      } catch (_0x565dd9) {
        _0x565dd9 instanceof TucbsError ? console["error"]("[tucbs-service-upload] " + _0x565dd9["code"] + " (" + _0x565dd9["number"] + "): " + _0x565dd9["message"]) : console["error"](_0x565dd9), _0x1dfe69["push"]({ "label": _0x1e18d3["title"] || _0x1e18d3["identifier"], "message": _0x565dd9 instanceof Error ? _0x565dd9["message"] : String(_0x565dd9) });
      }
    }
    const _0x30ef98 = _0x1dfe69["map"]((_0x4054b0) => _0x4054b0["label"]);
    this["_selectedIdentifiers"] = _0x1dfe69["length"] === 0 ? [] : _0xdb8bb6["filter"]((_0x10a99c) => _0x30ef98["includes"](_0x10a99c["title"] || _0x10a99c["identifier"]))["map"]((_0x6d1fe9) => _0x6d1fe9["identifier"]), endBusy();
    if (_0x1dfe69["length"] === 0) this["_close"]();
    else _0x1dfe69["length"] === 1 ? this["_addError"] = '"' + _0x1dfe69[0]["label"] + '" eklenemedi: ' + _0x1dfe69[0]["message"] : this["_addError"] = _0x1dfe69["length"] + "/" + _0xdb8bb6["length"] + " katman eklenemedi:\n" + _0x1dfe69["map"]((_0x3fb2a2) => "• " + _0x3fb2a2["label"] + ": " + _0x3fb2a2["message"])["join"]("\n");
  }
  ["_addButtonLabel"]() {
    if (this["_selectedIdentifiers"]["length"] > 1) return "Haritaya Ekle (" + this["_selectedIdentifiers"]["length"] + ")";
    return "Haritaya Ekle";
  }
  ["render"]() {
    if (!this["open"]) return b``;
    const _0x20488c = this["_discoveredItems"]["length"] > 0;
    return b`
      <div class="panel${_0x20488c ? " with-layers" : ""}">
        <div
            class="header"
            @pointerdown=${(_0x4c310e) => this["_drag"]["start"](_0x4c310e)}
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
                @cds-dropdown-selected=${(_0x547a69) => {
      this["_selectServiceType"](_0x547a69["detail"]["item"]["value"]);
    }}
              >
                ${SERVICE_TYPES["map"]((_0x566c9b) => b`<cds-dropdown-item value=${_0x566c9b["value"]}
                      >${_0x566c9b["label"]}</cds-dropdown-item
                    >`)}
              </cds-dropdown>

              <div class="url-row">
                <cds-text-input
                  label="Servis Adresi giriniz"
                  placeholder=${servicePlaceholder(this["_serviceType"])}
                  .value=${this["_serviceUrl"]}
                  @input=${(_0x34387e) => {
      this["_setServiceUrl"](_0x34387e["target"]["value"]);
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

            ${_0x20488c ? b`
                  <div class="katmanlar-column">
                    <span class="section-label">Katmanlar</span>
                    <div class="discovered-list-wrap">
                      <div
                        class="discovered-list"
                        role="group"
                        aria-label="Katmanlar"
                        @scroll=${() => this["_listScroll"]["sync"]()}
                      >
                        ${this["_discoveredItems"]["map"]((_0x358d19) => {
      const _0x33351d = this["_previewIdentifier"] === _0x358d19["identifier"], _0x5cb743 = _0x33351d ? "Önizlemeyi kapat" : "Haritada önizle";
      return b`
                            <div class="discovered-row">
                              <cds-checkbox
                                title=${_0x358d19["title"]}
                                .checked=${this["_selectedIdentifiers"]["includes"](_0x358d19["identifier"])}
                                @cds-checkbox-changed=${(_0x57716d) => {
        var _a2;
        this["_toggleSelected"](_0x358d19["identifier"], !!((_a2 = _0x57716d["detail"]) == null ? void 0 : _a2["checked"]));
      }}
                              >
                                ${_0x358d19["title"]}
                              </cds-checkbox>
                              <button
                                type="button"
                                class="preview-toggle-btn"
                                aria-pressed=${_0x33351d}
                                title=${_0x5cb743}
                                aria-label=${_0x5cb743}
                                @click=${() => this["_togglePreview"](_0x358d19)}
                              >
                                ${_0x33351d ? ICON_VIEW : ICON_VIEW_OFF}
                              </button>
                            </div>
                          `;
    })}
                      </div>
                      <div
                        class="scroll-thumb"
                        @pointerdown=${(_0x25cea4) => this["_listScroll"]["startDrag"](_0x25cea4)}
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
var __getOwnPropDesc$2 = Object["getOwnPropertyDescriptor"], __decorateClass$2 = (_0x16264a, _0x4949fa, _0x7cb9d9, _0x153982) => {
  var _0x2d0b78 = _0x153982 > 1 ? void 0 : _0x153982 ? __getOwnPropDesc$2(_0x4949fa, _0x7cb9d9) : _0x4949fa;
  for (var _0x1970c7 = _0x16264a["length"] - 1, _0x17c156; _0x1970c7 >= 0; _0x1970c7--) if (_0x17c156 = _0x16264a[_0x1970c7]) _0x2d0b78 = _0x17c156(_0x2d0b78) || _0x2d0b78;
  return _0x2d0b78;
};
let TucbsLayerExport = class extends i$2 {
  ["exportLayer"](_0x363d24, _0x496279, _0x5dab35) {
    _0x363d24["exportLayerGeoJSON"](_0x496279, _0x5dab35);
  }
  ["exportLayerKml"](_0x41d4a3, _0x5173f9, _0x523e6d) {
    _0x41d4a3["exportLayerKml"](_0x5173f9, _0x523e6d);
  }
  ["exportLayerShapefile"](_0x44e0ff, _0x3a00d6, _0x2a0d72) {
    _0x44e0ff["exportLayerShapefile"](_0x3a00d6, _0x2a0d72);
  }
  ["exportLayerAsGeoTiff"](_0x3d5d0e, _0x668ec2, _0x961f6a) {
    return _0x3d5d0e["exportLayerAsGeoTiff"](_0x668ec2, _0x961f6a);
  }
};
TucbsLayerExport = __decorateClass$2([t$3("tucbs-layer-export")], TucbsLayerExport);
var __defProp$1 = Object["defineProperty"], __getOwnPropDesc$1 = Object["getOwnPropertyDescriptor"], __decorateClass$1 = (_0xbb15d1, _0x2825f4, _0x54cba6, _0x4ca042) => {
  var _0x5bf5ab = _0x4ca042 > 1 ? void 0 : _0x4ca042 ? __getOwnPropDesc$1(_0x2825f4, _0x54cba6) : _0x2825f4;
  for (var _0x599c3a = _0xbb15d1["length"] - 1, _0x39c644; _0x599c3a >= 0; _0x599c3a--) if (_0x39c644 = _0xbb15d1[_0x599c3a]) _0x5bf5ab = (_0x4ca042 ? _0x39c644(_0x2825f4, _0x54cba6, _0x5bf5ab) : _0x39c644(_0x5bf5ab)) || _0x5bf5ab;
  if (_0x4ca042 && _0x5bf5ab) __defProp$1(_0x2825f4, _0x54cba6, _0x5bf5ab);
  return _0x5bf5ab;
};
let TucbsBusyOverlay = class extends i$2 {
  constructor() {
    super(...arguments), this["active"] = ![], this["_message"] = "İşlem sürüyor…", this["_shownAt"] = 0, this["_timers"] = new TimerBag(this), this["_onBusyChanged"] = (_0x458f65) => {
      const _0x2ef113 = _0x458f65["detail"];
      if (_0x2ef113["busy"] && _0x2ef113["message"]) this["_message"] = _0x2ef113["message"];
      if (_0x2ef113["busy"]) {
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
      const _0x51f23b = TucbsBusyOverlay["MIN_VISIBLE_MS"] - (Date["now"]() - this["_shownAt"]);
      if (_0x51f23b <= 0) {
        this["active"] = ![];
        return;
      }
      this["_hideTimer"] = this["_timers"]["setTimeout"](() => {
        this["_hideTimer"] = void 0, this["active"] = ![];
      }, _0x51f23b);
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
var __defProp = Object["defineProperty"], __getOwnPropDesc = Object["getOwnPropertyDescriptor"], __typeError2 = (_0x1714f9) => {
  throw TypeError(_0x1714f9);
}, __decorateClass = (_0x23a50f, _0x210388, _0x71a7da, _0x23385f) => {
  var _0x12df9d = _0x23385f > 1 ? void 0 : _0x23385f ? __getOwnPropDesc(_0x210388, _0x71a7da) : _0x210388;
  for (var _0x5746a3 = _0x23a50f["length"] - 1, _0x4c2988; _0x5746a3 >= 0; _0x5746a3--) if (_0x4c2988 = _0x23a50f[_0x5746a3]) _0x12df9d = (_0x23385f ? _0x4c2988(_0x210388, _0x71a7da, _0x12df9d) : _0x4c2988(_0x12df9d)) || _0x12df9d;
  if (_0x23385f && _0x12df9d) __defProp(_0x210388, _0x71a7da, _0x12df9d);
  return _0x12df9d;
}, __accessCheck2 = (_0x376139, _0x28f13a, _0x479202) => _0x28f13a["has"](_0x376139) || __typeError2("Cannot " + _0x479202), __privateGet2 = (_0x387936, _0x46834d, _0x138232) => (__accessCheck2(_0x387936, _0x46834d, "read from private field"), _0x138232 ? _0x138232["call"](_0x387936) : _0x46834d["get"](_0x387936)), __privateAdd2 = (_0x51c4fb, _0x395efd, _0x42a2cd) => _0x395efd["has"](_0x51c4fb) ? __typeError2("Cannot add the same private member more than once") : _0x395efd instanceof WeakSet ? _0x395efd["add"](_0x51c4fb) : _0x395efd["set"](_0x51c4fb, _0x42a2cd), _apiKeyState;
const TOOLBAR_TOOLS = "zoom,goto-coordinate,draw,measure,analysis,delete,settings,print", TOOLBAR_TOOL_PROPS = { "draw": { "tools": "point,polyline,polygon,rectangle,circle,freehand" } };
let TucbsApp = class extends i$2 {
  constructor() {
    super(...arguments), __privateAdd2(this, _apiKeyState, new WriteOnlyApiKey(this)), this["basemap"] = "hgm-temel", this["mode"] = "3D", this["quality"] = 70, this["showLayerList"] = !![], this["showToolbar"] = !![], this["showInfoBar"] = !![], this["_map"] = null, this["_onMapReady"] = (_0x5a7475) => {
      _0x5a7475["stopPropagation"]();
      const { map: _0x59d90f } = _0x5a7475["detail"];
      this["_map"] = _0x59d90f, this["dispatchEvent"](new CustomEvent("ready", { "detail": { "map": _0x59d90f }, "bubbles": !![], "composed": !![] }));
    }, this["_onMapError"] = (_0x29a275) => {
      _0x29a275["stopPropagation"]();
      const _0x1052d2 = _0x29a275["detail"];
      this["dispatchEvent"](new CustomEvent("error", { "detail": _0x1052d2, "bubbles": !![], "composed": !![] }));
    };
  }
  set ["apiKey"](_0x2ef693) {
    __privateGet2(this, _apiKeyState)["write"](_0x2ef693);
  }
  get ["apiKey"]() {
    return __privateGet2(this, _apiKeyState)["masked"];
  }
  ["createRenderRoot"]() {
    return this;
  }
  ["updated"](_0x594512) {
    if (!this["_map"]) return;
    if (_0x594512["has"]("basemap")) this["_map"]["setBasemap"](this["basemap"]);
    if (_0x594512["has"]("mode")) this["_map"]["setMode"](this["mode"]);
    if (_0x594512["has"]("quality")) this["_map"]["setQuality"](this["quality"]);
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
