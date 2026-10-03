"use client";

import type { ThemeColor } from "@/types/themeColor";

type PaginationItem = number | "start-ellipsis" | "end-ellipsis";

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  color?: ThemeColor;
  siblingCount?: number;
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
};

const activeColorClasses: Record<ThemeColor, string> = {
  slate: "border-slate-500 bg-slate-500 text-slate-50 ring-slate-500",
  gray: "border-gray-500 bg-gray-500 text-gray-50 ring-gray-500",
  zinc: "border-zinc-500 bg-zinc-500 text-zinc-50 ring-zinc-500",
  blue: "border-blue-500 bg-blue-500 text-blue-50 ring-blue-500",
  indigo: "border-indigo-500 bg-indigo-500 text-indigo-50 ring-indigo-500",
  sky: "border-sky-500 bg-sky-500 text-sky-50 ring-sky-500",
  cyan: "border-cyan-500 bg-cyan-500 text-cyan-50 ring-cyan-500",
  teal: "border-teal-500 bg-teal-500 text-teal-50 ring-teal-500",
  green: "border-green-500 bg-green-500 text-green-50 ring-green-500",
  emerald:
    "border-emerald-500 bg-emerald-500 text-emerald-50 ring-emerald-500",
  lime: "border-lime-500 bg-lime-500 text-lime-50 ring-lime-500",
  yellow: "border-yellow-500 bg-yellow-500 text-yellow-50 ring-yellow-500",
  orange: "border-orange-500 bg-orange-500 text-orange-50 ring-orange-500",
  violet: "border-violet-500 bg-violet-500 text-violet-50 ring-violet-500",
  purple: "border-purple-500 bg-purple-500 text-purple-50 ring-purple-500",
  fuchsia:
    "border-fuchsia-500 bg-fuchsia-500 text-fuchsia-50 ring-fuchsia-500",
  pink: "border-pink-500 bg-pink-500 text-pink-50 ring-pink-500",
  amber: "border-amber-500 bg-amber-500 text-amber-50 ring-amber-500",
  red: "border-red-500 bg-red-500 text-red-50 ring-red-500",
  stone: "border-stone-500 bg-stone-500 text-stone-50 ring-stone-500",
  rose: "border-rose-500 bg-rose-500 text-rose-50 ring-rose-500",
  neutral:
    "border-neutral-500 bg-neutral-500 text-neutral-50 ring-neutral-500",
};

const interactiveColorClasses: Record<ThemeColor, string> = {
  slate:
    "hover:border-slate-500 hover:bg-slate-50 hover:text-slate-700 ring-slate-500",
  gray:
    "hover:border-gray-500 hover:bg-gray-50 hover:text-gray-700 ring-gray-500",
  zinc:
    "hover:border-zinc-500 hover:bg-zinc-50 hover:text-zinc-700 ring-zinc-500",
  blue:
    "hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700 ring-blue-500",
  indigo:
    "hover:border-indigo-500 hover:bg-indigo-50 hover:text-indigo-700 ring-indigo-500",
  sky: "hover:border-sky-500 hover:bg-sky-50 hover:text-sky-700 ring-sky-500",
  cyan: "hover:border-cyan-500 hover:bg-cyan-50 hover:text-cyan-700 ring-cyan-500",
  teal: "hover:border-teal-500 hover:bg-teal-50 hover:text-teal-700 ring-teal-500",
  green:
    "hover:border-green-500 hover:bg-green-50 hover:text-green-700 ring-green-500",
  emerald:
    "hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700 ring-emerald-500",
  lime: "hover:border-lime-500 hover:bg-lime-50 hover:text-lime-700 ring-lime-500",
  yellow:
    "hover:border-yellow-500 hover:bg-yellow-50 hover:text-yellow-700 ring-yellow-500",
  orange:
    "hover:border-orange-500 hover:bg-orange-50 hover:text-orange-700 ring-orange-500",
  violet:
    "hover:border-violet-500 hover:bg-violet-50 hover:text-violet-700 ring-violet-500",
  purple:
    "hover:border-purple-500 hover:bg-purple-50 hover:text-purple-700 ring-purple-500",
  fuchsia:
    "hover:border-fuchsia-500 hover:bg-fuchsia-50 hover:text-fuchsia-700 ring-fuchsia-500",
  pink: "hover:border-pink-500 hover:bg-pink-50 hover:text-pink-700 ring-pink-500",
  amber:
    "hover:border-amber-500 hover:bg-amber-50 hover:text-amber-700 ring-amber-500",
  red: "hover:border-red-500 hover:bg-red-50 hover:text-red-700 ring-red-500",
  stone:
    "hover:border-stone-500 hover:bg-stone-50 hover:text-stone-700 ring-stone-500",
  rose: "hover:border-rose-500 hover:bg-rose-50 hover:text-rose-700 ring-rose-500",
  neutral:
    "hover:border-neutral-500 hover:bg-neutral-50 hover:text-neutral-700 ring-neutral-500",
};

const buttonBaseClasses =
  "inline-flex h-10 min-w-10 items-center justify-center rounded-r-full rounded-l-full border border-solid border-neutral-300 px-3 text-sm font-medium shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:border-neutral-200 disabled:bg-neutral-100 disabled:text-neutral-400 disabled:opacity-70 cursor-pointer";

const range = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, index) => start + index);

const getPaginationItems = (
  currentPage: number,
  totalPages: number,
  siblingCount: number,
): PaginationItem[] => {
  const maximumVisibleItems = siblingCount * 2 + 5;

  if (totalPages <= maximumVisibleItems) return range(1, totalPages);

  const leftSibling = Math.max(currentPage - siblingCount, 2);
  const rightSibling = Math.min(currentPage + siblingCount, totalPages - 1);
  const showLeftEllipsis = leftSibling > 2;
  const showRightEllipsis = rightSibling < totalPages - 1;

  if (!showLeftEllipsis && showRightEllipsis) {
    const visibleStartPages = range(1, siblingCount * 2 + 3);
    return [...visibleStartPages, "end-ellipsis", totalPages];
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    const visibleEndPages = range(
      totalPages - (siblingCount * 2 + 2),
      totalPages,
    );
    return [1, "start-ellipsis", ...visibleEndPages];
  }

  return [
    1,
    "start-ellipsis",
    ...range(leftSibling, rightSibling),
    "end-ellipsis",
    totalPages,
  ];
};

const normalizeInteger = (value: number, fallback: number) =>
  Number.isFinite(value) ? Math.trunc(value) : fallback;

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  color = "blue",
  siblingCount = 2,
  disabled = false,
  className = "",
  ariaLabel = "Paginación",
}: PaginationProps) => {
  const normalizedTotalPages = Math.max(0, normalizeInteger(totalPages, 0));

  if (normalizedTotalPages === 0) return null;

  const normalizedCurrentPage = Math.min(
    normalizedTotalPages,
    Math.max(1, normalizeInteger(currentPage, 1)),
  );
  const normalizedSiblingCount = Math.max(
    0,
    normalizeInteger(siblingCount, 2),
  );
  const paginationItems = getPaginationItems(
    normalizedCurrentPage,
    normalizedTotalPages,
    normalizedSiblingCount,
  );
  const interactiveClasses = `${buttonBaseClasses} border-neutral-300 bg-white text-neutral-700 ${interactiveColorClasses[color]}`;

  const handlePageChange = (page: number) => {
    if (disabled || page === normalizedCurrentPage) return;
    onPageChange(page);
  };

  return (
    <nav aria-label={ariaLabel} className={className}>
      <ul className="m-0 flex list-none flex-wrap items-center justify-center gap-1 p-0">
        <li>
          <button
            type="button"
            className={interactiveClasses}
            onClick={() => handlePageChange(normalizedCurrentPage - 1)}
            disabled={disabled || normalizedCurrentPage === 1}
            aria-label="Ir a la página anterior"
          >
            <span aria-hidden="true">{"<"}</span>
          </button>
        </li>

        {paginationItems.map((item) => {
          if (typeof item !== "number") {
            return (
              <li key={item} aria-hidden="true">
                <span className="inline-flex h-10 min-w-8 select-none items-center justify-center px-1 text-neutral-500">
                  …
                </span>
              </li>
            );
          }

          const isCurrentPage = item === normalizedCurrentPage;

          return (
            <li key={item}>
              <button
                type="button"
                className={`${buttonBaseClasses} ${
                  isCurrentPage
                    ? `${activeColorClasses[color]} cursor-default`
                    : interactiveColorClasses[color]
                }`}
                onClick={() => handlePageChange(item)}
                disabled={disabled}
                aria-current={isCurrentPage ? "page" : undefined}
                aria-label={
                  isCurrentPage
                    ? `Página ${item}, actual`
                    : `Ir a la página ${item}`
                }
              >
                {item}
              </button>
            </li>
          );
        })}

        <li>
          <button
            type="button"
            className={interactiveClasses}
            onClick={() => handlePageChange(normalizedCurrentPage + 1)}
            disabled={
              disabled || normalizedCurrentPage === normalizedTotalPages
            }
            aria-label="Ir a la página siguiente"
          >
            <span aria-hidden="true">{">"}</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
