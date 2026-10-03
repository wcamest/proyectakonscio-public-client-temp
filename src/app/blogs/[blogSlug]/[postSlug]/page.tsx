import type { Metadata } from "next";

import {
  PublicBlogPostPage,
  generatePublicBlogPostMetadata,
} from "@/components/blogs/PublicBlogPostPage";

type Props = Readonly<{
  params: Promise<{ blogSlug: string; postSlug: string }>;
}>;

export default async function BlogPostPage({ params }: Props) {
  const { blogSlug, postSlug } = await params;
  return <PublicBlogPostPage blogSlug={blogSlug} postSlug={postSlug} />;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { blogSlug, postSlug } = await params;
  return generatePublicBlogPostMetadata(blogSlug, postSlug);
}
