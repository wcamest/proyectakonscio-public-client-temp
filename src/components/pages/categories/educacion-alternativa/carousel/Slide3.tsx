import React from "react";

const Slide3 = () => {
  return (
    <div
      className="size-full relative overflow-hidden bg-stone-300"
      style={{
        backgroundImage:
          "url('/images/educacion-alternativa-slide-3-background.avif')",
      }}
    >
      <div className="size-full relative z-10 flex flex-col lg:flex-row bg-stone-800/50">
        <div className="w-full h-fit lg:h-full flex flex-col justify-start items-center gap-2 text-center p-5 text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl uppercase">Valor diferencial</h1>
          <span className="text-xl md:text-2xl lg:text-3xl">
            Tecnología para la edición inteligente de video para los usuarios
          </span>
        </div>
        <div className="px-5 lg:px-0 w-full lg:w-fit h-full font-bold flex flex-col justify-center items-center gap-16 lg:gap-24 text-center bg-purple-950/60">
          <div
            className="flex flex-col justify-center items-center text-white text-xs md:text-sm lg:text-base"
            style={{ lineHeight: "16em" }}
          >
            <h1
              style={{
                fontSize: "16em",
              }}
            >
              RH
            </h1>
            <span className="text-base md:text-lg lg:text-xl">
              Tecnología realidad virtual y metaverso para procesos de selección
              y recursos humanos
            </span>
          </div>
          <div className="flex flex-col uppercase text-base md:text-xl lg:text-xl gap-3">
            <span className="text-teal-500">
              Conectando con el empleo de calidad.
            </span>
            <span className="text-pink-500">Conectando con el talento.</span>
            <span className="text-teal-500">
              Proyectando tus competencias profesionales.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide3;
