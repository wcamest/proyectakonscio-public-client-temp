"use client";

import { useEffect, useMemo, useState } from "react";

import PublicMeetingRequestForm from "@/components/agenda/PublicMeetingRequestForm";
import {
  PublicAgendaHttpError,
  getPublicAgendaAvailability,
} from "@/lib/agenda/publicAgenda";
import type {
  PublicAgendaAvailability,
  PublicAgendaSlot,
  PublicMeetingRequestAccepted,
} from "@/types/agendaPublic";
import { useToast } from "@/providers/ToastProvider";

import Alert from "./Alert";
import Button from "./Button";
import Select from "./Select";

type CalendarCell = Readonly<{
  dateKey: string;
  year: number;
  month: number;
  day: number;
  inCurrentMonth: boolean;
}>;

type AcceptedRequest = Readonly<{
  meeting: PublicMeetingRequestAccepted;
  slot: PublicAgendaSlot;
  timeZone: string;
}>;

type AvailabilityState =
  | Readonly<{ kind: "loading" }>
  | Readonly<{ kind: "ready"; value: PublicAgendaAvailability }>
  | Readonly<{ kind: "unavailable" }>
  | Readonly<{ kind: "error"; message: string }>;

const MONTHS = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
] as const;

const WEEKDAYS = ["DO", "LU", "MA", "MI", "JU", "VI", "SA"] as const;

const Calendar = () => {
  const initialDate = useMemo(() => new Date(), []);
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(
    initialDate.getMonth(),
  );
  const [selectedYear, setSelectedYear] = useState(initialDate.getFullYear());
  const [selectedDateKey, setSelectedDateKey] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<PublicAgendaSlot | null>(
    null,
  );
  const [acceptedRequest, setAcceptedRequest] =
    useState<AcceptedRequest | null>(null);
  const { showToast } = useToast();
  const [availabilityState, setAvailabilityState] = useState<AvailabilityState>(
    { kind: "loading" },
  );
  const [refreshVersion, setRefreshVersion] = useState(0);

  const years = useMemo(
    () =>
      Array.from(
        { length: 2 },
        (_, index) => initialDate.getFullYear() + index,
      ),
    [initialDate],
  );

  useEffect(() => {
    const controller = new AbortController();
    const range = monthQueryRange(selectedYear, selectedMonthIndex);

    void getPublicAgendaAvailability({
      from: range.from,
      to: range.to,
      signal: controller.signal,
    })
      .then((availability) => {
        setAvailabilityState({ kind: "ready", value: availability });
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;

        if (
          error instanceof PublicAgendaHttpError &&
          (error.status === 503 || error.code === "SERVICE_UNAVAILABLE")
        ) {
          setAvailabilityState({ kind: "unavailable" });
          return;
        }

        setAvailabilityState({
          kind: "error",
          message:
            "No pudimos consultar los horarios disponibles. Revisa tu conexión e inténtalo nuevamente.",
        });
      });

    return () => {
      controller.abort();
    };
  }, [refreshVersion, selectedMonthIndex, selectedYear]);

  const availability =
    availabilityState.kind === "ready" ? availabilityState.value : null;
  const timeZone = availability?.timeZone ?? null;

  const slotsByDate = useMemo(() => {
    const result = new Map<string, PublicAgendaSlot[]>();
    if (availability === null) return result;

    for (const slot of availability.slots) {
      const dateKey = instantDateKey(slot.startAt, availability.timeZone);
      const dateParts = parseDateKey(dateKey);
      if (
        dateParts.year !== selectedYear ||
        dateParts.month !== selectedMonthIndex + 1
      ) {
        continue;
      }

      const existing = result.get(dateKey) ?? [];
      existing.push(slot);
      result.set(dateKey, existing);
    }

    for (const slots of result.values()) {
      slots.sort((left, right) => left.startAt.localeCompare(right.startAt));
    }

    return result;
  }, [availability, selectedMonthIndex, selectedYear]);

  const selectedDateSlots =
    selectedDateKey === null ? [] : (slotsByDate.get(selectedDateKey) ?? []);
  const calendarCells = useMemo(
    () => buildCalendarCells(selectedYear, selectedMonthIndex),
    [selectedMonthIndex, selectedYear],
  );
  const todayKey =
    timeZone === null
      ? dateKeyFromParts(
          initialDate.getFullYear(),
          initialDate.getMonth() + 1,
          initialDate.getDate(),
        )
      : instantDateKey(new Date().toISOString(), timeZone);

  const changeMonth = (monthIndex: number) => {
    setAvailabilityState({ kind: "loading" });
    setSelectedMonthIndex(monthIndex);
    resetSelection();
  };

  const changeYear = (year: number) => {
    setAvailabilityState({ kind: "loading" });
    setSelectedYear(year);
    resetSelection();
  };

  const resetSelection = () => {
    setSelectedDateKey(null);
    setSelectedSlot(null);
    setAcceptedRequest(null);
  };

  const selectDate = (dateKey: string) => {
    setSelectedDateKey(dateKey);
    setSelectedSlot(null);
    setAcceptedRequest(null);
  };

  const refreshAvailability = () => {
    setAvailabilityState({ kind: "loading" });
    setRefreshVersion((current) => current + 1);
  };

  const handleAvailabilityInvalidated = () => {
    setSelectedSlot(null);
    setAcceptedRequest(null);
    refreshAvailability();
  };

  const handleAccepted = (meeting: PublicMeetingRequestAccepted) => {
    if (selectedSlot === null || timeZone === null) return;

    setAcceptedRequest({ meeting, slot: selectedSlot, timeZone });
    showToast({
      tone: "success",
      title: "Solicitud enviada",
      message:
        "Hemos recibido tu solicitud. La reunión está pendiente de confirmación y recibirás las novedades por correo electrónico.",
    });
    refreshAvailability();
  };

  return (
    <div className="flex h-full min-h-0 w-full flex-col overflow-auto lg:flex-row">
      <section className="relative overflow-hidden flex min-w-0 flex-1 flex-col border-b border-neutral-200 lg:border-b-0 lg:border-r">
        <div className="w-full flex flex-col gap-4 border-b border-solid border-b-neutral-300  p-1.5 sm:p-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="grid grid-cols-2 gap-2 sm:flex sm:items-end">
              <label className="flex flex-col gap-1 text-sm font-semibold text-neutral-700">
                Mes
                <Select
                  aria-label="Mes de la agenda"
                  value={selectedMonthIndex}
                  onChange={(event) => changeMonth(Number(event.target.value))}
                >
                  {MONTHS.map((month, index) => (
                    <option key={month} value={index}>
                      {month}
                    </option>
                  ))}
                </Select>
              </label>

              <label className="flex flex-col gap-1 text-sm font-semibold text-neutral-700">
                Año
                <Select
                  aria-label="Año de la agenda"
                  value={selectedYear}
                  onChange={(event) => changeYear(Number(event.target.value))}
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </Select>
              </label>
            </div>

            <div className="text-sm text-neutral-600 sm:text-right">
              {timeZone ? (
                <>
                  <span className="block font-semibold text-neutral-800">
                    Horario de la reunión
                  </span>
                  <span>{timeZone}</span>
                </>
              ) : (
                <span>Consulta la disponibilidad real de la agenda.</span>
              )}
            </div>
          </div>

          {availabilityState.kind === "error" ? (
            <Alert tone="error" title="No pudimos cargar la agenda">
              <div className="flex flex-col gap-3">
                <span>{availabilityState.message}</span>
                <Button
                  color="blue"
                  className="w-fit"
                  onClick={refreshAvailability}
                >
                  Reintentar
                </Button>
              </div>
            </Alert>
          ) : null}

          {availabilityState.kind === "unavailable" ? (
            <Alert tone="warning" title="Agenda no disponible">
              La agenda todavía no está configurada o no está disponible
              temporalmente.
            </Alert>
          ) : null}

          {availability?.bookingEnabled === false ? (
            <Alert tone="warning" title="Solicitudes pausadas">
              En este momento no se están aceptando nuevas solicitudes de
              reunión.
            </Alert>
          ) : null}

          {availability?.bookingEnabled === true &&
          availabilityState.kind === "ready" &&
          slotsByDate.size === 0 ? (
            <Alert tone="info" title="Sin horarios en este mes">
              No hay horarios disponibles para el mes seleccionado. Puedes
              consultar otro mes.
            </Alert>
          ) : null}
        </div>

        <div className="size-full overflow-hidden">
          <div className="size-full overflow-auto p-1.5 sm:p-3">
            <div className="min-h-96 overflow-hidden rounded border border-blue-200 bg-white">
              <div className="grid grid-cols-7 divide-x divide-blue-200 border-b border-blue-200 bg-neutral-100">
                {WEEKDAYS.map((weekday) => (
                  <div
                    key={weekday}
                    className="px-1 py-2 text-center text-xs font-semibold text-neutral-600"
                  >
                    {weekday}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 bg-blue-200 gap-px">
                {calendarCells.map((cell) => {
                  const slots = slotsByDate.get(cell.dateKey) ?? [];
                  const hasAvailability =
                    cell.inCurrentMonth &&
                    slots.length > 0 &&
                    availability?.bookingEnabled === true;
                  const isSelected = selectedDateKey === cell.dateKey;
                  const isToday = cell.dateKey === todayKey;

                  return (
                    <button
                      key={cell.dateKey}
                      type="button"
                      disabled={!hasAvailability}
                      aria-pressed={isSelected}
                      aria-label={dateCellLabel(cell, slots.length)}
                      onClick={() => selectDate(cell.dateKey)}
                      className={[
                        "relative min-h-16 bg-white p-2 text-left transition-colors sm:min-h-20",
                        cell.inCurrentMonth
                          ? "text-neutral-900"
                          : "text-neutral-400",
                        hasAvailability
                          ? "cursor-pointer hover:bg-blue-50 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                          : "cursor-default",
                        isSelected
                          ? "bg-blue-100 ring-2 ring-inset ring-blue-500"
                          : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      <span
                        className={[
                          "inline-flex size-7 items-center justify-center rounded-full text-sm",
                          isToday ? "bg-blue-700 font-semibold text-white" : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                      >
                        {cell.day}
                      </span>

                      {hasAvailability ? (
                        <span className="mt-1 block text-[11px] font-semibold leading-tight text-blue-700">
                          {slots.length} {slots.length === 1 ? "hora" : "horas"}
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center border-t border-solid border-t-neutral-300 p-1.5 sm:p-3 gap-x-5 gap-y-2 text-xs text-neutral-600">
          <span className="inline-flex items-center gap-2">
            <span
              className="size-2 rounded-full bg-blue-700"
              aria-hidden="true"
            />
            Hoy
          </span>
          <span className="inline-flex items-center gap-2">
            <span
              className="size-2 rounded-full bg-blue-200"
              aria-hidden="true"
            />
            Día con horarios disponibles
          </span>
          {availabilityState.kind === "loading" ? (
            <span className="inline-flex items-center gap-2 text-blue-700">
              <i
                className="bi bi-arrow-repeat animate-spin"
                aria-hidden="true"
              />
              Consultando disponibilidad...
            </span>
          ) : null}
        </div>
      </section>

      <aside className="flex w-full shrink-0 flex-col gap-4 p-4 sm:p-6 lg:w-[24rem] lg:overflow-y-auto">
        <div>
          <h3 className="text-xl font-semibold text-blue-950">
            Solicitar reunión
          </h3>
          <p className="mt-1 text-sm leading-6 text-neutral-600">
            Selecciona primero un día y una hora disponibles. La solicitud
            quedará pendiente de confirmación.
          </p>
        </div>

        {acceptedRequest ? (
          <SuccessPanel
            request={acceptedRequest}
            onRequestAnother={() => {
              setAcceptedRequest(null);
              setSelectedSlot(null);
              refreshAvailability();
            }}
          />
        ) : (
          <>
            <DaySlots
              dateKey={selectedDateKey}
              slots={selectedDateSlots}
              selectedSlot={selectedSlot}
              timeZone={timeZone}
              isLoading={availabilityState.kind === "loading"}
              onSelect={(slot) => {
                setSelectedSlot(slot);
              }}
            />

            {selectedSlot && timeZone ? (
              <PublicMeetingRequestForm
                key={selectedSlot.startAt}
                slot={selectedSlot}
                timeZone={timeZone}
                onAccepted={handleAccepted}
                onAvailabilityInvalidated={handleAvailabilityInvalidated}
              />
            ) : null}
          </>
        )}
      </aside>
    </div>
  );
};

function DaySlots({
  dateKey,
  slots,
  selectedSlot,
  timeZone,
  isLoading,
  onSelect,
}: Readonly<{
  dateKey: string | null;
  slots: readonly PublicAgendaSlot[];
  selectedSlot: PublicAgendaSlot | null;
  timeZone: string | null;
  isLoading: boolean;
  onSelect: (slot: PublicAgendaSlot) => void;
}>) {
  if (dateKey === null) {
    return (
      <div className="rounded border border-dashed border-neutral-300 p-5 text-center text-sm text-neutral-600">
        Elige un día marcado con disponibilidad en el calendario.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-sm text-blue-700">
        <i className="bi bi-arrow-repeat animate-spin" aria-hidden="true" />
        Actualizando horarios...
      </div>
    );
  }

  if (timeZone === null || slots.length === 0) {
    return (
      <Alert tone="warning" title="Sin horarios disponibles">
        Ya no hay horarios libres para el día seleccionado. Escoge otra fecha.
      </Alert>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div>
        <p className="text-sm font-semibold text-neutral-800">
          {formatDateKey(dateKey)}
        </p>
        <p className="text-xs text-neutral-500">Selecciona una hora</p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {slots.map((slot) => {
          const selected = selectedSlot?.startAt === slot.startAt;
          return (
            <button
              key={slot.startAt}
              type="button"
              aria-pressed={selected}
              onClick={() => onSelect(slot)}
              className={[
                "rounded border px-3 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1",
                selected
                  ? "border-blue-700 bg-blue-700 text-white"
                  : "border-blue-200 bg-white text-blue-800 hover:bg-blue-50",
              ].join(" ")}
            >
              {formatSlotTime(slot, timeZone)}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function SuccessPanel({
  request,
  onRequestAnother,
}: Readonly<{
  request: AcceptedRequest;
  onRequestAnother: () => void;
}>) {
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded border border-neutral-200 bg-neutral-50 p-4 text-sm text-neutral-700">
        <p className="font-semibold text-neutral-900">Horario solicitado</p>
        <p className="mt-1">{formatSlotLong(request.slot, request.timeZone)}</p>
        <p className="mt-1 text-xs text-neutral-500">
          Referencia: {request.meeting.meetingId}
        </p>
      </div>

      <Button color="blue" onClick={onRequestAnother}>
        Solicitar otra reunión
      </Button>
    </div>
  );
}

function buildCalendarCells(year: number, monthIndex: number): CalendarCell[] {
  const firstWeekday = new Date(Date.UTC(year, monthIndex, 1)).getUTCDay();
  const daysInMonth = new Date(Date.UTC(year, monthIndex + 1, 0)).getUTCDate();
  const totalCells = Math.ceil((firstWeekday + daysInMonth) / 7) * 7;
  const cells: CalendarCell[] = [];

  for (let index = 0; index < totalCells; index += 1) {
    const date = new Date(Date.UTC(year, monthIndex, 1 - firstWeekday + index));
    const cellYear = date.getUTCFullYear();
    const cellMonth = date.getUTCMonth() + 1;
    const day = date.getUTCDate();

    cells.push({
      dateKey: dateKeyFromParts(cellYear, cellMonth, day),
      year: cellYear,
      month: cellMonth,
      day,
      inCurrentMonth: date.getUTCMonth() === monthIndex,
    });
  }

  return cells;
}

function monthQueryRange(
  year: number,
  monthIndex: number,
): Readonly<{ from: Date; to: Date }> {
  const paddingMs = 36 * 60 * 60 * 1_000;
  return {
    from: new Date(Date.UTC(year, monthIndex, 1) - paddingMs),
    to: new Date(Date.UTC(year, monthIndex + 1, 1) + paddingMs),
  };
}

function instantDateKey(instant: string, timeZone: string): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date(instant));

  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;

  if (!year || !month || !day) {
    throw new Error("Unable to format Agenda date key");
  }

  return `${year}-${month}-${day}`;
}

function parseDateKey(dateKey: string): {
  year: number;
  month: number;
  day: number;
} {
  const [year, month, day] = dateKey.split("-").map(Number);
  return { year, month, day };
}

function dateKeyFromParts(year: number, month: number, day: number): string {
  return `${String(year).padStart(4, "0")}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function dateCellLabel(cell: CalendarCell, slotCount: number): string {
  const month = MONTHS[cell.month - 1]?.toLowerCase() ?? "";
  const availability =
    slotCount === 0
      ? "sin horarios disponibles"
      : `${slotCount} ${slotCount === 1 ? "horario disponible" : "horarios disponibles"}`;
  return `${cell.day} de ${month} de ${cell.year}, ${availability}`;
}

function formatDateKey(dateKey: string): string {
  const { year, month, day } = parseDateKey(dateKey);
  const anchor = new Date(Date.UTC(year, month - 1, day, 12));
  const value = new Intl.DateTimeFormat("es-CO", {
    timeZone: "UTC",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(anchor);
  return capitalize(value);
}

function formatSlotTime(slot: PublicAgendaSlot, timeZone: string): string {
  const formatter = new Intl.DateTimeFormat("es-CO", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });
  return `${formatter.format(new Date(slot.startAt))} – ${formatter.format(new Date(slot.endAt))}`;
}

function formatSlotLong(slot: PublicAgendaSlot, timeZone: string): string {
  const date = new Intl.DateTimeFormat("es-CO", {
    timeZone,
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(slot.startAt));
  return `${capitalize(date)}, ${formatSlotTime(slot, timeZone)} (${timeZone})`;
}

function capitalize(value: string): string {
  return value.length === 0 ? value : value[0].toUpperCase() + value.slice(1);
}

export default Calendar;
