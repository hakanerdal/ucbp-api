import { PrintLegendEntry } from './PrintLegendData.js';
export declare const LEGEND_ROW_HEIGHT_MM = 3.4;
export declare const LEGEND_COLUMNS_PER_PAGE = 3;
/** `paginateLegendEntries()`'in sonucu. */
export interface LegendPaginationResult {
    /** Sayfa 1'in (haritanın altındaki rezerve alan) bütçesine sığan girdiler. */
    readonly page1Entries: readonly PrintLegendEntry[];
    /** Sığmayan girdiler için oluşturulan devam sayfaları (her biri o sayfanın girdi listesi). */
    readonly continuationPages: readonly (readonly PrintLegendEntry[])[];
}
/** `paginateDatasetNames()`'in sonucu. */
export interface DatasetNamePaginationResult {
    /** Sayfa 1'in bütçesine sığan katman adları. */
    readonly page1Names: readonly string[];
    /** Sığmayan adlar için oluşturulan devam sayfaları (her biri o sayfanın ad listesi). */
    readonly continuationPages: readonly (readonly string[])[];
}
/**
 * "Lejant Goster" KAPALIYKEN gosterilen sade katman-adi listesi icin --
 * `paginateLegendEntries()`'in AYNI prensibini (satirlar JS tarafinda,
 * sayfa yuksekligine gore ONCEDEN gruplara ayrilir; CSS'in kendi
 * sayfalamasina/`overflow:hidden`in sessizce kirpmasina GUVENILMEZ) çok
 * daha basit bir veri sekli (duz string listesi, swatch/bin/enum YOK) icin
 * uygular. Bug: A5 Yatay gibi kucuk sayfalarda `.datasets-section` sabit
 * yukseklik+`overflow:hidden` kullandigindan, sigmayan isimler DOM'da VAR
 * ama GORUNMEZ oluyordu (4 katmandan sadece 2'si gorunuyordu) -- bu fonksiyon
 * artik sigmayan isimleri devam sayfalarina tasir.
 */
export declare function paginateDatasetNames(names: readonly string[], page1HeightMm: number, fullPageHeightMm: number): DatasetNamePaginationResult;
/**
 * Onceden CSS'in otomatik sayfalamasina (`break-inside:avoid` + tasan
 * icerik) GUVENMEK yerine -- bu, tek basina binlerce (cogunlukla bos)
 * sayfa uretebiliyordu (bkz Faz 2.1 arastirmasi, 919 kategorili gercek
 * veriyle olculerek bulundu: 4137 sayfa) -- satirlar BURADA, JS tarafinda,
 * HER parcanin kendi sayfasina/butcesine GUVENLE sigacagi garantilenerek
 * onceden gruplara ayrilir. `entries` sirayla islenir: sayfa 1'in
 * (haritanin altindaki rezerve alan) butcesine sigan girdiler oldugu gibi
 * kalir; sigmayan buyuk (bin/enum) listeler AYRI "devam sayfalarina"
 * atanir. FAZ 2.3: bir listenin bir PARCASI birden fazla kolona
 * yayilacaksa (`kind:"list-columns"`), kolon hizalamasi icin acik bir
 * CSS Grid olarak insa edilir (bkz PrintLegendBuilder.ts
 * buildListColumnsGrid). FAZ 2.4: bu parca artik HER ZAMAN yeni bos bir
 * sayfaya atanmaz -- kullanici, sayfa 1'de (varsa kompakt girdilerden)
 * kalan boslugun ONCE kullanilmasini, ancak SONRA yeni sayfaya
 * gecilmesini istedi (bkz addMultiColumnChunk WHY yorumu).
 */
export declare function paginateLegendEntries(entries: readonly PrintLegendEntry[], page1HeightMm: number, fullPageHeightMm: number): LegendPaginationResult;
//# sourceMappingURL=PrintLegendPagination.d.ts.map