import React from "react";

const FACTS = [
  { label: "Established", value: "2022" },
  { label: "Visa services delivered", value: "2000+" },
  { label: "Core service lines", value: "6" },
];

export default function About() {
  return (
    <section id="about" className="bg-gm-ink text-white py-16 sm:py-20 md:py-28">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div className="aspect-square max-w-[420px] mx-auto md:max-w-none w-full border border-[--gm-line-inv] flex items-center justify-center p-6 sm:p-10">
          <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
            <circle cx="100" cy="100" r="70" stroke="#FFFFFF" strokeOpacity="0.2" />
            <path d="M30 100a70 70 0 0 1 122-46" stroke="#8B2332" strokeWidth="4" strokeLinecap="round" />
            <path d="M170 100a70 70 0 0 1-122 46" stroke="#2E6E45" strokeWidth="4" strokeLinecap="round" />
            <circle cx="100" cy="95" r="16" fill="#8B2332" />
            <circle cx="100" cy="95" r="6" fill="#FFFFFF" />
            <ellipse cx="100" cy="140" rx="34" ry="9" fill="#2E6E45" />
          </svg>
        </div>

        <div>
          <div className="font-mono text-[12.5px] uppercase tracking-widest mb-4 text-[--gm-text-soft-inv]">
            About us
          </div>
          <h2 className="font-display text-[26px] sm:text-[32px] md:text-[38px] font-semibold tracking-tight leading-tight">
            A diversified Sri Lankan company with a global outlook.
          </h2>
          <p className="mt-5 text-base text-[--gm-text-soft-inv]">
            Global Max Networks (Private) Limited is a diversified Sri Lankan company established
            in 2022, with a vision to build a trusted and technology-driven service ecosystem that
            connects people with opportunities, services, and global possibilities. With strong
            operational roots in the Northern and Eastern regions of Sri Lanka, we combine local
            knowledge with a global outlook to deliver professional, reliable, and client-focused
            solutions.
          </p>

          

          <ul className="mt-9 flex flex-col">
            {FACTS.map((fact, i) => (
              <li
                key={fact.label}
                className={`flex justify-between py-4 text-[14.5px] ${i > 0 ? "border-t border-[--gm-line-inv]" : ""}`}
              >
                <span>{fact.label}</span>
                <b className="font-mono font-medium">{fact.value}</b>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
