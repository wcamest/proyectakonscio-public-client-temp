import Button from "@/components/ui/Button";
import Image from "next/image";
import React from "react";

const Slide1 = () => {
  return (
    <div className="size-full relative overflow-hidden bg-stone-800">
      <div className="size-full relative z-10 flex flex-col">
        <div className="w-full flex flex-col md:flex-row gap-5 items-center p-5 bg-stone-700 text-orange-500">
          <h2 className="w-full text-center font-bold text-3xl md:text-4xl lg:text-5xl opacity-70">
            Fundación Proyecta Konscio
          </h2>
          <Button color="orange" href="/colabora">
            <span className="text-2xl">Trabaja Con Nosotros</span>
          </Button>
        </div>
        <div className="relative size-full">
          <div className="absolute size-full flex">
            <div
              className="w-full lg:w-2/3 h-full bg-no-repeat bg-center bg-cover opacity-55"
              style={{
                backgroundImage:
                  "url('/images/educacion-alternativa-slide-1-background.avif')",
              }}
            ></div>
            <div className="hidden lg:flex w-1/3 h-full bg-emerald-300 justify-center items-center p-20">
              <div className="size-full relative overflow-hidden">
                <Image
                  src={"/images/logo.svg"}
                  fill
                  alt="logo"
                  className="object-contain opacity-25"
                />
              </div>
            </div>
          </div>
          <div className="relative px-5 size-full top-0 left-0 flex justify-center items-center text-center">
            <h3 className="text-5xl md:text-6xl lg:text-7xl font-bold drop-shadow flex flex-col max-w-4xl">
              <span className="text-white">
                Colabora, involúcrate, co-crea con nuestras propuestas de
              </span>
              <span className="text-blue-600">educación alternativa</span>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide1;
