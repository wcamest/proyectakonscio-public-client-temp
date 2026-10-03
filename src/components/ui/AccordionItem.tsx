"use client";

import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useAccordion } from "@/providers/AccordionProvider";
import styles from "./AccordionItem.module.css";

type Props = {
  headerClassName?: string;
  id: string;
  header: React.ReactNode;
};

const AccordionItem = (props: PropsWithChildren<Props>) => {
  const { children, headerClassName, header, id } = props;
  const { accordionSelectedId, toggleAccordionItem } = useAccordion();
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const isExpanded = accordionSelectedId === id;
  const contentId = `accordion-content-${id}`;

  const updateContentHeight = useCallback(() => {
    if (!contentRef.current) return;

    setContentHeight(contentRef.current.scrollHeight);
  }, []);

  useEffect(() => {
    updateContentHeight();
  }, [children, updateContentHeight]);

  useEffect(() => {
    if (!contentRef.current || typeof ResizeObserver === "undefined") return;

    const observer = new ResizeObserver(() => {
      updateContentHeight();
    });

    observer.observe(contentRef.current);

    return () => {
      observer.disconnect();
    };
  }, [updateContentHeight]);

  return (
    <div className="flex flex-col">
      <button
        type="button"
        aria-expanded={isExpanded}
        aria-controls={contentId}
        className={`${
          headerClassName ? `${headerClassName} ` : ""
        }flex w-full justify-between cursor-pointer text-left`}
        onClick={() => {
          toggleAccordionItem(id);
        }}
      >
        {header}
        {!isExpanded ? (
          <i className="bi bi-plus-circle-fill"></i>
        ) : (
          <i className="bi bi-dash-circle-fill"></i>
        )}
      </button>
      <div
        id={contentId}
        style={{
          height: `${isExpanded ? contentHeight : 0}px`,
        }}
        className={`${styles.accordion_item_component_body} relative overflow-hidden border border-solid border-neutral-300`}
      >
        <div ref={contentRef}>{children}</div>
      </div>
    </div>
  );
};

export default AccordionItem;