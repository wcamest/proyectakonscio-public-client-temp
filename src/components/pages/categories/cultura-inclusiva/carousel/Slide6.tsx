"use client";

import Button from "@/components/ui/Button";
import { useModal } from "@/providers/ModalProvider";
import Image from "next/image";
import React from "react";
import DocenteModal from "./modals/DocenteModal";
import EstudianteModal from "./modals/EstudianteModal";
import type { PublicFormDefinition } from "@/types/formsPublic";

type Props = Readonly<{
  teacherFormDefinition: PublicFormDefinition | null;
  studentFormDefinition: PublicFormDefinition | null;
}>;

const Slide6 = ({
  teacherFormDefinition,
  studentFormDefinition,
}: Props) => {
  const { openModal } = useModal();

  return [
    <div
      key={"main-content"}
      style={{
        backgroundImage:
          "url('/images/cultura_inclusiva_slide6_background.avif')",
      }}
      className="size-full overflow-hidden relative bg-no-repeat bg-cover"
    >
      <div className="size-full overflow-auto lg:overflow-hidden p-5 lg:px-10 pb-0 lg:pb-0">
        <div className="w-full lg:h-full flex flex-col gap-5 lg:justify-between z-10">
          <div className="absolute size-full left-0 top-0 bg-white/40"></div>
          <div className="z-10 size-full flex flex-col gap-5 lg:justify-between pt-2 lg:pt-5">
            <div className="flex flex-col">
              <h1 className="text-sm md:text-lg lg:text-xl text-center p-2 lg:p-5 uppercase bg-green-500 rounded-lg shadow-lg shadow-neutral-700 font-bold text-green-50 z-10">
                Aprende español, portugues, quechua, aymara, guaraní, mapuche.
                Cultura iberoamericana general
              </h1>
              <div className="flex justify-center px-2 lg:px-20">
                <div className="w-full bg-white overflow-hidden flex flex-col lg:flex-row rounded-b shadow shadow-neutral-700">
                  <div className="w-full lg:w-32 h-20 lg:h-full overflow-hidden relative">
                    <Image
                      src={"/images/cultura_inclusiva_slide6_image3.avif"}
                      alt="cultura inclusiva image 3"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-2 p-2 lg:pt-5 text-sm text-neutral-700">
                    <h2 className="text-sm lg:text-lg font-bold">
                      Estudia en entornos digitales 3D y webRTC
                    </h2>
                    <ul className="text-xs lg:text-base list-disc pl-10">
                      <li>
                        Aprendizaje de idiomas de la cultura iberoamericana
                      </li>
                      <li>Especialidad en idiomas de raíz precolombina</li>
                      <li>Comodidad de estudiar desde casa</li>
                      <li>
                        Conexión con la realidad de las personas a través de un
                        viaje programado.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-5 lg:gap-20 justify-between px-2 lg:px-0">
              <div className="bg-white flex flex-col lg:flex-row overflow-hidden rounded shadow shadow-neutral-700">
                <div className="w-full lg:w-32 h-20 lg:h-full overflow-hidden relative">
                  <Image
                    src={"/images/cultura_inclusiva_slide6_image1.avif"}
                    alt="cultura inclusiva image 1"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-2 p-3 text-sm text-neutral-700">
                  <h2 className="text-sm lg:text-lg font-bold">
                    Propuesta para docentes de impartir conocimiento en línea
                  </h2>
                  <ul className="text-xs lg:text-base list-disc pl-10">
                    <li>
                      Uso de herramientas intuitivas, con remuneraciones y
                      reconocimiento por labor bien hecha
                    </li>
                    <li>
                      Vocación de trascendencia y valor en la red de docentes
                    </li>
                    <li>
                      Invitación a personas con conocimiento sobre cualquier
                      materia
                    </li>
                  </ul>
                </div>
              </div>
              <div className="bg-white flex flex-col lg:flex-row overflow-hidden rounded shadow shadow-neutral-700">
                <div className="w-full lg:w-32 h-20 lg:h-full overflow-hidden relative">
                  <Image
                    src={"/images/cultura_inclusiva_slide6_image2.avif"}
                    alt="cultura inclusiva image 2"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-2 p-3 text-sm text-neutral-700">
                  <h2 className="text-lg font-bold">
                    Programa de aprendizaje de idiomas en línea
                  </h2>
                  <ul className="list-disc pl-10">
                    <li>Aprendizaje de idiomas de la cultura iberoamericana</li>
                    <li>Especialidad en idiomas de raíz precolombina</li>
                    <li>Comodidad de estudiar desde casa</li>
                    <li>
                      Conexión con la realidad de las personas a través de un
                      viaje programado.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="z-10 w-full flex flex-col lg:flex-row items-center gap-2 lg:gap-5 text-center text-neutral-50 px-5 pt-2 bg-neutral-700 shadow-inner shadow-neutral-700 rounded-t">
            <span className="text-xs lg:text-xl font-bold drop-shadow">
              Plataforma de docencia disponible en línea a traves de entornos
              digitales interactivos en plataforma 3D y webRTC, dirigido a
              estudiantes, viajeras, turistas educacionales y personas
              interesadas en la cultura iberoamericana, con una red de docentes
              que muestran la cultura, saberes populares y costumbres típicas de
              Sudamérica.
            </span>
            <div className="w-full lg:w-0 h-0 lg:h-full border-t lg:border-l border-t-neutral-50 lg:border-l-neutral-50"></div>
            <div className="flex flex-col gap-5 p-2">
              <span className="text-base lg:text-2xl font-bold">
                Regístrate
              </span>
              <div className="flex flex-col gap-2">
                <Button
                  color="green"
                  className="w-full"
                  onClick={() => {
                    openModal("docente modal");
                  }}
                >
                  <span className="text-nowrap">Como docente</span>
                </Button>
                <Button
                  color="sky"
                  className="w-full"
                  onClick={() => {
                    openModal("estudiante modal");
                  }}
                >
                  <span className="text-nowrap">Como estudiante</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    <DocenteModal key={"docente-modal"} formDefinition={teacherFormDefinition} />,
    <EstudianteModal key={"estudiante-modal"} formDefinition={studentFormDefinition} />,
  ];
};

export default Slide6;
