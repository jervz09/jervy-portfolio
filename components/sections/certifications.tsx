import Image from "next/image";
import { ArrowUpRight, Award, BookOpen } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { SectionHeading } from "@/components/section-heading";
import { certifications } from "@/data/certifications";

const dateFormatter = new Intl.DateTimeFormat("en", {
  month: "short", day: "numeric", year: "numeric", timeZone: "UTC",
});

export function Certifications() {
  const earned = certifications
    .filter(c => c.status === "earned")
    .sort((a, b) => (b.issueDate ?? "").localeCompare(a.issueDate ?? ""));
  const learning = certifications.filter(c => c.status !== "earned");

  return (
    <section id="certifications" className="section shell scroll-mt-20">
      <SectionHeading
        eyebrow="05 / Continued learning"
        title="Certificates & cloud learning."
        description="Completed training alongside my ongoing cloud certification goals, building on hands-on application and infrastructure work."
      />
      {earned.length > 0 && <div>
        <h3 className="mb-5 text-sm font-medium">Completed credentials <span className="ml-2 font-mono text-xs text-muted">({earned.length})</span></h3>
        <div className="grid gap-4 md:grid-cols-3">
          {earned.map((c, i) => (
            <Reveal key={c.id} delay={i * .05} className="h-full">
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface">
                {c.previewImage && <div className="relative aspect-[1000/773] border-b border-line bg-white">
                  <Image src={c.previewImage} alt={`${c.name} certificate awarded to Jervy Ariola`} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-contain" />
                </div>}
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-3 text-accent">
                    <Award size={18} aria-hidden="true" className="shrink-0" />
                    <span className="text-xs font-medium">{c.kind === "course" ? "Course completion" : "Professional certification"}</span>
                  </div>
                  <h4 className="mt-5 font-semibold leading-6">{c.name}</h4>
                  <p className="mt-2 text-sm text-muted">{c.issuer}</p>
                  {c.issueDate && <p className="mt-3 text-xs text-muted">{c.kind === "course" ? "Completed" : "Issued"} <time dateTime={c.issueDate}>{dateFormatter.format(new Date(`${c.issueDate}T00:00:00Z`))}</time></p>}
                  {c.credentialId && <p className="mt-2 break-all text-xs text-muted">Credential ID: {c.credentialId}</p>}
                  {(c.certificateUrl || c.credentialUrl) && <div className="mt-auto flex flex-wrap gap-4 pt-6 text-sm">
                    {c.certificateUrl && <a href={c.certificateUrl} target="_blank" rel="noopener noreferrer" aria-label={`View certificate for ${c.name} (PDF, opens in a new tab)`} className="inline-flex items-center gap-1.5 font-medium text-accent">View certificate <span className="text-xs">(PDF)</span><ArrowUpRight size={14} aria-hidden="true" /></a>}
                    {c.credentialUrl && <a href={c.credentialUrl} target="_blank" rel="noopener noreferrer" aria-label={`Verify ${c.name} (opens in a new tab)`} className="inline-flex items-center gap-1.5 text-muted hover:text-fg">Verify credential <ArrowUpRight size={14} aria-hidden="true" /></a>}
                  </div>}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>}
      {learning.length > 0 && <div className={earned.length > 0 ? "mt-10" : ""}>
        <h3 className="text-sm font-medium">Continuing learning</h3>
        <p className="mt-2 text-sm leading-6 text-muted">Credentials I’m working toward; not yet earned.</p>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {learning.map((c, i) => <Reveal key={c.id} delay={i * .05} className="h-full">
            <article className="h-full rounded-2xl border border-dashed border-line bg-surface p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <BookOpen size={18} className="text-muted" aria-hidden="true" />
                <span className="rounded-full border border-line px-2.5 py-1 text-[10px] uppercase tracking-wider text-muted">{c.status === "pursuing" ? "Currently pursuing" : "Planned"}</span>
              </div>
              <h4 className="mt-6 font-semibold">{c.name}</h4>
              <p className="mt-2 text-sm text-muted">{c.issuer}</p>
            </article>
          </Reveal>)}
        </div>
      </div>}
    </section>
  );
}
