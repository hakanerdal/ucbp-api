import { Color, CustomDataSource, PropertyBag, type DataSource, type Entity, type Viewer } from "cesium";
import type { Geometry } from "geojson";
import type { DrawnShape, DrawTool, LayerStyleSpec, LayerType, ManagedLayer, OutlineStyle } from "../../types/index.js";

export interface ShapeLayerBridgeDeps {
  getItem(id: string): ManagedLayer | undefined;
  getStyle(id: string): LayerStyleSpec | undefined;
  applyEntityStyle(entity: Entity, color: Color | undefined, outline: OutlineStyle, isShapeLayer: boolean): void;
  addPolygonOutlineCompanion(
    dataSource: DataSource,
    entity: Entity,
    color: Color,
    width: number,
    clampToGround: boolean
  ): void;
  tagEntities(dataSource: DataSource, layerId: string): void;
  register(
    id: string,
    title: string,
    layerType: LayerType,
    cesiumObject: DataSource,
    isBasemap: boolean,
    initialFillColor?: string
  ): ManagedLayer;
  recordInitialStyle(id: string, colorHex: string, fillOpacity: number, outline: OutlineStyle): void;
  removeLayer(id: string): void;
  readonly defaultOutlineColorHex: string;
}

export class ShapeLayerBridge {
  // Cizim Katmani VE Olcu Katmani'ndaki (bkz addDrawnShape/addMeasuredShape)
  // sekillere, katman icinde SIRALI (1'den baslayan) bir "id" oznitelik
  // alani atamak icin katman id'sine gore tutulan sayac -- katmandaki
  // sekillerin EKLENME sirasina gore artar, silinen bir sekilin sayaci
  // GERI ALINMAZ (ör. 3 sekilden 2.si silinirse bir sonraki sekil 4 alir,
  // 3 degil). Katman tamamen kaldirilinca (bkz LayerManager.removeLayer)
  // deleteCounter() ile silinir ki katman yeniden olusunca (bkz
  // addDrawnShape/addMeasuredShape) sayac 1'den baslasin.
  private readonly drawnShapeCounters = new Map<string, number>();

  constructor(
    private readonly viewer: Viewer,
    private readonly deps: ShapeLayerBridgeDeps
  ) {}

  deleteCounter(id: string): void {
    this.drawnShapeCounters.delete(id);
  }

  /**
   * DrawingManager'in tamamladığı bir şekli tek, kalıcı "Çizim Katmanı"na
   * ekler (Map, draw:complete dinleyicisinde çağırır). Katman ilk çağrıda
   * (henüz yoksa) boş bir CustomDataSource olarak oluşturulur; sonraki her
   * çağrı AYNI katmana yeni bir entity ekler -- id her seferinde assertUniqueId'ye
   * takılmadan register() edilebilsin diye bu, public add() ÜZERİNDEN DEĞİL
   * doğrudan register() ile yapılır.
   *
   * `shape.entity`, DrawingManager tarafından zaten viewer.entities'e eklenmiş
   * durumdadır (kendi cizim stiliyle -- ayrica GeoJSON'a cevrilip yeniden
   * cizilmiyor, boylece TucbsDrawTool'un cizdigi gorunum BIREBIR korunur).
   * Bu yuzden ilk viewer.entities'ten cikarilip hedef DataSource'a tasinir.
   */
  async addDrawnShape(id: string, title: string, shape: DrawnShape): Promise<ManagedLayer> {
    const entity = shape.entity;
    this.viewer.entities.remove(entity);

    // TucbsIdentifyPanel (entity:click) bu sekli tikladiginda oznitelik
    // tablosunda gosterecegi alanlar -- WKT alani "geomwkt" adiyla kullanici
    // istegi geregi sabit; digerleri DrawnShape'in ilgili arac icin doldurdugu
    // alanlara (length/area/perimeter/radius) gore degisir (bkz
    // DrawingManager.buildShape/buildPolygonShape/buildLineShape/
    // buildCircleShape/buildRectangleShape). layerId/featureId asagidaki
    // tagEntities() tarafindan AYRICA eklenir (bkz. o metod). "id" sirali
    // sayaci (1'den baslar) katman kimligine gore tutulur (bkz.
    // drawnShapeCounters).
    const sequentialId = (this.drawnShapeCounters.get(id) ?? 0) + 1;
    this.drawnShapeCounters.set(id, sequentialId);
    entity.properties = buildDrawnShapeProperties(shape, sequentialId);

    const existing = this.deps.getItem(id);
    const dataSource = existing && "entities" in existing.cesiumObject
      ? existing.cesiumObject
      : new CustomDataSource(title);

    // DrawingManager'in tum sekilleri zaten Color.CYAN ile ciziyor (bkz.
    // buildShape/buildPolygonShape/buildLineShape/buildCircleShape/
    // buildRectangleShape) ama HICBIR outline bilgisi ICERMIYOR -- bu yuzden
    // stil (asagida) burada applyEntityStyle ile entity'nin KENDISINE de
    // UYGULANIR; aksi halde bookkeeping "outline acik" derken ekranda hicbir
    // dis hat gorunmezdi. Katman ZATEN VARSA (bu ilk sekil DEGILSE) ve
    // kullanici StyleEditor ile ozel bir stil uygulamissa, YENI sekil de AYNI
    // stille eklenir -- "Tum cizimler AYNI stille gosterilecek" kurali
    // sadece ilk sekilde degil, SONRADAN eklenen her sekilde de gecerli
    // olmali (bkz kullanici geri bildirimi: "farkli bir cizim yaptigimda son
    // stiller ile gelecek, daha once yaptigim stil degisiklikleri katmana
    // yansiyacak"). Katman ilk defa olusuyorsa (existing yok) sabit
    // varsayilana (Color.CYAN) dusulur.
    const currentStyle = existing ? this.deps.getStyle(id) : undefined;
    const fillColor = currentStyle?.fill.mode === "solid"
      ? Color.fromCssColorString(currentStyle.fill.color).withAlpha(currentStyle.fill.opacity)
      : Color.CYAN.withAlpha(0.4);
    const initialOutline: OutlineStyle = currentStyle?.outline ?? {
      enabled: true,
      color: this.deps.defaultOutlineColorHex,
      // Diger vektor katman turlerinin varsayilani (2) ile AYNI DEGIL --
      // Cizim Katmani'nin dis hat genisligi kullanici istegiyle 1 (bkz.
      // TucbsStyleEditor.ts'teki FIXED_SOLID_LAYER_OUTLINE_WIDTH, "Sifirla"
      // islevi de bu degere doner).
      width: 1,
    };
    this.deps.applyEntityStyle(entity, fillColor, initialOutline, true);

    dataSource.entities.add(entity);

    // Alan/Dikdortgen/Daire icin native polygon.outline (yukaridaki
    // applyEntityStyle'in ayarladigi) clampToGround:false'ta da GL_LINE_WIDTH
    // sinirlamasi yuzunden PRATIKTE gorunmuyor -- WFS/GeoJSON'daki
    // clampToGround:true companion-outline teknigi (bkz addPolygonOutlines)
    // BURADA da (clampToGround:false ile) kullanilir.
    if (entity.polygon !== undefined) {
      this.deps.addPolygonOutlineCompanion(
        dataSource,
        entity,
        Color.fromCssColorString(initialOutline.color),
        initialOutline.width,
        false
      );
    }

    if (existing) {
      this.deps.tagEntities(dataSource, id);
      return existing;
    }

    await this.viewer.dataSources.add(dataSource);

    // Rastgele bir renk YERINE gercek gorunumu yansitan sabit bu renk
    // kaydediliyor (TucbsStyleEditor'un "Sifirla" islevi ve TucbsLayerList'in
    // renk noktasi bunu okur).
    const colorHex = Color.CYAN.toCssHexString();
    const managed = this.deps.register(id, title, "DRAWING", dataSource, false, colorHex);
    this.deps.recordInitialStyle(managed.id, colorHex, 0.4, initialOutline);
    return managed;
  }

  /**
   * DrawingManager'in tamamladığı bir ÖLÇÜM şeklini (source==="measure")
   * tek, kalıcı "Ölçü Katmanı"na ekler (Map, draw:complete dinleyicisinde
   * çağırır) -- addDrawnShape ile BİREBİR AYNI mimari/gerekçe (bkz o
   * metodun yorumları); yalnız katman türü ("MEASURE") ve öznitelik alanları
   * (buildMeasuredShapeProperties, "sekil" yerine "olcum_turu") farklıdır.
   */
  async addMeasuredShape(id: string, title: string, shape: DrawnShape): Promise<ManagedLayer> {
    const entity = shape.entity;
    this.viewer.entities.remove(entity);

    const sequentialId = (this.drawnShapeCounters.get(id) ?? 0) + 1;
    this.drawnShapeCounters.set(id, sequentialId);
    entity.properties = buildMeasuredShapeProperties(shape, sequentialId);

    const existing = this.deps.getItem(id);
    const dataSource = existing && "entities" in existing.cesiumObject
      ? existing.cesiumObject
      : new CustomDataSource(title);

    // addDrawnShape'teki AYNI gerekce/davranis (bkz o metod) -- DrawingManager
    // tum sekilleri (olcum araciyla cizilenler dahil) Color.CYAN ile ciziyor
    // ama outline bilgisi ICERMIYOR; stil burada entity'nin KENDISINE
    // uygulanir. Katman zaten varsa (bu ilk olcum DEGILSE) ve kullanici
    // StyleEditor ile ozel bir stil uygulamissa, YENI olcum de AYNI stille
    // eklenir -- "Tum olcumler AYNI stille gosterilecek" kurali sadece ilk
    // olcumde degil, SONRADAN eklenen her olcumde de gecerli olmali (bkz
    // kullanici geri bildirimi).
    const currentStyle = existing ? this.deps.getStyle(id) : undefined;
    const fillColor = currentStyle?.fill.mode === "solid"
      ? Color.fromCssColorString(currentStyle.fill.color).withAlpha(currentStyle.fill.opacity)
      : Color.CYAN.withAlpha(0.4);
    const initialOutline: OutlineStyle = currentStyle?.outline ?? {
      enabled: true,
      color: this.deps.defaultOutlineColorHex,
      width: 1,
    };
    this.deps.applyEntityStyle(entity, fillColor, initialOutline, true);

    dataSource.entities.add(entity);

    // Alan Olc araciyla cizilen poligonlar icin de addDrawnShape'teki AYNI
    // companion-outline teknigi (bkz addPolygonOutlineCompanion) gerekir.
    if (entity.polygon !== undefined) {
      this.deps.addPolygonOutlineCompanion(
        dataSource,
        entity,
        Color.fromCssColorString(initialOutline.color),
        initialOutline.width,
        false
      );
    }

    if (existing) {
      this.deps.tagEntities(dataSource, id);
      return existing;
    }

    await this.viewer.dataSources.add(dataSource);

    const colorHex = Color.CYAN.toCssHexString();
    const managed = this.deps.register(id, title, "MEASURE", dataSource, false, colorHex);
    this.deps.recordInitialStyle(managed.id, colorHex, 0.4, initialOutline);
    return managed;
  }

  // TucbsDeleteTool -> DrawingManager.clearAll()/removeShape(), sekli KENDI
  // viewer.entities'inden silmeye calisir (artik tasindigi icin bu cagri
  // sessizce no-op olur); gercek silme Map'in draw:remove dinleyicisi
  // uzerinden burada yapilir. Katman, son entity'si de silinince TAMAMEN
  // kaldirilir -- "haritada cizim yoksa katman da olmamali" kurali boylece
  // silme sonrasinda da gecerli kalir. Tamamen generic (sadece katman id'sine
  // gore calisir) oldugundan Map, hem Cizim hem Olcu Katmani'nin draw:remove
  // dinleyicisinde AYNI metodu (farkli id ile) cagirir.
  removeDrawnShape(id: string, entity: Entity): void {
    const existing = this.deps.getItem(id);
    if (!existing || !("entities" in existing.cesiumObject)) return;
    // Poligon turu sekiller icin addPolygonOutlineCompanion() ile eklenen
    // ayri outline entity'si de silinir -- aksi halde hem hayalet bir cizgi
    // haritada kalir hem de asagidaki "koleksiyon bos mu" kontrolu companion
    // yuzunden HICBIR ZAMAN true olmaz (katman "tum sekiller silindi" sonrasi
    // da kalici olarak Katman Yonetimi'nde gorunmeye devam ederdi).
    existing.cesiumObject.entities.removeById(`${entity.id}::outline`);
    existing.cesiumObject.entities.remove(entity);
    if (existing.cesiumObject.entities.values.length === 0) {
      this.deps.removeLayer(id);
    }
  }
}

// TucbsDrawTool'un 6 sabit aracinin (bkz DrawTool) Turkce etiketi --
// TucbsDrawTool.ts'teki TOOL_LABELS ile AYNI degerler, ama o UI (buton
// aria-label'i) icin, bu ise oznitelik TABLOSUNDA gosterilecek "sekil"
// alani icin ayri/kucuk bir kopyadir (components paketinden core'a
// bagimlilik EKLEMEMEK icin bilerek tekrarlanir).
export const DRAWN_SHAPE_LABELS: Record<DrawTool, string> = {
  point: "Nokta",
  polyline: "Çizgi",
  polygon: "Alan",
  rectangle: "Dikdörtgen",
  circle: "Daire",
  freehand: "Serbest Çizim",
};

// Metre/m² degerlerini oznitelik tablosunda okunakli kalsin diye 2 ondalige
// yuvarlar (Cartesian3 mesafe hesabi cift hassasiyetli oldugundan ham
// deger anlamsiz sayida ondalik basamak icerir).
export function roundMeters(value: number): number {
  return Math.round(value * 100) / 100;
}

// Lon/lat'i WKT'de ondalik basamak tasmasini onlemek icin 6 haneye
// (yaklasik 11cm hassasiyet, standart GPS konvansiyonu) yuvarlar.
export function roundCoordinate(value: number): number {
  return Math.round(value * 1e6) / 1e6;
}

export function wktCoordinatePair(coordinate: readonly [number, number]): string {
  return `${roundCoordinate(coordinate[0])} ${roundCoordinate(coordinate[1])}`;
}

// DrawingManager'in urettigi 3 geometri turunu (Point/LineString/Polygon --
// bkz DrawnShape.geometry) WKT metnine cevirir. Ek bir bagimlilik (ör.
// "wellknown"/"terraformer-wkt") EKLENMEDI -- sadece bu 3 basit tur icin
// el yazimi donusum yeterli (bkz. "@tucbs/core Cesium-only peer dep"
// kurali, project_ucbp_api_vendor_lite_c3_uygulama memory).
export function geometryToWkt(geometry: Geometry): string {
  switch (geometry.type) {
    case "Point": {
      const coordinate = geometry.coordinates as [number, number];
      return `POINT (${wktCoordinatePair(coordinate)})`;
    }
    case "LineString": {
      const coordinates = geometry.coordinates as [number, number][];
      return `LINESTRING (${coordinates.map((c) => wktCoordinatePair(c)).join(", ")})`;
    }
    case "Polygon": {
      const rings = geometry.coordinates as [number, number][][];
      const ringsWkt = rings
        .map((ring) => `(${ring.map((c) => wktCoordinatePair(c)).join(", ")})`)
        .join(", ");
      return `POLYGON (${ringsWkt})`;
    }
    default:
      // DrawingManager Point/LineString/Polygon disinda bir geometri
      // uretmez -- pratikte ulasilmaz, ama exhaustiveness icin bos donuyoruz.
      return "";
  }
}

// DrawnShape -> TucbsIdentifyPanel oznitelik tablosu alanlari. Sira
// ONEMLI (Object.entries() ekleme sirasini korur, tablo bu sirayla
// render edilir, bkz TucbsIdentifyPanel._renderPropertyTable): "id" HER
// ZAMAN ilk, "geomwkt" HER ZAMAN son, "olusturma_tarihi" sondan bir
// onceki alan (kullanici istegi). Alan/Genislik/Yaricap gibi sadece BAZI
// araclarda dolu olan degerler (bkz DrawnShape) sadece tanimliyken
// eklenir -- boylece ör. bir Nokta'da anlamsiz "alan_m2: undefined" gibi
// bos satirlar gorunmez.
export function buildDrawnShapeProperties(shape: DrawnShape, sequentialId: number): PropertyBag {
  const properties: Record<string, string | number> = {
    id: sequentialId,
    sekil: DRAWN_SHAPE_LABELS[shape.tool],
  };
  if (shape.length !== undefined) properties.uzunluk_m = roundMeters(shape.length);
  if (shape.area !== undefined) properties.alan_m2 = roundMeters(shape.area);
  if (shape.perimeter !== undefined) properties.cevre_m = roundMeters(shape.perimeter);
  if (shape.radius !== undefined) properties.yaricap_m = roundMeters(shape.radius);
  properties.olusturma_tarihi = new Date(shape.createdAt).toLocaleString("tr-TR");
  properties.geomwkt = geometryToWkt(shape.geometry);
  return new PropertyBag(properties);
}

// TucbsMeasureTool'un 2 aracinin ("polyline"/"polygon", bkz o dosyadaki
// MODE_TOOL) Turkce etiketi -- DRAWN_SHAPE_LABELS'tan AYRI tutulur cunku
// olcum baglaminda "Cizgi"/"Alan" yerine "Mesafe"/"Alan" (olcum turu)
// anlamli. Rectangle/circle/point/freehand olcum araciyla HICBIR ZAMAN
// uretilmez (pratikte ulasilmaz) ama Record<DrawTool, string> tip
// butunlugu icin doldurulur.
export const MEASURED_SHAPE_LABELS: Record<DrawTool, string> = {
  point: "Nokta",
  polyline: "Mesafe",
  polygon: "Alan",
  rectangle: "Dikdörtgen",
  circle: "Daire",
  freehand: "Serbest Çizim",
};

// buildDrawnShapeProperties ile AYNI alan sirasi/kurallari (bkz o metod) --
// "sekil" yerine "olcum_turu" adiyla, DRAWN_SHAPE_LABELS yerine
// MEASURED_SHAPE_LABELS okunur. Olcum araci hicbir zaman radius
// uretmedigi icin (bkz MEASURED_SHAPE_LABELS yorumu) o alan hic eklenmez.
export function buildMeasuredShapeProperties(shape: DrawnShape, sequentialId: number): PropertyBag {
  const properties: Record<string, string | number> = {
    id: sequentialId,
    olcum_turu: MEASURED_SHAPE_LABELS[shape.tool],
  };
  if (shape.length !== undefined) properties.uzunluk_m = roundMeters(shape.length);
  if (shape.area !== undefined) properties.alan_m2 = roundMeters(shape.area);
  if (shape.perimeter !== undefined) properties.cevre_m = roundMeters(shape.perimeter);
  properties.olusturma_tarihi = new Date(shape.createdAt).toLocaleString("tr-TR");
  properties.geomwkt = geometryToWkt(shape.geometry);
  return new PropertyBag(properties);
}
