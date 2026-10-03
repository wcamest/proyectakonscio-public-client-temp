"use client";

import { useEffect } from "react";
import { reportPublicClientError } from "./reporter";

export function GlobalPublicClientErrorCapture() {
  useEffect(() => {
    const onError = (event: ErrorEvent): void => {
      if (!(event.error instanceof Error)) return;
      void reportPublicClientError(event.error, {
        category: "unhandled_error",
        boundary: "window.error",
        operation: "browser.window.error",
        metadata: { phase: "runtime", action: "dispatch", kind: "uncaught_error" },
      });
    };
    const onUnhandledRejection = (event: PromiseRejectionEvent): void => {
      if (!(event.reason instanceof Error)) return;
      void reportPublicClientError(event.reason, {
        category: "unhandled_rejection",
        boundary: "window.unhandledrejection",
        operation: "browser.promise.rejection",
        metadata: { phase: "runtime", action: "dispatch", kind: "unhandled_rejection" },
      });
    };
    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onUnhandledRejection);
    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onUnhandledRejection);
    };
  }, []);
  return null;
}
