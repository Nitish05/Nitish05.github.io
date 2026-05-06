import type { MetadataRoute } from "next";
import { PROJECTS } from "@/lib/projects";

const SITE_URL = "https://rrnitish.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/builder`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...PROJECTS.map((project) => ({
      url: `${SITE_URL}/work/${project.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
