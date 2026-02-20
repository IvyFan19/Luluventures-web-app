// import { ArrowUpRight } from 'lucide-react';

export function AppsSection() {
  const apps = [
    {
      id: 'deep-value-intelligence',
      name: 'AI Agents',
      description: 'Multi-agent mirroring institutional trading teams',
      icon: '/images/deep_value_intelligence.png',
      appStoreUrl: null,
      githubUrl: 'https://github.com/luluventures-research/DeepValueIntelligence',
      topImage: true,
      features: [
        '6 specialized analysts/agents (Fundamental, Value, Growth, Market, Social, News)',
        'Bull/Bear researcher debate',
        'Portfolio-level risk management'
      ]
    },
    {
      id: 'buffett-indicator',
      name: 'Buffett Indicator',
      description: 'Track market valuation using one of Buffett\'s favorite metric.',
      icon: '/images/icon-20.png',
      appStoreUrl: 'https://apps.apple.com/us/app/buffett-indicator/id6747404614',
      features: [
        'Real-time metric value',
        'Historical trends',
        'Customizable alerts',
        'Market analysis'
      ]
    },
    {
      id: 'stocks-value',
      name: 'Buffett Values',
      description: 'Find undervalued companies using Buffett\'s investing principles.',
      icon: '/images/Buffett-values-icon.png',
      appStoreUrl: null,
      comingSoon: true,
      features: [
        'Intrinsic value calculator',
        'Margin of safety check',
        'Financial analysis',
        'Competitive metrics'
      ]
    }
  ];

  return (
    <section id="apps" className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold mb-4 text-blue-900">Reaserch Agents & Tools</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {apps.map((app) => (
            <div key={app.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 h-100">
              <div className="flex flex-col md:flex-row h-full">
                {/* Left panel: fill with image (topImage) or icon + button */}
                {'topImage' in app && app.topImage ? (
                  <div className="md:w-2/5 flex-shrink-0 self-stretch">
                    <img
                      src={app.icon}
                      alt={app.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="md:w-2/5 p-6 flex flex-col justify-center items-center bg-gray-300 h-full">
                    <img
                      src={app.icon}
                      alt={app.name}
                      className="w-32 h-32 object-cover rounded-2xl shadow-lg mb-4"
                    />
                    {app.comingSoon ? (
                      <div className="w-32 h-12 bg-white text-black rounded-lg flex items-center justify-center border-2 border-black">
                        <span className="text-sm font-semibold">Coming Soon</span>
                      </div>
                    ) : (
                      <a
                        href={app.appStoreUrl ?? undefined}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block hover:opacity-80 transition-opacity"
                      >
                        <img
                          src="/images/Download_on_the_App_Store_Badge_US-UK_RGB_wht_092917.svg"
                          alt="Download on the App Store"
                          className="w-32"
                        />
                      </a>
                    )}
                  </div>
                )}

                {/* Right panel: content */}
                <div className="md:w-3/5 p-6 flex flex-col">
                  <h3 className="text-2xl font-bold mb-2 text-blue-900">{app.name}</h3>
                  <p className={'topImage' in app && app.topImage ? "text-gray-700 mb-4 text-base font-semibold" : "text-gray-700 mb-4"}>{app.description}</p>
                  <ul className="mb-6 space-y-2 flex-1">
                    {app.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2 text-base">✓</span>
                        <span className={'topImage' in app && app.topImage ? "text-base text-gray-700" : "text-sm text-gray-700"}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {'githubUrl' in app && app.githubUrl && (
                    <a
                      href={app.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-4 text-white text-lg font-semibold rounded-lg hover:opacity-90 transition-opacity" style={{backgroundColor: '#096efd'}}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3"/></svg>
                      Download
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}