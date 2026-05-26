# 노베이스 개발환경 셋업

이 문서는 개발을 거의 처음 시작하는 학습자를 기준으로 작성했습니다. 목표는 “내 컴퓨터에서 완성 데모 1을 실행하고 테스트 명령까지 확인”하는 것입니다.

## 최종 목표

아래 명령이 프로젝트 폴더에서 실행되면 셋업 성공입니다.

```bash
node --version
npm --version
npm install
npm run dev
```

브라우저에서 <http://localhost:3000>을 열어 마켓 화면이 보이면 됩니다.

## 공통 원칙

- 이 레포는 **npm만** 사용합니다.
- Node.js는 **20.9 이상**을 사용합니다.
- 명령은 프로젝트 폴더 안에서 실행합니다.
- Windows 사용자는 가능하면 WSL2 Ubuntu 안에 프로젝트를 둡니다.

## macOS 상세 절차

### 1. 터미널 열기

Spotlight에서 `Terminal`을 검색해 실행합니다.

### 2. Apple 개발 도구 설치

```bash
xcode-select --install
```

이미 설치되어 있다는 메시지가 나오면 넘어가도 됩니다.

### 3. Homebrew 설치

공식 사이트 <https://brew.sh/>에 있는 설치 명령을 복사해 터미널에 붙여 넣습니다. 설치 완료 후 안내되는 `eval ...` 명령이 있으면 그대로 실행합니다.

### 4. Git과 Node.js 설치

```bash
brew install git node
```

Node.js 공식 다운로드 페이지를 사용해도 됩니다: <https://nodejs.org/en/download/>

### 5. 설치 확인

```bash
git --version
node --version
npm --version
```

`node --version`이 `v20.9.0` 이상이면 통과입니다.

## Windows 상세 절차 — WSL2 권장

### 1. WSL2 + Ubuntu 설치

관리자 권한 PowerShell에서 실행합니다.

```powershell
wsl --install -d Ubuntu
```

공식 문서:
- <https://learn.microsoft.com/ko-kr/windows/wsl/install>
- <https://learn.microsoft.com/ko-kr/windows/wsl/setup/environment>

설치 후 재부팅 안내가 나오면 재부팅합니다. Ubuntu가 처음 열리면 Linux 사용자 이름과 비밀번호를 만듭니다.

### 2. Ubuntu 업데이트

아래 명령은 **Ubuntu 터미널**에서 실행합니다.

```bash
sudo apt update
sudo apt upgrade -y
```

### 3. 기본 개발 도구 설치

```bash
sudo apt install -y git curl ca-certificates build-essential
```

### 4. Node.js 설치

Node.js 공식 다운로드 페이지의 Linux/nvm 안내를 따릅니다: <https://nodejs.org/en/download/>

설치 후 확인합니다.

```bash
node --version
npm --version
```

`node --version`이 `v20.9.0` 이상이어야 합니다.

### 5. 프로젝트 폴더 만들기

```bash
mkdir -p ~/projects
cd ~/projects
```

GitHub에서 clone했다면 해당 레포 폴더로 들어갑니다. zip으로 받았다면 WSL의 `~/projects` 아래에 압축을 풀어 사용하세요.

## 레포 실행

```bash
npm install
npm run dev
```

브라우저에서 <http://localhost:3000>을 엽니다. WSL2에서 실행해도 Windows 브라우저에서 같은 주소로 접속할 수 있습니다.

## 테스트 도구 설치

E2E 테스트를 처음 실행하기 전 Chromium을 설치해야 할 수 있습니다.

```bash
npx playwright install chromium
```

그다음 확인합니다.

```bash
npm run lint
npm run test
npm run build
npm run test:e2e
```

## 흔한 막힘

| 증상 | 먼저 확인할 것 |
| --- | --- |
| `npm install` 실패 | `node --version`이 20.9 이상인지 확인합니다. |
| `npm run dev` 포트 오류 | 이미 3000번 포트를 쓰는 앱이 있는지 확인하고 `npm run dev -- --port 3001`을 사용합니다. |
| WSL에서 파일이 느림 | 프로젝트가 `/mnt/c/...`가 아니라 `~/projects/...` 아래에 있는지 확인합니다. |
| E2E 브라우저 오류 | `npx playwright install chromium`을 실행합니다. |
| 빌드 실패 | 첫 번째 TypeScript/ESLint 오류부터 AI에게 붙여 넣고 분석시킵니다. |
