import test from "node:test";
import assert from "node:assert/strict";
import nodemailer from "nodemailer";
import { createContactHandler } from "../lib/contact.ts";

const recipient = "owner@example.com";
const env = { GMAIL_USER: "sender@gmail.com", GMAIL_APP_PASSWORD: "abcd efgh ijkl mnop", VERCEL: "1" };
const valid = { name: "Recruiter & Team", email: "recruiter@example.com", message: "I would like to discuss a backend engineering role.", website: "" };
const options = { recipient, siteUrl: "https://portfolio.example.com", env };
const request = (body = valid, headers = {}) => new Request("https://portfolio.example.com/api/contact", {
  method: "POST", headers: { origin: "https://portfolio.example.com", "content-type": "application/json", "x-vercel-forwarded-for": "203.0.113.1", ...headers }, body: JSON.stringify(body),
});
function stub(t, send = async () => ({ accepted: [recipient], rejected: [] })) {
  const calls = [];
  const close = t.mock.fn();
  const factory = t.mock.method(nodemailer, "createTransport", config => ({
    sendMail: async message => { calls.push({ config, message }); return send(message); }, close,
  }));
  t.mock.method(console, "error", () => {});
  return { calls, close, factory };
}

test("sends to the fixed inbox with authenticated sender and visitor Reply-To", async t => {
  const transport = stub(t);
  const response = await createContactHandler(options)(request({ ...valid, to: "attacker@example.com", from: "spoof@example.com" }));
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true });
  assert.equal(response.headers.get("cache-control"), "no-store");
  const { config, message } = transport.calls[0];
  assert.equal(config.host, "smtp.gmail.com"); assert.equal(config.secure, true); assert.equal(config.tls.rejectUnauthorized, true);
  assert.equal(config.auth.pass, "abcdefghijklmnop");
  assert.equal(message.from.address, env.GMAIL_USER); assert.equal(message.to, recipient);
  assert.equal(message.replyTo.address, valid.email); assert.equal(message.replyTo.name, valid.name);
  assert.ok(message.text.includes(valid.message)); assert.equal(message.html, undefined);
  assert.equal(transport.close.mock.callCount(), 1);
});

test("missing credentials returns unavailable without claiming success or connecting", async t => {
  const transport = stub(t);
  const response = await createContactHandler({ ...options, env: {} })(request());
  assert.equal(response.status, 503); assert.equal((await response.json()).ok, undefined);
  assert.equal(transport.factory.mock.callCount(), 0);
});

test("invalid fields, header injection, arrays, and honeypot submissions never send", async t => {
  const transport = stub(t);
  const handler = createContactHandler(options);
  for (const payload of [null, [], {}, { ...valid, name: "  " }, { ...valid, name: "Recruiter\r\nBcc: other@example.com" }, { ...valid, email: "not-an-email" }, { ...valid, email: "a@example.com\r\nBcc: b@example.com" }, { ...valid, message: "short" }, { ...valid, message: "x".repeat(1501) }, { ...valid, website: "https://bot.example.com" }]) {
    assert.equal((await handler(request(payload))).status, 400);
  }
  assert.equal(transport.factory.mock.callCount(), 0);
});

test("cross-origin, missing-origin, and non-JSON requests are rejected", async t => {
  const transport = stub(t);
  const handler = createContactHandler(options);
  assert.equal((await handler(request(valid, { origin: "https://attacker.example.com" }))).status, 403);
  assert.equal((await handler(request(valid, { "sec-fetch-site": "cross-site" }))).status, 403);
  const missing = request(); missing.headers.delete("origin");
  assert.equal((await handler(missing)).status, 403);
  assert.equal((await handler(request(valid, { "content-type": "text/plain" }))).status, 415);
  assert.equal(transport.factory.mock.callCount(), 0);
});

test("malformed JSON and oversized streamed requests are rejected before SMTP", async t => {
  const transport = stub(t);
  const handler = createContactHandler(options);
  const headers = { origin: "https://portfolio.example.com", "content-type": "application/json" };
  assert.equal((await handler(new Request("https://portfolio.example.com/api/contact", { method: "POST", headers, body: "{" }))).status, 400);
  assert.equal((await handler(request({ ...valid, message: "x".repeat(13000) }))).status, 413);
  assert.equal(transport.factory.mock.callCount(), 0);
});

test("SMTP rejection never yields a success response", async t => {
  const transport = stub(t, async () => ({ accepted: [], rejected: [recipient] }));
  const response = await createContactHandler(options)(request());
  assert.equal(response.status, 502); assert.equal((await response.json()).ok, undefined);
  assert.equal(transport.calls.length, 1); assert.equal(transport.close.mock.callCount(), 1);
});

test("SMTP failures do not leak secrets or retry uncertain sends", async t => {
  const transport = stub(t, async () => { throw new Error("secret-password and private-message"); });
  const response = await createContactHandler(options)(request());
  assert.equal(response.status, 502);
  const body = await response.text();assert.ok(!body.includes("secret-password"));assert.ok(!body.includes("private-message"));
  assert.equal(transport.calls.length, 1); assert.equal(transport.close.mock.callCount(), 1);
});

test("throttles attempts per client and permits submissions after the window expires", async t => {
  const transport = stub(t);
  let time = 1000;
  const handler = createContactHandler({ ...options, now: () => time });
  for (let i = 0; i < 5; i++) assert.equal((await handler(request())).status, 200);
  const limited = await handler(request());assert.equal(limited.status, 429);assert.equal(limited.headers.get("retry-after"), "900");
  assert.equal(transport.calls.length, 5);
  assert.equal((await handler(request(valid, { "x-vercel-forwarded-for": "203.0.113.2" }))).status, 200);
  time += 15 * 60 * 1000;
  assert.equal((await handler(request())).status, 200);
});

test("counts failed SMTP attempts toward the throttle", async t => {
  const transport = stub(t, async () => { throw new Error("SMTP failure"); });
  const handler = createContactHandler(options);
  for (let i = 0; i < 5; i++) assert.equal((await handler(request())).status, 502);
  assert.equal((await handler(request())).status, 429);assert.equal(transport.calls.length, 5);
});

test("same-origin preview requests work without changing the fixed recipient", async t => {
  stub(t);
  const preview = new Request("https://preview.example.com/api/contact", { method: "POST", headers: { origin: "https://preview.example.com", "content-type": "application/json" }, body: JSON.stringify(valid) });
  assert.equal((await createContactHandler(options)(preview)).status, 200);
});


test("accepts the public Host when Next.js uses an internal request hostname", async t => {
  stub(t);
  const local = new Request("http://localhost:3102/api/contact", { method: "POST", headers: { host: "127.0.0.1:3102", origin: "http://127.0.0.1:3102", "content-type": "application/json" }, body: JSON.stringify(valid) });
  assert.equal((await createContactHandler(options)(local)).status, 200);
  const preview = new Request("http://localhost:3000/api/contact", { method: "POST", headers: { host: "preview.example.com", "x-forwarded-proto": "https", origin: "https://preview.example.com", "content-type": "application/json" }, body: JSON.stringify(valid) });
  assert.equal((await createContactHandler(options)(preview)).status, 200);
});
