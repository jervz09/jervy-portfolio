import { Reveal } from "@/components/animations/reveal";
import { SectionHeading } from "@/components/section-heading";
import { principles, profile } from "@/data/profile";
export function About() {
  return (
    <>
      <section id="about" className="section shell scroll-mt-20">
        <SectionHeading
          eyebrow="01 / About"
          title="Application development meets production operations."
        />
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <div className="space-y-5">
              {profile.about.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-pretty text-lg leading-8 text-muted"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {profile.strengths.map((x, i) => (
                <div
                  key={x}
                  className="flex items-center gap-3 border-b border-line pb-4"
                >
                  <span className="font-mono text-[10px] text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-medium">{x}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
      <section className="section shell border-y border-line">
        <SectionHeading
          eyebrow="Principles"
          title="How I approach engineering work."
        />
        <div className="grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-5">
          {principles.map(([a, b], i) => (
            <Reveal key={a}>
              <article className="min-h-48 border-b border-r border-line p-6">
                <span className="font-mono text-xs text-accent">0{i + 1}</span>
                <h3 className="mt-8 font-semibold">{a}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{b}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
