import { describe, expect, it } from "vitest";
import { createPostSlug, normalizePostMetadata } from "@/lib/post-metadata";

describe("post metadata", () => {
  it("creates a URL-safe slug from a title", () => {
    expect(createPostSlug("  Hello, Global Max!  ")).toBe("hello-global-max");
  });

  it("normalizes metadata and applies a status fallback", () => {
    expect(
      normalizePostMetadata(
        {
          title: " Example post ",
          excerpt: " Summary ",
          tags: [" News ", "news", 42, ""],
          featured: true,
        },
        "published"
      )
    ).toEqual({
      title: "Example post",
      slug: "example-post",
      excerpt: "Summary",
      tags: ["News", "news"],
      status: "published",
      featured: true,
    });
  });

  it("preserves an explicit draft status and custom slug", () => {
    expect(
      normalizePostMetadata(
        { title: "Example", slug: "custom-url", status: "draft" },
        "published"
      )
    ).toMatchObject({ slug: "custom-url", status: "draft" });
  });

  it.each([
    { title: "", slug: "a" },
    { title: "Title", slug: "!" },
    { title: "Title", slug: "a".repeat(121) },
    { title: "Title", excerpt: "a".repeat(161) },
    { title: "Title", status: "private" },
    { title: "Title", featured: "yes" },
  ])("rejects invalid metadata: %o", (metadata) => {
    expect(normalizePostMetadata(metadata, "published")).toBeNull();
  });
});
