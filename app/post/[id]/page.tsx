import { connectDB } from "@/lib/db";
import Post from "@/lib/models/Post";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default async function SinglePostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await connectDB();
  
  let post;
  try {
    post = await Post.findById(id);
  } catch (e) {
    notFound();
  }

  if (!post) notFound();

  return (
    <>
      <Header />
      <article className="min-h-screen bg-white py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-12">
            <Link href="/post" className="text-blue-600 hover:underline mb-6 inline-block font-medium">&larr; Back to all posts</Link>
            <div className="mb-4">
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                {post.category}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>
            <p className="text-gray-500">
              Published on {new Date(post.createdAt).toLocaleDateString('en-US', {
                month: 'long', day: 'numeric', year: 'numeric'
              })}
            </p>
          </div>

          {/* Thumbnail */}
          <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] mb-12 rounded-2xl overflow-hidden shadow-lg">
            <Image src={post.thumbnail} alt={post.title} fill className="object-cover" priority />
          </div>

          {/* Content */}
          <div 
            className="prose prose-lg max-w-none text-gray-800 mb-16"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Extra Images Gallery */}
          {post.extraImages && post.extraImages.length > 0 && (
            <div className="mt-16 border-t border-gray-100 pt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Gallery</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {post.extraImages.map((img: string, idx: number) => (
                  <div key={idx} className="relative h-64 rounded-xl overflow-hidden shadow-sm">
                    <Image src={img} alt={`Gallery image ${idx + 1}`} fill className="object-cover hover:scale-105 transition-transform" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
      <Footer />
    </>
  );
}
