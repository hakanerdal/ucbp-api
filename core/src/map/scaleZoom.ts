import { CameraEventType, Cartesian2, Cartesian3, type Camera, type Scene, type Viewer } from "cesium";

/**
 * Zoom basamaklari (1/N paydalari): tekerlegin bir centigi ve yakinlastir/
 * uzaklastir butonlarinin bir basisi, kamerayi bu olceklerden bir sonrakine
 * tasir (Google Maps mesafe cizgisi karsiliklari).
 */
export const ZOOM_SCALE_STEPS: readonly number[] = [
  100, 250, 500, 1_000, 2_500, 5_000, 10_000, 25_000, 50_000, 100_000, 250_000, 500_000,
  1_000_000, 2_500_000, 5_000_000, 15_000_000, 25_000_000,
];

// Bir basamaga bu oran kadar yakin olan kamera "o basamakta" sayilir; yoksa
// Cesium'un sinirda biraktigi 1/103 gibi artiklar yuzunden adim ayni basamaga
// geri dusup hicbir sey yapmaz.
const ON_STEP_TOLERANCE = 0.03;

/**
 * `current` olceginden `direction` yonundeki bir sonraki basamak. Yakinlasirken
 * (1) en kucuk basamagin altinda `null`; uzaklasirken (-1) en buyuk basamagin
 * ustunde `Infinity` (yani "azami uzakliga git") doner.
 */
export function nextScaleStep(current: number, direction: 1 | -1): number | null {
  if (!(current > 0) || !Number.isFinite(current)) return null;
  if (direction === 1) {
    const limit = current / (1 + ON_STEP_TOLERANCE);
    return [...ZOOM_SCALE_STEPS].reverse().find((s) => s < limit) ?? null;
  }
  const limit = current * (1 + ON_STEP_TOLERANCE);
  return ZOOM_SCALE_STEPS.find((s) => s > limit) ?? Infinity;
}

// Bilgi cubugundaki "1/N" ile ayni kabul: 96dpi ekran, 1 inc = 0.0254 metre.
const SCREEN_DPI = 96;
const METERS_PER_INCH = 0.0254;

/** Ekran merkezindeki zeminin olcegi (1/N paydasi) ve kameranin o noktaya uzakligi (m). */
export interface GroundMeasure {
  scale: number;
  distance: number;
}

/**
 * Ekran merkezinde 1 piksel araligindaki GERCEK dunya mesafesini (arazi ve
 * kamera egimi dahil) olcup 1/N olcegini ve kameranin zemin noktasina
 * uzakligini verir. Zemin secilemiyorsa `null`. Bilgi cubugu ve zoom adimi
 * AYNI olcumu kullanir; yoksa adim hedefi ile gorunen olcek ayrisir.
 */
export function measureGround(scene: Scene): GroundMeasure | null {
  const globe = scene.globe;
  if (!globe) return null;
  const camera = scene.camera;
  const x = scene.canvas.clientWidth / 2;
  const y = scene.canvas.clientHeight / 2;
  const left = camera.getPickRay(new Cartesian2(x - 1, y));
  const right = camera.getPickRay(new Cartesian2(x + 1, y));
  const middle = camera.getPickRay(new Cartesian2(x, y));
  if (!left || !right || !middle) return null;
  const leftPos = globe.pick(left, scene);
  const rightPos = globe.pick(right, scene);
  const middlePos = globe.pick(middle, scene);
  if (!leftPos || !rightPos || !middlePos) return null;
  const metersPerPixel = Cartesian3.distance(leftPos, rightPos) / 2;
  return {
    scale: (metersPerPixel * SCREEN_DPI) / METERS_PER_INCH,
    distance: Cartesian3.distance(camera.position, middlePos),
  };
}

// Gosterimde basamaga bu oran kadar yakin olcek tam basamak olarak yazilir
// (1/2.499.843 yerine 1/2.500): pick olcumu kuresel egrilik/arazi nedeniyle
// basamaktan binde birler sapabilir.
const DISPLAY_SNAP_TOLERANCE = 0.005;

/** Olcegi gosterim icin en yakin zoom basamagina (yakinsa) yuvarlar; degilse aynen doner. */
export function snapScaleForDisplay(scale: number): number {
  const near = ZOOM_SCALE_STEPS.find((s) => Math.abs(scale - s) <= s * DISPLAY_SNAP_TOLERANCE);
  return near ?? scale;
}

// WHY: Animasyon, sektor standardi olan OpenLayers `Zoom` kontroluyle ayni:
// 250 ms ve yavaslayarak duran (easeOut) bir egri.
const ZOOM_ANIMATION_SECONDS = 0.25;

/** OpenLayers `ol/easing#easeOut` ile ayni: `1 - (1 - t)^3`. */
export function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

interface PendingZoom {
  ground: GroundMeasure;
  height: number;
  position: { x: number; y: number; z: number };
}

// Animasyon surerken art arda adimlar, kameranin ara konumundan degil bir
// onceki HEDEFTEN hesaplanir; yoksa hizli tekerlek/tiklama basamak atlatmaz.
const pendingZooms = new WeakMap<Camera, PendingZoom>();

/**
 * Gozden zemine uzaklik olcekle dogru orantili oldugundan, hedef olcege
 * gecmek icin goz yonunde hareket edilecek mesafe `distance * |1 - next/scale|`.
 * En ust basamagin ustunde uzaklasma `maxHeight`'a gider. Adim yoksa `null`.
 */
export function planStepAmount(
  ground: GroundMeasure,
  direction: 1 | -1,
  height: number,
  maxHeight: number,
): number | null {
  const next = nextScaleStep(ground.scale, direction);
  if (next === null) return null;
  let amount = next === Infinity ? Infinity : ground.distance * Math.abs(1 - next / ground.scale);
  if (direction === -1) amount = Math.min(amount, maxHeight - height);
  return amount > 0 && Number.isFinite(amount) ? amount : null;
}

/**
 * Kamerayi bir sonraki olcek basamagina animasyonlu tasir. `measure`: guncel
 * zemin olcumu (bekleyen ucus yoksa kullanilir). Uzaklasma `maxHeight`'i asmaz.
 */
export function flyScaleStep(
  camera: Camera,
  direction: 1 | -1,
  measure: () => GroundMeasure | null,
  maxHeight: number,
): void {
  const pending = pendingZooms.get(camera);
  const ground = pending?.ground ?? measure();
  if (!ground) return;
  const height = pending?.height ?? camera.positionCartographic.height;
  const amount = planStepAmount(ground, direction, height, maxHeight);
  if (amount === null) return;

  const from = pending?.position ?? camera.position;
  const dir = camera.direction;
  const destination = camera.position.clone();
  destination.x = from.x + dir.x * amount * direction;
  destination.y = from.y + dir.y * amount * direction;
  destination.z = from.z + dir.z * amount * direction;

  const distance = ground.distance - direction * amount;
  const target: PendingZoom = {
    ground: { scale: (ground.scale * distance) / ground.distance, distance },
    height: height - direction * amount,
    position: destination,
  };
  const clear = (): void => {
    if (pendingZooms.get(camera) === target) pendingZooms.delete(camera);
  };
  // flyTo, surmekte olan ucusu iptal eder (iptal geri cagrisi eski hedefi
  // siler); yeni hedef bundan SONRA yazilir.
  camera.flyTo({
    destination,
    orientation: { direction: dir.clone(), up: camera.up.clone() },
    duration: ZOOM_ANIMATION_SECONDS,
    easingFunction: easeOut,
    complete: clear,
    cancel: clear,
  });
  pendingZooms.set(camera, target);
}

/** Kamerayi bir sonraki olcek basamagina animasyonlu tasir (bkz `flyScaleStep`). */
export function scaleZoomStep(viewer: Viewer, direction: 1 | -1): void {
  const { camera, scene } = viewer;
  flyScaleStep(
    camera,
    direction,
    () => measureGround(scene),
    scene.screenSpaceCameraController.maximumZoomDistance,
  );
}

// Tekerlek: bir centik ~100 px; izleme dortgeni (trackpad) cok kucuk deltalar
// uretir, bunlar esige kadar birikir. Adimdan sonra kisa sure yalniz kucuk
// (atalet kuyrugu) deltalar yok sayilir; yoksa tek kaydirma birden cok
// basamak atlatir.
const WHEEL_STEP_THRESHOLD_PX = 40;
const WHEEL_SMALL_DELTA_LOCK_MS = 200;
const LINE_HEIGHT_PX = 16;
const PAGE_HEIGHT_PX = 400;

/** `WheelEvent.deltaY`'yi deltaMode'dan bagimsiz piksele cevirir. */
export function wheelDeltaPixels(deltaY: number, deltaMode: number): number {
  if (deltaMode === 1) return deltaY * LINE_HEIGHT_PX;
  if (deltaMode === 2) return deltaY * PAGE_HEIGHT_PX;
  return deltaY;
}

/**
 * Fare tekerlegini Cesium'un surekli zoom'u yerine olcek basamaklarina baglar:
 * her centik bir basamak. Orta tus surukleme ve dokunmatik pinch zoom'u
 * degismez. Donen fonksiyon her seyi eski haline getirir.
 */
export function installScaleWheelZoom(viewer: Viewer): () => void {
  const canvas = viewer.scene.canvas;
  const controller = viewer.scene.screenSpaceCameraController;
  const previousZoomTypes = controller.zoomEventTypes;
  controller.zoomEventTypes = [CameraEventType.MIDDLE_DRAG, CameraEventType.PINCH];

  let accumulated = 0;
  let lockedUntil = 0;
  const onWheel = (event: WheelEvent): void => {
    event.preventDefault();
    const delta = wheelDeltaPixels(event.deltaY, event.deltaMode);
    if (delta === 0) return;
    const now = performance.now();
    if (Math.abs(delta) < WHEEL_STEP_THRESHOLD_PX && now < lockedUntil) return;
    // Yon degisince birikim sifirlanir.
    if (Math.sign(delta) !== Math.sign(accumulated)) accumulated = 0;
    accumulated += delta;
    if (Math.abs(accumulated) < WHEEL_STEP_THRESHOLD_PX) return;
    // Tekerlek yukari (deltaY < 0) = yakinlas.
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
