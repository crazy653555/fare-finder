import { Link, createFileRoute } from "@tanstack/react-router";
import { BellRing, CircleDollarSign, Plane, Radar, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Flight Price Notifier — 機票降價通知" },
      { name: "description", content: "設定台北出發航線與目標價，票價達標時立即收到 email 通知。" },
      { property: "og:title", content: "Flight Price Notifier — 機票降價通知" },
      { property: "og:description", content: "設定航線與目標價，機票降價就通知你。" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const features = [
    { icon: Radar, title: "盯緊熱門航線", english: "Always-on route watching", copy: "持續監控台北出發的熱門航線（東京、首爾），自動抓最低票價。" },
    { icon: BellRing, title: "達標自動通知", english: "Target-price email alerts", copy: "低於你設定的目標價，就寄 email 提醒你，附上立即訂購連結。" },
    { icon: X, title: "隨時取消", english: "Cancel anytime", copy: "月訂閱制，不想用隨時停，沒有綁約。" },
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-background">
      <header className="relative z-20 mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link to="/" className="flex items-center gap-2.5 font-semibold text-foreground">
          <span className="flex size-9 items-center justify-center rounded-md border border-primary/30 bg-accent-soft text-primary"><Plane className="size-4" /></span>
          <span className="hidden sm:inline">Flight Price Notifier</span>
        </Link>
        <Button variant="glass" asChild><Link to="/signin">Sign in / 登入</Link></Button>
      </header>

      <main>
        <section className="relative mx-auto flex min-h-[calc(100svh-12rem)] max-w-7xl items-center px-5 pb-16 pt-10 sm:px-8 sm:pb-24">
          <div className="flight-grid pointer-events-none absolute inset-0 opacity-50" />
          <div className="absolute right-[8%] top-[16%] h-px w-[42%] rotate-[-12deg] bg-primary/35" />
          <div className="fade-up relative z-10 max-w-4xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-accent-soft px-3 py-1.5 text-xs font-medium text-primary">
              <CircleDollarSign className="size-3.5" /> TPE fares, watched around the clock
            </div>
            <h1 className="max-w-4xl text-5xl font-extrabold leading-[1.04] text-foreground sm:text-7xl lg:text-8xl">
              Flight Price<br /><span className="text-primary">Notifier</span>
            </h1>
            <p className="mt-8 max-w-2xl text-2xl font-semibold leading-relaxed text-foreground sm:text-3xl">設定航線與目標價，機票降價就通知你</p>
            <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">Set a route and a target price — we email you when the fare drops.</p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button variant="hero" size="lg" asChild><Link to="/signup">開始追蹤票價 <span aria-hidden="true">→</span></Link></Button>
              <span className="text-sm text-muted-foreground">台北出發 · 東京 / 首爾</span>
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-card/40 px-5 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 flex items-end justify-between gap-6">
              <div><p className="text-sm font-semibold uppercase text-primary">How it works</p><h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">便宜機票，不用每天自己找</h2></div>
              <Plane className="hidden size-8 text-muted-foreground sm:block" />
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {features.map(({ icon: Icon, title, english, copy }, index) => (
                <article key={title} className="group border border-border bg-surface-raised p-6 transition-colors hover:border-primary/45 sm:p-8">
                  <div className="mb-10 flex items-center justify-between"><span className="flex size-11 items-center justify-center rounded-md bg-accent-soft text-primary"><Icon className="size-5" /></span><span className="text-xs font-semibold text-muted-foreground">0{index + 1}</span></div>
                  <h3 className="text-xl font-bold text-foreground">{title}</h3>
                  <p className="mt-1 text-sm font-medium text-primary">{english}</p>
                  <p className="mt-5 leading-7 text-muted-foreground">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <span>© 2026 Flight Price Notifier</span><span>Made for flexible travelers from Taipei.</span>
      </footer>
    </div>
  );
}
