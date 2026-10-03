import Image from "next/image";
import React from "react";

const logos = [
  {
    src: "/images/fair_coop.svg",
    alt: "Logo de FairCoop",
    wrapperClass: "w-full",
  },
  {
    src: "/images/fair_coin.svg",
    alt: "Logo de FairCoin",
    wrapperClass: "w-full lg:w-1/2",
  },
  {
    src: "/images/fair_phone.svg",
    alt: "Logo de FairPhone",
    wrapperClass: "w-full lg:w-1/2",
  },
];

const Slide5 = () => {
  return (
    <div className="size-full relative overflow-hidden bg-stone-300">
      <div
        style={{
          backgroundImage:
            'url("/images/economia_real_colaborativa_slide_background.avif")',
        }}
        className="size-full absolute bg-cover bg-no-repeat opacity-25"
      ></div>

      <div className="size-full relative z-10 flex justify-center items-center text-center">
        <div className="size-full flex content-center flex-wrap gap-y-20 lg:gap-y-32 px-6 lg:px-10">
          {logos.map((logo) => (
            <div
              key={logo.src}
              className={`${logo.wrapperClass} h-fit flex flex-col items-center gap-2`}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={400}
                height={99}
                className="h-auto w-full max-w-100"
                unoptimized
              />
              <p className="text-sm lg:text-base">
                La Alternativa al Sistema Socioeconómico Dominante
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slide5;