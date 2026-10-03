import FlipBox from "@/components/ui/FlipBox";
import React from "react";

const Slide4 = () => {
  return (
    <div
      style={{
        backgroundImage:
          "url('/images/cultura_inclusiva_slide4_background.avif')",
      }}
      className="size-full bg-no-repeat bg-cover relative overflow-hidden bg-stone-300"
    >
      <div className="absolute size-full left-0 top-0 bg-white/40"></div>
      <div className="relative size-full left-0 top-0 z-10 overflow-x-hidden overflow-y-auto lg:overflow-y-hidden">
        <div className="relative w-full h-fit lg:h-full left-0 top-0 flex flex-col gap-5 p-5 text-center">
          <div className="flex flex-col lg:flex-row gap-5 w-full h-fit lg:h-1/3 z-10">
            <div className="w-full lg:w-1/2 h-80 lg:h-full">
              <FlipBox
                className="size-full"
                flipDirection="x"
                frontContent={
                  <div className="size-full relative">
                    <div
                      style={{
                        backgroundImage:
                          "url('/images/cultura_inclusiva_slide4_image1.avif')",
                      }}
                      className="absolute size-full top-0 left-0 bg-no-repeat bg-cover bg-center"
                    ></div>
                    <div className="absolute size-full top-0 left-0 text-white bg-purple-500/40 flex flex-col gap-2 justify-center items-center">
                      <h2 className="text-2xl font-bold">Los palestinos</h2>
                      <span>Mas información...</span>
                    </div>
                  </div>
                }
                backContent={
                  <div className="size-full bg-purple-500 text-purple-50 flex justify-center items-center text-center">
                    <span className="text-xs lg:text-sm max-w-96">
                      Desde hace décadas, los palestinos han estado luchando por
                      su derecho a la autodeterminación y la creación de un
                      estado palestino independiente en las tierras que ocupan
                      actualmente Israel y los territorios palestinos. Además de
                      la violencia y los conflictos armados, los palestinos
                      también enfrentan discriminación y opresión por parte del
                      gobierno israelí y la ocupación militar.
                    </span>
                  </div>
                }
              />
            </div>
            <div className="w-full lg:w-1/2 h-80 lg:h-full">
              <FlipBox
                className="size-full"
                flipDirection="x"
                frontContent={
                  <div className="size-full relative">
                    <div
                      style={{
                        backgroundImage:
                          "url('/images/cultura_inclusiva_slide4_image2.avif')",
                      }}
                      className="absolute size-full top-0 left-0 bg-no-repeat bg-cover bg-center"
                    ></div>
                    <div className="absolute size-full top-0 left-0 text-white bg-blue-500/40 flex flex-col gap-2 justify-center items-center">
                      <h2 className="text-2xl font-bold">Los tibetanos</h2>
                      <span>Mas información...</span>
                    </div>
                  </div>
                }
                backContent={
                  <div className="size-full bg-blue-500 text-blue-50 flex justify-center items-center text-center">
                    <span className="text-xs lg:text-sm max-w-96">
                      Desde hace décadas, los tibetanos han estado luchando por
                      la independencia y el reconocimiento de su cultura y
                      religión. China ha ocupado el Tíbet desde 1950 y ha
                      impuesto políticas represivas contra los tibetanos,
                      incluyendo la prohibición de ciertas prácticas religiosas
                      y culturales. Muchos tibetanos han sido encarcelados o
                      forzados a huir del país para evitar la persecución
                    </span>
                  </div>
                }
              />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-5 w-full h-fit lg:h-1/3 z-10">
            <div className="w-full lg:w-1/2 h-80 lg:h-full">
              <FlipBox
                className="size-full"
                flipDirection="x"
                frontContent={
                  <div className="size-full relative">
                    <div
                      style={{
                        backgroundImage:
                          "url('/images/cultura_inclusiva_slide4_image3.avif')",
                      }}
                      className="absolute size-full top-0 left-0 bg-no-repeat bg-cover bg-center"
                    ></div>
                    <div className="absolute size-full top-0 left-0 text-white bg-green-500/40 flex flex-col gap-2 justify-center items-center">
                      <h2 className="text-2xl font-bold">El pueblo Mapuche</h2>
                      <span>Mas información...</span>
                    </div>
                  </div>
                }
                backContent={
                  <div className="size-full bg-green-500 text-green-50 flex justify-center items-center text-center">
                    <span className="text-xs max-w-96">
                      El pueblo Mapuche es una población indígena que habita en
                      la región de la Araucanía, en Chile, y también en algunas
                      partes de Argentina. Los Mapuches han enfrentado
                      discriminación y violencia por parte del gobierno chileno
                      y las fuerzas de seguridad durante décadas. La lucha del
                      pueblo Mapuche se centra en la defensa de su tierra y
                      recursos naturales, así como en el reconocimiento de sus
                      derechos culturales y políticos. Han sido víctimas de
                      desalojos forzosos y enfrentamientos violentos con las
                      fuerzas de seguridad, y muchos líderes Mapuches han sido
                      encarcelados y sometidos a juicios injustos.
                    </span>
                  </div>
                }
              />
            </div>
            <div className="w-full lg:w-1/2 h-80 lg:h-full">
              <FlipBox
                className="size-full"
                flipDirection="x"
                frontContent={
                  <div className="size-full relative">
                    <div
                      style={{
                        backgroundImage:
                          "url('/images/cultura_inclusiva_slide4_image4.avif')",
                      }}
                      className="absolute size-full top-0 left-0 bg-no-repeat bg-cover bg-center"
                    ></div>
                    <div className="absolute size-full top-0 left-0 text-white bg-lime-500/40 flex flex-col gap-2 justify-center items-center">
                      <h2 className="text-2xl font-bold">El pueblo Kurdo</h2>
                      <span>Mas información...</span>
                    </div>
                  </div>
                }
                backContent={
                  <div className="size-full bg-lime-600 text-lime-50 flex justify-center items-center text-center">
                    <span className="text-xs max-w-96">
                      El pueblo kurdo es una población étnica que habita en una
                      región que abarca partes de Turquía, Siria, Irak e Irán.
                      Los kurdos han enfrentado discriminación y opresión por
                      parte de los gobiernos de estos países durante décadas, y
                      han luchado por la autonomía y el reconocimiento de sus
                      derechos culturales y políticos. La situación del pueblo
                      kurdo es particularmente difícil en Turquía, donde el
                      gobierno ha implementado políticas represivas contra
                      ellos, incluyendo la prohibición de la lengua y la cultura
                      kurda, la persecución de activistas y líderes políticos, y
                      la violencia armada.
                    </span>
                  </div>
                }
              />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-5 w-full h-fit lg:h-1/3 z-10">
            <div className="w-full lg:w-1/2 h-80 lg:h-full">
              <FlipBox
                className="size-full"
                flipDirection="x"
                frontContent={
                  <div className="size-full relative">
                    <div
                      style={{
                        backgroundImage:
                          "url('/images/cultura_inclusiva_slide4_image5.avif')",
                      }}
                      className="absolute size-full top-0 left-0 bg-no-repeat bg-cover bg-center"
                    ></div>
                    <div className="absolute size-full top-0 left-0 text-white bg-amber-500/40 flex flex-col gap-2 justify-center items-center">
                      <h2 className="text-2xl font-bold">Los Rohinyás</h2>
                      <span>Mas información...</span>
                    </div>
                  </div>
                }
                backContent={
                  <div className="size-full bg-amber-600 text-amber-50 flex justify-center items-center text-center">
                    <span className="text-sm max-w-96">
                      Los rohinyás son una minoría étnica y religiosa que vive
                      principalmente en el estado de Rakhine en Myanmar. Han
                      sido objeto de discriminación y persecución durante
                      décadas, y en 2017, una campaña militar contra ellos
                      provocó la huida masiva de cientos de miles de rohinyás
                      hacia Bangladesh. A pesar de los esfuerzos internacionales
                      para protegerlos, los rohinyás todavía enfrentan graves
                      problemas y riesgos de violencia.
                    </span>
                  </div>
                }
              />
            </div>
            <div className="w-full lg:w-1/2 h-80 lg:h-full">
              <FlipBox
                className="size-full"
                flipDirection="x"
                frontContent={
                  <div className="size-full relative">
                    <div
                      style={{
                        backgroundImage:
                          "url('/images/cultura_inclusiva_slide4_image6.avif')",
                      }}
                      className="absolute size-full top-0 left-0 bg-no-repeat bg-cover bg-center"
                    ></div>
                    <div className="absolute size-full top-0 left-0 text-white bg-rose-500/40 flex flex-col gap-2 justify-center items-center">
                      <h2 className="text-2xl font-bold">El pueblo Saharaui</h2>
                      <span>Mas información...</span>
                    </div>
                  </div>
                }
                backContent={
                  <div className="size-full bg-rose-500 text-rose-50 flex justify-center items-center text-center">
                    <span className="text-xs max-w-96">
                      El pueblo Saharaui es una población indígena que habita en
                      el territorio del Sahara Occidental, una zona en disputa
                      entre Marruecos y el Frente Polisario, que busca la
                      independencia del territorio. Los saharauis han sufrido la
                      ocupación y el control militar marroquí, así como la falta
                      de acceso a los derechos básicos y a la justicia. Además,
                      miles de saharauis viven en campos de refugiados en
                      Argelia, donde enfrentan problemas de pobreza, falta de
                      empleo y acceso limitado a la educación y la atención
                      médica.
                    </span>
                  </div>
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide4;
