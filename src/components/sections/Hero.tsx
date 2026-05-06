"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, registerGsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { CHAPTERS } from "@/lib/chapters";

const NAME_LINE_1 = "NITISH";
const NAME_LINE_2 = "RAVISANKAR";
const NAME_LINE_3 = "RAVEENDRAN";

function splitChars(text: string) {
  return Array.from(text).map((ch, i) => (
    <span
      key={`${ch}-${i}`}
      data-char
      className="inline-block will-change-transform"
      aria-hidden
    >
      {ch === " " ? " " : ch}
    </span>
  ));
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      registerGsap();
      if (prefersReducedMotion()) return;

      const section = sectionRef.current!;
      const video = section.querySelector("[data-hero-video]") as HTMLElement | null;
      const overlay = section.querySelector("[data-hero-overlay]") as HTMLElement | null;
      const chars = section.querySelectorAll<HTMLElement>("[data-char]");
      const subline = section.querySelector("[data-hero-sub]") as HTMLElement | null;
      const cue = section.querySelector("[data-hero-cue]") as HTMLElement | null;
      const indicator = section.querySelector("[data-hero-indicator]") as HTMLElement | null;

      // Pre-state
      gsap.set(chars, { yPercent: 100, autoAlpha: 0 });
      gsap.set(subline, { yPercent: 100, autoAlpha: 0 });
      gsap.set(cue, { autoAlpha: 0, y: 20 });
      gsap.set(indicator, { autoAlpha: 0, x: -20 });

      // Entrance timeline (no scroll)
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .to(chars, {
          yPercent: 0,
          autoAlpha: 1,
          duration: 1.0,
          stagger: { each: 0.018, from: "start" },
        })
        .to(subline, { yPercent: 0, autoAlpha: 1, duration: 0.8 }, "-=0.55")
        .to(cue, { autoAlpha: 1, y: 0, duration: 0.6 }, "-=0.4")
        .to(indicator, { autoAlpha: 1, x: 0, duration: 0.6 }, "<");

      // Pinned hero unlock — 120vh of scroll
      const pinTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=120%",
          scrub: 1,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        },
      });

      pinTl
        .to(
          chars,
          {
            // Drift letters apart along alternating axes — they STAY VISIBLE
            // (per spec: "letters split and drift apart"). We do not fade
            // them out; that would also leave them invisible on scroll-back
            // if the pin/unpin state machine drops a frame.
            x: (i: number) => (i % 2 === 0 ? -40 - i * 4 : 40 + i * 4),
            y: (i: number) => (i % 3 === 0 ? -20 : 14),
            ease: "none",
          },
          0
        )
        .to(subline, { autoAlpha: 0, y: -30, ease: "none" }, 0)
        .to(cue, { autoAlpha: 0, y: 12, ease: "none" }, 0)
        .to(video, { filter: "saturate(0) brightness(0.45)", ease: "none" }, 0)
        .to(overlay, { opacity: 0.85, ease: "none" }, 0);

      // Belt-and-suspenders: when the user scrolls back above the hero
      // (section's top crosses the viewport top going up), force the
      // headline back to a clean visible state. Catches any edge case
      // where the scrub's reverse path loses the chars' visibility.
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        onLeaveBack: () => {
          gsap.to(chars, {
            x: 0,
            y: 0,
            autoAlpha: 1,
            yPercent: 0,
            duration: 0.5,
            ease: "power2.out",
            overwrite: "auto",
          });
        },
      });

      // Animated chapter indicator (rotating digits feel)
      const indicatorNum = section.querySelector("[data-hero-indicator-num]");
      if (indicatorNum) {
        gsap.fromTo(
          indicatorNum,
          { y: 0 },
          {
            y: -4,
            duration: 1.6,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
          }
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      id={CHAPTERS[0].id}
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative h-screen w-full overflow-hidden bg-ink text-bone"
      aria-label="Hero"
    >
      {/* Video / fallback gradient */}
      <div data-hero-video className="absolute inset-0 h-full w-full">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/hero-poster.jpg"
        >
          <source src="/hero.webm" type="video/webm" />
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        {/* Fallback layer rendered behind video; visible if video missing */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_#1a1a1a_0%,_#0E0E0E_60%)]" />
        {/* CRT scan stripe / texture */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-30"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 3px)",
          }}
        />
      </div>
      <div
        data-hero-overlay
        className="absolute inset-0 bg-gradient-to-b from-ink/30 via-ink/10 to-ink/70"
        style={{ opacity: 0.55 }}
      />

      {/* Centered headline */}
      <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col items-center justify-center px-6 text-center">
        <h1 className="font-display text-[3.5vw] lg:text-[4vw] uppercase leading-[0.85]">
          <span className="block overflow-hidden">{splitChars(NAME_LINE_1)}</span>
          <span className="block overflow-hidden">{splitChars(NAME_LINE_2)}</span>
          <span className="block overflow-hidden">{splitChars(NAME_LINE_3)}</span>
        </h1>
        <p
          data-hero-sub
          className="mt-6 font-mono text-xs uppercase tracking-wider2 text-bone/80 sm:text-sm"
        >
          Robotics R&amp;D <span className="text-amber">/</span> Software
        </p>
      </div>

      {/* Bottom-left chapter indicator */}
      <div
        data-hero-indicator
        className="absolute bottom-6 left-6 z-10 font-mono text-[11px] uppercase tracking-wider2 text-bone/70 sm:bottom-8 sm:left-8"
      >
        <div className="flex items-baseline gap-2">
          <span data-hero-indicator-num className="text-amber text-base font-display tracking-wider2">
            00
          </span>
          <span>/ Index</span>
        </div>
        <div className="mt-1 text-bone/50">{CHAPTERS.length} Chapters</div>
      </div>

      {/* Bottom-center scroll cue */}
      <div
        data-hero-cue
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 font-mono text-[10px] uppercase tracking-wider2 text-bone/70 sm:bottom-8"
      >
        <div className="flex flex-col items-center gap-2">
          <span>Scroll to explore</span>
          <svg
            width="14"
            height="34"
            viewBox="0 0 14 34"
            fill="none"
            aria-hidden
            className="animate-[heroArrow_1.8s_ease-in-out_infinite]"
          >
            <path d="M7 0V32" stroke="currentColor" strokeWidth="1" />
            <path
              d="M1 26L7 32L13 26"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="square"
            />
          </svg>
        </div>
      </div>

      <style jsx>{`
        @keyframes heroArrow {
          0%,
          100% {
            transform: translateY(0);
            opacity: 0.7;
          }
          50% {
            transform: translateY(8px);
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}
