"use client";

import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { useModal } from "@/providers/ModalProvider";
import Image from "next/image";
import React from "react";
import KonscioHousingPDFModal from "./modals/KonscioHousingPDFModal";

const Slide4 = () => {
  const { openModal } = useModal();

  const showModal = () => {
    openModal("konscio-housing-modal");
  };

  return [
    <div
      key={"slide"}
      className="size-full relative overflow-hidden bg-stone-300"
    >
      <div
        style={{
          backgroundImage:
            'url("/images/economia_real_colaborativa_slide_background.avif")',
        }}
        className="size-full absolute bg-cover bg-no-repeat opacity-25"
      ></div>

      <div className="size-full relative z-10 flex justify-center items-center text-center px-6 lg:px-10">
        <div className="max-w-4xl flex flex-col justify-center items-center gap-6">
          <h2 className="text-xl lg:text-3xl font-bold">
            Financiando la sostenibilidad
          </h2>

          <p className="text-sm lg:text-base">
            La mitad de los beneficios de Fairbnb.coop se destinan a financiar
            proyectos regenerativos elegidos por las comunidades locales,
            alineados con el cumplimiento de los Objetivos de Desarrollo
            Sostenible.
          </p>

          <h1 className="uppercase text-3xl lg:text-5xl text-blue-700">
            KonscioHousing
          </h1>

          <p className="text-base lg:text-2xl text-orange-700 font-bold">
            Construcción Cooperativa de Residencias Ecológicas y con Tecnología
            3D
          </p>

          <div className="w-20 lg:w-40 aspect-square relative overflow-hidden">
            <Image
              src="/images/konscio_housing_gif.gif"
              alt="Animación de Konscio Housing"
              fill
              sizes="(min-width: 1024px) 10rem, 5rem"
              className="object-contain"
              unoptimized
            />
          </div>

          <p className="text-sm lg:text-base">
            En el siguiente enlace encontrarás una presentación con información
            detallada sobre KonscioHousing.
          </p>
          <Button color="green" onClick={showModal}>
            Ver PDF
          </Button>
        </div>
      </div>
    </div>,
    <KonscioHousingPDFModal key={"modal"} />,
  ];
};

export default Slide4;
