"use client";

import Button from "@/components/ui/Button";
import { useCookies } from "@/providers/CookiesBannerProvider";

const EducacionProhibida = () => {
  const { acceptCookies, canUseOptionalCookies } = useCookies();

  return (
    <section className="flex flex-col justify-center items-center p-5 gap-5">
      <div className="w-full max-w-5xl flex flex-col gap-1 text-green-600 font-bold">
        <h1 className="text-3xl">La educación prohibida</h1>
        <span className="text-xl">Germán Doin - Director</span>
      </div>
      {canUseOptionalCookies ? (
        <iframe
          className="w-full max-w-5xl aspect-video"
          src="https://www.youtube-nocookie.com/embed/pNE4_GFOqPw"
          title="La educación prohibida en YouTube"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      ) : (
        <div className="flex aspect-video w-full max-w-5xl flex-col items-center justify-center gap-5 rounded border border-neutral-300 bg-neutral-100 p-6 text-center">
          <i
            className="bi bi-shield-lock text-4xl text-neutral-500"
            aria-hidden="true"
          ></i>
          <div className="flex max-w-xl flex-col gap-2">
            <h2 className="text-xl font-bold text-neutral-900">
              Contenido externo bloqueado
            </h2>
            <p className="text-neutral-600">
              Para proteger tu privacidad, el vídeo de YouTube no se carga
              hasta que aceptes el contenido externo opcional.
            </p>
          </div>
          <Button color="blue" onClick={acceptCookies}>
            Permitir y ver vídeo
          </Button>
        </div>
      )}
      <div className="w-full max-w-5xl">
        German comenzó su investigación como director del film La Educación
        Prohibida; ha recorrido y conocido cientos de espacios educativos
        alternativos en Latinoamérica y diferentes partes del mundo
      </div>
      <div className="w-full max-w-5xl">
        incluyendo experiencias colectivas, públicas, privadas, comunitarias y
        particulares. Se ha dedicado a investigar, estudiar, acompañar y
        asesorar experiencias educativas en su transición hacia modelos
        alternativos por los últimos 5 años. Fue cofundador del proyecto Reevo,
        la red de educación alternativa, y miembro activo de diferentes
        colectivos y redes de educación alternativa a nivel nacional en
        Argentina e internacional en Latinoamérica y el mundo.Es fundador y
        coordinador general de Proyecto C, un espacio cultural y educativo de
        vanguardia en la ciudad de Buenos Aires que funciona desde 2020.
      </div>
    </section>
  );
};

export default EducacionProhibida;
