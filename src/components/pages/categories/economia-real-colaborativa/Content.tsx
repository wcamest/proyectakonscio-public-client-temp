import Image from 'next/image'

const Content = () => {
  return (
    <section className="p-10">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-5 md:flex-row">
          <div className="w-full md:w-1/2 relative overflow-hidden aspect-video order-1 md:order-0">
            <Image
              src="/images/comercio-justo-1.avif"
              alt="hombre saliendo de una cueva polvorienta"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>

          <p className="w-full md:w-1/2 order-0 md:order-1">
            Nuestras propuestas se apartan por completo de las economías especulativas que vulneran todos
            los artículos de los Derechos Humanos y de la Tierra. Conciencia es identificar quienes manejan
            los hilos de la economía mundial, y denunciar las políticas que acercan a los pueblos a su
            destrucción.
          </p>
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <p className="w-full md:w-1/2">
            Proposiciones basadas en economías colaborativas, negocios inclusivos y justos, que promuevan en
            primer lugar el bienestar de la humanidad y la sostenibilidad de la vida en equilibrio en el
            planeta, con prácticas cooperativistas y con relaciones de políticas económicas para el Procomún.
            Postulados como el abandono de la obsolescencia programada, o la unión de consumidores. Vamos a
            concienciar promoviendo productos, servicios y negocios inclusivos alternativos.
          </p>

          <div className="w-full md:w-1/2 relative overflow-hidden aspect-video">
            <Image
              src="/images/comercio-justo-2.avif"
              alt="imagen de propaganda a documental"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <div className="w-full md:w-1/2 relative overflow-hidden aspect-video order-1 md:order-0">
            <Image
              src="/images/comercio-justo-3.avif"
              alt="mapa antiguo"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>

          <div className="w-full md:w-1/2 flex flex-col gap-5 order-0 md:order-1">
            <p>
              Creemos en la importancia de fomentar la cooperación económica entre los seres humanos.
              Consideramos que la unión económica, monetaria y cultural entre los pueblos mediterráneos y
              latinoamericanos puede ser un paso fundamental para transformar las relaciones económicas a
              nivel mundial hacia un modelo más respetuoso con los derechos humanos y el medio ambiente.
            </p>
            <p>
              Creemos que la cooperación económica puede ser un medio para alcanzar una economía más
              equitativa y justa, en la que todas las personas tengan acceso a los recursos y oportunidades
              necesarias para vivir dignamente.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Content
