import { Camera } from 'cesium';
/**
 * Kamerayı, o anki yüksekliğinin bir oranı kadar yaklaştırır; `minHeight`'in altına inmez.
 * @param camera - Yaklaştırılacak Cesium `Camera`.
 * @param stepRatio - Mevcut yükseklikten hareket edilecek oran (ör. `0.5`).
 * @param minHeight - İzin verilen asgari kamera yüksekliği (m); tipik olarak
 *   `screenSpaceCameraController.minimumZoomDistance`.
 */
export declare function zoomInProportional(camera: Camera, stepRatio: number, minHeight?: number): void;
/**
 * Kamerayı, o anki yüksekliğinin bir oranı kadar uzaklaştırır; `maxHeight`'i aşmaz.
 * @param camera - Uzaklaştırılacak Cesium `Camera`.
 * @param stepRatio - Mevcut yükseklikten hareket edilecek oran (ör. `0.5`).
 * @param maxHeight - İzin verilen azami kamera yüksekliği (m); tipik olarak
 *   `screenSpaceCameraController.maximumZoomDistance`.
 */
export declare function zoomOutProportional(camera: Camera, stepRatio: number, maxHeight?: number): void;
//# sourceMappingURL=CameraZoom.d.ts.map