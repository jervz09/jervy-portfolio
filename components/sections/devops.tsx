"use client";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronRight, CloudCog } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { cloudExperience, pipeline } from "@/data/skills";

export function DevOps() {
  const reduced = useReducedMotion();
  return (
    <section className="section overflow-hidden border-y border-line bg-surface">
      <div className="shell">
        <SectionHeading
          eyebrow="Infrastructure"
          title="Cloud infrastructure and DevOps in practice."
          description="Hands-on AWS and Google Cloud support alongside CI/CD, deployment workflows, server maintenance, and production troubleshooting. This experience is the foundation for my continued growth into DevOps and DevSecOps."
        />
        <div className="rounded-2xl border border-line bg-bg p-5 sm:p-8">
          <div className="mb-7 flex items-center gap-3 border-b border-line pb-5">
            <span className="grid size-9 place-items-center rounded-xl bg-accent/10 text-accent">
              <CloudCog size={18} />
            </span>
            <div>
              <p className="text-sm font-medium">A typical delivery workflow</p>
              <p className="text-xs text-muted">
                Application code through deployment and support
              </p>
            </div>
            <span className="ml-auto hidden rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-600 sm:block dark:text-emerald-400">
              Illustrative flow
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-y-4">
            {pipeline.map((x, i) => (
              <div key={x} className="flex items-center">
                <motion.span
                  initial={reduced ? false : { opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.045, duration: 0.35 }}
                  className="rounded-lg border border-line bg-surface px-3 py-2 font-mono text-[11px] text-muted hover:border-accent/40 hover:text-fg"
                >
                  {x}
                </motion.span>
                {i < pipeline.length - 1 && (
                  <ChevronRight size={14} className="mx-1.5 text-accent/60" />
                )}
              </div>
            ))}
          </div>
          <div className="mt-8 h-px overflow-hidden bg-line">
            <motion.span
              className="block h-full bg-accent"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "left" }}
            />
          </div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {cloudExperience.map((group) => (
            <article
              key={group.category}
              className="rounded-2xl border border-line bg-bg p-6"
            >
              <h3 className="font-semibold">{group.category}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">
                {group.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-lg border border-line px-3 py-2 text-xs text-muted"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
