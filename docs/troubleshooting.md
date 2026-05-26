# 문제 해결

## `npm install`이 실패합니다

- `node --version`으로 Node.js가 20.9 이상인지 확인합니다.
- `node_modules`와 `package-lock.json`을 삭제한 뒤 `npm install`을 다시 시도합니다.

## 개발 서버가 시작되지 않습니다

- 다른 프로세스가 3000번 포트를 사용 중인지 확인합니다.
- `npm run dev -- --port 3001`로 다른 포트를 사용해 봅니다.

## 단위 테스트가 실패합니다

- 첫 번째 실패 테스트를 읽습니다.
- `src/lib/market-engine.ts`가 바뀌었는지 확인합니다.
- 코드를 고치기 전에 AI 어시스턴트에게 기대 불변식을 설명해 달라고 요청합니다.

## E2E 테스트가 실패합니다

- `npx playwright install chromium`으로 Chromium을 한 번 설치합니다.
- `npm run dev`를 직접 실행하고 앱이 보이는지 확인합니다.
- 그다음 `npm run test:e2e`를 다시 실행합니다.

## 빌드가 실패합니다

- 먼저 `npm run lint`와 `npm run test`를 실행합니다.
- `npm run build`의 TypeScript 오류를 읽습니다.
- 뒤쪽 오류를 쫓기 전에 가장 앞의 오류부터 고칩니다.

## 배포가 실패합니다

- 빌드 명령이 `npm run build`인지 확인합니다.
- Vercel이 npm과 같은 Node 메이저 버전을 쓰는지 확인합니다.
- 로컬에서 `npm run build`를 다시 실행해 첫 오류를 비교합니다.
