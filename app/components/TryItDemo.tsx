"use client";

import { useState } from "react";

export function TryItDemo() {
  const [ticker, setTicker] = useState("AAPL");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleTry = async () => {
    const t = ticker.trim().toUpperCase();
    if (!t || !/^[A-Za-z]{1,5}$/.test(t)) {
      setError("Enter a valid ticker (1-5 letters)");
      setResult(null);
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(`/api/demo?ticker=${encodeURIComponent(t)}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      setResult(JSON.stringify(data, null, 2));
    } catch {
      setError("Failed to reach API. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-5xl mx-auto px-6 py-24 border-t border-[var(--border)]">
      <h2 className="text-2xl font-bold mb-2">Try it live</h2>
      <p className="text-[var(--muted)] mb-8">
        Enter any ticker. Get real SEC data back instantly.
      </p>

      <div className="max-w-2xl">
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={ticker}
            onChange={(e) => setTicker(e.target.value.toUpperCase().slice(0, 5))}
            onKeyDown={(e) => e.key === "Enter" && handleTry()}
            placeholder="AAPL"
            className="flex-1 px-4 py-2.5 rounded-lg bg-[var(--card)] border border-[var(--border)] text-sm font-mono text-[var(--foreground)] placeholder:text-zinc-600 focus:outline-none focus:border-[var(--accent)] transition"
            maxLength={5}
          />
          <button
            onClick={handleTry}
            disabled={loading}
            className="px-6 py-2.5 bg-[var(--foreground)] text-[var(--background)] rounded-lg text-sm font-medium hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Loading..." : "Try it"}
          </button>
        </div>

        {error && (
          <div className="px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm mb-4">
            {error}
          </div>
        )}

        {result && (
          <div className="rounded-lg border border-[var(--border)] bg-[var(--code-bg)] overflow-hidden">
            <div className="px-4 py-2 border-b border-[var(--border)] text-xs text-[var(--muted)] font-mono flex items-center gap-2">
              <span className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
              </span>
              <span>GET /companies/{ticker}/financials</span>
            </div>
            <pre className="p-4 overflow-x-auto text-sm leading-relaxed font-mono text-emerald-400">
              {result}
            </pre>
          </div>
        )}
      </div>
    </section>
  );
}
