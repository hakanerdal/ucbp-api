import { DrawTool } from '@tucbs/core';
/** Bir çizim/ölçüm aracı için kılavuz panelinde gösterilen yönlendirme. */
export interface DrawGuide {
    /** Panel başlığı (ör. "Alan Çiz", "Mesafe Ölç"). */
    readonly title: string;
    /** Sırayla gösterilen kullanım adımları (çizme, bitirme, iptal, araçtan çıkma). */
    readonly steps: readonly string[];
}
/** Verilen araç/kaynak için başlık + madde madde "nasıl çizilir/bitirilir/çıkılır" yönlendirmesi. */
export declare function drawGuide(tool: DrawTool, source: "draw" | "measure"): DrawGuide;
//# sourceMappingURL=drawHints.d.ts.map