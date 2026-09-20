import React from "react";

const OBJECTIVES = [
  "Customer-Centric Service – Deliver personalized, professional and high-quality services based on the needs and goals of our clients.",
  "Visa & Migration Excellence – Continue to develop as a trusted professional service provider in visa consultancy and migration-related services.",
  "Education & International Opportunities – Guide students and young people towards international education, employment and career opportunities.",
  "Travel & Airline Services – Provide integrated Visa, Ticketing and Travel Support from the application stage through to international travel.",
  "Digital Transformation – Simplify essential services through technology and develop innovative digital platforms that improve accessibility and convenience.",
  "Employment & Career Ecosystem – Connect employers and job seekers through digital employment platforms such as Job Martz.",
  "Media & Digital Communication – Strengthen news, advertising and promotional services through Vettri TV and digital media channels.",
  "Business Diversification – Expand into Travel, Technology, Media, Real Estate, Digital Services and other related business sectors.",
  "Regional & Global Expansion – Strengthen our presence in Northern and Eastern Sri Lanka while expanding our services across Sri Lanka and international markets.",
  "Long-Term Partnerships – Build trusted, sustainable relationships with clients, educational institutions, recruitment agencies, corporate organizations, investors and strategic partners.",
];

export default function VisionMission() {
  return (
      <section id="vision-mission" className=" bg-slate-200 text-black py-16 sm:py-20 md:py-28">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 md:px-10">
        <div className="mb-12 text-center md:text-left">
          <h2 className="font-display text-[24px] sm:text-[30px] md:text-[42px] font-semibold tracking-tight leading-tight text-[--gm-ink]">
            GLOBAL MAX
            <span className="block">NETWORKS (PRIVATE) LIMITED</span>
          </h2>

          <div className="mt-6 font-mono text-[12.5px] uppercase tracking-[0.22em] text-[--gm-text-soft]">
            MISSION • VISION • OBJECTIVES
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

          <div className="border-l-2 border-gm-green pl-5 md:pl-6">
            <h3 className="font-display text-[22px] md:text-[28px] font-semibold text-[--gm-ink]">
              Our Objectives
            </h3>

            <ol className="mt-5 list-decimal pl-5 sm:pl-6 space-y-3 text-[15px] md:text-[17px] leading-7 md:leading-8 text-[--gm-text-soft]  text-black">
              {OBJECTIVES.map((objective) => (
                <li key={objective}>{objective}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
