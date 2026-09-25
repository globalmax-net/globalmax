"use client";

import React, { useEffect, useState } from "react";
import { SERVICES } from "./types";

const TICKER_FACTS = [
  "2000+ VISA SERVICES DELIVERED",
  "ESTABLISHED 2022",
  "NORTHERN & EASTERN SRI LANKA",
  "VETTRI TV MEDIA NETWORK",
  "DIGITAL PLATFORMS IN DEVELOPMENT",
];

export function HeroContent() {
  const tickerItems = [...TICKER_FACTS, ...TICKER_FACTS];
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 md:px-10 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-8 lg:gap-14 pt-12 sm:pt-16 md:pt-24 pb-10 md:pb-14">

        {/* LEFT CONTENT */}
        <div
          className={`transition-all duration-[1200ms] ease-out ${
            loaded
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          {/* BRAND LINE */}
          <div className="flex items-start sm:items-center gap-2.5 font-mono text-[11px] sm:text-[12.5px] uppercase tracking-widest mb-6 text-[#E3B4BC]">
            <span className="relative flex h-[9px] w-[9px] shrink-0 mt-1 sm:mt-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gm-maroon opacity-50" />
              <span className="relative inline-flex h-[7px] w-[7px] rounded-full bg-gm-maroon" />
            </span>

            Global Max Networks (Private) Limited — Sri Lanka, est. 2022
          </div>

          {/* HEADING */}
          <h1
            className={`font-display text-[30px] sm:text-[40px] md:text-[54px] leading-[1.08] tracking-tight font-semibold max-w-[680px] transition-all duration-[1400ms] delay-200 ${
              loaded
                ? "translate-y-0 opacity-100"
                : "translate-y-12 opacity-0"
            }`}
          >
            Connecting people{" "}
            <span className="text-[#E3B4BC]">
              with opportunities,
            </span>{" "}
            services, and{" "}
            <span className="text-[#E3B4BC]">
              global possibilities.
            </span>
          </h1>

          {/* DESCRIPTION */}
          <p
            className={`mt-5 sm:mt-6 text-[15px] sm:text-[17px] leading-relaxed max-w-[560px] text-[--gm-text-soft-inv] transition-all duration-[1200ms] delay-500 ${
              loaded
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            From visa consultancy and study-abroad guidance to airline
            ticketing, media, and digital platforms — Global Max is building
            a trusted, technology-driven service ecosystem across Northern
            and Eastern Sri Lanka, with a global outlook.
          </p>
        </div>

        {/* RIGHT SERVICE BOX */}
        <div
          className={`relative self-start min-w-0 transition-all duration-[1400ms] delay-300 ${
            loaded
              ? "translate-x-0 opacity-100"
              : "translate-x-16 opacity-0"
          }`}
        >
          {/* OUTER GLOW */}
          <div className="absolute -inset-[1px] rounded-sm bg-gradient-to-r from-gm-maroon/0 via-gm-maroon/40 to-gm-maroon/0 opacity-0 blur-sm transition-opacity duration-700 group-hover:opacity-100" />

          {/* BOX */}
          <div className="group relative overflow-hidden border border-[--gm-line-inv] bg-white/[0.015] p-4 sm:p-6 transition-all duration-500 hover:-translate-y-2 hover:border-white/25 hover:bg-white/[0.035] hover:shadow-[0_25px_70px_rgba(0,0,0,0.25)]">

            {/* Animated scanning line */}
            <div className="pointer-events-none absolute left-0 top-0 h-[1px] w-full bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 animate-gm-scan" />

            {/* Corner decoration */}
            <div className="absolute right-0 top-0 h-12 w-12 border-r border-t border-white/10 transition-all duration-500 group-hover:h-20 group-hover:w-20 group-hover:border-white/25" />

            <div className="absolute bottom-0 left-0 h-12 w-12 border-b border-l border-white/10 transition-all duration-500 group-hover:h-20 group-hover:w-20 group-hover:border-white/25" />

            {/* HEADER */}
            <div className="relative z-10 flex items-center justify-between mb-4">

              <div className="font-mono text-[11.5px] uppercase tracking-widest text-[--gm-text-soft-inv]">
                Our service lines
              </div>

              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-gm-green animate-pulse" />

                <span className="font-mono text-[9px] uppercase tracking-wider text-white/30">
                  Active
                </span>
              </div>
            </div>

            {/* SERVICE ITEMS */}
            <div className="relative z-10">
              {SERVICES.map((service, i) => (
                <div
                  key={service.code}
                  className={`group/service relative flex justify-between items-center py-4 px-2 ${
                    i > 0
                      ? "border-t border-[--gm-line-inv]"
                      : ""
                  } transition-all duration-500 hover:bg-white/[0.045]`}
                  style={{
                    animationDelay: `${i * 120}ms`,
                  }}
                >
                  {/* ACTIVE LINE */}
                  <span
                    className={`absolute left-0 top-0 h-full w-[2px] origin-center scale-y-0 transition-transform duration-300 group-hover/service:scale-y-100 ${service.colorClass}`}
                  />

                  {/* SERVICE NAME */}
                  <div className="flex items-center gap-3 text-sm min-w-0 pr-3">

                    <span
                      className={`relative w-2 h-2 rounded-full shrink-0 ${service.colorClass}`}
                    >
                      <span
                        className={`absolute inset-0 rounded-full opacity-0 scale-100 transition-all duration-300 group-hover/service:opacity-60 group-hover/service:scale-[2] ${service.colorClass}`}
                      />
                    </span>

                    <span className="transition-all duration-300 group-hover/service:translate-x-2 group-hover/service:text-white">
                      {service.name}
                    </span>
                  </div>

                  {/* CODE */}
                  <span className="font-mono text-[13px] text-[--gm-text-soft-inv] transition-all duration-300 group-hover/service:text-white group-hover/service:translate-x-[-4px]">
                    {service.code}
                  </span>
                </div>
              ))}
            </div>

            {/* BOTTOM STATUS */}
            <div className="relative z-10 mt-5 flex items-center justify-between border-t border-white/5 pt-4">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/25">
                Global Max Network
              </span>

              <span className="font-mono text-[9px] text-white/25">
                04 SERVICES
              </span>
            </div>

            {/* BACKGROUND ORB */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gm-maroon/10 blur-[70px] transition-all duration-700 group-hover:scale-150 group-hover:bg-gm-maroon/15" />

          </div>
        </div>
      </div>

      {/* TICKER */}
      <div className="group/ticker overflow-hidden whitespace-nowrap border-t border-b border-[--gm-line-inv] hover:bg-white/[0.02]">
        <div className="inline-flex items-center gap-12 py-3.5 animate-gm-scroll motion-reduce:animate-none group-hover/ticker:[animation-play-state:paused]">
          {tickerItems.map((fact, i) => (
            <span
              key={`${fact}-${i}`}
              className="group/fact font-mono inline-flex gap-2.5 items-center text-[13px] text-[--gm-text-soft-inv] transition-colors duration-300 hover:text-white"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 rounded-full bg-gm-green opacity-0 scale-100 transition-all duration-300 group-hover/fact:opacity-50 group-hover/fact:scale-150" />
                <span className="relative w-1.5 h-1.5 rounded-full bg-gm-green" />
              </span>

              {fact}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gm-ink text-white"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-gm-maroon/10 blur-[120px]" />

      <div className="pointer-events-none absolute -right-40 bottom-10 h-80 w-80 rounded-full bg-gm-green/5 blur-[120px]" />

      <HeroContent />
    </section>
  );
}