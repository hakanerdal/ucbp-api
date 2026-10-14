// Cesium, her yer-karosu (tile) icin ekran-uzayi hatasini
//   hata = geometricError(L) * drawingBufferHeight / (mesafe * sseDenominator) / pixelRatio
// ile hesaplar ve hata, `maximumScreenSpaceError`'i asarsa karoyu bir alt
// seviyeye boler. Yani L -> L+1 gecisi kamera mesafesi
//   esik(L) = geometricError(L) * H / (sseDenominator * maxSSE * pixelRatio)
// degerinde olur. Duz tepeden bakista ekran ortasi kameraya YAKIN (mesafe ~ yukseklik),
// koseler UZAK (mesafe ~ yukseklik * ratio) oldugundan kamera yuksekligi bir esigin
// hemen ALTINDA ise (yukseklik < esik < yukseklik * ratio) ayni ekranda IKI farkli
// seviye cizilir. HGM altlik karolari seviyeye gore farkli etiket/stil uretip karo
// kenarinda etiketleri kestigi icin bu, haritada belirgin bir "bant" bozulmasi olur
// (Home butonunda bildirilen hata). Esik, canvas piksel boyutuna (cihaz/pencere
// boyutu/DPI) bagli oldugundan extent'i sabit bir degere ayarlamak YETMEZ.
// Cozum: kamerayi oynatmak yerine `maximumScreenSpaceError`'i, esigin gorunumun
// DISINA (tum karolar ayni seviyede) kalacagi sekilde kucuk bir carpanla
// degistirmek -- bkz lodSeamGuard.ts (her karede, boyut/zoom'dan bagimsiz).

export interface LodSeamParams {
  /** `terrainProvider.getLevelMaximumGeometricError` -- metre. */
  readonly geometricError: (level: number) => number;
  /** `scene.drawingBufferHeight`. */
  readonly drawingBufferHeight: number;
  /** `camera.frustum.sseDenominator`. */
  readonly sseDenominator: number;
  /** `globe.maximumScreenSpaceError`. */
  readonly maximumScreenSpaceError: number;
  /** `scene.pixelRatio` (devicePixelRatio * resolutionScale). */
  readonly pixelRatio: number;
  /** Frustum dikey gorus acisi (radyan) ve en/boy orani. */
  readonly fovy: number;
  readonly aspectRatio: number;
}

const MAX_LEVEL = 24;

// Yerkure yaricapi (m). Egrilik, uzak koseleri duz zemine gore belirgin
// uzaklastirir (1.8M m yukseklikte kose/merkez orani ~1.27, duz zeminde ~1.20).
const EARTH_RADIUS = 6_371_000;

// Kose karolari kismen gorunur oldugundan ve mesafe karonun sinir hacmine
// olculdugunden gercek en uzak karo, kose NOKTASINDAN uzak olabilir (canli
// olcum: 4:3 pencerede en uzak karo 1.43*yukseklik, kose noktasi 1.34*yukseklik).
// Esige yakin sinirda kalmamak icin emniyet payi.
const CORNER_SAFETY = 1.15;

/**
 * Duz tepeden bakista ekran kosesindeki yer noktasinin kameraya mesafesi /
 * kamera yuksekligi (kure uzerinde isin-kure kesisimi).
 */
export function cornerDistanceRatio(fovy: number, aspectRatio: number, height: number): number {
  const tanY = Math.tan(fovy / 2);
  const tanX = tanY * aspectRatio;
  const theta = Math.atan(Math.hypot(tanX, tanY));
  const center = EARTH_RADIUS + height;
  const discriminant = EARTH_RADIUS * EARTH_RADIUS - center * center * Math.sin(theta) ** 2;
  // Isin kureyi kacirirsa (ufuk ustu) kose mesafesi tanimsiz: en uzak, ufuk mesafesi.
  const distance =
    discriminant > 0
      ? center * Math.cos(theta) - Math.sqrt(discriminant)
      : Math.sqrt(center * center - EARTH_RADIUS * EARTH_RADIUS);
  return (distance / height) * CORNER_SAFETY;
}

/** Her LOD gecisinin gerceklestigi kamera mesafeleri (kucukten buyuge). */
export function lodTransitionDistances(params: LodSeamParams): number[] {
  const { drawingBufferHeight, sseDenominator, maximumScreenSpaceError, pixelRatio } = params;
  const out: number[] = [];
  for (let level = 0; level <= MAX_LEVEL; level++) {
    const d =
      (params.geometricError(level) * drawingBufferHeight) /
      (sseDenominator * maximumScreenSpaceError * pixelRatio);
    if (Number.isFinite(d) && d > 0) out.push(d);
  }
  return out.sort((a, b) => a - b);
}

// Esige tam oturmak yerine kucuk bir pay birak (yuvarlama/hesap hatasi).
const SEAM_MARGIN = 1.01;

/**
 * Verilen kamera yuksekliginde ayni ekranda iki LOD seviyesi cizilecekse (bir
 * esik `height` ile `height*ratio` arasindaysa), esigi bandin disina iten EN
 * KUCUK `maximumScreenSpaceError` degerini dondurur (esik 1/sse ile orantili):
 * tum karolari bir seviye kabalastirmak (esik -> height'in altina) veya
 * inceltmek (esik -> height*ratio'nun ustune) -- hangisi sse'yi daha az
 * degistiriyorsa. Band disindaysa `maximumScreenSpaceError`'u aynen dondurur.
 */
export function seamFreeScreenSpaceError(height: number, params: LodSeamParams): number {
  const base = params.maximumScreenSpaceError;
  const ratio = cornerDistanceRatio(params.fovy, params.aspectRatio, height);
  for (const threshold of lodTransitionDistances(params)) {
    if (threshold > height && threshold < height * ratio) {
      const coarser = base * (threshold / height) * SEAM_MARGIN;
      const finer = (base * threshold) / (height * ratio * SEAM_MARGIN);
      return Math.abs(Math.log(coarser / base)) <= Math.abs(Math.log(finer / base)) ? coarser : finer;
    }
  }
  return base;
}
