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