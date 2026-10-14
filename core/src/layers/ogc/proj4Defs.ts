// proj4'un TS tanimlari "export =" bicimindedir (bkz proj4/dist/index.d.ts),
// bu yuzden dinamik import()'un namespace TURU dogrudan Proj4'un kendisidir
// -- ["default"] YOKTUR (bkz asagidaki runtime "as unknown as {default:...}"
// donusumunun WHY yorumu). layers/sources/geojsonCrs.ts (WFS/GeoJSON/SHP CRS
// donusumu) da extractEpsgCode ve registerProj4Def'i BURADAN kullanir --
// eskiden orada BAGIMSIZ bir kopyasi (ve ayri bir cache'i) vardi. proj4 @tucbs/core'un OPSIYONEL bir peer
// dependency'si (bkz packages/core/package.json peerDependenciesMeta) -- bu
// dosya layers/ogc/capabilities.ts uzerinden LayerManager'in HER ZAMAN yuklenen
// import zincirine girdigi icin proj4'a STATIK bir import EKLENMEZ, SADECE
// gercekten bir WCS katmaninin projekli (dereceli olmayan) DescribeCoverage
// zarfi cozumlenmesi GEREKTIGINDE dinamik olarak yuklenir -- aksi halde
// proj4'u hic yuklememis (importmap'e hic eklememis) tuketici uygulamalar
// SADECE @tucbs/core'u kullanmaya calisirken (WCS'e hic dokunmadan) modul
// cozumleme hatasiyla karsilasirdi.
export type Proj4 = typeof import("proj4");

// Bir srsName degerinden (URL bicimi "http://www.opengis.net/def/crs/EPSG/0/2056",
// URN bicimi "urn:ogc:def:crs:EPSG::2056" ya da duz "EPSG:2056") EPSG kod
// numarasini cikarir -- bicim fark etmeksizin kod HER ZAMAN sonda yer alir
// (bkz TucbsServiceUpload.ts'teki ayni desen). Kod YOKSA (orn. "EPSG:Tanımsız" gibi sonu rakam olmayan bozuk bir isim)
// undefined doner.
export function extractEpsgCode(srsName: string): string | undefined {
  if (!/EPSG/i.test(srsName)) return undefined;
  const trimmed = srsName.trim();
  let end = trimmed.length;
  while (end > 0 && trimmed.charCodeAt(end - 1) >= 48 && trimmed.charCodeAt(end - 1) <= 57) {
    end--;
  }
  const digits = trimmed.slice(end);
  return digits.length > 0 ? digits : undefined;
}

// proj4 varsayilan olarak SADECE WGS84/longlat biliyor -- baska bir EPSG
// kodunu (orn. Isvicre LV95/EPSG:2056) donusturebilmek icin once o CRS'in
// proj4 tanim string'i proj4.defs() ile KAYDEDILMELI. epsg.io bunu her EPSG
// kodu icin duz metin, CORS-acik (access-control-allow-origin: *), 1 yil
// cache'lenebilir bir uc noktada sunuyor -- kendi (buyuk) EPSG veritabanimizi
// paketlemek yerine ihtiyac aninda cekilip proj4.defs()'e kaydedilir. Ayni
// kod birden fazla coverage'da/dosyada tekrar edebildigi icin (orn. ayni
// sunucunun tum katmanlari) sonuc/istek PROMISE'i EPSG koduna gore
// modul-seviyesinde cache'lenir -- WCS (ensureProj4Def) ve GeoJSON CRS
// (geojsonCrs.ts) yollari AYNI cache'i paylasir.
//
// Yalnizca KESIN sonuclar cache'te kalir: basari ve "bu kod yok" (HTTP 404
// ya da bos tanim). Gecici hatalar (ag hatasi, 5xx, 429 ve 404 disindaki
// diger HTTP hatalari) cache'ten silinir ve bir sonraki cagrida tekrar
// denenir -- eskiden `false` HER durumda kalici cache'leniyordu; gecici bir
// ag sorunu yuzunden o EPSG kodlu katmanlar oturum boyunca yanlis/genis
// konumda kaliyordu (gercek hatalar planı H1.3). 404'un cache'te kalmasi,
// gercekten var olmayan bir kod icin her katmanda epsg.io'ya bosuna istek
// atilmasini onler.
type Proj4DefResult = "registered" | "missing" | "transient-failure";
const proj4DefRequests = new Map<string, Promise<Proj4DefResult>>();

/**
 * Belirtilen EPSG kodu icin proj4 tanimini (zaten kayitli degilse epsg.io'dan
 * indirip) verilen proj4 modulune kaydeder. Uyari BASMAZ -- cagiran taraf
 * basarisizligi kendi yoluna gore ele alir.
 * @param proj4 - Dinamik olarak yuklenmis proj4 modulu.
 * @param epsgCode - Sayisal EPSG kodu (orn. `"2056"`).
 * @returns Tanim kayitliysa ya da basariyla kaydedildiyse `true`.
 */
export async function registerProj4Def(proj4: Proj4, epsgCode: string): Promise<boolean> {
  const name = `EPSG:${epsgCode}`;
  if (proj4.defs(name)) return true;
  let pending = proj4DefRequests.get(epsgCode);
  if (!pending) {
    pending = (async (): Promise<Proj4DefResult> => {
      try {
        const response = await fetch(`https://epsg.io/${epsgCode}.proj4`);
        if (!response.ok) return response.status === 404 ? "missing" : "transient-failure";
        const def = (await response.text()).trim();
        if (!def) return "missing";
        proj4.defs(name, def);
        return "registered";
      } catch {
        return "transient-failure";
      }
    })();
    proj4DefRequests.set(epsgCode, pending);
  }
  const result = await pending;
  // Ayni anda bekleyen tum cagiranlar bu turun sonucunu (false) alir; cache
  // girdisi yalnizca HALA bu istege aitse silinir (arada baslamis yeni bir
  // denemeyi silmemek icin).
  if (result === "transient-failure" && proj4DefRequests.get(epsgCode) === pending) {
    proj4DefRequests.delete(epsgCode);
  }
  return result === "registered";
}

/**
 * Belirtilen EPSG kodu icin proj4 tanimini (gerekirse epsg.io'dan indirip)
 * proj4.defs()'e kaydeder ve cagirana YUKLENMIS proj4 modulunu (koordinat
 * donusumu icin dogrudan cagrilabilir) dondurur -- proj4 paketi tuketici
 * uygulamaya hic eklenmemisse VEYA EPSG kodunun epsg.io'da gercek bir tanimi
 * yoksa undefined doner.
 */
export async function ensureProj4Def(epsgCode: string): Promise<Proj4 | undefined> {
  let proj4: Proj4;
  try {
    ({ default: proj4 } = (await import("proj4")) as unknown as { default: Proj4 });
  } catch {
    // proj4 paketi tuketici uygulamaya hic eklenmemis -- ONCEDEN sessizce
    // undefined donuyordu (bkz project_ucbp_api_ogc_capabilities_uygulama_plani
    // Faz 6/4f); etkilenen WCS katmani sessizce yanlis (global) konumda
    // gorunurdu, gelistirici bunu ASLA fark etmezdi.
    console.warn(
      `[ogc/proj4Defs] EPSG:${epsgCode} icin koordinat donusumu atlandi -- "proj4" paketi yuklu degil ` +
        `(peer dependency olarak eklenmemis). Bu EPSG kodunu kullanan WCS katmanlari yanlis/genis bir alanda gorunebilir.`,
    );
    return undefined;
  }

  if (!(await registerProj4Def(proj4, epsgCode))) {
    console.warn(
      `[ogc/proj4Defs] EPSG:${epsgCode} icin proj4 tanimi epsg.io'dan alinamadi ` +
        `(agsizlik veya gecersiz/desteklenmeyen kod olabilir). Bu EPSG kodunu kullanan WCS katmanlari yanlis/genis bir alanda gorunebilir.`,
    );
    return undefined;
  }
  return proj4;
}
