import { EllipsoidTerrainProvider, Math as CesiumMath, SceneMode, type Viewer } from "cesium";
import { seamFreeScreenSpaceError, type LodSeamParams } from "./lodSeam.js";

// Duz tepeden bakisa ne kadar yakinlikta (derece) koruma devrede: egik
// bakista mesafe araligi cok genis oldugundan karisik seviye Cesium'da
// zaten kacinilmaz; orada globe'un kendi degerine dokunulmaz.
const NADIR_TOLERANCE_DEGREES = 3;

/**
 * Duz tepeden (3D, elipsoid zemin) bakista ayni ekranda iki farkli altlik
 * seviyesinin yan yana cizilmesini (bkz lodSeam.ts) her karede onler:
 * `globe.maximumScreenSpaceError`'i, LOD esigi gorunumun icine dusmeyecek
 * sekilde kucuk bir carpanla gunceller. Pencere boyutu, cihaz/DPI, zoom ve
 * `quality` degisse de her karede yeniden hesaplandigi icin ayri bir olay
 * dinlemeye gerek yoktur. Dondurulen fonksiyon dinleyiciyi kaldirir ve
 * orijinal degeri geri yukler.
 */
export function installLodSeamGuard(viewer: Viewer): () => void {
  const scene = viewer.scene;
  const globe = scene.globe;
  if (!globe) return () => undefined;

  // `applied`: bu korumanin en son yazdigi deger. Globe'daki deger ondan
  // farkliysa dis kod degistirmistir; yeni "taban" olarak benimsenir.
  let base = globe.maximumScreenSpaceError;
  let applied = base;

  const apply = (value: number): void => {
    if (globe.maximumScreenSpaceError !== value) globe.maximumScreenSpaceError = value;
    applied = value;
  };

  const onPreRender = (): void => {
    if (globe.maximumScreenSpaceError !== applied) base = globe.maximumScreenSpaceError;

    const frustum = scene.camera.frustum as { fovy?: number; aspectRatio?: number; sseDenominator?: number };
    const nadir =
      Math.abs(CesiumMath.toDegrees(scene.camera.pitch) + 90) <= NADIR_TOLERANCE_DEGREES;
    if (
      scene.mode !== SceneMode.SCENE3D ||
      !nadir ||
      !(scene.terrainProvider instanceof EllipsoidTerrainProvider) ||
      frustum.fovy === undefined ||
      frustum.aspectRatio === undefined ||
      frustum.sseDenominator === undefined
    ) {
      apply(base);
      return;
    }

    const terrain = scene.terrainProvider;
    const params: LodSeamParams = {
      geometricError: (level) => terrain.getLevelMaximumGeometricError(level),
      drawingBufferHeight: scene.drawingBufferHeight,
      sseDenominator: frustum.sseDenominator,
      maximumScreenSpaceError: base,
      // Scene.pixelRatio calisma zamaninda public ama Cesium tip tanimlarinda yok.
      pixelRatio: (scene as unknown as { pixelRatio?: number }).pixelRatio ?? 1,
      fovy: frustum.fovy,
      aspectRatio: frustum.aspectRatio,
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
