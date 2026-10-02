import { ArrowUpRight, Download, Mail } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { profile } from "@/data/profile";
import { Button } from "@/components/ui/button";
import { ContactForm } from "./contact-form";

export function Contact() {
  return <section id="contact" className="section scroll-mt-20 border-t border-line bg-surface">
    <div className="shell grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[.18em] text-accent">06 / Contact</p>
        <h2 className="mt-5 text-balance text-4xl font-semibold tracking-[-.04em] sm:text-5xl">{profile.contactHeadline}</h2>
        <p className="mt-5 max-w-md text-lg leading-8 text-muted">{profile.contactDescription}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild><a href={`mailto:${profile.email}`}>Email me <Mail size={15}/></a></Button>
          <Button asChild variant="secondary"><a href={profile.resumeUrl} download={profile.resumeFileName}>Download resume <Download size={15}/></a></Button>
        </div>
        <a href={`mailto:${profile.email}`} className="mt-5 inline-flex items-center gap-2 text-sm font-medium">{profile.email}</a>
        <div className="mt-8 flex flex-wrap gap-5">{profile.socials.filter(s => s.href.startsWith("https:")).map(s => <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-muted hover:text-fg">{s.label}<ArrowUpRight size={13}/></a>)}</div>
      </Reveal>
      <Reveal delay={.08}><ContactForm/></Reveal>
    </div>
  </section>;
}
