import Image from "next/image";
import React from "react";

const Slide3 = () => {
  return (
    <div
      style={{
        backgroundImage:
          "url('/images/cultura_inclusiva_slide3_background.avif')",
      }}
      className="size-full bg-no-repeat bg-cover relative overflow-hidden bg-stone-300 flex flex-col justify-center lg:justify-between gap-10 p-5 lg:p-10 z-10 text-center lg:text-3xl font-bold text-white"
    >
      <div className="absolute size-full left-0 top-0 bg-black/20"></div>
      <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20 z-10">
        <div>
          <div className="size-32 md:size-52 lg:size-80 overflow-hidden relative rounded shadow shadow-neutral-700">
            <Image
              src={"/images/cultura_inclusiva_slide1_background.avif"}
              alt="hombre indígena"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col gap-10 bg-neutral-950/40 p-5 rounded">
          <h1 className="uppercase text-yellow-400">
            Pueblos oprimidos por el mundo
          </h1>
          <span className="text-xs md:text-lg lg:text-3xl">
            En todo el mundo, los pueblos indígenas luchan por el reconocimiento
            de sus derechos, el control de sus tierras y recursos naturales, la
            protección de su cultura y el fin de la discriminación. Muchos
            pueblos indígenas también enfrentan problemas de pobreza,
            marginación y falta de acceso a servicios básicos como agua potable,
            atención médica y educación.
          </span>
        </div>
      </div>
      <span className="bg-neutral-950/40 p-5 rounded z-10 text-xs md:text-lg lg:text-3xl">
        Fundación Proyecta Konscio los representa en entornos virtuales
        interactivos. Los reúne para dar voz a sus problemáticas y juntos
        afrontar la defensa de sus derechos como pueblos.
      </span>
    </div>
  );
};

export default Slide3;
