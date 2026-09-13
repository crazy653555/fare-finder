import { useState, type FormEvent } from "react";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { LoaderCircle, LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthField, AuthLayout } from "@/components/auth-layout";
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
