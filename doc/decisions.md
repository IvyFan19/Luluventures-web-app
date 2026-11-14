# Architecture Decisions — Lulu Web App

Append-only log of non-obvious decisions made about this codebase. **Never edit past entries.** When a previous decision is reversed, write a **new** entry that explains why.

## Format (copy this for every new entry)

```
## YYYY-MM-DD — <short title>

**Decision**: What was decided.

**Why**: The forcing function — the constraint, deadline, or principle that made
this the right choice now. Be specific. "Performance" is not a reason; "p95
latency on /home was 4s on a Pixel 6, target was <2s" is.

**Alternatives considered**: What you ruled out, and why.

**Reversal cost**: How hard would it be to undo this in 6 months? (low / med / high)
```

---

## 2026-11-14 — Host deepvalues.ai on Azure Static Web Apps instead of S3 + CloudFront

**Decision**: Move the landing site to an Azure Static Web App (`deepvalues-web`, Standard, resource group `deepvalues-web-rg`, westus2). Deploy with `scripts/deploy-azure-swa.sh` (preview first, then production). S3 + CloudFront stay in place until the founder retires them. Plan and cutover steps: `doc/azure-swa-migration.md`.

**Why**: Founder approval on 2026-11-14: Azure credits cover hosting, and the rest of DeepValues (Container Apps, Postgres) already runs on Azure, so one cloud and one bill. SWA gives the same global static hosting, free certificates, preview environments and edge purge on deploy, without the manual CloudFront invalidation.

**Alternatives considered**: SWA Free (no SLA, hard 100 GB bandwidth cap with no overage); Azure Storage static website + Front Door (Front Door Standard costs more than SWA Standard and needs more configuration); staying on AWS (no credits).

**Reversal cost**: low. DNS points back to CloudFront within minutes (TTL 60 s) while the distribution and bucket still exist.


<!--
First real entries land below this line.

Examples of decisions worth recording (not exhaustive):
- Picking a hosting provider (CloudFront + S3 vs Vercel vs Netlify)
- Picking an auth provider (Cognito vs Auth0 vs Supabase Auth)
- Picking a styling approach (Tailwind vs CSS Modules vs styled-components)
- Major library swaps (React Router 6 → 7, etc.)
- "We will NOT do X because Y" decisions
-->
