// @vitest-environment jsdom
//
// KARAKTERIZASYON TESTLERI -- God Component kilavuzu GC-03 Adım 6: "KL-02"
// kardeş bileşen keşfi mekanizmasının (artık layer-list/MarkerWatcher.ts
// üzerinden CANLI) davranışını sabitler. Yalnızca `tucbs-file-upload`
// örnek alınır -- mekanizma 6 marker için birebir aynı (bkz
// TucbsLayerList.ts connectedCallback).
//
// Faz 2: arama document yerine this.getRootNode()'dan başlıyor (eski
// SINIRLAMA 2 -- shadow root içi keşif -- ÇÖZÜLDÜ).
// Faz 3: MutationObserver ile canlı takip (eski SINIRLAMA 1 -- geç-ekleme
// yakalanmıyordu -- ÇÖZÜLDÜ) + SİMETRİK kaldırma (marker DOM'dan
// kaldırılırsa buton/portal da geri çekilir, "yarım-canlılık" olmasın diye).
//
// jsdom GEREKLI: gerçek custom element'ler + gerçek shadow root kurulur.
import { afterEach, describe, expect, it } from "vitest";
import "./TucbsLayerList.js";
import "../layer-sources/TucbsFileUpload.js";
import type { TucbsLayerList } from "./TucbsLayerList.js";
import type { TucbsFileUpload } from "../layer-sources/TucbsFileUpload.js";

type LayerListInternals = {
  _fileUploadAvailable: boolean;
  _fileUploadMarker: TucbsFileUpload | null;
};

describe("TucbsLayerList kardeş bileşen keşfi (KL-02) -- GC-03 Adım 6", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("marker connectedCallback ANINDA (ÖNCESİNDE DOM'da) mevcutsa keşfedilir -- temel davranış", async () => {
    const marker = document.createElement("tucbs-file-upload") as TucbsFileUpload;
    document.body.appendChild(marker);
    const el = document.createElement("tucbs-layer-list") as TucbsLayerList;
    document.body.appendChild(el);
    await el.updateComplete;

    const internals = el as unknown as LayerListInternals;
    expect(internals._fileUploadAvailable).toBe(true);
    expect(internals._fileUploadMarker).toBe(marker);
  });

  it("Faz 3 DÜZELTİLDİ -- marker connectedCallback SONRASI DOM'a eklenirse CANLI keşfedilir (MutationObserver)", async () => {
    const el = document.createElement("tucbs-layer-list") as TucbsLayerList;
    document.body.appendChild(el);
    await el.updateComplete;

    const internals = el as unknown as LayerListInternals;
    expect(internals._fileUploadAvailable).toBe(false);

    // Marker GEÇ eklenir (ör. async-mount eden bir SPA sarmalayıcısı).
    const marker = document.createElement("tucbs-file-upload") as TucbsFileUpload;
    document.body.appendChild(marker);
    await el.updateComplete;

    expect(internals._fileUploadAvailable).toBe(true);
    expect(internals._fileUploadMarker).toBe(marker);
  });

  it("Faz 3 YENİ -- marker SONRADAN DOM'dan kaldırılırsa buton/portal da SİMETRİK olarak geri çekilir", async () => {
    const marker = document.createElement("tucbs-file-upload") as TucbsFileUpload;
    document.body.appendChild(marker);
    const el = document.createElement("tucbs-layer-list") as TucbsLayerList;
    document.body.appendChild(el);
    await el.updateComplete;

    const internals = el as unknown as LayerListInternals;
    expect(internals._fileUploadAvailable).toBe(true);

    marker.remove();
    // MutationObserver bildirimi bir mikrogorev olarak SIRAYA ALINIR --
    // remove() cagrisindan hemen sonra el.updateComplete'i okumak, bildirim
    // daha calismadan eski (cozulmus) bir promise'e await etmekle
    // sonuclanabilir. Once kuyruktaki mikrogorevin calismasina izin verilir.
    await new Promise((resolve) => setTimeout(resolve, 0));
    await el.updateComplete;

    expect(internals._fileUploadAvailable).toBe(false);
    expect(internals._fileUploadMarker).toBeNull();
  });

  it("Faz 3 BUG-FIX -- MarkerWatcher, TucbsLayerList'in KENDİ portal kopyasını (aynı etiket) gerçek marker sanmaz", async () => {
    // Bu test, ensure() cagrisinin AYNI etiket adiyla bir portal kopyasi
    // olusturmasinin (document.body'ye eklenmesi de bir "childList" mutasyonu
    // oldugu icin) MarkerWatcher'in KENDI gozlemcisini tetikleyip, marker
    // kaldirildiginda yanlislikla bu kopyayi "yeni marker" sanmasini
    // ONLEDIGINI dogrudan dogrular (bkz PortalHost.ts "data-tucbs-portal"
    // WHY yorumu -- gercek bir regresyonla bulundu, varsayimsal degil).
    const marker = document.createElement("tucbs-file-upload") as TucbsFileUpload;
    document.body.appendChild(marker);
    const el = document.createElement("tucbs-layer-list") as TucbsLayerList;
    document.body.appendChild(el);
    await el.updateComplete;

    const internals = el as unknown as LayerListInternals;
    expect(internals._fileUploadAvailable).toBe(true);
    // Portal kopyasi ZATEN olusturulmus olmali (ensure() cagrildi) -- iki
    // "tucbs-file-upload" etiketi var: tuketicinin marker'i + portal kopyasi.
    expect(document.querySelectorAll("tucbs-file-upload").length).toBe(2);

    marker.remove();
    await new Promise((resolve) => setTimeout(resolve, 0));
    await el.updateComplete;

    // Portal kopyasi DA dispose edildigi icin artik SIFIR "tucbs-file-upload"
    // kalmali -- eger watcher portal kopyasini marker sanmis olsaydi,
    // _fileUploadAvailable YANLISLIKLA true kalir, portal asla dispose
    // edilmezdi.
    expect(internals._fileUploadAvailable).toBe(false);
    expect(document.querySelectorAll("tucbs-file-upload").length).toBe(0);
  });

  it("Faz 2 DÜZELTİLDİ -- marker, tucbs-layer-list ile AYNI shadow root içindeyse (this.getRootNode() ile) BULUNUR", async () => {
    class ShadowHostProbe extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: "open" });
      }
    }
    if (!customElements.get("tucbs-kl02-shadow-host-probe")) {
      customElements.define("tucbs-kl02-shadow-host-probe", ShadowHostProbe);
    }
    const host = document.createElement("tucbs-kl02-shadow-host-probe") as ShadowHostProbe;
    document.body.appendChild(host);

    const marker = document.createElement("tucbs-file-upload") as TucbsFileUpload;
    const el = document.createElement("tucbs-layer-list") as TucbsLayerList;
    // AYNI shadow root icinde, el'den ONCE eklenir -- "connectedCallback
    // ANINDA mevcut" senaryosuyla AYNI sira, TEK fark kök (document degil,
    // bir ShadowRoot).
    host.shadowRoot!.appendChild(marker);
    host.shadowRoot!.appendChild(el);
    await el.updateComplete;

    const internals = el as unknown as LayerListInternals;
    // this.getRootNode() shadow root'un KENDISINDEN arar (document'ten
    // DEGIL) -- marker AYNI kokte, ONCEDEN eklenmis oldugu icin artik bulunur.
    expect(internals._fileUploadAvailable).toBe(true);
    expect(internals._fileUploadMarker).toBe(marker);
  });
});
