# Jervy Ariola — Portfolio

Production portfolio built with Next.js App Router, React, TypeScript, Tailwind CSS, Framer Motion, Lucide, and shadcn-style UI primitives.

```bash
npm install
npm run dev
```

Personal content is centralized in `data/`. SEO defaults to `https://jervz-lab.vercel.app`; set `NEXT_PUBLIC_SITE_URL` to override the canonical site URL before deployment. The contact form submits to `/api/contact`, which sends through Gmail SMTP after the server-only credentials below are configured. The downloadable PDF resume is stored at `public/Resume - Jervy Ariola.pdf`.

## Contact form: Gmail SMTP

The form sends a plain-text notification to the address in `data/profile.ts` (currently `jervyariola@gmail.com`). The Gmail account is the sender; the visitor’s address is Reply-To. Visitors cannot choose recipients, and no automatic reply is sent to them.

### Vercel setup

1. Enable Google 2-Step Verification, then create a Google Account app password: https://support.google.com/accounts/answer/185833. Use an app password, not your normal Google password.
2. Open the portfolio project in Vercel → Settings → Environment Variables. Add:

   | Name                 | Value                                               |
   | -------------------- | --------------------------------------------------- |
   | `GMAIL_USER`         | `jervyariola@gmail.com`                             |
   | `GMAIL_APP_PASSWORD` | Your Gmail app password, saved as a sensitive value |

3. Enable them for Production. Add Preview/Development only if those environments should also send real mail. Never use a `NEXT_PUBLIC_` prefix for credentials.
4. Redeploy after saving the variables. The endpoint returns HTTP 503 if credentials are missing; it never pretends to send successfully.
5. Submit a message from the deployed portfolio and check the receiving inbox and spam folder. A successful form response means Gmail accepted the message for sending, not proof of inbox delivery.

### Local setup and verification

Use Node.js 24 or newer for the included verification scripts. Copy `.env.example` to `.env.local` only if `.env.local` does not already exist; otherwise add the two Gmail variables to that file. It is ignored by Git. Restart the local server after changing credentials.

- `npm run check:contact`: verifies Gmail SMTP authentication and connectivity using `.env.local`; does **not** send a message and does not print credentials.
- `npm run test:contact`: tests validation, fixed-recipient delivery, provider errors, and throttling with a stubbed transport; sends no real email.

Implementation: Node.js route handler → Nodemailer → `smtp.gmail.com:465` over verified TLS. The handler bounds request size, validates input, checks request origin, rejects a honeypot field, and limits attempts. SMTP credentials and message content are not logged or exposed to the browser. Errors retain form input; uncertain submissions are not automatically retried.

Throttling is best-effort in memory (five attempts per 15 minutes per Vercel-provided client IP, or a shared bucket on other hosts). It resets on cold starts and is not a distributed quota. For stronger abuse controls, configure a platform rate-limit rule on `/api/contact` or add a shared limiter. Gmail account limits and authentication policies still apply.

## Certificates and learning goals

Edit `data/certifications.ts` to manage the section. Cards, counts, links, and groups render from this list; completed credentials are sorted by issue date, newest first. No component edits are needed for new entries. Files placed in `public/certificate/` are public assets; adding a file alone does not create a card.

1. Save the original certificate PDF with a URL-safe filename (for example, `public/certificate/AWS/course-name.pdf`). An optional first-page PNG preview can sit beside it.
2. Add an entry with a unique `id`, the exact certificate `name`, `issuer`, and `kind`: `course` for course completion or `certification` for a professional credential. A course named "Solutions Architect" is still a course completion unless the credential itself establishes a professional certification.
3. Set `status` to `earned` only after completion. Add the documented `issueDate` in `YYYY-MM-DD` format and `certificateUrl` starting with `/certificate/` (omit `public`). Add `previewImage`, `credentialId`, and the issuer's `credentialUrl` only when available.
4. Use `pursuing` for an active learning goal or `planned` for a future goal. These appear separately without certificate or verification links. When earned, update the same entry with its exact credential title, date, and evidence.
5. Run `npm run typecheck`, `npm run lint`, and the build before deploying. Commit the data and associated PDF/preview files together.

The current Google Cloud and Azure entries intentionally have general names until a specific course or exam is confirmed. The AWS entries are course completion certificates, not AWS Certified exam credentials.
