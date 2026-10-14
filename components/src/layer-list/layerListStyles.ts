import { css } from "lit";

// TucbsLayerList.ts'in static styles sablonu -- God Component kilavuzu
// GC-03 4.4 Adim 2: dosyanin buyuk bir bolumunu olusturan bu blok, mantikla
// (durum/olay baglama/render) hicbir sekilde etkilesmedigi icin saf
// kes-yapistir ile ayri bir module alinir.
export const layerListStyles = css`
  :host {
    position: fixed;
    top: 1rem;
    left: 1rem;
    z-index: 1000;
    display: block;
    font-family: "IBM Plex Sans", system-ui, sans-serif;
    font-size: 0.875rem;
    color: var(--cds-text-primary, #161616);
    /* suppress Carbon's blue focus ring on the checkbox */
    --cds-focus: transparent;
  }

  .toggle-btn {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.5rem 0.75rem;
    border: 1px solid var(--cds-border-subtle, #e0e0e0);
    border-radius: 4px;
    background: var(--cds-layer-01, #ffffff);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    color: var(--cds-text-primary, #161616);
    font: inherit;
    cursor: pointer;
  }

  .toggle-btn:hover {
    background: var(--cds-layer-hover-01, #f4f4f4);
  }

  .toggle-arrow {
    display: inline-flex;
    color: var(--cds-icon-secondary, #6f6f6f);
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 0.125rem;
  }

  .add-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    flex: none;
    border: none;
    border-radius: 4px;
    background: transparent;
    color: var(--cds-icon-secondary, #6f6f6f);
    cursor: pointer;
  }

  .add-btn:hover {
    background: var(--cds-layer-hover-01, #f4f4f4);
  }

  .add-btn:disabled {
    opacity: 0.5;
    cursor: default;
  }

  .close-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    flex: none;
    border: none;
    border-radius: 4px;
    background: transparent;
    color: var(--cds-icon-secondary, #6f6f6f);
    cursor: pointer;
  }

  .close-btn:hover {
    background: var(--cds-layer-hover-01, #f4f4f4);
    color: var(--cds-icon-primary, #161616);
  }

  .layer-list {
    display: flex;
    flex-direction: column;
    position: relative;
  }

  .layer-empty {
    padding: 1rem;
    font-size: 0.8125rem;
    color: var(--cds-text-secondary, #525252);
    text-align: center;
  }

  /* Sol dolgu (padding-left) BİLEREK yok: ".panel-body" (bkz.
     SlideOverPanel.ts) zaten 1rem dolgu veriyor -- header-actions'daki
     "Veri Dosyası Ekle" butonu (bkz. .add-btn) da bu dolgudan başka bir
     ekleme yapmadan panel kenarına flush oturuyor. Katman satırının ilk
     öğesi (.drag-handle) de AYNI hizadan başlasın diye burada AYRICA
     1rem eklenmiyor -- yalnızca satırın SAĞ tarafı için (kebap butonuyla
     panel-body'nin sağ dolgusu arasında boşluk kalmasın diye) korunuyor. */
  .layer-item {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 0.5rem 1rem 0.5rem 0;
    background: var(--cds-layer-01, #ffffff);
    border-bottom: 1px solid var(--cds-border-subtle, #e0e0e0);
  }

  .layer-item:last-child {
    border-bottom: none;
  }

  .layer-item--dragging {
    position: fixed;
    z-index: 20;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    pointer-events: none;
  }

  .layer-placeholder {
    margin: 2px 1rem;
    border: 1px dashed var(--cds-border-strong, #8d8d8d);
    border-radius: 4px;
  }

  .layer-row {
    display: flex;
    align-items: center;
    gap: 0.375rem;
  }

  .drag-handle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    flex: none;
    border: none;
    background: transparent;
    color: var(--cds-icon-secondary, #6f6f6f);
    cursor: grab;
    touch-action: none;
  }

  .drag-handle:active {
    cursor: grabbing;
  }

  /* .layer-row'daki "align-items: center" tum ogeleri satirin ortasina
     hizalar (drag-handle, layer-name, layer-actions da bu sekilde
     hizalaniyor); checkbox ve renk noktasi da elle dikey offset vermeden
     aynı ortak merkeze birakiliyor. */
  /* Carbon'un checkbox'i kendi ic stilinde margin-block-end:.375rem (6px)
     tasiyor (form alanlarinda alt bosluk icin); bu "hayali" alt bosluk
     align-items'in ortalama hesabini yukari kaydiriyordu. Sifirlayarak
     satirdaki diger tum ogelerle (drag-handle, isim, kebap butonu) ayni
     ortak merkeze dogal olarak hizalanmasini sagliyoruz. */
  cds-checkbox {
    flex: none;
    margin: 0 0 0 -4px;
  }

  .layer-color-dot {
    position: relative;
    display: inline-flex;
    flex: none;
    width: 16px;
    height: 16px;
    margin-left: -8px;
    border-radius: 0;
    overflow: hidden;
    cursor: pointer;
  }

  .layer-color-dot input[type="color"] {
    position: absolute;
    inset: -4px;
    width: calc(100% + 8px);
    height: calc(100% + 8px);
    border: none;
    appearance: none;
    -webkit-appearance: none;
    background: none;
    cursor: pointer;
  }

  .layer-name {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .layer-actions {
    flex: none;
    margin-left: auto;
  }

  .layer-options {
    position: relative;
  }

  .options-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    flex: none;
    border: none;
    background: transparent;
    color: var(--cds-icon-secondary, #6f6f6f);
    cursor: pointer;
  }

  .options-btn:hover,
  .options-btn[aria-expanded="true"] {
    color: var(--cds-icon-primary, #161616);
  }

  .options-btn:disabled {
    cursor: not-allowed;
  }

  /* GeoTIFF export tetiklendiginde (bkz _geoTiffExportingId) gercek bir ag
     istegi (WMS GetMap/WCS GetCoverage) tamamlanana kadar surer -- bu
     sure boyunca ne olduğu görünmezse (menü zaten kapanmış olduğundan,
     tıklanabilecek hiçbir şey kalmıyor) kullanıcı "hiçbir şey olmuyor"
     sanıp tekrar tıklayabilir. TucbsStyleEditor'daki .outline-busy ile
     AYNI görsel dil (kucuk donen spinner), "..." butonunun YERINE gecer
     ki hangi katmanin indirildigi belli olsun. */
  .options-btn-spinner {
    width: 14px;
    height: 14px;
    flex: none;
    border: 1.5px solid var(--cds-border-subtle, #e0e0e0);
    border-top-color: var(--cds-interactive, #0f62fe);
    border-radius: 50%;
    animation: options-btn-spin 0.7s linear infinite;
  }

  @keyframes options-btn-spin {
    to {
      transform: rotate(360deg);
    }
  }

  .layer-opacity-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding-left: 24px;
  }

  .layer-opacity-pct {
    width: 2.25rem;
    color: var(--cds-text-secondary, #525252);
    font-size: 0.6875rem;
    text-align: right;
  }

  .opacity-slider {
    flex: 1;
    height: 4px;
    margin-right: 6px;
    appearance: none;
    border-radius: 2px;
    background: linear-gradient(
      to right,
      var(--cds-interactive, #0f62fe) 0%,
      var(--cds-interactive, #0f62fe) var(--fill, 100%),
      var(--cds-border-subtle, #e0e0e0) var(--fill, 100%),
      var(--cds-border-subtle, #e0e0e0) 100%
    );
  }

  .opacity-slider::-webkit-slider-thumb {
    width: 12px;
    height: 12px;
    appearance: none;
    border-radius: 50%;
    background: var(--cds-interactive, #0f62fe);
    cursor: pointer;
  }

  .opacity-slider::-moz-range-thumb {
    width: 12px;
    height: 12px;
    border: none;
    border-radius: 50%;
    background: var(--cds-interactive, #0f62fe);
    cursor: pointer;
  }

`;
