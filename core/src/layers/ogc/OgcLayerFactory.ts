import {
  GetFeatureInfoFormat,
  ImageryLayer,
  Rectangle,
  Resource,
  SingleTileImageryProvider,
  WebMapServiceImageryProvider,
  WebMapTileServiceImageryProvider,
  WebMercatorTilingScheme,
  type Color,
  type DataSource,
  type Viewer,
} from "cesium";
import { LayerOperationError, OgcRequestError } from "../../shared/TucbsError.js";
import * as layerExporter from "../export/LayerExporter.js";
import type { CrsCheckResult } from "../sources/geojsonCrs.js";
import { decodeTextBuffer, loadVectorGeoJsonLayer } from "../sources/LocalSourceLoader.js";
import type {
  GeoTiffLayerOptions,
  LayerType,
  ManagedLayer,
  ServiceStyleOption,
  WCSLayerOptions,
  WFSLayerOptions,
  WMSLayerOptions,
  WMTSLayerOptions,
} from "../../types/index.js";
import {
  appendWfsGetFeatureParams,
  buildWfsGetFeaturePlan,
  fetchWfsCapabilities,
  isOgcExceptionXml,
  type WfsGetFeaturePlan,
} from "./wfsCapabilities.js";
import * as ogcCapabilities from "./capabilities.js";
import type { ApiKeyPolicy } from "../../auth/ApiKeyPolicy.js";
import type { LayerStyleEngine } from "../style/LayerStyleEngine.js";
import type { OutlineGeometry } from "../style/OutlineGeometry.js";

export interface OgcLayerFactoryDeps {
  // Kardes moduller DOGRUDAN verilir (bkz LayerStyleEngine'e outlineGeometry/
  // opacityController'in verilisi) -- eskiden her metodu LayerManager'daki tek
  // satirlik bir private yonlendirme uzerinden ayri ayri geciliyordu.
  readonly apiKeyPolicy: ApiKeyPolicy;
  readonly styleEngine: LayerStyleEngine;
  readonly outlineGeometry: OutlineGeometry;
  requireLayer(id: string): ManagedLayer;
  setItem(id: string, managed: ManagedLayer): void;
  register(
    id: string,
    title: string,
    layerType: LayerType,
    cesiumObject: ImageryLayer | DataSource,
    isBasemap: boolean,
    initialFillColor?: string
  ): ManagedLayer;
  // LayerManager'da KALIR: outline'in ustune dinamik dolgu (OpacityController)
  // mantigi ekler, salt bir yonlendirme degil.
  addPolygonOutlines(dataSource: DataSource, color: Color, width: number): void;
  emitCrsCheckResult(id: string, result: CrsCheckResult | null): void;
  emitFeaturesTruncated(id: string, totalCount: number, loadedCount: number): void;
  waitForRenderSettle(): Promise<void>;
  readonly defaultOutlineColor: Color;
  readonly defaultOutlineColorHex: string;
}

export class OgcLayerFactory {
  // GECICI (bkz addWFS icindeki ayni WHY yorumu ve kullanici bildirimi:
  // "Biz tümünü yükleyelim verinin ilk etapta") -- WFS "count"/"maxFeatures"
  // parametresi icin varsayilan 5000 yerine KENDIMIZ COK YUKSEK bir tavan
  // kullaniyoruz ki katmanlar (performans sorunu cikana kadar) HIC
  // kesilmeden tam yuklensin.
  private static readonly TEMP_WFS_UNLIMITED_MAX_FEATURES = 1_000_000;

  // WMS/WMTS katmanlarinin orijinal add() secenekleri -- setWmsStyle/setWmtsStyle
  // ImageryLayer'i yeniden kurarken (provider parametreleri immutable) ihtiyac
  // duyar, ManagedLayer bunu saklamiyor (bkz. "Katman stili: WMS/WMTS").
  private readonly serviceLayerOptions = new Map<
    string,
    WMSLayerOptions | WMTSLayerOptions | WCSLayerOptions
  >();

  constructor(
    private readonly viewer: Viewer,
    private readonly deps: OgcLayerFactoryDeps
  ) {}

  getServiceOptions(id: string): WMSLayerOptions | WMTSLayerOptions | WCSLayerOptions | undefined {
    return this.serviceLayerOptions.get(id);
  }

  deleteServiceOptions(id: string): void {
    this.serviceLayerOptions.delete(id);
  }

  // ── İç: WMS ──────────────────────────────────────────────────────────────

  private buildWmsProvider(options: WMSLayerOptions): WebMapServiceImageryProvider {
    const url = this.deps.apiKeyPolicy.resolveOgcProxyUrl("wms", options.url);
    const layers = options.layers?.trim();
    if (!layers) {
      throw new LayerOperationError(
        "LAYER_WMS_LAYERS_EMPTY",
        `WMS katmani eklenemedi: layers (ogcLayerName) bos — id=${options.id}`,
      );
    }
    // WMS GetMap (tile) istegi Cesium'un Resource sinifi uzerinden gittigi
    // icin header tasiyabilir -- apiKey burada HEADER olarak eklenir (query
    // degil), bkz. mergeApiKeyHeader.
    const headers = this.deps.apiKeyPolicy.mergeApiKeyHeader(
      this.deps.apiKeyPolicy.buildAuthHeaders(options.authToken),
      url
    );
    const version = options.version ?? "1.3.0";
    const provider = new WebMapServiceImageryProvider({
      url: headers
        ? new Resource({ url, headers })
        : url,
      layers,
      parameters: {
        service: "WMS",
        version,
        request: "GetMap",
        transparent: "true",
        format: "image/png",
        ...options.parameters,
      },
      // Cesium'un GetFeatureInfo varsayilani ("version:1.1.1", styles YOK)
      // GetMap tarafindaki (yukaridaki) parametrelerden TAMAMEN bagimsizdir --
      // GetMap'te version 1.3.0 kullanilirken GetFeatureInfo'nun sessizce
      // 1.1.1'e sabit kalmasi crs/srs parametre adi uyusmazligina yol aciyor,
      // ayrica STYLES parametresini zorunlu tutan (WMS spec'e gore GetMap ile
      // ayni parametreleri bekleyen) sunucularda (orn. MapServer varsayilan
      // yapilandirmasi) "Missing required parameter STYLES/SRS" hatasiyla
      // GetFeatureInfo tamamen basarisiz oluyordu -- InteractionManager'in
      // WMS/WMTS identify akisinin gercek dunyada calismasi icin bu ikisini
      // GetMap ile tutarli tutuyoruz.
      getFeatureInfoParameters: {
        version,
        styles: options.parameters?.styles ?? "",
      },
      // Cesium'un VARSAYILAN format zinciri (json -> text/xml -> text/html)
      // GERCEK dunyada COK sunucuda (orn. MapServer'in varsayilan/demo
      // kurulumu -- bkz kullanici geri bildirimi: "WMS sorgusu yapinca
      // Sorgulanıyor... loading dönüyor, sonuç yok") sessizce basarisiz
      // oluyordu: sunucu "text/xml" INFO_FORMAT'ini DESTEKLEMEDIGINI bir
      // ServiceExceptionReport (yine de GECERLI bir XML govdesi!) ile
      // bildiriyor -- Cesium bunu "basarili ama BOS" bir XML yaniti sanip
      // zincire DEVAM ETMIYOR, gercekten calisan "text/html" adimina hic
      // ulasilmiyordu. Ayrica coklu WMS sunucusu (MapServer/GeoServer)
      // gercek GML feature verisini "text/xml" yerine klasik
      // "application/vnd.ogc.gml" MIME'i altinda sunuyor -- bu, ayni
      // Cesium xmlToFeatureInfo parser'iyla (type:"xml") calisir, sadece
      // FARKLI bir INFO_FORMAT sorgu degeri ister. Bu yuzden zincire hem bu
      // klasik GML varyanti hem de HER ZAMAN calisan bir "html" son care
      // fallback'i eklenir -- "json" hala ILK denenen (destekleyen modern
      // sunucularda en zengin/yapisal sonucu verir).
      getFeatureInfoFormats: [
        new GetFeatureInfoFormat("json"),
        new GetFeatureInfoFormat("xml", "application/vnd.ogc.gml"),
        new GetFeatureInfoFormat("xml", "text/xml"),
        new GetFeatureInfoFormat("html"),
      ],
      ...(options.rectangle !== undefined && { rectangle: options.rectangle }),
      ...(options.minimumLevel !== undefined && {
        minimumLevel: options.minimumLevel,
      }),
      ...(options.maximumLevel !== undefined && {
        maximumLevel: options.maximumLevel,
      }),
      ...(options.tileWidth !== undefined && { tileWidth: options.tileWidth }),
      ...(options.tileHeight !== undefined && {
        tileHeight: options.tileHeight,
      }),
    });
    return provider;
  }

  addWMS(options: WMSLayerOptions): Promise<ManagedLayer> {
    const provider = this.buildWmsProvider(options);
    const imageryLayer = this.viewer.imageryLayers.addImageryProvider(provider);
    const managed = this.deps.register(options.id, options.title, "WMS", imageryLayer, false);
    this.serviceLayerOptions.set(options.id, options);
    return Promise.resolve(managed);
  }

  // ── İç: WMTS ─────────────────────────────────────────────────────────────

  private buildWmtsProvider(options: WMTSLayerOptions): WebMapTileServiceImageryProvider {
    const url = this.deps.apiKeyPolicy.resolveOgcProxyUrl("wmts", options.url);
    // WMTS GetTile de WMS gibi Resource uzerinden gider -- apiKey header
    // olarak eklenir (bkz. mergeApiKeyHeader).
    const headers = this.deps.apiKeyPolicy.mergeApiKeyHeader(
      this.deps.apiKeyPolicy.buildAuthHeaders(options.authToken),
      url
    );
    return new WebMapTileServiceImageryProvider({
      url: headers
        ? new Resource({ url, headers })
        : url,
      layer: options.layer,
      style: options.style ?? "default",
      tileMatrixSetID: options.tileMatrixSetID,
      format: options.format ?? "image/png",
      tilingScheme: new WebMercatorTilingScheme(),
      ...(options.tileWidth !== undefined && { tileWidth: options.tileWidth }),
      ...(options.tileHeight !== undefined && {
        tileHeight: options.tileHeight,
      }),
      ...(options.minimumLevel !== undefined && {
        minimumLevel: options.minimumLevel,
      }),
      ...(options.maximumLevel !== undefined && {
        maximumLevel: options.maximumLevel,
      }),
      ...(options.rectangle !== undefined && { rectangle: options.rectangle }),
    });
  }

  addWMTS(options: WMTSLayerOptions): Promise<ManagedLayer> {
    const provider = this.buildWmtsProvider(options);
    const imageryLayer = this.viewer.imageryLayers.addImageryProvider(provider);
    const managed = this.deps.register(options.id, options.title, "WMTS", imageryLayer, false);
    this.serviceLayerOptions.set(options.id, options);
    return Promise.resolve(managed);
  }

  // ── Katman stili: WMS/WMTS (B1 — sunucu-tanımlı stil seçimi) ────────────────
  // Vektör stil motorunun (applyLayerStyle) aksine burada renk client-side
  // HESAPLANMIYOR — sunucunun GetCapabilities'te tanımladığı hazır "Style"lar
  // arasından seçim yapılıp ImageryLayer, seçilen STYLES parametresiyle
  // YENİDEN kuruluyor (Cesium'da provider parametreleri construct-sonrası
  // immutable). Lejant, WMS'te ayrı bir GetLegendGraphic isteğiyle, WMTS'te
  // ise mümkünse doğrudan capabilities içindeki <LegendURL>'den alınır (bkz.
  // project_ucbp_api_styleeditor_arastirma memory, B2/client-side SLD KAPSAM
  // DIŞI kararı).

  /** Bir WMS katmanının sunucu-tanımlı (GetCapabilities'ten) stil seçeneklerini, lejant URL'leriyle birlikte döndürür. */
  async getWmsAvailableStyles(id: string): Promise<ServiceStyleOption[]> {
    const options = this.requireServiceOptions(id, "WMS") as WMSLayerOptions;
    const version = options.version ?? "1.3.0";
    const xml = await this.getCapabilitiesDocument(options.url, "WMS", version, options.authToken);
    return ogcCapabilities.parseWmsStyles(xml, options.layers).map((style) => ({
      ...style,
      legendUrl: this.getWmsLegendGraphicUrl(id, style.name),
    }));
  }

  /** WMS katmanını seçilen sunucu-tanımlı stille (STYLES parametresiyle) yeniden kurar. */
  async setWmsStyle(id: string, styleName: string): Promise<void> {
    const options = this.requireServiceOptions(id, "WMS") as WMSLayerOptions;
    const updated: WMSLayerOptions = {
      ...options,
      parameters: { ...options.parameters, STYLES: styleName },
    };
    await this.rebuildImageryLayer(id, () => this.buildWmsProvider(updated));
    this.serviceLayerOptions.set(id, updated);
  }

  /** WMS GetLegendGraphic URL'ini (apiKey varsa query parametresiyle) oluşturur. */
  getWmsLegendGraphicUrl(id: string, styleName?: string): string {
    const options = this.requireServiceOptions(id, "WMS") as WMSLayerOptions;
    const params = new URLSearchParams({
      service: "WMS",
      version: options.version ?? "1.3.0",
      request: "GetLegendGraphic",
      format: "image/png",
      layer: options.layers,
      // MapServer GetLegendGraphic'i SLD_VERSION olmadan
      // "MissingParameterValue" hatasiyla reddediyor (gercek demo.mapserver.org
      // istegiyle dogrulandi); GeoServer bu parametreyi zaten yok sayiyor
      // (regresyon yok) -- bkz. project_ucbp_api_styleeditor_arastirma memory.
      sld_version: "1.1.0",
      ...(styleName !== undefined && styleName !== "" ? { style: styleName } : {}),
    });
    // GetLegendGraphic — <img src>; apiKey query (tucbsapikey) ile proxy üzerinden.
    const proxyBase = this.deps.apiKeyPolicy.resolveOgcProxyUrl("wms", options.url);
    return this.deps.apiKeyPolicy.attachApiKeyToUrl(
      `${proxyBase}${proxyBase.includes("?") ? "&" : "?"}${params.toString()}`,
    );
  }

  /** Bir WMTS katmanının sunucu-tanımlı (GetCapabilities'ten) stil seçeneklerini, lejant URL'leriyle birlikte döndürür. */
  async getWmtsAvailableStyles(id: string): Promise<ServiceStyleOption[]> {
    const options = this.requireServiceOptions(id, "WMTS") as WMTSLayerOptions;
    const xml = await this.getCapabilitiesDocument(options.url, "WMTS", "1.0.0", options.authToken);
    const styles = ogcCapabilities.parseWmtsStyles(xml, options.layer);
    // WMTS legend'i de WMS gibi <img src> ile cekiliyor (bkz.
    // TucbsLegendPanel._renderServiceLegend — WMS ile AYNI <img> elemani
    // kullanilir), yani ayni header-tasiyamama kisiti burada da gecerli.
    // capabilities XML'inden gelen her legendUrl'e query param eklenir.
    return styles.map((style) => ({
      ...style,
      legendUrl: this.deps.apiKeyPolicy.attachApiKeyToUrl(style.legendUrl),
    }));
  }

  /** WMTS katmanını seçilen sunucu-tanımlı stille yeniden kurar. */
  async setWmtsStyle(id: string, styleName: string): Promise<void> {
    const options = this.requireServiceOptions(id, "WMTS") as WMTSLayerOptions;
    const updated: WMTSLayerOptions = { ...options, style: styleName };
    await this.rebuildImageryLayer(id, () => this.buildWmtsProvider(updated));
    this.serviceLayerOptions.set(id, updated);
  }

  // ── İç: WFS ──────────────────────────────────────────────────────────────

  async addWFS(options: WFSLayerOptions): Promise<ManagedLayer> {
    const proxyUrl = this.deps.apiKeyPolicy.resolveOgcProxyUrl("wfs", options.url);
    const fetchOptions: RequestInit = {};
    if (options.authToken !== undefined) {
      fetchOptions.headers = { Authorization: `Bearer ${options.authToken}` };
    }
    // WFS GetFeature duz fetch() ile gittigi icin header tasiyabilir --
    // apiKey (varsa) burada header olarak eklenir.
    const headersWithApiKey = this.deps.apiKeyPolicy.mergeApiKeyHeader(
      fetchOptions.headers as Record<string, string> | undefined,
      proxyUrl
    );
    if (headersWithApiKey !== undefined) fetchOptions.headers = headersWithApiKey;

    const proxied = { ...options, url: proxyUrl };

    const caps = await fetchWfsCapabilities(proxyUrl, fetchOptions);
    const planArgs: Parameters<typeof buildWfsGetFeaturePlan>[0] = {
      url: proxyUrl,
      typeNameHint: options.typeName,
      caps,
    };
    if (options.version !== undefined) planArgs.version = options.version;
    if (options.srsName !== undefined) planArgs.srsName = options.srsName;
    if (options.outputFormat !== undefined) {
      planArgs.outputFormat = options.outputFormat;
    }
    if (options.maxFeatures !== undefined) {
      planArgs.maxFeatures = options.maxFeatures;
    } else {
      // GECICI (bkz kullanici bildirimi: "Biz tümünü yükleyelim verinin ilk
      // etapta. Performans sorun olmazsa sana hiç yazmam. Olursa
      // COMMENT'lediklerimizi geri aç diye yazarım.") -- asagidaki kesilme
      // TESPIT/UYARI mantigi (hitsCount/truncatedTotal, bkz yorum satirina
      // alinmis blok) BU YUZDEN devre disi birakildi: "count"/"maxFeatures"
      // sinirini KENDIMIZ COK YUKSEK tutarak katmanin TAMAMINI ilk etapta
      // yuklüyoruz. Performans sorunu CIKARSA: (1) bu satiri silin, (2)
      // asagidaki yorumlanmis blogu geri acin -- boylece varsayilan tekrar
      // 5000'e (bkz wfsCapabilities.ts buildWfsGetFeaturePlan) doner ve
      // kesilme durumunda kullaniciya uyari gosterilir.
      planArgs.maxFeatures = OgcLayerFactory.TEMP_WFS_UNLIMITED_MAX_FEATURES;
    }
    const plan = buildWfsGetFeaturePlan(planArgs);

    // "count"/"maxFeatures" limitini asan katmanlarda sunucu bunu SESSIZCE
    // keser -- gercek veriyi cekmeden ONCE (mumkunse) toplam kayit sayisini
    // ogrenip kesildiyse kullaniciya acikca bildirmek icin yazilmisti (bkz
    // "layer:features-truncated" event'i, TucbsFileUpload/TucbsServiceUpload
    // dinleyicileri). YUKARIDAKI GECICI "TEMP_WFS_UNLIMITED_MAX_FEATURES"
    // karari yuzunden su an devre disi (bkz o yorumun WHY'i) -- performans
    // sorunu cikarsa yukaridaki "else" dalini silip BURAYI geri acin.
    // const hitsCount = await this.fetchWfsHitsCount(proxied, fetchOptions, plan);
    // let truncatedTotal: number | undefined =
    //   hitsCount !== undefined && hitsCount > plan.maxFeatures ? hitsCount : undefined;
    let truncatedTotal: number | undefined;

    // harita-3d ile ayni: once capabilities'ten typeNames + sunucunun JSON
    // formati (orn. ArcGIS GEOJSON); desteklenmiyorsa GML'e dus.
    let geojson: unknown;
    try {
      geojson = await this.fetchWfsGeoJson(proxied, fetchOptions, plan);
    } catch (geoJsonError) {
      // ML-13 duzeltmesi: fallback tetiklenmesi AYNI kalir (JSON basarisiz
      // -> GML dene); ama GML DE basarisiz olursa eskiden orijinal JSON
      // hatasi tamamen kayboluyordu (bare catch {}). Simdi GML'in kendi
      // hatasi fırlatılmaya devam eder, sadece orijinal JSON hatasi .cause
      // olarak eklenip korunur (bkz project_ucbp_api_ogclayerfactory_uygulama_plani, ML-13).
      try {
        geojson = await this.fetchWfsGml(proxied, fetchOptions, plan);
      } catch (gmlError) {
        if (gmlError instanceof Error) {
          gmlError.cause = geoJsonError;
        }
        throw gmlError;
      }
    }
    const loadedFeatures =
      geojson !== null && typeof geojson === "object"
        ? (geojson as { features?: unknown }).features
        : undefined;
    // Bazi sunucular resultType=hits'i desteklemez/yoksayar ama GERCEK
    // GetFeature GeoJSON yanitinda "numberMatched" alanini yine de ekler --
    // hits ONCEDEN yakalanamadiysa SON CARE olarak bunu da kontrol eden
    // blok -- yukaridaki GECICI karar yuzunden o da devre disi (bkz yukarisi).
    // if (truncatedTotal === undefined && geojson !== null && typeof geojson === "object") {
    //   const numberMatched = (geojson as { numberMatched?: unknown }).numberMatched;
    //   if (
    //     typeof numberMatched === "number" &&
    //     Array.isArray(loadedFeatures) &&
    //     numberMatched > loadedFeatures.length
    //   ) {
    //     truncatedTotal = numberMatched;
    //   }
    // }
    const loadedFeatureCount = Array.isArray(loadedFeatures)
      ? loadedFeatures.length
      : plan.maxFeatures;

    return loadVectorGeoJsonLayer(
      this.viewer,
      this.deps,
      geojson,
      { id: options.id, title: options.title, layerType: "WFS", clampToGround: options.clampToGround ?? false },
      (managed) => {
        if (truncatedTotal !== undefined) {
          this.deps.emitFeaturesTruncated(managed.id, truncatedTotal, loadedFeatureCount);
        }
      },
    );
  }

  // WFS 2.0/1.1'in "resultType=hits" ozelligiyle (WFS core spec'inin
  // ZORUNLU bir parcasi) geometri hic cekilmeden SADECE toplam eslesen
  // kayit sayisini sorar -- kucuk/hizli bir istek. Amac: "count"/"maxFeatures"
  // limitini asan devasa katmanlarda (bkz kullanici bildirimi: 27458 kayitlik
  // bir WFS demo katmani sessizce 5000'de kesilip kullaniciya YANLIŞLIKLA
  // TAMAMMIŞ gibi eksik/tutarsiz gorunuyordu) veriyi hic INDIRMEDEN once
  // limitin asilip asilmadigini ogrenip ACIK bir hatayla REDDETMEK.
  // Sunucu hits'i desteklemiyorsa/beklenmedik bir yanit donerse (WFS 1.0'da
  // resultType hic yok, bazi sunucular XML yerine kendi formatinda yanit
  // verebilir) sessizce undefined doner -- cagiran taraf bu durumda
  // (fetchWfsGeoJson/fetchWfsGml'in GERCEK yanitindaki "numberMatched"
  // alanina bakan) SON CARE kontrolune guvenir.
  private async fetchWfsHitsCount(
    options: WFSLayerOptions,
    fetchOptions: RequestInit,
    plan: WfsGetFeaturePlan
  ): Promise<number | undefined> {
    if (!plan.version.startsWith("2.") && !plan.version.startsWith("1.1")) {
      return undefined;
    }
    const params = new URLSearchParams();
    appendWfsGetFeatureParams(params, plan);
    // "count"/"maxFeatures" burada BILEREK kaldiriliyor -- bazi sunucular
    // (bkz kullanici bildirimi testi: demo.mapserver.org) hits modunda dahi
    // "numberMatched"i bu limite gore KESIYOR, bu da gercek toplam sayiyi
    // hic ogrenememize (limit hep "asilmiyormus" gibi gorunmesine) yol acardi.
    params.delete("count");
    params.delete("maxFeatures");
    params.set("resultType", "hits");

    let response: Response;
    try {
      response = await fetch(
        `${options.url}${options.url.includes("?") ? "&" : "?"}${params.toString()}`,
        fetchOptions
      );
    } catch {
      return undefined;
    }
    if (!response.ok) return undefined;

    const text = decodeTextBuffer(await response.arrayBuffer());
    if (isOgcExceptionXml(text)) return undefined;

    const trimmed = text.trimStart();
    if (trimmed.startsWith("{")) {
      try {
        const json = JSON.parse(trimmed) as {
          numberMatched?: unknown;
          totalFeatures?: unknown;
        };
        const count = json.numberMatched ?? json.totalFeatures;
        return typeof count === "number" ? count : undefined;
      } catch {
        return undefined;
      }
    }

    try {
      const root = new DOMParser().parseFromString(text, "application/xml").documentElement;
      const raw =
        root.getAttribute("numberMatched") ??
        root.getAttribute("numberOfFeatures") ??
        root.getAttribute("numberReturned");
      if (!raw) return undefined;
      const count = Number(raw);
      return Number.isFinite(count) ? count : undefined;
    } catch {
      return undefined;
    }
  }

  private async fetchWfsGeoJson(
    options: WFSLayerOptions,
    fetchOptions: RequestInit,
    plan: WfsGetFeaturePlan
  ): Promise<unknown> {
    const outputFormat = plan.jsonOutputFormat;
    if (!outputFormat) {
      throw new OgcRequestError("OGC_WFS_JSON_FORMAT_UNSUPPORTED", "WFS sunucusu JSON çıktı formatı ilan etmiyor.");
    }

    const params = new URLSearchParams();
    appendWfsGetFeatureParams(params, plan, outputFormat);

    const response = await fetch(
      `${options.url}${options.url.includes("?") ? "&" : "?"}${params.toString()}`,
      fetchOptions
    );
    const text = decodeTextBuffer(await response.arrayBuffer());
    if (!response.ok || isOgcExceptionXml(text) || !text.trimStart().startsWith("{")) {
      throw new OgcRequestError(
        "OGC_WFS_GEOJSON_REQUEST_FAILED",
        `WFS GeoJSON isteği başarısız: ${response.status} ${response.statusText}`
      );
    }
    return JSON.parse(text);
  }

  // outputFormat parametresi verilmez; sunucu boylece kendi varsayilan
  // (genelde GML) cikisini doner. "ol" bu GML yanitini (WFS 1.0/1.1/2.0,
  // GML2/3/3.2) parse edip GeoJSON'a cevirir.
  private async fetchWfsGml(
    options: WFSLayerOptions,
    fetchOptions: RequestInit,
    plan: WfsGetFeaturePlan
  ): Promise<unknown> {
    const params = new URLSearchParams();
    appendWfsGetFeatureParams(params, plan);

    const response = await fetch(
      `${options.url}${options.url.includes("?") ? "&" : "?"}${params.toString()}`,
      fetchOptions
    );
    if (!response.ok) {
      throw new OgcRequestError(
        "OGC_WFS_REQUEST_FAILED",
        `WFS isteği başarısız: ${response.status} ${response.statusText}`
      );
    }
    const gml = decodeTextBuffer(await response.arrayBuffer());
    if (isOgcExceptionXml(gml)) {
      throw new OgcRequestError("OGC_WFS_EXCEPTION", "WFS GetFeature OGC Exception döndü.");
    }

    let WFSFormat: (typeof import("ol/format/WFS.js"))["default"];
    let GeoJSONFormat: (typeof import("ol/format/GeoJSON.js"))["default"];
    try {
      ({ default: WFSFormat } = await import("ol/format/WFS.js"));
      ({ default: GeoJSONFormat } = await import("ol/format/GeoJSON.js"));
    } catch {
      throw new OgcRequestError(
        "OGC_WFS_OL_PACKAGE_MISSING",
        'WFS sunucusu GeoJSON çıktısı desteklemiyor; GML yanıtını okumak için "ol" paketi gereklidir: pnpm add ol'
      );
    }

    const features = new WFSFormat({
      version: plan.version,
    }).readFeatures(gml);
    return new GeoJSONFormat().writeFeaturesObject(features, {
      featureProjection: "EPSG:4326",
    });
  }

  // ── İç: WCS ──────────────────────────────────────────────────────────────

  async addWCS(options: WCSLayerOptions): Promise<ManagedLayer> {
    // ML-08 duzeltmesi: WMS/WMTS/WFS'in HEPSI resolveOgcProxyUrl kullanirken
    // addWCS bunu YAPMIYORDU, ham options.url'e gidiyordu -- CORS-korumalı/
    // apiKey-proxy'li WCS sunucularinda sessizce basarisiz olabiliyordu
    // (bkz project_ucbp_api_ogclayerfactory_uygulama_plani, ML-08). apiKey
    // configure edilmemisse resolveOgcProxyUrl no-op'tur (upstreamUrl aynen
    // doner), yani apiKey'siz kullanimda davranis DEGISMEZ.
    const proxyUrl = this.deps.apiKeyPolicy.resolveOgcProxyUrl("wcs", options.url);
    const baseParams: Record<string, string> = {
      service: "WCS",
      version: options.version ?? "2.0.1",
      request: "GetCoverage",
      coverageId: options.coverageId,
      // format belirtilmezse sunucu genelde GeoTIFF gibi tarayicinin <img> ile
      // decode edemedigi bir format doner (SingleTileImageryProvider gorseli
      // dogrudan bir <img> olarak yukler); bu yuzden varsayilani PNG'ye sabitliyoruz.
      format: options.format ?? "image/png",
    };

    // WCS GetCoverage da fetch-tabanli (resolveWcsImageUrl icinde) --
    // apiKey header olarak eklenir.
    const headers = this.deps.apiKeyPolicy.mergeApiKeyHeader(
      this.deps.apiKeyPolicy.buildAuthHeaders(options.authToken),
      proxyUrl
    );
    const rect =
      options.rectangle ?? Rectangle.fromDegrees(-180, -90, 180, 90);

    // SingleTileImageryProvider'in senkron constructor'i artik tileWidth/
    // tileHeight'i zorunlu kilip otomatik tespit etmiyor; fromUrl() gorseli
    // once yukleyip boyutlarini kendisi tespit ediyor.
    const loadProvider = async (scaleSize?: string) => {
      const params = { ...baseParams };
      if (scaleSize !== undefined) params["SCALESIZE"] = scaleSize;
      const url = `${proxyUrl}?${new URLSearchParams(params).toString()}`;
      const imageUrl = await this.resolveWcsImageUrl(url, headers);
      try {
        return await SingleTileImageryProvider.fromUrl(imageUrl, { rectangle: rect });
      } finally {
        if (imageUrl.startsWith("blob:")) URL.revokeObjectURL(imageUrl);
      }
    };

    // Full-disc/ulke olcegindeki coverage'lar native cozunurlukte on
    // milyonlarca piksele ulasabiliyor; tarayici bunu <img> olarak decode
    // edemiyor (ya da indirmesi dakikalar suruyor). WCS 2.0 Scaling
    // Extension'i (SCALESIZE) ile sunucudan makul boyutta bir goruntu
    // istiyoruz. version 2.0.x disinda SCALESIZE desteklenmedigi icin
    // sadece bu varsayilan/2.x versiyonlarda uyguluyoruz.
    const maxSize = options.maxSize ?? 2048;
    const canScale = baseParams["version"]!.startsWith("2.") && Number.isFinite(maxSize);

    let provider: SingleTileImageryProvider;
    if (!canScale) {
      provider = await loadProvider();
    } else {
      // SCALESIZE'daki eksen adlandirmasi sunucudan sunucuya degisiyor:
      // GeoServer ImageCRS URN'ini ("OGC/1/i"/"OGC/1/j") istiyor, bazi
      // MapServer kurulumlari (orn. service.geo.llv.li) bunu reddedip
      // duz "x"/"y" istiyor. Once yaygin olani (GeoServer) deneyip
      // basarisiz olursa digerine dusuyoruz.
      const urnAxes =
        `http://www.opengis.net/def/axis/OGC/1/i(${maxSize}),` +
        `http://www.opengis.net/def/axis/OGC/1/j(${maxSize})`;
      try {
        provider = await loadProvider(urnAxes);
      } catch {
        provider = await loadProvider(`x(${maxSize}),y(${maxSize})`);
      }
    }

    const imageryLayer = this.viewer.imageryLayers.addImageryProvider(provider);
    // WMS/WMTS ile AYNI kural (bkz addWMS/addWTMS) -- exportLayerAsGeoTiff'in
    // (asagida) orijinal url/coverageId/version/tiffFormat'a erisebilmesi
    // icin saklanir. ONCEDEN bu satir eksikti: addWCS() bu bilgiyi hic
    // saklamiyordu.
    this.serviceLayerOptions.set(options.id, options);
    return this.deps.register(options.id, options.title, "WCS", imageryLayer, false);
  }

  // ArcGIS ImageServer gibi bazi WCS sunuculari GetCoverage yanitini duz bir
  // goruntu olarak degil, multipart/related MIME zarfi icinde (GML metadata
  // parcasi + goruntu parcasi bir arada) donuyor. Tarayici bu zarfi
  // dogrudan bir goruntu olarak decode edemez; burada zarfi kendimiz
  // aciyor, icindeki goruntu baytlarini ayiklayip bir blob URL'e
  // ceviriyoruz. Multipart olmayan (cogunluk) yanitlarda da baytlar zaten
  // elimizde oldugu icin ayni sekilde blob URL'e ceviriyoruz.
  private async resolveWcsImageUrl(
    url: string,
    headers: Record<string, string> | undefined
  ): Promise<string> {
    const response = await fetch(url, headers ? { headers } : undefined);
    if (!response.ok) {
      throw new OgcRequestError(
        "OGC_WCS_REQUEST_FAILED",
        `WCS isteği başarısız: ${response.status} ${response.statusText}`
      );
    }
    const contentType = response.headers.get("content-type") ?? "";
    const buffer = await response.arrayBuffer();

    const boundaryMatch = /boundary="?([^";]+)"?/i.exec(contentType);
    if (!contentType.includes("multipart/") || !boundaryMatch) {
      return URL.createObjectURL(
        new Blob([buffer], { type: contentType || "image/png" })
      );
    }

    const imageBytes = layerExporter.extractMultipartImage(
      new Uint8Array(buffer),
      boundaryMatch[1]!
    );
    // Blob, Uint8Array'in altindaki ArrayBufferLike'i (SharedArrayBuffer da
    // olabilir) degil somut bir ArrayBuffer kabul ediyor; kopyalayarak veriyoruz.
    const imageBuffer = imageBytes.bytes.buffer.slice(
      imageBytes.bytes.byteOffset,
      imageBytes.bytes.byteOffset + imageBytes.bytes.byteLength
    ) as ArrayBuffer;
    return URL.createObjectURL(
      new Blob([imageBuffer], { type: imageBytes.mimeType })
    );
  }

  // ── İç: GeoTIFF ──────────────────────────────────────────────────────────

  addGeoTiff(_options: GeoTiffLayerOptions): Promise<ManagedLayer> {
    throw new LayerOperationError(
      "LAYER_GEOTIFF_UNSUPPORTED",
      "GeoTIFF katmanı bu Cesium sürümünde (≥1.143) henüz desteklenmiyor. " +
        "GeoTiffImageryProvider mevcut değil. geotiff.js ile özel provider gereklidir."
    );
  }

  // ── Yardımcılar ──────────────────────────────────────────────────────────

  private requireServiceOptions(
    id: string,
    expected: "WMS" | "WMTS"
  ): WMSLayerOptions | WMTSLayerOptions {
    const managed = this.deps.requireLayer(id);
    if (managed.layerType !== expected) {
      throw new LayerOperationError("LAYER_TYPE_MISMATCH", `Katman ${expected} değil: "${id}" (${managed.layerType})`);
    }
    const options = this.serviceLayerOptions.get(id);
    if (options === undefined) {
      throw new LayerOperationError("LAYER_SERVICE_OPTIONS_NOT_FOUND", `Katman için orijinal servis seçenekleri bulunamadı: "${id}"`);
    }
    // "expected" zaten WMS/WMTS'e daraltiyor (WCS bu fonksiyona hic gelmez,
    // bkz addWCS'in AYRI serviceLayerOptions kaydi) -- Map'in genis deger
    // tipi (WCSLayerOptions de icerir, bkz asagidaki exportLayerAsGeoTiff)
    // yuzunden derleyici bunu statik olarak bilemiyor.
    return options as WMSLayerOptions | WMTSLayerOptions;
  }

  // Cesium'da ImageryProvider parametreleri construct-sonrası immutable;
  // stil değişince (setWmsStyle/setWmtsStyle) eski ImageryLayer kaldırılıp
  // aynı z-sıra indeksinde, aynı show/alpha ile yenisi kurulur. ManagedLayer
  // referansı (items Map'i) da güncellenir ki getLayers()/getLayerById() her
  // zaman canlı Cesium nesnesini döndürsün.
  private async rebuildImageryLayer(
    id: string,
    buildProvider: () =>
      | WebMapServiceImageryProvider
      | WebMapTileServiceImageryProvider
  ): Promise<void> {
    const managed = this.deps.requireLayer(id);
    if (!(managed.cesiumObject instanceof ImageryLayer)) {
      throw new LayerOperationError("LAYER_NOT_RASTER", `Katman raster (ImageryLayer) değil: "${id}"`);
    }
    const oldLayer = managed.cesiumObject;
    const index = this.viewer.imageryLayers.indexOf(oldLayer);
    const { show, alpha } = oldLayer;

    const provider = buildProvider();
    const newLayer = new ImageryLayer(provider, { show, alpha });
    this.viewer.imageryLayers.remove(oldLayer, true);
    this.viewer.imageryLayers.add(newLayer, index);

    this.deps.setItem(
      id,
      Object.freeze({ ...managed, cesiumObject: newLayer })
    );
  }

  /**
   * ML-12 düzeltmesi: OGC GetCapabilities'i apiKey header + proxy KURALLARIYLA
   * çeker. `TucbsServiceUpload` (GC-05) gibi ayrı bir `LayerManager`
   * referansına sahip tüketiciler de servis keşfi için bunu kullanır --
   * eskiden bu tüketiciler proxy/apiKey'den TAMAMEN habersiz çıplak `fetch`
   * kullanıyordu (bkz project_ucbp_api_ogc_capabilities_uygulama_plani, ML-12).
   */
  async getCapabilitiesDocument(
    baseUrl: string,
    serviceType: "WMS" | "WMTS" | "WFS" | "WCS",
    version: string,
    authToken?: string,
  ): Promise<Document> {
    const proxiedUrl = this.deps.apiKeyPolicy.resolveOgcProxyUrl(
      serviceType.toLowerCase() as "wms" | "wmts" | "wfs" | "wcs",
      baseUrl,
    );
    const url = ogcCapabilities.buildCapabilitiesUrl(proxiedUrl, serviceType, version);
    return ogcCapabilities.getCapabilities(url, authToken, this.deps.apiKeyPolicy);
  }

  /**
   * Faz 5b (ML-12'nin DescribeCoverage boşluğu): WCS coverage'larının gerçek
   * coğrafi kapsama alanlarını `getCapabilitiesDocument` ile AYNI apiKey/proxy
   * politikasından geçirerek çeker -- eskiden bu istek proxy'siz gittiği için
   * CORS-korumalı sunucularda sessizce başarısız olup katmanlar global
   * (-180,-90,180,90) dikdörtgene düşüyordu (bkz
   * project_ucbp_api_ogc_capabilities_uygulama_plani Faz 5b).
   */
  async getWcsCoverageExtents(
    rawUrl: string,
    coverageIds: readonly string[],
    authToken?: string,
  ): Promise<Map<string, ogcCapabilities.GeographicBoundingBox>> {
    const proxiedUrl = this.deps.apiKeyPolicy.resolveOgcProxyUrl("wcs", rawUrl);
    return ogcCapabilities.fetchWcsCoverageExtents(proxiedUrl, coverageIds, authToken, this.deps.apiKeyPolicy);
  }
}
