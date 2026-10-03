import Button from "@/components/ui/Button";
import FlipBox from "@/components/ui/FlipBox";
import React from "react";
import styles from "./FlipBoxes.module.css";

const FlipBoxes = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-rows-9 md:grid-rows-6 lg:grid-rows-3 text-white">
      {/*Puerto del Comercio Justo*/}
      <div
        className={`${styles.home_flipbox} w-full md:aspect-square bg-blue-600`}
      >
        <FlipBox
          className="size-full"
          flipSide="negative"
          frontContent={
            <div className="size-full relative bg-blue-700">
              <div
                className="size-full absolute left-0 top-0 bg-cover bg-center opacity-50"
                style={{ backgroundImage: "url('/images/fb1.avif')" }}
              ></div>
              <div className="size-full relative p-10 left-0 top-0 flex flex-col justify-center items-center text-center gap-5">
                <h2 className="text-2xl font-bold">
                  Puerto del Comercio Justo
                </h2>
                <p>
                  Nuestras propuestas se enfocan en promover una economía real
                  colaborativa y en fomentar el comercio justo, que respeta los
                  derechos humanos y del medio ambiente. De esta manera, nos
                  alejamos de las prácticas especulativas que amenazan estos
                  derechos fundamentales.
                </p>
              </div>
            </div>
          }
          backContent={
            <div className="size-full bg-blue-600 flex flex-col gap-5 justify-center items-center text-center p-10">
              <p>
                Es crucial tener conciencia de cómo se manejan los hilos de la
                economía mundial y reconocer que existen políticas que generan
                un sufrimiento extremo en los pueblos en nombre del lucro
                desmedido, el egoísmo y una competitividad que daña
                irreversiblemente el medio ambiente. Debemos luchar contra estas
                prácticas y trabajar por un sistema económico que promueva el
                bienestar de todos los ciudadanos y del planeta en su conjunto.
              </p>
              <Button
                color="green"
                //href="/categorias/economia-real-colaborativa"
                
                className="w-full max-w-60"
              >
                Más
              </Button>
            </div>
          }
        />
      </div>
      {/*Avenida de la Educación Trascendente*/}
      <div
        className={`${styles.home_flipbox} w-full md:aspect-square bg-orange-600`}
      >
        <FlipBox
          className="size-full"
          frontContent={
            <div className="size-full relative bg-orange-800">
              <div
                className="size-full absolute left-0 top-0 bg-cover bg-center opacity-50"
                style={{ backgroundImage: "url('/images/fb2.avif')" }}
              ></div>
              <div className="size-full relative p-10 left-0 top-0 flex flex-col justify-center items-center text-center gap-5">
                <h2 className="text-2xl font-bold">
                  Avenida de la Educación Trascendente
                </h2>
                <p>
                  Es hora de una transformación educativa radical y las
                  propuestas alternativas son la clave. Fundación Proyecta
                  Konscio se dedica a fomentar estas alternativas innovadoras,
                  que desafían la educación obsoleta y buscan crear un futuro
                  educativo más prometedor.
                </p>
              </div>
            </div>
          }
          backContent={
            <div className="size-full flex flex-col gap-5 justify-center items-center text-center p-10 bg-orange-600">
              <p>
                Queremos ser vehículo de investigación, divulgación de aquellas
                propuestas educativas innovadoras que se alejan de los sistemas
                educativos actuales que solo buscan conformar para el status
                quo, vamos a cooperar con acciones concretas, todo ello con
                miras a denunciar la involución clara y general heredada de una
                educación manipulada por dogmatismos e influenciados por las
                religiones en el mundo.
              </p>

              <Button
                
                //href="/categorias/educacion-alternativa"
                color="blue"
                className="w-full max-w-60"
              >
                Más
              </Button>
            </div>
          }
        />
      </div>
      {/*Plaza de la Cultura Inclusiva*/}
      <div
        className={`${styles.home_flipbox} w-full md:aspect-square bg-green-600`}
      >
        <FlipBox
          className="size-full"
          frontContent={
            <div className="size-full relative bg-green-700">
              <div
                className="size-full absolute left-0 top-0 bg-cover bg-center opacity-50"
                style={{ backgroundImage: "url('/images/fb3.avif')" }}
              ></div>
              <div className="size-full relative p-10 left-0 top-0 flex flex-col justify-center items-center text-center gap-5">
                <h2 className="text-2xl font-bold">
                  Plaza de la Cultura Inclusiva
                </h2>
                <p>
                  El desarrollo de la creatividad, la recreación de todas las
                  facetas del arte, es imprescindible para que la humanidad
                  evolucione en equilibrio y en paz entre los pueblos.
                </p>
              </div>
            </div>
          }
          backContent={
            <div className="size-full flex flex-col gap-5 justify-center items-center text-center p-10 bg-green-600">
              <p>
                El metaverso Konscio3D tendrá en su espacio virtual inmersivo,
                aquellas representaciones para fomentar una cultura libre que
                ilumine las mentes. Y denunciaremos aquellas maniobras políticas
                para apagar la creación artística y apoyaremos aquella cultura
                transformadora para una sociedad civil participativa,
                democrática, colaborativa y progresiva.
              </p>
              <Button
                color="orange"
                //href="/categorias/cultura-inclusiva"
                
                className="w-full max-w-60"
              >
                Más
              </Button>
            </div>
          }
        />
      </div>
      {/*Costa Ecología*/}
      <div
        className={`${styles.home_flipbox} w-full md:aspect-square bg-purple-600`}
      >
        <FlipBox
          className="size-full"
          frontContent={
            <div className="size-full relative bg-purple-500">
              <div
                className="size-full absolute left-0 top-0 bg-cover bg-center opacity-50"
                style={{ backgroundImage: "url('/images/fb4.avif')" }}
              ></div>
              <div className="size-full relative p-10 left-0 top-0 flex flex-col justify-center items-center text-center gap-5">
                <h2 className="text-2xl font-bold">Costa Ecología</h2>
                <p>
                  La construcción de sociedades sustentables es un deber
                  fundamental de la política global y un Derecho inalienable de
                  cada ser humano y animal. ¡Imagina un mundo en el que cada uno
                  de nosotros pueda vivir en armonía con nuestro entorno
                  natural, disfrutando de una calidad de vida óptima sin
                  sacrificar nuestro planeta!
                </p>
              </div>
            </div>
          }
          backContent={
            <div className="size-full flex flex-col gap-5 justify-center items-center text-center p-10 bg-purple-600">
              <p>
                Somos la plataforma en la que se concentra la información
                respecto a prácticas, conciencia, esencia y cultura de los
                pueblos conscientes con el medio ambiente, desde una perspectiva
                consistente compartimos su filosofía y servimos de enlace para
                conocer su esencia y modo de vida. Apostamos a las formas de
                sociedad basadas en el cuidado de la naturaleza, principios de
                no violencia y vivencias que apuntan a habitar en armonía con el
                resto de seres vivos.
              </p>

              <Button
                color="lime"
                //href="/categorias/ecologia-conciencia-ambiental"
                
                className="w-full max-w-60"
              >
                Más
              </Button>
            </div>
          }
        />
      </div>
      {/*Parque de las innovaciones tecnologicas*/}
      <div
        className={`${styles.home_flipbox} w-full md:aspect-square bg-sky-700`}
      >
        <FlipBox
          className="size-full"
          frontContent={
            <div className="size-full relative bg-sky-700">
              <div
                className="size-full absolute left-0 top-0 bg-cover bg-center opacity-50"
                style={{ backgroundImage: "url('/images/fb5.avif')" }}
              ></div>
              <div className="size-full relative p-10 left-0 top-0 flex flex-col justify-center items-center text-center gap-5">
                <h2 className="text-2xl font-bold">
                  Parque de las innovaciones Tecnológicas
                </h2>
                <p>
                  Fundación Proyecta Konscio presentará aquellas innovaciones
                  tecnológicas que signifiquen desarrollo económico y social de
                  manera sostenible para el planeta.
                </p>
              </div>
            </div>
          }
          backContent={
            <div className="size-full flex flex-col gap-5 justify-center items-center text-center p-10 bg-sky-700">
              <p>
                No lograremos el cambio si nosotros no somos el cambio, bajo
                esta premisa buscamos detener el agotamiento de los recursos y
                el cambio climático mediante la transformación de nuestras
                mentes, nos elevamos a ideas más responsables donde la
                sostenibilidad, el cuidado del planeta y las posturas activas en
                la sociedad nos lleven a una evolución en equilibrio.
              </p>
              <Button
                color="green"
                //href="/categorias/innovaciones-tecnologicas"
                
                className="w-full max-w-60"
              >
                Más
              </Button>
            </div>
          }
        />
      </div>
      {/*Café-Redacción Periodismo Digno Ciudadano*/}
      <div
        className={`${styles.home_flipbox} w-full md:aspect-square bg-yellow-700`}
      >
        <FlipBox
          className="size-full"
          frontContent={
            <div className="size-full relative bg-yellow-700">
              <div
                className="size-full absolute left-0 top-0 bg-cover bg-center opacity-50"
                style={{ backgroundImage: "url('/images/fb6.avif')" }}
              ></div>
              <div className="size-full relative p-10 left-0 top-0 flex flex-col justify-center items-center text-center gap-5">
                <h2 className="text-2xl font-bold">
                  Café-Redacción Periodismo Digno Ciudadano
                </h2>
                <p>
                  Fundación Proyecta Konscio se erige como una matriz
                  alternativa para dar voz al periodismo auténtico y
                  alternativo, aquel que se produce con consciencia, calidad
                  argumental y sin manipulaciones. ¡Luchamos por una prensa
                  libre y veraz, que informe con responsabilidad y rigor! Únete
                  a nosotros y apoya el periodismo honesto y comprometido con la
                  verdad.
                </p>
              </div>
            </div>
          }
          backContent={
            <div className="size-full flex flex-col gap-5 justify-center items-center text-center p-10 bg-yellow-700">
              <p>
                Seremos la tribuna de opinión e información para todos los que
                han sido silenciados. Nuestro entorno 3D servirá de soporte para
                la información veraz y oportuna desarrollada en caliente por
                comunidades interactivas operativas en el núcleo de la noticia,
                impulsamos la participación de los lectores y el cirberactivismo
                en la red, diseñamos el entorno propicio para el debate en el
                que todos los que deseen participar puedan compartir su
                contenido sin imposiciones ideológicas.
              </p>
              <Button
                
                color="emerald"
                //href="/categorias/periodismo-digno"
                
                className="w-full max-w-60"
              >
                Más
              </Button>
            </div>
          }
        />
      </div>
      {/*Gran Vía-Política para gente decente*/}
      <div
        className={`${styles.home_flipbox} w-full md:aspect-square bg-violet-500`}
      >
        <FlipBox
          className="size-full"
          frontContent={
            <div className="size-full relative bg-violet-500">
              <div
                className="size-full absolute left-0 top-0 bg-cover bg-center opacity-50"
                style={{ backgroundImage: "url('/images/fb7.avif')" }}
              ></div>
              <div className="size-full relative p-10 left-0 top-0 flex flex-col justify-center items-center text-center gap-5">
                <h2 className="text-2xl font-bold">
                  Gran Vía-Política para gente decente
                </h2>
                <p>
                  En esta gran vía circulan posturas ideológicas y tratados
                  éticos lo suficientemente razonables desde una visión
                  socialmente consistente, capaces de regular la interacción
                  social.
                </p>
              </div>
            </div>
          }
          backContent={
            <div className="size-full flex flex-col gap-5 justify-center items-center text-center p-10 bg-violet-500">
              <p>
                Promovemos las bases para el desarrollo comunitario mediante la
                apelación a los valores de paz y justicia, mediante la
                aplicación de las normas de la Declaración de Derechos Humanos,
                la abolición de la esclavitud patente en nuestro tiempo, la
                denuncia de la guerra y los basamentos verdaderamente sanos
                sobre los que reposan los conceptos de familia, amor, sociedad y
                ética.
              </p>
              <Button
                color="yellow"
                //href="/categorias/politica-de-conciencia"
                
                className="w-full max-w-60"
              >
                Más
              </Button>
            </div>
          }
        />
      </div>
      {/*Rio de la Historia No Manipulada*/}
      <div
        className={`${styles.home_flipbox} w-full md:aspect-square bg-orange-500`}
      >
        <FlipBox
          className="size-full"
          frontContent={
            <div className="size-full relative bg-orange-500">
              <div
                className="size-full absolute left-0 top-0 bg-cover bg-center opacity-50"
                style={{ backgroundImage: "url('/images/fb8.avif')" }}
              ></div>
              <div className="size-full relative p-10 left-0 top-0 flex flex-col justify-center items-center text-center gap-5">
                <h2 className="text-2xl font-bold">
                  Rio de la Historia No Manipulada
                </h2>
                <p>
                  Exponemos el caudal histórico sin sesgos convencionales, sin
                  matices oportunistas que apuntan a la exaltación de ciertos
                  actores en la historia de la humanidad, buscamos contar las
                  historias silenciadas a través del tiempo.
                </p>
              </div>
            </div>
          }
          backContent={
            <div className="size-full flex flex-col gap-5 justify-center items-center text-center p-10 bg-orange-500">
              <p>
                Nuestro objetivo es iluminar la historia de los pueblos, tanto
                la que se ha documentado como la que ha sido borrada o ignorada.
                Nos esforzamos por ser una plataforma de referencia que defiende
                la democracia de los pueblos y se opone a su bloqueo. Cada día,
                ofrecemos un paseo histórico para destacar un evento relevante
                del pasado en todo el mundo, y proporcionamos análisis
                históricos que explican la influencia y repercusión de estos
                hechos en el presente.
              </p>
              <Button
                
                color="blue"
                //href="/categorias/historia-no-manipulada"
                
                className="w-full max-w-60"
              >
                Más
              </Button>
            </div>
          }
        />
      </div>
      {/*Bosque de la salud y la nutrición*/}
      <div
        className={`${styles.home_flipbox} w-full md:aspect-square md:col-span-2 md:row-span-2 lg:col-span-1 bg-pink-700`}
      >
        <FlipBox
          className="size-full"
          frontContent={
            <div className="size-full relative bg-pink-500">
              <div
                className="size-full absolute left-0 top-0 bg-cover bg-center opacity-50"
                style={{ backgroundImage: "url('/images/fb9.avif')" }}
              ></div>
              <div className="size-full relative p-10 left-0 top-0 flex flex-col justify-center items-center text-center gap-5">
                <h2 className="text-2xl font-bold">
                  Bosque de la Salud y Nutrición
                </h2>
                <p>
                  La medicina es un derecho humano básico. Debemos defenderlo de
                  las empresas farmacéuticas y alimentarias que buscan maximizar
                  sus ganancias a expensas de nuestra salud. Necesitamos un
                  sistema médico que priorice el bienestar de las personas en
                  lugar del lucro corporativo.
                </p>
              </div>
            </div>
          }
          backContent={
            <div className="size-full flex flex-col gap-5 justify-center items-center text-center p-10 bg-pink-700">
              <p className="text-xs lg:text-sm">
                Fundación Proyecta Konscio tiene como objetivo crear conciencia
                sobre la importancia de una alimentación saludable y la
                influencia de la industria alimentaria en nuestra salud. Creemos
                que la producción de alimentos con químicos tóxicos es una
                práctica criminal para nuestro cuerpo y nuestro planeta. Como
                respuesta a esta problemática, nuestra organización difundirá
                contenido informativo y de debate sobre la industria alimentaria
                tóxica. Además, ofreceremos recomendaciones prácticas para
                transformar nuestra dieta y mejorar nuestra salud. Creemos que
                es importante que todas las personas tengan acceso a alimentos y
                medicamentos seguros y saludables, y que la industria debe ser
                responsable y respetar los derechos humanos y el medio ambiente.
              </p>
              <Button
                color="teal"
                //href="/categorias/salud-y-bienestar"
                
                className="w-full max-w-60"
              >
                Más
              </Button>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default FlipBoxes;
