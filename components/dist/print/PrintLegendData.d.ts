import { LayerManager, ManagedLayer } from '@tucbs/core';
import { LegendRow } from '../shared/util/legendRows.js';
export type { LegendRow };
/** Bir katmanın, yazdırma önizlemesindeki lejant bölümü için önceden hesaplanmış girdisi. */
export type PrintLegendEntry = 
/** WMS/WMTS servis grafiği (görsel URL'i). */
{
    /** Lejant başlığında gösterilen katman adı. */
    readonly layerTitle: string;
    /** Girdi türü. */
    readonly kind: "image";
    /** Servisin lejant görselinin adresi. */
    readonly imageUrl: string;
} | {
    /** Lejant başlığında gösterilen katman adı. */
    readonly layerTitle: string;
    /** Sürekli renk rampası, sabit aralıklı bin veya kategorik (enum) vektör stili. */
    readonly kind: "gradient" | "bin" | "enum";
    /** Renk kutucuğu ve etiketten oluşan lejant satırları. */
    readonly rows: readonly LegendRow[];
    /** Başlığın altında gösterilen veri sütunu adı. */
    readonly displayColumn: string;
}
/** Tek koloni aşan bir bin/enum listesinin, hizalama için önceden N koloma bölünmüş hali. */
 | {
    /** Lejant başlığında gösterilen katman adı. */
    readonly layerTitle: string;
    /** Girdi türü. */
    readonly kind: "list-columns";
    /** Başlığın altında gösterilen veri sütunu adı. */
    readonly displayColumn: string;
    /** Kolonlara bölünmüş lejant satırları (her eleman bir kolon). */
    readonly columnGroups: readonly (readonly LegendRow[])[];
}
/** Lejant çözülemedi/uygulanmadı (`message` kullanıcıya gösterilecek nedendir). */
 | {
    /** Lejant başlığında gösterilen katman adı. */
    readonly layerTitle: string;
    /** Girdi türü. */
    readonly kind: "empty";
    /** Kullanıcıya gösterilecek neden (ör. "Lejant yüklenemedi."). */
    readonly message: string;
};
/**
 * Görünür (basemap olmayan, gizlenmemiş) katmanların adlarını döner — hiçbir ağ çağrısı yapmaz.
 * @param layers - Taranacak katman listesi (`LayerManager.getLayers()`).
 * @returns Görünür katmanların başlıkları.
 */
export declare function collectVisibleDatasetNames(layers: readonly ManagedLayer[]): string[];
/**
 * Yazdirma onizlemesindeki lejant bolumu icin, GORUNUR (basemap olmayan)
 * katmanlarin lejant verisini `TucbsLegendPanel.ts` ile AYNI kaynaklardan
 * (WMS GetLegendGraphic / WMTS capabilities / vektor stil) cozer. Bir
 * katmanin cozumu basarisiz olursa (ag hatasi, servis hatasi) TUM onizlemeyi
 * dusurmez -- `Promise.allSettled` ile o katman icin "Lejant yuklenemedi"
 * girdisi uretilir.
 */
export declare function collectPrintLegendEntries(layerManager: LayerManager, layers: readonly ManagedLayer[]): Promise<PrintLegendEntry[]>;
//# sourceMappingURL=PrintLegendData.d.ts.map