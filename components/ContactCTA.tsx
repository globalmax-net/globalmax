import React from "react";

export default function ContactCTA() {
  return (
    <section id="contact" className="bg-gm-maroon text-white py-16">
      <div className="max-w-[1180px] mx-auto px-6 md:px-10 flex justify-between items-center gap-10 flex-wrap">
        <h3 className="font-display text-[24px] md:text-[30px] font-semibold max-w-[520px] tracking-tight">
          Planning to study abroad, travel, or grow your business? Let&apos;s talk.
        </h3>
        <div className="flex gap-4">
          <a
            href="#"
            className="font-mono text-[13px] uppercase tracking-wide px-6 py-3.5 inline-flex items-center gap-2 border border-white bg-white text-gm-maroon"
          >
            Contact us →
          </a>
          <a
            href="#services"
            className="font-mono text-[13px] uppercase tracking-wide px-6 py-3.5 inline-flex items-center gap-2 border border-white"
          >
            View services
          </a>
        </div>
      </div>
    </section>
  );
}
