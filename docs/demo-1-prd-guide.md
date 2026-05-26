# 데모 1 PRD 가이드 — Polymarket 메커니즘 실험실

이 문서는 학습자가 AI에게 “완성 데모 1을 만들어줘”라고 말하기 전에 요구사항을 구조화하는 가이드입니다. 바이브코딩에서는 코드보다 먼저 **목표, 범위, 비목표, 검증 기준**을 명확히 해야 AI가 안전하고 작은 방향으로 움직입니다.

## 1. PRD 요약

### 제품 이름

Polymarket Mechanics Lab — Demo 1

### 한 문장 설명

초보자가 예측시장 제품의 기본 흐름을 실제 돈 없이 play credits로 체험하는 Next.js 기반 교육용 시뮬레이션입니다.

### 대상 사용자

- 개발을 막 시작한 학습자
- AI 코딩 도구와 함께 작은 기능을 만들고 검증하는 연습을 하는 사람
- 예측시장 UX와 상태 변화를 포트폴리오 프로젝트로 설명하고 싶은 사람

### 핵심 문제

실제 예측시장 제품은 지갑, 주문장, 오라클, 규제, 정산, 유동성 같은 요소가 복잡합니다. 하루짜리 스터디에서는 이 복잡도를 그대로 구현하지 않고, “마켓을 보고 YES/NO를 선택하면 확률과 포지션이 바뀐다”는 핵심 학습 흐름만 안전하게 분리해야 합니다.

## 2. 목표와 비목표

### 목표

1. 학습자가 로컬에서 데모를 실행한다.
2. 마켓 목록과 상세 페이지를 본다.
3. YES 또는 NO에 play credits를 배치한다.
4. 장난감 확률 모델이 움직이는 것을 본다.
5. 포트폴리오 잔액, 포지션, 거래 기록이 바뀐다.
6. 모의 정산으로 play-credit payout을 확인한다.
7. 목업 지갑이 실제 지갑 없이 UX만 보여준다는 점을 이해한다.
8. lint/test/build/E2E로 작동 증거를 남긴다.

### 비목표 / 안전 경계

- 메인넷 없음
- 실제 돈, 실제 자산, 실제 베팅, 실거래 없음
- 금융/투자 조언 없음
- Polymarket 공식 제휴 없음
- Polymarket 로고, 상표, 브랜드 자산 복사 없음
- 프로덕션 CLOB, 매칭 엔진, 오라클, 스마트컨트랙트 없음
- 실제 지갑 서명, WalletConnect, 입금/출금 없음

## 3. 사용자 플로우

```text
홈 진입
  → 시드 마켓 카드 확인
  → 마켓 상세 페이지 이동
  → YES 확률, 설명, 종료일, 볼륨 확인
  → Amount 입력
  → Buy Yes 또는 Buy No 클릭
  → status 메시지 확인
  → portfolio balance / position / activity 확인
  → Resolve Yes 또는 Resolve No 클릭
  → simulated payout 확인
  → mock wallet connect/disconnect 확인
```

## 4. 기능 요구사항

| ID | 기능 | 요구사항 | 현재 구현 위치 |
| --- | --- | --- | --- |
| F1 | 마켓 목록 | 시드 마켓 카드, 카테고리, 상태, 확률, 볼륨, 종료일 표시 | `src/app/page.tsx`, `src/components/market/MarketCard.tsx` |
| F2 | 마켓 상세 | 질문, 설명, 확률 타일, 거래 패널, 포트폴리오 사이드바 표시 | `src/app/markets/[slug]/page.tsx`, `src/components/market/TradePanel.tsx` |
| F3 | YES/NO 거래 | stake 입력, 잔액 차감, 포지션 증가, 확률 변화, 거래 기록 생성 | `src/lib/market-engine.ts` |
| F4 | localStorage | 새로고침 후 포트폴리오/마켓 상태 유지, reset 가능 | `src/lib/portfolio-store.ts` |
| F5 | 모의 정산 | resolved outcome과 play-credit payout 표시 | `src/lib/market-engine.ts`, `TradePanel.tsx` |
| F6 | 목업 지갑 | 랜덤 데모 주소 표시, 실제 지갑/서명/메인넷 없음 | `src/components/wallet/WalletExperiment.tsx` |
| F7 | 품질 확인 | lint, unit test, build, E2E 명령 제공 | `package.json`, `tests/unit/`, `e2e/` |

## 5. 데이터 모델

### Market

```ts
type Outcome = "yes" | "no";
type MarketStatus = "open" | "resolved";

interface Market {
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
```

### Portfolio

```ts
interface Portfolio {
  balance: number;
  positions: Record<string, { yesStake: number; noStake: number }>;
  transactions: Transaction[];
  settlements: Record<string, SettlementRecord>;
}
```

## 6. 장난감 확률 모델

데모 1은 실제 Polymarket CLOB이 아닙니다. 단순히 `yesPool / (yesPool + noPool)`로 YES 확률을 계산합니다.

- YES 구매: `yesPool`이 증가하여 YES 확률이 올라갈 수 있습니다.
- NO 구매: `noPool`이 증가하여 YES 확률이 내려갈 수 있습니다.
- 확률은 1%~99% 사이로 제한합니다.
- play credits 잔액보다 큰 stake는 거절합니다.
- 정산된 마켓에는 새 거래를 허용하지 않습니다.

이 단순화 덕분에 학습자는 수학과 상태 변화를 빠르게 이해할 수 있습니다.

## 7. 화면 요구사항

### 홈

- “Demo · Play credits” 문구가 보여야 합니다.
- `Featured markets`, `Markets`, category/topic chip을 보여줍니다.
- 마켓 카드는 제목, 설명, chance, Vol, Ends를 보여줍니다.
- Polymarket 공식 제휴 없음과 브랜드 자산 복사 없음 문구가 보여야 합니다.

### 상세

- 현재 YES chance를 큰 숫자로 보여줍니다.
- Amount input과 Buy Yes/Buy No 버튼이 있어야 합니다.
- status 영역에서 거래 결과 또는 오류를 보여줍니다.
- portfolio balance, YES/NO position, activity가 보여야 합니다.
- Resolve Yes/No 버튼으로 모의 정산을 확인합니다.
- Demo wallet 영역은 실제 지갑이 아니라는 문구를 포함합니다.

## 8. 테스트 기준

### 단위 테스트

- YES 구매 시 YES 확률 증가와 잔액 차감
- NO 구매 시 YES 확률 감소와 포지션 기록
- 잔액 초과 stake 거절
- 0/음수/NaN stake 거절
- YES/NO 모의 정산 payout
- resolved market 거래 금지
- localStorage save/load/reset
- format 함수가 USD나 달러 기호 없이 play credits 표시

### E2E 테스트

- 홈에서 마켓을 찾고 상세로 이동
- Buy Yes 후 확률/잔액/activity 변화
- Buy No 후 반대 방향 확률 변화
- 잘못된 amount 오류와 잔액 보존
- Resolve 후 settlement 표시
- Mock wallet connect/disconnect와 no-mainnet 문구 확인
- no-affiliation/simulation-only copy 확인

## 9. AI에게 전달할 PRD 블록

아래 블록을 AI에게 붙여 넣고 시작할 수 있습니다.

```text
목표: 하루짜리 Polymarket 메커니즘 스터디용 Demo 1을 만들거나 수정한다.
제품: Next.js + TypeScript + Tailwind 기반 교육용 예측시장 시뮬레이션.
핵심 흐름: 마켓 목록 → 마켓 상세 → Amount 입력 → Buy Yes/Buy No → toy probability 변화 → portfolio/activity 변화 → simulated settlement → mock wallet UX.
범위: play credits, seeded markets, localStorage, pure TypeScript market engine, mock wallet, npm scripts, Korean beginner docs.
비목표: mainnet, real money, real trading, betting, financial advice, official Polymarket affiliation, logo/brand asset copying, production CLOB/oracle/smart contract, real wallet signature.
작업 방식: 변경 전 파일 후보를 말하고, 작은 diff로 수정하고, 수정 후 npm 검증 명령을 알려준다. 테스트를 삭제하지 않는다.
검증: npm run lint, npm run test, npm run build, npm run test:e2e 중 작업 범위에 맞게 실행하거나 실행해야 할 명령을 제시한다.
참고 문서: AGENTS.md, AI_GUIDE.md, LEARNER_GUIDE.md, docs/safety-and-scope.md, DESIGN.md.
```

## 10. 완성 기준 체크리스트

- [ ] `npm install` 후 앱이 실행된다.
- [ ] 홈에서 시드 마켓이 보인다.
- [ ] 마켓 상세에서 Buy Yes/Buy No가 동작한다.
- [ ] 확률, 잔액, 포지션, activity가 변한다.
- [ ] invalid stake가 오류로 처리되고 잔액이 보존된다.
- [ ] Resolve Yes/No가 모의 정산을 보여준다.
- [ ] Mock wallet은 실제 지갑 없이 connect/disconnect만 보여준다.
- [ ] 안전 문구가 앱과 문서에 남아 있다.
- [ ] `npm run lint`, `npm run test`, `npm run build`가 통과한다.
- [ ] 가능하면 `npm run test:e2e`도 통과한다.
