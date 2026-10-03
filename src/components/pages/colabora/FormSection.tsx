import React from "react";
import type { PublicFormDefinition } from "@/types/formsPublic";
import { PublicServerForm } from "@/components/forms/PublicServerForm";

type Props = Readonly<{
  data: PublicFormDefinition | null;
}>;

const FormSection = ({ data }: Props) => {
  return (
    <section className="flex flex-col">
      <div className="w-full flex flex-col items-center justify-center p-5">
        <div className="w-full flex flex-col gap-10 lg:gap-10 max-w-5xl items-center">
          <div className="w-full max-w-xl text-center bg-blue-200 text-blue-600 border border-dashed border-blue-600 p-5 rounded font-bold">
            Contacta con nosotros y comentanos tu propuesta colaborativa.
          </div>
          <PublicServerForm
            definition={data}
            submitLabel="Regístrate"
            successTitle="Propuesta enviada"
            successMessage="Recibimos tus datos correctamente. Nos pondremos en contacto contigo cuando revisemos tu propuesta."
          />
        </div>
      </div>
    </section>
  );
};

export default FormSection;
