import {
  Cartographic,
  JulianDate,
  Math as CesiumMath,
  type Cartesian3,
  type Entity,
} from "cesium";
import type { Feature, Geometry, Position } from "geojson";

function cartesianToLonLat(cartesian: Cartesian3): Position {
  const c = Cartographic.fromCartesian(cartesian);
  return [CesiumMath.toDegrees(c.longitude), CesiumMath.toDegrees(c.latitude)];
}

function closeRing(ring: Position[]): Position[] {
  if (ring.length === 0) return ring;
  const first = ring[0]!;
  const last = ring[ring.length - 1]!;
  if (first[0] === last[0] && first[1] === last[1]) return ring;
  return [...ring, first];
}

/**
 * Cesium Entity → GeoJSON Feature (nokta / çizgi / poligon).
 * Analiz paneli seçiminde kullanılır.
 */
export function entityToGeoJSON(
  entity: Entity,
  time: JulianDate = JulianDate.now(),
): Feature | null {
  const rawProps =
    (entity.properties?.getValue(time) as Record<string, unknown> | undefined) ??
    {};
  const properties: Record<string, unknown> = { ...rawProps };
  delete properties.layerId;
  delete properties.featureId;

  let geometry: Geometry | null = null;

  if (entity.polygon?.hierarchy) {
    const hierarchy = entity.polygon.hierarchy.getValue(time) as
      | { positions?: Cartesian3[] }
      | undefined;
    const positions = hierarchy?.positions;
    if (positions && positions.length >= 3) {
      const ring = closeRing(positions.map(cartesianToLonLat));
      geometry = { type: "Polygon", coordinates: [ring] };
    }
  } else if (entity.polyline?.positions) {
    const positions = entity.polyline.positions.getValue(time) as
      | Cartesian3[]
      | undefined;
    if (positions && positions.length >= 2) {
      geometry = {
        type: "LineString",
        coordinates: positions.map(cartesianToLonLat),
      };
    }
  } else if (entity.position) {
    const pos = entity.position.getValue(time) as Cartesian3 | undefined;
    if (pos) {
      geometry = { type: "Point", coordinates: cartesianToLonLat(pos) };
    }
  }

  if (!geometry) return null;

  return {
    type: "Feature",
    id: entity.id,
    properties,
    geometry,
  };
}

/** Bir GeoJSON `Feature`'ı için kısa, insan-okunur bir etiket üretir (ör. `"Point 42"`). */
export function featureLabel(feature: Feature): string {
  const geomType = feature.geometry?.type ?? "Feature";
  const id = feature.id != null ? String(feature.id) : "";
  return id ? `${geomType} ${id}` : geomType;
}
