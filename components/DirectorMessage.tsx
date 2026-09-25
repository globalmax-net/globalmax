import React from "react";

export default function DirectorMessage() {
  return (
    <section id="director" className="bg-gm-paper-2 py-16 sm:py-24 md:py-32">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 md:px-10">
        <div className="mt-6 mb-8 flex items-center gap-3 font-mono text-[12.5px] uppercase tracking-[0.22em] text-gm-maroon">
          <span className="h-[2px] w-8 bg-gm-maroon" />
          Director&apos;s message
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-10 md:gap-12 items-start">
          <div className="flex flex-col sm:flex-row md:flex-col items-center md:items-start gap-4 md:gap-0 text-center sm:text-left">
            <div className="w-[110px] h-[110px] md:w-[150px] md:h-[150px] rounded-full overflow-hidden border-2 border-white/60 shadow-md shrink-0 bg-white">
              <img
                src="/profile.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:mt-5 text-center md:text-left">
              <div className="font-display text-2xl font-semibold">S. Surenthiran</div>
              <div className="font-mono text-[12px] uppercase tracking-wide text-[--gm-text-soft] mt-1">
                Founder, Owner &amp; Director
              </div>
            </div>
          </div>

          <div>
            <p className="font-display text-xl sm:text-2xl md:text-[28px] leading-snug font-semibold tracking-tight mb-6 md:mb-8 text-[--gm-ink]">
              &ldquo;Business is not merely about providing a service — it is about creating
              <span className="text-gm-green"> opportunities, building trust</span>, and becoming a reliable partner in people&apos;s
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
