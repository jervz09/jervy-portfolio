import type { SocialLink } from "@/types";
export const profile = {
  name: "Jervy Ariola", initials: "JA", title: "Full Stack & DevOps Engineer",
  headline: "Building reliable products from interface to infrastructure.",
  introduction: "Full Stack Developer with experience building scalable web applications, cloud infrastructure, and CI/CD pipelines. Passionate about clean architecture, automation, and delivering reliable software.",
  about: "I am a Full Stack & DevOps Engineer experienced in building and maintaining production web applications across the entire software delivery lifecycle. My work includes frontend development, backend APIs, database design, cloud infrastructure, CI/CD automation, deployment, performance optimization, and production support.",
  email: "jervyariola@gmail.com", github: "https://github.com/jervz09", linkedin: "https://www.linkedin.com/in/jervy-ariola", resumeUrl: "/Resume%20-%20Jervy%20Ariola.pdf", resumeFileName: "Resume - Jervy Ariola.pdf", availability: "Available for opportunities",
  strengths: ["Full Stack Development","Backend Architecture","REST API Development","Cloud Infrastructure","CI/CD Automation","Application Deployment","Performance Optimization","Production Maintenance"],
  socials: [
    { label: "GitHub", href: "https://github.com/jervz09" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/jervy-ariola" },
    { label: "Email", href: "mailto:jervyariola@gmail.com" },
  ] satisfies SocialLink[],
};
export const principles = [
  ["Build for users","Create software that solves real problems."],
  ["Keep systems simple","Prefer maintainable solutions over unnecessary complexity."],
  ["Automate repetition","Use pipelines and infrastructure tooling to reduce manual work."],
  ["Design for production","Consider deployment, monitoring, scale, and maintenance from day one."],
  ["Optimize with purpose","Measure performance before introducing complexity."],
] as const;
