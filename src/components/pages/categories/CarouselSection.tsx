import Carousel from '@/components/ui/Carousel'
import React from 'react'

type Props = {
    slides: React.ReactNode[];
}

const CarouselSection = (props: Props) => {

    const { slides } = props;

  return (
    <div className="flex flex-col justify-center px-10 pt-10">
        <Carousel slides={slides} />
    </div>
  )
}

export default CarouselSection