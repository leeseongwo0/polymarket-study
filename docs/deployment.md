# 배포 가이드

이 원데이 스터디 데모는 초보자가 npm으로 Vercel에 배포하기 쉽도록 구성했습니다.

## 배포 전 확인

로컬에서 아래 명령을 실행합니다.

```bash
npm run lint
npm run test
npm run build
npm run test:e2e
```

E2E가 막히면 프로젝트를 공유하기 전에 정확한 막힘 원인을 적어둡니다.

## GitHub 경로

1. GitHub 레포를 만듭니다.
2. 이 프로젝트를 push합니다.
3. `package.json`에 `dev`, `build`, `start`, `lint`, `test`, `test:e2e` 스크립트가 있는지 확인합니다.
4. README에 이 앱이 시뮬레이션 전용이며 Polymarket과 공식 제휴가 없다는 문장이 있는지 확인합니다.

## Vercel 경로

1. Vercel을 열고 **Add New Project**를 선택합니다.
2. GitHub 레포를 import합니다.
3. Framework preset은 **Next.js**로 둡니다.
4. Package manager는 **npm**을 선택합니다.
5. Build command는 `npm run build`입니다.
6. Output directory는 Next.js 기본값으로 둡니다.
7. Deploy를 누릅니다.

## 저장해 둘 포트폴리오 증거

- 배포 URL
- YES 또는 NO 모의 거래 후 마켓 상세 페이지 스크린샷
- 목업 지갑 실험 스크린샷 또는 메모
- lint, test, build, E2E 명령 출력
- 앱이 플레이 크레딧만 사용하고 실제 돈/메인넷 동작이 없다는 짧은 설명
