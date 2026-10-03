export type ThemeColor =
  | "slate"
  | "gray"
  | "zinc"
  | "blue"
  | "indigo"
  | "sky"
  | "cyan"
  | "teal"
  | "green"
  | "emerald"
  | "lime"
  | "yellow"
  | "orange"
  | "violet"
  | "purple"
  | "fuchsia"
  | "pink"
  | "amber"
  | "red"
  | "stone"
  | "rose"
  | "neutral";

export const labelColorClasses: Record<ThemeColor, { background: string; text: string }> = {
  slate: { background: "bg-slate-500 bg-opacity-60", text: "text-slate-50" },
  gray: { background: "bg-gray-500 bg-opacity-60", text: "text-gray-50" },
  zinc: { background: "bg-zinc-500 bg-opacity-60", text: "text-zinc-50" },
  blue: { background: "bg-blue-500 bg-opacity-60", text: "text-blue-50" },
  indigo: { background: "bg-indigo-500 bg-opacity-60", text: "text-indigo-50" },
  sky: { background: "bg-sky-500 bg-opacity-60", text: "text-sky-50" },
  cyan: { background: "bg-cyan-500 bg-opacity-60", text: "text-cyan-50" },
  teal: { background: "bg-teal-500 bg-opacity-60", text: "text-teal-50" },
  green: { background: "bg-green-500 bg-opacity-60", text: "text-green-50" },
  emerald: { background: "bg-emerald-500 bg-opacity-60", text: "text-emerald-50" },
  lime: { background: "bg-lime-500 bg-opacity-60", text: "text-lime-50" },
  yellow: { background: "bg-yellow-500 bg-opacity-60", text: "text-yellow-50" },
  orange: { background: "bg-orange-500 bg-opacity-60", text: "text-orange-50" },
  violet: { background: "bg-violet-500 bg-opacity-60", text: "text-violet-50" },
  purple: { background: "bg-purple-500 bg-opacity-60", text: "text-purple-50" },
  fuchsia: { background: "bg-fuchsia-500 bg-opacity-60", text: "text-fuchsia-50" },
  pink: { background: "bg-pink-500 bg-opacity-60", text: "text-pink-50" },
  amber: { background: "bg-amber-500 bg-opacity-60", text: "text-amber-50" },
  red: { background: "bg-red-500 bg-opacity-60", text: "text-red-50" },
  stone: { background: "bg-stone-500 bg-opacity-60", text: "text-stone-50" },
  rose: { background: "bg-rose-500 bg-opacity-60", text: "text-rose-50" },
  neutral: { background: "bg-neutral-500 bg-opacity-60", text: "text-neutral-50" },
};
