import { TemplateResult } from 'lit';
export type AnalysisHelp = {
    ne: string[];
    girdiler: string[];
    adimlar: string[];
    ornek: string[];
};
/** Portal coğrafi işlem yardım metni. Menü yolu API analiz listesine göre. */
export declare const COGRAFI_HELP: {
    sinir: {
        ne: string[];
        girdiler: string[];
        adimlar: string[];
        ornek: string[];
    };
    tampon: {
        ne: string[];
        girdiler: string[];
        adimlar: string[];
        ornek: string[];
    };
    kirp: {
        ne: string[];
        girdiler: string[];
        adimlar: string[];
        ornek: string[];
    };
    fark: {
        ne: string[];
        girdiler: string[];
        adimlar: string[];
        ornek: string[];
    };
    kesisim: {
        ne: string[];
        girdiler: string[];
        adimlar: string[];
        ornek: string[];
    };
    cikarma: {
        ne: string[];
        girdiler: string[];
        adimlar: string[];
        ornek: string[];
    };
    birlestir: {
        ne: string[];
        girdiler: string[];
        adimlar: string[];
        ornek: string[];
    };
    kama: {
        ne: string[];
        girdiler: string[];
        adimlar: string[];
        ornek: string[];
    };
};
/** Yardım penceresi ve başlıktaki ? düğmesi. */
export declare const analysisHelpStyles: import('lit').CSSResult;
/** Portal yardımındaki dört bölüm: ne, girdiler, adımlar, örnek. */
export declare function renderAnalysisHelp(open: boolean, title: string, help: AnalysisHelp, onClose: () => void): TemplateResult | null;
//# sourceMappingURL=analysisHelp.d.ts.map