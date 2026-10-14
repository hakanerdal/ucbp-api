import { LitElement, html, css, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import "@carbon/web-components/es/components/dropdown/index.js";
import { TucbsError } from "@tucbs/core";
import type { LayerManager, LayerType, ServiceStyleOption } from "@tucbs/core";

// WMS/WMTS (B1): vektor Dolgu/Dis Hat kartlari yerine tek bir "Sunucu Stili"
// karti -- renk client-side hesaplanmiyor, sunucunun GetCapabilities'te
// tanimladigi hazir stiller arasindan secim yapiliyor (bkz.
// project_ucbp_api_styleeditor_arastirma memory, Alternatif E+F).
//
// God Component kilavuzu GC-02 3.5 Adim 7: bu blok TucbsStyleEditor'in
// vektor stil durumuyla (colorMode/palet/min-max/kategori renkleri) HICBIR
// state paylasmadigi icin ayri bir bilesene cikarildi. TucbsStyleEditor
// sadece asagi (layerManager/layerId/layerType) property'lerini geçirir;
// yukleme/hata/secili-stil durumu TAMAMEN bu bilesenin kendi icinde --
// layerId/layerType degistiginde (bkz willUpdate()) kendi GetCapabilities
// sorgusunu kendiliginden tetikler, TucbsStyleEditor'in openFor()/_reset()
// gibi metotlarinin bu state'i elle sifirlamasina/tetiklemesine gerek
// KALMADI (davranis ayni, sadece sorumluluk tasindi).
@customElement("tucbs-service-style-card")
export class TucbsServiceStyleCard extends LitElement {
  static override readonly styles = css`
    :host {
      display: block;
      font-family: "IBM Plex Sans", system-ui, sans-serif;
      font-size: 0.875rem;
      color: var(--cds-text-primary, #161616);
    }

    .card {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      padding: 1rem;
      border: 1px solid var(--cds-border-subtle, #e0e0e0);
      border-radius: 8px;
    }

    .card-title {
      font-weight: 600;
    }

    /* Carbon'un kendi form etiketlerinde kullandigi varsayilan bosluk
       (.cds--label { margin-block-end: .5rem }) ile tutarli olmasi icin
       8px. */
    .field-label {
      display: block;
      margin-bottom: 0.5rem;
      color: var(--cds-text-secondary, #525252);
      font-size: 0.75rem;
    }

    /* Bu proje Carbon'un tema/reset CSS'ini yuklemiyor; dropdown host
       tarayicida varsayilan "inline" kalabiliyor, bu durumda width sabiti
       etkisiz kalir. Layout'un ongorulebilir olmasi icin display'i acikca
       "block" olarak sabitliyoruz -- Dolgu/Dis Hat kartlarindaki AYNI sabit
       222px genislik (bkz style-editor/styleEditorStyles.ts). */
    cds-dropdown {
      display: block;
      width: 222px;
      box-sizing: border-box;
    }
  `;

  /** Core JS API `LayerManager` referansı. */
  @property({ attribute: false }) layerManager: LayerManager | undefined;
  /** Stili sorgulanacak katmanın kimliği. */
  @property() layerId = "";
  /** Katman türü ("WMS" veya "WMTS" olması beklenir). */
  @property() layerType: LayerType | "" = "";
  // TucbsStyleEditor.openFor() HER cagrildiginda (ayni katman icin ikinci
  // kez acilsa -- layerId DEGISMESE -- bile) artan bir sayac; boylece
  // "ayni katman icin stil editoru zaten acikken tekrar acilirsa" kenar
  // durumunda da (bkz TucbsStyleEditor.ts openFor() WHY yorumu)
  // ONCEKI (koşulsuz her openFor() cagrisinda yeniden sorgulayan) davranış
  // birebir korunur.
  @property({ attribute: false }) requestId = 0;

  @state() private _serviceStyles: ServiceStyleOption[] = [];
  @state() private _serviceStylesLoading = false;
  @state() private _serviceStylesError = "";
  @state() private _selectedServiceStyle = "";

  // willUpdate() (updated() DEGIL) -- _loadServiceStyles() senkron olarak
  // _serviceStylesLoading gibi reactive property'leri hemen yaziyor; bunu
  // updated() icinde yapmak Lit'in "scheduled an update after an update
  // completed" dev-mode uyarisina yol aciyordu (bkz. lit.dev/msg/change-in-update).
  // willUpdate() render'dan ONCE calistigi icin bu degisiklikler AYNI
  // guncelleme dongusune dahil olur, ekstra bir donguye gerek kalmaz.
  /** `layerId`/`layerType`/`layerManager` değiştiğinde sunucu stillerini yeniden sorgular. */
  protected override willUpdate(changed: PropertyValues<this>): void {
    if (
      changed.has("layerId") ||
      changed.has("layerType") ||
      changed.has("layerManager") ||
      changed.has("requestId")
    ) {
      void this._loadServiceStyles();
    }
  }

  private async _loadServiceStyles(): Promise<void> {
    if (!this.layerManager || !this.layerId) return;
    this._serviceStylesLoading = true;
    this._serviceStylesError = "";
    try {
      const styles =
        this.layerType === "WMS"
          ? await this.layerManager.getWmsAvailableStyles(this.layerId)
          : await this.layerManager.getWmtsAvailableStyles(this.layerId);
      this._serviceStyles = styles;
      this._selectedServiceStyle = styles[0]?.name ?? "";
    } catch (error) {
      if (error instanceof TucbsError) {
        console.error(`[tucbs-style-editor] ${error.code} (${error.number}): ${error.message}`);
      }
      this._serviceStylesError =
        error instanceof Error ? error.message : "Sunucu stilleri okunamadı.";
    } finally {
      this._serviceStylesLoading = false;
    }
  }

  private async _selectServiceStyle(styleName: string): Promise<void> {
    if (!this.layerManager || !this.layerId) return;
    this._selectedServiceStyle = styleName;
    try {
      if (this.layerType === "WMS") {
        await this.layerManager.setWmsStyle(this.layerId, styleName);
      } else {
        await this.layerManager.setWmtsStyle(this.layerId, styleName);
      }
    } catch (error) {
      if (error instanceof TucbsError) {
        console.error(`[tucbs-style-editor] ${error.code} (${error.number}): ${error.message}`);
      }
      this._serviceStylesError =
        error instanceof Error ? error.message : "Stil uygulanamadı.";
    }
  }

  override render() {
    const selected = this._serviceStyles.find((s) => s.name === this._selectedServiceStyle);
    return html`
      <div class="card">
        <span class="card-title">Sunucu Stili</span>

        ${this._serviceStylesLoading
          ? html`<span class="field-label">Stiller yükleniyor…</span>`
          : this._serviceStylesError
            ? html`<span class="field-label" style="color:#da1e28;">${this._serviceStylesError}</span>`
            : html`
                <div>
                  <span class="field-label">Stil</span>
                  <cds-dropdown
                    size="sm"
                    label="Seçiniz"
                    .value=${this._selectedServiceStyle}
                    @cds-dropdown-selected=${(
                      event: CustomEvent<{ item: { value: string } }>,
                    ) => {
                      void this._selectServiceStyle(event.detail.item.value);
                    }}
                  >
                    ${this._serviceStyles.map(
                      (style) =>
                        html`<cds-dropdown-item value=${style.name}>${style.title}</cds-dropdown-item>`,
                    )}
                  </cds-dropdown>
                </div>

                ${selected?.legendUrl
                  ? html`
                      <div>
                        <span class="field-label">Lejant</span>
                        <img
                          src=${selected.legendUrl}
                          alt="Lejant"
                          style="max-width:222px; display:block;"
                        />
                      </div>
                    `
                  : ""}
              `}
      </div>
    `;
  }
}
