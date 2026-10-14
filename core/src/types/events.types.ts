import type { JulianDate } from "cesium";
import type { ManagedLayer, LayerStyleSpec } from "./layer.types.js";
import type { BasemapId } from "./map.types.js";
import type {
  EntityInteractionDetail,
  MapInteractionDetail,
  ImageryInteractionDetail,
} from "./interaction.types.js";
import type { DrawTool, DrawnShape } from "./drawing.types.js";

/** `LayerManager`'ın yaydığı katman/basemap/CRS event'lerinin tam haritası. */
export interface LayerManagerEventMap {
  /** Bir katman haritaya eklendiğinde yayılır. */
  "layer:add": { readonly layer: ManagedLayer };
  /** Bir katman haritadan kaldırıldığında yayılır. */
  "layer:remove": { readonly layer: ManagedLayer };

  /** Altlık harita servisine erişilemediğinde (fallback görsel devreye girdiğinde) yayılır. */

  // HGM/Turksat proxy'sindeki asil altlik harita ya ACIKCA basarisiz olunca
  // ya da beklenen sure icinde HIC yanit vermeyince (bkz Map.ts
  // FALLBACK_DELAY_MS) -- yani Map.ensureFallbackBasemap() gomulu dunya
  // goruntusu yedegini FIILEN ekledigi anda -- Map.watchBasemap() tarafindan
  // yayilir. Ucuncu taraf (OSM/CARTO vb.) bir tile servisine SESSIZCE
  // fallback YAPILMAZ (lisans/ToS riski, bkz proje gecmisi); bunun yerine
  // tuketici (ör. TucbsBasemapPicker) bu event'i dinleyip kullaniciya acik
  // bir hata durumu gosterir VE altlik harita secimini devre disi birakir
  // (HGM'e erisim yokken baska bir HGM katmani secmenin bir anlami yok).
  "basemap:error": { readonly id: BasemapId };

  /** Altlık harita servisi `basemap:error`'dan sonra tekrar erişilebilir hale geldiğinde yayılır. */

  // HGM/Turksat proxy'si -- "basemap:error" yayildiktan bir sure SONRA --
  // gercekten basariyla tile vermeye basladiginda (bkz Map.watchBasemap
  // icindeki onProgress basari kolu) yayilir; dunya goruntusu yedegi bu
  // sirada kaldirilir. Tuketici bu event'i dinleyip hata durumunu/devre disi
  // birakmayi geri alir.
  "basemap:recovered": { readonly id: BasemapId };
  /** Bir katmanın z-sırası (üst-alt konumu) değiştiğinde yayılır. */
  "layer:reorder": {
    readonly id: string;
    readonly oldIndex: number;
    readonly newIndex: number;
    readonly layer: ManagedLayer;
  };
  /** Bir katmanın görünürlüğü değiştiğinde yayılır. */
  "layer:visibility": {
    readonly id: string;
    readonly visible: boolean;
  };
  /** Bir katmanın opaklığı değiştiğinde yayılır. */
  "layer:opacity": {
    readonly id: string;
    readonly opacity: number;
  };
  /** Bir katmanın stili (`applyLayerStyle()`) değiştiğinde yayılır. */
  "layer:style": {
    readonly id: string;
    readonly style: LayerStyleSpec;
  };
  /** `LayerManager`'ın apiKey'i değiştiğinde yayılır. */
  "apiKey:change": {
    readonly hasApiKey: boolean;
  };

  /** Yüklenen katmanın koordinat sistemi otomatik olarak WGS84'e dönüştürüldüğünde yayılır. */

  // Yuklenen bir GeoJSON/WFS/SHP katmaninin "crs" alani WGS84 disi bir EPSG
  // kodu tasidiginda (bkz layers/sources/geojsonCrs.ts) -- veri proj4 ile otomatik
  // WGS84'e cevrilip DOGRU konumda gosterilir, ama kullanici "verim yanlis mi
  // yuklendi" diye kaygilanmasin diye bu SESSIZ donusum acikca bildirilir
  // (bkz kullanici bildirimi: "doğru dönüşüm yapılsa dahi bilgilendirme
  // yapmamız lazım"). "layer:add" ile AYNI register() cagrisindan hemen
  // sonra, sadece gercek bir donusum uygulandiginda yayilir.
  "layer:crs-reprojected": {
    readonly id: string;
    readonly fromEpsg: string;
    readonly toEpsg: "EPSG:4326";
  };

  /** Katmanın koordinat sistemi çözülemediğinde (ham/varsayılan WGS84 kabulüyle yine de yüklendiğinde) yayılır. */

  // "crs" alani VAR ama gecerli/cozulebilir bir EPSG koduna karsilik
  // gelmiyorsa (orn. "EPSG:Tanımsız" gibi sonu rakam olmayan bozuk bir isim,
  // ya da epsg.io'da tanimi bulunamayan gercek olmayan bir kod) -- VE ilk
  // koordinat GECERLI bir enlem/boylam araliginda kaldiginda -- yayilir.
  // Cesium normalde bu durumda "Unknown crs name"/"Unknown crs EPSG code"
  // hatasi firlatip katmani TAMAMEN reddederdi (bkz kullanici bildirimi:
  // "crs alanı var ama epsg gerçek değilse yine göster haritada"); bunun
  // yerine katman varsayilan/ham WGS84 kabulüyle YINE DE yuklenir, sadece
  // kullaniciya CRS'in cozulemedigi ve konumun yanlis olabilecegi bildirilir.
  // (Koordinatlar GECERSIZ bir aralikta ise -- crs hic olmasa da, crs
  // cozulemese de -- layers/sources/geojsonCrs.ts artik BLOKLAR/throw eder; Cesium'un
  // 3D kure matematigi o degerleri anlamsiz/coken bir goruntuye cevirir,
  // bkz kullanici bildirimi: "QGIS'de tam istediğim gibi gösteriyor" / "bu ne
  // saçma bir görüntü" -- bu yuzden bu durum icin ayri bir event YOKTUR,
  // yukleme dogrudan Error olarak reddedilir.)
  "layer:crs-unresolved": {
    readonly id: string;
    readonly crsName: string;
  };

  /** WFS katmanının kayıt sayısı sunucu limitini aştığında (katman kısmi veriyle yüklendiğinde) yayılır. */

  // WFS sunucusundaki toplam kayit sayisi ("count"/"maxFeatures" -- bkz
  // WFSLayerOptions.maxFeatures, varsayilan 5000) sinirini asiyorsa yayilir.
  // Katman ENGELLENMEZ -- ilk `loadedCount` kadar kayit YINE DE dogru
  // konumda gosterilir (kullanici bildirimi: "eksik ama dogru veri, hiç veri
  // olmamasından daha faydalı") -- sadece kullaniciya eksik oldugu bildirilir.
  "layer:features-truncated": {
    readonly id: string;
    readonly totalCount: number;
    readonly loadedCount: number;
  };
}

export type LayerManagerEventName = keyof LayerManagerEventMap;

export type LayerManagerEventPayload<K extends LayerManagerEventName> =
  LayerManagerEventMap[K];

/** `InteractionManager`'ın yaydığı pick/kamera/sahne event'lerinin tam haritası. */

// ── InteractionManager ───────────────────────────────────────────────────
// 26 event, 5 grup: entity (7) + imagery (4) + map (8) + camera (3) + scene (4).
// suspend() entity:* VE imagery:* gruplarini durdurur (bkz InteractionManager.ts
// dispatchPick — imagery pick'i suspended iken hic baslatilmaz).
export interface InteractionManagerEventMap {
  /** Bir vektör (Entity) feature'a tıklandığında yayılır. */
  "entity:click": EntityInteractionDetail;
  /** Bir vektör (Entity) feature'a çift tıklandığında yayılır. */
  "entity:dblclick": EntityInteractionDetail;
  /** Bir vektör (Entity) feature'a sağ tıklandığında yayılır. */
  "entity:rightclick": EntityInteractionDetail;
  /** Fare düğmesi bir vektör (Entity) feature üzerinde basılı tutulduğunda yayılır. */
  "entity:mousedown": EntityInteractionDetail;
  /** Fare düğmesi bir vektör (Entity) feature üzerinde bırakıldığında yayılır. */
  "entity:mouseup": EntityInteractionDetail;
  /** Fare bir vektör (Entity) feature'ın üzerine geldiğinde yayılır. */
  "entity:mouseenter": EntityInteractionDetail;
  /** Fare bir vektör (Entity) feature'ın üzerinden ayrıldığında yayılır. */
  "entity:mouseleave": EntityInteractionDetail;

  /** Bir raster (WMS/WMTS) katmanına tıklandığında, GetFeatureInfo sonucu geldiğinde yayılır. */

  // WMS/WMTS gibi raster katmanlarda scene.pick bir Entity bulamadigi icin
  // entity:click yerine bu event kullanilir. GetFeatureInfo agi bekledigi
  // icin ilgili map:* event'inden SONRA (asenkron) yayilir -- bkz
  // InteractionManager.pickImageryFeatures. Sorgu TAMAMLANDIGINDA (basarili
  // VEYA basarisiz/bos) HER ZAMAN yayilir -- "features" bos da olabilir,
  // tuketici (orn. TucbsIdentifyPanel) bunu "sonuc yok" sinyali olarak kullanir.
  "imagery:click": ImageryInteractionDetail;
  /** Bir raster (WMS/WMTS) katmanına çift tıklandığında, GetFeatureInfo sonucu geldiğinde yayılır. */
  "imagery:dblclick": ImageryInteractionDetail;
  /** Bir raster (WMS/WMTS) katmanına sağ tıklandığında, GetFeatureInfo sonucu geldiğinde yayılır. */
  "imagery:rightclick": ImageryInteractionDetail;

  /** Bir raster katman için GetFeatureInfo sorgusu başlatıldığında (yanıttan önce) yayılır. */

  // Bir GetFeatureInfo sorgusu BASLATILDIGINDA (yanit gelmeden once, senkron)
  // yayilir -- agdan yanit saniyeler surebildiginden, tuketicinin "sorgulaniyor"
  // durumu gosterip erken/tutarsiz bir "sonuc yok" varsayimindan kacinmasi icin.
  "imagery:querying": MapInteractionDetail;

  /** Boş harita zeminine tıklandığında yayılır. */
  "map:click": MapInteractionDetail;
  /** Boş harita zeminine çift tıklandığında yayılır. */
  "map:dblclick": MapInteractionDetail;
  /** Boş harita zeminine sağ tıklandığında yayılır. */
  "map:rightclick": MapInteractionDetail;
  /** Fare harita üzerinde hareket ettiğinde yayılır. */
  "map:mousemove": MapInteractionDetail;
  /** Fare tekerleği (zoom) çevrildiğinde yayılır. */
  "map:wheel": { readonly delta: number };
  /** Dokunmatik pinch (yakınlaştırma) hareketi başladığında yayılır. */
  "map:pinchstart": MapInteractionDetail;
  /** Dokunmatik pinch hareketi devam ederken yayılır. */
  "map:pinchmove": MapInteractionDetail & { readonly angle: number };
  /** Dokunmatik pinch hareketi bittiğinde yayılır. */
  "map:pinchend": Record<string, never>;

  /** Kamera hareketi başladığında yayılır. */
  "camera:moveStart": Record<string, never>;
  /** Kamera hareketi bittiğinde yayılır. */
  "camera:moveEnd": Record<string, never>;
  /** Kamera konumu belirgin şekilde değiştiğinde yayılır. */
  "camera:changed": { readonly percentage: number };

  /** Her render karesinden önce yayılır. */
  "scene:preRender": { readonly time: JulianDate };
  /** Her render karesinden sonra yayılır. */
  "scene:postRender": { readonly time: JulianDate };
  /** 2D/3D/Columbus View geçişi (morph) başladığında yayılır. */
  "scene:morphStart": Record<string, never>;
  /** 2D/3D/Columbus View geçişi (morph) tamamlandığında yayılır. */
  "scene:morphComplete": Record<string, never>;
}

export type InteractionManagerEventName = keyof InteractionManagerEventMap;

export type InteractionManagerEventPayload<
  K extends InteractionManagerEventName,
> = InteractionManagerEventMap[K];

/** `DrawingManager`'ın yaydığı çizim/ölçüm event'lerinin tam haritası. */
export interface DrawingManagerEventMap {
  /** Bir çizim/ölçüm aracı etkinleştirildiğinde (çizim başladığında) yayılır. */

  // `source`, activate()'i cagiran BILESEN TURUNU (ornek: "draw"/"measure")
  // isaretlemek icin opsiyonel bir etiket -- polyline/polygon gibi ayni
  // DrawTool degerlerini FARKLI amacla (duz cizim VS olcum) yeniden kullanan
  // birden fazla bagimsiz component AYNI haritada bulunabildiginde, her biri
  // SADECE KENDI kaynakli aktivasyonlari "bana ait" olarak isaretlemek icin
  // kullanir (bkz TucbsMeasureTool/TucbsDrawTool source-tabanli sahiplik
  // deseni, project_ucbp_api_tucbstoolbar_mimarisi memory onaltinci tur).
  "draw:start": { readonly tool: DrawTool; readonly source?: string };
  /** Çizime yeni bir vertex (nokta) eklendiğinde yayılır. */
  "draw:vertex": {
    readonly tool: DrawTool;
    readonly index: number;
    readonly coordinates: [number, number];
    readonly screenPos: { readonly x: number; readonly y: number };
  };
  /** Aktif çizimin önizleme noktası (fare hareketi) güncellendiğinde yayılır. */
  "draw:move": {
    readonly tool: DrawTool;
    readonly coordinates: [number, number];
    readonly screenPos: { readonly x: number; readonly y: number };
  };
  /** Bir şeklin çizimi tamamlandığında yayılır. */
  "draw:complete": { readonly shape: DrawnShape };
  /** Aktif çizim iptal edildiğinde (araç tamamen kapatıldığında) yayılır. */
  "draw:cancel": { readonly tool: DrawTool; readonly source?: string };
  /** Tamamlanmış bir şekil silindiğinde yayılır. */
  "draw:remove": { readonly id: string; readonly shape: DrawnShape };
}

export type DrawingManagerEventName = keyof DrawingManagerEventMap;

export type DrawingManagerEventPayload<K extends DrawingManagerEventName> =
  DrawingManagerEventMap[K];
