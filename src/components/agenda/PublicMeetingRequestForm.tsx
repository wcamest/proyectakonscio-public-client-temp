"use client";

import { useRef, useState } from "react";

import Button from "@/components/ui/Button";
import Form from "@/components/ui/Form";
import FormField from "@/components/ui/FormField";
import Input from "@/components/ui/Input";
import TextArea from "@/components/ui/TextArea";
import { useToast } from "@/providers/ToastProvider";
import {
  PublicAgendaHttpError,
  requestPublicMeeting,
} from "@/lib/agenda/publicAgenda";
import type {
  PublicAgendaSlot,
  PublicMeetingRequestAccepted,
  PublicMeetingRequestPayload,
} from "@/types/agendaPublic";

type Props = Readonly<{
  slot: PublicAgendaSlot;
  timeZone: string;
  onAccepted: (meeting: PublicMeetingRequestAccepted) => void;
  onAvailabilityInvalidated: () => void;
}>;

type Feedback = Readonly<{
  tone: "error" | "warning";
  title: string;
  message: string;
}>;

type IdempotencyAttempt = Readonly<{
  fingerprint: string;
  key: string;
}>;

const REQUESTER_NAME_MAX = 160;
const REQUESTER_EMAIL_MAX = 320;
const REQUESTER_PHONE_MAX = 64;
const SUBJECT_MAX = 240;
const MESSAGE_MAX = 10_000;

export default function PublicMeetingRequestForm({
  slot,
  timeZone,
  onAccepted,
  onAvailabilityInvalidated,
}: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();
  const attemptRef = useRef<IdempotencyAttempt | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = buildPayload(formData, slot.startAt);
    const fingerprint = JSON.stringify(payload);
    const attempt =
      attemptRef.current?.fingerprint === fingerprint
        ? attemptRef.current
        : {
            fingerprint,
            key: createIdempotencyKey(),
          };

    attemptRef.current = attempt;
    setIsSubmitting(true);

    try {
      const accepted = await requestPublicMeeting({
        idempotencyKey: attempt.key,
        payload,
      });
      onAccepted(accepted);
    } catch (error) {
      const mapped = feedbackForError(error);
      showToast(mapped.feedback);

      if (mapped.invalidateAvailability) {
        attemptRef.current = null;
        onAvailabilityInvalidated();
        return;
      }

      if (mapped.resetIdempotencyKey) {
        attemptRef.current = null;
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const formattedSlot = formatSlot(slot, timeZone);

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded border border-blue-200 bg-blue-50 p-3 text-sm text-blue-950">
        <p className="font-semibold">Horario seleccionado</p>
        <p className="mt-1">{formattedSlot}</p>
        <p className="mt-1 text-xs text-blue-700">Zona horaria: {timeZone}</p>
      </div>

      <Form className="gap-4" onSubmit={handleSubmit}>
        <FormField label="Nombre" htmlFor="agenda-requester-name" required>
          <Input
            id="agenda-requester-name"
            name="requesterName"
            autoComplete="name"
            maxLength={REQUESTER_NAME_MAX}
            required
          />
        </FormField>

        <FormField
          label="Correo electrónico"
          htmlFor="agenda-requester-email"
          required
        >
          <Input
            id="agenda-requester-email"
            name="requesterEmail"
            type="email"
            autoComplete="email"
            maxLength={REQUESTER_EMAIL_MAX}
            required
          />
        </FormField>

        <FormField
          label="Teléfono / WhatsApp / Telegram"
          htmlFor="agenda-requester-phone"
          info="Opcional. Puedes indicar el medio de contacto que prefieras."
        >
          <Input
            id="agenda-requester-phone"
            name="requesterPhone"
            type="tel"
            autoComplete="tel"
            maxLength={REQUESTER_PHONE_MAX}
          />
        </FormField>

        <FormField label="Asunto" htmlFor="agenda-subject" required>
          <Input
            id="agenda-subject"
            name="subject"
            maxLength={SUBJECT_MAX}
            required
          />
        </FormField>

        <FormField label="Observaciones" htmlFor="agenda-message">
          <TextArea
            id="agenda-message"
            name="message"
            maxLength={MESSAGE_MAX}
            rows={4}
          />
        </FormField>

        <Button
          type="submit"
          color="blue"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <i className="bi bi-arrow-repeat animate-spin" aria-hidden="true" />
              Enviando solicitud...
            </>
          ) : (
            "Solicitar reunión"
          )}
        </Button>
      </Form>
    </div>
  );
}

function buildPayload(
  formData: FormData,
  startAt: string,
): PublicMeetingRequestPayload {
  const requesterPhone = readText(formData, "requesterPhone");
  const message = readText(formData, "message");

  return {
    requesterName: readText(formData, "requesterName"),
    requesterEmail: readText(formData, "requesterEmail"),
    requesterPhone: requesterPhone || null,
    subject: readText(formData, "subject"),
    message: message || null,
    startAt,
  };
}

function readText(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function createIdempotencyKey(): string {
  if (typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  return `agenda-${Array.from(bytes, (value) =>
    value.toString(16).padStart(2, "0"),
  ).join("")}`;
}

function feedbackForError(error: unknown): {
  feedback: Feedback;
  invalidateAvailability: boolean;
  resetIdempotencyKey: boolean;
} {
  if (!(error instanceof PublicAgendaHttpError)) {
    return {
      feedback: {
        tone: "error",
        title: "No pudimos enviar la solicitud",
        message:
          "No pudimos comunicarnos con el servidor. Revisa tu conexión e inténtalo nuevamente.",
      },
      invalidateAvailability: false,
      resetIdempotencyKey: false,
    };
  }

  if (
    error.code === "AGENDA_SLOT_UNAVAILABLE" ||
    error.code === "AGENDA_OUTSIDE_AVAILABILITY" ||
    error.code === "AGENDA_BOOKING_TOO_SOON" ||
    error.code === "AGENDA_BOOKING_TOO_FAR" ||
    error.code === "AGENDA_RESOURCE_CONFLICT"
  ) {
    return {
      feedback: {
        tone: "warning",
        title: "El horario cambió",
        message:
          "Ese horario ya no está disponible. Actualizamos la agenda para que puedas escoger otro.",
      },
      invalidateAvailability: true,
      resetIdempotencyKey: true,
    };
  }

  if (
    error.code === "AGENDA_BOOKING_DISABLED" ||
    error.code === "SERVICE_UNAVAILABLE" ||
    error.status === 503
  ) {
    return {
      feedback: {
        tone: "warning",
        title: "Agenda no disponible",
        message:
          "La agenda dejó de aceptar solicitudes temporalmente. Inténtalo más tarde.",
      },
      invalidateAvailability: true,
      resetIdempotencyKey: true,
    };
  }

  if (error.status === 429) {
    const wait =
      error.retryAfterSeconds === null
        ? "Espera un momento antes de volver a intentarlo."
        : `Espera aproximadamente ${formatWait(error.retryAfterSeconds)} antes de volver a intentarlo.`;

    return {
      feedback: {
        tone: "warning",
        title: "Demasiados intentos",
        message: wait,
      },
      invalidateAvailability: false,
      resetIdempotencyKey: false,
    };
  }

  if (error.status === 400) {
    return {
      feedback: {
        tone: "error",
        title: "Revisa tus datos",
        message:
          "Alguno de los datos enviados no cumple las reglas de la solicitud.",
      },
      invalidateAvailability: false,
      resetIdempotencyKey: false,
    };
  }

  if (error.code === "AGENDA_IDEMPOTENCY_CONFLICT") {
    return {
      feedback: {
        tone: "error",
        title: "No pudimos reintentar la solicitud",
        message: "Vuelve a pulsar solicitar para generar un nuevo intento seguro.",
      },
      invalidateAvailability: false,
      resetIdempotencyKey: true,
    };
  }

  return {
    feedback: {
      tone: "error",
      title: "No pudimos enviar la solicitud",
      message: "Ocurrió un problema al procesarla. Inténtalo nuevamente.",
    },
    invalidateAvailability: false,
    resetIdempotencyKey: false,
  };
}

function formatSlot(slot: PublicAgendaSlot, timeZone: string): string {
  const start = new Date(slot.startAt);
  const end = new Date(slot.endAt);
  const date = new Intl.DateTimeFormat("es-CO", {
    timeZone,
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(start);
  const time = new Intl.DateTimeFormat("es-CO", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });

  return `${capitalize(date)}, ${time.format(start)} – ${time.format(end)}`;
}

function formatWait(seconds: number): string {
  if (seconds < 60) return `${seconds} segundos`;
  const minutes = Math.ceil(seconds / 60);
  return minutes === 1 ? "1 minuto" : `${minutes} minutos`;
}

function capitalize(value: string): string {
  return value.length === 0 ? value : value[0].toUpperCase() + value.slice(1);
}
