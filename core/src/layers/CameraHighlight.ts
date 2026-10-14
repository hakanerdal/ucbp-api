import {
  BoundingSphere,
  Cartesian3,
  Cartographic,
  Color,
  ColorMaterialProperty,
  ConstantPositionProperty,
  CustomDataSource,
  Entity,
  HeadingPitchRange,
  Math as CesiumMath,
  PointGraphics,
  PolylineGraphics,
  type Viewer,
} from "cesium";
import type { LayerStyleSpec, ManagedLayer } from "../types/index.js";

export interface CameraHighlightDeps {
  requireLayer(id: string): ManagedLayer;
  getLayerStyle(id: string): LayerStyleSpec | undefined;
}

export class CameraHighlight {
  // highlightEntity()'nin GECICI stroke vurgusu icin SABIT renk -- kullanici
  // istegiyle katmanin/feature'in KENDI dis hat rengi (appliedLayerStyles)
  // YERINE HER ZAMAN bu renk kullanilir (bkz kullanici geri bildirimi:
  // "highlight rengi sabit #00FFFF olsun").
  private static readonly HIGHLIGHT_COLOR = Color.fromCssColorString("#00FFFF");
  // highlightEntity()'nin cizgi/poligon vurgusu, orijinal entity'nin AYNI
  // konumlarini izler -- clampToGround KULLANMADIGINDAN (bkz o metodun WHY
  // yorumu: "Netlik öncelikli" karari) ikisi pratikte AYNI derinlikte iki
  // ayri 3D primitive olarak cakisiyor, bu da (ozellikle feature'in KENDI
  // dis hatti da acikken) Z-FIGHTING'e (hangisinin ustte kazanacagi karesel
  // olarak degisir, ekranda vurgunun "yer yer soluklasip orijinal dis hatti
  // gostermesi" gibi gorunur -- bkz kullanici geri bildirimi: ekran
  // goruntusunde ic ice gecen ince/kalin cizgiler) yol aciyordu. Vurgu
  // noktalarini bu kadar (metre) yukari kaldirmak z-fighting'i KOKTEN
  // ortadan kaldirir (vurgu HER ZAMAN gercek anlamda daha yakin/ustte olur)
  // -- clampToGround'un aksine bu SADECE bir konum offseti, render teknigini
  // DEGISTIRMEZ, dolayisiyla egik acilarda soluklasma/blur riski YOKTUR.
  private static readonly HIGHLIGHT_ELEVATION_METERS = 0.5;

  // highlightEntity() tarafindan tembel (lazy) olusturulur -- TUM gecici
  // vurgu entity'leri (bkz o metod) bu TEK DataSource'ta yasar, katmanin
  // KENDI stiline (StyleEditor'un uyguladigi fill/outline) hic dokunulmadan
  // ustune gecici bir "highlight" ciziminin eklenip kaldirilmasini saglar.
  private highlightDataSource: CustomDataSource | undefined;

  constructor(
    private readonly viewer: Viewer,
    private readonly deps: CameraHighlightDeps
  ) {}

  /**
   * Kamerayı, katmanın tüm görünür alanına (extent) düz tepeden bakışla yakınlaştırır.
   *
   * @example
   * ```ts
   * await map.layerManager.zoomToLayer("katman-id");
   * ```
   */

  // viewer.zoomTo hem ImageryLayer hem DataSource kabul ettigi icin katmanin
  // turune bakmadan extent'ine (gorunur alanina) zoom yapar. Offset verilmezse
  // Cesium egik bir aciyla yaklasir; duz tepeden goruntu icin heading=0,
  // pitch=-90 derece kullanilir (range=0 -> tum katman otomatik sigacak sekilde).
  async zoomToLayer(id: string): Promise<boolean> {
    const managed = this.deps.requireLayer(id);
    return this.viewer.zoomTo(
      managed.cesiumObject,
      new HeadingPitchRange(0, -CesiumMath.PI_OVER_TWO, 0)
    );
  }

  /** Kamerayı, tek bir entity'nin çerçevesine düz tepeden bakışla yakınlaştırır. */

  // zoomToLayer ile AYNI top-down yaklasma (bkz yukaridaki yorum) ama TUM
  // katman yerine TEK bir entity'nin cercevesine -- TucbsIdentifyPanel'in
  // oznitelik tablosundaki "Yakınlaş" butonu icin (bkz PickedFeatureDetail.entity):
  // bir katmanda birden fazla feature varsa katmanin tamamina degil, sadece
  // TIKLANAN feature'a yakinlasmak istenir.
  //
  // viewer.zoomTo(entity, HeadingPitchRange(...range=0)) -- Cesium'un KENDI
  // otomatik mesafe hesabi -- entity'nin TUM visualizer'larindan (DataSourceDisplay)
  // derledigi bir bounding sphere kullanir; bu, entity'nin SADECE geometrisini
  // degil (varsa) ekran-uzayi boyutlu gorselleri (point/billboard/label pixelSize)
  // de kapsar ve bunlarin metreye cevirisi O ANKI kamera mesafesine baglidir --
  // identify tiklamasi genelde genis bir gorunumde yapildigindan bu cevirim
  // ABARTILI bir yaricap/mesafe uretebiliyordu (bkz kullanici geri bildirimi:
  // "GeoJSON feature'lara cok uzaktan zoomluyor... zoom to extent yapmiyor
  // musun"). Bunun yerine polygon/polyline geometrisi varsa bounding sphere
  // DOGRUDAN GERCEK KOORDINATLARDAN hesaplanip flyToBoundingSphere ile
  // gidilir -- sonuc SADECE feature'in gercek boyutuna bagli, kamera
  // mesafesinden BAGIMSIZDIR. Sadece nokta geometrisi olan (polygon/polyline
  // YOK) entity'lerde "extent" anlamsiz oldugundan eski davranis (Cesium'un
  // kendi zoomTo'su) korunur.
  async zoomToEntity(entity: Entity, options?: { duration?: number }): Promise<boolean> {
    const time = this.viewer.clock.currentTime;
    let positions: Cartesian3[] | undefined;

    if (entity.polygon?.hierarchy !== undefined) {
      const hierarchy = entity.polygon.hierarchy.getValue(time) as
        | { positions?: Cartesian3[] }
        | undefined;
      positions = hierarchy?.positions;
    } else if (entity.polyline?.positions !== undefined) {
      positions = entity.polyline.positions.getValue(time) as Cartesian3[] | undefined;
    }

    if (positions !== undefined && positions.length > 0) {
      const boundingSphere = BoundingSphere.fromPoints(positions);
      // Yaricapin 2 kati: feature TAM ekrani kaplamasin, etrafinda bir
      // nefes payi kalsin. 50m alt sinir: tek bir noktaya cok yakin
      // dortgen/cizgi gibi COK KUCUK feature'larda kameranin yuzeye
      // gomulmesini/asiri yakinlasmayi onler.
      const range = Math.max(boundingSphere.radius * 2, 50);
      return new Promise<boolean>((resolve) => {
        this.viewer.camera.flyToBoundingSphere(boundingSphere, {
          offset: new HeadingPitchRange(0, -CesiumMath.PI_OVER_TWO, range),
          // Cesium'un mesafeye gore OTOMATIK hesapladigi sure (uzak bir
          // noktadan yakinlasirken birkac saniyeye kadar cikabiliyor) yerine,
          // verilmisse SABIT/kisa bir sure kullanilir (bkz kullanici geri
          // bildirimi: "bu zoom'lama işi daha hızlı olsun").
          ...(options?.duration !== undefined ? { duration: options.duration } : {}),
          complete: () => resolve(true),
          cancel: () => resolve(false),
        });
      });
    }

    return this.viewer.zoomTo(
      entity,
      new HeadingPitchRange(0, -CesiumMath.PI_OVER_TWO, 0)
    );
  }

  // Bir entity'yi gorsel olarak vurgular -- TucbsIdentifyPanel'in "Yakınlaş"
  // butonu, kamera feature'a ulastiktan sonra HANGI feature'in bu oldugunu
  // gostermek icin zoomToEntity ile BIRLIKTE cagirir. Entity'nin KENDI
  // stilini (StyleEditor'un uyguladigi fill/outline) HIC DEGISTIRMEZ --
  // bunun yerine AYNI geometriyi izleyen, SABIT (animasyonsuz) bir GECICI
  // "stroke feature" ekler (this.highlightDataSource, bkz field yorumu).
  // Zamanlayiciyla KENDI KENDINE kaldirilmaz -- cagiran taraf (diyalog
  // kapaninca TucbsIdentifyPanel) clearHighlight()'i ACIKCA cagirmali (bkz
  // kullanici geri bildirimi: "En son diyaloğu kapanınca geçici feature'ı
  // kaldır"). Boylece orijinal entity'nin stilini "kaydet/geri yukle" gibi
  // riskli bir islem hic gerekmez.
  //
  // Vurgu rengi HER ZAMAN SABIT (HIGHLIGHT_COLOR, #00FFFF) -- katmanin/
  // feature'in KENDI dis hat rengi ARTIK kullanilmiyor (bkz kullanici geri
  // bildirimi: "highlight rengi sabit #00FFFF olsun" -- ONCEKI "kendi dış
  // hat renginde highlight edelim" karari BUNUNLA degistirildi). Genislik
  // hala entity'nin AIT OLDUGU katmanin O ANKI dis hat kalinligina gore
  // hesaplanir (appliedLayerStyles) -- mevcut dis hattin ustune SABIT bir
  // pay (+4px) eklenir, ust/alt sinir YOK (bkz kullanici geri bildirimi:
  // "6-16px arası sınırlı demişsin, kaldır") -- daha KALIN bir ikinci
  // cizgi, aynen ustunde durdugu icin kenarlardan tasarak zaten dikkat
  // ceker, animasyona GEREK KALMAZ.
  //
  // ONEMLI: nabiz animasyonu (CallbackProperty, isConstant:false) BILEREK
  // KALDIRILDI -- HER KAREDE yeniden degerlendirilen canli bir materyal,
  // "Yakınlaş" butonuna ust uste basildiginda (durationMs dolmadan) render
  // dongusunu tikayip sekmeyi/tarayiciyi dondurebiliyordu (bkz kullanici
  // geri bildirimi: "birkaç kez zoom yapınca tamamen donuyor"). Statik bir
  // ColorMaterialProperty (sabit Color, CallbackProperty DEGIL) bu riski
  // TAMAMEN ortadan kaldirir -- kac kez ust uste cagrilirsa cagrilsin
  // maliyeti SABITTIR (tek seferlik olusturma, GPU'ya SIFIR ek yuk).
  //
  // Nokta vurgusu disableDepthTestDistance:Infinity ile (derinlik testi
  // TAMAMEN devre disi -- her kosulda cizilir) her zaman ustte kalir.
  // Cizgi/poligon vurgusu icin de ayni garantiyi vermek uzere bir ara
  // denemede clampToGround:true + yuksek sabit zIndex (GroundPolylinePrimitive)
  // kullanilmisti -- ama bu teknik, egik/acili kamera bakislarinda cizgiyi
  // GOZLE GORULUR sekilde soluklastiriyordu (bkz kullanici geri bildirimi:
  // "silik silik gözüküyor" -- Cesium'un ground-primitive render tekniginin
  // BILINEN bir sinirlamasi). Kullanici NETLIGI tercih etti (bkz "Netlik
  // öncelikli" karari): bu yuzden cizgi/poligon vurgusu clampToGround
  // KULLANMAZ, SADECE depthFailMaterial ile terrain (arazi/tepe) tarafindan
  // ortulmeye karsi korunur -- bu uygulamada 3D bina/tileset olmadigindan
  // (SADECE 2D vektor katmanlar + arazi var) pratikte "her zaman ustte"
  // ihtiyacinin tamamini karsilar, cizgi de HER acida crisp/canli kalir.

  // Her pozisyonu KENDI yerel "yukari" yonunde (Cartographic.height + N metre)
  // kaldirir -- bkz HIGHLIGHT_ELEVATION_METERS WHY yorumu.
  private static elevate(positions: Cartesian3[], meters: number): Cartesian3[] {
    return positions.map((position) => {
      const carto = Cartographic.fromCartesian(position);
      return Cartesian3.fromRadians(
        carto.longitude,
        carto.latitude,
        carto.height + meters
      );
    });
  }

  /** Bir entity'yi, kendi stiline dokunmadan sabit renkli bir "outline" ile geçici olarak vurgular (bkz yukarıdaki WHY notları). */
  highlightEntity(entity: Entity): void {
    const time = this.viewer.clock.currentTime;
    const props = entity.properties?.getValue(time) as Record<string, unknown> | undefined;
    const layerId = props?.layerId as string | undefined;
    const style = layerId !== undefined ? this.deps.getLayerStyle(layerId) : undefined;
    const strokeColor = CameraHighlight.HIGHLIGHT_COLOR;
    const strokeWidth = (style?.outline.width ?? 2) + 4;
    const strokeMaterial = new ColorMaterialProperty(strokeColor);

    const highlight = new Entity();

    if (entity.polygon?.hierarchy !== undefined) {
      const hierarchy = entity.polygon.hierarchy.getValue(time) as
        | { positions?: Cartesian3[] }
        | undefined;
      const positions = hierarchy?.positions;
      if (positions === undefined || positions.length < 2) return;
      const ring = Cartesian3.equals(positions[0]!, positions[positions.length - 1]!)
        ? positions
        : [...positions, positions[0]!];
      highlight.polyline = new PolylineGraphics({
        positions: CameraHighlight.elevate(ring, CameraHighlight.HIGHLIGHT_ELEVATION_METERS),
        width: strokeWidth,
        material: strokeMaterial,
        depthFailMaterial: strokeMaterial,
      });
    } else if (entity.polyline?.positions !== undefined) {
      const positions = entity.polyline.positions.getValue(time) as Cartesian3[] | undefined;
      if (positions === undefined || positions.length < 2) return;
      highlight.polyline = new PolylineGraphics({
        positions: CameraHighlight.elevate(positions, CameraHighlight.HIGHLIGHT_ELEVATION_METERS),
        width: strokeWidth,
        material: strokeMaterial,
        depthFailMaterial: strokeMaterial,
      });
    } else if (entity.position !== undefined) {
      const position = entity.position.getValue(time) as Cartesian3 | undefined;
      if (position === undefined) return;
      highlight.position = new ConstantPositionProperty(position);
      highlight.point = new PointGraphics({
        pixelSize: strokeWidth + 12,
        color: strokeColor,
        disableDepthTestDistance: Number.POSITIVE_INFINITY,
      });
    } else {
      return;
    }

    if (!this.highlightDataSource) {
      this.highlightDataSource = new CustomDataSource("__tucbs_highlight__");
      void this.viewer.dataSources.add(this.highlightDataSource);
    } else {
      // TEK SEFERDE SADECE BIR vurgu olabilir -- yeni bir feature
      // vurgulanirken (ya da clearHighlight ile) ONCEKI burada temizlenir.
      this.highlightDataSource.entities.removeAll();
    }
    this.highlightDataSource.entities.add(highlight);
  }

  /** {@link highlightEntity} ile eklenen geçici vurguyu kaldırır (aktif vurgu yoksa no-op). */

  // TucbsIdentifyPanel oznitelik tablosu diyalogu KAPANDIGINDA cagirir
  // (bkz kullanici geri bildirimi).
  clearHighlight(): void {
    this.highlightDataSource?.entities.removeAll();
  }
}
