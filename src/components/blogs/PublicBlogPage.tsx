import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import BlogsTemplate from "@/templates/blogs/BlogsTemplate";
import type { PublicBlogPostSort } from "@/types/blogs";
import {
  getPublicBlog,
  listPublicBlogPosts,
} from "@/lib/blogs/publicBlogs.server";
import type { BlogFilterState } from "./BlogFilters";

export type BlogPageSearchParams = Record<string, string | string[] | undefined>;

export async function PublicBlogPage({
  blogSlug,
  searchParams,
}: Readonly<{
  blogSlug: string;
  searchParams: BlogPageSearchParams;
}>) {
  const blog = await getPublicBlog(blogSlug);
  if (blog === null) notFound();

  const filters = parseFilters(searchParams);
  const rawRequestedPage = parsePositiveInt(first(searchParams.page), 1);
  const maxApiPage = Math.floor(100_000 / filters.perPage) + 1;
  const requestedPage = Math.min(rawRequestedPage, maxApiPage);
  const offset = (requestedPage - 1) * filters.perPage;

  const page = await listPublicBlogPosts(blog.slug, {
    limit: filters.perPage,
    offset,
    sort: filters.sort,
    ...(filters.search.length === 0 ? {} : { search: filters.search }),
  });
  if (page === null) notFound();

  const totalPages = page.total === 0 ? 1 : Math.ceil(page.total / filters.perPage);
  if (page.total === 0 && requestedPage > 1) {
    redirect(buildPageHref(blog.slug, 1, filters));
  }
  if (requestedPage > totalPages && page.total > 0) {
    redirect(buildPageHref(blog.slug, totalPages, filters));
  }

  return (
    <BlogsTemplate
      blog={blog}
      posts={page.items}
      total={page.total}
      currentPage={Math.min(requestedPage, totalPages)}
      totalPages={totalPages}
      filters={filters}
    />
  );
}

export async function generatePublicBlogMetadata(blogSlug: string): Promise<Metadata> {
  try {
    const blog = await getPublicBlog(blogSlug);
    if (blog === null) return { title: "Blog no encontrado - Proyecta Konscio" };
    return {
      title: `${blog.name} - Proyecta Konscio`,
      description: blog.description ?? `Publicaciones de ${blog.name} en Proyecta Konscio.`,
      openGraph: {
        title: `${blog.name} - Proyecta Konscio`,
        description: blog.description ?? undefined,
        images: blog.imageUrl ? [{ url: blog.imageUrl }] : undefined,
      },
    };
  } catch {
    return { title: "Blogs - Proyecta Konscio" };
  }
}

function parseFilters(searchParams: BlogPageSearchParams): BlogFilterState {
  const rawSearch = first(searchParams.q)?.trim().normalize("NFC") ?? "";
  const search = rawSearch.slice(0, 200);
  const rawSort = first(searchParams.sort);
  const sort = isPostSort(rawSort) ? rawSort : "newest";
  const rawPerPage = parsePositiveInt(first(searchParams.perPage), 9);
  const perPage = rawPerPage === 6 || rawPerPage === 12 ? rawPerPage : 9;
  return Object.freeze({ search, sort, perPage });
}

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function parsePositiveInt(value: string | undefined, fallback: number): number {
  if (value === undefined || !/^\d+$/u.test(value)) return fallback;
  const parsed = Number(value);
  return Number.isSafeInteger(parsed) && parsed >= 1 ? parsed : fallback;
}

function isPostSort(value: string | undefined): value is PublicBlogPostSort {
  return value === "newest" || value === "oldest" || value === "title_asc" || value === "title_desc";
}

function buildPageHref(blogSlug: string, page: number, filters: BlogFilterState): string {
  const params = new URLSearchParams();
  if (filters.search.length > 0) params.set("q", filters.search);
  if (filters.sort !== "newest") params.set("sort", filters.sort);
  if (filters.perPage !== 9) params.set("perPage", String(filters.perPage));
  if (page > 1) params.set("page", String(page));
  const query = params.toString();
  const base = `/blogs/${encodeURIComponent(blogSlug)}`;
  return query.length === 0 ? base : `${base}?${query}`;
}
