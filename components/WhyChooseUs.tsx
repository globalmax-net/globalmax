import React from "react";

interface Reason {
  title: string;
  detail: string;
}

const REASONS: Reason[] = [
  {
    title: "2000+ successful visa services",
    detail: "A proven track record across all major visa categories.",
  },
  {
    title: "End-to-end visa and travel assistance",
    detail: "From eligibility assessment to pre-departure guidance, in one place.",
  },
  {
    title: "Airline ticketing and travel coordination",
    detail: "Domestic and international itineraries, handled and rebooked when plans change.",
  },
  {
    title: "Digital marketing and promotional solutions",
    detail: "Social media, content, SEO, and advertising built for real results.",
  },
  {
    title: "Media and advertising through Vettri TV",
    detail: "Local and regional reach for news, sponsored content, and promotion.",
  },
  {
    title: "Strong presence across Northern and Eastern Sri Lanka",
    detail: "Local knowledge, paired with a client-first, partnership-oriented approach.",
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="pt-4 pb-10 sm:pt-6 sm:pb-12 md:pt-8 md:pb-20 ">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 md:px-10">
        <div className="max-w-[640px] mb-10 md:mb-14">
          <div className="font-mono text-[12.5px] uppercase tracking-widest mb-4 text-[--gm-text-soft]">
            Why choose us
          </div>
          <h2 className="font-display text-[26px] sm:text-[32px] md:text-[38px] font-semibold tracking-tight leading-tight">
            Why choose Global Max?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {REASONS.map((reason, i) => (
            <article key={reason.title} className={`pt-5 border-t-2 ${i % 2 === 0 ? "border-gm-maroon" : "border-gm-green"}`}>
              <h4 className="font-display text-[19px] font-semibold leading-snug mb-3">{reason.title}</h4>
              <p className="text-[14.5px] text-[--gm-text-soft]">{reason.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
