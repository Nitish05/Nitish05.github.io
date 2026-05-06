"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import SeparatorGlyph from "./SeparatorGlyph";
import clsx from "clsx";

export default function TopNav() {
  const pathname = usePathname();
  const onBuilder = pathname?.startsWith("/builder");

  return (
    <header className="pointer-events-auto fixed inset-x-0 top-0 z-40 px-5 pt-5 sm:px-8 sm:pt-7">
      <div className="flex items-center justify-between text-ink mix-blend-difference">
        <Link
          href="/"
          className="font-mono text-xs uppercase tracking-wider2 text-bone"
          data-cursor="HOME"
        >
          NRR<span className="text-amber">/</span>ROBOTICS
        </Link>

        <nav className="flex items-center gap-1.5 text-bone sm:gap-3">
          <Link
            href="/"
            data-cursor="ENGINEER"
            className={clsx(
              "font-mono uppercase transition-colors duration-300",
              "text-[9px] tracking-[0.1em] sm:text-xs sm:tracking-wider2",
              !onBuilder ? "text-amber" : "text-bone hover:text-amber"
            )}
          >
            The Engineer
          </Link>
          <SeparatorGlyph className="text-bone" />
          <Link
            href="/builder"
            data-cursor="BUILDER"
            className={clsx(
              "font-mono uppercase transition-colors duration-300",
              "text-[9px] tracking-[0.1em] sm:text-xs sm:tracking-wider2",
              onBuilder ? "text-amber" : "text-bone hover:text-amber"
            )}
          >
            The Builder
          </Link>
        </nav>
      </div>
    </header>
  );
}
