"use client";

import React from "react";
import Link from "next/link";

const COLUMNS = [
  {
    title: "Services",
    links: [
      { label: "Visa Consultancy", href: "/services" },
      { label: "Student & Education Guidance", href: "/services" },
      { label: "Airline Ticketing", href: "/services" },
      { label: "Digital Marketing", href: "/services" },
      { label: "Media — Vettri TV", href: "/services" },
      { label: "Real Estate", href: "/services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Vision", href: "/vision" },
      { label: "Our Mission", href: "/vision" },
    ],
  },
  {
    title: "Coming Soon",
    links: [
      { label: "Job Portal"},
      { label: "Matrimonial Platform"},
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-gm-ink text-white border-t border-[--gm-line-inv] pt-12 md:pt-16">
      <div className="gm-container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] gap-10 md:gap-12 pb-12 md:pb-16">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-footer.png" alt="Global Max Networks" className="block h-auto w-[150px] max-w-full object-contain sm:w-[176px]" />
            <p className="mt-4 text-[14.5px] max-w-[280px] text-[--gm-text-soft-inv]">
              Connecting people with opportunities, services, and global possibilities. Est. 2022,
              Sri Lanka.
            </p>
           
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h5 className="font-mono text-xs uppercase tracking-wide mb-4 text-[--gm-text-soft-inv]">
                {col.title}
              </h5>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {"href" in link ? (
                      <Link
                        href={link.href}
                        className="text-[14.5px] opacity-85 hover:opacity-100 hover:underline"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <span className="text-[14.5px] opacity-85">{link.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center flex-wrap gap-3.5 py-6 border-t border-[--gm-line-inv]">
          <p className="font-mono text-xs text-[--gm-text-soft-inv]">
            © 2026 GLOBAL MAX NETWORKS (PRIVATE) LIMITED
          </p>
          <div className="flex gap-6">
            {["Terms", "Privacy", "Contact"].map((l) => (
              <a key={l} href="#" className="font-mono text-xs text-[--gm-text-soft-inv]">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
