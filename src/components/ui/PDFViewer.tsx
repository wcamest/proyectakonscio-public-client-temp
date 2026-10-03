"use client";

import type { CSSProperties } from "react";
import dynamic from "next/dynamic";

export type PDFViewerProps = {
  src: string | File;
  fileName?: string;
  initialPage?: number;
  height?: CSSProperties["height"];
  className?: string;
};

const PDFViewerClient = dynamic<PDFViewerProps>(
  () => import("./PDFViewerClient"),
  {
    ssr: false,
    loading: () => (
      <div className="flex size-full overflow-hidden items-center justify-center bg-neutral-800 text-white">
        <div className="text-center">
          <i
            className="bi bi-file-earmark-pdf mb-3 block text-3xl"
            aria-hidden="true"
          />

          <span className="text-sm">Preparando visor PDF…</span>
        </div>
      </div>
    ),
  }
);

export default function PDFViewer(props: PDFViewerProps) {
  return <PDFViewerClient {...props} />;
}