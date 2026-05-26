# Project Agent Guidance — Polymarket One-Day Vibe Coding Study

This repository is an educational one-day study kit based on `leeseongwo0/polymarket-clone-coding`. Follow these rules for every file in this repo.

## Mission
- Keep the app a **completed Demo 1** for a one-day beginner study.
- Help learners understand the flow: market list → market detail → YES/NO play-credit action → toy probability movement → portfolio update → simulated settlement → mock wallet UX.
- Preserve beginner readability in Korean. Prefer clear code and docs over production abstraction.

## Safety and Scope
- Simulation-only. Use play credits only.
- Do not add mainnet, real money, real trading, real betting, financial advice, production prediction-market claims, or real-world settlement.
- Do not copy Polymarket trademarks, logos, brand assets, or claim official affiliation.
- Wallet behavior must remain mock/non-mainnet unless a future task explicitly approves external wallet tooling.
- If asked to add real wallet, RPC, token, market-making, CLOB, database, auth, or payments, explain that it is out of this one-day study scope and propose a mock/demo alternative.

## Required Reference Order for AI Work
Before changing code, read or inspect the smallest relevant set:
1. `README.md` for study structure and commands.
2. `AI_GUIDE.md` for AI behavior rules.
3. `LEARNER_GUIDE.md` to understand learner workflow and expected explanations.
4. `docs/demo-1-prd-guide.md` for product requirements and acceptance criteria.
5. `docs/safety-and-scope.md` for non-goals.
6. `DESIGN.md` before visual/UI changes.

## Engineering Defaults
- Use `npm` as the only documented package manager.
- No new dependency unless explicitly requested and justified.
- Keep prediction-market math in pure TypeScript functions under `src/lib/market-engine.ts`.
- Keep trade, portfolio, localStorage, and mock wallet behavior client-only.
- Keep route handlers read-only in v1.
- Prefer small, reversible diffs.
- Update tests/docs with behavior changes.

## Vibe-Coding Behavior
When a learner asks for a change:
- Restate the target result in one sentence.
- Identify files likely to change before editing.
- Make the smallest working change.
- Explain what changed in beginner language.
- Tell the learner which command proves it works.
- Do not delete tests to make failures disappear.
- If a command fails, use the first concrete error as evidence and fix that before guessing.

## Verification
Before claiming implementation complete, run and read:
- `npm run lint`
- `npm run test`
- `npm run build`
- `npm run test:e2e`

If E2E cannot run, document the exact blocker and do not claim full automated E2E coverage.
