# deepvalues.ai: moving the landing site from S3 + CloudFront to Azure Static Web Apps

Status (2026-11-14): prepared, not cut over. Nothing has been created in Azure, nothing has
changed in DNS, and nothing has been removed from AWS. Founder approved the move on 2026-11-14.

Files:

| File | Purpose |
|------|---------|
| `infra/azure-swa/main.bicep`, `swa.bicep`, `main.bicepparam` | Resource group `deepvalues-web-rg` (westus2) + Static Web App `deepvalues-web` (Standard) + optional custom domains (TXT validation) |
| `staticwebapp.config.json` | Routing, error page, headers and caching (repo root; passed to the SWA CLI with `--swa-config-location`, so it is not uploaded to S3) |
| `scripts/deploy-azure-swa.sh` | Build, read the deployment token from `az` at runtime, deploy with SWA CLI 2.1.0 to `preview` (default) or `production` |
| `scripts/swa-parity-check.sh` | Curl every route on two hosts and compare status, redirect and content type |

## 1. What S3 + CloudFront does today

The CloudFront and S3 configuration could not be read: the `claude-code-agent` IAM user has no
`cloudfront:Get*/List*`, `s3:GetBucket*` or `cloudwatch:GetMetricStatistics` permission.
Everything below is observed from outside (curl against https://deepvalues.ai on 2026-11-14).
Before retiring CloudFront, confirm in the console that there are no Lambda@Edge or CloudFront
Functions, extra behaviours, or geo rules that the probes could not reveal.

| Behaviour | Observed on CloudFront | Reproduced on SWA |
|-----------|------------------------|-------------------|
| Origin | S3 **website** endpoint (`server: AmazonS3`, `x-amz-error-*` headers, S3-style 302 for folders) | Static files from `dist/` |
| `http://` | 301 to `https://` | Built in (SWA forces HTTPS) |
| `www.deepvalues.ai` | Serves the same content, no redirect (`www` CNAME -> `d2pvfiiif8xd24.cloudfront.net`) | Same once `www` is a custom domain. Keep it serving: the Cognito sign-in/out redirect in the bundle is `https://www.deepvalues.ai/` |
| Index document | `/`, `/zh-hant/`, `/buffett-indicator/`, `/privacy/buffett-indicator/` serve `index.html` | Built in |
| Folder without slash | 302 to the trailing-slash URL | **301** to the trailing-slash URL (`trailingSlash: auto`) |
| Missing file (any path, including `/app`, `/app/*`, `/api`, `/terms`) | **404 status with the landing page body** (S3 error document = `index.html`) | `responseOverrides.404` rewrites to `/index.html` with status 404 |
| `/app` SPA rewrite | **None**: `/app` and `/app/*` return 404 today; only `/app.html` works. The comment in `vite.config.ts` expects a rewrite that production never had | Not added, to keep parity. Add a `/app/*` rewrite to `/app.html` later if the React shell should be reachable |
| Security headers | None (no HSTS, CSP, nosniff, referrer policy) | `x-content-type-options: nosniff`, `referrer-policy: strict-origin-when-cross-origin`; SWA itself adds `Strict-Transport-Security: max-age=10886400; includeSubDomains; preload` |
| Cache-Control | None sent; CloudFront edge caches by its default TTL, every deploy runs a `/*` invalidation | HTML and everything else `max-age=0, must-revalidate`; `/assets/*` (hashed) 1 year immutable; `/images/*` 1 day; `/locales/*` 5 minutes. SWA purges its edge cache on each deploy |
| Compression | Brotli | Brotli/gzip built in (the local emulator does not compress) |
| `/.well-known/mcp-registry-auth` | 200, `binary/octet-stream` (MCP registry HTTP auth for the `ai.deepvalues` namespace) | 200, `text/plain`. **Check it on the preview URL**: it is a dot-folder file |
| Locale pages | Only `/` (English + client-side switch via `/i18n.js` and `/locales/*.json`, 13 locales) and the prerendered `/zh-hant/` | Same files |

Build-time configuration (`.env.production`, committed to this public repo despite `.gitignore`):
`VITE_AWS_USER_POOL_ID`, `VITE_AWS_USER_POOL_CLIENT_ID`, `VITE_AWS_COGNITO_DOMAIN`,
`VITE_REDIRECT_SIGN_IN`, `VITE_REDIRECT_SIGN_OUT`, `VITE_APP_TITLE`, `VITE_DEV_MODE`,
`VITE_AWS_REGION`, `VITE_AWS_ACCESS_KEY_ID`, `VITE_AWS_SECRET_ACCESS_KEY`.
`VITE_AWS_ACCESS_KEY_ID` and `VITE_AWS_SECRET_ACCESS_KEY` are read by
`src/services/dynamoDbClient.ts` and are **inlined into the public bundle**
(`assets/articleService-*.js`, loaded from `app.html`). Their lengths (18 and 22 characters) do
not match real AWS key formats (20 and 40), so they look like placeholders, but the founder should
confirm in IAM that no real key was ever committed (check git history too) and rotate if one was.
The migration does not change this: the bundle is built the same way.

Cognito: the hosted UI domain is `*.auth.us-west-2.amazoncognito.com` and the callback/sign-out
URL is `https://www.deepvalues.ai/`. The hostname does not change, so the Cognito app client
needs no edit. If `www` is ever redirected to the apex, update the Cognito callback URLs first.

## 2. Parity (local build in the SWA emulator vs live site)

`scripts/swa-parity-check.sh https://deepvalues.ai http://127.0.0.1:4280` checks 51 paths
(all pages, the 13 locale files, crawler files, assets, known 404s). Byte sizes matched for every
200 response. Remaining differences, all intentional:

| Path | Live | SWA | Why |
|------|------|-----|-----|
| `/zh-hant`, `/buffett-indicator`, `/privacy/buffett-indicator` | 302 to slash | 301 to slash | Permanent is correct for canonical folders; SWA's built-in behaviour |
| `/privacy`, `/terms` | 404 + landing body | 301 to `/privacy.html`, `/terms.html` | Without these, SWA would answer `/privacy` with 301 to `/privacy/` and then 404, because the `privacy/` folder exists |
| `/.well-known/mcp-registry-auth` | `binary/octet-stream` | `text/plain` | Plain text is what the registry reads |
| All responses | No security headers | nosniff, referrer policy, SWA's HSTS | Low-risk hardening; `app.deepvalues.ai` is already HTTPS, so `includeSubDomains` is safe |
| Path case | `/PRIVACY.HTML` 404 | 200 | SWA matches paths case-insensitively |

Run the same script against the preview URL after the first preview deploy; the emulator does
not reproduce compression or dot-folder upload behaviour.

## 3. Cutover (founder steps)

Prerequisites: `az login` on the Mac, Owner/Contributor on subscription "Azure subscription 1".

1. **Create the resources** (about $9/month, covered by credits):
   ```bash
   az deployment sub create -l westus2 -f infra/azure-swa/main.bicep -p infra/azure-swa/main.bicepparam
   ```
2. **Preview deploy and check**:
   ```bash
   scripts/deploy-azure-swa.sh preview
   scripts/swa-parity-check.sh https://deepvalues.ai https://<preview host printed above>
   ```
   Open the preview URL in a browser, switch a few languages, check `/zh-hant/`, the film,
   `/buffett-indicator/`, `/privacy.html`, `/.well-known/mcp-registry-auth`.
3. **Production deploy to the default hostname** (no user sees it yet):
   `scripts/deploy-azure-swa.sh production`, then run the parity script against
   `https://<name>.azurestaticapps.net`.
4. **Add both custom domains with TXT validation** (traffic still on CloudFront):
   set `customDomains = [ 'www.deepvalues.ai', 'deepvalues.ai' ]` in `main.bicepparam` and
   rerun step 1, or in the portal: Custom domains -> + Add -> Custom domain on other DNS ->
   Hostname record type **TXT**. Read the tokens:
   ```bash
   az staticwebapp hostname show -n deepvalues-web -g deepvalues-web-rg --hostname www.deepvalues.ai --query validationToken -o tsv
   az staticwebapp hostname show -n deepvalues-web -g deepvalues-web-rg --hostname deepvalues.ai --query validationToken -o tsv
   ```
   In the Squarespace Domains DNS panel (nameservers `ns-cloud-e1..e4.googledomains.com`) add the
   TXT records with exactly the host names the portal shows (`_dnsauth.www` for www; `@` or
   `_dnsauth` for the apex). Adding a TXT at `@` sits beside the existing
   `google-site-verification`, `firebase=` and SPF TXT values: add, do not replace.
   Wait until both domains show **Ready** (certificate issued) before going on.
5. **Lower TTLs** a day ahead if the panel allows it (apex is already 60 s).
6. **Switch www**: change the `www` CNAME from `d2pvfiiif8xd24.cloudfront.net` to the SWA default
   hostname (`<name>.azurestaticapps.net`).
7. **Switch the apex.** The apex today answers with CloudFront edge IPs at TTL 60, which suggests
   an ALIAS-style record in the panel. Choose, in order of preference:
   - **ALIAS/ANAME available**: point it at the SWA default hostname. Keeps global distribution.
   - **No ALIAS**: move the zone to Azure DNS (about $0.50/month) and use an alias record to the
     SWA. This means copying every record first (MX x5 for Google Workspace, SPF, Google site
     verification, Firebase TXT, `app` and any other subdomains) and then changing the
     nameservers at Squarespace. More moving parts; do it in a quiet window.
   - **Fallback**: an `A` record to the SWA `stableInboundIP` (portal -> Overview -> JSON View).
     Works anywhere but serves the apex from one region (westus2) without the global edge.
   Forwarding the apex to `www` is not recommended: every canonical URL, the sitemap and
   hreflang use the apex.
8. **Do not touch** the MX records (Google Workspace), SPF, or any other TXT records.
9. **Verify**: `dig +short www.deepvalues.ai`, `dig +short deepvalues.ai`, then
   `scripts/swa-parity-check.sh https://deepvalues.ai https://<name>.azurestaticapps.net` should
   show identical rows; test Google sign-in from `/app.html`; resubmit the sitemap in
   Search Console.
10. **From then on** deploy with `scripts/deploy-azure-swa.sh` (preview, then production). Stop
    running `aws s3 sync`; keep the bucket as it is for rollback.

### Rollback

Point `www` back to `d2pvfiiif8xd24.cloudfront.net` and the apex back to the CloudFront
distribution (same ALIAS target / previous A values: the distribution is still there). With TTL
60 s the switch takes minutes. S3 holds the last pre-cutover build; if the site changed after
cutover, run the old deploy (`npm run build`, `aws s3 sync ./dist s3://lulu-web-frontend-s3 --delete`,
CloudFront invalidation) before switching back.

### Retiring S3 and CloudFront (founder decides; nothing is deleted now)

Suggested: after 30 days on SWA with no rollback, first disable the CloudFront distribution
(reversible), wait another two weeks, then delete the distribution, the bucket, the
`.github/workflows/aws-s3-deploy.yml` workflow and its GitHub secrets, and the ACM certificate.
Before deleting, check nothing else uses the bucket (e.g. images linked from emails or videos).

## Cost

| Item | Monthly |
|------|---------|
| SWA Standard, 1 app | $9 |
| Bandwidth | 100 GB included; $0.20/GB beyond (CloudFront metrics could not be read; the landing page is 154 KB before brotli; 100 GB is about 650,000 uncompressed loads of that HTML before images, so check Azure metrics in the first month) |
| Azure DNS zone, only if the apex needs it | ~$0.50 + queries |

Standard rather than Free: Free would technically host this site (2 custom domains, headers
and routes work on Free) for $0, but it has no SLA and a hard 100 GB bandwidth limit with no
overage, so a traffic spike from a launch or video could take the public site down. Standard
also allows 10 preview environments. To save the $9, set `sku = 'Free'` in `main.bicepparam`;
plans can be switched later in the portal.
