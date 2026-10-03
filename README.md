# ProyectaKonscio — Public Client

> Guía para una IA o desarrollador encargado de rediseñar la web pública.

Este repositorio alterno contiene **solo una copia de `public-client`**, la aplicación Next.js visible para los visitantes de ProyectaKonscio. Se entrega para poder rehacer la experiencia pública sin exponer ni modificar el monorepo privado completo.

Este repositorio es un **workspace temporal**. No es la fuente de verdad de producción. El resultado final será revisado e integrado posteriormente en el repositorio privado original.

## Alcance

Puedes modificar libremente diseño, layouts, navegación, responsive, estilos, animaciones, accesibilidad, componentes y composición de páginas.

Stack actual: **Next.js 16.3, React 19.2, TypeScript, Tailwind CSS 4** y React Three Fiber/Three.js en algunas secciones.

La condición principal es conservar la compatibilidad con los contratos públicos existentes del backend.

## Por qué no se entrega acceso al VPS ni al repositorio completo

No se necesita acceso al VPS para rediseñar `public-client`.

El proyecto privado también contiene `admin-client`, `server`, autenticación, permisos, base de datos, correo, Agenda, Google Meet, Media, Blogs, Forms, observabilidad y código operacional de producción.

Además, la web pública **no se despliega editando archivos manualmente en el VPS**. El backend ya dispone del módulo `public-site`, que administra candidatos de código, verificaciones, builds reproducibles, releases inmutables, promoción, health checks, detección de drift y rollback.

Por tanto, este repositorio debe producir **código fuente de `public-client`**. La integración y el despliegue final se realizan desde el proyecto principal.

No intentes conectarte al VPS, modificar Apache/PM2, crear otro sistema de despliegue ni utilizar rutas `/api/admin/**`.

## Frontera de responsabilidades

`public-client` es la capa visual. El backend sigue siendo la fuente de verdad.

No reimplementes en el navegador autenticación administrativa, permisos, acceso a base de datos, SMTP, moderación/publicación, OAuth de Google, creación de Google Meet, almacenamiento de Media ni lógica de despliegue.

No introduzcas secretos en código cliente ni en variables `NEXT_PUBLIC_*`.

## Integración con el backend

El navegador trabaja principalmente con URLs **same-origin**:

```text
/api/public/...
/media/...
```

`next.config.ts` contiene los rewrites hacia el servidor. El origen interno se configura mediante:

```text
PUBLIC_API_INTERNAL_ORIGIN
```

Si no se define en desarrollo, usa:

```text
http://127.0.0.1:4000
```

En código cliente conserva preferentemente llamadas relativas como:

```ts
fetch("/api/public/...")
```

No sustituyas sistemáticamente estas llamadas por URLs absolutas. La arquitectura same-origin forma parte del modelo de seguridad y despliegue.

Antes de crear clientes HTTP nuevos, revisar `src/lib/blogs/`, `src/lib/forms/` y `src/lib/agenda/`.

## APIs públicas consumibles

Base: `/api/public`.

Estas rutas no requieren sesión administrativa, aunque mantienen CORS, controles de Origin, límites y protección antiabuso.

| Método | Ruta | Uso |
|---|---|---|
| `GET` | `/api/public/blogs` | Lista blogs activos |
| `GET` | `/api/public/blogs/:blogSlug` | Obtiene un blog |
| `GET` | `/api/public/blogs/:blogSlug/posts` | Lista posts publicados |
| `GET` | `/api/public/blogs/:blogSlug/posts/:postSlug` | Obtiene un post publicado |
| `GET` | `/api/public/blogs/:blogSlug/posts/:postSlug/comments` | Lista comentarios aprobados |
| `POST` | `/api/public/blogs/:blogSlug/posts/:postSlug/comments` | Envía comentario a moderación |
| `GET` | `/api/public/forms/:formId` | Obtiene un formulario publicado |
| `POST` | `/api/public/forms/:formId/submissions` | Envía una respuesta |
| `GET` | `/api/public/agenda/availability?from=<ISO>&to=<ISO>` | Consulta disponibilidad |
| `POST` | `/api/public/agenda/meetings` | Solicita una reunión |
| `GET` | `/api/public/media/content?path=<relativePath>` | Sirve un archivo Media conocido |
| `POST` | `/api/public/observability/client-errors` | Reporte controlado de errores del navegador |

### Blogs

Los listados soportan paginación (`limit`, `offset`) y, según el recurso, `search` y `sort`.

Los posts son contenido estructurado y pueden incluir texto, imagen, vídeo y referencias a formularios. Para `schemaVersion: 2`, el HTML enriquecido llega sanitizado desde el backend.

Reutilizar preferentemente:

```text
src/lib/blogs/publicBlogs.server.ts
src/types/blogs.ts
src/components/blogs/
```

Los comentarios enviados públicamente se crean como `pending`; la moderación pertenece al panel administrativo.

### Forms

Los formularios son **dinámicos**. No hardcodear nuevamente su estructura si el backend ya la publica.

El envío usa:

```json
{
  "values": {
    "field_key": "valor"
  }
}
```

Las claves deben coincidir con `field.key` de la definición recibida.

Reutilizar:

```text
src/types/formsPublic.ts
src/lib/forms/publicForms.server.ts
src/components/forms/PublicServerForm.tsx
src/config/publicFormIds.ts
```

Los IDs usados por las páginas ya están centralizados en `src/config/publicFormIds.ts`.

### Agenda

Para crear una solicitud se requiere también:

```text
Idempotency-Key: <clave única>
```

Body público:

```json
{
  "requesterName": "Nombre",
  "requesterEmail": "persona@example.com",
  "requesterPhone": null,
  "subject": "Reunión",
  "message": null,
  "startAt": "2026-10-03T14:00:00.000Z"
}
```

La web pública **solo solicita la reunión**. Confirmación, correo, OAuth y aprovisionamiento de Google Meet pertenecen al backend/panel administrativo. No implementar credenciales ni llamadas privilegiadas a Google Meet desde el navegador.

Reutilizar `src/lib/agenda/publicAgenda.ts`, `src/types/agendaPublic.ts` y `src/components/agenda/`.

### Observabilidad

Antes de eliminar o sustituir el reporte público de errores revisar:

```text
src/features/observability/client/reporter.ts
```

También debe preservarse, salvo razón técnica explícita, `/site-metadata/release`, porque participa en la identificación/verificación de releases.

## Media

Los uploads runtime **no viven dentro de este repositorio** ni dentro de los releases de Next.

El namespace público canónico es:

```text
/media/<relativePath>
```

Ejemplos:

```text
/media/images/hero.avif
/media/videos/documental.webm
/media/pdf/documento.pdf
/media/three/modelo.glb
```

`public-client` reescribe esas URLs hacia `GET /api/public/media/content?path=<relativePath>`.

Ese endpoint sirve archivos conocidos, soporta byte ranges para vídeo, no lista directorios y no expone rutas físicas del VPS.

No copies toda la biblioteca Media al repositorio, no muevas uploads runtime a `public/`, no uses paths físicos del servidor y no llames `/api/admin/media/**`.

`next.config.ts` mantiene compatibilidad con URLs históricas como `/videos/*`, `/images/*`, `/pdf/*` y `/three/*`. Para nuevas referencias administradas por Media debe preferirse `/media/*`. No eliminar esos rewrites sin revisar las referencias existentes.

## Rutas públicas

El proyecto contiene rutas como `/`, `/blogs`, `/blogs/[blogSlug]`, `/blogs/[blogSlug]/[postSlug]`, `/categorias/*`, `/colabora`, `/unete-a-fairbnb`, `/webrtc-espacios-3d`, `/educacion-alternativa-en-8-clases` y páginas legales.

El diseño puede cambiar libremente. Si se cambia, elimina o renombra una URL pública, indícalo claramente para revisar redirecciones, SEO y compatibilidad.

## Desarrollo local

```bash
npm ci
npm run dev
```

Validaciones recomendadas:

```bash
npm run typecheck
npm run lint
npm run build
```

El build actual usa `next build --webpack`. No cambiarlo sin una razón técnica comprobada.

Para contenido dinámico se requiere un backend compatible mediante `PUBLIC_API_INTERNAL_ORIGIN`. Si no existe una instancia autorizada, conserva los contratos existentes y trabaja sobre la UI. **No desactives CORS, Origin, CSRF u otras defensas del backend para facilitar el desarrollo local.**

## Archivos importantes

Antes de reemplazar infraestructura existente revisar especialmente:

```text
next.config.ts
observability-release.ts
src/lib/blogs/
src/lib/forms/
src/lib/agenda/
src/types/blogs.ts
src/types/formsPublic.ts
src/types/agendaPublic.ts
src/config/publicFormIds.ts
src/features/observability/
src/components/blogs/
src/components/forms/
src/components/agenda/
```

`next.config.ts` no es una configuración genérica: contiene parte del contrato con API/Media y del build de producción.

También existe `AGENTS.md`. Esta versión de Next.js puede diferir de versiones conocidas por el modelo; si las dependencias están instaladas, consultar `node_modules/next/dist/docs/` antes de asumir APIs o convenciones antiguas.

## Reglas para la IA que haga el rediseño

1. Trabajar únicamente sobre `public-client`.
2. No asumir acceso al VPS, base de datos, panel administrativo o monorepo privado.
3. No usar ni intentar descubrir `/api/admin/**`.
4. Mantener compatibilidad con `/api/public/**` y `/media/**`.
5. No convertir Blogs, Forms o Agenda en mocks permanentes.
6. No hardcodear contenido que ya proviene del servidor.
7. No introducir secretos, OAuth, SMTP o claves privadas en el frontend.
8. No eliminar rewrites, observabilidad o metadata de release solo para simplificar la app.
9. No convertir runtime Media en assets versionados dentro del repositorio.
10. Mantener responsive, accesibilidad y SEO.
11. Documentar nuevas dependencias, variables de entorno o cambios de rutas/contratos.
12. Entregar código fuente reproducible; el despliegue final se hará desde el proyecto principal.

## Criterio de entrega

El resultado debe compilar, permanecer independiente de `admin-client`, seguir usando el backend para datos dinámicos, conservar Media mediante URLs públicas, no exponer secretos y documentar cualquier cambio que requiera integración adicional.

**Resumen:** este repositorio es el espacio de trabajo para rehacer la web pública, no una copia de toda la infraestructura de ProyectaKonscio. La separación permite trabajar sobre la experiencia visible sin poner en riesgo el backend, el panel administrativo o el flujo de producción.
