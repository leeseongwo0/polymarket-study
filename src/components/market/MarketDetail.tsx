import { TradePanel } from "@/components/market/TradePanel";
import type { Market } from "@/types/market";

export function MarketDetail({ market }: { market: Market }) {
  return <TradePanel initialMarket={market} />;
}
