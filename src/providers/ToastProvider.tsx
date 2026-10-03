"use client";

import Alert, { type AlertTone } from "@/components/ui/Alert";
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type ToastInput = {
  id?: string;
  title?: ReactNode;
  message?: ReactNode;
  tone?: AlertTone;
  duration?: number;
  dismissible?: boolean;
};

type ToastData = Required<Pick<ToastInput, "id" | "tone" | "duration" | "dismissible">> &
  Pick<ToastInput, "title" | "message">;

type ToastContextValue = {
  showToast: (toast: ToastInput) => string;
  dismissToast: (toastId: string) => void;
  clearToasts: () => void;
};

type Props = {
  children: ReactNode;
  defaultDuration?: number;
  maxToasts?: number;
};

const ToastContext = createContext<ToastContextValue | null>(null);

let toastSequence = 0;

const createToastId = () => {
  toastSequence += 1;
  return globalThis.crypto?.randomUUID?.() ?? `toast-${Date.now()}-${toastSequence}`;
};

const ToastItem = ({
  toast,
  onDismiss,
}: {
  toast: ToastData;
  onDismiss: (toastId: string) => void;
}) => {
  useEffect(() => {
    if (toast.duration <= 0) return;

    const timeoutId = window.setTimeout(() => {
      onDismiss(toast.id);
    }, toast.duration);

    return () => window.clearTimeout(timeoutId);
  }, [onDismiss, toast.duration, toast.id]);

  return (
    <div className="pointer-events-auto relative w-full">
      <Alert
        tone={toast.tone}
        title={toast.title}
        className={toast.dismissible ? "pr-11 shadow-lg" : "shadow-lg"}
        aria-atomic="true"
      >
        {toast.message}
      </Alert>

      {toast.dismissible ? (
        <button
          type="button"
          aria-label="Cerrar notificación"
          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded text-current/70 transition hover:bg-black/5 hover:text-current focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
          onClick={() => onDismiss(toast.id)}
        >
          <i aria-hidden="true" className="bi bi-x-lg" />
        </button>
      ) : null}
    </div>
  );
};

const ToastProvider = ({
  children,
  defaultDuration = 5000,
  maxToasts = 4,
}: Props) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const dismissToast = useCallback((toastId: string) => {
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== toastId),
    );
  }, []);

  const clearToasts = useCallback(() => {
    setToasts([]);
  }, []);

  const showToast = useCallback(
    (toast: ToastInput) => {
      const id = toast.id ?? createToastId();
      const nextToast: ToastData = {
        id,
        title: toast.title,
        message: toast.message,
        tone: toast.tone ?? "info",
        duration: toast.duration ?? defaultDuration,
        dismissible: toast.dismissible ?? true,
      };

      setToasts((currentToasts) =>
        [
          nextToast,
          ...currentToasts.filter((currentToast) => currentToast.id !== id),
        ].slice(0, Math.max(1, maxToasts)),
      );

      return id;
    },
    [defaultDuration, maxToasts],
  );

  const value = useMemo<ToastContextValue>(
    () => ({
      showToast,
      dismissToast,
      clearToasts,
    }),
    [clearToasts, dismissToast, showToast],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}

      <div
        className="pointer-events-none fixed bottom-4 right-4 z-9999 flex w-[min(24rem,calc(100vw-2rem))] flex-col-reverse gap-2"
        aria-label="Notificaciones"
        aria-live="polite"
        aria-relevant="additions"
      >
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onDismiss={dismissToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within ToastProvider.");
  }

  return context;
};

export default ToastProvider;
