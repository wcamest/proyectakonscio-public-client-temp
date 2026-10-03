import Button from "@/components/ui/Button";
import React from "react";

const Slide1 = () => {
  return (
    <div className="size-full relative overflow-hidden bg-stone-300">
      <div
        style={{
          backgroundImage:
            'url("/images/economia_real_colaborativa_slide_background.avif")',
        }}
        className="size-full absolute bg-cover bg-no-repeat opacity-25"
      ></div>
      <div className="size-full relative z-10 flex flex-col">
        <div className="w-full flex flex-col md:flex-row gap-5 items-center p-5">
          <h2 className="w-full text-center font-bold text-3xl md:text-4xl lg:text-5xl opacity-70">
            Fundación Proyecta Konscio
          </h2>
          <Button color="blue" href="/colabora">
            <span className="text-lg md:text-xl lg:text-2xl">
              Trabaja Con Nosotros
            </span>
          </Button>
        </div>
        <div className="size-full px-5 flex justify-center items-center text-center">
          <h3 className="text-5xl md:text-6xl lg:text-7xl font-bold drop-shadow flex flex-col max-w-4xl">
            <span className="text-white">
              Colabora, involúcrate, co-crea con nuestras propuestas de
            </span>
            <span className="text-pink-500">economía real colaborativa</span>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Slide1;
