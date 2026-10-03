"use client";

import React, { PropsWithChildren } from "react";
import AccordionProvider from "@/providers/AccordionProvider";

type Props = unknown;

const Accordion = (props: PropsWithChildren<Props>) => {
  const { children } = props;

  return (
    <AccordionProvider>
      <div className="flex flex-col gap-2">{children}</div>
    </AccordionProvider>
  );
};

export default Accordion;