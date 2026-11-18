import { Cartesian3 } from 'cesium';
/**
 * Poligonun alanını (m²) Lambert silindirik eşit-alan izdüşümüyle hesaplar;
 * sonuç başlangıç köşesinden ve dolaşma yönünden bağımsızdır.
 * @param coordinates - `[boylam, enlem]` köşeleri (halka kapatılmamış).
 * @returns Alan (m²); 3'ten az köşede `0`.
 */
export declare function polygonAreaMeters(coordinates: readonly [number, number][]): number;
/**
 * `[boylam, enlem]` koordinatını elipsoit yüzeyindeki (yükseklik 0) Cartesian3'e çevirir.
 * @param coordinate - `[boylam, enlem]` (derece).
 * @returns Dünya merkezli Cartesian3.
 */
export declare function toCartesian(coordinate: readonly [number, number]): Cartesian3;
/**
 * Köşelerin Cartesian3 ağırlık merkezini döner (alan etiketinin konumu).
 * @param coordinates - `[boylam, enlem]` köşeleri.
 * @returns Köşelerin ortalaması; köşe yoksa orijin.
 */
export declare function centroidOf(coordinates: readonly (readonly [number, number])[]): Cartesian3;
/**
 * Köşeler arası düz (kiriş) mesafelerin toplamını (m) döner; 3+ köşede halka kapatılır.
 * @param coordinates - `[boylam, enlem]` köşeleri.
 * @returns Çevre/uzunluk (m); 2'den az köşede `0`.
 */
export declare function perimeterMeters(coordinates: readonly (readonly [number, number])[]): number;
//# sourceMappingURL=measureGeometry.d.ts.map