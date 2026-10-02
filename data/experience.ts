import type { Experience } from "@/types";

export const experience: Experience[] = [
  {
    role: "Full Stack Developer / DevOps", company: "PawnHero Pawnshop",
    period: "Feb 2024 – Present",
    summary: "Develop and maintain production applications while supporting the infrastructure and workflows used to deploy them.",
    achievements: [
      "Maintain backend services, REST APIs, and internal integrations using Elixir/Phoenix, Node.js, and MySQL alongside full stack application work.",
      "Support AWS and Google Cloud infrastructure, including compute, application hosting, storage, databases, and access configuration.",
      "Build and maintain CI/CD and deployment workflows with GitHub Actions and Bitbucket Pipelines; deploy and support applications using EC2, AWS Amplify, Firebase, Nginx, and PM2.",
      "Troubleshoot production issues, maintain legacy applications, and improve application and database performance while supporting ongoing business operations.",
    ],
  },
  {
    role: "Full Stack Developer", company: "PawnHero Pawnshop",
    period: "May 2023 – Feb 2024",
    summary: "Expanded from backend development into features spanning customer interfaces, internal systems, APIs, and data.",
    achievements: [
      "Developed React interfaces connected to backend services and REST APIs for business application workflows.",
      "Worked on database queries and application flows to address responsiveness and reliability issues.",
      "Integrated systems with product and engineering teams, connecting frontend behavior with backend services and relational data.",
      "Diagnosed production issues across the stack and maintained existing application features alongside new development.",
    ],
  },
  {
    role: "Backend Developer", company: "PawnHero Pawnshop",
    period: "Nov 2022 – May 2023",
    summary: "Developed the APIs and data integrations behind production pawnshop workflows.",
    achievements: [
      "Developed and maintained REST APIs supporting core pawnshop operations and internal application workflows.",
      "Integrated backend services with MySQL and maintained the data handling needed by business applications.",
      "Investigated backend defects, improved existing application paths, and supported production and legacy services.",
    ],
  },
  {
    role: "ERPNext Developer",
    period: "Jan 2022 · Returned to development",
    summary: "Customized ERPNext/Frappe business applications across backend logic, interfaces, and integrations.",
    achievements: [
      "Developed ERPNext/Frappe customizations using Python, JavaScript, and jQuery to support business workflows.",
      "Worked with MySQL and developed and integrated REST APIs connecting application workflows.",
      "Maintained and troubleshot existing ERPNext applications across frontend and backend code.",
    ],
  },
  {
    role: "Early software development experience",
    period: "Sep 2019 – 2021",
    summary: "Started professional software development in September 2019, working across web interfaces and backend business applications.",
    achievements: [
      "Worked on frontend and backend development using JavaScript, HTML/CSS, jQuery, and Python.",
      "Worked with ERPNext/Frappe, MySQL, and REST APIs in business application development.",
    ],
  },
];
