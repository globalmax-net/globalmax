"use client";

import Link from "next/link";
import { useState } from "react";

export default function ResetPasswordForm({ token }: { token: string }) {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const body = (await response.json()) as { message?: string; error?: string };
      if (!response.ok) throw new Error(body.error || "Unable to reset password.");
      setMessage(body.message || "Password updated.");
      setPassword("");
    } catch (submitError) {
      setError(
        submitError instanceof Error ? submitError.message : "Unable to reset password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gm-paper-2 px-4 py-12">
      <section className="w-full max-w-md rounded-xl border border-gm-paper-2 border-t-4 border-t-gm-maroon bg-white p-8 shadow-lg">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-gm-green">
          Global Max · Content management
        </p>
        <h1 className="mt-3 text-center text-2xl font-bold text-gm-ink">Set a new password</h1>
        <p className="mt-2 text-center text-sm text-gm-ink/60">
          Choose a password with at least 8 characters.
        </p>

        {token ? (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <label htmlFor="new-password" className="block text-sm font-medium text-gm-ink/80">
              New password
              <input
                id="new-password"
                type="password"
                autoComplete="new-password"
                required
                minLength={8}
                maxLength={128}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-1 block w-full rounded-md border border-gm-paper-2 px-4 py-3 text-sm focus:border-gm-green focus:outline-none focus:ring-1 focus:ring-gm-green"
              />
            </label>
            {message && <p role="status" className="rounded-md bg-green-50 p-3 text-sm text-gm-green-dark">{message}</p>}
            {error && <p role="alert" className="rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p>}
            {message ? (
              <Link href="/admin/login" className="block w-full rounded-md bg-gm-maroon px-4 py-3 text-center text-sm font-medium text-white hover:bg-gm-maroon-dark">
                Continue to sign in
              </Link>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-md bg-gm-maroon px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-gm-maroon-dark disabled:opacity-50"
              >
                {loading ? "Updating..." : "Update password"}
              </button>
            )}
          </form>
        ) : (
          <p role="alert" className="mt-6 rounded-md bg-red-50 p-3 text-center text-sm text-red-700">
            This reset link is invalid. Request a new one.
          </p>
        )}

        <Link href="/admin/login" className="mt-5 block text-center text-sm font-medium text-gm-green-dark hover:text-gm-maroon">
          Back to sign in
        </Link>
      </section>
    </main>
  );
}
