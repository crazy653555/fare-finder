import { useState, type FormEvent } from "react";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, LoaderCircle, LockKeyhole, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/signin")({
  head: () => ({ meta: [
    { title: "Sign in — Flight Price Notifier" },
    { name: "description", content: "登入 Flight Price Notifier 管理你的機票降價通知。" },
    { property: "og:title", content: "Sign in — Flight Price Notifier" },
    { property: "og:description", content: "登入並管理你的航線追蹤。" },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: SignInPage,
});

function SignInPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault(); setError(""); setBusy(true);
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (authError) { setError(authError.message); return; }
    navigate({ to: "/app", replace: true });
  }

  return <AuthLayout title="Welcome back" subtitle="登入後查看你的航線追蹤狀態。">
    <form onSubmit={submit} className="space-y-5">
      <AuthField id="email" label="Email" type="email" value={email} onChange={setEmail} autoComplete="email" />
      <AuthField id="password" label="Password / 密碼" type="password" value={password} onChange={setPassword} autoComplete="current-password" minLength={6} />
      {error && <p role="alert" className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>}
      <Button type="submit" variant="hero" size="lg" className="w-full" disabled={busy}>{busy ? <LoaderCircle className="animate-spin" /> : <LockKeyhole />} Sign in / 登入</Button>
    </form>
    <p className="mt-7 text-center text-sm text-muted-foreground">還沒有帳號？ <Link to="/signup" className="font-semibold text-primary hover:underline">Create account</Link></p>
  </AuthLayout>;
}

export function AuthLayout({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
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