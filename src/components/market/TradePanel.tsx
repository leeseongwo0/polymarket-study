"use client";

import { useEffect, useMemo, useState } from "react";
import { LearningCallout } from "@/components/learning/LearningCallout";
import { PortfolioSummary } from "@/components/portfolio/PortfolioSummary";
import { WalletExperiment } from "@/components/wallet/WalletExperiment";
import { formatCredits, formatProbability, formatShortDate } from "@/lib/format";
import { applyTrade, calculateYesProbability, createDefaultPortfolio, getPosition, settleMarket } from "@/lib/market-engine";
import { loadMarketState, loadPortfolio, resetLabStorage, saveMarketState, savePortfolio } from "@/lib/portfolio-store";
import type { Market, Outcome, Portfolio } from "@/types/market";

interface TradePanelProps {
  initialMarket: Market;
}

export function TradePanel({ initialMarket }: TradePanelProps) {
  const [market, setMarket] = useState(initialMarket);
  const [portfolio, setPortfolio] = useState<Portfolio>(() => createDefaultPortfolio());
  const [stake, setStake] = useState(25);
  const [message, setMessage] = useState("Choose Yes or No to see the chance update.");
  const yesProbability = calculateYesProbability(market);
  const position = useMemo(() => getPosition(portfolio, market.slug), [portfolio, market.slug]);
  const currentTransactions = portfolio.transactions.filter((transaction) => transaction.marketSlug === market.slug);

  useEffect(() => {
    const handle = window.setTimeout(() => {
      setPortfolio(loadPortfolio());
      setMarket(loadMarketState(initialMarket));
    }, 0);

    return () => window.clearTimeout(handle);
  }, [initialMarket]);

  function trade(outcome: Outcome) {
    try {
      const result = applyTrade({ market, portfolio, outcome, stake });
      setMarket(result.market);
      setPortfolio(result.portfolio);
      saveMarketState(result.market);
      savePortfolio(result.portfolio);
      setMessage(
        `${outcome === "yes" ? "Bought Yes" : "Bought No"} · ${formatCredits(stake)} · ${formatProbability(result.transaction.probabilityBefore)} → ${formatProbability(result.transaction.probabilityAfter)}`,
      );
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "데모 거래를 적용할 수 없습니다.");
    }
  }

  function resolve(outcome: Outcome) {
    const result = settleMarket({ market, portfolio, outcome });
    setMarket(result.market);
    setPortfolio(result.portfolio);
    saveMarketState(result.market);
    savePortfolio(result.portfolio);
    setMessage(
      `${result.settlement.outcome === "yes" ? "Resolved Yes" : "Resolved No"} · Payout ${formatCredits(result.settlement.payout)} · Play credits only.`,
    );
  }

  function reset() {
    resetLabStorage(initialMarket.slug);
    setMarket(initialMarket);
    setPortfolio(createDefaultPortfolio());
    setMessage("Reset complete · Balance 1,000 play credits.");
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_24rem]">
      <section className="rounded-[1.75rem] border border-[var(--pm-hairline)] bg-[var(--pm-surface-card)] p-6 shadow-[var(--pm-shadow-card)] md:p-7">
        <div className="mb-6 grid gap-5 lg:grid-cols-[1fr_15rem] lg:items-start">
          <div>
            <p className="inline-flex rounded-full bg-[var(--pm-surface)] px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-[var(--pm-muted)]">
              {market.category}
            </p>
            <h1 className="mt-4 max-w-3xl text-3xl font-black leading-tight tracking-[-0.05em] text-[var(--pm-ink)] md:text-5xl">
              {market.title}
            </h1>
          </div>
          <div className="rounded-[1.4rem] border border-[var(--pm-hairline)] bg-[var(--pm-blue-soft)] p-5 text-center">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[var(--pm-blue)]">chance</p>
            <p className="mt-2 text-5xl font-black tracking-[-0.06em] text-[var(--pm-yes)]" data-testid="yes-probability">
              {formatProbability(yesProbability)}
            </p>
            <p className="mt-2 text-xs font-semibold text-[var(--pm-body)]">Yes</p>
          </div>
        </div>

        <p className="max-w-4xl text-lg leading-8 text-[var(--pm-body)]">{market.description}</p>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          <Info label="Ends" value={formatShortDate(market.closesAt)} />
          <Info label="Vol" value={formatCredits(market.playVolume)} />
          <Info label="Status" value={market.status === "resolved" ? `Resolved · ${market.resolvedOutcome?.toUpperCase()}` : "Live"} />
        </div>

        <div className="mt-6 rounded-[1.5rem] border border-[var(--pm-hairline)] bg-[var(--pm-surface)] p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--pm-muted)]">Trade</p>
              <h2 className="mt-2 text-xl font-black tracking-[-0.03em] text-[var(--pm-ink)]">Buy</h2>
            </div>
            <span className="rounded-full bg-[var(--pm-blue-soft)] px-3 py-1 text-xs font-black text-[var(--pm-blue)]">Demo order</span>
          </div>
          <p className="mt-3 text-sm leading-6 text-[var(--pm-body)]">
            Amount를 입력하고 Yes 또는 No를 선택하면 chance와 portfolio가 즉시 업데이트됩니다.
          </p>
          <label className="mt-5 block text-sm font-black text-[var(--pm-ink)]" htmlFor="stake-input">
            Amount
          </label>
          <input
            id="stake-input"
            aria-label="Amount"
            type="number"
            min="1"
            max={portfolio.balance}
            value={stake}
            onChange={(event) => setStake(Number(event.target.value))}
            className="mt-2 w-full rounded-2xl border border-[var(--pm-hairline-strong)] bg-[var(--pm-canvas)] px-4 py-3 text-[var(--pm-ink)] outline-none transition focus:border-[var(--pm-blue)]"
          />
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => trade("yes")}
              disabled={market.status === "resolved"}
              className="rounded-2xl bg-[var(--pm-yes)] px-5 py-4 font-black text-white transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-45"
            >
              Buy Yes
            </button>
            <button
              type="button"
              onClick={() => trade("no")}
              disabled={market.status === "resolved"}
              className="rounded-2xl bg-[var(--pm-no)] px-5 py-4 font-black text-white transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-45"
            >
              Buy No
            </button>
          </div>
          <div className="mt-4 rounded-2xl border border-[#b9cbff] bg-[var(--pm-blue-soft)] p-4 text-sm leading-6 text-[var(--pm-body)]" role="status">
            {message}
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <button
            type="button"
            onClick={() => resolve("yes")}
            className="rounded-2xl border border-[var(--pm-hairline)] bg-[var(--pm-canvas)] px-5 py-4 text-sm font-black text-[var(--pm-ink)] shadow-sm hover:border-[var(--pm-yes)] hover:bg-[var(--pm-yes-soft)]"
          >
            Resolve Yes
          </button>
          <button
            type="button"
            onClick={() => resolve("no")}
            className="rounded-2xl border border-[var(--pm-hairline)] bg-[var(--pm-canvas)] px-5 py-4 text-sm font-black text-[var(--pm-ink)] shadow-sm hover:border-[var(--pm-no)] hover:bg-[var(--pm-no-soft)]"
          >
            Resolve No
          </button>
        </div>

        {market.resolvedOutcome ? (
          <div className="mt-5 rounded-[1.4rem] border border-[#a7edc3] bg-[var(--pm-yes-soft)] p-5" data-testid="settlement-result">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[var(--pm-yes)]">Resolution</p>
            <p className="mt-2 text-lg text-[var(--pm-ink)]">
              Outcome: <strong>{market.resolvedOutcome.toUpperCase()}</strong>. Play credits only.
            </p>
          </div>
        ) : null}

        <button type="button" onClick={reset} className="mt-5 text-sm font-black text-[var(--pm-blue)] underline underline-offset-4">
          Reset market
        </button>
      </section>

      <aside className="space-y-5">
        <PortfolioSummary portfolio={portfolio} marketSlug={market.slug} />
        <section className="rounded-[1.4rem] border border-[var(--pm-hairline)] bg-[var(--pm-surface-card)] p-5 shadow-sm">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--pm-muted)]">Positions</p>
          <p className="mt-3 text-sm leading-6 text-[var(--pm-body)]">
            YES: <strong className="text-[var(--pm-yes)]">{formatCredits(position.yesStake)}</strong>
            <br />
            NO: <strong className="text-[var(--pm-no)]">{formatCredits(position.noStake)}</strong>
          </p>
        </section>
        <section className="rounded-[1.4rem] border border-[var(--pm-hairline)] bg-[var(--pm-surface-card)] p-5 shadow-sm" aria-label="Activity">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--pm-muted)]">Activity</p>
          {currentTransactions.length > 0 ? (
            <ol className="mt-4 space-y-3" data-testid="trade-history">
              {currentTransactions.slice(0, 4).map((transaction) => (
                <li key={transaction.id} className="rounded-2xl bg-[var(--pm-surface)] p-3 text-sm leading-6 text-[var(--pm-body)]">
                  <strong className={transaction.outcome === "yes" ? "text-[var(--pm-yes)]" : "text-[var(--pm-no)]"}>
                    {transaction.outcome.toUpperCase()}
                  </strong>{" "}
                  · {formatCredits(transaction.stake)} · Yes {formatProbability(transaction.probabilityBefore)} → {formatProbability(transaction.probabilityAfter)}
                </li>
              ))}
            </ol>
          ) : (
            <p className="mt-3 text-sm leading-6 text-[var(--pm-muted)]">No activity yet. Buy Yes or Buy No to start.</p>
          )}
        </section>
        <WalletExperiment />
        <LearningCallout title="How odds move">
          <p>
            Yes increases the Yes pool and can move chance up. No increases the No pool and can move chance down.
          </p>
        </LearningCallout>
      </aside>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[var(--pm-hairline)] bg-[var(--pm-surface)] p-4">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--pm-muted)]">{label}</p>
      <p className="mt-1 font-black text-[var(--pm-ink)]">{value}</p>
    </div>
  );
}
