"use client";

import { useEffect } from "react";
import Button from "@/components/ui/Button";
import { reportPublicClientError } from "@/features/observability/client/reporter";

export default function ErrorPage({ error, reset }: Readonly<{ error: Error & { digest?: string }; reset: () => void }>) {
  useEffect(() => {
    void reportPublicClientError(error, {
      category: "render",
      boundary: "next.error",
      operation: "browser.render.error",
      metadata: { phase: "render", action: "boundary", kind: "next_error_boundary" },
    });
  }, [error]);

  return (
    <main className="mx-auto flex min-h-[50vh] max-w-3xl flex-col items-center justify-center gap-5 px-6 text-center">
      <h1 className="text-2xl font-semibold">No pudimos mostrar esta sección</h1>
      <p>Intenta nuevamente. Si el problema continúa, puedes volver a la página principal.</p>
      <Button onClick={reset}>Intentar nuevamente</Button>
    </main>
  );
}
