import "server-only";

import type {
  PublicBlog,
  PublicBlogComment,
  PublicBlogCommentSort,
  PublicBlogContentBlock,
  PublicBlogContentDocument,
  PublicBlogPostDetail,
  PublicBlogPostSort,
  PublicBlogPostSummary,
  PublicBlogSort,
  PublicPageEnvelope,
} from "@/types/blogs";

const publicApiInternalOrigin =
  process.env.PUBLIC_API_INTERNAL_ORIGIN?.trim() || "http://127.0.0.1:4000";

export class PublicBlogsServerError extends Error {
  public readonly status: number;

  public constructor(status: number, message = "PUBLIC_BLOGS_SERVER_REQUEST_FAILED") {
    super(message);
    this.name = "PublicBlogsServerError";
    this.status = status;
  }
}

type ListQuery<TSort extends string> = Readonly<{
  limit: number;
  offset: number;
  sort: TSort;
  search?: string;
}>;

export async function listPublicBlogs(
  query: ListQuery<PublicBlogSort>,
): Promise<PublicPageEnvelope<PublicBlog>> {
  const search = buildListSearch(query);
  const body = await getJson(`/api/public/blogs?${search.toString()}`);
  if (!isPageEnvelope(body, isPublicBlog)) throw invalidResponse();
  return body;
}

export async function getPublicBlog(blogSlug: string): Promise<PublicBlog | null> {
  const body = await getJson(`/api/public/blogs/${encodeURIComponent(blogSlug)}`, true);
  if (body === null) return null;
  if (!isPublicBlog(body)) throw invalidResponse();
  return body;
}

export async function listPublicBlogPosts(
  blogSlug: string,
  query: ListQuery<PublicBlogPostSort>,
): Promise<PublicPageEnvelope<PublicBlogPostSummary> | null> {
  const search = buildListSearch(query);
  const body = await getJson(
    `/api/public/blogs/${encodeURIComponent(blogSlug)}/posts?${search.toString()}`,
    true,
  );
  if (body === null) return null;
  if (!isPageEnvelope(body, isPublicBlogPostSummary)) throw invalidResponse();
  return body;
}

export async function getPublicBlogPost(
  blogSlug: string,
  postSlug: string,
): Promise<PublicBlogPostDetail | null> {
  const body = await getJson(
    `/api/public/blogs/${encodeURIComponent(blogSlug)}/posts/${encodeURIComponent(postSlug)}`,
    true,
  );
  if (body === null) return null;
  if (!isPublicBlogPostDetail(body)) throw invalidResponse();
  return body;
}

export async function listPublicBlogComments(
  blogSlug: string,
  postSlug: string,
  query: Readonly<{ limit: number; offset: number; sort: PublicBlogCommentSort }>,
): Promise<PublicPageEnvelope<PublicBlogComment> | null> {
  const search = new URLSearchParams({
    limit: String(query.limit),
    offset: String(query.offset),
    sort: query.sort,
  });
  const body = await getJson(
    `/api/public/blogs/${encodeURIComponent(blogSlug)}/posts/${encodeURIComponent(postSlug)}/comments?${search.toString()}`,
    true,
  );
  if (body === null) return null;
  if (!isPageEnvelope(body, isPublicBlogComment)) throw invalidResponse();
  return body;
}

async function getJson(path: string, allowNotFound = false): Promise<unknown | null> {
  const response = await fetch(`${publicApiInternalOrigin}${path}`, {
    method: "GET",
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  if (allowNotFound && response.status === 404) return null;
  if (!response.ok) throw new PublicBlogsServerError(response.status);

  try {
    return await response.json();
  } catch {
    throw invalidResponse();
  }
}

function buildListSearch<TSort extends string>(query: ListQuery<TSort>): URLSearchParams {
  return new URLSearchParams({
    limit: String(query.limit),
    offset: String(query.offset),
    sort: query.sort,
    ...(query.search === undefined ? {} : { search: query.search }),
  });
}

function invalidResponse(): PublicBlogsServerError {
  return new PublicBlogsServerError(502, "PUBLIC_BLOGS_SERVER_RESPONSE_INVALID");
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function hasOnlyKeys(value: Record<string, unknown>, keys: readonly string[]): boolean {
  return Object.keys(value).every((key) => keys.includes(key));
}

function isNullableString(value: unknown): value is string | null {
  return value === null || typeof value === "string";
}

function isIsoDateString(value: unknown): value is string {
  return typeof value === "string" && Number.isFinite(Date.parse(value));
}

function isPublicBlog(value: unknown): value is PublicBlog {
  if (!isRecord(value)) return false;
  return (
    hasOnlyKeys(value, ["id", "name", "slug", "description", "imageUrl"]) &&
    typeof value.id === "string" &&
    typeof value.name === "string" &&
    typeof value.slug === "string" &&
    isNullableString(value.description) &&
    isNullableString(value.imageUrl)
  );
}

function isPublicBlogPostSummary(value: unknown): value is PublicBlogPostSummary {
  if (!isRecord(value)) return false;
  return (
    hasOnlyKeys(value, [
      "id",
      "blogId",
      "blogSlug",
      "title",
      "slug",
      "excerpt",
      "imageUrl",
      "publishedAt",
    ]) &&
    typeof value.id === "string" &&
    typeof value.blogId === "string" &&
    typeof value.blogSlug === "string" &&
    typeof value.title === "string" &&
    typeof value.slug === "string" &&
    isNullableString(value.excerpt) &&
    isNullableString(value.imageUrl) &&
    isIsoDateString(value.publishedAt)
  );
}

function isPublicBlogPostDetail(value: unknown): value is PublicBlogPostDetail {
  if (!isRecord(value)) return false;
  return (
    hasOnlyKeys(value, ["blog", "post", "schemaVersion", "content"]) &&
    isPublicBlog(value.blog) &&
    isPublicBlogPostSummary(value.post) &&
    (value.schemaVersion === 1 || value.schemaVersion === 2) &&
    isPublicBlogContentDocument(value.content) &&
    value.schemaVersion === value.content.schemaVersion
  );
}

function isPublicBlogContentDocument(value: unknown): value is PublicBlogContentDocument {
  if (!isRecord(value)) return false;
  if (!hasOnlyKeys(value, ["schemaVersion", "blocks"])) return false;
  if (value.schemaVersion !== 1 && value.schemaVersion !== 2) return false;
  return Array.isArray(value.blocks) && value.blocks.every(isPublicBlogContentBlock);
}

function isPublicBlogContentBlock(value: unknown): value is PublicBlogContentBlock {
  if (!isRecord(value) || typeof value.id !== "string" || typeof value.type !== "string") return false;

  switch (value.type) {
    case "text":
      return hasOnlyKeys(value, ["id", "type", "text"]) && typeof value.text === "string";
    case "image":
      return (
        hasOnlyKeys(value, ["id", "type", "src", "alt", "caption"]) &&
        typeof value.src === "string" &&
        typeof value.alt === "string" &&
        (value.caption === undefined || typeof value.caption === "string")
      );
    case "video":
      return (
        hasOnlyKeys(value, ["id", "type", "src", "title", "posterSrc"]) &&
        typeof value.src === "string" &&
        (value.title === undefined || typeof value.title === "string") &&
        (value.posterSrc === undefined || typeof value.posterSrc === "string")
      );
    case "form_reference":
      return (
        hasOnlyKeys(value, ["id", "type", "formId", "label"]) &&
        typeof value.formId === "string" &&
        (value.label === undefined || typeof value.label === "string")
      );
    default:
      return false;
  }
}

function isPublicBlogComment(value: unknown): value is PublicBlogComment {
  if (!isRecord(value)) return false;
  return (
    hasOnlyKeys(value, ["id", "postId", "parentCommentId", "authorName", "content", "createdAt"]) &&
    typeof value.id === "string" &&
    typeof value.postId === "string" &&
    (value.parentCommentId === null || typeof value.parentCommentId === "string") &&
    typeof value.authorName === "string" &&
    typeof value.content === "string" &&
    isIsoDateString(value.createdAt)
  );
}

function isPageEnvelope<T>(
  value: unknown,
  itemGuard: (item: unknown) => item is T,
): value is PublicPageEnvelope<T> {
  if (!isRecord(value)) return false;
  return (
    hasOnlyKeys(value, ["items", "total", "limit", "offset"]) &&
    Array.isArray(value.items) &&
    value.items.every(itemGuard) &&
    typeof value.total === "number" &&
    Number.isSafeInteger(value.total) &&
    value.total >= 0 &&
    typeof value.limit === "number" &&
    Number.isSafeInteger(value.limit) &&
    value.limit >= 1 &&
    typeof value.offset === "number" &&
    Number.isSafeInteger(value.offset) &&
    value.offset >= 0
  );
}
