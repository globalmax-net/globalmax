"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";
import { SuccessBanner } from "@/components/Success";

interface Post {
  _id: string;
  title: string;
  category: string;
  createdAt: string;
}

export default function AdminPostsPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-gm-paper-2 p-8" />}>
      <AdminPostsContent />
    </Suspense>
  );
}

function AdminPostsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [posts, setPosts] = useState<Post[]>([]);
  const [notice, setNotice] = useState<string | null>(null);

  const fetchPosts = async () => {
    const res = await fetch("/api/posts");
    if (res.ok) {
      const data = await res.json();
      setPosts(data);
    }
  };

  const deletePost = async (id: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      const response = await fetch(`/api/posts/${id}`, { method: "DELETE" });
      if (response.ok) {
        setNotice("Post deleted successfully.");
      }
      fetchPosts();
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    const message = searchParams.get("message");
    if (message) {
      setNotice(message);
      const params = new URLSearchParams(searchParams.toString());
      params.delete("message");
      const nextUrl = params.toString() ? `/admin/posts?${params.toString()}` : "/admin/posts";
      router.replace(nextUrl);
    }
  }, [router, searchParams]);

  return (
    <div className="min-h-screen bg-gm-paper-2 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-gm-paper-2 bg-white p-4 shadow-sm">
          <h1 className="text-2xl font-bold text-gm-ink">Manage Posts</h1>
          <div className="flex gap-4">
            <Link
              href="/admin/posts/create"
              className="rounded-md bg-gm-maroon px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gm-maroon-dark"
            >
              Create New Post
            </Link>
            <LogoutButton />
          </div>
        </div>

        {notice && <SuccessBanner title="Success" message={notice} />}

        <div className="overflow-hidden rounded-lg border border-gm-paper-2 bg-white shadow-sm">
          <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gm-paper-2">
            <thead className="bg-gm-paper-2">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gm-ink/60">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gm-ink/60">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gm-ink/60">Date</th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gm-ink/60">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gm-paper-2 bg-white">
              {posts.map((post) => (
                <tr key={post._id} className="transition-colors hover:bg-gm-paper-2/50">
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gm-ink">{post.title}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gm-ink/70">{post.category}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gm-ink/70">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      href={`/admin/posts/${post._id}/edit`}
                      className="mr-4 text-sm font-medium text-gm-ink/80 hover:text-gm-maroon"
                    >
                      Edit
                    </Link>
                    <Link
                      href={`/post/${post._id}`}
                      className="mr-4 text-sm font-medium text-gm-green hover:text-gm-green-dark"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => deletePost(post._id)}
                      className="text-sm font-medium text-red-700 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {posts.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gm-ink/60">
                    No posts found. Create one to get started!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </div>
  );
}
