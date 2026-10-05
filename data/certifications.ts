import type { Certification } from "@/types";

// Add credentials here. Files live in public/certificate; URLs omit /public.
export const certifications: Certification[] = [
  {
    id: "aws-networking-concepts",
    name: "AWS SimuLearn: Networking Concepts",
    issuer: "AWS Training & Certification",
    kind: "course",
    status: "earned",
    issueDate: "2026-10-04",
    certificateUrl: "/certificate/AWS/aws-simulearn-networking.pdf",
    previewImage: "/certificate/AWS/aws-simulearn-networking.png",
  },
  {
    id: "aws-cloud-first-steps",
    name: "AWS SimuLearn: Cloud First Steps",
    issuer: "AWS Training & Certification",
    kind: "course",
    status: "earned",
    issueDate: "2026-10-03",
    certificateUrl: "/certificate/AWS/aws-simulearn-cloud-first-steps.pdf",
    previewImage: "/certificate/AWS/aws-simulearn-cloud-first-steps.png",
  },
  {
    id: "aws-cloud-computing-essentials",
    name: "AWS SimuLearn: Cloud Computing Essentials",
    issuer: "AWS Training & Certification",
    kind: "course",
    status: "earned",
    issueDate: "2026-10-03",
    certificateUrl: "/certificate/AWS/aws-simulearn-cloud-computing-essentials.pdf",
    previewImage: "/certificate/AWS/aws-simulearn-cloud-computing-essentials.png",
  },
  {
    id: "aws-architecting-fundamentals",
    name: "AWS Solutions Architect - Fundamentals of Architecting on AWS",
    issuer: "AWS Training & Certification",
    kind: "course",
    status: "earned",
    issueDate: "2026-10-02",
    certificateUrl: "/certificate/AWS/aws-solutions-architect-fundamentals.pdf",
    previewImage: "/certificate/AWS/aws-solutions-architect-fundamentals.png",
  },
  {
    id: "google-cloud-learning",
    name: "Google Cloud certification",
    issuer: "Google Cloud",
    kind: "certification",
    status: "pursuing",
  },
  {
    id: "azure-learning",
    name: "Microsoft Azure certification",
    issuer: "Microsoft",
    kind: "certification",
    status: "pursuing",
  },
];
