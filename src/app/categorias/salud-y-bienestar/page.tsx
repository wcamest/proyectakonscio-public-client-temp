import AccessCards from '@/components/pages/categories/AccessCards';
import CarouselSection from '@/components/pages/categories/CarouselSection';
import ContentLabel from '@/components/pages/categories/ContentLabel';
import TromSection from '@/components/pages/categories/TromSection';
import Content from '@/components/pages/categories/salud-y-bienestar/Content';
import VideoBanner from '@/components/pages/categories/VideoBanner';
import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Salud y bienestar - Proyecta Konscio',
  description:
    'Recursos, prácticas y propuestas para el bienestar físico y mental, con enfoque comunitario y preventivo.',
}

const page = () => {
  const contentLabelValue =
    "En el Bosque de la Salud y Nutrición";

  return (
    <div className="flex flex-col">
      <VideoBanner
        color="pink"
        title="Salud y Bienestar"
        subtitle="Bosque de la Salud y Nutrición"
        videoUrl="/videos/16 - Health.mp4"
      />
      <ContentLabel color="pink">{contentLabelValue}</ContentLabel>
      <Content />
      <ContentLabel color="pink">{contentLabelValue}</ContentLabel>
      <TromSection color="pink" />
      <AccessCards />
    </div>
  );
};

export default page