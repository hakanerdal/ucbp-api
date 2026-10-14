import type { DrawTool } from "@tucbs/core";

// Cizim/olcum araci aktifken gosterilen madde madde kullanim yonlendirmeleri.
// Etkilesimler DrawingManager.bindToolHandlers ile birebir ayni olmali: sag tik
// = araçtan cik, cift tik = polyline-polygon'u bitir, Esc = devam eden cizimi iptal (point haric tum araclar), rectangle/circle
// 2 tik, freehand surukle-birak, point tek tik.

export interface DrawGuide {
  readonly title: string;
  readonly steps: readonly string[];
}

const EXIT = "Araçtan çıkmak için sağ tıklayın.";
const ADD_POINT = "Haritaya sol tıklayarak nokta ekleyin.";
const CANCEL_DRAWING = "Çizimi Esc ile iptal edin.";
const FINISH_MULTI = "Çizimi çift tıklayarak bitirin.";
const FINISH_MEASURE = "Ölçümü çift tıklayarak bitirin.";
const CANCEL_MEASURE = "Ölçümü Esc ile iptal edin.";

const DRAW_GUIDES: Record<DrawTool, DrawGuide> = {
  point: { title: "Nokta Çiz", steps: ["Nokta eklemek için haritaya sol tıklayın.", EXIT] },
  polyline: {
    title: "Çizgi Çiz",
    steps: [ADD_POINT, FINISH_MULTI, CANCEL_DRAWING, EXIT],
  },
  polygon: {
    title: "Alan Çiz",
    steps: [ADD_POINT, FINISH_MULTI, CANCEL_DRAWING, EXIT],
  },
  rectangle: {
    title: "Dikdörtgen Çiz",
    steps: ["Bir köşeye sol tıklayın.", "Karşı köşeye sol tıklayarak bitirin.", CANCEL_DRAWING, EXIT],
  },
  circle: {
    title: "Daire Çiz",
    steps: ["Merkeze sol tıklayın.", "Yarıçap noktasına sol tıklayarak bitirin.", CANCEL_DRAWING, EXIT],
  },
  freehand: {
    title: "Serbest Çizim",
    steps: ["Sol tuşa basılı tutarak çizin, bırakınca bitirin.", CANCEL_DRAWING, EXIT],
  },
};

const MEASURE_GUIDES: Partial<Record<DrawTool, DrawGuide>> = {
  polyline: {
    title: "Mesafe Ölç",
    steps: [ADD_POINT, FINISH_MEASURE, CANCEL_MEASURE, EXIT],
  },
  polygon: {
    title: "Alan Ölç",
    steps: [ADD_POINT, FINISH_MEASURE, CANCEL_MEASURE, EXIT],
  },
};

/** Verilen araç/kaynak için başlık + madde madde "nasıl çizilir/bitirilir/çıkılır" yönlendirmesi. */
export function drawGuide(tool: DrawTool, source: "draw" | "measure"): DrawGuide {
  if (source === "measure") return MEASURE_GUIDES[tool] ?? DRAW_GUIDES[tool];
  return DRAW_GUIDES[tool];
}
