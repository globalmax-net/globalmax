import React from "react";

const STATS = [
  { value: "2022", label: "Established" },
  { value: "2000+", label: "Visa services delivered" },
  { value: "6", label: "Core service lines" },
  { value: "2", label: "Platforms in development" },
];

export default function Stats() {
  return (
    <section className="bg-white py-12 sm:py-16 md:py-24">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 md:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10 border-t border-[--gm-line] pt-8 md:pt-12">
          {STATS.map((s) => (
            <div key={s.label}>
              <b className="font-display block text-[28px] sm:text-[36px] md:text-[44px] font-semibold tracking-tight text-gm-maroon">
                {s.value}
              </b>
              <span className="font-mono text-[12.5px] uppercase tracking-wide text-[--gm-text-soft]">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
