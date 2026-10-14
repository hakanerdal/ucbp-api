export type Pair = [number, number];
export type Ring = Pair[];
export type Polygon = Ring[];
export type MultiPolygon = Polygon[];

type Geom = Polygon | MultiPolygon;

declare function union(geom: Geom, ...geoms: Geom[]): MultiPolygon;

declare const polygonClipping: {
  union: typeof union;
};

export default polygonClipping;
