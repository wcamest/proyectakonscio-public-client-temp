import type { Metadata } from "next";

import {
  PublicBlogPage,
  generatePublicBlogMetadata,
  type BlogPageSearchParams,
} from "@/components/blogs/PublicBlogPage";

type Props = Readonly<{
  params: Promise<{ blogSlug: string }>;
  searchParams: Promise<BlogPageSearchParams>;
}>;

export default async function BlogPage({ params, searchParams }: Props) {
  const [{ blogSlug }, query] = await Promise.all([params, searchParams]);
  return <PublicBlogPage blogSlug={blogSlug} searchParams={query} />;
}

export async function generateMetadata({ params }: Pick<Props, "params">): Promise<Metadata> {
  const { blogSlug } = await params;
  return generatePublicBlogMetadata(blogSlug);
}
