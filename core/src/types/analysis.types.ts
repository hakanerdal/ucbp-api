/** `AnalysisManager`'ın backend'e gönderdiği tüm analiz isteklerinin ortak zarfı. */

// tucbscommon BaseRequestDto / BaseResponseDto ile uyumlu TS sözleşmesi
export interface BaseRequestDto<T> {
  /** İstemciyi tanımlayan kimlik (`AnalysisManagerOptions.clientId`). */
  readonly clientId: string;
  /** İsteğin asıl gövdesi (ör. `BufferAnalysisRequest`). */
  readonly object: T;
}

/** `AnalysisManager`'ın backend'den aldığı tüm analiz yanıtlarının ortak zarfı. */
export interface BaseResponseDto<T> {
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

/** `AnalysisManager.buffer()` için tampon (buffer) analizi isteği. */
export interface BufferAnalysisRequest {
  /** Tamponu alınacak geometri (GeoJSON). */
  readonly geojson: object;
  /** Tampon mesafesi (metre). */
  readonly distanceM: number;
  /** Hesaplamanın yapılacağı metrik EPSG kodu (verilmezse backend uygun bir UTM dilimi seçer). */
  readonly targetEpsg?: number;
}

/** `AnalysisManager.buffer()`'ın sonucu. */
export interface BufferAnalysisResult {
  /** Üretilen tampon geometrisi (GeoJSON). */
  readonly geojson: object;
  /** Kullanılan tampon mesafesi (metre). */
  readonly distanceM?: number;
  /** Hesaplamada kullanılan metrik EPSG kodu. */
  readonly metricEpsg?: number;
}

/** `AnalysisManager.intersection()` için kesişim analizi isteği. */
export interface IntersectionAnalysisRequest {
  /** Birinci geometri (GeoJSON). */
  readonly geojsonA: object;
  /** İkinci geometri (GeoJSON). */
  readonly geojsonB: object;
}

/** `AnalysisManager.intersection()`'ın sonucu. */
export interface IntersectionAnalysisResult {
  /** Kesişim geometrisi (GeoJSON). */
  readonly geojson: object;
}

/** Sınır, kırp, fark, çıkarma, birleştir ve kama tampon yanıtı. */
export interface GeoJsonAnalysisResult {
  readonly geojson: object;
}

/** Sınır: bbox veya dışbükey zarf; çıktı poligon veya çizgi. */
export interface BoundaryAnalysisRequest {
  readonly geojson: object;
  readonly boundaryType: "bbox" | "convex";
  readonly outputGeometry: "polygon" | "line";
}

/** Kama tampon: nokta, yarıçap (metre) ve açı aralığı (kuzey 0°). */
export interface WedgeBufferAnalysisRequest {
  readonly geojson: object;
  readonly distanceM: number;
  readonly startAngle: number;
  readonly endAngle: number;
  readonly targetEpsg?: number;
}

/** `new AnalysisManager(...)` constructor'ına verilen seçenekler. */
export interface AnalysisManagerOptions {
  /** Analiz isteklerinde kullanılacak apiKey. */
  readonly apiKey: string;
  /** Varsayılan: rastgele UUID */
  readonly clientId?: string;
}
