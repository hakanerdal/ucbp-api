// Olcum araci (TucbsMeasureTool) icin saf format yardimcilari -- Cesium/DOM
// bagimliligi YOK, birim test edilebilir.

export function metersToReadable(m: number): string {
  if (!isFinite(m)) return "-";
  return m < 1000 ? `${m.toFixed(2)} m` : `${(m / 1000).toFixed(2)} km`;
}

export function sqmToReadable(a: number): string {
  if (!isFinite(a)) return "-";
  return a < 1_000_000 ? `${a.toFixed(2)} m²` : `${(a / 1_000_000).toFixed(2)} km²`;
}
