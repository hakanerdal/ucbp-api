import type { Camera } from "cesium";

// WHY: Cesium'un varsayilan zoomIn()/zoomOut() miktari kameranin o anki
// yuksekliginden BAGIMSIZ sabit bir mesafedir; kucuk olcekli (dar bir
// katmana odaklanmis) ve buyuk olcekli (global) gorunumlerde bu sabit
// deger tutarsiz hissettiriyor. Bunun yerine mevcut yuksekligin bir orani
// kadar hareket edilir. TucbsMapPreview ve TucbsZoomTool arasinda ortak
// kullanilan yardimci mantik (bkz. tucbs-taslak-web-component-metod-
// ihtiyac-analizi-v14 SS4.5).
/**
 * Kamerayı, o anki yüksekliğinin bir oranı kadar yaklaştırır; `minHeight`'in altına inmez.
 * @param camera - Yaklaştırılacak Cesium `Camera`.
 * @param stepRatio - Mevcut yükseklikten hareket edilecek oran (ör. `0.5`).
 * @param minHeight - İzin verilen asgari kamera yüksekliği (m); tipik olarak
 *   `screenSpaceCameraController.minimumZoomDistance`.
 */
// WHY: camera.zoomIn() de minimumZoomDistance'i UYGULAMAZ; oransal adimda
// yukseklik her basista yarilanip sifira yaklasiyordu.
export function zoomInProportional(
  camera: Camera,
  stepRatio: number,
  minHeight: number = 0,
): void {
  const height = camera.positionCartographic.height;
  const amount = Math.min(height * stepRatio, height - minHeight);
  if (amount > 0) camera.zoomIn(amount);
}

/**
 * Kamerayı, o anki yüksekliğinin bir oranı kadar uzaklaştırır; `maxHeight`'i aşmaz.
 * @param camera - Uzaklaştırılacak Cesium `Camera`.
 * @param stepRatio - Mevcut yükseklikten hareket edilecek oran (ör. `0.5`).
 * @param maxHeight - İzin verilen azami kamera yüksekliği (m); tipik olarak
 *   `screenSpaceCameraController.maximumZoomDistance`.
 */
// WHY: camera.zoomOut() ScreenSpaceCameraController'in maximumZoomDistance
// sinirini UYGULAMAZ (o sadece fare/dokunma girdisi icin); butona her basista
// yukseklik katlanarak buyuyup Cesium'u sayisal sinirlara goturuyordu.
export function zoomOutProportional(
  camera: Camera,
  stepRatio: number,
  maxHeight: number = Infinity,
): void {
  const height = camera.positionCartographic.height;
  const amount = Math.min(height * stepRatio, maxHeight - height);
  if (amount > 0) camera.zoomOut(amount);
}
