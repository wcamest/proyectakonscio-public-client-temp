import FlipBox from "@/components/ui/FlipBox";
import React from "react";

type Category = {
  title: React.ReactNode;
  time: string;
  description: string;
  bgClass: string;
};

const categories: Category[] = [
  {
    title: (
      <>
        Asesores, Conectores y
        <br />
        Promotores Casuales
      </>
    ),
    time: "1-2 horas al mes",
    description:
      "Aunque estes ocupado, puedes tomar algun tipo de accion que beneficie al proyecto. Por ejemplo, publicar un enlace en tus medios de comunicacion favoritos podria llevar a la persona adecuada a descubrir el proyecto. Ningun consejo o accion es demasiado pequeno. Unete a nosotros con solo 1-2 horas al mes.",
    bgClass: "bg-fuchsia-500",
  },
  {
    title: (
      <>
        Mentores, animadores y
        <br />
        Consultores
      </>
    ),
    time: "5-10 horas al mes",
    description:
      "Como mentor, puedes sentarte con nosotros o con uno de nuestros miembros para brindar informacion valiosa que impulse nuestro proyecto en la direccion correcta. Como animador, comparte nuestro contenido en tus canales sociales y ayuda a difundir nuestro mensaje. Y como consultor, comprometete a tareas especificas que contribuyan al exito del proyecto.",
    bgClass: "bg-indigo-800",
  },
  {
    title: "Equipo Future",
    time: "5-10 horas por semana",
    description:
      "Como miembro del equipo Future, intercambiaras correos electronicos regulares, participaras en sesiones de grupo y planificacion individual, y colaboraras en plataformas para coordinar nuestros esfuerzos. Cada tarea es importante y valoramos las perspectivas unicas de cada miembro.",
    bgClass: "bg-emerald-700",
  },
];

const FlipBoxes = () => {
  return (
    <section className="flex flex-col">
      <span className="bg-orange-500 text-orange-50 text-sm md:text-lg lg:text-3xl text-center font-bold uppercase p-2">
        Involucrate con nuestras propuestas, todas juntos cooperamos.
      </span>

      <div className="w-full flex flex-col items-center justify-center p-5">
        <div className="w-full flex flex-col gap-10 lg:gap-16 max-w-5xl items-center">
          <h1 className="text-blue-700 text-2xl md:text-3xl lg:text-5xl font-bold text-center">
            Tres categorias para elegir en funcion de tu tiempo disponible.
          </h1>

          <div className="w-full flex flex-col gap-5">
            <div className="w-full flex flex-col lg:flex-row gap-5">
              {categories.slice(0, 2).map((category) => (
                <div key={category.time} className="w-full lg:w-1/2 h-80">
                  <FlipBox
                    className="w-full h-full"
                    frontContent={
                      <div
                        className={`text-white w-full h-full ${category.bgClass} flex flex-col justify-center items-center gap-5`}
                      >
                        <span className="text-2xl font-bold text-center">
                          {category.title}
                        </span>
                        <span>{category.time}</span>
                      </div>
                    }
                    backContent={
                      <div
                        className={`text-white w-full h-full ${category.bgClass} text-center flex justify-center items-center p-10`}
                      >
                        <p>{category.description}</p>
                      </div>
                    }
                  />
                </div>
              ))}
            </div>

            <div className="w-full h-80">
              <FlipBox
                className="w-full h-full"
                frontContent={
                  <div
                    className={`text-white w-full h-full ${categories[2].bgClass} flex flex-col justify-center items-center gap-5`}
                  >
                    <span className="text-2xl font-bold text-center">
                      {categories[2].title}
                    </span>
                    <span>{categories[2].time}</span>
                  </div>
                }
                backContent={
                  <div
                    className={`text-white w-full h-full ${categories[2].bgClass} text-center flex justify-center items-center p-10`}
                  >
                    <p>{categories[2].description}</p>
                  </div>
                }
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlipBoxes;
