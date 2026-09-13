import { useState, type FormEvent } from "react";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { LoaderCircle, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { AuthField, AuthLayout } from "@/components/auth-layout";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [
    { title: "Create account — Flight Price Notifier" },
    { name: "description", content: "建立 Flight Price Notifier 帳號，開始準備追蹤理想票價。" },
    { property: "og:title", content: "Create account — Flight Price Notifier" },
    { property: "og:description", content: "建立帳號，準備追蹤理想票價。" },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: SignUpPage,
});

function SignUpPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [confirm, setConfirm] = useState("");
  const [error, setError] = useState(""); const [busy, setBusy] = useState(false);
  async function submit(event: FormEvent) {
    event.preventDefault(); setError("");
    if (password !== confirm) { setError("Passwords do not match / 密碼不一致"); return; }
    setBusy(true);
    const { data, error: authError } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: window.location.origin } });
    setBusy(false);
    if (authError) { setError(authError.message); return; }
    if (!data.session) { setError("Check your email to confirm your account."); return; }
    navigate({ to: "/app", replace: true });
  }
  return <AuthLayout title="Create your account" subtitle="先建立帳號，下一個里程碑就能開始追蹤航線。">
    <form onSubmit={submit} className="space-y-5">
      <AuthField id="email" label="Email" type="email" value={email} onChange={setEmail} autoComplete="email" />
      <AuthField id="password" label="Password / 密碼" type="password" value={password} onChange={setPassword} autoComplete="new-password" minLength={8} />
      <AuthField id="confirm" label="Confirm password / 確認密碼" type="password" value={confirm} onChange={setConfirm} autoComplete="new-password" minLength={8} />
      {error && <p role="alert" className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>}
      <Button type="submit" variant="hero" size="lg" className="w-full" disabled={busy}>{busy ? <LoaderCircle className="animate-spin" /> : <UserPlus />} Sign up / 註冊</Button>
    </form>
    <p className="mt-7 text-center text-sm text-muted-foreground">已經有帳號？ <Link to="/signin" className="font-semibold text-primary hover:underline">Sign in</Link></p>
  </AuthLayout>;
}