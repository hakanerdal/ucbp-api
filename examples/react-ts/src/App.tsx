import "@tucbs/components";
import { configureTucbs } from "@tucbs/core";

configureTucbs({
  apiBase: "https://ucbp-api.tucbs.gov.tr/ucbp-api",
  apiKey: "c8f4a91e2b7d6035e1a94c6f8d2b0e57a3c91f6e4d8b2a7051c9e3f6a8d4b270",
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