import LegalDocument, {
  LegalList,
  LegalSection,
  LegalSubsection,
} from "@/components/legal/LegalDocument";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de privacidad - Proyecta Konscio",
  description:
    "Información sobre cómo la Fundación Proyecta KONSCIO trata y protege los datos personales.",
};

const Page = () => {
  return (
    <LegalDocument
      title="Política de privacidad"
      updatedAt="30 de julio de 2026"
      description={
        <p>
          Esta política explica qué datos personales puede tratar la Fundación
          Proyecta KONSCIO a través de <strong>proyectakonscio.org</strong>, con
          qué finalidad y cómo pueden ejercer sus derechos las personas
          interesadas.
        </p>
      }
    >
      <LegalSection
        id="responsable"
        title="1. Responsable del tratamiento"
      >
        <dl className="grid gap-x-8 gap-y-3 rounded bg-neutral-50 p-5 sm:grid-cols-[13rem_1fr]">
          <dt className="font-semibold text-neutral-900">Responsable</dt>
          <dd>Fundación Proyecta KONSCIO</dd>
          <dt className="font-semibold text-neutral-900">CIF</dt>
          <dd>G85954501</dd>
          <dt className="font-semibold text-neutral-900">Domicilio</dt>
          <dd>Las Flores nº 3, 3º C, 18004 Granada, España</dd>
          <dt className="font-semibold text-neutral-900">Registro</dt>
          <dd>
            Número 931 del Registro de Fundaciones de España, Ministerio de
            Cultura
          </dd>
          <dt className="font-semibold text-neutral-900">Correo</dt>
          <dd>
            <a
              className="font-semibold text-sky-700 underline underline-offset-2"
              href="mailto:info@proyectakonscio.org"
            >
              info@proyectakonscio.org
            </a>
          </dd>
          <dt className="font-semibold text-neutral-900">Teléfono</dt>
          <dd>
            <a
              className="font-semibold text-sky-700 underline underline-offset-2"
              href="tel:+34697318741"
            >
              +34 697 318 741
            </a>
          </dd>
          <dt className="font-semibold text-neutral-900">Web</dt>
          <dd>https://proyectakonscio.org</dd>
        </dl>
      </LegalSection>

      <LegalSection id="datos" title="2. Datos que podemos tratar">
        <LegalSubsection title="2.1. Datos facilitados por la persona usuaria">
          <LegalList>
            <li>Nombre y apellidos.</li>
            <li>Correo electrónico y número de teléfono.</li>
            <li>
              Información incluida en consultas, mensajes o solicitudes de
              reunión.
            </li>
            <li>
              Datos necesarios para solicitudes de colaboración, formación,
              participación en actividades o proyectos.
            </li>
            <li>
              Preferencias o información profesional y formativa que se
              solicite en un formulario concreto, como categoría de
              colaboración, materias de interés o experiencia docente.
            </li>
          </LegalList>
          <p>
            No solicitamos intencionadamente categorías especiales de datos
            personales. Te pedimos que no incluyas información sensible que no
            sea necesaria para atender tu solicitud.
          </p>
        </LegalSubsection>

        <LegalSubsection title="2.2. Datos técnicos y de navegación">
          <p>
            El alojamiento y los sistemas de seguridad pueden generar registros
            técnicos, como dirección IP, fecha y hora de acceso, navegador,
            dispositivo, URL solicitada y datos asociados a errores o intentos
            de acceso. También guardamos la preferencia de cookies elegida por
            el usuario.
          </p>
        </LegalSubsection>

        <LegalSubsection title="2.3. Canales externos">
          <p>
            Si contactas mediante teléfono, correo, WhatsApp o Telegram, el
            proveedor de ese canal tratará los datos conforme a sus propias
            condiciones y políticas. La Fundación recibirá la información que
            decidas comunicar a través de ese medio.
          </p>
        </LegalSubsection>
      </LegalSection>

      <LegalSection
        id="finalidades"
        title="3. Finalidades y bases jurídicas"
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-2xl border-collapse text-left">
            <thead>
              <tr className="border-b border-neutral-300 bg-neutral-100 text-neutral-900">
                <th className="p-3 font-semibold">Finalidad</th>
                <th className="p-3 font-semibold">Base jurídica</th>
              </tr>
            </thead>
            <tbody className="[&_tr]:border-b [&_tr]:border-neutral-200 [&_td]:p-3 [&_td]:align-top">
              <tr>
                <td>
                  Responder consultas y mantener las comunicaciones solicitadas.
                </td>
                <td>
                  Consentimiento y, cuando corresponda, medidas precontractuales
                  solicitadas por la persona interesada.
                </td>
              </tr>
              <tr>
                <td>
                  Gestionar solicitudes de colaboración, formación,
                  participación, inscripción o reunión.
                </td>
                <td>
                  Consentimiento, ejecución de medidas solicitadas y, en su
                  caso, ejecución de una relación con la Fundación.
                </td>
              </tr>
              <tr>
                <td>
                  Enviar novedades o comunicaciones informativas cuando se
                  habilite esta opción y se hayan solicitado.
                </td>
                <td>Consentimiento, revocable en cualquier momento.</td>
              </tr>
              <tr>
                <td>
                  Mantener la seguridad, prevenir abusos, resolver errores y
                  proteger la infraestructura.
                </td>
                <td>
                  Interés legítimo en garantizar la seguridad y continuidad de
                  la web.
                </td>
              </tr>
              <tr>
                <td>Cumplir obligaciones legales y atender requerimientos.</td>
                <td>Cumplimiento de una obligación legal.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          No adoptamos decisiones automatizadas con efectos jurídicos o
          significativamente similares sobre las personas usuarias.
        </p>
      </LegalSection>

      <LegalSection id="conservacion" title="4. Conservación de los datos">
        <p>
          Los datos se conservarán únicamente durante el tiempo necesario para
          la finalidad para la que fueron recogidos y, después, durante los
          plazos exigidos para atender posibles responsabilidades.
        </p>
        <LegalList>
          <li>
            <strong>Consultas y contacto:</strong> mientras se atiende la
            solicitud y, como referencia general, hasta un año adicional salvo
            que exista una relación posterior o un plazo legal distinto.
          </li>
          <li>
            <strong>Solicitudes y participación:</strong> durante el proceso
            correspondiente y, si se formaliza una relación, durante su vigencia
            y los plazos legales aplicables.
          </li>
          <li>
            <strong>Comunicaciones basadas en consentimiento:</strong> hasta que
            se retire el consentimiento o se solicite la baja.
          </li>
          <li>
            <strong>Registros técnicos:</strong> durante el periodo
            proporcionado y necesario para seguridad, diagnóstico y defensa
            frente a incidentes.
          </li>
        </LegalList>
        <p>
          Cuando proceda, los datos se bloquearán, eliminarán o anonimizarán de
          forma segura.
        </p>
      </LegalSection>

      <LegalSection
        id="destinatarios"
        title="5. Destinatarios y encargados"
      >
        <p>
          La Fundación no vende ni alquila datos personales. Podrán acceder a
          ellos proveedores que prestan servicios necesarios —por ejemplo,
          alojamiento, soporte técnico, comunicaciones o correo— bajo las
          obligaciones contractuales y de confidencialidad correspondientes.
        </p>
        <p>
          Los datos también podrán comunicarse a administraciones, juzgados,
          fuerzas de seguridad u otras autoridades cuando lo exija la ley. En
          actividades desarrolladas con entidades colaboradoras, solo se
          compartirán los datos necesarios cuando exista una base jurídica
          válida y se informe previamente a la persona interesada.
        </p>
      </LegalSection>

      <LegalSection
        id="transferencias"
        title="6. Transferencias internacionales"
      >
        <p>
          Algunos proveedores tecnológicos o canales de comunicación pueden
          tratar datos fuera del Espacio Económico Europeo. Cuando exista una
          transferencia internacional sujeta al RGPD, se utilizará un mecanismo
          reconocido por la normativa, como una decisión de adecuación,
          cláusulas contractuales tipo u otras garantías apropiadas.
        </p>
      </LegalSection>

      <LegalSection id="derechos" title="7. Derechos de las personas">
        <p>
          Puedes solicitar el acceso, rectificación, supresión, oposición,
          limitación y portabilidad de tus datos cuando corresponda. También
          puedes retirar un consentimiento sin afectar a la licitud del
          tratamiento realizado antes de retirarlo.
        </p>
        <p>
          Para ejercer tus derechos, escribe a{" "}
          <a
            className="font-semibold text-sky-700 underline underline-offset-2"
            href="mailto:info@proyectakonscio.org"
          >
            info@proyectakonscio.org
          </a>{" "}
          e indica el derecho que deseas ejercer. Podremos solicitar la
          información estrictamente necesaria para verificar tu identidad y
          evitar el acceso de terceros a tus datos.
        </p>
        <p>
          Si consideras que el tratamiento no se ajusta a la normativa, puedes
          presentar una reclamación ante la{" "}
          <a
            className="font-semibold text-sky-700 underline underline-offset-2"
            href="https://www.aepd.es"
            target="_blank"
            rel="noopener noreferrer"
          >
            Agencia Española de Protección de Datos (AEPD)
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection id="seguridad" title="8. Seguridad">
        <p>
          La Fundación aplica medidas técnicas y organizativas proporcionales a
          los riesgos para preservar la confidencialidad, integridad y
          disponibilidad de los datos. Ningún sistema conectado a Internet es
          completamente infalible; por ello, las medidas se revisan y adaptan
          según la evolución de los riesgos y la tecnología.
        </p>
      </LegalSection>

      <LegalSection id="menores" title="9. Menores de edad">
        <p>
          Los menores de 14 años no deben facilitar datos personales basándose
          únicamente en su propio consentimiento. Cuando el tratamiento
          requiera consentimiento, deberá intervenir quien ejerza la patria
          potestad o tutela, salvo las excepciones previstas legalmente. En
          actividades dirigidas a menores podrán establecerse medidas
          adicionales de información y autorización.
        </p>
      </LegalSection>

      <LegalSection
        id="contenido-externo"
        title="10. Cookies y contenido externo"
      >
        <p>
          La web utiliza una cookie propia para recordar la decisión sobre
          cookies. Determinados contenidos externos, como vídeos de YouTube, no
          se cargan hasta que se aceptan las funcionalidades opcionales. Puedes
          consultar o cambiar esta decisión en la{" "}
          <Link
            className="font-semibold text-sky-700 underline underline-offset-2"
            href="/politica-de-cookies"
          >
            Política de cookies
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection
        id="actualizaciones"
        title="11. Actualización de esta política"
      >
        <p>
          Esta política podrá actualizarse para reflejar cambios legales,
          técnicos o en las actividades de tratamiento. La versión publicada
          en esta página indicará siempre su fecha de última actualización.
          Cuando un cambio requiera un nuevo consentimiento, se solicitará de
          nuevo antes de aplicar el tratamiento correspondiente.
        </p>
      </LegalSection>

      <LegalSection id="contacto" title="12. Contacto">
        <p>
          Para cuestiones sobre privacidad y protección de datos puedes
          contactar con Fundación Proyecta KONSCIO en{" "}
          <a
            className="font-semibold text-sky-700 underline underline-offset-2"
            href="mailto:info@proyectakonscio.org"
          >
            info@proyectakonscio.org
          </a>
          , en el teléfono{" "}
          <a
            className="font-semibold text-sky-700 underline underline-offset-2"
            href="tel:+34697318741"
          >
            +34 697 318 741
          </a>{" "}
          o por correo postal en Las Flores nº 3, 3º C, 18004 Granada, España.
        </p>
      </LegalSection>
    </LegalDocument>
  );
};

export default Page;
