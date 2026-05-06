"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap, prefersReducedMotion } from "@/lib/gsap";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    registerGsap();
    if (prefersReducedMotion()) return;

    // Skip on coarse pointers (touch)
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    document.documentElement.classList.add("has-custom-cursor");

    const dot = dotRef.current;
    if (!dot) return;

    gsap.set(dot, { xPercent: -50, yPercent: -50, opacity: 0 });

    const xTo = gsap.quickTo(dot, "x", { duration: 0.35, ease: "power3.out" });
    const yTo = gsap.quickTo(dot, "y", { duration: 0.35, ease: "power3.out" });

    let visible = false;
    const onMove = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      if (!visible) {
        visible = true;
        gsap.to(dot, { opacity: 1, duration: 0.2 });
      }
    };

    const onLeave = () => {
      visible = false;
      gsap.to(dot, { opacity: 0, duration: 0.2 });
    };

    const onEnterLink = (target: HTMLElement) => {
      const label = target.dataset.cursor;
      gsap.to(dot, { scale: 4, duration: 0.3, ease: "power3.out" });
      if (label && labelRef.current) {
        labelRef.current.textContent = label;
        gsap.to(labelRef.current, { opacity: 1, duration: 0.2 });
      }
    };

    const onLeaveLink = () => {
      gsap.to(dot, { scale: 1, duration: 0.3, ease: "power3.out" });
      if (labelRef.current) {
        gsap.to(labelRef.current, { opacity: 0, duration: 0.15 });
      }
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);

    let activeTarget: HTMLElement | null = null;
    const findTarget = (target: EventTarget | null) =>
      target instanceof HTMLElement
        ? target.closest<HTMLElement>("a, button, [data-cursor]")
        : null;

    const onPointerOver = (e: PointerEvent) => {
      const target = findTarget(e.target);
      if (!target || target === activeTarget) return;
      activeTarget = target;
      onEnterLink(target);
    };

    const onPointerOut = (e: PointerEvent) => {
      if (!activeTarget) return;
      const nextTarget = findTarget(e.relatedTarget);
      if (nextTarget === activeTarget) return;
      activeTarget = null;
      onLeaveLink();
    };

    document.addEventListener("pointerover", onPointerOver);
    document.addEventListener("pointerout", onPointerOut);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointerout", onPointerOut);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <div
      ref={dotRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] h-3 w-3 rounded-full bg-amber mix-blend-difference"
    >
      <span
        ref={labelRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[10px] uppercase tracking-wider2 font-mono text-ink opacity-0"
        style={{ transform: "translate(-50%, -50%) scale(0.25)" }}
      />
    </div>
  );
}
