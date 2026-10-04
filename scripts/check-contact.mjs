import nodemailer from "nodemailer";

const user = process.env.GMAIL_USER?.trim();
const pass = process.env.GMAIL_APP_PASSWORD?.replace(/\s/g, "");
if (!user || !pass) {
  console.error(
    "Set GMAIL_USER and GMAIL_APP_PASSWORD in .env.local first. No email was sent.",
  );
  process.exitCode = 1;
} else {
  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass },
    tls: { minVersion: "TLSv1.2", rejectUnauthorized: true },
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 12000,
  });
  try {
    await transport.verify();
    console.log(
      "Gmail SMTP authentication and connectivity verified. No email was sent; inbox delivery has not been tested.",
    );
  } catch {
    console.error(
      "Gmail SMTP verification failed. Check the app password, 2-Step Verification, and outbound SMTP access. No email was sent.",
    );
    process.exitCode = 1;
  } finally {
    transport.close();
  }
}
