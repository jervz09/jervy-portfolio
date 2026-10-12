"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { profile } from "@/data/profile";
import { ThemeToggle } from "./theme-toggle";
const links = [
  "Home",
  "About",
  "Experience",
  "Projects",
  "Skills",
  "Certifications",
  "Contact",
];
export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) => {
        const hit = es.filter((e) => e.isIntersecting).at(-1);
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-25% 0px -65%" },
    );
    links.forEach((x) => {
      const el = document.getElementById(x.toLowerCase());
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/70 bg-bg/80 backdrop-blur-xl">
      <nav
        className="shell flex h-16 items-center justify-between"
        aria-label="Main navigation"
      >
        <a
          href="#home"
          aria-label="Go to Jervy Ariola home"
          className="group flex items-center gap-3 rounded-lg font-semibold transition-colors duration-200 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          <span className="grid size-8 place-items-center rounded-lg bg-fg text-xs text-bg shadow-sm transition duration-200 group-hover:bg-accent group-hover:shadow-md">
            JA
          </span>
          <span className="hidden transition-colors duration-200 sm:block">{profile.name}</span>
        </a>
        <div className="hidden items-center gap-1 lg:flex">
          {links.map((x) => (
            <a
              key={x}
              href={`#${x.toLowerCase()}`}
              className={`relative rounded-lg px-3 py-2 text-sm transition ${active === x.toLowerCase() ? "text-fg" : "text-muted hover:text-fg"}`}
            >
              {x}
              {active === x.toLowerCase() && (
                <motion.span
                  layoutId="nav"
                  className="absolute inset-x-3 -bottom-px h-px bg-accent"
                />
              )}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            className="group hidden h-10 items-center gap-2 rounded-xl bg-fg px-4 text-sm font-medium text-bg shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg sm:flex"
            href={profile.resumeUrl}
            download={profile.resumeFileName}
          >
            <Download size={15} className="transition-transform duration-200 group-hover:translate-y-0.5" />
            Resume
          </a>
          <button
            className="grid size-10 place-items-center rounded-xl border border-line lg:hidden"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="Toggle navigation"
          >
            {open ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-line bg-bg lg:hidden"
          >
            <div className="shell grid py-3">
              {links.map((x) => (
                <a
                  key={x}
                  onClick={() => setOpen(false)}
                  href={`#${x.toLowerCase()}`}
                  className="rounded-lg px-3 py-3 text-sm text-muted hover:bg-surface hover:text-fg"
                >
                  {x}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
