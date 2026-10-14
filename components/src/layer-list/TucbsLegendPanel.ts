import { LitElement, html, css, type PropertyValues } from "lit";
import { customElement, property, state, query } from "lit/decorators.js";
import { TucbsError } from "@tucbs/core";
import type { LayerManager, LayerType, LayerStyleSpec } from "@tucbs/core";
import { applyCustomCss, type CustomCssState } from "../shared/util/CustomCss.js";
import { sampleFromPaletteCss } from "../shared/util/gradientSampling.js";
import { binLegendRows, gradientLegendRows } from "../shared/util/legendRows.js";
import { compareCategoryKeys } from "../shared/util/categorySort.js";
import { VirtualScrollbar } from "../shared/ui/VirtualScrollbar.js";
import { TimerBag } from "../shared/util/TimerBag.js";

const SERVICE_LAYER_TYPES: readonly LayerType[] = ["WMS", "WMTS"];

/**
 * WMS/WMTS icin gercek GetLegendGraphic (WMS) / capabilities <LegendURL>
 * (WMTS) gorseli, vektor (WFS/LOCAL) katmanlar icin ise LayerManager'a en son
 * uygulanan stile (bkz. TucbsStyleEditor -> applyLayerStyle) gore gradient
 * bari / bin araliklari / kategori listesi gosterir (bkz.
 * project_ucbp_api_styleeditor_arastirma memory). `mapElementId` YOK --
 * `layerManager`/`layerId`/`layerType`/`open` property'leri dogrudan
 * atanmalidir; gercek kullanimi genelde `TucbsLayerList`'in katman "⋮"
 * menusundeki "Lejant" secenegi uzerinden dolaylidir.
 *
 * @example
 * ```ts
 * const legendPanel = document.querySelector("tucbs-legend-panel");
 * legendPanel.layerManager = map.layerManager;
 * legendPanel.layerId = "katman-id";
 * legendPanel.layerType = "WMS";
 * legendPanel.open = true;
 * ```
 */
@customElement("tucbs-legend-panel")
export class TucbsLegendPanel extends LitElement {
  static override readonly styles = css`
    :host {
      display: block;
      font-family: "IBM Plex Sans", system-ui, sans-serif;
      font-size: 0.75rem;
      color: var(--cds-text-primary, #161616);
    }

    .legend {
      display: flex;
      flex-direction: column;
      gap: 0.375rem;
      padding: 0.5rem 1rem 0.5rem 24px;
      background: var(--cds-layer-01, #ffffff);
      border-top: 1px solid var(--cds-border-subtle, #e0e0e0);
    }

    .legend-title {
      margin-bottom: 0.125rem;
      color: var(--cds-text-secondary, #525252);
      font-weight: 600;
    }

    .legend-empty {
      color: var(--cds-text-secondary, #525252);
    }

    .legend-image {
      max-width: 220px;
      display: block;
    }

    /* Surekli (Gradient)/Kesikli (Bin)/Kategorik (Enum) satir listesi --
       TucbsStyleEditor.ts'deki .legend-bin-wrap/.legend-bin-list/
       .legend-scroll-thumb ile AYNI ozel scroll-thumb deseni (native
       scrollbar tamamen gizli, gorunen gostergeyi JS ile kendimiz
       ciziyoruz -- bkz _listScroll/_fitListToRows). Kategorik'te
       kategori sayisi veriden gelir (onlarca/yuzlerce olabilir, orn. 195
       ulke) ve VISIBLE_LIST_ROWS'u kolayca asar; Gradient (sabit
       GRADIENT_LEGEND_STEPS=7) ve Bin (en fazla 9, bkz TucbsStyleEditor'un
       Bin Sayisi tavani) bu esige HICBIR ZAMAN ulasmaz ama AYNI yapiyi
       (kod tekrarindan kacinmak icin) paylasir. */
    .legend-bin-wrap {
      position: relative;
      width: 220px;
    }

    .legend-bin-list {
      display: flex;
      flex-direction: column;
      gap: 0.375rem;
      overflow-y: auto;
      scrollbar-width: none;
      padding-right: 0.75rem;
    }

    .legend-bin-list::-webkit-scrollbar {
      display: none;
    }

    .legend-scroll-thumb {
      position: absolute;
      top: 0;
      right: 2px;
      width: 6px;
      border-radius: 3px;
      background: var(--cds-border-strong, #8d8d8d);
      cursor: grab;
      touch-action: none;
      display: none;
    }

    .legend-scroll-thumb:active {
      cursor: grabbing;
      background: var(--cds-icon-primary, #161616);
    }

    .legend-bin-row {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .legend-swatch {
      flex: none;
      width: 12px;
      height: 12px;
      border-radius: 2px;
    }

    .legend-value {
      color: var(--cds-text-primary, #161616);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  `;

  /** Lejantı gösterilecek katmanın id'si. */
  @property() layerId = "";

  /** Katmanın tipi -- servis (WMS/WMTS) katmanı mı yoksa vektör (WFS/LOCAL) katmanı mı olduğunu belirler. */
  @property() layerType: LayerType | "" = "";

  /** Core JS API `LayerManager` referansı. */
  @property({ attribute: false }) layerManager: LayerManager | undefined;

  /** Lejant panelinin açık/kapalı durumu (attribute olarak yansıtılır); `false` iken hiçbir içerik render edilmez. */

  // TucbsFileUpload/TucbsServiceUpload/TucbsStyleEditor ile AYNI desen --
  // varsayilan kapali. Onceden bu property hic yoktu ve render() kosulsuz
  // dolu icerik dondurdugundan, sayfadaki cIPLAK "marker" <tucbs-legend-panel>
  // tag'i (bkz TucbsLayerList._legendMarker kesif deseni) DOM'a eklenir
  // eklenmez, hicbir katman/aksiyon secilmeden, normal akista (sayfanin en
  // altinda) otomatik goruntuleniyordu (bkz kullanici geri bildirimi: "Lejant
  // niye en altta kafadan cikiyor"). Gercek gosterim artik SADECE
  // TucbsLayerList'in katman "⋮" menusunden "Lejant" secilince acilan KENDI
  // gomulu kopyasi uzerinden, o kopyaya acikca `.open=true` verilerek olur
  // (bkz TucbsLayerList.ts render() -- .customCss ile ayni yerde).
  @property({ type: Boolean, reflect: true }) open = false;

  /** Shadow DOM'a enjekte edilecek özel CSS metni (`custom-css` attribute'u). */

  // Tuketicinin, bilesen kaynagina dokunmadan shadow DOM'a enjekte edebilecegi
  // keyfi CSS metni. Bkz. ./internal/CustomCss.ts.
  @property({ attribute: "custom-css" }) customCss = "";

  @state() private _legendUrl = "";
  @state() private _loading = false;
  @state() private _error = "";
  @state() private _vectorStyle: LayerStyleSpec | undefined;
  // customCss icin adopte edilmis stil sayfasinin durumu.
  private readonly _customCssState: CustomCssState = { sheet: null };

  // Gradient/Bin/Enum -- hicbiri ayni anda ACIK olmadigindan (bkz
  // style.fill.mode) TEK bir sorgu ucunu de kapsar. Bkz. .legend-bin-wrap
  // CSS yorumu.
  @query(".legend-bin-list") private _listEl?: HTMLDivElement;
  @query(".legend-scroll-thumb") private _thumbEl?: HTMLDivElement;

  // Hesap shared/ui/VirtualScrollbar.ts'te (TucbsStyleEditor/ServiceUpload/
  // IdentifyPanel ile ORTAK): native scrollbar tamamen gizli,
  // .legend-scroll-thumb'in top/height'ini scrollTop/scrollHeight/
  // clientHeight'tan biz hesaplayip yaziyoruz.
  // Gercek hatalar plani H5.2: eskiden SINIF degil saf
  // startVirtualScrollbarDrag fonksiyonu kullaniliyor ve donen stop()
  // yoksayiliyordu -- surukleme surerken panel DOM'dan kaldirilirsa thumb
  // dinleyicileri kaliyordu. Sinif (ReactiveController) hostDisconnected'da
  // suren suruklemeyi durdurur.
  private readonly _listScroll = new VirtualScrollbar(
    this,
    () => this._listEl,
    () => this._thumbEl,
  );
  /** Tüm setTimeout/rAF çağrılarını izler; bileşen DOM'dan kalkınca bekleyenleri iptal eder (bkz shared/util/TimerBag.ts). */
  private readonly _timers = new TimerBag(this);

  // TucbsStyleEditor.ts'deki VISIBLE_LIST_ROWS ile AYNI deger -- iki
  // bilesendeki Lejant gorunumunun (StyleEditor'un canli onizlemesi vs.
  // buradaki katman-listesi paneli) TUTARLI kalmasi icin.
  // GRADIENT_LEGEND_STEPS Faz 3.4b'de shared/util/legendRows.ts'e tasindi.
  private static readonly VISIBLE_LIST_ROWS = 10;

  private get _isServiceLayer(): boolean {
    return SERVICE_LAYER_TYPES.includes(this.layerType as LayerType);
  }

  private readonly _onLayerStyle = (event: { id: string; style: LayerStyleSpec }): void => {
    if (event.id === this.layerId) this._vectorStyle = event.style;
  };

  /**
   * Lit yaşam döngüsü: `layerManager` değiştiğinde `layer:style` olay
   * aboneliğini yeniler, `layerId`/`layerType`/`layerManager` değiştiğinde
   * lejantı yeniden yükler, `customCss` değiştiğinde shadow DOM'a stili
   * uygular; her render sonrası liste yüksekliğini ve scroll göstergesini
   * yeniden hesaplar.
   *
   * @param changed - Değişen property'lerin önceki değerlerini içeren harita (Lit tarafından sağlanır).
   */
  override updated(changed: PropertyValues<this>): void {
    if (changed.has("layerManager")) {
      const previous = changed.get("layerManager") as LayerManager | undefined;
      previous?.off("layer:style", this._onLayerStyle);
      this.layerManager?.on("layer:style", this._onLayerStyle);
    }
    if (changed.has("layerId") || changed.has("layerType") || changed.has("layerManager")) {
      this._vectorStyle = this.layerManager?.getLayerStyle(this.layerId);
      void this._loadLegend();
    }
    if (changed.has("customCss")) {
      applyCustomCss(this.shadowRoot, this.customCss, this._customCssState, "tucbs-legend-panel");
    }
    // TucbsStyleEditor.ts'deki ayni cagriyla AYNI gerekce: liste icerigi
    // (kategori sayisi/renk modu/bin sayisi degisince) her render sonrasi
    // degisebilir; max-height ONCE GERCEK satir yuksekligine gore YENIDEN
    // olculup uygulanir (bkz _fitListToRows), thumb senkronu bunun HEMEN
    // ardindan yapilir.
    // Kare _timers (TimerBag) ile planlanir: bilesen DOM'dan kalkinca iptal
    // edilir. ESKIDEN ciplak requestAnimationFrame'di ve bilesen kalksa bile
    // kopmus DOM uzerinde olcum yapiyordu.
    this._timers.requestAnimationFrame(() => {
      TucbsLegendPanel._fitListToRows(this._listEl);
      this._listScroll.sync();
    });
  }

  /** Bileşen DOM'dan kaldırılırken `layerManager` üzerindeki `layer:style` olay aboneliğini temizler. */
  override disconnectedCallback(): void {
    this.layerManager?.off("layer:style", this._onLayerStyle);
    super.disconnectedCallback();
  }

  private async _loadLegend(): Promise<void> {
    this._legendUrl = "";
    this._error = "";
    if (!this.layerManager || !this.layerId || !this._isServiceLayer) return;

    this._loading = true;
    try {
      if (this.layerType === "WMS") {
        // STYLES parametresi verilmeden istenir: sunucu (GeoServer/MapServer)
        // bu durumda katmanin O ANKI/varsayilan stilinin lejantini doner --
        // TucbsStyleEditor'de secilen stil ne olursa olsun ekstra bir "aktif
        // stil" takibi gerekmeden dogru lejant gosterilir.
        this._legendUrl = this.layerManager.getWmsLegendGraphicUrl(this.layerId);
      } else {
        const styles = await this.layerManager.getWmtsAvailableStyles(this.layerId);
        this._legendUrl = styles[0]?.legendUrl ?? "";
      }
    } catch (error) {
      if (error instanceof TucbsError) {
        console.error(`[tucbs-legend-panel] ${error.code} (${error.number}): ${error.message}`);
      }
      this._error = error instanceof Error ? error.message : "Lejant yüklenemedi.";
    } finally {
      this._loading = false;
    }
  }

  /** Panel kapalıysa boş, açıksa servis (WMS/WMTS) veya vektör katman lejantını render eder. */
  override render() {
    if (!this.open) return html``;

    return html`
      <div class="legend">
        <span class="legend-title">Lejant</span>
        ${this._isServiceLayer ? this._renderServiceLegend() : this._renderVectorLegend()}
      </div>
    `;
  }

  private _renderServiceLegend() {
    if (this._loading) return html`<span class="legend-empty">Yükleniyor…</span>`;
    if (this._error) return html`<span class="legend-empty" style="color:#da1e28;">${this._error}</span>`;
    if (!this._legendUrl) return html`<span class="legend-empty">Lejant bulunamadı.</span>`;
    return html`<img class="legend-image" src=${this._legendUrl} alt="Lejant" />`;
  }

  // Min/Max "Otomatik" (bos) birakildiginda TucbsStyleEditor'un gonderdigi
  // FillStyle'da min/max key'i HIC yer almaz (bkz TucbsStyleEditor._minMax())
  // -- bu, "araligi HESAPLAYAMADIK" ile "kullanici bilerek otomatik
  // hesaplanmasini istedi" arasindaki farki KAYBEDERDI: eskiden ikisi de
  // ayni "Aralık hesaplanamadı" mesajina dusuyordu (bkz kullanici bildirimi:
  // "Otomatik moda gecince Stil Editördeki Lejant panelini kaldırıyorsun").
  // Eksik ucu, TucbsStyleEditor'un otomatik degeri populate ederken
  // kullandigi AYNI kaynaktan (LayerManager.getColumnRange) tamamlariz.
  private _resolveGradientRange(
    column: string,
    min: number | undefined,
    max: number | undefined,
  ): { min: number; max: number } | undefined {
    if (min !== undefined && max !== undefined) return { min, max };
    const range = this.layerManager?.getColumnRange(this.layerId, column);
    if (!range) return undefined;
    return { min: min ?? range.min, max: max ?? range.max };
  }

  private _renderVectorLegend() {
    const style = this._vectorStyle;
    if (!style) return html`<span class="legend-empty">Henüz stil uygulanmadı.</span>`;

    switch (style.fill.mode) {
      // TucbsStyleEditor.ts'deki gradientBinLegendCard ile AYNI mantik --
      // duz bir bar + iki uc (min/max) etiketi barin ORTASININ hangi degere
      // karsilik geldigini hic gostermiyordu (bkz kullanici bildirimi:
      // "Sürekli (Gradient) burada hatali gosteriliyor, StyleEditor'deki
      // gibi olsun"); GRADIENT_LEGEND_STEPS adet esit araliklı, TEK degerli
      // ornek satirla degistirildi -- HER ornegin rengi haritada GERCEKTEN
      // uygulanan renkle (paletteKind dahil, bkz shared/util/gradientSampling.ts
      // sampleFromPaletteCss)
      // birebir eslesir. Yuksekten dusuge siralanir.
      case "gradient": {
        const { palette, paletteKind, column } = style.fill;
        const resolved = this._resolveGradientRange(column, style.fill.min, style.fill.max);
        if (!resolved) {
          return html`<span class="legend-empty">Aralık hesaplanamadı.</span>`;
        }
        const { min, max } = resolved;
        return this._renderScrollableRows(
          gradientLegendRows(min, max, (t) => sampleFromPaletteCss(palette, t, paletteKind)),
        );
      }
      case "bin": {
        const { palette, binCount, paletteKind, column } = style.fill;
        const resolved = this._resolveGradientRange(column, style.fill.min, style.fill.max);
        if (!resolved) {
          return html`<span class="legend-empty">Aralık hesaplanamadı.</span>`;
        }
        const { min, max } = resolved;
        return this._renderScrollableRows(
          binLegendRows(min, max, binCount, (t) => sampleFromPaletteCss(palette, t, paletteKind)),
        );
      }
      case "enum": {
        const entries = Object.entries(style.fill.colors);
        if (entries.length === 0) return html`<span class="legend-empty">Kategori bulunamadı.</span>`;
        // TucbsStyleEditor.ts'deki "Degerler" listesiyle (varsayilan "Artan"
        // sirasi) BIREBIR AYNI sirada gosterilir -- Object.entries()'in
        // KENDI key enumeration sirasina GUVENILEMEZ: JS, "integer-like"
        // anahtarlari (orn. "9","12","16") HER ZAMAN once, kucukten
        // buyuge kendisi siralar, ONDALIKLI/DIGER anahtarlari (orn.
        // "15.04") ise bu siralamadan TAMAMEN BAGIMSIZ, sadece EKLENME
        // sirasiyla EN SONA koyar -- bu yuzden aslinda AYNI (sayisal
        // olarak siralanmis) veriye sahip iki panel, sirf Object.entries()
        // farkli bir sira uretti diye BIRBIRINDEN FARKLI GORUNUYORDU (bkz
        // kullanici bildirimi). Karsilastirma kurali: bkz
        // shared/util/categorySort.ts compareCategoryKeys.
        const sorted = [...entries].sort(([a], [b]) => compareCategoryKeys(a, b));
        return this._renderScrollableRows(
          sorted.map(([value, color]) => ({ color, label: value })),
        );
      }
      case "solid":
      case "off":
      default:
        return html`<span class="legend-empty">Bu katman sabit renkli, lejant gerekmiyor.</span>`;
    }
  }

  // gradient/bin/enum'un UCU -- kod tekrarindan kacinmak icin TucbsStyleEditor.
  // ts'deki .legend-bin-wrap/.legend-bin-list/.legend-scroll-thumb desenini
  // (bkz o dosyadaki yorumlar) TEK yerden uretir. Kategorik'te (entries)
  // deger onlarca/yuzlerce olabilir ve VISIBLE_LIST_ROWS'u asip scroll'a
  // duser (bkz kullanici bildirimi); Gradient/Bin bu esige HICBIR ZAMAN
  // ulasmaz ama AYNI yapiyi paylasir.
  private _renderScrollableRows(
    rows: readonly { color: string; label: string }[],
  ) {
    return html`
      <div class="legend-bin-wrap">
        <div class="legend-bin-list" @scroll=${() => this._listScroll.sync()}>
          ${rows.map(
            (row) => html`
              <div class="legend-bin-row">
                <span class="legend-swatch" style="background:${row.color}"></span>
                <span class="legend-value" title=${row.label}>${row.label}</span>
              </div>
            `,
          )}
        </div>
        <div
          class="legend-scroll-thumb"
          @pointerdown=${(event: PointerEvent) => this._listScroll.startDrag(event)}
        ></div>
      </div>
    `;
  }

  // TucbsStyleEditor.ts'deki _fitListToRows ile BIREBIR AYNI teknik: CSS'te
  // SABIT bir "N * tahmini-satir-yuksekligi" degeri kirilgan (font metrikleri
  // tahmin edilenden farkli olabilir, satirlar altta KIRPILIR); bunun yerine
  // ILK IKI satirin GERCEK DOM konumlari olculup aralarindaki mesafe
  // ("satir + bosluk" toplami) hesaplanir.
  private static _fitListToRows(list: HTMLDivElement | undefined): void {
    if (!list) return;
    const rows = list.querySelectorAll<HTMLElement>(".legend-bin-row");
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
    list.style.maxHeight = `${firstRect.height + rowStride * (TucbsLegendPanel.VISIBLE_LIST_ROWS - 1)}px`;
  }
}
