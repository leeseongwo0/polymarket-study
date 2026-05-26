import { NextResponse } from "next/server";
import { seedMarkets } from "@/data/markets";

export function GET() {
  return NextResponse.json({ markets: seedMarkets });
}
