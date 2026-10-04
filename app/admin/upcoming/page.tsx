"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import LogoutButton from "@/components/LogoutButton";

interface ManagedPlatform {
  _id: string;
  name: string;
  description: string;
}

interface PlatformForm {
  name: string;
  description: string;
}

const emptyForm: PlatformForm = { name: "", description: "" };

export default function AdminUpcomingPage() {
  const [platforms, setPlatforms] = useState<ManagedPlatform[]>([]);
  const [form, setForm] = useState<PlatformForm>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadPlatforms = async () => {
    const response = await fetch("/api/upcoming");
    const body = await response.json();
    if (!response.ok) throw new Error(body.error || "Unable to load upcoming items.");
    setPlatforms(body);
  };

  useEffect(() => {
    loadPlatforms().catch((loadError) => setError(loadError.message));
  }, []);

  const savePlatform = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch(editingId ? `/api/upcoming/${editingId}` : "/api/upcoming", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || "Unable to save upcoming item.");
      setForm(emptyForm);
      setEditingId(null);
      await loadPlatforms();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Unable to save upcoming item.");
    } finally {
      setLoading(false);
    }
  };

  const editPlatform = (platform: ManagedPlatform) => {
    setEditingId(platform._id);
    setForm({ name: platform.name, description: platform.description });
    setError("");
  };

  const deletePlatform = async (platform: ManagedPlatform) => {
    if (!window.confirm(`Delete ${platform.name}?`)) return;
    setError("");
    try {
      const response = await fetch(`/api/upcoming/${platform._id}`, { method: "DELETE" });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || "Unable to delete upcoming item.");
      if (editingId === platform._id) {
        setEditingId(null);
        setForm(emptyForm);
      }
      await loadPlatforms();
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Unable to delete upcoming item.");
    }
  };

  return (
    <main className="min-h-screen bg-gm-paper-2 p-4 text-gm-ink sm:p-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-gm-paper-2 bg-white p-4 shadow-sm">
          <h1 className="text-2xl font-bold text-gm-ink">Manage Upcoming</h1>
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-sm font-medium text-gm-green-dark hover:text-gm-maroon">Admin</Link>
            <LogoutButton />
          </div>
        </header>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          <section className="overflow-hidden rounded-lg border border-gm-paper-2 bg-white shadow-sm">
            <div className="border-b border-gm-paper-2 px-5 py-4">
              <h2 className="font-semibold text-gm-ink">Coming soon cards</h2>
            </div>
            <div className="divide-y divide-gm-paper-2">
              {platforms.map((platform) => (
                <article key={platform._id} className="flex flex-wrap items-center justify-between gap-4 p-5">
                  <div className="min-w-0">
                    <h3 className="font-semibold text-gm-ink">{platform.name}</h3>
                    <p className="mt-1 line-clamp-2 text-sm text-gm-ink/60">{platform.description}</p>
                  </div>
                  <div className="flex shrink-0 gap-4 text-sm">
                    <button type="button" onClick={() => editPlatform(platform)} className="font-medium text-gm-green hover:text-gm-green-dark hover:underline">Edit</button>
                    <button type="button" onClick={() => deletePlatform(platform)} className="font-medium text-red-700 hover:underline">Delete</button>
                  </div>
                </article>
              ))}
              {platforms.length === 0 && !error && <p className="p-6 text-sm text-gm-ink/60">No upcoming items found.</p>}
            </div>
          </section>

          <form onSubmit={savePlatform} className="h-fit space-y-4 rounded-lg border border-gm-paper-2 bg-white p-5 shadow-sm">
            <h2 className="font-semibold text-gm-ink">{editingId ? "Edit upcoming item" : "Add an upcoming item"}</h2>
            <label className="block text-sm font-medium text-gm-ink/80">
              Name
              <input
                required
                maxLength={100}
                value={form.name}
                onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                className="mt-1 w-full rounded-md border border-gm-paper-2 p-2 text-sm focus:border-gm-green focus:outline-none focus:ring-1 focus:ring-gm-green"
              />
            </label>
            <label className="block text-sm font-medium text-gm-ink/80">
              Description
              <textarea
                required
                maxLength={500}
                rows={5}
                value={form.description}
                onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
                className="mt-1 w-full rounded-md border border-gm-paper-2 p-2 text-sm focus:border-gm-green focus:outline-none focus:ring-1 focus:ring-gm-green"
              />
            </label>
            {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
            <div className="flex gap-3">
              <button type="submit" disabled={loading} className="flex-1 rounded-md bg-gm-green px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gm-green-dark disabled:opacity-50">
                {loading ? "Saving..." : editingId ? "Save changes" : "Add upcoming item"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={() => { setEditingId(null); setForm(emptyForm); setError(""); }}
                  className="rounded-md border border-gm-paper-2 px-4 py-2 text-sm font-medium text-gm-ink/80 hover:bg-gm-paper-2"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}