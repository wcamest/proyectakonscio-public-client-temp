/**
 * Contrato público de Agenda consumido por public-client.
 *
 * Equivale a:
 *   GET  /api/public/agenda/availability
 *   POST /api/public/agenda/meetings
 *
 * No contiene reglas administrativas, reuniones ocupadas ni PII ajena.
 */

export type PublicAgendaSlot = Readonly<{
  startAt: string;
  endAt: string;
}>;

export type PublicAgendaAvailability = Readonly<{
  timeZone: string;
  bookingEnabled: boolean;
  slots: readonly PublicAgendaSlot[];
}>;

export type PublicMeetingRequestPayload = Readonly<{
  requesterName: string;
  requesterEmail: string;
  requesterPhone: string | null;
  subject: string;
  message: string | null;
  startAt: string;
}>;

export type PublicMeetingRequestAccepted = Readonly<{
  meetingId: string;
  status: "requested";
}>;

export type PublicAgendaProblemCode =
  | "AGENDA_BOOKING_DISABLED"
  | "AGENDA_BOOKING_TOO_SOON"
  | "AGENDA_BOOKING_TOO_FAR"
  | "AGENDA_OUTSIDE_AVAILABILITY"
  | "AGENDA_SLOT_UNAVAILABLE"
  | "AGENDA_IDEMPOTENCY_CONFLICT"
  | "AGENDA_PUBLIC_RATE_LIMITED"
  | "AGENDA_PUBLIC_PENDING_LIMIT_REACHED"
  | "AGENDA_RESOURCE_CONFLICT"
  | "SERVICE_UNAVAILABLE"
  | "VALIDATION_ERROR"
  | string;

export type PublicAgendaProblemDetails = Readonly<{
  status: number;
  code: PublicAgendaProblemCode;
  title: string;
}>;
