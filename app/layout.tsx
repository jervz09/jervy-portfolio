import type { Metadata,Viewport } from "next";
import { Geist,Geist_Mono } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { profile } from "@/data/profile";
import { seo, siteUrl } from "@/data/seo";
import "./globals.css";
const sans=Geist({subsets:["latin"],variable:"--font-geist-sans",display:"swap"});
const mono=Geist_Mono({subsets:["latin"],variable:"--font-geist-mono",display:"swap"});
const { title, description } = seo;
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: "%s | Jervy Ariola" },
  description,
  keywords: seo.keywords,
  authors: [{ name: profile.name, url: profile.website }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: { title, description, type: "website", url: "/", siteName: "Jervz Lab | Jervy Ariola", locale: "en_US" },
  twitter: { card: "summary", title, description },
  icons: { icon: "/icon.svg" },
};
export const viewport:Viewport={themeColor:[{media:"(prefers-color-scheme: light)",color:"#f7f7f5"},{media:"(prefers-color-scheme: dark)",color:"#111317"}]};
const schema = {
  "@context": "https://schema.org", "@type": "Person",
  name: profile.name, jobTitle: profile.title, description,
  email: `mailto:${profile.email}`, url: siteUrl,
  sameAs: [profile.github, profile.linkedin],
  knowsAbout: ["Full Stack Development", "Backend Development", "REST APIs", "ERPNext", "Frappe", "AWS", "Google Cloud", "CI/CD", "DevOps"],
};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" suppressHydrationWarning><body className={`${sans.variable} ${mono.variable} antialiased`}><ThemeProvider>{children}</ThemeProvider><Script id="person-schema" type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/></body></html>}
