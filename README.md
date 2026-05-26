# 폴리마켓 원데이 바이브코딩 스터디

이 레포는 [`leeseongwo0/polymarket-clone-coding`](https://github.com/leeseongwo0/polymarket-clone-coding)을 바탕으로 만든 **하루짜리 Polymarket 메커니즘 스터디 키트**입니다. 완성된 데모를 먼저 실행해 보고, 같은 데모를 만들기 위한 PRD를 읽은 뒤, AI와 작은 단위로 구현·검증하는 흐름을 연습합니다.

> 안전 경계: 이 프로젝트는 교육용 시뮬레이션입니다. 플레이 크레딧만 사용하며 메인넷, 실제 돈, 베팅, 실거래, 투자 조언, Polymarket 공식 제휴가 없습니다. Polymarket 로고, 상표, 브랜드 자산도 복사하지 않습니다.

## 스터디 구조

| 순서 | 산출물 | 위치 | 목표 |
| --- | --- | --- | --- |
| 1 | 완성 데모 1 | 이 레포의 Next.js 앱 (`src/`) | 마켓 보기 → YES/NO 선택 → 확률/포트폴리오 변화 → 모의 정산 → 목업 지갑 흐름을 확인합니다. |
| 2 | 노베이스 개발환경 셋업 | [`docs/setup.md`](docs/setup.md) + 아래 “개발환경 준비” | macOS/Windows WSL2에서 Git, Node.js, npm, 실행 명령을 준비합니다. |
| 3 | 데모 제작 PRD 가이드 | [`docs/demo-1-prd-guide.md`](docs/demo-1-prd-guide.md) | AI에게 줄 요구사항을 제품 목표, 범위, 유저 플로우, 테스트 기준으로 나눕니다. |
| 4 | 바이브코딩 가이드 | [`AGENTS.md`](AGENTS.md), [`AI_GUIDE.md`](AI_GUIDE.md), [`LEARNER_GUIDE.md`](LEARNER_GUIDE.md), [`docs/vibe-coding-guide.md`](docs/vibe-coding-guide.md) | AI가 지켜야 할 규칙과 학습자가 AI에게 명령하는 방식을 분리합니다. |

## 데모 1에서 무엇을 보나요?

- 시드 학습용 마켓을 보여주는 Next.js 앱
- 학습자가 플레이 크레딧으로 YES 또는 NO를 선택하는 마켓 상세 페이지
- 모의 거래 후 확률이 움직이는 장난감 확률 모델
- 플레이 크레딧 지급을 보여주는 모의 정산 흐름
- 실제 지갑 연결 없이 UX만 맛보는 목업 지갑 실험
- lint, 단위 테스트, 빌드, E2E 테스트로 구성된 품질 확인 루틴

## 하루 운영안

| 시간 | 세션 | 산출물/종료 기준 |
| --- | --- | --- |
| 00:00–00:30 | 오리엔테이션 | 안전 경계, 완성 데모, 레포 구조를 이해합니다. |
| 00:30–01:30 | 개발환경 셋업 | `node --version`, `npm --version`, `npm install`, `npm run dev`까지 확인합니다. |
| 01:30–02:20 | PRD 읽기 | `docs/demo-1-prd-guide.md`를 읽고 AI에게 줄 첫 프롬프트를 작성합니다. |
| 02:20–03:40 | 핵심 로직 바이브코딩 | `src/lib/market-engine.ts`와 단위 테스트의 역할을 설명할 수 있습니다. |
| 03:40–05:00 | UI 흐름 바이브코딩 | 홈, 마켓 상세, 거래 패널, 포트폴리오, 목업 지갑 흐름을 추적합니다. |
| 05:00–06:00 | 디버깅/테스트 | `npm run lint`, `npm run test`, `npm run build`를 실행하고 실패 원인을 AI와 고칩니다. |
| 06:00–07:00 | E2E/정리 | `npm run test:e2e` 또는 수동 QA 증거를 남기고 포트폴리오 설명을 씁니다. |

## 개발환경 준비

아무것도 설치되어 있지 않다고 가정하고 시작합니다. 이 레포는 초보자가 헷갈리지 않도록 **npm만** 사용합니다. Node.js는 **20.9 이상**이면 됩니다. 설치 후에는 항상 `node --version`과 `npm --version`으로 확인하세요.

### macOS

1. **터미널 열기**
   - Spotlight에서 `Terminal`을 검색해 실행합니다.

2. **Apple 개발 도구 설치**

   ```bash
   xcode-select --install
   ```

   이미 설치되어 있다는 메시지가 나오면 넘어가도 됩니다.

3. **Homebrew 설치**
   - 공식 사이트: <https://brew.sh/>
   - 사이트에 표시되는 설치 명령을 터미널에 붙여 넣습니다.
   - 설치가 끝난 뒤 안내되는 `eval ...` 명령이 있으면 그대로 실행합니다.

4. **Git과 Node.js 설치**

   ```bash
   brew install git node
   ```

   Node.js 공식 다운로드 페이지를 사용해도 됩니다: <https://nodejs.org/en/download/>

5. **설치 확인**

   ```bash
   git --version
   node --version
   npm --version
   ```

   `node --version`이 `v20.9.0` 이상이면 이 레포를 실행할 수 있습니다.

### Windows — WSL2 권장

Windows에서는 PowerShell에서 직접 개발하기보다 **WSL2 + Ubuntu**를 권장합니다. 프로젝트 파일도 Windows의 `C:\...` 아래가 아니라 WSL 안의 `~/projects` 같은 Linux 경로에 두는 편이 문제를 줄입니다.

1. **WSL2 설치**
   - Microsoft 공식 한국어 문서: <https://learn.microsoft.com/ko-kr/windows/wsl/install>
   - WSL 개발 환경 설정 한국어 문서: <https://learn.microsoft.com/ko-kr/windows/wsl/setup/environment>

   관리자 권한 PowerShell에서 실행합니다.

   ```powershell
   wsl --install -d Ubuntu
   ```

   설치 후 재부팅하라는 안내가 나오면 재부팅합니다. Ubuntu가 처음 열리면 Linux 사용자 이름과 비밀번호를 만듭니다.

2. **Ubuntu 업데이트**

   아래 명령은 **Ubuntu 터미널**에서 실행합니다.

   ```bash
   sudo apt update
   sudo apt upgrade -y
   ```

3. **기본 개발 도구 설치**

   ```bash
   sudo apt install -y git curl ca-certificates build-essential
   ```

4. **Node.js 설치**

   가장 쉬운 방법은 Node.js 공식 다운로드 페이지의 Linux/nvm 안내를 따르는 것입니다: <https://nodejs.org/en/download/>

   설치 후 Ubuntu 터미널에서 확인합니다.

   ```bash
   node --version
   npm --version
   ```

   `node --version`이 `v20.9.0` 이상인지 확인하세요.

5. **프로젝트 폴더 만들기**

   ```bash
   mkdir -p ~/projects
   cd ~/projects
   ```

   GitHub에서 이 레포를 clone했다면 해당 폴더로 들어갑니다. zip으로 받았다면 WSL의 `~/projects` 아래에 압축을 풀어 사용하세요.

## 빠른 시작

프로젝트 폴더 안에서 실행합니다.

```bash
npm install
npm run dev
```

브라우저에서 <http://localhost:3000>을 열고 시드 마켓을 선택하세요. WSL2에서 실행했다면 Windows 브라우저에서도 같은 주소로 접속할 수 있습니다.

## 품질 확인

```bash
npm run lint
npm run test
npm run build
npm run test:e2e
```

Playwright 브라우저가 아직 설치되지 않았다면 한 번만 실행합니다.

```bash
npx playwright install chromium
```

학습 중에는 수동 QA로 보완할 수 있습니다. 다만 최종 완료를 말할 때는 `npm run test:e2e`가 통과했거나, 통과하지 못한 정확한 이유를 문서화해야 합니다.

## 프로젝트 구조

```text
AGENTS.md                  AI 코딩 에이전트가 반드시 읽어야 하는 프로젝트 규칙
AI_GUIDE.md                AI가 데모를 수정할 때 참고하는 작업 가이드
LEARNER_GUIDE.md           학습자가 AI에게 명령할 때 참고하는 가이드
src/app/                   Next.js App Router 페이지와 읽기 전용 API 라우트
src/components/            마켓 UI, 포트폴리오, 학습 콜아웃, 목업 지갑
src/data/markets.ts        시드 학습용 마켓
src/lib/market-engine.ts   순수 TypeScript 예측시장 장난감 모델
src/lib/portfolio-store.ts 클라이언트 localStorage 도우미
tests/unit/                Vitest 도메인 테스트
e2e/                       Playwright 스모크 테스트
docs/                      셋업, PRD, 안전, 바이브코딩, 배포, 포트폴리오 문서
```

## 추천 학습 순서

1. `README.md`로 전체 구조와 설치 과정을 훑습니다.
2. `npm run dev`로 완성 데모 1을 먼저 만져봅니다.
3. [`docs/demo-1-prd-guide.md`](docs/demo-1-prd-guide.md)를 읽고 “무엇을 만들지”를 제품 문서로 정리합니다.
4. [`LEARNER_GUIDE.md`](LEARNER_GUIDE.md)의 프롬프트 템플릿을 사용해 AI에게 작은 작업을 시킵니다.
5. AI가 코드를 바꾸면 `git diff` 또는 에디터 diff를 읽고, `npm run test`부터 확인합니다.
6. 마지막에 `npm run lint && npm run test && npm run build && npm run test:e2e`를 실행합니다.

## 배포

이 앱은 Vercel에 올리기 쉬운 Next.js 구조입니다.

1. 레포를 GitHub에 push합니다.
2. Vercel에서 프로젝트를 import합니다.
3. 기본 빌드 명령을 `npm run build`로 유지합니다.
4. 배포 URL을 포트폴리오/데모 링크로 공유합니다.

자세한 절차는 [`docs/deployment.md`](docs/deployment.md)를 보세요.

## 포트폴리오 설명 예시

> 하루짜리 바이브코딩 스터디에서 Polymarket에서 영감을 받은 시뮬레이션 전용 예측시장 메커니즘 실험실을 만들었습니다. Next.js, TypeScript, Tailwind를 사용했고, 도메인 로직은 테스트하기 쉬운 순수 TypeScript 장난감 모델로 분리했습니다. 앱은 마켓 보기, YES/NO 포지션 변화, 확률 움직임, 플레이 크레딧 기반 모의 정산을 설명합니다. 메인넷, 실제 돈, 투자 조언, 실거래 복잡도는 의도적으로 제외했습니다.

더 긴 설명은 [`docs/portfolio-guide.md`](docs/portfolio-guide.md)를 참고하세요.
