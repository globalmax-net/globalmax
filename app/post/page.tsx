import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { connectDB } from "@/lib/db";
import Post from "@/lib/models/Post";
import { POST_THEMES, isPostTheme, type PostTheme } from "@/lib/post-style";

export default async function PostsPage() {
  await connectDB();
  const posts = await Post.find()
    .select("_id title category thumbnail createdAt theme")
    .sort({ createdAt: -1 })
    .lean();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="mb-10 text-3xl font-bold text-gray-900">Latest Posts</h1>
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => {
                const themeKey: PostTheme = isPostTheme(post.theme) ? post.theme : "ocean";
                const theme = POST_THEMES[themeKey];

                return (
                  <article key={String(post._id)}>
                    <Link href={`/post/${post._id}`} className="group block">
                      {post.thumbnail ? (
                        <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-md bg-gray-100">
                          <Image
                            src={post.thumbnail}
                            alt={post.title}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                      ) : (
                        <div className="mb-4 aspect-[4/3] rounded-md bg-gray-100" />
                      )}
                      <p className={`mb-2 text-sm font-medium ${theme.accent}`}>{post.category}</p>
                      <h2 className={`text-xl font-semibold text-gray-900 ${theme.card}`}>
                        {post.title}
                      </h2>
                      <p className="mt-2 text-sm text-gray-500">
                        {new Date(post.createdAt).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </Link>
                  </article>
                );
              })}
            </div>
          ) : (
            <p className="py-16 text-center text-gray-500">No posts found.</p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}