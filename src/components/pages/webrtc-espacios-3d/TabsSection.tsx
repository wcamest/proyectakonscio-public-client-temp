"use client";

import Button from "@/components/ui/Button";
import Tabs from "@/components/ui/Tabs";
import React from "react";
import TabContentItem from "./TabContentItem";
import { useModal } from "@/providers/ModalProvider";
import SpatialCourseModal from "./modals/SpatialCourseModal";
import type { PublicFormDefinition } from "@/types/formsPublic";

type Props = Readonly<{
  spatialFormDefinition: PublicFormDefinition | null;
}>;

const TabsSection = ({ spatialFormDefinition }: Props) => {
  const { openModal } = useModal();

  return [
    <section key={"tabs"} className="p-5">
      <Tabs
        tabs={[
          {
            tab: <span>Desde el inicio...</span>,
            content: (
              <div className="flex flex-col gap-3">
                <TabContentItem
                  icon={<i className="bi bi-brush-fill lg:text-3xl"></i>}
                  title="Funcionalidad, interacción y diseño visual"
                  description="Definición de objetivos y requisitos del proyecto en términos de funcionalidad, interacción y diseño visual."
                />
                <TabContentItem
                  icon={
                    <i className="bi bi-pc-display-horizontal lg:text-3xl"></i>
                  }
                  title="Selección de la plataforma o tecnología adecuada"
                  description="Según los requisitos del cliente y la propuesta a representar."
                />
                <TabContentItem
                  icon={<i className="bi bi-controller lg:text-3xl"></i>}
                  title="Diseño de la arquitectura y estructura del espacio interactivo"
                  description="Teniendo en cuenta la usabilidad, la escalabilidad y la integración con la sala interactiva webRTC."
                />
                <TabContentItem
                  icon={<i className="bi bi-rulers lg:text-3xl"></i>}
                  title="Creación de una maqueta inicial"
                  description="Que permita al cliente visualizar y entender la propuesta a representar inmersiva."
                />
                <TabContentItem
                  icon={<i className="bi bi-person-heart lg:text-3xl"></i>}
                  title="Formación del cliente"
                  description="En el uso de la plataforma o tecnología seleccionada, incluyendo cómo interactuar en el espacio 3D o metaverso y cómo participar en la sala interactiva webRTC."
                />
                <TabContentItem
                  icon={<i className="bi bi-graph-up-arrow lg:text-3xl"></i>}
                  title="Establecimiento de objetivos de medición y análisis"
                  description="Con el fin de evaluar su éxito y eficacia en relación con los objetivos del cliente"
                />
              </div>
            ),
          },
          {
            tab: <span>Sala IDMR e IDMC basados en WebRTC</span>,
            content: (
              <div className="flex flex-col gap-5">
                <p className="text-xs lg:text-base">
                  Salas y canales de medios digitales interactivos que permite a
                  los usuarios acceder y consumir contenido multimedia en tiempo
                  real a través de una variedad de dispositivos, como
                  computadoras, tabletas, teléfonos inteligentes, entre otros.
                  Los IDMC (interactive digital medica channel) pueden ofrecer
                  contenido en una amplia variedad de formatos, como video,
                  audio, imágenes, texto y gráficos, y pueden estar disponibles
                  en línea o a través de redes privadas. La tecnología IDMC
                  permite a los usuarios interactuar con el contenido multimedia
                  y personalizar su experiencia, lo que puede mejorar el
                  compromiso y la retención de la información. Los IDMC se
                  utilizan en diversas áreas, como la educación, el
                  entretenimiento, la publicidad y la comunicación empresarial,
                  entre otros.
                </p>
                <div className="flex flex-col gap-3">
                  <TabContentItem
                    icon={<i className="bi bi-brush-fill lg:text-3xl"></i>}
                    title="Funcionalidad, interacción y diseño visual"
                    description="Definición de objetivos y requisitos del proyecto en términos de funcionalidad, interacción y diseño visual."
                  />
                  <TabContentItem
                    icon={
                      <i className="bi bi-pc-display-horizontal lg:text-3xl"></i>
                    }
                    title="Selección de la plataforma o tecnología adecuada"
                    description="Según los requisitos del cliente y la propuesta a representar."
                  />
                  <TabContentItem
                    icon={<i className="bi bi-controller lg:text-3xl"></i>}
                    title="Diseño de la arquitectura y estructura del espacio interactivo"
                    description="Teniendo en cuenta la usabilidad, la escalabilidad y la integración con la sala interactiva webRTC."
                  />
                  <TabContentItem
                    icon={<i className="bi bi-rulers lg:text-3xl"></i>}
                    title="Creación de una maqueta inicial"
                    description="Que permita al cliente visualizar y entender la propuesta a representar inmersiva."
                  />
                  <TabContentItem
                    icon={<i className="bi bi-person-heart lg:text-3xl"></i>}
                    title="Formación del cliente"
                    description="En el uso de la plataforma o tecnología seleccionada, incluyendo cómo interactuar en el espacio 3D o metaverso y cómo participar en la sala interactiva webRTC."
                  />
                  <TabContentItem
                    icon={<i className="bi bi-graph-up-arrow lg:text-3xl"></i>}
                    title="Establecimiento de objetivos de medición y análisis"
                    description="Con el fin de evaluar su éxito y eficacia en relación con los objetivos del cliente"
                  />
                </div>
                <p className="text-xs lg:text-base">
                  En general, estas propuestas preliminares pueden variar en
                  función de las necesidades específicas del cliente y del
                  proyecto en cuestión.
                </p>
              </div>
            ),
          },
          {
            tab: <span>Programando metaversos 3D interactivos</span>,
            content: (
              <div className="flex flex-col lg:flex-row gap-5 lg:gap-10 justify-center items-center">
                <div className="w-full flex flex-col gap-3">
                  <TabContentItem
                    icon={<i className="bi bi-box lg:text-3xl"></i>}
                    title="Diseño y modelado"
                    description="De entornos y objetos en 3D utilizando herramientas de software especializadas como Blender o Maya."
                  />
                  <TabContentItem
                    icon={<i className="bi-lightning-fill lg:text-3xl"></i>}
                    title="Interacciones y comportamientos"
                    description="Programación de interacciones y comportamientos de los objetos y personajes en el metaverso."
                  />
                  <TabContentItem
                    icon={<i className="bi bi-tools lg:text-3xl"></i>}
                    title="APIs y herramientas externas"
                    description="Integración de APIs y herramientas externas para agregar funcionalidad adicional al metaverso, como la integración de pagos o sistemas de chat."
                  />
                  <TabContentItem
                    icon={
                      <i className="bi bi-shield-fill-check lg:text-3xl"></i>
                    }
                    title="Sistemas de seguridad y privacidad"
                    description="Desarrollo de sistemas de seguridad y privacidad para proteger la información y los datos de los usuarios."
                  />
                  <TabContentItem
                    icon={<i className="bi bi-calendar-date lg:text-3xl"></i>}
                    title="Programación de eventos y actividades"
                    description="Programación de eventos y actividades en el metaverso, como conciertos virtuales o conferencias en línea."
                  />
                  <TabContentItem
                    icon={<i className="bi bi-robot lg:text-3xl"></i>}
                    title="Inteligencia artificial"
                    description="Implementación de soluciones de inteligencia artificial y aprendizaje automático para mejorar la experiencia del usuario y personalizar el metaverso."
                  />
                  <TabContentItem
                    icon={<i className="bi bi-headset-vr lg:text-3xl"></i>}
                    title="Realidad virtual"
                    description="Integración de dispositivos de realidad virtual y aumentada para mejorar la inmersión y la interactividad en el metaverso."
                  />
                </div>
                <div className="w-fit h-full flex justify-center items-center lg:p-10">
                  <Button
                    color="blue"
                    onClick={() => {
                      openModal("spatial course modal");
                    }}
                  >
                    <div className="flex flex-col gap-1 lg:gap-3 lg:px-5 lg:py-2">
                      <span className="text-xs lg:text-xl whitespace-nowrap">
                        Curso Virtual
                      </span>
                      <span className="lg:text-3xl whitespace-nowrap">
                        Introducción en el metaverso
                        <br />
                        Spatial
                      </span>
                    </div>
                  </Button>
                </div>
              </div>
            ),
          },
        ]}
      />
    </section>,
    <SpatialCourseModal key={"spatial-course-modal"} formDefinition={spatialFormDefinition} />,
  ];
};

export default TabsSection;
