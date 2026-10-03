import Image from 'next/image'
import React from 'react'

const Content = () => {
  return (
    <div className="p-10">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-5 md:flex-row">
          <div className="relative order-1 aspect-video w-full overflow-hidden md:order-0 md:w-1/2">
            <Image
              src="/images/innovaciones-tecnologicas.avif"
              alt="hombre saliendo de una cueva polvorienta"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              loading="lazy"
            />
          </div>
          <p className="order-0 w-full md:order-1 md:w-1/2">
            Fundación Proyecta Konscio va a promover y comercializará aquellas innovaciones tecnológicas que signifiquen
            desarrollo económico y social dentro de los límites del respeto y la preservación del equilibrio ecológico. Invitaremos
            a promover todo proyecto que diseñe procesos productivos que para implementar una innovación tenga en cuenta la
            reducción o anulación del impacto negativo que se tendrá sobre el entorno.
          </p>
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <p className="w-full md:w-1/2">
            Nuestras mejores colaboraciones lo son con sistemas de construcción alternativa. Con materiales como el bambú o guadua
            colombiana, tipos de construcción tradicional en barro, o tecnologías basadas en impresoras 3d, fomentando la
            autoconstrucción organizando comunidades que quieren convivir preservando los valores, la naturaleza y los derechos
            humanos.
          </p>
          <div className="relative w-full md:w-1/2 overflow-hidden aspect-video">
            <Image
              src="/images/innovaciones-tecnologicas.avif"
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