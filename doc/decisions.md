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

<!--
First real entries land below this line.

Examples of decisions worth recording (not exhaustive):
- Picking a hosting provider (CloudFront + S3 vs Vercel vs Netlify)
- Picking an auth provider (Cognito vs Auth0 vs Supabase Auth)
- Picking a styling approach (Tailwind vs CSS Modules vs styled-components)
- Major library swaps (React Router 6 → 7, etc.)
- "We will NOT do X because Y" decisions
-->
