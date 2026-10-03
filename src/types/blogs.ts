export type PublicBlog = Readonly<{
  id: string;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
}>;

export type PublicBlogPostSummary = Readonly<{
  id: string;
  blogId: string;
  blogSlug: string;
  title: string;
  slug: string;
  excerpt: string | null;
  imageUrl: string | null;
  publishedAt: string;
}>;

export type PublicBlogTextBlock = Readonly<{
  id: string;
  type: "text";
  text: string;
}>;

export type PublicBlogImageBlock = Readonly<{
  id: string;
  type: "image";
  src: string;
  alt: string;
  caption?: string;
}>;

export type PublicBlogVideoBlock = Readonly<{
  id: string;
  type: "video";
  src: string;
  title?: string;
  posterSrc?: string;
}>;

export type PublicBlogFormReferenceBlock = Readonly<{
  id: string;
  type: "form_reference";
  formId: string;
  label?: string;
}>;

export type PublicBlogContentBlock =
  | PublicBlogTextBlock
  | PublicBlogImageBlock
  | PublicBlogVideoBlock
  | PublicBlogFormReferenceBlock;

export type PublicBlogContentDocument = Readonly<{
  schemaVersion: 1 | 2;
  blocks: readonly PublicBlogContentBlock[];
}>;

export type PublicBlogPostDetail = Readonly<{
  blog: PublicBlog;
  post: PublicBlogPostSummary;
  schemaVersion: 1 | 2;
  content: PublicBlogContentDocument;
}>;

export type PublicBlogComment = Readonly<{
  id: string;
  postId: string;
  parentCommentId: string | null;
  authorName: string;
  content: string;
  createdAt: string;
}>;

export type PublicBlogCommentSubmission = Readonly<{
  authorName: string;
  authorEmail: string;
  content: string;
  parentCommentId?: string | null;
}>;

export type PublicBlogCommentSubmissionAccepted = Readonly<{
  commentId: string;
  status: "pending";
}>;

export type PublicPageEnvelope<T> = Readonly<{
  items: readonly T[];
  total: number;
  limit: number;
  offset: number;
}>;

export type PublicBlogPostSort =
  | "newest"
  | "oldest"
  | "title_asc"
  | "title_desc";

export type PublicBlogSort = "newest" | "oldest" | "name_asc" | "name_desc";

export type PublicBlogCommentSort = "newest" | "oldest";

/**
 * Compatibility alias retained for components that historically consumed the
 * hard-coded public-client blog cards.
 */
export type BlogPostMeta = PublicBlogPostSummary;
