"use client";

import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { useModal } from "@/providers/ModalProvider";

const CONTACT_MODAL_ID = "footer-contact";

type ContactLinkProps = {
  href: string;
  icon: string;
  label: string;
  value: string;
  external?: boolean;
};

const ContactLink = ({
  href,
  icon,
  label,
  value,
  external = false,
}: ContactLinkProps) => {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group flex items-center gap-4 rounded border border-neutral-200 p-4 transition-colors hover:border-sky-500 hover:bg-sky-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
    >
      <span className="flex size-11 shrink-0 items-center justify-center rounded bg-sky-100 text-xl text-sky-700 transition-colors group-hover:bg-sky-600 group-hover:text-white">
        <i className={`bi ${icon}`} aria-hidden="true"></i>
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="text-sm font-semibold text-neutral-500">{label}</span>
        <span className="break-all font-bold text-neutral-900">{value}</span>
      </span>
      {external ? (
        <i
          className="bi bi-box-arrow-up-right ml-auto text-neutral-400"
          aria-hidden="true"
        ></i>
      ) : null}
    </a>
  );
};

const ContactButton = () => {
  const { openModal, closeModal } = useModal();

  return (
    <>
      <button
        type="button"
        className="w-fit rounded text-left underline underline-offset-2 hover:text-sky-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
        onClick={() => {
          openModal(CONTACT_MODAL_ID);
        }}
      >
        Contacto
      </button>

      <Modal
        id={CONTACT_MODAL_ID}
        className="max-h-[calc(100vh-2.5rem)] w-full max-w-xl"
        ariaLabelledBy="footer-contact-title"
      >
        <div className="flex max-h-[calc(100vh-2.5rem)] flex-col">
          <header className="flex items-start justify-between gap-5 border-b border-neutral-200 p-5 md:p-7">
            <div className="flex flex-col gap-2">
              <h2
                id="footer-contact-title"
                className="text-2xl font-bold text-neutral-950 md:text-3xl"
              >
                Contacta con nosotros
              </h2>
              <p className="leading-6 text-neutral-600">
                Elige el canal que te resulte más cómodo. El mismo número está
                disponible para llamadas, WhatsApp y Telegram.
              </p>
            </div>
            <button
              type="button"
              aria-label="Cerrar contacto"
              className="flex size-10 shrink-0 items-center justify-center rounded text-xl text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
              onClick={() => {
                closeModal(CONTACT_MODAL_ID);
              }}
            >
              <i className="bi bi-x-lg" aria-hidden="true"></i>
            </button>
          </header>

          <div className="flex flex-col gap-3 overflow-y-auto p-5 md:p-7">
            <ContactLink
              href="tel:+34697318741"
              icon="bi-telephone"
              label="Teléfono"
              value="+34 697 318 741"
            />
            <ContactLink
              href="https://wa.me/34697318741"
              icon="bi-whatsapp"
              label="WhatsApp"
              value="+34 697 318 741"
              external
            />
            <ContactLink
              href="https://t.me/+34697318741"
              icon="bi-telegram"
              label="Telegram"
              value="+34 697 318 741"
              external
            />
            <ContactLink
              href="mailto:info@proyectakonscio.org"
              icon="bi-envelope"
              label="Correo electrónico"
              value="info@proyectakonscio.org"
            />
          </div>

          <footer className="border-t border-neutral-200 p-5 md:px-7">
            <Button
              color="neutral"
              className="w-full sm:w-fit"
              onClick={() => {
                closeModal(CONTACT_MODAL_ID);
              }}
            >
              Cerrar
            </Button>
          </footer>
        </div>
      </Modal>
    </>
  );
};

export default ContactButton;
