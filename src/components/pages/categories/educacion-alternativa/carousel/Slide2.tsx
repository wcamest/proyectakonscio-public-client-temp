import React from "react";

const Slide2 = () => {
  return (
    <div
      style={{
        backgroundImage:
          "url('/images/educacion-alternativa-slide-2-background.avif')",
      }}
      className="size-full relative overflow-hidden bg-stone-300 flex justify-center items-center"
    >
      <div className="relative size-full z-10 px-10 py-10 lg:py-0 flex flex-col justify-between gap-16 bg-stone-800/50">
        <div className="w-full flex justify-center items-center p-5">
          <h1 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold uppercase text-white drop-shadow">
            Valor Diferencial
            <br />
            Tecnología 3D En El Panel De Usuarios
          </h1>
        </div>
        <div className="w-full flex justify-center items-center text-center">
          <ul className="text-left list-disc uppercase text-xs md:text-sm lg:text-xl font-bold text-white">
            <li>Recursos para clases virtuales.</li>
            <li>Recursos para escenarios educativos.</li>
            <li>Simulación de aptitudes.</li>
            <li>Simulación de competencias.</li>
            <li>Reuniones de recursos humanos.</li>
            <li>Entrevistas y reuniones.</li>
          </ul>
        </div>
        <div className="w-full flex justify-center items-center p-5">
          <h1 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold uppercase text-white drop-shadow">
            Entornos de aprendizaje colaborativo
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Slide2;
