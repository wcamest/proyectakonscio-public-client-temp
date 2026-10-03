import type { FormHTMLAttributes } from "react";

export type FormProps = FormHTMLAttributes<HTMLFormElement>;

const baseClasses = "flex w-full flex-col";

const Form = ({ className = "", ...props }: FormProps) => {
  const composedClassName = [baseClasses, className].filter(Boolean).join(" ");

  return <form {...props} className={composedClassName} />;
};

export default Form;
