import Link from "next/link";
import SeparatorGlyph from "./SeparatorGlyph";

const SOCIAL = [
  {
    label: "GitHub",
    href: "https://github.com/Nitish05",
    short: "GH",
    cursor: "GITHUB",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/rrnitish/",
    short: "LI",
    cursor: "LINKEDIN",
  },
  {
    label: "Email",
    href: "mailto:rrnitish@gmail.com",
    short: "EM",
    cursor: "EMAIL",
  },
];

export default function Footer() {
  return (
    <footer className="relative w-full bg-ink px-6 py-12 text-bone sm:px-10 lg:px-16">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-8 border-t border-bone/15 pt-10 lg:flex-row lg:items-center lg:justify-between">
        {/* Lockup + meta */}
        <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-wider2 text-bone/55">
          <Link
            href="/"
            data-cursor="HOME"
            className="text-bone hover:text-amber"
          >
            NRR<span className="text-amber">/</span>ROBOTICS
          </Link>
          <SeparatorGlyph className="text-bone/30" />
          <span>Miami, FL</span>
          <SeparatorGlyph className="text-bone/30" />
          <span className="text-bone/40">
            &copy; <span className="text-bone/55">2026</span>
          </span>
        </div>

        {/* Social row */}
        <ul className="flex items-center gap-6 font-mono text-[11px] uppercase tracking-wider2">
          {SOCIAL.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={s.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                data-cursor={s.cursor}
                className="group inline-flex items-center gap-2 text-bone/70 hover:text-amber"
              >
                <span className="text-amber">{s.short}</span>
                <span>{s.label}</span>
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>

        {/* Build stamp */}
        <div className="font-mono text-[10px] uppercase tracking-wider2 text-bone/35">
          v0.1 · build {new Date().getFullYear()}.{String(new Date().getMonth() + 1).padStart(2, "0")}
        </div>
      </div>
    </footer>
  );
}
