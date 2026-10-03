import Image from "next/image";
import React from "react";

const Slide7 = () => {
  return (
    <div
      style={{
        backgroundImage:
          "url('/images/cultura_inclusiva_slide7_background.avif')",
      }}
      className="size-full overflow-hidden relative bg-no-repeat bg-cover"
    >
      <div className="size-full overflow-auto lg:overflow-hidden p-5 lg:p-10">
        <div className="w-full lg:h-full flex flex-col gap-5 lg:justify-between z-10">
          <div className="absolute size-full left-0 top-0 bg-white/40"></div>
          <div className="w-full flex justify-center z-10">
            <span className="text-sm md:text-lg lg:text-xl text-center p-2 lg:p-5 rounded-lg bg-indigo-400 text-indigo-50 font-bold uppercase shadow shadow-neutral-700">
              Prepárate.
              <br />
              Empieza en digital, conoce las propuestas y viaja para
              experiencias en vivo a iberomerica.
            </span>
          </div>
          <div className="size-full flex flex-col gap-5 lg:gap-10 lg:justify-end z-10">
            <div className="flex flex-col lg:flex-row gap-5 lg:gap-20">
              <div className="w-full lg:w-1/2 overflow-hidden bg-white flex flex-col lg:flex-row rounded shadow shadow-neutral-700">
                <div>
                  <div className="w-full lg:w-32 h-20 lg:h-full overflow-hidden relative">
                    <Image
                      src={"/images/cultura_inclusiva_slide7_image1.avif"}
                      alt="cultura inclusiva image 1"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2 p-3 text-xs lg:text-sm text-neutral-700">
                  <h2 className="text-lg font-bold">
                    Tecnología digital para construir espacios virtuales
                  </h2>
                  <ul className="list-disc pl-10">
                    <li>
                      Los espacios virtuales permiten impartir y recibir todo
                      tipo de conocimientos sobre la cultura ibero-americana,
                      incluyendo su historia y organización en sociedad, y
                      especialmente su idioma
                    </li>
                    <li>
                      Ofrecemos charlas, cursos, debates, ponencias, actividades
                      y eventos para aprender de manera amena y construir
                      comunidad
                    </li>
                  </ul>
                </div>
              </div>
              <div className="w-full lg:w-1/2 overflow-hidden bg-white flex flex-col lg:flex-row rounded shadow shadow-neutral-700">
                <div>
                  <div className="w-full lg:w-32 h-20 lg:h-full overflow-hidden relative">
                    <Image
                      src={"/images/cultura_inclusiva_slide7_image2.avif"}
                      alt="cultura inclusiva image 2"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2 p-3 text-xs lg:text-sm text-neutral-700">
                  <h2 className="text-lg font-bold">Herramientas digitales</h2>
                  <ul className="list-disc pl-10">
                    <li>
                      Proveemos herramientas digitales y acceso a plataformas
                      para desenvolverse en el mundo digital.
                    </li>
                    <li>
                      Trabajamos por la universalización del conocimiento humano
                      a través de Internet y los procesos digitales.
                    </li>
                    <li>
                      Utilizamos tecnologías interactivas para llevar propuestas
                      de conciencia y contribuir a cambios en la sociedad
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-full lg:w-1/2 overflow-hidden bg-white flex flex-col lg:flex-row rounded shadow shadow-neutral-700">
                <div>
                  <div className="w-full lg:w-32 h-20 lg:h-full overflow-hidden relative">
                    <Image
                      src={"/images/cultura_inclusiva_slide7_image3.avif"}
                      alt="cultura inclusiva image 3"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2 p-3 text-xs lg:text-sm text-neutral-700">
                  <h2 className="text-lg font-bold">
                    Propuesta para docentes de impartir conocimiento en línea
                  </h2>
                  <ul className="list-disc pl-10">
                    <li>
                      Se utiliza la tecnología webRTC para conectar con aulas y
                      espacios en vivo y directo de universidades o academias
                      con docentes impartiendo todo tipo de conocimientos, y el
                      usuario puede inter-actuar en dichas aulas desde su casa
                      siguiendo el curso en los horarios establecidos.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide7;
