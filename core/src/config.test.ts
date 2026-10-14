// KARAKTERIZASYON TESTLERI -- configureTucbs() (global apiKey/apiBase/proxyBase).
// "Daha once farkli bir apiKey" uyarisi duzeltilmeden ONCE mevcut davranisi
// dondurmek icin yazildi (TUCBS1-1402). ESKIDEN uyari apiKey'in ILK atamasinda
// da basiliyordu: kosul `state.configured`'a bakiyor, apiBase/proxyBase dallari
// da bu bayragi true yapiyordu (595231656e'den beri). O davranisi donduran uc
// test "BILINEN:" on ekini tasiyordu; duzeltmeyle beklentileri cevrildi.
import { afterEach, beforeEach, describe, expect, it, vi, type MockInstance } from "vitest";
import {
  configureTucbs,
  getGlobalApiBase,
  getGlobalApiKey,
  getGlobalProxyBase,
  registerApiKeyRefresh,
} from "./config.js";

const API_BASE = "https://dev-ucbp-api.turksat.com.tr/ucbp-api";
const PROXY_BASE = "https://dev-ucbp-api.turksat.com.tr/proxyservice/proxyservice/getByUrl?url=";
const KEY_A = "key-a";
const KEY_B = "key-b";

interface ConfigStateForTest {
  apiKey: string | undefined;
  apiBase: string | undefined;
  proxyBase: string | undefined;
  configured: boolean;
  refreshers: Set<() => void>;
}

/**
 * Global durum globalThis'te silinemez (configurable:false) bir Symbol.for
 * slotunda; her test ONCESI alanlari bastan sifirlanir. getGlobalApiKey()
 * slot henuz yoksa olusturur.
 */
function resetGlobalConfig(): void {
  getGlobalApiKey();
  const slot = Symbol.for("@tucbs/core/globalConfigState");
  const state = (globalThis as unknown as Record<symbol, ConfigStateForTest>)[slot]!;
  state.apiKey = undefined;
  state.apiBase = undefined;
  state.proxyBase = undefined;
  state.configured = false;
  state.refreshers.clear();
}

const REPEAT_WARNING = "configureTucbs() daha once farkli bir apiKey ile cagrilmisti";

let warnSpy: MockInstance<typeof console.warn>;
const repeatWarnings = () =>
  warnSpy.mock.calls.filter(([message]) => String(message).includes(REPEAT_WARNING));

beforeEach(() => {
  resetGlobalConfig();
  warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
  resetGlobalConfig();
});

describe("configureTucbs -- tekrar uyarisi (karakterizasyon)", () => {
  it("yalniz apiKey ile ilk cagri uyari vermez", () => {
    configureTucbs({ apiKey: KEY_A });
    expect(repeatWarnings()).toHaveLength(0);
  });

  it("ayni apiKey ile tekrar cagri uyari vermez", () => {
    configureTucbs({ apiKey: KEY_A });
    configureTucbs({ apiKey: KEY_A });
    expect(repeatWarnings()).toHaveLength(0);
  });

  it("farkli bir apiKey ile tekrar cagri (rotasyon) bir kez uyarir", () => {
    configureTucbs({ apiKey: KEY_A });
    configureTucbs({ apiKey: KEY_B });
    expect(repeatWarnings()).toHaveLength(1);
  });

  it("onceki apiKey'den sonra apiBase ile gelen farkli apiKey de uyarir", () => {
    configureTucbs({ apiKey: KEY_A });
    configureTucbs({ apiBase: API_BASE, apiKey: KEY_B });
    expect(repeatWarnings()).toHaveLength(1);
  });

  it("tek cagrida apiBase + apiKey (ilk atama) uyari vermez", () => {
    configureTucbs({ apiBase: API_BASE, apiKey: KEY_A });
    expect(repeatWarnings()).toHaveLength(0);
  });

  it("once apiBase, sonra ilk apiKey uyari vermez", () => {
    configureTucbs({ apiBase: API_BASE });
    configureTucbs({ apiKey: KEY_A });
    expect(repeatWarnings()).toHaveLength(0);
  });

  it("once proxyBase, sonra ilk apiKey uyari vermez", () => {
    configureTucbs({ proxyBase: PROXY_BASE });
    configureTucbs({ apiKey: KEY_A });
    expect(repeatWarnings()).toHaveLength(0);
  });
});

describe("configureTucbs -- degerler ve yenileme (karakterizasyon)", () => {
  it("tek cagrida verilen uc deger de atanir; apiBase sonundaki / kirpilir", () => {
    configureTucbs({ apiKey: KEY_A, apiBase: `  ${API_BASE}//  `, proxyBase: ` ${PROXY_BASE} ` });
    expect(getGlobalApiKey()).toBe(KEY_A);
    expect(getGlobalApiBase()).toBe(API_BASE);
    expect(getGlobalProxyBase()).toBe(PROXY_BASE);
  });

  it("bos apiBase ve proxyBase undefined'a doner", () => {
    configureTucbs({ apiBase: API_BASE, proxyBase: PROXY_BASE });
    configureTucbs({ apiBase: "  ", proxyBase: "" });
    expect(getGlobalApiBase()).toBeUndefined();
    expect(getGlobalProxyBase()).toBeUndefined();
  });

  it("uyari verse de yeni apiKey atanir", () => {
    configureTucbs({ apiKey: KEY_A });
    configureTucbs({ apiKey: KEY_B });
    expect(getGlobalApiKey()).toBe(KEY_B);
  });

  it("apiKey verilince kayitli haritalar yenilenir; kayit kaldirilinca yenilenmez", () => {
    const refresh = vi.fn();
    const unregister = registerApiKeyRefresh(refresh);
    configureTucbs({ apiKey: KEY_A });
    expect(refresh).toHaveBeenCalledTimes(1);

    unregister();
    configureTucbs({ apiKey: KEY_B });
    expect(refresh).toHaveBeenCalledTimes(1);
  });

  it("yalniz apiBase verilince de haritalar yenilenir", () => {
    const refresh = vi.fn();
    registerApiKeyRefresh(refresh);
    configureTucbs({ apiBase: API_BASE });
    expect(refresh).toHaveBeenCalledTimes(1);
  });

  it("bos yapilandirma ({}) ilk cagride hicbir sey yenilemez", () => {
    const refresh = vi.fn();
    registerApiKeyRefresh(refresh);
    configureTucbs({});
    expect(refresh).not.toHaveBeenCalled();
    expect(getGlobalApiKey()).toBeUndefined();
  });
});
