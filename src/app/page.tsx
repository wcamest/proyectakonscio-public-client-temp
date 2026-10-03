import VideoPlayer from "@/components/ui/VideoPlayer";
import type { Metadata } from "next";
import RedSocialKonscio from "../components/pages/home/RedSocialKonscio";
import AccordionSection from "@/components/pages/home/AccordionSection";
import RealidadConsciente from "@/components/pages/home/RealidadConsciente";
import FlipBoxes from "@/components/pages/home/FlipBoxes";
import EtiquetaPropuestas from "@/components/pages/home/EtiquetaPropuestas";
import Propuestas from "@/components/pages/home/Propuestas";

export const metadata: Metadata = {
  title: "Inicio - Proyecta Konscio",
  description:
    "La Fundación Proyecta Konscio es una organización sin ánimo de lucro enfocada en la educación, la conciencia social y el uso de tecnologías digitales. Descubre proyectos comunitarios, formación y recursos interactivos.",
};

const Page = () => {
  return (
    <main className="w-full flex flex-col">
      <section>
        <VideoPlayer autoPlay muted>
          <source src="/videos/37%20-%20Earth.mp4" type="video/mp4" />
        </VideoPlayer>
      </section>
      <RedSocialKonscio />
      <AccordionSection />
      <RealidadConsciente />
      <FlipBoxes />
      <EtiquetaPropuestas />
      <Propuestas />
    </main>
  );
};

export default Page;
