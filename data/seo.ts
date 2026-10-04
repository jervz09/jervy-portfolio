import { profile } from "@/data/profile";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || profile.website
).replace(/\/$/, "");
export const seo = {
  title: "Jervy Ariola | Full Stack Developer | Backend & Cloud/DevOps",
  description:
    "Full Stack Developer with 5+ years of experience in production web apps, REST APIs, ERPNext/Frappe, AWS, Google Cloud, and CI/CD. Backend and cloud/DevOps focus.",
  keywords: [
    "Jervy Ariola",
    "Full Stack Developer",
    "Full Stack Engineer",
    "Backend Developer",
    "Backend Engineer",
    "Software Engineer",
    "Cloud Engineer",
    "DevOps Engineer",
    "ERPNext Developer",
    "Frappe",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Python",
    "Elixir",
    "Phoenix",
    "MySQL",
    "AWS",
    "Google Cloud",
    "CI/CD",
    "REST API",
  ],
};
