import React from "react";

export default function ContactCTA() {
  return (
    <section id="contact" className="bg-gm-green text-black py-10 sm:py-10 font-semibold  text-size-20">
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 md:px-10 text-center">
        <div>
          <h3 className="font-display text-[22px] sm:text-[24px] md:text-[30px] font-semibold tracking-tight">
            Planning to study abroad, travel, or grow your business? Let&apos;s talk.
          </h3>
        </div>

        <div className="mt-7 grid grid-cols-1 gap-4 border-t border-black pt-6 text-sm leading-relaxed text-bla/85 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-5">
          <div>
            <span className="mb-2 block text-3xl leading-none drop-shadow-sm sm:text-3xl" role="img" aria-label="Telephone">📞</span>
            <div className="mt-1 flex flex-wrap justify-center gap-x-3 gap-y-1">
              <a href="tel:0117722992" className="hover:underline text-[18px] sm:text-[18px] md:text-[18px] font-semibold tracking-tight">011 77 22 992</a>
              <a href="tel:0247722992" className="hover:underline text-[18px] sm:text-[18px] md:text-[18px] font-semibold tracking-tight">024 77 22 992</a>
            </div>
          </div>
          <div>
            <span className="mb-2 block text-3xl leading-none drop-shadow-sm sm:text-3xl" role="img" aria-label="Mobile">📱</span>
            <a href="tel:0777722992" className="mt-1 inline-block hover:underline text-[18px] sm:text-[18px] md:text-[18px] font-semibold tracking-tight">077 77 22 992</a>
          </div>
          <div>
            <span className="mb-2 block text-3xl leading-none drop-shadow-sm sm:text-3xl" role="img" aria-label="Email">✉️</span>
            <div className="mt-1 flex flex-col gap-1">
              <a href="mailto:globalmaxnet@gmail.com" className="break-words hover:underline text-[18px] sm:text-[18px] md:text-[18px] font-semibold tracking-tight">
                globalmaxnet@gmail.com
              </a>
              <a href="mailto:info@globalmax.lk" className="break-words hover:underline text-[18px] sm:text-[18px] md:text-[18px] font-semibold tracking-tight">
                info@globalmax.lk
              </a>
            </div>
          </div>
          <div>
            <span className="mb-2 block text-3xl leading-none drop-shadow-sm sm:text-3xl" role="img" aria-label="Address">📍</span>
            <address className="mt-1 not-italic text-[18px] sm:text-[18px] md:text-[18px] font-semibold tracking-tight">No. 79, 2nd Floor, Kandasamy Kovil Road, Vavuniya</address>
          </div>
        </div>
      </div>
    </section>
  );
}
