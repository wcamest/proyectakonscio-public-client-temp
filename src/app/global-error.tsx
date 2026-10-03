"use client";

import { useEffect } from "react";
import { reportPublicClientError } from "@/features/observability/client/reporter";

export default function GlobalError({ error, reset }: Readonly<{ error: Error & { digest?: string }; reset: () => void }>) {
  useEffect(() => {
    void reportPublicClientError(error, {
      category: "render",
      boundary: "next.global-error",
      operation: "browser.render.global_error",
      metadata: { phase: "render", action: "boundary", kind: "next_global_error_boundary" },
    });
  }, [error]);

  return (
    <html lang="es">
      <body>
        <main style={{ minHeight: "60vh", display: "grid", placeItems: "center", padding: "2rem", textAlign: "center" }}>
          <div>
            <h1>Ocurrió un problema inesperado</h1>
            <p>Intenta recargar esta página.</p>
            <button type="button" onClick={reset}>Intentar nuevamente</button>
          </div>
        </main>
      </body>
    </html>
  );
}
