import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Tag, AlertCircle } from 'lucide-react';
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
      <div className="min-h-screen bg-white text-gray-900">
        <Header 
          isMenuOpen={isMenuOpen} 
          toggleMenu={toggleMenu} 
          signOut={signOut} 
          user={user} 
        />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !article) {
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
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Article Not Found</h1>
              <p className="text-gray-600 mb-8">{error}</p>
              <button
                onClick={handleBackClick}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
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
    <div className="min-h-screen bg-white text-gray-900">
      <Header 
        isMenuOpen={isMenuOpen} 
        toggleMenu={toggleMenu} 
        signOut={signOut} 
        user={user} 
      />
      
      <main className="pt-24 pb-16">
        {/* Back Navigation */}
        <div className="container mx-auto px-4 max-w-4xl mb-8">
          <button
            onClick={handleBackClick}
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Research & Analysis
          </button>
        </div>

        {/* Article Content */}
        <article className="container mx-auto px-4 max-w-4xl">
          {/* Hero Image */}
          {article.coverImageUrl && (
            <div className="mb-12 rounded-2xl overflow-hidden">
              <img
                src={article.coverImageUrl}
                alt={article.title}
                className="w-full h-96 object-cover"
              />
            </div>
          )}

          {/* Article Header */}
          <header className="mb-12">
            {/* Tags */}
            <div className="mb-6 flex flex-wrap gap-2">
              {article.tags.map((tag, index) => (
                <span key={index} className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full">
                  <Tag size={14} className="mr-1" />
                  {tag}
                </span>
              ))}
              {article.isPremium && (
                <span className="inline-flex items-center px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-semibold rounded-full">
                  Premium
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {article.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-gray-600 border-b border-gray-200 pb-8">
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
            </div>
          </header>

          {/* Article Summary */}
          <div className="mb-12">
            <div className="bg-gray-50 rounded-2xl p-8 border-l-4 border-blue-600">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Executive Summary</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                {article.summary}
              </p>
            </div>
          </div>

          {/* Article Content */}
          <div className="prose max-w-none">
            {contentLoading && (
              <div className="flex justify-center items-center py-12">
                <div className="flex items-center gap-3 text-gray-600">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <span className="text-lg">Loading article content...</span>
                </div>
              </div>
            )}

            {contentError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
                <div className="flex items-center gap-3 text-red-700">
                  <AlertCircle size={24} />
                  <div>
                    <h3 className="font-semibold">Failed to Load Content</h3>
                    <p className="text-sm mt-1">{contentError}</p>
                    <button
                      onClick={() => fetchMarkdownContent(article.contentUrl)}
                      className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Try Again
                    </button>
                  </div>
                </div>
              </div>
            )}

            {markdownContent && !contentLoading && !contentError && (
              <MarkdownRenderer 
                content={markdownContent}
                className="notion-prose"
              />
            )}

            {!contentLoading && !contentError && !markdownContent && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">
                  No Content Available
                </h3>
                <p className="text-gray-600">
                  The article content could not be loaded at this time.
                </p>
              </div>
            )}
          </div>

          {/* Article Footer */}
          <footer className="mt-16 pt-8 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Share this article</h3>
                <p className="text-gray-600 text-sm">
                  Help others discover valuable investment insights
                </p>
              </div>
              <button
                onClick={handleBackClick}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Explore More Research
                <ArrowLeft size={20} className="ml-2 rotate-180" />
              </button>
            </div>
          </footer>
        </article>
      </main>
      
      <Footer />
    </div>
  );
}