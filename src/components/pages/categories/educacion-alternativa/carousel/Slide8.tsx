"use client";

import Button from "@/components/ui/Button";
import { useModal } from "@/providers/ModalProvider";
import Image from "next/image";
import React from "react";
import EstudianteModal from "./modals/EstudianteModal";
import type { PublicFormDefinition } from "@/types/formsPublic";

type Props = Readonly<{
  studentFormDefinition: PublicFormDefinition | null;
}>;

const Slide8 = ({ studentFormDefinition }: Props) => {

  const { openModal } = useModal();

  return (
    [<div
      key={"main-content"}
      style={{
        backgroundImage: "url('/images/slide9_background.avif')",
      }}
      className="size-full relative overflow-hidden z-10 bg-center bg-cover bg-no-repeat"
    >
      <div className="absolute size-full backdrop-blur-sm bg-white/10"></div>
      <div className="relative size-full top-0 left-0 z-10 flex justify-center items-center">
        <div className="w-full bg-white p-5 shadow shadow-neutral-600 flex flex-col gap-10 justify-center items-center">
          <h1 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-700">
            Jóvenes con escasos recursos
          </h1>
          <div className="w-full flex flex-col lg:flex-row gap-10 text-center lg:text-start">
            <div className="order-2 lg:order-1">
              <div className="w-full lg:w-96 flex flex-col gap-5">
                <div className="w-full aspect-video overflow-hidden relative">
                  <Image
                    src={"/images/webRTC-img.avif"}
                    alt="teaching"
                    fill
                    className="object-fill"
                  />
                </div>
                <Button color="blue" onClick={() => {
                  openModal("estudiante modal")
                }}>Regístrate</Button>
              </div>
            </div>
            <div className="w-full flex flex-col gap-5 lg:gap-10 text-neutral-600 order-1 lg:order-2">
              <h2 className="text-lg md:text-xl lg:text-2xl font-bold">
                Aprende desde las nuevas tecnologías materias que imparten
                Docentes comprometidos con una educación alternativa.
              </h2>
              <span className="text-sm lg:text-base">
                Promoveremos desde Fundación Proyecta a proveer ayudas que
                reduzcan la brecha digital de jóvenes y docentes. Pediremos
                subvenciones para hardware y para acceso a buena calidad de
                internet.
              </span>
              <span className="text-sm lg:text-base">
                Formaremos en el uso de tecnologías interactivas en plataformas
                3D y webRTC
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>,
    <EstudianteModal key={"estudiante-modal"} formDefinition={studentFormDefinition} />]
  );
};

export default Slide8;
