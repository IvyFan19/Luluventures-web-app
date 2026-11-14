// DeepValues landing site (deepvalues.ai) on Azure Static Web Apps.
// Subscription-scoped: creates the resource group, then the static web app inside it.
// Content is deployed separately by scripts/deploy-azure-swa.sh (SWA CLI + deployment token);
// this template only creates the hosting resource and, optionally, the custom domains.
//
// Deploy (founder runs this, not CI):
//   az deployment sub create -l westus2 -f infra/azure-swa/main.bicep -p infra/azure-swa/main.bicepparam
targetScope = 'subscription'

@description('Resource group for the landing site.')
param resourceGroupName string = 'deepvalues-web-rg'

@description('Region for the resource group and the SWA control plane. Static content is served from the global edge regardless. Microsoft.Web/staticSites supports centralus, eastus2, westus2, westeurope, eastasia.')
@allowed([ 'westus2', 'centralus', 'eastus2', 'westeurope', 'eastasia' ])
param location string = 'westus2'

@description('Static web app name; also the prefix of the generated *.azurestaticapps.net hostname.')
param siteName string = 'deepvalues-web'

@description('Free or Standard. Standard is used for the SLA, 500 MB per environment, 10 preview environments and bandwidth overage instead of a hard cap.')
@allowed([ 'Free', 'Standard' ])
param sku string = 'Standard'

@description('Custom domains to attach with TXT validation. Leave empty for the first deployment; add them when the founder is ready to put the TXT records in DNS (see doc/azure-swa-migration.md).')
param customDomains array = []

param tags object = {
  app: 'deepvalues-landing'
  repo: 'IvyFan19/Luluventures-web-app'
  managedBy: 'bicep'
}

resource rg 'Microsoft.Resources/resourceGroups@2024-03-01' = {
  name: resourceGroupName
  location: location
  tags: tags
}

module site 'swa.bicep' = {
  name: 'deepvalues-web-swa'
  scope: rg
  params: {
    siteName: siteName
    location: location
    sku: sku
    customDomains: customDomains
    tags: tags
  }
}

output resourceGroup string = rg.name
output siteName string = site.outputs.name
output defaultHostname string = site.outputs.defaultHostname
