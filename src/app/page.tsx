import type { ReactNode } from "react";
import { MarketCard } from "@/components/market/MarketCard";
import { seedMarkets } from "@/data/markets";

const browseChips = ["New", "Trending", "Popular", "Liquid", "Ending Soon", "Competitive"];
const topicChips = ["AI", "Tech", "Education", "Milestones", "Settlement"];

export default function Home() {
  const openMarkets = seedMarkets.filter((market) => market.status === "open").length;

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-6 py-6 text-[var(--pm-ink)] md:px-10 md:py-8">
      <header className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-[var(--pm-hairline)] bg-[var(--pm-canvas)]/90 pb-5">
        <div>
          <p className="text-sm font-black tracking-tight text-[var(--pm-ink)]">Demo 1 · Markets Lab</p>
          <p className="text-xs font-semibold text-[var(--pm-muted)]">Demo · Play credits</p>
        </div>
        <nav aria-label="Browse" className="flex flex-wrap gap-2">
          {browseChips.map((chip) => (
            <NavChip key={chip}>{chip}</NavChip>
          ))}
        </nav>
      </header>

      <section className="mb-8 overflow-hidden rounded-[1.75rem] border border-[var(--pm-hairline)] bg-[var(--pm-canvas)] p-6 shadow-[var(--pm-shadow-card)] md:p-9">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--pm-blue)]">Featured markets</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-black leading-[1.02] tracking-[-0.05em] text-[var(--pm-ink)] md:text-6xl">
              하루 만에 확률이 움직이는 데모 마켓을 이해해 봅니다.
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--pm-body)]">
              Yes 또는 No를 선택하고, play credits로 포지션을 만들고, chance와 portfolio가 어떻게 바뀌는지 확인합니다. 실제 돈이나 메인넷은 사용하지 않습니다.
            </p>
            <div className="mt-6">
              <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-[var(--pm-muted)]">Topics</p>
              <div className="flex flex-wrap gap-2" aria-label="Topics">
                {topicChips.map((chip) => (
                  <CategoryChip key={chip}>{chip}</CategoryChip>
                ))}
              </div>
            </div>
          </div>

          <aside className="rounded-[1.5rem] border border-[var(--pm-hairline)] bg-[var(--pm-surface)] p-5" aria-label="Market summary">
            <div className="flex items-center justify-between gap-3 border-b border-[var(--pm-hairline)] pb-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--pm-muted)]">Market stats</p>
                <h2 className="mt-1 text-2xl font-black tracking-[-0.03em] text-[var(--pm-ink)]">Today&apos;s board</h2>
              </div>
              <span className="rounded-full bg-[var(--pm-yes-soft)] px-3 py-1 text-sm font-black text-[var(--pm-yes)]">Live</span>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              <HeroMetric label="Markets" value={`${seedMarkets.length}`} />
              <HeroMetric label="Open" value={`${openMarkets}`} />
              <HeroMetric label="Balance" value="1,000" />
            </div>
            <p className="mt-5 rounded-2xl bg-[var(--pm-blue-soft)] p-4 text-sm leading-6 text-[var(--pm-body)]">
              Demo markets use play credits, not real funds.
            </p>
          </aside>
        </div>
      </section>

      <section aria-labelledby="markets-heading" className="rounded-[1.75rem] border border-[var(--pm-hairline)] bg-[var(--pm-canvas)] p-5 shadow-[var(--pm-shadow-soft)] md:p-7">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[var(--pm-muted)]">All markets</p>
            <h2 id="markets-heading" className="mt-2 text-3xl font-black tracking-[-0.04em] text-[var(--pm-ink)]">
              Markets
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-[var(--pm-body)]">
            이 앱은 Polymarket과 공식 제휴가 없으며 Polymarket 로고, 브랜드 자산, 실제 돈, 투자 조언을 사용하지 않습니다.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {seedMarkets.map((market) => (
            <MarketCard key={market.slug} market={market} />
          ))}
        </div>
      </section>
    </main>
  );
}

function NavChip({ children }: { children: ReactNode }) {
  return <span className="rounded-full px-3 py-2 text-sm font-bold text-[var(--pm-body)] hover:bg-[var(--pm-surface)]">{children}</span>;
}

function CategoryChip({ children }: { children: ReactNode }) {
  return <span className="rounded-full border border-[var(--pm-hairline)] bg-[var(--pm-canvas)] px-4 py-2 text-sm font-bold text-[var(--pm-body)] shadow-sm">{children}</span>;
}

function HeroMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[var(--pm-hairline)] bg-[var(--pm-canvas)] p-4">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--pm-muted)]">{label}</p>
      <p className="mt-2 text-2xl font-black text-[var(--pm-ink)]">{value}</p>
    </div>
  );
}
