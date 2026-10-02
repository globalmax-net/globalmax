
import React from "react";
import { SERVICES, UPCOMING, type Service, type UpcomingPlatform } from "./types";

export default function ServicesGrid({
  services = SERVICES,
  upcoming = UPCOMING,
}: {
  services?: Service[];
  upcoming?: UpcomingPlatform[];
}) {
  const serviceCount = services.length === 6 ? "six" : String(services.length);

  return (
    <section id="services" className="bg-white py-16 sm:py-20 md:py-28">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 md:px-10">

        {/* Section Header */}
        <div className="max-w-[640px] mb-10 md:mb-14">
          <div className="mb-4 flex items-center gap-3 font-mono text-[12.5px] uppercase tracking-widest text-gm-maroon">
            <span className="h-[2px] w-8 bg-gm-maroon" />
            What we do
          </div>

          <h2 className="font-display text-[26px] sm:text-[32px] md:text-[38px] font-semibold tracking-tight leading-tight text-[--gm-ink]">
            One ecosystem,
            <span className="block text-gm-green">{serviceCount} core services.</span>
          </h2>

          <p className="mt-4 text-base max-w-[520px] text-[--gm-text-soft]">
            Global Max combines local knowledge with a global outlook to deliver
            professional, reliable, and client-focused solutions at every stage
            of life.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div
              key={service.code}
              className="group bg-slate-200 rounded-2xl border border-[--gm-line] p-5 sm:p-8 min-h-[240px] sm:min-h-[280px] flex flex-col shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Number + Code */}
              <div className="flex items-center justify-between mb-6">
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
                className={`h-[3px] w-9 mb-5 transition-all duration-300 group-hover:w-16 ${service.colorClass}`}
              />

              {/* Service Name */}
              <h3 className="font-display text-xl font-semibold mb-2.5">
                {service.name}
              </h3>

              {/* Description */}
              <p className="text-[14.5px] leading-6 text-[--gm-text-soft]">
                {service.tagline}
              </p>

              {/* Stats */}
              <div className="mt-auto pt-5 border-t border-[--gm-line] flex items-end justify-between">
                <div>
                  <b className="font-mono block text-[20px]">
                    {service.statValue}
                  </b>

                  <span className="text-[12.5px] text-[--gm-text-soft]">
                    {service.statLabel}
                  </span>
                </div>

                
              </div>
            </div>
          ))}
        </div>

        {/* Upcoming Platforms */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {upcoming.map((item) => (
            <div
              key={item.name}
              className="rounded-xl border border-dashed border-[--gm-line] p-5 sm:p-6 flex flex-col sm:flex-row items-start gap-3 sm:gap-4 bg-white"
            >
              <span className="font-mono text-[11px] uppercase tracking-wide whitespace-nowrap px-2.5 py-1 border bg-gm-green text-white rounded-md">
                Coming soon
              </span>

              <div>
                <h4 className="font-display text-base font-semibold mb-1">
                  {item.name}
                </h4>

                <p className="text-[14px] leading-6 text-[--gm-text-soft]">
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

