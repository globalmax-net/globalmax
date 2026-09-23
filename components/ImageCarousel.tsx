"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HeroContent } from "./Hero";

interface Slide {
  src: string;
  alt: string;
  title?: string;
  description?: string;
}

interface ImageCarouselProps {
  slides: Slide[];
  intervalMs?: number;
  showHeroContent?: boolean;
}

export default function ImageCarousel({
  slides,
  intervalMs = 5000,
  showHeroContent = false,
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
    <section className="bg-white">
      <div>

        {/* Carousel */}
        <div className="relative overflow-hidden bg-gm-ink shadow-xl">
          

          {/* Slides */}
          <div
            className="absolute inset-0 flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${current * 100}%)`,
            }}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className="relative min-w-full"
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover opacity-50"
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/30" />

                {/* Content */}
                {(slide.title || slide.description) && (
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 md:p-10 pb-12 sm:pb-6 md:pb-10">
                    {slide.title && (
                      <h2 className="font-display text-xl sm:text-2xl md:text-4xl font-semibold text-white">
                        {slide.title}
                      </h2>
                    )}

                    {slide.description && (
                      <p className="mt-2 max-w-xl text-sm md:text-base text-white/90">
                        {slide.description}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {showHeroContent && (
            <div className="relative z-10 text-white">
              <HeroContent />
            </div>
          )}

          {/* Dots */}
          {slides.length > 1 && (
            <div className="absolute bottom-20 left-1/2 z-20 -translate-x-1/2 flex gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    current === index
                      ? "w-8 bg-white"
                      : "w-2 bg-white/60"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
