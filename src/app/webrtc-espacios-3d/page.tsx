import FlipBoxes from "@/components/pages/webrtc-espacios-3d/FlipBoxes";
import InfoSection from "@/components/pages/webrtc-espacios-3d/InfoSection";
import Interactive3DBanner from "@/components/pages/webrtc-espacios-3d/Interactive3DBanner";
import TabsSection from "@/components/pages/webrtc-espacios-3d/TabsSection";
import { PUBLIC_FORM_IDS } from "@/config/publicFormIds";
import { getPublicFormDefinition } from "@/lib/forms/publicForms.server";
import React from "react";
import type { Metadata } from 'next'

const page = async () => {
  const [webrtcFormDefinition, spatialFormDefinition] = await Promise.all([
    getPublicFormDefinition(PUBLIC_FORM_IDS.webrtcCourseRegistration),
    getPublicFormDefinition(PUBLIC_FORM_IDS.spatialCourseRegistration),
  ]);

  return (
    <main className="flex flex-col">
      <Interactive3DBanner />
      <InfoSection />
      <FlipBoxes webrtcFormDefinition={webrtcFormDefinition} />
      <TabsSection spatialFormDefinition={spatialFormDefinition} />
    </main>
  );
};

export default page;

export const metadata: Metadata = {
  title: 'WebRTC y espacios 3D - Proyecta Konscio',
  description:
    'Proyectos, talleres y recursos sobre espacios 3D en tiempo real usando WebRTC y tecnologías interactivas para participación y aprendizaje.',
}
