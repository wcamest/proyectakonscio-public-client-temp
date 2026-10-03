import AccessCards from '@/components/pages/categories/AccessCards';
import CarouselSection from '@/components/pages/categories/CarouselSection';
import ContentLabel from '@/components/pages/categories/ContentLabel';
import TromSection from '@/components/pages/categories/TromSection';
import Content from '@/components/pages/categories/innovaciones-tecnologicas/Content';
import VideoBanner from '@/components/pages/categories/VideoBanner';
import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Innovaciones tecnológicas - Proyecta Konscio',
  description:
    'Proyectos, talleres y recursos sobre tecnologías abiertas, WebRTC y herramientas para la participación y la creación colectiva.',
}

const page = () => {
  const contentLabelValue =
    "Parque de las Innovaciones Tecnológicas";

  return (
    <div className="flex flex-col">
      <VideoBanner
        color="blue"
        title="Innovaciones Tecnológicas"
        subtitle="Parque de las Innovaciones Tecnológicas"
        videoUrl="/videos/33 - Technology.mp4"
      />
      <ContentLabel color="blue">{contentLabelValue}</ContentLabel>
      <Content />
      <ContentLabel color="blue">{contentLabelValue}</ContentLabel>
      <TromSection color="blue" />
      <AccessCards />
    </div>
  );
};

export default page