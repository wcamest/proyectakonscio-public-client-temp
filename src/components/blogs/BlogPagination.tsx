"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

import Pagination from "@/components/ui/Pagination";
import type { PublicBlogPostSort } from "@/types/blogs";
import type { ThemeColor } from "@/types/themeColor";

type Props = Readonly<{
  blogSlug: string;
  currentPage: number;
  totalPages: number;
  search: string;
  sort: PublicBlogPostSort;
  perPage: number;
  color?: ThemeColor;
}>;

export default function BlogPagination({
  blogSlug,
  currentPage,
  totalPages,
  search,
  sort,
  perPage,
  color = "blue",
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  if (totalPages <= 1) return null;

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      color={color}
      disabled={isPending}
      ariaLabel="Paginación de publicaciones"
      onPageChange={(nextPage) => {
        const href = buildPageHref(blogSlug, nextPage, { search, sort, perPage });
        startTransition(() => {
          router.push(href, { scroll: true });
        });
      }}
    />
  );
}

function buildPageHref(
  blogSlug: string,
  page: number,
  filters: Readonly<{ search: string; sort: PublicBlogPostSort; perPage: number }>,
): string {
  const params = new URLSearchParams();
  if (filters.search.length > 0) params.set("q", filters.search);
  if (filters.sort !== "newest") params.set("sort", filters.sort);
  if (filters.perPage !== 9) params.set("perPage", String(filters.perPage));
  if (page > 1) params.set("page", String(page));

  const base = `/blogs/${encodeURIComponent(blogSlug)}`;
  const query = params.toString();
  return query.length === 0 ? base : `${base}?${query}`;
}
