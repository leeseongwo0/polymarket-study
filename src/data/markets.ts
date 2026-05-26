import type { Market } from "@/types/market";

export const seedMarkets: Market[] = [
  {
    slug: "ai-assistant-weekly-coding",
    title: "AI assistants default for beginner coding this year?",
    description: "Track whether AI coding assistants become the default starting point for new developers.",
    category: "AI",
    closesAt: "2026-06-30",
    status: "open",
    yesPool: 58,
    noPool: 42,
    playVolume: 1240,
    learningGoal: "YES를 사면 단순화된 확률이 위로 움직이는 과정을 확인합니다.",
  },
  {
    slug: "nextjs-beginner-deploy",
    title: "Will every learner explain the demo by the end of today's study?",
    description: "A study milestone market for tracking confidence across the one-day vibe-coding path.",
    category: "Milestones",
    closesAt: "2026-07-07",
    status: "open",
    yesPool: 64,
    noPool: 36,
    playVolume: 980,
    learningGoal: "원데이 스터디 마일스톤에 대한 확신을 플레이 크레딧으로 모델링합니다.",
  },
  {
    slug: "demo-settled-market",
    title: "Resolved demo: sample feature shipped?",
    description: "A finished market that shows how an outcome and payout appear after resolution.",
    category: "Settlement",
    closesAt: "2026-05-01",
    status: "resolved",
    yesPool: 72,
    noPool: 28,
    playVolume: 760,
    resolvedOutcome: "yes",
    learningGoal: "모의 정산이 승리 결과를 어떻게 표시하는지 확인합니다.",
  },
];

export function getMarketBySlug(slug: string): Market | undefined {
  return seedMarkets.find((market) => market.slug === slug);
}
