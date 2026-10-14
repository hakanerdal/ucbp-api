import {
  Cartesian3,
  Cartographic,
  ConstantProperty,
  JulianDate,
  PropertyBag,
  Math as CesiumMath,
  type Color,
  type DataSource,
  type Entity,
  PolygonHierarchy,
} from "cesium";

// bkz OutlineGeometry.splitPoleEnclosingPolygon
const POLE_SLICE_DEGREES = 90;
const POLE_LATITUDE_LIMIT = 89.9;

// Sutherland-Hodgman: kapali bir [boylam, enlem] halkasini `lon` dogrusunun
// bir tarafina kirpar (side=1: lon >= L, side=-1: lon <= L). Kapali halka
// doner; ardisik ayni noktalar atilir.
function clipRingToLongitude(
  ring: readonly (readonly [number, number])[],
  lon: number,
  side: 1 | -1
): [number, number][] {
  const inside = (p: readonly [number, number]): boolean => side * (p[0] - lon) >= 0;
  const out: [number, number][] = [];
  const push = (p: readonly [number, number]): void => {
    const last = out[out.length - 1];
    if (last === undefined || last[0] !== p[0] || last[1] !== p[1]) out.push([p[0], p[1]]);
  };
  for (let i = 0; i < ring.length - 1; i++) {
    const a = ring[i]!;
    const b = ring[i + 1]!;
    if (inside(a)) push(a);
    if (inside(a) !== inside(b)) {
      const t = (lon - a[0]) / (b[0] - a[0]);
      push([lon, a[1] + t * (b[1] - a[1])]);
    }
  }
  if (out.length > 0) push(out[0]!);
  return out;
}

/**
 * clampToGround poligonlarda Cesium'un native outline desteğini framework
 * seviyesinde kapatmasının workaround'u -- ayrı bir "companion" polyline
 * entity'si ekleyip antimeridyen/kutup çökmelerini engelleyen saf, Cesium
 * Viewer'a ihtiyaç duymayan modül (bkz
 * project_ucbp_api_god_component_refactor_kurallari, 2.3 Hedef Yapi ve
 * Ek-A). LayerManager.ts'ten TEK SATIR bile davranis degisikligi OLMADAN
 * tasinmistir. Tek dis bagimlilik: Cesium Viewer'in TAMAMI degil, sadece
 * `clock.currentTime` (bkz constructor'daki getCurrentTime provider'i).
 */
export class OutlineGeometry {
  // addPolygonOutlineCompanion() -- Douglas-Peucker toleransi. Cok detayli
  // sinir verilerinde (orn. 68MB'lik, 253 feature'lik bir ulke katmani) her
  // koseyi companion dis hat polyline'ina TASIMAK, Dis Hat GENISLIGI
  // degistiginde (Cesium'da width GEOMETRIYI -- GroundPolylineGeometry/
  // terrain-clip "shadow volume" -- etkiledigi icin UCUZ bir yol yok,
  // PolylineGeometryUpdater HER width degisikliginde geometriyi BASTAN
  // tessellate eder) aynı renkteki TUM companion'lari TEK bir primitive
  // kurulumunda paketleyip "RangeError: Array buffer allocation failed" ile
  // cokmesine yol aciyordu (kullanici bildirimi).
  //
  // NOT (deneme sirasi -- 68MB/253 feature'lik bir ulke katmaniyla, sonra
  // 86MB'lik daha da yogun bir katmanla test edildi):
  //   15m  / 2000 -> RangeError ile cokuyordu (asil kok sebep)
  //   50m  / 800  -> cokme duzeldi ama Genislik degisikligi 5-6sn suruyordu
  //   250m / 150  -> 2-3sn'ye dustu AMA kalite gozle GORULUR bozuldu --
  //                  Turkiye'nin Karadeniz kiyi seridi belirgin sekilde kose
  //                  kose/centikli goruntu verdi (kaba tavan-orneklemesi).
  //   120m / 1200 -> ulke katmaninda kalite kabul edilebilirdi, AMA sabit
  //                  120m'lik bir tolerans TAMAMEN AYRI bir felakete yol
  //                  acti: parsel gibi TUM poligonun kendisi zaten 120
  //                  metreden KUCUK oldugu veri kumelerinde, Douglas-Peucker
  //                  ARADAKI HER NOKTAYI (hicbiri 120m'lik toleransi
  //                  asamadigindan) atip sadece baslangic/bitis noktalarini
  //                  birakiyor, dis hat parselin icinden gecen SACMA
  //                  kosegen cizgilerine donusuyordu (kullanici bildirimi).
  //                  "Dunya/ulke olceginde bu sapma fark edilmez" varsayimi
  //                  YANLIS bir onkosuldu -- SABIT bir metre degeri, veri
  //                  olcegi (ulke sinirlari MI, arazi parselleri MI)
  //                  bilinmeden asla dogru secilemez.
  //
  // Cozum: tolerans SABIT DEGIL, her poligonun KENDI boyutuyla (bounding-box
  // kosegeniyle) ORANTILI -- bkz simplifyOutlinePositions(). Buyuk bir
  // ulkede kosegen milyonlarca metre oldugundan tolerans da (yuzdesel)
  // buyuk ama yine de "birkac pikselin altinda" kalir; kucuk bir parselde
  // kosegen onlarca metre oldugundan tolerans da onunla oranti orinde
  // kuculuyor, neredeyse hicbir nokta atilmiyor -- HER olcekte guvenli.
  private static readonly OUTLINE_SIMPLIFY_TOLERANCE_FACTOR = 0.00007;
  // Alt/ust sinir: tolerans hicbir zaman bu araligin disina cikmaz --
  // COK KUCUK (dejenere/sifira yakin kosegenli) poligonlarda toleransin
  // sifira dusup Douglas-Peucker'i anlamsizca yavaslatmasini (alt sinir),
  // COK BUYUK (Rusya/Kanada olceginde) ulkelerde toleransin asiri
  // agresiflesip 250m/150 denemesindeki kose kose goruntuye geri
  // donmesini (ust sinir) onler.
  private static readonly OUTLINE_SIMPLIFY_MIN_TOLERANCE_METERS = 0.25;
  private static readonly OUTLINE_SIMPLIFY_MAX_TOLERANCE_METERS = 150;
  // Douglas-Peucker sonrasi bile ASIRI yogun kalan (veri kaynağının kendisi
  // cok detayliysa) companion'lar icin sabit bir GUVENLIK TAVANI -- her
  // KOSULDA (toleransin yetersiz kaldigi en kotu durumda bile) tek bir
  // companion'in makul bir vertex sayisinin USTUNE cikmayacagini garanti
  // eder. Yukarida aciklanan sebepten (kaba orneklemeye DUSMEK, dusmemekten
  // cok daha kotu gorunuyor) BILEREK yuksek tutuluyor -- normal yogunluktaki
  // veride bu tavana NEREDEYSE HIC ulasilmamasi hedefleniyor.
  private static readonly OUTLINE_MAX_VERTICES = 1200;

  // clampToGround poligonlarda Cesium'un outline'i framework seviyesinde
  // kapatmasinin (bkz. addPolygonOutlines) workaround'u olarak eklenen
  // companion polyline entity'lerini isaretler -- applyLayerStyle()'in
  // per-feature dolgu-renklendirme dongusu bunlari atlamali.
  private readonly outlineCompanionEntities = new WeakSet<Entity>();
  // outlineCompanionEntities'in TERSI: bir companion'i OLAN asil (poligon)
  // entity'yi isaretler -- applyEntityStyle() bu entity'lerde native
  // polygon.outline/outlineColor/outlineWidth alanlarina HIC DOKUNMAMALI.
  // Aksi halde her stil uygulamasinda (ör. sadece dolgu rengi degissin diye
  // cagrilan applyLayerStyle) native outline'in addPolygonOutlineCompanion
  // tarafindan BILEREK false birakilmis hali sessizce true'ya donuyor;
  // outline gibi GEOMETRI-ETKILEYEN bir alanin degismesi Cesium'un ilgili
  // Primitive'i YIKIP YENIDEN KURMASINA yol aciyor -- ekranda sekil bir-iki
  // kare kaybolup geri geliyor (gercek kullanici geri bildirimi: "renklerle
  // oynadigim an flicker oluyor, kayboluyor geri geliyor").
  private readonly entitiesWithOutlineCompanion = new WeakSet<Entity>();
  // AYNI gerekceyle (bkz entitiesWithOutlineCompanion yorumu) ama farkli bir
  // sebeple: disableRiskyPolygonOutlines() antimeridyen/kutup hatasina
  // (bkz o metodun WHY yorumu) girecek entity'lerin native outline'ini
  // BILEREK false birakir -- applyEntityStyle() bu entity'lerde de native
  // polygon.outline/outlineColor/outlineWidth alanlarina HIC DOKUNMAMALI,
  // aksi halde kullanici Stil Duzenleyici'de "Dis Hat" acinca (ya da
  // herhangi bir stil guncellemesinde -- TUM spec her seferinde yeniden
  // gonderiliyor) outline sessizce true'ya donup Cesium'un "Invalid array
  // length" crash'ini YENIDEN tetikliyordu (gercek kullanici bildirimi:
  // "Stil Düzenle" ekraninda "Dış Hat" ayarlarken ayni RangeError tekrar
  // olustu).
  private readonly entitiesWithRiskyOutline = new WeakSet<Entity>();
  // Viewer'in TAMAMI degil, SADECE clock.currentTime'i HER cagrida CANLI
  // okur -- bkz LayerManager.ts constructor'i.
  private readonly getCurrentTime: () => JulianDate;

  constructor(options: { readonly getCurrentTime: () => JulianDate }) {
    this.getCurrentTime = options.getCurrentTime;
  }

  /** Bu entity'nin KENDİSİ bir outline companion'i mi (ayri bir polyline
   * olarak eklenmis, poligonun gercek bir ozelligi degil)? */
  isOutlineCompanion(entity: Entity): boolean {
    return this.outlineCompanionEntities.has(entity);
  }

  /** Bu (poligon) entity'nin bir outline companion'i VAR mi -- varsa native
   * polygon.outline/outlineColor/outlineWidth alanlarina DOKUNULMAMALI. */
  hasOutlineCompanion(entity: Entity): boolean {
    return this.entitiesWithOutlineCompanion.has(entity);
  }

  /** Bu (poligon) entity antimeridyen/kutup crash riski tasidigi icin native
   * outline'i BILEREK kapatilmis mi -- tekrar acilmamali. */
  hasRiskyOutline(entity: Entity): boolean {
    return this.entitiesWithRiskyOutline.has(entity);
  }

  // clampToGround poligonlarda Cesium'un outline'i framework seviyesinde
  // kapatmasinin (bkz addPolygonOutlineCompanion) workaround'u olarak
  // eklenen companion polyline entity'lerini isaretler -- applyLayerStyle()'in
  // per-feature dolgu-renklendirme dongusu bunlari atlamali.
  addPolygonOutlines(dataSource: DataSource, color: Color, width: number): void {
    // Riskli (antimeridyen/kutup) poligonlar companion ALMAZ: native
    // outline'lari zaten kapali ve zemine oturtulmuyorlar (bkz
    // disableRiskyPolygonOutlines) -- ayni halkayi zemine oturan bir
    // polyline olarak cizmek ayni riski geri getirirdi.
    const polygonEntities = dataSource.entities.values.filter(
      (entity) => entity.polygon !== undefined && !this.entitiesWithRiskyOutline.has(entity)
    );

    dataSource.entities.suspendEvents();
    for (const entity of polygonEntities) {
      this.addPolygonOutlineCompanion(dataSource, entity, color, width, true);
    }
    dataSource.entities.resumeEvents();
  }

  // Bir poligon entity'sinin kose koordinatlarindan AYRI bir polyline
  // "outline" entity'si ekler (bkz yukaridaki addPolygonOutlines yorumu) --
  // hem TOPLU ilk yukleme (addPolygonOutlines) HEM DE Cizim Katmani'na TEK
  // TEK eklenen poligonlar (_addDrawnShape, clampToGround:false) bu ORTAK
  // helper'i kullanir. Companion, applyLayerStyle()'daki mevcut
  // outlineCompanionEntities dongusu tarafindan otomatik olarak
  // renk/genislik guncellemesi alir.
  addPolygonOutlineCompanion(
    dataSource: DataSource,
    entity: Entity,
    color: Color,
    width: number,
    clampToGround: boolean
  ): void {
    const time = this.getCurrentTime();
    const hierarchy = entity.polygon!.hierarchy?.getValue(time) as
      | PolygonHierarchy
      | undefined;
    const positions = hierarchy?.positions;
    const firstPosition = positions?.[0];
    if (positions === undefined || positions.length < 2 || firstPosition === undefined)
      return;

    // Zaten gorunmeyen native outline'i kapat -- Cesium'un tekrarlanan
    // "geometryOutlines desteklenmiyor" uyarisini onlemek icin. Bu KALICI
    // bir karar -- applyEntityStyle() entitiesWithOutlineCompanion'i kontrol
    // ederek bu alana bir daha HIC dokunmaz (bkz o WeakSet'in yorumu).
    entity.polygon!.outline = new ConstantProperty(false);
    this.entitiesWithOutlineCompanion.add(entity);

    // Basitlestirme SADECE bu companion CIZGISI icin -- entity.polygon'un
    // (yani gercek dolgu alaninin) hierarchy'sine HIC dokunulmuyor, o tam
    // detayinda kaliyor (bkz OUTLINE_SIMPLIFY_TOLERANCE_FACTOR yorumu).
    const outlinePositions = OutlineGeometry.simplifyOutlinePositions([
      ...positions,
      firstPosition,
    ]);

    const outlineEntity = dataSource.entities.add({
      id: `${entity.id}::outline`,
      polyline: {
        positions: outlinePositions,
        clampToGround,
        width,
        material: color,
      },
    });
    this.outlineCompanionEntities.add(outlineEntity);
    // Identify/pick (InteractionManager.resolveFeature) bu companion'i
    // asil (dolgu) entity ile AYNI feature olarak tanisin diye isaretlenir
    // -- aksi halde companion'in properties'i BOS oldugundan (bu, GeoJSON'dan
    // gelen bir feature degil, sadece gorsel bir cizgi) tiklama companion'a
    // denk gelirse "Öznitelik bilgisi bulunamadı" gosterilir VE ayni katman
    // identify sonuclarinda MUKERRER (bos + dolu) olarak iki kez listelenirdi
    // (gercek kullanici bildirimi: "Poligon B kenarina tikladim, 2 tane
    // Poligon B cikiyor, biri oznitelik bilgisi bulunamadi diyor").
    outlineEntity.properties = new PropertyBag({
      __tucbsOutlineOf: entity.id,
    });
  }

  // Antimeridyeni (-180/180 boylam) gecen ya da kutuba (enlem ~=90) cok
  // yakin poligonlarda (orn. Rusya, Antarktika gibi genis kapsamli WFS/
  // GeoJSON katmanlarinda) Cesium'un KENDI outline tessellation'i
  // (subdivideRhumbLine, createPolygonOutlineGeometry icinde) "RangeError:
  // Invalid array length" ile TUM render'i durduran, henuz yamanmamis
  // BILINEN bir hatasi var (bkz kullanici bildirimi: "World continents"
  // WFS katmani; community.cesium.com/t/invalid-array-length-error,
  // GitHub CesiumGS/cesium#11269/#4760). CRS/koordinat sorunuyla ilgisi
  // YOK -- gecerli WGS84 veride de olusabilir. En guvenilir/basit dogrulanmis
  // cozum SADECE bu riskli poligonlarin outline'ini (kenar cizgisini)
  // kapatmaktir -- dolgu (fill) etkilenmez, katman yine gorunur kalir.
  disableRiskyPolygonOutlines(dataSource: DataSource): void {
    const now = JulianDate.now();
    dataSource.entities.suspendEvents();
    // Kopya uzerinde donulur -- splitPoleEnclosingPolygon koleksiyona yeni
    // (dilim) entity'ler ekler.
    for (const entity of [...dataSource.entities.values]) {
      const polygon = entity.polygon;
      const hierarchy = polygon?.hierarchy?.getValue(now) as
        | PolygonHierarchy
        | undefined;
      if (polygon !== undefined && this.risksAntimeridianOrPoleBug(hierarchy?.positions)) {
        polygon.outline = new ConstantProperty(false);
        // bkz entitiesWithRiskyOutline WHY yorumu -- applyEntityStyle()'in
        // (Stil Duzenleyici uzerinden) bu outline'i sonradan tekrar
        // acmasini ENGELLER.
        this.entitiesWithRiskyOutline.add(entity);
        // Ayni hata DOLGUDA da var: kutbu ICINE ALAN poligon (orn. World
        // continents/Antarktika: -180..180 boylam, -90 enlem) Cesium'da ne
        // zemine oturan (computeWallGeometry "RangeError: Invalid array
        // length", render durur) ne de duz (height 0; release build'de
        // "Cannot read properties of undefined", haritada pan'la yer
        // degistiren artefakt) halde kurulabiliyor. GEODESIC/granularity/
        // kutbu iceri cekmek/ikiye bolmek de kurtarmiyor; boylamda 90
        // derecelik dilimlere bolmek kurtariyor (Cesium 1.143.0 release
        // build, Node'da olculdu -- 27.458 feature icinde SADECE bu poligon).
        if (hierarchy !== undefined && this.splitPoleEnclosingPolygon(dataSource, entity, hierarchy, now)) {
          continue;
        }
        // Bolunemeyen riskli poligon (antimeridyen atlamasi, delikli kutup
        // poligonu) zemine OTURTULMAZ: height verilince Cesium onu
        // GroundPrimitive yerine duz cizer. Zaten zemine oturmayan (height
        // tanimli) ya da per-position yukseklikli poligonlara dokunulmaz.
        if (
          polygon.height === undefined &&
          polygon.perPositionHeight?.getValue(now) !== true
        ) {
          polygon.height = new ConstantProperty(0);
        }
      }
    }
    dataSource.entities.resumeEvents();
  }

  // Kutbu icine alan (boylamda ~360 derece donen, antimeridyen atlamasi
  // OLMAYAN, deliksiz) bir poligonu boylamda 90 derecelik 4 dilime boler:
  // ilk dilim entity'nin KENDI poligonu olur, digerleri ayni grafik ve
  // ozniteliklerle `${id}::part-N` entity'leri olarak eklenir (stil/identify
  // ozniteliklerden calistigi icin dilimler ayni feature gibi davranir).
  // GeoJsonDataSource kenarlari RHUMB cizgi olarak cizdigi icin boylam/enlem
  // duzleminde kirpmak geometriyi degistirmez. Kutup kenari Cesium'un
  // kaldirabilecegi -89.9/89.9 enlemine cekilir. Bolemezse false doner.
  private splitPoleEnclosingPolygon(
    dataSource: DataSource,
    entity: Entity,
    hierarchy: PolygonHierarchy,
    now: JulianDate
  ): boolean {
    const polygon = entity.polygon;
    if (polygon === undefined || hierarchy.holes.length > 0) return false;
    const ring = hierarchy.positions.map((position) => {
      const c = Cartographic.fromCartesian(position);
      return [CesiumMath.toDegrees(c.longitude), CesiumMath.toDegrees(c.latitude)] as [number, number];
    });
    let minLon = Infinity;
    let maxLon = -Infinity;
    for (let i = 0; i < ring.length; i++) {
      const [lon] = ring[i]!;
      if (i > 0 && Math.abs(lon - ring[i - 1]![0]) > 180) return false;
      minLon = Math.min(minLon, lon);
      maxLon = Math.max(maxLon, lon);
    }
    if (maxLon - minLon < 359) return false;

    const closed = [...ring, ring[0]!].map(
      ([lon, lat]) => [lon, Math.max(-POLE_LATITUDE_LIMIT, Math.min(POLE_LATITUDE_LIMIT, lat))] as [number, number]
    );
    const slices: Cartesian3[][] = [];
    for (let lo = -180; lo < 180; lo += POLE_SLICE_DEGREES) {
      // Kapali halka -> son (tekrar eden) nokta atilir; en az 3 kose kalmali.
      const slice = clipRingToLongitude(clipRingToLongitude(closed, lo, 1), lo + POLE_SLICE_DEGREES, -1).slice(0, -1);
      if (slice.length >= 3) slices.push(Cartesian3.fromDegreesArray(slice.flat()));
    }
    if (slices.length === 0) return false;

    const properties = entity.properties?.getValue(now) as Record<string, unknown> | undefined;
    slices.forEach((positions, index) => {
      const hierarchyProperty = new ConstantProperty(new PolygonHierarchy(positions));
      if (index === 0) {
        polygon.hierarchy = hierarchyProperty;
        return;
      }
      const part = polygon.clone();
      part.hierarchy = hierarchyProperty;
      const partEntity = dataSource.entities.add({
        id: `${entity.id}::part-${index}`,
        ...(entity.name !== undefined ? { name: entity.name } : {}),
        polygon: part,
      });
      if (properties !== undefined) partEntity.properties = new PropertyBag(properties);
      this.entitiesWithRiskyOutline.add(partEntity);
    });
    return true;
  }

  // Ardisik iki koseden HERHANGI birinin boylam farki >180 derece ise
  // (antimeridyen atlamasi -- orn. Rusya'nin -179/+179 arasi kosesi) ya da
  // herhangi bir kose kutba (|enlem|>89) cok yakinsa true doner.
  private risksAntimeridianOrPoleBug(
    positions: readonly Cartesian3[] | undefined
  ): boolean {
    if (!positions || positions.length < 2) return false;
    let previousLongitudeDeg: number | undefined;
    for (const position of positions) {
      const cartographic = Cartographic.fromCartesian(position);
      const latitudeDeg = CesiumMath.toDegrees(cartographic.latitude);
      if (Math.abs(latitudeDeg) > 89) return true;
      const longitudeDeg = CesiumMath.toDegrees(cartographic.longitude);
      if (
        previousLongitudeDeg !== undefined &&
        Math.abs(longitudeDeg - previousLongitudeDeg) > 180
      ) {
        return true;
      }
      previousLongitudeDeg = longitudeDeg;
    }
    return false;
  }

  // bkz isSuspiciousCrsResult WHY yorumu -- supheli (cozulemeyen/gecersiz
  // aralikta) koordinatlarla yuklenen bir katmanda kucuk bir gercek
  // parselin (birkaç metre) kenarlari yanlislikla BINLERCE KM'lik "geodesic"
  // yaylara donusebilir; Cesium bu kenarlari uzunluklarina gore (granularity
  // parametresine bolerek) ADAPTIF olarak alt-bolumlere ayirir -- clampToGround
  // KAPALI olsa bile bu tessellation tek basina tarayiciyi donduren/coken bir
  // maliyete yol acabilir. granularity'yi olasi en buyuk anlamli deger olan
  // PI (yarim cember -- iki nokta arasindaki olasi EN UZUN geodesic/rhumb
  // mesafe) yaparak HICBIR ek alt-bolum noktasi uretilmemesini garantiliyoruz
  // -- zaten anlamsiz/yanlis konumdaki bu geometri icin gorsel bir kayip
  // degildir. (Ilk denemede arcType=NONE kullanilmisti, ama Cesium'un
  // PolygonOutlineGeometry'si SADECE GEODESIC/RHUMB kabul ediyor --
  // "DeveloperError: Invalid arcType" ile render'i tamamen durduruyordu;
  // granularity arcType'a hic dokunmadigi icin bu kisitlamayla CAKISMIYOR.)
  // (Bu yorum eskiden LayerManager.ts'teki yonlendirme metodunun ustundeydi.)
  flattenSuspiciousGeometry(dataSource: DataSource): void {
    dataSource.entities.suspendEvents();
    for (const entity of dataSource.entities.values) {
      if (entity.polygon !== undefined) entity.polygon.granularity = new ConstantProperty(Math.PI);
      if (entity.polyline !== undefined) entity.polyline.granularity = new ConstantProperty(Math.PI);
    }
    dataSource.entities.resumeEvents();
  }

  // Douglas-Peucker: iki "ucu sabit" nokta arasinda, dogruya en uzak noktayi
  // bulup toleransi asiyorsa iki alt segmente bolerek YİNELİ olarak devam
  // eder; toleransin altinda kalan araki noktalar (neredeyse duz bir cizgi
  // uzerindeler) tamamen atilir. Cartesian3 (ECEF/metre) uzayinda calisir --
  // bkz OUTLINE_SIMPLIFY_TOLERANCE_FACTOR yorumu (sadece companion dis hat
  // icin kullanilir, poligonun ASIL dolgu geometrisine HIC dokunulmaz).
  private static douglasPeucker(
    points: readonly Cartesian3[],
    toleranceMeters: number
  ): Cartesian3[] {
    const keep = new Array<boolean>(points.length).fill(false);
    keep[0] = true;
    keep[points.length - 1] = true;

    const stack: [number, number][] = [[0, points.length - 1]];
    while (stack.length > 0) {
      const [start, end] = stack.pop()!;
      if (end <= start + 1) continue;

      let maxDistance = -1;
      let maxIndex = -1;
      for (let i = start + 1; i < end; i++) {
        const distance = OutlineGeometry.perpendicularDistance(
          points[i]!,
          points[start]!,
          points[end]!
        );
        if (distance > maxDistance) {
          maxDistance = distance;
          maxIndex = i;
        }
      }

      if (maxDistance > toleranceMeters) {
        keep[maxIndex] = true;
        stack.push([start, maxIndex], [maxIndex, end]);
      }
    }

    return points.filter((_, i) => keep[i]);
  }

  // "point"in, "lineStart"-"lineEnd" DOGRU PARCASINA (segmente, sonsuz
  // dogruya degil) en kisa mesafesi -- projeksiyon [0,1] disina duserse en
  // yakin uc noktaya kenetlenir.
  private static perpendicularDistance(
    point: Cartesian3,
    lineStart: Cartesian3,
    lineEnd: Cartesian3
  ): number {
    const lineVector = Cartesian3.subtract(lineEnd, lineStart, new Cartesian3());
    const lineLengthSquared = Cartesian3.magnitudeSquared(lineVector);
    if (lineLengthSquared === 0) return Cartesian3.distance(point, lineStart);

    const pointVector = Cartesian3.subtract(point, lineStart, new Cartesian3());
    const t = CesiumMath.clamp(
      Cartesian3.dot(pointVector, lineVector) / lineLengthSquared,
      0,
      1
    );
    const projection = Cartesian3.add(
      lineStart,
      Cartesian3.multiplyByScalar(lineVector, t, lineVector),
      lineVector
    );
    return Cartesian3.distance(point, projection);
  }

  // Douglas-Peucker sonrasi bile OUTLINE_MAX_VERTICES'i asan (kaynak veri
  // son derece yogunsa) bir diziyi, sekli KABACA koruyarak (esit araliklarla
  // orneklem alarak) sabit bir tavana indirir -- bkz o sabitin yorumu.
  private static uniformDecimate(
    points: readonly Cartesian3[],
    maxCount: number
  ): Cartesian3[] {
    if (points.length <= maxCount) return [...points];
    const step = (points.length - 1) / (maxCount - 1);
    return Array.from({ length: maxCount }, (_, i) => points[Math.round(i * step)]!);
  }

  // Poligonun bounding-box KOSEGENI (Cartesian3/ECEF metre) -- tolerans
  // buradan TUREYECEGI icin O(n) tek geciste eksen-hizali min/max yeterli,
  // gercek en-uzak-nokta-cifti (O(n^2)) hesaplamaya gerek yok.
  private static polygonExtentMeters(positions: readonly Cartesian3[]): number {
    let minX = Infinity;
    let minY = Infinity;
    let minZ = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    let maxZ = -Infinity;
    for (const p of positions) {
      if (p.x < minX) minX = p.x;
      if (p.x > maxX) maxX = p.x;
      if (p.y < minY) minY = p.y;
      if (p.y > maxY) maxY = p.y;
      if (p.z < minZ) minZ = p.z;
      if (p.z > maxZ) maxZ = p.z;
    }
    return Math.sqrt((maxX - minX) ** 2 + (maxY - minY) ** 2 + (maxZ - minZ) ** 2);
  }

  private static simplifyOutlinePositions(
    positions: readonly Cartesian3[]
  ): Cartesian3[] {
    const extent = OutlineGeometry.polygonExtentMeters(positions);
    const tolerance = CesiumMath.clamp(
      extent * OutlineGeometry.OUTLINE_SIMPLIFY_TOLERANCE_FACTOR,
      OutlineGeometry.OUTLINE_SIMPLIFY_MIN_TOLERANCE_METERS,
      OutlineGeometry.OUTLINE_SIMPLIFY_MAX_TOLERANCE_METERS
    );
    const simplified = OutlineGeometry.douglasPeucker(positions, tolerance);
    return simplified.length > OutlineGeometry.OUTLINE_MAX_VERTICES
      ? OutlineGeometry.uniformDecimate(simplified, OutlineGeometry.OUTLINE_MAX_VERTICES)
      : simplified;
  }
}
