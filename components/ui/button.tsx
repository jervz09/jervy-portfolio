import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
const variants=cva("group inline-flex h-11 items-center justify-center gap-2 rounded-xl px-5 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-50",{variants:{variant:{primary:"bg-fg text-bg hover:-translate-y-0.5 hover:shadow-lg",secondary:"border border-line bg-surface text-fg hover:border-strong hover:bg-elevated",ghost:"text-muted hover:bg-elevated hover:text-fg"}},defaultVariants:{variant:"primary"}});
type Props=ButtonHTMLAttributes<HTMLButtonElement>&VariantProps<typeof variants>&{asChild?:boolean};
export function Button({asChild,variant,className,...props}:Props){const C=asChild?Slot:"button";return <C className={cn(variants({variant}),className)} {...props}/>}
