import React from "react";

const Slide1 = () => {
  return (
    <div className="size-full relative overflow-hidden bg-stone-300 flex flex-col lg:flex-row z-10">
      <div className="w-full lg:w-1/2 lg:h-full flex flex-col gap-10 lg:justify-between p-10 bg-yellow-100 order-1 lg:order-0">
        <h1 className="flex flex-col text-xl lg:text-5xl font-bold text-center">
          <span className="text-violet-600">
            Colabora, involúcrate, co-crea con nuestras propuestas de
          </span>
          <span className="text-red-500">periodismo digno ciudadano.</span>
        </h1>
        <div className="flex justify-center items-center">
          <p className="text-center uppercase font-bold text-violet-600 text-sm lg:text-xl">
            En fundación proyecta konscio, creemos que la verdad es el bien más
            preciado que podemos compartir como sociedad. Nos enorgullece
            ofrecer a nuestra audiencia acceso a medios de comunicación que
            trabajan día a día para hacer de este mundo un lugar más informado,
            más justo y más libre.
          </p>
        </div>
      </div>
      <div className="w-full lg:w-1/2 h-full order-0 lg:order-1 bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/periodismo-digno-img1.avif')"
      }}
      ></div>
    </div>
  );
};

export default Slide1;
