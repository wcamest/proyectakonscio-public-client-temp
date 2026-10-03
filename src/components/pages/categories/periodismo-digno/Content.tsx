import Image from 'next/image'
import React from 'react'

const Content = () => {
  return (
    <div className="p-10">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-5 md:flex-row">
          <div className="relative order-1 aspect-video w-full overflow-hidden md:order-0 md:w-1/2">
            <Image
              src="/images/periodismo-digno-1.avif"
              alt="hombre saliendo de una cueva polvorienta"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              loading="lazy"
            />
          </div>

          <p className="order-0 w-full md:order-1 md:w-1/2">
            Parapetados tras una pancarta con lema ‘Periodigno’, el escogido a nivel nacional, y convocados a través de las redes
            sociales, hoy más que nunca una herramienta imprescindible para el desempeño de la profesión, han reivindicado que el
            llamado cuarto poder no desfallezca y que se den las condiciones necesarias en el plano laboral para que el Periodismo
            continúe siendo el elemento primordial de denuncia de los desmanes de la oligarquía que se cree por encima de toda la
            sociedad.
          </p>
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <p className="w-full md:w-1/2">
            Nuestra Fundación tendrá como uno de sus principales cometidos la creación de periodismo de barrio creado por y para
            que la ciudadanía esté informada de acuerdo al código deontológico del periodismo tal y como fue en sus inicios y que
            hoy en día está en manos de grandes multinacionales y al servicio de sus indignos intereses. La manipulación hoy día es
            tal que en realidad nos debemos preguntar acerca del gran engaño que es la Democracia, la cual no existe en ningún país
            del mundo. Konscio 3D tendrá un espacio donde periodistas de todos los países del mundo expondrán sus noticias con el
            rigor necesario para que la ciudadanía se informe y sea CONSCIENTE.
          </p>

          <div className="relative w-full md:w-1/2 overflow-hidden aspect-video">
            <Image
              src="/images/periodismo-digno-2.avif"
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