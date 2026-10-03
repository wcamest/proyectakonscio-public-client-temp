import FairBNBForm from "./forms/FairBNBForm";
import type { PublicFormDefinition } from "@/types/formsPublic";

type Props = Readonly<{
  definition: PublicFormDefinition | null;
}>;

const FormSection = ({ definition }: Props) => {
  return (
    <section className="flex flex-col">
      <div className="w-full flex flex-col items-center justify-center p-5">
        <div className="w-full flex flex-col gap-10 lg:gap-10 max-w-5xl items-center">
          <div className="w-full max-w-xl text-center bg-blue-200 text-blue-600 border border-dashed border-blue-600 p-5 rounded font-bold">
            Unete a FairBNB
          </div>
          <FairBNBForm definition={definition} />
        </div>
      </div>
    </section>
  );
};

export default FormSection;
