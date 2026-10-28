"use client";

import Link from "next/link";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const body = (await response.json()) as { message?: string; error?: string };
      if (!response.ok) throw new Error(body.error || "Unable to request a reset link.");
      setMessage(body.message || "Check your email for a password reset link.");
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to request a reset link. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gm-paper-2 via-white to-gm-paper-2/70 px-4 py-12">
      <section className="w-full max-w-md rounded-2xl border border-white border-t-4 border-t-gm-maroon bg-white p-6 shadow-xl sm:p-8">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-gm-green">
          Global Max · Content management
        </p>
        <h1 className="mt-3 text-center font-display text-2xl font-semibold text-gm-ink">Forgot password?</h1>
        <p className="mt-2 text-center text-sm text-gm-ink/60">
          Enter your admin email and we&apos;ll send a one-time reset link.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label htmlFor="recovery-email" className="block text-sm font-medium text-gm-ink/80">
            Email address
            <input
              id="recovery-email"
              type="email"
              autoComplete="email"
              required
              maxLength={254}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-1 block w-full rounded-md border border-gm-paper-2 px-4 py-3 text-sm focus:border-gm-green focus:outline-none focus:ring-1 focus:ring-gm-green"
            />
          </label>
          {message && <p role="status" className="rounded-md bg-green-50 p-3 text-sm text-gm-green-dark">{message}</p>}
          {error && <p role="alert" className="rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-gm-maroon px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-gm-maroon-dark disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send reset link"}
          </button>
        </form>

        <Link href="/admin/login" className="mt-5 block text-center text-sm font-medium text-gm-green-dark hover:text-gm-maroon">
          Back to sign in
        </Link>
      </section>
    </main>
  );
}
