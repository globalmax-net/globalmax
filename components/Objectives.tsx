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
    <section className="bg-white py-8 sm:py-10 lg:py-14">
      <div className="gm-container">

        {/* SECTION HEADER */}
        <div className="mb-7 grid grid-cols-1 gap-5 md:grid-cols-[0.8fr_1.2fr] md:items-end">

          <div>
            <div className="mb-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-gm-maroon">
              <span className="h-[2px] w-8 bg-gm-maroon" />
              Our Objectives
            </div>

            <h2 className="font-display text-[36px] font-semibold leading-tight tracking-tight text-gm-ink sm:text-[44px] md:text-[52px] 2xl:text-[60px]">
              Building with
              <br />
              <span className="text-gm-maroon">
                purpose.
              </span>
            </h2>
          </div>

          <p className="max-w-xl text-base leading-relaxed text-gray-600 2xl:text-lg">
            Our objectives are focused on delivering trusted services,
            creating meaningful opportunities and building a connected
            ecosystem that serves our clients and communities locally and
            globally.
          </p>
        </div>

        {/* OBJECTIVES GRID */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">

        {OBJECTIVES.map((objective, index) => {
          const accent = index % 2 === 0
            ? {
              stripe: "bg-gm-maroon",
                badge: "bg-gm-maroon/10 text-gm-maroon",
                line: "from-gm-maroon/40",
                title: "group-hover:text-gm-maroon",
              }
            : {
              stripe: "bg-gm-green",
                badge: "bg-gm-green/10 text-gm-green",
                line: "from-gm-green/40",
                title: "group-hover:text-gm-green",
              };

          return (
            <div
              key={objective.number}
              className="group relative flex flex-col rounded-lg border border-[--gm-line] bg-white p-4 shadow-[0_3px_14px_rgba(32,27,27,0.035)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(32,27,27,0.08)] sm:p-5"
            >
              <span aria-hidden="true" className={`absolute inset-y-0 left-0 w-[3px] rounded-l-lg ${accent.stripe}`} />
              <div className="mb-3 flex items-center gap-3">
                <span className={`inline-flex h-8 min-w-8 items-center justify-center rounded-full px-2 font-mono text-[12px] font-semibold tracking-widest ${accent.badge}`}>
                  {objective.number}
                </span>
                <span className={`h-px flex-1 bg-gradient-to-r ${accent.line} to-transparent`} />
              </div>

              <h3 className={`mb-2 font-display text-[19px] font-semibold leading-snug text-gm-ink transition-colors sm:text-[21px] ${accent.title}`}>
                {objective.title}
              </h3>

              <p className="max-w-[520px] text-base leading-7 text-[--gm-text-soft]">
                {objective.description}
              </p>
            </div>
          );
        })}

        </div>

        {/* BOTTOM STATEMENT */}
        <div className="mt-8 border-l-2 border-gm-maroon bg-gray-50 px-5 py-4 sm:px-7">
          <p className="font-display text-[18px] font-medium leading-relaxed text-gm-ink sm:text-[20px]">
            Creating trusted connections, meaningful opportunities and
            sustainable growth — locally and globally.
          </p>
        </div>

      </div>
    </section>
  );
}