import FlipBoxes from "@/components/pages/colabora/FlipBoxes";
import FormSection from "@/components/pages/colabora/FormSection";
import MediaBanner from "@/components/ui/MediaBanner";
import { PUBLIC_FORM_IDS } from "@/config/publicFormIds";
import { getPublicFormDefinition } from "@/lib/forms/publicForms.server";
import Image from "next/image";
import React from "react";
import type { Metadata } from 'next'

const page = async () => {
  const colaboraFormData = await getPublicFormDefinition(
    PUBLIC_FORM_IDS.colabora,
  );

  return (
    <main className="flex flex-col">
      <MediaBanner
        media={
          <div className="w-full h-full relative overflow-hidden">
            <Image
              src="/images/colabora_banner.avif"
              alt="personas reunidas"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        }
        label={
          <div className="bg-orange-500/80 text-white flex flex-col gap-1 lg:gap-2 justify-center items-center p-5 lg:p-10 bg-opacity-60">
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold">
              Colabora
            </h1>
          </div>
        }
        labelVisible
      />
      <FlipBoxes />
      <FormSection data={colaboraFormData} />
    </main>
  );
};

export default page;

export const metadata: Metadata = {
  title: 'Colabora - Proyecta Konscio',
  description:
    'Participa con Proyecta Konscio: opciones para colaborar, voluntariado, donaciones y propuestas de proyectos comunitarios.',
}
