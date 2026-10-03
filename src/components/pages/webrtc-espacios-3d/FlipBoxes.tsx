"use client";

import Button from "@/components/ui/Button";
import FlipBox from "@/components/ui/FlipBox";
import styles from "./FlipBoxes.module.css";
import React from "react";
import { useModal } from "@/providers/ModalProvider";
import MetaversoModal from "./modals/MetaversoModal";
import WebRTCModal from "./modals/WebRTCModal";
import type { PublicFormDefinition } from "@/types/formsPublic";

type Props = Readonly<{
  webrtcFormDefinition: PublicFormDefinition | null;
}>;

const FlipBoxes = ({ webrtcFormDefinition }: Props) => {
  const { openModal } = useModal();

  return [
    <section
      key={"flip-box"}
      className="flex items-center justify-center p-2.5 lg:p-5 pt-0"
    >
      <div className="w-full max-w-7xl flex items-center justify-center flex-wrap">
        <div
          className={`${styles.webrtc_espacios_3d_flipbox} w-full lg:w-1/2 aspect-square p-2.5`}
        >
          <FlipBox
            className="size-full"
            frontContent={
              <div className="size-full bg-sky-700 relative p-5">
                <div
                  className="absolute left-0 top-0 size-full opacity-30 bg-cover bg-center"
                  style={{
                    backgroundImage: "url('/images/webRTC_FlipBox1.avif')",
                  }}
                ></div>
                <div className="relative left-0 top-0 size-full flex flex-col justify-center items-center gap-5 text-center text-white">
                  <h2 className="lg:text-3xl font-bold">El Equipo</h2>
                  <span>La humanización de la tecnología ...</span>
                </div>
              </div>
            }
            backContent={
              <div className="size-full bg-sky-700 flex justify-center items-center text-center text-white p-10 text-xs md:text-sm lg:text-base">
                <p>
                  La Humanización de la Tecnología. «En los siguientes cinco
                  años, a las propuestas digitalizadas no les puede faltar la
                  innovación, la velocidad o cambio de capacidad de reinvención
                  en el camino hacia el desafío digital». “El cambio fundamental
                  está en pasar de las interfaces transaccionales a plataformas
                  conversacionales. Esto es, colocar a la persona en el centro
                  de la propuesta, crear una relación de verdadera empatía y
                  entender sus verdaderas necesidades”
                </p>
              </div>
            }
          ></FlipBox>
        </div>
        <div
          className={`${styles.webrtc_espacios_3d_flipbox} w-full lg:w-1/2 aspect-square p-2.5`}
        >
          <FlipBox
            className="size-full"
            frontContent={
              <div className="size-full bg-sky-700 relative p-5">
                <div
                  className="absolute left-0 top-0 size-full opacity-30 bg-cover bg-center"
                  style={{
                    backgroundImage: "url('/images/webRTC_FlipBox2.avif')",
                  }}
                ></div>
                <div className="relative left-0 top-0 size-full flex flex-col justify-center items-center gap-5 text-center text-white">
                  <h2 className="lg:text-3xl font-bold">La Inter-Acción</h2>
                  <span>La comunicación dentro de los entornos ...</span>
                </div>
              </div>
            }
            backContent={
              <div className="size-full bg-sky-700 flex flex-col justify-center items-center text-center gap-3 text-white p-10 text-xs md:text-sm lg:text-base">
                <p>
                  La comunicación dentro de los entornos promueve el diálogo, el
                  intercambio de ideas, el análisis, la participación, la
                  solución de problemas, la negociación, la co-creación.
                </p>
                <p>
                  Si a esa necesidad imperativa de comunicación añadimos el reto
                  de tener data, analítica, contenido y video disponible en
                  tiempo real, en cualquier momento y lugar. Cuales son nuestras
                  opciones? El Chat? la videoconferencia tradicional?
                </p>
                <p>
                  La Solución que va a estar presente en el mundo digital del
                  futuro y por los próximos 20 años es la nueva generación de
                  Tecnologías de WebRTC que incluyen propuestas de «todo
                  incluido» de videoconferencia, chat, data y analítica,
                  contenidos, transmisiones en vivo.. conectados a redes
                  sociales.
                </p>

                <p>
                  El medio son Salas Interactivas que sirven de «corredor
                  digital» conectando personas en un «cara a cara» en ambientes
                  seguros, privados y que permiten escalabilidad para alcanzar a
                  toda la organización y por que no?.. a proveedores y
                  distribuidores, adquirentes de servicios y productos, fans y
                  usuarios finales.
                </p>
              </div>
            }
          ></FlipBox>
        </div>
        <div
          className={`${styles.webrtc_espacios_3d_flipbox} w-full lg:w-1/2 aspect-square p-2.5`}
        >
          <FlipBox
            className="size-full"
            frontContent={
              <div className="size-full bg-sky-700 relative p-5">
                <div
                  className="absolute left-0 top-0 size-full opacity-30 bg-cover bg-center"
                  style={{
                    backgroundImage: "url('/images/webRTC_FlipBox3.avif')",
                  }}
                ></div>
                <div className="relative left-0 top-0 size-full flex flex-col justify-center items-center gap-5 text-center text-white">
                  <h2 className="lg:text-3xl font-bold">
                    METAVERSO: 3D Inmersivo
                  </h2>
                  <span>
                    Comunidad digital organizándose en proyectos de conciencia
                  </span>
                </div>
              </div>
            }
            backContent={
              <div className="size-full bg-sky-700 flex flex-col gap-5 justify-center items-center text-center lg:gap-3 text-white p-10 text-xs md:text-sm lg:text-base">
                <p>
                  Creamos entornos interactivos 3D en línea masivos y
                  persistentes, desarrollados y construidos por los usuarios.
                  Nuestra economía colaborativa está alojada en servidores en la
                  nube. Buscamos difundir, conectar, compartir, fomentar el
                  prosumismo, conciencia global, respeto, transparencia,
                  reciprocidad, apertura y nuevas tendencias en economía real
                  colaborativa y educación alternativa. Nuestros servicios
                  incluyen la construcción de la entrada al entorno 3D,
                  estrategia de conexión al Metaverso, personalización de
                  espacios y contenido, formación en interacción y organización
                  de eventos inmersivos.
                </p>
                <Button
                  color="orange"
                  className="w-full max-w-60"
                  onClick={() => {
                    openModal("metaverso video player modal")
                  }}
                >
                  Aprende Más ...
                </Button>
              </div>
            }
          ></FlipBox>
        </div>
        <div
          className={`${styles.webrtc_espacios_3d_flipbox} w-full lg:w-1/2 aspect-square p-2.5`}
        >
          <FlipBox
            className="size-full"
            frontContent={
              <div className="size-full bg-sky-700 relative p-5">
                <div
                  className="absolute left-0 top-0 size-full opacity-30 bg-cover bg-center"
                  style={{
                    backgroundImage: "url('/images/webRTC_FlipBox4.avif')",
                  }}
                ></div>

                <div className="relative left-0 top-0 size-full flex flex-col justify-center items-center gap-5 text-center text-white">
                  <h2 className="lg:text-3xl font-bold">
                    Canales Interactivos. WebRTC
                  </h2>
                  <span>Conexión digital en tiempo real</span>
                </div>
              </div>
            }
            backContent={
              <div className="size-full bg-sky-700 flex flex-col gap-5 justify-center items-center text-center text-white p-10 text-xs md:text-sm lg:text-base">
                <p>
                  En canales educativos, mostrando clases y cursos interactivos,
                  eventos culturales, conexión cara a cara con todo tipo de
                  profesionales (medicina, educadores, psicología…), reuniones
                  para organizar programas y actividades. Canales totalmente
                  privados y seguros.
                </p>
                <Button
                  color="orange"
                  className="w-full max-w-60"
                  onClick={() => {
                    openModal("webrtc modal")
                  }}
                >
                  Aprende Más ...
                </Button>
              </div>
            }
          ></FlipBox>
        </div>
      </div>
    </section>,
    <MetaversoModal key={"metaverso-modal"} />,
    <WebRTCModal key={"webrtc-modal"} formDefinition={webrtcFormDefinition} />
  ];
};

export default FlipBoxes;
