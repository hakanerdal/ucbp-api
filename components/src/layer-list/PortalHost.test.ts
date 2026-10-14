// @vitest-environment jsdom
//
// God Component kilavuzu GC-03 4.4 Adim 1: TucbsLayerList'in uc kopya
// "ensure/sync/dispose" portal ciftini tek bir jenerik yardimciya indiren
// PortalHost<T>'in IZOLE birim testleri (TucbsLayerList'ten BAGIMSIZ --
// gercek davranis karsilastirmasi icin bkz
// TucbsLayerList.portals.characterization.test.ts).
//
// jsdom GEREKLI: document.createElement/body.appendChild gercek bir DOM
// gerektirir.
import { afterEach, describe, expect, it, vi } from "vitest";

// Test icin "tucbs-portal-host-probe" adinda minimal bir custom element --
// PortalHost herhangi bir HTMLElement alt sinifiyla CALISMALI, bir Lit
// bilesenine bagimli olmamali.
class ProbeElement extends HTMLElement {
  open = false;
  label = "";
}
if (!customElements.get("tucbs-portal-host-probe")) {
  customElements.define("tucbs-portal-host-probe", ProbeElement);
}

import { PortalHost } from "./PortalHost.js";

describe("PortalHost", () => {
  afterEach(() => {
    document.querySelectorAll("tucbs-portal-host-probe").forEach((el) => el.remove());
  });

  it("ensure() ilk cagrida elementi olusturup body'ye ekler ve sync() ile ilk durumu uygular", () => {
    const sync = vi.fn((el: ProbeElement) => {
      el.label = "ilk";
    });
    const host = new PortalHost<ProbeElement>("tucbs-portal-host-probe", sync);

    expect(host.element).toBeNull();
    host.ensure();

    expect(host.element).not.toBeNull();
    expect(document.body.contains(host.element)).toBe(true);
    expect(sync).toHaveBeenCalledTimes(1);
    expect(host.element!.label).toBe("ilk");
  });

  it("ensure() idempotenttir: ikinci cagri YENI bir element OLUSTURMAZ, sync()'i tekrar CAGIRMAZ", () => {
    const sync = vi.fn();
    const host = new PortalHost<ProbeElement>("tucbs-portal-host-probe", sync);

    host.ensure();
    const first = host.element;
    host.ensure();

    expect(host.element).toBe(first);
    expect(sync).toHaveBeenCalledTimes(1);
    expect(document.querySelectorAll("tucbs-portal-host-probe").length).toBe(1);
  });

  it("update() ensure() sonrasi sync()'i guncel durumla tekrar cagirir", () => {
    let counter = 0;
    const host = new PortalHost<ProbeElement>("tucbs-portal-host-probe", (el) => {
      el.label = `cagri-${++counter}`;
    });

    host.ensure();
    expect(host.element!.label).toBe("cagri-1");

    host.update();
    expect(host.element!.label).toBe("cagri-2");
  });

  it("update() ensure() CAGRILMADAN once hicbir sey yapmaz (element yok)", () => {
    const sync = vi.fn();
    const host = new PortalHost<ProbeElement>("tucbs-portal-host-probe", sync);

    host.update();

    expect(sync).not.toHaveBeenCalled();
    expect(host.element).toBeNull();
  });

  it("dispose() elementi DOM'dan kaldirir ve element'i null yapar", () => {
    const host = new PortalHost<ProbeElement>("tucbs-portal-host-probe", () => {});
    host.ensure();
    const el = host.element!;

    host.dispose();

    expect(document.body.contains(el)).toBe(false);
    expect(host.element).toBeNull();
  });

  it("dispose() sonrasi ensure() YENIDEN bir element olusturur (dispose+ensure dongusu desteklenir)", () => {
    const sync = vi.fn();
    const host = new PortalHost<ProbeElement>("tucbs-portal-host-probe", sync);

    host.ensure();
    const first = host.element;
    host.dispose();
    host.ensure();

    expect(host.element).not.toBeNull();
    expect(host.element).not.toBe(first);
    expect(sync).toHaveBeenCalledTimes(2);
    expect(document.querySelectorAll("tucbs-portal-host-probe").length).toBe(1);
  });

  it("dispose() element YOKKEN cagrilirsa hata firlatmaz (guard)", () => {
    const host = new PortalHost<ProbeElement>("tucbs-portal-host-probe", () => {});
    expect(() => host.dispose()).not.toThrow();
    expect(host.element).toBeNull();
  });

  it("closeEvent/onClose verildiyse, element bu olayi dispatch ettiginde onClose cagrilir", () => {
    const onClose = vi.fn();
    const host = new PortalHost<ProbeElement>(
      "tucbs-portal-host-probe",
      () => {},
      "probe-closed",
      onClose,
    );
    host.ensure();

    host.element!.dispatchEvent(new CustomEvent("probe-closed"));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("closeEvent/onClose verilmediyse (ör. stil editoru portali) hicbir dinleyici eklenmez, hata olusmaz", () => {
    const host = new PortalHost<ProbeElement>("tucbs-portal-host-probe", () => {});
    host.ensure();

    expect(() =>
      host.element!.dispatchEvent(new CustomEvent("herhangi-bir-olay")),
    ).not.toThrow();
  });

  it("birden fazla PortalHost instance'i BIRBIRINDEN bagimsiz calisir (ayni etiket icin bile)", () => {
    const hostA = new PortalHost<ProbeElement>("tucbs-portal-host-probe", (el) => {
      el.label = "A";
    });
    const hostB = new PortalHost<ProbeElement>("tucbs-portal-host-probe", (el) => {
      el.label = "B";
    });

    hostA.ensure();
    hostB.ensure();

    expect(hostA.element).not.toBe(hostB.element);
    expect(hostA.element!.label).toBe("A");
    expect(hostB.element!.label).toBe("B");
    expect(document.querySelectorAll("tucbs-portal-host-probe").length).toBe(2);

    hostA.dispose();
    expect(document.querySelectorAll("tucbs-portal-host-probe").length).toBe(1);
    expect(hostB.element).not.toBeNull();
  });
});
