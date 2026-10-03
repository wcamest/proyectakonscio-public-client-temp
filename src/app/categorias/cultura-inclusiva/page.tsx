import AccessCards from "@/components/pages/categories/AccessCards";
import CarouselSection from "@/components/pages/categories/CarouselSection";
import ContentLabel from "@/components/pages/categories/ContentLabel";
import TromSection from "@/components/pages/categories/TromSection";
import Content from "@/components/pages/categories/cultura-inclusiva/Content";
import VideoBanner from "@/components/pages/categories/VideoBanner";
import React from "react";
import Slide1 from "@/components/pages/categories/cultura-inclusiva/carousel/Slide1";
import Slide2 from "@/components/pages/categories/cultura-inclusiva/carousel/Slide2";
import Slide3 from "@/components/pages/categories/cultura-inclusiva/carousel/Slide3";
import Slide4 from "@/components/pages/categories/cultura-inclusiva/carousel/Slide4";
import Slide5 from "@/components/pages/categories/cultura-inclusiva/carousel/Slide5";
import Slide6 from "@/components/pages/categories/cultura-inclusiva/carousel/Slide6";
import Slide7 from "@/components/pages/categories/cultura-inclusiva/carousel/Slide7";
import { PUBLIC_FORM_IDS } from "@/config/publicFormIds";
import { getPublicFormDefinition } from "@/lib/forms/publicForms.server";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cultura inclusiva - Proyecta Konscio",
  description:
    "Proyecta Konscio promueve la creatividad, la inclusión y el acceso cultural mediante proyectos, talleres y recursos para comunidades y educadores.",
};

const page = async () => {
  const contentLabelValue =
    "La cultura es el cuarto pilar del desarrollo sostenible";

  const [teacherFormDefinition, studentFormDefinition] = await Promise.all([
    getPublicFormDefinition(PUBLIC_FORM_IDS.inclusiveCultureTeacher),
    getPublicFormDefinition(PUBLIC_FORM_IDS.inclusiveCultureStudent),
  ]);

  return (
    <div className="flex flex-col">
      <VideoBanner
        color="green"
        title="Cultura Inclusiva"
        subtitle="Fomentando la Creatividad y la Diversidad"
        videoUrl="/videos/04 - Environment.mp4"
      />
      <ContentLabel color="green">{contentLabelValue}</ContentLabel>
      <Content />
      <ContentLabel color="green">{contentLabelValue}</ContentLabel>
      <TromSection color="green" />
      <CarouselSection
        slides={[
          <Slide1 key={0} />,
          <Slide2 key={1} />,
          <Slide3 key={2} />,
          <Slide4 key={3} />,
          <Slide5 key={4} />,
          <Slide6
            key={5}
            teacherFormDefinition={teacherFormDefinition}
            studentFormDefinition={studentFormDefinition}
          />,
          <Slide7 key={6} />,
        ]}
      />
      <AccessCards />
    </div>
  );
};

export default page;
