# Lulu Web App — Runbook

Incident response for `luluventures.com`. Keep it scan-friendly: each section is a symptom → likely cause → command to check.

## Quick health check

```bash
curl -sSL -o /dev/null -w 'HTTP %{http_code} | %{time_total}s\n' --max-time 5 https://luluventures.com/
```

Expected: `HTTP 200` in under 1s. Anything else, scroll down.

## Symptom: site returns 5xx or won't load

1. **Check CloudFront / S3** — the site is a static build deployed to S3, fronted by CloudFront.
   - AWS Console → CloudFront → check the distribution status and recent error spike.
   - AWS Console → S3 → confirm the bucket has fresh `index.html` and `assets/`.
2. **Check the last deploy** — pushes to `main` trigger `.github/workflows/aws-s3-deploy.yml`.
   ```bash
   export GH_TOKEN=<your-fine-grained-PAT>   # see access_deepvalues_servics skill
   gh run list --repo IvyFan19/Luluventures-web-app --workflow=aws-s3-deploy.yml --limit=5
   gh run view <run-id> --repo IvyFan19/Luluventures-web-app --log-failed
   ```
3. **CDN propagation** — if you just deployed and old version is still showing, it's CloudFront caching. Either wait (default TTL) or trigger an invalidation in the AWS console.

## Symptom: contact form / newsletter signup not sending emails

EmailJS handles email delivery. See `SETUP_EMAILJS.md` at the repo root for keys and template IDs.

1. Open browser devtools → Network tab → submit the form → check the EmailJS POST request response.
2. Log in to https://dashboard.emailjs.com/ → check the service status and recent send history.
3. Env vars consumed at build time: `VITE_EMAILJS_*` (see `.env.example`).

## Symptom: login broken / OAuth redirect loop

The login flow uses AWS Cognito + Google OAuth via AWS Amplify.

1. **Cognito user pool** — AWS Console → Cognito → check the User Pool status.
2. **OAuth callback URLs** — must match the deployed hostname exactly (including `https://` and trailing slash policy). Check the User Pool app client settings.
3. **Build-time env** — `.env.production` is baked into the bundle; if you renamed a Cognito client, redeploy.

## Symptom: stale content after a real change

This site is statically built. After any content change:

1. `git push` to `main` (triggers deploy)
2. Wait for the GitHub Action to succeed (~2 min)
3. CloudFront cache must invalidate for users to see the change — see "CDN propagation" above.

If a single user reports stale content but everyone else is fine, it's their browser cache. `Cmd+Shift+R` (hard refresh) or incognito window.

## Where to look

| Resource | URL |
|----------|-----|
| Production site | https://luluventures.com/ |
| Deploy workflow | `.github/workflows/aws-s3-deploy.yml` |
| GitHub Actions | https://github.com/IvyFan19/Luluventures-web-app/actions |
| EmailJS dashboard | https://dashboard.emailjs.com/ |
| AWS Console (acct ID & secrets in `access_deepvalues_servics` skill) | https://console.aws.amazon.com/ |

## When you learn something new

After every real incident, **add a section here** (or extend an existing one) with: symptom seen, root cause, command that diagnosed it. That's how this file becomes valuable instead of generic.
