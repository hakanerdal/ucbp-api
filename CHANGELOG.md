# Changelog

Bu dosyadaki kayıtlar [Keep a Changelog](https://keepachangelog.com/tr/1.1.0/)
biçimine uygundur; sürüm numaralandırması [SemVer](https://semver.org/lang/tr/)
kurallarına göredir.

## [0.2.2] — 2026-10-16

### Düzeltilenler

- **@tucbs/components** — React etiket bildirimi paket girişine bağlandı. `<tucbs-map>` ve diğer tucbs etiketleri `import "@tucbs/components"` ile tanınır. Ayrı `tucbs-elements.d.ts` gerekmez.

## [0.2.1] — 2026-10-16

### Düzeltilenler

- **@tucbs/components** — React TypeScript projesinde `<tucbs-map>` ve diğer tucbs etiketleri paket kurulunca tanınır. Ayrı bildirim dosyası gerekmez.

## [0.2.0] — 2026-10-15

`npm install` ile kuran bir projede ek Vite eklentisi ve elle bağımlılık gerekmez.

### Düzeltilenler

- **@tucbs/core** — `shpjs`, `papaparse`, `ol` ve `proj4` artık paketin normal bağımlılığı. Shapefile, CSV ve WFS ekleme, tüketici bunları ayrıca kurmasa da çalışır.
- **@tucbs/components** — `lit` paketin içine gömülür. Araç çubuğu düğmelerinin boş gelmesine yol açan çift kopya oluşmaz.
- Cesium worker adresi ve `widgets.css`, kullanıcı vermediyse kütüphane tarafından eklenir. Adres kurulu Cesium sürümünün CDN klasörüdür.

### Yayın

- Repoda `src/` yok. Yalnız derlenmiş `dist/` durur.

## [0.1.1] — 2026-10-14

Hata düzeltmesi (patch).

### Düzeltilenler

- **@tucbs/components** — `lit` artık paket içine gömülüyor (external değil).
  Önceki sürümde bare `lit` dışarıda kalıp `lit/directives/...` alt yolları
  bundle'a gömülünce, tüketici uygulamada (Vite/React) iki ayrı `lit-html`
  kopyası oluşuyordu. Sonuç: araç çubuğu butonları `currentDirective._$initialize
  is not a function` hatasıyla boş render ediliyordu. Artık `lit` tek kopya
  hâlinde paketleniyor.

### Bağımlılık / eşleme

- **@tucbs/components** artık `lit`'i `peerDependencies` olarak istemez
  (pakete gömülü). Kurulumda ayrıca `lit` yüklenmesine gerek yoktur.
- **@tucbs/core** — `measureGround`, `snapScaleForDisplay` gibi yeni export'lar
  eklendi; components 0.1.1 bu export'lara bağımlı olduğundan iki paket birlikte
  yükseltildi. `@tucbs/components` 0.1.1, `@tucbs/core` `^0.1.1` ister.

## [0.1.0] — 2026-10-14

İlk sürüm.

### Eklenenler

- **@tucbs/core** — Cesium tabanlı harita motoru ve çekirdek API:
  - `Map` sınıfı; katman yönetimi (`layerManager`), etkileşim yönetimi
    (`interactionManager`), çizim yönetimi (`drawingManager`)
  - `configureTucbs()` ile `apiBase` / `proxyBase` / `apiKey` genel ayarı
  - Katman tipleri: GeoJSON, WMS, WFS, WCS, WMTS, yerel dosya (Shapefile/CSV vb.)
  - Tampon / kesişim analizi; dışa aktarma; API key doğrulama (`/auth/validate`)

- **@tucbs/components** — hazır web bileşenleri (Custom Elements):
  - `tucbs-app`, `tucbs-map`, `tucbs-map-preview`
  - Araçlar: `tucbs-toolbar`, `tucbs-zoom-tool`, `tucbs-goto-coordinate`,
    `tucbs-draw-tool`, `tucbs-measure-tool`, `tucbs-delete-tool`,
    `tucbs-analysis-tool`
  - Paneller: `tucbs-layer-list`, `tucbs-file-upload`, `tucbs-service-upload`,
    `tucbs-style-editor`, `tucbs-legend-panel`, `tucbs-identify-panel`,
    `tucbs-info-bar`
  - Dışa aktarma / yazdırma: `tucbs-map-export`, `tucbs-layer-export`,
    `tucbs-print-tool`
  - Ayarlar: `tucbs-settings-tool`, `tucbs-basemap-picker`, `tucbs-quality-bar`

- Her iki paket ESM modülüdür; `lit` tabanlıdır, ek framework
  (React/Vue/Angular) gerekmez.

### Bilinen kısıtlar

- Cesium ve PapaParse kütüphaneleri paket içine gömülmez; `jsdelivr` CDN'inden
  yüklenir.
