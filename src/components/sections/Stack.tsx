"use client";

import { useRef } from "react";
import { gsap, registerGsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { CHAPTERS } from "@/lib/chapters";
import Marquee from "@/components/Marquee";
import clsx from "clsx";

type Skill = {
  name: string;
  category: "robotics" | "ml" | "embedded" | "infra";
};

const SKILLS: Skill[] = [
  { name: "ROS 2", category: "robotics" },
  { name: "MoveIt 2", category: "robotics" },
  { name: "Isaac Sim", category: "robotics" },
  { name: "OMPL", category: "robotics" },
  { name: "CAN Bus", category: "embedded" },
  { name: "Modbus", category: "embedded" },
  { name: "Klipper", category: "embedded" },
  { name: "LinuxCNC", category: "embedded" },
  { name: "Python", category: "ml" },
  { name: "C++17", category: "embedded" },
  { name: "PyTorch", category: "ml" },
  { name: "Docker", category: "infra" },
  { name: "k3s", category: "infra" },
  { name: "OpenCV", category: "ml" },
  { name: "TensorFlow", category: "ml" },
  { name: "CUDA", category: "ml" },
];

const CATEGORY_LABEL: Record<Skill["category"], string> = {
  robotics: "ROBOTICS",
  ml: "ML",
  embedded: "EMBEDDED",
  infra: "INFRA",
};

const MARQUEE_TEXT =
  "ROS 2 · MOVEIT · ISAAC SIM · OMPL · CAN BUS · MODBUS · KLIPPER · LINUXCNC · PYTHON · C++ · PYTORCH · DOCKER · K3S · OPENCV · TENSORFLOW · CUDA · ";

export default function Stack() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      registerGsap();
      if (prefersReducedMotion()) return;

      const root = sectionRef.current!;
      const cells = root.querySelectorAll<HTMLElement>("[data-skill-cell]");

      gsap.fromTo(
        cells,
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.04,
          immediateRender: false,
          scrollTrigger: {
            trigger: root,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id={CHAPTERS[5].id}
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative w-full bg-ink text-bone"
      aria-label="Stack"
    >
      <div className="mx-auto max-w-[1500px] px-6 pt-32 sm:px-10 lg:px-16 lg:pt-44">
        <div className="mb-12 flex items-baseline gap-4 lg:mb-16">
          <span className="font-mono text-[11px] uppercase tracking-wider2 text-amber">
            05
          </span>
          <span className="h-px flex-1 max-w-[120px] bg-bone/20" />
          <span className="font-mono text-[11px] uppercase tracking-wider2 text-bone/50">
            Stack
          </span>
        </div>

        <h2 className="mb-16 max-w-3xl font-display text-display-md uppercase leading-[0.95]">
          Tools <span className="text-amber">/</span> grammar.
        </h2>

        {/* 13-cell grid; on hover each cell flips from mono ink to amber. */}
        <div
          className="grid grid-cols-1 gap-px bg-bone/10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          role="list"
        >
          {SKILLS.map((s) => (
            <div
              key={s.name}
              data-skill-cell
              role="listitem"
              data-cursor="STACK"
              className={clsx(
                "group relative flex h-44 flex-col justify-between bg-[#171717] p-6 transition-colors duration-500 ease-out2 hover:bg-ink"
              )}
            >
              <span
                className={clsx(
                  "font-mono text-[10px] uppercase tracking-wider2 transition-colors duration-500 ease-out2",
                  "text-bone/40 group-hover:text-amber"
                )}
              >
                {CATEGORY_LABEL[s.category]}
              </span>
              <span
                className={clsx(
                  "font-display text-3xl uppercase leading-none transition-colors duration-500 ease-out2 sm:text-4xl",
                  "text-bone group-hover:text-amber"
                )}
              >
                {s.name}
              </span>
              <span
                aria-hidden
                className={clsx(
                  "absolute right-6 top-6 font-mono text-[10px] uppercase tracking-wider2 transition-all duration-500 ease-out2",
                  "translate-x-1 text-transparent group-hover:translate-x-0 group-hover:text-amber"
                )}
              >
                ↗
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Closing marquee that bridges into Chapter 06 */}
      <div className="mt-32 bg-ink py-6 text-amber lg:mt-44">
        <Marquee
          text={MARQUEE_TEXT}
          duration={42}
          className="font-display text-[clamp(2rem,4.5vw,4rem)] uppercase leading-none"
        />
      </div>
    </section>
  );
}
