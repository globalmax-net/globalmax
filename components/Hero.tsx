import React from "react";
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

  return (
    <>
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 md:px-10 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-8 lg:gap-14 pt-12 sm:pt-16 md:pt-24 pb-10 md:pb-14">
        <div>
          <div className="flex items-start sm:items-center gap-2.5 font-mono text-[11px] sm:text-[12.5px] uppercase tracking-widest mb-6 text-[#E3B4BC]">
            <span className="w-[7px] h-[7px] rounded-full inline-block bg-gm-maroon mt-1 sm:mt-0 shrink-0" />
            Global Max Networks (Private) Limited — Sri Lanka, est. 2022
          </div>

          <h1 className="font-display text-[28px] sm:text-[36px] md:text-[52px] leading-[1.12] tracking-tight font-semibold max-w-[640px]">
            Connecting people with opportunities, services, and global possibilities.
          </h1>

          <p className="mt-5 sm:mt-6 text-[15px] sm:text-[17px] leading-relaxed max-w-[500px] text-[--gm-text-soft-inv]">
            From visa consultancy and study-abroad guidance to airline ticketing, media, and
            digital platforms — Global Max is building a trusted, technology-driven service
            ecosystem across Northern and Eastern Sri Lanka, with a global outlook.
          </p>

          <div className="flex gap-4 mt-7 sm:mt-9 flex-wrap">
            <a
              href="/services"
              className="font-mono text-[13px] uppercase tracking-wide px-5 sm:px-6 py-3 sm:py-3.5 inline-flex items-center justify-center gap-2 w-full sm:w-auto border border-gm-maroon bg-gm-maroon text-white hover:bg-gm-maroon-dark hover:border-gm-maroon-dark transition"
            >
              Explore our services →
            </a>
            <a
              href="/about"
              className="font-mono text-[13px] uppercase tracking-wide px-5 sm:px-6 py-3 sm:py-3.5 inline-flex items-center justify-center gap-2 w-full sm:w-auto border border-gm-maroon bg-gm-maroon text-white hover:bg-gm-maroon-dark hover:border-gm-maroon-dark transition"
            >
              About Us →
            </a>
            
          </div>
        </div>

        <div className="border border-[--gm-line-inv] p-4 sm:p-6 self-start min-w-0">
          <div className="font-mono text-[11.5px] uppercase tracking-widest mb-4 text-[--gm-text-soft-inv]">
            Our service lines
          </div>
          {SERVICES.map((service, i) => (
            <div
              key={service.code}
              className={`flex justify-between items-center py-3 ${i > 0 ? "border-t border-[--gm-line-inv]" : ""}`}
            >
              <div className="flex items-center gap-2.5 text-sm min-w-0 pr-3">
                <span className={`w-2 h-2 rounded-full inline-block shrink-0 ${service.colorClass}`} />
                <span className="truncate">{service.name}</span>
              </div>
              <span className="font-mono text-[13px] text-[--gm-text-soft-inv] shrink-0">{service.code}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="overflow-hidden whitespace-nowrap border-t border-b border-[--gm-line-inv]">
        <div className="inline-flex items-center gap-12 py-3.5 animate-gm-scroll motion-reduce:animate-none">
          {tickerItems.map((fact, i) => (
            <span key={`${fact}-${i}`} className="font-mono inline-flex gap-2.5 items-center text-[13px] text-[--gm-text-soft-inv]">
              <span className="w-1.5 h-1.5 rounded-full bg-gm-green inline-block" />
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
    <section id="top" className="bg-gm-ink text-white">
      <HeroContent />
    </section>
  );
}
