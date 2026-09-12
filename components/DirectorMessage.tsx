import React from "react";

export default function DirectorMessage() {
  return (
    <section id="director" className="bg-gm-paper-2 py-28">
      <div className="max-w-[1180px] mx-auto px-6 md:px-10">
        <div className="font-mono text-[12.5px] uppercase tracking-widest mb-4 text-[--gm-text-soft]">
          Director&apos;s message
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-12">
          <div className="flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-0">
            <div className="w-25 h-25 md:w-25 md:h-25 rounded-full overflow-hidden shrink-0">
  <img
    src="/profile.jpg"
    alt="Profile"
    className="w-full h-full object-cover"
  />
</div>
            <div className="md:mt-5">
              <div className="font-display text-2xl font-semibold">S. Surenthiran</div>
              <div className="font-mono text-[12px] uppercase tracking-wide text-[--gm-text-soft] mt-1">
                Founder, Owner &amp; Director
              </div>
            </div>
          </div>

          <div>
            <p className="font-display text-2xl md:text-[28px] leading-snug font-semibold tracking-tight mb-8">
              &ldquo;Business is not merely about providing a service — it is about creating
              opportunities, building trust, and becoming a reliable partner in people&apos;s
              journeys.&rdquo;
            </p>

            <div className="space-y-5 text-[15.5px] leading-relaxed text-[--gm-text-soft] max-w-[680px]">
              <p>
                Since our establishment in 2022, our Visa Consultancy and Education Guidance
                services have supported more than 2000+ successful visa cases, while our Airline
                Ticketing, Digital Marketing, Media, Real Estate, and other professional services
                continue to expand our ability to serve individuals and businesses.
              </p>
              <p>
                Our ambition goes beyond traditional service delivery. Through initiatives such as
                Job Portal and Matrimonial, together with our media platform Vettri TV, we are
                building a technology-driven ecosystem that brings together opportunities,
                services, and communities — without losing sight of the values that matter most:
                integrity, transparency, quality, care, and long-term partnerships.
              </p>
              <p>
                As we grow across Sri Lanka and expand our digital presence, we welcome
                opportunities to work with educational institutions, recruitment agencies,
                corporate organisations, media partners, investors, and other strategic partners.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
