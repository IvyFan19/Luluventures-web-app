import { useState, useEffect } from 'react';
import { Calendar, User, ArrowRight, RefreshCw, AlertCircle, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { useResearchArticles } from '../hooks/useResearchArticles';
import { ArticleService } from '../services/articleService';

interface User {
  username: string;
  [key: string]: unknown;
}

interface ResearchAnalysisPageProps {
  user?: User;
  signOut?: () => void;
}

export function ResearchAnalysisPage({ user, signOut }: ResearchAnalysisPageProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTag, setActiveTag] = useState<string>('all');
  const [countdown, setCountdown] = useState(10);
  const navigate = useNavigate();
  
  const { articles, loading, error, availableTags, refetch } = useResearchArticles();

  useEffect(() => {
    if (!user) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            navigate('/login');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [user, navigate]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  const categories = [
    { id: 'all', name: 'All Research' },
    ...availableTags
      .filter(tag => typeof tag === 'string' && tag.length > 0)
      .map(tag => ({ id: tag, name: tag.charAt(0).toUpperCase() + tag.slice(1) }))
  ];

  const filteredDocuments = activeTag === 'all'
    ? articles
    : articles.filter(doc => doc.tags.includes(activeTag));

  if (!user) {
    return (
      <div className="min-h-screen bg-white text-gray-900">
        <Header 
          isMenuOpen={isMenuOpen} 
          toggleMenu={toggleMenu} 
          signOut={signOut} 
          user={user} 
        />
        
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center py-20">
              <div className="mb-8">
                <Lock size={64} className="mx-auto text-gray-400 mb-4" />
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Login Required
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  You need to log in to access our exclusive research and analysis content.
                </p>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 max-w-md mx-auto">
                <p className="text-blue-800 mb-4">
                  Redirecting to login page in {countdown} seconds...
                </p>
                <div className="w-full bg-blue-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-1000" 
                    style={{width: `${(countdown / 10) * 100}%`}}
                  ></div>
                </div>
              </div>
              
              <div className="space-y-4">
                <button
                  onClick={() => navigate('/login')}
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors mr-4"
                >
                  <Lock size={20} className="mr-2" />
                  Login Now
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <ArrowRight size={20} className="mr-2 rotate-180" />
                  Back to Homepage
                </button>
              </div>
              
              <div className="mt-12 text-left max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  What you'll get with login:
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <ArrowRight size={20} className="text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Access to exclusive research reports and market analysis</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight size={20} className="text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span>In-depth company valuations and investment insights</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight size={20} className="text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Premium content from the LuLu investment team</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight size={20} className="text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Personalized content recommendations</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }

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
                  onClick={() => setActiveTag(category.id)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                    activeTag === category.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
              
              {/* Refresh Button */}
              <button
                onClick={refetch}
                disabled={loading}
                className="px-4 py-3 rounded-full font-medium transition-all duration-200 bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
                Refresh
              </button>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-16">
              <div className="flex items-center gap-3 text-gray-600">
                <RefreshCw size={24} className="animate-spin" />
                <span className="text-lg">Loading articles...</span>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
              <div className="flex items-center gap-3 text-red-700">
                <AlertCircle size={24} />
                <div>
                  <h3 className="font-semibold">Error Loading Articles</h3>
                  <p className="text-sm mt-1">{error}</p>
                  <button
                    onClick={refetch}
                    className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Research Articles Grid */}
          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDocuments.map((doc) => (
                <article 
                  key={doc.articleId}
                  className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
                >
                  {/* Thumbnail */}
                  <div className="aspect-video bg-gray-100 overflow-hidden">
                    {doc.coverImageUrl ? (
                      <img
                        src={doc.coverImageUrl}
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
                    {/* Tags */}
                    <div className="mb-3 flex flex-wrap gap-2">
                      {doc.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full">
                          {tag}
                        </span>
                      ))}
                      {doc.tags.length > 3 && (
                        <span className="inline-block px-3 py-1 bg-gray-50 text-gray-500 text-sm font-medium rounded-full">
                          +{doc.tags.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {doc.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                      {doc.summary}
                    </p>

                    {/* Meta Information */}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-2" />
                        <span>{ArticleService.formatDate(doc.createdAt)}</span>
                      </div>
                      <div className="flex items-center">
                        <User size={14} className="mr-2" />
                        <span>LuLu Team</span>
                      </div>
                    </div>

                    {/* Premium Badge */}
                    {doc.isPremium && (
                      <div className="mt-3">
                        <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">
                          Premium
                        </span>
                      </div>
                    )}

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
          )}

          {/* Empty State */}
          {!loading && !error && filteredDocuments.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">
                No research documents found{activeTag !== 'all' ? ` for "${activeTag}" tag` : ''}.
              </p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}