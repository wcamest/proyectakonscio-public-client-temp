import Image from 'next/image'
import React from 'react'

const Content = () => {
  return (
    <div className="p-10">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-5 md:flex-row">
          <div className="relative order-1 aspect-video w-full overflow-hidden md:order-0 md:w-1/2">
            <Image
              src="/images/politica-de-conciencia-1.avif"
              alt="hombre saliendo de una cueva polvorienta"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              loading="lazy"
            />
          </div>

          <p className="order-0 w-full md:order-1 md:w-1/2">
            La actividad política es la que influye de lleno en el bienestar y evolución equilibrada de una sociedad y de los
            pueblos en el mundo. Konscio quiere posicionarse de manera que se permita interpelar a la mayoría social en todo su
            conjunto y hacerla tomar conciencia como sujeto político pleno que de una vez tome las riendas de su destino, no
            dejando la ciudadanía sus vidas en manos de unos pocos.
          </p>
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <p className="w-full md:w-1/2">
            Proyecta Konscio quiere proponer un espacio dentro de su red social en 3D donde debatir de cuestiones políticas,
            realizar mítines, hacer llamamientos para acciones concretas, reuniones de diferentes partidos políticos y plataformas
            ciudadanas. Por supuesto que Konscio3D es afín a aquellas opciones políticas que tienen como bandera La Declaración de
            Derechos Humanos y de La Tierra.
          </p>

          <div className="relative w-full md:w-1/2 overflow-hidden aspect-video">
            <Image
              src="/images/politica-de-conciencia-1.avif"
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