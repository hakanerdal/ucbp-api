// @vitest-environment jsdom
//
// KARAKTERIZASYON TESTLERI -- God Component kilavuzu GC-03 (TucbsLayerList)
// Adim 3 SONRASI yeniden yazildi: "Yetkili Katmanlar" blogunun asil fetch/
// secim/ekleme/token-dialog mantigi artik <tucbs-authorized-layers>'a
// tasindi (bkz TucbsAuthorizedLayers.characterization.test.ts) -- bu dosya
// SADECE TucbsLayerList'te KALAN entegrasyon yuzeyini test eder: butonun
// marker+apiKey'e gore gorunurlugu (KL-02, GC-03 4.4 Adim 3'un YENI
// kurali -- kullanicinin "<tucbs-authorized-layers> eklenmediyse buton
// gelmesin" talebi), portal ensure/dispose, ve digerleriyle (upload/
// serviceUpload/styleEditor) karsilikli-dislama.
//
// jsdom GEREKLI: gercek custom element'ler construct edilip document.body'e
// ekleniyor.
import { afterEach, describe, expect, it } from "vitest";
import "./TucbsLayerList.js";
import "../layer-sources/TucbsFileUpload.js";
import "../layer-sources/TucbsServiceUpload.js";
import "../style-editor/TucbsStyleEditor.js";
import "../layer-sources/TucbsAuthorizedLayers.js";
import type { TucbsLayerList } from "./TucbsLayerList.js";
import type { TucbsAuthorizedLayers } from "../layer-sources/TucbsAuthorizedLayers.js";
import type { TucbsStyleEditor } from "../style-editor/TucbsStyleEditor.js";
import type { AuthorizedLayerInfo, LayerManager, ManagedLayer } from "@tucbs/core";

type LayerListInternals = {
  _authorizedLayersPortal: { element: TucbsAuthorizedLayers | null };
  _styleEditorPortal: { element: TucbsStyleEditor | null };
  _authorizedLayersFetching: boolean;
  _openUpload(): void;
  _openServiceUpload(): void;
  _openAuthorizedLayers(): Promise<void>;
  _openStyleEditor(layer: {
    id: string;
    title: string;
    layerType: string;
    fill: string;
    opacity: number;
  }): void;
};

// _openStyleEditor()'ın okuduğu tek alanlar -- bkz. portals.characterization
// test dosyasındaki AYNI desen. layerType="WMS" BİLEREK seçildi: bu dosyada
// (portals dosyasının aksine) gerçek bir layerManager bağlı, ve
// TucbsStyleEditor.openFor() servis-dışı (WMS/WMTS harici) katmanlarda
// layerManager.getEntityPropertyNames() çağırır -- bu testlerin konusu
// (karşılıklı dışlama) bununla ilgisiz, "WMS" seçmek fake'i şişirmeden bunu atlar.
function makeStyleEditorLayer() {
  return { id: "layer-1", title: "Test Katmanı", layerType: "WMS", fill: "#ff0000", opacity: 1 };
}

// GC-03 Adim 3 (Faz 7): <tucbs-authorized-layers>'in render()'i, acik picker
// icindeki her satir icin this.layerManager.canAddAuthorizedLayer(info)'u
// cagirir (bkz _authorizedCanAdd) -- gercek mantik auth/ApiKeyPolicy.ts'te
// (core'un INTERNAL'i, public export DEGIL); bu sahte LayerManager sadece
// "her sey eklenebilir" varsayar (bu dosyanin testleri ekleme AKISINI degil,
// SADECE buton/portal entegrasyon yuzeyini kapsıyor -- gercek eklenebilirlik
// mantigi ApiKeyPolicy.test.ts + TucbsAuthorizedLayers.characterization.test.ts'te).
function createFakeLayerManager(
  options: { hasApiKey?: boolean; authorizedLayers?: AuthorizedLayerInfo[] } = {},
): LayerManager {
  const fake = {
    hasApiKey: options.hasApiKey ?? true,
    getLayers: () => [] as ManagedLayer[],
    getAuthorizedLayers: async () => options.authorizedLayers ?? [],
    canAddAuthorizedLayer: () => true,
    // _openStyleEditor()'un portallanan TucbsStyleEditor'a aktardigi
    // layerManager'in openFor()'da okudugu 2 metod -- bu dosyanin asil
    // konusu (Yetkili Katmanlar entegrasyonu) degil, SADECE 4. karsilikli-
    // dislama katilimcisi (styleEditor) testleri icin gerekli.
    getFeatureCount: () => undefined,
    getLayerStyle: () => undefined,
    addAuthorizedLayer: async () => ({ id: "fake" }) as ManagedLayer,
    on: (_event: string, _cb: (...args: unknown[]) => void) => {},
    off: (_event: string, _cb: (...args: unknown[]) => void) => {},
  };
  return fake as unknown as LayerManager;
}

// _bindLayerManager() (updated() icinde) _hasApiKey'i SENKRON olarak set
// ediyor -- bkz TucbsLayerList.portals.characterization.test.ts'teki AYNI
// yorum (bu dosyanin kopyasi, aynı Lit cascade tuhafligi icin).
async function bindLayerManager(el: TucbsLayerList, layerManager: LayerManager): Promise<void> {
  el.layerManager = layerManager;
  await el.updateComplete;
  await el.updateComplete;
}

const BUTTON_SELECTOR = '[data-tooltip="APIKey ile Yetkili Katmanlarımı Getir"]';

describe("TucbsLayerList 'Yetkili Katmanlar' entegrasyon yuzeyi (GC-03 Adim 3 sonrasi)", () => {
  let marker: TucbsAuthorizedLayers;
  let el: TucbsLayerList;

  afterEach(() => {
    el.remove();
    marker.remove();
  });

  async function setup(withMarker: boolean): Promise<void> {
    if (withMarker) {
      marker = document.createElement("tucbs-authorized-layers") as TucbsAuthorizedLayers;
      document.body.appendChild(marker);
    } else {
      marker = document.createElement("tucbs-authorized-layers") as TucbsAuthorizedLayers;
      // body'e EKLENMEZ -- "marker yok" senaryosu.
    }
    el = document.createElement("tucbs-layer-list") as TucbsLayerList;
    document.body.appendChild(el);
    await el.updateComplete;
  }

  it("marker VAR + apiKey VAR: buton render edilir, portal ensure edilir", async () => {
    await setup(true);
    await bindLayerManager(el, createFakeLayerManager({ hasApiKey: true }));

    expect(el.shadowRoot?.querySelector(BUTTON_SELECTOR)).not.toBeNull();
    const internals = el as unknown as LayerListInternals;
    expect(internals._authorizedLayersPortal.element).not.toBeNull();
    expect(internals._authorizedLayersPortal.element).not.toBe(marker);
  });

  it("marker VAR + apiKey YOK: buton render EDILMEZ (ama portal zaten ensure edilmistir)", async () => {
    await setup(true);
    await bindLayerManager(el, createFakeLayerManager({ hasApiKey: false }));

    expect(el.shadowRoot?.querySelector(BUTTON_SELECTOR)).toBeNull();
    const internals = el as unknown as LayerListInternals;
    expect(internals._authorizedLayersPortal.element).not.toBeNull();
  });

  it("marker YOK + apiKey VAR: buton render EDILMEZ, portal HIC ensure edilmez", async () => {
    await setup(false);
    await bindLayerManager(el, createFakeLayerManager({ hasApiKey: true }));

    expect(el.shadowRoot?.querySelector(BUTTON_SELECTOR)).toBeNull();
    const internals = el as unknown as LayerListInternals;
    expect(internals._authorizedLayersPortal.element).toBeNull();
  });

  it("marker YOK + apiKey YOK: buton render EDILMEZ", async () => {
    await setup(false);
    await bindLayerManager(el, createFakeLayerManager({ hasApiKey: false }));

    expect(el.shadowRoot?.querySelector(BUTTON_SELECTOR)).toBeNull();
  });

  it("_openAuthorizedLayers() gercek <tucbs-authorized-layers> portalinin fetchAndOpen()'ini cagirir ve fetch surerken butonu devre disi birakir", async () => {
    await setup(true);
    const items: AuthorizedLayerInfo[] = [
      {
        servisTuru: "WMS",
        servisUrl: "https://example.com/wms",
        ogcLayerName: "test:layer",
        katmanAdi: "Test Katmanı",
      },
    ];
    await bindLayerManager(el, createFakeLayerManager({ hasApiKey: true, authorizedLayers: items }));
    const internals = el as unknown as LayerListInternals;

    const fetchPromise = internals._openAuthorizedLayers();
    await el.updateComplete;
    expect(internals._authorizedLayersFetching).toBe(true);
    expect(el.shadowRoot?.querySelector<HTMLButtonElement>(BUTTON_SELECTOR)?.disabled).toBe(true);

    await fetchPromise;
    await el.updateComplete;

    expect(internals._authorizedLayersFetching).toBe(false);
    expect(internals._authorizedLayersPortal.element?.open).toBe(true);
  });

  it("_openUpload() acik yetkili katmanlar picker'ini KAPATIR (karsilikli disleme)", async () => {
    await setup(true);
    await bindLayerManager(el, createFakeLayerManager({ hasApiKey: true, authorizedLayers: [] }));
    const internals = el as unknown as LayerListInternals;
    await internals._openAuthorizedLayers();
    await el.updateComplete;
    expect(internals._authorizedLayersPortal.element?.open).toBe(true);

    internals._openUpload();
    await el.updateComplete;

    expect(internals._authorizedLayersPortal.element?.open).toBe(false);
  });

  it("_openServiceUpload() acik yetkili katmanlar picker'ini KAPATIR (karsilikli disleme)", async () => {
    await setup(true);
    await bindLayerManager(el, createFakeLayerManager({ hasApiKey: true, authorizedLayers: [] }));
    const internals = el as unknown as LayerListInternals;
    await internals._openAuthorizedLayers();
    await el.updateComplete;
    expect(internals._authorizedLayersPortal.element?.open).toBe(true);

    internals._openServiceUpload();
    await el.updateComplete;

    expect(internals._authorizedLayersPortal.element?.open).toBe(false);
  });

  it("_openStyleEditor() açık yetkili katmanlar picker'ini KAPATIR (karşılıklı dışlama -- 4. katılımcı)", async () => {
    const styleMarker = document.createElement("tucbs-style-editor") as TucbsStyleEditor;
    document.body.appendChild(styleMarker);
    await setup(true);
    await bindLayerManager(el, createFakeLayerManager({ hasApiKey: true, authorizedLayers: [] }));
    const internals = el as unknown as LayerListInternals;
    await internals._openAuthorizedLayers();
    await el.updateComplete;
    expect(internals._authorizedLayersPortal.element?.open).toBe(true);

    internals._openStyleEditor(makeStyleEditorLayer());
    await el.updateComplete;

    expect(internals._authorizedLayersPortal.element?.open).toBe(false);
    expect(internals._styleEditorPortal.element?.open).toBe(true);

    styleMarker.remove();
  });

  it("_openAuthorizedLayers() açık stil editörünü KAPATIR (karşılıklı dışlama -- 4. katılımcı)", async () => {
    const styleMarker = document.createElement("tucbs-style-editor") as TucbsStyleEditor;
    document.body.appendChild(styleMarker);
    await setup(true);
    await bindLayerManager(el, createFakeLayerManager({ hasApiKey: true, authorizedLayers: [] }));
    const internals = el as unknown as LayerListInternals;

    internals._openStyleEditor(makeStyleEditorLayer());
    await el.updateComplete;
    expect(internals._styleEditorPortal.element?.open).toBe(true);

    await internals._openAuthorizedLayers();
    await el.updateComplete;

    expect(internals._styleEditorPortal.element?.open).toBe(false);
    expect(internals._authorizedLayersPortal.element?.open).toBe(true);

    styleMarker.remove();
  });

  it("disconnectedCallback <tucbs-authorized-layers> portalini DOM'dan kaldirir", async () => {
    await setup(true);
    await bindLayerManager(el, createFakeLayerManager({ hasApiKey: true }));
    const internals = el as unknown as LayerListInternals;
    const portalEl = internals._authorizedLayersPortal.element;
    expect(portalEl).not.toBeNull();

    el.remove();

    expect(document.body.contains(portalEl!)).toBe(false);
    expect(internals._authorizedLayersPortal.element).toBeNull();
  });
});
