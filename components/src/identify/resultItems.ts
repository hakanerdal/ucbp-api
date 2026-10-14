import type {
  ImageryFeatureInfo,
  ImageryGeometryHint,
  LayerManager,
  LayerType,
  PickedFeatureDetail,
} from "@tucbs/core";

export interface IdentifyResultItem {
  readonly layerTitle: string;
  readonly layerType: LayerType | undefined;
  readonly propertyEntries: ReadonlyArray<[string, unknown]>;
  // SADECE vektor sonuclarda (bkz toResultItem) dolu -- "Yakınlaş" butonu
  // (bkz TucbsIdentifyPanel._zoomToItem) buradan LayerManager.zoomToEntity ile
  // feature'in GERCEK cercevesine yakinlasir. Raster (WMS/WMTS) sonuclarin
  // client-side bir Entity'si/geometrisi olmadigindan bu alan undefined kalir
  // -- o durumda _zoomToItem asagidaki extent'i (varsa) veya tiklanan noktayi
  // kullanir. PickedFeatureDetail["entity"] kullanilir ki bu dosya (bilerek)
  // "cesium" paketini hic import etmesin -- tip yine de Cesium'un gercek
  // Entity'sine cozulur.
  readonly entity?: PickedFeatureDetail["entity"];
  // SADECE raster (WMS/WMTS) sonuclarda, sunucu GetFeatureInfo yanitini
  // GERCEK geometri iceren GeoJSON/GML olarak dondurduyse dolu (bkz
  // ImageryFeatureInfo.geometryHint yorumu, InteractionManager.
  // extractImageryGeometry) -- _zoomToItem bunu tiklanan NOKTAYA
  // (flyToPosition ile _tableLon/_tableLat) zoom yerine TERCIH eder, cunku
  // gercek feature konumuna/sinirlarina cok daha hassas bir yakinlasma
  // saglar (ALAN ise flyToExtent, NOKTA ise yine flyToPosition ama GERCEK/
  // hassas koordinatla -- bkz ImageryGeometryHint yorumu). Sunucu sadece
  // HTML/text dondurduyse (geometri yok) undefined kalir.
  readonly geometryHint?: ImageryGeometryHint | undefined;
}

// Bazi WMS sunuculari (orn. sadece text/html INFO_FORMAT destekleyip
// application/json VE text/xml'i reddeden eski/kati sunucular -- gercek
// ornek: MapServer'in varsayilan demo servisi) icin Cesium'un GetFeatureInfo
// format zinciri "properties" hic doldurmaz, sonuc sadece ham HTML olarak
// "description"da kalir (bkz ImageryFeatureInfo tanimi). Etiketleri
// kabaca temizleyip en azindan okunabilir bir metin gosterebilmek icin.
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

// InteractionManager, entity:click "properties" alanina layerId/featureId'yi
// de gomer (bkz InteractionManager.ts resolveFeature) — bunlar breadcrumb'da
// ayrica gosterildigi icin oznitelik tablosunda tekrar listelenmemeli.
export function toResultItem(
  feature: PickedFeatureDetail,
  layerManager: LayerManager | undefined,
): IdentifyResultItem {
  const layer = feature.layerId
    ? layerManager?.getLayers().find((candidate) => candidate.id === feature.layerId)
    : undefined;
  const layerTitle = layer?.title ?? feature.layerId ?? feature.featureId ?? "—";
  const propertyEntries = Object.entries(feature.properties).filter(
    ([key]) => key !== "layerId" && key !== "featureId",
  );
  return { layerTitle, layerType: layer?.layerType, propertyEntries, entity: feature.entity };
}

// GetFeatureInfo yanitinda "layerId" gibi ayrik bir alan yok (bkz
// ImageryFeatureInfo tanimi) -- katman basligi/turu, feature'in tasidigi
// ham ImageryLayer referansi LayerManager'daki ManagedLayer.cesiumObject
// ile birebir karsilastirilarak bulunur (toResultItem'daki layerId
// eslesmesinin raster karsiligi).
function toImageryResultItem(
  feature: ImageryFeatureInfo,
  layerManager: LayerManager | undefined,
): IdentifyResultItem {
  const layer = layerManager
    ?.getLayers()
    .find((candidate) => candidate.cesiumObject === feature.imageryLayer);
  const layerTitle = layer?.title ?? feature.name ?? "—";
  const propertyEntries = Object.entries(feature.properties);
  if (propertyEntries.length === 0 && feature.description) {
    // Sunucu sadece text/html INFO_FORMAT destekliyorsa "properties" hic
    // dolmaz (bkz ImageryFeatureInfo tanimi) -- bos bir tablo yerine ham
    // HTML'i en azindan duz metne cevirip tek satir olarak gosteriyoruz.
    const text = stripHtml(feature.description);
    if (text) {
      return {
        layerTitle,
        layerType: layer?.layerType,
        propertyEntries: [["Bilgi", text]],
        geometryHint: feature.geometryHint,
      };
    }
  }
  return { layerTitle, layerType: layer?.layerType, propertyEntries, geometryHint: feature.geometryHint };
}

// WMS katmanlari genelde ekranin BUYUK bir kismini (bazen tamaminı) kapladigi
// icin GetFeatureInfo, kullanicinin gercekte "tikladigi" anlamli bir feature
// olmasa da (orn. bos bir raster piksel, tanimsiz alan) icerigi bombos bir
// "feature" dondurebiliyordu -- bu da vektor bir feature'a tiklandiginda
// ilgisiz, bombos bir "RASTER" sonucunun tabloya eklenmesine yol aciyordu
// (bkz kullanici geri bildirimi: "WMS feature'ina tiklamadim ki, gelmemeli").
// Gosterilecek HICBIR alani olmayan (propertyEntries bos) sonuclar burada
// elenir -- boylece "feature bulundu" sadece GERCEKTEN gosterilecek bir
// seyi olan sonuclar icin gecerli olur.
export function toImageryResultItems(
  features: readonly ImageryFeatureInfo[],
  layerManager: LayerManager | undefined,
): IdentifyResultItem[] {
  return features
    .map((feature) => toImageryResultItem(feature, layerManager))
    .filter((item) => item.propertyEntries.length > 0);
}

export function pagedTableItems(
  tableItems: readonly IdentifyResultItem[],
  accordionPage: number,
  pageSize: number,
): IdentifyResultItem[] {
  const start = accordionPage * pageSize;
  return tableItems.slice(start, start + pageSize);
}

// Her item, turu/ismi ne olursa olsun TUM sonuc setindeki (sayfalar dahil)
// GLOBAL sirasini gosterir -- eskiden SADECE ayni basligi paylasan item'ler
// numaralandirilip tekil (farkli isimli) bir sonuc (orn. tek basina bir WMS
// item'i) numarasiz kaliyordu (bkz kullanici geri bildirimi: "WMS'e de
// sira numarasi gelmeli, kaldigi yerden devam etsin"). tableItems TUM
// sayfalari icerdiginden (bkz pagedTableItems) indexOf dogrudan global
// pozisyonu verir, sayfa gecislerinde de devam eder.
export function itemGlobalIndex(
  tableItems: readonly IdentifyResultItem[],
  item: IdentifyResultItem,
): number {
  return tableItems.indexOf(item) + 1;
}

// Kompakt panelin (bkz .attr-panel--auto: max-width min(720px, 100vw - 2rem))
// icindeki .item-body'nin alabilecegi EN BUYUK genislik. Panel genisligi
// 720px ile, accordion item'in yatay padding'i + kenarliklari (~34px) ise
// bundan dusulur. Olcum kutusu bu sinirla olculur; aksi halde WKT gibi tek
// satirlik cok uzun bir deger "max-content" genisligi (binlerce px) olarak
// kilitlenip tabloyu panelin disina tasiriyordu.
export const COMPACT_PANEL_MAX_WIDTH = 720;
export const COMPACT_ITEM_BODY_CHROME = 34;
export const VIEWPORT_MARGIN = 32;

export function compactItemBodyMaxWidth(viewportWidth: number): number {
  const panel = Math.min(COMPACT_PANEL_MAX_WIDTH, viewportWidth - VIEWPORT_MARGIN);
  return Math.max(0, panel - COMPACT_ITEM_BODY_CHROME);
}

// WKT geometri metni: "MULTIPOLYGON(((x y,x y,...)))", "POINT Z (x y z)" vb.
const WKT_PATTERN = /^\s*(?:MULTI)?(?:POINT|LINESTRING|POLYGON)|^\s*GEOMETRYCOLLECTION/i;

// "[x,y]" / "[x,y,z]" biciminde SADECE sayilardan olusan koordinat dizisi
// (GeoJSON) -- icindeki virgullerde satir kirilmaz.
const NUMERIC_ARRAY_OR_COMMA = /\[-?[\d.eE+]+(?:,-?[\d.eE+]+)+\]|,/g;

// Oznitelik tablosundaki bir hucre degerini metne cevirir. Object.entries
// "unknown" dondurdugu icin duz String() cagirmak nesneler icin
// "[object Object]" uretebilir; bu yuzden object/array once JSON'a cevrilir.
//
// Uzun geometri metinleri (WKT/GeoJSON) tek bir "kelime" sayilip sayilarin
// ortasindan kirilmasin diye satir kirma firsatlari elle verilir: her
// virgulden sonra gorunmez bir kirma firsati eklenir, boylece kirilma sadece
// tam bir koordinattan SONRA olur. Bir koordinatin X/Y(/Z) degerleri ise ayni
// satirda kalir: WKT'de sayilar arasindaki bosluk, GeoJSON'da "[x,y]"
// icindeki virgul kirilmaz kilinir (U+00A0 kirilmaz bosluk).
export function formatPropertyValue(value: unknown): string {
  if (value === null || value === undefined) return "—";
  let text = typeof value === "object" ? JSON.stringify(value) : String(value);
  if (WKT_PATTERN.test(text)) {
    text = text.replace(/(?<=\d) (?=-?\d)/g, "\u00A0");
  }
  return text.replace(NUMERIC_ARRAY_OR_COMMA, (match) => (match === "," ? ",\u200B" : match));
}
