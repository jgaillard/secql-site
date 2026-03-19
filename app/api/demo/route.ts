import { NextRequest, NextResponse } from "next/server";

const DEMO_KEY = process.env.SECQL_DEMO_KEY || "";
const API_BASE = "https://secql-production.up.railway.app";

export async function GET(request: NextRequest) {
  const ticker = request.nextUrl.searchParams.get("ticker");

  if (!ticker || !/^[A-Za-z]{1,5}$/.test(ticker)) {
    return NextResponse.json(
      { error: "Invalid ticker. Use 1-5 letters (e.g., AAPL)." },
      { status: 400 }
    );
  }

  if (!DEMO_KEY) {
    return NextResponse.json(
      { error: "Demo not configured." },
      { status: 503 }
    );
  }

  try {
    const res = await fetch(
      `${API_BASE}/companies/${ticker.toUpperCase()}/financials`,
      {
        headers: { "X-API-Key": DEMO_KEY },
        next: { revalidate: 3600 },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      const msg =
        data?.detail?.message || data?.message || "Company not found";
      return NextResponse.json({ error: msg }, { status: res.status });
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Unable to reach API. Try again." },
      { status: 502 }
    );
  }
}
