import { SelectedFeature } from './analysisMapBind.js';
/** Dikdörtgenin köşe kimliği: Kuzey-batı, Kuzey-doğu, Güney-doğu, Güney-batı. */
export type CornerId = "KB" | "KD" | "GD" | "GB";
/** Köşelerin formdaki sırası. */
export declare const CORNER_IDS: readonly CornerId[];
/** Boylam/enlem (derece) sınırlarıyla eksenlere hizalı kutu. */
export interface Bbox {
    /** Batı sınırı (boylam). */
    west: number;
    /** Güney sınırı (enlem). */
    south: number;
    /** Doğu sınırı (boylam). */
    east: number;
    /** Kuzey sınırı (enlem). */
    north: number;
}
/** Köşe kutusundaki (form alanı) metin değerleri. */
export interface CoordPair {
    /** Boylam metni. */
    lon: string;
    /** Enlem metni. */
    lat: string;
}
/** Dört köşesi boş form değerleri. */
export declare function emptyCoords(): Record<CornerId, CoordPair>;
/** Dört köşeden batı-güney-doğu-kuzey kutusunu çıkarır. */
export declare function boxFromCoordinates(coordinates: readonly [number, number][]): Bbox | null;
/** Tek köşeyi kaydırır; çöken kutu reddedilir. */
export declare function boxFromCorner(box: Bbox, id: CornerId, lon: number, lat: number): Bbox | null;
/** Sınırları sıralar (ters köşe sürüklemesi kutuyu çevirir); eni ya da boyu ~0 olan kutu `null`. */
export declare function normalizeBox(west: number, south: number, east: number, north: number): Bbox | null;
/** Kutunun köşelerini form değerlerine (6 ondalık) çevirir. */
export declare function coordsFromBox(box: Bbox): Record<CornerId, CoordPair>;
/** Kutunun dört köşe noktası. */
export declare function cornerPoints(box: Bbox): Record<CornerId, {
    lon: number;
    lat: number;
}>;
/** Cesium `Cartesian3.fromDegreesArray` için düz boylam/enlem dizisi (GB, GD, KD, KB). */
export declare function flatRing(box: Bbox): number[];
/** Kırpma isteğinin maske poligonu; halka kapanır. */
export declare function maskFromBox(box: Bbox): SelectedFeature;
/** En ve boyu km cinsinden yazar; enlem kosinüsü boylamı kısaltır. */
export declare function formatSize(box: Bbox): string;
//# sourceMappingURL=clipBox.d.ts.map