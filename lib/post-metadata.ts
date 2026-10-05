export type PostStatus = "draft" | "published";

export function createPostSlug(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function normalizePostMetadata(
  body: Record<string, unknown>,
  fallbackStatus: PostStatus
) {
  const title = typeof body.title === "string" ? body.title.trim() : "";
  const requestedSlug = typeof body.slug === "string" ? body.slug : title;
  const slug = createPostSlug(requestedSlug).slice(0, 120);
  const excerpt = typeof body.excerpt === "string" ? body.excerpt.trim() : "";
  const tags = Array.isArray(body.tags)
    ? body.tags
        .filter((tag): tag is string => typeof tag === "string")
        .map((tag) => tag.trim())
        .filter(Boolean)
        .slice(0, 20)
    : [];
  const status =
    body.status === undefined ? fallbackStatus : body.status;
  const featured = body.featured === undefined ? false : body.featured;

  if (
    !title ||
    !slug ||
    (typeof body.slug === "string" &&
      body.slug.length > 120) ||
    excerpt.length > 160 ||
    (status !== "draft" && status !== "published") ||
    typeof featured !== "boolean"
  ) {
    return null;
  }

  return {
    title,
    slug,
    excerpt,
    tags,
    status,
    featured,
  };
}
