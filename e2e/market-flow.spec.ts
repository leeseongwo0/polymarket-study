import { expect, test } from "@playwright/test";

async function clearStorage(page: { evaluate: (fn: () => void) => Promise<void> }) {
  await page.evaluate(() => window.localStorage.clear());
}

test("learner finds a market and records a Buy Yes activity", async ({ page }) => {
  await page.goto("/");
  await clearStorage(page);
  await page.reload();

  await expect(page.getByRole("heading", { name: /Featured markets|확률이 움직이는 데모 마켓/i })).toBeVisible();
  await page.getByRole("link", { name: /AI assistants default for beginner coding/i }).click();

  const probability = page.getByTestId("yes-probability");
  await expect(probability).toBeVisible();
  const before = await probability.textContent();

  await page.getByLabel("Amount").fill("50");
  await page.getByRole("button", { name: "Buy Yes" }).click();
  await expect(page.getByRole("status")).toContainText(/Bought Yes/i);
  await expect(probability).not.toHaveText(before ?? "");
  await expect(page.getByTestId("portfolio-balance")).toContainText("950");
  await expect(page.getByTestId("trade-history")).toContainText(/50 플레이 크레딧/i);
});

test("learner can move chance the other direction with Buy No", async ({ page }) => {
  await page.goto("/markets/nextjs-beginner-deploy");
  await clearStorage(page);
  await page.reload();

  const probability = page.getByTestId("yes-probability");
  const before = Number((await probability.textContent())?.replace("%", ""));

  await page.getByLabel("Amount").fill("100");
  await page.getByRole("button", { name: "Buy No" }).click();
  await expect(page.getByRole("status")).toContainText(/Bought No/i);

  const after = Number((await probability.textContent())?.replace("%", ""));
  expect(after).toBeLessThan(before);
  await expect(page.getByTestId("trade-history")).toContainText(/100 플레이 크레딧/i);
});

test("resolution and demo wallet stay lightweight and non-blocking", async ({ page }) => {
  await page.goto("/markets/ai-assistant-weekly-coding");
  await clearStorage(page);
  await page.reload();

  await page.getByLabel("Amount").fill("25");
  await page.getByRole("button", { name: "Buy Yes" }).click();
  await page.getByRole("button", { name: "Resolve Yes" }).click();
  await expect(page.getByTestId("settlement-result")).toContainText(/Outcome: YES/i);
  await expect(page.getByRole("status")).toContainText(/Play credits only/i);

  await expect(page.getByLabel("Demo wallet")).toContainText(/no mainnet/i);
  await page.getByRole("button", { name: "Connect demo wallet" }).click();
  await expect(page.getByTestId("mock-wallet-status")).toContainText(/0xDEMO/i);
});

test("invalid amount does not break balance", async ({ page }) => {
  await page.goto("/markets/nextjs-beginner-deploy");
  await clearStorage(page);
  await page.reload();

  await page.getByLabel("Amount").fill("1001");
  await page.getByRole("button", { name: "Buy No" }).click();

  await expect(page.getByRole("status")).toContainText(/초과할 수 없습니다/i);
  await expect(page.getByTestId("portfolio-balance")).toContainText("1,000");
});

test("compact demo scope and no-affiliation copy remain visible", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByText(/Demo · Play credits/i).first()).toBeVisible();
  await expect(page.getByText(/Polymarket과 공식 제휴가 없으며/i)).toBeVisible();
  await expect(page.getByText(/Polymarket 로고, 브랜드 자산/i)).toBeVisible();
});
