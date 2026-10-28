import React from "react";
import Link from "next/link";

export default function DirectorMessage({ preview = false }: { preview?: boolean }) {
  return (
    <section id="director" className="bg-gm-paper-2 py-8 sm:py-10 lg:py-14">
      <div className="gm-container">
        <div className="mb-8 flex items-center gap-3 font-mono text-[12.5px] uppercase tracking-[0.22em] text-gm-maroon">
          <span className="h-[2px] w-8 bg-gm-maroon" />
          Director&apos;s message
        </div>

        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-[200px_minmax(0,1fr)] md:gap-10 xl:grid-cols-[240px_minmax(0,1fr)] xl:gap-14">
          <div className="flex items-center gap-4 text-left md:flex-col md:items-start md:gap-0">
            <div className="h-[88px] w-[88px] shrink-0 overflow-hidden rounded-full border-2 border-white/60 bg-white shadow-md md:h-[128px] md:w-[128px]">
              <img
                src="/profile.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0 md:mt-5">
              <div className="font-display text-xl font-semibold md:text-2xl">S. Surenthiran</div>
              <div className="mt-1 font-mono text-[11px] uppercase tracking-wide text-[--gm-text-soft] md:text-[12px]">
                Director, Owner &amp; Founder
              </div>
            </div>
          </div>

          <div className="max-w-[900px]">
            <blockquote className="mb-6 border-l-2 border-gm-green pl-5 font-body text-xl font-semibold leading-[1.4] tracking-tight text-[--gm-ink] sm:text-2xl md:mb-8 md:pl-6 md:text-[28px] 2xl:text-[32px]">
              &ldquo;Business is not merely about providing a service — it is about creating
              <span className="text-gm-green"> opportunities, building trust</span>, and becoming a reliable partner in people&apos;s
              journeys.&rdquo;
            </blockquote>

            <div className="max-w-[900px] space-y-5 text-base leading-relaxed text-[--gm-text-soft] 2xl:text-lg">
              <p>
                Since our establishment in 2022, our Visa Consultancy and Education Guidance
                services have supported successful visa cases, while our Airline
                Ticketing, Digital Marketing, Media, Real Estate, and other professional services
                continue to expand our ability to serve individuals and businesses.
              </p>
              {preview ? (
                <p>
                  Our ambition goes beyond...{" "}
                  <Link
                    href="/director-message"
                    className="inline-flex items-center gap-1 font-semibold text-gm-maroon underline decoration-gm-maroon/40 underline-offset-4 transition-colors hover:text-gm-green hover:decoration-gm-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gm-green focus-visible:ring-offset-2"
                  >
                    See more
                    <span aria-hidden="true">→</span>
                  </Link>
                </p>
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
