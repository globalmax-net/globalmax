import React from "react";

export default function ContactCTA() {
  return (
    <section id="contact" className="bg-gm-maroon text-white py-12 sm:py-16">
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 md:px-10 text-center">
        <div>
          <h3 className="font-display text-[22px] sm:text-[24px] md:text-[30px] font-semibold tracking-tight">
            Planning to study abroad, travel, or grow your business? Let&apos;s talk.
          </h3>
        </div>

        <div className="mt-7 grid grid-cols-1 gap-4 border-t border-white/30 pt-6 text-sm leading-relaxed text-white/85 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-5">
          <div>
            <p className="font-mono text-xs uppercase tracking-wide text-white/65">Telephone</p>
            <div className="mt-1 flex flex-wrap justify-center gap-x-3 gap-y-1">
              <a href="tel:0117722992" className="hover:underline">011 77 22 992</a>
              <a href="tel:0247722992" className="hover:underline">024 77 22 992</a>
            </div>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-wide text-white/65">Mobile</p>
            <a href="tel:0777722992" className="mt-1 inline-block hover:underline">077 77 22 992</a>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-wide text-white/65">Email</p>
            <div className="mt-1 flex flex-col gap-1">
              <a href="mailto:globalmaxnet@gmail.com" className="break-words hover:underline">
                globalmaxnet@gmail.com
              </a>
              <a href="mailto:info@globalmax.lk" className="break-words hover:underline">
                info@globalmax.lk
              </a>
            </div>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-wide text-white/65">Address</p>
            <address className="mt-1 not-italic">No. 79, 2nd Floor, Kandasamy Kovil Road, Vavuniya</address>
          </div>
        </div>
      </div>
    </section>
  );
}
