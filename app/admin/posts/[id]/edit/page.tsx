import { notFound } from "next/navigation";
import PostEditorForm from "@/components/PostEditorForm";
import { connectDB } from "@/lib/db";
import Post from "@/lib/models/Post";

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
        category: post.category,
        content: post.content,
        thumbnail: post.thumbnail,
        extraImages: post.extraImages ?? [],
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