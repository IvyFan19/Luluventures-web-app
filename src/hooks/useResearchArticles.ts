import { useState, useEffect } from 'react';
import { ArticleService, ResearchDocument } from '../services/articleService';

interface UseResearchArticlesReturn {
  articles: ResearchDocument[];
  loading: boolean;
  error: string | null;
  availableTags: string[];
  refetch: () => Promise<void>;
}

export function useResearchArticles(): UseResearchArticlesReturn {
  const [articles, setArticles] = useState<ResearchDocument[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [availableTags, setAvailableTags] = useState<string[]>([]);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const fetchedArticles = await ArticleService.getAllArticles();
      setArticles(fetchedArticles);
      
      const tags = ArticleService.getAllUniqueTags(fetchedArticles);
      setAvailableTags(tags);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch articles';
      setError(errorMessage);
      console.error('Error fetching articles:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const refetch = async () => {
    await fetchArticles();
  };

  return {
    articles,
    loading,
    error,
    availableTags,
    refetch,
  };
}