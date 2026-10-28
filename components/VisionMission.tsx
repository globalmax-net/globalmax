import React from "react";

export default function VisionMission() {
  return (
      <section id="vision-mission" className="bg-white text-black py-8 sm:py-10 lg:py-14">
      <div className="gm-container">
        <div className="mb-8 text-center md:text-left">
          <div className="flex items-center justify-center gap-3 font-mono text-[12.5px] uppercase tracking-[0.22em] text-gm-green md:justify-start">
            <span className="h-[2px] w-8 bg-gm-green" />
            MISSION • VISION
          </div>
        </div>

        <div className="space-y-6">
          <div className="border-l-2 border-gm-green pl-5 md:pl-6">
            <h3 className="font-display text-[22px] md:text-[28px] 2xl:text-[32px] font-semibold text-gm-green">
              Our Vision
            </h3>
            <p className="mt-3 text-base md:text-lg 2xl:text-xl leading-relaxed text-[--gm-text-soft] text-black">
              “To build a trusted, technology-driven global service ecosystem that connects people with
              opportunities, services and communities, making essential aspects of life simpler, smarter and
              more accessible.”
            </p>
          </div>

          <div className="border-l-2 border-gm-maroon pl-5 md:pl-6">
            <h3 className="font-display text-[22px] md:text-[28px] 2xl:text-[32px] font-semibold text-gm-maroon">
              Our Mission
            </h3>
            <p className="mt-3 text-base md:text-lg 2xl:text-xl leading-relaxed text-[--gm-text-soft] text-black">
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
