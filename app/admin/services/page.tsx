"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import LogoutButton from "@/components/LogoutButton";

interface ManagedService {
  _id: string;
  code: string;
  name: string;
  tagline: string;
  statValue: string;
  statLabel: string;
  colorClass: "bg-gm-maroon" | "bg-gm-green";
}

type ServiceForm = Omit<ManagedService, "_id">;

const emptyForm: ServiceForm = {
  code: "",
  name: "",
  tagline: "",
  statValue: "",
  statLabel: "",
  colorClass: "bg-gm-maroon",
};

export default function AdminServicesPage() {
  const [services, setServices] = useState<ManagedService[]>([]);
  const [form, setForm] = useState<ServiceForm>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadServices = async () => {
    const response = await fetch("/api/services");
    const body = await response.json();
    if (!response.ok) throw new Error(body.error || "Unable to load services.");
    setServices(body);
  };

  useEffect(() => {
    loadServices().catch((loadError) => setError(loadError.message));
  }, []);

  const saveService = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch(editingId ? `/api/services/${editingId}` : "/api/services", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || "Unable to save service.");
      setForm(emptyForm);
      setEditingId(null);
      await loadServices();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Unable to save service.");
    } finally {
      setLoading(false);
    }
  };

  const editService = (service: ManagedService) => {
    setEditingId(service._id);
    setForm({
      code: service.code,
      name: service.name,
      tagline: service.tagline,
      statValue: service.statValue,
      statLabel: service.statLabel,
      colorClass: service.colorClass,
    });
    setError("");
  };

  const deleteService = async (service: ManagedService) => {
    if (!window.confirm(`Delete ${service.name}?`)) return;
    setError("");
    try {
      const response = await fetch(`/api/services/${service._id}`, { method: "DELETE" });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || "Unable to delete service.");
      if (editingId === service._id) {
        setEditingId(null);
        setForm(emptyForm);
      }
      await loadServices();
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Unable to delete service.");
    }
  };

  const updateField = <K extends keyof ServiceForm>(field: K, value: ServiceForm[K]) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4 border border-gray-100 bg-white p-4 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">Manage Services</h1>
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-sm text-gray-600 hover:text-black">Admin</Link>
            <LogoutButton />
          </div>
        </header>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          <section className="overflow-hidden border border-gray-100 bg-white shadow-sm">
            <div className="border-b border-gray-200 px-5 py-4">
              <h2 className="font-semibold text-gray-900">Service cards</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {services.map((service) => (
                <article key={service._id} className="flex flex-wrap items-center justify-between gap-4 p-5">
                  <div className="flex min-w-0 items-center gap-4">
                    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[11px] font-mono text-white ${service.colorClass}`}>
                      {service.code}
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-gray-900">{service.name}</h3>
                      <p className="mt-1 line-clamp-2 text-sm text-gray-500">{service.tagline}</p>
                    </div>
                  </div>
                  <div className="flex shrink-0 gap-4 text-sm">
                    <button type="button" onClick={() => editService(service)} className="font-medium text-blue-700 hover:underline">Edit</button>
                    <button type="button" onClick={() => deleteService(service)} className="font-medium text-red-700 hover:underline">Delete</button>
                  </div>
                </article>
              ))}
              {services.length === 0 && !error && <p className="p-6 text-sm text-gray-500">No services found.</p>}
            </div>
          </section>

          <form onSubmit={saveService} className="h-fit space-y-4 border border-gray-100 bg-white p-5 shadow-sm">
            <h2 className="font-semibold text-gray-900">{editingId ? "Edit service" : "Add a service"}</h2>
            <label className="block text-sm font-medium text-gray-700">
              Code
              <input required maxLength={6} value={form.code} onChange={(event) => updateField("code", event.target.value.toUpperCase())} className="mt-1 w-full rounded-md border border-gray-300 p-2 font-mono text-sm" />
            </label>
            <label className="block text-sm font-medium text-gray-700">
              Name
              <input required maxLength={100} value={form.name} onChange={(event) => updateField("name", event.target.value)} className="mt-1 w-full rounded-md border border-gray-300 p-2 text-sm" />
            </label>
            <label className="block text-sm font-medium text-gray-700">
              Description
              <textarea required maxLength={500} rows={4} value={form.tagline} onChange={(event) => updateField("tagline", event.target.value)} className="mt-1 w-full rounded-md border border-gray-300 p-2 text-sm" />
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="block text-sm font-medium text-gray-700">
                Stat value
                <input required maxLength={30} value={form.statValue} onChange={(event) => updateField("statValue", event.target.value)} className="mt-1 w-full rounded-md border border-gray-300 p-2 text-sm" />
              </label>
              <label className="block text-sm font-medium text-gray-700">
                Stat label
                <input required maxLength={80} value={form.statLabel} onChange={(event) => updateField("statLabel", event.target.value)} className="mt-1 w-full rounded-md border border-gray-300 p-2 text-sm" />
              </label>
            </div>
            <label className="block text-sm font-medium text-gray-700">
              Card accent
              <select value={form.colorClass} onChange={(event) => updateField("colorClass", event.target.value as ServiceForm["colorClass"])} className="mt-1 w-full rounded-md border border-gray-300 bg-white p-2 text-sm">
                <option value="bg-gm-maroon">Maroon</option>
                <option value="bg-gm-green">Green</option>
              </select>
            </label>
            {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
            <div className="flex gap-3">
              <button type="submit" disabled={loading} className="flex-1 rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50">
                {loading ? "Saving..." : editingId ? "Save changes" : "Add service"}
              </button>
              {editingId && (
                <button type="button" onClick={() => { setEditingId(null); setForm(emptyForm); setError(""); }} className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
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