import type { SocialLink } from "@/types";

export const profile = {
  name: "Jervy Ariola",
  initials: "JA",
  title: "Full Stack Developer · Backend Engineer · Cloud/DevOps",
  headline: "Building Reliable Applications & Cloud Infrastructure.",
  introduction:
    "Full Stack Developer with 5+ years of experience building production web applications, REST APIs, and cloud infrastructure. Specialized in backend engineering, AWS, CI/CD automation, containerization, and application delivery.",
  about: [
    "I build and maintain the applications that businesses use every day. My 5+ years in software development span frontend interfaces, backend services, REST APIs, databases, and system integrations, including work on existing and legacy applications.",
    "My background includes Python and ERPNext/Frappe business workflow customization, followed by backend and full stack work at PawnHero using Elixir/Phoenix, Node.js, React, and MySQL. I work on customer-facing applications and internal systems, including maintenance and production troubleshooting.",
    "My responsibilities also extend to AWS and Google Cloud infrastructure, CI/CD pipelines, deployments, and server maintenance. I am building on that experience toward deeper DevOps responsibilities and, over time, DevSecOps.",
  ],
  email: "jervyariola@gmail.com",
  github: "https://github.com/jervz09",
  linkedin: "https://www.linkedin.com/in/jervy-ariola/",
  website: "https://jervz-lab.vercel.app/",
  resumeUrl: "/resume",
  resumeFileName: "Resume - Jervy Ariola.pdf",
  availability: "Open to engineering opportunities",
  contactHeadline: "Let’s talk about your engineering team.",
  contactDescription:
    "Open to Full Stack Developer, Backend Engineer, and Software Engineer roles, including ERPNext/Frappe development. I’m also interested in Cloud Engineer and DevOps Engineer opportunities that build on my production infrastructure experience.",
  strengths: [
    "Full Stack Web Development",
    "Backend & REST APIs",
    "AWS & Google Cloud",
    "CI/CD & Deployment",
    "Databases & Integrations",
    "ERPNext / Frappe",
    "Legacy System Maintenance",
    "Production Troubleshooting",
  ],
  socials: [
    { label: "GitHub", href: "https://github.com/jervz09" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/jervy-ariola/" },
    { label: "Portfolio", href: "https://jervz-lab.vercel.app/" },
    { label: "Email", href: "mailto:jervyariola@gmail.com" },
  ] satisfies SocialLink[],
};

export const principles = [
  [
    "Understand the workflow",
    "Start with how people use the system and the business process it supports.",
  ],
  [
    "Maintain what matters",
    "Improve existing applications with care for compatibility and day-to-day operations.",
  ],
  [
    "Connect the systems",
    "Treat APIs, data handling, and integrations as part of the complete user workflow.",
  ],
  [
    "Plan for deployment",
    "Consider environments, infrastructure, and production support alongside application code.",
  ],
  [
    "Automate repeatable work",
    "Use version control and CI/CD to make delivery easier to maintain.",
  ],
] as const;
