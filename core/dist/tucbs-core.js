var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _apiKey, _apiKey2, _AnalysisManager_instances, post_fn, _unregisterApiKeyRefresh, _removeLodSeamGuard, _removeMinZoomScale, _removeScaleWheelZoom, _apiKey3, _a;
import { Math as _0x584e42, SceneMode, EllipsoidTerrainProvider, Cartesian2, Cartesian3, CameraEventType, Ellipsoid, JulianDate, Cartographic, ConstantProperty, PropertyBag, PolygonHierarchy, ColorMaterialProperty, Color, CallbackProperty, HeadingPitchRange, BoundingSphere, Entity, PolylineGraphics, ConstantPositionProperty, PointGraphics, CustomDataSource, GeoJsonDataSource, KmlDataSource, Rectangle, WebMapServiceImageryProvider, GetFeatureInfoFormat, Resource, WebMapTileServiceImageryProvider, WebMercatorTilingScheme, ImageryLayer, SingleTileImageryProvider, HeightReference, ScreenSpaceEventHandler, ScreenSpaceEventType, UrlTemplateImageryProvider, Viewer } from "cesium";
function ensureCesiumRuntime() {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  const _0x5064c4 = window;
  !_0x5064c4["CESIUM_BASE_URL"] && (_0x5064c4["CESIUM_BASE_URL"] = "https://cdn.jsdelivr.net/npm/cesium@1.143.0/Build/Cesium/", console["info"]("[gizLog] cesium base url atandi surum=1.143.0"));
  const _0x429ad4 = _0x5064c4["CESIUM_BASE_URL"]["replace"](/\/?$/, "/"), _0x1fcd6e = Array["from"](document["querySelectorAll"]("link"))["some"]((_0x3094b6) => (_0x3094b6["getAttribute"]("href") || "")["includes"]("Widgets/widgets.css"));
  if (_0x1fcd6e) return;
  const _0x34db8b = document["createElement"]("link");
  _0x34db8b["rel"] = "stylesheet", _0x34db8b["href"] = _0x429ad4 + "Widgets/widgets.css", document["head"]["appendChild"](_0x34db8b), console["info"]("[gizLog] cesium widgets.css eklendi");
}
const MAX_LEVEL = 24, EARTH_RADIUS = 6371e3, CORNER_SAFETY = 1.15;
function cornerDistanceRatio(_0x197b83, _0x36119e, _0x4819be) {
  const _0x2f1d66 = Math["tan"](_0x197b83 / 2), _0x26d60f = _0x2f1d66 * _0x36119e, _0x3f19b7 = Math["atan"](Math["hypot"](_0x26d60f, _0x2f1d66)), _0x3a777c = EARTH_RADIUS + _0x4819be, _0x5b0dcd = EARTH_RADIUS * EARTH_RADIUS - _0x3a777c * _0x3a777c * Math["sin"](_0x3f19b7) ** 2, _0x3dc6e8 = _0x5b0dcd > 0 ? _0x3a777c * Math["cos"](_0x3f19b7) - Math["sqrt"](_0x5b0dcd) : Math["sqrt"](_0x3a777c * _0x3a777c - EARTH_RADIUS * EARTH_RADIUS);
  return _0x3dc6e8 / _0x4819be * CORNER_SAFETY;
}
function lodTransitionDistances(_0x300860) {
  const { drawingBufferHeight: _0x256642, sseDenominator: _0x15616f, maximumScreenSpaceError: _0xb90017, pixelRatio: _0x1f3463 } = _0x300860, _0x453983 = [];
  for (let _0x3f7f85 = 0; _0x3f7f85 <= MAX_LEVEL; _0x3f7f85++) {
    const _0x4c8b2d = _0x300860["geometricError"](_0x3f7f85) * _0x256642 / (_0x15616f * _0xb90017 * _0x1f3463);
    if (Number["isFinite"](_0x4c8b2d) && _0x4c8b2d > 0) _0x453983["push"](_0x4c8b2d);
  }
  return _0x453983["sort"]((_0x12b361, _0x353294) => _0x12b361 - _0x353294);
}
const SEAM_MARGIN = 1.01;
function seamFreeScreenSpaceError(_0x33ecb3, _0x347a92) {
  const _0x3b4950 = _0x347a92["maximumScreenSpaceError"], _0x27b8e4 = cornerDistanceRatio(_0x347a92["fovy"], _0x347a92["aspectRatio"], _0x33ecb3);
  for (const _0x5b1870 of lodTransitionDistances(_0x347a92)) {
    if (_0x5b1870 > _0x33ecb3 && _0x5b1870 < _0x33ecb3 * _0x27b8e4) {
      const _0x32b1df = _0x3b4950 * (_0x5b1870 / _0x33ecb3) * SEAM_MARGIN, _0x90b745 = _0x3b4950 * _0x5b1870 / (_0x33ecb3 * _0x27b8e4 * SEAM_MARGIN);
      return Math["abs"](Math["log"](_0x32b1df / _0x3b4950)) <= Math["abs"](Math["log"](_0x90b745 / _0x3b4950)) ? _0x32b1df : _0x90b745;
    }
  }
  return _0x3b4950;
}
const NADIR_TOLERANCE_DEGREES = 3;
function installLodSeamGuard(_0x1b3349) {
  const _0x47f37e = _0x1b3349["scene"], _0xd9685a = _0x47f37e["globe"];
  if (!_0xd9685a) return () => void 0;
  let _0xeafe9 = _0xd9685a["maximumScreenSpaceError"], _0x226d1d = _0xeafe9;
  const _0x578d4e = (_0xda0daa) => {
    if (_0xd9685a["maximumScreenSpaceError"] !== _0xda0daa) _0xd9685a["maximumScreenSpaceError"] = _0xda0daa;
    _0x226d1d = _0xda0daa;
  }, _0x2c7ab6 = () => {
    if (_0xd9685a["maximumScreenSpaceError"] !== _0x226d1d) _0xeafe9 = _0xd9685a["maximumScreenSpaceError"];
    const _0x1c27bf = _0x47f37e["camera"]["frustum"], _0x5b9723 = Math["abs"](_0x584e42["toDegrees"](_0x47f37e["camera"]["pitch"]) + 90) <= NADIR_TOLERANCE_DEGREES;
    if (_0x47f37e["mode"] !== SceneMode["SCENE3D"] || !_0x5b9723 || !(_0x47f37e["terrainProvider"] instanceof EllipsoidTerrainProvider) || _0x1c27bf["fovy"] === void 0 || _0x1c27bf["aspectRatio"] === void 0 || _0x1c27bf["sseDenominator"] === void 0) {
      _0x578d4e(_0xeafe9);
      return;
    }
    const _0x534372 = _0x47f37e["terrainProvider"], _0x7eb56c = { "geometricError": (_0x77112e) => _0x534372["getLevelMaximumGeometricError"](_0x77112e), "drawingBufferHeight": _0x47f37e["drawingBufferHeight"], "sseDenominator": _0x1c27bf["sseDenominator"], "maximumScreenSpaceError": _0xeafe9, "pixelRatio": _0x47f37e["pixelRatio"] ?? 1, "fovy": _0x1c27bf["fovy"], "aspectRatio": _0x1c27bf["aspectRatio"] };
    _0x578d4e(seamFreeScreenSpaceError(_0x47f37e["camera"]["positionCartographic"]["height"], _0x7eb56c));
  }, _0x5bb00c = _0x47f37e["preRender"]["addEventListener"](_0x2c7ab6);
  return () => {
    _0x5bb00c(), !_0x47f37e["isDestroyed"]() && _0xd9685a["maximumScreenSpaceError"] === _0x226d1d && (_0xd9685a["maximumScreenSpaceError"] = _0xeafe9);
  };
}
const SCREEN_DPI$1 = 96, METERS_PER_INCH$1 = 0.0254, REWRITE_TOLERANCE = 5e-3;
function minZoomDistanceForScale(_0x4c09cf, _0x1a04e3, _0x277c72) {
  const _0x2e4587 = Math["tan"](_0x277c72 / 2), _0x3ec49c = _0x4c09cf * METERS_PER_INCH$1 / SCREEN_DPI$1 * _0x1a04e3 / (2 * _0x2e4587);
  return Number["isFinite"](_0x3ec49c) && _0x3ec49c > 0 ? _0x3ec49c : null;
}
const SNAP_WINDOW_RATIO = 1.06, MIN_SNAP_GAP_METERS = 1e-3, SNAP_DURATION_MS = 150;
function snapToMinAmount(_0x976a70, _0x47984d) {
  const _0x27e348 = _0x976a70 - _0x47984d;
  if (!(_0x27e348 > MIN_SNAP_GAP_METERS) || _0x976a70 > _0x47984d * SNAP_WINDOW_RATIO) return 0;
  return _0x27e348;
}
function installMinZoomScale(_0x4643e6, _0x2a5a35, _0x43435b) {
  const _0x3d4176 = _0x4643e6["scene"], _0x40594d = _0x3d4176["screenSpaceCameraController"], _0x354b40 = () => {
    const _0x39aa4a = _0x3d4176["camera"]["frustum"]["fovy"];
    if (_0x39aa4a === void 0) return;
    const _0xf81010 = _0x3d4176["canvas"]["clientHeight"], _0x3f1950 = minZoomDistanceForScale(_0x2a5a35, _0xf81010, _0x39aa4a);
    if (_0x3f1950 !== null) {
      const _0xede56a = _0x40594d["minimumZoomDistance"];
      Math["abs"](_0xede56a - _0x3f1950) > _0xede56a * REWRITE_TOLERANCE && (_0x40594d["minimumZoomDistance"] = _0x3f1950);
    }
    const _0x3ea63a = minZoomDistanceForScale(_0x43435b, _0xf81010, _0x39aa4a);
    if (_0x3ea63a === null) return;
    const _0x565a66 = _0x40594d["maximumZoomDistance"];
    Math["abs"](_0x565a66 - _0x3ea63a) > _0x565a66 * REWRITE_TOLERANCE && (_0x40594d["maximumZoomDistance"] = _0x3ea63a);
  }, _0x5f102e = _0x3d4176["camera"], _0x55783a = _0x3d4176["canvas"];
  let _0x2a2ed7;
  const _0x437b94 = () => {
    if (_0x2a2ed7 !== void 0) cancelAnimationFrame(_0x2a2ed7);
    _0x2a2ed7 = void 0;
  }, _0x4dc8d2 = () => {
    if (_0x2a2ed7 !== void 0) return;
    const _0x5c2a6d = snapToMinAmount(_0x5f102e["positionCartographic"]["height"], _0x40594d["minimumZoomDistance"]);
    if (_0x5c2a6d <= 0) return;
    const _0x1183aa = performance["now"]();
    let _0x2cb2a1 = 0;
    const _0x52962b = (_0x3742bd) => {
      const _0x57066d = Math["min"](1, (_0x3742bd - _0x1183aa) / SNAP_DURATION_MS), _0x513f43 = _0x5c2a6d * (1 - (1 - _0x57066d) * (1 - _0x57066d));
      if (_0x513f43 > _0x2cb2a1) _0x5f102e["zoomIn"](_0x513f43 - _0x2cb2a1);
      _0x2cb2a1 = _0x513f43, _0x2a2ed7 = _0x57066d < 1 ? requestAnimationFrame(_0x52962b) : void 0;
    };
    _0x2a2ed7 = requestAnimationFrame(_0x52962b);
  };
  _0x55783a["addEventListener"]("pointerdown", _0x437b94), _0x55783a["addEventListener"]("wheel", _0x437b94, { "passive": !![] });
  const _0x19d422 = _0x3d4176["preRender"]["addEventListener"](_0x354b40), _0x5dd17d = _0x5f102e["moveEnd"]["addEventListener"](_0x4dc8d2);
  return () => {
    _0x437b94(), _0x55783a["removeEventListener"]("pointerdown", _0x437b94), _0x55783a["removeEventListener"]("wheel", _0x437b94), _0x19d422(), _0x5dd17d();
  };
}
const ZOOM_SCALE_STEPS = [100, 250, 500, 1e3, 2500, 5e3, 1e4, 25e3, 5e4, 1e5, 25e4, 5e5, 1e6, 25e5, 5e6, 15e6, 25e6], ON_STEP_TOLERANCE = 0.03;
function nextScaleStep(_0x410d18, _0x542a54) {
  if (!(_0x410d18 > 0) || !Number["isFinite"](_0x410d18)) return null;
  if (_0x542a54 === 1) {
    const _0x1ea78b = _0x410d18 / (1 + ON_STEP_TOLERANCE);
    return [...ZOOM_SCALE_STEPS]["reverse"]()["find"]((_0x56b7ed) => _0x56b7ed < _0x1ea78b) ?? null;
  }
  const _0x4a40c5 = _0x410d18 * (1 + ON_STEP_TOLERANCE);
  return ZOOM_SCALE_STEPS["find"]((_0x4ff9bf) => _0x4ff9bf > _0x4a40c5) ?? Infinity;
}
const SCREEN_DPI = 96, METERS_PER_INCH = 0.0254;
function measureGround(_0x4e7709) {
  const _0x5f5992 = _0x4e7709["globe"];
  if (!_0x5f5992) return null;
  const _0x1d5f25 = _0x4e7709["camera"], _0x14b31a = _0x4e7709["canvas"]["clientWidth"] / 2, _0x2fe46f = _0x4e7709["canvas"]["clientHeight"] / 2, _0x1bad48 = _0x1d5f25["getPickRay"](new Cartesian2(_0x14b31a - 1, _0x2fe46f)), _0x3bd595 = _0x1d5f25["getPickRay"](new Cartesian2(_0x14b31a + 1, _0x2fe46f)), _0x5ed55c = _0x1d5f25["getPickRay"](new Cartesian2(_0x14b31a, _0x2fe46f));
  if (!_0x1bad48 || !_0x3bd595 || !_0x5ed55c) return null;
  const _0x49d697 = _0x5f5992["pick"](_0x1bad48, _0x4e7709), _0x559c7e = _0x5f5992["pick"](_0x3bd595, _0x4e7709), _0x111435 = _0x5f5992["pick"](_0x5ed55c, _0x4e7709);
  if (!_0x49d697 || !_0x559c7e || !_0x111435) return null;
  const _0x5c7cf0 = Cartesian3["distance"](_0x49d697, _0x559c7e) / 2;
  return { "scale": _0x5c7cf0 * SCREEN_DPI / METERS_PER_INCH, "distance": Cartesian3["distance"](_0x1d5f25["position"], _0x111435) };
}
const DISPLAY_SNAP_TOLERANCE = 5e-3;
function snapScaleForDisplay(_0x79c8e8) {
  const _0x1b5bb6 = ZOOM_SCALE_STEPS["find"]((_0x10840d) => Math["abs"](_0x79c8e8 - _0x10840d) <= _0x10840d * DISPLAY_SNAP_TOLERANCE);
  return _0x1b5bb6 ?? _0x79c8e8;
}
const ZOOM_ANIMATION_SECONDS = 0.25;
function easeOut(_0x1595bc) {
  return 1 - Math["pow"](1 - _0x1595bc, 3);
}
const pendingZooms = /* @__PURE__ */ new WeakMap();
function planStepAmount(_0x2d0a89, _0x19d6e3, _0x350b90, _0x4945f2) {
  const _0x1af315 = nextScaleStep(_0x2d0a89["scale"], _0x19d6e3);
  if (_0x1af315 === null) return null;
  let _0x25b5ae = _0x1af315 === Infinity ? Infinity : _0x2d0a89["distance"] * Math["abs"](1 - _0x1af315 / _0x2d0a89["scale"]);
  if (_0x19d6e3 === -1) _0x25b5ae = Math["min"](_0x25b5ae, _0x4945f2 - _0x350b90);
  return _0x25b5ae > 0 && Number["isFinite"](_0x25b5ae) ? _0x25b5ae : null;
}
function flyScaleStep(_0x4853be, _0x320fe1, _0xc260f9, _0x36912f) {
  const _0x49a847 = pendingZooms["get"](_0x4853be), _0x38d107 = (_0x49a847 == null ? void 0 : _0x49a847["ground"]) ?? _0xc260f9();
  if (!_0x38d107) return;
  const _0x2c5eea = (_0x49a847 == null ? void 0 : _0x49a847["height"]) ?? _0x4853be["positionCartographic"]["height"], _0x41ff1e = planStepAmount(_0x38d107, _0x320fe1, _0x2c5eea, _0x36912f);
  if (_0x41ff1e === null) return;
  const _0x4ca58e = (_0x49a847 == null ? void 0 : _0x49a847["position"]) ?? _0x4853be["position"], _0x3ddeca = _0x4853be["direction"], _0x18fcfa = _0x4853be["position"]["clone"]();
  _0x18fcfa["x"] = _0x4ca58e["x"] + _0x3ddeca["x"] * _0x41ff1e * _0x320fe1, _0x18fcfa["y"] = _0x4ca58e["y"] + _0x3ddeca["y"] * _0x41ff1e * _0x320fe1, _0x18fcfa["z"] = _0x4ca58e["z"] + _0x3ddeca["z"] * _0x41ff1e * _0x320fe1;
  const _0x1993fa = _0x38d107["distance"] - _0x320fe1 * _0x41ff1e, _0x19b47b = { "ground": { "scale": _0x38d107["scale"] * _0x1993fa / _0x38d107["distance"], "distance": _0x1993fa }, "height": _0x2c5eea - _0x320fe1 * _0x41ff1e, "position": _0x18fcfa }, _0x5e3a0e = () => {
    if (pendingZooms["get"](_0x4853be) === _0x19b47b) pendingZooms["delete"](_0x4853be);
  };
  _0x4853be["flyTo"]({ "destination": _0x18fcfa, "orientation": { "direction": _0x3ddeca["clone"](), "up": _0x4853be["up"]["clone"]() }, "duration": ZOOM_ANIMATION_SECONDS, "easingFunction": easeOut, "complete": _0x5e3a0e, "cancel": _0x5e3a0e }), pendingZooms["set"](_0x4853be, _0x19b47b);
}
function scaleZoomStep(_0x1f2735, _0x40996e) {
  const { camera: _0x45ae6c, scene: _0x4205c3 } = _0x1f2735;
  flyScaleStep(_0x45ae6c, _0x40996e, () => measureGround(_0x4205c3), _0x4205c3["screenSpaceCameraController"]["maximumZoomDistance"]);
}
const WHEEL_STEP_THRESHOLD_PX = 40, WHEEL_SMALL_DELTA_LOCK_MS = 200, LINE_HEIGHT_PX = 16, PAGE_HEIGHT_PX = 400;
function wheelDeltaPixels(_0x5db271, _0x37448a) {
  if (_0x37448a === 1) return _0x5db271 * LINE_HEIGHT_PX;
  if (_0x37448a === 2) return _0x5db271 * PAGE_HEIGHT_PX;
  return _0x5db271;
}
function installScaleWheelZoom(_0x4c2f5a) {
  const _0x6c7e56 = _0x4c2f5a["scene"]["canvas"], _0x29cb20 = _0x4c2f5a["scene"]["screenSpaceCameraController"], _0x52aa54 = _0x29cb20["zoomEventTypes"];
  _0x29cb20["zoomEventTypes"] = [CameraEventType["MIDDLE_DRAG"], CameraEventType["PINCH"]];
  let _0x15e1aa = 0, _0x336c23 = 0;
  const _0x381d5a = (_0x11314f) => {
    _0x11314f["preventDefault"]();
    const _0x16d1e8 = wheelDeltaPixels(_0x11314f["deltaY"], _0x11314f["deltaMode"]);
    if (_0x16d1e8 === 0) return;
    const _0x4db6d5 = performance["now"]();
    if (Math["abs"](_0x16d1e8) < WHEEL_STEP_THRESHOLD_PX && _0x4db6d5 < _0x336c23) return;
    if (Math["sign"](_0x16d1e8) !== Math["sign"](_0x15e1aa)) _0x15e1aa = 0;
    _0x15e1aa += _0x16d1e8;
    if (Math["abs"](_0x15e1aa) < WHEEL_STEP_THRESHOLD_PX) return;
    scaleZoomStep(_0x4c2f5a, _0x15e1aa < 0 ? 1 : -1), _0x15e1aa = 0, _0x336c23 = _0x4db6d5 + WHEEL_SMALL_DELTA_LOCK_MS;
  };
  return _0x6c7e56["addEventListener"]("wheel", _0x381d5a, { "passive": ![] }), () => {
    _0x6c7e56["removeEventListener"]("wheel", _0x381d5a), _0x29cb20["zoomEventTypes"] = _0x52aa54;
  };
}
function createMarkerOverlay(_0x5909c8, _0x1df8a6, _0x52c7ce, _0x2c096a, _0x408a1d = {}) {
  const _0x162cd4 = Cartesian3["fromDegrees"](_0x1df8a6, _0x52c7ce), _0x50719c = Ellipsoid["WGS84"]["geodeticSurfaceNormal"](_0x162cd4, new Cartesian3()), _0x9ee336 = new Cartesian3(), _0x21b488 = new Cartesian2(), _0x510ef9 = document["createElement"]("img");
  _0x510ef9["src"] = _0x2c096a, _0x510ef9["alt"] = "", _0x510ef9["draggable"] = ![], Object["assign"](_0x510ef9["style"], { "position": "absolute", "left": "0", "top": "0", "display": "none", "pointerEvents": "none", "userSelect": "none", "zIndex": "1", "willChange": "transform", ..._0x408a1d["width"] === void 0 ? {} : { "width": _0x408a1d["width"] + "px" }, ..._0x408a1d["height"] === void 0 ? {} : { "height": _0x408a1d["height"] + "px" } }), _0x5909c8["container"]["appendChild"](_0x510ef9);
  const _0x46770f = () => {
    const { scene: _0x45156e } = _0x5909c8;
    let _0x397505 = !![];
    _0x45156e["mode"] === SceneMode["SCENE3D"] && (Cartesian3["subtract"](_0x45156e["camera"]["positionWC"], _0x162cd4, _0x9ee336), _0x397505 = Cartesian3["dot"](_0x50719c, _0x9ee336) > 0);
    const _0x4fb502 = _0x397505 ? _0x45156e["cartesianToCanvasCoordinates"](_0x162cd4, _0x21b488) : void 0;
    if (!_0x4fb502) {
      _0x510ef9["style"]["display"] = "none";
      return;
    }
    _0x510ef9["style"]["display"] = "block";
    const _0x23d1ac = Math["round"](_0x4fb502["x"] - _0x510ef9["offsetWidth"] / 2), _0x1a01b5 = Math["round"](_0x4fb502["y"] - (_0x408a1d["anchor"] === "center" ? _0x510ef9["offsetHeight"] / 2 : _0x510ef9["offsetHeight"]));
    _0x510ef9["style"]["transform"] = "translate(" + _0x23d1ac + "px, " + _0x1a01b5 + "px)";
  }, _0xd94ebb = _0x5909c8["scene"]["postRender"]["addEventListener"](_0x46770f);
  return _0x510ef9["addEventListener"]("load", _0x46770f), _0x46770f(), () => {
    _0xd94ebb(), _0x510ef9["remove"]();
  };
}
class EventEmitter {
  constructor() {
    this["listeners"] = {};
  }
  ["on"](_0x488dff, _0x3aa221) {
    const _0x5999f6 = this["listeners"][_0x488dff];
    return _0x5999f6 !== void 0 ? _0x5999f6["add"](_0x3aa221) : this["listeners"][_0x488dff] = /* @__PURE__ */ new Set([_0x3aa221]), this;
  }
  ["off"](_0xfcb12c, _0x2a6025) {
    var _a2;
    return (_a2 = this["listeners"][_0xfcb12c]) == null ? void 0 : _a2["delete"](_0x2a6025), this;
  }
  ["once"](_0x1e164a, _0xc53b65) {
    const _0x1dfbde = (_0x407341) => {
      _0xc53b65(_0x407341), this["off"](_0x1e164a, _0x1dfbde);
    };
    return this["on"](_0x1e164a, _0x1dfbde);
  }
  ["emit"](_0x3473af, _0x8737b5) {
    const _0x213fba = this["listeners"][_0x3473af];
    if (_0x213fba === void 0) return;
    for (const _0x50cf5d of _0x213fba) {
      _0x50cf5d(_0x8737b5);
    }
  }
  ["removeAllListeners"](_0x1ecf31) {
    if (_0x1ecf31 !== void 0) delete this["listeners"][_0x1ecf31];
    else for (const _0x22e623 of Object["keys"](this["listeners"])) {
      delete this["listeners"][_0x22e623];
    }
  }
  ["listenerCount"](_0x2b5d8d) {
    var _a2;
    return ((_a2 = this["listeners"][_0x2b5d8d]) == null ? void 0 : _a2["size"]) ?? 0;
  }
}
const GLOBAL_STATE_SLOT = Symbol["for"]("@tucbs/core/globalConfigState");
function getState() {
  const _0x314c12 = globalThis;
  let _0x4e64d8 = _0x314c12[GLOBAL_STATE_SLOT];
  return !_0x4e64d8 && (_0x4e64d8 = { "apiKey": void 0, "apiBase": void 0, "proxyBase": void 0, "configured": ![], "refreshers": /* @__PURE__ */ new Set() }, Object["defineProperty"](globalThis, GLOBAL_STATE_SLOT, { "value": _0x4e64d8, "enumerable": ![], "configurable": ![], "writable": ![] })), _0x4e64d8;
}
function configureTucbs(_0x119eb2) {
  const _0x52d8e6 = getState();
  if (_0x119eb2["apiBase"] !== void 0) {
    const _0x2e15a8 = _0x119eb2["apiBase"]["trim"]()["replace"](/\/+$/, "");
    _0x52d8e6["apiBase"] = _0x2e15a8 || void 0, _0x52d8e6["configured"] = !![];
  }
  if (_0x119eb2["proxyBase"] !== void 0) {
    const _0xb1bcfc = _0x119eb2["proxyBase"]["trim"]();
    _0x52d8e6["proxyBase"] = _0xb1bcfc || void 0, _0x52d8e6["configured"] = !![];
  }
  if (_0x119eb2["apiKey"] === void 0) {
    _0x52d8e6["configured"] && _0x52d8e6["refreshers"]["forEach"]((_0x595257) => _0x595257());
    return;
  }
  _0x52d8e6["apiKey"] !== void 0 && _0x119eb2["apiKey"] !== _0x52d8e6["apiKey"] && console["warn"]("[@tucbs/core] configureTucbs() daha once farkli bir apiKey ile cagrilmisti; deger degistirildi. Bu beklenmiyorsa sayfada birden fazla script'in ayni fonksiyonu cagirdigini kontrol edin."), _0x52d8e6["apiKey"] = _0x119eb2["apiKey"], _0x52d8e6["configured"] = !![], _0x52d8e6["refreshers"]["forEach"]((_0x1fef13) => _0x1fef13());
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
function registerApiKeyRefresh(_0x3b07c1) {
  const { refreshers: _0x5b2840 } = getState();
  return _0x5b2840["add"](_0x3b07c1), () => _0x5b2840["delete"](_0x3b07c1);
}
const DEFAULT_UCBP_API_BASE = ("http://localhost:8094/ucbp-api" == null ? void 0 : "http://localhost:8094/ucbp-api"["trim"]()) || "/ucbp-api";
function trimSlash$2(_0x49725a) {
  return _0x49725a["replace"](/\/+$/, "");
}
function getUcbpApiBase() {
  const _0x432adb = getGlobalApiBase();
  if (_0x432adb) return trimSlash$2(_0x432adb);
  return trimSlash$2(DEFAULT_UCBP_API_BASE);
}
function getProxyBase() {
  const _0x430b7e = getGlobalProxyBase();
  if (_0x430b7e) return _0x430b7e;
  return console["warn"]("proxyBase yok; configureTucbs({ proxyBase }) verilmedi. main.js'te verilmeli."), "";
}
const ERROR_REGISTRY = { "API_KEY_MISSING": { "code": "API_KEY_MISSING", "number": "E001", "title": "API Anahtarı Eksik", "description": "Ne instance ne configureTucbs() ile ayarlanmış global apiKey sağlanmış." }, "API_KEY_INVALID": { "code": "API_KEY_INVALID", "number": "E002", "title": "API Anahtarı Geçersiz", "description": "Sağlanan apiKey backend tarafından reddedildi veya doğrulama isteği başarısız oldu." }, "INTERNAL_INDEX_OUT_OF_RANGE": { "code": "INTERNAL_INDEX_OUT_OF_RANGE", "number": "E003", "title": "İç Durum Hatası", "description": "Beklenen bir dizi indeksi bulunamadı (iç tutarlılık hatası)." }, "OGC_CAPABILITIES_REQUEST_FAILED": { "code": "OGC_CAPABILITIES_REQUEST_FAILED", "number": "E201", "title": "GetCapabilities İsteği Başarısız", "description": "WFS GetCapabilities isteği HTTP hata koduyla döndü." }, "OGC_CAPABILITIES_EXCEPTION": { "code": "OGC_CAPABILITIES_EXCEPTION", "number": "E202", "title": "GetCapabilities OGC Exception", "description": "WFS GetCapabilities yanıtı bir OGC ExceptionReport/ServiceExceptionReport döndürdü." }, "OGC_CAPABILITIES_PARSE_FAILED": { "code": "OGC_CAPABILITIES_PARSE_FAILED", "number": "E203", "title": "GetCapabilities Ayrıştırma Hatası", "description": "WFS GetCapabilities yanıtı geçerli XML olarak ayrıştırılamadı." }, "OGC_FEATURE_TYPE_NOT_FOUND": { "code": "OGC_FEATURE_TYPE_NOT_FOUND", "number": "E204", "title": "FeatureType Bulunamadı", "description": "WFS GetCapabilities yanıtında hiç FeatureType bulunamadı." }, "CRS_UNRESOLVED_UNSUPPORTED": { "code": "CRS_UNRESOLVED_UNSUPPORTED", "number": "E401", "title": "Koordinat Sistemi Tanınamadı", "description": "GeoJSON'daki koordinat sistemi (CRS) çözülemedi ve koordinatlar WGS84 ile uyumlu değil." }, "CRS_CLAIMED_WGS84_INVALID": { "code": "CRS_CLAIMED_WGS84_INVALID", "number": "E402", "title": "Koordinatlar WGS84 İle Uyumsuz", "description": "GeoJSON WGS84/CRS84 olduğunu belirtiyor ama koordinatlar geçerli bir enlem/boylam aralığında değil." }, "CRS_MISSING_UNSUPPORTED": { "code": "CRS_MISSING_UNSUPPORTED", "number": "E403", "title": "Koordinat Sistemi Bilgisi Yok", "description": "GeoJSON'da CRS bilgisi yok ve koordinatlar geçerli bir enlem/boylam aralığında değil." }, "ANALYSIS_API_KEY_MISSING": { "code": "ANALYSIS_API_KEY_MISSING", "number": "E301", "title": "Analiz İçin API Anahtarı Eksik", "description": "AnalysisManager'a apiKey tanımlanmadan analiz isteği yapıldı." }, "ANALYSIS_NETWORK_ERROR": { "code": "ANALYSIS_NETWORK_ERROR", "number": "E302", "title": "Analiz Ağ Hatası", "description": "Analiz isteği ağ seviyesinde (fetch) başarısız oldu." }, "ANALYSIS_REQUEST_FAILED": { "code": "ANALYSIS_REQUEST_FAILED", "number": "E303", "title": "Analiz İsteği Başarısız", "description": "Analiz backend'i HTTP hata koduyla döndü." }, "ANALYSIS_UNSUCCESSFUL": { "code": "ANALYSIS_UNSUCCESSFUL", "number": "E304", "title": "Analiz Başarısız", "description": "Analiz backend'i HTTP 200 döndü ama isSuccess/success=false işaretledi." }, "ANALYSIS_RESPONSE_MISSING_GEOJSON": { "code": "ANALYSIS_RESPONSE_MISSING_GEOJSON", "number": "E305", "title": "Analiz Yanıtı Eksik", "description": "Analiz backend'i başarılı yanıt döndü ama sonuç geojson içermiyor." }, "LAYER_AUTHORIZED_LIST_API_KEY_MISSING": { "code": "LAYER_AUTHORIZED_LIST_API_KEY_MISSING", "number": "E101", "title": "Yetkili Katman Listesi İçin API Anahtarı Gerekli", "description": "getAuthorizedLayers() apiKey ayarlanmadan çağrıldı." }, "LAYER_GEOTIFF_EXPORT_UNSUPPORTED_TYPE": { "code": "LAYER_GEOTIFF_EXPORT_UNSUPPORTED_TYPE", "number": "E102", "title": "GeoTIFF Export Desteklenmiyor", "description": "GeoTIFF export sadece WMS/WCS katmanlarında desteklenir." }, "LAYER_GEOTIFF_EXPORT_NOT_CONFIGURED": { "code": "LAYER_GEOTIFF_EXPORT_NOT_CONFIGURED", "number": "E103", "title": "GeoTIFF Export Yapılandırılmamış", "description": "Katman GeoTIFF export için gerekli tiffFormat seçeneğine sahip değil." }, "LAYER_STYLE_NOT_VECTOR": { "code": "LAYER_STYLE_NOT_VECTOR", "number": "E104", "title": "Stil Sadece Vektör Katmanlarda", "description": "applyLayerStyle() sadece vektör (Entity tabanlı) katmanlarda kullanılabilir." }, "LAYER_TYPE_UNSUPPORTED_XYZ": { "code": "LAYER_TYPE_UNSUPPORTED_XYZ", "number": "E105", "title": "XYZ Katmanı add() İle Desteklenmiyor", "description": "XYZ katmanı add() ile eklenemez, Map.setBasemap() kullanılmalı." }, "LAYER_TYPE_UNSUPPORTED_DRAWING": { "code": "LAYER_TYPE_UNSUPPORTED_DRAWING", "number": "E106", "title": "DRAWING Katmanı add() İle Desteklenmiyor", "description": "DRAWING katmanı DrawingManager tarafından otomatik eklenir, add() ile eklenemez." }, "LAYER_TYPE_UNSUPPORTED_MEASURE": { "code": "LAYER_TYPE_UNSUPPORTED_MEASURE", "number": "E107", "title": "MEASURE Katmanı add() İle Desteklenmiyor", "description": "MEASURE katmanı DrawingManager tarafından otomatik eklenir, add() ile eklenemez." }, "LAYER_WMS_LAYERS_EMPTY": { "code": "LAYER_WMS_LAYERS_EMPTY", "number": "E108", "title": "WMS layers Parametresi Boş", "description": "WMS katmanı eklenirken layers (ogcLayerName) parametresi boş." }, "LAYER_GEOTIFF_UNSUPPORTED": { "code": "LAYER_GEOTIFF_UNSUPPORTED", "number": "E109", "title": "GeoTIFF Katmanı Desteklenmiyor", "description": "GeoTIFF katmanı mevcut Cesium sürümünde desteklenmiyor." }, "LAYER_SHP_PACKAGE_MISSING": { "code": "LAYER_SHP_PACKAGE_MISSING", "number": "E110", "title": "shpjs Paketi Eksik", "description": 'SHP katmanı için gereken "shpjs" paketi tüketici uygulamaya eklenmemiş.' }, "LAYER_CSV_PACKAGE_MISSING": { "code": "LAYER_CSV_PACKAGE_MISSING", "number": "E111", "title": "papaparse Paketi Eksik", "description": 'CSV katmanı için gereken "papaparse" paketi tüketici uygulamaya eklenmemiş.' }, "LAYER_CSV_LATLON_NOT_FOUND": { "code": "LAYER_CSV_LATLON_NOT_FOUND", "number": "E112", "title": "CSV'de lat/lon Sütunu Bulunamadı", "description": "CSV içinde lat/lon sütunları otomatik tespit edilemedi." }, "LAYER_NOT_FOUND": { "code": "LAYER_NOT_FOUND", "number": "E113", "title": "Katman Bulunamadı", "description": "Verilen id'ye sahip bir katman yönetimde kayıtlı değil." }, "LAYER_ID_ALREADY_EXISTS": { "code": "LAYER_ID_ALREADY_EXISTS", "number": "E114", "title": "Katman ID'si Zaten Kayıtlı", "description": "Verilen id ile zaten bir katman eklenmiş." }, "LAYER_TYPE_MISMATCH": { "code": "LAYER_TYPE_MISMATCH", "number": "E115", "title": "Katman Tipi Uyuşmuyor", "description": "Katman beklenen tipte (WMS/WMTS) değil." }, "LAYER_SERVICE_OPTIONS_NOT_FOUND": { "code": "LAYER_SERVICE_OPTIONS_NOT_FOUND", "number": "E116", "title": "Servis Seçenekleri Bulunamadı", "description": "Katman için orijinal servis seçenekleri (serviceLayerOptions) bulunamadı." }, "LAYER_NOT_RASTER": { "code": "LAYER_NOT_RASTER", "number": "E117", "title": "Katman Raster Değil", "description": "İşlem sadece raster (ImageryLayer) katmanlarda desteklenir." }, "OGC_AUTHORIZED_LAYERS_REQUEST_FAILED": { "code": "OGC_AUTHORIZED_LAYERS_REQUEST_FAILED", "number": "E205", "title": "Yetkili Katman Listesi Alınamadı", "description": "getAuthorizedLayers() isteği HTTP hata koduyla döndü." }, "OGC_GEOTIFF_DOWNLOAD_FAILED": { "code": "OGC_GEOTIFF_DOWNLOAD_FAILED", "number": "E206", "title": "GeoTIFF İndirilemedi", "description": "GeoTIFF export isteği HTTP hata koduyla döndü." }, "OGC_WFS_JSON_FORMAT_UNSUPPORTED": { "code": "OGC_WFS_JSON_FORMAT_UNSUPPORTED", "number": "E207", "title": "WFS JSON Format İlan Etmiyor", "description": "WFS sunucusu GetCapabilities yanıtında JSON çıktı formatı ilan etmiyor." }, "OGC_WFS_GEOJSON_REQUEST_FAILED": { "code": "OGC_WFS_GEOJSON_REQUEST_FAILED", "number": "E208", "title": "WFS GeoJSON İsteği Başarısız", "description": "WFS GetFeature (GeoJSON çıktı) isteği başarısız oldu." }, "OGC_WFS_REQUEST_FAILED": { "code": "OGC_WFS_REQUEST_FAILED", "number": "E209", "title": "WFS İsteği Başarısız", "description": "WFS GetFeature (GML çıktı) isteği HTTP hata koduyla döndü." }, "OGC_WFS_EXCEPTION": { "code": "OGC_WFS_EXCEPTION", "number": "E210", "title": "WFS OGC Exception", "description": "WFS GetFeature yanıtı bir OGC ExceptionReport döndürdü." }, "OGC_WFS_OL_PACKAGE_MISSING": { "code": "OGC_WFS_OL_PACKAGE_MISSING", "number": "E211", "title": "ol Paketi Eksik", "description": 'WFS GML yanıtını okumak için gereken "ol" paketi tüketici uygulamaya eklenmemiş.' }, "OGC_WCS_REQUEST_FAILED": { "code": "OGC_WCS_REQUEST_FAILED", "number": "E212", "title": "WCS İsteği Başarısız", "description": "WCS GetCoverage isteği HTTP hata koduyla döndü." }, "OGC_WCS_MULTIPART_IMAGE_NOT_FOUND": { "code": "OGC_WCS_MULTIPART_IMAGE_NOT_FOUND", "number": "E213", "title": "WCS Multipart Görsel Bulunamadı", "description": "Multipart WCS yanıtında görsel (image) parçası bulunamadı." }, "LAYER_PREVIEW_UNSUPPORTED_XYZ": { "code": "LAYER_PREVIEW_UNSUPPORTED_XYZ", "number": "E118", "title": "XYZ Katmanı Önizlemede Desteklenmiyor", "description": "TucbsMapPreview XYZ katman tipini önizlemede desteklemiyor." }, "LAYER_PREVIEW_UNSUPPORTED_DRAWING": { "code": "LAYER_PREVIEW_UNSUPPORTED_DRAWING", "number": "E119", "title": "DRAWING Katmanı Önizlemede Desteklenmiyor", "description": "TucbsMapPreview DRAWING katman tipini önizlemede desteklemiyor." }, "LAYER_PREVIEW_UNSUPPORTED_MEASURE": { "code": "LAYER_PREVIEW_UNSUPPORTED_MEASURE", "number": "E120", "title": "MEASURE Katmanı Önizlemede Desteklenmiyor", "description": "TucbsMapPreview MEASURE katman tipini önizlemede desteklemiyor." }, "LAYER_MANAGER_NOT_READY": { "code": "LAYER_MANAGER_NOT_READY", "number": "E121", "title": "Harita Hazır Değil", "description": "Katman eklenmeye çalışıldığında LayerManager henüz hazır değildi." }, "LAYER_AUTHORIZED_ADD_MISSING_INFO": { "code": "LAYER_AUTHORIZED_ADD_MISSING_INFO", "number": "E122", "title": "Yetkili Katman Eklenemedi", "description": "Yetkili katman için gerekli servis bilgisi (ör. WMTS TileMatrixSet) eksik." }, "OGC_SERVICE_DISCOVERY_PARSE_FAILED": { "code": "OGC_SERVICE_DISCOVERY_PARSE_FAILED", "number": "E214", "title": "Servis Keşfi Ayrıştırma Hatası", "description": "TucbsServiceUpload'da GetCapabilities yanıtı geçerli XML olarak ayrıştırılamadı." }, "LAYER_WMTS_TILEMATRIXSET_MISSING": { "code": "LAYER_WMTS_TILEMATRIXSET_MISSING", "number": "E123", "title": "TileMatrixSet Bilgisi Bulunamadı", "description": "Keşfedilen WMTS katmanı için TileMatrixSet bilgisi bulunamadı." } };
function getErrorCodes() {
  return ERROR_REGISTRY;
}
class TucbsError extends Error {
  constructor(_0x53eda4, _0x30e01c, _0x5d2089) {
    const _0x297c7d = ERROR_REGISTRY[_0x53eda4];
    super(_0x30e01c ?? _0x297c7d["description"]), this["name"] = "TucbsError", this["code"] = _0x53eda4, this["number"] = _0x297c7d["number"], this["title"] = _0x5d2089 ?? _0x297c7d["title"];
  }
}
class LayerOperationError extends TucbsError {
  constructor(_0x266a51, _0x29d6f6, _0x121bf0) {
    super(_0x266a51, _0x29d6f6, _0x121bf0), this["name"] = "LayerOperationError";
  }
}
class OgcRequestError extends TucbsError {
  constructor(_0x5441af, _0x3034ef, _0x568eef) {
    super(_0x5441af, _0x3034ef, _0x568eef), this["name"] = "OgcRequestError";
  }
}
class AnalysisRequestError extends TucbsError {
  constructor(_0xbd8bbe, _0x482101, _0x122f0e) {
    super(_0xbd8bbe, _0x482101, _0x122f0e), this["name"] = "AnalysisRequestError";
  }
}
class GeometryError extends TucbsError {
  constructor(_0x45fd88, _0x585c06, _0x3ae9ee) {
    super(_0x45fd88, _0x585c06, _0x3ae9ee), this["name"] = "GeometryError";
  }
}
class ApiKeyValidationError extends TucbsError {
  constructor(_0x39e404, _0x384881) {
    super((_0x384881 == null ? void 0 : _0x384881["code"]) ?? "API_KEY_INVALID", _0x39e404, (_0x384881 == null ? void 0 : _0x384881["title"]) ?? "API Hatası"), this["name"] = "ApiKeyValidationError";
    if ((_0x384881 == null ? void 0 : _0x384881["reason"]) !== void 0) this["reason"] = _0x384881["reason"];
    if ((_0x384881 == null ? void 0 : _0x384881["detail"]) !== void 0) this["detail"] = _0x384881["detail"];
  }
}
const _ApiKeyPolicy = class _ApiKeyPolicy {
  constructor(_0x54e3b7) {
    __privateAdd(this, _apiKey);
    this["getApiBase"] = _0x54e3b7["apiBase"];
  }
  ["configure"](_0x1a114f) {
    _0x1a114f["apiKey"] !== void 0 && __privateSet(this, _apiKey, _0x1a114f["apiKey"]), _0x1a114f["trustedApiKeyHosts"] !== void 0 && (this["trustedApiKeyHosts"] = _0x1a114f["trustedApiKeyHosts"]), _0x1a114f["apiKeyDiscoveryUrl"] !== void 0 && (this["apiKeyDiscoveryUrl"] = _0x1a114f["apiKeyDiscoveryUrl"]);
  }
  get ["hasApiKey"]() {
    return __privateGet(this, _apiKey) !== void 0;
  }
  async ["getAuthorizedLayers"]() {
    if (__privateGet(this, _apiKey) === void 0) throw new LayerOperationError("LAYER_AUTHORIZED_LIST_API_KEY_MISSING", "getAuthorizedLayers() icin apiKey gerekli — Map/LayerManager.configure({apiKey}) ile atayin.");
    const _0x1c4f9e = this["apiKeyDiscoveryUrl"] ?? this["getApiBase"]()["replace"](/\/+$/, "") + "/layers", _0xcbde2 = await fetch(_0x1c4f9e, { "headers": { [_ApiKeyPolicy["API_KEY_HEADER_NAME"]]: __privateGet(this, _apiKey) } });
    if (!_0xcbde2["ok"]) throw new OgcRequestError("OGC_AUTHORIZED_LAYERS_REQUEST_FAILED", "Yetkili katman listesi alinamadi: " + _0xcbde2["status"] + " " + _0xcbde2["statusText"]);
    const _0x535c20 = await _0xcbde2["json"](), _0x1e5aa5 = Array["isArray"](_0x535c20) ? _0x535c20 : _0x535c20["object"] ?? [];
    return _0x1e5aa5["map"]((_0x4daf12) => this["normalizeAuthorizedLayer"](_0x4daf12));
  }
  async ["getLayerList"]() {
    return this["getAuthorizedLayers"]();
  }
  ["canAddAuthorizedLayer"](_0x56ba3d) {
    var _a2, _b;
    const _0x5d2c5e = (_0x56ba3d["servisTuru"] || "")["toUpperCase"]();
    if (!((_a2 = _0x56ba3d["servisUrl"]) == null ? void 0 : _a2["trim"]()) || !this["resolveOgcLayerName"](_0x56ba3d["ogcLayerName"], _0x56ba3d["katmanAdi"])) return ![];
    if (_0x5d2c5e === "WMTS") return !!((_b = _0x56ba3d["wmtsTileMatrixSet"]) == null ? void 0 : _b["trim"]());
    return _0x5d2c5e === "WMS" || _0x5d2c5e === "WFS";
  }
  ["resolveAddOptions"](_0x514724) {
    var _a2;
    if (!this["canAddAuthorizedLayer"](_0x514724)) throw new LayerOperationError("LAYER_AUTHORIZED_ADD_MISSING_INFO", ((_a2 = _0x514724["servisTuru"]) == null ? void 0 : _a2["toUpperCase"]()) === "WMTS" ? "WMTS için TileMatrixSet eksik." : "Eksik servis bilgisi.");
    const _0x5867fe = _0x514724["servisTuru"]["toUpperCase"](), _0x4d8eac = "authorized-" + this["authorizedLayerKey"](_0x514724) + "-" + Date["now"](), _0x33d470 = this["resolveOgcLayerName"](_0x514724["ogcLayerName"], _0x514724["katmanAdi"]), _0x5a7903 = _0x514724["katmanAdi"] || _0x33d470;
    if (_0x5867fe === "WMS") return { "layerType": "WMS", "options": { "id": _0x4d8eac, "title": _0x5a7903, "url": _0x514724["servisUrl"], "layers": _0x33d470 } };
    if (_0x5867fe === "WFS") return { "layerType": "WFS", "options": { "id": _0x4d8eac, "title": _0x5a7903, "url": _0x514724["servisUrl"], "typeName": _0x33d470 } };
    return { "layerType": "WMTS", "options": { "id": _0x4d8eac, "title": _0x5a7903, "url": _0x514724["servisUrl"], "layer": _0x33d470, "tileMatrixSetID": _0x514724["wmtsTileMatrixSet"] } };
  }
  ["authorizedLayerKey"](_0x1a7360) {
    return _0x1a7360["id"] ?? _0x1a7360["servisTuru"] + "|" + _0x1a7360["servisUrl"] + "|" + _0x1a7360["ogcLayerName"];
  }
  ["normalizeAuthorizedLayer"](_0x3910f9) {
    const _0x401a87 = this["resolveOgcLayerName"](_0x3910f9["ogcLayerName"], _0x3910f9["katmanAdi"]), _0x58a5b6 = this["rewriteOpaqueOgcUrl"](_0x3910f9["servisUrl"]), _0x4261fc = _0x3910f9["servisTuru"]["toUpperCase"]();
    return { ..._0x3910f9, "servisTuru": _0x4261fc, ..._0x401a87 && _0x401a87 !== _0x3910f9["ogcLayerName"] ? { "ogcLayerName": _0x401a87 } : {}, ..._0x58a5b6 !== _0x3910f9["servisUrl"] ? { "servisUrl": _0x58a5b6 } : {} };
  }
  ["resolveOgcLayerName"](_0x1970f3, _0x5f5b5f) {
    for (const _0x996531 of [_0x1970f3, _0x5f5b5f]) {
      if (!_0x996531) continue;
      const _0x8c00b4 = _0x996531["trim"]();
      if (!_0x8c00b4 || _0x8c00b4["toLowerCase"]() === "undefined" || _0x8c00b4["toLowerCase"]() === "null") continue;
      return _0x8c00b4;
    }
    return "";
  }
  ["isTrustedApiKeyHost"](_0x15b4db) {
    if (__privateGet(this, _apiKey) === void 0) return ![];
    return this["isKnownGatedUrl"](_0x15b4db);
  }
  ["layerRequiresApiKey"](_0x160f33) {
    return this["isKnownGatedUrl"](_0x160f33);
  }
  ["isKnownGatedUrl"](_0x4dd27a) {
    if (this["isOwnBackendUrl"](_0x4dd27a)) return !![];
    if (this["trustedApiKeyHosts"] === void 0 || this["trustedApiKeyHosts"]["length"] === 0) return ![];
    try {
      return this["trustedApiKeyHosts"]["includes"](new URL(_0x4dd27a)["hostname"]);
    } catch {
      return ![];
    }
  }
  ["isOwnBackendUrl"](_0x5ed5e6) {
    try {
      const _0x3fc647 = new URL(_0x5ed5e6, window["location"]["origin"]), _0x451ae0 = new URL(this["getApiBase"](), window["location"]["origin"]);
      if (_0x3fc647["hostname"] !== _0x451ae0["hostname"]) return ![];
      return _0x3fc647["pathname"]["includes"]("/wms-proxy/") || _0x3fc647["pathname"]["includes"]("/ogc/");
    } catch {
      return ![];
    }
  }
  ["rewriteOpaqueOgcUrl"](_0x179ccd) {
    if (!(_0x179ccd == null ? void 0 : _0x179ccd["includes"]("/ogc/"))) return _0x179ccd ?? "";
    const _0x5070bc = _0x179ccd["indexOf"]("/ogc/"), _0x1be1ad = _0x179ccd["substring"](_0x5070bc), _0xdf5744 = this["getApiBase"]()["replace"](/\/+$/, "");
    return "" + _0xdf5744 + _0x1be1ad;
  }
  ["resolveOgcProxyUrl"](_0xd64194, _0xd843ec) {
    if (__privateGet(this, _apiKey) === void 0) return _0xd843ec;
    if (_0xd843ec["includes"]("/ogc/")) return this["rewriteOpaqueOgcUrl"](_0xd843ec);
    if (_0xd843ec["includes"]("/wms-proxy/")) return _0xd843ec;
    const _0xe36cc7 = this["getApiBase"]()["replace"](/\/+$/, "") + "/wms-proxy/" + _0xd64194, _0x5eaca3 = _0xe36cc7["includes"]("?") ? "&" : "?";
    return "" + _0xe36cc7 + _0x5eaca3 + "url=" + encodeURIComponent(_0xd843ec);
  }
  ["mergeApiKeyHeader"](_0x35ccf0, _0x1e51cd) {
    if (!this["isTrustedApiKeyHost"](_0x1e51cd)) return _0x35ccf0;
    return { ..._0x35ccf0, [_ApiKeyPolicy["API_KEY_HEADER_NAME"]]: __privateGet(this, _apiKey) };
  }
  ["attachApiKeyToUrl"](_0x33485b) {
    if (!this["isTrustedApiKeyHost"](_0x33485b)) return _0x33485b;
    const _0x5e5e5c = _0x33485b["includes"]("?") ? "&" : "?";
    return "" + _0x33485b + _0x5e5e5c + _ApiKeyPolicy["API_KEY_QUERY_PARAM_NAME"] + "=" + encodeURIComponent(__privateGet(this, _apiKey));
  }
  ["buildAuthHeaders"](_0x10ab88) {
    if (_0x10ab88 === void 0) return void 0;
    return { "Authorization": "Bearer " + _0x10ab88 };
  }
};
_apiKey = new WeakMap();
_ApiKeyPolicy["API_KEY_HEADER_NAME"] = "X-API-Key";
_ApiKeyPolicy["API_KEY_QUERY_PARAM_NAME"] = "tucbsapikey";
let ApiKeyPolicy = _ApiKeyPolicy;
function cartesianToLonLat(_0x25872d) {
  const _0x38c4df = Cartographic["fromCartesian"](_0x25872d);
  return [_0x584e42["toDegrees"](_0x38c4df["longitude"]), _0x584e42["toDegrees"](_0x38c4df["latitude"])];
}
function closeRing$1(_0x425b97) {
  if (_0x425b97["length"] === 0) return _0x425b97;
  const _0x1fbb2f = _0x425b97[0], _0x3b1091 = _0x425b97[_0x425b97["length"] - 1];
  if (_0x1fbb2f[0] === _0x3b1091[0] && _0x1fbb2f[1] === _0x3b1091[1]) return _0x425b97;
  return [..._0x425b97, _0x1fbb2f];
}
function entityToGeoJSON(_0x130868, _0x48925b = JulianDate["now"]()) {
  var _a2, _b, _c;
  const _0x3822bd = ((_a2 = _0x130868["properties"]) == null ? void 0 : _a2["getValue"](_0x48925b)) ?? {}, _0x3033c5 = { ..._0x3822bd };
  delete _0x3033c5["layerId"], delete _0x3033c5["featureId"];
  let _0x36459e = null;
  if ((_b = _0x130868["polygon"]) == null ? void 0 : _b["hierarchy"]) {
    const _0x4ba92c = _0x130868["polygon"]["hierarchy"]["getValue"](_0x48925b), _0x53d71a = _0x4ba92c == null ? void 0 : _0x4ba92c["positions"];
    if (_0x53d71a && _0x53d71a["length"] >= 3) {
      const _0x3b3aec = closeRing$1(_0x53d71a["map"](cartesianToLonLat));
      _0x36459e = { "type": "Polygon", "coordinates": [_0x3b3aec] };
    }
  } else {
    if ((_c = _0x130868["polyline"]) == null ? void 0 : _c["positions"]) {
      const _0x2e8f5b = _0x130868["polyline"]["positions"]["getValue"](_0x48925b);
      _0x2e8f5b && _0x2e8f5b["length"] >= 2 && (_0x36459e = { "type": "LineString", "coordinates": _0x2e8f5b["map"](cartesianToLonLat) });
    } else {
      if (_0x130868["position"]) {
        const _0x4404ae = _0x130868["position"]["getValue"](_0x48925b);
        _0x4404ae && (_0x36459e = { "type": "Point", "coordinates": cartesianToLonLat(_0x4404ae) });
      }
    }
  }
  if (!_0x36459e) return null;
  return { "type": "Feature", "id": _0x130868["id"], "properties": _0x3033c5, "geometry": _0x36459e };
}
function featureLabel(_0x54a342) {
  var _a2;
  const _0x3e0c9f = ((_a2 = _0x54a342["geometry"]) == null ? void 0 : _a2["type"]) ?? "Feature", _0x1fa97d = _0x54a342["id"] != null ? String(_0x54a342["id"]) : "";
  return _0x1fa97d ? _0x3e0c9f + " " + _0x1fa97d : _0x3e0c9f;
}
function triggerDownload(_0x5837ac, _0x338984) {
  const _0x41d3f4 = URL["createObjectURL"](_0x5837ac), _0x31aea5 = document["createElement"]("a");
  _0x31aea5["href"] = _0x41d3f4, _0x31aea5["download"] = _0x338984, document["body"]["appendChild"](_0x31aea5), _0x31aea5["click"](), _0x31aea5["remove"](), setTimeout(() => URL["revokeObjectURL"](_0x41d3f4), 1e3);
}
function featureCollectionToKml(_0x452cf8) {
  const _0xd9b236 = _0x452cf8["features"]["map"]((_0x13db77, _0x2f5ace) => featureToKml(_0x13db77, _0x2f5ace))["join"]("");
  return '<?xml version="1.0" encoding="UTF-8"?>\n<kml xmlns="http://www.opengis.net/kml/2.2"><Document>' + _0xd9b236 + "</Document></kml>";
}
function featureCollectionToShapefileZip(_0x597121) {
  const _0x21cba5 = collectShpRecords(_0x597121), _0x4b39c7 = writeShp(_0x21cba5), _0x4a3f3c = writeShx(_0x21cba5), _0x57711d = writeDbf(_0x21cba5["map"]((_0x26e0ec) => _0x26e0ec["name"]));
  return zipStore([{ "name": "export.shp", "data": _0x4b39c7 }, { "name": "export.shx", "data": _0x4a3f3c }, { "name": "export.dbf", "data": _0x57711d }]);
}
function featureToKml(_0x4ea659, _0x1ca42d) {
  const _0x670bfb = xmlEscape(featureName(_0x4ea659, _0x1ca42d)), _0x29ba44 = geometryToKml(_0x4ea659["geometry"]);
  if (!_0x29ba44) return "";
  return "<Placemark><name>" + _0x670bfb + "</name>" + _0x29ba44 + "</Placemark>";
}
function geometryToKml(_0x584b16) {
  if (!_0x584b16) return "";
  switch (_0x584b16["type"]) {
    case "Point":
      return "<Point><coordinates>" + coord(_0x584b16["coordinates"]) + "</coordinates></Point>";
    case "MultiPoint":
      return "<MultiGeometry>" + _0x584b16["coordinates"]["map"]((_0x18159e) => "<Point><coordinates>" + coord(_0x18159e) + "</coordinates></Point>")["join"]("") + "</MultiGeometry>";
    case "LineString":
      return "<LineString><coordinates>" + line(_0x584b16["coordinates"]) + "</coordinates></LineString>";
    case "MultiLineString":
      return "<MultiGeometry>" + _0x584b16["coordinates"]["map"]((_0x477034) => "<LineString><coordinates>" + line(_0x477034) + "</coordinates></LineString>")["join"]("") + "</MultiGeometry>";
    case "Polygon":
      return polygonKml(_0x584b16["coordinates"]);
    case "MultiPolygon":
      return "<MultiGeometry>" + _0x584b16["coordinates"]["map"]((_0x54dfb8) => polygonKml(_0x54dfb8))["join"]("") + "</MultiGeometry>";
    case "GeometryCollection":
      return "<MultiGeometry>" + _0x584b16["geometries"]["map"]((_0x44fe0f) => geometryToKml(_0x44fe0f))["join"]("") + "</MultiGeometry>";
    default:
      return "";
  }
}
function polygonKml(_0x279983) {
  const [_0x408ded, ..._0x3488e3] = _0x279983;
  if (!_0x408ded) return "";
  const _0x4dc79d = _0x3488e3["map"]((_0x22d074) => "<innerBoundaryIs><LinearRing><coordinates>" + line(_0x22d074) + "</coordinates></LinearRing></innerBoundaryIs>")["join"]("");
  return "<Polygon><outerBoundaryIs><LinearRing><coordinates>" + line(_0x408ded) + "</coordinates></LinearRing></outerBoundaryIs>" + _0x4dc79d + "</Polygon>";
}
function coord(_0x41bb15) {
  return _0x41bb15[0] + "," + _0x41bb15[1] + ",0";
}
function line(_0x337715) {
  return _0x337715["map"](coord)["join"](" ");
}
function xmlEscape(_0x568fac) {
  return _0x568fac["replaceAll"]("&", "&amp;")["replaceAll"]("<", "&lt;")["replaceAll"](">", "&gt;")["replaceAll"]('"', "&quot;");
}
function collectShpRecords(_0x3c1d9b) {
  const _0x5a5afc = firstKind(_0x3c1d9b);
  if (!_0x5a5afc) return [];
  const _0x2d4576 = [];
  return _0x3c1d9b["features"]["forEach"]((_0x532834, _0x5374df) => {
    for (const _0x84cec4 of ringsForKind(_0x532834["geometry"], _0x5a5afc)) {
      const _0x1dab0b = _0x84cec4["map"](closeRing), _0x31caa7 = _0x5a5afc === 5 ? orientPolygon(_0x1dab0b) : _0x1dab0b;
      _0x2d4576["push"]({ "kind": _0x5a5afc, "name": featureName(_0x532834, _0x5374df), "rings": _0x31caa7, "bbox": bboxOf(_0x31caa7) });
    }
  }), _0x2d4576;
}
function firstKind(_0x5ac2cd) {
  for (const _0x216013 of _0x5ac2cd["features"]) {
    const _0x4482ac = kindOf(_0x216013["geometry"]);
    if (_0x4482ac) return _0x4482ac;
  }
  return null;
}
function kindOf(_0x2876b5) {
  if (!_0x2876b5) return null;
  switch (_0x2876b5["type"]) {
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
      for (const _0x5c5a53 of _0x2876b5["geometries"]) {
        const _0x13faf3 = kindOf(_0x5c5a53);
        if (_0x13faf3) return _0x13faf3;
      }
      return null;
    default:
      return null;
  }
}
function ringsForKind(_0x457a49, _0x5973b2) {
  if (!_0x457a49 || kindOf(_0x457a49) !== _0x5973b2) {
    if ((_0x457a49 == null ? void 0 : _0x457a49["type"]) === "GeometryCollection") return _0x457a49["geometries"]["flatMap"]((_0x53bba0) => ringsForKind(_0x53bba0, _0x5973b2));
    return [];
  }
  switch (_0x457a49["type"]) {
    case "Point":
      return [[[_0x457a49["coordinates"]]]];
    case "MultiPoint":
      return _0x457a49["coordinates"]["map"]((_0x47684c) => [[_0x47684c]]);
    case "LineString":
      return [[_0x457a49["coordinates"]]];
    case "MultiLineString":
      return [_0x457a49["coordinates"]];
    case "Polygon":
      return [_0x457a49["coordinates"]];
    case "MultiPolygon":
      return _0x457a49["coordinates"];
    default:
      return [];
  }
}
function closeRing(_0x3530d0) {
  const _0x5a9676 = _0x3530d0[0], _0x4c6202 = _0x3530d0[_0x3530d0["length"] - 1];
  if (!_0x5a9676 || !_0x4c6202) return _0x3530d0;
  if (_0x5a9676[0] === _0x4c6202[0] && _0x5a9676[1] === _0x4c6202[1]) return _0x3530d0;
  return [..._0x3530d0, _0x5a9676];
}
function orientPolygon(_0x3e07e5) {
  return _0x3e07e5["map"]((_0x1c658b, _0x3fd0e0) => {
    const _0x40154b = signedArea(_0x1c658b), _0x3df57e = _0x3fd0e0 === 0, _0x1804b6 = _0x40154b < 0;
    if (_0x3df57e === _0x1804b6) return _0x1c658b;
    return [..._0x1c658b]["reverse"]();
  });
}
function signedArea(_0x202d89) {
  let _0x171a16 = 0;
  for (let _0x30f91c = 0; _0x30f91c < _0x202d89["length"] - 1; _0x30f91c++) {
    const _0x1fe2ef = _0x202d89[_0x30f91c], _0x28fccb = _0x202d89[_0x30f91c + 1], _0x21d519 = _0x1fe2ef == null ? void 0 : _0x1fe2ef[0], _0x1f6cfb = _0x1fe2ef == null ? void 0 : _0x1fe2ef[1], _0x1c993e = _0x28fccb == null ? void 0 : _0x28fccb[0], _0xef78b = _0x28fccb == null ? void 0 : _0x28fccb[1];
    if (_0x21d519 === void 0 || _0x1f6cfb === void 0 || _0x1c993e === void 0 || _0xef78b === void 0) continue;
    _0x171a16 += _0x21d519 * _0xef78b - _0x1c993e * _0x1f6cfb;
  }
  return _0x171a16 / 2;
}
function bboxOf(_0x3b9f66) {
  let _0xb4096b = Infinity, _0x240630 = Infinity, _0x1df488 = -Infinity, _0x49ff15 = -Infinity;
  for (const _0x136a1a of _0x3b9f66) {
    for (const _0x29be51 of _0x136a1a) {
      const [_0x2b7d10, _0x339489] = xy(_0x29be51);
      _0xb4096b = Math["min"](_0xb4096b, _0x2b7d10), _0x240630 = Math["min"](_0x240630, _0x339489), _0x1df488 = Math["max"](_0x1df488, _0x2b7d10), _0x49ff15 = Math["max"](_0x49ff15, _0x339489);
    }
  }
  if (!Number["isFinite"](_0xb4096b)) return [0, 0, 0, 0];
  return [_0xb4096b, _0x240630, _0x1df488, _0x49ff15];
}
function featureName(_0x27a9bc, _0xb8c283) {
  const _0x11858f = _0x27a9bc["properties"], _0x335946 = _0x11858f && typeof _0x11858f["name"] === "string" ? _0x11858f["name"] : "";
  return _0x335946 || "feature-" + (_0xb8c283 + 1);
}
function writeShp(_0x2b1f19) {
  const _0x184e10 = _0x2b1f19["map"](recordBody), _0x3eb336 = _0x184e10["reduce"]((_0x1c6cd8, _0x4fed04) => _0x1c6cd8 + 8 + _0x4fed04["length"], 0), _0x587c36 = new Uint8Array(100 + _0x3eb336), _0x70f8ea = new DataView(_0x587c36["buffer"]);
  writeHeader(_0x70f8ea, _0x587c36["length"], _0x2b1f19);
  let _0x2c1263 = 100;
  return _0x184e10["forEach"]((_0x15b7a6, _0xbd93c3) => {
    _0x70f8ea["setInt32"](_0x2c1263, _0xbd93c3 + 1, ![]), _0x70f8ea["setInt32"](_0x2c1263 + 4, _0x15b7a6["length"] / 2, ![]), _0x587c36["set"](_0x15b7a6, _0x2c1263 + 8), _0x2c1263 += 8 + _0x15b7a6["length"];
  }), _0x587c36;
}
function writeShx(_0x2b8eec) {
  const _0x38eaf0 = new Uint8Array(100 + _0x2b8eec["length"] * 8), _0x2c2654 = new DataView(_0x38eaf0["buffer"]);
  writeHeader(_0x2c2654, _0x38eaf0["length"], _0x2b8eec);
  let _0x19e224 = 50;
  return _0x2b8eec["forEach"]((_0x5a0989, _0x208f83) => {
    const _0x443223 = recordBody(_0x5a0989)["length"] / 2;
    _0x2c2654["setInt32"](100 + _0x208f83 * 8, _0x19e224, ![]), _0x2c2654["setInt32"](100 + _0x208f83 * 8 + 4, _0x443223, ![]), _0x19e224 += 4 + _0x443223;
  }), _0x38eaf0;
}
function writeHeader(_0x247ffe, _0x253859, _0x1c6743) {
  var _a2;
  _0x247ffe["setInt32"](0, 9994, ![]), _0x247ffe["setInt32"](24, _0x253859 / 2, ![]), _0x247ffe["setInt32"](28, 1e3, !![]), _0x247ffe["setInt32"](32, ((_a2 = _0x1c6743[0]) == null ? void 0 : _a2["kind"]) ?? 5, !![]);
  const _0x571b14 = unionBbox(_0x1c6743);
  _0x247ffe["setFloat64"](36, _0x571b14[0], !![]), _0x247ffe["setFloat64"](44, _0x571b14[1], !![]), _0x247ffe["setFloat64"](52, _0x571b14[2], !![]), _0x247ffe["setFloat64"](60, _0x571b14[3], !![]);
}
function unionBbox(_0x54bd47) {
  if (_0x54bd47["length"] === 0) return [0, 0, 0, 0];
  let _0x4e8ceb = Infinity, _0x3ea1bb = Infinity, _0x2778aa = -Infinity, _0x1825ad = -Infinity;
  for (const _0x17982e of _0x54bd47) {
    _0x4e8ceb = Math["min"](_0x4e8ceb, _0x17982e["bbox"][0]), _0x3ea1bb = Math["min"](_0x3ea1bb, _0x17982e["bbox"][1]), _0x2778aa = Math["max"](_0x2778aa, _0x17982e["bbox"][2]), _0x1825ad = Math["max"](_0x1825ad, _0x17982e["bbox"][3]);
  }
  return [_0x4e8ceb, _0x3ea1bb, _0x2778aa, _0x1825ad];
}
function xy(_0xc07606) {
  return [_0xc07606[0] ?? 0, _0xc07606[1] ?? 0];
}
function recordBody(_0x17c564) {
  var _a2;
  if (_0x17c564["kind"] === 1) {
    const _0x4efe03 = new Uint8Array(20), _0x1ce0ad = new DataView(_0x4efe03["buffer"]);
    _0x1ce0ad["setInt32"](0, 1, !![]);
    const [_0x832c97, _0x4f621e] = xy(((_a2 = _0x17c564["rings"][0]) == null ? void 0 : _a2[0]) ?? [0, 0]);
    return _0x1ce0ad["setFloat64"](4, _0x832c97, !![]), _0x1ce0ad["setFloat64"](12, _0x4f621e, !![]), _0x4efe03;
  }
  const _0x1678fb = _0x17c564["rings"]["reduce"]((_0x5b87d4, _0x3b5524) => _0x5b87d4 + _0x3b5524["length"], 0), _0x19e834 = new Uint8Array(44 + _0x17c564["rings"]["length"] * 4 + _0x1678fb * 16), _0x595508 = new DataView(_0x19e834["buffer"]);
  _0x595508["setInt32"](0, _0x17c564["kind"], !![]), _0x595508["setFloat64"](4, _0x17c564["bbox"][0], !![]), _0x595508["setFloat64"](12, _0x17c564["bbox"][1], !![]), _0x595508["setFloat64"](20, _0x17c564["bbox"][2], !![]), _0x595508["setFloat64"](28, _0x17c564["bbox"][3], !![]), _0x595508["setInt32"](36, _0x17c564["rings"]["length"], !![]), _0x595508["setInt32"](40, _0x1678fb, !![]);
  let _0x3bc358 = 0;
  _0x17c564["rings"]["forEach"]((_0x52997e, _0x6fa4fb) => {
    _0x595508["setInt32"](44 + _0x6fa4fb * 4, _0x3bc358, !![]), _0x3bc358 += _0x52997e["length"];
  });
  let _0x1ab3a0 = 44 + _0x17c564["rings"]["length"] * 4;
  for (const _0x30690e of _0x17c564["rings"]) {
    for (const _0x3d6065 of _0x30690e) {
      const [_0x3c3441, _0x2a6c2d] = xy(_0x3d6065);
      _0x595508["setFloat64"](_0x1ab3a0, _0x3c3441, !![]), _0x595508["setFloat64"](_0x1ab3a0 + 8, _0x2a6c2d, !![]), _0x1ab3a0 += 16;
    }
  }
  return _0x19e834;
}
function writeDbf(_0x4fbf4f) {
  const _0x3b458e = 32 + 32 + 1, _0x559f81 = 1 + 80, _0x41cb81 = new Uint8Array(_0x3b458e + _0x4fbf4f["length"] * _0x559f81 + 1), _0xae3a0b = new DataView(_0x41cb81["buffer"]);
  _0x41cb81[0] = 3, _0xae3a0b["setUint32"](4, _0x4fbf4f["length"], !![]), _0xae3a0b["setUint16"](8, _0x3b458e, !![]), _0xae3a0b["setUint16"](10, _0x559f81, !![]);
  const _0x42dd4d = new TextEncoder()["encode"]("NAME");
  _0x41cb81["set"](_0x42dd4d, 32), _0x41cb81[32 + 11] = "C"["charCodeAt"](0), _0x41cb81[32 + 16] = 80, _0x41cb81[32 + 32] = 13;
  const _0x1904a5 = new TextEncoder();
  return _0x4fbf4f["forEach"]((_0x351419, _0x47b7d7) => {
    const _0x2946ea = _0x3b458e + _0x47b7d7 * _0x559f81;
    _0x41cb81[_0x2946ea] = 32;
    const _0xe72fa7 = _0x1904a5["encode"](_0x351419)["slice"](0, 80);
    _0x41cb81["set"](_0xe72fa7, _0x2946ea + 1);
    for (let _0x400788 = 1 + _0xe72fa7["length"]; _0x400788 < _0x559f81; _0x400788++) _0x41cb81[_0x2946ea + _0x400788] = 32;
  }), _0x41cb81[_0x41cb81["length"] - 1] = 26, _0x41cb81;
}
function zipStore(_0x916733) {
  const _0x939149 = new TextEncoder(), _0x29d513 = [], _0x4dce30 = [];
  let _0xef1bcd = 0;
  for (const _0x1b4e6f of _0x916733) {
    const _0x138780 = _0x939149["encode"](_0x1b4e6f["name"]), _0x30228e = crc32(_0x1b4e6f["data"]), _0x1e667f = new Uint8Array(30 + _0x138780["length"] + _0x1b4e6f["data"]["length"]), _0x562c84 = new DataView(_0x1e667f["buffer"]);
    _0x562c84["setUint32"](0, 67324752, !![]), _0x562c84["setUint16"](4, 20, !![]), _0x562c84["setUint16"](8, 0, !![]), _0x562c84["setUint32"](14, _0x30228e, !![]), _0x562c84["setUint32"](18, _0x1b4e6f["data"]["length"], !![]), _0x562c84["setUint32"](22, _0x1b4e6f["data"]["length"], !![]), _0x562c84["setUint16"](26, _0x138780["length"], !![]), _0x1e667f["set"](_0x138780, 30), _0x1e667f["set"](_0x1b4e6f["data"], 30 + _0x138780["length"]), _0x29d513["push"](_0x1e667f);
    const _0x1c82ad = new Uint8Array(46 + _0x138780["length"]), _0x4b77bb = new DataView(_0x1c82ad["buffer"]);
    _0x4b77bb["setUint32"](0, 33639248, !![]), _0x4b77bb["setUint16"](4, 20, !![]), _0x4b77bb["setUint16"](6, 20, !![]), _0x4b77bb["setUint16"](10, 0, !![]), _0x4b77bb["setUint32"](16, _0x30228e, !![]), _0x4b77bb["setUint32"](20, _0x1b4e6f["data"]["length"], !![]), _0x4b77bb["setUint32"](24, _0x1b4e6f["data"]["length"], !![]), _0x4b77bb["setUint16"](28, _0x138780["length"], !![]), _0x4b77bb["setUint32"](42, _0xef1bcd, !![]), _0x1c82ad["set"](_0x138780, 46), _0x4dce30["push"](_0x1c82ad), _0xef1bcd += _0x1e667f["length"];
  }
  const _0x2a34a9 = _0x4dce30["reduce"]((_0x3fb3d2, _0x3be24e) => _0x3fb3d2 + _0x3be24e["length"], 0), _0x190ae3 = new Uint8Array(22), _0x213127 = new DataView(_0x190ae3["buffer"]);
  return _0x213127["setUint32"](0, 101010256, !![]), _0x213127["setUint16"](8, _0x916733["length"], !![]), _0x213127["setUint16"](10, _0x916733["length"], !![]), _0x213127["setUint32"](12, _0x2a34a9, !![]), _0x213127["setUint32"](16, _0xef1bcd, !![]), concat([..._0x29d513, ..._0x4dce30, _0x190ae3]);
}
function crc32(_0x170ad4) {
  let _0x5d1e3f = 4294967295;
  for (const _0x56f647 of _0x170ad4) {
    _0x5d1e3f ^= _0x56f647;
    for (let _0x158803 = 0; _0x158803 < 8; _0x158803++) {
      _0x5d1e3f = _0x5d1e3f >>> 1 ^ ((_0x5d1e3f & 1) === 1 ? 3988292384 : 0);
    }
  }
  return (_0x5d1e3f ^ 4294967295) >>> 0;
}
function concat(_0x418bea) {
  const _0xec4f04 = _0x418bea["reduce"]((_0x507a65, _0x2078a2) => _0x507a65 + _0x2078a2["length"], 0), _0x4b54c4 = new Uint8Array(_0xec4f04);
  let _0x1061d6 = 0;
  for (const _0xdb9f12 of _0x418bea) {
    _0x4b54c4["set"](_0xdb9f12, _0x1061d6), _0x1061d6 += _0xdb9f12["length"];
  }
  return _0x4b54c4;
}
function getLayerGeoJSON(_0x3579eb, _0x111c4f, _0x3f6f89) {
  if (!("entities" in _0x3579eb["cesiumObject"])) return void 0;
  const _0xf6035d = _0x3579eb["cesiumObject"]["entities"]["values"]["filter"]((_0x205b32) => !_0x3f6f89(_0x205b32))["map"]((_0x5df249) => entityToGeoJSON(_0x5df249, _0x111c4f))["filter"]((_0x322de2) => _0x322de2 !== null);
  return { "type": "FeatureCollection", "features": _0xf6035d };
}
function exportLayerVector(_0x40b82d, _0x5a2644, _0x4fb5a1) {
  if (!_0x40b82d) return;
  const _0x57155b = vectorFile(_0x40b82d, _0x4fb5a1);
  triggerDownload(_0x57155b["blob"], _0x5a2644 + "-" + Date["now"]() + "." + _0x57155b["extension"]);
}
function exportLayerGeoJSON(_0x5110a7, _0x2b6c12) {
  exportLayerVector(_0x5110a7, _0x2b6c12, "geojson");
}
function exportLayerKml(_0x21040c, _0xbb7c5c) {
  exportLayerVector(_0x21040c, _0xbb7c5c, "kml");
}
function exportLayerShapefile(_0x41336b, _0x538daf) {
  exportLayerVector(_0x41336b, _0x538daf, "shp");
}
function bytesAsBuffer(_0x4adac5) {
  return _0x4adac5["buffer"]["slice"](_0x4adac5["byteOffset"], _0x4adac5["byteOffset"] + _0x4adac5["byteLength"]);
}
function vectorFile(_0x433054, _0x27474f) {
  if (_0x27474f === "kml") return { "blob": new Blob([featureCollectionToKml(_0x433054)], { "type": "application/vnd.google-earth.kml+xml" }), "extension": "kml" };
  if (_0x27474f === "shp") return { "blob": new Blob([bytesAsBuffer(featureCollectionToShapefileZip(_0x433054))], { "type": "application/zip" }), "extension": "zip" };
  return { "blob": new Blob([JSON["stringify"](_0x433054, null, 2)], { "type": "application/geo+json" }), "extension": "geojson" };
}
const GEOTIFF_EXPORT_MAX_WMS_DIMENSION = 2048;
function geoTiffExportDimensions(_0x3a6203, _0x477449) {
  if (!_0x3a6203) return { "width": _0x477449, "height": Math["round"](_0x477449 / 2) };
  const _0x1dd2c9 = Math["max"](_0x3a6203["east"] - _0x3a6203["west"], 1e-6), _0xa86bc1 = Math["max"](_0x3a6203["north"] - _0x3a6203["south"], 1e-6), _0x18b979 = _0x1dd2c9 >= _0xa86bc1 ? _0x477449 : Math["max"](64, Math["round"](_0x477449 * _0x1dd2c9 / _0xa86bc1)), _0xb2ee72 = _0xa86bc1 >= _0x1dd2c9 ? _0x477449 : Math["max"](64, Math["round"](_0x477449 * _0xa86bc1 / _0x1dd2c9));
  return { "width": _0x18b979, "height": _0xb2ee72 };
}
function buildWmsGeoTiffExportUrl(_0x3e37bf, _0x41f7d0) {
  const _0x4164dd = _0x41f7d0("wms", _0x3e37bf["url"]), { width: _0x196cef, height: _0x1cd83b } = geoTiffExportDimensions(_0x3e37bf["geographicBoundingBox"], GEOTIFF_EXPORT_MAX_WMS_DIMENSION), _0x275097 = _0x3e37bf["geographicBoundingBox"], _0x1360e6 = new URLSearchParams({ "SERVICE": "WMS", "REQUEST": "GetMap", "VERSION": "1.3.0", "LAYERS": _0x3e37bf["layers"], "STYLES": "", "FORMAT": _0x3e37bf["tiffFormat"], "TRANSPARENT": "false", "WIDTH": String(_0x196cef), "HEIGHT": String(_0x1cd83b), "CRS": "CRS:84", "BBOX": _0x275097 ? _0x275097["west"] + "," + _0x275097["south"] + "," + _0x275097["east"] + "," + _0x275097["north"] : "-180,-90,180,90" }), _0x4fdf18 = _0x4164dd["includes"]("?") ? "&" : "?";
  return "" + _0x4164dd + _0x4fdf18 + _0x1360e6["toString"]();
}
function buildWcsGeoTiffExportUrl(_0x49906e, _0x447e20) {
  const _0x51806c = _0x447e20("wcs", _0x49906e["url"]), _0x1a9676 = _0x49906e["version"] ?? "2.0.1", _0x30176c = { "service": "WCS", "version": _0x1a9676, "request": "GetCoverage", "coverageId": _0x49906e["coverageId"], "format": _0x49906e["tiffFormat"] };
  if (_0x1a9676["startsWith"]("2.")) {
    const _0x3718fd = _0x49906e["maxSize"] ?? 2048;
    if (Number["isFinite"](_0x3718fd)) _0x30176c["SCALESIZE"] = "x(" + _0x3718fd + "),y(" + _0x3718fd + ")";
  }
  const _0x18acec = _0x51806c["includes"]("?") ? "&" : "?";
  return "" + _0x51806c + _0x18acec + new URLSearchParams(_0x30176c)["toString"]();
}
function isGeoTiffExportAvailable(_0xf4242a, _0x45046f) {
  if (!_0xf4242a || _0xf4242a["layerType"] !== "WMS" && _0xf4242a["layerType"] !== "WCS") return ![];
  return !!_0x45046f && "tiffFormat" in _0x45046f && !!_0x45046f["tiffFormat"];
}
async function exportLayerAsGeoTiff(_0xa099be, _0x357929, _0x2791d3, _0x184ea4, _0x8f9681) {
  if (_0xa099be["layerType"] !== "WMS" && _0xa099be["layerType"] !== "WCS") throw new LayerOperationError("LAYER_GEOTIFF_EXPORT_UNSUPPORTED_TYPE", 'Katman WMS/WCS değil, GeoTIFF export desteklenmiyor: "' + _0xa099be["id"] + '"');
  if (!_0x357929 || !("tiffFormat" in _0x357929) || !_0x357929["tiffFormat"]) throw new LayerOperationError("LAYER_GEOTIFF_EXPORT_NOT_CONFIGURED", 'Katman GeoTIFF export desteklemiyor: "' + _0xa099be["id"] + '"');
  const _0x290fd1 = _0xa099be["layerType"] === "WMS" ? buildWmsGeoTiffExportUrl(_0x357929, _0x184ea4) : buildWcsGeoTiffExportUrl(_0x357929, _0x184ea4), _0x143fd9 = _0x8f9681["mergeApiKeyHeader"](_0x8f9681["buildAuthHeaders"](_0x357929["authToken"]), _0x290fd1), _0x5167d2 = await fetch(_0x290fd1, _0x143fd9 ? { "headers": _0x143fd9 } : void 0);
  if (!_0x5167d2["ok"]) throw new OgcRequestError("OGC_GEOTIFF_DOWNLOAD_FAILED", "GeoTIFF indirilemedi: " + _0x5167d2["status"] + " " + _0x5167d2["statusText"]);
  const _0x2d4566 = _0x5167d2["headers"]["get"]("content-type") ?? "", _0x3e0952 = await _0x5167d2["arrayBuffer"](), _0xc65409 = /boundary="?([^";]+)"?/i["exec"](_0x2d4566);
  let _0x5b0fc7;
  if (_0x2d4566["includes"]("multipart/") && _0xc65409) {
    const { bytes: _0x22e800, mimeType: _0x11d744 } = extractMultipartImage(new Uint8Array(_0x3e0952), _0xc65409[1]), _0x12c8dc = _0x22e800["buffer"]["slice"](_0x22e800["byteOffset"], _0x22e800["byteOffset"] + _0x22e800["byteLength"]);
    _0x5b0fc7 = new Blob([_0x12c8dc], { "type": _0x11d744 });
  } else _0x5b0fc7 = new Blob([_0x3e0952], { "type": _0x2d4566 || _0x357929["tiffFormat"] });
  triggerDownload(_0x5b0fc7, _0x2791d3 + "-" + Date["now"]() + ".tif");
}
function extractMultipartImage(_0x1dce09, _0x19ad94) {
  var _a2;
  const _0x4bb28a = new TextDecoder("iso-8859-1")["decode"](_0x1dce09), _0x549e86 = "--" + _0x19ad94;
  let _0x3f4e0e = 0;
  while (_0x3f4e0e < _0x4bb28a["length"]) {
    const _0x3adf01 = _0x4bb28a["indexOf"](_0x549e86, _0x3f4e0e);
    if (_0x3adf01 === -1) break;
    const _0x3a2d3a = _0x3adf01 + _0x549e86["length"], _0x21cbd0 = _0x4bb28a["indexOf"](_0x549e86, _0x3a2d3a);
    if (_0x21cbd0 === -1) break;
    const _0x251a1e = _0x4bb28a["indexOf"]("\r\n\r\n", _0x3a2d3a), _0x518967 = _0x4bb28a["indexOf"]("\n\n", _0x3a2d3a), _0x2b6234 = _0x251a1e !== -1 && (_0x518967 === -1 || _0x251a1e <= _0x518967) ? _0x251a1e : _0x518967, _0x14956c = _0x2b6234 === _0x251a1e ? 4 : 2;
    if (_0x2b6234 === -1 || _0x2b6234 >= _0x21cbd0) {
      _0x3f4e0e = _0x21cbd0;
      continue;
    }
    const _0x12a743 = /content-type:\s*([^\r\n;]+)/i["exec"](_0x4bb28a["slice"](_0x3a2d3a, _0x2b6234)), _0x2f7e59 = (_a2 = _0x12a743 == null ? void 0 : _0x12a743[1]) == null ? void 0 : _a2["trim"]();
    if (_0x2f7e59 == null ? void 0 : _0x2f7e59["startsWith"]("image/")) {
      const _0x1aa3a5 = _0x2b6234 + _0x14956c;
      let _0x25bbd8 = _0x21cbd0;
      if (_0x4bb28a[_0x25bbd8 - 2] === "\r" && _0x4bb28a[_0x25bbd8 - 1] === "\n") _0x25bbd8 -= 2;
      else {
        if (_0x4bb28a[_0x25bbd8 - 1] === "\n") _0x25bbd8 -= 1;
      }
      return { "bytes": _0x1dce09["slice"](_0x1aa3a5, _0x25bbd8), "mimeType": _0x2f7e59 };
    }
    _0x3f4e0e = _0x21cbd0;
  }
  throw new OgcRequestError("OGC_WCS_MULTIPART_IMAGE_NOT_FOUND", "Multipart WCS yanıtında görsel parçası bulunamadı.");
}
const POLE_SLICE_DEGREES = 90, POLE_LATITUDE_LIMIT = 89.9;
function clipRingToLongitude(_0x59f686, _0x5bb037, _0x34f2a0) {
  const _0x34442b = (_0x76fa) => _0x34f2a0 * (_0x76fa[0] - _0x5bb037) >= 0, _0x56a344 = [], _0xc5beb1 = (_0x4c4d36) => {
    const _0x2ffdeb = _0x56a344[_0x56a344["length"] - 1];
    if (_0x2ffdeb === void 0 || _0x2ffdeb[0] !== _0x4c4d36[0] || _0x2ffdeb[1] !== _0x4c4d36[1]) _0x56a344["push"]([_0x4c4d36[0], _0x4c4d36[1]]);
  };
  for (let _0x3b1992 = 0; _0x3b1992 < _0x59f686["length"] - 1; _0x3b1992++) {
    const _0x3f0ed0 = _0x59f686[_0x3b1992], _0x5b0f73 = _0x59f686[_0x3b1992 + 1];
    if (_0x34442b(_0x3f0ed0)) _0xc5beb1(_0x3f0ed0);
    if (_0x34442b(_0x3f0ed0) !== _0x34442b(_0x5b0f73)) {
      const _0x995302 = (_0x5bb037 - _0x3f0ed0[0]) / (_0x5b0f73[0] - _0x3f0ed0[0]);
      _0xc5beb1([_0x5bb037, _0x3f0ed0[1] + _0x995302 * (_0x5b0f73[1] - _0x3f0ed0[1])]);
    }
  }
  if (_0x56a344["length"] > 0) _0xc5beb1(_0x56a344[0]);
  return _0x56a344;
}
const _OutlineGeometry = class _OutlineGeometry {
  constructor(_0x23ac31) {
    this["outlineCompanionEntities"] = /* @__PURE__ */ new WeakSet(), this["entitiesWithOutlineCompanion"] = /* @__PURE__ */ new WeakSet(), this["entitiesWithRiskyOutline"] = /* @__PURE__ */ new WeakSet(), this["getCurrentTime"] = _0x23ac31["getCurrentTime"];
  }
  ["isOutlineCompanion"](_0x405732) {
    return this["outlineCompanionEntities"]["has"](_0x405732);
  }
  ["hasOutlineCompanion"](_0x1d46bc) {
    return this["entitiesWithOutlineCompanion"]["has"](_0x1d46bc);
  }
  ["hasRiskyOutline"](_0x28407b) {
    return this["entitiesWithRiskyOutline"]["has"](_0x28407b);
  }
  ["addPolygonOutlines"](_0x419a24, _0x540da7, _0x1398f6) {
    const _0xd02470 = _0x419a24["entities"]["values"]["filter"]((_0x40ed64) => _0x40ed64["polygon"] !== void 0 && !this["entitiesWithRiskyOutline"]["has"](_0x40ed64));
    _0x419a24["entities"]["suspendEvents"]();
    for (const _0x45adb8 of _0xd02470) {
      this["addPolygonOutlineCompanion"](_0x419a24, _0x45adb8, _0x540da7, _0x1398f6, !![]);
    }
    _0x419a24["entities"]["resumeEvents"]();
  }
  ["addPolygonOutlineCompanion"](_0x231886, _0x2e6288, _0x52d6f6, _0x11c4c6, _0xaf85bc) {
    var _a2;
    const _0x2d3695 = this["getCurrentTime"](), _0x359461 = (_a2 = _0x2e6288["polygon"]["hierarchy"]) == null ? void 0 : _a2["getValue"](_0x2d3695), _0x266342 = _0x359461 == null ? void 0 : _0x359461["positions"], _0x58c8bd = _0x266342 == null ? void 0 : _0x266342[0];
    if (_0x266342 === void 0 || _0x266342["length"] < 2 || _0x58c8bd === void 0) return;
    _0x2e6288["polygon"]["outline"] = new ConstantProperty(![]), this["entitiesWithOutlineCompanion"]["add"](_0x2e6288);
    const _0x4eab11 = _OutlineGeometry["simplifyOutlinePositions"]([..._0x266342, _0x58c8bd]), _0x9e7f8d = _0x231886["entities"]["add"]({ "id": _0x2e6288["id"] + "::outline", "polyline": { "positions": _0x4eab11, "clampToGround": _0xaf85bc, "width": _0x11c4c6, "material": _0x52d6f6 } });
    this["outlineCompanionEntities"]["add"](_0x9e7f8d), _0x9e7f8d["properties"] = new PropertyBag({ "__tucbsOutlineOf": _0x2e6288["id"] });
  }
  ["disableRiskyPolygonOutlines"](_0x22a715) {
    var _a2, _b;
    const _0x69c604 = JulianDate["now"]();
    _0x22a715["entities"]["suspendEvents"]();
    for (const _0x2807ac of [..._0x22a715["entities"]["values"]]) {
      const _0x3b4ed9 = _0x2807ac["polygon"], _0x5874f9 = (_a2 = _0x3b4ed9 == null ? void 0 : _0x3b4ed9["hierarchy"]) == null ? void 0 : _a2["getValue"](_0x69c604);
      if (_0x3b4ed9 !== void 0 && this["risksAntimeridianOrPoleBug"](_0x5874f9 == null ? void 0 : _0x5874f9["positions"])) {
        _0x3b4ed9["outline"] = new ConstantProperty(![]), this["entitiesWithRiskyOutline"]["add"](_0x2807ac);
        if (_0x5874f9 !== void 0 && this["splitPoleEnclosingPolygon"](_0x22a715, _0x2807ac, _0x5874f9, _0x69c604)) continue;
        _0x3b4ed9["height"] === void 0 && ((_b = _0x3b4ed9["perPositionHeight"]) == null ? void 0 : _b["getValue"](_0x69c604)) !== !![] && (_0x3b4ed9["height"] = new ConstantProperty(0));
      }
    }
    _0x22a715["entities"]["resumeEvents"]();
  }
  ["splitPoleEnclosingPolygon"](_0x51e521, _0x16c3e6, _0x1afccb, _0xcd49dd) {
    var _a2;
    const _0x26973b = _0x16c3e6["polygon"];
    if (_0x26973b === void 0 || _0x1afccb["holes"]["length"] > 0) return ![];
    const _0x8ff487 = _0x1afccb["positions"]["map"]((_0x9947eb) => {
      const _0x3ca5c6 = Cartographic["fromCartesian"](_0x9947eb);
      return [_0x584e42["toDegrees"](_0x3ca5c6["longitude"]), _0x584e42["toDegrees"](_0x3ca5c6["latitude"])];
    });
    let _0x1bf136 = Infinity, _0x22dd46 = -Infinity;
    for (let _0x5158e5 = 0; _0x5158e5 < _0x8ff487["length"]; _0x5158e5++) {
      const [_0x3dbf4f] = _0x8ff487[_0x5158e5];
      if (_0x5158e5 > 0 && Math["abs"](_0x3dbf4f - _0x8ff487[_0x5158e5 - 1][0]) > 180) return ![];
      _0x1bf136 = Math["min"](_0x1bf136, _0x3dbf4f), _0x22dd46 = Math["max"](_0x22dd46, _0x3dbf4f);
    }
    if (_0x22dd46 - _0x1bf136 < 359) return ![];
    const _0x4d891e = [..._0x8ff487, _0x8ff487[0]]["map"](([_0x1aaef1, _0x3ae8ae]) => [_0x1aaef1, Math["max"](-POLE_LATITUDE_LIMIT, Math["min"](POLE_LATITUDE_LIMIT, _0x3ae8ae))]), _0x243abc = [];
    for (let _0x103752 = -180; _0x103752 < 180; _0x103752 += POLE_SLICE_DEGREES) {
      const _0x2448ee = clipRingToLongitude(clipRingToLongitude(_0x4d891e, _0x103752, 1), _0x103752 + POLE_SLICE_DEGREES, -1)["slice"](0, -1);
      if (_0x2448ee["length"] >= 3) _0x243abc["push"](Cartesian3["fromDegreesArray"](_0x2448ee["flat"]()));
    }
    if (_0x243abc["length"] === 0) return ![];
    const _0x5efd48 = (_a2 = _0x16c3e6["properties"]) == null ? void 0 : _a2["getValue"](_0xcd49dd);
    return _0x243abc["forEach"]((_0x4477bf, _0x42a126) => {
      const _0x1d41f8 = new ConstantProperty(new PolygonHierarchy(_0x4477bf));
      if (_0x42a126 === 0) {
        _0x26973b["hierarchy"] = _0x1d41f8;
        return;
      }
      const _0x538206 = _0x26973b["clone"]();
      _0x538206["hierarchy"] = _0x1d41f8;
      const _0x34e5cf = _0x51e521["entities"]["add"]({ "id": _0x16c3e6["id"] + "::part-" + _0x42a126, ..._0x16c3e6["name"] !== void 0 ? { "name": _0x16c3e6["name"] } : {}, "polygon": _0x538206 });
      if (_0x5efd48 !== void 0) _0x34e5cf["properties"] = new PropertyBag(_0x5efd48);
      this["entitiesWithRiskyOutline"]["add"](_0x34e5cf);
    }), !![];
  }
  ["risksAntimeridianOrPoleBug"](_0xc2ab58) {
    if (!_0xc2ab58 || _0xc2ab58["length"] < 2) return ![];
    let _0x5b3935;
    for (const _0x204504 of _0xc2ab58) {
      const _0x4461e7 = Cartographic["fromCartesian"](_0x204504), _0x5af9c7 = _0x584e42["toDegrees"](_0x4461e7["latitude"]);
      if (Math["abs"](_0x5af9c7) > 89) return !![];
      const _0x436ea9 = _0x584e42["toDegrees"](_0x4461e7["longitude"]);
      if (_0x5b3935 !== void 0 && Math["abs"](_0x436ea9 - _0x5b3935) > 180) return !![];
      _0x5b3935 = _0x436ea9;
    }
    return ![];
  }
  ["flattenSuspiciousGeometry"](_0x3a2d0a) {
    _0x3a2d0a["entities"]["suspendEvents"]();
    for (const _0x4ba153 of _0x3a2d0a["entities"]["values"]) {
      if (_0x4ba153["polygon"] !== void 0) _0x4ba153["polygon"]["granularity"] = new ConstantProperty(Math["PI"]);
      if (_0x4ba153["polyline"] !== void 0) _0x4ba153["polyline"]["granularity"] = new ConstantProperty(Math["PI"]);
    }
    _0x3a2d0a["entities"]["resumeEvents"]();
  }
  static ["douglasPeucker"](_0x53dcdb, _0x4898ff) {
    const _0x1c38dd = new Array(_0x53dcdb["length"])["fill"](![]);
    _0x1c38dd[0] = !![], _0x1c38dd[_0x53dcdb["length"] - 1] = !![];
    const _0x2970dd = [[0, _0x53dcdb["length"] - 1]];
    while (_0x2970dd["length"] > 0) {
      const [_0x44fa62, _0x246d51] = _0x2970dd["pop"]();
      if (_0x246d51 <= _0x44fa62 + 1) continue;
      let _0x949f53 = -1, _0x26c1f0 = -1;
      for (let _0x29a7c4 = _0x44fa62 + 1; _0x29a7c4 < _0x246d51; _0x29a7c4++) {
        const _0xaccb71 = _OutlineGeometry["perpendicularDistance"](_0x53dcdb[_0x29a7c4], _0x53dcdb[_0x44fa62], _0x53dcdb[_0x246d51]);
        _0xaccb71 > _0x949f53 && (_0x949f53 = _0xaccb71, _0x26c1f0 = _0x29a7c4);
      }
      _0x949f53 > _0x4898ff && (_0x1c38dd[_0x26c1f0] = !![], _0x2970dd["push"]([_0x44fa62, _0x26c1f0], [_0x26c1f0, _0x246d51]));
    }
    return _0x53dcdb["filter"]((_0x17847c, _0x4ece69) => _0x1c38dd[_0x4ece69]);
  }
  static ["perpendicularDistance"](_0x469a44, _0x104267, _0x547b05) {
    const _0x57080c = Cartesian3["subtract"](_0x547b05, _0x104267, new Cartesian3()), _0xa65298 = Cartesian3["magnitudeSquared"](_0x57080c);
    if (_0xa65298 === 0) return Cartesian3["distance"](_0x469a44, _0x104267);
    const _0x446524 = Cartesian3["subtract"](_0x469a44, _0x104267, new Cartesian3()), _0x293bc4 = _0x584e42["clamp"](Cartesian3["dot"](_0x446524, _0x57080c) / _0xa65298, 0, 1), _0x31e1fc = Cartesian3["add"](_0x104267, Cartesian3["multiplyByScalar"](_0x57080c, _0x293bc4, _0x57080c), _0x57080c);
    return Cartesian3["distance"](_0x469a44, _0x31e1fc);
  }
  static ["uniformDecimate"](_0x1a84f6, _0x1aca4b) {
    if (_0x1a84f6["length"] <= _0x1aca4b) return [..._0x1a84f6];
    const _0x4b61f5 = (_0x1a84f6["length"] - 1) / (_0x1aca4b - 1);
    return Array["from"]({ "length": _0x1aca4b }, (_0x42a72e, _0x101a69) => _0x1a84f6[Math["round"](_0x101a69 * _0x4b61f5)]);
  }
  static ["polygonExtentMeters"](_0x586a1a) {
    let _0x8062bb = Infinity, _0x1889de = Infinity, _0x4d9b4e = Infinity, _0x1938f9 = -Infinity, _0x4229c0 = -Infinity, _0x3288db = -Infinity;
    for (const _0x1fe027 of _0x586a1a) {
      if (_0x1fe027["x"] < _0x8062bb) _0x8062bb = _0x1fe027["x"];
      if (_0x1fe027["x"] > _0x1938f9) _0x1938f9 = _0x1fe027["x"];
      if (_0x1fe027["y"] < _0x1889de) _0x1889de = _0x1fe027["y"];
      if (_0x1fe027["y"] > _0x4229c0) _0x4229c0 = _0x1fe027["y"];
      if (_0x1fe027["z"] < _0x4d9b4e) _0x4d9b4e = _0x1fe027["z"];
      if (_0x1fe027["z"] > _0x3288db) _0x3288db = _0x1fe027["z"];
    }
    return Math["sqrt"]((_0x1938f9 - _0x8062bb) ** 2 + (_0x4229c0 - _0x1889de) ** 2 + (_0x3288db - _0x4d9b4e) ** 2);
  }
  static ["simplifyOutlinePositions"](_0x2988f3) {
    const _0x9b36ac = _OutlineGeometry["polygonExtentMeters"](_0x2988f3), _0x30ef33 = _0x584e42["clamp"](_0x9b36ac * _OutlineGeometry["OUTLINE_SIMPLIFY_TOLERANCE_FACTOR"], _OutlineGeometry["OUTLINE_SIMPLIFY_MIN_TOLERANCE_METERS"], _OutlineGeometry["OUTLINE_SIMPLIFY_MAX_TOLERANCE_METERS"]), _0x5ed2f8 = _OutlineGeometry["douglasPeucker"](_0x2988f3, _0x30ef33);
    return _0x5ed2f8["length"] > _OutlineGeometry["OUTLINE_MAX_VERTICES"] ? _OutlineGeometry["uniformDecimate"](_0x5ed2f8, _OutlineGeometry["OUTLINE_MAX_VERTICES"]) : _0x5ed2f8;
  }
};
_OutlineGeometry["OUTLINE_SIMPLIFY_TOLERANCE_FACTOR"] = 7e-5;
_OutlineGeometry["OUTLINE_SIMPLIFY_MIN_TOLERANCE_METERS"] = 0.25;
_OutlineGeometry["OUTLINE_SIMPLIFY_MAX_TOLERANCE_METERS"] = 150;
_OutlineGeometry["OUTLINE_MAX_VERTICES"] = 1200;
let OutlineGeometry = _OutlineGeometry;
class OpacityController {
  constructor(_0x289593) {
    this["dataSourceOpacityStates"] = /* @__PURE__ */ new WeakMap(), this["dataSourceOpacityProperties"] = /* @__PURE__ */ new WeakMap(), this["requestRender"] = _0x289593["requestRender"];
  }
  ["getWrappedBaseColor"](_0x74ff68) {
    return this["dataSourceOpacityProperties"]["get"](_0x74ff68);
  }
  ["prepareDataSourceOpacity"](_0x22dd73) {
    var _a2, _b;
    const _0x455b42 = this["getDataSourceOpacityState"](_0x22dd73), _0x273b8d = JulianDate["now"]();
    _0x22dd73["entities"]["suspendEvents"]();
    for (const _0xac7182 of _0x22dd73["entities"]["values"]) {
      if (((_a2 = _0xac7182["polygon"]) == null ? void 0 : _a2["material"]) instanceof ColorMaterialProperty) {
        const _0x2073f2 = _0xac7182["polygon"]["material"];
        this["installOpacityColorProperty"](_0x2073f2["color"], _0x455b42, _0x273b8d, new Color(1, 1, 1, 0.5), (_0x132b22) => _0x2073f2["color"] = _0x132b22);
      }
      if (((_b = _0xac7182["polyline"]) == null ? void 0 : _b["material"]) instanceof ColorMaterialProperty) {
        const _0x29e04b = _0xac7182["polyline"]["material"];
        this["installOpacityColorProperty"](_0x29e04b["color"], _0x455b42, _0x273b8d, Color["WHITE"], (_0x4816be) => _0x29e04b["color"] = _0x4816be);
      }
      _0xac7182["point"] !== void 0 && this["installOpacityColorProperty"](_0xac7182["point"]["color"], _0x455b42, _0x273b8d, Color["WHITE"], (_0x15cbdd) => _0xac7182["point"]["color"] = _0x15cbdd), _0xac7182["billboard"] !== void 0 && this["installOpacityColorProperty"](_0xac7182["billboard"]["color"], _0x455b42, _0x273b8d, Color["WHITE"], (_0x5a839d) => _0xac7182["billboard"]["color"] = _0x5a839d);
    }
    _0x22dd73["entities"]["resumeEvents"]();
  }
  ["ensureDynamicFillColor"](_0x54b0fc, _0x1ecd53) {
    var _a2;
    if (!(((_a2 = _0x1ecd53["polygon"]) == null ? void 0 : _a2["material"]) instanceof ColorMaterialProperty)) return;
    const _0x17dddf = this["getDataSourceOpacityState"](_0x54b0fc), _0x1772d1 = _0x1ecd53["polygon"]["material"];
    this["installOpacityColorProperty"](_0x1772d1["color"], _0x17dddf, JulianDate["now"](), new Color(1, 1, 1, 0.5), (_0x13fd09) => _0x1772d1["color"] = _0x13fd09);
  }
  ["setDataSourceOpacity"](_0x125c2f, _0x104670) {
    const _0x29496b = this["getDataSourceOpacityState"](_0x125c2f);
    if (_0x29496b["opacity"] === _0x104670) return;
    _0x29496b["opacity"] = _0x104670, !_0x29496b["wrapped"] && _0x104670 !== 1 && (this["prepareDataSourceOpacity"](_0x125c2f), _0x29496b["wrapped"] = !![]), this["requestRender"]();
  }
  ["getDataSourceOpacityState"](_0x34d548) {
    let _0x350a65 = this["dataSourceOpacityStates"]["get"](_0x34d548);
    return _0x350a65 === void 0 && (_0x350a65 = { "opacity": 1, "wrapped": ![] }, this["dataSourceOpacityStates"]["set"](_0x34d548, _0x350a65)), _0x350a65;
  }
  ["installOpacityColorProperty"](_0x5976ac, _0x18b8e9, _0x2a9169, _0x5a32fc, _0x55e8cf) {
    if (_0x5976ac !== void 0 && this["dataSourceOpacityProperties"]["has"](_0x5976ac)) return;
    const _0x9f5ea6 = this["readColorProperty"](_0x5976ac, _0x2a9169, _0x5a32fc), _0x5aee06 = this["createOpacityColorProperty"](_0x9f5ea6, _0x18b8e9);
    _0x55e8cf(_0x5aee06);
  }
  ["readColorProperty"](_0xb065e5, _0x4abacd, _0x229bb7) {
    const _0x28d74f = _0xb065e5 == null ? void 0 : _0xb065e5["getValue"](_0x4abacd);
    return _0x28d74f instanceof Color ? Color["clone"](_0x28d74f, new Color()) : Color["clone"](_0x229bb7, new Color());
  }
  ["createOpacityColorProperty"](_0x5a12a3, _0x20b95b) {
    const _0x2af2b2 = Color["clone"](_0x5a12a3, new Color()), _0x5362c1 = new CallbackProperty((_0x5cc9a7, _0x1ba4f7) => {
      const _0x415a14 = _0x1ba4f7 instanceof Color ? _0x1ba4f7 : new Color();
      return _0x415a14["red"] = _0x2af2b2["red"], _0x415a14["green"] = _0x2af2b2["green"], _0x415a14["blue"] = _0x2af2b2["blue"], _0x415a14["alpha"] = _0x2af2b2["alpha"] * _0x20b95b["opacity"], _0x415a14;
    }, ![]);
    return this["dataSourceOpacityProperties"]["set"](_0x5362c1, _0x2af2b2), _0x5362c1;
  }
}
const _CameraHighlight = class _CameraHighlight {
  constructor(_0x286a18, _0x1868c0) {
    this["viewer"] = _0x286a18, this["deps"] = _0x1868c0;
  }
  async ["zoomToLayer"](_0x301075) {
    const _0x3e3889 = this["deps"]["requireLayer"](_0x301075);
    return this["viewer"]["zoomTo"](_0x3e3889["cesiumObject"], new HeadingPitchRange(0, -_0x584e42["PI_OVER_TWO"], 0));
  }
  async ["zoomToEntity"](_0x413712, _0xca93a) {
    var _a2, _b;
    const _0x482ae3 = this["viewer"]["clock"]["currentTime"];
    let _0x48c2d6;
    if (((_a2 = _0x413712["polygon"]) == null ? void 0 : _a2["hierarchy"]) !== void 0) {
      const _0x3627ed = _0x413712["polygon"]["hierarchy"]["getValue"](_0x482ae3);
      _0x48c2d6 = _0x3627ed == null ? void 0 : _0x3627ed["positions"];
    } else ((_b = _0x413712["polyline"]) == null ? void 0 : _b["positions"]) !== void 0 && (_0x48c2d6 = _0x413712["polyline"]["positions"]["getValue"](_0x482ae3));
    if (_0x48c2d6 !== void 0 && _0x48c2d6["length"] > 0) {
      const _0x28c2ac = BoundingSphere["fromPoints"](_0x48c2d6), _0x47cec1 = Math["max"](_0x28c2ac["radius"] * 2, 50);
      return new Promise((_0xc0ecde) => {
        this["viewer"]["camera"]["flyToBoundingSphere"](_0x28c2ac, { "offset": new HeadingPitchRange(0, -_0x584e42["PI_OVER_TWO"], _0x47cec1), ...(_0xca93a == null ? void 0 : _0xca93a["duration"]) !== void 0 ? { "duration": _0xca93a["duration"] } : {}, "complete": () => _0xc0ecde(!![]), "cancel": () => _0xc0ecde(![]) });
      });
    }
    return this["viewer"]["zoomTo"](_0x413712, new HeadingPitchRange(0, -_0x584e42["PI_OVER_TWO"], 0));
  }
  static ["elevate"](_0x158d07, _0x4d3878) {
    return _0x158d07["map"]((_0x1ad603) => {
      const _0x527703 = Cartographic["fromCartesian"](_0x1ad603);
      return Cartesian3["fromRadians"](_0x527703["longitude"], _0x527703["latitude"], _0x527703["height"] + _0x4d3878);
    });
  }
  ["highlightEntity"](_0xd283bd) {
    var _a2, _b, _c;
    const _0x2325fe = this["viewer"]["clock"]["currentTime"], _0x146e43 = (_a2 = _0xd283bd["properties"]) == null ? void 0 : _a2["getValue"](_0x2325fe), _0x41b163 = _0x146e43 == null ? void 0 : _0x146e43["layerId"], _0x345437 = _0x41b163 !== void 0 ? this["deps"]["getLayerStyle"](_0x41b163) : void 0, _0x3740ca = _CameraHighlight["HIGHLIGHT_COLOR"], _0x14ce6a = ((_0x345437 == null ? void 0 : _0x345437["outline"]["width"]) ?? 2) + 4, _0x381852 = new ColorMaterialProperty(_0x3740ca), _0x480bdd = new Entity();
    if (((_b = _0xd283bd["polygon"]) == null ? void 0 : _b["hierarchy"]) !== void 0) {
      const _0x40c6f9 = _0xd283bd["polygon"]["hierarchy"]["getValue"](_0x2325fe), _0x24a9d1 = _0x40c6f9 == null ? void 0 : _0x40c6f9["positions"];
      if (_0x24a9d1 === void 0 || _0x24a9d1["length"] < 2) return;
      const _0x57467e = Cartesian3["equals"](_0x24a9d1[0], _0x24a9d1[_0x24a9d1["length"] - 1]) ? _0x24a9d1 : [..._0x24a9d1, _0x24a9d1[0]];
      _0x480bdd["polyline"] = new PolylineGraphics({ "positions": _CameraHighlight["elevate"](_0x57467e, _CameraHighlight["HIGHLIGHT_ELEVATION_METERS"]), "width": _0x14ce6a, "material": _0x381852, "depthFailMaterial": _0x381852 });
    } else {
      if (((_c = _0xd283bd["polyline"]) == null ? void 0 : _c["positions"]) !== void 0) {
        const _0x5757d1 = _0xd283bd["polyline"]["positions"]["getValue"](_0x2325fe);
        if (_0x5757d1 === void 0 || _0x5757d1["length"] < 2) return;
        _0x480bdd["polyline"] = new PolylineGraphics({ "positions": _CameraHighlight["elevate"](_0x5757d1, _CameraHighlight["HIGHLIGHT_ELEVATION_METERS"]), "width": _0x14ce6a, "material": _0x381852, "depthFailMaterial": _0x381852 });
      } else {
        if (_0xd283bd["position"] !== void 0) {
          const _0xe15a58 = _0xd283bd["position"]["getValue"](_0x2325fe);
          if (_0xe15a58 === void 0) return;
          _0x480bdd["position"] = new ConstantPositionProperty(_0xe15a58), _0x480bdd["point"] = new PointGraphics({ "pixelSize": _0x14ce6a + 12, "color": _0x3740ca, "disableDepthTestDistance": Number["POSITIVE_INFINITY"] });
        } else return;
      }
    }
    !this["highlightDataSource"] ? (this["highlightDataSource"] = new CustomDataSource("__tucbs_highlight__"), void this["viewer"]["dataSources"]["add"](this["highlightDataSource"])) : this["highlightDataSource"]["entities"]["removeAll"](), this["highlightDataSource"]["entities"]["add"](_0x480bdd);
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
  constructor(_0xa0c6c1) {
    this["appliedLayerStyles"] = /* @__PURE__ */ new Map(), this["appliedCompanionWidths"] = /* @__PURE__ */ new Map(), this["outlineGeometry"] = _0xa0c6c1["outlineGeometry"], this["opacityController"] = _0xa0c6c1["opacityController"], this["getCurrentTime"] = _0xa0c6c1["getCurrentTime"], this["requestRender"] = _0xa0c6c1["requestRender"], this["emitStyle"] = _0xa0c6c1["emitStyle"], this["waitForRenderSettle"] = _0xa0c6c1["waitForRenderSettle"];
  }
  async ["applyLayerStyle"](_0x34259f, _0x559f6a, _0x5e7273, _0x19d9b3) {
    var _a2;
    const _0x5c2fbd = this["appliedCompanionWidths"]["get"](_0x34259f) ?? ((_a2 = this["appliedLayerStyles"]["get"](_0x34259f)) == null ? void 0 : _a2["outline"]["width"]), _0x1ca8ad = this["getCurrentTime"](), _0x30e940 = this["resolveStyleRange"](_0x559f6a, _0x1ca8ad, _0x19d9b3["fill"]), _0x4b7f5f = [], _0x2db988 = /* @__PURE__ */ new Map();
    _0x559f6a["entities"]["suspendEvents"]();
    for (const _0x3b6e37 of _0x559f6a["entities"]["values"]) {
      if (this["outlineGeometry"]["isOutlineCompanion"](_0x3b6e37)) {
        _0x4b7f5f["push"](_0x3b6e37);
        continue;
      }
      const _0x42aa75 = this["resolveFillColor"](_0x3b6e37, _0x19d9b3["fill"], _0x30e940, _0x1ca8ad);
      if (_0x3b6e37["polygon"] !== void 0 && _0x42aa75 !== void 0) _0x2db988["set"](_0x3b6e37["id"], _0x42aa75);
      this["applyEntityStyle"](_0x3b6e37, _0x42aa75, _0x19d9b3["outline"], _0x5e7273);
    }
    const _0x34acf4 = this["styleOutlineCompanions"](_0x4b7f5f, _0x19d9b3["outline"], _0x5e7273, _0x2db988);
    _0x559f6a["entities"]["resumeEvents"]();
    const _0x5dfae8 = _0x30e940 !== null && (_0x19d9b3["fill"]["mode"] === "gradient" || _0x19d9b3["fill"]["mode"] === "bin") ? { ..._0x19d9b3, "fill": { ..._0x19d9b3["fill"], "min": _0x30e940["min"], "max": _0x30e940["max"] } } : _0x19d9b3;
    this["appliedLayerStyles"]["set"](_0x34259f, _0x5dfae8), this["requestRender"](), this["emitStyle"](_0x34259f, _0x5dfae8), this["appliedCompanionWidths"]["set"](_0x34259f, _0x34acf4);
    const _0x16dd2a = _0x5c2fbd === void 0 || _0x5c2fbd !== _0x34acf4;
    if (_0x16dd2a) await this["waitForRenderSettle"]();
  }
  ["styleOutlineCompanions"](_0xd45fed, _0x31954d, _0xf85066, _0x52a7c2) {
    const _0x14704f = _0x31954d["enabled"] ? Color["fromCssColorString"](_0x31954d["color"]) : void 0, _0x525081 = _0x31954d["enabled"] ? _0x31954d["width"] : SEAM_COVER_WIDTH;
    for (const _0x4b56a8 of _0xd45fed) {
      const _0x257dc1 = _0x31954d["enabled"] || _0xf85066 ? void 0 : _0x52a7c2["get"](LayerStyleEngine["outlineOwnerId"](_0x4b56a8)), _0x454a0a = _0x257dc1 !== void 0 && _0x257dc1["alpha"] >= 1;
      _0x4b56a8["show"] = _0x31954d["enabled"] || _0x454a0a;
      const _0x5716e1 = _0x14704f ?? (_0x454a0a ? _0x257dc1 : void 0);
      _0x5716e1 !== void 0 && _0x4b56a8["polyline"] !== void 0 && (_0x4b56a8["polyline"]["material"] = this["updateColorMaterial"](_0x4b56a8["polyline"]["material"], _0x5716e1), _0x4b56a8["polyline"]["width"] = LayerStyleEngine["updateConstantProperty"](_0x4b56a8["polyline"]["width"], _0x525081));
    }
    return _0x525081;
  }
  static ["outlineOwnerId"](_0x25535d) {
    return _0x25535d["id"]["endsWith"](OUTLINE_ID_SUFFIX) ? _0x25535d["id"]["slice"](0, -OUTLINE_ID_SUFFIX["length"]) : _0x25535d["id"];
  }
  ["getStyle"](_0x1a117b) {
    return this["appliedLayerStyles"]["get"](_0x1a117b);
  }
  ["deleteStyle"](_0x383c78) {
    this["appliedLayerStyles"]["delete"](_0x383c78), this["appliedCompanionWidths"]["delete"](_0x383c78);
  }
  ["recordInitialStyle"](_0x8d0769, _0x48c648, _0x419fb1, _0x1f8852) {
    const _0x16cd08 = { "fill": { "mode": "solid", "color": _0x48c648, "opacity": _0x419fb1 }, "outline": _0x1f8852 };
    this["appliedLayerStyles"]["set"](_0x8d0769, _0x16cd08), this["emitStyle"](_0x8d0769, _0x16cd08);
  }
  ["randomLayerColor"]() {
    return Color["fromRandom"]({ "alpha": 1 });
  }
  ["applyEntityColor"](_0x4a7628, _0x4b0ace) {
    _0x4a7628["entities"]["suspendEvents"]();
    for (const _0x176908 of _0x4a7628["entities"]["values"]) {
      _0x176908["polygon"] !== void 0 && (_0x176908["polygon"]["material"] = new ColorMaterialProperty(new ConstantProperty(_0x4b0ace["withAlpha"](0.5)))), _0x176908["polyline"] !== void 0 && (_0x176908["polyline"]["material"] = new ColorMaterialProperty(new ConstantProperty(_0x4b0ace))), _0x176908["point"] !== void 0 && (_0x176908["point"]["color"] = new ConstantProperty(_0x4b0ace)), _0x176908["billboard"] !== void 0 && (_0x176908["billboard"]["color"] = new ConstantProperty(_0x4b0ace));
    }
    _0x4a7628["entities"]["resumeEvents"]();
  }
  ["convertMarkersToPoints"](_0x175067, _0x4cde1d) {
    _0x175067["entities"]["suspendEvents"]();
    for (const _0x4a9fa0 of _0x175067["entities"]["values"]) {
      if (_0x4a9fa0["billboard"] === void 0) continue;
      const _0x46c3bf = _0x4a9fa0["billboard"]["heightReference"];
      _0x4a9fa0["point"] = new PointGraphics({ "pixelSize": 8, "color": _0x4cde1d, ..._0x46c3bf !== void 0 ? { "heightReference": _0x46c3bf } : {} }), _0x4a9fa0["billboard"] = void 0;
    }
    _0x175067["entities"]["resumeEvents"]();
  }
  ["applyEntityStyle"](_0x3c5f0f, _0x9e904e, _0x380672, _0x1bdf73) {
    const _0x159b8e = _0x380672["enabled"] ? Color["fromCssColorString"](_0x380672["color"]) : void 0;
    _0x3c5f0f["polygon"] !== void 0 && (_0x3c5f0f["polygon"]["material"] = this["updateColorMaterial"](_0x3c5f0f["polygon"]["material"], _0x9e904e ?? Color["WHITE"]["withAlpha"](0)), !this["outlineGeometry"]["hasOutlineCompanion"](_0x3c5f0f) && !this["outlineGeometry"]["hasRiskyOutline"](_0x3c5f0f) && (_0x3c5f0f["polygon"]["outline"] = LayerStyleEngine["updateConstantProperty"](_0x3c5f0f["polygon"]["outline"], _0x380672["enabled"]), _0x159b8e !== void 0 && (_0x3c5f0f["polygon"]["outlineColor"] = LayerStyleEngine["updateConstantProperty"](_0x3c5f0f["polygon"]["outlineColor"], _0x159b8e), _0x3c5f0f["polygon"]["outlineWidth"] = LayerStyleEngine["updateConstantProperty"](_0x3c5f0f["polygon"]["outlineWidth"], _0x380672["width"]))));
    if (_0x3c5f0f["polyline"] !== void 0) {
      let _0x17607f;
      _0x1bdf73 ? _0x17607f = _0x159b8e ?? Color["WHITE"]["withAlpha"](0) : _0x17607f = _0x380672["enabled"] ? _0x159b8e : _0x9e904e, _0x3c5f0f["polyline"]["material"] = this["updateColorMaterial"](_0x3c5f0f["polyline"]["material"], _0x17607f ?? Color["WHITE"]["withAlpha"](0)), _0x380672["enabled"] && (_0x3c5f0f["polyline"]["width"] = LayerStyleEngine["updateConstantProperty"](_0x3c5f0f["polyline"]["width"], _0x380672["width"]));
    }
    _0x3c5f0f["point"] !== void 0 && (_0x3c5f0f["point"]["color"] = _0x9e904e !== void 0 ? this["updateColorProperty"](_0x3c5f0f["point"]["color"], _0x9e904e) : void 0, _0x380672["enabled"] && _0x159b8e !== void 0 && (_0x3c5f0f["point"]["outlineColor"] = LayerStyleEngine["updateConstantProperty"](_0x3c5f0f["point"]["outlineColor"], _0x159b8e), _0x3c5f0f["point"]["outlineWidth"] = LayerStyleEngine["updateConstantProperty"](_0x3c5f0f["point"]["outlineWidth"], _0x380672["width"]))), _0x3c5f0f["billboard"] !== void 0 && _0x9e904e !== void 0 && (_0x3c5f0f["billboard"]["color"] = this["updateColorProperty"](_0x3c5f0f["billboard"]["color"], _0x9e904e));
  }
  ["resolveFillColor"](_0x7bf15a, _0x35022b, _0x45366b, _0x164153) {
    switch (_0x35022b["mode"]) {
      case "off":
        return void 0;
      case "solid":
        return Color["fromCssColorString"](_0x35022b["color"])["withAlpha"](_0x35022b["opacity"]);
      case "gradient": {
        if (_0x45366b === null) return void 0;
        const _0x285a03 = this["readNumericProperty"](_0x7bf15a, _0x35022b["column"], _0x164153);
        if (_0x285a03 === null) return void 0;
        if (_0x285a03 < _0x45366b["min"] || _0x285a03 > _0x45366b["max"]) return void 0;
        const _0x44fe58 = _0x45366b["max"] === _0x45366b["min"] ? 0.5 : _0x584e42["clamp"]((_0x285a03 - _0x45366b["min"]) / (_0x45366b["max"] - _0x45366b["min"]), 0, 1);
        return LayerStyleEngine["sampleFromPalette"](_0x35022b["palette"], _0x44fe58, _0x35022b["paletteKind"])["withAlpha"](_0x35022b["opacity"]);
      }
      case "bin": {
        if (_0x45366b === null) return void 0;
        const _0x23e4bc = this["readNumericProperty"](_0x7bf15a, _0x35022b["column"], _0x164153);
        if (_0x23e4bc === null) return void 0;
        const _0x25eb2f = (_0x45366b["max"] - _0x45366b["min"]) / _0x35022b["binCount"], _0x462b60 = Array["from"]({ "length": _0x35022b["binCount"] }, (_0x40c931, _0x24356c) => _0x45366b["min"] + _0x25eb2f * (_0x24356c + 1)), _0x3897e7 = LayerStyleEngine["pickBin"](_0x23e4bc, _0x462b60), _0x59bb09 = _0x35022b["binCount"] <= 1 ? 0.5 : _0x3897e7 / (_0x35022b["binCount"] - 1);
        return LayerStyleEngine["sampleFromPalette"](_0x35022b["palette"], _0x59bb09, _0x35022b["paletteKind"])["withAlpha"](_0x35022b["opacity"]);
      }
      case "enum": {
        const _0x1c63b6 = this["readProperty"](_0x7bf15a, _0x35022b["column"], _0x164153);
        if (_0x1c63b6 === null) return void 0;
        const _0x3a3ff4 = _0x35022b["colors"][String(_0x1c63b6)];
        return _0x3a3ff4 !== void 0 ? Color["fromCssColorString"](_0x3a3ff4)["withAlpha"](_0x35022b["opacity"]) : Color["LIGHTGRAY"]["withAlpha"](_0x35022b["opacity"]);
      }
    }
  }
  ["readProperty"](_0x21506c, _0x203b22, _0x4b1d62) {
    const _0x221a2c = _0x21506c["properties"];
    if (_0x221a2c === void 0 || !_0x221a2c["hasProperty"](_0x203b22)) return null;
    const _0x43e636 = _0x221a2c["getValue"](_0x4b1d62), _0x5a570b = _0x43e636 == null ? void 0 : _0x43e636[_0x203b22];
    if (_0x5a570b === void 0 || _0x5a570b === null) return null;
    return typeof _0x5a570b === "number" ? _0x5a570b : String(_0x5a570b);
  }
  ["readNumericProperty"](_0x3f6bf8, _0x224fb6, _0x44da8d) {
    const _0x29b217 = this["readProperty"](_0x3f6bf8, _0x224fb6, _0x44da8d);
    if (_0x29b217 === null) return null;
    const _0x13d311 = typeof _0x29b217 === "number" ? _0x29b217 : Number(_0x29b217);
    return Number["isFinite"](_0x13d311) ? _0x13d311 : null;
  }
  ["resolveStyleRange"](_0x3512f4, _0x2f169a, _0x2e05a3) {
    if (_0x2e05a3["mode"] !== "gradient" && _0x2e05a3["mode"] !== "bin") return null;
    if (_0x2e05a3["min"] !== void 0 && _0x2e05a3["max"] !== void 0) return { "min": _0x2e05a3["min"], "max": _0x2e05a3["max"] };
    const _0x33cd86 = this["getColumnRange"](_0x3512f4, _0x2f169a, _0x2e05a3["column"]);
    if (_0x33cd86 === null) return null;
    return { "min": _0x2e05a3["min"] ?? _0x33cd86["min"], "max": _0x2e05a3["max"] ?? _0x33cd86["max"] };
  }
  ["getColumnRange"](_0x331674, _0x231566, _0x95b4be) {
    let _0x38d6e = Infinity, _0x1bf8ec = -Infinity;
    for (const _0x1e3128 of _0x331674["entities"]["values"]) {
      const _0x2112d8 = this["readNumericProperty"](_0x1e3128, _0x95b4be, _0x231566);
      if (_0x2112d8 === null) continue;
      if (_0x2112d8 < _0x38d6e) _0x38d6e = _0x2112d8;
      if (_0x2112d8 > _0x1bf8ec) _0x1bf8ec = _0x2112d8;
    }
    return Number["isFinite"](_0x38d6e) && Number["isFinite"](_0x1bf8ec) ? { "min": _0x38d6e, "max": _0x1bf8ec } : null;
  }
  static ["valueEquals"](_0x5b54f1, _0x43b7b6) {
    if (_0x5b54f1 instanceof Color || _0x43b7b6 instanceof Color) return _0x5b54f1 instanceof Color && _0x43b7b6 instanceof Color && Color["equals"](_0x5b54f1, _0x43b7b6);
    return _0x5b54f1 === _0x43b7b6;
  }
  static ["updateConstantProperty"](_0x3de759, _0x40ff43) {
    if (_0x3de759 instanceof ConstantProperty) return !LayerStyleEngine["valueEquals"](_0x3de759["getValue"](), _0x40ff43) && _0x3de759["setValue"](_0x40ff43), _0x3de759;
    return new ConstantProperty(_0x40ff43);
  }
  ["updateColorProperty"](_0x114739, _0x57ebe9) {
    const _0x5ec17d = _0x114739 !== void 0 ? this["opacityController"]["getWrappedBaseColor"](_0x114739) : void 0;
    if (_0x5ec17d !== void 0) return Color["clone"](_0x57ebe9, _0x5ec17d), _0x114739;
    if (_0x114739 instanceof ConstantProperty) return !LayerStyleEngine["valueEquals"](_0x114739["getValue"](), _0x57ebe9) && _0x114739["setValue"](_0x57ebe9), _0x114739;
    return new ConstantProperty(_0x57ebe9);
  }
  ["updateColorMaterial"](_0x174b59, _0x5b0b08) {
    if (_0x174b59 instanceof ColorMaterialProperty) return _0x174b59["color"] = this["updateColorProperty"](_0x174b59["color"], _0x5b0b08), _0x174b59;
    return new ColorMaterialProperty(this["updateColorProperty"](void 0, _0x5b0b08));
  }
  static ["sampleFromPalette"](_0x10c542, _0x23b215, _0x467268) {
    return _0x467268 === "qualitative" ? LayerStyleEngine["sampleDiscrete"](_0x10c542, _0x23b215) : LayerStyleEngine["sampleGradient"](_0x10c542, _0x23b215);
  }
  static ["sampleGradient"](_0x562236, _0x26f523) {
    if (_0x562236["length"] === 0) return Color["GRAY"];
    if (_0x562236["length"] === 1) return Color["fromCssColorString"](_0x562236[0]);
    const _0x45519a = _0x584e42["clamp"](_0x26f523, 0, 1) * (_0x562236["length"] - 1), _0x21134a = Math["floor"](_0x45519a), _0x2a3029 = Math["min"](_0x562236["length"] - 1, _0x21134a + 1), _0x410ee5 = _0x45519a - _0x21134a, _0x58b3cb = Color["fromCssColorString"](_0x562236[_0x21134a]), _0x3886af = Color["fromCssColorString"](_0x562236[_0x2a3029]);
    return Color["lerp"](_0x58b3cb, _0x3886af, _0x410ee5, new Color());
  }
  static ["sampleDiscrete"](_0x5da9fe, _0x4f843c) {
    if (_0x5da9fe["length"] === 0) return Color["GRAY"];
    const _0xd8cc2e = Math["round"](_0x584e42["clamp"](_0x4f843c, 0, 1) * (_0x5da9fe["length"] - 1));
    return Color["fromCssColorString"](_0x5da9fe[_0xd8cc2e]);
  }
  static ["pickBin"](_0x336b2a, _0x2dd085) {
    for (let _0x137e8b = 0; _0x137e8b < _0x2dd085["length"]; _0x137e8b++) {
      if (_0x336b2a <= _0x2dd085[_0x137e8b]) return _0x137e8b;
    }
    return _0x2dd085["length"] - 1;
  }
}
function extractEpsgCode(_0x4ea8e9) {
  if (!/EPSG/i["test"](_0x4ea8e9)) return void 0;
  const _0x1167ce = _0x4ea8e9["trim"]();
  let _0x55a4d9 = _0x1167ce["length"];
  while (_0x55a4d9 > 0 && _0x1167ce["charCodeAt"](_0x55a4d9 - 1) >= 48 && _0x1167ce["charCodeAt"](_0x55a4d9 - 1) <= 57) {
    _0x55a4d9--;
  }
  const _0x21977b = _0x1167ce["slice"](_0x55a4d9);
  return _0x21977b["length"] > 0 ? _0x21977b : void 0;
}
const proj4DefRequests = /* @__PURE__ */ new Map();
async function registerProj4Def(_0x4fccc2, _0x15f914) {
  const _0x4c8fd2 = "EPSG:" + _0x15f914;
  if (_0x4fccc2["defs"](_0x4c8fd2)) return !![];
  let _0x117ef2 = proj4DefRequests["get"](_0x15f914);
  !_0x117ef2 && (_0x117ef2 = (async () => {
    try {
      const _0x5c5c53 = await fetch("https://epsg.io/" + _0x15f914 + ".proj4");
      if (!_0x5c5c53["ok"]) return _0x5c5c53["status"] === 404 ? "missing" : "transient-failure";
      const _0x16c591 = (await _0x5c5c53["text"]())["trim"]();
      if (!_0x16c591) return "missing";
      return _0x4fccc2["defs"](_0x4c8fd2, _0x16c591), "registered";
    } catch {
      return "transient-failure";
    }
  })(), proj4DefRequests["set"](_0x15f914, _0x117ef2));
  const _0x2a1d00 = await _0x117ef2;
  return _0x2a1d00 === "transient-failure" && proj4DefRequests["get"](_0x15f914) === _0x117ef2 && proj4DefRequests["delete"](_0x15f914), _0x2a1d00 === "registered";
}
async function ensureProj4Def(_0x29cac3) {
  let _0x5c5fc0;
  try {
    ({ default: _0x5c5fc0 } = await import("proj4"));
  } catch {
    return console["warn"]("[ogc/proj4Defs] EPSG:" + _0x29cac3 + ' icin koordinat donusumu atlandi -- "proj4" paketi yuklu degil (peer dependency olarak eklenmemis). Bu EPSG kodunu kullanan WCS katmanlari yanlis/genis bir alanda gorunebilir.'), void 0;
  }
  if (!await registerProj4Def(_0x5c5fc0, _0x29cac3)) return console["warn"]("[ogc/proj4Defs] EPSG:" + _0x29cac3 + " icin proj4 tanimi epsg.io'dan alinamadi (agsizlik veya gecersiz/desteklenmeyen kod olabilir). Bu EPSG kodunu kullanan WCS katmanlari yanlis/genis bir alanda gorunebilir."), void 0;
  return _0x5c5fc0;
}
const CESIUM_BUILTIN_CRS_NAMES = /* @__PURE__ */ new Set(["urn:ogc:def:crs:OGC:1.3:CRS84", "EPSG:4326", "urn:ogc:def:crs:EPSG::4326"]);
function defaultCrsFunction(_0x1f67c5) {
  return Cartesian3["fromDegrees"](_0x1f67c5[0], _0x1f67c5[1], _0x1f67c5[2]);
}
function numericCodeString(_0x51e42b) {
  if (_0x51e42b === void 0) return void 0;
  const _0x211e9e = String(_0x51e42b)["trim"]();
  return /^\d+$/["test"](_0x211e9e) ? _0x211e9e : void 0;
}
function isSuspiciousCrsResult(_0x2a760e) {
  return _0x2a760e !== null && _0x2a760e["kind"] !== "reprojected";
}
function firstCoordinatePair(_0x4dedfd) {
  let _0x4e10f5 = _0x4dedfd;
  while (Array["isArray"](_0x4e10f5) && _0x4e10f5["length"] > 0 && Array["isArray"](_0x4e10f5[0])) {
    _0x4e10f5 = _0x4e10f5[0];
  }
  if (Array["isArray"](_0x4e10f5) && _0x4e10f5["length"] >= 2 && typeof _0x4e10f5[0] === "number" && typeof _0x4e10f5[1] === "number") return [_0x4e10f5[0], _0x4e10f5[1]];
  return void 0;
}
function findFirstCoordinates(_0x53a514) {
  if (typeof _0x53a514 !== "object" || _0x53a514 === null) return void 0;
  const _0x15ea58 = _0x53a514;
  if (_0x15ea58["type"] === "FeatureCollection" && Array["isArray"](_0x15ea58["features"])) {
    for (const _0xbb5527 of _0x15ea58["features"]) {
      const _0x4c906f = findFirstCoordinates(_0xbb5527);
      if (_0x4c906f) return _0x4c906f;
    }
    return void 0;
  }
  if (_0x15ea58["type"] === "Feature") return findFirstCoordinates(_0x15ea58["geometry"]);
  if (_0x15ea58["type"] === "GeometryCollection" && Array["isArray"](_0x15ea58["geometries"])) {
    for (const _0x30f18b of _0x15ea58["geometries"]) {
      const _0x2306d7 = findFirstCoordinates(_0x30f18b);
      if (_0x2306d7) return _0x2306d7;
    }
    return void 0;
  }
  if ("coordinates" in _0x15ea58) return firstCoordinatePair(_0x15ea58["coordinates"]);
  return void 0;
}
function resolveOrRejectUnresolvedCrs(_0x383680, _0x2fd142, _0x45fc16) {
  if (!_0x45fc16) throw new GeometryError("CRS_UNRESOLVED_UNSUPPORTED", "Koordinat sistemi tanınamadı ve WGS84 ile uyumlu değil.");
  return GeoJsonDataSource["crsNames"][_0x383680] = defaultCrsFunction, { "kind": "suspicious-unresolved-crs", "crsName": _0x2fd142 };
}
function acceptClaimedWgs84(_0x7845b9, _0x244c87, _0xd40b70) {
  if (!_0x244c87) throw new GeometryError("CRS_CLAIMED_WGS84_INVALID", "Koordinatlar WGS84 ile uyumlu değil.");
  if (_0xd40b70) GeoJsonDataSource["crsNames"][_0x7845b9] = defaultCrsFunction;
  return null;
}
function computeLooksLikeWgs84(_0x5f5a04) {
  const _0x523d0f = findFirstCoordinates(_0x5f5a04);
  return !_0x523d0f || Math["abs"](_0x523d0f[0]) <= 180 && Math["abs"](_0x523d0f[1]) <= 90;
}
function resolveCrsFieldOrThrow(_0xcf3d17, _0x23de1a) {
  const _0x21ca4c = "crs" in _0xcf3d17 ? _0xcf3d17["crs"] : void 0;
  if (!_0x21ca4c || typeof _0x21ca4c !== "object") {
    if (!_0x23de1a) throw new GeometryError("CRS_MISSING_UNSUPPORTED", "Bu dosyada geçerli koordinat sistemi (CRS) bilgisi yok.");
    return null;
  }
  return _0x21ca4c;
}
async function ensureGeoJsonCrsSupport(_0x141f03) {
  var _a2, _b, _c;
  if (typeof _0x141f03 !== "object" || _0x141f03 === null) return null;
  const _0x115276 = computeLooksLikeWgs84(_0x141f03), _0x302ea4 = resolveCrsFieldOrThrow(_0x141f03, _0x115276);
  if (!_0x302ea4) return null;
  const _0x29d6b4 = _0x302ea4["type"] === "EPSG", _0x1806bf = _0x29d6b4 ? "EPSG:" + ((_a2 = _0x302ea4["properties"]) == null ? void 0 : _a2["code"]) : (_b = _0x302ea4["properties"]) == null ? void 0 : _b["name"];
  if (!_0x1806bf || typeof _0x1806bf !== "string") return null;
  if (CESIUM_BUILTIN_CRS_NAMES["has"](_0x1806bf)) return acceptClaimedWgs84(_0x1806bf, _0x115276, ![]);
  const _0x323c53 = _0x29d6b4 ? numericCodeString((_c = _0x302ea4["properties"]) == null ? void 0 : _c["code"]) : extractEpsgCode(_0x1806bf);
  if (!_0x323c53) return resolveOrRejectUnresolvedCrs(_0x1806bf, _0x1806bf, _0x115276);
  if (_0x323c53 === "4326") return acceptClaimedWgs84(_0x1806bf, _0x115276, !![]);
  const _0x96fa4d = "EPSG:" + _0x323c53;
  let _0x4d281a;
  try {
    ({ default: _0x4d281a } = await import("proj4"));
  } catch {
    return resolveOrRejectUnresolvedCrs(_0x1806bf, _0x96fa4d, _0x115276);
  }
  if (!await registerProj4Def(_0x4d281a, _0x323c53)) return resolveOrRejectUnresolvedCrs(_0x1806bf, _0x96fa4d, _0x115276);
  return GeoJsonDataSource["crsNames"][_0x1806bf] = (_0x4b5b8e) => {
    const [_0x393c18, _0x47f44b] = _0x4d281a(_0x96fa4d, "EPSG:4326", [_0x4b5b8e[0], _0x4b5b8e[1]]);
    return Cartesian3["fromDegrees"](_0x393c18, _0x47f44b, _0x4b5b8e[2]);
  }, { "kind": "reprojected", "fromEpsg": _0x96fa4d };
}
class LocalSourceLoader {
  constructor(_0xd2fbd0, _0x67d4aa) {
    this["viewer"] = _0xd2fbd0, this["deps"] = _0x67d4aa;
  }
  async ["addLocalKmlGeoJson"](_0x104eac, _0x3587a6) {
    let _0x424973, _0x2bcc8b, _0x7adb4c = null;
    const _0xcfcc1 = this["deps"]["styleEngine"]["randomLayerColor"]();
    let _0x527b32 = _0x3587a6["clampToGround"] ?? !![];
    if (_0x104eac === "GEOJSON") {
      const _0x2ac1ac = _0x3587a6["data"] instanceof File ? JSON["parse"](await this["fileToText"](_0x3587a6["data"])) : _0x3587a6["data"];
      _0x7adb4c = await ensureGeoJsonCrsSupport(_0x2ac1ac);
      if (isSuspiciousCrsResult(_0x7adb4c)) _0x527b32 = ![];
      _0x424973 = await GeoJsonDataSource["load"](_0x2ac1ac, { "clampToGround": _0x527b32, "fill": _0xcfcc1["withAlpha"](0.5), "stroke": _0xcfcc1, "strokeWidth": 2, "markerColor": _0xcfcc1 }), this["deps"]["styleEngine"]["applyEntityColor"](_0x424973, _0xcfcc1), this["deps"]["styleEngine"]["convertMarkersToPoints"](_0x424973, _0xcfcc1);
      if (isSuspiciousCrsResult(_0x7adb4c)) this["deps"]["outlineGeometry"]["flattenSuspiciousGeometry"](_0x424973);
    } else {
      let _0x12d922;
      _0x3587a6["data"] instanceof File ? (_0x2bcc8b = this["fileToBlobUrl"](_0x3587a6["data"]), _0x12d922 = _0x2bcc8b) : _0x12d922 = _0x3587a6["data"], _0x424973 = await KmlDataSource["load"](_0x12d922, { "camera": this["viewer"]["scene"]["camera"], "canvas": this["viewer"]["scene"]["canvas"], "clampToGround": _0x527b32 }), this["deps"]["styleEngine"]["applyEntityColor"](_0x424973, _0xcfcc1);
    }
    this["deps"]["outlineGeometry"]["disableRiskyPolygonOutlines"](_0x424973);
    _0x527b32 && this["deps"]["addPolygonOutlines"](_0x424973, this["deps"]["defaultOutlineColor"], 2);
    await this["viewer"]["dataSources"]["add"](_0x424973);
    _0x2bcc8b !== void 0 && URL["revokeObjectURL"](_0x2bcc8b);
    const _0xe20772 = _0xcfcc1["toCssHexString"](), _0x3648e4 = this["deps"]["register"](_0x3587a6["id"], _0x3587a6["title"], _0x104eac, _0x424973, ![], _0xe20772);
    return this["deps"]["emitCrsCheckResult"](_0x3648e4["id"], _0x7adb4c), this["deps"]["styleEngine"]["recordInitialStyle"](_0x3648e4["id"], _0xe20772, 0.5, { "enabled": !![], "color": this["deps"]["defaultOutlineColorHex"], "width": 2 }), await this["deps"]["waitForRenderSettle"](), _0x3648e4;
  }
  async ["addShp"](_0x425480) {
    let _0x4d0af1;
    try {
      ({ getShapefile: _0x4d0af1 } = await import("shpjs"));
    } catch {
      throw new LayerOperationError("LAYER_SHP_PACKAGE_MISSING", 'SHP katmanı için "shpjs" paketi gereklidir: shpjs kütüphanesini import etmelisiniz');
    }
    const _0x3ca1af = _0x425480["data"] instanceof File ? await this["fileToArrayBuffer"](_0x425480["data"]) : _0x425480["data"], _0x437bec = await _0x4d0af1(_0x3ca1af), _0x3368ab = Array["isArray"](_0x437bec) ? { "type": "FeatureCollection", "features": _0x437bec["flatMap"]((_0x1a1bc8) => _0x1a1bc8["features"]) } : _0x437bec;
    return loadVectorGeoJsonLayer(this["viewer"], this["deps"], _0x3368ab, { "id": _0x425480["id"], "title": _0x425480["title"], "layerType": "SHP", "clampToGround": _0x425480["clampToGround"] ?? !![] });
  }
  async ["addCsv"](_0x493f01) {
    let _0x37dad8;
    try {
      ({ default: _0x37dad8 } = await import("papaparse"));
    } catch {
      throw new LayerOperationError("LAYER_CSV_PACKAGE_MISSING", 'CSV katmanı için "papaparse" paketi gereklidir: papaparse kütüphanesini import etmelisiniz');
    }
    const _0x231458 = _0x493f01["data"] instanceof File ? await this["fileToText"](_0x493f01["data"]) : _0x493f01["data"], _0x4489d6 = _0x37dad8["parse"](_0x231458, { "header": !![], "dynamicTyping": !![] }), _0x449f91 = _0x4489d6["data"], _0x3a52ce = _0x449f91["find"]((_0x28f195) => _0x28f195 && Object["keys"](_0x28f195)["length"] > 0), _0x1cb2bb = _0x3a52ce && this["detectLatLonKeys"](_0x3a52ce);
    if (!_0x1cb2bb) throw new LayerOperationError("LAYER_CSV_LATLON_NOT_FOUND", "CSV içinde lat/lon sütunlarını bulamadım (ör: lat, lon).");
    const _0x597283 = this["deps"]["styleEngine"]["randomLayerColor"](), _0x2c5363 = new CustomDataSource(_0x493f01["title"]);
    for (const _0x1d1607 of _0x449f91) {
      const _0x50a6ed = Number(_0x1d1607[_0x1cb2bb["lat"]]), _0x197911 = Number(_0x1d1607[_0x1cb2bb["lon"]]);
      Number["isFinite"](_0x50a6ed) && Number["isFinite"](_0x197911) && _0x2c5363["entities"]["add"]({ "position": Cartesian3["fromDegrees"](_0x197911, _0x50a6ed), "point": { "pixelSize": 6, "color": _0x597283 }, "properties": _0x1d1607 });
    }
    await this["viewer"]["dataSources"]["add"](_0x2c5363);
    const _0x20e7a2 = _0x597283["toCssHexString"](), _0x2ba5b9 = this["deps"]["register"](_0x493f01["id"], _0x493f01["title"], "CSV", _0x2c5363, ![], _0x20e7a2);
    return this["deps"]["styleEngine"]["recordInitialStyle"](_0x2ba5b9["id"], _0x20e7a2, 1, { "enabled": ![], "color": _0x20e7a2, "width": 0 }), _0x2ba5b9;
  }
  ["detectLatLonKeys"](_0x470516) {
    const _0x484b9d = Object["keys"](_0x470516)["reduce"]((_0x28239f, _0x6178b6) => {
      const _0x1147bc = _0x6178b6["toLowerCase"]();
      if (!_0x28239f["lat"] && /^(lat|latitude|y)$/["test"](_0x1147bc)) _0x28239f["lat"] = _0x6178b6;
      if (!_0x28239f["lon"] && /^(lon|lng|long|longitude|x)$/["test"](_0x1147bc)) _0x28239f["lon"] = _0x6178b6;
      return _0x28239f;
    }, { "lat": "", "lon": "" });
    return _0x484b9d["lat"] && _0x484b9d["lon"] ? _0x484b9d : null;
  }
  async ["fileToText"](_0x17918b) {
    return decodeTextBuffer(await _0x17918b["arrayBuffer"]());
  }
  ["fileToBlobUrl"](_0x3e4a06) {
    return URL["createObjectURL"](_0x3e4a06);
  }
  ["fileToArrayBuffer"](_0x1402ee) {
    return _0x1402ee["arrayBuffer"]();
  }
}
async function loadVectorGeoJsonLayer(_0x1485da, _0x3d5e55, _0x4c3746, _0x47a75b, _0x39b056) {
  const _0x4841e3 = await ensureGeoJsonCrsSupport(_0x4c3746), _0x15f00f = _0x3d5e55["styleEngine"]["randomLayerColor"](), _0x4f0116 = isSuspiciousCrsResult(_0x4841e3) ? ![] : _0x47a75b["clampToGround"], _0x51f4cd = await GeoJsonDataSource["load"](_0x4c3746, { "clampToGround": _0x4f0116, "fill": _0x15f00f["withAlpha"](0.5), "stroke": _0x15f00f, "strokeWidth": 2, "markerColor": _0x15f00f });
  _0x3d5e55["styleEngine"]["applyEntityColor"](_0x51f4cd, _0x15f00f), _0x3d5e55["styleEngine"]["convertMarkersToPoints"](_0x51f4cd, _0x15f00f), _0x3d5e55["outlineGeometry"]["disableRiskyPolygonOutlines"](_0x51f4cd);
  if (isSuspiciousCrsResult(_0x4841e3)) _0x3d5e55["outlineGeometry"]["flattenSuspiciousGeometry"](_0x51f4cd);
  _0x4f0116 && _0x3d5e55["addPolygonOutlines"](_0x51f4cd, _0x3d5e55["defaultOutlineColor"], 2);
  await _0x1485da["dataSources"]["add"](_0x51f4cd);
  const _0x45bb84 = _0x15f00f["toCssHexString"](), _0x3a3450 = _0x3d5e55["register"](_0x47a75b["id"], _0x47a75b["title"], _0x47a75b["layerType"], _0x51f4cd, ![], _0x45bb84);
  return _0x3d5e55["emitCrsCheckResult"](_0x3a3450["id"], _0x4841e3), _0x39b056 == null ? void 0 : _0x39b056(_0x3a3450), _0x3d5e55["styleEngine"]["recordInitialStyle"](_0x3a3450["id"], _0x45bb84, 0.5, { "enabled": !![], "color": _0x3d5e55["defaultOutlineColorHex"], "width": 2 }), await _0x3d5e55["waitForRenderSettle"](), _0x3a3450;
}
function decodeTextBuffer(_0x1d7958) {
  try {
    return new TextDecoder("utf-8", { "fatal": !![] })["decode"](_0x1d7958);
  } catch {
    return new TextDecoder("windows-1254")["decode"](_0x1d7958);
  }
}
const els = (_0x2823a7, _0x12239e) => Array["from"](_0x2823a7["getElementsByTagNameNS"]("*", _0x12239e)), el = (_0x4957b5, _0x15fdf6) => els(_0x4957b5, _0x15fdf6)[0], txt = (_0x4b8195, _0x209e2d) => {
  var _a2, _b;
  return (_b = (_a2 = el(_0x4b8195, _0x209e2d)) == null ? void 0 : _a2["textContent"]) == null ? void 0 : _b["trim"]();
};
function buildWfsCapabilitiesUrl(_0x58963a) {
  const _0x3405ab = new URL(_0x58963a, window["location"]["origin"]), _0x9a95f9 = new URL("" + _0x3405ab["origin"] + _0x3405ab["pathname"]);
  for (const [_0x259125, _0x24aaa5] of _0x3405ab["searchParams"]["entries"]()) {
    const _0x30ca9e = _0x259125["toLowerCase"]();
    (_0x30ca9e === "url" || _0x30ca9e === "tucbsapikey") && _0x9a95f9["searchParams"]["set"](_0x259125, _0x24aaa5);
  }
  return _0x9a95f9["searchParams"]["set"]("service", "WFS"), _0x9a95f9["searchParams"]["set"]("request", "GetCapabilities"), _0x9a95f9["searchParams"]["set"]("acceptVersions", "2.0.0,1.1.0,1.0.0"), _0x9a95f9["toString"]();
}
function isOgcExceptionXml(_0x2498c1) {
  const _0x2563a6 = _0x2498c1["trimStart"]();
  return _0x2563a6["startsWith"]("<") && (_0x2563a6["includes"]("ExceptionReport") || _0x2563a6["includes"]("ServiceExceptionReport"));
}
function repairBareAmpersands(_0x1c7416) {
  return _0x1c7416["replace"](/&(?!(?:amp|lt|gt|quot|apos|#\d+|#x[\da-fA-F]+);)/gi, "&amp;");
}
async function fetchWfsCapabilities(_0x5d9d3e, _0x5800b1 = {}) {
  const _0x2ff6c4 = await fetch(buildWfsCapabilitiesUrl(_0x5d9d3e), _0x5800b1);
  if (!_0x2ff6c4["ok"]) throw new OgcRequestError("OGC_CAPABILITIES_REQUEST_FAILED", "WFS GetCapabilities başarısız: " + _0x2ff6c4["status"] + " " + _0x2ff6c4["statusText"]);
  const _0x56f7f9 = await _0x2ff6c4["text"]();
  if (isOgcExceptionXml(_0x56f7f9)) throw new OgcRequestError("OGC_CAPABILITIES_EXCEPTION", "WFS GetCapabilities OGC Exception döndü.");
  const _0x167b8c = repairBareAmpersands(_0x56f7f9), _0x3d4c9e = new DOMParser()["parseFromString"](_0x167b8c, "application/xml");
  if (_0x3d4c9e["querySelector"]("parsererror")) throw new OgcRequestError("OGC_CAPABILITIES_PARSE_FAILED", "WFS GetCapabilities XML parse edilemedi.");
  const _0x4048b7 = _0x3d4c9e["documentElement"]["getAttribute"]("version") || "2.0.0", _0x5296d5 = [];
  for (const _0xa029ad of els(_0x3d4c9e, "FeatureType")) {
    const _0x37f2a8 = txt(_0xa029ad, "Name") || "";
    if (!_0x37f2a8) continue;
    const _0x4e174b = els(_0xa029ad, "OutputFormats")["flatMap"]((_0x9db2f9) => els(_0x9db2f9, "Format")["map"]((_0x520c32) => {
      var _a2;
      return ((_a2 = _0x520c32["textContent"]) == null ? void 0 : _a2["trim"]()) || "";
    })["filter"](Boolean)), _0x1e0658 = txt(_0xa029ad, "Title"), _0x378c35 = txt(_0xa029ad, "DefaultCRS"), _0x47a585 = txt(_0xa029ad, "DefaultSRS");
    _0x5296d5["push"]({ "name": _0x37f2a8, ..._0x1e0658 ? { "title": _0x1e0658 } : {}, ..._0x378c35 ? { "defaultCRS": _0x378c35 } : {}, ..._0x47a585 ? { "defaultSRS": _0x47a585 } : {}, ..._0x4e174b["length"] ? { "outputFormats": _0x4e174b } : {} });
  }
  const _0x1f5b84 = el(_0x3d4c9e, "OperationsMetadata");
  let _0x5729e0 = [];
  if (_0x1f5b84) {
    const _0x41ff6a = els(_0x1f5b84, "Operation")["find"]((_0x112fdc) => (_0x112fdc["getAttribute"]("name") || "") === "GetFeature"), _0x41f1ae = els(_0x41ff6a ?? _0x1f5b84, "Parameter")["find"]((_0xce4df5) => (_0xce4df5["getAttribute"]("name") || "")["toLowerCase"]() === "outputformat");
    _0x41f1ae && (_0x5729e0 = els(_0x41f1ae, "Value")["map"]((_0x182061) => {
      var _a2;
      return ((_a2 = _0x182061["textContent"]) == null ? void 0 : _a2["trim"]()) || "";
    })["filter"](Boolean));
  }
  if (!_0x5729e0["length"]) {
    const _0x9cf9e1 = /* @__PURE__ */ new Set();
    _0x5729e0 = _0x5296d5["flatMap"]((_0x3d6808) => _0x3d6808["outputFormats"] || [])["filter"]((_0x41f60d) => !_0x9cf9e1["has"](_0x41f60d) && _0x9cf9e1["add"](_0x41f60d));
  }
  return { "version": _0x4048b7, "featureTypes": _0x5296d5, "outputFormats": _0x5729e0 };
}
function normName(_0x5e8df7) {
  return _0x5e8df7["trim"]()["toLowerCase"]();
}
function localTypeName(_0x31f009) {
  const _0x59f906 = _0x31f009["lastIndexOf"](":");
  return _0x59f906 >= 0 ? _0x31f009["slice"](_0x59f906 + 1) : _0x31f009;
}
function resolveWfsFeatureType(_0x5848e1, _0x751ce4) {
  if (!_0x751ce4["length"]) throw new OgcRequestError("OGC_FEATURE_TYPE_NOT_FOUND", "WFS FeatureType bulunamadı.");
  const _0x1f1930 = _0x5848e1 == null ? void 0 : _0x5848e1["trim"]();
  if (_0x1f1930) {
    const _0x3dc986 = _0x751ce4["find"]((_0x1b018d) => normName(_0x1b018d["name"]) === normName(_0x1f1930));
    if (_0x3dc986) return _0x3dc986;
    const _0x4864ba = normName(localTypeName(_0x1f1930)), _0xb0efa1 = _0x751ce4["find"]((_0x4e7042) => normName(localTypeName(_0x4e7042["name"])) === _0x4864ba);
    if (_0xb0efa1) return _0xb0efa1;
  }
  return _0x751ce4[0];
}
function pickJsonOutput(_0x4d5708) {
  const _0x6881d2 = ["application/geo+json", "application/json;subtype=geojson", "application/json", "geojson", "json", "esrigeojson", "geojson+gzip", "geojson+zip"], _0x183ffc = _0x4d5708["map"]((_0x22d8dc) => _0x22d8dc["toLowerCase"]()["replace"](/\s+/g, ""));
  for (const _0x2dd2a5 of _0x6881d2) {
    const _0xf21e7a = _0x183ffc["findIndex"]((_0x45e1d0) => _0x45e1d0 === _0x2dd2a5 || _0x45e1d0["includes"](_0x2dd2a5));
    if (_0xf21e7a >= 0) return _0x4d5708[_0xf21e7a] ?? null;
  }
  return null;
}
function buildWfsGetFeaturePlan(_0x75d94d) {
  const _0x3f03ae = resolveWfsFeatureType(_0x75d94d["typeNameHint"], _0x75d94d["caps"]["featureTypes"]), _0x4f21ee = _0x75d94d["version"] || _0x75d94d["caps"]["version"] || "2.0.0", _0x1fd155 = _0x75d94d["srsName"] || _0x3f03ae["defaultCRS"] || _0x3f03ae["defaultSRS"] || "EPSG:4326", _0x3865a7 = _0x75d94d["outputFormat"] || pickJsonOutput(_0x3f03ae["outputFormats"] || []) || pickJsonOutput(_0x75d94d["caps"]["outputFormats"]), _0x17eccd = _0x75d94d["maxFeatures"] ?? 5e3;
  return { "version": _0x4f21ee, "typeName": _0x3f03ae["name"], "srsName": _0x1fd155, "jsonOutputFormat": _0x3865a7, "maxFeatures": _0x17eccd };
}
function appendWfsGetFeatureParams(_0x165980, _0x19baa5, _0x131842) {
  _0x165980["set"]("service", "WFS"), _0x165980["set"]("request", "GetFeature"), _0x165980["set"]("version", _0x19baa5["version"]);
  const _0x3acd6f = _0x19baa5["version"]["startsWith"]("2.");
  _0x165980["set"](_0x3acd6f ? "typeNames" : "typeName", _0x19baa5["typeName"]), _0x165980["set"]("srsName", _0x19baa5["srsName"]);
  _0x131842 && _0x165980["set"]("outputFormat", _0x131842);
  const _0x43bbec = _0x3acd6f ? "count" : "maxFeatures";
  _0x165980["set"](_0x43bbec, String(_0x19baa5["maxFeatures"]));
}
async function getCapabilities(_0x18bdf3, _0x31639f, _0x3cd985) {
  const _0x4f7de8 = _0x3cd985 == null ? void 0 : _0x3cd985["mergeApiKeyHeader"](_0x3cd985["buildAuthHeaders"](_0x31639f), _0x18bdf3), _0x3d9ee6 = await fetch(_0x18bdf3, _0x4f7de8 ? { "headers": _0x4f7de8 } : void 0);
  if (!_0x3d9ee6["ok"]) throw new OgcRequestError("OGC_CAPABILITIES_REQUEST_FAILED", "GetCapabilities isteği başarısız: " + _0x3d9ee6["status"] + " " + _0x3d9ee6["statusText"]);
  const _0x3f99b0 = await _0x3d9ee6["text"](), _0x30455a = new DOMParser()["parseFromString"](_0x3f99b0, "application/xml");
  if (_0x30455a["getElementsByTagName"]("parsererror")["length"] > 0) throw new OgcRequestError("OGC_SERVICE_DISCOVERY_PARSE_FAILED", "GetCapabilities yanıtı XML olarak ayrıştırılamadı.");
  return _0x30455a;
}
function parseWmsStyles(_0x235def, _0x53a3ff) {
  var _a2, _b, _c, _d;
  const _0x35ac23 = elementsByLocalName(_0x235def, "Layer")["find"]((_0x26b6ca) => {
    var _a3, _b2;
    return ((_b2 = (_a3 = childByLocalName(_0x26b6ca, "Name")) == null ? void 0 : _a3["textContent"]) == null ? void 0 : _b2["trim"]()) === _0x53a3ff;
  });
  if (!_0x35ac23) return [];
  const _0x90e048 = [];
  for (const _0xb5ec68 of Array["from"](_0x35ac23["children"])) {
    if (_0xb5ec68["localName"] !== "Style") continue;
    const _0x38f957 = (_b = (_a2 = childByLocalName(_0xb5ec68, "Name")) == null ? void 0 : _a2["textContent"]) == null ? void 0 : _b["trim"]();
    if (!_0x38f957) continue;
    const _0x59c43e = ((_d = (_c = childByLocalName(_0xb5ec68, "Title")) == null ? void 0 : _c["textContent"]) == null ? void 0 : _d["trim"]()) ?? _0x38f957;
    _0x90e048["push"]({ "name": _0x38f957, "title": _0x59c43e });
  }
  return _0x90e048;
}
function parseWmtsStyles(_0x385a4c, _0x529b6a) {
  var _a2, _b, _c, _d, _e;
  const _0xbbab3c = elementsByLocalName(_0x385a4c, "Layer")["find"]((_0x220023) => {
    var _a3, _b2;
    return ((_b2 = (_a3 = childByLocalName(_0x220023, "Identifier")) == null ? void 0 : _a3["textContent"]) == null ? void 0 : _b2["trim"]()) === _0x529b6a;
  });
  if (!_0xbbab3c) return [];
  const _0x19d8d8 = [];
  for (const _0x5db4ab of Array["from"](_0xbbab3c["children"])) {
    if (_0x5db4ab["localName"] !== "Style") continue;
    const _0x2461ec = (_b = (_a2 = childByLocalName(_0x5db4ab, "Identifier")) == null ? void 0 : _a2["textContent"]) == null ? void 0 : _b["trim"]();
    if (!_0x2461ec) continue;
    const _0x2656b7 = ((_d = (_c = childByLocalName(_0x5db4ab, "Title")) == null ? void 0 : _c["textContent"]) == null ? void 0 : _d["trim"]()) ?? _0x2461ec, _0x57f2e0 = ((_e = childByLocalName(_0x5db4ab, "LegendURL")) == null ? void 0 : _e["getAttribute"]("xlink:href")) ?? "", _0x3ebaef = _0x5db4ab["getAttribute"]("isDefault") === "true";
    _0x19d8d8["push"]({ "name": _0x2461ec, "title": _0x2656b7, "legendUrl": _0x57f2e0, "isDefault": _0x3ebaef });
  }
  return _0x19d8d8["sort"]((_0x3eb91e, _0x115cc3) => Number(_0x115cc3["isDefault"]) - Number(_0x3eb91e["isDefault"])), _0x19d8d8["map"]((_0x4c55af) => ({ "name": _0x4c55af["name"], "title": _0x4c55af["title"], "legendUrl": _0x4c55af["legendUrl"] }));
}
function buildCapabilitiesUrl(_0x3679be, _0x434a94, _0xd52488) {
  const _0x58a604 = new URL(_0x3679be);
  return _0x58a604["searchParams"]["set"]("SERVICE", _0x434a94), _0x58a604["searchParams"]["set"]("REQUEST", "GetCapabilities"), _0x58a604["searchParams"]["set"]("VERSION", _0xd52488), _0x58a604["toString"]();
}
function elementsByLocalName(_0x372652, _0x3b5fa7) {
  return Array["from"](_0x372652["getElementsByTagNameNS"]("*", _0x3b5fa7));
}
function childByLocalName(_0x1852c6, _0x2ad1ad) {
  return Array["from"](_0x1852c6["children"])["find"]((_0x37628e) => _0x37628e["localName"] === _0x2ad1ad);
}
function parseWmsGeographicBoundingBox(_0x4ed7a1) {
  var _a2, _b, _c, _d;
  const _0x242e6b = childByLocalName(_0x4ed7a1, "EX_GeographicBoundingBox");
  if (_0x242e6b) {
    const _0x42fa65 = (_a2 = childByLocalName(_0x242e6b, "westBoundLongitude")) == null ? void 0 : _a2["textContent"], _0x35fa9a = (_b = childByLocalName(_0x242e6b, "eastBoundLongitude")) == null ? void 0 : _b["textContent"], _0x4d7524 = (_c = childByLocalName(_0x242e6b, "southBoundLatitude")) == null ? void 0 : _c["textContent"], _0x3bb97c = (_d = childByLocalName(_0x242e6b, "northBoundLatitude")) == null ? void 0 : _d["textContent"];
    if (_0x42fa65 && _0x35fa9a && _0x4d7524 && _0x3bb97c) {
      const _0x23de78 = { "west": Number(_0x42fa65), "south": Number(_0x4d7524), "east": Number(_0x35fa9a), "north": Number(_0x3bb97c) };
      if (Object["values"](_0x23de78)["every"](Number["isFinite"])) return _0x23de78;
    }
  }
  const _0x433c66 = childByLocalName(_0x4ed7a1, "LatLonBoundingBox");
  if (_0x433c66) {
    const _0x2b1c78 = { "west": Number(_0x433c66["getAttribute"]("minx")), "south": Number(_0x433c66["getAttribute"]("miny")), "east": Number(_0x433c66["getAttribute"]("maxx")), "north": Number(_0x433c66["getAttribute"]("maxy")) };
    if (Object["values"](_0x2b1c78)["every"](Number["isFinite"])) return _0x2b1c78;
  }
  return void 0;
}
function parseWmsCapabilities(_0x2dc05e) {
  var _a2;
  const _0xc1e653 = [];
  for (const _0x3fed9b of elementsByLocalName(_0x2dc05e, "Layer")) {
    const _0x2378e0 = childByLocalName(_0x3fed9b, "Name");
    if (!(_0x2378e0 == null ? void 0 : _0x2378e0["textContent"])) continue;
    const _0x3facf4 = childByLocalName(_0x3fed9b, "Title"), _0x41c002 = parseWmsGeographicBoundingBox(_0x3fed9b);
    _0xc1e653["push"]({ "identifier": _0x2378e0["textContent"]["trim"](), "title": ((_a2 = _0x3facf4 == null ? void 0 : _0x3facf4["textContent"]) == null ? void 0 : _a2["trim"]()) || _0x2378e0["textContent"]["trim"](), ..._0x41c002 && { "geographicBoundingBox": _0x41c002 } });
  }
  return _0xc1e653;
}
function parseWmsTiffFormat(_0x463bd4) {
  const _0x3db08e = elementsByLocalName(_0x463bd4, "GetMap")[0];
  if (!_0x3db08e) return void 0;
  const _0x39de17 = new Set(elementsByLocalName(_0x3db08e, "Format")["map"]((_0x15c45d) => {
    var _a2;
    return (_a2 = _0x15c45d["textContent"]) == null ? void 0 : _a2["trim"]()["toLowerCase"]();
  })["filter"]((_0x15d974) => !!_0x15d974));
  if (_0x39de17["has"]("image/geotiff")) return "image/geotiff";
  if (_0x39de17["has"]("image/tiff")) return "image/tiff";
  return void 0;
}
function parseWcsTiffFormat(_0xf7a12a) {
  const _0x4fbe1e = new Set(elementsByLocalName(_0xf7a12a, "formatSupported")["map"]((_0x4c9e7c) => {
    var _a2;
    return (_a2 = _0x4c9e7c["textContent"]) == null ? void 0 : _a2["trim"]()["toLowerCase"]();
  })["filter"]((_0x5a3e99) => !!_0x5a3e99));
  if (_0x4fbe1e["has"]("image/geotiff")) return "image/geotiff";
  if (_0x4fbe1e["has"]("image/tiff")) return "image/tiff";
  return void 0;
}
function parseWmtsCapabilities(_0x5d0952) {
  var _a2;
  const _0x4614e6 = [];
  for (const _0x1795f1 of elementsByLocalName(_0x5d0952, "Layer")) {
    const _0x436eba = childByLocalName(_0x1795f1, "Identifier");
    if (!(_0x436eba == null ? void 0 : _0x436eba["textContent"])) continue;
    const _0x17c636 = childByLocalName(_0x1795f1, "Title"), _0x4fdb64 = childByLocalName(_0x1795f1, "TileMatrixSetLink"), _0x52706f = _0x4fdb64 ? childByLocalName(_0x4fdb64, "TileMatrixSet") : void 0;
    _0x4614e6["push"]({ "identifier": _0x436eba["textContent"]["trim"](), "title": ((_a2 = _0x17c636 == null ? void 0 : _0x17c636["textContent"]) == null ? void 0 : _a2["trim"]()) || _0x436eba["textContent"]["trim"](), ...(_0x52706f == null ? void 0 : _0x52706f["textContent"]) && { "tileMatrixSetID": _0x52706f["textContent"]["trim"]() } });
  }
  return _0x4614e6;
}
function parseWfsCapabilities(_0x5b8dc8) {
  var _a2;
  const _0x6595ae = [];
  for (const _0xef8b64 of elementsByLocalName(_0x5b8dc8, "FeatureType")) {
    const _0x5160f7 = childByLocalName(_0xef8b64, "Name");
    if (!(_0x5160f7 == null ? void 0 : _0x5160f7["textContent"])) continue;
    const _0x37d64a = childByLocalName(_0xef8b64, "Title");
    _0x6595ae["push"]({ "identifier": _0x5160f7["textContent"]["trim"](), "title": ((_a2 = _0x37d64a == null ? void 0 : _0x37d64a["textContent"]) == null ? void 0 : _a2["trim"]()) || _0x5160f7["textContent"]["trim"]() });
  }
  return _0x6595ae;
}
function parseWcsCapabilities(_0x2d4209) {
  var _a2, _b;
  const _0x5836ce = [];
  for (const _0x5f5390 of elementsByLocalName(_0x2d4209, "CoverageSummary")) {
    const _0x359f08 = childByLocalName(_0x5f5390, "CoverageId") ?? childByLocalName(_0x5f5390, "Identifier");
    if (!(_0x359f08 == null ? void 0 : _0x359f08["textContent"])) continue;
    const _0xd49685 = childByLocalName(_0x5f5390, "Title");
    _0x5836ce["push"]({ "identifier": _0x359f08["textContent"]["trim"](), "title": ((_a2 = _0xd49685 == null ? void 0 : _0xd49685["textContent"]) == null ? void 0 : _a2["trim"]()) || _0x359f08["textContent"]["trim"]() });
  }
  if (_0x5836ce["length"] > 0) return _0x5836ce;
  for (const _0x25a109 of elementsByLocalName(_0x2d4209, "CoverageOfferingBrief")) {
    const _0x195755 = childByLocalName(_0x25a109, "name");
    if (!(_0x195755 == null ? void 0 : _0x195755["textContent"])) continue;
    const _0x6dad07 = childByLocalName(_0x25a109, "label");
    _0x5836ce["push"]({ "identifier": _0x195755["textContent"]["trim"](), "title": ((_b = _0x6dad07 == null ? void 0 : _0x6dad07["textContent"]) == null ? void 0 : _b["trim"]()) || _0x195755["textContent"]["trim"]() });
  }
  return _0x5836ce;
}
async function parseWcsCoverageEnvelope(_0x434705) {
  var _a2, _b, _c, _d;
  const _0x58c7e1 = childByLocalName(_0x434705, "boundedBy"), _0xc74d92 = _0x58c7e1 ? childByLocalName(_0x58c7e1, "Envelope") : void 0;
  if (!_0xc74d92) return void 0;
  const _0x2ec96f = (_b = (_a2 = childByLocalName(_0xc74d92, "lowerCorner")) == null ? void 0 : _a2["textContent"]) == null ? void 0 : _b["trim"](), _0x3183e4 = (_d = (_c = childByLocalName(_0xc74d92, "upperCorner")) == null ? void 0 : _c["textContent"]) == null ? void 0 : _d["trim"]();
  if (!_0x2ec96f || !_0x3183e4) return void 0;
  const _0x38f1b0 = _0x2ec96f["split"](/\s+/)["map"](Number), _0x5cf0c4 = _0x3183e4["split"](/\s+/)["map"](Number);
  if (_0x38f1b0["length"] < 2 || _0x5cf0c4["length"] < 2) return void 0;
  if (![..._0x38f1b0, ..._0x5cf0c4]["every"](Number["isFinite"])) return void 0;
  const _0x3098b0 = (_0xc74d92["getAttribute"]("axisLabels") ?? "")["trim"]()["toLowerCase"](), _0x1bd7a0 = (_0xc74d92["getAttribute"]("uomLabels") ?? "")["toLowerCase"]();
  if (_0x1bd7a0["includes"]("deg")) {
    const _0x373dd6 = _0x3098b0["startsWith"]("lat");
    return _0x373dd6 ? { "south": _0x38f1b0[0], "west": _0x38f1b0[1], "north": _0x5cf0c4[0], "east": _0x5cf0c4[1] } : { "west": _0x38f1b0[0], "south": _0x38f1b0[1], "east": _0x5cf0c4[0], "north": _0x5cf0c4[1] };
  }
  const _0xa42aa7 = _0xc74d92["getAttribute"]("srsName") ?? "";
  return resolveProjectedEnvelope(_0xa42aa7, _0x3098b0, _0x38f1b0, _0x5cf0c4);
}
async function resolveProjectedEnvelope(_0x4ef421, _0x1086ee, _0x4910b2, _0x3cd9f) {
  const _0x39101e = extractEpsgCode(_0x4ef421);
  if (!_0x39101e) return void 0;
  const _0x437aeb = await ensureProj4Def(_0x39101e);
  if (!_0x437aeb) return void 0;
  try {
    const _0x50228b = _0x1086ee["startsWith"]("y") || _0x1086ee["startsWith"]("n"), _0x19c1cc = (_0x2c4c24) => _0x50228b ? [_0x2c4c24[1], _0x2c4c24[0]] : [_0x2c4c24[0], _0x2c4c24[1]], [_0x5bdae6, _0x34711b] = _0x19c1cc(_0x4910b2), [_0x17c681, _0x149f8e] = _0x19c1cc(_0x3cd9f), _0x1de042 = [[_0x5bdae6, _0x34711b], [_0x17c681, _0x149f8e], [_0x5bdae6, _0x149f8e], [_0x17c681, _0x34711b]], _0x1dc79d = "EPSG:" + _0x39101e, _0xa5b69b = _0x1de042["map"]((_0x1ffc85) => _0x437aeb(_0x1dc79d, "EPSG:4326", _0x1ffc85)), _0x1c881e = _0xa5b69b["map"]((_0x23c23a) => _0x23c23a[0]), _0x48ad57 = _0xa5b69b["map"]((_0x1040d3) => _0x1040d3[1]), _0x798909 = { "west": Math["min"](..._0x1c881e), "east": Math["max"](..._0x1c881e), "south": Math["min"](..._0x48ad57), "north": Math["max"](..._0x48ad57) };
    if (!Object["values"](_0x798909)["every"](Number["isFinite"])) return void 0;
    return _0x798909;
  } catch {
    return void 0;
  }
}
async function fetchWcsCoverageExtents(_0x3f45b4, _0x3d9fae, _0x5bdf8c, _0x28320a) {
  var _a2;
  const _0x358d71 = /* @__PURE__ */ new Map();
  if (_0x3d9fae["length"] === 0) return _0x358d71;
  try {
    const _0x268c70 = new URL(_0x3f45b4);
    _0x268c70["searchParams"]["set"]("SERVICE", "WCS"), _0x268c70["searchParams"]["set"]("VERSION", "2.0.1"), _0x268c70["searchParams"]["set"]("REQUEST", "DescribeCoverage"), _0x268c70["searchParams"]["set"]("COVERAGEID", _0x3d9fae["join"](","));
    const _0x1dabf6 = await getCapabilities(_0x268c70["toString"](), _0x5bdf8c, _0x28320a);
    for (const _0x418a76 of elementsByLocalName(_0x1dabf6, "CoverageDescription")) {
      const _0x2863ee = childByLocalName(_0x418a76, "CoverageId"), _0x59150d = (_a2 = _0x2863ee == null ? void 0 : _0x2863ee["textContent"]) == null ? void 0 : _a2["trim"]();
      if (!_0x59150d) continue;
      const _0x4795f0 = await parseWcsCoverageEnvelope(_0x418a76);
      if (_0x4795f0) _0x358d71["set"](_0x59150d, _0x4795f0);
    }
  } catch {
  }
  return _0x358d71;
}
function wcsRectangleFor(_0x2f6683) {
  const _0x4514f7 = _0x2f6683["geographicBoundingBox"];
  if (!_0x4514f7) return void 0;
  return Rectangle["fromDegrees"](_0x4514f7["west"], _0x4514f7["south"], _0x4514f7["east"], _0x4514f7["north"]);
}
function parseCapabilities(_0x32043d, _0x561094) {
  switch (_0x32043d) {
    case "WMS":
      return parseWmsCapabilities(_0x561094);
    case "WMTS":
      return parseWmtsCapabilities(_0x561094);
    case "WFS":
      return parseWfsCapabilities(_0x561094);
    case "WCS":
      return parseWcsCapabilities(_0x561094);
    default:
      return [];
  }
}
function detectServiceType(_0x2644d2) {
  const _0x177f94 = _0x2644d2["documentElement"], _0x9fdf31 = _0x177f94["localName"], _0x909835 = _0x177f94["namespaceURI"] ?? "";
  if (_0x9fdf31 === "WMS_Capabilities" || _0x9fdf31 === "WMT_MS_Capabilities" || _0x909835["includes"]("/wms")) return "WMS";
  if (_0x9fdf31 === "WFS_Capabilities" || _0x909835["includes"]("/wfs")) return "WFS";
  if (_0x909835["includes"]("/wmts")) return "WMTS";
  if (_0x909835["includes"]("/wcs") || _0x9fdf31 === "WCS_Capabilities") return "WCS";
  return void 0;
}
const _OgcLayerFactory = class _OgcLayerFactory {
  constructor(_0x21b385, _0x6b262c) {
    this["viewer"] = _0x21b385, this["deps"] = _0x6b262c, this["serviceLayerOptions"] = /* @__PURE__ */ new Map();
  }
  ["getServiceOptions"](_0x1ce934) {
    return this["serviceLayerOptions"]["get"](_0x1ce934);
  }
  ["deleteServiceOptions"](_0x5eabf6) {
    this["serviceLayerOptions"]["delete"](_0x5eabf6);
  }
  ["buildWmsProvider"](_0x2107f8) {
    var _a2, _b;
    const _0x596b1f = this["deps"]["apiKeyPolicy"]["resolveOgcProxyUrl"]("wms", _0x2107f8["url"]), _0x393b28 = (_a2 = _0x2107f8["layers"]) == null ? void 0 : _a2["trim"]();
    if (!_0x393b28) throw new LayerOperationError("LAYER_WMS_LAYERS_EMPTY", "WMS katmani eklenemedi: layers (ogcLayerName) bos — id=" + _0x2107f8["id"]);
    const _0x4cd2e8 = this["deps"]["apiKeyPolicy"]["mergeApiKeyHeader"](this["deps"]["apiKeyPolicy"]["buildAuthHeaders"](_0x2107f8["authToken"]), _0x596b1f), _0x113b1b = _0x2107f8["version"] ?? "1.3.0", _0x20e014 = new WebMapServiceImageryProvider({ "url": _0x4cd2e8 ? new Resource({ "url": _0x596b1f, "headers": _0x4cd2e8 }) : _0x596b1f, "layers": _0x393b28, "parameters": { "service": "WMS", "version": _0x113b1b, "request": "GetMap", "transparent": "true", "format": "image/png", ..._0x2107f8["parameters"] }, "getFeatureInfoParameters": { "version": _0x113b1b, "styles": ((_b = _0x2107f8["parameters"]) == null ? void 0 : _b["styles"]) ?? "" }, "getFeatureInfoFormats": [new GetFeatureInfoFormat("json"), new GetFeatureInfoFormat("xml", "application/vnd.ogc.gml"), new GetFeatureInfoFormat("xml", "text/xml"), new GetFeatureInfoFormat("html")], ..._0x2107f8["rectangle"] !== void 0 && { "rectangle": _0x2107f8["rectangle"] }, ..._0x2107f8["minimumLevel"] !== void 0 && { "minimumLevel": _0x2107f8["minimumLevel"] }, ..._0x2107f8["maximumLevel"] !== void 0 && { "maximumLevel": _0x2107f8["maximumLevel"] }, ..._0x2107f8["tileWidth"] !== void 0 && { "tileWidth": _0x2107f8["tileWidth"] }, ..._0x2107f8["tileHeight"] !== void 0 && { "tileHeight": _0x2107f8["tileHeight"] } });
    return _0x20e014;
  }
  ["addWMS"](_0x4f7f2d) {
    const _0x4d1931 = this["buildWmsProvider"](_0x4f7f2d), _0xdbf677 = this["viewer"]["imageryLayers"]["addImageryProvider"](_0x4d1931), _0x25c1dd = this["deps"]["register"](_0x4f7f2d["id"], _0x4f7f2d["title"], "WMS", _0xdbf677, ![]);
    return this["serviceLayerOptions"]["set"](_0x4f7f2d["id"], _0x4f7f2d), Promise["resolve"](_0x25c1dd);
  }
  ["buildWmtsProvider"](_0x544eda) {
    const _0x265227 = this["deps"]["apiKeyPolicy"]["resolveOgcProxyUrl"]("wmts", _0x544eda["url"]), _0x69cae7 = this["deps"]["apiKeyPolicy"]["mergeApiKeyHeader"](this["deps"]["apiKeyPolicy"]["buildAuthHeaders"](_0x544eda["authToken"]), _0x265227);
    return new WebMapTileServiceImageryProvider({ "url": _0x69cae7 ? new Resource({ "url": _0x265227, "headers": _0x69cae7 }) : _0x265227, "layer": _0x544eda["layer"], "style": _0x544eda["style"] ?? "default", "tileMatrixSetID": _0x544eda["tileMatrixSetID"], "format": _0x544eda["format"] ?? "image/png", "tilingScheme": new WebMercatorTilingScheme(), ..._0x544eda["tileWidth"] !== void 0 && { "tileWidth": _0x544eda["tileWidth"] }, ..._0x544eda["tileHeight"] !== void 0 && { "tileHeight": _0x544eda["tileHeight"] }, ..._0x544eda["minimumLevel"] !== void 0 && { "minimumLevel": _0x544eda["minimumLevel"] }, ..._0x544eda["maximumLevel"] !== void 0 && { "maximumLevel": _0x544eda["maximumLevel"] }, ..._0x544eda["rectangle"] !== void 0 && { "rectangle": _0x544eda["rectangle"] } });
  }
  ["addWMTS"](_0x2393b7) {
    const _0x3a708b = this["buildWmtsProvider"](_0x2393b7), _0x3a7edc = this["viewer"]["imageryLayers"]["addImageryProvider"](_0x3a708b), _0x240a8d = this["deps"]["register"](_0x2393b7["id"], _0x2393b7["title"], "WMTS", _0x3a7edc, ![]);
    return this["serviceLayerOptions"]["set"](_0x2393b7["id"], _0x2393b7), Promise["resolve"](_0x240a8d);
  }
  async ["getWmsAvailableStyles"](_0x23d398) {
    const _0x9854e6 = this["requireServiceOptions"](_0x23d398, "WMS"), _0xe698e = _0x9854e6["version"] ?? "1.3.0", _0x13846b = await this["getCapabilitiesDocument"](_0x9854e6["url"], "WMS", _0xe698e, _0x9854e6["authToken"]);
    return parseWmsStyles(_0x13846b, _0x9854e6["layers"])["map"]((_0x186a4f) => ({ ..._0x186a4f, "legendUrl": this["getWmsLegendGraphicUrl"](_0x23d398, _0x186a4f["name"]) }));
  }
  async ["setWmsStyle"](_0x34d085, _0x100aa5) {
    const _0x454d69 = this["requireServiceOptions"](_0x34d085, "WMS"), _0x472399 = { ..._0x454d69, "parameters": { ..._0x454d69["parameters"], "STYLES": _0x100aa5 } };
    await this["rebuildImageryLayer"](_0x34d085, () => this["buildWmsProvider"](_0x472399)), this["serviceLayerOptions"]["set"](_0x34d085, _0x472399);
  }
  ["getWmsLegendGraphicUrl"](_0x503760, _0x3e9c85) {
    const _0x1388b0 = this["requireServiceOptions"](_0x503760, "WMS"), _0x5ea5e0 = new URLSearchParams({ "service": "WMS", "version": _0x1388b0["version"] ?? "1.3.0", "request": "GetLegendGraphic", "format": "image/png", "layer": _0x1388b0["layers"], "sld_version": "1.1.0", ..._0x3e9c85 !== void 0 && _0x3e9c85 !== "" ? { "style": _0x3e9c85 } : {} }), _0x1460b6 = this["deps"]["apiKeyPolicy"]["resolveOgcProxyUrl"]("wms", _0x1388b0["url"]);
    return this["deps"]["apiKeyPolicy"]["attachApiKeyToUrl"]("" + _0x1460b6 + (_0x1460b6["includes"]("?") ? "&" : "?") + _0x5ea5e0["toString"]());
  }
  async ["getWmtsAvailableStyles"](_0x382bc1) {
    const _0x32e7b0 = this["requireServiceOptions"](_0x382bc1, "WMTS"), _0x5165e9 = await this["getCapabilitiesDocument"](_0x32e7b0["url"], "WMTS", "1.0.0", _0x32e7b0["authToken"]), _0x41d5ad = parseWmtsStyles(_0x5165e9, _0x32e7b0["layer"]);
    return _0x41d5ad["map"]((_0x53a2e5) => ({ ..._0x53a2e5, "legendUrl": this["deps"]["apiKeyPolicy"]["attachApiKeyToUrl"](_0x53a2e5["legendUrl"]) }));
  }
  async ["setWmtsStyle"](_0xd051cc, _0x3070df) {
    const _0x14453b = this["requireServiceOptions"](_0xd051cc, "WMTS"), _0x481c9b = { ..._0x14453b, "style": _0x3070df };
    await this["rebuildImageryLayer"](_0xd051cc, () => this["buildWmtsProvider"](_0x481c9b)), this["serviceLayerOptions"]["set"](_0xd051cc, _0x481c9b);
  }
  async ["addWFS"](_0x7fc2de) {
    const _0x4d719f = this["deps"]["apiKeyPolicy"]["resolveOgcProxyUrl"]("wfs", _0x7fc2de["url"]), _0x5070a1 = {};
    _0x7fc2de["authToken"] !== void 0 && (_0x5070a1["headers"] = { "Authorization": "Bearer " + _0x7fc2de["authToken"] });
    const _0x326515 = this["deps"]["apiKeyPolicy"]["mergeApiKeyHeader"](_0x5070a1["headers"], _0x4d719f);
    if (_0x326515 !== void 0) _0x5070a1["headers"] = _0x326515;
    const _0x4a0d3e = { ..._0x7fc2de, "url": _0x4d719f }, _0x1bbcdb = await fetchWfsCapabilities(_0x4d719f, _0x5070a1), _0x581ea4 = { "typeNameHint": _0x7fc2de["typeName"], "caps": _0x1bbcdb };
    if (_0x7fc2de["version"] !== void 0) _0x581ea4["version"] = _0x7fc2de["version"];
    if (_0x7fc2de["srsName"] !== void 0) _0x581ea4["srsName"] = _0x7fc2de["srsName"];
    _0x7fc2de["outputFormat"] !== void 0 && (_0x581ea4["outputFormat"] = _0x7fc2de["outputFormat"]);
    _0x7fc2de["maxFeatures"] !== void 0 ? _0x581ea4["maxFeatures"] = _0x7fc2de["maxFeatures"] : _0x581ea4["maxFeatures"] = _OgcLayerFactory["TEMP_WFS_UNLIMITED_MAX_FEATURES"];
    const _0x3cd83e = buildWfsGetFeaturePlan(_0x581ea4);
    let _0xcd1fb4;
    try {
      _0xcd1fb4 = await this["fetchWfsGeoJson"](_0x4a0d3e, _0x5070a1, _0x3cd83e);
    } catch (_0x54e6e8) {
      try {
        _0xcd1fb4 = await this["fetchWfsGml"](_0x4a0d3e, _0x5070a1, _0x3cd83e);
      } catch (_0x26edd8) {
        _0x26edd8 instanceof Error && (_0x26edd8["cause"] = _0x54e6e8);
        throw _0x26edd8;
      }
    }
    const _0x24c320 = _0xcd1fb4 !== null && typeof _0xcd1fb4 === "object" ? _0xcd1fb4["features"] : void 0;
    return Array["isArray"](_0x24c320) ? _0x24c320["length"] : _0x3cd83e["maxFeatures"], loadVectorGeoJsonLayer(this["viewer"], this["deps"], _0xcd1fb4, { "id": _0x7fc2de["id"], "title": _0x7fc2de["title"], "layerType": "WFS", "clampToGround": _0x7fc2de["clampToGround"] ?? ![] }, (_0x3d2fea) => {
    });
  }
  async ["fetchWfsHitsCount"](_0x372d6a, _0x5d9e1c, _0x45ac1e) {
    if (!_0x45ac1e["version"]["startsWith"]("2.") && !_0x45ac1e["version"]["startsWith"]("1.1")) return void 0;
    const _0xf00b88 = new URLSearchParams();
    appendWfsGetFeatureParams(_0xf00b88, _0x45ac1e), _0xf00b88["delete"]("count"), _0xf00b88["delete"]("maxFeatures"), _0xf00b88["set"]("resultType", "hits");
    let _0x4a359a;
    try {
      _0x4a359a = await fetch("" + _0x372d6a["url"] + (_0x372d6a["url"]["includes"]("?") ? "&" : "?") + _0xf00b88["toString"](), _0x5d9e1c);
    } catch {
      return void 0;
    }
    if (!_0x4a359a["ok"]) return void 0;
    const _0x1fa70c = decodeTextBuffer(await _0x4a359a["arrayBuffer"]());
    if (isOgcExceptionXml(_0x1fa70c)) return void 0;
    const _0x2f3b40 = _0x1fa70c["trimStart"]();
    if (_0x2f3b40["startsWith"]("{")) try {
      const _0x4253ce = JSON["parse"](_0x2f3b40), _0x1ac2ae = _0x4253ce["numberMatched"] ?? _0x4253ce["totalFeatures"];
      return typeof _0x1ac2ae === "number" ? _0x1ac2ae : void 0;
    } catch {
      return void 0;
    }
    try {
      const _0x4b7029 = new DOMParser()["parseFromString"](_0x1fa70c, "application/xml")["documentElement"], _0x407f4d = _0x4b7029["getAttribute"]("numberMatched") ?? _0x4b7029["getAttribute"]("numberOfFeatures") ?? _0x4b7029["getAttribute"]("numberReturned");
      if (!_0x407f4d) return void 0;
      const _0x25cb1f = Number(_0x407f4d);
      return Number["isFinite"](_0x25cb1f) ? _0x25cb1f : void 0;
    } catch {
      return void 0;
    }
  }
  async ["fetchWfsGeoJson"](_0x25a18c, _0x59df54, _0x2336ae) {
    const _0x247295 = _0x2336ae["jsonOutputFormat"];
    if (!_0x247295) throw new OgcRequestError("OGC_WFS_JSON_FORMAT_UNSUPPORTED", "WFS sunucusu JSON çıktı formatı ilan etmiyor.");
    const _0x1a1d69 = new URLSearchParams();
    appendWfsGetFeatureParams(_0x1a1d69, _0x2336ae, _0x247295);
    const _0x1f1bf4 = await fetch("" + _0x25a18c["url"] + (_0x25a18c["url"]["includes"]("?") ? "&" : "?") + _0x1a1d69["toString"](), _0x59df54), _0x3f55c4 = decodeTextBuffer(await _0x1f1bf4["arrayBuffer"]());
    if (!_0x1f1bf4["ok"] || isOgcExceptionXml(_0x3f55c4) || !_0x3f55c4["trimStart"]()["startsWith"]("{")) throw new OgcRequestError("OGC_WFS_GEOJSON_REQUEST_FAILED", "WFS GeoJSON isteği başarısız: " + _0x1f1bf4["status"] + " " + _0x1f1bf4["statusText"]);
    return JSON["parse"](_0x3f55c4);
  }
  async ["fetchWfsGml"](_0x204f73, _0x2d6169, _0x5edcdf) {
    const _0x74c73a = new URLSearchParams();
    appendWfsGetFeatureParams(_0x74c73a, _0x5edcdf);
    const _0x1fd215 = await fetch("" + _0x204f73["url"] + (_0x204f73["url"]["includes"]("?") ? "&" : "?") + _0x74c73a["toString"](), _0x2d6169);
    if (!_0x1fd215["ok"]) throw new OgcRequestError("OGC_WFS_REQUEST_FAILED", "WFS isteği başarısız: " + _0x1fd215["status"] + " " + _0x1fd215["statusText"]);
    const _0x17c9bc = decodeTextBuffer(await _0x1fd215["arrayBuffer"]());
    if (isOgcExceptionXml(_0x17c9bc)) throw new OgcRequestError("OGC_WFS_EXCEPTION", "WFS GetFeature OGC Exception döndü.");
    let _0x865b47, _0x38b834;
    try {
      ({ default: _0x865b47 } = await import("ol/format/WFS.js")), { default: _0x38b834 } = await import("ol/format/GeoJSON.js");
    } catch {
      throw new OgcRequestError("OGC_WFS_OL_PACKAGE_MISSING", 'WFS sunucusu GeoJSON çıktısı desteklemiyor; GML yanıtını okumak için "ol" paketi gereklidir: pnpm add ol');
    }
    const _0x32446a = new _0x865b47({ "version": _0x5edcdf["version"] })["readFeatures"](_0x17c9bc);
    return new _0x38b834()["writeFeaturesObject"](_0x32446a, { "featureProjection": "EPSG:4326" });
  }
  async ["addWCS"](_0x15bc92) {
    const _0x4f7fba = this["deps"]["apiKeyPolicy"]["resolveOgcProxyUrl"]("wcs", _0x15bc92["url"]), _0x14959d = { "service": "WCS", "version": _0x15bc92["version"] ?? "2.0.1", "request": "GetCoverage", "coverageId": _0x15bc92["coverageId"], "format": _0x15bc92["format"] ?? "image/png" }, _0x4a2c04 = this["deps"]["apiKeyPolicy"]["mergeApiKeyHeader"](this["deps"]["apiKeyPolicy"]["buildAuthHeaders"](_0x15bc92["authToken"]), _0x4f7fba), _0x152223 = _0x15bc92["rectangle"] ?? Rectangle["fromDegrees"](-180, -90, 180, 90), _0x2f4039 = async (_0x16e039) => {
      const _0x30a058 = { ..._0x14959d };
      if (_0x16e039 !== void 0) _0x30a058["SCALESIZE"] = _0x16e039;
      const _0x4d2fcc = _0x4f7fba + "?" + new URLSearchParams(_0x30a058)["toString"](), _0xdd2508 = await this["resolveWcsImageUrl"](_0x4d2fcc, _0x4a2c04);
      try {
        return await SingleTileImageryProvider["fromUrl"](_0xdd2508, { "rectangle": _0x152223 });
      } finally {
        if (_0xdd2508["startsWith"]("blob:")) URL["revokeObjectURL"](_0xdd2508);
      }
    }, _0xe09d2e = _0x15bc92["maxSize"] ?? 2048, _0x4f26c4 = _0x14959d["version"]["startsWith"]("2.") && Number["isFinite"](_0xe09d2e);
    let _0x4b223a;
    if (!_0x4f26c4) _0x4b223a = await _0x2f4039();
    else {
      const _0x56a922 = "http://www.opengis.net/def/axis/OGC/1/i(" + _0xe09d2e + "),http://www.opengis.net/def/axis/OGC/1/j(" + _0xe09d2e + ")";
      try {
        _0x4b223a = await _0x2f4039(_0x56a922);
      } catch {
        _0x4b223a = await _0x2f4039("x(" + _0xe09d2e + "),y(" + _0xe09d2e + ")");
      }
    }
    const _0x5793e3 = this["viewer"]["imageryLayers"]["addImageryProvider"](_0x4b223a);
    return this["serviceLayerOptions"]["set"](_0x15bc92["id"], _0x15bc92), this["deps"]["register"](_0x15bc92["id"], _0x15bc92["title"], "WCS", _0x5793e3, ![]);
  }
  async ["resolveWcsImageUrl"](_0xf54f8c, _0x14ae12) {
    const _0x3fb500 = await fetch(_0xf54f8c, _0x14ae12 ? { "headers": _0x14ae12 } : void 0);
    if (!_0x3fb500["ok"]) throw new OgcRequestError("OGC_WCS_REQUEST_FAILED", "WCS isteği başarısız: " + _0x3fb500["status"] + " " + _0x3fb500["statusText"]);
    const _0x26d146 = _0x3fb500["headers"]["get"]("content-type") ?? "", _0x4572a9 = await _0x3fb500["arrayBuffer"](), _0x2c0d63 = /boundary="?([^";]+)"?/i["exec"](_0x26d146);
    if (!_0x26d146["includes"]("multipart/") || !_0x2c0d63) return URL["createObjectURL"](new Blob([_0x4572a9], { "type": _0x26d146 || "image/png" }));
    const _0x1529df = extractMultipartImage(new Uint8Array(_0x4572a9), _0x2c0d63[1]), _0x4e1f06 = _0x1529df["bytes"]["buffer"]["slice"](_0x1529df["bytes"]["byteOffset"], _0x1529df["bytes"]["byteOffset"] + _0x1529df["bytes"]["byteLength"]);
    return URL["createObjectURL"](new Blob([_0x4e1f06], { "type": _0x1529df["mimeType"] }));
  }
  ["addGeoTiff"](_0x4467e3) {
    throw new LayerOperationError("LAYER_GEOTIFF_UNSUPPORTED", "GeoTIFF katmanı bu Cesium sürümünde (≥1.143) henüz desteklenmiyor. GeoTiffImageryProvider mevcut değil. geotiff.js ile özel provider gereklidir.");
  }
  ["requireServiceOptions"](_0x35d994, _0x4ffef6) {
    const _0x4c1482 = this["deps"]["requireLayer"](_0x35d994);
    if (_0x4c1482["layerType"] !== _0x4ffef6) throw new LayerOperationError("LAYER_TYPE_MISMATCH", "Katman " + _0x4ffef6 + ' değil: "' + _0x35d994 + '" (' + _0x4c1482["layerType"] + ")");
    const _0x4d13c2 = this["serviceLayerOptions"]["get"](_0x35d994);
    if (_0x4d13c2 === void 0) throw new LayerOperationError("LAYER_SERVICE_OPTIONS_NOT_FOUND", 'Katman için orijinal servis seçenekleri bulunamadı: "' + _0x35d994 + '"');
    return _0x4d13c2;
  }
  async ["rebuildImageryLayer"](_0x50cf43, _0xaa076e) {
    const _0x2dc99f = this["deps"]["requireLayer"](_0x50cf43);
    if (!(_0x2dc99f["cesiumObject"] instanceof ImageryLayer)) throw new LayerOperationError("LAYER_NOT_RASTER", 'Katman raster (ImageryLayer) değil: "' + _0x50cf43 + '"');
    const _0x513db6 = _0x2dc99f["cesiumObject"], _0xfd00fd = this["viewer"]["imageryLayers"]["indexOf"](_0x513db6), { show: _0x588c45, alpha: _0x38e93a } = _0x513db6, _0xcb4d74 = _0xaa076e(), _0x48d75b = new ImageryLayer(_0xcb4d74, { "show": _0x588c45, "alpha": _0x38e93a });
    this["viewer"]["imageryLayers"]["remove"](_0x513db6, !![]), this["viewer"]["imageryLayers"]["add"](_0x48d75b, _0xfd00fd), this["deps"]["setItem"](_0x50cf43, Object["freeze"]({ ..._0x2dc99f, "cesiumObject": _0x48d75b }));
  }
  async ["getCapabilitiesDocument"](_0x55fd95, _0xc4488d, _0x17f6e8, _0x314a80) {
    const _0x546813 = this["deps"]["apiKeyPolicy"]["resolveOgcProxyUrl"](_0xc4488d["toLowerCase"](), _0x55fd95), _0x10cea2 = buildCapabilitiesUrl(_0x546813, _0xc4488d, _0x17f6e8);
    return getCapabilities(_0x10cea2, _0x314a80, this["deps"]["apiKeyPolicy"]);
  }
  async ["getWcsCoverageExtents"](_0x35e6ca, _0x1574f2, _0x314a02) {
    const _0x113dc2 = this["deps"]["apiKeyPolicy"]["resolveOgcProxyUrl"]("wcs", _0x35e6ca);
    return fetchWcsCoverageExtents(_0x113dc2, _0x1574f2, _0x314a02, this["deps"]["apiKeyPolicy"]);
  }
};
_OgcLayerFactory["TEMP_WFS_UNLIMITED_MAX_FEATURES"] = 1e6;
let OgcLayerFactory = _OgcLayerFactory;
class ShapeLayerBridge {
  constructor(_0x5bd5dc, _0x4a9e93) {
    this["viewer"] = _0x5bd5dc, this["deps"] = _0x4a9e93, this["drawnShapeCounters"] = /* @__PURE__ */ new Map();
  }
  ["deleteCounter"](_0x10cf72) {
    this["drawnShapeCounters"]["delete"](_0x10cf72);
  }
  async ["addDrawnShape"](_0x311592, _0x550236, _0x536b29) {
    const _0xb001f6 = _0x536b29["entity"];
    this["viewer"]["entities"]["remove"](_0xb001f6);
    const _0x2bc959 = (this["drawnShapeCounters"]["get"](_0x311592) ?? 0) + 1;
    this["drawnShapeCounters"]["set"](_0x311592, _0x2bc959), _0xb001f6["properties"] = buildDrawnShapeProperties(_0x536b29, _0x2bc959);
    const _0x433882 = this["deps"]["getItem"](_0x311592), _0x7de85a = _0x433882 && "entities" in _0x433882["cesiumObject"] ? _0x433882["cesiumObject"] : new CustomDataSource(_0x550236), _0x48d0d8 = _0x433882 ? this["deps"]["getStyle"](_0x311592) : void 0, _0x3fc6ea = (_0x48d0d8 == null ? void 0 : _0x48d0d8["fill"]["mode"]) === "solid" ? Color["fromCssColorString"](_0x48d0d8["fill"]["color"])["withAlpha"](_0x48d0d8["fill"]["opacity"]) : Color["CYAN"]["withAlpha"](0.4), _0x323fab = (_0x48d0d8 == null ? void 0 : _0x48d0d8["outline"]) ?? { "enabled": !![], "color": this["deps"]["defaultOutlineColorHex"], "width": 1 };
    this["deps"]["applyEntityStyle"](_0xb001f6, _0x3fc6ea, _0x323fab, !![]), _0x7de85a["entities"]["add"](_0xb001f6);
    _0xb001f6["polygon"] !== void 0 && this["deps"]["addPolygonOutlineCompanion"](_0x7de85a, _0xb001f6, Color["fromCssColorString"](_0x323fab["color"]), _0x323fab["width"], ![]);
    if (_0x433882) return this["deps"]["tagEntities"](_0x7de85a, _0x311592), _0x433882;
    await this["viewer"]["dataSources"]["add"](_0x7de85a);
    const _0x296f0a = Color["CYAN"]["toCssHexString"](), _0x98fb28 = this["deps"]["register"](_0x311592, _0x550236, "DRAWING", _0x7de85a, ![], _0x296f0a);
    return this["deps"]["recordInitialStyle"](_0x98fb28["id"], _0x296f0a, 0.4, _0x323fab), _0x98fb28;
  }
  async ["addMeasuredShape"](_0x47bdb1, _0x32821e, _0x2839e9) {
    const _0x4c475a = _0x2839e9["entity"];
    this["viewer"]["entities"]["remove"](_0x4c475a);
    const _0x378d69 = (this["drawnShapeCounters"]["get"](_0x47bdb1) ?? 0) + 1;
    this["drawnShapeCounters"]["set"](_0x47bdb1, _0x378d69), _0x4c475a["properties"] = buildMeasuredShapeProperties(_0x2839e9, _0x378d69);
    const _0x4569db = this["deps"]["getItem"](_0x47bdb1), _0x5d73e2 = _0x4569db && "entities" in _0x4569db["cesiumObject"] ? _0x4569db["cesiumObject"] : new CustomDataSource(_0x32821e), _0x1492f6 = _0x4569db ? this["deps"]["getStyle"](_0x47bdb1) : void 0, _0x39827f = (_0x1492f6 == null ? void 0 : _0x1492f6["fill"]["mode"]) === "solid" ? Color["fromCssColorString"](_0x1492f6["fill"]["color"])["withAlpha"](_0x1492f6["fill"]["opacity"]) : Color["CYAN"]["withAlpha"](0.4), _0x38c4a3 = (_0x1492f6 == null ? void 0 : _0x1492f6["outline"]) ?? { "enabled": !![], "color": this["deps"]["defaultOutlineColorHex"], "width": 1 };
    this["deps"]["applyEntityStyle"](_0x4c475a, _0x39827f, _0x38c4a3, !![]), _0x5d73e2["entities"]["add"](_0x4c475a);
    _0x4c475a["polygon"] !== void 0 && this["deps"]["addPolygonOutlineCompanion"](_0x5d73e2, _0x4c475a, Color["fromCssColorString"](_0x38c4a3["color"]), _0x38c4a3["width"], ![]);
    if (_0x4569db) return this["deps"]["tagEntities"](_0x5d73e2, _0x47bdb1), _0x4569db;
    await this["viewer"]["dataSources"]["add"](_0x5d73e2);
    const _0x52f87c = Color["CYAN"]["toCssHexString"](), _0x52ed41 = this["deps"]["register"](_0x47bdb1, _0x32821e, "MEASURE", _0x5d73e2, ![], _0x52f87c);
    return this["deps"]["recordInitialStyle"](_0x52ed41["id"], _0x52f87c, 0.4, _0x38c4a3), _0x52ed41;
  }
  ["removeDrawnShape"](_0x59f437, _0x34ef10) {
    const _0x55d3ad = this["deps"]["getItem"](_0x59f437);
    if (!_0x55d3ad || !("entities" in _0x55d3ad["cesiumObject"])) return;
    _0x55d3ad["cesiumObject"]["entities"]["removeById"](_0x34ef10["id"] + "::outline"), _0x55d3ad["cesiumObject"]["entities"]["remove"](_0x34ef10), _0x55d3ad["cesiumObject"]["entities"]["values"]["length"] === 0 && this["deps"]["removeLayer"](_0x59f437);
  }
}
const DRAWN_SHAPE_LABELS = { "point": "Nokta", "polyline": "Çizgi", "polygon": "Alan", "rectangle": "Dikdörtgen", "circle": "Daire", "freehand": "Serbest Çizim" };
function roundMeters(_0x41ce72) {
  return Math["round"](_0x41ce72 * 100) / 100;
}
function roundCoordinate(_0x350c5c) {
  return Math["round"](_0x350c5c * 1e6) / 1e6;
}
function wktCoordinatePair(_0x138f9a) {
  return roundCoordinate(_0x138f9a[0]) + " " + roundCoordinate(_0x138f9a[1]);
}
function geometryToWkt(_0xb49cbf) {
  switch (_0xb49cbf["type"]) {
    case "Point": {
      const _0x2925e1 = _0xb49cbf["coordinates"];
      return "POINT (" + wktCoordinatePair(_0x2925e1) + ")";
    }
    case "LineString": {
      const _0x50dbdb = _0xb49cbf["coordinates"];
      return "LINESTRING (" + _0x50dbdb["map"]((_0x55e3b5) => wktCoordinatePair(_0x55e3b5))["join"](", ") + ")";
    }
    case "Polygon": {
      const _0x11cc4f = _0xb49cbf["coordinates"], _0x3fdfcb = _0x11cc4f["map"]((_0x36b60d) => "(" + _0x36b60d["map"]((_0x1c6094) => wktCoordinatePair(_0x1c6094))["join"](", ") + ")")["join"](", ");
      return "POLYGON (" + _0x3fdfcb + ")";
    }
    default:
      return "";
  }
}
function buildDrawnShapeProperties(_0x250b91, _0x44f72f) {
  const _0x406566 = { "id": _0x44f72f, "sekil": DRAWN_SHAPE_LABELS[_0x250b91["tool"]] };
  if (_0x250b91["length"] !== void 0) _0x406566["uzunluk_m"] = roundMeters(_0x250b91["length"]);
  if (_0x250b91["area"] !== void 0) _0x406566["alan_m2"] = roundMeters(_0x250b91["area"]);
  if (_0x250b91["perimeter"] !== void 0) _0x406566["cevre_m"] = roundMeters(_0x250b91["perimeter"]);
  if (_0x250b91["radius"] !== void 0) _0x406566["yaricap_m"] = roundMeters(_0x250b91["radius"]);
  return _0x406566["olusturma_tarihi"] = new Date(_0x250b91["createdAt"])["toLocaleString"]("tr-TR"), _0x406566["geomwkt"] = geometryToWkt(_0x250b91["geometry"]), new PropertyBag(_0x406566);
}
const MEASURED_SHAPE_LABELS = { "point": "Nokta", "polyline": "Mesafe", "polygon": "Alan", "rectangle": "Dikdörtgen", "circle": "Daire", "freehand": "Serbest Çizim" };
function buildMeasuredShapeProperties(_0x2d663f, _0x3689ef) {
  const _0x2a563a = { "id": _0x3689ef, "olcum_turu": MEASURED_SHAPE_LABELS[_0x2d663f["tool"]] };
  if (_0x2d663f["length"] !== void 0) _0x2a563a["uzunluk_m"] = roundMeters(_0x2d663f["length"]);
  if (_0x2d663f["area"] !== void 0) _0x2a563a["alan_m2"] = roundMeters(_0x2d663f["area"]);
  if (_0x2d663f["perimeter"] !== void 0) _0x2a563a["cevre_m"] = roundMeters(_0x2d663f["perimeter"]);
  return _0x2a563a["olusturma_tarihi"] = new Date(_0x2d663f["createdAt"])["toLocaleString"]("tr-TR"), _0x2a563a["geomwkt"] = geometryToWkt(_0x2d663f["geometry"]), new PropertyBag(_0x2a563a);
}
const _LayerManager = class _LayerManager extends EventEmitter {
  constructor(_0x1ed722) {
    super(), this["items"] = /* @__PURE__ */ new Map(), this["analysisResultIds"] = /* @__PURE__ */ new Set(), this["viewer"] = _0x1ed722, this["apiKeyPolicy"] = new ApiKeyPolicy({ "apiBase": () => getUcbpApiBase() }), this["outlineGeometry"] = new OutlineGeometry({ "getCurrentTime": () => this["viewer"]["clock"]["currentTime"] }), this["opacityController"] = new OpacityController({ "requestRender": () => this["viewer"]["scene"]["requestRender"]() }), this["styleEngine"] = new LayerStyleEngine({ "outlineGeometry": this["outlineGeometry"], "opacityController": this["opacityController"], "getCurrentTime": () => this["viewer"]["clock"]["currentTime"], "requestRender": () => this["viewer"]["scene"]["requestRender"](), "emitStyle": (_0x2aea58, _0x3c2563) => this["emit"]("layer:style", { "id": _0x2aea58, "style": _0x3c2563 }), "waitForRenderSettle": () => this["waitForRenderSettle"]() }), this["localSourceLoader"] = new LocalSourceLoader(_0x1ed722, { "styleEngine": this["styleEngine"], "outlineGeometry": this["outlineGeometry"], "addPolygonOutlines": (_0x5db740, _0x5ae596, _0x35c51d) => this["addPolygonOutlines"](_0x5db740, _0x5ae596, _0x35c51d), "register": (_0x1fde1b, _0x20efb0, _0x5cffe0, _0x4fe51a, _0x5f596c, _0x29b494) => this["register"](_0x1fde1b, _0x20efb0, _0x5cffe0, _0x4fe51a, _0x5f596c, _0x29b494), "emitCrsCheckResult": (_0x55ca57, _0x291b62) => this["emitCrsCheckResult"](_0x55ca57, _0x291b62), "waitForRenderSettle": () => this["waitForRenderSettle"](), "defaultOutlineColor": _LayerManager["DEFAULT_OUTLINE_COLOR"], "defaultOutlineColorHex": _LayerManager["DEFAULT_OUTLINE_COLOR_HEX"] }), this["shapeLayerBridge"] = new ShapeLayerBridge(_0x1ed722, { "getItem": (_0x4fe472) => this["items"]["get"](_0x4fe472), "getStyle": (_0x21364b) => this["styleEngine"]["getStyle"](_0x21364b), "applyEntityStyle": (_0x4e577b, _0x2cf965, _0x2788a1, _0x5746ca) => this["applyEntityStyle"](_0x4e577b, _0x2cf965, _0x2788a1, _0x5746ca), "addPolygonOutlineCompanion": (_0x23a293, _0x49c046, _0x5f3098, _0x5b1c76, _0x33d1f0) => this["addPolygonOutlineCompanion"](_0x23a293, _0x49c046, _0x5f3098, _0x5b1c76, _0x33d1f0), "tagEntities": (_0x5d7ee9, _0x5e7e51) => this["tagEntities"](_0x5d7ee9, _0x5e7e51), "register": (_0x1defe8, _0x4a1a99, _0x10a5cc, _0x404e4d, _0x3d8361, _0x4efb70) => this["register"](_0x1defe8, _0x4a1a99, _0x10a5cc, _0x404e4d, _0x3d8361, _0x4efb70), "recordInitialStyle": (_0x5c5dc3, _0x546a60, _0x3d2d79, _0x403339) => this["styleEngine"]["recordInitialStyle"](_0x5c5dc3, _0x546a60, _0x3d2d79, _0x403339), "removeLayer": (_0x3eba50) => this["removeLayer"](_0x3eba50), "defaultOutlineColorHex": _LayerManager["DEFAULT_OUTLINE_COLOR_HEX"] }), this["ogcLayerFactory"] = new OgcLayerFactory(_0x1ed722, { "apiKeyPolicy": this["apiKeyPolicy"], "styleEngine": this["styleEngine"], "outlineGeometry": this["outlineGeometry"], "requireLayer": (_0x3a0618) => this["requireLayer"](_0x3a0618), "setItem": (_0x25913f, _0x35fcda) => this["items"]["set"](_0x25913f, _0x35fcda), "register": (_0x5dc67f, _0x589a84, _0x598133, _0x246c92, _0x248950, _0x34b544) => this["register"](_0x5dc67f, _0x589a84, _0x598133, _0x246c92, _0x248950, _0x34b544), "addPolygonOutlines": (_0x198404, _0x528b77, _0x4e248f) => this["addPolygonOutlines"](_0x198404, _0x528b77, _0x4e248f), "emitCrsCheckResult": (_0x441af5, _0x5b93fd) => this["emitCrsCheckResult"](_0x441af5, _0x5b93fd), "emitFeaturesTruncated": (_0xa3ce68, _0x1253fb, _0xe05387) => this["emit"]("layer:features-truncated", { "id": _0xa3ce68, "totalCount": _0x1253fb, "loadedCount": _0xe05387 }), "waitForRenderSettle": () => this["waitForRenderSettle"](), "defaultOutlineColor": _LayerManager["DEFAULT_OUTLINE_COLOR"], "defaultOutlineColorHex": _LayerManager["DEFAULT_OUTLINE_COLOR_HEX"] }), this["cameraHighlight"] = new CameraHighlight(_0x1ed722, { "requireLayer": (_0x1cf3bd) => this["requireLayer"](_0x1cf3bd), "getLayerStyle": (_0x1b547d) => this["getLayerStyle"](_0x1b547d) });
  }
  ["configure"](_0x1a627a) {
    this["apiKeyPolicy"]["configure"](_0x1a627a), _0x1a627a["apiKey"] !== void 0 && this["emit"]("apiKey:change", { "hasApiKey": !![] });
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
  ["canAddAuthorizedLayer"](_0x10a912) {
    return this["apiKeyPolicy"]["canAddAuthorizedLayer"](_0x10a912);
  }
  async ["addAuthorizedLayer"](_0x28334a) {
    const _0x112a5f = this["apiKeyPolicy"]["resolveAddOptions"](_0x28334a);
    if (_0x112a5f["layerType"] === "WMS") return this["add"]("WMS", _0x112a5f["options"]);
    if (_0x112a5f["layerType"] === "WFS") return this["add"]("WFS", _0x112a5f["options"]);
    return this["add"]("WMTS", _0x112a5f["options"]);
  }
  ["layerRequiresApiKey"](_0x2e1a11) {
    return this["apiKeyPolicy"]["layerRequiresApiKey"](_0x2e1a11);
  }
  ["getLayers"]() {
    return Array["from"](this["items"]["values"]());
  }
  ["getLayerById"](_0xf21b22) {
    return this["items"]["get"](_0xf21b22);
  }
  ["getEntityPropertyNames"](_0x23111e) {
    const _0x35b647 = this["requireLayer"](_0x23111e);
    if (!("entities" in _0x35b647["cesiumObject"])) return [];
    const _0x2dbd84 = /* @__PURE__ */ new Set();
    for (const _0x53c262 of _0x35b647["cesiumObject"]["entities"]["values"]) {
      const _0x4b6b5a = _0x53c262["properties"];
      if (_0x4b6b5a === void 0) continue;
      for (const _0xf8a567 of _0x4b6b5a["propertyNames"]) {
        if (_0xf8a567 === "layerId" || _0xf8a567 === "featureId") continue;
        _0x2dbd84["add"](_0xf8a567);
      }
    }
    return Array["from"](_0x2dbd84);
  }
  ["getUniqueColumnValues"](_0x5f5901, _0xbc3716) {
    const _0x3f03af = this["requireLayer"](_0x5f5901);
    if (!("entities" in _0x3f03af["cesiumObject"])) return [];
    const _0xd0f3a8 = this["viewer"]["clock"]["currentTime"], _0x4e49e2 = /* @__PURE__ */ new Set();
    for (const _0x4c1b94 of _0x3f03af["cesiumObject"]["entities"]["values"]) {
      const _0x31e55e = this["readProperty"](_0x4c1b94, _0xbc3716, _0xd0f3a8);
      if (_0x31e55e !== null) _0x4e49e2["add"](_0x31e55e);
    }
    return Array["from"](_0x4e49e2);
  }
  ["getFeatureCount"](_0x667aaf) {
    const _0xa23b05 = this["requireLayer"](_0x667aaf);
    if (!("entities" in _0xa23b05["cesiumObject"])) return void 0;
    let _0x190e2b = 0;
    for (const _0x1990db of _0xa23b05["cesiumObject"]["entities"]["values"]) {
      if (!this["isOutlineCompanion"](_0x1990db)) _0x190e2b++;
    }
    return _0x190e2b;
  }
  ["getLayerGeoJSON"](_0x257d82) {
    return getLayerGeoJSON(this["requireLayer"](_0x257d82), this["viewer"]["clock"]["currentTime"], (_0x107b22) => this["isOutlineCompanion"](_0x107b22));
  }
  ["exportLayerGeoJSON"](_0x477b0b, _0x103833 = "katman") {
    exportLayerGeoJSON(this["getLayerGeoJSON"](_0x477b0b), _0x103833);
  }
  ["exportLayerKml"](_0x4fb0ba, _0x2f9108 = "katman") {
    exportLayerKml(this["getLayerGeoJSON"](_0x4fb0ba), _0x2f9108);
  }
  ["exportLayerShapefile"](_0x463912, _0x3a7458 = "katman") {
    exportLayerShapefile(this["getLayerGeoJSON"](_0x463912), _0x3a7458);
  }
  ["markAnalysisResult"](_0x18b8fd) {
    this["analysisResultIds"]["add"](_0x18b8fd);
  }
  ["isAnalysisResult"](_0x2b205d) {
    return this["analysisResultIds"]["has"](_0x2b205d);
  }
  ["isGeoTiffExportAvailable"](_0x349a7d) {
    return isGeoTiffExportAvailable(this["items"]["get"](_0x349a7d), this["ogcLayerFactory"]["getServiceOptions"](_0x349a7d));
  }
  async ["exportLayerAsGeoTiff"](_0x5e1fee, _0x5c6c41 = "katman") {
    const _0x3f9d5e = this["requireLayer"](_0x5e1fee);
    await exportLayerAsGeoTiff(_0x3f9d5e, this["ogcLayerFactory"]["getServiceOptions"](_0x5e1fee), _0x5c6c41, (_0x85dbbf, _0x892476) => this["apiKeyPolicy"]["resolveOgcProxyUrl"](_0x85dbbf, _0x892476), { "mergeApiKeyHeader": (_0x34cc87, _0x3b2733) => this["apiKeyPolicy"]["mergeApiKeyHeader"](_0x34cc87, _0x3b2733), "buildAuthHeaders": (_0x3a501f) => this["apiKeyPolicy"]["buildAuthHeaders"](_0x3a501f) });
  }
  ["getColumnRange"](_0x43330a, _0x1ce88d) {
    const _0x5baba0 = this["requireLayer"](_0x43330a);
    if (!("entities" in _0x5baba0["cesiumObject"])) return null;
    return this["styleEngine"]["getColumnRange"](_0x5baba0["cesiumObject"], this["viewer"]["clock"]["currentTime"], _0x1ce88d);
  }
  async ["applyLayerStyle"](_0xad3bfc, _0xccb493) {
    const _0x29752a = this["requireLayer"](_0xad3bfc);
    if (!("entities" in _0x29752a["cesiumObject"])) throw new LayerOperationError("LAYER_STYLE_NOT_VECTOR", 'applyLayerStyle sadece vektör (Entity tabanlı) katmanlarda kullanılabilir: "' + _0xad3bfc + '"');
    await this["styleEngine"]["applyLayerStyle"](_0xad3bfc, _0x29752a["cesiumObject"], _0x29752a["layerType"] === "DRAWING" || _0x29752a["layerType"] === "MEASURE", _0xccb493);
  }
  ["getLayerStyle"](_0x4a0cd0) {
    return this["styleEngine"]["getStyle"](_0x4a0cd0);
  }
  ["getInitialFillColor"](_0x56abae) {
    var _a2;
    return (_a2 = this["items"]["get"](_0x56abae)) == null ? void 0 : _a2["initialFillColor"];
  }
  ["getImageryLayers"]() {
    return Array["from"](this["items"]["values"]())["filter"]((_0x556c68) => !_0x556c68["isBasemap"] && _0x556c68["cesiumObject"] instanceof ImageryLayer)["map"]((_0x156f64) => _0x156f64["cesiumObject"]);
  }
  ["getBasemapLayers"]() {
    return Array["from"](this["items"]["values"]())["filter"]((_0x9d059b) => _0x9d059b["isBasemap"] && _0x9d059b["cesiumObject"] instanceof ImageryLayer)["map"]((_0xaa179e) => _0xaa179e["cesiumObject"]);
  }
  ["getDataSourceLayers"]() {
    return this["viewer"]["dataSources"];
  }
  ["getLayerByType"](_0x4dfb9b) {
    return Array["from"](this["items"]["values"]())["filter"]((_0x2c80e6) => _0x2c80e6["layerType"] === _0x4dfb9b);
  }
  async ["zoomToLayer"](_0x1175f1) {
    return this["cameraHighlight"]["zoomToLayer"](_0x1175f1);
  }
  async ["zoomToEntity"](_0x30205f, _0x273bbb) {
    return this["cameraHighlight"]["zoomToEntity"](_0x30205f, _0x273bbb);
  }
  ["highlightEntity"](_0x1f6e61) {
    this["cameraHighlight"]["highlightEntity"](_0x1f6e61);
  }
  ["clearHighlight"]() {
    this["cameraHighlight"]["clearHighlight"]();
  }
  async ["add"](_0x351180, _0x43d46f) {
    this["assertUniqueId"](_0x43d46f["id"]);
    switch (_0x351180) {
      case "WMS":
        return this["addWMS"](_0x43d46f);
      case "WMTS":
        return this["addWMTS"](_0x43d46f);
      case "WFS":
        return this["addWFS"](_0x43d46f);
      case "WCS":
        return this["addWCS"](_0x43d46f);
      case "GEOTIFF":
        return this["addGeoTiff"](_0x43d46f);
      case "GEOJSON":
      case "KML":
      case "KMZ":
        return this["addLocalKmlGeoJson"](_0x351180, _0x43d46f);
      case "SHP":
        return this["addShp"](_0x43d46f);
      case "CSV":
        return this["addCsv"](_0x43d46f);
      case "XYZ":
        throw new LayerOperationError("LAYER_TYPE_UNSUPPORTED_XYZ", "XYZ katmanı add() ile desteklenmiyor. Map.setBasemap() kullanın.");
      case "DRAWING":
        throw new LayerOperationError("LAYER_TYPE_UNSUPPORTED_DRAWING", '"DRAWING" katmanı add() ile desteklenmiyor -- DrawingManager draw:complete olayı üzerinden Map tarafından otomatik eklenir.');
      case "MEASURE":
        throw new LayerOperationError("LAYER_TYPE_UNSUPPORTED_MEASURE", '"MEASURE" katmanı add() ile desteklenmiyor -- DrawingManager draw:complete olayı üzerinden Map tarafından otomatik eklenir.');
    }
  }
  ["setVisible"](_0x1101a5, _0x23b03a) {
    const _0x1dc68f = this["requireLayer"](_0x1101a5);
    _0x1dc68f["cesiumObject"]["show"] = _0x23b03a, this["emit"]("layer:visibility", { "id": _0x1101a5, "visible": _0x23b03a });
  }
  ["setOpacity"](_0x41b50d, _0x160d79) {
    const _0x41caf2 = Math["max"](0, Math["min"](1, _0x160d79)), _0x3c000f = this["requireLayer"](_0x41b50d);
    _0x3c000f["cesiumObject"] instanceof ImageryLayer ? _0x3c000f["cesiumObject"]["alpha"] = _0x41caf2 : this["setDataSourceOpacity"](_0x3c000f["cesiumObject"], _0x41caf2), this["emit"]("layer:opacity", { "id": _0x41b50d, "opacity": _0x41caf2 });
  }
  ["_move"](_0x378913, _0x577d4c) {
    const _0x17a6bd = this["requireLayer"](_0x378913), _0x49c6fb = _0x17a6bd["cesiumObject"] instanceof ImageryLayer ? this["viewer"]["imageryLayers"] : this["viewer"]["dataSources"], _0x7915c7 = _0x49c6fb["indexOf"](_0x17a6bd["cesiumObject"]);
    _0x49c6fb[_0x577d4c](_0x17a6bd["cesiumObject"]);
    const _0x1a90e7 = _0x49c6fb["indexOf"](_0x17a6bd["cesiumObject"]);
    this["reindexLayerOrder"](), this["emit"]("layer:reorder", { "id": _0x378913, "oldIndex": _0x7915c7, "newIndex": _0x1a90e7, "layer": _0x17a6bd });
  }
  ["raise"](_0x3270d7) {
    this["_move"](_0x3270d7, "raise");
  }
  ["lower"](_0x2acbd8) {
    this["_move"](_0x2acbd8, "lower");
  }
  ["raiseToTop"](_0x165628) {
    this["_move"](_0x165628, "raiseToTop");
  }
  ["lowerToBottom"](_0x3978fa) {
    this["_move"](_0x3978fa, "lowerToBottom");
  }
  ["reorder"](_0x40bcc7) {
    const _0x89e8bb = _0x40bcc7[0], _0x525ab2 = _0x89e8bb !== void 0 ? this["items"]["get"](_0x89e8bb) : void 0, _0x1de237 = (_0x525ab2 == null ? void 0 : _0x525ab2["cesiumObject"]) instanceof ImageryLayer, _0x352910 = _0x525ab2 ? _0x1de237 ? this["viewer"]["imageryLayers"]["indexOf"](_0x525ab2["cesiumObject"]) : this["viewer"]["dataSources"]["indexOf"](_0x525ab2["cesiumObject"]) : -1, _0xeef61 = [], _0x355c09 = [];
    for (const _0x34ac84 of _0x40bcc7) {
      const _0x2083f5 = this["items"]["get"](_0x34ac84);
      if (_0x2083f5 === void 0) continue;
      _0x2083f5["cesiumObject"] instanceof ImageryLayer ? _0xeef61["push"](_0x34ac84) : _0x355c09["push"](_0x34ac84);
    }
    for (let _0x45e12c = _0xeef61["length"] - 1; _0x45e12c >= 0; _0x45e12c--) {
      const _0x1bcb33 = this["items"]["get"](_0xeef61[_0x45e12c]);
      (_0x1bcb33 == null ? void 0 : _0x1bcb33["cesiumObject"]) instanceof ImageryLayer && this["viewer"]["imageryLayers"]["raiseToTop"](_0x1bcb33["cesiumObject"]);
    }
    for (let _0x54f44f = _0x355c09["length"] - 1; _0x54f44f >= 0; _0x54f44f--) {
      const _0x1edf3f = this["items"]["get"](_0x355c09[_0x54f44f]);
      _0x1edf3f !== void 0 && !(_0x1edf3f["cesiumObject"] instanceof ImageryLayer) && this["viewer"]["dataSources"]["raiseToTop"](_0x1edf3f["cesiumObject"]);
    }
    this["reindexLayerOrder"]();
    if (_0x525ab2 !== void 0 && _0x89e8bb !== void 0) {
      const _0x52f8bd = _0x1de237 ? this["viewer"]["imageryLayers"]["indexOf"](_0x525ab2["cesiumObject"]) : this["viewer"]["dataSources"]["indexOf"](_0x525ab2["cesiumObject"]);
      this["emit"]("layer:reorder", { "id": _0x89e8bb, "oldIndex": _0x352910, "newIndex": _0x52f8bd, "layer": _0x525ab2 });
    }
  }
  ["removeLayer"](_0x32cb3f) {
    const _0x41dd82 = this["requireLayer"](_0x32cb3f);
    _0x41dd82["cesiumObject"] instanceof ImageryLayer ? this["viewer"]["imageryLayers"]["remove"](_0x41dd82["cesiumObject"], !![]) : void this["viewer"]["dataSources"]["remove"](_0x41dd82["cesiumObject"], !![]), this["items"]["delete"](_0x32cb3f), this["analysisResultIds"]["delete"](_0x32cb3f), this["ogcLayerFactory"]["deleteServiceOptions"](_0x32cb3f), this["styleEngine"]["deleteStyle"](_0x32cb3f), this["shapeLayerBridge"]["deleteCounter"](_0x32cb3f), this["emit"]("layer:remove", { "layer": _0x41dd82 });
  }
  ["addWMS"](_0x5ceb4c) {
    return this["ogcLayerFactory"]["addWMS"](_0x5ceb4c);
  }
  ["addWMTS"](_0x132878) {
    return this["ogcLayerFactory"]["addWMTS"](_0x132878);
  }
  async ["getWmsAvailableStyles"](_0x96c678) {
    return this["ogcLayerFactory"]["getWmsAvailableStyles"](_0x96c678);
  }
  async ["setWmsStyle"](_0x39dc92, _0xb6a536) {
    return this["ogcLayerFactory"]["setWmsStyle"](_0x39dc92, _0xb6a536);
  }
  ["getWmsLegendGraphicUrl"](_0x1969f9, _0x2b7c15) {
    return this["ogcLayerFactory"]["getWmsLegendGraphicUrl"](_0x1969f9, _0x2b7c15);
  }
  async ["getWmtsAvailableStyles"](_0x2602b3) {
    return this["ogcLayerFactory"]["getWmtsAvailableStyles"](_0x2602b3);
  }
  async ["setWmtsStyle"](_0x3ffc93, _0x199758) {
    return this["ogcLayerFactory"]["setWmtsStyle"](_0x3ffc93, _0x199758);
  }
  ["addWFS"](_0x1ae7a3) {
    return this["ogcLayerFactory"]["addWFS"]({ ..._0x1ae7a3, "clampToGround": _0x1ae7a3["clampToGround"] ?? !![] });
  }
  ["addWCS"](_0x1c6019) {
    return this["ogcLayerFactory"]["addWCS"](_0x1c6019);
  }
  ["addGeoTiff"](_0x56d145) {
    return this["ogcLayerFactory"]["addGeoTiff"](_0x56d145);
  }
  ["addLocalKmlGeoJson"](_0x1bba96, _0x158cd0) {
    return this["localSourceLoader"]["addLocalKmlGeoJson"](_0x1bba96, _0x158cd0);
  }
  ["addShp"](_0x3dd524) {
    return this["localSourceLoader"]["addShp"](_0x3dd524);
  }
  ["addCsv"](_0x3ff91e) {
    return this["localSourceLoader"]["addCsv"](_0x3ff91e);
  }
  ["_addBasemapImageryLayer"](_0x52fe7f, _0xca559d, _0x383565) {
    return this["register"](_0x52fe7f, _0xca559d, "XYZ", _0x383565, !![]);
  }
  ["_removeBasemapLayers"]() {
    for (const _0x3a339c of this["items"]["values"]()) {
      _0x3a339c["isBasemap"] && _0x3a339c["cesiumObject"] instanceof ImageryLayer && (this["viewer"]["imageryLayers"]["remove"](_0x3a339c["cesiumObject"], !![]), this["items"]["delete"](_0x3a339c["id"]));
    }
  }
  ["_addDrawnShape"](_0x27feeb, _0x3c304a, _0x51ad11) {
    return this["shapeLayerBridge"]["addDrawnShape"](_0x27feeb, _0x3c304a, _0x51ad11);
  }
  ["_addMeasuredShape"](_0x1812cf, _0x316064, _0x5adac2) {
    return this["shapeLayerBridge"]["addMeasuredShape"](_0x1812cf, _0x316064, _0x5adac2);
  }
  ["_removeDrawnShape"](_0x24b63b, _0xcab927) {
    this["shapeLayerBridge"]["removeDrawnShape"](_0x24b63b, _0xcab927);
  }
  ["register"](_0x3dbdf8, _0x5ce46f, _0x21b0e6, _0x3db5c3, _0x2273e0, _0x558948) {
    "entities" in _0x3db5c3 && this["tagEntities"](_0x3db5c3, _0x3dbdf8);
    const _0x84aac1 = Object["freeze"]({ "id": _0x3dbdf8, "title": _0x5ce46f, "layerType": _0x21b0e6, "cesiumObject": _0x3db5c3, "isBasemap": _0x2273e0, ..._0x558948 !== void 0 ? { "initialFillColor": _0x558948 } : {} });
    return this["items"]["set"](_0x3dbdf8, _0x84aac1), this["emit"]("layer:add", { "layer": _0x84aac1 }), _0x84aac1;
  }
  ["emitCrsCheckResult"](_0x50c543, _0x364ba6) {
    if (!_0x364ba6) return;
    switch (_0x364ba6["kind"]) {
      case "reprojected":
        this["emit"]("layer:crs-reprojected", { "id": _0x50c543, "fromEpsg": _0x364ba6["fromEpsg"], "toEpsg": "EPSG:4326" });
        break;
      case "suspicious-unresolved-crs":
        this["emit"]("layer:crs-unresolved", { "id": _0x50c543, "crsName": _0x364ba6["crsName"] });
        break;
    }
  }
  ["tagEntities"](_0x12155e, _0x18fa92) {
    _0x12155e["entities"]["suspendEvents"]();
    for (const _0x5bb165 of _0x12155e["entities"]["values"]) {
      _0x5bb165["properties"] === void 0 && (_0x5bb165["properties"] = new PropertyBag()), !_0x5bb165["properties"]["hasProperty"]("layerId") && _0x5bb165["properties"]["addProperty"]("layerId", _0x18fa92), !_0x5bb165["properties"]["hasProperty"]("featureId") && _0x5bb165["properties"]["addProperty"]("featureId", _0x5bb165["id"]);
    }
    _0x12155e["entities"]["resumeEvents"]();
  }
  ["reindexLayerOrder"]() {
    const _0x1b0f28 = /* @__PURE__ */ new Map();
    for (let _0x1b918a = 0; _0x1b918a < this["viewer"]["imageryLayers"]["length"]; _0x1b918a++) {
      _0x1b0f28["set"](this["viewer"]["imageryLayers"]["get"](_0x1b918a), _0x1b918a);
    }
    const _0xfb97b0 = /* @__PURE__ */ new Map();
    for (let _0x7756b5 = 0; _0x7756b5 < this["viewer"]["dataSources"]["length"]; _0x7756b5++) {
      _0xfb97b0["set"](this["viewer"]["dataSources"]["get"](_0x7756b5), _0x7756b5);
    }
    const _0x53ae10 = (_0x26bf15) => (_0x26bf15["cesiumObject"] instanceof ImageryLayer ? _0x1b0f28["get"](_0x26bf15["cesiumObject"]) : _0xfb97b0["get"](_0x26bf15["cesiumObject"])) ?? Number["POSITIVE_INFINITY"], _0x3b54ac = Array["from"](this["items"]["entries"]()), _0x1cb1ff = _0x3b54ac["filter"](([, _0x2087d9]) => _0x2087d9["cesiumObject"] instanceof ImageryLayer)["sort"](([, _0x36af24], [, _0x21b19c]) => _0x53ae10(_0x36af24) - _0x53ae10(_0x21b19c)), _0xbf5020 = _0x3b54ac["filter"](([, _0xea5831]) => !(_0xea5831["cesiumObject"] instanceof ImageryLayer))["sort"](([, _0x53ed8c], [, _0x1278d8]) => _0x53ae10(_0x53ed8c) - _0x53ae10(_0x1278d8));
    let _0x5efab5 = 0, _0x239a11 = 0;
    const _0x12aa4e = _0x3b54ac["map"](([, _0x3919e8]) => _0x3919e8["cesiumObject"] instanceof ImageryLayer ? _0x1cb1ff[_0x5efab5++] : _0xbf5020[_0x239a11++]);
    this["items"]["clear"]();
    for (const [_0x175337, _0x361271] of _0x12aa4e) this["items"]["set"](_0x175337, _0x361271);
  }
  ["requireLayer"](_0x1a2d98) {
    const _0x2ad98c = this["items"]["get"](_0x1a2d98);
    if (_0x2ad98c === void 0) throw new LayerOperationError("LAYER_NOT_FOUND", 'Katman bulunamadı: "' + _0x1a2d98 + '"');
    return _0x2ad98c;
  }
  ["assertUniqueId"](_0x561b94) {
    if (this["items"]["has"](_0x561b94)) throw new LayerOperationError("LAYER_ID_ALREADY_EXISTS", '"' + _0x561b94 + `" id'li katman zaten eklenmiş.`);
  }
  async ["getCapabilitiesDocument"](_0x5ec75f, _0x3b9ee2, _0x842984, _0x329456) {
    return this["ogcLayerFactory"]["getCapabilitiesDocument"](_0x5ec75f, _0x3b9ee2, _0x842984, _0x329456);
  }
  async ["getWcsCoverageExtents"](_0x52b32e, _0x51b5c4, _0x54c29c) {
    return this["ogcLayerFactory"]["getWcsCoverageExtents"](_0x52b32e, _0x51b5c4, _0x54c29c);
  }
  ["waitForRenderSettle"](_0x29a243 = 60) {
    return new Promise((_0x599178) => {
      let _0x44c530 = _0x29a243;
      const _0x2678ac = () => {
        _0x44c530 -= 1, _0x44c530 <= 0 && (this["viewer"]["scene"]["postRender"]["removeEventListener"](_0x2678ac), _0x599178());
      };
      this["viewer"]["scene"]["postRender"]["addEventListener"](_0x2678ac);
    });
  }
  ["isOutlineCompanion"](_0x27175a) {
    return this["outlineGeometry"]["isOutlineCompanion"](_0x27175a);
  }
  ["hasOutlineCompanion"](_0xcb6229) {
    return this["outlineGeometry"]["hasOutlineCompanion"](_0xcb6229);
  }
  ["hasRiskyOutline"](_0x417ee4) {
    return this["outlineGeometry"]["hasRiskyOutline"](_0x417ee4);
  }
  ["addPolygonOutlines"](_0x4fb3eb, _0x94fbe0, _0x25f103) {
    this["outlineGeometry"]["addPolygonOutlines"](_0x4fb3eb, _0x94fbe0, _0x25f103);
    for (const _0xd61431 of _0x4fb3eb["entities"]["values"]) {
      this["outlineGeometry"]["hasOutlineCompanion"](_0xd61431) && this["opacityController"]["ensureDynamicFillColor"](_0x4fb3eb, _0xd61431);
    }
  }
  ["addPolygonOutlineCompanion"](_0x491411, _0x315eec, _0x47bde2, _0x55be3c, _0x65a4b0) {
    this["outlineGeometry"]["addPolygonOutlineCompanion"](_0x491411, _0x315eec, _0x47bde2, _0x55be3c, _0x65a4b0), this["outlineGeometry"]["hasOutlineCompanion"](_0x315eec) && this["opacityController"]["ensureDynamicFillColor"](_0x491411, _0x315eec);
  }
  ["readProperty"](_0x40858f, _0x1143ee, _0x3db85f) {
    return this["styleEngine"]["readProperty"](_0x40858f, _0x1143ee, _0x3db85f);
  }
  ["applyEntityStyle"](_0x56c8e5, _0x5124a2, _0x8d639e, _0x1569ab) {
    this["styleEngine"]["applyEntityStyle"](_0x56c8e5, _0x5124a2, _0x8d639e, _0x1569ab);
  }
  ["setDataSourceOpacity"](_0x4c0044, _0x2c94de) {
    this["opacityController"]["setDataSourceOpacity"](_0x4c0044, _0x2c94de);
  }
  ["destroy"]() {
    this["removeAllListeners"](), this["items"]["clear"]();
  }
};
_LayerManager["DEFAULT_OUTLINE_COLOR_HEX"] = "#1a73e8";
_LayerManager["DEFAULT_OUTLINE_COLOR"] = Color["fromCssColorString"](_LayerManager["DEFAULT_OUTLINE_COLOR_HEX"]);
let LayerManager = _LayerManager;
const FLAG = "__tucbsSelectionHighlight";
function isSelectionHighlightEntity(_0x2d00d2) {
  return _0x2d00d2[FLAG] === !![];
}
class SelectionHighlight {
  constructor(_0x31131c) {
    this["viewer"] = _0x31131c, this["source"] = null, this["generation"] = 0;
  }
  ["show"](_0x798da3) {
    const _0x25456c = ++this["generation"];
    if (_0x798da3["length"] === 0) {
      this["removeSource"]();
      return;
    }
    void this["load"](_0x798da3, _0x25456c);
  }
  ["clear"]() {
    this["generation"]++, this["removeSource"]();
  }
  async ["load"](_0x17f608, _0x50ef95) {
    const _0x5880c9 = Color["fromCssColorString"]("#dc2626")["withAlpha"](0.25), _0x47637a = Color["fromCssColorString"]("#dc2626"), _0x504733 = { "type": "FeatureCollection", "features": [..._0x17f608] }, _0x37d890 = await GeoJsonDataSource["load"](_0x504733, { "clampToGround": !![], "fill": _0x5880c9, "stroke": _0x47637a, "strokeWidth": 3, "markerColor": _0x47637a, "markerSize": 16 });
    if (_0x50ef95 !== this["generation"]) return;
    this["removeSource"](), this["paint"](_0x37d890, _0x5880c9, _0x47637a), this["viewer"]["dataSources"]["add"](_0x37d890), this["source"] = _0x37d890;
  }
  ["paint"](_0x3c9bbc, _0x2cebca, _0x170f4a) {
    var _a2;
    for (const _0xa7135d of [..._0x3c9bbc["entities"]["values"]]) {
      this["tag"](_0xa7135d);
      _0xa7135d["billboard"] && (_0xa7135d["billboard"] = void 0, _0xa7135d["point"] = new PointGraphics({ "pixelSize": 16, "color": _0x170f4a, "outlineColor": Color["WHITE"], "outlineWidth": 2, "heightReference": HeightReference["CLAMP_TO_GROUND"], "disableDepthTestDistance": Number["POSITIVE_INFINITY"] }));
      const _0x5f3f46 = _0xa7135d["polygon"];
      if (!_0x5f3f46) continue;
      _0x5f3f46["material"] = new ColorMaterialProperty(_0x2cebca), _0x5f3f46["outline"] = new ConstantProperty(![]);
      const _0x54c17e = (_a2 = _0x5f3f46["hierarchy"]) == null ? void 0 : _a2["getValue"](JulianDate["now"]());
      this["addRings"](_0x3c9bbc, _0x54c17e, _0x170f4a);
    }
  }
  ["addRings"](_0x33328f, _0x500452, _0x99aba8) {
    var _a2;
    if (!((_a2 = _0x500452 == null ? void 0 : _0x500452["positions"]) == null ? void 0 : _a2["length"])) return;
    this["addRing"](_0x33328f, _0x500452["positions"], _0x99aba8);
    for (const _0x42e3fe of _0x500452["holes"] ?? []) this["addRings"](_0x33328f, _0x42e3fe, _0x99aba8);
  }
  ["addRing"](_0x5eac41, _0x251438, _0x5a3aa7) {
    const _0x37e070 = _0x5eac41["entities"]["add"]({ "polyline": { "positions": _0x251438, "width": 3, "material": new ColorMaterialProperty(_0x5a3aa7), "clampToGround": !![] } });
    this["tag"](_0x37e070);
  }
  ["tag"](_0x22aa94) {
    _0x22aa94[FLAG] = !![];
  }
  ["removeSource"]() {
    if (!this["source"]) return;
    this["viewer"]["dataSources"]["remove"](this["source"], !![]), this["source"] = null;
  }
}
const DRILL_PICK_LIMIT = 32;
function boundingBoxFromPoints(_0x553b5a) {
  if (_0x553b5a["length"] === 0) return void 0;
  let _0x1d9614 = Infinity, _0x5418a9 = Infinity, _0x3ff2ad = -Infinity, _0x1f70f2 = -Infinity;
  for (const [_0x1a6b8d, _0x1786f9] of _0x553b5a) {
    if (_0x1a6b8d < _0x1d9614) _0x1d9614 = _0x1a6b8d;
    if (_0x1a6b8d > _0x3ff2ad) _0x3ff2ad = _0x1a6b8d;
    if (_0x1786f9 < _0x5418a9) _0x5418a9 = _0x1786f9;
    if (_0x1786f9 > _0x1f70f2) _0x1f70f2 = _0x1786f9;
  }
  if (_0x1d9614 === _0x3ff2ad && _0x5418a9 === _0x1f70f2) return { "kind": "point", "longitude": _0x1d9614, "latitude": _0x5418a9 };
  return { "kind": "extent", "west": _0x1d9614, "south": _0x5418a9, "east": _0x3ff2ad, "north": _0x1f70f2 };
}
function flattenGeoJsonCoordinates(_0x2350b8, _0x347268) {
  if (!Array["isArray"](_0x2350b8) || _0x2350b8["length"] === 0) return;
  if (typeof _0x2350b8[0] === "number") {
    const [_0x590b2b, _0x29f0fc] = _0x2350b8;
    if (typeof _0x590b2b === "number" && typeof _0x29f0fc === "number") _0x347268["push"]([_0x590b2b, _0x29f0fc]);
    return;
  }
  for (const _0x76154a of _0x2350b8) flattenGeoJsonCoordinates(_0x76154a, _0x347268);
}
function extractGeoJsonExtent(_0x293c6f) {
  if (_0x293c6f === null || typeof _0x293c6f !== "object") return void 0;
  const _0x22dcbd = _0x293c6f, _0x328b52 = _0x22dcbd["type"] === "FeatureCollection" && Array["isArray"](_0x22dcbd["features"]) ? _0x22dcbd["features"]["map"]((_0x1f9246) => _0x1f9246 == null ? void 0 : _0x1f9246["geometry"])["filter"]((_0x173882) => _0x173882 !== void 0 && _0x173882 !== null) : _0x22dcbd["geometry"] ? [_0x22dcbd["geometry"]] : [];
  if (_0x328b52["length"] === 0) return void 0;
  const _0x164dee = [];
  for (const _0x7d05d9 of _0x328b52) {
    const _0x1f94d3 = _0x7d05d9;
    if (_0x1f94d3["type"] === "GeometryCollection" && Array["isArray"](_0x1f94d3["geometries"])) for (const _0x354954 of _0x1f94d3["geometries"]) {
      flattenGeoJsonCoordinates(_0x354954 == null ? void 0 : _0x354954["coordinates"], _0x164dee);
    }
    else flattenGeoJsonCoordinates(_0x1f94d3["coordinates"], _0x164dee);
  }
  return boundingBoxFromPoints(_0x164dee);
}
function collectGmlCoordinates(_0x19fff3, _0x4d8c66) {
  var _a2, _b;
  for (const _0x1f4721 of Array["from"](_0x19fff3["getElementsByTagNameNS"]("*", "coordinates"))) {
    const _0x416a50 = (_a2 = _0x1f4721["textContent"]) == null ? void 0 : _a2["trim"]();
    if (!_0x416a50) continue;
    for (const _0x8e6b82 of _0x416a50["split"](/\s+/)) {
      const [_0x1094b7, _0x26fed2] = _0x8e6b82["split"](","), _0x5a53c6 = Number(_0x1094b7), _0x1145f6 = Number(_0x26fed2);
      if (Number["isFinite"](_0x5a53c6) && Number["isFinite"](_0x1145f6)) _0x4d8c66["push"]([_0x5a53c6, _0x1145f6]);
    }
  }
  for (const _0x8e8618 of ["pos", "posList"]) {
    for (const _0x4d4a54 of Array["from"](_0x19fff3["getElementsByTagNameNS"]("*", _0x8e8618))) {
      const _0x44b506 = (((_b = _0x4d4a54["textContent"]) == null ? void 0 : _b["trim"]()) ?? "")["split"](/\s+/)["map"](Number);
      for (let _0x12c873 = 0; _0x12c873 + 1 < _0x44b506["length"]; _0x12c873 += 2) {
        const _0x55cf74 = _0x44b506[_0x12c873], _0xe70eee = _0x44b506[_0x12c873 + 1];
        if (Number["isFinite"](_0x55cf74) && Number["isFinite"](_0xe70eee)) _0x4d8c66["push"]([_0x55cf74, _0xe70eee]);
      }
    }
  }
}
function extractGmlExtent(_0x3b7cb3) {
  if (!(_0x3b7cb3 instanceof Element)) return void 0;
  const _0x283ede = [];
  return collectGmlCoordinates(_0x3b7cb3, _0x283ede), boundingBoxFromPoints(_0x283ede);
}
function extractImageryGeometry(_0x32cf1d) {
  return extractGeoJsonExtent(_0x32cf1d) ?? extractGmlExtent(_0x32cf1d);
}
class InteractionManager extends EventEmitter {
  constructor(_0x4d3635) {
    super(), this["unsubscribers"] = [], this["suspended"] = ![], this["identifySuspended"] = ![], this["hoverEnabled"] = ![], this["pickGeneration"] = 0, this["viewer"] = _0x4d3635, this["handler"] = new ScreenSpaceEventHandler(_0x4d3635["scene"]["canvas"]), this["bindMouseEvents"](), this["bindCameraEvents"](), this["bindSceneEvents"]();
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
  ["enableHover"](_0xa759a8) {
    this["hoverEnabled"] = _0xa759a8, !_0xa759a8 && (this["hoveredEntity"] = void 0);
  }
  ["isHoverEnabled"]() {
    return this["hoverEnabled"];
  }
  ["flyToPosition"](_0xa0cc7f, _0x157ae4, _0x48b509) {
    const _0x57623b = (_0x48b509 == null ? void 0 : _0x48b509["height"]) ?? 1e3;
    this["viewer"]["camera"]["flyTo"]({ "destination": Cartesian3["fromDegrees"](_0xa0cc7f, _0x157ae4, _0x57623b), "orientation": { "pitch": _0x584e42["toRadians"](-90) }, ...(_0x48b509 == null ? void 0 : _0x48b509["duration"]) !== void 0 ? { "duration": _0x48b509["duration"] } : {} });
  }
  ["flyToExtent"](_0x21412e, _0x17f797, _0x4b1624, _0x486bf4, _0x5bf84b) {
    this["viewer"]["camera"]["flyTo"]({ "destination": Rectangle["fromDegrees"](_0x21412e, _0x17f797, _0x4b1624, _0x486bf4), "orientation": { "pitch": _0x584e42["toRadians"](-90) }, ...(_0x5bf84b == null ? void 0 : _0x5bf84b["duration"]) !== void 0 ? { "duration": _0x5bf84b["duration"] } : {} });
  }
  ["destroy"]() {
    !this["handler"]["isDestroyed"]() && this["handler"]["destroy"]();
    for (const _0x492e13 of this["unsubscribers"]) {
      _0x492e13();
    }
    this["unsubscribers"]["length"] = 0, this["removeAllListeners"]();
  }
  ["bindMouseEvents"]() {
    this["handler"]["setInputAction"]((_0xac70aa) => this["dispatchPick"](_0xac70aa["position"], "entity:click", "map:click", "imagery:click"), ScreenSpaceEventType["LEFT_CLICK"]), this["handler"]["setInputAction"]((_0x256a43) => this["dispatchPick"](_0x256a43["position"], "entity:dblclick", "map:dblclick", "imagery:dblclick"), ScreenSpaceEventType["LEFT_DOUBLE_CLICK"]), this["handler"]["setInputAction"]((_0x2c62e3) => this["dispatchPick"](_0x2c62e3["position"], "entity:rightclick", "map:rightclick", "imagery:rightclick"), ScreenSpaceEventType["RIGHT_CLICK"]), this["handler"]["setInputAction"]((_0x3c1957) => this["dispatchEntityOnly"](_0x3c1957["position"], "entity:mousedown"), ScreenSpaceEventType["LEFT_DOWN"]), this["handler"]["setInputAction"]((_0x54e7e5) => this["dispatchEntityOnly"](_0x54e7e5["position"], "entity:mouseup"), ScreenSpaceEventType["LEFT_UP"]), this["handler"]["setInputAction"]((_0x135c53) => this["handleMouseMove"](_0x135c53["endPosition"]), ScreenSpaceEventType["MOUSE_MOVE"]), this["handler"]["setInputAction"]((_0xfa6808) => this["emit"]("map:wheel", { "delta": _0xfa6808 }), ScreenSpaceEventType["WHEEL"]), this["handler"]["setInputAction"]((_0xab4601) => this["emit"]("map:pinchstart", this["buildMapDetail"](_0xab4601["position1"])), ScreenSpaceEventType["PINCH_START"]), this["handler"]["setInputAction"](() => this["emit"]("map:pinchend", {}), ScreenSpaceEventType["PINCH_END"]), this["handler"]["setInputAction"]((_0x2b8f1b) => {
      const _0x1084c5 = Math["atan2"](_0x2b8f1b["position2"]["y"] - _0x2b8f1b["position1"]["y"], _0x2b8f1b["position2"]["x"] - _0x2b8f1b["position1"]["x"]);
      this["emit"]("map:pinchmove", { ...this["buildMapDetail"](_0x2b8f1b["position1"]), "angle": _0x1084c5 });
    }, ScreenSpaceEventType["PINCH_MOVE"]);
  }
  ["handleMouseMove"](_0x5bf784) {
    this["emit"]("map:mousemove", this["buildMapDetail"](_0x5bf784));
    if (!this["hoverEnabled"] || this["suspended"]) return;
    const _0x1275e8 = this["pickSelectableEntity"](_0x5bf784);
    if (_0x1275e8 === this["hoveredEntity"]) return;
    this["hoveredEntity"] !== void 0 && this["emit"]("entity:mouseleave", this["buildEntityDetail"](this["hoveredEntity"], _0x5bf784)), this["hoveredEntity"] = _0x1275e8, _0x1275e8 !== void 0 && this["emit"]("entity:mouseenter", this["buildEntityDetail"](_0x1275e8, _0x5bf784));
  }
  ["dispatchPick"](_0x385c95, _0x259131, _0x4b684f, _0x200356) {
    if (this["suspended"]) return;
    this["pickGeneration"]++;
    const _0x4c2c1b = this["pickSelectableEntity"](_0x385c95);
    _0x4c2c1b ? this["emit"](_0x259131, this["buildEntityDetail"](_0x4c2c1b, _0x385c95)) : this["emit"](_0x4b684f, this["buildMapDetail"](_0x385c95)), this["pickImageryFeatures"](_0x385c95, _0x200356);
  }
  ["pickSelectableEntity"](_0x189b78) {
    const _0x4b5b08 = this["scene"]["drillPick"](_0x189b78, DRILL_PICK_LIMIT);
    for (const _0x3e008f of _0x4b5b08) {
      const _0x18550b = _0x3e008f == null ? void 0 : _0x3e008f["id"];
      if (!(_0x18550b instanceof Entity)) continue;
      if (isSelectionHighlightEntity(_0x18550b)) continue;
      return _0x18550b;
    }
    return void 0;
  }
  ["pickImageryFeatures"](_0x3ec959, _0x216ddb) {
    const _0x4557f7 = this["pickGeneration"], _0x309b11 = this["camera"]["getPickRay"](_0x3ec959);
    if (!_0x309b11) return;
    const _0x2edd25 = this["viewer"]["imageryLayers"]["pickImageryLayerFeatures"](_0x309b11, this["scene"]);
    if (!_0x2edd25) return;
    this["emit"]("imagery:querying", this["buildMapDetail"](_0x3ec959));
    const _0x3b85c7 = (_0xddcbb1) => {
      if (this["suspended"] || _0x4557f7 !== this["pickGeneration"]) return;
      this["emit"](_0x216ddb, this["buildImageryDetail"](_0xddcbb1, _0x3ec959));
    };
    _0x2edd25["then"](_0x3b85c7)["catch"](() => {
      _0x3b85c7([]);
    });
  }
  ["buildImageryDetail"](_0x5d78fe, _0x309341) {
    const _0x4bcf85 = _0x5d78fe["map"]((_0x48cd6f) => ({ "imageryLayer": _0x48cd6f["imageryLayer"], "name": _0x48cd6f["name"] ?? null, "properties": _0x48cd6f["properties"] ?? {}, "description": _0x48cd6f["description"] ?? null, "geometryHint": extractImageryGeometry(_0x48cd6f["data"]) }));
    return { "position": this["toLonLat"](_0x309341), "screenPos": { "x": _0x309341["x"], "y": _0x309341["y"] }, "features": _0x4bcf85 };
  }
  ["dispatchEntityOnly"](_0x47569e, _0x1adfaa) {
    if (this["suspended"]) return;
    const _0x2499f3 = this["scene"]["pick"](_0x47569e);
    (_0x2499f3 == null ? void 0 : _0x2499f3["id"]) instanceof Entity && this["emit"](_0x1adfaa, this["buildEntityDetail"](_0x2499f3["id"], _0x47569e));
  }
  ["bindCameraEvents"]() {
    this["unsubscribers"]["push"](this["camera"]["moveStart"]["addEventListener"](() => this["emit"]("camera:moveStart", {})), this["camera"]["moveEnd"]["addEventListener"](() => this["emit"]("camera:moveEnd", {})), this["camera"]["changed"]["addEventListener"]((_0x3ca910) => this["emit"]("camera:changed", { "percentage": _0x3ca910 })));
  }
  ["bindSceneEvents"]() {
    this["unsubscribers"]["push"](this["scene"]["preRender"]["addEventListener"]((_0x413281, _0x2eb9dd) => this["emit"]("scene:preRender", { "time": _0x2eb9dd })), this["scene"]["postRender"]["addEventListener"]((_0x254d22, _0x44c8d4) => this["emit"]("scene:postRender", { "time": _0x44c8d4 })), this["scene"]["morphStart"]["addEventListener"](() => this["emit"]("scene:morphStart", {})), this["scene"]["morphComplete"]["addEventListener"](() => this["emit"]("scene:morphComplete", {})));
  }
  ["buildMapDetail"](_0xa20792) {
    return { "position": this["toLonLat"](_0xa20792), "screenPos": { "x": _0xa20792["x"], "y": _0xa20792["y"] } };
  }
  ["buildEntityDetail"](_0x54d966, _0x321e79) {
    return { ...this["resolveFeature"](_0x54d966), "position": this["toLonLat"](_0x321e79), "screenPos": { "x": _0x321e79["x"], "y": _0x321e79["y"] }, "features": this["pickAllFeatures"](_0x321e79, _0x54d966) };
  }
  ["resolveFeature"](_0xcf3c7f) {
    var _a2, _b;
    const _0x564f5a = JulianDate["now"](), _0x290bdb = ((_a2 = _0xcf3c7f["properties"]) == null ? void 0 : _a2["getValue"](_0x564f5a)) ?? {}, _0x3f9e91 = _0x290bdb["__tucbsOutlineOf"];
    if (typeof _0x3f9e91 === "string") {
      const _0x3048ac = (_b = _0xcf3c7f["entityCollection"]) == null ? void 0 : _b["getById"](_0x3f9e91);
      if (_0x3048ac && _0x3048ac !== _0xcf3c7f) return this["resolveFeature"](_0x3048ac);
    }
    const _0x241f5a = typeof _0x290bdb["layerId"] === "string" ? _0x290bdb["layerId"] : null, _0x3dad5c = typeof _0x290bdb["featureId"] === "string" ? _0x290bdb["featureId"] : null;
    if ("__tucbsOutlineOf" in _0x290bdb) {
      const { __tucbsOutlineOf: _0x2e5000, ..._0x2e0eff } = _0x290bdb;
      return { "entity": _0xcf3c7f, "layerId": _0x241f5a, "featureId": _0x3dad5c, "properties": _0x2e0eff };
    }
    return { "entity": _0xcf3c7f, "layerId": _0x241f5a, "featureId": _0x3dad5c, "properties": _0x290bdb };
  }
  ["pickAllFeatures"](_0x490241, _0x1331c0) {
    const _0x46c69e = this["resolveFeature"](_0x1331c0), _0x5d83ca = [_0x46c69e], _0x479974 = /* @__PURE__ */ new Set([_0x46c69e["entity"]]), _0x381872 = this["scene"]["drillPick"](_0x490241, DRILL_PICK_LIMIT);
    for (const _0x305978 of _0x381872) {
      const _0x237875 = _0x305978 == null ? void 0 : _0x305978["id"];
      if (!(_0x237875 instanceof Entity)) continue;
      const _0x571862 = this["resolveFeature"](_0x237875);
      if (_0x479974["has"](_0x571862["entity"])) continue;
      _0x479974["add"](_0x571862["entity"]), _0x5d83ca["push"](_0x571862);
    }
    return _0x5d83ca;
  }
  ["toLonLat"](_0x12aba8) {
    const _0x2b054e = this["camera"]["pickEllipsoid"](_0x12aba8, this["scene"]["globe"]["ellipsoid"]);
    if (_0x2b054e === void 0) return [0, 0];
    const _0x31e93c = Cartographic["fromCartesian"](_0x2b054e);
    return [_0x584e42["toDegrees"](_0x31e93c["longitude"]), _0x584e42["toDegrees"](_0x31e93c["latitude"])];
  }
}
const EARTH_RADIUS_METERS = 6378137, CIRCLE_SEGMENTS = 48;
function dedupePositions(_0x483e72) {
  return _0x483e72["filter"]((_0x474bb5, _0x4a7029) => _0x4a7029 === 0 || !Cartesian3["equalsEpsilon"](_0x474bb5, _0x483e72[_0x4a7029 - 1], _0x584e42["EPSILON7"]));
}
class DrawingManager extends EventEmitter {
  constructor(_0x40a446, _0x3e96a2) {
    super(), this["shapes"] = /* @__PURE__ */ new Map(), this["positions"] = [], this["tempVertexEntities"] = [], this["freehandDragging"] = ![], this["onEscapeKey"] = (_0xc080b2) => {
      if (_0xc080b2["key"] !== "Escape") return;
      this["abortCurrentShape"]();
    }, this["viewer"] = _0x40a446, this["interactionManager"] = _0x3e96a2, this["handler"] = new ScreenSpaceEventHandler(_0x40a446["scene"]["canvas"]);
  }
  get ["scene"]() {
    return this["viewer"]["scene"];
  }
  ["activate"](_0x325986, _0xa3d86) {
    if (this["activeTool"]) this["deactivate"]();
    this["activeTool"] = _0x325986, this["activeSource"] = _0xa3d86, this["positions"] = [], this["previewPosition"] = void 0, this["interactionManager"]["suspend"](), this["resetTrackedEntity"](), this["suspendBuiltInDoubleClick"]();
    if (_0x325986 === "freehand") this["lockCamera"]();
    this["setCursor"]("crosshair"), this["bindToolHandlers"](_0x325986), this["emit"]("draw:start", _0xa3d86 === void 0 ? { "tool": _0x325986 } : { "tool": _0x325986, "source": _0xa3d86 });
  }
  ["deactivate"]() {
    if (!this["activeTool"]) return;
    const _0x44a6f3 = this["activeTool"], _0xe48110 = this["activeSource"];
    this["finishSession"](), this["emit"]("draw:cancel", _0xe48110 === void 0 ? { "tool": _0x44a6f3 } : { "tool": _0x44a6f3, "source": _0xe48110 });
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
  ["getShapeById"](_0x279f92) {
    return this["shapes"]["get"](_0x279f92);
  }
  ["removeShape"](_0x525174) {
    const _0x164d4c = this["shapes"]["get"](_0x525174);
    if (!_0x164d4c) return;
    this["viewer"]["entities"]["remove"](_0x164d4c["entity"]), this["shapes"]["delete"](_0x525174), this["emit"]("draw:remove", { "id": _0x525174, "shape": _0x164d4c });
  }
  ["clearAll"]() {
    for (const _0x577a35 of [...this["shapes"]["keys"]()]) this["removeShape"](_0x577a35);
  }
  ["undo"]() {
    if (this["positions"]["length"] === 0) return;
    this["positions"]["pop"]();
    const _0x56c13f = this["tempVertexEntities"]["pop"]();
    if (_0x56c13f) this["viewer"]["entities"]["remove"](_0x56c13f);
  }
  ["toGeoJSON"]() {
    return { "type": "FeatureCollection", "features": this["getShapes"]()["map"]((_0x5847d5) => ({ "type": "Feature", "properties": { "id": _0x5847d5["id"], "tool": _0x5847d5["tool"] }, "geometry": _0x5847d5["geometry"] })) };
  }
  ["destroy"]() {
    this["deactivate"](), this["handler"]["destroy"](), this["removeAllListeners"]();
  }
  ["bindToolHandlers"](_0x2a093d) {
    this["handler"]["setInputAction"](() => this["deactivate"](), ScreenSpaceEventType["RIGHT_CLICK"]), document["addEventListener"]("keydown", this["onEscapeKey"]);
    if (_0x2a093d === "freehand") {
      this["handler"]["setInputAction"]((_0x58bb1c) => this["onFreehandDown"](_0x58bb1c["position"]), ScreenSpaceEventType["LEFT_DOWN"]), this["handler"]["setInputAction"](() => this["onFreehandUp"](), ScreenSpaceEventType["LEFT_UP"]), this["handler"]["setInputAction"]((_0x202ca6) => this["onFreehandMove"](_0x202ca6["endPosition"]), ScreenSpaceEventType["MOUSE_MOVE"]);
      return;
    }
    this["handler"]["setInputAction"]((_0x1aa44e) => this["onVertexClick"](_0x1aa44e["position"]), ScreenSpaceEventType["LEFT_CLICK"]), this["handler"]["setInputAction"]((_0x5c71ba) => this["onPreviewMove"](_0x5c71ba["endPosition"]), ScreenSpaceEventType["MOUSE_MOVE"]), (_0x2a093d === "polyline" || _0x2a093d === "polygon") && this["handler"]["setInputAction"](() => this["finishMultiVertexViaDoubleClick"](), ScreenSpaceEventType["LEFT_DOUBLE_CLICK"]);
  }
  ["unbindToolHandlers"]() {
    this["handler"]["removeInputAction"](ScreenSpaceEventType["LEFT_CLICK"]), this["handler"]["removeInputAction"](ScreenSpaceEventType["LEFT_DOWN"]), this["handler"]["removeInputAction"](ScreenSpaceEventType["LEFT_UP"]), this["handler"]["removeInputAction"](ScreenSpaceEventType["MOUSE_MOVE"]), this["handler"]["removeInputAction"](ScreenSpaceEventType["RIGHT_CLICK"]), this["handler"]["removeInputAction"](ScreenSpaceEventType["LEFT_DOUBLE_CLICK"]), document["removeEventListener"]("keydown", this["onEscapeKey"]);
  }
  ["abortCurrentShape"]() {
    if (this["activeTool"] === void 0 || this["positions"]["length"] === 0) return;
    const _0x419624 = this["activeTool"], _0x62e169 = this["activeSource"];
    this["clearTempEntity"](), this["resetSessionForContinuousDrawing"](), this["resetTrackedEntity"](), this["emit"]("draw:abort", _0x62e169 === void 0 ? { "tool": _0x419624 } : { "tool": _0x419624, "source": _0x62e169 });
  }
  ["onVertexClick"](_0x422e6d) {
    const _0x240748 = this["toCartesian"](_0x422e6d);
    if (_0x240748 === void 0 || this["activeTool"] === void 0) return;
    this["positions"]["push"](_0x240748), this["emitVertex"](_0x422e6d), this["ensureTempEntity"]();
    (this["activeTool"] === "polygon" || this["activeTool"] === "polyline") && this["addVertexMarker"](_0x240748);
    if (this["activeTool"] === "point") {
      this["completeShape"]();
      return;
    }
    (this["activeTool"] === "rectangle" || this["activeTool"] === "circle") && this["positions"]["length"] >= 2 && this["completeShape"]();
  }
  ["onPreviewMove"](_0x893035) {
    if (this["positions"]["length"] === 0 || this["activeTool"] === void 0) return;
    const _0x3d86aa = this["toCartesian"](_0x893035);
    if (_0x3d86aa === void 0) return;
    this["previewPosition"] = _0x3d86aa, this["emit"]("draw:move", { "tool": this["activeTool"], "coordinates": this["toLonLat"](_0x3d86aa), "screenPos": { "x": _0x893035["x"], "y": _0x893035["y"] } });
  }
  ["finishMultiVertex"]() {
    const _0x20ae7e = this["activeTool"] === "polygon" ? 3 : 2;
    if (this["positions"]["length"] < _0x20ae7e) return;
    this["completeShape"]();
  }
  ["finishMultiVertexViaDoubleClick"]() {
    this["positions"]["length"] >= 2 && this["positions"]["pop"](), this["finishMultiVertex"](), this["resetTrackedEntity"]();
  }
  ["onFreehandDown"](_0x167aa7) {
    this["freehandDragging"] = !![], this["positions"] = [];
    const _0xd4f1f7 = this["toCartesian"](_0x167aa7);
    if (_0xd4f1f7 === void 0) return;
    this["positions"]["push"](_0xd4f1f7), this["emitVertex"](_0x167aa7), this["ensureTempEntity"]();
  }
  ["onFreehandMove"](_0x17b829) {
    if (!this["freehandDragging"] || this["activeTool"] === void 0) return;
    const _0x110e27 = this["toCartesian"](_0x17b829);
    if (_0x110e27 === void 0) return;
    this["positions"]["push"](_0x110e27), this["previewPosition"] = _0x110e27, this["emit"]("draw:move", { "tool": this["activeTool"], "coordinates": this["toLonLat"](_0x110e27), "screenPos": { "x": _0x17b829["x"], "y": _0x17b829["y"] } });
  }
  ["onFreehandUp"]() {
    this["freehandDragging"] = ![];
    if (this["positions"]["length"] >= 2) this["completeShape"]();
  }
  ["emitVertex"](_0x16b7ed) {
    if (this["activeTool"] === void 0) return;
    const _0x619ae2 = this["requireIndex"](this["positions"], this["positions"]["length"] - 1);
    this["emit"]("draw:vertex", { "tool": this["activeTool"], "index": this["positions"]["length"] - 1, "coordinates": this["toLonLat"](_0x619ae2), "screenPos": { "x": _0x16b7ed["x"], "y": _0x16b7ed["y"] } });
  }
  ["completeShape"]() {
    if (this["activeTool"] === void 0 || this["positions"]["length"] === 0) return;
    const _0x38b7a2 = this["buildShape"](this["activeTool"], this["positions"]), _0x11a575 = this["activeSource"] === void 0 ? _0x38b7a2 : { ..._0x38b7a2, "source": this["activeSource"] };
    this["shapes"]["set"](_0x11a575["id"], _0x11a575), this["clearTempEntity"](), this["resetSessionForContinuousDrawing"](), this["emit"]("draw:complete", { "shape": _0x11a575 });
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
        const _0x17d158 = [...this["positions"], ...this["previewPosition"] ? [this["previewPosition"]] : []], _0x32dade = dedupePositions(_0x17d158);
        return _0x32dade["length"] >= 3 ? new PolygonHierarchy(_0x32dade) : void 0;
      }, ![]), "material": Color["CYAN"]["withAlpha"](0.35) } });
      else {
        if (this["activeTool"] === "rectangle") this["tempFillEntity"] = this["viewer"]["entities"]["add"]({ "polygon": { "hierarchy": new CallbackProperty(() => {
          const _0xa2f704 = this["positions"][0], _0x53a875 = this["previewPosition"];
          if (_0xa2f704 === void 0 || _0x53a875 === void 0) return void 0;
          const _0x1253fa = this["computeRectangleCoordinates"](_0xa2f704, _0x53a875);
          return new PolygonHierarchy(_0x1253fa["map"]((_0x547c90) => this["toCartesianFromLonLat"](_0x547c90)));
        }, ![]), "material": Color["CYAN"]["withAlpha"](0.35) } });
        else this["activeTool"] === "circle" && (this["tempFillEntity"] = this["viewer"]["entities"]["add"]({ "polygon": { "hierarchy": new CallbackProperty(() => {
          const _0x5b88f3 = this["positions"][0], _0x47609a = this["previewPosition"];
          if (_0x5b88f3 === void 0 || _0x47609a === void 0) return void 0;
          const _0x5e8cb5 = this["computeCircleRing"](_0x5b88f3, _0x47609a);
          return new PolygonHierarchy(_0x5e8cb5["map"]((_0x33325a) => this["toCartesianFromLonLat"](_0x33325a)));
        }, ![]), "material": Color["CYAN"]["withAlpha"](0.35) } }));
      }
    }
  }
  ["addVertexMarker"](_0x5426dc) {
    this["tempVertexEntities"]["push"](this["viewer"]["entities"]["add"]({ "position": _0x5426dc, "point": { "pixelSize": 6, "color": Color["YELLOW"], "outlineColor": Color["BLACK"], "outlineWidth": 1 } }));
  }
  ["buildPositionsCallback"](_0x5c5399) {
    return new CallbackProperty(() => {
      const _0x22e81d = [...this["positions"], ...this["previewPosition"] ? [this["previewPosition"]] : []], _0x30248c = dedupePositions(_0x22e81d);
      return _0x30248c["length"] >= _0x5c5399 ? _0x30248c : void 0;
    }, ![]);
  }
  ["clearTempEntity"]() {
    this["tempEntity"] !== void 0 && (this["viewer"]["entities"]["remove"](this["tempEntity"]), this["tempEntity"] = void 0);
    this["tempFillEntity"] !== void 0 && (this["viewer"]["entities"]["remove"](this["tempFillEntity"]), this["tempFillEntity"] = void 0);
    for (const _0xcf35da of this["tempVertexEntities"]) {
      this["viewer"]["entities"]["remove"](_0xcf35da);
    }
    this["tempVertexEntities"] = [];
  }
  ["resetTrackedEntity"]() {
    this["viewer"]["trackedEntity"] !== void 0 && (this["viewer"]["trackedEntity"] = void 0);
  }
  ["suspendBuiltInDoubleClick"]() {
    if (this["builtInDoubleClickAction"] !== void 0) return;
    const _0x4c78de = this["viewer"]["screenSpaceEventHandler"], _0x27b998 = _0x4c78de["getInputAction"](ScreenSpaceEventType["LEFT_DOUBLE_CLICK"]);
    if (_0x27b998 === void 0) return;
    this["builtInDoubleClickAction"] = _0x27b998, _0x4c78de["removeInputAction"](ScreenSpaceEventType["LEFT_DOUBLE_CLICK"]);
  }
  ["restoreBuiltInDoubleClick"]() {
    if (this["builtInDoubleClickAction"] === void 0) return;
    this["viewer"]["screenSpaceEventHandler"]["setInputAction"](this["builtInDoubleClickAction"], ScreenSpaceEventType["LEFT_DOUBLE_CLICK"]), this["builtInDoubleClickAction"] = void 0;
  }
  ["setCursor"](_0x72cd83) {
    this["viewer"]["scene"]["canvas"]["style"]["cursor"] = _0x72cd83;
  }
  ["lockCamera"]() {
    this["viewer"]["scene"]["screenSpaceCameraController"]["enableRotate"] = ![], this["viewer"]["scene"]["screenSpaceCameraController"]["enableTilt"] = ![];
  }
  ["unlockCamera"]() {
    this["viewer"]["scene"]["screenSpaceCameraController"]["enableRotate"] = !![], this["viewer"]["scene"]["screenSpaceCameraController"]["enableTilt"] = !![];
  }
  ["buildShape"](_0x4fcb74, _0x30945e) {
    const _0x42d42c = crypto["randomUUID"](), _0x6cc4d = Date["now"]();
    if (_0x4fcb74 === "point") {
      const _0x170390 = this["requireIndex"](_0x30945e, 0), _0x585d66 = this["toLonLat"](_0x170390);
      return { "id": _0x42d42c, "tool": _0x4fcb74, "entity": this["viewer"]["entities"]["add"]({ "position": _0x170390, "point": { "pixelSize": 8, "color": Color["CYAN"] } }), "positions": _0x30945e, "coordinates": [_0x585d66], "geometry": { "type": "Point", "coordinates": _0x585d66 }, "createdAt": _0x6cc4d };
    }
    if (_0x4fcb74 === "circle") return this["buildCircleShape"](_0x42d42c, _0x30945e, _0x6cc4d);
    if (_0x4fcb74 === "rectangle") return this["buildRectangleShape"](_0x42d42c, _0x30945e, _0x6cc4d);
    if (_0x4fcb74 === "polygon") return this["buildPolygonShape"](_0x42d42c, _0x30945e, _0x6cc4d);
    return this["buildLineShape"](_0x42d42c, _0x4fcb74, _0x30945e, _0x6cc4d);
  }
  ["buildLineShape"](_0x198040, _0x2197d8, _0x5b2098, _0x103575) {
    const _0x55cd08 = _0x5b2098["map"]((_0x15285b) => this["toLonLat"](_0x15285b));
    return { "id": _0x198040, "tool": _0x2197d8, "entity": this["viewer"]["entities"]["add"]({ "polyline": { "positions": _0x5b2098, "width": 3, "material": Color["CYAN"] } }), "positions": _0x5b2098, "coordinates": _0x55cd08, "geometry": { "type": "LineString", "coordinates": _0x55cd08 }, "length": this["computeLength"](_0x5b2098), "createdAt": _0x103575 };
  }
  ["buildPolygonShape"](_0x2f0e75, _0x54156f, _0x2b75d4) {
    const _0x148df8 = _0x54156f["map"]((_0x24f972) => this["toLonLat"](_0x24f972)), _0x5d6471 = this["requireIndex"](_0x148df8, 0), _0x5e5483 = this["requireIndex"](_0x54156f, 0), _0x5ad59c = [..._0x148df8, _0x5d6471];
    return { "id": _0x2f0e75, "tool": "polygon", "entity": this["viewer"]["entities"]["add"]({ "polygon": { "hierarchy": _0x54156f, "material": Color["CYAN"]["withAlpha"](0.4) } }), "positions": _0x54156f, "coordinates": _0x148df8, "geometry": { "type": "Polygon", "coordinates": [_0x5ad59c] }, "area": this["computeArea"](_0x148df8), "perimeter": this["computeLength"]([..._0x54156f, _0x5e5483]), "createdAt": _0x2b75d4 };
  }
  ["buildRectangleShape"](_0x433435, _0x22cc5f, _0x2847bf) {
    const _0x55dfa5 = this["requireIndex"](_0x22cc5f, 0), _0x331368 = this["requireIndex"](_0x22cc5f, 1), _0x2350e9 = this["computeRectangleCoordinates"](_0x55dfa5, _0x331368), _0x3cef7d = _0x2350e9["map"]((_0x4d8848) => this["toCartesianFromLonLat"](_0x4d8848)), _0xccaa2 = this["requireIndex"](_0x3cef7d, 0);
    return { "id": _0x433435, "tool": "rectangle", "entity": this["viewer"]["entities"]["add"]({ "polygon": { "hierarchy": _0x3cef7d, "material": Color["CYAN"]["withAlpha"](0.4) } }), "positions": _0x3cef7d, "coordinates": _0x2350e9, "geometry": { "type": "Polygon", "coordinates": [[..._0x2350e9, this["requireIndex"](_0x2350e9, 0)]] }, "area": this["computeArea"](_0x2350e9), "perimeter": this["computeLength"]([..._0x3cef7d, _0xccaa2]), "createdAt": _0x2847bf };
  }
  ["buildCircleShape"](_0x80f1a1, _0xc6f709, _0x2be829) {
    const _0x2faaa0 = this["requireIndex"](_0xc6f709, 0), _0x52385c = this["requireIndex"](_0xc6f709, 1), _0xd06824 = Cartesian3["distance"](_0x2faaa0, _0x52385c), _0x580cee = this["computeCircleRing"](_0x2faaa0, _0x52385c), _0x895321 = _0x580cee["map"]((_0x5d8acb) => this["toCartesianFromLonLat"](_0x5d8acb)), _0x3e2f6c = this["requireIndex"](_0x580cee, 0);
    return { "id": _0x80f1a1, "tool": "circle", "entity": this["viewer"]["entities"]["add"]({ "polygon": { "hierarchy": _0x895321, "material": Color["CYAN"]["withAlpha"](0.4) } }), "positions": [_0x2faaa0, _0x52385c], "coordinates": [this["toLonLat"](_0x2faaa0)], "geometry": { "type": "Polygon", "coordinates": [[..._0x580cee, _0x3e2f6c]] }, "area": Math["PI"] * _0xd06824 * _0xd06824, "perimeter": 2 * Math["PI"] * _0xd06824, "radius": _0xd06824, "createdAt": _0x2be829 };
  }
  ["sampleCircleRing"](_0x433178, _0x5b87a5) {
    const _0x57267d = [];
    for (let _0x49d842 = 0; _0x49d842 < CIRCLE_SEGMENTS; _0x49d842++) {
      const _0x30d61e = 2 * Math["PI"] * _0x49d842 / CIRCLE_SEGMENTS, _0x1c8aaf = _0x5b87a5 * Math["cos"](_0x30d61e), _0x3b1acf = _0x5b87a5 * Math["sin"](_0x30d61e);
      _0x57267d["push"](this["offsetMetersToLonLat"](_0x433178, _0x1c8aaf, _0x3b1acf));
    }
    return _0x57267d;
  }
  ["computeRectangleCoordinates"](_0x542e50, _0x60b3a5) {
    const _0x4c74d1 = this["toLonLat"](_0x542e50), _0x380363 = this["toLonLat"](_0x60b3a5), _0x3c9635 = Math["min"](_0x4c74d1[0], _0x380363[0]), _0x35ccbc = Math["max"](_0x4c74d1[0], _0x380363[0]), _0x283521 = Math["min"](_0x4c74d1[1], _0x380363[1]), _0x474f7e = Math["max"](_0x4c74d1[1], _0x380363[1]);
    return [[_0x3c9635, _0x283521], [_0x35ccbc, _0x283521], [_0x35ccbc, _0x474f7e], [_0x3c9635, _0x474f7e]];
  }
  ["computeCircleRing"](_0x3db1d4, _0x407628) {
    const _0x121fab = Cartesian3["distance"](_0x3db1d4, _0x407628), _0x273975 = this["toLonLat"](_0x3db1d4);
    return this["sampleCircleRing"](_0x273975, _0x121fab);
  }
  ["computeArea"](_0x334a06) {
    const _0x5bad62 = this["requireIndex"](_0x334a06, 0)[1], _0x3dc122 = _0x334a06["map"]((_0x2528fa) => this["projectMeters"](_0x2528fa, _0x5bad62));
    let _0x3fd38f = 0;
    for (let _0x2b1738 = 0; _0x2b1738 < _0x3dc122["length"]; _0x2b1738++) {
      const [_0x14071d, _0x5d845b] = this["requireIndex"](_0x3dc122, _0x2b1738), [_0x128ab5, _0x1c3808] = this["requireIndex"](_0x3dc122, (_0x2b1738 + 1) % _0x3dc122["length"]);
      _0x3fd38f += _0x14071d * _0x1c3808 - _0x128ab5 * _0x5d845b;
    }
    return Math["abs"](_0x3fd38f) / 2;
  }
  ["computeLength"](_0x5d3732) {
    let _0xcbf03 = 0;
    for (let _0x52c48d = 0; _0x52c48d < _0x5d3732["length"] - 1; _0x52c48d++) {
      _0xcbf03 += Cartesian3["distance"](this["requireIndex"](_0x5d3732, _0x52c48d), this["requireIndex"](_0x5d3732, _0x52c48d + 1));
    }
    return _0xcbf03;
  }
  ["projectMeters"](_0x2bca8b, _0x44605f) {
    const _0xa5b422 = _0x584e42["toRadians"](_0x2bca8b[0]) * Math["cos"](_0x584e42["toRadians"](_0x44605f)) * EARTH_RADIUS_METERS, _0x29c74d = _0x584e42["toRadians"](_0x2bca8b[1]) * EARTH_RADIUS_METERS;
    return [_0xa5b422, _0x29c74d];
  }
  ["offsetMetersToLonLat"](_0x1b0737, _0x363bd, _0x38c868) {
    const _0x116c47 = _0x1b0737[1] + _0x584e42["toDegrees"](_0x38c868 / EARTH_RADIUS_METERS), _0x4d3c38 = _0x1b0737[0] + _0x584e42["toDegrees"](_0x363bd / (EARTH_RADIUS_METERS * Math["cos"](_0x584e42["toRadians"](_0x1b0737[1]))));
    return [_0x4d3c38, _0x116c47];
  }
  ["toCartesianFromLonLat"](_0x3a56a8) {
    return Cartesian3["fromDegrees"](_0x3a56a8[0], _0x3a56a8[1]);
  }
  ["toCartesian"](_0xc1fc7) {
    return this["viewer"]["camera"]["pickEllipsoid"](_0xc1fc7, this["scene"]["globe"]["ellipsoid"]);
  }
  ["toLonLat"](_0x3fb498) {
    const _0x28c761 = Cartographic["fromCartesian"](_0x3fb498);
    return [_0x584e42["toDegrees"](_0x28c761["longitude"]), _0x584e42["toDegrees"](_0x28c761["latitude"])];
  }
  ["requireIndex"](_0x7f87df, _0x2769c3) {
    const _0x4bd48b = _0x7f87df[_0x2769c3];
    if (_0x4bd48b === void 0) throw new TucbsError("INTERNAL_INDEX_OUT_OF_RANGE", "DrawingManager: beklenen index (" + _0x2769c3 + ") dizide bulunamadi");
    return _0x4bd48b;
  }
}
function trimSlash$1(_0x2712f8) {
  return _0x2712f8["replace"](/\/+$/, "");
}
function newClientId() {
  if (typeof crypto !== "undefined" && typeof crypto["randomUUID"] === "function") return crypto["randomUUID"]();
  return "00000000-0000-0000-0000-000000000001";
}
class AnalysisManager {
  constructor(_0x233297) {
    __privateAdd(this, _AnalysisManager_instances);
    __privateAdd(this, _apiKey2);
    __privateSet(this, _apiKey2, _0x233297["apiKey"] ?? ""), this["clientId"] = _0x233297["clientId"] ?? newClientId();
  }
  ["configure"](_0x1e0018) {
    if (_0x1e0018["apiKey"] !== void 0) __privateSet(this, _apiKey2, _0x1e0018["apiKey"]);
    if (_0x1e0018["clientId"] !== void 0) this["clientId"] = _0x1e0018["clientId"];
  }
  get ["configured"]() {
    return Boolean(getUcbpApiBase() && __privateGet(this, _apiKey2));
  }
  async ["buffer"](_0x4e01d2) {
    return __privateMethod(this, _AnalysisManager_instances, post_fn).call(this, "/vector/buffer", _0x4e01d2);
  }
  async ["intersection"](_0x4baaab) {
    return __privateMethod(this, _AnalysisManager_instances, post_fn).call(this, "/vector/intersection", _0x4baaab);
  }
  async ["boundary"](_0x24b2af) {
    return __privateMethod(this, _AnalysisManager_instances, post_fn).call(this, "/vector/boundary", _0x24b2af);
  }
  async ["clip"](_0x781cca) {
    return __privateMethod(this, _AnalysisManager_instances, post_fn).call(this, "/vector/clip", _0x781cca);
  }
  async ["difference"](_0x4fbb44) {
    return __privateMethod(this, _AnalysisManager_instances, post_fn).call(this, "/vector/difference", _0x4fbb44);
  }
  async ["subtract"](_0x2c7b82) {
    return __privateMethod(this, _AnalysisManager_instances, post_fn).call(this, "/vector/subtract", _0x2c7b82);
  }
  async ["union"](_0x223a94) {
    return __privateMethod(this, _AnalysisManager_instances, post_fn).call(this, "/vector/union", _0x223a94);
  }
  async ["wedgeBuffer"](_0x25d974) {
    return __privateMethod(this, _AnalysisManager_instances, post_fn).call(this, "/vector/wedge-buffer", _0x25d974);
  }
}
_apiKey2 = new WeakMap();
_AnalysisManager_instances = new WeakSet();
post_fn = async function(_0x2dbfe7, _0x402f9f) {
  if (!__privateGet(this, _apiKey2)) throw new AnalysisRequestError("ANALYSIS_API_KEY_MISSING", "apiKey tanımlı değil (tucbs-map apiKey).");
  const _0xdd5289 = { "clientId": this["clientId"], "object": _0x402f9f }, _0x947c7d = "" + trimSlash$1(getUcbpApiBase()) + _0x2dbfe7;
  let _0x5a3b00;
  try {
    _0x5a3b00 = await fetch(_0x947c7d, { "method": "POST", "headers": { "Content-Type": "application/json", "X-API-Key": __privateGet(this, _apiKey2) }, "body": JSON["stringify"](_0xdd5289) });
  } catch (_0x8b8726) {
    const _0x928808 = _0x8b8726 instanceof Error ? _0x8b8726["message"] : String(_0x8b8726);
    throw new AnalysisRequestError("ANALYSIS_NETWORK_ERROR", "Ağ hatası: " + _0x928808);
  }
  const _0x672b5f = await _0x5a3b00["json"]()["catch"](() => null);
  if (!_0x5a3b00["ok"]) {
    const _0x6cb793 = (_0x672b5f == null ? void 0 : _0x672b5f["mesaj"]) || (_0x672b5f == null ? void 0 : _0x672b5f["message"]) || "İstek başarısız (HTTP " + _0x5a3b00["status"] + ")";
    throw new AnalysisRequestError("ANALYSIS_REQUEST_FAILED", _0x6cb793);
  }
  if ((_0x672b5f == null ? void 0 : _0x672b5f["isSuccess"]) === ![] || (_0x672b5f == null ? void 0 : _0x672b5f["success"]) === ![]) throw new AnalysisRequestError("ANALYSIS_UNSUCCESSFUL", _0x672b5f["mesaj"] || _0x672b5f["message"] || "Analiz başarısız.");
  const _0x5e1bb0 = _0x672b5f == null ? void 0 : _0x672b5f["object"];
  if (!(_0x5e1bb0 == null ? void 0 : _0x5e1bb0["geojson"])) throw new AnalysisRequestError("ANALYSIS_RESPONSE_MISSING_GEOJSON", "Yanıtta geojson yok.");
  return _0x5e1bb0;
};
const FALLBACK_IMAGE_FILENAME = "blue-marble-fallback.jpg", FALLBACK_WORLD_IMAGE = new URL(FALLBACK_IMAGE_FILENAME, import.meta.url)["href"], FALLBACK_DELAY_MS = 3e3, BASEMAP_ERROR_RETRY_LIMIT = 2, BASEMAP_UNAVAILABLE_DELAY_MS = 1e4;
function watchBasemap(_0x5710bc, _0x4a0c70, _0x20c0c7, _0x347f18, _0x5dde52, _0x50ad53) {
  let _0xcaef6a = ![], _0x4f25e2 = ![];
  const _0xab9d69 = window["setTimeout"](() => {
    if (_0xcaef6a || !_0x4a0c70["isCurrentGeneration"](_0x20c0c7)) return;
    _0x4a0c70["ensureFallbackBasemap"]();
  }, FALLBACK_DELAY_MS), _0xb39b6f = window["setTimeout"](() => {
    if (_0xcaef6a || !_0x4a0c70["isCurrentGeneration"](_0x20c0c7)) return;
    _0xcaef6a = !![], _0x42f1c5(), _0x4a0c70["setStatus"]("unavailable"), _0x4a0c70["removeBasemapLayer"](), _0x4a0c70["ensureFallbackBasemap"](), _0x4a0c70["emit"]("basemap:error", { "id": _0x347f18 });
  }, BASEMAP_UNAVAILABLE_DELAY_MS), _0x42f1c5 = () => {
    _0x4f25e2 = !![], window["clearTimeout"](_0xab9d69), window["clearTimeout"](_0xb39b6f), _0x50ad53["errorEvent"]["removeEventListener"](_0x3eb63e);
  }, _0x3eb63e = (_0x4be3b4) => {
    if (_0xcaef6a) return;
    if (!_0x4a0c70["isCurrentGeneration"](_0x20c0c7)) return;
    if (!_0x5710bc["imageryLayers"]["contains"](_0x5dde52)) return;
    if (_0x4be3b4["timesRetried"] < BASEMAP_ERROR_RETRY_LIMIT) {
      _0x4be3b4["retry"] = !![];
      return;
    }
    _0xcaef6a = !![], _0x42f1c5(), _0x4a0c70["setStatus"]("unavailable"), _0x4a0c70["removeBasemapLayer"](), _0x4a0c70["ensureFallbackBasemap"](), _0x4a0c70["emit"]("basemap:error", { "id": _0x347f18 });
  }, _0x558c35 = _0x50ad53["requestImage"]["bind"](_0x50ad53);
  _0x50ad53["requestImage"] = (_0x375a3b, _0x43125e, _0x428e14, _0x1784b) => {
    const _0x33b139 = _0x558c35(_0x375a3b, _0x43125e, _0x428e14, _0x1784b);
    if (_0x33b139 && !_0xcaef6a && !_0x4f25e2) _0x33b139["then"](_0x13fcfd, () => void 0);
    return _0x33b139;
  };
  const _0x13fcfd = () => {
    if (_0xcaef6a || _0x4f25e2) return;
    if (!_0x4a0c70["isCurrentGeneration"](_0x20c0c7)) {
      _0x42f1c5();
      return;
    }
    _0xcaef6a = !![], _0x42f1c5(), _0x4a0c70["setStatus"]("ready"), _0x4a0c70["clearFallbackBasemap"](), _0x4a0c70["emit"]("basemap:recovered", { "id": _0x347f18 });
  };
  return _0x50ad53["errorEvent"]["addEventListener"](_0x3eb63e), _0x42f1c5;
}
const BASEMAP_LAYER_ID = "__tucbs_basemap__";
function trackProviderRequests(_0x221a5c) {
  const _0x4c99bc = /* @__PURE__ */ new Set(), _0x3525c4 = _0x221a5c["requestImage"]["bind"](_0x221a5c);
  return _0x221a5c["requestImage"] = (_0x30fae0, _0xedad27, _0x501851, _0x4e2fc2) => {
    if (_0x4e2fc2) _0x4c99bc["add"](_0x4e2fc2);
    const _0x1a157d = _0x3525c4(_0x30fae0, _0xedad27, _0x501851, _0x4e2fc2);
    if (_0x4e2fc2 && _0x1a157d) {
      const _0x223711 = () => {
        _0x4c99bc["delete"](_0x4e2fc2);
      };
      _0x1a157d["then"](_0x223711, _0x223711);
    }
    return _0x1a157d;
  }, () => {
    for (const _0x3b776e of _0x4c99bc) _0x3b776e["cancel"]();
    _0x4c99bc["clear"]();
  };
}
class BasemapController {
  constructor(_0x19932f, _0x4eb3f2) {
    this["_basemapGeneration"] = 0, this["_basemapStatus"] = "ready", this["_fallbackBasemapLayer"] = null, this["viewer"] = _0x19932f, this["deps"] = _0x4eb3f2;
  }
  get ["status"]() {
    return this["_basemapStatus"];
  }
  get ["currentBasemapId"]() {
    return this["_currentBasemapId"];
  }
  ["set"](_0x466045) {
    var _a2, _b;
    (_a2 = this["_stopBasemapWatch"]) == null ? void 0 : _a2.call(this), (_b = this["_cancelBasemapRequests"]) == null ? void 0 : _b.call(this), this["_cancelBasemapRequests"] = void 0, this["deps"]["removeBasemapLayers"](), this["clearFallbackBasemap"]();
    const _0x32ad2e = ++this["_basemapGeneration"];
    if (_0x466045 === null || _0x466045 === void 0) {
      this["_basemapStatus"] = "ready", this["_currentBasemapId"] = void 0;
      return;
    }
    const _0x382b8a = typeof _0x466045 === "string" ? { "id": _0x466045 } : _0x466045;
    if (!_0x382b8a["id"]) {
      this["_basemapStatus"] = "ready", this["_currentBasemapId"] = void 0;
      return;
    }
    this["_basemapStatus"] = "loading", this["_currentBasemapId"] = _0x382b8a["id"];
    const _0x52a7d9 = this["resolveBasemapUrl"](_0x382b8a), _0x53a5ae = new UrlTemplateImageryProvider({ "url": _0x52a7d9 }), _0x160c5a = trackProviderRequests(_0x53a5ae);
    this["_cancelBasemapRequests"] = _0x160c5a;
    const _0x350c08 = this["viewer"]["imageryLayers"]["addImageryProvider"](_0x53a5ae, 0);
    this["deps"]["addBasemapImageryLayer"](BASEMAP_LAYER_ID, _0x382b8a["id"], _0x350c08), this["_stopBasemapWatch"] = watchBasemap(this["viewer"], { "ensureFallbackBasemap": () => this["ensureFallbackBasemap"](), "clearFallbackBasemap": () => this["clearFallbackBasemap"](), "removeBasemapLayer": () => {
      _0x160c5a(), this["deps"]["removeLayer"](BASEMAP_LAYER_ID);
    }, "emit": (_0x2d214a, _0x4d6e63) => this["deps"]["emit"](_0x2d214a, _0x4d6e63), "setStatus": (_0x558a29) => {
      this["_basemapStatus"] = _0x558a29;
    }, "isCurrentGeneration": (_0x448fd4) => _0x448fd4 === this["_basemapGeneration"] }, _0x32ad2e, _0x382b8a["id"], _0x350c08, _0x53a5ae);
  }
  ["stop"]() {
    var _a2, _b;
    (_a2 = this["_stopBasemapWatch"]) == null ? void 0 : _a2.call(this), (_b = this["_cancelBasemapRequests"]) == null ? void 0 : _b.call(this), this["_cancelBasemapRequests"] = void 0;
  }
  ["addFallbackBasemap"]() {
    const _0x73ae8 = new SingleTileImageryProvider({ "url": FALLBACK_WORLD_IMAGE, "tileWidth": 5400, "tileHeight": 2700, "credit": "NASA Earth Observatory (Blue Marble)" }), _0x46b91a = this["viewer"]["imageryLayers"]["addImageryProvider"](_0x73ae8, 0);
    this["_fallbackBasemapLayer"] = _0x46b91a;
  }
  ["ensureFallbackBasemap"]() {
    if (this["_fallbackBasemapLayer"] !== null) return;
    try {
      this["addFallbackBasemap"]();
    } catch (_0x3ed27a) {
      console["warn"]("[tucbs-core] Basemap yedek goruntusu eklenemedi:", _0x3ed27a);
    }
  }
  ["clearFallbackBasemap"]() {
    this["_fallbackBasemapLayer"] !== null && (this["viewer"]["imageryLayers"]["remove"](this["_fallbackBasemapLayer"], !![]), this["_fallbackBasemapLayer"] = null);
  }
  ["resolveBasemapUrl"](_0x20bd7b) {
    const _0x56cad1 = (_0x1e1a8f) => {
      const _0x2c17fa = this["deps"]["getProxyBase"](), _0x3a22af = _0x2c17fa + "https://atlas.harita.gov.tr/" + _0x1e1a8f + "/{z}/{x}/{y}.png";
      return this["appendTucbsApiKeyQuery"](_0x3a22af);
    };
    switch (_0x20bd7b["id"]) {
      case "hgm-temel":
        return _0x56cad1("temel");
      case "hgm-ortofoto":
        return _0x56cad1("ortofotoservis");
      case "hgm-siyasi":
        return _0x56cad1("siyasi");
      case "hgm-yukseklik":
        return _0x56cad1("yukseklik");
      default:
        return _0x20bd7b["id"];
    }
  }
  ["appendTucbsApiKeyQuery"](_0x13c40b) {
    const _0x2d98c5 = this["deps"]["getApiKey"]();
    if (!_0x2d98c5) return _0x13c40b;
    const _0x49c674 = _0x13c40b["includes"]("?") ? "&" : "?";
    return "" + _0x13c40b + _0x49c674 + "tucbsapikey=" + encodeURIComponent(_0x2d98c5);
  }
}
function nextFrame(_0x3c99e6) {
  return new Promise((_0x3f4858) => {
    const _0x154641 = () => {
      _0x3c99e6["scene"]["postRender"]["removeEventListener"](_0x154641), _0x3f4858();
    };
    _0x3c99e6["scene"]["postRender"]["addEventListener"](_0x154641), _0x3c99e6["scene"]["requestRender"]();
  });
}
async function captureCanvasBlob(_0x203041, _0x514aab, _0x302e0b) {
  const _0x26b10b = _0x203041["canvas"];
  if (typeof _0x26b10b["toBlob"] === "function") return new Promise((_0x4bbcaf, _0x1bae40) => {
    _0x26b10b["toBlob"]((_0x1919a4) => _0x1919a4 ? _0x4bbcaf(_0x1919a4) : _0x1bae40(new Error("canvas.toBlob basarisiz oldu")), _0x514aab, _0x302e0b);
  });
  const _0x11feb7 = _0x26b10b["toDataURL"](_0x514aab, _0x302e0b), _0x1bfc1c = _0x11feb7["split"](",")[1] ?? "", _0x19879f = atob(_0x1bfc1c), _0x195b6f = new Uint8Array(_0x19879f["length"]);
  for (let _0x98cdbd = 0; _0x98cdbd < _0x19879f["length"]; _0x98cdbd++) _0x195b6f[_0x98cdbd] = _0x19879f["charCodeAt"](_0x98cdbd);
  return new Blob([_0x195b6f], { "type": _0x514aab });
}
function measureGroundMetersPerPixel(_0xef6325) {
  const _0x16b366 = _0xef6325["scene"], _0xe2f981 = _0xef6325["camera"], _0x463401 = _0xef6325["canvas"], _0x1591e7 = _0x463401["clientWidth"] / 2, _0x11ce1c = _0x463401["clientHeight"] / 2, _0x1f9492 = _0xe2f981["getPickRay"](new Cartesian2(_0x1591e7 - 1, _0x11ce1c)), _0x1342fc = _0xe2f981["getPickRay"](new Cartesian2(_0x1591e7 + 1, _0x11ce1c));
  if (!_0x1f9492 || !_0x1342fc) return null;
  const _0x29502f = _0x16b366["globe"]["pick"](_0x1f9492, _0x16b366), _0x37e559 = _0x16b366["globe"]["pick"](_0x1342fc, _0x16b366);
  if (!_0x29502f || !_0x37e559) return null;
  return Cartesian3["distance"](_0x29502f, _0x37e559) / 2;
}
function toOrientedDestination(_0xa09cde) {
  return { "destination": Cartesian3["fromDegrees"](_0xa09cde["longitude"], _0xa09cde["latitude"], _0xa09cde["height"]), "orientation": { "heading": _0x584e42["toRadians"](_0xa09cde["heading"] ?? 0), "pitch": _0x584e42["toRadians"](_0xa09cde["pitch"] ?? -90), "roll": _0x584e42["toRadians"](_0xa09cde["roll"] ?? 0) } };
}
function setView(_0x15740c, _0x48e4da) {
  _0x15740c["camera"]["setView"](toOrientedDestination(_0x48e4da));
}
function setExtent(_0x4c32b7, _0x12660e) {
  _0x4c32b7["camera"]["setView"]({ "destination": Rectangle["fromDegrees"](_0x12660e["west"], _0x12660e["south"], _0x12660e["east"], _0x12660e["north"]) });
}
function flyTo(_0x2491a0, _0x24d49e) {
  _0x2491a0["camera"]["flyTo"](toOrientedDestination(_0x24d49e));
}
function zoomTo(_0x47a5ab, _0x34ce99, _0x233ee5, _0x1523bc) {
  _0x47a5ab["camera"]["setView"]({ "destination": Cartesian3["fromDegrees"](_0x34ce99, _0x233ee5, _0x1523bc) });
}
async function zoomToLayer(_0x1165dd, _0x5ae1c2) {
  return _0x1165dd["zoomTo"](_0x5ae1c2["cesiumObject"], new HeadingPitchRange(0, -_0x584e42["PI_OVER_TWO"], 0));
}
function trimSlash(_0x18b464) {
  return _0x18b464["replace"](/\/+$/, "");
}
async function validateApiKey(_0x1582f4, _0x15ca32 = getUcbpApiBase()) {
  if (!_0x1582f4) return;
  const _0xae96a6 = trimSlash(_0x15ca32) + "/auth/validate";
  let _0x301338;
  try {
    _0x301338 = await fetch(_0xae96a6, { "method": "GET", "headers": { "X-API-Key": _0x1582f4 } });
  } catch (_0x179cab) {
    const _0x4fbd8c = _0x179cab instanceof Error ? _0x179cab["message"] : String(_0x179cab);
    throw new ApiKeyValidationError(_0x4fbd8c);
  }
  if (!_0x301338["ok"]) {
    let _0x3cf83e, _0x1cd07d, _0x45b0ac, _0x4fb50e;
    try {
      const _0x3d830c = await _0x301338["json"]();
      _0x3cf83e = _0x3d830c["title"], _0x1cd07d = _0x3d830c["message"] || _0x3d830c["mesaj"], _0x45b0ac = _0x3d830c["reason"], _0x4fb50e = _0x3d830c["detail"];
    } catch {
    }
    const _0x4dfbad = {};
    if (_0x3cf83e !== void 0) _0x4dfbad["title"] = _0x3cf83e;
    if (_0x45b0ac !== void 0) _0x4dfbad["reason"] = _0x45b0ac;
    if (_0x4fb50e !== void 0) _0x4dfbad["detail"] = _0x4fb50e;
    throw new ApiKeyValidationError(_0x1cd07d || "HTTP " + _0x301338["status"], _0x4dfbad);
  }
}
async function ensureEffectiveApiKeyValid(_0x247523, _0x1ff6c6) {
  const _0x5dc9e0 = _0x247523 || getGlobalApiKey();
  if (!_0x5dc9e0) throw new ApiKeyValidationError("Haritayı görüntülemek için geçerli bir apiKey gereklidir.", { "title": "API Anahtarı Eksik", "reason": "missing-key", "code": "API_KEY_MISSING" });
  await validateApiKey(_0x5dc9e0, _0x1ff6c6);
}
const DRAWING_LAYER_ID = "__tucbs_drawing_layer__", DRAWING_LAYER_TITLE = "Çizim Katmanı", MEASURE_LAYER_ID = "__tucbs_measure_layer__", MEASURE_LAYER_TITLE = "Ölçü Katmanı", MAX_ZOOM_DISTANCE_METERS = 25e6, MAX_ZOOM_OUT_SCALE_DENOMINATOR = 25e6, MAX_ZOOM_SCALE_DENOMINATOR = 100, MIN_ZOOM_DISTANCE_METERS = 10, DEFAULT_INITIAL_EXTENT = { "west": 22.94, "south": 34.05, "east": 47.39, "north": 42.7 };
let Map$1 = (_a = class {
  constructor(_0xf4d962, _0x341049 = {}) {
    __privateAdd(this, _unregisterApiKeyRefresh);
    __privateAdd(this, _removeLodSeamGuard);
    __privateAdd(this, _removeMinZoomScale);
    __privateAdd(this, _removeScaleWheelZoom);
    __privateAdd(this, _apiKey3);
    ensureCesiumRuntime();
    const _0x585862 = document["createElement"]("div");
    _0x585862["style"]["display"] = "none", this["viewer"] = new Viewer(_0xf4d962, this["buildViewerOptions"](_0x341049, _0x585862)), this["viewer"]["scene"]["globe"]["baseColor"] = Color["fromCssColorString"]("#a3c6e0"), this["viewer"]["scene"]["screenSpaceCameraController"]["maximumZoomDistance"] = MAX_ZOOM_DISTANCE_METERS, this["viewer"]["scene"]["screenSpaceCameraController"]["minimumZoomDistance"] = MIN_ZOOM_DISTANCE_METERS;
    const _0xcb89a6 = _0x341049["apiKey"] ?? getGlobalApiKey();
    __privateSet(this, _apiKey3, _0xcb89a6), this["layerManager"] = new LayerManager(this["viewer"]), this["selectionHighlight"] = new SelectionHighlight(this["viewer"]), this["layerManager"]["configure"]({ ..._0xcb89a6 !== void 0 && { "apiKey": _0xcb89a6 }, ..._0x341049["trustedApiKeyHosts"] !== void 0 && { "trustedApiKeyHosts": _0x341049["trustedApiKeyHosts"] }, ..._0x341049["apiKeyDiscoveryUrl"] !== void 0 && { "apiKeyDiscoveryUrl": _0x341049["apiKeyDiscoveryUrl"] } }), this["interactionManager"] = new InteractionManager(this["viewer"]), this["drawingManager"] = new DrawingManager(this["viewer"], this["interactionManager"]), this["analysisManager"] = new AnalysisManager({ "apiKey": _0xcb89a6 ?? "" }), this["basemapController"] = new BasemapController(this["viewer"], { "removeBasemapLayers": () => this["layerManager"]["_removeBasemapLayers"](), "addBasemapImageryLayer": (_0x1c60d0, _0x48ba88, _0x481a72) => this["layerManager"]["_addBasemapImageryLayer"](_0x1c60d0, _0x48ba88, _0x481a72), "removeLayer": (_0x119ea4) => this["layerManager"]["removeLayer"](_0x119ea4), "emit": (_0x2f3b66, _0x10bbd1) => this["layerManager"]["emit"](_0x2f3b66, _0x10bbd1), "getProxyBase": () => getProxyBase(), "getApiKey": () => __privateGet(this, _apiKey3) }), _0x341049["apiKey"] === void 0 && this["registerGlobalApiKeyRotation"](_0xcb89a6), this["wireShapeSource"]("draw", DRAWING_LAYER_ID, DRAWING_LAYER_TITLE, (_0x2ba24c, _0x420ad3, _0x3bdc46) => this["layerManager"]["_addDrawnShape"](_0x2ba24c, _0x420ad3, _0x3bdc46)), this["wireShapeSource"]("measure", MEASURE_LAYER_ID, MEASURE_LAYER_TITLE, (_0x449ef5, _0x2e88c6, _0x33c8bb) => this["layerManager"]["_addMeasuredShape"](_0x449ef5, _0x2e88c6, _0x33c8bb)), _0x341049["camera"] !== void 0 ? this["setView"](_0x341049["camera"]) : this["setExtent"](_0x341049["initialExtent"] ?? DEFAULT_INITIAL_EXTENT), __privateSet(this, _removeLodSeamGuard, installLodSeamGuard(this["viewer"])), __privateSet(this, _removeMinZoomScale, installMinZoomScale(this["viewer"], MAX_ZOOM_SCALE_DENOMINATOR, MAX_ZOOM_OUT_SCALE_DENOMINATOR)), __privateSet(this, _removeScaleWheelZoom, installScaleWheelZoom(this["viewer"])), this["setBasemap"](_0x341049["basemap"]);
  }
  async ["ensureApiKeyValid"]() {
    await validateApiKey(__privateGet(this, _apiKey3) ?? "", getUcbpApiBase());
  }
  async ["runBuffer"](_0x45569b, _0x32aca8) {
    const _0x53b72d = await this["analysisManager"]["buffer"](_0x45569b), _0x48a1fb = (_0x32aca8 == null ? void 0 : _0x32aca8["id"]) ?? "buffer-" + Date["now"](), _0x3e1099 = (_0x32aca8 == null ? void 0 : _0x32aca8["title"]) ?? "Tampon sonucu (" + _0x45569b["distanceM"] + "m)";
    this["layerManager"]["markAnalysisResult"](_0x48a1fb);
    const _0x449f9e = await this["layerManager"]["add"]("GEOJSON", { "id": _0x48a1fb, "title": _0x3e1099, "data": _0x53b72d["geojson"], "layerType": "GEOJSON", "clampToGround": !![] });
    return _0x449f9e;
  }
  async ["runIntersection"](_0x16c58c, _0x3753e8) {
    const _0x59af1d = await this["analysisManager"]["intersection"](_0x16c58c), _0x2962d4 = (_0x3753e8 == null ? void 0 : _0x3753e8["id"]) ?? "intersection-" + Date["now"](), _0x5c486d = (_0x3753e8 == null ? void 0 : _0x3753e8["title"]) ?? "Kesişim sonucu";
    this["layerManager"]["markAnalysisResult"](_0x2962d4);
    const _0x49cd5a = await this["layerManager"]["add"]("GEOJSON", { "id": _0x2962d4, "title": _0x5c486d, "data": _0x59af1d["geojson"], "layerType": "GEOJSON", "clampToGround": !![] });
    return _0x49cd5a;
  }
  async ["runBoundary"](_0x384c4e, _0x390bf7) {
    const _0x5295ee = await this["analysisManager"]["boundary"](_0x384c4e);
    return this["addAnalysisGeoJson"]((_0x390bf7 == null ? void 0 : _0x390bf7["id"]) ?? "boundary-" + Date["now"](), (_0x390bf7 == null ? void 0 : _0x390bf7["title"]) ?? "Sınır sonucu", _0x5295ee["geojson"]);
  }
  async ["runClip"](_0x4bf942, _0x528602) {
    const _0xdc2a59 = await this["analysisManager"]["clip"](_0x4bf942);
    return this["addAnalysisGeoJson"]((_0x528602 == null ? void 0 : _0x528602["id"]) ?? "clip-" + Date["now"](), (_0x528602 == null ? void 0 : _0x528602["title"]) ?? "Kırpma sonucu", _0xdc2a59["geojson"]);
  }
  async ["runDifference"](_0x2afb38, _0x572e2a) {
    const _0x483c75 = await this["analysisManager"]["difference"](_0x2afb38);
    return this["addAnalysisGeoJson"]((_0x572e2a == null ? void 0 : _0x572e2a["id"]) ?? "difference-" + Date["now"](), (_0x572e2a == null ? void 0 : _0x572e2a["title"]) ?? "Fark sonucu", _0x483c75["geojson"]);
  }
  async ["runSubtract"](_0x5538a0, _0x80a538) {
    const _0x201ef0 = await this["analysisManager"]["subtract"](_0x5538a0);
    return this["addAnalysisGeoJson"]((_0x80a538 == null ? void 0 : _0x80a538["id"]) ?? "subtract-" + Date["now"](), (_0x80a538 == null ? void 0 : _0x80a538["title"]) ?? "Çıkarma sonucu", _0x201ef0["geojson"]);
  }
  async ["runUnion"](_0x5d4576, _0x3f3129) {
    const _0x2e97b2 = await this["analysisManager"]["union"](_0x5d4576);
    return this["addAnalysisGeoJson"]((_0x3f3129 == null ? void 0 : _0x3f3129["id"]) ?? "union-" + Date["now"](), (_0x3f3129 == null ? void 0 : _0x3f3129["title"]) ?? "Birleştir sonucu", _0x2e97b2["geojson"]);
  }
  async ["runWedgeBuffer"](_0x2480d7, _0x43638b) {
    const _0x3ce371 = await this["analysisManager"]["wedgeBuffer"](_0x2480d7);
    return this["addAnalysisGeoJson"]((_0x43638b == null ? void 0 : _0x43638b["id"]) ?? "wedge-" + Date["now"](), (_0x43638b == null ? void 0 : _0x43638b["title"]) ?? "Kama tampon sonucu", _0x3ce371["geojson"]);
  }
  async ["addAnalysisGeoJson"](_0x114313, _0x19d846, _0x29b1a4) {
    return this["layerManager"]["markAnalysisResult"](_0x114313), this["layerManager"]["add"]("GEOJSON", { "id": _0x114313, "title": _0x19d846, "data": _0x29b1a4, "layerType": "GEOJSON", "clampToGround": !![] });
  }
  ["setView"](_0x45f11b) {
    setView(this["viewer"], _0x45f11b);
  }
  ["setExtent"](_0x5e9ce6) {
    setExtent(this["viewer"], _0x5e9ce6);
  }
  ["flyTo"](_0x4079c0) {
    flyTo(this["viewer"], _0x4079c0);
  }
  ["zoomTo"](_0xbeb795, _0x392507, _0x5689a0) {
    zoomTo(this["viewer"], _0xbeb795, _0x392507, _0x5689a0);
  }
  ["zoomInStep"]() {
    scaleZoomStep(this["viewer"], 1);
  }
  ["zoomOutStep"]() {
    scaleZoomStep(this["viewer"], -1);
  }
  async ["zoomToLayer"](_0x2b43f8) {
    return zoomToLayer(this["viewer"], _0x2b43f8);
  }
  ["dropMarker"](_0x56b617, _0x385943, _0x2c5d41, _0x1215d3 = {}) {
    this["clearMarker"](), this["_removeMarker"] = createMarkerOverlay(this["viewer"], _0x56b617, _0x385943, _0x2c5d41, _0x1215d3);
  }
  ["clearMarker"]() {
    var _a2;
    (_a2 = this["_removeMarker"]) == null ? void 0 : _a2.call(this), this["_removeMarker"] = void 0;
  }
  get ["basemapStatus"]() {
    return this["basemapController"]["status"];
  }
  ["setBasemap"](_0x44653a) {
    this["basemapController"]["set"](_0x44653a);
  }
  ["setMode"](_0x35e5a9) {
    _0x35e5a9 === "2D" ? this["viewer"]["scene"]["morphTo2D"](0) : this["viewer"]["scene"]["morphTo3D"](0);
  }
  ["setQuality"](_0x467c55) {
    const _0x5b2704 = Math["min"](100, Math["max"](0, _0x467c55));
    this["viewer"]["resolutionScale"] = Math["max"](0.1, _0x5b2704 / 100);
  }
  ["resize"]() {
    this["viewer"]["resize"]();
  }
  async ["exportJPEG"](_0x1a908e = "tucbs-harita", _0x128a66 = 0.92) {
    const _0x447133 = await this["captureScreenshotBlob"](_0x128a66);
    triggerDownload(_0x447133, _0x1a908e + "-" + Date["now"]() + ".jpg");
  }
  async ["captureScreenshotBlob"](_0xaa5a3f = 0.92) {
    return await nextFrame(this["viewer"]), captureCanvasBlob(this["viewer"], "image/jpeg", _0xaa5a3f);
  }
  ["measureGroundMetersPerPixel"]() {
    return measureGroundMetersPerPixel(this["viewer"]);
  }
  ["buildViewerOptions"](_0x18d592, _0x2af829) {
    return { "timeline": _0x18d592["timeline"] ?? ![], "animation": _0x18d592["animation"] ?? ![], "baseLayerPicker": _0x18d592["baseLayerPicker"] ?? ![], "baseLayer": ![], "geocoder": _0x18d592["geocoder"] ?? ![], "homeButton": _0x18d592["homeButton"] ?? ![], "sceneModePicker": _0x18d592["sceneModePicker"] ?? ![], "navigationHelpButton": _0x18d592["navigationHelpButton"] ?? ![], "infoBox": _0x18d592["infoBox"] ?? ![], "selectionIndicator": _0x18d592["selectionIndicator"] ?? ![], "shadows": _0x18d592["shadows"] ?? ![], "shouldAnimate": _0x18d592["shouldAnimate"] ?? ![], "fullscreenButton": _0x18d592["fullscreenButton"] ?? ![], "creditContainer": _0x2af829, ..._0x18d592["cesiumOptions"] };
  }
  ["registerGlobalApiKeyRotation"](_0x48df0f) {
    _0x48df0f !== void 0 && console["info"]("[@tucbs/core] Bu Map instance'i configureTucbs() global apiKey'ini kullaniyor (kendi apiKey attribute'u/options'u verilmedi). Farkli bir anahtar gerekiyorsa Map/component'e acikca apiKey verin."), __privateSet(this, _unregisterApiKeyRefresh, registerApiKeyRefresh(() => {
      const _0x5ef394 = getGlobalApiKey();
      __privateSet(this, _apiKey3, _0x5ef394), this["layerManager"]["configure"]({ ..._0x5ef394 !== void 0 && { "apiKey": _0x5ef394 } }), this["analysisManager"]["configure"]({ "apiKey": _0x5ef394 ?? "" }), void this["ensureApiKeyValid"]()["catch"]((_0x44b1f2) => {
        console["error"]("[@tucbs/core] apiKey rotasyon validate basarisiz:", _0x44b1f2);
      }), this["basemapController"]["currentBasemapId"] !== void 0 && this["setBasemap"](this["basemapController"]["currentBasemapId"]);
    }));
  }
  ["wireShapeSource"](_0x5eaaec, _0x4268b6, _0x1cb56d, _0x5a6195) {
    this["drawingManager"]["on"]("draw:complete", ({ shape: _0x2607ef }) => {
      if (_0x2607ef["source"] !== _0x5eaaec) return;
      void _0x5a6195(_0x4268b6, _0x1cb56d, _0x2607ef);
    }), this["drawingManager"]["on"]("draw:remove", ({ shape: _0x327159 }) => {
      if (_0x327159["source"] !== _0x5eaaec) return;
      this["layerManager"]["_removeDrawnShape"](_0x4268b6, _0x327159["entity"]);
    });
  }
  ["showSelectionHighlight"](_0x4cc4e3) {
    this["selectionHighlight"]["show"](_0x4cc4e3);
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
