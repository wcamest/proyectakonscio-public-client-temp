"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type ModalContextValue = {
  activeModalId: string | null;
  openModalIds: readonly string[];
  openModal: (id: string) => void;
  closeModal: (id?: string) => void;
  toggleModal: (id: string) => void;
  isModalOpen: (id: string) => boolean;
};

type Props = {
  children: React.ReactNode;
};

const ModalContext = createContext<ModalContextValue | null>(null);

const ModalProvider = (props: Props) => {
  const { children } = props;
  const [openModalIds, setOpenModalIds] = useState<string[]>([]);
  const hasOpenModals = openModalIds.length > 0;
  const activeModalId = openModalIds[openModalIds.length - 1] ?? null;

  const openModal = useCallback((id: string) => {
    if (!id) return;

    setOpenModalIds((currentIds) => [
      ...currentIds.filter((currentId) => currentId !== id),
      id,
    ]);
  }, []);

  const closeModal = useCallback((id?: string) => {
    setOpenModalIds((currentIds) => {
      if (id) {
        return currentIds.filter((currentId) => currentId !== id);
      }

      return currentIds.slice(0, -1);
    });
  }, []);

  const toggleModal = useCallback((id: string) => {
    if (!id) return;

    setOpenModalIds((currentIds) =>
      currentIds.includes(id)
        ? currentIds.filter((currentId) => currentId !== id)
        : [...currentIds, id],
    );
  }, []);

  const isModalOpen = useCallback(
    (id: string) => openModalIds.includes(id),
    [openModalIds],
  );

  useEffect(() => {
    if (!hasOpenModals) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [hasOpenModals]);

  const value = useMemo<ModalContextValue>(
    () => ({
      activeModalId,
      openModalIds,
      openModal,
      closeModal,
      toggleModal,
      isModalOpen,
    }),
    [
      activeModalId,
      closeModal,
      isModalOpen,
      openModal,
      openModalIds,
      toggleModal,
    ],
  );

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModal must be used within ModalProvider.");
  }

  return context;
};

export default ModalProvider;
