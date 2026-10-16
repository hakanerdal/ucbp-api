var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _apiKey, _apiKey2, _AnalysisManager_instances, post_fn, _unregisterApiKeyRefresh, _removeLodSeamGuard, _removeMinZoomScale, _removeScaleWheelZoom, _apiKey3, _a;
import { Math as _0x318bcf, SceneMode, EllipsoidTerrainProvider, Cartesian2, Cartesian3, CameraEventType, Ellipsoid, JulianDate, Cartographic, ConstantProperty, PropertyBag, PolygonHierarchy, ColorMaterialProperty, Color, CallbackProperty, HeadingPitchRange, BoundingSphere, Entity, PolylineGraphics, ConstantPositionProperty, PointGraphics, CustomDataSource, GeoJsonDataSource, KmlDataSource, Rectangle, WebMapServiceImageryProvider, GetFeatureInfoFormat, Resource, WebMapTileServiceImageryProvider, WebMercatorTilingScheme, ImageryLayer, SingleTileImageryProvider, HeightReference, ScreenSpaceEventHandler, ScreenSpaceEventType, UrlTemplateImageryProvider, Viewer } from "cesium";
function ensureCesiumRuntime() {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  const _0xa0a9b9 = window;
  !_0xa0a9b9["CESIUM_BASE_URL"] && (_0xa0a9b9["CESIUM_BASE_URL"] = "https://cdn.jsdelivr.net/npm/cesium@1.143.0/Build/Cesium/", console["info"]("[gizLog] cesium base url atandi surum=1.143.0"));
  const _0x1fdee6 = _0xa0a9b9["CESIUM_BASE_URL"]["replace"](/\/?$/, "/"), _0x440490 = Array["from"](document["querySelectorAll"]("link"))["some"]((_0x4b1b7f) => (_0x4b1b7f["getAttribute"]("href") || "")["includes"]("Widgets/widgets.css"));
  if (_0x440490) return;
  const _0x1b427f = document["createElement"]("link");
  _0x1b427f["rel"] = "stylesheet", _0x1b427f["href"] = _0x1fdee6 + "Widgets/widgets.css", document["head"]["appendChild"](_0x1b427f), console["info"]("[gizLog] cesium widgets.css eklendi");
}
const MAX_LEVEL = 24, EARTH_RADIUS = 6371e3, CORNER_SAFETY = 1.15;
function cornerDistanceRatio(_0x4806d6, _0x47389b, _0x6df074) {
  const _0x14ab88 = Math["tan"](_0x4806d6 / 2), _0x564127 = _0x14ab88 * _0x47389b, _0x30bc43 = Math["atan"](Math["hypot"](_0x564127, _0x14ab88)), _0x4c78dd = EARTH_RADIUS + _0x6df074, _0x2512ef = EARTH_RADIUS * EARTH_RADIUS - _0x4c78dd * _0x4c78dd * Math["sin"](_0x30bc43) ** 2, _0x41e8ca = _0x2512ef > 0 ? _0x4c78dd * Math["cos"](_0x30bc43) - Math["sqrt"](_0x2512ef) : Math["sqrt"](_0x4c78dd * _0x4c78dd - EARTH_RADIUS * EARTH_RADIUS);
  return _0x41e8ca / _0x6df074 * CORNER_SAFETY;
}
function lodTransitionDistances(_0x530a5d) {
  const { drawingBufferHeight: _0x24739f, sseDenominator: _0x4294a9, maximumScreenSpaceError: _0x1caf19, pixelRatio: _0x50d05f } = _0x530a5d, _0x19be96 = [];
  for (let _0x337956 = 0; _0x337956 <= MAX_LEVEL; _0x337956++) {
    const _0x2d4873 = _0x530a5d["geometricError"](_0x337956) * _0x24739f / (_0x4294a9 * _0x1caf19 * _0x50d05f);
    if (Number["isFinite"](_0x2d4873) && _0x2d4873 > 0) _0x19be96["push"](_0x2d4873);
  }
  return _0x19be96["sort"]((_0x2d2f7e, _0x358dbf) => _0x2d2f7e - _0x358dbf);
}
const SEAM_MARGIN = 1.01;
function seamFreeScreenSpaceError(_0x382f90, _0x279405) {
  const _0x26ae00 = _0x279405["maximumScreenSpaceError"], _0x4c5738 = cornerDistanceRatio(_0x279405["fovy"], _0x279405["aspectRatio"], _0x382f90);
  for (const _0x162afb of lodTransitionDistances(_0x279405)) {
    if (_0x162afb > _0x382f90 && _0x162afb < _0x382f90 * _0x4c5738) {
      const _0x1a72fa = _0x26ae00 * (_0x162afb / _0x382f90) * SEAM_MARGIN, _0x43f62a = _0x26ae00 * _0x162afb / (_0x382f90 * _0x4c5738 * SEAM_MARGIN);
      return Math["abs"](Math["log"](_0x1a72fa / _0x26ae00)) <= Math["abs"](Math["log"](_0x43f62a / _0x26ae00)) ? _0x1a72fa : _0x43f62a;
    }
  }
  return _0x26ae00;
}
const NADIR_TOLERANCE_DEGREES = 3;
function installLodSeamGuard(_0x4489e2) {
  const _0x79984f = _0x4489e2["scene"], _0x3474d9 = _0x79984f["globe"];
  if (!_0x3474d9) return () => void 0;
  let _0x254ce8 = _0x3474d9["maximumScreenSpaceError"], _0xfb7834 = _0x254ce8;
  const _0x19fa11 = (_0x123b87) => {
    if (_0x3474d9["maximumScreenSpaceError"] !== _0x123b87) _0x3474d9["maximumScreenSpaceError"] = _0x123b87;
    _0xfb7834 = _0x123b87;
  }, _0x2ac8af = () => {
    if (_0x3474d9["maximumScreenSpaceError"] !== _0xfb7834) _0x254ce8 = _0x3474d9["maximumScreenSpaceError"];
    const _0x2712ae = _0x79984f["camera"]["frustum"], _0x2357e7 = Math["abs"](_0x318bcf["toDegrees"](_0x79984f["camera"]["pitch"]) + 90) <= NADIR_TOLERANCE_DEGREES;
    if (_0x79984f["mode"] !== SceneMode["SCENE3D"] || !_0x2357e7 || !(_0x79984f["terrainProvider"] instanceof EllipsoidTerrainProvider) || _0x2712ae["fovy"] === void 0 || _0x2712ae["aspectRatio"] === void 0 || _0x2712ae["sseDenominator"] === void 0) {
      _0x19fa11(_0x254ce8);
      return;
    }
    const _0x1a0159 = _0x79984f["terrainProvider"], _0x342642 = { "geometricError": (_0x258f05) => _0x1a0159["getLevelMaximumGeometricError"](_0x258f05), "drawingBufferHeight": _0x79984f["drawingBufferHeight"], "sseDenominator": _0x2712ae["sseDenominator"], "maximumScreenSpaceError": _0x254ce8, "pixelRatio": _0x79984f["pixelRatio"] ?? 1, "fovy": _0x2712ae["fovy"], "aspectRatio": _0x2712ae["aspectRatio"] };
    _0x19fa11(seamFreeScreenSpaceError(_0x79984f["camera"]["positionCartographic"]["height"], _0x342642));
  }, _0x2a694a = _0x79984f["preRender"]["addEventListener"](_0x2ac8af);
  return () => {
    _0x2a694a(), !_0x79984f["isDestroyed"]() && _0x3474d9["maximumScreenSpaceError"] === _0xfb7834 && (_0x3474d9["maximumScreenSpaceError"] = _0x254ce8);
  };
}
const SCREEN_DPI$1 = 96, METERS_PER_INCH$1 = 0.0254, REWRITE_TOLERANCE = 5e-3;
function minZoomDistanceForScale(_0x186a7d, _0x1c5b31, _0x4b944f) {
  const _0x5886a5 = Math["tan"](_0x4b944f / 2), _0x4ab536 = _0x186a7d * METERS_PER_INCH$1 / SCREEN_DPI$1 * _0x1c5b31 / (2 * _0x5886a5);
  return Number["isFinite"](_0x4ab536) && _0x4ab536 > 0 ? _0x4ab536 : null;
}
const SNAP_WINDOW_RATIO = 1.06, MIN_SNAP_GAP_METERS = 1e-3, SNAP_DURATION_MS = 150;
function snapToMinAmount(_0x3c853f, _0x14ccb3) {
  const _0x415fbf = _0x3c853f - _0x14ccb3;
  if (!(_0x415fbf > MIN_SNAP_GAP_METERS) || _0x3c853f > _0x14ccb3 * SNAP_WINDOW_RATIO) return 0;
  return _0x415fbf;
}
function installMinZoomScale(_0x31bf41, _0x880e50, _0x229efb) {
  const _0x452728 = _0x31bf41["scene"], _0x510f36 = _0x452728["screenSpaceCameraController"], _0x15e9d3 = () => {
    const _0x334351 = _0x452728["camera"]["frustum"]["fovy"];
    if (_0x334351 === void 0) return;
    const _0x1589dd = _0x452728["canvas"]["clientHeight"], _0x2388ec = minZoomDistanceForScale(_0x880e50, _0x1589dd, _0x334351);
    if (_0x2388ec !== null) {
      const _0x1f84b9 = _0x510f36["minimumZoomDistance"];
      Math["abs"](_0x1f84b9 - _0x2388ec) > _0x1f84b9 * REWRITE_TOLERANCE && (_0x510f36["minimumZoomDistance"] = _0x2388ec);
    }
    const _0x223ddf = minZoomDistanceForScale(_0x229efb, _0x1589dd, _0x334351);
    if (_0x223ddf === null) return;
    const _0x24ad66 = _0x510f36["maximumZoomDistance"];
    Math["abs"](_0x24ad66 - _0x223ddf) > _0x24ad66 * REWRITE_TOLERANCE && (_0x510f36["maximumZoomDistance"] = _0x223ddf);
  }, _0x5e1174 = _0x452728["camera"], _0x321e8b = _0x452728["canvas"];
  let _0x4efa50;
  const _0x2575ba = () => {
    if (_0x4efa50 !== void 0) cancelAnimationFrame(_0x4efa50);
    _0x4efa50 = void 0;
  }, _0x1ecdf1 = () => {
    if (_0x4efa50 !== void 0) return;
    const _0x32e1a1 = snapToMinAmount(_0x5e1174["positionCartographic"]["height"], _0x510f36["minimumZoomDistance"]);
    if (_0x32e1a1 <= 0) return;
    const _0x1a8593 = performance["now"]();
    let _0xa08cff = 0;
    const _0x4180b3 = (_0x56995) => {
      const _0x10a3fe = Math["min"](1, (_0x56995 - _0x1a8593) / SNAP_DURATION_MS), _0x553f53 = _0x32e1a1 * (1 - (1 - _0x10a3fe) * (1 - _0x10a3fe));
      if (_0x553f53 > _0xa08cff) _0x5e1174["zoomIn"](_0x553f53 - _0xa08cff);
      _0xa08cff = _0x553f53, _0x4efa50 = _0x10a3fe < 1 ? requestAnimationFrame(_0x4180b3) : void 0;
    };
    _0x4efa50 = requestAnimationFrame(_0x4180b3);
  };
  _0x321e8b["addEventListener"]("pointerdown", _0x2575ba), _0x321e8b["addEventListener"]("wheel", _0x2575ba, { "passive": !![] });
  const _0x5effee = _0x452728["preRender"]["addEventListener"](_0x15e9d3), _0x558aed = _0x5e1174["moveEnd"]["addEventListener"](_0x1ecdf1);
  return () => {
    _0x2575ba(), _0x321e8b["removeEventListener"]("pointerdown", _0x2575ba), _0x321e8b["removeEventListener"]("wheel", _0x2575ba), _0x5effee(), _0x558aed();
  };
}
const ZOOM_SCALE_STEPS = [100, 250, 500, 1e3, 2500, 5e3, 1e4, 25e3, 5e4, 1e5, 25e4, 5e5, 1e6, 25e5, 5e6, 15e6, 25e6], ON_STEP_TOLERANCE = 0.03;
function nextScaleStep(_0x23e223, _0x364c95) {
  if (!(_0x23e223 > 0) || !Number["isFinite"](_0x23e223)) return null;
  if (_0x364c95 === 1) {
    const _0x50c96e = _0x23e223 / (1 + ON_STEP_TOLERANCE);
    return [...ZOOM_SCALE_STEPS]["reverse"]()["find"]((_0x4cef4b) => _0x4cef4b < _0x50c96e) ?? null;
  }
  const _0x1571bf = _0x23e223 * (1 + ON_STEP_TOLERANCE);
  return ZOOM_SCALE_STEPS["find"]((_0x4cfadc) => _0x4cfadc > _0x1571bf) ?? Infinity;
}
const SCREEN_DPI = 96, METERS_PER_INCH = 0.0254;
function measureGround(_0x39c46c) {
  const _0x4950de = _0x39c46c["globe"];
  if (!_0x4950de) return null;
  const _0x5a5dd9 = _0x39c46c["camera"], _0x14e37f = _0x39c46c["canvas"]["clientWidth"] / 2, _0x22f601 = _0x39c46c["canvas"]["clientHeight"] / 2, _0x16b1f6 = _0x5a5dd9["getPickRay"](new Cartesian2(_0x14e37f - 1, _0x22f601)), _0x3ccfe2 = _0x5a5dd9["getPickRay"](new Cartesian2(_0x14e37f + 1, _0x22f601)), _0x47a0ac = _0x5a5dd9["getPickRay"](new Cartesian2(_0x14e37f, _0x22f601));
  if (!_0x16b1f6 || !_0x3ccfe2 || !_0x47a0ac) return null;
  const _0x553b68 = _0x4950de["pick"](_0x16b1f6, _0x39c46c), _0x154407 = _0x4950de["pick"](_0x3ccfe2, _0x39c46c), _0x4eb32a = _0x4950de["pick"](_0x47a0ac, _0x39c46c);
  if (!_0x553b68 || !_0x154407 || !_0x4eb32a) return null;
  const _0x130350 = Cartesian3["distance"](_0x553b68, _0x154407) / 2;
  return { "scale": _0x130350 * SCREEN_DPI / METERS_PER_INCH, "distance": Cartesian3["distance"](_0x5a5dd9["position"], _0x4eb32a) };
}
const DISPLAY_SNAP_TOLERANCE = 5e-3;
function snapScaleForDisplay(_0x241074) {
  const _0x420b49 = ZOOM_SCALE_STEPS["find"]((_0x534204) => Math["abs"](_0x241074 - _0x534204) <= _0x534204 * DISPLAY_SNAP_TOLERANCE);
  return _0x420b49 ?? _0x241074;
}
const ZOOM_ANIMATION_SECONDS = 0.25;
function easeOut(_0x4e58ee) {
  return 1 - Math["pow"](1 - _0x4e58ee, 3);
}
const pendingZooms = /* @__PURE__ */ new WeakMap();
function planStepAmount(_0xbd76a6, _0x50485c, _0x2233b1, _0x52986c) {
  const _0x25005e = nextScaleStep(_0xbd76a6["scale"], _0x50485c);
  if (_0x25005e === null) return null;
  let _0x3fd6c3 = _0x25005e === Infinity ? Infinity : _0xbd76a6["distance"] * Math["abs"](1 - _0x25005e / _0xbd76a6["scale"]);
  if (_0x50485c === -1) _0x3fd6c3 = Math["min"](_0x3fd6c3, _0x52986c - _0x2233b1);
  return _0x3fd6c3 > 0 && Number["isFinite"](_0x3fd6c3) ? _0x3fd6c3 : null;
}
function flyScaleStep(_0x55ed80, _0x2f4b34, _0x1a01bc, _0x2c6373) {
  const _0x68812f = pendingZooms["get"](_0x55ed80), _0x54e828 = (_0x68812f == null ? void 0 : _0x68812f["ground"]) ?? _0x1a01bc();
  if (!_0x54e828) return;
  const _0x36187f = (_0x68812f == null ? void 0 : _0x68812f["height"]) ?? _0x55ed80["positionCartographic"]["height"], _0x4b7e25 = planStepAmount(_0x54e828, _0x2f4b34, _0x36187f, _0x2c6373);
  if (_0x4b7e25 === null) return;
  const _0x33dc3d = (_0x68812f == null ? void 0 : _0x68812f["position"]) ?? _0x55ed80["position"], _0x43ccd9 = _0x55ed80["direction"], _0x173b5e = _0x55ed80["position"]["clone"]();
  _0x173b5e["x"] = _0x33dc3d["x"] + _0x43ccd9["x"] * _0x4b7e25 * _0x2f4b34, _0x173b5e["y"] = _0x33dc3d["y"] + _0x43ccd9["y"] * _0x4b7e25 * _0x2f4b34, _0x173b5e["z"] = _0x33dc3d["z"] + _0x43ccd9["z"] * _0x4b7e25 * _0x2f4b34;
  const _0xc34424 = _0x54e828["distance"] - _0x2f4b34 * _0x4b7e25, _0x305e33 = { "ground": { "scale": _0x54e828["scale"] * _0xc34424 / _0x54e828["distance"], "distance": _0xc34424 }, "height": _0x36187f - _0x2f4b34 * _0x4b7e25, "position": _0x173b5e }, _0x4b001a = () => {
    if (pendingZooms["get"](_0x55ed80) === _0x305e33) pendingZooms["delete"](_0x55ed80);
  };
  _0x55ed80["flyTo"]({ "destination": _0x173b5e, "orientation": { "direction": _0x43ccd9["clone"](), "up": _0x55ed80["up"]["clone"]() }, "duration": ZOOM_ANIMATION_SECONDS, "easingFunction": easeOut, "complete": _0x4b001a, "cancel": _0x4b001a }), pendingZooms["set"](_0x55ed80, _0x305e33);
}
function scaleZoomStep(_0x25611d, _0x46ac37) {
  const { camera: _0x46c1da, scene: _0x2e0e20 } = _0x25611d;
  flyScaleStep(_0x46c1da, _0x46ac37, () => measureGround(_0x2e0e20), _0x2e0e20["screenSpaceCameraController"]["maximumZoomDistance"]);
}
const WHEEL_STEP_THRESHOLD_PX = 40, WHEEL_SMALL_DELTA_LOCK_MS = 200, LINE_HEIGHT_PX = 16, PAGE_HEIGHT_PX = 400;
function wheelDeltaPixels(_0x10e781, _0x2c3393) {
  if (_0x2c3393 === 1) return _0x10e781 * LINE_HEIGHT_PX;
  if (_0x2c3393 === 2) return _0x10e781 * PAGE_HEIGHT_PX;
  return _0x10e781;
}
function installScaleWheelZoom(_0x2f143b) {
  const _0x311791 = _0x2f143b["scene"]["canvas"], _0x2148cd = _0x2f143b["scene"]["screenSpaceCameraController"], _0x537ba4 = _0x2148cd["zoomEventTypes"];
  _0x2148cd["zoomEventTypes"] = [CameraEventType["MIDDLE_DRAG"], CameraEventType["PINCH"]];
  let _0x4f3d49 = 0, _0x14f4c8 = 0;
  const _0xb536ae = (_0x1e2873) => {
    _0x1e2873["preventDefault"]();
    const _0x565773 = wheelDeltaPixels(_0x1e2873["deltaY"], _0x1e2873["deltaMode"]);
    if (_0x565773 === 0) return;
    const _0x3af5c8 = performance["now"]();
    if (Math["abs"](_0x565773) < WHEEL_STEP_THRESHOLD_PX && _0x3af5c8 < _0x14f4c8) return;
    if (Math["sign"](_0x565773) !== Math["sign"](_0x4f3d49)) _0x4f3d49 = 0;
    _0x4f3d49 += _0x565773;
    if (Math["abs"](_0x4f3d49) < WHEEL_STEP_THRESHOLD_PX) return;
    scaleZoomStep(_0x2f143b, _0x4f3d49 < 0 ? 1 : -1), _0x4f3d49 = 0, _0x14f4c8 = _0x3af5c8 + WHEEL_SMALL_DELTA_LOCK_MS;
  };
  return _0x311791["addEventListener"]("wheel", _0xb536ae, { "passive": ![] }), () => {
    _0x311791["removeEventListener"]("wheel", _0xb536ae), _0x2148cd["zoomEventTypes"] = _0x537ba4;
  };
}
function createMarkerOverlay(_0xb9d075, _0x5e545f, _0x5e526d, _0x12bd37, _0x1fce64 = {}) {
  const _0x140ebd = Cartesian3["fromDegrees"](_0x5e545f, _0x5e526d), _0x313822 = Ellipsoid["WGS84"]["geodeticSurfaceNormal"](_0x140ebd, new Cartesian3()), _0x394012 = new Cartesian3(), _0x5b1491 = new Cartesian2(), _0x94f3d9 = document["createElement"]("img");
  _0x94f3d9["src"] = _0x12bd37, _0x94f3d9["alt"] = "", _0x94f3d9["draggable"] = ![], Object["assign"](_0x94f3d9["style"], { "position": "absolute", "left": "0", "top": "0", "display": "none", "pointerEvents": "none", "userSelect": "none", "zIndex": "1", "willChange": "transform", ..._0x1fce64["width"] === void 0 ? {} : { "width": _0x1fce64["width"] + "px" }, ..._0x1fce64["height"] === void 0 ? {} : { "height": _0x1fce64["height"] + "px" } }), _0xb9d075["container"]["appendChild"](_0x94f3d9);
  const _0x386699 = () => {
    const { scene: _0x58c8fa } = _0xb9d075;
    let _0x4ccaf6 = !![];
    _0x58c8fa["mode"] === SceneMode["SCENE3D"] && (Cartesian3["subtract"](_0x58c8fa["camera"]["positionWC"], _0x140ebd, _0x394012), _0x4ccaf6 = Cartesian3["dot"](_0x313822, _0x394012) > 0);
    const _0x282643 = _0x4ccaf6 ? _0x58c8fa["cartesianToCanvasCoordinates"](_0x140ebd, _0x5b1491) : void 0;
    if (!_0x282643) {
      _0x94f3d9["style"]["display"] = "none";
      return;
    }
    _0x94f3d9["style"]["display"] = "block";
    const _0x4cc316 = Math["round"](_0x282643["x"] - _0x94f3d9["offsetWidth"] / 2), _0x6e0674 = Math["round"](_0x282643["y"] - (_0x1fce64["anchor"] === "center" ? _0x94f3d9["offsetHeight"] / 2 : _0x94f3d9["offsetHeight"]));
    _0x94f3d9["style"]["transform"] = "translate(" + _0x4cc316 + "px, " + _0x6e0674 + "px)";
  }, _0x6c7643 = _0xb9d075["scene"]["postRender"]["addEventListener"](_0x386699);
  return _0x94f3d9["addEventListener"]("load", _0x386699), _0x386699(), () => {
    _0x6c7643(), _0x94f3d9["remove"]();
  };
}
class EventEmitter {
  constructor() {
    this["listeners"] = {};
  }
  ["on"](_0x1ca18e, _0x264aa9) {
    const _0x3a08a3 = this["listeners"][_0x1ca18e];
    return _0x3a08a3 !== void 0 ? _0x3a08a3["add"](_0x264aa9) : this["listeners"][_0x1ca18e] = /* @__PURE__ */ new Set([_0x264aa9]), this;
  }
  ["off"](_0x12dd6d, _0x2cfc5a) {
    var _a2;
    return (_a2 = this["listeners"][_0x12dd6d]) == null ? void 0 : _a2["delete"](_0x2cfc5a), this;
  }
  ["once"](_0x222777, _0x169ebc) {
    const _0x2e54d7 = (_0xc949bc) => {
      _0x169ebc(_0xc949bc), this["off"](_0x222777, _0x2e54d7);
    };
    return this["on"](_0x222777, _0x2e54d7);
  }
  ["emit"](_0x2532bc, _0x55235b) {
    const _0x522b65 = this["listeners"][_0x2532bc];
    if (_0x522b65 === void 0) return;
    for (const _0x17c12c of _0x522b65) {
      _0x17c12c(_0x55235b);
    }
  }
  ["removeAllListeners"](_0x57170d) {
    if (_0x57170d !== void 0) delete this["listeners"][_0x57170d];
    else for (const _0x4e2b70 of Object["keys"](this["listeners"])) {
      delete this["listeners"][_0x4e2b70];
    }
  }
  ["listenerCount"](_0x5f0d77) {
    var _a2;
    return ((_a2 = this["listeners"][_0x5f0d77]) == null ? void 0 : _a2["size"]) ?? 0;
  }
}
const GLOBAL_STATE_SLOT = Symbol["for"]("@tucbs/core/globalConfigState");
function getState() {
  const _0x458129 = globalThis;
  let _0x403c34 = _0x458129[GLOBAL_STATE_SLOT];
  return !_0x403c34 && (_0x403c34 = { "apiKey": void 0, "apiBase": void 0, "proxyBase": void 0, "configured": ![], "refreshers": /* @__PURE__ */ new Set() }, Object["defineProperty"](globalThis, GLOBAL_STATE_SLOT, { "value": _0x403c34, "enumerable": ![], "configurable": ![], "writable": ![] })), _0x403c34;
}
function configureTucbs(_0x5c882a) {
  const _0x29922e = getState();
  if (_0x5c882a["apiBase"] !== void 0) {
    const _0x5b6fa2 = _0x5c882a["apiBase"]["trim"]()["replace"](/\/+$/, "");
    _0x29922e["apiBase"] = _0x5b6fa2 || void 0, _0x29922e["configured"] = !![];
  }
  if (_0x5c882a["proxyBase"] !== void 0) {
    const _0x4cace7 = _0x5c882a["proxyBase"]["trim"]();
    _0x29922e["proxyBase"] = _0x4cace7 || void 0, _0x29922e["configured"] = !![];
  }
  if (_0x5c882a["apiKey"] === void 0) {
    _0x29922e["configured"] && _0x29922e["refreshers"]["forEach"]((_0x1d2b4b) => _0x1d2b4b());
    return;
  }
  _0x29922e["apiKey"] !== void 0 && _0x5c882a["apiKey"] !== _0x29922e["apiKey"] && console["warn"]("[@tucbs/core] configureTucbs() daha once farkli bir apiKey ile cagrilmisti; deger degistirildi. Bu beklenmiyorsa sayfada birden fazla script'in ayni fonksiyonu cagirdigini kontrol edin."), _0x29922e["apiKey"] = _0x5c882a["apiKey"], _0x29922e["configured"] = !![], _0x29922e["refreshers"]["forEach"]((_0x13af44) => _0x13af44());
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
function registerApiKeyRefresh(_0x557a47) {
  const { refreshers: _0x2cdb7d } = getState();
  return _0x2cdb7d["add"](_0x557a47), () => _0x2cdb7d["delete"](_0x557a47);
}
const DEFAULT_UCBP_API_BASE = ("http://localhost:8094/ucbp-api" == null ? void 0 : "http://localhost:8094/ucbp-api"["trim"]()) || "/ucbp-api";
function trimSlash$2(_0x36e341) {
  return _0x36e341["replace"](/\/+$/, "");
}
function getUcbpApiBase() {
  const _0x491c3e = getGlobalApiBase();
  if (_0x491c3e) return trimSlash$2(_0x491c3e);
  return trimSlash$2(DEFAULT_UCBP_API_BASE);
}
function getProxyBase() {
  const _0x4997d2 = getGlobalProxyBase();
  if (_0x4997d2) return _0x4997d2;
  return console["warn"]("proxyBase yok; configureTucbs({ proxyBase }) verilmedi. main.js'te verilmeli."), "";
}
const ERROR_REGISTRY = { "API_KEY_MISSING": { "code": "API_KEY_MISSING", "number": "E001", "title": "API Anahtarı Eksik", "description": "Ne instance ne configureTucbs() ile ayarlanmış global apiKey sağlanmış." }, "API_KEY_INVALID": { "code": "API_KEY_INVALID", "number": "E002", "title": "API Anahtarı Geçersiz", "description": "Sağlanan apiKey backend tarafından reddedildi veya doğrulama isteği başarısız oldu." }, "INTERNAL_INDEX_OUT_OF_RANGE": { "code": "INTERNAL_INDEX_OUT_OF_RANGE", "number": "E003", "title": "İç Durum Hatası", "description": "Beklenen bir dizi indeksi bulunamadı (iç tutarlılık hatası)." }, "OGC_CAPABILITIES_REQUEST_FAILED": { "code": "OGC_CAPABILITIES_REQUEST_FAILED", "number": "E201", "title": "GetCapabilities İsteği Başarısız", "description": "WFS GetCapabilities isteği HTTP hata koduyla döndü." }, "OGC_CAPABILITIES_EXCEPTION": { "code": "OGC_CAPABILITIES_EXCEPTION", "number": "E202", "title": "GetCapabilities OGC Exception", "description": "WFS GetCapabilities yanıtı bir OGC ExceptionReport/ServiceExceptionReport döndürdü." }, "OGC_CAPABILITIES_PARSE_FAILED": { "code": "OGC_CAPABILITIES_PARSE_FAILED", "number": "E203", "title": "GetCapabilities Ayrıştırma Hatası", "description": "WFS GetCapabilities yanıtı geçerli XML olarak ayrıştırılamadı." }, "OGC_FEATURE_TYPE_NOT_FOUND": { "code": "OGC_FEATURE_TYPE_NOT_FOUND", "number": "E204", "title": "FeatureType Bulunamadı", "description": "WFS GetCapabilities yanıtında hiç FeatureType bulunamadı." }, "CRS_UNRESOLVED_UNSUPPORTED": { "code": "CRS_UNRESOLVED_UNSUPPORTED", "number": "E401", "title": "Koordinat Sistemi Tanınamadı", "description": "GeoJSON'daki koordinat sistemi (CRS) çözülemedi ve koordinatlar WGS84 ile uyumlu değil." }, "CRS_CLAIMED_WGS84_INVALID": { "code": "CRS_CLAIMED_WGS84_INVALID", "number": "E402", "title": "Koordinatlar WGS84 İle Uyumsuz", "description": "GeoJSON WGS84/CRS84 olduğunu belirtiyor ama koordinatlar geçerli bir enlem/boylam aralığında değil." }, "CRS_MISSING_UNSUPPORTED": { "code": "CRS_MISSING_UNSUPPORTED", "number": "E403", "title": "Koordinat Sistemi Bilgisi Yok", "description": "GeoJSON'da CRS bilgisi yok ve koordinatlar geçerli bir enlem/boylam aralığında değil." }, "ANALYSIS_API_KEY_MISSING": { "code": "ANALYSIS_API_KEY_MISSING", "number": "E301", "title": "Analiz İçin API Anahtarı Eksik", "description": "AnalysisManager'a apiKey tanımlanmadan analiz isteği yapıldı." }, "ANALYSIS_NETWORK_ERROR": { "code": "ANALYSIS_NETWORK_ERROR", "number": "E302", "title": "Analiz Ağ Hatası", "description": "Analiz isteği ağ seviyesinde (fetch) başarısız oldu." }, "ANALYSIS_REQUEST_FAILED": { "code": "ANALYSIS_REQUEST_FAILED", "number": "E303", "title": "Analiz İsteği Başarısız", "description": "Analiz backend'i HTTP hata koduyla döndü." }, "ANALYSIS_UNSUCCESSFUL": { "code": "ANALYSIS_UNSUCCESSFUL", "number": "E304", "title": "Analiz Başarısız", "description": "Analiz backend'i HTTP 200 döndü ama isSuccess/success=false işaretledi." }, "ANALYSIS_RESPONSE_MISSING_GEOJSON": { "code": "ANALYSIS_RESPONSE_MISSING_GEOJSON", "number": "E305", "title": "Analiz Yanıtı Eksik", "description": "Analiz backend'i başarılı yanıt döndü ama sonuç geojson içermiyor." }, "LAYER_AUTHORIZED_LIST_API_KEY_MISSING": { "code": "LAYER_AUTHORIZED_LIST_API_KEY_MISSING", "number": "E101", "title": "Yetkili Katman Listesi İçin API Anahtarı Gerekli", "description": "getAuthorizedLayers() apiKey ayarlanmadan çağrıldı." }, "LAYER_GEOTIFF_EXPORT_UNSUPPORTED_TYPE": { "code": "LAYER_GEOTIFF_EXPORT_UNSUPPORTED_TYPE", "number": "E102", "title": "GeoTIFF Export Desteklenmiyor", "description": "GeoTIFF export sadece WMS/WCS katmanlarında desteklenir." }, "LAYER_GEOTIFF_EXPORT_NOT_CONFIGURED": { "code": "LAYER_GEOTIFF_EXPORT_NOT_CONFIGURED", "number": "E103", "title": "GeoTIFF Export Yapılandırılmamış", "description": "Katman GeoTIFF export için gerekli tiffFormat seçeneğine sahip değil." }, "LAYER_STYLE_NOT_VECTOR": { "code": "LAYER_STYLE_NOT_VECTOR", "number": "E104", "title": "Stil Sadece Vektör Katmanlarda", "description": "applyLayerStyle() sadece vektör (Entity tabanlı) katmanlarda kullanılabilir." }, "LAYER_TYPE_UNSUPPORTED_XYZ": { "code": "LAYER_TYPE_UNSUPPORTED_XYZ", "number": "E105", "title": "XYZ Katmanı add() İle Desteklenmiyor", "description": "XYZ katmanı add() ile eklenemez, Map.setBasemap() kullanılmalı." }, "LAYER_TYPE_UNSUPPORTED_DRAWING": { "code": "LAYER_TYPE_UNSUPPORTED_DRAWING", "number": "E106", "title": "DRAWING Katmanı add() İle Desteklenmiyor", "description": "DRAWING katmanı DrawingManager tarafından otomatik eklenir, add() ile eklenemez." }, "LAYER_TYPE_UNSUPPORTED_MEASURE": { "code": "LAYER_TYPE_UNSUPPORTED_MEASURE", "number": "E107", "title": "MEASURE Katmanı add() İle Desteklenmiyor", "description": "MEASURE katmanı DrawingManager tarafından otomatik eklenir, add() ile eklenemez." }, "LAYER_WMS_LAYERS_EMPTY": { "code": "LAYER_WMS_LAYERS_EMPTY", "number": "E108", "title": "WMS layers Parametresi Boş", "description": "WMS katmanı eklenirken layers (ogcLayerName) parametresi boş." }, "LAYER_GEOTIFF_UNSUPPORTED": { "code": "LAYER_GEOTIFF_UNSUPPORTED", "number": "E109", "title": "GeoTIFF Katmanı Desteklenmiyor", "description": "GeoTIFF katmanı mevcut Cesium sürümünde desteklenmiyor." }, "LAYER_SHP_PACKAGE_MISSING": { "code": "LAYER_SHP_PACKAGE_MISSING", "number": "E110", "title": "shpjs Paketi Eksik", "description": 'SHP katmanı için gereken "shpjs" paketi tüketici uygulamaya eklenmemiş.' }, "LAYER_CSV_PACKAGE_MISSING": { "code": "LAYER_CSV_PACKAGE_MISSING", "number": "E111", "title": "papaparse Paketi Eksik", "description": 'CSV katmanı için gereken "papaparse" paketi tüketici uygulamaya eklenmemiş.' }, "LAYER_CSV_LATLON_NOT_FOUND": { "code": "LAYER_CSV_LATLON_NOT_FOUND", "number": "E112", "title": "CSV'de lat/lon Sütunu Bulunamadı", "description": "CSV içinde lat/lon sütunları otomatik tespit edilemedi." }, "LAYER_NOT_FOUND": { "code": "LAYER_NOT_FOUND", "number": "E113", "title": "Katman Bulunamadı", "description": "Verilen id'ye sahip bir katman yönetimde kayıtlı değil." }, "LAYER_ID_ALREADY_EXISTS": { "code": "LAYER_ID_ALREADY_EXISTS", "number": "E114", "title": "Katman ID'si Zaten Kayıtlı", "description": "Verilen id ile zaten bir katman eklenmiş." }, "LAYER_TYPE_MISMATCH": { "code": "LAYER_TYPE_MISMATCH", "number": "E115", "title": "Katman Tipi Uyuşmuyor", "description": "Katman beklenen tipte (WMS/WMTS) değil." }, "LAYER_SERVICE_OPTIONS_NOT_FOUND": { "code": "LAYER_SERVICE_OPTIONS_NOT_FOUND", "number": "E116", "title": "Servis Seçenekleri Bulunamadı", "description": "Katman için orijinal servis seçenekleri (serviceLayerOptions) bulunamadı." }, "LAYER_NOT_RASTER": { "code": "LAYER_NOT_RASTER", "number": "E117", "title": "Katman Raster Değil", "description": "İşlem sadece raster (ImageryLayer) katmanlarda desteklenir." }, "OGC_AUTHORIZED_LAYERS_REQUEST_FAILED": { "code": "OGC_AUTHORIZED_LAYERS_REQUEST_FAILED", "number": "E205", "title": "Yetkili Katman Listesi Alınamadı", "description": "getAuthorizedLayers() isteği HTTP hata koduyla döndü." }, "OGC_GEOTIFF_DOWNLOAD_FAILED": { "code": "OGC_GEOTIFF_DOWNLOAD_FAILED", "number": "E206", "title": "GeoTIFF İndirilemedi", "description": "GeoTIFF export isteği HTTP hata koduyla döndü." }, "OGC_WFS_JSON_FORMAT_UNSUPPORTED": { "code": "OGC_WFS_JSON_FORMAT_UNSUPPORTED", "number": "E207", "title": "WFS JSON Format İlan Etmiyor", "description": "WFS sunucusu GetCapabilities yanıtında JSON çıktı formatı ilan etmiyor." }, "OGC_WFS_GEOJSON_REQUEST_FAILED": { "code": "OGC_WFS_GEOJSON_REQUEST_FAILED", "number": "E208", "title": "WFS GeoJSON İsteği Başarısız", "description": "WFS GetFeature (GeoJSON çıktı) isteği başarısız oldu." }, "OGC_WFS_REQUEST_FAILED": { "code": "OGC_WFS_REQUEST_FAILED", "number": "E209", "title": "WFS İsteği Başarısız", "description": "WFS GetFeature (GML çıktı) isteği HTTP hata koduyla döndü." }, "OGC_WFS_EXCEPTION": { "code": "OGC_WFS_EXCEPTION", "number": "E210", "title": "WFS OGC Exception", "description": "WFS GetFeature yanıtı bir OGC ExceptionReport döndürdü." }, "OGC_WFS_OL_PACKAGE_MISSING": { "code": "OGC_WFS_OL_PACKAGE_MISSING", "number": "E211", "title": "ol Paketi Eksik", "description": 'WFS GML yanıtını okumak için gereken "ol" paketi tüketici uygulamaya eklenmemiş.' }, "OGC_WCS_REQUEST_FAILED": { "code": "OGC_WCS_REQUEST_FAILED", "number": "E212", "title": "WCS İsteği Başarısız", "description": "WCS GetCoverage isteği HTTP hata koduyla döndü." }, "OGC_WCS_MULTIPART_IMAGE_NOT_FOUND": { "code": "OGC_WCS_MULTIPART_IMAGE_NOT_FOUND", "number": "E213", "title": "WCS Multipart Görsel Bulunamadı", "description": "Multipart WCS yanıtında görsel (image) parçası bulunamadı." }, "LAYER_PREVIEW_UNSUPPORTED_XYZ": { "code": "LAYER_PREVIEW_UNSUPPORTED_XYZ", "number": "E118", "title": "XYZ Katmanı Önizlemede Desteklenmiyor", "description": "TucbsMapPreview XYZ katman tipini önizlemede desteklemiyor." }, "LAYER_PREVIEW_UNSUPPORTED_DRAWING": { "code": "LAYER_PREVIEW_UNSUPPORTED_DRAWING", "number": "E119", "title": "DRAWING Katmanı Önizlemede Desteklenmiyor", "description": "TucbsMapPreview DRAWING katman tipini önizlemede desteklemiyor." }, "LAYER_PREVIEW_UNSUPPORTED_MEASURE": { "code": "LAYER_PREVIEW_UNSUPPORTED_MEASURE", "number": "E120", "title": "MEASURE Katmanı Önizlemede Desteklenmiyor", "description": "TucbsMapPreview MEASURE katman tipini önizlemede desteklemiyor." }, "LAYER_MANAGER_NOT_READY": { "code": "LAYER_MANAGER_NOT_READY", "number": "E121", "title": "Harita Hazır Değil", "description": "Katman eklenmeye çalışıldığında LayerManager henüz hazır değildi." }, "LAYER_AUTHORIZED_ADD_MISSING_INFO": { "code": "LAYER_AUTHORIZED_ADD_MISSING_INFO", "number": "E122", "title": "Yetkili Katman Eklenemedi", "description": "Yetkili katman için gerekli servis bilgisi (ör. WMTS TileMatrixSet) eksik." }, "OGC_SERVICE_DISCOVERY_PARSE_FAILED": { "code": "OGC_SERVICE_DISCOVERY_PARSE_FAILED", "number": "E214", "title": "Servis Keşfi Ayrıştırma Hatası", "description": "TucbsServiceUpload'da GetCapabilities yanıtı geçerli XML olarak ayrıştırılamadı." }, "LAYER_WMTS_TILEMATRIXSET_MISSING": { "code": "LAYER_WMTS_TILEMATRIXSET_MISSING", "number": "E123", "title": "TileMatrixSet Bilgisi Bulunamadı", "description": "Keşfedilen WMTS katmanı için TileMatrixSet bilgisi bulunamadı." } };
function getErrorCodes() {
  return ERROR_REGISTRY;
}
class TucbsError extends Error {
  constructor(_0x2fbdf6, _0x4a4930, _0x29898a) {
    const _0x3b7541 = ERROR_REGISTRY[_0x2fbdf6];
    super(_0x4a4930 ?? _0x3b7541["description"]), this["name"] = "TucbsError", this["code"] = _0x2fbdf6, this["number"] = _0x3b7541["number"], this["title"] = _0x29898a ?? _0x3b7541["title"];
  }
}
class LayerOperationError extends TucbsError {
  constructor(_0x4983f5, _0x18a7fc, _0x1b1a6) {
    super(_0x4983f5, _0x18a7fc, _0x1b1a6), this["name"] = "LayerOperationError";
  }
}
class OgcRequestError extends TucbsError {
  constructor(_0x5ab86b, _0x3a89e5, _0x11dd21) {
    super(_0x5ab86b, _0x3a89e5, _0x11dd21), this["name"] = "OgcRequestError";
  }
}
class AnalysisRequestError extends TucbsError {
  constructor(_0x11d6d8, _0x3d083b, _0x3bec5f) {
    super(_0x11d6d8, _0x3d083b, _0x3bec5f), this["name"] = "AnalysisRequestError";
  }
}
class GeometryError extends TucbsError {
  constructor(_0x4a981c, _0x1369f6, _0x337f49) {
    super(_0x4a981c, _0x1369f6, _0x337f49), this["name"] = "GeometryError";
  }
}
class ApiKeyValidationError extends TucbsError {
  constructor(_0x408ec8, _0x2445a0) {
    super((_0x2445a0 == null ? void 0 : _0x2445a0["code"]) ?? "API_KEY_INVALID", _0x408ec8, (_0x2445a0 == null ? void 0 : _0x2445a0["title"]) ?? "API Hatası"), this["name"] = "ApiKeyValidationError";
    if ((_0x2445a0 == null ? void 0 : _0x2445a0["reason"]) !== void 0) this["reason"] = _0x2445a0["reason"];
    if ((_0x2445a0 == null ? void 0 : _0x2445a0["detail"]) !== void 0) this["detail"] = _0x2445a0["detail"];
  }
}
const _ApiKeyPolicy = class _ApiKeyPolicy {
  constructor(_0x2639fa) {
    __privateAdd(this, _apiKey);
    this["getApiBase"] = _0x2639fa["apiBase"];
  }
  ["configure"](_0x30e4ac) {
    _0x30e4ac["apiKey"] !== void 0 && __privateSet(this, _apiKey, _0x30e4ac["apiKey"]), _0x30e4ac["trustedApiKeyHosts"] !== void 0 && (this["trustedApiKeyHosts"] = _0x30e4ac["trustedApiKeyHosts"]), _0x30e4ac["apiKeyDiscoveryUrl"] !== void 0 && (this["apiKeyDiscoveryUrl"] = _0x30e4ac["apiKeyDiscoveryUrl"]);
  }
  get ["hasApiKey"]() {
    return __privateGet(this, _apiKey) !== void 0;
  }
  async ["getAuthorizedLayers"]() {
    if (__privateGet(this, _apiKey) === void 0) throw new LayerOperationError("LAYER_AUTHORIZED_LIST_API_KEY_MISSING", "getAuthorizedLayers() icin apiKey gerekli — Map/LayerManager.configure({apiKey}) ile atayin.");
    const _0x4a7fb6 = this["apiKeyDiscoveryUrl"] ?? this["getApiBase"]()["replace"](/\/+$/, "") + "/layers", _0x497b7c = await fetch(_0x4a7fb6, { "headers": { [_ApiKeyPolicy["API_KEY_HEADER_NAME"]]: __privateGet(this, _apiKey) } });
    if (!_0x497b7c["ok"]) throw new OgcRequestError("OGC_AUTHORIZED_LAYERS_REQUEST_FAILED", "Yetkili katman listesi alinamadi: " + _0x497b7c["status"] + " " + _0x497b7c["statusText"]);
    const _0x220b05 = await _0x497b7c["json"](), _0x3eb37d = Array["isArray"](_0x220b05) ? _0x220b05 : _0x220b05["object"] ?? [];
    return _0x3eb37d["map"]((_0x5144f8) => this["normalizeAuthorizedLayer"](_0x5144f8));
  }
  async ["getLayerList"]() {
    return this["getAuthorizedLayers"]();
  }
  ["canAddAuthorizedLayer"](_0x1dadf1) {
    var _a2, _b;
    const _0xc5f171 = (_0x1dadf1["servisTuru"] || "")["toUpperCase"]();
    if (!((_a2 = _0x1dadf1["servisUrl"]) == null ? void 0 : _a2["trim"]()) || !this["resolveOgcLayerName"](_0x1dadf1["ogcLayerName"], _0x1dadf1["katmanAdi"])) return ![];
    if (_0xc5f171 === "WMTS") return !!((_b = _0x1dadf1["wmtsTileMatrixSet"]) == null ? void 0 : _b["trim"]());
    return _0xc5f171 === "WMS" || _0xc5f171 === "WFS";
  }
  ["resolveAddOptions"](_0x4facb5) {
    var _a2;
    if (!this["canAddAuthorizedLayer"](_0x4facb5)) throw new LayerOperationError("LAYER_AUTHORIZED_ADD_MISSING_INFO", ((_a2 = _0x4facb5["servisTuru"]) == null ? void 0 : _a2["toUpperCase"]()) === "WMTS" ? "WMTS için TileMatrixSet eksik." : "Eksik servis bilgisi.");
    const _0x99a652 = _0x4facb5["servisTuru"]["toUpperCase"](), _0x1142d2 = "authorized-" + this["authorizedLayerKey"](_0x4facb5) + "-" + Date["now"](), _0x377713 = this["resolveOgcLayerName"](_0x4facb5["ogcLayerName"], _0x4facb5["katmanAdi"]), _0xc36529 = _0x4facb5["katmanAdi"] || _0x377713;
    if (_0x99a652 === "WMS") return { "layerType": "WMS", "options": { "id": _0x1142d2, "title": _0xc36529, "url": _0x4facb5["servisUrl"], "layers": _0x377713 } };
    if (_0x99a652 === "WFS") return { "layerType": "WFS", "options": { "id": _0x1142d2, "title": _0xc36529, "url": _0x4facb5["servisUrl"], "typeName": _0x377713 } };
    return { "layerType": "WMTS", "options": { "id": _0x1142d2, "title": _0xc36529, "url": _0x4facb5["servisUrl"], "layer": _0x377713, "tileMatrixSetID": _0x4facb5["wmtsTileMatrixSet"] } };
  }
  ["authorizedLayerKey"](_0x5aaf64) {
    return _0x5aaf64["id"] ?? _0x5aaf64["servisTuru"] + "|" + _0x5aaf64["servisUrl"] + "|" + _0x5aaf64["ogcLayerName"];
  }
  ["normalizeAuthorizedLayer"](_0x2a58b3) {
    const _0x46acff = this["resolveOgcLayerName"](_0x2a58b3["ogcLayerName"], _0x2a58b3["katmanAdi"]), _0x16f595 = this["rewriteOpaqueOgcUrl"](_0x2a58b3["servisUrl"]), _0xf4f270 = _0x2a58b3["servisTuru"]["toUpperCase"]();
    return { ..._0x2a58b3, "servisTuru": _0xf4f270, ..._0x46acff && _0x46acff !== _0x2a58b3["ogcLayerName"] ? { "ogcLayerName": _0x46acff } : {}, ..._0x16f595 !== _0x2a58b3["servisUrl"] ? { "servisUrl": _0x16f595 } : {} };
  }
  ["resolveOgcLayerName"](_0x26c4d3, _0x21e7a8) {
    for (const _0x391b54 of [_0x26c4d3, _0x21e7a8]) {
      if (!_0x391b54) continue;
      const _0x12044e = _0x391b54["trim"]();
      if (!_0x12044e || _0x12044e["toLowerCase"]() === "undefined" || _0x12044e["toLowerCase"]() === "null") continue;
      return _0x12044e;
    }
    return "";
  }
  ["isTrustedApiKeyHost"](_0x552b17) {
    if (__privateGet(this, _apiKey) === void 0) return ![];
    return this["isKnownGatedUrl"](_0x552b17);
  }
  ["layerRequiresApiKey"](_0x2ed8e6) {
    return this["isKnownGatedUrl"](_0x2ed8e6);
  }
  ["isKnownGatedUrl"](_0x402120) {
    if (this["isOwnBackendUrl"](_0x402120)) return !![];
    if (this["trustedApiKeyHosts"] === void 0 || this["trustedApiKeyHosts"]["length"] === 0) return ![];
    try {
      return this["trustedApiKeyHosts"]["includes"](new URL(_0x402120)["hostname"]);
    } catch {
      return ![];
    }
  }
  ["isOwnBackendUrl"](_0x30e80a) {
    try {
      const _0x540312 = new URL(_0x30e80a, window["location"]["origin"]), _0x1c2a45 = new URL(this["getApiBase"](), window["location"]["origin"]);
      if (_0x540312["hostname"] !== _0x1c2a45["hostname"]) return ![];
      return _0x540312["pathname"]["includes"]("/wms-proxy/") || _0x540312["pathname"]["includes"]("/ogc/");
    } catch {
      return ![];
    }
  }
  ["rewriteOpaqueOgcUrl"](_0x318b05) {
    if (!(_0x318b05 == null ? void 0 : _0x318b05["includes"]("/ogc/"))) return _0x318b05 ?? "";
    const _0x389ffc = _0x318b05["indexOf"]("/ogc/"), _0x522b69 = _0x318b05["substring"](_0x389ffc), _0x4f8eee = this["getApiBase"]()["replace"](/\/+$/, "");
    return "" + _0x4f8eee + _0x522b69;
  }
  ["resolveOgcProxyUrl"](_0x199fd5, _0x32e6e5) {
    if (__privateGet(this, _apiKey) === void 0) return _0x32e6e5;
    if (_0x32e6e5["includes"]("/ogc/")) return this["rewriteOpaqueOgcUrl"](_0x32e6e5);
    if (_0x32e6e5["includes"]("/wms-proxy/")) return _0x32e6e5;
    const _0x486800 = this["getApiBase"]()["replace"](/\/+$/, "") + "/wms-proxy/" + _0x199fd5, _0x1c5993 = _0x486800["includes"]("?") ? "&" : "?";
    return "" + _0x486800 + _0x1c5993 + "url=" + encodeURIComponent(_0x32e6e5);
  }
  ["mergeApiKeyHeader"](_0x4356d9, _0x50f721) {
    if (!this["isTrustedApiKeyHost"](_0x50f721)) return _0x4356d9;
    return { ..._0x4356d9, [_ApiKeyPolicy["API_KEY_HEADER_NAME"]]: __privateGet(this, _apiKey) };
  }
  ["attachApiKeyToUrl"](_0x462d84) {
    if (!this["isTrustedApiKeyHost"](_0x462d84)) return _0x462d84;
    const _0x258eeb = _0x462d84["includes"]("?") ? "&" : "?";
    return "" + _0x462d84 + _0x258eeb + _ApiKeyPolicy["API_KEY_QUERY_PARAM_NAME"] + "=" + encodeURIComponent(__privateGet(this, _apiKey));
  }
  ["buildAuthHeaders"](_0x176502) {
    if (_0x176502 === void 0) return void 0;
    return { "Authorization": "Bearer " + _0x176502 };
  }
};
_apiKey = new WeakMap();
_ApiKeyPolicy["API_KEY_HEADER_NAME"] = "X-API-Key";
_ApiKeyPolicy["API_KEY_QUERY_PARAM_NAME"] = "tucbsapikey";
let ApiKeyPolicy = _ApiKeyPolicy;
function cartesianToLonLat(_0x3f429f) {
  const _0x22d3b6 = Cartographic["fromCartesian"](_0x3f429f);
  return [_0x318bcf["toDegrees"](_0x22d3b6["longitude"]), _0x318bcf["toDegrees"](_0x22d3b6["latitude"])];
}
function closeRing$1(_0xe14a43) {
  if (_0xe14a43["length"] === 0) return _0xe14a43;
  const _0x1e6e42 = _0xe14a43[0], _0x9d3915 = _0xe14a43[_0xe14a43["length"] - 1];
  if (_0x1e6e42[0] === _0x9d3915[0] && _0x1e6e42[1] === _0x9d3915[1]) return _0xe14a43;
  return [..._0xe14a43, _0x1e6e42];
}
function entityToGeoJSON(_0x8ccfe5, _0x2f874c = JulianDate["now"]()) {
  var _a2, _b, _c;
  const _0x5a7f77 = ((_a2 = _0x8ccfe5["properties"]) == null ? void 0 : _a2["getValue"](_0x2f874c)) ?? {}, _0x75c358 = { ..._0x5a7f77 };
  delete _0x75c358["layerId"], delete _0x75c358["featureId"];
  let _0x5ab7e8 = null;
  if ((_b = _0x8ccfe5["polygon"]) == null ? void 0 : _b["hierarchy"]) {
    const _0x2be09f = _0x8ccfe5["polygon"]["hierarchy"]["getValue"](_0x2f874c), _0x16dfa1 = _0x2be09f == null ? void 0 : _0x2be09f["positions"];
    if (_0x16dfa1 && _0x16dfa1["length"] >= 3) {
      const _0x21f355 = closeRing$1(_0x16dfa1["map"](cartesianToLonLat));
      _0x5ab7e8 = { "type": "Polygon", "coordinates": [_0x21f355] };
    }
  } else {
    if ((_c = _0x8ccfe5["polyline"]) == null ? void 0 : _c["positions"]) {
      const _0x33f0b5 = _0x8ccfe5["polyline"]["positions"]["getValue"](_0x2f874c);
      _0x33f0b5 && _0x33f0b5["length"] >= 2 && (_0x5ab7e8 = { "type": "LineString", "coordinates": _0x33f0b5["map"](cartesianToLonLat) });
    } else {
      if (_0x8ccfe5["position"]) {
        const _0x4d3a44 = _0x8ccfe5["position"]["getValue"](_0x2f874c);
        _0x4d3a44 && (_0x5ab7e8 = { "type": "Point", "coordinates": cartesianToLonLat(_0x4d3a44) });
      }
    }
  }
  if (!_0x5ab7e8) return null;
  return { "type": "Feature", "id": _0x8ccfe5["id"], "properties": _0x75c358, "geometry": _0x5ab7e8 };
}
function featureLabel(_0x257673) {
  var _a2;
  const _0x2a09f1 = ((_a2 = _0x257673["geometry"]) == null ? void 0 : _a2["type"]) ?? "Feature", _0x2f00fd = _0x257673["id"] != null ? String(_0x257673["id"]) : "";
  return _0x2f00fd ? _0x2a09f1 + " " + _0x2f00fd : _0x2a09f1;
}
function triggerDownload(_0x3655f0, _0x29abca) {
  const _0x18e8b7 = URL["createObjectURL"](_0x3655f0), _0x36f279 = document["createElement"]("a");
  _0x36f279["href"] = _0x18e8b7, _0x36f279["download"] = _0x29abca, document["body"]["appendChild"](_0x36f279), _0x36f279["click"](), _0x36f279["remove"](), setTimeout(() => URL["revokeObjectURL"](_0x18e8b7), 1e3);
}
function featureCollectionToKml(_0x431a72) {
  const _0x526fb1 = _0x431a72["features"]["map"]((_0x4645c0, _0x5c2197) => featureToKml(_0x4645c0, _0x5c2197))["join"]("");
  return '<?xml version="1.0" encoding="UTF-8"?>\n<kml xmlns="http://www.opengis.net/kml/2.2"><Document>' + _0x526fb1 + "</Document></kml>";
}
function featureCollectionToShapefileZip(_0x2804db) {
  const _0xe709f4 = collectShpRecords(_0x2804db), _0x547e18 = writeShp(_0xe709f4), _0x490751 = writeShx(_0xe709f4), _0x302e35 = writeDbf(_0xe709f4["map"]((_0x39bf6d) => _0x39bf6d["name"]));
  return zipStore([{ "name": "export.shp", "data": _0x547e18 }, { "name": "export.shx", "data": _0x490751 }, { "name": "export.dbf", "data": _0x302e35 }]);
}
function featureToKml(_0x1baacb, _0x4e9b46) {
  const _0x57f7de = xmlEscape(featureName(_0x1baacb, _0x4e9b46)), _0xb37bf5 = geometryToKml(_0x1baacb["geometry"]);
  if (!_0xb37bf5) return "";
  return "<Placemark><name>" + _0x57f7de + "</name>" + _0xb37bf5 + "</Placemark>";
}
function geometryToKml(_0x52b39c) {
  if (!_0x52b39c) return "";
  switch (_0x52b39c["type"]) {
    case "Point":
      return "<Point><coordinates>" + coord(_0x52b39c["coordinates"]) + "</coordinates></Point>";
    case "MultiPoint":
      return "<MultiGeometry>" + _0x52b39c["coordinates"]["map"]((_0x547a24) => "<Point><coordinates>" + coord(_0x547a24) + "</coordinates></Point>")["join"]("") + "</MultiGeometry>";
    case "LineString":
      return "<LineString><coordinates>" + line(_0x52b39c["coordinates"]) + "</coordinates></LineString>";
    case "MultiLineString":
      return "<MultiGeometry>" + _0x52b39c["coordinates"]["map"]((_0x34ffb0) => "<LineString><coordinates>" + line(_0x34ffb0) + "</coordinates></LineString>")["join"]("") + "</MultiGeometry>";
    case "Polygon":
      return polygonKml(_0x52b39c["coordinates"]);
    case "MultiPolygon":
      return "<MultiGeometry>" + _0x52b39c["coordinates"]["map"]((_0x1cd3e4) => polygonKml(_0x1cd3e4))["join"]("") + "</MultiGeometry>";
    case "GeometryCollection":
      return "<MultiGeometry>" + _0x52b39c["geometries"]["map"]((_0x570e3b) => geometryToKml(_0x570e3b))["join"]("") + "</MultiGeometry>";
    default:
      return "";
  }
}
function polygonKml(_0x136c8f) {
  const [_0x484d46, ..._0x33340e] = _0x136c8f;
  if (!_0x484d46) return "";
  const _0x4c725b = _0x33340e["map"]((_0x4be24a) => "<innerBoundaryIs><LinearRing><coordinates>" + line(_0x4be24a) + "</coordinates></LinearRing></innerBoundaryIs>")["join"]("");
  return "<Polygon><outerBoundaryIs><LinearRing><coordinates>" + line(_0x484d46) + "</coordinates></LinearRing></outerBoundaryIs>" + _0x4c725b + "</Polygon>";
}
function coord(_0xa9998f) {
  return _0xa9998f[0] + "," + _0xa9998f[1] + ",0";
}
function line(_0x965bc7) {
  return _0x965bc7["map"](coord)["join"](" ");
}
function xmlEscape(_0x12d4f9) {
  return _0x12d4f9["replaceAll"]("&", "&amp;")["replaceAll"]("<", "&lt;")["replaceAll"](">", "&gt;")["replaceAll"]('"', "&quot;");
}
function collectShpRecords(_0x5a48c9) {
  const _0xd31948 = firstKind(_0x5a48c9);
  if (!_0xd31948) return [];
  const _0xe160f7 = [];
  return _0x5a48c9["features"]["forEach"]((_0x2311b4, _0x2cef3e) => {
    for (const _0x65de3b of ringsForKind(_0x2311b4["geometry"], _0xd31948)) {
      const _0x29d5f3 = _0x65de3b["map"](closeRing), _0x319eab = _0xd31948 === 5 ? orientPolygon(_0x29d5f3) : _0x29d5f3;
      _0xe160f7["push"]({ "kind": _0xd31948, "name": featureName(_0x2311b4, _0x2cef3e), "rings": _0x319eab, "bbox": bboxOf(_0x319eab) });
    }
  }), _0xe160f7;
}
function firstKind(_0x14d6cf) {
  for (const _0x45c42c of _0x14d6cf["features"]) {
    const _0xd8264f = kindOf(_0x45c42c["geometry"]);
    if (_0xd8264f) return _0xd8264f;
  }
  return null;
}
function kindOf(_0x3f3616) {
  if (!_0x3f3616) return null;
  switch (_0x3f3616["type"]) {
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
      for (const _0x17914e of _0x3f3616["geometries"]) {
        const _0x1e201d = kindOf(_0x17914e);
        if (_0x1e201d) return _0x1e201d;
      }
      return null;
    default:
      return null;
  }
}
function ringsForKind(_0x1b57af, _0x1bf9c0) {
  if (!_0x1b57af || kindOf(_0x1b57af) !== _0x1bf9c0) {
    if ((_0x1b57af == null ? void 0 : _0x1b57af["type"]) === "GeometryCollection") return _0x1b57af["geometries"]["flatMap"]((_0x32b9ec) => ringsForKind(_0x32b9ec, _0x1bf9c0));
    return [];
  }
  switch (_0x1b57af["type"]) {
    case "Point":
      return [[[_0x1b57af["coordinates"]]]];
    case "MultiPoint":
      return _0x1b57af["coordinates"]["map"]((_0x5d7caa) => [[_0x5d7caa]]);
    case "LineString":
      return [[_0x1b57af["coordinates"]]];
    case "MultiLineString":
      return [_0x1b57af["coordinates"]];
    case "Polygon":
      return [_0x1b57af["coordinates"]];
    case "MultiPolygon":
      return _0x1b57af["coordinates"];
    default:
      return [];
  }
}
function closeRing(_0x5b1dea) {
  const _0x5a3f36 = _0x5b1dea[0], _0x1bbf33 = _0x5b1dea[_0x5b1dea["length"] - 1];
  if (!_0x5a3f36 || !_0x1bbf33) return _0x5b1dea;
  if (_0x5a3f36[0] === _0x1bbf33[0] && _0x5a3f36[1] === _0x1bbf33[1]) return _0x5b1dea;
  return [..._0x5b1dea, _0x5a3f36];
}
function orientPolygon(_0x468108) {
  return _0x468108["map"]((_0xd965e3, _0x1c0580) => {
    const _0xe8f45b = signedArea(_0xd965e3), _0x3518ce = _0x1c0580 === 0, _0x1a3085 = _0xe8f45b < 0;
    if (_0x3518ce === _0x1a3085) return _0xd965e3;
    return [..._0xd965e3]["reverse"]();
  });
}
function signedArea(_0x57156f) {
  let _0x3bb8a6 = 0;
  for (let _0x549621 = 0; _0x549621 < _0x57156f["length"] - 1; _0x549621++) {
    const _0xc7ccb1 = _0x57156f[_0x549621], _0x370a88 = _0x57156f[_0x549621 + 1], _0x1ac4e2 = _0xc7ccb1 == null ? void 0 : _0xc7ccb1[0], _0x39a4ee = _0xc7ccb1 == null ? void 0 : _0xc7ccb1[1], _0x45d93b = _0x370a88 == null ? void 0 : _0x370a88[0], _0x13fc60 = _0x370a88 == null ? void 0 : _0x370a88[1];
    if (_0x1ac4e2 === void 0 || _0x39a4ee === void 0 || _0x45d93b === void 0 || _0x13fc60 === void 0) continue;
    _0x3bb8a6 += _0x1ac4e2 * _0x13fc60 - _0x45d93b * _0x39a4ee;
  }
  return _0x3bb8a6 / 2;
}
function bboxOf(_0x35282c) {
  let _0x2176d5 = Infinity, _0x268853 = Infinity, _0x3d1ec0 = -Infinity, _0x3fd7c8 = -Infinity;
  for (const _0x56ccf8 of _0x35282c) {
    for (const _0x3c56a3 of _0x56ccf8) {
      const [_0x1c1d1c, _0x19a955] = xy(_0x3c56a3);
      _0x2176d5 = Math["min"](_0x2176d5, _0x1c1d1c), _0x268853 = Math["min"](_0x268853, _0x19a955), _0x3d1ec0 = Math["max"](_0x3d1ec0, _0x1c1d1c), _0x3fd7c8 = Math["max"](_0x3fd7c8, _0x19a955);
    }
  }
  if (!Number["isFinite"](_0x2176d5)) return [0, 0, 0, 0];
  return [_0x2176d5, _0x268853, _0x3d1ec0, _0x3fd7c8];
}
function featureName(_0x3d9225, _0x126d57) {
  const _0x1416c2 = _0x3d9225["properties"], _0x5af9b7 = _0x1416c2 && typeof _0x1416c2["name"] === "string" ? _0x1416c2["name"] : "";
  return _0x5af9b7 || "feature-" + (_0x126d57 + 1);
}
function writeShp(_0x5862ea) {
  const _0x5c6600 = _0x5862ea["map"](recordBody), _0x357f3f = _0x5c6600["reduce"]((_0x35cb6a, _0x4f5900) => _0x35cb6a + 8 + _0x4f5900["length"], 0), _0x344567 = new Uint8Array(100 + _0x357f3f), _0x11557f = new DataView(_0x344567["buffer"]);
  writeHeader(_0x11557f, _0x344567["length"], _0x5862ea);
  let _0xb9e3a5 = 100;
  return _0x5c6600["forEach"]((_0x53b3eb, _0x45702d) => {
    _0x11557f["setInt32"](_0xb9e3a5, _0x45702d + 1, ![]), _0x11557f["setInt32"](_0xb9e3a5 + 4, _0x53b3eb["length"] / 2, ![]), _0x344567["set"](_0x53b3eb, _0xb9e3a5 + 8), _0xb9e3a5 += 8 + _0x53b3eb["length"];
  }), _0x344567;
}
function writeShx(_0x550b05) {
  const _0x1bb7c8 = new Uint8Array(100 + _0x550b05["length"] * 8), _0x3dd9a3 = new DataView(_0x1bb7c8["buffer"]);
  writeHeader(_0x3dd9a3, _0x1bb7c8["length"], _0x550b05);
  let _0x4d561a = 50;
  return _0x550b05["forEach"]((_0x39d7e8, _0x799ee9) => {
    const _0x25c39a = recordBody(_0x39d7e8)["length"] / 2;
    _0x3dd9a3["setInt32"](100 + _0x799ee9 * 8, _0x4d561a, ![]), _0x3dd9a3["setInt32"](100 + _0x799ee9 * 8 + 4, _0x25c39a, ![]), _0x4d561a += 4 + _0x25c39a;
  }), _0x1bb7c8;
}
function writeHeader(_0x13a93d, _0x3f2135, _0x1438c4) {
  var _a2;
  _0x13a93d["setInt32"](0, 9994, ![]), _0x13a93d["setInt32"](24, _0x3f2135 / 2, ![]), _0x13a93d["setInt32"](28, 1e3, !![]), _0x13a93d["setInt32"](32, ((_a2 = _0x1438c4[0]) == null ? void 0 : _a2["kind"]) ?? 5, !![]);
  const _0x2170f5 = unionBbox(_0x1438c4);
  _0x13a93d["setFloat64"](36, _0x2170f5[0], !![]), _0x13a93d["setFloat64"](44, _0x2170f5[1], !![]), _0x13a93d["setFloat64"](52, _0x2170f5[2], !![]), _0x13a93d["setFloat64"](60, _0x2170f5[3], !![]);
}
function unionBbox(_0xa9f366) {
  if (_0xa9f366["length"] === 0) return [0, 0, 0, 0];
  let _0x1247a8 = Infinity, _0x4d7cbd = Infinity, _0x4fe2d1 = -Infinity, _0x1f4e46 = -Infinity;
  for (const _0x3509ff of _0xa9f366) {
    _0x1247a8 = Math["min"](_0x1247a8, _0x3509ff["bbox"][0]), _0x4d7cbd = Math["min"](_0x4d7cbd, _0x3509ff["bbox"][1]), _0x4fe2d1 = Math["max"](_0x4fe2d1, _0x3509ff["bbox"][2]), _0x1f4e46 = Math["max"](_0x1f4e46, _0x3509ff["bbox"][3]);
  }
  return [_0x1247a8, _0x4d7cbd, _0x4fe2d1, _0x1f4e46];
}
function xy(_0x19394a) {
  return [_0x19394a[0] ?? 0, _0x19394a[1] ?? 0];
}
function recordBody(_0x300d4a) {
  var _a2;
  if (_0x300d4a["kind"] === 1) {
    const _0x5bf23b = new Uint8Array(20), _0x5b102b = new DataView(_0x5bf23b["buffer"]);
    _0x5b102b["setInt32"](0, 1, !![]);
    const [_0x760ef0, _0x2078c2] = xy(((_a2 = _0x300d4a["rings"][0]) == null ? void 0 : _a2[0]) ?? [0, 0]);
    return _0x5b102b["setFloat64"](4, _0x760ef0, !![]), _0x5b102b["setFloat64"](12, _0x2078c2, !![]), _0x5bf23b;
  }
  const _0x3976f4 = _0x300d4a["rings"]["reduce"]((_0x2bdfe8, _0x4b9696) => _0x2bdfe8 + _0x4b9696["length"], 0), _0xda8c7a = new Uint8Array(44 + _0x300d4a["rings"]["length"] * 4 + _0x3976f4 * 16), _0x56f9c1 = new DataView(_0xda8c7a["buffer"]);
  _0x56f9c1["setInt32"](0, _0x300d4a["kind"], !![]), _0x56f9c1["setFloat64"](4, _0x300d4a["bbox"][0], !![]), _0x56f9c1["setFloat64"](12, _0x300d4a["bbox"][1], !![]), _0x56f9c1["setFloat64"](20, _0x300d4a["bbox"][2], !![]), _0x56f9c1["setFloat64"](28, _0x300d4a["bbox"][3], !![]), _0x56f9c1["setInt32"](36, _0x300d4a["rings"]["length"], !![]), _0x56f9c1["setInt32"](40, _0x3976f4, !![]);
  let _0x5be5bf = 0;
  _0x300d4a["rings"]["forEach"]((_0x2ba2de, _0x135774) => {
    _0x56f9c1["setInt32"](44 + _0x135774 * 4, _0x5be5bf, !![]), _0x5be5bf += _0x2ba2de["length"];
  });
  let _0x524fec = 44 + _0x300d4a["rings"]["length"] * 4;
  for (const _0x195de1 of _0x300d4a["rings"]) {
    for (const _0x538332 of _0x195de1) {
      const [_0x4839d1, _0x4b3153] = xy(_0x538332);
      _0x56f9c1["setFloat64"](_0x524fec, _0x4839d1, !![]), _0x56f9c1["setFloat64"](_0x524fec + 8, _0x4b3153, !![]), _0x524fec += 16;
    }
  }
  return _0xda8c7a;
}
function writeDbf(_0x164dde) {
  const _0x4dddb1 = 32 + 32 + 1, _0x35d34f = 1 + 80, _0x38b962 = new Uint8Array(_0x4dddb1 + _0x164dde["length"] * _0x35d34f + 1), _0x4967c9 = new DataView(_0x38b962["buffer"]);
  _0x38b962[0] = 3, _0x4967c9["setUint32"](4, _0x164dde["length"], !![]), _0x4967c9["setUint16"](8, _0x4dddb1, !![]), _0x4967c9["setUint16"](10, _0x35d34f, !![]);
  const _0x1443c4 = new TextEncoder()["encode"]("NAME");
  _0x38b962["set"](_0x1443c4, 32), _0x38b962[32 + 11] = "C"["charCodeAt"](0), _0x38b962[32 + 16] = 80, _0x38b962[32 + 32] = 13;
  const _0x15374a = new TextEncoder();
  return _0x164dde["forEach"]((_0x59f4d8, _0x290d04) => {
    const _0x377cd8 = _0x4dddb1 + _0x290d04 * _0x35d34f;
    _0x38b962[_0x377cd8] = 32;
    const _0x342e1f = _0x15374a["encode"](_0x59f4d8)["slice"](0, 80);
    _0x38b962["set"](_0x342e1f, _0x377cd8 + 1);
    for (let _0xe73a06 = 1 + _0x342e1f["length"]; _0xe73a06 < _0x35d34f; _0xe73a06++) _0x38b962[_0x377cd8 + _0xe73a06] = 32;
  }), _0x38b962[_0x38b962["length"] - 1] = 26, _0x38b962;
}
function zipStore(_0x1a66d2) {
  const _0x206fe4 = new TextEncoder(), _0x1ef4bd = [], _0x3dd4fa = [];
  let _0xc69370 = 0;
  for (const _0x1f8fb8 of _0x1a66d2) {
    const _0x1ddc05 = _0x206fe4["encode"](_0x1f8fb8["name"]), _0x3599ff = crc32(_0x1f8fb8["data"]), _0x4ad619 = new Uint8Array(30 + _0x1ddc05["length"] + _0x1f8fb8["data"]["length"]), _0x2a72b1 = new DataView(_0x4ad619["buffer"]);
    _0x2a72b1["setUint32"](0, 67324752, !![]), _0x2a72b1["setUint16"](4, 20, !![]), _0x2a72b1["setUint16"](8, 0, !![]), _0x2a72b1["setUint32"](14, _0x3599ff, !![]), _0x2a72b1["setUint32"](18, _0x1f8fb8["data"]["length"], !![]), _0x2a72b1["setUint32"](22, _0x1f8fb8["data"]["length"], !![]), _0x2a72b1["setUint16"](26, _0x1ddc05["length"], !![]), _0x4ad619["set"](_0x1ddc05, 30), _0x4ad619["set"](_0x1f8fb8["data"], 30 + _0x1ddc05["length"]), _0x1ef4bd["push"](_0x4ad619);
    const _0x2ac1f1 = new Uint8Array(46 + _0x1ddc05["length"]), _0x18cff7 = new DataView(_0x2ac1f1["buffer"]);
    _0x18cff7["setUint32"](0, 33639248, !![]), _0x18cff7["setUint16"](4, 20, !![]), _0x18cff7["setUint16"](6, 20, !![]), _0x18cff7["setUint16"](10, 0, !![]), _0x18cff7["setUint32"](16, _0x3599ff, !![]), _0x18cff7["setUint32"](20, _0x1f8fb8["data"]["length"], !![]), _0x18cff7["setUint32"](24, _0x1f8fb8["data"]["length"], !![]), _0x18cff7["setUint16"](28, _0x1ddc05["length"], !![]), _0x18cff7["setUint32"](42, _0xc69370, !![]), _0x2ac1f1["set"](_0x1ddc05, 46), _0x3dd4fa["push"](_0x2ac1f1), _0xc69370 += _0x4ad619["length"];
  }
  const _0x53fc9a = _0x3dd4fa["reduce"]((_0x4b16b1, _0x138e48) => _0x4b16b1 + _0x138e48["length"], 0), _0x3bb4ff = new Uint8Array(22), _0x36c29c = new DataView(_0x3bb4ff["buffer"]);
  return _0x36c29c["setUint32"](0, 101010256, !![]), _0x36c29c["setUint16"](8, _0x1a66d2["length"], !![]), _0x36c29c["setUint16"](10, _0x1a66d2["length"], !![]), _0x36c29c["setUint32"](12, _0x53fc9a, !![]), _0x36c29c["setUint32"](16, _0xc69370, !![]), concat([..._0x1ef4bd, ..._0x3dd4fa, _0x3bb4ff]);
}
function crc32(_0x3ee9b7) {
  let _0x137c9f = 4294967295;
  for (const _0x21470a of _0x3ee9b7) {
    _0x137c9f ^= _0x21470a;
    for (let _0x13ddf4 = 0; _0x13ddf4 < 8; _0x13ddf4++) {
      _0x137c9f = _0x137c9f >>> 1 ^ ((_0x137c9f & 1) === 1 ? 3988292384 : 0);
    }
  }
  return (_0x137c9f ^ 4294967295) >>> 0;
}
function concat(_0x471aed) {
  const _0x11551f = _0x471aed["reduce"]((_0x8e2f41, _0x5cd3e6) => _0x8e2f41 + _0x5cd3e6["length"], 0), _0x1d749c = new Uint8Array(_0x11551f);
  let _0x1216bd = 0;
  for (const _0x239134 of _0x471aed) {
    _0x1d749c["set"](_0x239134, _0x1216bd), _0x1216bd += _0x239134["length"];
  }
  return _0x1d749c;
}
function getLayerGeoJSON(_0x28940d, _0x3db5af, _0x22482e) {
  if (!("entities" in _0x28940d["cesiumObject"])) return void 0;
  const _0x3c8e3c = _0x28940d["cesiumObject"]["entities"]["values"]["filter"]((_0x17c4a4) => !_0x22482e(_0x17c4a4))["map"]((_0x151d86) => entityToGeoJSON(_0x151d86, _0x3db5af))["filter"]((_0x4093cd) => _0x4093cd !== null);
  return { "type": "FeatureCollection", "features": _0x3c8e3c };
}
function exportLayerVector(_0x319ec3, _0x2fbdeb, _0x4a9815) {
  if (!_0x319ec3) return;
  const _0x659ad7 = vectorFile(_0x319ec3, _0x4a9815);
  triggerDownload(_0x659ad7["blob"], _0x2fbdeb + "-" + Date["now"]() + "." + _0x659ad7["extension"]);
}
function exportLayerGeoJSON(_0x142eb1, _0x197cb3) {
  exportLayerVector(_0x142eb1, _0x197cb3, "geojson");
}
function exportLayerKml(_0x57eff2, _0x18c4b0) {
  exportLayerVector(_0x57eff2, _0x18c4b0, "kml");
}
function exportLayerShapefile(_0xcb3694, _0xe4d283) {
  exportLayerVector(_0xcb3694, _0xe4d283, "shp");
}
function bytesAsBuffer(_0x57d6b4) {
  return _0x57d6b4["buffer"]["slice"](_0x57d6b4["byteOffset"], _0x57d6b4["byteOffset"] + _0x57d6b4["byteLength"]);
}
function vectorFile(_0x6cb2b3, _0x3b1ee4) {
  if (_0x3b1ee4 === "kml") return { "blob": new Blob([featureCollectionToKml(_0x6cb2b3)], { "type": "application/vnd.google-earth.kml+xml" }), "extension": "kml" };
  if (_0x3b1ee4 === "shp") return { "blob": new Blob([bytesAsBuffer(featureCollectionToShapefileZip(_0x6cb2b3))], { "type": "application/zip" }), "extension": "zip" };
  return { "blob": new Blob([JSON["stringify"](_0x6cb2b3, null, 2)], { "type": "application/geo+json" }), "extension": "geojson" };
}
const GEOTIFF_EXPORT_MAX_WMS_DIMENSION = 2048;
function geoTiffExportDimensions(_0x2a2e7f, _0x566fcf) {
  if (!_0x2a2e7f) return { "width": _0x566fcf, "height": Math["round"](_0x566fcf / 2) };
  const _0x4f4462 = Math["max"](_0x2a2e7f["east"] - _0x2a2e7f["west"], 1e-6), _0x46bb3e = Math["max"](_0x2a2e7f["north"] - _0x2a2e7f["south"], 1e-6), _0x10c8ba = _0x4f4462 >= _0x46bb3e ? _0x566fcf : Math["max"](64, Math["round"](_0x566fcf * _0x4f4462 / _0x46bb3e)), _0x26af73 = _0x46bb3e >= _0x4f4462 ? _0x566fcf : Math["max"](64, Math["round"](_0x566fcf * _0x46bb3e / _0x4f4462));
  return { "width": _0x10c8ba, "height": _0x26af73 };
}
function buildWmsGeoTiffExportUrl(_0x45e0a7, _0x34ebde) {
  const _0x462441 = _0x34ebde("wms", _0x45e0a7["url"]), { width: _0x1b023a, height: _0x46ffb0 } = geoTiffExportDimensions(_0x45e0a7["geographicBoundingBox"], GEOTIFF_EXPORT_MAX_WMS_DIMENSION), _0x4c2ca5 = _0x45e0a7["geographicBoundingBox"], _0x5adac1 = new URLSearchParams({ "SERVICE": "WMS", "REQUEST": "GetMap", "VERSION": "1.3.0", "LAYERS": _0x45e0a7["layers"], "STYLES": "", "FORMAT": _0x45e0a7["tiffFormat"], "TRANSPARENT": "false", "WIDTH": String(_0x1b023a), "HEIGHT": String(_0x46ffb0), "CRS": "CRS:84", "BBOX": _0x4c2ca5 ? _0x4c2ca5["west"] + "," + _0x4c2ca5["south"] + "," + _0x4c2ca5["east"] + "," + _0x4c2ca5["north"] : "-180,-90,180,90" }), _0x4743ea = _0x462441["includes"]("?") ? "&" : "?";
  return "" + _0x462441 + _0x4743ea + _0x5adac1["toString"]();
}
function buildWcsGeoTiffExportUrl(_0x275db0, _0xdf3340) {
  const _0x32e862 = _0xdf3340("wcs", _0x275db0["url"]), _0xe61aee = _0x275db0["version"] ?? "2.0.1", _0x39ecf5 = { "service": "WCS", "version": _0xe61aee, "request": "GetCoverage", "coverageId": _0x275db0["coverageId"], "format": _0x275db0["tiffFormat"] };
  if (_0xe61aee["startsWith"]("2.")) {
    const _0x39113b = _0x275db0["maxSize"] ?? 2048;
    if (Number["isFinite"](_0x39113b)) _0x39ecf5["SCALESIZE"] = "x(" + _0x39113b + "),y(" + _0x39113b + ")";
  }
  const _0xa4700e = _0x32e862["includes"]("?") ? "&" : "?";
  return "" + _0x32e862 + _0xa4700e + new URLSearchParams(_0x39ecf5)["toString"]();
}
function isGeoTiffExportAvailable(_0x25f8d0, _0x359ea3) {
  if (!_0x25f8d0 || _0x25f8d0["layerType"] !== "WMS" && _0x25f8d0["layerType"] !== "WCS") return ![];
  return !!_0x359ea3 && "tiffFormat" in _0x359ea3 && !!_0x359ea3["tiffFormat"];
}
async function exportLayerAsGeoTiff(_0x16f15c, _0x5f288c, _0x576b26, _0x285867, _0x24bf3c) {
  if (_0x16f15c["layerType"] !== "WMS" && _0x16f15c["layerType"] !== "WCS") throw new LayerOperationError("LAYER_GEOTIFF_EXPORT_UNSUPPORTED_TYPE", 'Katman WMS/WCS değil, GeoTIFF export desteklenmiyor: "' + _0x16f15c["id"] + '"');
  if (!_0x5f288c || !("tiffFormat" in _0x5f288c) || !_0x5f288c["tiffFormat"]) throw new LayerOperationError("LAYER_GEOTIFF_EXPORT_NOT_CONFIGURED", 'Katman GeoTIFF export desteklemiyor: "' + _0x16f15c["id"] + '"');
  const _0x4dd8cb = _0x16f15c["layerType"] === "WMS" ? buildWmsGeoTiffExportUrl(_0x5f288c, _0x285867) : buildWcsGeoTiffExportUrl(_0x5f288c, _0x285867), _0x155dea = _0x24bf3c["mergeApiKeyHeader"](_0x24bf3c["buildAuthHeaders"](_0x5f288c["authToken"]), _0x4dd8cb), _0x5f0dcb = await fetch(_0x4dd8cb, _0x155dea ? { "headers": _0x155dea } : void 0);
  if (!_0x5f0dcb["ok"]) throw new OgcRequestError("OGC_GEOTIFF_DOWNLOAD_FAILED", "GeoTIFF indirilemedi: " + _0x5f0dcb["status"] + " " + _0x5f0dcb["statusText"]);
  const _0x5b214e = _0x5f0dcb["headers"]["get"]("content-type") ?? "", _0xbbf8a7 = await _0x5f0dcb["arrayBuffer"](), _0x5bf8bc = /boundary="?([^";]+)"?/i["exec"](_0x5b214e);
  let _0x46451;
  if (_0x5b214e["includes"]("multipart/") && _0x5bf8bc) {
    const { bytes: _0x3f276d, mimeType: _0x2dbdde } = extractMultipartImage(new Uint8Array(_0xbbf8a7), _0x5bf8bc[1]), _0x2fbc1f = _0x3f276d["buffer"]["slice"](_0x3f276d["byteOffset"], _0x3f276d["byteOffset"] + _0x3f276d["byteLength"]);
    _0x46451 = new Blob([_0x2fbc1f], { "type": _0x2dbdde });
  } else _0x46451 = new Blob([_0xbbf8a7], { "type": _0x5b214e || _0x5f288c["tiffFormat"] });
  triggerDownload(_0x46451, _0x576b26 + "-" + Date["now"]() + ".tif");
}
function extractMultipartImage(_0xfd299, _0x145312) {
  var _a2;
  const _0x58a597 = new TextDecoder("iso-8859-1")["decode"](_0xfd299), _0x406ec4 = "--" + _0x145312;
  let _0xaefa60 = 0;
  while (_0xaefa60 < _0x58a597["length"]) {
    const _0x429c69 = _0x58a597["indexOf"](_0x406ec4, _0xaefa60);
    if (_0x429c69 === -1) break;
    const _0x350d9b = _0x429c69 + _0x406ec4["length"], _0x2cc5b0 = _0x58a597["indexOf"](_0x406ec4, _0x350d9b);
    if (_0x2cc5b0 === -1) break;
    const _0x3fbf27 = _0x58a597["indexOf"]("\r\n\r\n", _0x350d9b), _0x47f710 = _0x58a597["indexOf"]("\n\n", _0x350d9b), _0x4e5c10 = _0x3fbf27 !== -1 && (_0x47f710 === -1 || _0x3fbf27 <= _0x47f710) ? _0x3fbf27 : _0x47f710, _0x1c35ad = _0x4e5c10 === _0x3fbf27 ? 4 : 2;
    if (_0x4e5c10 === -1 || _0x4e5c10 >= _0x2cc5b0) {
      _0xaefa60 = _0x2cc5b0;
      continue;
    }
    const _0x4bd2ff = /content-type:\s*([^\r\n;]+)/i["exec"](_0x58a597["slice"](_0x350d9b, _0x4e5c10)), _0x36e77d = (_a2 = _0x4bd2ff == null ? void 0 : _0x4bd2ff[1]) == null ? void 0 : _a2["trim"]();
    if (_0x36e77d == null ? void 0 : _0x36e77d["startsWith"]("image/")) {
      const _0x3ea58e = _0x4e5c10 + _0x1c35ad;
      let _0x367545 = _0x2cc5b0;
      if (_0x58a597[_0x367545 - 2] === "\r" && _0x58a597[_0x367545 - 1] === "\n") _0x367545 -= 2;
      else {
        if (_0x58a597[_0x367545 - 1] === "\n") _0x367545 -= 1;
      }
      return { "bytes": _0xfd299["slice"](_0x3ea58e, _0x367545), "mimeType": _0x36e77d };
    }
    _0xaefa60 = _0x2cc5b0;
  }
  throw new OgcRequestError("OGC_WCS_MULTIPART_IMAGE_NOT_FOUND", "Multipart WCS yanıtında görsel parçası bulunamadı.");
}
const POLE_SLICE_DEGREES = 90, POLE_LATITUDE_LIMIT = 89.9;
function clipRingToLongitude(_0x12cdf6, _0x16358a, _0x3ccaf7) {
  const _0x4434e9 = (_0x31d92a) => _0x3ccaf7 * (_0x31d92a[0] - _0x16358a) >= 0, _0x42272b = [], _0x4f2e74 = (_0x1d13c2) => {
    const _0x49c928 = _0x42272b[_0x42272b["length"] - 1];
    if (_0x49c928 === void 0 || _0x49c928[0] !== _0x1d13c2[0] || _0x49c928[1] !== _0x1d13c2[1]) _0x42272b["push"]([_0x1d13c2[0], _0x1d13c2[1]]);
  };
  for (let _0x507dda = 0; _0x507dda < _0x12cdf6["length"] - 1; _0x507dda++) {
    const _0x40b637 = _0x12cdf6[_0x507dda], _0x39c38e = _0x12cdf6[_0x507dda + 1];
    if (_0x4434e9(_0x40b637)) _0x4f2e74(_0x40b637);
    if (_0x4434e9(_0x40b637) !== _0x4434e9(_0x39c38e)) {
      const _0x43f26d = (_0x16358a - _0x40b637[0]) / (_0x39c38e[0] - _0x40b637[0]);
      _0x4f2e74([_0x16358a, _0x40b637[1] + _0x43f26d * (_0x39c38e[1] - _0x40b637[1])]);
    }
  }
  if (_0x42272b["length"] > 0) _0x4f2e74(_0x42272b[0]);
  return _0x42272b;
}
const _OutlineGeometry = class _OutlineGeometry {
  constructor(_0x4bdb15) {
    this["outlineCompanionEntities"] = /* @__PURE__ */ new WeakSet(), this["entitiesWithOutlineCompanion"] = /* @__PURE__ */ new WeakSet(), this["entitiesWithRiskyOutline"] = /* @__PURE__ */ new WeakSet(), this["getCurrentTime"] = _0x4bdb15["getCurrentTime"];
  }
  ["isOutlineCompanion"](_0x2cd348) {
    return this["outlineCompanionEntities"]["has"](_0x2cd348);
  }
  ["hasOutlineCompanion"](_0x22ff41) {
    return this["entitiesWithOutlineCompanion"]["has"](_0x22ff41);
  }
  ["hasRiskyOutline"](_0x5cea3d) {
    return this["entitiesWithRiskyOutline"]["has"](_0x5cea3d);
  }
  ["addPolygonOutlines"](_0x5a5926, _0x3f3766, _0x2d4439) {
    const _0x39f6a9 = _0x5a5926["entities"]["values"]["filter"]((_0x3064a0) => _0x3064a0["polygon"] !== void 0 && !this["entitiesWithRiskyOutline"]["has"](_0x3064a0));
    _0x5a5926["entities"]["suspendEvents"]();
    for (const _0x53fad7 of _0x39f6a9) {
      this["addPolygonOutlineCompanion"](_0x5a5926, _0x53fad7, _0x3f3766, _0x2d4439, !![]);
    }
    _0x5a5926["entities"]["resumeEvents"]();
  }
  ["addPolygonOutlineCompanion"](_0x4e580f, _0x48ef3b, _0x627d8d, _0x20d53f, _0x522919) {
    var _a2;
    const _0x2c6250 = this["getCurrentTime"](), _0x27c84d = (_a2 = _0x48ef3b["polygon"]["hierarchy"]) == null ? void 0 : _a2["getValue"](_0x2c6250), _0x42620d = _0x27c84d == null ? void 0 : _0x27c84d["positions"], _0x194140 = _0x42620d == null ? void 0 : _0x42620d[0];
    if (_0x42620d === void 0 || _0x42620d["length"] < 2 || _0x194140 === void 0) return;
    _0x48ef3b["polygon"]["outline"] = new ConstantProperty(![]), this["entitiesWithOutlineCompanion"]["add"](_0x48ef3b);
    const _0x5c9a24 = _OutlineGeometry["simplifyOutlinePositions"]([..._0x42620d, _0x194140]), _0x4b0f14 = _0x4e580f["entities"]["add"]({ "id": _0x48ef3b["id"] + "::outline", "polyline": { "positions": _0x5c9a24, "clampToGround": _0x522919, "width": _0x20d53f, "material": _0x627d8d } });
    this["outlineCompanionEntities"]["add"](_0x4b0f14), _0x4b0f14["properties"] = new PropertyBag({ "__tucbsOutlineOf": _0x48ef3b["id"] });
  }
  ["disableRiskyPolygonOutlines"](_0x2972c6) {
    var _a2, _b;
    const _0x7a6ae6 = JulianDate["now"]();
    _0x2972c6["entities"]["suspendEvents"]();
    for (const _0x577cd5 of [..._0x2972c6["entities"]["values"]]) {
      const _0x505480 = _0x577cd5["polygon"], _0x5696c6 = (_a2 = _0x505480 == null ? void 0 : _0x505480["hierarchy"]) == null ? void 0 : _a2["getValue"](_0x7a6ae6);
      if (_0x505480 !== void 0 && this["risksAntimeridianOrPoleBug"](_0x5696c6 == null ? void 0 : _0x5696c6["positions"])) {
        _0x505480["outline"] = new ConstantProperty(![]), this["entitiesWithRiskyOutline"]["add"](_0x577cd5);
        if (_0x5696c6 !== void 0 && this["splitPoleEnclosingPolygon"](_0x2972c6, _0x577cd5, _0x5696c6, _0x7a6ae6)) continue;
        _0x505480["height"] === void 0 && ((_b = _0x505480["perPositionHeight"]) == null ? void 0 : _b["getValue"](_0x7a6ae6)) !== !![] && (_0x505480["height"] = new ConstantProperty(0));
      }
    }
    _0x2972c6["entities"]["resumeEvents"]();
  }
  ["splitPoleEnclosingPolygon"](_0x285407, _0x406ad7, _0x5d8909, _0x441736) {
    var _a2;
    const _0x2b1e65 = _0x406ad7["polygon"];
    if (_0x2b1e65 === void 0 || _0x5d8909["holes"]["length"] > 0) return ![];
    const _0x168e53 = _0x5d8909["positions"]["map"]((_0x2a3574) => {
      const _0x16c715 = Cartographic["fromCartesian"](_0x2a3574);
      return [_0x318bcf["toDegrees"](_0x16c715["longitude"]), _0x318bcf["toDegrees"](_0x16c715["latitude"])];
    });
    let _0x5d7d22 = Infinity, _0x37e5c9 = -Infinity;
    for (let _0x3ff371 = 0; _0x3ff371 < _0x168e53["length"]; _0x3ff371++) {
      const [_0x1c0ef5] = _0x168e53[_0x3ff371];
      if (_0x3ff371 > 0 && Math["abs"](_0x1c0ef5 - _0x168e53[_0x3ff371 - 1][0]) > 180) return ![];
      _0x5d7d22 = Math["min"](_0x5d7d22, _0x1c0ef5), _0x37e5c9 = Math["max"](_0x37e5c9, _0x1c0ef5);
    }
    if (_0x37e5c9 - _0x5d7d22 < 359) return ![];
    const _0x8fd95b = [..._0x168e53, _0x168e53[0]]["map"](([_0x3e4eb8, _0x59205b]) => [_0x3e4eb8, Math["max"](-POLE_LATITUDE_LIMIT, Math["min"](POLE_LATITUDE_LIMIT, _0x59205b))]), _0x2642c9 = [];
    for (let _0x46a06b = -180; _0x46a06b < 180; _0x46a06b += POLE_SLICE_DEGREES) {
      const _0x400e03 = clipRingToLongitude(clipRingToLongitude(_0x8fd95b, _0x46a06b, 1), _0x46a06b + POLE_SLICE_DEGREES, -1)["slice"](0, -1);
      if (_0x400e03["length"] >= 3) _0x2642c9["push"](Cartesian3["fromDegreesArray"](_0x400e03["flat"]()));
    }
    if (_0x2642c9["length"] === 0) return ![];
    const _0x593634 = (_a2 = _0x406ad7["properties"]) == null ? void 0 : _a2["getValue"](_0x441736);
    return _0x2642c9["forEach"]((_0x4c4cb3, _0x29ea7c) => {
      const _0x30e2f0 = new ConstantProperty(new PolygonHierarchy(_0x4c4cb3));
      if (_0x29ea7c === 0) {
        _0x2b1e65["hierarchy"] = _0x30e2f0;
        return;
      }
      const _0x361fdd = _0x2b1e65["clone"]();
      _0x361fdd["hierarchy"] = _0x30e2f0;
      const _0x56f4e2 = _0x285407["entities"]["add"]({ "id": _0x406ad7["id"] + "::part-" + _0x29ea7c, ..._0x406ad7["name"] !== void 0 ? { "name": _0x406ad7["name"] } : {}, "polygon": _0x361fdd });
      if (_0x593634 !== void 0) _0x56f4e2["properties"] = new PropertyBag(_0x593634);
      this["entitiesWithRiskyOutline"]["add"](_0x56f4e2);
    }), !![];
  }
  ["risksAntimeridianOrPoleBug"](_0xc703c4) {
    if (!_0xc703c4 || _0xc703c4["length"] < 2) return ![];
    let _0x22fc56;
    for (const _0x583ef1 of _0xc703c4) {
      const _0x26a3ac = Cartographic["fromCartesian"](_0x583ef1), _0x16302f = _0x318bcf["toDegrees"](_0x26a3ac["latitude"]);
      if (Math["abs"](_0x16302f) > 89) return !![];
      const _0x31751b = _0x318bcf["toDegrees"](_0x26a3ac["longitude"]);
      if (_0x22fc56 !== void 0 && Math["abs"](_0x31751b - _0x22fc56) > 180) return !![];
      _0x22fc56 = _0x31751b;
    }
    return ![];
  }
  ["flattenSuspiciousGeometry"](_0x50e09d) {
    _0x50e09d["entities"]["suspendEvents"]();
    for (const _0x480bb9 of _0x50e09d["entities"]["values"]) {
      if (_0x480bb9["polygon"] !== void 0) _0x480bb9["polygon"]["granularity"] = new ConstantProperty(Math["PI"]);
      if (_0x480bb9["polyline"] !== void 0) _0x480bb9["polyline"]["granularity"] = new ConstantProperty(Math["PI"]);
    }
    _0x50e09d["entities"]["resumeEvents"]();
  }
  static ["douglasPeucker"](_0x3e758f, _0x29b010) {
    const _0x5cb5c9 = new Array(_0x3e758f["length"])["fill"](![]);
    _0x5cb5c9[0] = !![], _0x5cb5c9[_0x3e758f["length"] - 1] = !![];
    const _0xcb8e60 = [[0, _0x3e758f["length"] - 1]];
    while (_0xcb8e60["length"] > 0) {
      const [_0x489beb, _0x3cc68a] = _0xcb8e60["pop"]();
      if (_0x3cc68a <= _0x489beb + 1) continue;
      let _0x3f5fab = -1, _0x730f6d = -1;
      for (let _0x2f60a5 = _0x489beb + 1; _0x2f60a5 < _0x3cc68a; _0x2f60a5++) {
        const _0x51a0ef = _OutlineGeometry["perpendicularDistance"](_0x3e758f[_0x2f60a5], _0x3e758f[_0x489beb], _0x3e758f[_0x3cc68a]);
        _0x51a0ef > _0x3f5fab && (_0x3f5fab = _0x51a0ef, _0x730f6d = _0x2f60a5);
      }
      _0x3f5fab > _0x29b010 && (_0x5cb5c9[_0x730f6d] = !![], _0xcb8e60["push"]([_0x489beb, _0x730f6d], [_0x730f6d, _0x3cc68a]));
    }
    return _0x3e758f["filter"]((_0x49bcb8, _0x373786) => _0x5cb5c9[_0x373786]);
  }
  static ["perpendicularDistance"](_0x45a402, _0x4ebef9, _0x29d671) {
    const _0x3a03b5 = Cartesian3["subtract"](_0x29d671, _0x4ebef9, new Cartesian3()), _0xbffd36 = Cartesian3["magnitudeSquared"](_0x3a03b5);
    if (_0xbffd36 === 0) return Cartesian3["distance"](_0x45a402, _0x4ebef9);
    const _0x3501a3 = Cartesian3["subtract"](_0x45a402, _0x4ebef9, new Cartesian3()), _0x311b21 = _0x318bcf["clamp"](Cartesian3["dot"](_0x3501a3, _0x3a03b5) / _0xbffd36, 0, 1), _0x6f6553 = Cartesian3["add"](_0x4ebef9, Cartesian3["multiplyByScalar"](_0x3a03b5, _0x311b21, _0x3a03b5), _0x3a03b5);
    return Cartesian3["distance"](_0x45a402, _0x6f6553);
  }
  static ["uniformDecimate"](_0x59a728, _0x2a9d56) {
    if (_0x59a728["length"] <= _0x2a9d56) return [..._0x59a728];
    const _0x371d59 = (_0x59a728["length"] - 1) / (_0x2a9d56 - 1);
    return Array["from"]({ "length": _0x2a9d56 }, (_0x31916b, _0x3dd687) => _0x59a728[Math["round"](_0x3dd687 * _0x371d59)]);
  }
  static ["polygonExtentMeters"](_0x2c0f3f) {
    let _0x1be0a2 = Infinity, _0x3c9ffd = Infinity, _0x256f51 = Infinity, _0x17d01c = -Infinity, _0x2173ef = -Infinity, _0x563042 = -Infinity;
    for (const _0x2f9715 of _0x2c0f3f) {
      if (_0x2f9715["x"] < _0x1be0a2) _0x1be0a2 = _0x2f9715["x"];
      if (_0x2f9715["x"] > _0x17d01c) _0x17d01c = _0x2f9715["x"];
      if (_0x2f9715["y"] < _0x3c9ffd) _0x3c9ffd = _0x2f9715["y"];
      if (_0x2f9715["y"] > _0x2173ef) _0x2173ef = _0x2f9715["y"];
      if (_0x2f9715["z"] < _0x256f51) _0x256f51 = _0x2f9715["z"];
      if (_0x2f9715["z"] > _0x563042) _0x563042 = _0x2f9715["z"];
    }
    return Math["sqrt"]((_0x17d01c - _0x1be0a2) ** 2 + (_0x2173ef - _0x3c9ffd) ** 2 + (_0x563042 - _0x256f51) ** 2);
  }
  static ["simplifyOutlinePositions"](_0x3a76ee) {
    const _0x7a74de = _OutlineGeometry["polygonExtentMeters"](_0x3a76ee), _0x4c0f06 = _0x318bcf["clamp"](_0x7a74de * _OutlineGeometry["OUTLINE_SIMPLIFY_TOLERANCE_FACTOR"], _OutlineGeometry["OUTLINE_SIMPLIFY_MIN_TOLERANCE_METERS"], _OutlineGeometry["OUTLINE_SIMPLIFY_MAX_TOLERANCE_METERS"]), _0x482e51 = _OutlineGeometry["douglasPeucker"](_0x3a76ee, _0x4c0f06);
    return _0x482e51["length"] > _OutlineGeometry["OUTLINE_MAX_VERTICES"] ? _OutlineGeometry["uniformDecimate"](_0x482e51, _OutlineGeometry["OUTLINE_MAX_VERTICES"]) : _0x482e51;
  }
};
_OutlineGeometry["OUTLINE_SIMPLIFY_TOLERANCE_FACTOR"] = 7e-5;
_OutlineGeometry["OUTLINE_SIMPLIFY_MIN_TOLERANCE_METERS"] = 0.25;
_OutlineGeometry["OUTLINE_SIMPLIFY_MAX_TOLERANCE_METERS"] = 150;
_OutlineGeometry["OUTLINE_MAX_VERTICES"] = 1200;
let OutlineGeometry = _OutlineGeometry;
class OpacityController {
  constructor(_0x395441) {
    this["dataSourceOpacityStates"] = /* @__PURE__ */ new WeakMap(), this["dataSourceOpacityProperties"] = /* @__PURE__ */ new WeakMap(), this["requestRender"] = _0x395441["requestRender"];
  }
  ["getWrappedBaseColor"](_0x4799e9) {
    return this["dataSourceOpacityProperties"]["get"](_0x4799e9);
  }
  ["prepareDataSourceOpacity"](_0xdf6219) {
    var _a2, _b;
    const _0x317e87 = this["getDataSourceOpacityState"](_0xdf6219), _0x326127 = JulianDate["now"]();
    _0xdf6219["entities"]["suspendEvents"]();
    for (const _0x244b8a of _0xdf6219["entities"]["values"]) {
      if (((_a2 = _0x244b8a["polygon"]) == null ? void 0 : _a2["material"]) instanceof ColorMaterialProperty) {
        const _0x1c5850 = _0x244b8a["polygon"]["material"];
        this["installOpacityColorProperty"](_0x1c5850["color"], _0x317e87, _0x326127, new Color(1, 1, 1, 0.5), (_0x246671) => _0x1c5850["color"] = _0x246671);
      }
      if (((_b = _0x244b8a["polyline"]) == null ? void 0 : _b["material"]) instanceof ColorMaterialProperty) {
        const _0x3cb2e9 = _0x244b8a["polyline"]["material"];
        this["installOpacityColorProperty"](_0x3cb2e9["color"], _0x317e87, _0x326127, Color["WHITE"], (_0x553e86) => _0x3cb2e9["color"] = _0x553e86);
      }
      _0x244b8a["point"] !== void 0 && this["installOpacityColorProperty"](_0x244b8a["point"]["color"], _0x317e87, _0x326127, Color["WHITE"], (_0x5d415e) => _0x244b8a["point"]["color"] = _0x5d415e), _0x244b8a["billboard"] !== void 0 && this["installOpacityColorProperty"](_0x244b8a["billboard"]["color"], _0x317e87, _0x326127, Color["WHITE"], (_0x534233) => _0x244b8a["billboard"]["color"] = _0x534233);
    }
    _0xdf6219["entities"]["resumeEvents"]();
  }
  ["ensureDynamicFillColor"](_0x50ebe7, _0x5cb09b) {
    var _a2;
    if (!(((_a2 = _0x5cb09b["polygon"]) == null ? void 0 : _a2["material"]) instanceof ColorMaterialProperty)) return;
    const _0x167555 = this["getDataSourceOpacityState"](_0x50ebe7), _0x512e57 = _0x5cb09b["polygon"]["material"];
    this["installOpacityColorProperty"](_0x512e57["color"], _0x167555, JulianDate["now"](), new Color(1, 1, 1, 0.5), (_0x4c63bb) => _0x512e57["color"] = _0x4c63bb);
  }
  ["setDataSourceOpacity"](_0x188e45, _0x25e588) {
    const _0x2e306f = this["getDataSourceOpacityState"](_0x188e45);
    if (_0x2e306f["opacity"] === _0x25e588) return;
    _0x2e306f["opacity"] = _0x25e588, !_0x2e306f["wrapped"] && _0x25e588 !== 1 && (this["prepareDataSourceOpacity"](_0x188e45), _0x2e306f["wrapped"] = !![]), this["requestRender"]();
  }
  ["getDataSourceOpacityState"](_0x4d283b) {
    let _0x31b89f = this["dataSourceOpacityStates"]["get"](_0x4d283b);
    return _0x31b89f === void 0 && (_0x31b89f = { "opacity": 1, "wrapped": ![] }, this["dataSourceOpacityStates"]["set"](_0x4d283b, _0x31b89f)), _0x31b89f;
  }
  ["installOpacityColorProperty"](_0x1ea1c5, _0x2c8531, _0x1fa00f, _0x1fd82e, _0x78e1) {
    if (_0x1ea1c5 !== void 0 && this["dataSourceOpacityProperties"]["has"](_0x1ea1c5)) return;
    const _0x35b3fc = this["readColorProperty"](_0x1ea1c5, _0x1fa00f, _0x1fd82e), _0x43b764 = this["createOpacityColorProperty"](_0x35b3fc, _0x2c8531);
    _0x78e1(_0x43b764);
  }
  ["readColorProperty"](_0x27c35f, _0x44beb6, _0x255fca) {
    const _0x34f51a = _0x27c35f == null ? void 0 : _0x27c35f["getValue"](_0x44beb6);
    return _0x34f51a instanceof Color ? Color["clone"](_0x34f51a, new Color()) : Color["clone"](_0x255fca, new Color());
  }
  ["createOpacityColorProperty"](_0x307e4b, _0x4dc866) {
    const _0x301b46 = Color["clone"](_0x307e4b, new Color()), _0x594680 = new CallbackProperty((_0x58d0c6, _0x1a4219) => {
      const _0x1b68b5 = _0x1a4219 instanceof Color ? _0x1a4219 : new Color();
      return _0x1b68b5["red"] = _0x301b46["red"], _0x1b68b5["green"] = _0x301b46["green"], _0x1b68b5["blue"] = _0x301b46["blue"], _0x1b68b5["alpha"] = _0x301b46["alpha"] * _0x4dc866["opacity"], _0x1b68b5;
    }, ![]);
    return this["dataSourceOpacityProperties"]["set"](_0x594680, _0x301b46), _0x594680;
  }
}
const _CameraHighlight = class _CameraHighlight {
  constructor(_0x361ee7, _0x3753f6) {
    this["viewer"] = _0x361ee7, this["deps"] = _0x3753f6;
  }
  async ["zoomToLayer"](_0x2e9411) {
    const _0x4b3163 = this["deps"]["requireLayer"](_0x2e9411);
    return this["viewer"]["zoomTo"](_0x4b3163["cesiumObject"], new HeadingPitchRange(0, -_0x318bcf["PI_OVER_TWO"], 0));
  }
  async ["zoomToEntity"](_0x3d2659, _0x53baeb) {
    var _a2, _b;
    const _0x50711c = this["viewer"]["clock"]["currentTime"];
    let _0x3a22e0;
    if (((_a2 = _0x3d2659["polygon"]) == null ? void 0 : _a2["hierarchy"]) !== void 0) {
      const _0x28862c = _0x3d2659["polygon"]["hierarchy"]["getValue"](_0x50711c);
      _0x3a22e0 = _0x28862c == null ? void 0 : _0x28862c["positions"];
    } else ((_b = _0x3d2659["polyline"]) == null ? void 0 : _b["positions"]) !== void 0 && (_0x3a22e0 = _0x3d2659["polyline"]["positions"]["getValue"](_0x50711c));
    if (_0x3a22e0 !== void 0 && _0x3a22e0["length"] > 0) {
      const _0x4706dc = BoundingSphere["fromPoints"](_0x3a22e0), _0x528299 = Math["max"](_0x4706dc["radius"] * 2, 50);
      return new Promise((_0x564b4d) => {
        this["viewer"]["camera"]["flyToBoundingSphere"](_0x4706dc, { "offset": new HeadingPitchRange(0, -_0x318bcf["PI_OVER_TWO"], _0x528299), ...(_0x53baeb == null ? void 0 : _0x53baeb["duration"]) !== void 0 ? { "duration": _0x53baeb["duration"] } : {}, "complete": () => _0x564b4d(!![]), "cancel": () => _0x564b4d(![]) });
      });
    }
    return this["viewer"]["zoomTo"](_0x3d2659, new HeadingPitchRange(0, -_0x318bcf["PI_OVER_TWO"], 0));
  }
  static ["elevate"](_0x37f4a5, _0x3fa2d8) {
    return _0x37f4a5["map"]((_0x417cdb) => {
      const _0x65b3ad = Cartographic["fromCartesian"](_0x417cdb);
      return Cartesian3["fromRadians"](_0x65b3ad["longitude"], _0x65b3ad["latitude"], _0x65b3ad["height"] + _0x3fa2d8);
    });
  }
  ["highlightEntity"](_0x7cba26) {
    var _a2, _b, _c;
    const _0x5bd562 = this["viewer"]["clock"]["currentTime"], _0xfe4ee4 = (_a2 = _0x7cba26["properties"]) == null ? void 0 : _a2["getValue"](_0x5bd562), _0x1d0017 = _0xfe4ee4 == null ? void 0 : _0xfe4ee4["layerId"], _0x22b0fc = _0x1d0017 !== void 0 ? this["deps"]["getLayerStyle"](_0x1d0017) : void 0, _0x44d234 = _CameraHighlight["HIGHLIGHT_COLOR"], _0x528ad7 = ((_0x22b0fc == null ? void 0 : _0x22b0fc["outline"]["width"]) ?? 2) + 4, _0x87cb20 = new ColorMaterialProperty(_0x44d234), _0x5d2423 = new Entity();
    if (((_b = _0x7cba26["polygon"]) == null ? void 0 : _b["hierarchy"]) !== void 0) {
      const _0x486ff2 = _0x7cba26["polygon"]["hierarchy"]["getValue"](_0x5bd562), _0x399407 = _0x486ff2 == null ? void 0 : _0x486ff2["positions"];
      if (_0x399407 === void 0 || _0x399407["length"] < 2) return;
      const _0x93b908 = Cartesian3["equals"](_0x399407[0], _0x399407[_0x399407["length"] - 1]) ? _0x399407 : [..._0x399407, _0x399407[0]];
      _0x5d2423["polyline"] = new PolylineGraphics({ "positions": _CameraHighlight["elevate"](_0x93b908, _CameraHighlight["HIGHLIGHT_ELEVATION_METERS"]), "width": _0x528ad7, "material": _0x87cb20, "depthFailMaterial": _0x87cb20 });
    } else {
      if (((_c = _0x7cba26["polyline"]) == null ? void 0 : _c["positions"]) !== void 0) {
        const _0x3e00c3 = _0x7cba26["polyline"]["positions"]["getValue"](_0x5bd562);
        if (_0x3e00c3 === void 0 || _0x3e00c3["length"] < 2) return;
        _0x5d2423["polyline"] = new PolylineGraphics({ "positions": _CameraHighlight["elevate"](_0x3e00c3, _CameraHighlight["HIGHLIGHT_ELEVATION_METERS"]), "width": _0x528ad7, "material": _0x87cb20, "depthFailMaterial": _0x87cb20 });
      } else {
        if (_0x7cba26["position"] !== void 0) {
          const _0xaea1d1 = _0x7cba26["position"]["getValue"](_0x5bd562);
          if (_0xaea1d1 === void 0) return;
          _0x5d2423["position"] = new ConstantPositionProperty(_0xaea1d1), _0x5d2423["point"] = new PointGraphics({ "pixelSize": _0x528ad7 + 12, "color": _0x44d234, "disableDepthTestDistance": Number["POSITIVE_INFINITY"] });
        } else return;
      }
    }
    !this["highlightDataSource"] ? (this["highlightDataSource"] = new CustomDataSource("__tucbs_highlight__"), void this["viewer"]["dataSources"]["add"](this["highlightDataSource"])) : this["highlightDataSource"]["entities"]["removeAll"](), this["highlightDataSource"]["entities"]["add"](_0x5d2423);
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
  constructor(_0x273f74) {
    this["appliedLayerStyles"] = /* @__PURE__ */ new Map(), this["appliedCompanionWidths"] = /* @__PURE__ */ new Map(), this["outlineGeometry"] = _0x273f74["outlineGeometry"], this["opacityController"] = _0x273f74["opacityController"], this["getCurrentTime"] = _0x273f74["getCurrentTime"], this["requestRender"] = _0x273f74["requestRender"], this["emitStyle"] = _0x273f74["emitStyle"], this["waitForRenderSettle"] = _0x273f74["waitForRenderSettle"];
  }
  async ["applyLayerStyle"](_0x3286fb, _0x242777, _0x478476, _0x4ccd39) {
    var _a2;
    const _0x214414 = this["appliedCompanionWidths"]["get"](_0x3286fb) ?? ((_a2 = this["appliedLayerStyles"]["get"](_0x3286fb)) == null ? void 0 : _a2["outline"]["width"]), _0x2f1d0d = this["getCurrentTime"](), _0x41cda4 = this["resolveStyleRange"](_0x242777, _0x2f1d0d, _0x4ccd39["fill"]), _0x1139e3 = [], _0x466895 = /* @__PURE__ */ new Map();
    _0x242777["entities"]["suspendEvents"]();
    for (const _0x3adebb of _0x242777["entities"]["values"]) {
      if (this["outlineGeometry"]["isOutlineCompanion"](_0x3adebb)) {
        _0x1139e3["push"](_0x3adebb);
        continue;
      }
      const _0x801fa = this["resolveFillColor"](_0x3adebb, _0x4ccd39["fill"], _0x41cda4, _0x2f1d0d);
      if (_0x3adebb["polygon"] !== void 0 && _0x801fa !== void 0) _0x466895["set"](_0x3adebb["id"], _0x801fa);
      this["applyEntityStyle"](_0x3adebb, _0x801fa, _0x4ccd39["outline"], _0x478476);
    }
    const _0x1d81b3 = this["styleOutlineCompanions"](_0x1139e3, _0x4ccd39["outline"], _0x478476, _0x466895);
    _0x242777["entities"]["resumeEvents"]();
    const _0x3ab6f4 = _0x41cda4 !== null && (_0x4ccd39["fill"]["mode"] === "gradient" || _0x4ccd39["fill"]["mode"] === "bin") ? { ..._0x4ccd39, "fill": { ..._0x4ccd39["fill"], "min": _0x41cda4["min"], "max": _0x41cda4["max"] } } : _0x4ccd39;
    this["appliedLayerStyles"]["set"](_0x3286fb, _0x3ab6f4), this["requestRender"](), this["emitStyle"](_0x3286fb, _0x3ab6f4), this["appliedCompanionWidths"]["set"](_0x3286fb, _0x1d81b3);
    const _0x54eb04 = _0x214414 === void 0 || _0x214414 !== _0x1d81b3;
    if (_0x54eb04) await this["waitForRenderSettle"]();
  }
  ["styleOutlineCompanions"](_0x2b1779, _0x1a6bd1, _0x36c4f8, _0x21c6c1) {
    const _0x4a9658 = _0x1a6bd1["enabled"] ? Color["fromCssColorString"](_0x1a6bd1["color"]) : void 0, _0x3615be = _0x1a6bd1["enabled"] ? _0x1a6bd1["width"] : SEAM_COVER_WIDTH;
    for (const _0x379c09 of _0x2b1779) {
      const _0x246ff2 = _0x1a6bd1["enabled"] || _0x36c4f8 ? void 0 : _0x21c6c1["get"](LayerStyleEngine["outlineOwnerId"](_0x379c09)), _0x1b40d8 = _0x246ff2 !== void 0 && _0x246ff2["alpha"] >= 1;
      _0x379c09["show"] = _0x1a6bd1["enabled"] || _0x1b40d8;
      const _0x3ffa5d = _0x4a9658 ?? (_0x1b40d8 ? _0x246ff2 : void 0);
      _0x3ffa5d !== void 0 && _0x379c09["polyline"] !== void 0 && (_0x379c09["polyline"]["material"] = this["updateColorMaterial"](_0x379c09["polyline"]["material"], _0x3ffa5d), _0x379c09["polyline"]["width"] = LayerStyleEngine["updateConstantProperty"](_0x379c09["polyline"]["width"], _0x3615be));
    }
    return _0x3615be;
  }
  static ["outlineOwnerId"](_0x7c5ad3) {
    return _0x7c5ad3["id"]["endsWith"](OUTLINE_ID_SUFFIX) ? _0x7c5ad3["id"]["slice"](0, -OUTLINE_ID_SUFFIX["length"]) : _0x7c5ad3["id"];
  }
  ["getStyle"](_0x112845) {
    return this["appliedLayerStyles"]["get"](_0x112845);
  }
  ["deleteStyle"](_0x2d3cc1) {
    this["appliedLayerStyles"]["delete"](_0x2d3cc1), this["appliedCompanionWidths"]["delete"](_0x2d3cc1);
  }
  ["recordInitialStyle"](_0x5d7b35, _0x2ab423, _0x473022, _0x1ab25f) {
    const _0x3b5005 = { "fill": { "mode": "solid", "color": _0x2ab423, "opacity": _0x473022 }, "outline": _0x1ab25f };
    this["appliedLayerStyles"]["set"](_0x5d7b35, _0x3b5005), this["emitStyle"](_0x5d7b35, _0x3b5005);
  }
  ["randomLayerColor"]() {
    return Color["fromRandom"]({ "alpha": 1 });
  }
  ["applyEntityColor"](_0x3846c1, _0x1fbde9) {
    _0x3846c1["entities"]["suspendEvents"]();
    for (const _0x407ba3 of _0x3846c1["entities"]["values"]) {
      _0x407ba3["polygon"] !== void 0 && (_0x407ba3["polygon"]["material"] = new ColorMaterialProperty(new ConstantProperty(_0x1fbde9["withAlpha"](0.5)))), _0x407ba3["polyline"] !== void 0 && (_0x407ba3["polyline"]["material"] = new ColorMaterialProperty(new ConstantProperty(_0x1fbde9))), _0x407ba3["point"] !== void 0 && (_0x407ba3["point"]["color"] = new ConstantProperty(_0x1fbde9)), _0x407ba3["billboard"] !== void 0 && (_0x407ba3["billboard"]["color"] = new ConstantProperty(_0x1fbde9));
    }
    _0x3846c1["entities"]["resumeEvents"]();
  }
  ["convertMarkersToPoints"](_0x1b6519, _0x5ce9f7) {
    _0x1b6519["entities"]["suspendEvents"]();
    for (const _0x194025 of _0x1b6519["entities"]["values"]) {
      if (_0x194025["billboard"] === void 0) continue;
      const _0x2ce459 = _0x194025["billboard"]["heightReference"];
      _0x194025["point"] = new PointGraphics({ "pixelSize": 8, "color": _0x5ce9f7, ..._0x2ce459 !== void 0 ? { "heightReference": _0x2ce459 } : {} }), _0x194025["billboard"] = void 0;
    }
    _0x1b6519["entities"]["resumeEvents"]();
  }
  ["applyEntityStyle"](_0x274b79, _0x16cb6d, _0x251f4b, _0x319bf6) {
    const _0x341730 = _0x251f4b["enabled"] ? Color["fromCssColorString"](_0x251f4b["color"]) : void 0;
    _0x274b79["polygon"] !== void 0 && (_0x274b79["polygon"]["material"] = this["updateColorMaterial"](_0x274b79["polygon"]["material"], _0x16cb6d ?? Color["WHITE"]["withAlpha"](0)), !this["outlineGeometry"]["hasOutlineCompanion"](_0x274b79) && !this["outlineGeometry"]["hasRiskyOutline"](_0x274b79) && (_0x274b79["polygon"]["outline"] = LayerStyleEngine["updateConstantProperty"](_0x274b79["polygon"]["outline"], _0x251f4b["enabled"]), _0x341730 !== void 0 && (_0x274b79["polygon"]["outlineColor"] = LayerStyleEngine["updateConstantProperty"](_0x274b79["polygon"]["outlineColor"], _0x341730), _0x274b79["polygon"]["outlineWidth"] = LayerStyleEngine["updateConstantProperty"](_0x274b79["polygon"]["outlineWidth"], _0x251f4b["width"]))));
    if (_0x274b79["polyline"] !== void 0) {
      let _0x1143a5;
      _0x319bf6 ? _0x1143a5 = _0x341730 ?? Color["WHITE"]["withAlpha"](0) : _0x1143a5 = _0x251f4b["enabled"] ? _0x341730 : _0x16cb6d, _0x274b79["polyline"]["material"] = this["updateColorMaterial"](_0x274b79["polyline"]["material"], _0x1143a5 ?? Color["WHITE"]["withAlpha"](0)), _0x251f4b["enabled"] && (_0x274b79["polyline"]["width"] = LayerStyleEngine["updateConstantProperty"](_0x274b79["polyline"]["width"], _0x251f4b["width"]));
    }
    _0x274b79["point"] !== void 0 && (_0x274b79["point"]["color"] = _0x16cb6d !== void 0 ? this["updateColorProperty"](_0x274b79["point"]["color"], _0x16cb6d) : void 0, _0x251f4b["enabled"] && _0x341730 !== void 0 && (_0x274b79["point"]["outlineColor"] = LayerStyleEngine["updateConstantProperty"](_0x274b79["point"]["outlineColor"], _0x341730), _0x274b79["point"]["outlineWidth"] = LayerStyleEngine["updateConstantProperty"](_0x274b79["point"]["outlineWidth"], _0x251f4b["width"]))), _0x274b79["billboard"] !== void 0 && _0x16cb6d !== void 0 && (_0x274b79["billboard"]["color"] = this["updateColorProperty"](_0x274b79["billboard"]["color"], _0x16cb6d));
  }
  ["resolveFillColor"](_0x374b00, _0x28aae9, _0x2aaead, _0x2048ae) {
    switch (_0x28aae9["mode"]) {
      case "off":
        return void 0;
      case "solid":
        return Color["fromCssColorString"](_0x28aae9["color"])["withAlpha"](_0x28aae9["opacity"]);
      case "gradient": {
        if (_0x2aaead === null) return void 0;
        const _0x91b58f = this["readNumericProperty"](_0x374b00, _0x28aae9["column"], _0x2048ae);
        if (_0x91b58f === null) return void 0;
        if (_0x91b58f < _0x2aaead["min"] || _0x91b58f > _0x2aaead["max"]) return void 0;
        const _0x171515 = _0x2aaead["max"] === _0x2aaead["min"] ? 0.5 : _0x318bcf["clamp"]((_0x91b58f - _0x2aaead["min"]) / (_0x2aaead["max"] - _0x2aaead["min"]), 0, 1);
        return LayerStyleEngine["sampleFromPalette"](_0x28aae9["palette"], _0x171515, _0x28aae9["paletteKind"])["withAlpha"](_0x28aae9["opacity"]);
      }
      case "bin": {
        if (_0x2aaead === null) return void 0;
        const _0x1f907c = this["readNumericProperty"](_0x374b00, _0x28aae9["column"], _0x2048ae);
        if (_0x1f907c === null) return void 0;
        const _0x42431b = (_0x2aaead["max"] - _0x2aaead["min"]) / _0x28aae9["binCount"], _0x4865c5 = Array["from"]({ "length": _0x28aae9["binCount"] }, (_0x2d5283, _0x4104db) => _0x2aaead["min"] + _0x42431b * (_0x4104db + 1)), _0x54d54b = LayerStyleEngine["pickBin"](_0x1f907c, _0x4865c5), _0x1c5042 = _0x28aae9["binCount"] <= 1 ? 0.5 : _0x54d54b / (_0x28aae9["binCount"] - 1);
        return LayerStyleEngine["sampleFromPalette"](_0x28aae9["palette"], _0x1c5042, _0x28aae9["paletteKind"])["withAlpha"](_0x28aae9["opacity"]);
      }
      case "enum": {
        const _0x497f2b = this["readProperty"](_0x374b00, _0x28aae9["column"], _0x2048ae);
        if (_0x497f2b === null) return void 0;
        const _0x2b4808 = _0x28aae9["colors"][String(_0x497f2b)];
        return _0x2b4808 !== void 0 ? Color["fromCssColorString"](_0x2b4808)["withAlpha"](_0x28aae9["opacity"]) : Color["LIGHTGRAY"]["withAlpha"](_0x28aae9["opacity"]);
      }
    }
  }
  ["readProperty"](_0x23ccd0, _0x3ff176, _0x10b2c8) {
    const _0x11a6fd = _0x23ccd0["properties"];
    if (_0x11a6fd === void 0 || !_0x11a6fd["hasProperty"](_0x3ff176)) return null;
    const _0xe83b7 = _0x11a6fd["getValue"](_0x10b2c8), _0x37d196 = _0xe83b7 == null ? void 0 : _0xe83b7[_0x3ff176];
    if (_0x37d196 === void 0 || _0x37d196 === null) return null;
    return typeof _0x37d196 === "number" ? _0x37d196 : String(_0x37d196);
  }
  ["readNumericProperty"](_0x8026a6, _0x31d9bf, _0x2b2f29) {
    const _0x24b52d = this["readProperty"](_0x8026a6, _0x31d9bf, _0x2b2f29);
    if (_0x24b52d === null) return null;
    const _0xa5b781 = typeof _0x24b52d === "number" ? _0x24b52d : Number(_0x24b52d);
    return Number["isFinite"](_0xa5b781) ? _0xa5b781 : null;
  }
  ["resolveStyleRange"](_0x47bf6b, _0x289044, _0x59b409) {
    if (_0x59b409["mode"] !== "gradient" && _0x59b409["mode"] !== "bin") return null;
    if (_0x59b409["min"] !== void 0 && _0x59b409["max"] !== void 0) return { "min": _0x59b409["min"], "max": _0x59b409["max"] };
    const _0x4e64b4 = this["getColumnRange"](_0x47bf6b, _0x289044, _0x59b409["column"]);
    if (_0x4e64b4 === null) return null;
    return { "min": _0x59b409["min"] ?? _0x4e64b4["min"], "max": _0x59b409["max"] ?? _0x4e64b4["max"] };
  }
  ["getColumnRange"](_0xf4c2e5, _0x434b27, _0x1f7b54) {
    let _0xee9bda = Infinity, _0x3bcb1a = -Infinity;
    for (const _0x2543fe of _0xf4c2e5["entities"]["values"]) {
      const _0x3e7002 = this["readNumericProperty"](_0x2543fe, _0x1f7b54, _0x434b27);
      if (_0x3e7002 === null) continue;
      if (_0x3e7002 < _0xee9bda) _0xee9bda = _0x3e7002;
      if (_0x3e7002 > _0x3bcb1a) _0x3bcb1a = _0x3e7002;
    }
    return Number["isFinite"](_0xee9bda) && Number["isFinite"](_0x3bcb1a) ? { "min": _0xee9bda, "max": _0x3bcb1a } : null;
  }
  static ["valueEquals"](_0x1bfc0d, _0x4f1cbf) {
    if (_0x1bfc0d instanceof Color || _0x4f1cbf instanceof Color) return _0x1bfc0d instanceof Color && _0x4f1cbf instanceof Color && Color["equals"](_0x1bfc0d, _0x4f1cbf);
    return _0x1bfc0d === _0x4f1cbf;
  }
  static ["updateConstantProperty"](_0x5cc571, _0x1f6a4d) {
    if (_0x5cc571 instanceof ConstantProperty) return !LayerStyleEngine["valueEquals"](_0x5cc571["getValue"](), _0x1f6a4d) && _0x5cc571["setValue"](_0x1f6a4d), _0x5cc571;
    return new ConstantProperty(_0x1f6a4d);
  }
  ["updateColorProperty"](_0x42d32d, _0x1a195b) {
    const _0xd4db66 = _0x42d32d !== void 0 ? this["opacityController"]["getWrappedBaseColor"](_0x42d32d) : void 0;
    if (_0xd4db66 !== void 0) return Color["clone"](_0x1a195b, _0xd4db66), _0x42d32d;
    if (_0x42d32d instanceof ConstantProperty) return !LayerStyleEngine["valueEquals"](_0x42d32d["getValue"](), _0x1a195b) && _0x42d32d["setValue"](_0x1a195b), _0x42d32d;
    return new ConstantProperty(_0x1a195b);
  }
  ["updateColorMaterial"](_0x589345, _0x2e2a6d) {
    if (_0x589345 instanceof ColorMaterialProperty) return _0x589345["color"] = this["updateColorProperty"](_0x589345["color"], _0x2e2a6d), _0x589345;
    return new ColorMaterialProperty(this["updateColorProperty"](void 0, _0x2e2a6d));
  }
  static ["sampleFromPalette"](_0x57abe0, _0x51389e, _0x403d9b) {
    return _0x403d9b === "qualitative" ? LayerStyleEngine["sampleDiscrete"](_0x57abe0, _0x51389e) : LayerStyleEngine["sampleGradient"](_0x57abe0, _0x51389e);
  }
  static ["sampleGradient"](_0x169a7e, _0x9aed89) {
    if (_0x169a7e["length"] === 0) return Color["GRAY"];
    if (_0x169a7e["length"] === 1) return Color["fromCssColorString"](_0x169a7e[0]);
    const _0x287ddd = _0x318bcf["clamp"](_0x9aed89, 0, 1) * (_0x169a7e["length"] - 1), _0x5e8213 = Math["floor"](_0x287ddd), _0x3cda69 = Math["min"](_0x169a7e["length"] - 1, _0x5e8213 + 1), _0x3c14b3 = _0x287ddd - _0x5e8213, _0x4488b0 = Color["fromCssColorString"](_0x169a7e[_0x5e8213]), _0xa7163d = Color["fromCssColorString"](_0x169a7e[_0x3cda69]);
    return Color["lerp"](_0x4488b0, _0xa7163d, _0x3c14b3, new Color());
  }
  static ["sampleDiscrete"](_0x2997cb, _0xf62da2) {
    if (_0x2997cb["length"] === 0) return Color["GRAY"];
    const _0xf35783 = Math["round"](_0x318bcf["clamp"](_0xf62da2, 0, 1) * (_0x2997cb["length"] - 1));
    return Color["fromCssColorString"](_0x2997cb[_0xf35783]);
  }
  static ["pickBin"](_0x380b14, _0x3bcb88) {
    for (let _0x2bfb7d = 0; _0x2bfb7d < _0x3bcb88["length"]; _0x2bfb7d++) {
      if (_0x380b14 <= _0x3bcb88[_0x2bfb7d]) return _0x2bfb7d;
    }
    return _0x3bcb88["length"] - 1;
  }
}
function extractEpsgCode(_0x50e538) {
  if (!/EPSG/i["test"](_0x50e538)) return void 0;
  const _0x5d9856 = _0x50e538["trim"]();
  let _0x40fdb8 = _0x5d9856["length"];
  while (_0x40fdb8 > 0 && _0x5d9856["charCodeAt"](_0x40fdb8 - 1) >= 48 && _0x5d9856["charCodeAt"](_0x40fdb8 - 1) <= 57) {
    _0x40fdb8--;
  }
  const _0x2e4a6a = _0x5d9856["slice"](_0x40fdb8);
  return _0x2e4a6a["length"] > 0 ? _0x2e4a6a : void 0;
}
const proj4DefRequests = /* @__PURE__ */ new Map();
async function registerProj4Def(_0x53fb35, _0x5eeaf8) {
  const _0x36f644 = "EPSG:" + _0x5eeaf8;
  if (_0x53fb35["defs"](_0x36f644)) return !![];
  let _0x138a35 = proj4DefRequests["get"](_0x5eeaf8);
  !_0x138a35 && (_0x138a35 = (async () => {
    try {
      const _0x580ad2 = await fetch("https://epsg.io/" + _0x5eeaf8 + ".proj4");
      if (!_0x580ad2["ok"]) return _0x580ad2["status"] === 404 ? "missing" : "transient-failure";
      const _0x3292d4 = (await _0x580ad2["text"]())["trim"]();
      if (!_0x3292d4) return "missing";
      return _0x53fb35["defs"](_0x36f644, _0x3292d4), "registered";
    } catch {
      return "transient-failure";
    }
  })(), proj4DefRequests["set"](_0x5eeaf8, _0x138a35));
  const _0x352a6d = await _0x138a35;
  return _0x352a6d === "transient-failure" && proj4DefRequests["get"](_0x5eeaf8) === _0x138a35 && proj4DefRequests["delete"](_0x5eeaf8), _0x352a6d === "registered";
}
async function ensureProj4Def(_0x132d5f) {
  let _0x3ca610;
  try {
    ({ default: _0x3ca610 } = await import("proj4"));
  } catch {
    return console["warn"]("[ogc/proj4Defs] EPSG:" + _0x132d5f + ' icin koordinat donusumu atlandi -- "proj4" paketi yuklu degil (peer dependency olarak eklenmemis). Bu EPSG kodunu kullanan WCS katmanlari yanlis/genis bir alanda gorunebilir.'), void 0;
  }
  if (!await registerProj4Def(_0x3ca610, _0x132d5f)) return console["warn"]("[ogc/proj4Defs] EPSG:" + _0x132d5f + " icin proj4 tanimi epsg.io'dan alinamadi (agsizlik veya gecersiz/desteklenmeyen kod olabilir). Bu EPSG kodunu kullanan WCS katmanlari yanlis/genis bir alanda gorunebilir."), void 0;
  return _0x3ca610;
}
const CESIUM_BUILTIN_CRS_NAMES = /* @__PURE__ */ new Set(["urn:ogc:def:crs:OGC:1.3:CRS84", "EPSG:4326", "urn:ogc:def:crs:EPSG::4326"]);
function defaultCrsFunction(_0x40ea23) {
  return Cartesian3["fromDegrees"](_0x40ea23[0], _0x40ea23[1], _0x40ea23[2]);
}
function numericCodeString(_0x3a3088) {
  if (_0x3a3088 === void 0) return void 0;
  const _0x2a27b2 = String(_0x3a3088)["trim"]();
  return /^\d+$/["test"](_0x2a27b2) ? _0x2a27b2 : void 0;
}
function isSuspiciousCrsResult(_0xf13b7d) {
  return _0xf13b7d !== null && _0xf13b7d["kind"] !== "reprojected";
}
function firstCoordinatePair(_0x1b1b83) {
  let _0x4cae52 = _0x1b1b83;
  while (Array["isArray"](_0x4cae52) && _0x4cae52["length"] > 0 && Array["isArray"](_0x4cae52[0])) {
    _0x4cae52 = _0x4cae52[0];
  }
  if (Array["isArray"](_0x4cae52) && _0x4cae52["length"] >= 2 && typeof _0x4cae52[0] === "number" && typeof _0x4cae52[1] === "number") return [_0x4cae52[0], _0x4cae52[1]];
  return void 0;
}
function findFirstCoordinates(_0x579d42) {
  if (typeof _0x579d42 !== "object" || _0x579d42 === null) return void 0;
  const _0x40097d = _0x579d42;
  if (_0x40097d["type"] === "FeatureCollection" && Array["isArray"](_0x40097d["features"])) {
    for (const _0x334529 of _0x40097d["features"]) {
      const _0x18e929 = findFirstCoordinates(_0x334529);
      if (_0x18e929) return _0x18e929;
    }
    return void 0;
  }
  if (_0x40097d["type"] === "Feature") return findFirstCoordinates(_0x40097d["geometry"]);
  if (_0x40097d["type"] === "GeometryCollection" && Array["isArray"](_0x40097d["geometries"])) {
    for (const _0x38a584 of _0x40097d["geometries"]) {
      const _0x115c62 = findFirstCoordinates(_0x38a584);
      if (_0x115c62) return _0x115c62;
    }
    return void 0;
  }
  if ("coordinates" in _0x40097d) return firstCoordinatePair(_0x40097d["coordinates"]);
  return void 0;
}
function resolveOrRejectUnresolvedCrs(_0x6f41af, _0x4a615d, _0x2870cb) {
  if (!_0x2870cb) throw new GeometryError("CRS_UNRESOLVED_UNSUPPORTED", "Koordinat sistemi tanınamadı ve WGS84 ile uyumlu değil.");
  return GeoJsonDataSource["crsNames"][_0x6f41af] = defaultCrsFunction, { "kind": "suspicious-unresolved-crs", "crsName": _0x4a615d };
}
function acceptClaimedWgs84(_0x49a8dc, _0x57dcc7, _0x12bcc3) {
  if (!_0x57dcc7) throw new GeometryError("CRS_CLAIMED_WGS84_INVALID", "Koordinatlar WGS84 ile uyumlu değil.");
  if (_0x12bcc3) GeoJsonDataSource["crsNames"][_0x49a8dc] = defaultCrsFunction;
  return null;
}
function computeLooksLikeWgs84(_0x52b006) {
  const _0x32cab7 = findFirstCoordinates(_0x52b006);
  return !_0x32cab7 || Math["abs"](_0x32cab7[0]) <= 180 && Math["abs"](_0x32cab7[1]) <= 90;
}
function resolveCrsFieldOrThrow(_0x22b590, _0x571943) {
  const _0x1c1229 = "crs" in _0x22b590 ? _0x22b590["crs"] : void 0;
  if (!_0x1c1229 || typeof _0x1c1229 !== "object") {
    if (!_0x571943) throw new GeometryError("CRS_MISSING_UNSUPPORTED", "Bu dosyada geçerli koordinat sistemi (CRS) bilgisi yok.");
    return null;
  }
  return _0x1c1229;
}
async function ensureGeoJsonCrsSupport(_0x9bf530) {
  var _a2, _b, _c;
  if (typeof _0x9bf530 !== "object" || _0x9bf530 === null) return null;
  const _0x22e32f = computeLooksLikeWgs84(_0x9bf530), _0x17f018 = resolveCrsFieldOrThrow(_0x9bf530, _0x22e32f);
  if (!_0x17f018) return null;
  const _0x3422a9 = _0x17f018["type"] === "EPSG", _0x51d070 = _0x3422a9 ? "EPSG:" + ((_a2 = _0x17f018["properties"]) == null ? void 0 : _a2["code"]) : (_b = _0x17f018["properties"]) == null ? void 0 : _b["name"];
  if (!_0x51d070 || typeof _0x51d070 !== "string") return null;
  if (CESIUM_BUILTIN_CRS_NAMES["has"](_0x51d070)) return acceptClaimedWgs84(_0x51d070, _0x22e32f, ![]);
  const _0x35f22c = _0x3422a9 ? numericCodeString((_c = _0x17f018["properties"]) == null ? void 0 : _c["code"]) : extractEpsgCode(_0x51d070);
  if (!_0x35f22c) return resolveOrRejectUnresolvedCrs(_0x51d070, _0x51d070, _0x22e32f);
  if (_0x35f22c === "4326") return acceptClaimedWgs84(_0x51d070, _0x22e32f, !![]);
  const _0x5ee17b = "EPSG:" + _0x35f22c;
  let _0x59c55a;
  try {
    ({ default: _0x59c55a } = await import("proj4"));
  } catch {
    return resolveOrRejectUnresolvedCrs(_0x51d070, _0x5ee17b, _0x22e32f);
  }
  if (!await registerProj4Def(_0x59c55a, _0x35f22c)) return resolveOrRejectUnresolvedCrs(_0x51d070, _0x5ee17b, _0x22e32f);
  return GeoJsonDataSource["crsNames"][_0x51d070] = (_0x40cf32) => {
    const [_0x20a232, _0xec14dd] = _0x59c55a(_0x5ee17b, "EPSG:4326", [_0x40cf32[0], _0x40cf32[1]]);
    return Cartesian3["fromDegrees"](_0x20a232, _0xec14dd, _0x40cf32[2]);
  }, { "kind": "reprojected", "fromEpsg": _0x5ee17b };
}
class LocalSourceLoader {
  constructor(_0x4c8908, _0x3ba173) {
    this["viewer"] = _0x4c8908, this["deps"] = _0x3ba173;
  }
  async ["addLocalKmlGeoJson"](_0x58a0bc, _0x2c2910) {
    let _0x3a70c8, _0x3dfbaa, _0xbab57 = null;
    const _0x15f6ba = this["deps"]["styleEngine"]["randomLayerColor"]();
    let _0x452a08 = _0x2c2910["clampToGround"] ?? !![];
    if (_0x58a0bc === "GEOJSON") {
      const _0x5d903c = _0x2c2910["data"] instanceof File ? JSON["parse"](await this["fileToText"](_0x2c2910["data"])) : _0x2c2910["data"];
      _0xbab57 = await ensureGeoJsonCrsSupport(_0x5d903c);
      if (isSuspiciousCrsResult(_0xbab57)) _0x452a08 = ![];
      _0x3a70c8 = await GeoJsonDataSource["load"](_0x5d903c, { "clampToGround": _0x452a08, "fill": _0x15f6ba["withAlpha"](0.5), "stroke": _0x15f6ba, "strokeWidth": 2, "markerColor": _0x15f6ba }), this["deps"]["styleEngine"]["applyEntityColor"](_0x3a70c8, _0x15f6ba), this["deps"]["styleEngine"]["convertMarkersToPoints"](_0x3a70c8, _0x15f6ba);
      if (isSuspiciousCrsResult(_0xbab57)) this["deps"]["outlineGeometry"]["flattenSuspiciousGeometry"](_0x3a70c8);
    } else {
      let _0x42a7d5;
      _0x2c2910["data"] instanceof File ? (_0x3dfbaa = this["fileToBlobUrl"](_0x2c2910["data"]), _0x42a7d5 = _0x3dfbaa) : _0x42a7d5 = _0x2c2910["data"], _0x3a70c8 = await KmlDataSource["load"](_0x42a7d5, { "camera": this["viewer"]["scene"]["camera"], "canvas": this["viewer"]["scene"]["canvas"], "clampToGround": _0x452a08 }), this["deps"]["styleEngine"]["applyEntityColor"](_0x3a70c8, _0x15f6ba);
    }
    this["deps"]["outlineGeometry"]["disableRiskyPolygonOutlines"](_0x3a70c8);
    _0x452a08 && this["deps"]["addPolygonOutlines"](_0x3a70c8, this["deps"]["defaultOutlineColor"], 2);
    await this["viewer"]["dataSources"]["add"](_0x3a70c8);
    _0x3dfbaa !== void 0 && URL["revokeObjectURL"](_0x3dfbaa);
    const _0x2467a3 = _0x15f6ba["toCssHexString"](), _0x4bc1e1 = this["deps"]["register"](_0x2c2910["id"], _0x2c2910["title"], _0x58a0bc, _0x3a70c8, ![], _0x2467a3);
    return this["deps"]["emitCrsCheckResult"](_0x4bc1e1["id"], _0xbab57), this["deps"]["styleEngine"]["recordInitialStyle"](_0x4bc1e1["id"], _0x2467a3, 0.5, { "enabled": !![], "color": this["deps"]["defaultOutlineColorHex"], "width": 2 }), await this["deps"]["waitForRenderSettle"](), _0x4bc1e1;
  }
  async ["addShp"](_0x43d360) {
    let _0x582e52;
    try {
      ({ getShapefile: _0x582e52 } = await import("shpjs"));
    } catch {
      throw new LayerOperationError("LAYER_SHP_PACKAGE_MISSING", 'SHP katmanı için "shpjs" paketi gereklidir: shpjs kütüphanesini import etmelisiniz');
    }
    const _0x47132b = _0x43d360["data"] instanceof File ? await this["fileToArrayBuffer"](_0x43d360["data"]) : _0x43d360["data"], _0x378f76 = await _0x582e52(_0x47132b), _0x280e6f = Array["isArray"](_0x378f76) ? { "type": "FeatureCollection", "features": _0x378f76["flatMap"]((_0x4adb28) => _0x4adb28["features"]) } : _0x378f76;
    return loadVectorGeoJsonLayer(this["viewer"], this["deps"], _0x280e6f, { "id": _0x43d360["id"], "title": _0x43d360["title"], "layerType": "SHP", "clampToGround": _0x43d360["clampToGround"] ?? !![] });
  }
  async ["addCsv"](_0x13189c) {
    let _0x1eb1db;
    try {
      ({ default: _0x1eb1db } = await import("papaparse"));
    } catch {
      throw new LayerOperationError("LAYER_CSV_PACKAGE_MISSING", 'CSV katmanı için "papaparse" paketi gereklidir: papaparse kütüphanesini import etmelisiniz');
    }
    const _0x247ba9 = _0x13189c["data"] instanceof File ? await this["fileToText"](_0x13189c["data"]) : _0x13189c["data"], _0x4b65c6 = _0x1eb1db["parse"](_0x247ba9, { "header": !![], "dynamicTyping": !![] }), _0x4a2fe6 = _0x4b65c6["data"], _0x30562a = _0x4a2fe6["find"]((_0x133ef0) => _0x133ef0 && Object["keys"](_0x133ef0)["length"] > 0), _0x31267c = _0x30562a && this["detectLatLonKeys"](_0x30562a);
    if (!_0x31267c) throw new LayerOperationError("LAYER_CSV_LATLON_NOT_FOUND", "CSV içinde lat/lon sütunlarını bulamadım (ör: lat, lon).");
    const _0x5e70a0 = this["deps"]["styleEngine"]["randomLayerColor"](), _0x2c00b7 = new CustomDataSource(_0x13189c["title"]);
    for (const _0x2dc679 of _0x4a2fe6) {
      const _0x48f7fa = Number(_0x2dc679[_0x31267c["lat"]]), _0x32e296 = Number(_0x2dc679[_0x31267c["lon"]]);
      Number["isFinite"](_0x48f7fa) && Number["isFinite"](_0x32e296) && _0x2c00b7["entities"]["add"]({ "position": Cartesian3["fromDegrees"](_0x32e296, _0x48f7fa), "point": { "pixelSize": 6, "color": _0x5e70a0 }, "properties": _0x2dc679 });
    }
    await this["viewer"]["dataSources"]["add"](_0x2c00b7);
    const _0x55a067 = _0x5e70a0["toCssHexString"](), _0xcc138a = this["deps"]["register"](_0x13189c["id"], _0x13189c["title"], "CSV", _0x2c00b7, ![], _0x55a067);
    return this["deps"]["styleEngine"]["recordInitialStyle"](_0xcc138a["id"], _0x55a067, 1, { "enabled": ![], "color": _0x55a067, "width": 0 }), _0xcc138a;
  }
  ["detectLatLonKeys"](_0x1612bc) {
    const _0x5ae276 = Object["keys"](_0x1612bc)["reduce"]((_0x5313a4, _0x124472) => {
      const _0x877bf7 = _0x124472["toLowerCase"]();
      if (!_0x5313a4["lat"] && /^(lat|latitude|y)$/["test"](_0x877bf7)) _0x5313a4["lat"] = _0x124472;
      if (!_0x5313a4["lon"] && /^(lon|lng|long|longitude|x)$/["test"](_0x877bf7)) _0x5313a4["lon"] = _0x124472;
      return _0x5313a4;
    }, { "lat": "", "lon": "" });
    return _0x5ae276["lat"] && _0x5ae276["lon"] ? _0x5ae276 : null;
  }
  async ["fileToText"](_0x1864bf) {
    return decodeTextBuffer(await _0x1864bf["arrayBuffer"]());
  }
  ["fileToBlobUrl"](_0x15beea) {
    return URL["createObjectURL"](_0x15beea);
  }
  ["fileToArrayBuffer"](_0x52a8fb) {
    return _0x52a8fb["arrayBuffer"]();
  }
}
async function loadVectorGeoJsonLayer(_0x18e00b, _0x421b7a, _0x1b7b6a, _0x1a1e3c, _0x5a0e66) {
  const _0x4273ed = await ensureGeoJsonCrsSupport(_0x1b7b6a), _0x3041ed = _0x421b7a["styleEngine"]["randomLayerColor"](), _0xc96160 = isSuspiciousCrsResult(_0x4273ed) ? ![] : _0x1a1e3c["clampToGround"], _0x52ba9b = await GeoJsonDataSource["load"](_0x1b7b6a, { "clampToGround": _0xc96160, "fill": _0x3041ed["withAlpha"](0.5), "stroke": _0x3041ed, "strokeWidth": 2, "markerColor": _0x3041ed });
  _0x421b7a["styleEngine"]["applyEntityColor"](_0x52ba9b, _0x3041ed), _0x421b7a["styleEngine"]["convertMarkersToPoints"](_0x52ba9b, _0x3041ed), _0x421b7a["outlineGeometry"]["disableRiskyPolygonOutlines"](_0x52ba9b);
  if (isSuspiciousCrsResult(_0x4273ed)) _0x421b7a["outlineGeometry"]["flattenSuspiciousGeometry"](_0x52ba9b);
  _0xc96160 && _0x421b7a["addPolygonOutlines"](_0x52ba9b, _0x421b7a["defaultOutlineColor"], 2);
  await _0x18e00b["dataSources"]["add"](_0x52ba9b);
  const _0x357031 = _0x3041ed["toCssHexString"](), _0x14530c = _0x421b7a["register"](_0x1a1e3c["id"], _0x1a1e3c["title"], _0x1a1e3c["layerType"], _0x52ba9b, ![], _0x357031);
  return _0x421b7a["emitCrsCheckResult"](_0x14530c["id"], _0x4273ed), _0x5a0e66 == null ? void 0 : _0x5a0e66(_0x14530c), _0x421b7a["styleEngine"]["recordInitialStyle"](_0x14530c["id"], _0x357031, 0.5, { "enabled": !![], "color": _0x421b7a["defaultOutlineColorHex"], "width": 2 }), await _0x421b7a["waitForRenderSettle"](), _0x14530c;
}
function decodeTextBuffer(_0x2fcfbd) {
  try {
    return new TextDecoder("utf-8", { "fatal": !![] })["decode"](_0x2fcfbd);
  } catch {
    return new TextDecoder("windows-1254")["decode"](_0x2fcfbd);
  }
}
const els = (_0x172bd3, _0x20daf0) => Array["from"](_0x172bd3["getElementsByTagNameNS"]("*", _0x20daf0)), el = (_0x4abe55, _0x35c8a8) => els(_0x4abe55, _0x35c8a8)[0], txt = (_0x15e6de, _0x28e16d) => {
  var _a2, _b;
  return (_b = (_a2 = el(_0x15e6de, _0x28e16d)) == null ? void 0 : _a2["textContent"]) == null ? void 0 : _b["trim"]();
};
function buildWfsCapabilitiesUrl(_0x188335) {
  const _0x2cb970 = new URL(_0x188335, window["location"]["origin"]), _0x5a4131 = new URL("" + _0x2cb970["origin"] + _0x2cb970["pathname"]);
  for (const [_0x25a356, _0x296a14] of _0x2cb970["searchParams"]["entries"]()) {
    const _0x16b30b = _0x25a356["toLowerCase"]();
    (_0x16b30b === "url" || _0x16b30b === "tucbsapikey") && _0x5a4131["searchParams"]["set"](_0x25a356, _0x296a14);
  }
  return _0x5a4131["searchParams"]["set"]("service", "WFS"), _0x5a4131["searchParams"]["set"]("request", "GetCapabilities"), _0x5a4131["searchParams"]["set"]("acceptVersions", "2.0.0,1.1.0,1.0.0"), _0x5a4131["toString"]();
}
function isOgcExceptionXml(_0x1f8657) {
  const _0x25a8f6 = _0x1f8657["trimStart"]();
  return _0x25a8f6["startsWith"]("<") && (_0x25a8f6["includes"]("ExceptionReport") || _0x25a8f6["includes"]("ServiceExceptionReport"));
}
function repairBareAmpersands(_0x1a46fa) {
  return _0x1a46fa["replace"](/&(?!(?:amp|lt|gt|quot|apos|#\d+|#x[\da-fA-F]+);)/gi, "&amp;");
}
async function fetchWfsCapabilities(_0x2fb6c1, _0x30fed1 = {}) {
  const _0x5e52d6 = await fetch(buildWfsCapabilitiesUrl(_0x2fb6c1), _0x30fed1);
  if (!_0x5e52d6["ok"]) throw new OgcRequestError("OGC_CAPABILITIES_REQUEST_FAILED", "WFS GetCapabilities başarısız: " + _0x5e52d6["status"] + " " + _0x5e52d6["statusText"]);
  const _0x541f93 = await _0x5e52d6["text"]();
  if (isOgcExceptionXml(_0x541f93)) throw new OgcRequestError("OGC_CAPABILITIES_EXCEPTION", "WFS GetCapabilities OGC Exception döndü.");
  const _0x2005a6 = repairBareAmpersands(_0x541f93), _0x19028e = new DOMParser()["parseFromString"](_0x2005a6, "application/xml");
  if (_0x19028e["querySelector"]("parsererror")) throw new OgcRequestError("OGC_CAPABILITIES_PARSE_FAILED", "WFS GetCapabilities XML parse edilemedi.");
  const _0x347916 = _0x19028e["documentElement"]["getAttribute"]("version") || "2.0.0", _0x1f6df8 = [];
  for (const _0x325ee2 of els(_0x19028e, "FeatureType")) {
    const _0x2a6d08 = txt(_0x325ee2, "Name") || "";
    if (!_0x2a6d08) continue;
    const _0x6fd62 = els(_0x325ee2, "OutputFormats")["flatMap"]((_0x565e4f) => els(_0x565e4f, "Format")["map"]((_0x7e052c) => {
      var _a2;
      return ((_a2 = _0x7e052c["textContent"]) == null ? void 0 : _a2["trim"]()) || "";
    })["filter"](Boolean)), _0x52ea41 = txt(_0x325ee2, "Title"), _0x21e656 = txt(_0x325ee2, "DefaultCRS"), _0x10d09b = txt(_0x325ee2, "DefaultSRS");
    _0x1f6df8["push"]({ "name": _0x2a6d08, ..._0x52ea41 ? { "title": _0x52ea41 } : {}, ..._0x21e656 ? { "defaultCRS": _0x21e656 } : {}, ..._0x10d09b ? { "defaultSRS": _0x10d09b } : {}, ..._0x6fd62["length"] ? { "outputFormats": _0x6fd62 } : {} });
  }
  const _0x14ab2f = el(_0x19028e, "OperationsMetadata");
  let _0x1d2096 = [];
  if (_0x14ab2f) {
    const _0x4b7384 = els(_0x14ab2f, "Operation")["find"]((_0x2b646c) => (_0x2b646c["getAttribute"]("name") || "") === "GetFeature"), _0x4bd405 = els(_0x4b7384 ?? _0x14ab2f, "Parameter")["find"]((_0xf65ee3) => (_0xf65ee3["getAttribute"]("name") || "")["toLowerCase"]() === "outputformat");
    _0x4bd405 && (_0x1d2096 = els(_0x4bd405, "Value")["map"]((_0x1e9fe4) => {
      var _a2;
      return ((_a2 = _0x1e9fe4["textContent"]) == null ? void 0 : _a2["trim"]()) || "";
    })["filter"](Boolean));
  }
  if (!_0x1d2096["length"]) {
    const _0x2eb4ca = /* @__PURE__ */ new Set();
    _0x1d2096 = _0x1f6df8["flatMap"]((_0x3d376c) => _0x3d376c["outputFormats"] || [])["filter"]((_0x54fb02) => !_0x2eb4ca["has"](_0x54fb02) && _0x2eb4ca["add"](_0x54fb02));
  }
  return { "version": _0x347916, "featureTypes": _0x1f6df8, "outputFormats": _0x1d2096 };
}
function normName(_0x4b5249) {
  return _0x4b5249["trim"]()["toLowerCase"]();
}
function localTypeName(_0x5d433c) {
  const _0x3baf16 = _0x5d433c["lastIndexOf"](":");
  return _0x3baf16 >= 0 ? _0x5d433c["slice"](_0x3baf16 + 1) : _0x5d433c;
}
function resolveWfsFeatureType(_0x211a73, _0x5693e0) {
  if (!_0x5693e0["length"]) throw new OgcRequestError("OGC_FEATURE_TYPE_NOT_FOUND", "WFS FeatureType bulunamadı.");
  const _0x24fa0e = _0x211a73 == null ? void 0 : _0x211a73["trim"]();
  if (_0x24fa0e) {
    const _0x4ed4c8 = _0x5693e0["find"]((_0xde84f8) => normName(_0xde84f8["name"]) === normName(_0x24fa0e));
    if (_0x4ed4c8) return _0x4ed4c8;
    const _0x1f0548 = normName(localTypeName(_0x24fa0e)), _0x2c16bf = _0x5693e0["find"]((_0x21b552) => normName(localTypeName(_0x21b552["name"])) === _0x1f0548);
    if (_0x2c16bf) return _0x2c16bf;
  }
  return _0x5693e0[0];
}
function pickJsonOutput(_0x1c2dd6) {
  const _0x3005df = ["application/geo+json", "application/json;subtype=geojson", "application/json", "geojson", "json", "esrigeojson", "geojson+gzip", "geojson+zip"], _0x30b01d = _0x1c2dd6["map"]((_0x46b1e0) => _0x46b1e0["toLowerCase"]()["replace"](/\s+/g, ""));
  for (const _0x1df3c5 of _0x3005df) {
    const _0x27f974 = _0x30b01d["findIndex"]((_0x36302f) => _0x36302f === _0x1df3c5 || _0x36302f["includes"](_0x1df3c5));
    if (_0x27f974 >= 0) return _0x1c2dd6[_0x27f974] ?? null;
  }
  return null;
}
function buildWfsGetFeaturePlan(_0x32decf) {
  const _0x52341f = resolveWfsFeatureType(_0x32decf["typeNameHint"], _0x32decf["caps"]["featureTypes"]), _0x5a0db6 = _0x32decf["version"] || _0x32decf["caps"]["version"] || "2.0.0", _0x484e39 = _0x32decf["srsName"] || _0x52341f["defaultCRS"] || _0x52341f["defaultSRS"] || "EPSG:4326", _0xad0c56 = _0x32decf["outputFormat"] || pickJsonOutput(_0x52341f["outputFormats"] || []) || pickJsonOutput(_0x32decf["caps"]["outputFormats"]), _0x40f67e = _0x32decf["maxFeatures"] ?? 5e3;
  return { "version": _0x5a0db6, "typeName": _0x52341f["name"], "srsName": _0x484e39, "jsonOutputFormat": _0xad0c56, "maxFeatures": _0x40f67e };
}
function appendWfsGetFeatureParams(_0x1360c3, _0x3ad8aa, _0x49e949) {
  _0x1360c3["set"]("service", "WFS"), _0x1360c3["set"]("request", "GetFeature"), _0x1360c3["set"]("version", _0x3ad8aa["version"]);
  const _0x500dfc = _0x3ad8aa["version"]["startsWith"]("2.");
  _0x1360c3["set"](_0x500dfc ? "typeNames" : "typeName", _0x3ad8aa["typeName"]), _0x1360c3["set"]("srsName", _0x3ad8aa["srsName"]);
  _0x49e949 && _0x1360c3["set"]("outputFormat", _0x49e949);
  const _0x10b8d9 = _0x500dfc ? "count" : "maxFeatures";
  _0x1360c3["set"](_0x10b8d9, String(_0x3ad8aa["maxFeatures"]));
}
async function getCapabilities(_0x96dc65, _0x253d98, _0x275021) {
  const _0x2f150d = _0x275021 == null ? void 0 : _0x275021["mergeApiKeyHeader"](_0x275021["buildAuthHeaders"](_0x253d98), _0x96dc65), _0x996953 = await fetch(_0x96dc65, _0x2f150d ? { "headers": _0x2f150d } : void 0);
  if (!_0x996953["ok"]) throw new OgcRequestError("OGC_CAPABILITIES_REQUEST_FAILED", "GetCapabilities isteği başarısız: " + _0x996953["status"] + " " + _0x996953["statusText"]);
  const _0x13916e = await _0x996953["text"](), _0x55c1d9 = new DOMParser()["parseFromString"](_0x13916e, "application/xml");
  if (_0x55c1d9["getElementsByTagName"]("parsererror")["length"] > 0) throw new OgcRequestError("OGC_SERVICE_DISCOVERY_PARSE_FAILED", "GetCapabilities yanıtı XML olarak ayrıştırılamadı.");
  return _0x55c1d9;
}
function parseWmsStyles(_0x45c6ee, _0x148a53) {
  var _a2, _b, _c, _d;
  const _0x38f542 = elementsByLocalName(_0x45c6ee, "Layer")["find"]((_0x31453c) => {
    var _a3, _b2;
    return ((_b2 = (_a3 = childByLocalName(_0x31453c, "Name")) == null ? void 0 : _a3["textContent"]) == null ? void 0 : _b2["trim"]()) === _0x148a53;
  });
  if (!_0x38f542) return [];
  const _0xa54cfb = [];
  for (const _0x24612a of Array["from"](_0x38f542["children"])) {
    if (_0x24612a["localName"] !== "Style") continue;
    const _0x2cad06 = (_b = (_a2 = childByLocalName(_0x24612a, "Name")) == null ? void 0 : _a2["textContent"]) == null ? void 0 : _b["trim"]();
    if (!_0x2cad06) continue;
    const _0x12da17 = ((_d = (_c = childByLocalName(_0x24612a, "Title")) == null ? void 0 : _c["textContent"]) == null ? void 0 : _d["trim"]()) ?? _0x2cad06;
    _0xa54cfb["push"]({ "name": _0x2cad06, "title": _0x12da17 });
  }
  return _0xa54cfb;
}
function parseWmtsStyles(_0x18824b, _0x227482) {
  var _a2, _b, _c, _d, _e;
  const _0x2bc1a1 = elementsByLocalName(_0x18824b, "Layer")["find"]((_0x3ed15c) => {
    var _a3, _b2;
    return ((_b2 = (_a3 = childByLocalName(_0x3ed15c, "Identifier")) == null ? void 0 : _a3["textContent"]) == null ? void 0 : _b2["trim"]()) === _0x227482;
  });
  if (!_0x2bc1a1) return [];
  const _0x2f2bc4 = [];
  for (const _0x36520e of Array["from"](_0x2bc1a1["children"])) {
    if (_0x36520e["localName"] !== "Style") continue;
    const _0x2d3f4f = (_b = (_a2 = childByLocalName(_0x36520e, "Identifier")) == null ? void 0 : _a2["textContent"]) == null ? void 0 : _b["trim"]();
    if (!_0x2d3f4f) continue;
    const _0x71a3da = ((_d = (_c = childByLocalName(_0x36520e, "Title")) == null ? void 0 : _c["textContent"]) == null ? void 0 : _d["trim"]()) ?? _0x2d3f4f, _0x3e9623 = ((_e = childByLocalName(_0x36520e, "LegendURL")) == null ? void 0 : _e["getAttribute"]("xlink:href")) ?? "", _0x351409 = _0x36520e["getAttribute"]("isDefault") === "true";
    _0x2f2bc4["push"]({ "name": _0x2d3f4f, "title": _0x71a3da, "legendUrl": _0x3e9623, "isDefault": _0x351409 });
  }
  return _0x2f2bc4["sort"]((_0x4a21d7, _0x512ff6) => Number(_0x512ff6["isDefault"]) - Number(_0x4a21d7["isDefault"])), _0x2f2bc4["map"]((_0x4b3b36) => ({ "name": _0x4b3b36["name"], "title": _0x4b3b36["title"], "legendUrl": _0x4b3b36["legendUrl"] }));
}
function buildCapabilitiesUrl(_0x3b52b9, _0x226405, _0x3748b5) {
  const _0x1aebcd = new URL(_0x3b52b9);
  return _0x1aebcd["searchParams"]["set"]("SERVICE", _0x226405), _0x1aebcd["searchParams"]["set"]("REQUEST", "GetCapabilities"), _0x1aebcd["searchParams"]["set"]("VERSION", _0x3748b5), _0x1aebcd["toString"]();
}
function elementsByLocalName(_0x1706c0, _0x4cb688) {
  return Array["from"](_0x1706c0["getElementsByTagNameNS"]("*", _0x4cb688));
}
function childByLocalName(_0x423bb4, _0x16f7eb) {
  return Array["from"](_0x423bb4["children"])["find"]((_0x302641) => _0x302641["localName"] === _0x16f7eb);
}
function parseWmsGeographicBoundingBox(_0x10b018) {
  var _a2, _b, _c, _d;
  const _0x563d5f = childByLocalName(_0x10b018, "EX_GeographicBoundingBox");
  if (_0x563d5f) {
    const _0x4da4e2 = (_a2 = childByLocalName(_0x563d5f, "westBoundLongitude")) == null ? void 0 : _a2["textContent"], _0x2f144f = (_b = childByLocalName(_0x563d5f, "eastBoundLongitude")) == null ? void 0 : _b["textContent"], _0x2e53f0 = (_c = childByLocalName(_0x563d5f, "southBoundLatitude")) == null ? void 0 : _c["textContent"], _0x3063e2 = (_d = childByLocalName(_0x563d5f, "northBoundLatitude")) == null ? void 0 : _d["textContent"];
    if (_0x4da4e2 && _0x2f144f && _0x2e53f0 && _0x3063e2) {
      const _0x58c212 = { "west": Number(_0x4da4e2), "south": Number(_0x2e53f0), "east": Number(_0x2f144f), "north": Number(_0x3063e2) };
      if (Object["values"](_0x58c212)["every"](Number["isFinite"])) return _0x58c212;
    }
  }
  const _0x1e6187 = childByLocalName(_0x10b018, "LatLonBoundingBox");
  if (_0x1e6187) {
    const _0x2bca35 = { "west": Number(_0x1e6187["getAttribute"]("minx")), "south": Number(_0x1e6187["getAttribute"]("miny")), "east": Number(_0x1e6187["getAttribute"]("maxx")), "north": Number(_0x1e6187["getAttribute"]("maxy")) };
    if (Object["values"](_0x2bca35)["every"](Number["isFinite"])) return _0x2bca35;
  }
  return void 0;
}
function parseWmsCapabilities(_0x5c6969) {
  var _a2;
  const _0x438a0c = [];
  for (const _0x4a3997 of elementsByLocalName(_0x5c6969, "Layer")) {
    const _0x492321 = childByLocalName(_0x4a3997, "Name");
    if (!(_0x492321 == null ? void 0 : _0x492321["textContent"])) continue;
    const _0x5d4bbf = childByLocalName(_0x4a3997, "Title"), _0x229249 = parseWmsGeographicBoundingBox(_0x4a3997);
    _0x438a0c["push"]({ "identifier": _0x492321["textContent"]["trim"](), "title": ((_a2 = _0x5d4bbf == null ? void 0 : _0x5d4bbf["textContent"]) == null ? void 0 : _a2["trim"]()) || _0x492321["textContent"]["trim"](), ..._0x229249 && { "geographicBoundingBox": _0x229249 } });
  }
  return _0x438a0c;
}
function parseWmsTiffFormat(_0x135436) {
  const _0x15fe9a = elementsByLocalName(_0x135436, "GetMap")[0];
  if (!_0x15fe9a) return void 0;
  const _0x165509 = new Set(elementsByLocalName(_0x15fe9a, "Format")["map"]((_0x43fd58) => {
    var _a2;
    return (_a2 = _0x43fd58["textContent"]) == null ? void 0 : _a2["trim"]()["toLowerCase"]();
  })["filter"]((_0x44720) => !!_0x44720));
  if (_0x165509["has"]("image/geotiff")) return "image/geotiff";
  if (_0x165509["has"]("image/tiff")) return "image/tiff";
  return void 0;
}
function parseWcsTiffFormat(_0x226128) {
  const _0x58b5ec = new Set(elementsByLocalName(_0x226128, "formatSupported")["map"]((_0x5512ec) => {
    var _a2;
    return (_a2 = _0x5512ec["textContent"]) == null ? void 0 : _a2["trim"]()["toLowerCase"]();
  })["filter"]((_0x4de2ea) => !!_0x4de2ea));
  if (_0x58b5ec["has"]("image/geotiff")) return "image/geotiff";
  if (_0x58b5ec["has"]("image/tiff")) return "image/tiff";
  return void 0;
}
function parseWmtsCapabilities(_0x48f826) {
  var _a2;
  const _0x203653 = [];
  for (const _0x195039 of elementsByLocalName(_0x48f826, "Layer")) {
    const _0x42f656 = childByLocalName(_0x195039, "Identifier");
    if (!(_0x42f656 == null ? void 0 : _0x42f656["textContent"])) continue;
    const _0x4a3af6 = childByLocalName(_0x195039, "Title"), _0x5c4b98 = childByLocalName(_0x195039, "TileMatrixSetLink"), _0x5e2544 = _0x5c4b98 ? childByLocalName(_0x5c4b98, "TileMatrixSet") : void 0;
    _0x203653["push"]({ "identifier": _0x42f656["textContent"]["trim"](), "title": ((_a2 = _0x4a3af6 == null ? void 0 : _0x4a3af6["textContent"]) == null ? void 0 : _a2["trim"]()) || _0x42f656["textContent"]["trim"](), ...(_0x5e2544 == null ? void 0 : _0x5e2544["textContent"]) && { "tileMatrixSetID": _0x5e2544["textContent"]["trim"]() } });
  }
  return _0x203653;
}
function parseWfsCapabilities(_0x3577d7) {
  var _a2;
  const _0x432815 = [];
  for (const _0x19d635 of elementsByLocalName(_0x3577d7, "FeatureType")) {
    const _0x3a12f6 = childByLocalName(_0x19d635, "Name");
    if (!(_0x3a12f6 == null ? void 0 : _0x3a12f6["textContent"])) continue;
    const _0x106122 = childByLocalName(_0x19d635, "Title");
    _0x432815["push"]({ "identifier": _0x3a12f6["textContent"]["trim"](), "title": ((_a2 = _0x106122 == null ? void 0 : _0x106122["textContent"]) == null ? void 0 : _a2["trim"]()) || _0x3a12f6["textContent"]["trim"]() });
  }
  return _0x432815;
}
function parseWcsCapabilities(_0x137c9d) {
  var _a2, _b;
  const _0x36eb49 = [];
  for (const _0x1eabd6 of elementsByLocalName(_0x137c9d, "CoverageSummary")) {
    const _0x55b886 = childByLocalName(_0x1eabd6, "CoverageId") ?? childByLocalName(_0x1eabd6, "Identifier");
    if (!(_0x55b886 == null ? void 0 : _0x55b886["textContent"])) continue;
    const _0x47cdb7 = childByLocalName(_0x1eabd6, "Title");
    _0x36eb49["push"]({ "identifier": _0x55b886["textContent"]["trim"](), "title": ((_a2 = _0x47cdb7 == null ? void 0 : _0x47cdb7["textContent"]) == null ? void 0 : _a2["trim"]()) || _0x55b886["textContent"]["trim"]() });
  }
  if (_0x36eb49["length"] > 0) return _0x36eb49;
  for (const _0x26aefa of elementsByLocalName(_0x137c9d, "CoverageOfferingBrief")) {
    const _0x20d350 = childByLocalName(_0x26aefa, "name");
    if (!(_0x20d350 == null ? void 0 : _0x20d350["textContent"])) continue;
    const _0x25b15a = childByLocalName(_0x26aefa, "label");
    _0x36eb49["push"]({ "identifier": _0x20d350["textContent"]["trim"](), "title": ((_b = _0x25b15a == null ? void 0 : _0x25b15a["textContent"]) == null ? void 0 : _b["trim"]()) || _0x20d350["textContent"]["trim"]() });
  }
  return _0x36eb49;
}
async function parseWcsCoverageEnvelope(_0x3a2409) {
  var _a2, _b, _c, _d;
  const _0x4f2095 = childByLocalName(_0x3a2409, "boundedBy"), _0x11d302 = _0x4f2095 ? childByLocalName(_0x4f2095, "Envelope") : void 0;
  if (!_0x11d302) return void 0;
  const _0x564ee9 = (_b = (_a2 = childByLocalName(_0x11d302, "lowerCorner")) == null ? void 0 : _a2["textContent"]) == null ? void 0 : _b["trim"](), _0x3c4920 = (_d = (_c = childByLocalName(_0x11d302, "upperCorner")) == null ? void 0 : _c["textContent"]) == null ? void 0 : _d["trim"]();
  if (!_0x564ee9 || !_0x3c4920) return void 0;
  const _0x148efb = _0x564ee9["split"](/\s+/)["map"](Number), _0x284ace = _0x3c4920["split"](/\s+/)["map"](Number);
  if (_0x148efb["length"] < 2 || _0x284ace["length"] < 2) return void 0;
  if (![..._0x148efb, ..._0x284ace]["every"](Number["isFinite"])) return void 0;
  const _0x4de59b = (_0x11d302["getAttribute"]("axisLabels") ?? "")["trim"]()["toLowerCase"](), _0x158c84 = (_0x11d302["getAttribute"]("uomLabels") ?? "")["toLowerCase"]();
  if (_0x158c84["includes"]("deg")) {
    const _0x5f12d8 = _0x4de59b["startsWith"]("lat");
    return _0x5f12d8 ? { "south": _0x148efb[0], "west": _0x148efb[1], "north": _0x284ace[0], "east": _0x284ace[1] } : { "west": _0x148efb[0], "south": _0x148efb[1], "east": _0x284ace[0], "north": _0x284ace[1] };
  }
  const _0x5d2531 = _0x11d302["getAttribute"]("srsName") ?? "";
  return resolveProjectedEnvelope(_0x5d2531, _0x4de59b, _0x148efb, _0x284ace);
}
async function resolveProjectedEnvelope(_0x147e10, _0x8e217d, _0x3f6cdf, _0x206ad6) {
  const _0x4102fd = extractEpsgCode(_0x147e10);
  if (!_0x4102fd) return void 0;
  const _0x35b09a = await ensureProj4Def(_0x4102fd);
  if (!_0x35b09a) return void 0;
  try {
    const _0x2b7df7 = _0x8e217d["startsWith"]("y") || _0x8e217d["startsWith"]("n"), _0x4e5fc3 = (_0x46cb9e) => _0x2b7df7 ? [_0x46cb9e[1], _0x46cb9e[0]] : [_0x46cb9e[0], _0x46cb9e[1]], [_0x448d03, _0x393bda] = _0x4e5fc3(_0x3f6cdf), [_0x1b15b0, _0x15a3b7] = _0x4e5fc3(_0x206ad6), _0x51103f = [[_0x448d03, _0x393bda], [_0x1b15b0, _0x15a3b7], [_0x448d03, _0x15a3b7], [_0x1b15b0, _0x393bda]], _0x30bbdc = "EPSG:" + _0x4102fd, _0x872693 = _0x51103f["map"]((_0x253317) => _0x35b09a(_0x30bbdc, "EPSG:4326", _0x253317)), _0x12e1d4 = _0x872693["map"]((_0x3da436) => _0x3da436[0]), _0x1f34a5 = _0x872693["map"]((_0x27b21c) => _0x27b21c[1]), _0x5060ad = { "west": Math["min"](..._0x12e1d4), "east": Math["max"](..._0x12e1d4), "south": Math["min"](..._0x1f34a5), "north": Math["max"](..._0x1f34a5) };
    if (!Object["values"](_0x5060ad)["every"](Number["isFinite"])) return void 0;
    return _0x5060ad;
  } catch {
    return void 0;
  }
}
async function fetchWcsCoverageExtents(_0x45fe53, _0x178b27, _0x4bbbbe, _0x230431) {
  var _a2;
  const _0x635f7e = /* @__PURE__ */ new Map();
  if (_0x178b27["length"] === 0) return _0x635f7e;
  try {
    const _0x462152 = new URL(_0x45fe53);
    _0x462152["searchParams"]["set"]("SERVICE", "WCS"), _0x462152["searchParams"]["set"]("VERSION", "2.0.1"), _0x462152["searchParams"]["set"]("REQUEST", "DescribeCoverage"), _0x462152["searchParams"]["set"]("COVERAGEID", _0x178b27["join"](","));
    const _0x3fa895 = await getCapabilities(_0x462152["toString"](), _0x4bbbbe, _0x230431);
    for (const _0x4e49b9 of elementsByLocalName(_0x3fa895, "CoverageDescription")) {
      const _0x1d1fa4 = childByLocalName(_0x4e49b9, "CoverageId"), _0x59253b = (_a2 = _0x1d1fa4 == null ? void 0 : _0x1d1fa4["textContent"]) == null ? void 0 : _a2["trim"]();
      if (!_0x59253b) continue;
      const _0x7e9dac = await parseWcsCoverageEnvelope(_0x4e49b9);
      if (_0x7e9dac) _0x635f7e["set"](_0x59253b, _0x7e9dac);
    }
  } catch {
  }
  return _0x635f7e;
}
function wcsRectangleFor(_0x406266) {
  const _0x1a5feb = _0x406266["geographicBoundingBox"];
  if (!_0x1a5feb) return void 0;
  return Rectangle["fromDegrees"](_0x1a5feb["west"], _0x1a5feb["south"], _0x1a5feb["east"], _0x1a5feb["north"]);
}
function parseCapabilities(_0x4d814b, _0x5841da) {
  switch (_0x4d814b) {
    case "WMS":
      return parseWmsCapabilities(_0x5841da);
    case "WMTS":
      return parseWmtsCapabilities(_0x5841da);
    case "WFS":
      return parseWfsCapabilities(_0x5841da);
    case "WCS":
      return parseWcsCapabilities(_0x5841da);
    default:
      return [];
  }
}
function detectServiceType(_0x2d2097) {
  const _0x146551 = _0x2d2097["documentElement"], _0x115ea9 = _0x146551["localName"], _0x4bc33a = _0x146551["namespaceURI"] ?? "";
  if (_0x115ea9 === "WMS_Capabilities" || _0x115ea9 === "WMT_MS_Capabilities" || _0x4bc33a["includes"]("/wms")) return "WMS";
  if (_0x115ea9 === "WFS_Capabilities" || _0x4bc33a["includes"]("/wfs")) return "WFS";
  if (_0x4bc33a["includes"]("/wmts")) return "WMTS";
  if (_0x4bc33a["includes"]("/wcs") || _0x115ea9 === "WCS_Capabilities") return "WCS";
  return void 0;
}
const _OgcLayerFactory = class _OgcLayerFactory {
  constructor(_0x486a13, _0x5767d1) {
    this["viewer"] = _0x486a13, this["deps"] = _0x5767d1, this["serviceLayerOptions"] = /* @__PURE__ */ new Map();
  }
  ["getServiceOptions"](_0x2a0d72) {
    return this["serviceLayerOptions"]["get"](_0x2a0d72);
  }
  ["deleteServiceOptions"](_0x248a22) {
    this["serviceLayerOptions"]["delete"](_0x248a22);
  }
  ["buildWmsProvider"](_0x359e09) {
    var _a2, _b;
    const _0x57755d = this["deps"]["apiKeyPolicy"]["resolveOgcProxyUrl"]("wms", _0x359e09["url"]), _0x5a0cb7 = (_a2 = _0x359e09["layers"]) == null ? void 0 : _a2["trim"]();
    if (!_0x5a0cb7) throw new LayerOperationError("LAYER_WMS_LAYERS_EMPTY", "WMS katmani eklenemedi: layers (ogcLayerName) bos — id=" + _0x359e09["id"]);
    const _0x1e64e6 = this["deps"]["apiKeyPolicy"]["mergeApiKeyHeader"](this["deps"]["apiKeyPolicy"]["buildAuthHeaders"](_0x359e09["authToken"]), _0x57755d), _0x4b02ed = _0x359e09["version"] ?? "1.3.0", _0x14fa8f = new WebMapServiceImageryProvider({ "url": _0x1e64e6 ? new Resource({ "url": _0x57755d, "headers": _0x1e64e6 }) : _0x57755d, "layers": _0x5a0cb7, "parameters": { "service": "WMS", "version": _0x4b02ed, "request": "GetMap", "transparent": "true", "format": "image/png", ..._0x359e09["parameters"] }, "getFeatureInfoParameters": { "version": _0x4b02ed, "styles": ((_b = _0x359e09["parameters"]) == null ? void 0 : _b["styles"]) ?? "" }, "getFeatureInfoFormats": [new GetFeatureInfoFormat("json"), new GetFeatureInfoFormat("xml", "application/vnd.ogc.gml"), new GetFeatureInfoFormat("xml", "text/xml"), new GetFeatureInfoFormat("html")], ..._0x359e09["rectangle"] !== void 0 && { "rectangle": _0x359e09["rectangle"] }, ..._0x359e09["minimumLevel"] !== void 0 && { "minimumLevel": _0x359e09["minimumLevel"] }, ..._0x359e09["maximumLevel"] !== void 0 && { "maximumLevel": _0x359e09["maximumLevel"] }, ..._0x359e09["tileWidth"] !== void 0 && { "tileWidth": _0x359e09["tileWidth"] }, ..._0x359e09["tileHeight"] !== void 0 && { "tileHeight": _0x359e09["tileHeight"] } });
    return _0x14fa8f;
  }
  ["addWMS"](_0x370c8d) {
    const _0x339568 = this["buildWmsProvider"](_0x370c8d), _0x2dc00e = this["viewer"]["imageryLayers"]["addImageryProvider"](_0x339568), _0x36efb6 = this["deps"]["register"](_0x370c8d["id"], _0x370c8d["title"], "WMS", _0x2dc00e, ![]);
    return this["serviceLayerOptions"]["set"](_0x370c8d["id"], _0x370c8d), Promise["resolve"](_0x36efb6);
  }
  ["buildWmtsProvider"](_0x4413c4) {
    const _0xb06476 = this["deps"]["apiKeyPolicy"]["resolveOgcProxyUrl"]("wmts", _0x4413c4["url"]), _0x591355 = this["deps"]["apiKeyPolicy"]["mergeApiKeyHeader"](this["deps"]["apiKeyPolicy"]["buildAuthHeaders"](_0x4413c4["authToken"]), _0xb06476);
    return new WebMapTileServiceImageryProvider({ "url": _0x591355 ? new Resource({ "url": _0xb06476, "headers": _0x591355 }) : _0xb06476, "layer": _0x4413c4["layer"], "style": _0x4413c4["style"] ?? "default", "tileMatrixSetID": _0x4413c4["tileMatrixSetID"], "format": _0x4413c4["format"] ?? "image/png", "tilingScheme": new WebMercatorTilingScheme(), ..._0x4413c4["tileWidth"] !== void 0 && { "tileWidth": _0x4413c4["tileWidth"] }, ..._0x4413c4["tileHeight"] !== void 0 && { "tileHeight": _0x4413c4["tileHeight"] }, ..._0x4413c4["minimumLevel"] !== void 0 && { "minimumLevel": _0x4413c4["minimumLevel"] }, ..._0x4413c4["maximumLevel"] !== void 0 && { "maximumLevel": _0x4413c4["maximumLevel"] }, ..._0x4413c4["rectangle"] !== void 0 && { "rectangle": _0x4413c4["rectangle"] } });
  }
  ["addWMTS"](_0x3b60ad) {
    const _0x2a1bee = this["buildWmtsProvider"](_0x3b60ad), _0xeeb2ca = this["viewer"]["imageryLayers"]["addImageryProvider"](_0x2a1bee), _0x1867a8 = this["deps"]["register"](_0x3b60ad["id"], _0x3b60ad["title"], "WMTS", _0xeeb2ca, ![]);
    return this["serviceLayerOptions"]["set"](_0x3b60ad["id"], _0x3b60ad), Promise["resolve"](_0x1867a8);
  }
  async ["getWmsAvailableStyles"](_0x2cbd70) {
    const _0x2fc372 = this["requireServiceOptions"](_0x2cbd70, "WMS"), _0x5da742 = _0x2fc372["version"] ?? "1.3.0", _0x202fa = await this["getCapabilitiesDocument"](_0x2fc372["url"], "WMS", _0x5da742, _0x2fc372["authToken"]);
    return parseWmsStyles(_0x202fa, _0x2fc372["layers"])["map"]((_0x3b6bd5) => ({ ..._0x3b6bd5, "legendUrl": this["getWmsLegendGraphicUrl"](_0x2cbd70, _0x3b6bd5["name"]) }));
  }
  async ["setWmsStyle"](_0x2b967d, _0x4f66f1) {
    const _0x2ae82b = this["requireServiceOptions"](_0x2b967d, "WMS"), _0x363714 = { ..._0x2ae82b, "parameters": { ..._0x2ae82b["parameters"], "STYLES": _0x4f66f1 } };
    await this["rebuildImageryLayer"](_0x2b967d, () => this["buildWmsProvider"](_0x363714)), this["serviceLayerOptions"]["set"](_0x2b967d, _0x363714);
  }
  ["getWmsLegendGraphicUrl"](_0x3f391e, _0x1cba4e) {
    const _0x8f9914 = this["requireServiceOptions"](_0x3f391e, "WMS"), _0x6776c5 = new URLSearchParams({ "service": "WMS", "version": _0x8f9914["version"] ?? "1.3.0", "request": "GetLegendGraphic", "format": "image/png", "layer": _0x8f9914["layers"], "sld_version": "1.1.0", ..._0x1cba4e !== void 0 && _0x1cba4e !== "" ? { "style": _0x1cba4e } : {} }), _0xe1f257 = this["deps"]["apiKeyPolicy"]["resolveOgcProxyUrl"]("wms", _0x8f9914["url"]);
    return this["deps"]["apiKeyPolicy"]["attachApiKeyToUrl"]("" + _0xe1f257 + (_0xe1f257["includes"]("?") ? "&" : "?") + _0x6776c5["toString"]());
  }
  async ["getWmtsAvailableStyles"](_0x29e9f3) {
    const _0x590e7e = this["requireServiceOptions"](_0x29e9f3, "WMTS"), _0x2a3a49 = await this["getCapabilitiesDocument"](_0x590e7e["url"], "WMTS", "1.0.0", _0x590e7e["authToken"]), _0x8906cb = parseWmtsStyles(_0x2a3a49, _0x590e7e["layer"]);
    return _0x8906cb["map"]((_0x439538) => ({ ..._0x439538, "legendUrl": this["deps"]["apiKeyPolicy"]["attachApiKeyToUrl"](_0x439538["legendUrl"]) }));
  }
  async ["setWmtsStyle"](_0x365b02, _0x2cb66d) {
    const _0xeb57fb = this["requireServiceOptions"](_0x365b02, "WMTS"), _0x14601f = { ..._0xeb57fb, "style": _0x2cb66d };
    await this["rebuildImageryLayer"](_0x365b02, () => this["buildWmtsProvider"](_0x14601f)), this["serviceLayerOptions"]["set"](_0x365b02, _0x14601f);
  }
  async ["addWFS"](_0x1a3115) {
    const _0x2d6596 = this["deps"]["apiKeyPolicy"]["resolveOgcProxyUrl"]("wfs", _0x1a3115["url"]), _0x4a6f11 = {};
    _0x1a3115["authToken"] !== void 0 && (_0x4a6f11["headers"] = { "Authorization": "Bearer " + _0x1a3115["authToken"] });
    const _0x1ff4b5 = this["deps"]["apiKeyPolicy"]["mergeApiKeyHeader"](_0x4a6f11["headers"], _0x2d6596);
    if (_0x1ff4b5 !== void 0) _0x4a6f11["headers"] = _0x1ff4b5;
    const _0x356bb7 = { ..._0x1a3115, "url": _0x2d6596 }, _0x211650 = await fetchWfsCapabilities(_0x2d6596, _0x4a6f11), _0x21a4f9 = { "typeNameHint": _0x1a3115["typeName"], "caps": _0x211650 };
    if (_0x1a3115["version"] !== void 0) _0x21a4f9["version"] = _0x1a3115["version"];
    if (_0x1a3115["srsName"] !== void 0) _0x21a4f9["srsName"] = _0x1a3115["srsName"];
    _0x1a3115["outputFormat"] !== void 0 && (_0x21a4f9["outputFormat"] = _0x1a3115["outputFormat"]);
    _0x1a3115["maxFeatures"] !== void 0 ? _0x21a4f9["maxFeatures"] = _0x1a3115["maxFeatures"] : _0x21a4f9["maxFeatures"] = _OgcLayerFactory["TEMP_WFS_UNLIMITED_MAX_FEATURES"];
    const _0x593b1f = buildWfsGetFeaturePlan(_0x21a4f9);
    let _0x8dd9fe;
    try {
      _0x8dd9fe = await this["fetchWfsGeoJson"](_0x356bb7, _0x4a6f11, _0x593b1f);
    } catch (_0x28ec6a) {
      try {
        _0x8dd9fe = await this["fetchWfsGml"](_0x356bb7, _0x4a6f11, _0x593b1f);
      } catch (_0x2c46be) {
        _0x2c46be instanceof Error && (_0x2c46be["cause"] = _0x28ec6a);
        throw _0x2c46be;
      }
    }
    const _0x1a2fcd = _0x8dd9fe !== null && typeof _0x8dd9fe === "object" ? _0x8dd9fe["features"] : void 0;
    return Array["isArray"](_0x1a2fcd) ? _0x1a2fcd["length"] : _0x593b1f["maxFeatures"], loadVectorGeoJsonLayer(this["viewer"], this["deps"], _0x8dd9fe, { "id": _0x1a3115["id"], "title": _0x1a3115["title"], "layerType": "WFS", "clampToGround": _0x1a3115["clampToGround"] ?? ![] }, (_0xd1653c) => {
    });
  }
  async ["fetchWfsHitsCount"](_0x42b554, _0x3c463e, _0x1239fb) {
    if (!_0x1239fb["version"]["startsWith"]("2.") && !_0x1239fb["version"]["startsWith"]("1.1")) return void 0;
    const _0x11ca5e = new URLSearchParams();
    appendWfsGetFeatureParams(_0x11ca5e, _0x1239fb), _0x11ca5e["delete"]("count"), _0x11ca5e["delete"]("maxFeatures"), _0x11ca5e["set"]("resultType", "hits");
    let _0x48f1e7;
    try {
      _0x48f1e7 = await fetch("" + _0x42b554["url"] + (_0x42b554["url"]["includes"]("?") ? "&" : "?") + _0x11ca5e["toString"](), _0x3c463e);
    } catch {
      return void 0;
    }
    if (!_0x48f1e7["ok"]) return void 0;
    const _0x45f855 = decodeTextBuffer(await _0x48f1e7["arrayBuffer"]());
    if (isOgcExceptionXml(_0x45f855)) return void 0;
    const _0x5d49dc = _0x45f855["trimStart"]();
    if (_0x5d49dc["startsWith"]("{")) try {
      const _0x2ab513 = JSON["parse"](_0x5d49dc), _0x2b8150 = _0x2ab513["numberMatched"] ?? _0x2ab513["totalFeatures"];
      return typeof _0x2b8150 === "number" ? _0x2b8150 : void 0;
    } catch {
      return void 0;
    }
    try {
      const _0x2af578 = new DOMParser()["parseFromString"](_0x45f855, "application/xml")["documentElement"], _0x5436a5 = _0x2af578["getAttribute"]("numberMatched") ?? _0x2af578["getAttribute"]("numberOfFeatures") ?? _0x2af578["getAttribute"]("numberReturned");
      if (!_0x5436a5) return void 0;
      const _0x969562 = Number(_0x5436a5);
      return Number["isFinite"](_0x969562) ? _0x969562 : void 0;
    } catch {
      return void 0;
    }
  }
  async ["fetchWfsGeoJson"](_0xf1c92, _0x27b940, _0x58b01b) {
    const _0x4fef53 = _0x58b01b["jsonOutputFormat"];
    if (!_0x4fef53) throw new OgcRequestError("OGC_WFS_JSON_FORMAT_UNSUPPORTED", "WFS sunucusu JSON çıktı formatı ilan etmiyor.");
    const _0x50b3d6 = new URLSearchParams();
    appendWfsGetFeatureParams(_0x50b3d6, _0x58b01b, _0x4fef53);
    const _0x35a45e = await fetch("" + _0xf1c92["url"] + (_0xf1c92["url"]["includes"]("?") ? "&" : "?") + _0x50b3d6["toString"](), _0x27b940), _0x5c93f9 = decodeTextBuffer(await _0x35a45e["arrayBuffer"]());
    if (!_0x35a45e["ok"] || isOgcExceptionXml(_0x5c93f9) || !_0x5c93f9["trimStart"]()["startsWith"]("{")) throw new OgcRequestError("OGC_WFS_GEOJSON_REQUEST_FAILED", "WFS GeoJSON isteği başarısız: " + _0x35a45e["status"] + " " + _0x35a45e["statusText"]);
    return JSON["parse"](_0x5c93f9);
  }
  async ["fetchWfsGml"](_0x281fe3, _0x436f5b, _0x24073f) {
    const _0x18b3d3 = new URLSearchParams();
    appendWfsGetFeatureParams(_0x18b3d3, _0x24073f);
    const _0x3afc77 = await fetch("" + _0x281fe3["url"] + (_0x281fe3["url"]["includes"]("?") ? "&" : "?") + _0x18b3d3["toString"](), _0x436f5b);
    if (!_0x3afc77["ok"]) throw new OgcRequestError("OGC_WFS_REQUEST_FAILED", "WFS isteği başarısız: " + _0x3afc77["status"] + " " + _0x3afc77["statusText"]);
    const _0x507f5b = decodeTextBuffer(await _0x3afc77["arrayBuffer"]());
    if (isOgcExceptionXml(_0x507f5b)) throw new OgcRequestError("OGC_WFS_EXCEPTION", "WFS GetFeature OGC Exception döndü.");
    let _0x2bdd29, _0xbe9148;
    try {
      ({ default: _0x2bdd29 } = await import("ol/format/WFS.js")), { default: _0xbe9148 } = await import("ol/format/GeoJSON.js");
    } catch {
      throw new OgcRequestError("OGC_WFS_OL_PACKAGE_MISSING", 'WFS sunucusu GeoJSON çıktısı desteklemiyor; GML yanıtını okumak için "ol" paketi gereklidir: pnpm add ol');
    }
    const _0x4da8b2 = new _0x2bdd29({ "version": _0x24073f["version"] })["readFeatures"](_0x507f5b);
    return new _0xbe9148()["writeFeaturesObject"](_0x4da8b2, { "featureProjection": "EPSG:4326" });
  }
  async ["addWCS"](_0x185488) {
    const _0x31bd97 = this["deps"]["apiKeyPolicy"]["resolveOgcProxyUrl"]("wcs", _0x185488["url"]), _0x6f1705 = { "service": "WCS", "version": _0x185488["version"] ?? "2.0.1", "request": "GetCoverage", "coverageId": _0x185488["coverageId"], "format": _0x185488["format"] ?? "image/png" }, _0x4904da = this["deps"]["apiKeyPolicy"]["mergeApiKeyHeader"](this["deps"]["apiKeyPolicy"]["buildAuthHeaders"](_0x185488["authToken"]), _0x31bd97), _0x500536 = _0x185488["rectangle"] ?? Rectangle["fromDegrees"](-180, -90, 180, 90), _0x3d0bcd = async (_0x8cf2b4) => {
      const _0x10004c = { ..._0x6f1705 };
      if (_0x8cf2b4 !== void 0) _0x10004c["SCALESIZE"] = _0x8cf2b4;
      const _0x4c2a82 = _0x31bd97 + "?" + new URLSearchParams(_0x10004c)["toString"](), _0x2ae394 = await this["resolveWcsImageUrl"](_0x4c2a82, _0x4904da);
      try {
        return await SingleTileImageryProvider["fromUrl"](_0x2ae394, { "rectangle": _0x500536 });
      } finally {
        if (_0x2ae394["startsWith"]("blob:")) URL["revokeObjectURL"](_0x2ae394);
      }
    }, _0x3fa8bb = _0x185488["maxSize"] ?? 2048, _0x295d30 = _0x6f1705["version"]["startsWith"]("2.") && Number["isFinite"](_0x3fa8bb);
    let _0x15fd4a;
    if (!_0x295d30) _0x15fd4a = await _0x3d0bcd();
    else {
      const _0xa39107 = "http://www.opengis.net/def/axis/OGC/1/i(" + _0x3fa8bb + "),http://www.opengis.net/def/axis/OGC/1/j(" + _0x3fa8bb + ")";
      try {
        _0x15fd4a = await _0x3d0bcd(_0xa39107);
      } catch {
        _0x15fd4a = await _0x3d0bcd("x(" + _0x3fa8bb + "),y(" + _0x3fa8bb + ")");
      }
    }
    const _0x3dfbbd = this["viewer"]["imageryLayers"]["addImageryProvider"](_0x15fd4a);
    return this["serviceLayerOptions"]["set"](_0x185488["id"], _0x185488), this["deps"]["register"](_0x185488["id"], _0x185488["title"], "WCS", _0x3dfbbd, ![]);
  }
  async ["resolveWcsImageUrl"](_0x256f59, _0x4edc7d) {
    const _0x148192 = await fetch(_0x256f59, _0x4edc7d ? { "headers": _0x4edc7d } : void 0);
    if (!_0x148192["ok"]) throw new OgcRequestError("OGC_WCS_REQUEST_FAILED", "WCS isteği başarısız: " + _0x148192["status"] + " " + _0x148192["statusText"]);
    const _0x3dd716 = _0x148192["headers"]["get"]("content-type") ?? "", _0x4e10e9 = await _0x148192["arrayBuffer"](), _0x545c85 = /boundary="?([^";]+)"?/i["exec"](_0x3dd716);
    if (!_0x3dd716["includes"]("multipart/") || !_0x545c85) return URL["createObjectURL"](new Blob([_0x4e10e9], { "type": _0x3dd716 || "image/png" }));
    const _0x4c31b0 = extractMultipartImage(new Uint8Array(_0x4e10e9), _0x545c85[1]), _0x399159 = _0x4c31b0["bytes"]["buffer"]["slice"](_0x4c31b0["bytes"]["byteOffset"], _0x4c31b0["bytes"]["byteOffset"] + _0x4c31b0["bytes"]["byteLength"]);
    return URL["createObjectURL"](new Blob([_0x399159], { "type": _0x4c31b0["mimeType"] }));
  }
  ["addGeoTiff"](_0x172b07) {
    throw new LayerOperationError("LAYER_GEOTIFF_UNSUPPORTED", "GeoTIFF katmanı bu Cesium sürümünde (≥1.143) henüz desteklenmiyor. GeoTiffImageryProvider mevcut değil. geotiff.js ile özel provider gereklidir.");
  }
  ["requireServiceOptions"](_0x56df73, _0x3b9884) {
    const _0x22f9d0 = this["deps"]["requireLayer"](_0x56df73);
    if (_0x22f9d0["layerType"] !== _0x3b9884) throw new LayerOperationError("LAYER_TYPE_MISMATCH", "Katman " + _0x3b9884 + ' değil: "' + _0x56df73 + '" (' + _0x22f9d0["layerType"] + ")");
    const _0x39785b = this["serviceLayerOptions"]["get"](_0x56df73);
    if (_0x39785b === void 0) throw new LayerOperationError("LAYER_SERVICE_OPTIONS_NOT_FOUND", 'Katman için orijinal servis seçenekleri bulunamadı: "' + _0x56df73 + '"');
    return _0x39785b;
  }
  async ["rebuildImageryLayer"](_0x488465, _0x29dca4) {
    const _0x43fed1 = this["deps"]["requireLayer"](_0x488465);
    if (!(_0x43fed1["cesiumObject"] instanceof ImageryLayer)) throw new LayerOperationError("LAYER_NOT_RASTER", 'Katman raster (ImageryLayer) değil: "' + _0x488465 + '"');
    const _0x4741a1 = _0x43fed1["cesiumObject"], _0x4ee51d = this["viewer"]["imageryLayers"]["indexOf"](_0x4741a1), { show: _0x5ea5f4, alpha: _0xb9623a } = _0x4741a1, _0xd3308f = _0x29dca4(), _0x4b20b7 = new ImageryLayer(_0xd3308f, { "show": _0x5ea5f4, "alpha": _0xb9623a });
    this["viewer"]["imageryLayers"]["remove"](_0x4741a1, !![]), this["viewer"]["imageryLayers"]["add"](_0x4b20b7, _0x4ee51d), this["deps"]["setItem"](_0x488465, Object["freeze"]({ ..._0x43fed1, "cesiumObject": _0x4b20b7 }));
  }
  async ["getCapabilitiesDocument"](_0x22e0e1, _0x536f0e, _0x5a7b34, _0x2f2548) {
    const _0xf9a88b = this["deps"]["apiKeyPolicy"]["resolveOgcProxyUrl"](_0x536f0e["toLowerCase"](), _0x22e0e1), _0x1004ba = buildCapabilitiesUrl(_0xf9a88b, _0x536f0e, _0x5a7b34);
    return getCapabilities(_0x1004ba, _0x2f2548, this["deps"]["apiKeyPolicy"]);
  }
  async ["getWcsCoverageExtents"](_0x180429, _0x318fa8, _0x3ca477) {
    const _0xc93f75 = this["deps"]["apiKeyPolicy"]["resolveOgcProxyUrl"]("wcs", _0x180429);
    return fetchWcsCoverageExtents(_0xc93f75, _0x318fa8, _0x3ca477, this["deps"]["apiKeyPolicy"]);
  }
};
_OgcLayerFactory["TEMP_WFS_UNLIMITED_MAX_FEATURES"] = 1e6;
let OgcLayerFactory = _OgcLayerFactory;
class ShapeLayerBridge {
  constructor(_0x809535, _0x226cc3) {
    this["viewer"] = _0x809535, this["deps"] = _0x226cc3, this["drawnShapeCounters"] = /* @__PURE__ */ new Map();
  }
  ["deleteCounter"](_0x3e55fa) {
    this["drawnShapeCounters"]["delete"](_0x3e55fa);
  }
  async ["addDrawnShape"](_0x21c3ab, _0x2d6526, _0x14dfa1) {
    const _0xeaccbf = _0x14dfa1["entity"];
    this["viewer"]["entities"]["remove"](_0xeaccbf);
    const _0x12813a = (this["drawnShapeCounters"]["get"](_0x21c3ab) ?? 0) + 1;
    this["drawnShapeCounters"]["set"](_0x21c3ab, _0x12813a), _0xeaccbf["properties"] = buildDrawnShapeProperties(_0x14dfa1, _0x12813a);
    const _0xcf5001 = this["deps"]["getItem"](_0x21c3ab), _0x37ddeb = _0xcf5001 && "entities" in _0xcf5001["cesiumObject"] ? _0xcf5001["cesiumObject"] : new CustomDataSource(_0x2d6526), _0x3c963c = _0xcf5001 ? this["deps"]["getStyle"](_0x21c3ab) : void 0, _0x48e77c = (_0x3c963c == null ? void 0 : _0x3c963c["fill"]["mode"]) === "solid" ? Color["fromCssColorString"](_0x3c963c["fill"]["color"])["withAlpha"](_0x3c963c["fill"]["opacity"]) : Color["CYAN"]["withAlpha"](0.4), _0x5a5202 = (_0x3c963c == null ? void 0 : _0x3c963c["outline"]) ?? { "enabled": !![], "color": this["deps"]["defaultOutlineColorHex"], "width": 1 };
    this["deps"]["applyEntityStyle"](_0xeaccbf, _0x48e77c, _0x5a5202, !![]), _0x37ddeb["entities"]["add"](_0xeaccbf);
    _0xeaccbf["polygon"] !== void 0 && this["deps"]["addPolygonOutlineCompanion"](_0x37ddeb, _0xeaccbf, Color["fromCssColorString"](_0x5a5202["color"]), _0x5a5202["width"], ![]);
    if (_0xcf5001) return this["deps"]["tagEntities"](_0x37ddeb, _0x21c3ab), _0xcf5001;
    await this["viewer"]["dataSources"]["add"](_0x37ddeb);
    const _0x20847e = Color["CYAN"]["toCssHexString"](), _0x4b9232 = this["deps"]["register"](_0x21c3ab, _0x2d6526, "DRAWING", _0x37ddeb, ![], _0x20847e);
    return this["deps"]["recordInitialStyle"](_0x4b9232["id"], _0x20847e, 0.4, _0x5a5202), _0x4b9232;
  }
  async ["addMeasuredShape"](_0x179969, _0x2155b0, _0xa732d0) {
    const _0x5bd8b8 = _0xa732d0["entity"];
    this["viewer"]["entities"]["remove"](_0x5bd8b8);
    const _0x4ad50b = (this["drawnShapeCounters"]["get"](_0x179969) ?? 0) + 1;
    this["drawnShapeCounters"]["set"](_0x179969, _0x4ad50b), _0x5bd8b8["properties"] = buildMeasuredShapeProperties(_0xa732d0, _0x4ad50b);
    const _0x30a4f4 = this["deps"]["getItem"](_0x179969), _0x1e18a1 = _0x30a4f4 && "entities" in _0x30a4f4["cesiumObject"] ? _0x30a4f4["cesiumObject"] : new CustomDataSource(_0x2155b0), _0x36ec33 = _0x30a4f4 ? this["deps"]["getStyle"](_0x179969) : void 0, _0x190ded = (_0x36ec33 == null ? void 0 : _0x36ec33["fill"]["mode"]) === "solid" ? Color["fromCssColorString"](_0x36ec33["fill"]["color"])["withAlpha"](_0x36ec33["fill"]["opacity"]) : Color["CYAN"]["withAlpha"](0.4), _0xc0237d = (_0x36ec33 == null ? void 0 : _0x36ec33["outline"]) ?? { "enabled": !![], "color": this["deps"]["defaultOutlineColorHex"], "width": 1 };
    this["deps"]["applyEntityStyle"](_0x5bd8b8, _0x190ded, _0xc0237d, !![]), _0x1e18a1["entities"]["add"](_0x5bd8b8);
    _0x5bd8b8["polygon"] !== void 0 && this["deps"]["addPolygonOutlineCompanion"](_0x1e18a1, _0x5bd8b8, Color["fromCssColorString"](_0xc0237d["color"]), _0xc0237d["width"], ![]);
    if (_0x30a4f4) return this["deps"]["tagEntities"](_0x1e18a1, _0x179969), _0x30a4f4;
    await this["viewer"]["dataSources"]["add"](_0x1e18a1);
    const _0x642784 = Color["CYAN"]["toCssHexString"](), _0xb93479 = this["deps"]["register"](_0x179969, _0x2155b0, "MEASURE", _0x1e18a1, ![], _0x642784);
    return this["deps"]["recordInitialStyle"](_0xb93479["id"], _0x642784, 0.4, _0xc0237d), _0xb93479;
  }
  ["removeDrawnShape"](_0x45c844, _0xe0ee39) {
    const _0xee7cd3 = this["deps"]["getItem"](_0x45c844);
    if (!_0xee7cd3 || !("entities" in _0xee7cd3["cesiumObject"])) return;
    _0xee7cd3["cesiumObject"]["entities"]["removeById"](_0xe0ee39["id"] + "::outline"), _0xee7cd3["cesiumObject"]["entities"]["remove"](_0xe0ee39), _0xee7cd3["cesiumObject"]["entities"]["values"]["length"] === 0 && this["deps"]["removeLayer"](_0x45c844);
  }
}
const DRAWN_SHAPE_LABELS = { "point": "Nokta", "polyline": "Çizgi", "polygon": "Alan", "rectangle": "Dikdörtgen", "circle": "Daire", "freehand": "Serbest Çizim" };
function roundMeters(_0x18ba67) {
  return Math["round"](_0x18ba67 * 100) / 100;
}
function roundCoordinate(_0x281185) {
  return Math["round"](_0x281185 * 1e6) / 1e6;
}
function wktCoordinatePair(_0x196861) {
  return roundCoordinate(_0x196861[0]) + " " + roundCoordinate(_0x196861[1]);
}
function geometryToWkt(_0x1e279f) {
  switch (_0x1e279f["type"]) {
    case "Point": {
      const _0x57173a = _0x1e279f["coordinates"];
      return "POINT (" + wktCoordinatePair(_0x57173a) + ")";
    }
    case "LineString": {
      const _0x1b71be = _0x1e279f["coordinates"];
      return "LINESTRING (" + _0x1b71be["map"]((_0x4ad421) => wktCoordinatePair(_0x4ad421))["join"](", ") + ")";
    }
    case "Polygon": {
      const _0x254426 = _0x1e279f["coordinates"], _0xe50111 = _0x254426["map"]((_0x2988ef) => "(" + _0x2988ef["map"]((_0x4fb607) => wktCoordinatePair(_0x4fb607))["join"](", ") + ")")["join"](", ");
      return "POLYGON (" + _0xe50111 + ")";
    }
    default:
      return "";
  }
}
function buildDrawnShapeProperties(_0x110fce, _0x494f85) {
  const _0x490cba = { "id": _0x494f85, "sekil": DRAWN_SHAPE_LABELS[_0x110fce["tool"]] };
  if (_0x110fce["length"] !== void 0) _0x490cba["uzunluk_m"] = roundMeters(_0x110fce["length"]);
  if (_0x110fce["area"] !== void 0) _0x490cba["alan_m2"] = roundMeters(_0x110fce["area"]);
  if (_0x110fce["perimeter"] !== void 0) _0x490cba["cevre_m"] = roundMeters(_0x110fce["perimeter"]);
  if (_0x110fce["radius"] !== void 0) _0x490cba["yaricap_m"] = roundMeters(_0x110fce["radius"]);
  return _0x490cba["olusturma_tarihi"] = new Date(_0x110fce["createdAt"])["toLocaleString"]("tr-TR"), _0x490cba["geomwkt"] = geometryToWkt(_0x110fce["geometry"]), new PropertyBag(_0x490cba);
}
const MEASURED_SHAPE_LABELS = { "point": "Nokta", "polyline": "Mesafe", "polygon": "Alan", "rectangle": "Dikdörtgen", "circle": "Daire", "freehand": "Serbest Çizim" };
function buildMeasuredShapeProperties(_0x50518b, _0x741fe6) {
  const _0x59d18f = { "id": _0x741fe6, "olcum_turu": MEASURED_SHAPE_LABELS[_0x50518b["tool"]] };
  if (_0x50518b["length"] !== void 0) _0x59d18f["uzunluk_m"] = roundMeters(_0x50518b["length"]);
  if (_0x50518b["area"] !== void 0) _0x59d18f["alan_m2"] = roundMeters(_0x50518b["area"]);
  if (_0x50518b["perimeter"] !== void 0) _0x59d18f["cevre_m"] = roundMeters(_0x50518b["perimeter"]);
  return _0x59d18f["olusturma_tarihi"] = new Date(_0x50518b["createdAt"])["toLocaleString"]("tr-TR"), _0x59d18f["geomwkt"] = geometryToWkt(_0x50518b["geometry"]), new PropertyBag(_0x59d18f);
}
const _LayerManager = class _LayerManager extends EventEmitter {
  constructor(_0x22783e) {
    super(), this["items"] = /* @__PURE__ */ new Map(), this["analysisResultIds"] = /* @__PURE__ */ new Set(), this["viewer"] = _0x22783e, this["apiKeyPolicy"] = new ApiKeyPolicy({ "apiBase": () => getUcbpApiBase() }), this["outlineGeometry"] = new OutlineGeometry({ "getCurrentTime": () => this["viewer"]["clock"]["currentTime"] }), this["opacityController"] = new OpacityController({ "requestRender": () => this["viewer"]["scene"]["requestRender"]() }), this["styleEngine"] = new LayerStyleEngine({ "outlineGeometry": this["outlineGeometry"], "opacityController": this["opacityController"], "getCurrentTime": () => this["viewer"]["clock"]["currentTime"], "requestRender": () => this["viewer"]["scene"]["requestRender"](), "emitStyle": (_0x200c31, _0x51db4d) => this["emit"]("layer:style", { "id": _0x200c31, "style": _0x51db4d }), "waitForRenderSettle": () => this["waitForRenderSettle"]() }), this["localSourceLoader"] = new LocalSourceLoader(_0x22783e, { "styleEngine": this["styleEngine"], "outlineGeometry": this["outlineGeometry"], "addPolygonOutlines": (_0x425768, _0x59aa97, _0x467076) => this["addPolygonOutlines"](_0x425768, _0x59aa97, _0x467076), "register": (_0x1d8acb, _0x1d9f7b, _0x2a7f5a, _0x1b56bb, _0x12047e, _0x10c3be) => this["register"](_0x1d8acb, _0x1d9f7b, _0x2a7f5a, _0x1b56bb, _0x12047e, _0x10c3be), "emitCrsCheckResult": (_0x1c8df1, _0x2d483c) => this["emitCrsCheckResult"](_0x1c8df1, _0x2d483c), "waitForRenderSettle": () => this["waitForRenderSettle"](), "defaultOutlineColor": _LayerManager["DEFAULT_OUTLINE_COLOR"], "defaultOutlineColorHex": _LayerManager["DEFAULT_OUTLINE_COLOR_HEX"] }), this["shapeLayerBridge"] = new ShapeLayerBridge(_0x22783e, { "getItem": (_0x10b99f) => this["items"]["get"](_0x10b99f), "getStyle": (_0x1e34e1) => this["styleEngine"]["getStyle"](_0x1e34e1), "applyEntityStyle": (_0x11f5bf, _0x4512b5, _0x216426, _0x5e2662) => this["applyEntityStyle"](_0x11f5bf, _0x4512b5, _0x216426, _0x5e2662), "addPolygonOutlineCompanion": (_0x3f41dc, _0x398bbd, _0x1f1f99, _0x42e689, _0x2441ba) => this["addPolygonOutlineCompanion"](_0x3f41dc, _0x398bbd, _0x1f1f99, _0x42e689, _0x2441ba), "tagEntities": (_0x1e67c7, _0x3c2d7d) => this["tagEntities"](_0x1e67c7, _0x3c2d7d), "register": (_0x4d6c14, _0x30da92, _0x11dcc9, _0x460830, _0x2e9501, _0x3ff030) => this["register"](_0x4d6c14, _0x30da92, _0x11dcc9, _0x460830, _0x2e9501, _0x3ff030), "recordInitialStyle": (_0x2ad010, _0x4a41df, _0x56c1a7, _0x496214) => this["styleEngine"]["recordInitialStyle"](_0x2ad010, _0x4a41df, _0x56c1a7, _0x496214), "removeLayer": (_0x7c2ec5) => this["removeLayer"](_0x7c2ec5), "defaultOutlineColorHex": _LayerManager["DEFAULT_OUTLINE_COLOR_HEX"] }), this["ogcLayerFactory"] = new OgcLayerFactory(_0x22783e, { "apiKeyPolicy": this["apiKeyPolicy"], "styleEngine": this["styleEngine"], "outlineGeometry": this["outlineGeometry"], "requireLayer": (_0x306476) => this["requireLayer"](_0x306476), "setItem": (_0x9042fa, _0x28a3fc) => this["items"]["set"](_0x9042fa, _0x28a3fc), "register": (_0x2807c4, _0x2eca2f, _0x3faf97, _0x10399f, _0x36bc8c, _0x3d8ca1) => this["register"](_0x2807c4, _0x2eca2f, _0x3faf97, _0x10399f, _0x36bc8c, _0x3d8ca1), "addPolygonOutlines": (_0xf6ca15, _0x486062, _0x5bb1f9) => this["addPolygonOutlines"](_0xf6ca15, _0x486062, _0x5bb1f9), "emitCrsCheckResult": (_0x3614f3, _0x3a1be4) => this["emitCrsCheckResult"](_0x3614f3, _0x3a1be4), "emitFeaturesTruncated": (_0x5670a6, _0x5a2eee, _0x7fe588) => this["emit"]("layer:features-truncated", { "id": _0x5670a6, "totalCount": _0x5a2eee, "loadedCount": _0x7fe588 }), "waitForRenderSettle": () => this["waitForRenderSettle"](), "defaultOutlineColor": _LayerManager["DEFAULT_OUTLINE_COLOR"], "defaultOutlineColorHex": _LayerManager["DEFAULT_OUTLINE_COLOR_HEX"] }), this["cameraHighlight"] = new CameraHighlight(_0x22783e, { "requireLayer": (_0x31c104) => this["requireLayer"](_0x31c104), "getLayerStyle": (_0x553d3a) => this["getLayerStyle"](_0x553d3a) });
  }
  ["configure"](_0x57a94b) {
    this["apiKeyPolicy"]["configure"](_0x57a94b), _0x57a94b["apiKey"] !== void 0 && this["emit"]("apiKey:change", { "hasApiKey": !![] });
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
  ["canAddAuthorizedLayer"](_0x2462d3) {
    return this["apiKeyPolicy"]["canAddAuthorizedLayer"](_0x2462d3);
  }
  async ["addAuthorizedLayer"](_0x12f083) {
    const _0xe0a0c9 = this["apiKeyPolicy"]["resolveAddOptions"](_0x12f083);
    if (_0xe0a0c9["layerType"] === "WMS") return this["add"]("WMS", _0xe0a0c9["options"]);
    if (_0xe0a0c9["layerType"] === "WFS") return this["add"]("WFS", _0xe0a0c9["options"]);
    return this["add"]("WMTS", _0xe0a0c9["options"]);
  }
  ["layerRequiresApiKey"](_0x1f16e5) {
    return this["apiKeyPolicy"]["layerRequiresApiKey"](_0x1f16e5);
  }
  ["getLayers"]() {
    return Array["from"](this["items"]["values"]());
  }
  ["getLayerById"](_0xc52be7) {
    return this["items"]["get"](_0xc52be7);
  }
  ["getEntityPropertyNames"](_0x21276b) {
    const _0x4e1102 = this["requireLayer"](_0x21276b);
    if (!("entities" in _0x4e1102["cesiumObject"])) return [];
    const _0x33cd0a = /* @__PURE__ */ new Set();
    for (const _0x32eb49 of _0x4e1102["cesiumObject"]["entities"]["values"]) {
      const _0xc21725 = _0x32eb49["properties"];
      if (_0xc21725 === void 0) continue;
      for (const _0x4bade1 of _0xc21725["propertyNames"]) {
        if (_0x4bade1 === "layerId" || _0x4bade1 === "featureId") continue;
        _0x33cd0a["add"](_0x4bade1);
      }
    }
    return Array["from"](_0x33cd0a);
  }
  ["getUniqueColumnValues"](_0x1739a9, _0x41aad6) {
    const _0x511066 = this["requireLayer"](_0x1739a9);
    if (!("entities" in _0x511066["cesiumObject"])) return [];
    const _0x5508a7 = this["viewer"]["clock"]["currentTime"], _0x5934aa = /* @__PURE__ */ new Set();
    for (const _0x36d747 of _0x511066["cesiumObject"]["entities"]["values"]) {
      const _0x1bcf4f = this["readProperty"](_0x36d747, _0x41aad6, _0x5508a7);
      if (_0x1bcf4f !== null) _0x5934aa["add"](_0x1bcf4f);
    }
    return Array["from"](_0x5934aa);
  }
  ["getFeatureCount"](_0x42acee) {
    const _0x4deaa3 = this["requireLayer"](_0x42acee);
    if (!("entities" in _0x4deaa3["cesiumObject"])) return void 0;
    let _0x387ea7 = 0;
    for (const _0x3831dd of _0x4deaa3["cesiumObject"]["entities"]["values"]) {
      if (!this["isOutlineCompanion"](_0x3831dd)) _0x387ea7++;
    }
    return _0x387ea7;
  }
  ["getLayerGeoJSON"](_0x229ffd) {
    return getLayerGeoJSON(this["requireLayer"](_0x229ffd), this["viewer"]["clock"]["currentTime"], (_0x5cb90c) => this["isOutlineCompanion"](_0x5cb90c));
  }
  ["exportLayerGeoJSON"](_0x5a7241, _0x1275c2 = "katman") {
    exportLayerGeoJSON(this["getLayerGeoJSON"](_0x5a7241), _0x1275c2);
  }
  ["exportLayerKml"](_0x22d8a3, _0x8baca4 = "katman") {
    exportLayerKml(this["getLayerGeoJSON"](_0x22d8a3), _0x8baca4);
  }
  ["exportLayerShapefile"](_0x1c40b5, _0x2ac590 = "katman") {
    exportLayerShapefile(this["getLayerGeoJSON"](_0x1c40b5), _0x2ac590);
  }
  ["markAnalysisResult"](_0x11179a) {
    this["analysisResultIds"]["add"](_0x11179a);
  }
  ["isAnalysisResult"](_0x144fa5) {
    return this["analysisResultIds"]["has"](_0x144fa5);
  }
  ["isGeoTiffExportAvailable"](_0x348986) {
    return isGeoTiffExportAvailable(this["items"]["get"](_0x348986), this["ogcLayerFactory"]["getServiceOptions"](_0x348986));
  }
  async ["exportLayerAsGeoTiff"](_0x2ace60, _0x401193 = "katman") {
    const _0x1458a3 = this["requireLayer"](_0x2ace60);
    await exportLayerAsGeoTiff(_0x1458a3, this["ogcLayerFactory"]["getServiceOptions"](_0x2ace60), _0x401193, (_0x1e8c46, _0x2263ac) => this["apiKeyPolicy"]["resolveOgcProxyUrl"](_0x1e8c46, _0x2263ac), { "mergeApiKeyHeader": (_0x5beaf4, _0x184642) => this["apiKeyPolicy"]["mergeApiKeyHeader"](_0x5beaf4, _0x184642), "buildAuthHeaders": (_0x58fbe4) => this["apiKeyPolicy"]["buildAuthHeaders"](_0x58fbe4) });
  }
  ["getColumnRange"](_0x25a071, _0x3fe6fb) {
    const _0x1b6fe1 = this["requireLayer"](_0x25a071);
    if (!("entities" in _0x1b6fe1["cesiumObject"])) return null;
    return this["styleEngine"]["getColumnRange"](_0x1b6fe1["cesiumObject"], this["viewer"]["clock"]["currentTime"], _0x3fe6fb);
  }
  async ["applyLayerStyle"](_0x4b1f11, _0xcf8d67) {
    const _0x89e13e = this["requireLayer"](_0x4b1f11);
    if (!("entities" in _0x89e13e["cesiumObject"])) throw new LayerOperationError("LAYER_STYLE_NOT_VECTOR", 'applyLayerStyle sadece vektör (Entity tabanlı) katmanlarda kullanılabilir: "' + _0x4b1f11 + '"');
    await this["styleEngine"]["applyLayerStyle"](_0x4b1f11, _0x89e13e["cesiumObject"], _0x89e13e["layerType"] === "DRAWING" || _0x89e13e["layerType"] === "MEASURE", _0xcf8d67);
  }
  ["getLayerStyle"](_0x11d47e) {
    return this["styleEngine"]["getStyle"](_0x11d47e);
  }
  ["getInitialFillColor"](_0x2107ea) {
    var _a2;
    return (_a2 = this["items"]["get"](_0x2107ea)) == null ? void 0 : _a2["initialFillColor"];
  }
  ["getImageryLayers"]() {
    return Array["from"](this["items"]["values"]())["filter"]((_0x33dcef) => !_0x33dcef["isBasemap"] && _0x33dcef["cesiumObject"] instanceof ImageryLayer)["map"]((_0x5ee49d) => _0x5ee49d["cesiumObject"]);
  }
  ["getBasemapLayers"]() {
    return Array["from"](this["items"]["values"]())["filter"]((_0x39261b) => _0x39261b["isBasemap"] && _0x39261b["cesiumObject"] instanceof ImageryLayer)["map"]((_0x39654e) => _0x39654e["cesiumObject"]);
  }
  ["getDataSourceLayers"]() {
    return this["viewer"]["dataSources"];
  }
  ["getLayerByType"](_0x5265d8) {
    return Array["from"](this["items"]["values"]())["filter"]((_0x3519d8) => _0x3519d8["layerType"] === _0x5265d8);
  }
  async ["zoomToLayer"](_0xdbb358) {
    return this["cameraHighlight"]["zoomToLayer"](_0xdbb358);
  }
  async ["zoomToEntity"](_0xcd8ec1, _0x4667d3) {
    return this["cameraHighlight"]["zoomToEntity"](_0xcd8ec1, _0x4667d3);
  }
  ["highlightEntity"](_0x4517c0) {
    this["cameraHighlight"]["highlightEntity"](_0x4517c0);
  }
  ["clearHighlight"]() {
    this["cameraHighlight"]["clearHighlight"]();
  }
  async ["add"](_0x58b24e, _0x1b89e4) {
    this["assertUniqueId"](_0x1b89e4["id"]);
    switch (_0x58b24e) {
      case "WMS":
        return this["addWMS"](_0x1b89e4);
      case "WMTS":
        return this["addWMTS"](_0x1b89e4);
      case "WFS":
        return this["addWFS"](_0x1b89e4);
      case "WCS":
        return this["addWCS"](_0x1b89e4);
      case "GEOTIFF":
        return this["addGeoTiff"](_0x1b89e4);
      case "GEOJSON":
      case "KML":
      case "KMZ":
        return this["addLocalKmlGeoJson"](_0x58b24e, _0x1b89e4);
      case "SHP":
        return this["addShp"](_0x1b89e4);
      case "CSV":
        return this["addCsv"](_0x1b89e4);
      case "XYZ":
        throw new LayerOperationError("LAYER_TYPE_UNSUPPORTED_XYZ", "XYZ katmanı add() ile desteklenmiyor. Map.setBasemap() kullanın.");
      case "DRAWING":
        throw new LayerOperationError("LAYER_TYPE_UNSUPPORTED_DRAWING", '"DRAWING" katmanı add() ile desteklenmiyor -- DrawingManager draw:complete olayı üzerinden Map tarafından otomatik eklenir.');
      case "MEASURE":
        throw new LayerOperationError("LAYER_TYPE_UNSUPPORTED_MEASURE", '"MEASURE" katmanı add() ile desteklenmiyor -- DrawingManager draw:complete olayı üzerinden Map tarafından otomatik eklenir.');
    }
  }
  ["setVisible"](_0x1939db, _0xe03d79) {
    const _0x2d8f1b = this["requireLayer"](_0x1939db);
    _0x2d8f1b["cesiumObject"]["show"] = _0xe03d79, this["emit"]("layer:visibility", { "id": _0x1939db, "visible": _0xe03d79 });
  }
  ["setOpacity"](_0x422cf7, _0xe3a3e4) {
    const _0x2477ea = Math["max"](0, Math["min"](1, _0xe3a3e4)), _0x5e7888 = this["requireLayer"](_0x422cf7);
    _0x5e7888["cesiumObject"] instanceof ImageryLayer ? _0x5e7888["cesiumObject"]["alpha"] = _0x2477ea : this["setDataSourceOpacity"](_0x5e7888["cesiumObject"], _0x2477ea), this["emit"]("layer:opacity", { "id": _0x422cf7, "opacity": _0x2477ea });
  }
  ["_move"](_0x6c2ac3, _0x5b029f) {
    const _0x54f033 = this["requireLayer"](_0x6c2ac3), _0x25d29b = _0x54f033["cesiumObject"] instanceof ImageryLayer ? this["viewer"]["imageryLayers"] : this["viewer"]["dataSources"], _0x4f5c25 = _0x25d29b["indexOf"](_0x54f033["cesiumObject"]);
    _0x25d29b[_0x5b029f](_0x54f033["cesiumObject"]);
    const _0x32de81 = _0x25d29b["indexOf"](_0x54f033["cesiumObject"]);
    this["reindexLayerOrder"](), this["emit"]("layer:reorder", { "id": _0x6c2ac3, "oldIndex": _0x4f5c25, "newIndex": _0x32de81, "layer": _0x54f033 });
  }
  ["raise"](_0x3c2415) {
    this["_move"](_0x3c2415, "raise");
  }
  ["lower"](_0x304ec9) {
    this["_move"](_0x304ec9, "lower");
  }
  ["raiseToTop"](_0x23cd34) {
    this["_move"](_0x23cd34, "raiseToTop");
  }
  ["lowerToBottom"](_0x2648a8) {
    this["_move"](_0x2648a8, "lowerToBottom");
  }
  ["reorder"](_0x26d66f) {
    const _0x3f5ffb = _0x26d66f[0], _0xcd8154 = _0x3f5ffb !== void 0 ? this["items"]["get"](_0x3f5ffb) : void 0, _0x2af6ac = (_0xcd8154 == null ? void 0 : _0xcd8154["cesiumObject"]) instanceof ImageryLayer, _0x1a0372 = _0xcd8154 ? _0x2af6ac ? this["viewer"]["imageryLayers"]["indexOf"](_0xcd8154["cesiumObject"]) : this["viewer"]["dataSources"]["indexOf"](_0xcd8154["cesiumObject"]) : -1, _0x3ea447 = [], _0x3e7861 = [];
    for (const _0x5a0a98 of _0x26d66f) {
      const _0x282090 = this["items"]["get"](_0x5a0a98);
      if (_0x282090 === void 0) continue;
      _0x282090["cesiumObject"] instanceof ImageryLayer ? _0x3ea447["push"](_0x5a0a98) : _0x3e7861["push"](_0x5a0a98);
    }
    for (let _0x29d9ac = _0x3ea447["length"] - 1; _0x29d9ac >= 0; _0x29d9ac--) {
      const _0x1358ef = this["items"]["get"](_0x3ea447[_0x29d9ac]);
      (_0x1358ef == null ? void 0 : _0x1358ef["cesiumObject"]) instanceof ImageryLayer && this["viewer"]["imageryLayers"]["raiseToTop"](_0x1358ef["cesiumObject"]);
    }
    for (let _0x5c0ac1 = _0x3e7861["length"] - 1; _0x5c0ac1 >= 0; _0x5c0ac1--) {
      const _0x16dbe1 = this["items"]["get"](_0x3e7861[_0x5c0ac1]);
      _0x16dbe1 !== void 0 && !(_0x16dbe1["cesiumObject"] instanceof ImageryLayer) && this["viewer"]["dataSources"]["raiseToTop"](_0x16dbe1["cesiumObject"]);
    }
    this["reindexLayerOrder"]();
    if (_0xcd8154 !== void 0 && _0x3f5ffb !== void 0) {
      const _0x236cff = _0x2af6ac ? this["viewer"]["imageryLayers"]["indexOf"](_0xcd8154["cesiumObject"]) : this["viewer"]["dataSources"]["indexOf"](_0xcd8154["cesiumObject"]);
      this["emit"]("layer:reorder", { "id": _0x3f5ffb, "oldIndex": _0x1a0372, "newIndex": _0x236cff, "layer": _0xcd8154 });
    }
  }
  ["removeLayer"](_0x2a7936) {
    const _0x59ae5c = this["requireLayer"](_0x2a7936);
    _0x59ae5c["cesiumObject"] instanceof ImageryLayer ? this["viewer"]["imageryLayers"]["remove"](_0x59ae5c["cesiumObject"], !![]) : void this["viewer"]["dataSources"]["remove"](_0x59ae5c["cesiumObject"], !![]), this["items"]["delete"](_0x2a7936), this["analysisResultIds"]["delete"](_0x2a7936), this["ogcLayerFactory"]["deleteServiceOptions"](_0x2a7936), this["styleEngine"]["deleteStyle"](_0x2a7936), this["shapeLayerBridge"]["deleteCounter"](_0x2a7936), this["emit"]("layer:remove", { "layer": _0x59ae5c });
  }
  ["addWMS"](_0x1d4dfe) {
    return this["ogcLayerFactory"]["addWMS"](_0x1d4dfe);
  }
  ["addWMTS"](_0x5ac482) {
    return this["ogcLayerFactory"]["addWMTS"](_0x5ac482);
  }
  async ["getWmsAvailableStyles"](_0x34fc78) {
    return this["ogcLayerFactory"]["getWmsAvailableStyles"](_0x34fc78);
  }
  async ["setWmsStyle"](_0x5c102d, _0x14f6b3) {
    return this["ogcLayerFactory"]["setWmsStyle"](_0x5c102d, _0x14f6b3);
  }
  ["getWmsLegendGraphicUrl"](_0x4cf971, _0x27abbe) {
    return this["ogcLayerFactory"]["getWmsLegendGraphicUrl"](_0x4cf971, _0x27abbe);
  }
  async ["getWmtsAvailableStyles"](_0x11d85f) {
    return this["ogcLayerFactory"]["getWmtsAvailableStyles"](_0x11d85f);
  }
  async ["setWmtsStyle"](_0x82435b, _0x2ccb75) {
    return this["ogcLayerFactory"]["setWmtsStyle"](_0x82435b, _0x2ccb75);
  }
  ["addWFS"](_0x2d6335) {
    return this["ogcLayerFactory"]["addWFS"]({ ..._0x2d6335, "clampToGround": _0x2d6335["clampToGround"] ?? !![] });
  }
  ["addWCS"](_0x2e9137) {
    return this["ogcLayerFactory"]["addWCS"](_0x2e9137);
  }
  ["addGeoTiff"](_0x5978c5) {
    return this["ogcLayerFactory"]["addGeoTiff"](_0x5978c5);
  }
  ["addLocalKmlGeoJson"](_0x56a756, _0x16416c) {
    return this["localSourceLoader"]["addLocalKmlGeoJson"](_0x56a756, _0x16416c);
  }
  ["addShp"](_0x1a49bd) {
    return this["localSourceLoader"]["addShp"](_0x1a49bd);
  }
  ["addCsv"](_0xb5b754) {
    return this["localSourceLoader"]["addCsv"](_0xb5b754);
  }
  ["_addBasemapImageryLayer"](_0x4589a2, _0x299c2f, _0x5e1f37) {
    return this["register"](_0x4589a2, _0x299c2f, "XYZ", _0x5e1f37, !![]);
  }
  ["_removeBasemapLayers"]() {
    for (const _0x27a594 of this["items"]["values"]()) {
      _0x27a594["isBasemap"] && _0x27a594["cesiumObject"] instanceof ImageryLayer && (this["viewer"]["imageryLayers"]["remove"](_0x27a594["cesiumObject"], !![]), this["items"]["delete"](_0x27a594["id"]));
    }
  }
  ["_addDrawnShape"](_0x4c7af7, _0x5d2822, _0x392903) {
    return this["shapeLayerBridge"]["addDrawnShape"](_0x4c7af7, _0x5d2822, _0x392903);
  }
  ["_addMeasuredShape"](_0x882b93, _0x411d66, _0x3bae93) {
    return this["shapeLayerBridge"]["addMeasuredShape"](_0x882b93, _0x411d66, _0x3bae93);
  }
  ["_removeDrawnShape"](_0x5bc58c, _0x1c5399) {
    this["shapeLayerBridge"]["removeDrawnShape"](_0x5bc58c, _0x1c5399);
  }
  ["register"](_0x511416, _0x55c93f, _0x1eb263, _0x2a4c7a, _0x2a55b8, _0x23b98b) {
    "entities" in _0x2a4c7a && this["tagEntities"](_0x2a4c7a, _0x511416);
    const _0x2d9126 = Object["freeze"]({ "id": _0x511416, "title": _0x55c93f, "layerType": _0x1eb263, "cesiumObject": _0x2a4c7a, "isBasemap": _0x2a55b8, ..._0x23b98b !== void 0 ? { "initialFillColor": _0x23b98b } : {} });
    return this["items"]["set"](_0x511416, _0x2d9126), this["emit"]("layer:add", { "layer": _0x2d9126 }), _0x2d9126;
  }
  ["emitCrsCheckResult"](_0x3fdeeb, _0x391c76) {
    if (!_0x391c76) return;
    switch (_0x391c76["kind"]) {
      case "reprojected":
        this["emit"]("layer:crs-reprojected", { "id": _0x3fdeeb, "fromEpsg": _0x391c76["fromEpsg"], "toEpsg": "EPSG:4326" });
        break;
      case "suspicious-unresolved-crs":
        this["emit"]("layer:crs-unresolved", { "id": _0x3fdeeb, "crsName": _0x391c76["crsName"] });
        break;
    }
  }
  ["tagEntities"](_0x26f601, _0x35a634) {
    _0x26f601["entities"]["suspendEvents"]();
    for (const _0x38081c of _0x26f601["entities"]["values"]) {
      _0x38081c["properties"] === void 0 && (_0x38081c["properties"] = new PropertyBag()), !_0x38081c["properties"]["hasProperty"]("layerId") && _0x38081c["properties"]["addProperty"]("layerId", _0x35a634), !_0x38081c["properties"]["hasProperty"]("featureId") && _0x38081c["properties"]["addProperty"]("featureId", _0x38081c["id"]);
    }
    _0x26f601["entities"]["resumeEvents"]();
  }
  ["reindexLayerOrder"]() {
    const _0x5c4feb = /* @__PURE__ */ new Map();
    for (let _0x35d52b = 0; _0x35d52b < this["viewer"]["imageryLayers"]["length"]; _0x35d52b++) {
      _0x5c4feb["set"](this["viewer"]["imageryLayers"]["get"](_0x35d52b), _0x35d52b);
    }
    const _0xc7fd62 = /* @__PURE__ */ new Map();
    for (let _0x5c43cd = 0; _0x5c43cd < this["viewer"]["dataSources"]["length"]; _0x5c43cd++) {
      _0xc7fd62["set"](this["viewer"]["dataSources"]["get"](_0x5c43cd), _0x5c43cd);
    }
    const _0x28d592 = (_0x48f62d) => (_0x48f62d["cesiumObject"] instanceof ImageryLayer ? _0x5c4feb["get"](_0x48f62d["cesiumObject"]) : _0xc7fd62["get"](_0x48f62d["cesiumObject"])) ?? Number["POSITIVE_INFINITY"], _0x237419 = Array["from"](this["items"]["entries"]()), _0x16e7a7 = _0x237419["filter"](([, _0x1a9279]) => _0x1a9279["cesiumObject"] instanceof ImageryLayer)["sort"](([, _0x154f99], [, _0x5969f3]) => _0x28d592(_0x154f99) - _0x28d592(_0x5969f3)), _0x33d111 = _0x237419["filter"](([, _0x23f917]) => !(_0x23f917["cesiumObject"] instanceof ImageryLayer))["sort"](([, _0x1b1945], [, _0x485bbc]) => _0x28d592(_0x1b1945) - _0x28d592(_0x485bbc));
    let _0x1db54f = 0, _0x399041 = 0;
    const _0x8d01ef = _0x237419["map"](([, _0x5dc457]) => _0x5dc457["cesiumObject"] instanceof ImageryLayer ? _0x16e7a7[_0x1db54f++] : _0x33d111[_0x399041++]);
    this["items"]["clear"]();
    for (const [_0x1a04c0, _0x469cb8] of _0x8d01ef) this["items"]["set"](_0x1a04c0, _0x469cb8);
  }
  ["requireLayer"](_0x6d25e4) {
    const _0x1eeb8b = this["items"]["get"](_0x6d25e4);
    if (_0x1eeb8b === void 0) throw new LayerOperationError("LAYER_NOT_FOUND", 'Katman bulunamadı: "' + _0x6d25e4 + '"');
    return _0x1eeb8b;
  }
  ["assertUniqueId"](_0x1008ea) {
    if (this["items"]["has"](_0x1008ea)) throw new LayerOperationError("LAYER_ID_ALREADY_EXISTS", '"' + _0x1008ea + `" id'li katman zaten eklenmiş.`);
  }
  async ["getCapabilitiesDocument"](_0x257786, _0x364d3f, _0x1ae379, _0x177518) {
    return this["ogcLayerFactory"]["getCapabilitiesDocument"](_0x257786, _0x364d3f, _0x1ae379, _0x177518);
  }
  async ["getWcsCoverageExtents"](_0x392117, _0x297cc2, _0x468135) {
    return this["ogcLayerFactory"]["getWcsCoverageExtents"](_0x392117, _0x297cc2, _0x468135);
  }
  ["waitForRenderSettle"](_0x435600 = 60) {
    return new Promise((_0x1f3bea) => {
      let _0x12e126 = _0x435600;
      const _0x813154 = () => {
        _0x12e126 -= 1, _0x12e126 <= 0 && (this["viewer"]["scene"]["postRender"]["removeEventListener"](_0x813154), _0x1f3bea());
      };
      this["viewer"]["scene"]["postRender"]["addEventListener"](_0x813154);
    });
  }
  ["isOutlineCompanion"](_0x25cf8d) {
    return this["outlineGeometry"]["isOutlineCompanion"](_0x25cf8d);
  }
  ["hasOutlineCompanion"](_0x3b745f) {
    return this["outlineGeometry"]["hasOutlineCompanion"](_0x3b745f);
  }
  ["hasRiskyOutline"](_0x18e5d8) {
    return this["outlineGeometry"]["hasRiskyOutline"](_0x18e5d8);
  }
  ["addPolygonOutlines"](_0x31bedd, _0x2feb38, _0x49e520) {
    this["outlineGeometry"]["addPolygonOutlines"](_0x31bedd, _0x2feb38, _0x49e520);
    for (const _0x4451b9 of _0x31bedd["entities"]["values"]) {
      this["outlineGeometry"]["hasOutlineCompanion"](_0x4451b9) && this["opacityController"]["ensureDynamicFillColor"](_0x31bedd, _0x4451b9);
    }
  }
  ["addPolygonOutlineCompanion"](_0x392ad7, _0x2c2806, _0x3df997, _0x2d749d, _0x3e97a5) {
    this["outlineGeometry"]["addPolygonOutlineCompanion"](_0x392ad7, _0x2c2806, _0x3df997, _0x2d749d, _0x3e97a5), this["outlineGeometry"]["hasOutlineCompanion"](_0x2c2806) && this["opacityController"]["ensureDynamicFillColor"](_0x392ad7, _0x2c2806);
  }
  ["readProperty"](_0x252b46, _0xc8129a, _0x41b926) {
    return this["styleEngine"]["readProperty"](_0x252b46, _0xc8129a, _0x41b926);
  }
  ["applyEntityStyle"](_0x5b6d06, _0x2ec2eb, _0x21eb7b, _0x28289b) {
    this["styleEngine"]["applyEntityStyle"](_0x5b6d06, _0x2ec2eb, _0x21eb7b, _0x28289b);
  }
  ["setDataSourceOpacity"](_0x108670, _0x2f2a85) {
    this["opacityController"]["setDataSourceOpacity"](_0x108670, _0x2f2a85);
  }
  ["destroy"]() {
    this["removeAllListeners"](), this["items"]["clear"]();
  }
};
_LayerManager["DEFAULT_OUTLINE_COLOR_HEX"] = "#1a73e8";
_LayerManager["DEFAULT_OUTLINE_COLOR"] = Color["fromCssColorString"](_LayerManager["DEFAULT_OUTLINE_COLOR_HEX"]);
let LayerManager = _LayerManager;
const FLAG = "__tucbsSelectionHighlight";
function isSelectionHighlightEntity(_0x39961d) {
  return _0x39961d[FLAG] === !![];
}
class SelectionHighlight {
  constructor(_0x532f81) {
    this["viewer"] = _0x532f81, this["source"] = null, this["generation"] = 0;
  }
  ["show"](_0x5853d5) {
    const _0x2348ca = ++this["generation"];
    if (_0x5853d5["length"] === 0) {
      this["removeSource"]();
      return;
    }
    void this["load"](_0x5853d5, _0x2348ca);
  }
  ["clear"]() {
    this["generation"]++, this["removeSource"]();
  }
  async ["load"](_0x59abd2, _0x117c23) {
    const _0xe95973 = Color["fromCssColorString"]("#dc2626")["withAlpha"](0.25), _0x3e6540 = Color["fromCssColorString"]("#dc2626"), _0x5e37be = { "type": "FeatureCollection", "features": [..._0x59abd2] }, _0x5ddb0e = await GeoJsonDataSource["load"](_0x5e37be, { "clampToGround": !![], "fill": _0xe95973, "stroke": _0x3e6540, "strokeWidth": 3, "markerColor": _0x3e6540, "markerSize": 16 });
    if (_0x117c23 !== this["generation"]) return;
    this["removeSource"](), this["paint"](_0x5ddb0e, _0xe95973, _0x3e6540), this["viewer"]["dataSources"]["add"](_0x5ddb0e), this["source"] = _0x5ddb0e;
  }
  ["paint"](_0x123592, _0x26e1df, _0x41cef9) {
    var _a2;
    for (const _0x4a6417 of [..._0x123592["entities"]["values"]]) {
      this["tag"](_0x4a6417);
      _0x4a6417["billboard"] && (_0x4a6417["billboard"] = void 0, _0x4a6417["point"] = new PointGraphics({ "pixelSize": 16, "color": _0x41cef9, "outlineColor": Color["WHITE"], "outlineWidth": 2, "heightReference": HeightReference["CLAMP_TO_GROUND"], "disableDepthTestDistance": Number["POSITIVE_INFINITY"] }));
      const _0x4bc2ac = _0x4a6417["polygon"];
      if (!_0x4bc2ac) continue;
      _0x4bc2ac["material"] = new ColorMaterialProperty(_0x26e1df), _0x4bc2ac["outline"] = new ConstantProperty(![]);
      const _0x55f3a7 = (_a2 = _0x4bc2ac["hierarchy"]) == null ? void 0 : _a2["getValue"](JulianDate["now"]());
      this["addRings"](_0x123592, _0x55f3a7, _0x41cef9);
    }
  }
  ["addRings"](_0x36fe7c, _0x4d6d48, _0x52949a) {
    var _a2;
    if (!((_a2 = _0x4d6d48 == null ? void 0 : _0x4d6d48["positions"]) == null ? void 0 : _a2["length"])) return;
    this["addRing"](_0x36fe7c, _0x4d6d48["positions"], _0x52949a);
    for (const _0x1ac2dc of _0x4d6d48["holes"] ?? []) this["addRings"](_0x36fe7c, _0x1ac2dc, _0x52949a);
  }
  ["addRing"](_0x10babe, _0x1ec846, _0x5a1661) {
    const _0xf945be = _0x10babe["entities"]["add"]({ "polyline": { "positions": _0x1ec846, "width": 3, "material": new ColorMaterialProperty(_0x5a1661), "clampToGround": !![] } });
    this["tag"](_0xf945be);
  }
  ["tag"](_0x2c08b1) {
    _0x2c08b1[FLAG] = !![];
  }
  ["removeSource"]() {
    if (!this["source"]) return;
    this["viewer"]["dataSources"]["remove"](this["source"], !![]), this["source"] = null;
  }
}
const DRILL_PICK_LIMIT = 32;
function boundingBoxFromPoints(_0xa9e592) {
  if (_0xa9e592["length"] === 0) return void 0;
  let _0x2b95d6 = Infinity, _0x3f6a40 = Infinity, _0x5f4e3c = -Infinity, _0x4adfc5 = -Infinity;
  for (const [_0x59b541, _0x33efd7] of _0xa9e592) {
    if (_0x59b541 < _0x2b95d6) _0x2b95d6 = _0x59b541;
    if (_0x59b541 > _0x5f4e3c) _0x5f4e3c = _0x59b541;
    if (_0x33efd7 < _0x3f6a40) _0x3f6a40 = _0x33efd7;
    if (_0x33efd7 > _0x4adfc5) _0x4adfc5 = _0x33efd7;
  }
  if (_0x2b95d6 === _0x5f4e3c && _0x3f6a40 === _0x4adfc5) return { "kind": "point", "longitude": _0x2b95d6, "latitude": _0x3f6a40 };
  return { "kind": "extent", "west": _0x2b95d6, "south": _0x3f6a40, "east": _0x5f4e3c, "north": _0x4adfc5 };
}
function flattenGeoJsonCoordinates(_0x5e09e2, _0x5d6e76) {
  if (!Array["isArray"](_0x5e09e2) || _0x5e09e2["length"] === 0) return;
  if (typeof _0x5e09e2[0] === "number") {
    const [_0x2cbc96, _0xa54e60] = _0x5e09e2;
    if (typeof _0x2cbc96 === "number" && typeof _0xa54e60 === "number") _0x5d6e76["push"]([_0x2cbc96, _0xa54e60]);
    return;
  }
  for (const _0x17fc9d of _0x5e09e2) flattenGeoJsonCoordinates(_0x17fc9d, _0x5d6e76);
}
function extractGeoJsonExtent(_0x482cdc) {
  if (_0x482cdc === null || typeof _0x482cdc !== "object") return void 0;
  const _0x1e2cf4 = _0x482cdc, _0x447604 = _0x1e2cf4["type"] === "FeatureCollection" && Array["isArray"](_0x1e2cf4["features"]) ? _0x1e2cf4["features"]["map"]((_0x19203c) => _0x19203c == null ? void 0 : _0x19203c["geometry"])["filter"]((_0x1d6da7) => _0x1d6da7 !== void 0 && _0x1d6da7 !== null) : _0x1e2cf4["geometry"] ? [_0x1e2cf4["geometry"]] : [];
  if (_0x447604["length"] === 0) return void 0;
  const _0x11bd1c = [];
  for (const _0x4aef49 of _0x447604) {
    const _0x332a3b = _0x4aef49;
    if (_0x332a3b["type"] === "GeometryCollection" && Array["isArray"](_0x332a3b["geometries"])) for (const _0x322081 of _0x332a3b["geometries"]) {
      flattenGeoJsonCoordinates(_0x322081 == null ? void 0 : _0x322081["coordinates"], _0x11bd1c);
    }
    else flattenGeoJsonCoordinates(_0x332a3b["coordinates"], _0x11bd1c);
  }
  return boundingBoxFromPoints(_0x11bd1c);
}
function collectGmlCoordinates(_0x125221, _0x1c621c) {
  var _a2, _b;
  for (const _0xe52173 of Array["from"](_0x125221["getElementsByTagNameNS"]("*", "coordinates"))) {
    const _0x13efd6 = (_a2 = _0xe52173["textContent"]) == null ? void 0 : _a2["trim"]();
    if (!_0x13efd6) continue;
    for (const _0x23792e of _0x13efd6["split"](/\s+/)) {
      const [_0x30c28e, _0xc50ee2] = _0x23792e["split"](","), _0x5e3818 = Number(_0x30c28e), _0x12abc = Number(_0xc50ee2);
      if (Number["isFinite"](_0x5e3818) && Number["isFinite"](_0x12abc)) _0x1c621c["push"]([_0x5e3818, _0x12abc]);
    }
  }
  for (const _0x22c9b4 of ["pos", "posList"]) {
    for (const _0x17414a of Array["from"](_0x125221["getElementsByTagNameNS"]("*", _0x22c9b4))) {
      const _0x35c782 = (((_b = _0x17414a["textContent"]) == null ? void 0 : _b["trim"]()) ?? "")["split"](/\s+/)["map"](Number);
      for (let _0x5450b2 = 0; _0x5450b2 + 1 < _0x35c782["length"]; _0x5450b2 += 2) {
        const _0x57b622 = _0x35c782[_0x5450b2], _0x50c0ae = _0x35c782[_0x5450b2 + 1];
        if (Number["isFinite"](_0x57b622) && Number["isFinite"](_0x50c0ae)) _0x1c621c["push"]([_0x57b622, _0x50c0ae]);
      }
    }
  }
}
function extractGmlExtent(_0x40fb54) {
  if (!(_0x40fb54 instanceof Element)) return void 0;
  const _0xc0f26d = [];
  return collectGmlCoordinates(_0x40fb54, _0xc0f26d), boundingBoxFromPoints(_0xc0f26d);
}
function extractImageryGeometry(_0x564f17) {
  return extractGeoJsonExtent(_0x564f17) ?? extractGmlExtent(_0x564f17);
}
class InteractionManager extends EventEmitter {
  constructor(_0x5a3646) {
    super(), this["unsubscribers"] = [], this["suspended"] = ![], this["identifySuspended"] = ![], this["hoverEnabled"] = ![], this["pickGeneration"] = 0, this["viewer"] = _0x5a3646, this["handler"] = new ScreenSpaceEventHandler(_0x5a3646["scene"]["canvas"]), this["bindMouseEvents"](), this["bindCameraEvents"](), this["bindSceneEvents"]();
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
  ["enableHover"](_0x167792) {
    this["hoverEnabled"] = _0x167792, !_0x167792 && (this["hoveredEntity"] = void 0);
  }
  ["isHoverEnabled"]() {
    return this["hoverEnabled"];
  }
  ["flyToPosition"](_0x3462bf, _0x36a29a, _0x16d932) {
    const _0x17b020 = (_0x16d932 == null ? void 0 : _0x16d932["height"]) ?? 1e3;
    this["viewer"]["camera"]["flyTo"]({ "destination": Cartesian3["fromDegrees"](_0x3462bf, _0x36a29a, _0x17b020), "orientation": { "pitch": _0x318bcf["toRadians"](-90) }, ...(_0x16d932 == null ? void 0 : _0x16d932["duration"]) !== void 0 ? { "duration": _0x16d932["duration"] } : {} });
  }
  ["flyToExtent"](_0x47946f, _0x3de2a4, _0x391584, _0x3fe291, _0x446622) {
    this["viewer"]["camera"]["flyTo"]({ "destination": Rectangle["fromDegrees"](_0x47946f, _0x3de2a4, _0x391584, _0x3fe291), "orientation": { "pitch": _0x318bcf["toRadians"](-90) }, ...(_0x446622 == null ? void 0 : _0x446622["duration"]) !== void 0 ? { "duration": _0x446622["duration"] } : {} });
  }
  ["destroy"]() {
    !this["handler"]["isDestroyed"]() && this["handler"]["destroy"]();
    for (const _0x42f7a2 of this["unsubscribers"]) {
      _0x42f7a2();
    }
    this["unsubscribers"]["length"] = 0, this["removeAllListeners"]();
  }
  ["bindMouseEvents"]() {
    this["handler"]["setInputAction"]((_0x4f5db4) => this["dispatchPick"](_0x4f5db4["position"], "entity:click", "map:click", "imagery:click"), ScreenSpaceEventType["LEFT_CLICK"]), this["handler"]["setInputAction"]((_0x269c3d) => this["dispatchPick"](_0x269c3d["position"], "entity:dblclick", "map:dblclick", "imagery:dblclick"), ScreenSpaceEventType["LEFT_DOUBLE_CLICK"]), this["handler"]["setInputAction"]((_0xebf014) => this["dispatchPick"](_0xebf014["position"], "entity:rightclick", "map:rightclick", "imagery:rightclick"), ScreenSpaceEventType["RIGHT_CLICK"]), this["handler"]["setInputAction"]((_0x4b89b2) => this["dispatchEntityOnly"](_0x4b89b2["position"], "entity:mousedown"), ScreenSpaceEventType["LEFT_DOWN"]), this["handler"]["setInputAction"]((_0x1647b5) => this["dispatchEntityOnly"](_0x1647b5["position"], "entity:mouseup"), ScreenSpaceEventType["LEFT_UP"]), this["handler"]["setInputAction"]((_0x457ad2) => this["handleMouseMove"](_0x457ad2["endPosition"]), ScreenSpaceEventType["MOUSE_MOVE"]), this["handler"]["setInputAction"]((_0x1126be) => this["emit"]("map:wheel", { "delta": _0x1126be }), ScreenSpaceEventType["WHEEL"]), this["handler"]["setInputAction"]((_0x540c8a) => this["emit"]("map:pinchstart", this["buildMapDetail"](_0x540c8a["position1"])), ScreenSpaceEventType["PINCH_START"]), this["handler"]["setInputAction"](() => this["emit"]("map:pinchend", {}), ScreenSpaceEventType["PINCH_END"]), this["handler"]["setInputAction"]((_0x8e30ef) => {
      const _0x228f95 = Math["atan2"](_0x8e30ef["position2"]["y"] - _0x8e30ef["position1"]["y"], _0x8e30ef["position2"]["x"] - _0x8e30ef["position1"]["x"]);
      this["emit"]("map:pinchmove", { ...this["buildMapDetail"](_0x8e30ef["position1"]), "angle": _0x228f95 });
    }, ScreenSpaceEventType["PINCH_MOVE"]);
  }
  ["handleMouseMove"](_0x2ad7d1) {
    this["emit"]("map:mousemove", this["buildMapDetail"](_0x2ad7d1));
    if (!this["hoverEnabled"] || this["suspended"]) return;
    const _0x1e640b = this["pickSelectableEntity"](_0x2ad7d1);
    if (_0x1e640b === this["hoveredEntity"]) return;
    this["hoveredEntity"] !== void 0 && this["emit"]("entity:mouseleave", this["buildEntityDetail"](this["hoveredEntity"], _0x2ad7d1)), this["hoveredEntity"] = _0x1e640b, _0x1e640b !== void 0 && this["emit"]("entity:mouseenter", this["buildEntityDetail"](_0x1e640b, _0x2ad7d1));
  }
  ["dispatchPick"](_0x40f62c, _0x15a40f, _0xaab720, _0x2a9647) {
    if (this["suspended"]) return;
    this["pickGeneration"]++;
    const _0x2eee54 = this["pickSelectableEntity"](_0x40f62c);
    _0x2eee54 ? this["emit"](_0x15a40f, this["buildEntityDetail"](_0x2eee54, _0x40f62c)) : this["emit"](_0xaab720, this["buildMapDetail"](_0x40f62c)), this["pickImageryFeatures"](_0x40f62c, _0x2a9647);
  }
  ["pickSelectableEntity"](_0x4f5182) {
    const _0x346b8a = this["scene"]["drillPick"](_0x4f5182, DRILL_PICK_LIMIT);
    for (const _0x10c047 of _0x346b8a) {
      const _0x50713c = _0x10c047 == null ? void 0 : _0x10c047["id"];
      if (!(_0x50713c instanceof Entity)) continue;
      if (isSelectionHighlightEntity(_0x50713c)) continue;
      return _0x50713c;
    }
    return void 0;
  }
  ["pickImageryFeatures"](_0x50d98e, _0x146a1b) {
    const _0x1f8175 = this["pickGeneration"], _0x2ecd49 = this["camera"]["getPickRay"](_0x50d98e);
    if (!_0x2ecd49) return;
    const _0x3b0792 = this["viewer"]["imageryLayers"]["pickImageryLayerFeatures"](_0x2ecd49, this["scene"]);
    if (!_0x3b0792) return;
    this["emit"]("imagery:querying", this["buildMapDetail"](_0x50d98e));
    const _0x1c3034 = (_0x2f1c35) => {
      if (this["suspended"] || _0x1f8175 !== this["pickGeneration"]) return;
      this["emit"](_0x146a1b, this["buildImageryDetail"](_0x2f1c35, _0x50d98e));
    };
    _0x3b0792["then"](_0x1c3034)["catch"](() => {
      _0x1c3034([]);
    });
  }
  ["buildImageryDetail"](_0x4a41c4, _0x328314) {
    const _0x12ea09 = _0x4a41c4["map"]((_0x3ade00) => ({ "imageryLayer": _0x3ade00["imageryLayer"], "name": _0x3ade00["name"] ?? null, "properties": _0x3ade00["properties"] ?? {}, "description": _0x3ade00["description"] ?? null, "geometryHint": extractImageryGeometry(_0x3ade00["data"]) }));
    return { "position": this["toLonLat"](_0x328314), "screenPos": { "x": _0x328314["x"], "y": _0x328314["y"] }, "features": _0x12ea09 };
  }
  ["dispatchEntityOnly"](_0x5a2829, _0x4eefc4) {
    if (this["suspended"]) return;
    const _0x3b4f8f = this["scene"]["pick"](_0x5a2829);
    (_0x3b4f8f == null ? void 0 : _0x3b4f8f["id"]) instanceof Entity && this["emit"](_0x4eefc4, this["buildEntityDetail"](_0x3b4f8f["id"], _0x5a2829));
  }
  ["bindCameraEvents"]() {
    this["unsubscribers"]["push"](this["camera"]["moveStart"]["addEventListener"](() => this["emit"]("camera:moveStart", {})), this["camera"]["moveEnd"]["addEventListener"](() => this["emit"]("camera:moveEnd", {})), this["camera"]["changed"]["addEventListener"]((_0x4d19df) => this["emit"]("camera:changed", { "percentage": _0x4d19df })));
  }
  ["bindSceneEvents"]() {
    this["unsubscribers"]["push"](this["scene"]["preRender"]["addEventListener"]((_0x7a730c, _0x353940) => this["emit"]("scene:preRender", { "time": _0x353940 })), this["scene"]["postRender"]["addEventListener"]((_0x79ed45, _0x438b2b) => this["emit"]("scene:postRender", { "time": _0x438b2b })), this["scene"]["morphStart"]["addEventListener"](() => this["emit"]("scene:morphStart", {})), this["scene"]["morphComplete"]["addEventListener"](() => this["emit"]("scene:morphComplete", {})));
  }
  ["buildMapDetail"](_0x33a9f1) {
    return { "position": this["toLonLat"](_0x33a9f1), "screenPos": { "x": _0x33a9f1["x"], "y": _0x33a9f1["y"] } };
  }
  ["buildEntityDetail"](_0x242bd9, _0x34011e) {
    return { ...this["resolveFeature"](_0x242bd9), "position": this["toLonLat"](_0x34011e), "screenPos": { "x": _0x34011e["x"], "y": _0x34011e["y"] }, "features": this["pickAllFeatures"](_0x34011e, _0x242bd9) };
  }
  ["resolveFeature"](_0x4251a8) {
    var _a2, _b;
    const _0x2b9ecf = JulianDate["now"](), _0x5f4282 = ((_a2 = _0x4251a8["properties"]) == null ? void 0 : _a2["getValue"](_0x2b9ecf)) ?? {}, _0xd82098 = _0x5f4282["__tucbsOutlineOf"];
    if (typeof _0xd82098 === "string") {
      const _0x22ef5e = (_b = _0x4251a8["entityCollection"]) == null ? void 0 : _b["getById"](_0xd82098);
      if (_0x22ef5e && _0x22ef5e !== _0x4251a8) return this["resolveFeature"](_0x22ef5e);
    }
    const _0x2725ec = typeof _0x5f4282["layerId"] === "string" ? _0x5f4282["layerId"] : null, _0x361db4 = typeof _0x5f4282["featureId"] === "string" ? _0x5f4282["featureId"] : null;
    if ("__tucbsOutlineOf" in _0x5f4282) {
      const { __tucbsOutlineOf: _0x590246, ..._0x412d97 } = _0x5f4282;
      return { "entity": _0x4251a8, "layerId": _0x2725ec, "featureId": _0x361db4, "properties": _0x412d97 };
    }
    return { "entity": _0x4251a8, "layerId": _0x2725ec, "featureId": _0x361db4, "properties": _0x5f4282 };
  }
  ["pickAllFeatures"](_0x1397ea, _0xd56b08) {
    const _0x29302e = this["resolveFeature"](_0xd56b08), _0x2bc875 = [_0x29302e], _0x501336 = /* @__PURE__ */ new Set([_0x29302e["entity"]]), _0x33c15e = this["scene"]["drillPick"](_0x1397ea, DRILL_PICK_LIMIT);
    for (const _0x292057 of _0x33c15e) {
      const _0x17f72e = _0x292057 == null ? void 0 : _0x292057["id"];
      if (!(_0x17f72e instanceof Entity)) continue;
      const _0x143a93 = this["resolveFeature"](_0x17f72e);
      if (_0x501336["has"](_0x143a93["entity"])) continue;
      _0x501336["add"](_0x143a93["entity"]), _0x2bc875["push"](_0x143a93);
    }
    return _0x2bc875;
  }
  ["toLonLat"](_0x512e85) {
    const _0x576e97 = this["camera"]["pickEllipsoid"](_0x512e85, this["scene"]["globe"]["ellipsoid"]);
    if (_0x576e97 === void 0) return [0, 0];
    const _0x44098f = Cartographic["fromCartesian"](_0x576e97);
    return [_0x318bcf["toDegrees"](_0x44098f["longitude"]), _0x318bcf["toDegrees"](_0x44098f["latitude"])];
  }
}
const EARTH_RADIUS_METERS = 6378137, CIRCLE_SEGMENTS = 48;
function dedupePositions(_0x14861c) {
  return _0x14861c["filter"]((_0x5e98ea, _0x41523c) => _0x41523c === 0 || !Cartesian3["equalsEpsilon"](_0x5e98ea, _0x14861c[_0x41523c - 1], _0x318bcf["EPSILON7"]));
}
class DrawingManager extends EventEmitter {
  constructor(_0x89afde, _0x4a4884) {
    super(), this["shapes"] = /* @__PURE__ */ new Map(), this["positions"] = [], this["tempVertexEntities"] = [], this["freehandDragging"] = ![], this["onEscapeKey"] = (_0x4af128) => {
      if (_0x4af128["key"] !== "Escape") return;
      this["abortCurrentShape"]();
    }, this["viewer"] = _0x89afde, this["interactionManager"] = _0x4a4884, this["handler"] = new ScreenSpaceEventHandler(_0x89afde["scene"]["canvas"]);
  }
  get ["scene"]() {
    return this["viewer"]["scene"];
  }
  ["activate"](_0x40ee1f, _0x85c67c) {
    if (this["activeTool"]) this["deactivate"]();
    this["activeTool"] = _0x40ee1f, this["activeSource"] = _0x85c67c, this["positions"] = [], this["previewPosition"] = void 0, this["interactionManager"]["suspend"](), this["resetTrackedEntity"](), this["suspendBuiltInDoubleClick"]();
    if (_0x40ee1f === "freehand") this["lockCamera"]();
    this["setCursor"]("crosshair"), this["bindToolHandlers"](_0x40ee1f), this["emit"]("draw:start", _0x85c67c === void 0 ? { "tool": _0x40ee1f } : { "tool": _0x40ee1f, "source": _0x85c67c });
  }
  ["deactivate"]() {
    if (!this["activeTool"]) return;
    const _0x544ee6 = this["activeTool"], _0x18ad9d = this["activeSource"];
    this["finishSession"](), this["emit"]("draw:cancel", _0x18ad9d === void 0 ? { "tool": _0x544ee6 } : { "tool": _0x544ee6, "source": _0x18ad9d });
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
  ["getShapeById"](_0x2ac2f9) {
    return this["shapes"]["get"](_0x2ac2f9);
  }
  ["removeShape"](_0x3be7a8) {
    const _0x2b255e = this["shapes"]["get"](_0x3be7a8);
    if (!_0x2b255e) return;
    this["viewer"]["entities"]["remove"](_0x2b255e["entity"]), this["shapes"]["delete"](_0x3be7a8), this["emit"]("draw:remove", { "id": _0x3be7a8, "shape": _0x2b255e });
  }
  ["clearAll"]() {
    for (const _0x1c5f5e of [...this["shapes"]["keys"]()]) this["removeShape"](_0x1c5f5e);
  }
  ["undo"]() {
    if (this["positions"]["length"] === 0) return;
    this["positions"]["pop"]();
    const _0x2b31e2 = this["tempVertexEntities"]["pop"]();
    if (_0x2b31e2) this["viewer"]["entities"]["remove"](_0x2b31e2);
  }
  ["toGeoJSON"]() {
    return { "type": "FeatureCollection", "features": this["getShapes"]()["map"]((_0xb41e0f) => ({ "type": "Feature", "properties": { "id": _0xb41e0f["id"], "tool": _0xb41e0f["tool"] }, "geometry": _0xb41e0f["geometry"] })) };
  }
  ["destroy"]() {
    this["deactivate"](), this["handler"]["destroy"](), this["removeAllListeners"]();
  }
  ["bindToolHandlers"](_0x51be54) {
    this["handler"]["setInputAction"](() => this["deactivate"](), ScreenSpaceEventType["RIGHT_CLICK"]), document["addEventListener"]("keydown", this["onEscapeKey"]);
    if (_0x51be54 === "freehand") {
      this["handler"]["setInputAction"]((_0x37a45c) => this["onFreehandDown"](_0x37a45c["position"]), ScreenSpaceEventType["LEFT_DOWN"]), this["handler"]["setInputAction"](() => this["onFreehandUp"](), ScreenSpaceEventType["LEFT_UP"]), this["handler"]["setInputAction"]((_0x51a556) => this["onFreehandMove"](_0x51a556["endPosition"]), ScreenSpaceEventType["MOUSE_MOVE"]);
      return;
    }
    this["handler"]["setInputAction"]((_0x53d49e) => this["onVertexClick"](_0x53d49e["position"]), ScreenSpaceEventType["LEFT_CLICK"]), this["handler"]["setInputAction"]((_0xe4bf97) => this["onPreviewMove"](_0xe4bf97["endPosition"]), ScreenSpaceEventType["MOUSE_MOVE"]), (_0x51be54 === "polyline" || _0x51be54 === "polygon") && this["handler"]["setInputAction"](() => this["finishMultiVertexViaDoubleClick"](), ScreenSpaceEventType["LEFT_DOUBLE_CLICK"]);
  }
  ["unbindToolHandlers"]() {
    this["handler"]["removeInputAction"](ScreenSpaceEventType["LEFT_CLICK"]), this["handler"]["removeInputAction"](ScreenSpaceEventType["LEFT_DOWN"]), this["handler"]["removeInputAction"](ScreenSpaceEventType["LEFT_UP"]), this["handler"]["removeInputAction"](ScreenSpaceEventType["MOUSE_MOVE"]), this["handler"]["removeInputAction"](ScreenSpaceEventType["RIGHT_CLICK"]), this["handler"]["removeInputAction"](ScreenSpaceEventType["LEFT_DOUBLE_CLICK"]), document["removeEventListener"]("keydown", this["onEscapeKey"]);
  }
  ["abortCurrentShape"]() {
    if (this["activeTool"] === void 0 || this["positions"]["length"] === 0) return;
    const _0x18d410 = this["activeTool"], _0xcb999f = this["activeSource"];
    this["clearTempEntity"](), this["resetSessionForContinuousDrawing"](), this["resetTrackedEntity"](), this["emit"]("draw:abort", _0xcb999f === void 0 ? { "tool": _0x18d410 } : { "tool": _0x18d410, "source": _0xcb999f });
  }
  ["onVertexClick"](_0x3c78cd) {
    const _0x23d84d = this["toCartesian"](_0x3c78cd);
    if (_0x23d84d === void 0 || this["activeTool"] === void 0) return;
    this["positions"]["push"](_0x23d84d), this["emitVertex"](_0x3c78cd), this["ensureTempEntity"]();
    (this["activeTool"] === "polygon" || this["activeTool"] === "polyline") && this["addVertexMarker"](_0x23d84d);
    if (this["activeTool"] === "point") {
      this["completeShape"]();
      return;
    }
    (this["activeTool"] === "rectangle" || this["activeTool"] === "circle") && this["positions"]["length"] >= 2 && this["completeShape"]();
  }
  ["onPreviewMove"](_0x3f3dfb) {
    if (this["positions"]["length"] === 0 || this["activeTool"] === void 0) return;
    const _0xf9753 = this["toCartesian"](_0x3f3dfb);
    if (_0xf9753 === void 0) return;
    this["previewPosition"] = _0xf9753, this["emit"]("draw:move", { "tool": this["activeTool"], "coordinates": this["toLonLat"](_0xf9753), "screenPos": { "x": _0x3f3dfb["x"], "y": _0x3f3dfb["y"] } });
  }
  ["finishMultiVertex"]() {
    const _0x323e4c = this["activeTool"] === "polygon" ? 3 : 2;
    if (this["positions"]["length"] < _0x323e4c) return;
    this["completeShape"]();
  }
  ["finishMultiVertexViaDoubleClick"]() {
    this["positions"]["length"] >= 2 && this["positions"]["pop"](), this["finishMultiVertex"](), this["resetTrackedEntity"]();
  }
  ["onFreehandDown"](_0x515432) {
    this["freehandDragging"] = !![], this["positions"] = [];
    const _0x15eec6 = this["toCartesian"](_0x515432);
    if (_0x15eec6 === void 0) return;
    this["positions"]["push"](_0x15eec6), this["emitVertex"](_0x515432), this["ensureTempEntity"]();
  }
  ["onFreehandMove"](_0x23ee70) {
    if (!this["freehandDragging"] || this["activeTool"] === void 0) return;
    const _0x1c753d = this["toCartesian"](_0x23ee70);
    if (_0x1c753d === void 0) return;
    this["positions"]["push"](_0x1c753d), this["previewPosition"] = _0x1c753d, this["emit"]("draw:move", { "tool": this["activeTool"], "coordinates": this["toLonLat"](_0x1c753d), "screenPos": { "x": _0x23ee70["x"], "y": _0x23ee70["y"] } });
  }
  ["onFreehandUp"]() {
    this["freehandDragging"] = ![];
    if (this["positions"]["length"] >= 2) this["completeShape"]();
  }
  ["emitVertex"](_0x16592d) {
    if (this["activeTool"] === void 0) return;
    const _0x46b076 = this["requireIndex"](this["positions"], this["positions"]["length"] - 1);
    this["emit"]("draw:vertex", { "tool": this["activeTool"], "index": this["positions"]["length"] - 1, "coordinates": this["toLonLat"](_0x46b076), "screenPos": { "x": _0x16592d["x"], "y": _0x16592d["y"] } });
  }
  ["completeShape"]() {
    if (this["activeTool"] === void 0 || this["positions"]["length"] === 0) return;
    const _0x42d16e = this["buildShape"](this["activeTool"], this["positions"]), _0xe0c548 = this["activeSource"] === void 0 ? _0x42d16e : { ..._0x42d16e, "source": this["activeSource"] };
    this["shapes"]["set"](_0xe0c548["id"], _0xe0c548), this["clearTempEntity"](), this["resetSessionForContinuousDrawing"](), this["emit"]("draw:complete", { "shape": _0xe0c548 });
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
        const _0x38279b = [...this["positions"], ...this["previewPosition"] ? [this["previewPosition"]] : []], _0x49b575 = dedupePositions(_0x38279b);
        return _0x49b575["length"] >= 3 ? new PolygonHierarchy(_0x49b575) : void 0;
      }, ![]), "material": Color["CYAN"]["withAlpha"](0.35) } });
      else {
        if (this["activeTool"] === "rectangle") this["tempFillEntity"] = this["viewer"]["entities"]["add"]({ "polygon": { "hierarchy": new CallbackProperty(() => {
          const _0xfe88f = this["positions"][0], _0x591ac2 = this["previewPosition"];
          if (_0xfe88f === void 0 || _0x591ac2 === void 0) return void 0;
          const _0x4fe963 = this["computeRectangleCoordinates"](_0xfe88f, _0x591ac2);
          return new PolygonHierarchy(_0x4fe963["map"]((_0x1f1466) => this["toCartesianFromLonLat"](_0x1f1466)));
        }, ![]), "material": Color["CYAN"]["withAlpha"](0.35) } });
        else this["activeTool"] === "circle" && (this["tempFillEntity"] = this["viewer"]["entities"]["add"]({ "polygon": { "hierarchy": new CallbackProperty(() => {
          const _0x2aa52c = this["positions"][0], _0x3d1671 = this["previewPosition"];
          if (_0x2aa52c === void 0 || _0x3d1671 === void 0) return void 0;
          const _0x58eb1f = this["computeCircleRing"](_0x2aa52c, _0x3d1671);
          return new PolygonHierarchy(_0x58eb1f["map"]((_0x2f7973) => this["toCartesianFromLonLat"](_0x2f7973)));
        }, ![]), "material": Color["CYAN"]["withAlpha"](0.35) } }));
      }
    }
  }
  ["addVertexMarker"](_0x1397af) {
    this["tempVertexEntities"]["push"](this["viewer"]["entities"]["add"]({ "position": _0x1397af, "point": { "pixelSize": 6, "color": Color["YELLOW"], "outlineColor": Color["BLACK"], "outlineWidth": 1 } }));
  }
  ["buildPositionsCallback"](_0x3afc6a) {
    return new CallbackProperty(() => {
      const _0x318d48 = [...this["positions"], ...this["previewPosition"] ? [this["previewPosition"]] : []], _0x46d619 = dedupePositions(_0x318d48);
      return _0x46d619["length"] >= _0x3afc6a ? _0x46d619 : void 0;
    }, ![]);
  }
  ["clearTempEntity"]() {
    this["tempEntity"] !== void 0 && (this["viewer"]["entities"]["remove"](this["tempEntity"]), this["tempEntity"] = void 0);
    this["tempFillEntity"] !== void 0 && (this["viewer"]["entities"]["remove"](this["tempFillEntity"]), this["tempFillEntity"] = void 0);
    for (const _0x4d072a of this["tempVertexEntities"]) {
      this["viewer"]["entities"]["remove"](_0x4d072a);
    }
    this["tempVertexEntities"] = [];
  }
  ["resetTrackedEntity"]() {
    this["viewer"]["trackedEntity"] !== void 0 && (this["viewer"]["trackedEntity"] = void 0);
  }
  ["suspendBuiltInDoubleClick"]() {
    if (this["builtInDoubleClickAction"] !== void 0) return;
    const _0x261b55 = this["viewer"]["screenSpaceEventHandler"], _0x519ac6 = _0x261b55["getInputAction"](ScreenSpaceEventType["LEFT_DOUBLE_CLICK"]);
    if (_0x519ac6 === void 0) return;
    this["builtInDoubleClickAction"] = _0x519ac6, _0x261b55["removeInputAction"](ScreenSpaceEventType["LEFT_DOUBLE_CLICK"]);
  }
  ["restoreBuiltInDoubleClick"]() {
    if (this["builtInDoubleClickAction"] === void 0) return;
    this["viewer"]["screenSpaceEventHandler"]["setInputAction"](this["builtInDoubleClickAction"], ScreenSpaceEventType["LEFT_DOUBLE_CLICK"]), this["builtInDoubleClickAction"] = void 0;
  }
  ["setCursor"](_0x4a1584) {
    this["viewer"]["scene"]["canvas"]["style"]["cursor"] = _0x4a1584;
  }
  ["lockCamera"]() {
    this["viewer"]["scene"]["screenSpaceCameraController"]["enableRotate"] = ![], this["viewer"]["scene"]["screenSpaceCameraController"]["enableTilt"] = ![];
  }
  ["unlockCamera"]() {
    this["viewer"]["scene"]["screenSpaceCameraController"]["enableRotate"] = !![], this["viewer"]["scene"]["screenSpaceCameraController"]["enableTilt"] = !![];
  }
  ["buildShape"](_0x4aaa1c, _0x3103c9) {
    const _0x947586 = crypto["randomUUID"](), _0x3ca054 = Date["now"]();
    if (_0x4aaa1c === "point") {
      const _0x4d5f81 = this["requireIndex"](_0x3103c9, 0), _0x3cf8b5 = this["toLonLat"](_0x4d5f81);
      return { "id": _0x947586, "tool": _0x4aaa1c, "entity": this["viewer"]["entities"]["add"]({ "position": _0x4d5f81, "point": { "pixelSize": 8, "color": Color["CYAN"] } }), "positions": _0x3103c9, "coordinates": [_0x3cf8b5], "geometry": { "type": "Point", "coordinates": _0x3cf8b5 }, "createdAt": _0x3ca054 };
    }
    if (_0x4aaa1c === "circle") return this["buildCircleShape"](_0x947586, _0x3103c9, _0x3ca054);
    if (_0x4aaa1c === "rectangle") return this["buildRectangleShape"](_0x947586, _0x3103c9, _0x3ca054);
    if (_0x4aaa1c === "polygon") return this["buildPolygonShape"](_0x947586, _0x3103c9, _0x3ca054);
    return this["buildLineShape"](_0x947586, _0x4aaa1c, _0x3103c9, _0x3ca054);
  }
  ["buildLineShape"](_0x40d81a, _0x10a4cc, _0x497425, _0x5a70fa) {
    const _0x39b1cb = _0x497425["map"]((_0x14abf3) => this["toLonLat"](_0x14abf3));
    return { "id": _0x40d81a, "tool": _0x10a4cc, "entity": this["viewer"]["entities"]["add"]({ "polyline": { "positions": _0x497425, "width": 3, "material": Color["CYAN"] } }), "positions": _0x497425, "coordinates": _0x39b1cb, "geometry": { "type": "LineString", "coordinates": _0x39b1cb }, "length": this["computeLength"](_0x497425), "createdAt": _0x5a70fa };
  }
  ["buildPolygonShape"](_0x5277b7, _0x482664, _0x1bfe02) {
    const _0x489216 = _0x482664["map"]((_0x3d9575) => this["toLonLat"](_0x3d9575)), _0x449758 = this["requireIndex"](_0x489216, 0), _0xccf9c3 = this["requireIndex"](_0x482664, 0), _0x5daefe = [..._0x489216, _0x449758];
    return { "id": _0x5277b7, "tool": "polygon", "entity": this["viewer"]["entities"]["add"]({ "polygon": { "hierarchy": _0x482664, "material": Color["CYAN"]["withAlpha"](0.4) } }), "positions": _0x482664, "coordinates": _0x489216, "geometry": { "type": "Polygon", "coordinates": [_0x5daefe] }, "area": this["computeArea"](_0x489216), "perimeter": this["computeLength"]([..._0x482664, _0xccf9c3]), "createdAt": _0x1bfe02 };
  }
  ["buildRectangleShape"](_0x501f2c, _0xf28ebb, _0x33edf3) {
    const _0x3640bb = this["requireIndex"](_0xf28ebb, 0), _0x2d117d = this["requireIndex"](_0xf28ebb, 1), _0x5c2e7e = this["computeRectangleCoordinates"](_0x3640bb, _0x2d117d), _0x2dc942 = _0x5c2e7e["map"]((_0x382774) => this["toCartesianFromLonLat"](_0x382774)), _0x5a9108 = this["requireIndex"](_0x2dc942, 0);
    return { "id": _0x501f2c, "tool": "rectangle", "entity": this["viewer"]["entities"]["add"]({ "polygon": { "hierarchy": _0x2dc942, "material": Color["CYAN"]["withAlpha"](0.4) } }), "positions": _0x2dc942, "coordinates": _0x5c2e7e, "geometry": { "type": "Polygon", "coordinates": [[..._0x5c2e7e, this["requireIndex"](_0x5c2e7e, 0)]] }, "area": this["computeArea"](_0x5c2e7e), "perimeter": this["computeLength"]([..._0x2dc942, _0x5a9108]), "createdAt": _0x33edf3 };
  }
  ["buildCircleShape"](_0x483035, _0x2360a3, _0x19da0f) {
    const _0x589b46 = this["requireIndex"](_0x2360a3, 0), _0xac8fc1 = this["requireIndex"](_0x2360a3, 1), _0x19914c = Cartesian3["distance"](_0x589b46, _0xac8fc1), _0x58f7a4 = this["computeCircleRing"](_0x589b46, _0xac8fc1), _0x16274c = _0x58f7a4["map"]((_0x36a0ce) => this["toCartesianFromLonLat"](_0x36a0ce)), _0x3ed4c6 = this["requireIndex"](_0x58f7a4, 0);
    return { "id": _0x483035, "tool": "circle", "entity": this["viewer"]["entities"]["add"]({ "polygon": { "hierarchy": _0x16274c, "material": Color["CYAN"]["withAlpha"](0.4) } }), "positions": [_0x589b46, _0xac8fc1], "coordinates": [this["toLonLat"](_0x589b46)], "geometry": { "type": "Polygon", "coordinates": [[..._0x58f7a4, _0x3ed4c6]] }, "area": Math["PI"] * _0x19914c * _0x19914c, "perimeter": 2 * Math["PI"] * _0x19914c, "radius": _0x19914c, "createdAt": _0x19da0f };
  }
  ["sampleCircleRing"](_0x1040a3, _0x4bdbe5) {
    const _0x2fd403 = [];
    for (let _0x1c032d = 0; _0x1c032d < CIRCLE_SEGMENTS; _0x1c032d++) {
      const _0x4fa7a7 = 2 * Math["PI"] * _0x1c032d / CIRCLE_SEGMENTS, _0x1de7f5 = _0x4bdbe5 * Math["cos"](_0x4fa7a7), _0x157661 = _0x4bdbe5 * Math["sin"](_0x4fa7a7);
      _0x2fd403["push"](this["offsetMetersToLonLat"](_0x1040a3, _0x1de7f5, _0x157661));
    }
    return _0x2fd403;
  }
  ["computeRectangleCoordinates"](_0x4afcbb, _0x329772) {
    const _0x5e6114 = this["toLonLat"](_0x4afcbb), _0x425a2d = this["toLonLat"](_0x329772), _0x10da6e = Math["min"](_0x5e6114[0], _0x425a2d[0]), _0x3f652c = Math["max"](_0x5e6114[0], _0x425a2d[0]), _0x35c425 = Math["min"](_0x5e6114[1], _0x425a2d[1]), _0x4938a9 = Math["max"](_0x5e6114[1], _0x425a2d[1]);
    return [[_0x10da6e, _0x35c425], [_0x3f652c, _0x35c425], [_0x3f652c, _0x4938a9], [_0x10da6e, _0x4938a9]];
  }
  ["computeCircleRing"](_0x273d4f, _0x33c476) {
    const _0x2f981b = Cartesian3["distance"](_0x273d4f, _0x33c476), _0x38a486 = this["toLonLat"](_0x273d4f);
    return this["sampleCircleRing"](_0x38a486, _0x2f981b);
  }
  ["computeArea"](_0x5def08) {
    const _0x3118e6 = this["requireIndex"](_0x5def08, 0)[1], _0x1cddec = _0x5def08["map"]((_0x6fdebf) => this["projectMeters"](_0x6fdebf, _0x3118e6));
    let _0x371737 = 0;
    for (let _0x131a54 = 0; _0x131a54 < _0x1cddec["length"]; _0x131a54++) {
      const [_0x3fa231, _0x46fd68] = this["requireIndex"](_0x1cddec, _0x131a54), [_0x2b37fa, _0x4ed616] = this["requireIndex"](_0x1cddec, (_0x131a54 + 1) % _0x1cddec["length"]);
      _0x371737 += _0x3fa231 * _0x4ed616 - _0x2b37fa * _0x46fd68;
    }
    return Math["abs"](_0x371737) / 2;
  }
  ["computeLength"](_0x5eead8) {
    let _0x3e92e8 = 0;
    for (let _0x4592a6 = 0; _0x4592a6 < _0x5eead8["length"] - 1; _0x4592a6++) {
      _0x3e92e8 += Cartesian3["distance"](this["requireIndex"](_0x5eead8, _0x4592a6), this["requireIndex"](_0x5eead8, _0x4592a6 + 1));
    }
    return _0x3e92e8;
  }
  ["projectMeters"](_0x180f51, _0x46bbaf) {
    const _0x5e377b = _0x318bcf["toRadians"](_0x180f51[0]) * Math["cos"](_0x318bcf["toRadians"](_0x46bbaf)) * EARTH_RADIUS_METERS, _0x105cb4 = _0x318bcf["toRadians"](_0x180f51[1]) * EARTH_RADIUS_METERS;
    return [_0x5e377b, _0x105cb4];
  }
  ["offsetMetersToLonLat"](_0x5e7f41, _0x2516bd, _0x3d4908) {
    const _0x570c9c = _0x5e7f41[1] + _0x318bcf["toDegrees"](_0x3d4908 / EARTH_RADIUS_METERS), _0x3decdb = _0x5e7f41[0] + _0x318bcf["toDegrees"](_0x2516bd / (EARTH_RADIUS_METERS * Math["cos"](_0x318bcf["toRadians"](_0x5e7f41[1]))));
    return [_0x3decdb, _0x570c9c];
  }
  ["toCartesianFromLonLat"](_0x4f1267) {
    return Cartesian3["fromDegrees"](_0x4f1267[0], _0x4f1267[1]);
  }
  ["toCartesian"](_0x4d82f7) {
    return this["viewer"]["camera"]["pickEllipsoid"](_0x4d82f7, this["scene"]["globe"]["ellipsoid"]);
  }
  ["toLonLat"](_0x378194) {
    const _0x5ac0c0 = Cartographic["fromCartesian"](_0x378194);
    return [_0x318bcf["toDegrees"](_0x5ac0c0["longitude"]), _0x318bcf["toDegrees"](_0x5ac0c0["latitude"])];
  }
  ["requireIndex"](_0x10e181, _0x1fb114) {
    const _0x2aec27 = _0x10e181[_0x1fb114];
    if (_0x2aec27 === void 0) throw new TucbsError("INTERNAL_INDEX_OUT_OF_RANGE", "DrawingManager: beklenen index (" + _0x1fb114 + ") dizide bulunamadi");
    return _0x2aec27;
  }
}
function trimSlash$1(_0x4b615f) {
  return _0x4b615f["replace"](/\/+$/, "");
}
function newClientId() {
  if (typeof crypto !== "undefined" && typeof crypto["randomUUID"] === "function") return crypto["randomUUID"]();
  return "00000000-0000-0000-0000-000000000001";
}
class AnalysisManager {
  constructor(_0x1dd64a) {
    __privateAdd(this, _AnalysisManager_instances);
    __privateAdd(this, _apiKey2);
    __privateSet(this, _apiKey2, _0x1dd64a["apiKey"] ?? ""), this["clientId"] = _0x1dd64a["clientId"] ?? newClientId();
  }
  ["configure"](_0x518ec8) {
    if (_0x518ec8["apiKey"] !== void 0) __privateSet(this, _apiKey2, _0x518ec8["apiKey"]);
    if (_0x518ec8["clientId"] !== void 0) this["clientId"] = _0x518ec8["clientId"];
  }
  get ["configured"]() {
    return Boolean(getUcbpApiBase() && __privateGet(this, _apiKey2));
  }
  async ["buffer"](_0x503c93) {
    return __privateMethod(this, _AnalysisManager_instances, post_fn).call(this, "/vector/buffer", _0x503c93);
  }
  async ["intersection"](_0x59dde4) {
    return __privateMethod(this, _AnalysisManager_instances, post_fn).call(this, "/vector/intersection", _0x59dde4);
  }
  async ["boundary"](_0x324ec8) {
    return __privateMethod(this, _AnalysisManager_instances, post_fn).call(this, "/vector/boundary", _0x324ec8);
  }
  async ["clip"](_0x20ec38) {
    return __privateMethod(this, _AnalysisManager_instances, post_fn).call(this, "/vector/clip", _0x20ec38);
  }
  async ["difference"](_0x3b3883) {
    return __privateMethod(this, _AnalysisManager_instances, post_fn).call(this, "/vector/difference", _0x3b3883);
  }
  async ["subtract"](_0x340efd) {
    return __privateMethod(this, _AnalysisManager_instances, post_fn).call(this, "/vector/subtract", _0x340efd);
  }
  async ["union"](_0x2c9d6e) {
    return __privateMethod(this, _AnalysisManager_instances, post_fn).call(this, "/vector/union", _0x2c9d6e);
  }
  async ["wedgeBuffer"](_0x5c04b9) {
    return __privateMethod(this, _AnalysisManager_instances, post_fn).call(this, "/vector/wedge-buffer", _0x5c04b9);
  }
}
_apiKey2 = new WeakMap();
_AnalysisManager_instances = new WeakSet();
post_fn = async function(_0x5bc676, _0x846bd4) {
  if (!__privateGet(this, _apiKey2)) throw new AnalysisRequestError("ANALYSIS_API_KEY_MISSING", "apiKey tanımlı değil (tucbs-map apiKey).");
  const _0x267e46 = { "clientId": this["clientId"], "object": _0x846bd4 }, _0x10c683 = "" + trimSlash$1(getUcbpApiBase()) + _0x5bc676;
  let _0x2d20e3;
  try {
    _0x2d20e3 = await fetch(_0x10c683, { "method": "POST", "headers": { "Content-Type": "application/json", "X-API-Key": __privateGet(this, _apiKey2) }, "body": JSON["stringify"](_0x267e46) });
  } catch (_0x3b9da7) {
    const _0x4d3509 = _0x3b9da7 instanceof Error ? _0x3b9da7["message"] : String(_0x3b9da7);
    throw new AnalysisRequestError("ANALYSIS_NETWORK_ERROR", "Ağ hatası: " + _0x4d3509);
  }
  const _0x3741dd = await _0x2d20e3["json"]()["catch"](() => null);
  if (!_0x2d20e3["ok"]) {
    const _0xa311f2 = (_0x3741dd == null ? void 0 : _0x3741dd["mesaj"]) || (_0x3741dd == null ? void 0 : _0x3741dd["message"]) || "İstek başarısız (HTTP " + _0x2d20e3["status"] + ")";
    throw new AnalysisRequestError("ANALYSIS_REQUEST_FAILED", _0xa311f2);
  }
  if ((_0x3741dd == null ? void 0 : _0x3741dd["isSuccess"]) === ![] || (_0x3741dd == null ? void 0 : _0x3741dd["success"]) === ![]) throw new AnalysisRequestError("ANALYSIS_UNSUCCESSFUL", _0x3741dd["mesaj"] || _0x3741dd["message"] || "Analiz başarısız.");
  const _0x566906 = _0x3741dd == null ? void 0 : _0x3741dd["object"];
  if (!(_0x566906 == null ? void 0 : _0x566906["geojson"])) throw new AnalysisRequestError("ANALYSIS_RESPONSE_MISSING_GEOJSON", "Yanıtta geojson yok.");
  return _0x566906;
};
const FALLBACK_IMAGE_FILENAME = "blue-marble-fallback.jpg", FALLBACK_WORLD_IMAGE = new URL(FALLBACK_IMAGE_FILENAME, import.meta.url)["href"], FALLBACK_DELAY_MS = 3e3, BASEMAP_ERROR_RETRY_LIMIT = 2, BASEMAP_UNAVAILABLE_DELAY_MS = 1e4;
function watchBasemap(_0x228c5a, _0x2350bf, _0x2426c5, _0x560cb8, _0xfd2abb, _0xded464) {
  let _0x54b97f = ![], _0x5dbf96 = ![];
  const _0x238d3e = window["setTimeout"](() => {
    if (_0x54b97f || !_0x2350bf["isCurrentGeneration"](_0x2426c5)) return;
    _0x2350bf["ensureFallbackBasemap"]();
  }, FALLBACK_DELAY_MS), _0x3d8fea = window["setTimeout"](() => {
    if (_0x54b97f || !_0x2350bf["isCurrentGeneration"](_0x2426c5)) return;
    _0x54b97f = !![], _0x144cc3(), _0x2350bf["setStatus"]("unavailable"), _0x2350bf["removeBasemapLayer"](), _0x2350bf["ensureFallbackBasemap"](), _0x2350bf["emit"]("basemap:error", { "id": _0x560cb8 });
  }, BASEMAP_UNAVAILABLE_DELAY_MS), _0x144cc3 = () => {
    _0x5dbf96 = !![], window["clearTimeout"](_0x238d3e), window["clearTimeout"](_0x3d8fea), _0xded464["errorEvent"]["removeEventListener"](_0x5f4537);
  }, _0x5f4537 = (_0x2a8233) => {
    if (_0x54b97f) return;
    if (!_0x2350bf["isCurrentGeneration"](_0x2426c5)) return;
    if (!_0x228c5a["imageryLayers"]["contains"](_0xfd2abb)) return;
    if (_0x2a8233["timesRetried"] < BASEMAP_ERROR_RETRY_LIMIT) {
      _0x2a8233["retry"] = !![];
      return;
    }
    _0x54b97f = !![], _0x144cc3(), _0x2350bf["setStatus"]("unavailable"), _0x2350bf["removeBasemapLayer"](), _0x2350bf["ensureFallbackBasemap"](), _0x2350bf["emit"]("basemap:error", { "id": _0x560cb8 });
  }, _0x4f6821 = _0xded464["requestImage"]["bind"](_0xded464);
  _0xded464["requestImage"] = (_0x4c6edd, _0x158e51, _0x384d7e, _0x3a3fdb) => {
    const _0x1cab65 = _0x4f6821(_0x4c6edd, _0x158e51, _0x384d7e, _0x3a3fdb);
    if (_0x1cab65 && !_0x54b97f && !_0x5dbf96) _0x1cab65["then"](_0x3ba2be, () => void 0);
    return _0x1cab65;
  };
  const _0x3ba2be = () => {
    if (_0x54b97f || _0x5dbf96) return;
    if (!_0x2350bf["isCurrentGeneration"](_0x2426c5)) {
      _0x144cc3();
      return;
    }
    _0x54b97f = !![], _0x144cc3(), _0x2350bf["setStatus"]("ready"), _0x2350bf["clearFallbackBasemap"](), _0x2350bf["emit"]("basemap:recovered", { "id": _0x560cb8 });
  };
  return _0xded464["errorEvent"]["addEventListener"](_0x5f4537), _0x144cc3;
}
const BASEMAP_LAYER_ID = "__tucbs_basemap__";
function trackProviderRequests(_0xccf853) {
  const _0x4bfe08 = /* @__PURE__ */ new Set(), _0x520d6a = _0xccf853["requestImage"]["bind"](_0xccf853);
  return _0xccf853["requestImage"] = (_0xbf2b05, _0x4442c2, _0x3091d3, _0x260d63) => {
    if (_0x260d63) _0x4bfe08["add"](_0x260d63);
    const _0x28814a = _0x520d6a(_0xbf2b05, _0x4442c2, _0x3091d3, _0x260d63);
    if (_0x260d63 && _0x28814a) {
      const _0x379923 = () => {
        _0x4bfe08["delete"](_0x260d63);
      };
      _0x28814a["then"](_0x379923, _0x379923);
    }
    return _0x28814a;
  }, () => {
    for (const _0x481046 of _0x4bfe08) _0x481046["cancel"]();
    _0x4bfe08["clear"]();
  };
}
class BasemapController {
  constructor(_0x5b619a, _0x2455a9) {
    this["_basemapGeneration"] = 0, this["_basemapStatus"] = "ready", this["_fallbackBasemapLayer"] = null, this["viewer"] = _0x5b619a, this["deps"] = _0x2455a9;
  }
  get ["status"]() {
    return this["_basemapStatus"];
  }
  get ["currentBasemapId"]() {
    return this["_currentBasemapId"];
  }
  ["set"](_0x1f3d79) {
    var _a2, _b;
    (_a2 = this["_stopBasemapWatch"]) == null ? void 0 : _a2.call(this), (_b = this["_cancelBasemapRequests"]) == null ? void 0 : _b.call(this), this["_cancelBasemapRequests"] = void 0, this["deps"]["removeBasemapLayers"](), this["clearFallbackBasemap"]();
    const _0x3b8a0a = ++this["_basemapGeneration"];
    if (_0x1f3d79 === null || _0x1f3d79 === void 0) {
      this["_basemapStatus"] = "ready", this["_currentBasemapId"] = void 0;
      return;
    }
    const _0x1b6594 = typeof _0x1f3d79 === "string" ? { "id": _0x1f3d79 } : _0x1f3d79;
    if (!_0x1b6594["id"]) {
      this["_basemapStatus"] = "ready", this["_currentBasemapId"] = void 0;
      return;
    }
    this["_basemapStatus"] = "loading", this["_currentBasemapId"] = _0x1b6594["id"];
    const _0x12b767 = this["resolveBasemapUrl"](_0x1b6594), _0x4e1d12 = new UrlTemplateImageryProvider({ "url": _0x12b767 }), _0xef5fdb = trackProviderRequests(_0x4e1d12);
    this["_cancelBasemapRequests"] = _0xef5fdb;
    const _0x569d48 = this["viewer"]["imageryLayers"]["addImageryProvider"](_0x4e1d12, 0);
    this["deps"]["addBasemapImageryLayer"](BASEMAP_LAYER_ID, _0x1b6594["id"], _0x569d48), this["_stopBasemapWatch"] = watchBasemap(this["viewer"], { "ensureFallbackBasemap": () => this["ensureFallbackBasemap"](), "clearFallbackBasemap": () => this["clearFallbackBasemap"](), "removeBasemapLayer": () => {
      _0xef5fdb(), this["deps"]["removeLayer"](BASEMAP_LAYER_ID);
    }, "emit": (_0x4d9f31, _0x38b1bb) => this["deps"]["emit"](_0x4d9f31, _0x38b1bb), "setStatus": (_0x2d5d3a) => {
      this["_basemapStatus"] = _0x2d5d3a;
    }, "isCurrentGeneration": (_0x1612c2) => _0x1612c2 === this["_basemapGeneration"] }, _0x3b8a0a, _0x1b6594["id"], _0x569d48, _0x4e1d12);
  }
  ["stop"]() {
    var _a2, _b;
    (_a2 = this["_stopBasemapWatch"]) == null ? void 0 : _a2.call(this), (_b = this["_cancelBasemapRequests"]) == null ? void 0 : _b.call(this), this["_cancelBasemapRequests"] = void 0;
  }
  ["addFallbackBasemap"]() {
    const _0x121c3d = new SingleTileImageryProvider({ "url": FALLBACK_WORLD_IMAGE, "tileWidth": 5400, "tileHeight": 2700, "credit": "NASA Earth Observatory (Blue Marble)" }), _0x5c969f = this["viewer"]["imageryLayers"]["addImageryProvider"](_0x121c3d, 0);
    this["_fallbackBasemapLayer"] = _0x5c969f;
  }
  ["ensureFallbackBasemap"]() {
    if (this["_fallbackBasemapLayer"] !== null) return;
    try {
      this["addFallbackBasemap"]();
    } catch (_0xc59ac4) {
      console["warn"]("[tucbs-core] Basemap yedek goruntusu eklenemedi:", _0xc59ac4);
    }
  }
  ["clearFallbackBasemap"]() {
    this["_fallbackBasemapLayer"] !== null && (this["viewer"]["imageryLayers"]["remove"](this["_fallbackBasemapLayer"], !![]), this["_fallbackBasemapLayer"] = null);
  }
  ["resolveBasemapUrl"](_0x3e1965) {
    const _0x877b64 = (_0x23990d) => {
      const _0x187f04 = this["deps"]["getProxyBase"](), _0x1ab66d = _0x187f04 + "https://atlas.harita.gov.tr/" + _0x23990d + "/{z}/{x}/{y}.png";
      return this["appendTucbsApiKeyQuery"](_0x1ab66d);
    };
    switch (_0x3e1965["id"]) {
      case "hgm-temel":
        return _0x877b64("temel");
      case "hgm-ortofoto":
        return _0x877b64("ortofotoservis");
      case "hgm-siyasi":
        return _0x877b64("siyasi");
      case "hgm-yukseklik":
        return _0x877b64("yukseklik");
      default:
        return _0x3e1965["id"];
    }
  }
  ["appendTucbsApiKeyQuery"](_0x35b90c) {
    const _0x2307d4 = this["deps"]["getApiKey"]();
    if (!_0x2307d4) return _0x35b90c;
    const _0x3f9ea4 = _0x35b90c["includes"]("?") ? "&" : "?";
    return "" + _0x35b90c + _0x3f9ea4 + "tucbsapikey=" + encodeURIComponent(_0x2307d4);
  }
}
function nextFrame(_0x543cef) {
  return new Promise((_0x3baf3f) => {
    const _0x12622b = () => {
      _0x543cef["scene"]["postRender"]["removeEventListener"](_0x12622b), _0x3baf3f();
    };
    _0x543cef["scene"]["postRender"]["addEventListener"](_0x12622b), _0x543cef["scene"]["requestRender"]();
  });
}
async function captureCanvasBlob(_0x4b0fe6, _0x4caf53, _0x1c6087) {
  const _0x18522d = _0x4b0fe6["canvas"];
  if (typeof _0x18522d["toBlob"] === "function") return new Promise((_0x1944c6, _0xe6655) => {
    _0x18522d["toBlob"]((_0x3b8abc) => _0x3b8abc ? _0x1944c6(_0x3b8abc) : _0xe6655(new Error("canvas.toBlob basarisiz oldu")), _0x4caf53, _0x1c6087);
  });
  const _0x314e71 = _0x18522d["toDataURL"](_0x4caf53, _0x1c6087), _0x3a94b9 = _0x314e71["split"](",")[1] ?? "", _0x87c665 = atob(_0x3a94b9), _0x19d67e = new Uint8Array(_0x87c665["length"]);
  for (let _0x298922 = 0; _0x298922 < _0x87c665["length"]; _0x298922++) _0x19d67e[_0x298922] = _0x87c665["charCodeAt"](_0x298922);
  return new Blob([_0x19d67e], { "type": _0x4caf53 });
}
function measureGroundMetersPerPixel(_0x443439) {
  const _0x184cf0 = _0x443439["scene"], _0x32ef4c = _0x443439["camera"], _0x1d7f50 = _0x443439["canvas"], _0x480690 = _0x1d7f50["clientWidth"] / 2, _0x5cdaae = _0x1d7f50["clientHeight"] / 2, _0x1f8f0f = _0x32ef4c["getPickRay"](new Cartesian2(_0x480690 - 1, _0x5cdaae)), _0x232e39 = _0x32ef4c["getPickRay"](new Cartesian2(_0x480690 + 1, _0x5cdaae));
  if (!_0x1f8f0f || !_0x232e39) return null;
  const _0xa9ec3 = _0x184cf0["globe"]["pick"](_0x1f8f0f, _0x184cf0), _0x347ac9 = _0x184cf0["globe"]["pick"](_0x232e39, _0x184cf0);
  if (!_0xa9ec3 || !_0x347ac9) return null;
  return Cartesian3["distance"](_0xa9ec3, _0x347ac9) / 2;
}
function toOrientedDestination(_0x248053) {
  return { "destination": Cartesian3["fromDegrees"](_0x248053["longitude"], _0x248053["latitude"], _0x248053["height"]), "orientation": { "heading": _0x318bcf["toRadians"](_0x248053["heading"] ?? 0), "pitch": _0x318bcf["toRadians"](_0x248053["pitch"] ?? -90), "roll": _0x318bcf["toRadians"](_0x248053["roll"] ?? 0) } };
}
function setView(_0x1ebc83, _0x5e6295) {
  _0x1ebc83["camera"]["setView"](toOrientedDestination(_0x5e6295));
}
function setExtent(_0x9b1cd9, _0x46533c) {
  _0x9b1cd9["camera"]["setView"]({ "destination": Rectangle["fromDegrees"](_0x46533c["west"], _0x46533c["south"], _0x46533c["east"], _0x46533c["north"]) });
}
function flyTo(_0x5a9830, _0x1d8553) {
  _0x5a9830["camera"]["flyTo"](toOrientedDestination(_0x1d8553));
}
function zoomTo(_0x3aa45c, _0x559bc3, _0x489d17, _0x5930b0) {
  _0x3aa45c["camera"]["setView"]({ "destination": Cartesian3["fromDegrees"](_0x559bc3, _0x489d17, _0x5930b0) });
}
async function zoomToLayer(_0x1c8cc4, _0x2834ef) {
  return _0x1c8cc4["zoomTo"](_0x2834ef["cesiumObject"], new HeadingPitchRange(0, -_0x318bcf["PI_OVER_TWO"], 0));
}
function trimSlash(_0x14ac22) {
  return _0x14ac22["replace"](/\/+$/, "");
}
async function validateApiKey(_0x2f1448, _0x9480e0 = getUcbpApiBase()) {
  if (!_0x2f1448) return;
  const _0x585a56 = trimSlash(_0x9480e0) + "/auth/validate";
  let _0x2c8647;
  try {
    _0x2c8647 = await fetch(_0x585a56, { "method": "GET", "headers": { "X-API-Key": _0x2f1448 } });
  } catch (_0x3f4c2f) {
    const _0x4c7459 = _0x3f4c2f instanceof Error ? _0x3f4c2f["message"] : String(_0x3f4c2f);
    throw new ApiKeyValidationError(_0x4c7459);
  }
  if (!_0x2c8647["ok"]) {
    let _0x54bca5, _0x43c561, _0x46d99a, _0x5f149c;
    try {
      const _0x15b0bb = await _0x2c8647["json"]();
      _0x54bca5 = _0x15b0bb["title"], _0x43c561 = _0x15b0bb["message"] || _0x15b0bb["mesaj"], _0x46d99a = _0x15b0bb["reason"], _0x5f149c = _0x15b0bb["detail"];
    } catch {
    }
    const _0x5cd8ca = {};
    if (_0x54bca5 !== void 0) _0x5cd8ca["title"] = _0x54bca5;
    if (_0x46d99a !== void 0) _0x5cd8ca["reason"] = _0x46d99a;
    if (_0x5f149c !== void 0) _0x5cd8ca["detail"] = _0x5f149c;
    throw new ApiKeyValidationError(_0x43c561 || "HTTP " + _0x2c8647["status"], _0x5cd8ca);
  }
}
async function ensureEffectiveApiKeyValid(_0x517bc5, _0x554e4a) {
  const _0x4a30ab = _0x517bc5 || getGlobalApiKey();
  if (!_0x4a30ab) throw new ApiKeyValidationError("Haritayı görüntülemek için geçerli bir apiKey gereklidir.", { "title": "API Anahtarı Eksik", "reason": "missing-key", "code": "API_KEY_MISSING" });
  await validateApiKey(_0x4a30ab, _0x554e4a);
}
const DRAWING_LAYER_ID = "__tucbs_drawing_layer__", DRAWING_LAYER_TITLE = "Çizim Katmanı", MEASURE_LAYER_ID = "__tucbs_measure_layer__", MEASURE_LAYER_TITLE = "Ölçü Katmanı", MAX_ZOOM_DISTANCE_METERS = 25e6, MAX_ZOOM_OUT_SCALE_DENOMINATOR = 25e6, MAX_ZOOM_SCALE_DENOMINATOR = 100, MIN_ZOOM_DISTANCE_METERS = 10, DEFAULT_INITIAL_EXTENT = { "west": 22.94, "south": 34.05, "east": 47.39, "north": 42.7 };
let Map$1 = (_a = class {
  constructor(_0x4ccc21, _0x118eb9 = {}) {
    __privateAdd(this, _unregisterApiKeyRefresh);
    __privateAdd(this, _removeLodSeamGuard);
    __privateAdd(this, _removeMinZoomScale);
    __privateAdd(this, _removeScaleWheelZoom);
    __privateAdd(this, _apiKey3);
    ensureCesiumRuntime();
    const _0x14ed0e = document["createElement"]("div");
    _0x14ed0e["style"]["display"] = "none", this["viewer"] = new Viewer(_0x4ccc21, this["buildViewerOptions"](_0x118eb9, _0x14ed0e)), this["viewer"]["scene"]["globe"]["baseColor"] = Color["fromCssColorString"]("#a3c6e0"), this["viewer"]["scene"]["screenSpaceCameraController"]["maximumZoomDistance"] = MAX_ZOOM_DISTANCE_METERS, this["viewer"]["scene"]["screenSpaceCameraController"]["minimumZoomDistance"] = MIN_ZOOM_DISTANCE_METERS;
    const _0x34bb54 = _0x118eb9["apiKey"] ?? getGlobalApiKey();
    __privateSet(this, _apiKey3, _0x34bb54), this["layerManager"] = new LayerManager(this["viewer"]), this["selectionHighlight"] = new SelectionHighlight(this["viewer"]), this["layerManager"]["configure"]({ ..._0x34bb54 !== void 0 && { "apiKey": _0x34bb54 }, ..._0x118eb9["trustedApiKeyHosts"] !== void 0 && { "trustedApiKeyHosts": _0x118eb9["trustedApiKeyHosts"] }, ..._0x118eb9["apiKeyDiscoveryUrl"] !== void 0 && { "apiKeyDiscoveryUrl": _0x118eb9["apiKeyDiscoveryUrl"] } }), this["interactionManager"] = new InteractionManager(this["viewer"]), this["drawingManager"] = new DrawingManager(this["viewer"], this["interactionManager"]), this["analysisManager"] = new AnalysisManager({ "apiKey": _0x34bb54 ?? "" }), this["basemapController"] = new BasemapController(this["viewer"], { "removeBasemapLayers": () => this["layerManager"]["_removeBasemapLayers"](), "addBasemapImageryLayer": (_0x71e423, _0x396d0a, _0x50aeed) => this["layerManager"]["_addBasemapImageryLayer"](_0x71e423, _0x396d0a, _0x50aeed), "removeLayer": (_0x30eaf0) => this["layerManager"]["removeLayer"](_0x30eaf0), "emit": (_0x1d99d0, _0x11fb76) => this["layerManager"]["emit"](_0x1d99d0, _0x11fb76), "getProxyBase": () => getProxyBase(), "getApiKey": () => __privateGet(this, _apiKey3) }), _0x118eb9["apiKey"] === void 0 && this["registerGlobalApiKeyRotation"](_0x34bb54), this["wireShapeSource"]("draw", DRAWING_LAYER_ID, DRAWING_LAYER_TITLE, (_0xdc447e, _0x4f9491, _0x2b20b3) => this["layerManager"]["_addDrawnShape"](_0xdc447e, _0x4f9491, _0x2b20b3)), this["wireShapeSource"]("measure", MEASURE_LAYER_ID, MEASURE_LAYER_TITLE, (_0xa03b38, _0x4ffb82, _0x3e3d0f) => this["layerManager"]["_addMeasuredShape"](_0xa03b38, _0x4ffb82, _0x3e3d0f)), _0x118eb9["camera"] !== void 0 ? this["setView"](_0x118eb9["camera"]) : this["setExtent"](_0x118eb9["initialExtent"] ?? DEFAULT_INITIAL_EXTENT), __privateSet(this, _removeLodSeamGuard, installLodSeamGuard(this["viewer"])), __privateSet(this, _removeMinZoomScale, installMinZoomScale(this["viewer"], MAX_ZOOM_SCALE_DENOMINATOR, MAX_ZOOM_OUT_SCALE_DENOMINATOR)), __privateSet(this, _removeScaleWheelZoom, installScaleWheelZoom(this["viewer"])), this["setBasemap"](_0x118eb9["basemap"]);
  }
  async ["ensureApiKeyValid"]() {
    await validateApiKey(__privateGet(this, _apiKey3) ?? "", getUcbpApiBase());
  }
  async ["runBuffer"](_0x307c0f, _0x49ee6d) {
    const _0x4a0594 = await this["analysisManager"]["buffer"](_0x307c0f), _0x335035 = (_0x49ee6d == null ? void 0 : _0x49ee6d["id"]) ?? "buffer-" + Date["now"](), _0x20a179 = (_0x49ee6d == null ? void 0 : _0x49ee6d["title"]) ?? "Tampon sonucu (" + _0x307c0f["distanceM"] + "m)";
    this["layerManager"]["markAnalysisResult"](_0x335035);
    const _0x1aaebe = await this["layerManager"]["add"]("GEOJSON", { "id": _0x335035, "title": _0x20a179, "data": _0x4a0594["geojson"], "layerType": "GEOJSON", "clampToGround": !![] });
    return _0x1aaebe;
  }
  async ["runIntersection"](_0x43f3cd, _0x10bdd9) {
    const _0x3e279f = await this["analysisManager"]["intersection"](_0x43f3cd), _0x4b925b = (_0x10bdd9 == null ? void 0 : _0x10bdd9["id"]) ?? "intersection-" + Date["now"](), _0x27251a = (_0x10bdd9 == null ? void 0 : _0x10bdd9["title"]) ?? "Kesişim sonucu";
    this["layerManager"]["markAnalysisResult"](_0x4b925b);
    const _0x25c2c4 = await this["layerManager"]["add"]("GEOJSON", { "id": _0x4b925b, "title": _0x27251a, "data": _0x3e279f["geojson"], "layerType": "GEOJSON", "clampToGround": !![] });
    return _0x25c2c4;
  }
  async ["runBoundary"](_0x1186db, _0x368212) {
    const _0x107802 = await this["analysisManager"]["boundary"](_0x1186db);
    return this["addAnalysisGeoJson"]((_0x368212 == null ? void 0 : _0x368212["id"]) ?? "boundary-" + Date["now"](), (_0x368212 == null ? void 0 : _0x368212["title"]) ?? "Sınır sonucu", _0x107802["geojson"]);
  }
  async ["runClip"](_0xb21cf6, _0x39ddcc) {
    const _0x4728db = await this["analysisManager"]["clip"](_0xb21cf6);
    return this["addAnalysisGeoJson"]((_0x39ddcc == null ? void 0 : _0x39ddcc["id"]) ?? "clip-" + Date["now"](), (_0x39ddcc == null ? void 0 : _0x39ddcc["title"]) ?? "Kırpma sonucu", _0x4728db["geojson"]);
  }
  async ["runDifference"](_0x583e0a, _0x20d6db) {
    const _0x54fb5f = await this["analysisManager"]["difference"](_0x583e0a);
    return this["addAnalysisGeoJson"]((_0x20d6db == null ? void 0 : _0x20d6db["id"]) ?? "difference-" + Date["now"](), (_0x20d6db == null ? void 0 : _0x20d6db["title"]) ?? "Fark sonucu", _0x54fb5f["geojson"]);
  }
  async ["runSubtract"](_0x463c5a, _0x3b14b7) {
    const _0x2b0f96 = await this["analysisManager"]["subtract"](_0x463c5a);
    return this["addAnalysisGeoJson"]((_0x3b14b7 == null ? void 0 : _0x3b14b7["id"]) ?? "subtract-" + Date["now"](), (_0x3b14b7 == null ? void 0 : _0x3b14b7["title"]) ?? "Çıkarma sonucu", _0x2b0f96["geojson"]);
  }
  async ["runUnion"](_0x4b5851, _0x451e7c) {
    const _0x1189b6 = await this["analysisManager"]["union"](_0x4b5851);
    return this["addAnalysisGeoJson"]((_0x451e7c == null ? void 0 : _0x451e7c["id"]) ?? "union-" + Date["now"](), (_0x451e7c == null ? void 0 : _0x451e7c["title"]) ?? "Birleştir sonucu", _0x1189b6["geojson"]);
  }
  async ["runWedgeBuffer"](_0x5002b0, _0x2ab4f5) {
    const _0x57860f = await this["analysisManager"]["wedgeBuffer"](_0x5002b0);
    return this["addAnalysisGeoJson"]((_0x2ab4f5 == null ? void 0 : _0x2ab4f5["id"]) ?? "wedge-" + Date["now"](), (_0x2ab4f5 == null ? void 0 : _0x2ab4f5["title"]) ?? "Kama tampon sonucu", _0x57860f["geojson"]);
  }
  async ["addAnalysisGeoJson"](_0x1c5500, _0x22a29b, _0x3e4472) {
    return this["layerManager"]["markAnalysisResult"](_0x1c5500), this["layerManager"]["add"]("GEOJSON", { "id": _0x1c5500, "title": _0x22a29b, "data": _0x3e4472, "layerType": "GEOJSON", "clampToGround": !![] });
  }
  ["setView"](_0x4c6282) {
    setView(this["viewer"], _0x4c6282);
  }
  ["setExtent"](_0x19fcb6) {
    setExtent(this["viewer"], _0x19fcb6);
  }
  ["flyTo"](_0x1f4e83) {
    flyTo(this["viewer"], _0x1f4e83);
  }
  ["zoomTo"](_0x5a34d2, _0x38bd3d, _0x24c902) {
    zoomTo(this["viewer"], _0x5a34d2, _0x38bd3d, _0x24c902);
  }
  ["zoomInStep"]() {
    scaleZoomStep(this["viewer"], 1);
  }
  ["zoomOutStep"]() {
    scaleZoomStep(this["viewer"], -1);
  }
  async ["zoomToLayer"](_0x27ca07) {
    return zoomToLayer(this["viewer"], _0x27ca07);
  }
  ["dropMarker"](_0x58490e, _0x22b607, _0x46e48e, _0x1cbc1f = {}) {
    this["clearMarker"](), this["_removeMarker"] = createMarkerOverlay(this["viewer"], _0x58490e, _0x22b607, _0x46e48e, _0x1cbc1f);
  }
  ["clearMarker"]() {
    var _a2;
    (_a2 = this["_removeMarker"]) == null ? void 0 : _a2.call(this), this["_removeMarker"] = void 0;
  }
  get ["basemapStatus"]() {
    return this["basemapController"]["status"];
  }
  ["setBasemap"](_0x4383de) {
    this["basemapController"]["set"](_0x4383de);
  }
  ["setMode"](_0x20eaeb) {
    _0x20eaeb === "2D" ? this["viewer"]["scene"]["morphTo2D"](0) : this["viewer"]["scene"]["morphTo3D"](0);
  }
  ["setQuality"](_0x17c5a6) {
    const _0x1cb508 = Math["min"](100, Math["max"](0, _0x17c5a6));
    this["viewer"]["resolutionScale"] = Math["max"](0.1, _0x1cb508 / 100);
  }
  ["resize"]() {
    this["viewer"]["resize"]();
  }
  async ["exportJPEG"](_0x4d3c02 = "tucbs-harita", _0x20c075 = 0.92) {
    const _0x8ce505 = await this["captureScreenshotBlob"](_0x20c075);
    triggerDownload(_0x8ce505, _0x4d3c02 + "-" + Date["now"]() + ".jpg");
  }
  async ["captureScreenshotBlob"](_0x5a24f2 = 0.92) {
    return await nextFrame(this["viewer"]), captureCanvasBlob(this["viewer"], "image/jpeg", _0x5a24f2);
  }
  ["measureGroundMetersPerPixel"]() {
    return measureGroundMetersPerPixel(this["viewer"]);
  }
  ["buildViewerOptions"](_0x4f3a98, _0x556fd5) {
    return { "timeline": _0x4f3a98["timeline"] ?? ![], "animation": _0x4f3a98["animation"] ?? ![], "baseLayerPicker": _0x4f3a98["baseLayerPicker"] ?? ![], "baseLayer": ![], "geocoder": _0x4f3a98["geocoder"] ?? ![], "homeButton": _0x4f3a98["homeButton"] ?? ![], "sceneModePicker": _0x4f3a98["sceneModePicker"] ?? ![], "navigationHelpButton": _0x4f3a98["navigationHelpButton"] ?? ![], "infoBox": _0x4f3a98["infoBox"] ?? ![], "selectionIndicator": _0x4f3a98["selectionIndicator"] ?? ![], "shadows": _0x4f3a98["shadows"] ?? ![], "shouldAnimate": _0x4f3a98["shouldAnimate"] ?? ![], "fullscreenButton": _0x4f3a98["fullscreenButton"] ?? ![], "creditContainer": _0x556fd5, ..._0x4f3a98["cesiumOptions"] };
  }
  ["registerGlobalApiKeyRotation"](_0x169999) {
    _0x169999 !== void 0 && console["info"]("[@tucbs/core] Bu Map instance'i configureTucbs() global apiKey'ini kullaniyor (kendi apiKey attribute'u/options'u verilmedi). Farkli bir anahtar gerekiyorsa Map/component'e acikca apiKey verin."), __privateSet(this, _unregisterApiKeyRefresh, registerApiKeyRefresh(() => {
      const _0x1d4e9b = getGlobalApiKey();
      __privateSet(this, _apiKey3, _0x1d4e9b), this["layerManager"]["configure"]({ ..._0x1d4e9b !== void 0 && { "apiKey": _0x1d4e9b } }), this["analysisManager"]["configure"]({ "apiKey": _0x1d4e9b ?? "" }), void this["ensureApiKeyValid"]()["catch"]((_0x472b96) => {
        console["error"]("[@tucbs/core] apiKey rotasyon validate basarisiz:", _0x472b96);
      }), this["basemapController"]["currentBasemapId"] !== void 0 && this["setBasemap"](this["basemapController"]["currentBasemapId"]);
    }));
  }
  ["wireShapeSource"](_0x3747a2, _0x586e1b, _0x246328, _0x1f89af) {
    this["drawingManager"]["on"]("draw:complete", ({ shape: _0x411746 }) => {
      if (_0x411746["source"] !== _0x3747a2) return;
      void _0x1f89af(_0x586e1b, _0x246328, _0x411746);
    }), this["drawingManager"]["on"]("draw:remove", ({ shape: _0x4176b2 }) => {
      if (_0x4176b2["source"] !== _0x3747a2) return;
      this["layerManager"]["_removeDrawnShape"](_0x586e1b, _0x4176b2["entity"]);
    });
  }
  ["showSelectionHighlight"](_0x1e05d8) {
    this["selectionHighlight"]["show"](_0x1e05d8);
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
