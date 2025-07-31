import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({
  region: import.meta.env.VITE_AWS_REGION || 'us-west-2',
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID || '',
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY || '',
  },
});

export const docClient = DynamoDBDocumentClient.from(client);

export const TABLE_NAME = 'LuluBlogContentTable';

export interface DynamoDBArticleItem {
  PK: string;
  SK: string;
  articleId: string;
  title: string;
  summary: string;
  createdAt: string;
  updatedAt: string;
  coverImageUrl?: string;
  contentUrl: string;
  tags: string[];
  isPremium: boolean;
  viewCount: number;
}

export class DynamoDBService {
  static async getAllArticles(): Promise<DynamoDBArticleItem[]> {
    try {
      const command = new ScanCommand({
        TableName: TABLE_NAME,
        FilterExpression: 'SK = :sk',
        ExpressionAttributeValues: {
          ':sk': 'METADATA',
        },
      });

      const response = await docClient.send(command);
      return response.Items as DynamoDBArticleItem[] || [];
    } catch (error) {
      console.error('Error fetching articles from DynamoDB:', error);
      throw new Error('Failed to fetch articles from database');
    }
  }

  static async getArticlesByTag(tag: string): Promise<DynamoDBArticleItem[]> {
    try {
      const command = new ScanCommand({
        TableName: TABLE_NAME,
        FilterExpression: 'SK = :sk AND contains(tags, :tag)',
        ExpressionAttributeValues: {
          ':sk': 'METADATA',
          ':tag': tag,
        },
      });

      const response = await docClient.send(command);
      return response.Items as DynamoDBArticleItem[] || [];
    } catch (error) {
      console.error('Error fetching articles by tag from DynamoDB:', error);
      throw new Error('Failed to fetch articles by tag from database');
    }
  }
}