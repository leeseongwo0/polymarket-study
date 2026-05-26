import Link from "next/link";
import { calculateYesProbability } from "@/lib/market-engine";
import { formatCredits, formatProbability, formatShortDate } from "@/lib/format";
import type { Market } from "@/types/market";

interface MarketCardProps {
  market: Market;
}

export function MarketCard({ market }: MarketCardProps) {
  const yesProbability = calculateYesProbability(market);
  const isResolved = market.status === "resolved";
  const statusLabel = isResolved ? `Resolved · ${market.resolvedOutcome?.toUpperCase()}` : "Live";

  return (
    <Link
      href={`/markets/${market.slug}`}
      className="group block rounded-[1.4rem] border border-[var(--pm-hairline)] bg-[var(--pm-surface-card)] p-5 shadow-sm transition hover:-translate-y-1 hover:border-[var(--pm-blue)] hover:shadow-[var(--pm-shadow-card)]"
    >
      <div className="mb-5 flex items-center justify-between gap-3">
        <span className="rounded-full bg-[var(--pm-surface)] px-3 py-1 text-xs font-black text-[var(--pm-muted)]">{market.category}</span>
        <span
          className={
            isResolved
              ? "rounded-full bg-[var(--pm-warning-soft)] px-3 py-1 text-xs font-black text-[var(--pm-warning)]"
              : "rounded-full bg-[var(--pm-yes-soft)] px-3 py-1 text-xs font-black text-[var(--pm-yes)]"
          }
        >
          {statusLabel}
        </span>
      </div>
      <h2 className="mb-3 text-xl font-black leading-tight tracking-[-0.03em] text-[var(--pm-ink)] group-hover:text-[var(--pm-blue)]">
        {market.title}
      </h2>
      <p className="mb-5 line-clamp-3 text-sm leading-6 text-[var(--pm-body)]">{market.description}</p>
      <div className="grid grid-cols-3 gap-2 text-sm">
        <Metric label="chance" value={formatProbability(yesProbability)} tone="yes" />
        <Metric label="Vol" value={formatCredits(market.playVolume)} />
        <Metric label="Ends" value={formatShortDate(market.closesAt)} />
      </div>
    </Link>
  );
}

function Metric({ label, value, tone }: { label: string; value: string; tone?: "yes" }) {
  return (
    <div className={tone === "yes" ? "rounded-2xl bg-[var(--pm-yes-soft)] p-3" : "rounded-2xl bg-[var(--pm-surface)] p-3"}>
      <p className="text-[0.65rem] font-black tracking-[0.12em] text-[var(--pm-muted)]">{label}</p>
      <p className={tone === "yes" ? "mt-1 text-sm font-black text-[var(--pm-yes)]" : "mt-1 text-sm font-black text-[var(--pm-ink)]"}>{value}</p>
    </div>
  );
}
