import {
  reportPublicApiResponseFailure,
  reportPublicFetchFailure,
  reportPublicMalformedResponse,
} from "@/features/observability/client/reporter";
import type {
  PublicAgendaAvailability,
  PublicAgendaProblemDetails,
  PublicAgendaSlot,
  PublicMeetingRequestAccepted,
  PublicMeetingRequestPayload,
} from "@/types/agendaPublic";

export class PublicAgendaHttpError extends Error {
  public readonly status: number;
  public readonly code: string | null;
  public readonly retryAfterSeconds: number | null;

  public constructor(options: {
    status: number;
    code: string | null;
    message: string;
    retryAfterSeconds?: number | null;
  }) {
    super(options.message);
    this.name = "PublicAgendaHttpError";
    this.status = options.status;
    this.code = options.code;
    this.retryAfterSeconds = options.retryAfterSeconds ?? null;
  }
}

export async function getPublicAgendaAvailability(options: {
  from: Date;
  to: Date;
  signal?: AbortSignal;
}): Promise<PublicAgendaAvailability> {
  const searchParams = new URLSearchParams({
    from: options.from.toISOString(),
    to: options.to.toISOString(),
  });

  const path = `/api/public/agenda/availability?${searchParams.toString()}`;
  const init: RequestInit = {
    method: "GET",
    headers: { Accept: "application/json" },
    credentials: "omit",
    cache: "no-store",
    signal: options.signal,
  };
  let response: Response;
  try {
    response = await fetch(path, init);
  } catch (error) {
    reportPublicFetchFailure(path, init, error);
    throw error;
  }

  if (!response.ok) {
    reportPublicApiResponseFailure(path, response, "GET");
    throw await toHttpError(response);
  }

  let body: unknown;
  try {
    body = await response.json();
  } catch (error) {
    reportPublicMalformedResponse(path, response, error, "GET");
    throw new PublicAgendaHttpError({
      status: 502, code: null, message: "La respuesta de disponibilidad no tiene el formato esperado.",
    });
  }
  if (!isPublicAgendaAvailability(body)) {
    const error = new PublicAgendaHttpError({
      status: 502,
      code: null,
      message: "La respuesta de disponibilidad no tiene el formato esperado.",
    });
    reportPublicMalformedResponse(path, response, error, "GET");
    throw error;
  }

  return body;
}

export async function requestPublicMeeting(options: {
  idempotencyKey: string;
  payload: PublicMeetingRequestPayload;
  signal?: AbortSignal;
}): Promise<PublicMeetingRequestAccepted> {
  const path = "/api/public/agenda/meetings";
  const init: RequestInit = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Idempotency-Key": options.idempotencyKey,
    },
    credentials: "omit",
    cache: "no-store",
    body: JSON.stringify(options.payload),
    signal: options.signal,
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
    throw await toHttpError(response);
  }

  let body: unknown;
  try {
    body = await response.json();
  } catch (error) {
    reportPublicMalformedResponse(path, response, error, "POST");
    throw new PublicAgendaHttpError({ status: 502, code: null, message: "El servidor no pudo confirmar la solicitud." });
  }
  if (!isPublicMeetingRequestAccepted(body)) {
    const error = new PublicAgendaHttpError({
      status: 502,
      code: null,
      message: "El servidor no pudo confirmar la solicitud.",
    });
    reportPublicMalformedResponse(path, response, error, "POST");
    throw error;
  }

  return body;
}

async function toHttpError(response: Response): Promise<PublicAgendaHttpError> {
  const problem = await readProblemDetails(response);
  const retryHeader = response.headers.get("retry-after");
  const retryAfterSeconds = retryHeader === null ? null : Number(retryHeader);

  return new PublicAgendaHttpError({
    status: response.status,
    code: problem?.code ?? null,
    message: problem?.title ?? "No pudimos completar la solicitud.",
    retryAfterSeconds:
      retryAfterSeconds !== null && Number.isFinite(retryAfterSeconds)
        ? Math.max(1, Math.ceil(retryAfterSeconds))
        : null,
  });
}

async function readProblemDetails(
  response: Response,
): Promise<PublicAgendaProblemDetails | null> {
  try {
    const body: unknown = await response.json();
    if (typeof body !== "object" || body === null) return null;

    const candidate = body as Partial<PublicAgendaProblemDetails>;
    if (
      typeof candidate.status !== "number" ||
      typeof candidate.code !== "string" ||
      typeof candidate.title !== "string"
    ) {
      return null;
    }

    return {
      status: candidate.status,
      code: candidate.code,
      title: candidate.title,
    };
  } catch {
    return null;
  }
}

function isPublicAgendaAvailability(
  value: unknown,
): value is PublicAgendaAvailability {
  if (typeof value !== "object" || value === null) return false;

  const candidate = value as Partial<PublicAgendaAvailability>;
  if (
    typeof candidate.timeZone !== "string" ||
    candidate.timeZone.trim().length === 0 ||
    typeof candidate.bookingEnabled !== "boolean" ||
    !Array.isArray(candidate.slots)
  ) {
    return false;
  }

  try {
    new Intl.DateTimeFormat("es-CO", { timeZone: candidate.timeZone }).format(
      new Date(),
    );
  } catch {
    return false;
  }

  return candidate.slots.every(isPublicAgendaSlot);
}

function isPublicAgendaSlot(value: unknown): value is PublicAgendaSlot {
  if (typeof value !== "object" || value === null) return false;

  const candidate = value as Partial<PublicAgendaSlot>;
  if (
    typeof candidate.startAt !== "string" ||
    typeof candidate.endAt !== "string"
  ) {
    return false;
  }

  const start = Date.parse(candidate.startAt);
  const end = Date.parse(candidate.endAt);
  return Number.isFinite(start) && Number.isFinite(end) && end > start;
}

function isPublicMeetingRequestAccepted(
  value: unknown,
): value is PublicMeetingRequestAccepted {
  if (typeof value !== "object" || value === null) return false;

  const candidate = value as Partial<PublicMeetingRequestAccepted>;
  return (
    typeof candidate.meetingId === "string" &&
    candidate.meetingId.length > 0 &&
    candidate.status === "requested"
  );
}
