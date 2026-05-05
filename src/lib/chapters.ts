export type Chapter = {
  id: string;
  number: string;
  label: string;
};

export const CHAPTERS: Chapter[] = [
  { id: "hero", number: "00", label: "Index" },
  { id: "intro", number: "01", label: "Intro" },
  { id: "stats", number: "02", label: "Stats" },
  { id: "projects", number: "03", label: "Projects" },
  { id: "quote", number: "04", label: "Manifesto" },
  { id: "stack", number: "05", label: "Stack" },
  { id: "cta", number: "06", label: "Builder" },
];
