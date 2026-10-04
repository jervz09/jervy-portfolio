import { createHash } from "node:crypto";
import nodemailer from "nodemailer";

const MAX_BODY_BYTES = 12_000;
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const EMAIL = /^[^\s@<>,;:"\\]+@[^\s@<>,;:"\\]+\.[^\s@<>,;:"\\]+$/;
const hasControl = (value: string) => Array.from(value).some(char => char.charCodeAt(0) < 32 || char.charCodeAt(0) === 127);

class InputError extends Error {
  readonly status: number;
  constructor(message: string, status = 400) { super(message); this.status = status; }
}

async function readBody(request: Request) {
  const reader = request.body?.getReader();
  if (!reader) throw new InputError("Please complete the contact form.");
  let size = 0;
  const chunks: Uint8Array[] = [];
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY_BYTES) {
        await reader.cancel();
        throw new InputError("Your message is too long.", 413);
      }
      chunks.push(value);
    }
    return JSON.parse(Buffer.concat(chunks).toString("utf8")) as unknown;
  } catch (error) {
    if (error instanceof InputError) throw error;
    throw new InputError("Please submit a valid contact form.");
  } finally {
    reader.releaseLock();
  }
}

function validate(body: unknown) {
  if (!body || typeof body !== "object" || Array.isArray(body)) throw new InputError("Please complete the contact form.");
  const input = body as Record<string, unknown>;
  if (input.website !== undefined && (typeof input.website !== "string" || input.website !== "")) {
    throw new InputError("Unable to submit this form.");
  }
  if (![input.name, input.email, input.message].every(value => typeof value === "string")) {
    throw new InputError("Please complete all fields.");
  }
  const name = (input.name as string).trim();
  const email = (input.email as string).trim();
  const message = (input.message as string).trim();
  if (name.length < 2 || name.length > 100 || hasControl(name)) throw new InputError("Enter a name between 2 and 100 characters.");
  if (email.length > 254 || hasControl(email) || !EMAIL.test(email)) throw new InputError("Enter a valid email address.");
  if (message.length < 10 || message.length > 1500 || message.includes("\0")) throw new InputError("Enter a message between 10 and 1,500 characters.");
  return { name, email, message };
}

function json(body: object, status = 200, headers: Record<string, string> = {}) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });
}

export function createContactHandler({
  recipient, siteUrl, env = process.env, now = Date.now,
}: { recipient: string; siteUrl: string; env?: NodeJS.ProcessEnv; now?: () => number }) {
  // Best-effort per-instance throttling; it is not a shared serverless quota.
  const attempts = new Map<string, { count: number; expires: number }>();
  return async function POST(request: Request) {
    const origin = request.headers.get("origin");
    const requestUrl = new URL(request.url);
    const allowed = new Set([new URL(siteUrl).origin, requestUrl.origin]);
    // Next.js can use an internal hostname in request.url. The Host header
    // identifies the public origin; only trust forwarded protocol on Vercel.
    const host = request.headers.get("host");
    const forwardedProtocol = env.VERCEL === "1" ? request.headers.get("x-forwarded-proto") : null;
    const protocol = forwardedProtocol === "https" ? "https:" : requestUrl.protocol;
    if (host) {
      try { allowed.add(new URL(`${protocol}//${host}`).origin); } catch { /* Invalid hosts cannot add an origin. */ }
    }
    if (!origin || !allowed.has(origin) || request.headers.get("sec-fetch-site") === "cross-site") {
      return json({ error: "Please submit the form from this website." }, 403);
    }
    if (request.headers.get("content-type")?.split(";")[0].trim() !== "application/json") {
      return json({ error: "Please submit a valid contact form." }, 415);
    }

    let input;
    try { input = validate(await readBody(request)); }
    catch (error) {
      return json({ error: error instanceof InputError ? error.message : "Please check your contact details." }, error instanceof InputError ? error.status : 400);
    }

    const user = env.GMAIL_USER?.trim();
    const pass = env.GMAIL_APP_PASSWORD?.replace(/\s/g, "");
    if (!user || !EMAIL.test(user) || hasControl(user) || !pass || !EMAIL.test(recipient)) {
      return json({ error: "The contact form is temporarily unavailable. Please use the direct email link below." }, 503);
    }

    const timestamp = now();
    for (const [key, value] of attempts) if (value.expires <= timestamp) attempts.delete(key);
    // Vercel supplies this header. On other hosts the shared fallback is deliberately conservative.
    const ip = env.VERCEL === "1" ? request.headers.get("x-vercel-forwarded-for")?.split(",")[0].trim() : undefined;
    const key = createHash("sha256").update(ip || "shared").digest("hex");
    const limit = attempts.get(key) || { count: 0, expires: timestamp + WINDOW_MS };
    if (limit.count >= MAX_ATTEMPTS || (!attempts.has(key) && attempts.size >= 2000)) {
      return json({ error: "Too many attempts. Please wait before trying again, or use the direct email link." }, 429, { "Retry-After": String(Math.max(1, Math.ceil((limit.expires - timestamp) / 1000))) });
    }
    limit.count += 1;
    attempts.set(key, limit);

    const transport = nodemailer.createTransport({
      host: "smtp.gmail.com", port: 465, secure: true,
      auth: { user, pass }, tls: { minVersion: "TLSv1.2", rejectUnauthorized: true },
      connectionTimeout: 8000, greetingTimeout: 8000, socketTimeout: 12000,
      disableFileAccess: true, disableUrlAccess: true,
    });
    try {
      const result = await transport.sendMail({
        from: { name: "Jervy Ariola Portfolio", address: user },
        to: recipient,
        replyTo: { name: input.name, address: input.email },
        subject: `Portfolio inquiry from ${input.name}`,
        text: `New portfolio contact message\n\nName: ${input.name}\nEmail: ${input.email}\n\n${input.message}`,
      });
      const accepted = result.accepted.some(address => address.toLowerCase() === recipient.toLowerCase());
      if (!accepted || result.rejected.length) throw new Error("Recipient not accepted");
      return json({ ok: true });
    } catch {
      // Do not log SMTP errors, which can contain credentials or visitor data, and do not retry an uncertain send.
      console.error("Portfolio contact: SMTP submission could not be confirmed.");
      return json({ error: "We couldn’t confirm your submission. Please use the direct email link below." }, 502);
    } finally {
      transport.close();
    }
  };
}
