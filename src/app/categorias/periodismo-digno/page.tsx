import AccessCards from '@/components/pages/categories/AccessCards';
import CarouselSection from '@/components/pages/categories/CarouselSection';
import ContentLabel from '@/components/pages/categories/ContentLabel';
import TromSection from '@/components/pages/categories/TromSection';
import Content from '@/components/pages/categories/periodismo-digno/Content';
import VideoBanner from '@/components/pages/categories/VideoBanner';
import React from 'react'
import type { Metadata } from 'next'
import Slide1 from '@/components/pages/categories/periodismo-digno/carousel/Slide1';
import Slide2 from '@/components/pages/categories/periodismo-digno/carousel/Slide2';
import Slide3 from '@/components/pages/categories/periodismo-digno/carousel/Slide3';
import Slide4 from '@/components/pages/categories/periodismo-digno/carousel/Slide4';
import Slide5 from '@/components/pages/categories/periodismo-digno/carousel/Slide5';

export const metadata: Metadata = {
  title: 'Periodismo digno - Proyecta Konscio',
  description:
    'Proyectos de apoyo al periodismo ciudadano, verificación y narrativas responsables para fortalecer la información independiente.',
}

const page = () => {
  const contentLabelValue =
    "Café - Redacción del Periodismo Digno Ciudadano";

  return (
    <div className="flex flex-col">
      <VideoBanner
        color="yellow"
        title="Periodismo Digno"
        subtitle="Café - Redacción Periodismo Digno Ciudadano"
        videoUrl="/videos/20 - Advertising.mp4"
      />
      <ContentLabel color="yellow">{contentLabelValue}</ContentLabel>
      <Content />
      <ContentLabel color="yellow">{contentLabelValue}</ContentLabel>
      <TromSection color="yellow" />
      <CarouselSection slides={[
        <Slide1 key={0} />,
        <Slide2 key={1} />,
        <Slide3 key={2} />,
        <Slide4 key={3} />,
        <Slide5 key={4} />,
        
      ]} />
      <AccessCards />
    </div>
  );
};

export default page