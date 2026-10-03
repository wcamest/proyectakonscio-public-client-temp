import Image from 'next/image'
import React from 'react'

const Content = () => {
  return (
    <div className="p-10">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-5 md:flex-row">
          <div className="relative order-1 aspect-video w-full overflow-hidden md:order-0 md:w-1/2">
            <Image
              src="/images/historia-no-manipulada.avif"
              alt="hombre saliendo de una cueva polvorienta"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              loading="lazy"
            />
          </div>

          <p className="order-0 w-full md:order-1 md:w-1/2">
            Durante décadas los poderes hegemónicos lograron transmitir a las mayorías el cuento de hadas de una «transición
            democrática» ejemplar … Ahora, es claro para sectores mucho más amplios de población que si algo tuvo de ejemplar la
            transición fue la absoluta impunidad de los agentes de la dictadura franquista y la garantía de continuidad de una
            estructura social que se remonta a 500 años atrás. Esta trampa ha ido acompañada de la brutal ofensiva de valores que
            avanza el capitalismo a través de los medios de creación de opinión, con la que logró convencer a grandes capas de clase
            trabajadora que había llegado el momento de convertirse en «clases propietarias» y de ponerse a competir entre todas.
          </p>
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <p className="w-full md:w-1/2">
            A ello se suma la práctica de una clase política que si bien en un primer momento apostó por el estado de bienestar,
            luego ha abrazado sin pudor el proyecto neoliberal para administrar el desmantelamiento de los servicios públicos. Desde
            entonces, se les ha permitido que se enriquecieran ilegalmente mientras administrarán el poder público para la continuidad
            de la estructura social heredada y para beneficio de los intereses privados de acumulación, que son los que propiciaron
            la estafa del crédito inmobiliario.
          </p>

          <div className="relative w-full md:w-1/2 overflow-hidden aspect-video">
            <Image
              src="/images/historia-no-manipulada.avif"
              alt="imagen de propaganda a documental"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Content