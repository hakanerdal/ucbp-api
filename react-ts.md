# React TypeScript ile kurulum

React uygulaması yoksa önce o kurulur. Ardından `@tucbs/core` ve `@tucbs/components` kurulur.

## 1. Uygulamayı kur

React uygulaması olmayanlar bu adımı yapar. Uygulama varsa 2. adımdan devam edilir.

Boş bir klasörde:

```powershell
npm create vite@latest . -- --template react-ts
npm install
```

## 2. Paketleri kur

Kütüphane GitHub Releases üzerinden dağıtılır; her paket kendi tarball (`.tgz`) dosyasıyla kurulur.

### @tucbs/core

Harita motorunu tek başına kullanacaksanız yalnız `@tucbs/core` yeter:

```powershell
npm install https://github.com/hakanerdal/ucbp-api/releases/download/v0.2.1/tucbs-core-0.2.1.tgz
```

### @tucbs/components

`@tucbs/components`, `@tucbs/core`'a bağımlıdır. Önce core'u, sonra components'i kurun:

```powershell
npm install https://github.com/hakanerdal/ucbp-api/releases/download/v0.2.1/tucbs-components-0.2.1.tgz
```

### Cesium

İki paketi kurduktan sonra `node_modules/cesium` klasörüne bak. Klasör yoksa:

```powershell
npm install cesium
```

## 3. Haritayı bağla

`src/App.tsx` içeriğini değiştir. `API_ANAHTARI` yerine kendi API anahtarını yaz.

```tsx
import "@tucbs/components";
import { configureTucbs } from "@tucbs/core";

configureTucbs({
  apiBase: "https://ucbp-api.tucbs.gov.tr/ucbp-api",
  apiKey: "API_ANAHTARI",
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
