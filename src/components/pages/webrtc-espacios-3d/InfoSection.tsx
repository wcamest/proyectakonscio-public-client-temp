import FlipBox from "@/components/ui/FlipBox";
import Image from "next/image";
import React from "react";

const InfoSection = () => {
  return (
    <section key={"content"} className="flex flex-col">
      <div className="flex flex-col items-center justify-center p-5 gap-10">
        <div className="w-full max-w-3xl h-60 flex justify-center items-center">
          <FlipBox
            className="size-full"
            frontContent={
              <div className="size-full flex flex-col items-center justify-center p-5 gap-5 bg-neutral-200 text-neutral-900">
                <div className="w-36 h-12 relative overflow-hidden">
                  <Image
                    className="object-contain"
                    src={"/images/logo_with_text.svg"}
                    fill
                    alt="Logo de Fundación Proyecta Konscio"
                  />
                </div>
                <span className="text-center text-xs md:text-sm lg:text-base">
                  Somos expertos en entornos 3D y salas webRTC para proyectos de
                  conciencia en educación, cultura, y comercio justo.
                </span>
              </div>
            }
            backContent={
              <div className="size-full flex flex-col items-center justify-center p-5 gap-5 bg-neutral-200 text-neutral-900">
                <span className="text-center text-xs md:text-sm lg:text-base">
                  Asesoramos y cooperamos con ONGs, plataformas ciudadanas,
                  emprendedores sociales, y empresas solidarias para co-crear,
                  difundir y escalar proyectos.
                </span>
                <span className="text-center text-xs md:text-sm lg:text-base">
                  Únete a nuestra comunidad Web3 y construye experiencias
                  inmersivas en metaversos 3D para involucrar a tu comunidad.
                </span>
              </div>
            }
          />
        </div>
        <div className="w-full flex flex-col lg:flex-row gap-5 justify-between text-xl md:text-2xl lg:lg:text-3xl font-bold px-20">
          <div className="flex flex-col justify-center items-center gap-2 text-sky-800">
            <i className="bi bi-people-fill text-5xl md:text-6xl lg:text-7xl"></i>
            <span className="text-center">
              Las comunidades que se construyen
              <br />
              formadas en conciencia...
            </span>
          </div>
          <div className="flex flex-col justify-center items-center gap-2 text-orange-500">
            <i className="bi bi-star-fill text-5xl md:text-6xl lg:text-7xl"></i>
            <span className="text-center">
              ...realizan proyectos extraordinarios...
            </span>
          </div>
          <div className="flex flex-col justify-center items-center gap-2 text-sky-800">
            <i className="bi bi-check2 text-5xl md:text-6xl lg:text-7xl"></i>
            <span className="text-center">
              La interacción y la difusión con
              <br />
              tecnologías digitales promueven
              <br />
              sociedades más justas y evolutivas
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
