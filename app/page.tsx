function CodeBlock({ children, label }: { children: string; label?: string }) {
  return (
    <div className="relative rounded-lg border border-[var(--border)] bg-[var(--code-bg)] overflow-hidden group">
      {label && (
        <div className="px-4 py-2 border-b border-[var(--border)] text-xs text-[var(--muted)] font-mono flex items-center gap-2">
          <span className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
          </span>
          <span>{label}</span>
        </div>
      )}
      <pre className="p-4 overflow-x-auto text-sm leading-relaxed font-mono">
        <code dangerouslySetInnerHTML={{ __html: colorize(children) }} />
      </pre>
    </div>
  );
}

function colorize(code: string): string {
  return code
    // Strings (double-quoted)
    .replace(
      /("(?:[^"\\]|\\.)*")/g,
      '<span style="color:#a5d6a7">$1</span>'
    )
    // Single-quoted strings
    .replace(
      /('(?:[^'\\]|\\.)*')/g,
      '<span style="color:#a5d6a7">$1</span>'
    )
    // Comments
    .replace(
      /(#.*?)(?=\n|$)/g,
      '<span style="color:#616161">$1</span>'
    )
    // Python keywords
    .replace(
      /\b(from|import|async|await|def|with|as|try|except|print|return|True|False|None)\b/g,
      '<span style="color:#ce93d8">$1</span>'
    )
    // Numbers (but not inside already-colored spans)
    .replace(
      /(?<!style="|color:|#|[a-zA-Z])\b(\d+\.?\d*)\b/g,
      '<span style="color:#ffcc80">$1</span>'
    )
    // curl/http keywords
    .replace(
      /\b(curl|GET|POST|PUT|DELETE)\b/g,
      '<span style="color:#80cbc4">$1</span>'
    );
}

function Feature({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="border border-[var(--border)] rounded-lg p-6 bg-[var(--card)] hover:border-zinc-600 transition">
      <div className="text-lg mb-3">{icon}</div>
      <h3 className="text-base font-medium mb-2">{title}</h3>
      <p className="text-sm text-[var(--muted)] leading-relaxed">
        {description}
      </p>
    </div>
  );
}

function Endpoint({
  method,
  path,
  description,
}: {
  method: string;
  path: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-[var(--border)] last:border-0">
      <span className="shrink-0 px-2 py-0.5 rounded text-xs font-mono font-medium bg-emerald-500/10 text-emerald-400">
        {method}
      </span>
      <div>
        <code className="text-sm font-mono text-[var(--foreground)]">
          {path}
        </code>
        <p className="text-sm text-[var(--muted)] mt-0.5">{description}</p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="border-b border-[var(--border)] sticky top-0 bg-[var(--background)]/80 backdrop-blur-md z-50">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <a href="/" className="font-mono font-bold text-lg tracking-tight">
            SecQL
          </a>
          <div className="flex items-center gap-6">
            <a
              href="#api"
              className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition"
            >
              API
            </a>
            <a
              href="#sdk"
              className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition"
            >
              SDK
            </a>
            <a
              href="#pricing"
              className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition"
            >
              Pricing
            </a>
            <a
              href="https://github.com/jgaillard/secql"
              target="_blank"
              rel="noopener"
              className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition"
            >
              GitHub
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6 pt-28 pb-24 relative">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border)] text-xs text-[var(--muted)] font-mono mb-8 bg-[var(--card)]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              pip install secql
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] mb-5">
              Clean SEC data.
              <br />
              <span className="text-[var(--muted)]">Excellent DX.</span>
            </h1>
            <p className="text-lg text-[var(--muted)] leading-relaxed mb-10 max-w-lg">
              REST API + Python SDK that transforms raw SEC EDGAR filings into
              structured financial data. 8,000+ companies. 10 years of history.
            </p>
            <div className="flex gap-3">
              <a
                href="#get-started"
                className="px-6 py-3 bg-[var(--foreground)] text-[var(--background)] rounded-lg text-sm font-medium hover:opacity-90 transition"
              >
                Get API Key
              </a>
              <a
                href="#api"
                className="px-6 py-3 border border-[var(--border)] rounded-lg text-sm font-medium hover:bg-[var(--card)] transition"
              >
                View Docs
              </a>
            </div>
          </div>

          {/* Hero code example */}
          <div className="mt-16">
            <CodeBlock label="Terminal">
              {`curl -H "X-API-Key: sk_live_..." \\
  https://api.secql.dev/companies/AAPL/financials

{
  "ticker": "AAPL",
  "period": "2024-Q3",
  "revenue": 94930000000,
  "net_income": 21448000000,
  "total_assets": 364980000000,
  "eps_basic": 1.40,
  "currency": "USD"
}`}
            </CodeBlock>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 py-24 border-t border-[var(--border)]">
        <h2 className="text-2xl font-bold mb-3">
          Built for fintech engineers
        </h2>
        <p className="text-[var(--muted)] mb-10 max-w-lg">
          Stop parsing XBRL. Start building.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Feature
            icon="{ }"
            title="No XBRL complexity"
            description="We parse the SEC's XML taxonomy so you don't have to. Get clean JSON with the metrics you actually need."
          />
          <Feature
            icon="10y"
            title="10 years of history"
            description="Up to 40 quarters of financial data per company. Revenue, net income, assets, liabilities, EPS, and more."
          />
          <Feature
            icon="8k+"
            title="8,000+ companies"
            description="Every public company that files with the SEC. Look up by ticker symbol, get data instantly."
          />
          <Feature
            icon="py"
            title="Python SDK"
            description="Official SDK with sync and async clients, Pandas DataFrame export, and typed exception handling."
          />
          <Feature
            icon="$"
            title="From $0/month"
            description="Generous free tier for prototyping. Pro at $19/mo for production. No surprises."
          />
          <Feature
            icon="!?"
            title="Structured errors"
            description="Every error response includes a message, hint, and documentation link. No guessing what went wrong."
          />
        </div>
      </section>

      {/* API Reference */}
      <section
        id="api"
        className="max-w-5xl mx-auto px-6 py-24 border-t border-[var(--border)]"
      >
        <h2 className="text-2xl font-bold mb-2">API Endpoints</h2>
        <p className="text-[var(--muted)] mb-10">
          Four endpoints. That&apos;s it. Everything you need, nothing you
          don&apos;t.
        </p>

        <div className="border border-[var(--border)] rounded-lg bg-[var(--card)] p-6">
          <Endpoint
            method="GET"
            path="/companies/{ticker}"
            description="Company profile — name, CIK, sector, exchange"
          />
          <Endpoint
            method="GET"
            path="/companies/{ticker}/financials"
            description="Latest quarterly or annual financials"
          />
          <Endpoint
            method="GET"
            path="/companies/{ticker}/financials/history?periods=40"
            description="Up to 40 periods of historical financial data"
          />
          <Endpoint
            method="GET"
            path="/companies/{ticker}/filings?limit=10"
            description="Recent SEC filings with direct document URLs"
          />
        </div>

        <div className="mt-8">
          <CodeBlock label="Response — /companies/AAPL/financials">
            {`{
  "cik": "0000320193",
  "ticker": "AAPL",
  "period": "2024-Q3",
  "period_type": "quarterly",
  "revenue": 94930000000,
  "net_income": 21448000000,
  "total_assets": 364980000000,
  "total_liabilities": 308030000000,
  "cash_and_equivalents": 29965000000,
  "shares_outstanding": 15287521000,
  "eps_basic": 1.40,
  "currency": "USD"
}`}
          </CodeBlock>
        </div>
      </section>

      {/* SDK */}
      <section
        id="sdk"
        className="max-w-5xl mx-auto px-6 py-24 border-t border-[var(--border)]"
      >
        <h2 className="text-2xl font-bold mb-2">Python SDK</h2>
        <p className="text-[var(--muted)] mb-10">
          Sync, async, and Pandas — all in one package.
        </p>

        <div className="grid lg:grid-cols-2 gap-4">
          <CodeBlock label="Get started">
            {`from secql import SecQL

client = SecQL()  # reads SECQL_API_KEY from env

company = client.company("AAPL")
print(company.name)  # Apple Inc.

financials = client.financials("AAPL")
print(financials.revenue)  # 94930000000`}
          </CodeBlock>

          <CodeBlock label="Pandas integration">
            {`# Get 40 quarters as a DataFrame
df = client.financials(
    "AAPL",
    periods=40,
    as_dataframe=True,
)

df["margin"] = df["net_income"] / df["revenue"]
df.plot(x="period", y="margin")`}
          </CodeBlock>

          <CodeBlock label="Async client">
            {`from secql import AsyncSecQL
import asyncio

async def fetch():
    async with AsyncSecQL() as client:
        aapl, msft = await asyncio.gather(
            client.financials("AAPL"),
            client.financials("MSFT"),
        )
    return aapl, msft`}
          </CodeBlock>

          <CodeBlock label="Error handling">
            {`from secql.exceptions import (
    CompanyNotFound,
    RateLimited,
)

try:
    data = client.financials("INVALID")
except CompanyNotFound:
    print("Ticker not found")
except RateLimited as e:
    print(f"Retry after {e.retry_after}s")`}
          </CodeBlock>
        </div>
      </section>

      {/* Pricing */}
      <section
        id="pricing"
        className="max-w-5xl mx-auto px-6 py-24 border-t border-[var(--border)]"
      >
        <h2 className="text-2xl font-bold mb-2">Pricing</h2>
        <p className="text-[var(--muted)] mb-10">
          Start free. Scale when you&apos;re ready.
        </p>
        <div className="grid sm:grid-cols-3 gap-4 max-w-3xl items-stretch">
          {/* Free */}
          <div className="border border-[var(--border)] rounded-lg bg-[var(--card)] p-6 flex flex-col">
            <div className="text-sm text-[var(--muted)] font-mono mb-3">
              Free
            </div>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-3xl font-bold">$0</span>
            </div>
            <p className="text-sm text-[var(--muted)] mb-5">
              No credit card required
            </p>
            <ul className="space-y-2 text-sm flex-1">
              <li className="flex items-center gap-2">
                <span className="text-emerald-400">&#10003;</span> 100
                requests/day
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-400">&#10003;</span> 5 req/min
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-400">&#10003;</span> All endpoints
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-400">&#10003;</span> Python SDK
              </li>
            </ul>
            <a
              href="#get-started"
              className="block text-center px-4 py-2.5 mt-6 border border-[var(--border)] rounded-lg text-sm font-medium hover:bg-[var(--background)] transition"
            >
              Get Free Key
            </a>
          </div>

          {/* Pro */}
          <div className="border-2 border-[var(--accent)] rounded-lg bg-[var(--card)] p-6 flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm text-[var(--muted)] font-mono">Pro</span>
              <span className="px-1.5 py-0.5 bg-[var(--accent)] text-white text-[10px] font-medium rounded uppercase tracking-wide">
                Popular
              </span>
            </div>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-3xl font-bold">$19</span>
              <span className="text-[var(--muted)] text-sm">/mo</span>
            </div>
            <p className="text-sm text-[var(--muted)] mb-5">
              For production apps
            </p>
            <ul className="space-y-2 text-sm flex-1">
              <li className="flex items-center gap-2">
                <span className="text-emerald-400">&#10003;</span> 50,000
                requests/mo
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-400">&#10003;</span> 60 req/min
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-400">&#10003;</span> All endpoints
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-400">&#10003;</span> Python SDK +
                Pandas
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-400">&#10003;</span>{" "}
                $0.002/req overage
              </li>
            </ul>
            <a
              href="#get-started"
              className="block text-center px-4 py-2.5 mt-6 bg-[var(--accent)] text-white rounded-lg text-sm font-medium hover:opacity-90 transition"
            >
              Start Pro
            </a>
          </div>

          {/* Enterprise */}
          <div className="border border-[var(--border)] rounded-lg bg-[var(--card)] p-6 flex flex-col">
            <div className="text-sm text-[var(--muted)] font-mono mb-3">
              Enterprise
            </div>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-3xl font-bold">Custom</span>
            </div>
            <p className="text-sm text-[var(--muted)] mb-5">
              For teams at scale
            </p>
            <ul className="space-y-2 text-sm flex-1">
              <li className="flex items-center gap-2">
                <span className="text-emerald-400">&#10003;</span> Unlimited
                requests
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-400">&#10003;</span> Custom rate
                limits
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-400">&#10003;</span> SLA +
                priority support
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-400">&#10003;</span> Dedicated
                account
              </li>
            </ul>
            <a
              href="mailto:contact@secql.dev"
              className="block text-center px-4 py-2.5 mt-6 border border-[var(--border)] rounded-lg text-sm font-medium hover:bg-[var(--background)] transition"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* Get Started */}
      <section
        id="get-started"
        className="max-w-5xl mx-auto px-6 py-24 border-t border-[var(--border)]"
      >
        <h2 className="text-2xl font-bold mb-2">Get started in 60 seconds</h2>
        <p className="text-[var(--muted)] mb-10">
          Three steps. No credit card required.
        </p>

        <div className="max-w-2xl space-y-6">
          <div className="flex items-start gap-5">
            <div className="flex flex-col items-center">
              <span className="shrink-0 w-8 h-8 rounded-full bg-[var(--card)] border border-[var(--border)] flex items-center justify-center text-xs font-mono text-[var(--foreground)] font-medium">
                1
              </span>
              <div className="w-px h-full bg-[var(--border)] mt-2" />
            </div>
            <div className="pb-2 flex-1">
              <p className="font-medium mb-3">Get your API key</p>
              <CodeBlock>
                {`curl -X POST https://api.secql.dev/keys \\
  -H "Content-Type: application/json" \\
  -d '{"name": "my-app", "email": "you@example.com"}'`}
              </CodeBlock>
            </div>
          </div>

          <div className="flex items-start gap-5">
            <div className="flex flex-col items-center">
              <span className="shrink-0 w-8 h-8 rounded-full bg-[var(--card)] border border-[var(--border)] flex items-center justify-center text-xs font-mono text-[var(--foreground)] font-medium">
                2
              </span>
              <div className="w-px h-full bg-[var(--border)] mt-2" />
            </div>
            <div className="pb-2 flex-1">
              <p className="font-medium mb-3">Install the SDK</p>
              <CodeBlock>{`pip install secql`}</CodeBlock>
            </div>
          </div>

          <div className="flex items-start gap-5">
            <div className="flex flex-col items-center">
              <span className="shrink-0 w-8 h-8 rounded-full bg-[var(--card)] border border-[var(--border)] flex items-center justify-center text-xs font-mono text-[var(--foreground)] font-medium">
                3
              </span>
            </div>
            <div className="flex-1">
              <p className="font-medium mb-3">Fetch your first data</p>
              <CodeBlock>
                {`from secql import SecQL

client = SecQL(api_key="sk_live_...")
print(client.financials("AAPL"))`}
              </CodeBlock>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border)]">
        <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="font-mono font-bold text-sm">SecQL</span>
            <span className="text-xs text-[var(--muted)]">
              Clean SEC EDGAR data for developers
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/jgaillard/secql"
              target="_blank"
              rel="noopener"
              className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition"
            >
              GitHub
            </a>
            <a
              href="mailto:contact@secql.dev"
              className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
