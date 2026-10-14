// @vitest-environment jsdom
//
// Esc: devam eden cizimi IPTAL eder (tamamlamaz), arac aktif kalir; cizim
// yokken no-op'tur.
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Cartesian3, ScreenSpaceEventHandler, type Viewer } from "cesium";
import { DrawingManager } from "./DrawingManager.js";
import type { InteractionManager } from "./InteractionManager.js";

const pressKey = (key: string) => document.dispatchEvent(new KeyboardEvent("keydown", { key }));

describe("DrawingManager -- Esc ile cizim iptali", () => {
  let manager: DrawingManager;
  let abort: ReturnType<typeof vi.fn>;
  let complete: ReturnType<typeof vi.fn>;
  let cancel: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    const canvas = document.createElement("canvas");
    const viewer = {
      scene: { canvas, screenSpaceCameraController: {} },
      screenSpaceEventHandler: new ScreenSpaceEventHandler(canvas),
      entities: { add: vi.fn(), remove: vi.fn() },
      trackedEntity: undefined,
    } as unknown as Viewer;
    const interaction = { suspend: vi.fn(), resume: vi.fn() } as unknown as InteractionManager;
    manager = new DrawingManager(viewer, interaction);
    abort = vi.fn();
    complete = vi.fn();
    cancel = vi.fn();
    manager.on("draw:abort", abort);
    manager.on("draw:complete", complete);
    manager.on("draw:cancel", cancel);
  });

  // Gercek tiklamalar yerine (picking gerektirir) devam eden cizimi dogrudan kurar.
  const seedPositions = (count: number) => {
    (manager as unknown as { positions: Cartesian3[] }).positions = Array.from({ length: count }, (_, i) =>
      Cartesian3.fromDegrees(30 + i, 40),
    );
  };
  const positionsOf = () => (manager as unknown as { positions: Cartesian3[] }).positions;

  it("devam eden cizimde Esc cizimi iptal eder: tamamlanmaz, arac aktif kalir", () => {
    manager.activate("polygon", "draw");
    seedPositions(3);
    pressKey("Escape");
    expect(abort).toHaveBeenCalledWith({ tool: "polygon", source: "draw" });
    expect(complete).not.toHaveBeenCalled();
    expect(cancel).not.toHaveBeenCalled();
    expect(positionsOf()).toHaveLength(0);
    expect(manager.getShapes()).toHaveLength(0);
    expect(manager.isActive()).toBe(true);
  });

  it.each(["rectangle", "circle"] as const)("%s: ilk tiktan sonra Esc cizimi iptal eder", (tool) => {
    manager.activate(tool);
    seedPositions(1);
    pressKey("Escape");
    expect(abort).toHaveBeenCalledWith({ tool });
    expect(complete).not.toHaveBeenCalled();
    expect(positionsOf()).toHaveLength(0);
    expect(manager.isActive()).toBe(true);
  });

  it("freehand: surukleme sirasinda Esc cizimi ve surukleme durumunu iptal eder", () => {
    manager.activate("freehand");
    seedPositions(5);
    (manager as unknown as { freehandDragging: boolean }).freehandDragging = true;
    pressKey("Escape");
    expect(abort).toHaveBeenCalledWith({ tool: "freehand" });
    expect(complete).not.toHaveBeenCalled();
    expect(positionsOf()).toHaveLength(0);
    expect((manager as unknown as { freehandDragging: boolean }).freehandDragging).toBe(false);
    expect(manager.isActive()).toBe(true);
  });

  it("point: Esc no-op", () => {
    manager.activate("point");
    pressKey("Escape");
    expect(abort).not.toHaveBeenCalled();
    expect(manager.isActive()).toBe(true);
  });

  it("cizim yokken Esc hicbir sey yapmaz", () => {
    manager.activate("polyline");
    pressKey("Escape");
    expect(abort).not.toHaveBeenCalled();
    expect(manager.isActive()).toBe(true);
  });

  it("Esc disindaki tuslar cizimi etkilemez", () => {
    manager.activate("polyline");
    seedPositions(2);
    pressKey("Enter");
    expect(abort).not.toHaveBeenCalled();
    expect(positionsOf()).toHaveLength(2);
  });

  it("arac kapaninca Esc dinleyicisi kalkar", () => {
    manager.activate("polygon");
    manager.deactivate();
    seedPositions(3);
    pressKey("Escape");
    expect(abort).not.toHaveBeenCalled();
  });
});
