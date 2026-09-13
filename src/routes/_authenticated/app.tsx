import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { BellRing, LogOut, Plane } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/app")({
  head: () => ({ meta: [
    { title: "Dashboard — Flight Price Notifier" },
    { name: "description", content: "查看你的 Flight Price Notifier 航線追蹤狀態。" },
    { property: "og:title", content: "Dashboard — Flight Price Notifier" },
    { property: "og:description", content: "你的機票降價通知儀表板。" },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: AppPage,
});

function AppPage() {
  const { user } = Route.useRouteContext();
  const navigate = useNavigate(); const queryClient = useQueryClient();
  async function signOut() {
    await queryClient.cancelQueries(); queryClient.clear(); await supabase.auth.signOut();
    navigate({ to: "/signin", replace: true });
  }
  return <div className="min-h-screen bg-background">
    <header className="border-b border-border bg-card/50"><div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8"><div className="flex items-center gap-2.5 font-semibold"><span className="flex size-9 items-center justify-center rounded-md bg-accent-soft text-primary"><Plane className="size-4" /></span><span className="hidden sm:inline">Flight Price Notifier</span></div><Button variant="glass" onClick={signOut}><LogOut /> Sign Out / 登出</Button></div></header>
    <main className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
      <p className="text-sm font-semibold uppercase text-primary">Dashboard</p>
      <h1 className="mt-3 break-words text-3xl font-bold text-foreground sm:text-5xl">Hi {user.email}</h1>
      <section className="mt-10 max-w-3xl border border-border bg-surface-raised p-7 sm:p-10">
        <span className="flex size-12 items-center justify-center rounded-md bg-accent-soft text-primary"><BellRing className="size-6" /></span>
        <h2 className="mt-8 text-2xl font-bold leading-relaxed text-foreground">你的航線追蹤儀表板即將上線 — 下一個里程碑會加上訂閱航線的功能。</h2>
        <p className="mt-4 leading-7 text-muted-foreground">Your dashboard is coming soon. Route-subscription will be added in the next milestone.</p>
      </section>
    </main>
  </div>;
}