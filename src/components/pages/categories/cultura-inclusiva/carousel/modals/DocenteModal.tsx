"use client";

import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { PublicServerForm } from "@/components/forms/PublicServerForm";
import { useModal } from "@/providers/ModalProvider";
import type { PublicFormDefinition } from "@/types/formsPublic";

type Props = Readonly<{
  formDefinition: PublicFormDefinition | null;
}>;

const DocenteModal = ({ formDefinition }: Props) => {
  const { closeModal } = useModal();

  return (
    <Modal id="docente modal" className="w-full h-fit max-w-xl">
      <div className="size-full overflow-hidden flex flex-col">
        <div className="w-full h-fit max-h-96 overflow-scroll">
          <div className="p-5">
            <PublicServerForm
              definition={formDefinition}
              submitLabel="Regístrate"
              successTitle="Registro recibido"
              successMessage="Recibimos tus datos como docente para Cultura Inclusiva."
            />
          </div>
        </div>
        <div className="flex lg:justify-end p-2">
          <Button
            className="w-full lg:w-auto"
            onClick={() => closeModal("docente modal")}
          >
            Cerrar
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DocenteModal;
