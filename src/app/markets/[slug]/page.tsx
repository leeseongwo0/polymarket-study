import Link from "next/link";
import { notFound } from "next/navigation";
import { MarketDetail } from "@/components/market/MarketDetail";
import { getMarketBySlug, seedMarkets } from "@/data/markets";

interface MarketPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return seedMarkets.map((market) => ({ slug: market.slug }));
}

export default async function MarketPage({ params }: MarketPageProps) {
  const { slug } = await params;
  const market = getMarketBySlug(slug);

  if (!market) {
    notFound();
  }

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-6 py-6 text-[var(--pm-ink)] md:px-10 md:py-8">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-[var(--pm-hairline)] bg-[var(--pm-canvas)]/90 pb-5">
        <Link
          href="/"
          className="inline-flex rounded-full border border-[var(--pm-hairline)] bg-[var(--pm-canvas)] px-4 py-2 text-sm font-black text-[var(--pm-blue)] shadow-sm hover:bg-[var(--pm-blue-soft)]"
        >
          ← Markets
        </Link>
        <p className="rounded-full bg-[var(--pm-blue-soft)] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[var(--pm-blue)]">
          Demo · Play credits
        </p>
      </header>
      <MarketDetail market={market} />
    </main>
  );
}
