import Button from "@/components/ui/Button";
import Link from "next/link";

type Props = {
  onAccept: () => void;
  onReject: () => void;
};

const CookiesBanner = (props: Props) => {
  const { onAccept, onReject } = props;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 p-4 sm:p-6"
      role="region"
      aria-label="Preferencias de cookies"
      aria-live="polite"
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 rounded border border-neutral-200 bg-white p-5 shadow-2xl sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <i
            className="bi bi-cookie mt-0.5 text-2xl text-amber-600"
            aria-hidden="true"
          ></i>
          <div className="flex flex-col gap-1">
            <p className="font-semibold text-neutral-900">
              Tu privacidad es importante
            </p>
            <p className="max-w-3xl text-sm leading-relaxed text-neutral-600">
              Usamos cookies necesarias para el funcionamiento del sitio.
              El contenido externo opcional, como los vídeos de YouTube, solo
              se carga si lo aceptas.{" "}
              <Link
                href="/politica-de-cookies"
                className="font-semibold text-sky-700 underline underline-offset-2 hover:text-sky-900"
              >
                Consulta la política de cookies
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="flex shrink-0 flex-col-reverse gap-2 sm:flex-row">
          <Button color="neutral" onClick={onReject}>
            Rechazar opcionales
          </Button>
          <Button color="blue" onClick={onAccept}>
            Aceptar opcionales
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookiesBanner;
