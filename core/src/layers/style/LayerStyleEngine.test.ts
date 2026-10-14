// LayerStyleEngine'in public yuzeyi icin izole birim testleri --
// applyLayerStyle/applyEntityStyle'in derinlemesine (solid/gradient/
// companion-outline/flicker-onleme) davranisi zaten LayerManager
// karakterizasyon testlerinde (LayerManager.characterization.test.ts,
// "applyLayerStyle" describe blogu) gercek LayerManager.add() akisi
// uzerinden kapsaniyor -- bu dosya SADECE oradan erisilemeyen/dogrudan
// public yuzeyi (getColumnRange/recordInitialStyle/getStyle/deleteStyle/
// randomLayerColor/applyEntityColor/convertMarkersToPoints) hedefler.
// resolveFillColor/updateColorProperty/updateColorMaterial/valueEquals/
// updateConstantProperty/sampleFromPalette/pickBin PRIVATE oldugu icin (bkz
// project_ucbp_api_god_component_refactor_kurallari 2.3 Hedef Yapi) burada
// da DOLAYLI test edilir. Gercek Cesium siniflari + gercek OutlineGeometry/
// OpacityController instance'lari kullanilir (spike bulgusu: DOM/WebGL
// olmadan calisiyorlar), hicbir mock yok.
import { describe, expect, it, vi } from "vitest";
import {
  BillboardGraphics,
  Cartesian3,
  Color,
  ColorMaterialProperty,
  ConstantProperty,
  CustomDataSource,
  Entity,
  HeightReference,
  JulianDate,
  PointGraphics,
  PolygonGraphics,
  PolygonHierarchy,
} from "cesium";
import { LayerStyleEngine } from "./LayerStyleEngine.js";
import { OutlineGeometry } from "./OutlineGeometry.js";
import { OpacityController } from "./OpacityController.js";

function createEngine(): {
  engine: LayerStyleEngine;
  emitStyle: ReturnType<typeof vi.fn>;
  requestRender: ReturnType<typeof vi.fn>;
} {
  const emitStyle = vi.fn();
  const requestRender = vi.fn();
  const engine = new LayerStyleEngine({
    outlineGeometry: new OutlineGeometry({ getCurrentTime: () => JulianDate.now() }),
    opacityController: new OpacityController({ requestRender: () => {} }),
    getCurrentTime: () => JulianDate.now(),
    requestRender,
    emitStyle,
    waitForRenderSettle: () => Promise.resolve(),
  });
  return { engine, emitStyle, requestRender };
}

/** Poligonun ColorMaterialProperty rengini okur; renk property'si yoksa test aciklayici bicimde kirilir. */
function polygonColor(entity: Entity): Color {
  const material = entity.polygon!.material as ColorMaterialProperty;
  expect(material.color).toBeDefined();
  return material.color!.getValue(JulianDate.now()) as Color;
}

function addPolygonEntity(dataSource: CustomDataSource, id: string, properties?: Record<string, unknown>): Entity {
  return dataSource.entities.add(
    new Entity({
      id,
      ...(properties && { properties }),
      polygon: new PolygonGraphics({
        hierarchy: new PolygonHierarchy([
          Cartesian3.fromDegrees(32.8, 39.9),
          Cartesian3.fromDegrees(32.9, 39.9),
          Cartesian3.fromDegrees(32.9, 40.0),
        ]),
        material: new ColorMaterialProperty(Color.RED),
      }),
    })
  );
}

describe("LayerStyleEngine", () => {
  describe("getColumnRange", () => {
    it("entity'lerdeki sayisal degerlerin min/max'ini dondurur", () => {
      const { engine } = createEngine();
      const ds = new CustomDataSource("test");
      addPolygonEntity(ds, "a", { deger: 10 });
      addPolygonEntity(ds, "b", { deger: 30 });
      addPolygonEntity(ds, "c", { deger: 20 });

      const range = engine.getColumnRange(ds, JulianDate.now(), "deger");

      expect(range).toEqual({ min: 10, max: 30 });
    });

    it("hicbir entity'de kolon yoksa null dondurur", () => {
      const { engine } = createEngine();
      const ds = new CustomDataSource("test");
      addPolygonEntity(ds, "a", { baska: 1 });

      expect(engine.getColumnRange(ds, JulianDate.now(), "deger")).toBeNull();
    });
  });

  describe("recordInitialStyle / getStyle / deleteStyle", () => {
    it("solid stil olarak kaydeder, emitStyle'i cagirir ve getStyle ile okunabilir", () => {
      const { engine, emitStyle } = createEngine();

      engine.recordInitialStyle("layer-1", "#ff0000", 0.5, {
        enabled: true,
        color: "#000000",
        width: 2,
      });

      const style = engine.getStyle("layer-1");
      expect(style?.fill).toEqual({ mode: "solid", color: "#ff0000", opacity: 0.5 });
      expect(emitStyle).toHaveBeenCalledWith("layer-1", style);
    });

    it("deleteStyle sonrasi getStyle undefined dondurur", () => {
      const { engine } = createEngine();
      engine.recordInitialStyle("layer-1", "#ff0000", 0.5, {
        enabled: true,
        color: "#000000",
        width: 2,
      });

      engine.deleteStyle("layer-1");

      expect(engine.getStyle("layer-1")).toBeUndefined();
    });
  });

  it("randomLayerColor her cagrida alpha:1 tam-opak bir renk dondurur", () => {
    const { engine } = createEngine();
    const color = engine.randomLayerColor();
    expect(color.alpha).toBe(1);
  });

  it("applyEntityColor: polygon/polyline/point/billboard alanlarina BAGIMSIZ materyal nesneleri atar (paylasim yok)", () => {
    const { engine } = createEngine();
    const ds = new CustomDataSource("test");
    const e1 = addPolygonEntity(ds, "a");
    const e2 = addPolygonEntity(ds, "b");

    engine.applyEntityColor(ds, Color.BLUE);

    expect(e1.polygon!.material).not.toBe(e2.polygon!.material);
    const value = polygonColor(e1);
    expect(value.alpha).toBeCloseTo(0.5);
  });

  it("convertMarkersToPoints: billboard'i olan entity'leri renkli point'e cevirir, billboard'u kaldirir", () => {
    const { engine } = createEngine();
    const ds = new CustomDataSource("test");
    const entity = ds.entities.add(new Entity({ id: "marker-1" }));
    entity.billboard = new BillboardGraphics({});

    engine.convertMarkersToPoints(ds, Color.GREEN);

    expect(entity.billboard).toBeUndefined();
    expect(entity.point).toBeInstanceOf(PointGraphics);
  });

  it("convertMarkersToPoints: billboard'in heightReference'ini (clampToGround) point'e aktarir", () => {
    const { engine } = createEngine();
    const ds = new CustomDataSource("test");
    const entity = ds.entities.add(new Entity({ id: "marker-clamped" }));
    entity.billboard = new BillboardGraphics({ heightReference: HeightReference.CLAMP_TO_GROUND });

    engine.convertMarkersToPoints(ds, Color.GREEN);

    expect(entity.point!.heightReference!.getValue(JulianDate.now())).toBe(HeightReference.CLAMP_TO_GROUND);
  });

  it("applyEntityStyle: solid renk polygon.material'a, outline acikken outlineColor/outlineWidth'e yansir", () => {
    const { engine } = createEngine();
    const ds = new CustomDataSource("test");
    const entity = addPolygonEntity(ds, "a");

    engine.applyEntityStyle(
      entity,
      Color.YELLOW,
      { enabled: true, color: "#00ff00", width: 4 },
      false
    );

    const materialColor = polygonColor(entity);
    expect(materialColor.red).toBeCloseTo(1);
    expect(materialColor.green).toBeCloseTo(1);
    expect((entity.polygon!.outlineColor as ConstantProperty).getValue().green).toBeCloseTo(1);
    expect((entity.polygon!.outlineWidth as ConstantProperty).getValue()).toBe(4);
  });

  // Adim 9 Faz 0b -- Ornek 2'nin (private static saf fonksiyonlar) eksik
  // test kapsamini tamamlar: applyLayerStyle uzerinden (resolveFillColor'in
  // TEK giris noktasi) sampleGradient/sampleDiscrete/pickBin dolayli ama
  // DOGRUDAN (Viewer/WebGL'siz) test edilir. Oncesinde sampleDiscrete/
  // pickBin HIC test edilmiyordu, sampleGradient sadece tam-Viewer'li
  // LayerManager.characterization.test.ts uzerinden dolayliydi.
  describe("applyLayerStyle fill modlari -- sampleGradient/sampleDiscrete/pickBin " +
    "(Adim 9 Faz 0b, Ornek 2 test kapsami tamamlama)", () => {
    it("gradient (varsayilan paletteKind=sequential) -- iki nokta arasinda DOGRUSAL " +
      "karisim uygular (sampleGradient)", async () => {
      const { engine } = createEngine();
      const ds = new CustomDataSource("test");
      const entity = addPolygonEntity(ds, "a", { deger: 5 });

      await engine.applyLayerStyle("layer-1", ds, false, {
        fill: { mode: "gradient", column: "deger", palette: ["#000000", "#ffffff"], min: 0, max: 10, opacity: 1 },
        outline: { enabled: false, color: "#000000", width: 1 },
      });

      const color = polygonColor(entity);
      // deger=5, [min,max]=[0,10] -> t=0.5 -> siyah/beyaz lerp'in tam ortasi (gri).
      expect(color.red).toBeCloseTo(0.5, 2);
      expect(color.green).toBeCloseTo(0.5, 2);
      expect(color.blue).toBeCloseTo(0.5, 2);
    });

    it("bin + paletteKind=qualitative -- degeri dogru kutuya ayirir (pickBin) VE " +
      "karistirmadan en yakin palet rengini secer (sampleDiscrete)", async () => {
      const { engine } = createEngine();
      const ds = new CustomDataSource("test");
      const low = addPolygonEntity(ds, "low", { deger: 5 });
      const mid = addPolygonEntity(ds, "mid", { deger: 15 });
      const high = addPolygonEntity(ds, "high", { deger: 25 });

      await engine.applyLayerStyle("layer-2", ds, false, {
        fill: {
          mode: "bin",
          column: "deger",
          palette: ["#000000", "#808080", "#ffffff"],
          paletteKind: "qualitative",
          binCount: 3,
          min: 0,
          max: 30,
          opacity: 1,
        },
        outline: { enabled: false, color: "#000000", width: 1 },
      });

      const colorOf = (entity: Entity) => polygonColor(entity).toCssHexString();

      // boundaries=[10,20,30] -> deger=5 bin0, 15 bin1, 25 bin2 (pickBin);
      // qualitative karistirma yapmiyor, dogrudan palet[index]'i donduruyor
      // (sampleDiscrete) -- 3 sonuc da BIREBIR palet renkleriyle eslesmeli.
      expect(colorOf(low)).toBe("#000000");
      expect(colorOf(mid)).toBe("#808080");
      expect(colorOf(high)).toBe("#ffffff");
    });
  });

  // Gercek hatalar plani H7.1: GradientFillStyle/BinFillStyle sozlesmesi
  // (bkz layer.types.ts) min ve max icin AYRI AYRI "verilmezse veriden
  // otomatik hesaplanir" der; applyLayerStyle ise yalniz IKISI DE
  // verildiginde verilenleri kullaniyordu, biri eksikse VERILEN ucu da atip
  // tum kolon araligina geciyordu ("BILINEN" olarak donduruldu). H7.2'de
  // duzeltildi (bkz LayerStyleEngine.resolveStyleRange): verilen uc aynen,
  // verilmeyen uc veriden; saklanan stil de bu araligi tasir (lejant
  // paneli/yazdirma onu gosterir).
  describe("applyLayerStyle tek sinir (karakterizasyon -- H7.1/H7.2)", () => {
    const OUTLINE_OFF = { enabled: false, color: "#000000", width: 1 } as const;
    const BLACK_WHITE = ["#000000", "#ffffff"];

    it("gradient'te yalniz min verilince min aynen, max veriden alinir", async () => {
      const { engine } = createEngine();
      const ds = new CustomDataSource("test");
      addPolygonEntity(ds, "a", { deger: 10 });
      const mid = addPolygonEntity(ds, "b", { deger: 20 });
      addPolygonEntity(ds, "c", { deger: 30 });

      await engine.applyLayerStyle("layer-1", ds, false, {
        fill: { mode: "gradient", column: "deger", palette: BLACK_WHITE, min: 20, opacity: 1 },
        outline: OUTLINE_OFF,
      });

      // Aralik [20,30] -> deger=20 t=0 (siyah); eskiden [10,30] ile t=0.5 (gri).
      expect(polygonColor(mid).red).toBeCloseTo(0, 2);
      expect(engine.getStyle("layer-1")!.fill).toMatchObject({ min: 20, max: 30 });
    });

    it("gradient'te [min,max] disindaki degerler renklendirilmez (alt ve ust sinir dahil)", async () => {
      const { engine } = createEngine();
      const ds = new CustomDataSource("test");
      const below = addPolygonEntity(ds, "a", { deger: 10 });
      const atMin = addPolygonEntity(ds, "b", { deger: 20 });
      const atMax = addPolygonEntity(ds, "c", { deger: 30 });
      const above = addPolygonEntity(ds, "d", { deger: 40 });

      await engine.applyLayerStyle("layer-1", ds, false, {
        fill: { mode: "gradient", column: "deger", palette: BLACK_WHITE, min: 20, max: 30, opacity: 1 },
        outline: OUTLINE_OFF,
      });

      expect(polygonColor(below).alpha).toBe(0);
      expect(polygonColor(above).alpha).toBe(0);
      expect(polygonColor(atMin).alpha).toBe(1);
      expect(polygonColor(atMax).alpha).toBe(1);
    });

    it("gradient'te yalniz min verilince min altindaki degerler renklenmez, ustu (veri max'ina kadar) renklenir", async () => {
      const { engine } = createEngine();
      const ds = new CustomDataSource("test");
      const low = addPolygonEntity(ds, "a", { deger: 10 });
      const atMin = addPolygonEntity(ds, "b", { deger: 20 });
      const top = addPolygonEntity(ds, "c", { deger: 30 });

      await engine.applyLayerStyle("layer-1", ds, false, {
        fill: { mode: "gradient", column: "deger", palette: BLACK_WHITE, min: 20, opacity: 1 },
        outline: OUTLINE_OFF,
      });

      expect(polygonColor(low).alpha).toBe(0);
      expect(polygonColor(atMin).alpha).toBe(1);
      expect(polygonColor(top).alpha).toBe(1);
    });

    it("gradient'te yalniz max verilince max ustundeki degerler renklenmez, alti (veri min'ine kadar) renklenir", async () => {
      const { engine } = createEngine();
      const ds = new CustomDataSource("test");
      const bottom = addPolygonEntity(ds, "a", { deger: 10 });
      const atMax = addPolygonEntity(ds, "b", { deger: 20 });
      const high = addPolygonEntity(ds, "c", { deger: 30 });

      await engine.applyLayerStyle("layer-1", ds, false, {
        fill: { mode: "gradient", column: "deger", palette: BLACK_WHITE, max: 20, opacity: 1 },
        outline: OUTLINE_OFF,
      });

      expect(polygonColor(bottom).alpha).toBe(1);
      expect(polygonColor(atMax).alpha).toBe(1);
      expect(polygonColor(high).alpha).toBe(0);
    });

    it("gradient'te min ve max verilmezse (otomatik) hicbir deger gizlenmez", async () => {
      const { engine } = createEngine();
      const ds = new CustomDataSource("test");
      const entities = [10, 20, 30].map((v, i) => addPolygonEntity(ds, `e${i}`, { deger: v }));

      await engine.applyLayerStyle("layer-1", ds, false, {
        fill: { mode: "gradient", column: "deger", palette: BLACK_WHITE, opacity: 1 },
        outline: OUTLINE_OFF,
      });

      for (const entity of entities) expect(polygonColor(entity).alpha).toBe(1);
    });

    it("gradient'te min == max iken yalniz o degere esit olanlar renklenir", async () => {
      const { engine } = createEngine();
      const ds = new CustomDataSource("test");
      const below = addPolygonEntity(ds, "a", { deger: 19 });
      const equal = addPolygonEntity(ds, "b", { deger: 20 });
      const above = addPolygonEntity(ds, "c", { deger: 21 });

      await engine.applyLayerStyle("layer-1", ds, false, {
        fill: { mode: "gradient", column: "deger", palette: BLACK_WHITE, min: 20, max: 20, opacity: 1 },
        outline: OUTLINE_OFF,
      });

      expect(polygonColor(below).alpha).toBe(0);
      expect(polygonColor(equal).alpha).toBe(1);
      expect(polygonColor(above).alpha).toBe(0);
    });

    it("gradient'te sinirin hemen disindaki ondalik degerler renklenmez, hemen icindekiler renklenir", async () => {
      const { engine } = createEngine();
      const ds = new CustomDataSource("test");
      const justBelow = addPolygonEntity(ds, "a", { deger: 19.999 });
      const justInside1 = addPolygonEntity(ds, "b", { deger: 20.001 });
      const justInside2 = addPolygonEntity(ds, "c", { deger: 29.999 });
      const justAbove = addPolygonEntity(ds, "d", { deger: 30.001 });

      await engine.applyLayerStyle("layer-1", ds, false, {
        fill: { mode: "gradient", column: "deger", palette: BLACK_WHITE, min: 20, max: 30, opacity: 1 },
        outline: OUTLINE_OFF,
      });

      expect(polygonColor(justBelow).alpha).toBe(0);
      expect(polygonColor(justInside1).alpha).toBe(1);
      expect(polygonColor(justInside2).alpha).toBe(1);
      expect(polygonColor(justAbove).alpha).toBe(0);
    });

    it("gradient'te sayisal olmayan/eksik deger ile aralik disi deger de renklenmez, aralik ici renklenir", async () => {
      const { engine } = createEngine();
      const ds = new CustomDataSource("test");
      const text = addPolygonEntity(ds, "a", { deger: "abc" });
      const missing = addPolygonEntity(ds, "b", {});
      const inside = addPolygonEntity(ds, "c", { deger: 25 });

      await engine.applyLayerStyle("layer-1", ds, false, {
        fill: { mode: "gradient", column: "deger", palette: BLACK_WHITE, min: 20, max: 30, opacity: 1 },
        outline: OUTLINE_OFF,
      });

      expect(polygonColor(text).alpha).toBe(0);
      expect(polygonColor(missing).alpha).toBe(0);
      expect(polygonColor(inside).alpha).toBe(1);
    });

    it("gradient'te yalniz max verilince max aynen, min veriden alinir", async () => {
      const { engine } = createEngine();
      const ds = new CustomDataSource("test");
      addPolygonEntity(ds, "a", { deger: 10 });
      const mid = addPolygonEntity(ds, "b", { deger: 20 });
      addPolygonEntity(ds, "c", { deger: 30 });

      await engine.applyLayerStyle("layer-1", ds, false, {
        fill: { mode: "gradient", column: "deger", palette: BLACK_WHITE, max: 20, opacity: 1 },
        outline: OUTLINE_OFF,
      });

      // Aralik [10,20] -> deger=20 t=1 (beyaz); eskiden [10,30] ile t=0.5 (gri).
      expect(polygonColor(mid).red).toBeCloseTo(1, 2);
      expect(engine.getStyle("layer-1")!.fill).toMatchObject({ min: 10, max: 20 });
    });

    it("bin'de yalniz min verilince sinif sinirlari verilen min ile veriden gelen max arasinda cizilir", async () => {
      const { engine } = createEngine();
      const ds = new CustomDataSource("test");
      addPolygonEntity(ds, "a", { deger: 12 });
      const mid = addPolygonEntity(ds, "b", { deger: 22 });
      addPolygonEntity(ds, "c", { deger: 28 });

      await engine.applyLayerStyle("layer-1", ds, false, {
        fill: {
          mode: "bin",
          column: "deger",
          palette: BLACK_WHITE,
          paletteKind: "qualitative",
          binCount: 2,
          min: 20,
          opacity: 1,
        },
        outline: OUTLINE_OFF,
      });

      // Aralik [20,28] -> sinirlar [24,28], deger=22 ilk sinif (siyah);
      // eskiden [12,28] ile sinirlar [20,28], ikinci sinif (beyaz).
      expect(polygonColor(mid).toCssHexString()).toBe("#000000");
      expect(engine.getStyle("layer-1")!.fill).toMatchObject({ min: 20, max: 28 });
    });

    it("iki uc da verilince kolon araligi hic hesaplanmaz; uc verilmeyince bir kez hesaplanir", async () => {
      const { engine } = createEngine();
      const ds = new CustomDataSource("test");
      addPolygonEntity(ds, "a", { deger: 10 });
      const columnRange = vi.spyOn(engine, "getColumnRange");

      await engine.applyLayerStyle("layer-1", ds, false, {
        fill: { mode: "gradient", column: "deger", palette: BLACK_WHITE, min: 0, max: 20, opacity: 1 },
        outline: OUTLINE_OFF,
      });
      expect(columnRange).not.toHaveBeenCalled();

      await engine.applyLayerStyle("layer-1", ds, false, {
        fill: { mode: "gradient", column: "deger", palette: BLACK_WHITE, opacity: 1 },
        outline: OUTLINE_OFF,
      });
      expect(columnRange).toHaveBeenCalledTimes(1);
    });
  });

  // God component refactor Faz 3.6a: applyLayerStyle'in companion (dis hat)
  // dongusu 3.6b'de ozel bir yardimciya tasinacak. Duz renkte ek yeri
  // ortucu, dis hat acik/kapali ve yari saydam dolgu LayerManager
  // karakterizasyon testinde ("applyLayerStyle (Adim 3 ...)") donmus
  // durumda; burada onun KAPSAMADIGI yollar: veri odakli dolguda her
  // companion'in KENDI poligonunun rengini almasi, rengi cozulemeyen
  // poligon, sekil (cizim) katmani ve render-bekleme (genislik degisimi).
  describe("applyLayerStyle companion/ek yeri ortucu (karakterizasyon -- Faz 3.6a)", () => {
    const BLACK_WHITE = ["#000000", "#ffffff"];

    /** Ortak OutlineGeometry'li motor + her poligona companion eklenmis veri kaynagi kurar. */
    function setup(values: Record<string, number | undefined>) {
      const outlineGeometry = new OutlineGeometry({ getCurrentTime: () => JulianDate.now() });
      const waitForRenderSettle = vi.fn(() => Promise.resolve());
      const engine = new LayerStyleEngine({
        outlineGeometry,
        opacityController: new OpacityController({ requestRender: () => {} }),
        getCurrentTime: () => JulianDate.now(),
        requestRender: vi.fn(),
        emitStyle: vi.fn(),
        waitForRenderSettle,
      });
      const ds = new CustomDataSource("test");
      const companions: Record<string, Entity> = {};
      for (const [id, value] of Object.entries(values)) {
        const entity = addPolygonEntity(ds, id, value === undefined ? { baska: 1 } : { deger: value });
        outlineGeometry.addPolygonOutlineCompanion(ds, entity, Color.BLUE, 2, true);
        companions[id] = ds.entities.getById(`${id}::outline`)!;
      }
      return { engine, ds, companions, waitForRenderSettle };
    }

    const lineColor = (companion: Entity) =>
      (companion.polyline!.material as ColorMaterialProperty).color!.getValue(JulianDate.now()) as Color;
    const lineWidth = (companion: Entity) => companion.polyline!.width!.getValue(JulianDate.now()) as number;

    const gradient = { mode: "gradient", column: "deger", palette: BLACK_WHITE, min: 0, max: 10, opacity: 1 } as const;
    const OUTLINE_OFF = { enabled: false, color: "#00ff00", width: 3 } as const;

    it("dis hat kapali + opak veri odakli dolgu: her companion KENDI poligonunun renginde 1 px cizilir", async () => {
      const { engine, ds, companions } = setup({ a: 0, b: 10 });
      await engine.applyLayerStyle("layer-1", ds, false, { fill: gradient, outline: OUTLINE_OFF });

      expect([companions.a!.show, companions.b!.show]).toEqual([true, true]);
      expect(lineColor(companions.a!).toCssHexString()).toBe("#000000");
      expect(lineColor(companions.b!).toCssHexString()).toBe("#ffffff");
      expect([lineWidth(companions.a!), lineWidth(companions.b!)]).toEqual([1, 1]);
    });

    it("rengi cozulemeyen poligonun (deger yok) companion'i gizlenir, rengine dokunulmaz", async () => {
      const { engine, ds, companions } = setup({ a: 5, bos: undefined });
      await engine.applyLayerStyle("layer-1", ds, false, { fill: gradient, outline: OUTLINE_OFF });

      expect(companions.a!.show).toBe(true);
      expect(companions.bos!.show).toBe(false);
      expect(lineColor(companions.bos!).toCssHexString()).toBe("#0000ff");
    });

    it("sekil (cizim) katmaninda dis hat kapaliyken ek yeri ortucu yok: companion gizlenir", async () => {
      const { engine, ds, companions } = setup({ a: 5 });
      await engine.applyLayerStyle("layer-1", ds, true, { fill: gradient, outline: OUTLINE_OFF });
      expect(companions.a!.show).toBe(false);
    });

    it("dis hat acikken dolgudan bagimsiz: rengi cozulemeyen poligonun companion'i da dis hat renginde gorunur", async () => {
      const { engine, ds, companions } = setup({ a: 5, bos: undefined });
      await engine.applyLayerStyle("layer-1", ds, false, {
        fill: gradient,
        outline: { enabled: true, color: "#00ff00", width: 3 },
      });
      for (const companion of [companions.a!, companions.bos!]) {
        expect(companion.show).toBe(true);
        expect(lineColor(companion).toCssHexString()).toBe("#00ff00");
        expect(lineWidth(companion)).toBe(3);
      }
    });

    it("render yalniz companion genisligi GERCEKTEN degisince beklenir (ilk uygulama dahil)", async () => {
      const { engine, ds, waitForRenderSettle } = setup({ a: 5 });
      const apply = (outline: { enabled: boolean; color: string; width: number }, opacity = 1) =>
        engine.applyLayerStyle("layer-1", ds, false, { fill: { ...gradient, opacity }, outline });

      await apply(OUTLINE_OFF); // ilk uygulama (onceki genislik yok) -> 1 px
      await apply(OUTLINE_OFF, 0.5); // genislik ayni (1) -> beklenmez
      await apply({ enabled: true, color: "#00ff00", width: 1 }); // dis hat acildi ama genislik yine 1
      await apply({ enabled: true, color: "#00ff00", width: 3 }); // 1 -> 3
      await apply(OUTLINE_OFF); // 3 -> 1 (ek yeri ortucu)
      expect(waitForRenderSettle).toHaveBeenCalledTimes(3);
    });
  });
});
