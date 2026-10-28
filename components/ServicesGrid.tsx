
import React from "react";
import { SERVICES, UPCOMING, type Service, type UpcomingPlatform } from "./types";

export default function ServicesGrid({
  services = SERVICES,
  upcoming = UPCOMING,
  compactSpacing = false,
}: {
  services?: Service[];
  upcoming?: UpcomingPlatform[];
  compactSpacing?: boolean;
}) {
  const serviceCount = services.length === 6 ? "six" : String(services.length);

  return (
    <section
      id="services"
      className={`bg-white ${compactSpacing ? "py-8 sm:py-10 lg:py-14" : "py-10 sm:py-14 lg:py-16"}`}
    >
      <div className="gm-container">

        {/* Section Header */}
        <div className={`grid grid-cols-1 gap-5 md:grid-cols-[0.8fr_1.2fr] md:items-end ${compactSpacing ? "mb-7 md:mb-8" : "mb-8 md:mb-10"}`}>
          <div>
            <div className="mb-4 flex items-center gap-3 font-mono text-[12.5px] uppercase tracking-widest text-gm-maroon">
              <span className="h-[2px] w-8 bg-gm-maroon" />
              What we do
            </div>

            <h2 className="font-display text-[26px] sm:text-[32px] md:text-[38px] 2xl:text-[46px] font-semibold tracking-tight leading-tight text-[--gm-ink]">
              One ecosystem,
              <span className="block text-gm-green">{serviceCount} core services.</span>
            </h2>
          </div>

          <p className="max-w-xl text-base leading-relaxed text-gray-600 2xl:text-lg">
            Global Max combines local knowledge with a global outlook to deliver
            professional, reliable, and client-focused solutions at every stage
            of life.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:gap-5 lg:grid-cols-3">
          {services.map((service, i) => (
            <div
              key={service.code}
              className="group flex min-h-[220px] flex-col rounded-xl border border-[--gm-line] bg-slate-200 p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:min-h-[240px] sm:p-5 xl:min-h-[260px] xl:p-6"
            >
              {/* Number + Code */}
              <div className="mb-4 flex items-center justify-between">
                <div className="font-mono text-xs text-[--gm-text-soft]">
                  0{i + 1} / {service.code}
                </div>

                <div
                  className={`h-10 w-10 rounded-full flex items-center justify-center text-white font-mono text-[11px] ${service.colorClass}`}
                >
                  {service.code}
                </div>
              </div>

              {/* Accent Line */}
              <div
                className={`mb-4 h-[3px] w-9 transition-all duration-300 group-hover:w-16 ${service.colorClass}`}
              />

              {/* Service Name */}
              <h3 className="mb-2 font-display text-xl font-semibold 2xl:text-2xl">
                {service.name}
              </h3>

              {/* Description */}
              <p className="text-base leading-7 text-[--gm-text-soft] 2xl:text-lg">
                {service.tagline}
              </p>

              {/* Stats */}
              <div className="mt-auto flex items-end justify-between border-t border-[--gm-line] pt-4">
                <div>
                  <b className="font-mono block text-[20px]">
                    {service.statValue}
                  </b>

                  <span className="text-sm text-[--gm-text-soft]">
                    {service.statLabel}
                  </span>
                </div>

                
              </div>
            </div>
          ))}
        </div>

        {/* Upcoming Platforms */}
        <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {upcoming.map((item) => (
            <div
              key={item.name}
              className="flex flex-col items-start gap-3 rounded-lg border border-dashed border-[--gm-line] bg-white p-4 sm:flex-row sm:items-center sm:gap-4 sm:p-5"
            >
              <span className="font-mono text-[11px] uppercase tracking-wide whitespace-nowrap px-2.5 py-1 border bg-gm-green text-white rounded-md">
                Coming soon
              </span>

              <div>
                <h4 className="font-display text-base font-semibold mb-1">
                  {item.name}
                </h4>

                <p className="text-base leading-7 text-[--gm-text-soft]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
