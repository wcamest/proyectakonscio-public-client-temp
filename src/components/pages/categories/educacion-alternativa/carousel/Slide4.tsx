import React from "react";

const Slide4 = () => {
  return (
    <div className="size-full relative overflow-hidden bg-stone-300">
      <div className="size-full relative z-10 flex flex-col justify-between items-center text-center">
        <div className="bg-black bg-opacity-20 w-full p-5 flex justify-center items-center">
          <span className="text-yellow-400 text-2xl lg:text-5xl font-bold">
            Financiando la sostenibilidad
          </span>
        </div>
        <div className="size-full flex justify-center items-center px-5">
          <p className="text-md sm:text-xl md:text-2xl lg:text-4xl font-bold w-full max-w-4xl">
            Fundación Proyecta Konscio invita a todas las personas,
            organizaciones e instituciones a unirse a nuestra causa y contribuir
            en la construcción de una sociedad más avanzada. Hay muchas formas
            de ayudar y participar en nuestro proyecto innovador. ¡Haz tu parte
            hoy y contáctanos para saber cómo puedes ayudar!
          </p>
        </div>
        <div className="bg-black bg-opacity-20 w-full px-20 py-5 flex flex-col gap-5 justify-center items-center">
          <span className="text-yellow-400 lg:text-5xl font-bold drop-shadow">
            Contactanos
          </span>
          <div className="w-full flex flex-col gap-5 lg:gap-0 lg:flex-row justify-between text-sm lg:text-xl">
            <div className="flex flex-col items-center">
            <span>Teléfono</span>
              <span>+34 697 318 741</span>
            </div>
            <div className="flex flex-col items-center">
              <span>Email</span>
              <span>info@proyectakonscio.org</span>
            </div>
            <div className="flex flex-col items-center">
              <span>Redes sociales</span>
              <div className="flex justify-center gap-5">
                <a
                  href={"https://facebook.com/ProyectaKonscio"}
                  className="text-3xl"
                  target="_blank"
                >
                  <i className="bi bi-facebook"></i>
                </a>
                <a
                  href={"https://facebook.com/ProyectaKonscio"}
                  className="text-3xl"
                  target="_blank"
                >
                  <i className="bi bi-instagram"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide4;
