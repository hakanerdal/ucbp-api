import type { InteractionManager, LayerManager, Map as TucbsMapInstance } from "@tucbs/core";

/** `TucbsMap`'in apiKey doğrulama durumu: `"none"` (apiKey verilmedi), `"pending"` (doğrulanıyor), `"ok"`, `"failed"`. */
export type ApiKeyAuthState = "none" | "pending" | "ok" | "failed";

/** {@link TucbsMap} host elementi — mapElementId ile bağlanan bileşenler için. */
export type TucbsMapElement = HTMLElement & {
  map?: TucbsMapInstance | null;
  layerManager?: LayerManager;
  interaction?: InteractionManager;
  apiKeyAuthState?: ApiKeyAuthState;
  // TucbsMap'in KENDI bildigi gercek apiKey'i hedefin write-only setter'ina
  // PUSH eder -- hedef bunu OKUYAMAZ, sadece TucbsMap "verir". Boylece yeni
  // bir okunabilir apiKey yuzeyi acilmaz (bkz TucbsMap.ts._grantApiKeyTo).
  _grantApiKeyTo?: (target: { apiKey: string }) => void;
};

/**
 * Bir `TucbsMap` host elementinin apiKey doğrulama durumunun kullanılabilir olup olmadığını kontrol eder.
 * @param mapEl - Kontrol edilecek `TucbsMap` host elementi.
 * @returns Durum `"none"` (apiKey gerekmiyor) veya `"ok"` ise `true`.
 */
export function isTucbsMapAuthUsable(mapEl: TucbsMapElement): boolean {
  const state = mapEl.apiKeyAuthState ?? "none";
  return state === "none" || state === "ok";
}

/**
 * api-key validate tamamlanınca (veya api-key yoksa hemen) callback çalışır.
 * Validate başarısızsa callback çağrılmaz.
 */
export function whenTucbsMapReady(
  mapEl: TucbsMapElement,
  onReady: (mapEl: TucbsMapElement) => void,
): void {
  const state = mapEl.apiKeyAuthState ?? "none";
  if (state === "failed") {
    return;
  }
  if (state === "ok" || (state === "none" && mapEl.map)) {
    onReady(mapEl);
    return;
  }

  const onReadyEvent = () => onReady(mapEl);
  mapEl.addEventListener("ready", onReadyEvent, { once: true });
  mapEl.addEventListener(
    "error",
    () => mapEl.removeEventListener("ready", onReadyEvent),
    { once: true },
  );
}

/** {@link bindMapByElementId} ile haritaya bağlanan araç bileşeninin gereken alanları. */
export interface MapByElementIdHost {
  /** Bağlanılan harita; property binding ile dışarıdan da atanabilir. */
  map: TucbsMapInstance | undefined;
  /** Bağlanılacak `tucbs-map` elementinin id'si. */
  readonly mapElementId: string;
}

/** {@link bindMapByElementId} seçenekleri: araca özgü uyarı metinleri ve zamanlaması. */
export interface MapByElementIdOptions {
  /** `"mapElementId" yok` uyarısının zamanlaması: `"raf"` bir kare ertelenir, `"sync"` hemen basılır. */
  readonly noIdTiming: "raf" | "sync";
  /** `mapElementId` ve `map` ikisi de yokken basılan uyarı metni. */
  readonly noIdMessage: string;
  /** `mapElementId` ile element bulunamadığında basılan uyarı metni. */
  readonly missingElementMessage: (mapElementId: string) => string;
}

/**
 * Araçların ortak uyarı metinlerini üretir.
 * @param tag - Bileşenin custom element tag'i (ör. `"tucbs-zoom-tool"`).
 * @param suffix - Bağlanamayınca bileşenin durumu: `"islevsiz"` (buton çalışmaz) veya `"gizli"` (bileşen görünmez).
 * @returns `noIdMessage` ve `missingElementMessage` alanları.
 */
export function standardMapBindingMessages(
  tag: string,
  suffix: "islevsiz" | "gizli",
): Pick<MapByElementIdOptions, "noIdMessage" | "missingElementMessage"> {
  return {
    noIdMessage: `[${tag}] "mapElementId" verilmedi ve "map" programatik olarak atanmadi; bilesen haritaya baglanamadigi icin ${suffix} kalacak.`,
    missingElementMessage: (mapElementId) =>
      `[${tag}] mapElementId="${mapElementId}" ile eslesen bir element bulunamadi; bilesen haritaya baglanamadigi icin ${suffix} kalacak.`,
  };
}

// Toolbar/app araclarinin (Zoom/Draw/Delete/Measure/GoToCoordinate/MapExport/
// AnalysisTool/BasemapPicker/SettingsTool/PrintTool/QualityBar) firstUpdated()
// icinde BIREBIR kopyaladigi "mapElementId ile haritaya baglan" blogunun tek
// kopyasi. whenTucbsMapReady'den FARKLI: apiKey dogrulama durumuna
// (apiKeyAuthState) BAKMAZ -- "failed" iken de baglanir; bu araclarin
// mevcut davranisi bu (bkz tools.mapBinding.characterization.test).

/**
 * Araç bileşenini `map` property'si ya da `mapElementId` üzerinden haritaya bağlar.
 * `map` zaten atanmışsa hiçbir şey yapmaz; aksi halde `mapElementId` ile eşleşen
 * `tucbs-map` elementinin haritasını atar, harita henüz hazır değilse elementin
 * `ready` olayını bir kez bekler. Bağlanamazsa `console.warn` ile uyarır.
 * @param host - Bağlanacak araç bileşeni.
 * @param options - Uyarı metinleri ve "mapElementId yok" uyarısının zamanlaması.
 */
export function bindMapByElementId(host: MapByElementIdHost, options: MapByElementIdOptions): void {
  // Senaryo 1: map property binding ile disaridan zaten atanmis (ör. tucbs-toolbar/tucbs-app).
  if (host.map) return;

  if (!host.mapElementId) {
    // Arac tucbs-toolbar/tucbs-app icinde ".map" property binding'i ile de
    // kullanilabiliyor (Senaryo 1) -- o durumda parent'in kendi haritasi
    // henuz asenkron cozulmemisken ilk render'da hem "map" hem
    // "mapElementId" bos olabilir, birkac mikro-gorev sonra parent
    // ".map"i atayacaktir. Senkron uyarmak YANLIS-POZITIF uretiyordu; bir
    // kare ertelenip TEKRAR kontrol edilir -- gercekten unutulmus
    // standalone kullanimda uyari hala basilir, sadece bir kare gec.
    // TucbsSettingsTool/TucbsPrintTool bu ertelemeyi hic almamisti
    // ("sync") -- mevcut davranislari korunuyor.
    if (options.noIdTiming === "sync") {
      console.warn(options.noIdMessage);
      return;
    }
    // TimerBag BILEREK kullanilmaz: host burada bir Lit bileseni degil, sade
    // bir arayuz (MapByElementIdHost, 11 cagiran) -- TimerBag icin host'a
    // addController sarti eklemek tum cagiranlari etkiler. Karenin tek isi bir
    // uyari basmak; bilesen o kare icinde kalkarsa en kotu ihtimalle gereksiz
    // bir uyari gorunur.
    // eslint-disable-next-line no-restricted-syntax -- host Lit bileseni degil; tek seferlik uyari karesi (bkz ustteki yorum).
    requestAnimationFrame(() => {
      if (host.map) return;
      console.warn(options.noIdMessage);
    });
    return;
  }

  // Senaryo 2: "mapElementId" ile tucbs-map elementinin id'si verilmis.
  const mapEl = document.getElementById(host.mapElementId) as TucbsMapElement | null;
  if (!mapEl) {
    console.warn(options.missingElementMessage(host.mapElementId));
    return;
  }

  if (mapEl.map) {
    // 2A: harita zaten hazir, map dogrudan okunabiliyor.
    host.map = mapEl.map;
  } else {
    // 2B: harita henuz hazir degil, tucbs-map'in "ready" event'i beklenir.
    mapEl.addEventListener(
      "ready",
      () => {
        if (mapEl.map) host.map = mapEl.map;
      },
      { once: true },
    );
  }
}
