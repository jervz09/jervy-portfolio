export type SocialLink = { label: string; href: string };
export type Experience = { role: string; period: string; summary: string; achievements: string[] };
export type Project = { slug: string; name: string; description: string; image?: string; features: string[]; technologies: string[]; focus: string[]; repository?: string; liveUrl?: string; caseStudy: { overview: string; problem: string; solution: string; architecture: string; implementation: string; challenges: string; deployment: string; results: string; lessons: string } };
export type SkillGroup = { category: string; items: string[] };
export type Certification = { name: string; issuer: string; status: "upcoming" | "earned"; issueDate?: string; credentialId?: string; credentialUrl?: string; badgeImage?: string };
