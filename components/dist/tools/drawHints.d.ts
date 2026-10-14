import { DrawTool } from '@tucbs/core';
export interface DrawGuide {
    readonly title: string;
    readonly steps: readonly string[];
}
/** Verilen araç/kaynak için başlık + madde madde "nasıl çizilir/bitirilir/çıkılır" yönlendirmesi. */
export declare function drawGuide(tool: DrawTool, source: "draw" | "measure"): DrawGuide;
//# sourceMappingURL=drawHints.d.ts.map