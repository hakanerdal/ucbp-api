# HTML ile kurulum

UCBP API bir zip dosyasıyla gelir.

## 1. Zip'i indir

```text
https://github.com/hakanerdal/ucbp-api/releases/download/v0.2.3/tucbs-html-0.2.3.zip
```

Zip'i aç. İçindeki klasörün adı `html`.

## 2. Anahtarı yaz

`html/main.js` içinde `API_ANAHTARI` yerine kendi API anahtarını yaz.

```js
import { configureTucbs } from "@tucbs/core";

configureTucbs({
  apiBase: "https://ucbp-api.tucbs.gov.tr/ucbp-api",
  apiKey: "API_ANAHTARI",
  proxyBase: "https://ucbp-api.tucbs.gov.tr/proxyservice/proxyservice/getByUrl?url=",
});

await import("@tucbs/components");
```

## 3. Çalıştır

`html` klasöründe:

```powershell
npx --yes serve -l 5173 .
```

Tarayıcıda açılan adreste harita ve sağda araç çubuğu görünür.
