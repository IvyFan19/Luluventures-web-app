import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Tag, AlertCircle, Play, Share, ChevronLeft } from 'lucide-react';
import { Header } from './Header';
import { Footer } from './Footer';
import { MarkdownRenderer } from './MarkdownRenderer';
import { ArticleService, ResearchDocument } from '../services/articleService';
import { ContentService } from '../services/contentService';

interface User {
  username: string;
  [key: string]: unknown;
}

interface ArticleDetailPageProps {
  user?: User;
  signOut?: () => void;
}

export function ArticleDetailPage({ user, signOut }: ArticleDetailPageProps) {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [article, setArticle] = useState<ResearchDocument | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [markdownContent, setMarkdownContent] = useState<string | null>(null);
  const [contentLoading, setContentLoading] = useState(false);
  const [contentError, setContentError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!slug) {
        setError('Article not found');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const articles = await ArticleService.getAllArticles();
        const foundArticle = articles.find(a => a.articleId === slug);
        
        if (foundArticle) {
          setArticle(foundArticle);
          // Fetch markdown content after article is loaded
          fetchMarkdownContent(foundArticle.contentUrl);
        } else {
          setError('Article not found');
        }
      } catch (err) {
        setError('Failed to load article');
        console.error('Error fetching article:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  const fetchMarkdownContent = async (contentUrl: string) => {
    if (!ContentService.validateMarkdownUrl(contentUrl)) {
      setContentError('Invalid content URL');
      return;
    }

    try {
      setContentLoading(true);
      setContentError(null);
      const content = await ContentService.fetchMarkdownContent(contentUrl);
      setMarkdownContent(content);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load content';
      setContentError(errorMessage);
      console.error('Error fetching markdown content:', error);
    } finally {
      setContentLoading(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleBackClick = () => {
    navigate('/research-analysis');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-gray-100">
        <Header 
          isMenuOpen={isMenuOpen} 
          toggleMenu={toggleMenu} 
          signOut={signOut} 
          user={user} 
        />
        <main className="pt-24 pb-16 ml-64">
          <div className="max-w-4xl mx-auto px-8">
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-400"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-black text-gray-100">
        <Header 
          isMenuOpen={isMenuOpen} 
          toggleMenu={toggleMenu} 
          signOut={signOut} 
          user={user} 
        />
        <main className="pt-24 pb-16 ml-64">
          <div className="max-w-4xl mx-auto px-8">
            <div className="text-center py-20">
              <h1 className="text-3xl font-bold text-white mb-4">Article Not Found</h1>
              <p className="text-gray-400 mb-8">{error}</p>
              <button
                onClick={handleBackClick}
                className="inline-flex items-center px-6 py-3 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors"
              >
                <ArrowLeft size={20} className="mr-2" />
                Back to Research
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <Header 
        isMenuOpen={isMenuOpen} 
        toggleMenu={toggleMenu} 
        signOut={signOut} 
        user={user} 
      />
      
      {/* Sidebar */}
      <aside className="fixed left-0 top-16 bottom-0 w-64 bg-black border-r border-gray-800 overflow-y-auto z-10">
        <div className="p-6">
          {/* Back to Home */}
          <div className="flex items-center space-x-2 mb-8">
            <button 
              onClick={handleBackClick}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="text-sm">Research & Analysis</span>
            </button>
          </div>

          {/* Research Section */}
          <div className="mb-8">
            <div className="space-y-3">
              <div className="sidebar-item">Research Index</div>
              <div className="sidebar-item">Research Overview</div>
              <div className="sidebar-item">Research Analysis</div>
            </div>
          </div>

          {/* Latest Research */}
          <div className="mb-8">
            <h3 className="text-gray-500 text-xs uppercase tracking-wide mb-4">Latest Research</h3>
            <div className="space-y-3">
              <div className="sidebar-item active">{article?.title}</div>
              <div className="sidebar-item">Market Analysis</div>
              <div className="sidebar-item">Investment Trends</div>
              <div className="sidebar-item">Risk Assessment</div>
            </div>
          </div>

          {/* Categories Section */}
          <div className="mb-8">
            <h3 className="text-gray-500 text-xs uppercase tracking-wide mb-4">Categories</h3>
            <div className="space-y-3">
              {article?.tags.map((tag, index) => (
                <div key={index} className="sidebar-item">{tag}</div>
              ))}
            </div>
          </div>
        </div>
      </aside>
      
      <main className="pt-16 pb-20 ml-64">

        <div className="max-w-4xl mx-auto px-8">
          {/* Article Header */}
          <div className="text-center mb-16">
            <div className="mb-4">
              <span className="text-gray-400 text-sm">{ArticleService.formatDate(article.createdAt)}</span>
              <span className="mx-3 text-gray-600">•</span>
              <span className="text-gray-400 text-sm">
                {article.tags.length > 0 ? article.tags[0] : 'Research'}
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-light text-white mb-6 leading-tight">
              {article.title}
            </h1>

            <p className="text-xl text-gray-300 mb-8">
              {article.summary}
            </p>

            {/* Audio Player and Share */}
            <div className="flex items-center justify-center space-x-8 mb-12">
              <button className="flex items-center space-x-3 bg-gray-800 hover:bg-gray-700 transition-colors px-4 py-2 rounded-md">
                <Play className="w-4 h-4 text-white" />
                <span className="text-white text-sm">Listen to article</span>
                <span className="text-gray-400 text-sm">Est. {Math.ceil((markdownContent?.length || 1000) / 1000)} min</span>
              </button>

              <button className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                <Share className="w-4 h-4" />
                <span className="text-sm">Share</span>
              </button>
            </div>
          </div>

          {/* Hero Image */}
          {article.coverImageUrl && (
            <div className="mb-16 rounded-2xl overflow-hidden">
              <img
                src={article.coverImageUrl}
                alt={article.title}
                className="w-full h-96 object-cover"
              />
            </div>
          )}

          {/* Executive Summary Section */}
          <section className="mb-16">
            <h2 className="article-heading">Executive Summary</h2>
            <div className="article-text">
              <p className="text-lg">{article.summary}</p>
            </div>
          </section>

          {/* Article Content Section */}
          <section className="mb-16">
            <h2 className="article-heading">Analysis</h2>
            <div className="article-text">
              {contentLoading && (
                <div className="flex justify-center items-center py-12">
                  <div className="flex items-center gap-3 text-gray-400">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600"></div>
                    <span className="text-lg">Loading article content...</span>
                  </div>
                </div>
              )}

              {contentError && (
                <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 mb-8">
                  <div className="flex items-center gap-3 text-red-400">
                    <AlertCircle size={24} />
                    <div>
                      <h3 className="font-semibold text-white">Failed to Load Content</h3>
                      <p className="text-sm mt-1">{contentError}</p>
                      <button
                        onClick={() => fetchMarkdownContent(article.contentUrl)}
                        className="mt-3 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        Try Again
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {markdownContent && !contentLoading && !contentError && (
                <div className="prose prose-invert max-w-none">
                  <MarkdownRenderer 
                    content={markdownContent}
                    className="text-gray-300"
                  />
                </div>
              )}

              {!contentLoading && !contentError && !markdownContent && (
                <div className="bg-gray-900 border border-gray-700 rounded-lg p-8 text-center">
                  <h3 className="text-xl font-semibold text-white mb-4">
                    No Content Available
                  </h3>
                  <p className="text-gray-400">
                    The article content could not be loaded at this time.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Meta Information Section */}
          <section className="mb-16">
            <h2 className="article-heading">Article Information</h2>
            <div className="article-text">
              <div className="flex flex-wrap items-center gap-6 text-gray-400 border-b border-gray-800 pb-8">
                <div className="flex items-center">
                  <Calendar size={18} className="mr-2" />
                  <span className="font-medium">{ArticleService.formatDate(article.createdAt)}</span>
                </div>
                <div className="flex items-center">
                  <User size={18} className="mr-2" />
                  <span className="font-medium">LuLu Research Team</span>
                </div>
                <div className="text-sm">
                  {article.viewCount} views
                </div>
                {article.isPremium && (
                  <span className="inline-flex items-center px-3 py-1 bg-yellow-900 text-yellow-300 text-sm font-semibold rounded-full">
                    Premium
                  </span>
                )}
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {article.tags.map((tag, index) => (
                  <span key={index} className="inline-flex items-center px-3 py-1 bg-gray-800 text-gray-300 text-sm font-medium rounded-full">
                    <Tag size={14} className="mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Article Footer */}
          <footer className="mt-16 pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="font-semibold text-white mb-2">Share this research</h3>
                <p className="text-gray-400 text-sm">
                  Help others discover valuable investment insights
                </p>
              </div>
              <button
                onClick={handleBackClick}
                className="inline-flex items-center px-6 py-3 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors"
              >
                Explore More Research
                <ArrowLeft size={20} className="ml-2 rotate-180" />
              </button>
            </div>
          </footer>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}