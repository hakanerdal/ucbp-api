// @vitest-environment jsdom
//
// KARAKTERIZASYON TESTLERI -- God Component kilavuzu GC-03 (TucbsLayerList)
// Adim 3 SONRASI: "Yetkili Katmanlar" blogunun (apiKey ile GET /layers →
// sec → haritaya ekle + token URL goruntuleme) davranisini, artik bagimsiz
// bir bilesen olan <tucbs-authorized-layers> UZERINDE dogrudan test eder --
// bu, TucbsLayerList.authorizedLayers.characterization.test.ts'in Adim 3
// ONCESI (TucbsLayerList uzerinden) test ettigi AYNI davranisin, tasima
// sonrasi erisim yoluyla GUNCELLENMIS halidir (sonuclar/davranis AYNI).
//
// jsdom GEREKLI: gercek bir Lit custom element construct edilip shadowRoot'u
// okunuyor.
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import "./TucbsAuthorizedLayers.js";
import type { TucbsAuthorizedLayers } from "./TucbsAuthorizedLayers.js";
import type {
  AuthorizedLayerInfo,
  LayerManager,
  ManagedLayer,
} from "@tucbs/core";

interface FakeOptions {
  authorizedLayers?: AuthorizedLayerInfo[] | (() => Promise<AuthorizedLayerInfo[]>);
  onAdd?: (layerType: string, options: Record<string, unknown>) => void;
  addShouldFail?: (options: Record<string, unknown>) => boolean;
}

// GC-03 Adim 3 (Faz 7): canAddAuthorizedLayer/resolveAddOptions mantigi
// artik auth/ApiKeyPolicy.ts'te (core'un INTERNAL -- public export DEGIL,
// bkz kural 3) -- bu sahte LayerManager, o mantigin AYNISINI (saf
// kes-yapiştir, test amacli) burada taklit eder. Gercek davranis
// ApiKeyPolicy.test.ts'teki karakterizasyon testleriyle guvence altinda.
function resolveAuthorizedAddOptions(
  info: AuthorizedLayerInfo,
): { layerType: string; options: Record<string, unknown> } | null {
  const resolveOgcLayerName = (): string => {
    for (const raw of [info.ogcLayerName, info.katmanAdi]) {
      if (!raw) continue;
      const t = raw.trim();
      if (!t || t.toLowerCase() === "undefined" || t.toLowerCase() === "null") continue;
      return t;
    }
    return "";
  };
  const tur = (info.servisTuru || "").toUpperCase();
  const layerName = resolveOgcLayerName();
  if (!info.servisUrl?.trim() || !layerName) return null;
  if (tur === "WMTS" && !info.wmtsTileMatrixSet?.trim()) return null;
  if (tur !== "WMS" && tur !== "WFS" && tur !== "WMTS") return null;

  const id = `authorized-${info.id ?? `${info.servisTuru}|${info.servisUrl}|${info.ogcLayerName}`}-${Date.now()}`;
  const title = info.katmanAdi || layerName;
  if (tur === "WMS") return { layerType: "WMS", options: { id, title, url: info.servisUrl, layers: layerName } };
  if (tur === "WFS") return { layerType: "WFS", options: { id, title, url: info.servisUrl, typeName: layerName } };
  return {
    layerType: "WMTS",
    options: { id, title, url: info.servisUrl, layer: layerName, tileMatrixSetID: info.wmtsTileMatrixSet },
  };
}

// TucbsLayerList.authorizedLayers.characterization.test.ts'teki (Adim 3
// ONCESI yazilmis) AYNI yerel sahte LayerManager -- bkz o dosyanin WHY
// yorumu (paylasilan fakeLayerManager.ts fixture'i TucbsStyleEditor'a ozel).
function createFakeLayerManager(options: FakeOptions = {}): LayerManager {
  const fake = {
    getLayers: () => [] as ManagedLayer[],
    getAuthorizedLayers: async () => {
      if (typeof options.authorizedLayers === "function") {
        return options.authorizedLayers();
      }
      return options.authorizedLayers ?? [];
    },
    add: async (layerType: string, addOptions: Record<string, unknown>) => {
      if (options.addShouldFail?.(addOptions)) {
        throw new Error("ekleme basarisiz (test)");
      }
      options.onAdd?.(layerType, addOptions);
      return { id: addOptions.id } as ManagedLayer;
    },
    canAddAuthorizedLayer: (info: AuthorizedLayerInfo) => resolveAuthorizedAddOptions(info) !== null,
    addAuthorizedLayer: async (info: AuthorizedLayerInfo) => {
      const resolved = resolveAuthorizedAddOptions(info);
      if (!resolved) throw new Error("eksik servis bilgisi (test)");
      return fake.add(resolved.layerType, resolved.options);
    },
    on: (_event: string, _cb: (...args: unknown[]) => void) => {},
    off: (_event: string, _cb: (...args: unknown[]) => void) => {},
  };
  return fake as unknown as LayerManager;
}

function makeInfo(overrides: Partial<AuthorizedLayerInfo> = {}): AuthorizedLayerInfo {
  return {
    servisTuru: "WMS",
    servisUrl: "https://example.com/wms",
    ogcLayerName: "test:layer",
    katmanAdi: "Test Katmanı",
    ...overrides,
  };
}

// Private alan/metotlara erisim icin -- TucbsStyleEditor.characterization.test.ts
// ile AYNI desen.
type AuthorizedLayersInternals = {
  _authorizedFetchError: string;
  _authorizedAddError: string;
  _authorizedItems: AuthorizedLayerInfo[];
  _authorizedSelectedKeys: string[];
  _tokenUrlDialogOpen: boolean;
  _tokenUrlDialogValue: string;
  _tokenUrlDialogTitle: string;
  _toggleAuthorizedSelected(key: string, checked: boolean): void;
  _addSelectedAuthorizedLayers(): Promise<void>;
  _authorizedKey(info: AuthorizedLayerInfo): string;
};

describe("TucbsAuthorizedLayers karakterizasyonu", () => {
  let el: TucbsAuthorizedLayers;

  beforeEach(() => {
    el = document.createElement("tucbs-authorized-layers") as TucbsAuthorizedLayers;
    document.body.appendChild(el);
  });

  afterEach(() => {
    el.remove();
  });

  it("baslangicta kapali: open=false, hicbir dialog render edilmez", async () => {
    await el.updateComplete;
    expect(el.open).toBe(false);
    expect(el.shadowRoot?.querySelector(".authorized-dialog")).toBeNull();
  });

  it("fetchAndOpen basarili + doluysa: open=true, hata YOK, satirlar render edilir", async () => {
    const items = [makeInfo({ katmanAdi: "Katman A" }), makeInfo({ katmanAdi: "Katman B" })];
    el.layerManager = createFakeLayerManager({ authorizedLayers: items });

    await el.fetchAndOpen();
    await el.updateComplete;

    expect(el.open).toBe(true);
    const internals = el as unknown as AuthorizedLayersInternals;
    expect(internals._authorizedFetchError).toBe("");
    expect(internals._authorizedItems).toHaveLength(2);
    const rows = el.shadowRoot?.querySelectorAll(".authorized-row");
    expect(rows?.length).toBe(2);
  });

  it("fetchAndOpen basarili ama BOS listeyse: open=true, 'yetkili katman bulunamadı' hatasi gosterilir", async () => {
    el.layerManager = createFakeLayerManager({ authorizedLayers: [] });

    await el.fetchAndOpen();
    await el.updateComplete;

    expect(el.open).toBe(true);
    const internals = el as unknown as AuthorizedLayersInternals;
    expect(internals._authorizedFetchError).toBe("Bu API key için yetkili katman bulunamadı.");
  });

  it("fetchAndOpen HATA firlatirsa: open YINE true olur (bos listeyle), hata mesaji error.message'dan gelir", async () => {
    el.layerManager = createFakeLayerManager({
      authorizedLayers: async () => {
        throw new Error("sunucu erişilemedi");
      },
    });

    await el.fetchAndOpen();
    await el.updateComplete;

    expect(el.open).toBe(true);
    const internals = el as unknown as AuthorizedLayersInternals;
    expect(internals._authorizedItems).toHaveLength(0);
    expect(internals._authorizedFetchError).toBe("sunucu erişilemedi");
  });

  it("layerManager YOKKEN fetchAndOpen hicbir sey yapmaz (guard)", async () => {
    await el.fetchAndOpen();
    await el.updateComplete;
    expect(el.open).toBe(false);
  });

  it("_toggleAuthorizedSelected secili anahtarlar listesini ekler/cikarir", async () => {
    const info = makeInfo();
    el.layerManager = createFakeLayerManager({ authorizedLayers: [info] });
    await el.fetchAndOpen();
    const internals = el as unknown as AuthorizedLayersInternals;
    const key = internals._authorizedKey(info);

    internals._toggleAuthorizedSelected(key, true);
    expect(internals._authorizedSelectedKeys).toEqual([key]);

    internals._toggleAuthorizedSelected(key, false);
    expect(internals._authorizedSelectedKeys).toEqual([]);
  });

  it("_addSelectedAuthorizedLayers TAM basarili olursa: layerManager.add() dogru tipte cagrilir, picker kapanir, secim temizlenir", async () => {
    const info = makeInfo({ servisTuru: "WFS", ogcLayerName: "test:wfslayer" });
    const addCalls: Array<{ layerType: string; options: Record<string, unknown> }> = [];
    el.layerManager = createFakeLayerManager({
      authorizedLayers: [info],
      onAdd: (layerType, options) => addCalls.push({ layerType, options }),
    });
    await el.fetchAndOpen();
    const internals = el as unknown as AuthorizedLayersInternals;
    internals._toggleAuthorizedSelected(internals._authorizedKey(info), true);

    await internals._addSelectedAuthorizedLayers();
    await el.updateComplete;

    expect(addCalls).toHaveLength(1);
    expect(addCalls[0]?.layerType).toBe("WFS");
    expect(addCalls[0]?.options.typeName).toBe("test:wfslayer");
    expect(el.open).toBe(false);
    expect(internals._authorizedSelectedKeys).toEqual([]);
  });

  it("_addSelectedAuthorizedLayers KISMI basarisiz olursa: picker ACIK kalir, basarisiz olan SECILI kalir, hata mesaji gosterilir", async () => {
    const infoOk = makeInfo({ katmanAdi: "Basarili", ogcLayerName: "ok:layer" });
    const infoFail = makeInfo({ katmanAdi: "Basarisiz", ogcLayerName: "fail:layer" });
    el.layerManager = createFakeLayerManager({
      authorizedLayers: [infoOk, infoFail],
      addShouldFail: (options) => options.layers === "fail:layer",
    });
    await el.fetchAndOpen();
    const internals = el as unknown as AuthorizedLayersInternals;
    internals._toggleAuthorizedSelected(internals._authorizedKey(infoOk), true);
    internals._toggleAuthorizedSelected(internals._authorizedKey(infoFail), true);

    await internals._addSelectedAuthorizedLayers();
    await el.updateComplete;

    expect(el.open).toBe(true);
    expect(internals._authorizedSelectedKeys).toEqual([internals._authorizedKey(infoFail)]);
    expect(internals._authorizedAddError).toContain("1/2 katman eklenemedi");
  });

  it("'URL Göster' butonuna tiklayinca token url dialogu acilir, deger/baslik set edilir", async () => {
    const info = makeInfo({ tokenUrl: "https://example.com/token", katmanAdi: "Token'lı Katman" });
    el.layerManager = createFakeLayerManager({ authorizedLayers: [info] });
    await el.fetchAndOpen();
    await el.updateComplete;

    const tokenBtn = el.shadowRoot?.querySelector<HTMLButtonElement>(".authorized-token-btn");
    tokenBtn?.click();
    await el.updateComplete;

    const internals = el as unknown as AuthorizedLayersInternals;
    expect(internals._tokenUrlDialogOpen).toBe(true);
    expect(internals._tokenUrlDialogValue).toBe("https://example.com/token");
    expect(internals._tokenUrlDialogTitle).toBe("Token'lı Katman");
    expect(el.shadowRoot?.querySelector(".token-url-dialog")).not.toBeNull();
  });

  it("tokenUrl YOKSA 'URL Göster' butonu disabled'dir", async () => {
    const info = makeInfo();
    el.layerManager = createFakeLayerManager({ authorizedLayers: [info] });
    await el.fetchAndOpen();
    await el.updateComplete;

    const tokenBtn = el.shadowRoot?.querySelector<HTMLButtonElement>(".authorized-token-btn");
    expect(tokenBtn?.disabled).toBe(true);
  });

  it("closePicker() picker'i VE token url dialogunu birlikte kapatir", async () => {
    const info = makeInfo({ tokenUrl: "https://example.com/token" });
    el.layerManager = createFakeLayerManager({ authorizedLayers: [info] });
    await el.fetchAndOpen();
    const internals = el as unknown as AuthorizedLayersInternals;
    el.shadowRoot?.querySelector<HTMLButtonElement>(".authorized-token-btn")?.click();
    await el.updateComplete;
    expect(internals._tokenUrlDialogOpen).toBe(true);

    el.closePicker();
    await el.updateComplete;

    expect(el.open).toBe(false);
    expect(internals._tokenUrlDialogOpen).toBe(false);
  });

  it("disconnectedCallback kendi tooltip portalini DOM'dan kaldirir", async () => {
    await el.updateComplete;
    expect(document.querySelector("tucbs-tooltip-portal")).not.toBeNull();

    el.remove();

    expect(document.querySelector("tucbs-tooltip-portal")).toBeNull();
  });
});
