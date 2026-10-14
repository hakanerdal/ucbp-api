// OpacityController'in 8 uyesi icin izole birim testleri -- gercek Cesium
// siniflari kullanilir (spike bulgusu: DOM/WebGL olmadan calisiyorlar, bkz
// cesium-node-environment.test.ts), hicbir mock yok. getDataSourceOpacityState/
// installOpacityColorProperty/readColorProperty/createOpacityColorProperty
// PRIVATE oldugu icin (bkz project_ucbp_api_god_component_refactor_kurallari
// 2.3 Hedef Yapi) public yuzey (prepareDataSourceOpacity/setDataSourceOpacity/
// getWrappedBaseColor) uzerinden DOLAYLI test edilir.
import { describe, expect, it, vi } from "vitest";
import {
  BillboardGraphics,
  CallbackProperty,
  Cartesian3,
  Color,
  ColorMaterialProperty,
  CustomDataSource,
  Entity,
  JulianDate,
  PointGraphics,
  PolygonGraphics,
  PolygonHierarchy,
  PolylineGraphics,
} from "cesium";
import { OpacityController } from "./OpacityController.js";

function createOpacityController(requestRender = vi.fn()): {
  controller: OpacityController;
  requestRender: ReturnType<typeof vi.fn>;
} {
  return { controller: new OpacityController({ requestRender }), requestRender };
}

function addPolygonEntity(dataSource: CustomDataSource, id: string, color: Color): Entity {
  return dataSource.entities.add(
    new Entity({
      id,
      polygon: new PolygonGraphics({
        hierarchy: new PolygonHierarchy([
          Cartesian3.fromDegrees(32.8, 39.9),
          Cartesian3.fromDegrees(32.9, 39.9),
          Cartesian3.fromDegrees(32.9, 40.0),
        ]),
        material: new ColorMaterialProperty(color),
      }),
    })
  );
}

describe("OpacityController", () => {
  describe("prepareDataSourceOpacity (dogrudan cagrildiginda -- ham sarmalama davranisi)", () => {
    it("polygon.material.color'i CallbackProperty'ye sarar", () => {
      const { controller } = createOpacityController();
      const ds = new CustomDataSource("test");
      const entity = addPolygonEntity(ds, "poly-1", Color.RED);

      controller.prepareDataSourceOpacity(ds);

      const material = entity.polygon!.material as ColorMaterialProperty;
      expect(material.color).toBeInstanceOf(CallbackProperty);
    });

    it("point.color ve billboard.color'i da sarar", () => {
      const { controller } = createOpacityController();
      const ds = new CustomDataSource("test");
      const entity = ds.entities.add(
        new Entity({
          id: "point-1",
          point: new PointGraphics({ color: Color.BLUE }),
          billboard: new BillboardGraphics({ color: Color.GREEN }),
        })
      );

      controller.prepareDataSourceOpacity(ds);

      expect(entity.point!.color).toBeInstanceOf(CallbackProperty);
      expect(entity.billboard!.color).toBeInstanceOf(CallbackProperty);
    });

    it("ayni entity'yi IKINCI kez hazirlamak zaten sarilmis property'yi TEKRAR sarmaz", () => {
      const { controller } = createOpacityController();
      const ds = new CustomDataSource("test");
      const entity = addPolygonEntity(ds, "poly-1", Color.RED);

      controller.prepareDataSourceOpacity(ds);
      const firstWrapped = (entity.polygon!.material as ColorMaterialProperty).color;
      controller.prepareDataSourceOpacity(ds);
      const secondWrapped = (entity.polygon!.material as ColorMaterialProperty).color;

      expect(secondWrapped).toBe(firstWrapped);
    });

    it("polyline entity'si olmayan (polygon/point/billboard disindaki) alanlara dokunmaz", () => {
      const { controller } = createOpacityController();
      const ds = new CustomDataSource("test");
      const entity = ds.entities.add(
        new Entity({
          id: "line-1",
          polyline: new PolylineGraphics({
            positions: [Cartesian3.fromDegrees(32, 39), Cartesian3.fromDegrees(33, 40)],
            material: new ColorMaterialProperty(Color.YELLOW),
          }),
        })
      );

      controller.prepareDataSourceOpacity(ds);

      const material = entity.polyline!.material as ColorMaterialProperty;
      expect(material.color).toBeInstanceOf(CallbackProperty);
    });
  });

  describe("setDataSourceOpacity / getWrappedBaseColor", () => {
    it("CallbackProperty'nin dondurdugu renk, state.opacity ile alpha'yi carpar", () => {
      const { controller } = createOpacityController();
      const ds = new CustomDataSource("test");
      const entity = addPolygonEntity(ds, "poly-1", Color.RED);
      controller.prepareDataSourceOpacity(ds);

      controller.setDataSourceOpacity(ds, 0.5);

      const wrapped = (entity.polygon!.material as ColorMaterialProperty).color as unknown as CallbackProperty;
      const result = wrapped.getValue(JulianDate.now()) as Color;
      expect(result.alpha).toBeCloseTo(0.5);
      expect(result.red).toBe(1);
    });

    it("opacity degismediyse (ayni deger) requestRender CAGRILMAZ", () => {
      const { controller, requestRender } = createOpacityController();
      const ds = new CustomDataSource("test");

      controller.setDataSourceOpacity(ds, 1);
      expect(requestRender).not.toHaveBeenCalled();

      controller.setDataSourceOpacity(ds, 0.7);
      expect(requestRender).toHaveBeenCalledTimes(1);
      controller.setDataSourceOpacity(ds, 0.7);
      expect(requestRender).toHaveBeenCalledTimes(1);
    });

    it("getWrappedBaseColor, sarilmis bir property icin mutable baz rengi dondurur, sarilmamis icin undefined", () => {
      const { controller } = createOpacityController();
      const ds = new CustomDataSource("test");
      const entity = addPolygonEntity(ds, "poly-1", Color.RED);
      controller.prepareDataSourceOpacity(ds);

      const wrapped = (entity.polygon!.material as ColorMaterialProperty).color as unknown;
      const baseColor = controller.getWrappedBaseColor(wrapped as never);
      expect(baseColor).toBeDefined();
      expect(Color.equals(baseColor!, Color.RED)).toBe(true);

      expect(controller.getWrappedBaseColor(new ColorMaterialProperty(Color.BLUE).color as never)).toBeUndefined();
    });
  });

  describe("ML-11 duzeltmesi: setDataSourceOpacity artik SADECE opaklik 1'den farkli bir " +
    "degere ILK KEZ gectiginde sarar (tembel), katman eklenirken/prepareDataSourceOpacity " +
    "dogrudan cagrilmadan DEGIL", () => {
    it("setDataSourceOpacity(ds, 1) -- varsayilan deger -- entity'leri HIC sarmaz", () => {
      const { controller } = createOpacityController();
      const ds = new CustomDataSource("test");
      const entity = addPolygonEntity(ds, "poly-1", Color.RED);

      controller.setDataSourceOpacity(ds, 1);

      const material = entity.polygon!.material as ColorMaterialProperty;
      expect(material.color).not.toBeInstanceOf(CallbackProperty);
    });

    it("setDataSourceOpacity(ds, 0.5) -- opaklik ILK KEZ 1'den farkli bir degere gecince -- entity'leri sarar VE dogru opakligi hemen yansitir", () => {
      const { controller } = createOpacityController();
      const ds = new CustomDataSource("test");
      const entity = addPolygonEntity(ds, "poly-1", Color.RED);

      controller.setDataSourceOpacity(ds, 0.5);

      const material = entity.polygon!.material as ColorMaterialProperty;
      expect(material.color).toBeInstanceOf(CallbackProperty);
      const result = (material.color as unknown as CallbackProperty).getValue(JulianDate.now()) as Color;
      expect(result.alpha).toBeCloseTo(0.5);
    });

    it("ilk sarmalamadan SONRA eklenen bir sonraki setDataSourceOpacity cagrisi entity'yi TEKRAR sarmaz (ayni property nesnesi kalir)", () => {
      const { controller } = createOpacityController();
      const ds = new CustomDataSource("test");
      const entity = addPolygonEntity(ds, "poly-1", Color.RED);

      controller.setDataSourceOpacity(ds, 0.5);
      const firstWrapped = (entity.polygon!.material as ColorMaterialProperty).color;
      controller.setDataSourceOpacity(ds, 0.8);
      const secondWrapped = (entity.polygon!.material as ColorMaterialProperty).color;

      expect(secondWrapped).toBe(firstWrapped);
      const result = (secondWrapped as unknown as CallbackProperty).getValue(JulianDate.now()) as Color;
      expect(result.alpha).toBeCloseTo(0.8);
    });

    it("BILINEN SINIR: sarmalama aktiflestikten SONRA ayni DataSource'a eklenen YENI bir entity otomatik sarilmaz", () => {
      const { controller } = createOpacityController();
      const ds = new CustomDataSource("test");
      controller.setDataSourceOpacity(ds, 0.5);

      const lateEntity = addPolygonEntity(ds, "poly-late", Color.RED);

      const material = lateEntity.polygon!.material as ColorMaterialProperty;
      expect(material.color).not.toBeInstanceOf(CallbackProperty);
    });
  });

  describe("ensureDynamicFillColor (companion-outline'li poligon dolgusu HER ZAMAN dinamik kalmali -- bkz WHY yorumu)", () => {
    it("setOpacity() HIC cagrilmamis olsa dahi dolguyu CallbackProperty'ye sarar", () => {
      const { controller } = createOpacityController();
      const ds = new CustomDataSource("test");
      const entity = addPolygonEntity(ds, "poly-1", Color.RED);

      controller.ensureDynamicFillColor(ds, entity);

      const material = entity.polygon!.material as ColorMaterialProperty;
      expect(material.color).toBeInstanceOf(CallbackProperty);
      const result = (material.color as unknown as CallbackProperty).getValue(JulianDate.now()) as Color;
      // Paylasilan state.opacity varsayilani 1 -- gorsel olarak HICBIR
      // fark yaratmadan SADECE property TIPINI dinamik yapar.
      expect(result.alpha).toBeCloseTo(1);
    });

    it("polygon.material yoksa (ör. sadece polyline/point) sessizce hicbir sey yapmaz", () => {
      const { controller } = createOpacityController();
      const ds = new CustomDataSource("test");
      const entity = ds.entities.add(
        new Entity({
          id: "line-1",
          polyline: new PolylineGraphics({
            positions: [Cartesian3.fromDegrees(32, 39), Cartesian3.fromDegrees(33, 40)],
            material: new ColorMaterialProperty(Color.YELLOW),
          }),
        })
      );

      expect(() => controller.ensureDynamicFillColor(ds, entity)).not.toThrow();
      expect(entity.polyline!.material).toBeInstanceOf(ColorMaterialProperty);
      const material = entity.polyline!.material as ColorMaterialProperty;
      expect(material.color).not.toBeInstanceOf(CallbackProperty);
    });

    it("zaten sarilmis bir dolguyu TEKRAR sarmaz (ayni property nesnesi kalir)", () => {
      const { controller } = createOpacityController();
      const ds = new CustomDataSource("test");
      const entity = addPolygonEntity(ds, "poly-1", Color.RED);

      controller.ensureDynamicFillColor(ds, entity);
      const first = (entity.polygon!.material as ColorMaterialProperty).color;
      controller.ensureDynamicFillColor(ds, entity);
      const second = (entity.polygon!.material as ColorMaterialProperty).color;

      expect(second).toBe(first);
    });

    it("PAYLASILAN opaklik state'ini kullanir -- setOpacity() SONRADAN cagrilirsa zaten-sarili dolgu dogru tepki verir", () => {
      const { controller } = createOpacityController();
      const ds = new CustomDataSource("test");
      const entity = addPolygonEntity(ds, "poly-1", Color.RED);

      controller.ensureDynamicFillColor(ds, entity);
      controller.setDataSourceOpacity(ds, 0.4);

      const material = entity.polygon!.material as ColorMaterialProperty;
      const result = (material.color as unknown as CallbackProperty).getValue(JulianDate.now()) as Color;
      expect(result.alpha).toBeCloseTo(0.4);
    });
  });
});
