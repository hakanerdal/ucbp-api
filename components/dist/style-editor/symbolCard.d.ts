import { LineDash, PointShape } from '@tucbs/core';
/** Semboloji şablonlarının stil editöründen okuyup yazdığı state ve çağırdığı metotlar. */
export interface SymbolCardHost {
    /** Seçili nokta şekli. */
    pointShape: PointShape;
    /** Nokta boyutu (metin alanı değeri). */
    pointSize: string;
    /** Seçili çizgi tipi. */
    lineDash: LineDash;
    /** Önizleme için sabit dolgu rengi (hex). */
    readonly fillColor: string;
    /** Önizleme için dış hat rengi (hex). */
    readonly outlineColor: string;
    /** Dış hat açık mı. */
    readonly outlineEnabled: boolean;
    /** Nokta sembolü kullanıcı tarafından belirlendi olarak işaretlenir (stile `point` yazılmaya başlar). */
    markPointCustomized(): void;
    /** Stili (gecikmeli) haritaya uygular. */
    scheduleApplyStyle(): void;
}
/**
 * "Sembol" kartı: nokta için şekil ve boyut, çizgi için çizgi tipi.
 * @param host - Kartın okuyup yazdığı editör state'i ve metotları.
 * @param content - Kartta hangi alanların gösterileceği (`point`: şekil/boyut, `dash`: çizgi tipi).
 * @returns Kartın Lit template'i.
 */
export declare function renderSymbolCard(host: SymbolCardHost, content: {
    readonly point: boolean;
    readonly dash: boolean;
}): import('lit').TemplateResult<1>;
/**
 * Çizgi ve alan katmanları için "Dış Hat" kartının içindeki "Çizgi Tipi" alanı.
 * @param host - Alanın okuyup yazdığı editör state'i ve metotları.
 * @returns Alanın Lit template'i.
 */
export declare function renderLineDashField(host: SymbolCardHost): import('lit').TemplateResult<1>;
//# sourceMappingURL=symbolCard.d.ts.map