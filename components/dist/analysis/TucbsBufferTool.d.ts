import { LitElement } from 'lit';
import { Map as TucbsMapCore } from '@tucbs/core';
/**
 * Tampon form UI — tucbs-harita-analiz BufferPanel.tsx kalıbı.
 * Panel içinde açılır; HTTP yalnızca @tucbs/core Map.runBuffer üzerinden.
 *
 * @fires tucbs-buffer-run - Tampon analizi çalıştırıldığında (doğrulamalar geçip Map.runBuffer çağrılmadan hemen önce) tetiklenir; `detail` içinde `mapElementId`, `distanceM` ve `selectedLabel` bulunur.
 */
export declare class TucbsBufferTool extends LitElement {
    static readonly styles: import('lit').CSSResult[];
    /** Analiz için kullanılacak harita elemanının DOM id'si — `map` verilmediğinde bununla çözümlenir. */
    mapElementId: string;
    /** Core JS API `Map` referansı — doğrudan atanırsa `mapElementId` yerine bu kullanılır. */
    map: TucbsMapCore | null;
    /** Haritada seçilen özelliğin etiketi (salt-okunur giriş alanında gösterilir). */
    selectedLabel: string;
    /** Tampon mesafesi (metre). */
    distanceM: number | null;
    /** Shadow DOM'a uygulanacak özel CSS metni (`custom-css` attribute). */
    customCss: string;
    private _distanceStr;
    private _status;
    private _message;
    private _helpOpen;
    private _selectedFeature;
    private _map;
    private _mapHost;
    private readonly _customCssState;
    private readonly _onEntityClick;
    private readonly _onMapReady;
    /** Lit yaşam döngüsü — bileşen DOM'a bağlandığında başlangıç mesafe metnini ayarlar ve haritaya bağlanmayı dener. */
    connectedCallback(): void;
    /** Lit yaşam döngüsü — bileşen DOM'dan kaldırılırken harita bağlantısını (interaction/event) çözer. */
    disconnectedCallback(): void;
    /**
     * Lit yaşam döngüsü — `customCss`, `distanceM`, `mapElementId`/`map` değişikliklerinde ilgili yan etkileri uygular.
     *
     * @param changed Değişen property adları ve önceki değerleri.
     */
    updated(changed: Map<string, unknown>): void;
    private _resolveMap;
    private _resolveMapHost;
    private _bindMap;
    private _attachInteraction;
    private _unbindMap;
    private _onDistanceInput;
    private _onReselect;
    /** Sonuçtan sonra seçim ve mesafe ilk haline döner; kırmızı vurgu kalkar. */
    private _clearForm;
    private _syncHighlight;
    private _onSelectionClick;
    private _onRun;
    /** Sonuç, hata ve seçim uyarısını formun altında bırakmadan toast olarak gösterir. */
    private _note;
    /** Tampon formunu (seçim, mesafe, çalıştır butonu) render eder. */
    render(): import('lit').TemplateResult<1>;
}
//# sourceMappingURL=TucbsBufferTool.d.ts.map