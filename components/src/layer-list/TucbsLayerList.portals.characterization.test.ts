// @vitest-environment jsdom
//
// KARAKTERIZASYON TESTLERI -- God Component kilavuzu GC-03 (TucbsLayerList)
// Adim 1: uc portal ciftinin (_fileUploadPortal, _serviceUploadPortal,
// _styleEditorPortal -- ARTIK layer-list/PortalHost.ts'in PortalHost<T>
// instance'lari) VE disconnectedCallback'teki temizliklerinin davranisini
// dondurur. Adim 1 ONCESI (_ensureFileUploadPortal/_syncFileUploadPortal vb.
// ayri metot ciftleriyle) yazildi, Adim 1 SONRASI (PortalHost<T>'e
// tasindiktan sonra) erisim yollari (`_fileUploadPortal.element` gibi)
// guncellendi -- ama asagidaki TUM `expect` SONUCLARI (davranis) AYNI
// kaldi. Bundan sonraki herhangi bir degisiklik bu sonuclari BOZMAMALI.
//
// jsdom GEREKLI: gercek custom element'ler construct edilip document.body'e
// ekleniyor (portal deseni zaten document.body'yi hedefliyor, bkz
// TucbsLayerList.ts alan yorumu) -- diger testler (varsa) "node" ortaminda
// kalabilir (bkz vitest.config.ts).
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import "./TucbsLayerList.js";
import "../layer-sources/TucbsFileUpload.js";
import "../layer-sources/TucbsServiceUpload.js";
import "../style-editor/TucbsStyleEditor.js";
import type { TucbsLayerList } from "./TucbsLayerList.js";
import type { TucbsFileUpload } from "../layer-sources/TucbsFileUpload.js";
import type { TucbsServiceUpload } from "../layer-sources/TucbsServiceUpload.js";
import type { TucbsStyleEditor } from "../style-editor/TucbsStyleEditor.js";
import type { PortalHost } from "./PortalHost.js";

// Private alan/metotlara erisim icin -- TucbsStyleEditor.characterization.test.ts
// ile AYNI desen (bkz o dosya): TucbsLayerList.ts'e dokunmadan icsel durumu
// okuyup tetiklemenin tek yolu.
type LayerListInternals = {
  _fileUploadPortal: PortalHost<TucbsFileUpload>;
  _serviceUploadPortal: PortalHost<TucbsServiceUpload>;
  _styleEditorPortal: PortalHost<TucbsStyleEditor>;
  _openUpload(): void;
  _closeUpload(): void;
  _openServiceUpload(): void;
  _closeServiceUpload(): void;
  _openStyleEditor(layer: {
    id: string;
    title: string;
    layerType: string;
    fill: string;
    opacity: number;
  }): void;
};

// _openStyleEditor()'ın okuduğu tek alanlar -- gerçek LayerItem'ın tamamı
// değil (bkz. authorizedLayers.characterization.test.ts'teki AYNI desen).
function makeStyleEditorLayer() {
  return { id: "layer-1", title: "Test Katmanı", layerType: "GEOJSON", fill: "#ff0000", opacity: 1 };
}

describe("TucbsLayerList portal (dosya/servis/stil dialoglari) karakterizasyonu", () => {
  let markerFileUpload: TucbsFileUpload;
  let markerServiceUpload: TucbsServiceUpload;
  let markerStyleEditor: TucbsStyleEditor;
  let el: TucbsLayerList;

  beforeEach(() => {
    // KL-02 kardes bilesen kesfi document.querySelector ile baglanti ANINDA
    // (connectedCallback) calistigi icin marker'lar tucbs-layer-list DOM'a
    // EKLENMEDEN ONCE body'de olmali.
    markerFileUpload = document.createElement("tucbs-file-upload") as TucbsFileUpload;
    markerFileUpload.customCss = ".x{color:red}";
    document.body.appendChild(markerFileUpload);

    markerServiceUpload = document.createElement("tucbs-service-upload") as TucbsServiceUpload;
    markerServiceUpload.customCss = ".y{color:blue}";
    document.body.appendChild(markerServiceUpload);

    markerStyleEditor = document.createElement("tucbs-style-editor") as TucbsStyleEditor;
    markerStyleEditor.customCss = ".z{color:green}";
    document.body.appendChild(markerStyleEditor);

    el = document.createElement("tucbs-layer-list") as TucbsLayerList;
    document.body.appendChild(el);
  });

  afterEach(() => {
    el.remove();
    markerFileUpload.remove();
    markerServiceUpload.remove();
    markerStyleEditor.remove();
  });

  it("sibling marker elementler varsa connectedCallback uc portali da body'e ekler (marker'in KENDISI degil, AYRI bir kopya)", async () => {
    await el.updateComplete;
    const internals = el as unknown as LayerListInternals;

    expect(internals._fileUploadPortal.element).not.toBeNull();
    expect(internals._fileUploadPortal.element).not.toBe(markerFileUpload);
    expect(document.body.contains(internals._fileUploadPortal.element!)).toBe(true);

    expect(internals._serviceUploadPortal.element).not.toBeNull();
    expect(internals._serviceUploadPortal.element).not.toBe(markerServiceUpload);
    expect(document.body.contains(internals._serviceUploadPortal.element!)).toBe(true);

    expect(internals._styleEditorPortal.element).not.toBeNull();
    expect(internals._styleEditorPortal.element).not.toBe(markerStyleEditor);
    expect(document.body.contains(internals._styleEditorPortal.element!)).toBe(true);
  });

  it("sibling marker elementler YOKSA hicbir portal olusturulmaz", async () => {
    el.remove();
    markerFileUpload.remove();
    markerServiceUpload.remove();
    markerStyleEditor.remove();

    const bare = document.createElement("tucbs-layer-list") as TucbsLayerList;
    document.body.appendChild(bare);
    await bare.updateComplete;

    const internals = bare as unknown as LayerListInternals;
    expect(internals._fileUploadPortal.element).toBeNull();
    expect(internals._serviceUploadPortal.element).toBeNull();
    expect(internals._styleEditorPortal.element).toBeNull();

    bare.remove();
  });

  it("portal'larin customCss'i marker elementten kopyalanir", async () => {
    await el.updateComplete;
    const internals = el as unknown as LayerListInternals;

    expect(internals._fileUploadPortal.element!.customCss).toBe(".x{color:red}");
    expect(internals._serviceUploadPortal.element!.customCss).toBe(".y{color:blue}");
    expect(internals._styleEditorPortal.element!.customCss).toBe(".z{color:green}");
  });

  it("_openUpload()/_closeUpload() dosya portalinin open durumunu senkron tutar, servis portalini kapatir", async () => {
    await el.updateComplete;
    const internals = el as unknown as LayerListInternals;

    internals._openUpload();
    await el.updateComplete;
    expect(internals._fileUploadPortal.element!.open).toBe(true);
    expect(internals._serviceUploadPortal.element!.open).toBe(false);

    internals._closeUpload();
    await el.updateComplete;
    expect(internals._fileUploadPortal.element!.open).toBe(false);
  });

  it("_openServiceUpload()/_closeServiceUpload() servis portalinin open durumunu senkron tutar, dosya portalini kapatir", async () => {
    await el.updateComplete;
    const internals = el as unknown as LayerListInternals;

    internals._openServiceUpload();
    await el.updateComplete;
    expect(internals._serviceUploadPortal.element!.open).toBe(true);
    expect(internals._fileUploadPortal.element!.open).toBe(false);

    internals._closeServiceUpload();
    await el.updateComplete;
    expect(internals._serviceUploadPortal.element!.open).toBe(false);
  });

  it("_openStyleEditor() açık dosya/servis portallarını KAPATIR (karşılıklı dışlama -- 4. katılımcı)", async () => {
    await el.updateComplete;
    const internals = el as unknown as LayerListInternals;

    internals._openUpload();
    await el.updateComplete;
    expect(internals._fileUploadPortal.element!.open).toBe(true);

    internals._openStyleEditor(makeStyleEditorLayer());
    await el.updateComplete;

    expect(internals._fileUploadPortal.element!.open).toBe(false);
    expect(internals._styleEditorPortal.element!.open).toBe(true);
  });

  it("_openUpload()/_openServiceUpload() açık stil editörünü KAPATIR (karşılıklı dışlama -- 4. katılımcı)", async () => {
    await el.updateComplete;
    const internals = el as unknown as LayerListInternals;

    internals._openStyleEditor(makeStyleEditorLayer());
    await el.updateComplete;
    expect(internals._styleEditorPortal.element!.open).toBe(true);

    internals._openUpload();
    await el.updateComplete;
    expect(internals._styleEditorPortal.element!.open).toBe(false);

    internals._openStyleEditor(makeStyleEditorLayer());
    await el.updateComplete;
    expect(internals._styleEditorPortal.element!.open).toBe(true);

    internals._openServiceUpload();
    await el.updateComplete;
    expect(internals._styleEditorPortal.element!.open).toBe(false);
  });

  it("tucbs-file-upload-closed / tucbs-service-upload-closed olaylari portal'in KENDI 'open' durumunu kapatir", async () => {
    await el.updateComplete;
    const internals = el as unknown as LayerListInternals;

    internals._openUpload();
    await el.updateComplete;
    expect(internals._fileUploadPortal.element!.open).toBe(true);
    internals._fileUploadPortal.element!.dispatchEvent(
      new CustomEvent("tucbs-file-upload-closed"),
    );
    await el.updateComplete;
    expect(internals._fileUploadPortal.element!.open).toBe(false);

    internals._openServiceUpload();
    await el.updateComplete;
    expect(internals._serviceUploadPortal.element!.open).toBe(true);
    internals._serviceUploadPortal.element!.dispatchEvent(
      new CustomEvent("tucbs-service-upload-closed"),
    );
    await el.updateComplete;
    expect(internals._serviceUploadPortal.element!.open).toBe(false);
  });

  it("apiKey SADECE servis portaline (maskelenmis olarak) senkronlanir", async () => {
    el.apiKey = "gercek-anahtar";
    await el.updateComplete;
    const internals = el as unknown as LayerListInternals;

    expect(internals._serviceUploadPortal.element!.apiKey).toBe("••••••");
  });

  it("disconnectedCallback uc portali de DOM'dan kaldirir ve ic referanslari null yapar", async () => {
    await el.updateComplete;
    const internals = el as unknown as LayerListInternals;
    const fileEl = internals._fileUploadPortal.element!;
    const serviceEl = internals._serviceUploadPortal.element!;
    const styleEl = internals._styleEditorPortal.element!;

    el.remove();

    expect(document.body.contains(fileEl)).toBe(false);
    expect(document.body.contains(serviceEl)).toBe(false);
    expect(document.body.contains(styleEl)).toBe(false);
    expect(internals._fileUploadPortal.element).toBeNull();
    expect(internals._serviceUploadPortal.element).toBeNull();
    expect(internals._styleEditorPortal.element).toBeNull();
  });

  it("ensure cagrisi idempotenttir: yeniden baglanma (disconnect+reconnect) HER seferinde tek bir portal elementi uretir", async () => {
    await el.updateComplete;
    el.remove();
    document.body.appendChild(el);
    await el.updateComplete;

    expect(document.querySelectorAll("tucbs-file-upload").length).toBe(2); // marker + 1 portal
    expect(document.querySelectorAll("tucbs-service-upload").length).toBe(2);
    expect(document.querySelectorAll("tucbs-style-editor").length).toBe(2);
  });
});
