import Accordion from '@/components/ui/Accordion'
import AccordionItem from '@/components/ui/AccordionItem'
import React from 'react'

type AccordionEntry = {
  id: string;
  title: string;
  paragraphs: string[];
};

const accordionEntries: AccordionEntry[] = [
  {
    id: "100% online y a tu ritmo",
    title: "100% Online y a tu ritmo",
    paragraphs: [
      "una experiencia que te permite participar en cualquier lugar desde tu PC, móvil o tablet. Todo nuestro material, archivos e intercambios estarán disponibles en un grupo cerrado para acceder cuando lo desees.",
    ],
  },
  {
    id: "perspectiva critica e integral",
    title: "Perspectiva critica e integral",
    paragraphs: [
      "es el único curso que construye una perspectiva integral de la educación alternativa, basada en el conocimiento concreto de experiencias reales en más de 12 países. Nuestra mirada integral es clave para escuelas, espacios alternativos o la crianza y acompañamiento de la infancia.",
    ],
  },
  {
    id: "accesso ilimitado",
    title: "Acceso ilimitado",
    paragraphs: [
      "El curso comienza cuando tu lo decidas. No tiene una fecha de inicio, ni un tiempo limitado. Puedes ver los materiales las veces y durante el tiempo que desees."
    ],
  },
];

const AccordionSection = () => {
  return (
    <section className='p-8 flex justify-center items-center'>
       <div className='w-full max-w-5xl'>
        <Accordion>
            {accordionEntries.map((entry) => (
            <AccordionItem
              key={entry.id}
              id={entry.id}
              headerClassName="bg-green-600 p-5 text-2xl font-bold text-white"
              header={
                <div className="flex items-center gap-5">
                  <span className="uppercase">{entry.title}</span>
                </div>
              }
            >
              <div className="p-5 flex flex-col gap-4">
                {entry.paragraphs.map((paragraph, index) => (
                  <p key={`${entry.id}-${index}`}>{paragraph}</p>
                ))}
              </div>
            </AccordionItem>
          ))}
        </Accordion> 
       </div>
    </section>
  )
}

export default AccordionSection