import type { Feature, FeatureCollection, Geometry, Position } from "geojson";

/** GeoJSON FeatureCollection'dan KML metni. Analiz sonucu tarayıcıda dosya olarak insin diye. */
export function featureCollectionToKml(geojson: FeatureCollection): string {
  const placemarks = geojson.features.map((feature, index) => featureToKml(feature, index)).join("");
  return `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2"><Document>${placemarks}</Document></kml>`;
}

/** GeoJSON FeatureCollection'dan shapefile zip (shp+shx+dbf). Analiz sonucu GIS'te açılsın diye. */
export function featureCollectionToShapefileZip(geojson: FeatureCollection): Uint8Array {
  const records = collectShpRecords(geojson);
  const shp = writeShp(records);
  const shx = writeShx(records);
  const dbf = writeDbf(records.map((record) => record.name));
  return zipStore([
    { name: "export.shp", data: shp },
    { name: "export.shx", data: shx },
    { name: "export.dbf", data: dbf },
  ]);
}

function featureToKml(feature: Feature, index: number): string {
  const name = xmlEscape(featureName(feature, index));
  const body = geometryToKml(feature.geometry);
  if (!body) return "";
  return `<Placemark><name>${name}</name>${body}</Placemark>`;
}

function geometryToKml(geometry: Geometry | null): string {
  if (!geometry) return "";
  switch (geometry.type) {
    case "Point":
      return `<Point><coordinates>${coord(geometry.coordinates)}</coordinates></Point>`;
    case "MultiPoint":
      return `<MultiGeometry>${geometry.coordinates
        .map((position) => `<Point><coordinates>${coord(position)}</coordinates></Point>`)
        .join("")}</MultiGeometry>`;
    case "LineString":
      return `<LineString><coordinates>${line(geometry.coordinates)}</coordinates></LineString>`;
    case "MultiLineString":
      return `<MultiGeometry>${geometry.coordinates
        .map((part) => `<LineString><coordinates>${line(part)}</coordinates></LineString>`)
        .join("")}</MultiGeometry>`;
    case "Polygon":
      return polygonKml(geometry.coordinates);
    case "MultiPolygon":
      return `<MultiGeometry>${geometry.coordinates.map((polygon) => polygonKml(polygon)).join("")}</MultiGeometry>`;
    case "GeometryCollection":
      return `<MultiGeometry>${geometry.geometries.map((child) => geometryToKml(child)).join("")}</MultiGeometry>`;
    default:
      return "";
  }
}

function polygonKml(rings: Position[][]): string {
  const [outer, ...holes] = rings;
  if (!outer) return "";
  const holeXml = holes
    .map((ring) => `<innerBoundaryIs><LinearRing><coordinates>${line(ring)}</coordinates></LinearRing></innerBoundaryIs>`)
    .join("");
  return `<Polygon><outerBoundaryIs><LinearRing><coordinates>${line(outer)}</coordinates></LinearRing></outerBoundaryIs>${holeXml}</Polygon>`;
}

function coord(position: Position): string {
  return `${position[0]},${position[1]},0`;
}

function line(positions: Position[]): string {
  return positions.map(coord).join(" ");
}

function xmlEscape(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

type ShpKind = 1 | 3 | 5;

interface ShpRecord {
  kind: ShpKind;
  name: string;
  rings: Position[][];
  bbox: [number, number, number, number];
}

/** Shapefile tek tip tutar. İlk geometri kazanır; nokta ile poligon aynı dosyada duramaz. */
function collectShpRecords(geojson: FeatureCollection): ShpRecord[] {
  const kind = firstKind(geojson);
  if (!kind) return [];
  const records: ShpRecord[] = [];
  geojson.features.forEach((feature, index) => {
    for (const rings of ringsForKind(feature.geometry, kind)) {
      const closed = rings.map(closeRing);
      const oriented = kind === 5 ? orientPolygon(closed) : closed;
      records.push({
        kind,
        name: featureName(feature, index),
        rings: oriented,
        bbox: bboxOf(oriented),
      });
    }
  });
  return records;
}

function firstKind(geojson: FeatureCollection): ShpKind | null {
  for (const feature of geojson.features) {
    const kind = kindOf(feature.geometry);
    if (kind) return kind;
  }
  return null;
}

function kindOf(geometry: Geometry | null): ShpKind | null {
  if (!geometry) return null;
  switch (geometry.type) {
    case "Point":
    case "MultiPoint":
      return 1;
    case "LineString":
    case "MultiLineString":
      return 3;
    case "Polygon":
    case "MultiPolygon":
      return 5;
    case "GeometryCollection":
      for (const child of geometry.geometries) {
        const kind = kindOf(child);
        if (kind) return kind;
      }
      return null;
    default:
      return null;
  }
}

function ringsForKind(geometry: Geometry | null, kind: ShpKind): Position[][][] {
  if (!geometry || kindOf(geometry) !== kind) {
    if (geometry?.type === "GeometryCollection") {
      return geometry.geometries.flatMap((child) => ringsForKind(child, kind));
    }
    return [];
  }
  switch (geometry.type) {
    case "Point":
      return [[[geometry.coordinates]]];
    case "MultiPoint":
      return geometry.coordinates.map((position) => [[position]]);
    case "LineString":
      return [[geometry.coordinates]];
    case "MultiLineString":
      return [geometry.coordinates];
    case "Polygon":
      return [geometry.coordinates];
    case "MultiPolygon":
      return geometry.coordinates;
    default:
      return [];
  }
}

function closeRing(ring: Position[]): Position[] {
  const first = ring[0];
  const last = ring[ring.length - 1];
  if (!first || !last) return ring;
  if (first[0] === last[0] && first[1] === last[1]) return ring;
  return [...ring, first];
}

function orientPolygon(rings: Position[][]): Position[][] {
  return rings.map((ring, index) => {
    const area = signedArea(ring);
    const outer = index === 0;
    const clockwise = area < 0;
    if (outer === clockwise) return ring;
    return [...ring].reverse();
  });
}

function signedArea(ring: Position[]): number {
  let sum = 0;
  for (let i = 0; i < ring.length - 1; i++) {
    const current = ring[i];
    const next = ring[i + 1];
    const x1 = current?.[0];
    const y1 = current?.[1];
    const x2 = next?.[0];
    const y2 = next?.[1];
    if (x1 === undefined || y1 === undefined || x2 === undefined || y2 === undefined) continue;
    sum += x1 * y2 - x2 * y1;
  }
  return sum / 2;
}

function bboxOf(rings: Position[][]): [number, number, number, number] {
  let xmin = Infinity;
  let ymin = Infinity;
  let xmax = -Infinity;
  let ymax = -Infinity;
  for (const ring of rings) {
    for (const position of ring) {
      const [x, y] = xy(position);
      xmin = Math.min(xmin, x);
      ymin = Math.min(ymin, y);
      xmax = Math.max(xmax, x);
      ymax = Math.max(ymax, y);
    }
  }
  if (!Number.isFinite(xmin)) return [0, 0, 0, 0];
  return [xmin, ymin, xmax, ymax];
}

function featureName(feature: Feature, index: number): string {
  const props = feature.properties;
  const named = props && typeof props.name === "string" ? props.name : "";
  return named || `feature-${index + 1}`;
}

function writeShp(records: ShpRecord[]): Uint8Array {
  const bodies = records.map(recordBody);
  const contentBytes = bodies.reduce((sum, body) => sum + 8 + body.length, 0);
  const file = new Uint8Array(100 + contentBytes);
  const view = new DataView(file.buffer);
  writeHeader(view, file.length, records);
  let offset = 100;
  bodies.forEach((body, index) => {
    view.setInt32(offset, index + 1, false);
    view.setInt32(offset + 4, body.length / 2, false);
    file.set(body, offset + 8);
    offset += 8 + body.length;
  });
  return file;
}

function writeShx(records: ShpRecord[]): Uint8Array {
  const file = new Uint8Array(100 + records.length * 8);
  const view = new DataView(file.buffer);
  writeHeader(view, file.length, records);
  let wordOffset = 50;
  records.forEach((record, index) => {
    const bodyWords = recordBody(record).length / 2;
    view.setInt32(100 + index * 8, wordOffset, false);
    view.setInt32(100 + index * 8 + 4, bodyWords, false);
    wordOffset += 4 + bodyWords;
  });
  return file;
}

function writeHeader(view: DataView, byteLength: number, records: ShpRecord[]): void {
  view.setInt32(0, 9994, false);
  view.setInt32(24, byteLength / 2, false);
  view.setInt32(28, 1000, true);
  view.setInt32(32, records[0]?.kind ?? 5, true);
  const bbox = unionBbox(records);
  view.setFloat64(36, bbox[0], true);
  view.setFloat64(44, bbox[1], true);
  view.setFloat64(52, bbox[2], true);
  view.setFloat64(60, bbox[3], true);
}

function unionBbox(records: ShpRecord[]): [number, number, number, number] {
  if (records.length === 0) return [0, 0, 0, 0];
  let xmin = Infinity;
  let ymin = Infinity;
  let xmax = -Infinity;
  let ymax = -Infinity;
  for (const record of records) {
    xmin = Math.min(xmin, record.bbox[0]);
    ymin = Math.min(ymin, record.bbox[1]);
    xmax = Math.max(xmax, record.bbox[2]);
    ymax = Math.max(ymax, record.bbox[3]);
  }
  return [xmin, ymin, xmax, ymax];
}

function xy(position: Position): [number, number] {
  return [position[0] ?? 0, position[1] ?? 0];
}

function recordBody(record: ShpRecord): Uint8Array {
  if (record.kind === 1) {
    const body = new Uint8Array(20);
    const view = new DataView(body.buffer);
    view.setInt32(0, 1, true);
    const [x, y] = xy(record.rings[0]?.[0] ?? [0, 0]);
    view.setFloat64(4, x, true);
    view.setFloat64(12, y, true);
    return body;
  }
  const pointCount = record.rings.reduce((sum, ring) => sum + ring.length, 0);
  const body = new Uint8Array(44 + record.rings.length * 4 + pointCount * 16);
  const view = new DataView(body.buffer);
  view.setInt32(0, record.kind, true);
  view.setFloat64(4, record.bbox[0], true);
  view.setFloat64(12, record.bbox[1], true);
  view.setFloat64(20, record.bbox[2], true);
  view.setFloat64(28, record.bbox[3], true);
  view.setInt32(36, record.rings.length, true);
  view.setInt32(40, pointCount, true);
  let partIndex = 0;
  record.rings.forEach((ring, index) => {
    view.setInt32(44 + index * 4, partIndex, true);
    partIndex += ring.length;
  });
  let pointOffset = 44 + record.rings.length * 4;
  for (const ring of record.rings) {
    for (const position of ring) {
      const [x, y] = xy(position);
      view.setFloat64(pointOffset, x, true);
      view.setFloat64(pointOffset + 8, y, true);
      pointOffset += 16;
    }
  }
  return body;
}

function writeDbf(names: string[]): Uint8Array {
  const headerLength = 32 + 32 + 1;
  const recordLength = 1 + 80;
  const file = new Uint8Array(headerLength + names.length * recordLength + 1);
  const view = new DataView(file.buffer);
  file[0] = 0x03;
  view.setUint32(4, names.length, true);
  view.setUint16(8, headerLength, true);
  view.setUint16(10, recordLength, true);
  const fieldName = new TextEncoder().encode("NAME");
  file.set(fieldName, 32);
  file[32 + 11] = "C".charCodeAt(0);
  file[32 + 16] = 80;
  file[32 + 32] = 0x0d;
  const encoder = new TextEncoder();
  names.forEach((name, index) => {
    const start = headerLength + index * recordLength;
    file[start] = 0x20;
    const bytes = encoder.encode(name).slice(0, 80);
    file.set(bytes, start + 1);
    for (let i = 1 + bytes.length; i < recordLength; i++) file[start + i] = 0x20;
  });
  file[file.length - 1] = 0x1a;
  return file;
}

function zipStore(files: { name: string; data: Uint8Array }[]): Uint8Array {
  const encoder = new TextEncoder();
  const locals: Uint8Array[] = [];
  const centrals: Uint8Array[] = [];
  let offset = 0;
  for (const file of files) {
    const name = encoder.encode(file.name);
    const crc = crc32(file.data);
    const local = new Uint8Array(30 + name.length + file.data.length);
    const view = new DataView(local.buffer);
    view.setUint32(0, 0x04034b50, true);
    view.setUint16(4, 20, true);
    view.setUint16(8, 0, true);
    view.setUint32(14, crc, true);
    view.setUint32(18, file.data.length, true);
    view.setUint32(22, file.data.length, true);
    view.setUint16(26, name.length, true);
    local.set(name, 30);
    local.set(file.data, 30 + name.length);
    locals.push(local);

    const central = new Uint8Array(46 + name.length);
    const centralView = new DataView(central.buffer);
    centralView.setUint32(0, 0x02014b50, true);
    centralView.setUint16(4, 20, true);
    centralView.setUint16(6, 20, true);
    centralView.setUint16(10, 0, true);
    centralView.setUint32(16, crc, true);
    centralView.setUint32(20, file.data.length, true);
    centralView.setUint32(24, file.data.length, true);
    centralView.setUint16(28, name.length, true);
    centralView.setUint32(42, offset, true);
    central.set(name, 46);
    centrals.push(central);
    offset += local.length;
  }
  const centralSize = centrals.reduce((sum, part) => sum + part.length, 0);
  const end = new Uint8Array(22);
  const endView = new DataView(end.buffer);
  endView.setUint32(0, 0x06054b50, true);
  endView.setUint16(8, files.length, true);
  endView.setUint16(10, files.length, true);
  endView.setUint32(12, centralSize, true);
  endView.setUint32(16, offset, true);
  return concat([ ...locals, ...centrals, end ]);
}

function crc32(data: Uint8Array): number {
  let crc = 0xffffffff;
  for (const byte of data) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit++) {
      crc = (crc >>> 1) ^ ((crc & 1) === 1 ? 0xedb88320 : 0);
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function concat(parts: Uint8Array[]): Uint8Array {
  const total = parts.reduce((sum, part) => sum + part.length, 0);
  const out = new Uint8Array(total);
  let offset = 0;
  for (const part of parts) {
    out.set(part, offset);
    offset += part.length;
  }
  return out;
}
