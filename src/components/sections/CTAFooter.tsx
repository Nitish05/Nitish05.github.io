"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, registerGsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { CHAPTERS } from "@/lib/chapters";
import SeparatorGlyph from "@/components/SeparatorGlyph";

export default function CTAFooter() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      registerGsap();
      if (prefersReducedMotion()) return;
      const root = sectionRef.current!;

      const meta = root.querySelectorAll<HTMLElement>("[data-cta-meta]");
      const cta = root.querySelector("[data-cta-button]") as HTMLElement | null;

      gsap.fromTo(
        meta,
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.06,
          immediateRender: false,
          scrollTrigger: {
            trigger: root,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      if (cta) {
        gsap.fromTo(
          cta,
          { autoAlpha: 0, scale: 0.92 },
          {
            autoAlpha: 1,
            scale: 1,
            duration: 1.0,
            ease: "power3.out",
            immediateRender: false,
            scrollTrigger: {
              trigger: root,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      id={CHAPTERS[6].id}
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative isolate flex w-full flex-col items-center justify-center overflow-hidden bg-ink px-6 py-40 text-bone sm:px-10 lg:py-56"
      aria-label="Know the builder"
    >
      {/* Subtle CRT texture so the section reads as part of the dark family */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 mix-blend-overlay opacity-25"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 3px)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 50% 65%, rgba(127,231,220,0.08), rgba(14,14,14,0) 60%)",
        }}
      />

      <div className="mx-auto max-w-[1500px] text-center">
        <div
          data-cta-meta
          className="mb-12 flex items-center justify-center gap-4 lg:mb-16"
        >
          <span className="font-mono text-[11px] uppercase tracking-wider2 text-amber">
            06
          </span>
          <span className="h-px w-16 bg-bone/20" />
          <span className="font-mono text-[11px] uppercase tracking-wider2 text-bone/50">
            The other side
          </span>
          <span className="h-px w-16 bg-bone/20" />
        </div>

        <p
          data-cta-meta
          className="mb-10 font-mono text-xs uppercase tracking-wider2 text-bone/55"
        >
          You&rsquo;ve seen the engineer.
        </p>

        {/* Big CTA — logo · text · logo pattern, magnetic on hover */}
        <Link
          href="/builder"
          data-cursor="ENTER"
          data-cta-button
          className="group inline-flex flex-col items-center gap-6"
        >
          <span className="flex items-center gap-6 sm:gap-10">
            <SeparatorGlyph className="h-6 w-12 text-cyan transition-transform duration-700 ease-out2 group-hover:rotate-180 sm:h-8 sm:w-16" />
            <span className="font-display text-display-md uppercase leading-none transition-colors duration-500 ease-out2 group-hover:text-amber">
              Know the builder
            </span>
            <SeparatorGlyph className="h-6 w-12 -scale-x-100 text-cyan transition-transform duration-700 ease-out2 group-hover:-rotate-180 sm:h-8 sm:w-16" />
          </span>
          <span className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-wider2 text-bone/55 transition-colors duration-500 ease-out2 group-hover:text-amber">
            <span>Continue</span>
            <span aria-hidden className="transition-transform duration-500 ease-out2 group-hover:translate-x-2">
              →
            </span>
            <span>/builder</span>
          </span>
        </Link>

        <p
          data-cta-meta
          className="mt-12 max-w-xl mx-auto font-sans text-sm leading-relaxed text-bone/55 lg:mt-16"
        >
          Slower. Warmer. Hands-on. Hardware tinkering, home-lab builds, jail-broken
          firmware, things made for the love of making them.
        </p>
      </div>
    </section>
  );
}
