# Changelog

Bu dosyadaki kayıtlar [Keep a Changelog](https://keepachangelog.com/tr/1.1.0/)
biçimine uygundur; sürüm numaralandırması [SemVer](https://semver.org/lang/tr/)
kurallarına göredir.

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
