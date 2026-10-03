import Image from 'next/image'
import React from 'react'

const Content = () => {
  return (
    <div className="p-10">
      <div className="flex flex-col gap-5 md:flex-row">
        <div className="relative order-1 aspect-video w-full overflow-hidden md:order-0 md:w-1/2">
          <Image
            src="/images/ecologia-conciencia-ambiental.avif"
            alt="representación artística de un hombre estrechando la mano de la naturaleza"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            loading="lazy"
          />
        </div>

        <div className="order-0 w-full md:order-1 md:w-1/2 flex flex-col gap-5">
          <p>
            Debe ser un deber fundamental político la construcción de sociedades sustentables, y sin duda se debe virar
            urgentemente hacia una civilización basada en el aprovechamiento de fuentes de energía renovables, económicamente
            eficientes y ambientalmente amigables.
          </p>
          <p>
            Fundación Proyecta Konscio promoverá valores y actitudes individuales y colectivas ecológicas, el cooperativismo
            como patrón de organización social y también nuevas estrategias productivas, como la agroecología, el co-housing y
            el agroforestal. Fundación Proyecta Konscio quiere potenciar procesos económicos que rompan con el modelo
            unificador, hegemónico y homogeneizante del mercado como ley suprema de la economía.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Content