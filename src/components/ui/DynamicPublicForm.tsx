"use client";

import {
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react";

import type {
  FormField as FormFieldDefinition,
  FormSubmissionValue,
  PublicFormDefinition,
  PublicFormDraftValues,
  PublicFormSubmissionPayload,
} from "@/types/formsPublic";
import { useToast } from "@/providers/ToastProvider";
import Form from "./Form";
import Button from "./Button";
import FormField from "./FormField";
import Input from "./Input";
import TextArea from "./TextArea";
import Select from "./Select";

export type DynamicPublicFormProps = Readonly<{
  definition: PublicFormDefinition;

  /**
   * Recibe exactamente el payload esperado por:
   * POST /api/public/forms/:formId/submissions
   */
  onSubmit?: (
    payload: PublicFormSubmissionPayload,
    definition: PublicFormDefinition,
  ) => void | Promise<void>;

  submitLabel?: string;
  submittingLabel?: string;

  /**
   * Permite agregar clases sin perder la estructura base.
   */
  className?: string;

  /**
   * Deshabilita todos los controles y el submit.
   */
  disabled?: boolean;

  /**
   * Valores iniciales opcionales, útiles para formularios precargados.
   */
  initialValues?: PublicFormDraftValues;

  /**
   * Si es true, limpia los valores después de un submit exitoso.
   */
  resetOnSuccess?: boolean;

  /**
   * Mensaje genérico mostrado si onSubmit lanza.
   * No se muestra error.message para evitar filtrar respuestas internas.
   */
  submitErrorMessage?: string;

  /**
   * Permite que una pantalla componga su propio feedback sin duplicar
   * el toast genérico del renderer.
   */
  showSubmitError?: boolean;

  /**
   * Callback opcional para observar cambios desde el padre.
   */
  onValuesChange?: (values: PublicFormDraftValues) => void;
}>;

type FormStateProps = DynamicPublicFormProps;

/**
 * Renderer reusable para las definiciones públicas del módulo Forms.
 *
 * Importante:
 * - No conoce URLs.
 * - No hace fetch.
 * - No conoce CSRF/auth.
 * - Solo convierte una PublicFormDefinition en UI y produce
 *   PublicFormSubmissionPayload.
 *
 * El wrapper usa key={definition.versionId}; si cambia la versión pública,
 * React remonta el estado interno sin necesitar sincronizar state desde
 * useEffect.
 */
export function DynamicPublicForm(props: DynamicPublicFormProps) {
  return <DynamicPublicFormState key={props.definition.versionId} {...props} />;
}

function DynamicPublicFormState({
  definition,
  onSubmit,
  submitLabel = "Enviar",
  submittingLabel = "Enviando...",
  className,
  disabled = false,
  initialValues = {},
  resetOnSuccess = false,
  submitErrorMessage = "No se pudo enviar el formulario. Inténtalo nuevamente.",
  showSubmitError = true,
  onValuesChange,
}: FormStateProps) {
  const [values, setValues] = useState<PublicFormDraftValues>(() => ({
    ...initialValues,
  }));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();

  const updateValue = (key: string, value: FormSubmissionValue | undefined) => {
    setValues((current) => {
      const next: PublicFormDraftValues = {
        ...current,
        [key]: value,
      };

      onValuesChange?.(next);
      return next;
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (disabled || isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      const payload: PublicFormSubmissionPayload = {
        values: buildSubmissionValues(definition.fields, values),
      };

      await onSubmit?.(payload, definition);

      if (resetOnSuccess) {
        const nextValues: PublicFormDraftValues = {};
        setValues(nextValues);
        onValuesChange?.(nextValues);
      }
    } catch {
      if (showSubmitError) {
        showToast({
          tone: "error",
          title: "No se pudo enviar",
          message: submitErrorMessage,
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const formClassName = ["w-full max-w-xl gap-10", className]
    .filter(Boolean)
    .join(" ");

  return (
    <Form className={formClassName} onSubmit={handleSubmit}>
      <div className="flex flex-col gap-5">
        {definition.fields
          .slice()
          .sort((left, right) => left.order - right.order)
          .map((field) => (
            <DynamicField
              key={field.id}
              field={field}
              value={values[field.key]}
              disabled={disabled || isSubmitting}
              onChange={(value) => updateValue(field.key, value)}
            />
          ))}
      </div>

      <Button type="submit" disabled={disabled || isSubmitting}>
        {isSubmitting ? submittingLabel : submitLabel}
      </Button>
    </Form>
  );
}

type DynamicFieldProps = Readonly<{
  field: FormFieldDefinition;
  value: FormSubmissionValue | undefined;
  disabled: boolean;
  onChange: (value: FormSubmissionValue | undefined) => void;
}>;

function DynamicField({ field, value, disabled, onChange }: DynamicFieldProps) {
  return (
    <FormField label={field.label} required={field.required}>
      <div className="flex flex-col gap-1.5">
        {renderFieldControl(field, value, disabled, onChange)}

        {field.helpText ? (
          <p className="text-sm opacity-70">{field.helpText}</p>
        ) : null}
      </div>
    </FormField>
  );
}

function renderFieldControl(
  field: FormFieldDefinition,
  value: FormSubmissionValue | undefined,
  disabled: boolean,
  onChange: (value: FormSubmissionValue | undefined) => void,
): ReactNode {
  switch (field.type) {
    case "short_text":
      return (
        <Input
          type="text"
          name={field.key}
          value={stringValue(value)}
          placeholder={field.placeholder ?? undefined}
          required={field.required}
          minLength={field.validation.minLength ?? undefined}
          maxLength={field.validation.maxLength ?? undefined}
          disabled={disabled}
          onChange={(event) => onChange(optionalString(event.target.value))}
        />
      );

    case "long_text":
      return (
        <TextArea
          name={field.key}
          value={stringValue(value)}
          placeholder={field.placeholder ?? undefined}
          required={field.required}
          minLength={field.validation.minLength ?? undefined}
          maxLength={field.validation.maxLength ?? undefined}
          disabled={disabled}
          onChange={(event) => onChange(optionalString(event.target.value))}
        />
      );

    case "email":
      return (
        <Input
          type="email"
          name={field.key}
          value={stringValue(value)}
          placeholder={field.placeholder ?? undefined}
          required={field.required}
          autoComplete="email"
          disabled={disabled}
          onChange={(event) => onChange(optionalString(event.target.value))}
        />
      );

    case "phone":
      return (
        <Input
          type="tel"
          name={field.key}
          value={stringValue(value)}
          placeholder={field.placeholder ?? undefined}
          required={field.required}
          maxLength={field.maxLength ?? undefined}
          autoComplete="tel"
          disabled={disabled}
          onChange={(event) => onChange(optionalString(event.target.value))}
        />
      );

    case "number":
      return (
        <Input
          type="number"
          name={field.key}
          value={numberInputValue(value)}
          required={field.required}
          min={field.min ?? undefined}
          max={field.max ?? undefined}
          step={field.step ?? "any"}
          disabled={disabled}
          onChange={(event) => onChange(optionalNumber(event.target.value))}
        />
      );

    case "date":
      return (
        <Input
          type="date"
          name={field.key}
          value={stringValue(value)}
          required={field.required}
          min={field.minDate ?? undefined}
          max={field.maxDate ?? undefined}
          disabled={disabled}
          onChange={(event) => onChange(optionalString(event.target.value))}
        />
      );

    case "select":
      return (
        <Select
          name={field.key}
          value={stringValue(value)}
          required={field.required}
          disabled={disabled}
          onChange={(event) => onChange(optionalString(event.target.value))}
        >
          <option value="">
            {field.placeholder ?? "Selecciona una opción"}
          </option>

          {field.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      );

    case "radio":
      return (
        <div className="flex flex-col gap-2">
          {field.options.map((option) => {
            const optionId = `${field.id}-${option.value}`;

            return (
              <label
                key={option.value}
                htmlFor={optionId}
                className="flex items-center gap-2"
              >
                <input
                  id={optionId}
                  type="radio"
                  name={field.key}
                  value={option.value}
                  checked={value === option.value}
                  required={field.required}
                  disabled={disabled}
                  onChange={() => onChange(option.value)}
                />
                <span>{option.label}</span>
              </label>
            );
          })}
        </div>
      );

    case "checkbox":
      return (
        <input
          className="h-5 w-5"
          type="checkbox"
          name={field.key}
          aria-label={field.label}
          checked={value === true}
          required={field.required}
          disabled={disabled}
          onChange={(event) => onChange(event.target.checked)}
        />
      );

    case "multiselect":
      return (
        <Select
          multiple
          name={field.key}
          value={arrayValue(value)}
          required={field.required}
          disabled={disabled}
          onChange={(event) => {
            const selected = selectedValues(event);

            if (
              field.maxSelections !== null &&
              selected.length > field.maxSelections
            ) {
              return;
            }

            onChange(selected.length > 0 ? selected : undefined);
          }}
        >
          {field.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      );

    default:
      return assertNever(field);
  }
}

/**
 * Elimina valores vacíos antes de construir el POST.
 *
 * El servidor sigue siendo la autoridad final de validación.
 */
function buildSubmissionValues(
  fields: readonly FormFieldDefinition[],
  draft: PublicFormDraftValues,
): Readonly<Record<string, FormSubmissionValue>> {
  const result: Record<string, FormSubmissionValue> = {};

  for (const field of fields) {
    const value = draft[field.key];

    if (value === undefined) {
      continue;
    }

    if (typeof value === "string" && value.length === 0) {
      continue;
    }

    if (Array.isArray(value) && value.length === 0) {
      continue;
    }

    result[field.key] = value;
  }

  return result;
}

function stringValue(value: FormSubmissionValue | undefined): string {
  return typeof value === "string" ? value : "";
}

function numberInputValue(value: FormSubmissionValue | undefined): number | "" {
  return typeof value === "number" ? value : "";
}

function arrayValue(value: FormSubmissionValue | undefined): readonly string[] {
  return Array.isArray(value) ? value : [];
}

function optionalString(value: string): string | undefined {
  return value === "" ? undefined : value;
}

function optionalNumber(value: string): number | undefined {
  if (value === "") {
    return undefined;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function selectedValues(
  event: ChangeEvent<HTMLSelectElement>,
): readonly string[] {
  return Array.from(
    event.currentTarget.selectedOptions,
    (option) => option.value,
  );
}

function assertNever(value: never): never {
  throw new Error(`Unsupported public form field: ${String(value)}`);
}
