#!/usr/bin/env bash
# Compare status code, redirect target, content type and selected headers for every
# public route between two hosts (default: live CloudFront site vs local SWA emulator).
# Usage: scripts/swa-parity-check.sh [REFERENCE_BASE] [CANDIDATE_BASE]
#   e.g. scripts/swa-parity-check.sh https://deepvalues.ai http://127.0.0.1:4280
#        scripts/swa-parity-check.sh https://deepvalues.ai https://<app>-preview.westus2.azurestaticapps.net
set -uo pipefail

REF="${1:-https://deepvalues.ai}"
CAND="${2:-http://127.0.0.1:4280}"

# Routes: landing, locale page, legal pages, app shells, directory indexes with and without
# trailing slash, crawler files, locale bundles, a well-known file, and known 404s.
PATHS=(
  / "/?utm_source=x" /index.html /zh-hant/ /zh-hant /zh-hant/index.html
  /app.html /app /app/ /app/dashboard /api.html /api
  /privacy.html /privacy /terms.html /terms
  /buffett-indicator/ /buffett-indicator /buffett-indicator/index.html
  /privacy/buffett-indicator/ /privacy/buffett-indicator
  /robots.txt /sitemap.xml /llms.txt /app-ads.txt /i18n.js "/i18n.js?v=1" /analytics.js
  /favicon.ico /apple-touch-icon.png /images/deepvalues-ginkgo-128.png
  /.well-known/mcp-registry-auth /.well-known/apple-app-site-association
  /does-not-exist /does-not-exist.js /ja/ /pitch-deck.html /staticwebapp.config.json
)
for loc in de en es-419 es-ES fr hi id it ja ko pt-BR zh-Hant zh; do PATHS+=("/locales/$loc.json"); done

probe() {
  # Prints: status | location (path only) | content-type (no params) | size
  curl -s -o /dev/null --max-time 20 \
    -w '%{http_code}|%{redirect_url}|%{content_type}|%{size_download}' "$1$2" \
    | sed -E "s#\|https?://[^/|]+#|#; s#;[^|]*##"
}

printf '%-40s %-45s %-45s %s\n' PATH REFERENCE CANDIDATE MATCH
diffs=0
for p in "${PATHS[@]}"; do
  r=$(probe "$REF" "$p"); c=$(probe "$CAND" "$p")
  # Compare status, redirect path and content type; size is informational (builds differ).
  rk=$(cut -d'|' -f1-3 <<<"$r"); ck=$(cut -d'|' -f1-3 <<<"$c")
  m=OK; [[ "$rk" != "$ck" ]] && { m=DIFF; diffs=$((diffs+1)); }
  printf '%-40s %-45s %-45s %s\n' "$p" "$r" "$c" "$m"
done

echo
echo "Headers on / (reference vs candidate):"
for h in "$REF" "$CAND"; do
  echo "-- $h"
  curl -sI --max-time 20 -H 'Accept-Encoding: br, gzip' "$h/" \
    | grep -i -E '^(cache-control|content-encoding|strict-transport|x-content-type|referrer-policy|x-frame|content-security)' || true
done
echo
echo "$diffs route(s) differ on status, redirect or content type."
