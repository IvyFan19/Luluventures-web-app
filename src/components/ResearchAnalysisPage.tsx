import { useState } from 'react';
import { Calendar, User, ArrowRight, RefreshCw, AlertCircle } from 'lucide-react';
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
  
  const { articles, loading, error, availableTags, refetch } = useResearchArticles();

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