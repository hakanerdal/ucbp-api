# UCBP API

Cesium tabanlı 3B/2B harita, katman yönetimi, çizim/analiz araçları ve UI
panellerini web bileşeni (Custom Elements) olarak sunan kütüphane.

İki paketten oluşur:

| Paket | Ne sağlar | Bağımlılık |
|---|---|---|
| [`@tucbs/core`](./core) | Harita motoru, katman/çizim/analiz yönetimi (`Map`, `configureTucbs`, katman tipleri) | — |
| [`@tucbs/components`](./components) | `<tucbs-map>`, `<tucbs-app>`, araç çubuğu, paneller vb. hazır UI bileşenleri | `@tucbs/core` |

`@tucbs/components` çalışmak için `@tucbs/core`'a ihtiyaç duyar; `@tucbs/core` ise
tek başına kullanılabilir.

## Kurulum

- **React JavaScript:** [`react-js.md`](./react-js.md)
- **React TypeScript:** [`react-ts.md`](./react-ts.md)

## Dokümantasyon

Kurulum, hızlı başlangıç, API key kullanımı, örnek kodlar ve bileşen listesi için:

- **Yardım dokümanı:** https://tucbs.gov.tr/wp-content/tucbs/api/index.html

## Sürümler

Sürüm geçmişi: [`CHANGELOG.md`](./CHANGELOG.md).
