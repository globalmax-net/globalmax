"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Slide {
  src: string;
  alt: string;
  title?: string;
  description?: string;
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

  const previousSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="bg-white py-10 md:py-14">
      <div className="max-w-[1180px] mx-auto px-6 md:px-10">

        {/* Carousel */}
        <div className="relative overflow-hidden rounded-2xl shadow-xl">

          {/* Slides */}
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${current * 100}%)`,
            }}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className="relative min-w-full h-[300px] sm:h-[380px] md:h-[480px]"
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  priority={index === 0}
                  className="object-cover"
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/30" />

                {/* Content */}
                {(slide.title || slide.description) && (
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
                    {slide.title && (
                      <h2 className="font-display text-2xl md:text-4xl font-semibold text-white">
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

          {/* Previous */}
          {slides.length > 1 && (
            <button
              onClick={previousSlide}
              aria-label="Previous slide"
              className="absolute left-4 top-1/2 -translate-y-1/2
                         w-10 h-10 md:w-12 md:h-12
                         rounded-full bg-white/90 text-gm-ink
                         flex items-center justify-center
                         shadow-lg transition hover:bg-white"
            >
              ←
            </button>
          )}

          {/* Next */}
          {slides.length > 1 && (
            <button
              onClick={nextSlide}
              aria-label="Next slide"
              className="absolute right-4 top-1/2 -translate-y-1/2
                         w-10 h-10 md:w-12 md:h-12
                         rounded-full bg-white/90 text-gm-ink
                         flex items-center justify-center
                         shadow-lg transition hover:bg-white"
            >
              →
            </button>
          )}

          {/* Dots */}
          {slides.length > 1 && (
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
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
