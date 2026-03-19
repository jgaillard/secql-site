import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "SecQL — Clean SEC EDGAR Data for Developers",
  description:
    "REST API + Python SDK for SEC financial data. Company profiles, financials, filings. 8,000+ companies, 10 years of history. $0.002/request.",
  openGraph: {
    title: "SecQL — Clean SEC EDGAR Data for Developers",
    description: "REST API + Python SDK for SEC financial data. 8,000+ companies, 10 years of history.",
    url: "https://secql.dev",
    siteName: "SecQL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
