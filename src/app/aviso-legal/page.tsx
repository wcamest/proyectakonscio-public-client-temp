import LegalDocument, {
  LegalList,
  LegalSection,
  LegalSubsection,
} from "@/components/legal/LegalDocument";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Aviso legal - Proyecta Konscio",
  description:
    "Información legal, condiciones de uso y datos identificativos de la Fundación Proyecta KONSCIO.",
};

const Page = () => {
  return (
    <LegalDocument
      title="Aviso legal"
      updatedAt="30 de julio de 2026"
      description={
        <p>
          Este aviso regula el acceso y el uso de{" "}
          <strong>proyectakonscio.org</strong>, el sitio web de la Fundación
          Proyecta KONSCIO.
        </p>
      }
    >
      <LegalSection id="titular" title="1. Datos identificativos del titular">
        <dl className="grid gap-x-8 gap-y-3 rounded bg-neutral-50 p-5 sm:grid-cols-[13rem_1fr]">
          <dt className="font-semibold text-neutral-900">
            Denominación social
          </dt>
          <dd>Fundación Proyecta KONSCIO</dd>
          <dt className="font-semibold text-neutral-900">CIF</dt>
          <dd>G85954501</dd>
          <dt className="font-semibold text-neutral-900">Domicilio social</dt>
          <dd>Las Flores nº 3, 3º C, 18004 Granada, España</dd>
          <dt className="font-semibold text-neutral-900">Registro</dt>
          <dd>
            Número 931 del Registro de Fundaciones de España, Ministerio de
            Cultura
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
          <dt className="font-semibold text-neutral-900">
            Correo electrónico
          </dt>
          <dd>
            <a
              className="font-semibold text-sky-700 underline underline-offset-2"
              href="mailto:info@proyectakonscio.org"
            >
              info@proyectakonscio.org
            </a>
          </dd>
          <dt className="font-semibold text-neutral-900">Sitio web</dt>
          <dd>
            <a
              className="font-semibold text-sky-700 underline underline-offset-2"
              href="https://proyectakonscio.org"
            >
              https://proyectakonscio.org
            </a>
          </dd>
        </dl>
      </LegalSection>

      <LegalSection id="objeto" title="2. Objeto y finalidad de la web">
        <p>
          La web difunde la actividad, los proyectos y las propuestas de la
          Fundación Proyecta KONSCIO en ámbitos como la educación alternativa,
          la cultura inclusiva, la ecología, la economía colaborativa, el
          periodismo, la participación ciudadana y la innovación tecnológica.
          También facilita el acceso a contenidos divulgativos y a vías de
          contacto, colaboración, formación y participación.
        </p>
        <p>
          El acceso a la web atribuye la condición de usuario. Al navegar por
          ella, el usuario se compromete a respetar este Aviso Legal y la
          legislación aplicable.
        </p>
      </LegalSection>

      <LegalSection id="condiciones-de-uso" title="3. Condiciones de uso">
        <LegalSubsection title="3.1. Uso permitido">
          <p>
            El usuario debe utilizar la web, sus servicios y sus contenidos de
            forma diligente, lícita y respetuosa. En particular, se compromete
            a:
          </p>
          <LegalList>
            <li>
              No emplear la web con fines ilícitos, fraudulentos o contrarios a
              los derechos de terceros.
            </li>
            <li>
              No dañar, inutilizar, sobrecargar o alterar el funcionamiento de
              la web, sus servidores o sus medidas de seguridad.
            </li>
            <li>
              No introducir ni difundir virus, malware u otros elementos
              perjudiciales.
            </li>
            <li>
              No intentar acceder sin autorización a zonas restringidas,
              sistemas, datos o cuentas ajenas.
            </li>
            <li>
              No remitir comunicaciones masivas, publicitarias o no solicitadas
              mediante los canales de la Fundación.
            </li>
          </LegalList>
        </LegalSubsection>

        <LegalSubsection title="3.2. Uso automatizado">
          <p>
            No está permitido extraer, copiar, indexar o reutilizar de forma
            sistemática los contenidos mediante robots, scrapers u otras
            herramientas automatizadas sin autorización previa, salvo cuando
            dicho acceso esté permitido expresamente por la ley o por las
            instrucciones técnicas publicadas por la Fundación.
          </p>
        </LegalSubsection>
      </LegalSection>

      <LegalSection
        id="propiedad-intelectual"
        title="4. Propiedad intelectual e industrial"
      >
        <p>
          Los textos, fotografías, ilustraciones, vídeos, gráficos, logotipos,
          diseños, software, código y demás contenidos de la web pertenecen a
          la Fundación Proyecta KONSCIO o se utilizan con la autorización o
          licencia correspondiente. El acceso a la web no transfiere al usuario
          ningún derecho de propiedad intelectual o industrial.
        </p>
        <p>
          Se permite consultar y compartir enlaces a los contenidos para fines
          personales, informativos y no comerciales. Cualquier reproducción,
          distribución, transformación, comunicación pública o explotación que
          exceda los límites legales requiere autorización previa y por escrito.
          Cuando proceda una cita o un uso permitido, deberá respetarse la
          integridad del contenido e indicarse la fuente:{" "}
          <strong>© Fundación Proyecta KONSCIO</strong>.
        </p>
      </LegalSection>

      <LegalSection
        id="responsabilidad"
        title="5. Disponibilidad y limitación de responsabilidad"
      >
        <LegalSubsection title="5.1. Contenidos">
          <p>
            La Fundación procura que la información sea clara y actualizada,
            pero no garantiza que todos los contenidos estén libres de errores
            u omisiones. Puede modificarlos, corregirlos, suspenderlos o
            retirarlos cuando sea necesario.
          </p>
        </LegalSubsection>
        <LegalSubsection title="5.2. Funcionamiento del servicio">
          <p>
            No se garantiza la disponibilidad ininterrumpida de la web. La
            Fundación no responderá por interrupciones, fallos de red,
            incompatibilidades técnicas, acciones de terceros o situaciones de
            fuerza mayor, sin perjuicio de las responsabilidades que no puedan
            excluirse legalmente.
          </p>
        </LegalSubsection>
        <LegalSubsection title="5.3. Enlaces y servicios de terceros">
          <p>
            La web puede incluir enlaces o contenido integrado de terceros. La
            Fundación no controla sus contenidos, disponibilidad ni prácticas
            de privacidad. La presencia de un enlace no implica necesariamente
            aprobación, asociación o respaldo.
          </p>
        </LegalSubsection>
      </LegalSection>

      <LegalSection
        id="informacion-proyectos"
        title="6. Naturaleza de la información sobre proyectos"
      >
        <div className="rounded border border-amber-300 bg-amber-50 p-5 text-amber-950">
          <p>
            La información sobre iniciativas, convocatorias, actividades,
            cursos, espacios 3D, calendarios, colaboraciones, plazos o futuras
            funcionalidades tiene carácter informativo y divulgativo. Puede
            cambiar a medida que evolucione cada proyecto y no constituye, por
            sí sola, una oferta contractual ni garantiza la admisión o
            participación.
          </p>
        </div>
        <p>
          Antes de adoptar una decisión basada en una iniciativa concreta, la
          persona interesada debe solicitar a la Fundación la información
          vigente y las condiciones específicas aplicables.
        </p>
      </LegalSection>

      <LegalSection
        id="privacidad-y-cookies"
        title="7. Protección de datos y cookies"
      >
        <p>
          El tratamiento de datos personales se explica en la{" "}
          <Link
            className="font-semibold text-sky-700 underline underline-offset-2"
            href="/politicas-de-privacidad"
          >
            Política de privacidad
          </Link>
          . El uso de cookies y el control sobre el contenido externo opcional
          se detallan en la{" "}
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
        id="legislacion"
        title="8. Legislación aplicable y jurisdicción"
      >
        <p>
          Este Aviso Legal se rige por la legislación española. Cuando la
          normativa permita pactar el fuero, las partes se someten a los
          Juzgados y Tribunales de Granada, España. Esta previsión no limita los
          derechos imperativos que correspondan a consumidores, usuarios o
          interesados conforme a la normativa aplicable.
        </p>
      </LegalSection>

      <LegalSection id="contacto" title="9. Contacto">
        <p>
          Para consultas relacionadas con la web o con este Aviso Legal puedes
          escribir a{" "}
          <a
            className="font-semibold text-sky-700 underline underline-offset-2"
            href="mailto:info@proyectakonscio.org"
          >
            info@proyectakonscio.org
          </a>{" "}
          o llamar al{" "}
          <a
            className="font-semibold text-sky-700 underline underline-offset-2"
            href="tel:+34697318741"
          >
            +34 697 318 741
          </a>
          .
        </p>
      </LegalSection>
    </LegalDocument>
  );
};

export default Page;
