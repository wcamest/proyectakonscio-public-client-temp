import { PublicServerForm } from "@/components/forms/PublicServerForm";
import type { PublicFormDefinition } from "@/types/formsPublic";

type Props = Readonly<{
  definition: PublicFormDefinition | null;
}>;

const WebRTCForm = ({ definition }: Props) => {
  return (
    <div className="size-full overflow-auto">
      <div className="w-full flex flex-col items-center justify-center p-5">
        <div className="w-full flex flex-col gap-10 lg:gap-10 max-w-5xl items-center">
          <div className="w-full max-w-xl text-center bg-blue-200 text-blue-600 border border-dashed border-blue-600 p-5 rounded font-bold">
            Regístrate y accede a nuestro curso.
          </div>
          <PublicServerForm
            definition={definition}
            submitLabel="Regístrate"
            successTitle="Registro recibido"
            successMessage="Recibimos tu registro para el curso de WebRTC."
          />
        </div>
      </div>
    </div>
  );
};

export default WebRTCForm;
