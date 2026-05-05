"use client";

import { useRef } from "react";
import { gsap, registerGsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import clsx from "clsx";

type Props = {
  lines: string[];
  className?: string;
  lineClassName?: string;
  /** Delay between line reveals in seconds. Default 0.04 (40ms per spec). */
  stagger?: number;
  /** ScrollTrigger start position. Default 'top 80%'. */
  start?: string;
  as?: "p" | "h2" | "h3" | "div";
};

/**
 * Line-by-line clip-path reveal — each line slides up while the
 * mask wipes from inset(0 0 100% 0) to inset(0). Matches the spec:
 * y:100% to 0 with a clip-path mask, 40ms stagger by default.
 */
export default function RevealLines({
  lines,
  className,
  lineClassName,
  stagger = 0.04,
  start = "top 80%",
  as = "div",
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      registerGsap();
      const root = ref.current;
      if (!root) return;

      const inners = root.querySelectorAll<HTMLElement>("[data-line-inner]");

      if (prefersReducedMotion()) return;

      gsap.fromTo(
        inners,
        { yPercent: 100, clipPath: "inset(0 0 100% 0)" },
        {
          yPercent: 0,
          clipPath: "inset(0 0 0% 0)",
          duration: 1.0,
          ease: "power3.out",
          stagger,
          immediateRender: false,
          scrollTrigger: {
            trigger: root,
            start,
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: ref }
  );

  const Tag = as;

  return (
    <Tag ref={ref as React.RefObject<HTMLDivElement>} className={className}>
      {lines.map((line, i) => (
        <span
          key={i}
          className={clsx("line-mask", lineClassName)}
          aria-hidden={false}
        >
          <span data-line-inner className="line-inner">
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
