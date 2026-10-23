"use client";

import React from "react";

const OBJECTIVES = [
  {
    number: "01",
    title: "Customer-Centric Service",
    description:
      "Deliver personalized, professional and high-quality services based on the needs and goals of our clients.",
  },
  {
    number: "02",
    title: "Visa & Migration Excellence",
    description:
      "Continue to develop as a trusted professional service provider in visa consultancy and migration-related services.",
  },
  {
    number: "03",
    title: "Education & International Opportunities",
    description:
      "Guide students and young people towards international education, employment and career opportunities.",
  },
  {
    number: "04",
    title: "Travel & Airline Services",
    description:
      "Provide integrated Visa, Ticketing and Travel Support from the application stage through to international travel.",
  },
  {
    number: "05",
    title: "Digital Transformation",
    description:
      "Simplify essential services through technology and develop innovative digital platforms that improve accessibility and convenience.",
  },
  {
    number: "06",
    title: "Employment & Career Ecosystem",
    description:
      "Connect employers and job seekers through digital employment platforms such as Job Martz.",
  },
  {
    number: "07",
    title: "Media & Digital Communication",
    description:
      "Strengthen news, advertising and promotional services through Vettri TV and digital media channels.",
  },
  {
    number: "08",
    title: "Business Diversification",
    description:
      "Expand into Travel, Technology, Media, Real Estate, Digital Services and other related business sectors.",
  },
  {
    number: "09",
    title: "Regional & Global Expansion",
    description:
      "Strengthen our presence in Northern and Eastern Sri Lanka while expanding our services across Sri Lanka and international markets.",
  },
  {
    number: "10",
    title: "Long-Term Partnerships",
    description:
      "Build trusted, sustainable relationships with clients, educational institutions, recruitment agencies, corporate organizations, investors and strategic partners.",
  },
];

export default function Objectives() {
  return (
    <section className="bg-white py-10 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-[1180px] px-4 sm:px-6 md:px-10">

        {/* SECTION HEADER */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-[0.8fr_1.2fr] md:items-end">

          <div>
            <div className="mb-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-gm-maroon">
              <span className="h-[2px] w-8 bg-gm-maroon" />
              Our Objectives
            </div>

            <h2 className="font-display text-[38px] font-semibold leading-tight tracking-tight text-gm-ink sm:text-[48px] md:text-[56px]">
              Building with
              <br />
              <span className="text-gm-maroon">
                purpose.
              </span>
            </h2>
          </div>

          <p className="max-w-xl text-[15px] leading-7 text-gray-600 sm:text-[16px]">
            Our objectives are focused on delivering trusted services,
            creating meaningful opportunities and building a connected
            ecosystem that serves our clients and communities locally and
            globally.
          </p>
        </div>

        {/* OBJECTIVES GRID */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

          {OBJECTIVES.map((objective) => (
            <div
              key={objective.number}
              className="group relative border border-gray-200 bg-white p-6 sm:p-7"
            >
              {/* TOP LINE */}
              <div className="mb-6 flex items-start justify-between">
                <span className="font-mono text-[12px] tracking-widest text-gm-maroon">
                  {objective.number}
                </span>

                <span className="h-2 w-2 bg-gm-maroon" />
              </div>

              {/* TITLE */}
              <h3 className="mb-3 font-display text-[20px] font-semibold leading-snug text-gm-ink sm:text-[22px]">
                {objective.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="max-w-[520px] text-[14px] leading-6 text-gray-600 sm:text-[15px]">
                {objective.description}
              </p>

              {/* BOTTOM ACCENT */}
              <div className="mt-6 h-px w-full bg-gray-100" />
            </div>
          ))}

        </div>

        {/* BOTTOM STATEMENT */}
        <div className="mt-10 border-l-2 border-gm-maroon bg-gray-50 px-6 py-5 sm:px-8">
          <p className="font-display text-[18px] font-medium leading-relaxed text-gm-ink sm:text-[20px]">
            Creating trusted connections, meaningful opportunities and
            sustainable growth — locally and globally.
          </p>
        </div>

      </div>
    </section>
  );
}