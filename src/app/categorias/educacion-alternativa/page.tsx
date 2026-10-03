import AccessCards from "@/components/pages/categories/AccessCards";
import CarouselSection from "@/components/pages/categories/CarouselSection";
import ContentLabel from "@/components/pages/categories/ContentLabel";
import TromSection from "@/components/pages/categories/TromSection";
import Content from "@/components/pages/categories/educacion-alternativa/Content";
import VideoBanner from "@/components/pages/categories/VideoBanner";
import React from "react";
import type { Metadata } from 'next'
import Slide1 from "@/components/pages/categories/educacion-alternativa/carousel/Slide1";
import Slide2 from "@/components/pages/categories/educacion-alternativa/carousel/Slide2";
import Slide3 from "@/components/pages/categories/educacion-alternativa/carousel/Slide3";
import Slide4 from "@/components/pages/categories/educacion-alternativa/carousel/Slide4";
import Slide5 from "@/components/pages/categories/educacion-alternativa/carousel/Slide5";
import Slide6 from "@/components/pages/categories/educacion-alternativa/carousel/Slide6";
import Slide7 from "@/components/pages/categories/educacion-alternativa/carousel/Slide7";
import Slide8 from "@/components/pages/categories/educacion-alternativa/carousel/Slide8";
import Slide9 from "@/components/pages/categories/educacion-alternativa/carousel/Slide9";
import { PUBLIC_FORM_IDS } from "@/config/publicFormIds";
import { getPublicFormDefinition } from "@/lib/forms/publicForms.server";

export const metadata: Metadata = {
  title: 'Educación alternativa - Proyecta Konscio',
  description:
    'Metodologías, cursos y materiales para una educación crítica, creativa y transformadora en contextos comunitarios.',
}

const page = async () => {
  const contentLabelValue = "En la Avenida de la Educación Trascendente";

  const [teacherFormDefinition, studentFormDefinition] = await Promise.all([
    getPublicFormDefinition(
      PUBLIC_FORM_IDS.alternativeEducationRetiredTeacher,
    ),
    getPublicFormDefinition(PUBLIC_FORM_IDS.alternativeEducationStudent),
  ]);

  return (
    <div className="flex flex-col">
      <VideoBanner
        color="orange"
        title="Educación Alternativa"
        subtitle="Avenida de la Educación Trascendente"
        videoUrl="/videos/1.mp4"
      />
      <ContentLabel color="orange">{contentLabelValue}</ContentLabel>
      <Content />
      <ContentLabel color="orange">{contentLabelValue}</ContentLabel>
      <TromSection color="orange" />
      <CarouselSection
        slides={[
          <Slide1 key={0} />,
          <Slide2 key={1} />,
          <Slide3 key={2} />,
          <Slide4 key={3} />,
          <Slide5 key={4} />,
          <Slide6 key={5} />,
          <Slide7 key={6} teacherFormDefinition={teacherFormDefinition} />,
          <Slide8 key={7} studentFormDefinition={studentFormDefinition} />,
          <Slide9 key={8} />,
        ]}
      />
      <AccessCards />
    </div>
  );
};

export default page;
