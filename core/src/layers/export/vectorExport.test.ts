import { describe, expect, it } from "vitest";
import type { FeatureCollection } from "geojson";
import { featureCollectionToKml, featureCollectionToShapefileZip } from "./vectorExport.js";

const polygon: FeatureCollection = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { name: "tampon" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [32, 39],
            [33, 39],
            [33, 40],
            [32, 40],
            [32, 39],
          ],
        ],
      },
    },
  ],
};

describe("featureCollectionToKml", () => {
  it("poligon koordinatını KML Placemark içine yazar", () => {
    const kml = featureCollectionToKml(polygon);
    expect(kml).toContain("<kml");
    expect(kml).toContain("<name>tampon</name>");
    expect(kml).toContain("32,39,0");
  });
});

describe("featureCollectionToShapefileZip", () => {
  it("zip içinde shp, shx ve dbf taşır", () => {
    const zip = featureCollectionToShapefileZip(polygon);
    const text = new TextDecoder().decode(zip);
    expect(text).toContain("export.shp");
    expect(text).toContain("export.shx");
    expect(text).toContain("export.dbf");
    expect(zip[0]).toBe(0x50);
    expect(zip[1]).toBe(0x4b);
  });
});
