import type { Entity, ImageryLayer } from "cesium";

/** Haritada tıklanan/işaret edilen bir vektör (Entity tabanlı) feature'ın temel bilgisi. */
export interface PickedFeatureDetail {
  /** Tıklanan Cesium Entity'si. */
  readonly entity: Entity;
  /** Entity'nin ait olduğu katmanın id'si (bulunamazsa `null`). */
  readonly layerId: string | null;
  /** Feature'ın kimliği (varsa). */
  readonly featureId: string | null;
  /** Feature'ın öznitelik (attribute) değerleri. */
  readonly properties: Record<string, unknown>;
}

/** `entity:*` etkileşim event'lerinin (`InteractionManager`) detay nesnesi. */
export interface EntityInteractionDetail extends PickedFeatureDetail {
  /** Etkileşimin gerçekleştiği noktanın coğrafi konumu (`[boylam, enlem]`, derece). */
  readonly position: [number, number];
  /** Etkileşimin gerçekleştiği noktanın ekran koordinatı (piksel). */
  readonly screenPos: { readonly x: number; readonly y: number };

  /** Tıklanan noktadaki TÜM vektör feature'lar (drillPick); `entity` her zaman ilk sırada. */

  // Tiklanan ekran noktasindaki TUM vektor katmanlardaki feature'lar (drillPick) --
  // "entity" alaninin temsil ettigi en ustteki feature her zaman ilk sirada.
  // TucbsIdentifyPanel bu listeyi (birden fazlaysa Accordion olarak) gosterir.
  readonly features: readonly PickedFeatureDetail[];
}

/** `map:*` etkileşim event'lerinin detay nesnesi. */
export interface MapInteractionDetail {
  /** Etkileşimin gerçekleştiği noktanın coğrafi konumu (`[boylam, enlem]`, derece). */
  readonly position: [number, number];
  /** Etkileşimin gerçekleştiği noktanın ekran koordinatı (piksel). */
  readonly screenPos: { readonly x: number; readonly y: number };
}

/** GetFeatureInfo geometrisinden hesaplanan "Yakınlaş" hedefi -- ya bir ALAN
 * (gerçek bir bounding box) ya da geometri tek bir konuma indirgeniyorsa
 * (örn. bir nokta feature) TEK BIR NOKTA. İkisi ayrı tutulur çünkü hedefe
 * ulaşma yöntemi farklıdır (bkz `TucbsIdentifyPanel._zoomToItem`): alan için
 * `InteractionManager.flyToExtent`, nokta için `InteractionManager.
 * flyToPosition` (tıklanan noktadan çok daha hassas bir koordinat verir). */
export type ImageryGeometryHint =
  | { readonly kind: "extent"; readonly west: number; readonly south: number; readonly east: number; readonly north: number }
  | { readonly kind: "point"; readonly longitude: number; readonly latitude: number };

/** Bir WMS/WMTS (raster) katmanından `GetFeatureInfo` ile dönen tek bir feature'ın bilgisi. */

// WMS/WMTS gibi raster katmanlar Entity degil ImageryLayer olarak render
// edilir; bu yuzden feature'in Cesium tarafindaki kaynagi PickedFeatureDetail'in
// "entity"si degil dogrudan ImageryLayer referansidir. Tuketici (orn.
// TucbsIdentifyPanel), katman basligini bulmak icin bu referansi
// LayerManager.getLayers()'daki ManagedLayer.cesiumObject ile karsilastirir --
// vektor tarafinda oldugu gibi ayri bir "layerId" alani GetFeatureInfo
// yanitinda dogal olarak bulunmadigindan bu yol izlenir.
export interface ImageryFeatureInfo {
  /** Feature'ın kaynağı olan Cesium ImageryLayer. */
  readonly imageryLayer: ImageryLayer;
  /** Feature adı (sunucu sağlamazsa `null`). */
  readonly name: string | null;
  /** Feature'ın öznitelik (attribute) değerleri. */
  readonly properties: Record<string, unknown>;

  /** Sunucudan gelen ham HTML/metin yanıtı (`properties` boşsa bu alana düşülür). */

  // Sunucu sadece text/html INFO_FORMAT destekliyorsa (bircok eski/kati WMS
  // sunucusu -- orn. application/json VE text/xml'i reddedip sadece bunu kabul
  // ediyor) Cesium "properties"i hic doldurmaz, ham HTML yaniti burada kalir.
  // Tuketici (TucbsIdentifyPanel), properties bossa buna dusme yapar.
  readonly description: string | null;

  // GetFeatureInfo yaniti GeoJSON VEYA XML/GML ise (bkz InteractionManager.ts
  // extractImageryGeometry -- ikisini de dener) sunucu genelde feature'in
  // GERCEK geometrisini de dondurur; bu durumda o geometriden hesaplanan
  // hedef (bkz ImageryGeometryHint) burada bulunur. "Yakınlaş" butonu (bkz
  // TucbsIdentifyPanel _zoomToItem) bunu varsa tiklanan NOKTAYA zoom yerine
  // TERCIH eder -- gercek feature konumuna/sinirlarina daha hassas bir
  // yakinlasma saglar. Sunucu XML/text formatina dustuyse (geometri parse
  // edilemedi) veya geometri hic yoksa undefined kalir.
  readonly geometryHint?: ImageryGeometryHint | undefined;
}

/** `imagery:*` etkileşim event'lerinin detay nesnesi. */
export interface ImageryInteractionDetail {
  /** Etkileşimin gerçekleştiği noktanın coğrafi konumu (`[boylam, enlem]`, derece). */
  readonly position: [number, number];
  /** Etkileşimin gerçekleştiği noktanın ekran koordinatı (piksel). */
  readonly screenPos: { readonly x: number; readonly y: number };

  /** Tıklanan noktadaki tüm raster katmanlar için `GetFeatureInfo` sonuçları. */

  // Tiklanan ekran noktasinda gorunur birden fazla raster katman varsa
  // (bkz InteractionManager.pickImageryFeatures) TUMU icin GetFeatureInfo
  // sonucu doner.
  readonly features: readonly ImageryFeatureInfo[];
}
