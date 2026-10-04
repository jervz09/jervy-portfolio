"use client";
import { useRef, useState, type FormEvent } from "react";
import { ArrowRight, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/profile";

type State = "idle" | "sending" | "success" | "error";
export function ContactForm() {
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState("");
  const pending = useRef(false);
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (pending.current) return;
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      setError("Please complete all fields with valid details.");
      setState("error");
      return;
    }
    const data = new FormData(form);
    pending.current = true;
    setState("sending");
    setError("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          website: data.get("website"),
        }),
        signal: AbortSignal.timeout(65_000),
      });
      const result = await response.json();
      if (!response.ok || result.ok !== true) {
        setError(
          typeof result.error === "string"
            ? result.error
            : "We couldn’t confirm your submission. Please email me directly below.",
        );
        setState("error");
        return;
      }
      form.reset();
      setState("success");
    } catch {
      setError(
        "We couldn’t confirm your submission. Please email me directly below.",
      );
      setState("error");
    } finally {
      pending.current = false;
    }
  };

  return (
    <form
      onSubmit={submit}
      className="rounded-2xl border border-line bg-surface p-6 sm:p-8"
      noValidate
      aria-busy={state === "sending"}
    >
      <fieldset
        disabled={state === "sending"}
        className="m-0 min-w-0 border-0 p-0"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="text-sm font-medium">
            Name
            <input
              name="name"
              required
              minLength={2}
              maxLength={100}
              autoComplete="name"
              className="field mt-2"
              placeholder="Your name"
            />
          </label>
          <label className="text-sm font-medium">
            Email
            <input
              name="email"
              type="email"
              required
              maxLength={254}
              autoComplete="email"
              className="field mt-2"
              placeholder="you@example.com"
            />
          </label>
        </div>
        <label className="mt-5 block text-sm font-medium">
          Message
          <textarea
            name="message"
            required
            minLength={10}
            maxLength={1500}
            rows={5}
            className="field mt-2 resize-none"
            placeholder="Tell me about the role, team, or project."
          />
        </label>
        <div className="hidden" aria-hidden="true">
          <label>
            Leave this empty
            <input name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
        {state === "error" && (
          <p
            role="alert"
            className="mt-3 text-sm leading-6 text-red-600 dark:text-red-400"
          >
            {error}
          </p>
        )}
        <Button className="mt-6" type="submit" disabled={state === "sending"}>
          {state === "sending" ? (
            <>
              Sending… <LoaderCircle size={15} className="animate-spin" />
            </>
          ) : (
            <>
              Send message <ArrowRight size={15} />
            </>
          )}
        </Button>
      </fieldset>
      <p className="mt-4 text-xs leading-5 text-muted">
        Your details will be emailed to me so I can respond. You can also email{" "}
        <a href={`mailto:${profile.email}`} className="underline">
          {profile.email}
        </a>{" "}
        directly.
      </p>
      {state === "success" && (
        <p role="status" className="mt-4 text-sm leading-6 text-muted">
          Thank you. Your message has been accepted for sending. I’ll reply to
          the email address you provided.
        </p>
      )}
    </form>
  );
}
