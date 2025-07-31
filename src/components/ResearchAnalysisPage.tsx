import { useState } from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Header } from './Header';
import { Footer } from './Footer';

type ResearchDocument = {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  thumbnail?: string;
};

interface ResearchAnalysisPageProps {
  user?: {
    username: string;
    [key: string]: any;
  };
  signOut?: () => void;
}

export function ResearchAnalysisPage({ user, signOut }: ResearchAnalysisPageProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const researchDocuments: ResearchDocument[] = [
    {
      id: 'doc1',
      title: 'S&P 500 Valuation Analysis: Q2 2025',
      description: 'A comprehensive analysis of S&P 500 valuations with insights on current market trends and identifying undervalued opportunities in the current market environment.',
      date: 'June 15, 2025',
      category: 'market',
      thumbnail: '/images/sp500-analysis.jpg'
    },
    {
      id: 'doc2',
      title: 'Deep Dive: Apple Inc. Intrinsic Value',
      description: 'Detailed breakdown of Apple\'s business model, competitive advantages, and intrinsic value calculation using discounted cash flow methodology.',
      date: 'June 1, 2025',
      category: 'company',
      thumbnail: '/images/apple-analysis.jpg'
    },
    {
      id: 'doc3',
      title: 'Interest Rates and Equity Valuations Correlation',
      description: 'Research on how interest rate changes historically impact equity valuations across different sectors and asset classes.',
      date: 'May 15, 2025',
      category: 'economics',
      thumbnail: '/images/interest-rates.jpg'
    },
    {
      id: 'doc4',
      title: 'Value Investing in High Inflation Environments',
      description: 'Strategies for value investors during periods of elevated inflation based on historical data and portfolio optimization techniques.',
      date: 'May 1, 2025',
      category: 'strategy',
      thumbnail: '/images/inflation-strategy.jpg'
    },
    {
      id: 'doc5',
      title: 'Microsoft Corporation: Competitive Advantage Analysis',
      description: 'Analysis of Microsoft\'s economic moat and competitive positioning in cloud computing, productivity software, and emerging technologies.',
      date: 'April 15, 2025',
      category: 'company',
      thumbnail: '/images/microsoft-analysis.jpg'
    },
    {
      id: 'doc6',
      title: 'ESG Integration in Value Investing Framework',
      description: 'How environmental, social, and governance factors can be incorporated into traditional value investing methodologies.',
      date: 'April 1, 2025',
      category: 'strategy',
      thumbnail: '/images/esg-investing.jpg'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Research' },
    { id: 'company', name: 'Company Analysis' },
    { id: 'market', name: 'Market Reports' },
    { id: 'economics', name: 'Economic Research' },
    { id: 'strategy', name: 'Investment Strategy' }
  ];

  const filteredDocuments = activeCategory === 'all'
    ? researchDocuments
    : researchDocuments.filter(doc => doc.category === activeCategory);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header 
        isMenuOpen={isMenuOpen} 
        toggleMenu={toggleMenu} 
        signOut={signOut} 
        user={user} 
      />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Research & Analysis
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              In-depth research and analysis on value investing, company valuations, 
              and market insights to guide your investment decisions.
            </p>
          </div>

          {/* Category Filter */}
          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                    activeCategory === category.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Research Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDocuments.map((doc) => (
              <article 
                key={doc.id}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
              >
                {/* Thumbnail */}
                <div className="aspect-video bg-gray-100 overflow-hidden">
                  {doc.thumbnail ? (
                    <img
                      src={doc.thumbnail}
                      alt={doc.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                      <div className="text-blue-400">
                        <ArrowRight size={32} />
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Category Badge */}
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full">
                      {categories.find(cat => cat.id === doc.category)?.name}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {doc.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                    {doc.description}
                  </p>

                  {/* Meta Information */}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-2" />
                      <span>{doc.date}</span>
                    </div>
                    <div className="flex items-center">
                      <User size={14} className="mr-2" />
                      <span>LuLu Team</span>
                    </div>
                  </div>

                  {/* Read More Arrow */}
                  <div className="mt-4 flex justify-end">
                    <ArrowRight 
                      size={20} 
                      className="text-blue-600 group-hover:translate-x-1 transition-transform duration-200" 
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Empty State */}
          {filteredDocuments.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">
                No research documents found in this category.
              </p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}