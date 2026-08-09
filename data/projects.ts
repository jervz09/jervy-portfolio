import type { Project } from "@/types";

const detail=(name:string, overview:string)=>({
  overview,
  problem:`Create dependable, understandable workflows for ${name} users.`,
  solution:"A modular product architecture joining clear interfaces with reliable APIs and data services.",
  architecture:"Component-driven frontend, service-oriented backend, REST interfaces, and relational persistence.",
  implementation:"Iterative feature delivery with careful attention to data integrity, usability, and maintainability.",
  challenges:"Balancing operational complexity with a fast, approachable user experience.",
  deployment:"Production-focused delivery with automated workflows, environment configuration, and monitoring.",
  results:"A maintainable platform designed to support day-to-day operations and future growth.",
  lessons:"Simple boundaries and observable systems make products easier to evolve and operate.",
});

const repository="https://github.com/jervz09/jervy-portfolio";
const rawAssets=`https://raw.githubusercontent.com/jervz09/jervy-portfolio/main/public/images/projects`;

export const projects: Project[] = [
  {
    slug:"pawnhero", name:"PawnHero",
    description:"Pawnshop management platform for managing customers, transactions, referrals, reporting, and operational workflows.",
    image:`${rawAssets}/pawnhero-home.png`,
    features:["Customer Portal","CMS","Referral Management","Dashboard","Reports"],
    technologies:["React","Elixir","Phoenix","MySQL"],
    focus:["REST APIs","Backend architecture","Database integration","Production deployment"],
    liveUrl:"https://www.pawnhero.ph",
    caseStudy:detail("pawnshop operations","A connected platform for customer and internal pawnshop workflows."),
  },
  {
    slug:"luxein", name:"LuxeIn",
    description:"Luxury item marketplace and management platform built around dependable commerce and inventory workflows.",
    image:`${rawAssets}/luxein-home.png`,
    features:["CMS","Product Catalog","Authentication","Loan Management","Inventory"],
    technologies:["Next.js","Node.js","React","MySQL"],
    focus:["Frontend architecture","API integration","Authentication","Backend services"],
    liveUrl:"https://www.luxein.com",
    caseStudy:detail("luxury commerce","A modern product and operations platform for luxury inventory."),
  },
  {
    slug:"classquest", name:"ClassQuest",
    description:"A gamified classroom platform where teachers create learning challenges and students learn through quizzes, XP, achievements, and friendly competition.",
    image:`${rawAssets}/classquest-home.png`,
    features:["Teacher Quests","Interactive Quizzes","XP & Levels","Achievements","Class Leaderboards"],
    technologies:["Next.js","React","TypeScript","Tailwind CSS"],
    focus:["Gamified learning","Role-based workflows","Progress tracking","Responsive experience"],
    liveUrl:"https://classquest-app.vercel.app",
    caseStudy:detail("classroom learning","A focused learning platform that turns classroom activities into measurable, motivating quests."),
  },
  {
    slug:"personal-portfolio", name:"Personal Portfolio",
    description:"A modern engineering portfolio showcasing my Full Stack and DevOps experience.",
    image:`${rawAssets}/jervz-lab-home.png`,
    features:["Responsive UI","Theme System","SEO","Accessible Motion","Case Studies"],
    technologies:["Next.js","React","TypeScript","Tailwind CSS","Framer Motion"],
    focus:["Performance","Accessibility","Responsive design","SEO"],
    repository,
    liveUrl:"https://jervz-lab.vercel.app",
    caseStudy:detail("technical storytelling","A fast, accessible portfolio that communicates end-to-end engineering ownership."),
  },
];
