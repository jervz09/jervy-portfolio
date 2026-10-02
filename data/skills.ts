import type { SkillGroup } from "@/types";

export const techStack: SkillGroup[] = [
  { category: "Frontend", items: ["React", "Next.js", "JavaScript", "TypeScript", "Tailwind CSS"] },
  { category: "Backend", items: ["Node.js", "Python", "Elixir", "Phoenix", "REST APIs"] },
  { category: "Database", items: ["MySQL", "Firebase", "PostgreSQL", "Redis"] },
  { category: "Cloud", items: ["AWS", "Google Cloud Platform"] },
  { category: "DevOps", items: ["CI/CD", "Git", "Bitbucket Pipelines", "GitHub Actions", "Docker"] },
  { category: "Business applications", items: ["ERPNext", "Frappe", "System integrations", "Legacy maintenance"] },
];

export const skills: SkillGroup[] = [
  { category: "Frontend", items: ["React", "Next.js", "JavaScript", "TypeScript", "HTML", "CSS", "Tailwind CSS", "jQuery"] },
  { category: "Backend", items: ["Node.js", "Express", "Python", "Elixir", "Phoenix", "REST APIs"] },
  { category: "Database", items: ["MySQL", "SQL", "Firebase", "PostgreSQL", "Redis"] },
  { category: "Cloud", items: ["AWS", "Google Cloud Platform", "Cloud deployments", "Environment management"] },
  { category: "DevOps", items: ["CI/CD", "Git", "Bitbucket Pipelines", "GitHub Actions", "Docker", "Linux", "Nginx", "PM2", "Server administration"] },
  { category: "Business applications", items: ["ERPNext", "Frappe", "Workflow customization", "API integration", "Production maintenance"] },
];

export const cloudExperience = [
  {
    category: "AWS",
    description: "Support application hosting, storage, relational databases, DNS, access management, and content delivery for production systems.",
    items: ["EC2", "S3", "RDS", "Route53", "IAM", "CloudFront", "Amplify"],
  },
  {
    category: "Google Cloud",
    description: "Support applications across virtual machines and Cloud Run, with cloud storage, databases, IAM, and service accounts.",
    items: ["Compute Engine / VMs", "Cloud Run", "Cloud Storage", "Cloud SQL", "IAM", "Service accounts"],
  },
  {
    category: "Delivery & operations",
    description: "Maintain CI/CD pipelines, deployment workflows, environments, and servers; investigate production issues across application code and infrastructure.",
    items: ["Git", "CI/CD", "Bitbucket Pipelines", "GitHub Actions", "Docker", "Linux", "Nginx", "PM2", "Firebase"],
  },
];

export const pipeline = ["Application code", "Git", "CI/CD", "Build & test", "Deployment", "Cloud infrastructure", "Application", "Database / storage", "Production support"];
