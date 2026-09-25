export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0F0F12] text-white px-6">
      <div className="text-center">
        <p className="font-mono text-sm uppercase tracking-[0.2em] text-[#E3B4BC]">404</p>
        <h1 className="mt-4 text-4xl font-semibold">Page not found</h1>
        <p className="mt-3 text-white/70">The page you are looking for does not exist.</p>
      </div>
    </main>
  );
}
