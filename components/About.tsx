import React from "react";


export default function About() {
  return (
    <section id="about" className="bg-gm-ink text-white py-10 sm:py-14 lg:py-[4.5rem]">
      <div className="gm-container grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
        <div className="max-w-[420px] mx-auto md:max-w-none w-full md:sticky md:top-24">
          <div className="aspect-square w-full border border-[--gm-line-inv] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/office.png"
              alt="Global Max Networks office"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>

        <div className="max-w-[560px]">
          <div className="font-mono text-[12.5px] uppercase tracking-widest mb-4 text-[--gm-text-soft-inv]">
            About us
          </div>

          <div className="space-y-5 text-base leading-relaxed text-[--gm-text-soft-inv] md:text-lg">
            <p>
              Global Max Networks (Private) Limited is a diversified Sri Lankan company
              established in 2022, committed to building a trusted, technology-driven
              service ecosystem that connects people with opportunities, services, and
              global possibilities.
            </p>
            <p>
              With expertise across Visa Consultancy, Student &amp; Education Guidance,
              Airline Ticketing, Digital Marketing, Media, Real Estate, and Digital
              Platform Development, we provide professional, reliable, and client-focused
              solutions. With strong operational roots in Northern and Eastern Sri Lanka,
              we combine local knowledge with a global outlook to serve our clients
              effectively.
            </p>
            <p>
              Our approach goes beyond simply providing services. We aim to build lasting
              relationships, create meaningful opportunities, and support our clients
              throughout different stages of their journey—from education and
              international travel to employment, career growth, and digital services.
            </p>
            <p>
              With 2,000+ successful visa services and a growing portfolio of digital
              platforms, Global Max is continuously expanding its services through
              innovation and technology.
            </p>
            <p>
              At Global Max, we are more than a service provider—we are your trusted
              partner.
            </p>
          </div>

          <div className="mt-8 border-t border-[--gm-line-inv] pt-5">
            <span className="font-display text-3xl font-semibold text-white">2,000+</span>
            <span className="ml-3 text-sm text-[--gm-text-soft-inv]">
              successful visa services
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
