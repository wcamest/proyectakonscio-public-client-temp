import React from "react";

const Slide3 = () => {
  return (
    <div className="size-full relative overflow-hidden bg-stone-300 flex flex-col lg:flex-row z-10">
      <div className="w-full lg:w-1/2 h-full flex flex-col gap-5 lg:gap-10 p-10 bg-indigo-500 text-indigo-50 text-sm lg:text-2xl order-1 lg:order-0">
        <p>
          Bienvenidos al canal de Fundación Proyecta Konscio, donde reunimos los
          medios de comunicación más objetivos y éticos del panorama actual.
          Nuestro objetivo es proporcionar a nuestra audiencia acceso a noticias
          y análisis rigurosos y veraces, que se adhieren a los principios
          deontológicos de la profesión periodística.
        </p>
        <p>
          En un mundo donde la desinformación y el sesgo informativo son cada
          vez más comunes, creemos que es fundamental contar con fuentes de
          información confiables y transparentes. Por eso, hemos trabajado
          incansablemente para reunir una cuidada selección de medios de
          comunicación que se destacan por su rigor y su compromiso con la
          verdad.
        </p>
      </div>
      <div
        className="w-full lg:w-1/2 h-full order-0 lg:order-1 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/periodismo-digno-img3.avif')",
        }}
      ></div>
    </div>
  );
};

export default Slide3;
