import { html } from "lit";
import { GRADIENT_PALETTES, sanitizeNumericInput, type GradientBoundCheck } from "./fillStyleSpec.js";

// GC-02 Faz 3.1b: TucbsStyleEditor._renderFillCard() (295 satir, bes renk
// modunun alanlari tek metotta) buraya, mod basina template fonksiyonlari
// olarak TASINDI. Template'ler AYNI Shadow DOM'da render edilir (CSS ve
// state degismedi). Bilesenin state'i private oldugu icin template'ler ona
// FillCardHost uzerinden CANLI erisir: olay isleyicileri bir alani yazdiktan
// hemen sonra tekrar okuyor (ornegin renk modu degisince colorMode yazilip
// hemen ardindan sutun listesi icin okunuyor),
// bu yuzden anlik bir kopya degil okuma/yazma yapan bir adaptor gerekir
// (bkz TucbsStyleEditor._fillCardHost).

/** Bin Sayısı alanının varsayılan değeri (kayıtlı/geçerli değer yoksa). */
export const DEFAULT_BIN_COUNT = "5";

/** Renk Modu dropdown seçeneği. */
export interface ColorModeOption {
  /** `FillStyle.mode` değeri. */
  value: string;
  /** Dropdown'da görünen ad. */
  label: string;
}

// Siralama onemli: dropdown'da bu sirayla listelenir.
export const FILL_COLOR_MODES: readonly ColorModeOption[] = [
  { value: "solid", label: "Sabit Renk" },
  { value: "gradient", label: "Sürekli (Gradient)" },
  { value: "bin", label: "Kesikli (Bin)" },
  { value: "enum", label: "Kategorik (Enum)" },
  { value: "off", label: "Kapalı" },
];

/** Kategori Sırası dropdown seçeneği. */
export interface CategorySortOption {
  /** `sortCategoryValues`'a geçen sıralama anahtarı. */
  value: string;
  /** Dropdown'da görünen ad. */
  label: string;
}

// Siralama onemli: dropdown'da bu sirayla listelenir.
export const CATEGORY_SORT_OPTIONS: readonly CategorySortOption[] = [
  { value: "asc", label: "Artan (eskiden yeniye)" },
  { value: "desc", label: "Azalan (yeniden eskiye)" },
  { value: "source", label: "Verideki sıra" },
];

/** Dolgu kartı template'lerinin stil editöründen okuyup yazdığı state ve çağırdığı metotlar. */
export interface FillCardHost {
  /** Renk modu (solid/gradient/bin/enum/off). */
  colorMode: string;
  /** Seçili veri sütunu. */
  dataColumn: string;
  /** Seçili gradient paletinin adı. */
  gradientPalette: string;
  /** Min alanı (boş = otomatik). */
  gradientMin: string;
  /** Max alanı (boş = otomatik). */
  gradientMax: string;
  /** Min alanındaki geçersiz değer uyarısı (boş = geçerli). */
  gradientMinError: string;
  /** Max alanındaki geçersiz değer uyarısı (boş = geçerli). */
  gradientMaxError: string;
  /** Bin sayısı (metin alanı değeri). */
  binCount: string;
  /** Kategori sırası anahtarı. */
  categorySort: string;
  /** Palet ters çevrilmiş mi. */
  paletteReversed: boolean;
  /** Kategori değerleri. */
  categoryValues: (string | number)[];
  /** Kategori -> renk eşlemesi. */
  categoryColors: Record<string, string>;
  /** Sabit dolgu rengi (hex). */
  fillColor: string;
  /** Dolgu opaklığı (0-100). */
  readonly fillOpacity: number;
  /** Tüm veri sütunları (Kategorik için). */
  readonly dataColumns: readonly string[];
  /** Sayısal veri sütunları (Gradient/Bin için). */
  readonly numericDataColumns: readonly string[];
  /** Renk Modu seçimi gizli mi (Çizim/Ölçü katmanı). */
  readonly isFixedSolidLayer: boolean;
  /** Min alanına negatif değer girilebilir mi. */
  allowNegativeMin(): boolean;
  /** Max alanına negatif değer girilebilir mi. */
  allowNegativeMax(): boolean;
  /** Min veya Max alanına yazılan değerin geçerliliğini denetler (veri aralığı, Min <= Max). */
  checkGradientBound(edited: "min" | "max", value: string): GradientBoundCheck;
  /** Stili (gecikmeli) haritaya uygular. */
  scheduleApplyStyle(): void;
  /** Kategori değerlerini seçili sıraya göre sıralar. */
  sortCategoryValues(values: (string | number)[]): (string | number)[];
  /** Her kategori değeri için bir renk garanti eder. */
  autoFillCategoryColors(values: (string | number)[], existing: Record<string, string>): Record<string, string>;
  /** Opaklık kaydırıcısının dolgu göstergesini günceller. */
  updateOpacitySlider(input: HTMLInputElement, value: number): void;
  /** Dolgu opaklığını ayarlar ve uygular. */
  setFillOpacity(value: number): void;
  /** Veri sütunu değişimini işler (aralık/kategori keşfi ve uygulama). */
  onDataColumnChange(column: string): void;
}

// Min/Max alanlarinin ortak isleyicileri (gercek hatalar plani H6.2; kural
// ve gecmisi: bkz fillStyleSpec.ts checkGradientBound).
// Genislik/Bin Sayisi'ndaki cds-number-input'un aksine (bkz o alanlardaki
// yorumlar) cds-text-input duz bir metin kutusu -- locale/sayi formatlama
// YOK, bu yuzden GECERLI bir degeri HER tus vurusunda state'e yazip aninda
// uygulamak (Carbon'un deger'i yeniden yazip kullanicinin yazdigini bozmasi
// riski OLMADAN) guvenli (bkz kullanici bildirimi: Min/Max degistirince
// harita VE her iki Lejant -- StyleEditor'un kendisi ile TucbsLegendPanel --
// bos yere tiklamadan ANINDA guncellensin).
// Rakam disi HERHANGI bir karakter (harf, bosluk, birden fazla nokta/eksi
// vs.) Bin Sayisi/Genislik'teki AYNI "target.value = ..." dogrudan-DOM-yazma
// deseniyle aninda temizlenir (bkz kullanici bildirimi: "Min Max alanları
// sadece numeric değer kabul etmeli"). Bunun DISINDA alan yazarken ARTIK
// yeniden yazilmaz: gecersiz deger state'e yazilmaz (harita son gecerli
// degerde kalir) ve alanin altinda uyari gosterilir.
//
// Duzenleme basindaki deger, alan basina (bilesen elemani anahtarli) burada
// tutulur: duzenleme sirasinda GECERLI ara degerler (orn. "150" yazilirken
// "15", ya da alan bosaltilinca "Otomatik") canli uygulanir, ama sonuc
// gecersizse donulecek yer bu ara degerler degil, duzenleme BASINDAKI
// degerdir (kullanici: "aralik disi deger girince hic degismemeli").
const editStartValues = new WeakMap<EventTarget, string>();

function onBoundInput(host: FillCardHost, edited: "min" | "max", event: Event): void {
  const target = event.target as HTMLInputElement;
  if (!editStartValues.has(target)) {
    editStartValues.set(target, edited === "min" ? host.gradientMin : host.gradientMax);
  }
  const sanitized = sanitizeNumericInput(
    target.value,
    edited === "min" ? host.allowNegativeMin() : host.allowNegativeMax(),
  );
  if (target.value !== sanitized) target.value = sanitized;
  const check = host.checkGradientBound(edited, sanitized);
  setBoundError(host, edited, check.message);
  if (!check.valid) return;
  setBound(host, edited, sanitized);
  host.scheduleApplyStyle();
}

// Enter'a basinca ya da alandan cikinca gecersiz/tamamlanmamis bir deger
// (orn. aralik disi sayi ya da tek basina "-") alanda asili KALMAZ -- alan
// VE harita duzenleme basindaki son gecerli degere doner (kullanici karari:
// "son gecerli degere don").
// ESKIDEN tamamlanmamis deger "Otomatik"e (bos) sifirlaniyordu; state'e hic
// yazilmadigi icin artik buna gerek yok (Number("-") = NaN'in
// computeMinMax() araciligiyla haritaya sizmasi da boylece imkansiz).
function commitBound(host: FillCardHost, edited: "min" | "max", event: Event): void {
  const target = event.target as HTMLInputElement;
  const start = editStartValues.get(target);
  editStartValues.delete(target);
  setBoundError(host, edited, "");
  if (host.checkGradientBound(edited, target.value).valid) return;
  const current = edited === "min" ? host.gradientMin : host.gradientMax;
  const restored = start ?? current;
  if (target.value !== restored) target.value = restored;
  if (current !== restored) {
    setBound(host, edited, restored);
    host.scheduleApplyStyle();
  }
}

function setBound(host: FillCardHost, edited: "min" | "max", value: string): void {
  if (edited === "min") host.gradientMin = value;
  else host.gradientMax = value;
}

function setBoundError(host: FillCardHost, edited: "min" | "max", message: string): void {
  if (edited === "min") host.gradientMinError = message;
  else host.gradientMaxError = message;
}

const onBoundKeydown = (host: FillCardHost, edited: "min" | "max", event: KeyboardEvent): void => {
  if (event.key === "Enter") commitBound(host, edited, event);
};

// Sadece Sürekli (Gradient): min/max alanlari. Bos birakilirsa (placeholder
// "Otomatik") LayerManager.getColumnRange() ile veri araligindan otomatik
// hesaplanir -- tucbs-react'teki "min===max===v her zaman" bug'i BURADA
// YOK (bkz. project_ucbp_api_styleeditor_arastirma memory).
// Kesikli (Bin) modunda Min/Max artik KULLANICIYA GORUNMEZ -- araligi
// HER ZAMAN veriden otomatik hesaplanir (bkz _onDataColumnChange'in
// getColumnRange() cagrisi, _gradientMin/_gradientMax'i BURADAN
// BAGIMSIZ olarak hala icsel/gorunmez sekilde doldurmaya devam eder --
// hem _buildFillStyle()'in bin dali hem de Bin Lejant karti bu degeri
// kullanir). SADECE bu alanlar/kullanicinin elle deger girebildigi UI,
// Sadece Gradient icin kalir (kullanici bildirimi: "Bin'de Min/Max
// alanlarini ve baglantilarini tamamen kaldir").
function renderMinMaxFields(host: FillCardHost) {
  return host.colorMode === "gradient"
    ? html`
        <div style="display:flex; flex-direction:column; gap:0.75rem;">
          <div>
            <span class="field-label">Min</span>
            <cds-text-input
              size="sm"
              label="Min"
              hide-label
              placeholder="Otomatik"
              .value=${host.gradientMin}
              .invalid=${host.gradientMinError !== ""}
              .invalidText=${host.gradientMinError}
              @input=${(event: Event) => onBoundInput(host, "min", event)}
              @keydown=${(event: KeyboardEvent) => onBoundKeydown(host, "min", event)}
              @focusout=${(event: Event) => commitBound(host, "min", event)}
            ></cds-text-input>
          </div>
          <div>
            <span class="field-label">Max</span>
            <cds-text-input
              size="sm"
              label="Max"
              hide-label
              placeholder="Otomatik"
              .value=${host.gradientMax}
              .invalid=${host.gradientMaxError !== ""}
              .invalidText=${host.gradientMaxError}
              @input=${(event: Event) => onBoundInput(host, "max", event)}
              @keydown=${(event: KeyboardEvent) => onBoundKeydown(host, "max", event)}
              @focusout=${(event: Event) => commitBound(host, "max", event)}
            ></cds-text-input>
          </div>
        </div>
      `
    : "";
}

// Bin Sayisi alaninin isleyicileri (gercek hatalar plani H6.3). Gecerli
// deger: 1-9 arasi tam sayi. Ust sinir 9 -- ColorBrewer'in sequential
// paletlerdeki pratik ust siniriyla VE Mersey (1990)'nin choropleth
// haritalar icin onerdigi 5-9 sinif araliginin UST UCUYLA birebir
// ortusuyor (bkz kullanici bildirimi, kaynaklar). Lejant'in kendi 10-satir
// scroll esiginin ALTINDA kaldigi icin Kesikli (Bin) Lejant'i artik HICBIR
// ZAMAN scroll'a dusmez.
const isValidBinCount = (value: string): boolean => /^[1-9]$/.test(value);

// Yazarken: rakam disi karakterler ve bastaki sifirlar aninda temizlenir;
// sonuc gecerliyse (tek haneli 1-9) state'e yazilip ANINDA uygulanir,
// degilse (0, bos, 10+) state'e yazilmaz -- harita son gecerli degerde
// kalir, Carbon da min/max disi degeri kendiliginden kirmizi cerceveyle
// isaretler.
// ESKIDEN _binCount yazarken HIC guncellenmiyordu (Genislik'teki ile ayni
// sebepten): Carbon'un type="text" "set value()" metodu her tus vurusunda
// deger'i yeniden formatlayip kullanicinin yazdigini bozabilir. Gecerli
// deger artik tek haneli bir tam sayi oldugundan yeniden formatlama onu
// DEGISTIRMEZ; bu kaygi Bin icin ortadan kalkti (kullanici bildirimi:
// "Bin sayısını elle değiştirince algılamıyor").
// Duzenleme basindaki deger Min/Max'teki AYNI editStartValues'ta tutulur
// (bkz yukarisi): gecersiz sonuc duzenleme sirasinda canli uygulanan
// gecerli ara degere (orn. "12" yazilirken "1") degil, duzenleme BASINDAKI
// degere doner.
function onBinCountInput(host: FillCardHost, event: Event): void {
  const field = event.currentTarget as HTMLInputElement;
  if (!editStartValues.has(field)) editStartValues.set(field, host.binCount);
  const raw = field.value;
  const digitsOnly = raw.replace(/\D/g, "").replace(/^0+(?=\d)/, "");
  if (raw !== digitsOnly) field.value = digitsOnly;
  if (isValidBinCount(digitsOnly) && digitsOnly !== host.binCount) {
    host.binCount = digitsOnly;
    host.scheduleApplyStyle();
  }
}

// Increment/decrement butonlari (ve ok tuslari) native "input" event'i
// tetiklemiyor, sadece direction alani dolu bu custom event'i tetikliyor.
// Carbon alandan cikarken (blur) de yon bilgisiyle bu olayi gonderiyor;
// orada yazilmis gecersiz deger (orn. 12) gelebildigi icin burada da
// yalniz gecerli deger uygulanir.
function onBinCountStep(host: FillCardHost, event: CustomEvent<{ value: string | number; direction?: string }>): void {
  if (!event.detail.direction) return;
  const value = String(Math.round(Number(event.detail.value)));
  if (isValidBinCount(value) && value !== host.binCount) {
    host.binCount = value;
    host.scheduleApplyStyle();
  }
}

// Enter'a basinca ya da alandan cikinca gecersiz deger alanda asili
// KALMAZ -- alan VE harita duzenleme basindaki degere doner (kullanici
// karari: "önceki değere dön").
// ESKIDEN odaktan cikista 9'dan buyuk deger 9'a kenetleniyor, gecersiz
// deger DEFAULT_BIN_COUNT'a donuyordu; Enter hicbir sey yapmiyordu.
function commitBinCount(host: FillCardHost, event: Event): void {
  const field = event.currentTarget as HTMLInputElement;
  const start = editStartValues.get(field);
  editStartValues.delete(field);
  if (isValidBinCount(field.value)) return;
  const restored = start ?? host.binCount;
  field.value = restored;
  if (host.binCount !== restored) {
    host.binCount = restored;
    host.scheduleApplyStyle();
  }
}

function renderBinCountField(host: FillCardHost) {
  return host.colorMode === "bin"
    ? html`
        <div>
          <span class="field-label">Bin Sayısı</span>
          <cds-number-input
            size="sm"
            type="text"
            locale="en"
            label="Bin Sayısı"
            hide-label
            min="1"
            max="9"
            step="1"
            .value=${host.binCount}
            @input=${(event: Event) => onBinCountInput(host, event)}
            @cds-number-input=${(event: CustomEvent<{ value: string | number; direction?: string }>) =>
              onBinCountStep(host, event)}
            @keydown=${(event: KeyboardEvent) => {
              if (event.key === "Enter") commitBinCount(host, event);
            }}
            @focusout=${(event: Event) => commitBinCount(host, event)}
          ></cds-number-input>
        </div>
      `
    : "";
}

  // binCountField ile ayni sebepten (bkz. yukarisi) ayri bir degisken.
function renderEnumFields(host: FillCardHost) {
  return host.colorMode === "enum"
    ? html`
        <div>
          <span class="field-label">Kategori Sırası</span>
          <cds-dropdown
            size="sm"
            label="Seçiniz"
            .value=${host.categorySort}
            @cds-dropdown-selected=${(
              event: CustomEvent<{ item: { value: string } }>,
            ) => {
              host.categorySort = event.detail.item.value;
              host.categoryValues = host.sortCategoryValues(host.categoryValues);
            }}
          >
            ${CATEGORY_SORT_OPTIONS.map(
              (option) =>
                html`<cds-dropdown-item value=${option.value}>${option.label}</cds-dropdown-item>`,
            )}
          </cds-dropdown>
        </div>

        <div>
          <cds-checkbox
            .checked=${host.paletteReversed}
            label-text="Paleti ters çevir"
            @cds-checkbox-changed=${(event: CustomEvent<{ checked?: boolean }>) => {
              host.paletteReversed = event.detail?.checked ?? !host.paletteReversed;
              host.categoryColors = host.autoFillCategoryColors(host.categoryValues, {});
              host.scheduleApplyStyle();
            }}
          ></cds-checkbox>
        </div>
      `
    : "";
}

  // binCountField/enumFields ile ayni sebepten (bkz. yukarisi) ayri degiskenler.
function renderSolidSwatchField(host: FillCardHost) {
  return host.colorMode === "solid"
    ? html`
        <div>
          <span class="field-label">Renk Paleti</span>
          <span class="color-swatch" style="background:${host.fillColor}">
            <input
              type="color"
              .value=${host.fillColor}
              aria-label="Dolgu rengi"
              @input=${(event: Event) => {
                host.fillColor = (event.target as HTMLInputElement).value;
                host.scheduleApplyStyle();
              }}
            />
          </span>
        </div>
      `
    : "";
}

  // "Kapali" modunda dolgu hic uygulanmadigi icin opaklik da anlamsiz
  // kaliyor; bu yuzden Opaklik satiri da gizleniyor.
function renderOpacityField(host: FillCardHost) {
  return host.colorMode === "off"
    ? ""
    : html`
        <div style="margin-top: 8px">
          <span class="field-label">Opaklık (${host.fillOpacity}%)</span>
          <input
            type="range"
            class="opacity-slider"
            min="0"
            max="100"
            step="1"
            .value=${String(host.fillOpacity)}
            style="--fill: ${host.fillOpacity}%"
            @input=${(event: Event) => {
              const input = event.target as HTMLInputElement;
              const value = Number(input.value);
              host.updateOpacitySlider(input, value);
              host.setFillOpacity(value);
            }}
          />
        </div>
      `;
}

function renderColorModeField(host: FillCardHost) {
  return host.isFixedSolidLayer
    ? ""
    : html`
        <div>
          <span class="field-label">Renk Modu</span>
          <cds-dropdown
            size="sm"
            label="Seçiniz"
            .value=${host.colorMode}
            @cds-dropdown-selected=${(
              event: CustomEvent<{ item: { value: string } }>,
            ) => {
              host.colorMode = event.detail.item.value;
              // Onceki secim yeni modun sutun listesinde (orn.
              // Enum'dan Gradient'e gecince artik sayisal olmayan
              // bir sutun) YOKSA sifirlanir -- aksi halde dropdown
              // gecersiz/hayalet bir deger gosterirdi.
              const options =
                host.colorMode === "gradient" || host.colorMode === "bin"
                  ? host.numericDataColumns
                  : host.dataColumns;
              if (host.dataColumn && !options.includes(host.dataColumn)) {
                host.dataColumn = "";
              }
              if (host.dataColumn) host.onDataColumnChange(host.dataColumn);
              else host.scheduleApplyStyle();
            }}
          >
            ${FILL_COLOR_MODES.map(
              (option) =>
                html`<cds-dropdown-item value=${option.value}>${option.label}</cds-dropdown-item>`,
            )}
          </cds-dropdown>
        </div>
      `;
}

function renderDataFields(host: FillCardHost) {
  // Gradient/Bin SADECE sayisal sutunlarla calisir (min/max anlamsizlasir);
  // Enum ise herhangi bir sutunu (string dahil) kategori olarak kullanabilir.
  // "Veri Sutunu" dropdown'unun secenekleri buna gore degisir.
  const columnOptions =
    host.colorMode === "gradient" || host.colorMode === "bin"
      ? host.numericDataColumns
      : host.dataColumns;

  return host.colorMode === "gradient" || host.colorMode === "bin" || host.colorMode === "enum"
    ? html`
        <div>
          <span class="field-label">Veri Sütunu</span>
          <cds-dropdown
            size="sm"
            label="Seçiniz"
            .value=${host.dataColumn}
            @cds-dropdown-selected=${(
              event: CustomEvent<{ item: { value: string } }>,
            ) => {
              host.onDataColumnChange(event.detail.item.value);
            }}
          >
            ${columnOptions.map(
              (name) => html`<cds-dropdown-item value=${name}>${name}</cds-dropdown-item>`,
            )}
          </cds-dropdown>
        </div>

        <div>
          <span class="field-label">Renk Paleti</span>
          <div class="palette-dropdown-wrap">
            <cds-dropdown
              size="sm"
              label="Seçiniz"
              .value=${host.gradientPalette}
              @cds-dropdown-selected=${(
                event: CustomEvent<{ item: { value: string } }>,
              ) => {
                host.gradientPalette = event.detail.item.value;
                if (host.colorMode === "enum" && host.categoryValues.length > 0) {
                  host.categoryColors = host.autoFillCategoryColors(
                    host.categoryValues,
                    {},
                  );
                }
                host.scheduleApplyStyle();
              }}
            >
              ${GRADIENT_PALETTES.map(
                (palette) => html`
                  <cds-dropdown-item value=${palette.value} title=${palette.label}>
                    <span
                      class="palette-swatch"
                      aria-label=${palette.label}
                      style="background: linear-gradient(to right, ${palette.colors.join(", ")})"
                    ></span>
                  </cds-dropdown-item>
                `,
              )}
            </cds-dropdown>
            <span
              class="palette-selected-preview"
              style="background: linear-gradient(to right, ${(
                GRADIENT_PALETTES.find((p) => p.value === host.gradientPalette) ?? GRADIENT_PALETTES[0]!
              ).colors.join(", ")})"
            ></span>
          </div>
        </div>

        ${renderMinMaxFields(host)}
        ${renderBinCountField(host)}
        ${renderEnumFields(host)}
      `
    : renderSolidSwatchField(host);
}

/**
 * Stil editörünün "Dolgu" kartını render eder.
 * @param host - Kartın okuyup yazdığı editör state'i ve metotları.
 * @returns Kartın Lit template'i.
 */
export function renderFillCard(host: FillCardHost) {
  return html`
    <div class="card">
      <span class="card-title">Dolgu</span>

      ${renderColorModeField(host)}

      ${renderDataFields(host)}

      ${renderOpacityField(host)}
    </div>
  `;
}
