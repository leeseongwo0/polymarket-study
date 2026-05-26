import { describe, expect, it } from "vitest";
import { formatCredits, formatProbability, formatShortDate } from "@/lib/format";

describe("format helpers", () => {
  it("formats probability as a rounded percentage", () => {
    expect(formatProbability(62.4)).toBe("62%");
    expect(formatProbability(62.6)).toBe("63%");
  });

  it("formats play credits in Korean without currency symbols or USD language", () => {
    const formatted = formatCredits(1234.5);

    expect(formatted).toBe("1,234.5 플레이 크레딧");
    expect(formatted).not.toContain("$");
    expect(formatted.toLowerCase()).not.toContain("usd");
  });

  it("formats dates for Korean beginner-readable market cards", () => {
    expect(formatShortDate("2026-06-30")).toBe("2026년 6월 30일");
  });
});
