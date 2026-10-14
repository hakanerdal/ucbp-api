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

Kütüphane GitHub Releases üzerinden dağıtılır; her paket kendi tarball
(`.tgz`) dosyasıyla kurulur.

### Yalnız @tucbs/core

Harita motorunu tek başına kullanacaksanız yalnız `@tucbs/core` yeter:

```bash
npm install https://github.com/hakanerdal/ucbp-api/releases/download/v0.1.0/tucbs-core-0.1.0.tgz
```

### @tucbs/components

`@tucbs/components`, `@tucbs/core`'a bağımlıdır — önce core'u, sonra
components'i kurun:

```bash
npm install https://github.com/hakanerdal/ucbp-api/releases/download/v0.1.0/tucbs-core-0.1.0.tgz
npm install https://github.com/hakanerdal/ucbp-api/releases/download/v0.1.0/tucbs-components-0.1.0.tgz
```

Kurulumdan sonraki kullanım (`configureTucbs`, `apiBase`/`apiKey` ayarı, örnek
kodlar) için yardım dokümanına bakın.

## Dokümantasyon

Kurulum, hızlı başlangıç, API key kullanımı, örnek kodlar ve bileşen listesi için:

- **Yardım dokümanı:** https://tucbs.gov.tr/wp-content/tucbs/api/index.html

## Sürümler

Sürüm geçmişi: [`CHANGELOG.md`](./CHANGELOG.md).
