import { Cartesian3, Color, CustomDataSource, GeoJsonDataSource, KmlDataSource, type DataSource, type Resource, type Viewer } from "cesium";
import type { FeatureCollection } from "geojson";
import { LayerOperationError } from "../../shared/TucbsError.js";
import { ensureGeoJsonCrsSupport, isSuspiciousCrsResult, type CrsCheckResult } from "./geojsonCrs.js";
import type { LayerType, LocalLayerOptions, ManagedLayer } from "../../types/index.js";
import type { LayerStyleEngine } from "../style/LayerStyleEngine.js";
import type { OutlineGeometry } from "../style/OutlineGeometry.js";

// LayerManager.resolveOgcProxyUrl vb. ile AYNI sibling-module DI deseni
// (bkz project_ucbp_api_god_component_refactor_kurallari 2.3 Hedef Yapi) --
// addPolygonOutlines/applyEntityColor/convertMarkersToPoints/
// disableRiskyPolygonOutlines/flattenSuspiciousGeometry/recordInitialStyle
// LayerManager'in KENDI private delege metotlarina baglanir (OutlineGeometry/
// LayerStyleEngine instance'lari DEGIL) -- ornegin LayerManager.addPolygonOutlines
// SADECE outlineGeometry'e delege etmiyor, ayrica opacityController.
// ensureDynamicFillColor'i da calistiriyor (cross-cutting), bu yuzden ham
// instance yerine LayerManager'in kendi (zaten var olan) sarmalayicisi
// gecilir.
export interface LocalSourceLoaderDeps {
  // Kardes moduller DOGRUDAN verilir (bkz OgcLayerFactoryDeps'teki ayni not).
  readonly styleEngine: LayerStyleEngine;
  readonly outlineGeometry: OutlineGeometry;
  // LayerManager'da KALIR: outline'in ustune dinamik dolgu mantigi ekler.
  addPolygonOutlines(dataSource: DataSource, color: Color, width: number): void;
  register(
    id: string,
    title: string,
    layerType: LayerType,
    cesiumObject: DataSource,
    isBasemap: boolean,
    initialFillColor?: string,
  ): ManagedLayer;
  emitCrsCheckResult(id: string, result: CrsCheckResult | null): void;
  waitForRenderSettle(): Promise<void>;
  readonly defaultOutlineColor: Color;
  readonly defaultOutlineColorHex: string;
}

export class LocalSourceLoader {
  constructor(
    private readonly viewer: Viewer,
    private readonly deps: LocalSourceLoaderDeps,
  ) {}

  async addLocalKmlGeoJson(
    layerType: "GEOJSON" | "KML" | "KMZ",
    options: LocalLayerOptions
  ): Promise<ManagedLayer> {
    let dataSource: DataSource;
    let blobUrl: string | undefined;
    let crsInfo: CrsCheckResult | null = null;
    const color = this.deps.styleEngine.randomLayerColor();
    let clampToGround = options.clampToGround ?? true;

    if (layerType === "GEOJSON") {
      const geojson =
        options.data instanceof File
          ? JSON.parse(await this.fileToText(options.data))
          : options.data;
      crsInfo = await ensureGeoJsonCrsSupport(geojson);
      // bkz isSuspiciousCrsResult WHY yorumu -- koordinatlar supheliyse
      // clampToGround KAPATILIR, aksi halde tarayici zoom/pan'da
      // donup/cokebilir.
      if (isSuspiciousCrsResult(crsInfo)) clampToGround = false;
      dataSource = await GeoJsonDataSource.load(geojson, {
        clampToGround,
        fill: color.withAlpha(0.5),
        stroke: color,
        strokeWidth: 2,
        markerColor: color,
      });
      // bkz loadVectorGeoJsonLayer'daki ayni applyEntityColor cagrisinin
      // yorumu -- Cesium'un GeoJsonDataSource.load'da entity'ler arasinda
      // paylastigi materyal nesnesini kirip her entity'ye bagimsiz bir kopya
      // veriyoruz.
      this.deps.styleEngine.applyEntityColor(dataSource, color);
      this.deps.styleEngine.convertMarkersToPoints(dataSource, color);
      if (isSuspiciousCrsResult(crsInfo)) this.deps.outlineGeometry.flattenSuspiciousGeometry(dataSource);
    } else {
      let kmlSource: string | Resource;
      if (options.data instanceof File) {
        blobUrl = this.fileToBlobUrl(options.data);
        kmlSource = blobUrl;
      } else {
        kmlSource = options.data as string | Resource;
      }
      dataSource = await KmlDataSource.load(kmlSource, {
        camera: this.viewer.scene.camera,
        canvas: this.viewer.scene.canvas,
        clampToGround,
      });
      this.deps.styleEngine.applyEntityColor(dataSource, color);
    }
    this.deps.outlineGeometry.disableRiskyPolygonOutlines(dataSource);

    if (clampToGround) {
      this.deps.addPolygonOutlines(dataSource, this.deps.defaultOutlineColor, 2);
    }

    await this.viewer.dataSources.add(dataSource);

    if (blobUrl !== undefined) {
      URL.revokeObjectURL(blobUrl);
    }

    const colorHex = color.toCssHexString();
    const managed = this.deps.register(
      options.id,
      options.title,
      layerType,
      dataSource,
      false,
      colorHex
    );
    this.deps.emitCrsCheckResult(managed.id, crsInfo);
    // Dis hat rengi dolgunun aksine RASTGELE degil, sabit bir varsayilan
    // (TucbsStyleEditor'un DEFAULT_OUTLINE_COLOR/WIDTH'iyle ayni deger --
    // "Sifirla" bu ikisinin ayni maviye/genislige donmesini bekliyor).
    this.deps.styleEngine.recordInitialStyle(managed.id, colorHex, 0.5, {
      enabled: true,
      color: this.deps.defaultOutlineColorHex,
      width: 2,
    });
    // bkz waitForRenderSettle() yorumu.
    await this.deps.waitForRenderSettle();
    return managed;
  }

  // ── İç: SHP ──────────────────────────────────────────────────────────────

  async addShp(options: LocalLayerOptions): Promise<ManagedLayer> {
    let shp: (typeof import("shpjs"))["getShapefile"];
    try {
      ({ getShapefile: shp } = await import("shpjs"));
    } catch {
      throw new LayerOperationError(
        "LAYER_SHP_PACKAGE_MISSING",
        'SHP katmanı için "shpjs" paketi gereklidir: shpjs kütüphanesini import etmelisiniz'
      );
    }

    const source =
      options.data instanceof File
        ? await this.fileToArrayBuffer(options.data)
        : (options.data as string | ArrayBuffer);

    const result = await shp(source);
    const geojson: FeatureCollection = Array.isArray(result)
      ? {
          type: "FeatureCollection",
          features: result.flatMap((collection) => collection.features),
        }
      : result;

    return loadVectorGeoJsonLayer(this.viewer, this.deps, geojson, {
      id: options.id,
      title: options.title,
      layerType: "SHP",
      clampToGround: options.clampToGround ?? true,
    });
  }

  // ── İç: CSV ──────────────────────────────────────────────────────────────

  async addCsv(options: LocalLayerOptions): Promise<ManagedLayer> {
    let Papa: (typeof import("papaparse"))["default"];
    try {
      ({ default: Papa } = await import("papaparse"));
    } catch {
      throw new LayerOperationError(
        "LAYER_CSV_PACKAGE_MISSING",
        'CSV katmanı için "papaparse" paketi gereklidir: papaparse kütüphanesini import etmelisiniz'
      );
    }

    const text =
      options.data instanceof File
        ? await this.fileToText(options.data)
        : (options.data as string);

    const parsed = Papa.parse<Record<string, unknown>>(text, {
      header: true,
      dynamicTyping: true,
    });
    const rows = parsed.data;
    const sample = rows.find((row) => row && Object.keys(row).length > 0);
    const keys = sample && this.detectLatLonKeys(sample);
    if (!keys) {
      throw new LayerOperationError("LAYER_CSV_LATLON_NOT_FOUND", "CSV içinde lat/lon sütunlarını bulamadım (ör: lat, lon).");
    }

    const color = this.deps.styleEngine.randomLayerColor();
    const dataSource = new CustomDataSource(options.title);
    for (const row of rows) {
      const lat = Number(row[keys.lat]);
      const lon = Number(row[keys.lon]);
      if (Number.isFinite(lat) && Number.isFinite(lon)) {
        dataSource.entities.add({
          position: Cartesian3.fromDegrees(lon, lat),
          point: { pixelSize: 6, color },
          properties: row,
        });
      }
    }

    await this.viewer.dataSources.add(dataSource);
    const colorHex = color.toCssHexString();
    const managed = this.deps.register(
      options.id,
      options.title,
      "CSV",
      dataSource,
      false,
      colorHex
    );
    this.deps.styleEngine.recordInitialStyle(managed.id, colorHex, 1, {
      enabled: false,
      color: colorHex,
      width: 0,
    });
    return managed;
  }

  // CSV basliklarindaki lat/lon sutunlarini yaygin adlandirma varyasyonlarina
  // gore (case-insensitive) bulur; bulamazsa null doner.
  detectLatLonKeys(
    row: Record<string, unknown>
  ): { lat: string; lon: string } | null {
    const keys = Object.keys(row).reduce(
      (acc, key) => {
        const lowerKey = key.toLowerCase();
        if (!acc.lat && /^(lat|latitude|y)$/.test(lowerKey)) acc.lat = key;
        if (!acc.lon && /^(lon|lng|long|longitude|x)$/.test(lowerKey))
          acc.lon = key;
        return acc;
      },
      { lat: "", lon: "" }
    );
    return keys.lat && keys.lon ? keys : null;
  }

  async fileToText(file: File): Promise<string> {
    return decodeTextBuffer(await file.arrayBuffer());
  }

  fileToBlobUrl(file: File): string {
    return URL.createObjectURL(file);
  }

  fileToArrayBuffer(file: File): Promise<ArrayBuffer> {
    return file.arrayBuffer();
  }
}

/** {@link loadVectorGeoJsonLayer}'ın kullandığı bağımlılıklar ({@link LocalSourceLoaderDeps} ve `OgcLayerFactoryDeps` ikisi de sağlar). */
export type VectorGeoJsonLayerDeps = Pick<
  LocalSourceLoaderDeps,
  | "styleEngine"
  | "outlineGeometry"
  | "addPolygonOutlines"
  | "register"
  | "emitCrsCheckResult"
  | "waitForRenderSettle"
  | "defaultOutlineColor"
  | "defaultOutlineColorHex"
>;

// WFS (OgcLayerFactory.addWFS) ve SHP (LocalSourceLoader.addShp) BIREBIR AYNI
// "GeoJSON'u vektor katman olarak yukle" kuyrugunu paylasir: CRS kontrolu ->
// rastgele renk -> GeoJsonDataSource.load -> materyal paylasimini kirma ->
// isaret->nokta -> riskli outline/supheli geometri -> (zemine oturtulmussa)
// dis-hat companion'i -> haritaya ekleme -> kayit -> CRS olayi -> baslangic
// stili -> render'in oturmasini bekleme. KML/GeoJSON yolu (addLocalKmlGeoJson)
// sirasi FARKLI oldugu icin bunu kullanmaz.

/**
 * GeoJSON verisini rastgele renkli bir vektör katmanı olarak haritaya ekler ve kaydeder.
 * @param viewer - Katmanın ekleneceği Cesium Viewer.
 * @param deps - Stil/outline yardımcıları ve LayerManager geri çağrıları.
 * @param geojson - Yüklenecek GeoJSON verisi.
 * @param layer - Katman kimliği, başlığı, türü ve istenen `clampToGround` (CRS şüpheliyse yok sayılır).
 * @param afterRegister - Kayıt ve CRS olayından hemen sonra, başlangıç stili kaydedilmeden önce çağrılır (ör. WFS'in "kesildi" olayı).
 * @returns Kaydedilen yönetilen katman.
 */
export async function loadVectorGeoJsonLayer(
  viewer: Viewer,
  deps: VectorGeoJsonLayerDeps,
  geojson: Parameters<typeof GeoJsonDataSource.load>[0],
  layer: { readonly id: string; readonly title: string; readonly layerType: LayerType; readonly clampToGround: boolean },
  afterRegister?: (managed: ManagedLayer) => void,
): Promise<ManagedLayer> {
  const crsInfo = await ensureGeoJsonCrsSupport(geojson);
  const color = deps.styleEngine.randomLayerColor();
  // bkz isSuspiciousCrsResult WHY yorumu -- koordinatlar supheliyse
  // (cozulemeyen/tanimsiz CRS ya da gecersiz aralikta) clampToGround
  // (ground-primitive) KAPATILIR, aksi halde tarayici zoom/pan'da
  // donup/cokebilir.
  const clampToGround = isSuspiciousCrsResult(crsInfo) ? false : layer.clampToGround;
  const dataSource = await GeoJsonDataSource.load(geojson, {
    clampToGround,
    fill: color.withAlpha(0.5),
    stroke: color,
    strokeWidth: 2,
    markerColor: color,
  });
  // GeoJsonDataSource.load'daki fill/stroke/markerColor secenekleri,
  // GeoJSON'da per-feature simplestyle "fill" alani YOKSA (bu katmanlarin
  // hepsinde durum bu) Cesium tarafindan TUM entity'lere TEK bir paylasilan
  // materyal/property nesnesi olarak atanir. applyLayerStyle()'daki
  // updateColorMaterial() ise (flicker'i onlemek icin) mevcut nesneyi
  // YENIDEN OLUSTURMAK yerine YERINDE mutasyona ugratir -- bu ikisi
  // birlesince enum/gradient/bin modunda TUM poligonlar en son islenen
  // entity'nin rengini gosteriyordu (bkz applyEntityColor'in KmlDataSource
  // icin yaptigi ayni "un-share" islemi). Her entity'ye BASTAN bagimsiz bir
  // materyal nesnesi vererek bu paylasimi kiriyoruz.
  deps.styleEngine.applyEntityColor(dataSource, color);
  deps.styleEngine.convertMarkersToPoints(dataSource, color);
  deps.outlineGeometry.disableRiskyPolygonOutlines(dataSource);
  if (isSuspiciousCrsResult(crsInfo)) deps.outlineGeometry.flattenSuspiciousGeometry(dataSource);
  if (clampToGround) {
    deps.addPolygonOutlines(dataSource, deps.defaultOutlineColor, 2);
  }
  await viewer.dataSources.add(dataSource);
  const colorHex = color.toCssHexString();
  const managed = deps.register(layer.id, layer.title, layer.layerType, dataSource, false, colorHex);
  deps.emitCrsCheckResult(managed.id, crsInfo);
  afterRegister?.(managed);
  // Dis hat rengi dolgunun aksine RASTGELE degil, sabit bir varsayilan
  // (TucbsStyleEditor'un DEFAULT_OUTLINE_COLOR/WIDTH'iyle ayni deger --
  // "Sifirla" bu ikisinin ayni maviye/genislige donmesini bekliyor).
  deps.styleEngine.recordInitialStyle(managed.id, colorHex, 0.5, {
    enabled: true,
    color: deps.defaultOutlineColorHex,
    width: 2,
  });
  // bkz waitForRenderSettle() yorumu -- cagiran taraf (TucbsFileUpload/
  // TucbsServiceUpload) "Yukleniyor…" gostergesini bu Promise cozulene
  // kadar tutabilsin diye.
  await deps.waitForRenderSettle();
  return managed;
}

// Bu SDK'nin hedefledigi Turkiye kamu servisleri/veri setleri (WFS yanitlari,
// kullanicinin yukledigi .geojson/.csv dosyalari) siklikla Windows-1254/
// ISO-8859-9 (Turkce icin yaygin 8-bit kodlama) kullanir ama bunu HICBIR
// YERDE (Content-Type header'i, dosya icinde) beyan etmez. `File.text()` ve
// `Response.json()`/`.text()` gibi standart API'ler byle durumlarda SESSIZCE
// UTF-8'e duser; bu da Turkce harflerin (Ö, İ, Ş, Ğ, Ü, ı) "�" (U+FFFD) ile
// bozulmasina yol acar (ör. "KIRKGÖZ" -> "KIRKG�Z"). Once katı (fatal) UTF-8
// denenir -- gercekten UTF-8 ise (veya sadece ASCII ise) hicbir fark
// yaratmaz. GECERSIZ bir bayt dizisiyle patlarsa (Windows-1254 metninde HER
// ZAMAN boyle olur, cunku tek-baytlik Turkce harfler gecerli UTF-8 devam
// baytlari degildir) Windows-1254'e dusulur.
export function decodeTextBuffer(buffer: ArrayBuffer): string {
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(buffer);
  } catch {
    return new TextDecoder("windows-1254").decode(buffer);
  }
}
