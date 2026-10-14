// UNIT TESTLERI -- God Component kılavuzu, "Çapraz Tekrarlar" (write-only
// apiKey get/set) kalıcılığı, Faz 1: WriteOnlyApiKey'in kendi
// (TucbsMap/TucbsApp/TucbsLayerList'ten bağımsız) davranışını sabitler.
import { describe, expect, it, vi } from "vitest";
import { WriteOnlyApiKey } from "./WriteOnlyApiKey.js";

function makeHost() {
  return { requestUpdate: vi.fn() };
}

describe("WriteOnlyApiKey (internal/WriteOnlyApiKey.ts) -- izole", () => {
  it("başlangıçta real \"\" ve masked \"\" döner", () => {
    const state = new WriteOnlyApiKey(makeHost());
    expect(state.real).toBe("");
    expect(state.masked).toBe("");
  });

  it("write() gerçek değeri saklar, masked HER ZAMAN maskelenmiş döner", () => {
    const state = new WriteOnlyApiKey(makeHost());
    state.write("gizli-anahtar");
    expect(state.real).toBe("gizli-anahtar");
    expect(state.masked).toBe("••••••");
  });

  it("write() host.requestUpdate(\"apiKey\", eskiDeğer) ile çağırır", () => {
    const host = makeHost();
    const state = new WriteOnlyApiKey(host);
    state.write("birinci");
    expect(host.requestUpdate).toHaveBeenCalledWith("apiKey", "");
    state.write("ikinci");
    expect(host.requestUpdate).toHaveBeenCalledWith("apiKey", "birinci");
    expect(host.requestUpdate).toHaveBeenCalledTimes(2);
  });

  it("write(null/undefined) değeri \"\" olarak varsayılan alır (?? \"\")", () => {
    const state = new WriteOnlyApiKey(makeHost());
    // @ts-expect-error -- null/undefined'ın gerçek dünyada attribute kaldırımından gelebileceğini doğrular
    state.write(null);
    expect(state.real).toBe("");
    expect(state.masked).toBe("");
  });

  it("writeDirect() gerçek değeri yazar ama host.requestUpdate'i TETİKLEMEZ", () => {
    const host = makeHost();
    const state = new WriteOnlyApiKey(host);
    state.writeDirect("gec-baglanan-anahtar");
    expect(state.real).toBe("gec-baglanan-anahtar");
    expect(state.masked).toBe("••••••");
    expect(host.requestUpdate).not.toHaveBeenCalled();
  });

  it("writeDirect() sonrası write() normal şekilde requestUpdate tetikler", () => {
    const host = makeHost();
    const state = new WriteOnlyApiKey(host);
    state.writeDirect("once-dogrudan");
    state.write("sonra-normal");
    expect(host.requestUpdate).toHaveBeenCalledWith("apiKey", "once-dogrudan");
    expect(host.requestUpdate).toHaveBeenCalledTimes(1);
  });
});
