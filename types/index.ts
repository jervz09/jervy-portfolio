export type SocialLink = { label: string; href: string };
export type Experience = {
  role: string;
  company?: string;
  period: string;
  summary: string;
  achievements: string[];
};
export type Project = {
  slug: string;
  name: string;
  description: string;
  image?: string;
  imageFit?: "cover" | "contain";
  featured?: boolean;
  features: string[];
  technologies: string[];
  focus: string[];
  repository?: string;
  liveUrl?: string;
  caseStudy: {
    overview: string;
    problem: string;
    role?: string;
    technicalWork?: string;
    engineeringContext?: string;
    deployment?: string;
  };
};
export type SkillGroup = { category: string; items: string[] };
export type Certification = {
  name: string;
  issuer: string;
  status: "upcoming" | "earned";
  issueDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  badgeImage?: string;
};
