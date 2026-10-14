"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _apiKey, _apiKey2, _AnalysisManager_instances, post_fn, _unregisterApiKeyRefresh, _removeLodSeamGuard, _removeMinZoomScale, _removeScaleWheelZoom, _apiKey3, _a;
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const cesium = require("cesium");
var _documentCurrentScript = typeof document !== "undefined" ? document.currentScript : null;
const MAX_LEVEL = 24;
const EARTH_RADIUS = 6371e3;
const CORNER_SAFETY = 1.15;
function cornerDistanceRatio(fovy, aspectRatio, height) {
  const tanY = Math.tan(fovy / 2);
  const tanX = tanY * aspectRatio;
  const theta = Math.atan(Math.hypot(tanX, tanY));
  const center = EARTH_RADIUS + height;
  const discriminant = EARTH_RADIUS * EARTH_RADIUS - center * center * Math.sin(theta) ** 2;
  const distance = discriminant > 0 ? center * Math.cos(theta) - Math.sqrt(discriminant) : Math.sqrt(center * center - EARTH_RADIUS * EARTH_RADIUS);
  return distance / height * CORNER_SAFETY;
}
function lodTransitionDistances(params) {
  const { drawingBufferHeight, sseDenominator, maximumScreenSpaceError, pixelRatio } = params;
  const out = [];
  for (let level = 0; level <= MAX_LEVEL; level++) {
    const d = params.geometricError(level) * drawingBufferHeight / (sseDenominator * maximumScreenSpaceError * pixelRatio);
    if (Number.isFinite(d) && d > 0) out.push(d);
  }
  return out.sort((a, b) => a - b);
}
const SEAM_MARGIN = 1.01;
function seamFreeScreenSpaceError(height, params) {
  const base = params.maximumScreenSpaceError;
  const ratio = cornerDistanceRatio(params.fovy, params.aspectRatio, height);
  for (const threshold of lodTransitionDistances(params)) {
    if (threshold > height && threshold < height * ratio) {
      const coarser = base * (threshold / height) * SEAM_MARGIN;
      const finer = base * threshold / (height * ratio * SEAM_MARGIN);
      return Math.abs(Math.log(coarser / base)) <= Math.abs(Math.log(finer / base)) ? coarser : finer;
    }
  }
  return base;
}
const NADIR_TOLERANCE_DEGREES = 3;
function installLodSeamGuard(viewer) {
  const scene = viewer.scene;
  const globe = scene.globe;
  if (!globe) return () => void 0;
  let base = globe.maximumScreenSpaceError;
  let applied = base;
  const apply = (value) => {
    if (globe.maximumScreenSpaceError !== value) globe.maximumScreenSpaceError = value;
    applied = value;
  };
  const onPreRender = () => {
    if (globe.maximumScreenSpaceError !== applied) base = globe.maximumScreenSpaceError;
    const frustum = scene.camera.frustum;
    const nadir = Math.abs(cesium.Math.toDegrees(scene.camera.pitch) + 90) <= NADIR_TOLERANCE_DEGREES;
    if (scene.mode !== cesium.SceneMode.SCENE3D || !nadir || !(scene.terrainProvider instanceof cesium.EllipsoidTerrainProvider) || frustum.fovy === void 0 || frustum.aspectRatio === void 0 || frustum.sseDenominator === void 0) {
      apply(base);
      return;
    }
    const terrain = scene.terrainProvider;
    const params = {
      geometricError: (level) => terrain.getLevelMaximumGeometricError(level),
      drawingBufferHeight: scene.drawingBufferHeight,
      sseDenominator: frustum.sseDenominator,
      maximumScreenSpaceError: base,
      // Scene.pixelRatio calisma zamaninda public ama Cesium tip tanimlarinda yok.
      pixelRatio: scene.pixelRatio ?? 1,
      fovy: frustum.fovy,
      aspectRatio: frustum.aspectRatio
    };
    apply(seamFreeScreenSpaceError(scene.camera.positionCartographic.height, params));
  };
  const remove = scene.preRender.addEventListener(onPreRender);
  return () => {
    remove();
    if (!scene.isDestroyed() && globe.maximumScreenSpaceError === applied) {
      globe.maximumScreenSpaceError = base;
    }
  };
}
const SCREEN_DPI$1 = 96;
const METERS_PER_INCH$1 = 0.0254;
const REWRITE_TOLERANCE = 5e-3;
function minZoomDistanceForScale(scaleDenominator, canvasHeightPx, fovy) {
  const tanHalf = Math.tan(fovy / 2);
  const distance = scaleDenominator * METERS_PER_INCH$1 / SCREEN_DPI$1 * canvasHeightPx / (2 * tanHalf);
  return Number.isFinite(distance) && distance > 0 ? distance : null;
}
const SNAP_WINDOW_RATIO = 1.06;
const MIN_SNAP_GAP_METERS = 1e-3;
const SNAP_DURATION_MS = 150;
function snapToMinAmount(height, minDistance) {
  const gap = height - minDistance;
  if (!(gap > MIN_SNAP_GAP_METERS) || height > minDistance * SNAP_WINDOW_RATIO) return 0;
  return gap;
}
function installMinZoomScale(viewer, scaleDenominator, maxScaleDenominator) {
  const scene = viewer.scene;
  const controller = scene.screenSpaceCameraController;
  const onPreRender = () => {
    const fovy = scene.camera.frustum.fovy;
    if (fovy === void 0) return;
    const height = scene.canvas.clientHeight;
    const distance = minZoomDistanceForScale(scaleDenominator, height, fovy);
    if (distance !== null) {
      const current = controller.minimumZoomDistance;
      if (Math.abs(current - distance) > current * REWRITE_TOLERANCE) {
        controller.minimumZoomDistance = distance;
      }
    }
    const maxDistance = minZoomDistanceForScale(maxScaleDenominator, height, fovy);
    if (maxDistance === null) return;
    const currentMax = controller.maximumZoomDistance;
    if (Math.abs(currentMax - maxDistance) > currentMax * REWRITE_TOLERANCE) {
      controller.maximumZoomDistance = maxDistance;
    }
  };
  const camera = scene.camera;
  const canvas = scene.canvas;
  let frame;
  const cancelSnap = () => {
    if (frame !== void 0) cancelAnimationFrame(frame);
    frame = void 0;
  };
  const onMoveEnd = () => {
    if (frame !== void 0) return;
    const total = snapToMinAmount(
      camera.positionCartographic.height,
      controller.minimumZoomDistance
    );
    if (total <= 0) return;
    const start = performance.now();
    let done = 0;
    const step = (now) => {
      const t = Math.min(1, (now - start) / SNAP_DURATION_MS);
      const target = total * (1 - (1 - t) * (1 - t));
      if (target > done) camera.zoomIn(target - done);
      done = target;
      frame = t < 1 ? requestAnimationFrame(step) : void 0;
    };
    frame = requestAnimationFrame(step);
  };
  canvas.addEventListener("pointerdown", cancelSnap);
  canvas.addEventListener("wheel", cancelSnap, { passive: true });
  const removePreRender = scene.preRender.addEventListener(onPreRender);
  const removeMoveEnd = camera.moveEnd.addEventListener(onMoveEnd);
  return () => {
    cancelSnap();
    canvas.removeEventListener("pointerdown", cancelSnap);
    canvas.removeEventListener("wheel", cancelSnap);
    removePreRender();
    removeMoveEnd();
  };
}
const ZOOM_SCALE_STEPS = [
  100,
  250,
  500,
  1e3,
  2500,
  5e3,
  1e4,
  25e3,
  5e4,
  1e5,
  25e4,
  5e5,
  1e6,
  25e5,
  5e6,
  15e6,
  25e6
];
const ON_STEP_TOLERANCE = 0.03;
function nextScaleStep(current, direction) {
  if (!(current > 0) || !Number.isFinite(current)) return null;
  if (direction === 1) {
    const limit2 = current / (1 + ON_STEP_TOLERANCE);
    return [...ZOOM_SCALE_STEPS].reverse().find((s) => s < limit2) ?? null;
  }
  const limit = current * (1 + ON_STEP_TOLERANCE);
  return ZOOM_SCALE_STEPS.find((s) => s > limit) ?? Infinity;
}
const SCREEN_DPI = 96;
const METERS_PER_INCH = 0.0254;
function measureGround(scene) {
  const globe = scene.globe;
  if (!globe) return null;
  const camera = scene.camera;
  const x = scene.canvas.clientWidth / 2;
  const y = scene.canvas.clientHeight / 2;
  const left = camera.getPickRay(new cesium.Cartesian2(x - 1, y));
  const right = camera.getPickRay(new cesium.Cartesian2(x + 1, y));
  const middle = camera.getPickRay(new cesium.Cartesian2(x, y));
  if (!left || !right || !middle) return null;
  const leftPos = globe.pick(left, scene);
  const rightPos = globe.pick(right, scene);
  const middlePos = globe.pick(middle, scene);
  if (!leftPos || !rightPos || !middlePos) return null;
  const metersPerPixel = cesium.Cartesian3.distance(leftPos, rightPos) / 2;
  return {
    scale: metersPerPixel * SCREEN_DPI / METERS_PER_INCH,
    distance: cesium.Cartesian3.distance(camera.position, middlePos)
  };
}
const DISPLAY_SNAP_TOLERANCE = 5e-3;
function snapScaleForDisplay(scale) {
  const near = ZOOM_SCALE_STEPS.find((s) => Math.abs(scale - s) <= s * DISPLAY_SNAP_TOLERANCE);
  return near ?? scale;
}
const ZOOM_ANIMATION_SECONDS = 0.25;
function easeOut(t) {
  return 1 - Math.pow(1 - t, 3);
}
const pendingZooms = /* @__PURE__ */ new WeakMap();
function planStepAmount(ground, direction, height, maxHeight) {
  const next = nextScaleStep(ground.scale, direction);
  if (next === null) return null;
  let amount = next === Infinity ? Infinity : ground.distance * Math.abs(1 - next / ground.scale);
  if (direction === -1) amount = Math.min(amount, maxHeight - height);
  return amount > 0 && Number.isFinite(amount) ? amount : null;
}
function flyScaleStep(camera, direction, measure, maxHeight) {
  const pending = pendingZooms.get(camera);
  const ground = (pending == null ? void 0 : pending.ground) ?? measure();
  if (!ground) return;
  const height = (pending == null ? void 0 : pending.height) ?? camera.positionCartographic.height;
  const amount = planStepAmount(ground, direction, height, maxHeight);
  if (amount === null) return;
  const from = (pending == null ? void 0 : pending.position) ?? camera.position;
  const dir = camera.direction;
  const destination = camera.position.clone();
  destination.x = from.x + dir.x * amount * direction;
  destination.y = from.y + dir.y * amount * direction;
  destination.z = from.z + dir.z * amount * direction;
  const distance = ground.distance - direction * amount;
  const target = {
    ground: { scale: ground.scale * distance / ground.distance, distance },
    height: height - direction * amount,
    position: destination
  };
  const clear = () => {
    if (pendingZooms.get(camera) === target) pendingZooms.delete(camera);
  };
  camera.flyTo({
    destination,
    orientation: { direction: dir.clone(), up: camera.up.clone() },
    duration: ZOOM_ANIMATION_SECONDS,
    easingFunction: easeOut,
    complete: clear,
    cancel: clear
  });
  pendingZooms.set(camera, target);
}
function scaleZoomStep(viewer, direction) {
  const { camera, scene } = viewer;
  flyScaleStep(
    camera,
    direction,
    () => measureGround(scene),
    scene.screenSpaceCameraController.maximumZoomDistance
  );
}
const WHEEL_STEP_THRESHOLD_PX = 40;
const WHEEL_SMALL_DELTA_LOCK_MS = 200;
const LINE_HEIGHT_PX = 16;
const PAGE_HEIGHT_PX = 400;
function wheelDeltaPixels(deltaY, deltaMode) {
  if (deltaMode === 1) return deltaY * LINE_HEIGHT_PX;
  if (deltaMode === 2) return deltaY * PAGE_HEIGHT_PX;
  return deltaY;
}
function installScaleWheelZoom(viewer) {
  const canvas = viewer.scene.canvas;
  const controller = viewer.scene.screenSpaceCameraController;
  const previousZoomTypes = controller.zoomEventTypes;
  controller.zoomEventTypes = [cesium.CameraEventType.MIDDLE_DRAG, cesium.CameraEventType.PINCH];
  let accumulated = 0;
  let lockedUntil = 0;
  const onWheel = (event) => {
    event.preventDefault();
    const delta = wheelDeltaPixels(event.deltaY, event.deltaMode);
    if (delta === 0) return;
    const now = performance.now();
    if (Math.abs(delta) < WHEEL_STEP_THRESHOLD_PX && now < lockedUntil) return;
    if (Math.sign(delta) !== Math.sign(accumulated)) accumulated = 0;
    accumulated += delta;
    if (Math.abs(accumulated) < WHEEL_STEP_THRESHOLD_PX) return;
    scaleZoomStep(viewer, accumulated < 0 ? 1 : -1);
    accumulated = 0;
    lockedUntil = now + WHEEL_SMALL_DELTA_LOCK_MS;
  };
  canvas.addEventListener("wheel", onWheel, { passive: false });
  return () => {
    canvas.removeEventListener("wheel", onWheel);
    controller.zoomEventTypes = previousZoomTypes;
  };
}
function createMarkerOverlay(viewer, longitude, latitude, iconUrl, options = {}) {
  const position = cesium.Cartesian3.fromDegrees(longitude, latitude);
  const normal = cesium.Ellipsoid.WGS84.geodeticSurfaceNormal(position, new cesium.Cartesian3());
  const toCamera = new cesium.Cartesian3();
  const scratch = new cesium.Cartesian2();
  const img = document.createElement("img");
  img.src = iconUrl;
  img.alt = "";
  img.draggable = false;
  Object.assign(img.style, {
    position: "absolute",
    left: "0",
    top: "0",
    display: "none",
    pointerEvents: "none",
    userSelect: "none",
    zIndex: "1",
    willChange: "transform",
    ...options.width === void 0 ? {} : { width: `${options.width}px` },
    ...options.height === void 0 ? {} : { height: `${options.height}px` }
  });
  viewer.container.appendChild(img);
  const update = () => {
    const { scene } = viewer;
    let visible = true;
    if (scene.mode === cesium.SceneMode.SCENE3D) {
      cesium.Cartesian3.subtract(scene.camera.positionWC, position, toCamera);
      visible = cesium.Cartesian3.dot(normal, toCamera) > 0;
    }
    const canvasPosition = visible ? scene.cartesianToCanvasCoordinates(position, scratch) : void 0;
    if (!canvasPosition) {
      img.style.display = "none";
      return;
    }
    img.style.display = "block";
    const x = Math.round(canvasPosition.x - img.offsetWidth / 2);
    const y = Math.round(canvasPosition.y - (options.anchor === "center" ? img.offsetHeight / 2 : img.offsetHeight));
    img.style.transform = `translate(${x}px, ${y}px)`;
  };
  const removeListener = viewer.scene.postRender.addEventListener(update);
  img.addEventListener("load", update);
  update();
  return () => {
    removeListener();
    img.remove();
  };
}
class EventEmitter {
  constructor() {
    this.listeners = {};
  }
  /**
   * Bir event için dinleyici ekler.
   * @param event - Dinlenecek event adı.
   * @param listener - Event yayıldığında çağrılacak fonksiyon.
   * @returns Zincirleme çağrılar için `this`.
   */
  on(event, listener) {
    const existing = this.listeners[event];
    if (existing !== void 0) {
      existing.add(listener);
    } else {
      this.listeners[event] = /* @__PURE__ */ new Set([listener]);
    }
    return this;
  }
  /**
   * `on()` ile eklenmiş bir dinleyiciyi kaldırır.
   * @param event - Dinleyicinin kayıtlı olduğu event adı.
   * @param listener - Kaldırılacak dinleyici (referans eşitliğiyle bulunur).
   * @returns Zincirleme çağrılar için `this`.
   */
  off(event, listener) {
    var _a2;
    (_a2 = this.listeners[event]) == null ? void 0 : _a2.delete(listener);
    return this;
  }
  /**
   * Bir event için, sadece BİR KEZ tetiklenecek bir dinleyici ekler; ilk
   * tetiklenmenin ardından dinleyici otomatik olarak `off()` ile kaldırılır.
   * @param event - Dinlenecek event adı.
   * @param listener - Event ilk yayıldığında çağrılacak fonksiyon.
   * @returns Zincirleme çağrılar için `this`.
   */
  once(event, listener) {
    const wrapper = (payload) => {
      listener(payload);
      this.off(event, wrapper);
    };
    return this.on(event, wrapper);
  }
  /**
   * Bir event'i, verilen payload ile kayıtlı tüm dinleyicilere senkron olarak yayar.
   * @param event - Yayılacak event adı.
   * @param payload - Dinleyicilere iletilecek veri.
   */
  emit(event, payload) {
    const set = this.listeners[event];
    if (set === void 0) return;
    for (const listener of set) {
      listener(payload);
    }
  }
  /**
   * Dinleyicileri temizler.
   * @param event - Verilirse SADECE bu event'in dinleyicileri; verilmezse TÜM event'lerin tüm dinleyicileri kaldırılır.
   */
  removeAllListeners(event) {
    if (event !== void 0) {
      delete this.listeners[event];
    } else {
      for (const key of Object.keys(this.listeners)) {
        delete this.listeners[key];
      }
    }
  }
  /**
   * Bir event için kayıtlı dinleyici sayısını döner.
   * @param event - Sayılacak event adı.
   * @returns Kayıtlı dinleyici sayısı (hiç yoksa `0`).
   */
  listenerCount(event) {
    var _a2;
    return ((_a2 = this.listeners[event]) == null ? void 0 : _a2.size) ?? 0;
  }
}
const GLOBAL_STATE_SLOT = Symbol.for("@tucbs/core/globalConfigState");
function getState() {
  const registry = globalThis;
  let state = registry[GLOBAL_STATE_SLOT];
  if (!state) {
    state = {
      apiKey: void 0,
      apiBase: void 0,
      proxyBase: void 0,
      configured: false,
      refreshers: /* @__PURE__ */ new Set()
    };
    Object.defineProperty(globalThis, GLOBAL_STATE_SLOT, {
      value: state,
      enumerable: false,
      configurable: false,
      writable: false
    });
  }
  return state;
}
function configureTucbs(config) {
  const state = getState();
  if (config.apiBase !== void 0) {
    const trimmed = config.apiBase.trim().replace(/\/+$/, "");
    state.apiBase = trimmed || void 0;
    state.configured = true;
  }
  if (config.proxyBase !== void 0) {
    const trimmed = config.proxyBase.trim();
    state.proxyBase = trimmed || void 0;
    state.configured = true;
  }
  if (config.apiKey === void 0) {
    if (state.configured) {
      state.refreshers.forEach((refresh) => refresh());
    }
    return;
  }
  if (state.apiKey !== void 0 && config.apiKey !== state.apiKey) {
    console.warn(
      "[@tucbs/core] configureTucbs() daha once farkli bir apiKey ile cagrilmisti; deger degistirildi. Bu beklenmiyorsa sayfada birden fazla script'in ayni fonksiyonu cagirdigini kontrol edin."
    );
  }
  state.apiKey = config.apiKey;
  state.configured = true;
  state.refreshers.forEach((refresh) => refresh());
}
function getGlobalApiBase() {
  return getState().apiBase;
}
function getGlobalProxyBase() {
  return getState().proxyBase;
}
function getGlobalApiKey() {
  return getState().apiKey;
}
function registerApiKeyRefresh(fn) {
  const { refreshers } = getState();
  refreshers.add(fn);
  return () => refreshers.delete(fn);
}
const DEFAULT_UCBP_API_BASE = ("http://localhost:8094/ucbp-api" == null ? void 0 : "http://localhost:8094/ucbp-api".trim()) || "/ucbp-api";
function trimSlash$2(url) {
  return url.replace(/\/+$/, "");
}
function getUcbpApiBase() {
  const runtime = getGlobalApiBase();
  if (runtime) {
    return trimSlash$2(runtime);
  }
  return trimSlash$2(DEFAULT_UCBP_API_BASE);
}
function getProxyBase() {
  const runtime = getGlobalProxyBase();
  if (runtime) {
    return runtime;
  }
  console.warn("proxyBase yok; configureTucbs({ proxyBase }) verilmedi. main.js'te verilmeli.");
  return "";
}
const ERROR_REGISTRY = {
  API_KEY_MISSING: {
    code: "API_KEY_MISSING",
    number: "E001",
    title: "API Anahtarı Eksik",
    description: "Ne instance ne configureTucbs() ile ayarlanmış global apiKey sağlanmış."
  },
  API_KEY_INVALID: {
    code: "API_KEY_INVALID",
    number: "E002",
    title: "API Anahtarı Geçersiz",
    description: "Sağlanan apiKey backend tarafından reddedildi veya doğrulama isteği başarısız oldu."
  },
  INTERNAL_INDEX_OUT_OF_RANGE: {
    code: "INTERNAL_INDEX_OUT_OF_RANGE",
    number: "E003",
    title: "İç Durum Hatası",
    description: "Beklenen bir dizi indeksi bulunamadı (iç tutarlılık hatası)."
  },
  OGC_CAPABILITIES_REQUEST_FAILED: {
    code: "OGC_CAPABILITIES_REQUEST_FAILED",
    number: "E201",
    title: "GetCapabilities İsteği Başarısız",
    description: "WFS GetCapabilities isteği HTTP hata koduyla döndü."
  },
  OGC_CAPABILITIES_EXCEPTION: {
    code: "OGC_CAPABILITIES_EXCEPTION",
    number: "E202",
    title: "GetCapabilities OGC Exception",
    description: "WFS GetCapabilities yanıtı bir OGC ExceptionReport/ServiceExceptionReport döndürdü."
  },
  OGC_CAPABILITIES_PARSE_FAILED: {
    code: "OGC_CAPABILITIES_PARSE_FAILED",
    number: "E203",
    title: "GetCapabilities Ayrıştırma Hatası",
    description: "WFS GetCapabilities yanıtı geçerli XML olarak ayrıştırılamadı."
  },
  OGC_FEATURE_TYPE_NOT_FOUND: {
    code: "OGC_FEATURE_TYPE_NOT_FOUND",
    number: "E204",
    title: "FeatureType Bulunamadı",
    description: "WFS GetCapabilities yanıtında hiç FeatureType bulunamadı."
  },
  CRS_UNRESOLVED_UNSUPPORTED: {
    code: "CRS_UNRESOLVED_UNSUPPORTED",
    number: "E401",
    title: "Koordinat Sistemi Tanınamadı",
    description: "GeoJSON'daki koordinat sistemi (CRS) çözülemedi ve koordinatlar WGS84 ile uyumlu değil."
  },
  CRS_CLAIMED_WGS84_INVALID: {
    code: "CRS_CLAIMED_WGS84_INVALID",
    number: "E402",
    title: "Koordinatlar WGS84 İle Uyumsuz",
    description: "GeoJSON WGS84/CRS84 olduğunu belirtiyor ama koordinatlar geçerli bir enlem/boylam aralığında değil."
  },
  CRS_MISSING_UNSUPPORTED: {
    code: "CRS_MISSING_UNSUPPORTED",
    number: "E403",
    title: "Koordinat Sistemi Bilgisi Yok",
    description: "GeoJSON'da CRS bilgisi yok ve koordinatlar geçerli bir enlem/boylam aralığında değil."
  },
  ANALYSIS_API_KEY_MISSING: {
    code: "ANALYSIS_API_KEY_MISSING",
    number: "E301",
    title: "Analiz İçin API Anahtarı Eksik",
    description: "AnalysisManager'a apiKey tanımlanmadan analiz isteği yapıldı."
  },
  ANALYSIS_NETWORK_ERROR: {
    code: "ANALYSIS_NETWORK_ERROR",
    number: "E302",
    title: "Analiz Ağ Hatası",
    description: "Analiz isteği ağ seviyesinde (fetch) başarısız oldu."
  },
  ANALYSIS_REQUEST_FAILED: {
    code: "ANALYSIS_REQUEST_FAILED",
    number: "E303",
    title: "Analiz İsteği Başarısız",
    description: "Analiz backend'i HTTP hata koduyla döndü."
  },
  ANALYSIS_UNSUCCESSFUL: {
    code: "ANALYSIS_UNSUCCESSFUL",
    number: "E304",
    title: "Analiz Başarısız",
    description: "Analiz backend'i HTTP 200 döndü ama isSuccess/success=false işaretledi."
  },
  ANALYSIS_RESPONSE_MISSING_GEOJSON: {
    code: "ANALYSIS_RESPONSE_MISSING_GEOJSON",
    number: "E305",
    title: "Analiz Yanıtı Eksik",
    description: "Analiz backend'i başarılı yanıt döndü ama sonuç geojson içermiyor."
  },
  LAYER_AUTHORIZED_LIST_API_KEY_MISSING: {
    code: "LAYER_AUTHORIZED_LIST_API_KEY_MISSING",
    number: "E101",
    title: "Yetkili Katman Listesi İçin API Anahtarı Gerekli",
    description: "getAuthorizedLayers() apiKey ayarlanmadan çağrıldı."
  },
  LAYER_GEOTIFF_EXPORT_UNSUPPORTED_TYPE: {
    code: "LAYER_GEOTIFF_EXPORT_UNSUPPORTED_TYPE",
    number: "E102",
    title: "GeoTIFF Export Desteklenmiyor",
    description: "GeoTIFF export sadece WMS/WCS katmanlarında desteklenir."
  },
  LAYER_GEOTIFF_EXPORT_NOT_CONFIGURED: {
    code: "LAYER_GEOTIFF_EXPORT_NOT_CONFIGURED",
    number: "E103",
    title: "GeoTIFF Export Yapılandırılmamış",
    description: "Katman GeoTIFF export için gerekli tiffFormat seçeneğine sahip değil."
  },
  LAYER_STYLE_NOT_VECTOR: {
    code: "LAYER_STYLE_NOT_VECTOR",
    number: "E104",
    title: "Stil Sadece Vektör Katmanlarda",
    description: "applyLayerStyle() sadece vektör (Entity tabanlı) katmanlarda kullanılabilir."
  },
  LAYER_TYPE_UNSUPPORTED_XYZ: {
    code: "LAYER_TYPE_UNSUPPORTED_XYZ",
    number: "E105",
    title: "XYZ Katmanı add() İle Desteklenmiyor",
    description: "XYZ katmanı add() ile eklenemez, Map.setBasemap() kullanılmalı."
  },
  LAYER_TYPE_UNSUPPORTED_DRAWING: {
    code: "LAYER_TYPE_UNSUPPORTED_DRAWING",
    number: "E106",
    title: "DRAWING Katmanı add() İle Desteklenmiyor",
    description: "DRAWING katmanı DrawingManager tarafından otomatik eklenir, add() ile eklenemez."
  },
  LAYER_TYPE_UNSUPPORTED_MEASURE: {
    code: "LAYER_TYPE_UNSUPPORTED_MEASURE",
    number: "E107",
    title: "MEASURE Katmanı add() İle Desteklenmiyor",
    description: "MEASURE katmanı DrawingManager tarafından otomatik eklenir, add() ile eklenemez."
  },
  LAYER_WMS_LAYERS_EMPTY: {
    code: "LAYER_WMS_LAYERS_EMPTY",
    number: "E108",
    title: "WMS layers Parametresi Boş",
    description: "WMS katmanı eklenirken layers (ogcLayerName) parametresi boş."
  },
  LAYER_GEOTIFF_UNSUPPORTED: {
    code: "LAYER_GEOTIFF_UNSUPPORTED",
    number: "E109",
    title: "GeoTIFF Katmanı Desteklenmiyor",
    description: "GeoTIFF katmanı mevcut Cesium sürümünde desteklenmiyor."
  },
  LAYER_SHP_PACKAGE_MISSING: {
    code: "LAYER_SHP_PACKAGE_MISSING",
    number: "E110",
    title: "shpjs Paketi Eksik",
    description: 'SHP katmanı için gereken "shpjs" paketi tüketici uygulamaya eklenmemiş.'
  },
  LAYER_CSV_PACKAGE_MISSING: {
    code: "LAYER_CSV_PACKAGE_MISSING",
    number: "E111",
    title: "papaparse Paketi Eksik",
    description: 'CSV katmanı için gereken "papaparse" paketi tüketici uygulamaya eklenmemiş.'
  },
  LAYER_CSV_LATLON_NOT_FOUND: {
    code: "LAYER_CSV_LATLON_NOT_FOUND",
    number: "E112",
    title: "CSV'de lat/lon Sütunu Bulunamadı",
    description: "CSV içinde lat/lon sütunları otomatik tespit edilemedi."
  },
  LAYER_NOT_FOUND: {
    code: "LAYER_NOT_FOUND",
    number: "E113",
    title: "Katman Bulunamadı",
    description: "Verilen id'ye sahip bir katman yönetimde kayıtlı değil."
  },
  LAYER_ID_ALREADY_EXISTS: {
    code: "LAYER_ID_ALREADY_EXISTS",
    number: "E114",
    title: "Katman ID'si Zaten Kayıtlı",
    description: "Verilen id ile zaten bir katman eklenmiş."
  },
  LAYER_TYPE_MISMATCH: {
    code: "LAYER_TYPE_MISMATCH",
    number: "E115",
    title: "Katman Tipi Uyuşmuyor",
    description: "Katman beklenen tipte (WMS/WMTS) değil."
  },
  LAYER_SERVICE_OPTIONS_NOT_FOUND: {
    code: "LAYER_SERVICE_OPTIONS_NOT_FOUND",
    number: "E116",
    title: "Servis Seçenekleri Bulunamadı",
    description: "Katman için orijinal servis seçenekleri (serviceLayerOptions) bulunamadı."
  },
  LAYER_NOT_RASTER: {
    code: "LAYER_NOT_RASTER",
    number: "E117",
    title: "Katman Raster Değil",
    description: "İşlem sadece raster (ImageryLayer) katmanlarda desteklenir."
  },
  OGC_AUTHORIZED_LAYERS_REQUEST_FAILED: {
    code: "OGC_AUTHORIZED_LAYERS_REQUEST_FAILED",
    number: "E205",
    title: "Yetkili Katman Listesi Alınamadı",
    description: "getAuthorizedLayers() isteği HTTP hata koduyla döndü."
  },
  OGC_GEOTIFF_DOWNLOAD_FAILED: {
    code: "OGC_GEOTIFF_DOWNLOAD_FAILED",
    number: "E206",
    title: "GeoTIFF İndirilemedi",
    description: "GeoTIFF export isteği HTTP hata koduyla döndü."
  },
  OGC_WFS_JSON_FORMAT_UNSUPPORTED: {
    code: "OGC_WFS_JSON_FORMAT_UNSUPPORTED",
    number: "E207",
    title: "WFS JSON Format İlan Etmiyor",
    description: "WFS sunucusu GetCapabilities yanıtında JSON çıktı formatı ilan etmiyor."
  },
  OGC_WFS_GEOJSON_REQUEST_FAILED: {
    code: "OGC_WFS_GEOJSON_REQUEST_FAILED",
    number: "E208",
    title: "WFS GeoJSON İsteği Başarısız",
    description: "WFS GetFeature (GeoJSON çıktı) isteği başarısız oldu."
  },
  OGC_WFS_REQUEST_FAILED: {
    code: "OGC_WFS_REQUEST_FAILED",
    number: "E209",
    title: "WFS İsteği Başarısız",
    description: "WFS GetFeature (GML çıktı) isteği HTTP hata koduyla döndü."
  },
  OGC_WFS_EXCEPTION: {
    code: "OGC_WFS_EXCEPTION",
    number: "E210",
    title: "WFS OGC Exception",
    description: "WFS GetFeature yanıtı bir OGC ExceptionReport döndürdü."
  },
  OGC_WFS_OL_PACKAGE_MISSING: {
    code: "OGC_WFS_OL_PACKAGE_MISSING",
    number: "E211",
    title: "ol Paketi Eksik",
    description: 'WFS GML yanıtını okumak için gereken "ol" paketi tüketici uygulamaya eklenmemiş.'
  },
  OGC_WCS_REQUEST_FAILED: {
    code: "OGC_WCS_REQUEST_FAILED",
    number: "E212",
    title: "WCS İsteği Başarısız",
    description: "WCS GetCoverage isteği HTTP hata koduyla döndü."
  },
  OGC_WCS_MULTIPART_IMAGE_NOT_FOUND: {
    code: "OGC_WCS_MULTIPART_IMAGE_NOT_FOUND",
    number: "E213",
    title: "WCS Multipart Görsel Bulunamadı",
    description: "Multipart WCS yanıtında görsel (image) parçası bulunamadı."
  },
  LAYER_PREVIEW_UNSUPPORTED_XYZ: {
    code: "LAYER_PREVIEW_UNSUPPORTED_XYZ",
    number: "E118",
    title: "XYZ Katmanı Önizlemede Desteklenmiyor",
    description: "TucbsMapPreview XYZ katman tipini önizlemede desteklemiyor."
  },
  LAYER_PREVIEW_UNSUPPORTED_DRAWING: {
    code: "LAYER_PREVIEW_UNSUPPORTED_DRAWING",
    number: "E119",
    title: "DRAWING Katmanı Önizlemede Desteklenmiyor",
    description: "TucbsMapPreview DRAWING katman tipini önizlemede desteklemiyor."
  },
  LAYER_PREVIEW_UNSUPPORTED_MEASURE: {
    code: "LAYER_PREVIEW_UNSUPPORTED_MEASURE",
    number: "E120",
    title: "MEASURE Katmanı Önizlemede Desteklenmiyor",
    description: "TucbsMapPreview MEASURE katman tipini önizlemede desteklemiyor."
  },
  LAYER_MANAGER_NOT_READY: {
    code: "LAYER_MANAGER_NOT_READY",
    number: "E121",
    title: "Harita Hazır Değil",
    description: "Katman eklenmeye çalışıldığında LayerManager henüz hazır değildi."
  },
  LAYER_AUTHORIZED_ADD_MISSING_INFO: {
    code: "LAYER_AUTHORIZED_ADD_MISSING_INFO",
    number: "E122",
    title: "Yetkili Katman Eklenemedi",
    description: "Yetkili katman için gerekli servis bilgisi (ör. WMTS TileMatrixSet) eksik."
  },
  OGC_SERVICE_DISCOVERY_PARSE_FAILED: {
    code: "OGC_SERVICE_DISCOVERY_PARSE_FAILED",
    number: "E214",
    title: "Servis Keşfi Ayrıştırma Hatası",
    description: "TucbsServiceUpload'da GetCapabilities yanıtı geçerli XML olarak ayrıştırılamadı."
  },
  LAYER_WMTS_TILEMATRIXSET_MISSING: {
    code: "LAYER_WMTS_TILEMATRIXSET_MISSING",
    number: "E123",
    title: "TileMatrixSet Bilgisi Bulunamadı",
    description: "Keşfedilen WMTS katmanı için TileMatrixSet bilgisi bulunamadı."
  }
};
function getErrorCodes() {
  return ERROR_REGISTRY;
}
class TucbsError extends Error {
  constructor(code, message, title) {
    const info = ERROR_REGISTRY[code];
    super(message ?? info.description);
    this.name = "TucbsError";
    this.code = code;
    this.number = info.number;
    this.title = title ?? info.title;
  }
}
class LayerOperationError extends TucbsError {
  constructor(code, message, title) {
    super(code, message, title);
    this.name = "LayerOperationError";
  }
}
class OgcRequestError extends TucbsError {
  constructor(code, message, title) {
    super(code, message, title);
    this.name = "OgcRequestError";
  }
}
class AnalysisRequestError extends TucbsError {
  constructor(code, message, title) {
    super(code, message, title);
    this.name = "AnalysisRequestError";
  }
}
class GeometryError extends TucbsError {
  constructor(code, message, title) {
    super(code, message, title);
    this.name = "GeometryError";
  }
}
class ApiKeyValidationError extends TucbsError {
  constructor(message, opts) {
    super((opts == null ? void 0 : opts.code) ?? "API_KEY_INVALID", message, (opts == null ? void 0 : opts.title) ?? "API Hatası");
    this.name = "ApiKeyValidationError";
    if ((opts == null ? void 0 : opts.reason) !== void 0) this.reason = opts.reason;
    if ((opts == null ? void 0 : opts.detail) !== void 0) this.detail = opts.detail;
  }
}
const _ApiKeyPolicy = class _ApiKeyPolicy {
  constructor(options) {
    // Map.ts uzerinden configure() ile atanir. undefined ise apiKey mekanizmasi
    // tamamen devre disi kalir (mevcut authToken/Bearer davranisi degismez).
    // GERCEK (ES private) bir field -- TypeScript'in `private`
    // anahtar sozcugu sadece derleme-zamaninda kontrol eder, derlenen JS'te
    // silinir ve disaridan (ör. sayfada calisan baska bir script, XSS
    // payload'i) runtime'da hala okunabilir kalirdi. # ile gercekten
    // disaridan erisilemez hale gelir (bkz.
    // project_ucbp_api_global_import_seviyesi_apikey_arastirma guvenlik
    // bolumu).
    __privateAdd(this, _apiKey);
    this.getApiBase = options.apiBase;
  }
  /**
   * apiKey ile ilgili ayarlari (Map.ts constructor'indan) gec-yapilandirir.
   * Sadece verilen alanlar guncellenir, digerleri oldugu gibi kalir --
   * boylece Map.ts, MapOptions'ta apiKey verilmemisse bu metodu hic
   * cagirmayabilir ya da kismi bir nesne geciebilir.
   */
  configure(options) {
    if (options.apiKey !== void 0) {
      __privateSet(this, _apiKey, options.apiKey);
    }
    if (options.trustedApiKeyHosts !== void 0) {
      this.trustedApiKeyHosts = options.trustedApiKeyHosts;
    }
    if (options.apiKeyDiscoveryUrl !== void 0) {
      this.apiKeyDiscoveryUrl = options.apiKeyDiscoveryUrl;
    }
  }
  /** apiKey configure() ile atanmis mi -- SADECE varligi, degerin kendisi
   * degil (#apiKey gercek private field olarak kapali kalir). */
  get hasApiKey() {
    return __privateGet(this, _apiKey) !== void 0;
  }
  /** {@link LayerManager.getAuthorizedLayers} implementasyonu -- apiKey'e
   * gore yetkili WMS/WFS/WMTS listesi, {@code GET /layers} + {@code X-API-Key}. */
  async getAuthorizedLayers() {
    if (__privateGet(this, _apiKey) === void 0) {
      throw new LayerOperationError(
        "LAYER_AUTHORIZED_LIST_API_KEY_MISSING",
        "getAuthorizedLayers() icin apiKey gerekli — Map/LayerManager.configure({apiKey}) ile atayin."
      );
    }
    const discoveryUrl = this.apiKeyDiscoveryUrl ?? `${this.getApiBase().replace(/\/+$/, "")}/layers`;
    const response = await fetch(discoveryUrl, {
      headers: { [_ApiKeyPolicy.API_KEY_HEADER_NAME]: __privateGet(this, _apiKey) }
    });
    if (!response.ok) {
      throw new OgcRequestError(
        "OGC_AUTHORIZED_LAYERS_REQUEST_FAILED",
        `Yetkili katman listesi alinamadi: ${response.status} ${response.statusText}`
      );
    }
    const data = await response.json();
    const raw = Array.isArray(data) ? data : data.object ?? [];
    return raw.map((item) => this.normalizeAuthorizedLayer(item));
  }
  /** {@link getAuthorizedLayers} alias (checklist getLayerList). */
  async getLayerList() {
    return this.getAuthorizedLayers();
  }
  /**
   * {@link LayerManager.canAddAuthorizedLayer} implementasyonu -- bir
   * AuthorizedLayerInfo'nun {@link resolveAddOptions}/`LayerManager.add()`
   * ile eklenebilir olup olmadigini bildirir (GC-03 Adim 3 kapsaminda
   * `TucbsAuthorizedLayers.ts`'teki ORIJINAL `_authorizedCanAdd`'in TEK
   * SATIR davranis degisikligi olmadan buraya tasinmis hali -- artik hem
   * Lit bilesen hem baska bir UI katmani (ör. React) AYNI kaynagi kullanir).
   */
  canAddAuthorizedLayer(info) {
    var _a2, _b;
    const tur = (info.servisTuru || "").toUpperCase();
    if (!((_a2 = info.servisUrl) == null ? void 0 : _a2.trim()) || !this.resolveOgcLayerName(info.ogcLayerName, info.katmanAdi)) {
      return false;
    }
    if (tur === "WMTS") return !!((_b = info.wmtsTileMatrixSet) == null ? void 0 : _b.trim());
    return tur === "WMS" || tur === "WFS";
  }
  /**
   * {@link LayerManager.addAuthorizedLayer} implementasyonu -- bir
   * AuthorizedLayerInfo'yu `LayerManager.add()`'in bekledigi
   * `{layerType, options}` ciftine cozer (ORIJINAL
   * `_resolvedOgcLayerName`+`_addOneAuthorizedLayer`'in options-eslestirme
   * kismi, AYNI sekilde tasinmistir). {@link canAddAuthorizedLayer} false
   * donuyorsa `LayerOperationError` firlatir -- `add()`'i KENDISI cagirmaz,
   * caller (`LayerManager.addAuthorizedLayer`) sonucu mevcut `add()`
   * dispatcher'ina verir.
   */
  resolveAddOptions(info) {
    var _a2;
    if (!this.canAddAuthorizedLayer(info)) {
      throw new LayerOperationError(
        "LAYER_AUTHORIZED_ADD_MISSING_INFO",
        ((_a2 = info.servisTuru) == null ? void 0 : _a2.toUpperCase()) === "WMTS" ? "WMTS için TileMatrixSet eksik." : "Eksik servis bilgisi."
      );
    }
    const tur = info.servisTuru.toUpperCase();
    const id = `authorized-${this.authorizedLayerKey(info)}-${Date.now()}`;
    const layerName = this.resolveOgcLayerName(info.ogcLayerName, info.katmanAdi);
    const title = info.katmanAdi || layerName;
    if (tur === "WMS") {
      return { layerType: "WMS", options: { id, title, url: info.servisUrl, layers: layerName } };
    }
    if (tur === "WFS") {
      return { layerType: "WFS", options: { id, title, url: info.servisUrl, typeName: layerName } };
    }
    return {
      layerType: "WMTS",
      options: {
        id,
        title,
        url: info.servisUrl,
        layer: layerName,
        tileMatrixSetID: info.wmtsTileMatrixSet
      }
    };
  }
  // ORIJINAL _authorizedKey (TucbsAuthorizedLayers.ts) ile AYNI anahtar
  // formatu -- sadece resolveAddOptions()'in id uretimi icin, UI'daki
  // secim-listesi anahtarindan (checkbox kimligi) BAGIMSIZ bir amac.
  authorizedLayerKey(info) {
    return info.id ?? `${info.servisTuru}|${info.servisUrl}|${info.ogcLayerName}`;
  }
  normalizeAuthorizedLayer(item) {
    const ogc = this.resolveOgcLayerName(item.ogcLayerName, item.katmanAdi);
    const servisUrl = this.rewriteOpaqueOgcUrl(item.servisUrl);
    const servisTuru = item.servisTuru.toUpperCase();
    return {
      ...item,
      servisTuru,
      ...ogc && ogc !== item.ogcLayerName ? { ogcLayerName: ogc } : {},
      ...servisUrl !== item.servisUrl ? { servisUrl } : {}
    };
  }
  resolveOgcLayerName(ogcLayerName, katmanAdi) {
    for (const raw of [ogcLayerName, katmanAdi]) {
      if (!raw) continue;
      const t = raw.trim();
      if (!t || t.toLowerCase() === "undefined" || t.toLowerCase() === "null") {
        continue;
      }
      return t;
    }
    return "";
  }
  // ── apiKey ic yardimcilari ───────────────────────────────────────────────
  /**
   * Verilen URL'in host'u trustedApiKeyHosts listesinde mi kontrol eder.
   * URL ayristirilamazsa (goreli/bicimsiz URL) GUVENLI TARAFTA kalinir --
   * host bilinmiyorsa apiKey EKLENMEZ (fail-closed).
   */
  isTrustedApiKeyHost(url) {
    if (__privateGet(this, _apiKey) === void 0) return false;
    return this.isKnownGatedUrl(url);
  }
  /**
   * URL'in apiKey gerektiren bir servis deseni (ucbp-api OGC proxy veya
   * configure edilmis trustedApiKeyHosts) tasiyip tasimadigini, apiKey'in
   * o an var olup olmadigindan BAGIMSIZ olarak bildirir. Tuketiciler
   * (ör. TucbsMapPreview) bunu, apiKey yok/gecersizken bir katmanin
   * gercekten acik olup olmadigina karar vermek icin kullanir.
   */
  layerRequiresApiKey(url) {
    return this.isKnownGatedUrl(url);
  }
  isKnownGatedUrl(url) {
    if (this.isOwnBackendUrl(url)) return true;
    if (this.trustedApiKeyHosts === void 0 || this.trustedApiKeyHosts.length === 0) {
      return false;
    }
    try {
      return this.trustedApiKeyHosts.includes(new URL(url).hostname);
    } catch {
      return false;
    }
  }
  /**
   * ML-07 DUZELTMESI (Faz 3): eskiden burada `url.includes("/wms-proxy/") ||
   * url.includes("/ogc/")` gibi TUM URL dizgesine bakan bir alt-dizge
   * (substring) kisayolu vardi -- path'inde tesaduf eseri "/ogc/" veya
   * "/wms-proxy/" gecen UCUNCU TARAF bir sunucu (ör. OGC API Features
   * konvansiyonunu kullanan bircok gercek GIS sunucusu) yanlislikla
   * "kendi backend'imiz" sayilip apiKey o sunucuya sizdirilabiliyordu.
   * Simdi HOST karsilastirmasi yapilir (asagidaki trustedApiKeyHosts
   * kontrolüyle AYNI desen, `new URL(..., window.location.origin)` --
   * apiBase() goreli bir yol da olabilir, bkz wfsCapabilities.ts:54'teki
   * ayni cozumleme deseni) -- host eslesmiyorsa artik path'te ne yazarsa
   * yazsin GUVENLI TARAFTA (apiKey eklenmez) kalinir.
   */
  isOwnBackendUrl(url) {
    try {
      const target = new URL(url, window.location.origin);
      const base = new URL(this.getApiBase(), window.location.origin);
      if (target.hostname !== base.hostname) return false;
      return target.pathname.includes("/wms-proxy/") || target.pathname.includes("/ogc/");
    } catch {
      return false;
    }
  }
  /**
   * /layers servisUrl sunucuda api-public-base-url ile üretilir (dev URL kalabilir).
   * Opaque /ogc/ yollarını her zaman apiBase() ile hizalar.
   */
  rewriteOpaqueOgcUrl(url) {
    if (!(url == null ? void 0 : url.includes("/ogc/"))) {
      return url ?? "";
    }
    const ogcIdx = url.indexOf("/ogc/");
    const pathAndQuery = url.substring(ogcIdx);
    const base = this.getApiBase().replace(/\/+$/, "");
    return `${base}${pathAndQuery}`;
  }
  /**
   * apiKey varsa opaque {@code /ogc/{type}/{id}} veya legacy {@code /wms-proxy/{type}?url=} kullanır.
   */
  resolveOgcProxyUrl(serviceType, upstreamUrl) {
    if (__privateGet(this, _apiKey) === void 0) return upstreamUrl;
    if (upstreamUrl.includes("/ogc/")) {
      return this.rewriteOpaqueOgcUrl(upstreamUrl);
    }
    if (upstreamUrl.includes("/wms-proxy/")) {
      return upstreamUrl;
    }
    const base = `${this.getApiBase().replace(/\/+$/, "")}/wms-proxy/${serviceType}`;
    const sep = base.includes("?") ? "&" : "?";
    return `${base}${sep}url=${encodeURIComponent(upstreamUrl)}`;
  }
  /**
   * fetch/Resource-tabanli (header tasiyabilen) istekler icin: host
   * guvenilirse mevcut header'lara apiKey'i EKLER, degilse header'lari
   * OLDUGU GIBI dondurur. WMS/WMTS tile, WFS GetFeature, WCS GetCoverage ve
   * ortak GetCapabilities istekleri bu yolu kullanir -- bu istekler zaten
   * fetch()/Cesium Resource uzerinden gittigi icin header EKLENMESI, bu
   * gelistirme kapsaminda UCTAN UCA calisir (backend'de ayrica bir proxy
   * gerektirmez, ilgili sunucu header'i okuyabilir).
   */
  mergeApiKeyHeader(headers, url) {
    if (!this.isTrustedApiKeyHost(url)) return headers;
    return { ...headers, [_ApiKeyPolicy.API_KEY_HEADER_NAME]: __privateGet(this, _apiKey) };
  }
  /**
   * Header TASIYAMAYAN istekler (WMS/WMTS GetLegendGraphic — tarayicida
   * `<img src>` ile cekilir) icin: host guvenilirse apiKey'i query-string
   * parametresi (tucbsapikey) olarak URL'e ekler. NOT: bu SADECE URL'i dogru
   * bicimde olusturur -- gercek bir sunucudan anahtara gore dogrulanmis yanit
   * alinmasi, backend'deki WMS/WMTS Proxy katmani (ayri, henuz onaylanmamis
   * bir gelistirme) hazir olduguna baglidir.
   */
  attachApiKeyToUrl(url) {
    if (!this.isTrustedApiKeyHost(url)) return url;
    const separator = url.includes("?") ? "&" : "?";
    return `${url}${separator}${_ApiKeyPolicy.API_KEY_QUERY_PARAM_NAME}=${encodeURIComponent(__privateGet(this, _apiKey))}`;
  }
  buildAuthHeaders(authToken) {
    if (authToken === void 0) return void 0;
    return { Authorization: `Bearer ${authToken}` };
  }
};
_apiKey = new WeakMap();
_ApiKeyPolicy.API_KEY_HEADER_NAME = "X-API-Key";
_ApiKeyPolicy.API_KEY_QUERY_PARAM_NAME = "tucbsapikey";
let ApiKeyPolicy = _ApiKeyPolicy;
function cartesianToLonLat(cartesian) {
  const c = cesium.Cartographic.fromCartesian(cartesian);
  return [cesium.Math.toDegrees(c.longitude), cesium.Math.toDegrees(c.latitude)];
}
function closeRing$1(ring) {
  if (ring.length === 0) return ring;
  const first = ring[0];
  const last = ring[ring.length - 1];
  if (first[0] === last[0] && first[1] === last[1]) return ring;
  return [...ring, first];
}
function entityToGeoJSON(entity, time = cesium.JulianDate.now()) {
  var _a2, _b, _c;
  const rawProps = ((_a2 = entity.properties) == null ? void 0 : _a2.getValue(time)) ?? {};
  const properties = { ...rawProps };
  delete properties.layerId;
  delete properties.featureId;
  let geometry = null;
  if ((_b = entity.polygon) == null ? void 0 : _b.hierarchy) {
    const hierarchy = entity.polygon.hierarchy.getValue(time);
    const positions = hierarchy == null ? void 0 : hierarchy.positions;
    if (positions && positions.length >= 3) {
      const ring = closeRing$1(positions.map(cartesianToLonLat));
      geometry = { type: "Polygon", coordinates: [ring] };
    }
  } else if ((_c = entity.polyline) == null ? void 0 : _c.positions) {
    const positions = entity.polyline.positions.getValue(time);
    if (positions && positions.length >= 2) {
      geometry = {
        type: "LineString",
        coordinates: positions.map(cartesianToLonLat)
      };
    }
  } else if (entity.position) {
    const pos = entity.position.getValue(time);
    if (pos) {
      geometry = { type: "Point", coordinates: cartesianToLonLat(pos) };
    }
  }
  if (!geometry) return null;
  return {
    type: "Feature",
    id: entity.id,
    properties,
    geometry
  };
}
function featureLabel(feature) {
  var _a2;
  const geomType = ((_a2 = feature.geometry) == null ? void 0 : _a2.type) ?? "Feature";
  const id = feature.id != null ? String(feature.id) : "";
  return id ? `${geomType} ${id}` : geomType;
}
function triggerDownload(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1e3);
}
function featureCollectionToKml(geojson) {
  const placemarks = geojson.features.map((feature, index) => featureToKml(feature, index)).join("");
  return `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2"><Document>${placemarks}</Document></kml>`;
}
function featureCollectionToShapefileZip(geojson) {
  const records = collectShpRecords(geojson);
  const shp = writeShp(records);
  const shx = writeShx(records);
  const dbf = writeDbf(records.map((record) => record.name));
  return zipStore([
    { name: "export.shp", data: shp },
    { name: "export.shx", data: shx },
    { name: "export.dbf", data: dbf }
  ]);
}
function featureToKml(feature, index) {
  const name = xmlEscape(featureName(feature, index));
  const body = geometryToKml(feature.geometry);
  if (!body) return "";
  return `<Placemark><name>${name}</name>${body}</Placemark>`;
}
function geometryToKml(geometry) {
  if (!geometry) return "";
  switch (geometry.type) {
    case "Point":
      return `<Point><coordinates>${coord(geometry.coordinates)}</coordinates></Point>`;
    case "MultiPoint":
      return `<MultiGeometry>${geometry.coordinates.map((position) => `<Point><coordinates>${coord(position)}</coordinates></Point>`).join("")}</MultiGeometry>`;
    case "LineString":
      return `<LineString><coordinates>${line(geometry.coordinates)}</coordinates></LineString>`;
    case "MultiLineString":
      return `<MultiGeometry>${geometry.coordinates.map((part) => `<LineString><coordinates>${line(part)}</coordinates></LineString>`).join("")}</MultiGeometry>`;
    case "Polygon":
      return polygonKml(geometry.coordinates);
    case "MultiPolygon":
      return `<MultiGeometry>${geometry.coordinates.map((polygon) => polygonKml(polygon)).join("")}</MultiGeometry>`;
    case "GeometryCollection":
      return `<MultiGeometry>${geometry.geometries.map((child) => geometryToKml(child)).join("")}</MultiGeometry>`;
    default:
      return "";
  }
}
function polygonKml(rings) {
  const [outer, ...holes] = rings;
  if (!outer) return "";
  const holeXml = holes.map((ring) => `<innerBoundaryIs><LinearRing><coordinates>${line(ring)}</coordinates></LinearRing></innerBoundaryIs>`).join("");
  return `<Polygon><outerBoundaryIs><LinearRing><coordinates>${line(outer)}</coordinates></LinearRing></outerBoundaryIs>${holeXml}</Polygon>`;
}
function coord(position) {
  return `${position[0]},${position[1]},0`;
}
function line(positions) {
  return positions.map(coord).join(" ");
}
function xmlEscape(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}
function collectShpRecords(geojson) {
  const kind = firstKind(geojson);
  if (!kind) return [];
  const records = [];
  geojson.features.forEach((feature, index) => {
    for (const rings of ringsForKind(feature.geometry, kind)) {
      const closed = rings.map(closeRing);
      const oriented = kind === 5 ? orientPolygon(closed) : closed;
      records.push({
        kind,
        name: featureName(feature, index),
        rings: oriented,
        bbox: bboxOf(oriented)
      });
    }
  });
  return records;
}
function firstKind(geojson) {
  for (const feature of geojson.features) {
    const kind = kindOf(feature.geometry);
    if (kind) return kind;
  }
  return null;
}
function kindOf(geometry) {
  if (!geometry) return null;
  switch (geometry.type) {
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
      for (const child of geometry.geometries) {
        const kind = kindOf(child);
        if (kind) return kind;
      }
      return null;
    default:
      return null;
  }
}
function ringsForKind(geometry, kind) {
  if (!geometry || kindOf(geometry) !== kind) {
    if ((geometry == null ? void 0 : geometry.type) === "GeometryCollection") {
      return geometry.geometries.flatMap((child) => ringsForKind(child, kind));
    }
    return [];
  }
  switch (geometry.type) {
    case "Point":
      return [[[geometry.coordinates]]];
    case "MultiPoint":
      return geometry.coordinates.map((position) => [[position]]);
    case "LineString":
      return [[geometry.coordinates]];
    case "MultiLineString":
      return [geometry.coordinates];
    case "Polygon":
      return [geometry.coordinates];
    case "MultiPolygon":
      return geometry.coordinates;
    default:
      return [];
  }
}
function closeRing(ring) {
  const first = ring[0];
  const last = ring[ring.length - 1];
  if (!first || !last) return ring;
  if (first[0] === last[0] && first[1] === last[1]) return ring;
  return [...ring, first];
}
function orientPolygon(rings) {
  return rings.map((ring, index) => {
    const area = signedArea(ring);
    const outer = index === 0;
    const clockwise = area < 0;
    if (outer === clockwise) return ring;
    return [...ring].reverse();
  });
}
function signedArea(ring) {
  let sum = 0;
  for (let i = 0; i < ring.length - 1; i++) {
    const current = ring[i];
    const next = ring[i + 1];
    const x1 = current == null ? void 0 : current[0];
    const y1 = current == null ? void 0 : current[1];
    const x2 = next == null ? void 0 : next[0];
    const y2 = next == null ? void 0 : next[1];
    if (x1 === void 0 || y1 === void 0 || x2 === void 0 || y2 === void 0) continue;
    sum += x1 * y2 - x2 * y1;
  }
  return sum / 2;
}
function bboxOf(rings) {
  let xmin = Infinity;
  let ymin = Infinity;
  let xmax = -Infinity;
  let ymax = -Infinity;
  for (const ring of rings) {
    for (const position of ring) {
      const [x, y] = xy(position);
      xmin = Math.min(xmin, x);
      ymin = Math.min(ymin, y);
      xmax = Math.max(xmax, x);
      ymax = Math.max(ymax, y);
    }
  }
  if (!Number.isFinite(xmin)) return [0, 0, 0, 0];
  return [xmin, ymin, xmax, ymax];
}
function featureName(feature, index) {
  const props = feature.properties;
  const named = props && typeof props.name === "string" ? props.name : "";
  return named || `feature-${index + 1}`;
}
function writeShp(records) {
  const bodies = records.map(recordBody);
  const contentBytes = bodies.reduce((sum, body) => sum + 8 + body.length, 0);
  const file = new Uint8Array(100 + contentBytes);
  const view = new DataView(file.buffer);
  writeHeader(view, file.length, records);
  let offset = 100;
  bodies.forEach((body, index) => {
    view.setInt32(offset, index + 1, false);
    view.setInt32(offset + 4, body.length / 2, false);
    file.set(body, offset + 8);
    offset += 8 + body.length;
  });
  return file;
}
function writeShx(records) {
  const file = new Uint8Array(100 + records.length * 8);
  const view = new DataView(file.buffer);
  writeHeader(view, file.length, records);
  let wordOffset = 50;
  records.forEach((record, index) => {
    const bodyWords = recordBody(record).length / 2;
    view.setInt32(100 + index * 8, wordOffset, false);
    view.setInt32(100 + index * 8 + 4, bodyWords, false);
    wordOffset += 4 + bodyWords;
  });
  return file;
}
function writeHeader(view, byteLength, records) {
  var _a2;
  view.setInt32(0, 9994, false);
  view.setInt32(24, byteLength / 2, false);
  view.setInt32(28, 1e3, true);
  view.setInt32(32, ((_a2 = records[0]) == null ? void 0 : _a2.kind) ?? 5, true);
  const bbox = unionBbox(records);
  view.setFloat64(36, bbox[0], true);
  view.setFloat64(44, bbox[1], true);
  view.setFloat64(52, bbox[2], true);
  view.setFloat64(60, bbox[3], true);
}
function unionBbox(records) {
  if (records.length === 0) return [0, 0, 0, 0];
  let xmin = Infinity;
  let ymin = Infinity;
  let xmax = -Infinity;
  let ymax = -Infinity;
  for (const record of records) {
    xmin = Math.min(xmin, record.bbox[0]);
    ymin = Math.min(ymin, record.bbox[1]);
    xmax = Math.max(xmax, record.bbox[2]);
    ymax = Math.max(ymax, record.bbox[3]);
  }
  return [xmin, ymin, xmax, ymax];
}
function xy(position) {
  return [position[0] ?? 0, position[1] ?? 0];
}
function recordBody(record) {
  var _a2;
  if (record.kind === 1) {
    const body2 = new Uint8Array(20);
    const view2 = new DataView(body2.buffer);
    view2.setInt32(0, 1, true);
    const [x, y] = xy(((_a2 = record.rings[0]) == null ? void 0 : _a2[0]) ?? [0, 0]);
    view2.setFloat64(4, x, true);
    view2.setFloat64(12, y, true);
    return body2;
  }
  const pointCount = record.rings.reduce((sum, ring) => sum + ring.length, 0);
  const body = new Uint8Array(44 + record.rings.length * 4 + pointCount * 16);
  const view = new DataView(body.buffer);
  view.setInt32(0, record.kind, true);
  view.setFloat64(4, record.bbox[0], true);
  view.setFloat64(12, record.bbox[1], true);
  view.setFloat64(20, record.bbox[2], true);
  view.setFloat64(28, record.bbox[3], true);
  view.setInt32(36, record.rings.length, true);
  view.setInt32(40, pointCount, true);
  let partIndex = 0;
  record.rings.forEach((ring, index) => {
    view.setInt32(44 + index * 4, partIndex, true);
    partIndex += ring.length;
  });
  let pointOffset = 44 + record.rings.length * 4;
  for (const ring of record.rings) {
    for (const position of ring) {
      const [x, y] = xy(position);
      view.setFloat64(pointOffset, x, true);
      view.setFloat64(pointOffset + 8, y, true);
      pointOffset += 16;
    }
  }
  return body;
}
function writeDbf(names) {
  const headerLength = 32 + 32 + 1;
  const recordLength = 1 + 80;
  const file = new Uint8Array(headerLength + names.length * recordLength + 1);
  const view = new DataView(file.buffer);
  file[0] = 3;
  view.setUint32(4, names.length, true);
  view.setUint16(8, headerLength, true);
  view.setUint16(10, recordLength, true);
  const fieldName = new TextEncoder().encode("NAME");
  file.set(fieldName, 32);
  file[32 + 11] = "C".charCodeAt(0);
  file[32 + 16] = 80;
  file[32 + 32] = 13;
  const encoder = new TextEncoder();
  names.forEach((name, index) => {
    const start = headerLength + index * recordLength;
    file[start] = 32;
    const bytes = encoder.encode(name).slice(0, 80);
    file.set(bytes, start + 1);
    for (let i = 1 + bytes.length; i < recordLength; i++) file[start + i] = 32;
  });
  file[file.length - 1] = 26;
  return file;
}
function zipStore(files) {
  const encoder = new TextEncoder();
  const locals = [];
  const centrals = [];
  let offset = 0;
  for (const file of files) {
    const name = encoder.encode(file.name);
    const crc = crc32(file.data);
    const local = new Uint8Array(30 + name.length + file.data.length);
    const view = new DataView(local.buffer);
    view.setUint32(0, 67324752, true);
    view.setUint16(4, 20, true);
    view.setUint16(8, 0, true);
    view.setUint32(14, crc, true);
    view.setUint32(18, file.data.length, true);
    view.setUint32(22, file.data.length, true);
    view.setUint16(26, name.length, true);
    local.set(name, 30);
    local.set(file.data, 30 + name.length);
    locals.push(local);
    const central = new Uint8Array(46 + name.length);
    const centralView = new DataView(central.buffer);
    centralView.setUint32(0, 33639248, true);
    centralView.setUint16(4, 20, true);
    centralView.setUint16(6, 20, true);
    centralView.setUint16(10, 0, true);
    centralView.setUint32(16, crc, true);
    centralView.setUint32(20, file.data.length, true);
    centralView.setUint32(24, file.data.length, true);
    centralView.setUint16(28, name.length, true);
    centralView.setUint32(42, offset, true);
    central.set(name, 46);
    centrals.push(central);
    offset += local.length;
  }
  const centralSize = centrals.reduce((sum, part) => sum + part.length, 0);
  const end = new Uint8Array(22);
  const endView = new DataView(end.buffer);
  endView.setUint32(0, 101010256, true);
  endView.setUint16(8, files.length, true);
  endView.setUint16(10, files.length, true);
  endView.setUint32(12, centralSize, true);
  endView.setUint32(16, offset, true);
  return concat([...locals, ...centrals, end]);
}
function crc32(data) {
  let crc = 4294967295;
  for (const byte of data) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit++) {
      crc = crc >>> 1 ^ ((crc & 1) === 1 ? 3988292384 : 0);
    }
  }
  return (crc ^ 4294967295) >>> 0;
}
function concat(parts) {
  const total = parts.reduce((sum, part) => sum + part.length, 0);
  const out = new Uint8Array(total);
  let offset = 0;
  for (const part of parts) {
    out.set(part, offset);
    offset += part.length;
  }
  return out;
}
function getLayerGeoJSON(managed, currentTime, isOutlineCompanion) {
  if (!("entities" in managed.cesiumObject)) return void 0;
  const features = managed.cesiumObject.entities.values.filter((entity) => !isOutlineCompanion(entity)).map((entity) => entityToGeoJSON(entity, currentTime)).filter((feature) => feature !== null);
  return { type: "FeatureCollection", features };
}
function exportLayerVector(geojson, filename, format) {
  if (!geojson) return;
  const file = vectorFile(geojson, format);
  triggerDownload(file.blob, `${filename}-${Date.now()}.${file.extension}`);
}
function exportLayerGeoJSON(geojson, filename) {
  exportLayerVector(geojson, filename, "geojson");
}
function exportLayerKml(geojson, filename) {
  exportLayerVector(geojson, filename, "kml");
}
function exportLayerShapefile(geojson, filename) {
  exportLayerVector(geojson, filename, "shp");
}
function bytesAsBuffer(bytes) {
  return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
}
function vectorFile(geojson, format) {
  if (format === "kml") {
    return {
      blob: new Blob([featureCollectionToKml(geojson)], { type: "application/vnd.google-earth.kml+xml" }),
      extension: "kml"
    };
  }
  if (format === "shp") {
    return {
      blob: new Blob([bytesAsBuffer(featureCollectionToShapefileZip(geojson))], { type: "application/zip" }),
      extension: "zip"
    };
  }
  return {
    blob: new Blob([JSON.stringify(geojson, null, 2)], { type: "application/geo+json" }),
    extension: "geojson"
  };
}
const GEOTIFF_EXPORT_MAX_WMS_DIMENSION = 2048;
function geoTiffExportDimensions(bbox, maxDimension) {
  if (!bbox) return { width: maxDimension, height: Math.round(maxDimension / 2) };
  const lonSpan = Math.max(bbox.east - bbox.west, 1e-6);
  const latSpan = Math.max(bbox.north - bbox.south, 1e-6);
  const width = lonSpan >= latSpan ? maxDimension : Math.max(64, Math.round(maxDimension * lonSpan / latSpan));
  const height = latSpan >= lonSpan ? maxDimension : Math.max(64, Math.round(maxDimension * latSpan / lonSpan));
  return { width, height };
}
function buildWmsGeoTiffExportUrl(options, resolveOgcProxyUrl) {
  const base = resolveOgcProxyUrl("wms", options.url);
  const { width, height } = geoTiffExportDimensions(
    options.geographicBoundingBox,
    GEOTIFF_EXPORT_MAX_WMS_DIMENSION
  );
  const bbox = options.geographicBoundingBox;
  const params = new URLSearchParams({
    SERVICE: "WMS",
    REQUEST: "GetMap",
    VERSION: "1.3.0",
    LAYERS: options.layers,
    STYLES: "",
    FORMAT: options.tiffFormat,
    TRANSPARENT: "false",
    WIDTH: String(width),
    HEIGHT: String(height),
    CRS: "CRS:84",
    BBOX: bbox ? `${bbox.west},${bbox.south},${bbox.east},${bbox.north}` : "-180,-90,180,90"
  });
  const sep = base.includes("?") ? "&" : "?";
  return `${base}${sep}${params.toString()}`;
}
function buildWcsGeoTiffExportUrl(options, resolveOgcProxyUrl) {
  const base = resolveOgcProxyUrl("wcs", options.url);
  const version = options.version ?? "2.0.1";
  const params = {
    service: "WCS",
    version,
    request: "GetCoverage",
    coverageId: options.coverageId,
    format: options.tiffFormat
  };
  if (version.startsWith("2.")) {
    const max = options.maxSize ?? 2048;
    if (Number.isFinite(max)) params["SCALESIZE"] = `x(${max}),y(${max})`;
  }
  const sep = base.includes("?") ? "&" : "?";
  return `${base}${sep}${new URLSearchParams(params).toString()}`;
}
function isGeoTiffExportAvailable(managed, options) {
  if (!managed || managed.layerType !== "WMS" && managed.layerType !== "WCS") {
    return false;
  }
  return !!options && "tiffFormat" in options && !!options.tiffFormat;
}
async function exportLayerAsGeoTiff(managed, options, filename, resolveOgcProxyUrl, authContext) {
  if (managed.layerType !== "WMS" && managed.layerType !== "WCS") {
    throw new LayerOperationError("LAYER_GEOTIFF_EXPORT_UNSUPPORTED_TYPE", `Katman WMS/WCS değil, GeoTIFF export desteklenmiyor: "${managed.id}"`);
  }
  if (!options || !("tiffFormat" in options) || !options.tiffFormat) {
    throw new LayerOperationError("LAYER_GEOTIFF_EXPORT_NOT_CONFIGURED", `Katman GeoTIFF export desteklemiyor: "${managed.id}"`);
  }
  const url = managed.layerType === "WMS" ? buildWmsGeoTiffExportUrl(options, resolveOgcProxyUrl) : buildWcsGeoTiffExportUrl(options, resolveOgcProxyUrl);
  const headers = authContext.mergeApiKeyHeader(authContext.buildAuthHeaders(options.authToken), url);
  const response = await fetch(url, headers ? { headers } : void 0);
  if (!response.ok) {
    throw new OgcRequestError("OGC_GEOTIFF_DOWNLOAD_FAILED", `GeoTIFF indirilemedi: ${response.status} ${response.statusText}`);
  }
  const contentType = response.headers.get("content-type") ?? "";
  const buffer = await response.arrayBuffer();
  const boundaryMatch = /boundary="?([^";]+)"?/i.exec(contentType);
  let blob;
  if (contentType.includes("multipart/") && boundaryMatch) {
    const { bytes, mimeType } = extractMultipartImage(
      new Uint8Array(buffer),
      boundaryMatch[1]
    );
    const imageBuffer = bytes.buffer.slice(
      bytes.byteOffset,
      bytes.byteOffset + bytes.byteLength
    );
    blob = new Blob([imageBuffer], { type: mimeType });
  } else {
    blob = new Blob([buffer], { type: contentType || options.tiffFormat });
  }
  triggerDownload(blob, `${filename}-${Date.now()}.tif`);
}
function extractMultipartImage(bytes, boundary) {
  var _a2;
  const text = new TextDecoder("iso-8859-1").decode(bytes);
  const boundaryMarker = `--${boundary}`;
  let searchFrom = 0;
  while (searchFrom < text.length) {
    const partStart = text.indexOf(boundaryMarker, searchFrom);
    if (partStart === -1) break;
    const contentStart = partStart + boundaryMarker.length;
    const nextBoundary = text.indexOf(boundaryMarker, contentStart);
    if (nextBoundary === -1) break;
    const sepCrlf = text.indexOf("\r\n\r\n", contentStart);
    const sepLf = text.indexOf("\n\n", contentStart);
    const headerEnd = sepCrlf !== -1 && (sepLf === -1 || sepCrlf <= sepLf) ? sepCrlf : sepLf;
    const sepLen = headerEnd === sepCrlf ? 4 : 2;
    if (headerEnd === -1 || headerEnd >= nextBoundary) {
      searchFrom = nextBoundary;
      continue;
    }
    const mimeMatch = /content-type:\s*([^\r\n;]+)/i.exec(
      text.slice(contentStart, headerEnd)
    );
    const mimeType = (_a2 = mimeMatch == null ? void 0 : mimeMatch[1]) == null ? void 0 : _a2.trim();
    if (mimeType == null ? void 0 : mimeType.startsWith("image/")) {
      const bodyStart = headerEnd + sepLen;
      let bodyEnd = nextBoundary;
      if (text[bodyEnd - 2] === "\r" && text[bodyEnd - 1] === "\n") bodyEnd -= 2;
      else if (text[bodyEnd - 1] === "\n") bodyEnd -= 1;
      return { bytes: bytes.slice(bodyStart, bodyEnd), mimeType };
    }
    searchFrom = nextBoundary;
  }
  throw new OgcRequestError("OGC_WCS_MULTIPART_IMAGE_NOT_FOUND", "Multipart WCS yanıtında görsel parçası bulunamadı.");
}
const POLE_SLICE_DEGREES = 90;
const POLE_LATITUDE_LIMIT = 89.9;
function clipRingToLongitude(ring, lon, side) {
  const inside = (p) => side * (p[0] - lon) >= 0;
  const out = [];
  const push = (p) => {
    const last = out[out.length - 1];
    if (last === void 0 || last[0] !== p[0] || last[1] !== p[1]) out.push([p[0], p[1]]);
  };
  for (let i = 0; i < ring.length - 1; i++) {
    const a = ring[i];
    const b = ring[i + 1];
    if (inside(a)) push(a);
    if (inside(a) !== inside(b)) {
      const t = (lon - a[0]) / (b[0] - a[0]);
      push([lon, a[1] + t * (b[1] - a[1])]);
    }
  }
  if (out.length > 0) push(out[0]);
  return out;
}
const _OutlineGeometry = class _OutlineGeometry {
  constructor(options) {
    this.outlineCompanionEntities = /* @__PURE__ */ new WeakSet();
    this.entitiesWithOutlineCompanion = /* @__PURE__ */ new WeakSet();
    this.entitiesWithRiskyOutline = /* @__PURE__ */ new WeakSet();
    this.getCurrentTime = options.getCurrentTime;
  }
  /** Bu entity'nin KENDİSİ bir outline companion'i mi (ayri bir polyline
   * olarak eklenmis, poligonun gercek bir ozelligi degil)? */
  isOutlineCompanion(entity) {
    return this.outlineCompanionEntities.has(entity);
  }
  /** Bu (poligon) entity'nin bir outline companion'i VAR mi -- varsa native
   * polygon.outline/outlineColor/outlineWidth alanlarina DOKUNULMAMALI. */
  hasOutlineCompanion(entity) {
    return this.entitiesWithOutlineCompanion.has(entity);
  }
  /** Bu (poligon) entity antimeridyen/kutup crash riski tasidigi icin native
   * outline'i BILEREK kapatilmis mi -- tekrar acilmamali. */
  hasRiskyOutline(entity) {
    return this.entitiesWithRiskyOutline.has(entity);
  }
  // clampToGround poligonlarda Cesium'un outline'i framework seviyesinde
  // kapatmasinin (bkz addPolygonOutlineCompanion) workaround'u olarak
  // eklenen companion polyline entity'lerini isaretler -- applyLayerStyle()'in
  // per-feature dolgu-renklendirme dongusu bunlari atlamali.
  addPolygonOutlines(dataSource, color, width) {
    const polygonEntities = dataSource.entities.values.filter(
      (entity) => entity.polygon !== void 0 && !this.entitiesWithRiskyOutline.has(entity)
    );
    dataSource.entities.suspendEvents();
    for (const entity of polygonEntities) {
      this.addPolygonOutlineCompanion(dataSource, entity, color, width, true);
    }
    dataSource.entities.resumeEvents();
  }
  // Bir poligon entity'sinin kose koordinatlarindan AYRI bir polyline
  // "outline" entity'si ekler (bkz yukaridaki addPolygonOutlines yorumu) --
  // hem TOPLU ilk yukleme (addPolygonOutlines) HEM DE Cizim Katmani'na TEK
  // TEK eklenen poligonlar (_addDrawnShape, clampToGround:false) bu ORTAK
  // helper'i kullanir. Companion, applyLayerStyle()'daki mevcut
  // outlineCompanionEntities dongusu tarafindan otomatik olarak
  // renk/genislik guncellemesi alir.
  addPolygonOutlineCompanion(dataSource, entity, color, width, clampToGround) {
    var _a2;
    const time = this.getCurrentTime();
    const hierarchy = (_a2 = entity.polygon.hierarchy) == null ? void 0 : _a2.getValue(time);
    const positions = hierarchy == null ? void 0 : hierarchy.positions;
    const firstPosition = positions == null ? void 0 : positions[0];
    if (positions === void 0 || positions.length < 2 || firstPosition === void 0)
      return;
    entity.polygon.outline = new cesium.ConstantProperty(false);
    this.entitiesWithOutlineCompanion.add(entity);
    const outlinePositions = _OutlineGeometry.simplifyOutlinePositions([
      ...positions,
      firstPosition
    ]);
    const outlineEntity = dataSource.entities.add({
      id: `${entity.id}::outline`,
      polyline: {
        positions: outlinePositions,
        clampToGround,
        width,
        material: color
      }
    });
    this.outlineCompanionEntities.add(outlineEntity);
    outlineEntity.properties = new cesium.PropertyBag({
      __tucbsOutlineOf: entity.id
    });
  }
  // Antimeridyeni (-180/180 boylam) gecen ya da kutuba (enlem ~=90) cok
  // yakin poligonlarda (orn. Rusya, Antarktika gibi genis kapsamli WFS/
  // GeoJSON katmanlarinda) Cesium'un KENDI outline tessellation'i
  // (subdivideRhumbLine, createPolygonOutlineGeometry icinde) "RangeError:
  // Invalid array length" ile TUM render'i durduran, henuz yamanmamis
  // BILINEN bir hatasi var (bkz kullanici bildirimi: "World continents"
  // WFS katmani; community.cesium.com/t/invalid-array-length-error,
  // GitHub CesiumGS/cesium#11269/#4760). CRS/koordinat sorunuyla ilgisi
  // YOK -- gecerli WGS84 veride de olusabilir. En guvenilir/basit dogrulanmis
  // cozum SADECE bu riskli poligonlarin outline'ini (kenar cizgisini)
  // kapatmaktir -- dolgu (fill) etkilenmez, katman yine gorunur kalir.
  disableRiskyPolygonOutlines(dataSource) {
    var _a2, _b;
    const now = cesium.JulianDate.now();
    dataSource.entities.suspendEvents();
    for (const entity of [...dataSource.entities.values]) {
      const polygon = entity.polygon;
      const hierarchy = (_a2 = polygon == null ? void 0 : polygon.hierarchy) == null ? void 0 : _a2.getValue(now);
      if (polygon !== void 0 && this.risksAntimeridianOrPoleBug(hierarchy == null ? void 0 : hierarchy.positions)) {
        polygon.outline = new cesium.ConstantProperty(false);
        this.entitiesWithRiskyOutline.add(entity);
        if (hierarchy !== void 0 && this.splitPoleEnclosingPolygon(dataSource, entity, hierarchy, now)) {
          continue;
        }
        if (polygon.height === void 0 && ((_b = polygon.perPositionHeight) == null ? void 0 : _b.getValue(now)) !== true) {
          polygon.height = new cesium.ConstantProperty(0);
        }
      }
    }
    dataSource.entities.resumeEvents();
  }
  // Kutbu icine alan (boylamda ~360 derece donen, antimeridyen atlamasi
  // OLMAYAN, deliksiz) bir poligonu boylamda 90 derecelik 4 dilime boler:
  // ilk dilim entity'nin KENDI poligonu olur, digerleri ayni grafik ve
  // ozniteliklerle `${id}::part-N` entity'leri olarak eklenir (stil/identify
  // ozniteliklerden calistigi icin dilimler ayni feature gibi davranir).
  // GeoJsonDataSource kenarlari RHUMB cizgi olarak cizdigi icin boylam/enlem
  // duzleminde kirpmak geometriyi degistirmez. Kutup kenari Cesium'un
  // kaldirabilecegi -89.9/89.9 enlemine cekilir. Bolemezse false doner.
  splitPoleEnclosingPolygon(dataSource, entity, hierarchy, now) {
    var _a2;
    const polygon = entity.polygon;
    if (polygon === void 0 || hierarchy.holes.length > 0) return false;
    const ring = hierarchy.positions.map((position) => {
      const c = cesium.Cartographic.fromCartesian(position);
      return [cesium.Math.toDegrees(c.longitude), cesium.Math.toDegrees(c.latitude)];
    });
    let minLon = Infinity;
    let maxLon = -Infinity;
    for (let i = 0; i < ring.length; i++) {
      const [lon] = ring[i];
      if (i > 0 && Math.abs(lon - ring[i - 1][0]) > 180) return false;
      minLon = Math.min(minLon, lon);
      maxLon = Math.max(maxLon, lon);
    }
    if (maxLon - minLon < 359) return false;
    const closed = [...ring, ring[0]].map(
      ([lon, lat]) => [lon, Math.max(-POLE_LATITUDE_LIMIT, Math.min(POLE_LATITUDE_LIMIT, lat))]
    );
    const slices = [];
    for (let lo = -180; lo < 180; lo += POLE_SLICE_DEGREES) {
      const slice = clipRingToLongitude(clipRingToLongitude(closed, lo, 1), lo + POLE_SLICE_DEGREES, -1).slice(0, -1);
      if (slice.length >= 3) slices.push(cesium.Cartesian3.fromDegreesArray(slice.flat()));
    }
    if (slices.length === 0) return false;
    const properties = (_a2 = entity.properties) == null ? void 0 : _a2.getValue(now);
    slices.forEach((positions, index) => {
      const hierarchyProperty = new cesium.ConstantProperty(new cesium.PolygonHierarchy(positions));
      if (index === 0) {
        polygon.hierarchy = hierarchyProperty;
        return;
      }
      const part = polygon.clone();
      part.hierarchy = hierarchyProperty;
      const partEntity = dataSource.entities.add({
        id: `${entity.id}::part-${index}`,
        ...entity.name !== void 0 ? { name: entity.name } : {},
        polygon: part
      });
      if (properties !== void 0) partEntity.properties = new cesium.PropertyBag(properties);
      this.entitiesWithRiskyOutline.add(partEntity);
    });
    return true;
  }
  // Ardisik iki koseden HERHANGI birinin boylam farki >180 derece ise
  // (antimeridyen atlamasi -- orn. Rusya'nin -179/+179 arasi kosesi) ya da
  // herhangi bir kose kutba (|enlem|>89) cok yakinsa true doner.
  risksAntimeridianOrPoleBug(positions) {
    if (!positions || positions.length < 2) return false;
    let previousLongitudeDeg;
    for (const position of positions) {
      const cartographic = cesium.Cartographic.fromCartesian(position);
      const latitudeDeg = cesium.Math.toDegrees(cartographic.latitude);
      if (Math.abs(latitudeDeg) > 89) return true;
      const longitudeDeg = cesium.Math.toDegrees(cartographic.longitude);
      if (previousLongitudeDeg !== void 0 && Math.abs(longitudeDeg - previousLongitudeDeg) > 180) {
        return true;
      }
      previousLongitudeDeg = longitudeDeg;
    }
    return false;
  }
  // bkz isSuspiciousCrsResult WHY yorumu -- supheli (cozulemeyen/gecersiz
  // aralikta) koordinatlarla yuklenen bir katmanda kucuk bir gercek
  // parselin (birkaç metre) kenarlari yanlislikla BINLERCE KM'lik "geodesic"
  // yaylara donusebilir; Cesium bu kenarlari uzunluklarina gore (granularity
  // parametresine bolerek) ADAPTIF olarak alt-bolumlere ayirir -- clampToGround
  // KAPALI olsa bile bu tessellation tek basina tarayiciyi donduren/coken bir
  // maliyete yol acabilir. granularity'yi olasi en buyuk anlamli deger olan
  // PI (yarim cember -- iki nokta arasindaki olasi EN UZUN geodesic/rhumb
  // mesafe) yaparak HICBIR ek alt-bolum noktasi uretilmemesini garantiliyoruz
  // -- zaten anlamsiz/yanlis konumdaki bu geometri icin gorsel bir kayip
  // degildir. (Ilk denemede arcType=NONE kullanilmisti, ama Cesium'un
  // PolygonOutlineGeometry'si SADECE GEODESIC/RHUMB kabul ediyor --
  // "DeveloperError: Invalid arcType" ile render'i tamamen durduruyordu;
  // granularity arcType'a hic dokunmadigi icin bu kisitlamayla CAKISMIYOR.)
  // (Bu yorum eskiden LayerManager.ts'teki yonlendirme metodunun ustundeydi.)
  flattenSuspiciousGeometry(dataSource) {
    dataSource.entities.suspendEvents();
    for (const entity of dataSource.entities.values) {
      if (entity.polygon !== void 0) entity.polygon.granularity = new cesium.ConstantProperty(Math.PI);
      if (entity.polyline !== void 0) entity.polyline.granularity = new cesium.ConstantProperty(Math.PI);
    }
    dataSource.entities.resumeEvents();
  }
  // Douglas-Peucker: iki "ucu sabit" nokta arasinda, dogruya en uzak noktayi
  // bulup toleransi asiyorsa iki alt segmente bolerek YİNELİ olarak devam
  // eder; toleransin altinda kalan araki noktalar (neredeyse duz bir cizgi
  // uzerindeler) tamamen atilir. Cartesian3 (ECEF/metre) uzayinda calisir --
  // bkz OUTLINE_SIMPLIFY_TOLERANCE_FACTOR yorumu (sadece companion dis hat
  // icin kullanilir, poligonun ASIL dolgu geometrisine HIC dokunulmaz).
  static douglasPeucker(points, toleranceMeters) {
    const keep = new Array(points.length).fill(false);
    keep[0] = true;
    keep[points.length - 1] = true;
    const stack = [[0, points.length - 1]];
    while (stack.length > 0) {
      const [start, end] = stack.pop();
      if (end <= start + 1) continue;
      let maxDistance = -1;
      let maxIndex = -1;
      for (let i = start + 1; i < end; i++) {
        const distance = _OutlineGeometry.perpendicularDistance(
          points[i],
          points[start],
          points[end]
        );
        if (distance > maxDistance) {
          maxDistance = distance;
          maxIndex = i;
        }
      }
      if (maxDistance > toleranceMeters) {
        keep[maxIndex] = true;
        stack.push([start, maxIndex], [maxIndex, end]);
      }
    }
    return points.filter((_, i) => keep[i]);
  }
  // "point"in, "lineStart"-"lineEnd" DOGRU PARCASINA (segmente, sonsuz
  // dogruya degil) en kisa mesafesi -- projeksiyon [0,1] disina duserse en
  // yakin uc noktaya kenetlenir.
  static perpendicularDistance(point, lineStart, lineEnd) {
    const lineVector = cesium.Cartesian3.subtract(lineEnd, lineStart, new cesium.Cartesian3());
    const lineLengthSquared = cesium.Cartesian3.magnitudeSquared(lineVector);
    if (lineLengthSquared === 0) return cesium.Cartesian3.distance(point, lineStart);
    const pointVector = cesium.Cartesian3.subtract(point, lineStart, new cesium.Cartesian3());
    const t = cesium.Math.clamp(
      cesium.Cartesian3.dot(pointVector, lineVector) / lineLengthSquared,
      0,
      1
    );
    const projection = cesium.Cartesian3.add(
      lineStart,
      cesium.Cartesian3.multiplyByScalar(lineVector, t, lineVector),
      lineVector
    );
    return cesium.Cartesian3.distance(point, projection);
  }
  // Douglas-Peucker sonrasi bile OUTLINE_MAX_VERTICES'i asan (kaynak veri
  // son derece yogunsa) bir diziyi, sekli KABACA koruyarak (esit araliklarla
  // orneklem alarak) sabit bir tavana indirir -- bkz o sabitin yorumu.
  static uniformDecimate(points, maxCount) {
    if (points.length <= maxCount) return [...points];
    const step = (points.length - 1) / (maxCount - 1);
    return Array.from({ length: maxCount }, (_, i) => points[Math.round(i * step)]);
  }
  // Poligonun bounding-box KOSEGENI (Cartesian3/ECEF metre) -- tolerans
  // buradan TUREYECEGI icin O(n) tek geciste eksen-hizali min/max yeterli,
  // gercek en-uzak-nokta-cifti (O(n^2)) hesaplamaya gerek yok.
  static polygonExtentMeters(positions) {
    let minX = Infinity;
    let minY = Infinity;
    let minZ = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    let maxZ = -Infinity;
    for (const p of positions) {
      if (p.x < minX) minX = p.x;
      if (p.x > maxX) maxX = p.x;
      if (p.y < minY) minY = p.y;
      if (p.y > maxY) maxY = p.y;
      if (p.z < minZ) minZ = p.z;
      if (p.z > maxZ) maxZ = p.z;
    }
    return Math.sqrt((maxX - minX) ** 2 + (maxY - minY) ** 2 + (maxZ - minZ) ** 2);
  }
  static simplifyOutlinePositions(positions) {
    const extent = _OutlineGeometry.polygonExtentMeters(positions);
    const tolerance = cesium.Math.clamp(
      extent * _OutlineGeometry.OUTLINE_SIMPLIFY_TOLERANCE_FACTOR,
      _OutlineGeometry.OUTLINE_SIMPLIFY_MIN_TOLERANCE_METERS,
      _OutlineGeometry.OUTLINE_SIMPLIFY_MAX_TOLERANCE_METERS
    );
    const simplified = _OutlineGeometry.douglasPeucker(positions, tolerance);
    return simplified.length > _OutlineGeometry.OUTLINE_MAX_VERTICES ? _OutlineGeometry.uniformDecimate(simplified, _OutlineGeometry.OUTLINE_MAX_VERTICES) : simplified;
  }
};
_OutlineGeometry.OUTLINE_SIMPLIFY_TOLERANCE_FACTOR = 7e-5;
_OutlineGeometry.OUTLINE_SIMPLIFY_MIN_TOLERANCE_METERS = 0.25;
_OutlineGeometry.OUTLINE_SIMPLIFY_MAX_TOLERANCE_METERS = 150;
_OutlineGeometry.OUTLINE_MAX_VERTICES = 1200;
let OutlineGeometry = _OutlineGeometry;
class OpacityController {
  constructor(options) {
    this.dataSourceOpacityStates = /* @__PURE__ */ new WeakMap();
    this.dataSourceOpacityProperties = /* @__PURE__ */ new WeakMap();
    this.requestRender = options.requestRender;
  }
  /** current property zaten bir opaklik sarmalayicisiysa, ICINDEKI mutable
   * baz rengi dondurur -- LayerManager.updateColorProperty bunu DOGRUDAN
   * mutasyona ugratarak property nesnesinin (ve dolayisiyla entity alaninin
   * referansinin) HIC degismemesini saglar. */
  getWrappedBaseColor(colorProperty) {
    return this.dataSourceOpacityProperties.get(colorProperty);
  }
  // DataSource opacity degistiginde tum entity'leri tekrar dolasmak pahali.
  // Her entity rengi bir kez dinamik property'ye cevrilir; slider suruklenirken
  // yalnizca katmanin opacity state'i guncellenir.
  prepareDataSourceOpacity(dataSource) {
    var _a2, _b;
    const state = this.getDataSourceOpacityState(dataSource);
    const time = cesium.JulianDate.now();
    dataSource.entities.suspendEvents();
    for (const entity of dataSource.entities.values) {
      if (((_a2 = entity.polygon) == null ? void 0 : _a2.material) instanceof cesium.ColorMaterialProperty) {
        const material = entity.polygon.material;
        this.installOpacityColorProperty(
          material.color,
          state,
          time,
          new cesium.Color(1, 1, 1, 0.5),
          (property) => material.color = property
        );
      }
      if (((_b = entity.polyline) == null ? void 0 : _b.material) instanceof cesium.ColorMaterialProperty) {
        const material = entity.polyline.material;
        this.installOpacityColorProperty(
          material.color,
          state,
          time,
          cesium.Color.WHITE,
          (property) => material.color = property
        );
      }
      if (entity.point !== void 0) {
        this.installOpacityColorProperty(
          entity.point.color,
          state,
          time,
          cesium.Color.WHITE,
          (property) => entity.point.color = property
        );
      }
      if (entity.billboard !== void 0) {
        this.installOpacityColorProperty(
          entity.billboard.color,
          state,
          time,
          cesium.Color.WHITE,
          (property) => entity.billboard.color = property
        );
      }
    }
    dataSource.entities.resumeEvents();
  }
  // OutlineGeometry'nin companion-outline teknigi (bkz LayerManager.
  // addPolygonOutlines/addPolygonOutlineCompanion) ile birlikte kullanilan
  // poligonlarda, dolgu rengi HER ZAMAN (setOpacity() hic cagrilmasa, deger
  // 1 kalsa dahi) dinamik bir CallbackProperty OLMALI -- deneyle dogrulandi:
  // Cesium'un ground-clamped GroundPrimitive/GroundPolylinePrimitive
  // compositing'i, STATIK (ConstantProperty) bir dolgu materyalini companion
  // polyline ile yanlis derinlik/compositing sirasina sokup companion'i
  // gorunmez kiliyor (kullanici bildirimi: "opaklığı maksimum yaptığımda
  // poligon geometri sınırları gözükmez hale geliyor"); dinamik (isConstant:
  // false) bir materyalde bu sorun OLUŞMUYOR. SADECE poligonun dolgu rengi
  // hedeflenir -- companion'in KENDI rengine dokunmaya gerek YOK (izole
  // deneyle dogrulandi). Paylasilan opaklik state'ini KULLANIR (ayri/notr
  // bir state DEGIL) -- boylece setOpacity() sonradan cagrilirsa bu zaten-
  // sarili property dogru sekilde tepki verir.
  ensureDynamicFillColor(dataSource, entity) {
    var _a2;
    if (!(((_a2 = entity.polygon) == null ? void 0 : _a2.material) instanceof cesium.ColorMaterialProperty)) return;
    const state = this.getDataSourceOpacityState(dataSource);
    const material = entity.polygon.material;
    this.installOpacityColorProperty(
      material.color,
      state,
      cesium.JulianDate.now(),
      new cesium.Color(1, 1, 1, 0.5),
      (property) => material.color = property
    );
  }
  setDataSourceOpacity(dataSource, opacity) {
    const state = this.getDataSourceOpacityState(dataSource);
    if (state.opacity === opacity) return;
    state.opacity = opacity;
    if (!state.wrapped && opacity !== 1) {
      this.prepareDataSourceOpacity(dataSource);
      state.wrapped = true;
    }
    this.requestRender();
  }
  getDataSourceOpacityState(dataSource) {
    let state = this.dataSourceOpacityStates.get(dataSource);
    if (state === void 0) {
      state = { opacity: 1, wrapped: false };
      this.dataSourceOpacityStates.set(dataSource, state);
    }
    return state;
  }
  installOpacityColorProperty(colorProperty, state, time, fallbackColor, assign) {
    if (colorProperty !== void 0 && this.dataSourceOpacityProperties.has(colorProperty)) {
      return;
    }
    const baseColor = this.readColorProperty(
      colorProperty,
      time,
      fallbackColor
    );
    const opacityProperty = this.createOpacityColorProperty(baseColor, state);
    assign(opacityProperty);
  }
  readColorProperty(colorProperty, time, fallbackColor) {
    const value = colorProperty == null ? void 0 : colorProperty.getValue(time);
    return value instanceof cesium.Color ? cesium.Color.clone(value, new cesium.Color()) : cesium.Color.clone(fallbackColor, new cesium.Color());
  }
  createOpacityColorProperty(baseColor, state) {
    const color = cesium.Color.clone(baseColor, new cesium.Color());
    const opacityProperty = new cesium.CallbackProperty((_time, result) => {
      const next = result instanceof cesium.Color ? result : new cesium.Color();
      next.red = color.red;
      next.green = color.green;
      next.blue = color.blue;
      next.alpha = color.alpha * state.opacity;
      return next;
    }, false);
    this.dataSourceOpacityProperties.set(opacityProperty, color);
    return opacityProperty;
  }
}
const _CameraHighlight = class _CameraHighlight {
  constructor(viewer, deps) {
    this.viewer = viewer;
    this.deps = deps;
  }
  /**
   * Kamerayı, katmanın tüm görünür alanına (extent) düz tepeden bakışla yakınlaştırır.
   *
   * @example
   * ```ts
   * await map.layerManager.zoomToLayer("katman-id");
   * ```
   */
  // viewer.zoomTo hem ImageryLayer hem DataSource kabul ettigi icin katmanin
  // turune bakmadan extent'ine (gorunur alanina) zoom yapar. Offset verilmezse
  // Cesium egik bir aciyla yaklasir; duz tepeden goruntu icin heading=0,
  // pitch=-90 derece kullanilir (range=0 -> tum katman otomatik sigacak sekilde).
  async zoomToLayer(id) {
    const managed = this.deps.requireLayer(id);
    return this.viewer.zoomTo(
      managed.cesiumObject,
      new cesium.HeadingPitchRange(0, -cesium.Math.PI_OVER_TWO, 0)
    );
  }
  /** Kamerayı, tek bir entity'nin çerçevesine düz tepeden bakışla yakınlaştırır. */
  // zoomToLayer ile AYNI top-down yaklasma (bkz yukaridaki yorum) ama TUM
  // katman yerine TEK bir entity'nin cercevesine -- TucbsIdentifyPanel'in
  // oznitelik tablosundaki "Yakınlaş" butonu icin (bkz PickedFeatureDetail.entity):
  // bir katmanda birden fazla feature varsa katmanin tamamina degil, sadece
  // TIKLANAN feature'a yakinlasmak istenir.
  //
  // viewer.zoomTo(entity, HeadingPitchRange(...range=0)) -- Cesium'un KENDI
  // otomatik mesafe hesabi -- entity'nin TUM visualizer'larindan (DataSourceDisplay)
  // derledigi bir bounding sphere kullanir; bu, entity'nin SADECE geometrisini
  // degil (varsa) ekran-uzayi boyutlu gorselleri (point/billboard/label pixelSize)
  // de kapsar ve bunlarin metreye cevirisi O ANKI kamera mesafesine baglidir --
  // identify tiklamasi genelde genis bir gorunumde yapildigindan bu cevirim
  // ABARTILI bir yaricap/mesafe uretebiliyordu (bkz kullanici geri bildirimi:
  // "GeoJSON feature'lara cok uzaktan zoomluyor... zoom to extent yapmiyor
  // musun"). Bunun yerine polygon/polyline geometrisi varsa bounding sphere
  // DOGRUDAN GERCEK KOORDINATLARDAN hesaplanip flyToBoundingSphere ile
  // gidilir -- sonuc SADECE feature'in gercek boyutuna bagli, kamera
  // mesafesinden BAGIMSIZDIR. Sadece nokta geometrisi olan (polygon/polyline
  // YOK) entity'lerde "extent" anlamsiz oldugundan eski davranis (Cesium'un
  // kendi zoomTo'su) korunur.
  async zoomToEntity(entity, options) {
    var _a2, _b;
    const time = this.viewer.clock.currentTime;
    let positions;
    if (((_a2 = entity.polygon) == null ? void 0 : _a2.hierarchy) !== void 0) {
      const hierarchy = entity.polygon.hierarchy.getValue(time);
      positions = hierarchy == null ? void 0 : hierarchy.positions;
    } else if (((_b = entity.polyline) == null ? void 0 : _b.positions) !== void 0) {
      positions = entity.polyline.positions.getValue(time);
    }
    if (positions !== void 0 && positions.length > 0) {
      const boundingSphere = cesium.BoundingSphere.fromPoints(positions);
      const range = Math.max(boundingSphere.radius * 2, 50);
      return new Promise((resolve) => {
        this.viewer.camera.flyToBoundingSphere(boundingSphere, {
          offset: new cesium.HeadingPitchRange(0, -cesium.Math.PI_OVER_TWO, range),
          // Cesium'un mesafeye gore OTOMATIK hesapladigi sure (uzak bir
          // noktadan yakinlasirken birkac saniyeye kadar cikabiliyor) yerine,
          // verilmisse SABIT/kisa bir sure kullanilir (bkz kullanici geri
          // bildirimi: "bu zoom'lama işi daha hızlı olsun").
          ...(options == null ? void 0 : options.duration) !== void 0 ? { duration: options.duration } : {},
          complete: () => resolve(true),
          cancel: () => resolve(false)
        });
      });
    }
    return this.viewer.zoomTo(
      entity,
      new cesium.HeadingPitchRange(0, -cesium.Math.PI_OVER_TWO, 0)
    );
  }
  // Bir entity'yi gorsel olarak vurgular -- TucbsIdentifyPanel'in "Yakınlaş"
  // butonu, kamera feature'a ulastiktan sonra HANGI feature'in bu oldugunu
  // gostermek icin zoomToEntity ile BIRLIKTE cagirir. Entity'nin KENDI
  // stilini (StyleEditor'un uyguladigi fill/outline) HIC DEGISTIRMEZ --
  // bunun yerine AYNI geometriyi izleyen, SABIT (animasyonsuz) bir GECICI
  // "stroke feature" ekler (this.highlightDataSource, bkz field yorumu).
  // Zamanlayiciyla KENDI KENDINE kaldirilmaz -- cagiran taraf (diyalog
  // kapaninca TucbsIdentifyPanel) clearHighlight()'i ACIKCA cagirmali (bkz
  // kullanici geri bildirimi: "En son diyaloğu kapanınca geçici feature'ı
  // kaldır"). Boylece orijinal entity'nin stilini "kaydet/geri yukle" gibi
  // riskli bir islem hic gerekmez.
  //
  // Vurgu rengi HER ZAMAN SABIT (HIGHLIGHT_COLOR, #00FFFF) -- katmanin/
  // feature'in KENDI dis hat rengi ARTIK kullanilmiyor (bkz kullanici geri
  // bildirimi: "highlight rengi sabit #00FFFF olsun" -- ONCEKI "kendi dış
  // hat renginde highlight edelim" karari BUNUNLA degistirildi). Genislik
  // hala entity'nin AIT OLDUGU katmanin O ANKI dis hat kalinligina gore
  // hesaplanir (appliedLayerStyles) -- mevcut dis hattin ustune SABIT bir
  // pay (+4px) eklenir, ust/alt sinir YOK (bkz kullanici geri bildirimi:
  // "6-16px arası sınırlı demişsin, kaldır") -- daha KALIN bir ikinci
  // cizgi, aynen ustunde durdugu icin kenarlardan tasarak zaten dikkat
  // ceker, animasyona GEREK KALMAZ.
  //
  // ONEMLI: nabiz animasyonu (CallbackProperty, isConstant:false) BILEREK
  // KALDIRILDI -- HER KAREDE yeniden degerlendirilen canli bir materyal,
  // "Yakınlaş" butonuna ust uste basildiginda (durationMs dolmadan) render
  // dongusunu tikayip sekmeyi/tarayiciyi dondurebiliyordu (bkz kullanici
  // geri bildirimi: "birkaç kez zoom yapınca tamamen donuyor"). Statik bir
  // ColorMaterialProperty (sabit Color, CallbackProperty DEGIL) bu riski
  // TAMAMEN ortadan kaldirir -- kac kez ust uste cagrilirsa cagrilsin
  // maliyeti SABITTIR (tek seferlik olusturma, GPU'ya SIFIR ek yuk).
  //
  // Nokta vurgusu disableDepthTestDistance:Infinity ile (derinlik testi
  // TAMAMEN devre disi -- her kosulda cizilir) her zaman ustte kalir.
  // Cizgi/poligon vurgusu icin de ayni garantiyi vermek uzere bir ara
  // denemede clampToGround:true + yuksek sabit zIndex (GroundPolylinePrimitive)
  // kullanilmisti -- ama bu teknik, egik/acili kamera bakislarinda cizgiyi
  // GOZLE GORULUR sekilde soluklastiriyordu (bkz kullanici geri bildirimi:
  // "silik silik gözüküyor" -- Cesium'un ground-primitive render tekniginin
  // BILINEN bir sinirlamasi). Kullanici NETLIGI tercih etti (bkz "Netlik
  // öncelikli" karari): bu yuzden cizgi/poligon vurgusu clampToGround
  // KULLANMAZ, SADECE depthFailMaterial ile terrain (arazi/tepe) tarafindan
  // ortulmeye karsi korunur -- bu uygulamada 3D bina/tileset olmadigindan
  // (SADECE 2D vektor katmanlar + arazi var) pratikte "her zaman ustte"
  // ihtiyacinin tamamini karsilar, cizgi de HER acida crisp/canli kalir.
  // Her pozisyonu KENDI yerel "yukari" yonunde (Cartographic.height + N metre)
  // kaldirir -- bkz HIGHLIGHT_ELEVATION_METERS WHY yorumu.
  static elevate(positions, meters) {
    return positions.map((position) => {
      const carto = cesium.Cartographic.fromCartesian(position);
      return cesium.Cartesian3.fromRadians(
        carto.longitude,
        carto.latitude,
        carto.height + meters
      );
    });
  }
  /** Bir entity'yi, kendi stiline dokunmadan sabit renkli bir "outline" ile geçici olarak vurgular (bkz yukarıdaki WHY notları). */
  highlightEntity(entity) {
    var _a2, _b, _c;
    const time = this.viewer.clock.currentTime;
    const props = (_a2 = entity.properties) == null ? void 0 : _a2.getValue(time);
    const layerId = props == null ? void 0 : props.layerId;
    const style = layerId !== void 0 ? this.deps.getLayerStyle(layerId) : void 0;
    const strokeColor = _CameraHighlight.HIGHLIGHT_COLOR;
    const strokeWidth = ((style == null ? void 0 : style.outline.width) ?? 2) + 4;
    const strokeMaterial = new cesium.ColorMaterialProperty(strokeColor);
    const highlight = new cesium.Entity();
    if (((_b = entity.polygon) == null ? void 0 : _b.hierarchy) !== void 0) {
      const hierarchy = entity.polygon.hierarchy.getValue(time);
      const positions = hierarchy == null ? void 0 : hierarchy.positions;
      if (positions === void 0 || positions.length < 2) return;
      const ring = cesium.Cartesian3.equals(positions[0], positions[positions.length - 1]) ? positions : [...positions, positions[0]];
      highlight.polyline = new cesium.PolylineGraphics({
        positions: _CameraHighlight.elevate(ring, _CameraHighlight.HIGHLIGHT_ELEVATION_METERS),
        width: strokeWidth,
        material: strokeMaterial,
        depthFailMaterial: strokeMaterial
      });
    } else if (((_c = entity.polyline) == null ? void 0 : _c.positions) !== void 0) {
      const positions = entity.polyline.positions.getValue(time);
      if (positions === void 0 || positions.length < 2) return;
      highlight.polyline = new cesium.PolylineGraphics({
        positions: _CameraHighlight.elevate(positions, _CameraHighlight.HIGHLIGHT_ELEVATION_METERS),
        width: strokeWidth,
        material: strokeMaterial,
        depthFailMaterial: strokeMaterial
      });
    } else if (entity.position !== void 0) {
      const position = entity.position.getValue(time);
      if (position === void 0) return;
      highlight.position = new cesium.ConstantPositionProperty(position);
      highlight.point = new cesium.PointGraphics({
        pixelSize: strokeWidth + 12,
        color: strokeColor,
        disableDepthTestDistance: Number.POSITIVE_INFINITY
      });
    } else {
      return;
    }
    if (!this.highlightDataSource) {
      this.highlightDataSource = new cesium.CustomDataSource("__tucbs_highlight__");
      void this.viewer.dataSources.add(this.highlightDataSource);
    } else {
      this.highlightDataSource.entities.removeAll();
    }
    this.highlightDataSource.entities.add(highlight);
  }
  /** {@link highlightEntity} ile eklenen geçici vurguyu kaldırır (aktif vurgu yoksa no-op). */
  // TucbsIdentifyPanel oznitelik tablosu diyalogu KAPANDIGINDA cagirir
  // (bkz kullanici geri bildirimi).
  clearHighlight() {
    var _a2;
    (_a2 = this.highlightDataSource) == null ? void 0 : _a2.entities.removeAll();
  }
};
_CameraHighlight.HIGHLIGHT_COLOR = cesium.Color.fromCssColorString("#00FFFF");
_CameraHighlight.HIGHLIGHT_ELEVATION_METERS = 0.5;
let CameraHighlight = _CameraHighlight;
const SEAM_COVER_WIDTH = 1;
const OUTLINE_ID_SUFFIX = "::outline";
class LayerStyleEngine {
  constructor(options) {
    this.appliedLayerStyles = /* @__PURE__ */ new Map();
    this.appliedCompanionWidths = /* @__PURE__ */ new Map();
    this.outlineGeometry = options.outlineGeometry;
    this.opacityController = options.opacityController;
    this.getCurrentTime = options.getCurrentTime;
    this.requestRender = options.requestRender;
    this.emitStyle = options.emitStyle;
    this.waitForRenderSettle = options.waitForRenderSettle;
  }
  // Donen Promise, GENISLIK gercekten degistiyse (bkz asagidaki widthChanged)
  // waitForRenderSettle() ile cozulur -- cagiran taraf (TucbsStyleEditor)
  // bu Promise'i "Uygulanıyor…" gostergesini ne kadar sure tutacagini
  // bilmek icin kullanabilir. Renk/opaklik gibi geometriye dokunmayan
  // degisikliklerde HEMEN cozulur (yapay bir bekleme EKLENMEZ).
  async applyLayerStyle(id, dataSource, isShapeLayer, spec) {
    var _a2;
    const previousWidth = this.appliedCompanionWidths.get(id) ?? ((_a2 = this.appliedLayerStyles.get(id)) == null ? void 0 : _a2.outline.width);
    const time = this.getCurrentTime();
    const range = this.resolveStyleRange(dataSource, time, spec.fill);
    const outlineCompanions = [];
    const fillColors = /* @__PURE__ */ new Map();
    dataSource.entities.suspendEvents();
    for (const entity of dataSource.entities.values) {
      if (this.outlineGeometry.isOutlineCompanion(entity)) {
        outlineCompanions.push(entity);
        continue;
      }
      const color = this.resolveFillColor(entity, spec.fill, range, time);
      if (entity.polygon !== void 0 && color !== void 0) fillColors.set(entity.id, color);
      this.applyEntityStyle(entity, color, spec.outline, isShapeLayer);
    }
    const companionWidth = this.styleOutlineCompanions(
      outlineCompanions,
      spec.outline,
      isShapeLayer,
      fillColors
    );
    dataSource.entities.resumeEvents();
    const resolvedSpec = range !== null && (spec.fill.mode === "gradient" || spec.fill.mode === "bin") ? { ...spec, fill: { ...spec.fill, min: range.min, max: range.max } } : spec;
    this.appliedLayerStyles.set(id, resolvedSpec);
    this.requestRender();
    this.emitStyle(id, resolvedSpec);
    this.appliedCompanionWidths.set(id, companionWidth);
    const widthChanged = previousWidth === void 0 || previousWidth !== companionWidth;
    if (widthChanged) await this.waitForRenderSettle();
  }
  // God component refactor Faz 3.6b: applyLayerStyle'in companion (dis hat)
  // dongusu buraya tasindi (applyLayerStyle karmasikligi 23 -> <20); davranis
  // DEGISMEDI. Donus: companion'lara FIILEN uygulanan genislik (dis hat
  // kapaliyken SEAM_COVER_WIDTH) -- applyLayerStyle bunu render-bekleme
  // karari icin saklar (bkz widthChanged).
  styleOutlineCompanions(companions, outline, isShapeLayer, fillColors) {
    const outlineColor = outline.enabled ? cesium.Color.fromCssColorString(outline.color) : void 0;
    const companionWidth = outline.enabled ? outline.width : SEAM_COVER_WIDTH;
    for (const companion of companions) {
      const seamColor = outline.enabled || isShapeLayer ? void 0 : fillColors.get(LayerStyleEngine.outlineOwnerId(companion));
      const seamCover = seamColor !== void 0 && seamColor.alpha >= 1;
      companion.show = outline.enabled || seamCover;
      const color = outlineColor ?? (seamCover ? seamColor : void 0);
      if (color !== void 0 && companion.polyline !== void 0) {
        companion.polyline.material = this.updateColorMaterial(
          companion.polyline.material,
          color
        );
        companion.polyline.width = LayerStyleEngine.updateConstantProperty(
          companion.polyline.width,
          companionWidth
        );
      }
    }
    return companionWidth;
  }
  // OutlineGeometry.addPolygonOutlineCompanion companion id'sini
  // `${poligonId}::outline` olarak verir.
  static outlineOwnerId(companion) {
    return companion.id.endsWith(OUTLINE_ID_SUFFIX) ? companion.id.slice(0, -OUTLINE_ID_SUFFIX.length) : companion.id;
  }
  /** Bir vektor katmana en son uygulanan stili döndürür (TucbsLegendPanel için). */
  getStyle(id) {
    return this.appliedLayerStyles.get(id);
  }
  /** Katman silinirken (LayerManager.remove) son uygulanan stil kaydini da temizler. */
  deleteStyle(id) {
    this.appliedLayerStyles.delete(id);
    this.appliedCompanionWidths.delete(id);
  }
  // Katman eklenirken atanan random rengi appliedLayerStyles'a "solid" stil
  // olarak kaydeder ve layer:style event'ini emit eder — TucbsStyleEditor ve
  // TucbsLayerList katman eklendigi an getLayerStyle() ile gercek/guncel
  // rengi okuyabilsin diye (bkz. ManagedLayer.initialFillColor: bu kayit
  // SONRAKI applyLayerStyle() cagrilariyla degisir, initialFillColor ise
  // sabit kalir ve "Sifirla" icin referans noktasidir).
  recordInitialStyle(id, colorHex, fillOpacity, outline) {
    const style = {
      fill: { mode: "solid", color: colorHex, opacity: fillOpacity },
      outline
    };
    this.appliedLayerStyles.set(id, style);
    this.emitStyle(id, style);
  }
  // Yerel dosyadan (GeoJSON/KML/KMZ/SHP) gelen her katman, Cesium'un varsayilan
  // sari renginde eklenmesin diye her eklemede rastgele bir renk alir.
  randomLayerColor() {
    return cesium.Color.fromRandom({ alpha: 1 });
  }
  // Iki cagiran grubu var: (1) KmlDataSource kendi stilini KML dosyasindan
  // alir, GeoJsonDataSource.load'daki fill/stroke/markerColor secenekleri
  // burada gecerli olmadigindan entity'lere yuklendikten sonra renk uygulanir.
  // (2) addWFS/addLocalKmlGeoJson(GEOJSON)/addShp -- GeoJsonDataSource.load
  // GeoJSON'da per-feature simplestyle "fill" alani yoksa TUM entity'lere TEK
  // bir PAYLASILAN materyal nesnesi atiyor; applyLayerStyle()'daki
  // updateColorMaterial() ise flicker'i onlemek icin bu nesneyi YENIDEN
  // OLUSTURMAK yerine yerinde mutasyona ugratiyor -- ikisi birlesince enum/
  // gradient/bin modunda TUM poligonlar en son islenen entity'nin rengini
  // gosteriyordu. Burada her entity'ye BASTAN bagimsiz bir materyal nesnesi
  // vererek bu paylasimi kiriyoruz.
  applyEntityColor(dataSource, color) {
    dataSource.entities.suspendEvents();
    for (const entity of dataSource.entities.values) {
      if (entity.polygon !== void 0) {
        entity.polygon.material = new cesium.ColorMaterialProperty(
          new cesium.ConstantProperty(color.withAlpha(0.5))
        );
      }
      if (entity.polyline !== void 0) {
        entity.polyline.material = new cesium.ColorMaterialProperty(
          new cesium.ConstantProperty(color)
        );
      }
      if (entity.point !== void 0) {
        entity.point.color = new cesium.ConstantProperty(color);
      }
      if (entity.billboard !== void 0) {
        entity.billboard.color = new cesium.ConstantProperty(color);
      }
    }
    dataSource.entities.resumeEvents();
  }
  // GeoJsonDataSource.load, Point/MultiPoint geometrileri icin HER ZAMAN
  // Cesium'in varsayilan PinBuilder billboard'ini (yer isareti/pin gorunumu)
  // uretir -- "markerColor" gibi secenekler SADECE bu pin'in rengini/boyutunu
  // degistirir, load-time'da "point" (daire) grafigine gecmenin bir secenegi
  // YOKTUR. WFS/GeoJSON/SHP katmanlarindaki nokta ozellikleri, Cizim/Olcu
  // Katmani ve CSV katmaniyla (bkz addCsv) AYNI "bilinen nokta stili"nde
  // (renkli daire) gorunmeli -- varsayilan pin "yer isareti" gibi
  // algilaniyordu (bkz kullanici geri bildirimi). Load SONRASI cagrilip
  // billboard'lari native point grafigine CEVIRIR. KML'i KAPSAMAZ (bkz
  // applyEntityColor) -- oradaki billboard KML dosyasinin KENDI ikonu,
  // generic bir pin degil.
  convertMarkersToPoints(dataSource, color) {
    dataSource.entities.suspendEvents();
    for (const entity of dataSource.entities.values) {
      if (entity.billboard === void 0) continue;
      const heightReference = entity.billboard.heightReference;
      entity.point = new cesium.PointGraphics({
        pixelSize: 8,
        color,
        ...heightReference !== void 0 ? { heightReference } : {}
      });
      entity.billboard = void 0;
    }
    dataSource.entities.resumeEvents();
  }
  // _addDrawnShape/_addMeasuredShape (LayerManager.ts) applyLayerStyle'dan
  // BAGIMSIZ olarak dogrudan cagirir (yeni cizilen/olculen sekle ilk stili
  // uygulamak icin) -- bu yuzden public.
  applyEntityStyle(entity, color, outline, isShapeLayer) {
    const outlineColor = outline.enabled ? cesium.Color.fromCssColorString(outline.color) : void 0;
    if (entity.polygon !== void 0) {
      entity.polygon.material = this.updateColorMaterial(
        entity.polygon.material,
        color ?? cesium.Color.WHITE.withAlpha(0)
      );
      if (!this.outlineGeometry.hasOutlineCompanion(entity) && !this.outlineGeometry.hasRiskyOutline(entity)) {
        entity.polygon.outline = LayerStyleEngine.updateConstantProperty(
          entity.polygon.outline,
          outline.enabled
        );
        if (outlineColor !== void 0) {
          entity.polygon.outlineColor = LayerStyleEngine.updateConstantProperty(
            entity.polygon.outlineColor,
            outlineColor
          );
          entity.polygon.outlineWidth = LayerStyleEngine.updateConstantProperty(
            entity.polygon.outlineWidth,
            outline.width
          );
        }
      }
    }
    if (entity.polyline !== void 0) {
      let lineColor;
      if (isShapeLayer) {
        lineColor = outlineColor ?? cesium.Color.WHITE.withAlpha(0);
      } else {
        lineColor = outline.enabled ? outlineColor : color;
      }
      entity.polyline.material = this.updateColorMaterial(
        entity.polyline.material,
        lineColor ?? cesium.Color.WHITE.withAlpha(0)
      );
      if (outline.enabled) {
        entity.polyline.width = LayerStyleEngine.updateConstantProperty(
          entity.polyline.width,
          outline.width
        );
      }
    }
    if (entity.point !== void 0) {
      entity.point.color = color !== void 0 ? this.updateColorProperty(entity.point.color, color) : void 0;
      if (outline.enabled && outlineColor !== void 0) {
        entity.point.outlineColor = LayerStyleEngine.updateConstantProperty(
          entity.point.outlineColor,
          outlineColor
        );
        entity.point.outlineWidth = LayerStyleEngine.updateConstantProperty(
          entity.point.outlineWidth,
          outline.width
        );
      }
    }
    if (entity.billboard !== void 0 && color !== void 0) {
      entity.billboard.color = this.updateColorProperty(
        entity.billboard.color,
        color
      );
    }
  }
  resolveFillColor(entity, fill, range, time) {
    switch (fill.mode) {
      case "off":
        return void 0;
      case "solid":
        return cesium.Color.fromCssColorString(fill.color).withAlpha(fill.opacity);
      case "gradient": {
        if (range === null) return void 0;
        const value = this.readNumericProperty(entity, fill.column, time);
        if (value === null) return void 0;
        if (value < range.min || value > range.max) return void 0;
        const t = range.max === range.min ? 0.5 : cesium.Math.clamp((value - range.min) / (range.max - range.min), 0, 1);
        return LayerStyleEngine.sampleFromPalette(fill.palette, t, fill.paletteKind).withAlpha(
          fill.opacity
        );
      }
      case "bin": {
        if (range === null) return void 0;
        const value = this.readNumericProperty(entity, fill.column, time);
        if (value === null) return void 0;
        const step = (range.max - range.min) / fill.binCount;
        const boundaries = Array.from(
          { length: fill.binCount },
          (_, i) => range.min + step * (i + 1)
        );
        const index = LayerStyleEngine.pickBin(value, boundaries);
        const t = fill.binCount <= 1 ? 0.5 : index / (fill.binCount - 1);
        return LayerStyleEngine.sampleFromPalette(fill.palette, t, fill.paletteKind).withAlpha(
          fill.opacity
        );
      }
      case "enum": {
        const value = this.readProperty(entity, fill.column, time);
        if (value === null) return void 0;
        const cssColor = fill.colors[String(value)];
        return cssColor !== void 0 ? cesium.Color.fromCssColorString(cssColor).withAlpha(fill.opacity) : cesium.Color.LIGHTGRAY.withAlpha(fill.opacity);
      }
    }
  }
  // applyLayerStyle() ve okuma metodlarinin (getUniqueColumnValues/getColumnRange)
  // paylastigi ortak property-okuma yardimcilari. entity.properties bir
  // PropertyBag'dir; getValue(time) TUM alanlari coz(ulmus) duz bir objede
  // dondurur (register()'daki tagEntities() ile eklenen layerId/featureId de
  // dahil, cagiran taraf onlari filtreliyor).
  readProperty(entity, column, time) {
    const bag = entity.properties;
    if (bag === void 0 || !bag.hasProperty(column)) return null;
    const resolved = bag.getValue(time);
    const value = resolved == null ? void 0 : resolved[column];
    if (value === void 0 || value === null) return null;
    return typeof value === "number" ? value : String(value);
  }
  readNumericProperty(entity, column, time) {
    const value = this.readProperty(entity, column, time);
    if (value === null) return null;
    const numeric = typeof value === "number" ? value : Number(value);
    return Number.isFinite(numeric) ? numeric : null;
  }
  // Gercek hatalar plani H7.2: gradient/bin araliginin her ucu AYRI AYRI
  // cozulur -- verilen uc aynen kullanilir, verilmeyen uc kolonun veri
  // araligindan alinir (GradientFillStyle/BinFillStyle sozlesmesi, bkz
  // layer.types.ts: min ve max icin ayri ayri "verilmezse veriden otomatik
  // hesaplanir"). Iki uc da verilmisse kolon araligi HIC hesaplanmaz
  // (tum entity'leri dolasan getColumnRange() maliyeti eskisi gibi yok).
  // ESKIDEN yalniz IKI UC BIRDEN verildiginde verilenler kullaniliyordu;
  // biri eksikse VERILEN uc da atilip tum kolon araligina geciliyordu --
  // StyleEditor'da Min girilip Max "Otomatik" birakilinca (ya da tersi)
  // girilen sinir haritaya hic yansimiyordu (saklanan stil de tum araligi
  // tasidigi icin lejant paneli/yazdirma da onu gosteriyordu).
  // Karar 1-A: uclardan biri veriden gelince min > max olabilir (orn. veri
  // 10-100 iken yalniz min: 150); buna EK bir kural uygulanmaz -- iki uc da
  // verilmis ters aralik da bugun oldugu gibi aynen gecer. UI (StyleEditor
  // checkGradientBound/computeMinMax) bunu zaten engeller; dogrudan API
  // cagiran taraf sorumludur (bkz LayerManager.applyLayerStyle JSDoc'u).
  resolveStyleRange(dataSource, time, fill) {
    if (fill.mode !== "gradient" && fill.mode !== "bin") return null;
    if (fill.min !== void 0 && fill.max !== void 0) return { min: fill.min, max: fill.max };
    const data = this.getColumnRange(dataSource, time, fill.column);
    if (data === null) return null;
    return { min: fill.min ?? data.min, max: fill.max ?? data.max };
  }
  /** Bir kolonun sayısal min/max aralığını döndürür (gradient/bin modunda min/max'tan verilmeyen uç için otomatik kullanılır). LayerManager.getColumnRange için de tek doğru kaynak. */
  getColumnRange(dataSource, time, column) {
    let min = Infinity;
    let max = -Infinity;
    for (const entity of dataSource.entities.values) {
      const value = this.readNumericProperty(entity, column, time);
      if (value === null) continue;
      if (value < min) min = value;
      if (value > max) max = value;
    }
    return Number.isFinite(min) && Number.isFinite(max) ? { min, max } : null;
  }
  // StyleEditor'de HER stil guncellemesinde (Dolgu/Dis Hat farketmez, tum
  // spec her seferinde yeniden gonderiliyor -- bkz TucbsStyleEditor
  // _scheduleApplyStyle) entity.polygon.outline/outlineWidth,
  // entity.polyline.width gibi GEOMETRI-ETKILEYEN Cesium graphics alanlarina
  // HER ZAMAN YENI bir ConstantProperty atamak (degeri ayni olsa BILE)
  // Cesium'un ilgili GeometryUpdater'ini "bu alan yapisal olarak degisti"
  // sanip altyapi Primitive'ini YIKIP YENIDEN KURMASINA yol aciyordu --
  // sekiller (ozellikle dis hat/"stroke") bir-iki kare kaybolup geri
  // geliyordu. VAR OLAN property zaten bir ConstantProperty ise SADECE
  // deger GERCEKTEN farkliysa setValue() ile YERINDE guncellenir --
  // ConstantProperty.setValue() bile deger ayni olsa "degisti" sayip
  // definitionChanged FIRLATABILDIGI icin (gercek kullanici geri bildirimi:
  // renk barinda SURUKLEYEREK hizli gecis yaparken -- her frame'de renk
  // GERCEKTEN degisirken width DEGISMEDIGI halde yine de "setValue"
  // cagriliyordu -- flicker acikca goruluyordu, ama tek tek tiklamada
  // GORULMUYORDU cunku tek bir gereksiz cagri COK DAHA AZ fark ediliyordu)
  // deger DEGISMEDIYSE property'ye HIC DOKUNULMAZ. Property yoksa (ilk
  // kurulum) yeni bir ConstantProperty olusturulup dondurulur.
  static valueEquals(a, b) {
    if (a instanceof cesium.Color || b instanceof cesium.Color) {
      return a instanceof cesium.Color && b instanceof cesium.Color && cesium.Color.equals(a, b);
    }
    return a === b;
  }
  static updateConstantProperty(current, value) {
    if (current instanceof cesium.ConstantProperty) {
      if (!LayerStyleEngine.valueEquals(current.getValue(), value)) {
        current.setValue(value);
      }
      return current;
    }
    return new cesium.ConstantProperty(value);
  }
  // entity.polygon/polyline.material.color, entity.point.color,
  // entity.billboard.color gibi "dolgu" renkleri prepareDataSourceOpacity()
  // tarafindan bir opaklik CallbackProperty'sine SARILMIS OLABILIR (bkz o
  // metod ve dataSourceOpacityProperties). updateConstantProperty'nin
  // ConstantProperty kontrolu bu CallbackProperty'yi TANIMADIGI icin (o bir
  // ConstantProperty DEGIL) her stil guncellemesinde -- ozellikle renk
  // barinda hizlica surukleyip HER FRAME'DE gercekten degisen bir renk
  // gonderilirken -- bu alan HER SEFERINDE brand-new bir property ile
  // DEGISTIRILIYORDU; bu da hem opaklik sarmalayicisini kaybediyor HEM DE
  // (asil "hızlı sürüklemede net flicker" nedeni) entity'nin materyal/renk
  // alanini GEREKSIZ yere surekli degistiriyordu. Property zaten opaklik-
  // sarmali ise, DataSourceOpacityProperties WeakMap'inden sarmalayicinin
  // ICINDEKI mutable baz rengi okunup DOGRUDAN guncellenir -- property
  // NESNESI (ve dolayisiyla entity alaninin referansi) HIC DEGISMEZ,
  // Cesium'un "yapisal degisiklik" tespit etme sansı olmaz.
  updateColorProperty(current, color) {
    const opacityBaseColor = current !== void 0 ? this.opacityController.getWrappedBaseColor(current) : void 0;
    if (opacityBaseColor !== void 0) {
      cesium.Color.clone(color, opacityBaseColor);
      return current;
    }
    if (current instanceof cesium.ConstantProperty) {
      if (!LayerStyleEngine.valueEquals(current.getValue(), color)) {
        current.setValue(color);
      }
      return current;
    }
    return new cesium.ConstantProperty(color);
  }
  // Ayni gerekceyle (bkz updateColorProperty) -- entity.polygon.material/
  // polyline.material gibi materyal alanlarina HER ZAMAN YENI bir
  // ColorMaterialProperty atamak yerine, VAR OLAN materyal zaten bu yapida
  // ise SADECE ic renk property'sini (opaklik-farkinda) guncelleriz.
  updateColorMaterial(current, color) {
    if (current instanceof cesium.ColorMaterialProperty) {
      current.color = this.updateColorProperty(current.color, color);
      return current;
    }
    return new cesium.ColorMaterialProperty(this.updateColorProperty(void 0, color));
  }
  // qualitative paletler (Set2/Tableau10 vb.) AYRIK kategorik renk setleridir --
  // karistirilirsa palette'te hic olmayan bulanik ara tonlar cikar. sequential/
  // diverging (rampa) paletlerde ise dogrusal karisim (lerp) beklenen davranistir.
  // paletteKind verilmezse (geriye donuk uyumluluk) sequential gibi davranilir.
  static sampleFromPalette(palette, t, paletteKind) {
    return paletteKind === "qualitative" ? LayerStyleEngine.sampleDiscrete(palette, t) : LayerStyleEngine.sampleGradient(palette, t);
  }
  // Hand-rolled lineer interpolasyon: d3-scale-chromatic gibi ek bagimlilik
  // EKLENMEDI (bkz. project_ucbp_api_styleeditor_arastirma — "@tucbs/core
  // Cesium-only peer dep" kurali).
  static sampleGradient(palette, t) {
    if (palette.length === 0) return cesium.Color.GRAY;
    if (palette.length === 1) return cesium.Color.fromCssColorString(palette[0]);
    const scaled = cesium.Math.clamp(t, 0, 1) * (palette.length - 1);
    const lowIndex = Math.floor(scaled);
    const highIndex = Math.min(palette.length - 1, lowIndex + 1);
    const localT = scaled - lowIndex;
    const low = cesium.Color.fromCssColorString(palette[lowIndex]);
    const high = cesium.Color.fromCssColorString(palette[highIndex]);
    return cesium.Color.lerp(low, high, localT, new cesium.Color());
  }
  // Karistirma yok -- en yakin palet rengine "yuvarlanir" (qualitative paletler
  // icin, sampleGradient'in dogrusal-karisim davranisinin yerine).
  static sampleDiscrete(palette, t) {
    if (palette.length === 0) return cesium.Color.GRAY;
    const index = Math.round(cesium.Math.clamp(t, 0, 1) * (palette.length - 1));
    return cesium.Color.fromCssColorString(palette[index]);
  }
  static pickBin(value, boundaries) {
    for (let i = 0; i < boundaries.length; i++) {
      if (value <= boundaries[i]) return i;
    }
    return boundaries.length - 1;
  }
}
function extractEpsgCode(srsName) {
  if (!/EPSG/i.test(srsName)) return void 0;
  const trimmed = srsName.trim();
  let end = trimmed.length;
  while (end > 0 && trimmed.charCodeAt(end - 1) >= 48 && trimmed.charCodeAt(end - 1) <= 57) {
    end--;
  }
  const digits = trimmed.slice(end);
  return digits.length > 0 ? digits : void 0;
}
const proj4DefRequests = /* @__PURE__ */ new Map();
async function registerProj4Def(proj4, epsgCode) {
  const name = `EPSG:${epsgCode}`;
  if (proj4.defs(name)) return true;
  let pending = proj4DefRequests.get(epsgCode);
  if (!pending) {
    pending = (async () => {
      try {
        const response = await fetch(`https://epsg.io/${epsgCode}.proj4`);
        if (!response.ok) return response.status === 404 ? "missing" : "transient-failure";
        const def = (await response.text()).trim();
        if (!def) return "missing";
        proj4.defs(name, def);
        return "registered";
      } catch {
        return "transient-failure";
      }
    })();
    proj4DefRequests.set(epsgCode, pending);
  }
  const result = await pending;
  if (result === "transient-failure" && proj4DefRequests.get(epsgCode) === pending) {
    proj4DefRequests.delete(epsgCode);
  }
  return result === "registered";
}
async function ensureProj4Def(epsgCode) {
  let proj4;
  try {
    ({ default: proj4 } = await import("proj4"));
  } catch {
    console.warn(
      `[ogc/proj4Defs] EPSG:${epsgCode} icin koordinat donusumu atlandi -- "proj4" paketi yuklu degil (peer dependency olarak eklenmemis). Bu EPSG kodunu kullanan WCS katmanlari yanlis/genis bir alanda gorunebilir.`
    );
    return void 0;
  }
  if (!await registerProj4Def(proj4, epsgCode)) {
    console.warn(
      `[ogc/proj4Defs] EPSG:${epsgCode} icin proj4 tanimi epsg.io'dan alinamadi (agsizlik veya gecersiz/desteklenmeyen kod olabilir). Bu EPSG kodunu kullanan WCS katmanlari yanlis/genis bir alanda gorunebilir.`
    );
    return void 0;
  }
  return proj4;
}
const CESIUM_BUILTIN_CRS_NAMES = /* @__PURE__ */ new Set([
  "urn:ogc:def:crs:OGC:1.3:CRS84",
  "EPSG:4326",
  "urn:ogc:def:crs:EPSG::4326"
]);
function defaultCrsFunction(coordinates) {
  return cesium.Cartesian3.fromDegrees(coordinates[0], coordinates[1], coordinates[2]);
}
function numericCodeString(code) {
  if (code === void 0) return void 0;
  const trimmed = String(code).trim();
  return /^\d+$/.test(trimmed) ? trimmed : void 0;
}
function isSuspiciousCrsResult(result) {
  return result !== null && result.kind !== "reprojected";
}
function firstCoordinatePair(value) {
  let current = value;
  while (Array.isArray(current) && current.length > 0 && Array.isArray(current[0])) {
    current = current[0];
  }
  if (Array.isArray(current) && current.length >= 2 && typeof current[0] === "number" && typeof current[1] === "number") {
    return [current[0], current[1]];
  }
  return void 0;
}
function findFirstCoordinates(geojson) {
  if (typeof geojson !== "object" || geojson === null) return void 0;
  const obj = geojson;
  if (obj.type === "FeatureCollection" && Array.isArray(obj.features)) {
    for (const feature of obj.features) {
      const coords = findFirstCoordinates(feature);
      if (coords) return coords;
    }
    return void 0;
  }
  if (obj.type === "Feature") return findFirstCoordinates(obj.geometry);
  if (obj.type === "GeometryCollection" && Array.isArray(obj.geometries)) {
    for (const geometry of obj.geometries) {
      const coords = findFirstCoordinates(geometry);
      if (coords) return coords;
    }
    return void 0;
  }
  if ("coordinates" in obj) return firstCoordinatePair(obj.coordinates);
  return void 0;
}
function resolveOrRejectUnresolvedCrs(key, crsName, looksLikeWgs84) {
  if (!looksLikeWgs84) {
    throw new GeometryError("CRS_UNRESOLVED_UNSUPPORTED", "Koordinat sistemi tanınamadı ve WGS84 ile uyumlu değil.");
  }
  cesium.GeoJsonDataSource.crsNames[key] = defaultCrsFunction;
  return { kind: "suspicious-unresolved-crs", crsName };
}
function acceptClaimedWgs84(key, looksLikeWgs84, shouldRegister) {
  if (!looksLikeWgs84) {
    throw new GeometryError("CRS_CLAIMED_WGS84_INVALID", "Koordinatlar WGS84 ile uyumlu değil.");
  }
  if (shouldRegister) cesium.GeoJsonDataSource.crsNames[key] = defaultCrsFunction;
  return null;
}
function computeLooksLikeWgs84(geojson) {
  const firstCoords = findFirstCoordinates(geojson);
  return !firstCoords || Math.abs(firstCoords[0]) <= 180 && Math.abs(firstCoords[1]) <= 90;
}
function resolveCrsFieldOrThrow(geojson, looksLikeWgs84) {
  const crs = "crs" in geojson ? geojson.crs : void 0;
  if (!crs || typeof crs !== "object") {
    if (!looksLikeWgs84) {
      throw new GeometryError(
        "CRS_MISSING_UNSUPPORTED",
        "Bu dosyada geçerli koordinat sistemi (CRS) bilgisi yok."
      );
    }
    return null;
  }
  return crs;
}
async function ensureGeoJsonCrsSupport(geojson) {
  var _a2, _b, _c;
  if (typeof geojson !== "object" || geojson === null) return null;
  const looksLikeWgs84 = computeLooksLikeWgs84(geojson);
  const crs = resolveCrsFieldOrThrow(geojson, looksLikeWgs84);
  if (!crs) return null;
  const isDeprecatedEpsgType = crs.type === "EPSG";
  const key = isDeprecatedEpsgType ? `EPSG:${(_a2 = crs.properties) == null ? void 0 : _a2.code}` : (_b = crs.properties) == null ? void 0 : _b.name;
  if (!key || typeof key !== "string") return null;
  if (CESIUM_BUILTIN_CRS_NAMES.has(key)) return acceptClaimedWgs84(key, looksLikeWgs84, false);
  const epsgCode = isDeprecatedEpsgType ? numericCodeString((_c = crs.properties) == null ? void 0 : _c.code) : extractEpsgCode(key);
  if (!epsgCode) {
    return resolveOrRejectUnresolvedCrs(key, key, looksLikeWgs84);
  }
  if (epsgCode === "4326") {
    return acceptClaimedWgs84(key, looksLikeWgs84, true);
  }
  const fromEpsg = `EPSG:${epsgCode}`;
  let proj4;
  try {
    ({ default: proj4 } = await import("proj4"));
  } catch {
    return resolveOrRejectUnresolvedCrs(key, fromEpsg, looksLikeWgs84);
  }
  if (!await registerProj4Def(proj4, epsgCode)) {
    return resolveOrRejectUnresolvedCrs(key, fromEpsg, looksLikeWgs84);
  }
  cesium.GeoJsonDataSource.crsNames[key] = (coordinates) => {
    const [lon, lat] = proj4(fromEpsg, "EPSG:4326", [coordinates[0], coordinates[1]]);
    return cesium.Cartesian3.fromDegrees(lon, lat, coordinates[2]);
  };
  return { kind: "reprojected", fromEpsg };
}
class LocalSourceLoader {
  constructor(viewer, deps) {
    this.viewer = viewer;
    this.deps = deps;
  }
  async addLocalKmlGeoJson(layerType, options) {
    let dataSource;
    let blobUrl;
    let crsInfo = null;
    const color = this.deps.styleEngine.randomLayerColor();
    let clampToGround = options.clampToGround ?? true;
    if (layerType === "GEOJSON") {
      const geojson = options.data instanceof File ? JSON.parse(await this.fileToText(options.data)) : options.data;
      crsInfo = await ensureGeoJsonCrsSupport(geojson);
      if (isSuspiciousCrsResult(crsInfo)) clampToGround = false;
      dataSource = await cesium.GeoJsonDataSource.load(geojson, {
        clampToGround,
        fill: color.withAlpha(0.5),
        stroke: color,
        strokeWidth: 2,
        markerColor: color
      });
      this.deps.styleEngine.applyEntityColor(dataSource, color);
      this.deps.styleEngine.convertMarkersToPoints(dataSource, color);
      if (isSuspiciousCrsResult(crsInfo)) this.deps.outlineGeometry.flattenSuspiciousGeometry(dataSource);
    } else {
      let kmlSource;
      if (options.data instanceof File) {
        blobUrl = this.fileToBlobUrl(options.data);
        kmlSource = blobUrl;
      } else {
        kmlSource = options.data;
      }
      dataSource = await cesium.KmlDataSource.load(kmlSource, {
        camera: this.viewer.scene.camera,
        canvas: this.viewer.scene.canvas,
        clampToGround
      });
      this.deps.styleEngine.applyEntityColor(dataSource, color);
    }
    this.deps.outlineGeometry.disableRiskyPolygonOutlines(dataSource);
    if (clampToGround) {
      this.deps.addPolygonOutlines(dataSource, this.deps.defaultOutlineColor, 2);
    }
    await this.viewer.dataSources.add(dataSource);
    if (blobUrl !== void 0) {
      URL.revokeObjectURL(blobUrl);
    }
    const colorHex = color.toCssHexString();
    const managed = this.deps.register(
      options.id,
      options.title,
      layerType,
      dataSource,
      false,
      colorHex
    );
    this.deps.emitCrsCheckResult(managed.id, crsInfo);
    this.deps.styleEngine.recordInitialStyle(managed.id, colorHex, 0.5, {
      enabled: true,
      color: this.deps.defaultOutlineColorHex,
      width: 2
    });
    await this.deps.waitForRenderSettle();
    return managed;
  }
  // ── İç: SHP ──────────────────────────────────────────────────────────────
  async addShp(options) {
    let shp;
    try {
      ({ getShapefile: shp } = await import("shpjs"));
    } catch {
      throw new LayerOperationError(
        "LAYER_SHP_PACKAGE_MISSING",
        'SHP katmanı için "shpjs" paketi gereklidir: shpjs kütüphanesini import etmelisiniz'
      );
    }
    const source = options.data instanceof File ? await this.fileToArrayBuffer(options.data) : options.data;
    const result = await shp(source);
    const geojson = Array.isArray(result) ? {
      type: "FeatureCollection",
      features: result.flatMap((collection) => collection.features)
    } : result;
    return loadVectorGeoJsonLayer(this.viewer, this.deps, geojson, {
      id: options.id,
      title: options.title,
      layerType: "SHP",
      clampToGround: options.clampToGround ?? true
    });
  }
  // ── İç: CSV ──────────────────────────────────────────────────────────────
  async addCsv(options) {
    let Papa;
    try {
      ({ default: Papa } = await import("papaparse"));
    } catch {
      throw new LayerOperationError(
        "LAYER_CSV_PACKAGE_MISSING",
        'CSV katmanı için "papaparse" paketi gereklidir: papaparse kütüphanesini import etmelisiniz'
      );
    }
    const text = options.data instanceof File ? await this.fileToText(options.data) : options.data;
    const parsed = Papa.parse(text, {
      header: true,
      dynamicTyping: true
    });
    const rows = parsed.data;
    const sample = rows.find((row) => row && Object.keys(row).length > 0);
    const keys = sample && this.detectLatLonKeys(sample);
    if (!keys) {
      throw new LayerOperationError("LAYER_CSV_LATLON_NOT_FOUND", "CSV içinde lat/lon sütunlarını bulamadım (ör: lat, lon).");
    }
    const color = this.deps.styleEngine.randomLayerColor();
    const dataSource = new cesium.CustomDataSource(options.title);
    for (const row of rows) {
      const lat = Number(row[keys.lat]);
      const lon = Number(row[keys.lon]);
      if (Number.isFinite(lat) && Number.isFinite(lon)) {
        dataSource.entities.add({
          position: cesium.Cartesian3.fromDegrees(lon, lat),
          point: { pixelSize: 6, color },
          properties: row
        });
      }
    }
    await this.viewer.dataSources.add(dataSource);
    const colorHex = color.toCssHexString();
    const managed = this.deps.register(
      options.id,
      options.title,
      "CSV",
      dataSource,
      false,
      colorHex
    );
    this.deps.styleEngine.recordInitialStyle(managed.id, colorHex, 1, {
      enabled: false,
      color: colorHex,
      width: 0
    });
    return managed;
  }
  // CSV basliklarindaki lat/lon sutunlarini yaygin adlandirma varyasyonlarina
  // gore (case-insensitive) bulur; bulamazsa null doner.
  detectLatLonKeys(row) {
    const keys = Object.keys(row).reduce(
      (acc, key) => {
        const lowerKey = key.toLowerCase();
        if (!acc.lat && /^(lat|latitude|y)$/.test(lowerKey)) acc.lat = key;
        if (!acc.lon && /^(lon|lng|long|longitude|x)$/.test(lowerKey))
          acc.lon = key;
        return acc;
      },
      { lat: "", lon: "" }
    );
    return keys.lat && keys.lon ? keys : null;
  }
  async fileToText(file) {
    return decodeTextBuffer(await file.arrayBuffer());
  }
  fileToBlobUrl(file) {
    return URL.createObjectURL(file);
  }
  fileToArrayBuffer(file) {
    return file.arrayBuffer();
  }
}
async function loadVectorGeoJsonLayer(viewer, deps, geojson, layer, afterRegister) {
  const crsInfo = await ensureGeoJsonCrsSupport(geojson);
  const color = deps.styleEngine.randomLayerColor();
  const clampToGround = isSuspiciousCrsResult(crsInfo) ? false : layer.clampToGround;
  const dataSource = await cesium.GeoJsonDataSource.load(geojson, {
    clampToGround,
    fill: color.withAlpha(0.5),
    stroke: color,
    strokeWidth: 2,
    markerColor: color
  });
  deps.styleEngine.applyEntityColor(dataSource, color);
  deps.styleEngine.convertMarkersToPoints(dataSource, color);
  deps.outlineGeometry.disableRiskyPolygonOutlines(dataSource);
  if (isSuspiciousCrsResult(crsInfo)) deps.outlineGeometry.flattenSuspiciousGeometry(dataSource);
  if (clampToGround) {
    deps.addPolygonOutlines(dataSource, deps.defaultOutlineColor, 2);
  }
  await viewer.dataSources.add(dataSource);
  const colorHex = color.toCssHexString();
  const managed = deps.register(layer.id, layer.title, layer.layerType, dataSource, false, colorHex);
  deps.emitCrsCheckResult(managed.id, crsInfo);
  afterRegister == null ? void 0 : afterRegister(managed);
  deps.styleEngine.recordInitialStyle(managed.id, colorHex, 0.5, {
    enabled: true,
    color: deps.defaultOutlineColorHex,
    width: 2
  });
  await deps.waitForRenderSettle();
  return managed;
}
function decodeTextBuffer(buffer) {
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(buffer);
  } catch {
    return new TextDecoder("windows-1254").decode(buffer);
  }
}
const els = (root, localName) => Array.from(root.getElementsByTagNameNS("*", localName));
const el = (root, localName) => els(root, localName)[0];
const txt = (root, localName) => {
  var _a2, _b;
  return (_b = (_a2 = el(root, localName)) == null ? void 0 : _a2.textContent) == null ? void 0 : _b.trim();
};
function buildWfsCapabilitiesUrl(raw) {
  const u = new URL(raw, window.location.origin);
  const capsUrl = new URL(`${u.origin}${u.pathname}`);
  for (const [key, value] of u.searchParams.entries()) {
    const k = key.toLowerCase();
    if (k === "url" || k === "tucbsapikey") {
      capsUrl.searchParams.set(key, value);
    }
  }
  capsUrl.searchParams.set("service", "WFS");
  capsUrl.searchParams.set("request", "GetCapabilities");
  capsUrl.searchParams.set("acceptVersions", "2.0.0,1.1.0,1.0.0");
  return capsUrl.toString();
}
function isOgcExceptionXml(text) {
  const t = text.trimStart();
  return t.startsWith("<") && (t.includes("ExceptionReport") || t.includes("ServiceExceptionReport"));
}
function repairBareAmpersands(xml) {
  return xml.replace(/&(?!(?:amp|lt|gt|quot|apos|#\d+|#x[\da-fA-F]+);)/gi, "&amp;");
}
async function fetchWfsCapabilities(url, fetchOptions = {}) {
  const response = await fetch(buildWfsCapabilitiesUrl(url), fetchOptions);
  if (!response.ok) {
    throw new OgcRequestError(
      "OGC_CAPABILITIES_REQUEST_FAILED",
      `WFS GetCapabilities başarısız: ${response.status} ${response.statusText}`
    );
  }
  const xml = await response.text();
  if (isOgcExceptionXml(xml)) {
    throw new OgcRequestError("OGC_CAPABILITIES_EXCEPTION", "WFS GetCapabilities OGC Exception döndü.");
  }
  const safeXml = repairBareAmpersands(xml);
  const doc = new DOMParser().parseFromString(safeXml, "application/xml");
  if (doc.querySelector("parsererror")) {
    throw new OgcRequestError("OGC_CAPABILITIES_PARSE_FAILED", "WFS GetCapabilities XML parse edilemedi.");
  }
  const version = doc.documentElement.getAttribute("version") || "2.0.0";
  const featureTypes = [];
  for (const node of els(doc, "FeatureType")) {
    const name = txt(node, "Name") || "";
    if (!name) continue;
    const outputFormats2 = els(node, "OutputFormats").flatMap(
      (of) => els(of, "Format").map((f) => {
        var _a2;
        return ((_a2 = f.textContent) == null ? void 0 : _a2.trim()) || "";
      }).filter(Boolean)
    );
    const title = txt(node, "Title");
    const defaultCRS = txt(node, "DefaultCRS");
    const defaultSRS = txt(node, "DefaultSRS");
    featureTypes.push({
      name,
      ...title ? { title } : {},
      ...defaultCRS ? { defaultCRS } : {},
      ...defaultSRS ? { defaultSRS } : {},
      ...outputFormats2.length ? { outputFormats: outputFormats2 } : {}
    });
  }
  const opMeta = el(doc, "OperationsMetadata");
  let outputFormats = [];
  if (opMeta) {
    const getFeatureOp = els(opMeta, "Operation").find(
      (op) => (op.getAttribute("name") || "") === "GetFeature"
    );
    const ofParam = els(getFeatureOp ?? opMeta, "Parameter").find(
      (p) => (p.getAttribute("name") || "").toLowerCase() === "outputformat"
    );
    if (ofParam) {
      outputFormats = els(ofParam, "Value").map((v) => {
        var _a2;
        return ((_a2 = v.textContent) == null ? void 0 : _a2.trim()) || "";
      }).filter(Boolean);
    }
  }
  if (!outputFormats.length) {
    const seen = /* @__PURE__ */ new Set();
    outputFormats = featureTypes.flatMap((ft) => ft.outputFormats || []).filter((f) => !seen.has(f) && seen.add(f));
  }
  return { version, featureTypes, outputFormats };
}
function normName(name) {
  return name.trim().toLowerCase();
}
function localTypeName(name) {
  const idx = name.lastIndexOf(":");
  return idx >= 0 ? name.slice(idx + 1) : name;
}
function resolveWfsFeatureType(hint, featureTypes) {
  if (!featureTypes.length) {
    throw new OgcRequestError("OGC_FEATURE_TYPE_NOT_FOUND", "WFS FeatureType bulunamadı.");
  }
  const h = hint == null ? void 0 : hint.trim();
  if (h) {
    const exact = featureTypes.find((ft) => normName(ft.name) === normName(h));
    if (exact) return exact;
    const local = normName(localTypeName(h));
    const byLocal = featureTypes.find(
      (ft) => normName(localTypeName(ft.name)) === local
    );
    if (byLocal) return byLocal;
  }
  return featureTypes[0];
}
function pickJsonOutput(formats) {
  const prefs = [
    "application/geo+json",
    "application/json;subtype=geojson",
    "application/json",
    "geojson",
    "json",
    "esrigeojson",
    "geojson+gzip",
    "geojson+zip"
  ];
  const norm = formats.map((f) => f.toLowerCase().replace(/\s+/g, ""));
  for (const p of prefs) {
    const i = norm.findIndex((f) => f === p || f.includes(p));
    if (i >= 0) return formats[i] ?? null;
  }
  return null;
}
function buildWfsGetFeaturePlan(args) {
  const ft = resolveWfsFeatureType(args.typeNameHint, args.caps.featureTypes);
  const version = args.version || args.caps.version || "2.0.0";
  const srsName = args.srsName || ft.defaultCRS || ft.defaultSRS || "EPSG:4326";
  const jsonOutputFormat = args.outputFormat || pickJsonOutput(ft.outputFormats || []) || pickJsonOutput(args.caps.outputFormats);
  const maxFeatures = args.maxFeatures ?? 5e3;
  return {
    version,
    typeName: ft.name,
    srsName,
    jsonOutputFormat,
    maxFeatures
  };
}
function appendWfsGetFeatureParams(params, plan, outputFormat) {
  params.set("service", "WFS");
  params.set("request", "GetFeature");
  params.set("version", plan.version);
  const isV2 = plan.version.startsWith("2.");
  params.set(isV2 ? "typeNames" : "typeName", plan.typeName);
  params.set("srsName", plan.srsName);
  if (outputFormat) {
    params.set("outputFormat", outputFormat);
  }
  const limitParam = isV2 ? "count" : "maxFeatures";
  params.set(limitParam, String(plan.maxFeatures));
}
async function getCapabilities(url, authToken, authContext) {
  const headers = authContext == null ? void 0 : authContext.mergeApiKeyHeader(authContext.buildAuthHeaders(authToken), url);
  const response = await fetch(url, headers ? { headers } : void 0);
  if (!response.ok) {
    throw new OgcRequestError("OGC_CAPABILITIES_REQUEST_FAILED", `GetCapabilities isteği başarısız: ${response.status} ${response.statusText}`);
  }
  const text = await response.text();
  const doc = new DOMParser().parseFromString(text, "application/xml");
  if (doc.getElementsByTagName("parsererror").length > 0) {
    throw new OgcRequestError("OGC_SERVICE_DISCOVERY_PARSE_FAILED", "GetCapabilities yanıtı XML olarak ayrıştırılamadı.");
  }
  return doc;
}
function parseWmsStyles(xml, layerName) {
  var _a2, _b, _c, _d;
  const layerEl = elementsByLocalName(xml, "Layer").find(
    (layer) => {
      var _a3, _b2;
      return ((_b2 = (_a3 = childByLocalName(layer, "Name")) == null ? void 0 : _a3.textContent) == null ? void 0 : _b2.trim()) === layerName;
    }
  );
  if (!layerEl) return [];
  const styles = [];
  for (const styleEl of Array.from(layerEl.children)) {
    if (styleEl.localName !== "Style") continue;
    const name = (_b = (_a2 = childByLocalName(styleEl, "Name")) == null ? void 0 : _a2.textContent) == null ? void 0 : _b.trim();
    if (!name) continue;
    const title = ((_d = (_c = childByLocalName(styleEl, "Title")) == null ? void 0 : _c.textContent) == null ? void 0 : _d.trim()) ?? name;
    styles.push({ name, title });
  }
  return styles;
}
function parseWmtsStyles(xml, layerName) {
  var _a2, _b, _c, _d, _e;
  const layerEl = elementsByLocalName(xml, "Layer").find(
    (layer) => {
      var _a3, _b2;
      return ((_b2 = (_a3 = childByLocalName(layer, "Identifier")) == null ? void 0 : _a3.textContent) == null ? void 0 : _b2.trim()) === layerName;
    }
  );
  if (!layerEl) return [];
  const styles = [];
  for (const styleEl of Array.from(layerEl.children)) {
    if (styleEl.localName !== "Style") continue;
    const name = (_b = (_a2 = childByLocalName(styleEl, "Identifier")) == null ? void 0 : _a2.textContent) == null ? void 0 : _b.trim();
    if (!name) continue;
    const title = ((_d = (_c = childByLocalName(styleEl, "Title")) == null ? void 0 : _c.textContent) == null ? void 0 : _d.trim()) ?? name;
    const legendUrl = ((_e = childByLocalName(styleEl, "LegendURL")) == null ? void 0 : _e.getAttribute("xlink:href")) ?? "";
    const isDefault = styleEl.getAttribute("isDefault") === "true";
    styles.push({ name, title, legendUrl, isDefault });
  }
  styles.sort((a, b) => Number(b.isDefault) - Number(a.isDefault));
  return styles.map((style) => ({ name: style.name, title: style.title, legendUrl: style.legendUrl }));
}
function buildCapabilitiesUrl(baseUrl, serviceType, version) {
  const url = new URL(baseUrl);
  url.searchParams.set("SERVICE", serviceType);
  url.searchParams.set("REQUEST", "GetCapabilities");
  url.searchParams.set("VERSION", version);
  return url.toString();
}
function elementsByLocalName(root, tagName) {
  return Array.from(root.getElementsByTagNameNS("*", tagName));
}
function childByLocalName(element, tagName) {
  return Array.from(element.children).find(
    (child) => child.localName === tagName
  );
}
function parseWmsGeographicBoundingBox(layer) {
  var _a2, _b, _c, _d;
  const exBbox = childByLocalName(layer, "EX_GeographicBoundingBox");
  if (exBbox) {
    const west = (_a2 = childByLocalName(exBbox, "westBoundLongitude")) == null ? void 0 : _a2.textContent;
    const east = (_b = childByLocalName(exBbox, "eastBoundLongitude")) == null ? void 0 : _b.textContent;
    const south = (_c = childByLocalName(exBbox, "southBoundLatitude")) == null ? void 0 : _c.textContent;
    const north = (_d = childByLocalName(exBbox, "northBoundLatitude")) == null ? void 0 : _d.textContent;
    if (west && east && south && north) {
      const box = {
        west: Number(west),
        south: Number(south),
        east: Number(east),
        north: Number(north)
      };
      if (Object.values(box).every(Number.isFinite)) return box;
    }
  }
  const llBbox = childByLocalName(layer, "LatLonBoundingBox");
  if (llBbox) {
    const box = {
      west: Number(llBbox.getAttribute("minx")),
      south: Number(llBbox.getAttribute("miny")),
      east: Number(llBbox.getAttribute("maxx")),
      north: Number(llBbox.getAttribute("maxy"))
    };
    if (Object.values(box).every(Number.isFinite)) return box;
  }
  return void 0;
}
function parseWmsCapabilities(doc) {
  var _a2;
  const items = [];
  for (const layer of elementsByLocalName(doc, "Layer")) {
    const nameEl = childByLocalName(layer, "Name");
    if (!(nameEl == null ? void 0 : nameEl.textContent)) continue;
    const titleEl = childByLocalName(layer, "Title");
    const geographicBoundingBox = parseWmsGeographicBoundingBox(layer);
    items.push({
      identifier: nameEl.textContent.trim(),
      title: ((_a2 = titleEl == null ? void 0 : titleEl.textContent) == null ? void 0 : _a2.trim()) || nameEl.textContent.trim(),
      ...geographicBoundingBox && { geographicBoundingBox }
    });
  }
  return items;
}
function parseWmsTiffFormat(doc) {
  const getMapEl = elementsByLocalName(doc, "GetMap")[0];
  if (!getMapEl) return void 0;
  const formats = new Set(
    elementsByLocalName(getMapEl, "Format").map((el2) => {
      var _a2;
      return (_a2 = el2.textContent) == null ? void 0 : _a2.trim().toLowerCase();
    }).filter((value) => !!value)
  );
  if (formats.has("image/geotiff")) return "image/geotiff";
  if (formats.has("image/tiff")) return "image/tiff";
  return void 0;
}
function parseWcsTiffFormat(doc) {
  const formats = new Set(
    elementsByLocalName(doc, "formatSupported").map((el2) => {
      var _a2;
      return (_a2 = el2.textContent) == null ? void 0 : _a2.trim().toLowerCase();
    }).filter((value) => !!value)
  );
  if (formats.has("image/geotiff")) return "image/geotiff";
  if (formats.has("image/tiff")) return "image/tiff";
  return void 0;
}
function parseWmtsCapabilities(doc) {
  var _a2;
  const items = [];
  for (const layer of elementsByLocalName(doc, "Layer")) {
    const idEl = childByLocalName(layer, "Identifier");
    if (!(idEl == null ? void 0 : idEl.textContent)) continue;
    const titleEl = childByLocalName(layer, "Title");
    const tmsLinkEl = childByLocalName(layer, "TileMatrixSetLink");
    const tmsEl = tmsLinkEl ? childByLocalName(tmsLinkEl, "TileMatrixSet") : void 0;
    items.push({
      identifier: idEl.textContent.trim(),
      title: ((_a2 = titleEl == null ? void 0 : titleEl.textContent) == null ? void 0 : _a2.trim()) || idEl.textContent.trim(),
      ...(tmsEl == null ? void 0 : tmsEl.textContent) && { tileMatrixSetID: tmsEl.textContent.trim() }
    });
  }
  return items;
}
function parseWfsCapabilities(doc) {
  var _a2;
  const items = [];
  for (const featureType of elementsByLocalName(doc, "FeatureType")) {
    const nameEl = childByLocalName(featureType, "Name");
    if (!(nameEl == null ? void 0 : nameEl.textContent)) continue;
    const titleEl = childByLocalName(featureType, "Title");
    items.push({
      identifier: nameEl.textContent.trim(),
      title: ((_a2 = titleEl == null ? void 0 : titleEl.textContent) == null ? void 0 : _a2.trim()) || nameEl.textContent.trim()
    });
  }
  return items;
}
function parseWcsCapabilities(doc) {
  var _a2, _b;
  const items = [];
  for (const summary of elementsByLocalName(doc, "CoverageSummary")) {
    const idEl = childByLocalName(summary, "CoverageId") ?? childByLocalName(summary, "Identifier");
    if (!(idEl == null ? void 0 : idEl.textContent)) continue;
    const titleEl = childByLocalName(summary, "Title");
    items.push({
      identifier: idEl.textContent.trim(),
      title: ((_a2 = titleEl == null ? void 0 : titleEl.textContent) == null ? void 0 : _a2.trim()) || idEl.textContent.trim()
    });
  }
  if (items.length > 0) return items;
  for (const brief of elementsByLocalName(doc, "CoverageOfferingBrief")) {
    const nameEl = childByLocalName(brief, "name");
    if (!(nameEl == null ? void 0 : nameEl.textContent)) continue;
    const labelEl = childByLocalName(brief, "label");
    items.push({
      identifier: nameEl.textContent.trim(),
      title: ((_b = labelEl == null ? void 0 : labelEl.textContent) == null ? void 0 : _b.trim()) || nameEl.textContent.trim()
    });
  }
  return items;
}
async function parseWcsCoverageEnvelope(descriptionEl) {
  var _a2, _b, _c, _d;
  const boundedByEl = childByLocalName(descriptionEl, "boundedBy");
  const envelopeEl = boundedByEl ? childByLocalName(boundedByEl, "Envelope") : void 0;
  if (!envelopeEl) return void 0;
  const lowerText = (_b = (_a2 = childByLocalName(envelopeEl, "lowerCorner")) == null ? void 0 : _a2.textContent) == null ? void 0 : _b.trim();
  const upperText = (_d = (_c = childByLocalName(envelopeEl, "upperCorner")) == null ? void 0 : _c.textContent) == null ? void 0 : _d.trim();
  if (!lowerText || !upperText) return void 0;
  const lower = lowerText.split(/\s+/).map(Number);
  const upper = upperText.split(/\s+/).map(Number);
  if (lower.length < 2 || upper.length < 2) return void 0;
  if (![...lower, ...upper].every(Number.isFinite)) return void 0;
  const axisLabels = (envelopeEl.getAttribute("axisLabels") ?? "").trim().toLowerCase();
  const uomLabels = (envelopeEl.getAttribute("uomLabels") ?? "").toLowerCase();
  if (uomLabels.includes("deg")) {
    const latFirst = axisLabels.startsWith("lat");
    return latFirst ? { south: lower[0], west: lower[1], north: upper[0], east: upper[1] } : { west: lower[0], south: lower[1], east: upper[0], north: upper[1] };
  }
  const srsName = envelopeEl.getAttribute("srsName") ?? "";
  return resolveProjectedEnvelope(srsName, axisLabels, lower, upper);
}
async function resolveProjectedEnvelope(srsName, axisLabels, lower, upper) {
  const epsgCode = extractEpsgCode(srsName);
  if (!epsgCode) return void 0;
  const proj4 = await ensureProj4Def(epsgCode);
  if (!proj4) return void 0;
  try {
    const yFirst = axisLabels.startsWith("y") || axisLabels.startsWith("n");
    const toXY = (pair) => yFirst ? [pair[1], pair[0]] : [pair[0], pair[1]];
    const [lx, ly] = toXY(lower);
    const [ux, uy] = toXY(upper);
    const corners = [
      [lx, ly],
      [ux, uy],
      [lx, uy],
      [ux, ly]
    ];
    const from = `EPSG:${epsgCode}`;
    const projected = corners.map((xy2) => proj4(from, "EPSG:4326", xy2));
    const lons = projected.map((p) => p[0]);
    const lats = projected.map((p) => p[1]);
    const box = {
      west: Math.min(...lons),
      east: Math.max(...lons),
      south: Math.min(...lats),
      north: Math.max(...lats)
    };
    if (!Object.values(box).every(Number.isFinite)) return void 0;
    return box;
  } catch {
    return void 0;
  }
}
async function fetchWcsCoverageExtents(rawUrl, coverageIds, authToken, authContext) {
  var _a2;
  const result = /* @__PURE__ */ new Map();
  if (coverageIds.length === 0) return result;
  try {
    const url = new URL(rawUrl);
    url.searchParams.set("SERVICE", "WCS");
    url.searchParams.set("VERSION", "2.0.1");
    url.searchParams.set("REQUEST", "DescribeCoverage");
    url.searchParams.set("COVERAGEID", coverageIds.join(","));
    const doc = await getCapabilities(url.toString(), authToken, authContext);
    for (const descEl of elementsByLocalName(doc, "CoverageDescription")) {
      const idEl = childByLocalName(descEl, "CoverageId");
      const id = (_a2 = idEl == null ? void 0 : idEl.textContent) == null ? void 0 : _a2.trim();
      if (!id) continue;
      const box = await parseWcsCoverageEnvelope(descEl);
      if (box) result.set(id, box);
    }
  } catch {
  }
  return result;
}
function wcsRectangleFor(item) {
  const box = item.geographicBoundingBox;
  if (!box) return void 0;
  return cesium.Rectangle.fromDegrees(box.west, box.south, box.east, box.north);
}
function parseCapabilities(serviceType, doc) {
  switch (serviceType) {
    case "WMS":
      return parseWmsCapabilities(doc);
    case "WMTS":
      return parseWmtsCapabilities(doc);
    case "WFS":
      return parseWfsCapabilities(doc);
    case "WCS":
      return parseWcsCapabilities(doc);
    default:
      return [];
  }
}
function detectServiceType(doc) {
  const root = doc.documentElement;
  const rootLocalName = root.localName;
  const namespaceUri = root.namespaceURI ?? "";
  if (rootLocalName === "WMS_Capabilities" || rootLocalName === "WMT_MS_Capabilities" || namespaceUri.includes("/wms")) {
    return "WMS";
  }
  if (rootLocalName === "WFS_Capabilities" || namespaceUri.includes("/wfs")) {
    return "WFS";
  }
  if (namespaceUri.includes("/wmts")) return "WMTS";
  if (namespaceUri.includes("/wcs") || rootLocalName === "WCS_Capabilities")
    return "WCS";
  return void 0;
}
const _OgcLayerFactory = class _OgcLayerFactory {
  constructor(viewer, deps) {
    this.viewer = viewer;
    this.deps = deps;
    this.serviceLayerOptions = /* @__PURE__ */ new Map();
  }
  getServiceOptions(id) {
    return this.serviceLayerOptions.get(id);
  }
  deleteServiceOptions(id) {
    this.serviceLayerOptions.delete(id);
  }
  // ── İç: WMS ──────────────────────────────────────────────────────────────
  buildWmsProvider(options) {
    var _a2, _b;
    const url = this.deps.apiKeyPolicy.resolveOgcProxyUrl("wms", options.url);
    const layers = (_a2 = options.layers) == null ? void 0 : _a2.trim();
    if (!layers) {
      throw new LayerOperationError(
        "LAYER_WMS_LAYERS_EMPTY",
        `WMS katmani eklenemedi: layers (ogcLayerName) bos — id=${options.id}`
      );
    }
    const headers = this.deps.apiKeyPolicy.mergeApiKeyHeader(
      this.deps.apiKeyPolicy.buildAuthHeaders(options.authToken),
      url
    );
    const version = options.version ?? "1.3.0";
    const provider = new cesium.WebMapServiceImageryProvider({
      url: headers ? new cesium.Resource({ url, headers }) : url,
      layers,
      parameters: {
        service: "WMS",
        version,
        request: "GetMap",
        transparent: "true",
        format: "image/png",
        ...options.parameters
      },
      // Cesium'un GetFeatureInfo varsayilani ("version:1.1.1", styles YOK)
      // GetMap tarafindaki (yukaridaki) parametrelerden TAMAMEN bagimsizdir --
      // GetMap'te version 1.3.0 kullanilirken GetFeatureInfo'nun sessizce
      // 1.1.1'e sabit kalmasi crs/srs parametre adi uyusmazligina yol aciyor,
      // ayrica STYLES parametresini zorunlu tutan (WMS spec'e gore GetMap ile
      // ayni parametreleri bekleyen) sunucularda (orn. MapServer varsayilan
      // yapilandirmasi) "Missing required parameter STYLES/SRS" hatasiyla
      // GetFeatureInfo tamamen basarisiz oluyordu -- InteractionManager'in
      // WMS/WMTS identify akisinin gercek dunyada calismasi icin bu ikisini
      // GetMap ile tutarli tutuyoruz.
      getFeatureInfoParameters: {
        version,
        styles: ((_b = options.parameters) == null ? void 0 : _b.styles) ?? ""
      },
      // Cesium'un VARSAYILAN format zinciri (json -> text/xml -> text/html)
      // GERCEK dunyada COK sunucuda (orn. MapServer'in varsayilan/demo
      // kurulumu -- bkz kullanici geri bildirimi: "WMS sorgusu yapinca
      // Sorgulanıyor... loading dönüyor, sonuç yok") sessizce basarisiz
      // oluyordu: sunucu "text/xml" INFO_FORMAT'ini DESTEKLEMEDIGINI bir
      // ServiceExceptionReport (yine de GECERLI bir XML govdesi!) ile
      // bildiriyor -- Cesium bunu "basarili ama BOS" bir XML yaniti sanip
      // zincire DEVAM ETMIYOR, gercekten calisan "text/html" adimina hic
      // ulasilmiyordu. Ayrica coklu WMS sunucusu (MapServer/GeoServer)
      // gercek GML feature verisini "text/xml" yerine klasik
      // "application/vnd.ogc.gml" MIME'i altinda sunuyor -- bu, ayni
      // Cesium xmlToFeatureInfo parser'iyla (type:"xml") calisir, sadece
      // FARKLI bir INFO_FORMAT sorgu degeri ister. Bu yuzden zincire hem bu
      // klasik GML varyanti hem de HER ZAMAN calisan bir "html" son care
      // fallback'i eklenir -- "json" hala ILK denenen (destekleyen modern
      // sunucularda en zengin/yapisal sonucu verir).
      getFeatureInfoFormats: [
        new cesium.GetFeatureInfoFormat("json"),
        new cesium.GetFeatureInfoFormat("xml", "application/vnd.ogc.gml"),
        new cesium.GetFeatureInfoFormat("xml", "text/xml"),
        new cesium.GetFeatureInfoFormat("html")
      ],
      ...options.rectangle !== void 0 && { rectangle: options.rectangle },
      ...options.minimumLevel !== void 0 && {
        minimumLevel: options.minimumLevel
      },
      ...options.maximumLevel !== void 0 && {
        maximumLevel: options.maximumLevel
      },
      ...options.tileWidth !== void 0 && { tileWidth: options.tileWidth },
      ...options.tileHeight !== void 0 && {
        tileHeight: options.tileHeight
      }
    });
    return provider;
  }
  addWMS(options) {
    const provider = this.buildWmsProvider(options);
    const imageryLayer = this.viewer.imageryLayers.addImageryProvider(provider);
    const managed = this.deps.register(options.id, options.title, "WMS", imageryLayer, false);
    this.serviceLayerOptions.set(options.id, options);
    return Promise.resolve(managed);
  }
  // ── İç: WMTS ─────────────────────────────────────────────────────────────
  buildWmtsProvider(options) {
    const url = this.deps.apiKeyPolicy.resolveOgcProxyUrl("wmts", options.url);
    const headers = this.deps.apiKeyPolicy.mergeApiKeyHeader(
      this.deps.apiKeyPolicy.buildAuthHeaders(options.authToken),
      url
    );
    return new cesium.WebMapTileServiceImageryProvider({
      url: headers ? new cesium.Resource({ url, headers }) : url,
      layer: options.layer,
      style: options.style ?? "default",
      tileMatrixSetID: options.tileMatrixSetID,
      format: options.format ?? "image/png",
      tilingScheme: new cesium.WebMercatorTilingScheme(),
      ...options.tileWidth !== void 0 && { tileWidth: options.tileWidth },
      ...options.tileHeight !== void 0 && {
        tileHeight: options.tileHeight
      },
      ...options.minimumLevel !== void 0 && {
        minimumLevel: options.minimumLevel
      },
      ...options.maximumLevel !== void 0 && {
        maximumLevel: options.maximumLevel
      },
      ...options.rectangle !== void 0 && { rectangle: options.rectangle }
    });
  }
  addWMTS(options) {
    const provider = this.buildWmtsProvider(options);
    const imageryLayer = this.viewer.imageryLayers.addImageryProvider(provider);
    const managed = this.deps.register(options.id, options.title, "WMTS", imageryLayer, false);
    this.serviceLayerOptions.set(options.id, options);
    return Promise.resolve(managed);
  }
  // ── Katman stili: WMS/WMTS (B1 — sunucu-tanımlı stil seçimi) ────────────────
  // Vektör stil motorunun (applyLayerStyle) aksine burada renk client-side
  // HESAPLANMIYOR — sunucunun GetCapabilities'te tanımladığı hazır "Style"lar
  // arasından seçim yapılıp ImageryLayer, seçilen STYLES parametresiyle
  // YENİDEN kuruluyor (Cesium'da provider parametreleri construct-sonrası
  // immutable). Lejant, WMS'te ayrı bir GetLegendGraphic isteğiyle, WMTS'te
  // ise mümkünse doğrudan capabilities içindeki <LegendURL>'den alınır (bkz.
  // project_ucbp_api_styleeditor_arastirma memory, B2/client-side SLD KAPSAM
  // DIŞI kararı).
  /** Bir WMS katmanının sunucu-tanımlı (GetCapabilities'ten) stil seçeneklerini, lejant URL'leriyle birlikte döndürür. */
  async getWmsAvailableStyles(id) {
    const options = this.requireServiceOptions(id, "WMS");
    const version = options.version ?? "1.3.0";
    const xml = await this.getCapabilitiesDocument(options.url, "WMS", version, options.authToken);
    return parseWmsStyles(xml, options.layers).map((style) => ({
      ...style,
      legendUrl: this.getWmsLegendGraphicUrl(id, style.name)
    }));
  }
  /** WMS katmanını seçilen sunucu-tanımlı stille (STYLES parametresiyle) yeniden kurar. */
  async setWmsStyle(id, styleName) {
    const options = this.requireServiceOptions(id, "WMS");
    const updated = {
      ...options,
      parameters: { ...options.parameters, STYLES: styleName }
    };
    await this.rebuildImageryLayer(id, () => this.buildWmsProvider(updated));
    this.serviceLayerOptions.set(id, updated);
  }
  /** WMS GetLegendGraphic URL'ini (apiKey varsa query parametresiyle) oluşturur. */
  getWmsLegendGraphicUrl(id, styleName) {
    const options = this.requireServiceOptions(id, "WMS");
    const params = new URLSearchParams({
      service: "WMS",
      version: options.version ?? "1.3.0",
      request: "GetLegendGraphic",
      format: "image/png",
      layer: options.layers,
      // MapServer GetLegendGraphic'i SLD_VERSION olmadan
      // "MissingParameterValue" hatasiyla reddediyor (gercek demo.mapserver.org
      // istegiyle dogrulandi); GeoServer bu parametreyi zaten yok sayiyor
      // (regresyon yok) -- bkz. project_ucbp_api_styleeditor_arastirma memory.
      sld_version: "1.1.0",
      ...styleName !== void 0 && styleName !== "" ? { style: styleName } : {}
    });
    const proxyBase = this.deps.apiKeyPolicy.resolveOgcProxyUrl("wms", options.url);
    return this.deps.apiKeyPolicy.attachApiKeyToUrl(
      `${proxyBase}${proxyBase.includes("?") ? "&" : "?"}${params.toString()}`
    );
  }
  /** Bir WMTS katmanının sunucu-tanımlı (GetCapabilities'ten) stil seçeneklerini, lejant URL'leriyle birlikte döndürür. */
  async getWmtsAvailableStyles(id) {
    const options = this.requireServiceOptions(id, "WMTS");
    const xml = await this.getCapabilitiesDocument(options.url, "WMTS", "1.0.0", options.authToken);
    const styles = parseWmtsStyles(xml, options.layer);
    return styles.map((style) => ({
      ...style,
      legendUrl: this.deps.apiKeyPolicy.attachApiKeyToUrl(style.legendUrl)
    }));
  }
  /** WMTS katmanını seçilen sunucu-tanımlı stille yeniden kurar. */
  async setWmtsStyle(id, styleName) {
    const options = this.requireServiceOptions(id, "WMTS");
    const updated = { ...options, style: styleName };
    await this.rebuildImageryLayer(id, () => this.buildWmtsProvider(updated));
    this.serviceLayerOptions.set(id, updated);
  }
  // ── İç: WFS ──────────────────────────────────────────────────────────────
  async addWFS(options) {
    const proxyUrl = this.deps.apiKeyPolicy.resolveOgcProxyUrl("wfs", options.url);
    const fetchOptions = {};
    if (options.authToken !== void 0) {
      fetchOptions.headers = { Authorization: `Bearer ${options.authToken}` };
    }
    const headersWithApiKey = this.deps.apiKeyPolicy.mergeApiKeyHeader(
      fetchOptions.headers,
      proxyUrl
    );
    if (headersWithApiKey !== void 0) fetchOptions.headers = headersWithApiKey;
    const proxied = { ...options, url: proxyUrl };
    const caps = await fetchWfsCapabilities(proxyUrl, fetchOptions);
    const planArgs = {
      typeNameHint: options.typeName,
      caps
    };
    if (options.version !== void 0) planArgs.version = options.version;
    if (options.srsName !== void 0) planArgs.srsName = options.srsName;
    if (options.outputFormat !== void 0) {
      planArgs.outputFormat = options.outputFormat;
    }
    if (options.maxFeatures !== void 0) {
      planArgs.maxFeatures = options.maxFeatures;
    } else {
      planArgs.maxFeatures = _OgcLayerFactory.TEMP_WFS_UNLIMITED_MAX_FEATURES;
    }
    const plan = buildWfsGetFeaturePlan(planArgs);
    let geojson;
    try {
      geojson = await this.fetchWfsGeoJson(proxied, fetchOptions, plan);
    } catch (geoJsonError) {
      try {
        geojson = await this.fetchWfsGml(proxied, fetchOptions, plan);
      } catch (gmlError) {
        if (gmlError instanceof Error) {
          gmlError.cause = geoJsonError;
        }
        throw gmlError;
      }
    }
    const loadedFeatures = geojson !== null && typeof geojson === "object" ? geojson.features : void 0;
    Array.isArray(loadedFeatures) ? loadedFeatures.length : plan.maxFeatures;
    return loadVectorGeoJsonLayer(
      this.viewer,
      this.deps,
      geojson,
      { id: options.id, title: options.title, layerType: "WFS", clampToGround: options.clampToGround ?? false },
      (managed) => {
      }
    );
  }
  // WFS 2.0/1.1'in "resultType=hits" ozelligiyle (WFS core spec'inin
  // ZORUNLU bir parcasi) geometri hic cekilmeden SADECE toplam eslesen
  // kayit sayisini sorar -- kucuk/hizli bir istek. Amac: "count"/"maxFeatures"
  // limitini asan devasa katmanlarda (bkz kullanici bildirimi: 27458 kayitlik
  // bir WFS demo katmani sessizce 5000'de kesilip kullaniciya YANLIŞLIKLA
  // TAMAMMIŞ gibi eksik/tutarsiz gorunuyordu) veriyi hic INDIRMEDEN once
  // limitin asilip asilmadigini ogrenip ACIK bir hatayla REDDETMEK.
  // Sunucu hits'i desteklemiyorsa/beklenmedik bir yanit donerse (WFS 1.0'da
  // resultType hic yok, bazi sunucular XML yerine kendi formatinda yanit
  // verebilir) sessizce undefined doner -- cagiran taraf bu durumda
  // (fetchWfsGeoJson/fetchWfsGml'in GERCEK yanitindaki "numberMatched"
  // alanina bakan) SON CARE kontrolune guvenir.
  async fetchWfsHitsCount(options, fetchOptions, plan) {
    if (!plan.version.startsWith("2.") && !plan.version.startsWith("1.1")) {
      return void 0;
    }
    const params = new URLSearchParams();
    appendWfsGetFeatureParams(params, plan);
    params.delete("count");
    params.delete("maxFeatures");
    params.set("resultType", "hits");
    let response;
    try {
      response = await fetch(
        `${options.url}${options.url.includes("?") ? "&" : "?"}${params.toString()}`,
        fetchOptions
      );
    } catch {
      return void 0;
    }
    if (!response.ok) return void 0;
    const text = decodeTextBuffer(await response.arrayBuffer());
    if (isOgcExceptionXml(text)) return void 0;
    const trimmed = text.trimStart();
    if (trimmed.startsWith("{")) {
      try {
        const json = JSON.parse(trimmed);
        const count = json.numberMatched ?? json.totalFeatures;
        return typeof count === "number" ? count : void 0;
      } catch {
        return void 0;
      }
    }
    try {
      const root = new DOMParser().parseFromString(text, "application/xml").documentElement;
      const raw = root.getAttribute("numberMatched") ?? root.getAttribute("numberOfFeatures") ?? root.getAttribute("numberReturned");
      if (!raw) return void 0;
      const count = Number(raw);
      return Number.isFinite(count) ? count : void 0;
    } catch {
      return void 0;
    }
  }
  async fetchWfsGeoJson(options, fetchOptions, plan) {
    const outputFormat = plan.jsonOutputFormat;
    if (!outputFormat) {
      throw new OgcRequestError("OGC_WFS_JSON_FORMAT_UNSUPPORTED", "WFS sunucusu JSON çıktı formatı ilan etmiyor.");
    }
    const params = new URLSearchParams();
    appendWfsGetFeatureParams(params, plan, outputFormat);
    const response = await fetch(
      `${options.url}${options.url.includes("?") ? "&" : "?"}${params.toString()}`,
      fetchOptions
    );
    const text = decodeTextBuffer(await response.arrayBuffer());
    if (!response.ok || isOgcExceptionXml(text) || !text.trimStart().startsWith("{")) {
      throw new OgcRequestError(
        "OGC_WFS_GEOJSON_REQUEST_FAILED",
        `WFS GeoJSON isteği başarısız: ${response.status} ${response.statusText}`
      );
    }
    return JSON.parse(text);
  }
  // outputFormat parametresi verilmez; sunucu boylece kendi varsayilan
  // (genelde GML) cikisini doner. "ol" bu GML yanitini (WFS 1.0/1.1/2.0,
  // GML2/3/3.2) parse edip GeoJSON'a cevirir.
  async fetchWfsGml(options, fetchOptions, plan) {
    const params = new URLSearchParams();
    appendWfsGetFeatureParams(params, plan);
    const response = await fetch(
      `${options.url}${options.url.includes("?") ? "&" : "?"}${params.toString()}`,
      fetchOptions
    );
    if (!response.ok) {
      throw new OgcRequestError(
        "OGC_WFS_REQUEST_FAILED",
        `WFS isteği başarısız: ${response.status} ${response.statusText}`
      );
    }
    const gml = decodeTextBuffer(await response.arrayBuffer());
    if (isOgcExceptionXml(gml)) {
      throw new OgcRequestError("OGC_WFS_EXCEPTION", "WFS GetFeature OGC Exception döndü.");
    }
    let WFSFormat;
    let GeoJSONFormat;
    try {
      ({ default: WFSFormat } = await import("ol/format/WFS.js"));
      ({ default: GeoJSONFormat } = await import("ol/format/GeoJSON.js"));
    } catch {
      throw new OgcRequestError(
        "OGC_WFS_OL_PACKAGE_MISSING",
        'WFS sunucusu GeoJSON çıktısı desteklemiyor; GML yanıtını okumak için "ol" paketi gereklidir: pnpm add ol'
      );
    }
    const features = new WFSFormat({
      version: plan.version
    }).readFeatures(gml);
    return new GeoJSONFormat().writeFeaturesObject(features, {
      featureProjection: "EPSG:4326"
    });
  }
  // ── İç: WCS ──────────────────────────────────────────────────────────────
  async addWCS(options) {
    const proxyUrl = this.deps.apiKeyPolicy.resolveOgcProxyUrl("wcs", options.url);
    const baseParams = {
      service: "WCS",
      version: options.version ?? "2.0.1",
      request: "GetCoverage",
      coverageId: options.coverageId,
      // format belirtilmezse sunucu genelde GeoTIFF gibi tarayicinin <img> ile
      // decode edemedigi bir format doner (SingleTileImageryProvider gorseli
      // dogrudan bir <img> olarak yukler); bu yuzden varsayilani PNG'ye sabitliyoruz.
      format: options.format ?? "image/png"
    };
    const headers = this.deps.apiKeyPolicy.mergeApiKeyHeader(
      this.deps.apiKeyPolicy.buildAuthHeaders(options.authToken),
      proxyUrl
    );
    const rect = options.rectangle ?? cesium.Rectangle.fromDegrees(-180, -90, 180, 90);
    const loadProvider = async (scaleSize) => {
      const params = { ...baseParams };
      if (scaleSize !== void 0) params["SCALESIZE"] = scaleSize;
      const url = `${proxyUrl}?${new URLSearchParams(params).toString()}`;
      const imageUrl = await this.resolveWcsImageUrl(url, headers);
      try {
        return await cesium.SingleTileImageryProvider.fromUrl(imageUrl, { rectangle: rect });
      } finally {
        if (imageUrl.startsWith("blob:")) URL.revokeObjectURL(imageUrl);
      }
    };
    const maxSize = options.maxSize ?? 2048;
    const canScale = baseParams["version"].startsWith("2.") && Number.isFinite(maxSize);
    let provider;
    if (!canScale) {
      provider = await loadProvider();
    } else {
      const urnAxes = `http://www.opengis.net/def/axis/OGC/1/i(${maxSize}),http://www.opengis.net/def/axis/OGC/1/j(${maxSize})`;
      try {
        provider = await loadProvider(urnAxes);
      } catch {
        provider = await loadProvider(`x(${maxSize}),y(${maxSize})`);
      }
    }
    const imageryLayer = this.viewer.imageryLayers.addImageryProvider(provider);
    this.serviceLayerOptions.set(options.id, options);
    return this.deps.register(options.id, options.title, "WCS", imageryLayer, false);
  }
  // ArcGIS ImageServer gibi bazi WCS sunuculari GetCoverage yanitini duz bir
  // goruntu olarak degil, multipart/related MIME zarfi icinde (GML metadata
  // parcasi + goruntu parcasi bir arada) donuyor. Tarayici bu zarfi
  // dogrudan bir goruntu olarak decode edemez; burada zarfi kendimiz
  // aciyor, icindeki goruntu baytlarini ayiklayip bir blob URL'e
  // ceviriyoruz. Multipart olmayan (cogunluk) yanitlarda da baytlar zaten
  // elimizde oldugu icin ayni sekilde blob URL'e ceviriyoruz.
  async resolveWcsImageUrl(url, headers) {
    const response = await fetch(url, headers ? { headers } : void 0);
    if (!response.ok) {
      throw new OgcRequestError(
        "OGC_WCS_REQUEST_FAILED",
        `WCS isteği başarısız: ${response.status} ${response.statusText}`
      );
    }
    const contentType = response.headers.get("content-type") ?? "";
    const buffer = await response.arrayBuffer();
    const boundaryMatch = /boundary="?([^";]+)"?/i.exec(contentType);
    if (!contentType.includes("multipart/") || !boundaryMatch) {
      return URL.createObjectURL(
        new Blob([buffer], { type: contentType || "image/png" })
      );
    }
    const imageBytes = extractMultipartImage(
      new Uint8Array(buffer),
      boundaryMatch[1]
    );
    const imageBuffer = imageBytes.bytes.buffer.slice(
      imageBytes.bytes.byteOffset,
      imageBytes.bytes.byteOffset + imageBytes.bytes.byteLength
    );
    return URL.createObjectURL(
      new Blob([imageBuffer], { type: imageBytes.mimeType })
    );
  }
  // ── İç: GeoTIFF ──────────────────────────────────────────────────────────
  addGeoTiff(_options) {
    throw new LayerOperationError(
      "LAYER_GEOTIFF_UNSUPPORTED",
      "GeoTIFF katmanı bu Cesium sürümünde (≥1.143) henüz desteklenmiyor. GeoTiffImageryProvider mevcut değil. geotiff.js ile özel provider gereklidir."
    );
  }
  // ── Yardımcılar ──────────────────────────────────────────────────────────
  requireServiceOptions(id, expected) {
    const managed = this.deps.requireLayer(id);
    if (managed.layerType !== expected) {
      throw new LayerOperationError("LAYER_TYPE_MISMATCH", `Katman ${expected} değil: "${id}" (${managed.layerType})`);
    }
    const options = this.serviceLayerOptions.get(id);
    if (options === void 0) {
      throw new LayerOperationError("LAYER_SERVICE_OPTIONS_NOT_FOUND", `Katman için orijinal servis seçenekleri bulunamadı: "${id}"`);
    }
    return options;
  }
  // Cesium'da ImageryProvider parametreleri construct-sonrası immutable;
  // stil değişince (setWmsStyle/setWmtsStyle) eski ImageryLayer kaldırılıp
  // aynı z-sıra indeksinde, aynı show/alpha ile yenisi kurulur. ManagedLayer
  // referansı (items Map'i) da güncellenir ki getLayers()/getLayerById() her
  // zaman canlı Cesium nesnesini döndürsün.
  async rebuildImageryLayer(id, buildProvider) {
    const managed = this.deps.requireLayer(id);
    if (!(managed.cesiumObject instanceof cesium.ImageryLayer)) {
      throw new LayerOperationError("LAYER_NOT_RASTER", `Katman raster (ImageryLayer) değil: "${id}"`);
    }
    const oldLayer = managed.cesiumObject;
    const index = this.viewer.imageryLayers.indexOf(oldLayer);
    const { show, alpha } = oldLayer;
    const provider = buildProvider();
    const newLayer = new cesium.ImageryLayer(provider, { show, alpha });
    this.viewer.imageryLayers.remove(oldLayer, true);
    this.viewer.imageryLayers.add(newLayer, index);
    this.deps.setItem(
      id,
      Object.freeze({ ...managed, cesiumObject: newLayer })
    );
  }
  /**
   * ML-12 düzeltmesi: OGC GetCapabilities'i apiKey header + proxy KURALLARIYLA
   * çeker. `TucbsServiceUpload` (GC-05) gibi ayrı bir `LayerManager`
   * referansına sahip tüketiciler de servis keşfi için bunu kullanır --
   * eskiden bu tüketiciler proxy/apiKey'den TAMAMEN habersiz çıplak `fetch`
   * kullanıyordu (bkz project_ucbp_api_ogc_capabilities_uygulama_plani, ML-12).
   */
  async getCapabilitiesDocument(baseUrl, serviceType, version, authToken) {
    const proxiedUrl = this.deps.apiKeyPolicy.resolveOgcProxyUrl(
      serviceType.toLowerCase(),
      baseUrl
    );
    const url = buildCapabilitiesUrl(proxiedUrl, serviceType, version);
    return getCapabilities(url, authToken, this.deps.apiKeyPolicy);
  }
  /**
   * Faz 5b (ML-12'nin DescribeCoverage boşluğu): WCS coverage'larının gerçek
   * coğrafi kapsama alanlarını `getCapabilitiesDocument` ile AYNI apiKey/proxy
   * politikasından geçirerek çeker -- eskiden bu istek proxy'siz gittiği için
   * CORS-korumalı sunucularda sessizce başarısız olup katmanlar global
   * (-180,-90,180,90) dikdörtgene düşüyordu (bkz
   * project_ucbp_api_ogc_capabilities_uygulama_plani Faz 5b).
   */
  async getWcsCoverageExtents(rawUrl, coverageIds, authToken) {
    const proxiedUrl = this.deps.apiKeyPolicy.resolveOgcProxyUrl("wcs", rawUrl);
    return fetchWcsCoverageExtents(proxiedUrl, coverageIds, authToken, this.deps.apiKeyPolicy);
  }
};
_OgcLayerFactory.TEMP_WFS_UNLIMITED_MAX_FEATURES = 1e6;
let OgcLayerFactory = _OgcLayerFactory;
class ShapeLayerBridge {
  constructor(viewer, deps) {
    this.viewer = viewer;
    this.deps = deps;
    this.drawnShapeCounters = /* @__PURE__ */ new Map();
  }
  deleteCounter(id) {
    this.drawnShapeCounters.delete(id);
  }
  /**
   * DrawingManager'in tamamladığı bir şekli tek, kalıcı "Çizim Katmanı"na
   * ekler (Map, draw:complete dinleyicisinde çağırır). Katman ilk çağrıda
   * (henüz yoksa) boş bir CustomDataSource olarak oluşturulur; sonraki her
   * çağrı AYNI katmana yeni bir entity ekler -- id her seferinde assertUniqueId'ye
   * takılmadan register() edilebilsin diye bu, public add() ÜZERİNDEN DEĞİL
   * doğrudan register() ile yapılır.
   *
   * `shape.entity`, DrawingManager tarafından zaten viewer.entities'e eklenmiş
   * durumdadır (kendi cizim stiliyle -- ayrica GeoJSON'a cevrilip yeniden
   * cizilmiyor, boylece TucbsDrawTool'un cizdigi gorunum BIREBIR korunur).
   * Bu yuzden ilk viewer.entities'ten cikarilip hedef DataSource'a tasinir.
   */
  async addDrawnShape(id, title, shape) {
    const entity = shape.entity;
    this.viewer.entities.remove(entity);
    const sequentialId = (this.drawnShapeCounters.get(id) ?? 0) + 1;
    this.drawnShapeCounters.set(id, sequentialId);
    entity.properties = buildDrawnShapeProperties(shape, sequentialId);
    const existing = this.deps.getItem(id);
    const dataSource = existing && "entities" in existing.cesiumObject ? existing.cesiumObject : new cesium.CustomDataSource(title);
    const currentStyle = existing ? this.deps.getStyle(id) : void 0;
    const fillColor = (currentStyle == null ? void 0 : currentStyle.fill.mode) === "solid" ? cesium.Color.fromCssColorString(currentStyle.fill.color).withAlpha(currentStyle.fill.opacity) : cesium.Color.CYAN.withAlpha(0.4);
    const initialOutline = (currentStyle == null ? void 0 : currentStyle.outline) ?? {
      enabled: true,
      color: this.deps.defaultOutlineColorHex,
      // Diger vektor katman turlerinin varsayilani (2) ile AYNI DEGIL --
      // Cizim Katmani'nin dis hat genisligi kullanici istegiyle 1 (bkz.
      // TucbsStyleEditor.ts'teki FIXED_SOLID_LAYER_OUTLINE_WIDTH, "Sifirla"
      // islevi de bu degere doner).
      width: 1
    };
    this.deps.applyEntityStyle(entity, fillColor, initialOutline, true);
    dataSource.entities.add(entity);
    if (entity.polygon !== void 0) {
      this.deps.addPolygonOutlineCompanion(
        dataSource,
        entity,
        cesium.Color.fromCssColorString(initialOutline.color),
        initialOutline.width,
        false
      );
    }
    if (existing) {
      this.deps.tagEntities(dataSource, id);
      return existing;
    }
    await this.viewer.dataSources.add(dataSource);
    const colorHex = cesium.Color.CYAN.toCssHexString();
    const managed = this.deps.register(id, title, "DRAWING", dataSource, false, colorHex);
    this.deps.recordInitialStyle(managed.id, colorHex, 0.4, initialOutline);
    return managed;
  }
  /**
   * DrawingManager'in tamamladığı bir ÖLÇÜM şeklini (source==="measure")
   * tek, kalıcı "Ölçü Katmanı"na ekler (Map, draw:complete dinleyicisinde
   * çağırır) -- addDrawnShape ile BİREBİR AYNI mimari/gerekçe (bkz o
   * metodun yorumları); yalnız katman türü ("MEASURE") ve öznitelik alanları
   * (buildMeasuredShapeProperties, "sekil" yerine "olcum_turu") farklıdır.
   */
  async addMeasuredShape(id, title, shape) {
    const entity = shape.entity;
    this.viewer.entities.remove(entity);
    const sequentialId = (this.drawnShapeCounters.get(id) ?? 0) + 1;
    this.drawnShapeCounters.set(id, sequentialId);
    entity.properties = buildMeasuredShapeProperties(shape, sequentialId);
    const existing = this.deps.getItem(id);
    const dataSource = existing && "entities" in existing.cesiumObject ? existing.cesiumObject : new cesium.CustomDataSource(title);
    const currentStyle = existing ? this.deps.getStyle(id) : void 0;
    const fillColor = (currentStyle == null ? void 0 : currentStyle.fill.mode) === "solid" ? cesium.Color.fromCssColorString(currentStyle.fill.color).withAlpha(currentStyle.fill.opacity) : cesium.Color.CYAN.withAlpha(0.4);
    const initialOutline = (currentStyle == null ? void 0 : currentStyle.outline) ?? {
      enabled: true,
      color: this.deps.defaultOutlineColorHex,
      width: 1
    };
    this.deps.applyEntityStyle(entity, fillColor, initialOutline, true);
    dataSource.entities.add(entity);
    if (entity.polygon !== void 0) {
      this.deps.addPolygonOutlineCompanion(
        dataSource,
        entity,
        cesium.Color.fromCssColorString(initialOutline.color),
        initialOutline.width,
        false
      );
    }
    if (existing) {
      this.deps.tagEntities(dataSource, id);
      return existing;
    }
    await this.viewer.dataSources.add(dataSource);
    const colorHex = cesium.Color.CYAN.toCssHexString();
    const managed = this.deps.register(id, title, "MEASURE", dataSource, false, colorHex);
    this.deps.recordInitialStyle(managed.id, colorHex, 0.4, initialOutline);
    return managed;
  }
  // TucbsDeleteTool -> DrawingManager.clearAll()/removeShape(), sekli KENDI
  // viewer.entities'inden silmeye calisir (artik tasindigi icin bu cagri
  // sessizce no-op olur); gercek silme Map'in draw:remove dinleyicisi
  // uzerinden burada yapilir. Katman, son entity'si de silinince TAMAMEN
  // kaldirilir -- "haritada cizim yoksa katman da olmamali" kurali boylece
  // silme sonrasinda da gecerli kalir. Tamamen generic (sadece katman id'sine
  // gore calisir) oldugundan Map, hem Cizim hem Olcu Katmani'nin draw:remove
  // dinleyicisinde AYNI metodu (farkli id ile) cagirir.
  removeDrawnShape(id, entity) {
    const existing = this.deps.getItem(id);
    if (!existing || !("entities" in existing.cesiumObject)) return;
    existing.cesiumObject.entities.removeById(`${entity.id}::outline`);
    existing.cesiumObject.entities.remove(entity);
    if (existing.cesiumObject.entities.values.length === 0) {
      this.deps.removeLayer(id);
    }
  }
}
const DRAWN_SHAPE_LABELS = {
  point: "Nokta",
  polyline: "Çizgi",
  polygon: "Alan",
  rectangle: "Dikdörtgen",
  circle: "Daire",
  freehand: "Serbest Çizim"
};
function roundMeters(value) {
  return Math.round(value * 100) / 100;
}
function roundCoordinate(value) {
  return Math.round(value * 1e6) / 1e6;
}
function wktCoordinatePair(coordinate) {
  return `${roundCoordinate(coordinate[0])} ${roundCoordinate(coordinate[1])}`;
}
function geometryToWkt(geometry) {
  switch (geometry.type) {
    case "Point": {
      const coordinate = geometry.coordinates;
      return `POINT (${wktCoordinatePair(coordinate)})`;
    }
    case "LineString": {
      const coordinates = geometry.coordinates;
      return `LINESTRING (${coordinates.map((c) => wktCoordinatePair(c)).join(", ")})`;
    }
    case "Polygon": {
      const rings = geometry.coordinates;
      const ringsWkt = rings.map((ring) => `(${ring.map((c) => wktCoordinatePair(c)).join(", ")})`).join(", ");
      return `POLYGON (${ringsWkt})`;
    }
    default:
      return "";
  }
}
function buildDrawnShapeProperties(shape, sequentialId) {
  const properties = {
    id: sequentialId,
    sekil: DRAWN_SHAPE_LABELS[shape.tool]
  };
  if (shape.length !== void 0) properties.uzunluk_m = roundMeters(shape.length);
  if (shape.area !== void 0) properties.alan_m2 = roundMeters(shape.area);
  if (shape.perimeter !== void 0) properties.cevre_m = roundMeters(shape.perimeter);
  if (shape.radius !== void 0) properties.yaricap_m = roundMeters(shape.radius);
  properties.olusturma_tarihi = new Date(shape.createdAt).toLocaleString("tr-TR");
  properties.geomwkt = geometryToWkt(shape.geometry);
  return new cesium.PropertyBag(properties);
}
const MEASURED_SHAPE_LABELS = {
  point: "Nokta",
  polyline: "Mesafe",
  polygon: "Alan",
  rectangle: "Dikdörtgen",
  circle: "Daire",
  freehand: "Serbest Çizim"
};
function buildMeasuredShapeProperties(shape, sequentialId) {
  const properties = {
    id: sequentialId,
    olcum_turu: MEASURED_SHAPE_LABELS[shape.tool]
  };
  if (shape.length !== void 0) properties.uzunluk_m = roundMeters(shape.length);
  if (shape.area !== void 0) properties.alan_m2 = roundMeters(shape.area);
  if (shape.perimeter !== void 0) properties.cevre_m = roundMeters(shape.perimeter);
  properties.olusturma_tarihi = new Date(shape.createdAt).toLocaleString("tr-TR");
  properties.geomwkt = geometryToWkt(shape.geometry);
  return new cesium.PropertyBag(properties);
}
const _LayerManager = class _LayerManager extends EventEmitter {
  /** @param viewer - Katmanların yönetileceği Cesium `Viewer`. */
  constructor(viewer) {
    super();
    this.items = /* @__PURE__ */ new Map();
    this.analysisResultIds = /* @__PURE__ */ new Set();
    this.viewer = viewer;
    this.apiKeyPolicy = new ApiKeyPolicy({ apiBase: () => getUcbpApiBase() });
    this.outlineGeometry = new OutlineGeometry({
      getCurrentTime: () => this.viewer.clock.currentTime
    });
    this.opacityController = new OpacityController({
      requestRender: () => this.viewer.scene.requestRender()
    });
    this.styleEngine = new LayerStyleEngine({
      outlineGeometry: this.outlineGeometry,
      opacityController: this.opacityController,
      getCurrentTime: () => this.viewer.clock.currentTime,
      requestRender: () => this.viewer.scene.requestRender(),
      emitStyle: (id, style) => this.emit("layer:style", { id, style }),
      waitForRenderSettle: () => this.waitForRenderSettle()
    });
    this.localSourceLoader = new LocalSourceLoader(viewer, {
      styleEngine: this.styleEngine,
      outlineGeometry: this.outlineGeometry,
      addPolygonOutlines: (dataSource, color, width) => this.addPolygonOutlines(dataSource, color, width),
      register: (id, title, layerType, cesiumObject, isBasemap, initialFillColor) => this.register(id, title, layerType, cesiumObject, isBasemap, initialFillColor),
      emitCrsCheckResult: (id, result) => this.emitCrsCheckResult(id, result),
      waitForRenderSettle: () => this.waitForRenderSettle(),
      defaultOutlineColor: _LayerManager.DEFAULT_OUTLINE_COLOR,
      defaultOutlineColorHex: _LayerManager.DEFAULT_OUTLINE_COLOR_HEX
    });
    this.shapeLayerBridge = new ShapeLayerBridge(viewer, {
      getItem: (id) => this.items.get(id),
      getStyle: (id) => this.styleEngine.getStyle(id),
      applyEntityStyle: (entity, color, outline, isShapeLayer) => this.applyEntityStyle(entity, color, outline, isShapeLayer),
      addPolygonOutlineCompanion: (dataSource, entity, color, width, clampToGround) => this.addPolygonOutlineCompanion(dataSource, entity, color, width, clampToGround),
      tagEntities: (dataSource, layerId) => this.tagEntities(dataSource, layerId),
      register: (id, title, layerType, cesiumObject, isBasemap, initialFillColor) => this.register(id, title, layerType, cesiumObject, isBasemap, initialFillColor),
      recordInitialStyle: (id, colorHex, fillOpacity, outline) => this.styleEngine.recordInitialStyle(id, colorHex, fillOpacity, outline),
      removeLayer: (id) => this.removeLayer(id),
      defaultOutlineColorHex: _LayerManager.DEFAULT_OUTLINE_COLOR_HEX
    });
    this.ogcLayerFactory = new OgcLayerFactory(viewer, {
      apiKeyPolicy: this.apiKeyPolicy,
      styleEngine: this.styleEngine,
      outlineGeometry: this.outlineGeometry,
      requireLayer: (id) => this.requireLayer(id),
      setItem: (id, managed) => this.items.set(id, managed),
      register: (id, title, layerType, cesiumObject, isBasemap, initialFillColor) => this.register(id, title, layerType, cesiumObject, isBasemap, initialFillColor),
      addPolygonOutlines: (dataSource, color, width) => this.addPolygonOutlines(dataSource, color, width),
      emitCrsCheckResult: (id, result) => this.emitCrsCheckResult(id, result),
      emitFeaturesTruncated: (id, totalCount, loadedCount) => this.emit("layer:features-truncated", { id, totalCount, loadedCount }),
      waitForRenderSettle: () => this.waitForRenderSettle(),
      defaultOutlineColor: _LayerManager.DEFAULT_OUTLINE_COLOR,
      defaultOutlineColorHex: _LayerManager.DEFAULT_OUTLINE_COLOR_HEX
    });
    this.cameraHighlight = new CameraHighlight(viewer, {
      requireLayer: (id) => this.requireLayer(id),
      getLayerStyle: (id) => this.getLayerStyle(id)
    });
  }
  /**
   * apiKey ile ilgili ayarlari (Map.ts constructor'indan) gec-yapilandirir.
   * Sadece verilen alanlar guncellenir, digerleri oldugu gibi kalir --
   * boylece Map.ts, MapOptions'ta apiKey verilmemisse bu metodu hic
   * cagirmayabilir ya da kismi bir nesne geciebilir.
   */
  configure(options) {
    this.apiKeyPolicy.configure(options);
    if (options.apiKey !== void 0) {
      this.emit("apiKey:change", { hasApiKey: true });
    }
  }
  /** apiKey configure() ile atanmis mi -- SADECE varligi, degerin kendisi
   * degil (gercek deger ApiKeyPolicy icinde #apiKey olarak kapali kalir). */
  get hasApiKey() {
    return this.apiKeyPolicy.hasApiKey;
  }
  /**
   * apiKey’e göre yetkili WMS/WFS/WMTS listesi — {@code GET /layers} + {@code X-API-Key}.
   * Checklist: getLayerList eşdeğeri.
   *
   * @example
   * ```ts
   * const authorizedLayers = await map.layerManager.getAuthorizedLayers();
   * console.log(`${authorizedLayers.length} yetkili katman bulundu.`);
   * ```
   */
  async getAuthorizedLayers() {
    return this.apiKeyPolicy.getAuthorizedLayers();
  }
  /** {@link getAuthorizedLayers} alias (checklist getLayerList). */
  async getLayerList() {
    return this.apiKeyPolicy.getLayerList();
  }
  /**
   * Bir {@link AuthorizedLayerInfo}'nun {@link addAuthorizedLayer} ile
   * eklenebilir olup olmadigini bildirir (servisUrl + cozumlenmis katman
   * adi + WMTS ise wmtsTileMatrixSet sarti). Gercek mantik
   * `auth/ApiKeyPolicy.ts`'te (bkz. GC-03 Adim 3 — hem Lit bilesen hem
   * baska bir UI katmani AYNI kaynagi kullanabilsin diye).
   *
   * @example
   * ```ts
   * const addable = authorizedLayers.filter((info) => map.layerManager.canAddAuthorizedLayer(info));
   * ```
   */
  canAddAuthorizedLayer(info) {
    return this.apiKeyPolicy.canAddAuthorizedLayer(info);
  }
  /**
   * {@link getAuthorizedLayers}'tan donen bir {@link AuthorizedLayerInfo}'yu
   * haritaya ekler — servis turune gore WMS/WFS/WMTS olarak {@link add}'a
   * yonlendirir. {@link canAddAuthorizedLayer} false donuyorsa
   * `LayerOperationError` firlatir.
   *
   * @example
   * ```ts
   * const authorizedLayers = await map.layerManager.getAuthorizedLayers();
   * await map.layerManager.addAuthorizedLayer(authorizedLayers[0]);
   * ```
   */
  async addAuthorizedLayer(info) {
    const resolved = this.apiKeyPolicy.resolveAddOptions(info);
    if (resolved.layerType === "WMS") return this.add("WMS", resolved.options);
    if (resolved.layerType === "WFS") return this.add("WFS", resolved.options);
    return this.add("WMTS", resolved.options);
  }
  // ── apiKey ic yardimcilari (auth/ApiKeyPolicy.ts'e delege) ────────────────
  /**
   * URL'in apiKey gerektiren bir servis deseni (ucbp-api OGC proxy veya
   * configure edilmis trustedApiKeyHosts) tasiyip tasimadigini, apiKey'in
   * o an var olup olmadigindan BAGIMSIZ olarak bildirir. Tuketiciler
   * (ör. TucbsMapPreview) bunu, apiKey yok/gecersizken bir katmanin
   * gercekten acik olup olmadigina karar vermek icin kullanir.
   */
  layerRequiresApiKey(url) {
    return this.apiKeyPolicy.layerRequiresApiKey(url);
  }
  // ── Sorgulama ────────────────────────────────────────────────────────────
  /** Yönetilen tüm katmanları (basemap dahil) döndürür. */
  getLayers() {
    return Array.from(this.items.values());
  }
  /** Kimliği verilen katmanı döndürür, yoksa `undefined`. */
  getLayerById(id) {
    return this.items.get(id);
  }
  // ── Katman stili: vektör (WFS + LOCAL) ─────────────────────────────────────
  // Sadece Entity-tabanlı (GeoJsonDataSource/KmlDataSource/CustomDataSource)
  // katmanlarda geçerli. WMS/WMTS için bkz. "Katman stili: WMS/WMTS" bölümü.
  /** Katmanın entity'lerindeki gerçek veri kolonlarını (layerId/featureId hariç) döndürür. */
  getEntityPropertyNames(id) {
    const managed = this.requireLayer(id);
    if (!("entities" in managed.cesiumObject)) return [];
    const names = /* @__PURE__ */ new Set();
    for (const entity of managed.cesiumObject.entities.values) {
      const bag = entity.properties;
      if (bag === void 0) continue;
      for (const name of bag.propertyNames) {
        if (name === "layerId" || name === "featureId") continue;
        names.add(name);
      }
    }
    return Array.from(names);
  }
  /** Bir kolonun tüm benzersiz değerlerini (kategorik/enum stil için) döndürür. */
  getUniqueColumnValues(id, column) {
    const managed = this.requireLayer(id);
    if (!("entities" in managed.cesiumObject)) return [];
    const time = this.viewer.clock.currentTime;
    const values = /* @__PURE__ */ new Set();
    for (const entity of managed.cesiumObject.entities.values) {
      const value = this.readProperty(entity, column, time);
      if (value !== null) values.add(value);
    }
    return Array.from(values);
  }
  /** Bir katmanin (entity-tabanli) GERCEK ozellik/sekil sayisini dondurur --
   * addPolygonOutlineCompanion ile eklenen ic companion polyline'lar (bkz
   * outlineCompanionEntities) HARIC tutulur (bkz getLayerGeoJSON'daki ayni
   * filtre). Entity-tabanli olmayan (ImageryLayer) katmanlarda undefined
   * doner. TucbsStyleEditor gibi tuketiciler bunu, cok BUYUK katmanlarda
   * (bkz kullanici bildirimi: 27458 ozellikli bir WFS katmaninda "Dış Hat
   * Genişliği" degisikligi -- Cesium geometriyi HER entity icin yeniden
   * insa etmesi gerektigi icin -- gorunur bir etki olmadan surekli
   * "yükleniyor" gosterip bitiyordu) pahali/geometri-etkileyen stil
   * kontrollerini devre disi birakmak icin kullanir. */
  getFeatureCount(id) {
    const managed = this.requireLayer(id);
    if (!("entities" in managed.cesiumObject)) return void 0;
    let count = 0;
    for (const entity of managed.cesiumObject.entities.values) {
      if (!this.isOutlineCompanion(entity)) count++;
    }
    return count;
  }
  /** Bir katmanın (entity-tabanli herhangi bir katman -- TucbsLayerList
   * SADECE Cizim Katmani/DRAWING icin bu aksiyonu menuye ekler, bkz
   * TucbsLayerList._openMenuPortal) tum sekillerini GeoJSON FeatureCollection
   * olarak dondurur (TucbsLayerExport'un indirme aksiyonu icin).
   * Entity-tabanli olmayan (ImageryLayer) katmanlarda undefined doner.
   * addPolygonOutlineCompanion ile eklenen ic companion polyline'lar (bkz
   * outlineCompanionEntities) HARIC tutulur -- bunlar poligonun dis hattini
   * gostermek icin eklenmis gorsel bir workaround, sekli TEKRAR eden sahte
   * bir LineString feature olarak disa aktarilmamali. */
  getLayerGeoJSON(id) {
    return getLayerGeoJSON(
      this.requireLayer(id),
      this.viewer.clock.currentTime,
      (entity) => this.isOutlineCompanion(entity)
    );
  }
  /** getLayerGeoJSON()'i bir ".geojson" dosyasi olarak indirir -- TucbsLayerExport
   * bu ince tetikleyici cagriyi yapar (bkz TucbsMapExport/exportJPEG ile AYNI
   * "yakalama/indirme mantigi @tucbs/core'da" kurali). Entity-tabanli olmayan
   * bir katman icin (getLayerGeoJSON undefined donerse) sessizce hicbir sey
   * yapmaz.
   *
   * @example
   * ```ts
   * map.layerManager.exportLayerGeoJSON("katman-id", "katmanim");
   * ```
   */
  exportLayerGeoJSON(id, filename = "katman") {
    exportLayerGeoJSON(this.getLayerGeoJSON(id), filename);
  }
  /** Analiz sonucu katmanı KML indirir. Geometri GeoJSON indirmesiyle aynıdır. */
  exportLayerKml(id, filename = "katman") {
    exportLayerKml(this.getLayerGeoJSON(id), filename);
  }
  /** Analiz sonucu katmanı Shapefile zip indirir. Geometri GeoJSON indirmesiyle aynıdır. */
  exportLayerShapefile(id, filename = "katman") {
    exportLayerShapefile(this.getLayerGeoJSON(id), filename);
  }
  /** Tampon veya kesişim katmanını işaretler. Üç nokta menüsü Dışa Aktar'ı buna bakar. */
  markAnalysisResult(id) {
    this.analysisResultIds.add(id);
  }
  /** Katman tampon/kesişim sonucu mu. Yüklenen GEOJSON bu kümede değildir. */
  isAnalysisResult(id) {
    return this.analysisResultIds.has(id);
  }
  /** id'li katman WMS/WCS ise VE kesif sirasinda sunucunun GeoTIFF-uyumlu
   * bir formati (tiffFormat) desteklediği tespit edildiyse true doner --
   * TucbsLayerList "GeoTIFF Olarak Dışa Aktar" menu ogesini SADECE bu true
   * ise gosterir (bkz TucbsServiceUpload capabilities format kesfi). */
  isGeoTiffExportAvailable(id) {
    return isGeoTiffExportAvailable(this.items.get(id), this.ogcLayerFactory.getServiceOptions(id));
  }
  /** WMS GetMap / WCS GetCoverage'i sunucunun desteklediği GeoTIFF-uyumlu
   * formatla (bkz isGeoTiffExportAvailable) yeniden istekleyip ".tif" olarak
   * indirir. Cesium/canvas'a HIC dokunmaz -- WCS'in resolveWcsImageUrl'i ile
   * AYNI "ham HTTP indirme" deseninde (bkz o metod), tek fark burada format
   * PNG'ye SABITLENMIYOR, sunucunun kendi GeoTIFF ciktisi ISTENIYOR.
   * Desteklenmiyorsa (isGeoTiffExportAvailable false) hata firlatir --
   * cagiran taraf (TucbsLayerExport) bunu yakalar.
   *
   * @example
   * ```ts
   * await map.layerManager.exportLayerAsGeoTiff("katman-id", "katmanim");
   * ```
   */
  async exportLayerAsGeoTiff(id, filename = "katman") {
    const managed = this.requireLayer(id);
    await exportLayerAsGeoTiff(
      managed,
      this.ogcLayerFactory.getServiceOptions(id),
      filename,
      (serviceType, url) => this.apiKeyPolicy.resolveOgcProxyUrl(serviceType, url),
      {
        mergeApiKeyHeader: (headers, url) => this.apiKeyPolicy.mergeApiKeyHeader(headers, url),
        buildAuthHeaders: (authToken) => this.apiKeyPolicy.buildAuthHeaders(authToken)
      }
    );
  }
  /** Bir kolonun sayısal min/max aralığını döndürür (gradient/bin modunda min/max verilmezse otomatik kullanılır). */
  getColumnRange(id, column) {
    const managed = this.requireLayer(id);
    if (!("entities" in managed.cesiumObject)) return null;
    return this.styleEngine.getColumnRange(
      managed.cesiumObject,
      this.viewer.clock.currentTime,
      column
    );
  }
  /**
   * Katmanın dolgu/dış-hat stilini uygular. Sadece Entity tabanlı (WFS/LOCAL)
   * katmanlarda çalışır. Gradient/bin modunda `min`/`max`'tan verilmeyen uç
   * getColumnRange() ile veri aralığından otomatik hesaplanır; verilen uç
   * aynen kullanılır (tucbs-react'teki "min===max===v her zaman" bug'ı burada
   * YOK — bkz. project_ucbp_api_styleeditor_arastirma memory). Ters aralık
   * (`min` > `max`, uçlardan biri veriden gelince de oluşabilir) düzeltilmez;
   * geçerli bir aralık vermek çağıranın sorumluluğundadır.
   *
   * @example
   * ```ts
   * await map.layerManager.applyLayerStyle("katman-id", {
   *   fill: { mode: "solid", color: "#3388ff", opacity: 0.6 },
   *   outline: { enabled: true, color: "#1d4e89", width: 2 },
   * });
   * ```
   */
  // Donen Promise, GENISLIK gercekten degistiyse (bkz asagidaki widthChanged)
  // waitForRenderSettle() ile cozulur -- cagiran taraf (TucbsStyleEditor)
  // bu Promise'i "Uygulanıyor…" gostergesini ne kadar sure tutacagini
  // bilmek icin kullanabilir. Renk/opaklik gibi geometriye dokunmayan
  // degisikliklerde HEMEN cozulur (yapay bir bekleme EKLENMEZ).
  async applyLayerStyle(id, spec) {
    const managed = this.requireLayer(id);
    if (!("entities" in managed.cesiumObject)) {
      throw new LayerOperationError(
        "LAYER_STYLE_NOT_VECTOR",
        `applyLayerStyle sadece vektör (Entity tabanlı) katmanlarda kullanılabilir: "${id}"`
      );
    }
    await this.styleEngine.applyLayerStyle(
      id,
      managed.cesiumObject,
      managed.layerType === "DRAWING" || managed.layerType === "MEASURE",
      spec
    );
  }
  /** Bir vektor katmana en son uygulanan stili döndürür (TucbsLegendPanel için). */
  getLayerStyle(id) {
    return this.styleEngine.getStyle(id);
  }
  /** Katmana eklenirken atanan ilk (random) rengi döndürür — sonraki stil
   * değişikliklerinden etkilenmez. TucbsStyleEditor'ün "Sıfırla" işlevi
   * için kullanılır. */
  getInitialFillColor(id) {
    var _a2;
    return (_a2 = this.items.get(id)) == null ? void 0 : _a2.initialFillColor;
  }
  /** Basemap HARİÇ tüm imagery (WMS/WMTS/WCS/GEOTIFF) katmanlarının Cesium `ImageryLayer`'larını döndürür. */
  getImageryLayers() {
    return Array.from(this.items.values()).filter(
      (m) => !m.isBasemap && m.cesiumObject instanceof cesium.ImageryLayer
    ).map((m) => m.cesiumObject);
  }
  /** SADECE basemap olarak işaretli imagery katmanlarının Cesium `ImageryLayer`'larını döndürür. */
  getBasemapLayers() {
    return Array.from(this.items.values()).filter(
      (m) => m.isBasemap && m.cesiumObject instanceof cesium.ImageryLayer
    ).map((m) => m.cesiumObject);
  }
  /** Cesium `Viewer`'ın `dataSources` koleksiyonunu doğrudan döndürür. */
  getDataSourceLayers() {
    return this.viewer.dataSources;
  }
  /** Belirli bir katman türündeki (`WMS`/`WFS`/... ) tüm yönetilen katmanları döndürür. */
  getLayerByType(layerType) {
    return Array.from(this.items.values()).filter(
      (m) => m.layerType === layerType
    );
  }
  // ── Kamera ───────────────────────────────────────────────────────────────
  /**
   * Kamerayı, katmanın tüm görünür alanına (extent) düz tepeden bakışla yakınlaştırır.
   *
   * @example
   * ```ts
   * await map.layerManager.zoomToLayer("katman-id");
   * ```
   */
  async zoomToLayer(id) {
    return this.cameraHighlight.zoomToLayer(id);
  }
  /** Kamerayı, tek bir entity'nin çerçevesine düz tepeden bakışla yakınlaştırır. */
  async zoomToEntity(entity, options) {
    return this.cameraHighlight.zoomToEntity(entity, options);
  }
  /** Bir entity'yi, kendi stiline dokunmadan sabit renkli bir "outline" ile geçici olarak vurgular. */
  highlightEntity(entity) {
    this.cameraHighlight.highlightEntity(entity);
  }
  /** {@link highlightEntity} ile eklenen geçici vurguyu kaldırır (aktif vurgu yoksa no-op). */
  clearHighlight() {
    this.cameraHighlight.clearHighlight();
  }
  async add(layerType, options) {
    this.assertUniqueId(options.id);
    switch (layerType) {
      case "WMS":
        return this.addWMS(options);
      case "WMTS":
        return this.addWMTS(options);
      case "WFS":
        return this.addWFS(options);
      case "WCS":
        return this.addWCS(options);
      case "GEOTIFF":
        return this.addGeoTiff(options);
      case "GEOJSON":
      case "KML":
      case "KMZ":
        return this.addLocalKmlGeoJson(layerType, options);
      case "SHP":
        return this.addShp(options);
      case "CSV":
        return this.addCsv(options);
      case "XYZ":
        throw new LayerOperationError(
          "LAYER_TYPE_UNSUPPORTED_XYZ",
          "XYZ katmanı add() ile desteklenmiyor. Map.setBasemap() kullanın."
        );
      case "DRAWING":
        throw new LayerOperationError(
          "LAYER_TYPE_UNSUPPORTED_DRAWING",
          '"DRAWING" katmanı add() ile desteklenmiyor -- DrawingManager draw:complete olayı üzerinden Map tarafından otomatik eklenir.'
        );
      case "MEASURE":
        throw new LayerOperationError(
          "LAYER_TYPE_UNSUPPORTED_MEASURE",
          '"MEASURE" katmanı add() ile desteklenmiyor -- DrawingManager draw:complete olayı üzerinden Map tarafından otomatik eklenir.'
        );
    }
  }
  // ── Görünürlük & Opaklık ─────────────────────────────────────────────────
  /**
   * Bir katmanın görünürlüğünü ayarlar.
   *
   * @example
   * ```ts
   * map.layerManager.setVisible("katman-id", false);
   * ```
   */
  setVisible(id, visible) {
    const managed = this.requireLayer(id);
    managed.cesiumObject.show = visible;
    this.emit("layer:visibility", { id, visible });
  }
  /**
   * Bir katmanın opaklığını (0-1 arası, sınırlanır) ayarlar.
   *
   * @example
   * ```ts
   * map.layerManager.setOpacity("katman-id", 0.5);
   * ```
   */
  setOpacity(id, opacity) {
    const clamped = Math.max(0, Math.min(1, opacity));
    const managed = this.requireLayer(id);
    if (managed.cesiumObject instanceof cesium.ImageryLayer) {
      managed.cesiumObject.alpha = clamped;
    } else {
      this.setDataSourceOpacity(managed.cesiumObject, clamped);
    }
    this.emit("layer:opacity", { id, opacity: clamped });
  }
  // ── Z-sıra ───────────────────────────────────────────────────────────────
  // raise/lower/raiseToTop/lowerToBottom birbirinin harfi harfine kopyasiydi
  // (tek fark cagrilan Cesium koleksiyon metodunun adiydi) -- Adim 9
  // (Temizlik) kapsaminda tek bir ozel yardimciya indirildi (bkz
  // project_ucbp_api_god_component_refactor_arastirma_ozeti, GC-01 2.2
  // Ornek 3). imageryLayers/dataSources ayni metod isimlerini (raise/
  // lower/raiseToTop/lowerToBottom/indexOf) FARKLI parametre tipleriyle
  // (ImageryLayer vs DataSource) bildirdigi icin TS statik olarak union
  // uzerinden guvenli cagrimayi dogrulayamiyor -- "as never" cast'i burada
  // BILEREK kullaniliyor (runtime'da managed.cesiumObject ile collection
  // instanceof kontrolune gore ZATEN eslesiyor).
  _move(id, op) {
    const managed = this.requireLayer(id);
    const collection = managed.cesiumObject instanceof cesium.ImageryLayer ? this.viewer.imageryLayers : this.viewer.dataSources;
    const oldIndex = collection.indexOf(managed.cesiumObject);
    collection[op](managed.cesiumObject);
    const newIndex = collection.indexOf(managed.cesiumObject);
    this.reindexLayerOrder();
    this.emit("layer:reorder", { id, oldIndex, newIndex, layer: managed });
  }
  /** Katmanı kendi koleksiyonu (imagery veya dataSource) içinde bir sıra yukarı taşır. */
  raise(id) {
    this._move(id, "raise");
  }
  /** Katmanı kendi koleksiyonu (imagery veya dataSource) içinde bir sıra aşağı taşır. */
  lower(id) {
    this._move(id, "lower");
  }
  /** Katmanı kendi koleksiyonu (imagery veya dataSource) içinde en üste taşır. */
  raiseToTop(id) {
    this._move(id, "raiseToTop");
  }
  /** Katmanı kendi koleksiyonu (imagery veya dataSource) içinde en alta taşır. */
  lowerToBottom(id) {
    this._move(id, "lowerToBottom");
  }
  /** TucbsLayerList sürükle-bırak yeniden sıralaması için: basemap hariç tüm katmanların yeni z-sırasını tek çağrıda uygular. */
  // TucbsLayerList'teki surukle-birak yeniden siralama icin: basemap HARIC
  // TUM katmanlarin YENI z-sirasini (en usttekinden en alttakine, yani
  // raiseToTop()'un "index 0" varsayimiyla TUTARLI) TEK cagride uygular.
  // WHY (BUNUN YERINE tek-adimlik raise()/lower() cagrilarinin bir
  // DONGUDE, KARISIK liste indeks farki kadar tekrarlanmasi NEDEN YANLIS):
  // Cesium'da imagery (WMS/WMTS/WCS) ve dataSource (GEOJSON/KML/WFS/...)
  // katmanlari AYRI koleksiyonlardir (viewer.imageryLayers / viewer.
  // dataSources); TucbsLayerList'in gosterdigi liste ise IKI turu de
  // KARISIK sirada tutar. Suruklenen bir imagery katmani, listede araya
  // giren dataSource katmanlari kadar "fazladan" raise()/lower() adimi
  // alirdi -- ama bu adimlar SADECE imagery koleksiyonu icinde uygulanir,
  // ve imageryLayers[0] HER ZAMAN basemap'e ayrilmistir (bkz Map.
  // setBasemap). Fazladan bir lower() cagrisi, katman zaten basemap'in
  // hemen ustundeyken (index 1) onu basemap'le (index 0) YER
  // DEGISTIRIRDI -- katman artik basemap'in ALTINDA kalip haritada
  // GORSEL OLARAK TAMAMEN KAYBOLURDU (basemap tum globe'u kapladigi
  // icin), listede ise HALA GORUNMEYE devam ederdi (bkz kullanici
  // bildirimi: "sadece TucbsServiceUpload/WMS-WMTS-WCS katmanlarinda,
  // TucbsFileUpload/dataSource katmanlarinda degil" -- bu asimetri tam
  // olarak bu kok nedenle ortusuyor). Bu metod bunun yerine her katmani
  // KENDI koleksiyonu icinde, KENDI turdeslerine gore dogru sirada
  // raiseToTop() ile (alttan basa dogru islenerek) yeniden konumlandirir
  // -- basemap'e ASLA dokunmaz (o zaten `orderedIds` icinde YER ALMAZ,
  // bkz TucbsLayerList._syncFromLayerManager'in isBasemap filtresi).
  reorder(orderedIds) {
    const primaryId = orderedIds[0];
    const primaryManaged = primaryId !== void 0 ? this.items.get(primaryId) : void 0;
    const primaryIsImagery = (primaryManaged == null ? void 0 : primaryManaged.cesiumObject) instanceof cesium.ImageryLayer;
    const primaryOldIndex = primaryManaged ? primaryIsImagery ? this.viewer.imageryLayers.indexOf(primaryManaged.cesiumObject) : this.viewer.dataSources.indexOf(primaryManaged.cesiumObject) : -1;
    const imageryIds = [];
    const dataSourceIds = [];
    for (const id of orderedIds) {
      const managed = this.items.get(id);
      if (managed === void 0) continue;
      if (managed.cesiumObject instanceof cesium.ImageryLayer) {
        imageryIds.push(id);
      } else {
        dataSourceIds.push(id);
      }
    }
    for (let i = imageryIds.length - 1; i >= 0; i--) {
      const managed = this.items.get(imageryIds[i]);
      if ((managed == null ? void 0 : managed.cesiumObject) instanceof cesium.ImageryLayer) {
        this.viewer.imageryLayers.raiseToTop(managed.cesiumObject);
      }
    }
    for (let i = dataSourceIds.length - 1; i >= 0; i--) {
      const managed = this.items.get(dataSourceIds[i]);
      if (managed !== void 0 && !(managed.cesiumObject instanceof cesium.ImageryLayer)) {
        this.viewer.dataSources.raiseToTop(managed.cesiumObject);
      }
    }
    this.reindexLayerOrder();
    if (primaryManaged !== void 0 && primaryId !== void 0) {
      const primaryNewIndex = primaryIsImagery ? this.viewer.imageryLayers.indexOf(primaryManaged.cesiumObject) : this.viewer.dataSources.indexOf(primaryManaged.cesiumObject);
      this.emit("layer:reorder", {
        id: primaryId,
        oldIndex: primaryOldIndex,
        newIndex: primaryNewIndex,
        layer: primaryManaged
      });
    }
  }
  // ── Kaldırma ─────────────────────────────────────────────────────────────
  /**
   * Katmanı haritadan ve tüm iç bookkeeping (stil/apiKey/sayaç kayıtları) yapılarından kaldırır.
   *
   * @example
   * ```ts
   * map.layerManager.removeLayer("katman-id");
   * ```
   */
  removeLayer(id) {
    const managed = this.requireLayer(id);
    if (managed.cesiumObject instanceof cesium.ImageryLayer) {
      this.viewer.imageryLayers.remove(managed.cesiumObject, true);
    } else {
      void this.viewer.dataSources.remove(managed.cesiumObject, true);
    }
    this.items.delete(id);
    this.analysisResultIds.delete(id);
    this.ogcLayerFactory.deleteServiceOptions(id);
    this.styleEngine.deleteStyle(id);
    this.shapeLayerBridge.deleteCounter(id);
    this.emit("layer:remove", { layer: managed });
  }
  // ── İç: WMS/WMTS/WFS/WCS/GeoTIFF ────────────────────────────────────────
  // Orkestrasyon layers/ogc/OgcLayerFactory.ts'e tasindi (bkz Adim 8/Faz 2) --
  // asagidaki delegeler ISIM/IMZA/JSDoc AYNEN korunur: 5 tanesi (addWMS/
  // addWMTS/addWFS/addWCS/addGeoTiff) add() dispatcher'i tarafindan
  // DOGRUDAN cagrilir, digerleri (setWmsStyle vb.) public API yuzeyidir
  // (bkz kural 3 -- yuzey sabit).
  addWMS(options) {
    return this.ogcLayerFactory.addWMS(options);
  }
  addWMTS(options) {
    return this.ogcLayerFactory.addWMTS(options);
  }
  /** Bir WMS katmanının sunucu-tanımlı (GetCapabilities'ten) stil seçeneklerini, lejant URL'leriyle birlikte döndürür. */
  async getWmsAvailableStyles(id) {
    return this.ogcLayerFactory.getWmsAvailableStyles(id);
  }
  /** WMS katmanını seçilen sunucu-tanımlı stille (STYLES parametresiyle) yeniden kurar. */
  async setWmsStyle(id, styleName) {
    return this.ogcLayerFactory.setWmsStyle(id, styleName);
  }
  /** WMS GetLegendGraphic URL'ini (apiKey varsa query parametresiyle) oluşturur. */
  getWmsLegendGraphicUrl(id, styleName) {
    return this.ogcLayerFactory.getWmsLegendGraphicUrl(id, styleName);
  }
  /** Bir WMTS katmanının sunucu-tanımlı (GetCapabilities'ten) stil seçeneklerini, lejant URL'leriyle birlikte döndürür. */
  async getWmtsAvailableStyles(id) {
    return this.ogcLayerFactory.getWmtsAvailableStyles(id);
  }
  /** WMTS katmanını seçilen sunucu-tanımlı stille yeniden kurar. */
  async setWmtsStyle(id, styleName) {
    return this.ogcLayerFactory.setWmtsStyle(id, styleName);
  }
  // WFS de lokal vektor katmanlari gibi varsayilan olarak zemine oturtulur.
  // Cesium, zemine oturan (GroundPrimitive) poligonlari oturmayanlardan
  // AYRI bir geciste ve her zaman onlarin altinda cizer; iki tur karisinca
  // Katman Yonetimi'ndeki sira haritaya yansimiyordu (WFS hep ustte
  // kaliyordu). Zemine oturan katmanlar ise kendi aralarinda
  // viewer.dataSources sirasiyla cizilir (her dataSource'un
  // OrderedGroundPrimitiveCollection'i raiseToTop ile birlikte tasinir), bu
  // yuzden reorder() ek bir islem gerektirmez. Kutup/antimeridyen poligonlari
  // OutlineGeometry.disableRiskyPolygonOutlines zeminden ayirir.
  addWFS(options) {
    return this.ogcLayerFactory.addWFS({
      ...options,
      clampToGround: options.clampToGround ?? true
    });
  }
  addWCS(options) {
    return this.ogcLayerFactory.addWCS(options);
  }
  addGeoTiff(options) {
    return this.ogcLayerFactory.addGeoTiff(options);
  }
  // ── İç: GeoJSON / KML / KMZ ──────────────────────────────────────────────
  addLocalKmlGeoJson(layerType, options) {
    return this.localSourceLoader.addLocalKmlGeoJson(layerType, options);
  }
  // ── İç: SHP ──────────────────────────────────────────────────────────────
  addShp(options) {
    return this.localSourceLoader.addShp(options);
  }
  // ── İç: CSV ──────────────────────────────────────────────────────────────
  addCsv(options) {
    return this.localSourceLoader.addCsv(options);
  }
  // ── İç: Basemap (Map sınıfı tarafından kullanılır) ───────────────────────
  /** @internal */
  _addBasemapImageryLayer(id, title, imageryLayer) {
    return this.register(id, title, "XYZ", imageryLayer, true);
  }
  /** @internal */
  _removeBasemapLayers() {
    for (const managed of this.items.values()) {
      if (managed.isBasemap && managed.cesiumObject instanceof cesium.ImageryLayer) {
        this.viewer.imageryLayers.remove(managed.cesiumObject, true);
        this.items.delete(managed.id);
      }
    }
  }
  // ── İç: Çizim Katmanı (Map'in DrawingManager köprüsü) ────────────────────
  // Orkestrasyon layers/sources/ShapeLayerBridge.ts'e tasindi (bkz Adim 7/Faz 3) --
  // asagidaki 3 metod SADECE ince delege; isim/imza AYNEN korunur cunku
  // Map.ts (draw:complete/draw:remove dinleyicileri) bunlari DOGRUDAN
  // cagirir (bkz kural 3 -- public/internal yuzey sabit).
  /** @internal */
  _addDrawnShape(id, title, shape) {
    return this.shapeLayerBridge.addDrawnShape(id, title, shape);
  }
  /** @internal */
  _addMeasuredShape(id, title, shape) {
    return this.shapeLayerBridge.addMeasuredShape(id, title, shape);
  }
  /** @internal */
  _removeDrawnShape(id, entity) {
    this.shapeLayerBridge.removeDrawnShape(id, entity);
  }
  // ── Yardımcılar ──────────────────────────────────────────────────────────
  register(id, title, layerType, cesiumObject, isBasemap, initialFillColor) {
    if ("entities" in cesiumObject) {
      this.tagEntities(cesiumObject, id);
    }
    const managed = Object.freeze({
      id,
      title,
      layerType,
      cesiumObject,
      isBasemap,
      ...initialFillColor !== void 0 ? { initialFillColor } : {}
    });
    this.items.set(id, managed);
    this.emit("layer:add", { layer: managed });
    return managed;
  }
  // addWFS/addLocalKmlGeoJson/addShp -- UCUNUN de ensureGeoJsonCrsSupport()
  // sonucunu register()'dan hemen sonra AYNI sekilde event'e cevirmesi
  // gerektigi icin (bkz layers/sources/geojsonCrs.ts CrsCheckResult), tekrari
  // onlemek amaciyla buraya alindi.
  emitCrsCheckResult(id, result) {
    if (!result) return;
    switch (result.kind) {
      case "reprojected":
        this.emit("layer:crs-reprojected", { id, fromEpsg: result.fromEpsg, toEpsg: "EPSG:4326" });
        break;
      case "suspicious-unresolved-crs":
        this.emit("layer:crs-unresolved", { id, crsName: result.crsName });
        break;
    }
  }
  // InteractionManager'in entity:click payload'indaki layerId/featureId alanlarini
  // doldurabilmesi icin her DataSource-tabanli katmanin entity'lerini etiketler
  // (bkz claude-code-interactionmanager-drawingmanager-mimarisi-v1.md §3.4).
  tagEntities(dataSource, layerId) {
    dataSource.entities.suspendEvents();
    for (const entity of dataSource.entities.values) {
      if (entity.properties === void 0) {
        entity.properties = new cesium.PropertyBag();
      }
      if (!entity.properties.hasProperty("layerId")) {
        entity.properties.addProperty("layerId", layerId);
      }
      if (!entity.properties.hasProperty("featureId")) {
        entity.properties.addProperty("featureId", entity.id);
      }
    }
    dataSource.entities.resumeEvents();
  }
  // raise/lower Cesium koleksiyonlarinin (imageryLayers / dataSources) sirasini
  // degistirir ama "items" Map'inin ekleme sirasini degistirmez; getLayers()
  // gercek z-sirasini donsun diye ImageryLayer'lari kendi koleksiyonundaki,
  // DataSource'lari da kendi koleksiyonundaki guncel sıraya gore yeniden
  // siralar (iki tur birbirine karisik oldugunda goreli sira korunur).
  reindexLayerOrder() {
    const imageryIndex = /* @__PURE__ */ new Map();
    for (let i = 0; i < this.viewer.imageryLayers.length; i++) {
      imageryIndex.set(this.viewer.imageryLayers.get(i), i);
    }
    const dataSourceIndex = /* @__PURE__ */ new Map();
    for (let i = 0; i < this.viewer.dataSources.length; i++) {
      dataSourceIndex.set(this.viewer.dataSources.get(i), i);
    }
    const orderOf = (managed) => (managed.cesiumObject instanceof cesium.ImageryLayer ? imageryIndex.get(managed.cesiumObject) : dataSourceIndex.get(managed.cesiumObject)) ?? Number.POSITIVE_INFINITY;
    const entries = Array.from(this.items.entries());
    const imageryEntries = entries.filter(([, m]) => m.cesiumObject instanceof cesium.ImageryLayer).sort(([, a], [, b]) => orderOf(a) - orderOf(b));
    const dataSourceEntries = entries.filter(([, m]) => !(m.cesiumObject instanceof cesium.ImageryLayer)).sort(([, a], [, b]) => orderOf(a) - orderOf(b));
    let imageryCursor = 0;
    let dataSourceCursor = 0;
    const merged = entries.map(
      ([, managed]) => managed.cesiumObject instanceof cesium.ImageryLayer ? imageryEntries[imageryCursor++] : dataSourceEntries[dataSourceCursor++]
    );
    this.items.clear();
    for (const [id, managed] of merged) this.items.set(id, managed);
  }
  requireLayer(id) {
    const managed = this.items.get(id);
    if (managed === void 0) {
      throw new LayerOperationError("LAYER_NOT_FOUND", `Katman bulunamadı: "${id}"`);
    }
    return managed;
  }
  assertUniqueId(id) {
    if (this.items.has(id)) {
      throw new LayerOperationError("LAYER_ID_ALREADY_EXISTS", `"${id}" id'li katman zaten eklenmiş.`);
    }
  }
  /**
   * ML-12 düzeltmesi: OGC GetCapabilities'i apiKey header + proxy KURALLARIYLA
   * çeker. `TucbsServiceUpload` (GC-05) gibi ayrı bir `LayerManager`
   * referansına sahip tüketiciler de servis keşfi için bunu kullanır --
   * eskiden bu tüketiciler proxy/apiKey'den TAMAMEN habersiz çıplak `fetch`
   * kullanıyordu (bkz project_ucbp_api_ogc_capabilities_uygulama_plani, ML-12).
   * layers/ogc/OgcLayerFactory.ts'e delege (bkz Adim 8/Faz 2).
   */
  async getCapabilitiesDocument(baseUrl, serviceType, version, authToken) {
    return this.ogcLayerFactory.getCapabilitiesDocument(baseUrl, serviceType, version, authToken);
  }
  /**
   * Faz 5b (ML-12'nin DescribeCoverage boşluğu): WCS coverage'larının gerçek
   * coğrafi kapsama alanlarını `getCapabilitiesDocument` ile AYNI apiKey/proxy
   * politikasından geçirerek çeker -- eskiden bu istek proxy'siz gittiği için
   * CORS-korumalı sunucularda sessizce başarısız olup katmanlar global
   * (-180,-90,180,90) dikdörtgene düşüyordu (bkz
   * project_ucbp_api_ogc_capabilities_uygulama_plani Faz 5b).
   * layers/ogc/OgcLayerFactory.ts'e delege (bkz Adim 8/Faz 2).
   */
  async getWcsCoverageExtents(rawUrl, coverageIds, authToken) {
    return this.ogcLayerFactory.getWcsCoverageExtents(rawUrl, coverageIds, authToken);
  }
  // Katman EKLENDIKTEN ya da genislik gibi GEOMETRI gerektiren bir stil
  // degisikligi UYGULANDIKTAN SONRA, Cesium GeometryVisualizer/
  // ClassificationPrimitive gibi entity'leri genellikle ASENKRON (worker'lar
  // uzerinden, birden fazla render karesi suren) olarak GORSEL primitive'lere
  // cevirir. Cesium'un Entity/DataSource API'sinde "primitive artik ekranda
  // hazir" diyen PUBLIC bir sinyal YOK (bkz kullanici bildirimi: buyuk
  // katmanlarda -- 68-86MB'lik Ulkeler_Polygon gibi -- hem ilk yuklemede hem
  // de Dis Hat Genislik degisikliginde ekran BIR SURE eski/bos haliyle
  // kaliyordu). add()/applyLayerStyle()'in dondurdugu Promise, cagiran
  // tarafin (ör. TucbsFileUpload/TucbsStyleEditor) bu sure boyunca bir
  // "Yukleniyor…" gostergesi tutabilmesi icin BU bekleme penceresini de
  // kapsayacak sekilde genisletilir. requestAnimationFrame yerine BILEREK
  // scene.postRender kullanilir -- bu, Cesium'un KENDI render dongusune
  // (surekli render modu varsayilaninda HER karede calisir) bagli oldugu
  // icin bagimsiz bir zamanlayicidan daha guvenilirdir. Kesin bir tamamlanma
  // sinyali OLMADIGINDAN bu SADECE bir TAHMIN -- cok buyuk veri kumelerinde
  // gercek gorsel tamamlanma bu pencereden biraz daha uzun surebilir, ama
  // "hic beklemeden hemen kapatmak"tan cok daha dogru bir yaklasim.
  waitForRenderSettle(frames = 60) {
    return new Promise((resolve) => {
      let remaining = frames;
      const listener = () => {
        remaining -= 1;
        if (remaining <= 0) {
          this.viewer.scene.postRender.removeEventListener(listener);
          resolve();
        }
      };
      this.viewer.scene.postRender.addEventListener(listener);
    });
  }
  /** Bu entity'nin KENDİSİ bir outline companion'i mi (ayri bir polyline
   * olarak eklenmis, poligonun gercek bir ozelligi degil)? */
  isOutlineCompanion(entity) {
    return this.outlineGeometry.isOutlineCompanion(entity);
  }
  /** Bu (poligon) entity'nin bir outline companion'i VAR mi -- varsa native
   * polygon.outline/outlineColor/outlineWidth alanlarina DOKUNULMAMALI. */
  hasOutlineCompanion(entity) {
    return this.outlineGeometry.hasOutlineCompanion(entity);
  }
  /** Bu (poligon) entity antimeridyen/kutup crash riski tasidigi icin native
   * outline'i BILEREK kapatilmis mi -- tekrar acilmamali. */
  hasRiskyOutline(entity) {
    return this.outlineGeometry.hasRiskyOutline(entity);
  }
  // Cesium, clampToGround (zemine oturan/GroundPrimitive) poligonlarda
  // outline'i framework seviyesinde sessizce kapatir (bkz.
  // @cesium/engine/Source/DataSources/GeometryUpdater.js: "outlineEnabled &&
  // onTerrain" kontrolu) -- WebGL kisitlamasi, bizim kodumuzdaki bir hata
  // degil. clampToGround:false durumda da outlineWidth>1 coğu GPU/tarayicida
  // GL_LINE_WIDTH sinirlamasi yuzunden PRATIKTE gorunmuyor (gercek headless
  // testle Cizim Katmani icin dogrulandi) -- ayni companion-polyline
  // teknigi HER IKI durumda da kullanilir (bkz addPolygonOutlineCompanion),
  // companion'in KENDI clampToGround'u ilgili poligonla ayni tutulur.
  addPolygonOutlines(dataSource, color, width) {
    this.outlineGeometry.addPolygonOutlines(dataSource, color, width);
    for (const entity of dataSource.entities.values) {
      if (this.outlineGeometry.hasOutlineCompanion(entity)) {
        this.opacityController.ensureDynamicFillColor(dataSource, entity);
      }
    }
  }
  // Bir poligon entity'sinin kose koordinatlarindan AYRI bir polyline
  // "outline" entity'si ekler (bkz yukaridaki addPolygonOutlines yorumu) --
  // hem TOPLU ilk yukleme (addPolygonOutlines) HEM DE Cizim Katmani'na TEK
  // TEK eklenen poligonlar (_addDrawnShape, clampToGround:false) bu ORTAK
  // helper'i kullanir. Companion, applyLayerStyle()'daki mevcut
  // outlineCompanionEntities dongusu tarafindan otomatik olarak
  // renk/genislik guncellemesi alir.
  addPolygonOutlineCompanion(dataSource, entity, color, width, clampToGround) {
    this.outlineGeometry.addPolygonOutlineCompanion(
      dataSource,
      entity,
      color,
      width,
      clampToGround
    );
    if (this.outlineGeometry.hasOutlineCompanion(entity)) {
      this.opacityController.ensureDynamicFillColor(dataSource, entity);
    }
  }
  // layers/style/LayerStyleEngine.ts'e delege (public -- getUniqueColumnValues de kullanir).
  readProperty(entity, column, time) {
    return this.styleEngine.readProperty(entity, column, time);
  }
  // layers/style/LayerStyleEngine.ts'e delege (public -- _addDrawnShape/
  // _addMeasuredShape applyLayerStyle'dan BAGIMSIZ dogrudan cagirir).
  applyEntityStyle(entity, color, outline, isShapeLayer) {
    this.styleEngine.applyEntityStyle(entity, color, outline, isShapeLayer);
  }
  // layers/style/OpacityController.ts'e delege.
  setDataSourceOpacity(dataSource, opacity) {
    this.opacityController.setDataSourceOpacity(dataSource, opacity);
  }
  // ── Kaynak temizleme ─────────────────────────────────────────────────────
  /** Tüm event dinleyicilerini ve iç katman kaydını temizler (Cesium katmanlarının kendisini kaldırmaz). */
  destroy() {
    this.removeAllListeners();
    this.items.clear();
  }
};
_LayerManager.DEFAULT_OUTLINE_COLOR_HEX = "#1a73e8";
_LayerManager.DEFAULT_OUTLINE_COLOR = cesium.Color.fromCssColorString(
  _LayerManager.DEFAULT_OUTLINE_COLOR_HEX
);
let LayerManager = _LayerManager;
const FLAG = "__tucbsSelectionHighlight";
function isSelectionHighlightEntity(entity) {
  return entity[FLAG] === true;
}
class SelectionHighlight {
  constructor(viewer) {
    this.viewer = viewer;
    this.source = null;
    this.generation = 0;
  }
  show(features) {
    const generation = ++this.generation;
    if (features.length === 0) {
      this.removeSource();
      return;
    }
    void this.load(features, generation);
  }
  clear() {
    this.generation++;
    this.removeSource();
  }
  async load(features, generation) {
    const fill = cesium.Color.fromCssColorString("#dc2626").withAlpha(0.25);
    const stroke = cesium.Color.fromCssColorString("#dc2626");
    const data = { type: "FeatureCollection", features: [...features] };
    const source = await cesium.GeoJsonDataSource.load(data, {
      clampToGround: true,
      fill,
      stroke,
      strokeWidth: 3,
      markerColor: stroke,
      markerSize: 16
    });
    if (generation !== this.generation) return;
    this.removeSource();
    this.paint(source, fill, stroke);
    this.viewer.dataSources.add(source);
    this.source = source;
  }
  paint(source, fill, stroke) {
    var _a2;
    for (const entity of [...source.entities.values]) {
      this.tag(entity);
      if (entity.billboard) {
        entity.billboard = void 0;
        entity.point = new cesium.PointGraphics({
          pixelSize: 16,
          color: stroke,
          outlineColor: cesium.Color.WHITE,
          outlineWidth: 2,
          heightReference: cesium.HeightReference.CLAMP_TO_GROUND,
          disableDepthTestDistance: Number.POSITIVE_INFINITY
        });
      }
      const polygon = entity.polygon;
      if (!polygon) continue;
      polygon.material = new cesium.ColorMaterialProperty(fill);
      polygon.outline = new cesium.ConstantProperty(false);
      const hierarchy = (_a2 = polygon.hierarchy) == null ? void 0 : _a2.getValue(cesium.JulianDate.now());
      this.addRings(source, hierarchy, stroke);
    }
  }
  addRings(source, hierarchy, stroke) {
    var _a2;
    if (!((_a2 = hierarchy == null ? void 0 : hierarchy.positions) == null ? void 0 : _a2.length)) return;
    this.addRing(source, hierarchy.positions, stroke);
    for (const hole of hierarchy.holes ?? []) this.addRings(source, hole, stroke);
  }
  addRing(source, positions, stroke) {
    const line2 = source.entities.add({
      polyline: {
        positions,
        width: 3,
        material: new cesium.ColorMaterialProperty(stroke),
        clampToGround: true
      }
    });
    this.tag(line2);
  }
  tag(entity) {
    entity[FLAG] = true;
  }
  removeSource() {
    if (!this.source) return;
    this.viewer.dataSources.remove(this.source, true);
    this.source = null;
  }
}
const DRILL_PICK_LIMIT = 32;
function boundingBoxFromPoints(points) {
  if (points.length === 0) return void 0;
  let west = Infinity;
  let south = Infinity;
  let east = -Infinity;
  let north = -Infinity;
  for (const [lon, lat] of points) {
    if (lon < west) west = lon;
    if (lon > east) east = lon;
    if (lat < south) south = lat;
    if (lat > north) north = lat;
  }
  if (west === east && south === north) return { kind: "point", longitude: west, latitude: south };
  return { kind: "extent", west, south, east, north };
}
function flattenGeoJsonCoordinates(coords, out) {
  if (!Array.isArray(coords) || coords.length === 0) return;
  if (typeof coords[0] === "number") {
    const [lon, lat] = coords;
    if (typeof lon === "number" && typeof lat === "number") out.push([lon, lat]);
    return;
  }
  for (const child of coords) flattenGeoJsonCoordinates(child, out);
}
function extractGeoJsonExtent(data) {
  if (data === null || typeof data !== "object") return void 0;
  const feature = data;
  const geometries = feature.type === "FeatureCollection" && Array.isArray(feature.features) ? feature.features.map((f) => f == null ? void 0 : f.geometry).filter((g) => g !== void 0 && g !== null) : feature.geometry ? [feature.geometry] : [];
  if (geometries.length === 0) return void 0;
  const points = [];
  for (const geometry of geometries) {
    const g = geometry;
    if (g.type === "GeometryCollection" && Array.isArray(g.geometries)) {
      for (const sub of g.geometries) {
        flattenGeoJsonCoordinates(sub == null ? void 0 : sub.coordinates, points);
      }
    } else {
      flattenGeoJsonCoordinates(g.coordinates, points);
    }
  }
  return boundingBoxFromPoints(points);
}
function collectGmlCoordinates(node, out) {
  var _a2, _b;
  for (const el2 of Array.from(node.getElementsByTagNameNS("*", "coordinates"))) {
    const text = (_a2 = el2.textContent) == null ? void 0 : _a2.trim();
    if (!text) continue;
    for (const pair of text.split(/\s+/)) {
      const [lonStr, latStr] = pair.split(",");
      const lon = Number(lonStr);
      const lat = Number(latStr);
      if (Number.isFinite(lon) && Number.isFinite(lat)) out.push([lon, lat]);
    }
  }
  for (const tag of ["pos", "posList"]) {
    for (const el2 of Array.from(node.getElementsByTagNameNS("*", tag))) {
      const numbers = (((_b = el2.textContent) == null ? void 0 : _b.trim()) ?? "").split(/\s+/).map(Number);
      for (let i = 0; i + 1 < numbers.length; i += 2) {
        const lon = numbers[i];
        const lat = numbers[i + 1];
        if (Number.isFinite(lon) && Number.isFinite(lat)) out.push([lon, lat]);
      }
    }
  }
}
function extractGmlExtent(data) {
  if (!(data instanceof Element)) return void 0;
  const points = [];
  collectGmlCoordinates(data, points);
  return boundingBoxFromPoints(points);
}
function extractImageryGeometry(data) {
  return extractGeoJsonExtent(data) ?? extractGmlExtent(data);
}
class InteractionManager extends EventEmitter {
  /** @param viewer - Etkileşimlerin dinleneceği Cesium `Viewer`. */
  constructor(viewer) {
    super();
    this.unsubscribers = [];
    this.suspended = false;
    this.identifySuspended = false;
    this.hoverEnabled = false;
    this.pickGeneration = 0;
    this.viewer = viewer;
    this.handler = new cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    this.bindMouseEvents();
    this.bindCameraEvents();
    this.bindSceneEvents();
  }
  /** Cesium `Scene` nesnesi (`viewer.scene`). */
  get scene() {
    return this.viewer.scene;
  }
  /** Cesium `Camera` nesnesi (`viewer.camera`). */
  get camera() {
    return this.viewer.camera;
  }
  /** Tıklama/pick event grubunu (`entity:*`/`map:*`/`imagery:*`) geçici olarak durdurur (bkz `DrawingManager`). */
  suspend() {
    if (this.suspended) return;
    this.suspended = true;
    this.emit("interaction:suspend", {});
  }
  /** `suspend()` ile durdurulan tıklama/pick event grubunu devam ettirir. */
  resume() {
    this.suspended = false;
  }
  /** Tıklama/pick event grubunun şu an durdurulmuş olup olmadığı. */
  isSuspended() {
    return this.suspended;
  }
  /** `TucbsIdentifyPanel`'in kendi tepkisini (öznitelik tablosu/koordinat kartı) geçici olarak durdurur, event yayınını ETKİLEMEZ (bkz `identifySuspended` alanı). */
  suspendIdentify() {
    this.identifySuspended = true;
  }
  /** `suspendIdentify()` ile durdurulan identify tepkisini devam ettirir. */
  resumeIdentify() {
    this.identifySuspended = false;
  }
  /** Identify tepkisinin şu an durdurulmuş olup olmadığı. */
  isIdentifySuspended() {
    return this.identifySuspended;
  }
  /** `entity:mouseenter`/`entity:mouseleave` hover event'lerinin açık olup olmadığını ayarlar; kapatılırken mevcut hover durumu sıfırlanır. */
  enableHover(enabled) {
    this.hoverEnabled = enabled;
    if (!enabled) {
      this.hoveredEntity = void 0;
    }
  }
  /** Hover event'lerinin şu an açık olup olmadığı. */
  isHoverEnabled() {
    return this.hoverEnabled;
  }
  /**
   * Kamerayı verilen coğrafi konuma top-down (`pitch=-90`) uçurur.
   * @param longitude - Boylam (derece).
   * @param latitude - Enlem (derece).
   * @param options.height - Uçuş sonrası yükseklik (metre). @default 1000
   * @param options.duration - Uçuş süresi (saniye); verilmezse Cesium'un mesafeye göre otomatik hesapladığı süre kullanılır.
   *
   * @example
   * ```ts
   * map.interactionManager.flyToPosition(32.85, 39.93, { height: 5000 });
   * ```
   */
  // Map.flyTo ile AYNI top-down varsayilan (pitch=-90) -- TucbsIdentifyPanel'in
  // "Yakınlaş" butonu, entity'si olmayan (WMS/WMTS GetFeatureInfo) raster
  // sonuclar icin bunu kullanir: bu sonuclarin client-side bir geometrisi
  // yoktur, yakinlasabilecegimiz tek sey tiklanan noktadir (entity'si olan
  // vektor sonuclar LayerManager.zoomToEntity ile feature'in GERCEK
  // cercevesine yakinlasir, bu daha hassastir).
  flyToPosition(longitude, latitude, options) {
    const height = (options == null ? void 0 : options.height) ?? 1e3;
    this.viewer.camera.flyTo({
      destination: cesium.Cartesian3.fromDegrees(longitude, latitude, height),
      orientation: { pitch: cesium.Math.toRadians(-90) },
      ...(options == null ? void 0 : options.duration) !== void 0 ? { duration: options.duration } : {}
    });
  }
  /**
   * Kamerayı verilen coğrafi dikdörtgene (derece) top-down uçurur.
   * @param duration - Uçuş süresi (saniye); verilmezse Cesium'un mesafeye göre otomatik hesapladığı süre kullanılır.
   *
   * @example
   * ```ts
   * map.interactionManager.flyToExtent(26, 36, 45, 42);
   * ```
   */
  // TucbsIdentifyPanel'in "Yakınlaş" butonu, WMS GetFeatureInfo yaniti GERCEK
  // geometri (GeoJSON) icerdiginde (bkz ImageryFeatureInfo.extent yorumu,
  // InteractionManager.extractGeoJsonExtent) tiklanan NOKTAYA sabit yukseklikte
  // ucmak (flyToPosition) veya katmanin TAMAMINA zoom yapmak (LayerManager.
  // zoomToLayer) yerine bunu kullanir -- entity'si olmayan raster sonuclarda
  // da (varsa) feature'in GERCEK sinirlarina hassas bir yakinlasma saglar.
  flyToExtent(west, south, east, north, options) {
    this.viewer.camera.flyTo({
      destination: cesium.Rectangle.fromDegrees(west, south, east, north),
      orientation: { pitch: cesium.Math.toRadians(-90) },
      ...(options == null ? void 0 : options.duration) !== void 0 ? { duration: options.duration } : {}
    });
  }
  /** `ScreenSpaceEventHandler`'ı ve tüm camera/scene aboneliklerini yok eder, kayıtlı event dinleyicilerini temizler. */
  destroy() {
    if (!this.handler.isDestroyed()) {
      this.handler.destroy();
    }
    for (const unsubscribe of this.unsubscribers) {
      unsubscribe();
    }
    this.unsubscribers.length = 0;
    this.removeAllListeners();
  }
  // ── Mouse event'leri (entity grubu + map grubu) ────────────────────────────
  bindMouseEvents() {
    this.handler.setInputAction(
      (event) => this.dispatchPick(
        event.position,
        "entity:click",
        "map:click",
        "imagery:click"
      ),
      cesium.ScreenSpaceEventType.LEFT_CLICK
    );
    this.handler.setInputAction(
      (event) => this.dispatchPick(
        event.position,
        "entity:dblclick",
        "map:dblclick",
        "imagery:dblclick"
      ),
      cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
    );
    this.handler.setInputAction(
      (event) => this.dispatchPick(
        event.position,
        "entity:rightclick",
        "map:rightclick",
        "imagery:rightclick"
      ),
      cesium.ScreenSpaceEventType.RIGHT_CLICK
    );
    this.handler.setInputAction(
      (event) => this.dispatchEntityOnly(event.position, "entity:mousedown"),
      cesium.ScreenSpaceEventType.LEFT_DOWN
    );
    this.handler.setInputAction(
      (event) => this.dispatchEntityOnly(event.position, "entity:mouseup"),
      cesium.ScreenSpaceEventType.LEFT_UP
    );
    this.handler.setInputAction(
      (event) => this.handleMouseMove(event.endPosition),
      cesium.ScreenSpaceEventType.MOUSE_MOVE
    );
    this.handler.setInputAction(
      (delta) => this.emit("map:wheel", { delta }),
      cesium.ScreenSpaceEventType.WHEEL
    );
    this.handler.setInputAction(
      (event) => this.emit("map:pinchstart", this.buildMapDetail(event.position1)),
      cesium.ScreenSpaceEventType.PINCH_START
    );
    this.handler.setInputAction(
      () => this.emit("map:pinchend", {}),
      cesium.ScreenSpaceEventType.PINCH_END
    );
    this.handler.setInputAction(
      (event) => {
        const angle = Math.atan2(
          event.position2.y - event.position1.y,
          event.position2.x - event.position1.x
        );
        this.emit("map:pinchmove", {
          ...this.buildMapDetail(event.position1),
          angle
        });
      },
      cesium.ScreenSpaceEventType.PINCH_MOVE
    );
  }
  handleMouseMove(screenPos) {
    this.emit("map:mousemove", this.buildMapDetail(screenPos));
    if (!this.hoverEnabled || this.suspended) return;
    const entity = this.pickSelectableEntity(screenPos);
    if (entity === this.hoveredEntity) return;
    if (this.hoveredEntity !== void 0) {
      this.emit(
        "entity:mouseleave",
        this.buildEntityDetail(this.hoveredEntity, screenPos)
      );
    }
    this.hoveredEntity = entity;
    if (entity !== void 0) {
      this.emit("entity:mouseenter", this.buildEntityDetail(entity, screenPos));
    }
  }
  // suspended iken pick/tiklama grubu (entity:* VE map:*) tamamen susar --
  // DrawingManager aktifken TucbsIdentifyPanel'in (map:click -> koordinat
  // karti, entity:click -> oznitelik tablosu) araya girmemesi icin. Bos
  // zemine tiklamak onceden suspended iken bile map:click yayardi (sadece
  // entity dalinda kontrol vardi) -- bu, cizim sirasinda identify koordinat
  // kartinin gorunmesine yol aciyordu (gercek kullanimda bulundu).
  dispatchPick(screenPos, entityEvent, mapEvent, imageryEvent) {
    if (this.suspended) return;
    this.pickGeneration++;
    const entity = this.pickSelectableEntity(screenPos);
    if (entity) {
      this.emit(entityEvent, this.buildEntityDetail(entity, screenPos));
    } else {
      this.emit(mapEvent, this.buildMapDetail(screenPos));
    }
    this.pickImageryFeatures(screenPos, imageryEvent);
  }
  /** Vurgu katmanını atlar; alttaki asıl objeyi seçer. */
  pickSelectableEntity(screenPos) {
    const picks = this.scene.drillPick(screenPos, DRILL_PICK_LIMIT);
    for (const pick of picks) {
      const entity = pick == null ? void 0 : pick.id;
      if (!(entity instanceof cesium.Entity)) continue;
      if (isSelectionHighlightEntity(entity)) continue;
      return entity;
    }
    return void 0;
  }
  // scene.pick hicbir Entity bulamadiginda cagrilir. Cesium'un
  // ImageryLayerCollection.pickImageryLayerFeatures'i o an ekranda render
  // edilen TUM gorunur raster katmanlar icin GetFeatureInfo'yu paralel
  // sorgular (bkz Cesium kaynagi) -- WMS/WMTS ayrimini burada elle yapmaya
  // gerek yok, sadece pickFeatures'i destekleyen/gorunur katmanlar sonuca
  // dahil olur. Hicbir katman pickable degilse (orn. sadece basemap
  // gorunuyorsa) `undefined` doner.
  pickImageryFeatures(screenPos, imageryEvent) {
    const generation = this.pickGeneration;
    const ray = this.camera.getPickRay(screenPos);
    if (!ray) return;
    const promise = this.viewer.imageryLayers.pickImageryLayerFeatures(
      ray,
      this.scene
    );
    if (!promise) return;
    this.emit("imagery:querying", this.buildMapDetail(screenPos));
    const finish = (infos) => {
      if (this.suspended || generation !== this.pickGeneration) return;
      this.emit(imageryEvent, this.buildImageryDetail(infos, screenPos));
    };
    promise.then(finish).catch(() => {
      finish([]);
    });
  }
  buildImageryDetail(infos, screenPos) {
    const features = infos.map((info) => ({
      imageryLayer: info.imageryLayer,
      name: info.name ?? null,
      properties: info.properties ?? {},
      description: info.description ?? null,
      geometryHint: extractImageryGeometry(info.data)
    }));
    return {
      position: this.toLonLat(screenPos),
      screenPos: { x: screenPos.x, y: screenPos.y },
      features
    };
  }
  // LEFT_DOWN/LEFT_UP icin map:* karsiligi katalogda yok (bkz v1 §3.3) — pick
  // bos donerse hicbir event yayilmaz.
  dispatchEntityOnly(screenPos, entityEvent) {
    if (this.suspended) return;
    const picked = this.scene.pick(screenPos);
    if ((picked == null ? void 0 : picked.id) instanceof cesium.Entity) {
      this.emit(entityEvent, this.buildEntityDetail(picked.id, screenPos));
    }
  }
  // ── Camera / Scene relay ────────────────────────────────────────────────
  bindCameraEvents() {
    this.unsubscribers.push(
      this.camera.moveStart.addEventListener(
        () => this.emit("camera:moveStart", {})
      ),
      this.camera.moveEnd.addEventListener(
        () => this.emit("camera:moveEnd", {})
      ),
      this.camera.changed.addEventListener(
        (percentage) => this.emit("camera:changed", { percentage })
      )
    );
  }
  bindSceneEvents() {
    this.unsubscribers.push(
      this.scene.preRender.addEventListener(
        (_scene, time) => this.emit("scene:preRender", { time })
      ),
      this.scene.postRender.addEventListener(
        (_scene, time) => this.emit("scene:postRender", { time })
      ),
      this.scene.morphStart.addEventListener(
        () => this.emit("scene:morphStart", {})
      ),
      this.scene.morphComplete.addEventListener(
        () => this.emit("scene:morphComplete", {})
      )
    );
  }
  // ── Yardimcilar ──────────────────────────────────────────────────────────
  buildMapDetail(screenPos) {
    return {
      position: this.toLonLat(screenPos),
      screenPos: { x: screenPos.x, y: screenPos.y }
    };
  }
  buildEntityDetail(entity, screenPos) {
    return {
      ...this.resolveFeature(entity),
      position: this.toLonLat(screenPos),
      screenPos: { x: screenPos.x, y: screenPos.y },
      features: this.pickAllFeatures(screenPos, entity)
    };
  }
  // LayerManager.addPolygonOutlineCompanion, clampToGround poligonlarda
  // (Cesium'un native outline'i calismadigi icin) her poligona AYRI, gorsel
  // amacli sentetik bir dis-hat (polyline) entity ekler -- bu companion'in
  // GeoJSON'dan gelen GERCEK bir feature'i yok, "__tucbsOutlineOf" ile
  // sadece asil (dolgu) entity'nin id'sini tasir (bkz o metodun yorumu).
  resolveFeature(entity) {
    var _a2, _b;
    const currentTime = cesium.JulianDate.now();
    const resolved = ((_a2 = entity.properties) == null ? void 0 : _a2.getValue(currentTime)) ?? {};
    const outlineOf = resolved.__tucbsOutlineOf;
    if (typeof outlineOf === "string") {
      const original = (_b = entity.entityCollection) == null ? void 0 : _b.getById(outlineOf);
      if (original && original !== entity) return this.resolveFeature(original);
    }
    const layerId = typeof resolved.layerId === "string" ? resolved.layerId : null;
    const featureId = typeof resolved.featureId === "string" ? resolved.featureId : null;
    if ("__tucbsOutlineOf" in resolved) {
      const { __tucbsOutlineOf: _drop, ...rest } = resolved;
      return { entity, layerId, featureId, properties: rest };
    }
    return { entity, layerId, featureId, properties: resolved };
  }
  // scene.pick sadece en ustteki entity'yi dondurur -- ayni ekran noktasinda
  // ust uste binen farkli vektor katmanlardaki feature'lar drillPick olmadan
  // hic identify'e girmiyordu. "entity" (en ustteki, scene.pick'in bulduğu)
  // her zaman listenin basinda yer alir.
  //
  // Dedup, PICKLENEN entity yerine resolveFeature'in DONDURDUGU (companion
  // ise asil'a substitute edilmis) entity uzerinden yapilir -- aksi halde
  // ayni poligonun hem dolgusu hem dis-hat companion'i AYRI iki "hit" olarak
  // sayilip listede iki kez gorunurdu (bkz resolveFeature'daki WHY yorumu).
  pickAllFeatures(screenPos, primary) {
    const primaryDetail = this.resolveFeature(primary);
    const features = [primaryDetail];
    const seen = /* @__PURE__ */ new Set([primaryDetail.entity]);
    const picks = this.scene.drillPick(screenPos, DRILL_PICK_LIMIT);
    for (const pick of picks) {
      const entity = pick == null ? void 0 : pick.id;
      if (!(entity instanceof cesium.Entity)) continue;
      const detail = this.resolveFeature(entity);
      if (seen.has(detail.entity)) continue;
      seen.add(detail.entity);
      features.push(detail);
    }
    return features;
  }
  // Ellipsoid uzerinde yaklasik dunya konumu — terrain yuklu olmasa da calisir.
  toLonLat(screenPos) {
    const cartesian = this.camera.pickEllipsoid(
      screenPos,
      this.scene.globe.ellipsoid
    );
    if (cartesian === void 0) return [0, 0];
    const cartographic = cesium.Cartographic.fromCartesian(cartesian);
    return [
      cesium.Math.toDegrees(cartographic.longitude),
      cesium.Math.toDegrees(cartographic.latitude)
    ];
  }
}
const EARTH_RADIUS_METERS = 6378137;
const CIRCLE_SEGMENTS = 48;
function dedupePositions(positions) {
  return positions.filter(
    (p, i) => i === 0 || !cesium.Cartesian3.equalsEpsilon(p, positions[i - 1], cesium.Math.EPSILON7)
  );
}
class DrawingManager extends EventEmitter {
  /**
   * @param viewer - Çizimin yapılacağı Cesium `Viewer`.
   * @param interactionManager - `activate()` sırasında `suspend()`/`resume()` çağrılacak `InteractionManager`.
   */
  constructor(viewer, interactionManager) {
    super();
    this.shapes = /* @__PURE__ */ new Map();
    this.positions = [];
    this.tempVertexEntities = [];
    this.freehandDragging = false;
    this.onEscapeKey = (event) => {
      if (event.key !== "Escape") return;
      this.abortCurrentShape();
    };
    this.viewer = viewer;
    this.interactionManager = interactionManager;
    this.handler = new cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
  }
  /** Cesium `Scene` nesnesi (`viewer.scene`). */
  get scene() {
    return this.viewer.scene;
  }
  /**
   * Verilen çizim aracını etkinleştirir (aktif bir araç varsa önce `deactivate()` ile kapatılır).
   * @param tool - Etkinleştirilecek çizim aracı.
   * @param source - Aktivasyonun hangi bileşen türünden geldiğini belirtir (ör. `TucbsMeasureTool` vs `TucbsDrawTool` aynı `tool` değerini farklı amaçla paylaştığında); `DrawingManager` davranışını etkilemez, sadece emit edilen event payload'ında iletilir.
   *
   * @example
   * ```ts
   * map.drawingManager.activate("rectangle");
   * ```
   */
  activate(tool, source) {
    if (this.activeTool) this.deactivate();
    this.activeTool = tool;
    this.activeSource = source;
    this.positions = [];
    this.previewPosition = void 0;
    this.interactionManager.suspend();
    this.resetTrackedEntity();
    this.suspendBuiltInDoubleClick();
    if (tool === "freehand") this.lockCamera();
    this.setCursor("crosshair");
    this.bindToolHandlers(tool);
    this.emit("draw:start", source === void 0 ? { tool } : { tool, source });
  }
  /**
   * Aktif çizim aracını kapatır; yarım kalan çizim varsa iptal edilir (tamamlanmaz).
   *
   * @example
   * ```ts
   * map.drawingManager.deactivate();
   * ```
   */
  deactivate() {
    if (!this.activeTool) return;
    const tool = this.activeTool;
    const source = this.activeSource;
    this.finishSession();
    this.emit("draw:cancel", source === void 0 ? { tool } : { tool, source });
  }
  /** Şu an etkin olan çizim aracı (yoksa `undefined`). */
  getActiveTool() {
    return this.activeTool;
  }
  /** Herhangi bir çizim aracının etkin olup olmadığı. */
  isActive() {
    return this.activeTool !== void 0;
  }
  /**
   * Tamamlanmış tüm şekillerin listesi.
   *
   * @example
   * ```ts
   * const shapes = map.drawingManager.getShapes();
   * console.log(shapes.length);
   * ```
   */
  getShapes() {
    return [...this.shapes.values()];
  }
  /** Verilen id'ye sahip tamamlanmış şekli döndürür (yoksa `undefined`). */
  getShapeById(id) {
    return this.shapes.get(id);
  }
  /** Verilen id'ye sahip şekli haritadan ve kayıtlardan kaldırır. */
  removeShape(id) {
    const shape = this.shapes.get(id);
    if (!shape) return;
    this.viewer.entities.remove(shape.entity);
    this.shapes.delete(id);
    this.emit("draw:remove", { id, shape });
  }
  /** Tamamlanmış tüm şekilleri haritadan ve kayıtlardan kaldırır. */
  clearAll() {
    for (const id of [...this.shapes.keys()]) this.removeShape(id);
  }
  /** Devam eden çizimde son eklenen vertex'i geri alır. */
  undo() {
    if (this.positions.length === 0) return;
    this.positions.pop();
    const marker = this.tempVertexEntities.pop();
    if (marker) this.viewer.entities.remove(marker);
  }
  /**
   * Tamamlanmış tüm şekilleri tek bir GeoJSON `FeatureCollection`'a dönüştürür.
   *
   * @example
   * ```ts
   * const featureCollection = map.drawingManager.toGeoJSON();
   * ```
   */
  toGeoJSON() {
    return {
      type: "FeatureCollection",
      features: this.getShapes().map((shape) => ({
        type: "Feature",
        properties: { id: shape.id, tool: shape.tool },
        geometry: shape.geometry
      }))
    };
  }
  /** Aktif çizimi kapatır, `ScreenSpaceEventHandler`'ı yok eder ve kayıtlı event dinleyicilerini temizler. */
  destroy() {
    this.deactivate();
    this.handler.destroy();
    this.removeAllListeners();
  }
  // ── Arac baglama ─────────────────────────────────────────────────────────
  bindToolHandlers(tool) {
    this.handler.setInputAction(() => this.deactivate(), cesium.ScreenSpaceEventType.RIGHT_CLICK);
    document.addEventListener("keydown", this.onEscapeKey);
    if (tool === "freehand") {
      this.handler.setInputAction(
        (e) => this.onFreehandDown(e.position),
        cesium.ScreenSpaceEventType.LEFT_DOWN
      );
      this.handler.setInputAction(
        () => this.onFreehandUp(),
        cesium.ScreenSpaceEventType.LEFT_UP
      );
      this.handler.setInputAction(
        (e) => this.onFreehandMove(e.endPosition),
        cesium.ScreenSpaceEventType.MOUSE_MOVE
      );
      return;
    }
    this.handler.setInputAction(
      (e) => this.onVertexClick(e.position),
      cesium.ScreenSpaceEventType.LEFT_CLICK
    );
    this.handler.setInputAction(
      (e) => this.onPreviewMove(e.endPosition),
      cesium.ScreenSpaceEventType.MOUSE_MOVE
    );
    if (tool === "polyline" || tool === "polygon") {
      this.handler.setInputAction(
        () => this.finishMultiVertexViaDoubleClick(),
        cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
      );
    }
  }
  unbindToolHandlers() {
    this.handler.removeInputAction(cesium.ScreenSpaceEventType.LEFT_CLICK);
    this.handler.removeInputAction(cesium.ScreenSpaceEventType.LEFT_DOWN);
    this.handler.removeInputAction(cesium.ScreenSpaceEventType.LEFT_UP);
    this.handler.removeInputAction(cesium.ScreenSpaceEventType.MOUSE_MOVE);
    this.handler.removeInputAction(cesium.ScreenSpaceEventType.RIGHT_CLICK);
    this.handler.removeInputAction(cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
    document.removeEventListener("keydown", this.onEscapeKey);
  }
  // Devam eden (en az 1 vertex'i konmus) cizimi atar; tamamlanmis sekillere ve
  // araç durumuna (handler'lar, kamera/interaction suspend) dokunmaz -- araç
  // hemen yeni bir cizime hazir kalir. Cizim yoksa no-op (Esc aracı kapatmaz).
  abortCurrentShape() {
    if (this.activeTool === void 0 || this.positions.length === 0) return;
    const tool = this.activeTool;
    const source = this.activeSource;
    this.clearTempEntity();
    this.resetSessionForContinuousDrawing();
    this.resetTrackedEntity();
    this.emit("draw:abort", source === void 0 ? { tool } : { tool, source });
  }
  // ── Vertex-tabanli araclar (point/polyline/polygon/rectangle/circle) ──────
  onVertexClick(screenPos) {
    const cartesian = this.toCartesian(screenPos);
    if (cartesian === void 0 || this.activeTool === void 0) return;
    this.positions.push(cartesian);
    this.emitVertex(screenPos);
    this.ensureTempEntity();
    if (this.activeTool === "polygon" || this.activeTool === "polyline") {
      this.addVertexMarker(cartesian);
    }
    if (this.activeTool === "point") {
      this.completeShape();
      return;
    }
    if ((this.activeTool === "rectangle" || this.activeTool === "circle") && this.positions.length >= 2) {
      this.completeShape();
    }
  }
  onPreviewMove(screenPos) {
    if (this.positions.length === 0 || this.activeTool === void 0) return;
    const cartesian = this.toCartesian(screenPos);
    if (cartesian === void 0) return;
    this.previewPosition = cartesian;
    this.emit("draw:move", {
      tool: this.activeTool,
      coordinates: this.toLonLat(cartesian),
      screenPos: { x: screenPos.x, y: screenPos.y }
    });
  }
  finishMultiVertex() {
    const minVertices = this.activeTool === "polygon" ? 3 : 2;
    if (this.positions.length < minVertices) return;
    this.completeShape();
  }
  // Tarayici, cift tiklamada ayni ekran konumunda IKI ayri LEFT_CLICK (+bir
  // LEFT_DOUBLE_CLICK) uretir; onVertexClick() bu yuzden son noktayi iki kez
  // ekler. Bitirmeden once tekrarlanan son vertex'i (double-click'in ikinci
  // click bileseni) dusuruyoruz — aksi halde DrawnShape.coordinates'te
  // yinelenen bir kose olusur (gercek headless testle bulundu/dogrulandi).
  finishMultiVertexViaDoubleClick() {
    if (this.positions.length >= 2) {
      this.positions.pop();
    }
    this.finishMultiVertex();
    this.resetTrackedEntity();
  }
  // ── Freehand ─────────────────────────────────────────────────────────────
  onFreehandDown(screenPos) {
    this.freehandDragging = true;
    this.positions = [];
    const cartesian = this.toCartesian(screenPos);
    if (cartesian === void 0) return;
    this.positions.push(cartesian);
    this.emitVertex(screenPos);
    this.ensureTempEntity();
  }
  onFreehandMove(screenPos) {
    if (!this.freehandDragging || this.activeTool === void 0) return;
    const cartesian = this.toCartesian(screenPos);
    if (cartesian === void 0) return;
    this.positions.push(cartesian);
    this.previewPosition = cartesian;
    this.emit("draw:move", {
      tool: this.activeTool,
      coordinates: this.toLonLat(cartesian),
      screenPos: { x: screenPos.x, y: screenPos.y }
    });
  }
  onFreehandUp() {
    this.freehandDragging = false;
    if (this.positions.length >= 2) this.completeShape();
  }
  // ── Tamamlama ────────────────────────────────────────────────────────────
  emitVertex(screenPos) {
    if (this.activeTool === void 0) return;
    const last = this.requireIndex(this.positions, this.positions.length - 1);
    this.emit("draw:vertex", {
      tool: this.activeTool,
      index: this.positions.length - 1,
      coordinates: this.toLonLat(last),
      screenPos: { x: screenPos.x, y: screenPos.y }
    });
  }
  // Bir sekil tamamlaninca arac KAPANMAZ -- surekli cizim modu: kullanici
  // farkli bir arac secmedikce (activate() eskisini otomatik kapatir) ya da
  // acikca deactivate() cagirmadikca (ör. TucbsDrawTool'da aktif araca
  // tekrar tiklamak) ayni arac hemen yeni bir sekil cizmeye hazir kalir.
  completeShape() {
    if (this.activeTool === void 0 || this.positions.length === 0) return;
    const built = this.buildShape(this.activeTool, this.positions);
    const shape = this.activeSource === void 0 ? built : { ...built, source: this.activeSource };
    this.shapes.set(shape.id, shape);
    this.clearTempEntity();
    this.resetSessionForContinuousDrawing();
    this.emit("draw:complete", { shape });
  }
  // Sadece devam eden cizim OTURUMUNUN durumunu sifirlar -- handler'lar
  // bagli kalir, kamera kilidi/interactionManager suspend durumu KORUNUR
  // (hala cizim modundayiz). Tam kapanis icin bkz. finishSession()/deactivate().
  resetSessionForContinuousDrawing() {
    this.positions = [];
    this.previewPosition = void 0;
    this.freehandDragging = false;
  }
  finishSession() {
    this.unbindToolHandlers();
    this.clearTempEntity();
    this.resetSessionForContinuousDrawing();
    this.activeTool = void 0;
    this.activeSource = void 0;
    this.unlockCamera();
    this.setCursor("default");
    this.resetTrackedEntity();
    this.restoreBuiltInDoubleClick();
    this.interactionManager.resume();
  }
  // ── Gecici onizleme entity'si ────────────────────────────────────────────
  ensureTempEntity() {
    if (this.activeTool === void 0) return;
    if (this.tempEntity === void 0) {
      if (this.activeTool === "point") {
        this.tempEntity = this.viewer.entities.add({
          position: this.requireIndex(this.positions, 0),
          point: { pixelSize: 8, color: cesium.Color.YELLOW }
        });
      } else if (this.activeTool !== "rectangle" && this.activeTool !== "circle") {
        this.tempEntity = this.viewer.entities.add({
          polyline: { positions: this.buildPositionsCallback(2), width: 2, material: cesium.Color.YELLOW }
        });
      }
    }
    if (this.tempFillEntity === void 0) {
      if (this.activeTool === "polygon") {
        this.tempFillEntity = this.viewer.entities.add({
          polygon: {
            hierarchy: new cesium.CallbackProperty(() => {
              const raw = [
                ...this.positions,
                ...this.previewPosition ? [this.previewPosition] : []
              ];
              const deduped = dedupePositions(raw);
              return deduped.length >= 3 ? new cesium.PolygonHierarchy(deduped) : void 0;
            }, false),
            material: cesium.Color.CYAN.withAlpha(0.35)
          }
        });
      } else if (this.activeTool === "rectangle") {
        this.tempFillEntity = this.viewer.entities.add({
          polygon: {
            hierarchy: new cesium.CallbackProperty(() => {
              const first = this.positions[0];
              const second = this.previewPosition;
              if (first === void 0 || second === void 0) return void 0;
              const coordinates = this.computeRectangleCoordinates(first, second);
              return new cesium.PolygonHierarchy(coordinates.map((c) => this.toCartesianFromLonLat(c)));
            }, false),
            material: cesium.Color.CYAN.withAlpha(0.35)
          }
        });
      } else if (this.activeTool === "circle") {
        this.tempFillEntity = this.viewer.entities.add({
          polygon: {
            hierarchy: new cesium.CallbackProperty(() => {
              const center = this.positions[0];
              const edge = this.previewPosition;
              if (center === void 0 || edge === void 0) return void 0;
              const ring = this.computeCircleRing(center, edge);
              return new cesium.PolygonHierarchy(ring.map((c) => this.toCartesianFromLonLat(c)));
            }, false),
            material: cesium.Color.CYAN.withAlpha(0.35)
          }
        });
      }
    }
  }
  // Alan/cizgi cizerken her onaylanan vertex'te kucuk bir nokta isaretcisi
  // ekler -- sadece anahat/dolgu onizlemesiyle "sekil olusturdugum" arasindaki
  // gorsel farki netlestirmek icin (kullanici geri bildirimi, sonradan cizgiye
  // de genisletildi).
  addVertexMarker(position) {
    this.tempVertexEntities.push(
      this.viewer.entities.add({
        position,
        point: { pixelSize: 6, color: cesium.Color.YELLOW, outlineColor: cesium.Color.BLACK, outlineWidth: 1 }
      })
    );
  }
  buildPositionsCallback(minPoints) {
    return new cesium.CallbackProperty(() => {
      const raw = [
        ...this.positions,
        ...this.previewPosition ? [this.previewPosition] : []
      ];
      const deduped = dedupePositions(raw);
      return deduped.length >= minPoints ? deduped : void 0;
    }, false);
  }
  clearTempEntity() {
    if (this.tempEntity !== void 0) {
      this.viewer.entities.remove(this.tempEntity);
      this.tempEntity = void 0;
    }
    if (this.tempFillEntity !== void 0) {
      this.viewer.entities.remove(this.tempFillEntity);
      this.tempFillEntity = void 0;
    }
    for (const marker of this.tempVertexEntities) {
      this.viewer.entities.remove(marker);
    }
    this.tempVertexEntities = [];
  }
  // Cesium'un Viewer sinifi, BIZIM InteractionManager/DrawingManager'imizdan
  // TAMAMEN bagimsiz kendi dahili ScreenSpaceEventHandler'inda KOSULSUZ
  // olarak bir LEFT_DOUBLE_CLICK handler'i (pickAndTrackObject) baglar:
  // cift-tikladiginiz ekran konumu o an position'i olan bir Entity'yi (bizim
  // vertex isaretcilerimiz veya olcum etiketlerimiz gibi) isabet ettirirse
  // viewer.trackedEntity = o_entity atayip kamerayi o entity'yi takip etmeye
  // KILITLIYOR (nokta entity'lerin varsayilan takip kamerasi genelde duz/
  // yataylasmis gorunuyor) -- gercek kullanimda bulundu (bkz
  // project_ucbp_api_olcum_kamera_bug memory). Bu, bizim tamamlama
  // mantigimizdan (finishMultiVertexViaDoubleClick) BAGIMSIZ, ayni fiziksel
  // cift-tikta ayrica tetikleniyor. Duzeltme: trackedEntity'i sessizce geri
  // sifirliyoruz -- kamera takibi ancak render dongusunde (postUpdate/
  // preRender) gorsel etki yapiyor, bu yuzden ayni JS tick'i icinde senkron
  // sifirlamak gorsel bozulmayi hic ortaya cikmadan engelliyor.
  resetTrackedEntity() {
    if (this.viewer.trackedEntity !== void 0) {
      this.viewer.trackedEntity = void 0;
    }
  }
  // Ayni dahili handler, cift-tiklanan entity'nin position'i YOKSA (ör.
  // yuklenmis GeoJSON poligonu) trackedEntity yerine viewer.zoomTo(entity)
  // cagirir; bu varsayilan HeadingPitchRange ile ~45 derece egimli bir ucus
  // baslatir -- vektor veri uzerinde cizimi cift-tikla bitirince harita
  // aniden tilt oluyordu. resetTrackedEntity() bunu yakalayamaz (ucus
  // asenkron), bu yuzden cizim suresince dahili LEFT_DOUBLE_CLICK handler'i
  // kaldirilir, oturum bitince geri konur.
  suspendBuiltInDoubleClick() {
    if (this.builtInDoubleClickAction !== void 0) return;
    const cesiumHandler = this.viewer.screenSpaceEventHandler;
    const action = cesiumHandler.getInputAction(cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
    if (action === void 0) return;
    this.builtInDoubleClickAction = action;
    cesiumHandler.removeInputAction(cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
  }
  restoreBuiltInDoubleClick() {
    if (this.builtInDoubleClickAction === void 0) return;
    this.viewer.screenSpaceEventHandler.setInputAction(
      this.builtInDoubleClickAction,
      cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
    );
    this.builtInDoubleClickAction = void 0;
  }
  // Cizim/olcum suresince imlec crosshair; cikista tekrar standart ok (default).
  setCursor(cursor) {
    this.viewer.scene.canvas.style.cursor = cursor;
  }
  lockCamera() {
    this.viewer.scene.screenSpaceCameraController.enableRotate = false;
    this.viewer.scene.screenSpaceCameraController.enableTilt = false;
  }
  unlockCamera() {
    this.viewer.scene.screenSpaceCameraController.enableRotate = true;
    this.viewer.scene.screenSpaceCameraController.enableTilt = true;
  }
  // ── Geometri hesabi ──────────────────────────────────────────────────────
  buildShape(tool, positions) {
    const id = crypto.randomUUID();
    const createdAt = Date.now();
    if (tool === "point") {
      const first = this.requireIndex(positions, 0);
      const coordinates = this.toLonLat(first);
      return {
        id,
        tool,
        entity: this.viewer.entities.add({
          position: first,
          point: { pixelSize: 8, color: cesium.Color.CYAN }
        }),
        positions,
        coordinates: [coordinates],
        geometry: { type: "Point", coordinates },
        createdAt
      };
    }
    if (tool === "circle") return this.buildCircleShape(id, positions, createdAt);
    if (tool === "rectangle") return this.buildRectangleShape(id, positions, createdAt);
    if (tool === "polygon") return this.buildPolygonShape(id, positions, createdAt);
    return this.buildLineShape(id, tool, positions, createdAt);
  }
  buildLineShape(id, tool, positions, createdAt) {
    const coordinates = positions.map((p) => this.toLonLat(p));
    return {
      id,
      tool,
      entity: this.viewer.entities.add({
        polyline: { positions, width: 3, material: cesium.Color.CYAN }
      }),
      positions,
      coordinates,
      geometry: { type: "LineString", coordinates },
      length: this.computeLength(positions),
      createdAt
    };
  }
  buildPolygonShape(id, positions, createdAt) {
    const coordinates = positions.map((p) => this.toLonLat(p));
    const firstCoordinate = this.requireIndex(coordinates, 0);
    const firstPosition = this.requireIndex(positions, 0);
    const ring = [...coordinates, firstCoordinate];
    return {
      id,
      tool: "polygon",
      entity: this.viewer.entities.add({
        polygon: { hierarchy: positions, material: cesium.Color.CYAN.withAlpha(0.4) }
      }),
      positions,
      coordinates,
      geometry: { type: "Polygon", coordinates: [ring] },
      area: this.computeArea(coordinates),
      perimeter: this.computeLength([...positions, firstPosition]),
      createdAt
    };
  }
  buildRectangleShape(id, positions, createdAt) {
    const p1 = this.requireIndex(positions, 0);
    const p2 = this.requireIndex(positions, 1);
    const coordinates = this.computeRectangleCoordinates(p1, p2);
    const corners = coordinates.map((c) => this.toCartesianFromLonLat(c));
    const firstCorner = this.requireIndex(corners, 0);
    return {
      id,
      tool: "rectangle",
      entity: this.viewer.entities.add({
        polygon: { hierarchy: corners, material: cesium.Color.CYAN.withAlpha(0.4) }
      }),
      positions: corners,
      coordinates,
      geometry: { type: "Polygon", coordinates: [[...coordinates, this.requireIndex(coordinates, 0)]] },
      area: this.computeArea(coordinates),
      perimeter: this.computeLength([...corners, firstCorner]),
      createdAt
    };
  }
  buildCircleShape(id, positions, createdAt) {
    const center = this.requireIndex(positions, 0);
    const edge = this.requireIndex(positions, 1);
    const radius = cesium.Cartesian3.distance(center, edge);
    const ring = this.computeCircleRing(center, edge);
    const corners = ring.map((c) => this.toCartesianFromLonLat(c));
    const firstRingPoint = this.requireIndex(ring, 0);
    return {
      id,
      tool: "circle",
      entity: this.viewer.entities.add({
        polygon: { hierarchy: corners, material: cesium.Color.CYAN.withAlpha(0.4) }
      }),
      positions: [center, edge],
      coordinates: [this.toLonLat(center)],
      geometry: { type: "Polygon", coordinates: [[...ring, firstRingPoint]] },
      area: Math.PI * radius * radius,
      perimeter: 2 * Math.PI * radius,
      radius,
      createdAt
    };
  }
  sampleCircleRing(center, radiusMeters) {
    const ring = [];
    for (let i = 0; i < CIRCLE_SEGMENTS; i++) {
      const angle = 2 * Math.PI * i / CIRCLE_SEGMENTS;
      const dx = radiusMeters * Math.cos(angle);
      const dy = radiusMeters * Math.sin(angle);
      ring.push(this.offsetMetersToLonLat(center, dx, dy));
    }
    return ring;
  }
  // Iki noktadan eksen-hizali dikdortgenin 4 kosesini (lon/lat) hesaplar --
  // hem tamamlanmis sekil (buildRectangleShape) HEM canli onizleme
  // (ensureTempEntity) TEK bu helper'i kullanir (DRY, davranis birebir ayni).
  computeRectangleCoordinates(p1, p2) {
    const c1 = this.toLonLat(p1);
    const c2 = this.toLonLat(p2);
    const west = Math.min(c1[0], c2[0]);
    const east = Math.max(c1[0], c2[0]);
    const south = Math.min(c1[1], c2[1]);
    const north = Math.max(c1[1], c2[1]);
    return [
      [west, south],
      [east, south],
      [east, north],
      [west, north]
    ];
  }
  // Merkez+kenar noktasindan daire cemberini (lon/lat) hesaplar -- hem
  // tamamlanmis sekil (buildCircleShape) HEM canli onizleme
  // (ensureTempEntity) TEK bu helper'i kullanir (DRY, davranis birebir ayni).
  computeCircleRing(center, edge) {
    const radius = cesium.Cartesian3.distance(center, edge);
    const centerLonLat = this.toLonLat(center);
    return this.sampleCircleRing(centerLonLat, radius);
  }
  // Ekvatorel-dikdortgen (equirectangular) izdusum — kucuk/orta olcekli
  // alan/cevre hesaplari icin yeterli dogruluk sağlar (bkz v1 §5, area/perimeter
  // Cartesian3 kirisim mesafesi + bu izdusumle tutarli tutulur).
  computeArea(coordinates) {
    const lat0 = this.requireIndex(coordinates, 0)[1];
    const projected = coordinates.map((c) => this.projectMeters(c, lat0));
    let sum = 0;
    for (let i = 0; i < projected.length; i++) {
      const [x1, y1] = this.requireIndex(projected, i);
      const [x2, y2] = this.requireIndex(projected, (i + 1) % projected.length);
      sum += x1 * y2 - x2 * y1;
    }
    return Math.abs(sum) / 2;
  }
  computeLength(positions) {
    let total = 0;
    for (let i = 0; i < positions.length - 1; i++) {
      total += cesium.Cartesian3.distance(
        this.requireIndex(positions, i),
        this.requireIndex(positions, i + 1)
      );
    }
    return total;
  }
  projectMeters(coordinate, lat0) {
    const x = cesium.Math.toRadians(coordinate[0]) * Math.cos(cesium.Math.toRadians(lat0)) * EARTH_RADIUS_METERS;
    const y = cesium.Math.toRadians(coordinate[1]) * EARTH_RADIUS_METERS;
    return [x, y];
  }
  offsetMetersToLonLat(center, dx, dy) {
    const lat = center[1] + cesium.Math.toDegrees(dy / EARTH_RADIUS_METERS);
    const lon = center[0] + cesium.Math.toDegrees(
      dx / (EARTH_RADIUS_METERS * Math.cos(cesium.Math.toRadians(center[1])))
    );
    return [lon, lat];
  }
  toCartesianFromLonLat(coordinate) {
    return cesium.Cartesian3.fromDegrees(coordinate[0], coordinate[1]);
  }
  toCartesian(screenPos) {
    return this.viewer.camera.pickEllipsoid(screenPos, this.scene.globe.ellipsoid);
  }
  toLonLat(cartesian) {
    const cartographic = cesium.Cartographic.fromCartesian(cartesian);
    return [
      cesium.Math.toDegrees(cartographic.longitude),
      cesium.Math.toDegrees(cartographic.latitude)
    ];
  }
  // noUncheckedIndexedAccess altinda dizi erisimini daralt (narrow) eder —
  // yalnizca uzunluk zaten dogrulanmis dizilerde cagrilir.
  requireIndex(items, index) {
    const value = items[index];
    if (value === void 0) {
      throw new TucbsError(
        "INTERNAL_INDEX_OUT_OF_RANGE",
        `DrawingManager: beklenen index (${index}) dizide bulunamadi`
      );
    }
    return value;
  }
}
function trimSlash$1(url) {
  return url.replace(/\/+$/, "");
}
function newClientId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return "00000000-0000-0000-0000-000000000001";
}
class AnalysisManager {
  /** @param options - Başlangıç `apiKey`/`clientId` değerleri. */
  constructor(options) {
    __privateAdd(this, _AnalysisManager_instances);
    __privateAdd(this, _apiKey2);
    __privateSet(this, _apiKey2, options.apiKey ?? "");
    this.clientId = options.clientId ?? newClientId();
  }
  /** `apiKey`/`clientId`'yi günceller (verilmeyen alanlar değişmeden kalır). */
  configure(options) {
    if (options.apiKey !== void 0) __privateSet(this, _apiKey2, options.apiKey);
    if (options.clientId !== void 0) this.clientId = options.clientId;
  }
  /** `apiKey` ve backend adresinin (`getUcbpApiBase()`) ikisinin de dolu olup olmadığı. */
  get configured() {
    return Boolean(getUcbpApiBase() && __privateGet(this, _apiKey2));
  }
  /**
   * Tampon analizi: backend'e istek atar, sonuç GeoJSON'unu döndürür.
   * @throws {AnalysisRequestError} apiKey eksikse, ağ hatası olursa veya backend başarısız/eksik yanıt dönerse.
   *
   * @example
   * ```ts
   * const result = await map.analysisManager.buffer({
   *   geojson: someGeoJsonGeometry,
   *   distanceM: 500,
   * });
   * console.log(result.geojson);
   * ```
   * Not: `Map.runBuffer()` bu çağrıyı sarıp sonucu doğrudan bir `ManagedLayer`
   * olarak haritaya ekleyen daha üst-seviye bir kısayoldur.
   */
  async buffer(request) {
    return __privateMethod(this, _AnalysisManager_instances, post_fn).call(this, "/vector/buffer", request);
  }
  /**
   * Kesişim analizi: backend'e istek atar, sonuç GeoJSON'unu döndürür.
   * @throws {AnalysisRequestError} apiKey eksikse, ağ hatası olursa veya backend başarısız/eksik yanıt dönerse.
   *
   * @example
   * ```ts
   * const result = await map.analysisManager.intersection({
   *   geojsonA: someGeoJsonGeometryA,
   *   geojsonB: someGeoJsonGeometryB,
   * });
   * console.log(result.geojson);
   * ```
   */
  async intersection(request) {
    return __privateMethod(this, _AnalysisManager_instances, post_fn).call(this, "/vector/intersection", request);
  }
  /** Sınırlayıcı kutu veya dışbükey zarf. */
  async boundary(request) {
    return __privateMethod(this, _AnalysisManager_instances, post_fn).call(this, "/vector/boundary", request);
  }
  /** Kaynağı ikinci geometriyle kırpar. */
  async clip(request) {
    return __privateMethod(this, _AnalysisManager_instances, post_fn).call(this, "/vector/clip", request);
  }
  /** İkinci poligonu birinciden çıkarır. */
  async difference(request) {
    return __privateMethod(this, _AnalysisManager_instances, post_fn).call(this, "/vector/difference", request);
  }
  /** Örtüşen parçayı kaynaktan siler. */
  async subtract(request) {
    return __privateMethod(this, _AnalysisManager_instances, post_fn).call(this, "/vector/subtract", request);
  }
  /** İki poligonu tek alana eritir. */
  async union(request) {
    return __privateMethod(this, _AnalysisManager_instances, post_fn).call(this, "/vector/union", request);
  }
  /** Nokta etrafında açı dilimi. */
  async wedgeBuffer(request) {
    return __privateMethod(this, _AnalysisManager_instances, post_fn).call(this, "/vector/wedge-buffer", request);
  }
}
_apiKey2 = new WeakMap();
_AnalysisManager_instances = new WeakSet();
post_fn = async function(path, request) {
  if (!__privateGet(this, _apiKey2)) {
    throw new AnalysisRequestError("ANALYSIS_API_KEY_MISSING", "apiKey tanımlı değil (tucbs-map apiKey).");
  }
  const body = {
    clientId: this.clientId,
    object: request
  };
  const url = `${trimSlash$1(getUcbpApiBase())}${path}`;
  let response;
  try {
    response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": __privateGet(this, _apiKey2)
      },
      body: JSON.stringify(body)
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    throw new AnalysisRequestError("ANALYSIS_NETWORK_ERROR", `Ağ hatası: ${msg}`);
  }
  const data = await response.json().catch(() => null);
  if (!response.ok) {
    const msg = (data == null ? void 0 : data.mesaj) || (data == null ? void 0 : data.message) || `İstek başarısız (HTTP ${response.status})`;
    throw new AnalysisRequestError("ANALYSIS_REQUEST_FAILED", msg);
  }
  if ((data == null ? void 0 : data.isSuccess) === false || (data == null ? void 0 : data.success) === false) {
    throw new AnalysisRequestError("ANALYSIS_UNSUCCESSFUL", data.mesaj || data.message || "Analiz başarısız.");
  }
  const result = data == null ? void 0 : data.object;
  if (!(result == null ? void 0 : result.geojson)) {
    throw new AnalysisRequestError("ANALYSIS_RESPONSE_MISSING_GEOJSON", "Yanıtta geojson yok.");
  }
  return result;
};
const FALLBACK_IMAGE_FILENAME = "blue-marble-fallback.jpg";
const FALLBACK_WORLD_IMAGE = new URL(
  FALLBACK_IMAGE_FILENAME,
  typeof document === "undefined" ? require("url").pathToFileURL(__filename).href : _documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === "SCRIPT" && _documentCurrentScript.src || new URL("tucbs-core.cjs", document.baseURI).href
).href;
const FALLBACK_DELAY_MS = 3e3;
const BASEMAP_ERROR_RETRY_LIMIT = 2;
const BASEMAP_UNAVAILABLE_DELAY_MS = 1e4;
function watchBasemap(viewer, deps, generation, basemapId, imageryLayer, provider) {
  let handled = false;
  let stopped = false;
  const fallbackTimer = window.setTimeout(() => {
    if (handled || !deps.isCurrentGeneration(generation)) return;
    deps.ensureFallbackBasemap();
  }, FALLBACK_DELAY_MS);
  const unavailableTimer = window.setTimeout(() => {
    if (handled || !deps.isCurrentGeneration(generation)) return;
    handled = true;
    stopWatching();
    deps.setStatus("unavailable");
    deps.removeBasemapLayer();
    deps.ensureFallbackBasemap();
    deps.emit("basemap:error", { id: basemapId });
  }, BASEMAP_UNAVAILABLE_DELAY_MS);
  const stopWatching = () => {
    stopped = true;
    window.clearTimeout(fallbackTimer);
    window.clearTimeout(unavailableTimer);
    provider.errorEvent.removeEventListener(onError);
  };
  const onError = (error) => {
    if (handled) return;
    if (!deps.isCurrentGeneration(generation)) return;
    if (!viewer.imageryLayers.contains(imageryLayer)) return;
    if (error.timesRetried < BASEMAP_ERROR_RETRY_LIMIT) {
      error.retry = true;
      return;
    }
    handled = true;
    stopWatching();
    deps.setStatus("unavailable");
    deps.removeBasemapLayer();
    deps.ensureFallbackBasemap();
    deps.emit("basemap:error", { id: basemapId });
  };
  const requestImage = provider.requestImage.bind(provider);
  provider.requestImage = (x, y, level, request) => {
    const result = requestImage(x, y, level, request);
    if (result && !handled && !stopped) result.then(onTileLoaded, () => void 0);
    return result;
  };
  const onTileLoaded = () => {
    if (handled || stopped) return;
    if (!deps.isCurrentGeneration(generation)) {
      stopWatching();
      return;
    }
    handled = true;
    stopWatching();
    deps.setStatus("ready");
    deps.clearFallbackBasemap();
    deps.emit("basemap:recovered", { id: basemapId });
  };
  provider.errorEvent.addEventListener(onError);
  return stopWatching;
}
const BASEMAP_LAYER_ID = "__tucbs_basemap__";
function trackProviderRequests(provider) {
  const pending = /* @__PURE__ */ new Set();
  const requestImage = provider.requestImage.bind(provider);
  provider.requestImage = (x, y, level, request) => {
    if (request) pending.add(request);
    const result = requestImage(x, y, level, request);
    if (request && result) {
      const done = () => {
        pending.delete(request);
      };
      result.then(done, done);
    }
    return result;
  };
  return () => {
    for (const request of pending) request.cancel();
    pending.clear();
  };
}
class BasemapController {
  constructor(viewer, deps) {
    this._basemapGeneration = 0;
    this._basemapStatus = "ready";
    this._fallbackBasemapLayer = null;
    this.viewer = viewer;
    this.deps = deps;
  }
  /** Altlık haritanın yükleme durumu (`"loading"`/`"ready"`/`"unavailable"`). */
  get status() {
    return this._basemapStatus;
  }
  /** ML-03: apiKey rotasyonu sonrasi mevcut altligi yeniden kurmak icin Map'e gerekli. */
  get currentBasemapId() {
    return this._currentBasemapId;
  }
  set(basemap) {
    var _a2, _b;
    (_a2 = this._stopBasemapWatch) == null ? void 0 : _a2.call(this);
    (_b = this._cancelBasemapRequests) == null ? void 0 : _b.call(this);
    this._cancelBasemapRequests = void 0;
    this.deps.removeBasemapLayers();
    this.clearFallbackBasemap();
    const generation = ++this._basemapGeneration;
    if (basemap === null || basemap === void 0) {
      this._basemapStatus = "ready";
      this._currentBasemapId = void 0;
      return;
    }
    const resolved = typeof basemap === "string" ? { id: basemap } : basemap;
    if (!resolved.id) {
      this._basemapStatus = "ready";
      this._currentBasemapId = void 0;
      return;
    }
    this._basemapStatus = "loading";
    this._currentBasemapId = resolved.id;
    const tileUrl = this.resolveBasemapUrl(resolved);
    const provider = new cesium.UrlTemplateImageryProvider({ url: tileUrl });
    const cancelRequests = trackProviderRequests(provider);
    this._cancelBasemapRequests = cancelRequests;
    const imageryLayer = this.viewer.imageryLayers.addImageryProvider(
      provider,
      0
    );
    this.deps.addBasemapImageryLayer(BASEMAP_LAYER_ID, resolved.id, imageryLayer);
    this._stopBasemapWatch = watchBasemap(
      this.viewer,
      {
        ensureFallbackBasemap: () => this.ensureFallbackBasemap(),
        clearFallbackBasemap: () => this.clearFallbackBasemap(),
        removeBasemapLayer: () => {
          cancelRequests();
          this.deps.removeLayer(BASEMAP_LAYER_ID);
        },
        emit: (event, payload) => this.deps.emit(event, payload),
        setStatus: (status) => {
          this._basemapStatus = status;
        },
        isCurrentGeneration: (gen) => gen === this._basemapGeneration
      },
      generation,
      resolved.id,
      imageryLayer,
      provider
    );
  }
  // ML-02: basemap izleyicisi durdurulmazsa, harita bu zamanlayicilar
  // dolmadan (bkz BASEMAP_UNAVAILABLE_DELAY_MS) yok edilirse unavailableTimer
  // tetiklenip yok edilmis viewer'a dokunur ve Cesium "This object was
  // destroyed" hatasi firlatir -- Map.destroy() bunu cagirir.
  stop() {
    var _a2, _b;
    (_a2 = this._stopBasemapWatch) == null ? void 0 : _a2.call(this);
    (_b = this._cancelBasemapRequests) == null ? void 0 : _b.call(this);
    this._cancelBasemapRequests = void 0;
  }
  // Paket icine gomulu, tum globe'u kaplayan gercek bir dunya goruntusunu
  // (NASA "Blue Marble", bkz FallbackWorldImagery.ts) TEK bir statik resim
  // olarak gercek katmanin ALTINA (index 0) ekler -- ag istegi icermez
  // (data URI), boylece HGM'in tile'lari geldikce ustunu kapatir; hic
  // gelmezse (dis servis kesintisi) goruntude kalir. UCUNCU TARAF bir tile
  // servisine (OSM/CARTO vb.) SESSIZCE fallback YAPILMAZ -- bu urun
  // kurumlara API olarak entegre edildigi icin (ticari/kurumsal yeniden
  // dagitim) hem OSM'in (operations.osmfoundation.org/policies/tiles) hem
  // CARTO'nun (carto.com/legal/basemap-terms) kullanim sartlari boyle bir
  // kullanimi yasakliyor/ayri ticari lisans gerektiriyor -- bkz proje
  // gecmisi. NASA icerikleri ABD federal hukumet uretimi olarak telife
  // tabi DEGIL (bkz FallbackWorldImagery.ts), sadece kaynak belirtme
  // (credit) bekleniyor. SADECE watchBasemap()'teki FALLBACK_DELAY_MS
  // zamanlayicisi (HGM'den zamaninda yanit gelmedi) veya onError (HGM
  // acikca basarisiz oldu) cagirir -- ensureFallbackBasemap() SARMALAYICISI
  // KULLANILMADAN dogrudan cagrilmamali (idempotent degil, ikinci
  // cagrida katmani ikiye katlar).
  addFallbackBasemap() {
    const fallbackProvider = new cesium.SingleTileImageryProvider({
      url: FALLBACK_WORLD_IMAGE,
      tileWidth: 5400,
      tileHeight: 2700,
      credit: "NASA Earth Observatory (Blue Marble)"
    });
    const fallbackLayer = this.viewer.imageryLayers.addImageryProvider(
      fallbackProvider,
      0
    );
    this._fallbackBasemapLayer = fallbackLayer;
  }
  // addFallbackBasemap()'in idempotent sarmalayicisi -- zaten gosteriliyorsa
  // ikinci bir katman EKLEMEZ. Yedegin KENDISINDEKI olasi bir hata (ör.
  // Cesium surum farkindan kaynakli bir yapici hatasi -- bkz bu sorunun daha
  // once tam da bu sekilde yasandigi proje gecmisi) cagiran tarafi
  // (zamanlayici veya onError) ASLA etkilememeli, o yuzden try/catch burada.
  //
  // NOT (basemap:error BURADA EMIT EDILMEZ): eskiden bu metod hem yedek
  // gorseli eklerdi HEM DE "basemap:error"i yayardi -- ama bu, SADECE
  // beklenen surede yanit gelmedigi (bkz FALLBACK_DELAY_MS, watchBasemap
  // path 0) durumda bile tuketiciye (TucbsBasemapPicker) aninda "erisilemiyor"
  // banner'i + secim grid'i devre disi gosterecek sekilde yanlis-pozitif
  // uretiyordu: altlik haritalar arasinda HIZLICA gezinirken HGM bazen
  // sadece YAVAS yanit veriyor (gercekten kesinti YOK, kullanici bildirimi:
  // "HGM'e normalde erisebiliyorum ama gezinirken bir anda uyari geldi, ne
  // alaka") -- 3sn icinde gelmemesi "kalici basarisizlik" ANLAMINA GELMEZ,
  // sadece "kullaniciyi bombos globe ile birakmamak icin gecici bir gorsel
  // goster" anlamina gelir. Bu yuzden "basemap:error" ARTIK SADECE gercekten
  // KESIN basarisizlik anlasilan tek yerden (onError, retry hakki da
  // tukendikten SONRA) yayilir -- bkz watchBasemap.
  ensureFallbackBasemap() {
    if (this._fallbackBasemapLayer !== null) return;
    try {
      this.addFallbackBasemap();
    } catch (error) {
      console.warn("[tucbs-core] Basemap yedek goruntusu eklenemedi:", error);
    }
  }
  clearFallbackBasemap() {
    if (this._fallbackBasemapLayer !== null) {
      this.viewer.imageryLayers.remove(this._fallbackBasemapLayer, true);
      this._fallbackBasemapLayer = null;
    }
  }
  /**
   * HGM altlık şablonu: proxyservice getByUrl. Cesium header taşımaz;
   * apiKey varsa kardeş query {@code tucbsapikey} (tile başına DB yok, proxy cache).
   * Kapı: `deps.getProxyBase()` (main.js `configureTucbs({ proxyBase })`, yoksa derleme yedeği).
   */
  resolveBasemapUrl(basemap) {
    const proxied = (path) => {
      const proxyBase = this.deps.getProxyBase();
      const tile = `${proxyBase}${"https://atlas.harita.gov.tr"}/${path}/{z}/{x}/{y}.png`;
      return this.appendTucbsApiKeyQuery(tile);
    };
    switch (basemap.id) {
      case "hgm-temel":
        return proxied("temel");
      case "hgm-ortofoto":
        return proxied("ortofotoservis");
      case "hgm-siyasi":
        return proxied("siyasi");
      case "hgm-yukseklik":
        return proxied("yukseklik");
      default:
        return basemap.id;
    }
  }
  /** getByUrl {@code url} paramına karışmadan tucbsapikey ekler; yoksa URL aynı. */
  appendTucbsApiKeyQuery(url) {
    const apiKey = this.deps.getApiKey();
    if (!apiKey) {
      return url;
    }
    const sep = url.includes("?") ? "&" : "?";
    return `${url}${sep}tucbsapikey=${encodeURIComponent(apiKey)}`;
  }
}
function nextFrame(viewer) {
  return new Promise((resolve) => {
    const callback = () => {
      viewer.scene.postRender.removeEventListener(callback);
      resolve();
    };
    viewer.scene.postRender.addEventListener(callback);
    viewer.scene.requestRender();
  });
}
async function captureCanvasBlob(viewer, mimeType, quality) {
  const canvas = viewer.canvas;
  if (typeof canvas.toBlob === "function") {
    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => blob ? resolve(blob) : reject(new Error("canvas.toBlob basarisiz oldu")),
        mimeType,
        quality
      );
    });
  }
  const dataUrl = canvas.toDataURL(mimeType, quality);
  const base64 = dataUrl.split(",")[1] ?? "";
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new Blob([bytes], { type: mimeType });
}
function measureGroundMetersPerPixel(viewer) {
  const scene = viewer.scene;
  const camera = viewer.camera;
  const canvas = viewer.canvas;
  const centerX = canvas.clientWidth / 2;
  const centerY = canvas.clientHeight / 2;
  const leftRay = camera.getPickRay(new cesium.Cartesian2(centerX - 1, centerY));
  const rightRay = camera.getPickRay(new cesium.Cartesian2(centerX + 1, centerY));
  if (!leftRay || !rightRay) return null;
  const leftPoint = scene.globe.pick(leftRay, scene);
  const rightPoint = scene.globe.pick(rightRay, scene);
  if (!leftPoint || !rightPoint) return null;
  return cesium.Cartesian3.distance(leftPoint, rightPoint) / 2;
}
function toOrientedDestination(cameraOptions) {
  return {
    destination: cesium.Cartesian3.fromDegrees(
      cameraOptions.longitude,
      cameraOptions.latitude,
      cameraOptions.height
    ),
    orientation: {
      heading: cesium.Math.toRadians(cameraOptions.heading ?? 0),
      pitch: cesium.Math.toRadians(cameraOptions.pitch ?? -90),
      roll: cesium.Math.toRadians(cameraOptions.roll ?? 0)
    }
  };
}
function setView(viewer, cameraOptions) {
  viewer.camera.setView(toOrientedDestination(cameraOptions));
}
function setExtent(viewer, extent) {
  viewer.camera.setView({
    destination: cesium.Rectangle.fromDegrees(
      extent.west,
      extent.south,
      extent.east,
      extent.north
    )
  });
}
function flyTo(viewer, cameraOptions) {
  viewer.camera.flyTo(toOrientedDestination(cameraOptions));
}
function zoomTo(viewer, longitude, latitude, height) {
  viewer.camera.setView({
    destination: cesium.Cartesian3.fromDegrees(longitude, latitude, height)
  });
}
async function zoomToLayer(viewer, layer) {
  return viewer.zoomTo(
    layer.cesiumObject,
    new cesium.HeadingPitchRange(0, -cesium.Math.PI_OVER_TWO, 0)
  );
}
function trimSlash(url) {
  return url.replace(/\/+$/, "");
}
async function validateApiKey(apiKey, apiBase = getUcbpApiBase()) {
  if (!apiKey) {
    return;
  }
  const url = `${trimSlash(apiBase)}/auth/validate`;
  let response;
  try {
    response = await fetch(url, {
      method: "GET",
      headers: {
        "X-API-Key": apiKey
      }
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    throw new ApiKeyValidationError(msg);
  }
  if (!response.ok) {
    let title;
    let message;
    let reason;
    let detail;
    try {
      const data = await response.json();
      title = data.title;
      message = data.message || data.mesaj;
      reason = data.reason;
      detail = data.detail;
    } catch {
    }
    const opts = {};
    if (title !== void 0) opts.title = title;
    if (reason !== void 0) opts.reason = reason;
    if (detail !== void 0) opts.detail = detail;
    throw new ApiKeyValidationError(
      message || `HTTP ${response.status}`,
      opts
    );
  }
}
async function ensureEffectiveApiKeyValid(instanceApiKey, apiBase) {
  const effectiveKey = instanceApiKey || getGlobalApiKey();
  if (!effectiveKey) {
    throw new ApiKeyValidationError(
      "Haritayı görüntülemek için geçerli bir apiKey gereklidir.",
      { title: "API Anahtarı Eksik", reason: "missing-key", code: "API_KEY_MISSING" }
    );
  }
  await validateApiKey(effectiveKey, apiBase);
}
const DRAWING_LAYER_ID = "__tucbs_drawing_layer__";
const DRAWING_LAYER_TITLE = "Çizim Katmanı";
const MEASURE_LAYER_ID = "__tucbs_measure_layer__";
const MEASURE_LAYER_TITLE = "Ölçü Katmanı";
const MAX_ZOOM_DISTANCE_METERS = 25e6;
const MAX_ZOOM_OUT_SCALE_DENOMINATOR = 25e6;
const MAX_ZOOM_SCALE_DENOMINATOR = 100;
const MIN_ZOOM_DISTANCE_METERS = 10;
const DEFAULT_INITIAL_EXTENT = {
  west: 22.94,
  south: 34.05,
  east: 47.39,
  north: 42.7
};
let Map$1 = (_a = class {
  /**
   * @param container - Haritanın oluşturulacağı DOM elementi veya id'si.
   * @param options - Başlangıç harita seçenekleri.
   *
   * @example
   * ```ts
   * const map = new Map(document.getElementById("map-container")!, {
   *   basemap: "hgm-temel",
   *   apiKey: "YOUR_API_KEY",
   *   camera: { longitude: 32.85, latitude: 39.93, height: 500000 },
   * });
   * ```
   */
  constructor(container, options = {}) {
    // (4b) Sadece bu Map'in apiKey'i GLOBAL config'e bagimliysa (options.apiKey
    // verilmediyse) dolu -- configureTucbs() sonradan farkli bir degerle
    // tekrar cagrilirsa bu instance'i canli guncellemek icin kullanilir (bkz
    // project_ucbp_api_configuretucbs_4risk_kapatma_arastirma). destroy()
    // icinde cagrilmali, aksi halde registry'de sonsuza dek tutulur.
    __privateAdd(this, _unregisterApiKeyRefresh);
    __privateAdd(this, _removeLodSeamGuard);
    __privateAdd(this, _removeMinZoomScale);
    __privateAdd(this, _removeScaleWheelZoom);
    __privateAdd(this, _apiKey3);
    const hiddenCreditContainer = document.createElement("div");
    hiddenCreditContainer.style.display = "none";
    this.viewer = new cesium.Viewer(
      container,
      this.buildViewerOptions(options, hiddenCreditContainer)
    );
    this.viewer.scene.globe.baseColor = cesium.Color.fromCssColorString("#a3c6e0");
    this.viewer.scene.screenSpaceCameraController.maximumZoomDistance = MAX_ZOOM_DISTANCE_METERS;
    this.viewer.scene.screenSpaceCameraController.minimumZoomDistance = MIN_ZOOM_DISTANCE_METERS;
    const effectiveApiKey = options.apiKey ?? getGlobalApiKey();
    __privateSet(this, _apiKey3, effectiveApiKey);
    this.layerManager = new LayerManager(this.viewer);
    this.selectionHighlight = new SelectionHighlight(this.viewer);
    this.layerManager.configure({
      ...effectiveApiKey !== void 0 && { apiKey: effectiveApiKey },
      ...options.trustedApiKeyHosts !== void 0 && {
        trustedApiKeyHosts: options.trustedApiKeyHosts
      },
      ...options.apiKeyDiscoveryUrl !== void 0 && {
        apiKeyDiscoveryUrl: options.apiKeyDiscoveryUrl
      }
    });
    this.interactionManager = new InteractionManager(this.viewer);
    this.drawingManager = new DrawingManager(
      this.viewer,
      this.interactionManager
    );
    this.analysisManager = new AnalysisManager({
      apiKey: effectiveApiKey ?? ""
    });
    this.basemapController = new BasemapController(this.viewer, {
      removeBasemapLayers: () => this.layerManager._removeBasemapLayers(),
      addBasemapImageryLayer: (id, basemapId, layer) => this.layerManager._addBasemapImageryLayer(id, basemapId, layer),
      removeLayer: (id) => this.layerManager.removeLayer(id),
      emit: (event, payload) => this.layerManager.emit(event, payload),
      getProxyBase: () => getProxyBase(),
      getApiKey: () => __privateGet(this, _apiKey3)
    });
    if (options.apiKey === void 0) {
      this.registerGlobalApiKeyRotation(effectiveApiKey);
    }
    this.wireShapeSource(
      "draw",
      DRAWING_LAYER_ID,
      DRAWING_LAYER_TITLE,
      (id, title, shape) => this.layerManager._addDrawnShape(id, title, shape)
    );
    this.wireShapeSource(
      "measure",
      MEASURE_LAYER_ID,
      MEASURE_LAYER_TITLE,
      (id, title, shape) => this.layerManager._addMeasuredShape(id, title, shape)
    );
    if (options.camera !== void 0) {
      this.setView(options.camera);
    } else {
      this.setExtent(options.initialExtent ?? DEFAULT_INITIAL_EXTENT);
    }
    __privateSet(this, _removeLodSeamGuard, installLodSeamGuard(this.viewer));
    __privateSet(this, _removeMinZoomScale, installMinZoomScale(
      this.viewer,
      MAX_ZOOM_SCALE_DENOMINATOR,
      MAX_ZOOM_OUT_SCALE_DENOMINATOR
    ));
    __privateSet(this, _removeScaleWheelZoom, installScaleWheelZoom(this.viewer));
    this.setBasemap(options.basemap);
  }
  /**
   * apiKey varsa GET /auth/validate (core auth). Yoksa no-op.
   * Geçersizse throw — TucbsMap ready yerine error event basar.
   *
   * @example
   * ```ts
   * try {
   *   await map.ensureApiKeyValid();
   * } catch (err) {
   *   console.error("ApiKey geçersiz:", err);
   * }
   * ```
   */
  async ensureApiKeyValid() {
    await validateApiKey(__privateGet(this, _apiKey3) ?? "", getUcbpApiBase());
  }
  /**
   * Tampon analizi: AnalysisManager → backend → sonuç GEOJSON katmanı.
   *
   * @example
   * ```ts
   * const layer = await map.runBuffer({
   *   geojson: sourceFeature,
   *   distanceM: 500,
   * });
   * console.log("Tampon katmanı eklendi:", layer.id);
   * ```
   */
  async runBuffer(request, layerOpts) {
    const result = await this.analysisManager.buffer(request);
    const id = (layerOpts == null ? void 0 : layerOpts.id) ?? `buffer-${Date.now()}`;
    const title = (layerOpts == null ? void 0 : layerOpts.title) ?? `Tampon sonucu (${request.distanceM}m)`;
    this.layerManager.markAnalysisResult(id);
    const layer = await this.layerManager.add("GEOJSON", {
      id,
      title,
      data: result.geojson,
      layerType: "GEOJSON",
      clampToGround: true
    });
    return layer;
  }
  /**
   * Kesişim analizi: AnalysisManager → backend → sonuç GEOJSON katmanı.
   *
   * @example
   * ```ts
   * const layer = await map.runIntersection({
   *   geojsonA: featureA,
   *   geojsonB: featureB,
   * });
   * console.log("Kesişim katmanı eklendi:", layer.id);
   * ```
   */
  async runIntersection(request, layerOpts) {
    const result = await this.analysisManager.intersection(request);
    const id = (layerOpts == null ? void 0 : layerOpts.id) ?? `intersection-${Date.now()}`;
    const title = (layerOpts == null ? void 0 : layerOpts.title) ?? "Kesişim sonucu";
    this.layerManager.markAnalysisResult(id);
    const layer = await this.layerManager.add("GEOJSON", {
      id,
      title,
      data: result.geojson,
      layerType: "GEOJSON",
      clampToGround: true
    });
    return layer;
  }
  /** Sınır analizi: worker geometrisini olduğu gibi katmana yazar. */
  async runBoundary(request, layerOpts) {
    const result = await this.analysisManager.boundary(request);
    return this.addAnalysisGeoJson(
      (layerOpts == null ? void 0 : layerOpts.id) ?? `boundary-${Date.now()}`,
      (layerOpts == null ? void 0 : layerOpts.title) ?? "Sınır sonucu",
      result.geojson
    );
  }
  /** Kırpma: kaynak ve maske. */
  async runClip(request, layerOpts) {
    const result = await this.analysisManager.clip(request);
    return this.addAnalysisGeoJson(
      (layerOpts == null ? void 0 : layerOpts.id) ?? `clip-${Date.now()}`,
      (layerOpts == null ? void 0 : layerOpts.title) ?? "Kırpma sonucu",
      result.geojson
    );
  }
  /** Fark: ikinci poligon birinciden çıkarılır. */
  async runDifference(request, layerOpts) {
    const result = await this.analysisManager.difference(request);
    return this.addAnalysisGeoJson(
      (layerOpts == null ? void 0 : layerOpts.id) ?? `difference-${Date.now()}`,
      (layerOpts == null ? void 0 : layerOpts.title) ?? "Fark sonucu",
      result.geojson
    );
  }
  /** Çıkarma: örtüşen parça kaynaktan silinir. */
  async runSubtract(request, layerOpts) {
    const result = await this.analysisManager.subtract(request);
    return this.addAnalysisGeoJson(
      (layerOpts == null ? void 0 : layerOpts.id) ?? `subtract-${Date.now()}`,
      (layerOpts == null ? void 0 : layerOpts.title) ?? "Çıkarma sonucu",
      result.geojson
    );
  }
  /** Birleştir: iki poligon tek alan olur. */
  async runUnion(request, layerOpts) {
    const result = await this.analysisManager.union(request);
    return this.addAnalysisGeoJson(
      (layerOpts == null ? void 0 : layerOpts.id) ?? `union-${Date.now()}`,
      (layerOpts == null ? void 0 : layerOpts.title) ?? "Birleştir sonucu",
      result.geojson
    );
  }
  /** Kama tampon: açı dilimini katmana yazar. */
  async runWedgeBuffer(request, layerOpts) {
    const result = await this.analysisManager.wedgeBuffer(request);
    return this.addAnalysisGeoJson(
      (layerOpts == null ? void 0 : layerOpts.id) ?? `wedge-${Date.now()}`,
      (layerOpts == null ? void 0 : layerOpts.title) ?? "Kama tampon sonucu",
      result.geojson
    );
  }
  /** Analiz GeoJSON'unu clamp'li katman olarak ekler. */
  async addAnalysisGeoJson(id, title, geojson) {
    this.layerManager.markAnalysisResult(id);
    return this.layerManager.add("GEOJSON", {
      id,
      title,
      data: geojson,
      layerType: "GEOJSON",
      clampToGround: true
    });
  }
  // ── Kamera ───────────────────────────────────────────────────────────────
  /**
   * Kamerayı verilen konum/açıya anında (uçuş animasyonu olmadan) ayarlar.
   *
   * @example
   * ```ts
   * map.setView({ longitude: 32.85, latitude: 39.93, height: 500000 });
   * ```
   */
  setView(cameraOptions) {
    setView(this.viewer, cameraOptions);
  }
  /**
   * Nokta yerine bir bölgeyi (ör. Türkiye sınırı) ekrana sığacak şekilde ortalar.
   *
   * @example
   * ```ts
   * map.setExtent({ west: 26, south: 36, east: 45, north: 42 });
   * ```
   */
  setExtent(extent) {
    setExtent(this.viewer, extent);
  }
  /**
   * Kamerayı verilen konum/açıya uçuş animasyonuyla götürür.
   *
   * @example
   * ```ts
   * map.flyTo({ longitude: 28.97, latitude: 41.01, height: 20000 });
   * ```
   */
  flyTo(cameraOptions) {
    flyTo(this.viewer, cameraOptions);
  }
  /**
   * Kamerayı verilen coğrafi konuma (varsayılan yönle) anında ayarlar.
   *
   * @example
   * ```ts
   * map.zoomTo(35.0, 39.0, 1000000);
   * ```
   */
  zoomTo(longitude, latitude, height) {
    zoomTo(this.viewer, longitude, latitude, height);
  }
  /** Kamerayı bir sonraki olcek basamağına (ör. 1/5.000 → 1/2.500) animasyonlu yaklaştırır; fare tekerleğinin bir çentiğiyle aynıdır. */
  zoomInStep() {
    scaleZoomStep(this.viewer, 1);
  }
  /** Kamerayı bir sonraki olcek basamağına (ör. 1/2.500 → 1/5.000) animasyonlu uzaklaştırır; fare tekerleğinin bir çentiğiyle aynıdır. */
  zoomOutStep() {
    scaleZoomStep(this.viewer, -1);
  }
  /** Kamerayı verilen katmanın kapsama alanına (extent'ine) top-down yaklaştırır. */
  async zoomToLayer(layer) {
    return zoomToLayer(this.viewer, layer);
  }
  // ── Marker ───────────────────────────────────────────────────────────────
  /**
   * Verilen konuma tekil bir ikon marker'ı ekler; önceki marker (varsa) kaldırılır.
   * @param longitude - Boylam (derece).
   * @param latitude - Enlem (derece).
   * @param iconUrl - Marker ikonunun URL'si (ör. bir SVG data-URI).
   * @param options - Opsiyonel. `width`/`height`: ikonun ekrandaki boyutu (CSS px); verilmezse görüntünün
   *   kendi piksel boyutu kullanılır. Marker, Cesium tuvaline değil harita container'ının üstüne bir `<img>`
   *   olarak çizilir (bu yüzden `setQuality()` düşük olsa bile keskindir). `anchor`: koordinata oturan nokta —
   *   `"bottom"` (varsayılan, pin ucu) veya `"center"` (dairesel ikon). Yüksek çözünürlüklü bir görüntüyü küçük göstermek keskinliği artırır.
   *
   * @example
   * ```ts
   * map.dropMarker(32.85, 39.93, "https://example.com/pin.svg");
   * map.dropMarker(32.85, 39.93, "https://example.com/pin@8x.png", { width: 30, height: 36 });
   * ```
   */
  // iconUrl caginin sorumlulugu: hangi ikonun kullanilacagi bir UI/tasarim
  // karari (bkz TucbsGoToCoordinate -- Carbon'un dolu "location" ikonunu bir
  // SVG data-URI'sine cevirip verir), core paketi @carbon/icons'a bagimli
  // OLMAMALI -- burasi sadece Cesium billboard'ini kurar. verticalOrigin
  // BOTTOM: ikonun UCU (Carbon'un LocationFilled path'inde alt-orta nokta)
  // TAM koordinatta dursun, ikonun ORTASI degil (gercek harita pini gibi).
  // disableDepthTestDistance ile 3D Tiles/terrain'in ARKASINDA kalsa bile
  // marker HER ZAMAN gorunur -- LayerManager'in identify highlight'iyla
  // (bkz. LayerManager.ts ~759) AYNI teknik.
  dropMarker(longitude, latitude, iconUrl, options = {}) {
    this.clearMarker();
    this._removeMarker = createMarkerOverlay(this.viewer, longitude, latitude, iconUrl, options);
  }
  /**
   * `dropMarker()` ile eklenen marker'ı kaldırır (yoksa no-op).
   *
   * @example
   * ```ts
   * map.clearMarker();
   * ```
   */
  clearMarker() {
    var _a2;
    (_a2 = this._removeMarker) == null ? void 0 : _a2.call(this);
    this._removeMarker = void 0;
  }
  // ── Basemap ───────────────────────────────────────────────────────────────
  /** Altlık haritanın yükleme durumu (`"loading"`/`"ready"`/`"unavailable"`). */
  get basemapStatus() {
    return this.basemapController.status;
  }
  /**
   * Altlık haritayı ayarlar/değiştirir (`null`/`undefined` altlık haritayı tamamen kaldırır).
   *
   * @example
   * ```ts
   * map.setBasemap("hgm-ortofoto");
   * ```
   */
  setBasemap(basemap) {
    this.basemapController.set(basemap);
  }
  // ── Mod & kalite ─────────────────────────────────────────────────────────
  /** Sahne modunu 2D/3D arasında değiştirir (animasyonsuz, anında). */
  setMode(mode) {
    if (mode === "2D") {
      this.viewer.scene.morphTo2D(0);
    } else {
      this.viewer.scene.morphTo3D(0);
    }
  }
  /** Render çözünürlük ölçeğini ayarlar (`quality`: 0-100 arası yüzde, Cesium `resolutionScale`'e 0.1-1.0 arasına eşlenir — 0.1 alt sınırdır, aşırı bulanıklığı/performans düşüşünü önler). */
  setQuality(quality) {
    const clamped = Math.min(100, Math.max(0, quality));
    this.viewer.resolutionScale = Math.max(0.1, clamped / 100);
  }
  // ── Harita yönetimi ───────────────────────────────────────────────────────
  /** Harita canvas boyutunu, container'ının güncel boyutuna göre yeniden hesaplar. */
  resize() {
    this.viewer.resize();
  }
  // ── Disa aktarim ─────────────────────────────────────────────────────────
  /**
   * O anki kamera görüntüsünü (harita + tüm entity/feature'lar, UI butonları
   * hariç) JPEG olarak yakalayıp indirir.
   * @param filename - İndirilecek dosyanın adı (uzantısız, zaman damgası eklenir).
   * @param quality - JPEG sıkıştırma kalitesi (0-1).
   *
   * @example
   * ```ts
   * await map.exportJPEG("harita-goruntusu", 0.95);
   * ```
   */
  // tucbs-react RecordToolPanel.tsx'teki handleDownloadJpg/grabCanvasBlob'dan
  // PORTE EDILDI (bkz project_ucbp_api_tucbstoolbar_mimarisi memory onyedinci tur).
  async exportJPEG(filename = "tucbs-harita", quality = 0.92) {
    const blob = await this.captureScreenshotBlob(quality);
    triggerDownload(blob, `${filename}-${Date.now()}.jpg`);
  }
  /**
   * O anki kamera görüntüsünü indirmeden bir `Blob` olarak döndürür (ör. bir
   * `<img>`'e `blob:` URL olarak verilmek üzere).
   * @param quality - JPEG sıkıştırma kalitesi (0-1).
   */
  // TucbsPrintTool icin PORTE EDILDI (bkz project_ucbp_api_printtool_uygulama_plani
  // memory) -- exportJPEG() ile AYNI yakalama mantigini indirme YAPMADAN disari
  // acar (ör. bir <img>'e blob: URL olarak verilmek uzere).
  //
  // FAZ 1.5 KARARI: Faz 1.3/1.4'te burada, capture'i sayfa boyutuna gore
  // farkli piksel olculerde almak icin container'i GECICI resize edip
  // kamerayi/FOV'u yeniden sigdiran bir mekanizma vardi. Bu, Yazdir tiklanip
  // onizleme overlay'i acilmadan ONCE, kullanicinin GORDUGU canli haritada
  // (henuz hicbir sey onu ORTMEDIGI icin) belirgin bir zoom sicramasina yol
  // aciyordu (kullanici sikayeti) -- AYRICA farkli sayfa boyutlari icin
  // her seferinde YENIDEN hesaplanan kamera/FOV konumu, sayfa boyutuna gore
  // KUCUK ama gercek tutarsizliklar (extent'in "bazen genisleyip bazen
  // daralmasi") uretiyordu.
  //
  // Kullanicinin onerdigi/onayladigi cozum: kameraya/container'a HIC
  // dokunmadan, o ANKI ekran cozunurlugunde TEK bir goruntu yakalanir.
  // Farkli sayfa boyutlari icin bu AYNI goruntu sadece BUYUTULUP/KUCULTULUR
  // -- bu, TucbsPrintTool'daki `<img width=.. height=..>` HTML attribute
  // mekanizmasi tarafindan zaten OTOMATIK saglaniyor (bkz PrintPreviewBuilder.ts),
  // EK KOD GEREKTIRMEZ. Sonuc: zoom sicramasi tamamen ortadan kalkar (harita
  // capture SIRASINDA bile hicbir sekilde degismez); extent TUM sayfa
  // boyutlarinda MATEMATIKSEL OLARAK BIREBIR AYNI olur (ayni piksel verisi).
  // Bilinen odun: A0/A1 gibi buyuk sayfalarda ekran cozunurlugu buyuk olcude
  // buyutuldugunden goruntu netligi azalabilir -- kullaniciya bildirildi.
  async captureScreenshotBlob(quality = 0.92) {
    await nextFrame(this.viewer);
    return captureCanvasBlob(this.viewer, "image/jpeg", quality);
  }
  /**
   * Ekran merkezinde, arazi-farkında (`globe.pick`) ölçülen piksel-başına-yer-mesafesini
   * (metre) döndürür; harita globe'u göstermiyorsa (ör. açık uzay) `null` döner.
   */
  measureGroundMetersPerPixel() {
    return measureGroundMetersPerPixel(this.viewer);
  }
  // Viewer'a verilen kurucu secenekleri (Faz 2, constructor karmasikligi
  // duzeltmesi -- bkz project_ucbp_api_map_constructor_dry_karmasiklik).
  // Buradaki her "?? false" ESLint'in complexity kuralinda AYRI bir dal
  // sayildigi icin (12 adet) constructor'in KENDI karmasikligina dogrudan
  // katkida bulunuyordu -- davranis AYNI, sadece ayri bir metoda tasindi.
  buildViewerOptions(options, hiddenCreditContainer) {
    return {
      timeline: options.timeline ?? false,
      animation: options.animation ?? false,
      baseLayerPicker: options.baseLayerPicker ?? false,
      // Cesium, baseLayer verilmezse kendi varsayilan World Imagery katmanini
      // otomatik ekliyor; bu katman LayerManager'a hic kayitli olmadigindan
      // setBasemap()/_removeBasemapLayers() onu asla silemiyor ve bizim
      // basemap'imizin altinda kalici olarak birikiyor. false vererek
      // basemap yonetimini tamamen setBasemap()'e devrediyoruz (tek basemap garantisi).
      baseLayer: false,
      geocoder: options.geocoder ?? false,
      homeButton: options.homeButton ?? false,
      sceneModePicker: options.sceneModePicker ?? false,
      navigationHelpButton: options.navigationHelpButton ?? false,
      infoBox: options.infoBox ?? false,
      selectionIndicator: options.selectionIndicator ?? false,
      shadows: options.shadows ?? false,
      shouldAnimate: options.shouldAnimate ?? false,
      fullscreenButton: options.fullscreenButton ?? false,
      creditContainer: hiddenCreditContainer,
      ...options.cesiumOptions
    };
  }
  // (4b) apiKey-rotasyon kaydinin gerceklestirilmesi (Faz 3, constructor
  // karmasikligi duzeltmesi -- bkz project_ucbp_api_map_constructor_dry_karmasiklik).
  // SADECE bu Map global apiKey'e bagimliysa (constructor'daki "options.apiKey
  // === undefined" kontrolunden SONRA) cagrilir.
  registerGlobalApiKeyRotation(effectiveApiKey) {
    if (effectiveApiKey !== void 0) {
      console.info(
        "[@tucbs/core] Bu Map instance'i configureTucbs() global apiKey'ini kullaniyor (kendi apiKey attribute'u/options'u verilmedi). Farkli bir anahtar gerekiyorsa Map/component'e acikca apiKey verin."
      );
    }
    __privateSet(this, _unregisterApiKeyRefresh, registerApiKeyRefresh(() => {
      const rotatedKey = getGlobalApiKey();
      __privateSet(this, _apiKey3, rotatedKey);
      this.layerManager.configure({
        ...rotatedKey !== void 0 && { apiKey: rotatedKey }
      });
      this.analysisManager.configure({ apiKey: rotatedKey ?? "" });
      void this.ensureApiKeyValid().catch((err) => {
        console.error(
          "[@tucbs/core] apiKey rotasyon validate basarisiz:",
          err
        );
      });
      if (this.basemapController.currentBasemapId !== void 0) {
        this.setBasemap(this.basemapController.currentBasemapId);
      }
    }));
  }
  // draw:complete/draw:remove dinleyicilerinin "draw" (Cizim Katmani) ve
  // "measure" (Olcu Katmani) source'lari icin BIREBIR AYNI olan kurulumunu
  // (Faz 1, tekrarli kod DRY duzeltmesi -- bkz project_ucbp_api_map_constructor_dry_karmasiklik)
  // tek yerde birlestirir -- addShape, cagiranin KENDI _addDrawnShape/
  // _addMeasuredShape wrapper'ina isaret eder (diger sibling-module DI
  // moduelleriyle ayni desen, ham LayerManager metoduna degil).
  wireShapeSource(source, layerId, layerTitle, addShape) {
    this.drawingManager.on("draw:complete", ({ shape }) => {
      if (shape.source !== source) return;
      void addShape(layerId, layerTitle, shape);
    });
    this.drawingManager.on("draw:remove", ({ shape }) => {
      if (shape.source !== source) return;
      this.layerManager._removeDrawnShape(layerId, shape.entity);
    });
  }
  /** Seçili geometriyi katman listesine yazmadan kırmızı gösterir. Boş dizi vurguyu kaldırır. */
  showSelectionHighlight(features) {
    this.selectionHighlight.show(features);
  }
  /** Seçim vurgusunu haritadan kaldırır. */
  clearSelectionHighlight() {
    this.selectionHighlight.clear();
  }
  /** Tüm alt sistemleri (drawing/interaction/layer manager) ve Cesium `Viewer`'ı yok eder. */
  destroy() {
    var _a2, _b, _c, _d;
    this.clearMarker();
    this.selectionHighlight.clear();
    this.basemapController.stop();
    (_a2 = __privateGet(this, _unregisterApiKeyRefresh)) == null ? void 0 : _a2.call(this);
    (_b = __privateGet(this, _removeLodSeamGuard)) == null ? void 0 : _b.call(this);
    (_c = __privateGet(this, _removeMinZoomScale)) == null ? void 0 : _c.call(this);
    (_d = __privateGet(this, _removeScaleWheelZoom)) == null ? void 0 : _d.call(this);
    this.drawingManager.destroy();
    this.interactionManager.destroy();
    this.layerManager.destroy();
    this.viewer.destroy();
  }
}, _unregisterApiKeyRefresh = new WeakMap(), _removeLodSeamGuard = new WeakMap(), _removeMinZoomScale = new WeakMap(), _removeScaleWheelZoom = new WeakMap(), _apiKey3 = new WeakMap(), _a);
const HGM_BASEMAP_IDS = [
  "hgm-temel",
  "hgm-ortofoto",
  "hgm-siyasi",
  "hgm-yukseklik"
];
exports.AnalysisManager = AnalysisManager;
exports.AnalysisRequestError = AnalysisRequestError;
exports.ApiKeyValidationError = ApiKeyValidationError;
exports.DEFAULT_ANALYSIS_API_BASE = DEFAULT_UCBP_API_BASE;
exports.DEFAULT_INITIAL_EXTENT = DEFAULT_INITIAL_EXTENT;
exports.DEFAULT_UCBP_API_BASE = DEFAULT_UCBP_API_BASE;
exports.DrawingManager = DrawingManager;
exports.GeometryError = GeometryError;
exports.HGM_BASEMAP_IDS = HGM_BASEMAP_IDS;
exports.InteractionManager = InteractionManager;
exports.LayerManager = LayerManager;
exports.LayerOperationError = LayerOperationError;
exports.MEASURE_LAYER_ID = MEASURE_LAYER_ID;
exports.Map = Map$1;
exports.OgcRequestError = OgcRequestError;
exports.TucbsError = TucbsError;
exports.buildCapabilitiesUrl = buildCapabilitiesUrl;
exports.configureTucbs = configureTucbs;
exports.detectServiceType = detectServiceType;
exports.ensureEffectiveApiKeyValid = ensureEffectiveApiKeyValid;
exports.entityToGeoJSON = entityToGeoJSON;
exports.featureLabel = featureLabel;
exports.fetchWcsCoverageExtents = fetchWcsCoverageExtents;
exports.getCapabilities = getCapabilities;
exports.getErrorCodes = getErrorCodes;
exports.getProxyBase = getProxyBase;
exports.getUcbpApiBase = getUcbpApiBase;
exports.measureGround = measureGround;
exports.parseCapabilities = parseCapabilities;
exports.parseWcsTiffFormat = parseWcsTiffFormat;
exports.parseWmsTiffFormat = parseWmsTiffFormat;
exports.registerApiKeyRefresh = registerApiKeyRefresh;
exports.snapScaleForDisplay = snapScaleForDisplay;
exports.validateApiKey = validateApiKey;
exports.wcsRectangleFor = wcsRectangleFor;
