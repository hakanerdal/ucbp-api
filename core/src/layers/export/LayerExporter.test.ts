// Adim 9 Faz 0b -- Ornek 2 (standalone saf fonksiyonlar hic module-ozel
// testi yoktu) test kapsami tamamlama: geoTiffExportDimensions/
// extractMultipartImage hicbir Cesium Viewer'a ihtiyac duymaz, oncesinde
// SADECE tam-Viewer'li LayerManager.characterization.test.ts'in
// exportLayerAsGeoTiff testleri uzerinden dolayli kapsaniyordu.
import { describe, expect, it } from "vitest";
import { extractMultipartImage, geoTiffExportDimensions } from "./LayerExporter.js";

describe("geoTiffExportDimensions", () => {
  it("bbox verilmezse maxDimension x maxDimension/2 (dunya geneli en-boy orani) doner", () => {
    expect(geoTiffExportDimensions(undefined, 2048)).toEqual({ width: 2048, height: 1024 });
  });

  it("kare bbox'ta genislik/yukseklik esit olur (maxDimension'a sabitlenir)", () => {
    const bbox = { west: 30, south: 39, east: 34, north: 43 }; // lonSpan=4, latSpan=4
    expect(geoTiffExportDimensions(bbox, 2048)).toEqual({ width: 2048, height: 2048 });
  });

  it("yatayda uzun bbox'ta genislik maxDimension'a sabitlenir, yukseklik oranla kuculur", () => {
    const bbox = { west: 30, south: 39, east: 38, north: 41 }; // lonSpan=8, latSpan=2
    const result = geoTiffExportDimensions(bbox, 2048);
    expect(result.width).toBe(2048);
    expect(result.height).toBe(Math.round((2048 * 2) / 8));
  });

  it("dikeyde uzun bbox'ta yukseklik maxDimension'a sabitlenir, genislik oranla kuculur", () => {
    const bbox = { west: 32, south: 35, east: 34, north: 43 }; // lonSpan=2, latSpan=8
    const result = geoTiffExportDimensions(bbox, 2048);
    expect(result.height).toBe(2048);
    expect(result.width).toBe(Math.round((2048 * 2) / 8));
  });
});

describe("extractMultipartImage", () => {
  function buildMultipartBody(parts: { contentType: string; body: string; sep: "\r\n\r\n" | "\n\n" }[], boundary: string): Uint8Array {
    const chunks = parts
      .map((p) => `--${boundary}\r\nContent-Type: ${p.contentType}${p.sep}${p.body}\r\n`)
      .join("");
    const full = `${chunks}--${boundary}--`;
    return new TextEncoder().encode(full);
  }

  it("CRLF (\\r\\n\\r\\n) ayracli govdede image/* parcasini bulup baytlarini/mimeType'ini doner", () => {
    const bytes = buildMultipartBody(
      [
        { contentType: "application/gml+xml", body: "<gml>metadata</gml>", sep: "\r\n\r\n" },
        { contentType: "image/tiff", body: "SAHTE-TIFF-BAYTLARI", sep: "\r\n\r\n" },
      ],
      "boundary123"
    );

    const result = extractMultipartImage(bytes, "boundary123");
    expect(result.mimeType).toBe("image/tiff");
    expect(new TextDecoder("iso-8859-1").decode(result.bytes)).toBe("SAHTE-TIFF-BAYTLARI");
  });

  it("LF (\\n\\n) ayracli govdeyi de dogru ayristirir (ör. ArcGIS ImageServer)", () => {
    const bytes = buildMultipartBody([{ contentType: "image/png", body: "PNG-BAYTLARI", sep: "\n\n" }], "b2");
    const result = extractMultipartImage(bytes, "b2");
    expect(result.mimeType).toBe("image/png");
    expect(new TextDecoder("iso-8859-1").decode(result.bytes)).toBe("PNG-BAYTLARI");
  });

  it("image/* parcasi yoksa OGC_WCS_MULTIPART_IMAGE_NOT_FOUND firlatir", () => {
    const bytes = buildMultipartBody([{ contentType: "application/gml+xml", body: "<gml/>", sep: "\r\n\r\n" }], "b3");
    expect(() => extractMultipartImage(bytes, "b3")).toThrow(
      expect.objectContaining({ code: "OGC_WCS_MULTIPART_IMAGE_NOT_FOUND" })
    );
  });
});
