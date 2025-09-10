// import { ArrowUpRight } from 'lucide-react';

export function AppsSection() {
  const apps = [
    {
      id: 'buffett-indicator',
      name: 'Buffett Indicator',
      description: 'Track market valuation using one of Buffett\'s favorite metric.',
      icon: 'dist/images/icon-20-compressed.png',
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
      icon: 'https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      appStoreUrl: 'https://apps.apple.com',
      features: [
        'Intrinsic value calculator',
        'Margin of safety check',
        'Financial analysis',
        'Competitive metrics'
      ]
    }
  ];

  return (
    <section id="apps" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-4 text-blue-900">Value Investing Apps</h2>
          {/* <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Access powerful investing tools based on Warren Buffett's principles right from your iOS device.
          </p> */}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {apps.map((app) => (
            <div key={app.id} className="bg-white rounded-xl overflow-hidden shadow-lg">
              <div className="flex flex-col md:flex-row h-full">
                <div className="md:w-2/5 p-6 flex flex-col justify-center items-center bg-gradient-to-br from-gray-100 to-gray-200 h-full">
                  <img 
                    src={app.icon} 
                    alt={app.name} 
                    className="w-32 h-32 object-cover rounded-2xl shadow-lg mb-4"
                  />
                  <a 
                    href={app.appStoreUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block hover:opacity-80 transition-opacity"
                  >
                    <img 
                      src="dist/images/Download_on_the_App_Store_Badge_US-UK_RGB_wht_092917.svg" 
                      alt="Download on the App Store" 
                      className="w-32"
                    />
                  </a>
                </div>
                
                <div className="md:w-3/5 p-6">
                  <h3 className="text-2xl font-bold mb-2 text-blue-900">{app.name}</h3>
                  <p className="text-gray-700 mb-4">{app.description}</p>
                  
                  <ul className="mb-6 space-y-2">
                    {app.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}