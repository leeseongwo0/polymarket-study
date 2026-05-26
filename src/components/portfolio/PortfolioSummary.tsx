import { formatCredits } from "@/lib/format";
import { getPosition } from "@/lib/market-engine";
import type { Portfolio } from "@/types/market";

interface PortfolioSummaryProps {
  portfolio: Portfolio;
  marketSlug: string;
}

export function PortfolioSummary({ portfolio, marketSlug }: PortfolioSummaryProps) {
  const position = getPosition(portfolio, marketSlug);

  return (
    <section className="rounded-[1.4rem] border border-[var(--pm-hairline)] bg-[var(--pm-surface-card)] p-5 shadow-sm" aria-label="Portfolio">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--pm-muted)]">Portfolio</p>
      <p className="mt-3 text-3xl font-black tracking-[-0.04em] text-[var(--pm-ink)]" data-testid="portfolio-balance">
        {formatCredits(portfolio.balance)}
      </p>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <PositionPill label="Yes" value={position.yesStake} tone="yes" />
        <PositionPill label="No" value={position.noStake} tone="no" />
      </div>
    </section>
  );
}

function PositionPill({ label, value, tone }: { label: string; value: number; tone: "yes" | "no" }) {
  const toneClass = tone === "yes" ? "bg-[var(--pm-yes-soft)] text-[var(--pm-yes)]" : "bg-[var(--pm-no-soft)] text-[var(--pm-no)]";

  return (
    <div className={`rounded-2xl p-4 ${toneClass}`}>
      <p className="text-xs font-black uppercase tracking-[0.16em] opacity-75">{label}</p>
      <p className="mt-2 text-lg font-black">{formatCredits(value)}</p>
    </div>
  );
}
