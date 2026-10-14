import type {
  ImageryLayer,
  TileProviderError,
  UrlTemplateImageryProvider,
  Viewer,
} from "cesium";
import type { BasemapId, BasemapStatus } from "../types/index.js";

// setBasemap() basemap'i istedikten sonra, HGM/Turksat proxy'sinden bu sure
// icinde ne basari ne hata sinyali gelmezse dunya goruntusu yedegi (bkz
// watchBasemap) devreye girer. Amac: HGM normalde (saglikli agda) birkac
// saniye icinde yanit veriyorken yedegi HIC decode etmemek (bkz oradaki
// yorum), ama HGM'in gozlemlenen "bazen >1 dakika" gecikmesinde kullaniciyi
// bombos/su rengi bir globe ile bas basa BIRAKMAMAK.
const FALLBACK_DELAY_MS = 3000;
// watchBasemap()'teki onError, TEK bir tile hatasinda hemen "erisilemiyor"
// karari vermez -- altlik haritalar arasinda HIZLICA gezinirken proxy'nin
// bir anlik burst'te (birden fazla basemap'in tile'lari nerdeyse ayni anda
// istendiginde) tek bir istegi reddetmesi GERCEK bir kesinti degildir
// (kullanici bildirimi: "HGM'e normalde erisebiliyorum ama altlik haritalar
// arasinda gezinirken bir anda 'Erişilemiyor' uyarısı geldi, ne alaka").
// Cesium'un kendi TileProviderError.retry mekanizmasindan (bkz
// packages/engine/Source/Scene/ImageryLayer.js _requestImagery/failure2)
// yararlanip bu kadar deneme hakki taniriz; SADECE hepsi de basarisiz
// olursa nihai/kalici bir hata olarak kabul edilir.
const BASEMAP_ERROR_RETRY_LIMIT = 2;
// watchBasemap()'in UCUNCU/son-care yolu: HGM'e HIC ag yolu yoksa (ör. VPN
// kapaliyken -- kullanici bildirimi: "VPN ile bağlı olmadığım için Altlık
// Haritalar'a erişememem lazımken gayet tıklayabiliyorum, çalışmıyor tabii
// ki") istekler duzgun bir HTTP hatasi/timeout ile HIZLICA basarisiz OLMAZ,
// bazen cok daha uzun sure (TCP/DNS baglanti zaman asimi) "askida" kalir --
// bu da onError'un BASEMAP_ERROR_RETRY_LIMIT deneme hakkini (her biri AYNI
// uzun askida-kalma suresini tekrar bekleyerek) tuketmesini de gecikilir.
// O sureye kadar secim gridi YANLISLIKLA etkin/tiklanabilir kalirdi. Bu
// yuzden "hicbir sey (ne basari ne hata) BASEMAP_UNAVAILABLE_DELAY_MS
// icinde gerceklesmezse artik kesin basarisizlik kabul edilir" seklinde bir
// GUVENLIK AGI eklenir -- FALLBACK_DELAY_MS'ten (sadece gorsel, alarm YOK)
// bilerek COK daha uzun tutulur (hizli-gezinme sirasindaki gecici blip'lerle
// KARISMASIN diye), ama kullaniciyi sonsuza kadar "aktif ama calismiyor"
// bir secim gridiyle de BASBASA BIRAKMAZ.
const BASEMAP_UNAVAILABLE_DELAY_MS = 10000;

// Map.watchBasemap'in (Adim 1, GC-06) saf tasimasi -- bkz
// project_ucbp_api_god_component_map_adim1_basemapwatcher. deps, Map'in
// KENDI wrapper metodlarina isaret eder (ham LayerManager'a degil, diger
// sibling-module DI modulleriyle -- OgcLayerFactory/CameraHighlight -- ayni
// desen).
export interface BasemapWatcherDeps {
  ensureFallbackBasemap(): void;
  clearFallbackBasemap(): void;
  removeBasemapLayer(): void;
  emit(
    event: "basemap:error" | "basemap:recovered",
    payload: { id: BasemapId },
  ): void;
  setStatus(status: BasemapStatus): void;
  isCurrentGeneration(generation: number): boolean;
}

// Basemap'in ONCE HGM'e verdigimiz sure icinde yanit verip vermedigini,
// sonra da NIHAI sonucunu izler:
//  0) BEKLEME: FALLBACK_DELAY_MS icinde HGM ne basarili ne basarisiz
//     olursa (ör. yavas/soguk baslangic, ya da altlik haritalar arasinda
//     hizlica gezinirken proxy'nin bir anlik yavaslamasi -- gozlemlenen
//     gercek durum: bazen 1 dakikayi asiyor), dunya goruntusu yedegi (bkz
//     ensureFallbackBasemap) devreye girer -- bu NIHAI bir karar DEGILDIR,
//     HGM hala basarili olabilir, sadece kullanici bu sure boyunca
//     bombos/su rengi bir globe GORMESIN diye gecici bir gorsel saglar.
//     "basemap:error" BURADA YAYILMAZ -- SADECE gorsel bir onlem,
//     kullaniciya "erisilemiyor" BANNER'I gosterilmez/secim grid'i devre
//     disi BIRAKILMAZ.
//  1) BASARI: bu provider'in requestImage() isteklerinden EN AZ BIRI
//     basariyla donerse (HGM gercekten tile verdi; baska katmanlarin
//     tile'lari sayilmaz) yedek (gosteriliyorsa) kaldirilir.
//  2) HATA: provider.errorEvent tetiklenirse HEMEN pes edilmez --
//     BASEMAP_ERROR_RETRY_LIMIT kadar tekrar denemesi hakki tanindiktan
//     SONRA hala basarisizsa (HGM/Turksat proxy'sine gercekten
//     erisilemiyor demektir) bozuk/bos basemap katmani kaldirilir, yedek
//     gosterilir VE tuketicinin (ör. TucbsBasemapPicker) acik bir "altlik
//     harita su an kullanilamiyor" durumu gosterebilmesi icin event yayilir.
//  3) GUVENLIK AGI: BASEMAP_UNAVAILABLE_DELAY_MS icinde ne 1 ne 2
//     gerceklesirse (ör. AG YOLU hic yoksa -- VPN kapali -- istekler
//     duzgun bir hata/timeout ile HIZLICA sonuclanmayabilir, bkz o
//     sabitin yorumu) ayni "kesin basarisizlik" sonucu ZORLA uygulanir --
//     "basemap:error" 2 VEYA 3'ten hangisi ONCE tetiklenirse ondan yayilir.
// HANGISI ONCE gerceklesirse (1, 2 veya 3) o kazanir ("handled" bayragi),
// NIHAI sonuc SADECE bir kez belirlenir; 0 numarali bekleme herhangi bir
// zamanda -- digerlerinden once VEYA sonra -- ayri ayri gerceklesebilir.
//
// Cagiran (Map.setBasemap), dondurulen stop() fonksiyonunu saklayip
// setBasemap()'in bir sonraki cagrisinda VE destroy()'da cagirir (ML-02 +
// dinleyici birikimi duzeltmesi, bkz Adim 1 Faz 3) -- bu modulun kendisi
// bunu ZORLAMAZ, sadece imkanini saglar.
export function watchBasemap(
  viewer: Viewer,
  deps: BasemapWatcherDeps,
  generation: number,
  basemapId: BasemapId,
  imageryLayer: ImageryLayer,
  provider: UrlTemplateImageryProvider,
): () => void {
  let handled = false;
  // stopWatching() sonrasi (yeni set()/destroy) bu provider'in gec gelen
  // tile'lari ARTIK basari sinyali uretmemeli -- provider.requestImage sarmalayicisi
  // geri alinamadigi icin bayrakla bastirilir.
  let stopped = false;

  // eslint-disable-next-line no-restricted-syntax -- stopWatching() iki zamanlayiciyi da clearTimeout ile temizler.
  const fallbackTimer = window.setTimeout(() => {
    if (handled || !deps.isCurrentGeneration(generation)) return;
    deps.ensureFallbackBasemap();
  }, FALLBACK_DELAY_MS);

  // Bkz BASEMAP_UNAVAILABLE_DELAY_MS yorumu: onError'un retry dongusu de
  // dahil hicbir sey bu sureye kadar sonuclanmazsa (ne recovered ne
  // kesin hata) artik kesin basarisizlik kabul edilir -- HGM'e AG YOLU
  // bile yoksa (VPN kapali) istekler duzgun/hizli bir HTTP hatasi
  // vermeden cok uzun sure askida kalabiliyor.
  // eslint-disable-next-line no-restricted-syntax -- stopWatching() iki zamanlayiciyi da clearTimeout ile temizler.
  const unavailableTimer = window.setTimeout(() => {
    if (handled || !deps.isCurrentGeneration(generation)) return;
    handled = true;
    stopWatching();
    deps.setStatus("unavailable");
    deps.removeBasemapLayer();
    deps.ensureFallbackBasemap();
    deps.emit("basemap:error", { id: basemapId });
  }, BASEMAP_UNAVAILABLE_DELAY_MS);

  const stopWatching = (): void => {
    stopped = true;
    window.clearTimeout(fallbackTimer);
    window.clearTimeout(unavailableTimer);
    provider.errorEvent.removeEventListener(onError);
  };

  const onError = (error: TileProviderError): void => {
    if (handled) return;
    // Kullanici bu sirada baska bir basemap'e gecmisse (bu artik guncel
    // setBasemap() cagrisi degilse) yapilacak bir sey yok.
    if (!deps.isCurrentGeneration(generation)) return;
    if (!viewer.imageryLayers.contains(imageryLayer)) return;

    // TEK bir tile hatasinda HEMEN pes etmek yerine (bkz
    // BASEMAP_ERROR_RETRY_LIMIT yorumu) Cesium'un kendi retry
    // mekanizmasindan yararlanilir -- `error.retry = true` ImageryLayer'a
    // AYNI tile'i tekrar istemesini soyler (bkz Cesium ImageryLayer.js
    // _requestImagery/failure2). Retry hakki bitmeden "handled" YAPILMAZ.
    if (error.timesRetried < BASEMAP_ERROR_RETRY_LIMIT) {
      error.retry = true;
      return;
    }

    handled = true;
    stopWatching();
    deps.setStatus("unavailable");
    deps.removeBasemapLayer();
    deps.ensureFallbackBasemap();
    // "basemap:error" BURADA VE unavailableTimer'da (retry hakki da
    // tukendikten SONRA, gercekten kesin basarisizlik anlasilinca) yayilir
    // -- bkz watchBasemap'in ust yorumundaki path 2/3 ayrimi.
    deps.emit("basemap:error", { id: basemapId });
  };

  // WHY (globe.tileLoadProgressEvent DEGIL, provider'in KENDI istegi): bu
  // gozlemin amaci "HGM servisi CEVAP VERIYOR mu" sorusunu cevaplamak (bkz
  // kullanici bildirimi: "Altlık haritalar yükleniyor mesajı haritaya
  // yüklenmesi değil, HGM servisinden gelip gelmediğinin anlaşılması için
  // düşünülmüştü"). tileLoadProgressEvent TUM katmanlarin (baska altlik,
  // veri katmani, kaldirilan eski altligin son tile'i) bekleyen sayisini
  // verir; oradaki bir azalma BU altligin tile'i geldigi anlamina GELMEZ ve
  // yanlis "recovered" uretiyordu. Bu yuzden SADECE bu provider'in
  // requestImage() promise'inin basariyla cozulmesi (HGM'den gercek bir tile
  // geldi) basari sayilir. Geri kalan karolar normal/asamali render olarak
  // arka planda yuklenmeye devam eder.
  const requestImage = provider.requestImage.bind(provider);
  provider.requestImage = (x, y, level, request) => {
    const result = requestImage(x, y, level, request);
    if (result && !handled && !stopped) result.then(onTileLoaded, () => undefined);
    return result;
  };

  const onTileLoaded = (): void => {
    if (handled || stopped) return;
    if (!deps.isCurrentGeneration(generation)) {
      stopWatching();
      return;
    }
    handled = true;
    stopWatching();
    deps.setStatus("ready");
    // "basemap:error" hic yayilmamis olsa bile (HGM zaten hizli yuklendi,
    // yedek hic gosterilmedi) recovered'i yaymak zararsizdir -- tuketici
    // (TucbsBasemapPicker) zaten "false" olan bir bayragi tekrar false
    // yapar. Yedek GOSTERILIYORSA burada kaldirilir.
    deps.clearFallbackBasemap();
    deps.emit("basemap:recovered", { id: basemapId });
  };

  provider.errorEvent.addEventListener(onError);

  return stopWatching;
}
