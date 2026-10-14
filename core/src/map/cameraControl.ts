import { Cartesian3, HeadingPitchRange, Math as CesiumMath, Rectangle, type Viewer } from "cesium";
import type { CameraOptions, MapExtent, ManagedLayer } from "../types/index.js";

// Map.setView/setExtent/flyTo/zoomTo/zoomToLayer'in saf tasimasi -- bkz
// project_ucbp_api_god_component_map_adim1_basemapwatcher. Besi de SAF
// `viewer` fonksiyonu -- hicbir Map state'ine dokunmuyorlar, bu yuzden
// canvasCapture.ts'deki gibi deps objesine bile gerek yok.

// setView/flyTo'nun ortak destination+orientation nesnesi -- Faz 3 (Adim
// sonrasi DRY duzeltmesi): ikisi de AYNI donusumu (derece -> radyan,
// varsayilan heading=0/pitch=-90/roll=0) kullaniyordu, davranis DEGISMEDI.
function toOrientedDestination(cameraOptions: CameraOptions): {
  destination: Cartesian3;
  orientation: { heading: number; pitch: number; roll: number };
} {
  return {
    destination: Cartesian3.fromDegrees(
      cameraOptions.longitude,
      cameraOptions.latitude,
      cameraOptions.height,
    ),
    orientation: {
      heading: CesiumMath.toRadians(cameraOptions.heading ?? 0),
      pitch: CesiumMath.toRadians(cameraOptions.pitch ?? -90),
      roll: CesiumMath.toRadians(cameraOptions.roll ?? 0),
    },
  };
}

export function setView(viewer: Viewer, cameraOptions: CameraOptions): void {
  viewer.camera.setView(toOrientedDestination(cameraOptions));
}

export function setExtent(viewer: Viewer, extent: MapExtent): void {
  viewer.camera.setView({
    destination: Rectangle.fromDegrees(
      extent.west,
      extent.south,
      extent.east,
      extent.north,
    ),
  });
}

export function flyTo(viewer: Viewer, cameraOptions: CameraOptions): void {
  viewer.camera.flyTo(toOrientedDestination(cameraOptions));
}

export function zoomTo(
  viewer: Viewer,
  longitude: number,
  latitude: number,
  height: number,
): void {
  viewer.camera.setView({
    destination: Cartesian3.fromDegrees(longitude, latitude, height),
  });
}

// viewer.zoomTo hem ImageryLayer hem DataSource kabul ettigi icin katmanin
// turune bakmadan extent'ine (gorunur alanina) zoom yapar. Offset verilmezse
// Cesium egik bir aciyla yaklasir; duz tepeden goruntu icin heading=0,
// pitch=-90 derece kullanilir (range=0 -> tum katman otomatik sigacak sekilde).
export async function zoomToLayer(
  viewer: Viewer,
  layer: ManagedLayer,
): Promise<boolean> {
  return viewer.zoomTo(
    layer.cesiumObject,
    new HeadingPitchRange(0, -CesiumMath.PI_OVER_TWO, 0),
  );
}
