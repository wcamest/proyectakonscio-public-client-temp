"use client";

import Modal from "@/components/ui/Modal";
import React from "react";
import CourseTemplate from "../CourseTemplate";
import Button from "@/components/ui/Button";
import { useModal } from "@/providers/ModalProvider";
import PDFViewer from "@/components/ui/PDFViewer";
import SpatialVideo from "./metaverso-modal-components/MetaversoVideo";
import SpatialCourseForm from "./metaverso-modal-components/spatial-course-form";
import type { PublicFormDefinition } from "@/types/formsPublic";

type Props = Readonly<{
  formDefinition: PublicFormDefinition | null;
}>;

const SpatialCourseModal = ({ formDefinition }: Props) => {
  const { closeModal } = useModal();

  return (
    <Modal id="spatial course modal" className="size-full">
      <div className="size-full overflow-hidden flex flex-col ">
        <CourseTemplate
          items={[
            {
              label: "Presentación",
              content: <SpatialVideo />,
            },
            {
              label: "Configuración",
              content: <PDFViewer src={"/pdf/metaverso-course.pdf"} />,
            },
            {
              label: "Regístrate",
              content: <SpatialCourseForm definition={formDefinition} />,
            },
          ]}
        />
        <div className="flex lg:justify-end p-2">
          <Button
            className="w-full lg:w-auto"
            onClick={() => {
              closeModal("spatial course modal");
            }}
          >
            Cerrar
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default SpatialCourseModal;
