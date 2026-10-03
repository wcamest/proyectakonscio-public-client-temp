import Button from "@/components/ui/Button";
import React from "react";

const Slide5 = () => {
  return (
    <div className="size-full relative overflow-hidden bg-yellow-100">
      <div className="size-full overflow-auto flex flex-col gap-5 lg:gap-10 z-10 p-5 lg:p-10">
        <div className="flex flex-col lg:flex-row gap-5">
          <div className="w-full min-h-28 lg:w-1/2 flex gap-2 lg:gap-5">
            <div className="w-2/3 h-full bg-neutral-400 bg-cover bg-center" style={{
              backgroundImage: "url('/images/periodismo-digno-img5.avif')",
            }}></div>
            <div className="w-1/3 h-full flex flex-col gap-2 lg:gap-5">
              <div className="w-full h-1/2 bg-neutral-400 bg-cover bg-center" style={{
                backgroundImage: "url('/images/periodismo-digno-img6.avif')",
              }}></div>
              <div className="w-full h-1/2 bg-neutral-400 bg-cover bg-center" style={{
                backgroundImage: "url('/images/periodismo-digno-img7.avif')",
              }}></div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 flex flex-col gap-5 lg:gap-10">
            <h1 className="uppercase font-bold text-sm md:text-lg lg:text-3xl text-violet-500 text-center">
              Apoya el periodismo valiente
            </h1>
            <p className="text-xs lg:text-xl text-violet-800">
              En nuestro canal Konscio3d no solo podrás acceder a una cuidada
              selección de medios de comunicación éticos y rigurosos, sino que
              también tendrás la oportunidad de hacerte socio de cualquiera de
              ellos. Podrás apoyarlos directamente y tener un impacto en su
              sostenibilidad financiera, permitiéndoles continuar con su
              importante trabajo de informar y analizar los acontecimientos de
              nuestro tiempo.
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <span className="text-center uppercase font-bold text-sm md:text-base lg:text-3xl text-violet-500">
            Ayuda a fundación proyecta a ser un canal aglutinador que reúna en
            España e iberoamerica aquellos medios que se comprometen con la
            verdad y el código deontologico del periodismo digno
          </span>
        </div>
        <div className="flex flex-col lg:flex-row lg:justify-between items-center gap-5 lg:gap-20">
          <p className="text-xs lg:text-xl text-violet-800">
            Para asegurar la sostenibilidad de nuestros canales y la calidad de
            nuestros contenidos, solicitamos una pequeña donación para colaborar
            con nuestra labor. Cualquier aportación será bienvenida y nos
            permitirá continuar ofreciendo acceso a medios de comunicación
            éticos y rigurosos, y promoviendo la libertad de prensa y la
            transparencia informativa en todo el mundo.
          </p>
          <Button color="stone" href="/colabora">
            <span className="px-4 text-2xl uppercase">Colabora</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Slide5;
