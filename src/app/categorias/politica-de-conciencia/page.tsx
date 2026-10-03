import AccessCards from '@/components/pages/categories/AccessCards';
import CarouselSection from '@/components/pages/categories/CarouselSection';
import ContentLabel from '@/components/pages/categories/ContentLabel';
import TromSection from '@/components/pages/categories/TromSection';
import Content from '@/components/pages/categories/politica-de-conciencia/Content';
import VideoBanner from '@/components/pages/categories/VideoBanner';
import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de conciencia - Proyecta Konscio',
  description:
    'Debates, propuestas y recursos para una participación política ética, inclusiva y orientada al bien común.',
}

const page = () => {
  const contentLabelValue =
    "En la Gran Via Política para gente decente";

  return (
    <div className="flex flex-col">
      <VideoBanner
        color="purple"
        title="Política de Conciencia"
        subtitle="Gran Vía Política para gente decente"
        videoUrl="/videos/2.mp4"
      />
      <ContentLabel color="purple">{contentLabelValue}</ContentLabel>
      <Content />
      <ContentLabel color="purple">{contentLabelValue}</ContentLabel>
      <TromSection color="purple" />
      <AccessCards />
    </div>
  );
};

export default page