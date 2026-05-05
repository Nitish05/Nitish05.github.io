"use client";

import { useRef } from "react";
import { gsap, registerGsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { CHAPTERS } from "@/lib/chapters";

// Each line of the quote is its own element so it can reveal independently.
const QUOTE_LINES = [
  "The robot",
  "is the easy part.",
  "The world it",
  "lives in",
  "is the hard part.",
];

export default function PullQuote() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      registerGsap();
      const root = sectionRef.current!;
      const lines = root.querySelectorAll<HTMLElement>("[data-quote-line]");
      const meta = root.querySelectorAll<HTMLElement>("[data-quote-meta]");
      const glow = root.querySelector("[data-quote-glow]") as HTMLElement | null;

      if (prefersReducedMotion()) return;

      // Use fromTo with immediateRender:false so the hidden state only
      // locks in *when the ScrollTrigger fires*. If the trigger never
      // fires (e.g. user lands inside the section), the natural HTML
      // state shows — text never disappears silently.
      gsap.fromTo(
        lines,
        { yPercent: 100, clipPath: "inset(0 0 100% 0)" },
        {
          yPercent: 0,
          clipPath: "inset(0 0 0% 0)",
          duration: 1.1,
          ease: "power3.out",
          stagger: 0.08,
          immediateRender: false,
          scrollTrigger: {
            trigger: root,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        meta,
        { autoAlpha: 0, y: 12 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.05,
          immediateRender: false,
          scrollTrigger: {
            trigger: root,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Slow background glow drift on scroll
      if (glow) {
        gsap.to(glow, {
          xPercent: 18,
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      id={CHAPTERS[4].id}
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative isolate w-full overflow-hidden bg-ink py-40 text-bone sm:py-56 lg:py-72"
      aria-label="Pull quote"
    >
      {/* Off-center amber glow */}
      <div
        data-quote-glow
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 28% 35%, rgba(255,182,39,0.18), rgba(14,14,14,0) 55%)",
        }}
      />
      {/* CRT scan stripe to keep the texture continuous with the hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 mix-blend-overlay opacity-25"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 3px)",
        }}
      />

      <div className="mx-auto max-w-[1500px] px-6 sm:px-10 lg:px-16">
        <div
          data-quote-meta
          className="mb-12 flex items-baseline gap-4 lg:mb-16"
        >
          <span className="font-mono text-[11px] uppercase tracking-wider2 text-amber">
            04
          </span>
          <span className="h-px flex-1 max-w-[120px] bg-bone/20" />
          <span className="font-mono text-[11px] uppercase tracking-wider2 text-bone/50">
            Manifesto
          </span>
        </div>

        {/* Open quote glyph */}
        <span
          aria-hidden
          data-quote-meta
          className="block font-display text-[clamp(4rem,9vw,8rem)] leading-none text-amber"
        >
          &ldquo;
        </span>

        <blockquote className="mt-6 max-w-[1300px] font-display text-[clamp(2.5rem,8vw,8rem)] uppercase leading-[0.92]">
          {QUOTE_LINES.map((line, i) => (
            <span
              key={i}
              className="block overflow-hidden"
            >
              <span data-quote-line className="inline-block will-change-transform">
                {line}
              </span>
            </span>
          ))}
        </blockquote>

        <div
          data-quote-meta
          className="mt-12 flex items-center gap-4 font-mono text-[11px] uppercase tracking-wider2 text-bone/55 lg:mt-16"
        >
          <span className="h-px w-10 bg-bone/30" />
          <span>Field note</span>
          <span className="text-bone/30">·</span>
          <span>RoboJoe Dynamics, 2026</span>
        </div>
      </div>
    </section>
  );
}
