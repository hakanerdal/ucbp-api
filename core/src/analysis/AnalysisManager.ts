import type {
  AnalysisManagerOptions,
  BaseRequestDto,
  BaseResponseDto,
  BoundaryAnalysisRequest,
  BufferAnalysisRequest,
  BufferAnalysisResult,
  GeoJsonAnalysisResult,
  IntersectionAnalysisRequest,
  IntersectionAnalysisResult,
  WedgeBufferAnalysisRequest,
} from "../types/analysis.types.js";
import { getUcbpApiBase } from "../shared/apiDefaults.js";
import { AnalysisRequestError } from "../shared/TucbsError.js";

function trimSlash(url: string): string {
  return url.replace(/\/+$/, "");
}

function newClientId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return "00000000-0000-0000-0000-000000000001";
}

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
export class AnalysisManager {
  #apiKey: string;
  private clientId: string;

  /** @param options - Başlangıç `apiKey`/`clientId` değerleri. */
  constructor(options: AnalysisManagerOptions) {
    this.#apiKey = options.apiKey ?? "";
    this.clientId = options.clientId ?? newClientId();
  }

  /** `apiKey`/`clientId`'yi günceller (verilmeyen alanlar değişmeden kalır). */
  configure(options: Partial<AnalysisManagerOptions>): void {
    if (options.apiKey !== undefined) this.#apiKey = options.apiKey;
    if (options.clientId !== undefined) this.clientId = options.clientId;
  }

  /** `apiKey` ve backend adresinin (`getUcbpApiBase()`) ikisinin de dolu olup olmadığı. */
  get configured(): boolean {
    return Boolean(getUcbpApiBase() && this.#apiKey);
  }

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
  async buffer(request: BufferAnalysisRequest): Promise<BufferAnalysisResult> {
    return this.#post<BufferAnalysisRequest, BufferAnalysisResult>("/vector/buffer", request);
  }

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
  async intersection(
    request: IntersectionAnalysisRequest,
  ): Promise<IntersectionAnalysisResult> {
    return this.#post<IntersectionAnalysisRequest, IntersectionAnalysisResult>("/vector/intersection", request);
  }

  /** Sınırlayıcı kutu veya dışbükey zarf. */
  async boundary(request: BoundaryAnalysisRequest): Promise<GeoJsonAnalysisResult> {
    return this.#post<BoundaryAnalysisRequest, GeoJsonAnalysisResult>("/vector/boundary", request);
  }

  /** Kaynağı ikinci geometriyle kırpar. */
  async clip(request: IntersectionAnalysisRequest): Promise<GeoJsonAnalysisResult> {
    return this.#post<IntersectionAnalysisRequest, GeoJsonAnalysisResult>("/vector/clip", request);
  }

  /** İkinci poligonu birinciden çıkarır. */
  async difference(request: IntersectionAnalysisRequest): Promise<GeoJsonAnalysisResult> {
    return this.#post<IntersectionAnalysisRequest, GeoJsonAnalysisResult>("/vector/difference", request);
  }

  /** Örtüşen parçayı kaynaktan siler. */
  async subtract(request: IntersectionAnalysisRequest): Promise<GeoJsonAnalysisResult> {
    return this.#post<IntersectionAnalysisRequest, GeoJsonAnalysisResult>("/vector/subtract", request);
  }

  /** İki poligonu tek alana eritir. */
  async union(request: IntersectionAnalysisRequest): Promise<GeoJsonAnalysisResult> {
    return this.#post<IntersectionAnalysisRequest, GeoJsonAnalysisResult>("/vector/union", request);
  }

  /** Nokta etrafında açı dilimi. */
  async wedgeBuffer(request: WedgeBufferAnalysisRequest): Promise<GeoJsonAnalysisResult> {
    return this.#post<WedgeBufferAnalysisRequest, GeoJsonAnalysisResult>("/vector/wedge-buffer", request);
  }

  // buffer() ve intersection() BIREBIR AYNI istek/hata akisini paylasir:
  // apiKey kontrolu -> BaseRequestDto govdesi -> X-API-Key ile POST -> ag
  // hatasi / HTTP hatasi (mesaj veya message yedegi) / isSuccess|success
  // false / geojson eksik ayrimi. Gercek private (#) -- .d.ts'e ve TypeDoc'a
  // yansimaz, public yuzey degismez.
  async #post<TRequest, TResult extends { readonly geojson: object }>(
    path: string,
    request: TRequest,
  ): Promise<TResult> {
    if (!this.#apiKey) {
      throw new AnalysisRequestError("ANALYSIS_API_KEY_MISSING", "apiKey tanımlı değil (tucbs-map apiKey).");
    }

    const body: BaseRequestDto<TRequest> = {
      clientId: this.clientId,
      object: request,
    };

    const url = `${trimSlash(getUcbpApiBase())}${path}`;
    let response: Response;
    try {
      response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": this.#apiKey,
        },
        body: JSON.stringify(body),
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      throw new AnalysisRequestError("ANALYSIS_NETWORK_ERROR", `Ağ hatası: ${msg}`);
    }

    const data = (await response.json().catch(() => null)) as BaseResponseDto<TResult> | null;

    if (!response.ok) {
      const msg =
        data?.mesaj ||
        data?.message ||
        `İstek başarısız (HTTP ${response.status})`;
      throw new AnalysisRequestError("ANALYSIS_REQUEST_FAILED", msg);
    }

    if (data?.isSuccess === false || data?.success === false) {
      throw new AnalysisRequestError("ANALYSIS_UNSUCCESSFUL", data.mesaj || data.message || "Analiz başarısız.");
    }

    const result = data?.object;
    if (!result?.geojson) {
      throw new AnalysisRequestError("ANALYSIS_RESPONSE_MISSING_GEOJSON", "Yanıtta geojson yok.");
    }

    return result;
  }
}
