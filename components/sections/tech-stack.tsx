import { Braces,Cloud,Code2,Database,ServerCog,Workflow } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { SectionHeading } from "@/components/section-heading";
import { techStack } from "@/data/skills";
const icons=[Code2,ServerCog,Database,Cloud,Workflow,Braces];
export function TechStack(){return <section className="section shell"><SectionHeading eyebrow="Toolkit" title="Technology chosen for the job." description="A focused stack spanning product interfaces, resilient services, data, and production infrastructure."/><div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">{techStack.map((g,i)=>{const Icon=icons[i];return <Reveal key={g.category} delay={i*.03}><article className="h-full rounded-2xl border border-line bg-surface p-6 transition duration-300 hover:-translate-y-1 hover:border-strong hover:shadow-lg"><Icon size={19} className="text-accent"/><h3 className="mt-8 font-semibold">{g.category}</h3><div className="mt-4 flex flex-wrap gap-2">{g.items.map(x=><span key={x} className="rounded-lg border border-line bg-bg px-2.5 py-1.5 text-xs text-muted">{x}</span>)}</div></article></Reveal>})}</div></section>}
