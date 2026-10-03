import FlipBox from "@/components/ui/FlipBox";
import React from "react";

const Slide5 = () => {
  return (
    <div
      style={{
        backgroundImage:
          "url('/images/cultura_inclusiva_slide5_background.avif')",
      }}
      className="size-full bg-no-repeat bg-cover relative overflow-hidden bg-stone-300"
    >
      <div className="absolute size-full left-0 top-0 bg-white/40"></div>
      <div className="relative size-full left-0 top-0 z-10 overflow-x-hidden overflow-y-auto lg:overflow-y-hidden">
        <div className="relative w-full h-fit lg:h-full left-0 top-0 flex flex-col gap-5 p-5 text-center">
          <div className="z-10 flex flex-col lg:flex-row gap-5">
            <div className="w-full lg:w-1/3 h-80">
              <FlipBox
                className="size-full"
                flipDirection="x"
                frontContent={
                  <div className="size-full relative">
                    <div
                      style={{
                        backgroundImage:
                          "url('/images/cultura_inclusiva_slide5_image1.avif')",
                      }}
                      className="absolute size-full top-0 left-0 bg-no-repeat bg-cover bg-center"
                    ></div>
                    <div className="absolute size-full top-0 left-0 text-white bg-purple-500/40 flex flex-col gap-2 justify-center items-center">
                      <h2 className="text-2xl font-bold">Aymara</h2>
                      <span>Mas información...</span>
                    </div>
                  </div>
                }
                backContent={
                  <div className="size-full bg-purple-500 text-purple-50 flex justify-center items-center text-center p-10">
                    <span className="text-xs lg:text-sm">
                      El aymara es una lengua indígena que se habla
                      principalmente en Bolivia, Perú y Chile. Es una de las
                      lenguas indígenas más habladas en Sudamérica y se estima
                      que tiene alrededor de 2 millones de hablantes. Los
                      hablantes de aymara han enfrentado discriminación y
                      opresión en los países donde se habla la lengua, y la
                      enseñanza y el uso del aymara se han visto limitados en
                      algunos casos.
                    </span>
                  </div>
                }
              />
            </div>
            <div className="w-full lg:w-1/3 h-80">
              <FlipBox
                className="size-full"
                flipDirection="x"
                frontContent={
                  <div className="size-full relative">
                    <div
                      style={{
                        backgroundImage:
                          "url('/images/cultura_inclusiva_slide5_image2.avif')",
                      }}
                      className="absolute size-full top-0 left-0 bg-no-repeat bg-cover bg-center"
                    ></div>
                    <div className="absolute size-full top-0 left-0 text-white bg-indigo-500/40 flex flex-col gap-2 justify-center items-center">
                      <h2 className="text-2xl font-bold">Quechua</h2>
                      <span>Mas información...</span>
                    </div>
                  </div>
                }
                backContent={
                  <div className="size-full bg-indigo-500 text-indigo-50 flex justify-center items-center text-center p-10">
                    <span className="text-xs lg:text-sm">
                      El quechua es una lengua indígena que se habla en varios
                      países de Sudamérica, incluyendo Perú, Bolivia, Ecuador,
                      Colombia, Argentina y Chile. Es una de las lenguas
                      indígenas más habladas en el continente y se estima que
                      tiene alrededor de 10 millones de hablantes. Los hablantes
                      de quechua también han enfrentado discriminación y
                      opresión en los países donde se habla la lengua, y la
                      enseñanza y el uso del quechua se han visto limitados en
                      algunos casos.
                    </span>
                  </div>
                }
              />
            </div>
            <div className="w-full lg:w-1/3 h-80">
              <FlipBox
                className="size-full"
                flipDirection="x"
                frontContent={
                  <div className="size-full relative">
                    <div
                      style={{
                        backgroundImage:
                          "url('/images/cultura_inclusiva_slide5_image3.avif')",
                      }}
                      className="absolute size-full top-0 left-0 bg-no-repeat bg-cover bg-center"
                    ></div>
                    <div className="absolute size-full top-0 left-0 text-white bg-emerald-500/40 flex flex-col gap-2 justify-center items-center">
                      <h2 className="text-2xl font-bold">Guaraní</h2>
                      <span>Mas información...</span>
                    </div>
                  </div>
                }
                backContent={
                  <div className="size-full bg-emerald-500 text-indigo-50 flex justify-center items-center text-center p-10">
                    <span className="text-xs lg:text-sm">
                      El guaraní es una lengua indígena que se habla
                      principalmente en Paraguay, pero también en algunas partes
                      de Argentina, Bolivia y Brasil. Es una de las lenguas
                      indígenas más habladas en Sudamérica y se estima que tiene
                      alrededor de 7 millones de hablantes. Los hablantes de
                      guaraní también han enfrentado discriminación y opresión
                      en los países donde se habla la lengua, y la enseñanza y
                      el uso del guaraní se han visto limitados en algunos
                      casos.
                    </span>
                  </div>
                }
              />
            </div>
          </div>
          <span className="z-10 text-xl md:text-2xl lg:text-3xl font-bold text-neutral-700 bg-white/40 p-5 rounded shadow shadow-neutral-700">
            En general, las lenguas indígenas de los pueblos oprimidos a menudo
            han sido marginadas y suprimidas por los gobiernos y sociedades
            dominantes. La revitalización y protección de estas lenguas y
            culturas es esencial para garantizar la diversidad cultural y
            lingüística y promover la igualdad y la justicia para todos los
            pueblos del mundo.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Slide5;
