import Button from "@/components/ui/Button";
import React from "react";

const Slide4 = () => {
  return (
    <div className="size-full relative overflow-hidden bg-stone-300 flex flex-col gap-5 p-10 z-10 bg-cover bg-center"  style={{
      backgroundImage: "url('/images/periodismo-digno-img4.avif')"
    }}>
      <div className="absolute top-0 left-0 size-full bg-white/60"></div>
      <div className="z-10 size-full flex justify-center items-center">
        <p className="text-center text-lg lg:text-4xl font-bold text-red-900">
          Además, nuestra tecnología avanzada de canales 3D y webRTC te
          permitirá visualizar cualquier programa que se retransmita en nuestros
          canales, desde la comodidad de tu hogar o cualquier lugar del mundo.
          Podrás estar al tanto de las últimas noticias y análisis, y ser parte
          de una comunidad de personas comprometidas con la verdad y la
          transparencia informativa.
        </p>
      </div>
      <div className="z-10 w-full flex flex-col lg:flex-row justify-between gap-5">
        <Button color="stone" className="w-full">
          <span className="px-2 text-lg lg:text-3xl">
            En nuestros canales
            <br />
            Metaverso 3D
          </span>
        </Button>
        <Button color="stone" className="w-full">
          <span className="px-2 text-lg lg:text-3xl">
            En nuestros canales
            <br />
            WebRTC
          </span>
        </Button>
      </div>
    </div>
  );
};

export default Slide4;
