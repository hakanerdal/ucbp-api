import { TemplateResult } from 'lit';
/** Kart başlığındaki aç/kapa anahtarının ayarları. */
export interface CardToggle {
    /** Anahtar açık mı. */
    readonly checked: boolean;
    /** Erişilebilirlik adı (görünmez; ör. "Dolgu"). */
    readonly label: string;
    /** Durum değişince çağrılır. */
    readonly onChange: (checked: boolean) => void;
}
/**
 * Kart başlığı: solda başlık, sağa dayalı (varsa) aç/kapa anahtarı.
 * Anahtarın yanında "On/Off" yazısı ve etiket gösterilmez (`label-a/b` boş, `label-text` yok):
 * Carbon'un görünmez-etiket sınıfı bu projede yüklenmediği için `hide-label` çalışmıyor.
 * "Dolgu"/"Dış Hat" kartlarında eski "Etkin" kutusunun yerini alır; anahtar anında
 * uygulanan bir aç/kapa ayarı olduğundan Carbon yönergesinde toggle kullanılır.
 */
export declare function renderCardHeader(title: string, toggle?: CardToggle): TemplateResult;
//# sourceMappingURL=cardHeader.d.ts.map