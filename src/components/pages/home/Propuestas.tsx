import React from 'react'

const Propuestas = () => {
  return (
    <div className="p-5 lg:p-8 flex justify-center">
      <div className="w-full max-w-5xl flex flex-col gap-10">
        <div className="flex gap-5">
          <div>
            <div className="bg-orange-500 w-9 md:w-16 aspect-square rounded-full text-orange-50 text-xl md:text-3xl flex justify-center items-center">
              <i className="bi bi-person-video3" />
            </div>
          </div>
          <div className="flex flex-col gap-2 text-neutral-900">
            <h2 className="text-xl md:text-2xl font-bold">Eventos y actividades digitales promoviendo ideas disruptivas</h2>
            <p>
              Exposición de nuestras Propuestas de valor digitales en entornos interactivos, bien realizando inmersión en metaversos o retransmitiendo a traves de salas y canales basados en tecnología webRTC. Hacemos una llamada a cooperar con organizaciones sociales con un contenido transformador, incitamos a involucrarte en diferentes proyectos dentro de las áreas de Educación alternativa, economías colaborativas reales, cultura inclusiva, etc. Inter-acción real entre la audiencia y contenidos para una conciencia.
            </p>
          </div>
        </div>

        <div className="flex gap-5">
          <div>
            <div className="bg-orange-500 w-9 md:w-16 aspect-square rounded-full text-orange-50 text-xl md:text-3xl flex justify-center items-center">
              <i className="bi bi-laptop" />
            </div>
          </div>
          <div className="flex flex-col gap-2 text-neutral-900">
            <h2 className="text-xl md:text-2xl font-bold">Digitalizamos la interacción en proyectos para el bien común</h2>
            <p>
              Nuestra estrategia es utilizar las herramientas de una tecnología innovadora para difundir aquellas propuestas que haga crecer una comunidad concienciada. Plataformas para escenificar nuestros proyectos de manera digital y también para difundir aquellas ideas que promueven valores de cooperación y desarrollo humano. Reunirse en nuestros entornos de colaboración digital y co-crear proyectos que trascienden.
            </p>
          </div>
        </div>

        <div className="flex gap-5">
          <div>
            <div className="bg-orange-500 w-9 md:w-16 aspect-square rounded-full text-orange-50 text-xl md:text-3xl flex justify-center items-center">
              <i className="bi bi-cart-fill" />
            </div>
          </div>
          <div className="flex flex-col gap-2 text-neutral-900">
            <h2 className="text-xl md:text-2xl font-bold">Servicios, Productos y Contenidos digitales con visión social</h2>
            <p>
              En un mundo en el que las economías especulativas ponen en peligro los Derechos Humanos y del Medio Ambiente, es vital ser conscientes de nuestras elecciones como consumidores. En nuestra empresa, nos esforzamos por ofrecer servicios, productos y contenidos digitales con una visión social, promoviendo un cambio hacia una economía más justa y sostenible. Únete a nosotros en nuestra lucha por un mundo más equitativo y responsable. ¡Juntos podemos marcar la diferencia!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Propuestas