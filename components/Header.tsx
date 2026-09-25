"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "Vision", href: "/vision" },
  { label: "Director's Message", href: "/director-message" },
  { label: "Services", href: "/services" },
  { label: "Why US", href: "/why-us" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 backdrop-blur border-b border-[--gm-line] bg-white/90">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 md:px-10 flex items-center justify-between h-16 sm:h-[76px] gap-3">
        <Link href="/" className="flex items-center min-w-0 shrink-0" onClick={() => setOpen(false)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.jpeg" alt="Global Max Networks" className="h-9 sm:h-11 w-auto max-w-[180px] object-contain" />
        </Link>

        <nav className="hidden lg:flex gap-6 xl:gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-mono text-[14px] uppercase tracking-wider text-[--gm-text-soft] pb-1 border-b border-transparent hover:border-gm-maroon hover:text-gm-maroon transition whitespace-nowrap"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/#contact"
            className="hidden sm:inline-flex font-mono text-[13px] md:text-[15px] uppercase tracking-wide border border-gm-green text-gm-maroon px-3 md:px-[18px] py-2 md:py-[9px] transition hover:bg-gm-maroon hover:text-white whitespace-nowrap"
          >
            Get in Touch
          </Link>

          <button
            type="button"
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 border border-[--gm-line] text-gm-ink"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M3 3l12 12M15 3L3 15" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            ) : (
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden="true">
                <path d="M0 1h18M0 7h18M0 13h18" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div className={`lg:hidden border-t border-[--gm-line] bg-white ${open ? "block" : "hidden"}`}>
        <nav className="max-w-[1180px] mx-auto px-4 sm:px-6 py-4 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-mono text-[13px] uppercase tracking-wider text-[--gm-text-soft] py-3 border-b border-[--gm-line] hover:text-gm-maroon"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            className="mt-3 font-mono text-[13px] uppercase tracking-wide border border-gm-maroon text-gm-maroon px-4 py-3 text-center hover:bg-gm-maroon hover:text-white transition"
          >
            Get in Touch
          </Link>
        </nav>
      </div>
    </header>
  );
}
