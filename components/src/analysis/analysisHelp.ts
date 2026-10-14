import { html, css, type TemplateResult } from "lit";

export type AnalysisHelp = {
  ne: string[];
  girdiler: string[];
  adimlar: string[];
  ornek: string[];
};

/** Portal coğrafi işlem yardım metni. Menü yolu API analiz listesine göre. */
export const COGRAFI_HELP = {
  sinir: {
    ne: ["Seçilen geometrinin sınırını üretir: sınırlayıcı kutu veya dışbükey zarf."],
    girdiler: [
      "Zorunlu: haritadan bir nesne (nokta / çizgi / poligon)",
      "Sınır tipi: Sınırlayıcı Kutu veya Dışbükey Zarf",
      "Çıktı geometrisi: poligon veya çizgi",
    ],
    adimlar: [
      "Analiz listesinden Sınır’ı açın",
      "Haritada nesneyi seçin",
      "Sınır tipini ve çıktı geometrisini ayarlayın",
      "Çalıştır’a basın; sonuç yeni katman olur",
    ],
    ornek: [
      "Yol veya park katmanını ekleyin",
      "Nesneyi seçin; sınır tipi ve çıktıyı ayarlayın",
      "Çalıştırın ve yeni sınır katmanını kontrol edin",
    ],
  },
  tampon: {
    ne: ["Seçilen geometrinin etrafında verilen mesafede (metre) tampon poligonu oluşturur."],
    girdiler: [
      "Zorunlu: haritadan bir nesne (nokta / çizgi / poligon)",
      "Zorunlu: mesafe (metre), 0’dan büyük",
    ],
    adimlar: [
      "Analiz listesinden Tampon’u açın",
      "Haritada nesneyi seçin",
      "Mesafeyi metre cinsinden girin",
      "Çalıştır’a basın; tampon yeni katman olur",
    ],
    ornek: ["Nokta, çizgi veya alan ekleyin", "Nesneyi seçin; mesafe girin (örn. 300)", "Çalıştırın"],
  },
  kirp: {
    ne: ["Kaynak nesnenin, çizilen dikdörtgen içinde kalan kısmını tutar."],
    girdiler: ["Zorunlu: kırpılacak nesne", "Zorunlu: haritada çizilen dikdörtgen alan"],
    adimlar: [
      "Analiz listesinden Kırp’ı açın",
      "Kaynak nesneyi seçin",
      "Alan çiz ile dikdörtgeni belirleyin",
      "Çalıştır’a basın",
    ],
    ornek: ["Kaynağı seçin", "Parkın bir kısmını kapsayan dikdörtgen çizin", "Yalnızca içerde kalan parçayı kontrol edin"],
  },
  fark: {
    ne: ["İlk poligondan ikinci poligonla örtüşen kısmı çıkarır."],
    girdiler: ["Zorunlu: ilk poligon (kaynak)", "Zorunlu: ikinci poligon (çıkarılacak)"],
    adimlar: [
      "Analiz listesinden Fark’ı açın",
      "İki poligon yuvalarını doldurun",
      "Çalıştır’a basın; örtüşmeyen kısım sonuç olur",
    ],
    ornek: ["İlk = kaynak poligon, ikinci = çıkarılacak poligon", "Çalıştırın", "Örtüşen dilimin eksildiğini kontrol edin"],
  },
  kesisim: {
    ne: ["İki poligonun ortak (kesişen) alanını üretir."],
    girdiler: ["Zorunlu: birinci poligon", "Zorunlu: ikinci poligon", "Örtüşme yoksa sonuç boş kalabilir"],
    adimlar: [
      "Analiz listesinden Kesişim’i açın",
      "İki poligon yuvalarını doldurun",
      "Çalıştır’a basın; ortak alan yeni katman olur",
    ],
    ornek: ["İki örtüşen poligon seçin", "Çalıştırın", "Yalnızca ortak bölgenin kaldığını kontrol edin"],
  },
  cikarma: {
    ne: ["Bir poligondan, diğeriyle örtüşen kısımları kaldırır."],
    girdiler: ["Zorunlu: kaynak poligon", "Zorunlu: örtüşen poligon"],
    adimlar: [
      "Analiz listesinden Çıkarma’yı açın",
      "Kaynak ve örtüşen poligonu seçin",
      "Çalıştır’a basın",
    ],
    ornek: ["Kaynak ve örtüşen poligonu seçin", "Çalıştırın", "Örtüşen bölgenin kaynaktan çıktığını kontrol edin"],
  },
  birlestir: {
    ne: ["İki poligonu tek birleşik alana eritir."],
    girdiler: ["Zorunlu: birinci poligon", "Zorunlu: ikinci poligon"],
    adimlar: [
      "Analiz listesinden Birleştir’i açın",
      "İki poligon yuvalarını doldurun",
      "Çalıştır’a basın; birleşik alan yeni katman olur",
    ],
    ornek: ["İki poligon seçin", "Çalıştırın", "Tek birleşik sınırın oluştuğunu kontrol edin"],
  },
  kama: {
    ne: ["Nokta etrafında mesafe ve açı aralığıyla dilim (kama) tamponu üretir."],
    girdiler: [
      "Zorunlu: nokta",
      "Zorunlu: mesafe (metre) > 0",
      "Zorunlu: başlangıç açısı bitiş açısından küçük (0° = kuzey)",
    ],
    adimlar: [
      "Analiz listesinden Kama Tampon’u açın",
      "Haritada bir nokta seçin",
      "Mesafe ile açıları girin",
      "Çalıştır’a basın",
    ],
    ornek: ["Bir nokta seçin", "Örn. 200 m, 0°–90°", "Noktadan yayılan dilimi kontrol edin"],
  },
} satisfies Record<string, AnalysisHelp>;

/** Yardım penceresi ve başlıktaki ? düğmesi. */
export const analysisHelpStyles = css`
  .title-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 16px;
  }

  .title-row .title {
    margin: 0 0 6px;
  }

  button.help {
    width: 1.75rem;
    height: 1.75rem;
    border-radius: 8px;
    border: 1px solid #d1d5db;
    background: #f9fafb;
    font-weight: 700;
    cursor: pointer;
    color: #1d4ed8;
  }

  .help-back {
    position: fixed;
    inset: 0;
    z-index: 30;
    background: rgba(15, 23, 42, 0.45);
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 12vh 16px 16px;
  }

  .help-card {
    width: min(520px, 100%);
    max-height: min(70vh, 640px);
    overflow: auto;
    background: #fff;
    border-radius: 10px;
    padding: 14px 16px 16px;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.18);
    color: #111827;
  }

  .help-card h3 {
    margin: 0 0 8px;
    font-size: 16px;
  }

  .help-card h4 {
    margin: 12px 0 4px;
    font-size: 13px;
  }

  .help-card p,
  .help-card li {
    margin: 0 0 6px;
    font-size: 13px;
    line-height: 1.45;
  }

  .help-card ul,
  .help-card ol {
    margin: 0;
    padding-left: 1.2rem;
  }

  .help-close {
    float: right;
    border: none;
    background: transparent;
    font-size: 18px;
    cursor: pointer;
    color: #6b7280;
  }
`;

/** Portal yardımındaki dört bölüm: ne, girdiler, adımlar, örnek. */
export function renderAnalysisHelp(
  open: boolean,
  title: string,
  help: AnalysisHelp,
  onClose: () => void,
): TemplateResult | null {
  if (!open) return null;
  const stop = (e: Event) => e.stopPropagation();
  return html`
    <div class="help-back" @click=${onClose}>
      <div class="help-card" @click=${stop}>
        <button type="button" class="help-close" aria-label="Kapat" @click=${onClose}>×</button>
        <h3>${title}</h3>
        <h4>Ne işe yarar</h4>
        ${help.ne.map((satir) => html`<p>${satir}</p>`)}
        <h4>Girdiler</h4>
        <ul>${help.girdiler.map((satir) => html`<li>${satir}</li>`)}</ul>
        <h4>Adımlar</h4>
        <ol>${help.adimlar.map((satir) => html`<li>${satir}</li>`)}</ol>
        <h4>Örnek</h4>
        <ol>${help.ornek.map((satir) => html`<li>${satir}</li>`)}</ol>
      </div>
    </div>
  `;
}
