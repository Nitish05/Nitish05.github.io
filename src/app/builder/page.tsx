import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Builder — Nitish R. Raveendran",
  description:
    "Hardware tinkering, home lab, firmware experiments, and things made for the love of making them.",
};

export default function BuilderPage() {
  return (
    <main id="main-content" className="relative min-h-screen w-full bg-bone text-ink">
      <section className="px-6 pb-32 pt-32 sm:px-10 lg:px-16 lg:pt-44">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-12 flex items-baseline gap-4 lg:mb-20">
            <span className="font-mono text-[11px] uppercase tracking-wider2 text-amber">
              B/00
            </span>
            <span className="h-px flex-1 max-w-[120px] bg-ink/20" />
            <span className="font-mono text-[11px] uppercase tracking-wider2 text-ink/50">
              The Builder
            </span>
          </div>

          <h1 className="font-display text-display-lg uppercase leading-[0.9]">
            Off the clock.
          </h1>

          <p className="mt-8 max-w-xl font-sans text-lg leading-relaxed text-ink/70 sm:text-xl">
            This page is the slower, warmer counterpart to the engineer&rsquo;s
            side. Hardware tinkering, home lab notes, jail-broken firmware,
            things made for the love of making them. Coming soon.
          </p>

          <Link
            href="/"
            data-cursor="BACK"
            className="mt-16 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-wider2 text-ink/70 hover:text-amber"
          >
            <span aria-hidden>←</span>
            <span>Back to the engineer</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
