"use client";

import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import VideoPlaylist from "@/components/ui/VideoPlaylist";
import { useModal } from "@/providers/ModalProvider";
import { VideoPlaylistCategoryData } from "@/types/videoPlayer";
import React from "react";

const metaversoCourse: VideoPlaylistCategoryData[] = [
  {
    name: "Metaverso",
    videos: [
      {
        name: "Son o no videojuegos",
        url: "/videos/metaverso/01 - Son o no videojuegos.mp4",
        thumbnail:
          "/videos/metaverso/thumbnails/thumbnail_01 - Son o no videojuegos.jpg",
      },
      {
        name: "Espacios compartidos",
        url: "/videos/metaverso/02 - Espacios compartidos.mp4",
        thumbnail:
          "/videos/metaverso/thumbnails/thumbnail_02 - Espacios compartidos.jpg",
      },
      {
        name: "Teoría de los metaversos - Entre lo físico y lo remoto",
        url: "/videos/metaverso/03 - Teoria de los metaversos - Entre lo fisico y lo remoto.mp4",
        thumbnail:
          "/videos/metaverso/thumbnails/thumbnail_03 - Teoria de los metaversos - Entre lo fisico y lo remoto.jpg",
      },
      {
        name: "Tipos de Espacios Compartidos",
        url: "/videos/metaverso/04 - Tipos de Espacios Compartidos.mp4",
        thumbnail:
          "/videos/metaverso/thumbnails/thumbnail_04 - Tipos de Espacios Compartidos.jpg",
      },
      {
        name: "Características de los Entornos 3D",
        url: "/videos/metaverso/05 - Características de los Entornos 3D.mp4",
        thumbnail:
          "/videos/metaverso/thumbnails/thumbnail_05 - Características de los Entornos 3D.jpg",
      },

      {
        name: "Interacción Basada en Avatares",
        url: "/videos/metaverso/06 - Interacción Basada en Avatares.mp4",
        thumbnail:
          "/videos/metaverso/thumbnails/thumbnail_06 - Interacción Basada en Avatares.jpg",
      },

      {
        name: "Capacidades del Entorno Virtual 3D",
        url: "/videos/metaverso/07 - Capacidades del Entorno Virtual 3D.mp4",
        thumbnail:
          "/videos/metaverso/thumbnails/thumbnail_07 - Capacidades del Entorno Virtual 3D.jpg",
      },

      {
        name: "Un Modelo Socio-Tecnológico",
        url: "/videos/metaverso/08 - Un Modelo Socio-Tecnologico.mp4",
        thumbnail:
          "/videos/metaverso/thumbnails/thumbnail_08 - Un Modelo Socio-Tecnologico.jpg",
      },

      {
        name: "Las Tecnologías de los Comportamientos",
        url: "/videos/metaverso/09 - Las Tecnologías de los Comportamientos.mp4",
        thumbnail:
          "/videos/metaverso/thumbnails/thumbnail_09 - Las Tecnologías de los Comportamientos.jpg",
      },

      {
        name: "Teoría de los metaversos_ El lenguaje no verbal y la confianza",
        url: "/videos/metaverso/10 - Teoria de los metaversos_ El lenguaje no verbal y la confianza.mp4",
        thumbnail:
          "/videos/metaverso/thumbnails/thumbnail_10 - Teoria de los metaversos_ El lenguaje no verbal y la confianza.jpg",
      },

      {
        name: "Modelo de la Aceptación de la Tecnología",
        url: "/videos/metaverso/11 - Modelo de la Aceptación de la Tecnología.mp4",
        thumbnail:
          "/videos/metaverso/thumbnails/thumbnail_11 - Modelo de la Aceptación de la Tecnología.jpg",
      },

      {
        name: "Aceptación de los Mundos Virtuales",
        url: "/videos/metaverso/12 - Aceptación de los Mundos Virtuales.mp4",
        thumbnail:
          "/videos/metaverso/thumbnails/thumbnail_12 - Aceptación de los Mundos Virtuales.jpg",
      },
    ],
  },
];

const MetaversoModal = () => {
  const { closeModal } = useModal();
  return (
    <Modal
      id="metaverso video player modal"
      className="size-full"
    >
      <div className="size-full overflow-hidden flex flex-col ">
        <VideoPlaylist data={metaversoCourse} />
        <div className="flex lg:justify-end p-2">
          <Button
            className="w-full lg:w-auto"
            onClick={() => {
              closeModal("metaverso video player modal");
            }}
          >
            Cerrar
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default MetaversoModal;
