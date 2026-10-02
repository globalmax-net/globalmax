import LogoutButton from "@/components/LogoutButton";
import Link from "next/link";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto flex max-w-4xl items-center justify-between border border-gray-100 bg-white p-5 shadow-sm">
        <h1 className="text-xl font-semibold text-gray-900">Admin CMS</h1>
        <div className="flex items-center gap-5">
          <Link href="/admin/services" className="text-sm font-medium text-gray-700 hover:text-black">Manage services</Link>
          <Link href="/admin/upcoming" className="text-sm font-medium text-gray-700 hover:text-black">Manage upcoming</Link>
          <Link href="/admin/posts" className="text-sm font-medium text-gray-700 hover:text-black">Manage posts</Link>
          <LogoutButton />
        </div>
      </div>
    </main>
  );
}
