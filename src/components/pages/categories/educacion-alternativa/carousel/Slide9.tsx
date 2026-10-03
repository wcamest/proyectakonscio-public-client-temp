import Button from "@/components/ui/Button";
import Image from "next/image";
import React from "react";

const Slide9 = () => {
  return (
    <div
      style={{
        backgroundImage: "url('/images/slide10_background.avif')",
      }}
      className="size-full relative overflow-hidden z-10 bg-center bg-cover bg-no-repeat"
    >
      <div className="absolute size-full backdrop-blur-sm bg-white/10"></div>
      <div className="relative size-full top-0 left-0 z-10 flex justify-center items-center">
        <div className="w-full bg-white p-5 shadow shadow-neutral-600 flex flex-col gap-10 justify-center items-center">
          <h1 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-700">
            Entornos 3D y WebRTC interactivo
          </h1>
          <div className="w-full flex flex-col lg:flex-row gap-10 text-center lg:text-start">
            <div className="order-2 lg:order-1">
              <div className="w-full lg:w-96 flex flex-col gap-5">
                <div className="w-full aspect-video overflow-hidden relative">
                  <Image
                    src={"/images/learning_laptop.avif"}
                    alt="teaching"
                    fill
                    className="object-fill"
                  />
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col gap-5 lg:gap-10 text-neutral-600 order-1 lg:order-2">
              <span className="text-sm lg:text-base">
                En los entornos webRTC presentamos, debatimos, realizamos
                actividades, organizamos eventos. Junto a organizaciones
                sociales, con las que difundimos conciencia, construimos una
                comunidad permanente y proactiva mediante la interacción
                cooperativa.
              </span>
              <span className="text-sm lg:text-base">
                Nuestra propuesta digital ubica, reúne y presenta entornos
                interactivos 3D y webRTC a organizaciones educacionales,
                sociales, culturales y de comercio justo con contenidos de muy
                alta calidad para una conciencia social mas evolucionada.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide9;
