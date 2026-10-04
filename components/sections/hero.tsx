import {
  ArrowDownRight,
  ArrowRight,
  Cloud,
  Code2,
  Container,
  GitBranch,
  Mail,
  Server,
  ShieldCheck,
} from "lucide-react";
import { profile } from "@/data/profile";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/animations/reveal";

const flow = [
  { n: "Code", i: Code2 },
  { n: "Build", i: GitBranch },
  { n: "Test", i: ShieldCheck },
  { n: "Docker", i: Container },
  { n: "Deploy", i: Cloud },
  { n: "Monitor", i: Server },
];

export function Hero() {
  return (
    <section
      id="home"
      className="shell grid min-h-[92svh] scroll-mt-24 items-center gap-16 pb-20 pt-32 lg:grid-cols-[1.08fr_.92fr]"
    >
      <div>
        <Reveal>
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-xs text-muted">
            <span className="availability-dot size-1.5 rounded-full bg-emerald-500" />
            {profile.availability}
          </div>
          <p className="mb-4 text-sm font-medium text-accent">
            {profile.name} · {profile.title}
          </p>
          <h1 className="max-w-3xl text-balance text-5xl font-semibold leading-[1.04] tracking-[-.055em] sm:text-6xl xl:text-7xl">
            {profile.headline}
          </h1>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-7 max-w-2xl text-pretty text-lg leading-8 text-muted">
            {profile.introduction}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild>
              <a href="#projects">
                View projects <ArrowDownRight size={16} />
              </a>
            </Button>
            <Button asChild variant="secondary">
              <a href={profile.resumeUrl} download={profile.resumeFileName}>
                Download resume
              </a>
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-5 text-sm text-muted">
            {profile.socials.map((s) => (
              <a
                key={s.label}
                className="link-underline hover:text-fg"
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
              >
                {s.label}
              </a>
            ))}
          </div>
        </Reveal>
      </div>
      <Reveal delay={0.14}>
        <div className="relative mx-auto max-w-lg rounded-2xl border border-line bg-surface p-3 shadow-2xl shadow-black/10">
          <div className="rounded-xl border border-line bg-bg p-5">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs text-muted">delivery.pipeline</p>
                <p className="mt-1 text-sm font-medium">Delivery workflow</p>
              </div>
              <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] text-emerald-600 dark:text-emerald-400">
                Illustrative flow
              </span>
            </div>
            <div className="space-y-2">
              {flow.map(({ n, i: Icon }, k) => (
                <div key={n} className="group flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-lg border border-line bg-surface text-muted transition group-hover:border-accent/40 group-hover:text-accent">
                    <Icon size={16} />
                  </span>
                  <div className="h-px flex-1 overflow-hidden bg-line">
                    <span
                      className="block h-full origin-left bg-accent/60 animate-[progress_3s_ease-in-out_infinite]"
                      style={{ animationDelay: `${k * 0.2}s` }}
                    />
                  </div>
                  <span className="w-16 text-right font-mono text-xs text-muted">
                    {n}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-5 grid grid-cols-3 gap-2">
              {[
                ["REST APIs", "backend"],
                ["AWS / GCP", "cloud"],
                ["CI/CD", "delivery"],
              ].map((x) => (
                <div
                  key={x[1]}
                  className="rounded-lg border border-line bg-surface p-3"
                >
                  <p className="text-sm font-semibold">{x[0]}</p>
                  <p className="mt-1 text-[10px] text-muted">{x[1]}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute -bottom-5 -left-5 hidden items-center gap-3 rounded-xl border border-line bg-bg px-4 py-3 shadow-xl sm:flex">
            <Mail size={15} className="text-accent" />
            <span className="text-xs text-muted">
              Application code to production
            </span>
            <ArrowRight size={14} />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
