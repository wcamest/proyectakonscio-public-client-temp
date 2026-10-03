import type { HTMLAttributes, PropsWithChildren, ReactNode } from "react";

export type AlertTone = "info" | "success" | "warning" | "error";

export type AlertProps = Omit<HTMLAttributes<HTMLDivElement>, "title"> & {
  title?: ReactNode;
  tone?: AlertTone;
};

const toneClasses: Record<AlertTone, string> = {
  info: "border-blue-300 bg-blue-50 text-blue-800",
  success: "border-green-300 bg-green-50 text-green-800",
  warning: "border-amber-300 bg-amber-50 text-amber-900",
  error: "border-red-300 bg-red-50 text-red-800",
};

const toneIcons: Record<AlertTone, string> = {
  info: "bi-info-circle-fill",
  success: "bi-check-circle-fill",
  warning: "bi-exclamation-triangle-fill",
  error: "bi-exclamation-circle-fill",
};

const Alert = ({
  title,
  tone = "info",
  className = "",
  children,
  role,
  ...props
}: PropsWithChildren<AlertProps>) => {
  const composedClassName = [
    "flex w-full items-start gap-3 rounded border border-solid p-4",
    toneClasses[tone],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      {...props}
      role={role ?? (tone === "error" ? "alert" : "status")}
      className={composedClassName}
    >
      <i
        aria-hidden="true"
        className={`bi ${toneIcons[tone]} mt-0.5 shrink-0 text-lg`}
      />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        {title ? <strong className="font-semibold">{title}</strong> : null}
        {children ? <div className="text-sm leading-6">{children}</div> : null}
      </div>
    </div>
  );
};

export default Alert;
