export default function About() {
  return (
    <section id="about" className="relative overflow-hidden border-y border-gm-paper-2 bg-white py-12 text-gm-ink sm:py-16 lg:py-20">
      <div className="gm-container">
        <div className="mb-8 grid gap-3 md:mb-10 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:items-end md:gap-10">
          <div className="flex items-center gap-3 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-gm-green-dark">
            <span className="h-px w-8 bg-gm-green" />
            About us
          </div>
          <h2 className="max-w-3xl font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            A trusted partner for your next opportunity
          </h2>
        </div>

        <div className="grid items-start gap-8 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-10 lg:gap-16">
          <div className="relative mx-auto w-full max-w-[560px] overflow-hidden rounded-2xl border border-gm-paper-2 bg-gm-paper-2 shadow-lg shadow-gm-ink/5 md:mx-0 md:max-w-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/office.png"
              alt="Global Max Networks office"
              className="aspect-[16/10] h-full w-full object-cover object-center md:aspect-[4/5]"
            />
            <div className="absolute bottom-4 left-4 rounded-xl border border-white/80 bg-white/95 px-4 py-3 shadow-lg shadow-gm-ink/10 backdrop-blur-sm sm:bottom-5 sm:left-5">
              <p className="font-display text-xl font-semibold text-gm-ink">Since 2022</p>
              <p className="mt-0.5 text-xs text-gm-ink/60">Built on trust and local knowledge</p>
            </div>
          </div>

          <div className="flex h-full flex-col justify-center">
            <p className="max-w-3xl text-lg font-medium leading-relaxed text-gm-ink sm:text-xl">
              Global Max Networks (Private) Limited is a diversified Sri Lankan company
              established in 2022, committed to building a trusted, technology-driven
              service ecosystem that connects people with opportunities, services, and
              global possibilities.
            </p>
            <div className="mt-6 grid gap-4 border-t border-gm-paper-2 pt-6 text-sm leading-relaxed text-gm-ink/70 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-5 sm:text-base">
              <p>
                Across visa consultancy, education guidance, airline ticketing, digital
                marketing, media, real estate, and digital platforms, we offer practical,
                client-focused support.
              </p>
              <p>
                With strong roots in Northern and Eastern Sri Lanka, we combine local
                knowledge with a global outlook and build lasting relationships through
                reliable service.
              </p>
              <p className="sm:col-span-2">
                We continue to grow through innovation, creating opportunities in
                education, travel, employment, career development, and digital services.
              </p>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-1 rounded-xl border border-gm-green/15 border-l-4 border-l-gm-green bg-gm-paper-2/70 px-5 py-4">
              <span className="font-display text-3xl font-semibold text-gm-green-dark sm:text-4xl">2,000+</span>
              <span className="max-w-[180px] text-sm leading-snug text-gm-ink/65">
                successful visa services delivered
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
