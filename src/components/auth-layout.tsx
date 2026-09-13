import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Plane } from "lucide-react";
import { Input } from "@/components/ui/input";

export function AuthLayout({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-12">
    <div className="flight-grid pointer-events-none absolute inset-0 opacity-35" />
    <Link to="/" className="absolute left-5 top-6 z-10 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground sm:left-8"><ArrowLeft className="size-4" /> Home</Link>
    <section className="fade-up relative z-10 w-full max-w-md border border-border bg-card p-6 shadow-2xl sm:p-9">
      <div className="mb-8"><span className="mb-6 flex size-11 items-center justify-center rounded-md bg-accent-soft text-primary"><Plane className="size-5" /></span><h1 className="text-3xl font-bold text-foreground">{title}</h1><p className="mt-2 text-muted-foreground">{subtitle}</p></div>
      {children}
    </section>
  </main>;
}

export function AuthField(props: { id: string; label: string; type: string; value: string; onChange: (value: string) => void; autoComplete: string; minLength?: number }) {
  return <div className="space-y-2"><label htmlFor={props.id} className="text-sm font-medium text-foreground">{props.label}</label><Input id={props.id} type={props.type} value={props.value} onChange={(event) => props.onChange(event.target.value)} autoComplete={props.autoComplete} minLength={props.minLength} required className="h-11 bg-background/60" /></div>;
}