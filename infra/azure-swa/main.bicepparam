using 'main.bicep'

param resourceGroupName = 'deepvalues-web-rg'
param location = 'westus2'
param siteName = 'deepvalues-web'
param sku = 'Standard'
// Step 2 of the cutover: set to [ 'www.deepvalues.ai', 'deepvalues.ai' ] and redeploy,
// then read each TXT token with: az staticwebapp hostname show -n deepvalues-web -g deepvalues-web-rg --hostname <domain> --query validationToken -o tsv
param customDomains = []
