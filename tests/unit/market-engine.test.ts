import { describe, expect, it } from "vitest";
import { applyTrade, calculateYesProbability, createDefaultPortfolio, settleMarket } from "@/lib/market-engine";
import type { Market } from "@/types/market";

function openMarket(): Market {
  return {
    slug: "demo",
    title: "데모 마켓",
    description: "교육용 마켓",
    category: "테스트",
    closesAt: "2026-06-01",
    status: "open",
    yesPool: 50,
    noPool: 50,
    playVolume: 100,
    learningGoal: "마켓 메커니즘 테스트",
  };
}

describe("market-engine", () => {
  it("buying YES increases YES probability and deducts play credits", () => {
    const market = openMarket();
    const portfolio = createDefaultPortfolio();

    const result = applyTrade({ market, portfolio, outcome: "yes", stake: 50, now: new Date("2026-05-14T00:00:00Z") });

    expect(calculateYesProbability(result.market)).toBeGreaterThan(calculateYesProbability(market));
    expect(result.portfolio.balance).toBe(950);
    expect(result.portfolio.positions.demo.yesStake).toBe(50);
  });

  it("buying NO decreases YES probability and records the NO position", () => {
    const market = openMarket();
    const portfolio = createDefaultPortfolio();

    const result = applyTrade({ market, portfolio, outcome: "no", stake: 40, now: new Date("2026-05-14T00:00:00Z") });

    expect(calculateYesProbability(result.market)).toBeLessThan(calculateYesProbability(market));
    expect(result.portfolio.balance).toBe(960);
    expect(result.portfolio.positions.demo.noStake).toBe(40);
  });

  it("rejects a stake above the available balance", () => {
    expect(() => applyTrade({ market: openMarket(), portfolio: createDefaultPortfolio(), outcome: "yes", stake: 1001 })).toThrow(
      /초과할 수 없습니다/i,
    );
  });

  it("rejects zero, negative, and non-finite stakes", () => {
    expect(() => applyTrade({ market: openMarket(), portfolio: createDefaultPortfolio(), outcome: "yes", stake: 0 })).toThrow(
      /0보다 큰/i,
    );
    expect(() => applyTrade({ market: openMarket(), portfolio: createDefaultPortfolio(), outcome: "yes", stake: -5 })).toThrow(
      /0보다 큰/i,
    );
    expect(() => applyTrade({ market: openMarket(), portfolio: createDefaultPortfolio(), outcome: "yes", stake: Number.NaN })).toThrow(
      /0보다 큰/i,
    );
  });

  it("settles YES positions with simulated play-credit payout", () => {
    const traded = applyTrade({ market: openMarket(), portfolio: createDefaultPortfolio(), outcome: "yes", stake: 30 });

    const settled = settleMarket({ market: traded.market, portfolio: traded.portfolio, outcome: "yes", now: new Date("2026-05-14T00:00:00Z") });

    expect(settled.market.status).toBe("resolved");
    expect(settled.market.resolvedOutcome).toBe("yes");
    expect(settled.settlement.payout).toBe(60);
    expect(settled.portfolio.balance).toBe(1030);
  });

  it("settles NO positions with simulated play-credit payout", () => {
    const traded = applyTrade({ market: openMarket(), portfolio: createDefaultPortfolio(), outcome: "no", stake: 45 });

    const settled = settleMarket({ market: traded.market, portfolio: traded.portfolio, outcome: "no" });

    expect(settled.market.resolvedOutcome).toBe("no");
    expect(settled.settlement.payout).toBe(90);
    expect(settled.portfolio.balance).toBe(1045);
  });

  it("rejects new trades after a market is resolved", () => {
    const market: Market = { ...openMarket(), status: "resolved", resolvedOutcome: "yes" };

    expect(() => applyTrade({ market, portfolio: createDefaultPortfolio(), outcome: "yes", stake: 10 })).toThrow(/거래를 할 수 없습니다/i);
  });

  it("preserves an already resolved market outcome during simulated settlement", () => {
    const market: Market = { ...openMarket(), status: "resolved", resolvedOutcome: "yes" };

    const settled = settleMarket({ market, portfolio: createDefaultPortfolio(), outcome: "no" });

    expect(settled.market.resolvedOutcome).toBe("yes");
    expect(settled.settlement.outcome).toBe("yes");
  });
});
