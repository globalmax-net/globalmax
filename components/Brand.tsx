import React from "react";
import Image from "next/image";

export default function Brand() {
  return (
    <section id="brand" className="bg-white py-2">
      <div className="gm-container flex justify-center">
        <div className="w-full max-w-[920px] rounded-xl border border-gm-maroon/20 bg-white p-1 shadow-[0_8px_24px_rgba(32,27,27,0.10)]">
          <Image
            src="/brand-partner-transparent.png"
            alt="We are your partner"
            width={1606}
            height={544}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 85vw, 900px"
            className="block h-auto w-full max-w-[900px] rounded-lg"
          />
        </div>
      </div>
    </section>
  );
}