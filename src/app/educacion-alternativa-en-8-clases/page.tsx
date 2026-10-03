import AccordionSection from '@/components/pages/educacion-alternativa-en-8-clases/AccordionSection'
import EducacionProhibida from '@/components/pages/educacion-alternativa-en-8-clases/EducacionProhibida'
import FlipBoxSection from '@/components/pages/educacion-alternativa-en-8-clases/FlipBoxSection'
import InfoSection from '@/components/pages/educacion-alternativa-en-8-clases/InfoSection'
import MediaBanner from '@/components/ui/MediaBanner'
import Image from 'next/image'
import React from 'react'
import type { Metadata } from 'next'

const page = () => {
  return (
    <main className='flex flex-col'>
        <MediaBanner
        media={
          <div className="w-full h-full relative overflow-hidden">
            <Image
              src="/images/educacion-alternativa-8-clases.avif"
              alt="casa"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        }
        label={
          <div className="bg-green-500/80 text-white flex flex-col gap-1 lg:gap-2 justify-center items-center p-5 lg:p-10 bg-opacity-60">
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold">
              Educación alternativa en 8 clases
            </h1>
          </div>
        }
        labelVisible
      />
      <InfoSection />
      <AccordionSection />
      <FlipBoxSection />
      <EducacionProhibida />
    </main>
  )
}

export default page

export const metadata: Metadata = {
  title: 'Educación alternativa en 8 clases - Proyecta Konscio',
  description:
    'Una introducción práctica en 8 clases sobre metodologías de educación alternativa, recursos, ejercicios y reflexiones para docentes y aprendices.',
}