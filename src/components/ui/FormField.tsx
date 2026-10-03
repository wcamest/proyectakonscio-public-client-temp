import { cloneElement, isValidElement } from "react";
import type {
  AriaAttributes,
  HTMLAttributes,
  PropsWithChildren,
  ReactNode,
} from "react";

type FormControlProps = {
  id?: string;
  required?: boolean;
  "aria-describedby"?: string;
  "aria-invalid"?: AriaAttributes["aria-invalid"];
};

export type FormFieldProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
> & {
  label?: ReactNode;
  htmlFor?: string;
  error?: ReactNode;
  info?: ReactNode;
  required?: boolean;
};

const hasContent = (value: ReactNode) =>
  value !== undefined && value !== null && value !== false && value !== "";

const FormField = ({
  children,
  label,
  htmlFor,
  error,
  info,
  required = false,
  className = "",
  ...props
}: PropsWithChildren<FormFieldProps>) => {
  const hasError = hasContent(error);
  const hasInfo = !hasError && hasContent(info);
  const control = isValidElement<FormControlProps>(children) ? children : null;
  const controlId = control?.props.id ?? htmlFor;
  const messageId =
    hasError || hasInfo ? `${controlId}-message` : undefined;
  const isRequired = required || Boolean(control?.props.required);

  const describedBy = [
    control?.props["aria-describedby"],
    messageId,
  ]
    .filter((value): value is string => Boolean(value))
    .join(" ");

  const decoratedChildren = control
    ? cloneElement(control, {
        id: controlId,
        required: control.props.required ?? required,
        "aria-describedby": describedBy || undefined,
        "aria-invalid": hasError
          ? true
          : control.props["aria-invalid"],
      })
    : children;

  const composedClassName = ["flex w-full flex-col gap-2", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div {...props} className={composedClassName}>
      <label
        htmlFor={controlId}
        className="w-fit text-sm font-semibold text-neutral-800"
      >
        {label}
        {isRequired && (
          <>
            <span aria-hidden="true" className="ml-1 text-red-600">
              *
            </span>
            <span className="sr-only"> (campo obligatorio)</span>
          </>
        )}
      </label>

      {decoratedChildren}

      {(hasError || hasInfo) && (
        <p
          id={messageId}
          role={hasError ? "alert" : undefined}
          className={`flex items-start gap-2 text-sm ${
            hasError ? "text-red-600" : "text-blue-700"
          }`}
        >
          <i
            aria-hidden="true"
            className={`bi mt-0.5 shrink-0 ${
              hasError ? "bi-exclamation-circle-fill" : "bi-info-circle-fill"
            }`}
          />
          <span>{hasError ? error : info}</span>
        </p>
      )}
    </div>
  );
};

export default FormField;
