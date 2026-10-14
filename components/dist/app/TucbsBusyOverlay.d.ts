import { LitElement } from 'lit';
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
export declare class TucbsBusyOverlay extends LitElement {
    static readonly styles: import('lit').CSSResult;
    /** Overlay'in görünür olup olmadığı (`active` attribute'una reflect edilir). */
    active: boolean;
    private _message;
    private static readonly SHOW_DELAY_MS;
    private static readonly MIN_VISIBLE_MS;
    private _showTimer;
    private _hideTimer;
    private _shownAt;
    /** Tüm setTimeout/rAF çağrılarını izler; bileşen DOM'dan kalkınca bekleyenleri iptal eder (bkz shared/util/TimerBag.ts). */
    private readonly _timers;
    private readonly _onBusyChanged;
    /** `document` üzerindeki `tucbs-busy-changed` event'ine abone olur (bkz `shared/util/busy.ts`). */
    connectedCallback(): void;
    /** `document` event aboneliğini kaldırır ve bekleyen gösterme/gizleme zamanlayıcılarını temizler. */
    disconnectedCallback(): void;
    /** Bileşenin şablonunu render eder: etkin değilken boş şablon, etkinken spinner ve mesajlı meşgul paneli. */
    render(): import('lit').TemplateResult<1>;
}
//# sourceMappingURL=TucbsBusyOverlay.d.ts.map