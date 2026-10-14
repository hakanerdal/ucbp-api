import {
  CallbackProperty,
  ColorMaterialProperty,
  Color,
  JulianDate,
  type DataSource,
  type Entity,
  type Property,
} from "cesium";

interface DataSourceOpacityState {
  opacity: number;
  // ML-11 duzeltmesi: prepareDataSourceOpacity() katman EKLENIRKEN degil,
  // opaklik ILK KEZ 1'den farkli bir degere ayarlanirken (bkz
  // setDataSourceOpacity) TEMBEL calisir -- bu bayrak o sarmalamanin daha
  // once yapilip yapilmadigini isaretler. BILINEN SINIR: sarmalama
  // aktiflestikten SONRA ayni DataSource'a eklenen YENI entity'ler (ör.
  // Cizim Katmani'na sonradan eklenen bir sekil) bu ilk-kurulum turunu
  // KACIRIR ve mevcut opaklik seviyesini yansitmaz -- bu, ML-11'in
  // kapsadigi "ilk kurulumu tembellestir" duzeltmesinin BILEREK disinda
  // birakilan bir edge-case'tir.
  wrapped: boolean;
}

/**
 * Bir DataSource'un (WFS/GeoJSON/Shp/Csv/Cizim/Olcu katmani) opakligini,
 * entity'lerin renk property'lerini bir CallbackProperty ile sarmalayarak
 * yoneten saf, Cesium Viewer'a ihtiyaç duymayan modül (bkz
 * project_ucbp_api_god_component_refactor_kurallari, 2.3 Hedef Yapi ve
 * Ek-A). LayerManager.ts'ten davranis degisikligi OLMADAN tasinmis, ardindan
 * ML-11 duzeltmesiyle (bkz DataSourceOpacityState.wrapped) sarmalama katman
 * EKLENIRKEN degil, opaklik ILK KEZ degistirilirken TEMBEL calisacak sekilde
 * guncellenmistir. Tek dis bagimlilik: Cesium Viewer'in TAMAMI degil, sadece
 * sahne render'ini yeniden istemek (bkz constructor'daki requestRender
 * provider'i).
 */
export class OpacityController {
  private readonly dataSourceOpacityStates = new WeakMap<
    DataSource,
    DataSourceOpacityState
  >();
  // Deger, createOpacityColorProperty()'nin CallbackProperty kapanisinda
  // OKUDUGU mutable "baz renk" nesnesidir -- applyEntityStyle/applyLayerStyle
  // bir dolgu rengini GUNCELLERKEN, property bu Map'te varsa (yani zaten
  // opaklikla sarilmissa) YENI bir property atamak YERINE bu baz rengi
  // DOGRUDAN mutasyona ugratir (bkz LayerManager.updateColorProperty,
  // getWrappedBaseColor uzerinden okur). Boylece hem opaklik sarmalayicisi
  // KORUNUR hem de entity'nin materyal/renk alanina HIC dokunulmadigi icin
  // Cesium'un ilgili geometriyi gereksiz yere yeniden kurmasi (flicker)
  // onlenir.
  private readonly dataSourceOpacityProperties = new WeakMap<Property, Color>();
  // Viewer'in TAMAMI degil, SADECE sahne render'ini yeniden istemeyi HER
  // cagrida CANLI okur -- bkz LayerManager.ts constructor'i.
  private readonly requestRender: () => void;

  constructor(options: { readonly requestRender: () => void }) {
    this.requestRender = options.requestRender;
  }

  /** current property zaten bir opaklik sarmalayicisiysa, ICINDEKI mutable
   * baz rengi dondurur -- LayerManager.updateColorProperty bunu DOGRUDAN
   * mutasyona ugratarak property nesnesinin (ve dolayisiyla entity alaninin
   * referansinin) HIC degismemesini saglar. */
  getWrappedBaseColor(colorProperty: Property): Color | undefined {
    return this.dataSourceOpacityProperties.get(colorProperty);
  }

  // DataSource opacity degistiginde tum entity'leri tekrar dolasmak pahali.
  // Her entity rengi bir kez dinamik property'ye cevrilir; slider suruklenirken
  // yalnizca katmanin opacity state'i guncellenir.
  prepareDataSourceOpacity(dataSource: DataSource): void {
    const state = this.getDataSourceOpacityState(dataSource);
    const time = JulianDate.now();

    dataSource.entities.suspendEvents();
    for (const entity of dataSource.entities.values) {
      if (entity.polygon?.material instanceof ColorMaterialProperty) {
        const material = entity.polygon.material;
        this.installOpacityColorProperty(
          material.color,
          state,
          time,
          new Color(1, 1, 1, 0.5),
          (property) => (material.color = property)
        );
      }
      if (entity.polyline?.material instanceof ColorMaterialProperty) {
        const material = entity.polyline.material;
        this.installOpacityColorProperty(
          material.color,
          state,
          time,
          Color.WHITE,
          (property) => (material.color = property)
        );
      }
      if (entity.point !== undefined) {
        this.installOpacityColorProperty(
          entity.point.color,
          state,
          time,
          Color.WHITE,
          (property) => (entity.point!.color = property)
        );
      }
      if (entity.billboard !== undefined) {
        this.installOpacityColorProperty(
          entity.billboard.color,
          state,
          time,
          Color.WHITE,
          (property) => (entity.billboard!.color = property)
        );
      }
    }
    dataSource.entities.resumeEvents();
  }

  // OutlineGeometry'nin companion-outline teknigi (bkz LayerManager.
  // addPolygonOutlines/addPolygonOutlineCompanion) ile birlikte kullanilan
  // poligonlarda, dolgu rengi HER ZAMAN (setOpacity() hic cagrilmasa, deger
  // 1 kalsa dahi) dinamik bir CallbackProperty OLMALI -- deneyle dogrulandi:
  // Cesium'un ground-clamped GroundPrimitive/GroundPolylinePrimitive
  // compositing'i, STATIK (ConstantProperty) bir dolgu materyalini companion
  // polyline ile yanlis derinlik/compositing sirasina sokup companion'i
  // gorunmez kiliyor (kullanici bildirimi: "opaklığı maksimum yaptığımda
  // poligon geometri sınırları gözükmez hale geliyor"); dinamik (isConstant:
  // false) bir materyalde bu sorun OLUŞMUYOR. SADECE poligonun dolgu rengi
  // hedeflenir -- companion'in KENDI rengine dokunmaya gerek YOK (izole
  // deneyle dogrulandi). Paylasilan opaklik state'ini KULLANIR (ayri/notr
  // bir state DEGIL) -- boylece setOpacity() sonradan cagrilirsa bu zaten-
  // sarili property dogru sekilde tepki verir.
  ensureDynamicFillColor(dataSource: DataSource, entity: Entity): void {
    if (!(entity.polygon?.material instanceof ColorMaterialProperty)) return;
    const state = this.getDataSourceOpacityState(dataSource);
    const material = entity.polygon.material;
    this.installOpacityColorProperty(
      material.color,
      state,
      JulianDate.now(),
      new Color(1, 1, 1, 0.5),
      (property) => (material.color = property)
    );
  }

  setDataSourceOpacity(dataSource: DataSource, opacity: number): void {
    const state = this.getDataSourceOpacityState(dataSource);

    if (state.opacity === opacity) return;
    state.opacity = opacity;
    // ML-11: sarmalama SADECE opaklik ilk kez 1'den farkli bir degere
    // gectiginde, VE sadece BIR KEZ kurulur -- state.opacity yukarida
    // ATANDIKTAN SONRA cagrildigi icin yeni CallbackProperty'ler dogru
    // opakligi hemen yansitir (bkz createOpacityColorProperty).
    if (!state.wrapped && opacity !== 1) {
      this.prepareDataSourceOpacity(dataSource);
      state.wrapped = true;
    }
    this.requestRender();
  }

  private getDataSourceOpacityState(
    dataSource: DataSource
  ): DataSourceOpacityState {
    let state = this.dataSourceOpacityStates.get(dataSource);
    if (state === undefined) {
      state = { opacity: 1, wrapped: false };
      this.dataSourceOpacityStates.set(dataSource, state);
    }
    return state;
  }

  private installOpacityColorProperty(
    colorProperty: Property | undefined,
    state: DataSourceOpacityState,
    time: JulianDate,
    fallbackColor: Color,
    assign: (property: Property) => void
  ): void {
    if (
      colorProperty !== undefined &&
      this.dataSourceOpacityProperties.has(colorProperty)
    ) {
      // Zaten opaklikla sarilmis -- updateColorProperty ile AYNI
      // mutasyon-yerine-degistirme yaklasimi burada da gecerli, tekrar
      // sarmalamaya gerek yok.
      return;
    }

    const baseColor = this.readColorProperty(
      colorProperty,
      time,
      fallbackColor
    );
    const opacityProperty = this.createOpacityColorProperty(baseColor, state);
    assign(opacityProperty);
  }

  private readColorProperty(
    colorProperty: Property | undefined,
    time: JulianDate,
    fallbackColor: Color
  ): Color {
    const value = colorProperty?.getValue(time);
    return value instanceof Color
      ? Color.clone(value, new Color())
      : Color.clone(fallbackColor, new Color());
  }

  private createOpacityColorProperty(
    baseColor: Color,
    state: DataSourceOpacityState
  ): Property {
    const color = Color.clone(baseColor, new Color());
    const opacityProperty = new CallbackProperty((_time, result?: Color) => {
      const next = result instanceof Color ? result : new Color();
      next.red = color.red;
      next.green = color.green;
      next.blue = color.blue;
      next.alpha = color.alpha * state.opacity;
      return next;
    }, false) as unknown as Property;

    this.dataSourceOpacityProperties.set(opacityProperty, color);
    return opacityProperty;
  }
}
