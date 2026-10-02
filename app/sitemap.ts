import type { MetadataRoute } from "next";
import { featuredProjects } from "@/data/projects";
import { siteUrl } from "@/data/seo";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    ...featuredProjects.map(project => ({ url: `${siteUrl}/projects/${project.slug}`, changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
