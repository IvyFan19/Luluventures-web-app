// import { ArrowUpRight } from 'lucide-react';

export function AppsSection() {
  const apps = [
    {
      id: 'deep-value-intelligence',
      name: 'Multi-Agents AI Research',
      // description: 'Multi-agent mirroring institutional trading teams',
      icon: '/images/deep_value_intelligence.png',
      appStoreUrl: null,
      githubUrl: 'https://drive.google.com/drive/folders/1NPaPNUMEr9g7iXyEzYWzIA6ktH2219wU',
      topImage: true,
      features: [
        'Analyze stocks like an institutional trading team—across Fundamentals, Value, Growth, Market, Social, and News.',
        // 'Bull/Bear researcher debate',
        // 'Portfolio-level risk management'
      ]
    },
    {
      id: 'buffett-indicator',
      name: 'Buffett Indicator iOS',
      // description: 'Track market valuation using one of Buffett\'s favorite metric',
      icon: '/images/icon-20.png',
      appStoreUrl: 'https://apps.apple.com/us/app/buffett-indicator/id6747404614',
      topImage: true,
      features: [
        'Track the market with the Buffett Indicator to know when it’s overheated or undervalued.',
        // 'Real-time metric value',
        // 'Historical trends',
        // 'Customizable alerts',
      ]
    },
    // {
    //   id: 'stocks-value',
    //   name: 'Buffett Values',
    //   description: 'Find undervalued companies using Buffett\'s investing principles.',
    //   icon: '/images/Buffett-values-icon.png',
    //   appStoreUrl: null,
    //   comingSoon: true,
    //   features: [
    //     'Intrinsic value calculator',
    //     'Margin of safety check',
    //     'Financial analysis',
    //     'Competitive metrics'
    //   ]
    // }
  ];

  return (
    <section id="apps" className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-blue-900">Reaserch Agents & Tools</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {apps.map((app) => (
            <div key={app.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
              <div className="flex flex-col md:flex-row h-full">
                {/* Left panel: fill with image (topImage) or icon + button */}
                {'topImage' in app && app.topImage ? (
                  <div className="h-48 md:w-2/5 md:h-auto flex-shrink-0 relative">
                    <div className="absolute inset-0">
                      <img
                        src={app.icon}
                        alt={app.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="md:w-2/5 p-6 flex flex-col justify-center items-center bg-gray-300 h-full">
                    <img
                      src={app.icon}
                      alt={app.name}
                      className="w-32 h-32 object-cover rounded-2xl shadow-lg mb-4"
                    />
                    {'comingSoon' in app && app.comingSoon ? (
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
                <div className="md:w-3/5 p-4 flex flex-col">
                  <h3 className="text-2xl font-bold mb-1 text-blue-900">{app.name}</h3>
                  {!!('description' in app && app.description) && (
                    <p className={'topImage' in app && app.topImage ? "text-gray-700 mb-2 text-base font-semibold" : "text-gray-700 mb-2"}>{app.description as string}</p>
                  )}
                  <ul className="mb-3 space-y-2">
                    {app.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className={'topImage' in app && app.topImage ? "text-base text-gray-700" : "text-sm text-gray-700"}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {'githubUrl' in app && app.githubUrl && (
                    <div className="flex flex-col items-center w-full mt-auto">
                      <a
                        href={app.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-2 text-white text-lg font-semibold rounded-lg hover:opacity-90 transition-opacity" style={{ backgroundColor: '#096efd' }}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                        Try It Now
                      </a>
                      <span className="text-sm text-gray-500 mt-2 font-medium">No credit card</span>
                    </div>
                  )}
                  {'topImage' in app && app.topImage && !('githubUrl' in app && app.githubUrl) && app.appStoreUrl && (
                    <div className="flex flex-col items-center w-full mt-auto">
                      <a
                        href={app.appStoreUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-2 text-white text-lg font-semibold rounded-lg hover:opacity-90 transition-opacity" style={{ backgroundColor: '#096efd' }}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" /></svg>
                        Download on App Store
                      </a>
                      <span className="text-sm text-gray-500 mt-2 font-medium invisible">No credit card</span>
                    </div>
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