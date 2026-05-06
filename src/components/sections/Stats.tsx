"use client";

import { useRef } from "react";
import { gsap, registerGsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { CHAPTERS } from "@/lib/chapters";

type Stat = {
  num: string; // index marker
  target: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  meta?: string;
};

const STATS: Stat[] = [
  { num: "01", target: 2, suffix: "+", label: "Years in robotics", meta: "Industry · academic" },
  { num: "02", target: 3.79, decimals: 2, suffix: "/4", label: "M.Eng GPA", meta: "UMD Robotics" },
  { num: "03", target: 5, label: "Robots deployed", meta: "FR5 · 6-DOF · 9-axis" },
  { num: "04", target: 12, suffix: "+", label: "ROS 2 packages", meta: "Open source" },
  { num: "05", target: 6, label: "Custom firmwares", meta: "Teensy · Arduino · TI" },
];

function format(value: number, decimals: number) {
  if (decimals > 0) return value.toFixed(decimals);
  return Math.round(value).toString();
}

export default function Stats() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      registerGsap();
      const root = sectionRef.current!;
      const tiles = root.querySelectorAll<HTMLElement>("[data-stat-tile]");

      tiles.forEach((tile) => {
        const valueEl = tile.querySelector<HTMLElement>("[data-stat-value]");
        const target = Number(tile.dataset.target ?? 0);
        const decimals = Number(tile.dataset.decimals ?? 0);
        if (!valueEl) return;

        if (prefersReducedMotion()) {
          valueEl.textContent = format(target, decimals);
          return;
        }

        const obj = { v: 0 };
        valueEl.textContent = format(0, decimals);

        gsap.fromTo(
          tile,
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            immediateRender: false,
            scrollTrigger: {
              trigger: tile,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );

        gsap.to(obj, {
          v: target,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: tile,
            start: "top 80%",
            toggleActions: "play none none reset",
          },
          onUpdate: () => {
            valueEl.textContent = format(obj.v, decimals);
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id={CHAPTERS[2].id}
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative w-full bg-ink px-6 py-32 text-bone sm:px-10 lg:py-48"
      aria-label="Stats"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 flex items-baseline gap-4 lg:mb-20">
          <span className="font-mono text-[11px] uppercase tracking-wider2 text-amber">
            02
          </span>
          <span className="h-px flex-1 max-w-[120px] bg-bone/20" />
          <span className="font-mono text-[11px] uppercase tracking-wider2 text-bone/50">
            Index
          </span>
        </div>

        <h2 className="mb-16 max-w-3xl font-display text-display-md uppercase leading-[0.95]">
          By the <span className="text-amber">numbers</span>.
        </h2>

        <div className="grid grid-cols-1 gap-px bg-bone/10 sm:grid-cols-2 lg:grid-cols-5">
          {STATS.map((s) => (
            <div
              key={s.num}
              data-stat-tile
              data-target={s.target}
              data-decimals={s.decimals ?? 0}
              className="group relative bg-ink p-8 transition-colors duration-500 ease-out2 hover:bg-smoke"
            >
              <span className="font-mono text-[10px] uppercase tracking-wider2 text-bone/40">
                {s.num}
              </span>
              <div className="mt-6 flex items-baseline gap-1">
                {s.prefix && (
                  <span className="font-display text-3xl text-bone/60">
                    {s.prefix}
                  </span>
                )}
                <span
                  data-stat-value
                  className="font-display text-[clamp(2.2rem,5.5vw,4.5rem)] leading-none text-bone tabular-nums"
                >
                  0
                </span>
                {s.suffix && (
                  <span className="font-display text-3xl text-amber">
                    {s.suffix}
                  </span>
                )}
              </div>
              <p className="mt-4 font-mono text-xs uppercase tracking-wider2 text-bone">
                {s.label}
              </p>
              {s.meta && (
                <p className="mt-1 font-mono text-[10px] uppercase tracking-wider2 text-bone/40">
                  {s.meta}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
