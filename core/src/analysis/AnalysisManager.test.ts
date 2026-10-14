// KARAKTERIZASYON TESTLERI -- Klasor yapisi ve seçici bölme planı, Faz 0.4-d.
// AnalysisManager.buffer() ve .intersection() birebir ayni istek/hata akisini
// tekrar ediyor (Faz 2.5'te ortak bir private metoda indirilecek). Bu dosya
// iki ucun MEVCUT davranisini -- URL, header, govde, hata kodlari ve
// mesaj onceligi (mesaj > message > varsayilan) -- ayni tablo uzerinden
// dondurur; boylece birlestirme iki yolu da birebir korumak zorunda kalir.
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AnalysisManager } from "./AnalysisManager.js";
import { configureTucbs } from "../config.js";
import { AnalysisRequestError } from "../shared/TucbsError.js";

const GEOJSON = { type: "FeatureCollection", features: [] };

type Endpoint = {
  name: string;
  path: string;
  request: Record<string, unknown>;
  call: (manager: AnalysisManager, request: never) => Promise<unknown>;
};

const ENDPOINTS: Endpoint[] = [
  {
    name: "buffer",
    path: "/vector/buffer",
    request: { geojson: { type: "Feature" }, distanceM: 100 },
    call: (manager, request) => manager.buffer(request),
  },
  {
    name: "intersection",
    path: "/vector/intersection",
    request: { geojsonA: { type: "Feature" }, geojsonB: { type: "Feature" } },
    call: (manager, request) => manager.intersection(request),
  },
  {
    name: "boundary",
    path: "/vector/boundary",
    request: { geojson: { type: "Feature" }, boundaryType: "bbox", outputGeometry: "polygon" },
    call: (manager, request) => manager.boundary(request),
  },
  {
    name: "clip",
    path: "/vector/clip",
    request: { geojsonA: { type: "Feature" }, geojsonB: { type: "Feature" } },
    call: (manager, request) => manager.clip(request),
  },
  {
    name: "difference",
    path: "/vector/difference",
    request: { geojsonA: { type: "Feature" }, geojsonB: { type: "Feature" } },
    call: (manager, request) => manager.difference(request),
  },
  {
    name: "subtract",
    path: "/vector/subtract",
    request: { geojsonA: { type: "Feature" }, geojsonB: { type: "Feature" } },
    call: (manager, request) => manager.subtract(request),
  },
  {
    name: "union",
    path: "/vector/union",
    request: { geojsonA: { type: "Feature" }, geojsonB: { type: "Feature" } },
    call: (manager, request) => manager.union(request),
  },
  {
    name: "wedgeBuffer",
    path: "/vector/wedge-buffer",
    request: { geojson: { type: "Feature" }, distanceM: 100, startAngle: 0, endAngle: 90 },
    call: (manager, request) => manager.wedgeBuffer(request),
  },
];

let fetchMock: ReturnType<typeof vi.fn>;

/** Verilen JSON govdesi ve HTTP durumuyla bir Response doner. */
const jsonResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

/** Cagriyi calistirip firlatilan AnalysisRequestError'in kod ve mesajini dondurur. */
async function captureError(promise: Promise<unknown>): Promise<{ code: string; message: string }> {
  try {
    await promise;
  } catch (err) {
    expect(err).toBeInstanceOf(AnalysisRequestError);
    const { code, message } = err as AnalysisRequestError;
    return { code, message };
  }
  throw new Error("hata bekleniyordu");
}

beforeEach(() => {
  configureTucbs({ apiBase: "https://api.test/ucbp-api/" });
  fetchMock = vi.fn();
  vi.stubGlobal("fetch", fetchMock);
});

afterEach(() => {
  configureTucbs({ apiBase: "" });
  vi.unstubAllGlobals();
});

describe("AnalysisManager -- yapilandirma (karakterizasyon)", () => {
  it("configured: apiBase ve apiKey birlikte varsa true", () => {
    expect(new AnalysisManager({ apiKey: "k" }).configured).toBe(true);
    expect(new AnalysisManager({ apiKey: "" }).configured).toBe(false);
  });

  it("configure() yalnizca verilen alanlari degistirir", async () => {
    const manager = new AnalysisManager({ apiKey: "eski", clientId: "c1" });
    manager.configure({ apiKey: "yeni" });
    fetchMock.mockResolvedValue(jsonResponse({ object: { geojson: GEOJSON } }));
    await manager.buffer({ geojson: { type: "Feature" }, distanceM: 1 } as never);
    const [, init] = fetchMock.mock.calls[0]!;
    expect(init.headers["X-API-Key"]).toBe("yeni");
    expect(JSON.parse(init.body).clientId).toBe("c1");
  });
});

describe.each(ENDPOINTS)("AnalysisManager.$name (karakterizasyon)", (endpoint) => {
  const run = (manager: AnalysisManager) => endpoint.call(manager, endpoint.request as never);

  it("apiKey yoksa istek atmadan ANALYSIS_API_KEY_MISSING firlatir", async () => {
    const error = await captureError(run(new AnalysisManager({ apiKey: "" })));
    expect(error).toEqual({
      code: "ANALYSIS_API_KEY_MISSING",
      message: "apiKey tanımlı değil (tucbs-map apiKey).",
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("dogru URL'ye, dogru header ve govdeyle POST eder; sonucu (object) dondurur", async () => {
    const result = { geojson: GEOJSON, extra: 1 };
    fetchMock.mockResolvedValue(jsonResponse({ object: result }));
    const manager = new AnalysisManager({ apiKey: "anahtar", clientId: "istemci-1" });

    await expect(run(manager)).resolves.toEqual(result);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0]!;
    expect(url).toBe(`https://api.test/ucbp-api${endpoint.path}`);
    expect(init.method).toBe("POST");
    expect(init.headers).toEqual({ "Content-Type": "application/json", "X-API-Key": "anahtar" });
    expect(JSON.parse(init.body)).toEqual({ clientId: "istemci-1", object: endpoint.request });
  });

  it("clientId verilmezse crypto.randomUUID kullanir", async () => {
    vi.stubGlobal("crypto", { randomUUID: () => "uuid-sabit" });
    fetchMock.mockResolvedValue(jsonResponse({ object: { geojson: GEOJSON } }));
    await run(new AnalysisManager({ apiKey: "k" }));
    expect(JSON.parse(fetchMock.mock.calls[0]![1].body).clientId).toBe("uuid-sabit");
  });

  it.each([
    { name: "Error", thrown: new Error("bağlantı koptu"), message: "Ağ hatası: bağlantı koptu" },
    { name: "Error olmayan deger", thrown: "zaman asimi", message: "Ağ hatası: zaman asimi" },
  ])("fetch reddedilirse ($name) ANALYSIS_NETWORK_ERROR", async ({ thrown, message }) => {
    fetchMock.mockRejectedValue(thrown);
    expect(await captureError(run(new AnalysisManager({ apiKey: "k" })))).toEqual({
      code: "ANALYSIS_NETWORK_ERROR",
      message,
    });
  });

  it.each([
    { name: "mesaj alani", body: { mesaj: "Türkçe hata", message: "english" }, message: "Türkçe hata" },
    { name: "message alani", body: { message: "english" }, message: "english" },
    { name: "bos govde", body: {}, message: "İstek başarısız (HTTP 500)" },
  ])("HTTP hatasinda ANALYSIS_REQUEST_FAILED -- $name onceligi", async ({ body, message }) => {
    fetchMock.mockResolvedValue(jsonResponse(body, 500));
    expect(await captureError(run(new AnalysisManager({ apiKey: "k" })))).toEqual({
      code: "ANALYSIS_REQUEST_FAILED",
      message,
    });
  });

  it("HTTP hatasinda govde JSON degilse varsayilan mesaj", async () => {
    fetchMock.mockResolvedValue(new Response("<html>502</html>", { status: 502 }));
    expect(await captureError(run(new AnalysisManager({ apiKey: "k" })))).toEqual({
      code: "ANALYSIS_REQUEST_FAILED",
      message: "İstek başarısız (HTTP 502)",
    });
  });

  it.each([
    { name: "isSuccess:false + mesaj", body: { isSuccess: false, mesaj: "Geçersiz geometri" }, message: "Geçersiz geometri" },
    { name: "success:false + message", body: { success: false, message: "bad" }, message: "bad" },
    { name: "isSuccess:false, mesajsiz", body: { isSuccess: false }, message: "Analiz başarısız." },
  ])("HTTP 200 ama basarisiz zarf -- $name -> ANALYSIS_UNSUCCESSFUL", async ({ body, message }) => {
    fetchMock.mockResolvedValue(jsonResponse(body));
    expect(await captureError(run(new AnalysisManager({ apiKey: "k" })))).toEqual({
      code: "ANALYSIS_UNSUCCESSFUL",
      message,
    });
  });

  it.each([
    { name: "object yok", body: { isSuccess: true } },
    { name: "object var, geojson yok", body: { object: { other: 1 } } },
    { name: "govde JSON degil (200)", raw: "tamam" },
  ])("geojson donmezse ANALYSIS_RESPONSE_MISSING_GEOJSON -- $name", async ({ body, raw }) => {
    fetchMock.mockResolvedValue(raw !== undefined ? new Response(raw, { status: 200 }) : jsonResponse(body));
    expect(await captureError(run(new AnalysisManager({ apiKey: "k" })))).toEqual({
      code: "ANALYSIS_RESPONSE_MISSING_GEOJSON",
      message: "Yanıtta geojson yok.",
    });
  });
});
