import { PublicServerForm } from "@/components/forms/PublicServerForm";
import type { PublicFormDefinition } from "@/types/formsPublic";

type Props = Readonly<{
  definition: PublicFormDefinition | null;
}>;

const FairBNBForm = ({ definition }: Props) => (
  <PublicServerForm
    definition={definition}
    submitLabel="Regístrate"
    successTitle="Registro recibido"
    successMessage="Recibimos tu propuesta de colaboración con FairBNB."
  />
);

export default FairBNBForm;
