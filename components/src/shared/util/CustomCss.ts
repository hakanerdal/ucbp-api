// WHY: Carbon Web Components tabanli tucbs-* bilesenlerinin, tuketicinin
// bilesen kaynagina hic dokunmadan shadow DOM'a keyfi CSS enjekte
// edebilmesi icin ortak bir "customCss" property + adoptedStyleSheets
// deseni var (bkz. docs/arge/css-override ARGE calismasi). Bu dosya, o
// deseni TucbsLayerList ve benzer bilesenler arasinda tekrar yazilmadan
// paylasilabilir hale getirir.
//
// KRITIK KURAL: customCss metni SADECE duz class seciciler icermelidir
// (`--cds-*` gibi CSS custom property'ler DEGIL). Custom property'ler
// inheritance yoluyla shadow DOM sinirlarini astigi icin, bir bilesenin
// customCss'i icine gomdugu BASKA tucbs-* bilesenlerine (ornegin
// TucbsLayerList'in gomdugu tucbs-file-upload) sizabilir. Duz class
// seciciler bu sinirlari hicbir zaman asamaz; bu yuzden ortak yardimci
// bunu ZORLAMAZ ama TEK GUVENLI KULLANIM SEKLI budur.

/** applyCustomCss'in bir instance icin tasidigi durum; cagiran private bir alanda saklamali. */
export interface CustomCssState {
  /** Adopte edilmiş `CSSStyleSheet` (henüz oluşturulmadıysa `null`). */
  sheet: CSSStyleSheet | null;
}

/**
 * Verilen CSS metnini, shadowRoot'a adopte edilmis ayri bir CSSStyleSheet
 * olarak uygular/gunceller. Ayni instance icin tekrar cagrildiginda
 * (customCss degistiginde) sheet'i yeniden olusturmak yerine replaceSync
 * ile gunceller; metin bos ise sheet'i adoptedStyleSheets'ten kaldirir.
 *
 * @param shadowRoot Bilesenin `this.shadowRoot`'u.
 * @param cssText Tuketicinin verdigi CSS metni (ör. `this.customCss`).
 * @param state Cagirandaki private alanda tutulan durum (ör. `{ sheet: null }`).
 * @param loggerLabel Hata mesajlarinda gosterilecek bilesen adi (ör. "tucbs-layer-list").
 */
export function applyCustomCss(
  shadowRoot: ShadowRoot | null,
  cssText: string,
  state: CustomCssState,
  loggerLabel: string,
): void {
  if (!shadowRoot) return;

  if (!cssText) {
    if (state.sheet) {
      const sheet = state.sheet;
      shadowRoot.adoptedStyleSheets = shadowRoot.adoptedStyleSheets.filter(
        (s) => s !== sheet,
      );
    }
    return;
  }

  if (!state.sheet) {
    state.sheet = new CSSStyleSheet();
    shadowRoot.adoptedStyleSheets = [
      ...shadowRoot.adoptedStyleSheets,
      state.sheet,
    ];
  }

  try {
    state.sheet.replaceSync(cssText);
  } catch (error) {
    console.warn(`[${loggerLabel}] customCss gecersiz CSS iceriyor:`, error);
  }
}
