"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, registerGsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import RevealLines from "@/components/RevealLines";
import { CHAPTERS } from "@/lib/chapters";

const INTRO_LINES = [
  "Robotics R&D engineer.",
  "I build motion systems",
  "and the firmware that runs them.",
  "ROS 2, MoveIt, custom CAN-bus actuator SDKs,",
  "real-time stereo perception, mobile teleop.",
  "Currently shipping at RoboJoe Dynamics.",
];

const META_LINES = [
  "M.Eng Robotics, University of Maryland.",
  "Based in Miami, Florida.",
];

export default function Intro() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      registerGsap();
      if (prefersReducedMotion()) return;
      const root = sectionRef.current!;
      const portrait = root.querySelector("[data-portrait]") as HTMLElement | null;
      const portraitInner = root.querySelector("[data-portrait-inner]") as HTMLElement | null;
      const bg = root.querySelector("[data-intro-bg]") as HTMLElement | null;

      if (portraitInner) {
        gsap.fromTo(
          portraitInner,
          { scale: 1.08, clipPath: "inset(100% 0 0 0)" },
          {
            scale: 1.0,
            clipPath: "inset(0% 0 0 0)",
            duration: 1.2,
            ease: "power3.out",
            immediateRender: false,
            scrollTrigger: {
              trigger: root,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Subtle parallax on the portrait
      if (portrait) {
        gsap.to(portrait, {
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

      // Slow upward drift on the moon background — 12% of section height
      if (bg) {
        gsap.to(bg, {
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.4,
          },
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      id={CHAPTERS[1].id}
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative isolate w-full overflow-hidden bg-ink px-6 py-32 text-bone sm:px-10 lg:py-48"
      aria-label="Intro"
    >
      {/* Moon photograph as the section's hero backdrop. The image is
          positioned slightly oversized so the parallax tween has room
          to drift without revealing the section edge. */}
      <div
        data-intro-bg
        aria-hidden
        className="pointer-events-none absolute -inset-y-[8%] inset-x-0 -z-20"
      >
        <Image
          src="/intro-bg.jpg"
          alt=""
          fill
          priority={false}
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      {/* Vignette + bottom fade so text stays readable + the section
          glides into the next chapter without a hard seam. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(14,14,14,0.55) 0%, rgba(14,14,14,0.30) 30%, rgba(14,14,14,0.45) 70%, rgba(14,14,14,0.95) 100%)",
        }}
      />

      <div className="relative mx-auto max-w-[1400px]">
        <div className="mb-12 flex items-baseline gap-4 lg:mb-20">
          <span className="font-mono text-[11px] uppercase tracking-wider2 text-amber">
            01
          </span>
          <span className="h-px flex-1 max-w-[120px] bg-bone/20" />
          <span className="font-mono text-[11px] uppercase tracking-wider2 text-bone/55">
            Intro
          </span>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left: text — 7 cols */}
          <div className="order-2 lg:order-1 lg:col-span-7">
            <RevealLines
              as="p"
              lines={INTRO_LINES}
              className="font-display text-display-sm uppercase leading-[1.1] text-bone"
              lineClassName="block"
              stagger={0.05}
            />

            <RevealLines
              as="div"
              lines={META_LINES}
              className="mt-10 font-mono text-xs uppercase tracking-wider2 text-bone/65"
              lineClassName="block"
              stagger={0.04}
              start="top 85%"
            />
          </div>

          {/* Right: sticky portrait — 5 cols, sticky on lg+ */}
          <div className="order-1 lg:order-2 lg:col-span-5">
            <div
              data-portrait
              className="relative mx-auto w-full max-w-[380px] lg:sticky lg:top-[18vh]"
            >
              <div
                data-portrait-inner
                className="relative aspect-[3/4] w-full overflow-hidden bg-bone/5 ring-1 ring-bone/10"
              >
                <Image
                  src="/headshot.jpg"
                  alt="Nitish Ravisankar Raveendran"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 380px, 80vw"
                  priority={false}
                />
              </div>
              <div className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider2 text-bone/55">
                <span>Nitish Ravisankar Raveendran</span>
                <span className="text-amber">/2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
