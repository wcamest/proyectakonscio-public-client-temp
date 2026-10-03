import Image from "next/image";
import React from "react";

const Slide6 = () => {
  const Renderer = {
    Card(imageUrl: string, title: string, description: string) {
      return (
        <div className="w-full h-fit lg:h-full flex lg:flex-col overflow-hidden rounded shadow shadow-neutral-600">
          <div className="w-1/3 lg:w-full aspect-video relative overflow-hidden">
            <Image
              src={imageUrl}
              alt={description}
              fill
              className="object-cover object-top"
            />
          </div>
          <div className="w-full h-fit flex flex-col gap-2 lg:gap-5 p-2 pl-5 lg:p-5 text-neutral-600">
            <h1 className="font-bold text-base lg:text-xl">{title}</h1>
            <span className="text-sm lg:text-base">{description}</span>
          </div>
        </div>
      );
    },
  };

  return (
    <div className="size-full relative overflow-hidden flex flex-col z-10">
      <div className="w-full flex flex-col gap-2 lg:gap-5 text-center bg-purple-500 p-5 lg:p-10 text-purple-50">
        <h1 className="text-lg lg:text-3xl font-bold">
          Descubre como docentes jubilados y jóvenes con bajos recursos ya usan
          su sitio webRTC para Tele-Educacion
        </h1>
        <span className="text-sm lg:text-xl">
          Te obsequiamos una SALA IDMR INTERACTIVA y te capacitamos para el
          PROGRAMA DE TELEDOCENCIA
        </span>
      </div>
      <div className="size-full flex flex-col gap-5 justify-center items-center px-5">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-neutral-800 uppercase text-center">
          Programas de formación en nuevas tecnologías
        </h2>
        <div className="w-full max-w-5xl flex flex-col lg:flex-row justify-center items-center gap-5 lg:gap-10">
          {Renderer.Card(
            "/images/slide7_img1.avif",
            "Docente Jubilado/a",
            "Eres docente y te gustaría ayudar a jóvenes de escasos recursos"
          )}
          {Renderer.Card(
            "/images/slide7_img2.avif",
            "Joven Sin Recursos",
            "Aprende desde las nuevas tecnologías, materias que imparten docentes comprometidos con una educación alternativa"
          )}
          {Renderer.Card(
            "/images/slide7_img3.avif",
            "Entornos 3D y web RTC interactivos",
            "Tecnología digital para confluir en proyectos de conciencia"
          )}
        </div>
      </div>
    </div>
  );
};

export default Slide6;
