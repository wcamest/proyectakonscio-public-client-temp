import type { SelectHTMLAttributes } from "react";

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  wrapperClassName?: string;
};

const baseClasses =
  "block w-full cursor-pointer appearance-none rounded border border-solid border-neutral-300 bg-white px-3 py-2.5 pr-10 text-base leading-6 text-neutral-900 shadow-sm transition-colors hover:border-neutral-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/25 disabled:cursor-not-allowed disabled:border-neutral-200 disabled:bg-neutral-100 disabled:text-neutral-500 disabled:shadow-none aria-invalid:border-red-500 aria-invalid:focus:border-red-500 aria-invalid:focus:ring-red-500/25 [&>option]:bg-white [&>option]:text-neutral-900";

const Select = ({
  children,
  className = "",
  wrapperClassName = "",
  disabled = false,
  ...props
}: SelectProps) => {
  const composedClassName = [baseClasses, className].filter(Boolean).join(" ");
  const iconClassName = [
    "pointer-events-none absolute inset-y-0 right-3 flex items-center",
    disabled ? "text-neutral-400" : "text-neutral-600",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={`relative w-full ${wrapperClassName}`}>
      <select
        {...props}
        disabled={disabled}
        className={composedClassName}
      >
        {children}
      </select>
      <span aria-hidden="true" className={iconClassName}>
        <i className="bi bi-chevron-down text-sm" />
      </span>
    </div>
  );
};

export default Select;
