import Image from "next/image";

import MediaBanner from "@/components/ui/MediaBanner";
import type { PublicBlog, PublicBlogPostSummary } from "@/types/blogs";
import type { ThemeColor } from "@/types/themeColor";
import { labelColorClasses } from "@/types/themeColor";

import BlogFilters, { type BlogFilterState } from "@/components/blogs/BlogFilters";
import BlogPagination from "@/components/blogs/BlogPagination";
import BlogPostCard from "@/components/blogs/BlogPostCard";
import BlogsCatalog from "@/components/blogs/BlogsCatalog";

type Props = Readonly<{
  blog: PublicBlog;
  posts: readonly PublicBlogPostSummary[];
  total: number;
  currentPage: number;
  totalPages: number;
  filters: BlogFilterState;
  color?: ThemeColor;
}>;

export default function BlogsTemplate({
  blog,
  posts,
  total,
  currentPage,
  totalPages,
  filters,
  color = "blue",
}: Props) {
  const action = `/blogs/${encodeURIComponent(blog.slug)}`;

  return (
    <main className="flex flex-col bg-white">
      <MediaBanner
        media={blog.imageUrl ? <BlogBannerImage src={blog.imageUrl} /> : undefined}
        label={
          <div
            className={`${labelColorClasses[color].background} ${labelColorClasses[color].text} flex flex-col items-center justify-center gap-2 bg-opacity-70 p-5 lg:p-10`}
          >
            <h1 className="text-3xl font-bold md:text-5xl lg:text-7xl">{blog.name}</h1>
          </div>
        }
      />

      <section className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 py-8 lg:py-10">
        {blog.description ? (
          <p className="max-w-3xl text-base leading-7 text-neutral-600">{blog.description}</p>
        ) : null}

        <BlogFilters action={action} value={filters} />

        <div className="flex items-center justify-between gap-4 text-sm text-neutral-500">
          <span>{total === 1 ? "1 publicación" : `${total} publicaciones`}</span>
          {totalPages > 1 ? <span>Página {currentPage} de {totalPages}</span> : null}
        </div>

        {posts.length > 0 ? (
          <BlogsCatalog
            className="gap-5"
            items={posts.map((post) => <BlogPostCard key={post.id} data={post} />)}
          />
        ) : (
          <div className="rounded border border-dashed border-neutral-300 bg-neutral-50 px-5 py-12 text-center">
            <h2 className="text-lg font-semibold text-neutral-800">No encontramos publicaciones</h2>
            <p className="mt-2 text-sm text-neutral-600">
              Prueba con otra búsqueda o limpia los filtros para ver todo el contenido disponible.
            </p>
          </div>
        )}

        <BlogPagination
          blogSlug={blog.slug}
          currentPage={currentPage}
          totalPages={totalPages}
          search={filters.search}
          sort={filters.sort}
          perPage={filters.perPage}
          color={color}
        />
      </section>
    </main>
  );
}

function BlogBannerImage({ src }: Readonly<{ src: string }>) {
  return (
    <Image
      src={src}
      alt=""
      fill
      sizes="100vw"
      className="object-cover"
      priority
      unoptimized
    />
  );
}
