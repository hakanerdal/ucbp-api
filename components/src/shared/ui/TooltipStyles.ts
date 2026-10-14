import { css } from "lit";

// Buton/element tooltip'i icin paylasilan stil (toolbar araclari VE
// TucbsLayerList tarafindan kullanilir). Native `title` tooltip'inin
// konumunu tarayici/OS belirler, CSS ile yon veremeyiz -- bu yuzden
// `data-tooltip` attribute'u + ::after pseudo-element ile kendi
// tooltip'imizi ciziyoruz. Secici herhangi bir class adina degil sadece
// `[data-tooltip]` attribute'una bagli, boylece farkli buton class'lari
// (`.tool-button`, `.add-btn`, `.drag-handle` vb.) ayni gorunumu (renk,
// boyut, gecis) sorunsuzca paylasabilir -- KONUM ise butonun bulundugu
// panelin ekrandaki yerine gore degisir, bu yuzden iki ayri export var:
// `leftTooltipStyles` (sag kenara yaslanan Toolbar icin -- tooltip
// haritaya, yani SOLA acilir, dikey ortali) ve `bottomRightTooltipStyles`
// (sol kenardan acilan Katman Yonetimi paneli icin -- tooltip butonun TAM
// ALTINDAN baslayip SAGA dogru acilir).
const TOOLTIP_BASE = css`
  [data-tooltip] {
    position: relative;
  }

  [data-tooltip]::after {
    content: attr(data-tooltip);
    position: absolute;
    background: rgba(22, 22, 22, 0.9);
    color: #ffffff;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.75rem;
    line-height: 1.4;
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition: opacity 0.1s ease;
    /* Komsu toolbar butonlarinin (ayni stacking context'teki diger
       [data-tooltip] elemanlarinin) UZERINDE kalmasi icin -- uygulamadaki
       EN YUKSEK z-index'ten (print preview overlay: 99999) bile daha
       yuksek, pratikte "her zaman en ustte" (kullanici istegi). */
    z-index: 2147483647;
  }

  [data-tooltip]:hover::after,
  [data-tooltip]:focus-visible::after {
    opacity: 1;
    visibility: visible;
  }

  /* KOK NEDEN (v18 tooltip-z-index bulgusu): tucbs-toolbar ".toolbar" konteyneri
     "display:flex" kullaniyor, ve her arac (tucbs-draw-tool, tucbs-measure-tool
     vb.) bu flex'in birer FLEX ITEM'i. Flexbox spec'ine gore z-index:auto olan
     bir flex item'in ICINDEKI descendant'larin z-index'i (::after'a verilen
     2147483647 DAHIL) SADECE o flex item'in KENDI icinde karsilastirilir --
     bir SONRAKI KARDES flex item (ör. measure), kendisi de z-index:auto
     oldugu icin AYNI "z-index:0" katmaninda ama DOM SIRASINDA SONRA geldigi
     icin HER ZAMAN ONCEKI kardesin (draw) TUM icerigini (icindeki dev
     z-index'li tooltip DAHIL) ORTER -- descendant'in z-index'i host'un
     KENDI flex-item seviyesini ASAMAZ. Cozum: :has() ile, o an ICINDE
     hover/focus edilen bir tooltip VARSA, HOST'UN KENDI z-index'ini (flex
     item seviyesinde) kardeslerinin ustune cikariyoruz -- boylece o an
     tooltip'i gosteren arac, GECICI olarak butun kardes araclarin ONUNE
     gecer (bkz. gercek Chrome headless repro ile dogrulandi). */
  :host:has([data-tooltip]:hover),
  :host:has([data-tooltip]:focus-visible) {
    z-index: 1;
  }
`;

export const leftTooltipStyles = [
  TOOLTIP_BASE,
  css`
    [data-tooltip]::after {
      top: 50%;
      right: calc(100% + 0.5rem);
      transform: translateY(-50%);
    }
  `,
];

export const bottomRightTooltipStyles = [
  TOOLTIP_BASE,
  css`
    [data-tooltip]::after {
      top: calc(100% + 0.375rem);
      left: 0;
    }
  `,
];

// Toolbar araclarinin (Zoom/Git/Sil/Olcum-disi digerleri) BUTONUN TAM
// ALTINDA, yatayda ortali tooltip'i icin -- leftTooltipStyles'tan farkli
// olarak tooltip haritaya dogru SOLA degil, butonun altina acilir (kullanici
// istegi: aktif cizim/olcum ana butonu HARIC tum araclar boyle gostersin).
export const bottomCenterTooltipStyles = [
  TOOLTIP_BASE,
  css`
    [data-tooltip]::after {
      top: calc(100% + 0.5rem);
      left: 50%;
      transform: translateX(-50%);
    }
  `,
];
