# Deep Values API

*Drop-in equity research that thinks like a Berkshire analyst, not a data dashboard.*

Build value-investing products in days, not quarters. We do the
multi-analyst AI work, the 13F curation, and the sentiment plumbing —
you call one endpoint and get the answer.

---

## Three things nobody else gives you at this price

### 1. AI equity research, structured as JSON

One endpoint. Full briefing. Bull case, bear case, valuation snapshot,
investment plan, fair-value range. The same multi-analyst pipeline
that powers our consumer product, exposed as a single JSON call.

```
GET /v1/research/AAPL
```

```json
{
  "ticker": "AAPL",
  "company_name": "Apple Inc.",
  "stance": "watch",
  "as_of": "2026-05-17T14:23:00Z",
  "briefing": "Services growth accelerating to 16% YoY; iPhone units flat...",
  "bull_summary": "Services moat widening, $200B buyback runway, India ramp...",
  "bear_summary": "Hardware refresh cycle lengthening, China exposure 19%...",
  "fundamentals_report": "Revenue $391B (+2.0% YoY)...",
  "valuation": {
    "intrinsic_value_per_share": 218.4,
    "method": "dcf_owner_earnings_blend",
    "confidence_p10": 178.2,
    "confidence_p90": 261.7,
    "current_price": 184.92,
    "implied_upside_pct": 18.1
  },
  "investment_plan": "Conservative entry below $175; full position $158-165...",
  "key_risks": ["China revenue concentration", "Hardware ASP normalization", "..."]
}
```

Sentieo and AlphaSense cost $30,000/year. We're $99/month for the
same output shape on US equities. Yes really.

---

### 2. The Smart Money API

50+ legendary investors. Real 13F filings. Auto-classified position
deltas. Materiality-filtered notifications. The data nobody else
packages this way at any price.

```
GET /v1/smart-money/holdings?ticker=BRK.B
GET /v1/smart-money/changes?since=2026-Q1&min_position_usd=100000000
GET /v1/gurus/warren-buffett/portfolio
POST /v1/webhooks/guru-moves  (subscribe to threshold breaches)
```

```json
{
  "ticker": "AAPL",
  "quarter_end": "2026-03-31",
  "holders": [
    {
      "guru": { "slug": "warren-buffett", "fund": "Berkshire Hathaway" },
      "shares": 905560000,
      "position_usd": 167400000000,
      "pct_portfolio": 31.4,
      "delta": { "status": "trimmed", "delta_shares": -10000000, "delta_pct": -1.1 }
    },
    {
      "guru": { "slug": "duan-yongping", "fund": "H&H International Investment" },
      "shares": 17500000,
      "position_usd": 3236000000,
      "pct_portfolio": 18.5,
      "delta": { "status": "added", "delta_shares": 500000, "delta_pct": 2.9 }
    }
  ],
  "summary": {
    "guru_count": 12,
    "total_value_usd": 184000000000,
    "qoq_delta_pct": -0.8
  }
}
```

**What's curated.** Not raw 13F dumps — a hand-picked 50+ roster:
Buffett, Munger, Burry, Ackman, Druckenmiller, Klarman, Marks, Li Lu,
Duan Yongping, Pabrai, Einhorn, Mandel, Loeb, Tepper, Coleman,
Soros, Cohen (Point72), Peltz, Greenblatt, Hawkins (Longleaf),
Yacktman, Tweedy Browne, Wedgewood, Sequoia Fund, and 25+ more —
every name a serious value investor would recognize.

**What's auto-computed.** Each holding row carries the delta vs prior
quarter (`new`/`added`/`trimmed`/`unchanged`/`exited`) plus position
size and % of portfolio. No client-side joining.

**What's filtered.** Material moves only — new positions, full exits,
≥25% share-count shifts, or ≥$100M position size. No noise from $200K
fractional trims.

**Webhooks fire** within 30 minutes of each new 13F-HR landing on SEC
EDGAR — usually a 45-day lag from quarter end, occasionally the day
after quarter close.

---

### 3. Drop-in AI context for your own chatbot

Building a stock-aware GPT? An investing copilot? A research assistant
inside your app? Skip the months of plumbing.

```
GET /v1/ai-context/AAPL
```

Returns a ready-to-use system prompt + structured data block, scoped
to one ticker. Includes the company overview, latest fundamentals,
recent 13F moves, current sentiment, latest SEC filings, and our
AI-generated valuation snapshot — all formatted so you can drop it
straight into your LLM's context window.

```json
{
  "system_prompt": "You are a research assistant grounded in current Apple Inc. data...",
  "context_block": "...structured ~6000-token data dump optimized for grounding...",
  "context_tokens_estimated": 5847,
  "as_of": "2026-05-17T14:23:00Z",
  "tools_available": ["fetch_filing_section", "fetch_quarterly_history", "fetch_smart_money"]
}
```

Drop it into OpenAI / Anthropic / any LLM SDK. We do the grounding;
you build the product.

---

## The full menu

| Endpoint | What you get |
|---|---|
| `GET /v1/research/{ticker}` | Full multi-analyst AI report (chargeable) |
| `GET /v1/research/{ticker}/audio` | MP3 narration |
| `GET /v1/research/{ticker}/pdf` | PDF briefing |
| `GET /v1/smart-money/holdings?ticker=X` | Who from our roster holds X, deltas, % |
| `GET /v1/smart-money/changes?since=...` | All material moves in window |
| `GET /v1/gurus` | The curated 50+ roster + each guru's top holdings |
| `GET /v1/gurus/{slug}` | One guru's full portfolio + history + bio |
| `GET /v1/theses?ticker=X&min_conviction=4` | Structured human investment views |
| `GET /v1/intrinsic-value/{ticker}` | DCF + Owner Earnings + Damodaran scenarios |
| `GET /v1/indicators/buffett` | Buffett Indicator + zone (over/fair/under) |
| `GET /v1/indicators/shiller-pe` | Shiller PE + percentile vs history |
| `GET /v1/fundamentals/{ticker}` | Income + balance + cashflow, annual + quarterly |
| `GET /v1/filings/{ticker}` | 10-K, 10-Q, 8-K, DEF 14A with parsed sections |
| `GET /v1/news/{ticker}` | Sentiment-scored news, latest first |
| `GET /v1/sentiment/{ticker}?source=reddit\|stocktwits\|combined` | Value-investor sentiment (NOT WSB noise) |
| `GET /v1/ai-context/{ticker}` | Drop-in grounding for chatbot builders |
| `POST /v1/webhooks` | Subscribe to events (guru moves, new filings, sentiment shifts) |

Full OpenAPI spec at [api.deepvalues.ai/openapi.json](#).

---

## Pricing

**$99 / month** — or $999/year (save ~17%).

Includes:

- **10,000** metadata calls per day (everything except `/research`)
- **50** AI research calls per day (the multi-analyst pipeline)
- **1,000** webhook events per day
- **All 50+ gurus**, full quarterly history back 4+ years
- **Commercial license** — redistribute derived outputs in your own product
- **99.5% uptime** SLA
- Email support, business-day response

Overage: $0.10 per extra AI research call, $0.001 per extra metadata
call, $0.001 per extra webhook event. We don't kneecap you mid-month
— you keep working, we bill the overage at month-end.

**Custom tier** for higher volume, white-label, or private guru
universes (track your own watchlist of 13F filers): hello@deepvalues.ai.

---

## Who this is for

**Newsletter writers + Substack stock-pickers.** Pull live 13F deltas
into your Monday morning post. "Berkshire trimmed AAPL by 1.1% last
quarter — here's the data." One API call, no scraping.

**Robo-advisors + portfolio products.** Show your users "what the
smart money is doing" without licensing WhaleWisdom at $1k+/mo. Add
AI-generated stock briefings as a premium feature with zero in-house
AI infra.

**AI app builders.** Drop our `ai-context` endpoint into your GPT /
Claude / Llama wrapper and your chatbot is suddenly grounded in real
fundamentals, 13F data, and sentiment. No prompt-engineering required.

**Small funds + family offices.** Use our 50+ guru tracking as your
own competitor monitoring. Get webhook-notified the day a competitor
exits a position you also hold.

**Quants + researchers.** Backtest against curated guru moves over
4+ years of history. Build sentiment-weighted strategies from the
value-investing-focused subreddit feed (not the meme-stock noise).

---

## Quick start

```bash
# 1. Sign up at deepvalues.ai/api and grab your key
export DV_API_KEY=dv_sk_live_...

# 2. Smart Money in one call
curl -H "Authorization: Bearer $DV_API_KEY" \
  "https://api.deepvalues.ai/v1/smart-money/holdings?ticker=AAPL"

# 3. Full AI research briefing
curl -H "Authorization: Bearer $DV_API_KEY" \
  "https://api.deepvalues.ai/v1/research/AAPL"

# 4. Subscribe to webhook
curl -X POST -H "Authorization: Bearer $DV_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "url": "https://yourapp.com/dv-hook", "events": ["guru.move.material"] }' \
  "https://api.deepvalues.ai/v1/webhooks"
```

[Read the docs →](#)  ·  [Get your key →](#)  ·  [See sample responses →](#)

---

## FAQ

**Q. Is the AI research deterministic?**
Same `ticker` returns the same cached briefing for 14 days. Pass
`?fresh=true` to force a re-run (counts as one of your AI research
calls). Past briefings stay accessible forever via `/v1/research/{ticker}/history`.

**Q. How fast is the data?**
13F deltas: real-time vs SEC EDGAR (we re-poll every 30 minutes after
the 4pm-ET filing window). Fundamentals: end-of-day. News + sentiment:
hourly. Indicators: daily. AI research: synthesized on first call,
cached 14 days.

**Q. Can I redistribute the data?**
Yes — your $99/mo includes a commercial license to redistribute
derived outputs in your own product. You can't resell the raw API
itself; everything else (charts, summaries, briefings you generate
for your users) is yours.

**Q. What about real-time prices, options, insider trades?**
We don't do those. Polygon ($99-2000/mo) is the best of breed for
real-time tape. Quiver Quantitative covers gov + insider data. We
focus on the value-investing slice nobody else serves at this price.

**Q. Will my AI research counts roll over?**
No, daily limits reset at 00:00 UTC. Need higher headroom or rollover?
Custom tier.

**Q. SLAs and incidents?**
99.5% uptime over rolling 30 days. Status page at
[status.deepvalues.ai](#). Active incident notifications via your
webhook URL or email.

**Q. Can I see a real response before signing up?**
Yes — every endpoint has a sandbox response at
[deepvalues.ai/api/sandbox](#). No signup required.

---

*Last updated 2026-05-17. Built by Deep Values in San Francisco.
[Contact](mailto:hello@deepvalues.ai)  ·  [Status](#)  ·  [Changelog](#)*
