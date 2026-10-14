// @vitest-environment jsdom
//
// UNIT TESTLERI -- Faz 2.3: bindMapByElementId/standardMapBindingMessages'in
// kendi (araclardan bagimsiz) davranisini sabitler. Araclarin bu yardimciyla
// birlikte calistigi tools.mapBinding.characterization.test'te ayrica
// dondurulur; burada host olarak Lit'siz duz bir nesne kullanilir.
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Map as TucbsMapInstance } from "@tucbs/core";
import {
  bindMapByElementId,
  standardMapBindingMessages,
  type MapByElementIdHost,
  type MapByElementIdOptions,
  type TucbsMapElement,
} from "./bindTucbsMap.js";

const MAP_A = { name: "a" } as unknown as TucbsMapInstance;
const MAP_B = { name: "b" } as unknown as TucbsMapInstance;

const OPTIONS: MapByElementIdOptions = {
  noIdTiming: "raf",
  noIdMessage: "[test] id yok",
  missingElementMessage: (id) => `[test] ${id} yok`,
};

/** Bir sonraki animasyon karesini bekler (yardimcinin rAF'i ondan once kaydedildigi icin once o calisir). */
const nextFrame = () => new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

/** Belgeye `id`'li bir harita host elementi ekler. */
function addMapElement(id: string, map?: TucbsMapInstance): TucbsMapElement {
  const el = document.createElement("div") as TucbsMapElement;
  el.id = id;
  if (map) el.map = map;
  document.body.appendChild(el);
  return el;
}

let warnSpy: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
  warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
});

afterEach(() => {
  warnSpy.mockRestore();
  document.body.innerHTML = "";
});

describe("bindMapByElementId (shared/util/bindTucbsMap.ts) -- izole", () => {
  it("map zaten atanmissa mapElementId'ye hic bakmaz ve uyarmaz", () => {
    const getById = vi.spyOn(document, "getElementById");
    const host: MapByElementIdHost = { map: MAP_A, mapElementId: "harita" };
    bindMapByElementId(host, OPTIONS);
    expect(getById).not.toHaveBeenCalled();
    expect(host.map).toBe(MAP_A);
    expect(warnSpy).not.toHaveBeenCalled();
    getById.mockRestore();
  });

  it("element haritayi hazir tasiyorsa hemen atar", () => {
    addMapElement("harita", MAP_A);
    const host: MapByElementIdHost = { map: undefined, mapElementId: "harita" };
    bindMapByElementId(host, OPTIONS);
    expect(host.map).toBe(MAP_A);
  });

  it("harita hazir degilse 'ready' olayinda atar; dinleyici tek seferliktir", () => {
    const el = addMapElement("harita");
    const host: MapByElementIdHost = { map: undefined, mapElementId: "harita" };
    bindMapByElementId(host, OPTIONS);
    expect(host.map).toBeUndefined();

    el.map = MAP_A;
    el.dispatchEvent(new Event("ready"));
    expect(host.map).toBe(MAP_A);

    el.map = MAP_B;
    el.dispatchEvent(new Event("ready"));
    expect(host.map).toBe(MAP_A);
  });

  it("'ready' geldiginde elementte hala harita yoksa atamaz", () => {
    const el = addMapElement("harita");
    const host: MapByElementIdHost = { map: undefined, mapElementId: "harita" };
    bindMapByElementId(host, OPTIONS);
    el.dispatchEvent(new Event("ready"));
    expect(host.map).toBeUndefined();
  });

  it("apiKey dogrulamasi 'failed' olsa da baglanir (whenTucbsMapReady'den farki)", () => {
    const el = addMapElement("harita", MAP_A);
    el.apiKeyAuthState = "failed";
    const host: MapByElementIdHost = { map: undefined, mapElementId: "harita" };
    bindMapByElementId(host, OPTIONS);
    expect(host.map).toBe(MAP_A);
  });

  it("element bulunamazsa hemen missingElementMessage ile uyarir", () => {
    const host: MapByElementIdHost = { map: undefined, mapElementId: "yok-id" };
    bindMapByElementId(host, OPTIONS);
    expect(warnSpy.mock.calls).toEqual([["[test] yok-id yok"]]);
  });

  it("'sync': mapElementId ve map yoksa hemen uyarir", () => {
    const host: MapByElementIdHost = { map: undefined, mapElementId: "" };
    bindMapByElementId(host, { ...OPTIONS, noIdTiming: "sync" });
    expect(warnSpy.mock.calls).toEqual([["[test] id yok"]]);
  });

  it("'raf': uyari bir kare sonra basilir", async () => {
    const host: MapByElementIdHost = { map: undefined, mapElementId: "" };
    bindMapByElementId(host, OPTIONS);
    expect(warnSpy).not.toHaveBeenCalled();
    await nextFrame();
    expect(warnSpy.mock.calls).toEqual([["[test] id yok"]]);
  });

  it("'raf': ilk kare icinde map atanirsa uyari basilmaz", async () => {
    const host: MapByElementIdHost = { map: undefined, mapElementId: "" };
    bindMapByElementId(host, OPTIONS);
    host.map = MAP_A;
    await nextFrame();
    expect(warnSpy).not.toHaveBeenCalled();
  });
});

describe("standardMapBindingMessages -- izole", () => {
  it("'islevsiz' ve 'gizli' ekleriyle araclarin ortak metinlerini uretir", () => {
    const islevsiz = standardMapBindingMessages("tucbs-zoom-tool", "islevsiz");
    expect(islevsiz.noIdMessage).toBe(
      '[tucbs-zoom-tool] "mapElementId" verilmedi ve "map" programatik olarak atanmadi; bilesen haritaya baglanamadigi icin islevsiz kalacak.',
    );
    expect(islevsiz.missingElementMessage("harita")).toBe(
      '[tucbs-zoom-tool] mapElementId="harita" ile eslesen bir element bulunamadi; bilesen haritaya baglanamadigi icin islevsiz kalacak.',
    );
    const gizli = standardMapBindingMessages("tucbs-quality-bar", "gizli");
    expect(gizli.noIdMessage.endsWith("icin gizli kalacak.")).toBe(true);
    expect(gizli.missingElementMessage("x").endsWith("icin gizli kalacak.")).toBe(true);
  });
});
