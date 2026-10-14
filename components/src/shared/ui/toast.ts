import { html, css, render as litRender } from "lit";
import "@carbon/web-components/es/components/notification/index.js";

// Bagimsiz bir SweetAlert-benzeri bildirim (bkz kullanici bildirimi: kapat
// butonu YOK, birkaç saniye sonra KENDILIGINDEN kapanir, girisi animasyonlu)
// -- TucbsFileUpload/TucbsServiceUpload gibi diyaloglarin KENDI :host'u
// `transform: translate(-50%, -50%)` uyguluyor (ortalanmis diyalog konumu
// icin); bu, fixed-position TORUNLAR icin (Shadow DOM siniri bunu ENGELLEMEZ)
// viewport yerine o donusmus atayi containing block yapardi -- ekranin
// GERCEK ust-ortasinda sabit durmasi icin toast'in KENDI document.body
// portali sart (bkz TucbsGoToCoordinate/TucbsSettingsTool'daki ayni
// sebepten document.body-portal deseni). Bu yuzden component-BAGIMSIZ,
// paylasilan bir modul olarak burada tutuluyor -- birden fazla bilesen
// (dosya yukleme, servis ekleme) ayni toast mekanizmasini kullanabilsin.
// hide-close-button + timeout, Carbon'un cds-inline-notification'inin KENDI
// otomatik kapanma mekanizmasini kullanir -- ekstra bir zamanlayici/kutuphane
// gerekmez, sadece giris animasyonu burada eklenir (Carbon bunu saglamiyor).
const TOAST_STYLES = css`
  @keyframes tucbs-toast-in {
    from {
      opacity: 0;
      transform: translate(-50%, -12px);
    }
    to {
      opacity: 1;
      transform: translate(-50%, 0);
    }
  }

  :host {
    position: fixed;
    top: 16px;
    left: 50%;
    /* Baslangic durumu transform'un KENDISI (translate(-50%,-12px)) --
       animasyonun "from" karesiyle AYNI olmali, aksi halde ilk kare
       yaniltici bir sicramaya sebep olur. */
    transform: translate(-50%, -12px);
    /* TucbsBusyOverlay'in (z-index: 2000) UZERINDE kalmali -- CRS donusum/
       WFS kayit-sinirlamasi uyarilari layerManager.add() cozulmeden ONCE
       (add()'in kendi govdesi icinde senkron emit() ile) tetiklenir, yani
       toast overlay hala AKTIFKEN gosterilir; z-index daha DUSUK olsaydi
       toast overlay'in ARKASINDA kalip GORUNMEZ olurdu (bkz kullanici
       bildirimi: bu uyarilar gorulemiyordu). */
    z-index: 2100;
    display: block;
    font-family: "IBM Plex Sans", system-ui, sans-serif;
    font-size: 0.875rem;
    width: 320px;
    max-width: calc(100vw - 2rem);
    animation: tucbs-toast-in 220ms ease-out forwards;
  }

  cds-inline-notification {
    width: 100%;
  }
`;

// Ayni anda TEK toast gosterilir -- yeni biri gelirse eskisi KALDIRILIP
// yenisiyle degistirilir, ustuste yiginilmaz.
let activeToastEl: HTMLDivElement | null = null;

const TOAST_TIMEOUT_MS: Record<"success" | "info" | "warning" | "error", number> = {
  success: 4000,
  info: 4000,
  warning: 6000,
  error: 7000,
};

/**
 * document.body'ye portallanmış, birkaç saniye sonra kendiliğinden kapanan bir bildirim (toast) gösterir. Aynı anda tek toast gösterilir; yeni biri geleni değiştirir.
 * @param kind - Bildirim türü (kapanma süresini de belirler: `success`/`info` en kısa, `error` en uzun).
 * @param message - Gösterilecek mesaj metni.
 */
export function showToast(kind: "success" | "info" | "warning" | "error", message: string): void {
  destroyToast();

  const el = document.createElement("div");
  document.body.appendChild(el);
  const shadow = el.attachShadow({ mode: "open" });
  const sheet = new CSSStyleSheet();
  sheet.replaceSync(TOAST_STYLES.cssText);
  shadow.adoptedStyleSheets = [sheet];
  activeToastEl = el;

  // "info" en kisa surede kapanir (basit onay); "warning"/"error" okumak
  // icin biraz daha fazla sure tanir (kullanici bildirimi: hata mesaji da
  // ayni ust-orta/kendiliginden-kapanan toast'i kullansin).
  const timeout = TOAST_TIMEOUT_MS[kind];

  litRender(
    html`
      <cds-inline-notification
        kind=${kind}
        hide-close-button
        timeout=${timeout}
        subtitle=${message}
        @cds-notification-closed=${() => destroyToast()}
      ></cds-inline-notification>
    `,
    shadow,
  );
}

/** Şu an gösterilen toast'ı (varsa) DOM'dan kaldırır. */
export function destroyToast(): void {
  activeToastEl?.remove();
  activeToastEl = null;
}
