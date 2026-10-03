import Accordion from "@/components/ui/Accordion";
import AccordionItem from "@/components/ui/AccordionItem";
import React from "react";

type AccordionEntry = {
  id: string;
  title: string;
  iconClass: string;
  paragraphs: string[];
};

const accordionEntries: AccordionEntry[] = [
  {
    id: "mision",
    title: "Misión",
    iconClass: "bi-megaphone-fill",
    paragraphs: [
      "Dar voz a propuestas desarrolladas por organizaciones que cooperan estrechamente con la Fundación, y que pensamos deben ser conocidas por las multitudes, para que cada vez más individuos puedan desarrollar una conciencia global en todos los ámbitos de la existencia humana. Al ser más conscientes, accediendo fácilmente a información veraz, una formación global, con propuestas educacionales alternativas y promoviendo actividades y valores que tienen como bandera los derechos humanos y de la Tierra, tendrán la oportunidad de crecer más plenamente y con recursos suficientes hasta convertirse en conciencia para el cambio social.",
    ],
  },
  {
    id: "vision",
    title: "Visión",
    iconClass: "bi-eye-fill",
    paragraphs: [
      "Todas y todos podemos ser conciencia para el cambio. Un mundo donde cada individuo tenga la libertad, la confianza y el apoyo de la sociedad en su conjunto. La convicción plena de pertenencia a un pueblo que conoce a los demás pueblos de la Tierra, y que tiene muy altos los valores de respeto y paz con sus semejantes. De esta manera crecer en conocimientos para adquirir las herramientas necesarias que los ayudarán a solventar los graves problemas del mundo, y después trascender en sabiduría hasta escalar a otras dimensiones.",
    ],
  },
  {
    id: "asi-lo-hacemos",
    title: "Así lo hacemos",
    iconClass: "bi-star-fill",
    paragraphs: [
      "Fundación Proyecta Konscio presenta y difunde sus propuestas colaborativas apoyándose en tecnologías digitales muy intuitivas, innovadoras y disruptivas donde pasamos de las interfaces transaccionales a plataformas conversacionales, y que están cambiando la manera de interrelación en el mundo. La estrategia se basa en la construcción de entornos digitales en las que reunir un contenido muy vivo, necesario, de conciencia, y hacer que la audiencia se acerque a dichos entornos y se quede para hacer crecer una comunidad permanente.",
      "Transportándote al metaverso de Konscio3D te encuentras, de manera inmersiva, con la confluencia de una multitud de propuestas digitales con las que vas a colaborar. Es la reunión de organizaciones que están desarrollando proyectos con los que fomentar comunidades en torno a actividades que promueven sociedades más desarrolladas en justicia, tolerancia, educación y paz. Konscio3D, una ciudad virtual, propuestas de valor digitales con fórmulas y estrategias que se basan en la cooperación, organizaciones con actividades y eventos referidos a cada categoría de conocimiento que estrechamente se vincula y afecta a las sociedades humanas en su devenir histórico y de evolución de pensamiento.",
      "Nos dirigimos a una audiencia que necesita encontrar propuestas de organizaciones con las que sumar, colaborar y trascender. Nos adentramos en ellas con las tecnologías digitales 3D y WebRTC con alcance en la realidad virtual, inteligencia artificial e IoT, donde podrá acceder a una exposición interactiva de contenido en eventos y actividades como confluencia de organizaciones sociales y de nuestro proyecto como Fundación, llegando a participar en múltiples propuestas que pueden proporcionar herramientas para trascendencia personal vivencial. Universalizar y compartir el conocimiento humano constituye una de las grandes ventajas de Internet y los procesos digitales. Las tecnologías de la información y la comunicación han generado nuevas herramientas para editar, estructurar, difundir y acceder a la cultura.",
    ],
  },
];

const AccordionSection = () => {
  return (
    <section className="flex items-center justify-center p-5 lg:p-8">
      <div className="w-full max-w-5xl">
        <Accordion>
          {accordionEntries.map((entry) => (
            <AccordionItem
              key={entry.id}
              id={entry.id}
              headerClassName="bg-orange-500 p-5 text-2xl font-bold text-white"
              header={
                <div className="flex items-center gap-5">
                  <i className={`bi ${entry.iconClass}`}></i>
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
  );
};

export default AccordionSection;