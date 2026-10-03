import Image from 'next/image'
import React from 'react'

const Content = () => {
  return (
    <div className="p-10">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-5 md:flex-row">
          <p className="w-full">
            La Salud está en manos de la Medicina, y el proyecto neoliberal que es hegemónico en occidente hace de la Medicina un
            negocio. Cada vez más autores se expresan en estos términos: “EL SISTEMA SANITARIO, VÍCTIMA DE UNA VENTA DESPIADADA A
            CORPORACIONES PRIVADAS ÁVIDAS DE BENEFICIOS Y PODER. LO PÚBLICO, SINIESTRAMENTE DESGUARNECIDO, ENGENDRA CONSECUENCIAS
            DESOLADORAS: EN MOMENTOS DE ENFERMEDAD O PANDEMIA, SOLO AQUELLOS CON RECURSOS PUEDEN ASPIRAR A RECUPERARSE, MIENTRAS
            OTROS CARGAN UNA DEUDA DE POR VIDA” y nuestra propuesta es tratar de CONCIENCIAR a nuestra audiencia de que en la
            sociedad actual la industria alimenticia y la farmacéutica van de la mano, tratamos de hacer conocer que la publicidad
            incita a alimentarse y a tener un estilo de vida que nos hace caer en las enfermedades cada vez más y después es la
            industria farmacéutica la que se encarga de mantener cronificadas dichas enfermedades para mantener a la ciudadanía
            dependiente de los fármacos que amparados en leyes de propiedad industrial somete a los pueblos a una esclavitud
            inconsciente.
          </p>
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <div className="relative order-1 aspect-video w-full overflow-hidden md:order-0 md:w-1/2">
            <Image
              src="/images/salud-y-bienestar.avif"
              alt="hombre saliendo de una cueva polvorienta"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              loading="lazy"
            />
          </div>

          <p className="order-0 w-full md:order-1 md:w-1/2">
            Nuestra labor es mostrar, concienciar de otras maneras de nutrición, otras alternativas saludables con las que la
            industria alimenticia y la farmacéutica serán desenmascaradas pero sobre todo abandonadas. Las medicinas alternativas
            constituyen una buena ayuda pero solo complementaria. Queremos hacer ver que el verdadero médico es uno mismo. Se debe
            ser consciente de nuestra soberanía sobre la salud. La autosanación es la única medicina que cura. El grave problema es
            que el sistema trabaja para que olvidemos nuestra condición de seres soberanos y nos convirtamos en seres sumisos y
            dependientes. En nuestras manos está pues romper esa esclavitud.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Content