import type { TucbsMap, TucbsToolbar } from "@tucbs/components";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "tucbs-map": React.DetailedHTMLProps<React.HTMLAttributes<TucbsMap>, TucbsMap>;
      "tucbs-toolbar": React.DetailedHTMLProps<React.HTMLAttributes<TucbsToolbar>, TucbsToolbar>;
    }
  }
}