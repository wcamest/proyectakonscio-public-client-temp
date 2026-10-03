import AccessCards from "@/components/pages/categories/AccessCards";
import CarouselSection from "@/components/pages/categories/CarouselSection";
import ContentLabel from "@/components/pages/categories/ContentLabel";
import Slide1 from "@/components/pages/categories/economia-real-colaborativa/carousel/Slide1";
import Slide2 from "@/components/pages/categories/economia-real-colaborativa/carousel/Slide2";
import Slide3 from "@/components/pages/categories/economia-real-colaborativa/carousel/Slide3";
import Slide4 from "@/components/pages/categories/economia-real-colaborativa/carousel/Slide4";
import Slide5 from "@/components/pages/categories/economia-real-colaborativa/carousel/Slide5";
import Content from "@/components/pages/categories/economia-real-colaborativa/Content";
import TromSection from "@/components/pages/categories/TromSection";
import VideoBanner from "@/components/pages/categories/VideoBanner";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: 'Economía real y colaborativa - Proyecta Konscio',
  description:
    'Modelos de comercio justo, economía solidaria y proyectos colaborativos para fortalecer comunidades y prácticas sostenibles.',
}

const page = () => {
  const contentLabelValue =
    "En el Puerto de Comercio Justo - Economías Alternativas";

  return (
    <div className="flex flex-col">
      <VideoBanner
        color="blue"
        title="Comercio justo"
        subtitle="Economía real colaborativa"
        videoUrl="/videos/0.mp4"
      />
      <ContentLabel color="blue">{contentLabelValue}</ContentLabel>
      <Content />
      <ContentLabel color="blue">{contentLabelValue}</ContentLabel>
      <TromSection color="blue" />
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

export default page;
