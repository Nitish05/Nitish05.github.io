"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  gsap,
  ScrollTrigger,
  registerGsap,
  useGSAP,
  prefersReducedMotion,
} from "@/lib/gsap";
import { CHAPTERS } from "@/lib/chapters";
import { PROJECTS, type Project } from "@/lib/projects";
import clsx from "clsx";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const onEnter = () => {
    if (prefersReducedMotion()) return;
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      void videoRef.current.play().catch(() => {});
    }
  };
  const onLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const isAmber = project.accent === "amber";

  return (
    <article
      ref={cardRef as React.RefObject<HTMLElement>}
      data-project-card
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      className={clsx(
        "relative flex h-screen w-screen flex-shrink-0 flex-col justify-end p-10 sm:p-16",
        "lg:w-[80vw] lg:max-w-[1100px] lg:px-12",
        isAmber ? "bg-bone text-ink" : "bg-ink text-bone"
      )}
    >
      {/* Watermark project number */}
      <span
        aria-hidden
        className={clsx(
          "pointer-events-none absolute right-4 top-4 select-none font-display text-[24vw] leading-none lg:text-[18vw]",
          isAmber ? "text-amber/15" : "text-cyan/15"
        )}
      >
        {String(index).padStart(2, "0")}
      </span>

      {/* Top meta row */}
      <div
        className={clsx(
          "absolute left-10 top-10 z-[1] flex items-center gap-3 font-mono text-[10px] uppercase tracking-wider2 sm:left-16 sm:top-16 lg:left-12",
          isAmber ? "text-ink/55" : "text-bone/55"
        )}
      >
        <span className={isAmber ? "text-amber" : "text-cyan"}>
          {String(index).padStart(2, "0")}
        </span>
        <span className="h-px w-8 bg-current opacity-40" />
        <span>{project.year}</span>
      </div>

      {/* Media preview */}
      {project.poster && (
        <div
          className={clsx(
            "relative mb-8 aspect-video w-full overflow-hidden lg:max-w-[560px]",
            isAmber ? "bg-ink/5" : "bg-bone/5"
          )}
        >
          <Image
            src={project.poster}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 560px, 90vw"
          />
          {project.video && (
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100 [article:hover_&]:opacity-100"
              src={project.video}
              muted
              loop
              playsInline
              preload="metadata"
            />
          )}
        </div>
      )}

      {/* Title block */}
      <h3 className="font-display text-display-md uppercase leading-[0.95]">
        {project.title}
      </h3>
      <p
        className={clsx(
          "mt-4 max-w-xl font-sans text-base sm:text-lg",
          isAmber ? "text-ink/70" : "text-bone/70"
        )}
      >
        {project.tagline}
      </p>

      {/* Stack chips */}
      <ul className="mt-6 flex flex-wrap gap-2">
        {project.stack.slice(0, 6).map((s) => (
          <li
            key={s}
            className={clsx(
              "border px-3 py-1 font-mono text-[10px] uppercase tracking-wider2",
              isAmber
                ? "border-ink/15 text-ink/70"
                : "border-bone/15 text-bone/70"
            )}
          >
            {s}
          </li>
        ))}
      </ul>

      {/* CTAs */}
      <div className="mt-8 flex flex-wrap items-center gap-6">
        <Link
          href={`/work/${project.slug}`}
          data-cursor="OPEN"
          className={clsx(
            "group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider2",
            isAmber ? "text-ink hover:text-amber" : "text-bone hover:text-amber"
          )}
        >
          <span>Deep dive</span>
          <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="GITHUB"
            className={clsx(
              "group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider2",
              isAmber ? "text-ink/60 hover:text-ink" : "text-bone/60 hover:text-bone"
            )}
          >
            <span>GitHub</span>
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
              ↗
            </span>
          </a>
        )}
      </div>
    </article>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      registerGsap();

      if (prefersReducedMotion()) return;
      // Pin only on lg+ — mobile uses native horizontal scroll-snap
      if (typeof window === "undefined" || window.innerWidth < 1024) return;

      const section = sectionRef.current!;
      const track = trackRef.current!;

      const getDistance = () =>
        Math.max(0, track.scrollWidth - window.innerWidth);

      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          start: "top top",
          end: () => "+=" + getDistance(),
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      // Refresh on font load to avoid measurement drift
      void document.fonts?.ready.then(() => ScrollTrigger.refresh());

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      id={CHAPTERS[3].id}
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative w-full overflow-hidden bg-bone"
      aria-label="Projects"
    >
      {/* Sticky chapter label across the pin */}
      <div className="pointer-events-none absolute left-6 top-6 z-[2] flex items-baseline gap-3 font-mono text-[11px] uppercase tracking-wider2 text-ink/60 sm:left-10 sm:top-10">
        <span className="text-amber">03</span>
        <span className="h-px w-12 bg-ink/20" />
        <span>Projects</span>
        <span className="ml-3 text-ink/30">{PROJECTS.length} entries</span>
      </div>

      {/* Horizontal track */}
      <div
        ref={trackRef}
        className={clsx(
          "flex w-max",
          // On lg+ GSAP translates the track. On mobile, fall back to native scroll-snap.
          "max-lg:w-full max-lg:overflow-x-auto max-lg:snap-x max-lg:snap-mandatory"
        )}
        style={{ willChange: "transform" }}
      >
        {PROJECTS.map((p, i) => (
          <div key={p.slug} className="snap-start">
            <ProjectCard project={p} index={i + 1} />
          </div>
        ))}
      </div>
    </section>
  );
}
