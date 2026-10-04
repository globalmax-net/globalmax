"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
      // Redirect to login page and refresh router so middleware notices the deleted cookie
      router.push("/admin/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed", error);
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="rounded-md bg-gm-green px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-gm-green-dark focus:outline-none focus:ring-2 focus:ring-gm-green focus:ring-offset-2 disabled:opacity-50"
    >
      {loading ? "Logging out..." : "Log out"}
    </button>
  );
}
