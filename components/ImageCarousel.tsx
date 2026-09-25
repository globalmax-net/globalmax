"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Slide {
  src: string;
  title: string;
  subtitle: string;
  description: string;
  alt?: string;
}

interface ImageCarouselProps {
  slides: Slide[];
  intervalMs?: number;
}

export default function ImageCarousel({
  slides,
  intervalMs = 5000,
}: ImageCarouselProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [slides.length, intervalMs]);

  return (
    <section className="relative w-full overflow-hidden bg-black">
      <div className="relative h-[600px] sm:h-[680px] md:h-[760px] lg:h-[820px]">

        {/* SLIDES */}
        {slides.map((slide, index) => {
          const isActive = current === index;

          return (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-[1400ms] ease-out ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              {/* IMAGE */}
              <div
                className={`absolute inset-0 transition-transform duration-[7000ms] ease-out ${
                  isActive ? "scale-110" : "scale-100"
                }`}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt ?? slide.title}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover"
                />
              </div>

              {/* DARK OVERLAY */}
              <div className="absolute inset-0 bg-black/30" />

              {/* LEFT GRADIENT */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/10" />

              {/* BOTTOM GRADIENT */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />

              {/* CONTENT */}
              <div className="relative z-20 flex h-full items-center">
                <div className="container mx-auto px-6 sm:px-10 lg:px-20">

                  <div
                    className={`max-w-5xl transition-all duration-[1200ms] ease-out ${
                      isActive
                        ? "translate-y-0 opacity-100"
                        : "translate-y-16 opacity-0"
                    }`}
                  >

                    {/* CATEGORY */}
                    <div
                      className={`mb-6 flex items-center gap-4 transition-all duration-700 delay-100 ${
                        isActive
                          ? "translate-x-0 opacity-100"
                          : "-translate-x-8 opacity-0"
                      }`}
                    >
                      
                    </div>

                    {/* HUGE HERO TITLE */}
                    <h2
                      className={`font-display text-[48px] font-semibold leading-[0.98] tracking-[-0.03em] text-white transition-all duration-[1200ms] delay-200 sm:text-[62px] md:text-[78px] lg:text-[94px] xl:text-[105px] ${
                        isActive
                          ? "translate-y-0 opacity-100"
                          : "translate-y-12 opacity-0"
                      }`}
                    >
                      {slide.subtitle}
                    </h2>

                    {/* DESCRIPTION */}
                    <p
                      className={`mt-7 max-w-2xl text-base leading-relaxed text-white/75 transition-all duration-[1000ms] delay-500 sm:text-lg md:text-xl lg:text-2xl ${
                        isActive
                          ? "translate-y-0 opacity-100"
                          : "translate-y-8 opacity-0"
                      }`}
                    >
                      {slide.description}
                    </p>

                    {/* BUTTONS */}
                    <div
                      className={`mt-8 flex flex-wrap gap-4 transition-all duration-[1000ms] delay-700 sm:mt-10 ${
                        isActive
                          ? "translate-y-0 opacity-100"
                          : "translate-y-8 opacity-0"
                      }`}
                    >
                      <a
                        href="/services"
                        className="group inline-flex w-full items-center justify-center gap-3 border border-gm-maroon bg-gm-maroon px-6 py-3.5 font-mono text-[13px] uppercase tracking-wide text-white transition-all duration-300 hover:-translate-y-1 hover:bg-gm-maroon-dark hover:shadow-xl sm:w-auto"
                      >
                        Explore Our Services
                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                          →
                        </span>
                      </a>

                      <a
                        href="/about"
                        className="group inline-flex w-full items-center justify-center gap-3 border border-white/40 bg-white/5 px-6 py-3.5 font-mono text-[13px] uppercase tracking-wide text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white hover:bg-white hover:text-black sm:w-auto"
                      >
                        About Us
                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                          →
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        
        {/* NAVIGATION */}
        <div className="absolute bottom-10 left-6 z-30 flex items-center gap-2 sm:left-10 lg:left-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              aria-label={`Go to slide ${index + 1}`}
              className="group relative h-6"
            >
              <span
                className={`block h-[2px] transition-all duration-500 ${
                  current === index
                    ? "w-14 bg-white"
                    : "w-7 bg-white/30 group-hover:w-10 group-hover:bg-white/70"
                }`}
              />
            </button>
          ))}
        </div>

        {/* SIDE DECORATION */}
        <div className="absolute right-0 top-1/2 z-30 hidden -translate-y-1/2 md:block">
          <div className="flex -rotate-90 items-center gap-3 pr-8">
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/40">
              Global Max
            </span>

            <span className="h-px w-16 bg-white/30" />
          </div>
        </div>

        {/* TOP PROGRESS BAR */}
        <div className="absolute left-0 right-0 top-0 z-40 h-[2px] bg-white/10">
          <div
            key={current}
            className="h-full bg-white"
            style={{
              animation: `carouselProgress ${intervalMs}ms linear`,
            }}
          />
        </div>
      </div>

      {/* PROGRESS ANIMATION */}
      <style>{`
        @keyframes carouselProgress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}