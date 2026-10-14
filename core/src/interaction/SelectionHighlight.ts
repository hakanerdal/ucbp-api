import {
  Color,
  ColorMaterialProperty,
  ConstantProperty,
  GeoJsonDataSource,
  HeightReference,
  JulianDate,
  PointGraphics,
  type Entity,
  type PolygonHierarchy,
  type Viewer,
} from "cesium";

const FLAG = "__tucbsSelectionHighlight";

export type HighlightFeature = {
  readonly type: "Feature";
  readonly geometry: object;
  readonly properties?: object | null;
};

/** Vurgu katmanı tıklanınca alttaki asıl obje seçilsin diye. */
export function isSelectionHighlightEntity(entity: Entity): boolean {
  return (entity as Entity & { [FLAG]?: boolean })[FLAG] === true;
}

/**
 * Seçili geometriyi katman listesine yazmadan kırmızı gösterir.
 * Boş dizi vurguyu kaldırır.
 */
export class SelectionHighlight {
  private source: GeoJsonDataSource | null = null;
  private generation = 0;

  constructor(private readonly viewer: Viewer) {}

  show(features: readonly HighlightFeature[]): void {
    const generation = ++this.generation;
    if (features.length === 0) {
      this.removeSource();
      return;
    }
    void this.load(features, generation);
  }

  clear(): void {
    this.generation++;
    this.removeSource();
  }

  private async load(features: readonly HighlightFeature[], generation: number): Promise<void> {
    const fill = Color.fromCssColorString("#dc2626").withAlpha(0.25);
    const stroke = Color.fromCssColorString("#dc2626");
    const data = { type: "FeatureCollection" as const, features: [...features] };
    const source = await GeoJsonDataSource.load(data as object, {
      clampToGround: true,
      fill,
      stroke,
      strokeWidth: 3,
      markerColor: stroke,
      markerSize: 16,
    });
    if (generation !== this.generation) return;
    this.removeSource();
    this.paint(source, fill, stroke);
    this.viewer.dataSources.add(source);
    this.source = source;
  }

  private paint(source: GeoJsonDataSource, fill: Color, stroke: Color): void {
    for (const entity of [...source.entities.values]) {
      this.tag(entity);
      if (entity.billboard) {
        entity.billboard = undefined;
        entity.point = new PointGraphics({
          pixelSize: 16,
          color: stroke,
          outlineColor: Color.WHITE,
          outlineWidth: 2,
          heightReference: HeightReference.CLAMP_TO_GROUND,
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
        });
      }
      const polygon = entity.polygon;
      if (!polygon) continue;
      polygon.material = new ColorMaterialProperty(fill);
      polygon.outline = new ConstantProperty(false);
      const hierarchy = polygon.hierarchy?.getValue(JulianDate.now());
      this.addRings(source, hierarchy, stroke);
    }
  }

  private addRings(
    source: GeoJsonDataSource,
    hierarchy: PolygonHierarchy | undefined,
    stroke: Color,
  ): void {
    if (!hierarchy?.positions?.length) return;
    this.addRing(source, hierarchy.positions, stroke);
    for (const hole of hierarchy.holes ?? []) this.addRings(source, hole, stroke);
  }

  private addRing(
    source: GeoJsonDataSource,
    positions: PolygonHierarchy["positions"],
    stroke: Color,
  ): void {
    const line = source.entities.add({
      polyline: {
        positions,
        width: 3,
        material: new ColorMaterialProperty(stroke),
        clampToGround: true,
      },
    });
    this.tag(line);
  }

  private tag(entity: Entity): void {
    (entity as Entity & { [FLAG]?: boolean })[FLAG] = true;
  }

  private removeSource(): void {
    if (!this.source) return;
    this.viewer.dataSources.remove(this.source, true);
    this.source = null;
  }
}
