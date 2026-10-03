/**
 * Tipos públicos de Forms para public-client.
 *
 * Equivalentes al contrato JSON expuesto por:
 *
 *   GET  /api/public/forms/:formId
 *   POST /api/public/forms/:formId/submissions
 *
 * Este archivo contiene únicamente tipos del contrato público.
 * No incluye metadata administrativa ni replyEmailFieldKey porque
 * el servidor no los expone en PublicFormDefinitionDto.
 */

export type FormSchemaVersion = 1;

export type FormFieldType =
  | "short_text"
  | "long_text"
  | "email"
  | "phone"
  | "number"
  | "date"
  | "select"
  | "radio"
  | "checkbox"
  | "multiselect";

export type FormOption = Readonly<{
  value: string;
  label: string;
}>;

export type TextValidation = Readonly<{
  minLength: number | null;
  maxLength: number | null;
}>;

export type BaseFormField<TType extends FormFieldType> = Readonly<{
  /**
   * UUID estable del campo dentro de la definición versionada.
   */
  id: string;

  /**
   * Clave usada en el objeto `values` al enviar la solicitud.
   * Ejemplo: "first_name", "email", "category".
   */
  key: string;

  type: TType;

  label: string;

  helpText: string | null;

  required: boolean;

  /**
   * Posición canónica dentro del formulario.
   * El servidor publica los campos ordenados desde 0.
   */
  order: number;
}>;

export type ShortTextFormField =
  BaseFormField<"short_text"> &
    Readonly<{
      placeholder: string | null;
      validation: TextValidation;
    }>;

export type LongTextFormField =
  BaseFormField<"long_text"> &
    Readonly<{
      placeholder: string | null;
      validation: TextValidation;
    }>;

export type EmailFormField =
  BaseFormField<"email"> &
    Readonly<{
      placeholder: string | null;
    }>;

export type PhoneFormField =
  BaseFormField<"phone"> &
    Readonly<{
      placeholder: string | null;
      maxLength: number | null;
    }>;

export type NumberFormField =
  BaseFormField<"number"> &
    Readonly<{
      min: number | null;
      max: number | null;
      step: number | null;
    }>;

export type DateFormField =
  BaseFormField<"date"> &
    Readonly<{
      /**
       * Fecha ISO canónica YYYY-MM-DD.
       */
      minDate: string | null;

      /**
       * Fecha ISO canónica YYYY-MM-DD.
       */
      maxDate: string | null;
    }>;

export type SelectFormField =
  BaseFormField<"select"> &
    Readonly<{
      placeholder: string | null;
      options: readonly FormOption[];
    }>;

export type RadioFormField =
  BaseFormField<"radio"> &
    Readonly<{
      options: readonly FormOption[];
    }>;

export type CheckboxFormField = BaseFormField<"checkbox">;

export type MultiselectFormField =
  BaseFormField<"multiselect"> &
    Readonly<{
      options: readonly FormOption[];
      maxSelections: number | null;
    }>;

/**
 * Unión discriminada principal.
 *
 * `field.type` permite a React/TypeScript estrechar automáticamente
 * el tipo y acceder solo a las propiedades válidas para cada campo.
 */
export type FormField =
  | ShortTextFormField
  | LongTextFormField
  | EmailFormField
  | PhoneFormField
  | NumberFormField
  | DateFormField
  | SelectFormField
  | RadioFormField
  | CheckboxFormField
  | MultiselectFormField;

/**
 * Respuesta exacta del endpoint público:
 *
 * GET /api/public/forms/:formId
 */
export type PublicFormDefinition = Readonly<{
  formId: string;
  versionId: string;
  schemaVersion: FormSchemaVersion;
  fields: readonly FormField[];
}>;

/**
 * Valores que puede aceptar un campo al enviar una solicitud.
 *
 * - short_text, long_text, email, phone, date, select, radio -> string
 * - number -> number
 * - checkbox -> boolean
 * - multiselect -> string[]
 */
export type FormSubmissionValue =
  | string
  | number
  | boolean
  | readonly string[];

/**
 * Objeto enviado a:
 *
 * POST /api/public/forms/:formId/submissions
 *
 * Las claves deben coincidir con `field.key`.
 */
export type PublicFormSubmissionValues = Readonly<
  Record<string, FormSubmissionValue>
>;

export type PublicFormSubmissionPayload = Readonly<{
  values: PublicFormSubmissionValues;
}>;

/**
 * Respuesta 201 del servidor después de aceptar una solicitud.
 */
export type PublicFormSubmissionAccepted = Readonly<{
  submissionId: string;
  status: "new";
}>;

/**
 * Utilidades opcionales para componentes genéricos.
 */

export type TextLikeFormField =
  | ShortTextFormField
  | LongTextFormField
  | EmailFormField
  | PhoneFormField;

export type OptionsFormField =
  | SelectFormField
  | RadioFormField
  | MultiselectFormField;

export type FormFieldWithPlaceholder =
  | ShortTextFormField
  | LongTextFormField
  | EmailFormField
  | PhoneFormField
  | SelectFormField;

/**
 * Tipo del valor esperado según el tipo de campo.
 *
 * Ejemplo:
 *
 *   type Value = FormFieldValue<NumberFormField>; // number
 */
export type FormFieldValue<TField extends FormField> =
  TField["type"] extends
    | "short_text"
    | "long_text"
    | "email"
    | "phone"
    | "date"
    | "select"
    | "radio"
    ? string
    : TField["type"] extends "number"
      ? number
      : TField["type"] extends "checkbox"
        ? boolean
        : TField["type"] extends "multiselect"
          ? readonly string[]
          : never;

/**
 * Conveniente para un estado local mutable en React.
 *
 * A diferencia de `PublicFormSubmissionValues`, aquí los valores pueden
 * ser `undefined` mientras el visitante todavía no completa un campo.
 */
export type PublicFormDraftValues = Record<
  string,
  FormSubmissionValue | undefined
>;
