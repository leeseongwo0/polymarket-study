import { createDefaultPortfolio } from "@/lib/market-engine";
import type { Market, Portfolio } from "@/types/market";

const PORTFOLIO_KEY = "polymarket-mechanics-lab:portfolio:v1";
const marketKey = (slug: string) => `polymarket-mechanics-lab:market:${slug}:v1`;

export function loadPortfolio(): Portfolio {
  if (typeof window === "undefined") {
    return createDefaultPortfolio();
  }

  const raw = window.localStorage.getItem(PORTFOLIO_KEY);
  if (!raw) {
    return createDefaultPortfolio();
  }

  try {
    return { ...createDefaultPortfolio(), ...JSON.parse(raw) } as Portfolio;
  } catch {
    return createDefaultPortfolio();
  }
}

export function savePortfolio(portfolio: Portfolio): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(PORTFOLIO_KEY, JSON.stringify(portfolio));
}

export function loadMarketState(fallback: Market): Market {
  if (typeof window === "undefined") {
    return fallback;
  }

  const raw = window.localStorage.getItem(marketKey(fallback.slug));
  if (!raw) {
    return fallback;
  }

  try {
    return { ...fallback, ...JSON.parse(raw) } as Market;
  } catch {
    return fallback;
  }
}

export function saveMarketState(market: Market): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(marketKey(market.slug), JSON.stringify(market));
}

export function resetLabStorage(slug: string): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(PORTFOLIO_KEY);
  window.localStorage.removeItem(marketKey(slug));
}
