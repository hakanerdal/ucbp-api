import {
  ColorMaterialProperty,
  ConstantProperty,
  Color,
  PointGraphics,
  Math as CesiumMath,
  type JulianDate,
  type DataSource,
  type Entity,
  type Property,
} from "cesium";

import type { OutlineGeometry } from "./OutlineGeometry.js";
import type { OpacityController } from "./OpacityController.js";
import type { FillStyle, OutlineStyle, LayerStyleSpec, PaletteKind } from "../../types/index.js";

// bkz applyLayerStyle'daki "ek yeri ortucu" yorumu.
const SEAM_COVER_WIDTH = 1;
const OUTLINE_ID_SUFFIX = "::outline";

/**
 * Vektör katmanların dolgu/dış-hat stilini (LayerManager.applyLayerStyle) ve
 * ekleme-anı renklendirmesini (randomLayerColor/applyEntityColor/
 * convertMarkersToPoints/recordInitialStyle) yöneten, Viewer'in TAMAMINA
 * değil sadece saat/render-isteği/olay-yayını için canlı okuma
 * fonksiyonlarına ihtiyaç duyan saf modül (bkz
 * project_ucbp_api_god_component_refactor_kurallari 2.3 Hedef Yapi). Kendi
 * DataSource'a-göre-son-uygulanan-stil kaydını (appliedLayerStyles) tutar --
 * companion-outline/opaklık-sarmalı-renk sorularını OutlineGeometry/
 * OpacityController'a (sibling-module DI) devreder.
 */
export class LayerStyleEngine {
  // Vektor katmanlara en son uygulanan stil -- applyLayerStyle() aninda
  // uygulayip unutuyordu, TucbsLegendPanel'in "bu katmana su an hangi stil
  // uygulanmis" sorusunu cevaplayabilmesi icin saklaniyor.
  private readonly appliedLayerStyles = new Map<string, LayerStyleSpec>();
  private readonly appliedCompanionWidths = new Map<string, number>();
  private readonly outlineGeometry: OutlineGeometry;
  private readonly opacityController: OpacityController;
  private readonly getCurrentTime: () => JulianDate;
  private readonly requestRender: () => void;
  private readonly emitStyle: (id: string, style: LayerStyleSpec) => void;
  private readonly waitForRenderSettle: () => Promise<void>;

  constructor(options: {
    readonly outlineGeometry: OutlineGeometry;
    readonly opacityController: OpacityController;
    readonly getCurrentTime: () => JulianDate;
    readonly requestRender: () => void;
    readonly emitStyle: (id: string, style: LayerStyleSpec) => void;
    readonly waitForRenderSettle: () => Promise<void>;
  }) {
    this.outlineGeometry = options.outlineGeometry;
    this.opacityController = options.opacityController;
    this.getCurrentTime = options.getCurrentTime;
    this.requestRender = options.requestRender;
    this.emitStyle = options.emitStyle;
    this.waitForRenderSettle = options.waitForRenderSettle;
  }

  // Donen Promise, GENISLIK gercekten degistiyse (bkz asagidaki widthChanged)
  // waitForRenderSettle() ile cozulur -- cagiran taraf (TucbsStyleEditor)
  // bu Promise'i "Uygulanıyor…" gostergesini ne kadar sure tutacagini
  // bilmek icin kullanabilir. Renk/opaklik gibi geometriye dokunmayan
  // degisikliklerde HEMEN cozulur (yapay bir bekleme EKLENMEZ).
  async applyLayerStyle(
    id: string,
    dataSource: DataSource,
    isShapeLayer: boolean,
    spec: LayerStyleSpec
  ): Promise<void> {
    // Companion'lara FIILEN uygulanan genislik (dis hat kapaliyken ek yeri
    // ortucunun SEAM_COVER_WIDTH'i) -- bkz asagidaki widthChanged.
    const previousWidth =
      this.appliedCompanionWidths.get(id) ?? this.appliedLayerStyles.get(id)?.outline.width;
    const time = this.getCurrentTime();

    const range = this.resolveStyleRange(dataSource, time, spec.fill);

    const outlineCompanions: Entity[] = [];
    // Dis hat KAPALIYKEN ek yeri ortucusu icin (bkz asagisi): poligon id ->
    // cozumlenmis dolgu rengi.
    const fillColors = new Map<string, Color>();
    dataSource.entities.suspendEvents();
    for (const entity of dataSource.entities.values) {
      if (this.outlineGeometry.isOutlineCompanion(entity)) {
        outlineCompanions.push(entity);
        continue;
      }
      const color = this.resolveFillColor(entity, spec.fill, range, time);
      if (entity.polygon !== undefined && color !== undefined) fillColors.set(entity.id, color);
      this.applyEntityStyle(entity, color, spec.outline, isShapeLayer);
    }
    const companionWidth = this.styleOutlineCompanions(
      outlineCompanions,
      spec.outline,
      isShapeLayer,
      fillColors
    );
    dataSource.entities.resumeEvents();

    // Legend panel'in "otomatik hesaplanan min/max ne oldu" sorusunu
    // cevaplayabilmesi icin, spec'i degil COZUMLENMIS (min/max her zaman
    // dolu) halini saklıyoruz.
    const resolvedSpec: LayerStyleSpec =
      range !== null && (spec.fill.mode === "gradient" || spec.fill.mode === "bin")
        ? { ...spec, fill: { ...spec.fill, min: range.min, max: range.max } }
        : spec;
    this.appliedLayerStyles.set(id, resolvedSpec);

    // setDataSourceOpacity() ile AYNI gerekce -- outline GENISLIGI gibi
    // gercekten geometri gerektiren degisikliklerde Cesium'un ilgili
    // primitive'i ASENKRON (worker'lar uzerinden, birden fazla kare
    // suren) yeniden kurmasi gerekebilir; bu SADECE sahne zaten "bir sey
    // degisti" diye render istedigi kareler arasinda TAMAMLANIR. Bunu
    // acikca istemek, kullanicinin fareyi HAREKET ETTIRENE kadar (kaza en
    // sonraki bir baska event render'i tetikleyene dek) buyuk katmanlarda
    // ekranin GUNCELLENMIS gorunmemesi riskini azaltir (bkz kullanici
    // bildirimi).
    this.requestRender();
    this.emitStyle(id, resolvedSpec);

    // bkz waitForRenderSettle() yorumu -- SADECE genislik GERCEKTEN
    // degistiyse bekleniyor (bu, GroundPolylineGeometry'nin pahali baştan
    // tessellate edilmesini tetikleyen TEK alan -- bkz addPolygonOutlines
    // WHY yorumu); renk/opaklik/palet gibi diger TUM degisikliklerde bu
    // dal hic calismiyor, Promise HEMEN cozuluyor.
    this.appliedCompanionWidths.set(id, companionWidth);
    const widthChanged =
      previousWidth === undefined || previousWidth !== companionWidth;
    if (widthChanged) await this.waitForRenderSettle();
  }

  // God component refactor Faz 3.6b: applyLayerStyle'in companion (dis hat)
  // dongusu buraya tasindi (applyLayerStyle karmasikligi 23 -> <20); davranis
  // DEGISMEDI. Donus: companion'lara FIILEN uygulanan genislik (dis hat
  // kapaliyken SEAM_COVER_WIDTH) -- applyLayerStyle bunu render-bekleme
  // karari icin saklar (bkz widthChanged).
  private styleOutlineCompanions(
    companions: readonly Entity[],
    outline: OutlineStyle,
    isShapeLayer: boolean,
    fillColors: ReadonlyMap<string, Color>
  ): number {
    // Companion'lar spec.fill'i hic gormez -- dolgu modu/rengi ne olursa
    // olsun dis hat tek, tutarli bir renk/kalinlikta kalir (choropleth
    // haritalarda standart davranis) ve LayerList'ten dolgu rengi
    // degistirmek dis hatta hic dokunmaz.
    //
    // Istisna -- ek yeri ortucu: zemine oturan (GroundPrimitive) KOMSU
    // poligonlarin ortak kenarinda Cesium hicbirinin boyamadigi pikseller
    // birakir; opak dolguda altlik bu "noktacik"lardan gorunur (ilce/parsel
    // katmanlari; olculdu: 10.000 komsu parselde %8,28 sizinti). Dis hat
    // KAPALIYKEN companion gizlenmek yerine poligonun KENDI dolgu renginde
    // 1 px cizilir -- gorunurde dis hat yoktur ama ek yerleri kapanir
    // (olculdu: %0,07). SADECE tam opak dolguda: yari saydam dolguda cizgi
    // dolguyla ust uste binip kenarlarda koyu bir hat birakirdi.
    const outlineColor = outline.enabled
      ? Color.fromCssColorString(outline.color)
      : undefined;
    const companionWidth = outline.enabled ? outline.width : SEAM_COVER_WIDTH;
    for (const companion of companions) {
      const seamColor =
        outline.enabled || isShapeLayer
          ? undefined
          : fillColors.get(LayerStyleEngine.outlineOwnerId(companion));
      const seamCover = seamColor !== undefined && seamColor.alpha >= 1;
      companion.show = outline.enabled || seamCover;
      const color = outlineColor ?? (seamCover ? seamColor : undefined);
      if (color !== undefined && companion.polyline !== undefined) {
        // updateColorMaterial/updateConstantProperty ile AYNI gerekce (bkz o
        // metodlarin yorumu) -- companion'in polyline'i, Cizim/Olcu
        // Katmani'ndaki poligonlarin GORUNEN dis hattini temsil eder; HER
        // stil guncellemesinde bu alanlara YENI property atamak sekli
        // bir-iki kare kaybolup geri gelmeye (flicker) yol aciyordu.
        companion.polyline.material = this.updateColorMaterial(
          companion.polyline.material,
          color
        );
        companion.polyline.width = LayerStyleEngine.updateConstantProperty(
          companion.polyline.width,
          companionWidth
        );
      }
    }
    return companionWidth;
  }

  // OutlineGeometry.addPolygonOutlineCompanion companion id'sini
  // `${poligonId}::outline` olarak verir.
  private static outlineOwnerId(companion: Entity): string {
    return companion.id.endsWith(OUTLINE_ID_SUFFIX)
      ? companion.id.slice(0, -OUTLINE_ID_SUFFIX.length)
      : companion.id;
  }

  /** Bir vektor katmana en son uygulanan stili döndürür (TucbsLegendPanel için). */
  getStyle(id: string): LayerStyleSpec | undefined {
    return this.appliedLayerStyles.get(id);
  }

  /** Katman silinirken (LayerManager.remove) son uygulanan stil kaydini da temizler. */
  deleteStyle(id: string): void {
    this.appliedLayerStyles.delete(id);
    this.appliedCompanionWidths.delete(id);
  }

  // Katman eklenirken atanan random rengi appliedLayerStyles'a "solid" stil
  // olarak kaydeder ve layer:style event'ini emit eder — TucbsStyleEditor ve
  // TucbsLayerList katman eklendigi an getLayerStyle() ile gercek/guncel
  // rengi okuyabilsin diye (bkz. ManagedLayer.initialFillColor: bu kayit
  // SONRAKI applyLayerStyle() cagrilariyla degisir, initialFillColor ise
  // sabit kalir ve "Sifirla" icin referans noktasidir).
  recordInitialStyle(
    id: string,
    colorHex: string,
    fillOpacity: number,
    outline: OutlineStyle
  ): void {
    const style: LayerStyleSpec = {
      fill: { mode: "solid", color: colorHex, opacity: fillOpacity },
      outline,
    };
    this.appliedLayerStyles.set(id, style);
    this.emitStyle(id, style);
  }

  // Yerel dosyadan (GeoJSON/KML/KMZ/SHP) gelen her katman, Cesium'un varsayilan
  // sari renginde eklenmesin diye her eklemede rastgele bir renk alir.
  randomLayerColor(): Color {
    return Color.fromRandom({ alpha: 1.0 });
  }

  // Iki cagiran grubu var: (1) KmlDataSource kendi stilini KML dosyasindan
  // alir, GeoJsonDataSource.load'daki fill/stroke/markerColor secenekleri
  // burada gecerli olmadigindan entity'lere yuklendikten sonra renk uygulanir.
  // (2) addWFS/addLocalKmlGeoJson(GEOJSON)/addShp -- GeoJsonDataSource.load
  // GeoJSON'da per-feature simplestyle "fill" alani yoksa TUM entity'lere TEK
  // bir PAYLASILAN materyal nesnesi atiyor; applyLayerStyle()'daki
  // updateColorMaterial() ise flicker'i onlemek icin bu nesneyi YENIDEN
  // OLUSTURMAK yerine yerinde mutasyona ugratiyor -- ikisi birlesince enum/
  // gradient/bin modunda TUM poligonlar en son islenen entity'nin rengini
  // gosteriyordu. Burada her entity'ye BASTAN bagimsiz bir materyal nesnesi
  // vererek bu paylasimi kiriyoruz.
  applyEntityColor(dataSource: DataSource, color: Color): void {
    dataSource.entities.suspendEvents();
    for (const entity of dataSource.entities.values) {
      if (entity.polygon !== undefined) {
        entity.polygon.material = new ColorMaterialProperty(
          new ConstantProperty(color.withAlpha(0.5))
        );
      }
      if (entity.polyline !== undefined) {
        entity.polyline.material = new ColorMaterialProperty(
          new ConstantProperty(color)
        );
      }
      if (entity.point !== undefined) {
        entity.point.color = new ConstantProperty(color);
      }
      if (entity.billboard !== undefined) {
        entity.billboard.color = new ConstantProperty(color);
      }
    }
    dataSource.entities.resumeEvents();
  }

  // GeoJsonDataSource.load, Point/MultiPoint geometrileri icin HER ZAMAN
  // Cesium'in varsayilan PinBuilder billboard'ini (yer isareti/pin gorunumu)
  // uretir -- "markerColor" gibi secenekler SADECE bu pin'in rengini/boyutunu
  // degistirir, load-time'da "point" (daire) grafigine gecmenin bir secenegi
  // YOKTUR. WFS/GeoJSON/SHP katmanlarindaki nokta ozellikleri, Cizim/Olcu
  // Katmani ve CSV katmaniyla (bkz addCsv) AYNI "bilinen nokta stili"nde
  // (renkli daire) gorunmeli -- varsayilan pin "yer isareti" gibi
  // algilaniyordu (bkz kullanici geri bildirimi). Load SONRASI cagrilip
  // billboard'lari native point grafigine CEVIRIR. KML'i KAPSAMAZ (bkz
  // applyEntityColor) -- oradaki billboard KML dosyasinin KENDI ikonu,
  // generic bir pin degil.
  convertMarkersToPoints(dataSource: DataSource, color: Color): void {
    dataSource.entities.suspendEvents();
    for (const entity of dataSource.entities.values) {
      if (entity.billboard === undefined) continue;
      // clampToGround:true'da GeoJsonDataSource billboard'a CLAMP_TO_GROUND
      // verir -- point'e AKTARILMAZSA nokta elipsoitte (0 m) kalip arazinin
      // altina duser ve pan/zoom'da yerinden kayiyormus gibi gorunur.
      const heightReference = entity.billboard.heightReference;
      entity.point = new PointGraphics({
        pixelSize: 8,
        color,
        ...(heightReference !== undefined ? { heightReference } : {}),
      });
      entity.billboard = undefined;
    }
    dataSource.entities.resumeEvents();
  }

  // _addDrawnShape/_addMeasuredShape (LayerManager.ts) applyLayerStyle'dan
  // BAGIMSIZ olarak dogrudan cagirir (yeni cizilen/olculen sekle ilk stili
  // uygulamak icin) -- bu yuzden public.
  applyEntityStyle(
    entity: Entity,
    color: Color | undefined,
    outline: OutlineStyle,
    isShapeLayer: boolean
  ): void {
    const outlineColor = outline.enabled
      ? Color.fromCssColorString(outline.color)
      : undefined;

    // "off"/deger-cozumlenemedi durumunda entity.polygon.material'a undefined
    // atamak TS'te MaterialProperty tipiyle celisiyor (Cesium'un kendi tip
    // tanimi optional degil); ayni gorsel sonucu (hicbir dolgu) tam saydam
    // bir renkle veriyoruz.
    if (entity.polygon !== undefined) {
      entity.polygon.material = this.updateColorMaterial(
        entity.polygon.material,
        color ?? Color.WHITE.withAlpha(0)
      );
      // Bir companion'i OLAN entity'lerde (bkz entitiesWithOutlineCompanion)
      // native outline/outlineColor/outlineWidth alanlarina HIC dokunulmaz --
      // addPolygonOutlineCompanion bu alani KALICI olarak false birakmis,
      // gorsel dis hatti ayri bir companion polyline (bkz applyLayerStyle'daki
      // outlineCompanions dongusu) temsil ediyor. AYNI sekilde "riskli"
      // (antimeridyen/kutup, bkz entitiesWithRiskyOutline WHY yorumu)
      // isaretli entity'lerde de outline'a DOKUNULMAZ -- aksi halde
      // kullanicinin "Dis Hat"i acmasi Cesium'un "Invalid array length"
      // crash'ini yeniden tetikler.
      if (
        !this.outlineGeometry.hasOutlineCompanion(entity) &&
        !this.outlineGeometry.hasRiskyOutline(entity)
      ) {
        entity.polygon.outline = LayerStyleEngine.updateConstantProperty(
          entity.polygon.outline,
          outline.enabled
        );
        if (outlineColor !== undefined) {
          entity.polygon.outlineColor = LayerStyleEngine.updateConstantProperty(
            entity.polygon.outlineColor,
            outlineColor
          );
          // Companion'i OLMAYAN poligonlarda (ör. clampToGround:false, companion
          // hic olusturulmamis vektor katmanlari) "Genislik" alani ONCEDEN hic
          // set edilmiyordu, sessizce yoksayiliyordu -- burada duzeltiliyor.
          entity.polygon.outlineWidth = LayerStyleEngine.updateConstantProperty(
            entity.polygon.outlineWidth,
            outline.width
          );
        }
      }
    }
    if (entity.polyline !== undefined) {
      // Cizim Katmani'nda Cizgi/Serbest Cizim araclariyla, Olcu Katmani'nda
      // ise Mesafe Olc araciyla cizilen bir polyline BASKA bir poligonun
      // sinirini degil, TEK BASINA bagimsiz bir cizimi/olcumu temsil eder --
      // bir "alani" olmadigindan "Dolgu" (Renk/Opaklik) bu sekiller icin
      // ANLAMSIZDIR; SADECE "Dis Hat" (Renk/Genislik/Etkin) alanindan
      // etkilenir ve onunla senkron calisir. Etkin kapatilirsa Dolgu'ya
      // DUSMEZ, cizgi tamamen gizlenir (tam saydam). Diger katman turlerinde
      // (WFS/GeoJSON/SHP vb.) bir LineString ozelligi semantik olarak bir
      // "hat/sinir" oldugundan mevcut davranis (dis hat rengi, etkin degilse
      // dolguya duser) KORUNUR.
      let lineColor: Color | undefined;
      if (isShapeLayer) {
        lineColor = outlineColor ?? Color.WHITE.withAlpha(0);
      } else {
        lineColor = outline.enabled ? outlineColor : color;
      }
      entity.polyline.material = this.updateColorMaterial(
        entity.polyline.material,
        lineColor ?? Color.WHITE.withAlpha(0)
      );
      if (outline.enabled) {
        entity.polyline.width = LayerStyleEngine.updateConstantProperty(
          entity.polyline.width,
          outline.width
        );
      }
    }
    if (entity.point !== undefined) {
      entity.point.color =
        color !== undefined
          ? this.updateColorProperty(entity.point.color, color)
          : undefined;
      if (outline.enabled && outlineColor !== undefined) {
        entity.point.outlineColor = LayerStyleEngine.updateConstantProperty(
          entity.point.outlineColor,
          outlineColor
        );
        entity.point.outlineWidth = LayerStyleEngine.updateConstantProperty(
          entity.point.outlineWidth,
          outline.width
        );
      }
    }
    if (entity.billboard !== undefined && color !== undefined) {
      entity.billboard.color = this.updateColorProperty(
        entity.billboard.color,
        color
      );
    }
  }

  private resolveFillColor(
    entity: Entity,
    fill: FillStyle,
    range: { min: number; max: number } | null,
    time: JulianDate
  ): Color | undefined {
    switch (fill.mode) {
      case "off":
        return undefined;

      case "solid":
        return Color.fromCssColorString(fill.color).withAlpha(fill.opacity);

      case "gradient": {
        if (range === null) return undefined;
        const value = this.readNumericProperty(entity, fill.column, time);
        if (value === null) return undefined;
        // Min-Max disindaki degerler renklendirilmez (clamp ile uc renge
        // BOYANMAZ) -- Min/Max ayni zamanda bir filtre.
        if (value < range.min || value > range.max) return undefined;
        const t =
          range.max === range.min
            ? 0.5
            : CesiumMath.clamp((value - range.min) / (range.max - range.min), 0, 1);
        return LayerStyleEngine.sampleFromPalette(fill.palette, t, fill.paletteKind).withAlpha(
          fill.opacity
        );
      }

      case "bin": {
        if (range === null) return undefined;
        const value = this.readNumericProperty(entity, fill.column, time);
        if (value === null) return undefined;
        const step = (range.max - range.min) / fill.binCount;
        const boundaries = Array.from(
          { length: fill.binCount },
          (_, i) => range.min + step * (i + 1)
        );
        const index = LayerStyleEngine.pickBin(value, boundaries);
        const t = fill.binCount <= 1 ? 0.5 : index / (fill.binCount - 1);
        return LayerStyleEngine.sampleFromPalette(fill.palette, t, fill.paletteKind).withAlpha(
          fill.opacity
        );
      }

      case "enum": {
        const value = this.readProperty(entity, fill.column, time);
        if (value === null) return undefined;
        const cssColor = fill.colors[String(value)];
        return cssColor !== undefined
          ? Color.fromCssColorString(cssColor).withAlpha(fill.opacity)
          : Color.LIGHTGRAY.withAlpha(fill.opacity);
      }
    }
  }

  // applyLayerStyle() ve okuma metodlarinin (getUniqueColumnValues/getColumnRange)
  // paylastigi ortak property-okuma yardimcilari. entity.properties bir
  // PropertyBag'dir; getValue(time) TUM alanlari coz(ulmus) duz bir objede
  // dondurur (register()'daki tagEntities() ile eklenen layerId/featureId de
  // dahil, cagiran taraf onlari filtreliyor).
  readProperty(
    entity: Entity,
    column: string,
    time: JulianDate
  ): string | number | null {
    const bag = entity.properties;
    if (bag === undefined || !bag.hasProperty(column)) return null;
    const resolved = bag.getValue(time) as Record<string, unknown> | undefined;
    const value = resolved?.[column];
    if (value === undefined || value === null) return null;
    return typeof value === "number" ? value : String(value);
  }

  private readNumericProperty(
    entity: Entity,
    column: string,
    time: JulianDate
  ): number | null {
    const value = this.readProperty(entity, column, time);
    if (value === null) return null;
    const numeric = typeof value === "number" ? value : Number(value);
    return Number.isFinite(numeric) ? numeric : null;
  }

  // Gercek hatalar plani H7.2: gradient/bin araliginin her ucu AYRI AYRI
  // cozulur -- verilen uc aynen kullanilir, verilmeyen uc kolonun veri
  // araligindan alinir (GradientFillStyle/BinFillStyle sozlesmesi, bkz
  // layer.types.ts: min ve max icin ayri ayri "verilmezse veriden otomatik
  // hesaplanir"). Iki uc da verilmisse kolon araligi HIC hesaplanmaz
  // (tum entity'leri dolasan getColumnRange() maliyeti eskisi gibi yok).
  // ESKIDEN yalniz IKI UC BIRDEN verildiginde verilenler kullaniliyordu;
  // biri eksikse VERILEN uc da atilip tum kolon araligina geciliyordu --
  // StyleEditor'da Min girilip Max "Otomatik" birakilinca (ya da tersi)
  // girilen sinir haritaya hic yansimiyordu (saklanan stil de tum araligi
  // tasidigi icin lejant paneli/yazdirma da onu gosteriyordu).
  // Karar 1-A: uclardan biri veriden gelince min > max olabilir (orn. veri
  // 10-100 iken yalniz min: 150); buna EK bir kural uygulanmaz -- iki uc da
  // verilmis ters aralik da bugun oldugu gibi aynen gecer. UI (StyleEditor
  // checkGradientBound/computeMinMax) bunu zaten engeller; dogrudan API
  // cagiran taraf sorumludur (bkz LayerManager.applyLayerStyle JSDoc'u).
  private resolveStyleRange(
    dataSource: DataSource,
    time: JulianDate,
    fill: FillStyle
  ): { min: number; max: number } | null {
    if (fill.mode !== "gradient" && fill.mode !== "bin") return null;
    if (fill.min !== undefined && fill.max !== undefined) return { min: fill.min, max: fill.max };
    const data = this.getColumnRange(dataSource, time, fill.column);
    if (data === null) return null;
    return { min: fill.min ?? data.min, max: fill.max ?? data.max };
  }

  /** Bir kolonun sayısal min/max aralığını döndürür (gradient/bin modunda min/max'tan verilmeyen uç için otomatik kullanılır). LayerManager.getColumnRange için de tek doğru kaynak. */
  getColumnRange(
    dataSource: DataSource,
    time: JulianDate,
    column: string
  ): { min: number; max: number } | null {
    let min = Infinity;
    let max = -Infinity;
    for (const entity of dataSource.entities.values) {
      const value = this.readNumericProperty(entity, column, time);
      if (value === null) continue;
      if (value < min) min = value;
      if (value > max) max = value;
    }
    return Number.isFinite(min) && Number.isFinite(max) ? { min, max } : null;
  }

  // StyleEditor'de HER stil guncellemesinde (Dolgu/Dis Hat farketmez, tum
  // spec her seferinde yeniden gonderiliyor -- bkz TucbsStyleEditor
  // _scheduleApplyStyle) entity.polygon.outline/outlineWidth,
  // entity.polyline.width gibi GEOMETRI-ETKILEYEN Cesium graphics alanlarina
  // HER ZAMAN YENI bir ConstantProperty atamak (degeri ayni olsa BILE)
  // Cesium'un ilgili GeometryUpdater'ini "bu alan yapisal olarak degisti"
  // sanip altyapi Primitive'ini YIKIP YENIDEN KURMASINA yol aciyordu --
  // sekiller (ozellikle dis hat/"stroke") bir-iki kare kaybolup geri
  // geliyordu. VAR OLAN property zaten bir ConstantProperty ise SADECE
  // deger GERCEKTEN farkliysa setValue() ile YERINDE guncellenir --
  // ConstantProperty.setValue() bile deger ayni olsa "degisti" sayip
  // definitionChanged FIRLATABILDIGI icin (gercek kullanici geri bildirimi:
  // renk barinda SURUKLEYEREK hizli gecis yaparken -- her frame'de renk
  // GERCEKTEN degisirken width DEGISMEDIGI halde yine de "setValue"
  // cagriliyordu -- flicker acikca goruluyordu, ama tek tek tiklamada
  // GORULMUYORDU cunku tek bir gereksiz cagri COK DAHA AZ fark ediliyordu)
  // deger DEGISMEDIYSE property'ye HIC DOKUNULMAZ. Property yoksa (ilk
  // kurulum) yeni bir ConstantProperty olusturulup dondurulur.
  private static valueEquals(a: unknown, b: unknown): boolean {
    if (a instanceof Color || b instanceof Color) {
      return a instanceof Color && b instanceof Color && Color.equals(a, b);
    }
    return a === b;
  }

  private static updateConstantProperty<T>(
    current: unknown,
    value: T
  ): ConstantProperty {
    if (current instanceof ConstantProperty) {
      if (!LayerStyleEngine.valueEquals(current.getValue(), value)) {
        current.setValue(value);
      }
      return current;
    }
    return new ConstantProperty(value);
  }

  // entity.polygon/polyline.material.color, entity.point.color,
  // entity.billboard.color gibi "dolgu" renkleri prepareDataSourceOpacity()
  // tarafindan bir opaklik CallbackProperty'sine SARILMIS OLABILIR (bkz o
  // metod ve dataSourceOpacityProperties). updateConstantProperty'nin
  // ConstantProperty kontrolu bu CallbackProperty'yi TANIMADIGI icin (o bir
  // ConstantProperty DEGIL) her stil guncellemesinde -- ozellikle renk
  // barinda hizlica surukleyip HER FRAME'DE gercekten degisen bir renk
  // gonderilirken -- bu alan HER SEFERINDE brand-new bir property ile
  // DEGISTIRILIYORDU; bu da hem opaklik sarmalayicisini kaybediyor HEM DE
  // (asil "hızlı sürüklemede net flicker" nedeni) entity'nin materyal/renk
  // alanini GEREKSIZ yere surekli degistiriyordu. Property zaten opaklik-
  // sarmali ise, DataSourceOpacityProperties WeakMap'inden sarmalayicinin
  // ICINDEKI mutable baz rengi okunup DOGRUDAN guncellenir -- property
  // NESNESI (ve dolayisiyla entity alaninin referansi) HIC DEGISMEZ,
  // Cesium'un "yapisal degisiklik" tespit etme sansı olmaz.
  private updateColorProperty(
    current: Property | undefined,
    color: Color
  ): Property {
    const opacityBaseColor =
      current !== undefined
        ? this.opacityController.getWrappedBaseColor(current)
        : undefined;
    if (opacityBaseColor !== undefined) {
      Color.clone(color, opacityBaseColor);
      return current!;
    }
    if (current instanceof ConstantProperty) {
      if (!LayerStyleEngine.valueEquals(current.getValue(), color)) {
        current.setValue(color);
      }
      return current;
    }
    return new ConstantProperty(color);
  }

  // Ayni gerekceyle (bkz updateColorProperty) -- entity.polygon.material/
  // polyline.material gibi materyal alanlarina HER ZAMAN YENI bir
  // ColorMaterialProperty atamak yerine, VAR OLAN materyal zaten bu yapida
  // ise SADECE ic renk property'sini (opaklik-farkinda) guncelleriz.
  private updateColorMaterial(
    current: unknown,
    color: Color
  ): ColorMaterialProperty {
    if (current instanceof ColorMaterialProperty) {
      current.color = this.updateColorProperty(current.color, color);
      return current;
    }
    return new ColorMaterialProperty(this.updateColorProperty(undefined, color));
  }

  // qualitative paletler (Set2/Tableau10 vb.) AYRIK kategorik renk setleridir --
  // karistirilirsa palette'te hic olmayan bulanik ara tonlar cikar. sequential/
  // diverging (rampa) paletlerde ise dogrusal karisim (lerp) beklenen davranistir.
  // paletteKind verilmezse (geriye donuk uyumluluk) sequential gibi davranilir.
  private static sampleFromPalette(
    palette: readonly string[],
    t: number,
    paletteKind: PaletteKind | undefined
  ): Color {
    return paletteKind === "qualitative"
      ? LayerStyleEngine.sampleDiscrete(palette, t)
      : LayerStyleEngine.sampleGradient(palette, t);
  }

  // Hand-rolled lineer interpolasyon: d3-scale-chromatic gibi ek bagimlilik
  // EKLENMEDI (bkz. project_ucbp_api_styleeditor_arastirma — "@tucbs/core
  // Cesium-only peer dep" kurali).
  private static sampleGradient(palette: readonly string[], t: number): Color {
    if (palette.length === 0) return Color.GRAY;
    if (palette.length === 1) return Color.fromCssColorString(palette[0]!);

    const scaled = CesiumMath.clamp(t, 0, 1) * (palette.length - 1);
    const lowIndex = Math.floor(scaled);
    const highIndex = Math.min(palette.length - 1, lowIndex + 1);
    const localT = scaled - lowIndex;
    const low = Color.fromCssColorString(palette[lowIndex]!);
    const high = Color.fromCssColorString(palette[highIndex]!);
    return Color.lerp(low, high, localT, new Color());
  }

  // Karistirma yok -- en yakin palet rengine "yuvarlanir" (qualitative paletler
  // icin, sampleGradient'in dogrusal-karisim davranisinin yerine).
  private static sampleDiscrete(palette: readonly string[], t: number): Color {
    if (palette.length === 0) return Color.GRAY;
    const index = Math.round(CesiumMath.clamp(t, 0, 1) * (palette.length - 1));
    return Color.fromCssColorString(palette[index]!);
  }

  private static pickBin(value: number, boundaries: readonly number[]): number {
    for (let i = 0; i < boundaries.length; i++) {
      if (value <= boundaries[i]!) return i;
    }
    return boundaries.length - 1;
  }
}
