"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
const subscribe=()=>()=>{};
export function ThemeToggle(){const {resolvedTheme,setTheme}=useTheme();const mounted=useSyncExternalStore(subscribe,()=>true,()=>false);return <button type="button" className="grid size-10 place-items-center rounded-xl border border-line bg-surface text-muted transition hover:border-strong hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent" onClick={()=>setTheme(resolvedTheme==="dark"?"light":"dark")} aria-label={mounted?`Switch to ${resolvedTheme==="dark"?"light":"dark"} theme`:"Toggle theme"}>{mounted&&resolvedTheme==="dark"?<Sun size={17}/>:<Moon size={17}/>}</button>}
