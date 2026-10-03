import Image from "next/image";
import Link from "next/link";

import type { PublicBlogPostSummary } from "@/types/blogs";
import Button from "../ui/Button";
import Paper from "../ui/Paper";

type Props = Readonly<{
  data: PublicBlogPostSummary;
}>;

const BlogPostCard = ({ data }: Props) => {
  const href = `/blogs/${encodeURIComponent(data.blogSlug)}/${encodeURIComponent(data.slug)}`;

  return (
    <Paper className="flex h-full flex-col justify-between gap-5 bg-white p-0">
      <div className="flex w-full flex-col">
        <div className="relative aspect-video w-full overflow-hidden rounded bg-neutral-100">
          {data.imageUrl ? (
            <Image
              src={data.imageUrl}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover object-center"
              loading="lazy"
              unoptimized
            />
          ) : (
            <div className="flex h-full items-center justify-center text-3xl text-neutral-300" aria-hidden="true">
              <i className="bi bi-journal-text" />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3 p-4">
          <div className="flex flex-col gap-1">
            <Link href={href} className="group">
              <h2 className="text-xl font-bold leading-snug text-neutral-800 group-hover:underline">
                {data.title}
              </h2>
            </Link>
            <time dateTime={data.publishedAt} className="text-xs text-neutral-500">
              {formatPublishedDate(data.publishedAt)}
            </time>
          </div>

          {data.excerpt ? (
            <p className="line-clamp-3 text-sm leading-6 text-neutral-600">
              {data.excerpt}
            </p>
          ) : null}
        </div>
      </div>

      <div className="px-4 pb-4">
        <Button href={href} className="w-full sm:w-auto">
          Leer artículo
        </Button>
      </div>
    </Paper>
  );
};

function formatPublishedDate(value: string): string {
  return new Intl.DateTimeFormat("es-CO", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(value));
}

export default BlogPostCard;
