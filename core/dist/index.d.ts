import { Camera } from 'cesium';
import { Cartesian3 } from 'cesium';
import { DataSource } from 'cesium';
import { DataSourceCollection } from 'cesium';
import { Entity } from 'cesium';
import { Feature } from 'geojson';
import { FeatureCollection } from 'geojson';
import { Geometry } from 'geojson';
import { ImageryLayer } from 'cesium';
import { JulianDate } from 'cesium';
import { Rectangle } from 'cesium';
import { Scene } from 'cesium';
import { Viewer } from 'cesium';

/**
 * Analiz HTTP kapısı: Lit doğrudan backend çağırmaz; Map / AnalysisManager kullanır.
 * LayerManager / InteractionManager / DrawingManager ile aynı katman.
 * Base URL: {@link getUcbpApiBase}. Header: X-API-Key. Gövde: BaseRequestDto.
 * API key validate burada değil — {@link validateApiKey} / Map.ensureApiKeyValid.
 *
 * @example
 * ```ts
 * if (map.analysisManager.configured) {
 *   const result = await map.analysisManager.buffer({
 *     geojson: someGeoJsonGeometry,
 *     distanceM: 500,
 *   });
 * }
 * ```
 */
export declare class AnalysisManager {
    #private;
    private clientId;
    /** @param options - Başlangıç `apiKey`/`clientId` değerleri. */
    constructor(options: AnalysisManagerOptions);
    /** `apiKey`/`clientId`'yi günceller (verilmeyen alanlar değişmeden kalır). */
    configure(options: Partial<AnalysisManagerOptions>): void;
    /** `apiKey` ve backend adresinin (`getUcbpApiBase()`) ikisinin de dolu olup olmadığı. */
    get configured(): boolean;
    /**
     * Tampon analizi: backend'e istek atar, sonuç GeoJSON'unu döndürür.
     * @throws {AnalysisRequestError} apiKey eksikse, ağ hatası olursa veya backend başarısız/eksik yanıt dönerse.
     *
     * @example
     * ```ts
     * const result = await map.analysisManager.buffer({
     *   geojson: someGeoJsonGeometry,
     *   distanceM: 500,
     * });
     * console.log(result.geojson);
     * ```
     * Not: `Map.runBuffer()` bu çağrıyı sarıp sonucu doğrudan bir `ManagedLayer`
     * olarak haritaya ekleyen daha üst-seviye bir kısayoldur.
     */
    buffer(request: BufferAnalysisRequest): Promise<BufferAnalysisResult>;
    /**
     * Kesişim analizi: backend'e istek atar, sonuç GeoJSON'unu döndürür.
     * @throws {AnalysisRequestError} apiKey eksikse, ağ hatası olursa veya backend başarısız/eksik yanıt dönerse.
     *
     * @example
     * ```ts
     * const result = await map.analysisManager.intersection({
     *   geojsonA: someGeoJsonGeometryA,
     *   geojsonB: someGeoJsonGeometryB,
     * });
     * console.log(result.geojson);
     * ```
     */
    intersection(request: IntersectionAnalysisRequest): Promise<IntersectionAnalysisResult>;
    /** Sınırlayıcı kutu veya dışbükey zarf. */
    boundary(request: BoundaryAnalysisRequest): Promise<GeoJsonAnalysisResult>;
    /** Kaynağı ikinci geometriyle kırpar. */
    clip(request: IntersectionAnalysisRequest): Promise<GeoJsonAnalysisResult>;
    /** İkinci poligonu birinciden çıkarır. */
    difference(request: IntersectionAnalysisRequest): Promise<GeoJsonAnalysisResult>;
    /** Örtüşen parçayı kaynaktan siler. */
    subtract(request: IntersectionAnalysisRequest): Promise<GeoJsonAnalysisResult>;
    /** İki poligonu tek alana eritir. */
    union(request: IntersectionAnalysisRequest): Promise<GeoJsonAnalysisResult>;
    /** Nokta etrafında açı dilimi. */
    wedgeBuffer(request: WedgeBufferAnalysisRequest): Promise<GeoJsonAnalysisResult>;
}

/** `new AnalysisManager(...)` constructor'ına verilen seçenekler. */
export declare interface AnalysisManagerOptions {
    /** Analiz isteklerinde kullanılacak apiKey. */
    readonly apiKey: string;
    /** Varsayılan: rastgele UUID */
    readonly clientId?: string;
}

/** AnalysisManager'ın coğrafi analiz istekleri başarısız olduğunda. */
export declare class AnalysisRequestError extends TucbsError {
    constructor(code: TucbsErrorCode, message?: string, title?: string);
}

/**
 * apiKey doğrulama başarısız olduğunda fırlatılır (validate 401 vb.).
 * `auth/validateApiKey.ts`'ten buraya taşındı -- public şekli
 * (constructor imzası, `title` varsayılan davranışı) AYNEN korunuyor,
 * davranışsal fark YOK. `code` varsayılanı "API_KEY_INVALID"; apiKey hiç
 * verilmemiş senaryosunda `ensureEffectiveApiKeyValid()` açıkça
 * "API_KEY_MISSING" geçirir.
 */
export declare class ApiKeyValidationError extends TucbsError {
    /** Doğrulamanın başarısız olma nedeni (backend'den geliyorsa). */
    readonly reason?: string;
    /** Backend'in döndürdüğü ham hata gövdesi/detayı (varsa). */
    readonly detail?: string;
    constructor(message: string, opts?: ApiKeyValidationErrorOptions);
}

/** `ApiKeyValidationError`'ın constructor'ına verilebilecek opsiyonel seçenekler. */
declare interface ApiKeyValidationErrorOptions {
    /** Hatanın kullanıcıya gösterilecek başlığı. @default "API Hatası" */
    title?: string;
    /** Doğrulamanın başarısız olma nedeni (backend'den geliyorsa). */
    reason?: string;
    /** Backend'in döndürdüğü ham hata gövdesi/detayı (varsa). */
    detail?: string;
    /** Hata kodu. @default "API_KEY_INVALID" */
    code?: TucbsErrorCode;
}

/**
 * `LayerManager.getAuthorizedLayers()` ile dönen, apiKey sahibinin erişim
 * izni olan tek bir WMS/WFS/WMTS servis/katman kaydı.
 */
export declare interface AuthorizedLayerInfo {
    /** Sepet satırı id (opsiyonel; backend döner). */
    readonly id?: string;
    /** Servis türü. */
    readonly servisTuru: "WMS" | "WFS" | "WMTS";
    /** Haritanın GetMap/GetFeature isteği için kullanacağı ucbp-api servis adresi. */
    readonly servisUrl: string;
    /** QGIS gibi masaüstü istemciler için token'lı servis adresi (opsiyonel). */
    readonly tokenUrl?: string;
    /** OGC katman adı (WMS `"LAYERS"` / WFS `"typeName"` parametresi). */
    readonly ogcLayerName: string;
    /** Sadece WMTS servisleri için TileMatrixSet adı (opsiyonel). */
    readonly wmtsTileMatrixSet?: string;
    /** Katmanın insan-okunur (UI'da gösterilecek) adı. */
    readonly katmanAdi: string;
    /** Bu erişimin dayandığı Coğrafi Veri Talep projesinin adı (opsiyonel). */
    readonly projeAdi?: string;
    /** Katmanı paylaşan kurumun adı (opsiyonel). */
    readonly ustKurumAdi?: string;
}

/** Desteklenen bir altlık harita (basemap) kimliği, veya özel bir tile URL şablonu. */
export declare type BasemapId = "hgm-temel" | "hgm-ortofoto" | "hgm-siyasi" | "hgm-yukseklik" | (string & Record<never, never>);

/** Bir altlık haritayı kimliğiyle seçmek için kullanılan seçenek nesnesi. */
export declare interface BasemapOptions {
    /** Altlık harita kimliği. */
    readonly id: BasemapId;
}

declare type BasemapStatus = "loading" | "ready" | "unavailable";

/** `AnalysisManager`'ın backend'e gönderdiği tüm analiz isteklerinin ortak zarfı. */
export declare interface BaseRequestDto<T> {
    /** İstemciyi tanımlayan kimlik (`AnalysisManagerOptions.clientId`). */
    readonly clientId: string;
    /** İsteğin asıl gövdesi (ör. `BufferAnalysisRequest`). */
    readonly object: T;
}

/** `AnalysisManager`'ın backend'den aldığı tüm analiz yanıtlarının ortak zarfı. */
export declare interface BaseResponseDto<T> {
    /** İstekteki `clientId`'nin yankısı. */
    readonly clientId?: string;
    /** Yanıtın asıl gövdesi (ör. `BufferAnalysisResult`). */
    readonly object?: T;
    /** İsteğin başarılı olup olmadığı. */
    readonly isSuccess?: boolean;
    /** İsteğin başarılı olup olmadığı (bazı uçlarda `isSuccess` yerine bu alan kullanılır). */
    readonly success?: boolean;
    /** Hata mesajı (Türkçe). */
    readonly mesaj?: string;
    /** Hata mesajı (İngilizce/alternatif alan adı). */
    readonly message?: string;
}

/** Değerleri ayrık kutulara (bin) bölerek renklendiren katman dolgu stili. */
export declare interface BinFillStyle {
    /** Stil modu ayırt edicisi. */
    readonly mode: "bin";
    /** Renklendirmede kullanılacak öznitelik sütunu adı. */
    readonly column: string;
    /** Renk paleti (her kutu için bir renk). */
    readonly palette: readonly string[];
    /** Renk paletinin yorumlanma biçimi. */
    readonly paletteKind?: PaletteKind;
    /** Kutu (bin) sayısı. */
    readonly binCount: number;
    /** Verilmezse getColumnRange() ile veriden otomatik hesaplanir. */
    readonly min?: number;
    /** Aralığın üst sınırı. Verilmezse getColumnRange() ile veriden otomatik hesaplanır. */
    readonly max?: number;
    /** Dolgu opaklığı (0-1 arası). */
    readonly opacity: number;
}

/** Sınır: bbox veya dışbükey zarf; çıktı poligon veya çizgi. */
export declare interface BoundaryAnalysisRequest {
    readonly geojson: object;
    readonly boundaryType: "bbox" | "convex";
    readonly outputGeometry: "polygon" | "line";
}

/** `AnalysisManager.buffer()` için tampon (buffer) analizi isteği. */
export declare interface BufferAnalysisRequest {
    /** Tamponu alınacak geometri (GeoJSON). */
    readonly geojson: object;
    /** Tampon mesafesi (metre). */
    readonly distanceM: number;
    /** Hesaplamanın yapılacağı metrik EPSG kodu (verilmezse backend uygun bir UTM dilimi seçer). */
    readonly targetEpsg?: number;
}

/** `AnalysisManager.buffer()`'ın sonucu. */
export declare interface BufferAnalysisResult {
    /** Üretilen tampon geometrisi (GeoJSON). */
    readonly geojson: object;
    /** Kullanılan tampon mesafesi (metre). */
    readonly distanceM?: number;
    /** Hesaplamada kullanılan metrik EPSG kodu. */
    readonly metricEpsg?: number;
}

export declare function buildCapabilitiesUrl(baseUrl: string, serviceType: string, version: string): string;

/** Kameranın konumu ve bakış açısı. */
export declare interface CameraOptions {
    /** Boylam (derece). */
    readonly longitude: number;
    /** Enlem (derece). */
    readonly latitude: number;
    /** Yerden yükseklik (metre). */
    readonly height: number;
    /** Yön açısı, kuzeyden saat yönünde (derece). @default 0 */
    readonly heading?: number;
    /** Yukarı/aşağı bakış açısı; -90 tam tepeden bakış. (derece). @default -90 */
    readonly pitch?: number;
    /** Yatay eksen etrafında dönüş (derece). @default 0 */
    readonly roll?: number;
}

/**
 * `@tucbs/core`'a herhangi bir `Map`/component oluşturulmadan ÖNCE, uygulamanın
 * en başında bir kez çağrılır -- sonraki tüm `Map` instance'ları (ve component'ler)
 * apiKey vermezse bu değeri miras alır. Instance-seviyesi `apiKey` (component
 * attribute'u veya `Map` constructor options'u) verilirse HER ZAMAN bunu ezer.
 *
 * (4a) Zaten farkli bir degerle configured edilmisse ve TEKRAR farkli bir
 * degerle cagrilirsa, kazara/gozden-kacan cift-configureTucbs() cagrilarini
 * (ör. iki ayri init script'i) devtools'ta gorunur kilmak icin console.warn
 * basar -- bu bir guvenlik kontrolu DEGIL (ayni ayricalikta calisan bir
 * script/XSS payload'i bu uyariyi bypass edebilir), sadece gelistirme-zamani
 * hata yakalama.
 *
 * (4b) Deger degistiginde, HALIHAZIRDA olusturulmus ve global'e bagimli
 * (kendi apiKey'i verilmemis) `Map` instance'lari `registerApiKeyRefresh()`
 * ile kayitli callback'leri araciligiyla ANINDA guncellenir -- rotasyon
 * sayfa yenilemeyi beklemez.
 *
 * @example
 * ```ts
 * import { configureTucbs } from "@tucbs/core";
 *
 * configureTucbs({
 *   apiKey: "YOUR_API_KEY",
 *   apiBase: "https://dev-ucbp-api.turksat.com.tr/ucbp-api",
 *   proxyBase: "https://dev-ucbp-api.turksat.com.tr/proxyservice/proxyservice/getByUrl?url=",
 * });
 * ```
 */
export declare function configureTucbs(config: TucbsGlobalConfig): void;

/** `options.camera` ve `options.initialExtent` hiç verilmezse haritanın ilk açılışta ortalanacağı varsayılan bölge (Türkiye sınırı). */
export declare const DEFAULT_INITIAL_EXTENT: MapExtent;

/**
 * Build-time ucbp-api kökü — `packages/core/.env` → `VITE_ANALYSIS_API_BASE`.
 */
declare const DEFAULT_UCBP_API_BASE: string;
export { DEFAULT_UCBP_API_BASE as DEFAULT_ANALYSIS_API_BASE }
export { DEFAULT_UCBP_API_BASE }

export declare function detectServiceType(doc: Document): string | undefined;

export declare interface DiscoveredItem {
    identifier: string;
    title: string;
    tileMatrixSetID?: string;
    geographicBoundingBox?: GeographicBoundingBox;
}

/**
 * 6 sabit çizim aracını (`point`/`polyline`/`polygon`/`rectangle`/`circle`/
 * `freehand`) yönetir; vertex yerleştirme kendi bağımsız
 * `ScreenSpaceEventHandler`'ıyla yapılır.
 *
 * @example
 * ```ts
 * map.drawingManager.activate("polygon");
 * // ... kullanıcı haritada çizim yapar ...
 * const geojson = map.drawingManager.toGeoJSON();
 * console.log(geojson.features);
 * ```
 *
 * @example
 * ```ts
 * map.drawingManager.on("draw:complete", ({ shape }) => {
 *   console.log(shape.id, shape.tool, shape.geometry);
 * });
 * ```
 */
export declare class DrawingManager extends EventEmitter<DrawingManagerEventMap> {
    private readonly viewer;
    private readonly interactionManager;
    private readonly handler;
    private readonly shapes;
    private activeTool;
    private activeSource;
    private positions;
    private previewPosition;
    private tempEntity;
    private tempFillEntity;
    private tempVertexEntities;
    private freehandDragging;
    /** Cesium `Scene` nesnesi (`viewer.scene`). */
    get scene(): Scene;
    /**
     * @param viewer - Çizimin yapılacağı Cesium `Viewer`.
     * @param interactionManager - `activate()` sırasında `suspend()`/`resume()` çağrılacak `InteractionManager`.
     */
    constructor(viewer: Viewer, interactionManager: InteractionManager);
    /**
     * Verilen çizim aracını etkinleştirir (aktif bir araç varsa önce `deactivate()` ile kapatılır).
     * @param tool - Etkinleştirilecek çizim aracı.
     * @param source - Aktivasyonun hangi bileşen türünden geldiğini belirtir (ör. `TucbsMeasureTool` vs `TucbsDrawTool` aynı `tool` değerini farklı amaçla paylaştığında); `DrawingManager` davranışını etkilemez, sadece emit edilen event payload'ında iletilir.
     *
     * @example
     * ```ts
     * map.drawingManager.activate("rectangle");
     * ```
     */
    activate(tool: DrawTool, source?: string): void;
    /**
     * Aktif çizim aracını kapatır; yarım kalan çizim varsa iptal edilir (tamamlanmaz).
     *
     * @example
     * ```ts
     * map.drawingManager.deactivate();
     * ```
     */
    deactivate(): void;
    /** Şu an etkin olan çizim aracı (yoksa `undefined`). */
    getActiveTool(): DrawTool | undefined;
    /** Herhangi bir çizim aracının etkin olup olmadığı. */
    isActive(): boolean;
    /**
     * Tamamlanmış tüm şekillerin listesi.
     *
     * @example
     * ```ts
     * const shapes = map.drawingManager.getShapes();
     * console.log(shapes.length);
     * ```
     */
    getShapes(): DrawnShape[];
    /** Verilen id'ye sahip tamamlanmış şekli döndürür (yoksa `undefined`). */
    getShapeById(id: string): DrawnShape | undefined;
    /** Verilen id'ye sahip şekli haritadan ve kayıtlardan kaldırır. */
    removeShape(id: string): void;
    /** Tamamlanmış tüm şekilleri haritadan ve kayıtlardan kaldırır. */
    clearAll(): void;
    /** Devam eden çizimde son eklenen vertex'i geri alır. */
    undo(): void;
    /**
     * Tamamlanmış tüm şekilleri tek bir GeoJSON `FeatureCollection`'a dönüştürür.
     *
     * @example
     * ```ts
     * const featureCollection = map.drawingManager.toGeoJSON();
     * ```
     */
    toGeoJSON(): FeatureCollection;
    /** Aktif çizimi kapatır, `ScreenSpaceEventHandler`'ı yok eder ve kayıtlı event dinleyicilerini temizler. */
    destroy(): void;
    private bindToolHandlers;
    private unbindToolHandlers;
    private readonly onEscapeKey;
    private onVertexClick;
    private onPreviewMove;
    private finishMultiVertex;
    private finishMultiVertexViaDoubleClick;
    private onFreehandDown;
    private onFreehandMove;
    private onFreehandUp;
    private emitVertex;
    private completeShape;
    private resetSessionForContinuousDrawing;
    private finishSession;
    private ensureTempEntity;
    private addVertexMarker;
    private buildPositionsCallback;
    private clearTempEntity;
    private resetTrackedEntity;
    private setCursor;
    private lockCamera;
    private unlockCamera;
    private buildShape;
    private buildLineShape;
    private buildPolygonShape;
    private buildRectangleShape;
    private buildCircleShape;
    private sampleCircleRing;
    private computeRectangleCoordinates;
    private computeCircleRing;
    private computeArea;
    private computeLength;
    private projectMeters;
    private offsetMetersToLonLat;
    private toCartesianFromLonLat;
    private toCartesian;
    private toLonLat;
    private requireIndex;
}

/** `DrawingManager`'ın yaydığı çizim/ölçüm event'lerinin tam haritası. */
export declare interface DrawingManagerEventMap {
    /** Bir çizim/ölçüm aracı etkinleştirildiğinde (çizim başladığında) yayılır. */
    "draw:start": {
        readonly tool: DrawTool;
        readonly source?: string;
    };
    /** Çizime yeni bir vertex (nokta) eklendiğinde yayılır. */
    "draw:vertex": {
        readonly tool: DrawTool;
        readonly index: number;
        readonly coordinates: [number, number];
        readonly screenPos: {
            readonly x: number;
            readonly y: number;
        };
    };
    /** Aktif çizimin önizleme noktası (fare hareketi) güncellendiğinde yayılır. */
    "draw:move": {
        readonly tool: DrawTool;
        readonly coordinates: [number, number];
        readonly screenPos: {
            readonly x: number;
            readonly y: number;
        };
    };
    /** Bir şeklin çizimi tamamlandığında yayılır. */
    "draw:complete": {
        readonly shape: DrawnShape;
    };
    /** Aktif çizim iptal edildiğinde (araç tamamen kapatıldığında) yayılır. */
    "draw:cancel": {
        readonly tool: DrawTool;
        readonly source?: string;
    };
    /** Tamamlanmış bir şekil silindiğinde yayılır. */
    "draw:remove": {
        readonly id: string;
        readonly shape: DrawnShape;
    };
}

export declare type DrawingManagerEventName = keyof DrawingManagerEventMap;

export declare type DrawingManagerEventPayload<K extends DrawingManagerEventName> = DrawingManagerEventMap[K];

/** `DrawingManager` ile tamamlanmış bir çizim/ölçüm şeklinin tam kaydı. */
export declare interface DrawnShape {
    /** Şeklin benzersiz kimliği. */
    readonly id: string;
    /** Şeklin türü. */
    readonly tool: DrawTool;
    /** Şeklin haritadaki Cesium Entity'si. */
    readonly entity: Entity;
    /** Şeklin vertex'lerinin 3B kartezyen konumları. */
    readonly positions: Cartesian3[];
    /** Şeklin vertex'lerinin coğrafi konumları (`[boylam, enlem]`, derece). */
    readonly coordinates: [number, number][];
    /** Şeklin GeoJSON geometrisi. */
    readonly geometry: Geometry;
    /** Ölçülen uzunluk (metre) — sadece çizgi/ölçüm araçlarında dolu olur. */
    readonly length?: number;
    /** Ölçülen alan (metrekare) — sadece alan/poligon araçlarında dolu olur. */
    readonly area?: number;
    /** Ölçülen çevre uzunluğu (metre) — sadece kapalı şekillerde dolu olur. */
    readonly perimeter?: number;
    /** Yarıçap (metre) — sadece daire aracında dolu olur. */
    readonly radius?: number;
    /** Şeklin oluşturulduğu zaman damgası (epoch ms). */
    readonly createdAt: number;
    /** Bu şekli tetikleyen activate() çağrısının "source" değeri (ör.
     * TucbsDrawTool için "draw", TucbsMeasureTool için "measure") -- Map'in
     * "Çizim Katmanı" entegrasyonu YALNIZCA source==="draw" olan şekilleri
     * katmana taşır, ölçüm araci sekillerini HARIC tutar. */
    readonly source?: string;
}

/** Çizim/ölçüm aracının şekil türü. */
export declare type DrawTool = "point" | "polyline" | "polygon" | "rectangle" | "circle" | "freehand";

/**
 * Instance-seviyesi apiKey verilmemisse (bos/undefined) configureTucbs()
 * ile ayarlanmis GLOBAL apiKey'e (varsa) duser, sonra validateApiKey() ile
 * dogrular. HICBIRI yoksa (ne instance ne global) ApiKeyValidationError
 * firlatir -- validateApiKey()'in kendi "bos apiKey -> sessiz basari"
 * kisayoluna DUSMEDEN (bkz yukarisi), TucbsMap'in "apiKey yoksa hic
 * yuklenmesin" garantisini instance-veya-global her iki kaynak icin de
 * korur. Global anahtarin HAM DEGERI bu fonksiyonun DISINA hic cikmaz.
 */
export declare function ensureEffectiveApiKeyValid(instanceApiKey: string | undefined, apiBase: string): Promise<void>;

/** `entity:*` etkileşim event'lerinin (`InteractionManager`) detay nesnesi. */
export declare interface EntityInteractionDetail extends PickedFeatureDetail {
    /** Etkileşimin gerçekleştiği noktanın coğrafi konumu (`[boylam, enlem]`, derece). */
    readonly position: [number, number];
    /** Etkileşimin gerçekleştiği noktanın ekran koordinatı (piksel). */
    readonly screenPos: {
        readonly x: number;
        readonly y: number;
    };
    /** Tıklanan noktadaki TÜM vektör feature'lar (drillPick); `entity` her zaman ilk sırada. */
    readonly features: readonly PickedFeatureDetail[];
}

/**
 * Cesium Entity → GeoJSON Feature (nokta / çizgi / poligon).
 * Analiz paneli seçiminde kullanılır.
 */
export declare function entityToGeoJSON(entity: Entity, time?: JulianDate): Feature | null;

/** Kategorik (ayrık) değerleri elle eşlenmiş renklerle gösteren katman dolgu stili. */
export declare interface EnumFillStyle {
    /** Stil modu ayırt edicisi. */
    readonly mode: "enum";
    /** Renklendirmede kullanılacak öznitelik sütunu adı. */
    readonly column: string;
    /**
     * Deger -> renk eslemesi. UI (TucbsStyleEditor), getUniqueColumnValues()
     * ile kesfettigi TUM degerleri palet sirasina gore otomatik doldurup
     * kullanicinin degistirdigi degerleri ustune yazarak bu haritayi tam
     * olusturur; applyLayerStyle burada sadece duz bir lookup yapar (siralama/
     * palet-dongusu mantigi burada degil, UI tarafinda).
     */
    readonly colors: Record<string, string>;
    /** Dolgu opaklığı (0-1 arası). */
    readonly opacity: number;
}

/**
 * Tip-güvenli, generic yayıncı/abone (pub/sub) taban sınıfı. `TEventMap`,
 * event adından o event'in payload tipine bir eşlemedir. `LayerManager`,
 * `InteractionManager` ve `DrawingManager` bu sınıftan türer ve `on`/`off`/
 * `once`/`emit`/`removeAllListeners`/`listenerCount` metodlarını hiçbirini
 * override etmeden AYNEN miras alır — yani bu sınıftaki JSDoc, o üç sınıfın
 * da `.on(...)` API'sinin belgesidir.
 *
 * @example
 * ```ts
 * layerManager.on("layer:add", ({ layer }) => {
 *   console.log(layer.id, layer.title);
 * });
 * ```
 */
declare class EventEmitter<TEventMap> {
    private readonly listeners;
    /**
     * Bir event için dinleyici ekler.
     * @param event - Dinlenecek event adı.
     * @param listener - Event yayıldığında çağrılacak fonksiyon.
     * @returns Zincirleme çağrılar için `this`.
     */
    on<K extends keyof TEventMap>(event: K, listener: Listener<TEventMap[K]>): this;
    /**
     * `on()` ile eklenmiş bir dinleyiciyi kaldırır.
     * @param event - Dinleyicinin kayıtlı olduğu event adı.
     * @param listener - Kaldırılacak dinleyici (referans eşitliğiyle bulunur).
     * @returns Zincirleme çağrılar için `this`.
     */
    off<K extends keyof TEventMap>(event: K, listener: Listener<TEventMap[K]>): this;
    /**
     * Bir event için, sadece BİR KEZ tetiklenecek bir dinleyici ekler; ilk
     * tetiklenmenin ardından dinleyici otomatik olarak `off()` ile kaldırılır.
     * @param event - Dinlenecek event adı.
     * @param listener - Event ilk yayıldığında çağrılacak fonksiyon.
     * @returns Zincirleme çağrılar için `this`.
     */
    once<K extends keyof TEventMap>(event: K, listener: Listener<TEventMap[K]>): this;
    /**
     * Bir event'i, verilen payload ile kayıtlı tüm dinleyicilere senkron olarak yayar.
     * @param event - Yayılacak event adı.
     * @param payload - Dinleyicilere iletilecek veri.
     */
    emit<K extends keyof TEventMap>(event: K, payload: TEventMap[K]): void;
    /**
     * Dinleyicileri temizler.
     * @param event - Verilirse SADECE bu event'in dinleyicileri; verilmezse TÜM event'lerin tüm dinleyicileri kaldırılır.
     */
    removeAllListeners<K extends keyof TEventMap>(event?: K): void;
    /**
     * Bir event için kayıtlı dinleyici sayısını döner.
     * @param event - Sayılacak event adı.
     * @returns Kayıtlı dinleyici sayısı (hiç yoksa `0`).
     */
    listenerCount<K extends keyof TEventMap>(event: K): number;
}

/** Bir GeoJSON `Feature`'ı için kısa, insan-okunur bir etiket üretir (ör. `"Point 42"`). */
export declare function featureLabel(feature: Feature): string;

export declare function fetchWcsCoverageExtents(rawUrl: string, coverageIds: readonly string[], authToken?: string, authContext?: {
    mergeApiKeyHeader(headers: Record<string, string> | undefined, url: string): Record<string, string> | undefined;
    buildAuthHeaders(authToken: string | undefined): Record<string, string> | undefined;
}): Promise<Map<string, GeographicBoundingBox>>;

/** Bir katmanın dolgu stili — moda göre ayırt edilen 5 alternatiften biri. */
export declare type FillStyle = SolidFillStyle | GradientFillStyle | BinFillStyle | EnumFillStyle | OffFillStyle;

export declare interface GeographicBoundingBox {
    west: number;
    south: number;
    east: number;
    north: number;
}

/** Sınır, kırp, fark, çıkarma, birleştir ve kama tampon yanıtı. */
export declare interface GeoJsonAnalysisResult {
    readonly geojson: object;
}

/** CRS/koordinat doğrulama hataları. */
export declare class GeometryError extends TucbsError {
    constructor(code: TucbsErrorCode, message?: string, title?: string);
}

/**
 * `LayerManager.add("GEOTIFF", ...)` için GeoTIFF katman seçenekleri.
 * Not: mevcut Cesium sürümünde (≥1.143) henüz desteklenmiyor (bkz
 * `LayerManager.addGeoTiff`).
 */
export declare interface GeoTiffLayerOptions {
    /** Katmanın benzersiz kimliği. */
    readonly id: string;
    /** Katmanın kullanıcıya gösterilen başlığı. */
    readonly title: string;
    /** GeoTIFF dosyasının adresi. */
    readonly url: string;
    /** Feature pick (tıklama sorgulama) desteğinin açık olup olmadığı. */
    readonly enablePickFeatures?: boolean;
    /** Cesium credit/attribution metni. */
    readonly credit?: string;
    /** Katmanın coğrafi kapsama alanı. */
    readonly rectangle?: Rectangle;
}

/**
 * OGC GetCapabilities XML'ini çeker ve okur -- `authContext` verilirse
 * (LayerManager'ın private `apiKeyPolicy`'si) apiKey header'ı eklenir;
 * `url` zaten proxy'lenmiş olmalıdır (bkz `LayerManager.getCapabilitiesDocument`).
 */
export declare function getCapabilities(url: string, authToken: string | undefined, authContext?: {
    mergeApiKeyHeader(headers: Record<string, string> | undefined, url: string): Record<string, string> | undefined;
    buildAuthHeaders(authToken: string | undefined): Record<string, string> | undefined;
}): Promise<Document>;

/**
 * Dokümante edilmiş tüm hata kodlarını programatik olarak döndürür (şartname gereksinimi).
 *
 * @example
 * ```ts
 * import { getErrorCodes } from "@tucbs/core";
 *
 * const codes = getErrorCodes();
 * console.log(codes.LAYER_NOT_FOUND.number, codes.LAYER_NOT_FOUND.title);
 * ```
 */
export declare function getErrorCodes(): Record<TucbsErrorCode, TucbsErrorInfo>;

/**
 * HGM getByUrl tabanı — yalnız {@link configureTucbs} `proxyBase`.
 * Verilmezse boş; tile URL'si kurulmaz. Sonda `url=` kalır; slash kırpılmaz.
 */
export declare function getProxyBase(): string;

/**
 * Aktif ucbp-api kökü: önce {@link configureTucbs} `apiBase`, sonra build-time env.
 */
export declare function getUcbpApiBase(): string;

/** Sürekli bir renk rampası (gradient) ile veri-odaklı katman dolgu stili. */
export declare interface GradientFillStyle {
    /** Stil modu ayırt edicisi. */
    readonly mode: "gradient";
    /** Renklendirmede kullanılacak öznitelik sütunu adı. */
    readonly column: string;
    /** Renk rampası (hex renk dizisi). */
    readonly palette: readonly string[];
    /** Renk rampasının yorumlanma biçimi. */
    readonly paletteKind?: PaletteKind;
    /** Verilmezse getColumnRange() ile veriden otomatik hesaplanir. */
    readonly min?: number;
    /** Aralığın üst sınırı. Verilmezse getColumnRange() ile veriden otomatik hesaplanır. */
    readonly max?: number;
    /** Dolgu opaklığı (0-1 arası). */
    readonly opacity: number;
}

/** `BasemapId` union'ının, apiKey gerektiren HGM/Turksat proxy altlık haritalarının çalışma-zamanı karşılığı. */
export declare const HGM_BASEMAP_IDS: readonly ["hgm-temel", "hgm-ortofoto", "hgm-siyasi", "hgm-yukseklik"];

declare type HighlightFeature = {
    readonly type: "Feature";
    readonly geometry: object;
    readonly properties?: object | null;
};

/** Bir WMS/WMTS (raster) katmanından `GetFeatureInfo` ile dönen tek bir feature'ın bilgisi. */
export declare interface ImageryFeatureInfo {
    /** Feature'ın kaynağı olan Cesium ImageryLayer. */
    readonly imageryLayer: ImageryLayer;
    /** Feature adı (sunucu sağlamazsa `null`). */
    readonly name: string | null;
    /** Feature'ın öznitelik (attribute) değerleri. */
    readonly properties: Record<string, unknown>;
    /** Sunucudan gelen ham HTML/metin yanıtı (`properties` boşsa bu alana düşülür). */
    readonly description: string | null;
    readonly geometryHint?: ImageryGeometryHint | undefined;
}

/** GetFeatureInfo geometrisinden hesaplanan "Yakınlaş" hedefi -- ya bir ALAN
 * (gerçek bir bounding box) ya da geometri tek bir konuma indirgeniyorsa
 * (örn. bir nokta feature) TEK BIR NOKTA. İkisi ayrı tutulur çünkü hedefe
 * ulaşma yöntemi farklıdır (bkz `TucbsIdentifyPanel._zoomToItem`): alan için
 * `InteractionManager.flyToExtent`, nokta için `InteractionManager.
 * flyToPosition` (tıklanan noktadan çok daha hassas bir koordinat verir). */
export declare type ImageryGeometryHint = {
    readonly kind: "extent";
    readonly west: number;
    readonly south: number;
    readonly east: number;
    readonly north: number;
} | {
    readonly kind: "point";
    readonly longitude: number;
    readonly latitude: number;
};

/** `imagery:*` etkileşim event'lerinin detay nesnesi. */
export declare interface ImageryInteractionDetail {
    /** Etkileşimin gerçekleştiği noktanın coğrafi konumu (`[boylam, enlem]`, derece). */
    readonly position: [number, number];
    /** Etkileşimin gerçekleştiği noktanın ekran koordinatı (piksel). */
    readonly screenPos: {
        readonly x: number;
        readonly y: number;
    };
    /** Tıklanan noktadaki tüm raster katmanlar için `GetFeatureInfo` sonuçları. */
    readonly features: readonly ImageryFeatureInfo[];
}

/**
 * Tüm Entity ve Cesium harita etkileşim event'lerini (mouse, camera, scene)
 * tek merkezden `EventEmitter` API'siyle aktarır.
 *
 * @example
 * ```ts
 * map.interactionManager.on("entity:click", (detail) => {
 *   console.log(detail.layerId, detail.properties);
 * });
 * ```
 */
export declare class InteractionManager extends EventEmitter<InteractionManagerEventMap> {
    private readonly viewer;
    private readonly handler;
    private readonly unsubscribers;
    private suspended;
    private identifySuspended;
    private hoverEnabled;
    private hoveredEntity;
    private pickGeneration;
    /** Cesium `Scene` nesnesi (`viewer.scene`). */
    get scene(): Scene;
    /** Cesium `Camera` nesnesi (`viewer.camera`). */
    get camera(): Camera;
    /** @param viewer - Etkileşimlerin dinleneceği Cesium `Viewer`. */
    constructor(viewer: Viewer);
    /** Tıklama/pick event grubunu (`entity:*`/`map:*`/`imagery:*`) geçici olarak durdurur (bkz `DrawingManager`). */
    suspend(): void;
    /** `suspend()` ile durdurulan tıklama/pick event grubunu devam ettirir. */
    resume(): void;
    /** Tıklama/pick event grubunun şu an durdurulmuş olup olmadığı. */
    isSuspended(): boolean;
    /** `TucbsIdentifyPanel`'in kendi tepkisini (öznitelik tablosu/koordinat kartı) geçici olarak durdurur, event yayınını ETKİLEMEZ (bkz `identifySuspended` alanı). */
    suspendIdentify(): void;
    /** `suspendIdentify()` ile durdurulan identify tepkisini devam ettirir. */
    resumeIdentify(): void;
    /** Identify tepkisinin şu an durdurulmuş olup olmadığı. */
    isIdentifySuspended(): boolean;
    /** `entity:mouseenter`/`entity:mouseleave` hover event'lerinin açık olup olmadığını ayarlar; kapatılırken mevcut hover durumu sıfırlanır. */
    enableHover(enabled: boolean): void;
    /** Hover event'lerinin şu an açık olup olmadığı. */
    isHoverEnabled(): boolean;
    /**
     * Kamerayı verilen coğrafi konuma top-down (`pitch=-90`) uçurur.
     * @param longitude - Boylam (derece).
     * @param latitude - Enlem (derece).
     * @param options.height - Uçuş sonrası yükseklik (metre). @default 1000
     * @param options.duration - Uçuş süresi (saniye); verilmezse Cesium'un mesafeye göre otomatik hesapladığı süre kullanılır.
     *
     * @example
     * ```ts
     * map.interactionManager.flyToPosition(32.85, 39.93, { height: 5000 });
     * ```
     */
    flyToPosition(longitude: number, latitude: number, options?: {
        height?: number;
        duration?: number;
    }): void;
    /**
     * Kamerayı verilen coğrafi dikdörtgene (derece) top-down uçurur.
     * @param duration - Uçuş süresi (saniye); verilmezse Cesium'un mesafeye göre otomatik hesapladığı süre kullanılır.
     *
     * @example
     * ```ts
     * map.interactionManager.flyToExtent(26, 36, 45, 42);
     * ```
     */
    flyToExtent(west: number, south: number, east: number, north: number, options?: {
        duration?: number;
    }): void;
    /** `ScreenSpaceEventHandler`'ı ve tüm camera/scene aboneliklerini yok eder, kayıtlı event dinleyicilerini temizler. */
    destroy(): void;
    private bindMouseEvents;
    private handleMouseMove;
    private dispatchPick;
    /** Vurgu katmanını atlar; alttaki asıl objeyi seçer. */
    private pickSelectableEntity;
    private pickImageryFeatures;
    private buildImageryDetail;
    private dispatchEntityOnly;
    private bindCameraEvents;
    private bindSceneEvents;
    private buildMapDetail;
    private buildEntityDetail;
    private resolveFeature;
    private pickAllFeatures;
    private toLonLat;
}

/** `InteractionManager`'ın yaydığı pick/kamera/sahne event'lerinin tam haritası. */
export declare interface InteractionManagerEventMap {
    /** Bir vektör (Entity) feature'a tıklandığında yayılır. */
    "entity:click": EntityInteractionDetail;
    /** Bir vektör (Entity) feature'a çift tıklandığında yayılır. */
    "entity:dblclick": EntityInteractionDetail;
    /** Bir vektör (Entity) feature'a sağ tıklandığında yayılır. */
    "entity:rightclick": EntityInteractionDetail;
    /** Fare düğmesi bir vektör (Entity) feature üzerinde basılı tutulduğunda yayılır. */
    "entity:mousedown": EntityInteractionDetail;
    /** Fare düğmesi bir vektör (Entity) feature üzerinde bırakıldığında yayılır. */
    "entity:mouseup": EntityInteractionDetail;
    /** Fare bir vektör (Entity) feature'ın üzerine geldiğinde yayılır. */
    "entity:mouseenter": EntityInteractionDetail;
    /** Fare bir vektör (Entity) feature'ın üzerinden ayrıldığında yayılır. */
    "entity:mouseleave": EntityInteractionDetail;
    /** Bir raster (WMS/WMTS) katmanına tıklandığında, GetFeatureInfo sonucu geldiğinde yayılır. */
    "imagery:click": ImageryInteractionDetail;
    /** Bir raster (WMS/WMTS) katmanına çift tıklandığında, GetFeatureInfo sonucu geldiğinde yayılır. */
    "imagery:dblclick": ImageryInteractionDetail;
    /** Bir raster (WMS/WMTS) katmanına sağ tıklandığında, GetFeatureInfo sonucu geldiğinde yayılır. */
    "imagery:rightclick": ImageryInteractionDetail;
    /** Bir raster katman için GetFeatureInfo sorgusu başlatıldığında (yanıttan önce) yayılır. */
    "imagery:querying": MapInteractionDetail;
    /** Boş harita zeminine tıklandığında yayılır. */
    "map:click": MapInteractionDetail;
    /** Boş harita zeminine çift tıklandığında yayılır. */
    "map:dblclick": MapInteractionDetail;
    /** Boş harita zeminine sağ tıklandığında yayılır. */
    "map:rightclick": MapInteractionDetail;
    /** Fare harita üzerinde hareket ettiğinde yayılır. */
    "map:mousemove": MapInteractionDetail;
    /** Fare tekerleği (zoom) çevrildiğinde yayılır. */
    "map:wheel": {
        readonly delta: number;
    };
    /** Dokunmatik pinch (yakınlaştırma) hareketi başladığında yayılır. */
    "map:pinchstart": MapInteractionDetail;
    /** Dokunmatik pinch hareketi devam ederken yayılır. */
    "map:pinchmove": MapInteractionDetail & {
        readonly angle: number;
    };
    /** Dokunmatik pinch hareketi bittiğinde yayılır. */
    "map:pinchend": Record<string, never>;
    /** Kamera hareketi başladığında yayılır. */
    "camera:moveStart": Record<string, never>;
    /** Kamera hareketi bittiğinde yayılır. */
    "camera:moveEnd": Record<string, never>;
    /** Kamera konumu belirgin şekilde değiştiğinde yayılır. */
    "camera:changed": {
        readonly percentage: number;
    };
    /** Her render karesinden önce yayılır. */
    "scene:preRender": {
        readonly time: JulianDate;
    };
    /** Her render karesinden sonra yayılır. */
    "scene:postRender": {
        readonly time: JulianDate;
    };
    /** 2D/3D/Columbus View geçişi (morph) başladığında yayılır. */
    "scene:morphStart": Record<string, never>;
    /** 2D/3D/Columbus View geçişi (morph) tamamlandığında yayılır. */
    "scene:morphComplete": Record<string, never>;
}

export declare type InteractionManagerEventName = keyof InteractionManagerEventMap;

export declare type InteractionManagerEventPayload<K extends InteractionManagerEventName> = InteractionManagerEventMap[K];

/** `AnalysisManager.intersection()` için kesişim analizi isteği. */
export declare interface IntersectionAnalysisRequest {
    /** Birinci geometri (GeoJSON). */
    readonly geojsonA: object;
    /** İkinci geometri (GeoJSON). */
    readonly geojsonB: object;
}

/** `AnalysisManager.intersection()`'ın sonucu. */
export declare interface IntersectionAnalysisResult {
    /** Kesişim geometrisi (GeoJSON). */
    readonly geojson: object;
}

/**
 * Haritadaki tüm katmanları (WMS/WMTS/WFS/WCS/GEOTIFF/GEOJSON/KML/KMZ/SHP/CSV,
 * Çizim ve Ölçü katmanları dahil) ekler, kaldırır, stiller ve sorgular.
 *
 * @example
 * ```ts
 * const layerManager = map.layerManager;
 * layerManager.on("layer:add", ({ layer }) => {
 *   console.log("Yeni katman eklendi:", layer.id);
 * });
 * const layer = await layerManager.add("WMS", {
 *   id: "world-continents",
 *   title: "World Continents (WMS)",
 *   url: "https://demo.mapserver.org/cgi-bin/wms",
 *   layers: "continents",
 *   version: "1.3.0",
 * });
 * layerManager.setVisible(layer.id, true);
 * ```
 */
export declare class LayerManager extends EventEmitter<LayerManagerEventMap> {
    private static readonly DEFAULT_OUTLINE_COLOR_HEX;
    private static readonly DEFAULT_OUTLINE_COLOR;
    private readonly viewer;
    private readonly items;
    private readonly analysisResultIds;
    private readonly outlineGeometry;
    private readonly opacityController;
    private readonly styleEngine;
    private readonly localSourceLoader;
    private readonly shapeLayerBridge;
    private readonly ogcLayerFactory;
    private readonly apiKeyPolicy;
    private readonly cameraHighlight;
    /** @param viewer - Katmanların yönetileceği Cesium `Viewer`. */
    constructor(viewer: Viewer);
    /**
     * apiKey ile ilgili ayarlari (Map.ts constructor'indan) gec-yapilandirir.
     * Sadece verilen alanlar guncellenir, digerleri oldugu gibi kalir --
     * boylece Map.ts, MapOptions'ta apiKey verilmemisse bu metodu hic
     * cagirmayabilir ya da kismi bir nesne geciebilir.
     */
    configure(options: {
        readonly apiKey?: string;
        readonly trustedApiKeyHosts?: readonly string[];
        readonly apiKeyDiscoveryUrl?: string;
    }): void;
    /** apiKey configure() ile atanmis mi -- SADECE varligi, degerin kendisi
     * degil (gercek deger ApiKeyPolicy icinde #apiKey olarak kapali kalir). */
    get hasApiKey(): boolean;
    /**
     * apiKey’e göre yetkili WMS/WFS/WMTS listesi — {@code GET /layers} + {@code X-API-Key}.
     * Checklist: getLayerList eşdeğeri.
     *
     * @example
     * ```ts
     * const authorizedLayers = await map.layerManager.getAuthorizedLayers();
     * console.log(`${authorizedLayers.length} yetkili katman bulundu.`);
     * ```
     */
    getAuthorizedLayers(): Promise<AuthorizedLayerInfo[]>;
    /** {@link getAuthorizedLayers} alias (checklist getLayerList). */
    getLayerList(): Promise<AuthorizedLayerInfo[]>;
    /**
     * Bir {@link AuthorizedLayerInfo}'nun {@link addAuthorizedLayer} ile
     * eklenebilir olup olmadigini bildirir (servisUrl + cozumlenmis katman
     * adi + WMTS ise wmtsTileMatrixSet sarti). Gercek mantik
     * `auth/ApiKeyPolicy.ts`'te (bkz. GC-03 Adim 3 — hem Lit bilesen hem
     * baska bir UI katmani AYNI kaynagi kullanabilsin diye).
     *
     * @example
     * ```ts
     * const addable = authorizedLayers.filter((info) => map.layerManager.canAddAuthorizedLayer(info));
     * ```
     */
    canAddAuthorizedLayer(info: AuthorizedLayerInfo): boolean;
    /**
     * {@link getAuthorizedLayers}'tan donen bir {@link AuthorizedLayerInfo}'yu
     * haritaya ekler — servis turune gore WMS/WFS/WMTS olarak {@link add}'a
     * yonlendirir. {@link canAddAuthorizedLayer} false donuyorsa
     * `LayerOperationError` firlatir.
     *
     * @example
     * ```ts
     * const authorizedLayers = await map.layerManager.getAuthorizedLayers();
     * await map.layerManager.addAuthorizedLayer(authorizedLayers[0]);
     * ```
     */
    addAuthorizedLayer(info: AuthorizedLayerInfo): Promise<ManagedLayer>;
    /**
     * URL'in apiKey gerektiren bir servis deseni (ucbp-api OGC proxy veya
     * configure edilmis trustedApiKeyHosts) tasiyip tasimadigini, apiKey'in
     * o an var olup olmadigindan BAGIMSIZ olarak bildirir. Tuketiciler
     * (ör. TucbsMapPreview) bunu, apiKey yok/gecersizken bir katmanin
     * gercekten acik olup olmadigina karar vermek icin kullanir.
     */
    layerRequiresApiKey(url: string): boolean;
    /** Yönetilen tüm katmanları (basemap dahil) döndürür. */
    getLayers(): ManagedLayer[];
    /** Kimliği verilen katmanı döndürür, yoksa `undefined`. */
    getLayerById(id: string): ManagedLayer | undefined;
    /** Katmanın entity'lerindeki gerçek veri kolonlarını (layerId/featureId hariç) döndürür. */
    getEntityPropertyNames(id: string): string[];
    /** Bir kolonun tüm benzersiz değerlerini (kategorik/enum stil için) döndürür. */
    getUniqueColumnValues(id: string, column: string): (string | number)[];
    /** Bir katmanin (entity-tabanli) GERCEK ozellik/sekil sayisini dondurur --
     * addPolygonOutlineCompanion ile eklenen ic companion polyline'lar (bkz
     * outlineCompanionEntities) HARIC tutulur (bkz getLayerGeoJSON'daki ayni
     * filtre). Entity-tabanli olmayan (ImageryLayer) katmanlarda undefined
     * doner. TucbsStyleEditor gibi tuketiciler bunu, cok BUYUK katmanlarda
     * (bkz kullanici bildirimi: 27458 ozellikli bir WFS katmaninda "Dış Hat
     * Genişliği" degisikligi -- Cesium geometriyi HER entity icin yeniden
     * insa etmesi gerektigi icin -- gorunur bir etki olmadan surekli
     * "yükleniyor" gosterip bitiyordu) pahali/geometri-etkileyen stil
     * kontrollerini devre disi birakmak icin kullanir. */
    getFeatureCount(id: string): number | undefined;
    /** Bir katmanın (entity-tabanli herhangi bir katman -- TucbsLayerList
     * SADECE Cizim Katmani/DRAWING icin bu aksiyonu menuye ekler, bkz
     * TucbsLayerList._openMenuPortal) tum sekillerini GeoJSON FeatureCollection
     * olarak dondurur (TucbsLayerExport'un indirme aksiyonu icin).
     * Entity-tabanli olmayan (ImageryLayer) katmanlarda undefined doner.
     * addPolygonOutlineCompanion ile eklenen ic companion polyline'lar (bkz
     * outlineCompanionEntities) HARIC tutulur -- bunlar poligonun dis hattini
     * gostermek icin eklenmis gorsel bir workaround, sekli TEKRAR eden sahte
     * bir LineString feature olarak disa aktarilmamali. */
    getLayerGeoJSON(id: string): FeatureCollection | undefined;
    /** getLayerGeoJSON()'i bir ".geojson" dosyasi olarak indirir -- TucbsLayerExport
     * bu ince tetikleyici cagriyi yapar (bkz TucbsMapExport/exportJPEG ile AYNI
     * "yakalama/indirme mantigi @tucbs/core'da" kurali). Entity-tabanli olmayan
     * bir katman icin (getLayerGeoJSON undefined donerse) sessizce hicbir sey
     * yapmaz.
     *
     * @example
     * ```ts
     * map.layerManager.exportLayerGeoJSON("katman-id", "katmanim");
     * ```
     */
    exportLayerGeoJSON(id: string, filename?: string): void;
    /** Analiz sonucu katmanı KML indirir. Geometri GeoJSON indirmesiyle aynıdır. */
    exportLayerKml(id: string, filename?: string): void;
    /** Analiz sonucu katmanı Shapefile zip indirir. Geometri GeoJSON indirmesiyle aynıdır. */
    exportLayerShapefile(id: string, filename?: string): void;
    /** Tampon veya kesişim katmanını işaretler. Üç nokta menüsü Dışa Aktar'ı buna bakar. */
    markAnalysisResult(id: string): void;
    /** Katman tampon/kesişim sonucu mu. Yüklenen GEOJSON bu kümede değildir. */
    isAnalysisResult(id: string): boolean;
    /** id'li katman WMS/WCS ise VE kesif sirasinda sunucunun GeoTIFF-uyumlu
     * bir formati (tiffFormat) desteklediği tespit edildiyse true doner --
     * TucbsLayerList "GeoTIFF Olarak Dışa Aktar" menu ogesini SADECE bu true
     * ise gosterir (bkz TucbsServiceUpload capabilities format kesfi). */
    isGeoTiffExportAvailable(id: string): boolean;
    /** WMS GetMap / WCS GetCoverage'i sunucunun desteklediği GeoTIFF-uyumlu
     * formatla (bkz isGeoTiffExportAvailable) yeniden istekleyip ".tif" olarak
     * indirir. Cesium/canvas'a HIC dokunmaz -- WCS'in resolveWcsImageUrl'i ile
     * AYNI "ham HTTP indirme" deseninde (bkz o metod), tek fark burada format
     * PNG'ye SABITLENMIYOR, sunucunun kendi GeoTIFF ciktisi ISTENIYOR.
     * Desteklenmiyorsa (isGeoTiffExportAvailable false) hata firlatir --
     * cagiran taraf (TucbsLayerExport) bunu yakalar.
     *
     * @example
     * ```ts
     * await map.layerManager.exportLayerAsGeoTiff("katman-id", "katmanim");
     * ```
     */
    exportLayerAsGeoTiff(id: string, filename?: string): Promise<void>;
    /** Bir kolonun sayısal min/max aralığını döndürür (gradient/bin modunda min/max verilmezse otomatik kullanılır). */
    getColumnRange(id: string, column: string): {
        min: number;
        max: number;
    } | null;
    /**
     * Katmanın dolgu/dış-hat stilini uygular. Sadece Entity tabanlı (WFS/LOCAL)
     * katmanlarda çalışır. Gradient/bin modunda `min`/`max`'tan verilmeyen uç
     * getColumnRange() ile veri aralığından otomatik hesaplanır; verilen uç
     * aynen kullanılır (tucbs-react'teki "min===max===v her zaman" bug'ı burada
     * YOK — bkz. project_ucbp_api_styleeditor_arastirma memory). Ters aralık
     * (`min` > `max`, uçlardan biri veriden gelince de oluşabilir) düzeltilmez;
     * geçerli bir aralık vermek çağıranın sorumluluğundadır.
     *
     * @example
     * ```ts
     * await map.layerManager.applyLayerStyle("katman-id", {
     *   fill: { mode: "solid", color: "#3388ff", opacity: 0.6 },
     *   outline: { enabled: true, color: "#1d4e89", width: 2 },
     * });
     * ```
     */
    applyLayerStyle(id: string, spec: LayerStyleSpec): Promise<void>;
    /** Bir vektor katmana en son uygulanan stili döndürür (TucbsLegendPanel için). */
    getLayerStyle(id: string): LayerStyleSpec | undefined;
    /** Katmana eklenirken atanan ilk (random) rengi döndürür — sonraki stil
     * değişikliklerinden etkilenmez. TucbsStyleEditor'ün "Sıfırla" işlevi
     * için kullanılır. */
    getInitialFillColor(id: string): string | undefined;
    /** Basemap HARİÇ tüm imagery (WMS/WMTS/WCS/GEOTIFF) katmanlarının Cesium `ImageryLayer`'larını döndürür. */
    getImageryLayers(): ImageryLayer[];
    /** SADECE basemap olarak işaretli imagery katmanlarının Cesium `ImageryLayer`'larını döndürür. */
    getBasemapLayers(): ImageryLayer[];
    /** Cesium `Viewer`'ın `dataSources` koleksiyonunu doğrudan döndürür. */
    getDataSourceLayers(): DataSourceCollection;
    /** Belirli bir katman türündeki (`WMS`/`WFS`/... ) tüm yönetilen katmanları döndürür. */
    getLayerByType(layerType: LayerType): ManagedLayer[];
    /**
     * Kamerayı, katmanın tüm görünür alanına (extent) düz tepeden bakışla yakınlaştırır.
     *
     * @example
     * ```ts
     * await map.layerManager.zoomToLayer("katman-id");
     * ```
     */
    zoomToLayer(id: string): Promise<boolean>;
    /** Kamerayı, tek bir entity'nin çerçevesine düz tepeden bakışla yakınlaştırır. */
    zoomToEntity(entity: Entity, options?: {
        duration?: number;
    }): Promise<boolean>;
    /** Bir entity'yi, kendi stiline dokunmadan sabit renkli bir "outline" ile geçici olarak vurgular. */
    highlightEntity(entity: Entity): void;
    /** {@link highlightEntity} ile eklenen geçici vurguyu kaldırır (aktif vurgu yoksa no-op). */
    clearHighlight(): void;
    /**
     * Haritaya yeni bir katman ekler (WMS/WMTS/WFS/WCS/GEOTIFF/GEOJSON/KML/KMZ/SHP/CSV).
     * @param layerType - Eklenecek katmanın türü; `options`'ın şekli buna göre belirlenir.
     * @param options - Katman türüne özgü seçenekler (bkz ilgili `*LayerOptions` tipi).
     * @returns Eklenen katmanın `ManagedLayer` kaydı.
     * @throws {LayerOperationError} `id` zaten kullanılıyorsa veya `layerType` "XYZ"/"DRAWING"/"MEASURE" ise (bunlar `add()` ile desteklenmez).
     *
     * @example
     * ```ts
     * const layer = await map.layerManager.add("WMS", {
     *   id: "world-continents",
     *   title: "World Continents (WMS)",
     *   url: "https://demo.mapserver.org/cgi-bin/wms",
     *   layers: "continents",
     *   version: "1.3.0",
     * });
     * ```
     */
    add(layerType: "WMS", options: WMSLayerOptions): Promise<ManagedLayer>;
    /**
     * Haritaya yeni bir WMTS (Web Map Tile Service) katmanı ekler.
     * @param layerType - `"WMTS"`.
     * @param options - WMTS katman seçenekleri (bkz `WMTSLayerOptions`).
     * @returns Eklenen katmanın `ManagedLayer` kaydı.
     * @throws {LayerOperationError} `id` zaten kullanılıyorsa.
     *
     * @example
     * ```ts
     * const layer = await map.layerManager.add("WMTS", {
     *   id: "hgm-ortofoto",
     *   title: "HGM Ortofoto (WMTS)",
     *   url: "https://cdn.tucbs.gov.tr/wmts",
     *   layer: "ortofoto",
     *   tileMatrixSetID: "GoogleMapsCompatible",
     * });
     * ```
     */
    add(layerType: "WMTS", options: WMTSLayerOptions): Promise<ManagedLayer>;
    /**
     * Haritaya yeni bir WFS (Web Feature Service) katmanı ekler.
     * @param layerType - `"WFS"`.
     * @param options - WFS katman seçenekleri (bkz `WFSLayerOptions`).
     * @returns Eklenen katmanın `ManagedLayer` kaydı.
     * @throws {LayerOperationError} `id` zaten kullanılıyorsa.
     *
     * @example
     * ```ts
     * const layer = await map.layerManager.add("WFS", {
     *   id: "il-sinirlari",
     *   title: "İl Sınırları (WFS)",
     *   url: "https://demo.mapserver.org/cgi-bin/wfs",
     *   typeName: "il_sinirlari",
     * });
     * ```
     */
    add(layerType: "WFS", options: WFSLayerOptions): Promise<ManagedLayer>;
    /**
     * Haritaya yeni bir WCS (Web Coverage Service) katmanı ekler.
     * @param layerType - `"WCS"`.
     * @param options - WCS katman seçenekleri (bkz `WCSLayerOptions`).
     * @returns Eklenen katmanın `ManagedLayer` kaydı.
     * @throws {LayerOperationError} `id` zaten kullanılıyorsa.
     *
     * @example
     * ```ts
     * const layer = await map.layerManager.add("WCS", {
     *   id: "arazi-yukseklik",
     *   title: "Arazi Yükseklik Modeli (WCS)",
     *   url: "https://demo.mapserver.org/cgi-bin/wcs",
     *   coverageId: "dem",
     * });
     * ```
     */
    add(layerType: "WCS", options: WCSLayerOptions): Promise<ManagedLayer>;
    /**
     * Haritaya yeni bir GeoTIFF katmanı ekler. Not: mevcut Cesium sürümünde
     * (≥1.143) henüz desteklenmiyor (bkz `LayerManager.addGeoTiff`).
     * @param layerType - `"GEOTIFF"`.
     * @param options - GeoTIFF katman seçenekleri (bkz `GeoTiffLayerOptions`).
     * @returns Eklenen katmanın `ManagedLayer` kaydı.
     * @throws {LayerOperationError} `id` zaten kullanılıyorsa.
     *
     * @example
     * ```ts
     * const layer = await map.layerManager.add("GEOTIFF", {
     *   id: "uydu-goruntusu",
     *   title: "Uydu Görüntüsü (GeoTIFF)",
     *   url: "https://example.com/data/goruntu.tif",
     * });
     * ```
     */
    add(layerType: "GEOTIFF", options: GeoTiffLayerOptions): Promise<ManagedLayer>;
    /**
     * Haritaya yerel bir dosyadan (GeoJSON/KML/KMZ/SHP/CSV) katman ekler.
     * Aşağıdaki örnek GeoJSON içindir; KML/KMZ/SHP/CSV için `layerType` ve
     * `data`'nın formatı değişir, `options`'ın diğer alanları aynıdır.
     * @param layerType - `"GEOJSON" | "KML" | "KMZ" | "SHP" | "CSV"`.
     * @param options - Yerel katman seçenekleri (bkz `LocalLayerOptions`).
     * @returns Eklenen katmanın `ManagedLayer` kaydı.
     * @throws {LayerOperationError} `id` zaten kullanılıyorsa.
     *
     * @example
     * ```ts
     * const layer = await map.layerManager.add("GEOJSON", {
     *   id: "kendi-verim",
     *   title: "Kendi Verim (GeoJSON)",
     *   layerType: "GEOJSON",
     *   data: { type: "FeatureCollection", features: [] },
     * });
     * ```
     */
    add(layerType: "GEOJSON" | "KML" | "KMZ" | "SHP" | "CSV", options: LocalLayerOptions): Promise<ManagedLayer>;
    /**
     * Bir katmanın görünürlüğünü ayarlar.
     *
     * @example
     * ```ts
     * map.layerManager.setVisible("katman-id", false);
     * ```
     */
    setVisible(id: string, visible: boolean): void;
    /**
     * Bir katmanın opaklığını (0-1 arası, sınırlanır) ayarlar.
     *
     * @example
     * ```ts
     * map.layerManager.setOpacity("katman-id", 0.5);
     * ```
     */
    setOpacity(id: string, opacity: number): void;
    private _move;
    /** Katmanı kendi koleksiyonu (imagery veya dataSource) içinde bir sıra yukarı taşır. */
    raise(id: string): void;
    /** Katmanı kendi koleksiyonu (imagery veya dataSource) içinde bir sıra aşağı taşır. */
    lower(id: string): void;
    /** Katmanı kendi koleksiyonu (imagery veya dataSource) içinde en üste taşır. */
    raiseToTop(id: string): void;
    /** Katmanı kendi koleksiyonu (imagery veya dataSource) içinde en alta taşır. */
    lowerToBottom(id: string): void;
    /** TucbsLayerList sürükle-bırak yeniden sıralaması için: basemap hariç tüm katmanların yeni z-sırasını tek çağrıda uygular. */
    reorder(orderedIds: readonly string[]): void;
    /**
     * Katmanı haritadan ve tüm iç bookkeeping (stil/apiKey/sayaç kayıtları) yapılarından kaldırır.
     *
     * @example
     * ```ts
     * map.layerManager.removeLayer("katman-id");
     * ```
     */
    removeLayer(id: string): void;
    private addWMS;
    private addWMTS;
    /** Bir WMS katmanının sunucu-tanımlı (GetCapabilities'ten) stil seçeneklerini, lejant URL'leriyle birlikte döndürür. */
    getWmsAvailableStyles(id: string): Promise<ServiceStyleOption[]>;
    /** WMS katmanını seçilen sunucu-tanımlı stille (STYLES parametresiyle) yeniden kurar. */
    setWmsStyle(id: string, styleName: string): Promise<void>;
    /** WMS GetLegendGraphic URL'ini (apiKey varsa query parametresiyle) oluşturur. */
    getWmsLegendGraphicUrl(id: string, styleName?: string): string;
    /** Bir WMTS katmanının sunucu-tanımlı (GetCapabilities'ten) stil seçeneklerini, lejant URL'leriyle birlikte döndürür. */
    getWmtsAvailableStyles(id: string): Promise<ServiceStyleOption[]>;
    /** WMTS katmanını seçilen sunucu-tanımlı stille yeniden kurar. */
    setWmtsStyle(id: string, styleName: string): Promise<void>;
    private addWFS;
    private addWCS;
    private addGeoTiff;
    private addLocalKmlGeoJson;
    private addShp;
    private addCsv;
    /* Excluded from this release type: _addBasemapImageryLayer */
    /* Excluded from this release type: _removeBasemapLayers */
    /* Excluded from this release type: _addDrawnShape */
    /* Excluded from this release type: _addMeasuredShape */
    /* Excluded from this release type: _removeDrawnShape */
    private register;
    private emitCrsCheckResult;
    private tagEntities;
    private reindexLayerOrder;
    private requireLayer;
    private assertUniqueId;
    /**
     * ML-12 düzeltmesi: OGC GetCapabilities'i apiKey header + proxy KURALLARIYLA
     * çeker. `TucbsServiceUpload` (GC-05) gibi ayrı bir `LayerManager`
     * referansına sahip tüketiciler de servis keşfi için bunu kullanır --
     * eskiden bu tüketiciler proxy/apiKey'den TAMAMEN habersiz çıplak `fetch`
     * kullanıyordu (bkz project_ucbp_api_ogc_capabilities_uygulama_plani, ML-12).
     * layers/ogc/OgcLayerFactory.ts'e delege (bkz Adim 8/Faz 2).
     */
    getCapabilitiesDocument(baseUrl: string, serviceType: "WMS" | "WMTS" | "WFS" | "WCS", version: string, authToken?: string): Promise<Document>;
    /**
     * Faz 5b (ML-12'nin DescribeCoverage boşluğu): WCS coverage'larının gerçek
     * coğrafi kapsama alanlarını `getCapabilitiesDocument` ile AYNI apiKey/proxy
     * politikasından geçirerek çeker -- eskiden bu istek proxy'siz gittiği için
     * CORS-korumalı sunucularda sessizce başarısız olup katmanlar global
     * (-180,-90,180,90) dikdörtgene düşüyordu (bkz
     * project_ucbp_api_ogc_capabilities_uygulama_plani Faz 5b).
     * layers/ogc/OgcLayerFactory.ts'e delege (bkz Adim 8/Faz 2).
     */
    getWcsCoverageExtents(rawUrl: string, coverageIds: readonly string[], authToken?: string): Promise<Map<string, GeographicBoundingBox>>;
    private waitForRenderSettle;
    /** Bu entity'nin KENDİSİ bir outline companion'i mi (ayri bir polyline
     * olarak eklenmis, poligonun gercek bir ozelligi degil)? */
    private isOutlineCompanion;
    /** Bu (poligon) entity'nin bir outline companion'i VAR mi -- varsa native
     * polygon.outline/outlineColor/outlineWidth alanlarina DOKUNULMAMALI. */
    private hasOutlineCompanion;
    /** Bu (poligon) entity antimeridyen/kutup crash riski tasidigi icin native
     * outline'i BILEREK kapatilmis mi -- tekrar acilmamali. */
    private hasRiskyOutline;
    private addPolygonOutlines;
    private addPolygonOutlineCompanion;
    private readProperty;
    private applyEntityStyle;
    private setDataSourceOpacity;
    /** Tüm event dinleyicilerini ve iç katman kaydını temizler (Cesium katmanlarının kendisini kaldırmaz). */
    destroy(): void;
}

/** `LayerManager`'ın yaydığı katman/basemap/CRS event'lerinin tam haritası. */
export declare interface LayerManagerEventMap {
    /** Bir katman haritaya eklendiğinde yayılır. */
    "layer:add": {
        readonly layer: ManagedLayer;
    };
    /** Bir katman haritadan kaldırıldığında yayılır. */
    "layer:remove": {
        readonly layer: ManagedLayer;
    };
    /** Altlık harita servisine erişilemediğinde (fallback görsel devreye girdiğinde) yayılır. */
    "basemap:error": {
        readonly id: BasemapId;
    };
    /** Altlık harita servisi `basemap:error`'dan sonra tekrar erişilebilir hale geldiğinde yayılır. */
    "basemap:recovered": {
        readonly id: BasemapId;
    };
    /** Bir katmanın z-sırası (üst-alt konumu) değiştiğinde yayılır. */
    "layer:reorder": {
        readonly id: string;
        readonly oldIndex: number;
        readonly newIndex: number;
        readonly layer: ManagedLayer;
    };
    /** Bir katmanın görünürlüğü değiştiğinde yayılır. */
    "layer:visibility": {
        readonly id: string;
        readonly visible: boolean;
    };
    /** Bir katmanın opaklığı değiştiğinde yayılır. */
    "layer:opacity": {
        readonly id: string;
        readonly opacity: number;
    };
    /** Bir katmanın stili (`applyLayerStyle()`) değiştiğinde yayılır. */
    "layer:style": {
        readonly id: string;
        readonly style: LayerStyleSpec;
    };
    /** `LayerManager`'ın apiKey'i değiştiğinde yayılır. */
    "apiKey:change": {
        readonly hasApiKey: boolean;
    };
    /** Yüklenen katmanın koordinat sistemi otomatik olarak WGS84'e dönüştürüldüğünde yayılır. */
    "layer:crs-reprojected": {
        readonly id: string;
        readonly fromEpsg: string;
        readonly toEpsg: "EPSG:4326";
    };
    /** Katmanın koordinat sistemi çözülemediğinde (ham/varsayılan WGS84 kabulüyle yine de yüklendiğinde) yayılır. */
    "layer:crs-unresolved": {
        readonly id: string;
        readonly crsName: string;
    };
    /** WFS katmanının kayıt sayısı sunucu limitini aştığında (katman kısmi veriyle yüklendiğinde) yayılır. */
    "layer:features-truncated": {
        readonly id: string;
        readonly totalCount: number;
        readonly loadedCount: number;
    };
}

export declare type LayerManagerEventName = keyof LayerManagerEventMap;

export declare type LayerManagerEventPayload<K extends LayerManagerEventName> = LayerManagerEventMap[K];

/** Katman ekleme/kaldırma/tip-kontrolü gibi ağ-dışı LayerManager hataları. */
export declare class LayerOperationError extends TucbsError {
    constructor(code: TucbsErrorCode, message?: string, title?: string);
}

/** `LayerManager.applyLayerStyle()`'a verilen tam katman stili (dolgu + dış hat). */
export declare interface LayerStyleSpec {
    /** Dolgu stili. */
    readonly fill: FillStyle;
    /** Dış hat stili. */
    readonly outline: OutlineStyle;
}

/** Bir katmanın veri kaynağı/servis türü. */
export declare type LayerType = "WMS" | "WMTS" | "WFS" | "WCS" | "GEOJSON" | "KML" | "KMZ" | "SHP" | "CSV" | "GEOTIFF" | "XYZ" | "DRAWING" | "MEASURE";

declare type Listener<TPayload> = (payload: TPayload) => void;

/** `LayerManager.add()` ile yerel dosyadan (GeoJSON/KML/KMZ/SHP/CSV) katman eklemek için seçenekler. */
export declare interface LocalLayerOptions {
    /** Katmanın benzersiz kimliği. */
    readonly id: string;
    /** Katmanın kullanıcıya gösterilen başlığı. */
    readonly title: string;
    /** Dosya içeriği (ayrıştırılmış nesne, ham metin, `ArrayBuffer` veya bir `File`). */
    readonly data: object | string | ArrayBuffer | File;
    /** Dosyanın formatı. */
    readonly layerType: "GEOJSON" | "KML" | "KMZ" | "SHP" | "CSV";
    /** Geometrilerin yer yüzeyine (terrain) yapıştırılıp yapıştırılmayacağı. */
    readonly clampToGround?: boolean;
}

/** Haritaya eklenmiş, `LayerManager` tarafından yönetilen bir katmanın anlık durumu. */
export declare interface ManagedLayer {
    /** Katmanın benzersiz kimliği (`add()` çağrısında verilen `id`). */
    readonly id: string;
    /** Katmanın kullanıcıya gösterilen başlığı. */
    readonly title: string;
    /** Katmanın veri kaynağı/servis türü. */
    readonly layerType: LayerType;
    /** Katmanın altındaki Cesium nesnesi (raster katmanlarda `ImageryLayer`, vektör katmanlarda `DataSource`). */
    readonly cesiumObject: ImageryLayer | DataSource;
    /** Bu katmanın altlık harita (basemap) olarak mı eklendiği. */
    readonly isBasemap: boolean;
    /** Katman eklenirken atanan ilk (random) hex renk. Vektör katmanlar için
     * StyleEditor'ün "Sıfırla" işlevinin döneceği sabit referans noktasıdır;
     * sonraki style değişiklikleriyle güncellenmez. */
    readonly initialFillColor?: string;
}

/**
 * `@tucbs/core`'un giriş noktası — bir Cesium `Viewer`'ı sarmalar, altlık
 * harita/marker/kamera yönetimini üstlenir ve `LayerManager`/
 * `InteractionManager`/`DrawingManager`/`AnalysisManager` alt sistemlerini
 * tek bir örnekte birleştirir.
 */
declare class Map_2 {
    #private;
    /** Sarmalanan Cesium `Viewer` nesnesi. */
    readonly viewer: Viewer;
    /** Katman ekleme/kaldırma/stil yönetimi. */
    readonly layerManager: LayerManager;
    private readonly selectionHighlight;
    /** Mouse/camera/scene etkileşim event'leri. */
    readonly interactionManager: InteractionManager;
    /** Çizim/ölçüm araçları. */
    readonly drawingManager: DrawingManager;
    /** Tampon/kesişim gibi coğrafi analiz istekleri. */
    readonly analysisManager: AnalysisManager;
    private readonly basemapController;
    private _removeMarker;
    /**
     * @param container - Haritanın oluşturulacağı DOM elementi veya id'si.
     * @param options - Başlangıç harita seçenekleri.
     *
     * @example
     * ```ts
     * const map = new Map(document.getElementById("map-container")!, {
     *   basemap: "hgm-temel",
     *   apiKey: "YOUR_API_KEY",
     *   camera: { longitude: 32.85, latitude: 39.93, height: 500000 },
     * });
     * ```
     */
    constructor(container: Element | string, options?: MapOptions);
    /**
     * apiKey varsa GET /auth/validate (core auth). Yoksa no-op.
     * Geçersizse throw — TucbsMap ready yerine error event basar.
     *
     * @example
     * ```ts
     * try {
     *   await map.ensureApiKeyValid();
     * } catch (err) {
     *   console.error("ApiKey geçersiz:", err);
     * }
     * ```
     */
    ensureApiKeyValid(): Promise<void>;
    /**
     * Tampon analizi: AnalysisManager → backend → sonuç GEOJSON katmanı.
     *
     * @example
     * ```ts
     * const layer = await map.runBuffer({
     *   geojson: sourceFeature,
     *   distanceM: 500,
     * });
     * console.log("Tampon katmanı eklendi:", layer.id);
     * ```
     */
    runBuffer(request: BufferAnalysisRequest, layerOpts?: {
        readonly id?: string;
        readonly title?: string;
    }): Promise<ManagedLayer>;
    /**
     * Kesişim analizi: AnalysisManager → backend → sonuç GEOJSON katmanı.
     *
     * @example
     * ```ts
     * const layer = await map.runIntersection({
     *   geojsonA: featureA,
     *   geojsonB: featureB,
     * });
     * console.log("Kesişim katmanı eklendi:", layer.id);
     * ```
     */
    runIntersection(request: IntersectionAnalysisRequest, layerOpts?: {
        readonly id?: string;
        readonly title?: string;
    }): Promise<ManagedLayer>;
    /** Sınır analizi: worker geometrisini olduğu gibi katmana yazar. */
    runBoundary(request: BoundaryAnalysisRequest, layerOpts?: {
        readonly id?: string;
        readonly title?: string;
    }): Promise<ManagedLayer>;
    /** Kırpma: kaynak ve maske. */
    runClip(request: IntersectionAnalysisRequest, layerOpts?: {
        readonly id?: string;
        readonly title?: string;
    }): Promise<ManagedLayer>;
    /** Fark: ikinci poligon birinciden çıkarılır. */
    runDifference(request: IntersectionAnalysisRequest, layerOpts?: {
        readonly id?: string;
        readonly title?: string;
    }): Promise<ManagedLayer>;
    /** Çıkarma: örtüşen parça kaynaktan silinir. */
    runSubtract(request: IntersectionAnalysisRequest, layerOpts?: {
        readonly id?: string;
        readonly title?: string;
    }): Promise<ManagedLayer>;
    /** Birleştir: iki poligon tek alan olur. */
    runUnion(request: IntersectionAnalysisRequest, layerOpts?: {
        readonly id?: string;
        readonly title?: string;
    }): Promise<ManagedLayer>;
    /** Kama tampon: açı dilimini katmana yazar. */
    runWedgeBuffer(request: WedgeBufferAnalysisRequest, layerOpts?: {
        readonly id?: string;
        readonly title?: string;
    }): Promise<ManagedLayer>;
    /** Analiz GeoJSON'unu clamp'li katman olarak ekler. */
    private addAnalysisGeoJson;
    /**
     * Kamerayı verilen konum/açıya anında (uçuş animasyonu olmadan) ayarlar.
     *
     * @example
     * ```ts
     * map.setView({ longitude: 32.85, latitude: 39.93, height: 500000 });
     * ```
     */
    setView(cameraOptions: CameraOptions): void;
    /**
     * Nokta yerine bir bölgeyi (ör. Türkiye sınırı) ekrana sığacak şekilde ortalar.
     *
     * @example
     * ```ts
     * map.setExtent({ west: 26, south: 36, east: 45, north: 42 });
     * ```
     */
    setExtent(extent: MapExtent): void;
    /**
     * Kamerayı verilen konum/açıya uçuş animasyonuyla götürür.
     *
     * @example
     * ```ts
     * map.flyTo({ longitude: 28.97, latitude: 41.01, height: 20000 });
     * ```
     */
    flyTo(cameraOptions: CameraOptions): void;
    /**
     * Kamerayı verilen coğrafi konuma (varsayılan yönle) anında ayarlar.
     *
     * @example
     * ```ts
     * map.zoomTo(35.0, 39.0, 1000000);
     * ```
     */
    zoomTo(longitude: number, latitude: number, height: number): void;
    /** Kamerayı verilen katmanın kapsama alanına (extent'ine) top-down yaklaştırır. */
    zoomToLayer(layer: ManagedLayer): Promise<boolean>;
    /**
     * Verilen konuma tekil bir ikon marker'ı ekler; önceki marker (varsa) kaldırılır.
     * @param longitude - Boylam (derece).
     * @param latitude - Enlem (derece).
     * @param iconUrl - Marker ikonunun URL'si (ör. bir SVG data-URI).
     * @param options - Opsiyonel. `width`/`height`: ikonun ekrandaki boyutu (CSS px); verilmezse görüntünün
     *   kendi piksel boyutu kullanılır. Marker, Cesium tuvaline değil harita container'ının üstüne bir `<img>`
     *   olarak çizilir (bu yüzden `setQuality()` düşük olsa bile keskindir). `anchor`: koordinata oturan nokta —
     *   `"bottom"` (varsayılan, pin ucu) veya `"center"` (dairesel ikon). Yüksek çözünürlüklü bir görüntüyü küçük göstermek keskinliği artırır.
     *
     * @example
     * ```ts
     * map.dropMarker(32.85, 39.93, "https://example.com/pin.svg");
     * map.dropMarker(32.85, 39.93, "https://example.com/pin@8x.png", { width: 30, height: 36 });
     * ```
     */
    dropMarker(longitude: number, latitude: number, iconUrl: string, options?: MarkerOverlayOptions): void;
    /**
     * `dropMarker()` ile eklenen marker'ı kaldırır (yoksa no-op).
     *
     * @example
     * ```ts
     * map.clearMarker();
     * ```
     */
    clearMarker(): void;
    /** Altlık haritanın yükleme durumu (`"loading"`/`"ready"`/`"unavailable"`). */
    get basemapStatus(): BasemapStatus;
    /**
     * Altlık haritayı ayarlar/değiştirir (`null`/`undefined` altlık haritayı tamamen kaldırır).
     *
     * @example
     * ```ts
     * map.setBasemap("hgm-ortofoto");
     * ```
     */
    setBasemap(basemap?: BasemapOptions | BasemapId | null): void;
    /** Sahne modunu 2D/3D arasında değiştirir (animasyonsuz, anında). */
    setMode(mode: "2D" | "3D"): void;
    /** Render çözünürlük ölçeğini ayarlar (`quality`: 0-100 arası yüzde, Cesium `resolutionScale`'e 0.1-1.0 arasına eşlenir — 0.1 alt sınırdır, aşırı bulanıklığı/performans düşüşünü önler). */
    setQuality(quality: number): void;
    /** Harita canvas boyutunu, container'ının güncel boyutuna göre yeniden hesaplar. */
    resize(): void;
    /**
     * O anki kamera görüntüsünü (harita + tüm entity/feature'lar, UI butonları
     * hariç) JPEG olarak yakalayıp indirir.
     * @param filename - İndirilecek dosyanın adı (uzantısız, zaman damgası eklenir).
     * @param quality - JPEG sıkıştırma kalitesi (0-1).
     *
     * @example
     * ```ts
     * await map.exportJPEG("harita-goruntusu", 0.95);
     * ```
     */
    exportJPEG(filename?: string, quality?: number): Promise<void>;
    /**
     * O anki kamera görüntüsünü indirmeden bir `Blob` olarak döndürür (ör. bir
     * `<img>`'e `blob:` URL olarak verilmek üzere).
     * @param quality - JPEG sıkıştırma kalitesi (0-1).
     */
    captureScreenshotBlob(quality?: number): Promise<Blob>;
    /**
     * Ekran merkezinde, arazi-farkında (`globe.pick`) ölçülen piksel-başına-yer-mesafesini
     * (metre) döndürür; harita globe'u göstermiyorsa (ör. açık uzay) `null` döner.
     */
    measureGroundMetersPerPixel(): number | null;
    private buildViewerOptions;
    private registerGlobalApiKeyRotation;
    private wireShapeSource;
    /** Seçili geometriyi katman listesine yazmadan kırmızı gösterir. Boş dizi vurguyu kaldırır. */
    showSelectionHighlight(features: readonly HighlightFeature[]): void;
    /** Seçim vurgusunu haritadan kaldırır. */
    clearSelectionHighlight(): void;
    /** Tüm alt sistemleri (drawing/interaction/layer manager) ve Cesium `Viewer`'ı yok eder. */
    destroy(): void;
}
export { Map_2 as Map }

/** Derece cinsinden bir dikdörtgen coğrafi bölge. */
export declare interface MapExtent {
    /** Batı sınırı (derece boylam). */
    readonly west: number;
    /** Güney sınırı (derece enlem). */
    readonly south: number;
    /** Doğu sınırı (derece boylam). */
    readonly east: number;
    /** Kuzey sınırı (derece enlem). */
    readonly north: number;
}

/** `map:*` etkileşim event'lerinin detay nesnesi. */
export declare interface MapInteractionDetail {
    /** Etkileşimin gerçekleştiği noktanın coğrafi konumu (`[boylam, enlem]`, derece). */
    readonly position: [number, number];
    /** Etkileşimin gerçekleştiği noktanın ekran koordinatı (piksel). */
    readonly screenPos: {
        readonly x: number;
        readonly y: number;
    };
}

/**
 * `new Map(...)` constructor'ına verilen harita başlatma seçenekleri.
 *
 * @example
 * ```ts
 * const options: MapOptions = {
 *   basemap: "hgm-temel",
 *   apiKey: "YOUR_API_KEY",
 *   camera: { longitude: 32.85, latitude: 39.93, height: 500000 },
 *   timeline: false,
 *   animation: false,
 * };
 * ```
 */
export declare interface MapOptions {
    /** Başlangıç altlık haritası (kimlik veya `BasemapOptions`); verilmezse basemap yüklenmez. */
    readonly basemap?: BasemapOptions | BasemapId | null;
    /** Bu harita instance'ına özel apiKey; verilmezse `configureTucbs()` ile ayarlanmış global apiKey kullanılır. */
    readonly apiKey?: string;
    /** apiKey'in otomatik olarak ekleneceği host'ların allowlist'i. */
    readonly trustedApiKeyHosts?: readonly string[];
    /** Yetkili katman keşfi (`getAuthorizedLayers()`) için özel adres. @default "{DEFAULT_UCBP_API_BASE}/layers" */
    readonly apiKeyDiscoveryUrl?: string;
    /** Başlangıç kamera konumu. */
    readonly camera?: CameraOptions;
    /** Harita ilk yüklendiğinde ortalanacak bölge. */
    readonly initialExtent?: MapExtent;
    /** Cesium zaman çizelgesi widget'ının gösterilip gösterilmeyeceği. */
    readonly timeline?: boolean;
    /** Cesium animasyon widget'ının gösterilip gösterilmeyeceği. */
    readonly animation?: boolean;
    /** Cesium altlık harita seçici widget'ının gösterilip gösterilmeyeceği. */
    readonly baseLayerPicker?: boolean;
    /** Cesium adres/konum arama (geocoder) widget'ının gösterilip gösterilmeyeceği. */
    readonly geocoder?: boolean;
    /** Cesium "ana konuma dön" düğmesinin gösterilip gösterilmeyeceği. */
    readonly homeButton?: boolean;
    /** Cesium 2D/3D/Columbus View sahne modu seçicisinin gösterilip gösterilmeyeceği. */
    readonly sceneModePicker?: boolean;
    /** Cesium gezinme yardımı düğmesinin gösterilip gösterilmeyeceği. */
    readonly navigationHelpButton?: boolean;
    /** Cesium bilgi kutusunun (feature tıklamasında açılan panel) gösterilip gösterilmeyeceği. */
    readonly infoBox?: boolean;
    /** Cesium seçim göstergesinin (seçili feature çerçevesi) gösterilip gösterilmeyeceği. */
    readonly selectionIndicator?: boolean;
    /** Cesium gölgelerin (shadows) açık olup olmadığı. */
    readonly shadows?: boolean;
    /** Cesium saat/animasyonun otomatik oynatılıp oynatılmayacağı. */
    readonly shouldAnimate?: boolean;
    /** Cesium tam ekran düğmesinin gösterilip gösterilmeyeceği. */
    readonly fullscreenButton?: boolean;
    /** Cesium `Viewer` constructor'ına doğrudan geçilecek ek seçenekler (ileri düzey özelleştirme). */
    readonly cesiumOptions?: Viewer.ConstructorOptions;
}

/** `createMarkerOverlay` seçenekleri. */
declare interface MarkerOverlayOptions {
    /** İkonun ekrandaki genişliği (CSS px); verilmezse görüntünün kendi boyutu. */
    width?: number;
    /** İkonun ekrandaki yüksekliği (CSS px); verilmezse görüntünün kendi boyutu. */
    height?: number;
    /** İkonun koordinata oturan noktası: `"bottom"` (varsayılan, pin ucu) veya `"center"` (dairesel ikon). */
    anchor?: "bottom" | "center";
}

/** Ölçüm (measure) katmanının sabit id'si. */
export declare const MEASURE_LAYER_ID = "__tucbs_measure_layer__";

/** Dolgu kapalı — katman sadece dış hatla (outline) gösterilir. */
export declare interface OffFillStyle {
    /** Stil modu ayırt edicisi. */
    readonly mode: "off";
}

/** WMS/WMTS/WFS/WCS/GetCapabilities gibi gerçek OGC ağ istekleri başarısız olduğunda. */
export declare class OgcRequestError extends TucbsError {
    constructor(code: TucbsErrorCode, message?: string, title?: string);
}

/** Bir katmanın dış hat (kenar çizgisi) stili. */
export declare interface OutlineStyle {
    /** Dış hattın gösterilip gösterilmeyeceği. */
    readonly enabled: boolean;
    /** Dış hat rengi (hex). */
    readonly color: string;
    /** Dış hat kalınlığı (piksel). */
    readonly width: number;
}

/**
 * sequential/diverging: renkler bir rampa gibi ele alinir, degerler arasi
 * dogrusal karisim (lerp) uygulanir. qualitative: renkler AYRIK kategorik
 * setlerdir (orn. Set2/Tableau10) -- karistirilirsa palette'te olmayan
 * bulanik ara tonlar cikar, bu yuzden indeks bazli (karistirmasiz) secilir.
 * Verilmezse "sequential" gibi davranilir (mevcut lerp davranisi).
 */
export declare type PaletteKind = "sequential" | "diverging" | "qualitative";

export declare function parseCapabilities(serviceType: string, doc: Document): DiscoveredItem[];

export declare function parseWcsTiffFormat(doc: Document): string | undefined;

export declare function parseWmsTiffFormat(doc: Document): string | undefined;

/** Haritada tıklanan/işaret edilen bir vektör (Entity tabanlı) feature'ın temel bilgisi. */
export declare interface PickedFeatureDetail {
    /** Tıklanan Cesium Entity'si. */
    readonly entity: Entity;
    /** Entity'nin ait olduğu katmanın id'si (bulunamazsa `null`). */
    readonly layerId: string | null;
    /** Feature'ın kimliği (varsa). */
    readonly featureId: string | null;
    /** Feature'ın öznitelik (attribute) değerleri. */
    readonly properties: Record<string, unknown>;
}

/**
 * (4b) `Map.ts` tarafindan, kendi apiKey'i verilmemis (global'e bagimli)
 * instance'lar icin kullanilir -- `configureTucbs()` sonraki bir cagriyla
 * degeri degistirdiginde bu callback tetiklenir. `TucbsMapPreview.ts`
 * (`@tucbs/components`) tarafindan da AYNI sebeple kullanilir: apiKey
 * (instance veya global) hicbir Lit property'sini DEGISTIRMEDEN sonradan
 * gecerli hale gelebilir (orn. `configureTucbs()` gec cagrilirsa) -- bu
 * durumda Lit'in kendi reaktivite sistemi (updated()/changed.has(...))
 * HABERSIZ kalir, bu registry TEK canli bildirim mekanizmasidir. Donen
 * fonksiyon kaydi KALDIRIR -- cagiran tarafin kendi destroy/deactivate
 * yasam dongusunde cagrilmali, aksi halde destroy edilmis instance'lar
 * registry'de sonsuza dek tutulup bellek sizintisina yol acar.
 *
 * @example
 * ```ts
 * import { registerApiKeyRefresh } from "@tucbs/core";
 *
 * const unregister = registerApiKeyRefresh(() => {
 *   console.log("apiKey güncellendi");
 * });
 * // ... instance destroy edilirken:
 * unregister();
 * ```
 */
export declare function registerApiKeyRefresh(fn: () => void): () => void;

/** Sunucu tarafından tanımlı bir WMS/WMTS stil seçeneği (GetStyles/GetCapabilities'ten türetilir). */
export declare interface ServiceStyleOption {
    /** Stilin sunucu tarafındaki adı (`SLD_BODY`/`STYLES` parametresine karşılık gelir). */
    readonly name: string;
    /** Stilin kullanıcıya gösterilen başlığı. */
    readonly title: string;
    /** Bu stile ait lejant görüntüsünün adresi. */
    readonly legendUrl: string;
}

/** Tek renkli (solid) katman dolgu stili. */
export declare interface SolidFillStyle {
    /** Stil modu ayırt edicisi. */
    readonly mode: "solid";
    /** Dolgu rengi (hex, ör. `"#3388ff"`). */
    readonly color: string;
    /** Dolgu opaklığı (0-1 arası). */
    readonly opacity: number;
}

/**
 * @tucbs/core'un tüm özel hatalarının taban sınıfı.
 *
 * @example
 * ```ts
 * try {
 *   map.layerManager.setVisible("olmayan-katman-id", true);
 * } catch (err) {
 *   if (err instanceof TucbsError) {
 *     console.error(err.code, err.number, err.message); // "LAYER_NOT_FOUND", "E113", ...
 *   }
 * }
 *
 * const codes = getErrorCodes();
 * console.log(codes.LAYER_NOT_FOUND);
 * // { code: "LAYER_NOT_FOUND", number: "E113", title: "Katman Bulunamadı", description: "..." }
 * ```
 */
export declare class TucbsError extends Error {
    /** Hatanın semantik kodu (bkz `getErrorCodes()`). */
    readonly code: TucbsErrorCode;
    /** Hatanın numarası (`E0xx`-`E4xx` aralıklı, append-only). */
    readonly number: string;
    /** Hatanın kullanıcıya gösterilecek kısa başlığı. */
    readonly title: string;
    constructor(code: TucbsErrorCode, message?: string, title?: string);
}

/** `@tucbs/core` tarafından fırlatılabilecek tüm hataların semantik kodu (bkz `getErrorCodes()`). */
export declare type TucbsErrorCode = "API_KEY_MISSING" | "API_KEY_INVALID" | "INTERNAL_INDEX_OUT_OF_RANGE" | "OGC_CAPABILITIES_REQUEST_FAILED" | "OGC_CAPABILITIES_EXCEPTION" | "OGC_CAPABILITIES_PARSE_FAILED" | "OGC_FEATURE_TYPE_NOT_FOUND" | "CRS_UNRESOLVED_UNSUPPORTED" | "CRS_CLAIMED_WGS84_INVALID" | "CRS_MISSING_UNSUPPORTED" | "ANALYSIS_API_KEY_MISSING" | "ANALYSIS_NETWORK_ERROR" | "ANALYSIS_REQUEST_FAILED" | "ANALYSIS_UNSUCCESSFUL" | "ANALYSIS_RESPONSE_MISSING_GEOJSON" | "LAYER_AUTHORIZED_LIST_API_KEY_MISSING" | "LAYER_GEOTIFF_EXPORT_UNSUPPORTED_TYPE" | "LAYER_GEOTIFF_EXPORT_NOT_CONFIGURED" | "LAYER_STYLE_NOT_VECTOR" | "LAYER_TYPE_UNSUPPORTED_XYZ" | "LAYER_TYPE_UNSUPPORTED_DRAWING" | "LAYER_TYPE_UNSUPPORTED_MEASURE" | "LAYER_WMS_LAYERS_EMPTY" | "LAYER_GEOTIFF_UNSUPPORTED" | "LAYER_SHP_PACKAGE_MISSING" | "LAYER_CSV_PACKAGE_MISSING" | "LAYER_CSV_LATLON_NOT_FOUND" | "LAYER_NOT_FOUND" | "LAYER_ID_ALREADY_EXISTS" | "LAYER_TYPE_MISMATCH" | "LAYER_SERVICE_OPTIONS_NOT_FOUND" | "LAYER_NOT_RASTER" | "OGC_AUTHORIZED_LAYERS_REQUEST_FAILED" | "OGC_GEOTIFF_DOWNLOAD_FAILED" | "OGC_WFS_JSON_FORMAT_UNSUPPORTED" | "OGC_WFS_GEOJSON_REQUEST_FAILED" | "OGC_WFS_REQUEST_FAILED" | "OGC_WFS_EXCEPTION" | "OGC_WFS_OL_PACKAGE_MISSING" | "OGC_WCS_REQUEST_FAILED" | "OGC_WCS_MULTIPART_IMAGE_NOT_FOUND" | "LAYER_PREVIEW_UNSUPPORTED_XYZ" | "LAYER_PREVIEW_UNSUPPORTED_DRAWING" | "LAYER_PREVIEW_UNSUPPORTED_MEASURE" | "LAYER_MANAGER_NOT_READY" | "LAYER_AUTHORIZED_ADD_MISSING_INFO" | "OGC_SERVICE_DISCOVERY_PARSE_FAILED" | "LAYER_WMTS_TILEMATRIXSET_MISSING";

/** Bir hata kodunun `getErrorCodes()` registry'sindeki tam kaydı. */
export declare interface TucbsErrorInfo {
    /** Semantik hata kodu. */
    code: TucbsErrorCode;
    /** Kısa dokümantasyon numarası (ör. `"E101"`), şartname "hata kodu" karşılığıdır. */
    number: string;
    /** Kullanıcıya gösterilebilecek kısa başlık. */
    title: string;
    /** Hatanın ne anlama geldiğini açıklayan uzun metin. */
    description: string;
}

/** `configureTucbs()` ile ayarlanan, sayfa genelinde geçerli varsayılan yapılandırma. */
export declare interface TucbsGlobalConfig {
    /** Instance-seviyesi `apiKey` verilmemiş tüm `Map`/component'lerin miras alacağı global apiKey. */
    readonly apiKey?: string;
    /** ucbp-api kökü (validate, /layers, /ogc, analiz). Örn. https://dev-ucbp-api.turksat.com.tr/ucbp-api */
    readonly apiBase?: string;
    /**
     * HGM altlık getByUrl tabanı (`…/proxyservice/proxyservice/getByUrl?url=`).
     * `apiBase` ile aynı host olmak zorunda değil (lokal: 8094 vs 8086).
     */
    readonly proxyBase?: string;
}

/**
 * GET /auth/validate + X-API-Key.
 * Key yoksa / boşsa no-op (harita key’siz açılabilir).
 * Geçersizse {@link ApiKeyValidationError} (body = backend message).
 */
export declare function validateApiKey(apiKey: string, apiBase?: string): Promise<void>;

/** `LayerManager.add("WCS", ...)` için WCS katman seçenekleri. */
export declare interface WCSLayerOptions {
    /** Katmanın benzersiz kimliği. */
    readonly id: string;
    /** Katmanın kullanıcıya gösterilen başlığı. */
    readonly title: string;
    /** WCS servisinin temel adresi. */
    readonly url: string;
    /** İstenecek coverage kimliği. */
    readonly coverageId: string;
    /** WCS protokol sürümü. */
    readonly version?: string;
    /** İstenecek görüntü formatı. */
    readonly format?: string;
    /** Katmanın coğrafi kapsama alanı. */
    readonly rectangle?: Rectangle;
    /** Servise erişim için kullanılacak yetkilendirme token'ı. */
    readonly authToken?: string;
    /** Coverage'ı tek bir tile olarak (mozaiklemeden) iste. */
    readonly useSingleTile?: boolean;
    /** Sunucunun `GetCoverage` icin desteklediği tespit edilen GeoTIFF-uyumlu
     * format ("image/geotiff" veya "image/tiff") -- TucbsServiceUpload
     * capabilities kesfinde doldurur. Yoksa bu katman icin GeoTIFF export
     * sunulmaz (bkz LayerManager.isGeoTiffExportAvailable/exportLayerAsGeoTiff). */
    readonly tiffFormat?: string;
    /**
     * Sunucudan WCS 2.0 Scaling Extension (SCALESIZE) ile en fazla bu piksel
     * boyutuna kucultulmus bir goruntu istenir. Full-disc uydu goruntuleri
     * veya ulke/kita olcegindeki coverage'lar native cozunurlukte
     * tarayicinin decode edebileceginden (ve pratikte indirebileceginden)
     * cok daha buyuk olabiliyor. Native cozunurlugu zorlamak icin
     * `Infinity` verin (SCALESIZE gonderilmez).
     * @default 2048
     */
    readonly maxSize?: number;
}

export declare function wcsRectangleFor(item: DiscoveredItem): Rectangle | undefined;

/** Kama tampon: nokta, yarıçap (metre) ve açı aralığı (kuzey 0°). */
export declare interface WedgeBufferAnalysisRequest {
    readonly geojson: object;
    readonly distanceM: number;
    readonly startAngle: number;
    readonly endAngle: number;
    readonly targetEpsg?: number;
}

/** `LayerManager.add("WFS", ...)` için WFS katman seçenekleri. */
export declare interface WFSLayerOptions {
    /** Katmanın benzersiz kimliği. */
    readonly id: string;
    /** Katmanın kullanıcıya gösterilen başlığı. */
    readonly title: string;
    /** WFS servisinin temel adresi. */
    readonly url: string;
    /** İstenecek feature type adı (`typeName`/`typeNames` parametresi). */
    readonly typeName: string;
    /** WFS protokol sürümü. */
    readonly version?: "1.0.0" | "1.1.0" | "2.0.0";
    /** İstenecek çıktı formatı (verilmezse sunucunun GetCapabilities'te ilan ettiği bir GeoJSON formatı denenir, yoksa GML'e düşülür). */
    readonly outputFormat?: string;
    /** İstenecek koordinat referans sistemi. */
    readonly srsName?: string;
    /** Tek istekte alınacak azami feature sayısı. @default 5000 */
    readonly maxFeatures?: number;
    /** Servise erişim için kullanılacak yetkilendirme token'ı. */
    readonly authToken?: string;
    /** Geometrilerin yer yüzeyine (terrain) yapıştırılıp yapıştırılmayacağı. */
    readonly clampToGround?: boolean;
}

/** `LayerManager.add("WMS", ...)` için WMS katman seçenekleri. */
export declare interface WMSLayerOptions {
    /** Katmanın benzersiz kimliği. */
    readonly id: string;
    /** Katmanın kullanıcıya gösterilen başlığı. */
    readonly title: string;
    /** WMS servisinin (GetCapabilities/GetMap) temel adresi. */
    readonly url: string;
    /** İstenecek WMS katman adı/adları (`LAYERS` parametresi). */
    readonly layers: string;
    /** WMS protokol sürümü. @default "1.3.0" */
    readonly version?: string;
    /** GetMap isteğine eklenecek ek query parametreleri. */
    readonly parameters?: Record<string, string>;
    /** Katmanın coğrafi kapsama alanı (verilmezse tüm dünya varsayılır). */
    readonly rectangle?: Rectangle;
    /** Servise erişim için kullanılacak yetkilendirme token'ı. */
    readonly authToken?: string;
    /** Bu katmanın gösterileceği en düşük zoom seviyesi. */
    readonly minimumLevel?: number;
    /** Bu katmanın gösterileceği en yüksek zoom seviyesi. */
    readonly maximumLevel?: number;
    /** GetMap isteklerinde istenecek tile genişliği (piksel). */
    readonly tileWidth?: number;
    /** GetMap isteklerinde istenecek tile yüksekliği (piksel). */
    readonly tileHeight?: number;
    /** Sunucunun `GetMap` icin desteklediği tespit edilen GeoTIFF-uyumlu format
     * ("image/geotiff" veya "image/tiff") -- TucbsServiceUpload capabilities
     * kesfinde doldurur. Yoksa bu katman icin GeoTIFF export sunulmaz (bkz
     * LayerManager.isGeoTiffExportAvailable/exportLayerAsGeoTiff). */
    readonly tiffFormat?: string;
    /** Katmanin WGS84 (EPSG:4326) cografi kapsama alani -- GeoTIFF export
     * icin BBOX/WIDTH-HEIGHT hesaplamasinda kullanilir (capabilities'teki
     * EX_GeographicBoundingBox/LatLonBoundingBox'tan turetilir). */
    readonly geographicBoundingBox?: {
        readonly west: number;
        readonly south: number;
        readonly east: number;
        readonly north: number;
    };
}

/** `LayerManager.add("WMTS", ...)` için WMTS katman seçenekleri. */
export declare interface WMTSLayerOptions {
    /** Katmanın benzersiz kimliği. */
    readonly id: string;
    /** Katmanın kullanıcıya gösterilen başlığı. */
    readonly title: string;
    /** WMTS servisinin temel adresi. */
    readonly url: string;
    /** İstenecek WMTS katman adı. */
    readonly layer: string;
    /** Sunucu tarafından tanımlı stil adı. */
    readonly style?: string;
    /** Kullanılacak TileMatrixSet adı. */
    readonly tileMatrixSetID: string;
    /** Tile görüntü formatı (MIME tipi, ör. `"image/png"`). */
    readonly format?: string;
    /** İstenecek tile genişliği (piksel). */
    readonly tileWidth?: number;
    /** İstenecek tile yüksekliği (piksel). */
    readonly tileHeight?: number;
    /** Bu katmanın gösterileceği en düşük zoom seviyesi. */
    readonly minimumLevel?: number;
    /** Bu katmanın gösterileceği en yüksek zoom seviyesi. */
    readonly maximumLevel?: number;
    /** Katmanın coğrafi kapsama alanı. */
    readonly rectangle?: Rectangle;
    /** Servise erişim için kullanılacak yetkilendirme token'ı. */
    readonly authToken?: string;
}

export { }
