import { ArrowRight, Download } from 'lucide-react';

const products = [
  {
    id: 'deep-value-intelligence',
    name: 'Multi-Agent AI Research',
    tagline: 'Your personal investing team, powered by AI.',
    description:
      'Fundamentals, value, growth, market, trend, and risk analysts — working together to research any company in seconds.',
    image: '/images/deep_value_intelligence.png',
    cta: { label: 'Try It Free', url: 'https://app.deepvalues.ai', icon: 'arrow' },
  },
  {
    id: 'buffett-indicator',
    name: 'Buffett Indicator',
    tagline: 'Know when the market is overheated.',
    description:
      'Track the market using Warren Buffett\'s favorite valuation metric. Real-time data, historical trends, all on iOS.',
    image: '/images/icon-20.png',
    cta: {
      label: 'Download on App Store',
      url: 'https://apps.apple.com/us/app/buffett-indicator/id6747404614',
      icon: 'download',
    },
  },
];

export function AppsSection() {
  return (
    <section id="apps" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-20">
          Tools for Smart Investors
        </h2>

        <div className="space-y-32">
          {products.map((product, index) => {
            const isReversed = index % 2 === 1;
            return (
              <div
                key={product.id}
                className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 md:gap-20 max-w-6xl mx-auto`}
              >
                {/* Product image */}
                <div className="flex-1 w-full">
                  <div className={`rounded-2xl overflow-hidden shadow-xl ${product.id === 'buffett-indicator' ? 'max-w-[280px] mx-auto' : ''}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Product info */}
                <div className="flex-1 w-full">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                    {product.name}
                  </h3>
                  <p className="text-xl text-gray-500 mb-4 font-medium">
                    {product.tagline}
                  </p>
                  <p className="text-gray-600 text-lg leading-relaxed mb-8">
                    {product.description}
                  </p>
                  <a
                    href={product.cta.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-gray-900 text-white rounded-full text-base font-semibold hover:bg-gray-800 transition-all duration-300 hover:scale-105"
                  >
                    {product.cta.label}
                    {product.cta.icon === 'arrow' ? (
                      <ArrowRight className="w-4 h-4" />
                    ) : (
                      <Download className="w-4 h-4" />
                    )}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
