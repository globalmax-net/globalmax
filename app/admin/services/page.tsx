"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import LogoutButton from "@/components/LogoutButton";
import AdminPageHeader from "@/components/AdminPageHeader";

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
    <main className="min-h-screen bg-gradient-to-br from-gm-paper-2 via-white to-gm-paper-2/70 p-4 text-gm-ink sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <AdminPageHeader title="Services" description="Update the service cards and highlights shown on your website.">
          <Link href="/admin" className="rounded-lg border border-gm-paper-2 bg-white px-4 py-2.5 text-sm font-semibold text-gm-ink/75 transition-colors hover:border-gm-green hover:text-gm-green-dark">Dashboard</Link>
          <LogoutButton />
        </AdminPageHeader>

        <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_380px]">
          <section className="overflow-hidden rounded-2xl border border-white bg-white shadow-sm">
            <div className="border-b border-gm-paper-2/80 px-5 py-4 sm:px-6">
              <h2 className="font-display text-lg font-semibold text-gm-ink">Service cards</h2>
            </div>
            <div className="divide-y divide-gm-paper-2">
              {services.map((service) => (
                <article key={service._id} className="flex flex-wrap items-center justify-between gap-4 p-5">
                  <div className="flex min-w-0 items-center gap-4">
                    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[11px] font-mono text-white ${service.colorClass}`}>
                      {service.code}
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-gm-ink">{service.name}</h3>
                      <p className="mt-1 line-clamp-2 text-sm text-gm-ink/60">{service.tagline}</p>
                    </div>
                  </div>
                  <div className="flex shrink-0 gap-4 text-sm">
                    <button type="button" onClick={() => editService(service)} className="font-medium text-gm-green hover:text-gm-green-dark hover:underline">Edit</button>
                    <button type="button" onClick={() => deleteService(service)} className="font-medium text-red-700 hover:underline">Delete</button>
                  </div>
                </article>
              ))}
              {services.length === 0 && !error && <p className="p-6 text-sm text-gm-ink/60">No services found.</p>}
            </div>
          </section>

          <form onSubmit={saveService} className="space-y-4 rounded-2xl border border-white bg-white p-5 shadow-sm sm:p-6">
            <h2 className="font-display text-lg font-semibold text-gm-ink">{editingId ? "Edit service" : "Add a service"}</h2>
            <label className="block text-sm font-medium text-gm-ink/80">
              Code
              <input required maxLength={6} value={form.code} onChange={(event) => updateField("code", event.target.value.toUpperCase())} className="mt-1 w-full rounded-md border border-gm-paper-2 p-2 font-mono text-sm focus:border-gm-green focus:outline-none focus:ring-1 focus:ring-gm-green" />
            </label>
            <label className="block text-sm font-medium text-gm-ink/80">
              Name
              <input required maxLength={100} value={form.name} onChange={(event) => updateField("name", event.target.value)} className="mt-1 w-full rounded-md border border-gm-paper-2 p-2 text-sm focus:border-gm-green focus:outline-none focus:ring-1 focus:ring-gm-green" />
            </label>
            <label className="block text-sm font-medium text-gm-ink/80">
              Description
              <textarea required maxLength={500} rows={4} value={form.tagline} onChange={(event) => updateField("tagline", event.target.value)} className="mt-1 w-full rounded-md border border-gm-paper-2 p-2 text-sm focus:border-gm-green focus:outline-none focus:ring-1 focus:ring-gm-green" />
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="block text-sm font-medium text-gm-ink/80">
                Stat value
                <input required maxLength={30} value={form.statValue} onChange={(event) => updateField("statValue", event.target.value)} className="mt-1 w-full rounded-md border border-gm-paper-2 p-2 text-sm focus:border-gm-green focus:outline-none focus:ring-1 focus:ring-gm-green" />
              </label>
              <label className="block text-sm font-medium text-gm-ink/80">
                Stat label
                <input required maxLength={80} value={form.statLabel} onChange={(event) => updateField("statLabel", event.target.value)} className="mt-1 w-full rounded-md border border-gm-paper-2 p-2 text-sm focus:border-gm-green focus:outline-none focus:ring-1 focus:ring-gm-green" />
              </label>
            </div>
            <label className="block text-sm font-medium text-gm-ink/80">
              Card accent
              <select value={form.colorClass} onChange={(event) => updateField("colorClass", event.target.value as ServiceForm["colorClass"])} className="mt-1 w-full rounded-md border border-gm-paper-2 bg-white p-2 text-sm focus:border-gm-green focus:outline-none focus:ring-1 focus:ring-gm-green">
                <option value="bg-gm-maroon">Maroon</option>
                <option value="bg-gm-green">Green</option>
              </select>
            </label>
            {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
            <div className="flex gap-3">
              <button type="submit" disabled={loading} className="flex-1 rounded-md bg-gm-green px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gm-green-dark disabled:opacity-50">
                {loading ? "Saving..." : editingId ? "Save changes" : "Add service"}
              </button>
              {editingId && (
                <button type="button" onClick={() => { setEditingId(null); setForm(emptyForm); setError(""); }} className="rounded-md border border-gm-paper-2 px-4 py-2 text-sm font-medium text-gm-ink/80 hover:bg-gm-paper-2">
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