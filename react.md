# React ile kurulum

Boş bir klasörde React uygulaması kurulur, ardından `@tucbs/core` ve `@tucbs/components` kurulur.

## 1. Uygulamayı kur

Boş bir klasörde:

```powershell
npm create vite@latest . -- --template react-ts
npm install
```

## 2. Paketleri kur

[Buradaki](./README.md) `@tucbs/core` ve `@tucbs/components` paketlerini kur.

`node_modules/cesium` yoksa:

```powershell
npm install cesium
```

## 3. Haritayı bağla

`src/App.tsx` içeriğini değiştir. Anahtarı kodun içine yazma. Proje klasöründe `.env` aç:

```
VITE_TUCBS_API_KEY=API_ANAHTARI
```

```tsx
import "@tucbs/components";
import { configureTucbs } from "@tucbs/core";

configureTucbs({
  apiBase: "https://ucbp-api.tucbs.gov.tr/ucbp-api",
  apiKey: import.meta.env.VITE_TUCBS_API_KEY,
  proxyBase: "https://ucbp-api.tucbs.gov.tr/proxyservice/proxyservice/getByUrl?url=",
});

export default function App() {
  return (
    <>
      <tucbs-map id="map" mode="3D" mapWidth="100%" mapHeight="100vh" />
      <tucbs-toolbar
        mapElementId="map"
        position="right-center"
        tools="zoom,goto-coordinate,draw,measure,delete,analysis,settings,print"
      />
    </>
  );
}
```

TypeScript `tucbs-map` tanımıyorsa `src/tucbs-elements.d.ts` ekle:

```ts
import type { TucbsMap, TucbsToolbar } from "@tucbs/components";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "tucbs-map": React.DetailedHTMLProps<React.HTMLAttributes<TucbsMap>, TucbsMap>;
      "tucbs-toolbar": React.DetailedHTMLProps<React.HTMLAttributes<TucbsToolbar>, TucbsToolbar>;
    }
  }
}
```

## 4. Çalıştır

```powershell
npm run dev
```

Tarayıcıda harita ve sağda araç çubuğu görünür.
