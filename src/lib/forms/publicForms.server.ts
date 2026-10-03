import type { PublicFormDefinition } from "@/types/formsPublic";

const publicApiInternalOrigin =
  process.env.PUBLIC_API_INTERNAL_ORIGIN?.trim() || "http://127.0.0.1:4000";

/**
 * Server-only loader for public Form definitions.
 *
 * Pages call this before rendering and pass the serializable definition down
 * to the interactive client component. This keeps the field structure in the
 * initial HTML instead of fetching it in useEffect after hydration.
 */
export async function getPublicFormDefinition(
  formId: string,
): Promise<PublicFormDefinition | null> {
  const response = await fetch(
    `${publicApiInternalOrigin}/api/public/forms/${encodeURIComponent(formId)}`,
    {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store",
    },
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`PUBLIC_FORM_LOAD_FAILED:${response.status}`);
  }

  const body: unknown = await response.json();

  if (!isPublicFormDefinition(body) || body.formId !== formId) {
    throw new Error("PUBLIC_FORM_RESPONSE_INVALID");
  }

  return body;
}

function isPublicFormDefinition(value: unknown): value is PublicFormDefinition {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const candidate = value as Partial<PublicFormDefinition>;

  return (
    typeof candidate.formId === "string" &&
    typeof candidate.versionId === "string" &&
    candidate.schemaVersion === 1 &&
    Array.isArray(candidate.fields)
  );
}
