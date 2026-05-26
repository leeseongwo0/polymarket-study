export function formatProbability(value: number): string {
  return `${Math.round(value)}%`;
}

export function formatCredits(value: number): string {
  return `${new Intl.NumberFormat("ko-KR", { maximumFractionDigits: 2 }).format(value)} 플레이 크레딧`;
}

export function formatShortDate(value: string): string {
  return new Intl.DateTimeFormat("ko-KR", { year: "numeric", month: "long", day: "numeric" }).format(new Date(value));
}
