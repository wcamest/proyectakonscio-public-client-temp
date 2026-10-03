import Image from "next/image";

import Button from "@/components/ui/Button";
import React from "react";

const Slide2 = () => {
  return (
    <div className="size-full relative overflow-hidden bg-stone-300">
      <div
        style={{
          backgroundImage:
            'url("/images/economia_real_colaborativa_slide_background.avif")',
        }}
        className="size-full absolute bg-cover bg-no-repeat opacity-25"
      ></div>
      <div className="size-full relative z-10 flex flex-col justify-center items-center gap-7 lg:gap-14 p-10">
        <div className="w-full max-w-4xl h-fit px-5 lg:px-20 py-5 lg:py-10 bg-white border-8 border-solid border-neutral-500 rounded shadow">
          <Image
            alt="fairbnb logo"
            loading="lazy"
            width={300}
            height={53}
            className="w-full"
            src="/images/fairbnb.svg"
          />
        </div>
        <div className="flex flex-col lg:flex-row justify-between items-center gap-2 lg:gap-14">
          <Button
            color="green"
            className="w-full lg:w-fit order-0"
            type="button"
          >
            <div className="px-3 py-2 md:px-4 md:py-3 lg:px-5 lg:p-4">
              <span className="text-xl md:text-2xl lg:text-3xl text-center">
                Sube tu alojamiento
              </span>
            </div>
          </Button>
          <p className="mt-5 lg:mt-0 order-2 lg:order-1 text-center text-2xl lg:text-3xl">
            <strong>Súmate</strong> a una comunidad creciente de{" "}
            <strong>activistas y emprendedores</strong> para liderar el{" "}
            <strong>turismo regenerativo</strong> <strong>#SéElCambio</strong>{" "}
            que quieres ver donde vives y a donde
          </p>
          <Button href="/unete-a-fairbnb" color="green" className="w-full lg:w-fit order-1 lg:order-2">
            <div className="px-3 py-2 md:px-4 md:py-3 lg:px-5 lg:p-4">
              <span className="text-xl md:text-2xl lg:text-3xl text-center">
                Se parte de fairbnb.com
              </span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Slide2;
