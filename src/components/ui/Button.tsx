import type { ThemeColor } from "@/types/themeColor";
import Link from "next/link";
import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: ThemeColor;
  href?: string;
};

const colorClasses: Record<ThemeColor, string> = {
  slate:
    "bg-slate-500 border-slate-500 text-slate-50 hover:bg-slate-700 hover:border-slate-700 active:bg-slate-50 active:text-slate-700",
  gray: "bg-gray-500 border-gray-500 text-gray-50 hover:bg-gray-700 hover:border-gray-700 active:bg-gray-50 active:text-gray-700",
  zinc: "bg-zinc-500 border-zinc-500 text-zinc-50 hover:bg-zinc-700 hover:border-zinc-700 active:bg-zinc-50 active:text-zinc-700",
  blue: "bg-blue-500 border-blue-500 text-blue-50 hover:bg-blue-700 hover:border-blue-700 active:bg-blue-50 active:text-blue-700",
  indigo:
    "bg-indigo-500 border-indigo-500 text-indigo-50 hover:bg-indigo-700 hover:border-indigo-700 active:bg-indigo-50 active:text-indigo-700",
  sky: "bg-sky-500 border-sky-500 text-sky-50 hover:bg-sky-700 hover:border-sky-700 active:bg-sky-50 active:text-sky-700",
  cyan: "bg-cyan-500 border-cyan-500 text-cyan-50 hover:bg-cyan-700 hover:border-cyan-700 active:bg-cyan-50 active:text-cyan-700",
  teal: "bg-teal-500 border-teal-500 text-teal-50 hover:bg-teal-700 hover:border-teal-700 active:bg-teal-50 active:text-teal-700",
  green:
    "bg-green-500 border-green-500 text-green-50 hover:bg-green-700 hover:border-green-700 active:bg-green-50 active:text-green-700",
  emerald:
    "bg-emerald-500 border-emerald-500 text-emerald-50 hover:bg-emerald-700 hover:border-emerald-700 active:bg-emerald-50 active:text-emerald-700",
  lime: "bg-lime-500 border-lime-500 text-lime-50 hover:bg-lime-700 hover:border-lime-700 active:bg-lime-50 active:text-lime-700",
  yellow:
    "bg-yellow-500 border-yellow-500 text-yellow-50 hover:bg-yellow-700 hover:border-yellow-700 active:bg-yellow-50 active:text-yellow-700",
  orange:
    "bg-orange-500 border-orange-500 text-orange-50 hover:bg-orange-700 hover:border-orange-700 active:bg-orange-50 active:text-orange-700",
  violet:
    "bg-violet-500 border-violet-500 text-violet-50 hover:bg-violet-700 hover:border-violet-700 active:bg-violet-50 active:text-violet-700",
  purple:
    "bg-purple-500 border-purple-500 text-purple-50 hover:bg-purple-700 hover:border-purple-700 active:bg-purple-50 active:text-purple-700",
  fuchsia:
    "bg-fuchsia-500 border-fuchsia-500 text-fuchsia-50 hover:bg-fuchsia-700 hover:border-fuchsia-700 active:bg-fuchsia-50 active:text-fuchsia-700",
  pink: "bg-pink-500 border-pink-500 text-pink-50 hover:bg-pink-700 hover:border-pink-700 active:bg-pink-50 active:text-pink-700",
  amber:
    "bg-amber-500 border-amber-500 text-amber-50 hover:bg-amber-700 hover:border-amber-700 active:bg-amber-50 active:text-amber-700",
  red: "bg-red-500 border-red-500 text-red-50 hover:bg-red-700 hover:border-red-700 active:bg-red-50 active:text-red-700",
  stone:
    "bg-stone-500 border-stone-500 text-stone-50 hover:bg-stone-700 hover:border-stone-700 active:bg-stone-50 active:text-stone-700",
  rose: "bg-rose-500 border-rose-500 text-rose-50 hover:bg-rose-700 hover:border-rose-700 active:bg-rose-50 active:text-rose-700",
  neutral:
    "bg-neutral-500 border-neutral-500 text-neutral-50 hover:bg-neutral-700 hover:border-neutral-700 active:bg-neutral-50 active:text-neutral-700",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded border border-solid shadow transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 px-4 py-2 text-base cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 text-center";

const Button = ({
  href,
  color = "blue",
  className = "",
  type = "button",
  children,
  ...props
}: PropsWithChildren<ButtonProps>) => {
  const composedClassName = [baseClasses, colorClasses[color], className]
    .filter(Boolean)
    .join(" ");

  if (href)
    return (
      <Link href={href} target="_blank" className={composedClassName}>
        {children}
      </Link>
    );
  return (
    <button {...props} type={type} className={composedClassName}>
      {children}
    </button>
  );
};

export default Button;
