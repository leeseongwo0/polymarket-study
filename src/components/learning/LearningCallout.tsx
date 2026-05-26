interface LearningCalloutProps {
  title: string;
  children: React.ReactNode;
}

export function LearningCallout({ title, children }: LearningCalloutProps) {
  return (
    <aside className="rounded-[1.4rem] border border-[var(--pm-hairline)] bg-[var(--pm-blue-soft)] p-5 text-sm text-[var(--pm-body)] shadow-sm">
      <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-[var(--pm-blue)]">How it works</p>
      <h3 className="mb-2 text-lg font-black tracking-[-0.02em] text-[var(--pm-ink)]">{title}</h3>
      <div className="leading-6 text-[var(--pm-body)]">{children}</div>
    </aside>
  );
}
