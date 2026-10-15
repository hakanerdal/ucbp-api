var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _apiKey, _apiKey2, _AnalysisManager_instances, post_fn, _unregisterApiKeyRefresh, _removeLodSeamGuard, _removeMinZoomScale, _removeScaleWheelZoom, _apiKey3, _a;
import { Math as _0x3bd2fa, SceneMode, EllipsoidTerrainProvider, Cartesian2, Cartesian3, CameraEventType, Ellipsoid, JulianDate, Cartographic, ConstantProperty, PropertyBag, PolygonHierarchy, ColorMaterialProperty, Color, CallbackProperty, HeadingPitchRange, BoundingSphere, Entity, PolylineGraphics, ConstantPositionProperty, PointGraphics, CustomDataSource, GeoJsonDataSource, KmlDataSource, Rectangle, WebMapServiceImageryProvider, GetFeatureInfoFormat, Resource, WebMapTileServiceImageryProvider, WebMercatorTilingScheme, ImageryLayer, SingleTileImageryProvider, HeightReference, ScreenSpaceEventHandler, ScreenSpaceEventType, UrlTemplateImageryProvider, Viewer } from "cesium";
function ensureCesiumRuntime() {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  const _0x59de09 = window;
  !_0x59de09["CESIUM_BASE_URL"] && (_0x59de09["CESIUM_BASE_URL"] = "https://cdn.jsdelivr.net/npm/cesium@1.143.0/Build/Cesium/", console["info"]("[gizLog] cesium base url atandi surum=1.143.0"));
  const _0x276efd = _0x59de09["CESIUM_BASE_URL"]["replace"](/\/?$/, "/"), _0x2e918d = Array["from"](document["querySelectorAll"]("link"))["some"]((_0x36fce7) => (_0x36fce7["getAttribute"]("href") || "")["includes"]("Widgets/widgets.css"));
  if (_0x2e918d) return;
  const _0x532de5 = document["createElement"]("link");
  _0x532de5["rel"] = "stylesheet", _0x532de5["href"] = _0x276efd + "Widgets/widgets.css", document["head"]["appendChild"](_0x532de5), console["info"]("[gizLog] cesium widgets.css eklendi");
}
const MAX_LEVEL = 24, EARTH_RADIUS = 6371e3, CORNER_SAFETY = 1.15;
function cornerDistanceRatio(_0x20b41d, _0x112176, _0x50079a) {
  const _0x5065cf = Math["tan"](_0x20b41d / 2), _0x468d55 = _0x5065cf * _0x112176, _0x2f835f = Math["atan"](Math["hypot"](_0x468d55, _0x5065cf)), _0x1c3b64 = EARTH_RADIUS + _0x50079a, _0x12363f = EARTH_RADIUS * EARTH_RADIUS - _0x1c3b64 * _0x1c3b64 * Math["sin"](_0x2f835f) ** 2, _0x5585f7 = _0x12363f > 0 ? _0x1c3b64 * Math["cos"](_0x2f835f) - Math["sqrt"](_0x12363f) : Math["sqrt"](_0x1c3b64 * _0x1c3b64 - EARTH_RADIUS * EARTH_RADIUS);
  return _0x5585f7 / _0x50079a * CORNER_SAFETY;
}
function lodTransitionDistances(_0x2ce41a) {
  const { drawingBufferHeight: _0x263615, sseDenominator: _0x7d3121, maximumScreenSpaceError: _0x27b46c, pixelRatio: _0x14dc11 } = _0x2ce41a, _0x136317 = [];
  for (let _0x36d46e = 0; _0x36d46e <= MAX_LEVEL; _0x36d46e++) {
    const _0x49054f = _0x2ce41a["geometricError"](_0x36d46e) * _0x263615 / (_0x7d3121 * _0x27b46c * _0x14dc11);
    if (Number["isFinite"](_0x49054f) && _0x49054f > 0) _0x136317["push"](_0x49054f);
  }
  return _0x136317["sort"]((_0x50e34c, _0x15b15a) => _0x50e34c - _0x15b15a);
}
const SEAM_MARGIN = 1.01;
function seamFreeScreenSpaceError(_0x422a87, _0x2f8996) {
  const _0x25ad75 = _0x2f8996["maximumScreenSpaceError"], _0x527f33 = cornerDistanceRatio(_0x2f8996["fovy"], _0x2f8996["aspectRatio"], _0x422a87);
  for (const _0x44daaf of lodTransitionDistances(_0x2f8996)) {
    if (_0x44daaf > _0x422a87 && _0x44daaf < _0x422a87 * _0x527f33) {
      const _0x1676d8 = _0x25ad75 * (_0x44daaf / _0x422a87) * SEAM_MARGIN, _0x4b2720 = _0x25ad75 * _0x44daaf / (_0x422a87 * _0x527f33 * SEAM_MARGIN);
      return Math["abs"](Math["log"](_0x1676d8 / _0x25ad75)) <= Math["abs"](Math["log"](_0x4b2720 / _0x25ad75)) ? _0x1676d8 : _0x4b2720;
    }
  }
  return _0x25ad75;
}
const NADIR_TOLERANCE_DEGREES = 3;
function installLodSeamGuard(_0x34d3c1) {
  const _0x4b4cb0 = _0x34d3c1["scene"], _0x116281 = _0x4b4cb0["globe"];
  if (!_0x116281) return () => void 0;
  let _0x3395a6 = _0x116281["maximumScreenSpaceError"], _0x568a29 = _0x3395a6;
  const _0x306ab6 = (_0x4fd231) => {
    if (_0x116281["maximumScreenSpaceError"] !== _0x4fd231) _0x116281["maximumScreenSpaceError"] = _0x4fd231;
    _0x568a29 = _0x4fd231;
  }, _0x2f767a = () => {
    if (_0x116281["maximumScreenSpaceError"] !== _0x568a29) _0x3395a6 = _0x116281["maximumScreenSpaceError"];
    const _0x17fc74 = _0x4b4cb0["camera"]["frustum"], _0x58edab = Math["abs"](_0x3bd2fa["toDegrees"](_0x4b4cb0["camera"]["pitch"]) + 90) <= NADIR_TOLERANCE_DEGREES;
    if (_0x4b4cb0["mode"] !== SceneMode["SCENE3D"] || !_0x58edab || !(_0x4b4cb0["terrainProvider"] instanceof EllipsoidTerrainProvider) || _0x17fc74["fovy"] === void 0 || _0x17fc74["aspectRatio"] === void 0 || _0x17fc74["sseDenominator"] === void 0) {
      _0x306ab6(_0x3395a6);
      return;
    }
    const _0xdcc188 = _0x4b4cb0["terrainProvider"], _0x18f183 = { "geometricError": (_0x151532) => _0xdcc188["getLevelMaximumGeometricError"](_0x151532), "drawingBufferHeight": _0x4b4cb0["drawingBufferHeight"], "sseDenominator": _0x17fc74["sseDenominator"], "maximumScreenSpaceError": _0x3395a6, "pixelRatio": _0x4b4cb0["pixelRatio"] ?? 1, "fovy": _0x17fc74["fovy"], "aspectRatio": _0x17fc74["aspectRatio"] };
    _0x306ab6(seamFreeScreenSpaceError(_0x4b4cb0["camera"]["positionCartographic"]["height"], _0x18f183));
  }, _0x5eaa1b = _0x4b4cb0["preRender"]["addEventListener"](_0x2f767a);
  return () => {
    _0x5eaa1b(), !_0x4b4cb0["isDestroyed"]() && _0x116281["maximumScreenSpaceError"] === _0x568a29 && (_0x116281["maximumScreenSpaceError"] = _0x3395a6);
  };
}
const SCREEN_DPI$1 = 96, METERS_PER_INCH$1 = 0.0254, REWRITE_TOLERANCE = 5e-3;
function minZoomDistanceForScale(_0x523fec, _0x32b1a0, _0x523b30) {
  const _0x1f4945 = Math["tan"](_0x523b30 / 2), _0xa32d10 = _0x523fec * METERS_PER_INCH$1 / SCREEN_DPI$1 * _0x32b1a0 / (2 * _0x1f4945);
  return Number["isFinite"](_0xa32d10) && _0xa32d10 > 0 ? _0xa32d10 : null;
}
const SNAP_WINDOW_RATIO = 1.06, MIN_SNAP_GAP_METERS = 1e-3, SNAP_DURATION_MS = 150;
function snapToMinAmount(_0x117942, _0x185bf6) {
  const _0x2ab0be = _0x117942 - _0x185bf6;
  if (!(_0x2ab0be > MIN_SNAP_GAP_METERS) || _0x117942 > _0x185bf6 * SNAP_WINDOW_RATIO) return 0;
  return _0x2ab0be;
}
function installMinZoomScale(_0x32bcb9, _0x29906b, _0x19d2da) {
  const _0x291079 = _0x32bcb9["scene"], _0x2bf84a = _0x291079["screenSpaceCameraController"], _0x57c6c4 = () => {
    const _0x1dea76 = _0x291079["camera"]["frustum"]["fovy"];
    if (_0x1dea76 === void 0) return;
    const _0x4b1650 = _0x291079["canvas"]["clientHeight"], _0x27501c = minZoomDistanceForScale(_0x29906b, _0x4b1650, _0x1dea76);
    if (_0x27501c !== null) {
      const _0xbd0cb0 = _0x2bf84a["minimumZoomDistance"];
      Math["abs"](_0xbd0cb0 - _0x27501c) > _0xbd0cb0 * REWRITE_TOLERANCE && (_0x2bf84a["minimumZoomDistance"] = _0x27501c);
    }
    const _0x592e9d = minZoomDistanceForScale(_0x19d2da, _0x4b1650, _0x1dea76);
    if (_0x592e9d === null) return;
    const _0x145d2f = _0x2bf84a["maximumZoomDistance"];
    Math["abs"](_0x145d2f - _0x592e9d) > _0x145d2f * REWRITE_TOLERANCE && (_0x2bf84a["maximumZoomDistance"] = _0x592e9d);
  }, _0x3cb5d6 = _0x291079["camera"], _0x427a04 = _0x291079["canvas"];
  let _0xbf58d1;
  const _0x480695 = () => {
    if (_0xbf58d1 !== void 0) cancelAnimationFrame(_0xbf58d1);
    _0xbf58d1 = void 0;
  }, _0x48f202 = () => {
    if (_0xbf58d1 !== void 0) return;
    const _0x4d4924 = snapToMinAmount(_0x3cb5d6["positionCartographic"]["height"], _0x2bf84a["minimumZoomDistance"]);
    if (_0x4d4924 <= 0) return;
    const _0x3a2657 = performance["now"]();
    let _0x115219 = 0;
    const _0x193775 = (_0x5d75c0) => {
      const _0x212f2e = Math["min"](1, (_0x5d75c0 - _0x3a2657) / SNAP_DURATION_MS), _0x2c3b41 = _0x4d4924 * (1 - (1 - _0x212f2e) * (1 - _0x212f2e));
      if (_0x2c3b41 > _0x115219) _0x3cb5d6["zoomIn"](_0x2c3b41 - _0x115219);
      _0x115219 = _0x2c3b41, _0xbf58d1 = _0x212f2e < 1 ? requestAnimationFrame(_0x193775) : void 0;
    };
    _0xbf58d1 = requestAnimationFrame(_0x193775);
  };
  _0x427a04["addEventListener"]("pointerdown", _0x480695), _0x427a04["addEventListener"]("wheel", _0x480695, { "passive": !![] });
  const _0x39f18e = _0x291079["preRender"]["addEventListener"](_0x57c6c4), _0x1af982 = _0x3cb5d6["moveEnd"]["addEventListener"](_0x48f202);
  return () => {
    _0x480695(), _0x427a04["removeEventListener"]("pointerdown", _0x480695), _0x427a04["removeEventListener"]("wheel", _0x480695), _0x39f18e(), _0x1af982();
  };
}
const ZOOM_SCALE_STEPS = [100, 250, 500, 1e3, 2500, 5e3, 1e4, 25e3, 5e4, 1e5, 25e4, 5e5, 1e6, 25e5, 5e6, 15e6, 25e6], ON_STEP_TOLERANCE = 0.03;
function nextScaleStep(_0x2caece, _0x4bbbeb) {
  if (!(_0x2caece > 0) || !Number["isFinite"](_0x2caece)) return null;
  if (_0x4bbbeb === 1) {
    const _0x24f291 = _0x2caece / (1 + ON_STEP_TOLERANCE);
    return [...ZOOM_SCALE_STEPS]["reverse"]()["find"]((_0x2192f9) => _0x2192f9 < _0x24f291) ?? null;
  }
  const _0x1529b4 = _0x2caece * (1 + ON_STEP_TOLERANCE);
  return ZOOM_SCALE_STEPS["find"]((_0x3baec1) => _0x3baec1 > _0x1529b4) ?? Infinity;
}
const SCREEN_DPI = 96, METERS_PER_INCH = 0.0254;
function measureGround(_0x1e1bb1) {
  const _0x187f44 = _0x1e1bb1["globe"];
  if (!_0x187f44) return null;
  const _0xf89f07 = _0x1e1bb1["camera"], _0x4f5eb6 = _0x1e1bb1["canvas"]["clientWidth"] / 2, _0x1855e1 = _0x1e1bb1["canvas"]["clientHeight"] / 2, _0x5ba9d9 = _0xf89f07["getPickRay"](new Cartesian2(_0x4f5eb6 - 1, _0x1855e1)), _0x47a605 = _0xf89f07["getPickRay"](new Cartesian2(_0x4f5eb6 + 1, _0x1855e1)), _0x3911d7 = _0xf89f07["getPickRay"](new Cartesian2(_0x4f5eb6, _0x1855e1));
  if (!_0x5ba9d9 || !_0x47a605 || !_0x3911d7) return null;
  const _0xdc7ce9 = _0x187f44["pick"](_0x5ba9d9, _0x1e1bb1), _0x54962e = _0x187f44["pick"](_0x47a605, _0x1e1bb1), _0x1d6ad3 = _0x187f44["pick"](_0x3911d7, _0x1e1bb1);
  if (!_0xdc7ce9 || !_0x54962e || !_0x1d6ad3) return null;
  const _0x2f10fc = Cartesian3["distance"](_0xdc7ce9, _0x54962e) / 2;
  return { "scale": _0x2f10fc * SCREEN_DPI / METERS_PER_INCH, "distance": Cartesian3["distance"](_0xf89f07["position"], _0x1d6ad3) };
}
const DISPLAY_SNAP_TOLERANCE = 5e-3;
function snapScaleForDisplay(_0x73c6f2) {
  const _0x38e4f3 = ZOOM_SCALE_STEPS["find"]((_0x2e1ff8) => Math["abs"](_0x73c6f2 - _0x2e1ff8) <= _0x2e1ff8 * DISPLAY_SNAP_TOLERANCE);
  return _0x38e4f3 ?? _0x73c6f2;
}
const ZOOM_ANIMATION_SECONDS = 0.25;
function easeOut(_0x377c66) {
  return 1 - Math["pow"](1 - _0x377c66, 3);
}
const pendingZooms = /* @__PURE__ */ new WeakMap();
function planStepAmount(_0x14e64a, _0x2e999f, _0x1552bf, _0x190581) {
  const _0x2631f5 = nextScaleStep(_0x14e64a["scale"], _0x2e999f);
  if (_0x2631f5 === null) return null;
  let _0x16ae9a = _0x2631f5 === Infinity ? Infinity : _0x14e64a["distance"] * Math["abs"](1 - _0x2631f5 / _0x14e64a["scale"]);
  if (_0x2e999f === -1) _0x16ae9a = Math["min"](_0x16ae9a, _0x190581 - _0x1552bf);
  return _0x16ae9a > 0 && Number["isFinite"](_0x16ae9a) ? _0x16ae9a : null;
}
function flyScaleStep(_0x1fbaac, _0x375ebe, _0x18a53b, _0x3e0f4e) {
  const _0x183fbb = pendingZooms["get"](_0x1fbaac), _0x243bb6 = (_0x183fbb == null ? void 0 : _0x183fbb["ground"]) ?? _0x18a53b();
  if (!_0x243bb6) return;
  const _0xb8100d = (_0x183fbb == null ? void 0 : _0x183fbb["height"]) ?? _0x1fbaac["positionCartographic"]["height"], _0x1974dc = planStepAmount(_0x243bb6, _0x375ebe, _0xb8100d, _0x3e0f4e);
  if (_0x1974dc === null) return;
  const _0x2e3ffa = (_0x183fbb == null ? void 0 : _0x183fbb["position"]) ?? _0x1fbaac["position"], _0x11b798 = _0x1fbaac["direction"], _0x365a41 = _0x1fbaac["position"]["clone"]();
  _0x365a41["x"] = _0x2e3ffa["x"] + _0x11b798["x"] * _0x1974dc * _0x375ebe, _0x365a41["y"] = _0x2e3ffa["y"] + _0x11b798["y"] * _0x1974dc * _0x375ebe, _0x365a41["z"] = _0x2e3ffa["z"] + _0x11b798["z"] * _0x1974dc * _0x375ebe;
  const _0x1be033 = _0x243bb6["distance"] - _0x375ebe * _0x1974dc, _0x5cbc62 = { "ground": { "scale": _0x243bb6["scale"] * _0x1be033 / _0x243bb6["distance"], "distance": _0x1be033 }, "height": _0xb8100d - _0x375ebe * _0x1974dc, "position": _0x365a41 }, _0x131fbc = () => {
    if (pendingZooms["get"](_0x1fbaac) === _0x5cbc62) pendingZooms["delete"](_0x1fbaac);
  };
  _0x1fbaac["flyTo"]({ "destination": _0x365a41, "orientation": { "direction": _0x11b798["clone"](), "up": _0x1fbaac["up"]["clone"]() }, "duration": ZOOM_ANIMATION_SECONDS, "easingFunction": easeOut, "complete": _0x131fbc, "cancel": _0x131fbc }), pendingZooms["set"](_0x1fbaac, _0x5cbc62);
}
function scaleZoomStep(_0x5ab68b, _0x53b8f4) {
  const { camera: _0x1b67d8, scene: _0x128adc } = _0x5ab68b;
  flyScaleStep(_0x1b67d8, _0x53b8f4, () => measureGround(_0x128adc), _0x128adc["screenSpaceCameraController"]["maximumZoomDistance"]);
}
const WHEEL_STEP_THRESHOLD_PX = 40, WHEEL_SMALL_DELTA_LOCK_MS = 200, LINE_HEIGHT_PX = 16, PAGE_HEIGHT_PX = 400;
function wheelDeltaPixels(_0x4ee95f, _0x7c9863) {
  if (_0x7c9863 === 1) return _0x4ee95f * LINE_HEIGHT_PX;
  if (_0x7c9863 === 2) return _0x4ee95f * PAGE_HEIGHT_PX;
  return _0x4ee95f;
}
function installScaleWheelZoom(_0x50c81d) {
  const _0x81926 = _0x50c81d["scene"]["canvas"], _0x2dbf95 = _0x50c81d["scene"]["screenSpaceCameraController"], _0x5b8154 = _0x2dbf95["zoomEventTypes"];
  _0x2dbf95["zoomEventTypes"] = [CameraEventType["MIDDLE_DRAG"], CameraEventType["PINCH"]];
  let _0xee04b7 = 0, _0x4ea649 = 0;
  const _0xd1a908 = (_0x152869) => {
    _0x152869["preventDefault"]();
    const _0x4ae44d = wheelDeltaPixels(_0x152869["deltaY"], _0x152869["deltaMode"]);
    if (_0x4ae44d === 0) return;
    const _0xa9fb7f = performance["now"]();
    if (Math["abs"](_0x4ae44d) < WHEEL_STEP_THRESHOLD_PX && _0xa9fb7f < _0x4ea649) return;
    if (Math["sign"](_0x4ae44d) !== Math["sign"](_0xee04b7)) _0xee04b7 = 0;
    _0xee04b7 += _0x4ae44d;
    if (Math["abs"](_0xee04b7) < WHEEL_STEP_THRESHOLD_PX) return;
    scaleZoomStep(_0x50c81d, _0xee04b7 < 0 ? 1 : -1), _0xee04b7 = 0, _0x4ea649 = _0xa9fb7f + WHEEL_SMALL_DELTA_LOCK_MS;
  };
  return _0x81926["addEventListener"]("wheel", _0xd1a908, { "passive": ![] }), () => {
    _0x81926["removeEventListener"]("wheel", _0xd1a908), _0x2dbf95["zoomEventTypes"] = _0x5b8154;
  };
}
function createMarkerOverlay(_0x51d89f, _0x353ddb, _0x2191ce, _0x278767, _0x58ef84 = {}) {
  const _0x445cfa = Cartesian3["fromDegrees"](_0x353ddb, _0x2191ce), _0x6c1184 = Ellipsoid["WGS84"]["geodeticSurfaceNormal"](_0x445cfa, new Cartesian3()), _0x1dc27b = new Cartesian3(), _0x463a4e = new Cartesian2(), _0x325b54 = document["createElement"]("img");
  _0x325b54["src"] = _0x278767, _0x325b54["alt"] = "", _0x325b54["draggable"] = ![], Object["assign"](_0x325b54["style"], { "position": "absolute", "left": "0", "top": "0", "display": "none", "pointerEvents": "none", "userSelect": "none", "zIndex": "1", "willChange": "transform", ..._0x58ef84["width"] === void 0 ? {} : { "width": _0x58ef84["width"] + "px" }, ..._0x58ef84["height"] === void 0 ? {} : { "height": _0x58ef84["height"] + "px" } }), _0x51d89f["container"]["appendChild"](_0x325b54);
  const _0x55747d = () => {
    const { scene: _0x353b5 } = _0x51d89f;
    let _0x2f08cf = !![];
    _0x353b5["mode"] === SceneMode["SCENE3D"] && (Cartesian3["subtract"](_0x353b5["camera"]["positionWC"], _0x445cfa, _0x1dc27b), _0x2f08cf = Cartesian3["dot"](_0x6c1184, _0x1dc27b) > 0);
    const _0x487bd3 = _0x2f08cf ? _0x353b5["cartesianToCanvasCoordinates"](_0x445cfa, _0x463a4e) : void 0;
    if (!_0x487bd3) {
      _0x325b54["style"]["display"] = "none";
      return;
    }
    _0x325b54["style"]["display"] = "block";
    const _0x292e28 = Math["round"](_0x487bd3["x"] - _0x325b54["offsetWidth"] / 2), _0x17d11b = Math["round"](_0x487bd3["y"] - (_0x58ef84["anchor"] === "center" ? _0x325b54["offsetHeight"] / 2 : _0x325b54["offsetHeight"]));
    _0x325b54["style"]["transform"] = "translate(" + _0x292e28 + "px, " + _0x17d11b + "px)";
  }, _0x1559c8 = _0x51d89f["scene"]["postRender"]["addEventListener"](_0x55747d);
  return _0x325b54["addEventListener"]("load", _0x55747d), _0x55747d(), () => {
    _0x1559c8(), _0x325b54["remove"]();
  };
}
class EventEmitter {
  constructor() {
    this["listeners"] = {};
  }
  ["on"](_0x5d7412, _0x5d17f6) {
    const _0x170900 = this["listeners"][_0x5d7412];
    return _0x170900 !== void 0 ? _0x170900["add"](_0x5d17f6) : this["listeners"][_0x5d7412] = /* @__PURE__ */ new Set([_0x5d17f6]), this;
  }
  ["off"](_0x220cfb, _0x1fffb2) {
    var _a2;
    return (_a2 = this["listeners"][_0x220cfb]) == null ? void 0 : _a2["delete"](_0x1fffb2), this;
  }
  ["once"](_0x4b64e1, _0x2d7884) {
    const _0x596ae0 = (_0x28835a) => {
      _0x2d7884(_0x28835a), this["off"](_0x4b64e1, _0x596ae0);
    };
    return this["on"](_0x4b64e1, _0x596ae0);
  }
  ["emit"](_0x56f9de, _0x2b9951) {
    const _0x455641 = this["listeners"][_0x56f9de];
    if (_0x455641 === void 0) return;
    for (const _0x5050b3 of _0x455641) {
      _0x5050b3(_0x2b9951);
    }
  }
  ["removeAllListeners"](_0x184b2e) {
    if (_0x184b2e !== void 0) delete this["listeners"][_0x184b2e];
    else for (const _0x24e7d8 of Object["keys"](this["listeners"])) {
      delete this["listeners"][_0x24e7d8];
    }
  }
  ["listenerCount"](_0x2e0804) {
    var _a2;
    return ((_a2 = this["listeners"][_0x2e0804]) == null ? void 0 : _a2["size"]) ?? 0;
  }
}
const GLOBAL_STATE_SLOT = Symbol["for"]("@tucbs/core/globalConfigState");
function getState() {
  const _0x30a2c6 = globalThis;
  let _0x533e9a = _0x30a2c6[GLOBAL_STATE_SLOT];
  return !_0x533e9a && (_0x533e9a = { "apiKey": void 0, "apiBase": void 0, "proxyBase": void 0, "configured": ![], "refreshers": /* @__PURE__ */ new Set() }, Object["defineProperty"](globalThis, GLOBAL_STATE_SLOT, { "value": _0x533e9a, "enumerable": ![], "configurable": ![], "writable": ![] })), _0x533e9a;
}
function configureTucbs(_0xf8cbc5) {
  const _0x499ef8 = getState();
  if (_0xf8cbc5["apiBase"] !== void 0) {
    const _0x3dc5d8 = _0xf8cbc5["apiBase"]["trim"]()["replace"](/\/+$/, "");
    _0x499ef8["apiBase"] = _0x3dc5d8 || void 0, _0x499ef8["configured"] = !![];
  }
  if (_0xf8cbc5["proxyBase"] !== void 0) {
    const _0xf5d55d = _0xf8cbc5["proxyBase"]["trim"]();
    _0x499ef8["proxyBase"] = _0xf5d55d || void 0, _0x499ef8["configured"] = !![];
  }
  if (_0xf8cbc5["apiKey"] === void 0) {
    _0x499ef8["configured"] && _0x499ef8["refreshers"]["forEach"]((_0x30af0c) => _0x30af0c());
    return;
  }
  _0x499ef8["apiKey"] !== void 0 && _0xf8cbc5["apiKey"] !== _0x499ef8["apiKey"] && console["warn"]("[@tucbs/core] configureTucbs() daha once farkli bir apiKey ile cagrilmisti; deger degistirildi. Bu beklenmiyorsa sayfada birden fazla script'in ayni fonksiyonu cagirdigini kontrol edin."), _0x499ef8["apiKey"] = _0xf8cbc5["apiKey"], _0x499ef8["configured"] = !![], _0x499ef8["refreshers"]["forEach"]((_0x15a1ab) => _0x15a1ab());
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
function registerApiKeyRefresh(_0x10ad2d) {
  const { refreshers: _0x35fdbb } = getState();
  return _0x35fdbb["add"](_0x10ad2d), () => _0x35fdbb["delete"](_0x10ad2d);
}
const DEFAULT_UCBP_API_BASE = ("http://localhost:8094/ucbp-api" == null ? void 0 : "http://localhost:8094/ucbp-api"["trim"]()) || "/ucbp-api";
function trimSlash$2(_0x3c506e) {
  return _0x3c506e["replace"](/\/+$/, "");
}
function getUcbpApiBase() {
  const _0x3f46ce = getGlobalApiBase();
  if (_0x3f46ce) return trimSlash$2(_0x3f46ce);
  return trimSlash$2(DEFAULT_UCBP_API_BASE);
}
function getProxyBase() {
  const _0x321180 = getGlobalProxyBase();
  if (_0x321180) return _0x321180;
  return console["warn"]("proxyBase yok; configureTucbs({ proxyBase }) verilmedi. main.js'te verilmeli."), "";
}
const ERROR_REGISTRY = { "API_KEY_MISSING": { "code": "API_KEY_MISSING", "number": "E001", "title": "API Anahtarı Eksik", "description": "Ne instance ne configureTucbs() ile ayarlanmış global apiKey sağlanmış." }, "API_KEY_INVALID": { "code": "API_KEY_INVALID", "number": "E002", "title": "API Anahtarı Geçersiz", "description": "Sağlanan apiKey backend tarafından reddedildi veya doğrulama isteği başarısız oldu." }, "INTERNAL_INDEX_OUT_OF_RANGE": { "code": "INTERNAL_INDEX_OUT_OF_RANGE", "number": "E003", "title": "İç Durum Hatası", "description": "Beklenen bir dizi indeksi bulunamadı (iç tutarlılık hatası)." }, "OGC_CAPABILITIES_REQUEST_FAILED": { "code": "OGC_CAPABILITIES_REQUEST_FAILED", "number": "E201", "title": "GetCapabilities İsteği Başarısız", "description": "WFS GetCapabilities isteği HTTP hata koduyla döndü." }, "OGC_CAPABILITIES_EXCEPTION": { "code": "OGC_CAPABILITIES_EXCEPTION", "number": "E202", "title": "GetCapabilities OGC Exception", "description": "WFS GetCapabilities yanıtı bir OGC ExceptionReport/ServiceExceptionReport döndürdü." }, "OGC_CAPABILITIES_PARSE_FAILED": { "code": "OGC_CAPABILITIES_PARSE_FAILED", "number": "E203", "title": "GetCapabilities Ayrıştırma Hatası", "description": "WFS GetCapabilities yanıtı geçerli XML olarak ayrıştırılamadı." }, "OGC_FEATURE_TYPE_NOT_FOUND": { "code": "OGC_FEATURE_TYPE_NOT_FOUND", "number": "E204", "title": "FeatureType Bulunamadı", "description": "WFS GetCapabilities yanıtında hiç FeatureType bulunamadı." }, "CRS_UNRESOLVED_UNSUPPORTED": { "code": "CRS_UNRESOLVED_UNSUPPORTED", "number": "E401", "title": "Koordinat Sistemi Tanınamadı", "description": "GeoJSON'daki koordinat sistemi (CRS) çözülemedi ve koordinatlar WGS84 ile uyumlu değil." }, "CRS_CLAIMED_WGS84_INVALID": { "code": "CRS_CLAIMED_WGS84_INVALID", "number": "E402", "title": "Koordinatlar WGS84 İle Uyumsuz", "description": "GeoJSON WGS84/CRS84 olduğunu belirtiyor ama koordinatlar geçerli bir enlem/boylam aralığında değil." }, "CRS_MISSING_UNSUPPORTED": { "code": "CRS_MISSING_UNSUPPORTED", "number": "E403", "title": "Koordinat Sistemi Bilgisi Yok", "description": "GeoJSON'da CRS bilgisi yok ve koordinatlar geçerli bir enlem/boylam aralığında değil." }, "ANALYSIS_API_KEY_MISSING": { "code": "ANALYSIS_API_KEY_MISSING", "number": "E301", "title": "Analiz İçin API Anahtarı Eksik", "description": "AnalysisManager'a apiKey tanımlanmadan analiz isteği yapıldı." }, "ANALYSIS_NETWORK_ERROR": { "code": "ANALYSIS_NETWORK_ERROR", "number": "E302", "title": "Analiz Ağ Hatası", "description": "Analiz isteği ağ seviyesinde (fetch) başarısız oldu." }, "ANALYSIS_REQUEST_FAILED": { "code": "ANALYSIS_REQUEST_FAILED", "number": "E303", "title": "Analiz İsteği Başarısız", "description": "Analiz backend'i HTTP hata koduyla döndü." }, "ANALYSIS_UNSUCCESSFUL": { "code": "ANALYSIS_UNSUCCESSFUL", "number": "E304", "title": "Analiz Başarısız", "description": "Analiz backend'i HTTP 200 döndü ama isSuccess/success=false işaretledi." }, "ANALYSIS_RESPONSE_MISSING_GEOJSON": { "code": "ANALYSIS_RESPONSE_MISSING_GEOJSON", "number": "E305", "title": "Analiz Yanıtı Eksik", "description": "Analiz backend'i başarılı yanıt döndü ama sonuç geojson içermiyor." }, "LAYER_AUTHORIZED_LIST_API_KEY_MISSING": { "code": "LAYER_AUTHORIZED_LIST_API_KEY_MISSING", "number": "E101", "title": "Yetkili Katman Listesi İçin API Anahtarı Gerekli", "description": "getAuthorizedLayers() apiKey ayarlanmadan çağrıldı." }, "LAYER_GEOTIFF_EXPORT_UNSUPPORTED_TYPE": { "code": "LAYER_GEOTIFF_EXPORT_UNSUPPORTED_TYPE", "number": "E102", "title": "GeoTIFF Export Desteklenmiyor", "description": "GeoTIFF export sadece WMS/WCS katmanlarında desteklenir." }, "LAYER_GEOTIFF_EXPORT_NOT_CONFIGURED": { "code": "LAYER_GEOTIFF_EXPORT_NOT_CONFIGURED", "number": "E103", "title": "GeoTIFF Export Yapılandırılmamış", "description": "Katman GeoTIFF export için gerekli tiffFormat seçeneğine sahip değil." }, "LAYER_STYLE_NOT_VECTOR": { "code": "LAYER_STYLE_NOT_VECTOR", "number": "E104", "title": "Stil Sadece Vektör Katmanlarda", "description": "applyLayerStyle() sadece vektör (Entity tabanlı) katmanlarda kullanılabilir." }, "LAYER_TYPE_UNSUPPORTED_XYZ": { "code": "LAYER_TYPE_UNSUPPORTED_XYZ", "number": "E105", "title": "XYZ Katmanı add() İle Desteklenmiyor", "description": "XYZ katmanı add() ile eklenemez, Map.setBasemap() kullanılmalı." }, "LAYER_TYPE_UNSUPPORTED_DRAWING": { "code": "LAYER_TYPE_UNSUPPORTED_DRAWING", "number": "E106", "title": "DRAWING Katmanı add() İle Desteklenmiyor", "description": "DRAWING katmanı DrawingManager tarafından otomatik eklenir, add() ile eklenemez." }, "LAYER_TYPE_UNSUPPORTED_MEASURE": { "code": "LAYER_TYPE_UNSUPPORTED_MEASURE", "number": "E107", "title": "MEASURE Katmanı add() İle Desteklenmiyor", "description": "MEASURE katmanı DrawingManager tarafından otomatik eklenir, add() ile eklenemez." }, "LAYER_WMS_LAYERS_EMPTY": { "code": "LAYER_WMS_LAYERS_EMPTY", "number": "E108", "title": "WMS layers Parametresi Boş", "description": "WMS katmanı eklenirken layers (ogcLayerName) parametresi boş." }, "LAYER_GEOTIFF_UNSUPPORTED": { "code": "LAYER_GEOTIFF_UNSUPPORTED", "number": "E109", "title": "GeoTIFF Katmanı Desteklenmiyor", "description": "GeoTIFF katmanı mevcut Cesium sürümünde desteklenmiyor." }, "LAYER_SHP_PACKAGE_MISSING": { "code": "LAYER_SHP_PACKAGE_MISSING", "number": "E110", "title": "shpjs Paketi Eksik", "description": 'SHP katmanı için gereken "shpjs" paketi tüketici uygulamaya eklenmemiş.' }, "LAYER_CSV_PACKAGE_MISSING": { "code": "LAYER_CSV_PACKAGE_MISSING", "number": "E111", "title": "papaparse Paketi Eksik", "description": 'CSV katmanı için gereken "papaparse" paketi tüketici uygulamaya eklenmemiş.' }, "LAYER_CSV_LATLON_NOT_FOUND": { "code": "LAYER_CSV_LATLON_NOT_FOUND", "number": "E112", "title": "CSV'de lat/lon Sütunu Bulunamadı", "description": "CSV içinde lat/lon sütunları otomatik tespit edilemedi." }, "LAYER_NOT_FOUND": { "code": "LAYER_NOT_FOUND", "number": "E113", "title": "Katman Bulunamadı", "description": "Verilen id'ye sahip bir katman yönetimde kayıtlı değil." }, "LAYER_ID_ALREADY_EXISTS": { "code": "LAYER_ID_ALREADY_EXISTS", "number": "E114", "title": "Katman ID'si Zaten Kayıtlı", "description": "Verilen id ile zaten bir katman eklenmiş." }, "LAYER_TYPE_MISMATCH": { "code": "LAYER_TYPE_MISMATCH", "number": "E115", "title": "Katman Tipi Uyuşmuyor", "description": "Katman beklenen tipte (WMS/WMTS) değil." }, "LAYER_SERVICE_OPTIONS_NOT_FOUND": { "code": "LAYER_SERVICE_OPTIONS_NOT_FOUND", "number": "E116", "title": "Servis Seçenekleri Bulunamadı", "description": "Katman için orijinal servis seçenekleri (serviceLayerOptions) bulunamadı." }, "LAYER_NOT_RASTER": { "code": "LAYER_NOT_RASTER", "number": "E117", "title": "Katman Raster Değil", "description": "İşlem sadece raster (ImageryLayer) katmanlarda desteklenir." }, "OGC_AUTHORIZED_LAYERS_REQUEST_FAILED": { "code": "OGC_AUTHORIZED_LAYERS_REQUEST_FAILED", "number": "E205", "title": "Yetkili Katman Listesi Alınamadı", "description": "getAuthorizedLayers() isteği HTTP hata koduyla döndü." }, "OGC_GEOTIFF_DOWNLOAD_FAILED": { "code": "OGC_GEOTIFF_DOWNLOAD_FAILED", "number": "E206", "title": "GeoTIFF İndirilemedi", "description": "GeoTIFF export isteği HTTP hata koduyla döndü." }, "OGC_WFS_JSON_FORMAT_UNSUPPORTED": { "code": "OGC_WFS_JSON_FORMAT_UNSUPPORTED", "number": "E207", "title": "WFS JSON Format İlan Etmiyor", "description": "WFS sunucusu GetCapabilities yanıtında JSON çıktı formatı ilan etmiyor." }, "OGC_WFS_GEOJSON_REQUEST_FAILED": { "code": "OGC_WFS_GEOJSON_REQUEST_FAILED", "number": "E208", "title": "WFS GeoJSON İsteği Başarısız", "description": "WFS GetFeature (GeoJSON çıktı) isteği başarısız oldu." }, "OGC_WFS_REQUEST_FAILED": { "code": "OGC_WFS_REQUEST_FAILED", "number": "E209", "title": "WFS İsteği Başarısız", "description": "WFS GetFeature (GML çıktı) isteği HTTP hata koduyla döndü." }, "OGC_WFS_EXCEPTION": { "code": "OGC_WFS_EXCEPTION", "number": "E210", "title": "WFS OGC Exception", "description": "WFS GetFeature yanıtı bir OGC ExceptionReport döndürdü." }, "OGC_WFS_OL_PACKAGE_MISSING": { "code": "OGC_WFS_OL_PACKAGE_MISSING", "number": "E211", "title": "ol Paketi Eksik", "description": 'WFS GML yanıtını okumak için gereken "ol" paketi tüketici uygulamaya eklenmemiş.' }, "OGC_WCS_REQUEST_FAILED": { "code": "OGC_WCS_REQUEST_FAILED", "number": "E212", "title": "WCS İsteği Başarısız", "description": "WCS GetCoverage isteği HTTP hata koduyla döndü." }, "OGC_WCS_MULTIPART_IMAGE_NOT_FOUND": { "code": "OGC_WCS_MULTIPART_IMAGE_NOT_FOUND", "number": "E213", "title": "WCS Multipart Görsel Bulunamadı", "description": "Multipart WCS yanıtında görsel (image) parçası bulunamadı." }, "LAYER_PREVIEW_UNSUPPORTED_XYZ": { "code": "LAYER_PREVIEW_UNSUPPORTED_XYZ", "number": "E118", "title": "XYZ Katmanı Önizlemede Desteklenmiyor", "description": "TucbsMapPreview XYZ katman tipini önizlemede desteklemiyor." }, "LAYER_PREVIEW_UNSUPPORTED_DRAWING": { "code": "LAYER_PREVIEW_UNSUPPORTED_DRAWING", "number": "E119", "title": "DRAWING Katmanı Önizlemede Desteklenmiyor", "description": "TucbsMapPreview DRAWING katman tipini önizlemede desteklemiyor." }, "LAYER_PREVIEW_UNSUPPORTED_MEASURE": { "code": "LAYER_PREVIEW_UNSUPPORTED_MEASURE", "number": "E120", "title": "MEASURE Katmanı Önizlemede Desteklenmiyor", "description": "TucbsMapPreview MEASURE katman tipini önizlemede desteklemiyor." }, "LAYER_MANAGER_NOT_READY": { "code": "LAYER_MANAGER_NOT_READY", "number": "E121", "title": "Harita Hazır Değil", "description": "Katman eklenmeye çalışıldığında LayerManager henüz hazır değildi." }, "LAYER_AUTHORIZED_ADD_MISSING_INFO": { "code": "LAYER_AUTHORIZED_ADD_MISSING_INFO", "number": "E122", "title": "Yetkili Katman Eklenemedi", "description": "Yetkili katman için gerekli servis bilgisi (ör. WMTS TileMatrixSet) eksik." }, "OGC_SERVICE_DISCOVERY_PARSE_FAILED": { "code": "OGC_SERVICE_DISCOVERY_PARSE_FAILED", "number": "E214", "title": "Servis Keşfi Ayrıştırma Hatası", "description": "TucbsServiceUpload'da GetCapabilities yanıtı geçerli XML olarak ayrıştırılamadı." }, "LAYER_WMTS_TILEMATRIXSET_MISSING": { "code": "LAYER_WMTS_TILEMATRIXSET_MISSING", "number": "E123", "title": "TileMatrixSet Bilgisi Bulunamadı", "description": "Keşfedilen WMTS katmanı için TileMatrixSet bilgisi bulunamadı." } };
function getErrorCodes() {
  return ERROR_REGISTRY;
}
class TucbsError extends Error {
  constructor(_0x1894bf, _0xca1d72, _0x421e3d) {
    const _0x2b6f0b = ERROR_REGISTRY[_0x1894bf];
    super(_0xca1d72 ?? _0x2b6f0b["description"]), this["name"] = "TucbsError", this["code"] = _0x1894bf, this["number"] = _0x2b6f0b["number"], this["title"] = _0x421e3d ?? _0x2b6f0b["title"];
  }
}
class LayerOperationError extends TucbsError {
  constructor(_0x4927a9, _0x2a97d1, _0x152de5) {
    super(_0x4927a9, _0x2a97d1, _0x152de5), this["name"] = "LayerOperationError";
  }
}
class OgcRequestError extends TucbsError {
  constructor(_0x320d2a, _0x24e4d0, _0x3ccb88) {
    super(_0x320d2a, _0x24e4d0, _0x3ccb88), this["name"] = "OgcRequestError";
  }
}
class AnalysisRequestError extends TucbsError {
  constructor(_0x1742b2, _0x51fb33, _0x1e2021) {
    super(_0x1742b2, _0x51fb33, _0x1e2021), this["name"] = "AnalysisRequestError";
  }
}
class GeometryError extends TucbsError {
  constructor(_0x28b449, _0x50720a, _0x356848) {
    super(_0x28b449, _0x50720a, _0x356848), this["name"] = "GeometryError";
  }
}
class ApiKeyValidationError extends TucbsError {
  constructor(_0x2d21da, _0x3a79bc) {
    super((_0x3a79bc == null ? void 0 : _0x3a79bc["code"]) ?? "API_KEY_INVALID", _0x2d21da, (_0x3a79bc == null ? void 0 : _0x3a79bc["title"]) ?? "API Hatası"), this["name"] = "ApiKeyValidationError";
    if ((_0x3a79bc == null ? void 0 : _0x3a79bc["reason"]) !== void 0) this["reason"] = _0x3a79bc["reason"];
    if ((_0x3a79bc == null ? void 0 : _0x3a79bc["detail"]) !== void 0) this["detail"] = _0x3a79bc["detail"];
  }
}
const _ApiKeyPolicy = class _ApiKeyPolicy {
  constructor(_0x556c49) {
    __privateAdd(this, _apiKey);
    this["getApiBase"] = _0x556c49["apiBase"];
  }
  ["configure"](_0x3a3e25) {
    _0x3a3e25["apiKey"] !== void 0 && __privateSet(this, _apiKey, _0x3a3e25["apiKey"]), _0x3a3e25["trustedApiKeyHosts"] !== void 0 && (this["trustedApiKeyHosts"] = _0x3a3e25["trustedApiKeyHosts"]), _0x3a3e25["apiKeyDiscoveryUrl"] !== void 0 && (this["apiKeyDiscoveryUrl"] = _0x3a3e25["apiKeyDiscoveryUrl"]);
  }
  get ["hasApiKey"]() {
    return __privateGet(this, _apiKey) !== void 0;
  }
  async ["getAuthorizedLayers"]() {
    if (__privateGet(this, _apiKey) === void 0) throw new LayerOperationError("LAYER_AUTHORIZED_LIST_API_KEY_MISSING", "getAuthorizedLayers() icin apiKey gerekli — Map/LayerManager.configure({apiKey}) ile atayin.");
    const _0x18107d = this["apiKeyDiscoveryUrl"] ?? this["getApiBase"]()["replace"](/\/+$/, "") + "/layers", _0x123c41 = await fetch(_0x18107d, { "headers": { [_ApiKeyPolicy["API_KEY_HEADER_NAME"]]: __privateGet(this, _apiKey) } });
    if (!_0x123c41["ok"]) throw new OgcRequestError("OGC_AUTHORIZED_LAYERS_REQUEST_FAILED", "Yetkili katman listesi alinamadi: " + _0x123c41["status"] + " " + _0x123c41["statusText"]);
    const _0x4eff61 = await _0x123c41["json"](), _0x3a6e43 = Array["isArray"](_0x4eff61) ? _0x4eff61 : _0x4eff61["object"] ?? [];
    return _0x3a6e43["map"]((_0x411a1d) => this["normalizeAuthorizedLayer"](_0x411a1d));
  }
  async ["getLayerList"]() {
    return this["getAuthorizedLayers"]();
  }
  ["canAddAuthorizedLayer"](_0x50fd2c) {
    var _a2, _b;
    const _0x1e30d3 = (_0x50fd2c["servisTuru"] || "")["toUpperCase"]();
    if (!((_a2 = _0x50fd2c["servisUrl"]) == null ? void 0 : _a2["trim"]()) || !this["resolveOgcLayerName"](_0x50fd2c["ogcLayerName"], _0x50fd2c["katmanAdi"])) return ![];
    if (_0x1e30d3 === "WMTS") return !!((_b = _0x50fd2c["wmtsTileMatrixSet"]) == null ? void 0 : _b["trim"]());
    return _0x1e30d3 === "WMS" || _0x1e30d3 === "WFS";
  }
  ["resolveAddOptions"](_0x159a80) {
    var _a2;
    if (!this["canAddAuthorizedLayer"](_0x159a80)) throw new LayerOperationError("LAYER_AUTHORIZED_ADD_MISSING_INFO", ((_a2 = _0x159a80["servisTuru"]) == null ? void 0 : _a2["toUpperCase"]()) === "WMTS" ? "WMTS için TileMatrixSet eksik." : "Eksik servis bilgisi.");
    const _0x531826 = _0x159a80["servisTuru"]["toUpperCase"](), _0x557b78 = "authorized-" + this["authorizedLayerKey"](_0x159a80) + "-" + Date["now"](), _0x38d4ea = this["resolveOgcLayerName"](_0x159a80["ogcLayerName"], _0x159a80["katmanAdi"]), _0x5c2af0 = _0x159a80["katmanAdi"] || _0x38d4ea;
    if (_0x531826 === "WMS") return { "layerType": "WMS", "options": { "id": _0x557b78, "title": _0x5c2af0, "url": _0x159a80["servisUrl"], "layers": _0x38d4ea } };
    if (_0x531826 === "WFS") return { "layerType": "WFS", "options": { "id": _0x557b78, "title": _0x5c2af0, "url": _0x159a80["servisUrl"], "typeName": _0x38d4ea } };
    return { "layerType": "WMTS", "options": { "id": _0x557b78, "title": _0x5c2af0, "url": _0x159a80["servisUrl"], "layer": _0x38d4ea, "tileMatrixSetID": _0x159a80["wmtsTileMatrixSet"] } };
  }
  ["authorizedLayerKey"](_0x444eb3) {
    return _0x444eb3["id"] ?? _0x444eb3["servisTuru"] + "|" + _0x444eb3["servisUrl"] + "|" + _0x444eb3["ogcLayerName"];
  }
  ["normalizeAuthorizedLayer"](_0x545f5a) {
    const _0x2a38b6 = this["resolveOgcLayerName"](_0x545f5a["ogcLayerName"], _0x545f5a["katmanAdi"]), _0x2f2009 = this["rewriteOpaqueOgcUrl"](_0x545f5a["servisUrl"]), _0x3174c9 = _0x545f5a["servisTuru"]["toUpperCase"]();
    return { ..._0x545f5a, "servisTuru": _0x3174c9, ..._0x2a38b6 && _0x2a38b6 !== _0x545f5a["ogcLayerName"] ? { "ogcLayerName": _0x2a38b6 } : {}, ..._0x2f2009 !== _0x545f5a["servisUrl"] ? { "servisUrl": _0x2f2009 } : {} };
  }
  ["resolveOgcLayerName"](_0x40cda4, _0x69532b) {
    for (const _0x1907e0 of [_0x40cda4, _0x69532b]) {
      if (!_0x1907e0) continue;
      const _0x304f34 = _0x1907e0["trim"]();
      if (!_0x304f34 || _0x304f34["toLowerCase"]() === "undefined" || _0x304f34["toLowerCase"]() === "null") continue;
      return _0x304f34;
    }
    return "";
  }
  ["isTrustedApiKeyHost"](_0x3225a1) {
    if (__privateGet(this, _apiKey) === void 0) return ![];
    return this["isKnownGatedUrl"](_0x3225a1);
  }
  ["layerRequiresApiKey"](_0x55de13) {
    return this["isKnownGatedUrl"](_0x55de13);
  }
  ["isKnownGatedUrl"](_0x338ea4) {
    if (this["isOwnBackendUrl"](_0x338ea4)) return !![];
    if (this["trustedApiKeyHosts"] === void 0 || this["trustedApiKeyHosts"]["length"] === 0) return ![];
    try {
      return this["trustedApiKeyHosts"]["includes"](new URL(_0x338ea4)["hostname"]);
    } catch {
      return ![];
    }
  }
  ["isOwnBackendUrl"](_0x53223b) {
    try {
      const _0x4ff50d = new URL(_0x53223b, window["location"]["origin"]), _0x1da068 = new URL(this["getApiBase"](), window["location"]["origin"]);
      if (_0x4ff50d["hostname"] !== _0x1da068["hostname"]) return ![];
      return _0x4ff50d["pathname"]["includes"]("/wms-proxy/") || _0x4ff50d["pathname"]["includes"]("/ogc/");
    } catch {
      return ![];
    }
  }
  ["rewriteOpaqueOgcUrl"](_0x345415) {
    if (!(_0x345415 == null ? void 0 : _0x345415["includes"]("/ogc/"))) return _0x345415 ?? "";
    const _0x4d161a = _0x345415["indexOf"]("/ogc/"), _0x3cf668 = _0x345415["substring"](_0x4d161a), _0x50c549 = this["getApiBase"]()["replace"](/\/+$/, "");
    return "" + _0x50c549 + _0x3cf668;
  }
  ["resolveOgcProxyUrl"](_0x3ff39d, _0x3e8f18) {
    if (__privateGet(this, _apiKey) === void 0) return _0x3e8f18;
    if (_0x3e8f18["includes"]("/ogc/")) return this["rewriteOpaqueOgcUrl"](_0x3e8f18);
    if (_0x3e8f18["includes"]("/wms-proxy/")) return _0x3e8f18;
    const _0x2aff0f = this["getApiBase"]()["replace"](/\/+$/, "") + "/wms-proxy/" + _0x3ff39d, _0x4b9ce4 = _0x2aff0f["includes"]("?") ? "&" : "?";
    return "" + _0x2aff0f + _0x4b9ce4 + "url=" + encodeURIComponent(_0x3e8f18);
  }
  ["mergeApiKeyHeader"](_0x29acbc, _0x594524) {
    if (!this["isTrustedApiKeyHost"](_0x594524)) return _0x29acbc;
    return { ..._0x29acbc, [_ApiKeyPolicy["API_KEY_HEADER_NAME"]]: __privateGet(this, _apiKey) };
  }
  ["attachApiKeyToUrl"](_0x22e29e) {
    if (!this["isTrustedApiKeyHost"](_0x22e29e)) return _0x22e29e;
    const _0x24fa74 = _0x22e29e["includes"]("?") ? "&" : "?";
    return "" + _0x22e29e + _0x24fa74 + _ApiKeyPolicy["API_KEY_QUERY_PARAM_NAME"] + "=" + encodeURIComponent(__privateGet(this, _apiKey));
  }
  ["buildAuthHeaders"](_0xdc5c4b) {
    if (_0xdc5c4b === void 0) return void 0;
    return { "Authorization": "Bearer " + _0xdc5c4b };
  }
};
_apiKey = new WeakMap();
_ApiKeyPolicy["API_KEY_HEADER_NAME"] = "X-API-Key";
_ApiKeyPolicy["API_KEY_QUERY_PARAM_NAME"] = "tucbsapikey";
let ApiKeyPolicy = _ApiKeyPolicy;
function cartesianToLonLat(_0x5bf373) {
  const _0x56dbf2 = Cartographic["fromCartesian"](_0x5bf373);
  return [_0x3bd2fa["toDegrees"](_0x56dbf2["longitude"]), _0x3bd2fa["toDegrees"](_0x56dbf2["latitude"])];
}
function closeRing$1(_0x239958) {
  if (_0x239958["length"] === 0) return _0x239958;
  const _0x5ecbb7 = _0x239958[0], _0x3e0b65 = _0x239958[_0x239958["length"] - 1];
  if (_0x5ecbb7[0] === _0x3e0b65[0] && _0x5ecbb7[1] === _0x3e0b65[1]) return _0x239958;
  return [..._0x239958, _0x5ecbb7];
}
function entityToGeoJSON(_0x1a9018, _0x2725f3 = JulianDate["now"]()) {
  var _a2, _b, _c;
  const _0x422d02 = ((_a2 = _0x1a9018["properties"]) == null ? void 0 : _a2["getValue"](_0x2725f3)) ?? {}, _0x41b9e6 = { ..._0x422d02 };
  delete _0x41b9e6["layerId"], delete _0x41b9e6["featureId"];
  let _0x2a41ba = null;
  if ((_b = _0x1a9018["polygon"]) == null ? void 0 : _b["hierarchy"]) {
    const _0x598c77 = _0x1a9018["polygon"]["hierarchy"]["getValue"](_0x2725f3), _0x101af2 = _0x598c77 == null ? void 0 : _0x598c77["positions"];
    if (_0x101af2 && _0x101af2["length"] >= 3) {
      const _0xbf6a72 = closeRing$1(_0x101af2["map"](cartesianToLonLat));
      _0x2a41ba = { "type": "Polygon", "coordinates": [_0xbf6a72] };
    }
  } else {
    if ((_c = _0x1a9018["polyline"]) == null ? void 0 : _c["positions"]) {
      const _0x4c9d57 = _0x1a9018["polyline"]["positions"]["getValue"](_0x2725f3);
      _0x4c9d57 && _0x4c9d57["length"] >= 2 && (_0x2a41ba = { "type": "LineString", "coordinates": _0x4c9d57["map"](cartesianToLonLat) });
    } else {
      if (_0x1a9018["position"]) {
        const _0x23f16a = _0x1a9018["position"]["getValue"](_0x2725f3);
        _0x23f16a && (_0x2a41ba = { "type": "Point", "coordinates": cartesianToLonLat(_0x23f16a) });
      }
    }
  }
  if (!_0x2a41ba) return null;
  return { "type": "Feature", "id": _0x1a9018["id"], "properties": _0x41b9e6, "geometry": _0x2a41ba };
}
function featureLabel(_0x223037) {
  var _a2;
  const _0x2b8d59 = ((_a2 = _0x223037["geometry"]) == null ? void 0 : _a2["type"]) ?? "Feature", _0x5939ec = _0x223037["id"] != null ? String(_0x223037["id"]) : "";
  return _0x5939ec ? _0x2b8d59 + " " + _0x5939ec : _0x2b8d59;
}
function triggerDownload(_0x11d1e6, _0x40aea1) {
  const _0x8227b8 = URL["createObjectURL"](_0x11d1e6), _0xfba9f9 = document["createElement"]("a");
  _0xfba9f9["href"] = _0x8227b8, _0xfba9f9["download"] = _0x40aea1, document["body"]["appendChild"](_0xfba9f9), _0xfba9f9["click"](), _0xfba9f9["remove"](), setTimeout(() => URL["revokeObjectURL"](_0x8227b8), 1e3);
}
function featureCollectionToKml(_0x582d05) {
  const _0x3bb181 = _0x582d05["features"]["map"]((_0x13f517, _0x232d5e) => featureToKml(_0x13f517, _0x232d5e))["join"]("");
  return '<?xml version="1.0" encoding="UTF-8"?>\n<kml xmlns="http://www.opengis.net/kml/2.2"><Document>' + _0x3bb181 + "</Document></kml>";
}
function featureCollectionToShapefileZip(_0x4921e4) {
  const _0xbde10 = collectShpRecords(_0x4921e4), _0x221e86 = writeShp(_0xbde10), _0xbe6387 = writeShx(_0xbde10), _0x145990 = writeDbf(_0xbde10["map"]((_0x1e9205) => _0x1e9205["name"]));
  return zipStore([{ "name": "export.shp", "data": _0x221e86 }, { "name": "export.shx", "data": _0xbe6387 }, { "name": "export.dbf", "data": _0x145990 }]);
}
function featureToKml(_0x2039e9, _0x4ccff4) {
  const _0xb69dd1 = xmlEscape(featureName(_0x2039e9, _0x4ccff4)), _0x228fb3 = geometryToKml(_0x2039e9["geometry"]);
  if (!_0x228fb3) return "";
  return "<Placemark><name>" + _0xb69dd1 + "</name>" + _0x228fb3 + "</Placemark>";
}
function geometryToKml(_0x127763) {
  if (!_0x127763) return "";
  switch (_0x127763["type"]) {
    case "Point":
      return "<Point><coordinates>" + coord(_0x127763["coordinates"]) + "</coordinates></Point>";
    case "MultiPoint":
      return "<MultiGeometry>" + _0x127763["coordinates"]["map"]((_0x1af10e) => "<Point><coordinates>" + coord(_0x1af10e) + "</coordinates></Point>")["join"]("") + "</MultiGeometry>";
    case "LineString":
      return "<LineString><coordinates>" + line(_0x127763["coordinates"]) + "</coordinates></LineString>";
    case "MultiLineString":
      return "<MultiGeometry>" + _0x127763["coordinates"]["map"]((_0x185114) => "<LineString><coordinates>" + line(_0x185114) + "</coordinates></LineString>")["join"]("") + "</MultiGeometry>";
    case "Polygon":
      return polygonKml(_0x127763["coordinates"]);
    case "MultiPolygon":
      return "<MultiGeometry>" + _0x127763["coordinates"]["map"]((_0x5e832f) => polygonKml(_0x5e832f))["join"]("") + "</MultiGeometry>";
    case "GeometryCollection":
      return "<MultiGeometry>" + _0x127763["geometries"]["map"]((_0x1b54d6) => geometryToKml(_0x1b54d6))["join"]("") + "</MultiGeometry>";
    default:
      return "";
  }
}
function polygonKml(_0x3f8201) {
  const [_0x4617c5, ..._0x565a7e] = _0x3f8201;
  if (!_0x4617c5) return "";
  const _0x337e14 = _0x565a7e["map"]((_0x49c97d) => "<innerBoundaryIs><LinearRing><coordinates>" + line(_0x49c97d) + "</coordinates></LinearRing></innerBoundaryIs>")["join"]("");
  return "<Polygon><outerBoundaryIs><LinearRing><coordinates>" + line(_0x4617c5) + "</coordinates></LinearRing></outerBoundaryIs>" + _0x337e14 + "</Polygon>";
}
function coord(_0x58704c) {
  return _0x58704c[0] + "," + _0x58704c[1] + ",0";
}
function line(_0x2d4dbd) {
  return _0x2d4dbd["map"](coord)["join"](" ");
}
function xmlEscape(_0x15e867) {
  return _0x15e867["replaceAll"]("&", "&amp;")["replaceAll"]("<", "&lt;")["replaceAll"](">", "&gt;")["replaceAll"]('"', "&quot;");
}
function collectShpRecords(_0x115ea9) {
  const _0x50021b = firstKind(_0x115ea9);
  if (!_0x50021b) return [];
  const _0x361fdf = [];
  return _0x115ea9["features"]["forEach"]((_0x38feef, _0xe67ea5) => {
    for (const _0x5cd58f of ringsForKind(_0x38feef["geometry"], _0x50021b)) {
      const _0x404f5d = _0x5cd58f["map"](closeRing), _0x4ca8e1 = _0x50021b === 5 ? orientPolygon(_0x404f5d) : _0x404f5d;
      _0x361fdf["push"]({ "kind": _0x50021b, "name": featureName(_0x38feef, _0xe67ea5), "rings": _0x4ca8e1, "bbox": bboxOf(_0x4ca8e1) });
    }
  }), _0x361fdf;
}
function firstKind(_0x549533) {
  for (const _0xf1bf2f of _0x549533["features"]) {
    const _0x522198 = kindOf(_0xf1bf2f["geometry"]);
    if (_0x522198) return _0x522198;
  }
  return null;
}
function kindOf(_0x266641) {
  if (!_0x266641) return null;
  switch (_0x266641["type"]) {
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
      for (const _0x564e49 of _0x266641["geometries"]) {
        const _0x3f5827 = kindOf(_0x564e49);
        if (_0x3f5827) return _0x3f5827;
      }
      return null;
    default:
      return null;
  }
}
function ringsForKind(_0x37b651, _0x34af23) {
  if (!_0x37b651 || kindOf(_0x37b651) !== _0x34af23) {
    if ((_0x37b651 == null ? void 0 : _0x37b651["type"]) === "GeometryCollection") return _0x37b651["geometries"]["flatMap"]((_0x2850c3) => ringsForKind(_0x2850c3, _0x34af23));
    return [];
  }
  switch (_0x37b651["type"]) {
    case "Point":
      return [[[_0x37b651["coordinates"]]]];
    case "MultiPoint":
      return _0x37b651["coordinates"]["map"]((_0xd7ed9d) => [[_0xd7ed9d]]);
    case "LineString":
      return [[_0x37b651["coordinates"]]];
    case "MultiLineString":
      return [_0x37b651["coordinates"]];
    case "Polygon":
      return [_0x37b651["coordinates"]];
    case "MultiPolygon":
      return _0x37b651["coordinates"];
    default:
      return [];
  }
}
function closeRing(_0x25e70e) {
  const _0x3c09e3 = _0x25e70e[0], _0x48c6de = _0x25e70e[_0x25e70e["length"] - 1];
  if (!_0x3c09e3 || !_0x48c6de) return _0x25e70e;
  if (_0x3c09e3[0] === _0x48c6de[0] && _0x3c09e3[1] === _0x48c6de[1]) return _0x25e70e;
  return [..._0x25e70e, _0x3c09e3];
}
function orientPolygon(_0x1b9f1d) {
  return _0x1b9f1d["map"]((_0x2f8cd2, _0x169878) => {
    const _0x208303 = signedArea(_0x2f8cd2), _0x2339f6 = _0x169878 === 0, _0x478b82 = _0x208303 < 0;
    if (_0x2339f6 === _0x478b82) return _0x2f8cd2;
    return [..._0x2f8cd2]["reverse"]();
  });
}
function signedArea(_0x42900c) {
  let _0x418d7f = 0;
  for (let _0x242c09 = 0; _0x242c09 < _0x42900c["length"] - 1; _0x242c09++) {
    const _0x5421ea = _0x42900c[_0x242c09], _0x50abe8 = _0x42900c[_0x242c09 + 1], _0x5d2e4f = _0x5421ea == null ? void 0 : _0x5421ea[0], _0x1dea4a = _0x5421ea == null ? void 0 : _0x5421ea[1], _0x2053f4 = _0x50abe8 == null ? void 0 : _0x50abe8[0], _0x3833a3 = _0x50abe8 == null ? void 0 : _0x50abe8[1];
    if (_0x5d2e4f === void 0 || _0x1dea4a === void 0 || _0x2053f4 === void 0 || _0x3833a3 === void 0) continue;
    _0x418d7f += _0x5d2e4f * _0x3833a3 - _0x2053f4 * _0x1dea4a;
  }
  return _0x418d7f / 2;
}
function bboxOf(_0x1a40b8) {
  let _0xaffd64 = Infinity, _0x3a81b2 = Infinity, _0xc3e723 = -Infinity, _0x5c9677 = -Infinity;
  for (const _0x305645 of _0x1a40b8) {
    for (const _0x25136e of _0x305645) {
      const [_0xc6e76a, _0x503b3e] = xy(_0x25136e);
      _0xaffd64 = Math["min"](_0xaffd64, _0xc6e76a), _0x3a81b2 = Math["min"](_0x3a81b2, _0x503b3e), _0xc3e723 = Math["max"](_0xc3e723, _0xc6e76a), _0x5c9677 = Math["max"](_0x5c9677, _0x503b3e);
    }
  }
  if (!Number["isFinite"](_0xaffd64)) return [0, 0, 0, 0];
  return [_0xaffd64, _0x3a81b2, _0xc3e723, _0x5c9677];
}
function featureName(_0x1a44b6, _0x309ceb) {
  const _0x781da9 = _0x1a44b6["properties"], _0x1a2dd0 = _0x781da9 && typeof _0x781da9["name"] === "string" ? _0x781da9["name"] : "";
  return _0x1a2dd0 || "feature-" + (_0x309ceb + 1);
}
function writeShp(_0x56aff8) {
  const _0x520751 = _0x56aff8["map"](recordBody), _0x1740b5 = _0x520751["reduce"]((_0x187a76, _0x14652d) => _0x187a76 + 8 + _0x14652d["length"], 0), _0x363713 = new Uint8Array(100 + _0x1740b5), _0x141a89 = new DataView(_0x363713["buffer"]);
  writeHeader(_0x141a89, _0x363713["length"], _0x56aff8);
  let _0x334e3d = 100;
  return _0x520751["forEach"]((_0x2debf9, _0x11be54) => {
    _0x141a89["setInt32"](_0x334e3d, _0x11be54 + 1, ![]), _0x141a89["setInt32"](_0x334e3d + 4, _0x2debf9["length"] / 2, ![]), _0x363713["set"](_0x2debf9, _0x334e3d + 8), _0x334e3d += 8 + _0x2debf9["length"];
  }), _0x363713;
}
function writeShx(_0x169174) {
  const _0x5afb56 = new Uint8Array(100 + _0x169174["length"] * 8), _0x3e908f = new DataView(_0x5afb56["buffer"]);
  writeHeader(_0x3e908f, _0x5afb56["length"], _0x169174);
  let _0x2145a4 = 50;
  return _0x169174["forEach"]((_0x3304a5, _0x4aa121) => {
    const _0x5148b5 = recordBody(_0x3304a5)["length"] / 2;
    _0x3e908f["setInt32"](100 + _0x4aa121 * 8, _0x2145a4, ![]), _0x3e908f["setInt32"](100 + _0x4aa121 * 8 + 4, _0x5148b5, ![]), _0x2145a4 += 4 + _0x5148b5;
  }), _0x5afb56;
}
function writeHeader(_0x276f09, _0x5a74c0, _0x733e35) {
  var _a2;
  _0x276f09["setInt32"](0, 9994, ![]), _0x276f09["setInt32"](24, _0x5a74c0 / 2, ![]), _0x276f09["setInt32"](28, 1e3, !![]), _0x276f09["setInt32"](32, ((_a2 = _0x733e35[0]) == null ? void 0 : _a2["kind"]) ?? 5, !![]);
  const _0x1c0720 = unionBbox(_0x733e35);
  _0x276f09["setFloat64"](36, _0x1c0720[0], !![]), _0x276f09["setFloat64"](44, _0x1c0720[1], !![]), _0x276f09["setFloat64"](52, _0x1c0720[2], !![]), _0x276f09["setFloat64"](60, _0x1c0720[3], !![]);
}
function unionBbox(_0x5446ef) {
  if (_0x5446ef["length"] === 0) return [0, 0, 0, 0];
  let _0x3e919a = Infinity, _0x217de2 = Infinity, _0x268a9c = -Infinity, _0x2ad8c8 = -Infinity;
  for (const _0x1b17b4 of _0x5446ef) {
    _0x3e919a = Math["min"](_0x3e919a, _0x1b17b4["bbox"][0]), _0x217de2 = Math["min"](_0x217de2, _0x1b17b4["bbox"][1]), _0x268a9c = Math["max"](_0x268a9c, _0x1b17b4["bbox"][2]), _0x2ad8c8 = Math["max"](_0x2ad8c8, _0x1b17b4["bbox"][3]);
  }
  return [_0x3e919a, _0x217de2, _0x268a9c, _0x2ad8c8];
}
function xy(_0x3d885e) {
  return [_0x3d885e[0] ?? 0, _0x3d885e[1] ?? 0];
}
function recordBody(_0x106b18) {
  var _a2;
  if (_0x106b18["kind"] === 1) {
    const _0x1e0b8f = new Uint8Array(20), _0x24c249 = new DataView(_0x1e0b8f["buffer"]);
    _0x24c249["setInt32"](0, 1, !![]);
    const [_0x2d4d82, _0x5e6b20] = xy(((_a2 = _0x106b18["rings"][0]) == null ? void 0 : _a2[0]) ?? [0, 0]);
    return _0x24c249["setFloat64"](4, _0x2d4d82, !![]), _0x24c249["setFloat64"](12, _0x5e6b20, !![]), _0x1e0b8f;
  }
  const _0x2ed5b6 = _0x106b18["rings"]["reduce"]((_0xab7c0a, _0x477054) => _0xab7c0a + _0x477054["length"], 0), _0x3ffc72 = new Uint8Array(44 + _0x106b18["rings"]["length"] * 4 + _0x2ed5b6 * 16), _0x267f59 = new DataView(_0x3ffc72["buffer"]);
  _0x267f59["setInt32"](0, _0x106b18["kind"], !![]), _0x267f59["setFloat64"](4, _0x106b18["bbox"][0], !![]), _0x267f59["setFloat64"](12, _0x106b18["bbox"][1], !![]), _0x267f59["setFloat64"](20, _0x106b18["bbox"][2], !![]), _0x267f59["setFloat64"](28, _0x106b18["bbox"][3], !![]), _0x267f59["setInt32"](36, _0x106b18["rings"]["length"], !![]), _0x267f59["setInt32"](40, _0x2ed5b6, !![]);
  let _0x2a3240 = 0;
  _0x106b18["rings"]["forEach"]((_0x330f3c, _0x2f16f2) => {
    _0x267f59["setInt32"](44 + _0x2f16f2 * 4, _0x2a3240, !![]), _0x2a3240 += _0x330f3c["length"];
  });
  let _0x17b1e1 = 44 + _0x106b18["rings"]["length"] * 4;
  for (const _0x1c1700 of _0x106b18["rings"]) {
    for (const _0x1ab1ee of _0x1c1700) {
      const [_0x150c8a, _0x466cd5] = xy(_0x1ab1ee);
      _0x267f59["setFloat64"](_0x17b1e1, _0x150c8a, !![]), _0x267f59["setFloat64"](_0x17b1e1 + 8, _0x466cd5, !![]), _0x17b1e1 += 16;
    }
  }
  return _0x3ffc72;
}
function writeDbf(_0x405d) {
  const _0x5e7069 = 32 + 32 + 1, _0x2d2349 = 1 + 80, _0x52cd06 = new Uint8Array(_0x5e7069 + _0x405d["length"] * _0x2d2349 + 1), _0x2e9391 = new DataView(_0x52cd06["buffer"]);
  _0x52cd06[0] = 3, _0x2e9391["setUint32"](4, _0x405d["length"], !![]), _0x2e9391["setUint16"](8, _0x5e7069, !![]), _0x2e9391["setUint16"](10, _0x2d2349, !![]);
  const _0x415d6d = new TextEncoder()["encode"]("NAME");
  _0x52cd06["set"](_0x415d6d, 32), _0x52cd06[32 + 11] = "C"["charCodeAt"](0), _0x52cd06[32 + 16] = 80, _0x52cd06[32 + 32] = 13;
  const _0x409299 = new TextEncoder();
  return _0x405d["forEach"]((_0xe23d4, _0x4fd3ee) => {
    const _0xc9ad25 = _0x5e7069 + _0x4fd3ee * _0x2d2349;
    _0x52cd06[_0xc9ad25] = 32;
    const _0x1f3e8c = _0x409299["encode"](_0xe23d4)["slice"](0, 80);
    _0x52cd06["set"](_0x1f3e8c, _0xc9ad25 + 1);
    for (let _0x1c2495 = 1 + _0x1f3e8c["length"]; _0x1c2495 < _0x2d2349; _0x1c2495++) _0x52cd06[_0xc9ad25 + _0x1c2495] = 32;
  }), _0x52cd06[_0x52cd06["length"] - 1] = 26, _0x52cd06;
}
function zipStore(_0x51b6be) {
  const _0x6c3234 = new TextEncoder(), _0x3849c5 = [], _0x41d9a0 = [];
  let _0x308d2a = 0;
  for (const _0x3a2c7a of _0x51b6be) {
    const _0x4b4d40 = _0x6c3234["encode"](_0x3a2c7a["name"]), _0xf6a5fa = crc32(_0x3a2c7a["data"]), _0x1ebbd2 = new Uint8Array(30 + _0x4b4d40["length"] + _0x3a2c7a["data"]["length"]), _0x2d6a87 = new DataView(_0x1ebbd2["buffer"]);
    _0x2d6a87["setUint32"](0, 67324752, !![]), _0x2d6a87["setUint16"](4, 20, !![]), _0x2d6a87["setUint16"](8, 0, !![]), _0x2d6a87["setUint32"](14, _0xf6a5fa, !![]), _0x2d6a87["setUint32"](18, _0x3a2c7a["data"]["length"], !![]), _0x2d6a87["setUint32"](22, _0x3a2c7a["data"]["length"], !![]), _0x2d6a87["setUint16"](26, _0x4b4d40["length"], !![]), _0x1ebbd2["set"](_0x4b4d40, 30), _0x1ebbd2["set"](_0x3a2c7a["data"], 30 + _0x4b4d40["length"]), _0x3849c5["push"](_0x1ebbd2);
    const _0x2fb706 = new Uint8Array(46 + _0x4b4d40["length"]), _0x2d643e = new DataView(_0x2fb706["buffer"]);
    _0x2d643e["setUint32"](0, 33639248, !![]), _0x2d643e["setUint16"](4, 20, !![]), _0x2d643e["setUint16"](6, 20, !![]), _0x2d643e["setUint16"](10, 0, !![]), _0x2d643e["setUint32"](16, _0xf6a5fa, !![]), _0x2d643e["setUint32"](20, _0x3a2c7a["data"]["length"], !![]), _0x2d643e["setUint32"](24, _0x3a2c7a["data"]["length"], !![]), _0x2d643e["setUint16"](28, _0x4b4d40["length"], !![]), _0x2d643e["setUint32"](42, _0x308d2a, !![]), _0x2fb706["set"](_0x4b4d40, 46), _0x41d9a0["push"](_0x2fb706), _0x308d2a += _0x1ebbd2["length"];
  }
  const _0x29755b = _0x41d9a0["reduce"]((_0x371b39, _0x57a117) => _0x371b39 + _0x57a117["length"], 0), _0x24abb5 = new Uint8Array(22), _0x1750e0 = new DataView(_0x24abb5["buffer"]);
  return _0x1750e0["setUint32"](0, 101010256, !![]), _0x1750e0["setUint16"](8, _0x51b6be["length"], !![]), _0x1750e0["setUint16"](10, _0x51b6be["length"], !![]), _0x1750e0["setUint32"](12, _0x29755b, !![]), _0x1750e0["setUint32"](16, _0x308d2a, !![]), concat([..._0x3849c5, ..._0x41d9a0, _0x24abb5]);
}
function crc32(_0x544149) {
  let _0x5a346e = 4294967295;
  for (const _0x5d38c2 of _0x544149) {
    _0x5a346e ^= _0x5d38c2;
    for (let _0x17679d = 0; _0x17679d < 8; _0x17679d++) {
      _0x5a346e = _0x5a346e >>> 1 ^ ((_0x5a346e & 1) === 1 ? 3988292384 : 0);
    }
  }
  return (_0x5a346e ^ 4294967295) >>> 0;
}
function concat(_0x5c79b6) {
  const _0x97d58e = _0x5c79b6["reduce"]((_0x1dae99, _0x182fe4) => _0x1dae99 + _0x182fe4["length"], 0), _0x34d2fc = new Uint8Array(_0x97d58e);
  let _0x5bca98 = 0;
  for (const _0x274975 of _0x5c79b6) {
    _0x34d2fc["set"](_0x274975, _0x5bca98), _0x5bca98 += _0x274975["length"];
  }
  return _0x34d2fc;
}
function getLayerGeoJSON(_0x40fb60, _0x4d8aa0, _0xf43d7d) {
  if (!("entities" in _0x40fb60["cesiumObject"])) return void 0;
  const _0x27fb25 = _0x40fb60["cesiumObject"]["entities"]["values"]["filter"]((_0x2d3985) => !_0xf43d7d(_0x2d3985))["map"]((_0xc2d524) => entityToGeoJSON(_0xc2d524, _0x4d8aa0))["filter"]((_0xbcd83c) => _0xbcd83c !== null);
  return { "type": "FeatureCollection", "features": _0x27fb25 };
}
function exportLayerVector(_0x4fbdf7, _0x1ffab3, _0x52ae14) {
  if (!_0x4fbdf7) return;
  const _0x502aea = vectorFile(_0x4fbdf7, _0x52ae14);
  triggerDownload(_0x502aea["blob"], _0x1ffab3 + "-" + Date["now"]() + "." + _0x502aea["extension"]);
}
function exportLayerGeoJSON(_0x4585a3, _0x1cf3b7) {
  exportLayerVector(_0x4585a3, _0x1cf3b7, "geojson");
}
function exportLayerKml(_0x3b8a08, _0x176e4f) {
  exportLayerVector(_0x3b8a08, _0x176e4f, "kml");
}
function exportLayerShapefile(_0x24b8f2, _0xf6f8e8) {
  exportLayerVector(_0x24b8f2, _0xf6f8e8, "shp");
}
function bytesAsBuffer(_0x213cb9) {
  return _0x213cb9["buffer"]["slice"](_0x213cb9["byteOffset"], _0x213cb9["byteOffset"] + _0x213cb9["byteLength"]);
}
function vectorFile(_0x4cb7cd, _0x59aa07) {
  if (_0x59aa07 === "kml") return { "blob": new Blob([featureCollectionToKml(_0x4cb7cd)], { "type": "application/vnd.google-earth.kml+xml" }), "extension": "kml" };
  if (_0x59aa07 === "shp") return { "blob": new Blob([bytesAsBuffer(featureCollectionToShapefileZip(_0x4cb7cd))], { "type": "application/zip" }), "extension": "zip" };
  return { "blob": new Blob([JSON["stringify"](_0x4cb7cd, null, 2)], { "type": "application/geo+json" }), "extension": "geojson" };
}
const GEOTIFF_EXPORT_MAX_WMS_DIMENSION = 2048;
function geoTiffExportDimensions(_0x38cd38, _0x365051) {
  if (!_0x38cd38) return { "width": _0x365051, "height": Math["round"](_0x365051 / 2) };
  const _0x14a753 = Math["max"](_0x38cd38["east"] - _0x38cd38["west"], 1e-6), _0x5f5c3d = Math["max"](_0x38cd38["north"] - _0x38cd38["south"], 1e-6), _0x110234 = _0x14a753 >= _0x5f5c3d ? _0x365051 : Math["max"](64, Math["round"](_0x365051 * _0x14a753 / _0x5f5c3d)), _0x305c9e = _0x5f5c3d >= _0x14a753 ? _0x365051 : Math["max"](64, Math["round"](_0x365051 * _0x5f5c3d / _0x14a753));
  return { "width": _0x110234, "height": _0x305c9e };
}
function buildWmsGeoTiffExportUrl(_0x4a549c, _0x35bd04) {
  const _0x14a61b = _0x35bd04("wms", _0x4a549c["url"]), { width: _0x11db77, height: _0x4dc4a3 } = geoTiffExportDimensions(_0x4a549c["geographicBoundingBox"], GEOTIFF_EXPORT_MAX_WMS_DIMENSION), _0x2bf5c7 = _0x4a549c["geographicBoundingBox"], _0x863aaa = new URLSearchParams({ "SERVICE": "WMS", "REQUEST": "GetMap", "VERSION": "1.3.0", "LAYERS": _0x4a549c["layers"], "STYLES": "", "FORMAT": _0x4a549c["tiffFormat"], "TRANSPARENT": "false", "WIDTH": String(_0x11db77), "HEIGHT": String(_0x4dc4a3), "CRS": "CRS:84", "BBOX": _0x2bf5c7 ? _0x2bf5c7["west"] + "," + _0x2bf5c7["south"] + "," + _0x2bf5c7["east"] + "," + _0x2bf5c7["north"] : "-180,-90,180,90" }), _0x50acfc = _0x14a61b["includes"]("?") ? "&" : "?";
  return "" + _0x14a61b + _0x50acfc + _0x863aaa["toString"]();
}
function buildWcsGeoTiffExportUrl(_0xa2e291, _0x34d1f3) {
  const _0x11abd5 = _0x34d1f3("wcs", _0xa2e291["url"]), _0x502b4e = _0xa2e291["version"] ?? "2.0.1", _0x1fb3c4 = { "service": "WCS", "version": _0x502b4e, "request": "GetCoverage", "coverageId": _0xa2e291["coverageId"], "format": _0xa2e291["tiffFormat"] };
  if (_0x502b4e["startsWith"]("2.")) {
    const _0x126f75 = _0xa2e291["maxSize"] ?? 2048;
    if (Number["isFinite"](_0x126f75)) _0x1fb3c4["SCALESIZE"] = "x(" + _0x126f75 + "),y(" + _0x126f75 + ")";
  }
  const _0x57a5e1 = _0x11abd5["includes"]("?") ? "&" : "?";
  return "" + _0x11abd5 + _0x57a5e1 + new URLSearchParams(_0x1fb3c4)["toString"]();
}
function isGeoTiffExportAvailable(_0x5a332c, _0x7f0a78) {
  if (!_0x5a332c || _0x5a332c["layerType"] !== "WMS" && _0x5a332c["layerType"] !== "WCS") return ![];
  return !!_0x7f0a78 && "tiffFormat" in _0x7f0a78 && !!_0x7f0a78["tiffFormat"];
}
async function exportLayerAsGeoTiff(_0x6b359, _0x41db61, _0x5ff094, _0xddc7ad, _0x3515ce) {
  if (_0x6b359["layerType"] !== "WMS" && _0x6b359["layerType"] !== "WCS") throw new LayerOperationError("LAYER_GEOTIFF_EXPORT_UNSUPPORTED_TYPE", 'Katman WMS/WCS değil, GeoTIFF export desteklenmiyor: "' + _0x6b359["id"] + '"');
  if (!_0x41db61 || !("tiffFormat" in _0x41db61) || !_0x41db61["tiffFormat"]) throw new LayerOperationError("LAYER_GEOTIFF_EXPORT_NOT_CONFIGURED", 'Katman GeoTIFF export desteklemiyor: "' + _0x6b359["id"] + '"');
  const _0x340d12 = _0x6b359["layerType"] === "WMS" ? buildWmsGeoTiffExportUrl(_0x41db61, _0xddc7ad) : buildWcsGeoTiffExportUrl(_0x41db61, _0xddc7ad), _0x3fb338 = _0x3515ce["mergeApiKeyHeader"](_0x3515ce["buildAuthHeaders"](_0x41db61["authToken"]), _0x340d12), _0x49bb88 = await fetch(_0x340d12, _0x3fb338 ? { "headers": _0x3fb338 } : void 0);
  if (!_0x49bb88["ok"]) throw new OgcRequestError("OGC_GEOTIFF_DOWNLOAD_FAILED", "GeoTIFF indirilemedi: " + _0x49bb88["status"] + " " + _0x49bb88["statusText"]);
  const _0x2bb9cf = _0x49bb88["headers"]["get"]("content-type") ?? "", _0x4ce17d = await _0x49bb88["arrayBuffer"](), _0x503eb0 = /boundary="?([^";]+)"?/i["exec"](_0x2bb9cf);
  let _0x1626a6;
  if (_0x2bb9cf["includes"]("multipart/") && _0x503eb0) {
    const { bytes: _0x4861b8, mimeType: _0x4a108b } = extractMultipartImage(new Uint8Array(_0x4ce17d), _0x503eb0[1]), _0x19b259 = _0x4861b8["buffer"]["slice"](_0x4861b8["byteOffset"], _0x4861b8["byteOffset"] + _0x4861b8["byteLength"]);
    _0x1626a6 = new Blob([_0x19b259], { "type": _0x4a108b });
  } else _0x1626a6 = new Blob([_0x4ce17d], { "type": _0x2bb9cf || _0x41db61["tiffFormat"] });
  triggerDownload(_0x1626a6, _0x5ff094 + "-" + Date["now"]() + ".tif");
}
function extractMultipartImage(_0x1ada25, _0x106c53) {
  var _a2;
  const _0x321a9b = new TextDecoder("iso-8859-1")["decode"](_0x1ada25), _0x307c73 = "--" + _0x106c53;
  let _0x348d07 = 0;
  while (_0x348d07 < _0x321a9b["length"]) {
    const _0x14d717 = _0x321a9b["indexOf"](_0x307c73, _0x348d07);
    if (_0x14d717 === -1) break;
    const _0x48685c = _0x14d717 + _0x307c73["length"], _0x17a357 = _0x321a9b["indexOf"](_0x307c73, _0x48685c);
    if (_0x17a357 === -1) break;
    const _0x38554f = _0x321a9b["indexOf"]("\r\n\r\n", _0x48685c), _0x32142d = _0x321a9b["indexOf"]("\n\n", _0x48685c), _0x26d06a = _0x38554f !== -1 && (_0x32142d === -1 || _0x38554f <= _0x32142d) ? _0x38554f : _0x32142d, _0x325ff4 = _0x26d06a === _0x38554f ? 4 : 2;
    if (_0x26d06a === -1 || _0x26d06a >= _0x17a357) {
      _0x348d07 = _0x17a357;
      continue;
    }
    const _0x3fc2fb = /content-type:\s*([^\r\n;]+)/i["exec"](_0x321a9b["slice"](_0x48685c, _0x26d06a)), _0x4b0e01 = (_a2 = _0x3fc2fb == null ? void 0 : _0x3fc2fb[1]) == null ? void 0 : _a2["trim"]();
    if (_0x4b0e01 == null ? void 0 : _0x4b0e01["startsWith"]("image/")) {
      const _0x2b56cb = _0x26d06a + _0x325ff4;
      let _0x18a5fb = _0x17a357;
      if (_0x321a9b[_0x18a5fb - 2] === "\r" && _0x321a9b[_0x18a5fb - 1] === "\n") _0x18a5fb -= 2;
      else {
        if (_0x321a9b[_0x18a5fb - 1] === "\n") _0x18a5fb -= 1;
      }
      return { "bytes": _0x1ada25["slice"](_0x2b56cb, _0x18a5fb), "mimeType": _0x4b0e01 };
    }
    _0x348d07 = _0x17a357;
  }
  throw new OgcRequestError("OGC_WCS_MULTIPART_IMAGE_NOT_FOUND", "Multipart WCS yanıtında görsel parçası bulunamadı.");
}
const POLE_SLICE_DEGREES = 90, POLE_LATITUDE_LIMIT = 89.9;
function clipRingToLongitude(_0xeeebe8, _0x4fe0ad, _0x291192) {
  const _0xc2276d = (_0x29fa0e) => _0x291192 * (_0x29fa0e[0] - _0x4fe0ad) >= 0, _0x5303fb = [], _0x403bce = (_0x598ad4) => {
    const _0x5e49bd = _0x5303fb[_0x5303fb["length"] - 1];
    if (_0x5e49bd === void 0 || _0x5e49bd[0] !== _0x598ad4[0] || _0x5e49bd[1] !== _0x598ad4[1]) _0x5303fb["push"]([_0x598ad4[0], _0x598ad4[1]]);
  };
  for (let _0x16b165 = 0; _0x16b165 < _0xeeebe8["length"] - 1; _0x16b165++) {
    const _0x471716 = _0xeeebe8[_0x16b165], _0x5a483a = _0xeeebe8[_0x16b165 + 1];
    if (_0xc2276d(_0x471716)) _0x403bce(_0x471716);
    if (_0xc2276d(_0x471716) !== _0xc2276d(_0x5a483a)) {
      const _0x22decc = (_0x4fe0ad - _0x471716[0]) / (_0x5a483a[0] - _0x471716[0]);
      _0x403bce([_0x4fe0ad, _0x471716[1] + _0x22decc * (_0x5a483a[1] - _0x471716[1])]);
    }
  }
  if (_0x5303fb["length"] > 0) _0x403bce(_0x5303fb[0]);
  return _0x5303fb;
}
const _OutlineGeometry = class _OutlineGeometry {
  constructor(_0x5d8198) {
    this["outlineCompanionEntities"] = /* @__PURE__ */ new WeakSet(), this["entitiesWithOutlineCompanion"] = /* @__PURE__ */ new WeakSet(), this["entitiesWithRiskyOutline"] = /* @__PURE__ */ new WeakSet(), this["getCurrentTime"] = _0x5d8198["getCurrentTime"];
  }
  ["isOutlineCompanion"](_0x29ece8) {
    return this["outlineCompanionEntities"]["has"](_0x29ece8);
  }
  ["hasOutlineCompanion"](_0x725ad3) {
    return this["entitiesWithOutlineCompanion"]["has"](_0x725ad3);
  }
  ["hasRiskyOutline"](_0x21bdbc) {
    return this["entitiesWithRiskyOutline"]["has"](_0x21bdbc);
  }
  ["addPolygonOutlines"](_0x2c5d53, _0x4b27fc, _0x5e0175) {
    const _0x5c4214 = _0x2c5d53["entities"]["values"]["filter"]((_0x492850) => _0x492850["polygon"] !== void 0 && !this["entitiesWithRiskyOutline"]["has"](_0x492850));
    _0x2c5d53["entities"]["suspendEvents"]();
    for (const _0x5e257b of _0x5c4214) {
      this["addPolygonOutlineCompanion"](_0x2c5d53, _0x5e257b, _0x4b27fc, _0x5e0175, !![]);
    }
    _0x2c5d53["entities"]["resumeEvents"]();
  }
  ["addPolygonOutlineCompanion"](_0x30c808, _0x2e611e, _0x18810d, _0x11ad8b, _0x1efd09) {
    var _a2;
    const _0x51e6b9 = this["getCurrentTime"](), _0x2a693b = (_a2 = _0x2e611e["polygon"]["hierarchy"]) == null ? void 0 : _a2["getValue"](_0x51e6b9), _0x35a9dd = _0x2a693b == null ? void 0 : _0x2a693b["positions"], _0x5815bd = _0x35a9dd == null ? void 0 : _0x35a9dd[0];
    if (_0x35a9dd === void 0 || _0x35a9dd["length"] < 2 || _0x5815bd === void 0) return;
    _0x2e611e["polygon"]["outline"] = new ConstantProperty(![]), this["entitiesWithOutlineCompanion"]["add"](_0x2e611e);
    const _0x134734 = _OutlineGeometry["simplifyOutlinePositions"]([..._0x35a9dd, _0x5815bd]), _0x4cc7f7 = _0x30c808["entities"]["add"]({ "id": _0x2e611e["id"] + "::outline", "polyline": { "positions": _0x134734, "clampToGround": _0x1efd09, "width": _0x11ad8b, "material": _0x18810d } });
    this["outlineCompanionEntities"]["add"](_0x4cc7f7), _0x4cc7f7["properties"] = new PropertyBag({ "__tucbsOutlineOf": _0x2e611e["id"] });
  }
  ["disableRiskyPolygonOutlines"](_0xb35fa0) {
    var _a2, _b;
    const _0x40c6bb = JulianDate["now"]();
    _0xb35fa0["entities"]["suspendEvents"]();
    for (const _0x3c9d51 of [..._0xb35fa0["entities"]["values"]]) {
      const _0x568a7d = _0x3c9d51["polygon"], _0x43a663 = (_a2 = _0x568a7d == null ? void 0 : _0x568a7d["hierarchy"]) == null ? void 0 : _a2["getValue"](_0x40c6bb);
      if (_0x568a7d !== void 0 && this["risksAntimeridianOrPoleBug"](_0x43a663 == null ? void 0 : _0x43a663["positions"])) {
        _0x568a7d["outline"] = new ConstantProperty(![]), this["entitiesWithRiskyOutline"]["add"](_0x3c9d51);
        if (_0x43a663 !== void 0 && this["splitPoleEnclosingPolygon"](_0xb35fa0, _0x3c9d51, _0x43a663, _0x40c6bb)) continue;
        _0x568a7d["height"] === void 0 && ((_b = _0x568a7d["perPositionHeight"]) == null ? void 0 : _b["getValue"](_0x40c6bb)) !== !![] && (_0x568a7d["height"] = new ConstantProperty(0));
      }
    }
    _0xb35fa0["entities"]["resumeEvents"]();
  }
  ["splitPoleEnclosingPolygon"](_0x12b476, _0x1c9b68, _0x18bdd0, _0x30d519) {
    var _a2;
    const _0x344e00 = _0x1c9b68["polygon"];
    if (_0x344e00 === void 0 || _0x18bdd0["holes"]["length"] > 0) return ![];
    const _0xb5b4f1 = _0x18bdd0["positions"]["map"]((_0xa33280) => {
      const _0x331920 = Cartographic["fromCartesian"](_0xa33280);
      return [_0x3bd2fa["toDegrees"](_0x331920["longitude"]), _0x3bd2fa["toDegrees"](_0x331920["latitude"])];
    });
    let _0x6f963b = Infinity, _0x1bc57f = -Infinity;
    for (let _0x3c6540 = 0; _0x3c6540 < _0xb5b4f1["length"]; _0x3c6540++) {
      const [_0x35aa18] = _0xb5b4f1[_0x3c6540];
      if (_0x3c6540 > 0 && Math["abs"](_0x35aa18 - _0xb5b4f1[_0x3c6540 - 1][0]) > 180) return ![];
      _0x6f963b = Math["min"](_0x6f963b, _0x35aa18), _0x1bc57f = Math["max"](_0x1bc57f, _0x35aa18);
    }
    if (_0x1bc57f - _0x6f963b < 359) return ![];
    const _0xb638ad = [..._0xb5b4f1, _0xb5b4f1[0]]["map"](([_0x314883, _0x1b9b88]) => [_0x314883, Math["max"](-POLE_LATITUDE_LIMIT, Math["min"](POLE_LATITUDE_LIMIT, _0x1b9b88))]), _0x176bbe = [];
    for (let _0x31ebb7 = -180; _0x31ebb7 < 180; _0x31ebb7 += POLE_SLICE_DEGREES) {
      const _0x1e4084 = clipRingToLongitude(clipRingToLongitude(_0xb638ad, _0x31ebb7, 1), _0x31ebb7 + POLE_SLICE_DEGREES, -1)["slice"](0, -1);
      if (_0x1e4084["length"] >= 3) _0x176bbe["push"](Cartesian3["fromDegreesArray"](_0x1e4084["flat"]()));
    }
    if (_0x176bbe["length"] === 0) return ![];
    const _0x4a1602 = (_a2 = _0x1c9b68["properties"]) == null ? void 0 : _a2["getValue"](_0x30d519);
    return _0x176bbe["forEach"]((_0x2d7980, _0x20d0a3) => {
      const _0x327131 = new ConstantProperty(new PolygonHierarchy(_0x2d7980));
      if (_0x20d0a3 === 0) {
        _0x344e00["hierarchy"] = _0x327131;
        return;
      }
      const _0x16405f = _0x344e00["clone"]();
      _0x16405f["hierarchy"] = _0x327131;
      const _0x1dfbe0 = _0x12b476["entities"]["add"]({ "id": _0x1c9b68["id"] + "::part-" + _0x20d0a3, ..._0x1c9b68["name"] !== void 0 ? { "name": _0x1c9b68["name"] } : {}, "polygon": _0x16405f });
      if (_0x4a1602 !== void 0) _0x1dfbe0["properties"] = new PropertyBag(_0x4a1602);
      this["entitiesWithRiskyOutline"]["add"](_0x1dfbe0);
    }), !![];
  }
  ["risksAntimeridianOrPoleBug"](_0x4248d6) {
    if (!_0x4248d6 || _0x4248d6["length"] < 2) return ![];
    let _0x46e4a6;
    for (const _0x142ad1 of _0x4248d6) {
      const _0x2ae884 = Cartographic["fromCartesian"](_0x142ad1), _0x16b189 = _0x3bd2fa["toDegrees"](_0x2ae884["latitude"]);
      if (Math["abs"](_0x16b189) > 89) return !![];
      const _0x13f50c = _0x3bd2fa["toDegrees"](_0x2ae884["longitude"]);
      if (_0x46e4a6 !== void 0 && Math["abs"](_0x13f50c - _0x46e4a6) > 180) return !![];
      _0x46e4a6 = _0x13f50c;
    }
    return ![];
  }
  ["flattenSuspiciousGeometry"](_0x26f326) {
    _0x26f326["entities"]["suspendEvents"]();
    for (const _0x38890a of _0x26f326["entities"]["values"]) {
      if (_0x38890a["polygon"] !== void 0) _0x38890a["polygon"]["granularity"] = new ConstantProperty(Math["PI"]);
      if (_0x38890a["polyline"] !== void 0) _0x38890a["polyline"]["granularity"] = new ConstantProperty(Math["PI"]);
    }
    _0x26f326["entities"]["resumeEvents"]();
  }
  static ["douglasPeucker"](_0x3c50b, _0x4c7602) {
    const _0x228c0b = new Array(_0x3c50b["length"])["fill"](![]);
    _0x228c0b[0] = !![], _0x228c0b[_0x3c50b["length"] - 1] = !![];
    const _0x149373 = [[0, _0x3c50b["length"] - 1]];
    while (_0x149373["length"] > 0) {
      const [_0x14314c, _0x1d9e23] = _0x149373["pop"]();
      if (_0x1d9e23 <= _0x14314c + 1) continue;
      let _0x43f946 = -1, _0x3f9af6 = -1;
      for (let _0x472b62 = _0x14314c + 1; _0x472b62 < _0x1d9e23; _0x472b62++) {
        const _0x39d6fc = _OutlineGeometry["perpendicularDistance"](_0x3c50b[_0x472b62], _0x3c50b[_0x14314c], _0x3c50b[_0x1d9e23]);
        _0x39d6fc > _0x43f946 && (_0x43f946 = _0x39d6fc, _0x3f9af6 = _0x472b62);
      }
      _0x43f946 > _0x4c7602 && (_0x228c0b[_0x3f9af6] = !![], _0x149373["push"]([_0x14314c, _0x3f9af6], [_0x3f9af6, _0x1d9e23]));
    }
    return _0x3c50b["filter"]((_0x1ce6e3, _0x241650) => _0x228c0b[_0x241650]);
  }
  static ["perpendicularDistance"](_0x104d95, _0x5c50ec, _0x6e0c2f) {
    const _0x5b2675 = Cartesian3["subtract"](_0x6e0c2f, _0x5c50ec, new Cartesian3()), _0x28ea73 = Cartesian3["magnitudeSquared"](_0x5b2675);
    if (_0x28ea73 === 0) return Cartesian3["distance"](_0x104d95, _0x5c50ec);
    const _0x2e72bc = Cartesian3["subtract"](_0x104d95, _0x5c50ec, new Cartesian3()), _0x503d8d = _0x3bd2fa["clamp"](Cartesian3["dot"](_0x2e72bc, _0x5b2675) / _0x28ea73, 0, 1), _0x44279c = Cartesian3["add"](_0x5c50ec, Cartesian3["multiplyByScalar"](_0x5b2675, _0x503d8d, _0x5b2675), _0x5b2675);
    return Cartesian3["distance"](_0x104d95, _0x44279c);
  }
  static ["uniformDecimate"](_0x133711, _0x47dd71) {
    if (_0x133711["length"] <= _0x47dd71) return [..._0x133711];
    const _0x3dfcf9 = (_0x133711["length"] - 1) / (_0x47dd71 - 1);
    return Array["from"]({ "length": _0x47dd71 }, (_0xf06f89, _0x1bb4db) => _0x133711[Math["round"](_0x1bb4db * _0x3dfcf9)]);
  }
  static ["polygonExtentMeters"](_0x4fbdce) {
    let _0x8473ae = Infinity, _0x4888e2 = Infinity, _0x3c05a4 = Infinity, _0x473c52 = -Infinity, _0x5d3ec3 = -Infinity, _0xf4726f = -Infinity;
    for (const _0x5b1fc1 of _0x4fbdce) {
      if (_0x5b1fc1["x"] < _0x8473ae) _0x8473ae = _0x5b1fc1["x"];
      if (_0x5b1fc1["x"] > _0x473c52) _0x473c52 = _0x5b1fc1["x"];
      if (_0x5b1fc1["y"] < _0x4888e2) _0x4888e2 = _0x5b1fc1["y"];
      if (_0x5b1fc1["y"] > _0x5d3ec3) _0x5d3ec3 = _0x5b1fc1["y"];
      if (_0x5b1fc1["z"] < _0x3c05a4) _0x3c05a4 = _0x5b1fc1["z"];
      if (_0x5b1fc1["z"] > _0xf4726f) _0xf4726f = _0x5b1fc1["z"];
    }
    return Math["sqrt"]((_0x473c52 - _0x8473ae) ** 2 + (_0x5d3ec3 - _0x4888e2) ** 2 + (_0xf4726f - _0x3c05a4) ** 2);
  }
  static ["simplifyOutlinePositions"](_0x581ab9) {
    const _0x29ce8f = _OutlineGeometry["polygonExtentMeters"](_0x581ab9), _0x9fc7b6 = _0x3bd2fa["clamp"](_0x29ce8f * _OutlineGeometry["OUTLINE_SIMPLIFY_TOLERANCE_FACTOR"], _OutlineGeometry["OUTLINE_SIMPLIFY_MIN_TOLERANCE_METERS"], _OutlineGeometry["OUTLINE_SIMPLIFY_MAX_TOLERANCE_METERS"]), _0x2cbd59 = _OutlineGeometry["douglasPeucker"](_0x581ab9, _0x9fc7b6);
    return _0x2cbd59["length"] > _OutlineGeometry["OUTLINE_MAX_VERTICES"] ? _OutlineGeometry["uniformDecimate"](_0x2cbd59, _OutlineGeometry["OUTLINE_MAX_VERTICES"]) : _0x2cbd59;
  }
};
_OutlineGeometry["OUTLINE_SIMPLIFY_TOLERANCE_FACTOR"] = 7e-5;
_OutlineGeometry["OUTLINE_SIMPLIFY_MIN_TOLERANCE_METERS"] = 0.25;
_OutlineGeometry["OUTLINE_SIMPLIFY_MAX_TOLERANCE_METERS"] = 150;
_OutlineGeometry["OUTLINE_MAX_VERTICES"] = 1200;
let OutlineGeometry = _OutlineGeometry;
class OpacityController {
  constructor(_0x182b6b) {
    this["dataSourceOpacityStates"] = /* @__PURE__ */ new WeakMap(), this["dataSourceOpacityProperties"] = /* @__PURE__ */ new WeakMap(), this["requestRender"] = _0x182b6b["requestRender"];
  }
  ["getWrappedBaseColor"](_0x309411) {
    return this["dataSourceOpacityProperties"]["get"](_0x309411);
  }
  ["prepareDataSourceOpacity"](_0x1f38c6) {
    var _a2, _b;
    const _0x4a40a6 = this["getDataSourceOpacityState"](_0x1f38c6), _0x4ecb51 = JulianDate["now"]();
    _0x1f38c6["entities"]["suspendEvents"]();
    for (const _0x3aa02a of _0x1f38c6["entities"]["values"]) {
      if (((_a2 = _0x3aa02a["polygon"]) == null ? void 0 : _a2["material"]) instanceof ColorMaterialProperty) {
        const _0x5c0c9e = _0x3aa02a["polygon"]["material"];
        this["installOpacityColorProperty"](_0x5c0c9e["color"], _0x4a40a6, _0x4ecb51, new Color(1, 1, 1, 0.5), (_0x228478) => _0x5c0c9e["color"] = _0x228478);
      }
      if (((_b = _0x3aa02a["polyline"]) == null ? void 0 : _b["material"]) instanceof ColorMaterialProperty) {
        const _0x30c06d = _0x3aa02a["polyline"]["material"];
        this["installOpacityColorProperty"](_0x30c06d["color"], _0x4a40a6, _0x4ecb51, Color["WHITE"], (_0x101a6a) => _0x30c06d["color"] = _0x101a6a);
      }
      _0x3aa02a["point"] !== void 0 && this["installOpacityColorProperty"](_0x3aa02a["point"]["color"], _0x4a40a6, _0x4ecb51, Color["WHITE"], (_0x37495a) => _0x3aa02a["point"]["color"] = _0x37495a), _0x3aa02a["billboard"] !== void 0 && this["installOpacityColorProperty"](_0x3aa02a["billboard"]["color"], _0x4a40a6, _0x4ecb51, Color["WHITE"], (_0x49e1ea) => _0x3aa02a["billboard"]["color"] = _0x49e1ea);
    }
    _0x1f38c6["entities"]["resumeEvents"]();
  }
  ["ensureDynamicFillColor"](_0x2458c4, _0x34af1b) {
    var _a2;
    if (!(((_a2 = _0x34af1b["polygon"]) == null ? void 0 : _a2["material"]) instanceof ColorMaterialProperty)) return;
    const _0x22f4dd = this["getDataSourceOpacityState"](_0x2458c4), _0x2d3cbb = _0x34af1b["polygon"]["material"];
    this["installOpacityColorProperty"](_0x2d3cbb["color"], _0x22f4dd, JulianDate["now"](), new Color(1, 1, 1, 0.5), (_0x3bb7af) => _0x2d3cbb["color"] = _0x3bb7af);
  }
  ["setDataSourceOpacity"](_0x985258, _0x3dbe20) {
    const _0x1f6f43 = this["getDataSourceOpacityState"](_0x985258);
    if (_0x1f6f43["opacity"] === _0x3dbe20) return;
    _0x1f6f43["opacity"] = _0x3dbe20, !_0x1f6f43["wrapped"] && _0x3dbe20 !== 1 && (this["prepareDataSourceOpacity"](_0x985258), _0x1f6f43["wrapped"] = !![]), this["requestRender"]();
  }
  ["getDataSourceOpacityState"](_0x2d8e43) {
    let _0x5d0385 = this["dataSourceOpacityStates"]["get"](_0x2d8e43);
    return _0x5d0385 === void 0 && (_0x5d0385 = { "opacity": 1, "wrapped": ![] }, this["dataSourceOpacityStates"]["set"](_0x2d8e43, _0x5d0385)), _0x5d0385;
  }
  ["installOpacityColorProperty"](_0x32ed1b, _0x3cafde, _0x4e5635, _0x3ddaad, _0x5d3852) {
    if (_0x32ed1b !== void 0 && this["dataSourceOpacityProperties"]["has"](_0x32ed1b)) return;
    const _0x44bc61 = this["readColorProperty"](_0x32ed1b, _0x4e5635, _0x3ddaad), _0x517bac = this["createOpacityColorProperty"](_0x44bc61, _0x3cafde);
    _0x5d3852(_0x517bac);
  }
  ["readColorProperty"](_0x34ca17, _0x1dc0ba, _0x32fc43) {
    const _0x5341bf = _0x34ca17 == null ? void 0 : _0x34ca17["getValue"](_0x1dc0ba);
    return _0x5341bf instanceof Color ? Color["clone"](_0x5341bf, new Color()) : Color["clone"](_0x32fc43, new Color());
  }
  ["createOpacityColorProperty"](_0x3c8be3, _0x5080d2) {
    const _0x19be64 = Color["clone"](_0x3c8be3, new Color()), _0x417963 = new CallbackProperty((_0x3b8f95, _0x1cb33f) => {
      const _0x425d2d = _0x1cb33f instanceof Color ? _0x1cb33f : new Color();
      return _0x425d2d["red"] = _0x19be64["red"], _0x425d2d["green"] = _0x19be64["green"], _0x425d2d["blue"] = _0x19be64["blue"], _0x425d2d["alpha"] = _0x19be64["alpha"] * _0x5080d2["opacity"], _0x425d2d;
    }, ![]);
    return this["dataSourceOpacityProperties"]["set"](_0x417963, _0x19be64), _0x417963;
  }
}
const _CameraHighlight = class _CameraHighlight {
  constructor(_0x16a87e, _0x38ae9d) {
    this["viewer"] = _0x16a87e, this["deps"] = _0x38ae9d;
  }
  async ["zoomToLayer"](_0xcfe8f9) {
    const _0x4f81cf = this["deps"]["requireLayer"](_0xcfe8f9);
    return this["viewer"]["zoomTo"](_0x4f81cf["cesiumObject"], new HeadingPitchRange(0, -_0x3bd2fa["PI_OVER_TWO"], 0));
  }
  async ["zoomToEntity"](_0x1287c3, _0x544225) {
    var _a2, _b;
    const _0x5d59ea = this["viewer"]["clock"]["currentTime"];
    let _0x4cb564;
    if (((_a2 = _0x1287c3["polygon"]) == null ? void 0 : _a2["hierarchy"]) !== void 0) {
      const _0x5a08b6 = _0x1287c3["polygon"]["hierarchy"]["getValue"](_0x5d59ea);
      _0x4cb564 = _0x5a08b6 == null ? void 0 : _0x5a08b6["positions"];
    } else ((_b = _0x1287c3["polyline"]) == null ? void 0 : _b["positions"]) !== void 0 && (_0x4cb564 = _0x1287c3["polyline"]["positions"]["getValue"](_0x5d59ea));
    if (_0x4cb564 !== void 0 && _0x4cb564["length"] > 0) {
      const _0x3f3dc9 = BoundingSphere["fromPoints"](_0x4cb564), _0x434e20 = Math["max"](_0x3f3dc9["radius"] * 2, 50);
      return new Promise((_0x561c02) => {
        this["viewer"]["camera"]["flyToBoundingSphere"](_0x3f3dc9, { "offset": new HeadingPitchRange(0, -_0x3bd2fa["PI_OVER_TWO"], _0x434e20), ...(_0x544225 == null ? void 0 : _0x544225["duration"]) !== void 0 ? { "duration": _0x544225["duration"] } : {}, "complete": () => _0x561c02(!![]), "cancel": () => _0x561c02(![]) });
      });
    }
    return this["viewer"]["zoomTo"](_0x1287c3, new HeadingPitchRange(0, -_0x3bd2fa["PI_OVER_TWO"], 0));
  }
  static ["elevate"](_0x47343c, _0x4a40de) {
    return _0x47343c["map"]((_0x20201f) => {
      const _0x197f14 = Cartographic["fromCartesian"](_0x20201f);
      return Cartesian3["fromRadians"](_0x197f14["longitude"], _0x197f14["latitude"], _0x197f14["height"] + _0x4a40de);
    });
  }
  ["highlightEntity"](_0x2d1882) {
    var _a2, _b, _c;
    const _0x5bd16f = this["viewer"]["clock"]["currentTime"], _0x848c43 = (_a2 = _0x2d1882["properties"]) == null ? void 0 : _a2["getValue"](_0x5bd16f), _0x515bdd = _0x848c43 == null ? void 0 : _0x848c43["layerId"], _0x46fce5 = _0x515bdd !== void 0 ? this["deps"]["getLayerStyle"](_0x515bdd) : void 0, _0x25beff = _CameraHighlight["HIGHLIGHT_COLOR"], _0x3bad6d = ((_0x46fce5 == null ? void 0 : _0x46fce5["outline"]["width"]) ?? 2) + 4, _0x4f3ccf = new ColorMaterialProperty(_0x25beff), _0x4b4a79 = new Entity();
    if (((_b = _0x2d1882["polygon"]) == null ? void 0 : _b["hierarchy"]) !== void 0) {
      const _0x657fc9 = _0x2d1882["polygon"]["hierarchy"]["getValue"](_0x5bd16f), _0x33ddb0 = _0x657fc9 == null ? void 0 : _0x657fc9["positions"];
      if (_0x33ddb0 === void 0 || _0x33ddb0["length"] < 2) return;
      const _0x326963 = Cartesian3["equals"](_0x33ddb0[0], _0x33ddb0[_0x33ddb0["length"] - 1]) ? _0x33ddb0 : [..._0x33ddb0, _0x33ddb0[0]];
      _0x4b4a79["polyline"] = new PolylineGraphics({ "positions": _CameraHighlight["elevate"](_0x326963, _CameraHighlight["HIGHLIGHT_ELEVATION_METERS"]), "width": _0x3bad6d, "material": _0x4f3ccf, "depthFailMaterial": _0x4f3ccf });
    } else {
      if (((_c = _0x2d1882["polyline"]) == null ? void 0 : _c["positions"]) !== void 0) {
        const _0x50ecb0 = _0x2d1882["polyline"]["positions"]["getValue"](_0x5bd16f);
        if (_0x50ecb0 === void 0 || _0x50ecb0["length"] < 2) return;
        _0x4b4a79["polyline"] = new PolylineGraphics({ "positions": _CameraHighlight["elevate"](_0x50ecb0, _CameraHighlight["HIGHLIGHT_ELEVATION_METERS"]), "width": _0x3bad6d, "material": _0x4f3ccf, "depthFailMaterial": _0x4f3ccf });
      } else {
        if (_0x2d1882["position"] !== void 0) {
          const _0x1654b9 = _0x2d1882["position"]["getValue"](_0x5bd16f);
          if (_0x1654b9 === void 0) return;
          _0x4b4a79["position"] = new ConstantPositionProperty(_0x1654b9), _0x4b4a79["point"] = new PointGraphics({ "pixelSize": _0x3bad6d + 12, "color": _0x25beff, "disableDepthTestDistance": Number["POSITIVE_INFINITY"] });
        } else return;
      }
    }
    !this["highlightDataSource"] ? (this["highlightDataSource"] = new CustomDataSource("__tucbs_highlight__"), void this["viewer"]["dataSources"]["add"](this["highlightDataSource"])) : this["highlightDataSource"]["entities"]["removeAll"](), this["highlightDataSource"]["entities"]["add"](_0x4b4a79);
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
  constructor(_0x1549d1) {
    this["appliedLayerStyles"] = /* @__PURE__ */ new Map(), this["appliedCompanionWidths"] = /* @__PURE__ */ new Map(), this["outlineGeometry"] = _0x1549d1["outlineGeometry"], this["opacityController"] = _0x1549d1["opacityController"], this["getCurrentTime"] = _0x1549d1["getCurrentTime"], this["requestRender"] = _0x1549d1["requestRender"], this["emitStyle"] = _0x1549d1["emitStyle"], this["waitForRenderSettle"] = _0x1549d1["waitForRenderSettle"];
  }
  async ["applyLayerStyle"](_0x4bd282, _0x1fa491, _0xcb5e8, _0x2e9f6f) {
    var _a2;
    const _0x3fce5c = this["appliedCompanionWidths"]["get"](_0x4bd282) ?? ((_a2 = this["appliedLayerStyles"]["get"](_0x4bd282)) == null ? void 0 : _a2["outline"]["width"]), _0x37dbfb = this["getCurrentTime"](), _0x18fe99 = this["resolveStyleRange"](_0x1fa491, _0x37dbfb, _0x2e9f6f["fill"]), _0x1b2daf = [], _0x44a8fa = /* @__PURE__ */ new Map();
    _0x1fa491["entities"]["suspendEvents"]();
    for (const _0x455162 of _0x1fa491["entities"]["values"]) {
      if (this["outlineGeometry"]["isOutlineCompanion"](_0x455162)) {
        _0x1b2daf["push"](_0x455162);
        continue;
      }
      const _0x1d242b = this["resolveFillColor"](_0x455162, _0x2e9f6f["fill"], _0x18fe99, _0x37dbfb);
      if (_0x455162["polygon"] !== void 0 && _0x1d242b !== void 0) _0x44a8fa["set"](_0x455162["id"], _0x1d242b);
      this["applyEntityStyle"](_0x455162, _0x1d242b, _0x2e9f6f["outline"], _0xcb5e8);
    }
    const _0x3367c2 = this["styleOutlineCompanions"](_0x1b2daf, _0x2e9f6f["outline"], _0xcb5e8, _0x44a8fa);
    _0x1fa491["entities"]["resumeEvents"]();
    const _0x4ede3c = _0x18fe99 !== null && (_0x2e9f6f["fill"]["mode"] === "gradient" || _0x2e9f6f["fill"]["mode"] === "bin") ? { ..._0x2e9f6f, "fill": { ..._0x2e9f6f["fill"], "min": _0x18fe99["min"], "max": _0x18fe99["max"] } } : _0x2e9f6f;
    this["appliedLayerStyles"]["set"](_0x4bd282, _0x4ede3c), this["requestRender"](), this["emitStyle"](_0x4bd282, _0x4ede3c), this["appliedCompanionWidths"]["set"](_0x4bd282, _0x3367c2);
    const _0xe536c8 = _0x3fce5c === void 0 || _0x3fce5c !== _0x3367c2;
    if (_0xe536c8) await this["waitForRenderSettle"]();
  }
  ["styleOutlineCompanions"](_0x27ae52, _0x3101e0, _0xba4caa, _0x4d3f55) {
    const _0x3f18cd = _0x3101e0["enabled"] ? Color["fromCssColorString"](_0x3101e0["color"]) : void 0, _0x1e79b4 = _0x3101e0["enabled"] ? _0x3101e0["width"] : SEAM_COVER_WIDTH;
    for (const _0x13ddf4 of _0x27ae52) {
      const _0xff862f = _0x3101e0["enabled"] || _0xba4caa ? void 0 : _0x4d3f55["get"](LayerStyleEngine["outlineOwnerId"](_0x13ddf4)), _0x16d057 = _0xff862f !== void 0 && _0xff862f["alpha"] >= 1;
      _0x13ddf4["show"] = _0x3101e0["enabled"] || _0x16d057;
      const _0x544314 = _0x3f18cd ?? (_0x16d057 ? _0xff862f : void 0);
      _0x544314 !== void 0 && _0x13ddf4["polyline"] !== void 0 && (_0x13ddf4["polyline"]["material"] = this["updateColorMaterial"](_0x13ddf4["polyline"]["material"], _0x544314), _0x13ddf4["polyline"]["width"] = LayerStyleEngine["updateConstantProperty"](_0x13ddf4["polyline"]["width"], _0x1e79b4));
    }
    return _0x1e79b4;
  }
  static ["outlineOwnerId"](_0x39450c) {
    return _0x39450c["id"]["endsWith"](OUTLINE_ID_SUFFIX) ? _0x39450c["id"]["slice"](0, -OUTLINE_ID_SUFFIX["length"]) : _0x39450c["id"];
  }
  ["getStyle"](_0x23586d) {
    return this["appliedLayerStyles"]["get"](_0x23586d);
  }
  ["deleteStyle"](_0x50e9b1) {
    this["appliedLayerStyles"]["delete"](_0x50e9b1), this["appliedCompanionWidths"]["delete"](_0x50e9b1);
  }
  ["recordInitialStyle"](_0x1cefad, _0x3cc07e, _0x49be79, _0x4a3f0f) {
    const _0xd356b5 = { "fill": { "mode": "solid", "color": _0x3cc07e, "opacity": _0x49be79 }, "outline": _0x4a3f0f };
    this["appliedLayerStyles"]["set"](_0x1cefad, _0xd356b5), this["emitStyle"](_0x1cefad, _0xd356b5);
  }
  ["randomLayerColor"]() {
    return Color["fromRandom"]({ "alpha": 1 });
  }
  ["applyEntityColor"](_0xebbd01, _0x577e2a) {
    _0xebbd01["entities"]["suspendEvents"]();
    for (const _0x5c2966 of _0xebbd01["entities"]["values"]) {
      _0x5c2966["polygon"] !== void 0 && (_0x5c2966["polygon"]["material"] = new ColorMaterialProperty(new ConstantProperty(_0x577e2a["withAlpha"](0.5)))), _0x5c2966["polyline"] !== void 0 && (_0x5c2966["polyline"]["material"] = new ColorMaterialProperty(new ConstantProperty(_0x577e2a))), _0x5c2966["point"] !== void 0 && (_0x5c2966["point"]["color"] = new ConstantProperty(_0x577e2a)), _0x5c2966["billboard"] !== void 0 && (_0x5c2966["billboard"]["color"] = new ConstantProperty(_0x577e2a));
    }
    _0xebbd01["entities"]["resumeEvents"]();
  }
  ["convertMarkersToPoints"](_0x50cad5, _0x20d8c9) {
    _0x50cad5["entities"]["suspendEvents"]();
    for (const _0x582980 of _0x50cad5["entities"]["values"]) {
      if (_0x582980["billboard"] === void 0) continue;
      const _0x2cf152 = _0x582980["billboard"]["heightReference"];
      _0x582980["point"] = new PointGraphics({ "pixelSize": 8, "color": _0x20d8c9, ..._0x2cf152 !== void 0 ? { "heightReference": _0x2cf152 } : {} }), _0x582980["billboard"] = void 0;
    }
    _0x50cad5["entities"]["resumeEvents"]();
  }
  ["applyEntityStyle"](_0x14b45c, _0xed1eb0, _0xa25f9d, _0xd74247) {
    const _0x54120d = _0xa25f9d["enabled"] ? Color["fromCssColorString"](_0xa25f9d["color"]) : void 0;
    _0x14b45c["polygon"] !== void 0 && (_0x14b45c["polygon"]["material"] = this["updateColorMaterial"](_0x14b45c["polygon"]["material"], _0xed1eb0 ?? Color["WHITE"]["withAlpha"](0)), !this["outlineGeometry"]["hasOutlineCompanion"](_0x14b45c) && !this["outlineGeometry"]["hasRiskyOutline"](_0x14b45c) && (_0x14b45c["polygon"]["outline"] = LayerStyleEngine["updateConstantProperty"](_0x14b45c["polygon"]["outline"], _0xa25f9d["enabled"]), _0x54120d !== void 0 && (_0x14b45c["polygon"]["outlineColor"] = LayerStyleEngine["updateConstantProperty"](_0x14b45c["polygon"]["outlineColor"], _0x54120d), _0x14b45c["polygon"]["outlineWidth"] = LayerStyleEngine["updateConstantProperty"](_0x14b45c["polygon"]["outlineWidth"], _0xa25f9d["width"]))));
    if (_0x14b45c["polyline"] !== void 0) {
      let _0x4febfb;
      _0xd74247 ? _0x4febfb = _0x54120d ?? Color["WHITE"]["withAlpha"](0) : _0x4febfb = _0xa25f9d["enabled"] ? _0x54120d : _0xed1eb0, _0x14b45c["polyline"]["material"] = this["updateColorMaterial"](_0x14b45c["polyline"]["material"], _0x4febfb ?? Color["WHITE"]["withAlpha"](0)), _0xa25f9d["enabled"] && (_0x14b45c["polyline"]["width"] = LayerStyleEngine["updateConstantProperty"](_0x14b45c["polyline"]["width"], _0xa25f9d["width"]));
    }
    _0x14b45c["point"] !== void 0 && (_0x14b45c["point"]["color"] = _0xed1eb0 !== void 0 ? this["updateColorProperty"](_0x14b45c["point"]["color"], _0xed1eb0) : void 0, _0xa25f9d["enabled"] && _0x54120d !== void 0 && (_0x14b45c["point"]["outlineColor"] = LayerStyleEngine["updateConstantProperty"](_0x14b45c["point"]["outlineColor"], _0x54120d), _0x14b45c["point"]["outlineWidth"] = LayerStyleEngine["updateConstantProperty"](_0x14b45c["point"]["outlineWidth"], _0xa25f9d["width"]))), _0x14b45c["billboard"] !== void 0 && _0xed1eb0 !== void 0 && (_0x14b45c["billboard"]["color"] = this["updateColorProperty"](_0x14b45c["billboard"]["color"], _0xed1eb0));
  }
  ["resolveFillColor"](_0x5321f4, _0x3b8297, _0x32a6fc, _0x344fd4) {
    switch (_0x3b8297["mode"]) {
      case "off":
        return void 0;
      case "solid":
        return Color["fromCssColorString"](_0x3b8297["color"])["withAlpha"](_0x3b8297["opacity"]);
      case "gradient": {
        if (_0x32a6fc === null) return void 0;
        const _0x3e6aba = this["readNumericProperty"](_0x5321f4, _0x3b8297["column"], _0x344fd4);
        if (_0x3e6aba === null) return void 0;
        if (_0x3e6aba < _0x32a6fc["min"] || _0x3e6aba > _0x32a6fc["max"]) return void 0;
        const _0x5158ff = _0x32a6fc["max"] === _0x32a6fc["min"] ? 0.5 : _0x3bd2fa["clamp"]((_0x3e6aba - _0x32a6fc["min"]) / (_0x32a6fc["max"] - _0x32a6fc["min"]), 0, 1);
        return LayerStyleEngine["sampleFromPalette"](_0x3b8297["palette"], _0x5158ff, _0x3b8297["paletteKind"])["withAlpha"](_0x3b8297["opacity"]);
      }
      case "bin": {
        if (_0x32a6fc === null) return void 0;
        const _0x1c9b83 = this["readNumericProperty"](_0x5321f4, _0x3b8297["column"], _0x344fd4);
        if (_0x1c9b83 === null) return void 0;
        const _0x2da7e1 = (_0x32a6fc["max"] - _0x32a6fc["min"]) / _0x3b8297["binCount"], _0x56eade = Array["from"]({ "length": _0x3b8297["binCount"] }, (_0x2c38e7, _0x317536) => _0x32a6fc["min"] + _0x2da7e1 * (_0x317536 + 1)), _0x1134f9 = LayerStyleEngine["pickBin"](_0x1c9b83, _0x56eade), _0x5bb61d = _0x3b8297["binCount"] <= 1 ? 0.5 : _0x1134f9 / (_0x3b8297["binCount"] - 1);
        return LayerStyleEngine["sampleFromPalette"](_0x3b8297["palette"], _0x5bb61d, _0x3b8297["paletteKind"])["withAlpha"](_0x3b8297["opacity"]);
      }
      case "enum": {
        const _0x142070 = this["readProperty"](_0x5321f4, _0x3b8297["column"], _0x344fd4);
        if (_0x142070 === null) return void 0;
        const _0x46e483 = _0x3b8297["colors"][String(_0x142070)];
        return _0x46e483 !== void 0 ? Color["fromCssColorString"](_0x46e483)["withAlpha"](_0x3b8297["opacity"]) : Color["LIGHTGRAY"]["withAlpha"](_0x3b8297["opacity"]);
      }
    }
  }
  ["readProperty"](_0x59b8cd, _0x45a40b, _0x1ee9f7) {
    const _0x1c7a11 = _0x59b8cd["properties"];
    if (_0x1c7a11 === void 0 || !_0x1c7a11["hasProperty"](_0x45a40b)) return null;
    const _0x3851af = _0x1c7a11["getValue"](_0x1ee9f7), _0x31749c = _0x3851af == null ? void 0 : _0x3851af[_0x45a40b];
    if (_0x31749c === void 0 || _0x31749c === null) return null;
    return typeof _0x31749c === "number" ? _0x31749c : String(_0x31749c);
  }
  ["readNumericProperty"](_0x2d4b26, _0x5b42a9, _0x42273f) {
    const _0x5e47d4 = this["readProperty"](_0x2d4b26, _0x5b42a9, _0x42273f);
    if (_0x5e47d4 === null) return null;
    const _0x11439e = typeof _0x5e47d4 === "number" ? _0x5e47d4 : Number(_0x5e47d4);
    return Number["isFinite"](_0x11439e) ? _0x11439e : null;
  }
  ["resolveStyleRange"](_0x349057, _0x448c17, _0x4bf452) {
    if (_0x4bf452["mode"] !== "gradient" && _0x4bf452["mode"] !== "bin") return null;
    if (_0x4bf452["min"] !== void 0 && _0x4bf452["max"] !== void 0) return { "min": _0x4bf452["min"], "max": _0x4bf452["max"] };
    const _0x44b654 = this["getColumnRange"](_0x349057, _0x448c17, _0x4bf452["column"]);
    if (_0x44b654 === null) return null;
    return { "min": _0x4bf452["min"] ?? _0x44b654["min"], "max": _0x4bf452["max"] ?? _0x44b654["max"] };
  }
  ["getColumnRange"](_0x5d0012, _0x55985f, _0x456cfa) {
    let _0x14faa1 = Infinity, _0x29b8ea = -Infinity;
    for (const _0x22f9d7 of _0x5d0012["entities"]["values"]) {
      const _0x262f29 = this["readNumericProperty"](_0x22f9d7, _0x456cfa, _0x55985f);
      if (_0x262f29 === null) continue;
      if (_0x262f29 < _0x14faa1) _0x14faa1 = _0x262f29;
      if (_0x262f29 > _0x29b8ea) _0x29b8ea = _0x262f29;
    }
    return Number["isFinite"](_0x14faa1) && Number["isFinite"](_0x29b8ea) ? { "min": _0x14faa1, "max": _0x29b8ea } : null;
  }
  static ["valueEquals"](_0xef4591, _0x5453af) {
    if (_0xef4591 instanceof Color || _0x5453af instanceof Color) return _0xef4591 instanceof Color && _0x5453af instanceof Color && Color["equals"](_0xef4591, _0x5453af);
    return _0xef4591 === _0x5453af;
  }
  static ["updateConstantProperty"](_0x28ed0a, _0x70637b) {
    if (_0x28ed0a instanceof ConstantProperty) return !LayerStyleEngine["valueEquals"](_0x28ed0a["getValue"](), _0x70637b) && _0x28ed0a["setValue"](_0x70637b), _0x28ed0a;
    return new ConstantProperty(_0x70637b);
  }
  ["updateColorProperty"](_0x1294dd, _0x5ce8e1) {
    const _0xa3ef87 = _0x1294dd !== void 0 ? this["opacityController"]["getWrappedBaseColor"](_0x1294dd) : void 0;
    if (_0xa3ef87 !== void 0) return Color["clone"](_0x5ce8e1, _0xa3ef87), _0x1294dd;
    if (_0x1294dd instanceof ConstantProperty) return !LayerStyleEngine["valueEquals"](_0x1294dd["getValue"](), _0x5ce8e1) && _0x1294dd["setValue"](_0x5ce8e1), _0x1294dd;
    return new ConstantProperty(_0x5ce8e1);
  }
  ["updateColorMaterial"](_0x597e64, _0x3a680d) {
    if (_0x597e64 instanceof ColorMaterialProperty) return _0x597e64["color"] = this["updateColorProperty"](_0x597e64["color"], _0x3a680d), _0x597e64;
    return new ColorMaterialProperty(this["updateColorProperty"](void 0, _0x3a680d));
  }
  static ["sampleFromPalette"](_0x57e2aa, _0x2d7094, _0x205e05) {
    return _0x205e05 === "qualitative" ? LayerStyleEngine["sampleDiscrete"](_0x57e2aa, _0x2d7094) : LayerStyleEngine["sampleGradient"](_0x57e2aa, _0x2d7094);
  }
  static ["sampleGradient"](_0x2790a2, _0x3ddd1f) {
    if (_0x2790a2["length"] === 0) return Color["GRAY"];
    if (_0x2790a2["length"] === 1) return Color["fromCssColorString"](_0x2790a2[0]);
    const _0x2273d7 = _0x3bd2fa["clamp"](_0x3ddd1f, 0, 1) * (_0x2790a2["length"] - 1), _0x49032a = Math["floor"](_0x2273d7), _0x5e882c = Math["min"](_0x2790a2["length"] - 1, _0x49032a + 1), _0x4599c1 = _0x2273d7 - _0x49032a, _0x4bac92 = Color["fromCssColorString"](_0x2790a2[_0x49032a]), _0xfface = Color["fromCssColorString"](_0x2790a2[_0x5e882c]);
    return Color["lerp"](_0x4bac92, _0xfface, _0x4599c1, new Color());
  }
  static ["sampleDiscrete"](_0x4f65f1, _0x310f58) {
    if (_0x4f65f1["length"] === 0) return Color["GRAY"];
    const _0xb668b8 = Math["round"](_0x3bd2fa["clamp"](_0x310f58, 0, 1) * (_0x4f65f1["length"] - 1));
    return Color["fromCssColorString"](_0x4f65f1[_0xb668b8]);
  }
  static ["pickBin"](_0x570d04, _0x11bac9) {
    for (let _0x596048 = 0; _0x596048 < _0x11bac9["length"]; _0x596048++) {
      if (_0x570d04 <= _0x11bac9[_0x596048]) return _0x596048;
    }
    return _0x11bac9["length"] - 1;
  }
}
function extractEpsgCode(_0x3c9366) {
  if (!/EPSG/i["test"](_0x3c9366)) return void 0;
  const _0x5b3a3e = _0x3c9366["trim"]();
  let _0x47e1f7 = _0x5b3a3e["length"];
  while (_0x47e1f7 > 0 && _0x5b3a3e["charCodeAt"](_0x47e1f7 - 1) >= 48 && _0x5b3a3e["charCodeAt"](_0x47e1f7 - 1) <= 57) {
    _0x47e1f7--;
  }
  const _0x3565dc = _0x5b3a3e["slice"](_0x47e1f7);
  return _0x3565dc["length"] > 0 ? _0x3565dc : void 0;
}
const proj4DefRequests = /* @__PURE__ */ new Map();
async function registerProj4Def(_0x257c1e, _0x16a2ff) {
  const _0x14935f = "EPSG:" + _0x16a2ff;
  if (_0x257c1e["defs"](_0x14935f)) return !![];
  let _0xc5fc9a = proj4DefRequests["get"](_0x16a2ff);
  !_0xc5fc9a && (_0xc5fc9a = (async () => {
    try {
      const _0x1ff099 = await fetch("https://epsg.io/" + _0x16a2ff + ".proj4");
      if (!_0x1ff099["ok"]) return _0x1ff099["status"] === 404 ? "missing" : "transient-failure";
      const _0x387957 = (await _0x1ff099["text"]())["trim"]();
      if (!_0x387957) return "missing";
      return _0x257c1e["defs"](_0x14935f, _0x387957), "registered";
    } catch {
      return "transient-failure";
    }
  })(), proj4DefRequests["set"](_0x16a2ff, _0xc5fc9a));
  const _0xd5ebc6 = await _0xc5fc9a;
  return _0xd5ebc6 === "transient-failure" && proj4DefRequests["get"](_0x16a2ff) === _0xc5fc9a && proj4DefRequests["delete"](_0x16a2ff), _0xd5ebc6 === "registered";
}
async function ensureProj4Def(_0x370504) {
  let _0x9b6439;
  try {
    ({ default: _0x9b6439 } = await import("proj4"));
  } catch {
    return console["warn"]("[ogc/proj4Defs] EPSG:" + _0x370504 + ' icin koordinat donusumu atlandi -- "proj4" paketi yuklu degil (peer dependency olarak eklenmemis). Bu EPSG kodunu kullanan WCS katmanlari yanlis/genis bir alanda gorunebilir.'), void 0;
  }
  if (!await registerProj4Def(_0x9b6439, _0x370504)) return console["warn"]("[ogc/proj4Defs] EPSG:" + _0x370504 + " icin proj4 tanimi epsg.io'dan alinamadi (agsizlik veya gecersiz/desteklenmeyen kod olabilir). Bu EPSG kodunu kullanan WCS katmanlari yanlis/genis bir alanda gorunebilir."), void 0;
  return _0x9b6439;
}
const CESIUM_BUILTIN_CRS_NAMES = /* @__PURE__ */ new Set(["urn:ogc:def:crs:OGC:1.3:CRS84", "EPSG:4326", "urn:ogc:def:crs:EPSG::4326"]);
function defaultCrsFunction(_0x158fc5) {
  return Cartesian3["fromDegrees"](_0x158fc5[0], _0x158fc5[1], _0x158fc5[2]);
}
function numericCodeString(_0x176bfb) {
  if (_0x176bfb === void 0) return void 0;
  const _0x1a1bf8 = String(_0x176bfb)["trim"]();
  return /^\d+$/["test"](_0x1a1bf8) ? _0x1a1bf8 : void 0;
}
function isSuspiciousCrsResult(_0x4af55d) {
  return _0x4af55d !== null && _0x4af55d["kind"] !== "reprojected";
}
function firstCoordinatePair(_0x4b982d) {
  let _0x34a329 = _0x4b982d;
  while (Array["isArray"](_0x34a329) && _0x34a329["length"] > 0 && Array["isArray"](_0x34a329[0])) {
    _0x34a329 = _0x34a329[0];
  }
  if (Array["isArray"](_0x34a329) && _0x34a329["length"] >= 2 && typeof _0x34a329[0] === "number" && typeof _0x34a329[1] === "number") return [_0x34a329[0], _0x34a329[1]];
  return void 0;
}
function findFirstCoordinates(_0x3cd9e6) {
  if (typeof _0x3cd9e6 !== "object" || _0x3cd9e6 === null) return void 0;
  const _0x295a30 = _0x3cd9e6;
  if (_0x295a30["type"] === "FeatureCollection" && Array["isArray"](_0x295a30["features"])) {
    for (const _0x1aa13b of _0x295a30["features"]) {
      const _0xe30f19 = findFirstCoordinates(_0x1aa13b);
      if (_0xe30f19) return _0xe30f19;
    }
    return void 0;
  }
  if (_0x295a30["type"] === "Feature") return findFirstCoordinates(_0x295a30["geometry"]);
  if (_0x295a30["type"] === "GeometryCollection" && Array["isArray"](_0x295a30["geometries"])) {
    for (const _0xb0a066 of _0x295a30["geometries"]) {
      const _0x45a133 = findFirstCoordinates(_0xb0a066);
      if (_0x45a133) return _0x45a133;
    }
    return void 0;
  }
  if ("coordinates" in _0x295a30) return firstCoordinatePair(_0x295a30["coordinates"]);
  return void 0;
}
function resolveOrRejectUnresolvedCrs(_0x479c79, _0x5da10f, _0x251037) {
  if (!_0x251037) throw new GeometryError("CRS_UNRESOLVED_UNSUPPORTED", "Koordinat sistemi tanınamadı ve WGS84 ile uyumlu değil.");
  return GeoJsonDataSource["crsNames"][_0x479c79] = defaultCrsFunction, { "kind": "suspicious-unresolved-crs", "crsName": _0x5da10f };
}
function acceptClaimedWgs84(_0x251eca, _0x26bc1d, _0x2c4845) {
  if (!_0x26bc1d) throw new GeometryError("CRS_CLAIMED_WGS84_INVALID", "Koordinatlar WGS84 ile uyumlu değil.");
  if (_0x2c4845) GeoJsonDataSource["crsNames"][_0x251eca] = defaultCrsFunction;
  return null;
}
function computeLooksLikeWgs84(_0x125ba7) {
  const _0x40d908 = findFirstCoordinates(_0x125ba7);
  return !_0x40d908 || Math["abs"](_0x40d908[0]) <= 180 && Math["abs"](_0x40d908[1]) <= 90;
}
function resolveCrsFieldOrThrow(_0x45aad4, _0x49907a) {
  const _0x5dfaf1 = "crs" in _0x45aad4 ? _0x45aad4["crs"] : void 0;
  if (!_0x5dfaf1 || typeof _0x5dfaf1 !== "object") {
    if (!_0x49907a) throw new GeometryError("CRS_MISSING_UNSUPPORTED", "Bu dosyada geçerli koordinat sistemi (CRS) bilgisi yok.");
    return null;
  }
  return _0x5dfaf1;
}
async function ensureGeoJsonCrsSupport(_0x53957a) {
  var _a2, _b, _c;
  if (typeof _0x53957a !== "object" || _0x53957a === null) return null;
  const _0x27089d = computeLooksLikeWgs84(_0x53957a), _0x23dcbc = resolveCrsFieldOrThrow(_0x53957a, _0x27089d);
  if (!_0x23dcbc) return null;
  const _0x938c99 = _0x23dcbc["type"] === "EPSG", _0x4373b4 = _0x938c99 ? "EPSG:" + ((_a2 = _0x23dcbc["properties"]) == null ? void 0 : _a2["code"]) : (_b = _0x23dcbc["properties"]) == null ? void 0 : _b["name"];
  if (!_0x4373b4 || typeof _0x4373b4 !== "string") return null;
  if (CESIUM_BUILTIN_CRS_NAMES["has"](_0x4373b4)) return acceptClaimedWgs84(_0x4373b4, _0x27089d, ![]);
  const _0x117561 = _0x938c99 ? numericCodeString((_c = _0x23dcbc["properties"]) == null ? void 0 : _c["code"]) : extractEpsgCode(_0x4373b4);
  if (!_0x117561) return resolveOrRejectUnresolvedCrs(_0x4373b4, _0x4373b4, _0x27089d);
  if (_0x117561 === "4326") return acceptClaimedWgs84(_0x4373b4, _0x27089d, !![]);
  const _0x491606 = "EPSG:" + _0x117561;
  let _0x26d9a1;
  try {
    ({ default: _0x26d9a1 } = await import("proj4"));
  } catch {
    return resolveOrRejectUnresolvedCrs(_0x4373b4, _0x491606, _0x27089d);
  }
  if (!await registerProj4Def(_0x26d9a1, _0x117561)) return resolveOrRejectUnresolvedCrs(_0x4373b4, _0x491606, _0x27089d);
  return GeoJsonDataSource["crsNames"][_0x4373b4] = (_0x46fb29) => {
    const [_0x1c5ab0, _0x19e978] = _0x26d9a1(_0x491606, "EPSG:4326", [_0x46fb29[0], _0x46fb29[1]]);
    return Cartesian3["fromDegrees"](_0x1c5ab0, _0x19e978, _0x46fb29[2]);
  }, { "kind": "reprojected", "fromEpsg": _0x491606 };
}
class LocalSourceLoader {
  constructor(_0x1be1d6, _0x1c128b) {
    this["viewer"] = _0x1be1d6, this["deps"] = _0x1c128b;
  }
  async ["addLocalKmlGeoJson"](_0x30d683, _0x3b9ffe) {
    let _0x5939e7, _0x4b1ca2, _0x16e850 = null;
    const _0x480576 = this["deps"]["styleEngine"]["randomLayerColor"]();
    let _0x136450 = _0x3b9ffe["clampToGround"] ?? !![];
    if (_0x30d683 === "GEOJSON") {
      const _0x57fc79 = _0x3b9ffe["data"] instanceof File ? JSON["parse"](await this["fileToText"](_0x3b9ffe["data"])) : _0x3b9ffe["data"];
      _0x16e850 = await ensureGeoJsonCrsSupport(_0x57fc79);
      if (isSuspiciousCrsResult(_0x16e850)) _0x136450 = ![];
      _0x5939e7 = await GeoJsonDataSource["load"](_0x57fc79, { "clampToGround": _0x136450, "fill": _0x480576["withAlpha"](0.5), "stroke": _0x480576, "strokeWidth": 2, "markerColor": _0x480576 }), this["deps"]["styleEngine"]["applyEntityColor"](_0x5939e7, _0x480576), this["deps"]["styleEngine"]["convertMarkersToPoints"](_0x5939e7, _0x480576);
      if (isSuspiciousCrsResult(_0x16e850)) this["deps"]["outlineGeometry"]["flattenSuspiciousGeometry"](_0x5939e7);
    } else {
      let _0x28af39;
      _0x3b9ffe["data"] instanceof File ? (_0x4b1ca2 = this["fileToBlobUrl"](_0x3b9ffe["data"]), _0x28af39 = _0x4b1ca2) : _0x28af39 = _0x3b9ffe["data"], _0x5939e7 = await KmlDataSource["load"](_0x28af39, { "camera": this["viewer"]["scene"]["camera"], "canvas": this["viewer"]["scene"]["canvas"], "clampToGround": _0x136450 }), this["deps"]["styleEngine"]["applyEntityColor"](_0x5939e7, _0x480576);
    }
    this["deps"]["outlineGeometry"]["disableRiskyPolygonOutlines"](_0x5939e7);
    _0x136450 && this["deps"]["addPolygonOutlines"](_0x5939e7, this["deps"]["defaultOutlineColor"], 2);
    await this["viewer"]["dataSources"]["add"](_0x5939e7);
    _0x4b1ca2 !== void 0 && URL["revokeObjectURL"](_0x4b1ca2);
    const _0x35e772 = _0x480576["toCssHexString"](), _0x4bbf0f = this["deps"]["register"](_0x3b9ffe["id"], _0x3b9ffe["title"], _0x30d683, _0x5939e7, ![], _0x35e772);
    return this["deps"]["emitCrsCheckResult"](_0x4bbf0f["id"], _0x16e850), this["deps"]["styleEngine"]["recordInitialStyle"](_0x4bbf0f["id"], _0x35e772, 0.5, { "enabled": !![], "color": this["deps"]["defaultOutlineColorHex"], "width": 2 }), await this["deps"]["waitForRenderSettle"](), _0x4bbf0f;
  }
  async ["addShp"](_0x4083bf) {
    let _0x5b136c;
    try {
      ({ getShapefile: _0x5b136c } = await import("shpjs"));
    } catch {
      throw new LayerOperationError("LAYER_SHP_PACKAGE_MISSING", 'SHP katmanı için "shpjs" paketi gereklidir: shpjs kütüphanesini import etmelisiniz');
    }
    const _0x1688e0 = _0x4083bf["data"] instanceof File ? await this["fileToArrayBuffer"](_0x4083bf["data"]) : _0x4083bf["data"], _0x530178 = await _0x5b136c(_0x1688e0), _0x4ccb54 = Array["isArray"](_0x530178) ? { "type": "FeatureCollection", "features": _0x530178["flatMap"]((_0x41a6f7) => _0x41a6f7["features"]) } : _0x530178;
    return loadVectorGeoJsonLayer(this["viewer"], this["deps"], _0x4ccb54, { "id": _0x4083bf["id"], "title": _0x4083bf["title"], "layerType": "SHP", "clampToGround": _0x4083bf["clampToGround"] ?? !![] });
  }
  async ["addCsv"](_0x121c81) {
    let _0x5e2cea;
    try {
      ({ default: _0x5e2cea } = await import("papaparse"));
    } catch {
      throw new LayerOperationError("LAYER_CSV_PACKAGE_MISSING", 'CSV katmanı için "papaparse" paketi gereklidir: papaparse kütüphanesini import etmelisiniz');
    }
    const _0x416753 = _0x121c81["data"] instanceof File ? await this["fileToText"](_0x121c81["data"]) : _0x121c81["data"], _0x518c90 = _0x5e2cea["parse"](_0x416753, { "header": !![], "dynamicTyping": !![] }), _0x53c109 = _0x518c90["data"], _0x475133 = _0x53c109["find"]((_0x5ec4d5) => _0x5ec4d5 && Object["keys"](_0x5ec4d5)["length"] > 0), _0x41b4f3 = _0x475133 && this["detectLatLonKeys"](_0x475133);
    if (!_0x41b4f3) throw new LayerOperationError("LAYER_CSV_LATLON_NOT_FOUND", "CSV içinde lat/lon sütunlarını bulamadım (ör: lat, lon).");
    const _0x46a63a = this["deps"]["styleEngine"]["randomLayerColor"](), _0x33dcbd = new CustomDataSource(_0x121c81["title"]);
    for (const _0x21702b of _0x53c109) {
      const _0x6a9fd4 = Number(_0x21702b[_0x41b4f3["lat"]]), _0x2b57b2 = Number(_0x21702b[_0x41b4f3["lon"]]);
      Number["isFinite"](_0x6a9fd4) && Number["isFinite"](_0x2b57b2) && _0x33dcbd["entities"]["add"]({ "position": Cartesian3["fromDegrees"](_0x2b57b2, _0x6a9fd4), "point": { "pixelSize": 6, "color": _0x46a63a }, "properties": _0x21702b });
    }
    await this["viewer"]["dataSources"]["add"](_0x33dcbd);
    const _0x21945e = _0x46a63a["toCssHexString"](), _0x3599c2 = this["deps"]["register"](_0x121c81["id"], _0x121c81["title"], "CSV", _0x33dcbd, ![], _0x21945e);
    return this["deps"]["styleEngine"]["recordInitialStyle"](_0x3599c2["id"], _0x21945e, 1, { "enabled": ![], "color": _0x21945e, "width": 0 }), _0x3599c2;
  }
  ["detectLatLonKeys"](_0x7c9677) {
    const _0x4fe8dd = Object["keys"](_0x7c9677)["reduce"]((_0x3b1b89, _0x1313e9) => {
      const _0x1eb60d = _0x1313e9["toLowerCase"]();
      if (!_0x3b1b89["lat"] && /^(lat|latitude|y)$/["test"](_0x1eb60d)) _0x3b1b89["lat"] = _0x1313e9;
      if (!_0x3b1b89["lon"] && /^(lon|lng|long|longitude|x)$/["test"](_0x1eb60d)) _0x3b1b89["lon"] = _0x1313e9;
      return _0x3b1b89;
    }, { "lat": "", "lon": "" });
    return _0x4fe8dd["lat"] && _0x4fe8dd["lon"] ? _0x4fe8dd : null;
  }
  async ["fileToText"](_0x172d42) {
    return decodeTextBuffer(await _0x172d42["arrayBuffer"]());
  }
  ["fileToBlobUrl"](_0x26d70f) {
    return URL["createObjectURL"](_0x26d70f);
  }
  ["fileToArrayBuffer"](_0x4d0eff) {
    return _0x4d0eff["arrayBuffer"]();
  }
}
async function loadVectorGeoJsonLayer(_0x430283, _0x174e2c, _0x5e6ef5, _0xfdfff5, _0x553d53) {
  const _0x15f8b0 = await ensureGeoJsonCrsSupport(_0x5e6ef5), _0x3d3298 = _0x174e2c["styleEngine"]["randomLayerColor"](), _0x189c81 = isSuspiciousCrsResult(_0x15f8b0) ? ![] : _0xfdfff5["clampToGround"], _0x2f410b = await GeoJsonDataSource["load"](_0x5e6ef5, { "clampToGround": _0x189c81, "fill": _0x3d3298["withAlpha"](0.5), "stroke": _0x3d3298, "strokeWidth": 2, "markerColor": _0x3d3298 });
  _0x174e2c["styleEngine"]["applyEntityColor"](_0x2f410b, _0x3d3298), _0x174e2c["styleEngine"]["convertMarkersToPoints"](_0x2f410b, _0x3d3298), _0x174e2c["outlineGeometry"]["disableRiskyPolygonOutlines"](_0x2f410b);
  if (isSuspiciousCrsResult(_0x15f8b0)) _0x174e2c["outlineGeometry"]["flattenSuspiciousGeometry"](_0x2f410b);
  _0x189c81 && _0x174e2c["addPolygonOutlines"](_0x2f410b, _0x174e2c["defaultOutlineColor"], 2);
  await _0x430283["dataSources"]["add"](_0x2f410b);
  const _0x194b8b = _0x3d3298["toCssHexString"](), _0x118707 = _0x174e2c["register"](_0xfdfff5["id"], _0xfdfff5["title"], _0xfdfff5["layerType"], _0x2f410b, ![], _0x194b8b);
  return _0x174e2c["emitCrsCheckResult"](_0x118707["id"], _0x15f8b0), _0x553d53 == null ? void 0 : _0x553d53(_0x118707), _0x174e2c["styleEngine"]["recordInitialStyle"](_0x118707["id"], _0x194b8b, 0.5, { "enabled": !![], "color": _0x174e2c["defaultOutlineColorHex"], "width": 2 }), await _0x174e2c["waitForRenderSettle"](), _0x118707;
}
function decodeTextBuffer(_0x5e71fd) {
  try {
    return new TextDecoder("utf-8", { "fatal": !![] })["decode"](_0x5e71fd);
  } catch {
    return new TextDecoder("windows-1254")["decode"](_0x5e71fd);
  }
}
const els = (_0x15c01b, _0x12a572) => Array["from"](_0x15c01b["getElementsByTagNameNS"]("*", _0x12a572)), el = (_0x494708, _0x5538bb) => els(_0x494708, _0x5538bb)[0], txt = (_0x1a7c12, _0x47d5cc) => {
  var _a2, _b;
  return (_b = (_a2 = el(_0x1a7c12, _0x47d5cc)) == null ? void 0 : _a2["textContent"]) == null ? void 0 : _b["trim"]();
};
function buildWfsCapabilitiesUrl(_0x365ff7) {
  const _0x6e962e = new URL(_0x365ff7, window["location"]["origin"]), _0x2b7f89 = new URL("" + _0x6e962e["origin"] + _0x6e962e["pathname"]);
  for (const [_0x353e43, _0x1c73ef] of _0x6e962e["searchParams"]["entries"]()) {
    const _0x323f4 = _0x353e43["toLowerCase"]();
    (_0x323f4 === "url" || _0x323f4 === "tucbsapikey") && _0x2b7f89["searchParams"]["set"](_0x353e43, _0x1c73ef);
  }
  return _0x2b7f89["searchParams"]["set"]("service", "WFS"), _0x2b7f89["searchParams"]["set"]("request", "GetCapabilities"), _0x2b7f89["searchParams"]["set"]("acceptVersions", "2.0.0,1.1.0,1.0.0"), _0x2b7f89["toString"]();
}
function isOgcExceptionXml(_0x85bb7d) {
  const _0x443a8a = _0x85bb7d["trimStart"]();
  return _0x443a8a["startsWith"]("<") && (_0x443a8a["includes"]("ExceptionReport") || _0x443a8a["includes"]("ServiceExceptionReport"));
}
function repairBareAmpersands(_0x212de7) {
  return _0x212de7["replace"](/&(?!(?:amp|lt|gt|quot|apos|#\d+|#x[\da-fA-F]+);)/gi, "&amp;");
}
async function fetchWfsCapabilities(_0x1b1281, _0x1a7c8a = {}) {
  const _0x4da4cc = await fetch(buildWfsCapabilitiesUrl(_0x1b1281), _0x1a7c8a);
  if (!_0x4da4cc["ok"]) throw new OgcRequestError("OGC_CAPABILITIES_REQUEST_FAILED", "WFS GetCapabilities başarısız: " + _0x4da4cc["status"] + " " + _0x4da4cc["statusText"]);
  const _0x5f2c6a = await _0x4da4cc["text"]();
  if (isOgcExceptionXml(_0x5f2c6a)) throw new OgcRequestError("OGC_CAPABILITIES_EXCEPTION", "WFS GetCapabilities OGC Exception döndü.");
  const _0x3c8c4b = repairBareAmpersands(_0x5f2c6a), _0x15cd91 = new DOMParser()["parseFromString"](_0x3c8c4b, "application/xml");
  if (_0x15cd91["querySelector"]("parsererror")) throw new OgcRequestError("OGC_CAPABILITIES_PARSE_FAILED", "WFS GetCapabilities XML parse edilemedi.");
  const _0x4523c8 = _0x15cd91["documentElement"]["getAttribute"]("version") || "2.0.0", _0x5579e9 = [];
  for (const _0x49ae10 of els(_0x15cd91, "FeatureType")) {
    const _0x58f337 = txt(_0x49ae10, "Name") || "";
    if (!_0x58f337) continue;
    const _0x20f3ec = els(_0x49ae10, "OutputFormats")["flatMap"]((_0x5eef56) => els(_0x5eef56, "Format")["map"]((_0x22bb55) => {
      var _a2;
      return ((_a2 = _0x22bb55["textContent"]) == null ? void 0 : _a2["trim"]()) || "";
    })["filter"](Boolean)), _0x23fc75 = txt(_0x49ae10, "Title"), _0x80f523 = txt(_0x49ae10, "DefaultCRS"), _0x719e43 = txt(_0x49ae10, "DefaultSRS");
    _0x5579e9["push"]({ "name": _0x58f337, ..._0x23fc75 ? { "title": _0x23fc75 } : {}, ..._0x80f523 ? { "defaultCRS": _0x80f523 } : {}, ..._0x719e43 ? { "defaultSRS": _0x719e43 } : {}, ..._0x20f3ec["length"] ? { "outputFormats": _0x20f3ec } : {} });
  }
  const _0xa165a0 = el(_0x15cd91, "OperationsMetadata");
  let _0x5ed427 = [];
  if (_0xa165a0) {
    const _0x4de08a = els(_0xa165a0, "Operation")["find"]((_0x4b4679) => (_0x4b4679["getAttribute"]("name") || "") === "GetFeature"), _0x5b31a8 = els(_0x4de08a ?? _0xa165a0, "Parameter")["find"]((_0x51d1d8) => (_0x51d1d8["getAttribute"]("name") || "")["toLowerCase"]() === "outputformat");
    _0x5b31a8 && (_0x5ed427 = els(_0x5b31a8, "Value")["map"]((_0x1b5e6c) => {
      var _a2;
      return ((_a2 = _0x1b5e6c["textContent"]) == null ? void 0 : _a2["trim"]()) || "";
    })["filter"](Boolean));
  }
  if (!_0x5ed427["length"]) {
    const _0x88782e = /* @__PURE__ */ new Set();
    _0x5ed427 = _0x5579e9["flatMap"]((_0x608c14) => _0x608c14["outputFormats"] || [])["filter"]((_0x38ddbc) => !_0x88782e["has"](_0x38ddbc) && _0x88782e["add"](_0x38ddbc));
  }
  return { "version": _0x4523c8, "featureTypes": _0x5579e9, "outputFormats": _0x5ed427 };
}
function normName(_0x4ce890) {
  return _0x4ce890["trim"]()["toLowerCase"]();
}
function localTypeName(_0x2ff4c0) {
  const _0x500a45 = _0x2ff4c0["lastIndexOf"](":");
  return _0x500a45 >= 0 ? _0x2ff4c0["slice"](_0x500a45 + 1) : _0x2ff4c0;
}
function resolveWfsFeatureType(_0x3acd6c, _0x393fbc) {
  if (!_0x393fbc["length"]) throw new OgcRequestError("OGC_FEATURE_TYPE_NOT_FOUND", "WFS FeatureType bulunamadı.");
  const _0x1a945c = _0x3acd6c == null ? void 0 : _0x3acd6c["trim"]();
  if (_0x1a945c) {
    const _0x40e5a4 = _0x393fbc["find"]((_0x35e3d4) => normName(_0x35e3d4["name"]) === normName(_0x1a945c));
    if (_0x40e5a4) return _0x40e5a4;
    const _0x43a7c3 = normName(localTypeName(_0x1a945c)), _0x48c301 = _0x393fbc["find"]((_0xa8a04d) => normName(localTypeName(_0xa8a04d["name"])) === _0x43a7c3);
    if (_0x48c301) return _0x48c301;
  }
  return _0x393fbc[0];
}
function pickJsonOutput(_0x1a747c) {
  const _0x1522e6 = ["application/geo+json", "application/json;subtype=geojson", "application/json", "geojson", "json", "esrigeojson", "geojson+gzip", "geojson+zip"], _0x2b78d4 = _0x1a747c["map"]((_0x248e43) => _0x248e43["toLowerCase"]()["replace"](/\s+/g, ""));
  for (const _0x472108 of _0x1522e6) {
    const _0x60f115 = _0x2b78d4["findIndex"]((_0x35c0ad) => _0x35c0ad === _0x472108 || _0x35c0ad["includes"](_0x472108));
    if (_0x60f115 >= 0) return _0x1a747c[_0x60f115] ?? null;
  }
  return null;
}
function buildWfsGetFeaturePlan(_0x423c18) {
  const _0x3c6a31 = resolveWfsFeatureType(_0x423c18["typeNameHint"], _0x423c18["caps"]["featureTypes"]), _0x42091d = _0x423c18["version"] || _0x423c18["caps"]["version"] || "2.0.0", _0x38ceb9 = _0x423c18["srsName"] || _0x3c6a31["defaultCRS"] || _0x3c6a31["defaultSRS"] || "EPSG:4326", _0xc1e0f5 = _0x423c18["outputFormat"] || pickJsonOutput(_0x3c6a31["outputFormats"] || []) || pickJsonOutput(_0x423c18["caps"]["outputFormats"]), _0x2efa84 = _0x423c18["maxFeatures"] ?? 5e3;
  return { "version": _0x42091d, "typeName": _0x3c6a31["name"], "srsName": _0x38ceb9, "jsonOutputFormat": _0xc1e0f5, "maxFeatures": _0x2efa84 };
}
function appendWfsGetFeatureParams(_0x5da517, _0x19a934, _0x462c37) {
  _0x5da517["set"]("service", "WFS"), _0x5da517["set"]("request", "GetFeature"), _0x5da517["set"]("version", _0x19a934["version"]);
  const _0x3d0578 = _0x19a934["version"]["startsWith"]("2.");
  _0x5da517["set"](_0x3d0578 ? "typeNames" : "typeName", _0x19a934["typeName"]), _0x5da517["set"]("srsName", _0x19a934["srsName"]);
  _0x462c37 && _0x5da517["set"]("outputFormat", _0x462c37);
  const _0x1faa77 = _0x3d0578 ? "count" : "maxFeatures";
  _0x5da517["set"](_0x1faa77, String(_0x19a934["maxFeatures"]));
}
async function getCapabilities(_0x2cc967, _0x21676b, _0x497530) {
  const _0x243ec4 = _0x497530 == null ? void 0 : _0x497530["mergeApiKeyHeader"](_0x497530["buildAuthHeaders"](_0x21676b), _0x2cc967), _0x80886f = await fetch(_0x2cc967, _0x243ec4 ? { "headers": _0x243ec4 } : void 0);
  if (!_0x80886f["ok"]) throw new OgcRequestError("OGC_CAPABILITIES_REQUEST_FAILED", "GetCapabilities isteği başarısız: " + _0x80886f["status"] + " " + _0x80886f["statusText"]);
  const _0x1bf782 = await _0x80886f["text"](), _0x133033 = new DOMParser()["parseFromString"](_0x1bf782, "application/xml");
  if (_0x133033["getElementsByTagName"]("parsererror")["length"] > 0) throw new OgcRequestError("OGC_SERVICE_DISCOVERY_PARSE_FAILED", "GetCapabilities yanıtı XML olarak ayrıştırılamadı.");
  return _0x133033;
}
function parseWmsStyles(_0x1c0233, _0x3f4c1a) {
  var _a2, _b, _c, _d;
  const _0x5c4528 = elementsByLocalName(_0x1c0233, "Layer")["find"]((_0x38b923) => {
    var _a3, _b2;
    return ((_b2 = (_a3 = childByLocalName(_0x38b923, "Name")) == null ? void 0 : _a3["textContent"]) == null ? void 0 : _b2["trim"]()) === _0x3f4c1a;
  });
  if (!_0x5c4528) return [];
  const _0x202fff = [];
  for (const _0x39a444 of Array["from"](_0x5c4528["children"])) {
    if (_0x39a444["localName"] !== "Style") continue;
    const _0x2a4f96 = (_b = (_a2 = childByLocalName(_0x39a444, "Name")) == null ? void 0 : _a2["textContent"]) == null ? void 0 : _b["trim"]();
    if (!_0x2a4f96) continue;
    const _0xd5d181 = ((_d = (_c = childByLocalName(_0x39a444, "Title")) == null ? void 0 : _c["textContent"]) == null ? void 0 : _d["trim"]()) ?? _0x2a4f96;
    _0x202fff["push"]({ "name": _0x2a4f96, "title": _0xd5d181 });
  }
  return _0x202fff;
}
function parseWmtsStyles(_0x580cac, _0x2686a1) {
  var _a2, _b, _c, _d, _e;
  const _0x316cb1 = elementsByLocalName(_0x580cac, "Layer")["find"]((_0x4b54b3) => {
    var _a3, _b2;
    return ((_b2 = (_a3 = childByLocalName(_0x4b54b3, "Identifier")) == null ? void 0 : _a3["textContent"]) == null ? void 0 : _b2["trim"]()) === _0x2686a1;
  });
  if (!_0x316cb1) return [];
  const _0x54deeb = [];
  for (const _0x38a1c9 of Array["from"](_0x316cb1["children"])) {
    if (_0x38a1c9["localName"] !== "Style") continue;
    const _0x1b8fff = (_b = (_a2 = childByLocalName(_0x38a1c9, "Identifier")) == null ? void 0 : _a2["textContent"]) == null ? void 0 : _b["trim"]();
    if (!_0x1b8fff) continue;
    const _0x5c41ce = ((_d = (_c = childByLocalName(_0x38a1c9, "Title")) == null ? void 0 : _c["textContent"]) == null ? void 0 : _d["trim"]()) ?? _0x1b8fff, _0x17770f = ((_e = childByLocalName(_0x38a1c9, "LegendURL")) == null ? void 0 : _e["getAttribute"]("xlink:href")) ?? "", _0x31d031 = _0x38a1c9["getAttribute"]("isDefault") === "true";
    _0x54deeb["push"]({ "name": _0x1b8fff, "title": _0x5c41ce, "legendUrl": _0x17770f, "isDefault": _0x31d031 });
  }
  return _0x54deeb["sort"]((_0x198554, _0x2144df) => Number(_0x2144df["isDefault"]) - Number(_0x198554["isDefault"])), _0x54deeb["map"]((_0xdebff7) => ({ "name": _0xdebff7["name"], "title": _0xdebff7["title"], "legendUrl": _0xdebff7["legendUrl"] }));
}
function buildCapabilitiesUrl(_0x4800be, _0x95ff97, _0x2fbcd0) {
  const _0x46b0bd = new URL(_0x4800be);
  return _0x46b0bd["searchParams"]["set"]("SERVICE", _0x95ff97), _0x46b0bd["searchParams"]["set"]("REQUEST", "GetCapabilities"), _0x46b0bd["searchParams"]["set"]("VERSION", _0x2fbcd0), _0x46b0bd["toString"]();
}
function elementsByLocalName(_0x489984, _0x245c73) {
  return Array["from"](_0x489984["getElementsByTagNameNS"]("*", _0x245c73));
}
function childByLocalName(_0x38c042, _0xec7cfe) {
  return Array["from"](_0x38c042["children"])["find"]((_0x4e83fa) => _0x4e83fa["localName"] === _0xec7cfe);
}
function parseWmsGeographicBoundingBox(_0x499f0a) {
  var _a2, _b, _c, _d;
  const _0x4d82b8 = childByLocalName(_0x499f0a, "EX_GeographicBoundingBox");
  if (_0x4d82b8) {
    const _0x473071 = (_a2 = childByLocalName(_0x4d82b8, "westBoundLongitude")) == null ? void 0 : _a2["textContent"], _0x256f6c = (_b = childByLocalName(_0x4d82b8, "eastBoundLongitude")) == null ? void 0 : _b["textContent"], _0x1bd61a = (_c = childByLocalName(_0x4d82b8, "southBoundLatitude")) == null ? void 0 : _c["textContent"], _0x29ea74 = (_d = childByLocalName(_0x4d82b8, "northBoundLatitude")) == null ? void 0 : _d["textContent"];
    if (_0x473071 && _0x256f6c && _0x1bd61a && _0x29ea74) {
      const _0x5c3aef = { "west": Number(_0x473071), "south": Number(_0x1bd61a), "east": Number(_0x256f6c), "north": Number(_0x29ea74) };
      if (Object["values"](_0x5c3aef)["every"](Number["isFinite"])) return _0x5c3aef;
    }
  }
  const _0xd00d10 = childByLocalName(_0x499f0a, "LatLonBoundingBox");
  if (_0xd00d10) {
    const _0x18dd48 = { "west": Number(_0xd00d10["getAttribute"]("minx")), "south": Number(_0xd00d10["getAttribute"]("miny")), "east": Number(_0xd00d10["getAttribute"]("maxx")), "north": Number(_0xd00d10["getAttribute"]("maxy")) };
    if (Object["values"](_0x18dd48)["every"](Number["isFinite"])) return _0x18dd48;
  }
  return void 0;
}
function parseWmsCapabilities(_0x534b72) {
  var _a2;
  const _0x1a0649 = [];
  for (const _0x20155d of elementsByLocalName(_0x534b72, "Layer")) {
    const _0x42cd74 = childByLocalName(_0x20155d, "Name");
    if (!(_0x42cd74 == null ? void 0 : _0x42cd74["textContent"])) continue;
    const _0x61a0e5 = childByLocalName(_0x20155d, "Title"), _0x3eb4dd = parseWmsGeographicBoundingBox(_0x20155d);
    _0x1a0649["push"]({ "identifier": _0x42cd74["textContent"]["trim"](), "title": ((_a2 = _0x61a0e5 == null ? void 0 : _0x61a0e5["textContent"]) == null ? void 0 : _a2["trim"]()) || _0x42cd74["textContent"]["trim"](), ..._0x3eb4dd && { "geographicBoundingBox": _0x3eb4dd } });
  }
  return _0x1a0649;
}
function parseWmsTiffFormat(_0x4c9407) {
  const _0x31bbc1 = elementsByLocalName(_0x4c9407, "GetMap")[0];
  if (!_0x31bbc1) return void 0;
  const _0x34564e = new Set(elementsByLocalName(_0x31bbc1, "Format")["map"]((_0x4a3c62) => {
    var _a2;
    return (_a2 = _0x4a3c62["textContent"]) == null ? void 0 : _a2["trim"]()["toLowerCase"]();
  })["filter"]((_0x60bcc4) => !!_0x60bcc4));
  if (_0x34564e["has"]("image/geotiff")) return "image/geotiff";
  if (_0x34564e["has"]("image/tiff")) return "image/tiff";
  return void 0;
}
function parseWcsTiffFormat(_0x59dc03) {
  const _0x381d35 = new Set(elementsByLocalName(_0x59dc03, "formatSupported")["map"]((_0x225916) => {
    var _a2;
    return (_a2 = _0x225916["textContent"]) == null ? void 0 : _a2["trim"]()["toLowerCase"]();
  })["filter"]((_0x2d2ef5) => !!_0x2d2ef5));
  if (_0x381d35["has"]("image/geotiff")) return "image/geotiff";
  if (_0x381d35["has"]("image/tiff")) return "image/tiff";
  return void 0;
}
function parseWmtsCapabilities(_0x21d65a) {
  var _a2;
  const _0x512346 = [];
  for (const _0x2ddc1b of elementsByLocalName(_0x21d65a, "Layer")) {
    const _0x50d66a = childByLocalName(_0x2ddc1b, "Identifier");
    if (!(_0x50d66a == null ? void 0 : _0x50d66a["textContent"])) continue;
    const _0x542852 = childByLocalName(_0x2ddc1b, "Title"), _0x1cd84c = childByLocalName(_0x2ddc1b, "TileMatrixSetLink"), _0x546201 = _0x1cd84c ? childByLocalName(_0x1cd84c, "TileMatrixSet") : void 0;
    _0x512346["push"]({ "identifier": _0x50d66a["textContent"]["trim"](), "title": ((_a2 = _0x542852 == null ? void 0 : _0x542852["textContent"]) == null ? void 0 : _a2["trim"]()) || _0x50d66a["textContent"]["trim"](), ...(_0x546201 == null ? void 0 : _0x546201["textContent"]) && { "tileMatrixSetID": _0x546201["textContent"]["trim"]() } });
  }
  return _0x512346;
}
function parseWfsCapabilities(_0x311b0d) {
  var _a2;
  const _0x5b96a2 = [];
  for (const _0x199726 of elementsByLocalName(_0x311b0d, "FeatureType")) {
    const _0x33d5d9 = childByLocalName(_0x199726, "Name");
    if (!(_0x33d5d9 == null ? void 0 : _0x33d5d9["textContent"])) continue;
    const _0x22de6c = childByLocalName(_0x199726, "Title");
    _0x5b96a2["push"]({ "identifier": _0x33d5d9["textContent"]["trim"](), "title": ((_a2 = _0x22de6c == null ? void 0 : _0x22de6c["textContent"]) == null ? void 0 : _a2["trim"]()) || _0x33d5d9["textContent"]["trim"]() });
  }
  return _0x5b96a2;
}
function parseWcsCapabilities(_0x4d526e) {
  var _a2, _b;
  const _0x4fcd3d = [];
  for (const _0x55eec2 of elementsByLocalName(_0x4d526e, "CoverageSummary")) {
    const _0x612555 = childByLocalName(_0x55eec2, "CoverageId") ?? childByLocalName(_0x55eec2, "Identifier");
    if (!(_0x612555 == null ? void 0 : _0x612555["textContent"])) continue;
    const _0x60f5f4 = childByLocalName(_0x55eec2, "Title");
    _0x4fcd3d["push"]({ "identifier": _0x612555["textContent"]["trim"](), "title": ((_a2 = _0x60f5f4 == null ? void 0 : _0x60f5f4["textContent"]) == null ? void 0 : _a2["trim"]()) || _0x612555["textContent"]["trim"]() });
  }
  if (_0x4fcd3d["length"] > 0) return _0x4fcd3d;
  for (const _0x332ace of elementsByLocalName(_0x4d526e, "CoverageOfferingBrief")) {
    const _0x1ec4a4 = childByLocalName(_0x332ace, "name");
    if (!(_0x1ec4a4 == null ? void 0 : _0x1ec4a4["textContent"])) continue;
    const _0x1245c3 = childByLocalName(_0x332ace, "label");
    _0x4fcd3d["push"]({ "identifier": _0x1ec4a4["textContent"]["trim"](), "title": ((_b = _0x1245c3 == null ? void 0 : _0x1245c3["textContent"]) == null ? void 0 : _b["trim"]()) || _0x1ec4a4["textContent"]["trim"]() });
  }
  return _0x4fcd3d;
}
async function parseWcsCoverageEnvelope(_0x10dcc1) {
  var _a2, _b, _c, _d;
  const _0x3a747c = childByLocalName(_0x10dcc1, "boundedBy"), _0x16f073 = _0x3a747c ? childByLocalName(_0x3a747c, "Envelope") : void 0;
  if (!_0x16f073) return void 0;
  const _0x5eeb96 = (_b = (_a2 = childByLocalName(_0x16f073, "lowerCorner")) == null ? void 0 : _a2["textContent"]) == null ? void 0 : _b["trim"](), _0xe37f4e = (_d = (_c = childByLocalName(_0x16f073, "upperCorner")) == null ? void 0 : _c["textContent"]) == null ? void 0 : _d["trim"]();
  if (!_0x5eeb96 || !_0xe37f4e) return void 0;
  const _0x2f1e3c = _0x5eeb96["split"](/\s+/)["map"](Number), _0x19570f = _0xe37f4e["split"](/\s+/)["map"](Number);
  if (_0x2f1e3c["length"] < 2 || _0x19570f["length"] < 2) return void 0;
  if (![..._0x2f1e3c, ..._0x19570f]["every"](Number["isFinite"])) return void 0;
  const _0x3336e0 = (_0x16f073["getAttribute"]("axisLabels") ?? "")["trim"]()["toLowerCase"](), _0xee198a = (_0x16f073["getAttribute"]("uomLabels") ?? "")["toLowerCase"]();
  if (_0xee198a["includes"]("deg")) {
    const _0x246236 = _0x3336e0["startsWith"]("lat");
    return _0x246236 ? { "south": _0x2f1e3c[0], "west": _0x2f1e3c[1], "north": _0x19570f[0], "east": _0x19570f[1] } : { "west": _0x2f1e3c[0], "south": _0x2f1e3c[1], "east": _0x19570f[0], "north": _0x19570f[1] };
  }
  const _0x520d47 = _0x16f073["getAttribute"]("srsName") ?? "";
  return resolveProjectedEnvelope(_0x520d47, _0x3336e0, _0x2f1e3c, _0x19570f);
}
async function resolveProjectedEnvelope(_0x4a8c71, _0x28e619, _0x1663e3, _0x364b17) {
  const _0x3d9a6b = extractEpsgCode(_0x4a8c71);
  if (!_0x3d9a6b) return void 0;
  const _0x3072ab = await ensureProj4Def(_0x3d9a6b);
  if (!_0x3072ab) return void 0;
  try {
    const _0x2cd882 = _0x28e619["startsWith"]("y") || _0x28e619["startsWith"]("n"), _0x3824b9 = (_0x139b6c) => _0x2cd882 ? [_0x139b6c[1], _0x139b6c[0]] : [_0x139b6c[0], _0x139b6c[1]], [_0x375cf6, _0xca7abf] = _0x3824b9(_0x1663e3), [_0x5501bd, _0x5b423d] = _0x3824b9(_0x364b17), _0x112104 = [[_0x375cf6, _0xca7abf], [_0x5501bd, _0x5b423d], [_0x375cf6, _0x5b423d], [_0x5501bd, _0xca7abf]], _0x19cb24 = "EPSG:" + _0x3d9a6b, _0x2dca4c = _0x112104["map"]((_0x12d46c) => _0x3072ab(_0x19cb24, "EPSG:4326", _0x12d46c)), _0x3c69f7 = _0x2dca4c["map"]((_0x2f9378) => _0x2f9378[0]), _0x289818 = _0x2dca4c["map"]((_0xae55d) => _0xae55d[1]), _0x3fbfc6 = { "west": Math["min"](..._0x3c69f7), "east": Math["max"](..._0x3c69f7), "south": Math["min"](..._0x289818), "north": Math["max"](..._0x289818) };
    if (!Object["values"](_0x3fbfc6)["every"](Number["isFinite"])) return void 0;
    return _0x3fbfc6;
  } catch {
    return void 0;
  }
}
async function fetchWcsCoverageExtents(_0x50289b, _0x548fca, _0x1eab0, _0x33c40f) {
  var _a2;
  const _0x8dc86a = /* @__PURE__ */ new Map();
  if (_0x548fca["length"] === 0) return _0x8dc86a;
  try {
    const _0x3905ce = new URL(_0x50289b);
    _0x3905ce["searchParams"]["set"]("SERVICE", "WCS"), _0x3905ce["searchParams"]["set"]("VERSION", "2.0.1"), _0x3905ce["searchParams"]["set"]("REQUEST", "DescribeCoverage"), _0x3905ce["searchParams"]["set"]("COVERAGEID", _0x548fca["join"](","));
    const _0x25e069 = await getCapabilities(_0x3905ce["toString"](), _0x1eab0, _0x33c40f);
    for (const _0x4191c3 of elementsByLocalName(_0x25e069, "CoverageDescription")) {
      const _0x2533fa = childByLocalName(_0x4191c3, "CoverageId"), _0x13dfdf = (_a2 = _0x2533fa == null ? void 0 : _0x2533fa["textContent"]) == null ? void 0 : _a2["trim"]();
      if (!_0x13dfdf) continue;
      const _0x32b093 = await parseWcsCoverageEnvelope(_0x4191c3);
      if (_0x32b093) _0x8dc86a["set"](_0x13dfdf, _0x32b093);
    }
  } catch {
  }
  return _0x8dc86a;
}
function wcsRectangleFor(_0x2ed85f) {
  const _0x2d19c5 = _0x2ed85f["geographicBoundingBox"];
  if (!_0x2d19c5) return void 0;
  return Rectangle["fromDegrees"](_0x2d19c5["west"], _0x2d19c5["south"], _0x2d19c5["east"], _0x2d19c5["north"]);
}
function parseCapabilities(_0x50f4a9, _0x3de8ba) {
  switch (_0x50f4a9) {
    case "WMS":
      return parseWmsCapabilities(_0x3de8ba);
    case "WMTS":
      return parseWmtsCapabilities(_0x3de8ba);
    case "WFS":
      return parseWfsCapabilities(_0x3de8ba);
    case "WCS":
      return parseWcsCapabilities(_0x3de8ba);
    default:
      return [];
  }
}
function detectServiceType(_0x5223ed) {
  const _0x1d9b09 = _0x5223ed["documentElement"], _0x4aa96b = _0x1d9b09["localName"], _0x3a7e31 = _0x1d9b09["namespaceURI"] ?? "";
  if (_0x4aa96b === "WMS_Capabilities" || _0x4aa96b === "WMT_MS_Capabilities" || _0x3a7e31["includes"]("/wms")) return "WMS";
  if (_0x4aa96b === "WFS_Capabilities" || _0x3a7e31["includes"]("/wfs")) return "WFS";
  if (_0x3a7e31["includes"]("/wmts")) return "WMTS";
  if (_0x3a7e31["includes"]("/wcs") || _0x4aa96b === "WCS_Capabilities") return "WCS";
  return void 0;
}
const _OgcLayerFactory = class _OgcLayerFactory {
  constructor(_0x179bc1, _0x3baa70) {
    this["viewer"] = _0x179bc1, this["deps"] = _0x3baa70, this["serviceLayerOptions"] = /* @__PURE__ */ new Map();
  }
  ["getServiceOptions"](_0x129a26) {
    return this["serviceLayerOptions"]["get"](_0x129a26);
  }
  ["deleteServiceOptions"](_0x537f2e) {
    this["serviceLayerOptions"]["delete"](_0x537f2e);
  }
  ["buildWmsProvider"](_0x221312) {
    var _a2, _b;
    const _0x567717 = this["deps"]["apiKeyPolicy"]["resolveOgcProxyUrl"]("wms", _0x221312["url"]), _0x49f464 = (_a2 = _0x221312["layers"]) == null ? void 0 : _a2["trim"]();
    if (!_0x49f464) throw new LayerOperationError("LAYER_WMS_LAYERS_EMPTY", "WMS katmani eklenemedi: layers (ogcLayerName) bos — id=" + _0x221312["id"]);
    const _0x2f37b5 = this["deps"]["apiKeyPolicy"]["mergeApiKeyHeader"](this["deps"]["apiKeyPolicy"]["buildAuthHeaders"](_0x221312["authToken"]), _0x567717), _0x52a04f = _0x221312["version"] ?? "1.3.0", _0x4a90e1 = new WebMapServiceImageryProvider({ "url": _0x2f37b5 ? new Resource({ "url": _0x567717, "headers": _0x2f37b5 }) : _0x567717, "layers": _0x49f464, "parameters": { "service": "WMS", "version": _0x52a04f, "request": "GetMap", "transparent": "true", "format": "image/png", ..._0x221312["parameters"] }, "getFeatureInfoParameters": { "version": _0x52a04f, "styles": ((_b = _0x221312["parameters"]) == null ? void 0 : _b["styles"]) ?? "" }, "getFeatureInfoFormats": [new GetFeatureInfoFormat("json"), new GetFeatureInfoFormat("xml", "application/vnd.ogc.gml"), new GetFeatureInfoFormat("xml", "text/xml"), new GetFeatureInfoFormat("html")], ..._0x221312["rectangle"] !== void 0 && { "rectangle": _0x221312["rectangle"] }, ..._0x221312["minimumLevel"] !== void 0 && { "minimumLevel": _0x221312["minimumLevel"] }, ..._0x221312["maximumLevel"] !== void 0 && { "maximumLevel": _0x221312["maximumLevel"] }, ..._0x221312["tileWidth"] !== void 0 && { "tileWidth": _0x221312["tileWidth"] }, ..._0x221312["tileHeight"] !== void 0 && { "tileHeight": _0x221312["tileHeight"] } });
    return _0x4a90e1;
  }
  ["addWMS"](_0x4f6c52) {
    const _0x5774b4 = this["buildWmsProvider"](_0x4f6c52), _0x127889 = this["viewer"]["imageryLayers"]["addImageryProvider"](_0x5774b4), _0x315f0a = this["deps"]["register"](_0x4f6c52["id"], _0x4f6c52["title"], "WMS", _0x127889, ![]);
    return this["serviceLayerOptions"]["set"](_0x4f6c52["id"], _0x4f6c52), Promise["resolve"](_0x315f0a);
  }
  ["buildWmtsProvider"](_0xeed5f7) {
    const _0x5f5288 = this["deps"]["apiKeyPolicy"]["resolveOgcProxyUrl"]("wmts", _0xeed5f7["url"]), _0x1e9fee = this["deps"]["apiKeyPolicy"]["mergeApiKeyHeader"](this["deps"]["apiKeyPolicy"]["buildAuthHeaders"](_0xeed5f7["authToken"]), _0x5f5288);
    return new WebMapTileServiceImageryProvider({ "url": _0x1e9fee ? new Resource({ "url": _0x5f5288, "headers": _0x1e9fee }) : _0x5f5288, "layer": _0xeed5f7["layer"], "style": _0xeed5f7["style"] ?? "default", "tileMatrixSetID": _0xeed5f7["tileMatrixSetID"], "format": _0xeed5f7["format"] ?? "image/png", "tilingScheme": new WebMercatorTilingScheme(), ..._0xeed5f7["tileWidth"] !== void 0 && { "tileWidth": _0xeed5f7["tileWidth"] }, ..._0xeed5f7["tileHeight"] !== void 0 && { "tileHeight": _0xeed5f7["tileHeight"] }, ..._0xeed5f7["minimumLevel"] !== void 0 && { "minimumLevel": _0xeed5f7["minimumLevel"] }, ..._0xeed5f7["maximumLevel"] !== void 0 && { "maximumLevel": _0xeed5f7["maximumLevel"] }, ..._0xeed5f7["rectangle"] !== void 0 && { "rectangle": _0xeed5f7["rectangle"] } });
  }
  ["addWMTS"](_0x35beb7) {
    const _0x19c100 = this["buildWmtsProvider"](_0x35beb7), _0x3f5082 = this["viewer"]["imageryLayers"]["addImageryProvider"](_0x19c100), _0x243165 = this["deps"]["register"](_0x35beb7["id"], _0x35beb7["title"], "WMTS", _0x3f5082, ![]);
    return this["serviceLayerOptions"]["set"](_0x35beb7["id"], _0x35beb7), Promise["resolve"](_0x243165);
  }
  async ["getWmsAvailableStyles"](_0x4c122e) {
    const _0x317d9f = this["requireServiceOptions"](_0x4c122e, "WMS"), _0x380184 = _0x317d9f["version"] ?? "1.3.0", _0x123183 = await this["getCapabilitiesDocument"](_0x317d9f["url"], "WMS", _0x380184, _0x317d9f["authToken"]);
    return parseWmsStyles(_0x123183, _0x317d9f["layers"])["map"]((_0x63f9d) => ({ ..._0x63f9d, "legendUrl": this["getWmsLegendGraphicUrl"](_0x4c122e, _0x63f9d["name"]) }));
  }
  async ["setWmsStyle"](_0x1ba939, _0x8d5063) {
    const _0x45156d = this["requireServiceOptions"](_0x1ba939, "WMS"), _0x3ec1ea = { ..._0x45156d, "parameters": { ..._0x45156d["parameters"], "STYLES": _0x8d5063 } };
    await this["rebuildImageryLayer"](_0x1ba939, () => this["buildWmsProvider"](_0x3ec1ea)), this["serviceLayerOptions"]["set"](_0x1ba939, _0x3ec1ea);
  }
  ["getWmsLegendGraphicUrl"](_0x40633c, _0x4730ee) {
    const _0x1b609e = this["requireServiceOptions"](_0x40633c, "WMS"), _0x549626 = new URLSearchParams({ "service": "WMS", "version": _0x1b609e["version"] ?? "1.3.0", "request": "GetLegendGraphic", "format": "image/png", "layer": _0x1b609e["layers"], "sld_version": "1.1.0", ..._0x4730ee !== void 0 && _0x4730ee !== "" ? { "style": _0x4730ee } : {} }), _0x4f0634 = this["deps"]["apiKeyPolicy"]["resolveOgcProxyUrl"]("wms", _0x1b609e["url"]);
    return this["deps"]["apiKeyPolicy"]["attachApiKeyToUrl"]("" + _0x4f0634 + (_0x4f0634["includes"]("?") ? "&" : "?") + _0x549626["toString"]());
  }
  async ["getWmtsAvailableStyles"](_0x4f6fcb) {
    const _0x4f04fd = this["requireServiceOptions"](_0x4f6fcb, "WMTS"), _0x48e762 = await this["getCapabilitiesDocument"](_0x4f04fd["url"], "WMTS", "1.0.0", _0x4f04fd["authToken"]), _0x510eba = parseWmtsStyles(_0x48e762, _0x4f04fd["layer"]);
    return _0x510eba["map"]((_0x446611) => ({ ..._0x446611, "legendUrl": this["deps"]["apiKeyPolicy"]["attachApiKeyToUrl"](_0x446611["legendUrl"]) }));
  }
  async ["setWmtsStyle"](_0x1a428b, _0x3253d0) {
    const _0x1ade98 = this["requireServiceOptions"](_0x1a428b, "WMTS"), _0x48bdb9 = { ..._0x1ade98, "style": _0x3253d0 };
    await this["rebuildImageryLayer"](_0x1a428b, () => this["buildWmtsProvider"](_0x48bdb9)), this["serviceLayerOptions"]["set"](_0x1a428b, _0x48bdb9);
  }
  async ["addWFS"](_0x18e55b) {
    const _0x50880f = this["deps"]["apiKeyPolicy"]["resolveOgcProxyUrl"]("wfs", _0x18e55b["url"]), _0x1b1b2b = {};
    _0x18e55b["authToken"] !== void 0 && (_0x1b1b2b["headers"] = { "Authorization": "Bearer " + _0x18e55b["authToken"] });
    const _0x4f3bb4 = this["deps"]["apiKeyPolicy"]["mergeApiKeyHeader"](_0x1b1b2b["headers"], _0x50880f);
    if (_0x4f3bb4 !== void 0) _0x1b1b2b["headers"] = _0x4f3bb4;
    const _0x2419d7 = { ..._0x18e55b, "url": _0x50880f }, _0x3ada7e = await fetchWfsCapabilities(_0x50880f, _0x1b1b2b), _0x45c6bb = { "typeNameHint": _0x18e55b["typeName"], "caps": _0x3ada7e };
    if (_0x18e55b["version"] !== void 0) _0x45c6bb["version"] = _0x18e55b["version"];
    if (_0x18e55b["srsName"] !== void 0) _0x45c6bb["srsName"] = _0x18e55b["srsName"];
    _0x18e55b["outputFormat"] !== void 0 && (_0x45c6bb["outputFormat"] = _0x18e55b["outputFormat"]);
    _0x18e55b["maxFeatures"] !== void 0 ? _0x45c6bb["maxFeatures"] = _0x18e55b["maxFeatures"] : _0x45c6bb["maxFeatures"] = _OgcLayerFactory["TEMP_WFS_UNLIMITED_MAX_FEATURES"];
    const _0x16663e = buildWfsGetFeaturePlan(_0x45c6bb);
    let _0x1db48d;
    try {
      _0x1db48d = await this["fetchWfsGeoJson"](_0x2419d7, _0x1b1b2b, _0x16663e);
    } catch (_0x3e2f7a) {
      try {
        _0x1db48d = await this["fetchWfsGml"](_0x2419d7, _0x1b1b2b, _0x16663e);
      } catch (_0x446d9b) {
        _0x446d9b instanceof Error && (_0x446d9b["cause"] = _0x3e2f7a);
        throw _0x446d9b;
      }
    }
    const _0x3605c5 = _0x1db48d !== null && typeof _0x1db48d === "object" ? _0x1db48d["features"] : void 0;
    return Array["isArray"](_0x3605c5) ? _0x3605c5["length"] : _0x16663e["maxFeatures"], loadVectorGeoJsonLayer(this["viewer"], this["deps"], _0x1db48d, { "id": _0x18e55b["id"], "title": _0x18e55b["title"], "layerType": "WFS", "clampToGround": _0x18e55b["clampToGround"] ?? ![] }, (_0x33e297) => {
    });
  }
  async ["fetchWfsHitsCount"](_0x38ead1, _0x43e5f3, _0x301d82) {
    if (!_0x301d82["version"]["startsWith"]("2.") && !_0x301d82["version"]["startsWith"]("1.1")) return void 0;
    const _0x300af2 = new URLSearchParams();
    appendWfsGetFeatureParams(_0x300af2, _0x301d82), _0x300af2["delete"]("count"), _0x300af2["delete"]("maxFeatures"), _0x300af2["set"]("resultType", "hits");
    let _0x5565c5;
    try {
      _0x5565c5 = await fetch("" + _0x38ead1["url"] + (_0x38ead1["url"]["includes"]("?") ? "&" : "?") + _0x300af2["toString"](), _0x43e5f3);
    } catch {
      return void 0;
    }
    if (!_0x5565c5["ok"]) return void 0;
    const _0x2c0b39 = decodeTextBuffer(await _0x5565c5["arrayBuffer"]());
    if (isOgcExceptionXml(_0x2c0b39)) return void 0;
    const _0x4a2969 = _0x2c0b39["trimStart"]();
    if (_0x4a2969["startsWith"]("{")) try {
      const _0x1c0948 = JSON["parse"](_0x4a2969), _0x40e51b = _0x1c0948["numberMatched"] ?? _0x1c0948["totalFeatures"];
      return typeof _0x40e51b === "number" ? _0x40e51b : void 0;
    } catch {
      return void 0;
    }
    try {
      const _0x3bb4e2 = new DOMParser()["parseFromString"](_0x2c0b39, "application/xml")["documentElement"], _0x425029 = _0x3bb4e2["getAttribute"]("numberMatched") ?? _0x3bb4e2["getAttribute"]("numberOfFeatures") ?? _0x3bb4e2["getAttribute"]("numberReturned");
      if (!_0x425029) return void 0;
      const _0x18472a = Number(_0x425029);
      return Number["isFinite"](_0x18472a) ? _0x18472a : void 0;
    } catch {
      return void 0;
    }
  }
  async ["fetchWfsGeoJson"](_0x4e7270, _0x35ab7f, _0x2b149b) {
    const _0x509803 = _0x2b149b["jsonOutputFormat"];
    if (!_0x509803) throw new OgcRequestError("OGC_WFS_JSON_FORMAT_UNSUPPORTED", "WFS sunucusu JSON çıktı formatı ilan etmiyor.");
    const _0xa2a1bd = new URLSearchParams();
    appendWfsGetFeatureParams(_0xa2a1bd, _0x2b149b, _0x509803);
    const _0x1b6994 = await fetch("" + _0x4e7270["url"] + (_0x4e7270["url"]["includes"]("?") ? "&" : "?") + _0xa2a1bd["toString"](), _0x35ab7f), _0x2b2a43 = decodeTextBuffer(await _0x1b6994["arrayBuffer"]());
    if (!_0x1b6994["ok"] || isOgcExceptionXml(_0x2b2a43) || !_0x2b2a43["trimStart"]()["startsWith"]("{")) throw new OgcRequestError("OGC_WFS_GEOJSON_REQUEST_FAILED", "WFS GeoJSON isteği başarısız: " + _0x1b6994["status"] + " " + _0x1b6994["statusText"]);
    return JSON["parse"](_0x2b2a43);
  }
  async ["fetchWfsGml"](_0x54b6bd, _0x3238a0, _0x5617ad) {
    const _0xcd8c81 = new URLSearchParams();
    appendWfsGetFeatureParams(_0xcd8c81, _0x5617ad);
    const _0x239d70 = await fetch("" + _0x54b6bd["url"] + (_0x54b6bd["url"]["includes"]("?") ? "&" : "?") + _0xcd8c81["toString"](), _0x3238a0);
    if (!_0x239d70["ok"]) throw new OgcRequestError("OGC_WFS_REQUEST_FAILED", "WFS isteği başarısız: " + _0x239d70["status"] + " " + _0x239d70["statusText"]);
    const _0x4cd466 = decodeTextBuffer(await _0x239d70["arrayBuffer"]());
    if (isOgcExceptionXml(_0x4cd466)) throw new OgcRequestError("OGC_WFS_EXCEPTION", "WFS GetFeature OGC Exception döndü.");
    let _0x21fcf3, _0x531600;
    try {
      ({ default: _0x21fcf3 } = await import("ol/format/WFS.js")), { default: _0x531600 } = await import("ol/format/GeoJSON.js");
    } catch {
      throw new OgcRequestError("OGC_WFS_OL_PACKAGE_MISSING", 'WFS sunucusu GeoJSON çıktısı desteklemiyor; GML yanıtını okumak için "ol" paketi gereklidir: pnpm add ol');
    }
    const _0x252fe5 = new _0x21fcf3({ "version": _0x5617ad["version"] })["readFeatures"](_0x4cd466);
    return new _0x531600()["writeFeaturesObject"](_0x252fe5, { "featureProjection": "EPSG:4326" });
  }
  async ["addWCS"](_0x232fe4) {
    const _0x27bda3 = this["deps"]["apiKeyPolicy"]["resolveOgcProxyUrl"]("wcs", _0x232fe4["url"]), _0x1ad21b = { "service": "WCS", "version": _0x232fe4["version"] ?? "2.0.1", "request": "GetCoverage", "coverageId": _0x232fe4["coverageId"], "format": _0x232fe4["format"] ?? "image/png" }, _0x43d100 = this["deps"]["apiKeyPolicy"]["mergeApiKeyHeader"](this["deps"]["apiKeyPolicy"]["buildAuthHeaders"](_0x232fe4["authToken"]), _0x27bda3), _0x3d921a = _0x232fe4["rectangle"] ?? Rectangle["fromDegrees"](-180, -90, 180, 90), _0x2ac291 = async (_0x22b899) => {
      const _0x1a7039 = { ..._0x1ad21b };
      if (_0x22b899 !== void 0) _0x1a7039["SCALESIZE"] = _0x22b899;
      const _0x3cb210 = _0x27bda3 + "?" + new URLSearchParams(_0x1a7039)["toString"](), _0xe6e469 = await this["resolveWcsImageUrl"](_0x3cb210, _0x43d100);
      try {
        return await SingleTileImageryProvider["fromUrl"](_0xe6e469, { "rectangle": _0x3d921a });
      } finally {
        if (_0xe6e469["startsWith"]("blob:")) URL["revokeObjectURL"](_0xe6e469);
      }
    }, _0x51ef91 = _0x232fe4["maxSize"] ?? 2048, _0x30f518 = _0x1ad21b["version"]["startsWith"]("2.") && Number["isFinite"](_0x51ef91);
    let _0x2e420a;
    if (!_0x30f518) _0x2e420a = await _0x2ac291();
    else {
      const _0xcc1b0e = "http://www.opengis.net/def/axis/OGC/1/i(" + _0x51ef91 + "),http://www.opengis.net/def/axis/OGC/1/j(" + _0x51ef91 + ")";
      try {
        _0x2e420a = await _0x2ac291(_0xcc1b0e);
      } catch {
        _0x2e420a = await _0x2ac291("x(" + _0x51ef91 + "),y(" + _0x51ef91 + ")");
      }
    }
    const _0x11be8a = this["viewer"]["imageryLayers"]["addImageryProvider"](_0x2e420a);
    return this["serviceLayerOptions"]["set"](_0x232fe4["id"], _0x232fe4), this["deps"]["register"](_0x232fe4["id"], _0x232fe4["title"], "WCS", _0x11be8a, ![]);
  }
  async ["resolveWcsImageUrl"](_0x49fbfe, _0x54dc7e) {
    const _0xd5906b = await fetch(_0x49fbfe, _0x54dc7e ? { "headers": _0x54dc7e } : void 0);
    if (!_0xd5906b["ok"]) throw new OgcRequestError("OGC_WCS_REQUEST_FAILED", "WCS isteği başarısız: " + _0xd5906b["status"] + " " + _0xd5906b["statusText"]);
    const _0x5e2f7b = _0xd5906b["headers"]["get"]("content-type") ?? "", _0xa8f60a = await _0xd5906b["arrayBuffer"](), _0x1ad641 = /boundary="?([^";]+)"?/i["exec"](_0x5e2f7b);
    if (!_0x5e2f7b["includes"]("multipart/") || !_0x1ad641) return URL["createObjectURL"](new Blob([_0xa8f60a], { "type": _0x5e2f7b || "image/png" }));
    const _0x49964d = extractMultipartImage(new Uint8Array(_0xa8f60a), _0x1ad641[1]), _0x13b3cf = _0x49964d["bytes"]["buffer"]["slice"](_0x49964d["bytes"]["byteOffset"], _0x49964d["bytes"]["byteOffset"] + _0x49964d["bytes"]["byteLength"]);
    return URL["createObjectURL"](new Blob([_0x13b3cf], { "type": _0x49964d["mimeType"] }));
  }
  ["addGeoTiff"](_0xe56563) {
    throw new LayerOperationError("LAYER_GEOTIFF_UNSUPPORTED", "GeoTIFF katmanı bu Cesium sürümünde (≥1.143) henüz desteklenmiyor. GeoTiffImageryProvider mevcut değil. geotiff.js ile özel provider gereklidir.");
  }
  ["requireServiceOptions"](_0x1bf6e3, _0x45fe6f) {
    const _0x4671db = this["deps"]["requireLayer"](_0x1bf6e3);
    if (_0x4671db["layerType"] !== _0x45fe6f) throw new LayerOperationError("LAYER_TYPE_MISMATCH", "Katman " + _0x45fe6f + ' değil: "' + _0x1bf6e3 + '" (' + _0x4671db["layerType"] + ")");
    const _0x2c60a3 = this["serviceLayerOptions"]["get"](_0x1bf6e3);
    if (_0x2c60a3 === void 0) throw new LayerOperationError("LAYER_SERVICE_OPTIONS_NOT_FOUND", 'Katman için orijinal servis seçenekleri bulunamadı: "' + _0x1bf6e3 + '"');
    return _0x2c60a3;
  }
  async ["rebuildImageryLayer"](_0x16bec9, _0x4bd65e) {
    const _0x4883e0 = this["deps"]["requireLayer"](_0x16bec9);
    if (!(_0x4883e0["cesiumObject"] instanceof ImageryLayer)) throw new LayerOperationError("LAYER_NOT_RASTER", 'Katman raster (ImageryLayer) değil: "' + _0x16bec9 + '"');
    const _0x231b94 = _0x4883e0["cesiumObject"], _0x1634bf = this["viewer"]["imageryLayers"]["indexOf"](_0x231b94), { show: _0x3d1188, alpha: _0x359f5d } = _0x231b94, _0x5c2da9 = _0x4bd65e(), _0x5a5afc = new ImageryLayer(_0x5c2da9, { "show": _0x3d1188, "alpha": _0x359f5d });
    this["viewer"]["imageryLayers"]["remove"](_0x231b94, !![]), this["viewer"]["imageryLayers"]["add"](_0x5a5afc, _0x1634bf), this["deps"]["setItem"](_0x16bec9, Object["freeze"]({ ..._0x4883e0, "cesiumObject": _0x5a5afc }));
  }
  async ["getCapabilitiesDocument"](_0x490caf, _0x6ee2e6, _0x5f3ca8, _0x3b2016) {
    const _0x1ea082 = this["deps"]["apiKeyPolicy"]["resolveOgcProxyUrl"](_0x6ee2e6["toLowerCase"](), _0x490caf), _0x221191 = buildCapabilitiesUrl(_0x1ea082, _0x6ee2e6, _0x5f3ca8);
    return getCapabilities(_0x221191, _0x3b2016, this["deps"]["apiKeyPolicy"]);
  }
  async ["getWcsCoverageExtents"](_0xbe72a5, _0x31bea9, _0x47d342) {
    const _0x4f26e0 = this["deps"]["apiKeyPolicy"]["resolveOgcProxyUrl"]("wcs", _0xbe72a5);
    return fetchWcsCoverageExtents(_0x4f26e0, _0x31bea9, _0x47d342, this["deps"]["apiKeyPolicy"]);
  }
};
_OgcLayerFactory["TEMP_WFS_UNLIMITED_MAX_FEATURES"] = 1e6;
let OgcLayerFactory = _OgcLayerFactory;
class ShapeLayerBridge {
  constructor(_0x125673, _0x1e6ee0) {
    this["viewer"] = _0x125673, this["deps"] = _0x1e6ee0, this["drawnShapeCounters"] = /* @__PURE__ */ new Map();
  }
  ["deleteCounter"](_0x9f2bec) {
    this["drawnShapeCounters"]["delete"](_0x9f2bec);
  }
  async ["addDrawnShape"](_0x34df3c, _0x3b2d1f, _0x51d3cd) {
    const _0x286f3e = _0x51d3cd["entity"];
    this["viewer"]["entities"]["remove"](_0x286f3e);
    const _0x4e1125 = (this["drawnShapeCounters"]["get"](_0x34df3c) ?? 0) + 1;
    this["drawnShapeCounters"]["set"](_0x34df3c, _0x4e1125), _0x286f3e["properties"] = buildDrawnShapeProperties(_0x51d3cd, _0x4e1125);
    const _0xb983af = this["deps"]["getItem"](_0x34df3c), _0x49f5bb = _0xb983af && "entities" in _0xb983af["cesiumObject"] ? _0xb983af["cesiumObject"] : new CustomDataSource(_0x3b2d1f), _0x40624a = _0xb983af ? this["deps"]["getStyle"](_0x34df3c) : void 0, _0x4f1687 = (_0x40624a == null ? void 0 : _0x40624a["fill"]["mode"]) === "solid" ? Color["fromCssColorString"](_0x40624a["fill"]["color"])["withAlpha"](_0x40624a["fill"]["opacity"]) : Color["CYAN"]["withAlpha"](0.4), _0x249c01 = (_0x40624a == null ? void 0 : _0x40624a["outline"]) ?? { "enabled": !![], "color": this["deps"]["defaultOutlineColorHex"], "width": 1 };
    this["deps"]["applyEntityStyle"](_0x286f3e, _0x4f1687, _0x249c01, !![]), _0x49f5bb["entities"]["add"](_0x286f3e);
    _0x286f3e["polygon"] !== void 0 && this["deps"]["addPolygonOutlineCompanion"](_0x49f5bb, _0x286f3e, Color["fromCssColorString"](_0x249c01["color"]), _0x249c01["width"], ![]);
    if (_0xb983af) return this["deps"]["tagEntities"](_0x49f5bb, _0x34df3c), _0xb983af;
    await this["viewer"]["dataSources"]["add"](_0x49f5bb);
    const _0x4337ac = Color["CYAN"]["toCssHexString"](), _0x43263b = this["deps"]["register"](_0x34df3c, _0x3b2d1f, "DRAWING", _0x49f5bb, ![], _0x4337ac);
    return this["deps"]["recordInitialStyle"](_0x43263b["id"], _0x4337ac, 0.4, _0x249c01), _0x43263b;
  }
  async ["addMeasuredShape"](_0x759225, _0x4046a5, _0x48790c) {
    const _0x2437a2 = _0x48790c["entity"];
    this["viewer"]["entities"]["remove"](_0x2437a2);
    const _0x3cede7 = (this["drawnShapeCounters"]["get"](_0x759225) ?? 0) + 1;
    this["drawnShapeCounters"]["set"](_0x759225, _0x3cede7), _0x2437a2["properties"] = buildMeasuredShapeProperties(_0x48790c, _0x3cede7);
    const _0x19155c = this["deps"]["getItem"](_0x759225), _0x56245f = _0x19155c && "entities" in _0x19155c["cesiumObject"] ? _0x19155c["cesiumObject"] : new CustomDataSource(_0x4046a5), _0x3cf6d4 = _0x19155c ? this["deps"]["getStyle"](_0x759225) : void 0, _0x34eb4e = (_0x3cf6d4 == null ? void 0 : _0x3cf6d4["fill"]["mode"]) === "solid" ? Color["fromCssColorString"](_0x3cf6d4["fill"]["color"])["withAlpha"](_0x3cf6d4["fill"]["opacity"]) : Color["CYAN"]["withAlpha"](0.4), _0x52ec4e = (_0x3cf6d4 == null ? void 0 : _0x3cf6d4["outline"]) ?? { "enabled": !![], "color": this["deps"]["defaultOutlineColorHex"], "width": 1 };
    this["deps"]["applyEntityStyle"](_0x2437a2, _0x34eb4e, _0x52ec4e, !![]), _0x56245f["entities"]["add"](_0x2437a2);
    _0x2437a2["polygon"] !== void 0 && this["deps"]["addPolygonOutlineCompanion"](_0x56245f, _0x2437a2, Color["fromCssColorString"](_0x52ec4e["color"]), _0x52ec4e["width"], ![]);
    if (_0x19155c) return this["deps"]["tagEntities"](_0x56245f, _0x759225), _0x19155c;
    await this["viewer"]["dataSources"]["add"](_0x56245f);
    const _0x3f7b1f = Color["CYAN"]["toCssHexString"](), _0x5224ff = this["deps"]["register"](_0x759225, _0x4046a5, "MEASURE", _0x56245f, ![], _0x3f7b1f);
    return this["deps"]["recordInitialStyle"](_0x5224ff["id"], _0x3f7b1f, 0.4, _0x52ec4e), _0x5224ff;
  }
  ["removeDrawnShape"](_0x4c0df7, _0x999e0b) {
    const _0x39dfb7 = this["deps"]["getItem"](_0x4c0df7);
    if (!_0x39dfb7 || !("entities" in _0x39dfb7["cesiumObject"])) return;
    _0x39dfb7["cesiumObject"]["entities"]["removeById"](_0x999e0b["id"] + "::outline"), _0x39dfb7["cesiumObject"]["entities"]["remove"](_0x999e0b), _0x39dfb7["cesiumObject"]["entities"]["values"]["length"] === 0 && this["deps"]["removeLayer"](_0x4c0df7);
  }
}
const DRAWN_SHAPE_LABELS = { "point": "Nokta", "polyline": "Çizgi", "polygon": "Alan", "rectangle": "Dikdörtgen", "circle": "Daire", "freehand": "Serbest Çizim" };
function roundMeters(_0x519987) {
  return Math["round"](_0x519987 * 100) / 100;
}
function roundCoordinate(_0x2c6ba1) {
  return Math["round"](_0x2c6ba1 * 1e6) / 1e6;
}
function wktCoordinatePair(_0x343001) {
  return roundCoordinate(_0x343001[0]) + " " + roundCoordinate(_0x343001[1]);
}
function geometryToWkt(_0x284af1) {
  switch (_0x284af1["type"]) {
    case "Point": {
      const _0x220361 = _0x284af1["coordinates"];
      return "POINT (" + wktCoordinatePair(_0x220361) + ")";
    }
    case "LineString": {
      const _0xba60fe = _0x284af1["coordinates"];
      return "LINESTRING (" + _0xba60fe["map"]((_0x59b584) => wktCoordinatePair(_0x59b584))["join"](", ") + ")";
    }
    case "Polygon": {
      const _0x520cbd = _0x284af1["coordinates"], _0x3ae8a6 = _0x520cbd["map"]((_0x1207ba) => "(" + _0x1207ba["map"]((_0xc985d3) => wktCoordinatePair(_0xc985d3))["join"](", ") + ")")["join"](", ");
      return "POLYGON (" + _0x3ae8a6 + ")";
    }
    default:
      return "";
  }
}
function buildDrawnShapeProperties(_0x4c880a, _0x51a355) {
  const _0x52cff6 = { "id": _0x51a355, "sekil": DRAWN_SHAPE_LABELS[_0x4c880a["tool"]] };
  if (_0x4c880a["length"] !== void 0) _0x52cff6["uzunluk_m"] = roundMeters(_0x4c880a["length"]);
  if (_0x4c880a["area"] !== void 0) _0x52cff6["alan_m2"] = roundMeters(_0x4c880a["area"]);
  if (_0x4c880a["perimeter"] !== void 0) _0x52cff6["cevre_m"] = roundMeters(_0x4c880a["perimeter"]);
  if (_0x4c880a["radius"] !== void 0) _0x52cff6["yaricap_m"] = roundMeters(_0x4c880a["radius"]);
  return _0x52cff6["olusturma_tarihi"] = new Date(_0x4c880a["createdAt"])["toLocaleString"]("tr-TR"), _0x52cff6["geomwkt"] = geometryToWkt(_0x4c880a["geometry"]), new PropertyBag(_0x52cff6);
}
const MEASURED_SHAPE_LABELS = { "point": "Nokta", "polyline": "Mesafe", "polygon": "Alan", "rectangle": "Dikdörtgen", "circle": "Daire", "freehand": "Serbest Çizim" };
function buildMeasuredShapeProperties(_0xa57137, _0x1e2fd3) {
  const _0x5afb8b = { "id": _0x1e2fd3, "olcum_turu": MEASURED_SHAPE_LABELS[_0xa57137["tool"]] };
  if (_0xa57137["length"] !== void 0) _0x5afb8b["uzunluk_m"] = roundMeters(_0xa57137["length"]);
  if (_0xa57137["area"] !== void 0) _0x5afb8b["alan_m2"] = roundMeters(_0xa57137["area"]);
  if (_0xa57137["perimeter"] !== void 0) _0x5afb8b["cevre_m"] = roundMeters(_0xa57137["perimeter"]);
  return _0x5afb8b["olusturma_tarihi"] = new Date(_0xa57137["createdAt"])["toLocaleString"]("tr-TR"), _0x5afb8b["geomwkt"] = geometryToWkt(_0xa57137["geometry"]), new PropertyBag(_0x5afb8b);
}
const _LayerManager = class _LayerManager extends EventEmitter {
  constructor(_0x541987) {
    super(), this["items"] = /* @__PURE__ */ new Map(), this["analysisResultIds"] = /* @__PURE__ */ new Set(), this["viewer"] = _0x541987, this["apiKeyPolicy"] = new ApiKeyPolicy({ "apiBase": () => getUcbpApiBase() }), this["outlineGeometry"] = new OutlineGeometry({ "getCurrentTime": () => this["viewer"]["clock"]["currentTime"] }), this["opacityController"] = new OpacityController({ "requestRender": () => this["viewer"]["scene"]["requestRender"]() }), this["styleEngine"] = new LayerStyleEngine({ "outlineGeometry": this["outlineGeometry"], "opacityController": this["opacityController"], "getCurrentTime": () => this["viewer"]["clock"]["currentTime"], "requestRender": () => this["viewer"]["scene"]["requestRender"](), "emitStyle": (_0x595255, _0x44965e) => this["emit"]("layer:style", { "id": _0x595255, "style": _0x44965e }), "waitForRenderSettle": () => this["waitForRenderSettle"]() }), this["localSourceLoader"] = new LocalSourceLoader(_0x541987, { "styleEngine": this["styleEngine"], "outlineGeometry": this["outlineGeometry"], "addPolygonOutlines": (_0x25aa4b, _0x5363cc, _0x23e36e) => this["addPolygonOutlines"](_0x25aa4b, _0x5363cc, _0x23e36e), "register": (_0x436e23, _0x35c545, _0x524f67, _0x539bb7, _0x1402a4, _0x1a3284) => this["register"](_0x436e23, _0x35c545, _0x524f67, _0x539bb7, _0x1402a4, _0x1a3284), "emitCrsCheckResult": (_0x345963, _0x275f65) => this["emitCrsCheckResult"](_0x345963, _0x275f65), "waitForRenderSettle": () => this["waitForRenderSettle"](), "defaultOutlineColor": _LayerManager["DEFAULT_OUTLINE_COLOR"], "defaultOutlineColorHex": _LayerManager["DEFAULT_OUTLINE_COLOR_HEX"] }), this["shapeLayerBridge"] = new ShapeLayerBridge(_0x541987, { "getItem": (_0x119ed4) => this["items"]["get"](_0x119ed4), "getStyle": (_0x1abb2c) => this["styleEngine"]["getStyle"](_0x1abb2c), "applyEntityStyle": (_0x24a236, _0x4734c4, _0x2cf889, _0x3e05fe) => this["applyEntityStyle"](_0x24a236, _0x4734c4, _0x2cf889, _0x3e05fe), "addPolygonOutlineCompanion": (_0xe93f20, _0xdc171c, _0x554f15, _0x571d53, _0xc8c210) => this["addPolygonOutlineCompanion"](_0xe93f20, _0xdc171c, _0x554f15, _0x571d53, _0xc8c210), "tagEntities": (_0x38c3ae, _0x22a607) => this["tagEntities"](_0x38c3ae, _0x22a607), "register": (_0x89ed8b, _0xc6774d, _0x59807f, _0x1a3df5, _0x124bef, _0x44f67a) => this["register"](_0x89ed8b, _0xc6774d, _0x59807f, _0x1a3df5, _0x124bef, _0x44f67a), "recordInitialStyle": (_0x587110, _0x50b38f, _0x41b8ba, _0x2d3455) => this["styleEngine"]["recordInitialStyle"](_0x587110, _0x50b38f, _0x41b8ba, _0x2d3455), "removeLayer": (_0x18b61c) => this["removeLayer"](_0x18b61c), "defaultOutlineColorHex": _LayerManager["DEFAULT_OUTLINE_COLOR_HEX"] }), this["ogcLayerFactory"] = new OgcLayerFactory(_0x541987, { "apiKeyPolicy": this["apiKeyPolicy"], "styleEngine": this["styleEngine"], "outlineGeometry": this["outlineGeometry"], "requireLayer": (_0x46fc38) => this["requireLayer"](_0x46fc38), "setItem": (_0x3eb2b6, _0x1ea3ce) => this["items"]["set"](_0x3eb2b6, _0x1ea3ce), "register": (_0x4f4a43, _0x333f8b, _0x329443, _0x589bd1, _0x59c3ff, _0x514256) => this["register"](_0x4f4a43, _0x333f8b, _0x329443, _0x589bd1, _0x59c3ff, _0x514256), "addPolygonOutlines": (_0x337e75, _0x691840, _0x4d66ac) => this["addPolygonOutlines"](_0x337e75, _0x691840, _0x4d66ac), "emitCrsCheckResult": (_0x1c6a6c, _0x10fc02) => this["emitCrsCheckResult"](_0x1c6a6c, _0x10fc02), "emitFeaturesTruncated": (_0x1ab525, _0x4d7fec, _0x22f730) => this["emit"]("layer:features-truncated", { "id": _0x1ab525, "totalCount": _0x4d7fec, "loadedCount": _0x22f730 }), "waitForRenderSettle": () => this["waitForRenderSettle"](), "defaultOutlineColor": _LayerManager["DEFAULT_OUTLINE_COLOR"], "defaultOutlineColorHex": _LayerManager["DEFAULT_OUTLINE_COLOR_HEX"] }), this["cameraHighlight"] = new CameraHighlight(_0x541987, { "requireLayer": (_0x3a5103) => this["requireLayer"](_0x3a5103), "getLayerStyle": (_0x33d7ba) => this["getLayerStyle"](_0x33d7ba) });
  }
  ["configure"](_0x4084a3) {
    this["apiKeyPolicy"]["configure"](_0x4084a3), _0x4084a3["apiKey"] !== void 0 && this["emit"]("apiKey:change", { "hasApiKey": !![] });
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
  ["canAddAuthorizedLayer"](_0x28675e) {
    return this["apiKeyPolicy"]["canAddAuthorizedLayer"](_0x28675e);
  }
  async ["addAuthorizedLayer"](_0x5f55a4) {
    const _0x780545 = this["apiKeyPolicy"]["resolveAddOptions"](_0x5f55a4);
    if (_0x780545["layerType"] === "WMS") return this["add"]("WMS", _0x780545["options"]);
    if (_0x780545["layerType"] === "WFS") return this["add"]("WFS", _0x780545["options"]);
    return this["add"]("WMTS", _0x780545["options"]);
  }
  ["layerRequiresApiKey"](_0x24381d) {
    return this["apiKeyPolicy"]["layerRequiresApiKey"](_0x24381d);
  }
  ["getLayers"]() {
    return Array["from"](this["items"]["values"]());
  }
  ["getLayerById"](_0x391981) {
    return this["items"]["get"](_0x391981);
  }
  ["getEntityPropertyNames"](_0x4b6a9a) {
    const _0x2f878e = this["requireLayer"](_0x4b6a9a);
    if (!("entities" in _0x2f878e["cesiumObject"])) return [];
    const _0x10e31a = /* @__PURE__ */ new Set();
    for (const _0x9ff414 of _0x2f878e["cesiumObject"]["entities"]["values"]) {
      const _0x2ed85a = _0x9ff414["properties"];
      if (_0x2ed85a === void 0) continue;
      for (const _0x2035ad of _0x2ed85a["propertyNames"]) {
        if (_0x2035ad === "layerId" || _0x2035ad === "featureId") continue;
        _0x10e31a["add"](_0x2035ad);
      }
    }
    return Array["from"](_0x10e31a);
  }
  ["getUniqueColumnValues"](_0x6403fe, _0x45ba2e) {
    const _0x1eb2ac = this["requireLayer"](_0x6403fe);
    if (!("entities" in _0x1eb2ac["cesiumObject"])) return [];
    const _0x4f82e1 = this["viewer"]["clock"]["currentTime"], _0x63831b = /* @__PURE__ */ new Set();
    for (const _0xb0a4ff of _0x1eb2ac["cesiumObject"]["entities"]["values"]) {
      const _0x101c36 = this["readProperty"](_0xb0a4ff, _0x45ba2e, _0x4f82e1);
      if (_0x101c36 !== null) _0x63831b["add"](_0x101c36);
    }
    return Array["from"](_0x63831b);
  }
  ["getFeatureCount"](_0x2f0609) {
    const _0x808e46 = this["requireLayer"](_0x2f0609);
    if (!("entities" in _0x808e46["cesiumObject"])) return void 0;
    let _0x960a7 = 0;
    for (const _0x573661 of _0x808e46["cesiumObject"]["entities"]["values"]) {
      if (!this["isOutlineCompanion"](_0x573661)) _0x960a7++;
    }
    return _0x960a7;
  }
  ["getLayerGeoJSON"](_0x4699bd) {
    return getLayerGeoJSON(this["requireLayer"](_0x4699bd), this["viewer"]["clock"]["currentTime"], (_0x4658c3) => this["isOutlineCompanion"](_0x4658c3));
  }
  ["exportLayerGeoJSON"](_0x2a8a47, _0x4d59ff = "katman") {
    exportLayerGeoJSON(this["getLayerGeoJSON"](_0x2a8a47), _0x4d59ff);
  }
  ["exportLayerKml"](_0x1f08a4, _0xfba3e = "katman") {
    exportLayerKml(this["getLayerGeoJSON"](_0x1f08a4), _0xfba3e);
  }
  ["exportLayerShapefile"](_0x42c5bc, _0x43ac19 = "katman") {
    exportLayerShapefile(this["getLayerGeoJSON"](_0x42c5bc), _0x43ac19);
  }
  ["markAnalysisResult"](_0x3269bc) {
    this["analysisResultIds"]["add"](_0x3269bc);
  }
  ["isAnalysisResult"](_0x12b36f) {
    return this["analysisResultIds"]["has"](_0x12b36f);
  }
  ["isGeoTiffExportAvailable"](_0x40f7bf) {
    return isGeoTiffExportAvailable(this["items"]["get"](_0x40f7bf), this["ogcLayerFactory"]["getServiceOptions"](_0x40f7bf));
  }
  async ["exportLayerAsGeoTiff"](_0x58f2a4, _0xaf4dda = "katman") {
    const _0x15681f = this["requireLayer"](_0x58f2a4);
    await exportLayerAsGeoTiff(_0x15681f, this["ogcLayerFactory"]["getServiceOptions"](_0x58f2a4), _0xaf4dda, (_0x2aa05e, _0x48469f) => this["apiKeyPolicy"]["resolveOgcProxyUrl"](_0x2aa05e, _0x48469f), { "mergeApiKeyHeader": (_0x296d90, _0x42a6e4) => this["apiKeyPolicy"]["mergeApiKeyHeader"](_0x296d90, _0x42a6e4), "buildAuthHeaders": (_0x591402) => this["apiKeyPolicy"]["buildAuthHeaders"](_0x591402) });
  }
  ["getColumnRange"](_0x1f6ec8, _0x2e9410) {
    const _0x4cca39 = this["requireLayer"](_0x1f6ec8);
    if (!("entities" in _0x4cca39["cesiumObject"])) return null;
    return this["styleEngine"]["getColumnRange"](_0x4cca39["cesiumObject"], this["viewer"]["clock"]["currentTime"], _0x2e9410);
  }
  async ["applyLayerStyle"](_0x1cc606, _0x79b410) {
    const _0x3b02d1 = this["requireLayer"](_0x1cc606);
    if (!("entities" in _0x3b02d1["cesiumObject"])) throw new LayerOperationError("LAYER_STYLE_NOT_VECTOR", 'applyLayerStyle sadece vektör (Entity tabanlı) katmanlarda kullanılabilir: "' + _0x1cc606 + '"');
    await this["styleEngine"]["applyLayerStyle"](_0x1cc606, _0x3b02d1["cesiumObject"], _0x3b02d1["layerType"] === "DRAWING" || _0x3b02d1["layerType"] === "MEASURE", _0x79b410);
  }
  ["getLayerStyle"](_0x42aa17) {
    return this["styleEngine"]["getStyle"](_0x42aa17);
  }
  ["getInitialFillColor"](_0x1a7fc4) {
    var _a2;
    return (_a2 = this["items"]["get"](_0x1a7fc4)) == null ? void 0 : _a2["initialFillColor"];
  }
  ["getImageryLayers"]() {
    return Array["from"](this["items"]["values"]())["filter"]((_0x569f5c) => !_0x569f5c["isBasemap"] && _0x569f5c["cesiumObject"] instanceof ImageryLayer)["map"]((_0x30f302) => _0x30f302["cesiumObject"]);
  }
  ["getBasemapLayers"]() {
    return Array["from"](this["items"]["values"]())["filter"]((_0x5a44f0) => _0x5a44f0["isBasemap"] && _0x5a44f0["cesiumObject"] instanceof ImageryLayer)["map"]((_0xe56eb5) => _0xe56eb5["cesiumObject"]);
  }
  ["getDataSourceLayers"]() {
    return this["viewer"]["dataSources"];
  }
  ["getLayerByType"](_0x289883) {
    return Array["from"](this["items"]["values"]())["filter"]((_0x35584a) => _0x35584a["layerType"] === _0x289883);
  }
  async ["zoomToLayer"](_0x55a842) {
    return this["cameraHighlight"]["zoomToLayer"](_0x55a842);
  }
  async ["zoomToEntity"](_0x4c5303, _0x4620dd) {
    return this["cameraHighlight"]["zoomToEntity"](_0x4c5303, _0x4620dd);
  }
  ["highlightEntity"](_0x4904fc) {
    this["cameraHighlight"]["highlightEntity"](_0x4904fc);
  }
  ["clearHighlight"]() {
    this["cameraHighlight"]["clearHighlight"]();
  }
  async ["add"](_0x6c793b, _0x37962f) {
    this["assertUniqueId"](_0x37962f["id"]);
    switch (_0x6c793b) {
      case "WMS":
        return this["addWMS"](_0x37962f);
      case "WMTS":
        return this["addWMTS"](_0x37962f);
      case "WFS":
        return this["addWFS"](_0x37962f);
      case "WCS":
        return this["addWCS"](_0x37962f);
      case "GEOTIFF":
        return this["addGeoTiff"](_0x37962f);
      case "GEOJSON":
      case "KML":
      case "KMZ":
        return this["addLocalKmlGeoJson"](_0x6c793b, _0x37962f);
      case "SHP":
        return this["addShp"](_0x37962f);
      case "CSV":
        return this["addCsv"](_0x37962f);
      case "XYZ":
        throw new LayerOperationError("LAYER_TYPE_UNSUPPORTED_XYZ", "XYZ katmanı add() ile desteklenmiyor. Map.setBasemap() kullanın.");
      case "DRAWING":
        throw new LayerOperationError("LAYER_TYPE_UNSUPPORTED_DRAWING", '"DRAWING" katmanı add() ile desteklenmiyor -- DrawingManager draw:complete olayı üzerinden Map tarafından otomatik eklenir.');
      case "MEASURE":
        throw new LayerOperationError("LAYER_TYPE_UNSUPPORTED_MEASURE", '"MEASURE" katmanı add() ile desteklenmiyor -- DrawingManager draw:complete olayı üzerinden Map tarafından otomatik eklenir.');
    }
  }
  ["setVisible"](_0x306687, _0x46c70a) {
    const _0x200179 = this["requireLayer"](_0x306687);
    _0x200179["cesiumObject"]["show"] = _0x46c70a, this["emit"]("layer:visibility", { "id": _0x306687, "visible": _0x46c70a });
  }
  ["setOpacity"](_0x5784d4, _0x4aa4ff) {
    const _0x4e3126 = Math["max"](0, Math["min"](1, _0x4aa4ff)), _0x204dfd = this["requireLayer"](_0x5784d4);
    _0x204dfd["cesiumObject"] instanceof ImageryLayer ? _0x204dfd["cesiumObject"]["alpha"] = _0x4e3126 : this["setDataSourceOpacity"](_0x204dfd["cesiumObject"], _0x4e3126), this["emit"]("layer:opacity", { "id": _0x5784d4, "opacity": _0x4e3126 });
  }
  ["_move"](_0x2756d6, _0x206ab1) {
    const _0x1e0e99 = this["requireLayer"](_0x2756d6), _0x271edd = _0x1e0e99["cesiumObject"] instanceof ImageryLayer ? this["viewer"]["imageryLayers"] : this["viewer"]["dataSources"], _0x3ba40d = _0x271edd["indexOf"](_0x1e0e99["cesiumObject"]);
    _0x271edd[_0x206ab1](_0x1e0e99["cesiumObject"]);
    const _0x5c3ca6 = _0x271edd["indexOf"](_0x1e0e99["cesiumObject"]);
    this["reindexLayerOrder"](), this["emit"]("layer:reorder", { "id": _0x2756d6, "oldIndex": _0x3ba40d, "newIndex": _0x5c3ca6, "layer": _0x1e0e99 });
  }
  ["raise"](_0x1c1ea2) {
    this["_move"](_0x1c1ea2, "raise");
  }
  ["lower"](_0x40889a) {
    this["_move"](_0x40889a, "lower");
  }
  ["raiseToTop"](_0x442249) {
    this["_move"](_0x442249, "raiseToTop");
  }
  ["lowerToBottom"](_0xb011c) {
    this["_move"](_0xb011c, "lowerToBottom");
  }
  ["reorder"](_0x32ebc4) {
    const _0x173b2d = _0x32ebc4[0], _0x35b4e4 = _0x173b2d !== void 0 ? this["items"]["get"](_0x173b2d) : void 0, _0x8f28d1 = (_0x35b4e4 == null ? void 0 : _0x35b4e4["cesiumObject"]) instanceof ImageryLayer, _0x4b382a = _0x35b4e4 ? _0x8f28d1 ? this["viewer"]["imageryLayers"]["indexOf"](_0x35b4e4["cesiumObject"]) : this["viewer"]["dataSources"]["indexOf"](_0x35b4e4["cesiumObject"]) : -1, _0x168fe4 = [], _0x2e4a36 = [];
    for (const _0x363036 of _0x32ebc4) {
      const _0x1d2e96 = this["items"]["get"](_0x363036);
      if (_0x1d2e96 === void 0) continue;
      _0x1d2e96["cesiumObject"] instanceof ImageryLayer ? _0x168fe4["push"](_0x363036) : _0x2e4a36["push"](_0x363036);
    }
    for (let _0x338a56 = _0x168fe4["length"] - 1; _0x338a56 >= 0; _0x338a56--) {
      const _0x2f7d7b = this["items"]["get"](_0x168fe4[_0x338a56]);
      (_0x2f7d7b == null ? void 0 : _0x2f7d7b["cesiumObject"]) instanceof ImageryLayer && this["viewer"]["imageryLayers"]["raiseToTop"](_0x2f7d7b["cesiumObject"]);
    }
    for (let _0x4308b3 = _0x2e4a36["length"] - 1; _0x4308b3 >= 0; _0x4308b3--) {
      const _0x248228 = this["items"]["get"](_0x2e4a36[_0x4308b3]);
      _0x248228 !== void 0 && !(_0x248228["cesiumObject"] instanceof ImageryLayer) && this["viewer"]["dataSources"]["raiseToTop"](_0x248228["cesiumObject"]);
    }
    this["reindexLayerOrder"]();
    if (_0x35b4e4 !== void 0 && _0x173b2d !== void 0) {
      const _0x2af580 = _0x8f28d1 ? this["viewer"]["imageryLayers"]["indexOf"](_0x35b4e4["cesiumObject"]) : this["viewer"]["dataSources"]["indexOf"](_0x35b4e4["cesiumObject"]);
      this["emit"]("layer:reorder", { "id": _0x173b2d, "oldIndex": _0x4b382a, "newIndex": _0x2af580, "layer": _0x35b4e4 });
    }
  }
  ["removeLayer"](_0x4cbdc1) {
    const _0xc6881f = this["requireLayer"](_0x4cbdc1);
    _0xc6881f["cesiumObject"] instanceof ImageryLayer ? this["viewer"]["imageryLayers"]["remove"](_0xc6881f["cesiumObject"], !![]) : void this["viewer"]["dataSources"]["remove"](_0xc6881f["cesiumObject"], !![]), this["items"]["delete"](_0x4cbdc1), this["analysisResultIds"]["delete"](_0x4cbdc1), this["ogcLayerFactory"]["deleteServiceOptions"](_0x4cbdc1), this["styleEngine"]["deleteStyle"](_0x4cbdc1), this["shapeLayerBridge"]["deleteCounter"](_0x4cbdc1), this["emit"]("layer:remove", { "layer": _0xc6881f });
  }
  ["addWMS"](_0x26b300) {
    return this["ogcLayerFactory"]["addWMS"](_0x26b300);
  }
  ["addWMTS"](_0x27b5ab) {
    return this["ogcLayerFactory"]["addWMTS"](_0x27b5ab);
  }
  async ["getWmsAvailableStyles"](_0x231cdd) {
    return this["ogcLayerFactory"]["getWmsAvailableStyles"](_0x231cdd);
  }
  async ["setWmsStyle"](_0x47afcc, _0x11733f) {
    return this["ogcLayerFactory"]["setWmsStyle"](_0x47afcc, _0x11733f);
  }
  ["getWmsLegendGraphicUrl"](_0x396b07, _0x166d17) {
    return this["ogcLayerFactory"]["getWmsLegendGraphicUrl"](_0x396b07, _0x166d17);
  }
  async ["getWmtsAvailableStyles"](_0x44fcaa) {
    return this["ogcLayerFactory"]["getWmtsAvailableStyles"](_0x44fcaa);
  }
  async ["setWmtsStyle"](_0xc74f9f, _0x397b74) {
    return this["ogcLayerFactory"]["setWmtsStyle"](_0xc74f9f, _0x397b74);
  }
  ["addWFS"](_0x9bec1b) {
    return this["ogcLayerFactory"]["addWFS"]({ ..._0x9bec1b, "clampToGround": _0x9bec1b["clampToGround"] ?? !![] });
  }
  ["addWCS"](_0x59dced) {
    return this["ogcLayerFactory"]["addWCS"](_0x59dced);
  }
  ["addGeoTiff"](_0x48d4c2) {
    return this["ogcLayerFactory"]["addGeoTiff"](_0x48d4c2);
  }
  ["addLocalKmlGeoJson"](_0x426f5c, _0xa6e222) {
    return this["localSourceLoader"]["addLocalKmlGeoJson"](_0x426f5c, _0xa6e222);
  }
  ["addShp"](_0x395593) {
    return this["localSourceLoader"]["addShp"](_0x395593);
  }
  ["addCsv"](_0x51ad80) {
    return this["localSourceLoader"]["addCsv"](_0x51ad80);
  }
  ["_addBasemapImageryLayer"](_0x3d80e7, _0x4204c1, _0x30ae72) {
    return this["register"](_0x3d80e7, _0x4204c1, "XYZ", _0x30ae72, !![]);
  }
  ["_removeBasemapLayers"]() {
    for (const _0x427fda of this["items"]["values"]()) {
      _0x427fda["isBasemap"] && _0x427fda["cesiumObject"] instanceof ImageryLayer && (this["viewer"]["imageryLayers"]["remove"](_0x427fda["cesiumObject"], !![]), this["items"]["delete"](_0x427fda["id"]));
    }
  }
  ["_addDrawnShape"](_0x231535, _0x228cb4, _0x45450c) {
    return this["shapeLayerBridge"]["addDrawnShape"](_0x231535, _0x228cb4, _0x45450c);
  }
  ["_addMeasuredShape"](_0x36c080, _0x70e207, _0x2852b2) {
    return this["shapeLayerBridge"]["addMeasuredShape"](_0x36c080, _0x70e207, _0x2852b2);
  }
  ["_removeDrawnShape"](_0x277dc9, _0x39aed0) {
    this["shapeLayerBridge"]["removeDrawnShape"](_0x277dc9, _0x39aed0);
  }
  ["register"](_0x594656, _0x2bc3b8, _0x4eadc3, _0x1be128, _0xaa3886, _0x25acce) {
    "entities" in _0x1be128 && this["tagEntities"](_0x1be128, _0x594656);
    const _0xf173e3 = Object["freeze"]({ "id": _0x594656, "title": _0x2bc3b8, "layerType": _0x4eadc3, "cesiumObject": _0x1be128, "isBasemap": _0xaa3886, ..._0x25acce !== void 0 ? { "initialFillColor": _0x25acce } : {} });
    return this["items"]["set"](_0x594656, _0xf173e3), this["emit"]("layer:add", { "layer": _0xf173e3 }), _0xf173e3;
  }
  ["emitCrsCheckResult"](_0x2905a0, _0x5411ba) {
    if (!_0x5411ba) return;
    switch (_0x5411ba["kind"]) {
      case "reprojected":
        this["emit"]("layer:crs-reprojected", { "id": _0x2905a0, "fromEpsg": _0x5411ba["fromEpsg"], "toEpsg": "EPSG:4326" });
        break;
      case "suspicious-unresolved-crs":
        this["emit"]("layer:crs-unresolved", { "id": _0x2905a0, "crsName": _0x5411ba["crsName"] });
        break;
    }
  }
  ["tagEntities"](_0x1d416c, _0x4cd261) {
    _0x1d416c["entities"]["suspendEvents"]();
    for (const _0x3de773 of _0x1d416c["entities"]["values"]) {
      _0x3de773["properties"] === void 0 && (_0x3de773["properties"] = new PropertyBag()), !_0x3de773["properties"]["hasProperty"]("layerId") && _0x3de773["properties"]["addProperty"]("layerId", _0x4cd261), !_0x3de773["properties"]["hasProperty"]("featureId") && _0x3de773["properties"]["addProperty"]("featureId", _0x3de773["id"]);
    }
    _0x1d416c["entities"]["resumeEvents"]();
  }
  ["reindexLayerOrder"]() {
    const _0x31aea2 = /* @__PURE__ */ new Map();
    for (let _0x5c51f0 = 0; _0x5c51f0 < this["viewer"]["imageryLayers"]["length"]; _0x5c51f0++) {
      _0x31aea2["set"](this["viewer"]["imageryLayers"]["get"](_0x5c51f0), _0x5c51f0);
    }
    const _0x8f4949 = /* @__PURE__ */ new Map();
    for (let _0x2d1017 = 0; _0x2d1017 < this["viewer"]["dataSources"]["length"]; _0x2d1017++) {
      _0x8f4949["set"](this["viewer"]["dataSources"]["get"](_0x2d1017), _0x2d1017);
    }
    const _0x358d60 = (_0x2b4c6a) => (_0x2b4c6a["cesiumObject"] instanceof ImageryLayer ? _0x31aea2["get"](_0x2b4c6a["cesiumObject"]) : _0x8f4949["get"](_0x2b4c6a["cesiumObject"])) ?? Number["POSITIVE_INFINITY"], _0x48fcb8 = Array["from"](this["items"]["entries"]()), _0x1dbf53 = _0x48fcb8["filter"](([, _0x100484]) => _0x100484["cesiumObject"] instanceof ImageryLayer)["sort"](([, _0x1179c3], [, _0x51bce6]) => _0x358d60(_0x1179c3) - _0x358d60(_0x51bce6)), _0x5d6005 = _0x48fcb8["filter"](([, _0x40c780]) => !(_0x40c780["cesiumObject"] instanceof ImageryLayer))["sort"](([, _0x2e08fe], [, _0x484390]) => _0x358d60(_0x2e08fe) - _0x358d60(_0x484390));
    let _0x487bd8 = 0, _0x5940fb = 0;
    const _0x2290fc = _0x48fcb8["map"](([, _0x1480ca]) => _0x1480ca["cesiumObject"] instanceof ImageryLayer ? _0x1dbf53[_0x487bd8++] : _0x5d6005[_0x5940fb++]);
    this["items"]["clear"]();
    for (const [_0x2912a1, _0x5891b7] of _0x2290fc) this["items"]["set"](_0x2912a1, _0x5891b7);
  }
  ["requireLayer"](_0x53c1f4) {
    const _0x57e410 = this["items"]["get"](_0x53c1f4);
    if (_0x57e410 === void 0) throw new LayerOperationError("LAYER_NOT_FOUND", 'Katman bulunamadı: "' + _0x53c1f4 + '"');
    return _0x57e410;
  }
  ["assertUniqueId"](_0x419207) {
    if (this["items"]["has"](_0x419207)) throw new LayerOperationError("LAYER_ID_ALREADY_EXISTS", '"' + _0x419207 + `" id'li katman zaten eklenmiş.`);
  }
  async ["getCapabilitiesDocument"](_0x4b94eb, _0x35b9c4, _0x5a7263, _0x557896) {
    return this["ogcLayerFactory"]["getCapabilitiesDocument"](_0x4b94eb, _0x35b9c4, _0x5a7263, _0x557896);
  }
  async ["getWcsCoverageExtents"](_0x1ecf18, _0x56de15, _0x3b5326) {
    return this["ogcLayerFactory"]["getWcsCoverageExtents"](_0x1ecf18, _0x56de15, _0x3b5326);
  }
  ["waitForRenderSettle"](_0x5274cd = 60) {
    return new Promise((_0x46a5cd) => {
      let _0x56c9fd = _0x5274cd;
      const _0x1b208a = () => {
        _0x56c9fd -= 1, _0x56c9fd <= 0 && (this["viewer"]["scene"]["postRender"]["removeEventListener"](_0x1b208a), _0x46a5cd());
      };
      this["viewer"]["scene"]["postRender"]["addEventListener"](_0x1b208a);
    });
  }
  ["isOutlineCompanion"](_0xa1e047) {
    return this["outlineGeometry"]["isOutlineCompanion"](_0xa1e047);
  }
  ["hasOutlineCompanion"](_0x25a125) {
    return this["outlineGeometry"]["hasOutlineCompanion"](_0x25a125);
  }
  ["hasRiskyOutline"](_0x1d5bb0) {
    return this["outlineGeometry"]["hasRiskyOutline"](_0x1d5bb0);
  }
  ["addPolygonOutlines"](_0x1719f8, _0x4b1c0e, _0x51ab26) {
    this["outlineGeometry"]["addPolygonOutlines"](_0x1719f8, _0x4b1c0e, _0x51ab26);
    for (const _0x1a9f99 of _0x1719f8["entities"]["values"]) {
      this["outlineGeometry"]["hasOutlineCompanion"](_0x1a9f99) && this["opacityController"]["ensureDynamicFillColor"](_0x1719f8, _0x1a9f99);
    }
  }
  ["addPolygonOutlineCompanion"](_0x5f0739, _0xaa3c42, _0x440c91, _0x41ef6b, _0x5a6c50) {
    this["outlineGeometry"]["addPolygonOutlineCompanion"](_0x5f0739, _0xaa3c42, _0x440c91, _0x41ef6b, _0x5a6c50), this["outlineGeometry"]["hasOutlineCompanion"](_0xaa3c42) && this["opacityController"]["ensureDynamicFillColor"](_0x5f0739, _0xaa3c42);
  }
  ["readProperty"](_0x5e2090, _0x25432b, _0x47dcc4) {
    return this["styleEngine"]["readProperty"](_0x5e2090, _0x25432b, _0x47dcc4);
  }
  ["applyEntityStyle"](_0x2c2221, _0x3df289, _0x9f9fef, _0x47dd58) {
    this["styleEngine"]["applyEntityStyle"](_0x2c2221, _0x3df289, _0x9f9fef, _0x47dd58);
  }
  ["setDataSourceOpacity"](_0x3a5d9b, _0x54f530) {
    this["opacityController"]["setDataSourceOpacity"](_0x3a5d9b, _0x54f530);
  }
  ["destroy"]() {
    this["removeAllListeners"](), this["items"]["clear"]();
  }
};
_LayerManager["DEFAULT_OUTLINE_COLOR_HEX"] = "#1a73e8";
_LayerManager["DEFAULT_OUTLINE_COLOR"] = Color["fromCssColorString"](_LayerManager["DEFAULT_OUTLINE_COLOR_HEX"]);
let LayerManager = _LayerManager;
const FLAG = "__tucbsSelectionHighlight";
function isSelectionHighlightEntity(_0x24901f) {
  return _0x24901f[FLAG] === !![];
}
class SelectionHighlight {
  constructor(_0x1c1315) {
    this["viewer"] = _0x1c1315, this["source"] = null, this["generation"] = 0;
  }
  ["show"](_0x2cf07e) {
    const _0x3e99e4 = ++this["generation"];
    if (_0x2cf07e["length"] === 0) {
      this["removeSource"]();
      return;
    }
    void this["load"](_0x2cf07e, _0x3e99e4);
  }
  ["clear"]() {
    this["generation"]++, this["removeSource"]();
  }
  async ["load"](_0x22b214, _0x1c499f) {
    const _0x522c67 = Color["fromCssColorString"]("#dc2626")["withAlpha"](0.25), _0x2aa27d = Color["fromCssColorString"]("#dc2626"), _0x269172 = { "type": "FeatureCollection", "features": [..._0x22b214] }, _0xbeb251 = await GeoJsonDataSource["load"](_0x269172, { "clampToGround": !![], "fill": _0x522c67, "stroke": _0x2aa27d, "strokeWidth": 3, "markerColor": _0x2aa27d, "markerSize": 16 });
    if (_0x1c499f !== this["generation"]) return;
    this["removeSource"](), this["paint"](_0xbeb251, _0x522c67, _0x2aa27d), this["viewer"]["dataSources"]["add"](_0xbeb251), this["source"] = _0xbeb251;
  }
  ["paint"](_0x5aec25, _0xaa154b, _0x28015e) {
    var _a2;
    for (const _0x203177 of [..._0x5aec25["entities"]["values"]]) {
      this["tag"](_0x203177);
      _0x203177["billboard"] && (_0x203177["billboard"] = void 0, _0x203177["point"] = new PointGraphics({ "pixelSize": 16, "color": _0x28015e, "outlineColor": Color["WHITE"], "outlineWidth": 2, "heightReference": HeightReference["CLAMP_TO_GROUND"], "disableDepthTestDistance": Number["POSITIVE_INFINITY"] }));
      const _0x4a18bb = _0x203177["polygon"];
      if (!_0x4a18bb) continue;
      _0x4a18bb["material"] = new ColorMaterialProperty(_0xaa154b), _0x4a18bb["outline"] = new ConstantProperty(![]);
      const _0x4d92b4 = (_a2 = _0x4a18bb["hierarchy"]) == null ? void 0 : _a2["getValue"](JulianDate["now"]());
      this["addRings"](_0x5aec25, _0x4d92b4, _0x28015e);
    }
  }
  ["addRings"](_0x3ceedc, _0x522fc7, _0x49a8e6) {
    var _a2;
    if (!((_a2 = _0x522fc7 == null ? void 0 : _0x522fc7["positions"]) == null ? void 0 : _a2["length"])) return;
    this["addRing"](_0x3ceedc, _0x522fc7["positions"], _0x49a8e6);
    for (const _0x2e36b0 of _0x522fc7["holes"] ?? []) this["addRings"](_0x3ceedc, _0x2e36b0, _0x49a8e6);
  }
  ["addRing"](_0x24737a, _0x45451c, _0xbf438) {
    const _0x408d1f = _0x24737a["entities"]["add"]({ "polyline": { "positions": _0x45451c, "width": 3, "material": new ColorMaterialProperty(_0xbf438), "clampToGround": !![] } });
    this["tag"](_0x408d1f);
  }
  ["tag"](_0x3490dc) {
    _0x3490dc[FLAG] = !![];
  }
  ["removeSource"]() {
    if (!this["source"]) return;
    this["viewer"]["dataSources"]["remove"](this["source"], !![]), this["source"] = null;
  }
}
const DRILL_PICK_LIMIT = 32;
function boundingBoxFromPoints(_0x5d5263) {
  if (_0x5d5263["length"] === 0) return void 0;
  let _0x4105a9 = Infinity, _0x235a53 = Infinity, _0x40c1a1 = -Infinity, _0x107358 = -Infinity;
  for (const [_0x42e81d, _0x3cdcd8] of _0x5d5263) {
    if (_0x42e81d < _0x4105a9) _0x4105a9 = _0x42e81d;
    if (_0x42e81d > _0x40c1a1) _0x40c1a1 = _0x42e81d;
    if (_0x3cdcd8 < _0x235a53) _0x235a53 = _0x3cdcd8;
    if (_0x3cdcd8 > _0x107358) _0x107358 = _0x3cdcd8;
  }
  if (_0x4105a9 === _0x40c1a1 && _0x235a53 === _0x107358) return { "kind": "point", "longitude": _0x4105a9, "latitude": _0x235a53 };
  return { "kind": "extent", "west": _0x4105a9, "south": _0x235a53, "east": _0x40c1a1, "north": _0x107358 };
}
function flattenGeoJsonCoordinates(_0x6e704c, _0x469883) {
  if (!Array["isArray"](_0x6e704c) || _0x6e704c["length"] === 0) return;
  if (typeof _0x6e704c[0] === "number") {
    const [_0x1490b6, _0x296fb8] = _0x6e704c;
    if (typeof _0x1490b6 === "number" && typeof _0x296fb8 === "number") _0x469883["push"]([_0x1490b6, _0x296fb8]);
    return;
  }
  for (const _0x6f611d of _0x6e704c) flattenGeoJsonCoordinates(_0x6f611d, _0x469883);
}
function extractGeoJsonExtent(_0x455dd2) {
  if (_0x455dd2 === null || typeof _0x455dd2 !== "object") return void 0;
  const _0x18610d = _0x455dd2, _0x2d961c = _0x18610d["type"] === "FeatureCollection" && Array["isArray"](_0x18610d["features"]) ? _0x18610d["features"]["map"]((_0x4dd439) => _0x4dd439 == null ? void 0 : _0x4dd439["geometry"])["filter"]((_0x54c9d1) => _0x54c9d1 !== void 0 && _0x54c9d1 !== null) : _0x18610d["geometry"] ? [_0x18610d["geometry"]] : [];
  if (_0x2d961c["length"] === 0) return void 0;
  const _0x2f4fcb = [];
  for (const _0x1ea9d7 of _0x2d961c) {
    const _0x24e8dc = _0x1ea9d7;
    if (_0x24e8dc["type"] === "GeometryCollection" && Array["isArray"](_0x24e8dc["geometries"])) for (const _0x153514 of _0x24e8dc["geometries"]) {
      flattenGeoJsonCoordinates(_0x153514 == null ? void 0 : _0x153514["coordinates"], _0x2f4fcb);
    }
    else flattenGeoJsonCoordinates(_0x24e8dc["coordinates"], _0x2f4fcb);
  }
  return boundingBoxFromPoints(_0x2f4fcb);
}
function collectGmlCoordinates(_0x283eb8, _0x37dd7b) {
  var _a2, _b;
  for (const _0x26a952 of Array["from"](_0x283eb8["getElementsByTagNameNS"]("*", "coordinates"))) {
    const _0x42f18c = (_a2 = _0x26a952["textContent"]) == null ? void 0 : _a2["trim"]();
    if (!_0x42f18c) continue;
    for (const _0x45141c of _0x42f18c["split"](/\s+/)) {
      const [_0x4ac7a7, _0x51f082] = _0x45141c["split"](","), _0x1d2f4b = Number(_0x4ac7a7), _0x487a5b = Number(_0x51f082);
      if (Number["isFinite"](_0x1d2f4b) && Number["isFinite"](_0x487a5b)) _0x37dd7b["push"]([_0x1d2f4b, _0x487a5b]);
    }
  }
  for (const _0x5eb498 of ["pos", "posList"]) {
    for (const _0x558b66 of Array["from"](_0x283eb8["getElementsByTagNameNS"]("*", _0x5eb498))) {
      const _0x47eea3 = (((_b = _0x558b66["textContent"]) == null ? void 0 : _b["trim"]()) ?? "")["split"](/\s+/)["map"](Number);
      for (let _0x13202c = 0; _0x13202c + 1 < _0x47eea3["length"]; _0x13202c += 2) {
        const _0x2b2583 = _0x47eea3[_0x13202c], _0x2b1944 = _0x47eea3[_0x13202c + 1];
        if (Number["isFinite"](_0x2b2583) && Number["isFinite"](_0x2b1944)) _0x37dd7b["push"]([_0x2b2583, _0x2b1944]);
      }
    }
  }
}
function extractGmlExtent(_0x32364c) {
  if (!(_0x32364c instanceof Element)) return void 0;
  const _0x3d0955 = [];
  return collectGmlCoordinates(_0x32364c, _0x3d0955), boundingBoxFromPoints(_0x3d0955);
}
function extractImageryGeometry(_0x470789) {
  return extractGeoJsonExtent(_0x470789) ?? extractGmlExtent(_0x470789);
}
class InteractionManager extends EventEmitter {
  constructor(_0x541e6f) {
    super(), this["unsubscribers"] = [], this["suspended"] = ![], this["identifySuspended"] = ![], this["hoverEnabled"] = ![], this["pickGeneration"] = 0, this["viewer"] = _0x541e6f, this["handler"] = new ScreenSpaceEventHandler(_0x541e6f["scene"]["canvas"]), this["bindMouseEvents"](), this["bindCameraEvents"](), this["bindSceneEvents"]();
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
  ["enableHover"](_0x36c3fc) {
    this["hoverEnabled"] = _0x36c3fc, !_0x36c3fc && (this["hoveredEntity"] = void 0);
  }
  ["isHoverEnabled"]() {
    return this["hoverEnabled"];
  }
  ["flyToPosition"](_0x177d0d, _0x3c5fd4, _0x16b6d8) {
    const _0x5eb050 = (_0x16b6d8 == null ? void 0 : _0x16b6d8["height"]) ?? 1e3;
    this["viewer"]["camera"]["flyTo"]({ "destination": Cartesian3["fromDegrees"](_0x177d0d, _0x3c5fd4, _0x5eb050), "orientation": { "pitch": _0x3bd2fa["toRadians"](-90) }, ...(_0x16b6d8 == null ? void 0 : _0x16b6d8["duration"]) !== void 0 ? { "duration": _0x16b6d8["duration"] } : {} });
  }
  ["flyToExtent"](_0x3f13f4, _0x11e151, _0x39d5f1, _0xec5da4, _0x313417) {
    this["viewer"]["camera"]["flyTo"]({ "destination": Rectangle["fromDegrees"](_0x3f13f4, _0x11e151, _0x39d5f1, _0xec5da4), "orientation": { "pitch": _0x3bd2fa["toRadians"](-90) }, ...(_0x313417 == null ? void 0 : _0x313417["duration"]) !== void 0 ? { "duration": _0x313417["duration"] } : {} });
  }
  ["destroy"]() {
    !this["handler"]["isDestroyed"]() && this["handler"]["destroy"]();
    for (const _0x2e3738 of this["unsubscribers"]) {
      _0x2e3738();
    }
    this["unsubscribers"]["length"] = 0, this["removeAllListeners"]();
  }
  ["bindMouseEvents"]() {
    this["handler"]["setInputAction"]((_0x25bbc0) => this["dispatchPick"](_0x25bbc0["position"], "entity:click", "map:click", "imagery:click"), ScreenSpaceEventType["LEFT_CLICK"]), this["handler"]["setInputAction"]((_0x31a905) => this["dispatchPick"](_0x31a905["position"], "entity:dblclick", "map:dblclick", "imagery:dblclick"), ScreenSpaceEventType["LEFT_DOUBLE_CLICK"]), this["handler"]["setInputAction"]((_0x413335) => this["dispatchPick"](_0x413335["position"], "entity:rightclick", "map:rightclick", "imagery:rightclick"), ScreenSpaceEventType["RIGHT_CLICK"]), this["handler"]["setInputAction"]((_0x32184d) => this["dispatchEntityOnly"](_0x32184d["position"], "entity:mousedown"), ScreenSpaceEventType["LEFT_DOWN"]), this["handler"]["setInputAction"]((_0x45e236) => this["dispatchEntityOnly"](_0x45e236["position"], "entity:mouseup"), ScreenSpaceEventType["LEFT_UP"]), this["handler"]["setInputAction"]((_0x4386be) => this["handleMouseMove"](_0x4386be["endPosition"]), ScreenSpaceEventType["MOUSE_MOVE"]), this["handler"]["setInputAction"]((_0x35b7f9) => this["emit"]("map:wheel", { "delta": _0x35b7f9 }), ScreenSpaceEventType["WHEEL"]), this["handler"]["setInputAction"]((_0x4384fa) => this["emit"]("map:pinchstart", this["buildMapDetail"](_0x4384fa["position1"])), ScreenSpaceEventType["PINCH_START"]), this["handler"]["setInputAction"](() => this["emit"]("map:pinchend", {}), ScreenSpaceEventType["PINCH_END"]), this["handler"]["setInputAction"]((_0x2a5165) => {
      const _0x324a2b = Math["atan2"](_0x2a5165["position2"]["y"] - _0x2a5165["position1"]["y"], _0x2a5165["position2"]["x"] - _0x2a5165["position1"]["x"]);
      this["emit"]("map:pinchmove", { ...this["buildMapDetail"](_0x2a5165["position1"]), "angle": _0x324a2b });
    }, ScreenSpaceEventType["PINCH_MOVE"]);
  }
  ["handleMouseMove"](_0x45a050) {
    this["emit"]("map:mousemove", this["buildMapDetail"](_0x45a050));
    if (!this["hoverEnabled"] || this["suspended"]) return;
    const _0xc26554 = this["pickSelectableEntity"](_0x45a050);
    if (_0xc26554 === this["hoveredEntity"]) return;
    this["hoveredEntity"] !== void 0 && this["emit"]("entity:mouseleave", this["buildEntityDetail"](this["hoveredEntity"], _0x45a050)), this["hoveredEntity"] = _0xc26554, _0xc26554 !== void 0 && this["emit"]("entity:mouseenter", this["buildEntityDetail"](_0xc26554, _0x45a050));
  }
  ["dispatchPick"](_0x4ab800, _0x94d334, _0x4b1bf5, _0x3e5654) {
    if (this["suspended"]) return;
    this["pickGeneration"]++;
    const _0x45aef1 = this["pickSelectableEntity"](_0x4ab800);
    _0x45aef1 ? this["emit"](_0x94d334, this["buildEntityDetail"](_0x45aef1, _0x4ab800)) : this["emit"](_0x4b1bf5, this["buildMapDetail"](_0x4ab800)), this["pickImageryFeatures"](_0x4ab800, _0x3e5654);
  }
  ["pickSelectableEntity"](_0x10d823) {
    const _0x2cb6f0 = this["scene"]["drillPick"](_0x10d823, DRILL_PICK_LIMIT);
    for (const _0x271130 of _0x2cb6f0) {
      const _0x5de2a0 = _0x271130 == null ? void 0 : _0x271130["id"];
      if (!(_0x5de2a0 instanceof Entity)) continue;
      if (isSelectionHighlightEntity(_0x5de2a0)) continue;
      return _0x5de2a0;
    }
    return void 0;
  }
  ["pickImageryFeatures"](_0x41915b, _0xa06e0a) {
    const _0x5990f6 = this["pickGeneration"], _0x1c2c07 = this["camera"]["getPickRay"](_0x41915b);
    if (!_0x1c2c07) return;
    const _0x3efa6f = this["viewer"]["imageryLayers"]["pickImageryLayerFeatures"](_0x1c2c07, this["scene"]);
    if (!_0x3efa6f) return;
    this["emit"]("imagery:querying", this["buildMapDetail"](_0x41915b));
    const _0x2ff30e = (_0x3c850d) => {
      if (this["suspended"] || _0x5990f6 !== this["pickGeneration"]) return;
      this["emit"](_0xa06e0a, this["buildImageryDetail"](_0x3c850d, _0x41915b));
    };
    _0x3efa6f["then"](_0x2ff30e)["catch"](() => {
      _0x2ff30e([]);
    });
  }
  ["buildImageryDetail"](_0x8a082e, _0x380e9e) {
    const _0x358e56 = _0x8a082e["map"]((_0x4bfa5f) => ({ "imageryLayer": _0x4bfa5f["imageryLayer"], "name": _0x4bfa5f["name"] ?? null, "properties": _0x4bfa5f["properties"] ?? {}, "description": _0x4bfa5f["description"] ?? null, "geometryHint": extractImageryGeometry(_0x4bfa5f["data"]) }));
    return { "position": this["toLonLat"](_0x380e9e), "screenPos": { "x": _0x380e9e["x"], "y": _0x380e9e["y"] }, "features": _0x358e56 };
  }
  ["dispatchEntityOnly"](_0x3c5525, _0x4f4ca3) {
    if (this["suspended"]) return;
    const _0x55ec0f = this["scene"]["pick"](_0x3c5525);
    (_0x55ec0f == null ? void 0 : _0x55ec0f["id"]) instanceof Entity && this["emit"](_0x4f4ca3, this["buildEntityDetail"](_0x55ec0f["id"], _0x3c5525));
  }
  ["bindCameraEvents"]() {
    this["unsubscribers"]["push"](this["camera"]["moveStart"]["addEventListener"](() => this["emit"]("camera:moveStart", {})), this["camera"]["moveEnd"]["addEventListener"](() => this["emit"]("camera:moveEnd", {})), this["camera"]["changed"]["addEventListener"]((_0x4ac17e) => this["emit"]("camera:changed", { "percentage": _0x4ac17e })));
  }
  ["bindSceneEvents"]() {
    this["unsubscribers"]["push"](this["scene"]["preRender"]["addEventListener"]((_0x4ae0fb, _0x339cc3) => this["emit"]("scene:preRender", { "time": _0x339cc3 })), this["scene"]["postRender"]["addEventListener"]((_0x447d5c, _0x37e1a6) => this["emit"]("scene:postRender", { "time": _0x37e1a6 })), this["scene"]["morphStart"]["addEventListener"](() => this["emit"]("scene:morphStart", {})), this["scene"]["morphComplete"]["addEventListener"](() => this["emit"]("scene:morphComplete", {})));
  }
  ["buildMapDetail"](_0x2caf19) {
    return { "position": this["toLonLat"](_0x2caf19), "screenPos": { "x": _0x2caf19["x"], "y": _0x2caf19["y"] } };
  }
  ["buildEntityDetail"](_0x303024, _0x5021b9) {
    return { ...this["resolveFeature"](_0x303024), "position": this["toLonLat"](_0x5021b9), "screenPos": { "x": _0x5021b9["x"], "y": _0x5021b9["y"] }, "features": this["pickAllFeatures"](_0x5021b9, _0x303024) };
  }
  ["resolveFeature"](_0x5d13a2) {
    var _a2, _b;
    const _0x4a3aa9 = JulianDate["now"](), _0x11280d = ((_a2 = _0x5d13a2["properties"]) == null ? void 0 : _a2["getValue"](_0x4a3aa9)) ?? {}, _0x972709 = _0x11280d["__tucbsOutlineOf"];
    if (typeof _0x972709 === "string") {
      const _0xd897f7 = (_b = _0x5d13a2["entityCollection"]) == null ? void 0 : _b["getById"](_0x972709);
      if (_0xd897f7 && _0xd897f7 !== _0x5d13a2) return this["resolveFeature"](_0xd897f7);
    }
    const _0x4b7c4a = typeof _0x11280d["layerId"] === "string" ? _0x11280d["layerId"] : null, _0xa94afb = typeof _0x11280d["featureId"] === "string" ? _0x11280d["featureId"] : null;
    if ("__tucbsOutlineOf" in _0x11280d) {
      const { __tucbsOutlineOf: _0xcc3c64, ..._0x421908 } = _0x11280d;
      return { "entity": _0x5d13a2, "layerId": _0x4b7c4a, "featureId": _0xa94afb, "properties": _0x421908 };
    }
    return { "entity": _0x5d13a2, "layerId": _0x4b7c4a, "featureId": _0xa94afb, "properties": _0x11280d };
  }
  ["pickAllFeatures"](_0x55119c, _0x9cf7b1) {
    const _0x2ebb86 = this["resolveFeature"](_0x9cf7b1), _0x4476db = [_0x2ebb86], _0x26a712 = /* @__PURE__ */ new Set([_0x2ebb86["entity"]]), _0x4faa13 = this["scene"]["drillPick"](_0x55119c, DRILL_PICK_LIMIT);
    for (const _0xa058f7 of _0x4faa13) {
      const _0x371962 = _0xa058f7 == null ? void 0 : _0xa058f7["id"];
      if (!(_0x371962 instanceof Entity)) continue;
      const _0x5dcdc5 = this["resolveFeature"](_0x371962);
      if (_0x26a712["has"](_0x5dcdc5["entity"])) continue;
      _0x26a712["add"](_0x5dcdc5["entity"]), _0x4476db["push"](_0x5dcdc5);
    }
    return _0x4476db;
  }
  ["toLonLat"](_0x537a40) {
    const _0x2774f8 = this["camera"]["pickEllipsoid"](_0x537a40, this["scene"]["globe"]["ellipsoid"]);
    if (_0x2774f8 === void 0) return [0, 0];
    const _0x43067d = Cartographic["fromCartesian"](_0x2774f8);
    return [_0x3bd2fa["toDegrees"](_0x43067d["longitude"]), _0x3bd2fa["toDegrees"](_0x43067d["latitude"])];
  }
}
const EARTH_RADIUS_METERS = 6378137, CIRCLE_SEGMENTS = 48;
function dedupePositions(_0x5b7ef8) {
  return _0x5b7ef8["filter"]((_0x20db20, _0x50da2a) => _0x50da2a === 0 || !Cartesian3["equalsEpsilon"](_0x20db20, _0x5b7ef8[_0x50da2a - 1], _0x3bd2fa["EPSILON7"]));
}
class DrawingManager extends EventEmitter {
  constructor(_0x3eb956, _0x14fa92) {
    super(), this["shapes"] = /* @__PURE__ */ new Map(), this["positions"] = [], this["tempVertexEntities"] = [], this["freehandDragging"] = ![], this["onEscapeKey"] = (_0x2fb1ae) => {
      if (_0x2fb1ae["key"] !== "Escape") return;
      this["abortCurrentShape"]();
    }, this["viewer"] = _0x3eb956, this["interactionManager"] = _0x14fa92, this["handler"] = new ScreenSpaceEventHandler(_0x3eb956["scene"]["canvas"]);
  }
  get ["scene"]() {
    return this["viewer"]["scene"];
  }
  ["activate"](_0x342bcd, _0x1670c6) {
    if (this["activeTool"]) this["deactivate"]();
    this["activeTool"] = _0x342bcd, this["activeSource"] = _0x1670c6, this["positions"] = [], this["previewPosition"] = void 0, this["interactionManager"]["suspend"](), this["resetTrackedEntity"](), this["suspendBuiltInDoubleClick"]();
    if (_0x342bcd === "freehand") this["lockCamera"]();
    this["setCursor"]("crosshair"), this["bindToolHandlers"](_0x342bcd), this["emit"]("draw:start", _0x1670c6 === void 0 ? { "tool": _0x342bcd } : { "tool": _0x342bcd, "source": _0x1670c6 });
  }
  ["deactivate"]() {
    if (!this["activeTool"]) return;
    const _0x5e3795 = this["activeTool"], _0x163662 = this["activeSource"];
    this["finishSession"](), this["emit"]("draw:cancel", _0x163662 === void 0 ? { "tool": _0x5e3795 } : { "tool": _0x5e3795, "source": _0x163662 });
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
  ["getShapeById"](_0x50a8e5) {
    return this["shapes"]["get"](_0x50a8e5);
  }
  ["removeShape"](_0x51a307) {
    const _0x5d941a = this["shapes"]["get"](_0x51a307);
    if (!_0x5d941a) return;
    this["viewer"]["entities"]["remove"](_0x5d941a["entity"]), this["shapes"]["delete"](_0x51a307), this["emit"]("draw:remove", { "id": _0x51a307, "shape": _0x5d941a });
  }
  ["clearAll"]() {
    for (const _0x111651 of [...this["shapes"]["keys"]()]) this["removeShape"](_0x111651);
  }
  ["undo"]() {
    if (this["positions"]["length"] === 0) return;
    this["positions"]["pop"]();
    const _0x5bd347 = this["tempVertexEntities"]["pop"]();
    if (_0x5bd347) this["viewer"]["entities"]["remove"](_0x5bd347);
  }
  ["toGeoJSON"]() {
    return { "type": "FeatureCollection", "features": this["getShapes"]()["map"]((_0x219a6c) => ({ "type": "Feature", "properties": { "id": _0x219a6c["id"], "tool": _0x219a6c["tool"] }, "geometry": _0x219a6c["geometry"] })) };
  }
  ["destroy"]() {
    this["deactivate"](), this["handler"]["destroy"](), this["removeAllListeners"]();
  }
  ["bindToolHandlers"](_0x1afd2f) {
    this["handler"]["setInputAction"](() => this["deactivate"](), ScreenSpaceEventType["RIGHT_CLICK"]), document["addEventListener"]("keydown", this["onEscapeKey"]);
    if (_0x1afd2f === "freehand") {
      this["handler"]["setInputAction"]((_0x38aa2b) => this["onFreehandDown"](_0x38aa2b["position"]), ScreenSpaceEventType["LEFT_DOWN"]), this["handler"]["setInputAction"](() => this["onFreehandUp"](), ScreenSpaceEventType["LEFT_UP"]), this["handler"]["setInputAction"]((_0x214ac2) => this["onFreehandMove"](_0x214ac2["endPosition"]), ScreenSpaceEventType["MOUSE_MOVE"]);
      return;
    }
    this["handler"]["setInputAction"]((_0x34915b) => this["onVertexClick"](_0x34915b["position"]), ScreenSpaceEventType["LEFT_CLICK"]), this["handler"]["setInputAction"]((_0x3e10f6) => this["onPreviewMove"](_0x3e10f6["endPosition"]), ScreenSpaceEventType["MOUSE_MOVE"]), (_0x1afd2f === "polyline" || _0x1afd2f === "polygon") && this["handler"]["setInputAction"](() => this["finishMultiVertexViaDoubleClick"](), ScreenSpaceEventType["LEFT_DOUBLE_CLICK"]);
  }
  ["unbindToolHandlers"]() {
    this["handler"]["removeInputAction"](ScreenSpaceEventType["LEFT_CLICK"]), this["handler"]["removeInputAction"](ScreenSpaceEventType["LEFT_DOWN"]), this["handler"]["removeInputAction"](ScreenSpaceEventType["LEFT_UP"]), this["handler"]["removeInputAction"](ScreenSpaceEventType["MOUSE_MOVE"]), this["handler"]["removeInputAction"](ScreenSpaceEventType["RIGHT_CLICK"]), this["handler"]["removeInputAction"](ScreenSpaceEventType["LEFT_DOUBLE_CLICK"]), document["removeEventListener"]("keydown", this["onEscapeKey"]);
  }
  ["abortCurrentShape"]() {
    if (this["activeTool"] === void 0 || this["positions"]["length"] === 0) return;
    const _0x1d97d5 = this["activeTool"], _0x591bac = this["activeSource"];
    this["clearTempEntity"](), this["resetSessionForContinuousDrawing"](), this["resetTrackedEntity"](), this["emit"]("draw:abort", _0x591bac === void 0 ? { "tool": _0x1d97d5 } : { "tool": _0x1d97d5, "source": _0x591bac });
  }
  ["onVertexClick"](_0x93c358) {
    const _0x2cf851 = this["toCartesian"](_0x93c358);
    if (_0x2cf851 === void 0 || this["activeTool"] === void 0) return;
    this["positions"]["push"](_0x2cf851), this["emitVertex"](_0x93c358), this["ensureTempEntity"]();
    (this["activeTool"] === "polygon" || this["activeTool"] === "polyline") && this["addVertexMarker"](_0x2cf851);
    if (this["activeTool"] === "point") {
      this["completeShape"]();
      return;
    }
    (this["activeTool"] === "rectangle" || this["activeTool"] === "circle") && this["positions"]["length"] >= 2 && this["completeShape"]();
  }
  ["onPreviewMove"](_0x51ff27) {
    if (this["positions"]["length"] === 0 || this["activeTool"] === void 0) return;
    const _0x11e82a = this["toCartesian"](_0x51ff27);
    if (_0x11e82a === void 0) return;
    this["previewPosition"] = _0x11e82a, this["emit"]("draw:move", { "tool": this["activeTool"], "coordinates": this["toLonLat"](_0x11e82a), "screenPos": { "x": _0x51ff27["x"], "y": _0x51ff27["y"] } });
  }
  ["finishMultiVertex"]() {
    const _0x51bed5 = this["activeTool"] === "polygon" ? 3 : 2;
    if (this["positions"]["length"] < _0x51bed5) return;
    this["completeShape"]();
  }
  ["finishMultiVertexViaDoubleClick"]() {
    this["positions"]["length"] >= 2 && this["positions"]["pop"](), this["finishMultiVertex"](), this["resetTrackedEntity"]();
  }
  ["onFreehandDown"](_0x948760) {
    this["freehandDragging"] = !![], this["positions"] = [];
    const _0x27ec3b = this["toCartesian"](_0x948760);
    if (_0x27ec3b === void 0) return;
    this["positions"]["push"](_0x27ec3b), this["emitVertex"](_0x948760), this["ensureTempEntity"]();
  }
  ["onFreehandMove"](_0x3419c3) {
    if (!this["freehandDragging"] || this["activeTool"] === void 0) return;
    const _0x28f9c4 = this["toCartesian"](_0x3419c3);
    if (_0x28f9c4 === void 0) return;
    this["positions"]["push"](_0x28f9c4), this["previewPosition"] = _0x28f9c4, this["emit"]("draw:move", { "tool": this["activeTool"], "coordinates": this["toLonLat"](_0x28f9c4), "screenPos": { "x": _0x3419c3["x"], "y": _0x3419c3["y"] } });
  }
  ["onFreehandUp"]() {
    this["freehandDragging"] = ![];
    if (this["positions"]["length"] >= 2) this["completeShape"]();
  }
  ["emitVertex"](_0x4d9cb6) {
    if (this["activeTool"] === void 0) return;
    const _0x1e95e6 = this["requireIndex"](this["positions"], this["positions"]["length"] - 1);
    this["emit"]("draw:vertex", { "tool": this["activeTool"], "index": this["positions"]["length"] - 1, "coordinates": this["toLonLat"](_0x1e95e6), "screenPos": { "x": _0x4d9cb6["x"], "y": _0x4d9cb6["y"] } });
  }
  ["completeShape"]() {
    if (this["activeTool"] === void 0 || this["positions"]["length"] === 0) return;
    const _0x1053c9 = this["buildShape"](this["activeTool"], this["positions"]), _0x5d1b88 = this["activeSource"] === void 0 ? _0x1053c9 : { ..._0x1053c9, "source": this["activeSource"] };
    this["shapes"]["set"](_0x5d1b88["id"], _0x5d1b88), this["clearTempEntity"](), this["resetSessionForContinuousDrawing"](), this["emit"]("draw:complete", { "shape": _0x5d1b88 });
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
        const _0x2a9fd2 = [...this["positions"], ...this["previewPosition"] ? [this["previewPosition"]] : []], _0x4e2081 = dedupePositions(_0x2a9fd2);
        return _0x4e2081["length"] >= 3 ? new PolygonHierarchy(_0x4e2081) : void 0;
      }, ![]), "material": Color["CYAN"]["withAlpha"](0.35) } });
      else {
        if (this["activeTool"] === "rectangle") this["tempFillEntity"] = this["viewer"]["entities"]["add"]({ "polygon": { "hierarchy": new CallbackProperty(() => {
          const _0x440825 = this["positions"][0], _0x1eb173 = this["previewPosition"];
          if (_0x440825 === void 0 || _0x1eb173 === void 0) return void 0;
          const _0x13b67f = this["computeRectangleCoordinates"](_0x440825, _0x1eb173);
          return new PolygonHierarchy(_0x13b67f["map"]((_0x45b43c) => this["toCartesianFromLonLat"](_0x45b43c)));
        }, ![]), "material": Color["CYAN"]["withAlpha"](0.35) } });
        else this["activeTool"] === "circle" && (this["tempFillEntity"] = this["viewer"]["entities"]["add"]({ "polygon": { "hierarchy": new CallbackProperty(() => {
          const _0x5139e6 = this["positions"][0], _0x1f921b = this["previewPosition"];
          if (_0x5139e6 === void 0 || _0x1f921b === void 0) return void 0;
          const _0x337ee6 = this["computeCircleRing"](_0x5139e6, _0x1f921b);
          return new PolygonHierarchy(_0x337ee6["map"]((_0x1dd7bc) => this["toCartesianFromLonLat"](_0x1dd7bc)));
        }, ![]), "material": Color["CYAN"]["withAlpha"](0.35) } }));
      }
    }
  }
  ["addVertexMarker"](_0x5c9d02) {
    this["tempVertexEntities"]["push"](this["viewer"]["entities"]["add"]({ "position": _0x5c9d02, "point": { "pixelSize": 6, "color": Color["YELLOW"], "outlineColor": Color["BLACK"], "outlineWidth": 1 } }));
  }
  ["buildPositionsCallback"](_0x70f37e) {
    return new CallbackProperty(() => {
      const _0x2226d5 = [...this["positions"], ...this["previewPosition"] ? [this["previewPosition"]] : []], _0x2e2517 = dedupePositions(_0x2226d5);
      return _0x2e2517["length"] >= _0x70f37e ? _0x2e2517 : void 0;
    }, ![]);
  }
  ["clearTempEntity"]() {
    this["tempEntity"] !== void 0 && (this["viewer"]["entities"]["remove"](this["tempEntity"]), this["tempEntity"] = void 0);
    this["tempFillEntity"] !== void 0 && (this["viewer"]["entities"]["remove"](this["tempFillEntity"]), this["tempFillEntity"] = void 0);
    for (const _0x17d6dd of this["tempVertexEntities"]) {
      this["viewer"]["entities"]["remove"](_0x17d6dd);
    }
    this["tempVertexEntities"] = [];
  }
  ["resetTrackedEntity"]() {
    this["viewer"]["trackedEntity"] !== void 0 && (this["viewer"]["trackedEntity"] = void 0);
  }
  ["suspendBuiltInDoubleClick"]() {
    if (this["builtInDoubleClickAction"] !== void 0) return;
    const _0x1fb7ab = this["viewer"]["screenSpaceEventHandler"], _0x273400 = _0x1fb7ab["getInputAction"](ScreenSpaceEventType["LEFT_DOUBLE_CLICK"]);
    if (_0x273400 === void 0) return;
    this["builtInDoubleClickAction"] = _0x273400, _0x1fb7ab["removeInputAction"](ScreenSpaceEventType["LEFT_DOUBLE_CLICK"]);
  }
  ["restoreBuiltInDoubleClick"]() {
    if (this["builtInDoubleClickAction"] === void 0) return;
    this["viewer"]["screenSpaceEventHandler"]["setInputAction"](this["builtInDoubleClickAction"], ScreenSpaceEventType["LEFT_DOUBLE_CLICK"]), this["builtInDoubleClickAction"] = void 0;
  }
  ["setCursor"](_0x545017) {
    this["viewer"]["scene"]["canvas"]["style"]["cursor"] = _0x545017;
  }
  ["lockCamera"]() {
    this["viewer"]["scene"]["screenSpaceCameraController"]["enableRotate"] = ![], this["viewer"]["scene"]["screenSpaceCameraController"]["enableTilt"] = ![];
  }
  ["unlockCamera"]() {
    this["viewer"]["scene"]["screenSpaceCameraController"]["enableRotate"] = !![], this["viewer"]["scene"]["screenSpaceCameraController"]["enableTilt"] = !![];
  }
  ["buildShape"](_0x4e07d7, _0x439395) {
    const _0x71b3d2 = crypto["randomUUID"](), _0x282d3b = Date["now"]();
    if (_0x4e07d7 === "point") {
      const _0x522379 = this["requireIndex"](_0x439395, 0), _0x1b56c1 = this["toLonLat"](_0x522379);
      return { "id": _0x71b3d2, "tool": _0x4e07d7, "entity": this["viewer"]["entities"]["add"]({ "position": _0x522379, "point": { "pixelSize": 8, "color": Color["CYAN"] } }), "positions": _0x439395, "coordinates": [_0x1b56c1], "geometry": { "type": "Point", "coordinates": _0x1b56c1 }, "createdAt": _0x282d3b };
    }
    if (_0x4e07d7 === "circle") return this["buildCircleShape"](_0x71b3d2, _0x439395, _0x282d3b);
    if (_0x4e07d7 === "rectangle") return this["buildRectangleShape"](_0x71b3d2, _0x439395, _0x282d3b);
    if (_0x4e07d7 === "polygon") return this["buildPolygonShape"](_0x71b3d2, _0x439395, _0x282d3b);
    return this["buildLineShape"](_0x71b3d2, _0x4e07d7, _0x439395, _0x282d3b);
  }
  ["buildLineShape"](_0x99b078, _0x5e80b6, _0x1ce2a2, _0x5df3bc) {
    const _0x993ff0 = _0x1ce2a2["map"]((_0x9166bf) => this["toLonLat"](_0x9166bf));
    return { "id": _0x99b078, "tool": _0x5e80b6, "entity": this["viewer"]["entities"]["add"]({ "polyline": { "positions": _0x1ce2a2, "width": 3, "material": Color["CYAN"] } }), "positions": _0x1ce2a2, "coordinates": _0x993ff0, "geometry": { "type": "LineString", "coordinates": _0x993ff0 }, "length": this["computeLength"](_0x1ce2a2), "createdAt": _0x5df3bc };
  }
  ["buildPolygonShape"](_0xb124fe, _0x5503f8, _0x469d9f) {
    const _0x4b0b70 = _0x5503f8["map"]((_0x1215f3) => this["toLonLat"](_0x1215f3)), _0x268ce6 = this["requireIndex"](_0x4b0b70, 0), _0x404924 = this["requireIndex"](_0x5503f8, 0), _0x1f8a52 = [..._0x4b0b70, _0x268ce6];
    return { "id": _0xb124fe, "tool": "polygon", "entity": this["viewer"]["entities"]["add"]({ "polygon": { "hierarchy": _0x5503f8, "material": Color["CYAN"]["withAlpha"](0.4) } }), "positions": _0x5503f8, "coordinates": _0x4b0b70, "geometry": { "type": "Polygon", "coordinates": [_0x1f8a52] }, "area": this["computeArea"](_0x4b0b70), "perimeter": this["computeLength"]([..._0x5503f8, _0x404924]), "createdAt": _0x469d9f };
  }
  ["buildRectangleShape"](_0x84ea49, _0x1a67c8, _0x5bf544) {
    const _0x14a195 = this["requireIndex"](_0x1a67c8, 0), _0xd64787 = this["requireIndex"](_0x1a67c8, 1), _0x3707d1 = this["computeRectangleCoordinates"](_0x14a195, _0xd64787), _0x39794d = _0x3707d1["map"]((_0x474003) => this["toCartesianFromLonLat"](_0x474003)), _0x53de81 = this["requireIndex"](_0x39794d, 0);
    return { "id": _0x84ea49, "tool": "rectangle", "entity": this["viewer"]["entities"]["add"]({ "polygon": { "hierarchy": _0x39794d, "material": Color["CYAN"]["withAlpha"](0.4) } }), "positions": _0x39794d, "coordinates": _0x3707d1, "geometry": { "type": "Polygon", "coordinates": [[..._0x3707d1, this["requireIndex"](_0x3707d1, 0)]] }, "area": this["computeArea"](_0x3707d1), "perimeter": this["computeLength"]([..._0x39794d, _0x53de81]), "createdAt": _0x5bf544 };
  }
  ["buildCircleShape"](_0x5b1e6e, _0x408d4f, _0x4687d3) {
    const _0x2f574e = this["requireIndex"](_0x408d4f, 0), _0x53019c = this["requireIndex"](_0x408d4f, 1), _0x273f28 = Cartesian3["distance"](_0x2f574e, _0x53019c), _0xd5b8a0 = this["computeCircleRing"](_0x2f574e, _0x53019c), _0x3900b3 = _0xd5b8a0["map"]((_0x4b9ed6) => this["toCartesianFromLonLat"](_0x4b9ed6)), _0x40d917 = this["requireIndex"](_0xd5b8a0, 0);
    return { "id": _0x5b1e6e, "tool": "circle", "entity": this["viewer"]["entities"]["add"]({ "polygon": { "hierarchy": _0x3900b3, "material": Color["CYAN"]["withAlpha"](0.4) } }), "positions": [_0x2f574e, _0x53019c], "coordinates": [this["toLonLat"](_0x2f574e)], "geometry": { "type": "Polygon", "coordinates": [[..._0xd5b8a0, _0x40d917]] }, "area": Math["PI"] * _0x273f28 * _0x273f28, "perimeter": 2 * Math["PI"] * _0x273f28, "radius": _0x273f28, "createdAt": _0x4687d3 };
  }
  ["sampleCircleRing"](_0x9e4d4d, _0x5d3ca0) {
    const _0x54cc35 = [];
    for (let _0x360dac = 0; _0x360dac < CIRCLE_SEGMENTS; _0x360dac++) {
      const _0x1ca9e8 = 2 * Math["PI"] * _0x360dac / CIRCLE_SEGMENTS, _0x3117c2 = _0x5d3ca0 * Math["cos"](_0x1ca9e8), _0x5eebc4 = _0x5d3ca0 * Math["sin"](_0x1ca9e8);
      _0x54cc35["push"](this["offsetMetersToLonLat"](_0x9e4d4d, _0x3117c2, _0x5eebc4));
    }
    return _0x54cc35;
  }
  ["computeRectangleCoordinates"](_0x31bc36, _0x5b33e3) {
    const _0x5b73fb = this["toLonLat"](_0x31bc36), _0x8b5338 = this["toLonLat"](_0x5b33e3), _0x4c1eb3 = Math["min"](_0x5b73fb[0], _0x8b5338[0]), _0x184093 = Math["max"](_0x5b73fb[0], _0x8b5338[0]), _0x3b9bca = Math["min"](_0x5b73fb[1], _0x8b5338[1]), _0x387195 = Math["max"](_0x5b73fb[1], _0x8b5338[1]);
    return [[_0x4c1eb3, _0x3b9bca], [_0x184093, _0x3b9bca], [_0x184093, _0x387195], [_0x4c1eb3, _0x387195]];
  }
  ["computeCircleRing"](_0x3c5d3b, _0x1a1163) {
    const _0x325da8 = Cartesian3["distance"](_0x3c5d3b, _0x1a1163), _0x5d79a2 = this["toLonLat"](_0x3c5d3b);
    return this["sampleCircleRing"](_0x5d79a2, _0x325da8);
  }
  ["computeArea"](_0x1d841c) {
    const _0x5c2024 = this["requireIndex"](_0x1d841c, 0)[1], _0x9ee2c9 = _0x1d841c["map"]((_0x37edf5) => this["projectMeters"](_0x37edf5, _0x5c2024));
    let _0x8d617e = 0;
    for (let _0x322a22 = 0; _0x322a22 < _0x9ee2c9["length"]; _0x322a22++) {
      const [_0x5083ab, _0x5d8922] = this["requireIndex"](_0x9ee2c9, _0x322a22), [_0x5225ab, _0x4ea567] = this["requireIndex"](_0x9ee2c9, (_0x322a22 + 1) % _0x9ee2c9["length"]);
      _0x8d617e += _0x5083ab * _0x4ea567 - _0x5225ab * _0x5d8922;
    }
    return Math["abs"](_0x8d617e) / 2;
  }
  ["computeLength"](_0x5035bc) {
    let _0x211eb1 = 0;
    for (let _0x3d2a8e = 0; _0x3d2a8e < _0x5035bc["length"] - 1; _0x3d2a8e++) {
      _0x211eb1 += Cartesian3["distance"](this["requireIndex"](_0x5035bc, _0x3d2a8e), this["requireIndex"](_0x5035bc, _0x3d2a8e + 1));
    }
    return _0x211eb1;
  }
  ["projectMeters"](_0x572b94, _0x3ce209) {
    const _0x1b732f = _0x3bd2fa["toRadians"](_0x572b94[0]) * Math["cos"](_0x3bd2fa["toRadians"](_0x3ce209)) * EARTH_RADIUS_METERS, _0x280ad9 = _0x3bd2fa["toRadians"](_0x572b94[1]) * EARTH_RADIUS_METERS;
    return [_0x1b732f, _0x280ad9];
  }
  ["offsetMetersToLonLat"](_0x4b476e, _0x4eafa9, _0xb72cf6) {
    const _0x453e6e = _0x4b476e[1] + _0x3bd2fa["toDegrees"](_0xb72cf6 / EARTH_RADIUS_METERS), _0x357988 = _0x4b476e[0] + _0x3bd2fa["toDegrees"](_0x4eafa9 / (EARTH_RADIUS_METERS * Math["cos"](_0x3bd2fa["toRadians"](_0x4b476e[1]))));
    return [_0x357988, _0x453e6e];
  }
  ["toCartesianFromLonLat"](_0x144603) {
    return Cartesian3["fromDegrees"](_0x144603[0], _0x144603[1]);
  }
  ["toCartesian"](_0x9a589a) {
    return this["viewer"]["camera"]["pickEllipsoid"](_0x9a589a, this["scene"]["globe"]["ellipsoid"]);
  }
  ["toLonLat"](_0x200071) {
    const _0x2e84c6 = Cartographic["fromCartesian"](_0x200071);
    return [_0x3bd2fa["toDegrees"](_0x2e84c6["longitude"]), _0x3bd2fa["toDegrees"](_0x2e84c6["latitude"])];
  }
  ["requireIndex"](_0x5c3f92, _0x5bda2e) {
    const _0x3242c4 = _0x5c3f92[_0x5bda2e];
    if (_0x3242c4 === void 0) throw new TucbsError("INTERNAL_INDEX_OUT_OF_RANGE", "DrawingManager: beklenen index (" + _0x5bda2e + ") dizide bulunamadi");
    return _0x3242c4;
  }
}
function trimSlash$1(_0x47035b) {
  return _0x47035b["replace"](/\/+$/, "");
}
function newClientId() {
  if (typeof crypto !== "undefined" && typeof crypto["randomUUID"] === "function") return crypto["randomUUID"]();
  return "00000000-0000-0000-0000-000000000001";
}
class AnalysisManager {
  constructor(_0x45455f) {
    __privateAdd(this, _AnalysisManager_instances);
    __privateAdd(this, _apiKey2);
    __privateSet(this, _apiKey2, _0x45455f["apiKey"] ?? ""), this["clientId"] = _0x45455f["clientId"] ?? newClientId();
  }
  ["configure"](_0x56e393) {
    if (_0x56e393["apiKey"] !== void 0) __privateSet(this, _apiKey2, _0x56e393["apiKey"]);
    if (_0x56e393["clientId"] !== void 0) this["clientId"] = _0x56e393["clientId"];
  }
  get ["configured"]() {
    return Boolean(getUcbpApiBase() && __privateGet(this, _apiKey2));
  }
  async ["buffer"](_0x76affe) {
    return __privateMethod(this, _AnalysisManager_instances, post_fn).call(this, "/vector/buffer", _0x76affe);
  }
  async ["intersection"](_0x2860c3) {
    return __privateMethod(this, _AnalysisManager_instances, post_fn).call(this, "/vector/intersection", _0x2860c3);
  }
  async ["boundary"](_0x1b6115) {
    return __privateMethod(this, _AnalysisManager_instances, post_fn).call(this, "/vector/boundary", _0x1b6115);
  }
  async ["clip"](_0x4ece8b) {
    return __privateMethod(this, _AnalysisManager_instances, post_fn).call(this, "/vector/clip", _0x4ece8b);
  }
  async ["difference"](_0x11eece) {
    return __privateMethod(this, _AnalysisManager_instances, post_fn).call(this, "/vector/difference", _0x11eece);
  }
  async ["subtract"](_0x346cde) {
    return __privateMethod(this, _AnalysisManager_instances, post_fn).call(this, "/vector/subtract", _0x346cde);
  }
  async ["union"](_0x1641ca) {
    return __privateMethod(this, _AnalysisManager_instances, post_fn).call(this, "/vector/union", _0x1641ca);
  }
  async ["wedgeBuffer"](_0x19a3f1) {
    return __privateMethod(this, _AnalysisManager_instances, post_fn).call(this, "/vector/wedge-buffer", _0x19a3f1);
  }
}
_apiKey2 = new WeakMap();
_AnalysisManager_instances = new WeakSet();
post_fn = async function(_0x58fed1, _0x46b710) {
  if (!__privateGet(this, _apiKey2)) throw new AnalysisRequestError("ANALYSIS_API_KEY_MISSING", "apiKey tanımlı değil (tucbs-map apiKey).");
  const _0x4e7330 = { "clientId": this["clientId"], "object": _0x46b710 }, _0x340064 = "" + trimSlash$1(getUcbpApiBase()) + _0x58fed1;
  let _0x50258e;
  try {
    _0x50258e = await fetch(_0x340064, { "method": "POST", "headers": { "Content-Type": "application/json", "X-API-Key": __privateGet(this, _apiKey2) }, "body": JSON["stringify"](_0x4e7330) });
  } catch (_0x2575ec) {
    const _0x4e9f90 = _0x2575ec instanceof Error ? _0x2575ec["message"] : String(_0x2575ec);
    throw new AnalysisRequestError("ANALYSIS_NETWORK_ERROR", "Ağ hatası: " + _0x4e9f90);
  }
  const _0x1f6baf = await _0x50258e["json"]()["catch"](() => null);
  if (!_0x50258e["ok"]) {
    const _0x4d5e85 = (_0x1f6baf == null ? void 0 : _0x1f6baf["mesaj"]) || (_0x1f6baf == null ? void 0 : _0x1f6baf["message"]) || "İstek başarısız (HTTP " + _0x50258e["status"] + ")";
    throw new AnalysisRequestError("ANALYSIS_REQUEST_FAILED", _0x4d5e85);
  }
  if ((_0x1f6baf == null ? void 0 : _0x1f6baf["isSuccess"]) === ![] || (_0x1f6baf == null ? void 0 : _0x1f6baf["success"]) === ![]) throw new AnalysisRequestError("ANALYSIS_UNSUCCESSFUL", _0x1f6baf["mesaj"] || _0x1f6baf["message"] || "Analiz başarısız.");
  const _0x49de61 = _0x1f6baf == null ? void 0 : _0x1f6baf["object"];
  if (!(_0x49de61 == null ? void 0 : _0x49de61["geojson"])) throw new AnalysisRequestError("ANALYSIS_RESPONSE_MISSING_GEOJSON", "Yanıtta geojson yok.");
  return _0x49de61;
};
const FALLBACK_IMAGE_FILENAME = "blue-marble-fallback.jpg", FALLBACK_WORLD_IMAGE = new URL(FALLBACK_IMAGE_FILENAME, import.meta.url)["href"], FALLBACK_DELAY_MS = 3e3, BASEMAP_ERROR_RETRY_LIMIT = 2, BASEMAP_UNAVAILABLE_DELAY_MS = 1e4;
function watchBasemap(_0x56a4eb, _0x53f557, _0x35f077, _0x1d3dce, _0x3b9664, _0x50117c) {
  let _0x290457 = ![], _0x3915fc = ![];
  const _0x508eae = window["setTimeout"](() => {
    if (_0x290457 || !_0x53f557["isCurrentGeneration"](_0x35f077)) return;
    _0x53f557["ensureFallbackBasemap"]();
  }, FALLBACK_DELAY_MS), _0x1a2266 = window["setTimeout"](() => {
    if (_0x290457 || !_0x53f557["isCurrentGeneration"](_0x35f077)) return;
    _0x290457 = !![], _0x2359ed(), _0x53f557["setStatus"]("unavailable"), _0x53f557["removeBasemapLayer"](), _0x53f557["ensureFallbackBasemap"](), _0x53f557["emit"]("basemap:error", { "id": _0x1d3dce });
  }, BASEMAP_UNAVAILABLE_DELAY_MS), _0x2359ed = () => {
    _0x3915fc = !![], window["clearTimeout"](_0x508eae), window["clearTimeout"](_0x1a2266), _0x50117c["errorEvent"]["removeEventListener"](_0x20523d);
  }, _0x20523d = (_0xc88e3b) => {
    if (_0x290457) return;
    if (!_0x53f557["isCurrentGeneration"](_0x35f077)) return;
    if (!_0x56a4eb["imageryLayers"]["contains"](_0x3b9664)) return;
    if (_0xc88e3b["timesRetried"] < BASEMAP_ERROR_RETRY_LIMIT) {
      _0xc88e3b["retry"] = !![];
      return;
    }
    _0x290457 = !![], _0x2359ed(), _0x53f557["setStatus"]("unavailable"), _0x53f557["removeBasemapLayer"](), _0x53f557["ensureFallbackBasemap"](), _0x53f557["emit"]("basemap:error", { "id": _0x1d3dce });
  }, _0x422d60 = _0x50117c["requestImage"]["bind"](_0x50117c);
  _0x50117c["requestImage"] = (_0x1eb74e, _0x3b1deb, _0x1e72e8, _0x1e1825) => {
    const _0x409a06 = _0x422d60(_0x1eb74e, _0x3b1deb, _0x1e72e8, _0x1e1825);
    if (_0x409a06 && !_0x290457 && !_0x3915fc) _0x409a06["then"](_0x3ef1f8, () => void 0);
    return _0x409a06;
  };
  const _0x3ef1f8 = () => {
    if (_0x290457 || _0x3915fc) return;
    if (!_0x53f557["isCurrentGeneration"](_0x35f077)) {
      _0x2359ed();
      return;
    }
    _0x290457 = !![], _0x2359ed(), _0x53f557["setStatus"]("ready"), _0x53f557["clearFallbackBasemap"](), _0x53f557["emit"]("basemap:recovered", { "id": _0x1d3dce });
  };
  return _0x50117c["errorEvent"]["addEventListener"](_0x20523d), _0x2359ed;
}
const BASEMAP_LAYER_ID = "__tucbs_basemap__";
function trackProviderRequests(_0x3fc08e) {
  const _0x33e361 = /* @__PURE__ */ new Set(), _0x40670a = _0x3fc08e["requestImage"]["bind"](_0x3fc08e);
  return _0x3fc08e["requestImage"] = (_0xac1a3a, _0x10bf6b, _0x46050b, _0x4bf304) => {
    if (_0x4bf304) _0x33e361["add"](_0x4bf304);
    const _0x516975 = _0x40670a(_0xac1a3a, _0x10bf6b, _0x46050b, _0x4bf304);
    if (_0x4bf304 && _0x516975) {
      const _0x4b202e = () => {
        _0x33e361["delete"](_0x4bf304);
      };
      _0x516975["then"](_0x4b202e, _0x4b202e);
    }
    return _0x516975;
  }, () => {
    for (const _0xc3e8cf of _0x33e361) _0xc3e8cf["cancel"]();
    _0x33e361["clear"]();
  };
}
class BasemapController {
  constructor(_0x5c74d3, _0x5964ba) {
    this["_basemapGeneration"] = 0, this["_basemapStatus"] = "ready", this["_fallbackBasemapLayer"] = null, this["viewer"] = _0x5c74d3, this["deps"] = _0x5964ba;
  }
  get ["status"]() {
    return this["_basemapStatus"];
  }
  get ["currentBasemapId"]() {
    return this["_currentBasemapId"];
  }
  ["set"](_0x2aeee3) {
    var _a2, _b;
    (_a2 = this["_stopBasemapWatch"]) == null ? void 0 : _a2.call(this), (_b = this["_cancelBasemapRequests"]) == null ? void 0 : _b.call(this), this["_cancelBasemapRequests"] = void 0, this["deps"]["removeBasemapLayers"](), this["clearFallbackBasemap"]();
    const _0xcb545a = ++this["_basemapGeneration"];
    if (_0x2aeee3 === null || _0x2aeee3 === void 0) {
      this["_basemapStatus"] = "ready", this["_currentBasemapId"] = void 0;
      return;
    }
    const _0xb9eda8 = typeof _0x2aeee3 === "string" ? { "id": _0x2aeee3 } : _0x2aeee3;
    if (!_0xb9eda8["id"]) {
      this["_basemapStatus"] = "ready", this["_currentBasemapId"] = void 0;
      return;
    }
    this["_basemapStatus"] = "loading", this["_currentBasemapId"] = _0xb9eda8["id"];
    const _0x5d4f39 = this["resolveBasemapUrl"](_0xb9eda8), _0x37ee65 = new UrlTemplateImageryProvider({ "url": _0x5d4f39 }), _0x495d56 = trackProviderRequests(_0x37ee65);
    this["_cancelBasemapRequests"] = _0x495d56;
    const _0x47c04e = this["viewer"]["imageryLayers"]["addImageryProvider"](_0x37ee65, 0);
    this["deps"]["addBasemapImageryLayer"](BASEMAP_LAYER_ID, _0xb9eda8["id"], _0x47c04e), this["_stopBasemapWatch"] = watchBasemap(this["viewer"], { "ensureFallbackBasemap": () => this["ensureFallbackBasemap"](), "clearFallbackBasemap": () => this["clearFallbackBasemap"](), "removeBasemapLayer": () => {
      _0x495d56(), this["deps"]["removeLayer"](BASEMAP_LAYER_ID);
    }, "emit": (_0x216be1, _0x3c7454) => this["deps"]["emit"](_0x216be1, _0x3c7454), "setStatus": (_0x5cbd7c) => {
      this["_basemapStatus"] = _0x5cbd7c;
    }, "isCurrentGeneration": (_0xe37080) => _0xe37080 === this["_basemapGeneration"] }, _0xcb545a, _0xb9eda8["id"], _0x47c04e, _0x37ee65);
  }
  ["stop"]() {
    var _a2, _b;
    (_a2 = this["_stopBasemapWatch"]) == null ? void 0 : _a2.call(this), (_b = this["_cancelBasemapRequests"]) == null ? void 0 : _b.call(this), this["_cancelBasemapRequests"] = void 0;
  }
  ["addFallbackBasemap"]() {
    const _0x422a92 = new SingleTileImageryProvider({ "url": FALLBACK_WORLD_IMAGE, "tileWidth": 5400, "tileHeight": 2700, "credit": "NASA Earth Observatory (Blue Marble)" }), _0x4eb8fa = this["viewer"]["imageryLayers"]["addImageryProvider"](_0x422a92, 0);
    this["_fallbackBasemapLayer"] = _0x4eb8fa;
  }
  ["ensureFallbackBasemap"]() {
    if (this["_fallbackBasemapLayer"] !== null) return;
    try {
      this["addFallbackBasemap"]();
    } catch (_0x176539) {
      console["warn"]("[tucbs-core] Basemap yedek goruntusu eklenemedi:", _0x176539);
    }
  }
  ["clearFallbackBasemap"]() {
    this["_fallbackBasemapLayer"] !== null && (this["viewer"]["imageryLayers"]["remove"](this["_fallbackBasemapLayer"], !![]), this["_fallbackBasemapLayer"] = null);
  }
  ["resolveBasemapUrl"](_0x40ce14) {
    const _0x5d464d = (_0x43a7ad) => {
      const _0x260a4f = this["deps"]["getProxyBase"](), _0x3dd832 = _0x260a4f + "https://atlas.harita.gov.tr/" + _0x43a7ad + "/{z}/{x}/{y}.png";
      return this["appendTucbsApiKeyQuery"](_0x3dd832);
    };
    switch (_0x40ce14["id"]) {
      case "hgm-temel":
        return _0x5d464d("temel");
      case "hgm-ortofoto":
        return _0x5d464d("ortofotoservis");
      case "hgm-siyasi":
        return _0x5d464d("siyasi");
      case "hgm-yukseklik":
        return _0x5d464d("yukseklik");
      default:
        return _0x40ce14["id"];
    }
  }
  ["appendTucbsApiKeyQuery"](_0x29edeb) {
    const _0x37c29c = this["deps"]["getApiKey"]();
    if (!_0x37c29c) return _0x29edeb;
    const _0x2e7bf4 = _0x29edeb["includes"]("?") ? "&" : "?";
    return "" + _0x29edeb + _0x2e7bf4 + "tucbsapikey=" + encodeURIComponent(_0x37c29c);
  }
}
function nextFrame(_0x47cb3f) {
  return new Promise((_0x3cac26) => {
    const _0x1d2931 = () => {
      _0x47cb3f["scene"]["postRender"]["removeEventListener"](_0x1d2931), _0x3cac26();
    };
    _0x47cb3f["scene"]["postRender"]["addEventListener"](_0x1d2931), _0x47cb3f["scene"]["requestRender"]();
  });
}
async function captureCanvasBlob(_0x4ac4e7, _0x375ef7, _0x36c137) {
  const _0x3a3744 = _0x4ac4e7["canvas"];
  if (typeof _0x3a3744["toBlob"] === "function") return new Promise((_0x5acce0, _0x5a426a) => {
    _0x3a3744["toBlob"]((_0x2fc4a7) => _0x2fc4a7 ? _0x5acce0(_0x2fc4a7) : _0x5a426a(new Error("canvas.toBlob basarisiz oldu")), _0x375ef7, _0x36c137);
  });
  const _0x45129d = _0x3a3744["toDataURL"](_0x375ef7, _0x36c137), _0x4986ce = _0x45129d["split"](",")[1] ?? "", _0x556c7c = atob(_0x4986ce), _0x462df5 = new Uint8Array(_0x556c7c["length"]);
  for (let _0x1fe10e = 0; _0x1fe10e < _0x556c7c["length"]; _0x1fe10e++) _0x462df5[_0x1fe10e] = _0x556c7c["charCodeAt"](_0x1fe10e);
  return new Blob([_0x462df5], { "type": _0x375ef7 });
}
function measureGroundMetersPerPixel(_0xcc0985) {
  const _0x6d4cc5 = _0xcc0985["scene"], _0x2df1b5 = _0xcc0985["camera"], _0x18b2b5 = _0xcc0985["canvas"], _0x26c618 = _0x18b2b5["clientWidth"] / 2, _0x5e78ad = _0x18b2b5["clientHeight"] / 2, _0x1fe4ea = _0x2df1b5["getPickRay"](new Cartesian2(_0x26c618 - 1, _0x5e78ad)), _0x237fc0 = _0x2df1b5["getPickRay"](new Cartesian2(_0x26c618 + 1, _0x5e78ad));
  if (!_0x1fe4ea || !_0x237fc0) return null;
  const _0x50abc6 = _0x6d4cc5["globe"]["pick"](_0x1fe4ea, _0x6d4cc5), _0x30237b = _0x6d4cc5["globe"]["pick"](_0x237fc0, _0x6d4cc5);
  if (!_0x50abc6 || !_0x30237b) return null;
  return Cartesian3["distance"](_0x50abc6, _0x30237b) / 2;
}
function toOrientedDestination(_0x21b4f0) {
  return { "destination": Cartesian3["fromDegrees"](_0x21b4f0["longitude"], _0x21b4f0["latitude"], _0x21b4f0["height"]), "orientation": { "heading": _0x3bd2fa["toRadians"](_0x21b4f0["heading"] ?? 0), "pitch": _0x3bd2fa["toRadians"](_0x21b4f0["pitch"] ?? -90), "roll": _0x3bd2fa["toRadians"](_0x21b4f0["roll"] ?? 0) } };
}
function setView(_0x52aea7, _0x482b9a) {
  _0x52aea7["camera"]["setView"](toOrientedDestination(_0x482b9a));
}
function setExtent(_0x1406a1, _0xe99dff) {
  _0x1406a1["camera"]["setView"]({ "destination": Rectangle["fromDegrees"](_0xe99dff["west"], _0xe99dff["south"], _0xe99dff["east"], _0xe99dff["north"]) });
}
function flyTo(_0x45282f, _0x5a2a81) {
  _0x45282f["camera"]["flyTo"](toOrientedDestination(_0x5a2a81));
}
function zoomTo(_0x5a8f22, _0x25fa43, _0x52f1fa, _0x41ff1f) {
  _0x5a8f22["camera"]["setView"]({ "destination": Cartesian3["fromDegrees"](_0x25fa43, _0x52f1fa, _0x41ff1f) });
}
async function zoomToLayer(_0x3b56fc, _0x33a189) {
  return _0x3b56fc["zoomTo"](_0x33a189["cesiumObject"], new HeadingPitchRange(0, -_0x3bd2fa["PI_OVER_TWO"], 0));
}
function trimSlash(_0x52f705) {
  return _0x52f705["replace"](/\/+$/, "");
}
async function validateApiKey(_0x28ed46, _0x37a263 = getUcbpApiBase()) {
  if (!_0x28ed46) return;
  const _0x2452f9 = trimSlash(_0x37a263) + "/auth/validate";
  let _0x30d832;
  try {
    _0x30d832 = await fetch(_0x2452f9, { "method": "GET", "headers": { "X-API-Key": _0x28ed46 } });
  } catch (_0x38913b) {
    const _0x5105b7 = _0x38913b instanceof Error ? _0x38913b["message"] : String(_0x38913b);
    throw new ApiKeyValidationError(_0x5105b7);
  }
  if (!_0x30d832["ok"]) {
    let _0x4b6e41, _0x2c738f, _0x57bcbe, _0x3fbb8a;
    try {
      const _0x391d13 = await _0x30d832["json"]();
      _0x4b6e41 = _0x391d13["title"], _0x2c738f = _0x391d13["message"] || _0x391d13["mesaj"], _0x57bcbe = _0x391d13["reason"], _0x3fbb8a = _0x391d13["detail"];
    } catch {
    }
    const _0x5b65ed = {};
    if (_0x4b6e41 !== void 0) _0x5b65ed["title"] = _0x4b6e41;
    if (_0x57bcbe !== void 0) _0x5b65ed["reason"] = _0x57bcbe;
    if (_0x3fbb8a !== void 0) _0x5b65ed["detail"] = _0x3fbb8a;
    throw new ApiKeyValidationError(_0x2c738f || "HTTP " + _0x30d832["status"], _0x5b65ed);
  }
}
async function ensureEffectiveApiKeyValid(_0x579787, _0x2afeb0) {
  const _0x1cc8c2 = _0x579787 || getGlobalApiKey();
  if (!_0x1cc8c2) throw new ApiKeyValidationError("Haritayı görüntülemek için geçerli bir apiKey gereklidir.", { "title": "API Anahtarı Eksik", "reason": "missing-key", "code": "API_KEY_MISSING" });
  await validateApiKey(_0x1cc8c2, _0x2afeb0);
}
const DRAWING_LAYER_ID = "__tucbs_drawing_layer__", DRAWING_LAYER_TITLE = "Çizim Katmanı", MEASURE_LAYER_ID = "__tucbs_measure_layer__", MEASURE_LAYER_TITLE = "Ölçü Katmanı", MAX_ZOOM_DISTANCE_METERS = 25e6, MAX_ZOOM_OUT_SCALE_DENOMINATOR = 25e6, MAX_ZOOM_SCALE_DENOMINATOR = 100, MIN_ZOOM_DISTANCE_METERS = 10, DEFAULT_INITIAL_EXTENT = { "west": 22.94, "south": 34.05, "east": 47.39, "north": 42.7 };
let Map$1 = (_a = class {
  constructor(_0x1e362b, _0x40f484 = {}) {
    __privateAdd(this, _unregisterApiKeyRefresh);
    __privateAdd(this, _removeLodSeamGuard);
    __privateAdd(this, _removeMinZoomScale);
    __privateAdd(this, _removeScaleWheelZoom);
    __privateAdd(this, _apiKey3);
    ensureCesiumRuntime();
    const _0x1c769d = document["createElement"]("div");
    _0x1c769d["style"]["display"] = "none", this["viewer"] = new Viewer(_0x1e362b, this["buildViewerOptions"](_0x40f484, _0x1c769d)), this["viewer"]["scene"]["globe"]["baseColor"] = Color["fromCssColorString"]("#a3c6e0"), this["viewer"]["scene"]["screenSpaceCameraController"]["maximumZoomDistance"] = MAX_ZOOM_DISTANCE_METERS, this["viewer"]["scene"]["screenSpaceCameraController"]["minimumZoomDistance"] = MIN_ZOOM_DISTANCE_METERS;
    const _0x1097d7 = _0x40f484["apiKey"] ?? getGlobalApiKey();
    __privateSet(this, _apiKey3, _0x1097d7), this["layerManager"] = new LayerManager(this["viewer"]), this["selectionHighlight"] = new SelectionHighlight(this["viewer"]), this["layerManager"]["configure"]({ ..._0x1097d7 !== void 0 && { "apiKey": _0x1097d7 }, ..._0x40f484["trustedApiKeyHosts"] !== void 0 && { "trustedApiKeyHosts": _0x40f484["trustedApiKeyHosts"] }, ..._0x40f484["apiKeyDiscoveryUrl"] !== void 0 && { "apiKeyDiscoveryUrl": _0x40f484["apiKeyDiscoveryUrl"] } }), this["interactionManager"] = new InteractionManager(this["viewer"]), this["drawingManager"] = new DrawingManager(this["viewer"], this["interactionManager"]), this["analysisManager"] = new AnalysisManager({ "apiKey": _0x1097d7 ?? "" }), this["basemapController"] = new BasemapController(this["viewer"], { "removeBasemapLayers": () => this["layerManager"]["_removeBasemapLayers"](), "addBasemapImageryLayer": (_0x42d625, _0x2b94de, _0x1545df) => this["layerManager"]["_addBasemapImageryLayer"](_0x42d625, _0x2b94de, _0x1545df), "removeLayer": (_0x17a092) => this["layerManager"]["removeLayer"](_0x17a092), "emit": (_0x34813d, _0x4c273b) => this["layerManager"]["emit"](_0x34813d, _0x4c273b), "getProxyBase": () => getProxyBase(), "getApiKey": () => __privateGet(this, _apiKey3) }), _0x40f484["apiKey"] === void 0 && this["registerGlobalApiKeyRotation"](_0x1097d7), this["wireShapeSource"]("draw", DRAWING_LAYER_ID, DRAWING_LAYER_TITLE, (_0x2fd68d, _0x4761a5, _0x2066a3) => this["layerManager"]["_addDrawnShape"](_0x2fd68d, _0x4761a5, _0x2066a3)), this["wireShapeSource"]("measure", MEASURE_LAYER_ID, MEASURE_LAYER_TITLE, (_0x52f514, _0x481c6b, _0x501020) => this["layerManager"]["_addMeasuredShape"](_0x52f514, _0x481c6b, _0x501020)), _0x40f484["camera"] !== void 0 ? this["setView"](_0x40f484["camera"]) : this["setExtent"](_0x40f484["initialExtent"] ?? DEFAULT_INITIAL_EXTENT), __privateSet(this, _removeLodSeamGuard, installLodSeamGuard(this["viewer"])), __privateSet(this, _removeMinZoomScale, installMinZoomScale(this["viewer"], MAX_ZOOM_SCALE_DENOMINATOR, MAX_ZOOM_OUT_SCALE_DENOMINATOR)), __privateSet(this, _removeScaleWheelZoom, installScaleWheelZoom(this["viewer"])), this["setBasemap"](_0x40f484["basemap"]);
  }
  async ["ensureApiKeyValid"]() {
    await validateApiKey(__privateGet(this, _apiKey3) ?? "", getUcbpApiBase());
  }
  async ["runBuffer"](_0x37b9b2, _0xb7e513) {
    const _0x223302 = await this["analysisManager"]["buffer"](_0x37b9b2), _0x8bd43 = (_0xb7e513 == null ? void 0 : _0xb7e513["id"]) ?? "buffer-" + Date["now"](), _0x3e5797 = (_0xb7e513 == null ? void 0 : _0xb7e513["title"]) ?? "Tampon sonucu (" + _0x37b9b2["distanceM"] + "m)";
    this["layerManager"]["markAnalysisResult"](_0x8bd43);
    const _0x1eccc9 = await this["layerManager"]["add"]("GEOJSON", { "id": _0x8bd43, "title": _0x3e5797, "data": _0x223302["geojson"], "layerType": "GEOJSON", "clampToGround": !![] });
    return _0x1eccc9;
  }
  async ["runIntersection"](_0x4b6775, _0x37963d) {
    const _0x361055 = await this["analysisManager"]["intersection"](_0x4b6775), _0x1dba06 = (_0x37963d == null ? void 0 : _0x37963d["id"]) ?? "intersection-" + Date["now"](), _0x55d4d8 = (_0x37963d == null ? void 0 : _0x37963d["title"]) ?? "Kesişim sonucu";
    this["layerManager"]["markAnalysisResult"](_0x1dba06);
    const _0x15d151 = await this["layerManager"]["add"]("GEOJSON", { "id": _0x1dba06, "title": _0x55d4d8, "data": _0x361055["geojson"], "layerType": "GEOJSON", "clampToGround": !![] });
    return _0x15d151;
  }
  async ["runBoundary"](_0x34fffb, _0x124802) {
    const _0x4df1d5 = await this["analysisManager"]["boundary"](_0x34fffb);
    return this["addAnalysisGeoJson"]((_0x124802 == null ? void 0 : _0x124802["id"]) ?? "boundary-" + Date["now"](), (_0x124802 == null ? void 0 : _0x124802["title"]) ?? "Sınır sonucu", _0x4df1d5["geojson"]);
  }
  async ["runClip"](_0x30ccc9, _0x4c3ad6) {
    const _0x1c963f = await this["analysisManager"]["clip"](_0x30ccc9);
    return this["addAnalysisGeoJson"]((_0x4c3ad6 == null ? void 0 : _0x4c3ad6["id"]) ?? "clip-" + Date["now"](), (_0x4c3ad6 == null ? void 0 : _0x4c3ad6["title"]) ?? "Kırpma sonucu", _0x1c963f["geojson"]);
  }
  async ["runDifference"](_0x48d97e, _0x1e2e80) {
    const _0x4fefb7 = await this["analysisManager"]["difference"](_0x48d97e);
    return this["addAnalysisGeoJson"]((_0x1e2e80 == null ? void 0 : _0x1e2e80["id"]) ?? "difference-" + Date["now"](), (_0x1e2e80 == null ? void 0 : _0x1e2e80["title"]) ?? "Fark sonucu", _0x4fefb7["geojson"]);
  }
  async ["runSubtract"](_0x4fc5cc, _0x146987) {
    const _0x2b4cd4 = await this["analysisManager"]["subtract"](_0x4fc5cc);
    return this["addAnalysisGeoJson"]((_0x146987 == null ? void 0 : _0x146987["id"]) ?? "subtract-" + Date["now"](), (_0x146987 == null ? void 0 : _0x146987["title"]) ?? "Çıkarma sonucu", _0x2b4cd4["geojson"]);
  }
  async ["runUnion"](_0x4075f1, _0x5985d5) {
    const _0x590e51 = await this["analysisManager"]["union"](_0x4075f1);
    return this["addAnalysisGeoJson"]((_0x5985d5 == null ? void 0 : _0x5985d5["id"]) ?? "union-" + Date["now"](), (_0x5985d5 == null ? void 0 : _0x5985d5["title"]) ?? "Birleştir sonucu", _0x590e51["geojson"]);
  }
  async ["runWedgeBuffer"](_0xe0b720, _0x4e480d) {
    const _0x22e34c = await this["analysisManager"]["wedgeBuffer"](_0xe0b720);
    return this["addAnalysisGeoJson"]((_0x4e480d == null ? void 0 : _0x4e480d["id"]) ?? "wedge-" + Date["now"](), (_0x4e480d == null ? void 0 : _0x4e480d["title"]) ?? "Kama tampon sonucu", _0x22e34c["geojson"]);
  }
  async ["addAnalysisGeoJson"](_0x1aa6e2, _0x5d3f68, _0x430c7c) {
    return this["layerManager"]["markAnalysisResult"](_0x1aa6e2), this["layerManager"]["add"]("GEOJSON", { "id": _0x1aa6e2, "title": _0x5d3f68, "data": _0x430c7c, "layerType": "GEOJSON", "clampToGround": !![] });
  }
  ["setView"](_0x1b531b) {
    setView(this["viewer"], _0x1b531b);
  }
  ["setExtent"](_0x118634) {
    setExtent(this["viewer"], _0x118634);
  }
  ["flyTo"](_0xd4fd29) {
    flyTo(this["viewer"], _0xd4fd29);
  }
  ["zoomTo"](_0x107443, _0x42785f, _0x50deaf) {
    zoomTo(this["viewer"], _0x107443, _0x42785f, _0x50deaf);
  }
  ["zoomInStep"]() {
    scaleZoomStep(this["viewer"], 1);
  }
  ["zoomOutStep"]() {
    scaleZoomStep(this["viewer"], -1);
  }
  async ["zoomToLayer"](_0x394e8d) {
    return zoomToLayer(this["viewer"], _0x394e8d);
  }
  ["dropMarker"](_0x386321, _0x3323b9, _0x3b7e4c, _0x42cffb = {}) {
    this["clearMarker"](), this["_removeMarker"] = createMarkerOverlay(this["viewer"], _0x386321, _0x3323b9, _0x3b7e4c, _0x42cffb);
  }
  ["clearMarker"]() {
    var _a2;
    (_a2 = this["_removeMarker"]) == null ? void 0 : _a2.call(this), this["_removeMarker"] = void 0;
  }
  get ["basemapStatus"]() {
    return this["basemapController"]["status"];
  }
  ["setBasemap"](_0x6c888a) {
    this["basemapController"]["set"](_0x6c888a);
  }
  ["setMode"](_0x374afe) {
    _0x374afe === "2D" ? this["viewer"]["scene"]["morphTo2D"](0) : this["viewer"]["scene"]["morphTo3D"](0);
  }
  ["setQuality"](_0x4cc977) {
    const _0x37ea61 = Math["min"](100, Math["max"](0, _0x4cc977));
    this["viewer"]["resolutionScale"] = Math["max"](0.1, _0x37ea61 / 100);
  }
  ["resize"]() {
    this["viewer"]["resize"]();
  }
  async ["exportJPEG"](_0x568b7e = "tucbs-harita", _0x4e992b = 0.92) {
    const _0x151689 = await this["captureScreenshotBlob"](_0x4e992b);
    triggerDownload(_0x151689, _0x568b7e + "-" + Date["now"]() + ".jpg");
  }
  async ["captureScreenshotBlob"](_0x7b79de = 0.92) {
    return await nextFrame(this["viewer"]), captureCanvasBlob(this["viewer"], "image/jpeg", _0x7b79de);
  }
  ["measureGroundMetersPerPixel"]() {
    return measureGroundMetersPerPixel(this["viewer"]);
  }
  ["buildViewerOptions"](_0x242f07, _0x4bb1c4) {
    return { "timeline": _0x242f07["timeline"] ?? ![], "animation": _0x242f07["animation"] ?? ![], "baseLayerPicker": _0x242f07["baseLayerPicker"] ?? ![], "baseLayer": ![], "geocoder": _0x242f07["geocoder"] ?? ![], "homeButton": _0x242f07["homeButton"] ?? ![], "sceneModePicker": _0x242f07["sceneModePicker"] ?? ![], "navigationHelpButton": _0x242f07["navigationHelpButton"] ?? ![], "infoBox": _0x242f07["infoBox"] ?? ![], "selectionIndicator": _0x242f07["selectionIndicator"] ?? ![], "shadows": _0x242f07["shadows"] ?? ![], "shouldAnimate": _0x242f07["shouldAnimate"] ?? ![], "fullscreenButton": _0x242f07["fullscreenButton"] ?? ![], "creditContainer": _0x4bb1c4, ..._0x242f07["cesiumOptions"] };
  }
  ["registerGlobalApiKeyRotation"](_0x1e6ae4) {
    _0x1e6ae4 !== void 0 && console["info"]("[@tucbs/core] Bu Map instance'i configureTucbs() global apiKey'ini kullaniyor (kendi apiKey attribute'u/options'u verilmedi). Farkli bir anahtar gerekiyorsa Map/component'e acikca apiKey verin."), __privateSet(this, _unregisterApiKeyRefresh, registerApiKeyRefresh(() => {
      const _0x20e178 = getGlobalApiKey();
      __privateSet(this, _apiKey3, _0x20e178), this["layerManager"]["configure"]({ ..._0x20e178 !== void 0 && { "apiKey": _0x20e178 } }), this["analysisManager"]["configure"]({ "apiKey": _0x20e178 ?? "" }), void this["ensureApiKeyValid"]()["catch"]((_0xd06764) => {
        console["error"]("[@tucbs/core] apiKey rotasyon validate basarisiz:", _0xd06764);
      }), this["basemapController"]["currentBasemapId"] !== void 0 && this["setBasemap"](this["basemapController"]["currentBasemapId"]);
    }));
  }
  ["wireShapeSource"](_0xc6f4e, _0x3801c5, _0x3f78e2, _0x49eb2a) {
    this["drawingManager"]["on"]("draw:complete", ({ shape: _0x38d0eb }) => {
      if (_0x38d0eb["source"] !== _0xc6f4e) return;
      void _0x49eb2a(_0x3801c5, _0x3f78e2, _0x38d0eb);
    }), this["drawingManager"]["on"]("draw:remove", ({ shape: _0x226ccc }) => {
      if (_0x226ccc["source"] !== _0xc6f4e) return;
      this["layerManager"]["_removeDrawnShape"](_0x3801c5, _0x226ccc["entity"]);
    });
  }
  ["showSelectionHighlight"](_0x9f1740) {
    this["selectionHighlight"]["show"](_0x9f1740);
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
