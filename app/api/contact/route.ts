import { createContactHandler } from "@/lib/contact";
import { profile } from "@/data/profile";
import { siteUrl } from "@/data/seo";

export const runtime = "nodejs";
export const maxDuration = 60;
export const POST = createContactHandler({ recipient: profile.email, siteUrl });
