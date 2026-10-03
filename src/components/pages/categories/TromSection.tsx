"use client"

import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import VideoPlaylist from "@/components/ui/VideoPlaylist";
import { useModal } from "@/providers/ModalProvider";
import type { ThemeColor } from "@/types/themeColor";
import { VideoPlaylistCategoryData } from "@/types/videoPlayer";
import Image from "next/image";

type TromSectionProps = {
  color?: ThemeColor;
};

const tromDocumentary: VideoPlaylistCategoryData[] = [
  {
    name: "Conocimiento",
    videos: [
      {
        name: "Science",
        url: "/videos/trom_documentary/02 - Science.mp4",
        thumbnail:
          "/videos/trom_documentary/thumbnails/thumbnail_02 - Science.jpg",
      },
      {
        name: "Evolution of Everything",
        url: "/videos/trom_documentary/03 - Evolution of Everything.mp4",
        thumbnail:
          "/videos/trom_documentary/thumbnails/thumbnail_03 - Evolution of Everything.jpg",
      },
      {
        name: "Environment",
        url: "/videos/trom_documentary/04 - Environment.mp4",
        thumbnail:
          "/videos/trom_documentary/thumbnails/thumbnail_04 - Environment.jpg",
      },
    ],
  },
  {
    name: "Presente",
    videos: [
      {
        name: "Monetary System- Intro",
        url: "/videos/trom_documentary/05 - Monetary System- Intro.mp4",
        thumbnail:
          "/videos/trom_documentary/thumbnails/thumbnail_05 - Monetary System- Intro.jpg",
      },
      {
        name: "Documents",
        url: "/videos/trom_documentary/06 - Documents.mp4",
        thumbnail:
          "/videos/trom_documentary/thumbnails/thumbnail_06 - Documents.jpg",
      },
      {
        name: "Educational system",
        url: "/videos/trom_documentary/07 - Educational system.mp4",
        thumbnail:
          "/videos/trom_documentary/thumbnails/thumbnail_07 - Educational system.jpg",
      },
      {
        name: "Work",
        url: "/videos/trom_documentary/08 - Work.mp4",
        thumbnail:
          "/videos/trom_documentary/thumbnails/thumbnail_08 - Work.jpg",
      },
      {
        name: "Profit",
        url: "/videos/trom_documentary/09 - Profit.mp4",
        thumbnail:
          "/videos/trom_documentary/thumbnails/thumbnail_09 - Profit.jpg",
      },
      {
        name: "Politicians, voting and democracy",
        url: "/videos/trom_documentary/10 - Politicians, voting and democracy.mp4",
        thumbnail:
          "/videos/trom_documentary/thumbnails/thumbnail_10 - Politicians, voting and democracy.jpg",
      },
      {
        name: "Language",
        url: "/videos/trom_documentary/11 - Language.mp4",
        thumbnail:
          "/videos/trom_documentary/thumbnails/thumbnail_11 - Language.jpg",
      },
      {
        name: "Laws",
        url: "/videos/trom_documentary/12 - Laws.mp4",
        thumbnail:
          "/videos/trom_documentary/thumbnails/thumbnail_12 - Laws.jpg",
      },
      {
        name: "Justice",
        url: "/videos/trom_documentary/13 - Justice.mp4",
        thumbnail:
          "/videos/trom_documentary/thumbnails/thumbnail_13 - Justice.jpg",
      },
      {
        name: "Consumption and poor quality",
        url: "/videos/trom_documentary/14 - Consumption and poor quality.mp4",
        thumbnail:
          "/videos/trom_documentary/thumbnails/thumbnail_14 - Consumption and poor quality.jpg",
      },
      {
        name: "Food and Water",
        url: "/videos/trom_documentary/15 - Food and Water.mp4",
        thumbnail:
          "/videos/trom_documentary/thumbnails/thumbnail_15 - Food and Water.jpg",
      },
      {
        name: "Health",
        url: "/videos/trom_documentary/16 - Health.mp4",
        thumbnail:
          "/videos/trom_documentary/thumbnails/thumbnail_16 - Health.jpg",
      },
      {
        name: "Peace and Freedom",
        url: "/videos/trom_documentary/17 - Peace and freedom.mp4",
        thumbnail:
          "/videos/trom_documentary/thumbnails/thumbnail_17 - Peace and freedom.jpg",
      },
      {
        name: "Wars, weapons and law people",
        url: "/videos/trom_documentary/18 - Wars, weapons and law people.mp4",
        thumbnail:
          "/videos/trom_documentary/thumbnails/thumbnail_18 - Wars, weapons and law people.jpg",
      },
      {
        name: "Slavery",
        url: "/videos/trom_documentary/19 - Slavery.mp4",
        thumbnail:
          "/videos/trom_documentary/thumbnails/thumbnail_19 - Slavery.jpg",
      },
      {
        name: "Advertising",
        url: "/videos/trom_documentary/20 - Advertising.mp4",
        thumbnail:
          "/videos/trom_documentary/thumbnails/thumbnail_20 - Advertising.jpg",
      },
      {
        name: "Beauty and Design",
        url: "/videos/trom_documentary/21 - Beauty and Design.mp4",
        thumbnail:
          "/videos/trom_documentary/thumbnails/thumbnail_21 - Beauty and Design.jpg",
      },
      {
        name: "Talent and creativity",
        url: "/videos/trom_documentary/22 - Talent and creativity.mp4",
        thumbnail:
          "/videos/trom_documentary/thumbnails/thumbnail_22 - Talent and creativity.jpg",
      },
      {
        name: "Sense of ownership and social status",
        url: "/videos/trom_documentary/23 - Sense of ownership and social status.mp4",
        thumbnail:
          "/videos/trom_documentary/thumbnails/thumbnail_23 - Sense of ownership and social status.jpg",
      },
      {
        name: "Self confidence",
        url: "/videos/trom_documentary/24 - Self confidence.mp4",
        thumbnail:
          "/videos/trom_documentary/thumbnails/thumbnail_24 - Self confidence.jpg",
      },
      {
        name: "Family and Love",
        url: "/videos/trom_documentary/25 - Family and Love.mp4",
        thumbnail:
          "/videos/trom_documentary/thumbnails/thumbnail_25 - Family and Love.jpg",
      },
      {
        name: "Religion",
        url: "/videos/trom_documentary/26 - Religion.mp4",
        thumbnail:
          "/videos/trom_documentary/thumbnails/thumbnail_26 - Religion.jpg",
      },
      {
        name: "UFOs and extraterrestrial life",
        url: "/videos/trom_documentary/27 - UFOs and extraterrestrial life.mp4",
        thumbnail:
          "/videos/trom_documentary/thumbnails/thumbnail_27 - UFOs and extraterrestrial life.jpg",
      },
      {
        name: "Mystery and paranormal powers",
        url: "/videos/trom_documentary/28 - Mystery and paranormal powers.mp4",
        thumbnail:
          "/videos/trom_documentary/thumbnails/thumbnail_28 - Mystery and paranormal powers.jpg",
      },
      {
        name: "Luck",
        url: "/videos/trom_documentary/29 - Luck.mp4",
        thumbnail:
          "/videos/trom_documentary/thumbnails/thumbnail_29 - Luck.jpg",
      },
      {
        name: "Death",
        url: "/videos/trom_documentary/30 - Death.mp4",
        thumbnail:
          "/videos/trom_documentary/thumbnails/thumbnail_30 - Death.jpg",
      },
      {
        name: "Limitation",
        url: "/videos/trom_documentary/31 - Limitation.mp4",
        thumbnail:
          "/videos/trom_documentary/thumbnails/thumbnail_31 - Limitation.jpg",
      },
      {
        name: "Questions and the Collapse",
        url: "/videos/trom_documentary/32 - Questions and the Collapse.mp4",
        thumbnail:
          "/videos/trom_documentary/thumbnails/thumbnail_32 - Questions and the Collapse.jpg",
      },
    ],
  },
  {
    name: "Soluciones",
    videos: [
      {
        name: "Technology",
        url: "/videos/trom_documentary/33 - Technology.mp4",
        thumbnail:
          "/videos/trom_documentary/thumbnails/thumbnail_33 - Technology.jpg",
      },
      {
        name: "Resource Based Economy",
        url: "/videos/trom_documentary/34 - Resource Based Economy.mp4",
        thumbnail:
          "/videos/trom_documentary/thumbnails/thumbnail_34 - Resource Based Economy.jpg",
      },
    ],
  },
  {
    name: "Reaccionar",
    videos: [
      {
        name: "The Dilemma",
        url: "/videos/trom_documentary/35 - The Dilemma.mp4",
        thumbnail:
          "/videos/trom_documentary/thumbnails/thumbnail_35 - The Dilemma.jpg",
      },
      {
        name: "Imagine",
        url: "/videos/trom_documentary/36 - Imagine.mp4",
        thumbnail:
          "/videos/trom_documentary/thumbnails/thumbnail_36 - Imagine.jpg",
      },
      {
        name: "Earth",
        url: "/videos/trom_documentary/37 - Earth.mp4",
        thumbnail:
          "/videos/trom_documentary/thumbnails/thumbnail_37 - Earth.jpg",
      },
    ],
  },
];

const sectionColorClasses: Record<
  ThemeColor,
  { border: string; panel: string }
> = {
  slate: { border: "border-slate-500", panel: "bg-slate-200 text-slate-900" },
  gray: { border: "border-gray-500", panel: "bg-gray-200 text-gray-900" },
  zinc: { border: "border-zinc-500", panel: "bg-zinc-200 text-zinc-900" },
  blue: { border: "border-blue-500", panel: "bg-blue-200 text-blue-900" },
  indigo: {
    border: "border-indigo-500",
    panel: "bg-indigo-200 text-indigo-900",
  },
  sky: { border: "border-sky-500", panel: "bg-sky-200 text-sky-900" },
  cyan: { border: "border-cyan-500", panel: "bg-cyan-200 text-cyan-900" },
  teal: { border: "border-teal-500", panel: "bg-teal-200 text-teal-900" },
  green: { border: "border-green-500", panel: "bg-green-200 text-green-900" },
  emerald: {
    border: "border-emerald-500",
    panel: "bg-emerald-200 text-emerald-900",
  },
  lime: { border: "border-lime-500", panel: "bg-lime-200 text-lime-900" },
  yellow: {
    border: "border-yellow-500",
    panel: "bg-yellow-200 text-yellow-900",
  },
  orange: {
    border: "border-orange-500",
    panel: "bg-orange-200 text-orange-900",
  },
  violet: {
    border: "border-violet-500",
    panel: "bg-violet-200 text-violet-900",
  },
  purple: {
    border: "border-purple-500",
    panel: "bg-purple-200 text-purple-900",
  },
  fuchsia: {
    border: "border-fuchsia-500",
    panel: "bg-fuchsia-200 text-fuchsia-900",
  },
  pink: { border: "border-pink-500", panel: "bg-pink-200 text-pink-900" },
  amber: { border: "border-amber-500", panel: "bg-amber-200 text-amber-900" },
  red: { border: "border-red-500", panel: "bg-red-200 text-red-900" },
  stone: { border: "border-stone-500", panel: "bg-stone-200 text-stone-900" },
  rose: { border: "border-rose-500", panel: "bg-rose-200 text-rose-900" },
  neutral: {
    border: "border-neutral-500",
    panel: "bg-neutral-200 text-neutral-900",
  },
};

const TromSection = ({ color = "blue" }: TromSectionProps) => {
  const colorClasses = sectionColorClasses[color];
  const {openModal, closeModal} = useModal();

  return [
    <section key={"section"} className="px-10 pt-10">
      <div
        className={`${colorClasses.border} border border-solid flex flex-col lg:flex-row`}
      >
        <div className={`${colorClasses.panel} p-5`}>
          <p>
            El documental TROM intenta presentar, de forma simplista, el mundo
            en el que vivimos los seres humanos. Tratamos de presentar el mundo
            que se ha descubierto hasta ahora a través de los lentes de la
            ciencia: desde la evolución de todo (incluidos nosotros) hasta el
            sistema monetario (el juego que jugamos actualmente), hasta un tipo
            diferente de mundo que podríamos construir para el beneficio de
            todos nosotros, luego de regreso a la Tierra. Estamos tratando de
            presentar alternativas de solución a los problemas actuales y tener
            en cuenta el futuro, que promete ser más que interesante. Un
            documental informativo, quizás impactante y perturbador para muchos,
            dependiendo de cómo digieras la información. El documental está
            dividido en capítulos y subcapítulos debido a la extensa duración
            del documental (14 horas) y todas las partes están conectadas por lo
            que recomendamos verlas en orden
          </p>
        </div>

        <div
          className="relative p-10 flex flex-col gap-5 md:gap-10 bg-cover bg-center justify-center items-center"
          style={{ backgroundImage: 'url("/images/trom_banner.avif")' }}
        >
          <div className="absolute left-0 top-0 size-full bg-white bg-opacity-60" />

          <div className="flex w-full gap-8 justify-center z-10">
            <div>
              <div className="relative w-28 md:w-36 h-12 overflow-hidden">
                <Image
                  src="/images/logo_with_text.svg"
                  alt="Proyecta Konscio Logo"
                  fill
                  sizes="(min-width: 768px) 144px, 112px"
                  className="object-contain"
                />
              </div>
            </div>

            <div>
              <div className="relative w-28 md:w-36 h-12 overflow-hidden">
                <Image
                  src="/images/trom-logo.avif"
                  alt="Proyecta Konscio Logo"
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          <Button color={color} className="z-10 w-full" onClick={() => {
            openModal("trom video player modal")
          }}>
            Reproducir
          </Button>
        </div>
      </div>
    </section>,
    <Modal
      key={"trom-video-player-modal"}
      id="trom video player modal"
      className="size-full"
    >
      <div className="size-full overflow-hidden flex flex-col ">
        <VideoPlaylist data={tromDocumentary} />
        <div className="flex lg:justify-end p-2">
          <Button className="w-full lg:w-auto" onClick={() => {
            closeModal("trom video player modal")
          }}>Cerrar</Button>
        </div>
      </div>
    </Modal>,
  ];
};

export default TromSection;
