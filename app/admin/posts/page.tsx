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
    <Suspense fallback={<main className="min-h-screen bg-gray-50 p-8" />}>
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
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <h1 className="text-2xl font-bold text-gray-900">Manage Posts</h1>
          <div className="flex gap-4">
            <Link
              href="/admin/posts/create"
              className="px-4 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800"
            >
              Create New Post
            </Link>
            <LogoutButton />
          </div>
        </div>

        {notice && <SuccessBanner title="Success" message={notice} />}

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {posts.map((post) => (
                <tr key={post._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{post.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      href={`/admin/posts/${post._id}/edit`}
                      className="mr-4 text-gray-700 hover:text-black"
                    >
                      Edit
                    </Link>
                    <Link
                      href={`/post/${post._id}`}
                      className="mr-4 text-blue-600 hover:text-blue-900"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => deletePost(post._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {posts.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                    No posts found. Create one to get started!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
