# Lulu Web App — `doc/`

This folder holds the **versioned, living** documentation for the Lulu Ventures landing site (`luluventures.com`). The high-level system map for **all** DeepValues components lives in the `deepvalues-system-overview` Claude skill, not here.

## What goes where

| Doc | When to read it | When to update it |
|-----|-----------------|-------------------|
| [`design.md`](#design) (current top-level [`../architect.md`](../architect.md)) | Onboarding: what's the architecture | After non-trivial architecture changes |
| [`../architecture-diagram.md`](../architecture-diagram.md) | Future-state CDK design (proposed) | When the future plan changes |
| [`runbook.md`](runbook.md) | "Site is down / page is broken" — incident response | After every real incident, add what you learned |
| [`decisions.md`](decisions.md) | "Why did we choose X over Y?" — design rationale | Append a new entry whenever you make a non-obvious architectural decision |

### Design

The current architecture doc lives at the repo root: [`../architect.md`](../architect.md). It is the authoritative source of truth for "how is the site put together". When that file is comfortable to move, rename it to `doc/design.md` and update this README.

## Conventions

- **Don't duplicate** what's in code, package.json, or the architecture diagram — just point to them.
- **`decisions.md` is append-only.** Never edit past entries. New decisions go on top with a date stamp.
- **`runbook.md` is for the on-call human** — short, scan-friendly, with copy-pastable commands.
- Mockups and image assets go in `doc/assets/` if/when needed.

## Out of scope here

- Credentials, AWS account IDs, deploy secrets → these belong in `access_deepvalues_servics` skill, not in this folder.
- High-level system topology across multiple DeepValues components → `deepvalues-system-overview` skill.
