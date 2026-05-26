export type Outcome = "yes" | "no";

export type MarketStatus = "open" | "resolved";

export interface Market {
  slug: string;
  title: string;
  description: string;
  category: string;
  closesAt: string;
  status: MarketStatus;
  yesPool: number;
  noPool: number;
  playVolume: number;
  resolvedOutcome?: Outcome;
  learningGoal: string;
}

export interface Position {
  yesStake: number;
  noStake: number;
}

export interface Transaction {
  id: string;
  marketSlug: string;
  outcome: Outcome;
  stake: number;
  probabilityBefore: number;
  probabilityAfter: number;
  createdAt: string;
}

export interface SettlementRecord {
  outcome: Outcome;
  payout: number;
  settledAt: string;
}

export interface Portfolio {
  balance: number;
  positions: Record<string, Position>;
  transactions: Transaction[];
  settlements: Record<string, SettlementRecord>;
}

export interface TradeResult {
  market: Market;
  portfolio: Portfolio;
  transaction: Transaction;
}
