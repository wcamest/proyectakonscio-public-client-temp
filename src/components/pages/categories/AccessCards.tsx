"use client";

import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Image from "next/image";
import React from "react";
import CalendarModal from "./modals/CalendarModal";
import { useModal } from "@/providers/ModalProvider";

const AccessCards = () => {

    const { openModal, closeModal } = useModal();

  return [
    <section  key="main-content" className="flex flex-col gap-10 p-10">
      <div>
        <h2 className="text-3xl md:text-5xl font-bold text-center text-blue-800">
          Las propuestas están en nuestros
          <br />
          entornos interactivos.
          <br />
          ¡Conéctate!
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-5">
        <div className="w-full lg:w-1/3 flex flex-col items-center justify-between p-5 border border-solid border-neutral-300 gap-3">
          <div className="w-full flex flex-col gap-3">
            <div className="w-full aspect-video relative overflow-hidden">
              <Image
                alt="Reunámonos"
                src="/images/reunamonos-img.avif"
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
            </div>

            <h3 className="text-2xl lg:text-4xl text-center font-bold text-blue-800">
              Reunámonos
            </h3>

            <span className="text-center text-neutral-800">
              En el metaverso, espacio inmersivo para contactar con las
              propuestas
            </span>
          </div>

          <Button
            onClick={() => {
              openModal("access-space-3d-modal");
            }}
            type="button"
            color="blue"
            className="w-fit h-fit"
          >
            <span>Ir a espacio 3D</span>
          </Button>
        </div>

        <div className="w-full lg:w-1/3 flex flex-col items-center justify-between p-5 border border-solid border-neutral-300 gap-3">
          <div className="w-full flex flex-col gap-3">
            <div className="w-full aspect-video relative overflow-hidden">
              <Image
                alt="Concertemos Cita"
                src="/images/concertemos-cita-img.avif"
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
            </div>

            <h3 className="text-2xl lg:text-4xl text-center font-bold text-blue-800">
              Concertemos Cita
            </h3>

            <span className="text-center text-neutral-800">
              Agéndala para vernos en konscio3d
            </span>
          </div>

          <Button onClick={() => {
            openModal("calendar modal")
          }} type="button" color="blue" className="w-fit h-fit">
            <span>Agendar</span>
          </Button>
        </div>

        <div className="w-full lg:w-1/3 flex flex-col items-center justify-between p-5 border border-solid border-neutral-300 gap-3">
          <div className="w-full flex flex-col gap-3">
            <div className="w-full aspect-video relative overflow-hidden">
              <Image
                alt="WebRTC"
                src="/images/webRTC-img.avif"
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
            </div>

            <h3 className="text-2xl lg:text-4xl text-center font-bold text-blue-800">
              WebRTC
            </h3>

            <span className="text-center text-neutral-800">
              Salas interactivas para conversar sobre las propuestas
            </span>
          </div>

          <Button
            onClick={() => {
              openModal("access-webrtc-modal");
            }}
            type="button"
            color="blue"
            className="w-fit h-fit"
          >
            <span>Ir a sala WebRTC</span>
          </Button>
        </div>
      </div>
    </section>,
    <CalendarModal key="calendar-modals" />,
    <Modal
      key="access-space-3d-modal"
      id="access-space-3d-modal"
      className="w-full max-w-xl"
      ariaLabelledBy="access-space-3d-modal-title"
    >
      <div className="flex flex-col gap-5 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2
              id="access-space-3d-modal-title"
              className="text-2xl font-bold text-blue-950"
            >
              Acceso al espacio 3D
            </h2>
            <p className="mt-2 text-neutral-700">
              El espacio 3D se abre en la plataforma Virtway. Elige la opción
              que corresponda a tu caso.
            </p>
          </div>

          <Button
            type="button"
            color="neutral"
            className="shrink-0 px-3 py-2"
            onClick={() => closeModal("access-space-3d-modal")}
            aria-label="Cerrar acceso al espacio 3D"
          >
            <i className="bi bi-x-lg" aria-hidden="true" />
            <span className="hidden sm:inline">Cerrar</span>
          </Button>
        </div>

        <div className="rounded border border-neutral-200 bg-neutral-50 p-4 text-neutral-800">
          <ol className="list-decimal space-y-2 pl-5">
            <li>
              Si ya tienes una cuenta, usa <strong>Iniciar sesión</strong>.
            </li>
            <li>
              Si es tu primera vez, usa <strong>Registrarme</strong> y completa
              el registro en Virtway.
            </li>
            <li>Después del registro, podrás ingresar al espacio con tu cuenta.</li>
          </ol>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Button
            href="https://webgl.virtway.com/jalzclxg/register"
            color="neutral"
            className="w-full sm:w-auto"
          >
            Registrarme
          </Button>
          <Button
            href="https://webgl.virtway.com/jalzclxg/login"
            color="blue"
            className="w-full sm:w-auto"
          >
            Iniciar sesión
          </Button>
        </div>
      </div>
    </Modal>,
    <Modal
      key="access-webrtc-modal"
      id="access-webrtc-modal"
      className="w-full max-w-xl"
      ariaLabelledBy="access-webrtc-modal-title"
    >
      <div className="flex flex-col gap-5 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2
              id="access-webrtc-modal-title"
              className="text-2xl font-bold text-blue-950"
            >
              Acceso a la sala WebRTC
            </h2>
            <p className="mt-2 text-neutral-700">
              Puedes entrar directamente a la sala; no necesitas registrarte
              previamente desde Proyecta Konscio.
            </p>
          </div>

          <Button
            type="button"
            color="neutral"
            className="shrink-0 px-3 py-2"
            onClick={() => closeModal("access-webrtc-modal")}
            aria-label="Cerrar acceso a la sala WebRTC"
          >
            <i className="bi bi-x-lg" aria-hidden="true" />
            <span className="hidden sm:inline">Cerrar</span>
          </Button>
        </div>

        <div className="rounded border border-neutral-200 bg-neutral-50 p-4 text-neutral-800">
          <ol className="list-decimal space-y-2 pl-5">
            <li>Pulsa <strong>Entrar a la sala</strong>.</li>
            <li>
              Si el navegador lo solicita, concede permisos de micrófono y
              cámara según quieras participar en la conversación.
            </li>
          </ol>
        </div>

        <div className="flex justify-end">
          <Button
            href="https://icdn.video/room/fundacion-proyecta-konscio/meet#nbb"
            color="blue"
            className="w-full sm:w-auto"
          >
            Entrar a la sala
          </Button>
        </div>
      </div>
    </Modal>,
  ];
};

export default AccessCards;
