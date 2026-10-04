"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        // Redirect to admin panel and refresh to apply middleware bypass
        router.push("/admin");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Login failed. Please check your credentials.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gm-paper-2 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-xl border border-gm-paper-2 border-t-4 border-t-gm-maroon bg-white p-10 shadow-lg">
        <div>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-gm-green">Global Max · Content management</p>
          <h2 className="mt-3 text-center text-3xl font-extrabold tracking-tight text-gm-ink">
            Admin Login
          </h2>
          <p className="mt-2 text-center text-sm text-gm-ink/60">
            Sign in to access the Global Max admin panel
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-md border border-red-100 bg-red-50 p-4 text-center text-sm font-medium text-red-700">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label htmlFor="email-address" className="mb-1 block text-sm font-medium text-gm-ink/80">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full appearance-none rounded-md border border-gm-paper-2 px-4 py-3 text-sm shadow-sm placeholder-gray-400 transition-colors focus:border-gm-green focus:outline-none focus:ring-1 focus:ring-gm-green"
                placeholder="admin@globalmax.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-1 block text-sm font-medium text-gm-ink/80">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full appearance-none rounded-md border border-gm-paper-2 px-4 py-3 text-sm shadow-sm placeholder-gray-400 transition-colors focus:border-gm-green focus:outline-none focus:ring-1 focus:ring-gm-green"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-4">
            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-md border border-transparent bg-gm-maroon px-4 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-gm-maroon-dark focus:outline-none focus:ring-2 focus:ring-gm-maroon focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
            <Link
              href="/admin/forgot-password"
              className="block text-center text-sm font-medium text-gm-green-dark hover:text-gm-maroon"
            >
              Forgot password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
