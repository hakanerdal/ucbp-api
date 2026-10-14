import { describe, expect, it } from "vitest";
import type { DrawTool } from "@tucbs/core";
import { drawGuide } from "./drawHints.js";

const TOOLS: DrawTool[] = ["point", "polyline", "polygon", "rectangle", "circle", "freehand"];

describe("drawGuide", () => {
  it("her cizim araci icin son madde cikis (sag tik) bilgisidir", () => {
    for (const tool of TOOLS) {
      const steps = drawGuide(tool, "draw").steps;
      expect(steps.length).toBeGreaterThanOrEqual(2);
      expect(steps[steps.length - 1]).toContain("sağ tıklayın");
    }
  });

  it("sadece polyline/polygon cift tikla bitirmeyi soyler", () => {
    for (const tool of TOOLS) {
      const mentionsFinish = drawGuide(tool, "draw").steps.includes("Çizimi çift tıklayarak bitirin.");
      expect(mentionsFinish).toBe(tool === "polyline" || tool === "polygon");
    }
  });

  it("point haric her cizim araci Esc ile iptali soyler", () => {
    for (const tool of TOOLS) {
      const mentionsEsc = drawGuide(tool, "draw").steps.some((s) => s.includes("Esc ile"));
      expect(mentionsEsc).toBe(tool !== "point");
    }
  });

  it("olcum kaynagi icin Mesafe/Alan Ölç basligi kullanir", () => {
    expect(drawGuide("polyline", "measure").title).toBe("Mesafe Ölç");
    expect(drawGuide("polygon", "measure").title).toBe("Alan Ölç");
  });

  it("olcum modlarinin ilk maddesi mesafe ve alanda aynidir", () => {
    const first = (tool: DrawTool) => drawGuide(tool, "measure").steps[0];
    expect(first("polyline")).toBe("Haritaya sol tıklayarak nokta ekleyin.");
    expect(first("polygon")).toBe(first("polyline"));
  });

  it("olcum panelinde 'Ölçümü', cizim panelinde 'Çizimi' kullanilir; bitirme ve iptal ayri maddelerdir", () => {
    for (const tool of ["polyline", "polygon"] as const) {
      const measure = drawGuide(tool, "measure").steps;
      expect(measure).toContain("Ölçümü çift tıklayarak bitirin.");
      expect(measure).toContain("Ölçümü Esc ile iptal edin.");
      const draw = drawGuide(tool, "draw").steps;
      expect(draw).toContain("Çizimi çift tıklayarak bitirin.");
      expect(draw).toContain("Çizimi Esc ile iptal edin.");
    }
  });

  it("alan cizimi ve alan olcumu 'nokta ekleyin' ile baslar", () => {
    expect(drawGuide("polygon", "draw").steps[0]).toBe("Haritaya sol tıklayarak nokta ekleyin.");
    expect(drawGuide("polygon", "measure").steps[0]).toBe(drawGuide("polygon", "draw").steps[0]);
  });

  it("olcumde tanimsiz arac icin cizim rehberine duser", () => {
    expect(drawGuide("point", "measure")).toBe(drawGuide("point", "draw"));
  });
});
