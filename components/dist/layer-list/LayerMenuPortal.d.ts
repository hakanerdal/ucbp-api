import { LitElement, PropertyValues } from 'lit';
/** Katman "..." menüsündeki tek bir aksiyon maddesi. */
export interface LayerMenuAction {
    /** Maddenin ikonu (render edilebilir SVG düğümü). */
    icon: unknown;
    /** Maddenin görünen metni. */
    label: string;
    /** Maddeye tıklanınca çağrılır. Alt menü varsa üst satır tıklanınca çalışmaz. */
    onClick: () => void;
    /** Varsa satırın sağına açılan alt menü. Analiz sonucu Dışa Aktar için. */
    children?: LayerMenuAction[];
}
/**
 * `tucbs-layer-menu-portal`: `TucbsLayerList`'in katman satırındaki "..."
 * (kebap) menüsünün içeriğini `document.body`'ye DOĞRUDAN portal eder (tek
 * bir instance, `TucbsLayerList` tarafından olusturulup yeniden kullanılır).
 *
 * WHY: menü eskiden `.layer-options` içinde `position:absolute` idi ve
 * `.layer-options{position:relative}` kendi containing block'unu zaten
 * sağladığı için `tucbs-slide-over-panel`'in `.panel{transform:...}`
 * sorunundan (bkz. SlideOverPanel.ts) ETKİLENMİYORDU -- ama
 * `.panel-body{overflow-y:auto}` CSS spec'i gereği KARŞI eksende
 * (overflow-x) de örtük olarak "auto" olur, bu da satırın sağına taşan
 * (160px+ genişlikte) menüyü panelin dar (~320-360px) genişliğinde YATAYDA
 * KIRPIYORDU. Bu bileşen `position:fixed` + tıklanan butonun
 * `getBoundingClientRect()`'i ile hesaplanan mutlak ekran koordinatlarını
 * kullanarak bu kırpma sınırının TAMAMEN dışında (haritanın ÜSTÜNDE) render
 * edilir.
 */
export declare class TucbsLayerMenuPortal extends LitElement {
    static readonly styles: import('lit').CSSResult;
    /** Menünün görünür olup olmadığı (`open` attribute'una reflect edilir). */
    open: boolean;
    /** Menüde gösterilecek aksiyon listesi. */
    actions: LayerMenuAction[];
    /** Menünün ekrandaki mutlak X koordinatı (piksel). */
    x: number;
    /** Menünün ekrandaki mutlak Y koordinatı (piksel). */
    y: number;
    /** `x`/`y` değiştiğinde host'un `transform`'unu günceller. */
    updated(changed: PropertyValues): void;
    render(): import('lit').TemplateResult<1>;
}
//# sourceMappingURL=LayerMenuPortal.d.ts.map