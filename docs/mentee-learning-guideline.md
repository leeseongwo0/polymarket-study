# 멘티 학습 가이드라인 — 그대로 강의하는 원데이 진행안

이 문서는 멘토가 이 레포를 그대로 사용해 멘티에게 강의할 수 있도록 만든 진행 대본입니다. 목표는 멘티가 “AI가 만들어 준 결과를 구경하는 사람”이 아니라, 요구사항·코드 흐름·검증 증거를 자기 말로 설명하는 사람이 되는 것입니다.

> 안전 경계: 이 수업은 교육용 시뮬레이션입니다. play credits만 사용하며 실제 돈, 메인넷, 실거래, 베팅, 투자 조언, Polymarket 공식 제휴, 브랜드 자산 복사는 다루지 않습니다.

## 1. 이 레포만으로 학습할 수 있나요?

네. 단, “진짜 예측시장 서비스 만들기”가 아니라 **예측시장 제품의 핵심 상태 흐름을 안전하게 축소해서 배우는 수업**으로 운영해야 합니다.

멘티가 배울 수 있는 것:

- Next.js 앱의 기본 폴더 구조
- 시드 데이터가 UI에 표시되는 흐름
- YES/NO 선택이 toy probability와 portfolio를 바꾸는 방식
- client-only localStorage 상태 저장
- mock wallet UX와 실제 지갑의 차이
- Vitest 단위 테스트와 Playwright E2E 테스트의 역할
- AI에게 작은 작업을 요청하고 결과를 검증하는 방식

멘티가 이 레포에서 배우면 안 되는 것:

- 실제 거래소, 실제 베팅, 실제 자금 흐름
- 메인넷 지갑 연결, 서명, 입출금
- 프로덕션 CLOB, 오라클, 스마트컨트랙트
- 금융·투자 판단 또는 수익률 설명

## 2. 수업 전 멘토 준비 체크리스트

수업 전에 멘토가 한 번 실행해 봅니다.

```bash
npm install
npm run dev
npm run lint
npm run test
npm run build
```

가능하면 Playwright 브라우저도 준비합니다.

```bash
npx playwright install chromium
npm run test:e2e
```

멘토가 미리 이해할 파일:

| 파일 | 수업에서 쓰는 이유 |
| --- | --- |
| `README.md` | 전체 스터디 구조와 실행 명령 |
| `docs/demo-1-prd-guide.md` | 무엇을 만들고, 무엇을 만들지 않을지 설명 |
| `src/data/markets.ts` | 마켓 카드에 표시되는 시드 데이터 |
| `src/lib/market-engine.ts` | YES/NO와 확률·잔액·정산의 핵심 로직 |
| `src/components/market/TradePanel.tsx` | 멘티가 클릭하는 거래/정산 UI |
| `src/lib/portfolio-store.ts` | 새로고침 후에도 상태가 남는 이유 |
| `tests/unit/market-engine.test.ts` | 핵심 로직이 망가지지 않는다는 증거 |
| `e2e/market-flow.spec.ts` | 브라우저에서 전체 흐름이 되는지 확인 |

## 3. 하루 수업 목표

수업이 끝났을 때 멘티는 아래 문장을 자기 말로 설명할 수 있어야 합니다.

1. 이 앱은 실제 돈이 아니라 play credits를 쓰는 학습용 데모다.
2. 홈의 마켓 카드는 `src/data/markets.ts`의 시드 데이터에서 나온다.
3. `Buy Yes`를 누르면 YES pool이 커져서 YES chance가 올라갈 수 있다.
4. `Buy No`를 누르면 NO pool이 커져서 YES chance가 내려갈 수 있다.
5. 거래 결과는 portfolio balance, position, activity에 반영된다.
6. Resolve 버튼은 실제 정산이 아니라 simulated payout을 보여준다.
7. mock wallet은 실제 지갑 연결이 아니라 UX 실험이다.
8. `npm run test`와 `npm run test:e2e`는 서로 다른 종류의 증거다.

## 4. 전체 시간표

| 시간 | 세션 | 멘티 산출물 |
| --- | --- | --- |
| 00:00–00:30 | 오리엔테이션 | “이 앱이 아닌 것” 3가지를 말한다. |
| 00:30–01:20 | 실행 환경 확인 | 로컬에서 홈 화면을 연다. |
| 01:20–02:10 | PRD 읽기 | 유저 플로우를 화살표로 적는다. |
| 02:10–03:20 | 핵심 로직 읽기 | YES/NO가 pool과 balance를 어떻게 바꾸는지 설명한다. |
| 03:20–04:30 | UI 흐름 추적 | 버튼 클릭이 어떤 함수로 이어지는지 찾는다. |
| 04:30–05:30 | AI와 작은 변경 | 작은 문구 또는 표시 하나를 바꾸고 diff를 읽는다. |
| 05:30–06:20 | 테스트와 디버깅 | lint/test/build 중 최소 2개 결과를 기록한다. |
| 06:20–07:00 | E2E와 포트폴리오 정리 | 데모 설명 문장 3개를 작성한다. |

## 5. 세션별 강의 대본

### 세션 1. 오리엔테이션 — 30분

멘토가 말할 핵심:

> 오늘은 Polymarket에서 영감을 받은 UI 흐름을 보지만, 실제 Polymarket을 복제하거나 실제 거래 기능을 만들지 않습니다. 우리는 play credits로 “확률과 상태가 움직이는 원리”만 배웁니다.

진행:

1. `README.md`의 “데모 1에서 무엇을 보나요?”를 보여줍니다.
2. 안전 경계를 칠판이나 문서에 적습니다.
   - no real money
   - no mainnet
   - no real wallet
   - no investment advice
   - no official affiliation
3. 브라우저에서 완성 데모를 빠르게 시연합니다.

멘티 질문:

- 이 앱이 실제 서비스가 아닌 이유는 무엇인가요?
- play credits를 쓰면 어떤 리스크를 줄일 수 있나요?

종료 기준:

- 멘티가 “이 앱은 학습용 시뮬레이션”이라고 말할 수 있습니다.

### 세션 2. 실행 환경 확인 — 50분

멘토가 말할 핵심:

> 코딩 수업의 첫 성공 기준은 멋진 기능이 아니라 “같은 명령을 실행했을 때 같은 화면을 보는 것”입니다.

진행:

```bash
node --version
npm --version
npm install
npm run dev
```

브라우저에서 확인:

- `Demo · Play credits`
- `Featured markets`
- `Markets`
- 안전 문구

멘티 실습:

1. 홈 화면에서 마켓 카드 하나를 클릭합니다.
2. 상세 페이지에서 chance, Amount, Buy Yes, Buy No, Portfolio를 찾습니다.

종료 기준:

- 멘티의 브라우저에서 홈과 상세 페이지가 열립니다.

### 세션 3. PRD 읽기 — 50분

멘토가 말할 핵심:

> AI에게 코드를 시키기 전에 “무엇을 만들지”와 “무엇을 만들지 않을지”를 먼저 정해야 합니다.

함께 읽을 위치:

- `docs/demo-1-prd-guide.md`의 “목표와 비목표”
- “사용자 플로우”
- “테스트 기준”

멘티 활동:

아래 플로우를 직접 적게 합니다.

```text
홈
→ 마켓 카드
→ 상세 페이지
→ Amount 입력
→ Buy Yes 또는 Buy No
→ chance 변경
→ portfolio/activity 변경
→ Resolve Yes 또는 Resolve No
→ simulated payout
→ mock wallet 확인
```

멘티 질문:

- 이 PRD에서 가장 중요한 비목표는 무엇인가요?
- 실제 지갑 연결을 넣지 않는 이유는 무엇인가요?

종료 기준:

- 멘티가 목표 2개와 비목표 2개를 구분해서 말합니다.

### 세션 4. 핵심 로직 읽기 — 70분

멘토가 말할 핵심:

> UI는 겉모습이고, 오늘의 핵심은 `src/lib/market-engine.ts`에 있는 순수 TypeScript 함수입니다.

읽을 순서:

1. `src/types/market.ts`
2. `src/data/markets.ts`
3. `src/lib/market-engine.ts`
4. `tests/unit/market-engine.test.ts`

설명 포인트:

- `Market`은 질문, 카테고리, 종료일, YES/NO pool을 담습니다.
- `Portfolio`는 balance, positions, transactions, settlements를 담습니다.
- YES chance는 단순히 `yesPool / (yesPool + noPool)`입니다.
- `applyTrade`는 거래를 적용하고 새 market/portfolio를 돌려줍니다.
- `settleMarket`은 winning stake에 따른 simulated payout을 계산합니다.

멘티 실습:

```bash
npm run test
```

테스트를 실행한 뒤 아래를 찾게 합니다.

- YES 구매 테스트
- NO 구매 테스트
- 잔액 초과 테스트
- 정산 테스트
- resolved market 거래 금지 테스트

멘티 질문:

- 왜 이 로직을 UI 컴포넌트 안에 전부 넣지 않았을까요?
- 테스트가 없다면 어떤 버그를 놓치기 쉬울까요?

종료 기준:

- 멘티가 “YES는 YES pool을 키우고, NO는 NO pool을 키운다”라고 설명합니다.

### 세션 5. UI 흐름 추적 — 70분

멘토가 말할 핵심:

> 이제 브라우저에서 누르는 버튼이 어떤 함수와 연결되는지 따라가 봅니다.

읽을 순서:

1. `src/app/page.tsx`
2. `src/components/market/MarketCard.tsx`
3. `src/app/markets/[slug]/page.tsx`
4. `src/components/market/TradePanel.tsx`
5. `src/components/portfolio/PortfolioSummary.tsx`
6. `src/components/wallet/WalletExperiment.tsx`

흐름 설명:

- 홈은 `seedMarkets`를 읽고 `MarketCard`를 렌더링합니다.
- 마켓 카드는 `/markets/[slug]`로 이동합니다.
- 상세 페이지는 `TradePanel`을 보여줍니다.
- `Buy Yes`와 `Buy No`는 `applyTrade`를 호출합니다.
- `Resolve Yes`와 `Resolve No`는 `settleMarket`을 호출합니다.
- `PortfolioSummary`는 현재 balance와 position을 보여줍니다.
- `WalletExperiment`는 실제 지갑이 아닌 demo address만 보여줍니다.

멘티 실습:

브라우저에서 직접:

1. Amount를 `50`으로 입력합니다.
2. `Buy Yes`를 클릭합니다.
3. chance, balance, activity가 바뀌는지 확인합니다.
4. `Resolve Yes`를 클릭합니다.
5. settlement 메시지를 확인합니다.
6. mock wallet을 connect/disconnect합니다.

종료 기준:

- 멘티가 버튼 클릭 하나를 코드 함수 하나와 연결해서 설명합니다.

### 세션 6. AI와 작은 변경 — 60분

멘토가 말할 핵심:

> AI에게 “전부 만들어줘”가 아니라 “작은 변경 하나, 바꿀 파일 후보, 검증 명령”을 요구합니다.

권장 실습 중 하나만 고릅니다.

#### 실습 A. 마켓 카드 설명 문구 개선

프롬프트:

```text
목표: 마켓 카드 설명을 초보자가 더 빨리 이해하게 만들고 싶어.
제약: 실제 돈, 메인넷, 투자 조언, Polymarket 브랜드 복사는 금지. 새 의존성도 금지.
요청: 수정 전에 바꿀 파일 후보를 알려주고, 작은 diff로 수정해줘. 수정 후 실행할 검증 명령도 알려줘.
```

#### 실습 B. 테스트가 보호하는 동작 설명

프롬프트:

```text
src/lib/market-engine.ts와 tests/unit/market-engine.test.ts를 읽고, 각 테스트가 어떤 사용자 흐름을 보호하는지 초보자 눈높이로 설명해줘. 아직 코드는 바꾸지 마.
```

#### 실습 C. activity 문구 개선

프롬프트:

```text
목표: 거래 후 Activity 영역의 문구를 멘티가 이해하기 쉽게 만들고 싶어.
제약: play credits만 사용하고, 실제 수익이나 투자 조언처럼 보이는 표현은 쓰지 마.
요청: 바꿀 파일 후보, 작은 수정, 검증 명령을 알려줘.
```

멘토가 반드시 시킬 것:

1. AI 답변에서 “바꿀 파일 후보”를 확인합니다.
2. 수정 후 `git diff`를 읽습니다.
3. 최소 `npm run test` 또는 AI가 제안한 명령을 실행합니다.
4. 멘티가 변경 내용을 자기 말로 설명합니다.

종료 기준:

- 멘티가 작은 변경 하나를 만들고, diff와 검증 결과를 설명합니다.

### 세션 7. 테스트와 디버깅 — 50분

멘토가 말할 핵심:

> “잘 되는 것 같아요”가 아니라 명령 결과를 증거로 남깁니다.

실행 순서:

```bash
npm run lint
npm run test
npm run build
```

가능하면:

```bash
npm run test:e2e
```

실패했을 때 멘티가 AI에게 줄 형식:

```text
명령: npm run build
관찰한 출력:
<첫 번째 전체 오류 블록>
기대값: 프로덕션 빌드 성공
바로 직전에 바꾼 것: <파일 또는 기능>
요청: 가장 가능성 높은 원인, 가장 작은 수정, 수정 뒤 다시 실행할 명령을 알려줘.
```

멘티 질문:

- lint, unit test, build, E2E는 각각 무엇을 확인하나요?
- 실패 로그에서 왜 첫 번째 오류를 먼저 봐야 하나요?

종료 기준:

- 멘티가 최소 하나의 명령 결과를 기록하고, 실패 시 첫 오류를 읽습니다.

### 세션 8. 포트폴리오 정리 — 40분

멘토가 말할 핵심:

> 좋은 포트폴리오 설명은 “무엇을 만들었다”뿐 아니라 “무엇을 일부러 제외했다”를 말합니다.

멘티 작성 템플릿:

```text
저는 하루짜리 바이브코딩 스터디에서 play credits 기반 예측시장 메커니즘 데모를 실행하고 분석했습니다.
홈에서 마켓을 선택하고, YES/NO를 눌러 toy probability, portfolio balance, activity가 바뀌는 흐름을 추적했습니다.
이 프로젝트는 실제 돈, 메인넷, 실거래, 실제 지갑 연결을 제외하고, 학습 가능한 순수 TypeScript 로직과 테스트에 집중했습니다.
```

멘티 발표 질문:

- 내가 가장 잘 이해한 파일은 무엇인가요?
- 아직 헷갈리는 파일은 무엇인가요?
- 테스트가 내 프로젝트 설명에 어떤 신뢰를 주나요?

종료 기준:

- 멘티가 프로젝트 설명 3문장과 검증 명령 결과를 남깁니다.

## 6. 멘토 운영 원칙

### 해야 할 것

- 먼저 완성 데모를 보여주고, 나중에 코드를 읽습니다.
- 모든 기능을 “사용자 화면 → 상태 변화 → 코드 함수 → 테스트” 순서로 연결합니다.
- 멘티에게 직접 `git diff`와 테스트 결과를 읽게 합니다.
- AI 답변을 그대로 믿지 말고 검증 명령으로 확인하게 합니다.
- 한국어 설명을 유지하되, `Market`, `Portfolio`, `Buy Yes`, `Resolve` 같은 핵심 용어는 함께 익히게 합니다.

### 하지 말 것

- 실제 거래 기능으로 확장하지 않습니다.
- 실제 지갑, RPC, 토큰, 입출금, 서명 기능을 붙이지 않습니다.
- “수익”, “투자”, “베팅 성공”처럼 오해될 수 있는 표현을 쓰지 않습니다.
- 테스트를 삭제해서 통과시키지 않습니다.
- 처음부터 전체 코드를 한 번에 설명하지 않습니다.

## 7. 멘티 평가 체크리스트

수업 마지막에 멘티별로 체크합니다.

- [ ] 로컬에서 앱을 실행했다.
- [ ] 홈에서 마켓 상세 페이지로 이동했다.
- [ ] Buy Yes 또는 Buy No 후 chance/balance/activity 변화를 봤다.
- [ ] Resolve 후 simulated payout을 봤다.
- [ ] mock wallet이 실제 지갑이 아니라고 설명했다.
- [ ] `src/lib/market-engine.ts`의 역할을 설명했다.
- [ ] `tests/unit/market-engine.test.ts`가 보호하는 동작 하나를 설명했다.
- [ ] `npm run test` 또는 다른 검증 명령 결과를 기록했다.
- [ ] AI에게 작은 요청을 하고 diff를 읽었다.
- [ ] 포트폴리오 설명 3문장을 작성했다.

## 8. 멘티에게 줄 첫 프롬프트

수업 초반에 그대로 붙여 넣게 할 수 있습니다.

```text
이 레포는 하루짜리 Polymarket 메커니즘 스터디입니다.
AGENTS.md, README.md, AI_GUIDE.md, LEARNER_GUIDE.md, docs/demo-1-prd-guide.md를 기준으로 설명해줘.
아직 코드는 바꾸지 마.

요청:
1. src/app, src/components, src/data, src/lib, tests, e2e가 각각 무슨 역할인지 알려줘.
2. 마켓 목록 → 상세 → Buy Yes/No → 확률 변화 → 포트폴리오 → 모의 정산 → mock wallet 흐름을 초보자 눈높이로 설명해줘.
3. 실제 돈, 메인넷, 실제 지갑이 왜 범위 밖인지 알려줘.
```

## 9. 수업 중 문제 대응

| 문제 | 멘토 대응 |
| --- | --- |
| `npm install`이 실패함 | Node.js 버전과 현재 폴더를 먼저 확인합니다. |
| `npm run dev`가 안 열림 | 터미널의 첫 오류와 포트 번호를 확인합니다. |
| Buy 버튼 클릭 후 변화가 없음 | Amount 값, market status, 브라우저 콘솔, `TradePanel.tsx`의 `trade` 함수를 확인합니다. |
| 테스트가 실패함 | 실패한 테스트 이름과 첫 오류 블록을 읽고, 코드 변경 직후 무엇이 바뀌었는지 비교합니다. |
| AI가 실제 지갑을 제안함 | “이 수업은 mock wallet과 play credits만 사용한다”고 다시 범위를 지정합니다. |
| 멘티가 코드를 전부 이해하려 함 | 오늘은 전체가 아니라 핵심 흐름과 검증 루틴을 이해하는 것이 목표라고 안내합니다. |

## 10. 한 문장 결론

이 레포는 멘티가 하루 안에 “예측시장 전체”가 아니라 **마켓 UI, YES/NO 상태 변화, play-credit 포트폴리오, 모의 정산, mock wallet, 테스트 검증 루틴**을 배울 수 있도록 설계된 학습 키트입니다.
