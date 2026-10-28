import type { ReactNode } from "react";

export default function AdminPageHeader({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <header className="mb-6 flex flex-col gap-5 rounded-2xl border border-white bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gm-green">
          Global Max <span className="px-1 text-gm-maroon">/</span> Admin
        </p>
        <h1 className="mt-2 font-display text-2xl font-semibold tracking-tight text-gm-ink sm:text-3xl">
          {title}
        </h1>
        <p className="mt-1 text-sm text-gm-ink/65">{description}</p>
      </div>
      <div className="flex flex-wrap items-center gap-2">{children}</div>
    </header>
  );
}
