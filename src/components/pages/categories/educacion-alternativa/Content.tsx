import Image from 'next/image'
import React from 'react'

const Content = () => {
  return (
    <section className="p-10">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-5 md:flex-row">
          <div className="relative order-1 aspect-video w-full overflow-hidden md:order-0 md:w-1/2">
            <Image
              src="/images/educacion-alternativa-1.avif"
              alt="hombre saliendo de una cueva polvorienta"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              loading="lazy"
            />
          </div>
          <p className="order-0 w-full md:order-1 md:w-1/2">
            Fundación Proyecta Konscio promueve propuestas sobre educación alternativa necesarias para formar personas que van a
            propiciar sociedades más justas y evolucionadas, proporciona un entorno integrado donde poder desplegar ese
            conocimiento y reúne aquellas organizaciones educativas con propuestas comprometidas con la transformación de la
            educación.
          </p>
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <div className="w-full md:w-1/2 flex flex-col gap-5">
            <p>
              Construimos y promovemos entornos digitales 3D y lo convertimos en espacio de confluencia, metaverso de
              formación, de intercambio entre proyectos educativos alternativos.
            </p>
            <span className="uppercase font-bold text-blue-500 text-2xl">
              programa formativo en tecnologias digitales. entornos y plataformas 3d y webrtc.
            </span>
          </div>
          <div className="relative w-full md:w-1/2 overflow-hidden aspect-video">
            <Image
              src="/images/educacion-alternativa-2.avif"
              alt="imagen de propaganda a documental"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Content