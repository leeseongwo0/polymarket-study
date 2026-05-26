import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createDefaultPortfolio } from "@/lib/market-engine";
import { loadMarketState, loadPortfolio, resetLabStorage, saveMarketState, savePortfolio } from "@/lib/portfolio-store";
import type { Market } from "@/types/market";

class MemoryStorage {
  private store = new Map<string, string>();

  getItem(key: string) {
    return this.store.get(key) ?? null;
  }

  setItem(key: string, value: string) {
    this.store.set(key, value);
  }

  removeItem(key: string) {
    this.store.delete(key);
  }

  clear() {
    this.store.clear();
  }
}

const market: Market = {
  slug: "storage-demo",
  title: "저장소 데모",
  description: "데모",
  category: "테스트",
  closesAt: "2026-06-01",
  status: "open",
  yesPool: 50,
  noPool: 50,
  playVolume: 100,
  learningGoal: "저장소 테스트",
};

describe("portfolio-store", () => {
  let storage: MemoryStorage;

  beforeEach(() => {
    storage = new MemoryStorage();
    vi.stubGlobal("window", { localStorage: storage });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("loads a default portfolio when storage is empty", () => {
    expect(loadPortfolio()).toEqual(createDefaultPortfolio());
  });

  it("saves and loads a portfolio", () => {
    const portfolio = { ...createDefaultPortfolio(), balance: 750 };

    savePortfolio(portfolio);

    expect(loadPortfolio().balance).toBe(750);
  });

  it("falls back to default portfolio when JSON is corrupt", () => {
    storage.setItem("polymarket-mechanics-lab:portfolio:v1", "not-json");

    expect(loadPortfolio()).toEqual(createDefaultPortfolio());
  });

  it("saves and loads market state", () => {
    saveMarketState({ ...market, yesPool: 80 });

    expect(loadMarketState(market).yesPool).toBe(80);
  });

  it("reset removes portfolio and market state", () => {
    savePortfolio({ ...createDefaultPortfolio(), balance: 123 });
    saveMarketState({ ...market, yesPool: 80 });

    resetLabStorage(market.slug);

    expect(loadPortfolio()).toEqual(createDefaultPortfolio());
    expect(loadMarketState(market)).toEqual(market);
  });
});
