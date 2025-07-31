import { DynamoDBService, DynamoDBArticleItem } from './dynamoDbClient';

export interface ResearchDocument {
  articleId: string;
  title: string;
  summary: string;
  createdAt: string;
  coverImageUrl?: string;
  contentUrl: string;
  tags: string[];
  isPremium: boolean;
  viewCount: number;
}

export class ArticleService {
  static async getAllArticles(): Promise<ResearchDocument[]> {
    try {
      const dynamoItems = await DynamoDBService.getAllArticles();
      return dynamoItems.map(this.transformDynamoDBItem);
    } catch (error) {
      console.error('Error in ArticleService.getAllArticles:', error);
      throw error;
    }
  }

  static async getArticlesByTag(tag: string): Promise<ResearchDocument[]> {
    try {
      const dynamoItems = await DynamoDBService.getArticlesByTag(tag);
      return dynamoItems.map(this.transformDynamoDBItem);
    } catch (error) {
      console.error('Error in ArticleService.getArticlesByTag:', error);
      throw error;
    }
  }

  static getAllUniqueTags(articles: ResearchDocument[]): string[] {
    const allTags = articles.flatMap(article => 
      article.tags?.filter(tag => typeof tag === 'string') || []
    );
    return [...new Set(allTags)].sort();
  }

  static formatDate(dateString: string): string {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
  }

  private static transformDynamoDBItem(item: DynamoDBArticleItem): ResearchDocument {
    return {
      articleId: item.articleId,
      title: item.title,
      summary: item.summary,
      createdAt: item.createdAt,
      coverImageUrl: item.coverImageUrl,
      contentUrl: item.contentUrl,
      tags: Array.isArray(item.tags) 
        ? item.tags.filter(tag => typeof tag === 'string')
        : [],
      isPremium: item.isPremium || false,
      viewCount: item.viewCount || 0,
    };
  }
}