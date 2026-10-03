import Image from "next/image";
import React from "react";

const Slide2 = () => {
  return (
    <div
      style={{
        backgroundImage:
          "url('/images/cultura_inclusiva_slide2_background.avif')",
      }}
      className="size-full relative overflow-hidden bg-stone-300 flex items-end z-10"
    >
      <div className="flex flex-col lg:flex-row justify-center items-center gap-10 p-10">
        <div className="h-96">
          <div className="relative overflow-hidden w-52 h-full rounded shadow shadow-neutral-700">
            <Image
              src={"/images/cultura_inclusiva_slide2_image1.avif"}
              alt="mujer indígena"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <span className="text-2xl md:text-5xl lg:text-7xl text-white drop-shadow font-bold">
          Pueblos en el mundo enfrentan problemas y desafíos significativos en
          su lucha por la libertad y la justicia.
        </span>
      </div>
    </div>
  );
};

export default Slide2;
