import type { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "pawnhero",
    name: "PawnHero",
    description:
      "Production pawnshop platform connecting customer services and internal operations. My work spans backend APIs, system integrations, MySQL, legacy maintenance, and cloud delivery.",
    image: "/images/projects/pawnhero-home.png",
    features: [
      "Customer Portal",
      "CMS",
      "Referral Management",
      "Dashboard",
      "Reports",
    ],
    technologies: [
      "React",
      "Elixir",
      "Phoenix",
      "Node.js",
      "MySQL",
      "AWS",
      "Google Cloud",
      "CI/CD",
    ],
    focus: [
      "Production REST APIs",
      "Internal integrations",
      "Legacy maintenance",
      "Cloud infrastructure",
    ],
    liveUrl: "https://www.pawnhero.ph",
    caseStudy: {
      overview:
        "PawnHero is a production business platform supporting customer and internal pawnshop workflows, including customer management, transactions, referrals, dashboards, and reporting.",
      problem:
        "Customer-facing services and internal teams depend on connected application workflows and data. Changes must account for existing business processes and the applications already used in day-to-day operations.",
      role: "I develop and maintain backend services and REST APIs, work on full stack features and internal integrations, and support production applications and cloud infrastructure. My responsibilities include maintaining legacy systems and investigating production issues.",
      technicalWork:
        "Develop and maintain services using Elixir/Phoenix and Node.js, integrate REST APIs with internal systems, and work with MySQL queries and application data. Frontend work connects React interfaces to those services for customer and administrative workflows.",
      engineeringContext:
        "The engineering work extends beyond new features: tracing issues through APIs and databases, maintaining existing behavior, and supporting changes in a live business system. It combines application development with ongoing operational responsibility.",
      deployment:
        "Support AWS and Google Cloud infrastructure and CI/CD deployment workflows, including hands-on work with EC2, S3, RDS, Amplify, Compute Engine, Cloud Run, and cloud storage and databases. Maintain environments and troubleshoot production applications.",
    },
  },
  {
    slug: "luxein",
    name: "LuxeIn",
    description:
      "Luxury e-commerce and inventory platform. Frontend and backend work connects the product catalog, authentication, and internal management workflows through APIs and MySQL.",
    image: "/images/projects/luxein-home.png",
    features: [
      "CMS",
      "Product Catalog",
      "Authentication",
      "Loan Management",
      "Inventory",
    ],
    technologies: ["Next.js", "Node.js", "React", "MySQL"],
    focus: [
      "E-commerce interfaces",
      "API integration",
      "Backend services",
      "Catalog & inventory workflows",
    ],
    liveUrl: "https://www.luxein.com",
    caseStudy: {
      overview:
        "LuxeIn is a luxury item marketplace with customer-facing commerce and internal tools for product catalogs, authentication, loan management, and inventory.",
      problem:
        "Commerce and inventory operations need connected interfaces and backend data so users can browse products and internal teams can manage the information behind them.",
      role: "My work covers frontend and backend development, including application interfaces, API integration, authentication, and backend services for commerce and management workflows.",
      technicalWork:
        "Work with React and Next.js interfaces, Node.js backend services, and MySQL data. Connect product and management screens to APIs, with attention to the relationship between catalog data, inventory, and application behavior.",
      engineeringContext:
        "This project brings customer-facing commerce and internal business tools together. The technical focus is on keeping interface behavior and backend workflows connected across the application.",
    },
  },
  {
    slug: "maildesk",
    name: "MailDesk",
    description:
      "An email service application with separate company workspaces, contact management, and HTML campaigns. I built the web interface, REST API, provider integrations, and persistent campaign queue, with deployment support for Vercel and Supabase.",
    image: "/images/projects/maildesk-app-login.png",
    imageFit: "contain",
    features: [
      "Company Workspaces",
      "SES / Gmail / SMTP",
      "HTML Campaigns",
      "Contact Imports",
      "Campaign Queue",
      "Unsubscribe Management",
      "Integration API",
    ],
    technologies: [
      "JavaScript",
      "Node.js",
      "Express",
      "PostgreSQL",
      "SQLite",
      "AWS SES",
      "SMTP",
      "Supabase",
      "Vercel",
    ],
    focus: [
      "Backend & REST APIs",
      "Email provider integrations",
      "Persistent queues",
      "Serverless deployment",
    ],
    caseStudy: {
      overview:
        "MailDesk is a standalone email service application for managing company workspaces, provider connections, contacts, campaigns, and sending activity. It supports AWS SES, Gmail, and custom SMTP, with a web interface and REST API for integration with other applications.",
      problem:
        "Email campaigns involve more than sending a message: teams need to manage audiences, protect provider credentials, preview content, respect unsubscribe requests, and understand send outcomes. MailDesk brings those steps into one workflow while keeping each company’s data separate.",
      role: "I built the JavaScript web interface and Node.js/Express backend, including contact imports, campaign editing, provider integrations, authentication, and company-scoped API access. I also implemented database persistence, campaign processing, and configuration for a Vercel/Supabase deployment.",
      technicalWork:
        "Developed REST endpoints for contacts and campaigns, with idempotent campaign creation and scoped API keys. Integrated AWS SES and SMTP providers, encrypted saved provider settings, and added Google/GitHub sign-in. HTML email support includes sanitization, isolated previews, and a generated plain-text alternative.",
      engineeringContext:
        "The database-backed queue tracks recipient outcomes, applies sending limits, and checks unsubscribe suppressions before sending. Transactions coordinate workers across instances. Interrupted or uncertain sends are held for review instead of automatically retried, reducing the risk of duplicate messages without treating provider acceptance as confirmed delivery.",
      deployment:
        "Implemented separate local and serverless runtime paths: SQLite with a local worker for development, and Supabase PostgreSQL with the Express application on Vercel. The deployment configuration uses Supabase Cron to invoke an authenticated worker for bounded processing, so sending does not depend on a continuously running server process.",
    },
  },
  {
    slug: "personal-portfolio",
    name: "Jervz Lab",
    description:
      "My personal engineering portfolio, built with Next.js, React, and TypeScript. It brings project case studies, career history, and a downloadable resume into a responsive, accessible interface.",
    image: "/images/projects/jervz-lab-home.png",
    features: [
      "Responsive UI",
      "Theme System",
      "SEO",
      "Reduced-motion Support",
      "Case Studies",
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
    ],
    focus: [
      "Typed content models",
      "Reusable UI components",
      "Accessibility",
      "Search metadata",
    ],
    repository: "https://github.com/jervz09/jervy-portfolio",
    liveUrl: "https://jervz-lab.vercel.app/",
    caseStudy: {
      overview:
        "Jervz Lab is my portfolio for presenting professional application development, backend, and cloud/DevOps work alongside personal projects.",
      problem:
        "Recruiters need to understand my role, technical strengths, and project responsibilities quickly, while being able to explore individual projects and download a resume.",
      role: "I built and maintain the portfolio’s interface, reusable sections, typed content data, project routes, theme system, and search metadata.",
      technicalWork:
        "Use the Next.js App Router and TypeScript data models to generate project pages from centralized content. React components share Tailwind styling, while Framer Motion provides transitions with reduced-motion support. The site includes a PDF download route and a contact form backed by a Gmail SMTP endpoint.",
      engineeringContext:
        "Content and presentation are kept separate so career and project details can change without rebuilding the interface. Semantic sections, responsive layouts, light/dark themes, and reduced-motion support make the content usable across different devices and preferences.",
      deployment:
        "Hosted on Vercel, with page-specific metadata, canonical URLs, Person structured data, a sitemap, and robots configuration. The source is available on GitHub.",
    },
  },
  {
    slug: "classquest",
    name: "ClassQuest",
    description:
      "A classroom learning application that organizes teacher quests, quizzes, XP, achievements, and leaderboards into distinct teacher and student workflows.",
    image: "/images/projects/classquest-home.png",
    features: [
      "Teacher Quests",
      "Interactive Quizzes",
      "XP & Levels",
      "Achievements",
      "Class Leaderboards",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    focus: [
      "Role-based interfaces",
      "Learning workflows",
      "Progress presentation",
      "Responsive UI",
    ],
    liveUrl: "https://classquest-app.vercel.app",
    caseStudy: {
      overview:
        "ClassQuest is a gamified classroom application where teachers organize learning challenges and students participate through quizzes, XP, achievements, and class leaderboards.",
      problem:
        "Classroom activities and learning progress need clear interfaces for two different audiences: teachers managing challenges and students taking part in them.",
      role: "My project work focuses on the web application experience, including teacher and student workflows, learning activities, and the presentation of progress and achievements.",
      technicalWork:
        "Use Next.js, React, TypeScript, and Tailwind CSS to organize quest, quiz, and progress interfaces. The frontend presents role-based workflows and responsive screens for learning activities and class competition.",
      engineeringContext:
        "The technical emphasis is UI engineering across related workflows: making activities, progress, levels, and achievements understandable within a consistent application experience.",
    },
  },
];

export const featuredProjects = projects.filter(
  (project) => project.featured !== false,
);
