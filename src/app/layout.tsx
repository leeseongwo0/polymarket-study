import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Polymarket Study Demo 1",
  description: "One-day play-credit market lab for learning chance, positions, and simulated resolution.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
