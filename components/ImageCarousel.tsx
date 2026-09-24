"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Slide {
  src: string;
  alt: string;
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
    <section className="w-full bg-white">
      <div className="relative overflow-hidden bg-white shadow-sm">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="min-w-full w-full">
              <div className="relative w-full h-[260px] sm:h-[320px] md:h-[420px] lg:h-[700px] bg-white">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  priority={index === 0}
                  sizes="90vw"
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>

        {slides.length > 1 && (
          <div className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  current === index ? "w-8 bg-[#1a1a1a]" : "w-2 bg-[#1a1a1a]/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}