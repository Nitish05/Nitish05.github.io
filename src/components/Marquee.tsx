"use client";

import { useRef } from "react";
import { gsap, registerGsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import clsx from "clsx";

type Props = {
  text: string;
  className?: string;
  /** Higher = slower. Default 30s for one full cycle. */
  duration?: number;
  /** Reverse direction (right to left is default). */
  reverse?: boolean;
};

/**
 * Seamless infinite marquee. Renders the text twice in a flex row
 * and tweens xPercent: -50 in a linear loop, so the seam is invisible.
 */
export default function Marquee({
  text,
  className,
  duration = 30,
  reverse = false,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      registerGsap();
      const root = ref.current;
      if (!root) return;
      const track = root.querySelector<HTMLElement>("[data-marquee-track]");
      if (!track) return;

      if (prefersReducedMotion()) return;

      gsap.to(track, {
        xPercent: reverse ? 50 : -50,
        duration,
        ease: "none",
        repeat: -1,
      });
    },
    { scope: ref, dependencies: [duration, reverse] }
  );

  return (
    <div
      ref={ref}
      className={clsx(
        "relative w-full overflow-hidden whitespace-nowrap",
        className
      )}
      aria-hidden
    >
      <div data-marquee-track className="flex w-max">
        <span className="px-6">{text}</span>
        <span className="px-6">{text}</span>
        <span className="px-6">{text}</span>
        <span className="px-6">{text}</span>
      </div>
    </div>
  );
}
