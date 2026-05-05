"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import clsx from "clsx";

type Props = {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  cursorLabel?: string;
  /** Max pixel translation (default 12) */
  strength?: number;
  ariaLabel?: string;
};

export default function MagneticButton({
  children,
  className,
  href,
  onClick,
  cursorLabel,
  strength = 12,
  ariaLabel,
}: Props) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const el = ref.current as HTMLElement | null;
    if (!el) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3.out" });

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      const max = strength;
      const limit = (v: number) => Math.max(-max, Math.min(max, v * 0.4));
      xTo(limit(dx));
      yTo(limit(dy));
    };

    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [strength]);

  const baseCls = clsx(
    "relative inline-flex items-center gap-3 font-mono text-xs uppercase tracking-wider2",
    className
  );

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        data-cursor={cursorLabel}
        aria-label={ariaLabel}
        className={baseCls}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type="button"
      onClick={onClick}
      data-cursor={cursorLabel}
      aria-label={ariaLabel}
      className={baseCls}
    >
      {children}
    </button>
  );
}
