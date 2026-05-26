# Polymarket 개요

> 기준일: 2026-05-19
> 이 문서는 이 레포의 학습 배경을 설명하기 위한 자료입니다. 실제 Polymarket 사용, 거래, 베팅, 투자 판단을 권하지 않습니다. 이 레포의 앱은 계속 **play credits 기반 데모**로만 다룹니다.

## 한 문장 요약

Polymarket은 현실 세계의 사건이 어떻게 끝날지에 대해 사용자가 `Yes` 또는 `No` outcome share를 사고팔며 시장 가격으로 확률을 표현하는 예측시장(prediction market) 플랫폼입니다.

공식 문서는 Polymarket을 “real-world events”의 결과에 대해 사용자가 서로 share를 거래하는 peer-to-peer 시장으로 설명합니다. 가격은 특정 결과가 일어날 가능성에 대한 시장의 집단적 믿음을 나타냅니다.

## 예측시장이란?

예측시장은 질문을 거래 가능한 시장으로 바꿉니다.

예를 들어 질문이 다음과 같다고 가정합니다.

```text
Will every learner explain the demo by the end of today's study?
```

그러면 보통 두 outcome이 생깁니다.

- `Yes`: 사건이 일어난다.
- `No`: 사건이 일어나지 않는다.

Polymarket의 공식 설명에 따르면 share 가격은 `$0.00`부터 `$1.00` 사이에서 움직이고, 예를 들어 `Yes` share가 `$0.65`라면 시장이 대략 65% 가능성으로 보고 있다는 뜻입니다.

이 레포의 앱은 같은 아이디어를 훨씬 단순하게 바꿔서 보여줍니다.

| 실제 Polymarket | 이 레포의 데모 |
| --- | --- |
| 실제 collateral과 outcome token | play credits |
| order book / CLOB | 단순 YES/NO pool 계산 |
| onchain settlement | 브라우저 localStorage 상태 |
| UMA oracle resolution | 버튼으로 실행하는 demo resolution |
| 실제 사용자 간 거래 | 학습자 혼자 실행하는 시뮬레이션 |

## 현재 영향력

Polymarket은 단순한 크립토 앱을 넘어, “사건의 확률을 실시간 데이터로 보여주는 서비스”로 주목받고 있습니다.

### 1. 예측시장 카테고리의 대표 사례

ICE(Intercontinental Exchange)는 2025년 10월 Polymarket에 최대 20억 달러를 투자한다고 발표하면서, Polymarket을 “prediction market and information platform”으로 설명했습니다. 같은 발표에서 ICE는 Polymarket의 event-driven data를 전 세계 고객에게 제공하는 배포자가 되겠다고 밝혔습니다.

KPMG의 2026년 보고서는 Kalshi와 Polymarket의 합산 거래량이 2025년에 400억 달러를 넘었고, 2024년 약 90억 달러에서 400% 이상 성장했다고 설명합니다. 같은 보고서는 Polymarket이 2025년 10월 월간 거래량 30억 달러를 넘었다고 인용합니다.

### 2. 금융·데이터 업계의 관심

ICE는 New York Stock Exchange의 모회사입니다. ICE가 Polymarket의 event-driven data를 기관 고객에게 제공하겠다고 발표했다는 점은, Polymarket odds가 단순한 앱 내부 지표를 넘어 “시장 심리 데이터”처럼 소비될 수 있음을 보여줍니다.

이 레포의 관점에서는 이 지점이 중요합니다. 우리가 따라 배우는 것은 “돈을 거는 법”이 아니라, 아래와 같은 제품/데이터 구조입니다.

- 사건을 질문으로 바꾸는 방식
- 질문을 `Yes` / `No` outcome으로 나누는 방식
- 가격 또는 확률을 핵심 UI 지표로 보여주는 방식
- 거래와 정산을 사용자에게 이해 가능한 흐름으로 만드는 방식

### 3. 스포츠·미디어·대중문화로 확장

AP는 2026년 3월 MLB가 Polymarket과 공식 파트너십을 맺고 CFTC와 integrity 관련 협력 체계를 만들었다고 보도했습니다. 해당 기사에 따르면 Polymarket은 MLB 로고 접근권과 Sportradar의 공식 리그 데이터 접근권을 받게 됩니다. 기사에서는 NHL, MLS 등 다른 스포츠/엔터테인먼트 영역의 prediction market 파트너십도 언급합니다.

Le Monde는 2026년 초 Polymarket이 수천 개의 질문을 제공하고, 방문자와 active trader 규모가 커졌다고 보도했습니다. 동시에 내부정보, 규제, 윤리적 문제도 함께 제기했습니다.

즉 Polymarket의 영향력은 두 방향으로 커지고 있습니다.

- 정보 제품: “사람들이 어떤 사건을 몇 %로 보고 있는가?”
- 거래 제품: “그 확률에 대해 포지션을 잡을 수 있는가?”

이 레포는 첫 번째, 즉 **정보 구조와 제품 메커니즘**을 학습 대상으로 삼습니다.

## 기술적으로 어떻게 작동하나?

Polymarket의 실제 구조는 이 레포보다 훨씬 복잡합니다. 큰 흐름은 다음과 같습니다.

```text
Market question
  → Yes/No outcome tokens
  → order book trading
  → signed orders
  → onchain settlement
  → oracle-based resolution
  → winning token redemption
```

### 1. Market과 outcome token

Polymarket 공식 문서에 따르면 각 market의 예측은 outcome token으로 표현됩니다. 보통 binary market에는 두 token이 있습니다.

- `Yes`: 사건이 발생하면 `$1.00`로 redeem
- `No`: 사건이 발생하지 않으면 `$1.00`로 redeem

이 token들은 Polygon 위의 ERC1155 자산이며, Gnosis Conditional Token Framework(CTF)를 사용합니다. 공식 문서는 Yes/No pair가 pUSD collateral로 fully backed 된다고 설명합니다.

### 2. 가격은 확률처럼 읽힌다

Polymarket에서 outcome share는 `$0.00`에서 `$1.00` 사이 가격으로 거래됩니다.

- `Yes`가 `$0.40`이면 시장은 약 40%로 보는 셈입니다.
- `Yes`가 `$0.75`이면 시장은 약 75%로 보는 셈입니다.
- 반대로 `No` 가격은 사건이 일어나지 않을 가능성을 나타냅니다.

그래서 UI에서 `chance`, `probability`, `Yes`, `No`, `Vol`, `Ends` 같은 정보가 중요합니다.

### 3. CLOB: offchain matching + onchain settlement

Polymarket의 개발자 문서는 CLOB(Central Limit Order Book)를 hybrid-decentralized trading system이라고 설명합니다.

핵심은 다음과 같습니다.

- 주문 매칭은 offchain order book에서 처리됩니다.
- 주문은 EIP-712 signed message입니다.
- 체결된 trade는 Polygon의 Exchange contract에서 atomically settle 됩니다.
- operator는 사용자 허가 없이 가격을 정하거나 거래를 실행할 수 없다고 설명합니다.

즉 사용자 경험은 일반 거래 앱처럼 빠르게 보이지만, settlement와 asset ownership은 smart contract와 wallet 구조를 포함합니다.

### 4. Wallet과 custody

Polymarket 공식 문서는 non-custodial 구조를 강조합니다. 사용자는 자신의 funds를 wallet으로 관리하고, smart contract가 거래와 settlement를 강제합니다.

또한 최근 문서는 smart wallet 구조를 설명합니다. Polymarket은 사용자가 매번 직접 onchain transaction을 제출하지 않아도 거래할 수 있도록 deposit wallet, Safe, proxy wallet, ERC-1271 validation 같은 wallet type을 지원합니다.

이 레포는 이 부분을 구현하지 않습니다. 대신 `src/components/wallet/WalletExperiment.tsx`에서 **Demo wallet** UI만 보여줍니다.

### 5. Resolution: UMA Optimistic Oracle

Polymarket 공식 문서에 따르면 market 결과가 알려지면 UMA Optimistic Oracle을 통해 resolution이 진행됩니다.

간단히 말하면 다음 순서입니다.

1. 누군가 outcome을 propose합니다.
2. challenge period가 있습니다.
3. 다른 사람이 dispute할 수 있습니다.
4. dispute가 이어지면 UMA token holder vote로 escalation될 수 있습니다.
5. market이 resolve되면 winning token은 `$1.00`로 redeem되고 losing token은 `$0.00`이 됩니다.

이 레포의 `Resolve Yes` / `Resolve No` 버튼은 이 복잡한 절차를 학습용으로 축약한 것입니다.

## 이 레포에서 어떤 부분을 배우면 좋을까?

### 제품 관점

- market question을 어떻게 카드로 보여주는가: `src/components/market/MarketCard.tsx`
- `chance`, `Vol`, `Ends`, `Live` 같은 지표가 왜 중요한가
- detail page에서 action과 feedback을 어떻게 배치하는가: `src/components/market/TradePanel.tsx`
- portfolio와 activity가 사용자의 이해를 어떻게 돕는가: `src/components/portfolio/PortfolioSummary.tsx`

### 도메인 로직 관점

- `src/lib/market-engine.ts`
  - `calculateYesProbability`
  - `applyTrade`
  - `settleMarket`
- 실제 Polymarket의 CLOB/CTF/oracle을 그대로 만들지 않고, 핵심 개념만 장난감 모델로 분리한 이유

### 테스트 관점

- `tests/unit/market-engine.test.ts`: 확률 이동과 정산 규칙을 보호
- `e2e/market-flow.spec.ts`: 사용자가 market을 열고, Buy Yes/No를 누르고, resolution과 demo wallet을 확인하는 흐름을 보호

## 주의해서 봐야 할 한계

Polymarket의 확률은 유용한 market signal일 수 있지만, 항상 “진실”이나 “정확한 예측”은 아닙니다.

주의할 점은 다음과 같습니다.

- 유동성이 낮은 market은 가격이 쉽게 흔들릴 수 있습니다.
- 내부정보, 조작, 규제, 윤리 문제가 논의됩니다.
- resolution rule을 잘못 읽으면 market title만 보고 오해할 수 있습니다.
- 실제 Polymarket은 지역별 규제와 접근 제한의 영향을 받습니다.

그래서 이 레포는 Polymarket을 “따라 거래하는 법”이 아니라, **복잡한 예측시장 제품을 안전한 코드 학습 소재로 분해하는 법**을 배우기 위해 사용합니다.

## Four Pillars 한국어 글로 더 읽기

Four Pillars는 Polymarket과 예측시장을 한국어로 설명한 글을 여러 편 발행했습니다. 이 문서의 공식 문서 중심 설명을 읽은 뒤, 아래 글들을 함께 보면 “왜 이 제품이 주목받는지”와 “어떤 한계를 같이 봐야 하는지”를 더 입체적으로 이해할 수 있습니다.

### 1. 미래를 비추는 하나의 방법: Polymarket

- 링크: <https://research.4pillars.io/ko/research/polymarket>
- 핵심 관점: Polymarket을 단순 베팅 앱이 아니라, 투기적 수요와 정보 수집 기능을 동시에 가진 온체인 consumer application으로 해석합니다.
- 특히 유용한 부분:
  - Augur와 비교해 Polymarket이 왜 복잡한 프로토콜 요소를 줄이고 사용자 경험을 단순화했는지
  - market creation을 완전 permissionless로 열기보다 큐레이션한 이유
  - Polygon, USDC, UMA Optimistic Oracle을 통해 사용자가 느끼는 복잡도를 줄인 방식
  - 향후 확장 방향으로 interoperability와 permissionless market creation을 검토하는 관점
- 이 레포와 연결해서 볼 부분:
  - `src/components/market/TradePanel.tsx`가 실제 CLOB/오라클을 구현하지 않고 `Buy Yes` / `Buy No` / `Resolve` 흐름만 남긴 이유
  - `DESIGN.md`가 Polymarket UI의 정보 구조를 참고하되, 브랜드 자산이나 복잡한 거래 기능을 복제하지 않는 이유

### 2. 과연 폴리마켓의 여론은 정확할까?

- 링크: <https://4pillars.io/ko/issues/is-polymarkets-public-opinion-accurate>
- 핵심 관점: Polymarket의 odds를 “새로운 여론”처럼 볼 수 있지만, 그것이 곧 정확한 여론조사나 진실은 아니라는 점을 설명합니다.
- 특히 유용한 부분:
  - 온체인 데이터는 사후 조작이 어렵지만, 외부에서 어떤 돈과 의도가 들어왔는지는 별개의 문제라는 구분
  - 큰 자본이 특정 방향으로 베팅할 때 나타날 수 있는 여론 왜곡 가능성
  - Polymarket 사용자의 지역·성별·연령 분포가 전체 모집단을 대표하지 못할 수 있다는 지적
  - UMA oracle과 resolution 신뢰성에 대한 문제 제기
- 이 레포와 연결해서 볼 부분:
  - `docs/safety-and-scope.md`와 이 문서의 “주의해서 봐야 할 한계” 섹션
  - `e2e/market-flow.spec.ts`가 “odds가 바뀐다”는 동작을 테스트하지만, “odds가 진실이다”라고 말하지 않는 이유

### 3. X와 폴리마켓 - 인포 파이낸스의 새로운 도전

- 링크: <https://4pillars.io/ko/issues/x-and-polymarket-info-finance-new-challenge>
- 핵심 관점: Polymarket이 X 같은 소셜 플랫폼과 결합할 때, 정보 소비가 곧 예측 참여로 이어지는 info finance 흐름을 만들 수 있다는 관점입니다.
- 특히 유용한 부분:
  - 소셜 피드, 뉴스, AI 요약, prediction market이 결합될 때 사용자 행동이 어떻게 바뀔 수 있는지
  - 예측시장이 단순 거래 화면이 아니라 정보 유통 인터페이스가 될 수 있다는 해석
- 이 레포와 연결해서 볼 부분:
  - 지금은 market board와 detail page만 있지만, 향후 학습 과제로 “뉴스/설명/근거 패널”을 붙인다면 어떤 제품 구조가 될 수 있는지 토론할 수 있습니다.

### 4. 예측시장이란 무엇인가

- 링크: <https://research.4pillars.io/ko/research/the-definitive-guide-to-prediction-markets>
- 핵심 관점: Polymarket 하나만이 아니라 prediction market 전체 산업을 기술 스택, 규제, market engine, resolution, distribution 관점에서 정리합니다.
- 특히 유용한 부분:
  - Polymarket과 Kalshi가 예측시장 기술·규제 모델의 기준점처럼 기능한다는 설명
  - onchain settlement, ERC-1155 position, hybrid CLOB, API/bot 생태계 등 Polymarket의 기술적 특징
  - CLOB, AMM, event structure, collateral, oracle, regulation을 한 번에 비교하는 구조
- 이 레포와 연결해서 볼 부분:
  - `src/lib/market-engine.ts`의 toy pool model이 실제 Polymarket CLOB과 얼마나 다른지 비교하는 학습 자료
  - 원데이 이후 확장 토론에서 “실제 구현하려면 어떤 레이어가 추가로 필요한가?”를 정리하는 참고 자료

정리하면, Four Pillars의 글들은 Polymarket을 다음 네 관점으로 나눠 보게 해줍니다.

| 관점 | 추천 글 | 이 레포에서 연결할 질문 |
| --- | --- | --- |
| 제품 전략 | 미래를 비추는 하나의 방법 | 왜 복잡한 기능보다 사용 흐름이 먼저인가? |
| 데이터 신뢰성 | 과연 폴리마켓의 여론은 정확할까? | odds를 어떻게 읽어야 과장하지 않는가? |
| 정보 금융 | X와 폴리마켓 | market UI가 정보 소비와 어떻게 연결되는가? |
| 기술 스택 | 예측시장이란 무엇인가 | toy model과 실제 CLOB/oracle 구조는 어떻게 다른가? |

## 더 읽을 자료

- Polymarket 101: <https://docs.polymarket.com/polymarket-101>
- Polymarket CLOB overview: <https://docs.polymarket.com/trading/overview>
- Positions & Tokens: <https://docs.polymarket.com/concepts/positions-tokens>
- Resolution / UMA oracle: <https://docs.polymarket.com/concepts/resolution>
- ICE strategic investment in Polymarket: <https://ir.theice.com/press/news-details/2025/ICE-Announces-Strategic-Investment-in-Polymarket/default.aspx>
- KPMG prediction markets report: <https://kpmg.com/kpmg-us/content/dam/kpmg/pdf/2026/prediction-markets-paths-to-entry.pdf>
- AP: MLB partnership with Polymarket: <https://apnews.com/article/mlb-prediction-markets-polymarket-79965008b559ea3c00940ea6e92dd509>
