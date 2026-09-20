"use client";

import React from "react";

const COLUMNS = [
  {
    title: "Services",
    links: [
      "Visa Consultancy",
      "Student & Education Guidance",
      "Airline Ticketing",
      "Digital Marketing",
      "Media — Vettri TV",
      
      "Real Estate",
    ],
  },
  { title: "Company", links: ["About Us", "Our Vision", "Our Mission"] },
  { title: "Coming Soon", links: ["Job Portal", "Matrimonial Platform"] },
];

export default function Footer() {
  return (
    <footer className="bg-gm-ink text-white border-t border-[--gm-line-inv] pt-12 md:pt-16">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] gap-10 md:gap-12 pb-12 md:pb-16">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.jpeg" alt="Global Max Networks" className="h-11 w-auto object-contain bg-white p-1.5" />
            <p className="mt-4 text-[14.5px] max-w-[280px] text-[--gm-text-soft-inv]">
              Connecting people with opportunities, services, and global possibilities. Est. 2022,
              Sri Lanka.
            </p>
            <form className="flex flex-col sm:flex-row mt-4 border border-[--gm-line-inv] min-w-0" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="you@company.com"
                className="font-body bg-transparent border-none px-3.5 py-3 text-sm flex-1 min-w-0 outline-none text-white placeholder:text-[--gm-text-soft-inv]"
              />
              <button type="submit" className="font-mono px-4 py-3 sm:py-0 border-none text-[13px] bg-gm-green text-white shrink-0">
                Subscribe
              </button>
            </form>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h5 className="font-mono text-xs uppercase tracking-wide mb-4 text-[--gm-text-soft-inv]">
                {col.title}
              </h5>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-[14.5px] opacity-85 hover:opacity-100 hover:underline">
                      {link}
                    </a>
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
