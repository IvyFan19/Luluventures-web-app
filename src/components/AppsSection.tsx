import { ArrowUpRight } from 'lucide-react';

export function AppsSection() {
  const apps = [
    {
      id: 'buffett-indicator',
      name: 'Buffett Indicator',
      description: 'Track market valuation using one of Buffett\'s favorite metric.',
      icon: 'https://images.pexels.com/photos/186461/pexels-photo-186461.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      features: [
        'Real-time metric value',
        'Historical trends',
        'Customizable alerts',
        'Market analysis'
      ]
    },
    {
      id: 'stocks-value',
      name: 'Stocks Value',
      description: 'Find undervalued companies using Buffett\'s investing principles.',
      icon: 'https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
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
          <h2 className="text-3xl font-bold mb-4 text-blue-900">Value Investing Tools</h2>
          {/* <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Access powerful investing tools based on Warren Buffett's principles right from your iOS device.
          </p> */}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {apps.map((app) => (
            <div key={app.id} className="bg-white rounded-xl overflow-hidden shadow-lg">
              <div className="flex flex-col md:flex-row h-full">
                <div className="md:w-2/5 p-6 flex justify-center items-center bg-gradient-to-br from-gray-100 to-gray-200 h-full">
                  <img 
                    src={app.icon} 
                    alt={app.name} 
                    className="w-32 h-32 object-cover rounded-2xl shadow-lg"
                  />
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
                  
                  <a 
                    href="https://apps.apple.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-5 py-2 bg-black text-white rounded-lg font-semibold hover:bg-gray-900 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16.3 5.9c-1.6 0-2.3.8-3.5.8-1.2 0-2.2-.8-3.7-.8-1.5 0-3.1.9-4.1 2.5-1.4 2.5-.4 6.1 1 8.1.7 1 1.4 2 2.5 2 1 0 1.5-.7 2.7-.7 1.2 0 1.6.7 2.7.7 1.1 0 1.8-1 2.5-2 .8-1.1 1.1-2.1 1.1-2.2-.1-.1-2-.8-2-3 0-2.4 1.9-3.2 2-3.3-.6-.9-2.2-1.1-2.2-1.1z"></path>
                      <path d="M14.9 2.7c.7-.9 1.2-2.1 1.1-3.4-1.1.1-2.3.8-3.1 1.7-.7.8-1.2 2-1.1 3.3 1.2.1 2.4-.6 3.1-1.6z"></path>
                    </svg>
                    Coming Soon
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}