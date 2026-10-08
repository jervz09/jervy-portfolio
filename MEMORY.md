# Portfolio Maintenance Map

Last source check: 2026-10-08. Read this before exploring the repository, then
verify the relevant source and current Git state. This is a navigation guide,
not proof of the current deployment or an instruction to publish changes.

## Project and Working Rules

- Repository: `/home/ph-admin/development/jervy-portfolio`.
- Stack: Next.js App Router, React, TypeScript, Tailwind CSS, Framer Motion,
  Lucide icons, and next-themes. Check `package.json` for current versions.
- Preserve the existing visual identity, animations, responsive behavior,
  reduced-motion support, and component structure. Do not rebuild from scratch.
- Prefer content changes in `data/`. Some section copy still lives directly in
  components, so inspect the corresponding renderer when wording is missing.
- Never invent achievements, metrics, credentials, screenshots, or links.
- Check `git status --short` and `git branch --show-current` first. Preserve
  existing user changes. Commit, push, and deploy only when requested.
- Do not store secrets or environment variable values in this document.

## Where to Make Changes

| Request | Start Here | Rendering or Related Files |
| --- | --- | --- |
| Name, headline, bio, contact details, social links | `data/profile.ts` | `components/sections/hero.tsx`, `about.tsx`, `contact.tsx`; `components/layout/footer.tsx` |
| Career history | `data/experience.ts` | `components/sections/experience.tsx` |
| Projects and case studies | `data/projects.ts` | `components/sections/projects.tsx`, `app/projects/[slug]/page.tsx` |
| Skills | `data/skills.ts` | `components/sections/skills.tsx`, `tech-stack.tsx` |
| Cloud and DevOps presentation | `components/sections/devops.tsx` | `data/profile.ts`, `data/skills.ts` |
| Badges, certificates, learning goals | `data/certifications.ts` | `components/sections/certifications.tsx`, `types/index.ts` |
| Navigation and section order | `components/layout/navbar.tsx`, `app/page.tsx` | Section IDs must match anchor links |
| Colors, typography, shared layout | `app/globals.css`, `app/layout.tsx` | `components/section-heading.tsx`, `components/ui/button.tsx` |
| Theme and reveal animations | `components/layout/theme-provider.tsx`, `theme-toggle.tsx` | `components/animations/reveal.tsx` |
| SEO, canonical URL, social metadata | `data/seo.ts` | `app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts` |
| Resume content and download | `public/Resume - Jervy Ariola.pdf` | `data/profile.ts`, `app/resume/route.ts` |
| Contact form | `components/sections/contact-form.tsx` | `app/api/contact/route.ts`, `lib/`, `tests/contact.test.mjs`, `scripts/check-contact.mjs` |

## Badges and Certificates

The `Certification` type in `types/index.ts` and the list in
`data/certifications.ts` drive the `#certifications` section.

- `kind`: `badge`, `course`, or `certification`. Training badges and course
  completions must not be described as professional exam certifications.
- `status`: `earned`, `pursuing`, or `planned`.
- Earned badges appear above completed certificates; learning goals appear
  separately. Earned entries are sorted by `issueDate` descending.
- Use exact names, issuers, and documented dates (`YYYY-MM-DD`).
- Badge artwork lives in `public/badges/`; reference it as `/badges/file.png`.
- Certificate PDFs and previews live in `public/certificate/`; public URLs omit
  the `public` directory.
- `credentialUrl` links to the issuer's public verification page;
  `certificateUrl` links to the certificate PDF. Both open in a new tab.
- Adding an asset alone does not create a card. Add its data entry too.
- For new credentials, inspect the supplied issuer page, verify the award,
  download the original artwork, and add the entry without changing the renderer
  unless the requested presentation requires it.

Badges added on 2026-10-08, verified against the supplied public pages:

| Badge | Issued | Public Verification |
| --- | --- | --- |
| AWS Cloud Quest: Cloud Practitioner - Training Badge | 2026-10-08 | https://www.credly.com/badges/72279524-561c-4553-9bad-657655d8d390/public_url |
| Gemini for end-to-end SDLC | 2026-10-05 | https://www.skills.google/public_profiles/1d00f5f8-eaed-4387-b303-77207dd9dcdb/badges/28663498 |
| Gemini for Application Developers | 2026-10-05 | https://www.skills.google/public_profiles/1d00f5f8-eaed-4387-b303-77207dd9dcdb/badges/28663302 |

## Resume and Contact Details That Are Easy to Miss

- `profile.resumeUrl` points to `/resume`. The route currently fetches the PDF
  from this repository's GitHub `main` branch, with a 24-hour revalidation period.
  Replacing a local PDF does not immediately change what this route downloads.
  Verify the source URL and caching when changing resume delivery.
- Preserve the exact download filename: `Resume - Jervy Ariola.pdf`.
- The contact form is implemented with Gmail SMTP, not a demo. Read `README.md`
  for setup. `GMAIL_USER` and `GMAIL_APP_PASSWORD` are server-only settings.
- Contact tests use a stubbed transport. `npm run check:contact` checks SMTP
  connectivity/authentication without sending mail. A real form submission
  sends email; do not use it casually as a smoke test.
- `NEXT_PUBLIC_SITE_URL` overrides the canonical URL; otherwise SEO uses
  `profile.website`. Local validation does not prove live deployment behavior.

## Local Verification

The shell previously defaulted to Node 14, which is too old for this project.
Use an installed modern Node runtime. This path worked on 2026-10-08; confirm
availability before reuse:

```bash
export PATH=/home/ph-admin/.nvm/versions/node/v26.5.1/bin:$PATH
node --version
npm run typecheck
npm run lint
git diff --check
```

- For deployment validation, run `npm run build`; `npm run build -- --webpack`
  is a previously useful fallback for environment-specific Turbopack failures.
- For contact changes, also run `npm run test:contact`.
- Start a preview on a free port, for example `npm run dev -- --port 3015`.
  Do not assume an old preview is still running or belongs to this checkout.
- Inspect the changed section in a browser on desktop and mobile. For badges,
  verify artwork loads, text fits, and verification links match the supplied URLs.
- The 2026-10-08 badge change passed typecheck, lint, diff checks, and desktop/
  mobile browser inspection. A production build and deployment were not verified
  for that change. Re-run checks appropriate to subsequent edits.
- The installed Next.js preview generated `AGENTS.md`, `CLAUDE.md`, and changed
  `next-env.d.ts`. Inspect these before attributing them to user edits; do not
  overwrite pre-existing files or include unrelated generated changes blindly.

## Keeping This Useful

When the user requests a memory update, record stable file locations, behavior,
and verified constraints here. Avoid treating branch names, running ports,
working-tree status, or previous test results as permanently current facts.
