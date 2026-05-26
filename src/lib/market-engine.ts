import type { Market, Outcome, Portfolio, Position, SettlementRecord, TradeResult } from "@/types/market";

const INITIAL_PLAY_CREDITS = 1_000;
const PROBABILITY_MIN = 1;
const PROBABILITY_MAX = 99;

export function createDefaultPortfolio(): Portfolio {
  return {
    balance: INITIAL_PLAY_CREDITS,
    positions: {},
    transactions: [],
    settlements: {},
  };
}

export function getPosition(portfolio: Portfolio, marketSlug: string): Position {
  return portfolio.positions[marketSlug] ?? { yesStake: 0, noStake: 0 };
}

export function calculateYesProbability(market: Pick<Market, "yesPool" | "noPool">): number {
  const total = market.yesPool + market.noPool;
  if (total <= 0) {
    return 50;
  }

  const raw = Math.round((market.yesPool / total) * 100);
  return clamp(raw, PROBABILITY_MIN, PROBABILITY_MAX);
}

export function applyTrade(args: {
  market: Market;
  portfolio: Portfolio;
  outcome: Outcome;
  stake: number;
  now?: Date;
}): TradeResult {
  const { market, portfolio, outcome, now = new Date() } = args;
  const stake = normalizeStake(args.stake);

  if (market.status === "resolved") {
    throw new Error("정산 완료된 데모 마켓에는 새 플레이 크레딧 거래를 할 수 없습니다.");
  }

  if (stake <= 0) {
    throw new Error("0보다 큰 플레이 크레딧 지분을 입력하세요.");
  }

  if (stake > portfolio.balance) {
    throw new Error("플레이 크레딧 지분은 사용 가능한 잔액을 초과할 수 없습니다.");
  }

  const probabilityBefore = calculateYesProbability(market);
  const updatedMarket: Market = {
    ...market,
    yesPool: outcome === "yes" ? market.yesPool + stake : market.yesPool,
    noPool: outcome === "no" ? market.noPool + stake : market.noPool,
    playVolume: market.playVolume + stake,
  };
  const probabilityAfter = calculateYesProbability(updatedMarket);
  const currentPosition = getPosition(portfolio, market.slug);
  const updatedPosition: Position = {
    yesStake: outcome === "yes" ? currentPosition.yesStake + stake : currentPosition.yesStake,
    noStake: outcome === "no" ? currentPosition.noStake + stake : currentPosition.noStake,
  };
  const transaction = {
    id: `tx-${now.getTime()}-${outcome}-${stake}`,
    marketSlug: market.slug,
    outcome,
    stake,
    probabilityBefore,
    probabilityAfter,
    createdAt: now.toISOString(),
  };

  return {
    market: updatedMarket,
    portfolio: {
      ...portfolio,
      balance: roundCredits(portfolio.balance - stake),
      positions: {
        ...portfolio.positions,
        [market.slug]: updatedPosition,
      },
      transactions: [transaction, ...portfolio.transactions].slice(0, 12),
    },
    transaction,
  };
}

export function settleMarket(args: {
  market: Market;
  portfolio: Portfolio;
  outcome: Outcome;
  now?: Date;
}): { market: Market; portfolio: Portfolio; settlement: SettlementRecord } {
  const { market, portfolio, now = new Date() } = args;
  const outcome = market.status === "resolved" && market.resolvedOutcome ? market.resolvedOutcome : args.outcome;

  if (portfolio.settlements[market.slug]) {
    return {
      market: { ...market, status: "resolved", resolvedOutcome: portfolio.settlements[market.slug].outcome },
      portfolio,
      settlement: portfolio.settlements[market.slug],
    };
  }

  const position = getPosition(portfolio, market.slug);
  const winningStake = outcome === "yes" ? position.yesStake : position.noStake;
  const payout = roundCredits(winningStake * 2);
  const settlement: SettlementRecord = {
    outcome,
    payout,
    settledAt: now.toISOString(),
  };

  return {
    market: {
      ...market,
      status: "resolved",
      resolvedOutcome: outcome,
    },
    portfolio: {
      ...portfolio,
      balance: roundCredits(portfolio.balance + payout),
      settlements: {
        ...portfolio.settlements,
        [market.slug]: settlement,
      },
    },
    settlement,
  };
}

export function roundCredits(value: number): number {
  return Math.round(value * 100) / 100;
}

function normalizeStake(value: number): number {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return roundCredits(value);
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
