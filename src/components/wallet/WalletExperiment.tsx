"use client";

import { useMemo, useState } from "react";

function createDemoAddress(): string {
  const random = Math.random().toString(16).slice(2, 10).padEnd(8, "0");
  return `0xDEMO${random.toUpperCase()}EDU`;
}

export function WalletExperiment() {
  const [connected, setConnected] = useState(false);
  const address = useMemo(() => createDemoAddress(), []);

  return (
    <section className="rounded-[1.4rem] border border-[#ead79c] bg-[var(--pm-warning-soft)] p-5 shadow-sm" aria-label="Demo wallet">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--pm-warning)]">Demo wallet</p>
      <h3 className="mt-3 text-xl font-black tracking-[-0.03em] text-[var(--pm-ink)]">Connect a demo address</h3>
      <p className="mt-3 text-sm leading-6 text-[var(--pm-body)]">
        Generated address only. No seed phrase, no signature, no mainnet.
      </p>
      <button
        type="button"
        onClick={() => setConnected((value) => !value)}
        className="mt-5 rounded-full bg-[var(--pm-warning)] px-5 py-3 text-sm font-black text-white transition hover:brightness-95"
      >
        {connected ? "Disconnect demo wallet" : "Connect demo wallet"}
      </button>
      <div className="mt-4 rounded-2xl border border-[#ead79c] bg-white/70 p-4 text-sm text-[var(--pm-body)]" data-testid="mock-wallet-status">
        {connected ? (
          <p>
            Demo address: <span className="font-mono font-bold text-[var(--pm-ink)]">{address}</span>
          </p>
        ) : (
          <p>Not connected. Markets still work.</p>
        )}
      </div>
    </section>
  );
}
