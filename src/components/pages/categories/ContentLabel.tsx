import type { PropsWithChildren } from "react";
import { labelColorClasses, type ThemeColor } from "@/types/themeColor";

type ContentLabelProps = PropsWithChildren<{
  color?: ThemeColor;
  className?: string;
}>;

const baseClasses =
  "text-sm md:text-lg lg:text-3xl text-center font-bold uppercase p-2";

const ContentLabel = ({
  children,
  color = "blue",
  className = "",
}: ContentLabelProps) => {
  const composedClassName = [
    labelColorClasses[color].background,
    labelColorClasses[color].text,
    baseClasses,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <span className={composedClassName}>{children}</span>;
};

export default ContentLabel;
