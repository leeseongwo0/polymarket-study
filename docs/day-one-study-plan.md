# 원데이 스터디 운영안

## 목표

하루가 끝났을 때 학습자는 다음을 할 수 있어야 합니다.

- 완성 데모 1을 로컬에서 실행한다.
- PRD를 읽고 AI에게 작은 구현 단위로 요청한다.
- YES/NO 장난감 확률 모델과 play-credit 포트폴리오 흐름을 설명한다.
- 테스트/빌드 명령으로 “작동한다”는 증거를 남긴다.
- 안전 경계와 의도적 비목표를 포트폴리오 문장으로 설명한다.

## 준비물

- 노트북
- GitHub 계정
- Node.js 20.9 이상
- VS Code 또는 선호 에디터
- AI 코딩 도구(Codex, Copilot, Cursor 등)

## 세션별 진행

### 1. 오리엔테이션 — 30분

- `README.md`의 스터디 구조 확인
- 완성 데모 1 실행 화면 시연
- 안전 경계 확인: play credits, no mainnet, no real money, no affiliation

종료 기준: 학습자가 이 앱이 “실제 거래 앱이 아닌 학습용 시뮬레이션”이라고 말할 수 있습니다.

### 2. 셋업 — 60분

- `docs/setup.md`를 따라 Git/Node/npm 확인
- `npm install`
- `npm run dev`

종료 기준: 브라우저에서 홈 화면이 보입니다.

### 3. PRD 읽기 — 50분

- `docs/demo-1-prd-guide.md`의 목표/비목표/유저 플로우 확인
- AI에게 줄 첫 프롬프트 작성

종료 기준: “무엇을 만들지, 무엇을 만들지 않을지”를 구분합니다.

### 4. 핵심 로직 — 80분

- `src/lib/market-engine.ts` 읽기
- `tests/unit/market-engine.test.ts` 실행 및 해석
- AI에게 작은 테스트 추가 또는 설명 요청

종료 기준: YES/NO 구매가 확률, 잔액, 포지션을 어떻게 바꾸는지 설명합니다.

### 5. UI 흐름 — 80분

- `src/app/page.tsx`, `src/components/market/TradePanel.tsx` 읽기
- 브라우저에서 Buy Yes/Buy No/Resolve/Mock wallet 흐름 확인
- 간단한 문구 또는 UI 표시를 AI와 수정해 보기

종료 기준: UI에서 일어난 변화가 어떤 state 함수와 연결되는지 추적합니다.

### 6. 검증과 디버깅 — 60분

- `npm run lint`
- `npm run test`
- `npm run build`
- 실패 시 첫 오류 블록을 AI에게 붙여 넣고 수정

종료 기준: 최소 lint/test/build 결과를 기록합니다.

### 7. E2E와 포트폴리오 정리 — 60분

- `npx playwright install chromium` 필요 시 실행
- `npm run test:e2e`
- `docs/portfolio-guide.md`를 바탕으로 자기 설명 작성

종료 기준: 자동 E2E 또는 수동 QA 증거와 포트폴리오 문장 1개를 남깁니다.
