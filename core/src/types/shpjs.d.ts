declare module "shpjs" {
  import type { FeatureCollection } from "geojson";

  type ShpFn = (
    source: string | ArrayBuffer
  ) => Promise<FeatureCollection | FeatureCollection[]>;

  const shp: ShpFn;
  export default shp;
  export const getShapefile: ShpFn;
}
