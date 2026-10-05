import { notFound } from "next/navigation";
import PostEditorForm from "@/components/PostEditorForm";
import { connectDB } from "@/lib/db";
import Post from "@/lib/models/Post";
import { createPostSlug } from "@/lib/post-metadata";
import { sanitizePostContent } from "@/lib/post-content";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await connectDB();

  let post;
  try {
    post = await Post.findById(id).lean();
  } catch {
    notFound();
  }

  if (!post) notFound();

  return (
    <PostEditorForm
      postId={id}
      initialData={{
        title: post.title,
        slug: post.slug ?? createPostSlug(post.title),
        category: post.category,
        content: sanitizePostContent(post.content),
        thumbnail: post.thumbnail,
        extraImages: post.extraImages ?? [],
        excerpt: post.excerpt ?? "",
        tags: post.tags ?? [],
        status: post.status === "draft" ? "draft" : "published",
        featured: post.featured ?? false,
        theme: post.theme ?? "ocean",
        contentWidth: post.contentWidth ?? "standard",
        fontSize: post.fontSize ?? "medium",
        paragraphSpacing: post.paragraphSpacing ?? "comfortable",
        lineHeight: post.lineHeight ?? "comfortable",
        fontFamily: post.fontFamily ?? "sans",
      }}
    />
  );
}