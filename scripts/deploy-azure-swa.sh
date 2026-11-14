#!/usr/bin/env bash
# Build the landing site and deploy it to Azure Static Web Apps with the SWA CLI.
#
#   scripts/deploy-azure-swa.sh                 # build + deploy to the "preview" environment
#   scripts/deploy-azure-swa.sh preview         # same
#   scripts/deploy-azure-swa.sh production      # asks for confirmation, then deploys live
#   SKIP_BUILD=1 scripts/deploy-azure-swa.sh    # deploy the existing ./dist as is
#
# Always deploy to preview first, run scripts/swa-parity-check.sh against the preview URL,
# and only then deploy production.
#
# The deployment token is read from Azure at runtime (az must be signed in with access to
# the resource group). It is passed to the SWA CLI through an environment variable scoped to
# that one command: it is never printed, written to disk, or placed on a command line.
set -euo pipefail

ENVIRONMENT="${1:-preview}"
RESOURCE_GROUP="${SWA_RESOURCE_GROUP:-deepvalues-web-rg}"
SITE_NAME="${SWA_SITE_NAME:-deepvalues-web}"
SWA_CLI="@azure/static-web-apps-cli@2.1.0"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

case "$ENVIRONMENT" in
  production)
    read -r -p "Deploy ./dist to PRODUCTION on $SITE_NAME? Type 'production' to continue: " answer
    [[ "$answer" == "production" ]] || { echo "Aborted."; exit 1; }
    ;;
  [a-z0-9]*) ;;  # any preview environment name, e.g. preview, pr-12
  *) echo "Unknown environment '$ENVIRONMENT'"; exit 1 ;;
esac

cd "$ROOT"

az account show --output none || { echo "Sign in first: az login"; exit 1; }

if [[ -z "${SKIP_BUILD:-}" ]]; then
  # Vite reads .env.production in production mode, exactly as the S3 deploy does today.
  npm run build
fi
[[ -f dist/index.html ]] || { echo "dist/index.html missing; build failed?"; exit 1; }
[[ -f dist/.well-known/mcp-registry-auth ]] || echo "WARNING: dist/.well-known/mcp-registry-auth missing (MCP registry domain auth)."

# Fetch the token into a variable only; no echo, no xtrace.
set +x
SWA_TOKEN="$(az staticwebapp secrets list \
  --name "$SITE_NAME" --resource-group "$RESOURCE_GROUP" \
  --query 'properties.apiKey' --output tsv)"
[[ -n "$SWA_TOKEN" ]] || { echo "Could not read the deployment token."; exit 1; }

SWA_CLI_DEPLOYMENT_TOKEN="$SWA_TOKEN" npx --yes "$SWA_CLI" deploy ./dist \
  --env "$ENVIRONMENT" \
  --swa-config-location "$ROOT" \
  --no-use-keychain
unset SWA_TOKEN

if [[ "$ENVIRONMENT" == "production" ]]; then
  HOST="$(az staticwebapp show -n "$SITE_NAME" -g "$RESOURCE_GROUP" --query defaultHostname -o tsv)"
else
  HOST="$(az staticwebapp environment list -n "$SITE_NAME" -g "$RESOURCE_GROUP" \
    --query "[?buildId=='$ENVIRONMENT'].hostname | [0]" -o tsv)"
fi
echo
echo "Deployed '$ENVIRONMENT': https://$HOST"
echo "Parity check: scripts/swa-parity-check.sh https://deepvalues.ai https://$HOST"
