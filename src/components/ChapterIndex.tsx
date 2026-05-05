"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, registerGsap, prefersReducedMotion } from "@/lib/gsap";
import { CHAPTERS } from "@/lib/chapters";
import clsx from "clsx";

export default function ChapterIndex() {
  const [active, setActive] = useState(0);
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    registerGsap();

    const triggers: ScrollTrigger[] = [];
    const setup = () => {
      CHAPTERS.forEach((chapter, idx) => {
        const el = document.getElementById(chapter.id);
        if (!el) return;
        const trigger = ScrollTrigger.create({
          trigger: el,
          start: "top 50%",
          end: "bottom 50%",
          onEnter: () => setActive(idx),
          onEnterBack: () => setActive(idx),
        });
        triggers.push(trigger);
      });
    };

    // Allow layout to settle before measuring sections
    const id = window.setTimeout(setup, 50);

    return () => {
      window.clearTimeout(id);
      triggers.forEach((t) => t.kill());
    };
  }, []);

  const jumpTo = (chapterId: string) => {
    const el = document.getElementById(chapterId);
    if (!el) return;
    if (prefersReducedMotion()) {
      el.scrollIntoView({ behavior: "auto", block: "start" });
      return;
    }
    gsap.to(window, {
      duration: 1.1,
      scrollTo: { y: el, autoKill: true },
      ease: "power3.inOut",
    });
  };

  return (
    <nav
      ref={containerRef as React.RefObject<HTMLElement>}
      aria-label="Chapter index"
      className="pointer-events-auto fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
    >
      <ul className="flex flex-col gap-3">
        {CHAPTERS.map((chapter, idx) => {
          const isActive = idx === active;
          return (
            <li key={chapter.id}>
              <button
                type="button"
                onClick={() => jumpTo(chapter.id)}
                data-cursor={chapter.label.toUpperCase()}
                className={clsx(
                  "group flex items-center gap-3 font-mono text-[11px] uppercase tracking-wider2 transition-all duration-500 ease-out2",
                  isActive ? "text-ink" : "text-ash hover:text-ink"
                )}
                aria-current={isActive ? "true" : undefined}
              >
                <span
                  className={clsx(
                    "inline-block transition-transform duration-500 ease-out2",
                    isActive ? "scale-150 text-amber" : "scale-100"
                  )}
                  aria-hidden
                >
                  {chapter.number}
                </span>
                <span
                  className={clsx(
                    "overflow-hidden whitespace-nowrap transition-all duration-500 ease-out2",
                    isActive ? "max-w-[140px] opacity-100" : "max-w-0 opacity-0"
                  )}
                >
                  {chapter.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
