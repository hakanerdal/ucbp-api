import type { Viewer } from "cesium";

// Bilgi cubugundaki "1/N" olcek hesabiyla (TucbsInfoBar) ayni kabul:
// 96dpi ekran, 1 inc = 0.0254 metre.
const SCREEN_DPI = 96;
const METERS_PER_INCH = 0.0254;

// Mesafe bu oranin altinda degisirse Cesium'a yeniden yazilmaz (her karede
// gereksiz atama / olcek titremesi olmasin).
const REWRITE_TOLERANCE = 0.005;

/**
 * Duz tepeden bakista ekran merkezinde `1/scaleDenominator` olcegini veren
 * kamera yuksekligi (metre). Piksel basina dunya mesafesi
 * `2 * h * tan(fovy/2) / canvasHeightPx` oldugundan h buradan cikar.
 * Gecersiz girdide (<=0 / sonlu degil) `null` doner.
 */
export function minZoomDistanceForScale(
  scaleDenominator: number,
  canvasHeightPx: number,
  fovy: number,
): number | null {
  const tanHalf = Math.tan(fovy / 2);
  const distance =
    (((scaleDenominator * METERS_PER_INCH) / SCREEN_DPI) * canvasHeightPx) / (2 * tanHalf);
  return Number.isFinite(distance) && distance > 0 ? distance : null;
}

// Cesium'un tekerlek/orta tus zoom'u minimumZoomDistance'a tam oturmaz, ~%3-5
// ustunde durur (1/100 yerine 1/103 gorunur). Sadece bu dogal pay (%6) icindeki
// duruslar sinira cekilir; daha uzakta (ornegin 1/110) kullanicinin kendi
// biraktigi yukseklige dokunulmaz -- aksi halde kamera "kendi kendine ziplar".
const SNAP_WINDOW_RATIO = 1.06;

const MIN_SNAP_GAP_METERS = 0.001;

// Sinira cekme animasyonunun suresi (ms); ani siçrama yerine akici kayma.
const SNAP_DURATION_MS = 150;

/**
 * Kamera sinirin hemen ustunde durduysa sinira inmek icin yaklasilacak
 * mesafe (m); cekme gerekmiyorsa 0.
 */
export function snapToMinAmount(height: number, minDistance: number): number {
  const gap = height - minDistance;
  // 1 mm alti fark float gurultusudur; cekmeye calismak sonsuz moveEnd dongusu uretir.
  if (!(gap > MIN_SNAP_GAP_METERS) || height > minDistance * SNAP_WINDOW_RATIO) return 0;
  return gap;
}

/**
 * `screenSpaceCameraController.minimumZoomDistance`'i, ekran boyutu/fov ne
 * olursa olsun azami yakinlasmanin `1/scaleDenominator` olcegi olmasi icin
 * her karede gunceller. `maxScaleDenominator` verilirse ayni sekilde
 * `maximumZoomDistance` azami uzaklasma olcegine baglanir. Pencere boyutu
 * degisimi ayri olay gerektirmez. Dondurulen fonksiyon dinleyiciyi kaldirir.
 */
export function installMinZoomScale(
  viewer: Viewer,
  scaleDenominator: number,
  maxScaleDenominator?: number,
): () => void {
  const scene = viewer.scene;
  const controller = scene.screenSpaceCameraController;

  const onPreRender = (): void => {
    const fovy = (scene.camera.frustum as { fovy?: number }).fovy;
    if (fovy === undefined) return;
    const height = scene.canvas.clientHeight;
    const distance = minZoomDistanceForScale(scaleDenominator, height, fovy);
    if (distance !== null) {
      const current = controller.minimumZoomDistance;
      if (Math.abs(current - distance) > current * REWRITE_TOLERANCE) {
        controller.minimumZoomDistance = distance;
      }
    }
    if (maxScaleDenominator === undefined) return;
    const maxDistance = minZoomDistanceForScale(maxScaleDenominator, height, fovy);
    if (maxDistance === null) return;
    const currentMax = controller.maximumZoomDistance;
    if (Math.abs(currentMax - maxDistance) > currentMax * REWRITE_TOLERANCE) {
      controller.maximumZoomDistance = maxDistance;
    }
  };

  const camera = scene.camera;
  const canvas = scene.canvas;
  let frame: number | undefined;
  const cancelSnap = (): void => {
    if (frame !== undefined) cancelAnimationFrame(frame);
    frame = undefined;
  };

  const onMoveEnd = (): void => {
    if (frame !== undefined) return; // kendi zoomIn'imizin tetikledigi moveEnd
    const total = snapToMinAmount(
      camera.positionCartographic.height,
      controller.minimumZoomDistance,
    );
    if (total <= 0) return;
    const start = performance.now();
    let done = 0;
    const step = (now: number): void => {
      const t = Math.min(1, (now - start) / SNAP_DURATION_MS);
      const target = total * (1 - (1 - t) * (1 - t)); // easeOut
      if (target > done) camera.zoomIn(target - done);
      done = target;
      // eslint-disable-next-line no-restricted-syntax -- dondurulen fonksiyon (cancelSnap) cancelAnimationFrame ile temizler.
      frame = t < 1 ? requestAnimationFrame(step) : undefined;
    };
    // eslint-disable-next-line no-restricted-syntax -- dondurulen fonksiyon (cancelSnap) cancelAnimationFrame ile temizler.
    frame = requestAnimationFrame(step);
  };
  // Kullanici animasyon sirasinda tekrar girdi verirse onunla yarismasin.
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
