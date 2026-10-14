// NASA Earth Observatory "Blue Marble: Next Generation" (Temmuz 2004,
// world.topo.bathy.200407.3x5400x2700.jpg, https://visibleearth.nasa.gov/
// collection/1484/blue-marble) kaynagindan -- NASA'nin yayinladigi TAM
// 5400x2700 piksel cozunurlukte, sadece JPEG kalitesi (~55) dusurulerek
// (piksel boyutu KORUNARAK) `./assets/blue-marble-fallback.jpg` dosyasina
// gomuldu. NASA icerikleri ABD federal hukumet uretimi olarak telife tabi
// DEGIL (bkz. nasa.gov/nasa-brand-center/images-and-media); tek sart NASA
// onayi/sponsorlugu ima etmemek ve kaynagi belirtmek (bkz Map.ts
// addFallbackBasemap() "credit" alani) -- OSM/CARTO gibi ayri ticari
// lisans/API key GEREKTIRMEZ (bkz proje gecmisi).
// WHY runtime URL, base64 DEGIL: daha once bu gorsel base64 data URI olarak
// gomuluydu -- bu, ~1.14MB'lik metni HER `tucbs-core.js` yuklemesinde
// zorunlu kiliyordu (fallback hic tetiklenmese bile). Deneysel olarak
// dogrulandi: Vite'in `build.lib` (kutuphane) modu, `import x from
// "./x.jpg"` VEYA literal `new URL("./x.jpg", import.meta.url)` seklindeki
// HERHANGI bir asset referansini -- boyuttan/assetsInlineLimit'ten BAGIMSIZ
// olarak -- base64'e gomuyor (app modundan farkli, kutuphane cikti
// konumunun bilinmemesi nedeniyle Vite'in guvenli varsayilani). Bunu
// atlatmak icin dosya adi AYRI bir degiskende tutuluyor -- Vite'in asset
// AST tarayicisi SADECE `new URL(...)` icine DOGRUDAN yazilmis string
// literal'i taniyor, degiskene tasindiginda taramayi atlar ve kodu
// DOKUNULMADAN birakir; boylece `import.meta.url` TARAYICIDA calisma
// zamaninda native olarak cozumlenir (standart ESM davranisi, Vite'a
// bagimli degil). Gercek .jpg dosyasi bu yuzden Vite'in asset pipeline'i
// DISINDA, `package.json`'daki build script'ine eklenen `cp` adimiyla
// manuel olarak `dist/`'e kopyalanir (tucbs-core.js ile AYNI klasorde
// olmasi ZORUNLU -- runtime URL boylece dogru cozumlenir). Sonuc:
// `tucbs-core.js` 1.29MB'tan ~146KB'a indi; gercek gorsel byte'lari SADECE
// Map.ts addFallbackBasemap() bu URL'i fiilen kullandiginda (yani SADECE
// fallback tetiklendiginde, ayni origin'den) agdan cekilir (bkz
// project_ucbp_api_fallback_world_imagery_arastirma memory).
// Boyut: 5400x2700 -- Map.ts addFallbackBasemap() bu degerleri tileWidth/
// tileHeight olarak sabit gecer (bkz oradaki yorum, Cesium 1.143 SingleTile
// ImageryProvider yapicisi bunlari otomatik algilamiyor).
const FALLBACK_IMAGE_FILENAME = "blue-marble-fallback.jpg";

export const FALLBACK_WORLD_IMAGE: string = new URL(
  FALLBACK_IMAGE_FILENAME,
  import.meta.url,
).href;
