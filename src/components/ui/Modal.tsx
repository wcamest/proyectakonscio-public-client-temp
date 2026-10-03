"use client";

import { useModal } from "@/providers/ModalProvider";
import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

type Props = {
  id: string;
  className?: string;
  children?: React.ReactNode;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  ariaLabel?: string;
  ariaLabelledBy?: string;
};

const Modal = (props: Props) => {
  const {
    id,
    className,
    children,
    closeOnBackdrop = true,
    closeOnEscape = true,
    ariaLabel,
    ariaLabelledBy,
  } = props;
  const { activeModalId, closeModal, openModalIds } = useModal();
  const modalRef = useRef<HTMLDivElement>(null);
  const isTopModalRef = useRef(false);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  const stackIndex = openModalIds.indexOf(id);
  const isVisible = stackIndex !== -1;
  const isTopModal = activeModalId === id;

  useEffect(() => {
    isTopModalRef.current = isTopModal;
  }, [isTopModal]);

  useEffect(() => {
    if (!isVisible) return;

    previousActiveElementRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const focusFrame = window.requestAnimationFrame(() => {
      modalRef.current?.focus();
    });

    return () => {
      window.cancelAnimationFrame(focusFrame);

      const previousActiveElement = previousActiveElementRef.current;
      if (
        isTopModalRef.current &&
        previousActiveElement?.isConnected
      ) {
        previousActiveElement.focus();
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible || !isTopModal || !closeOnEscape) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeModal(id);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeModal, closeOnEscape, id, isTopModal, isVisible]);

  if (!isVisible) {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center p-5 lg:p-10"
      style={{ zIndex: 100 + stackIndex * 10 }}
      aria-hidden={!isTopModal}
    >
      {closeOnBackdrop ? (
        <button
          type="button"
          aria-label="Cerrar modal"
          tabIndex={-1}
          onClick={() => {
            closeModal(id);
          }}
          className="absolute inset-0 bg-black/80"
        ></button>
      ) : (
        <div className="absolute inset-0 bg-black/80" aria-hidden="true"></div>
      )}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal={isTopModal}
        aria-label={
          ariaLabel ?? (ariaLabelledBy ? undefined : "Ventana modal")
        }
        aria-labelledby={ariaLabelledBy}
        tabIndex={-1}
        className={`${className ?? ""} relative z-10 overflow-hidden rounded bg-white shadow outline-none`}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
