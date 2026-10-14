import { expect } from "vitest";
import { ImageryLayer, type DataSource } from "cesium";
import type { ManagedLayer } from "../../types/index.js";

// ManagedLayer.cesiumObject `ImageryLayer | DataSource` birlesimidir; testler
// katman turunu bildikleri icin dogrudan .imageryProvider/.entities'e
// erisiyordu (tip daraltmasi olmadan). Bu yardimcilar turu once DOGRULAR,
// sonra daraltilmis tipte dondurur -- yanlis turde test aciklayici bir
// assertion mesajiyla kirilir.

/**
 * Katmanin Cesium nesnesinin bir `ImageryLayer` oldugunu dogrular.
 * @param managed - Turu dogrulanacak yonetilen katman.
 * @returns `ImageryLayer` tipine daraltilmis Cesium nesnesi.
 */
export function asImageryLayer(managed: ManagedLayer): ImageryLayer {
  expect(managed.cesiumObject).toBeInstanceOf(ImageryLayer);
  return managed.cesiumObject as ImageryLayer;
}

/**
 * Katmanin Cesium nesnesinin bir `DataSource` oldugunu dogrular. Somut veri
 * kaynaklari (GeoJsonDataSource vb.) `DataSource` prototipinden turemedigi
 * icin `instanceof DataSource` kullanilamaz; birlesimin diger uyesi
 * `ImageryLayer` olmadigi dogrulanir.
 * @param managed - Turu dogrulanacak yonetilen katman.
 * @returns `DataSource` tipine daraltilmis Cesium nesnesi.
 */
export function asDataSource(managed: ManagedLayer): DataSource {
  expect(managed.cesiumObject).not.toBeInstanceOf(ImageryLayer);
  return managed.cesiumObject as DataSource;
}
