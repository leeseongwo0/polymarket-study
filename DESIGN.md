---
version: alpha
name: Polymarket Mechanics Lab design-analysis
status: Active
last_refreshed: 2026-05-19
description: >-
  A market-native design contract for the demo market browser: compact browse rails,
  featured market cards, probability-first tiles, concise Yes/No actions, and light card
  surfaces. Safety context remains present but secondary: Demo, Play credits, no affiliation.
colors:
  primary: "#1452F0"
  primary_active: "#0C4FE4"
  primary_soft: "#EAF1FF"
  ink: "#18181B"
  body: "#4B5563"
  muted: "#77808D"
  muted_soft: "#96AAB4"
  hairline: "#E6E8EA"
  hairline_strong: "#D7DCE2"
  canvas: "#FFFFFF"
  surface: "#F7F8FA"
  surface_card: "#FFFFFF"
  surface_blue: "#F3F7FF"
  yes: "#00B955"
  yes_soft: "#E9F9EF"
  no: "#E64800"
  no_soft: "#FFF0E8"
  warning: "#B8952E"
  warning_soft: "#FFF7DF"
typography:
  font_family: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
  display: "40-56px / 800 / -0.04em"
  title: "20-28px / 700 / -0.02em"
  body: "15-16px / 1.6 / 400"
  caption: "12-13px / 600 / 0.08em"
spacing:
  base_unit: "4px"
  page_gutter: "24px mobile, 40px desktop"
  section_gap: "32-48px"
  card_padding: "20-28px"
rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  pill: "9999px"
components:
  top_nav: "white sticky-feeling band, 64px high, lab wordmark left, compact safety pills right"
  topic_rail: "horizontal rounded chips for learning categories and constraints"
  market_card: "white card, 1px hairline, 20px padding, title + category + probability/volume/date metrics"
  probability_tile: "large numeric YES chance on pale-blue or pale-green panel"
  trade_panel: "white card with stake input, YES green button, NO red-orange button, status callout"
  portfolio_panel: "secondary white card with balance and two semantic position pills"
  learning_callout: "pale-blue educational aside, clear title, explanatory body"
  mock_wallet_callout: "pale-warning card, explicitly non-mainnet and non-credentialed"
---

# Design

## Source of truth
- Status: Active
- Last refreshed: 2026-05-19
- Primary product surfaces:
  - Home market browser: `src/app/page.tsx`
  - Market card grid: `src/components/market/MarketCard.tsx`
  - Market detail/trade flow: `src/components/market/TradePanel.tsx`
  - Portfolio and mock wallet side panels: `src/components/portfolio/PortfolioSummary.tsx`, `src/components/wallet/WalletExperiment.tsx`
  - Global tokens and page chrome: `src/styles/globals.css`
- Evidence reviewed:
  - External reference format: `VoltAgent/awesome-design-md` DESIGN.md files use metadata, token dictionaries, component contracts, responsive behavior, and known gaps.
  - Public Polymarket homepage, reviewed 2026-05-19: visible copy and structure include `Browse`, `New`, `Trending`, `Popular`, `Liquid`, `Ending Soon`, `Competitive`, `Topics`, `Featured markets`, `All markets`, market probabilities as `chance`, `Yes`/`No`, `$… Vol`, `Ends …`, and `Live`.
  - Public Polymarket CSS bundles, reviewed 2026-05-19: observed Inter font use, white canvas, hairline borders, `#1452F0`/`#0C4FE4` blue action accents, `#00B955` green positive semantics, and `#E64800` red-orange negative semantics.
  - Local repo evidence: README and `AGENTS.md` require demo/play-credit scope, no official affiliation, and no copied brand assets.
- Evidence vs. inference:
  - Observed: market-browser IA, white/card density, category rails, probability/Yes/No/Vol content patterns, CSS color/font signals.
  - Inferred/adapted: exact spacing/radius/component tokens below are safe approximations for this learning app, not extracted proprietary design specs.

## Brand
- Personality:
  - Clean, data-literate, fast-to-scan, and beginner-safe.
  - Market browser first; classroom framing second.
- Trust signals:
  - White canvas, restrained blue action color, compact data cards, clear labels, and small Demo/Play credits context.
  - Semantic colors are consistent: YES/up = green, NO/down = red-orange, learning/safety = blue or amber callouts.
- Avoid:
  - Logos, official brand assets, copied artwork, or language implying affiliation.
  - Repeated warning banners or legalistic prose in primary UI.
  - Dark neon “crypto terminal” styling as the default surface.

## Product goals
- Goals:
  - Teach the prediction-market mechanics flow: market list → market detail → YES/NO play-credit trade → probability/portfolio movement → simulated settlement.
  - Make the UI feel market-native through information density, category chips, probability tiles, and semantic action buttons.
  - Preserve beginner readability in Korean.
  - Keep `DESIGN.md` as the durable contract for future frontend changes.
- Non-goals:
  - Pixel-perfect Polymarket clone.
  - Use of Polymarket trademarks, logos, images, or official brand assets.
  - Real wallet, real signatures, mainnet, real money, trading, betting, financial advice, or production prediction-market functionality.
- Success signals:
  - A learner can identify current probability, volume, status, and action choices without reading docs.
  - Demo scope remains visible without overpowering the market browser.
  - All quality gates pass after applying the design.

## Personas and jobs
- Primary personas:
  - Beginner developers following a one-day vibe-coding study.
  - Vibe-coding learners using AI to scaffold, debug, and explain frontend/product decisions.
  - Portfolio builders explaining safe system design choices.
- User jobs:
  - Understand how a YES or NO action changes a toy probability model.
  - Inspect a portfolio and recent transactions after a trade.
  - Learn why this simulation deliberately excludes real market infrastructure.
- Key contexts of use:
  - Desktop during coding lessons.
  - Mobile/tablet for sharing portfolio demos.
  - Korean-first reading experience with English market terms where useful.

## Information architecture
- Primary navigation:
  - Lab wordmark/name, safety chips, and market category/constraint rail.
  - No auth/nav complexity in v1.
- Core routes/screens:
  - `/`: educational hero + category rail + seeded market card grid.
  - `/markets/[slug]`: detail shell + probability tile + trade form + portfolio/history/wallet/learning side panels.
  - `/api/markets`: read-only data boundary; not a UI surface.
- Content hierarchy:
  1. Safety context and learning promise.
  2. Market title/category/status.
  3. Probability and volume metrics.
  4. YES/NO action choices.
  5. Portfolio/history feedback.
  6. Learning explanation and mock-wallet safety.

## Design principles
- Principle 1: Reference ergonomics, not brand ownership.
  - Use the public product's structural lessons: cards, chips, probabilities, semantic actions.
  - Do not copy protected brand assets or imply affiliation.
- Principle 2: Probability is the hero metric.
  - Put the YES probability in large numeric form wherever a market is shown.
  - Surround it with small explanatory labels so beginners understand it is a toy model.
- Principle 3: Use real market UI nouns.
  - Prefer `Browse`, `Featured markets`, `chance`, `Vol`, `Ends`, `Live`, `Yes`, `No`, `Buy Yes`, and `Buy No` over explanatory meta labels.
  - Keep Korean helper text short and adjacent to the UI element it explains.
- Principle 4: Density with breathing room.
  - Use compact cards and chips, but keep Korean body copy at readable line heights.
- Tradeoffs:
  - This app intentionally uses fewer markets and more explanatory text than Polymarket because learning clarity outranks real-product density.
  - The visual system uses approximate public color cues, not a full brand extraction.

## Visual language
- Color:
  - Canvas: `#FFFFFF`; default page background uses `#F7F8FA` bands.
  - Ink: `#18181B`; body gray: `#4B5563`; muted gray: `#77808D`.
  - Primary action/link blue: `#1452F0`, active `#0C4FE4`, soft blue `#EAF1FF`.
  - YES/up: `#00B955`, soft `#E9F9EF`.
  - NO/down: `#E64800`, soft `#FFF0E8`.
  - Warning/mock-wallet: `#B8952E`, soft `#FFF7DF`.
  - Hairlines: `#E6E8EA` and `#D7DCE2`.
- Typography:
  - Use Inter/system UI; no licensed brand fonts.
  - Display: 40-56px, 800 weight, tight tracking for home hero.
  - Section/card titles: 20-28px, 700 weight.
  - Body: 15-16px, 1.55-1.7 line-height for Korean readability.
  - Numeric metrics may use tabular numerals (`font-variant-numeric: tabular-nums`).
- Spacing/layout rhythm:
  - Max content width ~1200-1280px.
  - Page gutters 24px mobile, 40px desktop.
  - Card gap 16-24px; section gap 32-48px.
  - Card padding 20px compact, 28px major.
- Shape/radius/elevation:
  - Cards use 20-24px radius, 1px hairline, and subtle `0 12px 32px rgba(15, 23, 42, 0.06)` shadows only for major surfaces.
  - Chips and action pills use full radius.
  - Avoid heavy glassmorphism and saturated dark gradients.
- Motion:
  - Small hover translate on cards is acceptable (`-2px` to `-4px`).
  - Buttons should use color/opacity changes; avoid animated trading urgency.
- Imagery/iconography:
  - Do not import Polymarket images/icons.
  - Use text, initials, simple CSS dots, and semantic chips instead of brand artwork.

## Components
- Existing components to reuse:
  - `MarketCard`: primary market-list card.
  - `TradePanel`: market-detail and transaction shell.
  - `PortfolioSummary`: side panel for balances and positions.
  - `LearningCallout`: educational explanation module.
  - `WalletExperiment`: mock-wallet safety module.
- New/changed components:
  - Home uses local `NavChip`/`MarketFilter`-style chips in `src/app/page.tsx`.
  - Existing cards/buttons are restyled toward the token set above; no new dependency or design-system package.
- Variants and states:
  - `button-yes`: `Buy Yes`, green fill, disabled opacity.
  - `button-no`: `Buy No`, red-orange fill, disabled opacity.
  - `button-secondary`: white/soft-gray pill with hairline border.
  - `market-card-open`: blue/green status pill.
  - `market-card-resolved`: muted or amber status pill.
  - `callout-learning`: concise “How it works” pale-blue surface.
  - `callout-wallet`: concise “Demo wallet” pale-warning surface.
  - `error/status`: blue bordered status panel with live-region semantics.
- Token/component ownership:
  - CSS variables live in `src/styles/globals.css`.
  - Component-level composition stays in Tailwind class strings to remain beginner-readable.
  - If tokens change, update `DESIGN.md` first, then CSS/classes.

## Accessibility
- Target standard:
  - WCAG 2.1 AA for contrast, keyboard access, and semantic structure where practical for v1.
- Keyboard/focus behavior:
  - All links/buttons/inputs need visible blue focus rings.
  - Disabled trade buttons must remain perceivable and not rely only on color.
- Contrast/readability:
  - Use dark text on light surfaces.
  - YES/NO colors must not be the only cue; labels always include `YES` or `NO`.
- Screen-reader semantics:
  - Keep `role="status"` for transaction messages.
  - Preserve `aria-label` on the mock wallet and recent transaction sections.
  - Keep the stake input label explicit.
- Reduced motion and sensory considerations:
  - Hover transforms are non-essential and should be disabled/reduced under `prefers-reduced-motion`.

## Responsive behavior
- Supported breakpoints/devices:
  - Mobile: 360px+ single-column flow.
  - Tablet: 2-column market grid where space allows.
  - Desktop: market grid and detail page with right side panel.
- Layout adaptations:
  - Home hero stacks; market preview/stat cards wrap.
  - Detail route uses single column on mobile and `1fr + 24rem` side panel on large screens.
  - Category chips wrap or horizontally scroll if needed.
- Touch/hover differences:
  - Minimum interactive height should be ~44px for buttons and chips.
  - Hover elevation is decorative; focus styles are required.

## Interaction states
- Loading:
  - No async loading state is currently needed for seed data; future route/API loading should use skeleton cards, not spinners.
- Empty:
  - Trade history shows a clear empty message with a suggested first action.
- Error:
  - Trade validation errors appear in the status panel and must preserve the balance.
- Success:
  - Successful trades announce the side, stake, and probability movement.
- Disabled:
  - Resolved markets disable YES/NO trade buttons and keep settlement info visible.
- Offline/slow network, if applicable:
  - Core simulation is client-side after page load; future network errors should be phrased as learning-lab issues, not financial failures.

## Content voice
- Tone:
  - Market-native and concise first; Korean helper copy only where it improves beginner comprehension.
- Terminology:
  - Use short labels such as “Featured markets”, “Browse”, “Topics”, “chance”, “Vol”, “Ends”, “Live”, “Buy Yes”, “Buy No”, “Demo wallet”, and “Play credits”.
  - Use `Yes`/`No` casing in buttons and market outcome labels.
- Microcopy rules:
  - Put demo scope in compact chrome/footer copy, not in every heading and button.
  - Avoid “수익”, “투자”, “베팅”, “실거래”, “입금”, “출금”, or “메인넷 연결” as product promises.
  - Mention Polymarket only as an inspiration/context reference or in no-affiliation disclaimers.

## Implementation constraints
- Framework/styling system:
  - Next.js App Router, React, TypeScript, Tailwind CSS v4.
  - `npm` is the only documented package manager.
- Design-token constraints:
  - No new dependency for icons/fonts/theme packages.
  - Use CSS variables in `src/styles/globals.css` and Tailwind utility classes.
- Performance constraints:
  - Keep pages static-friendly and avoid heavy animation or remote asset loading.
- Compatibility constraints:
  - No external wallet tooling in v1 unless separately confirmed.
  - Route handlers remain read-only.
- Test/screenshot expectations:
  - Existing Playwright tests must still find the same headings, buttons, role status text, test IDs, and safety copy.
  - Run `npm run lint`, `npm run test`, `npm run build`, and `npm run test:e2e` before claiming completion.

## Do's and Don'ts
### Do
- Use a white page canvas, compact Browse/Topics rails, rounded market cards, and numeric probability tiles.
- Do use blue for navigation/action emphasis, green for YES/up, and red-orange for NO/down.
- Keep one compact demo/no-affiliation note visible without repeating it in every component.
- Do keep every UI label beginner-readable and Korean-first.
- Do update this file before future visual redesigns.

### Don't
- Don't copy logos, brand marks, images, market icon art, or screenshots.
- Don't claim or imply official affiliation.
- Don't add real-money/mainnet/wallet dependencies under this design brief.
- Don't turn the UI into a dark crypto dashboard unless this file is intentionally refreshed.
- Don't rely on color alone for outcome semantics.

## Open questions
- [ ] If future work adds screenshots or visual-regression baselines, where should they be stored? Owner: future maintainer. Impact: visual QA reproducibility.
- [ ] Should the portfolio/demo page eventually get its own route? Owner: product maintainer. Impact: IA once the app grows past three seed markets.
