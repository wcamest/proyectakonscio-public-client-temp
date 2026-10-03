import Button from "@/components/ui/Button";
import VideoPlayer from "@/components/ui/VideoPlayer";
import Image from "next/image";
import React from "react";

const Slide5 = () => {
  return (
    <div className="size-full relative overflow-hidden bg-neutral-800 flex flex-col justify-between lg:justify-start text-neutral-50 px-5 lg:px-20 py-5 z-10">
      <div className="w-full lg:p-5 flex justify-center items-center text-center">
        <p className="text-sm md:text-base lg:text-lg">
          Fundación Proyecta Konscio te invita a conocer una de las películas
          documentales más importantes de los últimos tiempos sobre el estado de
          la EDUCACIÓN. Nuestra intención es concienciar a la docencia, padres y
          jóvenes para construir una nueva EDUCACIÓN.
        </p>
      </div>
      <div className="lg:size-full flex flex-col lg:flex-row items-center p-5 pt-0 gap-5 lg:gap-10">
        <div className="w-2/3 lg:w-1/2 aspect-video max-w-96 lg:max-w-none">
          <div className="size-full relative overflow-hidden clear-start">
            <Image
              src={"/images/educacion_prohibida_banner.avif"}
              alt="Educación prohibida"
              fill
              className="object-contain"
            />
          </div>
        </div>
        <div className="w-full lg:w-1/2 aspect-video max-w-96 lg:max-w-none flex items-center">
          <div className="w-full shadow shadow-neutral-950 ">
            <VideoPlayer pauseOnHide>
              <source
                type="video/webm"
                src={"/videos/educacion-prohibida.webm"}
              />
            </VideoPlayer>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-5 items-center justify-center px-5 lg:p-10">
        <h3 className="text-lg lg:text-3xl font-bold text-center">
          La educacion alternativa en 8 clases
        </h3>
        <Button href="/educacion-alternativa-en-8-clases" color="stone">
          <div className="px-10 py-2">
            <span className="text-xl lg:text-4xl">Mas Información</span>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default Slide5;
