// Azure Static Web App resource for deepvalues.ai (resource-group scope).
param siteName string
param location string
@allowed([ 'Free', 'Standard' ])
param sku string
param customDomains array
param tags object

resource swa 'Microsoft.Web/staticSites@2024-11-01' = {
  name: siteName
  location: location
  tags: tags
  sku: {
    name: sku
    tier: sku
  }
  properties: {
    // No repositoryUrl: content arrives through the SWA CLI with a deployment token,
    // mirroring today's manual "build then upload" flow (no GitHub Actions dependency).
    allowConfigFileUpdates: true
    stagingEnvironmentPolicy: 'Enabled'
    enterpriseGradeCdnStatus: 'Disabled'
    publicNetworkAccess: 'Enabled'
  }
}

// TXT validation lets a domain be validated, and its certificate issued, before any traffic
// moves: the CNAME/ALIAS switch at cutover is then the only change users see.
resource domains 'Microsoft.Web/staticSites/customDomains@2024-11-01' = [for d in customDomains: {
  parent: swa
  name: d
  properties: {
    validationMethod: 'dns-txt-token'
  }
}]

output name string = swa.name
output defaultHostname string = swa.properties.defaultHostname
