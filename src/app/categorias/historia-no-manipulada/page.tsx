import AccessCards from '@/components/pages/categories/AccessCards';
import CarouselSection from '@/components/pages/categories/CarouselSection';
import ContentLabel from '@/components/pages/categories/ContentLabel';
import TromSection from '@/components/pages/categories/TromSection';
import Content from '@/components/pages/categories/historia-no-manipulada/Content';
import VideoBanner from '@/components/pages/categories/VideoBanner';
import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Historia no manipulada - Proyecta Konscio',
  description:
    'Recursos y reflexiones sobre historia sin manipulación, investigación crítica y memoria colectiva para el aprendizaje ciudadano.',
}

const page = () => {
  const contentLabelValue =
    "Rio de la Historia No Manipulada";

  return (
    <div className="flex flex-col">
      <VideoBanner
        color="orange"
        title="Historia No Manipulada"
        subtitle="Rio de la Historia No Manipulada"
        videoUrl="/videos/11 - Language.mp4"
      />
      <ContentLabel color="orange">{contentLabelValue}</ContentLabel>
      <Content />
      <ContentLabel color="orange">{contentLabelValue}</ContentLabel>
      <TromSection color="orange" />
      <AccessCards />
    </div>
  );
};

export default page