import FlipBox from "@/components/ui/FlipBox";
import React from "react";

const FlipBoxSection = () => {
  return (
    <section className="p-8 flex justify-center items-center h-96 text-white">
      <div className="w-full h-full max-w-5xl">
        <FlipBox
          className="size-full"
          frontContent={
            <div className="size-full bg-green-600 flex flex-col justify-center items-center gap-5 lg:px-20 p-5 text-center">
              <h2 className="text-2xl font-bold">Sobre el curso</h2>
              <p className="font-bold">
                En este Curso Virtual queremos consolidar todos esos
                conocimientos acumulados en un formato sencillo, accesible y
                compartible. Por esta razón nos propusimos regresar al
                audiovisual y hacer un curso integralmente en video.
              </p>
            </div>
          }
          backContent={
            <div className="size-full bg-green-600 flex justify-center items-center lg:px-20 p-5 text-center">
              <p className="font-bold">
                Este Curso Online es el resumen de más de 8 años de trabajo e
                investigación independiente en el campo de las educaciones
                alternativas: nuestras visitas a experiencias educativas, la
                recopilación de bibliografìas diversas y la reflexión crítica
                sobre el fenómeno de la Educación Alternativa en Latinoamérica y
                el Mundo.
              </p>
            </div>
          }
        ></FlipBox>
      </div>
    </section>
  );
};

export default FlipBoxSection;
