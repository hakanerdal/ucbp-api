// UNIT TESTLERI -- God Component kilavuzu GC-03 yardimci sinif cikarma
// plani, Faz 3: ExclusiveOverlayCoordinator'in kendi (TucbsLayerList'ten
// bagimsiz) davranisini sabitler. TucbsLayerList'in bunu DOGRU id'lerle
// (upload/serviceUpload/styleEditor/authorizedLayers) kullandigini dogrulayan
// entegrasyon testleri TucbsLayerList.portals.characterization.test.ts +
// TucbsLayerList.authorizedLayers.characterization.test.ts'te AYNEN KALDI --
// bu dosya onlarin TEKRARI degil, EK/izole kapsamdir.
import { describe, expect, it, vi } from "vitest";
import { ExclusiveOverlayCoordinator } from "./ExclusiveOverlayCoordinator.js";

describe("ExclusiveOverlayCoordinator (internal/ExclusiveOverlayCoordinator.ts) -- izole", () => {
  it("closeOthers(id), id ile kayitli olanin KAPATMA fonksiyonunu cagirmaz, digerlerini cagirir", () => {
    const coordinator = new ExclusiveOverlayCoordinator<"a" | "b" | "c">();
    const closeA = vi.fn();
    const closeB = vi.fn();
    const closeC = vi.fn();
    coordinator.register("a", closeA);
    coordinator.register("b", closeB);
    coordinator.register("c", closeC);

    coordinator.closeOthers("a");

    expect(closeA).not.toHaveBeenCalled();
    expect(closeB).toHaveBeenCalledOnce();
    expect(closeC).toHaveBeenCalledOnce();
  });

  it("hic kayit yokken closeOthers() hicbir seye dokunmadan guvenle calisir", () => {
    const coordinator = new ExclusiveOverlayCoordinator<"a" | "b">();
    expect(() => coordinator.closeOthers("a")).not.toThrow();
  });

  it("ayni id ile tekrar register() onceki kaydi DEGISTIRIR (eski kapatma fonksiyonu bir daha cagrilmaz)", () => {
    const coordinator = new ExclusiveOverlayCoordinator<"a" | "b">();
    const oldClose = vi.fn();
    const newClose = vi.fn();
    coordinator.register("a", oldClose);
    coordinator.register("b", () => {});
    coordinator.register("a", newClose);

    coordinator.closeOthers("b");

    expect(oldClose).not.toHaveBeenCalled();
    expect(newClose).toHaveBeenCalledOnce();
  });

  it("closeOthers(id), KAYITLI OLMAYAN bir id ile cagrildiginda TUM kayitlilari kapatir", () => {
    const coordinator = new ExclusiveOverlayCoordinator<"a" | "b">();
    const closeA = vi.fn();
    const closeB = vi.fn();
    coordinator.register("a", closeA);
    coordinator.register("b", closeB);

    coordinator.closeOthers("c" as never);

    expect(closeA).toHaveBeenCalledOnce();
    expect(closeB).toHaveBeenCalledOnce();
  });
});
