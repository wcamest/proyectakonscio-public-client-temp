"use client";

import Calendar from "@/components/ui/Calendar";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { useModal } from "@/providers/ModalProvider";

const MODAL_ID = "calendar modal";

const CalendarModal = () => {
  const { closeModal } = useModal();

  return (
    <Modal
      id={MODAL_ID}
      className="flex size-full max-w-6xl flex-col"
      ariaLabelledBy="calendar-modal-title"
    >
      <header className="flex shrink-0 items-center justify-between gap-4 border-b border-neutral-200 px-4 py-3 sm:px-6">
        <div className="min-w-0">
          <h2
            id="calendar-modal-title"
            className="text-xl font-bold text-blue-950 sm:text-2xl"
          >
            Concertemos cita
          </h2>
          <p className="text-sm text-neutral-600">
            Consulta la disponibilidad y envía tu solicitud de reunión.
          </p>
        </div>

        <Button
          type="button"
          color="neutral"
          className="shrink-0 px-3 py-2"
          onClick={() => closeModal(MODAL_ID)}
          aria-label="Cerrar agenda"
        >
          <i className="bi bi-x-lg" aria-hidden="true" />
          <span className="hidden sm:inline">Cerrar</span>
        </Button>
      </header>

      <div className="min-h-0 flex-1">
        <Calendar />
      </div>
    </Modal>
  );
};

export default CalendarModal;
