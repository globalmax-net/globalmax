"use client";

import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import { SuccessBanner } from "@/components/Success";

interface Post {
  _id: string;
  title: string;
  category: string;
  createdAt: string;
}

interface ManagedItem {
  _id: string;
  name: string;
}

interface SuccessStat {
  _id: string;
  value: string;
  label: string;
}

async function readResponse<T>(response: Response, fallback: string): Promise<T> {
  const body = (await response.json().catch(() => ({}))) as T & { error?: string };
  if (!response.ok) {
    throw new Error(body.error || fallback);
  }
  return body;
}

const cardClass =
  "rounded-3xl border border-slate-200 bg-white shadow-sm";

export default function AdminPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [services, setServices] = useState<ManagedItem[]>([]);
  const [upcoming, setUpcoming] = useState<ManagedItem[]>([]);
  const [successStats, setSuccessStats] = useState<SuccessStat[]>([]);
  const [successForm, setSuccessForm] = useState({ value: "", label: "" });
  const [editingSuccessId, setEditingSuccessId] = useState<string | null>(null);
  const [successError, setSuccessError] = useState("");
  const [pageError, setPageError] = useState("");
  const [notice, setNotice] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [savingSuccess, setSavingSuccess] = useState(false);

  const loadDashboard = useCallback(async (showRefresh = false) => {
    setPageError("");
    if (showRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const [postsResponse, servicesResponse, upcomingResponse, successResponse] =
        await Promise.all([
          fetch("/api/posts", { cache: "no-store" }),
          fetch("/api/services", { cache: "no-store" }),
          fetch("/api/upcoming", { cache: "no-store" }),
          fetch("/api/success", { cache: "no-store" }),
        ]);

      const [postData, serviceData, upcomingData, successData] = await Promise.all([
        readResponse<Post[]>(postsResponse, "Unable to load posts."),
        readResponse<ManagedItem[]>(servicesResponse, "Unable to load services."),
        readResponse<ManagedItem[]>(upcomingResponse, "Unable to load upcoming platforms."),
        readResponse<SuccessStat[]>(successResponse, "Unable to load homepage success metrics."),
      ]);

      setPosts(postData);
      setServices(serviceData);
      setUpcoming(upcomingData);
      setSuccessStats(successData);
    } catch (error) {
      setPageError(error instanceof Error ? error.message : "Unable to load the admin dashboard.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void loadDashboard();
  }, [loadDashboard]);

  const categoryCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const post of posts) {
      counts.set(post.category, (counts.get(post.category) ?? 0) + 1);
    }
    return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
  }, [posts]);

  const filteredPosts = useMemo(() => {
    const term = search.trim().toLowerCase();
    const sortedPosts = [...posts].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    return sortedPosts
      .filter((post) => !term || `${post.title} ${post.category}`.toLowerCase().includes(term))
      .slice(0, 6);
  }, [posts, search]);

  const deletePost = async (post: Post) => {
    if (!window.confirm(`Delete "${post.title}"? This cannot be undone.`)) return;
    setNotice(null);
    setPageError("");

    try {
      const response = await fetch(`/api/posts/${post._id}`, { method: "DELETE" });
      await readResponse<{ message?: string }>(response, "Unable to delete post.");
      setPosts((current) => current.filter((item) => item._id !== post._id));
      setNotice("Post deleted successfully.");
    } catch (error) {
      setPageError(error instanceof Error ? error.message : "Unable to delete post.");
    }
  };

  const saveSuccessStat = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccessError("");
    setSavingSuccess(true);

    try {
      const response = await fetch(
        editingSuccessId ? `/api/success/${editingSuccessId}` : "/api/success",
        {
          method: editingSuccessId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            value: successForm.value.trim(),
            label: successForm.label.trim(),
          }),
        }
      );
      await readResponse<SuccessStat>(response, "Unable to save homepage metric.");
      setSuccessForm({ value: "", label: "" });
      setEditingSuccessId(null);
      setNotice(editingSuccessId ? "Homepage metric updated." : "Homepage metric added.");
      await loadDashboard(true);
    } catch (error) {
      setSuccessError(error instanceof Error ? error.message : "Unable to save homepage metric.");
    } finally {
      setSavingSuccess(false);
    }
  };

  const deleteSuccessStat = async (stat: SuccessStat) => {
    if (!window.confirm(`Delete the "${stat.label}" homepage metric?`)) return;
    setSuccessError("");

    try {
      const response = await fetch(`/api/success/${stat._id}`, { method: "DELETE" });
      await readResponse<{ ok: boolean }>(response, "Unable to delete homepage metric.");
      if (editingSuccessId === stat._id) {
        setEditingSuccessId(null);
        setSuccessForm({ value: "", label: "" });
      }
      setSuccessStats((current) => current.filter((item) => item._id !== stat._id));
      setNotice("Homepage metric deleted.");
    } catch (error) {
      setSuccessError(error instanceof Error ? error.message : "Unable to delete homepage metric.");
    }
  };

  const navItems = [
    { name: "Posts", description: "Write, style, and publish articles", href: "/admin/posts", count: posts.length, action: "Manage posts", tone: "bg-blue-50 text-blue-700" },
    { name: "Services", description: "Update service cards and stats", href: "/admin/services", count: services.length, action: "Manage services", tone: "bg-rose-50 text-rose-700" },
    { name: "Upcoming", description: "Edit coming-soon platforms", href: "/admin/upcoming", count: upcoming.length, action: "Manage upcoming", tone: "bg-amber-50 text-amber-700" },
    { name: "Success metrics", description: "Edit homepage achievement figures", href: "#success-metrics", count: successStats.length, action: "Edit metrics", tone: "bg-emerald-50 text-emerald-700" },
  ];

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-7 overflow-hidden rounded-3xl bg-slate-950 text-white shadow-sm">
          <div className="flex flex-col gap-6 px-6 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-300">
                Global Max · Content management
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                Admin dashboard
              </h1>
              <p className="mt-2 max-w-xl text-sm text-slate-300">
                Manage the content and information displayed across your website.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => void loadDashboard(true)}
                disabled={refreshing}
                className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10 disabled:opacity-60"
              >
                {refreshing ? "Refreshing..." : "Refresh"}
              </button>
              <Link
                href="/admin/posts/create"
                className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-sky-100"
              >
                + Create post
              </Link>
              <Link
                href="/"
                target="_blank"
                className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                View website
              </Link>
              <LogoutButton />
            </div>
          </div>
        </header>

        {notice && <SuccessBanner title="Done" message={notice} />}
        {pageError && (
          <div role="alert" className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            <span>{pageError}</span>
            <button
              type="button"
              onClick={() => void loadDashboard(true)}
              className="font-semibold underline underline-offset-2"
            >
              Try again
            </button>
          </div>
        )}

        <section aria-label="Content overview" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`${cardClass} group p-5 transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-slate-500">{item.name}</p>
                  <p className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
                    {loading ? "—" : item.count}
                  </p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${item.tone}`}>
                  {item.name === "Posts" ? "Published" : "On site"}
                </span>
              </div>
              <p className="mt-3 text-sm text-slate-600">{item.description}</p>
              <p className="mt-5 text-sm font-semibold text-slate-900 group-hover:text-blue-700">
                {item.action} <span aria-hidden="true">→</span>
              </p>
            </Link>
          ))}
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.7fr)_minmax(280px,0.8fr)]">
          <div className={`${cardClass} overflow-hidden`}>
            <div className="flex flex-col gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-end sm:justify-between sm:px-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Publishing</p>
                <h2 className="mt-1 text-xl font-bold text-slate-950">Recent posts</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                <label className="sr-only" htmlFor="dashboard-post-search">Search posts</label>
                <input
                  id="dashboard-post-search"
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search title or category"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-blue-400 sm:w-64"
                />
                <Link
                  href="/admin/posts"
                  className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-700"
                >
                  All posts
                </Link>
              </div>
            </div>

            {loading ? (
              <p className="p-8 text-center text-sm text-slate-500">Loading content overview...</p>
            ) : filteredPosts.length === 0 ? (
              <div className="p-10 text-center">
                <p className="font-semibold text-slate-900">
                  {search ? "No posts match your search." : "No posts have been published yet."}
                </p>
                {!search && (
                  <Link href="/admin/posts/create" className="mt-3 inline-block text-sm font-semibold text-blue-700 hover:text-blue-900">
                    Create your first post
                  </Link>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Post</th>
                      <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Category</th>
                      <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Published</th>
                      <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredPosts.map((post) => (
                      <tr key={post._id} className="transition hover:bg-slate-50">
                        <td className="max-w-xs px-5 py-4">
                          <p className="truncate text-sm font-semibold text-slate-900">{post.title}</p>
                        </td>
                        <td className="whitespace-nowrap px-5 py-4">
                          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">{post.category}</span>
                        </td>
                        <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">
                          {new Date(post.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </td>
                        <td className="whitespace-nowrap px-5 py-4 text-right text-sm">
                          <div className="flex justify-end gap-3">
                            <Link href={`/post/${post._id}`} className="font-medium text-blue-700 hover:text-blue-900">View</Link>
                            <Link href={`/admin/posts/${post._id}/edit`} className="font-medium text-slate-700 hover:text-slate-950">Edit</Link>
                            <button type="button" onClick={() => void deletePost(post)} className="font-medium text-red-700 hover:text-red-900">Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <aside className="space-y-6">
            <div className={`${cardClass} p-5`}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">At a glance</p>
              <h2 className="mt-1 text-xl font-bold text-slate-950">Publishing insights</h2>
              {categoryCounts.length ? (
                <ul className="mt-4 space-y-3">
                  {categoryCounts.slice(0, 4).map(([category, count]) => (
                    <li key={category} className="flex items-center justify-between gap-3 text-sm">
                      <span className="truncate text-slate-700">{category}</span>
                      <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 font-semibold text-slate-800">
                        {count} {count === 1 ? "post" : "posts"}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-sm text-slate-500">Category insights appear after posts are published.</p>
              )}
              {posts.length > 0 && (
                <p className="mt-4 border-t border-slate-100 pt-4 text-sm text-slate-500">
                  {posts.length} total {posts.length === 1 ? "post" : "posts"} across {categoryCounts.length} {categoryCounts.length === 1 ? "category" : "categories"}.
                </p>
              )}
            </div>

            <div className={`${cardClass} p-5`}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Shortcuts</p>
              <div className="mt-4 grid gap-2">
                <Link href="/admin/services" className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-800">
                  Manage service cards <span aria-hidden="true">→</span>
                </Link>
                <Link href="/admin/upcoming" className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-800">
                  Manage upcoming platforms <span aria-hidden="true">→</span>
                </Link>
                <Link href="#success-metrics" className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-800">
                  Update homepage metrics <span aria-hidden="true">↓</span>
                </Link>
              </div>
            </div>
          </aside>
        </section>

        <section id="success-metrics" className={`${cardClass} mt-6 p-5 sm:p-6`}>
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">Homepage content</p>
              <h2 className="mt-1 text-xl font-bold text-slate-950">Success metrics</h2>
              <p className="mt-1 text-sm text-slate-500">These figures are displayed in the homepage success section.</p>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)]">
            <div className="grid gap-3 sm:grid-cols-2">
              {successStats.length === 0 ? (
                <p className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-500 sm:col-span-2">
                  No metrics found. Try refreshing the dashboard.
                </p>
              ) : (
                successStats.map((stat) => (
                  <article key={stat._id} className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="min-w-0">
                      <p className="text-2xl font-bold text-slate-950">{stat.value}</p>
                      <p className="truncate text-sm text-slate-600">{stat.label}</p>
                    </div>
                    <div className="flex shrink-0 gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingSuccessId(stat._id);
                          setSuccessForm({ value: stat.value, label: stat.label });
                          setSuccessError("");
                        }}
                        className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:border-blue-200 hover:text-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => void deleteSuccessStat(stat)}
                        className="rounded-full border border-red-200 bg-white px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  </article>
                ))
              )}
            </div>

            <form onSubmit={saveSuccessStat} className="h-fit space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="font-semibold text-slate-900">{editingSuccessId ? "Edit metric" : "Add a metric"}</h3>
              <label className="block text-sm font-medium text-slate-700">
                Number or value
                <input
                  required
                  maxLength={30}
                  value={successForm.value}
                  onChange={(event) => setSuccessForm((current) => ({ ...current, value: event.target.value }))}
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-white p-3 text-sm outline-none focus:border-blue-500"
                  placeholder="2000+"
                />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Label
                <input
                  required
                  maxLength={80}
                  value={successForm.label}
                  onChange={(event) => setSuccessForm((current) => ({ ...current, label: event.target.value }))}
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-white p-3 text-sm outline-none focus:border-blue-500"
                  placeholder="Visa services delivered"
                />
              </label>
              {successError && <p role="alert" className="text-sm text-red-700">{successError}</p>}
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={savingSuccess}
                  className="flex-1 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60"
                >
                  {savingSuccess ? "Saving..." : editingSuccessId ? "Save changes" : "Add metric"}
                </button>
                {editingSuccessId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingSuccessId(null);
                      setSuccessForm({ value: "", label: "" });
                      setSuccessError("");
                    }}
                    className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
