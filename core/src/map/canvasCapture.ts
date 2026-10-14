import { Cartesian2, Cartesian3, type Viewer } from "cesium";

// Map.nextFrame/captureCanvasBlob/measureGroundMetersPerPixel'in (Adim 3,
// GC-06) saf tasimasi -- bkz project_ucbp_api_god_component_map_adim1_basemapwatcher.
// Ucu de SAF `viewer` fonksiyonu -- LayerManager/baska Map state'ine hic
// dokunmuyorlar, bu yuzden BasemapWatcher'daki deps objesine bile gerek yok.

// Bir sonraki scene.postRender'i bekler (tek seferlik dinleyici, kendini
// otomatik kaldirir) -- capture'in canvas'i YARIM/eski bir karede degil,
// TAM render edilmis guncel bir karede yakalamasini garantiler.
export function nextFrame(viewer: Viewer): Promise<void> {
  return new Promise((resolve) => {
    const callback = (): void => {
      viewer.scene.postRender.removeEventListener(callback);
      resolve();
    };
    viewer.scene.postRender.addEventListener(callback);
    viewer.scene.requestRender();
  });
}

export async function captureCanvasBlob(
  viewer: Viewer,
  mimeType: "image/jpeg" | "image/png",
  quality: number,
): Promise<Blob> {
  const canvas = viewer.canvas as HTMLCanvasElement;
  if (typeof canvas.toBlob === "function") {
    return new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (blob) =>
          blob
            ? resolve(blob)
            : reject(new Error("canvas.toBlob basarisiz oldu")),
        mimeType,
        quality,
      );
    });
  }
  // Eski tarayici fallback'i: toDataURL -> base64 -> Blob.
  const dataUrl = canvas.toDataURL(mimeType, quality);
  const base64 = dataUrl.split(",")[1] ?? "";
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new Blob([bytes], { type: mimeType });
}

/**
 * Ekran merkezinde, arazi-farkında (`globe.pick`) ölçülen piksel-başına-yer-mesafesini
 * (metre) döndürür; harita globe'u göstermiyorsa (ör. açık uzay) `null` döner.
 */

// FAZ 1.7: TucbsInfoBar._computeScale() (canli haritadaki "Olcek 1/N"
// gostergesi) ile BIREBIR AYNI ornekleme -- ekran MERKEZINDE, 2 piksel
// araliginda, `getPickRay`+`globe.pick` (arazi-farkinda) ile olculuyor.
// ONCEDEN burada FARKLI bir ornekleme vardi (ekranin %80 alt kismi, 100px
// araligi, duz elipsoid `pickEllipsoid`) -- Faz 1.1'de haritanin altina
// CIZILEN gorsel bir olcek cubugu icin tasarlanmisti (cubugun ekrandaki
// konumuyla eslessin diye); o gorsel cubuk sonradan "1/N" metin etiketine
// donusturulduyse de ornekleme hic guncellenmedi. Sonuc: kullanicinin
// canli haritada gordugu ("Olcek 1/512.699") ile yazdirma etiketi
// ("1/513058") arasinda kucuk ama gercek bir sapma olusuyordu (perspektif
// projeksiyonda farkli ekran konumu+piksel araligi FARKLI bir yerel
// cozunurluk olcer). Bu fonksiyon artik TucbsInfoBar ile AYNI algoritmayi
// kullandigindan, ayni kamera durumunda İKİSİ DE (kayan-nokta hassasiyeti
// disinda) AYNI degeri verir. Harita globe'u gormuyorsa (ör. kamera acik
// uzayi gosteriyorsa) `null` doner. TucbsPrintTool'un "1/N" olcek orani
// hesabi icin PUBLIC -- capture'dan HEMEN sonra, capture ANINDAKI (canvas
// hic resize edilmedigi icin ekrandakiyle AYNI) piksel-basina-yer-mesafesini
// okumak amacli.
export function measureGroundMetersPerPixel(viewer: Viewer): number | null {
  const scene = viewer.scene;
  const camera = viewer.camera;
  const canvas = viewer.canvas;
  const centerX = canvas.clientWidth / 2;
  const centerY = canvas.clientHeight / 2;
  const leftRay = camera.getPickRay(new Cartesian2(centerX - 1, centerY));
  const rightRay = camera.getPickRay(new Cartesian2(centerX + 1, centerY));
  if (!leftRay || !rightRay) return null;
  const leftPoint = scene.globe.pick(leftRay, scene);
  const rightPoint = scene.globe.pick(rightRay, scene);
  if (!leftPoint || !rightPoint) return null;
  return Cartesian3.distance(leftPoint, rightPoint) / 2;
}
