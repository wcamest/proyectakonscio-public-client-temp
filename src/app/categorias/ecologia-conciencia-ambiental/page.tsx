import AccessCards from '@/components/pages/categories/AccessCards';
import CarouselSection from '@/components/pages/categories/CarouselSection';
import ContentLabel from '@/components/pages/categories/ContentLabel';
import TromSection from '@/components/pages/categories/TromSection';
import Content from '@/components/pages/categories/ecologia-conciencia-ambiental/Content';
import VideoBanner from '@/components/pages/categories/VideoBanner';
import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Conciencia ambiental - Proyecta Konscio',
  description:
    'Iniciativas, guías y proyectos sobre ecología práctica, sostenibilidad y acciones comunitarias para cuidar el entorno.',
}

const page = () => {
  const contentLabelValue =
    "En la Costa Ecología - Conciencia ambiental";

  return (
    <div className="flex flex-col">
      <VideoBanner
        color="stone"
        title="Conciencia Ambiental"
        subtitle="Costa Ecología"
        videoUrl="/videos/15 - Food and Water.mp4"
      />
      <ContentLabel color="stone">{contentLabelValue}</ContentLabel>
      <Content />
      <ContentLabel color="stone">{contentLabelValue}</ContentLabel>
      <TromSection color="stone" />
      <AccessCards />
    </div>
  );
};

export default page