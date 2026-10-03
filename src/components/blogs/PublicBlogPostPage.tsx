import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import BlogPostContent from "@/components/blogs/BlogPostContent";
import PublicComments from "@/components/blogs/PublicComments";
import Button from "@/components/ui/Button";
import {
  getPublicBlogPost,
  listPublicBlogComments,
} from "@/lib/blogs/publicBlogs.server";
import Image from "next/image";

export async function PublicBlogPostPage({
  blogSlug,
  postSlug,
}: Readonly<{
  blogSlug: string;
  postSlug: string;
}>) {
  const detail = await getPublicBlogPost(blogSlug, postSlug);
  if (detail === null) notFound();
  let comments: Awaited<ReturnType<typeof listPublicBlogComments>> = null;
  let commentsUnavailable = false;

  try {
    comments = await listPublicBlogComments(
      detail.blog.slug,
      detail.post.slug,
      {
        limit: 100,
        offset: 0,
        sort: "oldest",
      },
    );
    if (comments === null) commentsUnavailable = true;
  } catch {
    commentsUnavailable = true;
  }

  return (
    <main className="w-full bg-white">
      <article className="flex w-full flex-col gap-8">
        {/**px-5 py-8 md:py-12*/}
        <div className="relative h-[22rem] w-full overflow-hidden bg-neutral-900 sm:h-[26rem] md:h-auto md:aspect-video md:max-h-screen">
          {detail.post.imageUrl ? (
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src={detail.post.imageUrl}
                alt=""
                fill
                fetchPriority="high"
                className="size-full object-cover object-center opacity-50"
                unoptimized
              />
            </div>
          ) : null}

          <div className="relative z-30 flex size-full items-end px-5 py-6 sm:px-8 sm:py-8 md:p-12 lg:p-20 xl:p-32">
            <header className="flex min-w-0 max-w-5xl flex-col gap-3 text-white sm:gap-4">
              <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-200 sm:gap-3 sm:text-sm">
                <span className="rounded-full bg-blue-50 px-3 py-1 font-medium text-blue-700">
                  {detail.blog.name}
                </span>
                <time dateTime={detail.post.publishedAt}>
                  {formatPublishedDate(detail.post.publishedAt)}
                </time>
              </div>

              <h1 className="min-w-0 wrap-break-word text-2xl font-bold leading-[1.12] sm:text-3xl md:text-4xl lg:text-5xl">
                {detail.post.title}
              </h1>
            </header>
          </div>
        </div>

        <div className="flex w-full min-w-0 justify-center px-5 py-8 md:py-12">
          <div className="flex w-full min-w-0 max-w-4xl flex-col gap-8">
            <nav
              aria-label="Migas de pan"
              className="min-w-0 wrap-break-word text-sm text-neutral-500"
            >
              <Link
                href="/blogs"
                className="hover:text-blue-700 hover:underline"
              >
                Blogs
              </Link>
              <span className="mx-2" aria-hidden="true">
                /
              </span>
              <Link
                href={`/blogs/${encodeURIComponent(detail.blog.slug)}`}
                className="hover:text-blue-700 hover:underline"
              >
                {detail.blog.name}
              </Link>
            </nav>

            {detail.post.excerpt ? (
              <p className="min-w-0 wrap-break-word text-lg leading-8 text-neutral-600">
                {detail.post.excerpt}
              </p>
            ) : null}

            <BlogPostContent document={detail.content} />

            <div className="flex border-t border-neutral-200 pt-6">
              <Button
                href={`/blogs/${encodeURIComponent(detail.blog.slug)}`}
                color="neutral"
              >
                Volver a {detail.blog.name}
              </Button>
            </div>

            <PublicComments
              blogSlug={detail.blog.slug}
              postSlug={detail.post.slug}
              comments={comments?.items ?? []}
              total={comments?.total ?? 0}
              commentsEnabled
              commentsUnavailable={commentsUnavailable}
            />
          </div>
        </div>
      </article>
    </main>
  );
}

export async function generatePublicBlogPostMetadata(
  blogSlug: string,
  postSlug: string,
): Promise<Metadata> {
  try {
    const detail = await getPublicBlogPost(blogSlug, postSlug);
    if (detail === null)
      return { title: "Artículo no encontrado - Proyecta Konscio" };
    const description =
      detail.post.excerpt ?? detail.blog.description ?? undefined;
    return {
      title: `${detail.post.title} - ${detail.blog.name}`,
      description,
      openGraph: {
        title: detail.post.title,
        description,
        type: "article",
        publishedTime: detail.post.publishedAt,
        images: detail.post.imageUrl
          ? [{ url: detail.post.imageUrl }]
          : undefined,
      },
    };
  } catch {
    return { title: "Artículo - Proyecta Konscio" };
  }
}

function formatPublishedDate(value: string): string {
  return new Intl.DateTimeFormat("es-CO", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(value));
}
