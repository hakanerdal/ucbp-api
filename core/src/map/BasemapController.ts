import {
  UrlTemplateImageryProvider,
  SingleTileImageryProvider,
  type ImageryLayer,
  type Request,
  type Viewer,
} from "cesium";

import { FALLBACK_WORLD_IMAGE } from "./FallbackWorldImagery.js";
import { watchBasemap } from "./BasemapWatcher.js";
import type { BasemapId, BasemapOptions, BasemapStatus } from "../types/index.js";

const BASEMAP_LAYER_ID = "__tucbs_basemap__";

// Cesium, kaldirilan bir ImageryLayer'in UCUSTAKI (ACTIVE) tile isteklerini
// IPTAL ETMEZ -- sunucu yanit verene (ya da 504 timeout'una) kadar RequestScheduler
// icinde slot tutmaya devam ederler (host basina maximumRequestsPerServer=18).
// HGM yavasken altlik haritalar arasinda hizlica gezinince (ör. Ortofoto'da
// zoom yapip hemen Siyasi'ye gecmek) eski altligin bekleyen istekleri slotlari
// doldurur, yeni altligin tile'lari HIC gonderilemez ve BASEMAP_UNAVAILABLE_DELAY_MS
// dolunca sahte bir "basemap:error" yayilir. Bu yuzden provider'in
// requestImage'i sarilip kullanilan Request'ler izlenir; dondurulen fonksiyon
// bunlari iptal eder (RequestScheduler.update() aktif olanlarin XHR'ini abort eder).
function trackProviderRequests(provider: UrlTemplateImageryProvider): () => void {
  // Request.cancel() Cesium'un tip tanimlarinda yok (ozel/dahili API) ama
  // RequestScheduler'in aktif istegi abort etmesi icin gereken tek yoldur.
  const pending = new Set<Request & { cancel(): void }>();
  const requestImage = provider.requestImage.bind(provider);
  provider.requestImage = (x, y, level, request) => {
    if (request) pending.add(request as Request & { cancel(): void });
    const result = requestImage(x, y, level, request);
    if (request && result) {
      const done = (): void => {
        pending.delete(request as Request & { cancel(): void });
      };
      result.then(done, done);
    }
    return result;
  };
  return () => {
    for (const request of pending) request.cancel();
    pending.clear();
  };
}

// Map'in basemap kumesinin (setBasemap/addFallbackBasemap/ensureFallbackBasemap/
// clearFallbackBasemap/resolveBasemapUrl/appendTucbsApiKeyQuery) saf tasimasi --
// bkz project_ucbp_api_map_kamera_kumesi_cameracontrol sonundaki 2. bolme adayi.
// BasemapWatcher/canvasCapture/cameraControl'den FARKLI olarak bu kume GERCEK
// state tasiyor (5 alan), bu yuzden saf fonksiyon degil kendi state'ini tutan
// bir SINIF -- diger sibling-module DI moduelleriyle (OgcLayerFactory/
// ShapeLayerBridge) ayni desen. deps, Map'in KENDI wrapper metodlarina isaret
// eder (ham LayerManager'a degil).
export interface BasemapControllerDeps {
  removeBasemapLayers(): void;
  addBasemapImageryLayer(
    id: string,
    basemapId: BasemapId,
    layer: ImageryLayer,
  ): void;
  removeLayer(id: string): void;
  emit(
    event: "basemap:error" | "basemap:recovered",
    payload: { id: BasemapId },
  ): void;
  getProxyBase(): string;
  getApiKey(): string | undefined;
}

export class BasemapController {
  private readonly viewer: Viewer;
  private readonly deps: BasemapControllerDeps;

  // setBasemap()'in her cagrisinda arttirilir -- bkz Map.ts'teki (tasima
  // oncesi) ayni alanin WHY yorumu, project_ucbp_api_god_component_map_adim1_basemapwatcher.
  private _basemapGeneration = 0;
  private _stopBasemapWatch: (() => void) | undefined;
  private _cancelBasemapRequests: (() => void) | undefined;
  private _basemapStatus: BasemapStatus = "ready";
  private _fallbackBasemapLayer: ImageryLayer | null = null;
  // ML-03: apiKey rotasyonu sonrasi mevcut altligi (varsa) ESKI anahtarla
  // birakmamak icin -- Map'in rotasyon geri cagrisi bunu (currentBasemapId
  // getter'i uzerinden) okuyup set()'i YENIDEN tetikler.
  private _currentBasemapId: BasemapId | undefined;

  constructor(viewer: Viewer, deps: BasemapControllerDeps) {
    this.viewer = viewer;
    this.deps = deps;
  }

  /** Altlık haritanın yükleme durumu (`"loading"`/`"ready"`/`"unavailable"`). */
  get status(): BasemapStatus {
    return this._basemapStatus;
  }

  /** ML-03: apiKey rotasyonu sonrasi mevcut altligi yeniden kurmak icin Map'e gerekli. */
  get currentBasemapId(): BasemapId | undefined {
    return this._currentBasemapId;
  }

  set(basemap?: BasemapOptions | BasemapId | null): void {
    // ONCEKI izleyiciyi durdur -- aksi halde onProgress dinleyicisi
    // uzun-omurlu globe.tileLoadProgressEvent uzerinde bir sonraki olay
    // gelene kadar takili kalirdi (dinleyici birikimi, altlik haritalar
    // arasinda hizli gezinmede birikir -- bkz project_ucbp_api_god_component_map_adim1_basemapwatcher).
    this._stopBasemapWatch?.();
    this._cancelBasemapRequests?.();
    this._cancelBasemapRequests = undefined;
    this.deps.removeBasemapLayers();
    this.clearFallbackBasemap();
    const generation = ++this._basemapGeneration;

    if (basemap === null || basemap === undefined) {
      // Basemap tamamen kaldirildi -- yuklenecek/beklenecek bir sey kalmadi.
      this._basemapStatus = "ready";
      this._currentBasemapId = undefined;
      return;
    }

    const resolved: BasemapOptions =
      typeof basemap === "string" ? { id: basemap } : basemap;

    if (!resolved.id) {
      this._basemapStatus = "ready";
      this._currentBasemapId = undefined;
      return;
    }

    // ONCE HGM/Turksat proxy'si denenir; dunya goruntusu yedegi (bkz
    // addFallbackBasemap) SADECE HGM kisa surede yanit VERMEZSE devreye
    // girer (bkz watchBasemap icindeki FALLBACK_DELAY_MS zamanlayicisi) --
    // HGM saniyeler icinde basariyla yukleniyorsa (normal durum) yedek
    // goruntu HIC eklenmez/decode edilmez (2700x5400'luk gomulu goruntuyu
    // gereksiz yere her sayfa yuklemesinde islemekten kacinir).
    this._basemapStatus = "loading";
    this._currentBasemapId = resolved.id;
    const tileUrl = this.resolveBasemapUrl(resolved);
    const provider = new UrlTemplateImageryProvider({ url: tileUrl });
    const cancelRequests = trackProviderRequests(provider);
    this._cancelBasemapRequests = cancelRequests;
    // index=0 ZORUNLU: verilmezse Cesium'un varsayilani katmani koleksiyonun
    // SONUNA (yani en USTE, en son eklenen/en gorunur sira) ekler. Harita
    // zaten WMS/WMTS/WCS/local vb. veri katmanlari iceriyorsa (bkz
    // LayerManager.addWMS/addWCS/... -- onlar KASITLI OLARAK index vermeden
    // ekleniyor, "ustte" olmalari dogru), altlik harita degistirilince
    // (set TEKRAR cagrilinca) yeni altlik o katmanlarin USTUNE biniyordu
    // (bkz kullanici bildirimi). addFallbackBasemap()'teki AYNI "0"
    // indexiyle tutarli: veri kaynagi ne olursa olsun (yerel dosya ya da
    // servis) altlik harita HER ZAMAN en altta (index 0) kalmali.
    const imageryLayer = this.viewer.imageryLayers.addImageryProvider(
      provider,
      0,
    );
    this.deps.addBasemapImageryLayer(BASEMAP_LAYER_ID, resolved.id, imageryLayer);

    // Adim 1 (GC-06, map/BasemapWatcher.ts): stop() DONDURULUR ve
    // saklanir -- bir sonraki set()/stop() cagrisinda kullanilir.
    this._stopBasemapWatch = watchBasemap(
      this.viewer,
      {
        ensureFallbackBasemap: () => this.ensureFallbackBasemap(),
        clearFallbackBasemap: () => this.clearFallbackBasemap(),
        removeBasemapLayer: () => {
          cancelRequests();
          this.deps.removeLayer(BASEMAP_LAYER_ID);
        },
        emit: (event, payload) => this.deps.emit(event, payload),
        setStatus: (status) => {
          this._basemapStatus = status;
        },
        isCurrentGeneration: (gen) => gen === this._basemapGeneration,
      },
      generation,
      resolved.id,
      imageryLayer,
      provider,
    );
  }

  // ML-02: basemap izleyicisi durdurulmazsa, harita bu zamanlayicilar
  // dolmadan (bkz BASEMAP_UNAVAILABLE_DELAY_MS) yok edilirse unavailableTimer
  // tetiklenip yok edilmis viewer'a dokunur ve Cesium "This object was
  // destroyed" hatasi firlatir -- Map.destroy() bunu cagirir.
  stop(): void {
    this._stopBasemapWatch?.();
    this._cancelBasemapRequests?.();
    this._cancelBasemapRequests = undefined;
  }

  // Paket icine gomulu, tum globe'u kaplayan gercek bir dunya goruntusunu
  // (NASA "Blue Marble", bkz FallbackWorldImagery.ts) TEK bir statik resim
  // olarak gercek katmanin ALTINA (index 0) ekler -- ag istegi icermez
  // (data URI), boylece HGM'in tile'lari geldikce ustunu kapatir; hic
  // gelmezse (dis servis kesintisi) goruntude kalir. UCUNCU TARAF bir tile
  // servisine (OSM/CARTO vb.) SESSIZCE fallback YAPILMAZ -- bu urun
  // kurumlara API olarak entegre edildigi icin (ticari/kurumsal yeniden
  // dagitim) hem OSM'in (operations.osmfoundation.org/policies/tiles) hem
  // CARTO'nun (carto.com/legal/basemap-terms) kullanim sartlari boyle bir
  // kullanimi yasakliyor/ayri ticari lisans gerektiriyor -- bkz proje
  // gecmisi. NASA icerikleri ABD federal hukumet uretimi olarak telife
  // tabi DEGIL (bkz FallbackWorldImagery.ts), sadece kaynak belirtme
  // (credit) bekleniyor. SADECE watchBasemap()'teki FALLBACK_DELAY_MS
  // zamanlayicisi (HGM'den zamaninda yanit gelmedi) veya onError (HGM
  // acikca basarisiz oldu) cagirir -- ensureFallbackBasemap() SARMALAYICISI
  // KULLANILMADAN dogrudan cagrilmamali (idempotent degil, ikinci
  // cagrida katmani ikiye katlar).
  private addFallbackBasemap(): void {
    // Cesium 1.143'te SingleTileImageryProvider'in duz constructor'i (fromUrl()
    // ASYNC factory'sinin aksine) tileWidth/tileHeight'i ARTIK otomatik
    // algilamiyor -- ikisi de verilmezse yapici SENKRON olarak DeveloperError
    // firlatiyor (bkz Check.typeOf.number) ve bu da cagiran fonksiyonu
    // sessizce yarida kesebilirdi (bkz ensureFallbackBasemap'teki try/catch).
    // FALLBACK_WORLD_IMAGE tam olarak 5400x2700 boyutunda uretildigi icin
    // (bkz FallbackWorldImagery.ts) burada sabit gecilebilir.
    const fallbackProvider = new SingleTileImageryProvider({
      url: FALLBACK_WORLD_IMAGE,
      tileWidth: 5400,
      tileHeight: 2700,
      credit: "NASA Earth Observatory (Blue Marble)",
    });
    const fallbackLayer = this.viewer.imageryLayers.addImageryProvider(
      fallbackProvider,
      0,
    );
    this._fallbackBasemapLayer = fallbackLayer;
  }

  // addFallbackBasemap()'in idempotent sarmalayicisi -- zaten gosteriliyorsa
  // ikinci bir katman EKLEMEZ. Yedegin KENDISINDEKI olasi bir hata (ör.
  // Cesium surum farkindan kaynakli bir yapici hatasi -- bkz bu sorunun daha
  // once tam da bu sekilde yasandigi proje gecmisi) cagiran tarafi
  // (zamanlayici veya onError) ASLA etkilememeli, o yuzden try/catch burada.
  //
  // NOT (basemap:error BURADA EMIT EDILMEZ): eskiden bu metod hem yedek
  // gorseli eklerdi HEM DE "basemap:error"i yayardi -- ama bu, SADECE
  // beklenen surede yanit gelmedigi (bkz FALLBACK_DELAY_MS, watchBasemap
  // path 0) durumda bile tuketiciye (TucbsBasemapPicker) aninda "erisilemiyor"
  // banner'i + secim grid'i devre disi gosterecek sekilde yanlis-pozitif
  // uretiyordu: altlik haritalar arasinda HIZLICA gezinirken HGM bazen
  // sadece YAVAS yanit veriyor (gercekten kesinti YOK, kullanici bildirimi:
  // "HGM'e normalde erisebiliyorum ama gezinirken bir anda uyari geldi, ne
  // alaka") -- 3sn icinde gelmemesi "kalici basarisizlik" ANLAMINA GELMEZ,
  // sadece "kullaniciyi bombos globe ile birakmamak icin gecici bir gorsel
  // goster" anlamina gelir. Bu yuzden "basemap:error" ARTIK SADECE gercekten
  // KESIN basarisizlik anlasilan tek yerden (onError, retry hakki da
  // tukendikten SONRA) yayilir -- bkz watchBasemap.
  private ensureFallbackBasemap(): void {
    if (this._fallbackBasemapLayer !== null) return;
    try {
      this.addFallbackBasemap();
    } catch (error) {
      console.warn("[tucbs-core] Basemap yedek goruntusu eklenemedi:", error);
    }
  }

  private clearFallbackBasemap(): void {
    if (this._fallbackBasemapLayer !== null) {
      this.viewer.imageryLayers.remove(this._fallbackBasemapLayer, true);
      this._fallbackBasemapLayer = null;
    }
  }

  /**
   * HGM altlık şablonu: proxyservice getByUrl. Cesium header taşımaz;
   * apiKey varsa kardeş query {@code tucbsapikey} (tile başına DB yok, proxy cache).
   * Kapı: `deps.getProxyBase()` (main.js `configureTucbs({ proxyBase })`, yoksa derleme yedeği).
   */
  private resolveBasemapUrl(basemap: BasemapOptions): string {
    const proxied = (path: string): string => {
      const proxyBase = this.deps.getProxyBase();
      const tile = `${proxyBase}${__TUCBS_ATLAS_BASE__}/${path}/{z}/{x}/{y}.png`;
      return this.appendTucbsApiKeyQuery(tile);
    };
    switch (basemap.id) {
      case "hgm-temel":
        return proxied("temel");
      case "hgm-ortofoto":
        return proxied("ortofotoservis");
      case "hgm-siyasi":
        return proxied("siyasi");
      case "hgm-yukseklik":
        return proxied("yukseklik");
      default:
        return basemap.id;
    }
  }

  /** getByUrl {@code url} paramına karışmadan tucbsapikey ekler; yoksa URL aynı. */
  private appendTucbsApiKeyQuery(url: string): string {
    const apiKey = this.deps.getApiKey();
    if (!apiKey) {
      return url;
    }
    const sep = url.includes("?") ? "&" : "?";
    return `${url}${sep}tucbsapikey=${encodeURIComponent(apiKey)}`;
  }
}
