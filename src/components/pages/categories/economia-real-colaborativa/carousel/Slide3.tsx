import VideoPlayer from "@/components/ui/VideoPlayer";
import Image from "next/image";
import React from "react";

const reasons = [
  {
    image: "/images/slide_3_1.avif",
    text: "Porque ofrece una solución sostenible y gestionada por las comunidades locales para reducir el impacto negativo del turismo en las ciudades, aprovechando su potencial positivo.",
  },
  {
    image: "/images/slide_3_2.avif",
    text: "Porque ofrece una oportunidad para reactivar la España vaciada con un turismo regenerativo que pone en valor las comunidades y economías locales.",
  },
  {
    image: "/images/slide_3_2.avif",
    text: "Su esquema cooperativo multiescala favorece la creación de empleo local y un modelo distributivo donde la mayor parte de beneficios permanece a nivel local.",
  },
];

const Slide3 = () => {
  return (
    <div className="size-full relative overflow-hidden bg-stone-300">
      <div
        style={{
          backgroundImage:
            'url("/images/economia_real_colaborativa_slide_background.avif")',
        }}
        className="size-full absolute bg-cover bg-no-repeat opacity-25"
      ></div>

      <div className="size-full relative z-10 flex flex-col lg:flex-row justify-center items-center gap-5 lg:gap-14 p-5 lg:p-10">
        <div className="w-full flex flex-col gap-5">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="flex items-center gap-5 lg:gap-10 rounded bg-white/25 p-2 lg:p-5 shadow"
            >
              <div className="relative aspect-square w-16 shrink-0 overflow-hidden lg:w-28">
                <Image
                  src={reason.image}
                  alt="Ilustración del argumento"
                  fill
                  sizes="(min-width: 1024px) 7rem, 4rem"
                  className="object-contain"
                />
              </div>
              <p className="text-xs md:text-sm lg:text-base">{reason.text}</p>
            </div>
          ))}
        </div>

        <div className="w-full rounded overflow-hidden shadow shadow-neutral-500">
          <div className="relative aspect-video w-full bg-neutral-600">
            <VideoPlayer
              className="h-full w-full"
              videoClassName="h-full w-full object-contain"
              controls
              playsInline
              preload="metadata"
            >
              <source type="video/mp4" src="/videos/fairbnb.mp4" />
            </VideoPlayer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide3;