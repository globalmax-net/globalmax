import React from "react";

export default function VisionMission() {
  return (
      <section id="vision-mission" className="bg-white text-black pt-16 pb-4 sm:pt-20 sm:pb-6 md:pt-28 md:pb-8">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 md:px-10">
        <div className="mb-12 text-center md:text-left">
          <h2 className="font-display text-[24px] sm:text-[30px] md:text-[42px] font-semibold tracking-tight leading-tight text-[--gm-ink]">
            GLOBAL MAX
            <span className="block">NETWORKS (PRIVATE) LIMITED</span>
          </h2>

          <div className="mt-6 font-mono text-[12.5px] uppercase tracking-[0.22em] text-[--gm-text-soft]">
            MISSION • VISION
          </div>
        </div>

        <div className="space-y-10">
          <div className="border-l-2 border-gm-green pl-5 md:pl-6">
            <h3 className="font-display text-[22px] md:text-[28px] font-semibold text-[--gm-ink]">
              Our Vision
            </h3>
            <p className="mt-3 text-[15px] md:text-[17px] leading-8 text-[--gm-text-soft]  text-black">
              “To build a trusted, technology-driven global service ecosystem that connects people with
              opportunities, services and communities, making essential aspects of life simpler, smarter and
              more accessible.”
            </p>
          </div>

          <div className="border-l-2 border-gm-maroon pl-5 md:pl-6">
            <h3 className="font-display text-[22px] md:text-[28px] font-semibold text-[--gm-ink]">
              Our Mission
            </h3>
            <p className="mt-3 text-[15px] md:text-[17px] leading-8 text-[--gm-text-soft]  text-black">
              “To deliver reliable, transparent and people-centric solutions across visa consultancy, education,
              travel, digital marketing, media, real estate and digital platforms, while continuously expanding our
              services through innovation and technology.”
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
