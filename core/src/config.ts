/** `configureTucbs()` ile ayarlanan, sayfa genelinde geçerli varsayılan yapılandırma. */
export interface TucbsGlobalConfig {
  /** Instance-seviyesi `apiKey` verilmemiş tüm `Map`/component'lerin miras alacağı global apiKey. */
  readonly apiKey?: string;
  /** ucbp-api kökü (validate, /layers, /ogc, analiz). Örn. https://dev-ucbp-api.turksat.com.tr/ucbp-api */
  readonly apiBase?: string;
  /**
   * HGM altlık getByUrl tabanı (`…/proxyservice/proxyservice/getByUrl?url=`).
   * `apiBase` ile aynı host olmak zorunda değil (lokal: 8094 vs 8086).
   */
  readonly proxyBase?: string;
}

interface GlobalConfigState {
  apiKey: string | undefined;
  apiBase: string | undefined;
  proxyBase: string | undefined;
  configured: boolean;
  readonly refreshers: Set<() => void>;
}

// (4c) Durum globalThis uzerinde, Symbol.for() ile anahtarlanmis, non-enumerable
// bir slotta tutulur -- SADE bir modul-kapanisi (`let globalApiKey`) DEGIL.
// Neden: @tucbs/core sayfada birden fazla bundle/import-map girisinden
// (ör. micro-frontend, ayri versiyon) yuklenirse, her kopya kendi AYRI modul
// kapanisina sahip olur ve configureTucbs() sadece cagrildigi kopyayi
// etkiler -- Symbol.for() AYNI string anahtarli her cagrida AYNI symbol'u
// dondurdugu icin, farkli bundle kopyalari bile ayni slota erisir (bkz
// project_ucbp_api_configuretucbs_4risk_kapatma_arastirma). Symbol
// anahtari jenerik DOM/JSON taramasiyla GORULEMEZ (Object.getOwnPropertySymbols
// bilmeden erisilemez) -- closure kadar "sifir efor" degil ama yine de
// otomatik bot taramasina karsi dayanikli.
const GLOBAL_STATE_SLOT = Symbol.for("@tucbs/core/globalConfigState");

function getState(): GlobalConfigState {
  const registry = globalThis as unknown as Record<symbol, GlobalConfigState | undefined>;
  let state = registry[GLOBAL_STATE_SLOT];
  if (!state) {
    state = {
      apiKey: undefined,
      apiBase: undefined,
      proxyBase: undefined,
      configured: false,
      refreshers: new Set(),
    };
    Object.defineProperty(globalThis, GLOBAL_STATE_SLOT, {
      value: state,
      enumerable: false,
      configurable: false,
      writable: false,
    });
  }
  return state;
}

/**
 * `@tucbs/core`'a herhangi bir `Map`/component oluşturulmadan ÖNCE, uygulamanın
 * en başında bir kez çağrılır -- sonraki tüm `Map` instance'ları (ve component'ler)
 * apiKey vermezse bu değeri miras alır. Instance-seviyesi `apiKey` (component
 * attribute'u veya `Map` constructor options'u) verilirse HER ZAMAN bunu ezer.
 *
 * (4a) Zaten farkli bir degerle configured edilmisse ve TEKRAR farkli bir
 * degerle cagrilirsa, kazara/gozden-kacan cift-configureTucbs() cagrilarini
 * (ör. iki ayri init script'i) devtools'ta gorunur kilmak icin console.warn
 * basar -- bu bir guvenlik kontrolu DEGIL (ayni ayricalikta calisan bir
 * script/XSS payload'i bu uyariyi bypass edebilir), sadece gelistirme-zamani
 * hata yakalama.
 *
 * (4b) Deger degistiginde, HALIHAZIRDA olusturulmus ve global'e bagimli
 * (kendi apiKey'i verilmemis) `Map` instance'lari `registerApiKeyRefresh()`
 * ile kayitli callback'leri araciligiyla ANINDA guncellenir -- rotasyon
 * sayfa yenilemeyi beklemez.
 *
 * @example
 * ```ts
 * import { configureTucbs } from "@tucbs/core";
 *
 * configureTucbs({
 *   apiKey: "YOUR_API_KEY",
 *   apiBase: "https://dev-ucbp-api.turksat.com.tr/ucbp-api",
 *   proxyBase: "https://dev-ucbp-api.turksat.com.tr/proxyservice/proxyservice/getByUrl?url=",
 * });
 * ```
 */
export function configureTucbs(config: TucbsGlobalConfig): void {
  const state = getState();
  if (config.apiBase !== undefined) {
    const trimmed = config.apiBase.trim().replace(/\/+$/, "");
    state.apiBase = trimmed || undefined;
    state.configured = true;
  }
  // Tile kapısı apiBase’ten türetilmez (lokal farklı port). Demo main.js buradan verir.
  if (config.proxyBase !== undefined) {
    const trimmed = config.proxyBase.trim();
    state.proxyBase = trimmed || undefined;
    state.configured = true;
  }
  if (config.apiKey === undefined) {
    if (state.configured) {
      state.refreshers.forEach((refresh) => refresh());
    }
    return;
  }
  // Uyari yalniz DAHA ONCE bir apiKey atanmissa ve yenisi farkliysa basilir.
  // ESKIDEN kosul `state.configured` idi; apiBase/proxyBase dallari da bu
  // bayragi true yaptigi icin apiKey'in ILK atamasi (ör. tek cagrida
  // { apiBase, apiKey }, yukaridaki @example dahil) yanlislikla uyariyordu.
  if (state.apiKey !== undefined && config.apiKey !== state.apiKey) {
    console.warn(
      '[@tucbs/core] configureTucbs() daha once farkli bir apiKey ile cagrilmisti; deger degistirildi. ' +
        "Bu beklenmiyorsa sayfada birden fazla script'in ayni fonksiyonu cagirdigini kontrol edin.",
    );
  }
  state.apiKey = config.apiKey;
  state.configured = true;
  state.refreshers.forEach((refresh) => refresh());
}

/** Map.ts / defaults icin — runtime configureTucbs({ apiBase }) oncelikli. */
export function getGlobalApiBase(): string | undefined {
  return getState().apiBase;
}

/** Map.ts / defaults icin — runtime configureTucbs({ proxyBase }) oncelikli. */
export function getGlobalProxyBase(): string | undefined {
  return getState().proxyBase;
}

/** Map.ts'in ic kullanimi icindir -- disariya export edilmez. */
export function getGlobalApiKey(): string | undefined {
  return getState().apiKey;
}

/**
 * (4b) `Map.ts` tarafindan, kendi apiKey'i verilmemis (global'e bagimli)
 * instance'lar icin kullanilir -- `configureTucbs()` sonraki bir cagriyla
 * degeri degistirdiginde bu callback tetiklenir. `TucbsMapPreview.ts`
 * (`@tucbs/components`) tarafindan da AYNI sebeple kullanilir: apiKey
 * (instance veya global) hicbir Lit property'sini DEGISTIRMEDEN sonradan
 * gecerli hale gelebilir (orn. `configureTucbs()` gec cagrilirsa) -- bu
 * durumda Lit'in kendi reaktivite sistemi (updated()/changed.has(...))
 * HABERSIZ kalir, bu registry TEK canli bildirim mekanizmasidir. Donen
 * fonksiyon kaydi KALDIRIR -- cagiran tarafin kendi destroy/deactivate
 * yasam dongusunde cagrilmali, aksi halde destroy edilmis instance'lar
 * registry'de sonsuza dek tutulup bellek sizintisina yol acar.
 *
 * @example
 * ```ts
 * import { registerApiKeyRefresh } from "@tucbs/core";
 *
 * const unregister = registerApiKeyRefresh(() => {
 *   console.log("apiKey güncellendi");
 * });
 * // ... instance destroy edilirken:
 * unregister();
 * ```
 */
export function registerApiKeyRefresh(fn: () => void): () => void {
  const { refreshers } = getState();
  refreshers.add(fn);
  return () => refreshers.delete(fn);
}
