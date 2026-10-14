/** `calculateScaleRatio()`'nun sonucu. */
export interface ScaleRatioResult {
  /** Kullanıcıya gösterilecek "1/N" formatlı etiket. */
  readonly label: string;
  /** Ölçek oranının paydası (`N`). */
  readonly denominator: number;
}

/**
 * Kartografik "1/N" olcek orani hesabi. `groundMetersPerPixel` (harita
 * uzerindeki gercek yer mesafesi / piksel) ve `paperMetersPerPixel` (kagit
 * uzerindeki fiziksel mesafe / piksel) verilir -- olcum sorumlulugu
 * `@tucbs/core`'daki `Map.measureGroundMetersPerPixel()`'de kalir (bu dosya
 * SADECE saf matematik/formatlama icerir, Cesium'a bagimli DEGILDIR).
 *
 * FAZ 1.6: Faz 1.5'teki "guzel" ({1,2,5}x10^n) yuvarlama KALDIRILDI --
 * kullanici gercek/tam degeri istedi (yuvarlama yapilmasin). En yakin tam
 * sayiya yuvarlaniyor -- canli haritadaki `TucbsInfoBar._formatScale()` ile
 * AYNI yaklasim (o da sadece `Math.round` kullanir, "guzel" oran ARAMAZ).
 */
export function calculateScaleRatio(groundMetersPerPixel: number, paperMetersPerPixel: number): ScaleRatioResult {
  const denominator = Math.round(groundMetersPerPixel / paperMetersPerPixel);
  return { label: `1/${denominator}`, denominator };
}
