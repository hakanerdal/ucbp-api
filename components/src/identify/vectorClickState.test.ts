import { describe, expect, it } from "vitest";
import {
  NEUTRAL_VECTOR_CLICK_STATE,
  toEntityCommitted,
  toEntityPending,
  toNeutral,
} from "./vectorClickState.js";

describe("vectorClickState", () => {
  it("toNeutral() her zaman ayni 'neutral' durumunu doner", () => {
    expect(toNeutral()).toEqual({ kind: "neutral" });
    expect(toNeutral()).toBe(NEUTRAL_VECTOR_CLICK_STATE);
  });

  it("toEntityPending() verilen pendingVectorClick'i tasiyan 'entityPending' durumu uretir", () => {
    const pending = { items: [], lon: 29, lat: 41 };
    expect(toEntityPending(pending)).toEqual({ kind: "entityPending", pendingVectorClick: pending });
  });

  it("toEntityCommitted() pendingVectorClick'i TUTMAYAN 'entityCommitted' durumu uretir", () => {
    const state = toEntityCommitted();
    expect(state).toEqual({ kind: "entityCommitted" });
    expect("pendingVectorClick" in state).toBe(false);
  });
});
