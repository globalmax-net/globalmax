"use client";

import React from "react";

const NAV_LINKS = [
  { label: "Services", href: "services" },
  { label: "About", href: "about" },
  { label: "Director's Message", href: "director-message" },
  { label: "Vision", href: "vision" },
  { label: "Success", href: "success" },

];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur border-b border-[--gm-line] bg-white/90">
      <div className="max-w-[1180px] mx-auto px-6 md:px-10 flex items-center justify-between h-[76px]">
        <a href="#top" className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.jpeg" alt="Global Max Networks" className="h-11 w-auto object-contain" />
        </a>

        <nav className="hidden md:flex gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font IBM Plex Mono text-[13px] uppercase tracking-wider text-[--gm-text-soft] pb-1 border-b border-transparent hover:border-gm-maroon hover:text-gm-maroon transition"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="font IBM Plex Mono text-[15px] uppercase tracking-wide border border-gm-maroon text-gm-maroon px-[18px] py-[9px] transition hover:bg-gm-maroon hover:text-white"
        >
          Get in Touch
        </a>
      </div>
    </header>
  );
}
