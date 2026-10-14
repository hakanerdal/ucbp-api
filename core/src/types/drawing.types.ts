import type { Cartesian3, Entity } from "cesium";
import type { Geometry } from "geojson";

/** Çizim/ölçüm aracının şekil türü. */
export type DrawTool =
  | "point"
  | "polyline"
  | "polygon"
  | "rectangle"
  | "circle"
  | "freehand";

/** `DrawingManager` ile tamamlanmış bir çizim/ölçüm şeklinin tam kaydı. */
export interface DrawnShape {
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
