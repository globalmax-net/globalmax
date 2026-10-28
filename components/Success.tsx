import React from "react";

export interface SuccessStat {
  value: string;
  label: string;
}

export const DEFAULT_SUCCESS_STATS: SuccessStat[] = [
  { value: "2022", label: "Established" },
  { value: "2000+", label: "Visa services delivered" },
  { value: "6", label: "Core service lines" },
  { value: "2", label: "Platforms in development" },
];

export function SuccessBanner({
  title = "Success",
  message,
}: {
  title?: string;
  message?: string;
}) {
  return (
    <div className="mb-6 rounded-2xl border border-gm-green/20 bg-green-50 p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-gm-green text-xs font-bold text-white">
          ✓
        </div>
        <div>
          <p className="text-sm font-semibold text-gm-green-dark">{title}</p>
          {message ? <p className="mt-1 text-sm text-gm-green">{message}</p> : null}
        </div>
      </div>
    </div>
  );
}

export default function Success({
  stats = DEFAULT_SUCCESS_STATS,
}: {
  stats?: SuccessStat[];
}) {
  return (
    <section aria-label="Global Max achievements" className="shrink-0 bg-gm-maroon py-6 shadow-md sm:py-8">
      <div className="gm-container">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-y-7 md:grid-cols-4 md:gap-y-0">
          {stats.map((s, index) => (
            <div
              key={`${s.label}-${s.value}`}
              className={`flex flex-col items-center justify-center px-3 text-center sm:px-5 md:px-6 ${
                index % 4 !== 0 ? "md:border-l md:border-white/20" : ""
              }`}
            >
              <b className="font-display block text-[36px] font-semibold tracking-tight text-white sm:text-[42px] md:text-[48px] xl:text-[54px]">
                {s.value}
              </b>
              <span className="mt-1 font-body text-sm font-medium leading-snug tracking-wide text-white/85 sm:text-base">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
