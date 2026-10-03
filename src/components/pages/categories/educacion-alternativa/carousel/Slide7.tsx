"use client";

import Button from "@/components/ui/Button";
import Image from "next/image";
import React from "react";
import DocenteJubiladoModal from "./modals/DocenteJubiladoModal";
import { useModal } from "@/providers/ModalProvider";
import type { PublicFormDefinition } from "@/types/formsPublic";

type Props = Readonly<{
  teacherFormDefinition: PublicFormDefinition | null;
}>;

const Slide7 = ({ teacherFormDefinition }: Props) => {
  const { openModal } = useModal();

  return [
    <div
      key={"main-content"}
      style={{
        backgroundImage: "url('/images/slide8_background.avif')",
      }}
      className="size-full relative overflow-hidden z-10 bg-center bg-cover bg-no-repeat"
    >
      <div className="absolute size-full backdrop-blur-sm bg-white/10"></div>
      <div className="relative size-full top-0 left-0 z-10 flex justify-center items-center">
        <div className="w-full bg-white p-5 shadow shadow-neutral-600 flex flex-col gap-10 justify-center items-center">
          <h1 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-700">
            Docente jubilado/a
          </h1>
          <div className="w-full flex flex-col lg:flex-row gap-10 text-center lg:text-start">
            <div className="order-2 lg:order-1">
              <div className="w-full lg:w-96 flex flex-col gap-5">
                <div className="w-full aspect-video overflow-hidden relative">
                  <Image
                    src={"/images/teaching.avif"}
                    alt="teaching"
                    fill
                    className="object-fill"
                  />
                </div>
                <Button
                  className="w-full"
                  color="blue"
                  onClick={() => {
                    openModal("docente jubilado modal");
                  }}
                >
                  Regístrate
                </Button>
              </div>
            </div>
            <div className="w-full flex flex-col gap-5 lg:gap-10 text-neutral-600 order-1 lg:order-2">
              <div className="flex flex-col gap-3">
                <h2 className="text-lg md:text-xl lg:text-2xl font-bold">
                  Programa especial docentes jubilados
                </h2>
                <span className="text-sm lg:text-base">
                  Formación a Docentes jubilados en el uso de tecnologías
                  interactivas para impartir clases a jóvenes sin recursos
                </span>
              </div>
              <div className="flex flex-col gap-3">
                <h2 className="text-lg md:text-xl lg:text-2xl font-bold">
                  Plan de tutorías para jóvenes sin recursos
                </h2>
                <span className="text-sm lg:text-base">
                  Jubilad@s que tienen energía y buscan dar sentido y
                  trascendencia a sus vidas, ayudando a una juventud con
                  recursos limitados. Promovemos acceso digital educativo que
                  mejore sus resultados.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    <DocenteJubiladoModal key={"docente-jubilado-modal"} formDefinition={teacherFormDefinition} />,
  ];
};

export default Slide7;
