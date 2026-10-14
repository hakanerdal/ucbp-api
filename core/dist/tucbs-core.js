var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _apiKey, _apiKey2, _AnalysisManager_instances, post_fn, _unregisterApiKeyRefresh, _removeLodSeamGuard, _removeMinZoomScale, _removeScaleWheelZoom, _apiKey3, _a;
import { Math as _0x494c90, SceneMode, EllipsoidTerrainProvider, Cartesian2, Cartesian3, CameraEventType, Ellipsoid, JulianDate, Cartographic, ConstantProperty, PropertyBag, PolygonHierarchy, ColorMaterialProperty, Color, CallbackProperty, HeadingPitchRange, BoundingSphere, Entity, PolylineGraphics, ConstantPositionProperty, PointGraphics, CustomDataSource, GeoJsonDataSource, KmlDataSource, Rectangle, WebMapServiceImageryProvider, GetFeatureInfoFormat, Resource, WebMapTileServiceImageryProvider, WebMercatorTilingScheme, ImageryLayer, SingleTileImageryProvider, HeightReference, ScreenSpaceEventHandler, ScreenSpaceEventType, UrlTemplateImageryProvider, Viewer } from "cesium";
const MAX_LEVEL = 24, EARTH_RADIUS = 6371e3, CORNER_SAFETY = 1.15;
function cornerDistanceRatio(_0xb421d5, _0x22962e, _0x30fe35) {
  const _0x3e030a = Math["tan"](_0xb421d5 / 2), _0x55b245 = _0x3e030a * _0x22962e, _0x1508a6 = Math["atan"](Math["hypot"](_0x55b245, _0x3e030a)), _0x494779 = EARTH_RADIUS + _0x30fe35, _0x1dc9e9 = EARTH_RADIUS * EARTH_RADIUS - _0x494779 * _0x494779 * Math["sin"](_0x1508a6) ** 2, _0x592dfc = _0x1dc9e9 > 0 ? _0x494779 * Math["cos"](_0x1508a6) - Math["sqrt"](_0x1dc9e9) : Math["sqrt"](_0x494779 * _0x494779 - EARTH_RADIUS * EARTH_RADIUS);
  return _0x592dfc / _0x30fe35 * CORNER_SAFETY;
}
function lodTransitionDistances(_0xbbe658) {
  const { drawingBufferHeight: _0x4c8e86, sseDenominator: _0x5008b8, maximumScreenSpaceError: _0x5208d5, pixelRatio: _0x1514a1 } = _0xbbe658, _0x30db7b = [];
  for (let _0x11b646 = 0; _0x11b646 <= MAX_LEVEL; _0x11b646++) {
    const _0x1f5f42 = _0xbbe658["geometricError"](_0x11b646) * _0x4c8e86 / (_0x5008b8 * _0x5208d5 * _0x1514a1);
    if (Number["isFinite"](_0x1f5f42) && _0x1f5f42 > 0) _0x30db7b["push"](_0x1f5f42);
  }
  return _0x30db7b["sort"]((_0x51224a, _0x4ea032) => _0x51224a - _0x4ea032);
}
const SEAM_MARGIN = 1.01;
function seamFreeScreenSpaceError(_0x476a6a, _0x5c23fa) {
  const _0x4f81ec = _0x5c23fa["maximumScreenSpaceError"], _0x2ceff2 = cornerDistanceRatio(_0x5c23fa["fovy"], _0x5c23fa["aspectRatio"], _0x476a6a);
  for (const _0x51647a of lodTransitionDistances(_0x5c23fa)) {
    if (_0x51647a > _0x476a6a && _0x51647a < _0x476a6a * _0x2ceff2) {
      const _0x40b20d = _0x4f81ec * (_0x51647a / _0x476a6a) * SEAM_MARGIN, _0x4e776a = _0x4f81ec * _0x51647a / (_0x476a6a * _0x2ceff2 * SEAM_MARGIN);
      return Math["abs"](Math["log"](_0x40b20d / _0x4f81ec)) <= Math["abs"](Math["log"](_0x4e776a / _0x4f81ec)) ? _0x40b20d : _0x4e776a;
    }
  }
  return _0x4f81ec;
}
const NADIR_TOLERANCE_DEGREES = 3;
function installLodSeamGuard(_0x5a3504) {
  const _0x42eafb = _0x5a3504["scene"], _0xf97f77 = _0x42eafb["globe"];
  if (!_0xf97f77) return () => void 0;
  let _0x20b477 = _0xf97f77["maximumScreenSpaceError"], _0x5a3475 = _0x20b477;
  const _0x4c1f58 = (_0x1bd531) => {
    if (_0xf97f77["maximumScreenSpaceError"] !== _0x1bd531) _0xf97f77["maximumScreenSpaceError"] = _0x1bd531;
    _0x5a3475 = _0x1bd531;
  }, _0x28fa5d = () => {
    if (_0xf97f77["maximumScreenSpaceError"] !== _0x5a3475) _0x20b477 = _0xf97f77["maximumScreenSpaceError"];
    const _0x41302f = _0x42eafb["camera"]["frustum"], _0x4ba6ee = Math["abs"](_0x494c90["toDegrees"](_0x42eafb["camera"]["pitch"]) + 90) <= NADIR_TOLERANCE_DEGREES;
    if (_0x42eafb["mode"] !== SceneMode["SCENE3D"] || !_0x4ba6ee || !(_0x42eafb["terrainProvider"] instanceof EllipsoidTerrainProvider) || _0x41302f["fovy"] === void 0 || _0x41302f["aspectRatio"] === void 0 || _0x41302f["sseDenominator"] === void 0) {
      _0x4c1f58(_0x20b477);
      return;
    }
    const _0x46de4c = _0x42eafb["terrainProvider"], _0x24bf09 = { "geometricError": (_0x1172f7) => _0x46de4c["getLevelMaximumGeometricError"](_0x1172f7), "drawingBufferHeight": _0x42eafb["drawingBufferHeight"], "sseDenominator": _0x41302f["sseDenominator"], "maximumScreenSpaceError": _0x20b477, "pixelRatio": _0x42eafb["pixelRatio"] ?? 1, "fovy": _0x41302f["fovy"], "aspectRatio": _0x41302f["aspectRatio"] };
    _0x4c1f58(seamFreeScreenSpaceError(_0x42eafb["camera"]["positionCartographic"]["height"], _0x24bf09));
  }, _0x700a21 = _0x42eafb["preRender"]["addEventListener"](_0x28fa5d);
  return () => {
    _0x700a21(), !_0x42eafb["isDestroyed"]() && _0xf97f77["maximumScreenSpaceError"] === _0x5a3475 && (_0xf97f77["maximumScreenSpaceError"] = _0x20b477);
  };
}
const SCREEN_DPI$1 = 96, METERS_PER_INCH$1 = 0.0254, REWRITE_TOLERANCE = 5e-3;
function minZoomDistanceForScale(_0x242681, _0x169b92, _0x1b0518) {
  const _0x1b5e78 = Math["tan"](_0x1b0518 / 2), _0x158043 = _0x242681 * METERS_PER_INCH$1 / SCREEN_DPI$1 * _0x169b92 / (2 * _0x1b5e78);
  return Number["isFinite"](_0x158043) && _0x158043 > 0 ? _0x158043 : null;
}
const SNAP_WINDOW_RATIO = 1.06, MIN_SNAP_GAP_METERS = 1e-3, SNAP_DURATION_MS = 150;
function snapToMinAmount(_0x2abd06, _0x52d612) {
  const _0x2dd051 = _0x2abd06 - _0x52d612;
  if (!(_0x2dd051 > MIN_SNAP_GAP_METERS) || _0x2abd06 > _0x52d612 * SNAP_WINDOW_RATIO) return 0;
  return _0x2dd051;
}
function installMinZoomScale(_0x253a66, _0x3e1ef9, _0x3fc5b7) {
  const _0x23738c = _0x253a66["scene"], _0x3b18e0 = _0x23738c["screenSpaceCameraController"], _0x5ceca8 = () => {
    const _0x49164f = _0x23738c["camera"]["frustum"]["fovy"];
    if (_0x49164f === void 0) return;
    const _0x59e8dc = _0x23738c["canvas"]["clientHeight"], _0x24274f = minZoomDistanceForScale(_0x3e1ef9, _0x59e8dc, _0x49164f);
    if (_0x24274f !== null) {
      const _0x17d88f = _0x3b18e0["minimumZoomDistance"];
      Math["abs"](_0x17d88f - _0x24274f) > _0x17d88f * REWRITE_TOLERANCE && (_0x3b18e0["minimumZoomDistance"] = _0x24274f);
    }
    const _0xd1ebb0 = minZoomDistanceForScale(_0x3fc5b7, _0x59e8dc, _0x49164f);
    if (_0xd1ebb0 === null) return;
    const _0x57f49b = _0x3b18e0["maximumZoomDistance"];
    Math["abs"](_0x57f49b - _0xd1ebb0) > _0x57f49b * REWRITE_TOLERANCE && (_0x3b18e0["maximumZoomDistance"] = _0xd1ebb0);
  }, _0x2f59d6 = _0x23738c["camera"], _0x5d57b6 = _0x23738c["canvas"];
  let _0xeab14d;
  const _0x4431b7 = () => {
    if (_0xeab14d !== void 0) cancelAnimationFrame(_0xeab14d);
    _0xeab14d = void 0;
  }, _0x30122c = () => {
    if (_0xeab14d !== void 0) return;
    const _0x286bdb = snapToMinAmount(_0x2f59d6["positionCartographic"]["height"], _0x3b18e0["minimumZoomDistance"]);
    if (_0x286bdb <= 0) return;
    const _0x305c42 = performance["now"]();
    let _0x40c637 = 0;
    const _0xa8ef81 = (_0x1d6a4e) => {
      const _0x418365 = Math["min"](1, (_0x1d6a4e - _0x305c42) / SNAP_DURATION_MS), _0x40f69e = _0x286bdb * (1 - (1 - _0x418365) * (1 - _0x418365));
      if (_0x40f69e > _0x40c637) _0x2f59d6["zoomIn"](_0x40f69e - _0x40c637);
      _0x40c637 = _0x40f69e, _0xeab14d = _0x418365 < 1 ? requestAnimationFrame(_0xa8ef81) : void 0;
    };
    _0xeab14d = requestAnimationFrame(_0xa8ef81);
  };
  _0x5d57b6["addEventListener"]("pointerdown", _0x4431b7), _0x5d57b6["addEventListener"]("wheel", _0x4431b7, { "passive": !![] });
  const _0x16e5be = _0x23738c["preRender"]["addEventListener"](_0x5ceca8), _0x3c81a2 = _0x2f59d6["moveEnd"]["addEventListener"](_0x30122c);
  return () => {
    _0x4431b7(), _0x5d57b6["removeEventListener"]("pointerdown", _0x4431b7), _0x5d57b6["removeEventListener"]("wheel", _0x4431b7), _0x16e5be(), _0x3c81a2();
  };
}
const ZOOM_SCALE_STEPS = [100, 250, 500, 1e3, 2500, 5e3, 1e4, 25e3, 5e4, 1e5, 25e4, 5e5, 1e6, 25e5, 5e6, 15e6, 25e6], ON_STEP_TOLERANCE = 0.03;
function nextScaleStep(_0x2eb426, _0xf02997) {
  if (!(_0x2eb426 > 0) || !Number["isFinite"](_0x2eb426)) return null;
  if (_0xf02997 === 1) {
    const _0x11788f = _0x2eb426 / (1 + ON_STEP_TOLERANCE);
    return [...ZOOM_SCALE_STEPS]["reverse"]()["find"]((_0x452518) => _0x452518 < _0x11788f) ?? null;
  }
  const _0x1d6272 = _0x2eb426 * (1 + ON_STEP_TOLERANCE);
  return ZOOM_SCALE_STEPS["find"]((_0x1f6d4f) => _0x1f6d4f > _0x1d6272) ?? Infinity;
}
const SCREEN_DPI = 96, METERS_PER_INCH = 0.0254;
function measureGround(_0x1bee3e) {
  const _0x37a9bf = _0x1bee3e["globe"];
  if (!_0x37a9bf) return null;
  const _0x4986f0 = _0x1bee3e["camera"], _0x45bf2d = _0x1bee3e["canvas"]["clientWidth"] / 2, _0x4a148c = _0x1bee3e["canvas"]["clientHeight"] / 2, _0x4ad185 = _0x4986f0["getPickRay"](new Cartesian2(_0x45bf2d - 1, _0x4a148c)), _0xa784a8 = _0x4986f0["getPickRay"](new Cartesian2(_0x45bf2d + 1, _0x4a148c)), _0x550470 = _0x4986f0["getPickRay"](new Cartesian2(_0x45bf2d, _0x4a148c));
  if (!_0x4ad185 || !_0xa784a8 || !_0x550470) return null;
  const _0x4e2254 = _0x37a9bf["pick"](_0x4ad185, _0x1bee3e), _0x1a793f = _0x37a9bf["pick"](_0xa784a8, _0x1bee3e), _0x546ade = _0x37a9bf["pick"](_0x550470, _0x1bee3e);
  if (!_0x4e2254 || !_0x1a793f || !_0x546ade) return null;
  const _0x250c42 = Cartesian3["distance"](_0x4e2254, _0x1a793f) / 2;
  return { "scale": _0x250c42 * SCREEN_DPI / METERS_PER_INCH, "distance": Cartesian3["distance"](_0x4986f0["position"], _0x546ade) };
}
const DISPLAY_SNAP_TOLERANCE = 5e-3;
function snapScaleForDisplay(_0xc4c739) {
  const _0x381b4c = ZOOM_SCALE_STEPS["find"]((_0x5a6aff) => Math["abs"](_0xc4c739 - _0x5a6aff) <= _0x5a6aff * DISPLAY_SNAP_TOLERANCE);
  return _0x381b4c ?? _0xc4c739;
}
const ZOOM_ANIMATION_SECONDS = 0.25;
function easeOut(_0xd70e93) {
  return 1 - Math["pow"](1 - _0xd70e93, 3);
}
const pendingZooms = /* @__PURE__ */ new WeakMap();
function planStepAmount(_0x401470, _0x48a78b, _0x3420f8, _0x516c50) {
  const _0xb1a519 = nextScaleStep(_0x401470["scale"], _0x48a78b);
  if (_0xb1a519 === null) return null;
  let _0x1c2d69 = _0xb1a519 === Infinity ? Infinity : _0x401470["distance"] * Math["abs"](1 - _0xb1a519 / _0x401470["scale"]);
  if (_0x48a78b === -1) _0x1c2d69 = Math["min"](_0x1c2d69, _0x516c50 - _0x3420f8);
  return _0x1c2d69 > 0 && Number["isFinite"](_0x1c2d69) ? _0x1c2d69 : null;
}
function flyScaleStep(_0x327f43, _0x55a63c, _0x103641, _0x46a919) {
  const _0x58d38f = pendingZooms["get"](_0x327f43), _0x3e508d = (_0x58d38f == null ? void 0 : _0x58d38f["ground"]) ?? _0x103641();
  if (!_0x3e508d) return;
  const _0x359bc7 = (_0x58d38f == null ? void 0 : _0x58d38f["height"]) ?? _0x327f43["positionCartographic"]["height"], _0x46502c = planStepAmount(_0x3e508d, _0x55a63c, _0x359bc7, _0x46a919);
  if (_0x46502c === null) return;
  const _0x536175 = (_0x58d38f == null ? void 0 : _0x58d38f["position"]) ?? _0x327f43["position"], _0x180278 = _0x327f43["direction"], _0x3c3118 = _0x327f43["position"]["clone"]();
  _0x3c3118["x"] = _0x536175["x"] + _0x180278["x"] * _0x46502c * _0x55a63c, _0x3c3118["y"] = _0x536175["y"] + _0x180278["y"] * _0x46502c * _0x55a63c, _0x3c3118["z"] = _0x536175["z"] + _0x180278["z"] * _0x46502c * _0x55a63c;
  const _0x51f5e0 = _0x3e508d["distance"] - _0x55a63c * _0x46502c, _0x54e565 = { "ground": { "scale": _0x3e508d["scale"] * _0x51f5e0 / _0x3e508d["distance"], "distance": _0x51f5e0 }, "height": _0x359bc7 - _0x55a63c * _0x46502c, "position": _0x3c3118 }, _0x1544bf = () => {
    if (pendingZooms["get"](_0x327f43) === _0x54e565) pendingZooms["delete"](_0x327f43);
  };
  _0x327f43["flyTo"]({ "destination": _0x3c3118, "orientation": { "direction": _0x180278["clone"](), "up": _0x327f43["up"]["clone"]() }, "duration": ZOOM_ANIMATION_SECONDS, "easingFunction": easeOut, "complete": _0x1544bf, "cancel": _0x1544bf }), pendingZooms["set"](_0x327f43, _0x54e565);
}
function scaleZoomStep(_0x1c8a24, _0x3aba38) {
  const { camera: _0xd9e755, scene: _0x39a382 } = _0x1c8a24;
  flyScaleStep(_0xd9e755, _0x3aba38, () => measureGround(_0x39a382), _0x39a382["screenSpaceCameraController"]["maximumZoomDistance"]);
}
const WHEEL_STEP_THRESHOLD_PX = 40, WHEEL_SMALL_DELTA_LOCK_MS = 200, LINE_HEIGHT_PX = 16, PAGE_HEIGHT_PX = 400;
function wheelDeltaPixels(_0xe8719, _0x51bc1a) {
  if (_0x51bc1a === 1) return _0xe8719 * LINE_HEIGHT_PX;
  if (_0x51bc1a === 2) return _0xe8719 * PAGE_HEIGHT_PX;
  return _0xe8719;
}
function installScaleWheelZoom(_0x2415ad) {
  const _0x4e42a3 = _0x2415ad["scene"]["canvas"], _0x422604 = _0x2415ad["scene"]["screenSpaceCameraController"], _0x570313 = _0x422604["zoomEventTypes"];
  _0x422604["zoomEventTypes"] = [CameraEventType["MIDDLE_DRAG"], CameraEventType["PINCH"]];
  let _0x3d7d91 = 0, _0x4462b5 = 0;
  const _0x8a461b = (_0x57d43b) => {
    _0x57d43b["preventDefault"]();
    const _0x46c9b1 = wheelDeltaPixels(_0x57d43b["deltaY"], _0x57d43b["deltaMode"]);
    if (_0x46c9b1 === 0) return;
    const _0x7f82f6 = performance["now"]();
    if (Math["abs"](_0x46c9b1) < WHEEL_STEP_THRESHOLD_PX && _0x7f82f6 < _0x4462b5) return;
    if (Math["sign"](_0x46c9b1) !== Math["sign"](_0x3d7d91)) _0x3d7d91 = 0;
    _0x3d7d91 += _0x46c9b1;
    if (Math["abs"](_0x3d7d91) < WHEEL_STEP_THRESHOLD_PX) return;
    scaleZoomStep(_0x2415ad, _0x3d7d91 < 0 ? 1 : -1), _0x3d7d91 = 0, _0x4462b5 = _0x7f82f6 + WHEEL_SMALL_DELTA_LOCK_MS;
  };
  return _0x4e42a3["addEventListener"]("wheel", _0x8a461b, { "passive": ![] }), () => {
    _0x4e42a3["removeEventListener"]("wheel", _0x8a461b), _0x422604["zoomEventTypes"] = _0x570313;
  };
}
function createMarkerOverlay(_0x29ed57, _0x26d75c, _0x35f2c4, _0x4108e5, _0x2addb1 = {}) {
  const _0x1d1127 = Cartesian3["fromDegrees"](_0x26d75c, _0x35f2c4), _0x42ee20 = Ellipsoid["WGS84"]["geodeticSurfaceNormal"](_0x1d1127, new Cartesian3()), _0x53546d = new Cartesian3(), _0x1b9f7d = new Cartesian2(), _0x1f26cb = document["createElement"]("img");
  _0x1f26cb["src"] = _0x4108e5, _0x1f26cb["alt"] = "", _0x1f26cb["draggable"] = ![], Object["assign"](_0x1f26cb["style"], { "position": "absolute", "left": "0", "top": "0", "display": "none", "pointerEvents": "none", "userSelect": "none", "zIndex": "1", "willChange": "transform", ..._0x2addb1["width"] === void 0 ? {} : { "width": _0x2addb1["width"] + "px" }, ..._0x2addb1["height"] === void 0 ? {} : { "height": _0x2addb1["height"] + "px" } }), _0x29ed57["container"]["appendChild"](_0x1f26cb);
  const _0x45d0e3 = () => {
    const { scene: _0x122c7e } = _0x29ed57;
    let _0x542620 = !![];
    _0x122c7e["mode"] === SceneMode["SCENE3D"] && (Cartesian3["subtract"](_0x122c7e["camera"]["positionWC"], _0x1d1127, _0x53546d), _0x542620 = Cartesian3["dot"](_0x42ee20, _0x53546d) > 0);
    const _0x2b271d = _0x542620 ? _0x122c7e["cartesianToCanvasCoordinates"](_0x1d1127, _0x1b9f7d) : void 0;
    if (!_0x2b271d) {
      _0x1f26cb["style"]["display"] = "none";
      return;
    }
    _0x1f26cb["style"]["display"] = "block";
    const _0x945604 = Math["round"](_0x2b271d["x"] - _0x1f26cb["offsetWidth"] / 2), _0x2bdff8 = Math["round"](_0x2b271d["y"] - (_0x2addb1["anchor"] === "center" ? _0x1f26cb["offsetHeight"] / 2 : _0x1f26cb["offsetHeight"]));
    _0x1f26cb["style"]["transform"] = "translate(" + _0x945604 + "px, " + _0x2bdff8 + "px)";
  }, _0x1f3f0c = _0x29ed57["scene"]["postRender"]["addEventListener"](_0x45d0e3);
  return _0x1f26cb["addEventListener"]("load", _0x45d0e3), _0x45d0e3(), () => {
    _0x1f3f0c(), _0x1f26cb["remove"]();
  };
}
class EventEmitter {
  constructor() {
    this["listeners"] = {};
  }
  ["on"](_0x129a84, _0x18653a) {
    const _0x295b6f = this["listeners"][_0x129a84];
    return _0x295b6f !== void 0 ? _0x295b6f["add"](_0x18653a) : this["listeners"][_0x129a84] = /* @__PURE__ */ new Set([_0x18653a]), this;
  }
  ["off"](_0x131608, _0x11e49f) {
    var _a2;
    return (_a2 = this["listeners"][_0x131608]) == null ? void 0 : _a2["delete"](_0x11e49f), this;
  }
  ["once"](_0x5fd8d5, _0x150f57) {
    const _0x3167ea = (_0x19221f) => {
      _0x150f57(_0x19221f), this["off"](_0x5fd8d5, _0x3167ea);
    };
    return this["on"](_0x5fd8d5, _0x3167ea);
  }
  ["emit"](_0x104026, _0x42fa83) {
    const _0x44aba2 = this["listeners"][_0x104026];
    if (_0x44aba2 === void 0) return;
    for (const _0x2f91c2 of _0x44aba2) {
      _0x2f91c2(_0x42fa83);
    }
  }
  ["removeAllListeners"](_0x6451e1) {
    if (_0x6451e1 !== void 0) delete this["listeners"][_0x6451e1];
    else for (const _0x5e5532 of Object["keys"](this["listeners"])) {
      delete this["listeners"][_0x5e5532];
    }
  }
  ["listenerCount"](_0x467e46) {
    var _a2;
    return ((_a2 = this["listeners"][_0x467e46]) == null ? void 0 : _a2["size"]) ?? 0;
  }
}
const GLOBAL_STATE_SLOT = Symbol["for"]("@tucbs/core/globalConfigState");
function getState() {
  const _0x8cadcf = globalThis;
  let _0x370504 = _0x8cadcf[GLOBAL_STATE_SLOT];
  return !_0x370504 && (_0x370504 = { "apiKey": void 0, "apiBase": void 0, "proxyBase": void 0, "configured": ![], "refreshers": /* @__PURE__ */ new Set() }, Object["defineProperty"](globalThis, GLOBAL_STATE_SLOT, { "value": _0x370504, "enumerable": ![], "configurable": ![], "writable": ![] })), _0x370504;
}
function configureTucbs(_0x19c079) {
  const _0x55a007 = getState();
  if (_0x19c079["apiBase"] !== void 0) {
    const _0x44db09 = _0x19c079["apiBase"]["trim"]()["replace"](/\/+$/, "");
    _0x55a007["apiBase"] = _0x44db09 || void 0, _0x55a007["configured"] = !![];
  }
  if (_0x19c079["proxyBase"] !== void 0) {
    const _0x14d41f = _0x19c079["proxyBase"]["trim"]();
    _0x55a007["proxyBase"] = _0x14d41f || void 0, _0x55a007["configured"] = !![];
  }
  if (_0x19c079["apiKey"] === void 0) {
    _0x55a007["configured"] && _0x55a007["refreshers"]["forEach"]((_0x41b3cb) => _0x41b3cb());
    return;
  }
  _0x55a007["apiKey"] !== void 0 && _0x19c079["apiKey"] !== _0x55a007["apiKey"] && console["warn"]("[@tucbs/core] configureTucbs() daha once farkli bir apiKey ile cagrilmisti; deger degistirildi. Bu beklenmiyorsa sayfada birden fazla script'in ayni fonksiyonu cagirdigini kontrol edin."), _0x55a007["apiKey"] = _0x19c079["apiKey"], _0x55a007["configured"] = !![], _0x55a007["refreshers"]["forEach"]((_0x204ac9) => _0x204ac9());
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
function registerApiKeyRefresh(_0x4088f0) {
  const { refreshers: _0x2fb115 } = getState();
  return _0x2fb115["add"](_0x4088f0), () => _0x2fb115["delete"](_0x4088f0);
}
const DEFAULT_UCBP_API_BASE = ("http://localhost:8094/ucbp-api" == null ? void 0 : "http://localhost:8094/ucbp-api"["trim"]()) || "/ucbp-api";
function trimSlash$2(_0x9fe255) {
  return _0x9fe255["replace"](/\/+$/, "");
}
function getUcbpApiBase() {
  const _0x12eb77 = getGlobalApiBase();
  if (_0x12eb77) return trimSlash$2(_0x12eb77);
  return trimSlash$2(DEFAULT_UCBP_API_BASE);
}
function getProxyBase() {
  const _0x107747 = getGlobalProxyBase();
  if (_0x107747) return _0x107747;
  return console["warn"]("proxyBase yok; configureTucbs({ proxyBase }) verilmedi. main.js'te verilmeli."), "";
}
const ERROR_REGISTRY = { "API_KEY_MISSING": { "code": "API_KEY_MISSING", "number": "E001", "title": "API Anahtarı Eksik", "description": "Ne instance ne configureTucbs() ile ayarlanmış global apiKey sağlanmış." }, "API_KEY_INVALID": { "code": "API_KEY_INVALID", "number": "E002", "title": "API Anahtarı Geçersiz", "description": "Sağlanan apiKey backend tarafından reddedildi veya doğrulama isteği başarısız oldu." }, "INTERNAL_INDEX_OUT_OF_RANGE": { "code": "INTERNAL_INDEX_OUT_OF_RANGE", "number": "E003", "title": "İç Durum Hatası", "description": "Beklenen bir dizi indeksi bulunamadı (iç tutarlılık hatası)." }, "OGC_CAPABILITIES_REQUEST_FAILED": { "code": "OGC_CAPABILITIES_REQUEST_FAILED", "number": "E201", "title": "GetCapabilities İsteği Başarısız", "description": "WFS GetCapabilities isteği HTTP hata koduyla döndü." }, "OGC_CAPABILITIES_EXCEPTION": { "code": "OGC_CAPABILITIES_EXCEPTION", "number": "E202", "title": "GetCapabilities OGC Exception", "description": "WFS GetCapabilities yanıtı bir OGC ExceptionReport/ServiceExceptionReport döndürdü." }, "OGC_CAPABILITIES_PARSE_FAILED": { "code": "OGC_CAPABILITIES_PARSE_FAILED", "number": "E203", "title": "GetCapabilities Ayrıştırma Hatası", "description": "WFS GetCapabilities yanıtı geçerli XML olarak ayrıştırılamadı." }, "OGC_FEATURE_TYPE_NOT_FOUND": { "code": "OGC_FEATURE_TYPE_NOT_FOUND", "number": "E204", "title": "FeatureType Bulunamadı", "description": "WFS GetCapabilities yanıtında hiç FeatureType bulunamadı." }, "CRS_UNRESOLVED_UNSUPPORTED": { "code": "CRS_UNRESOLVED_UNSUPPORTED", "number": "E401", "title": "Koordinat Sistemi Tanınamadı", "description": "GeoJSON'daki koordinat sistemi (CRS) çözülemedi ve koordinatlar WGS84 ile uyumlu değil." }, "CRS_CLAIMED_WGS84_INVALID": { "code": "CRS_CLAIMED_WGS84_INVALID", "number": "E402", "title": "Koordinatlar WGS84 İle Uyumsuz", "description": "GeoJSON WGS84/CRS84 olduğunu belirtiyor ama koordinatlar geçerli bir enlem/boylam aralığında değil." }, "CRS_MISSING_UNSUPPORTED": { "code": "CRS_MISSING_UNSUPPORTED", "number": "E403", "title": "Koordinat Sistemi Bilgisi Yok", "description": "GeoJSON'da CRS bilgisi yok ve koordinatlar geçerli bir enlem/boylam aralığında değil." }, "ANALYSIS_API_KEY_MISSING": { "code": "ANALYSIS_API_KEY_MISSING", "number": "E301", "title": "Analiz İçin API Anahtarı Eksik", "description": "AnalysisManager'a apiKey tanımlanmadan analiz isteği yapıldı." }, "ANALYSIS_NETWORK_ERROR": { "code": "ANALYSIS_NETWORK_ERROR", "number": "E302", "title": "Analiz Ağ Hatası", "description": "Analiz isteği ağ seviyesinde (fetch) başarısız oldu." }, "ANALYSIS_REQUEST_FAILED": { "code": "ANALYSIS_REQUEST_FAILED", "number": "E303", "title": "Analiz İsteği Başarısız", "description": "Analiz backend'i HTTP hata koduyla döndü." }, "ANALYSIS_UNSUCCESSFUL": { "code": "ANALYSIS_UNSUCCESSFUL", "number": "E304", "title": "Analiz Başarısız", "description": "Analiz backend'i HTTP 200 döndü ama isSuccess/success=false işaretledi." }, "ANALYSIS_RESPONSE_MISSING_GEOJSON": { "code": "ANALYSIS_RESPONSE_MISSING_GEOJSON", "number": "E305", "title": "Analiz Yanıtı Eksik", "description": "Analiz backend'i başarılı yanıt döndü ama sonuç geojson içermiyor." }, "LAYER_AUTHORIZED_LIST_API_KEY_MISSING": { "code": "LAYER_AUTHORIZED_LIST_API_KEY_MISSING", "number": "E101", "title": "Yetkili Katman Listesi İçin API Anahtarı Gerekli", "description": "getAuthorizedLayers() apiKey ayarlanmadan çağrıldı." }, "LAYER_GEOTIFF_EXPORT_UNSUPPORTED_TYPE": { "code": "LAYER_GEOTIFF_EXPORT_UNSUPPORTED_TYPE", "number": "E102", "title": "GeoTIFF Export Desteklenmiyor", "description": "GeoTIFF export sadece WMS/WCS katmanlarında desteklenir." }, "LAYER_GEOTIFF_EXPORT_NOT_CONFIGURED": { "code": "LAYER_GEOTIFF_EXPORT_NOT_CONFIGURED", "number": "E103", "title": "GeoTIFF Export Yapılandırılmamış", "description": "Katman GeoTIFF export için gerekli tiffFormat seçeneğine sahip değil." }, "LAYER_STYLE_NOT_VECTOR": { "code": "LAYER_STYLE_NOT_VECTOR", "number": "E104", "title": "Stil Sadece Vektör Katmanlarda", "description": "applyLayerStyle() sadece vektör (Entity tabanlı) katmanlarda kullanılabilir." }, "LAYER_TYPE_UNSUPPORTED_XYZ": { "code": "LAYER_TYPE_UNSUPPORTED_XYZ", "number": "E105", "title": "XYZ Katmanı add() İle Desteklenmiyor", "description": "XYZ katmanı add() ile eklenemez, Map.setBasemap() kullanılmalı." }, "LAYER_TYPE_UNSUPPORTED_DRAWING": { "code": "LAYER_TYPE_UNSUPPORTED_DRAWING", "number": "E106", "title": "DRAWING Katmanı add() İle Desteklenmiyor", "description": "DRAWING katmanı DrawingManager tarafından otomatik eklenir, add() ile eklenemez." }, "LAYER_TYPE_UNSUPPORTED_MEASURE": { "code": "LAYER_TYPE_UNSUPPORTED_MEASURE", "number": "E107", "title": "MEASURE Katmanı add() İle Desteklenmiyor", "description": "MEASURE katmanı DrawingManager tarafından otomatik eklenir, add() ile eklenemez." }, "LAYER_WMS_LAYERS_EMPTY": { "code": "LAYER_WMS_LAYERS_EMPTY", "number": "E108", "title": "WMS layers Parametresi Boş", "description": "WMS katmanı eklenirken layers (ogcLayerName) parametresi boş." }, "LAYER_GEOTIFF_UNSUPPORTED": { "code": "LAYER_GEOTIFF_UNSUPPORTED", "number": "E109", "title": "GeoTIFF Katmanı Desteklenmiyor", "description": "GeoTIFF katmanı mevcut Cesium sürümünde desteklenmiyor." }, "LAYER_SHP_PACKAGE_MISSING": { "code": "LAYER_SHP_PACKAGE_MISSING", "number": "E110", "title": "shpjs Paketi Eksik", "description": 'SHP katmanı için gereken "shpjs" paketi tüketici uygulamaya eklenmemiş.' }, "LAYER_CSV_PACKAGE_MISSING": { "code": "LAYER_CSV_PACKAGE_MISSING", "number": "E111", "title": "papaparse Paketi Eksik", "description": 'CSV katmanı için gereken "papaparse" paketi tüketici uygulamaya eklenmemiş.' }, "LAYER_CSV_LATLON_NOT_FOUND": { "code": "LAYER_CSV_LATLON_NOT_FOUND", "number": "E112", "title": "CSV'de lat/lon Sütunu Bulunamadı", "description": "CSV içinde lat/lon sütunları otomatik tespit edilemedi." }, "LAYER_NOT_FOUND": { "code": "LAYER_NOT_FOUND", "number": "E113", "title": "Katman Bulunamadı", "description": "Verilen id'ye sahip bir katman yönetimde kayıtlı değil." }, "LAYER_ID_ALREADY_EXISTS": { "code": "LAYER_ID_ALREADY_EXISTS", "number": "E114", "title": "Katman ID'si Zaten Kayıtlı", "description": "Verilen id ile zaten bir katman eklenmiş." }, "LAYER_TYPE_MISMATCH": { "code": "LAYER_TYPE_MISMATCH", "number": "E115", "title": "Katman Tipi Uyuşmuyor", "description": "Katman beklenen tipte (WMS/WMTS) değil." }, "LAYER_SERVICE_OPTIONS_NOT_FOUND": { "code": "LAYER_SERVICE_OPTIONS_NOT_FOUND", "number": "E116", "title": "Servis Seçenekleri Bulunamadı", "description": "Katman için orijinal servis seçenekleri (serviceLayerOptions) bulunamadı." }, "LAYER_NOT_RASTER": { "code": "LAYER_NOT_RASTER", "number": "E117", "title": "Katman Raster Değil", "description": "İşlem sadece raster (ImageryLayer) katmanlarda desteklenir." }, "OGC_AUTHORIZED_LAYERS_REQUEST_FAILED": { "code": "OGC_AUTHORIZED_LAYERS_REQUEST_FAILED", "number": "E205", "title": "Yetkili Katman Listesi Alınamadı", "description": "getAuthorizedLayers() isteği HTTP hata koduyla döndü." }, "OGC_GEOTIFF_DOWNLOAD_FAILED": { "code": "OGC_GEOTIFF_DOWNLOAD_FAILED", "number": "E206", "title": "GeoTIFF İndirilemedi", "description": "GeoTIFF export isteği HTTP hata koduyla döndü." }, "OGC_WFS_JSON_FORMAT_UNSUPPORTED": { "code": "OGC_WFS_JSON_FORMAT_UNSUPPORTED", "number": "E207", "title": "WFS JSON Format İlan Etmiyor", "description": "WFS sunucusu GetCapabilities yanıtında JSON çıktı formatı ilan etmiyor." }, "OGC_WFS_GEOJSON_REQUEST_FAILED": { "code": "OGC_WFS_GEOJSON_REQUEST_FAILED", "number": "E208", "title": "WFS GeoJSON İsteği Başarısız", "description": "WFS GetFeature (GeoJSON çıktı) isteği başarısız oldu." }, "OGC_WFS_REQUEST_FAILED": { "code": "OGC_WFS_REQUEST_FAILED", "number": "E209", "title": "WFS İsteği Başarısız", "description": "WFS GetFeature (GML çıktı) isteği HTTP hata koduyla döndü." }, "OGC_WFS_EXCEPTION": { "code": "OGC_WFS_EXCEPTION", "number": "E210", "title": "WFS OGC Exception", "description": "WFS GetFeature yanıtı bir OGC ExceptionReport döndürdü." }, "OGC_WFS_OL_PACKAGE_MISSING": { "code": "OGC_WFS_OL_PACKAGE_MISSING", "number": "E211", "title": "ol Paketi Eksik", "description": 'WFS GML yanıtını okumak için gereken "ol" paketi tüketici uygulamaya eklenmemiş.' }, "OGC_WCS_REQUEST_FAILED": { "code": "OGC_WCS_REQUEST_FAILED", "number": "E212", "title": "WCS İsteği Başarısız", "description": "WCS GetCoverage isteği HTTP hata koduyla döndü." }, "OGC_WCS_MULTIPART_IMAGE_NOT_FOUND": { "code": "OGC_WCS_MULTIPART_IMAGE_NOT_FOUND", "number": "E213", "title": "WCS Multipart Görsel Bulunamadı", "description": "Multipart WCS yanıtında görsel (image) parçası bulunamadı." }, "LAYER_PREVIEW_UNSUPPORTED_XYZ": { "code": "LAYER_PREVIEW_UNSUPPORTED_XYZ", "number": "E118", "title": "XYZ Katmanı Önizlemede Desteklenmiyor", "description": "TucbsMapPreview XYZ katman tipini önizlemede desteklemiyor." }, "LAYER_PREVIEW_UNSUPPORTED_DRAWING": { "code": "LAYER_PREVIEW_UNSUPPORTED_DRAWING", "number": "E119", "title": "DRAWING Katmanı Önizlemede Desteklenmiyor", "description": "TucbsMapPreview DRAWING katman tipini önizlemede desteklemiyor." }, "LAYER_PREVIEW_UNSUPPORTED_MEASURE": { "code": "LAYER_PREVIEW_UNSUPPORTED_MEASURE", "number": "E120", "title": "MEASURE Katmanı Önizlemede Desteklenmiyor", "description": "TucbsMapPreview MEASURE katman tipini önizlemede desteklemiyor." }, "LAYER_MANAGER_NOT_READY": { "code": "LAYER_MANAGER_NOT_READY", "number": "E121", "title": "Harita Hazır Değil", "description": "Katman eklenmeye çalışıldığında LayerManager henüz hazır değildi." }, "LAYER_AUTHORIZED_ADD_MISSING_INFO": { "code": "LAYER_AUTHORIZED_ADD_MISSING_INFO", "number": "E122", "title": "Yetkili Katman Eklenemedi", "description": "Yetkili katman için gerekli servis bilgisi (ör. WMTS TileMatrixSet) eksik." }, "OGC_SERVICE_DISCOVERY_PARSE_FAILED": { "code": "OGC_SERVICE_DISCOVERY_PARSE_FAILED", "number": "E214", "title": "Servis Keşfi Ayrıştırma Hatası", "description": "TucbsServiceUpload'da GetCapabilities yanıtı geçerli XML olarak ayrıştırılamadı." }, "LAYER_WMTS_TILEMATRIXSET_MISSING": { "code": "LAYER_WMTS_TILEMATRIXSET_MISSING", "number": "E123", "title": "TileMatrixSet Bilgisi Bulunamadı", "description": "Keşfedilen WMTS katmanı için TileMatrixSet bilgisi bulunamadı." } };
function getErrorCodes() {
  return ERROR_REGISTRY;
}
class TucbsError extends Error {
  constructor(_0x367f92, _0x1de52e, _0x19bcf1) {
    const _0x5b4047 = ERROR_REGISTRY[_0x367f92];
    super(_0x1de52e ?? _0x5b4047["description"]), this["name"] = "TucbsError", this["code"] = _0x367f92, this["number"] = _0x5b4047["number"], this["title"] = _0x19bcf1 ?? _0x5b4047["title"];
  }
}
class LayerOperationError extends TucbsError {
  constructor(_0x831bc8, _0x2f06e2, _0x97fc9) {
    super(_0x831bc8, _0x2f06e2, _0x97fc9), this["name"] = "LayerOperationError";
  }
}
class OgcRequestError extends TucbsError {
  constructor(_0x279bcd, _0x206f68, _0x26208d) {
    super(_0x279bcd, _0x206f68, _0x26208d), this["name"] = "OgcRequestError";
  }
}
class AnalysisRequestError extends TucbsError {
  constructor(_0x3b3eeb, _0x614667, _0x24dc95) {
    super(_0x3b3eeb, _0x614667, _0x24dc95), this["name"] = "AnalysisRequestError";
  }
}
class GeometryError extends TucbsError {
  constructor(_0x10ca3e, _0x4cb3bf, _0x468cf6) {
    super(_0x10ca3e, _0x4cb3bf, _0x468cf6), this["name"] = "GeometryError";
  }
}
class ApiKeyValidationError extends TucbsError {
  constructor(_0x82417, _0x4d7aa8) {
    super((_0x4d7aa8 == null ? void 0 : _0x4d7aa8["code"]) ?? "API_KEY_INVALID", _0x82417, (_0x4d7aa8 == null ? void 0 : _0x4d7aa8["title"]) ?? "API Hatası"), this["name"] = "ApiKeyValidationError";
    if ((_0x4d7aa8 == null ? void 0 : _0x4d7aa8["reason"]) !== void 0) this["reason"] = _0x4d7aa8["reason"];
    if ((_0x4d7aa8 == null ? void 0 : _0x4d7aa8["detail"]) !== void 0) this["detail"] = _0x4d7aa8["detail"];
  }
}
const _ApiKeyPolicy = class _ApiKeyPolicy {
  constructor(_0x580255) {
    __privateAdd(this, _apiKey);
    this["getApiBase"] = _0x580255["apiBase"];
  }
  ["configure"](_0x3c77a9) {
    _0x3c77a9["apiKey"] !== void 0 && __privateSet(this, _apiKey, _0x3c77a9["apiKey"]), _0x3c77a9["trustedApiKeyHosts"] !== void 0 && (this["trustedApiKeyHosts"] = _0x3c77a9["trustedApiKeyHosts"]), _0x3c77a9["apiKeyDiscoveryUrl"] !== void 0 && (this["apiKeyDiscoveryUrl"] = _0x3c77a9["apiKeyDiscoveryUrl"]);
  }
  get ["hasApiKey"]() {
    return __privateGet(this, _apiKey) !== void 0;
  }
  async ["getAuthorizedLayers"]() {
    if (__privateGet(this, _apiKey) === void 0) throw new LayerOperationError("LAYER_AUTHORIZED_LIST_API_KEY_MISSING", "getAuthorizedLayers() icin apiKey gerekli — Map/LayerManager.configure({apiKey}) ile atayin.");
    const _0x2394e1 = this["apiKeyDiscoveryUrl"] ?? this["getApiBase"]()["replace"](/\/+$/, "") + "/layers", _0x3fb443 = await fetch(_0x2394e1, { "headers": { [_ApiKeyPolicy["API_KEY_HEADER_NAME"]]: __privateGet(this, _apiKey) } });
    if (!_0x3fb443["ok"]) throw new OgcRequestError("OGC_AUTHORIZED_LAYERS_REQUEST_FAILED", "Yetkili katman listesi alinamadi: " + _0x3fb443["status"] + " " + _0x3fb443["statusText"]);
    const _0x4f86a7 = await _0x3fb443["json"](), _0x27ee2e = Array["isArray"](_0x4f86a7) ? _0x4f86a7 : _0x4f86a7["object"] ?? [];
    return _0x27ee2e["map"]((_0x4f34b8) => this["normalizeAuthorizedLayer"](_0x4f34b8));
  }
  async ["getLayerList"]() {
    return this["getAuthorizedLayers"]();
  }
  ["canAddAuthorizedLayer"](_0x498467) {
    var _a2, _b;
    const _0x438338 = (_0x498467["servisTuru"] || "")["toUpperCase"]();
    if (!((_a2 = _0x498467["servisUrl"]) == null ? void 0 : _a2["trim"]()) || !this["resolveOgcLayerName"](_0x498467["ogcLayerName"], _0x498467["katmanAdi"])) return ![];
    if (_0x438338 === "WMTS") return !!((_b = _0x498467["wmtsTileMatrixSet"]) == null ? void 0 : _b["trim"]());
    return _0x438338 === "WMS" || _0x438338 === "WFS";
  }
  ["resolveAddOptions"](_0x1b1e41) {
    var _a2;
    if (!this["canAddAuthorizedLayer"](_0x1b1e41)) throw new LayerOperationError("LAYER_AUTHORIZED_ADD_MISSING_INFO", ((_a2 = _0x1b1e41["servisTuru"]) == null ? void 0 : _a2["toUpperCase"]()) === "WMTS" ? "WMTS için TileMatrixSet eksik." : "Eksik servis bilgisi.");
    const _0x34fc7b = _0x1b1e41["servisTuru"]["toUpperCase"](), _0x1aa415 = "authorized-" + this["authorizedLayerKey"](_0x1b1e41) + "-" + Date["now"](), _0x498108 = this["resolveOgcLayerName"](_0x1b1e41["ogcLayerName"], _0x1b1e41["katmanAdi"]), _0x553d1b = _0x1b1e41["katmanAdi"] || _0x498108;
    if (_0x34fc7b === "WMS") return { "layerType": "WMS", "options": { "id": _0x1aa415, "title": _0x553d1b, "url": _0x1b1e41["servisUrl"], "layers": _0x498108 } };
    if (_0x34fc7b === "WFS") return { "layerType": "WFS", "options": { "id": _0x1aa415, "title": _0x553d1b, "url": _0x1b1e41["servisUrl"], "typeName": _0x498108 } };
    return { "layerType": "WMTS", "options": { "id": _0x1aa415, "title": _0x553d1b, "url": _0x1b1e41["servisUrl"], "layer": _0x498108, "tileMatrixSetID": _0x1b1e41["wmtsTileMatrixSet"] } };
  }
  ["authorizedLayerKey"](_0x39b47e) {
    return _0x39b47e["id"] ?? _0x39b47e["servisTuru"] + "|" + _0x39b47e["servisUrl"] + "|" + _0x39b47e["ogcLayerName"];
  }
  ["normalizeAuthorizedLayer"](_0x3f300) {
    const _0x4cfa71 = this["resolveOgcLayerName"](_0x3f300["ogcLayerName"], _0x3f300["katmanAdi"]), _0x279159 = this["rewriteOpaqueOgcUrl"](_0x3f300["servisUrl"]), _0x5160e2 = _0x3f300["servisTuru"]["toUpperCase"]();
    return { ..._0x3f300, "servisTuru": _0x5160e2, ..._0x4cfa71 && _0x4cfa71 !== _0x3f300["ogcLayerName"] ? { "ogcLayerName": _0x4cfa71 } : {}, ..._0x279159 !== _0x3f300["servisUrl"] ? { "servisUrl": _0x279159 } : {} };
  }
  ["resolveOgcLayerName"](_0x58ba82, _0x10f72f) {
    for (const _0x225bc0 of [_0x58ba82, _0x10f72f]) {
      if (!_0x225bc0) continue;
      const _0x2b57ab = _0x225bc0["trim"]();
      if (!_0x2b57ab || _0x2b57ab["toLowerCase"]() === "undefined" || _0x2b57ab["toLowerCase"]() === "null") continue;
      return _0x2b57ab;
    }
    return "";
  }
  ["isTrustedApiKeyHost"](_0x53d7ca) {
    if (__privateGet(this, _apiKey) === void 0) return ![];
    return this["isKnownGatedUrl"](_0x53d7ca);
  }
  ["layerRequiresApiKey"](_0x987902) {
    return this["isKnownGatedUrl"](_0x987902);
  }
  ["isKnownGatedUrl"](_0x2444eb) {
    if (this["isOwnBackendUrl"](_0x2444eb)) return !![];
    if (this["trustedApiKeyHosts"] === void 0 || this["trustedApiKeyHosts"]["length"] === 0) return ![];
    try {
      return this["trustedApiKeyHosts"]["includes"](new URL(_0x2444eb)["hostname"]);
    } catch {
      return ![];
    }
  }
  ["isOwnBackendUrl"](_0x30bbb9) {
    try {
      const _0x486a58 = new URL(_0x30bbb9, window["location"]["origin"]), _0x271b45 = new URL(this["getApiBase"](), window["location"]["origin"]);
      if (_0x486a58["hostname"] !== _0x271b45["hostname"]) return ![];
      return _0x486a58["pathname"]["includes"]("/wms-proxy/") || _0x486a58["pathname"]["includes"]("/ogc/");
    } catch {
      return ![];
    }
  }
  ["rewriteOpaqueOgcUrl"](_0x21be0a) {
    if (!(_0x21be0a == null ? void 0 : _0x21be0a["includes"]("/ogc/"))) return _0x21be0a ?? "";
    const _0x47cbaa = _0x21be0a["indexOf"]("/ogc/"), _0x15489b = _0x21be0a["substring"](_0x47cbaa), _0x382880 = this["getApiBase"]()["replace"](/\/+$/, "");
    return "" + _0x382880 + _0x15489b;
  }
  ["resolveOgcProxyUrl"](_0x8283f, _0x3304db) {
    if (__privateGet(this, _apiKey) === void 0) return _0x3304db;
    if (_0x3304db["includes"]("/ogc/")) return this["rewriteOpaqueOgcUrl"](_0x3304db);
    if (_0x3304db["includes"]("/wms-proxy/")) return _0x3304db;
    const _0x51b851 = this["getApiBase"]()["replace"](/\/+$/, "") + "/wms-proxy/" + _0x8283f, _0x32df62 = _0x51b851["includes"]("?") ? "&" : "?";
    return "" + _0x51b851 + _0x32df62 + "url=" + encodeURIComponent(_0x3304db);
  }
  ["mergeApiKeyHeader"](_0x2ddf1a, _0x1c1588) {
    if (!this["isTrustedApiKeyHost"](_0x1c1588)) return _0x2ddf1a;
    return { ..._0x2ddf1a, [_ApiKeyPolicy["API_KEY_HEADER_NAME"]]: __privateGet(this, _apiKey) };
  }
  ["attachApiKeyToUrl"](_0x14ad42) {
    if (!this["isTrustedApiKeyHost"](_0x14ad42)) return _0x14ad42;
    const _0x124b55 = _0x14ad42["includes"]("?") ? "&" : "?";
    return "" + _0x14ad42 + _0x124b55 + _ApiKeyPolicy["API_KEY_QUERY_PARAM_NAME"] + "=" + encodeURIComponent(__privateGet(this, _apiKey));
  }
  ["buildAuthHeaders"](_0x1d4e54) {
    if (_0x1d4e54 === void 0) return void 0;
    return { "Authorization": "Bearer " + _0x1d4e54 };
  }
};
_apiKey = new WeakMap();
_ApiKeyPolicy["API_KEY_HEADER_NAME"] = "X-API-Key";
_ApiKeyPolicy["API_KEY_QUERY_PARAM_NAME"] = "tucbsapikey";
let ApiKeyPolicy = _ApiKeyPolicy;
function cartesianToLonLat(_0x5bca42) {
  const _0xe92437 = Cartographic["fromCartesian"](_0x5bca42);
  return [_0x494c90["toDegrees"](_0xe92437["longitude"]), _0x494c90["toDegrees"](_0xe92437["latitude"])];
}
function closeRing$1(_0x4086e6) {
  if (_0x4086e6["length"] === 0) return _0x4086e6;
  const _0x27e1b1 = _0x4086e6[0], _0x11c677 = _0x4086e6[_0x4086e6["length"] - 1];
  if (_0x27e1b1[0] === _0x11c677[0] && _0x27e1b1[1] === _0x11c677[1]) return _0x4086e6;
  return [..._0x4086e6, _0x27e1b1];
}
function entityToGeoJSON(_0x2793b1, _0x9affde = JulianDate["now"]()) {
  var _a2, _b, _c;
  const _0x573724 = ((_a2 = _0x2793b1["properties"]) == null ? void 0 : _a2["getValue"](_0x9affde)) ?? {}, _0x2f0809 = { ..._0x573724 };
  delete _0x2f0809["layerId"], delete _0x2f0809["featureId"];
  let _0x39b920 = null;
  if ((_b = _0x2793b1["polygon"]) == null ? void 0 : _b["hierarchy"]) {
    const _0x40b81a = _0x2793b1["polygon"]["hierarchy"]["getValue"](_0x9affde), _0x192248 = _0x40b81a == null ? void 0 : _0x40b81a["positions"];
    if (_0x192248 && _0x192248["length"] >= 3) {
      const _0x4e4ae4 = closeRing$1(_0x192248["map"](cartesianToLonLat));
      _0x39b920 = { "type": "Polygon", "coordinates": [_0x4e4ae4] };
    }
  } else {
    if ((_c = _0x2793b1["polyline"]) == null ? void 0 : _c["positions"]) {
      const _0xc01121 = _0x2793b1["polyline"]["positions"]["getValue"](_0x9affde);
      _0xc01121 && _0xc01121["length"] >= 2 && (_0x39b920 = { "type": "LineString", "coordinates": _0xc01121["map"](cartesianToLonLat) });
    } else {
      if (_0x2793b1["position"]) {
        const _0x59644c = _0x2793b1["position"]["getValue"](_0x9affde);
        _0x59644c && (_0x39b920 = { "type": "Point", "coordinates": cartesianToLonLat(_0x59644c) });
      }
    }
  }
  if (!_0x39b920) return null;
  return { "type": "Feature", "id": _0x2793b1["id"], "properties": _0x2f0809, "geometry": _0x39b920 };
}
function featureLabel(_0x263169) {
  var _a2;
  const _0x58cc68 = ((_a2 = _0x263169["geometry"]) == null ? void 0 : _a2["type"]) ?? "Feature", _0x148420 = _0x263169["id"] != null ? String(_0x263169["id"]) : "";
  return _0x148420 ? _0x58cc68 + " " + _0x148420 : _0x58cc68;
}
function triggerDownload(_0x3d33a9, _0xf54b54) {
  const _0x385e4f = URL["createObjectURL"](_0x3d33a9), _0x243dfc = document["createElement"]("a");
  _0x243dfc["href"] = _0x385e4f, _0x243dfc["download"] = _0xf54b54, document["body"]["appendChild"](_0x243dfc), _0x243dfc["click"](), _0x243dfc["remove"](), setTimeout(() => URL["revokeObjectURL"](_0x385e4f), 1e3);
}
function featureCollectionToKml(_0x44d093) {
  const _0x46c3e6 = _0x44d093["features"]["map"]((_0x8dc45, _0x1477b6) => featureToKml(_0x8dc45, _0x1477b6))["join"]("");
  return '<?xml version="1.0" encoding="UTF-8"?>\n<kml xmlns="http://www.opengis.net/kml/2.2"><Document>' + _0x46c3e6 + "</Document></kml>";
}
function featureCollectionToShapefileZip(_0x408db7) {
  const _0x1cb4bc = collectShpRecords(_0x408db7), _0x3e746c = writeShp(_0x1cb4bc), _0x198600 = writeShx(_0x1cb4bc), _0x4113f8 = writeDbf(_0x1cb4bc["map"]((_0x2ce7e2) => _0x2ce7e2["name"]));
  return zipStore([{ "name": "export.shp", "data": _0x3e746c }, { "name": "export.shx", "data": _0x198600 }, { "name": "export.dbf", "data": _0x4113f8 }]);
}
function featureToKml(_0x3055fc, _0x4e747b) {
  const _0x5d8cd4 = xmlEscape(featureName(_0x3055fc, _0x4e747b)), _0x1d9452 = geometryToKml(_0x3055fc["geometry"]);
  if (!_0x1d9452) return "";
  return "<Placemark><name>" + _0x5d8cd4 + "</name>" + _0x1d9452 + "</Placemark>";
}
function geometryToKml(_0x2cad33) {
  if (!_0x2cad33) return "";
  switch (_0x2cad33["type"]) {
    case "Point":
      return "<Point><coordinates>" + coord(_0x2cad33["coordinates"]) + "</coordinates></Point>";
    case "MultiPoint":
      return "<MultiGeometry>" + _0x2cad33["coordinates"]["map"]((_0x121564) => "<Point><coordinates>" + coord(_0x121564) + "</coordinates></Point>")["join"]("") + "</MultiGeometry>";
    case "LineString":
      return "<LineString><coordinates>" + line(_0x2cad33["coordinates"]) + "</coordinates></LineString>";
    case "MultiLineString":
      return "<MultiGeometry>" + _0x2cad33["coordinates"]["map"]((_0x318be5) => "<LineString><coordinates>" + line(_0x318be5) + "</coordinates></LineString>")["join"]("") + "</MultiGeometry>";
    case "Polygon":
      return polygonKml(_0x2cad33["coordinates"]);
    case "MultiPolygon":
      return "<MultiGeometry>" + _0x2cad33["coordinates"]["map"]((_0xed40a0) => polygonKml(_0xed40a0))["join"]("") + "</MultiGeometry>";
    case "GeometryCollection":
      return "<MultiGeometry>" + _0x2cad33["geometries"]["map"]((_0x27963b) => geometryToKml(_0x27963b))["join"]("") + "</MultiGeometry>";
    default:
      return "";
  }
}
function polygonKml(_0x52e04c) {
  const [_0xfb58c, ..._0x440aa9] = _0x52e04c;
  if (!_0xfb58c) return "";
  const _0xdc0b3e = _0x440aa9["map"]((_0x3fdd6f) => "<innerBoundaryIs><LinearRing><coordinates>" + line(_0x3fdd6f) + "</coordinates></LinearRing></innerBoundaryIs>")["join"]("");
  return "<Polygon><outerBoundaryIs><LinearRing><coordinates>" + line(_0xfb58c) + "</coordinates></LinearRing></outerBoundaryIs>" + _0xdc0b3e + "</Polygon>";
}
function coord(_0x1c077c) {
  return _0x1c077c[0] + "," + _0x1c077c[1] + ",0";
}
function line(_0x5dd367) {
  return _0x5dd367["map"](coord)["join"](" ");
}
function xmlEscape(_0x1afda5) {
  return _0x1afda5["replaceAll"]("&", "&amp;")["replaceAll"]("<", "&lt;")["replaceAll"](">", "&gt;")["replaceAll"]('"', "&quot;");
}
function collectShpRecords(_0x38588e) {
  const _0xd31195 = firstKind(_0x38588e);
  if (!_0xd31195) return [];
  const _0x486deb = [];
  return _0x38588e["features"]["forEach"]((_0xd3901e, _0x39495b) => {
    for (const _0x1f15cf of ringsForKind(_0xd3901e["geometry"], _0xd31195)) {
      const _0x5854be = _0x1f15cf["map"](closeRing), _0x341f33 = _0xd31195 === 5 ? orientPolygon(_0x5854be) : _0x5854be;
      _0x486deb["push"]({ "kind": _0xd31195, "name": featureName(_0xd3901e, _0x39495b), "rings": _0x341f33, "bbox": bboxOf(_0x341f33) });
    }
  }), _0x486deb;
}
function firstKind(_0x11c134) {
  for (const _0x2c3df0 of _0x11c134["features"]) {
    const _0x2eb3f2 = kindOf(_0x2c3df0["geometry"]);
    if (_0x2eb3f2) return _0x2eb3f2;
  }
  return null;
}
function kindOf(_0x2e27e5) {
  if (!_0x2e27e5) return null;
  switch (_0x2e27e5["type"]) {
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
      for (const _0x545dbd of _0x2e27e5["geometries"]) {
        const _0x3d7adb = kindOf(_0x545dbd);
        if (_0x3d7adb) return _0x3d7adb;
      }
      return null;
    default:
      return null;
  }
}
function ringsForKind(_0x3aaf0b, _0x34c657) {
  if (!_0x3aaf0b || kindOf(_0x3aaf0b) !== _0x34c657) {
    if ((_0x3aaf0b == null ? void 0 : _0x3aaf0b["type"]) === "GeometryCollection") return _0x3aaf0b["geometries"]["flatMap"]((_0x1a62ed) => ringsForKind(_0x1a62ed, _0x34c657));
    return [];
  }
  switch (_0x3aaf0b["type"]) {
    case "Point":
      return [[[_0x3aaf0b["coordinates"]]]];
    case "MultiPoint":
      return _0x3aaf0b["coordinates"]["map"]((_0x31334d) => [[_0x31334d]]);
    case "LineString":
      return [[_0x3aaf0b["coordinates"]]];
    case "MultiLineString":
      return [_0x3aaf0b["coordinates"]];
    case "Polygon":
      return [_0x3aaf0b["coordinates"]];
    case "MultiPolygon":
      return _0x3aaf0b["coordinates"];
    default:
      return [];
  }
}
function closeRing(_0x473108) {
  const _0x245288 = _0x473108[0], _0x1ade8c = _0x473108[_0x473108["length"] - 1];
  if (!_0x245288 || !_0x1ade8c) return _0x473108;
  if (_0x245288[0] === _0x1ade8c[0] && _0x245288[1] === _0x1ade8c[1]) return _0x473108;
  return [..._0x473108, _0x245288];
}
function orientPolygon(_0x211925) {
  return _0x211925["map"]((_0x48b412, _0x2e8a9a) => {
    const _0x4f6cde = signedArea(_0x48b412), _0x30ee3c = _0x2e8a9a === 0, _0x3c9adc = _0x4f6cde < 0;
    if (_0x30ee3c === _0x3c9adc) return _0x48b412;
    return [..._0x48b412]["reverse"]();
  });
}
function signedArea(_0x3504ce) {
  let _0x2b5197 = 0;
  for (let _0x471d82 = 0; _0x471d82 < _0x3504ce["length"] - 1; _0x471d82++) {
    const _0x1fc4ee = _0x3504ce[_0x471d82], _0x6e22e5 = _0x3504ce[_0x471d82 + 1], _0x50fa39 = _0x1fc4ee == null ? void 0 : _0x1fc4ee[0], _0x4600e0 = _0x1fc4ee == null ? void 0 : _0x1fc4ee[1], _0x159c72 = _0x6e22e5 == null ? void 0 : _0x6e22e5[0], _0x4c8335 = _0x6e22e5 == null ? void 0 : _0x6e22e5[1];
    if (_0x50fa39 === void 0 || _0x4600e0 === void 0 || _0x159c72 === void 0 || _0x4c8335 === void 0) continue;
    _0x2b5197 += _0x50fa39 * _0x4c8335 - _0x159c72 * _0x4600e0;
  }
  return _0x2b5197 / 2;
}
function bboxOf(_0x2840b2) {
  let _0x3e9ad2 = Infinity, _0x5d99e5 = Infinity, _0x2f7c32 = -Infinity, _0x4e491c = -Infinity;
  for (const _0x12df3c of _0x2840b2) {
    for (const _0x4c5321 of _0x12df3c) {
      const [_0x32c8af, _0x4cae51] = xy(_0x4c5321);
      _0x3e9ad2 = Math["min"](_0x3e9ad2, _0x32c8af), _0x5d99e5 = Math["min"](_0x5d99e5, _0x4cae51), _0x2f7c32 = Math["max"](_0x2f7c32, _0x32c8af), _0x4e491c = Math["max"](_0x4e491c, _0x4cae51);
    }
  }
  if (!Number["isFinite"](_0x3e9ad2)) return [0, 0, 0, 0];
  return [_0x3e9ad2, _0x5d99e5, _0x2f7c32, _0x4e491c];
}
function featureName(_0x41132a, _0x499f88) {
  const _0x58e50e = _0x41132a["properties"], _0x5b61f5 = _0x58e50e && typeof _0x58e50e["name"] === "string" ? _0x58e50e["name"] : "";
  return _0x5b61f5 || "feature-" + (_0x499f88 + 1);
}
function writeShp(_0x21b0e4) {
  const _0x37b194 = _0x21b0e4["map"](recordBody), _0x4a547d = _0x37b194["reduce"]((_0x3653f2, _0x5ee086) => _0x3653f2 + 8 + _0x5ee086["length"], 0), _0x25f8e8 = new Uint8Array(100 + _0x4a547d), _0x4ba9df = new DataView(_0x25f8e8["buffer"]);
  writeHeader(_0x4ba9df, _0x25f8e8["length"], _0x21b0e4);
  let _0x32070c = 100;
  return _0x37b194["forEach"]((_0x5205bd, _0x1bc11c) => {
    _0x4ba9df["setInt32"](_0x32070c, _0x1bc11c + 1, ![]), _0x4ba9df["setInt32"](_0x32070c + 4, _0x5205bd["length"] / 2, ![]), _0x25f8e8["set"](_0x5205bd, _0x32070c + 8), _0x32070c += 8 + _0x5205bd["length"];
  }), _0x25f8e8;
}
function writeShx(_0x289efa) {
  const _0x438652 = new Uint8Array(100 + _0x289efa["length"] * 8), _0x532a0f = new DataView(_0x438652["buffer"]);
  writeHeader(_0x532a0f, _0x438652["length"], _0x289efa);
  let _0x25019b = 50;
  return _0x289efa["forEach"]((_0x4b5a39, _0x3a6d4f) => {
    const _0xa2610c = recordBody(_0x4b5a39)["length"] / 2;
    _0x532a0f["setInt32"](100 + _0x3a6d4f * 8, _0x25019b, ![]), _0x532a0f["setInt32"](100 + _0x3a6d4f * 8 + 4, _0xa2610c, ![]), _0x25019b += 4 + _0xa2610c;
  }), _0x438652;
}
function writeHeader(_0x422bde, _0x386f7c, _0x548427) {
  var _a2;
  _0x422bde["setInt32"](0, 9994, ![]), _0x422bde["setInt32"](24, _0x386f7c / 2, ![]), _0x422bde["setInt32"](28, 1e3, !![]), _0x422bde["setInt32"](32, ((_a2 = _0x548427[0]) == null ? void 0 : _a2["kind"]) ?? 5, !![]);
  const _0x494aac = unionBbox(_0x548427);
  _0x422bde["setFloat64"](36, _0x494aac[0], !![]), _0x422bde["setFloat64"](44, _0x494aac[1], !![]), _0x422bde["setFloat64"](52, _0x494aac[2], !![]), _0x422bde["setFloat64"](60, _0x494aac[3], !![]);
}
function unionBbox(_0x1551d6) {
  if (_0x1551d6["length"] === 0) return [0, 0, 0, 0];
  let _0x203702 = Infinity, _0x2e7464 = Infinity, _0x1649fe = -Infinity, _0x1d5ab9 = -Infinity;
  for (const _0x166d8f of _0x1551d6) {
    _0x203702 = Math["min"](_0x203702, _0x166d8f["bbox"][0]), _0x2e7464 = Math["min"](_0x2e7464, _0x166d8f["bbox"][1]), _0x1649fe = Math["max"](_0x1649fe, _0x166d8f["bbox"][2]), _0x1d5ab9 = Math["max"](_0x1d5ab9, _0x166d8f["bbox"][3]);
  }
  return [_0x203702, _0x2e7464, _0x1649fe, _0x1d5ab9];
}
function xy(_0x5cedd0) {
  return [_0x5cedd0[0] ?? 0, _0x5cedd0[1] ?? 0];
}
function recordBody(_0x3f405) {
  var _a2;
  if (_0x3f405["kind"] === 1) {
    const _0x5ce49f = new Uint8Array(20), _0x1c9e97 = new DataView(_0x5ce49f["buffer"]);
    _0x1c9e97["setInt32"](0, 1, !![]);
    const [_0x28ff3c, _0x3c55a3] = xy(((_a2 = _0x3f405["rings"][0]) == null ? void 0 : _a2[0]) ?? [0, 0]);
    return _0x1c9e97["setFloat64"](4, _0x28ff3c, !![]), _0x1c9e97["setFloat64"](12, _0x3c55a3, !![]), _0x5ce49f;
  }
  const _0xdda708 = _0x3f405["rings"]["reduce"]((_0x209aff, _0x2a42f4) => _0x209aff + _0x2a42f4["length"], 0), _0x592893 = new Uint8Array(44 + _0x3f405["rings"]["length"] * 4 + _0xdda708 * 16), _0x8446cb = new DataView(_0x592893["buffer"]);
  _0x8446cb["setInt32"](0, _0x3f405["kind"], !![]), _0x8446cb["setFloat64"](4, _0x3f405["bbox"][0], !![]), _0x8446cb["setFloat64"](12, _0x3f405["bbox"][1], !![]), _0x8446cb["setFloat64"](20, _0x3f405["bbox"][2], !![]), _0x8446cb["setFloat64"](28, _0x3f405["bbox"][3], !![]), _0x8446cb["setInt32"](36, _0x3f405["rings"]["length"], !![]), _0x8446cb["setInt32"](40, _0xdda708, !![]);
  let _0x109994 = 0;
  _0x3f405["rings"]["forEach"]((_0x4eebaa, _0xeb45f) => {
    _0x8446cb["setInt32"](44 + _0xeb45f * 4, _0x109994, !![]), _0x109994 += _0x4eebaa["length"];
  });
  let _0x349fcb = 44 + _0x3f405["rings"]["length"] * 4;
  for (const _0x134dc3 of _0x3f405["rings"]) {
    for (const _0x4ce32e of _0x134dc3) {
      const [_0x4e8e6b, _0x482559] = xy(_0x4ce32e);
      _0x8446cb["setFloat64"](_0x349fcb, _0x4e8e6b, !![]), _0x8446cb["setFloat64"](_0x349fcb + 8, _0x482559, !![]), _0x349fcb += 16;
    }
  }
  return _0x592893;
}
function writeDbf(_0x448119) {
  const _0x315765 = 32 + 32 + 1, _0x2acb1d = 1 + 80, _0x2fc199 = new Uint8Array(_0x315765 + _0x448119["length"] * _0x2acb1d + 1), _0x4f7df2 = new DataView(_0x2fc199["buffer"]);
  _0x2fc199[0] = 3, _0x4f7df2["setUint32"](4, _0x448119["length"], !![]), _0x4f7df2["setUint16"](8, _0x315765, !![]), _0x4f7df2["setUint16"](10, _0x2acb1d, !![]);
  const _0x7a2902 = new TextEncoder()["encode"]("NAME");
  _0x2fc199["set"](_0x7a2902, 32), _0x2fc199[32 + 11] = "C"["charCodeAt"](0), _0x2fc199[32 + 16] = 80, _0x2fc199[32 + 32] = 13;
  const _0x3604d2 = new TextEncoder();
  return _0x448119["forEach"]((_0x4e604d, _0x23c70d) => {
    const _0x593a4f = _0x315765 + _0x23c70d * _0x2acb1d;
    _0x2fc199[_0x593a4f] = 32;
    const _0x131a8e = _0x3604d2["encode"](_0x4e604d)["slice"](0, 80);
    _0x2fc199["set"](_0x131a8e, _0x593a4f + 1);
    for (let _0x491c92 = 1 + _0x131a8e["length"]; _0x491c92 < _0x2acb1d; _0x491c92++) _0x2fc199[_0x593a4f + _0x491c92] = 32;
  }), _0x2fc199[_0x2fc199["length"] - 1] = 26, _0x2fc199;
}
function zipStore(_0x58d68e) {
  const _0x187391 = new TextEncoder(), _0x2d43e9 = [], _0x5a8a41 = [];
  let _0x5d82e1 = 0;
  for (const _0x47428b of _0x58d68e) {
    const _0x4beb21 = _0x187391["encode"](_0x47428b["name"]), _0x5ca954 = crc32(_0x47428b["data"]), _0x334102 = new Uint8Array(30 + _0x4beb21["length"] + _0x47428b["data"]["length"]), _0x11262d = new DataView(_0x334102["buffer"]);
    _0x11262d["setUint32"](0, 67324752, !![]), _0x11262d["setUint16"](4, 20, !![]), _0x11262d["setUint16"](8, 0, !![]), _0x11262d["setUint32"](14, _0x5ca954, !![]), _0x11262d["setUint32"](18, _0x47428b["data"]["length"], !![]), _0x11262d["setUint32"](22, _0x47428b["data"]["length"], !![]), _0x11262d["setUint16"](26, _0x4beb21["length"], !![]), _0x334102["set"](_0x4beb21, 30), _0x334102["set"](_0x47428b["data"], 30 + _0x4beb21["length"]), _0x2d43e9["push"](_0x334102);
    const _0x399565 = new Uint8Array(46 + _0x4beb21["length"]), _0x5bc1a8 = new DataView(_0x399565["buffer"]);
    _0x5bc1a8["setUint32"](0, 33639248, !![]), _0x5bc1a8["setUint16"](4, 20, !![]), _0x5bc1a8["setUint16"](6, 20, !![]), _0x5bc1a8["setUint16"](10, 0, !![]), _0x5bc1a8["setUint32"](16, _0x5ca954, !![]), _0x5bc1a8["setUint32"](20, _0x47428b["data"]["length"], !![]), _0x5bc1a8["setUint32"](24, _0x47428b["data"]["length"], !![]), _0x5bc1a8["setUint16"](28, _0x4beb21["length"], !![]), _0x5bc1a8["setUint32"](42, _0x5d82e1, !![]), _0x399565["set"](_0x4beb21, 46), _0x5a8a41["push"](_0x399565), _0x5d82e1 += _0x334102["length"];
  }
  const _0x10c977 = _0x5a8a41["reduce"]((_0x163bd1, _0x4dc455) => _0x163bd1 + _0x4dc455["length"], 0), _0x47e05b = new Uint8Array(22), _0x1c8efe = new DataView(_0x47e05b["buffer"]);
  return _0x1c8efe["setUint32"](0, 101010256, !![]), _0x1c8efe["setUint16"](8, _0x58d68e["length"], !![]), _0x1c8efe["setUint16"](10, _0x58d68e["length"], !![]), _0x1c8efe["setUint32"](12, _0x10c977, !![]), _0x1c8efe["setUint32"](16, _0x5d82e1, !![]), concat([..._0x2d43e9, ..._0x5a8a41, _0x47e05b]);
}
function crc32(_0x2e71b7) {
  let _0x1938ca = 4294967295;
  for (const _0x221b4a of _0x2e71b7) {
    _0x1938ca ^= _0x221b4a;
    for (let _0x135da4 = 0; _0x135da4 < 8; _0x135da4++) {
      _0x1938ca = _0x1938ca >>> 1 ^ ((_0x1938ca & 1) === 1 ? 3988292384 : 0);
    }
  }
  return (_0x1938ca ^ 4294967295) >>> 0;
}
function concat(_0x23bf93) {
  const _0x44af37 = _0x23bf93["reduce"]((_0x120650, _0x34d136) => _0x120650 + _0x34d136["length"], 0), _0x20c09c = new Uint8Array(_0x44af37);
  let _0x464fcf = 0;
  for (const _0x4dde26 of _0x23bf93) {
    _0x20c09c["set"](_0x4dde26, _0x464fcf), _0x464fcf += _0x4dde26["length"];
  }
  return _0x20c09c;
}
function getLayerGeoJSON(_0x79436b, _0x24460a, _0x19785a) {
  if (!("entities" in _0x79436b["cesiumObject"])) return void 0;
  const _0x5b1a19 = _0x79436b["cesiumObject"]["entities"]["values"]["filter"]((_0x3047fd) => !_0x19785a(_0x3047fd))["map"]((_0x1c9a82) => entityToGeoJSON(_0x1c9a82, _0x24460a))["filter"]((_0x1180db) => _0x1180db !== null);
  return { "type": "FeatureCollection", "features": _0x5b1a19 };
}
function exportLayerVector(_0x360c18, _0x15d719, _0x236b0f) {
  if (!_0x360c18) return;
  const _0x1437df = vectorFile(_0x360c18, _0x236b0f);
  triggerDownload(_0x1437df["blob"], _0x15d719 + "-" + Date["now"]() + "." + _0x1437df["extension"]);
}
function exportLayerGeoJSON(_0x5a5e8e, _0x531e52) {
  exportLayerVector(_0x5a5e8e, _0x531e52, "geojson");
}
function exportLayerKml(_0x4fd706, _0x1d329f) {
  exportLayerVector(_0x4fd706, _0x1d329f, "kml");
}
function exportLayerShapefile(_0x326fd7, _0x1ef950) {
  exportLayerVector(_0x326fd7, _0x1ef950, "shp");
}
function bytesAsBuffer(_0x3a0c5a) {
  return _0x3a0c5a["buffer"]["slice"](_0x3a0c5a["byteOffset"], _0x3a0c5a["byteOffset"] + _0x3a0c5a["byteLength"]);
}
function vectorFile(_0x2abbf0, _0x2d2c79) {
  if (_0x2d2c79 === "kml") return { "blob": new Blob([featureCollectionToKml(_0x2abbf0)], { "type": "application/vnd.google-earth.kml+xml" }), "extension": "kml" };
  if (_0x2d2c79 === "shp") return { "blob": new Blob([bytesAsBuffer(featureCollectionToShapefileZip(_0x2abbf0))], { "type": "application/zip" }), "extension": "zip" };
  return { "blob": new Blob([JSON["stringify"](_0x2abbf0, null, 2)], { "type": "application/geo+json" }), "extension": "geojson" };
}
const GEOTIFF_EXPORT_MAX_WMS_DIMENSION = 2048;
function geoTiffExportDimensions(_0x431d97, _0x3a4645) {
  if (!_0x431d97) return { "width": _0x3a4645, "height": Math["round"](_0x3a4645 / 2) };
  const _0x1f731b = Math["max"](_0x431d97["east"] - _0x431d97["west"], 1e-6), _0x31d410 = Math["max"](_0x431d97["north"] - _0x431d97["south"], 1e-6), _0x3bcae2 = _0x1f731b >= _0x31d410 ? _0x3a4645 : Math["max"](64, Math["round"](_0x3a4645 * _0x1f731b / _0x31d410)), _0x4811f4 = _0x31d410 >= _0x1f731b ? _0x3a4645 : Math["max"](64, Math["round"](_0x3a4645 * _0x31d410 / _0x1f731b));
  return { "width": _0x3bcae2, "height": _0x4811f4 };
}
function buildWmsGeoTiffExportUrl(_0x1d76aa, _0x14a441) {
  const _0x1b69ec = _0x14a441("wms", _0x1d76aa["url"]), { width: _0x377794, height: _0x5c8e8c } = geoTiffExportDimensions(_0x1d76aa["geographicBoundingBox"], GEOTIFF_EXPORT_MAX_WMS_DIMENSION), _0x4bf3c4 = _0x1d76aa["geographicBoundingBox"], _0x7fad57 = new URLSearchParams({ "SERVICE": "WMS", "REQUEST": "GetMap", "VERSION": "1.3.0", "LAYERS": _0x1d76aa["layers"], "STYLES": "", "FORMAT": _0x1d76aa["tiffFormat"], "TRANSPARENT": "false", "WIDTH": String(_0x377794), "HEIGHT": String(_0x5c8e8c), "CRS": "CRS:84", "BBOX": _0x4bf3c4 ? _0x4bf3c4["west"] + "," + _0x4bf3c4["south"] + "," + _0x4bf3c4["east"] + "," + _0x4bf3c4["north"] : "-180,-90,180,90" }), _0x5e7ddb = _0x1b69ec["includes"]("?") ? "&" : "?";
  return "" + _0x1b69ec + _0x5e7ddb + _0x7fad57["toString"]();
}
function buildWcsGeoTiffExportUrl(_0x38f07e, _0x1e7ec6) {
  const _0x2a804e = _0x1e7ec6("wcs", _0x38f07e["url"]), _0x12ce70 = _0x38f07e["version"] ?? "2.0.1", _0x5b4e08 = { "service": "WCS", "version": _0x12ce70, "request": "GetCoverage", "coverageId": _0x38f07e["coverageId"], "format": _0x38f07e["tiffFormat"] };
  if (_0x12ce70["startsWith"]("2.")) {
    const _0x40b92c = _0x38f07e["maxSize"] ?? 2048;
    if (Number["isFinite"](_0x40b92c)) _0x5b4e08["SCALESIZE"] = "x(" + _0x40b92c + "),y(" + _0x40b92c + ")";
  }
  const _0x273b23 = _0x2a804e["includes"]("?") ? "&" : "?";
  return "" + _0x2a804e + _0x273b23 + new URLSearchParams(_0x5b4e08)["toString"]();
}
function isGeoTiffExportAvailable(_0x529b60, _0x526a96) {
  if (!_0x529b60 || _0x529b60["layerType"] !== "WMS" && _0x529b60["layerType"] !== "WCS") return ![];
  return !!_0x526a96 && "tiffFormat" in _0x526a96 && !!_0x526a96["tiffFormat"];
}
async function exportLayerAsGeoTiff(_0x5310e6, _0x1c83bf, _0x505976, _0x41c121, _0x2bc851) {
  if (_0x5310e6["layerType"] !== "WMS" && _0x5310e6["layerType"] !== "WCS") throw new LayerOperationError("LAYER_GEOTIFF_EXPORT_UNSUPPORTED_TYPE", 'Katman WMS/WCS değil, GeoTIFF export desteklenmiyor: "' + _0x5310e6["id"] + '"');
  if (!_0x1c83bf || !("tiffFormat" in _0x1c83bf) || !_0x1c83bf["tiffFormat"]) throw new LayerOperationError("LAYER_GEOTIFF_EXPORT_NOT_CONFIGURED", 'Katman GeoTIFF export desteklemiyor: "' + _0x5310e6["id"] + '"');
  const _0x398259 = _0x5310e6["layerType"] === "WMS" ? buildWmsGeoTiffExportUrl(_0x1c83bf, _0x41c121) : buildWcsGeoTiffExportUrl(_0x1c83bf, _0x41c121), _0x34fd14 = _0x2bc851["mergeApiKeyHeader"](_0x2bc851["buildAuthHeaders"](_0x1c83bf["authToken"]), _0x398259), _0x192fe2 = await fetch(_0x398259, _0x34fd14 ? { "headers": _0x34fd14 } : void 0);
  if (!_0x192fe2["ok"]) throw new OgcRequestError("OGC_GEOTIFF_DOWNLOAD_FAILED", "GeoTIFF indirilemedi: " + _0x192fe2["status"] + " " + _0x192fe2["statusText"]);
  const _0xe83afa = _0x192fe2["headers"]["get"]("content-type") ?? "", _0x1505e5 = await _0x192fe2["arrayBuffer"](), _0x826e59 = /boundary="?([^";]+)"?/i["exec"](_0xe83afa);
  let _0x13c525;
  if (_0xe83afa["includes"]("multipart/") && _0x826e59) {
    const { bytes: _0x34c7f3, mimeType: _0x5052b7 } = extractMultipartImage(new Uint8Array(_0x1505e5), _0x826e59[1]), _0x359269 = _0x34c7f3["buffer"]["slice"](_0x34c7f3["byteOffset"], _0x34c7f3["byteOffset"] + _0x34c7f3["byteLength"]);
    _0x13c525 = new Blob([_0x359269], { "type": _0x5052b7 });
  } else _0x13c525 = new Blob([_0x1505e5], { "type": _0xe83afa || _0x1c83bf["tiffFormat"] });
  triggerDownload(_0x13c525, _0x505976 + "-" + Date["now"]() + ".tif");
}
function extractMultipartImage(_0x505943, _0x4189d3) {
  var _a2;
  const _0x411195 = new TextDecoder("iso-8859-1")["decode"](_0x505943), _0x473800 = "--" + _0x4189d3;
  let _0xff0062 = 0;
  while (_0xff0062 < _0x411195["length"]) {
    const _0x2d0fd7 = _0x411195["indexOf"](_0x473800, _0xff0062);
    if (_0x2d0fd7 === -1) break;
    const _0x402b44 = _0x2d0fd7 + _0x473800["length"], _0x3af0de = _0x411195["indexOf"](_0x473800, _0x402b44);
    if (_0x3af0de === -1) break;
    const _0x19ad5b = _0x411195["indexOf"]("\r\n\r\n", _0x402b44), _0x3a7c98 = _0x411195["indexOf"]("\n\n", _0x402b44), _0x2e4c83 = _0x19ad5b !== -1 && (_0x3a7c98 === -1 || _0x19ad5b <= _0x3a7c98) ? _0x19ad5b : _0x3a7c98, _0x40eec7 = _0x2e4c83 === _0x19ad5b ? 4 : 2;
    if (_0x2e4c83 === -1 || _0x2e4c83 >= _0x3af0de) {
      _0xff0062 = _0x3af0de;
      continue;
    }
    const _0x2be6d0 = /content-type:\s*([^\r\n;]+)/i["exec"](_0x411195["slice"](_0x402b44, _0x2e4c83)), _0x1a06a2 = (_a2 = _0x2be6d0 == null ? void 0 : _0x2be6d0[1]) == null ? void 0 : _a2["trim"]();
    if (_0x1a06a2 == null ? void 0 : _0x1a06a2["startsWith"]("image/")) {
      const _0x43b815 = _0x2e4c83 + _0x40eec7;
      let _0x236ca7 = _0x3af0de;
      if (_0x411195[_0x236ca7 - 2] === "\r" && _0x411195[_0x236ca7 - 1] === "\n") _0x236ca7 -= 2;
      else {
        if (_0x411195[_0x236ca7 - 1] === "\n") _0x236ca7 -= 1;
      }
      return { "bytes": _0x505943["slice"](_0x43b815, _0x236ca7), "mimeType": _0x1a06a2 };
    }
    _0xff0062 = _0x3af0de;
  }
  throw new OgcRequestError("OGC_WCS_MULTIPART_IMAGE_NOT_FOUND", "Multipart WCS yanıtında görsel parçası bulunamadı.");
}
const POLE_SLICE_DEGREES = 90, POLE_LATITUDE_LIMIT = 89.9;
function clipRingToLongitude(_0x5cc0a4, _0x218357, _0x36dc7d) {
  const _0x560ba9 = (_0x1b2876) => _0x36dc7d * (_0x1b2876[0] - _0x218357) >= 0, _0x10ec43 = [], _0x37c147 = (_0x52dd0b) => {
    const _0x1c061c = _0x10ec43[_0x10ec43["length"] - 1];
    if (_0x1c061c === void 0 || _0x1c061c[0] !== _0x52dd0b[0] || _0x1c061c[1] !== _0x52dd0b[1]) _0x10ec43["push"]([_0x52dd0b[0], _0x52dd0b[1]]);
  };
  for (let _0x4cbef3 = 0; _0x4cbef3 < _0x5cc0a4["length"] - 1; _0x4cbef3++) {
    const _0x12f4d0 = _0x5cc0a4[_0x4cbef3], _0x2b593c = _0x5cc0a4[_0x4cbef3 + 1];
    if (_0x560ba9(_0x12f4d0)) _0x37c147(_0x12f4d0);
    if (_0x560ba9(_0x12f4d0) !== _0x560ba9(_0x2b593c)) {
      const _0x5b7f74 = (_0x218357 - _0x12f4d0[0]) / (_0x2b593c[0] - _0x12f4d0[0]);
      _0x37c147([_0x218357, _0x12f4d0[1] + _0x5b7f74 * (_0x2b593c[1] - _0x12f4d0[1])]);
    }
  }
  if (_0x10ec43["length"] > 0) _0x37c147(_0x10ec43[0]);
  return _0x10ec43;
}
const _OutlineGeometry = class _OutlineGeometry {
  constructor(_0x1c5710) {
    this["outlineCompanionEntities"] = /* @__PURE__ */ new WeakSet(), this["entitiesWithOutlineCompanion"] = /* @__PURE__ */ new WeakSet(), this["entitiesWithRiskyOutline"] = /* @__PURE__ */ new WeakSet(), this["getCurrentTime"] = _0x1c5710["getCurrentTime"];
  }
  ["isOutlineCompanion"](_0x445142) {
    return this["outlineCompanionEntities"]["has"](_0x445142);
  }
  ["hasOutlineCompanion"](_0x14acce) {
    return this["entitiesWithOutlineCompanion"]["has"](_0x14acce);
  }
  ["hasRiskyOutline"](_0x1d0e24) {
    return this["entitiesWithRiskyOutline"]["has"](_0x1d0e24);
  }
  ["addPolygonOutlines"](_0x398686, _0x1c7f0b, _0x19e2cf) {
    const _0x56139f = _0x398686["entities"]["values"]["filter"]((_0xc736ce) => _0xc736ce["polygon"] !== void 0 && !this["entitiesWithRiskyOutline"]["has"](_0xc736ce));
    _0x398686["entities"]["suspendEvents"]();
    for (const _0x10e4bd of _0x56139f) {
      this["addPolygonOutlineCompanion"](_0x398686, _0x10e4bd, _0x1c7f0b, _0x19e2cf, !![]);
    }
    _0x398686["entities"]["resumeEvents"]();
  }
  ["addPolygonOutlineCompanion"](_0x44cfb8, _0x3dd56b, _0x4b853c, _0x2beefb, _0x53ad3c) {
    var _a2;
    const _0x4737bf = this["getCurrentTime"](), _0x409ac6 = (_a2 = _0x3dd56b["polygon"]["hierarchy"]) == null ? void 0 : _a2["getValue"](_0x4737bf), _0x45d44c = _0x409ac6 == null ? void 0 : _0x409ac6["positions"], _0x1c669f = _0x45d44c == null ? void 0 : _0x45d44c[0];
    if (_0x45d44c === void 0 || _0x45d44c["length"] < 2 || _0x1c669f === void 0) return;
    _0x3dd56b["polygon"]["outline"] = new ConstantProperty(![]), this["entitiesWithOutlineCompanion"]["add"](_0x3dd56b);
    const _0x157bff = _OutlineGeometry["simplifyOutlinePositions"]([..._0x45d44c, _0x1c669f]), _0x38ed17 = _0x44cfb8["entities"]["add"]({ "id": _0x3dd56b["id"] + "::outline", "polyline": { "positions": _0x157bff, "clampToGround": _0x53ad3c, "width": _0x2beefb, "material": _0x4b853c } });
    this["outlineCompanionEntities"]["add"](_0x38ed17), _0x38ed17["properties"] = new PropertyBag({ "__tucbsOutlineOf": _0x3dd56b["id"] });
  }
  ["disableRiskyPolygonOutlines"](_0x43306c) {
    var _a2, _b;
    const _0x261851 = JulianDate["now"]();
    _0x43306c["entities"]["suspendEvents"]();
    for (const _0x3f7f05 of [..._0x43306c["entities"]["values"]]) {
      const _0x3d4651 = _0x3f7f05["polygon"], _0x76337e = (_a2 = _0x3d4651 == null ? void 0 : _0x3d4651["hierarchy"]) == null ? void 0 : _a2["getValue"](_0x261851);
      if (_0x3d4651 !== void 0 && this["risksAntimeridianOrPoleBug"](_0x76337e == null ? void 0 : _0x76337e["positions"])) {
        _0x3d4651["outline"] = new ConstantProperty(![]), this["entitiesWithRiskyOutline"]["add"](_0x3f7f05);
        if (_0x76337e !== void 0 && this["splitPoleEnclosingPolygon"](_0x43306c, _0x3f7f05, _0x76337e, _0x261851)) continue;
        _0x3d4651["height"] === void 0 && ((_b = _0x3d4651["perPositionHeight"]) == null ? void 0 : _b["getValue"](_0x261851)) !== !![] && (_0x3d4651["height"] = new ConstantProperty(0));
      }
    }
    _0x43306c["entities"]["resumeEvents"]();
  }
  ["splitPoleEnclosingPolygon"](_0xd30256, _0x4df4b7, _0x3e256d, _0x195532) {
    var _a2;
    const _0x4c650e = _0x4df4b7["polygon"];
    if (_0x4c650e === void 0 || _0x3e256d["holes"]["length"] > 0) return ![];
    const _0x596f85 = _0x3e256d["positions"]["map"]((_0xe862bf) => {
      const _0x1907ef = Cartographic["fromCartesian"](_0xe862bf);
      return [_0x494c90["toDegrees"](_0x1907ef["longitude"]), _0x494c90["toDegrees"](_0x1907ef["latitude"])];
    });
    let _0x287531 = Infinity, _0x245f0f = -Infinity;
    for (let _0xf42fa7 = 0; _0xf42fa7 < _0x596f85["length"]; _0xf42fa7++) {
      const [_0x4ed890] = _0x596f85[_0xf42fa7];
      if (_0xf42fa7 > 0 && Math["abs"](_0x4ed890 - _0x596f85[_0xf42fa7 - 1][0]) > 180) return ![];
      _0x287531 = Math["min"](_0x287531, _0x4ed890), _0x245f0f = Math["max"](_0x245f0f, _0x4ed890);
    }
    if (_0x245f0f - _0x287531 < 359) return ![];
    const _0x550b35 = [..._0x596f85, _0x596f85[0]]["map"](([_0x4a5e4c, _0x127e90]) => [_0x4a5e4c, Math["max"](-POLE_LATITUDE_LIMIT, Math["min"](POLE_LATITUDE_LIMIT, _0x127e90))]), _0x51d5a7 = [];
    for (let _0x144545 = -180; _0x144545 < 180; _0x144545 += POLE_SLICE_DEGREES) {
      const _0x29437d = clipRingToLongitude(clipRingToLongitude(_0x550b35, _0x144545, 1), _0x144545 + POLE_SLICE_DEGREES, -1)["slice"](0, -1);
      if (_0x29437d["length"] >= 3) _0x51d5a7["push"](Cartesian3["fromDegreesArray"](_0x29437d["flat"]()));
    }
    if (_0x51d5a7["length"] === 0) return ![];
    const _0x2965c6 = (_a2 = _0x4df4b7["properties"]) == null ? void 0 : _a2["getValue"](_0x195532);
    return _0x51d5a7["forEach"]((_0x4f364b, _0x376261) => {
      const _0x27e165 = new ConstantProperty(new PolygonHierarchy(_0x4f364b));
      if (_0x376261 === 0) {
        _0x4c650e["hierarchy"] = _0x27e165;
        return;
      }
      const _0x32a9bb = _0x4c650e["clone"]();
      _0x32a9bb["hierarchy"] = _0x27e165;
      const _0x5a17d3 = _0xd30256["entities"]["add"]({ "id": _0x4df4b7["id"] + "::part-" + _0x376261, ..._0x4df4b7["name"] !== void 0 ? { "name": _0x4df4b7["name"] } : {}, "polygon": _0x32a9bb });
      if (_0x2965c6 !== void 0) _0x5a17d3["properties"] = new PropertyBag(_0x2965c6);
      this["entitiesWithRiskyOutline"]["add"](_0x5a17d3);
    }), !![];
  }
  ["risksAntimeridianOrPoleBug"](_0x430ee1) {
    if (!_0x430ee1 || _0x430ee1["length"] < 2) return ![];
    let _0x487228;
    for (const _0x29cc83 of _0x430ee1) {
      const _0x500f0f = Cartographic["fromCartesian"](_0x29cc83), _0x5d4070 = _0x494c90["toDegrees"](_0x500f0f["latitude"]);
      if (Math["abs"](_0x5d4070) > 89) return !![];
      const _0x15b65d = _0x494c90["toDegrees"](_0x500f0f["longitude"]);
      if (_0x487228 !== void 0 && Math["abs"](_0x15b65d - _0x487228) > 180) return !![];
      _0x487228 = _0x15b65d;
    }
    return ![];
  }
  ["flattenSuspiciousGeometry"](_0x43bfa6) {
    _0x43bfa6["entities"]["suspendEvents"]();
    for (const _0xb95a23 of _0x43bfa6["entities"]["values"]) {
      if (_0xb95a23["polygon"] !== void 0) _0xb95a23["polygon"]["granularity"] = new ConstantProperty(Math["PI"]);
      if (_0xb95a23["polyline"] !== void 0) _0xb95a23["polyline"]["granularity"] = new ConstantProperty(Math["PI"]);
    }
    _0x43bfa6["entities"]["resumeEvents"]();
  }
  static ["douglasPeucker"](_0x491f67, _0xae5add) {
    const _0x5948a5 = new Array(_0x491f67["length"])["fill"](![]);
    _0x5948a5[0] = !![], _0x5948a5[_0x491f67["length"] - 1] = !![];
    const _0x56d2cf = [[0, _0x491f67["length"] - 1]];
    while (_0x56d2cf["length"] > 0) {
      const [_0x478c61, _0x3adec9] = _0x56d2cf["pop"]();
      if (_0x3adec9 <= _0x478c61 + 1) continue;
      let _0x5a6965 = -1, _0x582624 = -1;
      for (let _0x4b9148 = _0x478c61 + 1; _0x4b9148 < _0x3adec9; _0x4b9148++) {
        const _0x39bc9d = _OutlineGeometry["perpendicularDistance"](_0x491f67[_0x4b9148], _0x491f67[_0x478c61], _0x491f67[_0x3adec9]);
        _0x39bc9d > _0x5a6965 && (_0x5a6965 = _0x39bc9d, _0x582624 = _0x4b9148);
      }
      _0x5a6965 > _0xae5add && (_0x5948a5[_0x582624] = !![], _0x56d2cf["push"]([_0x478c61, _0x582624], [_0x582624, _0x3adec9]));
    }
    return _0x491f67["filter"]((_0xb84d35, _0x498473) => _0x5948a5[_0x498473]);
  }
  static ["perpendicularDistance"](_0x134691, _0x416db8, _0x37a6ca) {
    const _0x3c3978 = Cartesian3["subtract"](_0x37a6ca, _0x416db8, new Cartesian3()), _0x31c2bf = Cartesian3["magnitudeSquared"](_0x3c3978);
    if (_0x31c2bf === 0) return Cartesian3["distance"](_0x134691, _0x416db8);
    const _0xb960ba = Cartesian3["subtract"](_0x134691, _0x416db8, new Cartesian3()), _0x2297f7 = _0x494c90["clamp"](Cartesian3["dot"](_0xb960ba, _0x3c3978) / _0x31c2bf, 0, 1), _0x379a20 = Cartesian3["add"](_0x416db8, Cartesian3["multiplyByScalar"](_0x3c3978, _0x2297f7, _0x3c3978), _0x3c3978);
    return Cartesian3["distance"](_0x134691, _0x379a20);
  }
  static ["uniformDecimate"](_0x52573e, _0x582692) {
    if (_0x52573e["length"] <= _0x582692) return [..._0x52573e];
    const _0x1e3f1e = (_0x52573e["length"] - 1) / (_0x582692 - 1);
    return Array["from"]({ "length": _0x582692 }, (_0x3dc8e4, _0x274491) => _0x52573e[Math["round"](_0x274491 * _0x1e3f1e)]);
  }
  static ["polygonExtentMeters"](_0x461737) {
    let _0x1bfd78 = Infinity, _0xe96eba = Infinity, _0x57a272 = Infinity, _0x367107 = -Infinity, _0x205dc9 = -Infinity, _0x48d53e = -Infinity;
    for (const _0x310aed of _0x461737) {
      if (_0x310aed["x"] < _0x1bfd78) _0x1bfd78 = _0x310aed["x"];
      if (_0x310aed["x"] > _0x367107) _0x367107 = _0x310aed["x"];
      if (_0x310aed["y"] < _0xe96eba) _0xe96eba = _0x310aed["y"];
      if (_0x310aed["y"] > _0x205dc9) _0x205dc9 = _0x310aed["y"];
      if (_0x310aed["z"] < _0x57a272) _0x57a272 = _0x310aed["z"];
      if (_0x310aed["z"] > _0x48d53e) _0x48d53e = _0x310aed["z"];
    }
    return Math["sqrt"]((_0x367107 - _0x1bfd78) ** 2 + (_0x205dc9 - _0xe96eba) ** 2 + (_0x48d53e - _0x57a272) ** 2);
  }
  static ["simplifyOutlinePositions"](_0x3501c9) {
    const _0x4bc2a2 = _OutlineGeometry["polygonExtentMeters"](_0x3501c9), _0xe64ff8 = _0x494c90["clamp"](_0x4bc2a2 * _OutlineGeometry["OUTLINE_SIMPLIFY_TOLERANCE_FACTOR"], _OutlineGeometry["OUTLINE_SIMPLIFY_MIN_TOLERANCE_METERS"], _OutlineGeometry["OUTLINE_SIMPLIFY_MAX_TOLERANCE_METERS"]), _0x575296 = _OutlineGeometry["douglasPeucker"](_0x3501c9, _0xe64ff8);
    return _0x575296["length"] > _OutlineGeometry["OUTLINE_MAX_VERTICES"] ? _OutlineGeometry["uniformDecimate"](_0x575296, _OutlineGeometry["OUTLINE_MAX_VERTICES"]) : _0x575296;
  }
};
_OutlineGeometry["OUTLINE_SIMPLIFY_TOLERANCE_FACTOR"] = 7e-5;
_OutlineGeometry["OUTLINE_SIMPLIFY_MIN_TOLERANCE_METERS"] = 0.25;
_OutlineGeometry["OUTLINE_SIMPLIFY_MAX_TOLERANCE_METERS"] = 150;
_OutlineGeometry["OUTLINE_MAX_VERTICES"] = 1200;
let OutlineGeometry = _OutlineGeometry;
class OpacityController {
  constructor(_0x3ea697) {
    this["dataSourceOpacityStates"] = /* @__PURE__ */ new WeakMap(), this["dataSourceOpacityProperties"] = /* @__PURE__ */ new WeakMap(), this["requestRender"] = _0x3ea697["requestRender"];
  }
  ["getWrappedBaseColor"](_0x35564e) {
    return this["dataSourceOpacityProperties"]["get"](_0x35564e);
  }
  ["prepareDataSourceOpacity"](_0x4d4ce8) {
    var _a2, _b;
    const _0x5f9df9 = this["getDataSourceOpacityState"](_0x4d4ce8), _0xc3a92c = JulianDate["now"]();
    _0x4d4ce8["entities"]["suspendEvents"]();
    for (const _0x12bad2 of _0x4d4ce8["entities"]["values"]) {
      if (((_a2 = _0x12bad2["polygon"]) == null ? void 0 : _a2["material"]) instanceof ColorMaterialProperty) {
        const _0x2a8af0 = _0x12bad2["polygon"]["material"];
        this["installOpacityColorProperty"](_0x2a8af0["color"], _0x5f9df9, _0xc3a92c, new Color(1, 1, 1, 0.5), (_0x389ae5) => _0x2a8af0["color"] = _0x389ae5);
      }
      if (((_b = _0x12bad2["polyline"]) == null ? void 0 : _b["material"]) instanceof ColorMaterialProperty) {
        const _0xb6c695 = _0x12bad2["polyline"]["material"];
        this["installOpacityColorProperty"](_0xb6c695["color"], _0x5f9df9, _0xc3a92c, Color["WHITE"], (_0x5350e4) => _0xb6c695["color"] = _0x5350e4);
      }
      _0x12bad2["point"] !== void 0 && this["installOpacityColorProperty"](_0x12bad2["point"]["color"], _0x5f9df9, _0xc3a92c, Color["WHITE"], (_0x549b23) => _0x12bad2["point"]["color"] = _0x549b23), _0x12bad2["billboard"] !== void 0 && this["installOpacityColorProperty"](_0x12bad2["billboard"]["color"], _0x5f9df9, _0xc3a92c, Color["WHITE"], (_0xf4be1c) => _0x12bad2["billboard"]["color"] = _0xf4be1c);
    }
    _0x4d4ce8["entities"]["resumeEvents"]();
  }
  ["ensureDynamicFillColor"](_0x2d8f04, _0x4eb341) {
    var _a2;
    if (!(((_a2 = _0x4eb341["polygon"]) == null ? void 0 : _a2["material"]) instanceof ColorMaterialProperty)) return;
    const _0x463180 = this["getDataSourceOpacityState"](_0x2d8f04), _0x55aca9 = _0x4eb341["polygon"]["material"];
    this["installOpacityColorProperty"](_0x55aca9["color"], _0x463180, JulianDate["now"](), new Color(1, 1, 1, 0.5), (_0x5b0286) => _0x55aca9["color"] = _0x5b0286);
  }
  ["setDataSourceOpacity"](_0x4ea2bc, _0x46afbb) {
    const _0x119823 = this["getDataSourceOpacityState"](_0x4ea2bc);
    if (_0x119823["opacity"] === _0x46afbb) return;
    _0x119823["opacity"] = _0x46afbb, !_0x119823["wrapped"] && _0x46afbb !== 1 && (this["prepareDataSourceOpacity"](_0x4ea2bc), _0x119823["wrapped"] = !![]), this["requestRender"]();
  }
  ["getDataSourceOpacityState"](_0x27aa22) {
    let _0x1b6bef = this["dataSourceOpacityStates"]["get"](_0x27aa22);
    return _0x1b6bef === void 0 && (_0x1b6bef = { "opacity": 1, "wrapped": ![] }, this["dataSourceOpacityStates"]["set"](_0x27aa22, _0x1b6bef)), _0x1b6bef;
  }
  ["installOpacityColorProperty"](_0x50a0fd, _0x387870, _0x396a43, _0x2fc5c2, _0x40f5ac) {
    if (_0x50a0fd !== void 0 && this["dataSourceOpacityProperties"]["has"](_0x50a0fd)) return;
    const _0x4c3701 = this["readColorProperty"](_0x50a0fd, _0x396a43, _0x2fc5c2), _0x148993 = this["createOpacityColorProperty"](_0x4c3701, _0x387870);
    _0x40f5ac(_0x148993);
  }
  ["readColorProperty"](_0x4de7b7, _0x407b2b, _0x39af74) {
    const _0x9717f8 = _0x4de7b7 == null ? void 0 : _0x4de7b7["getValue"](_0x407b2b);
    return _0x9717f8 instanceof Color ? Color["clone"](_0x9717f8, new Color()) : Color["clone"](_0x39af74, new Color());
  }
  ["createOpacityColorProperty"](_0x1d9132, _0x1e3239) {
    const _0x182051 = Color["clone"](_0x1d9132, new Color()), _0x1665b4 = new CallbackProperty((_0xfbd299, _0x4401a7) => {
      const _0x2b74bf = _0x4401a7 instanceof Color ? _0x4401a7 : new Color();
      return _0x2b74bf["red"] = _0x182051["red"], _0x2b74bf["green"] = _0x182051["green"], _0x2b74bf["blue"] = _0x182051["blue"], _0x2b74bf["alpha"] = _0x182051["alpha"] * _0x1e3239["opacity"], _0x2b74bf;
    }, ![]);
    return this["dataSourceOpacityProperties"]["set"](_0x1665b4, _0x182051), _0x1665b4;
  }
}
const _CameraHighlight = class _CameraHighlight {
  constructor(_0x18343c, _0x53d979) {
    this["viewer"] = _0x18343c, this["deps"] = _0x53d979;
  }
  async ["zoomToLayer"](_0x281518) {
    const _0xf88fd1 = this["deps"]["requireLayer"](_0x281518);
    return this["viewer"]["zoomTo"](_0xf88fd1["cesiumObject"], new HeadingPitchRange(0, -_0x494c90["PI_OVER_TWO"], 0));
  }
  async ["zoomToEntity"](_0x3dd3cd, _0x5e2fbb) {
    var _a2, _b;
    const _0x3c40f9 = this["viewer"]["clock"]["currentTime"];
    let _0x312a39;
    if (((_a2 = _0x3dd3cd["polygon"]) == null ? void 0 : _a2["hierarchy"]) !== void 0) {
      const _0x2d6e3c = _0x3dd3cd["polygon"]["hierarchy"]["getValue"](_0x3c40f9);
      _0x312a39 = _0x2d6e3c == null ? void 0 : _0x2d6e3c["positions"];
    } else ((_b = _0x3dd3cd["polyline"]) == null ? void 0 : _b["positions"]) !== void 0 && (_0x312a39 = _0x3dd3cd["polyline"]["positions"]["getValue"](_0x3c40f9));
    if (_0x312a39 !== void 0 && _0x312a39["length"] > 0) {
      const _0x270d93 = BoundingSphere["fromPoints"](_0x312a39), _0x52a20a = Math["max"](_0x270d93["radius"] * 2, 50);
      return new Promise((_0x2ca624) => {
        this["viewer"]["camera"]["flyToBoundingSphere"](_0x270d93, { "offset": new HeadingPitchRange(0, -_0x494c90["PI_OVER_TWO"], _0x52a20a), ...(_0x5e2fbb == null ? void 0 : _0x5e2fbb["duration"]) !== void 0 ? { "duration": _0x5e2fbb["duration"] } : {}, "complete": () => _0x2ca624(!![]), "cancel": () => _0x2ca624(![]) });
      });
    }
    return this["viewer"]["zoomTo"](_0x3dd3cd, new HeadingPitchRange(0, -_0x494c90["PI_OVER_TWO"], 0));
  }
  static ["elevate"](_0x4acd0f, _0x40b781) {
    return _0x4acd0f["map"]((_0x2e6a17) => {
      const _0xea5b25 = Cartographic["fromCartesian"](_0x2e6a17);
      return Cartesian3["fromRadians"](_0xea5b25["longitude"], _0xea5b25["latitude"], _0xea5b25["height"] + _0x40b781);
    });
  }
  ["highlightEntity"](_0x4e79b3) {
    var _a2, _b, _c;
    const _0x52552b = this["viewer"]["clock"]["currentTime"], _0x1a03e6 = (_a2 = _0x4e79b3["properties"]) == null ? void 0 : _a2["getValue"](_0x52552b), _0x4750bf = _0x1a03e6 == null ? void 0 : _0x1a03e6["layerId"], _0x38beb9 = _0x4750bf !== void 0 ? this["deps"]["getLayerStyle"](_0x4750bf) : void 0, _0x4af80c = _CameraHighlight["HIGHLIGHT_COLOR"], _0x12d082 = ((_0x38beb9 == null ? void 0 : _0x38beb9["outline"]["width"]) ?? 2) + 4, _0x1fa18e = new ColorMaterialProperty(_0x4af80c), _0x458d87 = new Entity();
    if (((_b = _0x4e79b3["polygon"]) == null ? void 0 : _b["hierarchy"]) !== void 0) {
      const _0x2bd3b7 = _0x4e79b3["polygon"]["hierarchy"]["getValue"](_0x52552b), _0x2876a8 = _0x2bd3b7 == null ? void 0 : _0x2bd3b7["positions"];
      if (_0x2876a8 === void 0 || _0x2876a8["length"] < 2) return;
      const _0x26c4c7 = Cartesian3["equals"](_0x2876a8[0], _0x2876a8[_0x2876a8["length"] - 1]) ? _0x2876a8 : [..._0x2876a8, _0x2876a8[0]];
      _0x458d87["polyline"] = new PolylineGraphics({ "positions": _CameraHighlight["elevate"](_0x26c4c7, _CameraHighlight["HIGHLIGHT_ELEVATION_METERS"]), "width": _0x12d082, "material": _0x1fa18e, "depthFailMaterial": _0x1fa18e });
    } else {
      if (((_c = _0x4e79b3["polyline"]) == null ? void 0 : _c["positions"]) !== void 0) {
        const _0x1236b3 = _0x4e79b3["polyline"]["positions"]["getValue"](_0x52552b);
        if (_0x1236b3 === void 0 || _0x1236b3["length"] < 2) return;
        _0x458d87["polyline"] = new PolylineGraphics({ "positions": _CameraHighlight["elevate"](_0x1236b3, _CameraHighlight["HIGHLIGHT_ELEVATION_METERS"]), "width": _0x12d082, "material": _0x1fa18e, "depthFailMaterial": _0x1fa18e });
      } else {
        if (_0x4e79b3["position"] !== void 0) {
          const _0x378474 = _0x4e79b3["position"]["getValue"](_0x52552b);
          if (_0x378474 === void 0) return;
          _0x458d87["position"] = new ConstantPositionProperty(_0x378474), _0x458d87["point"] = new PointGraphics({ "pixelSize": _0x12d082 + 12, "color": _0x4af80c, "disableDepthTestDistance": Number["POSITIVE_INFINITY"] });
        } else return;
      }
    }
    !this["highlightDataSource"] ? (this["highlightDataSource"] = new CustomDataSource("__tucbs_highlight__"), void this["viewer"]["dataSources"]["add"](this["highlightDataSource"])) : this["highlightDataSource"]["entities"]["removeAll"](), this["highlightDataSource"]["entities"]["add"](_0x458d87);
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
  constructor(_0x4ce3d9) {
    this["appliedLayerStyles"] = /* @__PURE__ */ new Map(), this["appliedCompanionWidths"] = /* @__PURE__ */ new Map(), this["outlineGeometry"] = _0x4ce3d9["outlineGeometry"], this["opacityController"] = _0x4ce3d9["opacityController"], this["getCurrentTime"] = _0x4ce3d9["getCurrentTime"], this["requestRender"] = _0x4ce3d9["requestRender"], this["emitStyle"] = _0x4ce3d9["emitStyle"], this["waitForRenderSettle"] = _0x4ce3d9["waitForRenderSettle"];
  }
  async ["applyLayerStyle"](_0x2c24ad, _0x2bd072, _0x3153f2, _0x304932) {
    var _a2;
    const _0x626bc4 = this["appliedCompanionWidths"]["get"](_0x2c24ad) ?? ((_a2 = this["appliedLayerStyles"]["get"](_0x2c24ad)) == null ? void 0 : _a2["outline"]["width"]), _0x201be4 = this["getCurrentTime"](), _0x47e22d = this["resolveStyleRange"](_0x2bd072, _0x201be4, _0x304932["fill"]), _0xd2e0f4 = [], _0x58f5f3 = /* @__PURE__ */ new Map();
    _0x2bd072["entities"]["suspendEvents"]();
    for (const _0x12ac64 of _0x2bd072["entities"]["values"]) {
      if (this["outlineGeometry"]["isOutlineCompanion"](_0x12ac64)) {
        _0xd2e0f4["push"](_0x12ac64);
        continue;
      }
      const _0x50fe96 = this["resolveFillColor"](_0x12ac64, _0x304932["fill"], _0x47e22d, _0x201be4);
      if (_0x12ac64["polygon"] !== void 0 && _0x50fe96 !== void 0) _0x58f5f3["set"](_0x12ac64["id"], _0x50fe96);
      this["applyEntityStyle"](_0x12ac64, _0x50fe96, _0x304932["outline"], _0x3153f2);
    }
    const _0x5b3040 = this["styleOutlineCompanions"](_0xd2e0f4, _0x304932["outline"], _0x3153f2, _0x58f5f3);
    _0x2bd072["entities"]["resumeEvents"]();
    const _0xa2e1f6 = _0x47e22d !== null && (_0x304932["fill"]["mode"] === "gradient" || _0x304932["fill"]["mode"] === "bin") ? { ..._0x304932, "fill": { ..._0x304932["fill"], "min": _0x47e22d["min"], "max": _0x47e22d["max"] } } : _0x304932;
    this["appliedLayerStyles"]["set"](_0x2c24ad, _0xa2e1f6), this["requestRender"](), this["emitStyle"](_0x2c24ad, _0xa2e1f6), this["appliedCompanionWidths"]["set"](_0x2c24ad, _0x5b3040);
    const _0x147b14 = _0x626bc4 === void 0 || _0x626bc4 !== _0x5b3040;
    if (_0x147b14) await this["waitForRenderSettle"]();
  }
  ["styleOutlineCompanions"](_0x283786, _0x3537ee, _0x5a22d1, _0x8e8d8a) {
    const _0x282788 = _0x3537ee["enabled"] ? Color["fromCssColorString"](_0x3537ee["color"]) : void 0, _0xe444e9 = _0x3537ee["enabled"] ? _0x3537ee["width"] : SEAM_COVER_WIDTH;
    for (const _0x196014 of _0x283786) {
      const _0x5979e8 = _0x3537ee["enabled"] || _0x5a22d1 ? void 0 : _0x8e8d8a["get"](LayerStyleEngine["outlineOwnerId"](_0x196014)), _0x140f89 = _0x5979e8 !== void 0 && _0x5979e8["alpha"] >= 1;
      _0x196014["show"] = _0x3537ee["enabled"] || _0x140f89;
      const _0x26952d = _0x282788 ?? (_0x140f89 ? _0x5979e8 : void 0);
      _0x26952d !== void 0 && _0x196014["polyline"] !== void 0 && (_0x196014["polyline"]["material"] = this["updateColorMaterial"](_0x196014["polyline"]["material"], _0x26952d), _0x196014["polyline"]["width"] = LayerStyleEngine["updateConstantProperty"](_0x196014["polyline"]["width"], _0xe444e9));
    }
    return _0xe444e9;
  }
  static ["outlineOwnerId"](_0x3b46e7) {
    return _0x3b46e7["id"]["endsWith"](OUTLINE_ID_SUFFIX) ? _0x3b46e7["id"]["slice"](0, -OUTLINE_ID_SUFFIX["length"]) : _0x3b46e7["id"];
  }
  ["getStyle"](_0x1cca57) {
    return this["appliedLayerStyles"]["get"](_0x1cca57);
  }
  ["deleteStyle"](_0x5525da) {
    this["appliedLayerStyles"]["delete"](_0x5525da), this["appliedCompanionWidths"]["delete"](_0x5525da);
  }
  ["recordInitialStyle"](_0x3ff338, _0x268667, _0x50867d, _0x1f28b1) {
    const _0x809c08 = { "fill": { "mode": "solid", "color": _0x268667, "opacity": _0x50867d }, "outline": _0x1f28b1 };
    this["appliedLayerStyles"]["set"](_0x3ff338, _0x809c08), this["emitStyle"](_0x3ff338, _0x809c08);
  }
  ["randomLayerColor"]() {
    return Color["fromRandom"]({ "alpha": 1 });
  }
  ["applyEntityColor"](_0x3bfe80, _0x597198) {
    _0x3bfe80["entities"]["suspendEvents"]();
    for (const _0x12510e of _0x3bfe80["entities"]["values"]) {
      _0x12510e["polygon"] !== void 0 && (_0x12510e["polygon"]["material"] = new ColorMaterialProperty(new ConstantProperty(_0x597198["withAlpha"](0.5)))), _0x12510e["polyline"] !== void 0 && (_0x12510e["polyline"]["material"] = new ColorMaterialProperty(new ConstantProperty(_0x597198))), _0x12510e["point"] !== void 0 && (_0x12510e["point"]["color"] = new ConstantProperty(_0x597198)), _0x12510e["billboard"] !== void 0 && (_0x12510e["billboard"]["color"] = new ConstantProperty(_0x597198));
    }
    _0x3bfe80["entities"]["resumeEvents"]();
  }
  ["convertMarkersToPoints"](_0x195324, _0x1cb273) {
    _0x195324["entities"]["suspendEvents"]();
    for (const _0x42f495 of _0x195324["entities"]["values"]) {
      if (_0x42f495["billboard"] === void 0) continue;
      const _0x33fa56 = _0x42f495["billboard"]["heightReference"];
      _0x42f495["point"] = new PointGraphics({ "pixelSize": 8, "color": _0x1cb273, ..._0x33fa56 !== void 0 ? { "heightReference": _0x33fa56 } : {} }), _0x42f495["billboard"] = void 0;
    }
    _0x195324["entities"]["resumeEvents"]();
  }
  ["applyEntityStyle"](_0x3824d, _0x1e4db9, _0x4d7c66, _0x1bdfef) {
    const _0x5796ec = _0x4d7c66["enabled"] ? Color["fromCssColorString"](_0x4d7c66["color"]) : void 0;
    _0x3824d["polygon"] !== void 0 && (_0x3824d["polygon"]["material"] = this["updateColorMaterial"](_0x3824d["polygon"]["material"], _0x1e4db9 ?? Color["WHITE"]["withAlpha"](0)), !this["outlineGeometry"]["hasOutlineCompanion"](_0x3824d) && !this["outlineGeometry"]["hasRiskyOutline"](_0x3824d) && (_0x3824d["polygon"]["outline"] = LayerStyleEngine["updateConstantProperty"](_0x3824d["polygon"]["outline"], _0x4d7c66["enabled"]), _0x5796ec !== void 0 && (_0x3824d["polygon"]["outlineColor"] = LayerStyleEngine["updateConstantProperty"](_0x3824d["polygon"]["outlineColor"], _0x5796ec), _0x3824d["polygon"]["outlineWidth"] = LayerStyleEngine["updateConstantProperty"](_0x3824d["polygon"]["outlineWidth"], _0x4d7c66["width"]))));
    if (_0x3824d["polyline"] !== void 0) {
      let _0x1e703a;
      _0x1bdfef ? _0x1e703a = _0x5796ec ?? Color["WHITE"]["withAlpha"](0) : _0x1e703a = _0x4d7c66["enabled"] ? _0x5796ec : _0x1e4db9, _0x3824d["polyline"]["material"] = this["updateColorMaterial"](_0x3824d["polyline"]["material"], _0x1e703a ?? Color["WHITE"]["withAlpha"](0)), _0x4d7c66["enabled"] && (_0x3824d["polyline"]["width"] = LayerStyleEngine["updateConstantProperty"](_0x3824d["polyline"]["width"], _0x4d7c66["width"]));
    }
    _0x3824d["point"] !== void 0 && (_0x3824d["point"]["color"] = _0x1e4db9 !== void 0 ? this["updateColorProperty"](_0x3824d["point"]["color"], _0x1e4db9) : void 0, _0x4d7c66["enabled"] && _0x5796ec !== void 0 && (_0x3824d["point"]["outlineColor"] = LayerStyleEngine["updateConstantProperty"](_0x3824d["point"]["outlineColor"], _0x5796ec), _0x3824d["point"]["outlineWidth"] = LayerStyleEngine["updateConstantProperty"](_0x3824d["point"]["outlineWidth"], _0x4d7c66["width"]))), _0x3824d["billboard"] !== void 0 && _0x1e4db9 !== void 0 && (_0x3824d["billboard"]["color"] = this["updateColorProperty"](_0x3824d["billboard"]["color"], _0x1e4db9));
  }
  ["resolveFillColor"](_0x2f5a14, _0x196c84, _0x4242ec, _0x553c03) {
    switch (_0x196c84["mode"]) {
      case "off":
        return void 0;
      case "solid":
        return Color["fromCssColorString"](_0x196c84["color"])["withAlpha"](_0x196c84["opacity"]);
      case "gradient": {
        if (_0x4242ec === null) return void 0;
        const _0x44990f = this["readNumericProperty"](_0x2f5a14, _0x196c84["column"], _0x553c03);
        if (_0x44990f === null) return void 0;
        if (_0x44990f < _0x4242ec["min"] || _0x44990f > _0x4242ec["max"]) return void 0;
        const _0xf09d23 = _0x4242ec["max"] === _0x4242ec["min"] ? 0.5 : _0x494c90["clamp"]((_0x44990f - _0x4242ec["min"]) / (_0x4242ec["max"] - _0x4242ec["min"]), 0, 1);
        return LayerStyleEngine["sampleFromPalette"](_0x196c84["palette"], _0xf09d23, _0x196c84["paletteKind"])["withAlpha"](_0x196c84["opacity"]);
      }
      case "bin": {
        if (_0x4242ec === null) return void 0;
        const _0x46dd7d = this["readNumericProperty"](_0x2f5a14, _0x196c84["column"], _0x553c03);
        if (_0x46dd7d === null) return void 0;
        const _0x18e2d6 = (_0x4242ec["max"] - _0x4242ec["min"]) / _0x196c84["binCount"], _0x5efa0b = Array["from"]({ "length": _0x196c84["binCount"] }, (_0xd906e8, _0x1a2981) => _0x4242ec["min"] + _0x18e2d6 * (_0x1a2981 + 1)), _0x6e18e0 = LayerStyleEngine["pickBin"](_0x46dd7d, _0x5efa0b), _0x3a4972 = _0x196c84["binCount"] <= 1 ? 0.5 : _0x6e18e0 / (_0x196c84["binCount"] - 1);
        return LayerStyleEngine["sampleFromPalette"](_0x196c84["palette"], _0x3a4972, _0x196c84["paletteKind"])["withAlpha"](_0x196c84["opacity"]);
      }
      case "enum": {
        const _0x114ef8 = this["readProperty"](_0x2f5a14, _0x196c84["column"], _0x553c03);
        if (_0x114ef8 === null) return void 0;
        const _0x2eac91 = _0x196c84["colors"][String(_0x114ef8)];
        return _0x2eac91 !== void 0 ? Color["fromCssColorString"](_0x2eac91)["withAlpha"](_0x196c84["opacity"]) : Color["LIGHTGRAY"]["withAlpha"](_0x196c84["opacity"]);
      }
    }
  }
  ["readProperty"](_0xd10152, _0x23f280, _0x2dfdb4) {
    const _0x3cdd1b = _0xd10152["properties"];
    if (_0x3cdd1b === void 0 || !_0x3cdd1b["hasProperty"](_0x23f280)) return null;
    const _0x5b0f0b = _0x3cdd1b["getValue"](_0x2dfdb4), _0x5a836b = _0x5b0f0b == null ? void 0 : _0x5b0f0b[_0x23f280];
    if (_0x5a836b === void 0 || _0x5a836b === null) return null;
    return typeof _0x5a836b === "number" ? _0x5a836b : String(_0x5a836b);
  }
  ["readNumericProperty"](_0x3e0e1d, _0x13c4e3, _0x1676d7) {
    const _0x5a7e5b = this["readProperty"](_0x3e0e1d, _0x13c4e3, _0x1676d7);
    if (_0x5a7e5b === null) return null;
    const _0x98733b = typeof _0x5a7e5b === "number" ? _0x5a7e5b : Number(_0x5a7e5b);
    return Number["isFinite"](_0x98733b) ? _0x98733b : null;
  }
  ["resolveStyleRange"](_0x3876a8, _0x1fef0a, _0x409bfb) {
    if (_0x409bfb["mode"] !== "gradient" && _0x409bfb["mode"] !== "bin") return null;
    if (_0x409bfb["min"] !== void 0 && _0x409bfb["max"] !== void 0) return { "min": _0x409bfb["min"], "max": _0x409bfb["max"] };
    const _0x843803 = this["getColumnRange"](_0x3876a8, _0x1fef0a, _0x409bfb["column"]);
    if (_0x843803 === null) return null;
    return { "min": _0x409bfb["min"] ?? _0x843803["min"], "max": _0x409bfb["max"] ?? _0x843803["max"] };
  }
  ["getColumnRange"](_0x42bee1, _0x32d972, _0x4a00c1) {
    let _0x1ae336 = Infinity, _0x538cd0 = -Infinity;
    for (const _0x4872b7 of _0x42bee1["entities"]["values"]) {
      const _0x196c6d = this["readNumericProperty"](_0x4872b7, _0x4a00c1, _0x32d972);
      if (_0x196c6d === null) continue;
      if (_0x196c6d < _0x1ae336) _0x1ae336 = _0x196c6d;
      if (_0x196c6d > _0x538cd0) _0x538cd0 = _0x196c6d;
    }
    return Number["isFinite"](_0x1ae336) && Number["isFinite"](_0x538cd0) ? { "min": _0x1ae336, "max": _0x538cd0 } : null;
  }
  static ["valueEquals"](_0x126b15, _0x2783d6) {
    if (_0x126b15 instanceof Color || _0x2783d6 instanceof Color) return _0x126b15 instanceof Color && _0x2783d6 instanceof Color && Color["equals"](_0x126b15, _0x2783d6);
    return _0x126b15 === _0x2783d6;
  }
  static ["updateConstantProperty"](_0xae34ed, _0x536132) {
    if (_0xae34ed instanceof ConstantProperty) return !LayerStyleEngine["valueEquals"](_0xae34ed["getValue"](), _0x536132) && _0xae34ed["setValue"](_0x536132), _0xae34ed;
    return new ConstantProperty(_0x536132);
  }
  ["updateColorProperty"](_0x11c649, _0x2232e2) {
    const _0x5da761 = _0x11c649 !== void 0 ? this["opacityController"]["getWrappedBaseColor"](_0x11c649) : void 0;
    if (_0x5da761 !== void 0) return Color["clone"](_0x2232e2, _0x5da761), _0x11c649;
    if (_0x11c649 instanceof ConstantProperty) return !LayerStyleEngine["valueEquals"](_0x11c649["getValue"](), _0x2232e2) && _0x11c649["setValue"](_0x2232e2), _0x11c649;
    return new ConstantProperty(_0x2232e2);
  }
  ["updateColorMaterial"](_0x17097e, _0x5a5b46) {
    if (_0x17097e instanceof ColorMaterialProperty) return _0x17097e["color"] = this["updateColorProperty"](_0x17097e["color"], _0x5a5b46), _0x17097e;
    return new ColorMaterialProperty(this["updateColorProperty"](void 0, _0x5a5b46));
  }
  static ["sampleFromPalette"](_0x4054a0, _0x3b07a3, _0x109d66) {
    return _0x109d66 === "qualitative" ? LayerStyleEngine["sampleDiscrete"](_0x4054a0, _0x3b07a3) : LayerStyleEngine["sampleGradient"](_0x4054a0, _0x3b07a3);
  }
  static ["sampleGradient"](_0xd121ec, _0xd8a062) {
    if (_0xd121ec["length"] === 0) return Color["GRAY"];
    if (_0xd121ec["length"] === 1) return Color["fromCssColorString"](_0xd121ec[0]);
    const _0x69290d = _0x494c90["clamp"](_0xd8a062, 0, 1) * (_0xd121ec["length"] - 1), _0x46c97e = Math["floor"](_0x69290d), _0x88f797 = Math["min"](_0xd121ec["length"] - 1, _0x46c97e + 1), _0x30c415 = _0x69290d - _0x46c97e, _0x22b39d = Color["fromCssColorString"](_0xd121ec[_0x46c97e]), _0x276439 = Color["fromCssColorString"](_0xd121ec[_0x88f797]);
    return Color["lerp"](_0x22b39d, _0x276439, _0x30c415, new Color());
  }
  static ["sampleDiscrete"](_0x1a1cd4, _0x542f16) {
    if (_0x1a1cd4["length"] === 0) return Color["GRAY"];
    const _0x2b7151 = Math["round"](_0x494c90["clamp"](_0x542f16, 0, 1) * (_0x1a1cd4["length"] - 1));
    return Color["fromCssColorString"](_0x1a1cd4[_0x2b7151]);
  }
  static ["pickBin"](_0x146948, _0x64f155) {
    for (let _0x2135da = 0; _0x2135da < _0x64f155["length"]; _0x2135da++) {
      if (_0x146948 <= _0x64f155[_0x2135da]) return _0x2135da;
    }
    return _0x64f155["length"] - 1;
  }
}
function extractEpsgCode(_0x37bf7c) {
  if (!/EPSG/i["test"](_0x37bf7c)) return void 0;
  const _0x4f190c = _0x37bf7c["trim"]();
  let _0x32eb14 = _0x4f190c["length"];
  while (_0x32eb14 > 0 && _0x4f190c["charCodeAt"](_0x32eb14 - 1) >= 48 && _0x4f190c["charCodeAt"](_0x32eb14 - 1) <= 57) {
    _0x32eb14--;
  }
  const _0x37ff80 = _0x4f190c["slice"](_0x32eb14);
  return _0x37ff80["length"] > 0 ? _0x37ff80 : void 0;
}
const proj4DefRequests = /* @__PURE__ */ new Map();
async function registerProj4Def(_0x304285, _0x5e3620) {
  const _0x7fb146 = "EPSG:" + _0x5e3620;
  if (_0x304285["defs"](_0x7fb146)) return !![];
  let _0x40e394 = proj4DefRequests["get"](_0x5e3620);
  !_0x40e394 && (_0x40e394 = (async () => {
    try {
      const _0x39a0ae = await fetch("https://epsg.io/" + _0x5e3620 + ".proj4");
      if (!_0x39a0ae["ok"]) return _0x39a0ae["status"] === 404 ? "missing" : "transient-failure";
      const _0xfba699 = (await _0x39a0ae["text"]())["trim"]();
      if (!_0xfba699) return "missing";
      return _0x304285["defs"](_0x7fb146, _0xfba699), "registered";
    } catch {
      return "transient-failure";
    }
  })(), proj4DefRequests["set"](_0x5e3620, _0x40e394));
  const _0x28be1b = await _0x40e394;
  return _0x28be1b === "transient-failure" && proj4DefRequests["get"](_0x5e3620) === _0x40e394 && proj4DefRequests["delete"](_0x5e3620), _0x28be1b === "registered";
}
async function ensureProj4Def(_0x496c71) {
  let _0x175526;
  try {
    ({ default: _0x175526 } = await import("proj4"));
  } catch {
    return console["warn"]("[ogc/proj4Defs] EPSG:" + _0x496c71 + ' icin koordinat donusumu atlandi -- "proj4" paketi yuklu degil (peer dependency olarak eklenmemis). Bu EPSG kodunu kullanan WCS katmanlari yanlis/genis bir alanda gorunebilir.'), void 0;
  }
  if (!await registerProj4Def(_0x175526, _0x496c71)) return console["warn"]("[ogc/proj4Defs] EPSG:" + _0x496c71 + " icin proj4 tanimi epsg.io'dan alinamadi (agsizlik veya gecersiz/desteklenmeyen kod olabilir). Bu EPSG kodunu kullanan WCS katmanlari yanlis/genis bir alanda gorunebilir."), void 0;
  return _0x175526;
}
const CESIUM_BUILTIN_CRS_NAMES = /* @__PURE__ */ new Set(["urn:ogc:def:crs:OGC:1.3:CRS84", "EPSG:4326", "urn:ogc:def:crs:EPSG::4326"]);
function defaultCrsFunction(_0x3f0eeb) {
  return Cartesian3["fromDegrees"](_0x3f0eeb[0], _0x3f0eeb[1], _0x3f0eeb[2]);
}
function numericCodeString(_0x2a7176) {
  if (_0x2a7176 === void 0) return void 0;
  const _0x19717d = String(_0x2a7176)["trim"]();
  return /^\d+$/["test"](_0x19717d) ? _0x19717d : void 0;
}
function isSuspiciousCrsResult(_0x343e1d) {
  return _0x343e1d !== null && _0x343e1d["kind"] !== "reprojected";
}
function firstCoordinatePair(_0x451112) {
  let _0x31a35f = _0x451112;
  while (Array["isArray"](_0x31a35f) && _0x31a35f["length"] > 0 && Array["isArray"](_0x31a35f[0])) {
    _0x31a35f = _0x31a35f[0];
  }
  if (Array["isArray"](_0x31a35f) && _0x31a35f["length"] >= 2 && typeof _0x31a35f[0] === "number" && typeof _0x31a35f[1] === "number") return [_0x31a35f[0], _0x31a35f[1]];
  return void 0;
}
function findFirstCoordinates(_0x36b22f) {
  if (typeof _0x36b22f !== "object" || _0x36b22f === null) return void 0;
  const _0x1911f0 = _0x36b22f;
  if (_0x1911f0["type"] === "FeatureCollection" && Array["isArray"](_0x1911f0["features"])) {
    for (const _0x59af2f of _0x1911f0["features"]) {
      const _0x16010e = findFirstCoordinates(_0x59af2f);
      if (_0x16010e) return _0x16010e;
    }
    return void 0;
  }
  if (_0x1911f0["type"] === "Feature") return findFirstCoordinates(_0x1911f0["geometry"]);
  if (_0x1911f0["type"] === "GeometryCollection" && Array["isArray"](_0x1911f0["geometries"])) {
    for (const _0x309c4e of _0x1911f0["geometries"]) {
      const _0x2464a6 = findFirstCoordinates(_0x309c4e);
      if (_0x2464a6) return _0x2464a6;
    }
    return void 0;
  }
  if ("coordinates" in _0x1911f0) return firstCoordinatePair(_0x1911f0["coordinates"]);
  return void 0;
}
function resolveOrRejectUnresolvedCrs(_0x110290, _0x31d699, _0x5281cb) {
  if (!_0x5281cb) throw new GeometryError("CRS_UNRESOLVED_UNSUPPORTED", "Koordinat sistemi tanınamadı ve WGS84 ile uyumlu değil.");
  return GeoJsonDataSource["crsNames"][_0x110290] = defaultCrsFunction, { "kind": "suspicious-unresolved-crs", "crsName": _0x31d699 };
}
function acceptClaimedWgs84(_0x3ec22d, _0x4ab33a, _0x1060aa) {
  if (!_0x4ab33a) throw new GeometryError("CRS_CLAIMED_WGS84_INVALID", "Koordinatlar WGS84 ile uyumlu değil.");
  if (_0x1060aa) GeoJsonDataSource["crsNames"][_0x3ec22d] = defaultCrsFunction;
  return null;
}
function computeLooksLikeWgs84(_0x43948b) {
  const _0x1846ee = findFirstCoordinates(_0x43948b);
  return !_0x1846ee || Math["abs"](_0x1846ee[0]) <= 180 && Math["abs"](_0x1846ee[1]) <= 90;
}
function resolveCrsFieldOrThrow(_0x163b06, _0x1b9fda) {
  const _0x5d7b02 = "crs" in _0x163b06 ? _0x163b06["crs"] : void 0;
  if (!_0x5d7b02 || typeof _0x5d7b02 !== "object") {
    if (!_0x1b9fda) throw new GeometryError("CRS_MISSING_UNSUPPORTED", "Bu dosyada geçerli koordinat sistemi (CRS) bilgisi yok.");
    return null;
  }
  return _0x5d7b02;
}
async function ensureGeoJsonCrsSupport(_0x290442) {
  var _a2, _b, _c;
  if (typeof _0x290442 !== "object" || _0x290442 === null) return null;
  const _0xb4fa2 = computeLooksLikeWgs84(_0x290442), _0x17f5fd = resolveCrsFieldOrThrow(_0x290442, _0xb4fa2);
  if (!_0x17f5fd) return null;
  const _0x1072ba = _0x17f5fd["type"] === "EPSG", _0x2ed598 = _0x1072ba ? "EPSG:" + ((_a2 = _0x17f5fd["properties"]) == null ? void 0 : _a2["code"]) : (_b = _0x17f5fd["properties"]) == null ? void 0 : _b["name"];
  if (!_0x2ed598 || typeof _0x2ed598 !== "string") return null;
  if (CESIUM_BUILTIN_CRS_NAMES["has"](_0x2ed598)) return acceptClaimedWgs84(_0x2ed598, _0xb4fa2, ![]);
  const _0x4f83bd = _0x1072ba ? numericCodeString((_c = _0x17f5fd["properties"]) == null ? void 0 : _c["code"]) : extractEpsgCode(_0x2ed598);
  if (!_0x4f83bd) return resolveOrRejectUnresolvedCrs(_0x2ed598, _0x2ed598, _0xb4fa2);
  if (_0x4f83bd === "4326") return acceptClaimedWgs84(_0x2ed598, _0xb4fa2, !![]);
  const _0x5aa7b9 = "EPSG:" + _0x4f83bd;
  let _0x5aa0a3;
  try {
    ({ default: _0x5aa0a3 } = await import("proj4"));
  } catch {
    return resolveOrRejectUnresolvedCrs(_0x2ed598, _0x5aa7b9, _0xb4fa2);
  }
  if (!await registerProj4Def(_0x5aa0a3, _0x4f83bd)) return resolveOrRejectUnresolvedCrs(_0x2ed598, _0x5aa7b9, _0xb4fa2);
  return GeoJsonDataSource["crsNames"][_0x2ed598] = (_0x179db4) => {
    const [_0x4c6d0a, _0x331f64] = _0x5aa0a3(_0x5aa7b9, "EPSG:4326", [_0x179db4[0], _0x179db4[1]]);
    return Cartesian3["fromDegrees"](_0x4c6d0a, _0x331f64, _0x179db4[2]);
  }, { "kind": "reprojected", "fromEpsg": _0x5aa7b9 };
}
class LocalSourceLoader {
  constructor(_0x2694b5, _0x3a6245) {
    this["viewer"] = _0x2694b5, this["deps"] = _0x3a6245;
  }
  async ["addLocalKmlGeoJson"](_0x4cf679, _0x557abb) {
    let _0x49c064, _0x4fbedc, _0x40a7c2 = null;
    const _0x352c1c = this["deps"]["styleEngine"]["randomLayerColor"]();
    let _0x234a2c = _0x557abb["clampToGround"] ?? !![];
    if (_0x4cf679 === "GEOJSON") {
      const _0x552870 = _0x557abb["data"] instanceof File ? JSON["parse"](await this["fileToText"](_0x557abb["data"])) : _0x557abb["data"];
      _0x40a7c2 = await ensureGeoJsonCrsSupport(_0x552870);
      if (isSuspiciousCrsResult(_0x40a7c2)) _0x234a2c = ![];
      _0x49c064 = await GeoJsonDataSource["load"](_0x552870, { "clampToGround": _0x234a2c, "fill": _0x352c1c["withAlpha"](0.5), "stroke": _0x352c1c, "strokeWidth": 2, "markerColor": _0x352c1c }), this["deps"]["styleEngine"]["applyEntityColor"](_0x49c064, _0x352c1c), this["deps"]["styleEngine"]["convertMarkersToPoints"](_0x49c064, _0x352c1c);
      if (isSuspiciousCrsResult(_0x40a7c2)) this["deps"]["outlineGeometry"]["flattenSuspiciousGeometry"](_0x49c064);
    } else {
      let _0x5bf563;
      _0x557abb["data"] instanceof File ? (_0x4fbedc = this["fileToBlobUrl"](_0x557abb["data"]), _0x5bf563 = _0x4fbedc) : _0x5bf563 = _0x557abb["data"], _0x49c064 = await KmlDataSource["load"](_0x5bf563, { "camera": this["viewer"]["scene"]["camera"], "canvas": this["viewer"]["scene"]["canvas"], "clampToGround": _0x234a2c }), this["deps"]["styleEngine"]["applyEntityColor"](_0x49c064, _0x352c1c);
    }
    this["deps"]["outlineGeometry"]["disableRiskyPolygonOutlines"](_0x49c064);
    _0x234a2c && this["deps"]["addPolygonOutlines"](_0x49c064, this["deps"]["defaultOutlineColor"], 2);
    await this["viewer"]["dataSources"]["add"](_0x49c064);
    _0x4fbedc !== void 0 && URL["revokeObjectURL"](_0x4fbedc);
    const _0x281b98 = _0x352c1c["toCssHexString"](), _0x55e3ec = this["deps"]["register"](_0x557abb["id"], _0x557abb["title"], _0x4cf679, _0x49c064, ![], _0x281b98);
    return this["deps"]["emitCrsCheckResult"](_0x55e3ec["id"], _0x40a7c2), this["deps"]["styleEngine"]["recordInitialStyle"](_0x55e3ec["id"], _0x281b98, 0.5, { "enabled": !![], "color": this["deps"]["defaultOutlineColorHex"], "width": 2 }), await this["deps"]["waitForRenderSettle"](), _0x55e3ec;
  }
  async ["addShp"](_0x1b81ab) {
    let _0x37f730;
    try {
      ({ getShapefile: _0x37f730 } = await import("shpjs"));
    } catch {
      throw new LayerOperationError("LAYER_SHP_PACKAGE_MISSING", 'SHP katmanı için "shpjs" paketi gereklidir: shpjs kütüphanesini import etmelisiniz');
    }
    const _0x52fa8d = _0x1b81ab["data"] instanceof File ? await this["fileToArrayBuffer"](_0x1b81ab["data"]) : _0x1b81ab["data"], _0x3b1641 = await _0x37f730(_0x52fa8d), _0xe05d7 = Array["isArray"](_0x3b1641) ? { "type": "FeatureCollection", "features": _0x3b1641["flatMap"]((_0x57d448) => _0x57d448["features"]) } : _0x3b1641;
    return loadVectorGeoJsonLayer(this["viewer"], this["deps"], _0xe05d7, { "id": _0x1b81ab["id"], "title": _0x1b81ab["title"], "layerType": "SHP", "clampToGround": _0x1b81ab["clampToGround"] ?? !![] });
  }
  async ["addCsv"](_0x599d6f) {
    let _0x35ff8a;
    try {
      ({ default: _0x35ff8a } = await import("papaparse"));
    } catch {
      throw new LayerOperationError("LAYER_CSV_PACKAGE_MISSING", 'CSV katmanı için "papaparse" paketi gereklidir: papaparse kütüphanesini import etmelisiniz');
    }
    const _0x1a98c9 = _0x599d6f["data"] instanceof File ? await this["fileToText"](_0x599d6f["data"]) : _0x599d6f["data"], _0x10d9d0 = _0x35ff8a["parse"](_0x1a98c9, { "header": !![], "dynamicTyping": !![] }), _0x283f36 = _0x10d9d0["data"], _0x72df92 = _0x283f36["find"]((_0x536d48) => _0x536d48 && Object["keys"](_0x536d48)["length"] > 0), _0x37579b = _0x72df92 && this["detectLatLonKeys"](_0x72df92);
    if (!_0x37579b) throw new LayerOperationError("LAYER_CSV_LATLON_NOT_FOUND", "CSV içinde lat/lon sütunlarını bulamadım (ör: lat, lon).");
    const _0x4547e2 = this["deps"]["styleEngine"]["randomLayerColor"](), _0x4f35f2 = new CustomDataSource(_0x599d6f["title"]);
    for (const _0x3b6dcd of _0x283f36) {
      const _0x396062 = Number(_0x3b6dcd[_0x37579b["lat"]]), _0x4a0042 = Number(_0x3b6dcd[_0x37579b["lon"]]);
      Number["isFinite"](_0x396062) && Number["isFinite"](_0x4a0042) && _0x4f35f2["entities"]["add"]({ "position": Cartesian3["fromDegrees"](_0x4a0042, _0x396062), "point": { "pixelSize": 6, "color": _0x4547e2 }, "properties": _0x3b6dcd });
    }
    await this["viewer"]["dataSources"]["add"](_0x4f35f2);
    const _0x47dcce = _0x4547e2["toCssHexString"](), _0x1200c1 = this["deps"]["register"](_0x599d6f["id"], _0x599d6f["title"], "CSV", _0x4f35f2, ![], _0x47dcce);
    return this["deps"]["styleEngine"]["recordInitialStyle"](_0x1200c1["id"], _0x47dcce, 1, { "enabled": ![], "color": _0x47dcce, "width": 0 }), _0x1200c1;
  }
  ["detectLatLonKeys"](_0x133cee) {
    const _0x296480 = Object["keys"](_0x133cee)["reduce"]((_0x16f803, _0x5cfc13) => {
      const _0x4a38da = _0x5cfc13["toLowerCase"]();
      if (!_0x16f803["lat"] && /^(lat|latitude|y)$/["test"](_0x4a38da)) _0x16f803["lat"] = _0x5cfc13;
      if (!_0x16f803["lon"] && /^(lon|lng|long|longitude|x)$/["test"](_0x4a38da)) _0x16f803["lon"] = _0x5cfc13;
      return _0x16f803;
    }, { "lat": "", "lon": "" });
    return _0x296480["lat"] && _0x296480["lon"] ? _0x296480 : null;
  }
  async ["fileToText"](_0x27d387) {
    return decodeTextBuffer(await _0x27d387["arrayBuffer"]());
  }
  ["fileToBlobUrl"](_0x2e24bf) {
    return URL["createObjectURL"](_0x2e24bf);
  }
  ["fileToArrayBuffer"](_0xdb5b6d) {
    return _0xdb5b6d["arrayBuffer"]();
  }
}
async function loadVectorGeoJsonLayer(_0x1a8dce, _0x1d17f4, _0x4aa8bc, _0x11c6c5, _0xbf5cc0) {
  const _0x21356e = await ensureGeoJsonCrsSupport(_0x4aa8bc), _0x309616 = _0x1d17f4["styleEngine"]["randomLayerColor"](), _0x1fb583 = isSuspiciousCrsResult(_0x21356e) ? ![] : _0x11c6c5["clampToGround"], _0x15471a = await GeoJsonDataSource["load"](_0x4aa8bc, { "clampToGround": _0x1fb583, "fill": _0x309616["withAlpha"](0.5), "stroke": _0x309616, "strokeWidth": 2, "markerColor": _0x309616 });
  _0x1d17f4["styleEngine"]["applyEntityColor"](_0x15471a, _0x309616), _0x1d17f4["styleEngine"]["convertMarkersToPoints"](_0x15471a, _0x309616), _0x1d17f4["outlineGeometry"]["disableRiskyPolygonOutlines"](_0x15471a);
  if (isSuspiciousCrsResult(_0x21356e)) _0x1d17f4["outlineGeometry"]["flattenSuspiciousGeometry"](_0x15471a);
  _0x1fb583 && _0x1d17f4["addPolygonOutlines"](_0x15471a, _0x1d17f4["defaultOutlineColor"], 2);
  await _0x1a8dce["dataSources"]["add"](_0x15471a);
  const _0x56d8ad = _0x309616["toCssHexString"](), _0x2947e5 = _0x1d17f4["register"](_0x11c6c5["id"], _0x11c6c5["title"], _0x11c6c5["layerType"], _0x15471a, ![], _0x56d8ad);
  return _0x1d17f4["emitCrsCheckResult"](_0x2947e5["id"], _0x21356e), _0xbf5cc0 == null ? void 0 : _0xbf5cc0(_0x2947e5), _0x1d17f4["styleEngine"]["recordInitialStyle"](_0x2947e5["id"], _0x56d8ad, 0.5, { "enabled": !![], "color": _0x1d17f4["defaultOutlineColorHex"], "width": 2 }), await _0x1d17f4["waitForRenderSettle"](), _0x2947e5;
}
function decodeTextBuffer(_0x6e6ac1) {
  try {
    return new TextDecoder("utf-8", { "fatal": !![] })["decode"](_0x6e6ac1);
  } catch {
    return new TextDecoder("windows-1254")["decode"](_0x6e6ac1);
  }
}
const els = (_0x9b6ef9, _0x2c1b7b) => Array["from"](_0x9b6ef9["getElementsByTagNameNS"]("*", _0x2c1b7b)), el = (_0x5d7931, _0x22f5aa) => els(_0x5d7931, _0x22f5aa)[0], txt = (_0x4a0d29, _0x5c9585) => {
  var _a2, _b;
  return (_b = (_a2 = el(_0x4a0d29, _0x5c9585)) == null ? void 0 : _a2["textContent"]) == null ? void 0 : _b["trim"]();
};
function buildWfsCapabilitiesUrl(_0x46bd2d) {
  const _0x6cf297 = new URL(_0x46bd2d, window["location"]["origin"]), _0x50420b = new URL("" + _0x6cf297["origin"] + _0x6cf297["pathname"]);
  for (const [_0x213384, _0x47ff64] of _0x6cf297["searchParams"]["entries"]()) {
    const _0x3443ec = _0x213384["toLowerCase"]();
    (_0x3443ec === "url" || _0x3443ec === "tucbsapikey") && _0x50420b["searchParams"]["set"](_0x213384, _0x47ff64);
  }
  return _0x50420b["searchParams"]["set"]("service", "WFS"), _0x50420b["searchParams"]["set"]("request", "GetCapabilities"), _0x50420b["searchParams"]["set"]("acceptVersions", "2.0.0,1.1.0,1.0.0"), _0x50420b["toString"]();
}
function isOgcExceptionXml(_0x5c8f25) {
  const _0x5c717c = _0x5c8f25["trimStart"]();
  return _0x5c717c["startsWith"]("<") && (_0x5c717c["includes"]("ExceptionReport") || _0x5c717c["includes"]("ServiceExceptionReport"));
}
function repairBareAmpersands(_0x16fdc9) {
  return _0x16fdc9["replace"](/&(?!(?:amp|lt|gt|quot|apos|#\d+|#x[\da-fA-F]+);)/gi, "&amp;");
}
async function fetchWfsCapabilities(_0x3e5738, _0x217c30 = {}) {
  const _0x32d5e0 = await fetch(buildWfsCapabilitiesUrl(_0x3e5738), _0x217c30);
  if (!_0x32d5e0["ok"]) throw new OgcRequestError("OGC_CAPABILITIES_REQUEST_FAILED", "WFS GetCapabilities başarısız: " + _0x32d5e0["status"] + " " + _0x32d5e0["statusText"]);
  const _0x57c4a6 = await _0x32d5e0["text"]();
  if (isOgcExceptionXml(_0x57c4a6)) throw new OgcRequestError("OGC_CAPABILITIES_EXCEPTION", "WFS GetCapabilities OGC Exception döndü.");
  const _0x528f6a = repairBareAmpersands(_0x57c4a6), _0x54dc57 = new DOMParser()["parseFromString"](_0x528f6a, "application/xml");
  if (_0x54dc57["querySelector"]("parsererror")) throw new OgcRequestError("OGC_CAPABILITIES_PARSE_FAILED", "WFS GetCapabilities XML parse edilemedi.");
  const _0x1b08a0 = _0x54dc57["documentElement"]["getAttribute"]("version") || "2.0.0", _0x14bf63 = [];
  for (const _0x2fe593 of els(_0x54dc57, "FeatureType")) {
    const _0x782d1e = txt(_0x2fe593, "Name") || "";
    if (!_0x782d1e) continue;
    const _0x5ceb66 = els(_0x2fe593, "OutputFormats")["flatMap"]((_0xed8786) => els(_0xed8786, "Format")["map"]((_0x5f0c9a) => {
      var _a2;
      return ((_a2 = _0x5f0c9a["textContent"]) == null ? void 0 : _a2["trim"]()) || "";
    })["filter"](Boolean)), _0x5953ec = txt(_0x2fe593, "Title"), _0x353028 = txt(_0x2fe593, "DefaultCRS"), _0x3db0ec = txt(_0x2fe593, "DefaultSRS");
    _0x14bf63["push"]({ "name": _0x782d1e, ..._0x5953ec ? { "title": _0x5953ec } : {}, ..._0x353028 ? { "defaultCRS": _0x353028 } : {}, ..._0x3db0ec ? { "defaultSRS": _0x3db0ec } : {}, ..._0x5ceb66["length"] ? { "outputFormats": _0x5ceb66 } : {} });
  }
  const _0x4f3e73 = el(_0x54dc57, "OperationsMetadata");
  let _0x212806 = [];
  if (_0x4f3e73) {
    const _0x23643f = els(_0x4f3e73, "Operation")["find"]((_0x5985a4) => (_0x5985a4["getAttribute"]("name") || "") === "GetFeature"), _0x2db2d1 = els(_0x23643f ?? _0x4f3e73, "Parameter")["find"]((_0x26f974) => (_0x26f974["getAttribute"]("name") || "")["toLowerCase"]() === "outputformat");
    _0x2db2d1 && (_0x212806 = els(_0x2db2d1, "Value")["map"]((_0x3b1b08) => {
      var _a2;
      return ((_a2 = _0x3b1b08["textContent"]) == null ? void 0 : _a2["trim"]()) || "";
    })["filter"](Boolean));
  }
  if (!_0x212806["length"]) {
    const _0xfe9e84 = /* @__PURE__ */ new Set();
    _0x212806 = _0x14bf63["flatMap"]((_0xe0eb06) => _0xe0eb06["outputFormats"] || [])["filter"]((_0x840bef) => !_0xfe9e84["has"](_0x840bef) && _0xfe9e84["add"](_0x840bef));
  }
  return { "version": _0x1b08a0, "featureTypes": _0x14bf63, "outputFormats": _0x212806 };
}
function normName(_0x2dbcb4) {
  return _0x2dbcb4["trim"]()["toLowerCase"]();
}
function localTypeName(_0x576f0f) {
  const _0x4a2e9b = _0x576f0f["lastIndexOf"](":");
  return _0x4a2e9b >= 0 ? _0x576f0f["slice"](_0x4a2e9b + 1) : _0x576f0f;
}
function resolveWfsFeatureType(_0x4fe628, _0x1d9a61) {
  if (!_0x1d9a61["length"]) throw new OgcRequestError("OGC_FEATURE_TYPE_NOT_FOUND", "WFS FeatureType bulunamadı.");
  const _0x21548a = _0x4fe628 == null ? void 0 : _0x4fe628["trim"]();
  if (_0x21548a) {
    const _0x5b896e = _0x1d9a61["find"]((_0x175b1b) => normName(_0x175b1b["name"]) === normName(_0x21548a));
    if (_0x5b896e) return _0x5b896e;
    const _0xf50e76 = normName(localTypeName(_0x21548a)), _0x1ce4a8 = _0x1d9a61["find"]((_0x3cab41) => normName(localTypeName(_0x3cab41["name"])) === _0xf50e76);
    if (_0x1ce4a8) return _0x1ce4a8;
  }
  return _0x1d9a61[0];
}
function pickJsonOutput(_0xdd9bab) {
  const _0x5499ee = ["application/geo+json", "application/json;subtype=geojson", "application/json", "geojson", "json", "esrigeojson", "geojson+gzip", "geojson+zip"], _0x195cbc = _0xdd9bab["map"]((_0x109a16) => _0x109a16["toLowerCase"]()["replace"](/\s+/g, ""));
  for (const _0x1d92f1 of _0x5499ee) {
    const _0x54a0ad = _0x195cbc["findIndex"]((_0x349fe0) => _0x349fe0 === _0x1d92f1 || _0x349fe0["includes"](_0x1d92f1));
    if (_0x54a0ad >= 0) return _0xdd9bab[_0x54a0ad] ?? null;
  }
  return null;
}
function buildWfsGetFeaturePlan(_0x10cf99) {
  const _0x22f597 = resolveWfsFeatureType(_0x10cf99["typeNameHint"], _0x10cf99["caps"]["featureTypes"]), _0x5905ac = _0x10cf99["version"] || _0x10cf99["caps"]["version"] || "2.0.0", _0xa0d118 = _0x10cf99["srsName"] || _0x22f597["defaultCRS"] || _0x22f597["defaultSRS"] || "EPSG:4326", _0x5b3057 = _0x10cf99["outputFormat"] || pickJsonOutput(_0x22f597["outputFormats"] || []) || pickJsonOutput(_0x10cf99["caps"]["outputFormats"]), _0x2595f3 = _0x10cf99["maxFeatures"] ?? 5e3;
  return { "version": _0x5905ac, "typeName": _0x22f597["name"], "srsName": _0xa0d118, "jsonOutputFormat": _0x5b3057, "maxFeatures": _0x2595f3 };
}
function appendWfsGetFeatureParams(_0x1f6250, _0x20cc28, _0x1ce31b) {
  _0x1f6250["set"]("service", "WFS"), _0x1f6250["set"]("request", "GetFeature"), _0x1f6250["set"]("version", _0x20cc28["version"]);
  const _0x13a3dd = _0x20cc28["version"]["startsWith"]("2.");
  _0x1f6250["set"](_0x13a3dd ? "typeNames" : "typeName", _0x20cc28["typeName"]), _0x1f6250["set"]("srsName", _0x20cc28["srsName"]);
  _0x1ce31b && _0x1f6250["set"]("outputFormat", _0x1ce31b);
  const _0x4d7c43 = _0x13a3dd ? "count" : "maxFeatures";
  _0x1f6250["set"](_0x4d7c43, String(_0x20cc28["maxFeatures"]));
}
async function getCapabilities(_0x55e38a, _0x3fb877, _0x553542) {
  const _0x1c8af5 = _0x553542 == null ? void 0 : _0x553542["mergeApiKeyHeader"](_0x553542["buildAuthHeaders"](_0x3fb877), _0x55e38a), _0x1f72c2 = await fetch(_0x55e38a, _0x1c8af5 ? { "headers": _0x1c8af5 } : void 0);
  if (!_0x1f72c2["ok"]) throw new OgcRequestError("OGC_CAPABILITIES_REQUEST_FAILED", "GetCapabilities isteği başarısız: " + _0x1f72c2["status"] + " " + _0x1f72c2["statusText"]);
  const _0x487d7c = await _0x1f72c2["text"](), _0x4de051 = new DOMParser()["parseFromString"](_0x487d7c, "application/xml");
  if (_0x4de051["getElementsByTagName"]("parsererror")["length"] > 0) throw new OgcRequestError("OGC_SERVICE_DISCOVERY_PARSE_FAILED", "GetCapabilities yanıtı XML olarak ayrıştırılamadı.");
  return _0x4de051;
}
function parseWmsStyles(_0x14f27e, _0x22be35) {
  var _a2, _b, _c, _d;
  const _0x4b41b9 = elementsByLocalName(_0x14f27e, "Layer")["find"]((_0xc8fd9c) => {
    var _a3, _b2;
    return ((_b2 = (_a3 = childByLocalName(_0xc8fd9c, "Name")) == null ? void 0 : _a3["textContent"]) == null ? void 0 : _b2["trim"]()) === _0x22be35;
  });
  if (!_0x4b41b9) return [];
  const _0x3d9896 = [];
  for (const _0x1b393a of Array["from"](_0x4b41b9["children"])) {
    if (_0x1b393a["localName"] !== "Style") continue;
    const _0x163ed0 = (_b = (_a2 = childByLocalName(_0x1b393a, "Name")) == null ? void 0 : _a2["textContent"]) == null ? void 0 : _b["trim"]();
    if (!_0x163ed0) continue;
    const _0x468098 = ((_d = (_c = childByLocalName(_0x1b393a, "Title")) == null ? void 0 : _c["textContent"]) == null ? void 0 : _d["trim"]()) ?? _0x163ed0;
    _0x3d9896["push"]({ "name": _0x163ed0, "title": _0x468098 });
  }
  return _0x3d9896;
}
function parseWmtsStyles(_0x455f86, _0x42169c) {
  var _a2, _b, _c, _d, _e;
  const _0x30042f = elementsByLocalName(_0x455f86, "Layer")["find"]((_0x38ffba) => {
    var _a3, _b2;
    return ((_b2 = (_a3 = childByLocalName(_0x38ffba, "Identifier")) == null ? void 0 : _a3["textContent"]) == null ? void 0 : _b2["trim"]()) === _0x42169c;
  });
  if (!_0x30042f) return [];
  const _0x24fac5 = [];
  for (const _0xeb8975 of Array["from"](_0x30042f["children"])) {
    if (_0xeb8975["localName"] !== "Style") continue;
    const _0x549f0c = (_b = (_a2 = childByLocalName(_0xeb8975, "Identifier")) == null ? void 0 : _a2["textContent"]) == null ? void 0 : _b["trim"]();
    if (!_0x549f0c) continue;
    const _0xd87938 = ((_d = (_c = childByLocalName(_0xeb8975, "Title")) == null ? void 0 : _c["textContent"]) == null ? void 0 : _d["trim"]()) ?? _0x549f0c, _0x2cb898 = ((_e = childByLocalName(_0xeb8975, "LegendURL")) == null ? void 0 : _e["getAttribute"]("xlink:href")) ?? "", _0xd08be4 = _0xeb8975["getAttribute"]("isDefault") === "true";
    _0x24fac5["push"]({ "name": _0x549f0c, "title": _0xd87938, "legendUrl": _0x2cb898, "isDefault": _0xd08be4 });
  }
  return _0x24fac5["sort"]((_0x2ea3c9, _0xa9eb82) => Number(_0xa9eb82["isDefault"]) - Number(_0x2ea3c9["isDefault"])), _0x24fac5["map"]((_0x4ea3b7) => ({ "name": _0x4ea3b7["name"], "title": _0x4ea3b7["title"], "legendUrl": _0x4ea3b7["legendUrl"] }));
}
function buildCapabilitiesUrl(_0x322c4b, _0x4e6243, _0x3d5abe) {
  const _0x58ee10 = new URL(_0x322c4b);
  return _0x58ee10["searchParams"]["set"]("SERVICE", _0x4e6243), _0x58ee10["searchParams"]["set"]("REQUEST", "GetCapabilities"), _0x58ee10["searchParams"]["set"]("VERSION", _0x3d5abe), _0x58ee10["toString"]();
}
function elementsByLocalName(_0x451e74, _0x9053a3) {
  return Array["from"](_0x451e74["getElementsByTagNameNS"]("*", _0x9053a3));
}
function childByLocalName(_0x5b59f5, _0x3dd2fa) {
  return Array["from"](_0x5b59f5["children"])["find"]((_0x3ade1c) => _0x3ade1c["localName"] === _0x3dd2fa);
}
function parseWmsGeographicBoundingBox(_0x553ea9) {
  var _a2, _b, _c, _d;
  const _0x437433 = childByLocalName(_0x553ea9, "EX_GeographicBoundingBox");
  if (_0x437433) {
    const _0x2f60bc = (_a2 = childByLocalName(_0x437433, "westBoundLongitude")) == null ? void 0 : _a2["textContent"], _0x297386 = (_b = childByLocalName(_0x437433, "eastBoundLongitude")) == null ? void 0 : _b["textContent"], _0x29dcdf = (_c = childByLocalName(_0x437433, "southBoundLatitude")) == null ? void 0 : _c["textContent"], _0x438e6f = (_d = childByLocalName(_0x437433, "northBoundLatitude")) == null ? void 0 : _d["textContent"];
    if (_0x2f60bc && _0x297386 && _0x29dcdf && _0x438e6f) {
      const _0x283cfc = { "west": Number(_0x2f60bc), "south": Number(_0x29dcdf), "east": Number(_0x297386), "north": Number(_0x438e6f) };
      if (Object["values"](_0x283cfc)["every"](Number["isFinite"])) return _0x283cfc;
    }
  }
  const _0x685f8 = childByLocalName(_0x553ea9, "LatLonBoundingBox");
  if (_0x685f8) {
    const _0xef8844 = { "west": Number(_0x685f8["getAttribute"]("minx")), "south": Number(_0x685f8["getAttribute"]("miny")), "east": Number(_0x685f8["getAttribute"]("maxx")), "north": Number(_0x685f8["getAttribute"]("maxy")) };
    if (Object["values"](_0xef8844)["every"](Number["isFinite"])) return _0xef8844;
  }
  return void 0;
}
function parseWmsCapabilities(_0x4b0c30) {
  var _a2;
  const _0x58ee47 = [];
  for (const _0x807ca6 of elementsByLocalName(_0x4b0c30, "Layer")) {
    const _0x46413b = childByLocalName(_0x807ca6, "Name");
    if (!(_0x46413b == null ? void 0 : _0x46413b["textContent"])) continue;
    const _0xd7554f = childByLocalName(_0x807ca6, "Title"), _0x3b17cf = parseWmsGeographicBoundingBox(_0x807ca6);
    _0x58ee47["push"]({ "identifier": _0x46413b["textContent"]["trim"](), "title": ((_a2 = _0xd7554f == null ? void 0 : _0xd7554f["textContent"]) == null ? void 0 : _a2["trim"]()) || _0x46413b["textContent"]["trim"](), ..._0x3b17cf && { "geographicBoundingBox": _0x3b17cf } });
  }
  return _0x58ee47;
}
function parseWmsTiffFormat(_0x520131) {
  const _0xe6688f = elementsByLocalName(_0x520131, "GetMap")[0];
  if (!_0xe6688f) return void 0;
  const _0x5d2d46 = new Set(elementsByLocalName(_0xe6688f, "Format")["map"]((_0x398727) => {
    var _a2;
    return (_a2 = _0x398727["textContent"]) == null ? void 0 : _a2["trim"]()["toLowerCase"]();
  })["filter"]((_0x394a77) => !!_0x394a77));
  if (_0x5d2d46["has"]("image/geotiff")) return "image/geotiff";
  if (_0x5d2d46["has"]("image/tiff")) return "image/tiff";
  return void 0;
}
function parseWcsTiffFormat(_0x30da67) {
  const _0x38c884 = new Set(elementsByLocalName(_0x30da67, "formatSupported")["map"]((_0x25723e) => {
    var _a2;
    return (_a2 = _0x25723e["textContent"]) == null ? void 0 : _a2["trim"]()["toLowerCase"]();
  })["filter"]((_0x42d85a) => !!_0x42d85a));
  if (_0x38c884["has"]("image/geotiff")) return "image/geotiff";
  if (_0x38c884["has"]("image/tiff")) return "image/tiff";
  return void 0;
}
function parseWmtsCapabilities(_0x3ee59a) {
  var _a2;
  const _0x331c09 = [];
  for (const _0x1eae3e of elementsByLocalName(_0x3ee59a, "Layer")) {
    const _0x307332 = childByLocalName(_0x1eae3e, "Identifier");
    if (!(_0x307332 == null ? void 0 : _0x307332["textContent"])) continue;
    const _0x44e2f7 = childByLocalName(_0x1eae3e, "Title"), _0x3d0c81 = childByLocalName(_0x1eae3e, "TileMatrixSetLink"), _0x243986 = _0x3d0c81 ? childByLocalName(_0x3d0c81, "TileMatrixSet") : void 0;
    _0x331c09["push"]({ "identifier": _0x307332["textContent"]["trim"](), "title": ((_a2 = _0x44e2f7 == null ? void 0 : _0x44e2f7["textContent"]) == null ? void 0 : _a2["trim"]()) || _0x307332["textContent"]["trim"](), ...(_0x243986 == null ? void 0 : _0x243986["textContent"]) && { "tileMatrixSetID": _0x243986["textContent"]["trim"]() } });
  }
  return _0x331c09;
}
function parseWfsCapabilities(_0x4eeda6) {
  var _a2;
  const _0x5e2fe2 = [];
  for (const _0x1e1cb0 of elementsByLocalName(_0x4eeda6, "FeatureType")) {
    const _0x1540e3 = childByLocalName(_0x1e1cb0, "Name");
    if (!(_0x1540e3 == null ? void 0 : _0x1540e3["textContent"])) continue;
    const _0x1c0745 = childByLocalName(_0x1e1cb0, "Title");
    _0x5e2fe2["push"]({ "identifier": _0x1540e3["textContent"]["trim"](), "title": ((_a2 = _0x1c0745 == null ? void 0 : _0x1c0745["textContent"]) == null ? void 0 : _a2["trim"]()) || _0x1540e3["textContent"]["trim"]() });
  }
  return _0x5e2fe2;
}
function parseWcsCapabilities(_0x499025) {
  var _a2, _b;
  const _0x4827a2 = [];
  for (const _0xd2a587 of elementsByLocalName(_0x499025, "CoverageSummary")) {
    const _0xeb67ed = childByLocalName(_0xd2a587, "CoverageId") ?? childByLocalName(_0xd2a587, "Identifier");
    if (!(_0xeb67ed == null ? void 0 : _0xeb67ed["textContent"])) continue;
    const _0x42b85a = childByLocalName(_0xd2a587, "Title");
    _0x4827a2["push"]({ "identifier": _0xeb67ed["textContent"]["trim"](), "title": ((_a2 = _0x42b85a == null ? void 0 : _0x42b85a["textContent"]) == null ? void 0 : _a2["trim"]()) || _0xeb67ed["textContent"]["trim"]() });
  }
  if (_0x4827a2["length"] > 0) return _0x4827a2;
  for (const _0x5a0bd6 of elementsByLocalName(_0x499025, "CoverageOfferingBrief")) {
    const _0x260a92 = childByLocalName(_0x5a0bd6, "name");
    if (!(_0x260a92 == null ? void 0 : _0x260a92["textContent"])) continue;
    const _0x38f4d6 = childByLocalName(_0x5a0bd6, "label");
    _0x4827a2["push"]({ "identifier": _0x260a92["textContent"]["trim"](), "title": ((_b = _0x38f4d6 == null ? void 0 : _0x38f4d6["textContent"]) == null ? void 0 : _b["trim"]()) || _0x260a92["textContent"]["trim"]() });
  }
  return _0x4827a2;
}
async function parseWcsCoverageEnvelope(_0x45c85a) {
  var _a2, _b, _c, _d;
  const _0x61a060 = childByLocalName(_0x45c85a, "boundedBy"), _0x4ffe6d = _0x61a060 ? childByLocalName(_0x61a060, "Envelope") : void 0;
  if (!_0x4ffe6d) return void 0;
  const _0x516d93 = (_b = (_a2 = childByLocalName(_0x4ffe6d, "lowerCorner")) == null ? void 0 : _a2["textContent"]) == null ? void 0 : _b["trim"](), _0x3a6dfb = (_d = (_c = childByLocalName(_0x4ffe6d, "upperCorner")) == null ? void 0 : _c["textContent"]) == null ? void 0 : _d["trim"]();
  if (!_0x516d93 || !_0x3a6dfb) return void 0;
  const _0x503ce3 = _0x516d93["split"](/\s+/)["map"](Number), _0x2e38c6 = _0x3a6dfb["split"](/\s+/)["map"](Number);
  if (_0x503ce3["length"] < 2 || _0x2e38c6["length"] < 2) return void 0;
  if (![..._0x503ce3, ..._0x2e38c6]["every"](Number["isFinite"])) return void 0;
  const _0x3d56c6 = (_0x4ffe6d["getAttribute"]("axisLabels") ?? "")["trim"]()["toLowerCase"](), _0x413115 = (_0x4ffe6d["getAttribute"]("uomLabels") ?? "")["toLowerCase"]();
  if (_0x413115["includes"]("deg")) {
    const _0x5d594e = _0x3d56c6["startsWith"]("lat");
    return _0x5d594e ? { "south": _0x503ce3[0], "west": _0x503ce3[1], "north": _0x2e38c6[0], "east": _0x2e38c6[1] } : { "west": _0x503ce3[0], "south": _0x503ce3[1], "east": _0x2e38c6[0], "north": _0x2e38c6[1] };
  }
  const _0x125813 = _0x4ffe6d["getAttribute"]("srsName") ?? "";
  return resolveProjectedEnvelope(_0x125813, _0x3d56c6, _0x503ce3, _0x2e38c6);
}
async function resolveProjectedEnvelope(_0x76c6e9, _0xdceedd, _0x363fd6, _0x2a25dd) {
  const _0x479d58 = extractEpsgCode(_0x76c6e9);
  if (!_0x479d58) return void 0;
  const _0x342274 = await ensureProj4Def(_0x479d58);
  if (!_0x342274) return void 0;
  try {
    const _0xebe245 = _0xdceedd["startsWith"]("y") || _0xdceedd["startsWith"]("n"), _0x590ccd = (_0x28488a) => _0xebe245 ? [_0x28488a[1], _0x28488a[0]] : [_0x28488a[0], _0x28488a[1]], [_0xe0421e, _0x378348] = _0x590ccd(_0x363fd6), [_0x374f73, _0x1bbc6c] = _0x590ccd(_0x2a25dd), _0x2f16ed = [[_0xe0421e, _0x378348], [_0x374f73, _0x1bbc6c], [_0xe0421e, _0x1bbc6c], [_0x374f73, _0x378348]], _0xbf1387 = "EPSG:" + _0x479d58, _0x2ea7a5 = _0x2f16ed["map"]((_0x43e7b) => _0x342274(_0xbf1387, "EPSG:4326", _0x43e7b)), _0x29b6b7 = _0x2ea7a5["map"]((_0x17cae5) => _0x17cae5[0]), _0x1b594d = _0x2ea7a5["map"]((_0x258daa) => _0x258daa[1]), _0x54a794 = { "west": Math["min"](..._0x29b6b7), "east": Math["max"](..._0x29b6b7), "south": Math["min"](..._0x1b594d), "north": Math["max"](..._0x1b594d) };
    if (!Object["values"](_0x54a794)["every"](Number["isFinite"])) return void 0;
    return _0x54a794;
  } catch {
    return void 0;
  }
}
async function fetchWcsCoverageExtents(_0x453eba, _0x3ea9b2, _0x193fb5, _0x2f6f68) {
  var _a2;
  const _0x30a7ae = /* @__PURE__ */ new Map();
  if (_0x3ea9b2["length"] === 0) return _0x30a7ae;
  try {
    const _0x5dddef = new URL(_0x453eba);
    _0x5dddef["searchParams"]["set"]("SERVICE", "WCS"), _0x5dddef["searchParams"]["set"]("VERSION", "2.0.1"), _0x5dddef["searchParams"]["set"]("REQUEST", "DescribeCoverage"), _0x5dddef["searchParams"]["set"]("COVERAGEID", _0x3ea9b2["join"](","));
    const _0x2c2a02 = await getCapabilities(_0x5dddef["toString"](), _0x193fb5, _0x2f6f68);
    for (const _0x32394d of elementsByLocalName(_0x2c2a02, "CoverageDescription")) {
      const _0x534666 = childByLocalName(_0x32394d, "CoverageId"), _0x381052 = (_a2 = _0x534666 == null ? void 0 : _0x534666["textContent"]) == null ? void 0 : _a2["trim"]();
      if (!_0x381052) continue;
      const _0x129124 = await parseWcsCoverageEnvelope(_0x32394d);
      if (_0x129124) _0x30a7ae["set"](_0x381052, _0x129124);
    }
  } catch {
  }
  return _0x30a7ae;
}
function wcsRectangleFor(_0x229c5e) {
  const _0x22a118 = _0x229c5e["geographicBoundingBox"];
  if (!_0x22a118) return void 0;
  return Rectangle["fromDegrees"](_0x22a118["west"], _0x22a118["south"], _0x22a118["east"], _0x22a118["north"]);
}
function parseCapabilities(_0x5cf202, _0x1b68ac) {
  switch (_0x5cf202) {
    case "WMS":
      return parseWmsCapabilities(_0x1b68ac);
    case "WMTS":
      return parseWmtsCapabilities(_0x1b68ac);
    case "WFS":
      return parseWfsCapabilities(_0x1b68ac);
    case "WCS":
      return parseWcsCapabilities(_0x1b68ac);
    default:
      return [];
  }
}
function detectServiceType(_0x620600) {
  const _0x27a5df = _0x620600["documentElement"], _0x54adf8 = _0x27a5df["localName"], _0x298ca9 = _0x27a5df["namespaceURI"] ?? "";
  if (_0x54adf8 === "WMS_Capabilities" || _0x54adf8 === "WMT_MS_Capabilities" || _0x298ca9["includes"]("/wms")) return "WMS";
  if (_0x54adf8 === "WFS_Capabilities" || _0x298ca9["includes"]("/wfs")) return "WFS";
  if (_0x298ca9["includes"]("/wmts")) return "WMTS";
  if (_0x298ca9["includes"]("/wcs") || _0x54adf8 === "WCS_Capabilities") return "WCS";
  return void 0;
}
const _OgcLayerFactory = class _OgcLayerFactory {
  constructor(_0x56f188, _0xb1a7d) {
    this["viewer"] = _0x56f188, this["deps"] = _0xb1a7d, this["serviceLayerOptions"] = /* @__PURE__ */ new Map();
  }
  ["getServiceOptions"](_0x42a598) {
    return this["serviceLayerOptions"]["get"](_0x42a598);
  }
  ["deleteServiceOptions"](_0x259007) {
    this["serviceLayerOptions"]["delete"](_0x259007);
  }
  ["buildWmsProvider"](_0x371fde) {
    var _a2, _b;
    const _0x2f9f8e = this["deps"]["apiKeyPolicy"]["resolveOgcProxyUrl"]("wms", _0x371fde["url"]), _0x5b552e = (_a2 = _0x371fde["layers"]) == null ? void 0 : _a2["trim"]();
    if (!_0x5b552e) throw new LayerOperationError("LAYER_WMS_LAYERS_EMPTY", "WMS katmani eklenemedi: layers (ogcLayerName) bos — id=" + _0x371fde["id"]);
    const _0x4b3877 = this["deps"]["apiKeyPolicy"]["mergeApiKeyHeader"](this["deps"]["apiKeyPolicy"]["buildAuthHeaders"](_0x371fde["authToken"]), _0x2f9f8e), _0x510137 = _0x371fde["version"] ?? "1.3.0", _0x18fb87 = new WebMapServiceImageryProvider({ "url": _0x4b3877 ? new Resource({ "url": _0x2f9f8e, "headers": _0x4b3877 }) : _0x2f9f8e, "layers": _0x5b552e, "parameters": { "service": "WMS", "version": _0x510137, "request": "GetMap", "transparent": "true", "format": "image/png", ..._0x371fde["parameters"] }, "getFeatureInfoParameters": { "version": _0x510137, "styles": ((_b = _0x371fde["parameters"]) == null ? void 0 : _b["styles"]) ?? "" }, "getFeatureInfoFormats": [new GetFeatureInfoFormat("json"), new GetFeatureInfoFormat("xml", "application/vnd.ogc.gml"), new GetFeatureInfoFormat("xml", "text/xml"), new GetFeatureInfoFormat("html")], ..._0x371fde["rectangle"] !== void 0 && { "rectangle": _0x371fde["rectangle"] }, ..._0x371fde["minimumLevel"] !== void 0 && { "minimumLevel": _0x371fde["minimumLevel"] }, ..._0x371fde["maximumLevel"] !== void 0 && { "maximumLevel": _0x371fde["maximumLevel"] }, ..._0x371fde["tileWidth"] !== void 0 && { "tileWidth": _0x371fde["tileWidth"] }, ..._0x371fde["tileHeight"] !== void 0 && { "tileHeight": _0x371fde["tileHeight"] } });
    return _0x18fb87;
  }
  ["addWMS"](_0x555d5d) {
    const _0x32f90c = this["buildWmsProvider"](_0x555d5d), _0x4b1535 = this["viewer"]["imageryLayers"]["addImageryProvider"](_0x32f90c), _0x425919 = this["deps"]["register"](_0x555d5d["id"], _0x555d5d["title"], "WMS", _0x4b1535, ![]);
    return this["serviceLayerOptions"]["set"](_0x555d5d["id"], _0x555d5d), Promise["resolve"](_0x425919);
  }
  ["buildWmtsProvider"](_0x28ce30) {
    const _0x4d074b = this["deps"]["apiKeyPolicy"]["resolveOgcProxyUrl"]("wmts", _0x28ce30["url"]), _0x247f06 = this["deps"]["apiKeyPolicy"]["mergeApiKeyHeader"](this["deps"]["apiKeyPolicy"]["buildAuthHeaders"](_0x28ce30["authToken"]), _0x4d074b);
    return new WebMapTileServiceImageryProvider({ "url": _0x247f06 ? new Resource({ "url": _0x4d074b, "headers": _0x247f06 }) : _0x4d074b, "layer": _0x28ce30["layer"], "style": _0x28ce30["style"] ?? "default", "tileMatrixSetID": _0x28ce30["tileMatrixSetID"], "format": _0x28ce30["format"] ?? "image/png", "tilingScheme": new WebMercatorTilingScheme(), ..._0x28ce30["tileWidth"] !== void 0 && { "tileWidth": _0x28ce30["tileWidth"] }, ..._0x28ce30["tileHeight"] !== void 0 && { "tileHeight": _0x28ce30["tileHeight"] }, ..._0x28ce30["minimumLevel"] !== void 0 && { "minimumLevel": _0x28ce30["minimumLevel"] }, ..._0x28ce30["maximumLevel"] !== void 0 && { "maximumLevel": _0x28ce30["maximumLevel"] }, ..._0x28ce30["rectangle"] !== void 0 && { "rectangle": _0x28ce30["rectangle"] } });
  }
  ["addWMTS"](_0x4382ca) {
    const _0x44c70a = this["buildWmtsProvider"](_0x4382ca), _0x49b446 = this["viewer"]["imageryLayers"]["addImageryProvider"](_0x44c70a), _0x1bde84 = this["deps"]["register"](_0x4382ca["id"], _0x4382ca["title"], "WMTS", _0x49b446, ![]);
    return this["serviceLayerOptions"]["set"](_0x4382ca["id"], _0x4382ca), Promise["resolve"](_0x1bde84);
  }
  async ["getWmsAvailableStyles"](_0x4f70c7) {
    const _0x4b6194 = this["requireServiceOptions"](_0x4f70c7, "WMS"), _0x134554 = _0x4b6194["version"] ?? "1.3.0", _0x2e5a9f = await this["getCapabilitiesDocument"](_0x4b6194["url"], "WMS", _0x134554, _0x4b6194["authToken"]);
    return parseWmsStyles(_0x2e5a9f, _0x4b6194["layers"])["map"]((_0x199352) => ({ ..._0x199352, "legendUrl": this["getWmsLegendGraphicUrl"](_0x4f70c7, _0x199352["name"]) }));
  }
  async ["setWmsStyle"](_0x146a70, _0x5017a1) {
    const _0x3145b7 = this["requireServiceOptions"](_0x146a70, "WMS"), _0x5c6650 = { ..._0x3145b7, "parameters": { ..._0x3145b7["parameters"], "STYLES": _0x5017a1 } };
    await this["rebuildImageryLayer"](_0x146a70, () => this["buildWmsProvider"](_0x5c6650)), this["serviceLayerOptions"]["set"](_0x146a70, _0x5c6650);
  }
  ["getWmsLegendGraphicUrl"](_0x58b5af, _0x4c3b9b) {
    const _0x5bde69 = this["requireServiceOptions"](_0x58b5af, "WMS"), _0x434c23 = new URLSearchParams({ "service": "WMS", "version": _0x5bde69["version"] ?? "1.3.0", "request": "GetLegendGraphic", "format": "image/png", "layer": _0x5bde69["layers"], "sld_version": "1.1.0", ..._0x4c3b9b !== void 0 && _0x4c3b9b !== "" ? { "style": _0x4c3b9b } : {} }), _0x463311 = this["deps"]["apiKeyPolicy"]["resolveOgcProxyUrl"]("wms", _0x5bde69["url"]);
    return this["deps"]["apiKeyPolicy"]["attachApiKeyToUrl"]("" + _0x463311 + (_0x463311["includes"]("?") ? "&" : "?") + _0x434c23["toString"]());
  }
  async ["getWmtsAvailableStyles"](_0x536650) {
    const _0x1da66a = this["requireServiceOptions"](_0x536650, "WMTS"), _0x423f2d = await this["getCapabilitiesDocument"](_0x1da66a["url"], "WMTS", "1.0.0", _0x1da66a["authToken"]), _0xb5387d = parseWmtsStyles(_0x423f2d, _0x1da66a["layer"]);
    return _0xb5387d["map"]((_0x211d4) => ({ ..._0x211d4, "legendUrl": this["deps"]["apiKeyPolicy"]["attachApiKeyToUrl"](_0x211d4["legendUrl"]) }));
  }
  async ["setWmtsStyle"](_0x53fe52, _0x2f1aaf) {
    const _0x2ba239 = this["requireServiceOptions"](_0x53fe52, "WMTS"), _0x5204ec = { ..._0x2ba239, "style": _0x2f1aaf };
    await this["rebuildImageryLayer"](_0x53fe52, () => this["buildWmtsProvider"](_0x5204ec)), this["serviceLayerOptions"]["set"](_0x53fe52, _0x5204ec);
  }
  async ["addWFS"](_0x4d7212) {
    const _0x5a912e = this["deps"]["apiKeyPolicy"]["resolveOgcProxyUrl"]("wfs", _0x4d7212["url"]), _0x176bcc = {};
    _0x4d7212["authToken"] !== void 0 && (_0x176bcc["headers"] = { "Authorization": "Bearer " + _0x4d7212["authToken"] });
    const _0x1c798f = this["deps"]["apiKeyPolicy"]["mergeApiKeyHeader"](_0x176bcc["headers"], _0x5a912e);
    if (_0x1c798f !== void 0) _0x176bcc["headers"] = _0x1c798f;
    const _0x5402a0 = { ..._0x4d7212, "url": _0x5a912e }, _0x1ae01f = await fetchWfsCapabilities(_0x5a912e, _0x176bcc), _0x45c088 = { "typeNameHint": _0x4d7212["typeName"], "caps": _0x1ae01f };
    if (_0x4d7212["version"] !== void 0) _0x45c088["version"] = _0x4d7212["version"];
    if (_0x4d7212["srsName"] !== void 0) _0x45c088["srsName"] = _0x4d7212["srsName"];
    _0x4d7212["outputFormat"] !== void 0 && (_0x45c088["outputFormat"] = _0x4d7212["outputFormat"]);
    _0x4d7212["maxFeatures"] !== void 0 ? _0x45c088["maxFeatures"] = _0x4d7212["maxFeatures"] : _0x45c088["maxFeatures"] = _OgcLayerFactory["TEMP_WFS_UNLIMITED_MAX_FEATURES"];
    const _0x570aea = buildWfsGetFeaturePlan(_0x45c088);
    let _0x11c701;
    try {
      _0x11c701 = await this["fetchWfsGeoJson"](_0x5402a0, _0x176bcc, _0x570aea);
    } catch (_0x5c714e) {
      try {
        _0x11c701 = await this["fetchWfsGml"](_0x5402a0, _0x176bcc, _0x570aea);
      } catch (_0xf68a14) {
        _0xf68a14 instanceof Error && (_0xf68a14["cause"] = _0x5c714e);
        throw _0xf68a14;
      }
    }
    const _0x5f58d2 = _0x11c701 !== null && typeof _0x11c701 === "object" ? _0x11c701["features"] : void 0;
    return Array["isArray"](_0x5f58d2) ? _0x5f58d2["length"] : _0x570aea["maxFeatures"], loadVectorGeoJsonLayer(this["viewer"], this["deps"], _0x11c701, { "id": _0x4d7212["id"], "title": _0x4d7212["title"], "layerType": "WFS", "clampToGround": _0x4d7212["clampToGround"] ?? ![] }, (_0x322299) => {
    });
  }
  async ["fetchWfsHitsCount"](_0x27e482, _0x257878, _0x1fe53c) {
    if (!_0x1fe53c["version"]["startsWith"]("2.") && !_0x1fe53c["version"]["startsWith"]("1.1")) return void 0;
    const _0x27c1f7 = new URLSearchParams();
    appendWfsGetFeatureParams(_0x27c1f7, _0x1fe53c), _0x27c1f7["delete"]("count"), _0x27c1f7["delete"]("maxFeatures"), _0x27c1f7["set"]("resultType", "hits");
    let _0x4bdf22;
    try {
      _0x4bdf22 = await fetch("" + _0x27e482["url"] + (_0x27e482["url"]["includes"]("?") ? "&" : "?") + _0x27c1f7["toString"](), _0x257878);
    } catch {
      return void 0;
    }
    if (!_0x4bdf22["ok"]) return void 0;
    const _0x298a28 = decodeTextBuffer(await _0x4bdf22["arrayBuffer"]());
    if (isOgcExceptionXml(_0x298a28)) return void 0;
    const _0x3596e9 = _0x298a28["trimStart"]();
    if (_0x3596e9["startsWith"]("{")) try {
      const _0x50dc54 = JSON["parse"](_0x3596e9), _0x42cf90 = _0x50dc54["numberMatched"] ?? _0x50dc54["totalFeatures"];
      return typeof _0x42cf90 === "number" ? _0x42cf90 : void 0;
    } catch {
      return void 0;
    }
    try {
      const _0x700709 = new DOMParser()["parseFromString"](_0x298a28, "application/xml")["documentElement"], _0x47cc79 = _0x700709["getAttribute"]("numberMatched") ?? _0x700709["getAttribute"]("numberOfFeatures") ?? _0x700709["getAttribute"]("numberReturned");
      if (!_0x47cc79) return void 0;
      const _0x1ccc54 = Number(_0x47cc79);
      return Number["isFinite"](_0x1ccc54) ? _0x1ccc54 : void 0;
    } catch {
      return void 0;
    }
  }
  async ["fetchWfsGeoJson"](_0x1e8283, _0x2ef2b4, _0xb883dc) {
    const _0x1bf5f1 = _0xb883dc["jsonOutputFormat"];
    if (!_0x1bf5f1) throw new OgcRequestError("OGC_WFS_JSON_FORMAT_UNSUPPORTED", "WFS sunucusu JSON çıktı formatı ilan etmiyor.");
    const _0x5d4884 = new URLSearchParams();
    appendWfsGetFeatureParams(_0x5d4884, _0xb883dc, _0x1bf5f1);
    const _0x53fe56 = await fetch("" + _0x1e8283["url"] + (_0x1e8283["url"]["includes"]("?") ? "&" : "?") + _0x5d4884["toString"](), _0x2ef2b4), _0x1d63f5 = decodeTextBuffer(await _0x53fe56["arrayBuffer"]());
    if (!_0x53fe56["ok"] || isOgcExceptionXml(_0x1d63f5) || !_0x1d63f5["trimStart"]()["startsWith"]("{")) throw new OgcRequestError("OGC_WFS_GEOJSON_REQUEST_FAILED", "WFS GeoJSON isteği başarısız: " + _0x53fe56["status"] + " " + _0x53fe56["statusText"]);
    return JSON["parse"](_0x1d63f5);
  }
  async ["fetchWfsGml"](_0x289b8e, _0x2e0012, _0xfe6286) {
    const _0x30eb33 = new URLSearchParams();
    appendWfsGetFeatureParams(_0x30eb33, _0xfe6286);
    const _0x230b07 = await fetch("" + _0x289b8e["url"] + (_0x289b8e["url"]["includes"]("?") ? "&" : "?") + _0x30eb33["toString"](), _0x2e0012);
    if (!_0x230b07["ok"]) throw new OgcRequestError("OGC_WFS_REQUEST_FAILED", "WFS isteği başarısız: " + _0x230b07["status"] + " " + _0x230b07["statusText"]);
    const _0x4db32f = decodeTextBuffer(await _0x230b07["arrayBuffer"]());
    if (isOgcExceptionXml(_0x4db32f)) throw new OgcRequestError("OGC_WFS_EXCEPTION", "WFS GetFeature OGC Exception döndü.");
    let _0x8886bf, _0x5a1dd4;
    try {
      ({ default: _0x8886bf } = await import("ol/format/WFS.js")), { default: _0x5a1dd4 } = await import("ol/format/GeoJSON.js");
    } catch {
      throw new OgcRequestError("OGC_WFS_OL_PACKAGE_MISSING", 'WFS sunucusu GeoJSON çıktısı desteklemiyor; GML yanıtını okumak için "ol" paketi gereklidir: pnpm add ol');
    }
    const _0x3b25ad = new _0x8886bf({ "version": _0xfe6286["version"] })["readFeatures"](_0x4db32f);
    return new _0x5a1dd4()["writeFeaturesObject"](_0x3b25ad, { "featureProjection": "EPSG:4326" });
  }
  async ["addWCS"](_0x354cc6) {
    const _0x12a55a = this["deps"]["apiKeyPolicy"]["resolveOgcProxyUrl"]("wcs", _0x354cc6["url"]), _0x1bb962 = { "service": "WCS", "version": _0x354cc6["version"] ?? "2.0.1", "request": "GetCoverage", "coverageId": _0x354cc6["coverageId"], "format": _0x354cc6["format"] ?? "image/png" }, _0x3a9785 = this["deps"]["apiKeyPolicy"]["mergeApiKeyHeader"](this["deps"]["apiKeyPolicy"]["buildAuthHeaders"](_0x354cc6["authToken"]), _0x12a55a), _0x1d71ee = _0x354cc6["rectangle"] ?? Rectangle["fromDegrees"](-180, -90, 180, 90), _0x15a6ad = async (_0x444a17) => {
      const _0x5115bf = { ..._0x1bb962 };
      if (_0x444a17 !== void 0) _0x5115bf["SCALESIZE"] = _0x444a17;
      const _0x5cdf88 = _0x12a55a + "?" + new URLSearchParams(_0x5115bf)["toString"](), _0xdf8a1a = await this["resolveWcsImageUrl"](_0x5cdf88, _0x3a9785);
      try {
        return await SingleTileImageryProvider["fromUrl"](_0xdf8a1a, { "rectangle": _0x1d71ee });
      } finally {
        if (_0xdf8a1a["startsWith"]("blob:")) URL["revokeObjectURL"](_0xdf8a1a);
      }
    }, _0x208659 = _0x354cc6["maxSize"] ?? 2048, _0x3f276a = _0x1bb962["version"]["startsWith"]("2.") && Number["isFinite"](_0x208659);
    let _0x5c31b9;
    if (!_0x3f276a) _0x5c31b9 = await _0x15a6ad();
    else {
      const _0x510cb4 = "http://www.opengis.net/def/axis/OGC/1/i(" + _0x208659 + "),http://www.opengis.net/def/axis/OGC/1/j(" + _0x208659 + ")";
      try {
        _0x5c31b9 = await _0x15a6ad(_0x510cb4);
      } catch {
        _0x5c31b9 = await _0x15a6ad("x(" + _0x208659 + "),y(" + _0x208659 + ")");
      }
    }
    const _0x35ed95 = this["viewer"]["imageryLayers"]["addImageryProvider"](_0x5c31b9);
    return this["serviceLayerOptions"]["set"](_0x354cc6["id"], _0x354cc6), this["deps"]["register"](_0x354cc6["id"], _0x354cc6["title"], "WCS", _0x35ed95, ![]);
  }
  async ["resolveWcsImageUrl"](_0x3b0a4e, _0x5142a6) {
    const _0x1fd2d8 = await fetch(_0x3b0a4e, _0x5142a6 ? { "headers": _0x5142a6 } : void 0);
    if (!_0x1fd2d8["ok"]) throw new OgcRequestError("OGC_WCS_REQUEST_FAILED", "WCS isteği başarısız: " + _0x1fd2d8["status"] + " " + _0x1fd2d8["statusText"]);
    const _0x38ffdd = _0x1fd2d8["headers"]["get"]("content-type") ?? "", _0x2328cd = await _0x1fd2d8["arrayBuffer"](), _0x15fc2b = /boundary="?([^";]+)"?/i["exec"](_0x38ffdd);
    if (!_0x38ffdd["includes"]("multipart/") || !_0x15fc2b) return URL["createObjectURL"](new Blob([_0x2328cd], { "type": _0x38ffdd || "image/png" }));
    const _0x4f6ac4 = extractMultipartImage(new Uint8Array(_0x2328cd), _0x15fc2b[1]), _0x18c61d = _0x4f6ac4["bytes"]["buffer"]["slice"](_0x4f6ac4["bytes"]["byteOffset"], _0x4f6ac4["bytes"]["byteOffset"] + _0x4f6ac4["bytes"]["byteLength"]);
    return URL["createObjectURL"](new Blob([_0x18c61d], { "type": _0x4f6ac4["mimeType"] }));
  }
  ["addGeoTiff"](_0x53749c) {
    throw new LayerOperationError("LAYER_GEOTIFF_UNSUPPORTED", "GeoTIFF katmanı bu Cesium sürümünde (≥1.143) henüz desteklenmiyor. GeoTiffImageryProvider mevcut değil. geotiff.js ile özel provider gereklidir.");
  }
  ["requireServiceOptions"](_0x56c6a1, _0x3fd37d) {
    const _0x5bd98c = this["deps"]["requireLayer"](_0x56c6a1);
    if (_0x5bd98c["layerType"] !== _0x3fd37d) throw new LayerOperationError("LAYER_TYPE_MISMATCH", "Katman " + _0x3fd37d + ' değil: "' + _0x56c6a1 + '" (' + _0x5bd98c["layerType"] + ")");
    const _0x344b6b = this["serviceLayerOptions"]["get"](_0x56c6a1);
    if (_0x344b6b === void 0) throw new LayerOperationError("LAYER_SERVICE_OPTIONS_NOT_FOUND", 'Katman için orijinal servis seçenekleri bulunamadı: "' + _0x56c6a1 + '"');
    return _0x344b6b;
  }
  async ["rebuildImageryLayer"](_0x21a9bd, _0x55f713) {
    const _0x43d726 = this["deps"]["requireLayer"](_0x21a9bd);
    if (!(_0x43d726["cesiumObject"] instanceof ImageryLayer)) throw new LayerOperationError("LAYER_NOT_RASTER", 'Katman raster (ImageryLayer) değil: "' + _0x21a9bd + '"');
    const _0x1d71fb = _0x43d726["cesiumObject"], _0x5aea0a = this["viewer"]["imageryLayers"]["indexOf"](_0x1d71fb), { show: _0x221009, alpha: _0x538a72 } = _0x1d71fb, _0x1a81c7 = _0x55f713(), _0x3db4ba = new ImageryLayer(_0x1a81c7, { "show": _0x221009, "alpha": _0x538a72 });
    this["viewer"]["imageryLayers"]["remove"](_0x1d71fb, !![]), this["viewer"]["imageryLayers"]["add"](_0x3db4ba, _0x5aea0a), this["deps"]["setItem"](_0x21a9bd, Object["freeze"]({ ..._0x43d726, "cesiumObject": _0x3db4ba }));
  }
  async ["getCapabilitiesDocument"](_0x558719, _0x551bc9, _0x47f6be, _0x58f306) {
    const _0x464507 = this["deps"]["apiKeyPolicy"]["resolveOgcProxyUrl"](_0x551bc9["toLowerCase"](), _0x558719), _0x3b5ff1 = buildCapabilitiesUrl(_0x464507, _0x551bc9, _0x47f6be);
    return getCapabilities(_0x3b5ff1, _0x58f306, this["deps"]["apiKeyPolicy"]);
  }
  async ["getWcsCoverageExtents"](_0x1193d8, _0x16acf8, _0x1b96ec) {
    const _0x562dc0 = this["deps"]["apiKeyPolicy"]["resolveOgcProxyUrl"]("wcs", _0x1193d8);
    return fetchWcsCoverageExtents(_0x562dc0, _0x16acf8, _0x1b96ec, this["deps"]["apiKeyPolicy"]);
  }
};
_OgcLayerFactory["TEMP_WFS_UNLIMITED_MAX_FEATURES"] = 1e6;
let OgcLayerFactory = _OgcLayerFactory;
class ShapeLayerBridge {
  constructor(_0x525bf7, _0x1e14ee) {
    this["viewer"] = _0x525bf7, this["deps"] = _0x1e14ee, this["drawnShapeCounters"] = /* @__PURE__ */ new Map();
  }
  ["deleteCounter"](_0x41fa25) {
    this["drawnShapeCounters"]["delete"](_0x41fa25);
  }
  async ["addDrawnShape"](_0x57ad8c, _0x5da6e7, _0x245f1e) {
    const _0x2b2ca4 = _0x245f1e["entity"];
    this["viewer"]["entities"]["remove"](_0x2b2ca4);
    const _0x46647e = (this["drawnShapeCounters"]["get"](_0x57ad8c) ?? 0) + 1;
    this["drawnShapeCounters"]["set"](_0x57ad8c, _0x46647e), _0x2b2ca4["properties"] = buildDrawnShapeProperties(_0x245f1e, _0x46647e);
    const _0x120404 = this["deps"]["getItem"](_0x57ad8c), _0x44b64d = _0x120404 && "entities" in _0x120404["cesiumObject"] ? _0x120404["cesiumObject"] : new CustomDataSource(_0x5da6e7), _0x379094 = _0x120404 ? this["deps"]["getStyle"](_0x57ad8c) : void 0, _0x430a1e = (_0x379094 == null ? void 0 : _0x379094["fill"]["mode"]) === "solid" ? Color["fromCssColorString"](_0x379094["fill"]["color"])["withAlpha"](_0x379094["fill"]["opacity"]) : Color["CYAN"]["withAlpha"](0.4), _0x8ee2f5 = (_0x379094 == null ? void 0 : _0x379094["outline"]) ?? { "enabled": !![], "color": this["deps"]["defaultOutlineColorHex"], "width": 1 };
    this["deps"]["applyEntityStyle"](_0x2b2ca4, _0x430a1e, _0x8ee2f5, !![]), _0x44b64d["entities"]["add"](_0x2b2ca4);
    _0x2b2ca4["polygon"] !== void 0 && this["deps"]["addPolygonOutlineCompanion"](_0x44b64d, _0x2b2ca4, Color["fromCssColorString"](_0x8ee2f5["color"]), _0x8ee2f5["width"], ![]);
    if (_0x120404) return this["deps"]["tagEntities"](_0x44b64d, _0x57ad8c), _0x120404;
    await this["viewer"]["dataSources"]["add"](_0x44b64d);
    const _0x24e8c5 = Color["CYAN"]["toCssHexString"](), _0x128343 = this["deps"]["register"](_0x57ad8c, _0x5da6e7, "DRAWING", _0x44b64d, ![], _0x24e8c5);
    return this["deps"]["recordInitialStyle"](_0x128343["id"], _0x24e8c5, 0.4, _0x8ee2f5), _0x128343;
  }
  async ["addMeasuredShape"](_0x2d1ddb, _0x5b7078, _0x1e2266) {
    const _0x27db72 = _0x1e2266["entity"];
    this["viewer"]["entities"]["remove"](_0x27db72);
    const _0x18b47f = (this["drawnShapeCounters"]["get"](_0x2d1ddb) ?? 0) + 1;
    this["drawnShapeCounters"]["set"](_0x2d1ddb, _0x18b47f), _0x27db72["properties"] = buildMeasuredShapeProperties(_0x1e2266, _0x18b47f);
    const _0x392274 = this["deps"]["getItem"](_0x2d1ddb), _0x104481 = _0x392274 && "entities" in _0x392274["cesiumObject"] ? _0x392274["cesiumObject"] : new CustomDataSource(_0x5b7078), _0x1a6f75 = _0x392274 ? this["deps"]["getStyle"](_0x2d1ddb) : void 0, _0xeb13e4 = (_0x1a6f75 == null ? void 0 : _0x1a6f75["fill"]["mode"]) === "solid" ? Color["fromCssColorString"](_0x1a6f75["fill"]["color"])["withAlpha"](_0x1a6f75["fill"]["opacity"]) : Color["CYAN"]["withAlpha"](0.4), _0x76145c = (_0x1a6f75 == null ? void 0 : _0x1a6f75["outline"]) ?? { "enabled": !![], "color": this["deps"]["defaultOutlineColorHex"], "width": 1 };
    this["deps"]["applyEntityStyle"](_0x27db72, _0xeb13e4, _0x76145c, !![]), _0x104481["entities"]["add"](_0x27db72);
    _0x27db72["polygon"] !== void 0 && this["deps"]["addPolygonOutlineCompanion"](_0x104481, _0x27db72, Color["fromCssColorString"](_0x76145c["color"]), _0x76145c["width"], ![]);
    if (_0x392274) return this["deps"]["tagEntities"](_0x104481, _0x2d1ddb), _0x392274;
    await this["viewer"]["dataSources"]["add"](_0x104481);
    const _0x384fd3 = Color["CYAN"]["toCssHexString"](), _0x2d7e45 = this["deps"]["register"](_0x2d1ddb, _0x5b7078, "MEASURE", _0x104481, ![], _0x384fd3);
    return this["deps"]["recordInitialStyle"](_0x2d7e45["id"], _0x384fd3, 0.4, _0x76145c), _0x2d7e45;
  }
  ["removeDrawnShape"](_0x335e9f, _0x3981d9) {
    const _0x2ec539 = this["deps"]["getItem"](_0x335e9f);
    if (!_0x2ec539 || !("entities" in _0x2ec539["cesiumObject"])) return;
    _0x2ec539["cesiumObject"]["entities"]["removeById"](_0x3981d9["id"] + "::outline"), _0x2ec539["cesiumObject"]["entities"]["remove"](_0x3981d9), _0x2ec539["cesiumObject"]["entities"]["values"]["length"] === 0 && this["deps"]["removeLayer"](_0x335e9f);
  }
}
const DRAWN_SHAPE_LABELS = { "point": "Nokta", "polyline": "Çizgi", "polygon": "Alan", "rectangle": "Dikdörtgen", "circle": "Daire", "freehand": "Serbest Çizim" };
function roundMeters(_0x451422) {
  return Math["round"](_0x451422 * 100) / 100;
}
function roundCoordinate(_0x367fd2) {
  return Math["round"](_0x367fd2 * 1e6) / 1e6;
}
function wktCoordinatePair(_0x17933e) {
  return roundCoordinate(_0x17933e[0]) + " " + roundCoordinate(_0x17933e[1]);
}
function geometryToWkt(_0xe44cfd) {
  switch (_0xe44cfd["type"]) {
    case "Point": {
      const _0x4bab88 = _0xe44cfd["coordinates"];
      return "POINT (" + wktCoordinatePair(_0x4bab88) + ")";
    }
    case "LineString": {
      const _0x13745b = _0xe44cfd["coordinates"];
      return "LINESTRING (" + _0x13745b["map"]((_0x3e9611) => wktCoordinatePair(_0x3e9611))["join"](", ") + ")";
    }
    case "Polygon": {
      const _0xc53ccd = _0xe44cfd["coordinates"], _0x2c72fe = _0xc53ccd["map"]((_0x466c29) => "(" + _0x466c29["map"]((_0x379083) => wktCoordinatePair(_0x379083))["join"](", ") + ")")["join"](", ");
      return "POLYGON (" + _0x2c72fe + ")";
    }
    default:
      return "";
  }
}
function buildDrawnShapeProperties(_0x3db1a1, _0x147a17) {
  const _0x47d677 = { "id": _0x147a17, "sekil": DRAWN_SHAPE_LABELS[_0x3db1a1["tool"]] };
  if (_0x3db1a1["length"] !== void 0) _0x47d677["uzunluk_m"] = roundMeters(_0x3db1a1["length"]);
  if (_0x3db1a1["area"] !== void 0) _0x47d677["alan_m2"] = roundMeters(_0x3db1a1["area"]);
  if (_0x3db1a1["perimeter"] !== void 0) _0x47d677["cevre_m"] = roundMeters(_0x3db1a1["perimeter"]);
  if (_0x3db1a1["radius"] !== void 0) _0x47d677["yaricap_m"] = roundMeters(_0x3db1a1["radius"]);
  return _0x47d677["olusturma_tarihi"] = new Date(_0x3db1a1["createdAt"])["toLocaleString"]("tr-TR"), _0x47d677["geomwkt"] = geometryToWkt(_0x3db1a1["geometry"]), new PropertyBag(_0x47d677);
}
const MEASURED_SHAPE_LABELS = { "point": "Nokta", "polyline": "Mesafe", "polygon": "Alan", "rectangle": "Dikdörtgen", "circle": "Daire", "freehand": "Serbest Çizim" };
function buildMeasuredShapeProperties(_0x19739b, _0x36c9c4) {
  const _0x340688 = { "id": _0x36c9c4, "olcum_turu": MEASURED_SHAPE_LABELS[_0x19739b["tool"]] };
  if (_0x19739b["length"] !== void 0) _0x340688["uzunluk_m"] = roundMeters(_0x19739b["length"]);
  if (_0x19739b["area"] !== void 0) _0x340688["alan_m2"] = roundMeters(_0x19739b["area"]);
  if (_0x19739b["perimeter"] !== void 0) _0x340688["cevre_m"] = roundMeters(_0x19739b["perimeter"]);
  return _0x340688["olusturma_tarihi"] = new Date(_0x19739b["createdAt"])["toLocaleString"]("tr-TR"), _0x340688["geomwkt"] = geometryToWkt(_0x19739b["geometry"]), new PropertyBag(_0x340688);
}
const _LayerManager = class _LayerManager extends EventEmitter {
  constructor(_0x516274) {
    super(), this["items"] = /* @__PURE__ */ new Map(), this["analysisResultIds"] = /* @__PURE__ */ new Set(), this["viewer"] = _0x516274, this["apiKeyPolicy"] = new ApiKeyPolicy({ "apiBase": () => getUcbpApiBase() }), this["outlineGeometry"] = new OutlineGeometry({ "getCurrentTime": () => this["viewer"]["clock"]["currentTime"] }), this["opacityController"] = new OpacityController({ "requestRender": () => this["viewer"]["scene"]["requestRender"]() }), this["styleEngine"] = new LayerStyleEngine({ "outlineGeometry": this["outlineGeometry"], "opacityController": this["opacityController"], "getCurrentTime": () => this["viewer"]["clock"]["currentTime"], "requestRender": () => this["viewer"]["scene"]["requestRender"](), "emitStyle": (_0xc4e562, _0xc93c78) => this["emit"]("layer:style", { "id": _0xc4e562, "style": _0xc93c78 }), "waitForRenderSettle": () => this["waitForRenderSettle"]() }), this["localSourceLoader"] = new LocalSourceLoader(_0x516274, { "styleEngine": this["styleEngine"], "outlineGeometry": this["outlineGeometry"], "addPolygonOutlines": (_0x30956a, _0x4ef28a, _0xecca50) => this["addPolygonOutlines"](_0x30956a, _0x4ef28a, _0xecca50), "register": (_0x422c59, _0x1d9ff7, _0x1964ae, _0x15151c, _0x15488e, _0x3994ca) => this["register"](_0x422c59, _0x1d9ff7, _0x1964ae, _0x15151c, _0x15488e, _0x3994ca), "emitCrsCheckResult": (_0x82db62, _0x589e3f) => this["emitCrsCheckResult"](_0x82db62, _0x589e3f), "waitForRenderSettle": () => this["waitForRenderSettle"](), "defaultOutlineColor": _LayerManager["DEFAULT_OUTLINE_COLOR"], "defaultOutlineColorHex": _LayerManager["DEFAULT_OUTLINE_COLOR_HEX"] }), this["shapeLayerBridge"] = new ShapeLayerBridge(_0x516274, { "getItem": (_0x107944) => this["items"]["get"](_0x107944), "getStyle": (_0x43ebb7) => this["styleEngine"]["getStyle"](_0x43ebb7), "applyEntityStyle": (_0x42ea22, _0x5b0af6, _0x29677d, _0x272f54) => this["applyEntityStyle"](_0x42ea22, _0x5b0af6, _0x29677d, _0x272f54), "addPolygonOutlineCompanion": (_0x25c2ee, _0x2fa2dd, _0x20e1fa, _0x244b01, _0x183b84) => this["addPolygonOutlineCompanion"](_0x25c2ee, _0x2fa2dd, _0x20e1fa, _0x244b01, _0x183b84), "tagEntities": (_0x311c09, _0x46c84b) => this["tagEntities"](_0x311c09, _0x46c84b), "register": (_0x4b0e30, _0x2249df, _0x2a07b8, _0x10fe36, _0x4c95ff, _0xa36ebb) => this["register"](_0x4b0e30, _0x2249df, _0x2a07b8, _0x10fe36, _0x4c95ff, _0xa36ebb), "recordInitialStyle": (_0x5d602, _0x22294d, _0x243d83, _0x37d67c) => this["styleEngine"]["recordInitialStyle"](_0x5d602, _0x22294d, _0x243d83, _0x37d67c), "removeLayer": (_0x3b8825) => this["removeLayer"](_0x3b8825), "defaultOutlineColorHex": _LayerManager["DEFAULT_OUTLINE_COLOR_HEX"] }), this["ogcLayerFactory"] = new OgcLayerFactory(_0x516274, { "apiKeyPolicy": this["apiKeyPolicy"], "styleEngine": this["styleEngine"], "outlineGeometry": this["outlineGeometry"], "requireLayer": (_0x5c8726) => this["requireLayer"](_0x5c8726), "setItem": (_0x209500, _0x27d31a) => this["items"]["set"](_0x209500, _0x27d31a), "register": (_0x11354d, _0x16c269, _0x2525aa, _0x5a55be, _0x11623e, _0x576a24) => this["register"](_0x11354d, _0x16c269, _0x2525aa, _0x5a55be, _0x11623e, _0x576a24), "addPolygonOutlines": (_0x430034, _0x2ee228, _0x55bd65) => this["addPolygonOutlines"](_0x430034, _0x2ee228, _0x55bd65), "emitCrsCheckResult": (_0x36fae7, _0x5d9661) => this["emitCrsCheckResult"](_0x36fae7, _0x5d9661), "emitFeaturesTruncated": (_0x282b9d, _0x4520b3, _0x360b47) => this["emit"]("layer:features-truncated", { "id": _0x282b9d, "totalCount": _0x4520b3, "loadedCount": _0x360b47 }), "waitForRenderSettle": () => this["waitForRenderSettle"](), "defaultOutlineColor": _LayerManager["DEFAULT_OUTLINE_COLOR"], "defaultOutlineColorHex": _LayerManager["DEFAULT_OUTLINE_COLOR_HEX"] }), this["cameraHighlight"] = new CameraHighlight(_0x516274, { "requireLayer": (_0x51808b) => this["requireLayer"](_0x51808b), "getLayerStyle": (_0x627540) => this["getLayerStyle"](_0x627540) });
  }
  ["configure"](_0x23eda4) {
    this["apiKeyPolicy"]["configure"](_0x23eda4), _0x23eda4["apiKey"] !== void 0 && this["emit"]("apiKey:change", { "hasApiKey": !![] });
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
  ["canAddAuthorizedLayer"](_0xd96977) {
    return this["apiKeyPolicy"]["canAddAuthorizedLayer"](_0xd96977);
  }
  async ["addAuthorizedLayer"](_0x5f51f6) {
    const _0x31b4a6 = this["apiKeyPolicy"]["resolveAddOptions"](_0x5f51f6);
    if (_0x31b4a6["layerType"] === "WMS") return this["add"]("WMS", _0x31b4a6["options"]);
    if (_0x31b4a6["layerType"] === "WFS") return this["add"]("WFS", _0x31b4a6["options"]);
    return this["add"]("WMTS", _0x31b4a6["options"]);
  }
  ["layerRequiresApiKey"](_0x44ed35) {
    return this["apiKeyPolicy"]["layerRequiresApiKey"](_0x44ed35);
  }
  ["getLayers"]() {
    return Array["from"](this["items"]["values"]());
  }
  ["getLayerById"](_0x5c648b) {
    return this["items"]["get"](_0x5c648b);
  }
  ["getEntityPropertyNames"](_0xdb9b26) {
    const _0x683e7e = this["requireLayer"](_0xdb9b26);
    if (!("entities" in _0x683e7e["cesiumObject"])) return [];
    const _0x595298 = /* @__PURE__ */ new Set();
    for (const _0x284574 of _0x683e7e["cesiumObject"]["entities"]["values"]) {
      const _0x1460cd = _0x284574["properties"];
      if (_0x1460cd === void 0) continue;
      for (const _0x9f7851 of _0x1460cd["propertyNames"]) {
        if (_0x9f7851 === "layerId" || _0x9f7851 === "featureId") continue;
        _0x595298["add"](_0x9f7851);
      }
    }
    return Array["from"](_0x595298);
  }
  ["getUniqueColumnValues"](_0x65d1e7, _0x1067ef) {
    const _0x1660c6 = this["requireLayer"](_0x65d1e7);
    if (!("entities" in _0x1660c6["cesiumObject"])) return [];
    const _0x455646 = this["viewer"]["clock"]["currentTime"], _0x550152 = /* @__PURE__ */ new Set();
    for (const _0x3ca229 of _0x1660c6["cesiumObject"]["entities"]["values"]) {
      const _0x55e566 = this["readProperty"](_0x3ca229, _0x1067ef, _0x455646);
      if (_0x55e566 !== null) _0x550152["add"](_0x55e566);
    }
    return Array["from"](_0x550152);
  }
  ["getFeatureCount"](_0x29f4f8) {
    const _0x2111e2 = this["requireLayer"](_0x29f4f8);
    if (!("entities" in _0x2111e2["cesiumObject"])) return void 0;
    let _0x217933 = 0;
    for (const _0x53e10a of _0x2111e2["cesiumObject"]["entities"]["values"]) {
      if (!this["isOutlineCompanion"](_0x53e10a)) _0x217933++;
    }
    return _0x217933;
  }
  ["getLayerGeoJSON"](_0xa85319) {
    return getLayerGeoJSON(this["requireLayer"](_0xa85319), this["viewer"]["clock"]["currentTime"], (_0x27c4d1) => this["isOutlineCompanion"](_0x27c4d1));
  }
  ["exportLayerGeoJSON"](_0xbb00a2, _0x3540e4 = "katman") {
    exportLayerGeoJSON(this["getLayerGeoJSON"](_0xbb00a2), _0x3540e4);
  }
  ["exportLayerKml"](_0x4a2064, _0x2c587f = "katman") {
    exportLayerKml(this["getLayerGeoJSON"](_0x4a2064), _0x2c587f);
  }
  ["exportLayerShapefile"](_0x3c6244, _0x188428 = "katman") {
    exportLayerShapefile(this["getLayerGeoJSON"](_0x3c6244), _0x188428);
  }
  ["markAnalysisResult"](_0x4c67c3) {
    this["analysisResultIds"]["add"](_0x4c67c3);
  }
  ["isAnalysisResult"](_0x46a648) {
    return this["analysisResultIds"]["has"](_0x46a648);
  }
  ["isGeoTiffExportAvailable"](_0x1e3dce) {
    return isGeoTiffExportAvailable(this["items"]["get"](_0x1e3dce), this["ogcLayerFactory"]["getServiceOptions"](_0x1e3dce));
  }
  async ["exportLayerAsGeoTiff"](_0x3358a3, _0x1678d6 = "katman") {
    const _0x28f152 = this["requireLayer"](_0x3358a3);
    await exportLayerAsGeoTiff(_0x28f152, this["ogcLayerFactory"]["getServiceOptions"](_0x3358a3), _0x1678d6, (_0x13e36e, _0x386737) => this["apiKeyPolicy"]["resolveOgcProxyUrl"](_0x13e36e, _0x386737), { "mergeApiKeyHeader": (_0x55181f, _0x2429f5) => this["apiKeyPolicy"]["mergeApiKeyHeader"](_0x55181f, _0x2429f5), "buildAuthHeaders": (_0xd73b30) => this["apiKeyPolicy"]["buildAuthHeaders"](_0xd73b30) });
  }
  ["getColumnRange"](_0x246915, _0x2a46d0) {
    const _0x47cdb5 = this["requireLayer"](_0x246915);
    if (!("entities" in _0x47cdb5["cesiumObject"])) return null;
    return this["styleEngine"]["getColumnRange"](_0x47cdb5["cesiumObject"], this["viewer"]["clock"]["currentTime"], _0x2a46d0);
  }
  async ["applyLayerStyle"](_0x196424, _0x35483c) {
    const _0x3644d4 = this["requireLayer"](_0x196424);
    if (!("entities" in _0x3644d4["cesiumObject"])) throw new LayerOperationError("LAYER_STYLE_NOT_VECTOR", 'applyLayerStyle sadece vektör (Entity tabanlı) katmanlarda kullanılabilir: "' + _0x196424 + '"');
    await this["styleEngine"]["applyLayerStyle"](_0x196424, _0x3644d4["cesiumObject"], _0x3644d4["layerType"] === "DRAWING" || _0x3644d4["layerType"] === "MEASURE", _0x35483c);
  }
  ["getLayerStyle"](_0x4cfe2a) {
    return this["styleEngine"]["getStyle"](_0x4cfe2a);
  }
  ["getInitialFillColor"](_0x3b2397) {
    var _a2;
    return (_a2 = this["items"]["get"](_0x3b2397)) == null ? void 0 : _a2["initialFillColor"];
  }
  ["getImageryLayers"]() {
    return Array["from"](this["items"]["values"]())["filter"]((_0x546a7c) => !_0x546a7c["isBasemap"] && _0x546a7c["cesiumObject"] instanceof ImageryLayer)["map"]((_0x1032b6) => _0x1032b6["cesiumObject"]);
  }
  ["getBasemapLayers"]() {
    return Array["from"](this["items"]["values"]())["filter"]((_0x56ca05) => _0x56ca05["isBasemap"] && _0x56ca05["cesiumObject"] instanceof ImageryLayer)["map"]((_0x555941) => _0x555941["cesiumObject"]);
  }
  ["getDataSourceLayers"]() {
    return this["viewer"]["dataSources"];
  }
  ["getLayerByType"](_0xccc298) {
    return Array["from"](this["items"]["values"]())["filter"]((_0x29f1e0) => _0x29f1e0["layerType"] === _0xccc298);
  }
  async ["zoomToLayer"](_0x50c5ac) {
    return this["cameraHighlight"]["zoomToLayer"](_0x50c5ac);
  }
  async ["zoomToEntity"](_0xea283a, _0x28cfb8) {
    return this["cameraHighlight"]["zoomToEntity"](_0xea283a, _0x28cfb8);
  }
  ["highlightEntity"](_0x3e3ace) {
    this["cameraHighlight"]["highlightEntity"](_0x3e3ace);
  }
  ["clearHighlight"]() {
    this["cameraHighlight"]["clearHighlight"]();
  }
  async ["add"](_0x43664b, _0x5c3338) {
    this["assertUniqueId"](_0x5c3338["id"]);
    switch (_0x43664b) {
      case "WMS":
        return this["addWMS"](_0x5c3338);
      case "WMTS":
        return this["addWMTS"](_0x5c3338);
      case "WFS":
        return this["addWFS"](_0x5c3338);
      case "WCS":
        return this["addWCS"](_0x5c3338);
      case "GEOTIFF":
        return this["addGeoTiff"](_0x5c3338);
      case "GEOJSON":
      case "KML":
      case "KMZ":
        return this["addLocalKmlGeoJson"](_0x43664b, _0x5c3338);
      case "SHP":
        return this["addShp"](_0x5c3338);
      case "CSV":
        return this["addCsv"](_0x5c3338);
      case "XYZ":
        throw new LayerOperationError("LAYER_TYPE_UNSUPPORTED_XYZ", "XYZ katmanı add() ile desteklenmiyor. Map.setBasemap() kullanın.");
      case "DRAWING":
        throw new LayerOperationError("LAYER_TYPE_UNSUPPORTED_DRAWING", '"DRAWING" katmanı add() ile desteklenmiyor -- DrawingManager draw:complete olayı üzerinden Map tarafından otomatik eklenir.');
      case "MEASURE":
        throw new LayerOperationError("LAYER_TYPE_UNSUPPORTED_MEASURE", '"MEASURE" katmanı add() ile desteklenmiyor -- DrawingManager draw:complete olayı üzerinden Map tarafından otomatik eklenir.');
    }
  }
  ["setVisible"](_0x5dd1b, _0x1d6e49) {
    const _0x17ac02 = this["requireLayer"](_0x5dd1b);
    _0x17ac02["cesiumObject"]["show"] = _0x1d6e49, this["emit"]("layer:visibility", { "id": _0x5dd1b, "visible": _0x1d6e49 });
  }
  ["setOpacity"](_0x2ae9d4, _0x9fee1c) {
    const _0x20b832 = Math["max"](0, Math["min"](1, _0x9fee1c)), _0x38aa09 = this["requireLayer"](_0x2ae9d4);
    _0x38aa09["cesiumObject"] instanceof ImageryLayer ? _0x38aa09["cesiumObject"]["alpha"] = _0x20b832 : this["setDataSourceOpacity"](_0x38aa09["cesiumObject"], _0x20b832), this["emit"]("layer:opacity", { "id": _0x2ae9d4, "opacity": _0x20b832 });
  }
  ["_move"](_0x3f2244, _0x5e4141) {
    const _0xa3a148 = this["requireLayer"](_0x3f2244), _0xca83f3 = _0xa3a148["cesiumObject"] instanceof ImageryLayer ? this["viewer"]["imageryLayers"] : this["viewer"]["dataSources"], _0x566c51 = _0xca83f3["indexOf"](_0xa3a148["cesiumObject"]);
    _0xca83f3[_0x5e4141](_0xa3a148["cesiumObject"]);
    const _0x9db537 = _0xca83f3["indexOf"](_0xa3a148["cesiumObject"]);
    this["reindexLayerOrder"](), this["emit"]("layer:reorder", { "id": _0x3f2244, "oldIndex": _0x566c51, "newIndex": _0x9db537, "layer": _0xa3a148 });
  }
  ["raise"](_0x579d06) {
    this["_move"](_0x579d06, "raise");
  }
  ["lower"](_0x25c3d1) {
    this["_move"](_0x25c3d1, "lower");
  }
  ["raiseToTop"](_0x446c7d) {
    this["_move"](_0x446c7d, "raiseToTop");
  }
  ["lowerToBottom"](_0x5c26a1) {
    this["_move"](_0x5c26a1, "lowerToBottom");
  }
  ["reorder"](_0x2f067d) {
    const _0x1d73f5 = _0x2f067d[0], _0x42f96f = _0x1d73f5 !== void 0 ? this["items"]["get"](_0x1d73f5) : void 0, _0x35c348 = (_0x42f96f == null ? void 0 : _0x42f96f["cesiumObject"]) instanceof ImageryLayer, _0x35a60a = _0x42f96f ? _0x35c348 ? this["viewer"]["imageryLayers"]["indexOf"](_0x42f96f["cesiumObject"]) : this["viewer"]["dataSources"]["indexOf"](_0x42f96f["cesiumObject"]) : -1, _0x33d2ad = [], _0x2101fb = [];
    for (const _0x5d7511 of _0x2f067d) {
      const _0x1717df = this["items"]["get"](_0x5d7511);
      if (_0x1717df === void 0) continue;
      _0x1717df["cesiumObject"] instanceof ImageryLayer ? _0x33d2ad["push"](_0x5d7511) : _0x2101fb["push"](_0x5d7511);
    }
    for (let _0x5a1727 = _0x33d2ad["length"] - 1; _0x5a1727 >= 0; _0x5a1727--) {
      const _0x5a4120 = this["items"]["get"](_0x33d2ad[_0x5a1727]);
      (_0x5a4120 == null ? void 0 : _0x5a4120["cesiumObject"]) instanceof ImageryLayer && this["viewer"]["imageryLayers"]["raiseToTop"](_0x5a4120["cesiumObject"]);
    }
    for (let _0x37d5fe = _0x2101fb["length"] - 1; _0x37d5fe >= 0; _0x37d5fe--) {
      const _0x5558f3 = this["items"]["get"](_0x2101fb[_0x37d5fe]);
      _0x5558f3 !== void 0 && !(_0x5558f3["cesiumObject"] instanceof ImageryLayer) && this["viewer"]["dataSources"]["raiseToTop"](_0x5558f3["cesiumObject"]);
    }
    this["reindexLayerOrder"]();
    if (_0x42f96f !== void 0 && _0x1d73f5 !== void 0) {
      const _0x4b16ed = _0x35c348 ? this["viewer"]["imageryLayers"]["indexOf"](_0x42f96f["cesiumObject"]) : this["viewer"]["dataSources"]["indexOf"](_0x42f96f["cesiumObject"]);
      this["emit"]("layer:reorder", { "id": _0x1d73f5, "oldIndex": _0x35a60a, "newIndex": _0x4b16ed, "layer": _0x42f96f });
    }
  }
  ["removeLayer"](_0x4ac0f8) {
    const _0x39e176 = this["requireLayer"](_0x4ac0f8);
    _0x39e176["cesiumObject"] instanceof ImageryLayer ? this["viewer"]["imageryLayers"]["remove"](_0x39e176["cesiumObject"], !![]) : void this["viewer"]["dataSources"]["remove"](_0x39e176["cesiumObject"], !![]), this["items"]["delete"](_0x4ac0f8), this["analysisResultIds"]["delete"](_0x4ac0f8), this["ogcLayerFactory"]["deleteServiceOptions"](_0x4ac0f8), this["styleEngine"]["deleteStyle"](_0x4ac0f8), this["shapeLayerBridge"]["deleteCounter"](_0x4ac0f8), this["emit"]("layer:remove", { "layer": _0x39e176 });
  }
  ["addWMS"](_0x1cb6f5) {
    return this["ogcLayerFactory"]["addWMS"](_0x1cb6f5);
  }
  ["addWMTS"](_0x324f4d) {
    return this["ogcLayerFactory"]["addWMTS"](_0x324f4d);
  }
  async ["getWmsAvailableStyles"](_0x238050) {
    return this["ogcLayerFactory"]["getWmsAvailableStyles"](_0x238050);
  }
  async ["setWmsStyle"](_0x3e0c5a, _0x4a9ea4) {
    return this["ogcLayerFactory"]["setWmsStyle"](_0x3e0c5a, _0x4a9ea4);
  }
  ["getWmsLegendGraphicUrl"](_0x3a81d1, _0x5127db) {
    return this["ogcLayerFactory"]["getWmsLegendGraphicUrl"](_0x3a81d1, _0x5127db);
  }
  async ["getWmtsAvailableStyles"](_0x543782) {
    return this["ogcLayerFactory"]["getWmtsAvailableStyles"](_0x543782);
  }
  async ["setWmtsStyle"](_0x2dbbde, _0x25dc11) {
    return this["ogcLayerFactory"]["setWmtsStyle"](_0x2dbbde, _0x25dc11);
  }
  ["addWFS"](_0x13e1ff) {
    return this["ogcLayerFactory"]["addWFS"]({ ..._0x13e1ff, "clampToGround": _0x13e1ff["clampToGround"] ?? !![] });
  }
  ["addWCS"](_0x3f92aa) {
    return this["ogcLayerFactory"]["addWCS"](_0x3f92aa);
  }
  ["addGeoTiff"](_0x24fdb2) {
    return this["ogcLayerFactory"]["addGeoTiff"](_0x24fdb2);
  }
  ["addLocalKmlGeoJson"](_0x31a76a, _0x12b4a9) {
    return this["localSourceLoader"]["addLocalKmlGeoJson"](_0x31a76a, _0x12b4a9);
  }
  ["addShp"](_0x3476c7) {
    return this["localSourceLoader"]["addShp"](_0x3476c7);
  }
  ["addCsv"](_0x17c944) {
    return this["localSourceLoader"]["addCsv"](_0x17c944);
  }
  ["_addBasemapImageryLayer"](_0x5321a7, _0x2b95af, _0x205a1b) {
    return this["register"](_0x5321a7, _0x2b95af, "XYZ", _0x205a1b, !![]);
  }
  ["_removeBasemapLayers"]() {
    for (const _0x4a138f of this["items"]["values"]()) {
      _0x4a138f["isBasemap"] && _0x4a138f["cesiumObject"] instanceof ImageryLayer && (this["viewer"]["imageryLayers"]["remove"](_0x4a138f["cesiumObject"], !![]), this["items"]["delete"](_0x4a138f["id"]));
    }
  }
  ["_addDrawnShape"](_0x1c252b, _0x5bae68, _0x263f11) {
    return this["shapeLayerBridge"]["addDrawnShape"](_0x1c252b, _0x5bae68, _0x263f11);
  }
  ["_addMeasuredShape"](_0x266255, _0x3763f7, _0x5e07b1) {
    return this["shapeLayerBridge"]["addMeasuredShape"](_0x266255, _0x3763f7, _0x5e07b1);
  }
  ["_removeDrawnShape"](_0x5b0c96, _0x24df88) {
    this["shapeLayerBridge"]["removeDrawnShape"](_0x5b0c96, _0x24df88);
  }
  ["register"](_0x3916c5, _0x4e6ad6, _0x3030e3, _0x15e422, _0x3a9afb, _0x393b04) {
    "entities" in _0x15e422 && this["tagEntities"](_0x15e422, _0x3916c5);
    const _0x7ac28d = Object["freeze"]({ "id": _0x3916c5, "title": _0x4e6ad6, "layerType": _0x3030e3, "cesiumObject": _0x15e422, "isBasemap": _0x3a9afb, ..._0x393b04 !== void 0 ? { "initialFillColor": _0x393b04 } : {} });
    return this["items"]["set"](_0x3916c5, _0x7ac28d), this["emit"]("layer:add", { "layer": _0x7ac28d }), _0x7ac28d;
  }
  ["emitCrsCheckResult"](_0x40ae78, _0x171035) {
    if (!_0x171035) return;
    switch (_0x171035["kind"]) {
      case "reprojected":
        this["emit"]("layer:crs-reprojected", { "id": _0x40ae78, "fromEpsg": _0x171035["fromEpsg"], "toEpsg": "EPSG:4326" });
        break;
      case "suspicious-unresolved-crs":
        this["emit"]("layer:crs-unresolved", { "id": _0x40ae78, "crsName": _0x171035["crsName"] });
        break;
    }
  }
  ["tagEntities"](_0x2c6f3b, _0x3d7b7a) {
    _0x2c6f3b["entities"]["suspendEvents"]();
    for (const _0x1fb3da of _0x2c6f3b["entities"]["values"]) {
      _0x1fb3da["properties"] === void 0 && (_0x1fb3da["properties"] = new PropertyBag()), !_0x1fb3da["properties"]["hasProperty"]("layerId") && _0x1fb3da["properties"]["addProperty"]("layerId", _0x3d7b7a), !_0x1fb3da["properties"]["hasProperty"]("featureId") && _0x1fb3da["properties"]["addProperty"]("featureId", _0x1fb3da["id"]);
    }
    _0x2c6f3b["entities"]["resumeEvents"]();
  }
  ["reindexLayerOrder"]() {
    const _0x357016 = /* @__PURE__ */ new Map();
    for (let _0x5057cd = 0; _0x5057cd < this["viewer"]["imageryLayers"]["length"]; _0x5057cd++) {
      _0x357016["set"](this["viewer"]["imageryLayers"]["get"](_0x5057cd), _0x5057cd);
    }
    const _0x5f1c4c = /* @__PURE__ */ new Map();
    for (let _0x4ac913 = 0; _0x4ac913 < this["viewer"]["dataSources"]["length"]; _0x4ac913++) {
      _0x5f1c4c["set"](this["viewer"]["dataSources"]["get"](_0x4ac913), _0x4ac913);
    }
    const _0x28d835 = (_0x464d44) => (_0x464d44["cesiumObject"] instanceof ImageryLayer ? _0x357016["get"](_0x464d44["cesiumObject"]) : _0x5f1c4c["get"](_0x464d44["cesiumObject"])) ?? Number["POSITIVE_INFINITY"], _0x186588 = Array["from"](this["items"]["entries"]()), _0x5a0f01 = _0x186588["filter"](([, _0x434572]) => _0x434572["cesiumObject"] instanceof ImageryLayer)["sort"](([, _0x3540b5], [, _0xa8f8fe]) => _0x28d835(_0x3540b5) - _0x28d835(_0xa8f8fe)), _0x20d2fe = _0x186588["filter"](([, _0x30a5e6]) => !(_0x30a5e6["cesiumObject"] instanceof ImageryLayer))["sort"](([, _0x28dc34], [, _0x2669aa]) => _0x28d835(_0x28dc34) - _0x28d835(_0x2669aa));
    let _0x50b837 = 0, _0x4308f4 = 0;
    const _0x230af3 = _0x186588["map"](([, _0x4c431c]) => _0x4c431c["cesiumObject"] instanceof ImageryLayer ? _0x5a0f01[_0x50b837++] : _0x20d2fe[_0x4308f4++]);
    this["items"]["clear"]();
    for (const [_0xf6dabe, _0x2a3f94] of _0x230af3) this["items"]["set"](_0xf6dabe, _0x2a3f94);
  }
  ["requireLayer"](_0x21cd6f) {
    const _0x2c0974 = this["items"]["get"](_0x21cd6f);
    if (_0x2c0974 === void 0) throw new LayerOperationError("LAYER_NOT_FOUND", 'Katman bulunamadı: "' + _0x21cd6f + '"');
    return _0x2c0974;
  }
  ["assertUniqueId"](_0x25dcfa) {
    if (this["items"]["has"](_0x25dcfa)) throw new LayerOperationError("LAYER_ID_ALREADY_EXISTS", '"' + _0x25dcfa + `" id'li katman zaten eklenmiş.`);
  }
  async ["getCapabilitiesDocument"](_0xd16386, _0x3389aa, _0x4011f1, _0x578723) {
    return this["ogcLayerFactory"]["getCapabilitiesDocument"](_0xd16386, _0x3389aa, _0x4011f1, _0x578723);
  }
  async ["getWcsCoverageExtents"](_0x2b84a9, _0x4a6b07, _0x2ea0f4) {
    return this["ogcLayerFactory"]["getWcsCoverageExtents"](_0x2b84a9, _0x4a6b07, _0x2ea0f4);
  }
  ["waitForRenderSettle"](_0x13f71f = 60) {
    return new Promise((_0x4bc073) => {
      let _0x16236a = _0x13f71f;
      const _0x23d4d9 = () => {
        _0x16236a -= 1, _0x16236a <= 0 && (this["viewer"]["scene"]["postRender"]["removeEventListener"](_0x23d4d9), _0x4bc073());
      };
      this["viewer"]["scene"]["postRender"]["addEventListener"](_0x23d4d9);
    });
  }
  ["isOutlineCompanion"](_0x3a17b3) {
    return this["outlineGeometry"]["isOutlineCompanion"](_0x3a17b3);
  }
  ["hasOutlineCompanion"](_0x2da80f) {
    return this["outlineGeometry"]["hasOutlineCompanion"](_0x2da80f);
  }
  ["hasRiskyOutline"](_0xfc859d) {
    return this["outlineGeometry"]["hasRiskyOutline"](_0xfc859d);
  }
  ["addPolygonOutlines"](_0x29ce3f, _0x29c8d8, _0x5e59a5) {
    this["outlineGeometry"]["addPolygonOutlines"](_0x29ce3f, _0x29c8d8, _0x5e59a5);
    for (const _0x31c4f5 of _0x29ce3f["entities"]["values"]) {
      this["outlineGeometry"]["hasOutlineCompanion"](_0x31c4f5) && this["opacityController"]["ensureDynamicFillColor"](_0x29ce3f, _0x31c4f5);
    }
  }
  ["addPolygonOutlineCompanion"](_0x30b727, _0x3aff65, _0x22aa8c, _0x140687, _0x40a1e6) {
    this["outlineGeometry"]["addPolygonOutlineCompanion"](_0x30b727, _0x3aff65, _0x22aa8c, _0x140687, _0x40a1e6), this["outlineGeometry"]["hasOutlineCompanion"](_0x3aff65) && this["opacityController"]["ensureDynamicFillColor"](_0x30b727, _0x3aff65);
  }
  ["readProperty"](_0x468237, _0x3a633f, _0x3d6c24) {
    return this["styleEngine"]["readProperty"](_0x468237, _0x3a633f, _0x3d6c24);
  }
  ["applyEntityStyle"](_0x280363, _0x3544f2, _0x26b0ea, _0x49e879) {
    this["styleEngine"]["applyEntityStyle"](_0x280363, _0x3544f2, _0x26b0ea, _0x49e879);
  }
  ["setDataSourceOpacity"](_0x237bfd, _0x14a947) {
    this["opacityController"]["setDataSourceOpacity"](_0x237bfd, _0x14a947);
  }
  ["destroy"]() {
    this["removeAllListeners"](), this["items"]["clear"]();
  }
};
_LayerManager["DEFAULT_OUTLINE_COLOR_HEX"] = "#1a73e8";
_LayerManager["DEFAULT_OUTLINE_COLOR"] = Color["fromCssColorString"](_LayerManager["DEFAULT_OUTLINE_COLOR_HEX"]);
let LayerManager = _LayerManager;
const FLAG = "__tucbsSelectionHighlight";
function isSelectionHighlightEntity(_0xd46d01) {
  return _0xd46d01[FLAG] === !![];
}
class SelectionHighlight {
  constructor(_0x4d8f11) {
    this["viewer"] = _0x4d8f11, this["source"] = null, this["generation"] = 0;
  }
  ["show"](_0x1254f1) {
    const _0x570873 = ++this["generation"];
    if (_0x1254f1["length"] === 0) {
      this["removeSource"]();
      return;
    }
    void this["load"](_0x1254f1, _0x570873);
  }
  ["clear"]() {
    this["generation"]++, this["removeSource"]();
  }
  async ["load"](_0x86724b, _0xbf8b00) {
    const _0x2dc8b8 = Color["fromCssColorString"]("#dc2626")["withAlpha"](0.25), _0x1acc6e = Color["fromCssColorString"]("#dc2626"), _0x1e1fb7 = { "type": "FeatureCollection", "features": [..._0x86724b] }, _0x3e9137 = await GeoJsonDataSource["load"](_0x1e1fb7, { "clampToGround": !![], "fill": _0x2dc8b8, "stroke": _0x1acc6e, "strokeWidth": 3, "markerColor": _0x1acc6e, "markerSize": 16 });
    if (_0xbf8b00 !== this["generation"]) return;
    this["removeSource"](), this["paint"](_0x3e9137, _0x2dc8b8, _0x1acc6e), this["viewer"]["dataSources"]["add"](_0x3e9137), this["source"] = _0x3e9137;
  }
  ["paint"](_0x56bafd, _0x19784c, _0x325345) {
    var _a2;
    for (const _0x4563ac of [..._0x56bafd["entities"]["values"]]) {
      this["tag"](_0x4563ac);
      _0x4563ac["billboard"] && (_0x4563ac["billboard"] = void 0, _0x4563ac["point"] = new PointGraphics({ "pixelSize": 16, "color": _0x325345, "outlineColor": Color["WHITE"], "outlineWidth": 2, "heightReference": HeightReference["CLAMP_TO_GROUND"], "disableDepthTestDistance": Number["POSITIVE_INFINITY"] }));
      const _0x51e2f8 = _0x4563ac["polygon"];
      if (!_0x51e2f8) continue;
      _0x51e2f8["material"] = new ColorMaterialProperty(_0x19784c), _0x51e2f8["outline"] = new ConstantProperty(![]);
      const _0x4871fb = (_a2 = _0x51e2f8["hierarchy"]) == null ? void 0 : _a2["getValue"](JulianDate["now"]());
      this["addRings"](_0x56bafd, _0x4871fb, _0x325345);
    }
  }
  ["addRings"](_0x2db671, _0xb25379, _0x55ae32) {
    var _a2;
    if (!((_a2 = _0xb25379 == null ? void 0 : _0xb25379["positions"]) == null ? void 0 : _a2["length"])) return;
    this["addRing"](_0x2db671, _0xb25379["positions"], _0x55ae32);
    for (const _0x4db7b7 of _0xb25379["holes"] ?? []) this["addRings"](_0x2db671, _0x4db7b7, _0x55ae32);
  }
  ["addRing"](_0x595a21, _0x2c7acf, _0x128c83) {
    const _0x4fda85 = _0x595a21["entities"]["add"]({ "polyline": { "positions": _0x2c7acf, "width": 3, "material": new ColorMaterialProperty(_0x128c83), "clampToGround": !![] } });
    this["tag"](_0x4fda85);
  }
  ["tag"](_0x1ba21f) {
    _0x1ba21f[FLAG] = !![];
  }
  ["removeSource"]() {
    if (!this["source"]) return;
    this["viewer"]["dataSources"]["remove"](this["source"], !![]), this["source"] = null;
  }
}
const DRILL_PICK_LIMIT = 32;
function boundingBoxFromPoints(_0x12d14c) {
  if (_0x12d14c["length"] === 0) return void 0;
  let _0x4be71c = Infinity, _0x419050 = Infinity, _0x2d6203 = -Infinity, _0x41a1d7 = -Infinity;
  for (const [_0x164af7, _0x5e28ef] of _0x12d14c) {
    if (_0x164af7 < _0x4be71c) _0x4be71c = _0x164af7;
    if (_0x164af7 > _0x2d6203) _0x2d6203 = _0x164af7;
    if (_0x5e28ef < _0x419050) _0x419050 = _0x5e28ef;
    if (_0x5e28ef > _0x41a1d7) _0x41a1d7 = _0x5e28ef;
  }
  if (_0x4be71c === _0x2d6203 && _0x419050 === _0x41a1d7) return { "kind": "point", "longitude": _0x4be71c, "latitude": _0x419050 };
  return { "kind": "extent", "west": _0x4be71c, "south": _0x419050, "east": _0x2d6203, "north": _0x41a1d7 };
}
function flattenGeoJsonCoordinates(_0x964c4d, _0x38d518) {
  if (!Array["isArray"](_0x964c4d) || _0x964c4d["length"] === 0) return;
  if (typeof _0x964c4d[0] === "number") {
    const [_0x402758, _0x2f0746] = _0x964c4d;
    if (typeof _0x402758 === "number" && typeof _0x2f0746 === "number") _0x38d518["push"]([_0x402758, _0x2f0746]);
    return;
  }
  for (const _0x384c06 of _0x964c4d) flattenGeoJsonCoordinates(_0x384c06, _0x38d518);
}
function extractGeoJsonExtent(_0x1bde24) {
  if (_0x1bde24 === null || typeof _0x1bde24 !== "object") return void 0;
  const _0x2821b1 = _0x1bde24, _0x5edc98 = _0x2821b1["type"] === "FeatureCollection" && Array["isArray"](_0x2821b1["features"]) ? _0x2821b1["features"]["map"]((_0x3e7474) => _0x3e7474 == null ? void 0 : _0x3e7474["geometry"])["filter"]((_0x325f07) => _0x325f07 !== void 0 && _0x325f07 !== null) : _0x2821b1["geometry"] ? [_0x2821b1["geometry"]] : [];
  if (_0x5edc98["length"] === 0) return void 0;
  const _0x2801a8 = [];
  for (const _0x41eb6c of _0x5edc98) {
    const _0x15b672 = _0x41eb6c;
    if (_0x15b672["type"] === "GeometryCollection" && Array["isArray"](_0x15b672["geometries"])) for (const _0x21a24e of _0x15b672["geometries"]) {
      flattenGeoJsonCoordinates(_0x21a24e == null ? void 0 : _0x21a24e["coordinates"], _0x2801a8);
    }
    else flattenGeoJsonCoordinates(_0x15b672["coordinates"], _0x2801a8);
  }
  return boundingBoxFromPoints(_0x2801a8);
}
function collectGmlCoordinates(_0x148e7e, _0x1a1654) {
  var _a2, _b;
  for (const _0x173cc1 of Array["from"](_0x148e7e["getElementsByTagNameNS"]("*", "coordinates"))) {
    const _0x528555 = (_a2 = _0x173cc1["textContent"]) == null ? void 0 : _a2["trim"]();
    if (!_0x528555) continue;
    for (const _0x38a1f5 of _0x528555["split"](/\s+/)) {
      const [_0x18f69a, _0x1d287e] = _0x38a1f5["split"](","), _0x3b9359 = Number(_0x18f69a), _0x4dc8fa = Number(_0x1d287e);
      if (Number["isFinite"](_0x3b9359) && Number["isFinite"](_0x4dc8fa)) _0x1a1654["push"]([_0x3b9359, _0x4dc8fa]);
    }
  }
  for (const _0x2b19da of ["pos", "posList"]) {
    for (const _0x15c840 of Array["from"](_0x148e7e["getElementsByTagNameNS"]("*", _0x2b19da))) {
      const _0x49e8ca = (((_b = _0x15c840["textContent"]) == null ? void 0 : _b["trim"]()) ?? "")["split"](/\s+/)["map"](Number);
      for (let _0x1b2a7d = 0; _0x1b2a7d + 1 < _0x49e8ca["length"]; _0x1b2a7d += 2) {
        const _0x13cb1d = _0x49e8ca[_0x1b2a7d], _0x3619c6 = _0x49e8ca[_0x1b2a7d + 1];
        if (Number["isFinite"](_0x13cb1d) && Number["isFinite"](_0x3619c6)) _0x1a1654["push"]([_0x13cb1d, _0x3619c6]);
      }
    }
  }
}
function extractGmlExtent(_0x5c1d3e) {
  if (!(_0x5c1d3e instanceof Element)) return void 0;
  const _0x47e915 = [];
  return collectGmlCoordinates(_0x5c1d3e, _0x47e915), boundingBoxFromPoints(_0x47e915);
}
function extractImageryGeometry(_0x36c4c3) {
  return extractGeoJsonExtent(_0x36c4c3) ?? extractGmlExtent(_0x36c4c3);
}
class InteractionManager extends EventEmitter {
  constructor(_0x4ce659) {
    super(), this["unsubscribers"] = [], this["suspended"] = ![], this["identifySuspended"] = ![], this["hoverEnabled"] = ![], this["pickGeneration"] = 0, this["viewer"] = _0x4ce659, this["handler"] = new ScreenSpaceEventHandler(_0x4ce659["scene"]["canvas"]), this["bindMouseEvents"](), this["bindCameraEvents"](), this["bindSceneEvents"]();
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
  ["enableHover"](_0x4ab096) {
    this["hoverEnabled"] = _0x4ab096, !_0x4ab096 && (this["hoveredEntity"] = void 0);
  }
  ["isHoverEnabled"]() {
    return this["hoverEnabled"];
  }
  ["flyToPosition"](_0x108454, _0x2234bc, _0x3e585e) {
    const _0x42f319 = (_0x3e585e == null ? void 0 : _0x3e585e["height"]) ?? 1e3;
    this["viewer"]["camera"]["flyTo"]({ "destination": Cartesian3["fromDegrees"](_0x108454, _0x2234bc, _0x42f319), "orientation": { "pitch": _0x494c90["toRadians"](-90) }, ...(_0x3e585e == null ? void 0 : _0x3e585e["duration"]) !== void 0 ? { "duration": _0x3e585e["duration"] } : {} });
  }
  ["flyToExtent"](_0x37284f, _0x29180d, _0xdaad79, _0x5e7cfc, _0x57b146) {
    this["viewer"]["camera"]["flyTo"]({ "destination": Rectangle["fromDegrees"](_0x37284f, _0x29180d, _0xdaad79, _0x5e7cfc), "orientation": { "pitch": _0x494c90["toRadians"](-90) }, ...(_0x57b146 == null ? void 0 : _0x57b146["duration"]) !== void 0 ? { "duration": _0x57b146["duration"] } : {} });
  }
  ["destroy"]() {
    !this["handler"]["isDestroyed"]() && this["handler"]["destroy"]();
    for (const _0x2d9508 of this["unsubscribers"]) {
      _0x2d9508();
    }
    this["unsubscribers"]["length"] = 0, this["removeAllListeners"]();
  }
  ["bindMouseEvents"]() {
    this["handler"]["setInputAction"]((_0x1e6acf) => this["dispatchPick"](_0x1e6acf["position"], "entity:click", "map:click", "imagery:click"), ScreenSpaceEventType["LEFT_CLICK"]), this["handler"]["setInputAction"]((_0x28434e) => this["dispatchPick"](_0x28434e["position"], "entity:dblclick", "map:dblclick", "imagery:dblclick"), ScreenSpaceEventType["LEFT_DOUBLE_CLICK"]), this["handler"]["setInputAction"]((_0x1909df) => this["dispatchPick"](_0x1909df["position"], "entity:rightclick", "map:rightclick", "imagery:rightclick"), ScreenSpaceEventType["RIGHT_CLICK"]), this["handler"]["setInputAction"]((_0x264893) => this["dispatchEntityOnly"](_0x264893["position"], "entity:mousedown"), ScreenSpaceEventType["LEFT_DOWN"]), this["handler"]["setInputAction"]((_0x4f958c) => this["dispatchEntityOnly"](_0x4f958c["position"], "entity:mouseup"), ScreenSpaceEventType["LEFT_UP"]), this["handler"]["setInputAction"]((_0x451970) => this["handleMouseMove"](_0x451970["endPosition"]), ScreenSpaceEventType["MOUSE_MOVE"]), this["handler"]["setInputAction"]((_0x130980) => this["emit"]("map:wheel", { "delta": _0x130980 }), ScreenSpaceEventType["WHEEL"]), this["handler"]["setInputAction"]((_0x21bea1) => this["emit"]("map:pinchstart", this["buildMapDetail"](_0x21bea1["position1"])), ScreenSpaceEventType["PINCH_START"]), this["handler"]["setInputAction"](() => this["emit"]("map:pinchend", {}), ScreenSpaceEventType["PINCH_END"]), this["handler"]["setInputAction"]((_0x3dacdc) => {
      const _0xe9c600 = Math["atan2"](_0x3dacdc["position2"]["y"] - _0x3dacdc["position1"]["y"], _0x3dacdc["position2"]["x"] - _0x3dacdc["position1"]["x"]);
      this["emit"]("map:pinchmove", { ...this["buildMapDetail"](_0x3dacdc["position1"]), "angle": _0xe9c600 });
    }, ScreenSpaceEventType["PINCH_MOVE"]);
  }
  ["handleMouseMove"](_0x8e19b2) {
    this["emit"]("map:mousemove", this["buildMapDetail"](_0x8e19b2));
    if (!this["hoverEnabled"] || this["suspended"]) return;
    const _0x1585f6 = this["pickSelectableEntity"](_0x8e19b2);
    if (_0x1585f6 === this["hoveredEntity"]) return;
    this["hoveredEntity"] !== void 0 && this["emit"]("entity:mouseleave", this["buildEntityDetail"](this["hoveredEntity"], _0x8e19b2)), this["hoveredEntity"] = _0x1585f6, _0x1585f6 !== void 0 && this["emit"]("entity:mouseenter", this["buildEntityDetail"](_0x1585f6, _0x8e19b2));
  }
  ["dispatchPick"](_0x3c0231, _0x21cbfe, _0x4b5f49, _0x4bf2d6) {
    if (this["suspended"]) return;
    this["pickGeneration"]++;
    const _0x30dbca = this["pickSelectableEntity"](_0x3c0231);
    _0x30dbca ? this["emit"](_0x21cbfe, this["buildEntityDetail"](_0x30dbca, _0x3c0231)) : this["emit"](_0x4b5f49, this["buildMapDetail"](_0x3c0231)), this["pickImageryFeatures"](_0x3c0231, _0x4bf2d6);
  }
  ["pickSelectableEntity"](_0x5cee83) {
    const _0x5464f8 = this["scene"]["drillPick"](_0x5cee83, DRILL_PICK_LIMIT);
    for (const _0xf5f611 of _0x5464f8) {
      const _0x3921a4 = _0xf5f611 == null ? void 0 : _0xf5f611["id"];
      if (!(_0x3921a4 instanceof Entity)) continue;
      if (isSelectionHighlightEntity(_0x3921a4)) continue;
      return _0x3921a4;
    }
    return void 0;
  }
  ["pickImageryFeatures"](_0xeaea22, _0x1a682f) {
    const _0x560650 = this["pickGeneration"], _0x4675b2 = this["camera"]["getPickRay"](_0xeaea22);
    if (!_0x4675b2) return;
    const _0x2335ea = this["viewer"]["imageryLayers"]["pickImageryLayerFeatures"](_0x4675b2, this["scene"]);
    if (!_0x2335ea) return;
    this["emit"]("imagery:querying", this["buildMapDetail"](_0xeaea22));
    const _0x3c7514 = (_0x172b9b) => {
      if (this["suspended"] || _0x560650 !== this["pickGeneration"]) return;
      this["emit"](_0x1a682f, this["buildImageryDetail"](_0x172b9b, _0xeaea22));
    };
    _0x2335ea["then"](_0x3c7514)["catch"](() => {
      _0x3c7514([]);
    });
  }
  ["buildImageryDetail"](_0x106388, _0x555ed3) {
    const _0x4d2957 = _0x106388["map"]((_0x1ac52b) => ({ "imageryLayer": _0x1ac52b["imageryLayer"], "name": _0x1ac52b["name"] ?? null, "properties": _0x1ac52b["properties"] ?? {}, "description": _0x1ac52b["description"] ?? null, "geometryHint": extractImageryGeometry(_0x1ac52b["data"]) }));
    return { "position": this["toLonLat"](_0x555ed3), "screenPos": { "x": _0x555ed3["x"], "y": _0x555ed3["y"] }, "features": _0x4d2957 };
  }
  ["dispatchEntityOnly"](_0x1a756e, _0x1492b3) {
    if (this["suspended"]) return;
    const _0x4f7789 = this["scene"]["pick"](_0x1a756e);
    (_0x4f7789 == null ? void 0 : _0x4f7789["id"]) instanceof Entity && this["emit"](_0x1492b3, this["buildEntityDetail"](_0x4f7789["id"], _0x1a756e));
  }
  ["bindCameraEvents"]() {
    this["unsubscribers"]["push"](this["camera"]["moveStart"]["addEventListener"](() => this["emit"]("camera:moveStart", {})), this["camera"]["moveEnd"]["addEventListener"](() => this["emit"]("camera:moveEnd", {})), this["camera"]["changed"]["addEventListener"]((_0xdfb14d) => this["emit"]("camera:changed", { "percentage": _0xdfb14d })));
  }
  ["bindSceneEvents"]() {
    this["unsubscribers"]["push"](this["scene"]["preRender"]["addEventListener"]((_0x29ff37, _0x5de736) => this["emit"]("scene:preRender", { "time": _0x5de736 })), this["scene"]["postRender"]["addEventListener"]((_0x1ff1cf, _0x3fe258) => this["emit"]("scene:postRender", { "time": _0x3fe258 })), this["scene"]["morphStart"]["addEventListener"](() => this["emit"]("scene:morphStart", {})), this["scene"]["morphComplete"]["addEventListener"](() => this["emit"]("scene:morphComplete", {})));
  }
  ["buildMapDetail"](_0x39bee7) {
    return { "position": this["toLonLat"](_0x39bee7), "screenPos": { "x": _0x39bee7["x"], "y": _0x39bee7["y"] } };
  }
  ["buildEntityDetail"](_0x2cae49, _0x56128d) {
    return { ...this["resolveFeature"](_0x2cae49), "position": this["toLonLat"](_0x56128d), "screenPos": { "x": _0x56128d["x"], "y": _0x56128d["y"] }, "features": this["pickAllFeatures"](_0x56128d, _0x2cae49) };
  }
  ["resolveFeature"](_0x25607e) {
    var _a2, _b;
    const _0x10a9fa = JulianDate["now"](), _0x1df150 = ((_a2 = _0x25607e["properties"]) == null ? void 0 : _a2["getValue"](_0x10a9fa)) ?? {}, _0x39f9a5 = _0x1df150["__tucbsOutlineOf"];
    if (typeof _0x39f9a5 === "string") {
      const _0x2a1a39 = (_b = _0x25607e["entityCollection"]) == null ? void 0 : _b["getById"](_0x39f9a5);
      if (_0x2a1a39 && _0x2a1a39 !== _0x25607e) return this["resolveFeature"](_0x2a1a39);
    }
    const _0x24d822 = typeof _0x1df150["layerId"] === "string" ? _0x1df150["layerId"] : null, _0x399309 = typeof _0x1df150["featureId"] === "string" ? _0x1df150["featureId"] : null;
    if ("__tucbsOutlineOf" in _0x1df150) {
      const { __tucbsOutlineOf: _0x5e9144, ..._0x2fd8e2 } = _0x1df150;
      return { "entity": _0x25607e, "layerId": _0x24d822, "featureId": _0x399309, "properties": _0x2fd8e2 };
    }
    return { "entity": _0x25607e, "layerId": _0x24d822, "featureId": _0x399309, "properties": _0x1df150 };
  }
  ["pickAllFeatures"](_0x39c43e, _0x247da0) {
    const _0x3c31e1 = this["resolveFeature"](_0x247da0), _0x576311 = [_0x3c31e1], _0x5e2eb2 = /* @__PURE__ */ new Set([_0x3c31e1["entity"]]), _0x3bc472 = this["scene"]["drillPick"](_0x39c43e, DRILL_PICK_LIMIT);
    for (const _0x236400 of _0x3bc472) {
      const _0x12d584 = _0x236400 == null ? void 0 : _0x236400["id"];
      if (!(_0x12d584 instanceof Entity)) continue;
      const _0x406f32 = this["resolveFeature"](_0x12d584);
      if (_0x5e2eb2["has"](_0x406f32["entity"])) continue;
      _0x5e2eb2["add"](_0x406f32["entity"]), _0x576311["push"](_0x406f32);
    }
    return _0x576311;
  }
  ["toLonLat"](_0x1d5cbc) {
    const _0x21788b = this["camera"]["pickEllipsoid"](_0x1d5cbc, this["scene"]["globe"]["ellipsoid"]);
    if (_0x21788b === void 0) return [0, 0];
    const _0x39b1fe = Cartographic["fromCartesian"](_0x21788b);
    return [_0x494c90["toDegrees"](_0x39b1fe["longitude"]), _0x494c90["toDegrees"](_0x39b1fe["latitude"])];
  }
}
const EARTH_RADIUS_METERS = 6378137, CIRCLE_SEGMENTS = 48;
function dedupePositions(_0x1f23df) {
  return _0x1f23df["filter"]((_0x1c24a8, _0x18a692) => _0x18a692 === 0 || !Cartesian3["equalsEpsilon"](_0x1c24a8, _0x1f23df[_0x18a692 - 1], _0x494c90["EPSILON7"]));
}
class DrawingManager extends EventEmitter {
  constructor(_0x561aed, _0x5b65e2) {
    super(), this["shapes"] = /* @__PURE__ */ new Map(), this["positions"] = [], this["tempVertexEntities"] = [], this["freehandDragging"] = ![], this["onEscapeKey"] = (_0x835f6b) => {
      if (_0x835f6b["key"] !== "Escape") return;
      this["abortCurrentShape"]();
    }, this["viewer"] = _0x561aed, this["interactionManager"] = _0x5b65e2, this["handler"] = new ScreenSpaceEventHandler(_0x561aed["scene"]["canvas"]);
  }
  get ["scene"]() {
    return this["viewer"]["scene"];
  }
  ["activate"](_0x13580d, _0x31d073) {
    if (this["activeTool"]) this["deactivate"]();
    this["activeTool"] = _0x13580d, this["activeSource"] = _0x31d073, this["positions"] = [], this["previewPosition"] = void 0, this["interactionManager"]["suspend"](), this["resetTrackedEntity"](), this["suspendBuiltInDoubleClick"]();
    if (_0x13580d === "freehand") this["lockCamera"]();
    this["setCursor"]("crosshair"), this["bindToolHandlers"](_0x13580d), this["emit"]("draw:start", _0x31d073 === void 0 ? { "tool": _0x13580d } : { "tool": _0x13580d, "source": _0x31d073 });
  }
  ["deactivate"]() {
    if (!this["activeTool"]) return;
    const _0x12d089 = this["activeTool"], _0x1f7ebd = this["activeSource"];
    this["finishSession"](), this["emit"]("draw:cancel", _0x1f7ebd === void 0 ? { "tool": _0x12d089 } : { "tool": _0x12d089, "source": _0x1f7ebd });
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
  ["getShapeById"](_0x2b9618) {
    return this["shapes"]["get"](_0x2b9618);
  }
  ["removeShape"](_0x1407b0) {
    const _0x420808 = this["shapes"]["get"](_0x1407b0);
    if (!_0x420808) return;
    this["viewer"]["entities"]["remove"](_0x420808["entity"]), this["shapes"]["delete"](_0x1407b0), this["emit"]("draw:remove", { "id": _0x1407b0, "shape": _0x420808 });
  }
  ["clearAll"]() {
    for (const _0x37f40d of [...this["shapes"]["keys"]()]) this["removeShape"](_0x37f40d);
  }
  ["undo"]() {
    if (this["positions"]["length"] === 0) return;
    this["positions"]["pop"]();
    const _0x4b5513 = this["tempVertexEntities"]["pop"]();
    if (_0x4b5513) this["viewer"]["entities"]["remove"](_0x4b5513);
  }
  ["toGeoJSON"]() {
    return { "type": "FeatureCollection", "features": this["getShapes"]()["map"]((_0x4208ad) => ({ "type": "Feature", "properties": { "id": _0x4208ad["id"], "tool": _0x4208ad["tool"] }, "geometry": _0x4208ad["geometry"] })) };
  }
  ["destroy"]() {
    this["deactivate"](), this["handler"]["destroy"](), this["removeAllListeners"]();
  }
  ["bindToolHandlers"](_0x20ec13) {
    this["handler"]["setInputAction"](() => this["deactivate"](), ScreenSpaceEventType["RIGHT_CLICK"]), document["addEventListener"]("keydown", this["onEscapeKey"]);
    if (_0x20ec13 === "freehand") {
      this["handler"]["setInputAction"]((_0x4faa8d) => this["onFreehandDown"](_0x4faa8d["position"]), ScreenSpaceEventType["LEFT_DOWN"]), this["handler"]["setInputAction"](() => this["onFreehandUp"](), ScreenSpaceEventType["LEFT_UP"]), this["handler"]["setInputAction"]((_0xc8acc6) => this["onFreehandMove"](_0xc8acc6["endPosition"]), ScreenSpaceEventType["MOUSE_MOVE"]);
      return;
    }
    this["handler"]["setInputAction"]((_0x1d5e8e) => this["onVertexClick"](_0x1d5e8e["position"]), ScreenSpaceEventType["LEFT_CLICK"]), this["handler"]["setInputAction"]((_0x481614) => this["onPreviewMove"](_0x481614["endPosition"]), ScreenSpaceEventType["MOUSE_MOVE"]), (_0x20ec13 === "polyline" || _0x20ec13 === "polygon") && this["handler"]["setInputAction"](() => this["finishMultiVertexViaDoubleClick"](), ScreenSpaceEventType["LEFT_DOUBLE_CLICK"]);
  }
  ["unbindToolHandlers"]() {
    this["handler"]["removeInputAction"](ScreenSpaceEventType["LEFT_CLICK"]), this["handler"]["removeInputAction"](ScreenSpaceEventType["LEFT_DOWN"]), this["handler"]["removeInputAction"](ScreenSpaceEventType["LEFT_UP"]), this["handler"]["removeInputAction"](ScreenSpaceEventType["MOUSE_MOVE"]), this["handler"]["removeInputAction"](ScreenSpaceEventType["RIGHT_CLICK"]), this["handler"]["removeInputAction"](ScreenSpaceEventType["LEFT_DOUBLE_CLICK"]), document["removeEventListener"]("keydown", this["onEscapeKey"]);
  }
  ["abortCurrentShape"]() {
    if (this["activeTool"] === void 0 || this["positions"]["length"] === 0) return;
    const _0xea9f98 = this["activeTool"], _0x261f09 = this["activeSource"];
    this["clearTempEntity"](), this["resetSessionForContinuousDrawing"](), this["resetTrackedEntity"](), this["emit"]("draw:abort", _0x261f09 === void 0 ? { "tool": _0xea9f98 } : { "tool": _0xea9f98, "source": _0x261f09 });
  }
  ["onVertexClick"](_0x527300) {
    const _0x49ae31 = this["toCartesian"](_0x527300);
    if (_0x49ae31 === void 0 || this["activeTool"] === void 0) return;
    this["positions"]["push"](_0x49ae31), this["emitVertex"](_0x527300), this["ensureTempEntity"]();
    (this["activeTool"] === "polygon" || this["activeTool"] === "polyline") && this["addVertexMarker"](_0x49ae31);
    if (this["activeTool"] === "point") {
      this["completeShape"]();
      return;
    }
    (this["activeTool"] === "rectangle" || this["activeTool"] === "circle") && this["positions"]["length"] >= 2 && this["completeShape"]();
  }
  ["onPreviewMove"](_0xac2d70) {
    if (this["positions"]["length"] === 0 || this["activeTool"] === void 0) return;
    const _0x2bb714 = this["toCartesian"](_0xac2d70);
    if (_0x2bb714 === void 0) return;
    this["previewPosition"] = _0x2bb714, this["emit"]("draw:move", { "tool": this["activeTool"], "coordinates": this["toLonLat"](_0x2bb714), "screenPos": { "x": _0xac2d70["x"], "y": _0xac2d70["y"] } });
  }
  ["finishMultiVertex"]() {
    const _0x4d28f6 = this["activeTool"] === "polygon" ? 3 : 2;
    if (this["positions"]["length"] < _0x4d28f6) return;
    this["completeShape"]();
  }
  ["finishMultiVertexViaDoubleClick"]() {
    this["positions"]["length"] >= 2 && this["positions"]["pop"](), this["finishMultiVertex"](), this["resetTrackedEntity"]();
  }
  ["onFreehandDown"](_0xec7fd6) {
    this["freehandDragging"] = !![], this["positions"] = [];
    const _0x58d946 = this["toCartesian"](_0xec7fd6);
    if (_0x58d946 === void 0) return;
    this["positions"]["push"](_0x58d946), this["emitVertex"](_0xec7fd6), this["ensureTempEntity"]();
  }
  ["onFreehandMove"](_0x1f9145) {
    if (!this["freehandDragging"] || this["activeTool"] === void 0) return;
    const _0x13ebb8 = this["toCartesian"](_0x1f9145);
    if (_0x13ebb8 === void 0) return;
    this["positions"]["push"](_0x13ebb8), this["previewPosition"] = _0x13ebb8, this["emit"]("draw:move", { "tool": this["activeTool"], "coordinates": this["toLonLat"](_0x13ebb8), "screenPos": { "x": _0x1f9145["x"], "y": _0x1f9145["y"] } });
  }
  ["onFreehandUp"]() {
    this["freehandDragging"] = ![];
    if (this["positions"]["length"] >= 2) this["completeShape"]();
  }
  ["emitVertex"](_0x3f10a8) {
    if (this["activeTool"] === void 0) return;
    const _0x2e5b9e = this["requireIndex"](this["positions"], this["positions"]["length"] - 1);
    this["emit"]("draw:vertex", { "tool": this["activeTool"], "index": this["positions"]["length"] - 1, "coordinates": this["toLonLat"](_0x2e5b9e), "screenPos": { "x": _0x3f10a8["x"], "y": _0x3f10a8["y"] } });
  }
  ["completeShape"]() {
    if (this["activeTool"] === void 0 || this["positions"]["length"] === 0) return;
    const _0x4198e8 = this["buildShape"](this["activeTool"], this["positions"]), _0x24a4cc = this["activeSource"] === void 0 ? _0x4198e8 : { ..._0x4198e8, "source": this["activeSource"] };
    this["shapes"]["set"](_0x24a4cc["id"], _0x24a4cc), this["clearTempEntity"](), this["resetSessionForContinuousDrawing"](), this["emit"]("draw:complete", { "shape": _0x24a4cc });
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
        const _0x3131b1 = [...this["positions"], ...this["previewPosition"] ? [this["previewPosition"]] : []], _0x21731e = dedupePositions(_0x3131b1);
        return _0x21731e["length"] >= 3 ? new PolygonHierarchy(_0x21731e) : void 0;
      }, ![]), "material": Color["CYAN"]["withAlpha"](0.35) } });
      else {
        if (this["activeTool"] === "rectangle") this["tempFillEntity"] = this["viewer"]["entities"]["add"]({ "polygon": { "hierarchy": new CallbackProperty(() => {
          const _0x20bf96 = this["positions"][0], _0x3cc1c0 = this["previewPosition"];
          if (_0x20bf96 === void 0 || _0x3cc1c0 === void 0) return void 0;
          const _0x176bff = this["computeRectangleCoordinates"](_0x20bf96, _0x3cc1c0);
          return new PolygonHierarchy(_0x176bff["map"]((_0x16e889) => this["toCartesianFromLonLat"](_0x16e889)));
        }, ![]), "material": Color["CYAN"]["withAlpha"](0.35) } });
        else this["activeTool"] === "circle" && (this["tempFillEntity"] = this["viewer"]["entities"]["add"]({ "polygon": { "hierarchy": new CallbackProperty(() => {
          const _0x1b3992 = this["positions"][0], _0x4da865 = this["previewPosition"];
          if (_0x1b3992 === void 0 || _0x4da865 === void 0) return void 0;
          const _0x41fe65 = this["computeCircleRing"](_0x1b3992, _0x4da865);
          return new PolygonHierarchy(_0x41fe65["map"]((_0x27c69d) => this["toCartesianFromLonLat"](_0x27c69d)));
        }, ![]), "material": Color["CYAN"]["withAlpha"](0.35) } }));
      }
    }
  }
  ["addVertexMarker"](_0x4b0734) {
    this["tempVertexEntities"]["push"](this["viewer"]["entities"]["add"]({ "position": _0x4b0734, "point": { "pixelSize": 6, "color": Color["YELLOW"], "outlineColor": Color["BLACK"], "outlineWidth": 1 } }));
  }
  ["buildPositionsCallback"](_0x359bf8) {
    return new CallbackProperty(() => {
      const _0x46ec9d = [...this["positions"], ...this["previewPosition"] ? [this["previewPosition"]] : []], _0x551053 = dedupePositions(_0x46ec9d);
      return _0x551053["length"] >= _0x359bf8 ? _0x551053 : void 0;
    }, ![]);
  }
  ["clearTempEntity"]() {
    this["tempEntity"] !== void 0 && (this["viewer"]["entities"]["remove"](this["tempEntity"]), this["tempEntity"] = void 0);
    this["tempFillEntity"] !== void 0 && (this["viewer"]["entities"]["remove"](this["tempFillEntity"]), this["tempFillEntity"] = void 0);
    for (const _0x18517f of this["tempVertexEntities"]) {
      this["viewer"]["entities"]["remove"](_0x18517f);
    }
    this["tempVertexEntities"] = [];
  }
  ["resetTrackedEntity"]() {
    this["viewer"]["trackedEntity"] !== void 0 && (this["viewer"]["trackedEntity"] = void 0);
  }
  ["suspendBuiltInDoubleClick"]() {
    if (this["builtInDoubleClickAction"] !== void 0) return;
    const _0x4f40eb = this["viewer"]["screenSpaceEventHandler"], _0x5de62 = _0x4f40eb["getInputAction"](ScreenSpaceEventType["LEFT_DOUBLE_CLICK"]);
    if (_0x5de62 === void 0) return;
    this["builtInDoubleClickAction"] = _0x5de62, _0x4f40eb["removeInputAction"](ScreenSpaceEventType["LEFT_DOUBLE_CLICK"]);
  }
  ["restoreBuiltInDoubleClick"]() {
    if (this["builtInDoubleClickAction"] === void 0) return;
    this["viewer"]["screenSpaceEventHandler"]["setInputAction"](this["builtInDoubleClickAction"], ScreenSpaceEventType["LEFT_DOUBLE_CLICK"]), this["builtInDoubleClickAction"] = void 0;
  }
  ["setCursor"](_0x5ed55a) {
    this["viewer"]["scene"]["canvas"]["style"]["cursor"] = _0x5ed55a;
  }
  ["lockCamera"]() {
    this["viewer"]["scene"]["screenSpaceCameraController"]["enableRotate"] = ![], this["viewer"]["scene"]["screenSpaceCameraController"]["enableTilt"] = ![];
  }
  ["unlockCamera"]() {
    this["viewer"]["scene"]["screenSpaceCameraController"]["enableRotate"] = !![], this["viewer"]["scene"]["screenSpaceCameraController"]["enableTilt"] = !![];
  }
  ["buildShape"](_0x1abbe8, _0x3c3cb0) {
    const _0x17d6a1 = crypto["randomUUID"](), _0x421e06 = Date["now"]();
    if (_0x1abbe8 === "point") {
      const _0x3b4656 = this["requireIndex"](_0x3c3cb0, 0), _0x49b091 = this["toLonLat"](_0x3b4656);
      return { "id": _0x17d6a1, "tool": _0x1abbe8, "entity": this["viewer"]["entities"]["add"]({ "position": _0x3b4656, "point": { "pixelSize": 8, "color": Color["CYAN"] } }), "positions": _0x3c3cb0, "coordinates": [_0x49b091], "geometry": { "type": "Point", "coordinates": _0x49b091 }, "createdAt": _0x421e06 };
    }
    if (_0x1abbe8 === "circle") return this["buildCircleShape"](_0x17d6a1, _0x3c3cb0, _0x421e06);
    if (_0x1abbe8 === "rectangle") return this["buildRectangleShape"](_0x17d6a1, _0x3c3cb0, _0x421e06);
    if (_0x1abbe8 === "polygon") return this["buildPolygonShape"](_0x17d6a1, _0x3c3cb0, _0x421e06);
    return this["buildLineShape"](_0x17d6a1, _0x1abbe8, _0x3c3cb0, _0x421e06);
  }
  ["buildLineShape"](_0x2ec8d9, _0x129fad, _0xfbc778, _0xd31255) {
    const _0x55a6f9 = _0xfbc778["map"]((_0x53bb6a) => this["toLonLat"](_0x53bb6a));
    return { "id": _0x2ec8d9, "tool": _0x129fad, "entity": this["viewer"]["entities"]["add"]({ "polyline": { "positions": _0xfbc778, "width": 3, "material": Color["CYAN"] } }), "positions": _0xfbc778, "coordinates": _0x55a6f9, "geometry": { "type": "LineString", "coordinates": _0x55a6f9 }, "length": this["computeLength"](_0xfbc778), "createdAt": _0xd31255 };
  }
  ["buildPolygonShape"](_0x2a682, _0x4d7cd2, _0x271136) {
    const _0x210c64 = _0x4d7cd2["map"]((_0x43b54f) => this["toLonLat"](_0x43b54f)), _0x34712c = this["requireIndex"](_0x210c64, 0), _0x3a660c = this["requireIndex"](_0x4d7cd2, 0), _0x3c96ae = [..._0x210c64, _0x34712c];
    return { "id": _0x2a682, "tool": "polygon", "entity": this["viewer"]["entities"]["add"]({ "polygon": { "hierarchy": _0x4d7cd2, "material": Color["CYAN"]["withAlpha"](0.4) } }), "positions": _0x4d7cd2, "coordinates": _0x210c64, "geometry": { "type": "Polygon", "coordinates": [_0x3c96ae] }, "area": this["computeArea"](_0x210c64), "perimeter": this["computeLength"]([..._0x4d7cd2, _0x3a660c]), "createdAt": _0x271136 };
  }
  ["buildRectangleShape"](_0x5bcb20, _0x5b7fa1, _0x500f19) {
    const _0x857fdf = this["requireIndex"](_0x5b7fa1, 0), _0x281c57 = this["requireIndex"](_0x5b7fa1, 1), _0x188494 = this["computeRectangleCoordinates"](_0x857fdf, _0x281c57), _0xcdb7ac = _0x188494["map"]((_0xb17c8f) => this["toCartesianFromLonLat"](_0xb17c8f)), _0x4c128b = this["requireIndex"](_0xcdb7ac, 0);
    return { "id": _0x5bcb20, "tool": "rectangle", "entity": this["viewer"]["entities"]["add"]({ "polygon": { "hierarchy": _0xcdb7ac, "material": Color["CYAN"]["withAlpha"](0.4) } }), "positions": _0xcdb7ac, "coordinates": _0x188494, "geometry": { "type": "Polygon", "coordinates": [[..._0x188494, this["requireIndex"](_0x188494, 0)]] }, "area": this["computeArea"](_0x188494), "perimeter": this["computeLength"]([..._0xcdb7ac, _0x4c128b]), "createdAt": _0x500f19 };
  }
  ["buildCircleShape"](_0x6a2851, _0x255828, _0x1eb715) {
    const _0x26fc3c = this["requireIndex"](_0x255828, 0), _0x31832c = this["requireIndex"](_0x255828, 1), _0x1d6c14 = Cartesian3["distance"](_0x26fc3c, _0x31832c), _0x37cfe1 = this["computeCircleRing"](_0x26fc3c, _0x31832c), _0x346aa3 = _0x37cfe1["map"]((_0x1bbe84) => this["toCartesianFromLonLat"](_0x1bbe84)), _0x5ce991 = this["requireIndex"](_0x37cfe1, 0);
    return { "id": _0x6a2851, "tool": "circle", "entity": this["viewer"]["entities"]["add"]({ "polygon": { "hierarchy": _0x346aa3, "material": Color["CYAN"]["withAlpha"](0.4) } }), "positions": [_0x26fc3c, _0x31832c], "coordinates": [this["toLonLat"](_0x26fc3c)], "geometry": { "type": "Polygon", "coordinates": [[..._0x37cfe1, _0x5ce991]] }, "area": Math["PI"] * _0x1d6c14 * _0x1d6c14, "perimeter": 2 * Math["PI"] * _0x1d6c14, "radius": _0x1d6c14, "createdAt": _0x1eb715 };
  }
  ["sampleCircleRing"](_0x39882b, _0x1b3b74) {
    const _0x140131 = [];
    for (let _0x436fb1 = 0; _0x436fb1 < CIRCLE_SEGMENTS; _0x436fb1++) {
      const _0x4f8349 = 2 * Math["PI"] * _0x436fb1 / CIRCLE_SEGMENTS, _0x537092 = _0x1b3b74 * Math["cos"](_0x4f8349), _0x33d04d = _0x1b3b74 * Math["sin"](_0x4f8349);
      _0x140131["push"](this["offsetMetersToLonLat"](_0x39882b, _0x537092, _0x33d04d));
    }
    return _0x140131;
  }
  ["computeRectangleCoordinates"](_0x5e9ccb, _0x31209a) {
    const _0x49dee3 = this["toLonLat"](_0x5e9ccb), _0x1c23a2 = this["toLonLat"](_0x31209a), _0x227046 = Math["min"](_0x49dee3[0], _0x1c23a2[0]), _0x308dad = Math["max"](_0x49dee3[0], _0x1c23a2[0]), _0x47353b = Math["min"](_0x49dee3[1], _0x1c23a2[1]), _0x45d28c = Math["max"](_0x49dee3[1], _0x1c23a2[1]);
    return [[_0x227046, _0x47353b], [_0x308dad, _0x47353b], [_0x308dad, _0x45d28c], [_0x227046, _0x45d28c]];
  }
  ["computeCircleRing"](_0xf6977f, _0x1c1977) {
    const _0x153c98 = Cartesian3["distance"](_0xf6977f, _0x1c1977), _0x5ad07a = this["toLonLat"](_0xf6977f);
    return this["sampleCircleRing"](_0x5ad07a, _0x153c98);
  }
  ["computeArea"](_0xcfbeee) {
    const _0x5c32b5 = this["requireIndex"](_0xcfbeee, 0)[1], _0x2b6dc8 = _0xcfbeee["map"]((_0x165df6) => this["projectMeters"](_0x165df6, _0x5c32b5));
    let _0x150d8b = 0;
    for (let _0x3c66d9 = 0; _0x3c66d9 < _0x2b6dc8["length"]; _0x3c66d9++) {
      const [_0x17924f, _0x2eff1f] = this["requireIndex"](_0x2b6dc8, _0x3c66d9), [_0xa05bc1, _0x50608f] = this["requireIndex"](_0x2b6dc8, (_0x3c66d9 + 1) % _0x2b6dc8["length"]);
      _0x150d8b += _0x17924f * _0x50608f - _0xa05bc1 * _0x2eff1f;
    }
    return Math["abs"](_0x150d8b) / 2;
  }
  ["computeLength"](_0x4c4c5a) {
    let _0x3bc2ee = 0;
    for (let _0x76195 = 0; _0x76195 < _0x4c4c5a["length"] - 1; _0x76195++) {
      _0x3bc2ee += Cartesian3["distance"](this["requireIndex"](_0x4c4c5a, _0x76195), this["requireIndex"](_0x4c4c5a, _0x76195 + 1));
    }
    return _0x3bc2ee;
  }
  ["projectMeters"](_0x1266f3, _0x57acb1) {
    const _0xbfe3c = _0x494c90["toRadians"](_0x1266f3[0]) * Math["cos"](_0x494c90["toRadians"](_0x57acb1)) * EARTH_RADIUS_METERS, _0x3ccc02 = _0x494c90["toRadians"](_0x1266f3[1]) * EARTH_RADIUS_METERS;
    return [_0xbfe3c, _0x3ccc02];
  }
  ["offsetMetersToLonLat"](_0x2b7360, _0x540d50, _0x3a9875) {
    const _0x5bc0f = _0x2b7360[1] + _0x494c90["toDegrees"](_0x3a9875 / EARTH_RADIUS_METERS), _0x477249 = _0x2b7360[0] + _0x494c90["toDegrees"](_0x540d50 / (EARTH_RADIUS_METERS * Math["cos"](_0x494c90["toRadians"](_0x2b7360[1]))));
    return [_0x477249, _0x5bc0f];
  }
  ["toCartesianFromLonLat"](_0x54f8a3) {
    return Cartesian3["fromDegrees"](_0x54f8a3[0], _0x54f8a3[1]);
  }
  ["toCartesian"](_0x160a1f) {
    return this["viewer"]["camera"]["pickEllipsoid"](_0x160a1f, this["scene"]["globe"]["ellipsoid"]);
  }
  ["toLonLat"](_0x26c92a) {
    const _0x571576 = Cartographic["fromCartesian"](_0x26c92a);
    return [_0x494c90["toDegrees"](_0x571576["longitude"]), _0x494c90["toDegrees"](_0x571576["latitude"])];
  }
  ["requireIndex"](_0x536ee6, _0x13bc67) {
    const _0x298b9a = _0x536ee6[_0x13bc67];
    if (_0x298b9a === void 0) throw new TucbsError("INTERNAL_INDEX_OUT_OF_RANGE", "DrawingManager: beklenen index (" + _0x13bc67 + ") dizide bulunamadi");
    return _0x298b9a;
  }
}
function trimSlash$1(_0x1096c9) {
  return _0x1096c9["replace"](/\/+$/, "");
}
function newClientId() {
  if (typeof crypto !== "undefined" && typeof crypto["randomUUID"] === "function") return crypto["randomUUID"]();
  return "00000000-0000-0000-0000-000000000001";
}
class AnalysisManager {
  constructor(_0x1cacf2) {
    __privateAdd(this, _AnalysisManager_instances);
    __privateAdd(this, _apiKey2);
    __privateSet(this, _apiKey2, _0x1cacf2["apiKey"] ?? ""), this["clientId"] = _0x1cacf2["clientId"] ?? newClientId();
  }
  ["configure"](_0x3a2b90) {
    if (_0x3a2b90["apiKey"] !== void 0) __privateSet(this, _apiKey2, _0x3a2b90["apiKey"]);
    if (_0x3a2b90["clientId"] !== void 0) this["clientId"] = _0x3a2b90["clientId"];
  }
  get ["configured"]() {
    return Boolean(getUcbpApiBase() && __privateGet(this, _apiKey2));
  }
  async ["buffer"](_0x14ac24) {
    return __privateMethod(this, _AnalysisManager_instances, post_fn).call(this, "/vector/buffer", _0x14ac24);
  }
  async ["intersection"](_0x4885f5) {
    return __privateMethod(this, _AnalysisManager_instances, post_fn).call(this, "/vector/intersection", _0x4885f5);
  }
  async ["boundary"](_0x4be348) {
    return __privateMethod(this, _AnalysisManager_instances, post_fn).call(this, "/vector/boundary", _0x4be348);
  }
  async ["clip"](_0x2359d7) {
    return __privateMethod(this, _AnalysisManager_instances, post_fn).call(this, "/vector/clip", _0x2359d7);
  }
  async ["difference"](_0x2afe32) {
    return __privateMethod(this, _AnalysisManager_instances, post_fn).call(this, "/vector/difference", _0x2afe32);
  }
  async ["subtract"](_0x5040fc) {
    return __privateMethod(this, _AnalysisManager_instances, post_fn).call(this, "/vector/subtract", _0x5040fc);
  }
  async ["union"](_0x98b12) {
    return __privateMethod(this, _AnalysisManager_instances, post_fn).call(this, "/vector/union", _0x98b12);
  }
  async ["wedgeBuffer"](_0x2114a0) {
    return __privateMethod(this, _AnalysisManager_instances, post_fn).call(this, "/vector/wedge-buffer", _0x2114a0);
  }
}
_apiKey2 = new WeakMap();
_AnalysisManager_instances = new WeakSet();
post_fn = async function(_0x2b5936, _0x55a8c3) {
  if (!__privateGet(this, _apiKey2)) throw new AnalysisRequestError("ANALYSIS_API_KEY_MISSING", "apiKey tanımlı değil (tucbs-map apiKey).");
  const _0x4ca5b9 = { "clientId": this["clientId"], "object": _0x55a8c3 }, _0x179760 = "" + trimSlash$1(getUcbpApiBase()) + _0x2b5936;
  let _0x1765a1;
  try {
    _0x1765a1 = await fetch(_0x179760, { "method": "POST", "headers": { "Content-Type": "application/json", "X-API-Key": __privateGet(this, _apiKey2) }, "body": JSON["stringify"](_0x4ca5b9) });
  } catch (_0x3d14cc) {
    const _0x573d95 = _0x3d14cc instanceof Error ? _0x3d14cc["message"] : String(_0x3d14cc);
    throw new AnalysisRequestError("ANALYSIS_NETWORK_ERROR", "Ağ hatası: " + _0x573d95);
  }
  const _0xe57782 = await _0x1765a1["json"]()["catch"](() => null);
  if (!_0x1765a1["ok"]) {
    const _0x34ea9d = (_0xe57782 == null ? void 0 : _0xe57782["mesaj"]) || (_0xe57782 == null ? void 0 : _0xe57782["message"]) || "İstek başarısız (HTTP " + _0x1765a1["status"] + ")";
    throw new AnalysisRequestError("ANALYSIS_REQUEST_FAILED", _0x34ea9d);
  }
  if ((_0xe57782 == null ? void 0 : _0xe57782["isSuccess"]) === ![] || (_0xe57782 == null ? void 0 : _0xe57782["success"]) === ![]) throw new AnalysisRequestError("ANALYSIS_UNSUCCESSFUL", _0xe57782["mesaj"] || _0xe57782["message"] || "Analiz başarısız.");
  const _0x24f69c = _0xe57782 == null ? void 0 : _0xe57782["object"];
  if (!(_0x24f69c == null ? void 0 : _0x24f69c["geojson"])) throw new AnalysisRequestError("ANALYSIS_RESPONSE_MISSING_GEOJSON", "Yanıtta geojson yok.");
  return _0x24f69c;
};
const FALLBACK_IMAGE_FILENAME = "blue-marble-fallback.jpg", FALLBACK_WORLD_IMAGE = new URL(FALLBACK_IMAGE_FILENAME, import.meta.url)["href"], FALLBACK_DELAY_MS = 3e3, BASEMAP_ERROR_RETRY_LIMIT = 2, BASEMAP_UNAVAILABLE_DELAY_MS = 1e4;
function watchBasemap(_0xbea03c, _0x56ff59, _0x3d869c, _0x4341fa, _0x33e134, _0xe445ef) {
  let _0x48b109 = ![], _0x52bbe1 = ![];
  const _0x590b25 = window["setTimeout"](() => {
    if (_0x48b109 || !_0x56ff59["isCurrentGeneration"](_0x3d869c)) return;
    _0x56ff59["ensureFallbackBasemap"]();
  }, FALLBACK_DELAY_MS), _0x23460b = window["setTimeout"](() => {
    if (_0x48b109 || !_0x56ff59["isCurrentGeneration"](_0x3d869c)) return;
    _0x48b109 = !![], _0x37bd57(), _0x56ff59["setStatus"]("unavailable"), _0x56ff59["removeBasemapLayer"](), _0x56ff59["ensureFallbackBasemap"](), _0x56ff59["emit"]("basemap:error", { "id": _0x4341fa });
  }, BASEMAP_UNAVAILABLE_DELAY_MS), _0x37bd57 = () => {
    _0x52bbe1 = !![], window["clearTimeout"](_0x590b25), window["clearTimeout"](_0x23460b), _0xe445ef["errorEvent"]["removeEventListener"](_0x4b7291);
  }, _0x4b7291 = (_0x5c55bd) => {
    if (_0x48b109) return;
    if (!_0x56ff59["isCurrentGeneration"](_0x3d869c)) return;
    if (!_0xbea03c["imageryLayers"]["contains"](_0x33e134)) return;
    if (_0x5c55bd["timesRetried"] < BASEMAP_ERROR_RETRY_LIMIT) {
      _0x5c55bd["retry"] = !![];
      return;
    }
    _0x48b109 = !![], _0x37bd57(), _0x56ff59["setStatus"]("unavailable"), _0x56ff59["removeBasemapLayer"](), _0x56ff59["ensureFallbackBasemap"](), _0x56ff59["emit"]("basemap:error", { "id": _0x4341fa });
  }, _0x59f804 = _0xe445ef["requestImage"]["bind"](_0xe445ef);
  _0xe445ef["requestImage"] = (_0x20c799, _0x1c0622, _0x30b444, _0x34510a) => {
    const _0x13a32a = _0x59f804(_0x20c799, _0x1c0622, _0x30b444, _0x34510a);
    if (_0x13a32a && !_0x48b109 && !_0x52bbe1) _0x13a32a["then"](_0x420fdf, () => void 0);
    return _0x13a32a;
  };
  const _0x420fdf = () => {
    if (_0x48b109 || _0x52bbe1) return;
    if (!_0x56ff59["isCurrentGeneration"](_0x3d869c)) {
      _0x37bd57();
      return;
    }
    _0x48b109 = !![], _0x37bd57(), _0x56ff59["setStatus"]("ready"), _0x56ff59["clearFallbackBasemap"](), _0x56ff59["emit"]("basemap:recovered", { "id": _0x4341fa });
  };
  return _0xe445ef["errorEvent"]["addEventListener"](_0x4b7291), _0x37bd57;
}
const BASEMAP_LAYER_ID = "__tucbs_basemap__";
function trackProviderRequests(_0x96a944) {
  const _0x2c36d3 = /* @__PURE__ */ new Set(), _0x149db0 = _0x96a944["requestImage"]["bind"](_0x96a944);
  return _0x96a944["requestImage"] = (_0x56f118, _0x28a390, _0x527fd1, _0x3eed01) => {
    if (_0x3eed01) _0x2c36d3["add"](_0x3eed01);
    const _0x48c711 = _0x149db0(_0x56f118, _0x28a390, _0x527fd1, _0x3eed01);
    if (_0x3eed01 && _0x48c711) {
      const _0x522f85 = () => {
        _0x2c36d3["delete"](_0x3eed01);
      };
      _0x48c711["then"](_0x522f85, _0x522f85);
    }
    return _0x48c711;
  }, () => {
    for (const _0x4e6dce of _0x2c36d3) _0x4e6dce["cancel"]();
    _0x2c36d3["clear"]();
  };
}
class BasemapController {
  constructor(_0xc1ce5e, _0x1dcd24) {
    this["_basemapGeneration"] = 0, this["_basemapStatus"] = "ready", this["_fallbackBasemapLayer"] = null, this["viewer"] = _0xc1ce5e, this["deps"] = _0x1dcd24;
  }
  get ["status"]() {
    return this["_basemapStatus"];
  }
  get ["currentBasemapId"]() {
    return this["_currentBasemapId"];
  }
  ["set"](_0x29a04a) {
    var _a2, _b;
    (_a2 = this["_stopBasemapWatch"]) == null ? void 0 : _a2.call(this), (_b = this["_cancelBasemapRequests"]) == null ? void 0 : _b.call(this), this["_cancelBasemapRequests"] = void 0, this["deps"]["removeBasemapLayers"](), this["clearFallbackBasemap"]();
    const _0x564c97 = ++this["_basemapGeneration"];
    if (_0x29a04a === null || _0x29a04a === void 0) {
      this["_basemapStatus"] = "ready", this["_currentBasemapId"] = void 0;
      return;
    }
    const _0x1ecf5e = typeof _0x29a04a === "string" ? { "id": _0x29a04a } : _0x29a04a;
    if (!_0x1ecf5e["id"]) {
      this["_basemapStatus"] = "ready", this["_currentBasemapId"] = void 0;
      return;
    }
    this["_basemapStatus"] = "loading", this["_currentBasemapId"] = _0x1ecf5e["id"];
    const _0xf2a41b = this["resolveBasemapUrl"](_0x1ecf5e), _0x1bdb99 = new UrlTemplateImageryProvider({ "url": _0xf2a41b }), _0x23fe8f = trackProviderRequests(_0x1bdb99);
    this["_cancelBasemapRequests"] = _0x23fe8f;
    const _0x5e9044 = this["viewer"]["imageryLayers"]["addImageryProvider"](_0x1bdb99, 0);
    this["deps"]["addBasemapImageryLayer"](BASEMAP_LAYER_ID, _0x1ecf5e["id"], _0x5e9044), this["_stopBasemapWatch"] = watchBasemap(this["viewer"], { "ensureFallbackBasemap": () => this["ensureFallbackBasemap"](), "clearFallbackBasemap": () => this["clearFallbackBasemap"](), "removeBasemapLayer": () => {
      _0x23fe8f(), this["deps"]["removeLayer"](BASEMAP_LAYER_ID);
    }, "emit": (_0x17e3ad, _0x2b646c) => this["deps"]["emit"](_0x17e3ad, _0x2b646c), "setStatus": (_0x4fe1e2) => {
      this["_basemapStatus"] = _0x4fe1e2;
    }, "isCurrentGeneration": (_0x4ce911) => _0x4ce911 === this["_basemapGeneration"] }, _0x564c97, _0x1ecf5e["id"], _0x5e9044, _0x1bdb99);
  }
  ["stop"]() {
    var _a2, _b;
    (_a2 = this["_stopBasemapWatch"]) == null ? void 0 : _a2.call(this), (_b = this["_cancelBasemapRequests"]) == null ? void 0 : _b.call(this), this["_cancelBasemapRequests"] = void 0;
  }
  ["addFallbackBasemap"]() {
    const _0x14404d = new SingleTileImageryProvider({ "url": FALLBACK_WORLD_IMAGE, "tileWidth": 5400, "tileHeight": 2700, "credit": "NASA Earth Observatory (Blue Marble)" }), _0x58d5b0 = this["viewer"]["imageryLayers"]["addImageryProvider"](_0x14404d, 0);
    this["_fallbackBasemapLayer"] = _0x58d5b0;
  }
  ["ensureFallbackBasemap"]() {
    if (this["_fallbackBasemapLayer"] !== null) return;
    try {
      this["addFallbackBasemap"]();
    } catch (_0x1a1010) {
      console["warn"]("[tucbs-core] Basemap yedek goruntusu eklenemedi:", _0x1a1010);
    }
  }
  ["clearFallbackBasemap"]() {
    this["_fallbackBasemapLayer"] !== null && (this["viewer"]["imageryLayers"]["remove"](this["_fallbackBasemapLayer"], !![]), this["_fallbackBasemapLayer"] = null);
  }
  ["resolveBasemapUrl"](_0x217ae7) {
    const _0x1d0686 = (_0x32c8a9) => {
      const _0xa285 = this["deps"]["getProxyBase"](), _0x14a9d5 = _0xa285 + "https://atlas.harita.gov.tr/" + _0x32c8a9 + "/{z}/{x}/{y}.png";
      return this["appendTucbsApiKeyQuery"](_0x14a9d5);
    };
    switch (_0x217ae7["id"]) {
      case "hgm-temel":
        return _0x1d0686("temel");
      case "hgm-ortofoto":
        return _0x1d0686("ortofotoservis");
      case "hgm-siyasi":
        return _0x1d0686("siyasi");
      case "hgm-yukseklik":
        return _0x1d0686("yukseklik");
      default:
        return _0x217ae7["id"];
    }
  }
  ["appendTucbsApiKeyQuery"](_0x31b634) {
    const _0x254543 = this["deps"]["getApiKey"]();
    if (!_0x254543) return _0x31b634;
    const _0x2fe3a1 = _0x31b634["includes"]("?") ? "&" : "?";
    return "" + _0x31b634 + _0x2fe3a1 + "tucbsapikey=" + encodeURIComponent(_0x254543);
  }
}
function nextFrame(_0x334cd5) {
  return new Promise((_0x12369f) => {
    const _0x5077a4 = () => {
      _0x334cd5["scene"]["postRender"]["removeEventListener"](_0x5077a4), _0x12369f();
    };
    _0x334cd5["scene"]["postRender"]["addEventListener"](_0x5077a4), _0x334cd5["scene"]["requestRender"]();
  });
}
async function captureCanvasBlob(_0x1a28b8, _0x1bc521, _0x2bef23) {
  const _0x375c93 = _0x1a28b8["canvas"];
  if (typeof _0x375c93["toBlob"] === "function") return new Promise((_0x13096e, _0x10bf4f) => {
    _0x375c93["toBlob"]((_0x285fc5) => _0x285fc5 ? _0x13096e(_0x285fc5) : _0x10bf4f(new Error("canvas.toBlob basarisiz oldu")), _0x1bc521, _0x2bef23);
  });
  const _0x59493d = _0x375c93["toDataURL"](_0x1bc521, _0x2bef23), _0x3e9284 = _0x59493d["split"](",")[1] ?? "", _0x11d8a1 = atob(_0x3e9284), _0x551c06 = new Uint8Array(_0x11d8a1["length"]);
  for (let _0xbeb7dc = 0; _0xbeb7dc < _0x11d8a1["length"]; _0xbeb7dc++) _0x551c06[_0xbeb7dc] = _0x11d8a1["charCodeAt"](_0xbeb7dc);
  return new Blob([_0x551c06], { "type": _0x1bc521 });
}
function measureGroundMetersPerPixel(_0x596353) {
  const _0x1ec571 = _0x596353["scene"], _0x49fba8 = _0x596353["camera"], _0x137990 = _0x596353["canvas"], _0x3add68 = _0x137990["clientWidth"] / 2, _0x309b10 = _0x137990["clientHeight"] / 2, _0x4fc511 = _0x49fba8["getPickRay"](new Cartesian2(_0x3add68 - 1, _0x309b10)), _0x55990f = _0x49fba8["getPickRay"](new Cartesian2(_0x3add68 + 1, _0x309b10));
  if (!_0x4fc511 || !_0x55990f) return null;
  const _0x485c97 = _0x1ec571["globe"]["pick"](_0x4fc511, _0x1ec571), _0x31bb94 = _0x1ec571["globe"]["pick"](_0x55990f, _0x1ec571);
  if (!_0x485c97 || !_0x31bb94) return null;
  return Cartesian3["distance"](_0x485c97, _0x31bb94) / 2;
}
function toOrientedDestination(_0x5896ca) {
  return { "destination": Cartesian3["fromDegrees"](_0x5896ca["longitude"], _0x5896ca["latitude"], _0x5896ca["height"]), "orientation": { "heading": _0x494c90["toRadians"](_0x5896ca["heading"] ?? 0), "pitch": _0x494c90["toRadians"](_0x5896ca["pitch"] ?? -90), "roll": _0x494c90["toRadians"](_0x5896ca["roll"] ?? 0) } };
}
function setView(_0xedd4f4, _0x51e635) {
  _0xedd4f4["camera"]["setView"](toOrientedDestination(_0x51e635));
}
function setExtent(_0x1fea10, _0x15f212) {
  _0x1fea10["camera"]["setView"]({ "destination": Rectangle["fromDegrees"](_0x15f212["west"], _0x15f212["south"], _0x15f212["east"], _0x15f212["north"]) });
}
function flyTo(_0x38d48b, _0x1aef5d) {
  _0x38d48b["camera"]["flyTo"](toOrientedDestination(_0x1aef5d));
}
function zoomTo(_0x271960, _0x75d28e, _0x4c0687, _0x58d8c7) {
  _0x271960["camera"]["setView"]({ "destination": Cartesian3["fromDegrees"](_0x75d28e, _0x4c0687, _0x58d8c7) });
}
async function zoomToLayer(_0x6264bc, _0x28a4a3) {
  return _0x6264bc["zoomTo"](_0x28a4a3["cesiumObject"], new HeadingPitchRange(0, -_0x494c90["PI_OVER_TWO"], 0));
}
function trimSlash(_0x179940) {
  return _0x179940["replace"](/\/+$/, "");
}
async function validateApiKey(_0x35d9f9, _0xdfeb0d = getUcbpApiBase()) {
  if (!_0x35d9f9) return;
  const _0x326748 = trimSlash(_0xdfeb0d) + "/auth/validate";
  let _0x5cf72f;
  try {
    _0x5cf72f = await fetch(_0x326748, { "method": "GET", "headers": { "X-API-Key": _0x35d9f9 } });
  } catch (_0x1d302f) {
    const _0x49208a = _0x1d302f instanceof Error ? _0x1d302f["message"] : String(_0x1d302f);
    throw new ApiKeyValidationError(_0x49208a);
  }
  if (!_0x5cf72f["ok"]) {
    let _0x95d113, _0x2f22e4, _0x505111, _0x42c1ed;
    try {
      const _0x47f3a9 = await _0x5cf72f["json"]();
      _0x95d113 = _0x47f3a9["title"], _0x2f22e4 = _0x47f3a9["message"] || _0x47f3a9["mesaj"], _0x505111 = _0x47f3a9["reason"], _0x42c1ed = _0x47f3a9["detail"];
    } catch {
    }
    const _0x2019a3 = {};
    if (_0x95d113 !== void 0) _0x2019a3["title"] = _0x95d113;
    if (_0x505111 !== void 0) _0x2019a3["reason"] = _0x505111;
    if (_0x42c1ed !== void 0) _0x2019a3["detail"] = _0x42c1ed;
    throw new ApiKeyValidationError(_0x2f22e4 || "HTTP " + _0x5cf72f["status"], _0x2019a3);
  }
}
async function ensureEffectiveApiKeyValid(_0x58c1ca, _0x1f67bc) {
  const _0x5f5119 = _0x58c1ca || getGlobalApiKey();
  if (!_0x5f5119) throw new ApiKeyValidationError("Haritayı görüntülemek için geçerli bir apiKey gereklidir.", { "title": "API Anahtarı Eksik", "reason": "missing-key", "code": "API_KEY_MISSING" });
  await validateApiKey(_0x5f5119, _0x1f67bc);
}
const DRAWING_LAYER_ID = "__tucbs_drawing_layer__", DRAWING_LAYER_TITLE = "Çizim Katmanı", MEASURE_LAYER_ID = "__tucbs_measure_layer__", MEASURE_LAYER_TITLE = "Ölçü Katmanı", MAX_ZOOM_DISTANCE_METERS = 25e6, MAX_ZOOM_OUT_SCALE_DENOMINATOR = 25e6, MAX_ZOOM_SCALE_DENOMINATOR = 100, MIN_ZOOM_DISTANCE_METERS = 10, DEFAULT_INITIAL_EXTENT = { "west": 22.94, "south": 34.05, "east": 47.39, "north": 42.7 };
let Map$1 = (_a = class {
  constructor(_0x458bbe, _0x288f4f = {}) {
    __privateAdd(this, _unregisterApiKeyRefresh);
    __privateAdd(this, _removeLodSeamGuard);
    __privateAdd(this, _removeMinZoomScale);
    __privateAdd(this, _removeScaleWheelZoom);
    __privateAdd(this, _apiKey3);
    const _0x2db9c2 = document["createElement"]("div");
    _0x2db9c2["style"]["display"] = "none", this["viewer"] = new Viewer(_0x458bbe, this["buildViewerOptions"](_0x288f4f, _0x2db9c2)), this["viewer"]["scene"]["globe"]["baseColor"] = Color["fromCssColorString"]("#a3c6e0"), this["viewer"]["scene"]["screenSpaceCameraController"]["maximumZoomDistance"] = MAX_ZOOM_DISTANCE_METERS, this["viewer"]["scene"]["screenSpaceCameraController"]["minimumZoomDistance"] = MIN_ZOOM_DISTANCE_METERS;
    const _0x158d58 = _0x288f4f["apiKey"] ?? getGlobalApiKey();
    __privateSet(this, _apiKey3, _0x158d58), this["layerManager"] = new LayerManager(this["viewer"]), this["selectionHighlight"] = new SelectionHighlight(this["viewer"]), this["layerManager"]["configure"]({ ..._0x158d58 !== void 0 && { "apiKey": _0x158d58 }, ..._0x288f4f["trustedApiKeyHosts"] !== void 0 && { "trustedApiKeyHosts": _0x288f4f["trustedApiKeyHosts"] }, ..._0x288f4f["apiKeyDiscoveryUrl"] !== void 0 && { "apiKeyDiscoveryUrl": _0x288f4f["apiKeyDiscoveryUrl"] } }), this["interactionManager"] = new InteractionManager(this["viewer"]), this["drawingManager"] = new DrawingManager(this["viewer"], this["interactionManager"]), this["analysisManager"] = new AnalysisManager({ "apiKey": _0x158d58 ?? "" }), this["basemapController"] = new BasemapController(this["viewer"], { "removeBasemapLayers": () => this["layerManager"]["_removeBasemapLayers"](), "addBasemapImageryLayer": (_0x3d6298, _0x4e9e7d, _0x58f92a) => this["layerManager"]["_addBasemapImageryLayer"](_0x3d6298, _0x4e9e7d, _0x58f92a), "removeLayer": (_0x5a0c11) => this["layerManager"]["removeLayer"](_0x5a0c11), "emit": (_0x16d4d0, _0xb643f) => this["layerManager"]["emit"](_0x16d4d0, _0xb643f), "getProxyBase": () => getProxyBase(), "getApiKey": () => __privateGet(this, _apiKey3) }), _0x288f4f["apiKey"] === void 0 && this["registerGlobalApiKeyRotation"](_0x158d58), this["wireShapeSource"]("draw", DRAWING_LAYER_ID, DRAWING_LAYER_TITLE, (_0x1a60e2, _0x2bf37e, _0x499fda) => this["layerManager"]["_addDrawnShape"](_0x1a60e2, _0x2bf37e, _0x499fda)), this["wireShapeSource"]("measure", MEASURE_LAYER_ID, MEASURE_LAYER_TITLE, (_0x51e857, _0xf1dc8d, _0x53078c) => this["layerManager"]["_addMeasuredShape"](_0x51e857, _0xf1dc8d, _0x53078c)), _0x288f4f["camera"] !== void 0 ? this["setView"](_0x288f4f["camera"]) : this["setExtent"](_0x288f4f["initialExtent"] ?? DEFAULT_INITIAL_EXTENT), __privateSet(this, _removeLodSeamGuard, installLodSeamGuard(this["viewer"])), __privateSet(this, _removeMinZoomScale, installMinZoomScale(this["viewer"], MAX_ZOOM_SCALE_DENOMINATOR, MAX_ZOOM_OUT_SCALE_DENOMINATOR)), __privateSet(this, _removeScaleWheelZoom, installScaleWheelZoom(this["viewer"])), this["setBasemap"](_0x288f4f["basemap"]);
  }
  async ["ensureApiKeyValid"]() {
    await validateApiKey(__privateGet(this, _apiKey3) ?? "", getUcbpApiBase());
  }
  async ["runBuffer"](_0x42b523, _0x45ddb1) {
    const _0x5b9cb2 = await this["analysisManager"]["buffer"](_0x42b523), _0x346e45 = (_0x45ddb1 == null ? void 0 : _0x45ddb1["id"]) ?? "buffer-" + Date["now"](), _0x5ec205 = (_0x45ddb1 == null ? void 0 : _0x45ddb1["title"]) ?? "Tampon sonucu (" + _0x42b523["distanceM"] + "m)";
    this["layerManager"]["markAnalysisResult"](_0x346e45);
    const _0x4f6bba = await this["layerManager"]["add"]("GEOJSON", { "id": _0x346e45, "title": _0x5ec205, "data": _0x5b9cb2["geojson"], "layerType": "GEOJSON", "clampToGround": !![] });
    return _0x4f6bba;
  }
  async ["runIntersection"](_0x8ca6e, _0x2bf7fb) {
    const _0x141539 = await this["analysisManager"]["intersection"](_0x8ca6e), _0x39e043 = (_0x2bf7fb == null ? void 0 : _0x2bf7fb["id"]) ?? "intersection-" + Date["now"](), _0x3d7687 = (_0x2bf7fb == null ? void 0 : _0x2bf7fb["title"]) ?? "Kesişim sonucu";
    this["layerManager"]["markAnalysisResult"](_0x39e043);
    const _0x46bc39 = await this["layerManager"]["add"]("GEOJSON", { "id": _0x39e043, "title": _0x3d7687, "data": _0x141539["geojson"], "layerType": "GEOJSON", "clampToGround": !![] });
    return _0x46bc39;
  }
  async ["runBoundary"](_0x3bffe2, _0x4dbafe) {
    const _0x929239 = await this["analysisManager"]["boundary"](_0x3bffe2);
    return this["addAnalysisGeoJson"]((_0x4dbafe == null ? void 0 : _0x4dbafe["id"]) ?? "boundary-" + Date["now"](), (_0x4dbafe == null ? void 0 : _0x4dbafe["title"]) ?? "Sınır sonucu", _0x929239["geojson"]);
  }
  async ["runClip"](_0x59be4f, _0x4f35a7) {
    const _0x1ec9a2 = await this["analysisManager"]["clip"](_0x59be4f);
    return this["addAnalysisGeoJson"]((_0x4f35a7 == null ? void 0 : _0x4f35a7["id"]) ?? "clip-" + Date["now"](), (_0x4f35a7 == null ? void 0 : _0x4f35a7["title"]) ?? "Kırpma sonucu", _0x1ec9a2["geojson"]);
  }
  async ["runDifference"](_0x2a7c33, _0x51edaf) {
    const _0x1abe9c = await this["analysisManager"]["difference"](_0x2a7c33);
    return this["addAnalysisGeoJson"]((_0x51edaf == null ? void 0 : _0x51edaf["id"]) ?? "difference-" + Date["now"](), (_0x51edaf == null ? void 0 : _0x51edaf["title"]) ?? "Fark sonucu", _0x1abe9c["geojson"]);
  }
  async ["runSubtract"](_0x4b2050, _0x1b1c56) {
    const _0x26a8fe = await this["analysisManager"]["subtract"](_0x4b2050);
    return this["addAnalysisGeoJson"]((_0x1b1c56 == null ? void 0 : _0x1b1c56["id"]) ?? "subtract-" + Date["now"](), (_0x1b1c56 == null ? void 0 : _0x1b1c56["title"]) ?? "Çıkarma sonucu", _0x26a8fe["geojson"]);
  }
  async ["runUnion"](_0x5e1dc5, _0x3217c7) {
    const _0x2dcfef = await this["analysisManager"]["union"](_0x5e1dc5);
    return this["addAnalysisGeoJson"]((_0x3217c7 == null ? void 0 : _0x3217c7["id"]) ?? "union-" + Date["now"](), (_0x3217c7 == null ? void 0 : _0x3217c7["title"]) ?? "Birleştir sonucu", _0x2dcfef["geojson"]);
  }
  async ["runWedgeBuffer"](_0x15c811, _0xc9205e) {
    const _0x5b3de2 = await this["analysisManager"]["wedgeBuffer"](_0x15c811);
    return this["addAnalysisGeoJson"]((_0xc9205e == null ? void 0 : _0xc9205e["id"]) ?? "wedge-" + Date["now"](), (_0xc9205e == null ? void 0 : _0xc9205e["title"]) ?? "Kama tampon sonucu", _0x5b3de2["geojson"]);
  }
  async ["addAnalysisGeoJson"](_0x252edf, _0x29fb70, _0x1f396e) {
    return this["layerManager"]["markAnalysisResult"](_0x252edf), this["layerManager"]["add"]("GEOJSON", { "id": _0x252edf, "title": _0x29fb70, "data": _0x1f396e, "layerType": "GEOJSON", "clampToGround": !![] });
  }
  ["setView"](_0x24c182) {
    setView(this["viewer"], _0x24c182);
  }
  ["setExtent"](_0x36e51b) {
    setExtent(this["viewer"], _0x36e51b);
  }
  ["flyTo"](_0x241242) {
    flyTo(this["viewer"], _0x241242);
  }
  ["zoomTo"](_0x304b19, _0x1ca6d1, _0x232ba5) {
    zoomTo(this["viewer"], _0x304b19, _0x1ca6d1, _0x232ba5);
  }
  ["zoomInStep"]() {
    scaleZoomStep(this["viewer"], 1);
  }
  ["zoomOutStep"]() {
    scaleZoomStep(this["viewer"], -1);
  }
  async ["zoomToLayer"](_0x403b81) {
    return zoomToLayer(this["viewer"], _0x403b81);
  }
  ["dropMarker"](_0x22e0f4, _0x3bd905, _0x4c1f9b, _0x1f59fc = {}) {
    this["clearMarker"](), this["_removeMarker"] = createMarkerOverlay(this["viewer"], _0x22e0f4, _0x3bd905, _0x4c1f9b, _0x1f59fc);
  }
  ["clearMarker"]() {
    var _a2;
    (_a2 = this["_removeMarker"]) == null ? void 0 : _a2.call(this), this["_removeMarker"] = void 0;
  }
  get ["basemapStatus"]() {
    return this["basemapController"]["status"];
  }
  ["setBasemap"](_0x229448) {
    this["basemapController"]["set"](_0x229448);
  }
  ["setMode"](_0x45d88f) {
    _0x45d88f === "2D" ? this["viewer"]["scene"]["morphTo2D"](0) : this["viewer"]["scene"]["morphTo3D"](0);
  }
  ["setQuality"](_0x13fc78) {
    const _0x3491ad = Math["min"](100, Math["max"](0, _0x13fc78));
    this["viewer"]["resolutionScale"] = Math["max"](0.1, _0x3491ad / 100);
  }
  ["resize"]() {
    this["viewer"]["resize"]();
  }
  async ["exportJPEG"](_0x3fe5bd = "tucbs-harita", _0x2a3a11 = 0.92) {
    const _0x21fce8 = await this["captureScreenshotBlob"](_0x2a3a11);
    triggerDownload(_0x21fce8, _0x3fe5bd + "-" + Date["now"]() + ".jpg");
  }
  async ["captureScreenshotBlob"](_0x1bda9f = 0.92) {
    return await nextFrame(this["viewer"]), captureCanvasBlob(this["viewer"], "image/jpeg", _0x1bda9f);
  }
  ["measureGroundMetersPerPixel"]() {
    return measureGroundMetersPerPixel(this["viewer"]);
  }
  ["buildViewerOptions"](_0x51d2cd, _0x3bf2dc) {
    return { "timeline": _0x51d2cd["timeline"] ?? ![], "animation": _0x51d2cd["animation"] ?? ![], "baseLayerPicker": _0x51d2cd["baseLayerPicker"] ?? ![], "baseLayer": ![], "geocoder": _0x51d2cd["geocoder"] ?? ![], "homeButton": _0x51d2cd["homeButton"] ?? ![], "sceneModePicker": _0x51d2cd["sceneModePicker"] ?? ![], "navigationHelpButton": _0x51d2cd["navigationHelpButton"] ?? ![], "infoBox": _0x51d2cd["infoBox"] ?? ![], "selectionIndicator": _0x51d2cd["selectionIndicator"] ?? ![], "shadows": _0x51d2cd["shadows"] ?? ![], "shouldAnimate": _0x51d2cd["shouldAnimate"] ?? ![], "fullscreenButton": _0x51d2cd["fullscreenButton"] ?? ![], "creditContainer": _0x3bf2dc, ..._0x51d2cd["cesiumOptions"] };
  }
  ["registerGlobalApiKeyRotation"](_0x58e218) {
    _0x58e218 !== void 0 && console["info"]("[@tucbs/core] Bu Map instance'i configureTucbs() global apiKey'ini kullaniyor (kendi apiKey attribute'u/options'u verilmedi). Farkli bir anahtar gerekiyorsa Map/component'e acikca apiKey verin."), __privateSet(this, _unregisterApiKeyRefresh, registerApiKeyRefresh(() => {
      const _0x1a7000 = getGlobalApiKey();
      __privateSet(this, _apiKey3, _0x1a7000), this["layerManager"]["configure"]({ ..._0x1a7000 !== void 0 && { "apiKey": _0x1a7000 } }), this["analysisManager"]["configure"]({ "apiKey": _0x1a7000 ?? "" }), void this["ensureApiKeyValid"]()["catch"]((_0x46331a) => {
        console["error"]("[@tucbs/core] apiKey rotasyon validate basarisiz:", _0x46331a);
      }), this["basemapController"]["currentBasemapId"] !== void 0 && this["setBasemap"](this["basemapController"]["currentBasemapId"]);
    }));
  }
  ["wireShapeSource"](_0x2af492, _0x4248f6, _0x339a9, _0x15b22d) {
    this["drawingManager"]["on"]("draw:complete", ({ shape: _0x59eace }) => {
      if (_0x59eace["source"] !== _0x2af492) return;
      void _0x15b22d(_0x4248f6, _0x339a9, _0x59eace);
    }), this["drawingManager"]["on"]("draw:remove", ({ shape: _0x3a47d5 }) => {
      if (_0x3a47d5["source"] !== _0x2af492) return;
      this["layerManager"]["_removeDrawnShape"](_0x4248f6, _0x3a47d5["entity"]);
    });
  }
  ["showSelectionHighlight"](_0x2ce13c) {
    this["selectionHighlight"]["show"](_0x2ce13c);
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
