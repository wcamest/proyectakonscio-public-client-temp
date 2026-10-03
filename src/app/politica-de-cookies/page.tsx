import CookiePreferencesButton from "@/components/legal/CookiePreferencesButton";
import LegalDocument, {
  LegalList,
  LegalSection,
  LegalSubsection,
} from "@/components/legal/LegalDocument";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de cookies - Proyecta Konscio",
  description:
    "Información sobre las cookies utilizadas en proyectakonscio.org y cómo administrar las preferencias.",
};

const Page = () => {
  return (
    <LegalDocument
      title="Política de cookies"
      updatedAt="30 de julio de 2026"
      description={
        <p>
          Esta política explica qué cookies utiliza{" "}
          <strong>proyectakonscio.org</strong>, para qué sirven y cómo puedes
          aceptar, rechazar o cambiar tu decisión.
        </p>
      }
    >
      <LegalSection id="definicion" title="1. ¿Qué son las cookies?">
        <p>
          Las cookies son pequeños archivos que un sitio web guarda en el
          navegador del usuario. Pueden servir para recordar una preferencia,
          mantener una función activa, medir el uso de un servicio o permitir
          que contenido de terceros funcione correctamente.
        </p>
        <p>
          Tecnologías como el almacenamiento local del navegador pueden cumplir
          finalidades similares. Cuando esta política habla de cookies, también
          se refiere a esas tecnologías cuando resulte aplicable.
        </p>
      </LegalSection>

      <LegalSection id="responsable" title="2. Responsable">
        <p>
          El responsable de esta web es la{" "}
          <strong>Fundación Proyecta KONSCIO</strong>, con CIF G85954501 y
          domicilio en Las Flores nº 3, 3º C, 18004 Granada, España. Puedes
          contactar en{" "}
          <a
            className="font-semibold text-sky-700 underline underline-offset-2"
            href="mailto:info@proyectakonscio.org"
          >
            info@proyectakonscio.org
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection id="cookie-actual" title="3. Cookie propia utilizada">
        <p>
          En la versión actual de la web se utiliza una sola cookie propia. No
          se instalan cookies analíticas ni publicitarias propias.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-3xl border-collapse text-left">
            <thead>
              <tr className="border-b border-neutral-300 bg-neutral-100 text-neutral-900">
                <th className="p-3 font-semibold">Nombre</th>
                <th className="p-3 font-semibold">Tipo</th>
                <th className="p-3 font-semibold">Duración</th>
                <th className="p-3 font-semibold">Finalidad</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-neutral-200">
                <td className="p-3 align-top font-mono text-sm">
                  proyecta-konscio-cookie-consent
                </td>
                <td className="p-3 align-top">Técnica y propia</td>
                <td className="p-3 align-top">1 año</td>
                <td className="p-3 align-top">
                  Recordar si el usuario aceptó o rechazó las funcionalidades
                  opcionales para no mostrar el aviso en cada visita.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Esta cookie es necesaria para conservar la decisión de privacidad del
          usuario. Su valor solo indica <em>aceptado</em> o <em>rechazado</em> y
          no se utiliza para identificarle ni para elaborar perfiles.
        </p>
      </LegalSection>

      <LegalSection
        id="contenido-terceros"
        title="4. Contenido externo y cookies de terceros"
      >
        <p>
          Algunas páginas pueden ofrecer vídeos de YouTube u otro contenido
          alojado por terceros. Ese contenido permanece bloqueado mientras no
          se acepten las funcionalidades opcionales.
        </p>
        <p>
          Al permitir y cargar un contenido externo, el proveedor puede recibir
          datos técnicos —como la dirección IP, navegador, dispositivo y página
          de origen— y utilizar cookies o tecnologías similares según su propia
          política. Los vídeos se integran mediante el dominio de privacidad
          mejorada de YouTube, pero el proveedor todavía puede tratar datos
          cuando el usuario reproduce o interactúa con el contenido.
        </p>
        <p>
          Puedes consultar la{" "}
          <a
            className="font-semibold text-sky-700 underline underline-offset-2"
            href="https://policies.google.com/privacy?hl=es"
            target="_blank"
            rel="noopener noreferrer"
          >
            Política de privacidad de Google
          </a>{" "}
          para obtener más información sobre YouTube.
        </p>
      </LegalSection>

      <LegalSection
        id="categorias"
        title="5. Categorías y consentimiento"
      >
        <LegalSubsection title="5.1. Cookies técnicas">
          <p>
            Son necesarias para prestar una función solicitada o conservar una
            preferencia de privacidad. No dependen de la aceptación de cookies
            opcionales.
          </p>
        </LegalSubsection>
        <LegalSubsection title="5.2. Funcionalidades externas opcionales">
          <p>
            Requieren una acción afirmativa. Rechazarlas no impide navegar por
            la web; únicamente mantiene bloqueado el contenido externo que
            podría utilizar tecnologías de terceros.
          </p>
        </LegalSubsection>
        <LegalSubsection title="5.3. Analítica y publicidad">
          <p>
            Actualmente no utilizamos Google Analytics ni cookies de publicidad
            comportamental. Si en el futuro se incorporan, permanecerán
            desactivadas hasta obtener el consentimiento correspondiente y se
            actualizará esta política antes de utilizarlas.
          </p>
        </LegalSubsection>
      </LegalSection>

      <LegalSection
        id="administrar"
        title="6. Cómo aceptar, rechazar o retirar el consentimiento"
      >
        <p>
          En la primera visita se muestra un aviso con dos opciones equivalentes:
          aceptar o rechazar las funcionalidades opcionales. Seguir navegando,
          guardar silencio o cerrar la página no se interpreta como aceptación.
        </p>
        <p>
          Puedes cambiar tu decisión en cualquier momento. Al pulsar el
          siguiente botón se elimina la preferencia guardada y vuelve a
          mostrarse el aviso:
        </p>
        <div>
          <CookiePreferencesButton />
        </div>
        <p>
          También puedes borrar o bloquear cookies desde el navegador. Si
          eliminas la cookie de consentimiento, la web volverá a preguntarte en
          la siguiente visita.
        </p>
      </LegalSection>

      <LegalSection id="navegadores" title="7. Gestión desde el navegador">
        <p>
          Los navegadores permiten ver, eliminar o bloquear cookies desde sus
          ajustes de privacidad. La ubicación concreta puede cambiar según la
          versión. Consulta la ayuda oficial de tu navegador:
        </p>
        <LegalList>
          <li>
            <a
              className="font-semibold text-sky-700 underline underline-offset-2"
              href="https://support.google.com/chrome/answer/95647?hl=es"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Chrome
            </a>
          </li>
          <li>
            <a
              className="font-semibold text-sky-700 underline underline-offset-2"
              href="https://support.mozilla.org/es/kb/Borrar%20cookies"
              target="_blank"
              rel="noopener noreferrer"
            >
              Mozilla Firefox
            </a>
          </li>
          <li>
            <a
              className="font-semibold text-sky-700 underline underline-offset-2"
              href="https://support.apple.com/es-es/guide/safari/sfri11471/mac"
              target="_blank"
              rel="noopener noreferrer"
            >
              Safari
            </a>
          </li>
          <li>
            <a
              className="font-semibold text-sky-700 underline underline-offset-2"
              href="https://support.microsoft.com/es-es/windows/administrar-cookies-en-microsoft-edge-ver-permitir-bloquear-eliminar-y-usar-168dab11-0753-043d-7c16-ede5947fc64d"
              target="_blank"
              rel="noopener noreferrer"
            >
              Microsoft Edge
            </a>
          </li>
        </LegalList>
      </LegalSection>

      <LegalSection
        id="actualizaciones"
        title="8. Cambios en esta política"
      >
        <p>
          Esta política se actualizará cuando cambien las cookies, las
          funcionalidades externas o las obligaciones aplicables. Si un cambio
          modifica las finalidades consentidas, se solicitará una nueva
          decisión antes de activar el tratamiento correspondiente.
        </p>
      </LegalSection>

      <LegalSection id="contacto" title="9. Contacto">
        <p>
          Para consultas sobre cookies o privacidad puedes escribir a{" "}
          <a
            className="font-semibold text-sky-700 underline underline-offset-2"
            href="mailto:info@proyectakonscio.org"
          >
            info@proyectakonscio.org
          </a>{" "}
          o consultar la{" "}
          <Link
            className="font-semibold text-sky-700 underline underline-offset-2"
            href="/politicas-de-privacidad"
          >
            Política de privacidad
          </Link>
          .
        </p>
      </LegalSection>
    </LegalDocument>
  );
};

export default Page;
