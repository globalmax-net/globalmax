import React from "react";

export default function ContactCTA() {
  return (
    <section id="contact" className="bg-gm-maroon text-white py-12 sm:py-16">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 md:px-10 flex flex-col md:flex-row justify-between items-stretch md:items-center gap-6 md:gap-10">
        <h3 className="font-display text-[22px] sm:text-[24px] md:text-[30px] font-semibold max-w-[520px] tracking-tight">
          Planning to study abroad, travel, or grow your business? Let&apos;s talk.
        </h3>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full md:w-auto">
          <a
            href="#"
            className="font-mono text-[13px] uppercase tracking-wide px-6 py-3.5 inline-flex items-center justify-center gap-2 border border-white bg-white text-gm-maroon"
          >
            Contact us →
          </a>
          <a
            href="/services"
            className="font-mono text-[13px] uppercase tracking-wide px-6 py-3.5 inline-flex items-center justify-center gap-2 border border-white"
          >
            View services
          </a>
        </div>
      </div>
    </section>
  );
}
