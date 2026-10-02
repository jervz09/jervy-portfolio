import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { profile } from "@/data/profile";

export function generateStaticParams() { return projects.map(project => ({ slug: project.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find(item => item.slug === slug);
  if (!project) return {};
  const title = `${project.name} | Engineering case study`;
  const description = project.description;
  const url = `/projects/${project.slug}`;
  return {
    title, description, alternates: { canonical: url },
    openGraph: { title: `${title} | ${profile.name}`, description, url, type: "article", ...(project.image ? { images: [{ url: project.image, alt: `${project.name} website preview` }] } : {}) },
    twitter: { card: project.image ? "summary_large_image" : "summary", title, description, ...(project.image ? { images: [project.image] } : {}) },
    ...(project.featured === false ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find(item => item.slug === slug);
  if (!project) notFound();
  const sections = [
    ["Overview", project.caseStudy.overview],
    ["Business / user need", project.caseStudy.problem],
    ["My role", project.caseStudy.role],
    ["Technical work", project.caseStudy.technicalWork],
    ["Engineering considerations", project.caseStudy.engineeringContext],
    ["Deployment & operations", project.caseStudy.deployment],
  ].filter(([, content]) => Boolean(content));

  return <main className="shell py-12 sm:py-20">
    <Link href="/#projects" className="inline-flex items-center gap-2 text-sm text-muted hover:text-fg"><ArrowLeft size={15}/>Back to projects</Link>
    <header className="mt-16 max-w-3xl">
      <p className="font-mono text-xs uppercase tracking-[.18em] text-accent">{project.featured === false ? "Project overview" : "Case study"}</p>
      <h1 className="mt-5 text-5xl font-semibold tracking-[-.05em] sm:text-7xl">{project.name}</h1>
      <p className="mt-6 text-xl leading-8 text-muted">{project.description}</p>
      {project.technologies.length > 0 && <div className="mt-7"><h2 className="text-xs uppercase tracking-wider text-muted">Technologies</h2><div className="mt-3 flex flex-wrap gap-2">{project.technologies.map(technology => <span key={technology} className="rounded-lg border border-line bg-surface px-3 py-1.5 text-xs text-muted">{technology}</span>)}</div></div>}
      <div className="mt-7 flex flex-wrap gap-5 text-sm">
        {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">Live site <ArrowUpRight size={15}/></a>}
        {project.repository && <a href={project.repository} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">GitHub <ArrowUpRight size={15}/></a>}
      </div>
    </header>
    <div className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">{sections.map(([heading, content], index) => <section key={heading} className={`bg-bg p-7 sm:p-9 ${index === 0 ? "sm:col-span-2" : ""}`}>
      <p className="font-mono text-[10px] text-accent">{String(index + 1).padStart(2, "0")}</p>
      <h2 className="mt-5 text-xl font-semibold">{heading}</h2>
      <p className="mt-3 max-w-2xl leading-7 text-muted">{content}</p>
    </section>)}</div>
    <div className="mt-12 flex flex-wrap gap-5 text-sm">
      <Link href="/#contact" className="font-medium text-accent">Discuss an engineering opportunity</Link>
      <a href={profile.resumeUrl} download={profile.resumeFileName}>Download resume</a>
    </div>
  </main>;
}
