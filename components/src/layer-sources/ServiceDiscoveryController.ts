import type { ReactiveController, ReactiveControllerHost } from "lit";
import {
  buildCapabilitiesUrl,
  getCapabilities,
  parseCapabilities,
  detectServiceType,
  parseWmsTiffFormat,
  parseWcsTiffFormat,
  fetchWcsCoverageExtents,
} from "@tucbs/core";
import type { LayerManager, DiscoveredItem } from "@tucbs/core";
import { classifyDiscoveryError, discoveryErrorMessage, type DiscoveryFailure } from "./serviceDiscoveryErrors.js";
import { showToast } from "../shared/ui/toast.js";
import { beginBusy, endBusy } from "../shared/util/busy.js";
import { AsyncGeneration } from "../shared/util/AsyncGeneration.js";

// God component refactor Faz 3.3: TucbsServiceUpload'un servis kesfi
// (eski _fetchCapabilities, ~140 satir) ve nesil sayaci buraya tasindi;
// davranis DEGISMEDI. Bilesen durumuna yazma DiscoverySink uzerinden ve
// eskisiyle BIREBIR AYNI sirada yapilir -- ornegin WCS'te katman listesi
// ve TIFF formati zarf (DescribeCoverage) isteginden ONCE yazilir, zarflar
// gelince liste kutularla yeniden yazilir (bkz
// TucbsServiceUpload.characterization.test, "Faz 3.3" describe'i).
// layerManager bir deger olarak degil fonksiyon olarak alinir: eskisi gibi
// HER istekten hemen once yeniden okunur (kesif surerken "ready" ile
// baglanan yonetici WCS zarf isteginde kullanilir).

// OGC servis turu basina desteklenen surumler, EN GUNCELDEN EN ESKIYE.
// Kullanici sadece cIplak servis adresini (orn. https://.../cgi-bin/wms)
// girebilir; SERVICE/REQUEST/VERSION biz ekleriz ve bu listedeki her
// surumu sirayla deneriz — ilk katman/tip bulunan surum kullanilir (bkz.
// ServiceDiscoveryController.discover). Boylece sunucunun hangi surumu desteklediğini
// kullanicinin bilmesine/URL'ye elle eklemesine gerek kalmaz.
const SERVICE_VERSIONS: Readonly<Record<string, readonly string[]>> = {
  WMS: ["1.3.0", "1.1.1", "1.1.0", "1.0.0"],
  WMTS: ["1.0.0"],
  WFS: ["2.0.2", "2.0.0", "1.1.3", "1.1.0", "1.0.0"],
  WCS: ["2.1.0", "2.0.1", "2.0.0", "1.1.2", "1.1.1", "1.1.0", "1.0.0"],
};

// GetCapabilities URL'si genelde ayni endpoint'i sorgu parametreleriyle
// (service=...&request=GetCapabilities) hedef alir; GetMap/GetFeature/
// GetCoverage istekleri de ayni endpoint'e farkli parametrelerle gider.
// LayerManager.add() kendi sorgu parametrelerini kurdugu icin burada sadece
// path'i (sorgu dizesi olmadan) veriyoruz.
export function baseServiceUrl(url: string): string {
  try {
    const parsed = new URL(url);
    return `${parsed.origin}${parsed.pathname}`;
  } catch {
    return url.split("?")[0] ?? url;
  }
}

/** Servis keşfinin bileşen durumuna yazdığı yer (sırası korunarak çağrılır). */
export interface DiscoverySink {
  /** O an bağlı `LayerManager` (yoksa doğrudan GetCapabilities yolu kullanılır); her istekten önce okunur. */
  layerManager(): LayerManager | undefined;
  /** Önceki keşfin sonuçlarını temizler (bileşenin `_resetDiscovery`'si). */
  resetDiscovery(): void;
  /** Keşif isteğinin sürüp sürmediğini yazar. */
  setDiscovering(discovering: boolean): void;
  /** Kullanıcıya gösterilecek keşif hata mesajını yazar. */
  setError(message: string): void;
  /** Bulunan katmanları yazar. */
  setItems(items: DiscoveredItem[]): void;
  /** Sunucunun GeoTIFF uyumlu formatını (varsa) yazar. */
  setTiffFormat(format: string | undefined): void;
}

/**
 * OGC servis adresinden GetCapabilities ile katman keşfeden reaktif denetleyici;
 * yalnızca en son başlatılan keşfin sonucu yazılır.
 */
export class ServiceDiscoveryController implements ReactiveController {
  // Gercek hatalar plani H2.2: global mesgul overlay'i fareyi kilitler ama
  // klavyeyi kilitlemez -- kesif istegi surerken URL/tur degisebilir,
  // "sifirla"ya basilabilir ya da bilesen DOM'dan kaldirilabilir. Eskiden
  // _resetDiscovery() ekrani temizlese de SUREN istek bittiginde eski
  // yanit yeni forma yaziliyordu (eski adresin katmanlari yeni adresin
  // altinda, WMS yanitinin WFS ayristiricisiyla okunmasi, kopuk bilesende
  // WCS zarf istegi + uyari). _resetDiscovery() (invalidate) ve disconnectedCallback()
  // (hostDisconnected) nesli ilerletir; discover() her await'ten sonra kendi neslinin
  // hala guncel olup olmadigina bakar, degilse sonucu yazmadan ve kalan
  // surumleri denemeden cikar. endBusy() finally'de oldugu icin her
  // durumda cagrilir.
  private readonly generation = new AsyncGeneration();

  /**
   * @param host - Denetleyiciyi barındıran bileşen.
   * @param sink - Keşif sonuçlarının yazılacağı yer.
   */
  constructor(
    host: ReactiveControllerHost,
    private readonly sink: DiscoverySink,
  ) {
    host.addController(this);
  }

  /** Bileşen DOM'dan kaldırılınca süren keşfin sonucunu geçersiz kılar. */
  hostDisconnected(): void {
    this.invalidate();
  }

  /** Süren keşfin sonucunu geçersiz kılar (form değişince/sıfırlanınca). */
  invalidate(): void {
    this.generation.next();
  }

  // Kullanicinin girdigi cIplak servis adresi icin, bu servis turunun
  // desteklendigi bilinen TUM surumleri (en guncelden en eskiye) sirayla
  // dener; bir surum gercek katman/tip donduren ilk anda durur ("ilk
  // basarili sonuc yeterli"). Bir surum 0 sonuc donduruyorsa (sunucu o
  // surumu desteklemiyorsa genelde ServiceExceptionReport gibi Layer/
  // FeatureType/CoverageSummary icermeyen gecerli bir XML doner — hata
  // FIRLATMAZ, sadece bos gelir) bir sonraki surume gecilir. Servis turu
  // acikca UYUSMUYORSA (orn. WFS secilip bir WMS adresi girilmisse) hemen
  // durulur — versiyon degistirmek bu durumu duzeltmez.
  async discover(serviceType: string, serviceUrl: string): Promise<void> {
    const rawUrl = serviceUrl.trim();
    if (!rawUrl) {
      this.sink.setError("Servis adresi giriniz.");
      return;
    }
    // Faz 5c: kullanici cIplak bir temel adres YERINE hazir bir GetCapabilities
    // URL'si de yapistirabilir (ör. "...?SERVICE=WCS&REQUEST=GetCapabilities").
    // layerManager.getCapabilitiesDocument/getWcsCoverageExtents bu URL'i
    // resolveOgcProxyUrl ile bir `url=` parametresinin ICINE gomup proxy'liyor
    // -- rawUrl'in KENDI sorgu dizesi de bu gomulu degerin icinde tasindigi
    // icin, disaridan eklenen SERVICE/REQUEST/VERSION parametreleriyle AYNI
    // istekte IKI KEZ (biri gomulu/ilk, biri bizim eklediğimiz) tekrarlaniyor.
    // Sunucular (ör. service.geo.llv.li) bu durumda GOMULU/ILK degeri kazanan
    // sayiyor -- DescribeCoverage istegimiz bile REQUEST=GetCapabilities olarak
    // isleniyor, CoverageDescription hic bulunamiyor, katman sessizce global
    // (-180,-90,180,90) dikdortgene duşuyor (bkz kullanici bildirimi:
    // OI.OrthoimageCoverage2015 tum globe'u kapliyordu). baseServiceUrl()
    // (yukarida; bilesenin _addOneLayer'inin ZATEN kullandigi AYNI yardimci) sorgu dizesini
    // atip SADECE temiz temel adresi birakarak bu ikinci-katman celiskisini
    // onluyor -- candidateUrl (fallback URL gecerlilik kontrolu) ve
    // layerManager BAGLI DEGILKEN kullanilan fallback fetchWcsCoverageExtents
    // cagrisi ZATEN TEK katmanli (URLSearchParams.set() dogrudan hedef URL
    // uzerinde calisiyor, tekrarlamiyor) oldugu icin degistirilmedi.
    const discoveryBaseUrl = baseServiceUrl(rawUrl);

    this.sink.setDiscovering(true);
    // Servis bilgileri getirilirken arka planda diger bilesenlerle etkilesim
    // devam ETMEMELI (bkz kullanici bildirimi) -- global overlay tum sayfayi
    // kilitler; try/finally her erken return'de de endBusy() cagrilmasini
    // GARANTILER.
    beginBusy("Servis bilgileri getiriliyor…");
    this.sink.resetDiscovery();
    const generation = this.generation.next();

    try {
      const versions = SERVICE_VERSIONS[serviceType] ?? [];
      // Faz 6/4e: hata TIPINE gore ayri mesaj -- ONCEDEN (bkz asagidaki bos
      // catch) DNS/CORS/ag hatasi, sunucunun 4xx/5xx donmesi VE XML parse
      // hatasi AYNI sabit mesaja indiriliyordu ("Servis adresinden gecerli
      // bir yanit alinamadi"), kullanici hangisinin gerceklestigini hic
      // ogrenemiyordu. Dongudeki SON hata (tum surumler denendikten sonra)
      // saklanir -- her surum FARKLI bir sebeple basarisiz olabilir, ama son
      // deneme genelde en "guncel/olasi" sunucu davranisini yansitir.
      let lastError: DiscoveryFailure | undefined;

      for (const version of versions) {
        let candidateUrl: string;
        try {
          candidateUrl = buildCapabilitiesUrl(rawUrl, serviceType, version);
        } catch {
          this.sink.setError("Servis adresi geçerli bir URL değil.");
          return;
        }

        try {
          // ML-12 duzeltmesi: baglanmis bir LayerManager varsa istek onun
          // apiKey/proxy politikasindan (getCapabilitiesDocument) gecer --
          // boylece CORS izni olmayan (apiKey'e gore erisim veren) sunucular
          // artik burada da kesfedilebilir. LayerManager HENUZ baglanmamissa
          // (ör. mapElementId'nin "ready" event'i bu ana kadar gelmemis)
          // eskisiyle AYNI ciplak fetch'e (candidateUrl + authContext'siz
          // getCapabilities) duser -- kesif standalone kullanimda da
          // calismaya devam eder, sadece proxy/apiKey avantajini kaybeder.
          const manager = this.sink.layerManager();
          const doc = manager
            ? await manager.getCapabilitiesDocument(
                discoveryBaseUrl,
                serviceType as "WMS" | "WMTS" | "WFS" | "WCS",
                version,
              )
            : await getCapabilities(candidateUrl, undefined);
          if (!this.generation.isCurrent(generation)) return;
          const items = parseCapabilities(serviceType, doc);
          if (items.length > 0) {
            this.sink.setItems(items);
            if (serviceType === "WMS") {
              this.sink.setTiffFormat(parseWmsTiffFormat(doc));
            } else if (serviceType === "WCS") {
              this.sink.setTiffFormat(parseWcsTiffFormat(doc));
              // WCS'in GetCapabilities ozeti (<CoverageSummary>) bbox
              // TASIMAZ (bkz parseWcsCoverageEnvelope WHY yorumu) -- ayri bir
              // DescribeCoverage istegiyle TAMAMLANIR, aksi halde katmanlar
              // haritada/onizlemede varsayilan global rectangle'a yayilip
              // yanlis konumda gorunur (bkz kullanici bildirimi). Basarisiz
              // olursa (bkz o fonksiyonun catch'i) katmanlar sessizce eski
              // davranisa duser -- kesif akisinin genelini BLOKE ETMEZ.
              // ML-12/Faz 5b: bu istek de -- ana kesif istegiyle AYNI sekilde
              // -- layerManager baglanmissa proxy/apiKey'den gecer.
              const extentsManager = this.sink.layerManager();
              const extents = extentsManager
                ? await extentsManager.getWcsCoverageExtents(
                    discoveryBaseUrl,
                    items.map((item) => item.identifier),
                  )
                : await fetchWcsCoverageExtents(
                    rawUrl,
                    items.map((item) => item.identifier),
                  );
              if (!this.generation.isCurrent(generation)) return;
              if (extents.size > 0) {
                this.sink.setItems(
                  items.map((item) => {
                    const box = extents.get(item.identifier);
                    return box ? { ...item, geographicBoundingBox: box } : item;
                  }),
                );
              }
              // Faz 6/4f: bazi coverage'lar icin bbox HALA cozulemediyse
              // (ör. projekli bir CRS'in proj4 tanimi epsg.io'dan alinamadi --
              // bkz ogc/proj4Defs.ts'teki YENI console.warn, ya da sunucu
              // DescribeCoverage'ta boundedBy hic vermedi) katman(lar) YINE DE
              // eklenebilir kalir (BLOKE ETMEZ) ama kullanici ARTIK bunu
              // sessizce ogrenmek yerine gorunur bir uyariyla bilgilendirilir
              // -- ONCEDEN bu durum hicbir iz birakmadan global dikdortgene
              // duserdi.
              if (extents.size < items.length) {
                showToast(
                  "warning",
                  `${items.length - extents.size}/${items.length} katmanın tam konumu belirlenemedi; ` +
                    "bu katmanlar haritada geniş bir alanda görünebilir.",
                );
              }
            }
            return;
          }
          const detected = detectServiceType(doc);
          if (detected && detected !== serviceType) {
            this.sink.setError(
              `Bu adres bir ${detected} servisi gibi görünüyor. Servis türünü "${detected}" olarak değiştirip tekrar deneyin.`,
            );
            return;
          }
        } catch (err) {
          if (!this.generation.isCurrent(generation)) return;
          // Siniflandirma ve gerekcesi: bkz serviceDiscoveryErrors.ts.
          lastError = classifyDiscoveryError(err);
        }
      }

      this.sink.setError(discoveryErrorMessage(lastError));
    } finally {
      this.sink.setDiscovering(false);
      endBusy();
    }
  }
}
