import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { TimerBag } from "../shared/util/TimerBag.js";

interface BusyChangedDetail {
  busy: boolean;
  message?: string;
}

/**
 * **NOT:** Bu bağımsız bir "bileşen" DEĞİLDİR — `shared/util/busy.ts`
 * tarafından gerektiğinde otomatik olarak `document.body`'ye monte edilir.
 * Tüketicinin kendi `index.html`'ine ayrıca `<tucbs-busy-overlay>`
 * eklemesi GEREKMEZ.
 *
 * Katman ekleme/servis keşfi gibi sürüp giden işlemler boyunca tüm sayfayı
 * kilitleyen, tıklama/etkileşimi engelleyen tam ekran overlay
 * (`<tucbs-busy-overlay>`). `document` üzerinde yayınlanan `tucbs-busy-changed`
 * event'ini (bkz `./internal/busy.ts`) dinler; kaynağı fark etmeksizin
 * (dosya yükleme, servis kesfi, katman ekleme) tek bir ortak kilit sağlar.
 */
@customElement("tucbs-busy-overlay")
export class TucbsBusyOverlay extends LitElement {
  static override readonly styles = css`
    :host {
      position: fixed;
      inset: 0;
      z-index: 2000;
      display: none;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.35);
    }

    :host([active]) {
      display: flex;
    }

    .panel {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 1.25rem;
      background: #ffffff;
      border-radius: 4px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      font-family: "IBM Plex Sans", system-ui, sans-serif;
      font-size: 0.875rem;
      color: var(--cds-text-primary, #161616);
    }

    .spinner {
      width: 24px;
      height: 24px;
      flex: none;
      border: 2.5px solid var(--cds-border-subtle, #e0e0e0);
      border-top-color: var(--cds-interactive, #0f62fe);
      border-radius: 50%;
      animation: tucbs-busy-spin 0.7s linear infinite;
    }

    @keyframes tucbs-busy-spin {
      to {
        transform: rotate(360deg);
      }
    }
  `;

  /** Overlay'in görünür olup olmadığı (`active` attribute'una reflect edilir). */
  @property({ type: Boolean, reflect: true }) active = false;

  @state() private _message = "İşlem sürüyor…";

  // Yetkili katmanlar/servis bilgisi gibi COK HIZLI biten istekler (bkz
  // kullanici bildirimi: "flicker oluyor") overlay'i bir kare gosterip
  // hemen kapatinca goz rahatsiz edici bir yanip-sonme hissi veriyordu.
  // Standart "delayed spinner" deseni: busy=true geldiginde overlay HEMEN
  // degil, SHOW_DELAY_MS SONRA gosterilir -- daha kisa suren islemler hic
  // gorunmez. Bir kez gosterildiyse de, cok kisa sure sonra busy=false
  // gelse bile en az MIN_VISIBLE_MS ekranda tutulur -- aksi halde SHOW_DELAY_MS
  // sinirina yakin suren istekler yine tek-kare bir yanip-sonmeye yol acardi.
  private static readonly SHOW_DELAY_MS = 150;
  private static readonly MIN_VISIBLE_MS = 300;

  private _showTimer: number | undefined;
  private _hideTimer: number | undefined;
  private _shownAt = 0;
  /** Tüm setTimeout/rAF çağrılarını izler; bileşen DOM'dan kalkınca bekleyenleri iptal eder (bkz shared/util/TimerBag.ts). */
  private readonly _timers = new TimerBag(this);

  private readonly _onBusyChanged = (event: Event): void => {
    const detail = (event as CustomEvent<BusyChangedDetail>).detail;
    if (detail.busy && detail.message) this._message = detail.message;

    if (detail.busy) {
      this._timers.clearTimeout(this._hideTimer ?? null);
      this._hideTimer = undefined;
      if (!this.active && this._showTimer === undefined) {
        this._showTimer = this._timers.setTimeout(() => {
          this._showTimer = undefined;
          this.active = true;
          this._shownAt = Date.now();
        }, TucbsBusyOverlay.SHOW_DELAY_MS);
      }
      return;
    }

    if (this._showTimer !== undefined) {
      // Islem SHOW_DELAY_MS'ten kisa surdu -- overlay HIC GORUNMEDI, gosterecek de degiliz.
      this._timers.clearTimeout(this._showTimer);
      this._showTimer = undefined;
      return;
    }

    if (!this.active) return;
    const remaining = TucbsBusyOverlay.MIN_VISIBLE_MS - (Date.now() - this._shownAt);
    if (remaining <= 0) {
      this.active = false;
      return;
    }
    this._hideTimer = this._timers.setTimeout(() => {
      this._hideTimer = undefined;
      this.active = false;
    }, remaining);
  };

  /** `document` üzerindeki `tucbs-busy-changed` event'ine abone olur (bkz `shared/util/busy.ts`). */
  override connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener("tucbs-busy-changed", this._onBusyChanged);
  }

  /** `document` event aboneliğini kaldırır ve bekleyen gösterme/gizleme zamanlayıcılarını temizler. */
  override disconnectedCallback(): void {
    document.removeEventListener("tucbs-busy-changed", this._onBusyChanged);
    // ESKIDEN _showTimer/_hideTimer burada clearTimeout ile elle
    // temizleniyordu; artik _timers (TimerBag) super.disconnectedCallback()
    // icinde (hostDisconnected) ikisini de iptal ediyor.
    // Iptal edilen zamanlayicilarin id'leri de sifirlanir: ESKIDEN alanlar
    // eski id'yle kaliyordu ve gosterme zamanlayicisi beklerken DOM'dan
    // kaldirilip geri eklenen overlay, _onBusyChanged'deki
    // `_showTimer === undefined` kosulu saglanmadigi icin sonraki "mesgul"
    // olayinda gorunmuyordu (bir "mesgul bitti" olayina kadar).
    this._showTimer = undefined;
    this._hideTimer = undefined;
    super.disconnectedCallback();
  }

  /** Bileşenin şablonunu render eder: etkin değilken boş şablon, etkinken spinner ve mesajlı meşgul paneli. */
  override render() {
    if (!this.active) return html``;
    return html`
      <div class="panel" role="alert" aria-live="assertive">
        <span class="spinner"></span>
        <span>${this._message}</span>
      </div>
    `;
  }
}
