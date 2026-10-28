import React from "react";
import Image from "next/image";

export default function Brand() {
  return (
    <section id="brand" className="bg-white py-6 sm:py-8 lg:py-10">
      <div className="gm-container">
        <div className="mx-auto max-w-[1060px] overflow-hidden rounded-xl border border-gm-paper-2 bg-white shadow-[0_16px_36px_rgba(32,27,27,0.2)] sm:rounded-2xl">
          <div className="aspect-[3.4/1]">
            <Image
              src="/208778.jpg"
              alt="We are your partner"
              width={1600}
              height={900}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 85vw, 1060px"
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}