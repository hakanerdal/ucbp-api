import { LitElement, nothing, PropertyValues } from 'lit';
import { Map as TucbsMapInstance } from '@tucbs/core';
/** `<tucbs-toolbar>`'ın harita üzerindeki sabit konumu. */
export type TucbsToolbarPosition = "right-center" | "top-right" | "bottom-right" | "top-center" | "top-left" | "bottom-left" | "left-center";
/**
 * `tucbs-toolbar`: arac CONTAINER'i. Icinde gosterdigi her arac (ör.
 * `tucbs-zoom-tool`) kendi basina da kullanilabilen bagimsiz bir Web
 * Component'tir -- toolbar sadece `tools` listesine gore bunlari sıralar ve
 * haritaya baglar (merkezi bir active-tool state'i TUTMAZ).
 *
 * `mapElementId`, sayfadaki `<tucbs-map>` elementinin `id`'siyle eşleşmelidir;
 * bileşen bu sayede haritaya otomatik bağlanır (Senaryo 2). Her araca
 * `tool-props` JSON attribute'uyla (veya `setToolProps()` ile) ek property
 * geçilebilir — aşağıda `draw` aracına özel çizim geometrisi listesi iletiliyor.
 *
 * @example
 * ```html
 * <tucbs-map id="map" api-key="YOUR_API_KEY" basemap="hgm-temel"></tucbs-map>
 *
 * <tucbs-toolbar
 *   mapElementId="map"
 *   tools="zoom,goto-coordinate,draw,measure,delete,analysis,settings,print"
 *   tool-props='{"draw":{"tools":"point,polyline,polygon,rectangle,circle,freehand"}}'
 * ></tucbs-toolbar>
 * ```
 */
export declare class TucbsToolbar extends LitElement {
    static readonly styles: import('lit').CSSResult;
    /** Opsiyonel: `tucbs-map` elementinin DOM id'si (Senaryo 2 baglama). */
    mapElementId: string;
    /** Toolbar'in harita uzerindeki sabit konumu (7 secenekten biri). */
    position: TucbsToolbarPosition;
    /** Virgulle ayrilmis, render sirasini belirleyen arac ID listesi. */
    tools: string;
    /** id -> ozel HTML etiket adi eslemesi; bilinen ("zoom"/"draw" vb.) ID'lerin uzerine de yazilip ozellestirilebilir. */
    customTools: Record<string, string>;
    /** id -> o araca dogrudan atanacak ek property'ler (ör. TucbsDrawTool'un `tools`/`defaultTool` gibi kendi ozellikleri). */
    toolProps: Record<string, Record<string, unknown>>;
    /** Tuketicinin, bilesen kaynagina dokunmadan shadow DOM'a enjekte edebilecegi keyfi CSS metni. */
    customCss: string;
    /** Core JS API `Map` instance'i. */
    map: TucbsMapInstance | undefined;
    private readonly _customCssState;
    /** Tüm setTimeout/rAF çağrılarını izler; bileşen DOM'dan kalkınca bekleyenleri iptal eder (bkz shared/util/TimerBag.ts). */
    private readonly _timers;
    /**
     * `tools` listesine bir arac id'si ekler (verilirse `index` konumuna, aksi halde sona).
     *
     * @param id - Eklenecek arac id'si.
     * @param index - Opsiyonel eklenecegi konum; verilmezse listenin sonuna eklenir.
     *
     * @example
     * ```ts
     * toolbar.addTool("delete");
     * ```
     */
    addTool(id: string, index?: number): void;
    /**
     * `tools` listesinden verilen id'yi cikarir.
     *
     * @param id - Cikarilacak arac id'si.
     *
     * @example
     * ```ts
     * toolbar.removeTool("measure");
     * ```
     */
    removeTool(id: string): void;
    /**
     * Bir arac id'sini ozel bir custom element etiket adina baglar.
     *
     * @param id - Baglanacak arac id'si.
     * @param tagName - Kayit edilecek custom element etiket adi (gecerli bir custom-element adi olmalidir).
     *
     * @example
     * ```ts
     * toolbar.registerTool("my-tool", "my-custom-element");
     * toolbar.addTool("my-tool");
     * ```
     */
    registerTool(id: string, tagName: string): void;
    /**
     * Belirli bir arac id'sine ek property'ler atar (ör. `{tools:"point,polygon"}`).
     *
     * @param id - Property'lerin atanacagi arac id'si.
     * @param props - Ilgili arac component'ine dogrudan atanacak property'ler.
     *
     * @example
     * ```ts
     * toolbar.setToolProps("draw", { tools: "point,polygon" });
     * ```
     */
    setToolProps(id: string, props: Record<string, unknown>): void;
    private _toolIds;
    private _tagFor;
    /** `position` değiştiğinde host'a ilgili sabit-konum stillerini uygular; `tools`/`customTools` değiştiğinde bilinmeyen/geçersiz arac id'leri için uyarı loglar. */
    protected willUpdate(changed: PropertyValues): void;
    /**
     * Ilk render'dan sonra haritaya baglanmayi dener: `map` disaridan zaten
     * atanmamissa `mapElementId` ile eslesen `tucbs-map` elementini bulup
     * hazir oldugunda `map` property'sini otomatik doldurur (Senaryo 2).
     */
    firstUpdated(): void;
    private _renderTool;
    private _applyToolProps;
    /** `customCss` değiştiğinde özel CSS'i shadow DOM'a uygular; `toolProps`/`map`/`tools`/`customTools` değiştiğinde alt araçların property'lerini yeniden atar. */
    protected updated(changed: PropertyValues): void;
    /**
     * `map` henuz atanmamissa hicbir sey render etmez; atanmissa `tools`
     * listesindeki her arac id'sini sirasiyla ilgili custom element olarak render eder.
     */
    render(): typeof nothing | import('lit').TemplateResult;
}
//# sourceMappingURL=TucbsToolbar.d.ts.map