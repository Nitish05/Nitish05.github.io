import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { PROJECTS } from "@/lib/projects";
import RevealLines from "@/components/RevealLines";

type Params = { slug: string };
type PageProps = { params: Promise<Params> };

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return { title: "Not found" };
  return {
    title: `${project.title} — Nitish R. Raveendran`,
    description: project.tagline,
  };
}

const PANELS = ["Problem", "Approach", "Hardware", "Result"] as const;

export default async function WorkPage({ params }: PageProps) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  const isAmber = project.accent === "amber";
  const idx = PROJECTS.findIndex((p) => p.slug === project.slug) + 1;
  const prev = PROJECTS[(idx - 2 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[idx % PROJECTS.length];

  const panelText = (label: (typeof PANELS)[number]) => {
    switch (label) {
      case "Problem":
        return project.problem;
      case "Approach":
        return project.approach;
      case "Hardware":
        return project.hardware;
      case "Result":
        return project.result;
    }
  };

  return (
    <main id="main-content" className="relative bg-ink text-bone">
      {/* Header */}
      <header className="px-8 pb-12 pt-32 sm:px-12 lg:px-24 xl:px-32">
        <div className="mx-auto max-w-[1400px]">
          <Link
            href="/#projects"
            data-cursor="BACK"
            className="font-mono text-[11px] uppercase tracking-wider2 text-bone/60 hover:text-bone"
          >
            ← Back to projects
          </Link>

          <div className="mt-12 flex items-baseline gap-4">
            <span className="font-mono text-[11px] uppercase tracking-wider2 text-amber">
              {String(idx).padStart(3, "0")}
            </span>
            <span className="h-px flex-1 max-w-[120px] bg-bone/20" />
            <span className="font-mono text-[11px] uppercase tracking-wider2 text-bone/50">
              {project.year}
            </span>
          </div>

          <h1 className="mt-4 font-display text-display-lg uppercase leading-[0.9]">
            {project.title}
          </h1>
          <p className="mt-6 max-w-2xl font-sans text-lg text-bone/75 sm:text-xl">
            {project.tagline}
          </p>

          <ul className="mt-8 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <li
                key={s}
                className="border border-bone/15 px-3 py-1 font-mono text-[10px] uppercase tracking-wider2 text-bone/70"
              >
                {s}
              </li>
            ))}
          </ul>

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="GITHUB"
              className="mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider2 text-bone hover:text-amber"
            >
              <span>View on GitHub</span>
              <span aria-hidden>↗</span>
            </a>
          )}
        </div>
      </header>

      {/* Hero media */}
      {project.poster && (
        <div className="relative mx-auto max-w-[1400px] px-8 sm:px-12 lg:px-24 xl:px-32">
          <div
            className="relative aspect-video w-full overflow-hidden bg-bone/5"
          >
            <Image
              src={project.poster}
              alt={project.title}
              fill
              className="object-cover"
              priority
              sizes="(min-width: 1024px) 1100px, 100vw"
            />
            {project.video && (
              <video
                src={project.video}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}
          </div>
        </div>
      )}

      {/* Panels — vertical stack for now; horizontal "Change view" sub-scroll comes later */}
      <section className="px-8 py-32 sm:px-12 lg:px-24 lg:py-40 xl:px-32">
        <div className="mx-auto max-w-[1400px] grid grid-cols-1 gap-px bg-bone/10 lg:grid-cols-2">
          {PANELS.map((label, i) => (
            <article
              key={label}
              className="bg-[#171717] p-10 sm:p-14"
            >
              <div className="flex items-baseline gap-3 font-mono text-[11px] uppercase tracking-wider2 text-bone/55">
                <span className="text-amber">{String(i + 1).padStart(2, "0")}</span>
                <span>/ {label}</span>
              </div>
              <h2 className="mt-4 font-display text-3xl uppercase sm:text-5xl">
                {label}
              </h2>
              <RevealLines
                as="p"
                lines={[panelText(label)]}
                className="mt-8 max-w-xl text-lg leading-relaxed text-bone/80"
                lineClassName="block"
                stagger={0.04}
                start="top 85%"
              />
            </article>
          ))}
        </div>
      </section>

      {/* Prev / Next */}
      <nav className="mx-auto flex max-w-[1400px] items-stretch gap-px bg-bone/10 px-8 pb-32 sm:px-12 lg:px-24 xl:px-32">
        <Link
          href={`/work/${prev.slug}`}
          data-cursor="PREV"
          className="group flex-1 bg-[#171717] p-10 transition-colors hover:bg-[#1e1e1e] hover:text-bone"
        >
          <span className="font-mono text-[10px] uppercase tracking-wider2 text-bone/60">
            ← Previous
          </span>
          <p className="mt-3 font-display text-2xl uppercase">{prev.title}</p>
        </Link>
        <Link
          href={`/work/${next.slug}`}
          data-cursor="NEXT"
          className="group flex-1 bg-[#171717] p-10 text-right transition-colors hover:bg-[#1e1e1e] hover:text-bone"
        >
          <span className="font-mono text-[10px] uppercase tracking-wider2 text-bone/60">
            Next →
          </span>
          <p className="mt-3 font-display text-2xl uppercase">{next.title}</p>
        </Link>
      </nav>
    </main>
  );
}
