"use client";
import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/profile";

export function ContactForm() {
  const [state, setState] = useState<"idle" | "draft" | "error">("idle");
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      setState("error");
      return;
    }
    const data = new FormData(form);
    const subject = `Engineering opportunity — ${String(data.get("name")).trim()}`;
    const body = `${String(data.get("message")).trim()}\n\nFrom: ${String(data.get("name")).trim()}\nReply to: ${String(data.get("email")).trim()}`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setState("draft");
  };

  return <form onSubmit={submit} className="rounded-2xl border border-line bg-surface p-6 sm:p-8" noValidate>
    <div className="grid gap-5 sm:grid-cols-2">
      <label className="text-sm font-medium">Name<input name="name" required minLength={2} maxLength={100} autoComplete="name" className="field mt-2" placeholder="Your name"/></label>
      <label className="text-sm font-medium">Email<input name="email" type="email" required maxLength={254} autoComplete="email" className="field mt-2" placeholder="you@example.com"/></label>
    </div>
    <label className="mt-5 block text-sm font-medium">Message<textarea name="message" required minLength={10} maxLength={1500} rows={5} className="field mt-2 resize-none" placeholder="Tell me about the role, team, or project."/></label>
    {state === "error" && <p role="alert" className="mt-3 text-xs text-red-500">Please complete all fields with valid details.</p>}
    <Button className="mt-6" type="submit">Open email draft <ArrowRight size={15}/></Button>
    <p className="mt-4 text-xs leading-5 text-muted">Opens your email app with a draft to review and send. You can also email me directly at <a href={`mailto:${profile.email}`} className="underline">{profile.email}</a>.</p>
    {state === "draft" && <p role="status" className="mt-4 text-sm leading-6 text-muted">Continue in your email app to send your message. If it didn’t open, email me directly or connect on LinkedIn. Your message has not been sent by this website.</p>}
  </form>;
}
