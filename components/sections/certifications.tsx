import { Award } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { SectionHeading } from "@/components/section-heading";
import { certifications } from "@/data/certifications";
export function Certifications() {
  return (
    <section id="certifications" className="section shell scroll-mt-20">
      <SectionHeading
        eyebrow="05 / Continued learning"
        title="Cloud learning roadmap."
        description="My current focus is deeper cloud and DevOps practice, with DevSecOps as a longer-term direction. The credentials below are learning goals, not earned certifications."
      />
      <div className="grid gap-3 md:grid-cols-3">
        {certifications.map((c, i) => (
          <Reveal key={c.name} delay={i * 0.05}>
            <article className="rounded-2xl border border-dashed border-line bg-surface p-6">
              <div className="flex items-start justify-between">
                <span className="grid size-10 place-items-center rounded-xl border border-line bg-bg text-muted">
                  <Award size={18} />
                </span>
                <span className="rounded-full border border-line px-2.5 py-1 text-[10px] uppercase tracking-wider text-muted">
                  Planned · not earned
                </span>
              </div>
              <h3 className="mt-8 font-semibold">{c.name}</h3>
              <p className="mt-2 text-sm text-muted">{c.issuer}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
