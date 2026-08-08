import type { Metadata,Viewport } from "next";
import { Geist,Geist_Mono } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "@/components/layout/theme-provider";
import "./globals.css";
const sans=Geist({subsets:["latin"],variable:"--font-geist-sans",display:"swap"});
const mono=Geist_Mono({subsets:["latin"],variable:"--font-geist-mono",display:"swap"});
const title="Jervy Ariola — Full Stack & DevOps Engineer";
const description="Full Stack & DevOps Engineer experienced in building scalable web applications, REST APIs, cloud infrastructure, and automated deployment pipelines.";
export const metadata:Metadata={metadataBase:new URL(process.env.NEXT_PUBLIC_SITE_URL||"https://jervy-portfolio.vercel.app"),title:{default:title,template:"%s — Jervy Ariola"},description,alternates:{canonical:"/"},openGraph:{title,description,type:"website",url:"/",siteName:"Jervy Ariola"},twitter:{card:"summary_large_image",title,description},icons:{icon:"/icon.svg"}};
export const viewport:Viewport={themeColor:[{media:"(prefers-color-scheme: light)",color:"#f7f7f5"},{media:"(prefers-color-scheme: dark)",color:"#111317"}]};
const schema={"@context":"https://schema.org","@type":"Person",name:"Jervy Ariola",jobTitle:"Full Stack & DevOps Engineer",email:"mailto:jervyariola@gmail.com",url:"https://jervy-portfolio.vercel.app",sameAs:["https://github.com/jervz09","https://www.linkedin.com/in/jervy-ariola"]};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" suppressHydrationWarning><body className={`${sans.variable} ${mono.variable} antialiased`}><ThemeProvider>{children}</ThemeProvider><Script id="person-schema" type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/></body></html>}
