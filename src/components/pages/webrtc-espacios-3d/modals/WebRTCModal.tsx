"use client";

import Modal from "@/components/ui/Modal";
import React from "react";
import CourseTemplate from "../CourseTemplate";
import Button from "@/components/ui/Button";
import { useModal } from "@/providers/ModalProvider";
import ImdrVideo from "./webrtc-modal-components/IdmrVideo";
import PDFViewer from "@/components/ui/PDFViewer";
import WebRTCForm from "./webrtc-modal-components/webrtc-form";
import type { PublicFormDefinition } from "@/types/formsPublic";

type Props = Readonly<{
  formDefinition: PublicFormDefinition | null;
}>;

const WebRTCModal = ({ formDefinition }: Props) => {
  const { closeModal } = useModal();

  return (
    <Modal id="webrtc modal" className="size-full">
      <div className="size-full overflow-hidden flex flex-col ">
        <CourseTemplate
          items={[
            {
              label: "Presentación",
              content: <ImdrVideo />,
            },
            {
              label: "Configuración",
              content: <PDFViewer src={"/pdf/w2v.pdf"} />,
            },
            {
              label: "Regístrate",
              content: <WebRTCForm definition={formDefinition} />,
            },
          ]}
        />
        <div className="flex lg:justify-end p-2">
          <Button
            className="w-full lg:w-auto"
            onClick={() => {
              closeModal("webrtc modal");
            }}
          >
            Cerrar
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default WebRTCModal;
