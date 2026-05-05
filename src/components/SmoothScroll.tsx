"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, registerGsap, prefersReducedMotion } from "@/lib/gsap";

type Props = {
  children: React.ReactNode;
};

export default function SmoothScroll({ children }: Props) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    registerGsap();

    if (prefersReducedMotion()) {
      // Skip Lenis entirely for users who asked for reduced motion.
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      lerp: 0.1,
      orientation: "vertical",
      gestureOrientation: "vertical",
    });
    lenisRef.current = lenis;

    // Bridge Lenis -> ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    const tickerCb = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    // Mark html so Lenis classes apply correctly
    document.documentElement.classList.add("lenis", "lenis-smooth");

    return () => {
      gsap.ticker.remove(tickerCb);
      lenis.destroy();
      document.documentElement.classList.remove("lenis", "lenis-smooth");
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
