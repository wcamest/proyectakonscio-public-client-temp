"use client";

import Alert from "@/components/ui/Alert";
import { DynamicPublicForm } from "@/components/ui/DynamicPublicForm";
import { useToast } from "@/providers/ToastProvider";
import {
  reportPublicApiResponseFailure,
  reportPublicFetchFailure,
  reportPublicMalformedResponse,
} from "@/features/observability/client/reporter";
import type {
  PublicFormDefinition,
  PublicFormSubmissionAccepted,
  PublicFormSubmissionPayload,
} from "@/types/formsPublic";

export type PublicServerFormProps = Readonly<{
  definition: PublicFormDefinition | null;
  className?: string;
  submitLabel?: string;
  submittingLabel?: string;
  successTitle?: string;
  successMessage?: string;
  unavailableTitle?: string;
  unavailableMessage?: string;
}>;

type Feedback = Readonly<{
  tone: "success" | "error";
  title: string;
  message: string;
}>;

class HandledSubmissionError extends Error {
  public constructor() {
    super("Public Form submission failure already exposed as safe UI feedback");
    this.name = "HandledSubmissionError";
  }
}

/**
 * Interactive half of a public server-rendered Form.
 *
 * The definition MUST be loaded by a Server Component (page/layout) and passed
 * as a serializable prop. This component performs only the interactive POST and
 * toast feedback, so fields are present in the initial server-rendered HTML.
 */
export function PublicServerForm({
  definition,
  className,
  submitLabel = "Regístrate",
  submittingLabel = "Enviando...",
  successTitle = "Registro enviado",
  successMessage = "Recibimos tus datos correctamente.",
  unavailableTitle = "Formulario no disponible",
  unavailableMessage = "Este formulario no está disponible para recibir registros en este momento.",
}: PublicServerFormProps) {
  const { showToast } = useToast();

  if (definition === null) {
    return (
      <Alert tone="error" title={unavailableTitle} className="w-full max-w-xl">
        {unavailableMessage}
      </Alert>
    );
  }

  const handleSubmit = async (
    payload: PublicFormSubmissionPayload,
  ): Promise<void> => {
    try {
      const path = `/api/public/forms/${encodeURIComponent(definition.formId)}/submissions`;
      const init: RequestInit = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      };
      let response: Response;
      try {
        response = await fetch(path, init);
      } catch (error) {
        reportPublicFetchFailure(path, init, error);
        throw error;
      }

      if (!response.ok) {
        reportPublicApiResponseFailure(path, response, "POST");
        showToast(feedbackForStatus(response.status));
        throw new HandledSubmissionError();
      }

      let body: unknown;
      try {
        body = await response.json();
      } catch (error) {
        reportPublicMalformedResponse(path, response, error, "POST");
        showToast({
          tone: "error",
          title: "No se pudo confirmar el envío",
          message: "El servidor respondió de una forma inesperada. Inténtalo nuevamente.",
        });
        throw new HandledSubmissionError();
      }

      if (!isSubmissionAccepted(body)) {
        reportPublicMalformedResponse(path, response, new Error("Public form submission response contract mismatch"), "POST");
        showToast({
          tone: "error",
          title: "No se pudo confirmar el envío",
          message:
            "El servidor respondió de una forma inesperada. Inténtalo nuevamente.",
        });
        throw new HandledSubmissionError();
      }

      showToast({
        tone: "success",
        title: successTitle,
        message: successMessage,
      });
    } catch (error) {
      if (error instanceof HandledSubmissionError) {
        throw error;
      }

      showToast({
        tone: "error",
        title: "No se pudo enviar",
        message:
          "No pudimos comunicarnos con el servidor. Revisa tu conexión e inténtalo nuevamente.",
      });
      throw new HandledSubmissionError();
    }
  };

  return (
    <DynamicPublicForm
      definition={definition}
      className={className}
      submitLabel={submitLabel}
      submittingLabel={submittingLabel}
      resetOnSuccess
      showSubmitError={false}
      onSubmit={handleSubmit}
    />
  );
}

function feedbackForStatus(status: number): Feedback {
  switch (status) {
    case 400:
      return {
        tone: "error",
        title: "Revisa los datos",
        message: "Algunos campos no cumplen las reglas del formulario.",
      };
    case 404:
      return {
        tone: "error",
        title: "Formulario no disponible",
        message: "Este formulario ya no está disponible para recibir registros.",
      };
    case 409:
      return {
        tone: "error",
        title: "No se pudo completar",
        message:
          "El formulario cambió mientras lo estabas enviando. Recarga la página e inténtalo nuevamente.",
      };
    case 413:
      return {
        tone: "error",
        title: "Contenido demasiado grande",
        message: "Reduce el contenido enviado e inténtalo nuevamente.",
      };
    case 429:
      return {
        tone: "error",
        title: "Demasiados intentos",
        message: "Espera un momento antes de volver a enviar el formulario.",
      };
    default:
      return {
        tone: "error",
        title: "No se pudo enviar",
        message:
          "Ocurrió un problema al procesar el formulario. Inténtalo nuevamente.",
      };
  }
}

function isSubmissionAccepted(
  value: unknown,
): value is PublicFormSubmissionAccepted {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const candidate = value as Partial<PublicFormSubmissionAccepted>;

  return (
    typeof candidate.submissionId === "string" && candidate.status === "new"
  );
}
