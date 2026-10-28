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
    <section id="why-us" className="py-10 sm:py-14 lg:py-[4.5rem]">
      <div className="gm-container">
        <div className="max-w-[640px] mb-10 md:mb-14">
          <div className="mb-4 flex items-center gap-3 font-mono text-[12.5px] uppercase tracking-widest text-gm-green">
            <span className="h-[2px] w-8 bg-gm-green" />
            Why choose us
          </div>
          <h2 className="font-display text-[30px] sm:text-[36px] md:text-[42px] font-semibold tracking-tight leading-tight text-[--gm-ink]">
            Why choose
            <span className="block text-gm-maroon">Global Max?</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {REASONS.map((reason, i) => (
            <article key={reason.title} className={`pt-5 border-t-2 ${i % 2 === 0 ? "border-gm-maroon" : "border-gm-green"}`}>
              <h4 className="font-display text-[19px] font-semibold leading-snug mb-3">{reason.title}</h4>
              <p className="text-base leading-relaxed text-[--gm-text-soft]">{reason.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
