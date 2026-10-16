var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _apiKey, _apiKey2, _AnalysisManager_instances, post_fn, _unregisterApiKeyRefresh, _removeLodSeamGuard, _removeMinZoomScale, _removeScaleWheelZoom, _apiKey3, _a;
import { Math as _0x248e3b, SceneMode, EllipsoidTerrainProvider, Cartesian2, Cartesian3, CameraEventType, Ellipsoid, JulianDate, Cartographic, ConstantProperty, PropertyBag, PolygonHierarchy, ColorMaterialProperty, Color, CallbackProperty, HeadingPitchRange, BoundingSphere, Entity, PolylineGraphics, ConstantPositionProperty, PointGraphics, CustomDataSource, GeoJsonDataSource, KmlDataSource, Rectangle, WebMapServiceImageryProvider, GetFeatureInfoFormat, Resource, WebMapTileServiceImageryProvider, WebMercatorTilingScheme, ImageryLayer, SingleTileImageryProvider, HeightReference, ScreenSpaceEventHandler, ScreenSpaceEventType, UrlTemplateImageryProvider, Viewer } from "cesium";
function ensureCesiumRuntime() {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  const _0x12930a = window;
  !_0x12930a["CESIUM_BASE_URL"] && (_0x12930a["CESIUM_BASE_URL"] = "https://cdn.jsdelivr.net/npm/cesium@1.143.0/Build/Cesium/", console["info"]("[gizLog] cesium base url atandi surum=1.143.0"));
  const _0x6f8eeb = _0x12930a["CESIUM_BASE_URL"]["replace"](/\/?$/, "/"), _0x2dd156 = Array["from"](document["querySelectorAll"]("link"))["some"]((_0x3db006) => (_0x3db006["getAttribute"]("href") || "")["includes"]("Widgets/widgets.css"));
  if (_0x2dd156) return;
  const _0x1effab = document["createElement"]("link");
  _0x1effab["rel"] = "stylesheet", _0x1effab["href"] = _0x6f8eeb + "Widgets/widgets.css", document["head"]["appendChild"](_0x1effab), console["info"]("[gizLog] cesium widgets.css eklendi");
}
const MAX_LEVEL = 24, EARTH_RADIUS = 6371e3, CORNER_SAFETY = 1.15;
function cornerDistanceRatio(_0xec158e, _0x7f67ff, _0x32e523) {
  const _0x50336d = Math["tan"](_0xec158e / 2), _0x160529 = _0x50336d * _0x7f67ff, _0x448cb3 = Math["atan"](Math["hypot"](_0x160529, _0x50336d)), _0x2e2430 = EARTH_RADIUS + _0x32e523, _0x38982a = EARTH_RADIUS * EARTH_RADIUS - _0x2e2430 * _0x2e2430 * Math["sin"](_0x448cb3) ** 2, _0x109616 = _0x38982a > 0 ? _0x2e2430 * Math["cos"](_0x448cb3) - Math["sqrt"](_0x38982a) : Math["sqrt"](_0x2e2430 * _0x2e2430 - EARTH_RADIUS * EARTH_RADIUS);
  return _0x109616 / _0x32e523 * CORNER_SAFETY;
}
function lodTransitionDistances(_0x556ae5) {
  const { drawingBufferHeight: _0x220ecc, sseDenominator: _0x2fb85b, maximumScreenSpaceError: _0x9519de, pixelRatio: _0x25a8ec } = _0x556ae5, _0x46fd26 = [];
  for (let _0x3b800b = 0; _0x3b800b <= MAX_LEVEL; _0x3b800b++) {
    const _0x2c1eaf = _0x556ae5["geometricError"](_0x3b800b) * _0x220ecc / (_0x2fb85b * _0x9519de * _0x25a8ec);
    if (Number["isFinite"](_0x2c1eaf) && _0x2c1eaf > 0) _0x46fd26["push"](_0x2c1eaf);
  }
  return _0x46fd26["sort"]((_0x2cb13d, _0x4c1930) => _0x2cb13d - _0x4c1930);
}
const SEAM_MARGIN = 1.01;
function seamFreeScreenSpaceError(_0x215b6, _0x26bf8e) {
  const _0x5b32bd = _0x26bf8e["maximumScreenSpaceError"], _0x79dfbe = cornerDistanceRatio(_0x26bf8e["fovy"], _0x26bf8e["aspectRatio"], _0x215b6);
  for (const _0xb24d23 of lodTransitionDistances(_0x26bf8e)) {
    if (_0xb24d23 > _0x215b6 && _0xb24d23 < _0x215b6 * _0x79dfbe) {
      const _0x1663e2 = _0x5b32bd * (_0xb24d23 / _0x215b6) * SEAM_MARGIN, _0x294d7a = _0x5b32bd * _0xb24d23 / (_0x215b6 * _0x79dfbe * SEAM_MARGIN);
      return Math["abs"](Math["log"](_0x1663e2 / _0x5b32bd)) <= Math["abs"](Math["log"](_0x294d7a / _0x5b32bd)) ? _0x1663e2 : _0x294d7a;
    }
  }
  return _0x5b32bd;
}
const NADIR_TOLERANCE_DEGREES = 3;
function installLodSeamGuard(_0x30cb0c) {
  const _0x382a71 = _0x30cb0c["scene"], _0x20f943 = _0x382a71["globe"];
  if (!_0x20f943) return () => void 0;
  let _0x4e3711 = _0x20f943["maximumScreenSpaceError"], _0x2d7220 = _0x4e3711;
  const _0x14593f = (_0x42199a) => {
    if (_0x20f943["maximumScreenSpaceError"] !== _0x42199a) _0x20f943["maximumScreenSpaceError"] = _0x42199a;
    _0x2d7220 = _0x42199a;
  }, _0x364b27 = () => {
    if (_0x20f943["maximumScreenSpaceError"] !== _0x2d7220) _0x4e3711 = _0x20f943["maximumScreenSpaceError"];
    const _0x29d003 = _0x382a71["camera"]["frustum"], _0x4ac831 = Math["abs"](_0x248e3b["toDegrees"](_0x382a71["camera"]["pitch"]) + 90) <= NADIR_TOLERANCE_DEGREES;
    if (_0x382a71["mode"] !== SceneMode["SCENE3D"] || !_0x4ac831 || !(_0x382a71["terrainProvider"] instanceof EllipsoidTerrainProvider) || _0x29d003["fovy"] === void 0 || _0x29d003["aspectRatio"] === void 0 || _0x29d003["sseDenominator"] === void 0) {
      _0x14593f(_0x4e3711);
      return;
    }
    const _0xcf988a = _0x382a71["terrainProvider"], _0x20a031 = { "geometricError": (_0x1ade67) => _0xcf988a["getLevelMaximumGeometricError"](_0x1ade67), "drawingBufferHeight": _0x382a71["drawingBufferHeight"], "sseDenominator": _0x29d003["sseDenominator"], "maximumScreenSpaceError": _0x4e3711, "pixelRatio": _0x382a71["pixelRatio"] ?? 1, "fovy": _0x29d003["fovy"], "aspectRatio": _0x29d003["aspectRatio"] };
    _0x14593f(seamFreeScreenSpaceError(_0x382a71["camera"]["positionCartographic"]["height"], _0x20a031));
  }, _0x170867 = _0x382a71["preRender"]["addEventListener"](_0x364b27);
  return () => {
    _0x170867(), !_0x382a71["isDestroyed"]() && _0x20f943["maximumScreenSpaceError"] === _0x2d7220 && (_0x20f943["maximumScreenSpaceError"] = _0x4e3711);
  };
}
const SCREEN_DPI$1 = 96, METERS_PER_INCH$1 = 0.0254, REWRITE_TOLERANCE = 5e-3;
function minZoomDistanceForScale(_0xd872a, _0xd64a65, _0x1f7bca) {
  const _0x5d232a = Math["tan"](_0x1f7bca / 2), _0x64fb3d = _0xd872a * METERS_PER_INCH$1 / SCREEN_DPI$1 * _0xd64a65 / (2 * _0x5d232a);
  return Number["isFinite"](_0x64fb3d) && _0x64fb3d > 0 ? _0x64fb3d : null;
}
const SNAP_WINDOW_RATIO = 1.06, MIN_SNAP_GAP_METERS = 1e-3, SNAP_DURATION_MS = 150;
function snapToMinAmount(_0x594cb6, _0x9a1553) {
  const _0x19fe19 = _0x594cb6 - _0x9a1553;
  if (!(_0x19fe19 > MIN_SNAP_GAP_METERS) || _0x594cb6 > _0x9a1553 * SNAP_WINDOW_RATIO) return 0;
  return _0x19fe19;
}
function installMinZoomScale(_0x3263bd, _0x37e337, _0x303c9d) {
  const _0x194c5c = _0x3263bd["scene"], _0x1e68d9 = _0x194c5c["screenSpaceCameraController"], _0x58e637 = () => {
    const _0x5e38fc = _0x194c5c["camera"]["frustum"]["fovy"];
    if (_0x5e38fc === void 0) return;
    const _0x2eff40 = _0x194c5c["canvas"]["clientHeight"], _0x5b11d1 = minZoomDistanceForScale(_0x37e337, _0x2eff40, _0x5e38fc);
    if (_0x5b11d1 !== null) {
      const _0x5b57da = _0x1e68d9["minimumZoomDistance"];
      Math["abs"](_0x5b57da - _0x5b11d1) > _0x5b57da * REWRITE_TOLERANCE && (_0x1e68d9["minimumZoomDistance"] = _0x5b11d1);
    }
    const _0x5ed4aa = minZoomDistanceForScale(_0x303c9d, _0x2eff40, _0x5e38fc);
    if (_0x5ed4aa === null) return;
    const _0x50252c = _0x1e68d9["maximumZoomDistance"];
    Math["abs"](_0x50252c - _0x5ed4aa) > _0x50252c * REWRITE_TOLERANCE && (_0x1e68d9["maximumZoomDistance"] = _0x5ed4aa);
  }, _0x4bcacd = _0x194c5c["camera"], _0x238301 = _0x194c5c["canvas"];
  let _0x3fde40;
  const _0x552be7 = () => {
    if (_0x3fde40 !== void 0) cancelAnimationFrame(_0x3fde40);
    _0x3fde40 = void 0;
  }, _0x1194b3 = () => {
    if (_0x3fde40 !== void 0) return;
    const _0x1ff509 = snapToMinAmount(_0x4bcacd["positionCartographic"]["height"], _0x1e68d9["minimumZoomDistance"]);
    if (_0x1ff509 <= 0) return;
    const _0x22406c = performance["now"]();
    let _0x1a26b4 = 0;
    const _0x1eb4b8 = (_0x55b46f) => {
      const _0x59c833 = Math["min"](1, (_0x55b46f - _0x22406c) / SNAP_DURATION_MS), _0x50121b = _0x1ff509 * (1 - (1 - _0x59c833) * (1 - _0x59c833));
      if (_0x50121b > _0x1a26b4) _0x4bcacd["zoomIn"](_0x50121b - _0x1a26b4);
      _0x1a26b4 = _0x50121b, _0x3fde40 = _0x59c833 < 1 ? requestAnimationFrame(_0x1eb4b8) : void 0;
    };
    _0x3fde40 = requestAnimationFrame(_0x1eb4b8);
  };
  _0x238301["addEventListener"]("pointerdown", _0x552be7), _0x238301["addEventListener"]("wheel", _0x552be7, { "passive": !![] });
  const _0x3f9246 = _0x194c5c["preRender"]["addEventListener"](_0x58e637), _0x4fb14c = _0x4bcacd["moveEnd"]["addEventListener"](_0x1194b3);
  return () => {
    _0x552be7(), _0x238301["removeEventListener"]("pointerdown", _0x552be7), _0x238301["removeEventListener"]("wheel", _0x552be7), _0x3f9246(), _0x4fb14c();
  };
}
const ZOOM_SCALE_STEPS = [100, 250, 500, 1e3, 2500, 5e3, 1e4, 25e3, 5e4, 1e5, 25e4, 5e5, 1e6, 25e5, 5e6, 15e6, 25e6], ON_STEP_TOLERANCE = 0.03;
function nextScaleStep(_0x5583d3, _0x1a466d) {
  if (!(_0x5583d3 > 0) || !Number["isFinite"](_0x5583d3)) return null;
  if (_0x1a466d === 1) {
    const _0x274b84 = _0x5583d3 / (1 + ON_STEP_TOLERANCE);
    return [...ZOOM_SCALE_STEPS]["reverse"]()["find"]((_0x3b44e9) => _0x3b44e9 < _0x274b84) ?? null;
  }
  const _0x16ffb9 = _0x5583d3 * (1 + ON_STEP_TOLERANCE);
  return ZOOM_SCALE_STEPS["find"]((_0x1806a7) => _0x1806a7 > _0x16ffb9) ?? Infinity;
}
const SCREEN_DPI = 96, METERS_PER_INCH = 0.0254;
function measureGround(_0xb0522c) {
  const _0x5d19c0 = _0xb0522c["globe"];
  if (!_0x5d19c0) return null;
  const _0x2bf1b2 = _0xb0522c["camera"], _0x504f4f = _0xb0522c["canvas"]["clientWidth"] / 2, _0x2d5aff = _0xb0522c["canvas"]["clientHeight"] / 2, _0x49dfaa = _0x2bf1b2["getPickRay"](new Cartesian2(_0x504f4f - 1, _0x2d5aff)), _0x53a591 = _0x2bf1b2["getPickRay"](new Cartesian2(_0x504f4f + 1, _0x2d5aff)), _0x5a70b7 = _0x2bf1b2["getPickRay"](new Cartesian2(_0x504f4f, _0x2d5aff));
  if (!_0x49dfaa || !_0x53a591 || !_0x5a70b7) return null;
  const _0xe85930 = _0x5d19c0["pick"](_0x49dfaa, _0xb0522c), _0x283e3f = _0x5d19c0["pick"](_0x53a591, _0xb0522c), _0x54fb65 = _0x5d19c0["pick"](_0x5a70b7, _0xb0522c);
  if (!_0xe85930 || !_0x283e3f || !_0x54fb65) return null;
  const _0x20de4b = Cartesian3["distance"](_0xe85930, _0x283e3f) / 2;
  return { "scale": _0x20de4b * SCREEN_DPI / METERS_PER_INCH, "distance": Cartesian3["distance"](_0x2bf1b2["position"], _0x54fb65) };
}
const DISPLAY_SNAP_TOLERANCE = 5e-3;
function snapScaleForDisplay(_0x46dc79) {
  const _0x30fa3c = ZOOM_SCALE_STEPS["find"]((_0x3d72f3) => Math["abs"](_0x46dc79 - _0x3d72f3) <= _0x3d72f3 * DISPLAY_SNAP_TOLERANCE);
  return _0x30fa3c ?? _0x46dc79;
}
const ZOOM_ANIMATION_SECONDS = 0.25;
function easeOut(_0x5c8fed) {
  return 1 - Math["pow"](1 - _0x5c8fed, 3);
}
const pendingZooms = /* @__PURE__ */ new WeakMap();
function planStepAmount(_0x1f562b, _0x4ffd9d, _0x157328, _0x2045d3) {
  const _0x295962 = nextScaleStep(_0x1f562b["scale"], _0x4ffd9d);
  if (_0x295962 === null) return null;
  let _0x5bc91a = _0x295962 === Infinity ? Infinity : _0x1f562b["distance"] * Math["abs"](1 - _0x295962 / _0x1f562b["scale"]);
  if (_0x4ffd9d === -1) _0x5bc91a = Math["min"](_0x5bc91a, _0x2045d3 - _0x157328);
  return _0x5bc91a > 0 && Number["isFinite"](_0x5bc91a) ? _0x5bc91a : null;
}
function flyScaleStep(_0x574c11, _0x1f5415, _0x4ba3e9, _0x489d8a) {
  const _0x41adcf = pendingZooms["get"](_0x574c11), _0x187660 = (_0x41adcf == null ? void 0 : _0x41adcf["ground"]) ?? _0x4ba3e9();
  if (!_0x187660) return;
  const _0x19cb08 = (_0x41adcf == null ? void 0 : _0x41adcf["height"]) ?? _0x574c11["positionCartographic"]["height"], _0xcf468 = planStepAmount(_0x187660, _0x1f5415, _0x19cb08, _0x489d8a);
  if (_0xcf468 === null) return;
  const _0x5f51c4 = (_0x41adcf == null ? void 0 : _0x41adcf["position"]) ?? _0x574c11["position"], _0x15af71 = _0x574c11["direction"], _0x5f1b04 = _0x574c11["position"]["clone"]();
  _0x5f1b04["x"] = _0x5f51c4["x"] + _0x15af71["x"] * _0xcf468 * _0x1f5415, _0x5f1b04["y"] = _0x5f51c4["y"] + _0x15af71["y"] * _0xcf468 * _0x1f5415, _0x5f1b04["z"] = _0x5f51c4["z"] + _0x15af71["z"] * _0xcf468 * _0x1f5415;
  const _0x278e5a = _0x187660["distance"] - _0x1f5415 * _0xcf468, _0x4f76e8 = { "ground": { "scale": _0x187660["scale"] * _0x278e5a / _0x187660["distance"], "distance": _0x278e5a }, "height": _0x19cb08 - _0x1f5415 * _0xcf468, "position": _0x5f1b04 }, _0x2978a7 = () => {
    if (pendingZooms["get"](_0x574c11) === _0x4f76e8) pendingZooms["delete"](_0x574c11);
  };
  _0x574c11["flyTo"]({ "destination": _0x5f1b04, "orientation": { "direction": _0x15af71["clone"](), "up": _0x574c11["up"]["clone"]() }, "duration": ZOOM_ANIMATION_SECONDS, "easingFunction": easeOut, "complete": _0x2978a7, "cancel": _0x2978a7 }), pendingZooms["set"](_0x574c11, _0x4f76e8);
}
function scaleZoomStep(_0x51a943, _0x55eb5d) {
  const { camera: _0x12ea4f, scene: _0x3dc6aa } = _0x51a943;
  flyScaleStep(_0x12ea4f, _0x55eb5d, () => measureGround(_0x3dc6aa), _0x3dc6aa["screenSpaceCameraController"]["maximumZoomDistance"]);
}
const WHEEL_STEP_THRESHOLD_PX = 40, WHEEL_SMALL_DELTA_LOCK_MS = 200, LINE_HEIGHT_PX = 16, PAGE_HEIGHT_PX = 400;
function wheelDeltaPixels(_0x2d7c19, _0x7161dd) {
  if (_0x7161dd === 1) return _0x2d7c19 * LINE_HEIGHT_PX;
  if (_0x7161dd === 2) return _0x2d7c19 * PAGE_HEIGHT_PX;
  return _0x2d7c19;
}
function installScaleWheelZoom(_0x133848) {
  const _0x3fe2ac = _0x133848["scene"]["canvas"], _0xa14f5f = _0x133848["scene"]["screenSpaceCameraController"], _0x2b053c = _0xa14f5f["zoomEventTypes"];
  _0xa14f5f["zoomEventTypes"] = [CameraEventType["MIDDLE_DRAG"], CameraEventType["PINCH"]];
  let _0xda67f1 = 0, _0x55f1d0 = 0;
  const _0x5ead79 = (_0x58482a) => {
    _0x58482a["preventDefault"]();
    const _0x3c5ed6 = wheelDeltaPixels(_0x58482a["deltaY"], _0x58482a["deltaMode"]);
    if (_0x3c5ed6 === 0) return;
    const _0x235be0 = performance["now"]();
    if (Math["abs"](_0x3c5ed6) < WHEEL_STEP_THRESHOLD_PX && _0x235be0 < _0x55f1d0) return;
    if (Math["sign"](_0x3c5ed6) !== Math["sign"](_0xda67f1)) _0xda67f1 = 0;
    _0xda67f1 += _0x3c5ed6;
    if (Math["abs"](_0xda67f1) < WHEEL_STEP_THRESHOLD_PX) return;
    scaleZoomStep(_0x133848, _0xda67f1 < 0 ? 1 : -1), _0xda67f1 = 0, _0x55f1d0 = _0x235be0 + WHEEL_SMALL_DELTA_LOCK_MS;
  };
  return _0x3fe2ac["addEventListener"]("wheel", _0x5ead79, { "passive": ![] }), () => {
    _0x3fe2ac["removeEventListener"]("wheel", _0x5ead79), _0xa14f5f["zoomEventTypes"] = _0x2b053c;
  };
}
function createMarkerOverlay(_0x5a9f0b, _0x3662b2, _0x218701, _0x5c18f3, _0x184bf8 = {}) {
  const _0x2c5837 = Cartesian3["fromDegrees"](_0x3662b2, _0x218701), _0x24e303 = Ellipsoid["WGS84"]["geodeticSurfaceNormal"](_0x2c5837, new Cartesian3()), _0x12d8e7 = new Cartesian3(), _0x2670b2 = new Cartesian2(), _0x1baa51 = document["createElement"]("img");
  _0x1baa51["src"] = _0x5c18f3, _0x1baa51["alt"] = "", _0x1baa51["draggable"] = ![], Object["assign"](_0x1baa51["style"], { "position": "absolute", "left": "0", "top": "0", "display": "none", "pointerEvents": "none", "userSelect": "none", "zIndex": "1", "willChange": "transform", ..._0x184bf8["width"] === void 0 ? {} : { "width": _0x184bf8["width"] + "px" }, ..._0x184bf8["height"] === void 0 ? {} : { "height": _0x184bf8["height"] + "px" } }), _0x5a9f0b["container"]["appendChild"](_0x1baa51);
  const _0x3f8d33 = () => {
    const { scene: _0x38ed59 } = _0x5a9f0b;
    let _0x53020a = !![];
    _0x38ed59["mode"] === SceneMode["SCENE3D"] && (Cartesian3["subtract"](_0x38ed59["camera"]["positionWC"], _0x2c5837, _0x12d8e7), _0x53020a = Cartesian3["dot"](_0x24e303, _0x12d8e7) > 0);
    const _0x118cd5 = _0x53020a ? _0x38ed59["cartesianToCanvasCoordinates"](_0x2c5837, _0x2670b2) : void 0;
    if (!_0x118cd5) {
      _0x1baa51["style"]["display"] = "none";
      return;
    }
    _0x1baa51["style"]["display"] = "block";
    const _0x26559a = Math["round"](_0x118cd5["x"] - _0x1baa51["offsetWidth"] / 2), _0x40c323 = Math["round"](_0x118cd5["y"] - (_0x184bf8["anchor"] === "center" ? _0x1baa51["offsetHeight"] / 2 : _0x1baa51["offsetHeight"]));
    _0x1baa51["style"]["transform"] = "translate(" + _0x26559a + "px, " + _0x40c323 + "px)";
  }, _0x34dddf = _0x5a9f0b["scene"]["postRender"]["addEventListener"](_0x3f8d33);
  return _0x1baa51["addEventListener"]("load", _0x3f8d33), _0x3f8d33(), () => {
    _0x34dddf(), _0x1baa51["remove"]();
  };
}
class EventEmitter {
  constructor() {
    this["listeners"] = {};
  }
  ["on"](_0x20ea8f, _0x1df0fa) {
    const _0x35f107 = this["listeners"][_0x20ea8f];
    return _0x35f107 !== void 0 ? _0x35f107["add"](_0x1df0fa) : this["listeners"][_0x20ea8f] = /* @__PURE__ */ new Set([_0x1df0fa]), this;
  }
  ["off"](_0x2dda65, _0x59f3c8) {
    var _a2;
    return (_a2 = this["listeners"][_0x2dda65]) == null ? void 0 : _a2["delete"](_0x59f3c8), this;
  }
  ["once"](_0x43802d, _0x654b93) {
    const _0x565e1e = (_0x49163b) => {
      _0x654b93(_0x49163b), this["off"](_0x43802d, _0x565e1e);
    };
    return this["on"](_0x43802d, _0x565e1e);
  }
  ["emit"](_0x2e8e90, _0x5a3092) {
    const _0x53cbe0 = this["listeners"][_0x2e8e90];
    if (_0x53cbe0 === void 0) return;
    for (const _0x20fef3 of _0x53cbe0) {
      _0x20fef3(_0x5a3092);
    }
  }
  ["removeAllListeners"](_0x4100f8) {
    if (_0x4100f8 !== void 0) delete this["listeners"][_0x4100f8];
    else for (const _0x30d232 of Object["keys"](this["listeners"])) {
      delete this["listeners"][_0x30d232];
    }
  }
  ["listenerCount"](_0x379c05) {
    var _a2;
    return ((_a2 = this["listeners"][_0x379c05]) == null ? void 0 : _a2["size"]) ?? 0;
  }
}
const GLOBAL_STATE_SLOT = Symbol["for"]("@tucbs/core/globalConfigState");
function getState() {
  const _0x4bd20f = globalThis;
  let _0x43d75e = _0x4bd20f[GLOBAL_STATE_SLOT];
  return !_0x43d75e && (_0x43d75e = { "apiKey": void 0, "apiBase": void 0, "proxyBase": void 0, "configured": ![], "refreshers": /* @__PURE__ */ new Set() }, Object["defineProperty"](globalThis, GLOBAL_STATE_SLOT, { "value": _0x43d75e, "enumerable": ![], "configurable": ![], "writable": ![] })), _0x43d75e;
}
function configureTucbs(_0x5b65fb) {
  const _0x16c428 = getState();
  if (_0x5b65fb["apiBase"] !== void 0) {
    const _0xefcf2 = _0x5b65fb["apiBase"]["trim"]()["replace"](/\/+$/, "");
    _0x16c428["apiBase"] = _0xefcf2 || void 0, _0x16c428["configured"] = !![];
  }
  if (_0x5b65fb["proxyBase"] !== void 0) {
    const _0x43715f = _0x5b65fb["proxyBase"]["trim"]();
    _0x16c428["proxyBase"] = _0x43715f || void 0, _0x16c428["configured"] = !![];
  }
  if (_0x5b65fb["apiKey"] === void 0) {
    _0x16c428["configured"] && _0x16c428["refreshers"]["forEach"]((_0x5cdf59) => _0x5cdf59());
    return;
  }
  _0x16c428["apiKey"] !== void 0 && _0x5b65fb["apiKey"] !== _0x16c428["apiKey"] && console["warn"]("[@tucbs/core] configureTucbs() daha once farkli bir apiKey ile cagrilmisti; deger degistirildi. Bu beklenmiyorsa sayfada birden fazla script'in ayni fonksiyonu cagirdigini kontrol edin."), _0x16c428["apiKey"] = _0x5b65fb["apiKey"], _0x16c428["configured"] = !![], _0x16c428["refreshers"]["forEach"]((_0x5cc9fb) => _0x5cc9fb());
}
function getGlobalApiBase() {
  return getState()["apiBase"];
}
function getGlobalProxyBase() {
  return getState()["proxyBase"];
}
function getGlobalApiKey() {
  return getState()["apiKey"];
}
function registerApiKeyRefresh(_0x3264d5) {
  const { refreshers: _0x5f0cc4 } = getState();
  return _0x5f0cc4["add"](_0x3264d5), () => _0x5f0cc4["delete"](_0x3264d5);
}
const DEFAULT_UCBP_API_BASE = ("http://localhost:8094/ucbp-api" == null ? void 0 : "http://localhost:8094/ucbp-api"["trim"]()) || "/ucbp-api";
function trimSlash$2(_0x2b4b03) {
  return _0x2b4b03["replace"](/\/+$/, "");
}
function getUcbpApiBase() {
  const _0x28d06b = getGlobalApiBase();
  if (_0x28d06b) return trimSlash$2(_0x28d06b);
  return trimSlash$2(DEFAULT_UCBP_API_BASE);
}
function getProxyBase() {
  const _0x21a34b = getGlobalProxyBase();
  if (_0x21a34b) return _0x21a34b;
  return console["warn"]("proxyBase yok; configureTucbs({ proxyBase }) verilmedi. main.js'te verilmeli."), "";
}
const ERROR_REGISTRY = { "API_KEY_MISSING": { "code": "API_KEY_MISSING", "number": "E001", "title": "API Anahtarı Eksik", "description": "Ne instance ne configureTucbs() ile ayarlanmış global apiKey sağlanmış." }, "API_KEY_INVALID": { "code": "API_KEY_INVALID", "number": "E002", "title": "API Anahtarı Geçersiz", "description": "Sağlanan apiKey backend tarafından reddedildi veya doğrulama isteği başarısız oldu." }, "INTERNAL_INDEX_OUT_OF_RANGE": { "code": "INTERNAL_INDEX_OUT_OF_RANGE", "number": "E003", "title": "İç Durum Hatası", "description": "Beklenen bir dizi indeksi bulunamadı (iç tutarlılık hatası)." }, "OGC_CAPABILITIES_REQUEST_FAILED": { "code": "OGC_CAPABILITIES_REQUEST_FAILED", "number": "E201", "title": "GetCapabilities İsteği Başarısız", "description": "WFS GetCapabilities isteği HTTP hata koduyla döndü." }, "OGC_CAPABILITIES_EXCEPTION": { "code": "OGC_CAPABILITIES_EXCEPTION", "number": "E202", "title": "GetCapabilities OGC Exception", "description": "WFS GetCapabilities yanıtı bir OGC ExceptionReport/ServiceExceptionReport döndürdü." }, "OGC_CAPABILITIES_PARSE_FAILED": { "code": "OGC_CAPABILITIES_PARSE_FAILED", "number": "E203", "title": "GetCapabilities Ayrıştırma Hatası", "description": "WFS GetCapabilities yanıtı geçerli XML olarak ayrıştırılamadı." }, "OGC_FEATURE_TYPE_NOT_FOUND": { "code": "OGC_FEATURE_TYPE_NOT_FOUND", "number": "E204", "title": "FeatureType Bulunamadı", "description": "WFS GetCapabilities yanıtında hiç FeatureType bulunamadı." }, "CRS_UNRESOLVED_UNSUPPORTED": { "code": "CRS_UNRESOLVED_UNSUPPORTED", "number": "E401", "title": "Koordinat Sistemi Tanınamadı", "description": "GeoJSON'daki koordinat sistemi (CRS) çözülemedi ve koordinatlar WGS84 ile uyumlu değil." }, "CRS_CLAIMED_WGS84_INVALID": { "code": "CRS_CLAIMED_WGS84_INVALID", "number": "E402", "title": "Koordinatlar WGS84 İle Uyumsuz", "description": "GeoJSON WGS84/CRS84 olduğunu belirtiyor ama koordinatlar geçerli bir enlem/boylam aralığında değil." }, "CRS_MISSING_UNSUPPORTED": { "code": "CRS_MISSING_UNSUPPORTED", "number": "E403", "title": "Koordinat Sistemi Bilgisi Yok", "description": "GeoJSON'da CRS bilgisi yok ve koordinatlar geçerli bir enlem/boylam aralığında değil." }, "ANALYSIS_API_KEY_MISSING": { "code": "ANALYSIS_API_KEY_MISSING", "number": "E301", "title": "Analiz İçin API Anahtarı Eksik", "description": "AnalysisManager'a apiKey tanımlanmadan analiz isteği yapıldı." }, "ANALYSIS_NETWORK_ERROR": { "code": "ANALYSIS_NETWORK_ERROR", "number": "E302", "title": "Analiz Ağ Hatası", "description": "Analiz isteği ağ seviyesinde (fetch) başarısız oldu." }, "ANALYSIS_REQUEST_FAILED": { "code": "ANALYSIS_REQUEST_FAILED", "number": "E303", "title": "Analiz İsteği Başarısız", "description": "Analiz backend'i HTTP hata koduyla döndü." }, "ANALYSIS_UNSUCCESSFUL": { "code": "ANALYSIS_UNSUCCESSFUL", "number": "E304", "title": "Analiz Başarısız", "description": "Analiz backend'i HTTP 200 döndü ama isSuccess/success=false işaretledi." }, "ANALYSIS_RESPONSE_MISSING_GEOJSON": { "code": "ANALYSIS_RESPONSE_MISSING_GEOJSON", "number": "E305", "title": "Analiz Yanıtı Eksik", "description": "Analiz backend'i başarılı yanıt döndü ama sonuç geojson içermiyor." }, "LAYER_AUTHORIZED_LIST_API_KEY_MISSING": { "code": "LAYER_AUTHORIZED_LIST_API_KEY_MISSING", "number": "E101", "title": "Yetkili Katman Listesi İçin API Anahtarı Gerekli", "description": "getAuthorizedLayers() apiKey ayarlanmadan çağrıldı." }, "LAYER_GEOTIFF_EXPORT_UNSUPPORTED_TYPE": { "code": "LAYER_GEOTIFF_EXPORT_UNSUPPORTED_TYPE", "number": "E102", "title": "GeoTIFF Export Desteklenmiyor", "description": "GeoTIFF export sadece WMS/WCS katmanlarında desteklenir." }, "LAYER_GEOTIFF_EXPORT_NOT_CONFIGURED": { "code": "LAYER_GEOTIFF_EXPORT_NOT_CONFIGURED", "number": "E103", "title": "GeoTIFF Export Yapılandırılmamış", "description": "Katman GeoTIFF export için gerekli tiffFormat seçeneğine sahip değil." }, "LAYER_STYLE_NOT_VECTOR": { "code": "LAYER_STYLE_NOT_VECTOR", "number": "E104", "title": "Stil Sadece Vektör Katmanlarda", "description": "applyLayerStyle() sadece vektör (Entity tabanlı) katmanlarda kullanılabilir." }, "LAYER_TYPE_UNSUPPORTED_XYZ": { "code": "LAYER_TYPE_UNSUPPORTED_XYZ", "number": "E105", "title": "XYZ Katmanı add() İle Desteklenmiyor", "description": "XYZ katmanı add() ile eklenemez, Map.setBasemap() kullanılmalı." }, "LAYER_TYPE_UNSUPPORTED_DRAWING": { "code": "LAYER_TYPE_UNSUPPORTED_DRAWING", "number": "E106", "title": "DRAWING Katmanı add() İle Desteklenmiyor", "description": "DRAWING katmanı DrawingManager tarafından otomatik eklenir, add() ile eklenemez." }, "LAYER_TYPE_UNSUPPORTED_MEASURE": { "code": "LAYER_TYPE_UNSUPPORTED_MEASURE", "number": "E107", "title": "MEASURE Katmanı add() İle Desteklenmiyor", "description": "MEASURE katmanı DrawingManager tarafından otomatik eklenir, add() ile eklenemez." }, "LAYER_WMS_LAYERS_EMPTY": { "code": "LAYER_WMS_LAYERS_EMPTY", "number": "E108", "title": "WMS layers Parametresi Boş", "description": "WMS katmanı eklenirken layers (ogcLayerName) parametresi boş." }, "LAYER_GEOTIFF_UNSUPPORTED": { "code": "LAYER_GEOTIFF_UNSUPPORTED", "number": "E109", "title": "GeoTIFF Katmanı Desteklenmiyor", "description": "GeoTIFF katmanı mevcut Cesium sürümünde desteklenmiyor." }, "LAYER_SHP_PACKAGE_MISSING": { "code": "LAYER_SHP_PACKAGE_MISSING", "number": "E110", "title": "shpjs Paketi Eksik", "description": 'SHP katmanı için gereken "shpjs" paketi tüketici uygulamaya eklenmemiş.' }, "LAYER_CSV_PACKAGE_MISSING": { "code": "LAYER_CSV_PACKAGE_MISSING", "number": "E111", "title": "papaparse Paketi Eksik", "description": 'CSV katmanı için gereken "papaparse" paketi tüketici uygulamaya eklenmemiş.' }, "LAYER_CSV_LATLON_NOT_FOUND": { "code": "LAYER_CSV_LATLON_NOT_FOUND", "number": "E112", "title": "CSV'de lat/lon Sütunu Bulunamadı", "description": "CSV içinde lat/lon sütunları otomatik tespit edilemedi." }, "LAYER_NOT_FOUND": { "code": "LAYER_NOT_FOUND", "number": "E113", "title": "Katman Bulunamadı", "description": "Verilen id'ye sahip bir katman yönetimde kayıtlı değil." }, "LAYER_ID_ALREADY_EXISTS": { "code": "LAYER_ID_ALREADY_EXISTS", "number": "E114", "title": "Katman ID'si Zaten Kayıtlı", "description": "Verilen id ile zaten bir katman eklenmiş." }, "LAYER_TYPE_MISMATCH": { "code": "LAYER_TYPE_MISMATCH", "number": "E115", "title": "Katman Tipi Uyuşmuyor", "description": "Katman beklenen tipte (WMS/WMTS) değil." }, "LAYER_SERVICE_OPTIONS_NOT_FOUND": { "code": "LAYER_SERVICE_OPTIONS_NOT_FOUND", "number": "E116", "title": "Servis Seçenekleri Bulunamadı", "description": "Katman için orijinal servis seçenekleri (serviceLayerOptions) bulunamadı." }, "LAYER_NOT_RASTER": { "code": "LAYER_NOT_RASTER", "number": "E117", "title": "Katman Raster Değil", "description": "İşlem sadece raster (ImageryLayer) katmanlarda desteklenir." }, "OGC_AUTHORIZED_LAYERS_REQUEST_FAILED": { "code": "OGC_AUTHORIZED_LAYERS_REQUEST_FAILED", "number": "E205", "title": "Yetkili Katman Listesi Alınamadı", "description": "getAuthorizedLayers() isteği HTTP hata koduyla döndü." }, "OGC_GEOTIFF_DOWNLOAD_FAILED": { "code": "OGC_GEOTIFF_DOWNLOAD_FAILED", "number": "E206", "title": "GeoTIFF İndirilemedi", "description": "GeoTIFF export isteği HTTP hata koduyla döndü." }, "OGC_WFS_JSON_FORMAT_UNSUPPORTED": { "code": "OGC_WFS_JSON_FORMAT_UNSUPPORTED", "number": "E207", "title": "WFS JSON Format İlan Etmiyor", "description": "WFS sunucusu GetCapabilities yanıtında JSON çıktı formatı ilan etmiyor." }, "OGC_WFS_GEOJSON_REQUEST_FAILED": { "code": "OGC_WFS_GEOJSON_REQUEST_FAILED", "number": "E208", "title": "WFS GeoJSON İsteği Başarısız", "description": "WFS GetFeature (GeoJSON çıktı) isteği başarısız oldu." }, "OGC_WFS_REQUEST_FAILED": { "code": "OGC_WFS_REQUEST_FAILED", "number": "E209", "title": "WFS İsteği Başarısız", "description": "WFS GetFeature (GML çıktı) isteği HTTP hata koduyla döndü." }, "OGC_WFS_EXCEPTION": { "code": "OGC_WFS_EXCEPTION", "number": "E210", "title": "WFS OGC Exception", "description": "WFS GetFeature yanıtı bir OGC ExceptionReport döndürdü." }, "OGC_WFS_OL_PACKAGE_MISSING": { "code": "OGC_WFS_OL_PACKAGE_MISSING", "number": "E211", "title": "ol Paketi Eksik", "description": 'WFS GML yanıtını okumak için gereken "ol" paketi tüketici uygulamaya eklenmemiş.' }, "OGC_WCS_REQUEST_FAILED": { "code": "OGC_WCS_REQUEST_FAILED", "number": "E212", "title": "WCS İsteği Başarısız", "description": "WCS GetCoverage isteği HTTP hata koduyla döndü." }, "OGC_WCS_MULTIPART_IMAGE_NOT_FOUND": { "code": "OGC_WCS_MULTIPART_IMAGE_NOT_FOUND", "number": "E213", "title": "WCS Multipart Görsel Bulunamadı", "description": "Multipart WCS yanıtında görsel (image) parçası bulunamadı." }, "LAYER_PREVIEW_UNSUPPORTED_XYZ": { "code": "LAYER_PREVIEW_UNSUPPORTED_XYZ", "number": "E118", "title": "XYZ Katmanı Önizlemede Desteklenmiyor", "description": "TucbsMapPreview XYZ katman tipini önizlemede desteklemiyor." }, "LAYER_PREVIEW_UNSUPPORTED_DRAWING": { "code": "LAYER_PREVIEW_UNSUPPORTED_DRAWING", "number": "E119", "title": "DRAWING Katmanı Önizlemede Desteklenmiyor", "description": "TucbsMapPreview DRAWING katman tipini önizlemede desteklemiyor." }, "LAYER_PREVIEW_UNSUPPORTED_MEASURE": { "code": "LAYER_PREVIEW_UNSUPPORTED_MEASURE", "number": "E120", "title": "MEASURE Katmanı Önizlemede Desteklenmiyor", "description": "TucbsMapPreview MEASURE katman tipini önizlemede desteklemiyor." }, "LAYER_MANAGER_NOT_READY": { "code": "LAYER_MANAGER_NOT_READY", "number": "E121", "title": "Harita Hazır Değil", "description": "Katman eklenmeye çalışıldığında LayerManager henüz hazır değildi." }, "LAYER_AUTHORIZED_ADD_MISSING_INFO": { "code": "LAYER_AUTHORIZED_ADD_MISSING_INFO", "number": "E122", "title": "Yetkili Katman Eklenemedi", "description": "Yetkili katman için gerekli servis bilgisi (ör. WMTS TileMatrixSet) eksik." }, "OGC_SERVICE_DISCOVERY_PARSE_FAILED": { "code": "OGC_SERVICE_DISCOVERY_PARSE_FAILED", "number": "E214", "title": "Servis Keşfi Ayrıştırma Hatası", "description": "TucbsServiceUpload'da GetCapabilities yanıtı geçerli XML olarak ayrıştırılamadı." }, "LAYER_WMTS_TILEMATRIXSET_MISSING": { "code": "LAYER_WMTS_TILEMATRIXSET_MISSING", "number": "E123", "title": "TileMatrixSet Bilgisi Bulunamadı", "description": "Keşfedilen WMTS katmanı için TileMatrixSet bilgisi bulunamadı." } };
function getErrorCodes() {
  return ERROR_REGISTRY;
}
class TucbsError extends Error {
  constructor(_0x56b80f, _0x139767, _0x5dfa89) {
    const _0x74da9c = ERROR_REGISTRY[_0x56b80f];
    super(_0x139767 ?? _0x74da9c["description"]), this["name"] = "TucbsError", this["code"] = _0x56b80f, this["number"] = _0x74da9c["number"], this["title"] = _0x5dfa89 ?? _0x74da9c["title"];
  }
}
class LayerOperationError extends TucbsError {
  constructor(_0x4b0546, _0x361027, _0x17f3c0) {
    super(_0x4b0546, _0x361027, _0x17f3c0), this["name"] = "LayerOperationError";
  }
}
class OgcRequestError extends TucbsError {
  constructor(_0x1b8087, _0x43ca3f, _0x1297d3) {
    super(_0x1b8087, _0x43ca3f, _0x1297d3), this["name"] = "OgcRequestError";
  }
}
class AnalysisRequestError extends TucbsError {
  constructor(_0x413465, _0x2f9765, _0x396dfc) {
    super(_0x413465, _0x2f9765, _0x396dfc), this["name"] = "AnalysisRequestError";
  }
}
class GeometryError extends TucbsError {
  constructor(_0x2cc070, _0x3ac125, _0x2fadb4) {
    super(_0x2cc070, _0x3ac125, _0x2fadb4), this["name"] = "GeometryError";
  }
}
class ApiKeyValidationError extends TucbsError {
  constructor(_0x40a992, _0x2e93b7) {
    super((_0x2e93b7 == null ? void 0 : _0x2e93b7["code"]) ?? "API_KEY_INVALID", _0x40a992, (_0x2e93b7 == null ? void 0 : _0x2e93b7["title"]) ?? "API Hatası"), this["name"] = "ApiKeyValidationError";
    if ((_0x2e93b7 == null ? void 0 : _0x2e93b7["reason"]) !== void 0) this["reason"] = _0x2e93b7["reason"];
    if ((_0x2e93b7 == null ? void 0 : _0x2e93b7["detail"]) !== void 0) this["detail"] = _0x2e93b7["detail"];
  }
}
const _ApiKeyPolicy = class _ApiKeyPolicy {
  constructor(_0xbfba0e) {
    __privateAdd(this, _apiKey);
    this["getApiBase"] = _0xbfba0e["apiBase"];
  }
  ["configure"](_0x23e721) {
    _0x23e721["apiKey"] !== void 0 && __privateSet(this, _apiKey, _0x23e721["apiKey"]), _0x23e721["trustedApiKeyHosts"] !== void 0 && (this["trustedApiKeyHosts"] = _0x23e721["trustedApiKeyHosts"]), _0x23e721["apiKeyDiscoveryUrl"] !== void 0 && (this["apiKeyDiscoveryUrl"] = _0x23e721["apiKeyDiscoveryUrl"]);
  }
  get ["hasApiKey"]() {
    return __privateGet(this, _apiKey) !== void 0;
  }
  async ["getAuthorizedLayers"]() {
    if (__privateGet(this, _apiKey) === void 0) throw new LayerOperationError("LAYER_AUTHORIZED_LIST_API_KEY_MISSING", "getAuthorizedLayers() icin apiKey gerekli — Map/LayerManager.configure({apiKey}) ile atayin.");
    const _0xdc2fe0 = this["apiKeyDiscoveryUrl"] ?? this["getApiBase"]()["replace"](/\/+$/, "") + "/layers", _0x58308d = await fetch(_0xdc2fe0, { "headers": { [_ApiKeyPolicy["API_KEY_HEADER_NAME"]]: __privateGet(this, _apiKey) } });
    if (!_0x58308d["ok"]) throw new OgcRequestError("OGC_AUTHORIZED_LAYERS_REQUEST_FAILED", "Yetkili katman listesi alinamadi: " + _0x58308d["status"] + " " + _0x58308d["statusText"]);
    const _0x1dc483 = await _0x58308d["json"](), _0xc4086b = Array["isArray"](_0x1dc483) ? _0x1dc483 : _0x1dc483["object"] ?? [];
    return _0xc4086b["map"]((_0x3b83a4) => this["normalizeAuthorizedLayer"](_0x3b83a4));
  }
  async ["getLayerList"]() {
    return this["getAuthorizedLayers"]();
  }
  ["canAddAuthorizedLayer"](_0x3816f8) {
    var _a2, _b;
    const _0x32c090 = (_0x3816f8["servisTuru"] || "")["toUpperCase"]();
    if (!((_a2 = _0x3816f8["servisUrl"]) == null ? void 0 : _a2["trim"]()) || !this["resolveOgcLayerName"](_0x3816f8["ogcLayerName"], _0x3816f8["katmanAdi"])) return ![];
    if (_0x32c090 === "WMTS") return !!((_b = _0x3816f8["wmtsTileMatrixSet"]) == null ? void 0 : _b["trim"]());
    return _0x32c090 === "WMS" || _0x32c090 === "WFS";
  }
  ["resolveAddOptions"](_0x144d40) {
    var _a2;
    if (!this["canAddAuthorizedLayer"](_0x144d40)) throw new LayerOperationError("LAYER_AUTHORIZED_ADD_MISSING_INFO", ((_a2 = _0x144d40["servisTuru"]) == null ? void 0 : _a2["toUpperCase"]()) === "WMTS" ? "WMTS için TileMatrixSet eksik." : "Eksik servis bilgisi.");
    const _0x23b4d4 = _0x144d40["servisTuru"]["toUpperCase"](), _0x6b80 = "authorized-" + this["authorizedLayerKey"](_0x144d40) + "-" + Date["now"](), _0x532931 = this["resolveOgcLayerName"](_0x144d40["ogcLayerName"], _0x144d40["katmanAdi"]), _0x406e86 = _0x144d40["katmanAdi"] || _0x532931;
    if (_0x23b4d4 === "WMS") return { "layerType": "WMS", "options": { "id": _0x6b80, "title": _0x406e86, "url": _0x144d40["servisUrl"], "layers": _0x532931 } };
    if (_0x23b4d4 === "WFS") return { "layerType": "WFS", "options": { "id": _0x6b80, "title": _0x406e86, "url": _0x144d40["servisUrl"], "typeName": _0x532931 } };
    return { "layerType": "WMTS", "options": { "id": _0x6b80, "title": _0x406e86, "url": _0x144d40["servisUrl"], "layer": _0x532931, "tileMatrixSetID": _0x144d40["wmtsTileMatrixSet"] } };
  }
  ["authorizedLayerKey"](_0x2572a0) {
    return _0x2572a0["id"] ?? _0x2572a0["servisTuru"] + "|" + _0x2572a0["servisUrl"] + "|" + _0x2572a0["ogcLayerName"];
  }
  ["normalizeAuthorizedLayer"](_0x1264a3) {
    const _0x1cd4c9 = this["resolveOgcLayerName"](_0x1264a3["ogcLayerName"], _0x1264a3["katmanAdi"]), _0x4bbff8 = this["rewriteOpaqueOgcUrl"](_0x1264a3["servisUrl"]), _0x5d82b2 = _0x1264a3["servisTuru"]["toUpperCase"]();
    return { ..._0x1264a3, "servisTuru": _0x5d82b2, ..._0x1cd4c9 && _0x1cd4c9 !== _0x1264a3["ogcLayerName"] ? { "ogcLayerName": _0x1cd4c9 } : {}, ..._0x4bbff8 !== _0x1264a3["servisUrl"] ? { "servisUrl": _0x4bbff8 } : {} };
  }
  ["resolveOgcLayerName"](_0x20a683, _0x4632ee) {
    for (const _0x5135f6 of [_0x20a683, _0x4632ee]) {
      if (!_0x5135f6) continue;
      const _0x1420dd = _0x5135f6["trim"]();
      if (!_0x1420dd || _0x1420dd["toLowerCase"]() === "undefined" || _0x1420dd["toLowerCase"]() === "null") continue;
      return _0x1420dd;
    }
    return "";
  }
  ["isTrustedApiKeyHost"](_0x133c30) {
    if (__privateGet(this, _apiKey) === void 0) return ![];
    return this["isKnownGatedUrl"](_0x133c30);
  }
  ["layerRequiresApiKey"](_0x51e8b3) {
    return this["isKnownGatedUrl"](_0x51e8b3);
  }
  ["isKnownGatedUrl"](_0x39ece4) {
    if (this["isOwnBackendUrl"](_0x39ece4)) return !![];
    if (this["trustedApiKeyHosts"] === void 0 || this["trustedApiKeyHosts"]["length"] === 0) return ![];
    try {
      return this["trustedApiKeyHosts"]["includes"](new URL(_0x39ece4)["hostname"]);
    } catch {
      return ![];
    }
  }
  ["isOwnBackendUrl"](_0x34e8cd) {
    try {
      const _0x3d6234 = new URL(_0x34e8cd, window["location"]["origin"]), _0x3e07c0 = new URL(this["getApiBase"](), window["location"]["origin"]);
      if (_0x3d6234["hostname"] !== _0x3e07c0["hostname"]) return ![];
      return _0x3d6234["pathname"]["includes"]("/wms-proxy/") || _0x3d6234["pathname"]["includes"]("/ogc/");
    } catch {
      return ![];
    }
  }
  ["rewriteOpaqueOgcUrl"](_0x21facd) {
    if (!(_0x21facd == null ? void 0 : _0x21facd["includes"]("/ogc/"))) return _0x21facd ?? "";
    const _0x1e980b = _0x21facd["indexOf"]("/ogc/"), _0x246251 = _0x21facd["substring"](_0x1e980b), _0x446e31 = this["getApiBase"]()["replace"](/\/+$/, "");
    return "" + _0x446e31 + _0x246251;
  }
  ["resolveOgcProxyUrl"](_0x1076eb, _0x1b80fe) {
    if (__privateGet(this, _apiKey) === void 0) return _0x1b80fe;
    if (_0x1b80fe["includes"]("/ogc/")) return this["rewriteOpaqueOgcUrl"](_0x1b80fe);
    if (_0x1b80fe["includes"]("/wms-proxy/")) return _0x1b80fe;
    const _0x43878c = this["getApiBase"]()["replace"](/\/+$/, "") + "/wms-proxy/" + _0x1076eb, _0x19bb76 = _0x43878c["includes"]("?") ? "&" : "?";
    return "" + _0x43878c + _0x19bb76 + "url=" + encodeURIComponent(_0x1b80fe);
  }
  ["mergeApiKeyHeader"](_0x5d1f91, _0x443881) {
    if (!this["isTrustedApiKeyHost"](_0x443881)) return _0x5d1f91;
    return { ..._0x5d1f91, [_ApiKeyPolicy["API_KEY_HEADER_NAME"]]: __privateGet(this, _apiKey) };
  }
  ["attachApiKeyToUrl"](_0x44ee6f) {
    if (!this["isTrustedApiKeyHost"](_0x44ee6f)) return _0x44ee6f;
    const _0x599493 = _0x44ee6f["includes"]("?") ? "&" : "?";
    return "" + _0x44ee6f + _0x599493 + _ApiKeyPolicy["API_KEY_QUERY_PARAM_NAME"] + "=" + encodeURIComponent(__privateGet(this, _apiKey));
  }
  ["buildAuthHeaders"](_0x563f9a) {
    if (_0x563f9a === void 0) return void 0;
    return { "Authorization": "Bearer " + _0x563f9a };
  }
};
_apiKey = new WeakMap();
_ApiKeyPolicy["API_KEY_HEADER_NAME"] = "X-API-Key";
_ApiKeyPolicy["API_KEY_QUERY_PARAM_NAME"] = "tucbsapikey";
let ApiKeyPolicy = _ApiKeyPolicy;
function cartesianToLonLat(_0x11b9ff) {
  const _0x406419 = Cartographic["fromCartesian"](_0x11b9ff);
  return [_0x248e3b["toDegrees"](_0x406419["longitude"]), _0x248e3b["toDegrees"](_0x406419["latitude"])];
}
function closeRing$1(_0x44b87b) {
  if (_0x44b87b["length"] === 0) return _0x44b87b;
  const _0x182f5b = _0x44b87b[0], _0x3b38ad = _0x44b87b[_0x44b87b["length"] - 1];
  if (_0x182f5b[0] === _0x3b38ad[0] && _0x182f5b[1] === _0x3b38ad[1]) return _0x44b87b;
  return [..._0x44b87b, _0x182f5b];
}
function entityToGeoJSON(_0x3113ca, _0x263221 = JulianDate["now"]()) {
  var _a2, _b, _c;
  const _0x1208be = ((_a2 = _0x3113ca["properties"]) == null ? void 0 : _a2["getValue"](_0x263221)) ?? {}, _0x1881c9 = { ..._0x1208be };
  delete _0x1881c9["layerId"], delete _0x1881c9["featureId"];
  let _0x4e2b33 = null;
  if ((_b = _0x3113ca["polygon"]) == null ? void 0 : _b["hierarchy"]) {
    const _0x5bbede = _0x3113ca["polygon"]["hierarchy"]["getValue"](_0x263221), _0x5b65c3 = _0x5bbede == null ? void 0 : _0x5bbede["positions"];
    if (_0x5b65c3 && _0x5b65c3["length"] >= 3) {
      const _0x31661a = closeRing$1(_0x5b65c3["map"](cartesianToLonLat));
      _0x4e2b33 = { "type": "Polygon", "coordinates": [_0x31661a] };
    }
  } else {
    if ((_c = _0x3113ca["polyline"]) == null ? void 0 : _c["positions"]) {
      const _0x31f9dd = _0x3113ca["polyline"]["positions"]["getValue"](_0x263221);
      _0x31f9dd && _0x31f9dd["length"] >= 2 && (_0x4e2b33 = { "type": "LineString", "coordinates": _0x31f9dd["map"](cartesianToLonLat) });
    } else {
      if (_0x3113ca["position"]) {
        const _0x25837b = _0x3113ca["position"]["getValue"](_0x263221);
        _0x25837b && (_0x4e2b33 = { "type": "Point", "coordinates": cartesianToLonLat(_0x25837b) });
      }
    }
  }
  if (!_0x4e2b33) return null;
  return { "type": "Feature", "id": _0x3113ca["id"], "properties": _0x1881c9, "geometry": _0x4e2b33 };
}
function featureLabel(_0x2bfe7a) {
  var _a2;
  const _0x46b33a = ((_a2 = _0x2bfe7a["geometry"]) == null ? void 0 : _a2["type"]) ?? "Feature", _0x15adc5 = _0x2bfe7a["id"] != null ? String(_0x2bfe7a["id"]) : "";
  return _0x15adc5 ? _0x46b33a + " " + _0x15adc5 : _0x46b33a;
}
function triggerDownload(_0x515ff6, _0x103752) {
  const _0x1710a6 = URL["createObjectURL"](_0x515ff6), _0x8b3752 = document["createElement"]("a");
  _0x8b3752["href"] = _0x1710a6, _0x8b3752["download"] = _0x103752, document["body"]["appendChild"](_0x8b3752), _0x8b3752["click"](), _0x8b3752["remove"](), setTimeout(() => URL["revokeObjectURL"](_0x1710a6), 1e3);
}
function featureCollectionToKml(_0x4f5983) {
  const _0x2575ec = _0x4f5983["features"]["map"]((_0x4955f6, _0x537e78) => featureToKml(_0x4955f6, _0x537e78))["join"]("");
  return '<?xml version="1.0" encoding="UTF-8"?>\n<kml xmlns="http://www.opengis.net/kml/2.2"><Document>' + _0x2575ec + "</Document></kml>";
}
function featureCollectionToShapefileZip(_0x209ee9) {
  const _0x274e89 = collectShpRecords(_0x209ee9), _0xd45720 = writeShp(_0x274e89), _0x3abd4c = writeShx(_0x274e89), _0x3baf6e = writeDbf(_0x274e89["map"]((_0x458449) => _0x458449["name"]));
  return zipStore([{ "name": "export.shp", "data": _0xd45720 }, { "name": "export.shx", "data": _0x3abd4c }, { "name": "export.dbf", "data": _0x3baf6e }]);
}
function featureToKml(_0x3d1205, _0x2e87fd) {
  const _0x3131e2 = xmlEscape(featureName(_0x3d1205, _0x2e87fd)), _0x5b3276 = geometryToKml(_0x3d1205["geometry"]);
  if (!_0x5b3276) return "";
  return "<Placemark><name>" + _0x3131e2 + "</name>" + _0x5b3276 + "</Placemark>";
}
function geometryToKml(_0x20f28b) {
  if (!_0x20f28b) return "";
  switch (_0x20f28b["type"]) {
    case "Point":
      return "<Point><coordinates>" + coord(_0x20f28b["coordinates"]) + "</coordinates></Point>";
    case "MultiPoint":
      return "<MultiGeometry>" + _0x20f28b["coordinates"]["map"]((_0x3068d8) => "<Point><coordinates>" + coord(_0x3068d8) + "</coordinates></Point>")["join"]("") + "</MultiGeometry>";
    case "LineString":
      return "<LineString><coordinates>" + line(_0x20f28b["coordinates"]) + "</coordinates></LineString>";
    case "MultiLineString":
      return "<MultiGeometry>" + _0x20f28b["coordinates"]["map"]((_0x3d95cc) => "<LineString><coordinates>" + line(_0x3d95cc) + "</coordinates></LineString>")["join"]("") + "</MultiGeometry>";
    case "Polygon":
      return polygonKml(_0x20f28b["coordinates"]);
    case "MultiPolygon":
      return "<MultiGeometry>" + _0x20f28b["coordinates"]["map"]((_0x266b12) => polygonKml(_0x266b12))["join"]("") + "</MultiGeometry>";
    case "GeometryCollection":
      return "<MultiGeometry>" + _0x20f28b["geometries"]["map"]((_0x446151) => geometryToKml(_0x446151))["join"]("") + "</MultiGeometry>";
    default:
      return "";
  }
}
function polygonKml(_0xc2ee58) {
  const [_0x243f6a, ..._0xe9a7b9] = _0xc2ee58;
  if (!_0x243f6a) return "";
  const _0xd0833c = _0xe9a7b9["map"]((_0xb45814) => "<innerBoundaryIs><LinearRing><coordinates>" + line(_0xb45814) + "</coordinates></LinearRing></innerBoundaryIs>")["join"]("");
  return "<Polygon><outerBoundaryIs><LinearRing><coordinates>" + line(_0x243f6a) + "</coordinates></LinearRing></outerBoundaryIs>" + _0xd0833c + "</Polygon>";
}
function coord(_0x1146bf) {
  return _0x1146bf[0] + "," + _0x1146bf[1] + ",0";
}
function line(_0x2a1f6f) {
  return _0x2a1f6f["map"](coord)["join"](" ");
}
function xmlEscape(_0x169d40) {
  return _0x169d40["replaceAll"]("&", "&amp;")["replaceAll"]("<", "&lt;")["replaceAll"](">", "&gt;")["replaceAll"]('"', "&quot;");
}
function collectShpRecords(_0x1e2aeb) {
  const _0x38108f = firstKind(_0x1e2aeb);
  if (!_0x38108f) return [];
  const _0x2ddc02 = [];
  return _0x1e2aeb["features"]["forEach"]((_0x3b7ca5, _0x250442) => {
    for (const _0x5be12d of ringsForKind(_0x3b7ca5["geometry"], _0x38108f)) {
      const _0x59751a = _0x5be12d["map"](closeRing), _0x391d13 = _0x38108f === 5 ? orientPolygon(_0x59751a) : _0x59751a;
      _0x2ddc02["push"]({ "kind": _0x38108f, "name": featureName(_0x3b7ca5, _0x250442), "rings": _0x391d13, "bbox": bboxOf(_0x391d13) });
    }
  }), _0x2ddc02;
}
function firstKind(_0x186553) {
  for (const _0x5c2d76 of _0x186553["features"]) {
    const _0xd60f34 = kindOf(_0x5c2d76["geometry"]);
    if (_0xd60f34) return _0xd60f34;
  }
  return null;
}
function kindOf(_0x224c40) {
  if (!_0x224c40) return null;
  switch (_0x224c40["type"]) {
    case "Point":
    case "MultiPoint":
      return 1;
    case "LineString":
    case "MultiLineString":
      return 3;
    case "Polygon":
    case "MultiPolygon":
      return 5;
    case "GeometryCollection":
      for (const _0x5b57d8 of _0x224c40["geometries"]) {
        const _0x321c95 = kindOf(_0x5b57d8);
        if (_0x321c95) return _0x321c95;
      }
      return null;
    default:
      return null;
  }
}
function ringsForKind(_0x2f47c3, _0x5c5848) {
  if (!_0x2f47c3 || kindOf(_0x2f47c3) !== _0x5c5848) {
    if ((_0x2f47c3 == null ? void 0 : _0x2f47c3["type"]) === "GeometryCollection") return _0x2f47c3["geometries"]["flatMap"]((_0x509b80) => ringsForKind(_0x509b80, _0x5c5848));
    return [];
  }
  switch (_0x2f47c3["type"]) {
    case "Point":
      return [[[_0x2f47c3["coordinates"]]]];
    case "MultiPoint":
      return _0x2f47c3["coordinates"]["map"]((_0x938ec8) => [[_0x938ec8]]);
    case "LineString":
      return [[_0x2f47c3["coordinates"]]];
    case "MultiLineString":
      return [_0x2f47c3["coordinates"]];
    case "Polygon":
      return [_0x2f47c3["coordinates"]];
    case "MultiPolygon":
      return _0x2f47c3["coordinates"];
    default:
      return [];
  }
}
function closeRing(_0x1c4dc5) {
  const _0x4d4091 = _0x1c4dc5[0], _0x5118e7 = _0x1c4dc5[_0x1c4dc5["length"] - 1];
  if (!_0x4d4091 || !_0x5118e7) return _0x1c4dc5;
  if (_0x4d4091[0] === _0x5118e7[0] && _0x4d4091[1] === _0x5118e7[1]) return _0x1c4dc5;
  return [..._0x1c4dc5, _0x4d4091];
}
function orientPolygon(_0x302d79) {
  return _0x302d79["map"]((_0xbf3969, _0x401da7) => {
    const _0x50a028 = signedArea(_0xbf3969), _0x27959a = _0x401da7 === 0, _0xd820d4 = _0x50a028 < 0;
    if (_0x27959a === _0xd820d4) return _0xbf3969;
    return [..._0xbf3969]["reverse"]();
  });
}
function signedArea(_0x442db0) {
  let _0x6ade6 = 0;
  for (let _0x160f4d = 0; _0x160f4d < _0x442db0["length"] - 1; _0x160f4d++) {
    const _0x1855f1 = _0x442db0[_0x160f4d], _0x156ced = _0x442db0[_0x160f4d + 1], _0x67c8bf = _0x1855f1 == null ? void 0 : _0x1855f1[0], _0x97aae0 = _0x1855f1 == null ? void 0 : _0x1855f1[1], _0x53ee01 = _0x156ced == null ? void 0 : _0x156ced[0], _0x18da0c = _0x156ced == null ? void 0 : _0x156ced[1];
    if (_0x67c8bf === void 0 || _0x97aae0 === void 0 || _0x53ee01 === void 0 || _0x18da0c === void 0) continue;
    _0x6ade6 += _0x67c8bf * _0x18da0c - _0x53ee01 * _0x97aae0;
  }
  return _0x6ade6 / 2;
}
function bboxOf(_0x250562) {
  let _0x5a78aa = Infinity, _0x558cda = Infinity, _0xb47a31 = -Infinity, _0x4cfa5c = -Infinity;
  for (const _0x55de21 of _0x250562) {
    for (const _0x5a274d of _0x55de21) {
      const [_0x2d011f, _0x80cf4b] = xy(_0x5a274d);
      _0x5a78aa = Math["min"](_0x5a78aa, _0x2d011f), _0x558cda = Math["min"](_0x558cda, _0x80cf4b), _0xb47a31 = Math["max"](_0xb47a31, _0x2d011f), _0x4cfa5c = Math["max"](_0x4cfa5c, _0x80cf4b);
    }
  }
  if (!Number["isFinite"](_0x5a78aa)) return [0, 0, 0, 0];
  return [_0x5a78aa, _0x558cda, _0xb47a31, _0x4cfa5c];
}
function featureName(_0x48cfee, _0x45666f) {
  const _0x2a19b4 = _0x48cfee["properties"], _0x40e0d8 = _0x2a19b4 && typeof _0x2a19b4["name"] === "string" ? _0x2a19b4["name"] : "";
  return _0x40e0d8 || "feature-" + (_0x45666f + 1);
}
function writeShp(_0x41bc20) {
  const _0x195db0 = _0x41bc20["map"](recordBody), _0x31bfa6 = _0x195db0["reduce"]((_0x39aeb5, _0x4419d4) => _0x39aeb5 + 8 + _0x4419d4["length"], 0), _0x5ee580 = new Uint8Array(100 + _0x31bfa6), _0x613139 = new DataView(_0x5ee580["buffer"]);
  writeHeader(_0x613139, _0x5ee580["length"], _0x41bc20);
  let _0x530b14 = 100;
  return _0x195db0["forEach"]((_0x564418, _0x31b83d) => {
    _0x613139["setInt32"](_0x530b14, _0x31b83d + 1, ![]), _0x613139["setInt32"](_0x530b14 + 4, _0x564418["length"] / 2, ![]), _0x5ee580["set"](_0x564418, _0x530b14 + 8), _0x530b14 += 8 + _0x564418["length"];
  }), _0x5ee580;
}
function writeShx(_0x2be2d6) {
  const _0x38706a = new Uint8Array(100 + _0x2be2d6["length"] * 8), _0x32cf4f = new DataView(_0x38706a["buffer"]);
  writeHeader(_0x32cf4f, _0x38706a["length"], _0x2be2d6);
  let _0x4c0d40 = 50;
  return _0x2be2d6["forEach"]((_0x959130, _0x43f5eb) => {
    const _0x1b8262 = recordBody(_0x959130)["length"] / 2;
    _0x32cf4f["setInt32"](100 + _0x43f5eb * 8, _0x4c0d40, ![]), _0x32cf4f["setInt32"](100 + _0x43f5eb * 8 + 4, _0x1b8262, ![]), _0x4c0d40 += 4 + _0x1b8262;
  }), _0x38706a;
}
function writeHeader(_0x43635, _0x4ece9b, _0x2749a7) {
  var _a2;
  _0x43635["setInt32"](0, 9994, ![]), _0x43635["setInt32"](24, _0x4ece9b / 2, ![]), _0x43635["setInt32"](28, 1e3, !![]), _0x43635["setInt32"](32, ((_a2 = _0x2749a7[0]) == null ? void 0 : _a2["kind"]) ?? 5, !![]);
  const _0x384891 = unionBbox(_0x2749a7);
  _0x43635["setFloat64"](36, _0x384891[0], !![]), _0x43635["setFloat64"](44, _0x384891[1], !![]), _0x43635["setFloat64"](52, _0x384891[2], !![]), _0x43635["setFloat64"](60, _0x384891[3], !![]);
}
function unionBbox(_0xc68f31) {
  if (_0xc68f31["length"] === 0) return [0, 0, 0, 0];
  let _0x10f013 = Infinity, _0x186272 = Infinity, _0x520bf5 = -Infinity, _0x2a17c0 = -Infinity;
  for (const _0x31cc51 of _0xc68f31) {
    _0x10f013 = Math["min"](_0x10f013, _0x31cc51["bbox"][0]), _0x186272 = Math["min"](_0x186272, _0x31cc51["bbox"][1]), _0x520bf5 = Math["max"](_0x520bf5, _0x31cc51["bbox"][2]), _0x2a17c0 = Math["max"](_0x2a17c0, _0x31cc51["bbox"][3]);
  }
  return [_0x10f013, _0x186272, _0x520bf5, _0x2a17c0];
}
function xy(_0x48c498) {
  return [_0x48c498[0] ?? 0, _0x48c498[1] ?? 0];
}
function recordBody(_0x49fece) {
  var _a2;
  if (_0x49fece["kind"] === 1) {
    const _0x1cc92a = new Uint8Array(20), _0x48f8ce = new DataView(_0x1cc92a["buffer"]);
    _0x48f8ce["setInt32"](0, 1, !![]);
    const [_0x2a7bd3, _0x25acea] = xy(((_a2 = _0x49fece["rings"][0]) == null ? void 0 : _a2[0]) ?? [0, 0]);
    return _0x48f8ce["setFloat64"](4, _0x2a7bd3, !![]), _0x48f8ce["setFloat64"](12, _0x25acea, !![]), _0x1cc92a;
  }
  const _0x56ad87 = _0x49fece["rings"]["reduce"]((_0x2db1cf, _0x143549) => _0x2db1cf + _0x143549["length"], 0), _0x58e96b = new Uint8Array(44 + _0x49fece["rings"]["length"] * 4 + _0x56ad87 * 16), _0xcc998f = new DataView(_0x58e96b["buffer"]);
  _0xcc998f["setInt32"](0, _0x49fece["kind"], !![]), _0xcc998f["setFloat64"](4, _0x49fece["bbox"][0], !![]), _0xcc998f["setFloat64"](12, _0x49fece["bbox"][1], !![]), _0xcc998f["setFloat64"](20, _0x49fece["bbox"][2], !![]), _0xcc998f["setFloat64"](28, _0x49fece["bbox"][3], !![]), _0xcc998f["setInt32"](36, _0x49fece["rings"]["length"], !![]), _0xcc998f["setInt32"](40, _0x56ad87, !![]);
  let _0x4fe1d3 = 0;
  _0x49fece["rings"]["forEach"]((_0x2c9a61, _0x17e7ff) => {
    _0xcc998f["setInt32"](44 + _0x17e7ff * 4, _0x4fe1d3, !![]), _0x4fe1d3 += _0x2c9a61["length"];
  });
  let _0x31eb61 = 44 + _0x49fece["rings"]["length"] * 4;
  for (const _0x48447f of _0x49fece["rings"]) {
    for (const _0x13cc6c of _0x48447f) {
      const [_0x440a0d, _0x2f4d3f] = xy(_0x13cc6c);
      _0xcc998f["setFloat64"](_0x31eb61, _0x440a0d, !![]), _0xcc998f["setFloat64"](_0x31eb61 + 8, _0x2f4d3f, !![]), _0x31eb61 += 16;
    }
  }
  return _0x58e96b;
}
function writeDbf(_0x340db2) {
  const _0x50a8cf = 32 + 32 + 1, _0x563d50 = 1 + 80, _0x48acfc = new Uint8Array(_0x50a8cf + _0x340db2["length"] * _0x563d50 + 1), _0xb034cb = new DataView(_0x48acfc["buffer"]);
  _0x48acfc[0] = 3, _0xb034cb["setUint32"](4, _0x340db2["length"], !![]), _0xb034cb["setUint16"](8, _0x50a8cf, !![]), _0xb034cb["setUint16"](10, _0x563d50, !![]);
  const _0x5e43a4 = new TextEncoder()["encode"]("NAME");
  _0x48acfc["set"](_0x5e43a4, 32), _0x48acfc[32 + 11] = "C"["charCodeAt"](0), _0x48acfc[32 + 16] = 80, _0x48acfc[32 + 32] = 13;
  const _0x251397 = new TextEncoder();
  return _0x340db2["forEach"]((_0x261563, _0x393cbb) => {
    const _0x345a3e = _0x50a8cf + _0x393cbb * _0x563d50;
    _0x48acfc[_0x345a3e] = 32;
    const _0x18a76c = _0x251397["encode"](_0x261563)["slice"](0, 80);
    _0x48acfc["set"](_0x18a76c, _0x345a3e + 1);
    for (let _0x4e93ac = 1 + _0x18a76c["length"]; _0x4e93ac < _0x563d50; _0x4e93ac++) _0x48acfc[_0x345a3e + _0x4e93ac] = 32;
  }), _0x48acfc[_0x48acfc["length"] - 1] = 26, _0x48acfc;
}
function zipStore(_0x1e0854) {
  const _0x242430 = new TextEncoder(), _0x5bba24 = [], _0x5cfeba = [];
  let _0x433e63 = 0;
  for (const _0xe19599 of _0x1e0854) {
    const _0x7ac4e9 = _0x242430["encode"](_0xe19599["name"]), _0x21a73b = crc32(_0xe19599["data"]), _0x42a1cc = new Uint8Array(30 + _0x7ac4e9["length"] + _0xe19599["data"]["length"]), _0x4bde4d = new DataView(_0x42a1cc["buffer"]);
    _0x4bde4d["setUint32"](0, 67324752, !![]), _0x4bde4d["setUint16"](4, 20, !![]), _0x4bde4d["setUint16"](8, 0, !![]), _0x4bde4d["setUint32"](14, _0x21a73b, !![]), _0x4bde4d["setUint32"](18, _0xe19599["data"]["length"], !![]), _0x4bde4d["setUint32"](22, _0xe19599["data"]["length"], !![]), _0x4bde4d["setUint16"](26, _0x7ac4e9["length"], !![]), _0x42a1cc["set"](_0x7ac4e9, 30), _0x42a1cc["set"](_0xe19599["data"], 30 + _0x7ac4e9["length"]), _0x5bba24["push"](_0x42a1cc);
    const _0x1ebc70 = new Uint8Array(46 + _0x7ac4e9["length"]), _0x40b47b = new DataView(_0x1ebc70["buffer"]);
    _0x40b47b["setUint32"](0, 33639248, !![]), _0x40b47b["setUint16"](4, 20, !![]), _0x40b47b["setUint16"](6, 20, !![]), _0x40b47b["setUint16"](10, 0, !![]), _0x40b47b["setUint32"](16, _0x21a73b, !![]), _0x40b47b["setUint32"](20, _0xe19599["data"]["length"], !![]), _0x40b47b["setUint32"](24, _0xe19599["data"]["length"], !![]), _0x40b47b["setUint16"](28, _0x7ac4e9["length"], !![]), _0x40b47b["setUint32"](42, _0x433e63, !![]), _0x1ebc70["set"](_0x7ac4e9, 46), _0x5cfeba["push"](_0x1ebc70), _0x433e63 += _0x42a1cc["length"];
  }
  const _0x526f8e = _0x5cfeba["reduce"]((_0x2ce176, _0xf95fb0) => _0x2ce176 + _0xf95fb0["length"], 0), _0x238ae0 = new Uint8Array(22), _0x4a4437 = new DataView(_0x238ae0["buffer"]);
  return _0x4a4437["setUint32"](0, 101010256, !![]), _0x4a4437["setUint16"](8, _0x1e0854["length"], !![]), _0x4a4437["setUint16"](10, _0x1e0854["length"], !![]), _0x4a4437["setUint32"](12, _0x526f8e, !![]), _0x4a4437["setUint32"](16, _0x433e63, !![]), concat([..._0x5bba24, ..._0x5cfeba, _0x238ae0]);
}
function crc32(_0x24287e) {
  let _0x4bf40d = 4294967295;
  for (const _0xa3b9e3 of _0x24287e) {
    _0x4bf40d ^= _0xa3b9e3;
    for (let _0x1e5848 = 0; _0x1e5848 < 8; _0x1e5848++) {
      _0x4bf40d = _0x4bf40d >>> 1 ^ ((_0x4bf40d & 1) === 1 ? 3988292384 : 0);
    }
  }
  return (_0x4bf40d ^ 4294967295) >>> 0;
}
function concat(_0x3a707c) {
  const _0x3f83ec = _0x3a707c["reduce"]((_0x52d272, _0x167768) => _0x52d272 + _0x167768["length"], 0), _0x20f841 = new Uint8Array(_0x3f83ec);
  let _0x8b140c = 0;
  for (const _0x4d769d of _0x3a707c) {
    _0x20f841["set"](_0x4d769d, _0x8b140c), _0x8b140c += _0x4d769d["length"];
  }
  return _0x20f841;
}
function getLayerGeoJSON(_0x4caf8c, _0x35ee34, _0x3cfa6f) {
  if (!("entities" in _0x4caf8c["cesiumObject"])) return void 0;
  const _0x3f0454 = _0x4caf8c["cesiumObject"]["entities"]["values"]["filter"]((_0x561734) => !_0x3cfa6f(_0x561734))["map"]((_0x476bf0) => entityToGeoJSON(_0x476bf0, _0x35ee34))["filter"]((_0x13f1b6) => _0x13f1b6 !== null);
  return { "type": "FeatureCollection", "features": _0x3f0454 };
}
function exportLayerVector(_0x85c822, _0x23ebed, _0x55cc2e) {
  if (!_0x85c822) return;
  const _0x22ee7c = vectorFile(_0x85c822, _0x55cc2e);
  triggerDownload(_0x22ee7c["blob"], _0x23ebed + "-" + Date["now"]() + "." + _0x22ee7c["extension"]);
}
function exportLayerGeoJSON(_0x52b1e4, _0x1bde4b) {
  exportLayerVector(_0x52b1e4, _0x1bde4b, "geojson");
}
function exportLayerKml(_0x479a5c, _0x4f4d47) {
  exportLayerVector(_0x479a5c, _0x4f4d47, "kml");
}
function exportLayerShapefile(_0xfd2dcb, _0x53eb97) {
  exportLayerVector(_0xfd2dcb, _0x53eb97, "shp");
}
function bytesAsBuffer(_0x792ba8) {
  return _0x792ba8["buffer"]["slice"](_0x792ba8["byteOffset"], _0x792ba8["byteOffset"] + _0x792ba8["byteLength"]);
}
function vectorFile(_0x593f2f, _0x32caa1) {
  if (_0x32caa1 === "kml") return { "blob": new Blob([featureCollectionToKml(_0x593f2f)], { "type": "application/vnd.google-earth.kml+xml" }), "extension": "kml" };
  if (_0x32caa1 === "shp") return { "blob": new Blob([bytesAsBuffer(featureCollectionToShapefileZip(_0x593f2f))], { "type": "application/zip" }), "extension": "zip" };
  return { "blob": new Blob([JSON["stringify"](_0x593f2f, null, 2)], { "type": "application/geo+json" }), "extension": "geojson" };
}
const GEOTIFF_EXPORT_MAX_WMS_DIMENSION = 2048;
function geoTiffExportDimensions(_0x2f7db5, _0x4e3f53) {
  if (!_0x2f7db5) return { "width": _0x4e3f53, "height": Math["round"](_0x4e3f53 / 2) };
  const _0x394842 = Math["max"](_0x2f7db5["east"] - _0x2f7db5["west"], 1e-6), _0x19fc84 = Math["max"](_0x2f7db5["north"] - _0x2f7db5["south"], 1e-6), _0x22bc22 = _0x394842 >= _0x19fc84 ? _0x4e3f53 : Math["max"](64, Math["round"](_0x4e3f53 * _0x394842 / _0x19fc84)), _0x3fab42 = _0x19fc84 >= _0x394842 ? _0x4e3f53 : Math["max"](64, Math["round"](_0x4e3f53 * _0x19fc84 / _0x394842));
  return { "width": _0x22bc22, "height": _0x3fab42 };
}
function buildWmsGeoTiffExportUrl(_0x1d8915, _0x3d8978) {
  const _0x1054cb = _0x3d8978("wms", _0x1d8915["url"]), { width: _0x405fb6, height: _0x7497a9 } = geoTiffExportDimensions(_0x1d8915["geographicBoundingBox"], GEOTIFF_EXPORT_MAX_WMS_DIMENSION), _0x115a31 = _0x1d8915["geographicBoundingBox"], _0x217e7b = new URLSearchParams({ "SERVICE": "WMS", "REQUEST": "GetMap", "VERSION": "1.3.0", "LAYERS": _0x1d8915["layers"], "STYLES": "", "FORMAT": _0x1d8915["tiffFormat"], "TRANSPARENT": "false", "WIDTH": String(_0x405fb6), "HEIGHT": String(_0x7497a9), "CRS": "CRS:84", "BBOX": _0x115a31 ? _0x115a31["west"] + "," + _0x115a31["south"] + "," + _0x115a31["east"] + "," + _0x115a31["north"] : "-180,-90,180,90" }), _0x481064 = _0x1054cb["includes"]("?") ? "&" : "?";
  return "" + _0x1054cb + _0x481064 + _0x217e7b["toString"]();
}
function buildWcsGeoTiffExportUrl(_0x49408a, _0x298641) {
  const _0x42dd56 = _0x298641("wcs", _0x49408a["url"]), _0xe76c9d = _0x49408a["version"] ?? "2.0.1", _0x5c8da8 = { "service": "WCS", "version": _0xe76c9d, "request": "GetCoverage", "coverageId": _0x49408a["coverageId"], "format": _0x49408a["tiffFormat"] };
  if (_0xe76c9d["startsWith"]("2.")) {
    const _0x5ef32a = _0x49408a["maxSize"] ?? 2048;
    if (Number["isFinite"](_0x5ef32a)) _0x5c8da8["SCALESIZE"] = "x(" + _0x5ef32a + "),y(" + _0x5ef32a + ")";
  }
  const _0x22d46b = _0x42dd56["includes"]("?") ? "&" : "?";
  return "" + _0x42dd56 + _0x22d46b + new URLSearchParams(_0x5c8da8)["toString"]();
}
function isGeoTiffExportAvailable(_0x1aaa9b, _0x561505) {
  if (!_0x1aaa9b || _0x1aaa9b["layerType"] !== "WMS" && _0x1aaa9b["layerType"] !== "WCS") return ![];
  return !!_0x561505 && "tiffFormat" in _0x561505 && !!_0x561505["tiffFormat"];
}
async function exportLayerAsGeoTiff(_0x495bb2, _0x3053e8, _0x154f65, _0x479a09, _0x29965a) {
  if (_0x495bb2["layerType"] !== "WMS" && _0x495bb2["layerType"] !== "WCS") throw new LayerOperationError("LAYER_GEOTIFF_EXPORT_UNSUPPORTED_TYPE", 'Katman WMS/WCS değil, GeoTIFF export desteklenmiyor: "' + _0x495bb2["id"] + '"');
  if (!_0x3053e8 || !("tiffFormat" in _0x3053e8) || !_0x3053e8["tiffFormat"]) throw new LayerOperationError("LAYER_GEOTIFF_EXPORT_NOT_CONFIGURED", 'Katman GeoTIFF export desteklemiyor: "' + _0x495bb2["id"] + '"');
  const _0x1d0432 = _0x495bb2["layerType"] === "WMS" ? buildWmsGeoTiffExportUrl(_0x3053e8, _0x479a09) : buildWcsGeoTiffExportUrl(_0x3053e8, _0x479a09), _0x4ed059 = _0x29965a["mergeApiKeyHeader"](_0x29965a["buildAuthHeaders"](_0x3053e8["authToken"]), _0x1d0432), _0x19afb = await fetch(_0x1d0432, _0x4ed059 ? { "headers": _0x4ed059 } : void 0);
  if (!_0x19afb["ok"]) throw new OgcRequestError("OGC_GEOTIFF_DOWNLOAD_FAILED", "GeoTIFF indirilemedi: " + _0x19afb["status"] + " " + _0x19afb["statusText"]);
  const _0x5f0e5b = _0x19afb["headers"]["get"]("content-type") ?? "", _0x4f75a8 = await _0x19afb["arrayBuffer"](), _0x4bfa39 = /boundary="?([^";]+)"?/i["exec"](_0x5f0e5b);
  let _0x9d46c1;
  if (_0x5f0e5b["includes"]("multipart/") && _0x4bfa39) {
    const { bytes: _0x52bf26, mimeType: _0x204da9 } = extractMultipartImage(new Uint8Array(_0x4f75a8), _0x4bfa39[1]), _0x44c4d1 = _0x52bf26["buffer"]["slice"](_0x52bf26["byteOffset"], _0x52bf26["byteOffset"] + _0x52bf26["byteLength"]);
    _0x9d46c1 = new Blob([_0x44c4d1], { "type": _0x204da9 });
  } else _0x9d46c1 = new Blob([_0x4f75a8], { "type": _0x5f0e5b || _0x3053e8["tiffFormat"] });
  triggerDownload(_0x9d46c1, _0x154f65 + "-" + Date["now"]() + ".tif");
}
function extractMultipartImage(_0x2a16f3, _0x4d4aa6) {
  var _a2;
  const _0x52fca8 = new TextDecoder("iso-8859-1")["decode"](_0x2a16f3), _0xfe14cb = "--" + _0x4d4aa6;
  let _0x42e022 = 0;
  while (_0x42e022 < _0x52fca8["length"]) {
    const _0x1bdb7d = _0x52fca8["indexOf"](_0xfe14cb, _0x42e022);
    if (_0x1bdb7d === -1) break;
    const _0x195b62 = _0x1bdb7d + _0xfe14cb["length"], _0x2a1f14 = _0x52fca8["indexOf"](_0xfe14cb, _0x195b62);
    if (_0x2a1f14 === -1) break;
    const _0x4a43d3 = _0x52fca8["indexOf"]("\r\n\r\n", _0x195b62), _0x585db2 = _0x52fca8["indexOf"]("\n\n", _0x195b62), _0x48fed3 = _0x4a43d3 !== -1 && (_0x585db2 === -1 || _0x4a43d3 <= _0x585db2) ? _0x4a43d3 : _0x585db2, _0x518afa = _0x48fed3 === _0x4a43d3 ? 4 : 2;
    if (_0x48fed3 === -1 || _0x48fed3 >= _0x2a1f14) {
      _0x42e022 = _0x2a1f14;
      continue;
    }
    const _0x3a4335 = /content-type:\s*([^\r\n;]+)/i["exec"](_0x52fca8["slice"](_0x195b62, _0x48fed3)), _0xb30f07 = (_a2 = _0x3a4335 == null ? void 0 : _0x3a4335[1]) == null ? void 0 : _a2["trim"]();
    if (_0xb30f07 == null ? void 0 : _0xb30f07["startsWith"]("image/")) {
      const _0x27853e = _0x48fed3 + _0x518afa;
      let _0x13d4dd = _0x2a1f14;
      if (_0x52fca8[_0x13d4dd - 2] === "\r" && _0x52fca8[_0x13d4dd - 1] === "\n") _0x13d4dd -= 2;
      else {
        if (_0x52fca8[_0x13d4dd - 1] === "\n") _0x13d4dd -= 1;
      }
      return { "bytes": _0x2a16f3["slice"](_0x27853e, _0x13d4dd), "mimeType": _0xb30f07 };
    }
    _0x42e022 = _0x2a1f14;
  }
  throw new OgcRequestError("OGC_WCS_MULTIPART_IMAGE_NOT_FOUND", "Multipart WCS yanıtında görsel parçası bulunamadı.");
}
const POLE_SLICE_DEGREES = 90, POLE_LATITUDE_LIMIT = 89.9;
function clipRingToLongitude(_0x247166, _0x369d3c, _0x197024) {
  const _0x5a5db9 = (_0x51bea7) => _0x197024 * (_0x51bea7[0] - _0x369d3c) >= 0, _0x4ad813 = [], _0x474d95 = (_0x556a41) => {
    const _0x45a2b1 = _0x4ad813[_0x4ad813["length"] - 1];
    if (_0x45a2b1 === void 0 || _0x45a2b1[0] !== _0x556a41[0] || _0x45a2b1[1] !== _0x556a41[1]) _0x4ad813["push"]([_0x556a41[0], _0x556a41[1]]);
  };
  for (let _0x1ac244 = 0; _0x1ac244 < _0x247166["length"] - 1; _0x1ac244++) {
    const _0x526f5b = _0x247166[_0x1ac244], _0x3cf0ce = _0x247166[_0x1ac244 + 1];
    if (_0x5a5db9(_0x526f5b)) _0x474d95(_0x526f5b);
    if (_0x5a5db9(_0x526f5b) !== _0x5a5db9(_0x3cf0ce)) {
      const _0x4f5539 = (_0x369d3c - _0x526f5b[0]) / (_0x3cf0ce[0] - _0x526f5b[0]);
      _0x474d95([_0x369d3c, _0x526f5b[1] + _0x4f5539 * (_0x3cf0ce[1] - _0x526f5b[1])]);
    }
  }
  if (_0x4ad813["length"] > 0) _0x474d95(_0x4ad813[0]);
  return _0x4ad813;
}
const _OutlineGeometry = class _OutlineGeometry {
  constructor(_0x36ccc9) {
    this["outlineCompanionEntities"] = /* @__PURE__ */ new WeakSet(), this["entitiesWithOutlineCompanion"] = /* @__PURE__ */ new WeakSet(), this["entitiesWithRiskyOutline"] = /* @__PURE__ */ new WeakSet(), this["getCurrentTime"] = _0x36ccc9["getCurrentTime"];
  }
  ["isOutlineCompanion"](_0x2cd048) {
    return this["outlineCompanionEntities"]["has"](_0x2cd048);
  }
  ["hasOutlineCompanion"](_0x5e8c75) {
    return this["entitiesWithOutlineCompanion"]["has"](_0x5e8c75);
  }
  ["hasRiskyOutline"](_0x20ab7a) {
    return this["entitiesWithRiskyOutline"]["has"](_0x20ab7a);
  }
  ["addPolygonOutlines"](_0xeac8b0, _0x206f40, _0x2c1d76) {
    const _0x59ba9e = _0xeac8b0["entities"]["values"]["filter"]((_0xf6abf9) => _0xf6abf9["polygon"] !== void 0 && !this["entitiesWithRiskyOutline"]["has"](_0xf6abf9));
    _0xeac8b0["entities"]["suspendEvents"]();
    for (const _0x49d8d9 of _0x59ba9e) {
      this["addPolygonOutlineCompanion"](_0xeac8b0, _0x49d8d9, _0x206f40, _0x2c1d76, !![]);
    }
    _0xeac8b0["entities"]["resumeEvents"]();
  }
  ["addPolygonOutlineCompanion"](_0x5bce0a, _0x5d96c5, _0xfd609c, _0x4eeed3, _0x5e5b3e) {
    var _a2;
    const _0x38f5bd = this["getCurrentTime"](), _0x45ce2c = (_a2 = _0x5d96c5["polygon"]["hierarchy"]) == null ? void 0 : _a2["getValue"](_0x38f5bd), _0x1a2d05 = _0x45ce2c == null ? void 0 : _0x45ce2c["positions"], _0x1035da = _0x1a2d05 == null ? void 0 : _0x1a2d05[0];
    if (_0x1a2d05 === void 0 || _0x1a2d05["length"] < 2 || _0x1035da === void 0) return;
    _0x5d96c5["polygon"]["outline"] = new ConstantProperty(![]), this["entitiesWithOutlineCompanion"]["add"](_0x5d96c5);
    const _0x1206a8 = _OutlineGeometry["simplifyOutlinePositions"]([..._0x1a2d05, _0x1035da]), _0x40cc02 = _0x5bce0a["entities"]["add"]({ "id": _0x5d96c5["id"] + "::outline", "polyline": { "positions": _0x1206a8, "clampToGround": _0x5e5b3e, "width": _0x4eeed3, "material": _0xfd609c } });
    this["outlineCompanionEntities"]["add"](_0x40cc02), _0x40cc02["properties"] = new PropertyBag({ "__tucbsOutlineOf": _0x5d96c5["id"] });
  }
  ["disableRiskyPolygonOutlines"](_0x2a85c6) {
    var _a2, _b;
    const _0x3213c2 = JulianDate["now"]();
    _0x2a85c6["entities"]["suspendEvents"]();
    for (const _0x3887da of [..._0x2a85c6["entities"]["values"]]) {
      const _0x385583 = _0x3887da["polygon"], _0x3810ef = (_a2 = _0x385583 == null ? void 0 : _0x385583["hierarchy"]) == null ? void 0 : _a2["getValue"](_0x3213c2);
      if (_0x385583 !== void 0 && this["risksAntimeridianOrPoleBug"](_0x3810ef == null ? void 0 : _0x3810ef["positions"])) {
        _0x385583["outline"] = new ConstantProperty(![]), this["entitiesWithRiskyOutline"]["add"](_0x3887da);
        if (_0x3810ef !== void 0 && this["splitPoleEnclosingPolygon"](_0x2a85c6, _0x3887da, _0x3810ef, _0x3213c2)) continue;
        _0x385583["height"] === void 0 && ((_b = _0x385583["perPositionHeight"]) == null ? void 0 : _b["getValue"](_0x3213c2)) !== !![] && (_0x385583["height"] = new ConstantProperty(0));
      }
    }
    _0x2a85c6["entities"]["resumeEvents"]();
  }
  ["splitPoleEnclosingPolygon"](_0x24fb9b, _0x1b6c2f, _0x571e51, _0x48877f) {
    var _a2;
    const _0x339d62 = _0x1b6c2f["polygon"];
    if (_0x339d62 === void 0 || _0x571e51["holes"]["length"] > 0) return ![];
    const _0x37c195 = _0x571e51["positions"]["map"]((_0x5e6df9) => {
      const _0x1e9e5b = Cartographic["fromCartesian"](_0x5e6df9);
      return [_0x248e3b["toDegrees"](_0x1e9e5b["longitude"]), _0x248e3b["toDegrees"](_0x1e9e5b["latitude"])];
    });
    let _0x37fc9c = Infinity, _0x388675 = -Infinity;
    for (let _0x543d89 = 0; _0x543d89 < _0x37c195["length"]; _0x543d89++) {
      const [_0x51c8c4] = _0x37c195[_0x543d89];
      if (_0x543d89 > 0 && Math["abs"](_0x51c8c4 - _0x37c195[_0x543d89 - 1][0]) > 180) return ![];
      _0x37fc9c = Math["min"](_0x37fc9c, _0x51c8c4), _0x388675 = Math["max"](_0x388675, _0x51c8c4);
    }
    if (_0x388675 - _0x37fc9c < 359) return ![];
    const _0x200768 = [..._0x37c195, _0x37c195[0]]["map"](([_0x59059a, _0x426a84]) => [_0x59059a, Math["max"](-POLE_LATITUDE_LIMIT, Math["min"](POLE_LATITUDE_LIMIT, _0x426a84))]), _0x23465f = [];
    for (let _0x3f38d8 = -180; _0x3f38d8 < 180; _0x3f38d8 += POLE_SLICE_DEGREES) {
      const _0x1cacc4 = clipRingToLongitude(clipRingToLongitude(_0x200768, _0x3f38d8, 1), _0x3f38d8 + POLE_SLICE_DEGREES, -1)["slice"](0, -1);
      if (_0x1cacc4["length"] >= 3) _0x23465f["push"](Cartesian3["fromDegreesArray"](_0x1cacc4["flat"]()));
    }
    if (_0x23465f["length"] === 0) return ![];
    const _0x2f215a = (_a2 = _0x1b6c2f["properties"]) == null ? void 0 : _a2["getValue"](_0x48877f);
    return _0x23465f["forEach"]((_0x55f6f5, _0x382ec7) => {
      const _0x406b39 = new ConstantProperty(new PolygonHierarchy(_0x55f6f5));
      if (_0x382ec7 === 0) {
        _0x339d62["hierarchy"] = _0x406b39;
        return;
      }
      const _0x30a8a9 = _0x339d62["clone"]();
      _0x30a8a9["hierarchy"] = _0x406b39;
      const _0x3c0757 = _0x24fb9b["entities"]["add"]({ "id": _0x1b6c2f["id"] + "::part-" + _0x382ec7, ..._0x1b6c2f["name"] !== void 0 ? { "name": _0x1b6c2f["name"] } : {}, "polygon": _0x30a8a9 });
      if (_0x2f215a !== void 0) _0x3c0757["properties"] = new PropertyBag(_0x2f215a);
      this["entitiesWithRiskyOutline"]["add"](_0x3c0757);
    }), !![];
  }
  ["risksAntimeridianOrPoleBug"](_0x4ff3e6) {
    if (!_0x4ff3e6 || _0x4ff3e6["length"] < 2) return ![];
    let _0x365e8a;
    for (const _0x15de6a of _0x4ff3e6) {
      const _0x428bea = Cartographic["fromCartesian"](_0x15de6a), _0x40ad48 = _0x248e3b["toDegrees"](_0x428bea["latitude"]);
      if (Math["abs"](_0x40ad48) > 89) return !![];
      const _0x476454 = _0x248e3b["toDegrees"](_0x428bea["longitude"]);
      if (_0x365e8a !== void 0 && Math["abs"](_0x476454 - _0x365e8a) > 180) return !![];
      _0x365e8a = _0x476454;
    }
    return ![];
  }
  ["flattenSuspiciousGeometry"](_0x4543f2) {
    _0x4543f2["entities"]["suspendEvents"]();
    for (const _0x5078d5 of _0x4543f2["entities"]["values"]) {
      if (_0x5078d5["polygon"] !== void 0) _0x5078d5["polygon"]["granularity"] = new ConstantProperty(Math["PI"]);
      if (_0x5078d5["polyline"] !== void 0) _0x5078d5["polyline"]["granularity"] = new ConstantProperty(Math["PI"]);
    }
    _0x4543f2["entities"]["resumeEvents"]();
  }
  static ["douglasPeucker"](_0xc49daf, _0x2520aa) {
    const _0x223614 = new Array(_0xc49daf["length"])["fill"](![]);
    _0x223614[0] = !![], _0x223614[_0xc49daf["length"] - 1] = !![];
    const _0x106ff2 = [[0, _0xc49daf["length"] - 1]];
    while (_0x106ff2["length"] > 0) {
      const [_0x3d2754, _0x402ee9] = _0x106ff2["pop"]();
      if (_0x402ee9 <= _0x3d2754 + 1) continue;
      let _0x2403a6 = -1, _0x861af = -1;
      for (let _0x1ccdd5 = _0x3d2754 + 1; _0x1ccdd5 < _0x402ee9; _0x1ccdd5++) {
        const _0xd2e6e2 = _OutlineGeometry["perpendicularDistance"](_0xc49daf[_0x1ccdd5], _0xc49daf[_0x3d2754], _0xc49daf[_0x402ee9]);
        _0xd2e6e2 > _0x2403a6 && (_0x2403a6 = _0xd2e6e2, _0x861af = _0x1ccdd5);
      }
      _0x2403a6 > _0x2520aa && (_0x223614[_0x861af] = !![], _0x106ff2["push"]([_0x3d2754, _0x861af], [_0x861af, _0x402ee9]));
    }
    return _0xc49daf["filter"]((_0x4c0563, _0x326e83) => _0x223614[_0x326e83]);
  }
  static ["perpendicularDistance"](_0x48f71b, _0x511363, _0xa1b247) {
    const _0x3cc4fb = Cartesian3["subtract"](_0xa1b247, _0x511363, new Cartesian3()), _0x4ad89d = Cartesian3["magnitudeSquared"](_0x3cc4fb);
    if (_0x4ad89d === 0) return Cartesian3["distance"](_0x48f71b, _0x511363);
    const _0x6f87a4 = Cartesian3["subtract"](_0x48f71b, _0x511363, new Cartesian3()), _0x4610fb = _0x248e3b["clamp"](Cartesian3["dot"](_0x6f87a4, _0x3cc4fb) / _0x4ad89d, 0, 1), _0x8f860f = Cartesian3["add"](_0x511363, Cartesian3["multiplyByScalar"](_0x3cc4fb, _0x4610fb, _0x3cc4fb), _0x3cc4fb);
    return Cartesian3["distance"](_0x48f71b, _0x8f860f);
  }
  static ["uniformDecimate"](_0x3306e, _0x177e25) {
    if (_0x3306e["length"] <= _0x177e25) return [..._0x3306e];
    const _0x196911 = (_0x3306e["length"] - 1) / (_0x177e25 - 1);
    return Array["from"]({ "length": _0x177e25 }, (_0x5377c3, _0x5b8ce4) => _0x3306e[Math["round"](_0x5b8ce4 * _0x196911)]);
  }
  static ["polygonExtentMeters"](_0x2526c7) {
    let _0x2fd553 = Infinity, _0x3a7b4b = Infinity, _0x1a6c63 = Infinity, _0x53046c = -Infinity, _0x350ccc = -Infinity, _0x471c71 = -Infinity;
    for (const _0x438365 of _0x2526c7) {
      if (_0x438365["x"] < _0x2fd553) _0x2fd553 = _0x438365["x"];
      if (_0x438365["x"] > _0x53046c) _0x53046c = _0x438365["x"];
      if (_0x438365["y"] < _0x3a7b4b) _0x3a7b4b = _0x438365["y"];
      if (_0x438365["y"] > _0x350ccc) _0x350ccc = _0x438365["y"];
      if (_0x438365["z"] < _0x1a6c63) _0x1a6c63 = _0x438365["z"];
      if (_0x438365["z"] > _0x471c71) _0x471c71 = _0x438365["z"];
    }
    return Math["sqrt"]((_0x53046c - _0x2fd553) ** 2 + (_0x350ccc - _0x3a7b4b) ** 2 + (_0x471c71 - _0x1a6c63) ** 2);
  }
  static ["simplifyOutlinePositions"](_0x2fea86) {
    const _0x2b2640 = _OutlineGeometry["polygonExtentMeters"](_0x2fea86), _0x3209af = _0x248e3b["clamp"](_0x2b2640 * _OutlineGeometry["OUTLINE_SIMPLIFY_TOLERANCE_FACTOR"], _OutlineGeometry["OUTLINE_SIMPLIFY_MIN_TOLERANCE_METERS"], _OutlineGeometry["OUTLINE_SIMPLIFY_MAX_TOLERANCE_METERS"]), _0x2c9fe3 = _OutlineGeometry["douglasPeucker"](_0x2fea86, _0x3209af);
    return _0x2c9fe3["length"] > _OutlineGeometry["OUTLINE_MAX_VERTICES"] ? _OutlineGeometry["uniformDecimate"](_0x2c9fe3, _OutlineGeometry["OUTLINE_MAX_VERTICES"]) : _0x2c9fe3;
  }
};
_OutlineGeometry["OUTLINE_SIMPLIFY_TOLERANCE_FACTOR"] = 7e-5;
_OutlineGeometry["OUTLINE_SIMPLIFY_MIN_TOLERANCE_METERS"] = 0.25;
_OutlineGeometry["OUTLINE_SIMPLIFY_MAX_TOLERANCE_METERS"] = 150;
_OutlineGeometry["OUTLINE_MAX_VERTICES"] = 1200;
let OutlineGeometry = _OutlineGeometry;
class OpacityController {
  constructor(_0x34d7f9) {
    this["dataSourceOpacityStates"] = /* @__PURE__ */ new WeakMap(), this["dataSourceOpacityProperties"] = /* @__PURE__ */ new WeakMap(), this["requestRender"] = _0x34d7f9["requestRender"];
  }
  ["getWrappedBaseColor"](_0x1c6e33) {
    return this["dataSourceOpacityProperties"]["get"](_0x1c6e33);
  }
  ["prepareDataSourceOpacity"](_0x475687) {
    var _a2, _b;
    const _0x4c40aa = this["getDataSourceOpacityState"](_0x475687), _0x53cf7f = JulianDate["now"]();
    _0x475687["entities"]["suspendEvents"]();
    for (const _0x5cd858 of _0x475687["entities"]["values"]) {
      if (((_a2 = _0x5cd858["polygon"]) == null ? void 0 : _a2["material"]) instanceof ColorMaterialProperty) {
        const _0x1b15fa = _0x5cd858["polygon"]["material"];
        this["installOpacityColorProperty"](_0x1b15fa["color"], _0x4c40aa, _0x53cf7f, new Color(1, 1, 1, 0.5), (_0x51b975) => _0x1b15fa["color"] = _0x51b975);
      }
      if (((_b = _0x5cd858["polyline"]) == null ? void 0 : _b["material"]) instanceof ColorMaterialProperty) {
        const _0x4d3249 = _0x5cd858["polyline"]["material"];
        this["installOpacityColorProperty"](_0x4d3249["color"], _0x4c40aa, _0x53cf7f, Color["WHITE"], (_0x22ab63) => _0x4d3249["color"] = _0x22ab63);
      }
      _0x5cd858["point"] !== void 0 && this["installOpacityColorProperty"](_0x5cd858["point"]["color"], _0x4c40aa, _0x53cf7f, Color["WHITE"], (_0x2d2cc6) => _0x5cd858["point"]["color"] = _0x2d2cc6), _0x5cd858["billboard"] !== void 0 && this["installOpacityColorProperty"](_0x5cd858["billboard"]["color"], _0x4c40aa, _0x53cf7f, Color["WHITE"], (_0x110641) => _0x5cd858["billboard"]["color"] = _0x110641);
    }
    _0x475687["entities"]["resumeEvents"]();
  }
  ["ensureDynamicFillColor"](_0x367782, _0x1f3902) {
    var _a2;
    if (!(((_a2 = _0x1f3902["polygon"]) == null ? void 0 : _a2["material"]) instanceof ColorMaterialProperty)) return;
    const _0x463607 = this["getDataSourceOpacityState"](_0x367782), _0xf87f8b = _0x1f3902["polygon"]["material"];
    this["installOpacityColorProperty"](_0xf87f8b["color"], _0x463607, JulianDate["now"](), new Color(1, 1, 1, 0.5), (_0x2bddcc) => _0xf87f8b["color"] = _0x2bddcc);
  }
  ["setDataSourceOpacity"](_0x51c4d4, _0x11f81c) {
    const _0x4b72a3 = this["getDataSourceOpacityState"](_0x51c4d4);
    if (_0x4b72a3["opacity"] === _0x11f81c) return;
    _0x4b72a3["opacity"] = _0x11f81c, !_0x4b72a3["wrapped"] && _0x11f81c !== 1 && (this["prepareDataSourceOpacity"](_0x51c4d4), _0x4b72a3["wrapped"] = !![]), this["requestRender"]();
  }
  ["getDataSourceOpacityState"](_0x3e5e69) {
    let _0x3092f2 = this["dataSourceOpacityStates"]["get"](_0x3e5e69);
    return _0x3092f2 === void 0 && (_0x3092f2 = { "opacity": 1, "wrapped": ![] }, this["dataSourceOpacityStates"]["set"](_0x3e5e69, _0x3092f2)), _0x3092f2;
  }
  ["installOpacityColorProperty"](_0x2d1e9d, _0xb93c1a, _0x425906, _0x14eb8b, _0x33e7f6) {
    if (_0x2d1e9d !== void 0 && this["dataSourceOpacityProperties"]["has"](_0x2d1e9d)) return;
    const _0x532b38 = this["readColorProperty"](_0x2d1e9d, _0x425906, _0x14eb8b), _0x1899e5 = this["createOpacityColorProperty"](_0x532b38, _0xb93c1a);
    _0x33e7f6(_0x1899e5);
  }
  ["readColorProperty"](_0x4c6c03, _0x4e6074, _0x1ab1ad) {
    const _0x4b6d98 = _0x4c6c03 == null ? void 0 : _0x4c6c03["getValue"](_0x4e6074);
    return _0x4b6d98 instanceof Color ? Color["clone"](_0x4b6d98, new Color()) : Color["clone"](_0x1ab1ad, new Color());
  }
  ["createOpacityColorProperty"](_0x108e29, _0xd64bb4) {
    const _0x58d411 = Color["clone"](_0x108e29, new Color()), _0x4416b3 = new CallbackProperty((_0x4c0605, _0x1ce540) => {
      const _0x752bef = _0x1ce540 instanceof Color ? _0x1ce540 : new Color();
      return _0x752bef["red"] = _0x58d411["red"], _0x752bef["green"] = _0x58d411["green"], _0x752bef["blue"] = _0x58d411["blue"], _0x752bef["alpha"] = _0x58d411["alpha"] * _0xd64bb4["opacity"], _0x752bef;
    }, ![]);
    return this["dataSourceOpacityProperties"]["set"](_0x4416b3, _0x58d411), _0x4416b3;
  }
}
const _CameraHighlight = class _CameraHighlight {
  constructor(_0x2d7b10, _0x1e616c) {
    this["viewer"] = _0x2d7b10, this["deps"] = _0x1e616c;
  }
  async ["zoomToLayer"](_0x54980a) {
    const _0x3e6967 = this["deps"]["requireLayer"](_0x54980a);
    return this["viewer"]["zoomTo"](_0x3e6967["cesiumObject"], new HeadingPitchRange(0, -_0x248e3b["PI_OVER_TWO"], 0));
  }
  async ["zoomToEntity"](_0x7d0359, _0x9ec101) {
    var _a2, _b;
    const _0x254304 = this["viewer"]["clock"]["currentTime"];
    let _0x1e73f0;
    if (((_a2 = _0x7d0359["polygon"]) == null ? void 0 : _a2["hierarchy"]) !== void 0) {
      const _0x1d9d9f = _0x7d0359["polygon"]["hierarchy"]["getValue"](_0x254304);
      _0x1e73f0 = _0x1d9d9f == null ? void 0 : _0x1d9d9f["positions"];
    } else ((_b = _0x7d0359["polyline"]) == null ? void 0 : _b["positions"]) !== void 0 && (_0x1e73f0 = _0x7d0359["polyline"]["positions"]["getValue"](_0x254304));
    if (_0x1e73f0 !== void 0 && _0x1e73f0["length"] > 0) {
      const _0x3313 = BoundingSphere["fromPoints"](_0x1e73f0), _0x252a2f = Math["max"](_0x3313["radius"] * 2, 50);
      return new Promise((_0x5419ca) => {
        this["viewer"]["camera"]["flyToBoundingSphere"](_0x3313, { "offset": new HeadingPitchRange(0, -_0x248e3b["PI_OVER_TWO"], _0x252a2f), ...(_0x9ec101 == null ? void 0 : _0x9ec101["duration"]) !== void 0 ? { "duration": _0x9ec101["duration"] } : {}, "complete": () => _0x5419ca(!![]), "cancel": () => _0x5419ca(![]) });
      });
    }
    return this["viewer"]["zoomTo"](_0x7d0359, new HeadingPitchRange(0, -_0x248e3b["PI_OVER_TWO"], 0));
  }
  static ["elevate"](_0x49ac2a, _0x51c3a8) {
    return _0x49ac2a["map"]((_0x55dd1b) => {
      const _0x43c481 = Cartographic["fromCartesian"](_0x55dd1b);
      return Cartesian3["fromRadians"](_0x43c481["longitude"], _0x43c481["latitude"], _0x43c481["height"] + _0x51c3a8);
    });
  }
  ["highlightEntity"](_0x567940) {
    var _a2, _b, _c;
    const _0x370943 = this["viewer"]["clock"]["currentTime"], _0x21e418 = (_a2 = _0x567940["properties"]) == null ? void 0 : _a2["getValue"](_0x370943), _0xceddaf = _0x21e418 == null ? void 0 : _0x21e418["layerId"], _0x12192c = _0xceddaf !== void 0 ? this["deps"]["getLayerStyle"](_0xceddaf) : void 0, _0x3bc76f = _CameraHighlight["HIGHLIGHT_COLOR"], _0x3c193c = ((_0x12192c == null ? void 0 : _0x12192c["outline"]["width"]) ?? 2) + 4, _0x3d777e = new ColorMaterialProperty(_0x3bc76f), _0x1fe24a = new Entity();
    if (((_b = _0x567940["polygon"]) == null ? void 0 : _b["hierarchy"]) !== void 0) {
      const _0x38ae30 = _0x567940["polygon"]["hierarchy"]["getValue"](_0x370943), _0x218041 = _0x38ae30 == null ? void 0 : _0x38ae30["positions"];
      if (_0x218041 === void 0 || _0x218041["length"] < 2) return;
      const _0x31cb29 = Cartesian3["equals"](_0x218041[0], _0x218041[_0x218041["length"] - 1]) ? _0x218041 : [..._0x218041, _0x218041[0]];
      _0x1fe24a["polyline"] = new PolylineGraphics({ "positions": _CameraHighlight["elevate"](_0x31cb29, _CameraHighlight["HIGHLIGHT_ELEVATION_METERS"]), "width": _0x3c193c, "material": _0x3d777e, "depthFailMaterial": _0x3d777e });
    } else {
      if (((_c = _0x567940["polyline"]) == null ? void 0 : _c["positions"]) !== void 0) {
        const _0x2f4e69 = _0x567940["polyline"]["positions"]["getValue"](_0x370943);
        if (_0x2f4e69 === void 0 || _0x2f4e69["length"] < 2) return;
        _0x1fe24a["polyline"] = new PolylineGraphics({ "positions": _CameraHighlight["elevate"](_0x2f4e69, _CameraHighlight["HIGHLIGHT_ELEVATION_METERS"]), "width": _0x3c193c, "material": _0x3d777e, "depthFailMaterial": _0x3d777e });
      } else {
        if (_0x567940["position"] !== void 0) {
          const _0x4ccf93 = _0x567940["position"]["getValue"](_0x370943);
          if (_0x4ccf93 === void 0) return;
          _0x1fe24a["position"] = new ConstantPositionProperty(_0x4ccf93), _0x1fe24a["point"] = new PointGraphics({ "pixelSize": _0x3c193c + 12, "color": _0x3bc76f, "disableDepthTestDistance": Number["POSITIVE_INFINITY"] });
        } else return;
      }
    }
    !this["highlightDataSource"] ? (this["highlightDataSource"] = new CustomDataSource("__tucbs_highlight__"), void this["viewer"]["dataSources"]["add"](this["highlightDataSource"])) : this["highlightDataSource"]["entities"]["removeAll"](), this["highlightDataSource"]["entities"]["add"](_0x1fe24a);
  }
  ["clearHighlight"]() {
    var _a2;
    (_a2 = this["highlightDataSource"]) == null ? void 0 : _a2["entities"]["removeAll"]();
  }
};
_CameraHighlight["HIGHLIGHT_COLOR"] = Color["fromCssColorString"]("#00FFFF");
_CameraHighlight["HIGHLIGHT_ELEVATION_METERS"] = 0.5;
let CameraHighlight = _CameraHighlight;
const SEAM_COVER_WIDTH = 1, OUTLINE_ID_SUFFIX = "::outline";
class LayerStyleEngine {
  constructor(_0x46ae12) {
    this["appliedLayerStyles"] = /* @__PURE__ */ new Map(), this["appliedCompanionWidths"] = /* @__PURE__ */ new Map(), this["outlineGeometry"] = _0x46ae12["outlineGeometry"], this["opacityController"] = _0x46ae12["opacityController"], this["getCurrentTime"] = _0x46ae12["getCurrentTime"], this["requestRender"] = _0x46ae12["requestRender"], this["emitStyle"] = _0x46ae12["emitStyle"], this["waitForRenderSettle"] = _0x46ae12["waitForRenderSettle"];
  }
  async ["applyLayerStyle"](_0x1ca489, _0x2ccfb2, _0x37ccf7, _0x34cd8a) {
    var _a2;
    const _0xf8a156 = this["appliedCompanionWidths"]["get"](_0x1ca489) ?? ((_a2 = this["appliedLayerStyles"]["get"](_0x1ca489)) == null ? void 0 : _a2["outline"]["width"]), _0x2a32b1 = this["getCurrentTime"](), _0x2ee6eb = this["resolveStyleRange"](_0x2ccfb2, _0x2a32b1, _0x34cd8a["fill"]), _0x2bd786 = [], _0x259fd2 = /* @__PURE__ */ new Map();
    _0x2ccfb2["entities"]["suspendEvents"]();
    for (const _0xb1bfa0 of _0x2ccfb2["entities"]["values"]) {
      if (this["outlineGeometry"]["isOutlineCompanion"](_0xb1bfa0)) {
        _0x2bd786["push"](_0xb1bfa0);
        continue;
      }
      const _0x2ed847 = this["resolveFillColor"](_0xb1bfa0, _0x34cd8a["fill"], _0x2ee6eb, _0x2a32b1);
      if (_0xb1bfa0["polygon"] !== void 0 && _0x2ed847 !== void 0) _0x259fd2["set"](_0xb1bfa0["id"], _0x2ed847);
      this["applyEntityStyle"](_0xb1bfa0, _0x2ed847, _0x34cd8a["outline"], _0x37ccf7);
    }
    const _0x420f7c = this["styleOutlineCompanions"](_0x2bd786, _0x34cd8a["outline"], _0x37ccf7, _0x259fd2);
    _0x2ccfb2["entities"]["resumeEvents"]();
    const _0x10f9e4 = _0x2ee6eb !== null && (_0x34cd8a["fill"]["mode"] === "gradient" || _0x34cd8a["fill"]["mode"] === "bin") ? { ..._0x34cd8a, "fill": { ..._0x34cd8a["fill"], "min": _0x2ee6eb["min"], "max": _0x2ee6eb["max"] } } : _0x34cd8a;
    this["appliedLayerStyles"]["set"](_0x1ca489, _0x10f9e4), this["requestRender"](), this["emitStyle"](_0x1ca489, _0x10f9e4), this["appliedCompanionWidths"]["set"](_0x1ca489, _0x420f7c);
    const _0x5122d5 = _0xf8a156 === void 0 || _0xf8a156 !== _0x420f7c;
    if (_0x5122d5) await this["waitForRenderSettle"]();
  }
  ["styleOutlineCompanions"](_0x4d0ccc, _0x45ec36, _0x484524, _0x34c279) {
    const _0x22ec1a = _0x45ec36["enabled"] ? Color["fromCssColorString"](_0x45ec36["color"]) : void 0, _0x3fb705 = _0x45ec36["enabled"] ? _0x45ec36["width"] : SEAM_COVER_WIDTH;
    for (const _0x318edc of _0x4d0ccc) {
      const _0x403538 = _0x45ec36["enabled"] || _0x484524 ? void 0 : _0x34c279["get"](LayerStyleEngine["outlineOwnerId"](_0x318edc)), _0x12f0d6 = _0x403538 !== void 0 && _0x403538["alpha"] >= 1;
      _0x318edc["show"] = _0x45ec36["enabled"] || _0x12f0d6;
      const _0x14b123 = _0x22ec1a ?? (_0x12f0d6 ? _0x403538 : void 0);
      _0x14b123 !== void 0 && _0x318edc["polyline"] !== void 0 && (_0x318edc["polyline"]["material"] = this["updateColorMaterial"](_0x318edc["polyline"]["material"], _0x14b123), _0x318edc["polyline"]["width"] = LayerStyleEngine["updateConstantProperty"](_0x318edc["polyline"]["width"], _0x3fb705));
    }
    return _0x3fb705;
  }
  static ["outlineOwnerId"](_0x3b2967) {
    return _0x3b2967["id"]["endsWith"](OUTLINE_ID_SUFFIX) ? _0x3b2967["id"]["slice"](0, -OUTLINE_ID_SUFFIX["length"]) : _0x3b2967["id"];
  }
  ["getStyle"](_0x28b887) {
    return this["appliedLayerStyles"]["get"](_0x28b887);
  }
  ["deleteStyle"](_0x32b7f5) {
    this["appliedLayerStyles"]["delete"](_0x32b7f5), this["appliedCompanionWidths"]["delete"](_0x32b7f5);
  }
  ["recordInitialStyle"](_0x46883e, _0x19c14, _0x243c65, _0x49b679) {
    const _0x22a871 = { "fill": { "mode": "solid", "color": _0x19c14, "opacity": _0x243c65 }, "outline": _0x49b679 };
    this["appliedLayerStyles"]["set"](_0x46883e, _0x22a871), this["emitStyle"](_0x46883e, _0x22a871);
  }
  ["randomLayerColor"]() {
    return Color["fromRandom"]({ "alpha": 1 });
  }
  ["applyEntityColor"](_0x31e3c5, _0x710c2c) {
    _0x31e3c5["entities"]["suspendEvents"]();
    for (const _0x19e506 of _0x31e3c5["entities"]["values"]) {
      _0x19e506["polygon"] !== void 0 && (_0x19e506["polygon"]["material"] = new ColorMaterialProperty(new ConstantProperty(_0x710c2c["withAlpha"](0.5)))), _0x19e506["polyline"] !== void 0 && (_0x19e506["polyline"]["material"] = new ColorMaterialProperty(new ConstantProperty(_0x710c2c))), _0x19e506["point"] !== void 0 && (_0x19e506["point"]["color"] = new ConstantProperty(_0x710c2c)), _0x19e506["billboard"] !== void 0 && (_0x19e506["billboard"]["color"] = new ConstantProperty(_0x710c2c));
    }
    _0x31e3c5["entities"]["resumeEvents"]();
  }
  ["convertMarkersToPoints"](_0x42e32f, _0x680bfd) {
    _0x42e32f["entities"]["suspendEvents"]();
    for (const _0x214361 of _0x42e32f["entities"]["values"]) {
      if (_0x214361["billboard"] === void 0) continue;
      const _0x521635 = _0x214361["billboard"]["heightReference"];
      _0x214361["point"] = new PointGraphics({ "pixelSize": 8, "color": _0x680bfd, ..._0x521635 !== void 0 ? { "heightReference": _0x521635 } : {} }), _0x214361["billboard"] = void 0;
    }
    _0x42e32f["entities"]["resumeEvents"]();
  }
  ["applyEntityStyle"](_0x32192f, _0x107d82, _0x261d6d, _0x6fcf17) {
    const _0x6ee3c5 = _0x261d6d["enabled"] ? Color["fromCssColorString"](_0x261d6d["color"]) : void 0;
    _0x32192f["polygon"] !== void 0 && (_0x32192f["polygon"]["material"] = this["updateColorMaterial"](_0x32192f["polygon"]["material"], _0x107d82 ?? Color["WHITE"]["withAlpha"](0)), !this["outlineGeometry"]["hasOutlineCompanion"](_0x32192f) && !this["outlineGeometry"]["hasRiskyOutline"](_0x32192f) && (_0x32192f["polygon"]["outline"] = LayerStyleEngine["updateConstantProperty"](_0x32192f["polygon"]["outline"], _0x261d6d["enabled"]), _0x6ee3c5 !== void 0 && (_0x32192f["polygon"]["outlineColor"] = LayerStyleEngine["updateConstantProperty"](_0x32192f["polygon"]["outlineColor"], _0x6ee3c5), _0x32192f["polygon"]["outlineWidth"] = LayerStyleEngine["updateConstantProperty"](_0x32192f["polygon"]["outlineWidth"], _0x261d6d["width"]))));
    if (_0x32192f["polyline"] !== void 0) {
      let _0x2d04d7;
      _0x6fcf17 ? _0x2d04d7 = _0x6ee3c5 ?? Color["WHITE"]["withAlpha"](0) : _0x2d04d7 = _0x261d6d["enabled"] ? _0x6ee3c5 : _0x107d82, _0x32192f["polyline"]["material"] = this["updateColorMaterial"](_0x32192f["polyline"]["material"], _0x2d04d7 ?? Color["WHITE"]["withAlpha"](0)), _0x261d6d["enabled"] && (_0x32192f["polyline"]["width"] = LayerStyleEngine["updateConstantProperty"](_0x32192f["polyline"]["width"], _0x261d6d["width"]));
    }
    _0x32192f["point"] !== void 0 && (_0x32192f["point"]["color"] = _0x107d82 !== void 0 ? this["updateColorProperty"](_0x32192f["point"]["color"], _0x107d82) : void 0, _0x261d6d["enabled"] && _0x6ee3c5 !== void 0 && (_0x32192f["point"]["outlineColor"] = LayerStyleEngine["updateConstantProperty"](_0x32192f["point"]["outlineColor"], _0x6ee3c5), _0x32192f["point"]["outlineWidth"] = LayerStyleEngine["updateConstantProperty"](_0x32192f["point"]["outlineWidth"], _0x261d6d["width"]))), _0x32192f["billboard"] !== void 0 && _0x107d82 !== void 0 && (_0x32192f["billboard"]["color"] = this["updateColorProperty"](_0x32192f["billboard"]["color"], _0x107d82));
  }
  ["resolveFillColor"](_0x1e510c, _0x197bdd, _0x147968, _0x1ef546) {
    switch (_0x197bdd["mode"]) {
      case "off":
        return void 0;
      case "solid":
        return Color["fromCssColorString"](_0x197bdd["color"])["withAlpha"](_0x197bdd["opacity"]);
      case "gradient": {
        if (_0x147968 === null) return void 0;
        const _0x39d7b4 = this["readNumericProperty"](_0x1e510c, _0x197bdd["column"], _0x1ef546);
        if (_0x39d7b4 === null) return void 0;
        if (_0x39d7b4 < _0x147968["min"] || _0x39d7b4 > _0x147968["max"]) return void 0;
        const _0x29e196 = _0x147968["max"] === _0x147968["min"] ? 0.5 : _0x248e3b["clamp"]((_0x39d7b4 - _0x147968["min"]) / (_0x147968["max"] - _0x147968["min"]), 0, 1);
        return LayerStyleEngine["sampleFromPalette"](_0x197bdd["palette"], _0x29e196, _0x197bdd["paletteKind"])["withAlpha"](_0x197bdd["opacity"]);
      }
      case "bin": {
        if (_0x147968 === null) return void 0;
        const _0x61a89d = this["readNumericProperty"](_0x1e510c, _0x197bdd["column"], _0x1ef546);
        if (_0x61a89d === null) return void 0;
        const _0x57cf07 = (_0x147968["max"] - _0x147968["min"]) / _0x197bdd["binCount"], _0x18ba43 = Array["from"]({ "length": _0x197bdd["binCount"] }, (_0xa464a6, _0x76a1cf) => _0x147968["min"] + _0x57cf07 * (_0x76a1cf + 1)), _0x45fea7 = LayerStyleEngine["pickBin"](_0x61a89d, _0x18ba43), _0x4d7c6d = _0x197bdd["binCount"] <= 1 ? 0.5 : _0x45fea7 / (_0x197bdd["binCount"] - 1);
        return LayerStyleEngine["sampleFromPalette"](_0x197bdd["palette"], _0x4d7c6d, _0x197bdd["paletteKind"])["withAlpha"](_0x197bdd["opacity"]);
      }
      case "enum": {
        const _0x355689 = this["readProperty"](_0x1e510c, _0x197bdd["column"], _0x1ef546);
        if (_0x355689 === null) return void 0;
        const _0x25e43e = _0x197bdd["colors"][String(_0x355689)];
        return _0x25e43e !== void 0 ? Color["fromCssColorString"](_0x25e43e)["withAlpha"](_0x197bdd["opacity"]) : Color["LIGHTGRAY"]["withAlpha"](_0x197bdd["opacity"]);
      }
    }
  }
  ["readProperty"](_0x50bbe0, _0x1ae19b, _0x5b344f) {
    const _0x273157 = _0x50bbe0["properties"];
    if (_0x273157 === void 0 || !_0x273157["hasProperty"](_0x1ae19b)) return null;
    const _0x41189f = _0x273157["getValue"](_0x5b344f), _0x315a46 = _0x41189f == null ? void 0 : _0x41189f[_0x1ae19b];
    if (_0x315a46 === void 0 || _0x315a46 === null) return null;
    return typeof _0x315a46 === "number" ? _0x315a46 : String(_0x315a46);
  }
  ["readNumericProperty"](_0x1a5984, _0x4cdbad, _0x35d7d9) {
    const _0x54e5fd = this["readProperty"](_0x1a5984, _0x4cdbad, _0x35d7d9);
    if (_0x54e5fd === null) return null;
    const _0x37a3c5 = typeof _0x54e5fd === "number" ? _0x54e5fd : Number(_0x54e5fd);
    return Number["isFinite"](_0x37a3c5) ? _0x37a3c5 : null;
  }
  ["resolveStyleRange"](_0x4bfad7, _0x1261bb, _0x4f2633) {
    if (_0x4f2633["mode"] !== "gradient" && _0x4f2633["mode"] !== "bin") return null;
    if (_0x4f2633["min"] !== void 0 && _0x4f2633["max"] !== void 0) return { "min": _0x4f2633["min"], "max": _0x4f2633["max"] };
    const _0x527dde = this["getColumnRange"](_0x4bfad7, _0x1261bb, _0x4f2633["column"]);
    if (_0x527dde === null) return null;
    return { "min": _0x4f2633["min"] ?? _0x527dde["min"], "max": _0x4f2633["max"] ?? _0x527dde["max"] };
  }
  ["getColumnRange"](_0x368a54, _0x3fb727, _0x46c2fb) {
    let _0x486a19 = Infinity, _0x3b79d3 = -Infinity;
    for (const _0x4196ae of _0x368a54["entities"]["values"]) {
      const _0x1366af = this["readNumericProperty"](_0x4196ae, _0x46c2fb, _0x3fb727);
      if (_0x1366af === null) continue;
      if (_0x1366af < _0x486a19) _0x486a19 = _0x1366af;
      if (_0x1366af > _0x3b79d3) _0x3b79d3 = _0x1366af;
    }
    return Number["isFinite"](_0x486a19) && Number["isFinite"](_0x3b79d3) ? { "min": _0x486a19, "max": _0x3b79d3 } : null;
  }
  static ["valueEquals"](_0x2ab933, _0x3d5e66) {
    if (_0x2ab933 instanceof Color || _0x3d5e66 instanceof Color) return _0x2ab933 instanceof Color && _0x3d5e66 instanceof Color && Color["equals"](_0x2ab933, _0x3d5e66);
    return _0x2ab933 === _0x3d5e66;
  }
  static ["updateConstantProperty"](_0x4d1491, _0x4e01c7) {
    if (_0x4d1491 instanceof ConstantProperty) return !LayerStyleEngine["valueEquals"](_0x4d1491["getValue"](), _0x4e01c7) && _0x4d1491["setValue"](_0x4e01c7), _0x4d1491;
    return new ConstantProperty(_0x4e01c7);
  }
  ["updateColorProperty"](_0x3afc6a, _0x158c7a) {
    const _0x2f93c6 = _0x3afc6a !== void 0 ? this["opacityController"]["getWrappedBaseColor"](_0x3afc6a) : void 0;
    if (_0x2f93c6 !== void 0) return Color["clone"](_0x158c7a, _0x2f93c6), _0x3afc6a;
    if (_0x3afc6a instanceof ConstantProperty) return !LayerStyleEngine["valueEquals"](_0x3afc6a["getValue"](), _0x158c7a) && _0x3afc6a["setValue"](_0x158c7a), _0x3afc6a;
    return new ConstantProperty(_0x158c7a);
  }
  ["updateColorMaterial"](_0x5bcdc3, _0x10d12f) {
    if (_0x5bcdc3 instanceof ColorMaterialProperty) return _0x5bcdc3["color"] = this["updateColorProperty"](_0x5bcdc3["color"], _0x10d12f), _0x5bcdc3;
    return new ColorMaterialProperty(this["updateColorProperty"](void 0, _0x10d12f));
  }
  static ["sampleFromPalette"](_0x56f56b, _0x5d477a, _0xc9d7b1) {
    return _0xc9d7b1 === "qualitative" ? LayerStyleEngine["sampleDiscrete"](_0x56f56b, _0x5d477a) : LayerStyleEngine["sampleGradient"](_0x56f56b, _0x5d477a);
  }
  static ["sampleGradient"](_0x2da59a, _0x3973ac) {
    if (_0x2da59a["length"] === 0) return Color["GRAY"];
    if (_0x2da59a["length"] === 1) return Color["fromCssColorString"](_0x2da59a[0]);
    const _0x461eb9 = _0x248e3b["clamp"](_0x3973ac, 0, 1) * (_0x2da59a["length"] - 1), _0x41e268 = Math["floor"](_0x461eb9), _0x1db850 = Math["min"](_0x2da59a["length"] - 1, _0x41e268 + 1), _0x45468e = _0x461eb9 - _0x41e268, _0x10f799 = Color["fromCssColorString"](_0x2da59a[_0x41e268]), _0xc94c45 = Color["fromCssColorString"](_0x2da59a[_0x1db850]);
    return Color["lerp"](_0x10f799, _0xc94c45, _0x45468e, new Color());
  }
  static ["sampleDiscrete"](_0x1896c3, _0x2f171a) {
    if (_0x1896c3["length"] === 0) return Color["GRAY"];
    const _0x536820 = Math["round"](_0x248e3b["clamp"](_0x2f171a, 0, 1) * (_0x1896c3["length"] - 1));
    return Color["fromCssColorString"](_0x1896c3[_0x536820]);
  }
  static ["pickBin"](_0x13920c, _0x5f11ed) {
    for (let _0x347aac = 0; _0x347aac < _0x5f11ed["length"]; _0x347aac++) {
      if (_0x13920c <= _0x5f11ed[_0x347aac]) return _0x347aac;
    }
    return _0x5f11ed["length"] - 1;
  }
}
function extractEpsgCode(_0x3b664c) {
  if (!/EPSG/i["test"](_0x3b664c)) return void 0;
  const _0x153663 = _0x3b664c["trim"]();
  let _0x4b1664 = _0x153663["length"];
  while (_0x4b1664 > 0 && _0x153663["charCodeAt"](_0x4b1664 - 1) >= 48 && _0x153663["charCodeAt"](_0x4b1664 - 1) <= 57) {
    _0x4b1664--;
  }
  const _0x4f5e55 = _0x153663["slice"](_0x4b1664);
  return _0x4f5e55["length"] > 0 ? _0x4f5e55 : void 0;
}
const proj4DefRequests = /* @__PURE__ */ new Map();
async function registerProj4Def(_0x50f8b0, _0x1fafdc) {
  const _0x5dcfd5 = "EPSG:" + _0x1fafdc;
  if (_0x50f8b0["defs"](_0x5dcfd5)) return !![];
  let _0x57de65 = proj4DefRequests["get"](_0x1fafdc);
  !_0x57de65 && (_0x57de65 = (async () => {
    try {
      const _0x5c0170 = await fetch("https://epsg.io/" + _0x1fafdc + ".proj4");
      if (!_0x5c0170["ok"]) return _0x5c0170["status"] === 404 ? "missing" : "transient-failure";
      const _0x132b21 = (await _0x5c0170["text"]())["trim"]();
      if (!_0x132b21) return "missing";
      return _0x50f8b0["defs"](_0x5dcfd5, _0x132b21), "registered";
    } catch {
      return "transient-failure";
    }
  })(), proj4DefRequests["set"](_0x1fafdc, _0x57de65));
  const _0xf2a900 = await _0x57de65;
  return _0xf2a900 === "transient-failure" && proj4DefRequests["get"](_0x1fafdc) === _0x57de65 && proj4DefRequests["delete"](_0x1fafdc), _0xf2a900 === "registered";
}
async function ensureProj4Def(_0x493bac) {
  let _0x5f00e5;
  try {
    ({ default: _0x5f00e5 } = await import("proj4"));
  } catch {
    return console["warn"]("[ogc/proj4Defs] EPSG:" + _0x493bac + ' icin koordinat donusumu atlandi -- "proj4" paketi yuklu degil (peer dependency olarak eklenmemis). Bu EPSG kodunu kullanan WCS katmanlari yanlis/genis bir alanda gorunebilir.'), void 0;
  }
  if (!await registerProj4Def(_0x5f00e5, _0x493bac)) return console["warn"]("[ogc/proj4Defs] EPSG:" + _0x493bac + " icin proj4 tanimi epsg.io'dan alinamadi (agsizlik veya gecersiz/desteklenmeyen kod olabilir). Bu EPSG kodunu kullanan WCS katmanlari yanlis/genis bir alanda gorunebilir."), void 0;
  return _0x5f00e5;
}
const CESIUM_BUILTIN_CRS_NAMES = /* @__PURE__ */ new Set(["urn:ogc:def:crs:OGC:1.3:CRS84", "EPSG:4326", "urn:ogc:def:crs:EPSG::4326"]);
function defaultCrsFunction(_0x677d46) {
  return Cartesian3["fromDegrees"](_0x677d46[0], _0x677d46[1], _0x677d46[2]);
}
function numericCodeString(_0x4a1c9d) {
  if (_0x4a1c9d === void 0) return void 0;
  const _0x297021 = String(_0x4a1c9d)["trim"]();
  return /^\d+$/["test"](_0x297021) ? _0x297021 : void 0;
}
function isSuspiciousCrsResult(_0x2a461d) {
  return _0x2a461d !== null && _0x2a461d["kind"] !== "reprojected";
}
function firstCoordinatePair(_0x490fec) {
  let _0x33652d = _0x490fec;
  while (Array["isArray"](_0x33652d) && _0x33652d["length"] > 0 && Array["isArray"](_0x33652d[0])) {
    _0x33652d = _0x33652d[0];
  }
  if (Array["isArray"](_0x33652d) && _0x33652d["length"] >= 2 && typeof _0x33652d[0] === "number" && typeof _0x33652d[1] === "number") return [_0x33652d[0], _0x33652d[1]];
  return void 0;
}
function findFirstCoordinates(_0x3bebeb) {
  if (typeof _0x3bebeb !== "object" || _0x3bebeb === null) return void 0;
  const _0x452068 = _0x3bebeb;
  if (_0x452068["type"] === "FeatureCollection" && Array["isArray"](_0x452068["features"])) {
    for (const _0xd57809 of _0x452068["features"]) {
      const _0x39977a = findFirstCoordinates(_0xd57809);
      if (_0x39977a) return _0x39977a;
    }
    return void 0;
  }
  if (_0x452068["type"] === "Feature") return findFirstCoordinates(_0x452068["geometry"]);
  if (_0x452068["type"] === "GeometryCollection" && Array["isArray"](_0x452068["geometries"])) {
    for (const _0x1622f8 of _0x452068["geometries"]) {
      const _0x1c327a = findFirstCoordinates(_0x1622f8);
      if (_0x1c327a) return _0x1c327a;
    }
    return void 0;
  }
  if ("coordinates" in _0x452068) return firstCoordinatePair(_0x452068["coordinates"]);
  return void 0;
}
function resolveOrRejectUnresolvedCrs(_0x2ce370, _0x51dcb1, _0xa32b4f) {
  if (!_0xa32b4f) throw new GeometryError("CRS_UNRESOLVED_UNSUPPORTED", "Koordinat sistemi tanınamadı ve WGS84 ile uyumlu değil.");
  return GeoJsonDataSource["crsNames"][_0x2ce370] = defaultCrsFunction, { "kind": "suspicious-unresolved-crs", "crsName": _0x51dcb1 };
}
function acceptClaimedWgs84(_0x1b16ee, _0x273750, _0x464987) {
  if (!_0x273750) throw new GeometryError("CRS_CLAIMED_WGS84_INVALID", "Koordinatlar WGS84 ile uyumlu değil.");
  if (_0x464987) GeoJsonDataSource["crsNames"][_0x1b16ee] = defaultCrsFunction;
  return null;
}
function computeLooksLikeWgs84(_0x1988a7) {
  const _0x2dc7bb = findFirstCoordinates(_0x1988a7);
  return !_0x2dc7bb || Math["abs"](_0x2dc7bb[0]) <= 180 && Math["abs"](_0x2dc7bb[1]) <= 90;
}
function resolveCrsFieldOrThrow(_0x44ad41, _0x498da6) {
  const _0x166b3c = "crs" in _0x44ad41 ? _0x44ad41["crs"] : void 0;
  if (!_0x166b3c || typeof _0x166b3c !== "object") {
    if (!_0x498da6) throw new GeometryError("CRS_MISSING_UNSUPPORTED", "Bu dosyada geçerli koordinat sistemi (CRS) bilgisi yok.");
    return null;
  }
  return _0x166b3c;
}
async function ensureGeoJsonCrsSupport(_0x5f0a26) {
  var _a2, _b, _c;
  if (typeof _0x5f0a26 !== "object" || _0x5f0a26 === null) return null;
  const _0x49015d = computeLooksLikeWgs84(_0x5f0a26), _0x580640 = resolveCrsFieldOrThrow(_0x5f0a26, _0x49015d);
  if (!_0x580640) return null;
  const _0x411da8 = _0x580640["type"] === "EPSG", _0x5f438c = _0x411da8 ? "EPSG:" + ((_a2 = _0x580640["properties"]) == null ? void 0 : _a2["code"]) : (_b = _0x580640["properties"]) == null ? void 0 : _b["name"];
  if (!_0x5f438c || typeof _0x5f438c !== "string") return null;
  if (CESIUM_BUILTIN_CRS_NAMES["has"](_0x5f438c)) return acceptClaimedWgs84(_0x5f438c, _0x49015d, ![]);
  const _0x21fe62 = _0x411da8 ? numericCodeString((_c = _0x580640["properties"]) == null ? void 0 : _c["code"]) : extractEpsgCode(_0x5f438c);
  if (!_0x21fe62) return resolveOrRejectUnresolvedCrs(_0x5f438c, _0x5f438c, _0x49015d);
  if (_0x21fe62 === "4326") return acceptClaimedWgs84(_0x5f438c, _0x49015d, !![]);
  const _0x482606 = "EPSG:" + _0x21fe62;
  let _0x6aa825;
  try {
    ({ default: _0x6aa825 } = await import("proj4"));
  } catch {
    return resolveOrRejectUnresolvedCrs(_0x5f438c, _0x482606, _0x49015d);
  }
  if (!await registerProj4Def(_0x6aa825, _0x21fe62)) return resolveOrRejectUnresolvedCrs(_0x5f438c, _0x482606, _0x49015d);
  return GeoJsonDataSource["crsNames"][_0x5f438c] = (_0x308392) => {
    const [_0x36d77d, _0x4190a7] = _0x6aa825(_0x482606, "EPSG:4326", [_0x308392[0], _0x308392[1]]);
    return Cartesian3["fromDegrees"](_0x36d77d, _0x4190a7, _0x308392[2]);
  }, { "kind": "reprojected", "fromEpsg": _0x482606 };
}
class LocalSourceLoader {
  constructor(_0x295028, _0x472faf) {
    this["viewer"] = _0x295028, this["deps"] = _0x472faf;
  }
  async ["addLocalKmlGeoJson"](_0x3d6004, _0x1237ea) {
    let _0x200f20, _0x347a13, _0x35da59 = null;
    const _0x4ce99b = this["deps"]["styleEngine"]["randomLayerColor"]();
    let _0x4d9b2e = _0x1237ea["clampToGround"] ?? !![];
    if (_0x3d6004 === "GEOJSON") {
      const _0x4fd143 = _0x1237ea["data"] instanceof File ? JSON["parse"](await this["fileToText"](_0x1237ea["data"])) : _0x1237ea["data"];
      _0x35da59 = await ensureGeoJsonCrsSupport(_0x4fd143);
      if (isSuspiciousCrsResult(_0x35da59)) _0x4d9b2e = ![];
      _0x200f20 = await GeoJsonDataSource["load"](_0x4fd143, { "clampToGround": _0x4d9b2e, "fill": _0x4ce99b["withAlpha"](0.5), "stroke": _0x4ce99b, "strokeWidth": 2, "markerColor": _0x4ce99b }), this["deps"]["styleEngine"]["applyEntityColor"](_0x200f20, _0x4ce99b), this["deps"]["styleEngine"]["convertMarkersToPoints"](_0x200f20, _0x4ce99b);
      if (isSuspiciousCrsResult(_0x35da59)) this["deps"]["outlineGeometry"]["flattenSuspiciousGeometry"](_0x200f20);
    } else {
      let _0x2bbf39;
      _0x1237ea["data"] instanceof File ? (_0x347a13 = this["fileToBlobUrl"](_0x1237ea["data"]), _0x2bbf39 = _0x347a13) : _0x2bbf39 = _0x1237ea["data"], _0x200f20 = await KmlDataSource["load"](_0x2bbf39, { "camera": this["viewer"]["scene"]["camera"], "canvas": this["viewer"]["scene"]["canvas"], "clampToGround": _0x4d9b2e }), this["deps"]["styleEngine"]["applyEntityColor"](_0x200f20, _0x4ce99b);
    }
    this["deps"]["outlineGeometry"]["disableRiskyPolygonOutlines"](_0x200f20);
    _0x4d9b2e && this["deps"]["addPolygonOutlines"](_0x200f20, this["deps"]["defaultOutlineColor"], 2);
    await this["viewer"]["dataSources"]["add"](_0x200f20);
    _0x347a13 !== void 0 && URL["revokeObjectURL"](_0x347a13);
    const _0x433cbe = _0x4ce99b["toCssHexString"](), _0x70a099 = this["deps"]["register"](_0x1237ea["id"], _0x1237ea["title"], _0x3d6004, _0x200f20, ![], _0x433cbe);
    return this["deps"]["emitCrsCheckResult"](_0x70a099["id"], _0x35da59), this["deps"]["styleEngine"]["recordInitialStyle"](_0x70a099["id"], _0x433cbe, 0.5, { "enabled": !![], "color": this["deps"]["defaultOutlineColorHex"], "width": 2 }), await this["deps"]["waitForRenderSettle"](), _0x70a099;
  }
  async ["addShp"](_0x2d2ec4) {
    let _0x293011;
    try {
      ({ getShapefile: _0x293011 } = await import("shpjs"));
    } catch {
      throw new LayerOperationError("LAYER_SHP_PACKAGE_MISSING", 'SHP katmanı için "shpjs" paketi gereklidir: shpjs kütüphanesini import etmelisiniz');
    }
    const _0x293fc0 = _0x2d2ec4["data"] instanceof File ? await this["fileToArrayBuffer"](_0x2d2ec4["data"]) : _0x2d2ec4["data"], _0x25ccc2 = await _0x293011(_0x293fc0), _0x2fe644 = Array["isArray"](_0x25ccc2) ? { "type": "FeatureCollection", "features": _0x25ccc2["flatMap"]((_0x2b966a) => _0x2b966a["features"]) } : _0x25ccc2;
    return loadVectorGeoJsonLayer(this["viewer"], this["deps"], _0x2fe644, { "id": _0x2d2ec4["id"], "title": _0x2d2ec4["title"], "layerType": "SHP", "clampToGround": _0x2d2ec4["clampToGround"] ?? !![] });
  }
  async ["addCsv"](_0xecee70) {
    let _0x51c541;
    try {
      ({ default: _0x51c541 } = await import("papaparse"));
    } catch {
      throw new LayerOperationError("LAYER_CSV_PACKAGE_MISSING", 'CSV katmanı için "papaparse" paketi gereklidir: papaparse kütüphanesini import etmelisiniz');
    }
    const _0x18d785 = _0xecee70["data"] instanceof File ? await this["fileToText"](_0xecee70["data"]) : _0xecee70["data"], _0x328a75 = _0x51c541["parse"](_0x18d785, { "header": !![], "dynamicTyping": !![] }), _0x3a12bf = _0x328a75["data"], _0x4c7997 = _0x3a12bf["find"]((_0x45b32b) => _0x45b32b && Object["keys"](_0x45b32b)["length"] > 0), _0x2fdf5c = _0x4c7997 && this["detectLatLonKeys"](_0x4c7997);
    if (!_0x2fdf5c) throw new LayerOperationError("LAYER_CSV_LATLON_NOT_FOUND", "CSV içinde lat/lon sütunlarını bulamadım (ör: lat, lon).");
    const _0x4f60db = this["deps"]["styleEngine"]["randomLayerColor"](), _0x5e6143 = new CustomDataSource(_0xecee70["title"]);
    for (const _0x3b94fb of _0x3a12bf) {
      const _0x5b112e = Number(_0x3b94fb[_0x2fdf5c["lat"]]), _0x1cd3dd = Number(_0x3b94fb[_0x2fdf5c["lon"]]);
      Number["isFinite"](_0x5b112e) && Number["isFinite"](_0x1cd3dd) && _0x5e6143["entities"]["add"]({ "position": Cartesian3["fromDegrees"](_0x1cd3dd, _0x5b112e), "point": { "pixelSize": 6, "color": _0x4f60db }, "properties": _0x3b94fb });
    }
    await this["viewer"]["dataSources"]["add"](_0x5e6143);
    const _0x22c88c = _0x4f60db["toCssHexString"](), _0xcaee49 = this["deps"]["register"](_0xecee70["id"], _0xecee70["title"], "CSV", _0x5e6143, ![], _0x22c88c);
    return this["deps"]["styleEngine"]["recordInitialStyle"](_0xcaee49["id"], _0x22c88c, 1, { "enabled": ![], "color": _0x22c88c, "width": 0 }), _0xcaee49;
  }
  ["detectLatLonKeys"](_0x138577) {
    const _0x50303c = Object["keys"](_0x138577)["reduce"]((_0x4e0dcc, _0x527012) => {
      const _0x332068 = _0x527012["toLowerCase"]();
      if (!_0x4e0dcc["lat"] && /^(lat|latitude|y)$/["test"](_0x332068)) _0x4e0dcc["lat"] = _0x527012;
      if (!_0x4e0dcc["lon"] && /^(lon|lng|long|longitude|x)$/["test"](_0x332068)) _0x4e0dcc["lon"] = _0x527012;
      return _0x4e0dcc;
    }, { "lat": "", "lon": "" });
    return _0x50303c["lat"] && _0x50303c["lon"] ? _0x50303c : null;
  }
  async ["fileToText"](_0x2b85be) {
    return decodeTextBuffer(await _0x2b85be["arrayBuffer"]());
  }
  ["fileToBlobUrl"](_0x335cc3) {
    return URL["createObjectURL"](_0x335cc3);
  }
  ["fileToArrayBuffer"](_0x4de0d3) {
    return _0x4de0d3["arrayBuffer"]();
  }
}
async function loadVectorGeoJsonLayer(_0x1145f4, _0x44b410, _0x26ae83, _0x57d44a, _0x2d36ce) {
  const _0x213671 = await ensureGeoJsonCrsSupport(_0x26ae83), _0x1308e8 = _0x44b410["styleEngine"]["randomLayerColor"](), _0x33bcbb = isSuspiciousCrsResult(_0x213671) ? ![] : _0x57d44a["clampToGround"], _0x563ff9 = await GeoJsonDataSource["load"](_0x26ae83, { "clampToGround": _0x33bcbb, "fill": _0x1308e8["withAlpha"](0.5), "stroke": _0x1308e8, "strokeWidth": 2, "markerColor": _0x1308e8 });
  _0x44b410["styleEngine"]["applyEntityColor"](_0x563ff9, _0x1308e8), _0x44b410["styleEngine"]["convertMarkersToPoints"](_0x563ff9, _0x1308e8), _0x44b410["outlineGeometry"]["disableRiskyPolygonOutlines"](_0x563ff9);
  if (isSuspiciousCrsResult(_0x213671)) _0x44b410["outlineGeometry"]["flattenSuspiciousGeometry"](_0x563ff9);
  _0x33bcbb && _0x44b410["addPolygonOutlines"](_0x563ff9, _0x44b410["defaultOutlineColor"], 2);
  await _0x1145f4["dataSources"]["add"](_0x563ff9);
  const _0x927907 = _0x1308e8["toCssHexString"](), _0x541eaa = _0x44b410["register"](_0x57d44a["id"], _0x57d44a["title"], _0x57d44a["layerType"], _0x563ff9, ![], _0x927907);
  return _0x44b410["emitCrsCheckResult"](_0x541eaa["id"], _0x213671), _0x2d36ce == null ? void 0 : _0x2d36ce(_0x541eaa), _0x44b410["styleEngine"]["recordInitialStyle"](_0x541eaa["id"], _0x927907, 0.5, { "enabled": !![], "color": _0x44b410["defaultOutlineColorHex"], "width": 2 }), await _0x44b410["waitForRenderSettle"](), _0x541eaa;
}
function decodeTextBuffer(_0x3961ed) {
  try {
    return new TextDecoder("utf-8", { "fatal": !![] })["decode"](_0x3961ed);
  } catch {
    return new TextDecoder("windows-1254")["decode"](_0x3961ed);
  }
}
const els = (_0xd17cda, _0x56a38b) => Array["from"](_0xd17cda["getElementsByTagNameNS"]("*", _0x56a38b)), el = (_0x351a3d, _0x28a2f4) => els(_0x351a3d, _0x28a2f4)[0], txt = (_0xb171a9, _0x1b66bb) => {
  var _a2, _b;
  return (_b = (_a2 = el(_0xb171a9, _0x1b66bb)) == null ? void 0 : _a2["textContent"]) == null ? void 0 : _b["trim"]();
};
function buildWfsCapabilitiesUrl(_0x369ed8) {
  const _0x2eb47e = new URL(_0x369ed8, window["location"]["origin"]), _0x367aab = new URL("" + _0x2eb47e["origin"] + _0x2eb47e["pathname"]);
  for (const [_0x38d6f0, _0x1e3b53] of _0x2eb47e["searchParams"]["entries"]()) {
    const _0x2ce58c = _0x38d6f0["toLowerCase"]();
    (_0x2ce58c === "url" || _0x2ce58c === "tucbsapikey") && _0x367aab["searchParams"]["set"](_0x38d6f0, _0x1e3b53);
  }
  return _0x367aab["searchParams"]["set"]("service", "WFS"), _0x367aab["searchParams"]["set"]("request", "GetCapabilities"), _0x367aab["searchParams"]["set"]("acceptVersions", "2.0.0,1.1.0,1.0.0"), _0x367aab["toString"]();
}
function isOgcExceptionXml(_0xbad2e8) {
  const _0x1e3771 = _0xbad2e8["trimStart"]();
  return _0x1e3771["startsWith"]("<") && (_0x1e3771["includes"]("ExceptionReport") || _0x1e3771["includes"]("ServiceExceptionReport"));
}
function repairBareAmpersands(_0x573926) {
  return _0x573926["replace"](/&(?!(?:amp|lt|gt|quot|apos|#\d+|#x[\da-fA-F]+);)/gi, "&amp;");
}
async function fetchWfsCapabilities(_0x65b322, _0x32477a = {}) {
  const _0x67cdb7 = await fetch(buildWfsCapabilitiesUrl(_0x65b322), _0x32477a);
  if (!_0x67cdb7["ok"]) throw new OgcRequestError("OGC_CAPABILITIES_REQUEST_FAILED", "WFS GetCapabilities başarısız: " + _0x67cdb7["status"] + " " + _0x67cdb7["statusText"]);
  const _0x3c7e01 = await _0x67cdb7["text"]();
  if (isOgcExceptionXml(_0x3c7e01)) throw new OgcRequestError("OGC_CAPABILITIES_EXCEPTION", "WFS GetCapabilities OGC Exception döndü.");
  const _0x124e19 = repairBareAmpersands(_0x3c7e01), _0x136eba = new DOMParser()["parseFromString"](_0x124e19, "application/xml");
  if (_0x136eba["querySelector"]("parsererror")) throw new OgcRequestError("OGC_CAPABILITIES_PARSE_FAILED", "WFS GetCapabilities XML parse edilemedi.");
  const _0x158cfc = _0x136eba["documentElement"]["getAttribute"]("version") || "2.0.0", _0x46c4e0 = [];
  for (const _0x144e48 of els(_0x136eba, "FeatureType")) {
    const _0x39e90a = txt(_0x144e48, "Name") || "";
    if (!_0x39e90a) continue;
    const _0x15711b = els(_0x144e48, "OutputFormats")["flatMap"]((_0x16fb91) => els(_0x16fb91, "Format")["map"]((_0x1b9493) => {
      var _a2;
      return ((_a2 = _0x1b9493["textContent"]) == null ? void 0 : _a2["trim"]()) || "";
    })["filter"](Boolean)), _0x4c5693 = txt(_0x144e48, "Title"), _0x56027a = txt(_0x144e48, "DefaultCRS"), _0x2825a4 = txt(_0x144e48, "DefaultSRS");
    _0x46c4e0["push"]({ "name": _0x39e90a, ..._0x4c5693 ? { "title": _0x4c5693 } : {}, ..._0x56027a ? { "defaultCRS": _0x56027a } : {}, ..._0x2825a4 ? { "defaultSRS": _0x2825a4 } : {}, ..._0x15711b["length"] ? { "outputFormats": _0x15711b } : {} });
  }
  const _0x5be5a6 = el(_0x136eba, "OperationsMetadata");
  let _0x19980d = [];
  if (_0x5be5a6) {
    const _0x301f67 = els(_0x5be5a6, "Operation")["find"]((_0x514158) => (_0x514158["getAttribute"]("name") || "") === "GetFeature"), _0x13ec1a = els(_0x301f67 ?? _0x5be5a6, "Parameter")["find"]((_0xe38372) => (_0xe38372["getAttribute"]("name") || "")["toLowerCase"]() === "outputformat");
    _0x13ec1a && (_0x19980d = els(_0x13ec1a, "Value")["map"]((_0x35bdbf) => {
      var _a2;
      return ((_a2 = _0x35bdbf["textContent"]) == null ? void 0 : _a2["trim"]()) || "";
    })["filter"](Boolean));
  }
  if (!_0x19980d["length"]) {
    const _0x2ac6dd = /* @__PURE__ */ new Set();
    _0x19980d = _0x46c4e0["flatMap"]((_0x245229) => _0x245229["outputFormats"] || [])["filter"]((_0x4311f5) => !_0x2ac6dd["has"](_0x4311f5) && _0x2ac6dd["add"](_0x4311f5));
  }
  return { "version": _0x158cfc, "featureTypes": _0x46c4e0, "outputFormats": _0x19980d };
}
function normName(_0x486293) {
  return _0x486293["trim"]()["toLowerCase"]();
}
function localTypeName(_0x4de746) {
  const _0x12cf12 = _0x4de746["lastIndexOf"](":");
  return _0x12cf12 >= 0 ? _0x4de746["slice"](_0x12cf12 + 1) : _0x4de746;
}
function resolveWfsFeatureType(_0x304b29, _0x5738ca) {
  if (!_0x5738ca["length"]) throw new OgcRequestError("OGC_FEATURE_TYPE_NOT_FOUND", "WFS FeatureType bulunamadı.");
  const _0x30dc58 = _0x304b29 == null ? void 0 : _0x304b29["trim"]();
  if (_0x30dc58) {
    const _0x32cf91 = _0x5738ca["find"]((_0xdb7f78) => normName(_0xdb7f78["name"]) === normName(_0x30dc58));
    if (_0x32cf91) return _0x32cf91;
    const _0x57a926 = normName(localTypeName(_0x30dc58)), _0x248989 = _0x5738ca["find"]((_0x195286) => normName(localTypeName(_0x195286["name"])) === _0x57a926);
    if (_0x248989) return _0x248989;
  }
  return _0x5738ca[0];
}
function pickJsonOutput(_0xfebe22) {
  const _0x487f30 = ["application/geo+json", "application/json;subtype=geojson", "application/json", "geojson", "json", "esrigeojson", "geojson+gzip", "geojson+zip"], _0x1ddd44 = _0xfebe22["map"]((_0x30008e) => _0x30008e["toLowerCase"]()["replace"](/\s+/g, ""));
  for (const _0x31ee8e of _0x487f30) {
    const _0x3d6ea7 = _0x1ddd44["findIndex"]((_0x5c36b4) => _0x5c36b4 === _0x31ee8e || _0x5c36b4["includes"](_0x31ee8e));
    if (_0x3d6ea7 >= 0) return _0xfebe22[_0x3d6ea7] ?? null;
  }
  return null;
}
function buildWfsGetFeaturePlan(_0x270dae) {
  const _0x5520ac = resolveWfsFeatureType(_0x270dae["typeNameHint"], _0x270dae["caps"]["featureTypes"]), _0x14eb63 = _0x270dae["version"] || _0x270dae["caps"]["version"] || "2.0.0", _0xa58873 = _0x270dae["srsName"] || _0x5520ac["defaultCRS"] || _0x5520ac["defaultSRS"] || "EPSG:4326", _0x15406e = _0x270dae["outputFormat"] || pickJsonOutput(_0x5520ac["outputFormats"] || []) || pickJsonOutput(_0x270dae["caps"]["outputFormats"]), _0xb49a19 = _0x270dae["maxFeatures"] ?? 5e3;
  return { "version": _0x14eb63, "typeName": _0x5520ac["name"], "srsName": _0xa58873, "jsonOutputFormat": _0x15406e, "maxFeatures": _0xb49a19 };
}
function appendWfsGetFeatureParams(_0x53b6e1, _0x2379b7, _0x396095) {
  _0x53b6e1["set"]("service", "WFS"), _0x53b6e1["set"]("request", "GetFeature"), _0x53b6e1["set"]("version", _0x2379b7["version"]);
  const _0x293bab = _0x2379b7["version"]["startsWith"]("2.");
  _0x53b6e1["set"](_0x293bab ? "typeNames" : "typeName", _0x2379b7["typeName"]), _0x53b6e1["set"]("srsName", _0x2379b7["srsName"]);
  _0x396095 && _0x53b6e1["set"]("outputFormat", _0x396095);
  const _0x28b648 = _0x293bab ? "count" : "maxFeatures";
  _0x53b6e1["set"](_0x28b648, String(_0x2379b7["maxFeatures"]));
}
async function getCapabilities(_0x5520d8, _0x1fa60a, _0x274bc9) {
  const _0x190797 = _0x274bc9 == null ? void 0 : _0x274bc9["mergeApiKeyHeader"](_0x274bc9["buildAuthHeaders"](_0x1fa60a), _0x5520d8), _0x284084 = await fetch(_0x5520d8, _0x190797 ? { "headers": _0x190797 } : void 0);
  if (!_0x284084["ok"]) throw new OgcRequestError("OGC_CAPABILITIES_REQUEST_FAILED", "GetCapabilities isteği başarısız: " + _0x284084["status"] + " " + _0x284084["statusText"]);
  const _0x233a39 = await _0x284084["text"](), _0x430021 = new DOMParser()["parseFromString"](_0x233a39, "application/xml");
  if (_0x430021["getElementsByTagName"]("parsererror")["length"] > 0) throw new OgcRequestError("OGC_SERVICE_DISCOVERY_PARSE_FAILED", "GetCapabilities yanıtı XML olarak ayrıştırılamadı.");
  return _0x430021;
}
function parseWmsStyles(_0x1e427f, _0x5691bd) {
  var _a2, _b, _c, _d;
  const _0x4c8f62 = elementsByLocalName(_0x1e427f, "Layer")["find"]((_0x7fd509) => {
    var _a3, _b2;
    return ((_b2 = (_a3 = childByLocalName(_0x7fd509, "Name")) == null ? void 0 : _a3["textContent"]) == null ? void 0 : _b2["trim"]()) === _0x5691bd;
  });
  if (!_0x4c8f62) return [];
  const _0x2869a7 = [];
  for (const _0x4f30f5 of Array["from"](_0x4c8f62["children"])) {
    if (_0x4f30f5["localName"] !== "Style") continue;
    const _0xd3d1dd = (_b = (_a2 = childByLocalName(_0x4f30f5, "Name")) == null ? void 0 : _a2["textContent"]) == null ? void 0 : _b["trim"]();
    if (!_0xd3d1dd) continue;
    const _0xfa81a3 = ((_d = (_c = childByLocalName(_0x4f30f5, "Title")) == null ? void 0 : _c["textContent"]) == null ? void 0 : _d["trim"]()) ?? _0xd3d1dd;
    _0x2869a7["push"]({ "name": _0xd3d1dd, "title": _0xfa81a3 });
  }
  return _0x2869a7;
}
function parseWmtsStyles(_0x226719, _0x779087) {
  var _a2, _b, _c, _d, _e;
  const _0x4dcec2 = elementsByLocalName(_0x226719, "Layer")["find"]((_0x448519) => {
    var _a3, _b2;
    return ((_b2 = (_a3 = childByLocalName(_0x448519, "Identifier")) == null ? void 0 : _a3["textContent"]) == null ? void 0 : _b2["trim"]()) === _0x779087;
  });
  if (!_0x4dcec2) return [];
  const _0x45f1b7 = [];
  for (const _0x33d6f0 of Array["from"](_0x4dcec2["children"])) {
    if (_0x33d6f0["localName"] !== "Style") continue;
    const _0x24bed5 = (_b = (_a2 = childByLocalName(_0x33d6f0, "Identifier")) == null ? void 0 : _a2["textContent"]) == null ? void 0 : _b["trim"]();
    if (!_0x24bed5) continue;
    const _0x50f231 = ((_d = (_c = childByLocalName(_0x33d6f0, "Title")) == null ? void 0 : _c["textContent"]) == null ? void 0 : _d["trim"]()) ?? _0x24bed5, _0x2cb0c3 = ((_e = childByLocalName(_0x33d6f0, "LegendURL")) == null ? void 0 : _e["getAttribute"]("xlink:href")) ?? "", _0x238c6d = _0x33d6f0["getAttribute"]("isDefault") === "true";
    _0x45f1b7["push"]({ "name": _0x24bed5, "title": _0x50f231, "legendUrl": _0x2cb0c3, "isDefault": _0x238c6d });
  }
  return _0x45f1b7["sort"]((_0x3380fc, _0xf5417c) => Number(_0xf5417c["isDefault"]) - Number(_0x3380fc["isDefault"])), _0x45f1b7["map"]((_0x2dcfc3) => ({ "name": _0x2dcfc3["name"], "title": _0x2dcfc3["title"], "legendUrl": _0x2dcfc3["legendUrl"] }));
}
function buildCapabilitiesUrl(_0x47065c, _0x108f84, _0x2a3e4f) {
  const _0x1cc786 = new URL(_0x47065c);
  return _0x1cc786["searchParams"]["set"]("SERVICE", _0x108f84), _0x1cc786["searchParams"]["set"]("REQUEST", "GetCapabilities"), _0x1cc786["searchParams"]["set"]("VERSION", _0x2a3e4f), _0x1cc786["toString"]();
}
function elementsByLocalName(_0x5d0473, _0x3127e8) {
  return Array["from"](_0x5d0473["getElementsByTagNameNS"]("*", _0x3127e8));
}
function childByLocalName(_0x353035, _0x160a90) {
  return Array["from"](_0x353035["children"])["find"]((_0x497f68) => _0x497f68["localName"] === _0x160a90);
}
function parseWmsGeographicBoundingBox(_0x1b427f) {
  var _a2, _b, _c, _d;
  const _0x1a0cc1 = childByLocalName(_0x1b427f, "EX_GeographicBoundingBox");
  if (_0x1a0cc1) {
    const _0x39cc6d = (_a2 = childByLocalName(_0x1a0cc1, "westBoundLongitude")) == null ? void 0 : _a2["textContent"], _0x2ff91b = (_b = childByLocalName(_0x1a0cc1, "eastBoundLongitude")) == null ? void 0 : _b["textContent"], _0x32b48d = (_c = childByLocalName(_0x1a0cc1, "southBoundLatitude")) == null ? void 0 : _c["textContent"], _0x506531 = (_d = childByLocalName(_0x1a0cc1, "northBoundLatitude")) == null ? void 0 : _d["textContent"];
    if (_0x39cc6d && _0x2ff91b && _0x32b48d && _0x506531) {
      const _0x38bea2 = { "west": Number(_0x39cc6d), "south": Number(_0x32b48d), "east": Number(_0x2ff91b), "north": Number(_0x506531) };
      if (Object["values"](_0x38bea2)["every"](Number["isFinite"])) return _0x38bea2;
    }
  }
  const _0x52fbad = childByLocalName(_0x1b427f, "LatLonBoundingBox");
  if (_0x52fbad) {
    const _0x217840 = { "west": Number(_0x52fbad["getAttribute"]("minx")), "south": Number(_0x52fbad["getAttribute"]("miny")), "east": Number(_0x52fbad["getAttribute"]("maxx")), "north": Number(_0x52fbad["getAttribute"]("maxy")) };
    if (Object["values"](_0x217840)["every"](Number["isFinite"])) return _0x217840;
  }
  return void 0;
}
function parseWmsCapabilities(_0x7b28fe) {
  var _a2;
  const _0xbd2937 = [];
  for (const _0x4bc26f of elementsByLocalName(_0x7b28fe, "Layer")) {
    const _0x20ac9a = childByLocalName(_0x4bc26f, "Name");
    if (!(_0x20ac9a == null ? void 0 : _0x20ac9a["textContent"])) continue;
    const _0x47e944 = childByLocalName(_0x4bc26f, "Title"), _0x36b4b7 = parseWmsGeographicBoundingBox(_0x4bc26f);
    _0xbd2937["push"]({ "identifier": _0x20ac9a["textContent"]["trim"](), "title": ((_a2 = _0x47e944 == null ? void 0 : _0x47e944["textContent"]) == null ? void 0 : _a2["trim"]()) || _0x20ac9a["textContent"]["trim"](), ..._0x36b4b7 && { "geographicBoundingBox": _0x36b4b7 } });
  }
  return _0xbd2937;
}
function parseWmsTiffFormat(_0x287593) {
  const _0x41bcf0 = elementsByLocalName(_0x287593, "GetMap")[0];
  if (!_0x41bcf0) return void 0;
  const _0x377a30 = new Set(elementsByLocalName(_0x41bcf0, "Format")["map"]((_0x9f7e14) => {
    var _a2;
    return (_a2 = _0x9f7e14["textContent"]) == null ? void 0 : _a2["trim"]()["toLowerCase"]();
  })["filter"]((_0x4a3d00) => !!_0x4a3d00));
  if (_0x377a30["has"]("image/geotiff")) return "image/geotiff";
  if (_0x377a30["has"]("image/tiff")) return "image/tiff";
  return void 0;
}
function parseWcsTiffFormat(_0x1f7ac7) {
  const _0x57b7ea = new Set(elementsByLocalName(_0x1f7ac7, "formatSupported")["map"]((_0x46dde5) => {
    var _a2;
    return (_a2 = _0x46dde5["textContent"]) == null ? void 0 : _a2["trim"]()["toLowerCase"]();
  })["filter"]((_0x3de1dd) => !!_0x3de1dd));
  if (_0x57b7ea["has"]("image/geotiff")) return "image/geotiff";
  if (_0x57b7ea["has"]("image/tiff")) return "image/tiff";
  return void 0;
}
function parseWmtsCapabilities(_0x52aadf) {
  var _a2;
  const _0x326ccf = [];
  for (const _0x2fb63e of elementsByLocalName(_0x52aadf, "Layer")) {
    const _0x51662e = childByLocalName(_0x2fb63e, "Identifier");
    if (!(_0x51662e == null ? void 0 : _0x51662e["textContent"])) continue;
    const _0x39a129 = childByLocalName(_0x2fb63e, "Title"), _0x21110e = childByLocalName(_0x2fb63e, "TileMatrixSetLink"), _0x2a29a6 = _0x21110e ? childByLocalName(_0x21110e, "TileMatrixSet") : void 0;
    _0x326ccf["push"]({ "identifier": _0x51662e["textContent"]["trim"](), "title": ((_a2 = _0x39a129 == null ? void 0 : _0x39a129["textContent"]) == null ? void 0 : _a2["trim"]()) || _0x51662e["textContent"]["trim"](), ...(_0x2a29a6 == null ? void 0 : _0x2a29a6["textContent"]) && { "tileMatrixSetID": _0x2a29a6["textContent"]["trim"]() } });
  }
  return _0x326ccf;
}
function parseWfsCapabilities(_0x1944b9) {
  var _a2;
  const _0x57b67d = [];
  for (const _0x5c9d4b of elementsByLocalName(_0x1944b9, "FeatureType")) {
    const _0xa9f9c4 = childByLocalName(_0x5c9d4b, "Name");
    if (!(_0xa9f9c4 == null ? void 0 : _0xa9f9c4["textContent"])) continue;
    const _0x50d635 = childByLocalName(_0x5c9d4b, "Title");
    _0x57b67d["push"]({ "identifier": _0xa9f9c4["textContent"]["trim"](), "title": ((_a2 = _0x50d635 == null ? void 0 : _0x50d635["textContent"]) == null ? void 0 : _a2["trim"]()) || _0xa9f9c4["textContent"]["trim"]() });
  }
  return _0x57b67d;
}
function parseWcsCapabilities(_0x67b29d) {
  var _a2, _b;
  const _0x41a7df = [];
  for (const _0x5aa384 of elementsByLocalName(_0x67b29d, "CoverageSummary")) {
    const _0x42e6c9 = childByLocalName(_0x5aa384, "CoverageId") ?? childByLocalName(_0x5aa384, "Identifier");
    if (!(_0x42e6c9 == null ? void 0 : _0x42e6c9["textContent"])) continue;
    const _0x526684 = childByLocalName(_0x5aa384, "Title");
    _0x41a7df["push"]({ "identifier": _0x42e6c9["textContent"]["trim"](), "title": ((_a2 = _0x526684 == null ? void 0 : _0x526684["textContent"]) == null ? void 0 : _a2["trim"]()) || _0x42e6c9["textContent"]["trim"]() });
  }
  if (_0x41a7df["length"] > 0) return _0x41a7df;
  for (const _0x3406b6 of elementsByLocalName(_0x67b29d, "CoverageOfferingBrief")) {
    const _0x5bdb14 = childByLocalName(_0x3406b6, "name");
    if (!(_0x5bdb14 == null ? void 0 : _0x5bdb14["textContent"])) continue;
    const _0x3a9127 = childByLocalName(_0x3406b6, "label");
    _0x41a7df["push"]({ "identifier": _0x5bdb14["textContent"]["trim"](), "title": ((_b = _0x3a9127 == null ? void 0 : _0x3a9127["textContent"]) == null ? void 0 : _b["trim"]()) || _0x5bdb14["textContent"]["trim"]() });
  }
  return _0x41a7df;
}
async function parseWcsCoverageEnvelope(_0x3f0e20) {
  var _a2, _b, _c, _d;
  const _0x4dd72d = childByLocalName(_0x3f0e20, "boundedBy"), _0x7df604 = _0x4dd72d ? childByLocalName(_0x4dd72d, "Envelope") : void 0;
  if (!_0x7df604) return void 0;
  const _0x512aa5 = (_b = (_a2 = childByLocalName(_0x7df604, "lowerCorner")) == null ? void 0 : _a2["textContent"]) == null ? void 0 : _b["trim"](), _0x111721 = (_d = (_c = childByLocalName(_0x7df604, "upperCorner")) == null ? void 0 : _c["textContent"]) == null ? void 0 : _d["trim"]();
  if (!_0x512aa5 || !_0x111721) return void 0;
  const _0x1acdfe = _0x512aa5["split"](/\s+/)["map"](Number), _0x56d6b6 = _0x111721["split"](/\s+/)["map"](Number);
  if (_0x1acdfe["length"] < 2 || _0x56d6b6["length"] < 2) return void 0;
  if (![..._0x1acdfe, ..._0x56d6b6]["every"](Number["isFinite"])) return void 0;
  const _0x1de609 = (_0x7df604["getAttribute"]("axisLabels") ?? "")["trim"]()["toLowerCase"](), _0x211d2c = (_0x7df604["getAttribute"]("uomLabels") ?? "")["toLowerCase"]();
  if (_0x211d2c["includes"]("deg")) {
    const _0x289e27 = _0x1de609["startsWith"]("lat");
    return _0x289e27 ? { "south": _0x1acdfe[0], "west": _0x1acdfe[1], "north": _0x56d6b6[0], "east": _0x56d6b6[1] } : { "west": _0x1acdfe[0], "south": _0x1acdfe[1], "east": _0x56d6b6[0], "north": _0x56d6b6[1] };
  }
  const _0x545d76 = _0x7df604["getAttribute"]("srsName") ?? "";
  return resolveProjectedEnvelope(_0x545d76, _0x1de609, _0x1acdfe, _0x56d6b6);
}
async function resolveProjectedEnvelope(_0x124799, _0x4cb0c2, _0x80e488, _0x2582aa) {
  const _0x2ff345 = extractEpsgCode(_0x124799);
  if (!_0x2ff345) return void 0;
  const _0x440be0 = await ensureProj4Def(_0x2ff345);
  if (!_0x440be0) return void 0;
  try {
    const _0x5468f0 = _0x4cb0c2["startsWith"]("y") || _0x4cb0c2["startsWith"]("n"), _0x414926 = (_0x3253e5) => _0x5468f0 ? [_0x3253e5[1], _0x3253e5[0]] : [_0x3253e5[0], _0x3253e5[1]], [_0x2613c5, _0x3003b3] = _0x414926(_0x80e488), [_0x61a162, _0x231468] = _0x414926(_0x2582aa), _0x313fb9 = [[_0x2613c5, _0x3003b3], [_0x61a162, _0x231468], [_0x2613c5, _0x231468], [_0x61a162, _0x3003b3]], _0x53615e = "EPSG:" + _0x2ff345, _0x32f8aa = _0x313fb9["map"]((_0x317071) => _0x440be0(_0x53615e, "EPSG:4326", _0x317071)), _0x1fa01c = _0x32f8aa["map"]((_0x2f5a2f) => _0x2f5a2f[0]), _0x2a4a5f = _0x32f8aa["map"]((_0x1abb49) => _0x1abb49[1]), _0x110c4a = { "west": Math["min"](..._0x1fa01c), "east": Math["max"](..._0x1fa01c), "south": Math["min"](..._0x2a4a5f), "north": Math["max"](..._0x2a4a5f) };
    if (!Object["values"](_0x110c4a)["every"](Number["isFinite"])) return void 0;
    return _0x110c4a;
  } catch {
    return void 0;
  }
}
async function fetchWcsCoverageExtents(_0x4ec0c9, _0x560d52, _0x303ffb, _0x1b9ac2) {
  var _a2;
  const _0x1c7de4 = /* @__PURE__ */ new Map();
  if (_0x560d52["length"] === 0) return _0x1c7de4;
  try {
    const _0xd6b1f1 = new URL(_0x4ec0c9);
    _0xd6b1f1["searchParams"]["set"]("SERVICE", "WCS"), _0xd6b1f1["searchParams"]["set"]("VERSION", "2.0.1"), _0xd6b1f1["searchParams"]["set"]("REQUEST", "DescribeCoverage"), _0xd6b1f1["searchParams"]["set"]("COVERAGEID", _0x560d52["join"](","));
    const _0x2a4032 = await getCapabilities(_0xd6b1f1["toString"](), _0x303ffb, _0x1b9ac2);
    for (const _0x1e930e of elementsByLocalName(_0x2a4032, "CoverageDescription")) {
      const _0x7fcfe5 = childByLocalName(_0x1e930e, "CoverageId"), _0x36fe50 = (_a2 = _0x7fcfe5 == null ? void 0 : _0x7fcfe5["textContent"]) == null ? void 0 : _a2["trim"]();
      if (!_0x36fe50) continue;
      const _0x4262bc = await parseWcsCoverageEnvelope(_0x1e930e);
      if (_0x4262bc) _0x1c7de4["set"](_0x36fe50, _0x4262bc);
    }
  } catch {
  }
  return _0x1c7de4;
}
function wcsRectangleFor(_0x48fa4d) {
  const _0x3c6797 = _0x48fa4d["geographicBoundingBox"];
  if (!_0x3c6797) return void 0;
  return Rectangle["fromDegrees"](_0x3c6797["west"], _0x3c6797["south"], _0x3c6797["east"], _0x3c6797["north"]);
}
function parseCapabilities(_0x1da133, _0x3a5a5b) {
  switch (_0x1da133) {
    case "WMS":
      return parseWmsCapabilities(_0x3a5a5b);
    case "WMTS":
      return parseWmtsCapabilities(_0x3a5a5b);
    case "WFS":
      return parseWfsCapabilities(_0x3a5a5b);
    case "WCS":
      return parseWcsCapabilities(_0x3a5a5b);
    default:
      return [];
  }
}
function detectServiceType(_0x2ae588) {
  const _0x31e299 = _0x2ae588["documentElement"], _0x4c61de = _0x31e299["localName"], _0x197536 = _0x31e299["namespaceURI"] ?? "";
  if (_0x4c61de === "WMS_Capabilities" || _0x4c61de === "WMT_MS_Capabilities" || _0x197536["includes"]("/wms")) return "WMS";
  if (_0x4c61de === "WFS_Capabilities" || _0x197536["includes"]("/wfs")) return "WFS";
  if (_0x197536["includes"]("/wmts")) return "WMTS";
  if (_0x197536["includes"]("/wcs") || _0x4c61de === "WCS_Capabilities") return "WCS";
  return void 0;
}
const _OgcLayerFactory = class _OgcLayerFactory {
  constructor(_0x5e9cbe, _0x1e82cb) {
    this["viewer"] = _0x5e9cbe, this["deps"] = _0x1e82cb, this["serviceLayerOptions"] = /* @__PURE__ */ new Map();
  }
  ["getServiceOptions"](_0x22e4df) {
    return this["serviceLayerOptions"]["get"](_0x22e4df);
  }
  ["deleteServiceOptions"](_0x5b4221) {
    this["serviceLayerOptions"]["delete"](_0x5b4221);
  }
  ["buildWmsProvider"](_0x2de27a) {
    var _a2, _b;
    const _0x14c813 = this["deps"]["apiKeyPolicy"]["resolveOgcProxyUrl"]("wms", _0x2de27a["url"]), _0x568200 = (_a2 = _0x2de27a["layers"]) == null ? void 0 : _a2["trim"]();
    if (!_0x568200) throw new LayerOperationError("LAYER_WMS_LAYERS_EMPTY", "WMS katmani eklenemedi: layers (ogcLayerName) bos — id=" + _0x2de27a["id"]);
    const _0x23327e = this["deps"]["apiKeyPolicy"]["mergeApiKeyHeader"](this["deps"]["apiKeyPolicy"]["buildAuthHeaders"](_0x2de27a["authToken"]), _0x14c813), _0x1abf5a = _0x2de27a["version"] ?? "1.3.0", _0x56ec69 = new WebMapServiceImageryProvider({ "url": _0x23327e ? new Resource({ "url": _0x14c813, "headers": _0x23327e }) : _0x14c813, "layers": _0x568200, "parameters": { "service": "WMS", "version": _0x1abf5a, "request": "GetMap", "transparent": "true", "format": "image/png", ..._0x2de27a["parameters"] }, "getFeatureInfoParameters": { "version": _0x1abf5a, "styles": ((_b = _0x2de27a["parameters"]) == null ? void 0 : _b["styles"]) ?? "" }, "getFeatureInfoFormats": [new GetFeatureInfoFormat("json"), new GetFeatureInfoFormat("xml", "application/vnd.ogc.gml"), new GetFeatureInfoFormat("xml", "text/xml"), new GetFeatureInfoFormat("html")], ..._0x2de27a["rectangle"] !== void 0 && { "rectangle": _0x2de27a["rectangle"] }, ..._0x2de27a["minimumLevel"] !== void 0 && { "minimumLevel": _0x2de27a["minimumLevel"] }, ..._0x2de27a["maximumLevel"] !== void 0 && { "maximumLevel": _0x2de27a["maximumLevel"] }, ..._0x2de27a["tileWidth"] !== void 0 && { "tileWidth": _0x2de27a["tileWidth"] }, ..._0x2de27a["tileHeight"] !== void 0 && { "tileHeight": _0x2de27a["tileHeight"] } });
    return _0x56ec69;
  }
  ["addWMS"](_0x351756) {
    const _0x157418 = this["buildWmsProvider"](_0x351756), _0x45da3e = this["viewer"]["imageryLayers"]["addImageryProvider"](_0x157418), _0x446f7a = this["deps"]["register"](_0x351756["id"], _0x351756["title"], "WMS", _0x45da3e, ![]);
    return this["serviceLayerOptions"]["set"](_0x351756["id"], _0x351756), Promise["resolve"](_0x446f7a);
  }
  ["buildWmtsProvider"](_0x30195c) {
    const _0x4189ab = this["deps"]["apiKeyPolicy"]["resolveOgcProxyUrl"]("wmts", _0x30195c["url"]), _0x40ddf3 = this["deps"]["apiKeyPolicy"]["mergeApiKeyHeader"](this["deps"]["apiKeyPolicy"]["buildAuthHeaders"](_0x30195c["authToken"]), _0x4189ab);
    return new WebMapTileServiceImageryProvider({ "url": _0x40ddf3 ? new Resource({ "url": _0x4189ab, "headers": _0x40ddf3 }) : _0x4189ab, "layer": _0x30195c["layer"], "style": _0x30195c["style"] ?? "default", "tileMatrixSetID": _0x30195c["tileMatrixSetID"], "format": _0x30195c["format"] ?? "image/png", "tilingScheme": new WebMercatorTilingScheme(), ..._0x30195c["tileWidth"] !== void 0 && { "tileWidth": _0x30195c["tileWidth"] }, ..._0x30195c["tileHeight"] !== void 0 && { "tileHeight": _0x30195c["tileHeight"] }, ..._0x30195c["minimumLevel"] !== void 0 && { "minimumLevel": _0x30195c["minimumLevel"] }, ..._0x30195c["maximumLevel"] !== void 0 && { "maximumLevel": _0x30195c["maximumLevel"] }, ..._0x30195c["rectangle"] !== void 0 && { "rectangle": _0x30195c["rectangle"] } });
  }
  ["addWMTS"](_0x592fdb) {
    const _0x4c3984 = this["buildWmtsProvider"](_0x592fdb), _0x196e4b = this["viewer"]["imageryLayers"]["addImageryProvider"](_0x4c3984), _0x23f51a = this["deps"]["register"](_0x592fdb["id"], _0x592fdb["title"], "WMTS", _0x196e4b, ![]);
    return this["serviceLayerOptions"]["set"](_0x592fdb["id"], _0x592fdb), Promise["resolve"](_0x23f51a);
  }
  async ["getWmsAvailableStyles"](_0x2f109e) {
    const _0x681092 = this["requireServiceOptions"](_0x2f109e, "WMS"), _0x367e94 = _0x681092["version"] ?? "1.3.0", _0x43cc83 = await this["getCapabilitiesDocument"](_0x681092["url"], "WMS", _0x367e94, _0x681092["authToken"]);
    return parseWmsStyles(_0x43cc83, _0x681092["layers"])["map"]((_0x223c10) => ({ ..._0x223c10, "legendUrl": this["getWmsLegendGraphicUrl"](_0x2f109e, _0x223c10["name"]) }));
  }
  async ["setWmsStyle"](_0xcd3ea4, _0x53bc1f) {
    const _0x4fe548 = this["requireServiceOptions"](_0xcd3ea4, "WMS"), _0x447c05 = { ..._0x4fe548, "parameters": { ..._0x4fe548["parameters"], "STYLES": _0x53bc1f } };
    await this["rebuildImageryLayer"](_0xcd3ea4, () => this["buildWmsProvider"](_0x447c05)), this["serviceLayerOptions"]["set"](_0xcd3ea4, _0x447c05);
  }
  ["getWmsLegendGraphicUrl"](_0x1a24de, _0x58909d) {
    const _0x33e8e6 = this["requireServiceOptions"](_0x1a24de, "WMS"), _0xe7b552 = new URLSearchParams({ "service": "WMS", "version": _0x33e8e6["version"] ?? "1.3.0", "request": "GetLegendGraphic", "format": "image/png", "layer": _0x33e8e6["layers"], "sld_version": "1.1.0", ..._0x58909d !== void 0 && _0x58909d !== "" ? { "style": _0x58909d } : {} }), _0x52e884 = this["deps"]["apiKeyPolicy"]["resolveOgcProxyUrl"]("wms", _0x33e8e6["url"]);
    return this["deps"]["apiKeyPolicy"]["attachApiKeyToUrl"]("" + _0x52e884 + (_0x52e884["includes"]("?") ? "&" : "?") + _0xe7b552["toString"]());
  }
  async ["getWmtsAvailableStyles"](_0x46fd42) {
    const _0x52dc89 = this["requireServiceOptions"](_0x46fd42, "WMTS"), _0x10acb5 = await this["getCapabilitiesDocument"](_0x52dc89["url"], "WMTS", "1.0.0", _0x52dc89["authToken"]), _0x166059 = parseWmtsStyles(_0x10acb5, _0x52dc89["layer"]);
    return _0x166059["map"]((_0x22694b) => ({ ..._0x22694b, "legendUrl": this["deps"]["apiKeyPolicy"]["attachApiKeyToUrl"](_0x22694b["legendUrl"]) }));
  }
  async ["setWmtsStyle"](_0x3ac983, _0x1254da) {
    const _0x47f273 = this["requireServiceOptions"](_0x3ac983, "WMTS"), _0x596eba = { ..._0x47f273, "style": _0x1254da };
    await this["rebuildImageryLayer"](_0x3ac983, () => this["buildWmtsProvider"](_0x596eba)), this["serviceLayerOptions"]["set"](_0x3ac983, _0x596eba);
  }
  async ["addWFS"](_0x1e6eca) {
    const _0x13265d = this["deps"]["apiKeyPolicy"]["resolveOgcProxyUrl"]("wfs", _0x1e6eca["url"]), _0x566c6d = {};
    _0x1e6eca["authToken"] !== void 0 && (_0x566c6d["headers"] = { "Authorization": "Bearer " + _0x1e6eca["authToken"] });
    const _0x2736e5 = this["deps"]["apiKeyPolicy"]["mergeApiKeyHeader"](_0x566c6d["headers"], _0x13265d);
    if (_0x2736e5 !== void 0) _0x566c6d["headers"] = _0x2736e5;
    const _0x59d8a7 = { ..._0x1e6eca, "url": _0x13265d }, _0x44ba0e = await fetchWfsCapabilities(_0x13265d, _0x566c6d), _0x3ef755 = { "typeNameHint": _0x1e6eca["typeName"], "caps": _0x44ba0e };
    if (_0x1e6eca["version"] !== void 0) _0x3ef755["version"] = _0x1e6eca["version"];
    if (_0x1e6eca["srsName"] !== void 0) _0x3ef755["srsName"] = _0x1e6eca["srsName"];
    _0x1e6eca["outputFormat"] !== void 0 && (_0x3ef755["outputFormat"] = _0x1e6eca["outputFormat"]);
    _0x1e6eca["maxFeatures"] !== void 0 ? _0x3ef755["maxFeatures"] = _0x1e6eca["maxFeatures"] : _0x3ef755["maxFeatures"] = _OgcLayerFactory["TEMP_WFS_UNLIMITED_MAX_FEATURES"];
    const _0x589bc4 = buildWfsGetFeaturePlan(_0x3ef755);
    let _0x574222;
    try {
      _0x574222 = await this["fetchWfsGeoJson"](_0x59d8a7, _0x566c6d, _0x589bc4);
    } catch (_0x5b83ed) {
      try {
        _0x574222 = await this["fetchWfsGml"](_0x59d8a7, _0x566c6d, _0x589bc4);
      } catch (_0x1755bd) {
        _0x1755bd instanceof Error && (_0x1755bd["cause"] = _0x5b83ed);
        throw _0x1755bd;
      }
    }
    const _0x43946e = _0x574222 !== null && typeof _0x574222 === "object" ? _0x574222["features"] : void 0;
    return Array["isArray"](_0x43946e) ? _0x43946e["length"] : _0x589bc4["maxFeatures"], loadVectorGeoJsonLayer(this["viewer"], this["deps"], _0x574222, { "id": _0x1e6eca["id"], "title": _0x1e6eca["title"], "layerType": "WFS", "clampToGround": _0x1e6eca["clampToGround"] ?? ![] }, (_0x4e3539) => {
    });
  }
  async ["fetchWfsHitsCount"](_0x55f0b8, _0x5a4062, _0x12da9d) {
    if (!_0x12da9d["version"]["startsWith"]("2.") && !_0x12da9d["version"]["startsWith"]("1.1")) return void 0;
    const _0x37f239 = new URLSearchParams();
    appendWfsGetFeatureParams(_0x37f239, _0x12da9d), _0x37f239["delete"]("count"), _0x37f239["delete"]("maxFeatures"), _0x37f239["set"]("resultType", "hits");
    let _0x482b62;
    try {
      _0x482b62 = await fetch("" + _0x55f0b8["url"] + (_0x55f0b8["url"]["includes"]("?") ? "&" : "?") + _0x37f239["toString"](), _0x5a4062);
    } catch {
      return void 0;
    }
    if (!_0x482b62["ok"]) return void 0;
    const _0x47b2b3 = decodeTextBuffer(await _0x482b62["arrayBuffer"]());
    if (isOgcExceptionXml(_0x47b2b3)) return void 0;
    const _0x5d5a3d = _0x47b2b3["trimStart"]();
    if (_0x5d5a3d["startsWith"]("{")) try {
      const _0x5a4057 = JSON["parse"](_0x5d5a3d), _0x4200b2 = _0x5a4057["numberMatched"] ?? _0x5a4057["totalFeatures"];
      return typeof _0x4200b2 === "number" ? _0x4200b2 : void 0;
    } catch {
      return void 0;
    }
    try {
      const _0x277036 = new DOMParser()["parseFromString"](_0x47b2b3, "application/xml")["documentElement"], _0xba8cd9 = _0x277036["getAttribute"]("numberMatched") ?? _0x277036["getAttribute"]("numberOfFeatures") ?? _0x277036["getAttribute"]("numberReturned");
      if (!_0xba8cd9) return void 0;
      const _0x4a77f7 = Number(_0xba8cd9);
      return Number["isFinite"](_0x4a77f7) ? _0x4a77f7 : void 0;
    } catch {
      return void 0;
    }
  }
  async ["fetchWfsGeoJson"](_0x3fa5b1, _0x3d145d, _0x3f06a2) {
    const _0x1b806f = _0x3f06a2["jsonOutputFormat"];
    if (!_0x1b806f) throw new OgcRequestError("OGC_WFS_JSON_FORMAT_UNSUPPORTED", "WFS sunucusu JSON çıktı formatı ilan etmiyor.");
    const _0x16d856 = new URLSearchParams();
    appendWfsGetFeatureParams(_0x16d856, _0x3f06a2, _0x1b806f);
    const _0x218a9c = await fetch("" + _0x3fa5b1["url"] + (_0x3fa5b1["url"]["includes"]("?") ? "&" : "?") + _0x16d856["toString"](), _0x3d145d), _0x183bf3 = decodeTextBuffer(await _0x218a9c["arrayBuffer"]());
    if (!_0x218a9c["ok"] || isOgcExceptionXml(_0x183bf3) || !_0x183bf3["trimStart"]()["startsWith"]("{")) throw new OgcRequestError("OGC_WFS_GEOJSON_REQUEST_FAILED", "WFS GeoJSON isteği başarısız: " + _0x218a9c["status"] + " " + _0x218a9c["statusText"]);
    return JSON["parse"](_0x183bf3);
  }
  async ["fetchWfsGml"](_0x5f0d83, _0x34e5bd, _0x6ae37e) {
    const _0x1336e1 = new URLSearchParams();
    appendWfsGetFeatureParams(_0x1336e1, _0x6ae37e);
    const _0xc62018 = await fetch("" + _0x5f0d83["url"] + (_0x5f0d83["url"]["includes"]("?") ? "&" : "?") + _0x1336e1["toString"](), _0x34e5bd);
    if (!_0xc62018["ok"]) throw new OgcRequestError("OGC_WFS_REQUEST_FAILED", "WFS isteği başarısız: " + _0xc62018["status"] + " " + _0xc62018["statusText"]);
    const _0x44de9a = decodeTextBuffer(await _0xc62018["arrayBuffer"]());
    if (isOgcExceptionXml(_0x44de9a)) throw new OgcRequestError("OGC_WFS_EXCEPTION", "WFS GetFeature OGC Exception döndü.");
    let _0x24c1db, _0x1a8e1d;
    try {
      ({ default: _0x24c1db } = await import("ol/format/WFS.js")), { default: _0x1a8e1d } = await import("ol/format/GeoJSON.js");
    } catch {
      throw new OgcRequestError("OGC_WFS_OL_PACKAGE_MISSING", 'WFS sunucusu GeoJSON çıktısı desteklemiyor; GML yanıtını okumak için "ol" paketi gereklidir: pnpm add ol');
    }
    const _0xc51cc0 = new _0x24c1db({ "version": _0x6ae37e["version"] })["readFeatures"](_0x44de9a);
    return new _0x1a8e1d()["writeFeaturesObject"](_0xc51cc0, { "featureProjection": "EPSG:4326" });
  }
  async ["addWCS"](_0x16b6a4) {
    const _0x491ad2 = this["deps"]["apiKeyPolicy"]["resolveOgcProxyUrl"]("wcs", _0x16b6a4["url"]), _0x212ba8 = { "service": "WCS", "version": _0x16b6a4["version"] ?? "2.0.1", "request": "GetCoverage", "coverageId": _0x16b6a4["coverageId"], "format": _0x16b6a4["format"] ?? "image/png" }, _0x474330 = this["deps"]["apiKeyPolicy"]["mergeApiKeyHeader"](this["deps"]["apiKeyPolicy"]["buildAuthHeaders"](_0x16b6a4["authToken"]), _0x491ad2), _0xdba693 = _0x16b6a4["rectangle"] ?? Rectangle["fromDegrees"](-180, -90, 180, 90), _0x3761b9 = async (_0x279662) => {
      const _0x338af4 = { ..._0x212ba8 };
      if (_0x279662 !== void 0) _0x338af4["SCALESIZE"] = _0x279662;
      const _0x567b44 = _0x491ad2 + "?" + new URLSearchParams(_0x338af4)["toString"](), _0x19faff = await this["resolveWcsImageUrl"](_0x567b44, _0x474330);
      try {
        return await SingleTileImageryProvider["fromUrl"](_0x19faff, { "rectangle": _0xdba693 });
      } finally {
        if (_0x19faff["startsWith"]("blob:")) URL["revokeObjectURL"](_0x19faff);
      }
    }, _0x27339a = _0x16b6a4["maxSize"] ?? 2048, _0x9db1ca = _0x212ba8["version"]["startsWith"]("2.") && Number["isFinite"](_0x27339a);
    let _0x6fd177;
    if (!_0x9db1ca) _0x6fd177 = await _0x3761b9();
    else {
      const _0x522ae6 = "http://www.opengis.net/def/axis/OGC/1/i(" + _0x27339a + "),http://www.opengis.net/def/axis/OGC/1/j(" + _0x27339a + ")";
      try {
        _0x6fd177 = await _0x3761b9(_0x522ae6);
      } catch {
        _0x6fd177 = await _0x3761b9("x(" + _0x27339a + "),y(" + _0x27339a + ")");
      }
    }
    const _0x53eb96 = this["viewer"]["imageryLayers"]["addImageryProvider"](_0x6fd177);
    return this["serviceLayerOptions"]["set"](_0x16b6a4["id"], _0x16b6a4), this["deps"]["register"](_0x16b6a4["id"], _0x16b6a4["title"], "WCS", _0x53eb96, ![]);
  }
  async ["resolveWcsImageUrl"](_0x3ff6b5, _0x2ca749) {
    const _0x46b476 = await fetch(_0x3ff6b5, _0x2ca749 ? { "headers": _0x2ca749 } : void 0);
    if (!_0x46b476["ok"]) throw new OgcRequestError("OGC_WCS_REQUEST_FAILED", "WCS isteği başarısız: " + _0x46b476["status"] + " " + _0x46b476["statusText"]);
    const _0x24ad0a = _0x46b476["headers"]["get"]("content-type") ?? "", _0x34947f = await _0x46b476["arrayBuffer"](), _0x5a0054 = /boundary="?([^";]+)"?/i["exec"](_0x24ad0a);
    if (!_0x24ad0a["includes"]("multipart/") || !_0x5a0054) return URL["createObjectURL"](new Blob([_0x34947f], { "type": _0x24ad0a || "image/png" }));
    const _0x3e76b1 = extractMultipartImage(new Uint8Array(_0x34947f), _0x5a0054[1]), _0x56e380 = _0x3e76b1["bytes"]["buffer"]["slice"](_0x3e76b1["bytes"]["byteOffset"], _0x3e76b1["bytes"]["byteOffset"] + _0x3e76b1["bytes"]["byteLength"]);
    return URL["createObjectURL"](new Blob([_0x56e380], { "type": _0x3e76b1["mimeType"] }));
  }
  ["addGeoTiff"](_0x5f1d20) {
    throw new LayerOperationError("LAYER_GEOTIFF_UNSUPPORTED", "GeoTIFF katmanı bu Cesium sürümünde (≥1.143) henüz desteklenmiyor. GeoTiffImageryProvider mevcut değil. geotiff.js ile özel provider gereklidir.");
  }
  ["requireServiceOptions"](_0xc1528e, _0x1eac59) {
    const _0x3992ca = this["deps"]["requireLayer"](_0xc1528e);
    if (_0x3992ca["layerType"] !== _0x1eac59) throw new LayerOperationError("LAYER_TYPE_MISMATCH", "Katman " + _0x1eac59 + ' değil: "' + _0xc1528e + '" (' + _0x3992ca["layerType"] + ")");
    const _0x461fff = this["serviceLayerOptions"]["get"](_0xc1528e);
    if (_0x461fff === void 0) throw new LayerOperationError("LAYER_SERVICE_OPTIONS_NOT_FOUND", 'Katman için orijinal servis seçenekleri bulunamadı: "' + _0xc1528e + '"');
    return _0x461fff;
  }
  async ["rebuildImageryLayer"](_0x22f95e, _0x1a24bc) {
    const _0x51b2f8 = this["deps"]["requireLayer"](_0x22f95e);
    if (!(_0x51b2f8["cesiumObject"] instanceof ImageryLayer)) throw new LayerOperationError("LAYER_NOT_RASTER", 'Katman raster (ImageryLayer) değil: "' + _0x22f95e + '"');
    const _0x1d4f2a = _0x51b2f8["cesiumObject"], _0x378754 = this["viewer"]["imageryLayers"]["indexOf"](_0x1d4f2a), { show: _0x495337, alpha: _0x4facb3 } = _0x1d4f2a, _0x186a3b = _0x1a24bc(), _0x293fe2 = new ImageryLayer(_0x186a3b, { "show": _0x495337, "alpha": _0x4facb3 });
    this["viewer"]["imageryLayers"]["remove"](_0x1d4f2a, !![]), this["viewer"]["imageryLayers"]["add"](_0x293fe2, _0x378754), this["deps"]["setItem"](_0x22f95e, Object["freeze"]({ ..._0x51b2f8, "cesiumObject": _0x293fe2 }));
  }
  async ["getCapabilitiesDocument"](_0x4877f2, _0x5750d5, _0x3ade90, _0x44d2cd) {
    const _0x4a2e70 = this["deps"]["apiKeyPolicy"]["resolveOgcProxyUrl"](_0x5750d5["toLowerCase"](), _0x4877f2), _0x24cd7b = buildCapabilitiesUrl(_0x4a2e70, _0x5750d5, _0x3ade90);
    return getCapabilities(_0x24cd7b, _0x44d2cd, this["deps"]["apiKeyPolicy"]);
  }
  async ["getWcsCoverageExtents"](_0x46a863, _0x97cbca, _0x574064) {
    const _0x3548df = this["deps"]["apiKeyPolicy"]["resolveOgcProxyUrl"]("wcs", _0x46a863);
    return fetchWcsCoverageExtents(_0x3548df, _0x97cbca, _0x574064, this["deps"]["apiKeyPolicy"]);
  }
};
_OgcLayerFactory["TEMP_WFS_UNLIMITED_MAX_FEATURES"] = 1e6;
let OgcLayerFactory = _OgcLayerFactory;
class ShapeLayerBridge {
  constructor(_0x2f7b5b, _0x21fbea) {
    this["viewer"] = _0x2f7b5b, this["deps"] = _0x21fbea, this["drawnShapeCounters"] = /* @__PURE__ */ new Map();
  }
  ["deleteCounter"](_0x2f1dd2) {
    this["drawnShapeCounters"]["delete"](_0x2f1dd2);
  }
  async ["addDrawnShape"](_0x45015b, _0x2ee476, _0x3a39fc) {
    const _0x2e8749 = _0x3a39fc["entity"];
    this["viewer"]["entities"]["remove"](_0x2e8749);
    const _0x2f7f46 = (this["drawnShapeCounters"]["get"](_0x45015b) ?? 0) + 1;
    this["drawnShapeCounters"]["set"](_0x45015b, _0x2f7f46), _0x2e8749["properties"] = buildDrawnShapeProperties(_0x3a39fc, _0x2f7f46);
    const _0x7796be = this["deps"]["getItem"](_0x45015b), _0x512887 = _0x7796be && "entities" in _0x7796be["cesiumObject"] ? _0x7796be["cesiumObject"] : new CustomDataSource(_0x2ee476), _0x1426f3 = _0x7796be ? this["deps"]["getStyle"](_0x45015b) : void 0, _0x1d36b1 = (_0x1426f3 == null ? void 0 : _0x1426f3["fill"]["mode"]) === "solid" ? Color["fromCssColorString"](_0x1426f3["fill"]["color"])["withAlpha"](_0x1426f3["fill"]["opacity"]) : Color["CYAN"]["withAlpha"](0.4), _0x2c82a3 = (_0x1426f3 == null ? void 0 : _0x1426f3["outline"]) ?? { "enabled": !![], "color": this["deps"]["defaultOutlineColorHex"], "width": 1 };
    this["deps"]["applyEntityStyle"](_0x2e8749, _0x1d36b1, _0x2c82a3, !![]), _0x512887["entities"]["add"](_0x2e8749);
    _0x2e8749["polygon"] !== void 0 && this["deps"]["addPolygonOutlineCompanion"](_0x512887, _0x2e8749, Color["fromCssColorString"](_0x2c82a3["color"]), _0x2c82a3["width"], ![]);
    if (_0x7796be) return this["deps"]["tagEntities"](_0x512887, _0x45015b), _0x7796be;
    await this["viewer"]["dataSources"]["add"](_0x512887);
    const _0x40f39d = Color["CYAN"]["toCssHexString"](), _0x1bb31b = this["deps"]["register"](_0x45015b, _0x2ee476, "DRAWING", _0x512887, ![], _0x40f39d);
    return this["deps"]["recordInitialStyle"](_0x1bb31b["id"], _0x40f39d, 0.4, _0x2c82a3), _0x1bb31b;
  }
  async ["addMeasuredShape"](_0x1c1f0f, _0x2cfffa, _0x20120e) {
    const _0x12ebdb = _0x20120e["entity"];
    this["viewer"]["entities"]["remove"](_0x12ebdb);
    const _0x129a61 = (this["drawnShapeCounters"]["get"](_0x1c1f0f) ?? 0) + 1;
    this["drawnShapeCounters"]["set"](_0x1c1f0f, _0x129a61), _0x12ebdb["properties"] = buildMeasuredShapeProperties(_0x20120e, _0x129a61);
    const _0x44d5ee = this["deps"]["getItem"](_0x1c1f0f), _0x2a1899 = _0x44d5ee && "entities" in _0x44d5ee["cesiumObject"] ? _0x44d5ee["cesiumObject"] : new CustomDataSource(_0x2cfffa), _0x371771 = _0x44d5ee ? this["deps"]["getStyle"](_0x1c1f0f) : void 0, _0xe98eb6 = (_0x371771 == null ? void 0 : _0x371771["fill"]["mode"]) === "solid" ? Color["fromCssColorString"](_0x371771["fill"]["color"])["withAlpha"](_0x371771["fill"]["opacity"]) : Color["CYAN"]["withAlpha"](0.4), _0x57b806 = (_0x371771 == null ? void 0 : _0x371771["outline"]) ?? { "enabled": !![], "color": this["deps"]["defaultOutlineColorHex"], "width": 1 };
    this["deps"]["applyEntityStyle"](_0x12ebdb, _0xe98eb6, _0x57b806, !![]), _0x2a1899["entities"]["add"](_0x12ebdb);
    _0x12ebdb["polygon"] !== void 0 && this["deps"]["addPolygonOutlineCompanion"](_0x2a1899, _0x12ebdb, Color["fromCssColorString"](_0x57b806["color"]), _0x57b806["width"], ![]);
    if (_0x44d5ee) return this["deps"]["tagEntities"](_0x2a1899, _0x1c1f0f), _0x44d5ee;
    await this["viewer"]["dataSources"]["add"](_0x2a1899);
    const _0x2299a7 = Color["CYAN"]["toCssHexString"](), _0x2939cd = this["deps"]["register"](_0x1c1f0f, _0x2cfffa, "MEASURE", _0x2a1899, ![], _0x2299a7);
    return this["deps"]["recordInitialStyle"](_0x2939cd["id"], _0x2299a7, 0.4, _0x57b806), _0x2939cd;
  }
  ["removeDrawnShape"](_0x15f875, _0x3b8015) {
    const _0x714b4e = this["deps"]["getItem"](_0x15f875);
    if (!_0x714b4e || !("entities" in _0x714b4e["cesiumObject"])) return;
    _0x714b4e["cesiumObject"]["entities"]["removeById"](_0x3b8015["id"] + "::outline"), _0x714b4e["cesiumObject"]["entities"]["remove"](_0x3b8015), _0x714b4e["cesiumObject"]["entities"]["values"]["length"] === 0 && this["deps"]["removeLayer"](_0x15f875);
  }
}
const DRAWN_SHAPE_LABELS = { "point": "Nokta", "polyline": "Çizgi", "polygon": "Alan", "rectangle": "Dikdörtgen", "circle": "Daire", "freehand": "Serbest Çizim" };
function roundMeters(_0x1726ff) {
  return Math["round"](_0x1726ff * 100) / 100;
}
function roundCoordinate(_0x119945) {
  return Math["round"](_0x119945 * 1e6) / 1e6;
}
function wktCoordinatePair(_0x193e2f) {
  return roundCoordinate(_0x193e2f[0]) + " " + roundCoordinate(_0x193e2f[1]);
}
function geometryToWkt(_0x4a1fb1) {
  switch (_0x4a1fb1["type"]) {
    case "Point": {
      const _0x30d94a = _0x4a1fb1["coordinates"];
      return "POINT (" + wktCoordinatePair(_0x30d94a) + ")";
    }
    case "LineString": {
      const _0x15835c = _0x4a1fb1["coordinates"];
      return "LINESTRING (" + _0x15835c["map"]((_0x429eb3) => wktCoordinatePair(_0x429eb3))["join"](", ") + ")";
    }
    case "Polygon": {
      const _0x225926 = _0x4a1fb1["coordinates"], _0x38f832 = _0x225926["map"]((_0x3d85d1) => "(" + _0x3d85d1["map"]((_0x33fa15) => wktCoordinatePair(_0x33fa15))["join"](", ") + ")")["join"](", ");
      return "POLYGON (" + _0x38f832 + ")";
    }
    default:
      return "";
  }
}
function buildDrawnShapeProperties(_0x165a53, _0x281e72) {
  const _0xb49535 = { "id": _0x281e72, "sekil": DRAWN_SHAPE_LABELS[_0x165a53["tool"]] };
  if (_0x165a53["length"] !== void 0) _0xb49535["uzunluk_m"] = roundMeters(_0x165a53["length"]);
  if (_0x165a53["area"] !== void 0) _0xb49535["alan_m2"] = roundMeters(_0x165a53["area"]);
  if (_0x165a53["perimeter"] !== void 0) _0xb49535["cevre_m"] = roundMeters(_0x165a53["perimeter"]);
  if (_0x165a53["radius"] !== void 0) _0xb49535["yaricap_m"] = roundMeters(_0x165a53["radius"]);
  return _0xb49535["olusturma_tarihi"] = new Date(_0x165a53["createdAt"])["toLocaleString"]("tr-TR"), _0xb49535["geomwkt"] = geometryToWkt(_0x165a53["geometry"]), new PropertyBag(_0xb49535);
}
const MEASURED_SHAPE_LABELS = { "point": "Nokta", "polyline": "Mesafe", "polygon": "Alan", "rectangle": "Dikdörtgen", "circle": "Daire", "freehand": "Serbest Çizim" };
function buildMeasuredShapeProperties(_0x1a053b, _0x3f5efa) {
  const _0x934dba = { "id": _0x3f5efa, "olcum_turu": MEASURED_SHAPE_LABELS[_0x1a053b["tool"]] };
  if (_0x1a053b["length"] !== void 0) _0x934dba["uzunluk_m"] = roundMeters(_0x1a053b["length"]);
  if (_0x1a053b["area"] !== void 0) _0x934dba["alan_m2"] = roundMeters(_0x1a053b["area"]);
  if (_0x1a053b["perimeter"] !== void 0) _0x934dba["cevre_m"] = roundMeters(_0x1a053b["perimeter"]);
  return _0x934dba["olusturma_tarihi"] = new Date(_0x1a053b["createdAt"])["toLocaleString"]("tr-TR"), _0x934dba["geomwkt"] = geometryToWkt(_0x1a053b["geometry"]), new PropertyBag(_0x934dba);
}
const _LayerManager = class _LayerManager extends EventEmitter {
  constructor(_0x4356cf) {
    super(), this["items"] = /* @__PURE__ */ new Map(), this["analysisResultIds"] = /* @__PURE__ */ new Set(), this["viewer"] = _0x4356cf, this["apiKeyPolicy"] = new ApiKeyPolicy({ "apiBase": () => getUcbpApiBase() }), this["outlineGeometry"] = new OutlineGeometry({ "getCurrentTime": () => this["viewer"]["clock"]["currentTime"] }), this["opacityController"] = new OpacityController({ "requestRender": () => this["viewer"]["scene"]["requestRender"]() }), this["styleEngine"] = new LayerStyleEngine({ "outlineGeometry": this["outlineGeometry"], "opacityController": this["opacityController"], "getCurrentTime": () => this["viewer"]["clock"]["currentTime"], "requestRender": () => this["viewer"]["scene"]["requestRender"](), "emitStyle": (_0x1fae35, _0x59df8c) => this["emit"]("layer:style", { "id": _0x1fae35, "style": _0x59df8c }), "waitForRenderSettle": () => this["waitForRenderSettle"]() }), this["localSourceLoader"] = new LocalSourceLoader(_0x4356cf, { "styleEngine": this["styleEngine"], "outlineGeometry": this["outlineGeometry"], "addPolygonOutlines": (_0x371f95, _0x191f6a, _0xf314cd) => this["addPolygonOutlines"](_0x371f95, _0x191f6a, _0xf314cd), "register": (_0xde0431, _0x2cf875, _0x2a726f, _0x524ae7, _0x24324f, _0x2976b5) => this["register"](_0xde0431, _0x2cf875, _0x2a726f, _0x524ae7, _0x24324f, _0x2976b5), "emitCrsCheckResult": (_0x38ae15, _0x26bd89) => this["emitCrsCheckResult"](_0x38ae15, _0x26bd89), "waitForRenderSettle": () => this["waitForRenderSettle"](), "defaultOutlineColor": _LayerManager["DEFAULT_OUTLINE_COLOR"], "defaultOutlineColorHex": _LayerManager["DEFAULT_OUTLINE_COLOR_HEX"] }), this["shapeLayerBridge"] = new ShapeLayerBridge(_0x4356cf, { "getItem": (_0x552465) => this["items"]["get"](_0x552465), "getStyle": (_0xe3d646) => this["styleEngine"]["getStyle"](_0xe3d646), "applyEntityStyle": (_0xdec9f9, _0x3f370f, _0x29d993, _0x47603a) => this["applyEntityStyle"](_0xdec9f9, _0x3f370f, _0x29d993, _0x47603a), "addPolygonOutlineCompanion": (_0x377207, _0x37a26b, _0x59c080, _0x2e9fda, _0x9f6acb) => this["addPolygonOutlineCompanion"](_0x377207, _0x37a26b, _0x59c080, _0x2e9fda, _0x9f6acb), "tagEntities": (_0x53be78, _0x501477) => this["tagEntities"](_0x53be78, _0x501477), "register": (_0x45c66a, _0x2a08d5, _0x11f3a7, _0x5f2d98, _0x2e4ce7, _0x48c401) => this["register"](_0x45c66a, _0x2a08d5, _0x11f3a7, _0x5f2d98, _0x2e4ce7, _0x48c401), "recordInitialStyle": (_0x1e77c8, _0x287d71, _0x52c2b5, _0x2f938d) => this["styleEngine"]["recordInitialStyle"](_0x1e77c8, _0x287d71, _0x52c2b5, _0x2f938d), "removeLayer": (_0x3b8465) => this["removeLayer"](_0x3b8465), "defaultOutlineColorHex": _LayerManager["DEFAULT_OUTLINE_COLOR_HEX"] }), this["ogcLayerFactory"] = new OgcLayerFactory(_0x4356cf, { "apiKeyPolicy": this["apiKeyPolicy"], "styleEngine": this["styleEngine"], "outlineGeometry": this["outlineGeometry"], "requireLayer": (_0x40ee60) => this["requireLayer"](_0x40ee60), "setItem": (_0x466e4e, _0x48b217) => this["items"]["set"](_0x466e4e, _0x48b217), "register": (_0x1cf917, _0x44ff4f, _0x30cb39, _0x2c41c9, _0x30d023, _0x1f5826) => this["register"](_0x1cf917, _0x44ff4f, _0x30cb39, _0x2c41c9, _0x30d023, _0x1f5826), "addPolygonOutlines": (_0x1a0c27, _0x203c36, _0x1a38d1) => this["addPolygonOutlines"](_0x1a0c27, _0x203c36, _0x1a38d1), "emitCrsCheckResult": (_0x1c5204, _0x48e059) => this["emitCrsCheckResult"](_0x1c5204, _0x48e059), "emitFeaturesTruncated": (_0x47fd9a, _0x44d092, _0x4cfa8f) => this["emit"]("layer:features-truncated", { "id": _0x47fd9a, "totalCount": _0x44d092, "loadedCount": _0x4cfa8f }), "waitForRenderSettle": () => this["waitForRenderSettle"](), "defaultOutlineColor": _LayerManager["DEFAULT_OUTLINE_COLOR"], "defaultOutlineColorHex": _LayerManager["DEFAULT_OUTLINE_COLOR_HEX"] }), this["cameraHighlight"] = new CameraHighlight(_0x4356cf, { "requireLayer": (_0x44050e) => this["requireLayer"](_0x44050e), "getLayerStyle": (_0x4ccedb) => this["getLayerStyle"](_0x4ccedb) });
  }
  ["configure"](_0x2bbc39) {
    this["apiKeyPolicy"]["configure"](_0x2bbc39), _0x2bbc39["apiKey"] !== void 0 && this["emit"]("apiKey:change", { "hasApiKey": !![] });
  }
  get ["hasApiKey"]() {
    return this["apiKeyPolicy"]["hasApiKey"];
  }
  async ["getAuthorizedLayers"]() {
    return this["apiKeyPolicy"]["getAuthorizedLayers"]();
  }
  async ["getLayerList"]() {
    return this["apiKeyPolicy"]["getLayerList"]();
  }
  ["canAddAuthorizedLayer"](_0x14fd31) {
    return this["apiKeyPolicy"]["canAddAuthorizedLayer"](_0x14fd31);
  }
  async ["addAuthorizedLayer"](_0x449e87) {
    const _0x58ca56 = this["apiKeyPolicy"]["resolveAddOptions"](_0x449e87);
    if (_0x58ca56["layerType"] === "WMS") return this["add"]("WMS", _0x58ca56["options"]);
    if (_0x58ca56["layerType"] === "WFS") return this["add"]("WFS", _0x58ca56["options"]);
    return this["add"]("WMTS", _0x58ca56["options"]);
  }
  ["layerRequiresApiKey"](_0x40628c) {
    return this["apiKeyPolicy"]["layerRequiresApiKey"](_0x40628c);
  }
  ["getLayers"]() {
    return Array["from"](this["items"]["values"]());
  }
  ["getLayerById"](_0x22826d) {
    return this["items"]["get"](_0x22826d);
  }
  ["getEntityPropertyNames"](_0x320e69) {
    const _0x44cc22 = this["requireLayer"](_0x320e69);
    if (!("entities" in _0x44cc22["cesiumObject"])) return [];
    const _0x21f84c = /* @__PURE__ */ new Set();
    for (const _0x2a4c13 of _0x44cc22["cesiumObject"]["entities"]["values"]) {
      const _0x59ac07 = _0x2a4c13["properties"];
      if (_0x59ac07 === void 0) continue;
      for (const _0x149654 of _0x59ac07["propertyNames"]) {
        if (_0x149654 === "layerId" || _0x149654 === "featureId") continue;
        _0x21f84c["add"](_0x149654);
      }
    }
    return Array["from"](_0x21f84c);
  }
  ["getUniqueColumnValues"](_0x5ba48d, _0x21e196) {
    const _0x1e4ef2 = this["requireLayer"](_0x5ba48d);
    if (!("entities" in _0x1e4ef2["cesiumObject"])) return [];
    const _0x5a1401 = this["viewer"]["clock"]["currentTime"], _0x5759a2 = /* @__PURE__ */ new Set();
    for (const _0xfe1a64 of _0x1e4ef2["cesiumObject"]["entities"]["values"]) {
      const _0x131792 = this["readProperty"](_0xfe1a64, _0x21e196, _0x5a1401);
      if (_0x131792 !== null) _0x5759a2["add"](_0x131792);
    }
    return Array["from"](_0x5759a2);
  }
  ["getFeatureCount"](_0x34f1bb) {
    const _0x160000 = this["requireLayer"](_0x34f1bb);
    if (!("entities" in _0x160000["cesiumObject"])) return void 0;
    let _0x355d71 = 0;
    for (const _0x1e3bf9 of _0x160000["cesiumObject"]["entities"]["values"]) {
      if (!this["isOutlineCompanion"](_0x1e3bf9)) _0x355d71++;
    }
    return _0x355d71;
  }
  ["getLayerGeoJSON"](_0xd7a56f) {
    return getLayerGeoJSON(this["requireLayer"](_0xd7a56f), this["viewer"]["clock"]["currentTime"], (_0x29ea25) => this["isOutlineCompanion"](_0x29ea25));
  }
  ["exportLayerGeoJSON"](_0xce3d39, _0x2ef1a2 = "katman") {
    exportLayerGeoJSON(this["getLayerGeoJSON"](_0xce3d39), _0x2ef1a2);
  }
  ["exportLayerKml"](_0x5677fc, _0x5a81b1 = "katman") {
    exportLayerKml(this["getLayerGeoJSON"](_0x5677fc), _0x5a81b1);
  }
  ["exportLayerShapefile"](_0x3e2212, _0x258e2d = "katman") {
    exportLayerShapefile(this["getLayerGeoJSON"](_0x3e2212), _0x258e2d);
  }
  ["markAnalysisResult"](_0x16e091) {
    this["analysisResultIds"]["add"](_0x16e091);
  }
  ["isAnalysisResult"](_0x46e75a) {
    return this["analysisResultIds"]["has"](_0x46e75a);
  }
  ["isGeoTiffExportAvailable"](_0x47eac5) {
    return isGeoTiffExportAvailable(this["items"]["get"](_0x47eac5), this["ogcLayerFactory"]["getServiceOptions"](_0x47eac5));
  }
  async ["exportLayerAsGeoTiff"](_0x4ee61f, _0x59869c = "katman") {
    const _0x14bda7 = this["requireLayer"](_0x4ee61f);
    await exportLayerAsGeoTiff(_0x14bda7, this["ogcLayerFactory"]["getServiceOptions"](_0x4ee61f), _0x59869c, (_0x28a748, _0x3dd3bc) => this["apiKeyPolicy"]["resolveOgcProxyUrl"](_0x28a748, _0x3dd3bc), { "mergeApiKeyHeader": (_0x3a0552, _0x39f812) => this["apiKeyPolicy"]["mergeApiKeyHeader"](_0x3a0552, _0x39f812), "buildAuthHeaders": (_0x238c41) => this["apiKeyPolicy"]["buildAuthHeaders"](_0x238c41) });
  }
  ["getColumnRange"](_0x4ca116, _0x64e24c) {
    const _0xba217f = this["requireLayer"](_0x4ca116);
    if (!("entities" in _0xba217f["cesiumObject"])) return null;
    return this["styleEngine"]["getColumnRange"](_0xba217f["cesiumObject"], this["viewer"]["clock"]["currentTime"], _0x64e24c);
  }
  async ["applyLayerStyle"](_0x31b39e, _0xf7275d) {
    const _0x245e3e = this["requireLayer"](_0x31b39e);
    if (!("entities" in _0x245e3e["cesiumObject"])) throw new LayerOperationError("LAYER_STYLE_NOT_VECTOR", 'applyLayerStyle sadece vektör (Entity tabanlı) katmanlarda kullanılabilir: "' + _0x31b39e + '"');
    await this["styleEngine"]["applyLayerStyle"](_0x31b39e, _0x245e3e["cesiumObject"], _0x245e3e["layerType"] === "DRAWING" || _0x245e3e["layerType"] === "MEASURE", _0xf7275d);
  }
  ["getLayerStyle"](_0x5d0c8a) {
    return this["styleEngine"]["getStyle"](_0x5d0c8a);
  }
  ["getInitialFillColor"](_0x590f3f) {
    var _a2;
    return (_a2 = this["items"]["get"](_0x590f3f)) == null ? void 0 : _a2["initialFillColor"];
  }
  ["getImageryLayers"]() {
    return Array["from"](this["items"]["values"]())["filter"]((_0x55c61b) => !_0x55c61b["isBasemap"] && _0x55c61b["cesiumObject"] instanceof ImageryLayer)["map"]((_0x50c52c) => _0x50c52c["cesiumObject"]);
  }
  ["getBasemapLayers"]() {
    return Array["from"](this["items"]["values"]())["filter"]((_0x2c4d5c) => _0x2c4d5c["isBasemap"] && _0x2c4d5c["cesiumObject"] instanceof ImageryLayer)["map"]((_0x2c1c04) => _0x2c1c04["cesiumObject"]);
  }
  ["getDataSourceLayers"]() {
    return this["viewer"]["dataSources"];
  }
  ["getLayerByType"](_0x546a03) {
    return Array["from"](this["items"]["values"]())["filter"]((_0x67ab81) => _0x67ab81["layerType"] === _0x546a03);
  }
  async ["zoomToLayer"](_0xca410c) {
    return this["cameraHighlight"]["zoomToLayer"](_0xca410c);
  }
  async ["zoomToEntity"](_0x2c261b, _0x116a70) {
    return this["cameraHighlight"]["zoomToEntity"](_0x2c261b, _0x116a70);
  }
  ["highlightEntity"](_0xb48c28) {
    this["cameraHighlight"]["highlightEntity"](_0xb48c28);
  }
  ["clearHighlight"]() {
    this["cameraHighlight"]["clearHighlight"]();
  }
  async ["add"](_0x5ab294, _0x1a4675) {
    this["assertUniqueId"](_0x1a4675["id"]);
    switch (_0x5ab294) {
      case "WMS":
        return this["addWMS"](_0x1a4675);
      case "WMTS":
        return this["addWMTS"](_0x1a4675);
      case "WFS":
        return this["addWFS"](_0x1a4675);
      case "WCS":
        return this["addWCS"](_0x1a4675);
      case "GEOTIFF":
        return this["addGeoTiff"](_0x1a4675);
      case "GEOJSON":
      case "KML":
      case "KMZ":
        return this["addLocalKmlGeoJson"](_0x5ab294, _0x1a4675);
      case "SHP":
        return this["addShp"](_0x1a4675);
      case "CSV":
        return this["addCsv"](_0x1a4675);
      case "XYZ":
        throw new LayerOperationError("LAYER_TYPE_UNSUPPORTED_XYZ", "XYZ katmanı add() ile desteklenmiyor. Map.setBasemap() kullanın.");
      case "DRAWING":
        throw new LayerOperationError("LAYER_TYPE_UNSUPPORTED_DRAWING", '"DRAWING" katmanı add() ile desteklenmiyor -- DrawingManager draw:complete olayı üzerinden Map tarafından otomatik eklenir.');
      case "MEASURE":
        throw new LayerOperationError("LAYER_TYPE_UNSUPPORTED_MEASURE", '"MEASURE" katmanı add() ile desteklenmiyor -- DrawingManager draw:complete olayı üzerinden Map tarafından otomatik eklenir.');
    }
  }
  ["setVisible"](_0x2170ac, _0x105722) {
    const _0x4a8ea4 = this["requireLayer"](_0x2170ac);
    _0x4a8ea4["cesiumObject"]["show"] = _0x105722, this["emit"]("layer:visibility", { "id": _0x2170ac, "visible": _0x105722 });
  }
  ["setOpacity"](_0x472b0d, _0x160e3f) {
    const _0x5c6cd2 = Math["max"](0, Math["min"](1, _0x160e3f)), _0x1185f1 = this["requireLayer"](_0x472b0d);
    _0x1185f1["cesiumObject"] instanceof ImageryLayer ? _0x1185f1["cesiumObject"]["alpha"] = _0x5c6cd2 : this["setDataSourceOpacity"](_0x1185f1["cesiumObject"], _0x5c6cd2), this["emit"]("layer:opacity", { "id": _0x472b0d, "opacity": _0x5c6cd2 });
  }
  ["_move"](_0x455cb0, _0x5d085a) {
    const _0xb47603 = this["requireLayer"](_0x455cb0), _0x2a88d0 = _0xb47603["cesiumObject"] instanceof ImageryLayer ? this["viewer"]["imageryLayers"] : this["viewer"]["dataSources"], _0x12c6d0 = _0x2a88d0["indexOf"](_0xb47603["cesiumObject"]);
    _0x2a88d0[_0x5d085a](_0xb47603["cesiumObject"]);
    const _0x1744d9 = _0x2a88d0["indexOf"](_0xb47603["cesiumObject"]);
    this["reindexLayerOrder"](), this["emit"]("layer:reorder", { "id": _0x455cb0, "oldIndex": _0x12c6d0, "newIndex": _0x1744d9, "layer": _0xb47603 });
  }
  ["raise"](_0x5ab565) {
    this["_move"](_0x5ab565, "raise");
  }
  ["lower"](_0x5da719) {
    this["_move"](_0x5da719, "lower");
  }
  ["raiseToTop"](_0x133910) {
    this["_move"](_0x133910, "raiseToTop");
  }
  ["lowerToBottom"](_0xcf223e) {
    this["_move"](_0xcf223e, "lowerToBottom");
  }
  ["reorder"](_0x20a868) {
    const _0x2b2a42 = _0x20a868[0], _0x29fd11 = _0x2b2a42 !== void 0 ? this["items"]["get"](_0x2b2a42) : void 0, _0x2314ac = (_0x29fd11 == null ? void 0 : _0x29fd11["cesiumObject"]) instanceof ImageryLayer, _0xfac8a8 = _0x29fd11 ? _0x2314ac ? this["viewer"]["imageryLayers"]["indexOf"](_0x29fd11["cesiumObject"]) : this["viewer"]["dataSources"]["indexOf"](_0x29fd11["cesiumObject"]) : -1, _0x5c802d = [], _0x194864 = [];
    for (const _0x237487 of _0x20a868) {
      const _0x586986 = this["items"]["get"](_0x237487);
      if (_0x586986 === void 0) continue;
      _0x586986["cesiumObject"] instanceof ImageryLayer ? _0x5c802d["push"](_0x237487) : _0x194864["push"](_0x237487);
    }
    for (let _0x5e17fb = _0x5c802d["length"] - 1; _0x5e17fb >= 0; _0x5e17fb--) {
      const _0x15a573 = this["items"]["get"](_0x5c802d[_0x5e17fb]);
      (_0x15a573 == null ? void 0 : _0x15a573["cesiumObject"]) instanceof ImageryLayer && this["viewer"]["imageryLayers"]["raiseToTop"](_0x15a573["cesiumObject"]);
    }
    for (let _0xa23b07 = _0x194864["length"] - 1; _0xa23b07 >= 0; _0xa23b07--) {
      const _0x488377 = this["items"]["get"](_0x194864[_0xa23b07]);
      _0x488377 !== void 0 && !(_0x488377["cesiumObject"] instanceof ImageryLayer) && this["viewer"]["dataSources"]["raiseToTop"](_0x488377["cesiumObject"]);
    }
    this["reindexLayerOrder"]();
    if (_0x29fd11 !== void 0 && _0x2b2a42 !== void 0) {
      const _0x20a49e = _0x2314ac ? this["viewer"]["imageryLayers"]["indexOf"](_0x29fd11["cesiumObject"]) : this["viewer"]["dataSources"]["indexOf"](_0x29fd11["cesiumObject"]);
      this["emit"]("layer:reorder", { "id": _0x2b2a42, "oldIndex": _0xfac8a8, "newIndex": _0x20a49e, "layer": _0x29fd11 });
    }
  }
  ["removeLayer"](_0x2af154) {
    const _0x2823b0 = this["requireLayer"](_0x2af154);
    _0x2823b0["cesiumObject"] instanceof ImageryLayer ? this["viewer"]["imageryLayers"]["remove"](_0x2823b0["cesiumObject"], !![]) : void this["viewer"]["dataSources"]["remove"](_0x2823b0["cesiumObject"], !![]), this["items"]["delete"](_0x2af154), this["analysisResultIds"]["delete"](_0x2af154), this["ogcLayerFactory"]["deleteServiceOptions"](_0x2af154), this["styleEngine"]["deleteStyle"](_0x2af154), this["shapeLayerBridge"]["deleteCounter"](_0x2af154), this["emit"]("layer:remove", { "layer": _0x2823b0 });
  }
  ["addWMS"](_0x517586) {
    return this["ogcLayerFactory"]["addWMS"](_0x517586);
  }
  ["addWMTS"](_0x5da05a) {
    return this["ogcLayerFactory"]["addWMTS"](_0x5da05a);
  }
  async ["getWmsAvailableStyles"](_0x5d64b0) {
    return this["ogcLayerFactory"]["getWmsAvailableStyles"](_0x5d64b0);
  }
  async ["setWmsStyle"](_0x157357, _0x4608a9) {
    return this["ogcLayerFactory"]["setWmsStyle"](_0x157357, _0x4608a9);
  }
  ["getWmsLegendGraphicUrl"](_0x31b242, _0x47f25c) {
    return this["ogcLayerFactory"]["getWmsLegendGraphicUrl"](_0x31b242, _0x47f25c);
  }
  async ["getWmtsAvailableStyles"](_0x44811a) {
    return this["ogcLayerFactory"]["getWmtsAvailableStyles"](_0x44811a);
  }
  async ["setWmtsStyle"](_0x465e00, _0x10924b) {
    return this["ogcLayerFactory"]["setWmtsStyle"](_0x465e00, _0x10924b);
  }
  ["addWFS"](_0x4c624e) {
    return this["ogcLayerFactory"]["addWFS"]({ ..._0x4c624e, "clampToGround": _0x4c624e["clampToGround"] ?? !![] });
  }
  ["addWCS"](_0x50c4fc) {
    return this["ogcLayerFactory"]["addWCS"](_0x50c4fc);
  }
  ["addGeoTiff"](_0xb56afa) {
    return this["ogcLayerFactory"]["addGeoTiff"](_0xb56afa);
  }
  ["addLocalKmlGeoJson"](_0x23e73b, _0x57f3b1) {
    return this["localSourceLoader"]["addLocalKmlGeoJson"](_0x23e73b, _0x57f3b1);
  }
  ["addShp"](_0x406d40) {
    return this["localSourceLoader"]["addShp"](_0x406d40);
  }
  ["addCsv"](_0x27f464) {
    return this["localSourceLoader"]["addCsv"](_0x27f464);
  }
  ["_addBasemapImageryLayer"](_0x301400, _0x1705ac, _0x2e79b4) {
    return this["register"](_0x301400, _0x1705ac, "XYZ", _0x2e79b4, !![]);
  }
  ["_removeBasemapLayers"]() {
    for (const _0x32d8a0 of this["items"]["values"]()) {
      _0x32d8a0["isBasemap"] && _0x32d8a0["cesiumObject"] instanceof ImageryLayer && (this["viewer"]["imageryLayers"]["remove"](_0x32d8a0["cesiumObject"], !![]), this["items"]["delete"](_0x32d8a0["id"]));
    }
  }
  ["_addDrawnShape"](_0x58805f, _0x1d2b9e, _0x11a1e3) {
    return this["shapeLayerBridge"]["addDrawnShape"](_0x58805f, _0x1d2b9e, _0x11a1e3);
  }
  ["_addMeasuredShape"](_0x24cc10, _0xb99159, _0xc7b612) {
    return this["shapeLayerBridge"]["addMeasuredShape"](_0x24cc10, _0xb99159, _0xc7b612);
  }
  ["_removeDrawnShape"](_0x125b2e, _0x2a8627) {
    this["shapeLayerBridge"]["removeDrawnShape"](_0x125b2e, _0x2a8627);
  }
  ["register"](_0x3d03a3, _0x5f01e3, _0x87a1c, _0x2cccf5, _0x18333c, _0x1a9f12) {
    "entities" in _0x2cccf5 && this["tagEntities"](_0x2cccf5, _0x3d03a3);
    const _0x2faed3 = Object["freeze"]({ "id": _0x3d03a3, "title": _0x5f01e3, "layerType": _0x87a1c, "cesiumObject": _0x2cccf5, "isBasemap": _0x18333c, ..._0x1a9f12 !== void 0 ? { "initialFillColor": _0x1a9f12 } : {} });
    return this["items"]["set"](_0x3d03a3, _0x2faed3), this["emit"]("layer:add", { "layer": _0x2faed3 }), _0x2faed3;
  }
  ["emitCrsCheckResult"](_0x5a62e6, _0xc26513) {
    if (!_0xc26513) return;
    switch (_0xc26513["kind"]) {
      case "reprojected":
        this["emit"]("layer:crs-reprojected", { "id": _0x5a62e6, "fromEpsg": _0xc26513["fromEpsg"], "toEpsg": "EPSG:4326" });
        break;
      case "suspicious-unresolved-crs":
        this["emit"]("layer:crs-unresolved", { "id": _0x5a62e6, "crsName": _0xc26513["crsName"] });
        break;
    }
  }
  ["tagEntities"](_0x3b4b6f, _0x5adefe) {
    _0x3b4b6f["entities"]["suspendEvents"]();
    for (const _0x35a8c4 of _0x3b4b6f["entities"]["values"]) {
      _0x35a8c4["properties"] === void 0 && (_0x35a8c4["properties"] = new PropertyBag()), !_0x35a8c4["properties"]["hasProperty"]("layerId") && _0x35a8c4["properties"]["addProperty"]("layerId", _0x5adefe), !_0x35a8c4["properties"]["hasProperty"]("featureId") && _0x35a8c4["properties"]["addProperty"]("featureId", _0x35a8c4["id"]);
    }
    _0x3b4b6f["entities"]["resumeEvents"]();
  }
  ["reindexLayerOrder"]() {
    const _0x40842c = /* @__PURE__ */ new Map();
    for (let _0x57c040 = 0; _0x57c040 < this["viewer"]["imageryLayers"]["length"]; _0x57c040++) {
      _0x40842c["set"](this["viewer"]["imageryLayers"]["get"](_0x57c040), _0x57c040);
    }
    const _0x595298 = /* @__PURE__ */ new Map();
    for (let _0x644806 = 0; _0x644806 < this["viewer"]["dataSources"]["length"]; _0x644806++) {
      _0x595298["set"](this["viewer"]["dataSources"]["get"](_0x644806), _0x644806);
    }
    const _0x13976f = (_0x56424a) => (_0x56424a["cesiumObject"] instanceof ImageryLayer ? _0x40842c["get"](_0x56424a["cesiumObject"]) : _0x595298["get"](_0x56424a["cesiumObject"])) ?? Number["POSITIVE_INFINITY"], _0x5d0b32 = Array["from"](this["items"]["entries"]()), _0x2ea77e = _0x5d0b32["filter"](([, _0x174d5b]) => _0x174d5b["cesiumObject"] instanceof ImageryLayer)["sort"](([, _0x3b2987], [, _0x29b1b1]) => _0x13976f(_0x3b2987) - _0x13976f(_0x29b1b1)), _0x40249e = _0x5d0b32["filter"](([, _0xb332a7]) => !(_0xb332a7["cesiumObject"] instanceof ImageryLayer))["sort"](([, _0x42f40d], [, _0x255b9d]) => _0x13976f(_0x42f40d) - _0x13976f(_0x255b9d));
    let _0x352936 = 0, _0x55994d = 0;
    const _0x375ff8 = _0x5d0b32["map"](([, _0x317fb4]) => _0x317fb4["cesiumObject"] instanceof ImageryLayer ? _0x2ea77e[_0x352936++] : _0x40249e[_0x55994d++]);
    this["items"]["clear"]();
    for (const [_0x3485ce, _0x2bde58] of _0x375ff8) this["items"]["set"](_0x3485ce, _0x2bde58);
  }
  ["requireLayer"](_0x44e2a9) {
    const _0x24355d = this["items"]["get"](_0x44e2a9);
    if (_0x24355d === void 0) throw new LayerOperationError("LAYER_NOT_FOUND", 'Katman bulunamadı: "' + _0x44e2a9 + '"');
    return _0x24355d;
  }
  ["assertUniqueId"](_0x3c9689) {
    if (this["items"]["has"](_0x3c9689)) throw new LayerOperationError("LAYER_ID_ALREADY_EXISTS", '"' + _0x3c9689 + `" id'li katman zaten eklenmiş.`);
  }
  async ["getCapabilitiesDocument"](_0x25e546, _0x358c43, _0x59515e, _0x486e05) {
    return this["ogcLayerFactory"]["getCapabilitiesDocument"](_0x25e546, _0x358c43, _0x59515e, _0x486e05);
  }
  async ["getWcsCoverageExtents"](_0x29f1c0, _0x101a82, _0x133d26) {
    return this["ogcLayerFactory"]["getWcsCoverageExtents"](_0x29f1c0, _0x101a82, _0x133d26);
  }
  ["waitForRenderSettle"](_0x369788 = 60) {
    return new Promise((_0x156d3e) => {
      let _0xeebe3a = _0x369788;
      const _0x4cd1ed = () => {
        _0xeebe3a -= 1, _0xeebe3a <= 0 && (this["viewer"]["scene"]["postRender"]["removeEventListener"](_0x4cd1ed), _0x156d3e());
      };
      this["viewer"]["scene"]["postRender"]["addEventListener"](_0x4cd1ed);
    });
  }
  ["isOutlineCompanion"](_0x3f1d5c) {
    return this["outlineGeometry"]["isOutlineCompanion"](_0x3f1d5c);
  }
  ["hasOutlineCompanion"](_0x539e5a) {
    return this["outlineGeometry"]["hasOutlineCompanion"](_0x539e5a);
  }
  ["hasRiskyOutline"](_0xc77f3a) {
    return this["outlineGeometry"]["hasRiskyOutline"](_0xc77f3a);
  }
  ["addPolygonOutlines"](_0x30a2c7, _0x5bfbb7, _0x2df4b0) {
    this["outlineGeometry"]["addPolygonOutlines"](_0x30a2c7, _0x5bfbb7, _0x2df4b0);
    for (const _0x1d28a3 of _0x30a2c7["entities"]["values"]) {
      this["outlineGeometry"]["hasOutlineCompanion"](_0x1d28a3) && this["opacityController"]["ensureDynamicFillColor"](_0x30a2c7, _0x1d28a3);
    }
  }
  ["addPolygonOutlineCompanion"](_0x3523d2, _0x3b57a8, _0x25b6d0, _0xf6603c, _0x1b4a15) {
    this["outlineGeometry"]["addPolygonOutlineCompanion"](_0x3523d2, _0x3b57a8, _0x25b6d0, _0xf6603c, _0x1b4a15), this["outlineGeometry"]["hasOutlineCompanion"](_0x3b57a8) && this["opacityController"]["ensureDynamicFillColor"](_0x3523d2, _0x3b57a8);
  }
  ["readProperty"](_0x74296e, _0x2cea16, _0x2fc7fe) {
    return this["styleEngine"]["readProperty"](_0x74296e, _0x2cea16, _0x2fc7fe);
  }
  ["applyEntityStyle"](_0x8d1a, _0x33fa5b, _0x1f7311, _0x568be6) {
    this["styleEngine"]["applyEntityStyle"](_0x8d1a, _0x33fa5b, _0x1f7311, _0x568be6);
  }
  ["setDataSourceOpacity"](_0x3f196f, _0x431905) {
    this["opacityController"]["setDataSourceOpacity"](_0x3f196f, _0x431905);
  }
  ["destroy"]() {
    this["removeAllListeners"](), this["items"]["clear"]();
  }
};
_LayerManager["DEFAULT_OUTLINE_COLOR_HEX"] = "#1a73e8";
_LayerManager["DEFAULT_OUTLINE_COLOR"] = Color["fromCssColorString"](_LayerManager["DEFAULT_OUTLINE_COLOR_HEX"]);
let LayerManager = _LayerManager;
const FLAG = "__tucbsSelectionHighlight";
function isSelectionHighlightEntity(_0x4792f4) {
  return _0x4792f4[FLAG] === !![];
}
class SelectionHighlight {
  constructor(_0x23e65c) {
    this["viewer"] = _0x23e65c, this["source"] = null, this["generation"] = 0;
  }
  ["show"](_0x46dda8) {
    const _0xeab5db = ++this["generation"];
    if (_0x46dda8["length"] === 0) {
      this["removeSource"]();
      return;
    }
    void this["load"](_0x46dda8, _0xeab5db);
  }
  ["clear"]() {
    this["generation"]++, this["removeSource"]();
  }
  async ["load"](_0x403735, _0x3812a4) {
    const _0x2a6c18 = Color["fromCssColorString"]("#dc2626")["withAlpha"](0.25), _0x4166ef = Color["fromCssColorString"]("#dc2626"), _0x164b19 = { "type": "FeatureCollection", "features": [..._0x403735] }, _0x41cc5c = await GeoJsonDataSource["load"](_0x164b19, { "clampToGround": !![], "fill": _0x2a6c18, "stroke": _0x4166ef, "strokeWidth": 3, "markerColor": _0x4166ef, "markerSize": 16 });
    if (_0x3812a4 !== this["generation"]) return;
    this["removeSource"](), this["paint"](_0x41cc5c, _0x2a6c18, _0x4166ef), this["viewer"]["dataSources"]["add"](_0x41cc5c), this["source"] = _0x41cc5c;
  }
  ["paint"](_0x45c685, _0x421ce3, _0x2a415f) {
    var _a2;
    for (const _0xb3ea02 of [..._0x45c685["entities"]["values"]]) {
      this["tag"](_0xb3ea02);
      _0xb3ea02["billboard"] && (_0xb3ea02["billboard"] = void 0, _0xb3ea02["point"] = new PointGraphics({ "pixelSize": 16, "color": _0x2a415f, "outlineColor": Color["WHITE"], "outlineWidth": 2, "heightReference": HeightReference["CLAMP_TO_GROUND"], "disableDepthTestDistance": Number["POSITIVE_INFINITY"] }));
      const _0x498a62 = _0xb3ea02["polygon"];
      if (!_0x498a62) continue;
      _0x498a62["material"] = new ColorMaterialProperty(_0x421ce3), _0x498a62["outline"] = new ConstantProperty(![]);
      const _0x56c396 = (_a2 = _0x498a62["hierarchy"]) == null ? void 0 : _a2["getValue"](JulianDate["now"]());
      this["addRings"](_0x45c685, _0x56c396, _0x2a415f);
    }
  }
  ["addRings"](_0x36df5e, _0x201cc4, _0x13b935) {
    var _a2;
    if (!((_a2 = _0x201cc4 == null ? void 0 : _0x201cc4["positions"]) == null ? void 0 : _a2["length"])) return;
    this["addRing"](_0x36df5e, _0x201cc4["positions"], _0x13b935);
    for (const _0x4c5c90 of _0x201cc4["holes"] ?? []) this["addRings"](_0x36df5e, _0x4c5c90, _0x13b935);
  }
  ["addRing"](_0x189b18, _0xc05749, _0x242d34) {
    const _0x1fa746 = _0x189b18["entities"]["add"]({ "polyline": { "positions": _0xc05749, "width": 3, "material": new ColorMaterialProperty(_0x242d34), "clampToGround": !![] } });
    this["tag"](_0x1fa746);
  }
  ["tag"](_0xb5e7fb) {
    _0xb5e7fb[FLAG] = !![];
  }
  ["removeSource"]() {
    if (!this["source"]) return;
    this["viewer"]["dataSources"]["remove"](this["source"], !![]), this["source"] = null;
  }
}
const DRILL_PICK_LIMIT = 32;
function boundingBoxFromPoints(_0x1da0d5) {
  if (_0x1da0d5["length"] === 0) return void 0;
  let _0x343c01 = Infinity, _0x45ba3e = Infinity, _0x1beef4 = -Infinity, _0x336aba = -Infinity;
  for (const [_0x4e2fb9, _0x615406] of _0x1da0d5) {
    if (_0x4e2fb9 < _0x343c01) _0x343c01 = _0x4e2fb9;
    if (_0x4e2fb9 > _0x1beef4) _0x1beef4 = _0x4e2fb9;
    if (_0x615406 < _0x45ba3e) _0x45ba3e = _0x615406;
    if (_0x615406 > _0x336aba) _0x336aba = _0x615406;
  }
  if (_0x343c01 === _0x1beef4 && _0x45ba3e === _0x336aba) return { "kind": "point", "longitude": _0x343c01, "latitude": _0x45ba3e };
  return { "kind": "extent", "west": _0x343c01, "south": _0x45ba3e, "east": _0x1beef4, "north": _0x336aba };
}
function flattenGeoJsonCoordinates(_0x4ed456, _0x51c95d) {
  if (!Array["isArray"](_0x4ed456) || _0x4ed456["length"] === 0) return;
  if (typeof _0x4ed456[0] === "number") {
    const [_0x30fd95, _0x2635a8] = _0x4ed456;
    if (typeof _0x30fd95 === "number" && typeof _0x2635a8 === "number") _0x51c95d["push"]([_0x30fd95, _0x2635a8]);
    return;
  }
  for (const _0x3fc133 of _0x4ed456) flattenGeoJsonCoordinates(_0x3fc133, _0x51c95d);
}
function extractGeoJsonExtent(_0x82903d) {
  if (_0x82903d === null || typeof _0x82903d !== "object") return void 0;
  const _0x5d0df7 = _0x82903d, _0x3e8999 = _0x5d0df7["type"] === "FeatureCollection" && Array["isArray"](_0x5d0df7["features"]) ? _0x5d0df7["features"]["map"]((_0x4101c7) => _0x4101c7 == null ? void 0 : _0x4101c7["geometry"])["filter"]((_0x114436) => _0x114436 !== void 0 && _0x114436 !== null) : _0x5d0df7["geometry"] ? [_0x5d0df7["geometry"]] : [];
  if (_0x3e8999["length"] === 0) return void 0;
  const _0x5e17cf = [];
  for (const _0x14b0fd of _0x3e8999) {
    const _0xfc963 = _0x14b0fd;
    if (_0xfc963["type"] === "GeometryCollection" && Array["isArray"](_0xfc963["geometries"])) for (const _0x50ddbd of _0xfc963["geometries"]) {
      flattenGeoJsonCoordinates(_0x50ddbd == null ? void 0 : _0x50ddbd["coordinates"], _0x5e17cf);
    }
    else flattenGeoJsonCoordinates(_0xfc963["coordinates"], _0x5e17cf);
  }
  return boundingBoxFromPoints(_0x5e17cf);
}
function collectGmlCoordinates(_0x40c313, _0x1a6577) {
  var _a2, _b;
  for (const _0x66ffcb of Array["from"](_0x40c313["getElementsByTagNameNS"]("*", "coordinates"))) {
    const _0x3896d2 = (_a2 = _0x66ffcb["textContent"]) == null ? void 0 : _a2["trim"]();
    if (!_0x3896d2) continue;
    for (const _0x345ae7 of _0x3896d2["split"](/\s+/)) {
      const [_0x2ee85e, _0x86e5d1] = _0x345ae7["split"](","), _0x5f20b5 = Number(_0x2ee85e), _0x349d7c = Number(_0x86e5d1);
      if (Number["isFinite"](_0x5f20b5) && Number["isFinite"](_0x349d7c)) _0x1a6577["push"]([_0x5f20b5, _0x349d7c]);
    }
  }
  for (const _0x441ae2 of ["pos", "posList"]) {
    for (const _0x3987ea of Array["from"](_0x40c313["getElementsByTagNameNS"]("*", _0x441ae2))) {
      const _0x4eb340 = (((_b = _0x3987ea["textContent"]) == null ? void 0 : _b["trim"]()) ?? "")["split"](/\s+/)["map"](Number);
      for (let _0x4c450d = 0; _0x4c450d + 1 < _0x4eb340["length"]; _0x4c450d += 2) {
        const _0x547b46 = _0x4eb340[_0x4c450d], _0x3003c5 = _0x4eb340[_0x4c450d + 1];
        if (Number["isFinite"](_0x547b46) && Number["isFinite"](_0x3003c5)) _0x1a6577["push"]([_0x547b46, _0x3003c5]);
      }
    }
  }
}
function extractGmlExtent(_0x3d90b6) {
  if (!(_0x3d90b6 instanceof Element)) return void 0;
  const _0x51677d = [];
  return collectGmlCoordinates(_0x3d90b6, _0x51677d), boundingBoxFromPoints(_0x51677d);
}
function extractImageryGeometry(_0x4cc58e) {
  return extractGeoJsonExtent(_0x4cc58e) ?? extractGmlExtent(_0x4cc58e);
}
class InteractionManager extends EventEmitter {
  constructor(_0x3d8535) {
    super(), this["unsubscribers"] = [], this["suspended"] = ![], this["identifySuspended"] = ![], this["hoverEnabled"] = ![], this["pickGeneration"] = 0, this["viewer"] = _0x3d8535, this["handler"] = new ScreenSpaceEventHandler(_0x3d8535["scene"]["canvas"]), this["bindMouseEvents"](), this["bindCameraEvents"](), this["bindSceneEvents"]();
  }
  get ["scene"]() {
    return this["viewer"]["scene"];
  }
  get ["camera"]() {
    return this["viewer"]["camera"];
  }
  ["suspend"]() {
    if (this["suspended"]) return;
    this["suspended"] = !![], this["emit"]("interaction:suspend", {});
  }
  ["resume"]() {
    this["suspended"] = ![];
  }
  ["isSuspended"]() {
    return this["suspended"];
  }
  ["suspendIdentify"]() {
    this["identifySuspended"] = !![];
  }
  ["resumeIdentify"]() {
    this["identifySuspended"] = ![];
  }
  ["isIdentifySuspended"]() {
    return this["identifySuspended"];
  }
  ["enableHover"](_0xc3401c) {
    this["hoverEnabled"] = _0xc3401c, !_0xc3401c && (this["hoveredEntity"] = void 0);
  }
  ["isHoverEnabled"]() {
    return this["hoverEnabled"];
  }
  ["flyToPosition"](_0x44375d, _0x3c3fc7, _0x56e48b) {
    const _0x3201bd = (_0x56e48b == null ? void 0 : _0x56e48b["height"]) ?? 1e3;
    this["viewer"]["camera"]["flyTo"]({ "destination": Cartesian3["fromDegrees"](_0x44375d, _0x3c3fc7, _0x3201bd), "orientation": { "pitch": _0x248e3b["toRadians"](-90) }, ...(_0x56e48b == null ? void 0 : _0x56e48b["duration"]) !== void 0 ? { "duration": _0x56e48b["duration"] } : {} });
  }
  ["flyToExtent"](_0x1a39f4, _0x58090c, _0x3ded2d, _0x2aafc3, _0x1f4ada) {
    this["viewer"]["camera"]["flyTo"]({ "destination": Rectangle["fromDegrees"](_0x1a39f4, _0x58090c, _0x3ded2d, _0x2aafc3), "orientation": { "pitch": _0x248e3b["toRadians"](-90) }, ...(_0x1f4ada == null ? void 0 : _0x1f4ada["duration"]) !== void 0 ? { "duration": _0x1f4ada["duration"] } : {} });
  }
  ["destroy"]() {
    !this["handler"]["isDestroyed"]() && this["handler"]["destroy"]();
    for (const _0x30a891 of this["unsubscribers"]) {
      _0x30a891();
    }
    this["unsubscribers"]["length"] = 0, this["removeAllListeners"]();
  }
  ["bindMouseEvents"]() {
    this["handler"]["setInputAction"]((_0x1e99ab) => this["dispatchPick"](_0x1e99ab["position"], "entity:click", "map:click", "imagery:click"), ScreenSpaceEventType["LEFT_CLICK"]), this["handler"]["setInputAction"]((_0x5abe10) => this["dispatchPick"](_0x5abe10["position"], "entity:dblclick", "map:dblclick", "imagery:dblclick"), ScreenSpaceEventType["LEFT_DOUBLE_CLICK"]), this["handler"]["setInputAction"]((_0x5b5d8f) => this["dispatchPick"](_0x5b5d8f["position"], "entity:rightclick", "map:rightclick", "imagery:rightclick"), ScreenSpaceEventType["RIGHT_CLICK"]), this["handler"]["setInputAction"]((_0x1e27cf) => this["dispatchEntityOnly"](_0x1e27cf["position"], "entity:mousedown"), ScreenSpaceEventType["LEFT_DOWN"]), this["handler"]["setInputAction"]((_0x45c894) => this["dispatchEntityOnly"](_0x45c894["position"], "entity:mouseup"), ScreenSpaceEventType["LEFT_UP"]), this["handler"]["setInputAction"]((_0xd0d330) => this["handleMouseMove"](_0xd0d330["endPosition"]), ScreenSpaceEventType["MOUSE_MOVE"]), this["handler"]["setInputAction"]((_0x2dc01a) => this["emit"]("map:wheel", { "delta": _0x2dc01a }), ScreenSpaceEventType["WHEEL"]), this["handler"]["setInputAction"]((_0x1cb174) => this["emit"]("map:pinchstart", this["buildMapDetail"](_0x1cb174["position1"])), ScreenSpaceEventType["PINCH_START"]), this["handler"]["setInputAction"](() => this["emit"]("map:pinchend", {}), ScreenSpaceEventType["PINCH_END"]), this["handler"]["setInputAction"]((_0x5a7df4) => {
      const _0xabe25 = Math["atan2"](_0x5a7df4["position2"]["y"] - _0x5a7df4["position1"]["y"], _0x5a7df4["position2"]["x"] - _0x5a7df4["position1"]["x"]);
      this["emit"]("map:pinchmove", { ...this["buildMapDetail"](_0x5a7df4["position1"]), "angle": _0xabe25 });
    }, ScreenSpaceEventType["PINCH_MOVE"]);
  }
  ["handleMouseMove"](_0x566bb2) {
    this["emit"]("map:mousemove", this["buildMapDetail"](_0x566bb2));
    if (!this["hoverEnabled"] || this["suspended"]) return;
    const _0x121477 = this["pickSelectableEntity"](_0x566bb2);
    if (_0x121477 === this["hoveredEntity"]) return;
    this["hoveredEntity"] !== void 0 && this["emit"]("entity:mouseleave", this["buildEntityDetail"](this["hoveredEntity"], _0x566bb2)), this["hoveredEntity"] = _0x121477, _0x121477 !== void 0 && this["emit"]("entity:mouseenter", this["buildEntityDetail"](_0x121477, _0x566bb2));
  }
  ["dispatchPick"](_0x3cd4f8, _0xdb4556, _0x1e33f3, _0x1ace1a) {
    if (this["suspended"]) return;
    this["pickGeneration"]++;
    const _0x3eaee2 = this["pickSelectableEntity"](_0x3cd4f8);
    _0x3eaee2 ? this["emit"](_0xdb4556, this["buildEntityDetail"](_0x3eaee2, _0x3cd4f8)) : this["emit"](_0x1e33f3, this["buildMapDetail"](_0x3cd4f8)), this["pickImageryFeatures"](_0x3cd4f8, _0x1ace1a);
  }
  ["pickSelectableEntity"](_0x15064e) {
    const _0x45eed6 = this["scene"]["drillPick"](_0x15064e, DRILL_PICK_LIMIT);
    for (const _0x5588c4 of _0x45eed6) {
      const _0x242a19 = _0x5588c4 == null ? void 0 : _0x5588c4["id"];
      if (!(_0x242a19 instanceof Entity)) continue;
      if (isSelectionHighlightEntity(_0x242a19)) continue;
      return _0x242a19;
    }
    return void 0;
  }
  ["pickImageryFeatures"](_0x59d39e, _0x58ce00) {
    const _0x599765 = this["pickGeneration"], _0x81c65b = this["camera"]["getPickRay"](_0x59d39e);
    if (!_0x81c65b) return;
    const _0x973edf = this["viewer"]["imageryLayers"]["pickImageryLayerFeatures"](_0x81c65b, this["scene"]);
    if (!_0x973edf) return;
    this["emit"]("imagery:querying", this["buildMapDetail"](_0x59d39e));
    const _0x13e1b6 = (_0xe8577f) => {
      if (this["suspended"] || _0x599765 !== this["pickGeneration"]) return;
      this["emit"](_0x58ce00, this["buildImageryDetail"](_0xe8577f, _0x59d39e));
    };
    _0x973edf["then"](_0x13e1b6)["catch"](() => {
      _0x13e1b6([]);
    });
  }
  ["buildImageryDetail"](_0x492f46, _0x585bf8) {
    const _0x416ee2 = _0x492f46["map"]((_0x289ceb) => ({ "imageryLayer": _0x289ceb["imageryLayer"], "name": _0x289ceb["name"] ?? null, "properties": _0x289ceb["properties"] ?? {}, "description": _0x289ceb["description"] ?? null, "geometryHint": extractImageryGeometry(_0x289ceb["data"]) }));
    return { "position": this["toLonLat"](_0x585bf8), "screenPos": { "x": _0x585bf8["x"], "y": _0x585bf8["y"] }, "features": _0x416ee2 };
  }
  ["dispatchEntityOnly"](_0x259ae2, _0x7b163d) {
    if (this["suspended"]) return;
    const _0x2d0bfa = this["scene"]["pick"](_0x259ae2);
    (_0x2d0bfa == null ? void 0 : _0x2d0bfa["id"]) instanceof Entity && this["emit"](_0x7b163d, this["buildEntityDetail"](_0x2d0bfa["id"], _0x259ae2));
  }
  ["bindCameraEvents"]() {
    this["unsubscribers"]["push"](this["camera"]["moveStart"]["addEventListener"](() => this["emit"]("camera:moveStart", {})), this["camera"]["moveEnd"]["addEventListener"](() => this["emit"]("camera:moveEnd", {})), this["camera"]["changed"]["addEventListener"]((_0xd9ad7e) => this["emit"]("camera:changed", { "percentage": _0xd9ad7e })));
  }
  ["bindSceneEvents"]() {
    this["unsubscribers"]["push"](this["scene"]["preRender"]["addEventListener"]((_0x5be45a, _0x250d4d) => this["emit"]("scene:preRender", { "time": _0x250d4d })), this["scene"]["postRender"]["addEventListener"]((_0x308e67, _0x2f2dae) => this["emit"]("scene:postRender", { "time": _0x2f2dae })), this["scene"]["morphStart"]["addEventListener"](() => this["emit"]("scene:morphStart", {})), this["scene"]["morphComplete"]["addEventListener"](() => this["emit"]("scene:morphComplete", {})));
  }
  ["buildMapDetail"](_0x176158) {
    return { "position": this["toLonLat"](_0x176158), "screenPos": { "x": _0x176158["x"], "y": _0x176158["y"] } };
  }
  ["buildEntityDetail"](_0x40c2aa, _0x1d8785) {
    return { ...this["resolveFeature"](_0x40c2aa), "position": this["toLonLat"](_0x1d8785), "screenPos": { "x": _0x1d8785["x"], "y": _0x1d8785["y"] }, "features": this["pickAllFeatures"](_0x1d8785, _0x40c2aa) };
  }
  ["resolveFeature"](_0x2755d2) {
    var _a2, _b;
    const _0x375a12 = JulianDate["now"](), _0x1a9739 = ((_a2 = _0x2755d2["properties"]) == null ? void 0 : _a2["getValue"](_0x375a12)) ?? {}, _0xfa5159 = _0x1a9739["__tucbsOutlineOf"];
    if (typeof _0xfa5159 === "string") {
      const _0x4c0915 = (_b = _0x2755d2["entityCollection"]) == null ? void 0 : _b["getById"](_0xfa5159);
      if (_0x4c0915 && _0x4c0915 !== _0x2755d2) return this["resolveFeature"](_0x4c0915);
    }
    const _0x4b9801 = typeof _0x1a9739["layerId"] === "string" ? _0x1a9739["layerId"] : null, _0x22c445 = typeof _0x1a9739["featureId"] === "string" ? _0x1a9739["featureId"] : null;
    if ("__tucbsOutlineOf" in _0x1a9739) {
      const { __tucbsOutlineOf: _0x421e2b, ..._0x2ecc8f } = _0x1a9739;
      return { "entity": _0x2755d2, "layerId": _0x4b9801, "featureId": _0x22c445, "properties": _0x2ecc8f };
    }
    return { "entity": _0x2755d2, "layerId": _0x4b9801, "featureId": _0x22c445, "properties": _0x1a9739 };
  }
  ["pickAllFeatures"](_0x33ea9d, _0x32e70e) {
    const _0x32a816 = this["resolveFeature"](_0x32e70e), _0x328007 = [_0x32a816], _0x525144 = /* @__PURE__ */ new Set([_0x32a816["entity"]]), _0x99db6f = this["scene"]["drillPick"](_0x33ea9d, DRILL_PICK_LIMIT);
    for (const _0x2fb295 of _0x99db6f) {
      const _0x2b6af3 = _0x2fb295 == null ? void 0 : _0x2fb295["id"];
      if (!(_0x2b6af3 instanceof Entity)) continue;
      const _0xe68ff3 = this["resolveFeature"](_0x2b6af3);
      if (_0x525144["has"](_0xe68ff3["entity"])) continue;
      _0x525144["add"](_0xe68ff3["entity"]), _0x328007["push"](_0xe68ff3);
    }
    return _0x328007;
  }
  ["toLonLat"](_0x5deec9) {
    const _0x39ebb9 = this["camera"]["pickEllipsoid"](_0x5deec9, this["scene"]["globe"]["ellipsoid"]);
    if (_0x39ebb9 === void 0) return [0, 0];
    const _0x2ae04e = Cartographic["fromCartesian"](_0x39ebb9);
    return [_0x248e3b["toDegrees"](_0x2ae04e["longitude"]), _0x248e3b["toDegrees"](_0x2ae04e["latitude"])];
  }
}
const EARTH_RADIUS_METERS = 6378137, CIRCLE_SEGMENTS = 48;
function dedupePositions(_0x810e32) {
  return _0x810e32["filter"]((_0x4d0d0c, _0xa4802) => _0xa4802 === 0 || !Cartesian3["equalsEpsilon"](_0x4d0d0c, _0x810e32[_0xa4802 - 1], _0x248e3b["EPSILON7"]));
}
class DrawingManager extends EventEmitter {
  constructor(_0x49a36f, _0x23961e) {
    super(), this["shapes"] = /* @__PURE__ */ new Map(), this["positions"] = [], this["tempVertexEntities"] = [], this["freehandDragging"] = ![], this["onEscapeKey"] = (_0x5e6656) => {
      if (_0x5e6656["key"] !== "Escape") return;
      this["abortCurrentShape"]();
    }, this["viewer"] = _0x49a36f, this["interactionManager"] = _0x23961e, this["handler"] = new ScreenSpaceEventHandler(_0x49a36f["scene"]["canvas"]);
  }
  get ["scene"]() {
    return this["viewer"]["scene"];
  }
  ["activate"](_0x1b92ac, _0x1796cb) {
    if (this["activeTool"]) this["deactivate"]();
    this["activeTool"] = _0x1b92ac, this["activeSource"] = _0x1796cb, this["positions"] = [], this["previewPosition"] = void 0, this["interactionManager"]["suspend"](), this["resetTrackedEntity"](), this["suspendBuiltInDoubleClick"]();
    if (_0x1b92ac === "freehand") this["lockCamera"]();
    this["setCursor"]("crosshair"), this["bindToolHandlers"](_0x1b92ac), this["emit"]("draw:start", _0x1796cb === void 0 ? { "tool": _0x1b92ac } : { "tool": _0x1b92ac, "source": _0x1796cb });
  }
  ["deactivate"]() {
    if (!this["activeTool"]) return;
    const _0xd5772 = this["activeTool"], _0x20060a = this["activeSource"];
    this["finishSession"](), this["emit"]("draw:cancel", _0x20060a === void 0 ? { "tool": _0xd5772 } : { "tool": _0xd5772, "source": _0x20060a });
  }
  ["getActiveTool"]() {
    return this["activeTool"];
  }
  ["isActive"]() {
    return this["activeTool"] !== void 0;
  }
  ["getShapes"]() {
    return [...this["shapes"]["values"]()];
  }
  ["getShapeById"](_0xfc2fb6) {
    return this["shapes"]["get"](_0xfc2fb6);
  }
  ["removeShape"](_0x366245) {
    const _0x18741c = this["shapes"]["get"](_0x366245);
    if (!_0x18741c) return;
    this["viewer"]["entities"]["remove"](_0x18741c["entity"]), this["shapes"]["delete"](_0x366245), this["emit"]("draw:remove", { "id": _0x366245, "shape": _0x18741c });
  }
  ["clearAll"]() {
    for (const _0x1d0172 of [...this["shapes"]["keys"]()]) this["removeShape"](_0x1d0172);
  }
  ["undo"]() {
    if (this["positions"]["length"] === 0) return;
    this["positions"]["pop"]();
    const _0x104298 = this["tempVertexEntities"]["pop"]();
    if (_0x104298) this["viewer"]["entities"]["remove"](_0x104298);
  }
  ["toGeoJSON"]() {
    return { "type": "FeatureCollection", "features": this["getShapes"]()["map"]((_0x15c441) => ({ "type": "Feature", "properties": { "id": _0x15c441["id"], "tool": _0x15c441["tool"] }, "geometry": _0x15c441["geometry"] })) };
  }
  ["destroy"]() {
    this["deactivate"](), this["handler"]["destroy"](), this["removeAllListeners"]();
  }
  ["bindToolHandlers"](_0x3a6828) {
    this["handler"]["setInputAction"](() => this["deactivate"](), ScreenSpaceEventType["RIGHT_CLICK"]), document["addEventListener"]("keydown", this["onEscapeKey"]);
    if (_0x3a6828 === "freehand") {
      this["handler"]["setInputAction"]((_0x1a547f) => this["onFreehandDown"](_0x1a547f["position"]), ScreenSpaceEventType["LEFT_DOWN"]), this["handler"]["setInputAction"](() => this["onFreehandUp"](), ScreenSpaceEventType["LEFT_UP"]), this["handler"]["setInputAction"]((_0x123d90) => this["onFreehandMove"](_0x123d90["endPosition"]), ScreenSpaceEventType["MOUSE_MOVE"]);
      return;
    }
    this["handler"]["setInputAction"]((_0x37f4f8) => this["onVertexClick"](_0x37f4f8["position"]), ScreenSpaceEventType["LEFT_CLICK"]), this["handler"]["setInputAction"]((_0x5b0527) => this["onPreviewMove"](_0x5b0527["endPosition"]), ScreenSpaceEventType["MOUSE_MOVE"]), (_0x3a6828 === "polyline" || _0x3a6828 === "polygon") && this["handler"]["setInputAction"](() => this["finishMultiVertexViaDoubleClick"](), ScreenSpaceEventType["LEFT_DOUBLE_CLICK"]);
  }
  ["unbindToolHandlers"]() {
    this["handler"]["removeInputAction"](ScreenSpaceEventType["LEFT_CLICK"]), this["handler"]["removeInputAction"](ScreenSpaceEventType["LEFT_DOWN"]), this["handler"]["removeInputAction"](ScreenSpaceEventType["LEFT_UP"]), this["handler"]["removeInputAction"](ScreenSpaceEventType["MOUSE_MOVE"]), this["handler"]["removeInputAction"](ScreenSpaceEventType["RIGHT_CLICK"]), this["handler"]["removeInputAction"](ScreenSpaceEventType["LEFT_DOUBLE_CLICK"]), document["removeEventListener"]("keydown", this["onEscapeKey"]);
  }
  ["abortCurrentShape"]() {
    if (this["activeTool"] === void 0 || this["positions"]["length"] === 0) return;
    const _0x351679 = this["activeTool"], _0x26f1af = this["activeSource"];
    this["clearTempEntity"](), this["resetSessionForContinuousDrawing"](), this["resetTrackedEntity"](), this["emit"]("draw:abort", _0x26f1af === void 0 ? { "tool": _0x351679 } : { "tool": _0x351679, "source": _0x26f1af });
  }
  ["onVertexClick"](_0x4015b4) {
    const _0x2a8eb9 = this["toCartesian"](_0x4015b4);
    if (_0x2a8eb9 === void 0 || this["activeTool"] === void 0) return;
    this["positions"]["push"](_0x2a8eb9), this["emitVertex"](_0x4015b4), this["ensureTempEntity"]();
    (this["activeTool"] === "polygon" || this["activeTool"] === "polyline") && this["addVertexMarker"](_0x2a8eb9);
    if (this["activeTool"] === "point") {
      this["completeShape"]();
      return;
    }
    (this["activeTool"] === "rectangle" || this["activeTool"] === "circle") && this["positions"]["length"] >= 2 && this["completeShape"]();
  }
  ["onPreviewMove"](_0x542436) {
    if (this["positions"]["length"] === 0 || this["activeTool"] === void 0) return;
    const _0x48fa71 = this["toCartesian"](_0x542436);
    if (_0x48fa71 === void 0) return;
    this["previewPosition"] = _0x48fa71, this["emit"]("draw:move", { "tool": this["activeTool"], "coordinates": this["toLonLat"](_0x48fa71), "screenPos": { "x": _0x542436["x"], "y": _0x542436["y"] } });
  }
  ["finishMultiVertex"]() {
    const _0x5178d4 = this["activeTool"] === "polygon" ? 3 : 2;
    if (this["positions"]["length"] < _0x5178d4) return;
    this["completeShape"]();
  }
  ["finishMultiVertexViaDoubleClick"]() {
    this["positions"]["length"] >= 2 && this["positions"]["pop"](), this["finishMultiVertex"](), this["resetTrackedEntity"]();
  }
  ["onFreehandDown"](_0x9057c5) {
    this["freehandDragging"] = !![], this["positions"] = [];
    const _0x106ecb = this["toCartesian"](_0x9057c5);
    if (_0x106ecb === void 0) return;
    this["positions"]["push"](_0x106ecb), this["emitVertex"](_0x9057c5), this["ensureTempEntity"]();
  }
  ["onFreehandMove"](_0xf62500) {
    if (!this["freehandDragging"] || this["activeTool"] === void 0) return;
    const _0x3b605a = this["toCartesian"](_0xf62500);
    if (_0x3b605a === void 0) return;
    this["positions"]["push"](_0x3b605a), this["previewPosition"] = _0x3b605a, this["emit"]("draw:move", { "tool": this["activeTool"], "coordinates": this["toLonLat"](_0x3b605a), "screenPos": { "x": _0xf62500["x"], "y": _0xf62500["y"] } });
  }
  ["onFreehandUp"]() {
    this["freehandDragging"] = ![];
    if (this["positions"]["length"] >= 2) this["completeShape"]();
  }
  ["emitVertex"](_0x313237) {
    if (this["activeTool"] === void 0) return;
    const _0x124930 = this["requireIndex"](this["positions"], this["positions"]["length"] - 1);
    this["emit"]("draw:vertex", { "tool": this["activeTool"], "index": this["positions"]["length"] - 1, "coordinates": this["toLonLat"](_0x124930), "screenPos": { "x": _0x313237["x"], "y": _0x313237["y"] } });
  }
  ["completeShape"]() {
    if (this["activeTool"] === void 0 || this["positions"]["length"] === 0) return;
    const _0x2f615f = this["buildShape"](this["activeTool"], this["positions"]), _0x548281 = this["activeSource"] === void 0 ? _0x2f615f : { ..._0x2f615f, "source": this["activeSource"] };
    this["shapes"]["set"](_0x548281["id"], _0x548281), this["clearTempEntity"](), this["resetSessionForContinuousDrawing"](), this["emit"]("draw:complete", { "shape": _0x548281 });
  }
  ["resetSessionForContinuousDrawing"]() {
    this["positions"] = [], this["previewPosition"] = void 0, this["freehandDragging"] = ![];
  }
  ["finishSession"]() {
    this["unbindToolHandlers"](), this["clearTempEntity"](), this["resetSessionForContinuousDrawing"](), this["activeTool"] = void 0, this["activeSource"] = void 0, this["unlockCamera"](), this["setCursor"]("default"), this["resetTrackedEntity"](), this["restoreBuiltInDoubleClick"](), this["interactionManager"]["resume"]();
  }
  ["ensureTempEntity"]() {
    if (this["activeTool"] === void 0) return;
    if (this["tempEntity"] === void 0) {
      if (this["activeTool"] === "point") this["tempEntity"] = this["viewer"]["entities"]["add"]({ "position": this["requireIndex"](this["positions"], 0), "point": { "pixelSize": 8, "color": Color["YELLOW"] } });
      else this["activeTool"] !== "rectangle" && this["activeTool"] !== "circle" && (this["tempEntity"] = this["viewer"]["entities"]["add"]({ "polyline": { "positions": this["buildPositionsCallback"](2), "width": 2, "material": Color["YELLOW"] } }));
    }
    if (this["tempFillEntity"] === void 0) {
      if (this["activeTool"] === "polygon") this["tempFillEntity"] = this["viewer"]["entities"]["add"]({ "polygon": { "hierarchy": new CallbackProperty(() => {
        const _0x35126f = [...this["positions"], ...this["previewPosition"] ? [this["previewPosition"]] : []], _0x4f3bb0 = dedupePositions(_0x35126f);
        return _0x4f3bb0["length"] >= 3 ? new PolygonHierarchy(_0x4f3bb0) : void 0;
      }, ![]), "material": Color["CYAN"]["withAlpha"](0.35) } });
      else {
        if (this["activeTool"] === "rectangle") this["tempFillEntity"] = this["viewer"]["entities"]["add"]({ "polygon": { "hierarchy": new CallbackProperty(() => {
          const _0x189b57 = this["positions"][0], _0x1225f5 = this["previewPosition"];
          if (_0x189b57 === void 0 || _0x1225f5 === void 0) return void 0;
          const _0x14b03d = this["computeRectangleCoordinates"](_0x189b57, _0x1225f5);
          return new PolygonHierarchy(_0x14b03d["map"]((_0x3b0646) => this["toCartesianFromLonLat"](_0x3b0646)));
        }, ![]), "material": Color["CYAN"]["withAlpha"](0.35) } });
        else this["activeTool"] === "circle" && (this["tempFillEntity"] = this["viewer"]["entities"]["add"]({ "polygon": { "hierarchy": new CallbackProperty(() => {
          const _0x342a49 = this["positions"][0], _0x507093 = this["previewPosition"];
          if (_0x342a49 === void 0 || _0x507093 === void 0) return void 0;
          const _0x1c8dd1 = this["computeCircleRing"](_0x342a49, _0x507093);
          return new PolygonHierarchy(_0x1c8dd1["map"]((_0x2ce396) => this["toCartesianFromLonLat"](_0x2ce396)));
        }, ![]), "material": Color["CYAN"]["withAlpha"](0.35) } }));
      }
    }
  }
  ["addVertexMarker"](_0x249d98) {
    this["tempVertexEntities"]["push"](this["viewer"]["entities"]["add"]({ "position": _0x249d98, "point": { "pixelSize": 6, "color": Color["YELLOW"], "outlineColor": Color["BLACK"], "outlineWidth": 1 } }));
  }
  ["buildPositionsCallback"](_0x530c68) {
    return new CallbackProperty(() => {
      const _0x381e18 = [...this["positions"], ...this["previewPosition"] ? [this["previewPosition"]] : []], _0x6334b4 = dedupePositions(_0x381e18);
      return _0x6334b4["length"] >= _0x530c68 ? _0x6334b4 : void 0;
    }, ![]);
  }
  ["clearTempEntity"]() {
    this["tempEntity"] !== void 0 && (this["viewer"]["entities"]["remove"](this["tempEntity"]), this["tempEntity"] = void 0);
    this["tempFillEntity"] !== void 0 && (this["viewer"]["entities"]["remove"](this["tempFillEntity"]), this["tempFillEntity"] = void 0);
    for (const _0xc3789a of this["tempVertexEntities"]) {
      this["viewer"]["entities"]["remove"](_0xc3789a);
    }
    this["tempVertexEntities"] = [];
  }
  ["resetTrackedEntity"]() {
    this["viewer"]["trackedEntity"] !== void 0 && (this["viewer"]["trackedEntity"] = void 0);
  }
  ["suspendBuiltInDoubleClick"]() {
    if (this["builtInDoubleClickAction"] !== void 0) return;
    const _0x5ae635 = this["viewer"]["screenSpaceEventHandler"], _0x427032 = _0x5ae635["getInputAction"](ScreenSpaceEventType["LEFT_DOUBLE_CLICK"]);
    if (_0x427032 === void 0) return;
    this["builtInDoubleClickAction"] = _0x427032, _0x5ae635["removeInputAction"](ScreenSpaceEventType["LEFT_DOUBLE_CLICK"]);
  }
  ["restoreBuiltInDoubleClick"]() {
    if (this["builtInDoubleClickAction"] === void 0) return;
    this["viewer"]["screenSpaceEventHandler"]["setInputAction"](this["builtInDoubleClickAction"], ScreenSpaceEventType["LEFT_DOUBLE_CLICK"]), this["builtInDoubleClickAction"] = void 0;
  }
  ["setCursor"](_0x38d5c2) {
    this["viewer"]["scene"]["canvas"]["style"]["cursor"] = _0x38d5c2;
  }
  ["lockCamera"]() {
    this["viewer"]["scene"]["screenSpaceCameraController"]["enableRotate"] = ![], this["viewer"]["scene"]["screenSpaceCameraController"]["enableTilt"] = ![];
  }
  ["unlockCamera"]() {
    this["viewer"]["scene"]["screenSpaceCameraController"]["enableRotate"] = !![], this["viewer"]["scene"]["screenSpaceCameraController"]["enableTilt"] = !![];
  }
  ["buildShape"](_0x539ebf, _0x29df10) {
    const _0x41faa5 = crypto["randomUUID"](), _0x733eba = Date["now"]();
    if (_0x539ebf === "point") {
      const _0x12ba6c = this["requireIndex"](_0x29df10, 0), _0x4bd9cd = this["toLonLat"](_0x12ba6c);
      return { "id": _0x41faa5, "tool": _0x539ebf, "entity": this["viewer"]["entities"]["add"]({ "position": _0x12ba6c, "point": { "pixelSize": 8, "color": Color["CYAN"] } }), "positions": _0x29df10, "coordinates": [_0x4bd9cd], "geometry": { "type": "Point", "coordinates": _0x4bd9cd }, "createdAt": _0x733eba };
    }
    if (_0x539ebf === "circle") return this["buildCircleShape"](_0x41faa5, _0x29df10, _0x733eba);
    if (_0x539ebf === "rectangle") return this["buildRectangleShape"](_0x41faa5, _0x29df10, _0x733eba);
    if (_0x539ebf === "polygon") return this["buildPolygonShape"](_0x41faa5, _0x29df10, _0x733eba);
    return this["buildLineShape"](_0x41faa5, _0x539ebf, _0x29df10, _0x733eba);
  }
  ["buildLineShape"](_0x37b2cd, _0x3a53bf, _0x1a8bcd, _0x464035) {
    const _0x4bc057 = _0x1a8bcd["map"]((_0x5e7715) => this["toLonLat"](_0x5e7715));
    return { "id": _0x37b2cd, "tool": _0x3a53bf, "entity": this["viewer"]["entities"]["add"]({ "polyline": { "positions": _0x1a8bcd, "width": 3, "material": Color["CYAN"] } }), "positions": _0x1a8bcd, "coordinates": _0x4bc057, "geometry": { "type": "LineString", "coordinates": _0x4bc057 }, "length": this["computeLength"](_0x1a8bcd), "createdAt": _0x464035 };
  }
  ["buildPolygonShape"](_0x5a59b7, _0x9de113, _0x1f0e80) {
    const _0x4f9fc1 = _0x9de113["map"]((_0x47be84) => this["toLonLat"](_0x47be84)), _0x4357b9 = this["requireIndex"](_0x4f9fc1, 0), _0xbebccf = this["requireIndex"](_0x9de113, 0), _0x49f73c = [..._0x4f9fc1, _0x4357b9];
    return { "id": _0x5a59b7, "tool": "polygon", "entity": this["viewer"]["entities"]["add"]({ "polygon": { "hierarchy": _0x9de113, "material": Color["CYAN"]["withAlpha"](0.4) } }), "positions": _0x9de113, "coordinates": _0x4f9fc1, "geometry": { "type": "Polygon", "coordinates": [_0x49f73c] }, "area": this["computeArea"](_0x4f9fc1), "perimeter": this["computeLength"]([..._0x9de113, _0xbebccf]), "createdAt": _0x1f0e80 };
  }
  ["buildRectangleShape"](_0x5c9d3c, _0x241532, _0x33929a) {
    const _0x2f7f63 = this["requireIndex"](_0x241532, 0), _0x54567f = this["requireIndex"](_0x241532, 1), _0x40f130 = this["computeRectangleCoordinates"](_0x2f7f63, _0x54567f), _0x2d4182 = _0x40f130["map"]((_0x50b3c4) => this["toCartesianFromLonLat"](_0x50b3c4)), _0x1b8a8b = this["requireIndex"](_0x2d4182, 0);
    return { "id": _0x5c9d3c, "tool": "rectangle", "entity": this["viewer"]["entities"]["add"]({ "polygon": { "hierarchy": _0x2d4182, "material": Color["CYAN"]["withAlpha"](0.4) } }), "positions": _0x2d4182, "coordinates": _0x40f130, "geometry": { "type": "Polygon", "coordinates": [[..._0x40f130, this["requireIndex"](_0x40f130, 0)]] }, "area": this["computeArea"](_0x40f130), "perimeter": this["computeLength"]([..._0x2d4182, _0x1b8a8b]), "createdAt": _0x33929a };
  }
  ["buildCircleShape"](_0x56dc41, _0x4471d7, _0x285169) {
    const _0xb3981d = this["requireIndex"](_0x4471d7, 0), _0x4563ee = this["requireIndex"](_0x4471d7, 1), _0x56e549 = Cartesian3["distance"](_0xb3981d, _0x4563ee), _0x3e2004 = this["computeCircleRing"](_0xb3981d, _0x4563ee), _0x2d1c74 = _0x3e2004["map"]((_0x708ccb) => this["toCartesianFromLonLat"](_0x708ccb)), _0x5284d7 = this["requireIndex"](_0x3e2004, 0);
    return { "id": _0x56dc41, "tool": "circle", "entity": this["viewer"]["entities"]["add"]({ "polygon": { "hierarchy": _0x2d1c74, "material": Color["CYAN"]["withAlpha"](0.4) } }), "positions": [_0xb3981d, _0x4563ee], "coordinates": [this["toLonLat"](_0xb3981d)], "geometry": { "type": "Polygon", "coordinates": [[..._0x3e2004, _0x5284d7]] }, "area": Math["PI"] * _0x56e549 * _0x56e549, "perimeter": 2 * Math["PI"] * _0x56e549, "radius": _0x56e549, "createdAt": _0x285169 };
  }
  ["sampleCircleRing"](_0x8e5d97, _0x146e32) {
    const _0x403cd8 = [];
    for (let _0x1cf764 = 0; _0x1cf764 < CIRCLE_SEGMENTS; _0x1cf764++) {
      const _0x317761 = 2 * Math["PI"] * _0x1cf764 / CIRCLE_SEGMENTS, _0x1b099c = _0x146e32 * Math["cos"](_0x317761), _0x451b7d = _0x146e32 * Math["sin"](_0x317761);
      _0x403cd8["push"](this["offsetMetersToLonLat"](_0x8e5d97, _0x1b099c, _0x451b7d));
    }
    return _0x403cd8;
  }
  ["computeRectangleCoordinates"](_0x5944ca, _0x598926) {
    const _0x54f8b4 = this["toLonLat"](_0x5944ca), _0x53b521 = this["toLonLat"](_0x598926), _0x108438 = Math["min"](_0x54f8b4[0], _0x53b521[0]), _0x3334bf = Math["max"](_0x54f8b4[0], _0x53b521[0]), _0xbd23f5 = Math["min"](_0x54f8b4[1], _0x53b521[1]), _0x4a0074 = Math["max"](_0x54f8b4[1], _0x53b521[1]);
    return [[_0x108438, _0xbd23f5], [_0x3334bf, _0xbd23f5], [_0x3334bf, _0x4a0074], [_0x108438, _0x4a0074]];
  }
  ["computeCircleRing"](_0x5a65d6, _0x3bcd07) {
    const _0x1fe556 = Cartesian3["distance"](_0x5a65d6, _0x3bcd07), _0x2b2434 = this["toLonLat"](_0x5a65d6);
    return this["sampleCircleRing"](_0x2b2434, _0x1fe556);
  }
  ["computeArea"](_0x4bb3be) {
    const _0x52c5f3 = this["requireIndex"](_0x4bb3be, 0)[1], _0x4bd6f1 = _0x4bb3be["map"]((_0x37a02e) => this["projectMeters"](_0x37a02e, _0x52c5f3));
    let _0x56381e = 0;
    for (let _0x493e61 = 0; _0x493e61 < _0x4bd6f1["length"]; _0x493e61++) {
      const [_0x2ad702, _0x5b6e14] = this["requireIndex"](_0x4bd6f1, _0x493e61), [_0x2f3555, _0x45b509] = this["requireIndex"](_0x4bd6f1, (_0x493e61 + 1) % _0x4bd6f1["length"]);
      _0x56381e += _0x2ad702 * _0x45b509 - _0x2f3555 * _0x5b6e14;
    }
    return Math["abs"](_0x56381e) / 2;
  }
  ["computeLength"](_0x1d6ac0) {
    let _0x1dde90 = 0;
    for (let _0x328982 = 0; _0x328982 < _0x1d6ac0["length"] - 1; _0x328982++) {
      _0x1dde90 += Cartesian3["distance"](this["requireIndex"](_0x1d6ac0, _0x328982), this["requireIndex"](_0x1d6ac0, _0x328982 + 1));
    }
    return _0x1dde90;
  }
  ["projectMeters"](_0x594254, _0x13e393) {
    const _0x54a10d = _0x248e3b["toRadians"](_0x594254[0]) * Math["cos"](_0x248e3b["toRadians"](_0x13e393)) * EARTH_RADIUS_METERS, _0xc429a = _0x248e3b["toRadians"](_0x594254[1]) * EARTH_RADIUS_METERS;
    return [_0x54a10d, _0xc429a];
  }
  ["offsetMetersToLonLat"](_0x339b73, _0x51c6a9, _0x31270e) {
    const _0x4435a8 = _0x339b73[1] + _0x248e3b["toDegrees"](_0x31270e / EARTH_RADIUS_METERS), _0xa0afba = _0x339b73[0] + _0x248e3b["toDegrees"](_0x51c6a9 / (EARTH_RADIUS_METERS * Math["cos"](_0x248e3b["toRadians"](_0x339b73[1]))));
    return [_0xa0afba, _0x4435a8];
  }
  ["toCartesianFromLonLat"](_0x5613b8) {
    return Cartesian3["fromDegrees"](_0x5613b8[0], _0x5613b8[1]);
  }
  ["toCartesian"](_0x34a655) {
    return this["viewer"]["camera"]["pickEllipsoid"](_0x34a655, this["scene"]["globe"]["ellipsoid"]);
  }
  ["toLonLat"](_0x3dd993) {
    const _0x2797fb = Cartographic["fromCartesian"](_0x3dd993);
    return [_0x248e3b["toDegrees"](_0x2797fb["longitude"]), _0x248e3b["toDegrees"](_0x2797fb["latitude"])];
  }
  ["requireIndex"](_0x1414ec, _0x1c3159) {
    const _0xa7f188 = _0x1414ec[_0x1c3159];
    if (_0xa7f188 === void 0) throw new TucbsError("INTERNAL_INDEX_OUT_OF_RANGE", "DrawingManager: beklenen index (" + _0x1c3159 + ") dizide bulunamadi");
    return _0xa7f188;
  }
}
function trimSlash$1(_0x115496) {
  return _0x115496["replace"](/\/+$/, "");
}
function newClientId() {
  if (typeof crypto !== "undefined" && typeof crypto["randomUUID"] === "function") return crypto["randomUUID"]();
  return "00000000-0000-0000-0000-000000000001";
}
class AnalysisManager {
  constructor(_0x5b863a) {
    __privateAdd(this, _AnalysisManager_instances);
    __privateAdd(this, _apiKey2);
    __privateSet(this, _apiKey2, _0x5b863a["apiKey"] ?? ""), this["clientId"] = _0x5b863a["clientId"] ?? newClientId();
  }
  ["configure"](_0x2d908b) {
    if (_0x2d908b["apiKey"] !== void 0) __privateSet(this, _apiKey2, _0x2d908b["apiKey"]);
    if (_0x2d908b["clientId"] !== void 0) this["clientId"] = _0x2d908b["clientId"];
  }
  get ["configured"]() {
    return Boolean(getUcbpApiBase() && __privateGet(this, _apiKey2));
  }
  async ["buffer"](_0x57595e) {
    return __privateMethod(this, _AnalysisManager_instances, post_fn).call(this, "/vector/buffer", _0x57595e);
  }
  async ["intersection"](_0x5b6086) {
    return __privateMethod(this, _AnalysisManager_instances, post_fn).call(this, "/vector/intersection", _0x5b6086);
  }
  async ["boundary"](_0x25d87e) {
    return __privateMethod(this, _AnalysisManager_instances, post_fn).call(this, "/vector/boundary", _0x25d87e);
  }
  async ["clip"](_0xf83273) {
    return __privateMethod(this, _AnalysisManager_instances, post_fn).call(this, "/vector/clip", _0xf83273);
  }
  async ["difference"](_0x4ebabb) {
    return __privateMethod(this, _AnalysisManager_instances, post_fn).call(this, "/vector/difference", _0x4ebabb);
  }
  async ["subtract"](_0x1446dc) {
    return __privateMethod(this, _AnalysisManager_instances, post_fn).call(this, "/vector/subtract", _0x1446dc);
  }
  async ["union"](_0x5cad14) {
    return __privateMethod(this, _AnalysisManager_instances, post_fn).call(this, "/vector/union", _0x5cad14);
  }
  async ["wedgeBuffer"](_0x33df95) {
    return __privateMethod(this, _AnalysisManager_instances, post_fn).call(this, "/vector/wedge-buffer", _0x33df95);
  }
}
_apiKey2 = new WeakMap();
_AnalysisManager_instances = new WeakSet();
post_fn = async function(_0x1ac47c, _0x5a94ab) {
  if (!__privateGet(this, _apiKey2)) throw new AnalysisRequestError("ANALYSIS_API_KEY_MISSING", "apiKey tanımlı değil (tucbs-map apiKey).");
  const _0x176770 = { "clientId": this["clientId"], "object": _0x5a94ab }, _0x847fb6 = "" + trimSlash$1(getUcbpApiBase()) + _0x1ac47c;
  let _0x683ecf;
  try {
    _0x683ecf = await fetch(_0x847fb6, { "method": "POST", "headers": { "Content-Type": "application/json", "X-API-Key": __privateGet(this, _apiKey2) }, "body": JSON["stringify"](_0x176770) });
  } catch (_0x5686ee) {
    const _0x3744f0 = _0x5686ee instanceof Error ? _0x5686ee["message"] : String(_0x5686ee);
    throw new AnalysisRequestError("ANALYSIS_NETWORK_ERROR", "Ağ hatası: " + _0x3744f0);
  }
  const _0x2cf39a = await _0x683ecf["json"]()["catch"](() => null);
  if (!_0x683ecf["ok"]) {
    const _0x3daf2c = (_0x2cf39a == null ? void 0 : _0x2cf39a["mesaj"]) || (_0x2cf39a == null ? void 0 : _0x2cf39a["message"]) || "İstek başarısız (HTTP " + _0x683ecf["status"] + ")";
    throw new AnalysisRequestError("ANALYSIS_REQUEST_FAILED", _0x3daf2c);
  }
  if ((_0x2cf39a == null ? void 0 : _0x2cf39a["isSuccess"]) === ![] || (_0x2cf39a == null ? void 0 : _0x2cf39a["success"]) === ![]) throw new AnalysisRequestError("ANALYSIS_UNSUCCESSFUL", _0x2cf39a["mesaj"] || _0x2cf39a["message"] || "Analiz başarısız.");
  const _0x26e691 = _0x2cf39a == null ? void 0 : _0x2cf39a["object"];
  if (!(_0x26e691 == null ? void 0 : _0x26e691["geojson"])) throw new AnalysisRequestError("ANALYSIS_RESPONSE_MISSING_GEOJSON", "Yanıtta geojson yok.");
  return _0x26e691;
};
const FALLBACK_IMAGE_FILENAME = "blue-marble-fallback.jpg", FALLBACK_WORLD_IMAGE = new URL(FALLBACK_IMAGE_FILENAME, import.meta.url)["href"], FALLBACK_DELAY_MS = 3e3, BASEMAP_ERROR_RETRY_LIMIT = 2, BASEMAP_UNAVAILABLE_DELAY_MS = 1e4;
function watchBasemap(_0x25f2ea, _0x2beef1, _0x1189a1, _0x255d87, _0x1d0e0e, _0x4ee199) {
  let _0x5d8766 = ![], _0x368eb4 = ![];
  const _0x406042 = window["setTimeout"](() => {
    if (_0x5d8766 || !_0x2beef1["isCurrentGeneration"](_0x1189a1)) return;
    _0x2beef1["ensureFallbackBasemap"]();
  }, FALLBACK_DELAY_MS), _0x451730 = window["setTimeout"](() => {
    if (_0x5d8766 || !_0x2beef1["isCurrentGeneration"](_0x1189a1)) return;
    _0x5d8766 = !![], _0x1ec511(), _0x2beef1["setStatus"]("unavailable"), _0x2beef1["removeBasemapLayer"](), _0x2beef1["ensureFallbackBasemap"](), _0x2beef1["emit"]("basemap:error", { "id": _0x255d87 });
  }, BASEMAP_UNAVAILABLE_DELAY_MS), _0x1ec511 = () => {
    _0x368eb4 = !![], window["clearTimeout"](_0x406042), window["clearTimeout"](_0x451730), _0x4ee199["errorEvent"]["removeEventListener"](_0x13db31);
  }, _0x13db31 = (_0x1c116b) => {
    if (_0x5d8766) return;
    if (!_0x2beef1["isCurrentGeneration"](_0x1189a1)) return;
    if (!_0x25f2ea["imageryLayers"]["contains"](_0x1d0e0e)) return;
    if (_0x1c116b["timesRetried"] < BASEMAP_ERROR_RETRY_LIMIT) {
      _0x1c116b["retry"] = !![];
      return;
    }
    _0x5d8766 = !![], _0x1ec511(), _0x2beef1["setStatus"]("unavailable"), _0x2beef1["removeBasemapLayer"](), _0x2beef1["ensureFallbackBasemap"](), _0x2beef1["emit"]("basemap:error", { "id": _0x255d87 });
  }, _0x26b724 = _0x4ee199["requestImage"]["bind"](_0x4ee199);
  _0x4ee199["requestImage"] = (_0x3ad3fe, _0x1ccb58, _0x17a552, _0x134aa9) => {
    const _0x3e17b0 = _0x26b724(_0x3ad3fe, _0x1ccb58, _0x17a552, _0x134aa9);
    if (_0x3e17b0 && !_0x5d8766 && !_0x368eb4) _0x3e17b0["then"](_0x5054ed, () => void 0);
    return _0x3e17b0;
  };
  const _0x5054ed = () => {
    if (_0x5d8766 || _0x368eb4) return;
    if (!_0x2beef1["isCurrentGeneration"](_0x1189a1)) {
      _0x1ec511();
      return;
    }
    _0x5d8766 = !![], _0x1ec511(), _0x2beef1["setStatus"]("ready"), _0x2beef1["clearFallbackBasemap"](), _0x2beef1["emit"]("basemap:recovered", { "id": _0x255d87 });
  };
  return _0x4ee199["errorEvent"]["addEventListener"](_0x13db31), _0x1ec511;
}
const BASEMAP_LAYER_ID = "__tucbs_basemap__";
function trackProviderRequests(_0x4a4627) {
  const _0x300ba1 = /* @__PURE__ */ new Set(), _0x257fa4 = _0x4a4627["requestImage"]["bind"](_0x4a4627);
  return _0x4a4627["requestImage"] = (_0x25505e, _0x160dcf, _0x340981, _0x4a50a6) => {
    if (_0x4a50a6) _0x300ba1["add"](_0x4a50a6);
    const _0x4e20d3 = _0x257fa4(_0x25505e, _0x160dcf, _0x340981, _0x4a50a6);
    if (_0x4a50a6 && _0x4e20d3) {
      const _0x344988 = () => {
        _0x300ba1["delete"](_0x4a50a6);
      };
      _0x4e20d3["then"](_0x344988, _0x344988);
    }
    return _0x4e20d3;
  }, () => {
    for (const _0x1d956a of _0x300ba1) _0x1d956a["cancel"]();
    _0x300ba1["clear"]();
  };
}
class BasemapController {
  constructor(_0x16b4cd, _0x3dbbdf) {
    this["_basemapGeneration"] = 0, this["_basemapStatus"] = "ready", this["_fallbackBasemapLayer"] = null, this["viewer"] = _0x16b4cd, this["deps"] = _0x3dbbdf;
  }
  get ["status"]() {
    return this["_basemapStatus"];
  }
  get ["currentBasemapId"]() {
    return this["_currentBasemapId"];
  }
  ["set"](_0x39283a) {
    var _a2, _b;
    (_a2 = this["_stopBasemapWatch"]) == null ? void 0 : _a2.call(this), (_b = this["_cancelBasemapRequests"]) == null ? void 0 : _b.call(this), this["_cancelBasemapRequests"] = void 0, this["deps"]["removeBasemapLayers"](), this["clearFallbackBasemap"]();
    const _0x170956 = ++this["_basemapGeneration"];
    if (_0x39283a === null || _0x39283a === void 0) {
      this["_basemapStatus"] = "ready", this["_currentBasemapId"] = void 0;
      return;
    }
    const _0x40f4c0 = typeof _0x39283a === "string" ? { "id": _0x39283a } : _0x39283a;
    if (!_0x40f4c0["id"]) {
      this["_basemapStatus"] = "ready", this["_currentBasemapId"] = void 0;
      return;
    }
    this["_basemapStatus"] = "loading", this["_currentBasemapId"] = _0x40f4c0["id"];
    const _0x46f462 = this["resolveBasemapUrl"](_0x40f4c0), _0x592bb3 = new UrlTemplateImageryProvider({ "url": _0x46f462 }), _0x1dffbd = trackProviderRequests(_0x592bb3);
    this["_cancelBasemapRequests"] = _0x1dffbd;
    const _0x2a0f98 = this["viewer"]["imageryLayers"]["addImageryProvider"](_0x592bb3, 0);
    this["deps"]["addBasemapImageryLayer"](BASEMAP_LAYER_ID, _0x40f4c0["id"], _0x2a0f98), this["_stopBasemapWatch"] = watchBasemap(this["viewer"], { "ensureFallbackBasemap": () => this["ensureFallbackBasemap"](), "clearFallbackBasemap": () => this["clearFallbackBasemap"](), "removeBasemapLayer": () => {
      _0x1dffbd(), this["deps"]["removeLayer"](BASEMAP_LAYER_ID);
    }, "emit": (_0x5dd123, _0xa1d7fa) => this["deps"]["emit"](_0x5dd123, _0xa1d7fa), "setStatus": (_0x356257) => {
      this["_basemapStatus"] = _0x356257;
    }, "isCurrentGeneration": (_0x444bb9) => _0x444bb9 === this["_basemapGeneration"] }, _0x170956, _0x40f4c0["id"], _0x2a0f98, _0x592bb3);
  }
  ["stop"]() {
    var _a2, _b;
    (_a2 = this["_stopBasemapWatch"]) == null ? void 0 : _a2.call(this), (_b = this["_cancelBasemapRequests"]) == null ? void 0 : _b.call(this), this["_cancelBasemapRequests"] = void 0;
  }
  ["addFallbackBasemap"]() {
    const _0x1a6f58 = new SingleTileImageryProvider({ "url": FALLBACK_WORLD_IMAGE, "tileWidth": 5400, "tileHeight": 2700, "credit": "NASA Earth Observatory (Blue Marble)" }), _0x4f9a34 = this["viewer"]["imageryLayers"]["addImageryProvider"](_0x1a6f58, 0);
    this["_fallbackBasemapLayer"] = _0x4f9a34;
  }
  ["ensureFallbackBasemap"]() {
    if (this["_fallbackBasemapLayer"] !== null) return;
    try {
      this["addFallbackBasemap"]();
    } catch (_0x305170) {
      console["warn"]("[tucbs-core] Basemap yedek goruntusu eklenemedi:", _0x305170);
    }
  }
  ["clearFallbackBasemap"]() {
    this["_fallbackBasemapLayer"] !== null && (this["viewer"]["imageryLayers"]["remove"](this["_fallbackBasemapLayer"], !![]), this["_fallbackBasemapLayer"] = null);
  }
  ["resolveBasemapUrl"](_0xe94a33) {
    const _0x1cee29 = (_0x545f77) => {
      const _0x259098 = this["deps"]["getProxyBase"](), _0x37cca1 = _0x259098 + "https://atlas.harita.gov.tr/" + _0x545f77 + "/{z}/{x}/{y}.png";
      return this["appendTucbsApiKeyQuery"](_0x37cca1);
    };
    switch (_0xe94a33["id"]) {
      case "hgm-temel":
        return _0x1cee29("temel");
      case "hgm-ortofoto":
        return _0x1cee29("ortofotoservis");
      case "hgm-siyasi":
        return _0x1cee29("siyasi");
      case "hgm-yukseklik":
        return _0x1cee29("yukseklik");
      default:
        return _0xe94a33["id"];
    }
  }
  ["appendTucbsApiKeyQuery"](_0x73d86) {
    const _0x3ec8ce = this["deps"]["getApiKey"]();
    if (!_0x3ec8ce) return _0x73d86;
    const _0x33f154 = _0x73d86["includes"]("?") ? "&" : "?";
    return "" + _0x73d86 + _0x33f154 + "tucbsapikey=" + encodeURIComponent(_0x3ec8ce);
  }
}
function nextFrame(_0x52d6aa) {
  return new Promise((_0x382b84) => {
    const _0x3acb73 = () => {
      _0x52d6aa["scene"]["postRender"]["removeEventListener"](_0x3acb73), _0x382b84();
    };
    _0x52d6aa["scene"]["postRender"]["addEventListener"](_0x3acb73), _0x52d6aa["scene"]["requestRender"]();
  });
}
async function captureCanvasBlob(_0xb9bc72, _0x4e4b31, _0xba5cea) {
  const _0x1a0f78 = _0xb9bc72["canvas"];
  if (typeof _0x1a0f78["toBlob"] === "function") return new Promise((_0x49a5ad, _0x337c46) => {
    _0x1a0f78["toBlob"]((_0xd33044) => _0xd33044 ? _0x49a5ad(_0xd33044) : _0x337c46(new Error("canvas.toBlob basarisiz oldu")), _0x4e4b31, _0xba5cea);
  });
  const _0x199d60 = _0x1a0f78["toDataURL"](_0x4e4b31, _0xba5cea), _0x2c40fd = _0x199d60["split"](",")[1] ?? "", _0x5c3197 = atob(_0x2c40fd), _0x503cee = new Uint8Array(_0x5c3197["length"]);
  for (let _0x21e7f5 = 0; _0x21e7f5 < _0x5c3197["length"]; _0x21e7f5++) _0x503cee[_0x21e7f5] = _0x5c3197["charCodeAt"](_0x21e7f5);
  return new Blob([_0x503cee], { "type": _0x4e4b31 });
}
function measureGroundMetersPerPixel(_0x2e40d9) {
  const _0x55593d = _0x2e40d9["scene"], _0x21e515 = _0x2e40d9["camera"], _0x521e6c = _0x2e40d9["canvas"], _0x39d3c0 = _0x521e6c["clientWidth"] / 2, _0x19dfa0 = _0x521e6c["clientHeight"] / 2, _0x4321b2 = _0x21e515["getPickRay"](new Cartesian2(_0x39d3c0 - 1, _0x19dfa0)), _0x104581 = _0x21e515["getPickRay"](new Cartesian2(_0x39d3c0 + 1, _0x19dfa0));
  if (!_0x4321b2 || !_0x104581) return null;
  const _0x5777b6 = _0x55593d["globe"]["pick"](_0x4321b2, _0x55593d), _0x37c7e4 = _0x55593d["globe"]["pick"](_0x104581, _0x55593d);
  if (!_0x5777b6 || !_0x37c7e4) return null;
  return Cartesian3["distance"](_0x5777b6, _0x37c7e4) / 2;
}
function toOrientedDestination(_0x15fa5f) {
  return { "destination": Cartesian3["fromDegrees"](_0x15fa5f["longitude"], _0x15fa5f["latitude"], _0x15fa5f["height"]), "orientation": { "heading": _0x248e3b["toRadians"](_0x15fa5f["heading"] ?? 0), "pitch": _0x248e3b["toRadians"](_0x15fa5f["pitch"] ?? -90), "roll": _0x248e3b["toRadians"](_0x15fa5f["roll"] ?? 0) } };
}
function setView(_0x556cdb, _0x5dda88) {
  _0x556cdb["camera"]["setView"](toOrientedDestination(_0x5dda88));
}
function setExtent(_0x59f957, _0x19e372) {
  _0x59f957["camera"]["setView"]({ "destination": Rectangle["fromDegrees"](_0x19e372["west"], _0x19e372["south"], _0x19e372["east"], _0x19e372["north"]) });
}
function flyTo(_0x13603f, _0x5a8978) {
  _0x13603f["camera"]["flyTo"](toOrientedDestination(_0x5a8978));
}
function zoomTo(_0x16b790, _0x5bc586, _0x34d9cb, _0x2816b6) {
  _0x16b790["camera"]["setView"]({ "destination": Cartesian3["fromDegrees"](_0x5bc586, _0x34d9cb, _0x2816b6) });
}
async function zoomToLayer(_0x170b37, _0x59638f) {
  return _0x170b37["zoomTo"](_0x59638f["cesiumObject"], new HeadingPitchRange(0, -_0x248e3b["PI_OVER_TWO"], 0));
}
function trimSlash(_0x2cbcfd) {
  return _0x2cbcfd["replace"](/\/+$/, "");
}
async function validateApiKey(_0x19c5e7, _0x4ad79f = getUcbpApiBase()) {
  if (!_0x19c5e7) return;
  const _0x274496 = trimSlash(_0x4ad79f) + "/auth/validate";
  let _0x494073;
  try {
    _0x494073 = await fetch(_0x274496, { "method": "GET", "headers": { "X-API-Key": _0x19c5e7 } });
  } catch (_0x38e949) {
    const _0x2469c6 = _0x38e949 instanceof Error ? _0x38e949["message"] : String(_0x38e949);
    throw new ApiKeyValidationError(_0x2469c6);
  }
  if (!_0x494073["ok"]) {
    let _0x51bcdb, _0x1342e3, _0x3c08ae, _0x37290f;
    try {
      const _0x1d0c05 = await _0x494073["json"]();
      _0x51bcdb = _0x1d0c05["title"], _0x1342e3 = _0x1d0c05["message"] || _0x1d0c05["mesaj"], _0x3c08ae = _0x1d0c05["reason"], _0x37290f = _0x1d0c05["detail"];
    } catch {
    }
    const _0x33022d = {};
    if (_0x51bcdb !== void 0) _0x33022d["title"] = _0x51bcdb;
    if (_0x3c08ae !== void 0) _0x33022d["reason"] = _0x3c08ae;
    if (_0x37290f !== void 0) _0x33022d["detail"] = _0x37290f;
    throw new ApiKeyValidationError(_0x1342e3 || "HTTP " + _0x494073["status"], _0x33022d);
  }
}
async function ensureEffectiveApiKeyValid(_0x591c45, _0x39e240) {
  const _0x501219 = _0x591c45 || getGlobalApiKey();
  if (!_0x501219) throw new ApiKeyValidationError("Haritayı görüntülemek için geçerli bir apiKey gereklidir.", { "title": "API Anahtarı Eksik", "reason": "missing-key", "code": "API_KEY_MISSING" });
  await validateApiKey(_0x501219, _0x39e240);
}
const DRAWING_LAYER_ID = "__tucbs_drawing_layer__", DRAWING_LAYER_TITLE = "Çizim Katmanı", MEASURE_LAYER_ID = "__tucbs_measure_layer__", MEASURE_LAYER_TITLE = "Ölçü Katmanı", MAX_ZOOM_DISTANCE_METERS = 25e6, MAX_ZOOM_OUT_SCALE_DENOMINATOR = 25e6, MAX_ZOOM_SCALE_DENOMINATOR = 100, MIN_ZOOM_DISTANCE_METERS = 10, DEFAULT_INITIAL_EXTENT = { "west": 22.94, "south": 34.05, "east": 47.39, "north": 42.7 };
let Map$1 = (_a = class {
  constructor(_0xbba2ac, _0x45c0d2 = {}) {
    __privateAdd(this, _unregisterApiKeyRefresh);
    __privateAdd(this, _removeLodSeamGuard);
    __privateAdd(this, _removeMinZoomScale);
    __privateAdd(this, _removeScaleWheelZoom);
    __privateAdd(this, _apiKey3);
    ensureCesiumRuntime();
    const _0x24fa4e = document["createElement"]("div");
    _0x24fa4e["style"]["display"] = "none", this["viewer"] = new Viewer(_0xbba2ac, this["buildViewerOptions"](_0x45c0d2, _0x24fa4e)), this["viewer"]["scene"]["globe"]["baseColor"] = Color["fromCssColorString"]("#a3c6e0"), this["viewer"]["scene"]["screenSpaceCameraController"]["maximumZoomDistance"] = MAX_ZOOM_DISTANCE_METERS, this["viewer"]["scene"]["screenSpaceCameraController"]["minimumZoomDistance"] = MIN_ZOOM_DISTANCE_METERS;
    const _0x1607d1 = _0x45c0d2["apiKey"] ?? getGlobalApiKey();
    __privateSet(this, _apiKey3, _0x1607d1), this["layerManager"] = new LayerManager(this["viewer"]), this["selectionHighlight"] = new SelectionHighlight(this["viewer"]), this["layerManager"]["configure"]({ ..._0x1607d1 !== void 0 && { "apiKey": _0x1607d1 }, ..._0x45c0d2["trustedApiKeyHosts"] !== void 0 && { "trustedApiKeyHosts": _0x45c0d2["trustedApiKeyHosts"] }, ..._0x45c0d2["apiKeyDiscoveryUrl"] !== void 0 && { "apiKeyDiscoveryUrl": _0x45c0d2["apiKeyDiscoveryUrl"] } }), this["interactionManager"] = new InteractionManager(this["viewer"]), this["drawingManager"] = new DrawingManager(this["viewer"], this["interactionManager"]), this["analysisManager"] = new AnalysisManager({ "apiKey": _0x1607d1 ?? "" }), this["basemapController"] = new BasemapController(this["viewer"], { "removeBasemapLayers": () => this["layerManager"]["_removeBasemapLayers"](), "addBasemapImageryLayer": (_0x28486a, _0xaae41d, _0x312f17) => this["layerManager"]["_addBasemapImageryLayer"](_0x28486a, _0xaae41d, _0x312f17), "removeLayer": (_0x3ae76d) => this["layerManager"]["removeLayer"](_0x3ae76d), "emit": (_0x5cc019, _0x1b3342) => this["layerManager"]["emit"](_0x5cc019, _0x1b3342), "getProxyBase": () => getProxyBase(), "getApiKey": () => __privateGet(this, _apiKey3) }), _0x45c0d2["apiKey"] === void 0 && this["registerGlobalApiKeyRotation"](_0x1607d1), this["wireShapeSource"]("draw", DRAWING_LAYER_ID, DRAWING_LAYER_TITLE, (_0x51e727, _0x1e3535, _0x5107e2) => this["layerManager"]["_addDrawnShape"](_0x51e727, _0x1e3535, _0x5107e2)), this["wireShapeSource"]("measure", MEASURE_LAYER_ID, MEASURE_LAYER_TITLE, (_0x56ca08, _0x2e4ed2, _0xfc1cfd) => this["layerManager"]["_addMeasuredShape"](_0x56ca08, _0x2e4ed2, _0xfc1cfd)), _0x45c0d2["camera"] !== void 0 ? this["setView"](_0x45c0d2["camera"]) : this["setExtent"](_0x45c0d2["initialExtent"] ?? DEFAULT_INITIAL_EXTENT), __privateSet(this, _removeLodSeamGuard, installLodSeamGuard(this["viewer"])), __privateSet(this, _removeMinZoomScale, installMinZoomScale(this["viewer"], MAX_ZOOM_SCALE_DENOMINATOR, MAX_ZOOM_OUT_SCALE_DENOMINATOR)), __privateSet(this, _removeScaleWheelZoom, installScaleWheelZoom(this["viewer"])), this["setBasemap"](_0x45c0d2["basemap"]);
  }
  async ["ensureApiKeyValid"]() {
    await validateApiKey(__privateGet(this, _apiKey3) ?? "", getUcbpApiBase());
  }
  async ["runBuffer"](_0x3ed2c4, _0x292f08) {
    const _0x173e42 = await this["analysisManager"]["buffer"](_0x3ed2c4), _0x451ebe = (_0x292f08 == null ? void 0 : _0x292f08["id"]) ?? "buffer-" + Date["now"](), _0x7facfb = (_0x292f08 == null ? void 0 : _0x292f08["title"]) ?? "Tampon sonucu (" + _0x3ed2c4["distanceM"] + "m)";
    this["layerManager"]["markAnalysisResult"](_0x451ebe);
    const _0x124662 = await this["layerManager"]["add"]("GEOJSON", { "id": _0x451ebe, "title": _0x7facfb, "data": _0x173e42["geojson"], "layerType": "GEOJSON", "clampToGround": !![] });
    return _0x124662;
  }
  async ["runIntersection"](_0x249e7b, _0x39809c) {
    const _0x2eff32 = await this["analysisManager"]["intersection"](_0x249e7b), _0x591c05 = (_0x39809c == null ? void 0 : _0x39809c["id"]) ?? "intersection-" + Date["now"](), _0x14d3f6 = (_0x39809c == null ? void 0 : _0x39809c["title"]) ?? "Kesişim sonucu";
    this["layerManager"]["markAnalysisResult"](_0x591c05);
    const _0x11c9cd = await this["layerManager"]["add"]("GEOJSON", { "id": _0x591c05, "title": _0x14d3f6, "data": _0x2eff32["geojson"], "layerType": "GEOJSON", "clampToGround": !![] });
    return _0x11c9cd;
  }
  async ["runBoundary"](_0x241a82, _0xf279b5) {
    const _0x4de53d = await this["analysisManager"]["boundary"](_0x241a82);
    return this["addAnalysisGeoJson"]((_0xf279b5 == null ? void 0 : _0xf279b5["id"]) ?? "boundary-" + Date["now"](), (_0xf279b5 == null ? void 0 : _0xf279b5["title"]) ?? "Sınır sonucu", _0x4de53d["geojson"]);
  }
  async ["runClip"](_0x3b9e4c, _0x243b5b) {
    const _0x1064fa = await this["analysisManager"]["clip"](_0x3b9e4c);
    return this["addAnalysisGeoJson"]((_0x243b5b == null ? void 0 : _0x243b5b["id"]) ?? "clip-" + Date["now"](), (_0x243b5b == null ? void 0 : _0x243b5b["title"]) ?? "Kırpma sonucu", _0x1064fa["geojson"]);
  }
  async ["runDifference"](_0x1478b5, _0x4f84b0) {
    const _0x4cdc6d = await this["analysisManager"]["difference"](_0x1478b5);
    return this["addAnalysisGeoJson"]((_0x4f84b0 == null ? void 0 : _0x4f84b0["id"]) ?? "difference-" + Date["now"](), (_0x4f84b0 == null ? void 0 : _0x4f84b0["title"]) ?? "Fark sonucu", _0x4cdc6d["geojson"]);
  }
  async ["runSubtract"](_0x2a2680, _0xfcbcdd) {
    const _0x263081 = await this["analysisManager"]["subtract"](_0x2a2680);
    return this["addAnalysisGeoJson"]((_0xfcbcdd == null ? void 0 : _0xfcbcdd["id"]) ?? "subtract-" + Date["now"](), (_0xfcbcdd == null ? void 0 : _0xfcbcdd["title"]) ?? "Çıkarma sonucu", _0x263081["geojson"]);
  }
  async ["runUnion"](_0x1d322c, _0x4c59e4) {
    const _0x2f7120 = await this["analysisManager"]["union"](_0x1d322c);
    return this["addAnalysisGeoJson"]((_0x4c59e4 == null ? void 0 : _0x4c59e4["id"]) ?? "union-" + Date["now"](), (_0x4c59e4 == null ? void 0 : _0x4c59e4["title"]) ?? "Birleştir sonucu", _0x2f7120["geojson"]);
  }
  async ["runWedgeBuffer"](_0x1ef09c, _0x34969e) {
    const _0x562c1d = await this["analysisManager"]["wedgeBuffer"](_0x1ef09c);
    return this["addAnalysisGeoJson"]((_0x34969e == null ? void 0 : _0x34969e["id"]) ?? "wedge-" + Date["now"](), (_0x34969e == null ? void 0 : _0x34969e["title"]) ?? "Kama tampon sonucu", _0x562c1d["geojson"]);
  }
  async ["addAnalysisGeoJson"](_0xbb6ec7, _0x5cd7b2, _0x90f83c) {
    return this["layerManager"]["markAnalysisResult"](_0xbb6ec7), this["layerManager"]["add"]("GEOJSON", { "id": _0xbb6ec7, "title": _0x5cd7b2, "data": _0x90f83c, "layerType": "GEOJSON", "clampToGround": !![] });
  }
  ["setView"](_0x2cbff0) {
    setView(this["viewer"], _0x2cbff0);
  }
  ["setExtent"](_0x23d5b5) {
    setExtent(this["viewer"], _0x23d5b5);
  }
  ["flyTo"](_0x45126f) {
    flyTo(this["viewer"], _0x45126f);
  }
  ["zoomTo"](_0x3921da, _0x251dbb, _0xab1c98) {
    zoomTo(this["viewer"], _0x3921da, _0x251dbb, _0xab1c98);
  }
  ["zoomInStep"]() {
    scaleZoomStep(this["viewer"], 1);
  }
  ["zoomOutStep"]() {
    scaleZoomStep(this["viewer"], -1);
  }
  async ["zoomToLayer"](_0x26cab4) {
    return zoomToLayer(this["viewer"], _0x26cab4);
  }
  ["dropMarker"](_0x50b164, _0x2e2abd, _0x1d36c9, _0x1cf845 = {}) {
    this["clearMarker"](), this["_removeMarker"] = createMarkerOverlay(this["viewer"], _0x50b164, _0x2e2abd, _0x1d36c9, _0x1cf845);
  }
  ["clearMarker"]() {
    var _a2;
    (_a2 = this["_removeMarker"]) == null ? void 0 : _a2.call(this), this["_removeMarker"] = void 0;
  }
  get ["basemapStatus"]() {
    return this["basemapController"]["status"];
  }
  ["setBasemap"](_0x52aaef) {
    this["basemapController"]["set"](_0x52aaef);
  }
  ["setMode"](_0x13e526) {
    _0x13e526 === "2D" ? this["viewer"]["scene"]["morphTo2D"](0) : this["viewer"]["scene"]["morphTo3D"](0);
  }
  ["setQuality"](_0x3af03c) {
    const _0x543281 = Math["min"](100, Math["max"](0, _0x3af03c));
    this["viewer"]["resolutionScale"] = Math["max"](0.1, _0x543281 / 100);
  }
  ["resize"]() {
    this["viewer"]["resize"]();
  }
  async ["exportJPEG"](_0x33dddb = "tucbs-harita", _0x212830 = 0.92) {
    const _0x4cfad0 = await this["captureScreenshotBlob"](_0x212830);
    triggerDownload(_0x4cfad0, _0x33dddb + "-" + Date["now"]() + ".jpg");
  }
  async ["captureScreenshotBlob"](_0x3dc91e = 0.92) {
    return await nextFrame(this["viewer"]), captureCanvasBlob(this["viewer"], "image/jpeg", _0x3dc91e);
  }
  ["measureGroundMetersPerPixel"]() {
    return measureGroundMetersPerPixel(this["viewer"]);
  }
  ["buildViewerOptions"](_0x1c3b5a, _0x1918d4) {
    return { "timeline": _0x1c3b5a["timeline"] ?? ![], "animation": _0x1c3b5a["animation"] ?? ![], "baseLayerPicker": _0x1c3b5a["baseLayerPicker"] ?? ![], "baseLayer": ![], "geocoder": _0x1c3b5a["geocoder"] ?? ![], "homeButton": _0x1c3b5a["homeButton"] ?? ![], "sceneModePicker": _0x1c3b5a["sceneModePicker"] ?? ![], "navigationHelpButton": _0x1c3b5a["navigationHelpButton"] ?? ![], "infoBox": _0x1c3b5a["infoBox"] ?? ![], "selectionIndicator": _0x1c3b5a["selectionIndicator"] ?? ![], "shadows": _0x1c3b5a["shadows"] ?? ![], "shouldAnimate": _0x1c3b5a["shouldAnimate"] ?? ![], "fullscreenButton": _0x1c3b5a["fullscreenButton"] ?? ![], "creditContainer": _0x1918d4, ..._0x1c3b5a["cesiumOptions"] };
  }
  ["registerGlobalApiKeyRotation"](_0x279cd2) {
    _0x279cd2 !== void 0 && console["info"]("[@tucbs/core] Bu Map instance'i configureTucbs() global apiKey'ini kullaniyor (kendi apiKey attribute'u/options'u verilmedi). Farkli bir anahtar gerekiyorsa Map/component'e acikca apiKey verin."), __privateSet(this, _unregisterApiKeyRefresh, registerApiKeyRefresh(() => {
      const _0x1742f4 = getGlobalApiKey();
      __privateSet(this, _apiKey3, _0x1742f4), this["layerManager"]["configure"]({ ..._0x1742f4 !== void 0 && { "apiKey": _0x1742f4 } }), this["analysisManager"]["configure"]({ "apiKey": _0x1742f4 ?? "" }), void this["ensureApiKeyValid"]()["catch"]((_0x3b4ab6) => {
        console["error"]("[@tucbs/core] apiKey rotasyon validate basarisiz:", _0x3b4ab6);
      }), this["basemapController"]["currentBasemapId"] !== void 0 && this["setBasemap"](this["basemapController"]["currentBasemapId"]);
    }));
  }
  ["wireShapeSource"](_0x1e0b2a, _0x161f0a, _0x1ed586, _0x3dcb5b) {
    this["drawingManager"]["on"]("draw:complete", ({ shape: _0x2afca7 }) => {
      if (_0x2afca7["source"] !== _0x1e0b2a) return;
      void _0x3dcb5b(_0x161f0a, _0x1ed586, _0x2afca7);
    }), this["drawingManager"]["on"]("draw:remove", ({ shape: _0x2be015 }) => {
      if (_0x2be015["source"] !== _0x1e0b2a) return;
      this["layerManager"]["_removeDrawnShape"](_0x161f0a, _0x2be015["entity"]);
    });
  }
  ["showSelectionHighlight"](_0x4c6da0) {
    this["selectionHighlight"]["show"](_0x4c6da0);
  }
  ["clearSelectionHighlight"]() {
    this["selectionHighlight"]["clear"]();
  }
  ["destroy"]() {
    var _a2, _b, _c, _d;
    this["clearMarker"](), this["selectionHighlight"]["clear"](), this["basemapController"]["stop"](), (_a2 = __privateGet(this, _unregisterApiKeyRefresh)) == null ? void 0 : _a2.call(this), (_b = __privateGet(this, _removeLodSeamGuard)) == null ? void 0 : _b.call(this), (_c = __privateGet(this, _removeMinZoomScale)) == null ? void 0 : _c.call(this), (_d = __privateGet(this, _removeScaleWheelZoom)) == null ? void 0 : _d.call(this), this["drawingManager"]["destroy"](), this["interactionManager"]["destroy"](), this["layerManager"]["destroy"](), this["viewer"]["destroy"]();
  }
}, _unregisterApiKeyRefresh = new WeakMap(), _removeLodSeamGuard = new WeakMap(), _removeMinZoomScale = new WeakMap(), _removeScaleWheelZoom = new WeakMap(), _apiKey3 = new WeakMap(), _a);
const HGM_BASEMAP_IDS = ["hgm-temel", "hgm-ortofoto", "hgm-siyasi", "hgm-yukseklik"];
export {
  AnalysisManager,
  AnalysisRequestError,
  ApiKeyValidationError,
  DEFAULT_UCBP_API_BASE as DEFAULT_ANALYSIS_API_BASE,
  DEFAULT_INITIAL_EXTENT,
  DEFAULT_UCBP_API_BASE,
  DrawingManager,
  GeometryError,
  HGM_BASEMAP_IDS,
  InteractionManager,
  LayerManager,
  LayerOperationError,
  MEASURE_LAYER_ID,
  Map$1 as Map,
  OgcRequestError,
  TucbsError,
  buildCapabilitiesUrl,
  configureTucbs,
  detectServiceType,
  ensureEffectiveApiKeyValid,
  entityToGeoJSON,
  featureLabel,
  fetchWcsCoverageExtents,
  getCapabilities,
  getErrorCodes,
  getProxyBase,
  getUcbpApiBase,
  measureGround,
  parseCapabilities,
  parseWcsTiffFormat,
  parseWmsTiffFormat,
  registerApiKeyRefresh,
  snapScaleForDisplay,
  validateApiKey,
  wcsRectangleFor
};
