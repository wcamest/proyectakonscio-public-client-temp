import type { InputHTMLAttributes } from "react";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

const baseClasses =
  "block w-full rounded border border-solid border-neutral-300 bg-white px-3 py-2.5 text-base leading-6 text-neutral-900 shadow-sm transition-colors placeholder:text-neutral-400 hover:border-neutral-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/25 disabled:cursor-not-allowed disabled:border-neutral-200 disabled:bg-neutral-100 disabled:text-neutral-500 disabled:shadow-none read-only:bg-neutral-50 aria-invalid:border-red-500 aria-invalid:focus:border-red-500 aria-invalid:focus:ring-red-500/25";

const Input = ({
  className = "",
  type = "text",
  ...props
}: InputProps) => {
  const composedClassName = [baseClasses, className].filter(Boolean).join(" ");

  return <input {...props} type={type} className={composedClassName} />;
};

export default Input;
