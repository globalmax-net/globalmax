import React from "react";

export default function ContactCTA() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-gm-green py-10 text-black sm:py-14"
    >
      {/* Decorative background */}
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-black/5" />
      <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-black/5" />

      <div className="gm-container relative px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-4 inline-flex items-center rounded-full border border-black/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em]">
            Get in touch
          </span>

          <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl 2xl:text-6xl">
            Planning to study abroad, travel, or grow your business?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-black/70 sm:text-base 2xl:text-lg">
            Let&apos;s talk and find the right solution for you.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="mx-auto mt-8 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:max-w-[1400px] 2xl:max-w-[1520px]">
          {/* Telephone */}
          <div className="group rounded-2xl border border-black/10 bg-white/15 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/25">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black text-xl text-white shadow-sm">
              ☎
            </div>

            <h3 className="mt-5 text-sm font-bold uppercase tracking-wider">
              Telephone
            </h3>

            <div className="mt-3 space-y-2">
              <a
                href="tel:0117722992"
                className="block text-[17px] font-semibold transition-opacity hover:opacity-60"
              >
                011 77 22 992
              </a>

              <a
                href="tel:0247722992"
                className="block text-[17px] font-semibold transition-opacity hover:opacity-60"
              >
                024 77 22 992
              </a>
            </div>
          </div>

          {/* Mobile */}
          <div className="group rounded-2xl border border-black/10 bg-white/15 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/25">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black text-xl text-white shadow-sm">
              📱
            </div>

            <h3 className="mt-5 text-sm font-bold uppercase tracking-wider">
              Mobile
            </h3>

            <a
              href="tel:0777722992"
              className="mt-3 block text-[17px] font-semibold transition-opacity hover:opacity-60"
            >
              077 77 22 992
            </a>
          </div>

          {/* Email */}
          <div className="group rounded-2xl border border-black/10 bg-white/15 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/25">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black text-xl text-white shadow-sm">
              ✉
            </div>

            <h3 className="mt-5 text-sm font-bold uppercase tracking-wider">
              Email
            </h3>

            <div className="mt-3 space-y-2">
              <a
                href="mailto:globalmaxnet@gmail.com"
                className="block break-words text-[15px] font-semibold transition-opacity hover:opacity-60"
              >
                globalmaxnet@gmail.com
              </a>

              <a
                href="mailto:info@globalmax.lk"
                className="block break-words text-[15px] font-semibold transition-opacity hover:opacity-60"
              >
                info@globalmax.lk
              </a>
            </div>
          </div>

          {/* Address */}
          <div className="group rounded-2xl border border-black/10 bg-white/15 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/25">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black text-xl text-white shadow-sm">
              📍
            </div>

            <h3 className="mt-5 text-sm font-bold uppercase tracking-wider">
              Visit Us
            </h3>

            <address className="mt-3 not-italic text-[15px] font-semibold leading-6">
              No. 79, 2nd Floor, Kandasamy Kovil Road, Vavuniya
            </address>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mx-auto mt-10 flex max-w-5xl flex-col items-center justify-between gap-4 border-t border-black/15 pt-8 sm:flex-row xl:max-w-[1400px] 2xl:max-w-[1520px]">
          <p className="text-sm font-medium text-black/70">
            We&apos;re here to help. Get in touch with us today.
          </p>

          <a
            href="tel:0777722992"
            className="inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-black/80"
          >
            Call Us Now
            <span className="ml-2">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
