import Image from "next/image";
import React from "react";

const RedSocialKonscio = () => {
    return (
        <section className="flex flex-col gap-5 bg-blue-800 p-5 text-blue-50 md:flex-row">
            <div className="flex justify-center">
                <div className="size-32 aspect-square rounded-full bg-blue-50 p-3">
                    <div className="relative size-full overflow-hidden">
                        <Image
                            src="/images/eneagrama-konscio.svg"
                            alt="Eneagrama Konscio"
                            fill
                            sizes="8rem"
                            className="object-contain"
                            unoptimized
                        />
                    </div>
                </div>
            </div>

            <div className="flex flex-col text-center font-bold uppercase md:text-left">
                <h2 className="text-3xl md:text-5xl">
                    Red social Konscio 3D - Fundación Proyecta
                </h2>
                <p className="md:text-2xl">
                    Cooperación de organizaciones sociales para la conciencia de los
                    pueblos. Construyendo comunidad en el metaverso.
                </p>
            </div>
        </section>
    );
};

export default RedSocialKonscio;