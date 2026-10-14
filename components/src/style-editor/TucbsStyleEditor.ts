import { LitElement, html, type PropertyValues } from "lit";
import { customElement, property, state, query } from "lit/decorators.js";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import "@carbon/web-components/es/components/dropdown/index.js";
import "@carbon/web-components/es/components/checkbox/index.js";
import "@carbon/web-components/es/components/text-input/index.js";
import "@carbon/web-components/es/components/number-input/index.js";
import type {
  LayerManager,
  LayerType,
  FillStyle,
  LayerStyleSpec,
} from "@tucbs/core";

const SERVICE_LAYER_TYPES: readonly LayerType[] = ["WMS", "WMTS"];
import { applyCustomCss, type CustomCssState } from "../shared/util/CustomCss.js";
import { iconNodeToString } from "../shared/util/CarbonIcon.js";
import { VirtualScrollbar } from "../shared/ui/VirtualScrollbar.js";
import { DraggablePanelController } from "../shared/ui/DraggablePanelController.js";
import { styleEditorStyles } from "./styleEditorStyles.js";
import "./TucbsServiceStyleCard.js";
import {
  DEFAULT_FILL_COLOR,
  GRADIENT_PALETTES,
  DEFAULT_GRADIENT_PALETTE,
  paletteKindOf,
  checkGradientBound,
  type GradientBoundCheck,
  buildFillStyle,
  sampleFromPaletteCss,
  sortCategoryValues,
  autoFillCategoryColors,
  deriveStyleEditorState,
  toHexColor,
  type StyleEditorFormDefaults,
} from "./fillStyleSpec.js";
import { binLegendRows, gradientLegendRows } from "../shared/util/legendRows.js";
import { TimerBag } from "../shared/util/TimerBag.js";
import {
  renderFillCard,
  CATEGORY_SORT_OPTIONS,
  DEFAULT_BIN_COUNT,
  FILL_COLOR_MODES,
  type FillCardHost,
} from "./fillCard.js";

import {
  ColorPalette20 as ColorPaletteIcon,
  Renew16 as RenewIcon,
  Close16 as CloseIcon,
} from "@carbon/icons";

const ICON_PALETTE_20 = unsafeSVG(iconNodeToString(ColorPaletteIcon));
const ICON_RENEW = unsafeSVG(iconNodeToString(RenewIcon));
const ICON_CLOSE = unsafeSVG(iconNodeToString(CloseIcon));

// toHexColor fillStyleSpec.ts'e tasindi (deriveStyleEditorState de kullaniyor);
// TucbsLayerList'in mevcut import'u bozulmasin diye buradan da export edilir.
export { toHexColor };


const DEFAULT_FILL_OPACITY = 46;
// Cizim Katmani VE Olcu Katmani'nin dolgu opakligi diger katman turlerinden
// FARKLI -- LayerManager._addDrawnShape()/_addMeasuredShape()'teki
// recordInitialStyle/applyEntityStyle cagrilarindaki fillOpacity (0.4) ile
// AYNI deger.
const FIXED_SOLID_LAYER_FILL_OPACITY = 40;
const DEFAULT_OUTLINE_ENABLED = true;
// LayerManager'in recordInitialStyle() cagrilarindaki (addLocalKmlGeoJson/
// addShp/addWFS) sabit dis hat rengiyle AYNI deger -- katman ilk eklendiginde
// ve "Sifirla" sonrasinda ayni maviye/genislige donulmesi bekleniyor.
const DEFAULT_OUTLINE_COLOR = "#1a73e8";
const DEFAULT_OUTLINE_WIDTH = "2";
// Cizim Katmani VE Olcu Katmani'nin dis hat genisligi diger katman
// turlerinden FARKLI -- LayerManager._addDrawnShape()/_addMeasuredShape()'teki
// initialOutline.width ile AYNI deger (bkz. o dosyadaki yorum).
const FIXED_SOLID_LAYER_OUTLINE_WIDTH = "1";
// Cesium'da dis hat GENISLIGI (outline enabled/renk'in AKSINE) her entity
// icin geometrinin YENIDEN INSA edilmesini gerektiriyor (bkz LayerManager
// applyLayerStyle'daki "outline GENISLIGI gibi gercekten geometri
// gerektiren degisiklikler" yorumu) -- COK BUYUK (bkz kullanici bildirimi:
// 27458 ozellikli bir WFS "World continents" katmani) katmanlarda bu
// gorunur bir etkisi olmadan ("yükleniyor" biter, haritada tepki olmaz)
// SESSIZCE cok uzun surebiliyor. Kullanici bildirimi geregi WFS "count"
// limiti KALDIRILDI (bkz LayerManager.TEMP_WFS_UNLIMITED_MAX_FEATURES) --
// bunun yerine bu esigi asan katmanlarda SADECE bu pahali kontrol devre
// disi birakilir (dolgu/renk gibi ucuz -- in-place property mutasyonu
// kullanan -- kontroller ETKILENMEZ).
const LARGE_LAYER_FEATURE_THRESHOLD = 5000;
// Surekli (Gradient) Lejant kartinin ornek satir sayisi (GRADIENT_LEGEND_STEPS)
// ve satir uretimi Faz 3.4b'de shared/util/legendRows.ts'e tasindi.
// "Degerler" (Kategorik) ve "Lejant" (Gradient/Bin) kaydirilabilir
// listelerinde AYNI ANDA gorunecek TAM satir sayisi -- bkz _fitListToRows
// WHY yorumu (CSS'teki tahmini max-height yerine GERCEK satir yuksekligi
// JS ile OLCULEREK uygulanir, boylece N+1. satirda scroll baslar ve
// GORUNEN satirlardan hicbiri altdan/ustten KIRPILMAZ).
const VISIBLE_LIST_ROWS = 10;

// SHP/GeoJSON/WFS kaynaklarinin OTOMATIK urettigi, kullanicinin veri
// modeline ait OLMAYAN teknik alanlar (ESRI shapefile alan/cevre alanlari,
// benzersiz kimlik alanlari) -- stilleme icin anlamsiz, "Veri Sutunu"
// listesinde HICBIR renk modunda gosterilmez (bkz. LayerManager.
// getEntityPropertyNames -- ham property adlarini FILTRESIZ dondurur).
// "Shape_Leng" (ESRI'nin cevre/uzunluk icin fiilen kullandigi kisaltma,
// "Shape_Length" DEGIL) dahil tum yazim varyantlari kapsanir; sondaki
// "(_\d+)?" ise join/birlestirme sonrasi olusan "OBJECTID_1" gibi
// numaralanmis kopyalari da yakalar.
const TECHNICAL_COLUMN_PATTERN =
  /^(shape_area|shape_leng|shape_length|shape_len|objectid|fid|gml_id|gid)(_\d+)?$/i;

const DEFAULT_COLOR_MODE = FILL_COLOR_MODES[0]!.value;

const DEFAULT_CATEGORY_SORT = CATEGORY_SORT_OPTIONS[0]!.value;

// openFor()'da kayitli stil yoksa/eksikse kullanilan varsayilanlar (bkz
// fillStyleSpec.deriveStyleEditorState) -- sabitler ve WHY yorumlari burada kalir.
const STYLE_EDITOR_FORM_DEFAULTS: StyleEditorFormDefaults = {
  colorMode: DEFAULT_COLOR_MODE,
  fillOpacity: DEFAULT_FILL_OPACITY,
  outlineEnabled: DEFAULT_OUTLINE_ENABLED,
  outlineColor: DEFAULT_OUTLINE_COLOR,
  outlineWidth: DEFAULT_OUTLINE_WIDTH,
  binCount: DEFAULT_BIN_COUNT,
};

/**
 * Katman stili duzenleme diyalogu.
 * Su an sadece arayuz: girilen degerler yerel state'te tutulur. LayerManager/
 * ManagedLayer'a bir stil uygulama API'si (orn. layer.applyStyle()) eklendiginde
 * buradaki degerler ona baglanacak.
 * @fires tucbs-style-editor-closed - Diyalog kapatıldığında (`open` false yapılır); `detail` yok.
 */
@customElement("tucbs-style-editor")
export class TucbsStyleEditor extends LitElement {
  static override readonly styles = styleEditorStyles;

  /** Diyaloğun açık olup olmadığı (`open` attribute'una reflect edilir). */
  @property({ type: Boolean, reflect: true }) open = false;

  /** Core JS API `LayerManager` referansı. */

  // Stil su an sadece yerelde tutuluyor; ileride layer.applyStyle() gibi bir
  // API eklendiginde kullanilacak.
  @property({ attribute: false }) layerManager: LayerManager | undefined;

  /** Düzenlenecek katmanın kimliği. */
  @property() layerId = "";
  /** Düzenlenecek katmanın başlığı (diyalog üstünde gösterilir). */
  @property() layerTitle = "";
  /** Düzenlenecek katmanın türü. */
  @property() layerType: LayerType | "" = "";

  /** Tüketicinin, bileşen kaynağına dokunmadan shadow DOM'a enjekte edebileceği keyfi CSS metni (bkz `./internal/CustomCss.ts`). */
  @property({ attribute: "custom-css" }) customCss = "";

  private readonly _customCssState: CustomCssState = { sheet: null };

  @state() private _colorMode = DEFAULT_COLOR_MODE;
  @state() private _dataColumn = "";
  @state() private _dataColumns: string[] = [];
  // gradient/bin modunda SADECE sayisal (getColumnRange null DONMEYEN)
  // sutunlar secilebilir -- string bir sutunda "min/max" anlamsizdir (bkz.
  // kullanici bildirimi). _dataColumns'un ("Veri Sutunu" listesi icin teknik
  // alanlari zaten filtrelenmis tam liste) bir alt kumesidir.
  @state() private _numericDataColumns: string[] = [];
  @state() private _gradientPalette = DEFAULT_GRADIENT_PALETTE;
  @state() private _gradientMin = "";
  @state() private _gradientMax = "";
  // Min/Max alanindaki gecersiz deger uyarisi (bos = gecerli); bkz H6.2.
  @state() private _gradientMinError = "";
  @state() private _gradientMaxError = "";
  @state() private _binCount = DEFAULT_BIN_COUNT;
  @state() private _categorySort = DEFAULT_CATEGORY_SORT;
  @state() private _paletteReversed = false;
  @state() private _categoryValues: (string | number)[] = [];
  @state() private _categoryColors: Record<string, string> = {};
  @state() private _fillColor = DEFAULT_FILL_COLOR;
  @state() private _fillOpacity = DEFAULT_FILL_OPACITY;
  @state() private _outlineEnabled = DEFAULT_OUTLINE_ENABLED;
  @state() private _outlineColor = DEFAULT_OUTLINE_COLOR;
  @state() private _outlineWidth = DEFAULT_OUTLINE_WIDTH;
  // openFor()'da layerManager.getFeatureCount() ile doldurulur -- entity-
  // tabanli olmayan (ImageryLayer, ör. WMS/WMTS) katmanlarda undefined kalir.
  @state() private _featureCount: number | undefined;

  // WMS/WMTS icin <tucbs-service-style-card>'a "yeniden sorgula" sinyali --
  // bkz openFor()'daki WHY yorumu.
  @state() private _serviceStyleRequestId = 0;

  private readonly _drag = new DraggablePanelController(this, {
    getPanel: () => this,
    ignoreSelector: ".close-btn",
  });

  // Kategorik (Enum) modunda "Degerler" listesi -- native scrollbar
  // scrollbar-width:none ile GIZLENIR, gorunen gostergeyi VirtualScrollbar ile
  // (bkz shared/ui/VirtualScrollbar.ts -- TucbsIdentifyPanel/TucbsServiceUpload
  // ile PAYLASILAN tek uygulama) kendimiz ciziyoruz. Cok sayida kategori
  // degeri oldugunda (orn. 200 ulke) liste diyalogun disina TASIYORDU --
  // sabit yukseklikli bir kutuya alinip icinde kaydiriliyor.
  @query(".category-values-list") private _categoryListEl?: HTMLDivElement;
  @query(".category-scroll-thumb") private _categoryThumbEl?: HTMLDivElement;
  private readonly _categoryScroll = new VirtualScrollbar(
    this,
    () => this._categoryListEl,
    () => this._categoryThumbEl,
  );

  // Surekli (Gradient)/Kesikli (Bin) Lejant listesi -- _categoryListEl/
  // _categoryThumbEl ile AYNI desen, ayni VirtualScrollbar sinifiyla (bkz o
  // alanlarin yorumu) -- bkz kullanici bildirimi: "TucbsServiceUpload'daki
  // Katmanlar listesinden scroll gibi olacak, surekli gorunur olacak".
  // Gradient/Bin ayni anda ACIK olmadigindan (bkz _colorMode) TEK bir
  // sorgu ikisini de kapsar -- hangisi render ediliyorsa o eslesir.
  @query(".legend-bin-list") private _legendListEl?: HTMLDivElement;
  @query(".legend-scroll-thumb") private _legendThumbEl?: HTMLDivElement;
  private readonly _legendScroll = new VirtualScrollbar(
    this,
    () => this._legendListEl,
    () => this._legendThumbEl,
  );

  // Katman stili degisince (renk modu/palet/min-max/kategori/dis hat) her
  // state guncellemesinde LayerManager.applyLayerStyle() cagirir -- canli
  // onizleme. Opaklik slider'indaki RAF-throttle deseniyle AYNI sebepten
  // (surukleme sirasinda frame basina en fazla bir Cesium-tarafi guncelleme)
  // tum stil degisikliklerinde de kullanilir.
  private _applyStyleRaf: number | null = null;

  // Genislik alanina YAZARKEN/oklarla hizli hizli artirilip azaltilirken
  // uygulanacak "en guncel" ham deger (bkz _scheduleApplyStyle'in
  // outlineWidthOverride parametresi) -- bir RAF ZATEN planliyken gelen
  // yeni cagrilar sadece bunu gunceller, RAF'i YENIDEN PLANLAMAZ (bkz o
  // metodun WHY yorumu).
  private _pendingOutlineWidthOverride: string | undefined;

  // Opaklik slider'i surukleme sirasinda harita/render guncellemesi frame
  // basina en fazla bir kez uygulanir (bkz. _setFillOpacity); slider'in
  // kendi gorsel hareketi --fill degiskeni ile Lit'e ugramadan aninda akar.
  private _fillOpacityRaf: number | null = null;
  /** Tüm setTimeout/rAF çağrılarını izler; bileşen DOM'dan kalkınca bekleyenleri iptal eder (bkz shared/util/TimerBag.ts). */
  private readonly _timers = new TimerBag(this);

  /** Bileşen DOM'dan kaldırıldığında bekleyen RAF'ları iptal eder ve `layerManager` dinleyicisini kaldırır. */
  override disconnectedCallback(): void {
    // ESKIDEN _fillOpacityRaf/_applyStyleRaf burada cancelAnimationFrame ile
    // elle iptal ediliyordu; artik _timers (TimerBag) super.disconnectedCallback()
    // icinde (hostDisconnected) ikisini de iptal ediyor.
    if (this.layerManager) this.layerManager.off("layer:style", this._onLayerStyle);
    super.disconnectedCallback();
  }

  // Dialog açıkken (ör. TucbsLayerList'ten) başka bir yerden bu katmana
  // solid renk uygulanırsa canlı senkron — çift yönlü senkronun StyleEditor
  // tarafı. Kendi tetiklediği değişiklikleri de aynı değerle geri
  // yazdığından (idempotent) döngü oluşturmaz — applyLayerStyle burada
  // TEKRAR çağrılmaz, yalnız görüntü state'i güncellenir. Opaklık, TÜM fill
  // modlarında (solid dışında da) mevcut olduğu için (bkz FillStyle union)
  // TucbsLayerList'in katman opaklık barı (bkz o dosyadaki _applyOpacity)
  // sürüklenirken de burası canlı güncellenir -- renk ise SADECE solid
  // modda anlamlı.
  private readonly _onLayerStyle = (payload: {
    id: string;
    style: LayerStyleSpec;
  }) => {
    if (!this.open || payload.id !== this.layerId) return;
    const { fill } = payload.style;
    if (fill.mode === "off") return;
    if (fill.mode === "solid") this._fillColor = toHexColor(fill.color);
    this._fillOpacity = Math.round(fill.opacity * 100);
  };

  /** Reactive property değişikliklerini (customCss/open/layerManager) işler ve liste scroll-thumb'larını yeniden senkronlar. */
  override updated(changedProperties: PropertyValues<this>) {
    if (changedProperties.has("customCss")) {
      applyCustomCss(this.shadowRoot, this.customCss, this._customCssState, "tucbs-style-editor");
    }

    if (changedProperties.has("open") && this.open) {
      // always reopen centered — forget any position left over from dragging
      this.style.removeProperty("left");
      this.style.removeProperty("top");
      this.style.removeProperty("transform");
    }
    if (changedProperties.has("layerManager")) {
      const previous = changedProperties.get("layerManager");
      if (previous) previous.off("layer:style", this._onLayerStyle);
      if (this.layerManager) this.layerManager.on("layer:style", this._onLayerStyle);
    }
    // TucbsServiceUpload.updated()'daki ayni cagriyla AYNI gerekce: "Degerler"
    // listesinin scrollHeight'i her render sonrasi degisebilir (kategori
    // sayisi/renk modu degisince); kosulsuz yeniden olcmek ucuz. Ayni sebep
    // Surekli/Kesikli Lejant listesi icin de gecerli. max-height ONCE
    // GERCEK satir yuksekligine gore YENIDEN olculup uygulanir (bkz
    // _fitListToRows), thumb senkronu bunun HEMEN ardindan yapilir --
    // aksi halde thumb, henuz guncellenmemis (eski/CSS varsayilani) bir
    // scrollHeight/clientHeight'a gore hesaplanirdi.
    // Kare _timers (TimerBag) ile planlanir: bilesen DOM'dan kalkinca iptal
    // edilir. ESKIDEN ciplak requestAnimationFrame'di ve bilesen kalksa bile
    // kopmus DOM uzerinde olcum yapiyordu.
    this._timers.requestAnimationFrame(() => {
      TucbsStyleEditor._fitListToRows(this._categoryListEl, ".legend-bin-row");
      TucbsStyleEditor._fitListToRows(this._legendListEl, ".legend-bin-row");
      this._categoryScroll.sync();
      this._legendScroll.sync();
    });
  }

  /**
   * Diyalogu belirtilen katman icin, mevcut dolgu rengi/opakligiyla acar.
   *
   * @example
   * ```ts
   * const styleEditor = document.querySelector("tucbs-style-editor");
   * styleEditor.layerManager = map.layerManager;
   * styleEditor.openFor("world-continents", "World Continents (WMS)", "WMS", "#3388ff", 0.8);
   * ```
   */
  openFor(
    layerId: string,
    layerTitle: string,
    layerType: LayerType,
    initialFillColor?: string,
    initialFillOpacity?: number,
  ): void {
    this.layerId = layerId;
    this.layerTitle = layerTitle;
    this.layerType = layerType;
    // bkz LARGE_LAYER_FEATURE_THRESHOLD WHY yorumu -- cok buyuk katmanlarda
    // "Genişlik" gibi geometri-etkileyen kontroller devre disi birakilir.
    this._featureCount = this.layerManager?.getFeatureCount(layerId);
    this._dataColumns = [];
    this._numericDataColumns = [];
    this._categorySort = DEFAULT_CATEGORY_SORT;
    // Tek doğru kaynak: LayerManager.getLayerStyle() — katman eklendiği an
    // (random renk) veya daha önce bir düzenleme yapıldıysa güncel hali.
    // initialFillColor/initialFillOpacity parametreleri yalnız layerManager
    // henüz hazır değilse (savunmacı) devreye girer.
    const currentStyle = this.layerManager?.getLayerStyle(layerId);
    // Kayitli stilden form alanlarinin hesabi (ve neden TAMAMININ geri
    // yuklendigi) saf bir fonksiyonda: bkz fillStyleSpec.deriveStyleEditorState.
    const form = deriveStyleEditorState(
      currentStyle,
      initialFillColor,
      initialFillOpacity,
      STYLE_EDITOR_FORM_DEFAULTS,
    );
    this._colorMode = form.colorMode;
    this._fillColor = form.fillColor;
    this._fillOpacity = form.fillOpacity;
    this._dataColumn = form.dataColumn;
    this._gradientPalette = form.gradientPalette;
    this._paletteReversed = form.paletteReversed;
    this._gradientMin = form.gradientMin;
    this._gradientMax = form.gradientMax;
    this._gradientMinError = "";
    this._gradientMaxError = "";
    this._binCount = form.binCount;
    this._categoryColors = form.categoryColors;
    // Siralama bilesende kalir: "Verideki sira" secenegi layerManager ister
    // (bkz _sortCategoryValues); _categorySort yukarida varsayilana dondu.
    this._categoryValues = this._sortCategoryValues(form.categoryValues);
    this._outlineEnabled = form.outlineEnabled;
    this._outlineColor = form.outlineColor;
    this._outlineWidth = form.outlineWidth;
    // Konum/Bilgi Al diyalogu ile ayni alani kapladiklarindan ust uste
    // binmesinler: Stil Editörü acilirken acik Konum/Bilgi Al kapatilir.
    for (const panel of document.querySelectorAll<HTMLElement & { close(): void }>(
      "tucbs-identify-panel",
    )) {
      panel.close();
    }
    this.open = true;

    // WMS/WMTS icin sunucu stili sorgusu artik <tucbs-service-style-card>'in
    // kendi icinde (bkz o dosyadaki willUpdate()) -- layerId/layerType
    // degisince KENDILIGINDEN tetiklenir. ONCEKI surum openFor() her
    // cagrildiginda (ayni katman icin IKINCI kez acilsa bile,
    // orn. kullanici ayni satirin "Stil Duzenle" aksiyonuna iki kez
    // tiklarsa) sorguyu KOSULSUZ tekrarliyordu -- layerId DEGISMEDIGI
    // icin property-degisikligi ile tetiklenen yeniden yukleme bunu
    // YAKALAMAZDI. _serviceStyleRequestId, openFor() HER cagrildiginda
    // (katman degismese bile) artan bir sayac olarak AYNI garantiyi verir.
    this._serviceStyleRequestId++;
    if (!this._isServiceLayer) {
      this._loadDataColumns();
    }
  }

  private get _isServiceLayer(): boolean {
    return SERVICE_LAYER_TYPES.includes(this.layerType as LayerType);
  }

  // Cizim Katmani VE Olcu Katmani'nin fill modu her zaman "solid" kalir --
  // Renk Modu dropdown'u bu katmanlar icin gizlenir (bkz TucbsLayerList.ts'teki
  // ayni layerType kontrolu, renk noktasi/Lejant icin).
  private get _isFixedSolidLayer(): boolean {
    return this.layerType === "DRAWING" || this.layerType === "MEASURE";
  }

  // bkz LARGE_LAYER_FEATURE_THRESHOLD WHY yorumu.
  private get _outlineWidthDisabledByScale(): boolean {
    return (
      this._featureCount !== undefined &&
      this._featureCount > LARGE_LAYER_FEATURE_THRESHOLD
    );
  }

  /**
   * Diger panel/dialoglarla karsilikli disari kapatma icin genel API (bkz TucbsLayerList).
   *
   * @example
   * ```ts
   * styleEditor.close();
   * ```
   */
  close(): void {
    this._close();
  }

  private _close() {
    this.open = false;
    this.dispatchEvent(
      new CustomEvent("tucbs-style-editor-closed", {
        bubbles: true,
        composed: true,
      }),
    );
  }

  private _reset() {
    this._colorMode = DEFAULT_COLOR_MODE;
    this._dataColumn = "";
    this._gradientMin = "";
    this._gradientMax = "";
    this._gradientMinError = "";
    this._gradientMaxError = "";
    this._gradientPalette = DEFAULT_GRADIENT_PALETTE;
    this._binCount = DEFAULT_BIN_COUNT;
    this._categorySort = DEFAULT_CATEGORY_SORT;
    this._paletteReversed = false;
    this._categoryValues = [];
    this._categoryColors = {};
    // Katmanın ilk (eklendiğinde atanan random) rengine döner — ayrı bir
    // uygulama varsayılanına değil (bkz. LayerManager.getInitialFillColor).
    const initialColor = this.layerManager?.getInitialFillColor(this.layerId);
    this._fillColor = initialColor ? toHexColor(initialColor) : DEFAULT_FILL_COLOR;
    this._fillOpacity = this._isFixedSolidLayer ? FIXED_SOLID_LAYER_FILL_OPACITY : DEFAULT_FILL_OPACITY;
    this._outlineEnabled = DEFAULT_OUTLINE_ENABLED;
    this._outlineColor = DEFAULT_OUTLINE_COLOR;
    this._outlineWidth = this._isFixedSolidLayer ? FIXED_SOLID_LAYER_OUTLINE_WIDTH : DEFAULT_OUTLINE_WIDTH;
    if (!this._isServiceLayer) this._scheduleApplyStyle();
  }

  // TucbsLayerList'teki katman opaklik bar'i ile ayni yaklasim: gorsel dolgu
  // aninda (Lit'e ugramadan) --fill CSS degiskeni ile guncellenir; asil
  // _fillOpacity state guncellemesi (ve dolayisiyla bunun tetikledigi
  // re-render) requestAnimationFrame ile frame basina en fazla bir kez
  // uygulanir. Bu, cds-slider'in her surukleme tikinde tam bir Lit
  // re-render'i tetikleyip yol actigi takilmayi ortadan kaldirir.
  private _updateOpacitySlider(input: HTMLInputElement, value: number): void {
    input.style.setProperty("--fill", `${value}%`);
  }

  private _setFillOpacity(value: number): void {
    this._timers.cancelAnimationFrame(this._fillOpacityRaf);
    this._fillOpacityRaf = this._timers.requestAnimationFrame(() => {
      this._fillOpacityRaf = null;
      this._fillOpacity = value;
      this._scheduleApplyStyle();
    });
  }

  // ── Vektor stil (WFS/LOCAL): veri sutunu + canli onizleme ──────────────────

  private _loadDataColumns(): void {
    if (!this.layerManager || !this.layerId) return;
    const names = this.layerManager
      .getEntityPropertyNames(this.layerId)
      .filter((name) => !TECHNICAL_COLUMN_PATTERN.test(name));
    this._dataColumns = names;
    // getColumnRange() bir sutunda TEK bir sayiya cevrilebilir deger bile
    // bulamazsa null doner (bkz LayerManager.getColumnRange/readNumericProperty)
    // -- Gradient/Bin dropdown'unu bu sinyalle sayisal sutunlarla sinirliyoruz.
    this._numericDataColumns = names.filter(
      (name) => this.layerManager!.getColumnRange(this.layerId, name) !== null,
    );
  }

  private _onDataColumnChange(column: string): void {
    this._dataColumn = column;
    if (!this.layerManager || !this.layerId || !column) return;

    if (this._colorMode === "gradient" || this._colorMode === "bin") {
      const range = this.layerManager.getColumnRange(this.layerId, column);
      this._gradientMin = range ? String(range.min) : "";
      this._gradientMax = range ? String(range.max) : "";
      this._gradientMinError = "";
      this._gradientMaxError = "";
    } else if (this._colorMode === "enum") {
      this._loadCategoryValues(column);
    }
    this._scheduleApplyStyle();
  }

  // Min/Max alanina yazilan degerin gecerliligi (veri araligi + Min <= Max);
  // kural ve gecmisi: bkz style-editor/fillStyleSpec.ts checkGradientBound()
  // (gercek hatalar plani H6.2 -- eskiden burada her tusta cagrilan
  // _clampGradientRange() vardi). Bu sarmalayici yalniz guncel sutun
  // araligini ve diger alanin son gecerli degerini toplar.
  private _checkGradientBound(edited: "min" | "max", value: string): GradientBoundCheck {
    const range =
      this.layerManager && this.layerId && this._dataColumn
        ? this.layerManager.getColumnRange(this.layerId, this._dataColumn)
        : null;
    const other = edited === "min" ? this._gradientMax : this._gradientMin;
    return checkGradientBound(value, edited, other, range);
  }

  // Sutun secilmemisse/araligi henuz bilinmiyorsa temkinli davranip "-"
  // karakterine izin verilir (kullaniciyi erken engellememek icin); aralik
  // biliniyorsa sadece o alanin GERCEKTEN negatif bir deger alabilecegi
  // durumda izin verilir.
  private _allowNegativeMin(): boolean {
    if (!this.layerManager || !this.layerId || !this._dataColumn) return true;
    const range = this.layerManager.getColumnRange(this.layerId, this._dataColumn);
    return !range || range.min < 0;
  }

  private _allowNegativeMax(): boolean {
    if (!this.layerManager || !this.layerId || !this._dataColumn) return true;
    const range = this.layerManager.getColumnRange(this.layerId, this._dataColumn);
    return !range || range.max < 0;
  }

  // "Verideki sira" icin mevcut (zaten siralanmis) liste yeterli degil --
  // sortCategoryValues "source"ta girdiyi aynen dondurdugu icin secenek
  // hicbir sey yapmiyordu. Kaynak sira canli veriden (getUniqueColumnValues,
  // entity sirasi) alinip SADECE siralama icin kullanilir; "Degerler"in
  // kume icerigi (committed fill.colors) degismez, veride artik olmayan
  // degerler sona kalir.
  private _sortCategoryValues(values: (string | number)[]): (string | number)[] {
    if (this._categorySort !== "source") return sortCategoryValues(values, this._categorySort);
    if (!this.layerManager || !this.layerId || !this._dataColumn) return values;
    const order = new Map<string, number>();
    this.layerManager
      .getUniqueColumnValues(this.layerId, this._dataColumn)
      .forEach((value, index) => order.set(String(value), index));
    const rank = (value: string | number): number =>
      order.get(String(value)) ?? Number.MAX_SAFE_INTEGER;
    return [...values].sort((a, b) => rank(a) - rank(b));
  }

  private _loadCategoryValues(column: string): void {
    if (!this.layerManager || !this.layerId) return;
    const raw = this.layerManager.getUniqueColumnValues(this.layerId, column);
    this._categoryValues = this._sortCategoryValues(raw);
    this._categoryColors = this._autoFillCategoryColors(this._categoryValues, this._categoryColors);
  }

  // Hesap artik style-editor/fillStyleSpec.ts'te (bkz sampleFromPaletteCss/hexToRgb/
  // sortCategoryValues WHY yorumlari; formatLegendNumber shared/util/legendFormat.ts'te) -- bu sarmalayici
  // aktif palet renklerini toplayip cagiriyor, davranis DEGISMEDI.
  private _autoFillCategoryColors(
    values: (string | number)[],
    existing: Record<string, string>,
  ): Record<string, string> {
    return autoFillCategoryColors(values, existing, this._activePaletteColors());
  }

  // "Degerler"/"Lejant" listelerinin max-height'ini CSS'te SABIT bir
  // "N * tahmini-satir-yuksekligi" degeri olarak vermek (ilk denemede
  // yapilan buydu) kirilgan cikti -- Kategorik'in 28px'lik swatch'i ile
  // Lejant'in 16px'lik swatch'i arasindaki fark, metin etiketinin GERCEK
  // satir yuksekligi (font-size/line-height'a bagli, tahmin edilenden
  // farkli) yuzunden N. satirin TAM sigmayip alttan KIRPILMASINA yol
  // aciyordu (bkz kullanici bildirimi: "lejant satirlari alttan
  // kesilmesin"). Bunun yerine ILK IKI satirin GERCEK DOM konumlarini
  // olcup aralarindaki mesafeyi ("satir + bosluk" toplami) hesaplayip
  // max-height'i BUNDAN turetiyoruz -- font metrikleri/DOM ic ice
  // yerlesimi ne olursa olsun (Kategorik'te bosluk bir IC div'de, Lejant'ta
  // listenin KENDISINDE -- ikisi de farkli), TAM VISIBLE_LIST_ROWS satir
  // her zaman eksiksiz sigar, N+1. satirda scroll baslar.
  private static _fitListToRows(list: HTMLDivElement | undefined, rowSelector: string): void {
    if (!list) return;
    const rows = list.querySelectorAll<HTMLElement>(rowSelector);
    if (rows.length === 0) {
      list.style.maxHeight = "";
      return;
    }
    const firstRect = rows[0]!.getBoundingClientRect();
    if (rows.length === 1) {
      list.style.maxHeight = `${firstRect.height}px`;
      return;
    }
    const secondRect = rows[1]!.getBoundingClientRect();
    const rowStride = secondRect.top - firstRect.top;
    const maxHeight = firstRect.height + rowStride * (VISIBLE_LIST_ROWS - 1);
    list.style.maxHeight = `${maxHeight}px`;
  }

  private _activePaletteColors(): readonly string[] {
    const palette =
      GRADIENT_PALETTES.find((p) => p.value === this._gradientPalette) ?? GRADIENT_PALETTES[0]!;
    return this._paletteReversed ? [...palette.colors].reverse() : palette.colors;
  }

  // exactOptionalPropertyTypes: true altinda "min: undefined" ile hic
  // key'in olmamasi FARKLI seyler -- bos birakilan min/max alanlari icin
  // key'i tamamen atlamamiz gerekiyor (LayerManager de "verilmemisse
  // otomatik hesapla" mantigini presence/absence uzerinden kuruyor).
  // Harita/Lejant'a GERCEKTEN uygulanan min/max degerinin, UI'daki herhangi
  // bir kenar durumundan (odak/render zamanlamasi, custom element tuhafliklari
  // vb.) bagimsiz olarak HER ZAMAN veri sutunundaki gercek araligin icinde
  // kalmasini garanti eden TEK yetkili nokta -- _checkGradientBound() sadece
  // UI'da YAZILAN degeri denetler, style-editor/fillStyleSpec.ts'teki
  // computeMinMax() (buildFillStyle() araciligiyla) ise FIILEN UYGULANAN
  // degeri.
  //
  // Hesap artik style-editor/fillStyleSpec.ts'teki buildFillStyle()'da -- bu
  // sarmalayici SADECE guncel form durumunu toplayip cagiriyor, davranis
  // DEGISMEDI (bkz o dosyadaki FillStyleFormState/buildFillStyle WHY yorumu).
  private _buildFillStyle(): FillStyle {
    const range =
      this.layerManager && this.layerId && this._dataColumn
        ? this.layerManager.getColumnRange(this.layerId, this._dataColumn)
        : null;
    return buildFillStyle({
      colorMode: this._colorMode,
      fillOpacityPercent: this._fillOpacity,
      fillColor: this._fillColor,
      dataColumn: this._dataColumn,
      paletteColors: this._activePaletteColors(),
      paletteKind: paletteKindOf(this._gradientPalette),
      gradientMin: this._gradientMin,
      gradientMax: this._gradientMax,
      columnRange: range,
      binCount: Number(this._binCount) || Number(DEFAULT_BIN_COUNT),
      categoryColors: this._categoryColors,
    });
  }

  // Opaklik slider'i ile ayni RAF-throttle deseni: surukleme/hizli ardisik
  // degisikliklerde frame basina en fazla bir kez LayerManager.applyLayerStyle()
  // cagirir (her tus vurusunda/renk secici hareketinde Cesium'un tum entity'leri
  // yeniden boyamasi pahali).
  // outlineWidthOverride: Genislik alanina YAZARKEN (bkz asagidaki @input)
  // canli onizleme icin -- _outlineWidth (bir @state) o sirada BILEREK
  // GUNCELLENMEZ (Carbon'un type="text" "set value()" metodu her deger
  // atamasinda yeniden formatlayip kullanicinin yazdigini bozuyordu, bkz
  // Genislik alanindaki @input yorumu), bu yuzden HAM DOM metni buraya
  // dogrudan gecirilip _outlineWidth'i ETKILEMEDEN uygulanir. Verilmezse
  // (varsayilan) mevcut _outlineWidth state'i kullanilir.
  //
  // ONEMLI (bkz kullanici bildirimi: "oklar ile hizli hizli artirip
  // azaltirken geriden geliyor"): cagrilar bir animasyon karesinden DAHA
  // SIK gelirse (Genislik +/- oklarina hizli ardisik tiklama/klavye tekrari)
  // ONCEKI surum HER cagrida PENDING RAF'i iptal edip YENIDEN planliyordu --
  // bu, sureklilik gosteren bir seri cagri sirasinda planlanan callback'in
  // calisma sirasinin surekli ILERIYE itilip HICBIR ZAMAN gelmemesine (yani
  // kullanici DURANA kadar haritada hicbir guncelleme gorunmemesine) yol
  // aciyordu. Duzeltme: bir RAF ZATEN planliysa yeniden planlamiyoruz --
  // sadece "o an uygulanacak en guncel deger"i (_pendingOutlineWidthOverride)
  // guncelliyoruz; bu, sureklilik gosteren bir seri boyunca bile EN AZ
  // frame basina bir guncelleme GARANTI eder.
  private _scheduleApplyStyle(outlineWidthOverride?: string): void {
    if (!this.layerManager || !this.layerId || this._isServiceLayer) return;
    if (outlineWidthOverride !== undefined) {
      this._pendingOutlineWidthOverride = outlineWidthOverride;
    }
    if (this._applyStyleRaf !== null) return;
    this._applyStyleRaf = this._timers.requestAnimationFrame(() => {
      this._applyStyleRaf = null;
      const widthOverride = this._pendingOutlineWidthOverride;
      this._pendingOutlineWidthOverride = undefined;
      const spec: LayerStyleSpec = {
        fill: this._buildFillStyle(),
        outline: {
          enabled: this._outlineEnabled,
          color: this._outlineColor,
          width:
            Number(widthOverride ?? this._outlineWidth) ||
            Number(DEFAULT_OUTLINE_WIDTH),
        },
      };
      // Genislik alani artik COK BUYUK katmanlarda (bkz
      // _outlineWidthDisabledByScale) baştan devre disi birakildigi icin
      // applyLayerStyle()'in gec cozulmesi (bkz LayerManager.waitForRenderSettle()
      // yorumu) burada artik ONEMLI bir gecikmeye yol acmiyor -- "Uygulanıyor…"
      // gostergesi (bkz kullanici bildirimi: "Dış Hat'daki Uygulanıyor Loading'e
      // gerek kalmadı bu durumda") KALDIRILDI.
      void this.layerManager!.applyLayerStyle(this.layerId, spec);
    });
  }

  // Kategorik (Enum) modunda "Degerler" (kategori->renk lejanti) ARTIK
  // Dolgu kartinin ICINDE degil, kendi bagimsiz karti olarak Dis Hat'in
  // SAGINDA render edilir -- listenin boyu (5'e kadar item, sonrasi
  // scroll -- bkz. .category-values-list) Dolgu kartini Dis Hat'tan cok
  // daha uzun yapip iki karti dengesiz gosteriyordu (kullanici bildirimi).
  // Sadece bu modda ve en az 1 deger kesfedildiyse gorunur -- diger HICBIR
  // modda (solid/gradient/bin/off) boyle bir liste zaten yok.
  private _renderCategoryList() {
    if (!(this._colorMode === "enum" && this._categoryValues.length > 0)) return "";
    return html`
      <div class="card">
        <span class="card-title">Değerler</span>
        <div class="category-values-wrap">
          <div
            class="category-values-list"
            @scroll=${() => this._categoryScroll.sync()}
          >
            <div style="display:flex; flex-direction:column; gap:0.5rem;">
              ${this._categoryValues.map(
                (value) => html`
                  <div class="legend-bin-row">
                    <span class="legend-swatch" style="background:${
                      this._categoryColors[String(value)] ?? DEFAULT_FILL_COLOR
                    }"></span>
                    <span class="legend-value" title=${String(value)}>${String(value)}</span>
                  </div>
                `,
              )}
            </div>
          </div>
          <div
            class="category-scroll-thumb"
            @pointerdown=${(event: PointerEvent) => this._categoryScroll.startDrag(event)}
          ></div>
        </div>
      </div>
    `;
  }

  // Surekli (Gradient) ve Kesikli (Bin) icin de -- Kategorik (Enum) ile AYNI
  // "3. kart" yerinde (Dis Hat'in saginda) -- min/max ile renk arasindaki
  // eslesmeyi gosteren bir Lejant karti (bkz kullanici bildirimi:
  // "Gradient/Bin'de Lejant cikmiyor, gozukmesi lazim"). Enum'daki
  // "Degerler" kartinin aksine bu SADECE goruntuleme amacli (gradient/bin
  // renkleri palet+min/max alanlarindan turetiliyor, tek tek duzenlenmiyor).
  // Min/max henuz cozulmediyse (orn. veri sutunu henuz secilmediyse)
  // gosterilecek bir sey yok.
  private _renderLegendCard() {
    // Min/Max "Otomatik" (bos) birakildiginda burada state'ten okunacak
    // sayisal bir deger YOK -- bu, "aralik bilinmiyor" ile karistirilip
    // Lejant karti TAMAMEN kaldirilirdi (bkz kullanici bildirimi:
    // "Otomatik moda geçince Stil Editördeki Lejant panelini
    // kaldırıyorsun. Kaldırma görelim."). Bos alan icin _onDataColumnChange
    // ile ayni kaynaktan (LayerManager.getColumnRange) GERCEK veri
    // araligina duser -- boylece Otomatik modda da Lejant, o an
    // haritaya FIILEN uygulanan otomatik araligi dogru gosterir.
    const range =
      this.layerManager && this.layerId && this._dataColumn
        ? this.layerManager.getColumnRange(this.layerId, this._dataColumn)
        : null;
    const typedMin = this._gradientMin !== "" ? Number(this._gradientMin) : undefined;
    const typedMax = this._gradientMax !== "" ? Number(this._gradientMax) : undefined;
    const min =
      typedMin !== undefined && Number.isFinite(typedMin) ? typedMin : range?.min;
    const max =
      typedMax !== undefined && Number.isFinite(typedMax) ? typedMax : range?.max;
    if (min === undefined || max === undefined) {
      return "";
    }

    if (this._colorMode === "gradient") {
      // Duz bir bar + sadece iki uc (min/max) etiketi, barin ORTASININ
      // hangi degere karsilik geldigini hic gostermiyordu -- referans
      // uygulamadaki (bkz kullanici bildirimi, ekran goruntusu
      // karsilastirmasi) gibi, gradyani GRADIENT_LEGEND_STEPS adet esit
      // araliklı, TEK degerli (Bin'in araligin aksine) ornekle -- HER
      // ornegin rengi haritada GERCEKTEN uygulanan renkle (paletteKind
      // dahil, bkz style-editor/fillStyleSpec.ts sampleFromPaletteCss) birebir eslesir. Yuksekten
      // dusuge (referanstaki gibi) siralanir.
      const colors = this._activePaletteColors();
      const kind = paletteKindOf(this._gradientPalette);
      return html`
        <div class="card">
          <span class="card-title">Lejant</span>
          <div class="legend-bin-wrap">
            <div
              class="legend-bin-list"
              @scroll=${() => this._legendScroll.sync()}
            >
              ${gradientLegendRows(min, max, (t) => sampleFromPaletteCss(colors, t, kind)).map(
                (row) => html`
                  <div class="legend-bin-row">
                    <span class="legend-swatch" style="background:${row.color}"></span>
                    <span class="legend-value">${row.label}</span>
                  </div>
                `,
              )}
            </div>
            <div
              class="legend-scroll-thumb"
              @pointerdown=${(event: PointerEvent) => this._legendScroll.startDrag(event)}
            ></div>
          </div>
        </div>
      `;
    }

    if (this._colorMode === "bin") {
      const binCount = Number(this._binCount) || Number(DEFAULT_BIN_COUNT);
      const colors = this._activePaletteColors();
      const kind = paletteKindOf(this._gradientPalette);
      return html`
        <div class="card">
          <span class="card-title">Lejant</span>
          <div class="legend-bin-wrap">
            <div
              class="legend-bin-list"
              @scroll=${() => this._legendScroll.sync()}
            >
              ${binLegendRows(min, max, binCount, (t) => sampleFromPaletteCss(colors, t, kind)).map(
                (row) => html`
                  <div class="legend-bin-row">
                    <span class="legend-swatch" style="background:${row.color}"></span>
                    <span class="legend-value">${row.label}</span>
                  </div>
                `,
              )}
            </div>
            <div
              class="legend-scroll-thumb"
              @pointerdown=${(event: PointerEvent) => this._legendScroll.startDrag(event)}
            ></div>
          </div>
        </div>
      `;
    }

    return "";
  }

  /** Bileşenin şablonunu render eder (`open` false ise boş şablon). */
  override render() {
    if (!this.open) return html``;
    return html`
      <div class="panel">
        <div class="header" @pointerdown=${(event: PointerEvent) => this._drag.start(event)}>
          <div class="header-title-group">
            <span class="header-icon">${ICON_PALETTE_20}</span>
            <div class="header-text">
              <span class="title">Stil Düzenle</span>
              <span class="subtitle" title=${this.layerTitle}>${this.layerTitle}</span>
            </div>
          </div>
          <button type="button" class="close-btn" aria-label="Kapat" @click=${() => this._close()}>
            ${ICON_CLOSE}
          </button>
        </div>

        <div class="body">
          <div class="section-header">
            <span class="section-header-title">Katman Stili</span>
            <button type="button" class="reset-btn" @click=${() => this._reset()}>
              ${ICON_RENEW} Sıfırla
            </button>
          </div>

          <div class="style-cards">
            ${this._isServiceLayer
              ? html`
                  <tucbs-service-style-card
                    .layerManager=${this.layerManager}
                    layerId=${this.layerId}
                    layerType=${this.layerType}
                    .requestId=${this._serviceStyleRequestId}
                  ></tucbs-service-style-card>
                `
              : html`${renderFillCard(this._fillCardHost)}${this._renderOutlineCard()}${this._renderCategoryList()}${this._renderLegendCard()}`}
          </div>
        </div>
      </div>
    `;
  }

  // Disaridaki gradient/bin ortak blogunun icine gomulu bir ternary/&&
  // ifadesi yerine burada ayri bir degisken olarak hesaplaniyor; boylece
  // hem "nested ternary" lint uyarisindan hem de "false && html\`...\`"
  // ifadesinin colorMode "bin" olmadiginda literal "false" metni olarak
  // render edilmesinden (Lit, plain "false" degerini "nothing" gibi
  // saymiyor) kacinilmis oluyor.
  // fillCard.ts template'leri (Faz 3.1b) private state'e bu adaptor
  // uzerinden CANLI erisir: getter/setter dogrudan @state alanlarini okuyup
  // yazdigi icin yeniden render davranisi degismez. Sinif TucbsStyleEditor
  // govdesinin ICINDE tanimli oldugu icin private uyelere erisebilir.
  private readonly _fillCardHost: FillCardHost = new (class implements FillCardHost {
    constructor(private readonly editor: TucbsStyleEditor) {}
    get colorMode(): string {
      return this.editor._colorMode;
    }
    set colorMode(value: string) {
      this.editor._colorMode = value;
    }
    get dataColumn(): string {
      return this.editor._dataColumn;
    }
    set dataColumn(value: string) {
      this.editor._dataColumn = value;
    }
    get gradientPalette(): string {
      return this.editor._gradientPalette;
    }
    set gradientPalette(value: string) {
      this.editor._gradientPalette = value;
    }
    get gradientMin(): string {
      return this.editor._gradientMin;
    }
    set gradientMin(value: string) {
      this.editor._gradientMin = value;
    }
    get gradientMax(): string {
      return this.editor._gradientMax;
    }
    set gradientMax(value: string) {
      this.editor._gradientMax = value;
    }
    get gradientMinError(): string {
      return this.editor._gradientMinError;
    }
    set gradientMinError(value: string) {
      this.editor._gradientMinError = value;
    }
    get gradientMaxError(): string {
      return this.editor._gradientMaxError;
    }
    set gradientMaxError(value: string) {
      this.editor._gradientMaxError = value;
    }
    get binCount(): string {
      return this.editor._binCount;
    }
    set binCount(value: string) {
      this.editor._binCount = value;
    }
    get categorySort(): string {
      return this.editor._categorySort;
    }
    set categorySort(value: string) {
      this.editor._categorySort = value;
    }
    get paletteReversed(): boolean {
      return this.editor._paletteReversed;
    }
    set paletteReversed(value: boolean) {
      this.editor._paletteReversed = value;
    }
    get categoryValues(): (string | number)[] {
      return this.editor._categoryValues;
    }
    set categoryValues(value: (string | number)[]) {
      this.editor._categoryValues = value;
    }
    get categoryColors(): Record<string, string> {
      return this.editor._categoryColors;
    }
    set categoryColors(value: Record<string, string>) {
      this.editor._categoryColors = value;
    }
    get fillColor(): string {
      return this.editor._fillColor;
    }
    set fillColor(value: string) {
      this.editor._fillColor = value;
    }
    get fillOpacity(): number {
      return this.editor._fillOpacity;
    }
    get dataColumns(): readonly string[] {
      return this.editor._dataColumns;
    }
    get numericDataColumns(): readonly string[] {
      return this.editor._numericDataColumns;
    }
    get isFixedSolidLayer(): boolean {
      return this.editor._isFixedSolidLayer;
    }
    allowNegativeMin(): boolean {
      return this.editor._allowNegativeMin();
    }
    allowNegativeMax(): boolean {
      return this.editor._allowNegativeMax();
    }
    checkGradientBound(edited: "min" | "max", value: string): GradientBoundCheck {
      return this.editor._checkGradientBound(edited, value);
    }
    scheduleApplyStyle(): void {
      this.editor._scheduleApplyStyle();
    }
    sortCategoryValues(values: (string | number)[]): (string | number)[] {
      return this.editor._sortCategoryValues(values);
    }
    autoFillCategoryColors(values: (string | number)[], existing: Record<string, string>): Record<string, string> {
      return this.editor._autoFillCategoryColors(values, existing);
    }
    updateOpacitySlider(input: HTMLInputElement, value: number): void {
      this.editor._updateOpacitySlider(input, value);
    }
    setFillOpacity(value: number): void {
      this.editor._setFillOpacity(value);
    }
    onDataColumnChange(column: string): void {
      this.editor._onDataColumnChange(column);
    }
  })(this);

  private _renderOutlineCard() {
    return html`
            <div class="card">
              <span class="card-title">Dış Hat</span>

              <div>
                <span class="field-label">Renk Paleti</span>
                <span class="color-swatch" style="background:${this._outlineColor}">
                  <input
                    type="color"
                    .value=${this._outlineColor}
                    aria-label="Dış hat rengi"
                    ?disabled=${!this._outlineEnabled}
                    @input=${(event: Event) => {
                      this._outlineColor = (event.target as HTMLInputElement).value;
                      this._scheduleApplyStyle();
                    }}
                  />
                </span>
              </div>

              <div>
                <span class="field-label">Genişlik</span>
                <cds-number-input
                  size="sm"
                  type="text"
                  locale="en"
                  label="Genişlik"
                  hide-label
                  min="0.5"
                  max="50"
                  step="0.5"
                  .value=${this._outlineWidth}
                  ?disabled=${!this._outlineEnabled || this._outlineWidthDisabledByScale}
                  @input=${(event: Event) => {
                    // type="number" native input'ta "3." gibi tamamlanmamis bir
                    // ondalik yazildiginda tarayici deger/gorunumu anlik olarak
                    // bosaltip gecersiz-durum ikonu gosteriyordu (Chromium'un
                    // kendi sayi input sanitizasyonu); bu yuzden Carbon'un
                    // type="text" (locale tabanli) modu kullanilir. ONEMLI:
                    // burada _outlineWidth (bir @state) GUNCELLENMEZ — Carbon'un
                    // type="text" icin ozel "set value()" metodu, atanan HER
                    // deger'i sayi parser'indan gecirip yeniden formatliyor
                    // (orn. "12."->12->"12"); eger her tus vurusunda _outlineWidth'i
                    // guncelleyip render'i tetiklersek, bu re-render ".value=" ile
                    // ayni degeri tekrar atar ve Carbon onu aninda formatlayip
                    // kullanicinin daha yazmakta oldugu noktayi siler. Bu yuzden
                    // yazarken SADECE DOM'daki ham metni (rakam + tek nokta)
                    // sikistiriyoruz; Lit state'i (ve bu binding'in tekrar
                    // tetiklenmesini) hic karistirmiyoruz. Canli onizleme icin
                    // (bkz kullanici bildirimi: "field icine yazinca da bos
                    // bir yere tiklamadan degismiyor") _scheduleApplyStyle'a
                    // bu ham metni DOGRUDAN (state'i hic guncellemeden)
                    // gecirip haritayi HER tus vurusunda RAF-throttled olarak
                    // guncelliyoruz -- nihai/kesin deger yine SADECE
                    // @focusout'ta _outlineWidth'e yazilir.
                    const target = event.target as HTMLInputElement;
                    let cleaned = target.value.replace(/[^\d.]/g, "");
                    const firstDot = cleaned.indexOf(".");
                    if (firstDot !== -1) {
                      cleaned = cleaned.slice(0, firstDot + 1) + cleaned.slice(firstDot + 1).replaceAll(".", "");
                    }
                    if (target.value !== cleaned) target.value = cleaned;
                    this._scheduleApplyStyle(cleaned);
                  }}
                  @cds-number-input=${(event: CustomEvent<{ value: string | number; direction?: string }>) => {
                    // Increment/decrement butonlari native "input" event'i
                    // tetiklemiyor, sadece "direction" alani dolu olan bu custom
                    // event'i tetikliyor; yazarken bu event direction'siz da
                    // tetiklenebildigi icin sadece direction varsa state'i
                    // guncelliyoruz (yukaridaki geri besleme dongusunden kacinmak
                    // icin yazma sirasinda state'e dokunulmuyor).
                    if (!event.detail.direction) return;
                    const parsed = Number(event.detail.value);
                    if (!Number.isNaN(parsed)) this._outlineWidth = String(parsed);
                    this._scheduleApplyStyle();
                  }}
                  @focusout=${(event: Event) => {
                    // Odaktan cikildiginda pozitif float sinirlari (0.1-50)
                    // kesin olarak uygulanir. Native input'un o anki HAM
                    // metninden okunur (yazarken _outlineWidth guncellenmedigi
                    // icin bayatlamis/eski bir deger olabilir).
                    const target = event.target as HTMLInputElement;
                    const parsed = Number(target.value);
                    const clamped = String(
                      Number.isFinite(parsed) && parsed > 0
                        ? Math.min(50, Math.max(0.5, parsed))
                        : Number(DEFAULT_OUTLINE_WIDTH),
                    );
                    this._outlineWidth = clamped;
                    target.value = clamped;
                    this._scheduleApplyStyle();
                  }}
                ></cds-number-input>
                ${this._outlineWidthDisabledByScale
                  ? html`<span class="field-hint"
                      >Bu katmanda ${this._featureCount?.toLocaleString("tr-TR")} detay var.<br />
                      Performans nedeniyle devre dışı.</span
                    >`
                  : ""}
              </div>

              <div>
                <cds-checkbox
                  .checked=${this._outlineEnabled}
                  label-text="Etkin"
                  @cds-checkbox-changed=${(event: CustomEvent<{ checked?: boolean }>) => {
                    this._outlineEnabled = event.detail?.checked ?? !this._outlineEnabled;
                    this._scheduleApplyStyle();
                  }}
                ></cds-checkbox>
              </div>
            </div>
    `;
  }
}
