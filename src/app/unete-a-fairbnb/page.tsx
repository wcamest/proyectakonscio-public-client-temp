import CallSection from "@/components/pages/unete-a-fairbnb/CallSection";
import FormSection from "@/components/pages/unete-a-fairbnb/FormSection";
import MediaBanner from "@/components/ui/MediaBanner";
import { PUBLIC_FORM_IDS } from "@/config/publicFormIds";
import { getPublicFormDefinition } from "@/lib/forms/publicForms.server";
import Image from "next/image";
import React from "react";

const page = async () => {
  const formDefinition = await getPublicFormDefinition(
    PUBLIC_FORM_IDS.fairbnbCollaboration,
  );

  return (
    <main className="flex flex-col">
      <MediaBanner
        media={
          <div className="w-full h-full relative overflow-hidden">
            <Image
              src="/images/unete_a_fairbnb_banner.avif"
              alt="casa"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        }
        label={
          <div className="bg-green-500/80 text-white flex flex-col gap-1 lg:gap-2 justify-center items-center p-5 lg:p-10 bg-opacity-60">
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold">
              Forma parte de FairBNB
            </h1>
          </div>
        }
        labelVisible
      />
      <CallSection />
      <FormSection definition={formDefinition} />
    </main>
  );
};

export default page;
